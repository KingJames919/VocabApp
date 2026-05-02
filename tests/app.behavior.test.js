const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function loadAppHarness() {
  const contentPath = path.join(__dirname, "..", "web-app", "content.js");
  const appPath = path.join(__dirname, "..", "web-app", "app.js");
  const contentSource = fs.readFileSync(contentPath, "utf8");
  const source = fs.readFileSync(appPath, "utf8");

  const elements = new Map();
  const makeElement = () => ({
    innerHTML: "",
    value: "",
    checked: false,
    addEventListener() {},
    removeEventListener() {},
    querySelector() {
      return makeElement();
    },
    querySelectorAll() {
      return [];
    },
  });

  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) {
        elements.set(selector, makeElement());
      }
      return elements.get(selector);
    },
    querySelectorAll() {
      return [];
    },
  };

  const storage = new Map();
  const context = {
    console,
    setTimeout,
    clearTimeout,
    document,
    location: { hash: "#/" },
    localStorage: {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
      removeItem(key) {
        storage.delete(key);
      },
    },
    window: {
      addEventListener() {},
    },
  };
  context.globalThis = context;

  vm.runInNewContext(contentSource, context, { filename: "web-app/content.js" });

  const exposedSource = `${source}
globalThis.__appTest = {
  defaultRun,
  contentPack,
  session2Transfer,
  session4Config,
  session5BaseCards,
  startRun,
  completeSession,
  sessionStatus,
  ensureSessionStarted,
  submitSession2Transfer,
  submitSession4Draft1,
  submitSession4Draft2,
  ensureSession5Deck,
  submitSession5CurrentCard,
  maybeInsertSession5Retest,
  renderSequence,
  buildRecapData,
  buildArchiveData,
  computeAnchorStatus,
  computeFamilyStatus,
  latestWordOutcome,
  latestFamilyOutcome,
  formatTransferSummary,
  selectBestSentence,
  evaluateSession4Draft,
  evaluateWeatherContent,
  scoreSession4Evaluation,
  setRun(nextRun) {
    run = nextRun;
  },
  getRun() {
    return run;
  },
};
`;

  vm.runInNewContext(exposedSource, context, { filename: "web-app/app.js" });
  return context.__appTest;
}

test("progression stays ordered and unlocks one session at a time", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  app.startRun();
  assert.equal(app.getRun().statuses[1], "in_progress");
  assert.equal(app.getRun().unlockedSession, 1);

  app.completeSession(1);
  assert.equal(app.getRun().statuses[1], "completed");
  assert.equal(app.getRun().statuses[2], "not_started");
  assert.equal(app.getRun().statuses[3], "locked");
  assert.equal(app.getRun().unlockedSession, 2);
  assert.equal(app.getRun().currentSession, 2);

  app.completeSession(2);
  app.completeSession(3);
  app.completeSession(4);
  assert.equal(app.getRun().unlockedSession, 5);
  assert.equal(app.getRun().statuses[5], "not_started");

  app.completeSession(5);
  assert.equal(app.getRun().statuses[5], "completed");
});

test("session 4 keeps the stronger draft and preserves the weaker one", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  run.sessionProgress[4].draft1Text =
    "Meteorologists predict severe weather when air pressure drops and radar evidence grows stronger.";
  app.submitSession4Draft1();

  run.sessionProgress[4].draft2Text =
    "Meteorologists predict weather.";
  app.submitSession4Draft2();

  const progress = app.getRun().sessionProgress[4];
  assert.equal(progress.keptDraft.source, "draft_1");
  assert.equal(progress.draft2Text, "Meteorologists predict weather.");
  assert.equal(progress.step, "wrap");
});

test("session 5 inserts no more than two retests and keeps them before the final challenge", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);
  app.ensureSession5Deck();

  const progress = app.getRun().sessionProgress[5];
  progress.currentIndex = 0;
  app.maybeInsertSession5Retest(progress.deck[0]);
  progress.currentIndex = 1;
  app.maybeInsertSession5Retest(progress.deck[1]);
  progress.currentIndex = 2;
  app.maybeInsertSession5Retest(progress.deck[2]);

  const retests = progress.deck.filter((card) => card.isRetest);
  const finalChallengeIndex = progress.deck.findIndex((card) => card.id === "s5_card_7");

  assert.equal(progress.retestsUsed, 2);
  assert.equal(retests.length, 2);
  assert.ok(progress.deck.findIndex((card) => card.instanceId === "s5_card_1_retest") > 1);
  assert.ok(progress.deck.findIndex((card) => card.instanceId === "s5_card_2_retest") < finalChallengeIndex);
  assert.equal(progress.deck.filter((card) => card.instanceId === "s5_card_3_retest").length, 0);
});

test("later productive family evidence overrides an earlier failed transfer in latest family outcome", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  run.sessionProgress[2].transfer.status = "full_success";
  run.sessionProgress[5].transferStatus = "failed";
  run.sessionProgress[5].results.s5_card_7 = {
    evaluator: {
      family_use_quality: "accurate",
      required_words: {
        predict: "correct",
        pressure: "correct",
      },
      best_sentence:
        "Meteorologists predict severe weather when pressure drops and teams transport warnings quickly.",
    },
  };

  assert.equal(app.latestFamilyOutcome(), "accurate");
});

test("exposure alone never makes an anchor word solid", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  run.exposureLog.push(
    { sessionNumber: 1, type: "exposure", targetId: "predict", source: "second_pass" },
    { sessionNumber: 3, type: "exposure", targetId: "predict", source: "prompt_hint" },
    { sessionNumber: 5, type: "exposure", targetId: "predict", source: "review_hint" },
  );

  const status = app.computeAnchorStatus("predict", "predict");
  assert.equal(status.status, "fragile");
  assert.equal(status.successes, 0);
});

test("session 5 transfer miss then successful retest records recovered, not full success", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);
  app.ensureSession5Deck();

  const progress = app.getRun().sessionProgress[5];
  progress.currentIndex = progress.deck.findIndex((card) => card.id === "s5_card_6");
  const card6 = progress.deck[progress.currentIndex];
  progress.responses[card6.instanceId] = { selectedIndex: 1 };
  app.submitSession5CurrentCard();

  assert.equal(progress.transferStatus, "failed");
  assert.equal(progress.retestsUsed, 1);

  const retestIndex = progress.deck.findIndex((card) => card.instanceId === "s5_card_6_retest");
  assert.notEqual(retestIndex, -1);

  progress.currentIndex = retestIndex;
  const retestCard = progress.deck[retestIndex];
  progress.responses[retestCard.instanceId] = { selectedIndex: 0 };
  app.submitSession5CurrentCard();

  assert.equal(progress.transferStatus, "recovered");
  assert.equal(app.formatTransferSummary(), "You used port = carry to understand portable after a second look.");
});

test("a retest success does not create a second active encounter for the same source item", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);
  app.ensureSession5Deck();

  const progress = app.getRun().sessionProgress[5];
  progress.currentIndex = progress.deck.findIndex((card) => card.id === "s5_card_1");
  const card1 = progress.deck[progress.currentIndex];
  progress.responses[card1.instanceId] = { selectedIndex: 1 };
  app.submitSession5CurrentCard();

  const retestIndex = progress.deck.findIndex((card) => card.instanceId === "s5_card_1_retest");
  progress.currentIndex = retestIndex;
  const retestCard = progress.deck[retestIndex];
  progress.responses[retestCard.instanceId] = { selectedIndex: 0 };
  app.submitSession5CurrentCard();

  const predictSession5Evidence = app
    .getRun()
    .exposureLog.filter((item) => item.sessionNumber === 5 && item.targetId === "predict");

  assert.equal(predictSession5Evidence.length, 1);
});

test("family status stays fragile when success is only recovered transfer without productive family use", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  run.exposureLog.push(
    { sessionNumber: 2, type: "active", targetId: "port_carry", source: "s2_round_1" },
    { sessionNumber: 2, type: "active", targetId: "port_carry", source: "s2_round_2" },
    { sessionNumber: 5, type: "active", targetId: "port_carry", source: "s5_card_6" },
  );
  run.sessionProgress[2].transfer.status = "recovered";
  run.sessionProgress[5].transferStatus = "recovered";

  const familyStatus = app.computeFamilyStatus();
  assert.equal(familyStatus.status, "fragile");
});

test("session 4 evaluation marks inaccurate science as revise even with correct target words", () => {
  const app = loadAppHarness();
  const evaluation = app.evaluateSession4Draft(
    "Meteorologists predict severe weather from pressure alone, and pressure by itself tells them every storm is coming.",
  );

  assert.equal(evaluation.required_words.predict, "correct");
  assert.equal(evaluation.required_words.pressure, "correct");
  assert.equal(evaluation.content_fit, "on_topic");
  assert.equal(evaluation.content_accuracy, "inaccurate");
  assert.equal(evaluation.overall_flag, "revise");
  assert.ok(
    evaluation.sentence_level_feedback.some((item) =>
      item.message.includes("multiple data sources") || item.message.includes("does not work alone"),
    ),
  );
});

test("weather evaluator recognizes a multi-source accurate explanation", () => {
  const app = loadAppHarness();
  const result = app.evaluateWeatherContent(
    "Meteorologists predict storms by comparing pressure, wind, moisture, and radar data before they warn a town.",
  );

  assert.equal(result.content_fit, "on_topic");
  assert.equal(result.content_accuracy, "accurate");
  assert.equal(result.knowledge_targets.wx_multi_data, "accurate");
});

test("recap includes knowledge targets and learned-weather summary", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  run.attempts.push(
    { sessionNumber: 1, attemptId: "s1_q2", finalResult: true, contentTargetIds: ["wx_pressure_signal"] },
    { sessionNumber: 4, attemptId: "s4_draft_1", finalResult: true, contentTargetIds: ["wx_pressure_signal", "wx_multi_data"] },
    { sessionNumber: 1, attemptId: "s1_q1", finalResult: true, contentTargetIds: ["wx_multi_data"] },
    { sessionNumber: 5, attemptId: "s5_card_5", finalResult: true, contentTargetIds: ["wx_transport"] },
    { sessionNumber: 2, attemptId: "s2_round_1", finalResult: true, contentTargetIds: ["wx_transport"] },
  );
  run.sessionProgress[4].keptDraft = {
    evaluation: {
      required_words: { predict: "correct", pressure: "correct" },
      family_use_quality: "accurate",
      content_fit: "on_topic",
      content_accuracy: "accurate",
      knowledge_targets: {
        wx_pressure_signal: "accurate",
        wx_multi_data: "accurate",
        wx_transport: "not_evidenced",
      },
      sentence_level_feedback: [],
      overall_flag: "solid",
      best_sentence:
        "Meteorologists compare pressure, wind, and moisture data before they predict severe weather.",
      feedback_summary: [],
    },
  };

  const recap = app.buildRecapData();

  assert.ok(Array.isArray(recap.knowledgeTargetStatuses));
  assert.ok(recap.learnedKnowledge.includes("Changes in air pressure can signal severe weather."));
  assert.equal(
    recap.knowledgeTargetStatuses.find((item) => item.targetId === "wx_pressure_signal").status,
    "solid",
  );
});

test("archive shows the collection that has opened so far", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  let archive = app.buildArchiveData();
  assert.equal(archive.hasStarted, false);
  assert.equal(archive.anchorWords.length, 0);
  assert.equal(archive.familyWords.length, 0);

  app.startRun();
  archive = app.buildArchiveData();
  assert.equal(archive.hasStarted, true);
  assert.equal(
    JSON.stringify(archive.anchorWords.map((word) => word.label)),
    JSON.stringify(["predict", "pressure", "transport", "severe"]),
  );
  assert.equal(archive.familyWords.length, 0);

  app.completeSession(1);
  archive = app.buildArchiveData();
  assert.equal(
    JSON.stringify(archive.familyWords.map((word) => word.label)),
    JSON.stringify(["transport", "import", "export"]),
  );
  assert.equal(
    JSON.stringify(archive.relatedWords.map((word) => word.label)),
    JSON.stringify(["portable"]),
  );
});

test("sequence page renders without session-only state", () => {
  const app = loadAppHarness();
  const run = app.defaultRun();
  app.setRun(run);

  const html = app.renderSequence();

  assert.match(html, /How Meteorologists Predict Severe Weather/);
  assert.match(html, /Read & Notice/);
  assert.match(html, /Begin this step/);
});
