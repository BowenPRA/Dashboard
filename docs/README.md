# Content & Quality Guidelines

Living standards for authoring and grading the app's content, so every unit meets
the same bar regardless of who writes it or when.

These are **guidelines, not code** — they describe the target. Where the code does
not yet match a guideline, that gap is called out in the doc's *Implementation
status* section so it can be closed deliberately.

## Guides

### ⭐ Start here — the active plan

- **[GED-SPRINT.md](GED-SPRINT.md)** — the operating doc for the 6-week GED sprint. The
  situation, the unit shape, the structural changes, the day-by-day module grid, and the
  build order. **If any other doc disagrees with it, it wins.**

### The standard (read first)

- [lesson-standard.md](lesson-standard.md) — **the bar every projected lesson is held to.**
  The seven principles, the spine of a lesson, house style, build order and definition of
  done, distilled from the Science 1.1 / 1.2 and Math 1.1 decks in the sibling `lessons`
  repo. This is the *method*; the per-artefact guides below are the *reference*.
- [lesson-renderer-gap.md](lesson-renderer-gap.md) — what `Notes.jsx` cannot yet render
  that the standard asks for, ranked, with the suggested waves of work.
- [ged-sprint-plan.md](ged-sprint-plan.md) — **the 4–6 week run-up to the test.** What the
  four GED tests actually weight, the full module map per track (including what to reskin
  from Y7–Y9), the ten units to build if only ten get built, the daily 3-hour shape, and
  the test-booking order. Start here when the question is "what do we do next week".
- [ged-unit-shape.md](ged-unit-shape.md) — which tasks a GED unit carries, in which phase,
  per track. What each of the twelve tasks is actually worth on the test, what to cut, and
  the migration checklist for the nine existing GED units.
- [independent-learning.md](independent-learning.md) — **what the app must replace now that
  there is no teacher in the room.** Pacing, checking and retrieval; the GED readiness gap;
  and the seven principles for a solo ESL learner. Read alongside the standard: that one is
  the bar for the teaching, this one for everything around it.

### Year 7 Cambridge Math (new)

- [y7-math-course.md](y7-math-course.md) — **start here.** The course spine: how a
  Cambridge section maps to an app unit, the 10-unit course map, one-time setup
  (`Y7_MATH` track, `WORKBOOK` component, lesson warm-up), and the per-section
  build loop.
- [math-lessons.md](math-lessons.md) — the projected TV lesson (`notes.js`): the
  title/warm-up/concept/summary shape, slide schema, discussion & activities,
  concision rules, bilingual, and the small `Notes.jsx` additions needed.
- [workbook-tasks.md](workbook-tasks.md) — the reveal-solution practice task
  (`workbook.js`): tiered questions, stepped solutions, the UX spec, and the
  `Workbook.jsx` component to build.
- [math-widgets.md](math-widgets.md) — interactive math widgets: the two attach
  mechanisms, the house style, a generic Y7 widget catalog, and the widget-system pass.
- [lesson-plans.md](lesson-plans.md) — the one-page teacher lesson plan and its template.

### IGCSE Additional Mathematics (new)

- [add-math-course.md](add-math-course.md) — **start here** for the `ADD_MATH` track
  (Cambridge 0606): the English-only rule and the enrolment gotcha, the three-gate unit
  shape, why each coursebook exercise becomes its own task, how to author a `POLY_DIV`
  long-division item, which note fields accept block maths, and the per-unit checklist.
  The **`AM_3A` polynomials unit is the reference exemplar.**

### Content quality (all tracks)

- [question-quality.md](question-quality.md) — writing and grading Short Answer,
  Diagram, and Essay questions. Covers suggested vocabulary, the two-part grading
  model, integrity (anti-cheat) rules, and math-specific quality rules. The
  **Y8 / MATH_1A "parallel lines & angles" unit is the reference exemplar.**
- [svg-diagrams.md](svg-diagrams.md) — the look-and-feel standard for inline SVG
  teaching diagrams: layout, palette, typography, the `npm run audit:svg` text-fit
  rule, and subject-specific notes (math, history, science, ELA). The **GED_MATH /
  MATH_1A `NOTES_ANATOMY` (coefficient) diagram is the reference exemplar.**
- [imagery-sourcing.md](imagery-sourcing.md) — when to use a real image over an SVG,
  and how to source **public-domain** photos, political cartoons, and documents
  (licensing rules, reputable sources, attribution, file placement) — geared toward
  history.
- [ged-english-lessons.md](ged-english-lessons.md) — how to build the GED English
  (RLA) track for an ESL learner: what the test assesses, bite-size design principles,
  the activity toolkit, the 60-minute essay standard, and the **10-lesson blueprint**.

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
