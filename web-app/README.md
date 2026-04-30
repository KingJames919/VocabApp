# James Vocabulary App Prototype

## Current Source of Truth

Use the repo-level `../README.md` first. Latest approved `web-app/app.js` is the implementation baseline, and current `web-app/content.js` is the active V1 content package.

This file includes earlier prototype notes. Treat older build-order notes below as historical unless a current pass explicitly reactivates them.

## Patch Notes

- `content.js` is now the single source of truth for the fixed V1 content pack.
- `app.js` consumes the shared content pack instead of owning a duplicate copy.
- The content model now includes explicit `knowledgeTargets`.
- Tasks now include `contentTargetIds` metadata for future knowledge-linked review/reporting.
- Run state now reserves `last_reviewed_at`, `due_at`, and `next_due_at` fields for future review scheduling.

This folder is a lightweight starting point for the V1 web app described in the product brief, implementation spec, and engineering backlog.

## What is here

- `index.html`: single-page shell that loads `content.js` before `app.js`
- `app.js`: hash-router, sequence progression, local persistence, recap logic, and session flows
- `content.js`: single shared content pack for `weather_severe_v1`
- `styles.css`: first visual pass for a calm, content-first learner experience

## Why start this way

Your notes define a narrow V1 very clearly:

- one fixed sequence
- five ordered sessions
- one hand-authored topic pack
- persistence and resume
- recap built from stored evidence

That means we do not need a full platform architecture on day one. A small prototype lets us prove:

- the learner flow
- the screen hierarchy
- the persistence model
- the shape of the content objects

## Historical build notes

Sessions 1-5, deterministic scoring, typed evaluators, status logic, and Final Recap are implemented in the approved `app.js` baseline after PASS 5. Do not use the older build-order checklist as current work direction.

## How to preview it

Open `index.html` in a browser, or serve the folder locally with a static server.

## Coaching note

Future work should follow the active source-of-truth set in the repo-level README and the current pass roadmap.
