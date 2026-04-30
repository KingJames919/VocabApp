# James Vocabulary App — V1 Engineering Backlog & Acceptance Tests
## Version 1.0

Date: April 17, 2026

## 1. Purpose

This document turns the locked V1 product brief and implementation spec into an engineering backlog.

It is written for design, engineering, QA, and product working on the first coded pass.

## Post-PASS-5 source-of-truth note

Use latest approved `web-app/app.js` as implementation baseline and current `web-app/content.js` as content baseline. Some backlog wording below reflects earlier implementation planning language, including internal `solid` / `fragile`, `transfer`, `field report`, and `final challenge` labels. Treat those as implementation/planning terms unless the active PRD, implementation spec, product voice rules, or current app baseline says otherwise. Learner-facing Final Recap status is `Steady for now` / `Needs another look`; Session 5 Card 7 currently requires `pressure` plus family-connected `transport`, not `predict`.

V1 remains intentionally narrow:
- one fixed five-session learner sequence
- one hand-authored weather content pack
- typed input only
- immediate feedback after every scored response
- solid/fragile status for 4 anchor words and 1 core morphology family
- quiet tree-and-growth wrapper that supports learning without becoming a second product

## 2. V1 scope guardrails

### In scope
- fixed learner path: Home → Sequence Home → Sessions 1–5 → Final Recap
- fixed content pack: `weather_severe_v1`
- deterministic scoring for closed tasks
- rubric-based evaluator for typed tasks
- encounter tracking
- solid/fragile status calculation
- transfer tracking
- simple progress objects: Word Cards, Family Map preview, final recap

### Explicitly out of scope
- weekly topic setup
- topic cards
- parent/operator workflow
- parent dashboard
- live content generation
- speech input or speech scoring
- advanced adaptivity
- currency, streaks, cosmetics, or base-building game systems
- multi-learner architecture beyond basic run support

## 3. Backlog conventions

### Priority
- **P0**: required for first usable build
- **P1**: required before external testing
- **P2**: polish if time remains

### Estimate
- **XS**: < 0.5 day
- **S**: 0.5–1.5 days
- **M**: 2–4 days
- **L**: 5+ days

### Status labels
- **Build now**: must be done in V1
- **Later**: intentionally deferred

## 4. Epic map

| Epic ID | Epic | Goal | Priority | Depends on |
|---|---|---|---|---|
| EP-00 | Fixed Content Package | Seed the fixed weather sequence and assets in a buildable format. | P0 | None |
| EP-01 | App Shell & Progression | Build the core app routes, locked sequence flow, persistence, and resume logic. | P0 | EP-00 |
| EP-02 | Session 1 — Read & Notice | Implement the full Session 1 flow and deterministic scoring. | P0 | EP-00, EP-01 |
| EP-03 | Session 2 — Build the Word Family | Implement tap-to-build morphology flow and transfer item logic. | P0 | EP-00, EP-01 |
| EP-04 | Session 3 — Choose the Best Word | Implement the fixed 5-prompt precision session and micro-use scoring. | P0 | EP-00, EP-01 |
| EP-05 | Session 4 — Use the Words | Implement typed field report, feedback, model answer, and one-revision flow. | P0 | EP-00, EP-01, EP-07 |
| EP-06 | Session 5 — Review & Recall | Implement the 7-card review session, retest insertion, and final challenge. | P0 | EP-00, EP-01, EP-07 |
| EP-07 | Scoring, Status & Tracking | Implement attempt storage, encounter logic, transfer logic, and solid/fragile calculation. | P0 | EP-00 |
| EP-08 | Recap, Wrapper & QA | Implement final recap, quiet wrapper rules, instrumentation, accessibility, and test coverage. | P1 | EP-01 through EP-07 |

## 5. Recommended build order

### Sprint / Phase 0 — Foundation
- EP-00 Fixed Content Package
- EP-01 App Shell & Progression
- EP-07 core data model and attempt persistence

### Sprint / Phase 1 — Core learner loop I
- EP-02 Session 1
- EP-03 Session 2

### Sprint / Phase 2 — Core learner loop II
- EP-04 Session 3
- EP-05 Session 4

### Sprint / Phase 3 — Review and recap
- EP-06 Session 5
- EP-08 recap and wrapper

### Sprint / Phase 4 — QA hardening
- end-to-end acceptance suite
- evaluator QA pass
- accessibility and responsive pass
- analytics and error logging

## 6. Detailed backlog

## EP-00 — Fixed Content Package

**Goal:** Put the fixed weather sequence into code or seed data so the app renders from one controlled source of truth.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-001 | Seed content pack object | Create `ContentPack` for `weather_severe_v1` with topic, mission question, anchors, family, and session ids. | P0 | S | None | AT-001 |
| ENG-002 | Seed fixed task definitions | Create task definitions for all Session 1–5 tasks, including target item ids and encounter tiers. | P0 | M | ENG-001 | AT-001, AT-004, AT-005, AT-006, AT-007, AT-008 |
| ENG-003 | Add controlled visual asset | Add the functional weather visual and wire it to Session 1. | P0 | S | ENG-001 | AT-004 |
| ENG-004 | Seed fixed evaluator prompts | Define evaluator input/output contracts for Session 3, Session 4, and Session 5 typed tasks. | P0 | S | ENG-002 | AT-006, AT-007, AT-008 |

## EP-01 — App Shell & Progression

**Goal:** Build the route structure, session locking, resume behavior, and basic navigation.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-010 | Create route shell | Implement `/`, `/sequence`, `/session/1` to `/session/5`, and `/recap`. | P0 | S | ENG-001 | AT-002 |
| ENG-011 | Create SequenceRun store | Persist run id, current unlocked session, session statuses, and timestamps. | P0 | M | ENG-001 | AT-002, AT-011 |
| ENG-012 | Implement lock/unlock rules | Enforce ordered sessions and unlock the next session on completion only. | P0 | S | ENG-011 | AT-002, AT-009 |
| ENG-013 | Implement resume behavior | Resume the learner at the last incomplete session without losing saved work. | P0 | M | ENG-011 | AT-011 |
| ENG-014 | Build session wrap and handoff flow | After each session, show wrap state and route cleanly to the next unlocked session. | P1 | S | ENG-012 | AT-009 |

## EP-02 — Session 1: Read & Notice

**Goal:** Implement prior knowledge, first read, second pass with support, and 3 fixed questions.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-020 | Build Session 1 intro and prior knowledge screen | Show mission question, estimated time, self-rating, and one short prior knowledge prompt. | P0 | S | ENG-010, ENG-001 | AT-004 |
| ENG-021 | Build first read state | Render the main text and visual together with no inline supports. | P0 | M | ENG-003, ENG-020 | AT-004 |
| ENG-022 | Build second-pass support state | Render highlights, right-side support panel, core family clue, and notice morphemes. | P0 | M | ENG-021 | AT-004 |
| ENG-023 | Implement Session 1 question cards and deterministic scoring | Render 3 fixed question cards and score them deterministically. | P0 | M | ENG-002, ENG-022, ENG-070 | AT-004 |
| ENG-024 | Log exposure encounters in Session 1 | Credit exposure for the 4 anchor words and core family during second pass only. | P0 | S | ENG-022, ENG-070 | AT-004, AT-012 |

## EP-03 — Session 2: Build the Word Family

**Goal:** Implement tap-to-build family work, meaning checks, and the untaught-relative transfer item.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-030 | Build current-family preview screen | Show the Session 2 opener with the anchor connection and family clue. | P0 | S | ENG-010, ENG-001 | AT-005 |
| ENG-031 | Implement tap-to-build rounds | Build 3 tap/click family construction rounds using fixed morpheme parts. | P0 | M | ENG-030, ENG-002 | AT-005 |
| ENG-032 | Implement meaning checks | Add deterministic meaning checks after each build round. | P0 | S | ENG-031 | AT-005 |
| ENG-033 | Implement untaught-relative transfer item | Add the final transfer item and record first vs final result. | P0 | M | ENG-031, ENG-070 | AT-005, AT-013 |
| ENG-034 | Credit family and transport encounters | Count successful family work as active family encounters and successful `transport` rounds toward the anchor word. | P0 | S | ENG-031, ENG-032, ENG-071 | AT-005, AT-012 |

## EP-04 — Session 3: Choose the Best Word

**Goal:** Implement the exact 5-prompt session and one typed micro-use task.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-040 | Build Session 3 prompt shell | Build a reusable shell for fixed prompt cards with feedback and next-state handling. | P0 | M | ENG-010 | AT-006 |
| ENG-041 | Implement prompts 1–4 | Implement best-fit, same-word-new-context, rank/order, and morphology-linked prompts with deterministic scoring. | P0 | M | ENG-040, ENG-002 | AT-006 |
| ENG-042 | Implement micro-use input guardrails | Require one typed sentence and enforce 15–25 word bounds with one correction prompt. | P0 | S | ENG-040 | AT-006 |
| ENG-043 | Integrate Session 3 evaluator | Send the micro-use submission through the evaluator contract and store structured results. | P0 | M | ENG-004, ENG-042, ENG-070 | AT-006, AT-014 |
| ENG-044 | Store distractor selections | Capture which distractor was selected for prompts with choices. | P1 | XS | ENG-041, ENG-070 | AT-006 |

## EP-05 — Session 4: Use the Words

**Goal:** Implement typed field report, automated feedback, model answer, and one revision chance.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-050 | Build Session 4 composition screen | Create the fixed field-report screen with prompt, optional sentence frames, and required-word reminder. | P0 | M | ENG-010, ENG-002 | AT-007 |
| ENG-051 | Integrate writing evaluator | Evaluate draft 1 and draft 2 using the fixed rubric output schema. | P0 | M | ENG-004, ENG-050, ENG-070 | AT-007, AT-014 |
| ENG-052 | Implement feedback and model-answer timing | Show feedback after draft 1, then reveal the model answer, then offer one revision. | P0 | M | ENG-051 | AT-007 |
| ENG-053 | Implement one-revision flow and keep-best-draft rule | Allow one revision only and keep the stronger draft as the final stored draft. | P0 | M | ENG-051, ENG-052 | AT-007, AT-015 |
| ENG-054 | Credit productive encounters from final draft | Credit correct required-word use and accurate family-connected use from the final kept draft only. | P0 | S | ENG-053, ENG-071 | AT-007, AT-012 |

## EP-06 — Session 5: Review & Recall

**Goal:** Implement the fixed 7-card review deck, max-2 retests, and final productive challenge.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-060 | Build fixed 7-card base deck renderer | Render the fixed card sequence and support mixed card types. | P0 | M | ENG-010, ENG-002 | AT-008 |
| ENG-061 | Implement retest queue logic | After misses on cards 1–6, enqueue up to 2 retests before card 7. | P0 | M | ENG-060, ENG-070 | AT-008, AT-016 |
| ENG-062 | Implement final challenge evaluator | Score card 7 using the typed-response evaluator contract and store productive results. | P0 | M | ENG-004, ENG-060, ENG-070 | AT-008, AT-014 |
| ENG-063 | Apply same-session retest rules | Retest after two intervening cards when possible and never spawn new retests from retests or card 7. | P0 | S | ENG-061 | AT-008, AT-016 |
| ENG-064 | Hand off to recap | Mark sequence complete and route to final recap after Session 5. | P0 | S | ENG-060, ENG-073 | AT-008, AT-010 |

## EP-07 — Scoring, Status & Tracking

**Goal:** Implement the shared data model, encounter logic, transfer logic, and final status calculations.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-070 | Persist AttemptRecord objects | Store all closed and typed attempts with first and final results. | P0 | M | ENG-001, ENG-002 | AT-003, AT-012 |
| ENG-071 | Implement encounter calculator | Convert attempts into exposure, active, and productive evidence for target items. | P0 | M | ENG-070 | AT-012 |
| ENG-072 | Implement transfer classifier | Compute `full_success`, `recovered`, `failed`, or `none` for family transfer attempts. | P0 | S | ENG-070 | AT-013 |
| ENG-073 | Implement solid/fragile calculator | Compute final status for the 4 anchor words and core family using the locked V1 rules. | P0 | M | ENG-071, ENG-072 | AT-010, AT-012 |
| ENG-074 | Create recap data composer | Assemble recap-ready data: statuses, transfer summary, best sentence, and review-next message. | P0 | S | ENG-073 | AT-010 |

## EP-08 — Recap, Wrapper & QA

**Goal:** Finish the learner experience, keep the wrapper quiet, and harden the build.

| Ticket ID | Title | Summary | Priority | Estimate | Depends on | Acceptance Tests |
|---|---|---|---|---|---|---|
| ENG-080 | Build final recap screen | Show all 4 anchor words, the family, transfer summary, and one best sentence. | P0 | M | ENG-074, ENG-064 | AT-010 |
| ENG-081 | Implement quiet wrapper elements | Add plain session labels, calm subtitles, Word Card progress, and Family Map preview at wraps only. | P1 | M | ENG-014, ENG-080 | AT-017 |
| ENG-082 | Add analytics and error logging | Track session completion, evaluator failures, empty submissions, and resume events. | P1 | S | ENG-011, ENG-070 | AT-018 |
| ENG-083 | Build accessibility and responsive baseline | Keyboard support, readable focus order, contrast checks, and tablet-friendly layout. | P1 | M | ENG-010 through ENG-080 | AT-019 |
| ENG-084 | Create end-to-end regression suite | Automate the main learner path, retest cases, revision flow, and recap logic. | P1 | L | All P0 tickets | AT-020 |
| ENG-085 | Review exploratory Homepage V2 | Compare `#/home-v2` against the default homepage, confirm whether the variant better expresses momentum and current position, and QA the alternate path layout at narrower widths before any adoption decision. | P2 | S | ENG-010, ENG-083 | Later |

## 7. Acceptance tests

These are product-level acceptance tests. Teams can split them into unit, integration, and end-to-end layers.

### AT-001 — Fixed content package loads
**Given** the app is deployed with seed content  
**When** the content layer requests `weather_severe_v1`  
**Then** the app returns the fixed topic title, mission question, anchor words, core family, notice morphemes, and session definitions without using live generation.

### AT-002 — Ordered route progression works
**Given** a new sequence run  
**When** the learner opens `/sequence`  
**Then** Session 1 is unlocked and Sessions 2–5 are locked.  
**And when** Session 1 is completed  
**Then** Session 2 unlocks.

### AT-003 — Attempt persistence works across all response types
**Given** the learner submits closed and typed responses  
**When** attempts are stored  
**Then** each attempt includes run id, session number, task id, target item ids, first result, final result, and timestamp.

### AT-004 — Session 1 full flow works
**Given** the learner starts Session 1  
**When** the learner completes prior knowledge, first read, second pass, and 3 questions  
**Then** the session completes.  
**And** the second pass shows highlights, 4 short clues, the core family clue, and 2 notice morphemes.  
**And** exposures are logged only during the second pass.

### AT-005 — Session 2 family build works
**Given** the learner starts Session 2  
**When** the learner completes 3 tap-to-build rounds, meaning checks, and the untaught-relative item  
**Then** the session completes.  
**And** successful family work creates active family encounters.  
**And** successful `transport` work also counts toward the anchor word.

### AT-006 — Session 3 prompt sequence works
**Given** the learner starts Session 3  
**When** the learner progresses through the prompts  
**Then** the prompts appear in this exact order: best-fit, same word new context, rank/order, morphology-linked, micro-use sentence.  
**And** only the micro-use task requires typed input.

### AT-007 — Session 4 writing and revision flow works
**Given** the learner starts Session 4  
**When** draft 1 is submitted  
**Then** evaluator feedback appears immediately.  
**And** the model answer appears only after feedback.  
**And** the learner gets exactly one revision chance.  
**And** the stronger draft is stored as final.

### AT-008 — Session 5 review and retest flow works
**Given** the learner starts Session 5  
**When** the learner misses eligible cards  
**Then** the system inserts no more than 2 retests before the final challenge.  
**And** retests never appear back-to-back with the source card when avoidable.  
**And** the final challenge never spawns a retest.

### AT-009 — Progression is never blocked by errors
**Given** the learner performs poorly in any session  
**When** the learner finishes the required tasks for that session  
**Then** the next session still unlocks.  
**And** fragile evidence is carried in status data rather than used as a blocker.

### AT-010 — Final recap is correct
**Given** the learner finishes Session 5  
**When** the recap screen loads  
**Then** it shows all 4 anchor words with solid or fragile status, the core family with solid or fragile status, a transfer summary, one best sentence if available, and one short review-next message.

### AT-011 — Resume behavior preserves learner state
**Given** the learner exits mid-session  
**When** the learner returns  
**Then** the run resumes at the last incomplete session.  
**And** saved responses already submitted remain intact.

### AT-012 — Encounter and status logic is correct
**Given** a completed run with mixed outcomes  
**When** status is computed  
**Then** exposure alone never makes an item solid.  
**And** only successful active or productive evidence counts toward solid.  
**And** final status follows the locked V1 algorithm.

### AT-013 — Transfer classification is correct
**Given** the Session 2 or Session 5 transfer item  
**When** the learner is correct on first try  
**Then** transfer is `full_success`.  
**When** the learner is wrong first and correct on retest  
**Then** transfer is `recovered`.  
**When** the learner remains wrong  
**Then** transfer is `failed`.

### AT-014 — Typed evaluator contract is stable
**Given** a typed task in Session 3, Session 4, or Session 5  
**When** the evaluator returns a result  
**Then** it returns only the allowed schema fields and labels.  
**And** the UI can render feedback without free-form parsing.

### AT-015 — Keep-best-draft rule works
**Given** draft 1 and draft 2 both exist in Session 4  
**When** draft 2 scores weaker than draft 1  
**Then** draft 1 remains the final kept draft.  
**And** draft 2 is still stored for audit/debugging.

### AT-016 — Retest cap is enforced
**Given** the learner misses more than 2 eligible cards in Session 5  
**When** the review queue is constructed  
**Then** only 2 retests are inserted in V1.  
**And** later misses remain visible in results but do not create extra same-session drilling.

### AT-017 — Wrapper stays quiet
**Given** the learner moves through the sequence  
**When** screens render  
**Then** plain session titles are always visible.  
**And** optional subtitles remain brief.  
**And** the wrapper continues to read as one connected learning path rather than a separate themed layer.  
**And** no coins, streak counters, persistent mascot interruptions, or idle reading animations appear.

### AT-018 — Analytics and error events are emitted
**Given** the learner completes or abandons major actions  
**When** those actions occur  
**Then** the system logs session starts, session completions, resume events, evaluator failures, and recap completion.

### AT-019 — Accessibility baseline holds
**Given** the learner uses keyboard-only navigation or a tablet-sized screen  
**When** the learner moves through the app  
**Then** focus order remains usable, contrast remains readable, and main tasks remain accessible without hover-only affordances.

### AT-020 — End-to-end regression suite passes
**Given** the build pipeline runs the V1 regression suite  
**When** core learner flows execute  
**Then** Session 1–5, the writing revision flow, Session 5 retest rules, and final recap all pass without breaking progression.

## 8. Definition of done for V1

V1 is ready for learner testing when all are true:
- all P0 tickets are complete
- AT-001 through AT-017 pass
- no session can block forward progress because of errors
- final recap statuses match the locked status algorithm in test fixtures
- typed evaluator failures fail safely and do not crash the learner flow
- the wrapper remains calm and subordinate to the learning tasks

## 9. Questions intentionally parked for later

Do not reopen these during V1 build unless a blocker appears:
- weekly topic selection
- topic-card generation
- parent approval flow
- parent dashboard
- live content generation inside the product
- speech input or speech scoring
- adaptive difficulty tuning
- elaborate game economy or collectible expansion
- multi-user / classroom features
- deployment architecture beyond what V1 needs
