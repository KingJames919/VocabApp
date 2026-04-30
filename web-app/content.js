const jamesContentPack = {
  sequenceId: "weather_severe_v1",
  sequenceVersion: "1.0",
  topicTitle: "How Meteorologists Predict Severe Weather",
  missionQuestion: "How do meteorologists know when severe weather might happen?",
  knowledgeTargets: [
    {
      targetId: "wx_pressure_signal",
      statement: "Changes in air pressure can signal severe weather.",
    },
    {
      targetId: "wx_multi_data",
      statement: "Meteorologists use pressure, wind, temperature, and moisture data to predict storms.",
    },
    {
      targetId: "wx_transport",
      statement: "Moving air can transport heat and moisture into storms.",
    },
  ],
  anchorWords: [
    {
      id: "predict",
      label: "predict",
      clue: "say what is likely to happen based on evidence",
      partOfSpeech: "verb",
      sessions: [1, 3, 4, 5],
    },
    {
      id: "pressure",
      label: "pressure",
      clue: "the force created when air presses down",
      partOfSpeech: "noun",
      sessions: [1, 3, 5],
    },
    {
      id: "transport",
      label: "transport",
      clue: "carry heat, moisture, or something else from one place to another",
      partOfSpeech: "verb",
      sessions: [1, 2, 4, 5],
    },
    {
      id: "severe",
      label: "severe",
      clue: "very serious, harsh, or intense",
      partOfSpeech: "adjective",
      sessions: [1, 3, 4, 5],
    },
  ],
  morphologyFamily: {
    id: "port_carry",
    label: "port",
    meaning: "carry",
    anchorConnection: "transport",
    taughtWords: ["transport", "import", "export"],
    untaughtRelative: "portable",
  },
  noticeMorphemes: [
    { label: "dict", example: "predict" },
    { label: "press", example: "pressure" },
  ],
  mainText:
    "Meteorologists study patterns in air, water, and temperature to predict when severe weather may happen. They look for falling air pressure, warm moist air rising quickly, and strong winds that can transport heat and moisture into a storm system. A weather map can show where these conditions are building. If the signs line up, forecasters warn communities before the storm arrives. Their job is not to guess. They compare evidence from radar, satellites, and surface reports to decide what is most likely to happen next.",
  visualNotes: [
    "Falling air pressure can signal storm development.",
    "Warm, moist air can fuel rising storm clouds.",
    "Moving air can transport heat and moisture into a storm system.",
  ],
  sessions: [
    {
      number: 1,
      id: "session_1",
      title: "Read & Notice",
      subtitle: "First Look",
      objective:
        "Read the weather passage, notice the anchor words, and answer three comprehension checks.",
      deliverable: "Reading notes and first vocabulary exposure",
    },
    {
      number: 2,
      id: "session_2",
      title: "Build the Word Family",
      subtitle: "Word Roots",
      objective:
        "Work with the morphology family port = carry, then attempt an untaught relative.",
      deliverable: "Family evidence and transfer attempt",
    },
    {
      number: 3,
      id: "session_3",
      title: "Choose the Best Word",
      subtitle: "Best Fit",
      objective:
        "Choose the most precise anchor word in context and write one micro-use sentence.",
      deliverable: "Precision practice and evaluator input",
    },
    {
      number: 4,
      id: "session_4",
      title: "Use the Words",
      subtitle: "Grow the Idea",
      objective:
        "Write a short explanation using the target vocabulary, then revise once after feedback.",
      deliverable: "Best kept draft",
    },
    {
      number: 5,
      id: "session_5",
      title: "Review & Recall",
      subtitle: "Revisit & Strengthen",
      objective:
        "Complete the fixed review deck, allow retests, and finish with a final challenge sentence.",
      deliverable: "Retrieval evidence and recap-ready data",
    },
  ],
};

globalThis.JAMES_CONTENT_PACK = jamesContentPack;
