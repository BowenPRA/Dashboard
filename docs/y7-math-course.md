# Year 7 Cambridge Mathematics — Course Spine

The master plan for building the Year 7 Cambridge Math track. Read this first; it
says **what** we are building and how the pieces fit. The **how-to** for each piece
lives in its own guide:

- [math-lessons.md](math-lessons.md) — the projected TV lesson (the `Notes` deck):
  title slide, warm-up, concept slides, discussion, activities, widgets.
- [workbook-tasks.md](workbook-tasks.md) — the reveal-solution practice task built
  from a workbook exercise page.
- [lesson-plans.md](lesson-plans.md) — the one-page teacher lesson plan we output
  alongside each lesson.
- [math-widgets.md](math-widgets.md) — the interactive math widgets embedded in
  lessons and the generic widget system.
- [question-quality.md](question-quality.md) / [svg-diagrams.md](svg-diagrams.md) —
  the existing quality bars for graded questions and inline diagrams. They still apply.

The reference exemplar for *shape and polish* is the Y8 unit
[`src/data/Y8/MATH_1A/`](../src/data/Y8/MATH_1A/) — copy its structure, hold Year 7
to the same bar.

---

## 1. The unit = one Cambridge section

We map **one numbered section (1.1, 1.2, …) to one app "unit"** — the card that
holds the day's `Notes` lesson and its `Workbook` practice. This keeps each lesson
short enough to project in a single class and gives every section its own practice.

- **Track:** `Y7_MATH` (new — see §4). Next term's science becomes `Y7_SCI`, kept
  separate so the two never collide.
- **Unit id / folder:** zero-padded `U<unit>_<section>`, so units sort in book order.
  Section 1.1 → `U01_1`, section 10.2 → `U10_2`. The human name lives in `meta.title`.
- **Location:** `src/data/Y7_MATH/U01_1/` … one folder per section.

```
src/data/Y7_MATH/
  U01_1/            ← 1.1 Adding and subtracting integers
    data.js         ← meta + phases + realWords (key words) + graded questions
    notes.js        ← the projected lesson (see math-lessons.md)
    workbook.js     ← the reveal-solution practice (see workbook-tasks.md)
    diagrams.js     ← inline SVGs used by notes/workbook (see svg-diagrams.md)
    widgets.jsx     ← unit-specific interactive widgets (optional)
  U01_2/            ← 1.2 Multiplying and dividing integers
  …
```

Every unit **must** declare `meta.track: "Y7_MATH"` and a `phases` array, or it will
not appear (see [src/data/index.js](../src/data/index.js)). Units are auto-discovered
by that glob — no central list to edit.

---

## 2. What we produce for each section

For a section, working from its workbook page(s) in `public/Workbook pages/`:

| Deliverable | File | Guide | Audience |
|---|---|---|---|
| **Lesson** (projected on the TV) | `notes.js` | [math-lessons.md](math-lessons.md) | students, live |
| **Practice** (reveal-solution task) | `workbook.js` | [workbook-tasks.md](workbook-tasks.md) | students, self-serve |
| **Lesson plan** (one page) | `docs/y7-math/plans/U01_1.md` | [lesson-plans.md](lesson-plans.md) | teacher |
| **Key words** (`realWords`) | `data.js` | [question-quality.md](question-quality.md) | vocab tasks |
| Diagrams / widgets as needed | `diagrams.js` / `widgets.jsx` | [svg-diagrams.md](svg-diagrams.md) / [math-widgets.md](math-widgets.md) | both |

Not every section needs every graded task (Short Answers, Essay, etc.). The lesson +
workbook + lesson plan are the core three for Year 7. Add graded questions where they
earn their keep; hold them to [question-quality.md](question-quality.md).

**Bilingual (EN + VN) is required.** This class relies on Vietnamese support, so every
learner-facing English field needs its `…Vn` counterpart (`titleVn`, `contentVn`,
`exampleVn`, `vn`, `vnDef`, …), exactly as Y8 `MATH_1A` does. The lesson UI EN/VN
toggle and the workbook depend on it.

---

## 3. Course map (Cambridge Y7 Learner's Workbook)

From the workbook contents. Build in book order; each row is one unit folder.

| # | Unit | Sections → unit ids |
|---|---|---|
| 1 | **Integers** | 1.1 `U01_1` Adding & subtracting · 1.2 `U01_2` Multiplying & dividing · 1.3 `U01_3` Lowest common multiples · 1.4 `U01_4` Highest common factors · 1.5 `U01_5` Tests for divisibility · 1.6 `U01_6` Square & cube roots |
| 2 | **Expressions, formulae & equations** | 2.1 `U02_1` Constructing expressions · 2.2 `U02_2` Using expressions & formulae · 2.3 `U02_3` Collecting like terms · 2.4 `U02_4` Expanding brackets · 2.5 `U02_5` Constructing & solving equations · 2.6 `U02_6` Inequalities |
| 3 | **Place value & rounding** | 3.1 `U03_1` Multiplying & dividing by powers of 10 · 3.2 `U03_2` Rounding |
| 4 | **Decimals** | 4.1 `U04_1` Ordering · 4.2 `U04_2` Adding & subtracting · 4.3 `U04_3` Multiplying · 4.4 `U04_4` Dividing · 4.5 `U04_5` Making calculations easier |
| 5 | **Angles & constructions** | 5.1 `U05_1` A sum of 360° · 5.2 `U05_2` Intersecting lines · 5.3 `U05_3` Drawing lines & quadrilaterals |
| 6 | **Collecting data** | 6.1 `U06_1` Conducting an investigation · 6.2 `U06_2` Taking a sample |
| 7 | **Fractions** | 7.1 `U07_1` Ordering · 7.2 `U07_2` Adding mixed numbers · 7.3 `U07_3` Multiplying · 7.4 `U07_4` Dividing · 7.5 `U07_5` Making calculations easier |
| 8 | **Shapes & symmetry** | 8.1 `U08_1` Symmetry of 2D shapes · 8.2 `U08_2` Circles & polygons · 8.3 `U08_3` Congruent shapes · 8.4 `U08_4` 3D shapes |
| 9 | **Sequences & functions** | 9.1 `U09_1` Generating sequences 1 · 9.2 `U09_2` Generating sequences 2 · 9.3 `U09_3` Using the nth term · 9.4 `U09_4` Representing simple functions |
| 10 | **Percentages** | 10.1 `U10_1` Fractions, decimals & percentages · 10.2 `U10_2` Percentages large & small |

We are starting with **Unit 1 (Integers)** — pages `Y7Math1.1`–`1.3` and the End of
Unit 1 Test are already in [public/Workbook pages/](../public/Workbook%20pages/).

---

## 4. One-time setup (before the first unit)

1. **Register the track.** Add to [src/components/trackRegistry.js](../src/components/trackRegistry.js):
   ```js
   {
     id: 'Y7_MATH',
     title: 'Year 7 Mathematics',
     desc: 'Cambridge Lower Secondary',
     icon: Calculator,            // already imported
     group: 'Cambridge',
     theme: { /* pick a hue not already used in the Cambridge group */ },
   },
   ```
2. **Build the `WORKBOOK` task component** — it is registered but `component: null`
   in [taskRegistry.js](../src/tasks/taskRegistry.js) (renders the placeholder today).
   See [workbook-tasks.md](workbook-tasks.md) §Implementation.
3. **Add the lesson warm-up / rich title slide support** to
   [src/tasks/Notes.jsx](../src/tasks/Notes.jsx) — see [math-lessons.md](math-lessons.md)
   §Implementation. Lessons can be *authored* against the spec first; the small
   renderer change makes them display.

These three land once, then every section is pure content authoring.

---

## 5. Workflow per section (the loop we repeat daily)

1. Drop the section's workbook page image(s) into `public/Workbook pages/`
   (naming: `Y7Math<unit>.<section>_pN.jpg`, as already used).
2. Read the page: pull the **objective**, **key words**, **worked example**, and the
   **exercise** (Focus / Practice / Challenge tiers).
3. Scaffold the unit folder + `data.js` (`meta`, `phases`, `realWords`).
4. Author `notes.js` → the lesson ([math-lessons.md](math-lessons.md)).
5. Author `workbook.js` → the practice ([workbook-tasks.md](workbook-tasks.md)).
6. Write the one-page plan ([lesson-plans.md](lesson-plans.md)).
7. Verify: `npm run audit:svg Y7_MATH` clean, unit renders, EN/VN both present.

---

## 6. Naming & house rules (quick reference)

- **No exam-board name** ("Cambridge", "IGCSE") in any *learner-facing* field — same
  rule as the rest of the app. It's fine in docs and `desc`.
- Keep lessons **short**: the notebook should gain purpose, not swallow the period.
  Concision rules live in [math-lessons.md](math-lessons.md).
- Reuse before you build: a diagram or widget used by more than one section belongs
  in a shared spot (`diagrams.js`, or the generic widget registry), referenced by key.
- Every diagram passes `npm run audit:svg Y7_MATH`; every graded question passes the
  [question-quality.md](question-quality.md) checklist.
