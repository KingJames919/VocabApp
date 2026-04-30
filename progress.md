# James Vocabulary App — Progress Notes

## 2026-04-29 — Session intro design update completed

### Cleanup performed
- Updated the shared session opening layout treatment so Sessions 1-5 align more closely with the approved Session 1 intro mock-up and Homepage V1 visual direction.
- Refined the non-home product header rhythm, session hero card, session path card, progress card, step chips, progress list markers, and bottom action area.
- Hid the debug `Unlock All` and `Reset Run` controls from the product header while leaving app behavior and storage logic unchanged.
- Confirmed the previously requested Homepage V1 word-map label spacing and neutral CTA hover polish remain in place.

### Screens updated
- Session 1 intro/opening structure
- Session 2 opening structure
- Session 3 opening structure
- Session 4 opening structure
- Session 5 opening structure

### Files changed
- `web-app/styles.css`
- `progress.md`

### Test results
- Ran `node --check web-app/app.js`.
- Ran `node tests/app.behavior.test.js`.
- Result: 11 passing tests, 0 failing tests.

### Visual QA
- Inspected `#/`.
- Inspected `#/session/1`.
- Inspected `#/session/2`.
- Inspected `#/session/3`.
- Inspected `#/session/4`.
- Inspected `#/session/5`.

### Remaining design caveats
- The app keeps the existing session markup and state machines. This pass gives all session opening screens the same surface system, but deeper activity states may still need targeted mock-ups before a final polish pass.
- The shared header keeps Today / Play / Archive visible; deeper navigation behavior was not changed in this pass.

## 2026-04-29 — MVP visual alignment sweep completed

### Cleanup performed
- Added a scoped visual alignment layer so Sequence, Sessions 1-5, wrap states, and Final Recap share the approved Homepage V1 surface language: softer cards, consistent rounded controls, calmer chips/pills, and matching button hierarchy.
- Kept the pass CSS-led; no session progression, scoring, evaluator, recap, persistence, or content behavior changed.
- Removed the exploratory Homepage V2 route/function and its CSS after approval. The active app now falls back from `#/home-v2` to canonical Homepage V1.
- Updated `README.md` so the current source-of-truth note no longer says Homepage V2 is active or exploratory.

### Files changed
- `web-app/app.js`
- `web-app/styles.css`
- `README.md`
- `progress.md`

### Test results
- Ran `node --check web-app/app.js`.
- Ran `node tests/app.behavior.test.js`.
- Result: 11 passing tests, 0 failing tests.

### Screens inspected
- `#/`
- `#/sequence`
- `#/session/1`
- `#/session/2`
- `#/session/3`
- `#/session/4`
- `#/session/5`
- `#/recap`
- `#/home-v2` fallback to `#/`

### Remaining design caveats / recommended next review targets
- The shared non-home topbar still uses the legacy compact `JamesApp` treatment. It is visually calmer now, but a full header mock-up would help decide whether it should match Homepage V1 more directly.
- Deep task states such as completed feedback, evaluation-heavy writing screens, and review results inherit the new surface system, but may still benefit from targeted mock-ups if precision polish is needed.
- Mobile/narrow behavior now has safer stacking and wrapping rules; final human QA on target device widths is still recommended.

## 2026-04-29 — Homepage V1 visual polish

### Cleanup performed
- Aligned the bottom “Start here” vertical path marker more closely with the five-session list rows.
- Reduced the “Read. Connect. Choose. Use. Review.” headline scale so it no longer dominates the bottom section.
- Constrained Today’s Words chips to stay on one row at desktop width when practical.
- Reverted the temporary `web-app/index.html` cache-busting query strings for `styles.css` and `app.js`; they were useful for forcing an in-app browser refresh during QA but are not necessary for the product files.

### Files changed
- `web-app/styles.css`
- `web-app/index.html`
- `progress.md`

### Test result
- Ran `node --check web-app/app.js`.
- Ran `node tests/app.behavior.test.js`.
- Result: 11 passing tests, 0 failing tests.

### Caveat
- No homepage copy, session behavior, scoring, evaluators, recap, persistence, or content logic changed.

## 2026-04-29 — Homepage V1 redesign completed

### Cleanup performed
- Rebuilt canonical Homepage V1 at `#/` using the approved reconciled homepage copy.
- Added a homepage-only visual layout inspired by the supplied mock-up: hero, word/idea map, summary card, concept cards, and five-step path section.
- Kept Homepage V2 exploratory and unchanged.
- Did not change session logic, scoring, evaluators, recap logic, persistence, content behavior, or learner-facing copy outside Homepage V1.

### Files changed
- `web-app/app.js`
- `web-app/styles.css`
- `web-app/index.html`
- `progress.md`

### Test result
- Ran `node tests/app.behavior.test.js`.
- Result: 11 passing tests, 0 failing tests.

### Visual QA
- Inspected Homepage V1 in the in-app browser.
- Confirmed `View the five sessions` navigates to the existing sequence/session list.
- Confirmed the primary CTA remains wired to the existing start/resume behavior.
- Added cache-busting query strings for `styles.css` and `app.js` so the in-app browser loads the redesigned homepage.
- Caveat: Narrow-width responsive behavior was handled with scoped homepage CSS, but should still get a final human visual pass on the target device widths.

### Recommended next step
- Review Homepage V1 visually against the mock-up and approved copy. If approved, keep Phase 2/PASS 7 separate and do not widen this homepage pass.

## 2026-04-28 — Phase 1 cleanup complete

### Cleanup performed
- Updated `tests/app.behavior.test.js` so the recovered Session 5 related-word test still verifies internal `recovered` behavior while expecting the current approved learner-facing summary: `You used port = carry to understand portable after a second look.`
- Added a small implementation-spec clarification that Final Recap may surface knowledge-target / understanding-progress status when evidence is available.
- No Phase 2, PASS 7, feature work, app behavior, scoring, evaluator schema, or learner-facing app copy was changed.

### Test result
- Ran `node tests/app.behavior.test.js`.
- Result: 11 passing tests, 0 failing tests.

### Phase 1 status
- Phase 1 is now fully clean.

### Recommended next step for Phase 2
- Begin Phase 2 only after approval, with a scoped decision on the parked content/source-of-truth items: main text length, functional visual asset, `content.js` metadata semantics, and Session 5 distractor polish.

## 2026-04-28 — Phase 1: Lock The Baseline

### Current directory confirmed
- Work was performed inside `/Users/bridgetharrington/Projects/VocabApp/VocabApp_V1_1`.
- This is the intended VocabApp project folder for this baseline pass.

### Files reviewed
- `README.md`
- `progress.md`
- `pass_roadmap_overview.txt`
- `VocabApp_PRD.md`
- `james_vocabulary_app_v1_implementation_spec.md`
- `docs/product_voice_and_copy_rules.md`
- `progress_doctrine.md`
- `web-app/app.js`
- `web-app/content.js`

### Confirmed active source of truth
- `README.md` is the current source-of-truth index.
- `progress.md` is the active progress and handoff log.
- `pass_roadmap_overview.txt` is the active pass-status summary.
- `VocabApp_PRD.md` is the active PRD.
- `james_vocabulary_app_v1_implementation_spec.md` is the active implementation spec.
- `docs/product_voice_and_copy_rules.md` is the active learner-facing copy standard.
- `progress_doctrine.md` is the active progress-direction doctrine.
- `web-app/app.js` is the active implementation baseline.
- `web-app/content.js` is the active V1 content package.

### Historical or parked material confirmed
- Older product briefs, old pass docs, duplicate text notes, stale handoff notes, and older `app.js` copies remain historical only.
- The 2026-04-20 progress entry is historical context; its older project-folder path does not override the current confirmed folder.
- Homepage V2 at `#/home-v2` remains exploratory only. Homepage V1 at `#/` remains canonical.
- PASS 7 and PASS 8 remain future. Phase 1 did not begin PASS 7 or add new feature work.

### Mismatches found and classification
- Intentionally parked work: `web-app/content.js` uses a shorter-than-spec main passage. Passage expansion remains parked for later PM/content decision.
- Intentionally parked work: `web-app/content.js` uses `visualNotes` instead of a controlled `visual_asset`. Functional visual asset work remains parked for later PM/content/UI decision.
- Content metadata cleanup: `anchorWords[].sessions` in `web-app/content.js` does not yet consistently reflect actual required use across implemented sessions, such as `pressure` being required in Session 4 while its metadata lists Sessions 1, 3, and 5. The exact semantics of this field remain parked.
- Documentation drift: the implementation now includes knowledge-target statuses and a learned-weather summary in Final Recap. This is aligned with `progress_doctrine.md`, but it is more explicit than the recap acceptance list in the implementation spec.
- Documentation/test drift: `tests/app.behavior.test.js` still expects older transfer-state wording for a recovered Session 5 related-word result, while `web-app/app.js` uses learner-facing related-word language consistent with the current copy rules.
- Intentionally parked work: Session 5 distractor polish remains parked for content QA.

### Verification
- Ran `node tests/app.behavior.test.js`.
- Result: 10 passing tests, 1 failing test.
- Failing test: `session 5 transfer miss then successful retest records recovered, not full success`.
- Failure appears to be stale expected copy, not a baseline product behavior change: expected older transfer-state wording, actual copy says `You used port = carry to understand portable after a second look.`

### Recommended next step
- Before Phase 2, approve the baseline classifications above.
- Then make a small cleanup pass to align the stale behavior test expectation with current learner-facing copy and, if desired, add one spec note that Final Recap may surface knowledge-target status as part of understanding progress.

## 2026-04-27 — PASS 6 documentation/source-of-truth note

### Current source of truth
- Latest approved `web-app/app.js` is the implementation baseline after PASS 5.
- Current `web-app/content.js` is the active V1 content package.
- Homepage V1 is canonical.
- Homepage V2 is exploratory only.
- Older product briefs, old pass docs, duplicate text notes, stale handoff notes, and older app.js copies are historical only. They should not guide future implementation unless explicitly requested.

### Pass roadmap status
- PASS 1 locked
- PASS 2 locked
- PASS 3 locked
- PASS 4 locked
- PASS 4.5 locked as progress direction
- PASS 5 locked
- PASS 6 active
- PASS 7 future
- PASS 8 future

### Immediate next step
Immediate next step after PASS 6 approval: complete scoped documentation cleanup and confirm the active source-of-truth set. Do not begin PASS 7 until documentation/source-of-truth cleanup is approved.

### Parked issues
- Main text expansion remains parked for PM/content decision.
- Functional visual asset work remains parked for PM/content/UI decision.
- `content.js` metadata semantics remain parked until PM defines appears/supports/targeted/required meanings.
- Session 5 distractor polish remains parked for content QA.
- Homepage V2 remains exploratory only.
- V1 does not measure delayed retention; future spaced-review metadata remains future-proof.

## 2026-04-20 — End-of-session handoff

### Current state
- The V1 prototype remains a local plain-JS `file://` web app in `web-app/` with the existing routes for home, sequence, sessions 1 to 5, and recap.
- The current default homepage at `#/` is preserved.
- An exploratory alternate homepage is now available at `#/home-v2` for side-by-side review without changing the default route or session flow.
- The content model still uses `web-app/content.js` as the single source of truth, with knowledge targets and task-level target linkage already in place from prior work.
- The evaluator and recap logic remain in their current rule-based state from the previous session; this handoff did not change any app logic.

### Completed this session
- Confirmed the project folder for app work is `/Users/bridgetharrington/Projects/VocabApp_V1`.
- Added a separate Homepage V2 route for exploration only, with a stronger spine-and-node path visualization to express momentum, current position, and what comes next.
- Kept the original homepage intact and unchanged as the default learner entry point.
- Kept the Homepage V2 copy closely aligned to the approved homepage copy, with only one added supporting path note inside the V2 variant.

### Open issues
- Homepage V2 has not yet had a formal side-by-side product review against the default homepage.
- Homepage V2 still needs browser QA at smaller desktop widths and mobile-like widths to confirm spacing and wrapping in the new path block.
- The app folder is not a Git repository, so change history is being tracked through local docs rather than Git metadata.

### Risks / watchouts
- The exploratory homepage route should remain clearly separate until there is an explicit decision to adopt, revise, or discard it.
- The landing-page copy across the default homepage and Homepage V2 is now intentionally similar; future edits should avoid accidental drift between the two variants.
- The app still depends on local `file://` loading order, so `index.html` must continue loading `content.js` before `app.js`.

### Next recommended step
- Review `#/home-v2` against the current `#/` homepage in-browser, then decide whether to iterate on the exploratory variant, keep it as a reference, or discard it before any further homepage changes.
