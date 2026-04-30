# James Vocabulary App — V1 Implementation Spec
## Version 4.1 — Build Handoff (Single Content Source + Knowledge Targets)

Date: April 16, 2026

Status: Active implementation spec
Owner: Bridget Harrington / JamesApp
Supersedes: Earlier build handoff notes in `progress.md`
Superseded by: None

## Changelog

- Aligned the implementation spec to the active PRD.
- Added first-class `knowledgeTargets` to the content model.
- Added task-level `content_target_ids` linkage.
- Added future-proof review metadata fields: `last_reviewed_at`, `due_at`, `next_due_at`.
- Clarified V1 limitation around delayed retention.
- Upgraded Session 4 and Session 5 productive evaluation to score science accuracy, not just topicality.
- Replaced older detective wrapper language with the quieter growth-and-connection theme from the active PRD.

## 1. What this document does

This document translates the locked V1 product brief into a build-facing implementation spec.

It defines:
- the exact V1 build target
- the fixed sequence content package
- the core data objects
- the scoring and status logic
- the open-response evaluator contract
- the acceptance criteria for each session
- the minimum cross-session QA rules

This spec is a companion to the current product brief, not a strategy rewrite.

## Known limitations of V1

V1 provides within-sequence evidence only. It does not yet measure delayed retention across days.

---

## 2. V1 build target

V1 is a **single fixed five-session learner sequence**.

The app must let James:
1. complete Sessions 1–5 in order
2. work through one fixed content-rich vocabulary sequence
3. receive immediate feedback after every scored response
4. finish with each anchor word and the core morphology family computed internally as `solid` or `fragile`
5. see a simple final recap showing progress, not just completion

V1 is **not** a weekly topic platform.
It does **not** include topic cards, parent workflows, in-product content generation, or advanced adaptivity.

Implementation note:
The status layer computes internal `solid` / `fragile` values. Learner-facing recap copy displays these as `Steady for now` and `Needs another look`.

---

## 3. Fixed sequence package for V1

## 3.1 Sequence identity

- `sequence_id`: `weather_severe_v1`
- `sequence_version`: `1.0`
- `topic_title`: `How Meteorologists Predict Severe Weather`
- `mission_question`: `How do meteorologists know when severe weather might happen?`

## 3.2 Fixed language targets

### Anchor words
1. `predict`
2. `pressure`
3. `transport`
4. `severe`

### Core morphology family
- `port = carry`

### Notice morphemes
- `dict` in `predict`
- `press` in `pressure`

### Knowledge targets
1. `wx_pressure_signal`
2. `wx_multi_data`
3. `wx_transport`

## 3.3 Fixed asset slots

- `main_text`: one hand-authored informational passage, 300–450 words
- `visual_asset`: one controlled functional visual used in Session 1
- `session_1_questions`: 3 fixed closed-response questions
- `session_2_family_words`: 3 taught family words + 1 untaught relative
- `session_3_prompt_set`: 5 fixed prompt slots
- `session_4_prompt`: 1 fixed writing prompt
- `session_4_model_response`: 1 short model response
- `session_5_base_deck`: 7 fixed review card slots

Current implementation notes:
- `content.js` currently uses a shorter-than-spec main text and `visualNotes` rather than a full 300–450 word passage plus a controlled `visual_asset`. Treat this as current implementation reality, not resolved spec alignment. Passage expansion and functional visual asset work remain parked for later PM decision.
- If `visual_asset_id` is absent in current V1 prototype content, `visualNotes` may serve as temporary meaning support. This does not resolve the controlled visual asset requirement.

---

## 4. System components

V1 can be implemented with five functional layers:

1. **Content layer**
   - renders the fixed sequence package

2. **Progress layer**
   - tracks current unlocked session
   - saves session completion
   - supports resume

3. **Response layer**
   - captures closed and typed responses
   - stores attempt records

4. **Evaluation layer**
   - scores closed-response tasks deterministically
   - evaluates typed responses through a structured rubric evaluator

5. **Status layer**
   - computes solid vs fragile for each anchor word and the core family
   - computes transfer state
   - prepares final recap data

---

## 5. Routes / screens in V1

Minimum route set:

- `/`
- `/sequence`
- `/session/1`
- `/session/2`
- `/session/3`
- `/session/4`
- `/session/5`
- `/recap`

Minimum screen states:

- not started
- in progress
- completed
- locked
- resumed

---

## 6. Core data objects

## 6.1 ContentPack

```json
{
  "sequence_id": "weather_severe_v1",
  "sequence_version": "1.0",
  "topic_title": "How Meteorologists Predict Severe Weather",
  "mission_question": "How do meteorologists know when severe weather might happen?",
  "main_text": "string",
  "visual_asset_id": "weather_map_v1",
  "knowledge_targets": [
    {"target_id": "wx_pressure_signal", "statement": "Changes in air pressure can signal severe weather."},
    {"target_id": "wx_multi_data", "statement": "Meteorologists use pressure, wind, temperature, and moisture data to predict storms."},
    {"target_id": "wx_transport", "statement": "Moving air can transport heat and moisture into storms."}
  ],
  "anchor_word_ids": ["predict", "pressure", "transport", "severe"],
  "core_family_id": "port_carry",
  "notice_morphemes": [
    {"label": "dict", "example_word": "predict"},
    {"label": "press", "example_word": "pressure"}
  ],
  "sessions": ["session_1", "session_2", "session_3", "session_4", "session_5"]
}
```

Purpose:
- single source of truth for the V1 sequence content

Notes:
- fixed in code or seed data
- not generated live in product

---

## 6.2 KnowledgeTarget

```json
{
  "target_id": "wx_pressure_signal",
  "statement": "Changes in air pressure can signal severe weather."
}
```

Required fields:
- `target_id`
- `statement`

Notes:
- V1 includes exactly 3 knowledge targets
- tasks may point to zero, one, or many knowledge targets via `content_target_ids`

---

## 6.3 AnchorWord

```json
{
  "word_id": "predict",
  "display": "predict",
  "lemma": "predict",
  "part_of_speech": "verb",
  "short_clue": "say what is likely to happen based on evidence",
  "session_targets": [1, 3, 4, 5],
  "is_anchor": true
}
```

Required fields:
- `word_id`
- `display`
- `lemma`
- `part_of_speech`
- `short_clue`
- `session_targets`

Notes:
- exactly 4 instances in V1
- each anchor word must appear in at least 2 sessions beyond Session 1 exposure

---

## 6.4 MorphologyFamily

```json
{
  "family_id": "port_carry",
  "label": "port",
  "meaning_clue": "carry",
  "anchor_connection": "transport",
  "taught_words": ["transport", "import", "export"],
  "untaught_relative": "portable",
  "notice_only": false
}
```

Required fields:
- `family_id`
- `label`
- `meaning_clue`
- `anchor_connection`
- `taught_words`
- `untaught_relative`

Notes:
- V1 tracks only one full family status
- notice morphemes are display supports, not mastery targets

---

## 6.5 SessionDefinition

```json
{
  "session_id": "session_1",
  "session_number": 1,
  "title": "Read & Notice",
  "subtitle": "First Look",
  "task_ids": ["s1_prior", "s1_read_1", "s1_read_2", "s1_q1", "s1_q2", "s1_q3"]
}
```

Required fields:
- `session_id`
- `session_number`
- `title`
- `subtitle`
- `task_ids`

---

## 6.6 TaskDefinition

```json
{
  "task_id": "s3_best_fit",
  "session_number": 3,
  "task_type": "best_fit_choice",
  "prompt": "string",
  "choices": ["string", "string", "string"],
  "correct_answer": "string",
  "target_item_ids": ["predict"],
  "content_target_ids": ["wx_multi_data"],
  "encounter_tier": "active",
  "retest_variant_task_id": "s3_best_fit_retest"
}
```

Required fields:
- `task_id`
- `session_number`
- `task_type`
- `prompt`
- `target_item_ids`
- `encounter_tier`

Optional fields:
- `content_target_ids`
- `choices`
- `correct_answer`
- `acceptable_order`
- `model_answer`
- `retest_variant_task_id`

Important rule:
- only tasks with `target_item_ids` affect item status
- content-only questions may have an empty target list
- `content_target_ids` link the task to one or more knowledge targets even when lexical status is unaffected

---

## 6.7 SequenceRun

```json
{
  "run_id": "uuid",
  "learner_id": "string_or_null",
  "sequence_id": "weather_severe_v1",
  "sequence_version": "1.0",
  "current_unlocked_session": 2,
  "session_status": {
    "1": "completed",
    "2": "in_progress",
    "3": "locked",
    "4": "locked",
    "5": "locked"
  },
  "started_at": "timestamp",
  "completed_at": null,
  "review_state": {
    "predict": {
      "last_reviewed_at": null,
      "due_at": null,
      "next_due_at": null
    }
  }
}
```

Required fields:
- `run_id`
- `sequence_id`
- `sequence_version`
- `current_unlocked_session`
- `session_status`
- `started_at`

---

## 6.8 AttemptRecord

```json
{
  "attempt_id": "uuid",
  "run_id": "uuid",
  "session_number": 3,
  "task_id": "s3_best_fit",
  "target_item_ids": ["predict"],
  "encounter_tier": "active",
  "response_type": "closed",
  "first_response": "guess",
  "first_result": "incorrect",
  "final_response": "predict",
  "final_result": "correct",
  "distractor_selected": "guess",
  "feedback_shown": true,
  "retest_origin_task_id": null,
  "timestamp": "timestamp"
}
```

Required fields:
- `attempt_id`
- `run_id`
- `session_number`
- `task_id`
- `target_item_ids`
- `encounter_tier`
- `response_type`
- `first_result`
- `final_result`
- `timestamp`

Enumerations:
- `response_type`: `closed`, `typed`
- `first_result` / `final_result`: `correct`, `incorrect`, `partial`, `vague`, `awkward`, `missing`, `not_scored`

---

## 6.9 WritingEvaluation

```json
{
  "evaluation_id": "uuid",
  "run_id": "uuid",
  "session_number": 4,
  "draft_number": 1,
  "submission_text": "string",
  "required_words": {
    "predict": "correct",
    "pressure": "vague"
  },
  "family_use_quality": "absent",
  "content_fit": "on_topic",
  "content_accuracy": "accurate",
  "sentence_level_feedback": [
    {
      "sentence_index": 2,
      "issue": "scientific_inaccuracy",
      "message": "Air pressure is one signal meteorologists study; it does not work alone."
    }
  ],
  "overall_flag": "revise",
  "feedback_summary": [
    "You used predict correctly.",
    "Pressure needs a more exact job in your sentence."
  ],
  "model_answer_shown": true,
  "best_sentence": "Meteorologists predict severe weather by studying changes in air pressure."
}
```

Required fields:
- `evaluation_id`
- `run_id`
- `session_number`
- `draft_number`
- `submission_text`
- `required_words`
- `family_use_quality`
- `content_fit`
- `content_accuracy`
- `sentence_level_feedback`
- `overall_flag`
- `feedback_summary`

Enumerations:
- `required_words[word]`: `correct`, `vague`, `awkward`, `missing`
- `family_use_quality`: `accurate`, `weak`, `absent`
- `content_fit`: `on_topic`, `partly_off_topic`, `off_topic`
- `content_accuracy`: `accurate`, `partly_accurate`, `inaccurate`
- `overall_flag`: `solid`, `revise`

---

## 6.10 ReviewQueueEntry

```json
{
  "queue_id": "uuid",
  "run_id": "uuid",
  "source_task_id": "s5_card_2",
  "retest_task_id": "s5_card_2_retest",
  "target_item_ids": ["predict"],
  "reason": "incorrect_first_try",
  "insert_before_final_card": true,
  "consumed": false
}
```

Purpose:
- drives the max-2 same-session retests in Session 5

---

## 6.11 StatusSnapshot

```json
{
  "snapshot_id": "uuid",
  "run_id": "uuid",
  "item_id": "predict",
  "item_type": "anchor_word",
  "active_success_count": 2,
  "productive_success_count": 1,
  "success_sessions": [1, 3, 4],
  "latest_outcome": "correct",
  "transfer_state": "none",
  "final_status": "solid",
  "last_reviewed_at": null,
  "due_at": null,
  "next_due_at": null,
  "reason_codes": [
    "met_min_success_count",
    "has_productive_or_retrieval_success",
    "latest_outcome_clean"
  ]
}
```

Required fields:
- `item_id`
- `item_type`
- `active_success_count`
- `productive_success_count`
- `success_sessions`
- `latest_outcome`
- `transfer_state`
- `final_status`
- `last_reviewed_at`
- `due_at`
- `next_due_at`
- `reason_codes`

Enumerations:
- `item_type`: `anchor_word`, `core_family`
- `transfer_state`: `none`, `full_success`, `recovered`, `failed`
- `final_status`: `solid`, `fragile`

---

## 7. Scoring architecture

## 7.1 General scoring rule

Use two scoring paths:

### Deterministic scoring
Use for:
- multiple choice
- best-fit choice
- cloze recall with fixed answer set
- example / non-example
- exact rank/order
- family match / build with fixed correct answer

### Rubric-based evaluation
Use for:
- Session 3 micro-use sentence
- Session 4 short explanation draft(s)
- Session 5 final challenge sentence

The evaluator may be implemented with an LLM or another structured scorer, but it must return the fixed schema defined in this spec.
The UI should not expose model uncertainty language.

---

## 7.2 Encounter-credit rule

An item gets credit only when:
- the task targets that item, and
- the final outcome is successful enough to count

Credit rules:
- `exposure` = visible only; never enough for solid
- `active` success = counts toward solid
- `productive` success = counts toward solid and is stronger evidence
- retest after feedback can repair the final result for session logic, but does **not** create a new separate encounter count

Implementation rule:
- store both `first_result` and `final_result`
- status logic uses successful final results
- transfer logic distinguishes first-try from recovered success

---

## 7.3 Session-by-session scoring logic

## Session 1 — Read & Notice

Scored elements:
- Question 1: closed, deterministic
- Question 2: closed, deterministic
- Question 3: closed, deterministic

Status impact:
- Questions 1 and 2 may be content-only and can store no lexical target ids
- Question 3 should target at least one anchor word or one visual-linked word meaning
- Second-pass highlighting creates exposure encounters for all 4 anchor words
- showing the family clue creates one exposure encounter for the core family

Completion rule:
- session complete after prior-knowledge step, both reads, and all 3 questions submitted

---

## Session 2 — Build the Word Family

Scored elements:
- 3 build/check rounds
- 1 transfer item

Default scoring:
- each build round = deterministic
- each meaning check = deterministic
- transfer item = deterministic multiple choice

Status impact:
- each successful build/check counts as an active family encounter
- if the built word is `transport`, also count one active encounter for the anchor word `transport`
- transfer item sets:
  - `full_success` if correct first try
  - `recovered` if corrected on retest
  - `failed` if missed and not recovered

Completion rule:
- session complete after preview, 3 build/check rounds, transfer item, and wrap

---

## Session 3 — Choose the Best Word

Scored elements:
1. best-fit choice
2. same word, new context
3. rank/order
4. morphology-linked prompt
5. micro-use sentence

Default scoring:
- prompts 1–4 = deterministic
- prompt 5 = rubric-based evaluator

Status impact:
- prompts 1–4 create active encounters
- prompt 5 creates a productive encounter for each target word marked `correct`
- if prompt 5 uses a target word vaguely or awkwardly, store the attempt but do not count a successful productive encounter

Rank/order rule:
- exact-order match required in V1
- no partial credit in the status engine
- UI feedback may still explain the semantic scale

Completion rule:
- session complete after all 5 prompts submitted

---

## Session 4 — Use the Words

Scored elements:
- draft 1 short explanation
- optional revision draft 2

Required evaluation outputs:
- required word presence
- per-word use quality
- family-connected use quality
- content fit
- overall flag (`solid` or `revise`)
- best sentence
- short feedback summary

Status impact:
- each required word marked `correct` in the final stored draft counts as one productive success
- each required word marked `vague`, `awkward`, or `missing` does not count as productive success
- family use marked `accurate` counts as one productive family success
- family use marked `weak` or `absent` does not count as productive family success

Revision rule:
- show feedback after draft 1
- show model answer after feedback on draft 1
- allow one revision only
- if draft 2 is stronger, store draft 2 as the final draft
- if draft 1 is stronger, keep draft 1 as final

Completion rule:
- session complete after draft 1 plus either revision submission or explicit skip-revision action

---

## Session 5 — Review & Recall

Base deck:
1. cloze recall
2. best-fit choice
3. example / non-example
4. sentence repair / upgrade
5. morphology family match or build
6. untaught-relative inference
7. final challenge sentence

Current V1 Card 7 configuration:
- `requiredWords: ["pressure"]`
- `familyWord: "transport"`
- `predict` is reviewed elsewhere and is not required in the final typed sentence.

Learner-facing card label note:
Implementation slot names describe task type. Learner-facing titles should use approved copy. For example, use `New related word` instead of `Untaught-relative inference`, and `Second look` instead of `Retest`.

Default scoring:
- cards 1–6 = deterministic
- card 7 = rubric-based evaluator

Retest rule:
- after an incorrect first try on cards 1–6, enqueue one retest variant if total retests used < 2
- retest appears before card 7
- retest should use a different format when possible
- if retest succeeds, item can recover for the session but transfer remains `recovered`, not `full_success`
- if retest fails, mark item fragile and continue

Status impact:
- successful cards 1–6 create active encounters
- card 6 also updates transfer state
- card 7 creates productive encounters for correctly used target words/family words

Completion rule:
- session complete after all base cards plus any inserted retests are submitted

---

## 7.4 Typed-response evaluator contract

The evaluator must return structured JSON only.

### Session 3 micro-use schema

```json
{
  "target_words": {
    "predict": "correct",
    "pressure": "missing"
  },
  "content_fit": "on_topic",
  "feedback_summary": [
    "Predict is used correctly.",
    "Add pressure only if it helps explain the weather idea."
  ]
}
```

Allowed labels:
- `correct`
- `vague`
- `awkward`
- `missing`

### Session 4 / Session 5 productive schema

```json
{
  "required_words": {
    "predict": "correct",
    "pressure": "vague"
  },
  "family_use_quality": "accurate",
  "content_fit": "on_topic",
  "content_accuracy": "accurate",
  "sentence_level_feedback": [
    {
      "sentence_index": 1,
      "issue": "scientific_inaccuracy",
      "message": "Meteorologists use multiple data sources, not one clue alone."
    }
  ],
  "overall_flag": "revise",
  "best_sentence": "Meteorologists predict severe weather by studying changes in air pressure.",
  "feedback_summary": [
    "Predict is precise here.",
    "Pressure needs a clearer job in your explanation."
  ]
}
```

### Evaluator rules

- productive responses must be checked for scientific accuracy as well as topic fit
- a response cannot be `solid` if the science explanation is inaccurate, even when target words are used correctly
- sentence-level feedback should call out specific content mistakes when a sentence misstates the weather science

The evaluator must:
- judge the word in context, not by substring alone
- prefer conservative scoring over generous scoring
- avoid praising incorrect or vague usage
- return short actionable feedback
- avoid long explanations
- never invent extra target words

---

## 7.5 Solid / fragile algorithm

## Anchor word status

An anchor word is `solid` if all are true:
1. at least 3 successful active/productive encounters
2. successes occur across at least 2 different sessions
3. at least 1 success is either:
   - a Session 5 retrieval success, or
   - a correct productive use in Session 4 or Session 5
4. latest stored outcome for that word is not `missing` or `awkward`

Else: `fragile`

## Core family status

The core family is `solid` if all are true:
1. at least 3 successful active/productive family encounters
2. successes occur across at least 2 different sessions
3. at least 1 success is either:
   - a `full_success` transfer result, or
   - an accurate family-connected productive use in Session 4 or Session 5
4. latest stored family outcome is not `weak` or `failed`

Else: `fragile`

---

## 7.6 Transfer classification algorithm

Use these rules:

- `full_success`
  - related but untaught word/family application correct on first attempt

- `recovered`
  - related but untaught item wrong first, correct after retest or feedback

- `failed`
  - related but untaught item still incorrect at end of the relevant task/session

- `none`
  - no transfer item attempted for that item

Important:
- `recovered` is useful evidence
- `recovered` does not count as full transfer

---

## 8. Acceptance criteria by session

## 8.1 Session 1 — Read & Notice

### Functional acceptance
- Session 1 opens from Sequence Home when unlocked
- the learner sees an intro screen with title, mission question, and estimated time
- the prior-knowledge scan appears before reading
- first read shows the main text and visual on the same screen
- no support panel, inline gloss, or pop-up help appears during first read
- second pass shows the same text with 4 anchor words highlighted
- second pass shows a right-side support panel with 4 short clues, 1 core family clue, and 2 notice morphemes
- exactly 3 questions appear after the second pass
- Session 2 unlocks when Session 1 is completed, regardless of score

### Data acceptance
- prior-knowledge response is stored
- exposure encounters are logged for all 4 anchor words during the second pass
- one exposure encounter is logged for the core family when its clue is shown
- all 3 question attempts are stored with first and final results
- session completion timestamp is stored

### Scoring acceptance
- questions are scored deterministically
- only item-linked questions update word/family status
- content-only questions do not create fake lexical credit

### Edge-case acceptance
- if the learner leaves after the first read, resuming returns to Session 1 in progress
- resuming does not erase stored prior-knowledge input

---

## 8.2 Session 2 — Build the Word Family

### Functional acceptance
- Session 2 starts with a current-family preview, not an older-family warm-up
- the learner completes 3 tap-to-build rounds
- each round includes a meaning check
- the session ends with 1 untaught-relative transfer item
- the interaction uses tap/click, not drag-and-drop

### Data acceptance
- each build/check round stores one attempt record
- family-targeted attempts carry the family id in `target_item_ids`
- the transfer item stores both first and final results
- transfer state is updated for the family

### Scoring acceptance
- successful build/check rounds count as active family encounters
- the transfer item is classified as `full_success`, `recovered`, or `failed`
- if `transport` is used in a successful round, it also counts toward the anchor word `transport`

### Edge-case acceptance
- if the learner misses a build/check round, the session still continues after feedback
- completion unlocks Session 3 regardless of accuracy

---

## 8.3 Session 3 — Choose the Best Word

### Functional acceptance
- Session 3 contains exactly 5 prompts
- prompts appear in this order:
  1. best-fit choice
  2. same word, new context
  3. rank/order
  4. morphology-linked prompt
  5. micro-use sentence
- only one typed response is required in this session
- the typed response target length is 15–25 words

### Data acceptance
- each prompt stores one attempt record
- the typed response stores structured evaluator output
- distractor selected is stored for prompts with choices

### Scoring acceptance
- prompts 1–4 are scored deterministically
- rank/order uses exact-order scoring in V1
- the micro-use sentence creates a productive success only for words marked `correct`
- vague or awkward usage is stored but does not count as productive success

### Edge-case acceptance
- if the learner submits a too-short or too-long micro-use sentence, the UI prompts once for correction before final submission
- completion unlocks Session 4 regardless of accuracy

---

## 8.4 Session 4 — Use the Words

### Functional acceptance
- Session 4 presents one typed writing prompt
- sentence frames are optional and collapsible
- the learner must submit draft 1 before seeing the model answer
- feedback appears immediately after draft 1
- the model answer appears only after draft 1 feedback
- the learner gets one revision chance
- the learner may explicitly skip revision after draft 1 feedback

### Data acceptance
- draft 1 text is stored
- evaluator output for draft 1 is stored
- if draft 2 exists, draft 2 text and evaluator output are stored
- the final kept draft is stored separately
- one best sentence is stored if available

### Scoring acceptance
- each required word is labeled `correct`, `vague`, `awkward`, or `missing`
- family use is labeled `accurate`, `weak`, or `absent`
- content fit is labeled `on_topic`, `partly_off_topic`, or `off_topic`
- productive encounter credit is awarded only for `correct` required-word uses in the final kept draft
- family productive credit is awarded only for `accurate` family use in the final kept draft

### Edge-case acceptance
- if both required words are missing in draft 1, revision is strongly prompted but not forced beyond one pass
- if draft 2 is weaker than draft 1, the stronger draft remains the final kept draft
- completion unlocks Session 5 regardless of writing quality

---

## 8.5 Session 5 — Review & Recall

### Functional acceptance
- Session 5 starts with the fixed 7-card base deck
- cards 1–6 are closed-response
- card 7 is a final challenge sentence
- up to 2 retest cards may be inserted before card 7
- the learner is never trapped in repeated same-session drilling

### Data acceptance
- each card attempt is stored
- retest cards store a link to the original source task
- transfer state is updated from the untaught-relative inference card
- final challenge evaluator output is stored

### Scoring acceptance
- cards 1–6 are scored deterministically
- card 7 uses the productive evaluator schema
- retest success can repair a session outcome but cannot upgrade transfer to `full_success`
- failed retest leaves the target item fragile unless later evidence changes it

### Edge-case acceptance
- no more than 2 retests can appear in V1
- the final challenge card never spawns a new retest
- sequence completion proceeds even if several items remain fragile

---

## 8.6 Final Recap acceptance

### Functional acceptance
The recap must show:
- all 4 anchor words with internal `solid` / `fragile` status displayed as `Steady for now` / `Needs another look`
- the core family with internal `solid` / `fragile` status displayed as `Steady for now` / `Needs another look`
- related-word result summary
- one strongest sentence if available
- one short statement of what to review next

Current implementation note:
Final Recap may also surface knowledge-target / understanding-progress status when that evidence is available.

### Data acceptance
- one final status snapshot per anchor word is stored
- one final status snapshot for the core family is stored
- sequence completion timestamp is stored

---

## 9. Cross-session QA rules

These rules apply to the whole V1 build.

### Progression
- the learner can resume from the last incomplete session
- errors never block the next session
- replay is allowed after completion but does not affect unlock order

### Wrapper
- plain session titles are always visible
- optional calm subtitles may appear
- the visual wrapper should reinforce a central learning path with branching connections
- the wrapper should suggest growth over time, not a separate game layer
- no idle animation during reading
- no coins, streaks, or currency systems
- no persistent mascot interruptions
- stable progress objects may appear only at session wrap or recap

### Difficulty
- main text stays within 300–450 words
- no more than 4 anchor words plus 2 additional potentially unfamiliar terms in the main text
- Session 4 writing stays within 50–80 words target length
- Session 3 micro-use stays within 15–25 words target length

### Feedback
- every scored task returns feedback
- feedback must be brief, specific, and corrective
- feedback should not explain away wrong answers with generic praise

---

## 10. Recommended build order

1. seed the fixed content package
2. build progress and session unlock logic
3. implement deterministic scoring for Sessions 1, 2, 3, and closed cards in 5
4. implement the structured evaluator for typed responses
5. implement the status engine
6. implement recap screen
7. QA against acceptance criteria

---

## 11. Open items that are still allowed but not required for this build

These may be added during implementation if they do not widen scope:
- storing one stronger distractor label for analytics
- storing one recap-worthy sentence automatically
- replay button for completed sessions

These are not required:
- parent-facing surfaces
- dynamic content
- speech
- expanded themed wrapper
- weekly platform logic

---

## 12. Ship rule for V1

V1 is ready to test when:
- the learner can complete the full five-session sequence end to end
- every required response path stores usable data
- the app can compute believable solid/fragile results for all 4 anchor words and the core family
- the recap accurately reflects stored evidence
- the wrapper stays subordinate to the learning flow
- the tree-and-growth language stays calm, precise, and content-first
