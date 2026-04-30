# James Vocabulary App V1 - Current Source of Truth

## Current Baseline

- Latest approved `web-app/app.js` is the implementation baseline.
- Current `web-app/content.js` is the active V1 content package.
- `VocabApp_PRD.md` is the active PRD.
- `james_vocabulary_app_v1_implementation_spec.md` defines the data model, evaluator schema, status logic, and build rules.
- `docs/product_voice_and_copy_rules.md` defines learner-facing language.
- `progress_doctrine.md` defines progress direction.
- `pass_roadmap_overview.txt` tracks pass status.

## Current Pass Status

- PASS 1 is locked.
- PASS 2 is locked.
- PASS 3 is locked.
- PASS 4 is locked.
- PASS 4.5 is locked as progress direction.
- PASS 5 is locked.
- PASS 6 is active.
- PASS 7 and PASS 8 are future.

## Product Status

- V1 is one fixed five-session learner sequence.
- Homepage V1 is canonical.
- Homepage V2 has been removed from the active app.
- No points, badges, streaks, or game rewards.
- Internal status values remain technical.
- Learner-facing Final Recap status uses `Steady for now` and `Needs another look`.
- Learner-facing copy should use `related word` or `new related word` instead of exposing transfer-state language.

## Historical Files

- Older product briefs, old pass docs, duplicate text notes, stale handoff notes, and older app.js copies are historical only.
- Do not use historical files as implementation baseline unless explicitly instructed.
- If app/spec/doc mismatch appears, classify it before changing anything:
  - product drift
  - documentation drift
  - content metadata cleanup
  - intentionally parked work

## Parked Drift

- Current `web-app/content.js` uses a shorter-than-spec main text; passage expansion remains parked for later PM/content decision.
- Current `web-app/content.js` uses `visualNotes`; controlled functional visual asset work remains parked for later PM/content/UI decision.
- Anchor-word `sessions` metadata semantics are not yet fully defined; content metadata cleanup is parked.
- Session 5 distractor polish is parked for content QA.
- Homepage V2 has been removed from the active app; older notes about it are historical only.
- Future spaced-review metadata can remain future-proof; V1 does not measure delayed retention.
