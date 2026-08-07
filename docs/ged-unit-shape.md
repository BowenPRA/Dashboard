# GED Unit Shape — Which Tasks, In Which Phase, Per Track

The standard composition of a GED unit. Read with [ged-sprint-plan.md](ged-sprint-plan.md)
(what to build and when) and [ged-english-lessons.md](ged-english-lessons.md) (how to write
an RLA lesson).

Task ids and dbKeys come from [taskRegistry.js](../src/tasks/taskRegistry.js) and are never
hardcoded elsewhere.

---

## 1. What the twelve tasks are worth on the GED

| Task | GED value | Verdict |
|---|---|---|
| `NOTES` | Teaches the concept | **Keep** — but XP must be earned (§4) |
| `WORD_REC` | Vocabulary is the ESL ceiling on all four tests | **Keep, and fix** — it scores a point for either button today |
| `READ_COMP` | The spine of RLA, Science *and* Social Studies | **Keep — highest-transfer task in the app** |
| `GRAMMAR_EDIT` | The RLA language strand, tested exactly this way | **Keep, and expand** — currently only in `ENG_0A/0B` |
| `SHORT_ANSWERS` | Written production, AI-graded on content **and English 0–3** | **Keep** — the daily writing block lives here |
| `ESSAY` | The Extended Response, ~20% of RLA | **Keep** |
| `ASSESSMENT` | Timed, mixed, bilingual explanations, review phase | **Keep — the model for everything else** |
| `DIAGRAMS` | Interpret a figure, write about it, AI-graded | **Repurpose → "Source Analysis"** (§2) |
| `WORKBOOK` | Tiered practice with stepped reveals | **Promote** — rename "Extra" → "Practice"; it is the maths engine |
| `SPELLING` | Not tested. Spelling only counts inside the essay's conventions score | **Cut from all GED units** |
| `DICTATION` | The GED has no listening component | **Cut from GED tracks**; keep for `ESL` |
| `GAMES` | Motivation only | **Cut for the sprint** |

### The two free wins

**`DIAGRAMS` is a GED Source Analysis task wearing the wrong name.** It already renders an
`inlineSvg` or image, takes a written response, and grades it on content marks plus English.
That is *precisely* a GED Science chart item, a Social Studies political cartoon item, or a
map/graph item — three tests' worth of item types, already built. Only the label and the
authored content need to change.

**`WORKBOOK` is used by exactly one unit in the repo, and it is not a GED unit.** The
tiered Focus / Practice / Challenge reveal-solution task — the best self-serve practice
shape we have — is sitting in `Y7_MATH/U01_1` while every GED maths unit uses
`SHORT_ANSWERS` for drill. Wire it into `GED_MATH`.

### What is being cut, and how much time it returns

`SPELLING` currently appears in **six of nine** GED units — `ENG_0A`, `ENG_0B`, `HIST_1A`,
`HIST_1B`, `MATH_1A`, `MATH_1B`. At ~10 minutes each that is an hour of the sprint spent
spelling words that are never spelled on the test. Removing it is a data edit in each
`data.js` `phases` block; no code changes.

---

## 2. The standard shape

### One module = one day

This is the sizing rule everything else serves: **a module is a day's work — 100 XP, about
three hours.** Not a topic, not a chapter. A day.

That makes the module the unit of scheduling, so a week is simply five modules and the
whole sprint is a 25-cell grid ([ged-sprint-plan.md](ged-sprint-plan.md) §8). It only works
if modules are **uniform in size**, which is why the composition below is fixed and why the
odd extra tasks come out — a unit carrying seven tasks and one carrying five cannot both be
a Tuesday.

Three phases, 100 XP, six tasks. Same skeleton in every track so the student always knows
where they are.

| Phase | Threshold | Contains | XP |
|---|---|---|---|
| **Learn** | 0 | `NOTES` + `WORD_REC` | 20 |
| **Drill** | 15 | Two subject-appropriate practice tasks | 40 |
| **Prove** | 45 | One production task + `ASSESSMENT` | 40 |

Thresholds sit *below* the phase's own total so a student who half-finishes Learn is not
stuck. Keep the existing `id` values `concept` / `practice` / `mastery` — only the display
titles change.

---

## 3. Per-track composition

### GED_ENG — reading unit (`ENG_1A`, `1B`, `1C`)

| Phase | Tasks | XP |
|---|---|---|
| Learn | `NOTES` 10 · `WORD_REC` 10 | 20 |
| Drill | `READ_COMP` 20 · `GRAMMAR_EDIT` 20 | 40 |
| Prove | `SHORT_ANSWERS` 20 · `ASSESSMENT` 20 | 40 |

*Change from today: `GRAMMAR_EDIT` added (it is absent from all three reading units),
`DIAGRAMS` and `ESSAY` moved out. Essays concentrate in the capstone and in dedicated
rehearsals rather than one per unit.*

### GED_ENG — language / editing unit (`ENG_0A`, `0B`, `3`, `4`, `5`)

| Phase | Tasks | XP |
|---|---|---|
| Learn | `NOTES` 10 · `WORD_REC` 10 | 20 |
| Drill | `GRAMMAR_EDIT` 30 · `WORKBOOK` 10 | 40 |
| Prove | `SHORT_ANSWERS` 10 · `ASSESSMENT` 30 | 40 |

*`GRAMMAR_EDIT` is the whole point of these units and should dominate. `SPELLING`,
`READ_COMP` and `ESSAY` come out.*

### GED_ENG — the Extended Response capstone (`ENG_10`)

| Phase | Tasks | XP |
|---|---|---|
| Learn | `NOTES` 10 (the structure + the frames) · `WORD_REC` 10 (argument/transition language) | 20 |
| Drill | `READ_COMP` 20 (the two opposing sources) · `SHORT_ANSWERS` 20 (one frame at a time) | 40 |
| Prove | `ESSAY` 40 | 40 |

*The only unit where `ESSAY` carries a whole phase. `SHORT_ANSWERS` is used as the
frame drill: one paragraph at a time, graded, before the full 45 minutes is attempted.*

### GED_HISTORY and GED_SCIENCE

Identical shape — both tests are read-a-source-and-reason.

| Phase | Tasks | XP |
|---|---|---|
| Learn | `NOTES` 10 · `WORD_REC` 10 | 20 |
| Drill | `READ_COMP` 20 · `DIAGRAMS` (Source Analysis) 20 | 40 |
| Prove | `SHORT_ANSWERS` 20 · `ASSESSMENT` 20 | 40 |

*Source Analysis carries documents and cartoons in Social Studies, charts and experiment
set-ups in Science. `SPELLING` comes out of `HIST_1A/1B`.*

### GED_MATH

| Phase | Tasks | XP |
|---|---|---|
| Learn | `NOTES` 10 · `WORD_REC` 10 | 20 |
| Drill | `WORKBOOK` 30 · `SHORT_ANSWERS` 10 | 40 |
| Prove | `DIAGRAMS` 20 (graph/figure with a written reason) · `ASSESSMENT` 20 | 40 |

*`WORKBOOK` becomes the drill engine. `SPELLING` and `READ_COMP` come out — a maths unit
does not need a reading-comprehension passage task when the word problems live in
`WORKBOOK` and `SHORT_ANSWERS`. Keep `WORD_REC`:* coefficient, quotient, perimeter,
inequality *are genuine ESL barriers.*

---

## 4. The three cross-unit surfaces

None of these belong to a unit, and all three are new. They are what turns a pile of units
into a study programme.

| Surface | When | What |
|---|---|---|
| **Review** | Daily, 15 min | 8–12 mixed items from *completed* units, weighted to previous misses and longest-unseen. Bilingual explanation on every miss |
| **Section Rehearsal** | Weekly, timed | `ASSESSMENT` with items pooled across a whole track. English-only from week 4 |
| **Vocabulary Bank** | Feeds both | Shared across tracks: GED stem language (*infer, imply, best summarises, cite, evaluate*) plus per-subject terms |

Build order and rationale: [independent-learning.md](independent-learning.md) §5, Waves 1–2.

---

## 5. Fixes this shape depends on

- **`NOTES` must earn its XP.** It pays 10 for reaching the last slide
  ([taskRegistry.js:66](../src/tasks/taskRegistry.js#L66)). Add 2–3 embedded check
  questions and pay on those.
- **`WORD_REC` must actually test.** It scores a point for either button
  ([Recognition.jsx:20](../src/tasks/Recognition.jsx#L20)). With English as the top worry,
  an untested vocabulary task is the worst bug in the app.
- **Relabel** `DIAGRAMS` → "Source Analysis" and `WORKBOOK` → "Practice" in
  [taskRegistry.js](../src/tasks/taskRegistry.js). Labels only; `dbKey` values never change.

---

## 6. Migration checklist for the nine existing GED units

- [ ] Remove `SPELLING` from `ENG_0A`, `ENG_0B`, `HIST_1A`, `HIST_1B`, `MATH_1A`, `MATH_1B`
- [ ] Add `GRAMMAR_EDIT` to `ENG_1A`, `ENG_1B`, `ENG_1C`
- [ ] Move `ESSAY` out of `ENG_0A`, `ENG_0B` (grammar units do not need one)
- [ ] Swap `SHORT_ANSWERS` → `WORKBOOK` as the drill task in `MATH_1A`, `MATH_1B`
- [ ] Remove `READ_COMP` from `MATH_1A`, `MATH_1B`
- [ ] Re-title phases Learn / Drill / Prove; set thresholds 0 / 15 / 45
- [ ] Re-check each unit still totals 100 XP
- [ ] `npm run validate` green
