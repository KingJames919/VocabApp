# James Vocabulary App — Active PRD
## Version 3.3 — Locked V1 Product Brief + Data Model Cleanup

Date: April 15, 2026

Status: Active PRD
Owner: Bridget Harrington / JamesApp
Supersedes: `james_vocabulary_product_brief_v2.md`, `james_vocabulary_product_brief_v3_pass1.md`, `james_vocabulary_product_brief_v3_pass2.md`
Superseded by: None

## Changelog

- Declared this latest brief the active PRD for V1.
- Corrected transfer language so transfer attempts use `full_success`, `recovered`, or `failed`, while anchor words and the core family use `solid` / `fragile`.
- Added first-class knowledge targets and task-linkage guidance.
- Added future-proof review metadata fields for later spaced review work.
- Added a short V1 limitations note for delayed retention.
- Replaced the older detective wrapper language with a subtle growth-and-connection theme.

### Post-PASS-5 implementation note

- Sessions 1-5 are implemented as one fixed sequence.
- Internal status values remain `solid` / `fragile`.
- Learner-facing Final Recap status displays those values as `Steady for now` / `Needs another look`.
- Internal transfer-state values may remain `full_success`, `recovered`, and `failed`.
- Learner-facing copy should use `related word` or `new related word` instead of exposing transfer-state language.
- Homepage V1 is canonical.
- Homepage V2 is exploratory only.
- In current V1, Session 5 Card 7 uses `pressure` as the required anchor word and `transport` as the required family-connected word. `predict` is reviewed elsewhere and is not required in the final typed sentence.

## Terms replaced

- `Case Brief` -> `First Look`
- `Codebreak` -> `Word Roots`
- `Lineup` -> `Best Fit`
- `Field Report` -> `Grow the Idea`
- `Cold Case` -> `Revisit & Strengthen`
- `false lead` -> `especially plausible distractor`
- `detective wrapper` -> `quiet growth-and-connection theme`

## 1. What this document does

This version locks:
- **Pass 1: the V1 product spec**
- **Pass 2: the exact session mechanics for V1**
- **Pass 3: the learning, tracking, and difficulty rules for V1**

It intentionally keeps the build narrow.

V1 remains a **single fixed learner sequence** designed to prove the core learning loop before the project takes on weekly-topic operations, parent workflows, dynamic content generation, or advanced adaptivity.

---

## 2. V1 in one sentence

**V1 lets James complete one hand-authored, five-session, content-rich vocabulary sequence and finish with stronger command of four anchor words, one core morphology family, and at least one transfer attempt the app can classify as `full_success`, `recovered`, or `failed`.**

---

## 3. V1 product summary

V1 is a **single-sequence learner prototype**, not a full weekly content platform.

The purpose of V1 is to prove that the following learning loop works inside a web app:

1. read a short, knowledge-building text
2. notice and revisit important vocabulary
3. build one morphology family
4. practice precision in word choice
5. use the words in short written output
6. review through retrieval and transfer
7. leave with visible word/family status and clear evidence of what is getting stronger and what needs more review

The product remains aligned to the instructional idea that drives the project:
- content first
- vocabulary and knowledge together
- morphology as a multiplicative engine
- repeated meaningful encounters
- productive use
- retrieval and spacing
- a quiet visual wrapper that shows growth and connection without distracting from the learning work

---

## 4. Exact V1 learner promise

By the end of V1, James should be able to:

- complete a full five-session sequence without needing a parent-operated content workflow
- understand the science topic at a basic content level
- recognize and use 4 anchor words more accurately than at the start
- work with 1 core morphology family and connect it to related words
- attempt at least 1 untaught-relative or family-based transfer item
- receive useful feedback after every response
- finish the sequence with each anchor word and the core family computed internally as `solid` or `fragile`, displayed to the learner as `Steady for now` or `Needs another look`
- leave with at least one clear connection between a word, its family, and a stronger use of the idea

This is the proof point for the concept.
It is enough to justify a second phase if the experience works well.

## Known limitations of V1

V1 provides within-sequence evidence only. It does not yet measure delayed retention across days.

---

## 5. V1 learner journey

V1 uses a **single child-facing journey**.

There is no in-product topic selection, parent approval flow, or weekly pack generation in V1.

### V1 screen flow

1. **Home / Start**
   - start the sequence
   - resume if already in progress

2. **Sequence Home**
   - shows the current topic
   - shows Sessions 1–5
   - unlocks the next available session

3. **Session 1: Read & Notice**
   - session intro
   - prior knowledge scan
   - first read
   - second pass with highlighted anchor words and support panel
   - fixed light comprehension questions
   - session wrap

4. **Session 2: Build the Word Family**
   - family preview
   - explicit family build activity
   - short meaning checks
   - transfer item
   - session wrap

5. **Session 3: Choose the Best Word**
   - fixed five-prompt precision session
   - session wrap

6. **Session 4: Use the Words**
   - short typed response
   - automated feedback
   - one revision chance
   - session wrap

7. **Session 5: Review & Recall**
   - fixed seven-card review deck
   - limited same-session retests
   - immediate feedback
   - short end-of-sequence recap

8. **Final Recap**
   - words getting stronger
   - what still needs support
   - morphology family learned
   - one useful stretch or review moment

### V1 progression rule

- Sessions are completed in order.
- James can leave and resume.
- Struggle never blocks the next session in V1.
- Fragile items are carried forward in data, not used to lock the product.

---

## 6. V1 content-authoring model

### Locked V1 content rule

V1 uses **hand-authored original content grounded in real science facts**, plus a simple functional visual that the team controls.

### What this means in practice

- The text is original and written for the app.
- The science facts are real and accurate.
- The visual is controlled by the team and designed to support the text.
- The sequence is fixed in code/content for V1.
- AI may help during internal drafting, but the shipped V1 experience does **not** depend on in-product generation.

### Why this is the right V1 choice

This keeps the first build focused on:
- the learner experience
- the session logic
- the feedback model
- the morphology integration
- the review flow

It avoids early complexity around:
- topic generation
- pack generation
- approval workflows
- content quality control in the live app

---

## 7. V1 starter content

### First sequence topic
**How Meteorologists Predict Severe Weather**

### Why this topic
This topic is concrete, school-aligned, visual, and easier to control than more abstract science content like cells.

### Fixed starter content for V1
- 1 main text
- 1 functional weather visual
- 3 explicit knowledge targets
- 4 anchor words
- 1 core morphology family
- 2 morphology notices
- 1 typed application task
- 1 fixed review session

### Starter word set
- predict
- pressure
- transport
- severe

### Core family
- **port = carry**

### Notice morphemes
- **dict** in *predict*
- **press** in *pressure*

### Knowledge targets

```json
"knowledgeTargets": [
  {
    "targetId": "wx_pressure_signal",
    "statement": "Changes in air pressure can signal severe weather."
  },
  {
    "targetId": "wx_multi_data",
    "statement": "Meteorologists use pressure, wind, temperature, and moisture data to predict storms."
  },
  {
    "targetId": "wx_transport",
    "statement": "Moving air can transport heat and moisture into storms."
  }
]
```

These are first-class content targets alongside the anchor words and the core morphology family.
Tasks may link to one or more knowledge targets through `content_target_ids` or an equivalent field in code.

Anchor-word note:
`transport` remains in the starter set because this pack now uses it for a central science idea, not for logistics language. In V1 it names how moving air carries heat and moisture into storms, which keeps the word instructionally coherent while preserving the `port = carry` family.

This keeps the first build aligned to the product’s content-first, morphology-aware model without making V1 a full content engine.

---

## 8. Quiet wrapper rule for V1

V1 keeps plain instructional labels and may also show a calm kid-facing subtitle.

- **Session 1: Read & Notice** — *First Look*
- **Session 2: Build the Word Family** — *Word Roots*
- **Session 3: Choose the Best Word** — *Best Fit*
- **Session 4: Use the Words** — *Grow the Idea*
- **Session 5: Review & Recall** — *Revisit & Strengthen*

### Exact wrapper rule

The wrapper supports learning but never becomes the main event.

V1 uses:
- plain session labels plus optional calm subtitles
- a central learning path that shows where the learner begins, where they are now, and what comes next
- branching connections that suggest words, ideas, and patterns belong to one growing system
- progress objects that reinforce growth over time rather than checklist completion alone
- stable progress objects such as **Word Cards**, **Family Map**, and the **Final Recap**
- consistent visual coding for word parts
- one main task per screen
- text, clue, and visual kept close together

V1 does **not** use:
- Pip as an on-screen mascot in the first coded pass
- idle animation during reading
- streaks, coins, gems, or currencies
- side plots, lore, or HQ/base-building
- reward systems that sit outside the word/family learning loop

The wrapper should be visible in headings, progress objects, and recap moments.
It should suggest a connected structure rather than a list of isolated tasks.
It should not dominate reading, question solving, or writing.

---

## 9. Exact session mechanics for V1

## Session 1 — Read & Notice

### Exact on-screen sequence
1. **Session intro**
   - topic title
   - mission question
   - estimated time
2. **Prior knowledge scan**
   - “I know a lot / a little / almost nothing”
   - one short typed prediction or prior-knowledge note
3. **First read**
   - plain text only
   - functional visual visible on the same screen
   - no definitions and no pop-up help
4. **Second pass**
   - same text again
   - 4 anchor words highlighted
   - support panel visible
5. **3 fixed comprehension questions**
6. **Session wrap**
   - quick recap
   - progress update
   - Session 2 unlock notice

### Support visible during the second pass

During the second pass, the screen shows:
- the passage
- the functional visual on the same screen
- a right-side support panel containing:
  - the 4 anchor words
  - a short one-line clue for each word
  - the core family label where relevant
  - the 2 notice morphemes

V1 does **not** use:
- inline glosses
- tappable definitions
- pop-up notes
- extra side interactions during the reading itself

### Fixed question count and types

Session 1 uses **exactly 3 closed-response questions** in V1:
1. **Gist/content question**
2. **Cause/effect or key-detail question**
3. **Vocabulary-in-context or visual-link question**

These are fixed defaults, not variable.

---

## Session 2 — Build the Word Family

### Exact on-screen sequence
1. **Family preview**
   - show the anchor word from the passage
   - show the shared family clue
2. **Explicit teach**
   - state the core meaning of the family
3. **3 tap-to-build rounds**
   - James taps word parts to assemble a word
   - the built word appears
   - pronunciation and short meaning display
4. **Short meaning check after each build**
5. **1 transfer item** using an untaught relative
6. **Session wrap**

### Default interaction pattern

The default interaction is **tap-to-build**, not drag-and-drop.

In V1, Session 2 uses:
- tap/click word-part chips
- build the word
- choose the best meaning or sentence fit

This keeps the interaction stable and easier to build than drag behavior.

### Week 1 / V1 replacement for the older-family warm-up

Because V1 is a single first sequence, there is no prior family to review.

So the older-family warm-up is replaced by a **current-family preview**.
That preview acts as a short bridge into the word-family work.

### Exact transfer item form

The transfer item is:
- **one sentence containing an untaught related word**
- **three answer choices for meaning or fit**
- followed by brief explanatory feedback that links back to the family meaning

This keeps the transfer step real without adding open-response scoring complexity.

---

## Session 3 — Choose the Best Word

### Exact 5 prompt types in V1

Session 3 uses **exactly 5 prompts**:
1. **Best-fit choice** among close options
2. **Same word, new context**
3. **Rank/order prompt** on a meaningful semantic dimension
4. **Morphology-linked prompt**
5. **One short typed micro-use sentence**

### Distractor rule

For V1, distractors must follow this rule:
- they must be **plausible**
- they must be **semantically close enough to cause confusion**
- they must differ on **one clear dimension** such as evidence, strength, urgency, scale, or role
- one distractor should be a strong **distractor**
- no random or joke distractors
- no two distractors that are almost duplicates of each other

### Typed response rule

Session 3 allows **one typed response only**:
- one short sentence
- target length: **15–25 words**
- no long typed justifications in V1

This keeps the session sharp and makes Session 4 the main output task.

---

## Session 4 — Use the Words

### Exact task format in V1

Session 4 is a **short typed explanation**.

V1 uses:
- **one fixed prompt**
- **3–4 sentences**
- target length: **50–80 words**
- **2 required anchor words**
- **1 optional family-connected stretch word**
- optional sentence frames

### Exact feedback rubric

The app checks the response across four dimensions:

1. **Required word presence**
   - present or missing

2. **Word-use quality** for each required word
   - **correct use** = the word fits the sentence meaning, grammar, and topic
   - **vague use** = the word is loosely related but not precise or not doing much real work
   - **awkward use** = the word feels forced, grammatically off, or semantically mismatched

3. **Family-connected use**
   - **present and accurate** = the response uses the core family word or a true related family word accurately
   - **present but weak** = the family connection is attempted but unclear or shallow
   - **absent** = no family-based use appears

4. **Content fit**
   - on-topic or partly off-topic

### When the model answer appears

The model answer appears **after James submits his first response and sees feedback**.

That means James must attempt the writing first.
Then he can use the model response as a revision support.

### Revision rule

V1 gives **one revision pass**.

- If a required word is missing or awkward, revision is strongly prompted.
- If the response is already solid, revision is optional.
- After revision, the app reruns the same checks and stores the better version.

---

## Session 5 — Review & Recall

### Exact base 7-card structure in V1

Session 5 uses a fixed **7-card base deck**:

1. **Cloze recall**
2. **Best-fit choice**
3. **Example / non-example**
4. **Sentence repair / upgrade**
5. **Morphology family match or build**
6. **Untaught-relative inference**
7. **Final challenge sentence** using one anchor word and one family word

Because V1 is a single first sequence, these cards review material from earlier sessions in the same sequence rather than older weeks.

### Miss rule

If James misses a **closed-response card** in Session 5:
- the app gives immediate corrective feedback
- the missed item goes into a **short review queue**
- the app can add **up to 2 retest cards total** in V1
- retest cards appear **before the final challenge card**
- each retest uses a **different format** from the original miss when possible

If James misses an item again:
- the card is marked **fragile**
- the session continues
- the item is not drilled repeatedly in the same session

For the **final challenge sentence**:
- the app gives brief feedback
- no additional retest card is added
- any weakness is stored as fragile evidence

### Unlock and retry rule across all sessions

V1 uses a simple progression rule:
- James never gets blocked from the next session because of errors
- the next session unlocks when the current session is completed
- completed means the required steps were submitted, not that every answer was correct
- James may replay a finished session later, but replay does not gate progress

---

## 10. Pass 3 — Learning and tracking rules

## 10.1 Status model used in V1

V1 does **not** claim permanent mastery.

Instead, V1 stores raw evidence and computes a **provisional sequence-level status** for each of the 4 anchor words and the 1 core morphology family:

- **Solid** = enough evidence exists in this sequence to treat the item as currently usable
- **Fragile** = the item still needs more review, even if James showed some success

Items may begin in an internal **not-yet-assessed** state. The app computes internal `solid` / `fragile` status for each anchor word and the core family. The learner-facing Final Recap displays those as `Steady for now` or `Needs another look`.

This keeps the first build honest.
A single sequence can show meaningful progress, but it should not pretend to prove long-term mastery.

---

## 10.2 What counts as an encounter

V1 tracks encounters in three tiers.

### 1. Exposure encounter
James sees the target item in a deliberate learning moment.

Examples:
- highlighted anchor word in Session 1 second pass
- core family preview in Session 2
- notice morpheme shown in the support panel

Exposure encounters are stored, but exposure alone cannot make an item solid.

### 2. Active encounter
James has to interpret, choose, compare, build, or retrieve the target item.

Examples:
- Session 1 vocabulary-in-context question
- Session 2 meaning check after a word build
- Session 3 best-fit, ranking, or morphology-linked prompt
- Session 5 closed-response review cards

Active encounters are the main evidence layer for solid/fragile status.

### 3. Productive encounter
James uses the target item in his own language.

Examples:
- Session 3 micro-use sentence
- Session 4 short explanation
- Session 5 final challenge sentence

Productive encounters are the strongest evidence layer in V1.

### Encounter counting rule

To prevent fake inflation:
- one prompt counts as **at most one encounter per target item**
- a retest of the same item after feedback does **not** create a second new encounter
- exposure encounters count for visibility only
- only **successful active or productive encounters** count toward solid status

---

## 10.3 What counts as solid in V1

### Anchor word is **solid** if all of the following are true:
1. It has at least **3 successful active/productive encounters**
2. Those successful encounters occur across at least **2 different sessions**
3. At least **1** of those successes is either:
   - a successful retrieval event in Session 5, or
   - a correct productive use in Session 4 or Session 5
4. The latest stored evidence for that word is **not** missing or awkward

### Core morphology family is **solid** if all of the following are true:
1. It has at least **3 successful active/productive family encounters**
2. Those successes occur across at least **2 different sessions**
3. At least **1** of those successes is either:
   - a `full_success` transfer result on an untaught relative, or
   - an accurate family-connected use in Session 4 or Session 5
4. The latest stored family evidence is not weak or failed

### Important V1 note

“Solid” in V1 means **provisionally solid within this sequence**.
It does **not** mean permanently mastered across time.

---

## 10.4 What counts as fragile in V1

An item is **fragile** if it does **not** meet the solid rule by the end of the sequence.

That includes items that:
- only succeeded on recognition-style tasks
- never reached a successful retrieval or productive use
- were vague or awkward in the final stored response
- were missed in transfer or review and never fully recovered
- have too little evidence across the sequence

### Temporary fragile rule during the sequence

During the sequence, an item is temporarily treated as fragile if:
- it is missed on a transfer or retrieval task
- it enters the Session 5 short review queue
- it is used vaguely or awkwardly in Session 4 before revision

Later stronger evidence can still move the item to solid by the end.

Fragile does **not** mean failure.
It means “carry this forward.”

---

## 10.5 What counts as transfer success

A **`full_success` transfer result** happens when James correctly handles a **related but untaught** word or family application **on the first attempt**, without direct teaching on that exact item.

In V1, that can happen in one of these ways:
- Session 2 untaught-relative inference is correct on the first try
- Session 5 untaught-relative inference is correct on the first try
- Session 4 or Session 5 includes an accurate family-connected stretch use that was not directly taught as the main example

A **recovered transfer** happens when James gets the item right after feedback or retest.
Recovered transfer is stored as useful evidence, but it does **not** count as `full_success`.

This keeps the transfer signal honest.

---

## 10.6 Minimum data saved in V1

V1 saves only the minimum data needed to support sequence progress, solid/fragile status, and later review.

### Sequence-level data
- sequence version / topic id
- current unlocked session
- session completion status
- session timestamps

### Item-level data for the 4 anchor words and 1 core family
- item id
- item type (anchor word or core family)
- encounter log:
  - session
  - task type
  - encounter tier (exposure / active / productive)
  - first-attempt outcome
  - final outcome after feedback/revision
  - timestamp
- whether transfer was attempted
- transfer result (`none` / `full_success` / `recovered` / `failed`)
- final status (solid or fragile)
- review metadata placeholders: `last_reviewed_at`, `due_at`, `next_due_at`

### Useful but still minimal supporting data
- strongest distractor chosen when relevant
- Session 3 micro-use sentence
- Session 4 first draft
- Session 4 final draft
- per-word writing evaluation (correct / vague / awkward / missing)
- Session 5 retest queue outcomes
- one stored “best sentence” for recap if available

### Explicitly not required in V1
- full clickstream analytics
- parent behavior metrics
- fine-grained scroll or dwell tracking
- rich dashboard history
- topic recommendation data

---

## 10.7 Difficulty guardrails for V1

These rules keep the experience buildable and cognitively manageable.

### Reading guardrails
- main text length: **300–450 words**
- exactly **1 functional visual**
- no pop-up glossary during the first read
- no more than the **4 anchor words** plus **2 additional potentially unfamiliar content terms** in the main text
- if the topic seems to need more jargon than that, rewrite the text rather than layering more definitions

### Question guardrails
- Session 1 uses exactly **3 closed-response questions**
- most closed-response prompts use **3 answer choices**
- rank/order prompts may use **4 items max**
- the correct answer must be defensible from the current sequence, not outside trivia
- one distractor should be especially plausible; trick wording is not

### Morphology guardrails
- V1 teaches **1 core family**
- Session 2 builds **3 taught family words**
- Session 2 includes **1 untaught-relative transfer item**
- notice morphemes may appear, but they are not treated as full new mastery targets in V1

### Writing guardrails
- Session 3 micro-use sentence: **15–25 words**
- Session 4 short explanation: **50–80 words**
- Session 4: **3–4 sentences**
- Session 4: **2 required anchor words**
- Session 4: **1 optional family-connected stretch word**
- Session 4 allows **one revision only**

### Wrapper guardrails
- one main task per screen
- no idle animation during reading
- no mascot interruptions during deep reading
- reward should follow effortful thinking, not easy clicking
- James should mainly remember the word, the clue, the family, and the stronger sentence

---

## 10.8 Carry-forward rule in V1

V1 itself contains only one fixed sequence.
So later review is a **stored-data rule**, not an in-product next-week flow.

At the end of V1, the app should be able to say:
- which anchor words are solid
- which anchor words are fragile
- whether the core family is solid or fragile
- whether transfer was full, recovered, or failed
- which items would be best to review next in a later sequence

That is enough for V1.

---

## 11. What is explicitly out of scope for V1

The following are **not** part of the first build:

- topic-card generation
- weekly setup flow
- parent/operator workflow
- parent approval flow
- parent-editable pack fields
- parent dashboard
- dynamic weekly pack generation
- in-product AI authoring
- live web/article ingestion
- pasted school text ingestion in-product
- advanced adaptivity
- speech input and speech scoring
- elaborate gamification systems
- economy systems, streaks, or currencies
- Pip as a persistent in-product guide
- multi-user architecture
- deployment/platform decisions beyond what is needed to prototype

---

## 12. What moves to later

These parts of the older brief are now **later-phase**, not V1:

- topic model built around weekly topic cards
- James + parent + system operator model
- weekly setup flow
- weekly pack schema as a live authoring object
- parent review and approval timing targets
- parent dashboard and reporting
- concierge/Wizard-of-Oz pack generation workflow
- topic-card failure handling
- parent-editable approval details
- adaptive content generation
- broad dashboard visual design
- Pip as a dynamic teaching character
- expanded themed wrapper features
- older-family warm-ups driven by prior real user data
- dynamic Session 5 due-queue balancing across multiple weeks

These are not deleted forever.
They are intentionally postponed so V1 can prove the core learner loop first.

---

## 13. V1 success criteria

V1 is successful if it produces evidence in both learning and product behavior.

### Learning evidence
At minimum, V1 should show that James can:

- complete all 5 sessions
- use at least **2 anchor words correctly** in the final Session 4 submission
- show at least **1 transfer outcome** that the app can classify honestly as full, recovered, or failed
- finish Session 5 with enough evidence for the app to assign **solid or fragile** status to all 4 anchor words and the core family
- leave with at least one visible morphology-family connection, not just isolated word recall

### Product evidence
At minimum, V1 should show that:

- the five-session structure feels coherent
- the wrapper supports attention, connection, and growth over time rather than distracting from it
- the session order makes sense without adult intervention inside the app
- the feedback feels helpful enough to support revision
- the learner-facing status labels feel believable when compared with the actual session evidence
- the concept feels worth expanding into additional topics after the first sequence

### What does **not** count as V1 success
These are not primary V1 proof points:

- number of weeks completed
- confidence surveys
- broad writing-quality improvement claims
- dashboard richness
- parent workflow efficiency
- content-generation speed

---

## 14. Pass 3 decision table

| Question | Recommendation | Alternatives considered | Decision | Why | Build consequence | Status |
|---|---|---|---|---|---|---|
| What counts as an encounter? | Track exposure, active, and productive encounters separately. Only successful active/productive encounters count toward solid status. | Count every appearance as equal; count only scored questions. | Use the 3-tier model. | It prevents fake inflation while still preserving visibility data. | Engineering needs an encounter-tier field on item events. | Lock now |
| What counts as mastery in V1? | Do not claim full mastery. Use provisional **solid** vs **fragile** while storing raw evidence. | Full mastery score; no status at all. | Use solid/fragile only. | One fixed sequence is too small to justify a stronger claim. | UI shows believable status without overpromising. | Lock now |
| What counts as fragile? | Anything that does not meet the solid rule by the end, or is temporarily weak after a miss/review/revision need. | One miss always means fragile forever; fragile only after repeated failure. | Use a recoverable fragile state. | It is strict enough to be honest and flexible enough to reward recovery. | App can mark weak items early, then let later evidence improve status. | Lock now |
| What counts as transfer success? | First-try correct handling of a related but untaught family word/application. Track recovered transfer separately. | Count any eventual correct answer as transfer; only count open response transfer. | Use full vs recovered transfer. | Transfer is a core success signal and should stay honest. | Data model needs a transfer outcome field. | Lock now |
| What exact data must V1 save? | Save session progress, item-level encounter events, transfer outcome, final writing evidence, and final solid/fragile status. | Full clickstream; dashboard-grade analytics. | Save the minimum evidence set only. | It supports later review without bloating the first build. | Simpler backend/event model. | Lock now |
| What are the difficulty guardrails? | Keep text at 300–450 words, cap unfamiliar terms, keep one functional visual, use 3-choice closed-response items, and keep writing short. | Tune difficulty dynamically; allow looser authoring. | Use fixed guardrails. | V1 needs controlled content, not dynamic complexity. | Content authoring and engineering stay stable. | Lock now |
| How visible should the wrapper be? | Session labels + quiet tree-and-growth language + static progress objects only. No Pip in the first coded pass. | Full themed game layer; fully plain utility app. | Use the quiet middle path. | It supports motivation without becoming a second product. | Design can ship light theming without building a mascot system. | Lock now |

---

## 15. Pass 3 delta list

### Keep
- the five-session structure
- the fixed weather sequence
- 4 anchor words + 1 core family
- productive use and transfer as real success signals
- the quiet growth-and-connection theme as a supporting layer

### Change
- replace “mastery” language in V1 with **provisional solid / fragile**
- define encounters as **exposure / active / productive**
- make transfer more explicit with **full vs recovered**
- tighten the wrapper rule so Pip is **out of the first coded pass**

### Delete from V1
- any implication that one sequence can prove permanent mastery
- any plan to count every word appearance as equal evidence
- any requirement for rich analytics, clickstream tracking, or parent-facing reporting
- any expectation that the wrapper will include mascot behavior or economy systems in the first build

### Add
- exact solid rule
- exact fragile rule
- exact transfer rule
- minimum saved-data model
- fixed difficulty guardrails
- Pass 3 decision table
- Pass 3 delta list
