const contentPack = globalThis.JAMES_CONTENT_PACK;

if (!contentPack) {
  throw new Error("Missing shared content pack. Load content.js before app.js.");
}

const STORAGE_KEY = "jamesapp-vocab-run-v1";

const session1Questions = [
  {
    id: "s1_q1",
    label: "Check 1",
    title: "Evidence forecasters use",
    prompt: "What evidence do meteorologists compare to predict severe weather?",
    options: [
      "Evidence from radar, satellites, and surface reports",
      "Lucky guesses based on old storms",
      "Only the temperature outside one building",
    ],
    correctIndex: 0,
    targetIds: [],
    contentTargetIds: ["wx_multi_data"],
    explanation:
      "The passage says their job is not to guess. Meteorologists compare evidence from radar, satellites, and surface reports.",
  },
  {
    id: "s1_q2",
    label: "Check 2",
    title: "A storm signal",
    prompt: "Which change can signal that a storm is developing?",
    options: [
      "Rising air pressure with calm winds",
      "Falling air pressure",
      "A cloudless sky all day",
    ],
    correctIndex: 1,
    targetIds: [],
    contentTargetIds: ["wx_pressure_signal"],
    explanation:
      "Both the passage and weather clues point to falling air pressure as a signal that a storm may be developing.",
  },
  {
    id: "s1_q3",
    label: "Check 3",
    title: "Word in context",
    prompt: "Which word names what moving air does with heat and moisture in a storm system?",
    options: ["predict", "transport", "severe"],
    correctIndex: 1,
    targetIds: ["transport"],
    contentTargetIds: ["wx_transport"],
    explanation:
      "Transport means carry from one place to another. In the passage, moving air carries heat and moisture into a storm system.",
  },
];

const session2Rounds = [
  {
    id: "s2_round_1",
    targetWord: "transport",
    prompt: "Build the family word that means carry something across a place or distance.",
    prefixes: ["trans", "im", "ex"],
    base: "port",
    correctPrefix: "trans",
    meaningPrompt: "Which meaning matches transport in this session?",
    meaningOptions: [
      "to carry from one place to another",
      "to press down with force",
      "to say what will happen next",
    ],
    correctMeaningIndex: 0,
    targetIds: ["port_carry", "transport"],
    contentTargetIds: ["wx_transport"],
  },
  {
    id: "s2_round_2",
    targetWord: "import",
    prompt: "Build the family word that means carry something in.",
    prefixes: ["im", "trans", "sub"],
    base: "port",
    correctPrefix: "im",
    meaningPrompt: "Which meaning fits import?",
    meaningOptions: ["to carry out", "to carry in", "to carry under"],
    correctMeaningIndex: 1,
    targetIds: ["port_carry"],
    contentTargetIds: ["wx_transport"],
  },
  {
    id: "s2_round_3",
    targetWord: "export",
    prompt: "Build the family word that means carry something out.",
    prefixes: ["ex", "im", "re"],
    base: "port",
    correctPrefix: "ex",
    meaningPrompt: "Which meaning fits export?",
    meaningOptions: ["to carry out", "to carry in", "to carry again"],
    correctMeaningIndex: 0,
    targetIds: ["port_carry"],
    contentTargetIds: ["wx_transport"],
  },
];

const session2Transfer = {
  id: "s2_transfer",
  prompt: "If a forecaster needs a portable weather sensor, what does portable most likely mean?",
  options: [
    "able to be carried easily",
    "able to predict storms automatically",
    "able to create pressure in the air",
  ],
  correctIndex: 0,
  targetIds: ["port_carry"],
  contentTargetIds: ["wx_transport"],
};

const session3Prompts = [
  {
    id: "s3_prompt_1",
    type: "choice",
    title: "Best-fit choice",
    prompt: "Meteorologists use evidence to ___ when severe weather is most likely to happen.",
    options: ["predict", "guess", "describe"],
    correctIndex: 0,
    targetIds: ["predict"],
    contentTargetIds: ["wx_multi_data"],
    explanation:
      "Predict means say what is likely to happen based on evidence. The passage says meteorologists compare evidence, not guesses.",
  },
  {
    id: "s3_prompt_2",
    type: "choice",
    title: "Same word, new context",
    prompt: "Which sentence uses pressure in the weather sense?",
    options: [
      "Air pressure dropped as the storm moved closer.",
      "The deadline put pressure on the class to hurry.",
      "Water pressure made the hose spray harder.",
    ],
    correctIndex: 0,
    targetIds: ["pressure"],
    contentTargetIds: ["wx_pressure_signal"],
    explanation: "Here, pressure means air pressing down. A drop in air pressure can signal a storm.",
  },
  {
    id: "s3_prompt_3",
    type: "order",
    title: "Least to most severe",
    prompt: "Order these weather examples from least severe to most severe.",
    options: [
      "a thunderstorm with damaging winds",
      "a steady rain shower",
      "a calm cloudy morning",
    ],
    correctOrder: [
      "a calm cloudy morning",
      "a steady rain shower",
      "a thunderstorm with damaging winds",
    ],
    targetIds: ["severe"],
    contentTargetIds: [],
    explanation: "Severe belongs with the strongest and most dangerous conditions, not mild or ordinary weather.",
    helperText: "Use the meaning of severe to decide the order.",
  },
  {
    id: "s3_prompt_4",
    type: "choice",
    title: "Family clue",
    prompt: "Which word uses the family clue port = carry?",
    options: ["transport", "predict", "pressure", "severe"],
    correctIndex: 0,
    targetIds: ["port_carry", "transport"],
    contentTargetIds: ["wx_transport"],
    explanation:
      "Transport contains port. In the passage, moving air can transport heat and moisture into a storm system.",
  },
  {
    id: "s3_prompt_5",
    type: "typed",
    title: "Short weather sentence",
    prompt: "Write one 15–25 word sentence explaining how meteorologists use evidence. Use predict, pressure, or both if they fit.",
    targetWords: ["predict", "pressure"],
    targetIds: ["predict", "pressure"],
    contentTargetIds: ["wx_pressure_signal", "wx_multi_data"],
  },
];

const session3StepLabels = ["Best Fit", "New Context", "Order", "Family Clue", "Sentence"];
const session3WrapLabels = [
  "Best-fit choice",
  "New context",
  "Order by strength",
  "Family clue",
  "Short sentence",
];
const session3StepOrder = ["prompt_1", "prompt_2", "prompt_3", "prompt_4", "prompt_5", "wrap"];

const session4Config = {
  prompt:
    "Write a short weather explanation in 3–4 sentences and 50–80 words. Explain how meteorologists might warn a town before severe weather.",
  requiredWords: ["predict", "pressure"],
  familyWord: "transport",
  contentTargetIds: ["wx_pressure_signal", "wx_multi_data", "wx_transport"],
  sentenceFrames: [
    "Meteorologists predict severe weather by studying...",
    "A drop in air pressure can show that...",
    "Moving air can transport heat and moisture when...",
  ],
  modelAnswer:
    "Meteorologists predict severe weather by comparing radar, satellites, surface reports, wind, moisture, and changes in air pressure. Falling pressure can signal that storm conditions are building. Moving air can transport heat and moisture into a storm system, making the storm more severe. When the signs line up, forecasters warn the town early.",
};

const session5BaseCards = [
  {
    id: "s5_card_1",
    kind: "choice",
    title: "Recall the word",
    prompt: "Meteorologists use evidence to ___ when severe weather may happen.",
    options: ["predict", "transport", "repair", "wander"],
    correctIndex: 0,
    targetIds: ["predict"],
    contentTargetIds: ["wx_multi_data"],
    explanation: "Predict means saying what is likely to happen based on evidence.",
    retest: {
      title: "Second look",
      prompt: "Which word means say what is likely to happen based on evidence?",
      options: ["predict", "severe", "pressure"],
      correctIndex: 0,
      explanation: "Predict fits because forecasters use evidence to say what may happen.",
    },
  },
  {
    id: "s5_card_2",
    kind: "choice",
    title: "Choose the weather meaning",
    prompt: "Which sentence uses pressure in the weather sense?",
    options: [
      "Air pressure dropped before the storm.",
      "The teacher felt pressure to hurry lunch.",
      "They pressure the lid onto the jar.",
    ],
    correctIndex: 0,
    targetIds: ["pressure"],
    contentTargetIds: ["wx_pressure_signal"],
    explanation: "The first sentence uses pressure as air pressing down in weather conditions.",
    retest: {
      title: "Second look",
      prompt: "Pressure in this sequence is mostly about...",
      options: ["air pressing down", "being in a hurry", "closing a box"],
      correctIndex: 0,
      explanation: "Pressure means the force created when air presses down.",
    },
  },
  {
    id: "s5_card_3",
    kind: "choice",
    title: "Find the example",
    prompt: "Which is the best example of severe weather?",
    options: ["a mild breeze", "a dangerous thunderstorm", "a sunny recess"],
    correctIndex: 1,
    targetIds: ["severe"],
    contentTargetIds: [],
    explanation: "Severe means very serious or intense, so the dangerous thunderstorm fits best.",
    retest: {
      title: "Second look",
      prompt: "Which word best matches very serious weather conditions?",
      options: ["gentle", "severe", "slow"],
      correctIndex: 1,
      explanation: "Severe describes weather that is very serious or intense.",
    },
  },
  {
    id: "s5_card_4",
    kind: "choice",
    title: "Repair the sentence",
    prompt: "Which revision makes this sentence work? “Forecasters severe a warning before the storm.”",
    options: [
      "Forecasters predict a warning before the storm.",
      "Forecasters transport a warning before the storm.",
      "Forecasters issue a warning before the storm.",
    ],
    correctIndex: 2,
    targetIds: [],
    contentTargetIds: [],
    explanation: "Issue is the natural verb. Severe describes how serious the weather is; it is not the action.",
    retest: {
      title: "Second look",
      prompt: "Why is 'severe' wrong in the original sentence?",
      options: [
        "It is the wrong part of speech for the sentence.",
        "It means carry from place to place.",
        "It means pressure in the air.",
      ],
      correctIndex: 0,
      explanation: "Severe is an adjective. The sentence needs a verb.",
    },
  },
  {
    id: "s5_card_5",
    kind: "choice",
    title: "Match the family clue",
    prompt: "Which word belongs to the port = carry family?",
    options: ["transport", "predict", "stormy", "pressure"],
    correctIndex: 0,
    targetIds: ["port_carry", "transport"],
    contentTargetIds: ["wx_transport"],
    explanation: "Transport contains port and keeps the meaning carry.",
    retest: {
      title: "Second look",
      prompt: "What does the family clue port help you remember?",
      options: ["carry", "say", "press"],
      correctIndex: 0,
      explanation: "Port points to carry.",
    },
  },
  {
    id: "s5_card_6",
    kind: "choice",
    title: "New related word",
    prompt: "Portable weather tools are useful because portable most likely means...",
    options: [
      "easy to carry",
      "easy to predict",
      "easy to press down",
    ],
    correctIndex: 0,
    targetIds: ["port_carry"],
    contentTargetIds: ["wx_transport"],
    explanation: "Portable connects to port = carry, so a portable tool is easy to carry.",
    updatesTransfer: true,
    retest: {
      title: "Second look",
      prompt: "Portable connects to the family clue port because it means...",
      options: ["able to be carried", "able to form storms", "able to create pressure"],
      correctIndex: 0,
      explanation: "Portable means able to be carried. This second look keeps the family clue in review.",
    },
  },
  {
    id: "s5_card_7",
    kind: "typed",
    title: "Final sentence",
    prompt: "Write one final sentence explaining how meteorologists know severe weather may happen. Use pressure and transport clearly.",
    requiredWords: ["pressure"],
    familyWord: "transport",
    targetIds: ["pressure", "port_carry"],
    contentTargetIds: ["wx_pressure_signal", "wx_multi_data", "wx_transport"],
  },
];

function buildInitialReviewState() {
  const targetIds = [
    ...contentPack.anchorWords.map((word) => word.id),
    contentPack.morphologyFamily.id,
    ...contentPack.knowledgeTargets.map((target) => target.targetId),
  ];

  return Object.fromEntries(
    targetIds.map((targetId) => [
      targetId,
      {
        last_reviewed_at: null,
        due_at: null,
        next_due_at: null,
      },
    ]),
  );
}

const defaultRun = () => ({
  sequenceId: contentPack.sequenceId,
  startedAt: null,
  unlockedSession: 1,
  currentSession: 1,
  statuses: {
    1: "not_started",
    2: "locked",
    3: "locked",
    4: "locked",
    5: "locked",
  },
  sessionProgress: {
    1: {
      step: "intro",
      priorKnowledge: "",
      questionResponses: {},
      questionResults: {},
      score: null,
      completedAt: null,
      exposuresLogged: false,
      familyExposureLogged: false,
    },
    2: {
      step: "preview",
      rounds: {},
      transfer: {
        firstChoice: null,
        finalChoice: null,
        status: null,
        completed: false,
      },
      completedAt: null,
    },
    3: {
      step: "prompt_1",
      responses: {},
      results: {},
      prompt5Text: "",
      prompt5CorrectionUsed: false,
      prompt5Evaluator: null,
      completedAt: null,
    },
    4: {
      step: "draft_1",
      draft1Text: "",
      draft1Evaluation: null,
      draft2Text: "",
      draft2Evaluation: null,
      keptDraft: null,
      bestSentence: "",
      revisionChoice: null,
      productiveLogged: false,
      completedAt: null,
    },
    5: {
      deck: [],
      currentIndex: 0,
      responses: {},
      results: {},
      retestsUsed: 0,
      transferStatus: null,
      productiveLogged: false,
      completedAt: null,
    },
  },
  attempts: [],
  exposureLog: [],
  drafts: {},
  reviewState: buildInitialReviewState(),
});

function loadRun() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultRun();

  try {
    return mergeRun(defaultRun(), JSON.parse(raw));
  } catch {
    return defaultRun();
  }
}

function mergeRun(base, parsed) {
  return {
    ...base,
    ...parsed,
    statuses: { ...base.statuses, ...(parsed.statuses ?? {}) },
    sessionProgress: { ...base.sessionProgress, ...(parsed.sessionProgress ?? {}) },
    attempts: Array.isArray(parsed.attempts) ? parsed.attempts : base.attempts,
    exposureLog: Array.isArray(parsed.exposureLog) ? parsed.exposureLog : base.exposureLog,
    drafts: { ...base.drafts, ...(parsed.drafts ?? {}) },
    reviewState: { ...base.reviewState, ...(parsed.reviewState ?? {}) },
  };
}

function saveRun(nextRun) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRun));
}

let run = loadRun();
sanitizeSession3Progress(run.sessionProgress[3]);
sanitizeSession5Progress(run.sessionProgress[5]);

const app = document.querySelector("#app");
const resetButton = document.querySelector("#reset-progress");
const unlockAllButton = document.querySelector("#unlock-all");

resetButton.addEventListener("click", () => {
  run = defaultRun();
  saveRun(run);
  render();
});

unlockAllButton.addEventListener("click", () => {
  run.startedAt = run.startedAt ?? new Date().toISOString();
  run.unlockedSession = 5;
  for (const sessionNumber of [1, 2, 3, 4, 5]) {
    if (run.statuses[sessionNumber] === "locked") {
      run.statuses[sessionNumber] = "not_started";
    }
  }
  saveRun(run);
  render();
});

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);

function startRun() {
  if (!run.startedAt) {
    run.startedAt = new Date().toISOString();
    run.statuses[1] = "in_progress";
    saveRun(run);
  }
  location.hash = "#/sequence";
}

function completeSession(number) {
  run.statuses[number] = "completed";

  if (number === 1) run.sessionProgress[1].completedAt = new Date().toISOString();
  if (number === 2) run.sessionProgress[2].completedAt = new Date().toISOString();
  if (number === 3) run.sessionProgress[3].completedAt = new Date().toISOString();
  if (number === 4) run.sessionProgress[4].completedAt = new Date().toISOString();
  if (number === 5) run.sessionProgress[5].completedAt = new Date().toISOString();

  if (number < 5) {
    run.unlockedSession = Math.max(run.unlockedSession, number + 1);
    run.statuses[number + 1] =
      run.statuses[number + 1] === "locked" ? "not_started" : run.statuses[number + 1];
    run.currentSession = number + 1;
    saveRun(run);
    location.hash = "#/sequence";
    return;
  }

  saveRun(run);
  location.hash = "#/recap";
}

function sessionStatus(number) {
  if (number > run.unlockedSession) return "locked";
  return run.statuses[number] ?? "not_started";
}

function routeFromHash() {
  const hash = location.hash || "#/";
  return hash.replace(/^#/, "");
}

function ensureSessionStarted(number) {
  if (sessionStatus(number) === "not_started") {
    run.statuses[number] = "in_progress";
    run.currentSession = number;
    saveRun(run);
  }
}

function updateDraft(key, value) {
  run.drafts[key] = value;
  saveRun(run);
}

function render() {
  const route = routeFromHash();

  if (route === "/") {
    app.innerHTML = renderHome();
    bindHome();
    return;
  }

  if (route === "/sequence") {
    app.innerHTML = renderSequence();
    return;
  }

  if (route === "/archive") {
    app.innerHTML = renderArchive();
    bindArchive();
    return;
  }

  if (route.startsWith("/session/")) {
    const number = Number(route.split("/").pop());
    app.innerHTML = renderSession(number);
    bindSession(number);
    return;
  }

  if (route === "/recap") {
    app.innerHTML = renderRecap();
    return;
  }

  location.hash = "#/";
}

function renderHome() {
  const hasStarted = Boolean(run.startedAt);
  const primaryLabel = hasStarted ? "Continue the path" : "Start the path";
  const homeSessions = [
    {
      number: 1,
      title: "Read & Notice",
      helper: "See the words inside the text.",
      subtitle: "First Look",
    },
    {
      number: 2,
      title: "Word Roots",
      helper: "Build the family behind one key word.",
      subtitle: "Word Roots",
    },
    {
      number: 3,
      title: "Best Fit",
      helper: "Choose the word that fits the idea.",
      subtitle: "Best Fit",
    },
    {
      number: 4,
      title: "Use the Words",
      helper: "Write a short explanation.",
      subtitle: "Grow the Idea",
    },
    {
      number: 5,
      title: "Review & Recall",
      helper: "Bring the words back.",
      subtitle: "Revisit & Strengthen",
    },
  ];

  return `
    <section class="home-v1-page" aria-labelledby="home-title">
      <header class="home-v1-header">
        <div>
          <p class="eyebrow">Vocabulary Learning Prototype</p>
          <h2 id="home-title">James App</h2>
          <p>A learning path for building understanding through words.</p>
        </div>
        <nav class="home-v1-nav" aria-label="Prototype sections">
          <span class="home-v1-nav-item home-v1-nav-active">Today</span>
          <span class="home-v1-nav-item home-v1-nav-disabled">Play</span>
          <span class="home-v1-nav-item home-v1-nav-disabled">Archive</span>
        </nav>
      </header>

      <section class="home-v1-hero card">
        <div class="home-v1-hero-copy">
          <p class="eyebrow">Your Word Path</p>
          <h3>Understanding grows when you know the words.</h3>
          <p>Build understanding that lasts. Each step helps you build knowledge so new words and ideas make more sense.</p>
          <div class="cta-row">
            <button id="start-run" class="primary-button" type="button">${primaryLabel}</button>
            <a href="#/sequence" class="secondary-link">View the five sessions</a>
          </div>
        </div>
        <div class="home-v1-idea-map">
          <p class="eyebrow">Not a word list.</p>
          <h3>Words connect to ideas.</h3>
          <p>You read them in a text, connect them to families, and use them yourself.</p>
          <div class="word-map" aria-hidden="true">
            <span class="word-map-core">words</span>
            <span class="word-map-line word-map-line-top"></span>
            <span class="word-map-line word-map-line-right"></span>
            <span class="word-map-line word-map-line-bottom"></span>
            <span class="word-map-line word-map-line-left"></span>
            <span class="word-map-node word-map-node-top"></span>
            <span class="word-map-node word-map-node-right"></span>
            <span class="word-map-node word-map-node-bottom"></span>
            <span class="word-map-node word-map-node-left"></span>
            <span class="word-map-label word-map-label-top">meaning</span>
            <span class="word-map-label word-map-label-right">family</span>
            <span class="word-map-label word-map-label-bottom">use</span>
            <span class="word-map-label word-map-label-left">text</span>
          </div>
        </div>
      </section>

      <section class="home-v1-summary card">
        <article>
          <p class="eyebrow">Today’s Text</p>
          <h3>Severe Weather</h3>
          <p>This text is about how forecasters predict severe weather. The bigger work is learning how important words help a subject make sense.</p>
        </article>
        <article>
          <p class="eyebrow">Today’s Words</p>
          <div class="home-v1-word-list">
            ${contentPack.anchorWords.map((word) => `<span>${word.label}</span>`).join("")}
          </div>
        </article>
        <article>
          <p class="eyebrow">Today’s Family Clue</p>
          <h3>${contentPack.morphologyFamily.label} = ${contentPack.morphologyFamily.meaning}</h3>
          <p>${contentPack.morphologyFamily.taughtWords.join(" · ")} · ${contentPack.morphologyFamily.untaughtRelative}</p>
        </article>
      </section>

      <section class="home-v1-concepts" aria-label="Path concepts">
        <article class="home-v1-concept-card card">
          <div class="concept-mark concept-mark-1" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div>
            <h3>Read the text</h3>
            <p>Notice the words that carry the idea.</p>
          </div>
        </article>
        <article class="home-v1-concept-card card">
          <div class="concept-mark concept-mark-2" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div>
            <h3>Build the family</h3>
            <p>Use word parts to connect related words.</p>
          </div>
        </article>
        <article class="home-v1-concept-card card">
          <div class="concept-mark concept-mark-3" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div>
            <h3>Use and recall</h3>
            <p>Write with the words, then bring them back later.</p>
          </div>
        </article>
      </section>

      <section class="home-v1-path card">
        <div class="home-v1-path-copy">
          <p class="eyebrow">How the path works</p>
          <h3>Read. Connect. Choose. Use. Review.</h3>
          <p>This path starts with one text. The word work keeps building across five steps.</p>
        </div>
        <div class="home-v1-path-rail" aria-hidden="true">
          <span class="home-v1-start-tag">Start here</span>
          ${homeSessions.map((session) => `<span class="home-v1-rail-dot session-accent-${session.number}"></span>`).join("")}
        </div>
        <div class="home-v1-session-list" aria-label="Five-session path">
          ${homeSessions
            .map(
              (session) => `
                <article class="home-v1-session-row session-accent-${session.number}">
                  <strong>${session.number}. ${session.title}</strong>
                  <span>${session.helper}</span>
                  <span class="accent-chip">${session.subtitle}</span>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function bindHome() {
  const button = document.querySelector("#start-run");
  if (!button) return;

  button.addEventListener("click", () => {
    if (!run.startedAt) {
      startRun();
      return;
    }

    const nextStep = homeCurrentStepNumber();
    location.hash = nextStep === null ? "#/recap" : `#/session/${nextStep}`;
  });
}

function homeCurrentStepNumber() {
  for (const session of contentPack.sessions) {
    if (run.statuses[session.number] !== "completed") {
      return session.number <= run.unlockedSession ? session.number : run.unlockedSession;
    }
  }
  return null;
}

function sequenceNextSession() {
  const nextNumber = homeCurrentStepNumber() ?? contentPack.sessions[contentPack.sessions.length - 1].number;
  return contentPack.sessions.find((session) => session.number === nextNumber) ?? contentPack.sessions[0];
}

function sequenceOverviewContent() {
  const allCompleted = contentPack.sessions.every((session) => run.statuses[session.number] === "completed");
  if (allCompleted) {
    return {
      heading: "Sequence complete",
      body: "You can revisit any step or read the final recap.",
      showNext: false,
    };
  }

  if (run.startedAt) {
    return {
      heading: "Continue where you left off",
      body: "Continue from the next unfinished step.",
      showNext: true,
    };
  }

  return {
    heading: "Start the sequence",
    body: "Begin with the passage and notice the words that carry the weather idea.",
    showNext: true,
  };
}

function sequenceStatusLabel(status) {
  if (status === "not_started") return "Ready";
  if (status === "in_progress") return "In progress";
  if (status === "completed") return "Finished";
  return "Opens later";
}

function sequenceCtaLabel(status) {
  if (status === "not_started") return "Begin this step";
  if (status === "in_progress") return "Continue this step";
  if (status === "completed") return "Revisit this step";
  return "Opens after the earlier step";
}

function sequenceSessionHelper(number) {
  if (number === 1) {
    return "Read the passage for the weather idea. Then notice the words that help explain it.";
  }

  if (number === 2) {
    return "Start with transport. Use port = carry to build related words and try portable.";
  }

  if (number === 3) {
    return "Choose the word that best fits the sentence and the weather idea.";
  }

  if (number === 4) {
    return "Use the words in your own weather explanation.";
  }

  return "Review the words, take any second looks, try a related word, and write one final sentence.";
}

function learnerTransferState(states) {
  if (states.includes("full_success")) return "full_success";
  if (states.includes("recovered")) return "recovered";
  if (states.includes("failed")) return "failed";
  return "none";
}

function learnerTransferSummary(state) {
  if (state === "full_success") {
    return "You used port = carry to understand portable on the first try.";
  }

  if (state === "recovered") {
    return "You used port = carry to understand portable after a second look.";
  }

  if (state === "failed") {
    return "Portable still needs another look with port = carry.";
  }

  return "The related-word check is not ready yet.";
}

function sentenceWordStatus(status) {
  if (status === "correct") return "ready for now";
  if (status === "awkward") return "needs a clearer use";
  if (status === "missing") return "not used yet";
  return "review next";
}

function recapStatusLabel(status) {
  return status === "solid" ? "Steady for now" : "Needs another look";
}

function knowledgeStatusLabel(status) {
  return status === "solid" ? "Steady for now" : "Needs another look";
}

function renderSequence() {
  const overview = sequenceOverviewContent();
  const nextSession = sequenceNextSession();

  return `
    <section class="page-header editorial-header">
      <p class="eyebrow">Sequence</p>
      <h2>${contentPack.topicTitle}</h2>
      <p>${contentPack.missionQuestion}</p>
      <p class="deck">Across five short sessions, you’ll read about severe weather, study the words that explain it, use a word-family clue, and bring the words back in writing and review.</p>
      <p class="helper-text">A missed answer does not block the path. It shows which word or idea needs another look.</p>
    </section>

    <section class="grid two-up overview-grid session-1-workspace ${
      session1UsesFocusedWorkspace(currentStep) ? "session-1-focused-workspace" : ""
    }">
      <article class="card stat-card">
        <p class="eyebrow">Where you are</p>
        <h3>${overview.heading}</h3>
        <p>${overview.body}</p>
        ${overview.showNext ? `<p class="stat-number">Next: Session ${nextSession.number} — ${nextSession.title}</p>` : ""}
        <p>Your work is saved.</p>
      </article>
      <article class="card note-card-wide">
        <p class="eyebrow">How this sequence works</p>
        <h3>One weather idea, connected words</h3>
        <p>Each step brings the same words back in a new way, so the weather idea gets clearer.</p>
        <ul class="plain-list">
          <li>Read the passage and notice the key words.</li>
          <li>Use port = carry to connect transport with related words.</li>
          <li>Choose the word that best fits the sentence and the idea.</li>
          <li>Use the words in your own weather explanation.</li>
          <li>Review the words, try a related word, and write one final sentence.</li>
        </ul>
      </article>
    </section>

    <section class="session-list">
      ${contentPack.sessions
        .map((session) => {
          const status = sessionStatus(session.number);
          return `
            <article class="session-card session-${status} session-accent-${session.number}">
              <div class="session-copy">
                <div class="session-kicker-row">
                  <p class="eyebrow">Session ${session.number}</p>
                  <span class="accent-chip accent-${session.number}">${session.subtitle}</span>
                </div>
                <h3>${session.title}</h3>
                <p>${sequenceSessionHelper(session.number)}</p>
              </div>
              <div class="session-meta">
                <span class="status-pill">${sequenceStatusLabel(status)}</span>
                ${
                  status === "locked"
                    ? `<button class="ghost-button" type="button" disabled>${sequenceCtaLabel(status)}</button>`
                    : `<a class="primary-button accent-button accent-${session.number}" href="#/session/${session.number}">${sequenceCtaLabel(status)}</a>`
                }
              </div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function renderSession(number) {
  if (number > run.unlockedSession) {
    return `
      <section class="card">
        <h2>Session ${number} is locked</h2>
        <p>This step opens after the earlier word work is finished.</p>
        <a href="#/sequence" class="primary-button">Back to sequence</a>
      </section>
    `;
  }

  ensureSessionStarted(number);

  if (number === 1) return renderSession1();
  if (number === 2) return renderSession2();
  if (number === 3) return renderSession3();
  if (number === 4) return renderSession4();
  if (number === 5) return renderSession5();

  const session = contentPack.sessions.find((entry) => entry.number === number);
  const draftKey = `session_${number}`;
  const draftValue = run.drafts[draftKey] ?? "";

  return `
    <section class="page-header editorial-header session-accent-bar-${number}">
      <p class="eyebrow">Session ${number}</p>
      <h2>${session.title}</h2>
      <p class="session-subtitle">${session.subtitle}</p>
      <p>${session.objective}</p>
    </section>

    <section class="grid two-up">
      <article class="card">
        <h3>Build Notes</h3>
        <p><strong>Deliverable:</strong> ${session.deliverable}</p>
        <p>
          This screen is still a scaffold. Session 1 and Session 2 are the first fully implemented
          slices, and the same pattern can be reused here next.
        </p>
        ${renderSessionSpecificBlock(number)}
      </article>

      <article class="card">
        <h3>Implementation Scratchpad</h3>
        <label class="field-label" for="draft-input">
          Capture notes, prompts, or placeholder learner text for this session.
        </label>
        <textarea id="draft-input" rows="10" placeholder="Type here...">${escapeHtml(draftValue)}</textarea>
        <p class="helper-text">Saved locally so you can refresh and resume.</p>
      </article>
    </section>

    <section class="session-actions">
      <a href="#/sequence" class="secondary-link">Back to sequence</a>
      <button class="primary-button" id="complete-session" type="button">
        Mark Session ${number} Complete
      </button>
    </section>
  `;
}

function renderSession1() {
  const progress = run.sessionProgress[1];
  const currentStep = progress.step ?? "intro";
  const score = scoreSession1(progress.questionResponses);
  const canFinish = score.answeredCount === session1Questions.length;

  return `
    <section class="page-header editorial-header session-accent-bar-1">
      <p class="eyebrow">Session 1</p>
      <h2>Read & Notice</h2>
      <p class="session-subtitle">First Look</p>
      <p>${contentPack.missionQuestion}</p>
      <p class="deck">Read the passage once for the weather idea. Then read again to notice the words that help explain it.</p>
    </section>

    <section class="grid two-up overview-grid session-1-workspace ${
      session1UsesFocusedWorkspace(currentStep) ? "session-1-focused-workspace" : ""
    }">
      <article class="card play-surface session-accent-1">
        <div class="section-rule"></div>
        <h3>Session path</h3>
        <div class="stepper">
          ${renderStepPill("intro", currentStep, "Intro")}
          ${renderStepPill("prior", currentStep, "What I Know")}
          ${renderStepPill("first-read", currentStep, "First Read")}
          ${renderStepPill("second-pass", currentStep, "Second Pass")}
          ${renderStepPill("questions", currentStep, "Checks")}
          ${renderStepPill("wrap", currentStep, "Wrap")}
        </div>
        ${renderSession1Body(currentStep, progress, score)}
      </article>

      <article class="card sidebar-surface">
        <p class="eyebrow">Your Progress</p>
        <h3>What you’re building</h3>
        ${renderProgressChecklist([
          {
            label: `Before-reading note: ${progress.priorKnowledge ? "Saved" : "Not yet"}`,
            complete: Boolean(progress.priorKnowledge?.trim()),
          },
          {
            label: `Passage checks answered: ${score.answeredCount}/3`,
            complete: score.answeredCount === session1Questions.length,
          },
          {
            label: `Anchor words highlighted in the second pass: ${progress.exposuresLogged ? "Seen" : "Not yet"}`,
            complete: Boolean(progress.exposuresLogged),
          },
          {
            label: `Family clue shown: ${progress.familyExposureLogged ? "Seen" : "Not yet"}`,
            complete: Boolean(progress.familyExposureLogged),
          },
          {
            label: `Passage checks matched: ${score.correctCount}/3`,
            complete: score.correctCount === session1Questions.length,
          },
        ])}
        <p class="helper-text">Your work is saved. This first look gives the next session something to build on.</p>
      </article>
    </section>

    <section class="session-actions session-accent-1">
      <a href="#/sequence" class="secondary-link">Back to sequence</a>
      ${
        currentStep === "wrap"
          ? `<button class="primary-button accent-button accent-1" id="complete-session-1" type="button" ${
              canFinish ? "" : "disabled"
            }>Save and continue</button>`
          : `<button class="primary-button accent-button accent-1" id="next-step" type="button">${session1ForwardLabel(currentStep)}</button>`
      }
    </section>
  `;
}

function session1ForwardLabel(step) {
  if (step === "intro") return "Start with what you know";
  if (step === "prior") return "Read the passage";
  if (step === "first-read") return "Read again with word support";
  if (step === "second-pass") return "Check the passage";
  if (step === "questions") return "Go to wrap";
  return "Continue";
}

function session1UsesFocusedWorkspace(step) {
  return !["intro", "wrap"].includes(step);
}

function renderProgressChecklist(items) {
  return `
    <ul class="progress-checklist">
      ${items
        .map(
          (item) => `
            <li class="${item.complete ? "is-complete" : ""}">
              <span class="progress-check-icon" aria-hidden="true">${item.complete ? "✓" : ""}</span>
              <span>${item.label}</span>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
}

function renderSession2() {
  const progress = run.sessionProgress[2];
  const currentStep = progress.step ?? "preview";
  const roundsCompleted = session2Rounds.filter((round) => progress.rounds[round.id]?.completed).length;
  const transferStatus = progress.transfer.status ?? "not_started";
  const canFinish = roundsCompleted === session2Rounds.length && progress.transfer.completed;

  return `
    <section class="page-header editorial-header session-accent-bar-2">
      <p class="eyebrow">Session 2</p>
      <h2>Build the Word Family</h2>
      <p class="session-subtitle">Word Roots</p>
      <p>In the passage, transport helped explain how moving air carries heat and moisture. Now use the family clue port = carry to build related words.</p>
      <p class="deck">Build each word, check its meaning, then try the clue in one new related word.</p>
    </section>

    <section class="grid two-up overview-grid">
      <article class="card play-surface session-accent-2">
        <div class="section-rule"></div>
        <h3>Session path</h3>
        <div class="stepper">
          ${renderSession2StepPill("preview", currentStep, "Family Preview")}
          ${renderSession2StepPill("round_1", currentStep, "Build 1")}
          ${renderSession2StepPill("round_2", currentStep, "Build 2")}
          ${renderSession2StepPill("round_3", currentStep, "Build 3")}
          ${renderSession2StepPill("transfer", currentStep, "New Word")}
          ${renderSession2StepPill("wrap", currentStep, "Wrap")}
        </div>
        ${renderSession2Body(currentStep, progress)}
      </article>

      <article class="card sidebar-surface">
        <p class="eyebrow">Your Progress</p>
        <h3>Word family work</h3>
        <ul class="plain-list">
          <li>Family clue: port = carry</li>
          <li>Family words checked: ${roundsCompleted}/3</li>
          <li>transport: ${progress.rounds.s2_round_1?.completed ? "Checked" : "Not yet"}</li>
          <li>import: ${progress.rounds.s2_round_2?.completed ? "Checked" : "Not yet"}</li>
          <li>export: ${progress.rounds.s2_round_3?.completed ? "Checked" : "Not yet"}</li>
          <li>New-word check: ${session2TransferSidebarLabel(transferStatus)}</li>
        </ul>
        <p class="helper-text">This step checks how port = carry works across related words.</p>
      </article>
    </section>

    <section class="session-actions session-accent-2">
      <a href="#/sequence" class="secondary-link">Back to sequence</a>
      ${
        currentStep === "wrap"
          ? `<button class="primary-button accent-button accent-2" id="complete-session-2" type="button" ${
              canFinish ? "" : "disabled"
            }>Save and continue</button>`
          : `<button class="primary-button accent-button accent-2" id="advance-session-2" type="button">${session2ForwardLabel(currentStep)}</button>`
      }
    </section>
  `;
}

function session2ForwardLabel(step) {
  if (step === "preview") return "Start building words";
  if (step === "round_1") return "Continue to import";
  if (step === "round_2") return "Continue to export";
  if (step === "round_3") return "Try a new related word";
  if (step === "transfer") return "Go to wrap";
  return "Continue";
}

function session2TransferSidebarLabel(status) {
  if (status === "full_success") return "Portable fit on the first try";
  if (status === "recovered") return "Portable corrected after feedback";
  if (status === "failed") return "Portable needs another look";
  return "Not yet";
}

function session2TransferFeedback(status) {
  if (status === "full_success") {
    return "That fits the new word. Portable connects to port = carry, so a portable sensor is able to be carried easily.";
  }

  if (status === "recovered") {
    return "Now it fits. Portable connects to port = carry. Keep this family in review so the clue is easier to use later.";
  }

  if (status === "failed") {
    return "Not yet. Portable connects to port = carry, so it means able to be carried easily. This family needs another look.";
  }

  return "";
}

function session2RoundTitle(roundNumber) {
  if (roundNumber === 1) return "Build transport";
  if (roundNumber === 2) return "Build import";
  return "Build export";
}

function session2RoundPrompt(roundNumber) {
  if (roundNumber === 1) {
    return "Choose the first part that builds the word for carrying something across or from one place to another.";
  }

  if (roundNumber === 2) {
    return "Choose the first part that builds the word for carrying something in.";
  }

  return "Choose the first part that builds the word for carrying something out.";
}

function session2MeaningPrompt(roundNumber) {
  if (roundNumber === 1) return "Which meaning matches transport in the weather passage?";
  if (roundNumber === 2) return "Which meaning fits import in this family?";
  return "Which meaning fits export in this family?";
}

function session2RoundFeedback(roundNumber, isCorrect) {
  if (roundNumber === 1) {
    return isCorrect
      ? "That fits. Transport uses port = carry and means to carry from one place to another."
      : "Not quite. Transport should build from trans + port, and its meaning here is to carry from one place to another.";
  }

  if (roundNumber === 2) {
    return isCorrect
      ? "That fits. Import uses port = carry and means to carry in."
      : "Not quite. Import should build from im + port, and its meaning here is to carry in.";
  }

  return isCorrect
    ? "That fits. Export uses port = carry and means to carry out."
    : "Not quite. Export should build from ex + port, and its meaning here is to carry out.";
}

function renderSession3() {
  const progress = run.sessionProgress[3];
  sanitizeSession3Progress(progress);
  const currentStep = progress.step ?? "prompt_1";
  const completedPrompts = session3Prompts.filter((prompt) => promptCompleted(progress, prompt)).length;
  const canFinish = completedPrompts === session3Prompts.length;

  return `
    <section class="page-header editorial-header session-accent-bar-3">
      <p class="eyebrow">Session 3</p>
      <h2>Choose the Best Word</h2>
      <p class="session-subtitle">Best Fit</p>
      <p>Choose the word that fits the sentence and the weather idea.</p>
      <p class="deck">You’ll compare close meanings, order weather examples by strength, and write one clear sentence.</p>
    </section>

    <section class="grid two-up overview-grid">
      <article class="card play-surface session-accent-3">
        <div class="section-rule"></div>
        <h3>Session path</h3>
        <div class="stepper">
          ${session3Prompts
            .map((prompt, index) => renderSession3StepPill(`prompt_${index + 1}`, currentStep, session3StepLabels[index]))
            .join("")}
          ${renderSession3StepPill("wrap", currentStep, "Wrap")}
        </div>
        ${renderSession3Body(currentStep, progress)}
      </article>

      <article class="card sidebar-surface">
        <p class="eyebrow">Your Progress</p>
        <h3>Word precision</h3>
        <ul class="plain-list">
          <li>Short prompts finished: ${completedPrompts}/${session3Prompts.length}</li>
          <li>Short sentence: ${progress.prompt5Evaluator ? "Saved" : "Not yet"}</li>
          <li>Predict in sentence: ${sentenceWordStatus(progress.prompt5Evaluator?.target_words?.predict)}</li>
          <li>Pressure in sentence: ${sentenceWordStatus(progress.prompt5Evaluator?.target_words?.pressure)}</li>
        </ul>
        <p class="helper-text">Choose the word that fits the meaning. Then use one in a short weather sentence.</p>
      </article>
    </section>

    <section class="session-actions session-accent-3">
      <a href="#/sequence" class="secondary-link">Back to sequence</a>
      ${
        currentStep === "wrap"
          ? `<button class="primary-button accent-button accent-3" id="complete-session-3" type="button" ${
              canFinish ? "" : "disabled"
            }>Save and continue</button>`
          : `<button class="primary-button accent-button accent-3" id="advance-session-3" type="button">${
              currentStep === "prompt_5" ? "Go to Wrap" : "Continue"
            }</button>`
      }
    </section>
  `;
}

function renderSession4() {
  const progress = run.sessionProgress[4];
  const currentStep = progress.step ?? "draft_1";
  const canFinish = Boolean(progress.keptDraft);
  const currentEvaluation = session4CurrentEvaluation(progress);

  return `
    <section class="page-header editorial-header session-accent-bar-4">
      <p class="eyebrow">Session 4</p>
      <h2>Use the Words</h2>
      <p class="session-subtitle">Grow the Idea</p>
      <p>Use predict and pressure to explain how meteorologists warn a town before severe weather.</p>
      <p class="deck">Write one draft, read feedback and a model answer, then choose whether one revision will make your explanation clearer.</p>
    </section>

    <section class="grid two-up overview-grid">
      <article class="card play-surface session-accent-4">
        <div class="section-rule"></div>
        <h3>Session path</h3>
        <div class="stepper">
          ${renderSession4StepPill("draft_1", currentStep, "Draft 1")}
          ${renderSession4StepPill("feedback", currentStep, "Feedback")}
          ${renderSession4StepPill("revision", currentStep, "One Revision")}
          ${renderSession4StepPill("wrap", currentStep, "Wrap")}
        </div>
        ${renderSession4Body(currentStep, progress)}
      </article>

      <article class="card sidebar-surface">
        <p class="eyebrow">Your Progress</p>
        <h3>Explanation work</h3>
        <ul class="plain-list">
          <li>Draft 1: ${progress.draft1Evaluation ? "Submitted" : "Not yet"}</li>
          <li>Revision: ${session4RevisionStatus(progress)}</li>
          <li>Kept draft: ${progress.keptDraft ? (progress.keptDraft.source === "draft_2" ? "Revision kept" : "First draft kept") : "Not ready yet"}</li>
          <li>Required words: ${session4RequiredWordsStatus(currentEvaluation)}</li>
          <li>Transport (optional): ${session4TransportStatus(currentEvaluation, { sidebar: true })}</li>
          <li>Strongest sentence: ${progress.bestSentence ? "Saved" : "Not yet"}</li>
        </ul>
        <p class="helper-text">The stronger explanation carries into review.</p>
      </article>
    </section>

    <section class="session-actions session-accent-4">
      <a href="#/sequence" class="secondary-link">Back to sequence</a>
      ${
        currentStep === "wrap"
          ? `<button class="primary-button accent-button accent-4" id="complete-session-4" type="button" ${
              canFinish ? "" : "disabled"
            }>Save and continue</button>`
          : ""
      }
    </section>
  `;
}

function renderSession5() {
  ensureSession5Deck();
  const progress = run.sessionProgress[5];
  const currentCard = progress.deck[progress.currentIndex];
  const isWrap = !currentCard;
  const submitted = currentCard ? Boolean(progress.results[currentCard.instanceId]) : false;
  const deckCount = progress.deck.length;
  const completedCount = progress.deck.filter((card) => progress.results[card.instanceId]).length;
  const transferSummary = learnerTransferSummary(progress.transferStatus ?? "none");

  return `
    <section class="page-header editorial-header session-accent-bar-5">
      <p class="eyebrow">Session 5</p>
      <h2>Review & Recall</h2>
      <p class="session-subtitle">Revisit & Strengthen</p>
      <p>Bring the words back through short review, a second look when needed, and one final sentence.</p>
      <p class="deck">If a review card needs another look, it can return once in a new form. You still keep moving.</p>
    </section>

    <section class="grid two-up overview-grid">
      <article class="card play-surface session-accent-5">
        <div class="section-rule"></div>
        <h3>Review path</h3>
        <div class="soft-badge-row">
          <span class="status-pill">review steps: ${completedCount}/${deckCount}</span>
          <span class="status-pill">second looks: ${progress.retestsUsed}/2</span>
        </div>
        ${isWrap ? renderSession5Wrap(progress) : renderSession5Card(currentCard, progress)}
      </article>

      <article class="card sidebar-surface">
        <p class="eyebrow">Your Progress</p>
        <h3>Review evidence</h3>
        <ul class="plain-list">
          <li>Review steps: ${completedCount}/${deckCount}</li>
          <li>Related-word check: ${transferSummary}</li>
          <li>Second looks: ${progress.retestsUsed}/2</li>
          <li>Final sentence: ${progress.results.s5_card_7 ? "Submitted" : "Not yet"}</li>
        </ul>
        <p class="helper-text">Second looks help review a word once more.</p>
      </article>
    </section>

    <section class="session-actions session-accent-5">
      <a href="#/sequence" class="secondary-link">Back to sequence</a>
      ${
        isWrap
          ? `<button class="primary-button accent-button accent-5" id="complete-session-5" type="button">See final recap</button>`
          : `<button class="primary-button accent-button accent-5" id="advance-session-5" type="button">${session5AdvanceButtonLabel(currentCard, submitted)}</button>`
      }
    </section>
  `;
}

function session5AdvanceButtonLabel(currentCard, submitted) {
  if (!submitted) {
    return currentCard.kind === "typed" ? "Submit final sentence" : "Submit card";
  }

  return currentCard.kind === "typed" ? "Finish review" : "Next review card";
}

function renderStepPill(step, currentStep, label) {
  const status = session1StepStatus(step, currentStep);
  return `<span class="step-pill step-${status}">${label}</span>`;
}

function renderSession2StepPill(step, currentStep, label) {
  const status = session2StepStatus(step, currentStep);
  return `<span class="step-pill step-${status}">${label}</span>`;
}

function renderSession3StepPill(step, currentStep, label) {
  const status = session3StepStatus(step, currentStep);
  return `<span class="step-pill step-${status}">${label}</span>`;
}

function renderSession4StepPill(step, currentStep, label) {
  const status = session4StepStatus(step, currentStep);
  return `<span class="step-pill step-${status}">${label}</span>`;
}

function session1StepStatus(step, currentStep) {
  const order = ["intro", "prior", "first-read", "second-pass", "questions", "wrap"];
  const currentIndex = order.indexOf(currentStep);
  const stepIndex = order.indexOf(step);
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

function session2StepStatus(step, currentStep) {
  const order = ["preview", "round_1", "round_2", "round_3", "transfer", "wrap"];
  const currentIndex = order.indexOf(currentStep);
  const stepIndex = order.indexOf(step);
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

function session3StepStatus(step, currentStep) {
  const currentIndex = session3StepIndex(currentStep);
  const stepIndex = session3StepIndex(step);
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

function session4StepStatus(step, currentStep) {
  const order = ["draft_1", "feedback", "revision", "wrap"];
  const currentIndex = order.indexOf(currentStep);
  const stepIndex = order.indexOf(step);
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

function renderSession1Body(step, progress, score) {
  if (step === "intro") {
    return `
      <div class="section-rule"></div>
      <p><strong>Estimated time:</strong> 8-10 minutes</p>
      <p>You’ll start with what you know, then read a short weather passage.</p>
      <p>First, read for the whole idea. On the second pass, the important words will stand out.</p>
    `;
  }

  if (step === "prior") {
    return `
      <div class="section-rule"></div>
      <label class="field-label" for="prior-knowledge">
        Before you read, write one thing you know or wonder about how meteorologists know when severe weather might happen.
      </label>
      <textarea id="prior-knowledge" rows="6" placeholder="Type one short thought...">${escapeHtml(
        progress.priorKnowledge ?? "",
      )}</textarea>
      <p class="helper-text">Your note is saved. It does not need to be complete.</p>
    `;
  }

  if (step === "first-read") {
    return renderReadingBlock(false);
  }

  if (step === "second-pass") {
    return `
      <div class="grid two-up embedded-grid">
        <div>${renderReadingBlock(true)}</div>
        <aside class="support-panel">
          <p class="eyebrow">Word Support</p>
          <h4>Words that carry the weather idea</h4>
          <p class="helper-text">Use these clues when a sentence feels hard. Keep reading for the idea.</p>
          <ul class="plain-list">
            ${contentPack.anchorWords
              .map((word) => `<li><strong>${word.label}</strong>: ${word.clue}</li>`)
              .join("")}
          </ul>
          <div class="family-card">
            <p class="eyebrow">Family clue</p>
            <p>port means carry.</p>
            <p>The word transport uses this clue.</p>
          </div>
          <div class="family-card">
            <p class="eyebrow">Word parts to notice</p>
            <p class="helper-text">You do not need to memorize these yet. Just notice that word parts can carry meaning.</p>
            <ul class="plain-list">
              <li>dict in predict</li>
              <li>press in pressure</li>
            </ul>
          </div>
        </aside>
      </div>
    `;
  }

  if (step === "questions") {
    return `
      <div class="section-rule"></div>
      <h4>Check what the passage says</h4>
      <p class="helper-text">Use the passage and weather clues. Each check is about the topic or a word that helps explain it.</p>
      <div class="question-stack">
        ${session1Questions
          .map((question, index) => renderQuestionCard(question, index, progress.questionResponses[question.id]))
          .join("")}
      </div>
      <div class="score-card">
        <p><strong>Passage checks matched:</strong> ${score.correctCount}/3</p>
        <p>${score.answeredCount === session1Questions.length ? "All three checks are answered." : "Answer all three checks to finish Session 1."}</p>
      </div>
    `;
  }

  return `
    <div class="score-card">
      <h4>First look complete</h4>
      <p><strong>Passage checks matched:</strong> ${score.correctCount}/3</p>
      <p>You read how meteorologists use evidence to predict severe weather.</p>
      <p>These key words now have a first connection to the topic: predict, pressure, transport, and severe.</p>
      <p>Session 2 opens next. You’ll build the word family behind transport: port = carry.</p>
    </div>
  `;
}

function renderSession2Body(step, progress) {
  if (step === "preview") {
    return `
      <div class="section-rule"></div>
      <p class="eyebrow">Family Preview</p>
      <h4>One family clue across related words</h4>
      <p>You saw transport in the weather passage. It helped explain how moving air can carry heat and moisture.</p>
      <p>This family uses the clue port = carry.</p>
      <p>You’ll build transport, import, and export. Later, you’ll try portable with the same clue.</p>
      <p><strong>port = carry</strong></p>
      <div class="soft-badge-row">
        <span class="accent-chip accent-2">transport</span>
        <span class="accent-chip accent-2">import</span>
        <span class="accent-chip accent-2">export</span>
        <span class="accent-chip accent-4">portable</span>
      </div>
      <div class="support-block">
        <p class="eyebrow">Family clue</p>
        <h4>port means carry</h4>
        <p>A word family shares a meaningful part.</p>
        <p>In this family, port points to carry.</p>
        <p>The first part changes how the carrying works: across, in, or out.</p>
        <p class="helper-text">The clue gives you a starting meaning. The sentence still has to make sense.</p>
      </div>
    `;
  }

  if (step.startsWith("round_")) {
    const index = Number(step.split("_")[1]) - 1;
    const round = session2Rounds[index];
    const roundProgress = progress.rounds[round.id] ?? {};
    return renderSession2Round(round, roundProgress, index + 1);
  }

  if (step === "transfer") {
    return renderSession2Transfer(progress.transfer);
  }

  return `
    <div class="score-card">
      <h4>Word family work complete</h4>
      <p>You worked with port = carry across transport, import, and export.</p>
      <p>You also tried portable, a related word that was not directly built in the rounds.</p>
      <p>This family connects back to the weather idea: moving air can transport heat and moisture.</p>
      <p>Session 3 opens next. You’ll choose words that best fit the weather idea.</p>
      <ul class="plain-list">
        ${session2Rounds
          .map((round) => {
            const result = progress.rounds[round.id];
            const label = !result?.completed
              ? "needs another look"
              : result.isCorrect
                ? "ready for now"
                : "needs another look";
            return `<li>${round.targetWord}: ${label}</li>`;
          })
          .join("")}
        <li>New-word check: ${session2TransferSidebarLabel(progress.transfer.status ?? "not_started")}</li>
      </ul>
    </div>
  `;
}

function renderSession3Body(step, progress) {
  if (step === "wrap") {
    return `
      <div class="score-card">
        <h4>Best-fit work complete</h4>
        <p>You chose between close meanings and wrote one short weather sentence. Session 4 opens next. You’ll use the words in a fuller weather explanation.</p>
        <ul class="plain-list">
          ${session3Prompts
            .map((prompt, index) => `<li>${session3WrapLabels[index]}: ${promptCompleted(progress, prompt) ? "finished" : "needs another look"}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }

  const promptIndex = Number(step.split("_")[1]) - 1;
  const prompt = session3Prompts[promptIndex];

  if (prompt.type === "typed") {
    return renderSession3TypedPrompt(prompt, progress);
  }

  return renderSession3DeterministicPrompt(prompt, progress);
}

function renderSession4Body(step, progress) {
  if (step === "draft_1") {
    return `
      <div class="section-rule"></div>
      <article class="question-card">
        <div class="question-card-top">
          <span class="question-number">Draft 1</span>
        </div>
        <h4>${session4Config.prompt}</h4>
        <p class="helper-text">Use predict and pressure clearly. Use transport only if it helps explain moving air, heat, or moisture.</p>
        <details class="frames-panel">
          <summary>Sentence starters (optional)</summary>
          <p class="helper-text">Use one if it helps you begin. Change the words so the sentence sounds like yours.</p>
          <ul class="plain-list">
            ${session4Config.sentenceFrames.map((frame) => `<li>${frame}</li>`).join("")}
          </ul>
        </details>
        <textarea id="session4-draft1" rows="8" placeholder="Write your weather explanation...">${escapeHtml(
          progress.draft1Text ?? "",
        )}</textarea>
        <div class="soft-badge-row">
          <span class="status-pill">word count: ${countWords(progress.draft1Text ?? "")}</span>
          <span class="status-pill">target: 50–80 words, 3–4 sentences</span>
        </div>
        <div class="transfer-actions">
          <button type="button" class="primary-button accent-button accent-4" id="submit-session4-draft1">Submit first draft</button>
        </div>
      </article>
    `;
  }

  if (step === "feedback") {
    const evaluation = progress.draft1Evaluation;
    return `
      <div class="section-rule"></div>
      <article class="question-card">
        <div class="question-card-top">
          <span class="question-number">Feedback</span>
        </div>
        <h4>Draft 1 feedback</h4>
        <p class="helper-text">Use this feedback to decide whether one revision would make the explanation clearer.</p>
        ${renderSession4Evaluation(evaluation)}
        <div class="model-answer-block">
          <h4>Model answer</h4>
          <p class="helper-text">Use this as a guide for revision. Notice how the required words explain the weather idea.</p>
          <p>${session4Config.modelAnswer}</p>
        </div>
        <p class="helper-text">Keeping the first draft moves you to the wrap. Session 5 will still open.</p>
        <div class="choice-row">
          <button type="button" class="primary-button accent-button accent-4" id="go-to-revision">Revise once</button>
          <button type="button" class="ghost-button" id="skip-revision">Keep first draft</button>
        </div>
      </article>
    `;
  }

  if (step === "revision") {
    return `
      <div class="section-rule"></div>
      <article class="question-card">
        <div class="question-card-top">
          <span class="question-number">Revision</span>
        </div>
        <h4>Revise for clearer word use</h4>
        <p class="helper-text">You have one revision. Use the feedback and model answer to make predict and pressure clearer. If this draft is weaker, your first draft will stay.</p>
        <textarea id="session4-draft2" rows="8" placeholder="Revise your weather explanation...">${escapeHtml(
          progress.draft2Text ?? progress.draft1Text ?? "",
        )}</textarea>
        <div class="soft-badge-row">
          <span class="status-pill">word count: ${countWords(progress.draft2Text || progress.draft1Text || "")}</span>
          <span class="status-pill">one revision only</span>
        </div>
        <div class="transfer-actions">
          <button type="button" class="primary-button accent-button accent-4" id="submit-session4-draft2">Submit revision</button>
        </div>
      </article>
    `;
  }

  return `
    <div class="score-card">
      <h4>Explanation saved</h4>
      <p>${progress.keptDraft?.source === "draft_2" ? "Your revision is the kept draft for this sequence. This is the version that carries into review." : "Your first draft is the kept draft for this sequence. This is the version that carries into review."}</p>
      ${renderSession4Evaluation(progress.keptDraft?.evaluation)}
      <div class="soft-badge-row">
        <span class="status-pill">Draft status: ${session4DraftStatus(progress.keptDraft?.evaluation, { wrap: true })}</span>
        <span class="status-pill">Required words: ${session4RequiredWordsStatus(progress.keptDraft?.evaluation, { wrap: true })}</span>
        <span class="status-pill">Transport (optional): ${session4TransportStatus(progress.keptDraft?.evaluation, { wrap: true })}</span>
        <span class="status-pill">Strongest sentence: ${progress.bestSentence || progress.keptDraft?.evaluation?.best_sentence ? "Saved" : "Not yet"}</span>
      </div>
      <p>Session 5 opens next. You’ll review the words, try a related word, and write one final sentence.</p>
    </div>
  `;
}

function renderSession5Card(card, progress) {
  if (card.kind === "typed") {
    return renderSession5TypedCard(card, progress);
  }
  return renderSession5ChoiceCard(card, progress);
}

function renderSession5ChoiceCard(card, progress) {
  const response = progress.responses[card.instanceId];
  const result = progress.results[card.instanceId];
  const feedback =
    result
      ? `<p class="feedback ${result.finalResult ? "feedback-correct" : "feedback-incorrect"}">${
          result.finalResult ? "That fits." : "Not quite."
        } ${card.explanation}</p>`
      : "";

  return `
    <div class="section-rule"></div>
    <article class="question-card">
      <div class="question-card-top">
        <span class="question-number">${card.title}</span>
      </div>
      <h4>${card.prompt}</h4>
      ${card.isRetest ? `<p class="helper-text">Use the feedback from the first try. You still keep moving.</p>` : ""}
      <div class="option-list">
        ${card.options
          .map(
            (option, optionIndex) => `
              <label class="option-row">
                <input
                  type="radio"
                  name="${card.instanceId}"
                  value="${optionIndex}"
                  ${response?.selectedIndex === optionIndex ? "checked" : ""}
                />
                <span>${option}</span>
              </label>
            `,
          )
          .join("")}
      </div>
      ${feedback}
    </article>
  `;
}

function renderSession5TypedCard(card, progress) {
  const response = progress.responses[card.instanceId];
  const evaluation = progress.results[card.instanceId]?.evaluator;
  const ready = session5FinalSentenceReady(evaluation);
  const feedback =
    evaluation
      ? `<div class="feedback ${ready ? "feedback-correct" : "feedback-incorrect"}">${renderSession5FinalEvaluation(evaluation)}</div>`
      : "";

  return `
    <div class="section-rule"></div>
    <article class="question-card">
      <div class="question-card-top">
        <span class="question-number">${card.title}</span>
      </div>
      <h4>${card.prompt}</h4>
      <textarea id="session5-typed" rows="6" placeholder="Write your final weather sentence...">${escapeHtml(
        response?.text ?? "",
      )}</textarea>
      <div class="soft-badge-row">
        <span class="status-pill">word count: ${countWords(response?.text ?? "")}</span>
        <span class="status-pill">one final sentence</span>
      </div>
      ${feedback}
    </article>
  `;
}

function renderSession5Wrap(progress) {
  return `
    <div class="score-card">
      <h4>Review complete</h4>
      <p>You reviewed the words, took any second looks, and wrote one final sentence.</p>
      <p>The Final Recap opens next. It will show what is steady for now and what needs another look.</p>
    </div>
  `;
}

function renderSession5FinalEvaluation(evaluation) {
  if (!evaluation) return "";

  const pressureStatus = evaluation.required_words?.pressure;

  return `
    <h4>Final sentence feedback</h4>
    <p class="helper-text">This shows what is ready for now and what needs review.</p>
    <div class="soft-badge-row">
      <span class="status-pill">Sentence status: ${session5FinalSentenceReady(evaluation) ? "Ready for now" : "Review next"}</span>
      <span class="status-pill">Required word: ${session5RequiredWordStatus(evaluation)}</span>
      <span class="status-pill">Transport use: ${session5TransportStatus(evaluation)}</span>
      <span class="status-pill">Topic focus: ${session5TopicFocusLabel(evaluation.content_fit)}</span>
      <span class="status-pill">Weather idea: ${session5WeatherIdeaLabel(evaluation.content_accuracy)}</span>
    </div>
    <ul class="plain-list">
      <li>pressure: ${session5PressureFeedback(pressureStatus).label} — ${session5PressureFeedback(pressureStatus).message}</li>
      <li>transport: ${session5TransportFeedback(evaluation.family_use_quality).label} — ${session5TransportFeedback(evaluation.family_use_quality).message}</li>
      <li>Topic focus: ${session5TopicFocusLabel(evaluation.content_fit)} — ${session5TopicFocusMessage(evaluation.content_fit)}</li>
      <li>Weather idea: ${session5WeatherIdeaMessageLabel(evaluation.content_accuracy)} — ${session5WeatherIdeaMessage(evaluation.content_accuracy)}</li>
    </ul>
    <p><strong>Strongest sentence:</strong> ${evaluation.best_sentence ? escapeHtml(evaluation.best_sentence) : "No strongest sentence saved yet."}</p>
    ${renderSession5SentenceNotes(evaluation.sentence_level_feedback)}
  `;
}

function session5FinalSentenceReady(evaluation) {
  return Boolean(
    evaluation
      && evaluation.overall_flag === "solid"
      && evaluation.required_words?.pressure === "correct"
      && evaluation.family_use_quality === "accurate",
  );
}

function session5RequiredWordStatus(evaluation) {
  if (!evaluation) return "Not checked yet";
  return evaluation.required_words?.pressure === "correct" ? "Clear use" : "Needs clearer use";
}

function session5TransportStatus(evaluation) {
  if (!evaluation) return "Not checked yet";
  if (evaluation.family_use_quality === "accurate") return "Clear weather connection";
  if (evaluation.family_use_quality === "weak") return "Needs clearer weather connection";
  return "Not used yet";
}

function session5PressureFeedback(status) {
  if (status === "correct") {
    return {
      label: "Clear use",
      message: "Pressure is clear here.",
    };
  }

  if (status === "vague") {
    return {
      label: "Needs a clearer job",
      message: "Pressure appears, but it needs a clearer job in this sentence.",
    };
  }

  if (status === "awkward") {
    return {
      label: "Does not fit yet",
      message: "Pressure does not fit this sentence yet.",
    };
  }

  return {
    label: "Not used yet",
    message: "Add pressure. It is required for this final sentence.",
  };
}

function session5TransportFeedback(status) {
  if (status === "accurate") {
    return {
      label: "Clear weather connection",
      message: "Transport fits here. It explains how moving air carries heat or moisture.",
    };
  }

  if (status === "weak") {
    return {
      label: "Needs a clearer weather connection",
      message: "Transport appears, but connect it more clearly to moving air, heat, or moisture.",
    };
  }

  return {
    label: "Not used yet",
    message: "Add transport. It is required for this final sentence.",
  };
}

function session5TopicFocusLabel(status) {
  if (status === "on_topic") return "Stays on the weather task";
  if (status === "partly_off_topic") return "Partly leaves the weather task";
  return "Off the weather task";
}

function session5TopicFocusMessage(status) {
  if (status === "on_topic") return "Your sentence stays tied to how meteorologists predict or warn about weather.";
  if (status === "partly_off_topic") return "Part of the sentence fits, but part moves away from the weather task.";
  return "Bring the sentence back to severe weather and warnings.";
}

function session5WeatherIdeaLabel(status) {
  if (status === "accurate") return "Clear";
  if (status === "partly_accurate") return "Needs more support";
  return "Needs correction";
}

function session5WeatherIdeaMessageLabel(status) {
  if (status === "accurate") return "Weather idea is clear";
  if (status === "partly_accurate") return "Weather idea needs more support";
  return "Weather idea needs correction";
}

function session5WeatherIdeaMessage(status) {
  if (status === "accurate") return "The weather idea is clear enough for this final sentence.";
  if (status === "partly_accurate") return "The weather idea is partly right, but it needs a clearer explanation.";
  return "The weather idea needs correction before it feels steady.";
}

function renderSession5SentenceNotes(items = []) {
  if (!items.length) return "";

  return `
    <ul class="plain-list">
      ${items.map((item) => `<li>Sentence note: ${escapeHtml(item.message)}</li>`).join("")}
    </ul>
  `;
}

function renderReadingBlock(withSupports) {
  return `
    <div class="support-block">
      <p class="eyebrow">${withSupports ? "Second Pass" : "First Read"}</p>
      <h4>${withSupports ? "Read again with word support" : "Weather passage"}</h4>
      <p class="helper-text">${
        withSupports
          ? "This time, slow down near the highlighted words. They help explain how forecasters understand severe weather."
          : "Read once all the way through. Try to understand what meteorologists study before a storm."
      }</p>
      <p class="reading-text">
        ${withSupports ? highlightWords(contentPack.mainText) : escapeHtml(contentPack.mainText)}
      </p>
      <h4>Weather clues</h4>
      <ul class="plain-list">
        ${contentPack.visualNotes.map((note) => `<li>${note}</li>`).join("")}
      </ul>
      ${
        withSupports
          ? `<p class="helper-text">Use the highlights and notes when they help the passage make sense.</p>`
          : `<p class="helper-text">No word clues yet. First, follow the weather idea.</p>`
      }
    </div>
  `;
}

function highlightWords(text) {
  let highlighted = escapeHtml(text);
  for (const word of contentPack.anchorWords) {
    const pattern = new RegExp(`\\b${word.label}\\b`, "gi");
    highlighted = highlighted.replace(pattern, `<mark>${word.label}</mark>`);
  }
  return highlighted;
}

function renderQuestionCard(question, index, selectedIndex) {
  const result = scoreQuestion(question, selectedIndex);
  const feedback =
    selectedIndex === undefined
      ? ""
      : `<p class="feedback ${result.correct ? "feedback-correct" : "feedback-incorrect"}">${
          result.correct ? "That matches the passage." : "Not quite."
        } ${question.explanation}</p>`;

  return `
    <article class="question-card">
      <div class="question-card-top">
        <span class="question-number">${question.label ?? `Q${index + 1}`}</span>
      </div>
      <h4>${question.title ?? `Question ${index + 1}`}</h4>
      <p>${question.prompt}</p>
      <div class="option-list">
        ${question.options
          .map(
            (option, optionIndex) => `
              <label class="option-row">
                <input
                  type="radio"
                  name="${question.id}"
                  value="${optionIndex}"
                  ${selectedIndex === optionIndex ? "checked" : ""}
                />
                <span>${option}</span>
              </label>
            `,
          )
          .join("")}
      </div>
      ${feedback}
    </article>
  `;
}

function renderSession2Round(round, roundProgress, roundNumber) {
  const builtWord = roundProgress.selectedPrefix
    ? `${roundProgress.selectedPrefix}${round.base}`
    : `__${round.base}`;
  const buildReady = Boolean(roundProgress.selectedPrefix);
  const meaningAnswered = roundProgress.meaningChoice !== undefined;
  const feedback =
    roundProgress.completed === true
      ? `<p class="feedback ${roundProgress.isCorrect ? "feedback-correct" : "feedback-incorrect"}">${session2RoundFeedback(roundNumber, roundProgress.isCorrect)}</p>`
      : "";

  return `
    <div class="section-rule"></div>
    <article class="question-card">
      <div class="question-card-top">
        <span class="question-number">Build ${roundNumber}</span>
      </div>
      <h4>${session2RoundTitle(roundNumber)}</h4>
      <p>${session2RoundPrompt(roundNumber)}</p>
      <p class="helper-text">Tap one first part to build the word with port. Then check what the word means.</p>
      <div class="build-row">
        ${round.prefixes
          .map(
            (prefix) => `
              <button
                type="button"
                class="choice-chip ${roundProgress.selectedPrefix === prefix ? "choice-chip-selected" : ""}"
                data-session2-prefix="${round.id}:${prefix}"
              >
                ${prefix}
              </button>
            `,
          )
          .join("")}
        <span class="word-build-preview">Word built: ${builtWord}</span>
      </div>
      <div class="meaning-block">
        <h4>Check the meaning</h4>
        <p class="helper-text">The family clue helps, but the whole word has to fit the meaning.</p>
        <p>${session2MeaningPrompt(roundNumber)}</p>
        <div class="option-list">
          ${round.meaningOptions
            .map(
              (option, optionIndex) => `
                <label class="option-row">
                  <input
                    type="radio"
                    name="${round.id}_meaning"
                    value="${optionIndex}"
                    ${roundProgress.meaningChoice === optionIndex ? "checked" : ""}
                  />
                  <span>${option}</span>
                </label>
              `,
            )
            .join("")}
        </div>
      </div>
      <div class="soft-badge-row">
        <span class="status-pill">${buildReady ? "word built" : "choose prefix"}</span>
        <span class="status-pill">${meaningAnswered ? "meaning answered" : "meaning next"}</span>
      </div>
      ${feedback}
    </article>
  `;
}

function renderSession2Transfer(transferProgress) {
  const feedback =
    transferProgress.status === null
      ? ""
      : `<p class="feedback ${
          transferProgress.status === "failed" ? "feedback-incorrect" : "feedback-correct"
        }">${session2TransferFeedback(transferProgress.status)}</p>`;

  return `
    <div class="section-rule"></div>
    <article class="question-card">
      <div class="question-card-top">
        <span class="question-number">New Word</span>
      </div>
      <h4>Try the family clue in a new word</h4>
      <p>${session2Transfer.prompt}</p>
      <p class="helper-text">
        You did not build this word in the rounds. Use port = carry, then choose the meaning that fits the sentence.
      </p>
      <div class="option-list">
        ${session2Transfer.options
          .map(
            (option, optionIndex) => `
              <label class="option-row">
                <input
                  type="radio"
                  name="${session2Transfer.id}"
                  value="${optionIndex}"
                  ${transferProgress.finalChoice === optionIndex ? "checked" : ""}
                />
                <span>${option}</span>
              </label>
            `,
          )
          .join("")}
      </div>
      ${feedback}
      <div class="transfer-actions">
        <button type="button" class="primary-button accent-button accent-2" id="submit-transfer">
          ${transferProgress.firstChoice === null ? "Submit new-word check" : "Update new-word check"}
        </button>
      </div>
    </article>
  `;
}

function renderSession3DeterministicPrompt(prompt, progress) {
  const saved = progress.responses[prompt.id];
  const feedback =
    saved && progress.results[prompt.id]
      ? `<p class="feedback ${progress.results[prompt.id].finalResult ? "feedback-correct" : "feedback-incorrect"}">${
          progress.results[prompt.id].finalResult ? "That fits." : "Not quite."
        } ${prompt.explanation}</p>`
      : "";

  if (prompt.type === "choice") {
    return `
      <div class="section-rule"></div>
      <article class="question-card">
        <div class="question-card-top">
          <span class="question-number">${prompt.title}</span>
        </div>
        <h4>${prompt.prompt}</h4>
        <div class="option-list">
          ${prompt.options
            .map(
              (option, optionIndex) => `
                <label class="option-row">
                  <input
                    type="radio"
                    name="${prompt.id}"
                    value="${optionIndex}"
                    ${saved?.selectedIndex === optionIndex ? "checked" : ""}
                  />
                  <span>${option}</span>
                </label>
              `,
            )
            .join("")}
        </div>
        ${feedback}
      </article>
    `;
  }

  return `
    <div class="section-rule"></div>
    <article class="question-card">
      <div class="question-card-top">
        <span class="question-number">${prompt.title}</span>
      </div>
      <h4>${prompt.prompt}</h4>
      <p class="helper-text">${prompt.helperText ?? "Use the meaning to decide the order."}</p>
      <div class="order-grid">
        ${prompt.options
          .map(
            (option, slotIndex) => `
              <label class="option-row">
                <span class="order-slot">${slotIndex + 1}</span>
                <select data-session3-order="${prompt.id}:${slotIndex}" class="order-select">
                  <option value="">Choose…</option>
                  ${prompt.options
                    .map(
                      (candidate) =>
                        `<option value="${candidate}" ${saved?.selectedOrder?.[slotIndex] === candidate ? "selected" : ""}>${candidate}</option>`,
                    )
                    .join("")}
                </select>
              </label>
            `,
          )
          .join("")}
      </div>
      ${feedback}
    </article>
  `;
}

function renderSession3TypedPrompt(prompt, progress) {
  const sentence = progress.prompt5Text ?? "";
  const wordCount = countWords(sentence);
  const evaluator = progress.prompt5Evaluator;
  const correctionMessage =
    progress.results[prompt.id]?.needsCorrection === true
      ? `<p class="feedback feedback-incorrect">That sentence is ${wordCount} words long. Revise once so it is 15 to 25 words.</p>`
      : "";
  const feedback =
    evaluator
      ? `<div class="feedback ${Object.values(evaluator.target_words).includes("correct") ? "feedback-correct" : "feedback-incorrect"}">
          <p>${evaluator.feedback_summary.join(" ")}</p>
        </div>`
      : "";

  return `
    <div class="section-rule"></div>
    <article class="question-card">
      <div class="question-card-top">
        <span class="question-number">${prompt.title}</span>
      </div>
      <h4>${prompt.prompt}</h4>
      <textarea id="session3-typed" rows="6" placeholder="Write one clear sentence...">${escapeHtml(sentence)}</textarea>
      <div class="soft-badge-row">
        <span class="status-pill">word count: ${wordCount}</span>
        <span class="status-pill">target: 15-25</span>
        <span class="status-pill">${progress.prompt5CorrectionUsed ? "length revision used" : "length revision available"}</span>
      </div>
      ${correctionMessage}
      ${feedback}
      <div class="transfer-actions">
        <button type="button" class="primary-button accent-button accent-3" id="submit-session3-typed">Submit Sentence</button>
      </div>
    </article>
  `;
}

function renderSession4Evaluation(evaluation) {
  if (!evaluation) return "<p class=\"helper-text\">No feedback yet.</p>";

  return `
    <div class="evaluation-grid">
      <div class="soft-badge-row">
        <span class="status-pill">Draft status: ${session4DraftStatus(evaluation)}</span>
        <span class="status-pill">Transport use: ${session4TransportUseLabel(evaluation.family_use_quality)}</span>
        <span class="status-pill">Topic focus: ${session4ContentFitLabel(evaluation.content_fit)}</span>
        <span class="status-pill">Weather idea: ${session4ContentAccuracyLabel(evaluation.content_accuracy)}</span>
      </div>
      <ul class="plain-list">
        ${Object.entries(evaluation.required_words)
          .map(([word, status]) => {
            const feedback = session4RequiredWordFeedback(word, status);
            return `<li>${word}: ${feedback.label} — ${feedback.message}</li>`;
          })
          .join("")}
        <li>transport: ${session4TransportUseLabel(evaluation.family_use_quality)} — ${session4TransportUseMessage(evaluation.family_use_quality)}</li>
        <li>Topic focus: ${session4ContentFitLabel(evaluation.content_fit)} — ${session4ContentFitMessage(evaluation.content_fit)}</li>
        <li>Weather idea: ${session4ContentAccuracyLabel(evaluation.content_accuracy)} — ${session4ContentAccuracyMessage(evaluation.content_accuracy)}</li>
      </ul>
      <p><strong>Strongest sentence:</strong> ${evaluation.best_sentence ? escapeHtml(evaluation.best_sentence) : "No strongest sentence saved yet."}</p>
      ${renderSentenceLevelFeedback(evaluation.sentence_level_feedback)}
    </div>
  `;
}

function session4CurrentEvaluation(progress) {
  return progress.keptDraft?.evaluation
    ?? progress.draft2Evaluation
    ?? progress.draft1Evaluation
    ?? null;
}

function session4RevisionStatus(progress) {
  if (progress.draft2Evaluation) return "Used";
  if (progress.revisionChoice === "skip" || progress.keptDraft?.source === "draft_1") return "Kept first draft";
  if (progress.draft1Evaluation && !progress.keptDraft) return "Available after feedback";
  return "Not yet";
}

function session4DraftStatus(evaluation, { wrap = false } = {}) {
  if (!evaluation) return wrap ? "Review next" : "Not checked yet";

  const ready =
    evaluation.overall_flag === "solid"
    && session4HasBothRequiredWordsClear(evaluation);

  if (ready) return "Ready for now";
  return wrap ? "Review next" : "Revise for clarity";
}

function session4HasBothRequiredWordsClear(evaluation) {
  if (!evaluation?.required_words) return false;

  return session4Config.requiredWords.every(
    (word) => evaluation.required_words[word] === "correct",
  );
}

function session4RequiredWordsStatus(evaluation) {
  if (!evaluation) return "Not checked yet";
  return session4HasBothRequiredWordsClear(evaluation)
    ? "Both clear"
    : "Needs clearer use";
}

function session4TransportStatus(evaluation, { wrap = false } = {}) {
  if (!evaluation) return wrap ? "Not used this time" : "Not checked yet";
  if (evaluation.family_use_quality === "accurate") return wrap ? "Clear use" : "Clear use";
  if (evaluation.family_use_quality === "weak") return wrap ? "Needs clearer link" : "Needs clearer link";
  return "Not used this time";
}

function session4TransportUseLabel(status) {
  if (status === "accurate") return "Clear weather connection";
  if (status === "weak") return "Needs clearer weather connection";
  return "Not used this time";
}

function session4ContentFitLabel(status) {
  if (status === "on_topic") return "Stays on the weather task";
  if (status === "partly_off_topic") return "Partly leaves the weather task";
  return "Off the weather task";
}

function session4ContentAccuracyLabel(status) {
  if (status === "accurate") return "Weather idea is clear";
  if (status === "partly_accurate") return "Weather idea needs more support";
  return "Weather idea needs correction";
}

function session4RequiredWordFeedback(word, status) {
  const wordLabel = capitalize(word);
  if (status === "correct") {
    return {
      label: "Clear use",
      message: `${wordLabel} is clear here.`,
    };
  }

  if (status === "vague") {
    return {
      label: "Needs a clearer job",
      message: `${wordLabel} appears, but it needs a clearer job in the explanation.`,
    };
  }

  if (status === "awkward") {
    return {
      label: "Does not fit yet",
      message: `${wordLabel} does not fit this sentence yet. Revise the sentence so the meaning works.`,
    };
  }

  return {
    label: "Not used yet",
    message: `Add ${word}. It is required for this explanation.`,
  };
}

function session4TransportUseMessage(status) {
  if (status === "accurate") return "Transport fits here. It explains how moving air carries heat or moisture.";
  if (status === "weak") return "Transport appears, but connect it more clearly to moving air, heat, or moisture.";
  return "Transport is optional. Use it only if it helps the explanation.";
}

function session4ContentFitMessage(status) {
  if (status === "on_topic") return "Your explanation stays tied to how meteorologists warn people.";
  if (status === "partly_off_topic") return "Some of the explanation fits, but part of it moves away from the weather task.";
  return "Bring the explanation back to severe weather and warnings.";
}

function session4ContentAccuracyMessage(status) {
  if (status === "accurate") return "The weather idea is clear enough for this draft.";
  if (status === "partly_accurate") return "The weather idea is partly right, but it needs a clearer explanation.";
  return "The weather idea needs correction before the explanation feels steady.";
}

function renderSentenceLevelFeedback(items = []) {
  if (!items.length) return "";

  return `
    <ul class="plain-list">
      ${items
        .map(
          (item) =>
            `<li>Sentence ${item.sentence_index}: ${item.message}</li>`,
        )
        .join("")}
    </ul>
  `;
}

function scoreQuestion(question, selectedIndex) {
  return { correct: Number(selectedIndex) === question.correctIndex };
}

function scoreSession1(responses) {
  const answeredCount = session1Questions.filter((question) => responses[question.id] !== undefined).length;
  const correctCount = session1Questions.filter(
    (question) => responses[question.id] !== undefined && scoreQuestion(question, responses[question.id]).correct,
  ).length;
  return { answeredCount, correctCount };
}

function bindSession(number) {
  if (number === 1) {
    bindSession1();
    return;
  }

  if (number === 2) {
    bindSession2();
    return;
  }

  if (number === 3) {
    bindSession3();
    return;
  }

  if (number === 4) {
    bindSession4();
    return;
  }

  if (number === 5) {
    bindSession5();
    return;
  }

  const textArea = document.querySelector("#draft-input");
  const completeButton = document.querySelector("#complete-session");

  if (textArea) {
    textArea.addEventListener("input", (event) => {
      updateDraft(`session_${number}`, event.target.value);
    });
  }

  if (completeButton) {
    completeButton.addEventListener("click", () => completeSession(number));
  }
}

function bindSession1() {
  const progress = run.sessionProgress[1];
  const priorTextArea = document.querySelector("#prior-knowledge");
  const nextButton = document.querySelector("#next-step");
  const finishButton = document.querySelector("#complete-session-1");
  const radios = document.querySelectorAll('input[type="radio"]');

  if (priorTextArea) {
    priorTextArea.addEventListener("input", (event) => {
      progress.priorKnowledge = event.target.value;
      saveRun(run);
    });
  }

  for (const radio of radios) {
    radio.addEventListener("change", (event) => {
      const { name, value } = event.target;
      progress.questionResponses[name] = Number(value);
      const question = session1Questions.find((item) => item.id === name);
      const result = scoreQuestion(question, Number(value));

      progress.questionResults[name] = {
        firstResult: progress.questionResults[name]?.firstResult ?? result.correct,
        finalResult: result.correct,
        targetIds: question.targetIds,
      };

      storeAttempt({
        sessionNumber: 1,
        attemptId: name,
        selectedIndex: Number(value),
        correct: result.correct,
        targetIds: question.targetIds,
        contentTargetIds: question.contentTargetIds,
      });

      saveRun(run);
      render();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      advanceSession1Step();
      render();
    });
  }

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      completeSession(1);
    });
  }
}

function bindSession2() {
  const progress = run.sessionProgress[2];
  const advanceButton = document.querySelector("#advance-session-2");
  const finishButton = document.querySelector("#complete-session-2");
  const transferButton = document.querySelector("#submit-transfer");
  const prefixButtons = document.querySelectorAll("[data-session2-prefix]");
  const meaningRadios = document.querySelectorAll('input[name$="_meaning"]');

  for (const button of prefixButtons) {
    button.addEventListener("click", () => {
      const [roundId, prefix] = button.dataset.session2Prefix.split(":");
      const roundState = progress.rounds[roundId] ?? {};
      const round = session2Rounds.find((entry) => entry.id === roundId);
      roundState.selectedPrefix = prefix;
      roundState.buildCorrect = prefix === round.correctPrefix;
      progress.rounds[roundId] = roundState;
      saveRun(run);
      render();
    });
  }

  for (const radio of meaningRadios) {
    radio.addEventListener("change", (event) => {
      const roundId = event.target.name.replace("_meaning", "");
      const round = session2Rounds.find((entry) => entry.id === roundId);
      const roundState = progress.rounds[roundId] ?? {};
      roundState.meaningChoice = Number(event.target.value);
      roundState.meaningCorrect = roundState.meaningChoice === round.correctMeaningIndex;
      progress.rounds[roundId] = roundState;
      saveRun(run);
      render();
    });
  }

  if (transferButton) {
    transferButton.addEventListener("click", () => {
      const checked = document.querySelector(`input[name="${session2Transfer.id}"]:checked`);
      if (!checked) return;
      submitSession2Transfer(Number(checked.value));
      render();
    });
  }

  if (advanceButton) {
    advanceButton.addEventListener("click", () => {
      advanceSession2Step();
      render();
    });
  }

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      completeSession(2);
    });
  }
}

function bindSession3() {
  const progress = run.sessionProgress[3];
  const advanceButton = document.querySelector("#advance-session-3");
  const finishButton = document.querySelector("#complete-session-3");
  const typedInput = document.querySelector("#session3-typed");
  const typedSubmit = document.querySelector("#submit-session3-typed");
  const choiceRadios = document.querySelectorAll('input[name^="s3_prompt_"]');
  const orderSelects = document.querySelectorAll("[data-session3-order]");

  for (const radio of choiceRadios) {
    radio.addEventListener("change", (event) => {
      const prompt = session3Prompts.find((item) => item.id === event.target.name);
      const selectedIndex = Number(event.target.value);
      progress.responses[prompt.id] = { selectedIndex };
      updateSession3DeterministicResult(prompt, progress.responses[prompt.id], progress);
      saveRun(run);
      render();
    });
  }

  for (const select of orderSelects) {
    select.addEventListener("change", () => {
      const [promptId, slotIndexRaw] = select.dataset.session3Order.split(":");
      const slotIndex = Number(slotIndexRaw);
      const response = progress.responses[promptId] ?? { selectedOrder: ["", "", ""] };
      const nextOrder = [...(response.selectedOrder ?? ["", "", ""])];
      nextOrder[slotIndex] = select.value;
      progress.responses[promptId] = { selectedOrder: nextOrder };
      const prompt = session3Prompts.find((item) => item.id === promptId);
      if (promptCompleted(progress, prompt)) {
        updateSession3DeterministicResult(prompt, progress.responses[prompt.id], progress);
      } else {
        delete progress.results[prompt.id];
      }
      saveRun(run);
      render();
    });
  }

  if (typedInput) {
    typedInput.addEventListener("input", (event) => {
      progress.prompt5Text = event.target.value;
      saveRun(run);
    });
  }

  if (typedSubmit) {
    typedSubmit.addEventListener("click", () => {
      submitSession3Typed();
      render();
    });
  }

  if (advanceButton) {
    advanceButton.addEventListener("click", () => {
      advanceSession3Step();
      render();
    });
  }

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      completeSession(3);
    });
  }
}

function bindSession4() {
  const progress = run.sessionProgress[4];
  const draft1 = document.querySelector("#session4-draft1");
  const draft2 = document.querySelector("#session4-draft2");
  const submitDraft1 = document.querySelector("#submit-session4-draft1");
  const submitDraft2 = document.querySelector("#submit-session4-draft2");
  const goToRevision = document.querySelector("#go-to-revision");
  const skipRevision = document.querySelector("#skip-revision");
  const completeButton = document.querySelector("#complete-session-4");

  if (draft1) {
    draft1.addEventListener("input", (event) => {
      progress.draft1Text = event.target.value;
      saveRun(run);
    });
  }

  if (draft2) {
    draft2.addEventListener("input", (event) => {
      progress.draft2Text = event.target.value;
      saveRun(run);
    });
  }

  if (submitDraft1) {
    submitDraft1.addEventListener("click", () => {
      submitSession4Draft1();
      render();
    });
  }

  if (submitDraft2) {
    submitDraft2.addEventListener("click", () => {
      submitSession4Draft2();
      render();
    });
  }

  if (goToRevision) {
    goToRevision.addEventListener("click", () => {
      progress.revisionChoice = "revise";
      progress.step = "revision";
      if (!progress.draft2Text) progress.draft2Text = progress.draft1Text;
      saveRun(run);
      render();
    });
  }

  if (skipRevision) {
    skipRevision.addEventListener("click", () => {
      progress.revisionChoice = "skip";
      finalizeSession4KeepBest();
      progress.step = "wrap";
      saveRun(run);
      render();
    });
  }

  if (completeButton) {
    completeButton.addEventListener("click", () => {
      completeSession(4);
    });
  }
}

function bindSession5() {
  ensureSession5Deck();
  const progress = run.sessionProgress[5];
  const currentCard = progress.deck[progress.currentIndex];
  const advanceButton = document.querySelector("#advance-session-5");
  const completeButton = document.querySelector("#complete-session-5");
  const radios = document.querySelectorAll('input[name^="s5_"]');
  const typed = document.querySelector("#session5-typed");

  for (const radio of radios) {
    radio.addEventListener("change", (event) => {
      progress.responses[currentCard.instanceId] = {
        selectedIndex: Number(event.target.value),
      };
      saveRun(run);
    });
  }

  if (typed) {
    typed.addEventListener("input", (event) => {
      progress.responses[currentCard.instanceId] = {
        text: event.target.value,
      };
      saveRun(run);
    });
  }

  if (advanceButton) {
    advanceButton.addEventListener("click", () => {
      if (progress.results[currentCard.instanceId]) {
        progress.currentIndex += 1;
        saveRun(run);
        render();
        return;
      }

      submitSession5CurrentCard();
      render();
    });
  }

  if (completeButton) {
    completeButton.addEventListener("click", () => {
      completeSession(5);
    });
  }
}

function advanceSession1Step() {
  const progress = run.sessionProgress[1];
  const order = ["intro", "prior", "first-read", "second-pass", "questions", "wrap"];
  const currentIndex = order.indexOf(progress.step ?? "intro");

  if (progress.step === "prior" && !progress.priorKnowledge.trim()) return;
  if (progress.step === "second-pass") logSession1Exposure();

  if (progress.step === "questions") {
    const score = scoreSession1(progress.questionResponses);
    progress.score = score.correctCount;
    if (score.answeredCount !== session1Questions.length) return;
  }

  progress.step = order[Math.min(currentIndex + 1, order.length - 1)];
  saveRun(run);
}

function advanceSession2Step() {
  const progress = run.sessionProgress[2];
  const order = ["preview", "round_1", "round_2", "round_3", "transfer", "wrap"];
  const currentStep = progress.step ?? "preview";
  const currentIndex = order.indexOf(currentStep);

  if (currentStep.startsWith("round_")) {
    const round = session2Rounds[Number(currentStep.split("_")[1]) - 1];
    const roundState = progress.rounds[round.id] ?? {};
    if (!roundState.selectedPrefix || roundState.meaningChoice === undefined) return;

    roundState.completed = true;
    roundState.isCorrect = roundState.buildCorrect === true && roundState.meaningCorrect === true;
    progress.rounds[round.id] = roundState;

    storeAttempt({
      sessionNumber: 2,
      attemptId: round.id,
      selectedPrefix: roundState.selectedPrefix,
      meaningChoice: roundState.meaningChoice,
      correct: roundState.isCorrect,
      targetIds: round.targetIds,
      contentTargetIds: round.contentTargetIds,
    });

    logSession2RoundEvidence(round, roundState);
  }

  if (currentStep === "transfer" && !progress.transfer.completed) return;

  progress.step = order[Math.min(currentIndex + 1, order.length - 1)];
  saveRun(run);
}

function advanceSession3Step() {
  const progress = run.sessionProgress[3];
  const currentStep = progress.step ?? "prompt_1";
  const currentIndex = session3StepIndex(currentStep);

  if (currentStep !== "wrap") {
    const prompt = session3Prompts[currentIndex];
    if (!promptCompleted(progress, prompt)) return;

    if (prompt.type === "choice") {
      const response = progress.responses[prompt.id];
      const result = progress.results[prompt.id] ?? updateSession3DeterministicResult(prompt, response, progress);
      const correct = result.finalResult;
      storeAttempt({
        sessionNumber: 3,
        attemptId: prompt.id,
        selectedIndex: response.selectedIndex,
        correct,
        targetIds: prompt.targetIds,
        contentTargetIds: prompt.contentTargetIds,
      });
      logSession3DeterministicEvidence(prompt, correct);
    }

    if (prompt.type === "order") {
      const response = progress.responses[prompt.id];
      const result = progress.results[prompt.id] ?? updateSession3DeterministicResult(prompt, response, progress);
      const correct = result.finalResult;
      storeAttempt({
        sessionNumber: 3,
        attemptId: prompt.id,
        selectedOrder: response.selectedOrder,
        correct,
        targetIds: prompt.targetIds,
        contentTargetIds: prompt.contentTargetIds,
      });
      logSession3DeterministicEvidence(prompt, correct);
    }
  }

  progress.step = session3StepOrder[Math.min(currentIndex + 1, session3StepOrder.length - 1)];
  saveRun(run);
}

function submitSession2Transfer(choiceIndex) {
  const transfer = run.sessionProgress[2].transfer;
  const isCorrect = choiceIndex === session2Transfer.correctIndex;

  if (transfer.firstChoice === null) {
    transfer.firstChoice = choiceIndex;
  }

  transfer.finalChoice = choiceIndex;
  transfer.completed = true;

  if (transfer.firstChoice === session2Transfer.correctIndex) {
    transfer.status = "full_success";
  } else if (isCorrect) {
    transfer.status = "recovered";
  } else {
    transfer.status = "failed";
  }

  storeAttempt({
    sessionNumber: 2,
    attemptId: session2Transfer.id,
    selectedIndex: choiceIndex,
    correct: isCorrect,
    targetIds: session2Transfer.targetIds,
    contentTargetIds: session2Transfer.contentTargetIds,
  });

  saveRun(run);
}

function submitSession3Typed() {
  const progress = run.sessionProgress[3];
  const prompt = session3Prompts[4];
  const sentence = (progress.prompt5Text ?? "").trim();
  const wordCount = countWords(sentence);

  if (wordCount < 15 || wordCount > 25) {
    if (!progress.prompt5CorrectionUsed) {
      progress.prompt5CorrectionUsed = true;
      progress.results[prompt.id] = { needsCorrection: true };
      saveRun(run);
      return;
    }
  }

  const evaluator = evaluateSession3Sentence(sentence, prompt.targetWords);
  progress.prompt5Evaluator = evaluator;
  progress.results[prompt.id] = {
    firstResult: progress.results[prompt.id]?.firstResult ?? evaluatorHasCorrectWord(evaluator),
    finalResult: evaluatorHasCorrectWord(evaluator),
    targetIds: prompt.targetIds,
    evaluator,
  };
  storeAttempt({
    sessionNumber: 3,
    attemptId: prompt.id,
    text: sentence,
    correct: evaluatorHasCorrectWord(evaluator),
    targetIds: prompt.targetIds,
    contentTargetIds: prompt.contentTargetIds,
  });
  logSession3ProductiveEvidence(evaluator);
  saveRun(run);
}

function submitSession4Draft1() {
  const progress = run.sessionProgress[4];
  const text = (progress.draft1Text ?? "").trim();
  if (!text) return;

  const evaluation = evaluateSession4Draft(text);
  progress.draft1Text = text;
  progress.draft1Evaluation = evaluation;
  progress.bestSentence = evaluation.best_sentence || progress.bestSentence;
  progress.step = "feedback";

  storeAttempt({
    sessionNumber: 4,
    attemptId: "s4_draft_1",
    text,
    correct: evaluation.overall_flag === "solid",
    targetIds: [...session4Config.requiredWords, contentPack.morphologyFamily.id],
    contentTargetIds: session4Config.contentTargetIds,
  });

  saveRun(run);
}

function submitSession4Draft2() {
  const progress = run.sessionProgress[4];
  const text = (progress.draft2Text ?? "").trim();
  if (!text) return;

  const evaluation = evaluateSession4Draft(text);
  progress.draft2Text = text;
  progress.draft2Evaluation = evaluation;
  progress.bestSentence = strongerSentence(progress.bestSentence, evaluation.best_sentence);

  storeAttempt({
    sessionNumber: 4,
    attemptId: "s4_draft_2",
    text,
    correct: evaluation.overall_flag === "solid",
    targetIds: [...session4Config.requiredWords, contentPack.morphologyFamily.id],
    contentTargetIds: session4Config.contentTargetIds,
  });

  finalizeSession4KeepBest();
  progress.step = "wrap";
  saveRun(run);
}

function logSession1Exposure() {
  const progress = run.sessionProgress[1];

  if (!progress.exposuresLogged) {
    for (const word of contentPack.anchorWords) {
      run.exposureLog.push({
        sessionNumber: 1,
        type: "exposure",
        targetId: word.id,
        source: "second_pass_highlight",
      });
    }
    progress.exposuresLogged = true;
  }

  if (!progress.familyExposureLogged) {
    run.exposureLog.push({
      sessionNumber: 1,
      type: "exposure",
      targetId: contentPack.morphologyFamily.id,
      source: "family_clue",
    });
    progress.familyExposureLogged = true;
  }

  saveRun(run);
}

function logSession2RoundEvidence(round, roundState) {
  if (roundState.logged) return;

  if (roundState.isCorrect) {
    run.exposureLog.push({
      sessionNumber: 2,
      type: "active",
      targetId: contentPack.morphologyFamily.id,
      source: round.id,
    });

    if (round.targetWord === "transport") {
      run.exposureLog.push({
        sessionNumber: 2,
        type: "active",
        targetId: "transport",
        source: round.id,
      });
    }
  }

  roundState.logged = true;
  saveRun(run);
}

function logSession3DeterministicEvidence(prompt, correct) {
  const progress = run.sessionProgress[3];
  const key = `${prompt.id}_logged`;
  if (progress.results[key]) return;

  if (correct) {
    for (const targetId of prompt.targetIds) {
      run.exposureLog.push({
        sessionNumber: 3,
        type: "active",
        targetId,
        source: prompt.id,
      });
    }
  }

  progress.results[key] = true;
  saveRun(run);
}

function logSession3ProductiveEvidence(evaluator) {
  const progress = run.sessionProgress[3];
  if (progress.results.s3_prompt_5_logged) return;

  for (const [word, status] of Object.entries(evaluator.target_words)) {
    if (status === "correct") {
      run.exposureLog.push({
        sessionNumber: 3,
        type: "productive",
        targetId: word,
        source: "s3_prompt_5",
      });
    }
  }

  progress.results.s3_prompt_5_logged = true;
  saveRun(run);
}

function finalizeSession4KeepBest() {
  const progress = run.sessionProgress[4];
  const draft1Score = scoreSession4Evaluation(progress.draft1Evaluation);
  const draft2Score = scoreSession4Evaluation(progress.draft2Evaluation);

  if (progress.draft2Evaluation && draft2Score > draft1Score) {
    progress.keptDraft = {
      source: "draft_2",
      text: progress.draft2Text,
      evaluation: progress.draft2Evaluation,
    };
  } else {
    progress.keptDraft = {
      source: "draft_1",
      text: progress.draft1Text,
      evaluation: progress.draft1Evaluation,
    };
  }

  progress.bestSentence = strongerSentence(
    progress.bestSentence,
    progress.keptDraft.evaluation?.best_sentence ?? "",
  );
  logSession4ProductiveEvidence();
}

function logSession4ProductiveEvidence() {
  const progress = run.sessionProgress[4];
  if (progress.productiveLogged || !progress.keptDraft?.evaluation) return;

  for (const [word, status] of Object.entries(progress.keptDraft.evaluation.required_words)) {
    if (status === "correct") {
      run.exposureLog.push({
        sessionNumber: 4,
        type: "productive",
        targetId: word,
        source: progress.keptDraft.source,
      });
    }
  }

  if (progress.keptDraft.evaluation.family_use_quality === "accurate") {
    run.exposureLog.push({
      sessionNumber: 4,
      type: "productive",
      targetId: contentPack.morphologyFamily.id,
      source: progress.keptDraft.source,
    });
  }

  progress.productiveLogged = true;
  saveRun(run);
}

function ensureSession5Deck() {
  const progress = run.sessionProgress[5];
  let changed = false;

  if (!progress.deck.length) {
    progress.deck = session5BaseCards.map((card) => ({
      ...card,
      instanceId: card.id,
      isRetest: false,
    }));
    changed = true;
  } else {
    const syncedDeck = progress.deck.map((card) => syncSession5DeckCard(card));
    changed = JSON.stringify(syncedDeck) !== JSON.stringify(progress.deck);
    progress.deck = syncedDeck;
  }

  changed = clearStaleSession5FinalResult(progress) || changed;

  if (changed) saveRun(run);
}

function syncSession5DeckCard(card) {
  const baseCard = session5BaseCards.find((item) => item.id === (card.sourceCardId ?? card.id));
  if (!baseCard) return card;

  if (card.isRetest) {
    return {
      ...baseCard,
      ...baseCard.retest,
      instanceId: card.instanceId,
      sourceCardId: card.sourceCardId ?? baseCard.id,
      sourceTitle: baseCard.title,
      isRetest: true,
    };
  }

  return {
    ...baseCard,
    instanceId: card.instanceId,
    isRetest: false,
  };
}

function sanitizeSession5Progress(progress) {
  if (!progress) return false;

  const changed = clearStaleSession5FinalResult(progress);

  if (changed) {
    saveRun(run);
  }

  return changed;
}

function clearStaleSession5FinalResult(progress) {
  if (!progress) return false;

  progress.responses = progress.responses ?? {};
  progress.results = progress.results ?? {};
  progress.deck = Array.isArray(progress.deck) ? progress.deck : [];
  run.attempts = Array.isArray(run.attempts) ? run.attempts : [];
  run.exposureLog = Array.isArray(run.exposureLog) ? run.exposureLog : [];

  const finalResult = progress.results.s5_card_7;
  const requiredWords =
    finalResult?.evaluator?.required_words
    ?? finalResult?.evaluation?.required_words
    ?? finalResult?.required_words;
  const isStale = Boolean(requiredWords?.predict);
  if (!isStale) return false;

  delete progress.results.s5_card_7;
  delete progress.results.s5_card_7_logged;

  run.attempts = run.attempts.filter(
    (item) => !(item.sessionNumber === 5 && item.attemptId === "s5_card_7"),
  );
  run.exposureLog = run.exposureLog.filter(
    (item) => !(item.sessionNumber === 5 && item.source === "s5_card_7"),
  );

  const finalCardIndex = progress.deck.findIndex((card) => card.id === "s5_card_7");
  if (finalCardIndex >= 0 && progress.currentIndex > finalCardIndex) {
    progress.currentIndex = finalCardIndex;
  }

  return true;
}

function submitSession5CurrentCard() {
  const progress = run.sessionProgress[5];
  const card = progress.deck[progress.currentIndex];
  if (!card) return;

  if (card.kind === "typed") {
    const text = (progress.responses[card.instanceId]?.text ?? "").trim();
    if (!text) return;
    const evaluator = evaluateSession4Draft(text, card);
    const correct = session5FinalSentenceReady(evaluator);
    progress.results[card.instanceId] = {
      firstResult: correct,
      finalResult: correct,
      targetIds: card.targetIds,
      evaluator,
    };
    storeAttempt({
      sessionNumber: 5,
      attemptId: card.instanceId,
      text,
      correct,
      targetIds: card.targetIds,
      contentTargetIds: card.contentTargetIds,
    });
    logSession5ProductiveEvidence(card, evaluator);
    return;
  }

  const selectedIndex = progress.responses[card.instanceId]?.selectedIndex;
  if (selectedIndex === undefined) return;
  const correct = selectedIndex === card.correctIndex;

  progress.results[card.instanceId] = {
    firstResult: progress.results[card.instanceId]?.firstResult ?? correct,
    finalResult: correct,
    targetIds: card.targetIds,
  };

  storeAttempt({
    sessionNumber: 5,
    attemptId: card.instanceId,
    selectedIndex,
    correct,
    targetIds: card.targetIds,
    contentTargetIds: card.contentTargetIds,
    sourceTaskId: card.sourceCardId ?? null,
  });

  if (correct) {
    logSession5ActiveEvidence(card);
  }

  if (!card.isRetest && card.id !== "s5_card_7" && !correct) {
    maybeInsertSession5Retest(card);
  }

  if (card.id === "s5_card_6" && !card.isRetest) {
    progress.transferStatus = correct ? "full_success" : "failed";
  }

  if (card.sourceCardId === "s5_card_6" && card.isRetest) {
    progress.transferStatus = correct ? "recovered" : "failed";
  }
}

function maybeInsertSession5Retest(card) {
  const progress = run.sessionProgress[5];
  if (progress.retestsUsed >= 2 || !card.retest) return;

  const finalChallengeIndex = progress.deck.findIndex((item) => item.id === "s5_card_7");
  const desiredIndex = Math.min(progress.currentIndex + 3, finalChallengeIndex);
  const insertIndex = desiredIndex <= progress.currentIndex + 1 ? finalChallengeIndex : desiredIndex;

  const retestCard = {
    ...card,
    ...card.retest,
    instanceId: `${card.id}_retest`,
    sourceCardId: card.id,
    sourceTitle: card.title,
    isRetest: true,
  };

  progress.deck.splice(insertIndex, 0, retestCard);
  progress.retestsUsed += 1;
}

function logSession5ActiveEvidence(card) {
  const progress = run.sessionProgress[5];
  const logKey = `${card.instanceId}_logged`;
  if (progress.results[logKey]) return;

  for (const targetId of card.targetIds ?? []) {
    run.exposureLog.push({
      sessionNumber: 5,
      type: "active",
      targetId,
      source: card.instanceId,
    });
  }

  progress.results[logKey] = true;
  saveRun(run);
}

function logSession5ProductiveEvidence(card, evaluator) {
  const progress = run.sessionProgress[5];
  const logKey = `${card.instanceId}_logged`;
  if (progress.results[logKey]) return;

  for (const [word, status] of Object.entries(evaluator.required_words)) {
    if (status === "correct") {
      run.exposureLog.push({
        sessionNumber: 5,
        type: "productive",
        targetId: word,
        source: card.instanceId,
      });
    }
  }

  if (evaluator.family_use_quality === "accurate") {
    run.exposureLog.push({
      sessionNumber: 5,
      type: "productive",
      targetId: contentPack.morphologyFamily.id,
      source: card.instanceId,
    });
  }

  progress.results[logKey] = true;
  saveRun(run);
}

function storeAttempt(attempt) {
  const existingIndex = run.attempts.findIndex(
    (item) => item.sessionNumber === attempt.sessionNumber && item.attemptId === attempt.attemptId,
  );

  const existing = existingIndex >= 0 ? run.attempts[existingIndex] : null;
  const nextAttempt = {
    ...attempt,
    firstResult: existing ? existing.firstResult : attempt.correct,
    finalResult: attempt.correct,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    run.attempts[existingIndex] = nextAttempt;
  } else {
    run.attempts.push(nextAttempt);
  }
}

function renderSessionSpecificBlock(number) {
  if (number === 3) {
    return `
      <div class="support-block">
        <h4>Evaluator Hook</h4>
        <p>
          Add the 15-25 word micro-use guardrails here, then score the sentence against the fixed
          rubric schema from the implementation spec.
        </p>
      </div>
    `;
  }

  if (number === 4) {
    return `
      <div class="support-block">
        <h4>Writing Flow</h4>
        <p>
          This is where draft 1, automated feedback, the model response, and a single revision loop
          will live.
        </p>
      </div>
    `;
  }

  return `
    <div class="support-block">
      <h4>Review Deck</h4>
      <p>
        Implement the 7-card base deck here, then add the max-2 retest queue before the final
        challenge sentence.
      </p>
    </div>
  `;
}

function renderRecap() {
  const recap = buildRecapData();

  return `
    <section class="page-header editorial-header">
      <p class="eyebrow">Final Recap</p>
      <h2>${contentPack.topicTitle}</h2>
      <p>Here’s what the words helped you understand.</p>
      <p class="deck">This recap shows what is steady for now, what needs another look, and how port = carry helped with a related word.</p>
    </section>

    <section class="card">
      <p>These notes are based on this sequence only.</p>
      <p>Steady for now means the word or idea held up here.</p>
      <p>Needs another look means it should be reviewed again.</p>
    </section>

    <section class="grid two-up">
      <article class="card">
        <h3>Words and family clue</h3>
        <p>These notes come from your choices, writing, recall, and review.</p>
        <ul class="plain-list">
          ${recap.anchorStatuses
            .map(
              (item) => `<li>${item.label}: ${recapStatusLabel(item.status)}</li>`,
            )
            .join("")}
          <li>${contentPack.morphologyFamily.label} = ${contentPack.morphologyFamily.meaning}: ${recapStatusLabel(recap.familyStatus.status)}</li>
        </ul>
      </article>

      <article class="card">
        <h3>What became clearer</h3>
        <ul class="plain-list">
          <li>Related word: ${recap.transferSummary}</li>
          <li>Strongest sentence: ${recap.bestSentence ? `"${escapeHtml(recap.bestSentence)}"` : "No strongest sentence saved yet."}</li>
          <li>Needs another look: ${recap.reviewNext}</li>
        </ul>
        <p class="helper-text">Portable is a related word. It uses the same family clue: port = carry.</p>
      </article>
    </section>

    <section class="grid two-up">
      <article class="card">
        <h3>Weather ideas that are clearer now</h3>
        ${
          recap.learnedKnowledge.length
            ? `<p><strong>Clearer now</strong></p>
        <ul class="plain-list">
          ${recap.learnedKnowledge.map((item) => `<li>${item}</li>`).join("")}
        </ul>`
            : "<p>These weather ideas still need another look. Review the passage and try explaining one again.</p>"
        }
      </article>

      <article class="card">
        <h3>Weather ideas</h3>
        <ul class="plain-list">
          ${recap.knowledgeTargetStatuses
            .map(
              (item) => `<li>${item.statement}: ${knowledgeStatusLabel(item.status)}</li>`,
            )
            .join("")}
        </ul>
        <p class="helper-text">
          These ideas are checked through your answers and writing. Needs another look means the idea needs a clearer explanation later.
        </p>
      </article>
    </section>
  `;
}

function buildRecapData() {
  const anchorStatuses = contentPack.anchorWords.map((word) => computeAnchorStatus(word.id, word.label));
  const familyStatus = computeFamilyStatus();
  const knowledgeTargetStatuses = contentPack.knowledgeTargets.map((target) => computeKnowledgeTargetStatus(target));
  const transferSummary = formatTransferSummary();
  const bestSentence = selectBestSentence();
  const reviewNext = buildReviewNext(anchorStatuses, familyStatus, knowledgeTargetStatuses);
  const learnedKnowledge = knowledgeTargetStatuses
    .filter((item) => item.status === "solid")
    .map((item) => item.statement);

  return {
    anchorStatuses,
    familyStatus,
    knowledgeTargetStatuses,
    transferSummary,
    bestSentence,
    reviewNext,
    learnedKnowledge,
  };
}

function computeAnchorStatus(targetId, label) {
  const successfulEvidence = run.exposureLog.filter(
    (item) =>
      item.targetId === targetId &&
      (item.type === "active" || item.type === "productive"),
  );
  const sessions = new Set(successfulEvidence.map((item) => item.sessionNumber));
  const latestOutcome = latestWordOutcome(targetId);
  const hasRetrievalOrProductive = successfulEvidence.some(
    (item) =>
      (item.sessionNumber === 5 && item.type === "active") ||
      (item.type === "productive" && (item.sessionNumber === 4 || item.sessionNumber === 5)),
  );
  const status =
    successfulEvidence.length >= 3 &&
    sessions.size >= 2 &&
    hasRetrievalOrProductive &&
    latestOutcome !== "missing" &&
    latestOutcome !== "awkward"
      ? "solid"
      : "fragile";

  return {
    id: targetId,
    label,
    status,
    successes: successfulEvidence.length,
    sessionsCount: sessions.size,
    latestOutcome,
  };
}

function computeFamilyStatus() {
  const successfulEvidence = run.exposureLog.filter(
    (item) =>
      item.targetId === contentPack.morphologyFamily.id &&
      (item.type === "active" || item.type === "productive"),
  );
  const sessions = new Set(successfulEvidence.map((item) => item.sessionNumber));
  const latestOutcome = latestFamilyOutcome();
  const hasTransferOrProductive = hasFullTransferSuccess() || successfulEvidence.some(
    (item) => item.type === "productive" && (item.sessionNumber === 4 || item.sessionNumber === 5),
  );
  const status =
    successfulEvidence.length >= 3 &&
    sessions.size >= 2 &&
    hasTransferOrProductive &&
    latestOutcome !== "weak" &&
    latestOutcome !== "failed"
      ? "solid"
      : "fragile";

  return {
    status,
    successes: successfulEvidence.length,
    sessionsCount: sessions.size,
    latestOutcome,
  };
}

function computeKnowledgeTargetStatus(target) {
  const successfulAttempts = run.attempts.filter(
    (item) => item.contentTargetIds?.includes(target.targetId) && item.finalResult === true,
  );
  const sessions = new Set(successfulAttempts.map((item) => item.sessionNumber));
  const latestOutcome = latestKnowledgeOutcome(target.targetId);
  const hasTypedKnowledgeCheck = latestOutcome !== "none" && latestOutcome !== "not_evidenced";
  const status =
    successfulAttempts.length >= 2
    && sessions.size >= 2
    && latestOutcome !== "inaccurate"
    && latestOutcome !== "partly_accurate"
      ? "solid"
      : !hasTypedKnowledgeCheck && successfulAttempts.length >= 2 && sessions.size >= 2
        ? "solid"
        : "fragile";

  return {
    targetId: target.targetId,
    statement: target.statement,
    status,
    successes: successfulAttempts.length,
    sessionsCount: sessions.size,
    latestOutcome,
  };
}

function latestWordOutcome(targetId) {
  const session4 = run.sessionProgress[4]?.keptDraft?.evaluation?.required_words?.[targetId];
  const session5 = run.sessionProgress[5]?.results?.s5_card_7?.evaluator?.required_words?.[targetId];
  return session5 ?? session4 ?? "none";
}

function latestKnowledgeOutcome(targetId) {
  const session5 = run.sessionProgress[5]?.results?.s5_card_7?.evaluator?.knowledge_targets?.[targetId];
  const session4 = run.sessionProgress[4]?.keptDraft?.evaluation?.knowledge_targets?.[targetId];
  return session5 ?? session4 ?? "none";
}

function latestFamilyOutcome() {
  const session5Family = run.sessionProgress[5]?.results?.s5_card_7?.evaluator?.family_use_quality;
  const session4Family = run.sessionProgress[4]?.keptDraft?.evaluation?.family_use_quality;
  const session5Transfer = run.sessionProgress[5]?.transferStatus;
  return (
    session5Family
    ?? session5Transfer
    ?? session4Family
    ?? run.sessionProgress[2]?.transfer?.status
    ?? "none"
  );
}

function hasFullTransferSuccess() {
  return (
    run.sessionProgress[2]?.transfer?.status === "full_success" ||
    run.sessionProgress[5]?.transferStatus === "full_success"
  );
}

function formatTransferSummary() {
  const session2 = run.sessionProgress[2]?.transfer?.status;
  const session5 = run.sessionProgress[5]?.transferStatus;
  const states = [session2, session5].filter(Boolean);
  return learnerTransferSummary(learnerTransferState(states));
}

function selectBestSentence() {
  const candidates = [
    run.sessionProgress[4]?.bestSentence,
    run.sessionProgress[4]?.keptDraft?.evaluation?.best_sentence,
    run.sessionProgress[5]?.results?.s5_card_7?.evaluator?.best_sentence,
  ].filter(Boolean);

  if (!candidates.length) return "";
  return candidates.sort((left, right) => right.length - left.length)[0];
}

function buildReviewNext(anchorStatuses, familyStatus, knowledgeTargetStatuses = []) {
  const fragileAnchor = anchorStatuses.find((item) => item.status === "fragile");
  if (fragileAnchor) {
    return `Use ${fragileAnchor.label} in one new weather sentence.`;
  }

  if (familyStatus.status === "fragile") {
    return `Review ${contentPack.morphologyFamily.label} = ${contentPack.morphologyFamily.meaning} with one more related word.`;
  }

  const fragileKnowledge = knowledgeTargetStatuses.find((item) => item.status === "fragile");
  if (fragileKnowledge) {
    return `Explain this weather idea again: ${fragileKnowledge.statement}`;
  }

  return "Keep the words active by using them in one short weather explanation.";
}

function buildArchiveData() {
  const hasStarted = Boolean(run.startedAt);
  const canShowAnchorWords = hasStarted;
  const canShowFamily = hasStarted && run.unlockedSession >= 2;
  const anchorStatuses = contentPack.anchorWords.map((word) => computeAnchorStatus(word.id, word.label));
  const anchorStatusById = new Map(anchorStatuses.map((item) => [item.id, item]));

  const anchorWords = canShowAnchorWords
    ? contentPack.anchorWords.map((word) => {
        const status = anchorStatusById.get(word.id);
        return {
          id: word.id,
          label: word.label,
          clue: word.clue,
          partOfSpeech: word.partOfSpeech,
          status: status?.status ?? "fragile",
          evidenceCount: status?.successes ?? 0,
        };
      })
    : [];

  const familyWords = canShowFamily
    ? contentPack.morphologyFamily.taughtWords.map((word) => ({
        id: word,
        label: word,
        clue:
          word === contentPack.morphologyFamily.anchorConnection
            ? "carry from one place to another"
            : `uses ${contentPack.morphologyFamily.label} = ${contentPack.morphologyFamily.meaning}`,
      }))
    : [];

  const relatedWords = canShowFamily
    ? [
        {
          id: contentPack.morphologyFamily.untaughtRelative,
          label: contentPack.morphologyFamily.untaughtRelative,
          clue: `new related word using ${contentPack.morphologyFamily.label} = ${contentPack.morphologyFamily.meaning}`,
        },
      ]
    : [];

  return {
    hasStarted,
    canShowFamily,
    anchorWords,
    familyWords,
    relatedWords,
    family: contentPack.morphologyFamily,
  };
}

function renderArchive() {
  const archive = buildArchiveData();

  return `
    <section class="page-header editorial-header">
      <p class="eyebrow">Archive</p>
      <h2>Words learned so far</h2>
      <p>This is your collection from the current word path.</p>
      <p class="deck">As you move through the sessions, this page keeps the words and family clues close by.</p>
    </section>

    ${
      archive.hasStarted
        ? `
          <section class="grid two-up">
            <article class="card">
              <p class="eyebrow">Anchor Words</p>
              <h3>Words from the weather text</h3>
              <ul class="plain-list">
                ${archive.anchorWords
                  .map(
                    (word) => `
                      <li>
                        <strong>${word.label}</strong> (${word.partOfSpeech}) - ${word.clue}
                        <span class="status-pill">${recapStatusLabel(word.status)}</span>
                      </li>
                    `,
                  )
                  .join("")}
              </ul>
            </article>

            <article class="card">
              <p class="eyebrow">Family Clue</p>
              <h3>${archive.family.label} = ${archive.family.meaning}</h3>
              ${
                archive.canShowFamily
                  ? `
                    <p>This family clue connects words that carry the same meaning part.</p>
                    <ul class="plain-list">
                      ${archive.familyWords
                        .map((word) => `<li><strong>${word.label}</strong> - ${word.clue}</li>`)
                        .join("")}
                    </ul>
                  `
                  : "<p>This family will open after the word-family session begins.</p>"
              }
            </article>
          </section>

          <section class="grid two-up">
            <article class="card">
              <p class="eyebrow">Related Words</p>
              <h3>New words this clue can unlock</h3>
              ${
                archive.relatedWords.length
                  ? `<ul class="plain-list">
                      ${archive.relatedWords
                        .map((word) => `<li><strong>${word.label}</strong> - ${word.clue}</li>`)
                        .join("")}
                    </ul>`
                  : "<p>Related words will appear after the family work opens.</p>"
              }
            </article>

            <article class="card">
              <p class="eyebrow">Current Topic</p>
              <h3>${contentPack.topicTitle}</h3>
              <p>${contentPack.missionQuestion}</p>
              <a href="#/sequence" class="secondary-link">Back to the path</a>
            </article>
          </section>
        `
        : `
          <section class="card">
            <h3>No words saved yet</h3>
            <p>Start the path to add words and family clues to this archive.</p>
            <button id="start-run" class="primary-button" type="button">Start the path</button>
          </section>
        `
    }
  `;
}

function bindArchive() {
  const button = document.querySelector("#start-run");
  if (!button) return;

  button.addEventListener("click", startRun);
}

function evaluateSession4Draft(text, config = session4Config) {
  const lower = text.toLowerCase();
  const requiredWords = {};
  let correctCount = 0;

  for (const word of config.requiredWords) {
    const present = new RegExp(`\\b${word}\\b`, "i").test(text);
    if (!present) {
      requiredWords[word] = "missing";
      continue;
    }

    const precise =
      word === "predict"
        ? /(predict).*(storm|weather|forecast|warning|evidence)|meteorologists?.*(predict)/i.test(text)
        : /(pressure).*(air|storm|drop|change|weather)/i.test(text);

    requiredWords[word] = precise ? "correct" : "vague";
    if (precise) correctCount += 1;
  }

  const familyPattern = new RegExp(`\\b${config.familyWord}\\b`, "i");
  const familyUseQuality =
    familyPattern.test(text) && /(heat|moisture|air|wind|storm system|warm air|moist air)/i.test(text)
      ? "accurate"
      : familyPattern.test(text)
        ? "weak"
        : "absent";

  const sentences = splitIntoSentences(text);
  const weatherContent = evaluateWeatherContent(text, sentences);
  const productiveWords = [...config.requiredWords, config.familyWord].filter(Boolean);
  const bestSentence =
    sentences.find((sentence) => productiveWords.some((word) => new RegExp(`\\b${word}\\b`, "i").test(sentence)))
    ?? sentences[0]
    ?? "";

  const feedbackSummary = [];
  for (const [word, status] of Object.entries(requiredWords)) {
    if (status === "correct") feedbackSummary.push(`${capitalize(word)} is precise here.`);
    if (status === "vague") feedbackSummary.push(`${capitalize(word)} appears, but its job needs to be clearer.`);
    if (status === "missing") feedbackSummary.push(`Add ${word} only if it strengthens the report.`);
  }

  if (familyUseQuality === "accurate") feedbackSummary.push("The family-linked word use is accurate.");
  if (familyUseQuality === "weak") feedbackSummary.push("Transport appears, but tie it more clearly to moving air, heat, or moisture.");
  if (weatherContent.content_fit !== "on_topic") {
    feedbackSummary.push("Keep the report tied closely to how meteorologists warn people.");
  }
  if (weatherContent.content_accuracy === "partly_accurate") {
    feedbackSummary.push("The science idea is partly right, but it needs a clearer explanation.");
  }
  if (weatherContent.content_accuracy === "inaccurate") {
    feedbackSummary.push("The science explanation needs correction before this response can feel solid.");
  }

  const overallFlag =
    correctCount >= 1
    && weatherContent.content_fit === "on_topic"
    && weatherContent.content_accuracy === "accurate"
      ? "solid"
      : "revise";

  return {
    required_words: requiredWords,
    family_use_quality: familyUseQuality,
    content_fit: weatherContent.content_fit,
    content_accuracy: weatherContent.content_accuracy,
    knowledge_targets: weatherContent.knowledge_targets,
    sentence_level_feedback: weatherContent.sentence_level_feedback,
    overall_flag: overallFlag,
    best_sentence: bestSentence,
    feedback_summary: feedbackSummary,
  };
}

function scoreSession4Evaluation(evaluation) {
  if (!evaluation) return -1;
  let score = 0;
  for (const status of Object.values(evaluation.required_words)) {
    if (status === "correct") score += 3;
    if (status === "vague") score += 1;
  }
  if (evaluation.family_use_quality === "accurate") score += 2;
  if (evaluation.family_use_quality === "weak") score += 1;
  if (evaluation.content_fit === "on_topic") score += 2;
  if (evaluation.content_fit === "partly_off_topic") score += 1;
  if (evaluation.content_accuracy === "accurate") score += 3;
  if (evaluation.content_accuracy === "partly_accurate") score += 1;
  if (evaluation.overall_flag === "solid") score += 2;
  return score;
}

// These checks stay deterministic: they look for a few trusted weather ideas and a few common
// inaccuracies so the prototype can judge science accuracy without remote scoring.
function evaluateWeatherContent(text, sentences = splitIntoSentences(text)) {
  const lower = text.toLowerCase();
  const onTopicCount = ["weather", "storm", "meteorologist", "forecast", "warning", "air", "pressure"].filter((term) =>
    lower.includes(term),
  ).length;
  const contentFit = onTopicCount >= 2 ? "on_topic" : onTopicCount === 1 ? "partly_off_topic" : "off_topic";

  const knowledgeTargets = {
    wx_pressure_signal: "not_evidenced",
    wx_multi_data: "not_evidenced",
    wx_transport: "not_evidenced",
  };
  const sentenceLevelFeedback = [];

  for (const [index, sentence] of sentences.entries()) {
    const sentenceLower = sentence.toLowerCase();

    if (
      /\b(only|just|alone|single|one)\b.{0,24}\b(clue|signal|sign|pressure|data source)\b/i.test(sentence)
      || /\bpressure\b.{0,24}\b(alone|only|just)\b/i.test(sentence)
    ) {
      knowledgeTargets.wx_multi_data = "inaccurate";
      sentenceLevelFeedback.push({
        sentence_index: index + 1,
        issue: "scientific_inaccuracy",
        message: "Meteorologists use multiple data sources, not one clue alone.",
      });
    }

    if (
      /\bpressure\b.{0,30}\b(signal|sign|clue|drop|fall|change)\b/i.test(sentence)
      && /\b(storm|weather|severe)\b/i.test(sentence)
    ) {
      if (knowledgeTargets.wx_pressure_signal !== "inaccurate") {
        knowledgeTargets.wx_pressure_signal = "accurate";
      }
    } else if (
      /\bpressure\b/i.test(sentence) && /\b(storm|weather|forecast|meteorolog)/i.test(sentence)
    ) {
      if (knowledgeTargets.wx_pressure_signal === "not_evidenced") {
        knowledgeTargets.wx_pressure_signal = "partly_accurate";
      }
    }

    const multiDataMatches = [
      /\bpressure\b/i,
      /\bwind\b/i,
      /\btemperature\b/i,
      /\bmoisture\b/i,
      /\bradar\b/i,
      /\bsatellite/i,
      /\bsurface report/i,
      /\bevidence\b/i,
      /\bdata\b/i,
    ].filter((pattern) => pattern.test(sentence)).length;

    if (
      multiDataMatches >= 2
      && /\b(predict|forecast|meteorolog|warn)\b/i.test(sentence)
    ) {
      if (knowledgeTargets.wx_multi_data !== "inaccurate") {
        knowledgeTargets.wx_multi_data = "accurate";
      }
    } else if (
      multiDataMatches >= 1
      && /\b(predict|forecast|meteorolog|warn)\b/i.test(sentence)
      && knowledgeTargets.wx_multi_data === "not_evidenced"
    ) {
      knowledgeTargets.wx_multi_data = "partly_accurate";
    }

    if (
      /\b(wind|air)\b/i.test(sentence)
      && /\btransport\b/i.test(sentence)
      && /\b(heat|moisture)\b/i.test(sentence)
    ) {
      if (knowledgeTargets.wx_transport !== "inaccurate") {
        knowledgeTargets.wx_transport = "accurate";
      }
    } else if (
      (/\b(wind|air)\b/i.test(sentence) && /\bmoisture\b/i.test(sentence))
      || (/\btransport\b/i.test(sentence) && /\b(wind|air)\b/i.test(sentence))
    ) {
      if (knowledgeTargets.wx_transport === "not_evidenced") {
        knowledgeTargets.wx_transport = "partly_accurate";
      }
    }
  }

  if (
    knowledgeTargets.wx_pressure_signal === "partly_accurate"
    && knowledgeTargets.wx_multi_data === "inaccurate"
  ) {
    sentenceLevelFeedback.push({
      sentence_index: 1,
      issue: "scientific_inaccuracy",
      message: "Air pressure is one signal meteorologists study; it does not work alone.",
    });
  }

  const targetStates = Object.values(knowledgeTargets);
  const contentAccuracy =
    targetStates.includes("inaccurate")
      ? "inaccurate"
      : targetStates.includes("accurate")
        ? "accurate"
        : contentFit === "off_topic"
          ? "inaccurate"
          : "partly_accurate";

  return {
    content_fit: contentFit,
    content_accuracy: contentAccuracy,
    knowledge_targets: knowledgeTargets,
    sentence_level_feedback: dedupeSentenceFeedback(sentenceLevelFeedback),
  };
}

function splitIntoSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function dedupeSentenceFeedback(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.sentence_index}:${item.issue}:${item.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function strongerSentence(existing, candidate) {
  if (!candidate) return existing;
  if (!existing) return candidate;
  return candidate.length > existing.length ? candidate : existing;
}

function capitalize(value) {
  return value[0].toUpperCase() + value.slice(1);
}

function sanitizeSession3Progress(progress) {
  if (!progress) return false;

  let changed = false;
  let earliestRewindStep = null;

  if (!progress.responses) {
    progress.responses = {};
    changed = true;
  }

  if (!progress.results) {
    progress.results = {};
    changed = true;
  }

  run.attempts = Array.isArray(run.attempts) ? run.attempts : [];
  run.exposureLog = Array.isArray(run.exposureLog) ? run.exposureLog : [];

  const currentStep = progress.step ?? "prompt_1";

  function markRewindIfNeeded(promptId) {
    const promptStep = session3PromptStep(promptId);
    if (session3StepIndex(currentStep) > session3StepIndex(promptStep)) {
      if (
        earliestRewindStep === null
        || session3StepIndex(promptStep) < session3StepIndex(earliestRewindStep)
      ) {
        earliestRewindStep = promptStep;
      }
    }
  }

  for (const prompt of session3Prompts) {
    if (prompt.type === "typed") continue;

    const response = progress.responses[prompt.id];
    const hasResponse = response !== undefined;
    const valid = session3ValidResponse(prompt, response);
    const complete = valid && promptCompleted(progress, prompt);
    const hasArtifacts = hasSession3PromptArtifacts(progress, prompt.id);

    if (hasResponse && !valid) {
      clearSession3PromptArtifacts(progress, prompt.id, { clearResponse: true });
      markRewindIfNeeded(prompt.id);
      changed = true;
      continue;
    }

    if (!valid && hasArtifacts) {
      clearSession3PromptArtifacts(progress, prompt.id, { clearResponse: true });
      markRewindIfNeeded(prompt.id);
      changed = true;
      continue;
    }

    if (valid && prompt.type === "order" && !complete && hasArtifacts) {
      clearSession3PromptArtifacts(progress, prompt.id, { clearResponse: false });
      markRewindIfNeeded(prompt.id);
      changed = true;
      continue;
    }

    if (valid && complete) {
      const correct = scoreSession3DeterministicPrompt(prompt, response);
      if (correct === null) continue;

      const existingResult = progress.results[prompt.id];
      const targetIdsMatch = arraysEqual(existingResult?.targetIds ?? [], prompt.targetIds ?? []);
      const compatibleExistingResult =
        existingResult
        && targetIdsMatch
        && existingResult.finalResult === correct;

      if (!compatibleExistingResult) {
        clearSession3PromptArtifacts(progress, prompt.id, { clearResponse: false });
        progress.results[prompt.id] = {
          firstResult: correct,
          finalResult: correct,
          targetIds: prompt.targetIds,
        };
        changed = true;
      }
    }
  }

  if (earliestRewindStep !== null) {
    progress.step = earliestRewindStep;
    changed = true;
  }

  if (changed) saveRun(run);
  return changed;
}

function session3PromptStep(promptId) {
  const index = session3Prompts.findIndex((prompt) => prompt.id === promptId);
  return index >= 0 ? `prompt_${index + 1}` : "prompt_1";
}

function session3StepIndex(step) {
  const index = session3StepOrder.indexOf(step);
  return index >= 0 ? index : 0;
}

function hasSession3PromptArtifacts(progress, promptId) {
  return Boolean(
    progress.results?.[promptId]
      || progress.results?.[`${promptId}_logged`]
      || run.attempts.some((item) => item.sessionNumber === 3 && item.attemptId === promptId)
      || run.exposureLog.some((item) => item.sessionNumber === 3 && item.source === promptId),
  );
}

function clearSession3PromptArtifacts(progress, promptId, { clearResponse = true } = {}) {
  if (clearResponse) {
    delete progress.responses[promptId];
  }

  delete progress.results[promptId];
  delete progress.results[`${promptId}_logged`];

  run.attempts = run.attempts.filter(
    (item) => !(item.sessionNumber === 3 && item.attemptId === promptId),
  );
  run.exposureLog = run.exposureLog.filter(
    (item) => !(item.sessionNumber === 3 && item.source === promptId),
  );
}

function session3ValidResponse(prompt, response) {
  if (!response) return false;

  if (prompt.type === "choice") {
    return Number.isInteger(response.selectedIndex)
      && response.selectedIndex >= 0
      && response.selectedIndex < prompt.options.length;
  }

  if (prompt.type === "order") {
    return Array.isArray(response.selectedOrder)
      && response.selectedOrder.length === prompt.correctOrder.length
      && response.selectedOrder.every((value) => value === "" || prompt.options.includes(value));
  }

  return true;
}

function scoreSession3DeterministicPrompt(prompt, response) {
  if (!session3ValidResponse(prompt, response)) return null;

  if (prompt.type === "choice") {
    return response.selectedIndex === prompt.correctIndex;
  }

  if (prompt.type === "order") {
    return arraysEqual(response.selectedOrder, prompt.correctOrder);
  }

  return null;
}

function updateSession3DeterministicResult(prompt, response, progress) {
  const correct = scoreSession3DeterministicPrompt(prompt, response);
  if (correct === null) return null;

  const result = {
    firstResult: progress.results[prompt.id]?.firstResult ?? correct,
    finalResult: correct,
    targetIds: prompt.targetIds,
  };

  progress.results[prompt.id] = result;
  return result;
}

function promptCompleted(progress, prompt) {
  if (prompt.type === "typed") {
    return Boolean(progress.prompt5Evaluator);
  }

  if (prompt.type === "order") {
    return session3ValidResponse(prompt, progress.responses[prompt.id])
      && progress.responses[prompt.id].selectedOrder.every(Boolean);
  }

  return session3ValidResponse(prompt, progress.responses[prompt.id]);
}

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function evaluatorHasCorrectWord(evaluator) {
  return Object.values(evaluator.target_words).includes("correct");
}

function evaluateSession3Sentence(sentence, targetWords) {
  const lower = sentence.toLowerCase();
  const onTopicTerms = ["weather", "storm", "meteorologist", "forecast", "air", "wind", "cloud", "pressure"];
  const contentFit = onTopicTerms.some((term) => lower.includes(term)) ? "on_topic" : "drifting";
  const targetWordsResult = {};
  const feedbackSummary = [];

  for (const word of targetWords) {
    const present = new RegExp(`\\b${word}\\b`, "i").test(sentence);

    if (!present) {
      targetWordsResult[word] = "missing";
      feedbackSummary.push(`Add ${word} only if it helps explain the weather idea more clearly.`);
      continue;
    }

    const contextLooksUseful =
      word === "predict"
        ? /(predict).*(weather|storm|forecast|evidence)|meteorologists?.*(predict)/i.test(sentence)
        : /(pressure).*(air|storm|weather|drop|fall)/i.test(sentence);

    targetWordsResult[word] = contextLooksUseful ? "correct" : "vague";
    feedbackSummary.push(
      contextLooksUseful
        ? `${word[0].toUpperCase()}${word.slice(1)} is used clearly.`
        : `${word[0].toUpperCase()}${word.slice(1)} appears, but the meaning could be more precise.`,
    );
  }

  if (contentFit !== "on_topic") {
    feedbackSummary.push("Keep the sentence tied to how meteorologists use evidence about weather.");
  }

  return {
    target_words: targetWordsResult,
    content_fit: contentFit,
    feedback_summary: feedbackSummary,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

render();
