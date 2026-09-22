# IGCSE Mathematics, Extended (`EXT_MATH`) — Course Guide

How to build a unit of the Cambridge IGCSE **Mathematics 0580, Extended tier** track for
the student taking it through **Wolsey Hall Oxford** — where the unit of work that
actually arrives is *an assignment*, usually as a photograph of the student's own working.

**The exemplar is `src/data/EXT_MATH/EM_06`** (Sets, Surds & Rationalising, Assignment
06): the unit shape, a thirty-slide deck with twenty-two scored items and three widgets,
three production tasks that stage the assignment's own question shapes, and a Practice
task carrying the parts no engine stages. When in doubt, copy its structure.

**The second exemplar is the pair `EM_07A` / `EM_07B`** (Assignment 07, split in two —
§1): what to do when an assignment is too wide for one unit, a unit with two production
engines plus both Practice slots (EM_07A), and a unit with one engine that carries most of
the assignment's geometry (EM_07B).

The three documents for this track:

| Read | For |
|---|---|
| this file | the unit shape, the design method, the checklist |
| [ext-math/task-engines.md](ext-math/task-engines.md) | every task screen: what it is for and the data it reads |
| [ext-math/notes-and-widgets.md](ext-math/notes-and-widgets.md) | the deck: slide beats, the `venn` activity, every unit's widgets |

Plus the general standards: [lesson-standard.md](lesson-standard.md),
[workbook-tasks.md](workbook-tasks.md), [svg-diagrams.md](svg-diagrams.md), and
[add-math-course.md](add-math-course.md) — the sister IGCSE track, whose derive-everything
rule this one follows exactly.

---

## 1. Track facts you need before you start

| | |
|---|---|
| Track id | `EXT_MATH` (registered in `src/components/trackRegistry.js`, pink, `SquareRadical`) |
| Language | **English only.** The track declares `bilingual: false`, so learner-facing content carries **no `vn*` twins** and the validator skips those checks. |
| Unit id | `EM_<assignment number>` — `EM_06` is Assignment 06. Zero-padded, so the folder sorts in course order. A split assignment adds `A` / `B`: `EM_07A`, `EM_07B`. |
| Folder | `src/data/EXT_MATH/<UNIT>/` and `public/audio/EXT_MATH/<UNIT>/` — the two names must match the unit id exactly. |
| Visibility | `EXT_MATH` is **not** in the `GED` group. The student's `app_metadata.enrolled_tracks` must include `"EXT_MATH"` (teacher admin), or they must be on the preview/QA account. |
| Harness | `preview-extmath.html?unit=<UNIT>` mounts every task without auth. `?done=id1,id2` resumes a task part-way; `?slide=12` resumes the deck at a slide (the only way past a sort, which a script cannot drive); the DIAGRAMS case lays every SVG on one page and the WIDGETS case mounts every widget. |

**One assignment is one unit.** The assignment is the thing the student is marked on and
the thing that arrives on the teacher's desk, so it is the unit of work here — even when
it spans two syllabus areas, as Assignment 06 does (sets, and surds). A unit therefore
covers *everything the assignment asks*, and its tasks are named after skills rather than
after syllabus sections.

**…unless it is too wide for one sitting.** Assignment 07 is 22 questions and 77 marks
across bounds, time zones, inequalities, regions, lines, simultaneous equations, bearings,
Pythagoras, trigonometry, polygons and scatter graphs. One deck for all of it would run
past fifty slides. So it is two units:

| Unit | Carries |
|---|---|
| `EM_07A` Bounds, Inequalities & Simultaneous Equations | the number and algebra questions (Q1d, Q2–10, Q14a and c, Q16, Q19–22) |
| `EM_07B` Bearings, Trigonometry & Scatter Graphs | the geometry and statistics questions (Q1a–c, Q11–13, Q14b, Q15, Q17, Q18) |

Split at a **topic boundary**, never in the middle of a method, even when that sends a
question's parts to different units (Q1 and Q14 are split this way). Keep the rule that
every part of the assignment is set **exactly once**: across the pair, not within each
unit. Each unit's `data.js` header maps every question it carries to the item that sets
it, so the teacher can see where Q14c went. The two units are independent: `EM_07B` does
not wait for `EM_07A`, and each has its own gates, quiz and arcade level.

---

## 2. The design principle: rebuild the understanding, never spend the assignment

The student has already attempted the assignment; a photograph of the working shows
exactly where it broke down. So a unit here is built around **the mistakes visible in
that working**, and it is built with **fresh numbers**:

> The assignment is the homework. It is never worked in the app.

In EM_06 the working showed a student who could add the numbers in a Venn diagram but had
to guess *which* numbers, and who could split a root but not tell when it was finished.
So the Venn task always goes **words → notation → shading → number**, and Surd Breaker
makes "is it fully simplified?" its own stage with its own tap.

Everything else follows the sister track's rule: **nothing derived is authored.** The
item stores the question — the counts, the facts in words, the rules, the surd, the
fraction — and `utils/sets.js` / `utils/surds.js` derive every region, count, fill order,
notation option, square factor, conjugate, product cell and simplified answer. So an
answer key cannot drift, and `npm run validate` refuses an item the student could not
finish on screen.

---

## 3. The unit shape

| Phase | Gate | Tasks | XP |
|---|---|---|---|
| `concept` — **Gate 0: Learn** | 0 | `NOTES` 10 · `WORD_REC` 10 | 20 |
| `practice` — **Gate 1: Apply** | 15 | one production task per skill the assignment tests (25–35 each) · `WORKBOOK` 15–20 · `WORKBOOK_B` 15–20 (optional) | ~90–100 |
| `mastery` — **Gate 2: Quiz & Arcade** | 60 | `ASSESSMENT` 20 · `GAMES` 0 | 20 |

`EM_06` totals 140 XP against a 100 XP unit, `EM_07A` 130 and `EM_07B` 115.
Over-provision is deliberate: a student can drop a whole task and still finish — but
**keep it at 150 or under**, or `npm run validate` warns that the gates lose meaning.
**Re-derive the gates whenever the task mix changes** — a gate must sit at or below **80%
of the XP available before it**, and `npm run validate` fails otherwise
([ged-unit-shape.md](ged-unit-shape.md) §2).

**Two Practice slots.** When the parts no engine stages are too many for one Workbook,
the second goes in `WORKBOOK_B` (dbKey p22, `workbookB.js`), which is titled **Book
Problems** on this track. `EM_07A` splits them by kind: Practice holds the bounds and time
questions, Book Problems the line, quadratic and "form two equations" questions.

**One skill → one task.** Assignment 06 tests three separable skills, so it has three
production tasks (`VENN`, `SURD_SIMPLIFY`, `RATIONALISE`). The Practice task then carries
**every part of the assignment no engine stages** — in EM_06 that is the conjugate pair
over a root, the right-angled triangle with sides $a \pm \sqrt{b}$, and the two
"factorise completely" differences of two squares. Each file's header says which parts it
carries, and between them every part of the assignment is set exactly once.

**A new skill needs a new engine, not a workbook.** If the assignment's shape cannot be
staged by an engine in [ext-math/task-engines.md](ext-math/task-engines.md), the honest
options are: extend an engine, write one (§7 of the task-engines doc), or leave it in the
Workbook with a worked solution. An invented task teaches nothing.

---

## 4. Build order

1. **Read the assignment**, part by part, from the photographs. Write the parts into a
   table: which engine can stage each one, which needs a Workbook item, which needs a
   figure. Note what the student's own working got wrong — that is the deck's spine.
2. **Beat sheet for the deck** before any code: one line per slide, marking which are
   questions (predict / check), which are interactions (`venn`, sort, order), which are
   copy-down Write panels. [ext-math/notes-and-widgets.md](ext-math/notes-and-widgets.md) §1.
3. **The task data** (`venn.js`, `surds.js`, `rationalise.js`), ordered so each item adds
   one idea, with the order justified in the file header. Run `npm run validate` now — the
   engines will refuse an unsolvable Venn diagram or an already-simplest surd before you
   have written a slide about it.
4. **Diagrams** in `diagrams.js` (§6 of [svg-diagrams.md](svg-diagrams.md), plus the notes
   below). Render the DIAGRAMS gallery in the harness and *look* before wiring anything.
5. **`notes.js`**, then `workbook.js`, `assessment.js`, `games.js`, `data.js`, and the
   arcade entries (§7).
6. **Verify** (§8), then generate audio, then verify again.

---

## 5. The notes deck

Standard `layout` slides ([math-lessons.md](math-lessons.md); components in
`src/components/notes/layouts/`). The full guide is
[ext-math/notes-and-widgets.md](ext-math/notes-and-widgets.md); the essentials:

- **The deck is scored on its checks and activities** — twelve `check` MCQs and ten
  activities in EM_06, spread through the deck where each idea has just landed.
- **Ask before you tell.** The deck opens on a `predict` (how can 33 "likes" come from 30
  students?), and every symbol is *shaded by the student* on a `venn` activity before it
  is used in a calculation.
- **One idea per slide, and less text on a slide that has an interaction.** Write like the
  classroom decks in the sibling `lessons` repo: short sentences, and a slide body that
  never repeats its own Write panel.
- `check` / `activity` is always the last key on its slide; `$$…$$` only in `content`,
  callout bodies and `reveal.answer`; layout `title` and hero `objective` are plain text.
- **Keep bare notation out of titles.** A title is narrated, and `∩` in a title is read
  aloud as "intersection" right after the word Intersection. Put the symbol in the
  `eyebrow`, which is not narrated.

### Narration

`npm run sync-audio` (edge-tts, free, needs internet) fills only **missing** files, so
**delete `public/audio/EXT_MATH/<UNIT>/` before regenerating** after a content edit. Set
`PYTHONIOENCODING=utf-8` when the output is piped, or the emoji in its progress log
crashes it on Windows. `speechify()` in `generate_all_audio.py` now expands the set
notation (`\cup`, `\cap`, `\mathscr{E}`, `\in`, `\notin`, `\subset`, `\varnothing`, and
the bare Unicode forms), reads `A'` as "A complement" while leaving an English apostrophe
alone, and reads a bare `√12` as "root 12". For EM_07 it gained trigonometry — `\sin`
"sine", `\cos^{-1}` "inverse cos", `^\circ` and `°` "degrees", `\theta` and `θ` "theta"
(all of which the catch-all used to delete) — plus fractions holding `\sqrt` or `\text`
(`\dfrac{\sqrt{3}}{2}` is "the square root of 3 over 2"), bare `≤` / `≥`, a scale
`1 : n` read "1 to n", and an inequality sign **named** on its own (`$<$ or $>$`) read as
the noun "less than or greater than".

To generate only the new units, rather than every track, run the generator's `main()`
from a wrapper that sets `DATA_DIR = 'src/data/EXT_MATH'`, `OUTPUT_BASE =
'public/audio/EXT_MATH'` and filters its `glob` to the new unit folders. **Dry-run the
narration first** — call `parse_js_to_dict` on the deck and print each slide's
`content` — and read it: a dropped symbol shows up there as a sentence that no longer
says anything.

---

## 6. Diagrams

`diagrams.js` per unit, house rules in [svg-diagrams.md](svg-diagrams.md), plus:

- The export is written `NAME: NAME,` with a two-space indent — the validator's
  `/^ {2}([A-Z_0-9]+):/` scan reports a missing diagram otherwise.
- Every `<text>` is written **literally**. `npm run audit:svg` cannot see text produced by
  a `${helper(...)}` call, so helpers emit shapes only.
- **A Venn diagram is drawn the way the paper draws it**: a rectangle for ℰ, italic serif
  letters, and the region being named shaded pale orange. Shade a crescent or the outside
  band with a `clipPath` (inclusions) plus white circles drawn over the shading
  (exclusions) — and **prefix every clipPath id with the unit and diagram** (`em06-int-a`),
  because inline SVGs share one document and a repeated id silently borrows another
  diagram's clip.
- `npm run audit:svg` pairs a label with **the smallest rect whose top is within one font
  size of the label's baseline**. A heading placed just above a narrow column header is
  therefore measured against that header: keep a heading's baseline clear of the box
  below it, or give it its own full-width strip.
- **A figure a task draws is a component, not a diagram.** The graphs and triangles the
  engines put on screen are `src/components/math/CoordGrid.jsx` (lines, a shaded
  region, points, labels — `utils/lines.js` does the clipping) and
  `src/components/math/TriangleFigure.jsx`, drawn from the same derived model the task
  marks. `diagrams.js` is for the deck's still figures only.

---

## 7. The arcade

Add the unit to `TRACK_LEVELS.EXT_MATH` in
`src/components/towerdefense/unitDifficulty.js` (map, theme, tier, blurb), and give it a
Maths Bolt generator in `src/components/towerdefense/mathChallenges.js` keyed by unit id.
`EM_06`'s asks for the number that comes out of a root, a region of a Venn diagram whose
counts are in the prompt, the number in front after clearing a single surd, and a
conjugate pair. `EM_07A`'s (`inequalitiesSimultaneous`) asks for a bound to the nearest
10, the smallest integer satisfying $ax + b > c$, and $x \pm y$ from a pair of equations;
`EM_07B`'s (`bearingsTrig`) for a back bearing, the third side of a Pythagorean triple,
and the number of sides of a regular polygon from its exterior angle. Answers must be an
integer or Yes/No; **verify a new generator against an
independent oracle** — parse the prompt back from its own text and recompute — over a few
thousand samples before shipping it.

---

## 8. Checklist for a new unit

- [ ] `src/data/EXT_MATH/<UNIT>/` with `data.js`, `notes.js`, `diagrams.js`, `widgets.jsx`,
      the production tasks' data, `workbook.js`, `assessment.js`, `games.js`
- [ ] `meta.track === 'EXT_MATH'` and `meta.id` matches the folder; English only
- [ ] A wide assignment split into `A` / `B` at a topic boundary (§1)
- [ ] Tasks total 100–150 XP; every gate ≤ 80% of the XP before it
- [ ] Every part of the assignment set exactly once across the tasks, with **fresh
      numbers**, and each file's header says which parts it carries
- [ ] Deck: 10–12 checks + 8–10 activities, a `predict` before a reveal, a `venn` shading
      before any counting, a `sort` of the words the exam hides the notation in
- [ ] Production task items ordered one idea at a time, order justified in the header
- [ ] Workbook keys the engine can mark ([add-math/task-engines.md](add-math/task-engines.md) §5),
      each typed in the harness
- [ ] Assessment key spread across A/B/C/D; every distractor a nameable mistake
- [ ] `npm run audit:svg EXT_MATH` clean for the unit; `npm run lint` clean
- [ ] `npm run validate` green (it re-derives every engine item)
- [ ] Audio generated, then validate again (missing slide audio is an **error**)
- [ ] Walked every task in `preview-extmath.html?unit=<UNIT>`, light and dark, at
      1280 × 720 and at 390 px wide
- [ ] Arcade entry and Maths Bolt generator, the generator verified against an oracle
