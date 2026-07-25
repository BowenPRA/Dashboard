# Content & Quality Guidelines

Living standards for authoring and grading the app's content, so every unit meets
the same bar regardless of who writes it or when.

These are **guidelines, not code** — they describe the target. Where the code does
not yet match a guideline, that gap is called out in the doc's *Implementation
status* section so it can be closed deliberately.

## Guides

- [question-quality.md](question-quality.md) — writing and grading Short Answer,
  Diagram, and Essay questions. Covers suggested vocabulary, the two-part grading
  model, integrity (anti-cheat) rules, and math-specific quality rules. The
  **Y8 / MATH_1A "parallel lines & angles" unit is the reference exemplar.**

## How to use these

1. Read the relevant guide **before** authoring a new unit or task.
2. Run the authoring checklist at the end of the guide before considering a unit done.
3. If a guideline no longer reflects how we want to work, change the guide first,
   then bring the content/code in line — not the other way around.

## Conventions

- Content lives in `src/data/<TRACK>/<UNIT>/` (`data.js`, `notes.js`, …). The task
  and track registries (`src/tasks/taskRegistry.js`, `src/components/trackRegistry.js`)
  are the single sources of truth for task ids and dbKeys — never hardcode those
  elsewhere.
- Bilingual fields (`vn*`) are required wherever an English field has a learner-facing
  counterpart.
