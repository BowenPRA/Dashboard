# IGCSE Additional Mathematics (`ADD_MATH`) — Course Guide

How to build a unit of the Cambridge IGCSE **Additional Mathematics 0606** track, for a
student working alone on a screen.

**The exemplar is `src/data/ADD_MATH/AM_4B`** (Sketching Cubic Graphs, §4.3): the unit
shape, a deck with six in-screen activities, a production task that stages the book's
own method and folds the modulus by tapping, and a Workbook that carries exactly the
parts of the exercise the production task does not. When in doubt, copy its structure.
`AM_4A` (Modulus Equations and Inequalities, rebuilt to the same standard) is the second
reference; `AM_3A` (Polynomials) is the original and still sound.

**`AM_7A` (The Equation of a Circle) is the blueprint for building a unit from a problem
bank** — one task per question type of the book's exercise. §9 is the method; use it for
every unit from here on, starting with the rest of chapter 5.

The three documents for this track:

| Read | For |
|---|---|
| this file | the unit shape, the design method, the checklist |
| [add-math/task-engines.md](add-math/task-engines.md) | every task screen: what it is for and the data it reads |
| [add-math/notes-and-activities.md](add-math/notes-and-activities.md) | the deck: slide beats, the eight activity types, how to write the interaction slides |

Plus the general standards: [lesson-standard.md](lesson-standard.md),
[workbook-tasks.md](workbook-tasks.md), [svg-diagrams.md](svg-diagrams.md).

---

## 1. Track facts you need before you start

| | |
|---|---|
| Track id | `ADD_MATH` (registered in `src/components/trackRegistry.js`) |
| Language | **English only.** The track declares `bilingual: false`, so learner-facing content carries **no `vn*` twins** and the validator skips those checks. |
| Unit id | `AM_<chapter><letter>` — `AM_4B` is chapter 4, second unit. |
| Folder | `src/data/ADD_MATH/<UNIT>/` and `public/audio/ADD_MATH/<UNIT>/` — the two names must match the unit id exactly. |
| Visibility | `ADD_MATH` is **not** in the `GED` group. The student's `app_metadata.enrolled_tracks` must include `"ADD_MATH"` (teacher admin), or they must be on the preview/QA account. |
| Harness | `preview-addmath.html?unit=<UNIT>` mounts every task without auth; `?done=id1,id2` resumes a task part-way; `?slide=N` opens NOTES at a slide (checks gate Continue); the DIAGRAMS case lays every SVG on one page. |

**A unit is a chapter section or two, not a whole chapter.** `AM_4A` is §4.1–4.2
because equations and inequalities are one argument; `AM_4B` is §4.3 alone because
sketching is its own skill and its own exercise; §4.4 (cubic inequalities, read off those
sketches) is `AM_4C`.

**Chapter 5 is four units** (decided 2026-09-30, once the exercise pages and §5.11 had
been read; the outline is [add-math-ch5-outline.md](add-math-ch5-outline.md)):

| Unit | Sections | Status |
|---|---|---|
| `AM_5A` | §5.1–5.3 logarithms and their laws | built |
| `AM_5B` | §5.5, 5.7, 5.8 exponential equations, e and ln, growth and decay | to build |
| `AM_5C` | §5.4, 5.6 log equations and change of base | to build |
| `AM_5D` | §5.9–5.11 graphs and inverses | to build |

**Chapter 7 is three units:** `AM_7A` the equation of a circle (first half of §7.1:
reading, writing and rearranging it — built), `AM_7B` chords, tangents, right angles and
the circle through three points (second half of §7.1), `AM_7C` lines and circles (§7.2).

Every section of chapters 5 and 7.1 has a **problem bank** in `docs/`
(`add-math-5-1-…` to `add-math-5-11-…`, `add-math-7-1-circles.md`): the beats of the
book's notes, every exercise question mapped to a type, and fresh problems for each type.
A unit is built from its bank — see §9.

---

## 2. The design principle: the screen has to earn its place

A textbook and a projector already exist. A unit here is only worth building if the
student can do something on the screen that paper cannot mark and a teacher cannot do
forty times a lesson. Every task in the exemplar passes that test:

- **Sketch It** draws the curve the moment the student has committed to its intercepts
  and shape, and lets them **tap the pieces** to reflect — the modulus becomes a thing
  you do, not a rule you read.
- **Case Solver** evaluates both sides of $|x| = 2x - 3$ at each candidate and asks
  *keep or reject* — the extraneous root is thrown out by the student, with the two
  unequal values in front of them.
- The deck's **activities** put the question before the answer: predict the shape, sort
  the equations by sign, click the vertex, shade the number line.
- **Nothing derived is authored.** The engines derive every intercept, case, check and
  region from the question, so an answer key cannot drift and `npm run validate` refuses
  an item a student could not finish on screen.

The corollary: **read-then-type is the last resort, not the default.** A Workbook item
exists for the parts of an exercise no engine can stage (a printed figure to read, an
intersection to find by algebra, the section run backwards), and it earns its place with
a worked solution the book does not print.

---

## 3. The unit shape

| Phase | Gate | Tasks | XP |
|---|---|---|---|
| `concept` — **Gate 0: Learn** | 0 | `NOTES` 10 · `WORD_REC` 10 | 20 |
| `practice` — **Gate 1: Apply** | 15 | the topic's production task (`CUBIC_SKETCH` 35, `LOG_SIMPLIFY` 35, or `MOD_SOLVE` 25 + `GRAPH` 20), or **one task per question type** (`AM_7A`: `CIRCLE_PLOT` 20 + `CIRCLE_EQ` 20 + `CIRCLE_SQUARE` 25) · `WORKBOOK` 20–30 · `WORKBOOK_B` if there is a second exercise | 65–90 |
| `mastery` — **Gate 2: Quiz & Arcade** | 60 | `ASSESSMENT` 20 · `GAMES` 0 | 20 |

`AM_4B` totals 105 against a 100 XP unit; `AM_4A` totals 130 because it carries two
exercises and two production tasks. Over-provision is deliberate: a student can drop a
whole task and still finish.

**Pick the production task from the topic.** A topic with a *procedure* gets a staged
engine (`POLY_DIV`, `MOD_SOLVE`, `CUBIC_SKETCH`); a topic with a *graphical* method the
exam expects gets `GRAPH`. If a topic has neither, run the Workbook slots alone — an
invented task teaches nothing. The engines and their schemas:
[add-math/task-engines.md](add-math/task-engines.md).

**One exercise → one Workbook slot.** `WORKBOOK` ("Practice") for the first or only
exercise, `WORKBOOK_B` ("Book Problems") for a second. **Every part of every exercise is
set once across the unit's tasks**: the production task carries the parts it can stage
and the Workbook the rest, and each file's header says which.

**Re-derive the gates whenever the task mix changes.** A progression gate must sit at or
below **80% of the XP available before it** — `npm run validate` fails otherwise
([ged-unit-shape.md](ged-unit-shape.md) §2).

---

## 4. Build order

1. **Read the section** — the book pages (screenshots in `docs/<track>/sources/` or the
   Snips folder), the worked examples, and *every part of the exercise*. List the parts
   in a table: which engine can stage each one, which needs a Workbook item, which needs
   a figure.
2. **Beat sheet for the deck** before any code: one line per slide, marking which are
   questions (predict / check), which are interactions (plot, sort, reflect, hotspot),
   which are copy-down. [add-math/notes-and-activities.md](add-math/notes-and-activities.md)
   §1 has the beats the exemplars converge on.
3. **Diagrams** in `diagrams.js` (§6). Render the DIAGRAMS gallery in the harness and
   *look* before wiring anything.
4. **The production task data** (`cubicSketch.js` / `modulusSolve.js` / …), ordered so
   each item adds one idea, with the order justified in the file header. Run
   `npm run validate` now — the engine will tell you about a wrong factorisation or an
   off-line critical value before you have written a slide about it.
5. **`notes.js`**, then **`workbook.js`** (and `workbookB.js`), **`assessment.js`**,
   **`games.js`**, **`data.js`**, and the arcade entries (§7).
6. **Verify** (§8), then `npm run sync-audio`, then verify again.

---

## 5. The notes deck

Standard `layout` slides ([math-lessons.md](math-lessons.md); components in
`src/components/notes/layouts/`). The full guide is
[add-math/notes-and-activities.md](add-math/notes-and-activities.md); the essentials:

- **The deck is scored on its checks and activities** — ten to twelve `check` MCQs and
  six to eight activities, spread through the deck where each idea has just landed.
- **Ask before you tell.** Open with a `predict`; put a `plot` / `reflect` / `hotspot`
  on the slide that introduces the picture; drill the method with a `sort` or an
  `order`; shade an inequality on a `numberline` before the answer is written.
- **One idea per slide, and less text on a slide that has an interaction.**
- `check` / `activity` is always the last key on its slide; `$$…$$` only in `content`,
  callout bodies and `reveal.answer`; layout `title` and hero `objective` are plain text.
- Teach the practical truth as well as the method — why a sketch has no y scale, why
  the modulus cannot tell $k$ from $-k$, why you must not divide by $x$.

### Narration

`npm run sync-audio` (edge-tts, free, needs internet) fills only **missing** files, so
**delete `public/audio/ADD_MATH/<UNIT>/` before regenerating** after a content edit.
`speechify()` in `generate_all_audio.py` reads `x^2` as "x squared", `x^3` as "cubed",
`\deg \leq \geq \pm \sqrt \text \iff` as words, a matched pair of pipes as "the modulus
of", and subscripts as "sub n". Anything it does not know is deleted, so if a slide
narrates oddly, teach `speechify` the command rather than rewording the maths.

---

## 6. Diagrams

`diagrams.js` per unit, house rules in [svg-diagrams.md](svg-diagrams.md), plus:

- The export is written `NAME: NAME,` with a two-space indent — the validator's
  `/^ {2}([A-Z_0-9]+):/` scan reports a missing diagram otherwise.
- Every `<text>` is written **literally**. `npm run audit:svg` cannot see text produced
  by a `${helper(...)}` call. Helpers emit paths only — `curve()`, `axes()`, `tick()`,
  `lattice()` in the exemplar.
- Curves are sampled with `curve(w, f, { x0, x1 })`, which breaks the path where it
  leaves the window; that is how a cubic's tails leave the top and bottom of a plate the
  way a book sketch does. A modulus graph is sampled from `Math.abs(f(x))`.
- Label only the numbers that teach: the intercepts, and the grid numbers on the two
  questions the book prints on squared paper.
- Superscripts are Unicode (`x²`) or `^2` in mono, not `<tspan>`.
- A figure a `hotspot` activity will use needs its targets' coordinates: they are
  `w.X(x)`, `w.Y(y)` in that diagram's window, and the printed labels are stripped at
  runtime so the figure does not answer its own question.

---

## 7. The arcade

Add the unit to `TRACK_LEVELS.ADD_MATH` in
`src/components/towerdefense/unitDifficulty.js` (map, theme, tier, blurb), and give it a
Maths Bolt generator in `src/components/towerdefense/mathChallenges.js` keyed by unit id.
`AM_4B`'s asks for a named x-intercept of a factorised cubic, its y-intercept, and
whether the right-hand tail climbs. Answers must be an integer or Yes/No; verify a new
generator against an independent oracle — parse the prompt back from its own text and
recompute — before shipping it.

---

## 8. Checklist for a new unit

- [ ] `src/data/ADD_MATH/<UNIT>/` with `data.js`, `notes.js`, `diagrams.js`, the
      production task's data, `workbook.js` (+ `workbookB.js` for a second exercise),
      `assessment.js`, `games.js`
- [ ] `meta.track === 'ADD_MATH'` and `meta.id` matches the folder; English only
- [ ] Tasks total ≥ 100 XP; every gate ≤ 80% of the XP before it
- [ ] Every part of every exercise set exactly once across the tasks, and each file's
      header says which parts it carries
- [ ] Deck: 10–12 checks + 6–8 activities, a `predict` before a reveal, a
      touch-the-picture activity, a `sort`/`order` of the method
- [ ] Production task items ordered one idea at a time, order justified in the header
- [ ] Workbook keys the engine can mark ([task-engines.md](add-math/task-engines.md) §5),
      each typed in the harness
- [ ] Assessment key spread across A/B/C/D; every distractor a nameable mistake
- [ ] `npm run audit:svg ADD_MATH` clean for the unit; `npm run lint` clean
- [ ] `npm run validate` green (it re-derives every engine item)
- [ ] `npm run sync-audio`, then validate again (missing slide audio is an **error**)
- [ ] Walked every task in `preview-addmath.html?unit=<UNIT>`, light and dark
- [ ] Arcade entry and Maths Bolt generator

---

## 9. From a problem bank to a unit — the blueprint (`AM_7A`)

The source is the coursebook on Cambridge GO, read in the browser. It is **never
copied**: no page images, no exercise text. What is kept is a *problem bank*, and the
unit is built from that.

### 9.1 The problem bank (one `docs/add-math-<section>-<topic>.md` per section)

| Part | What it holds |
|---|---|
| 1. The beats of the notes | the section's teaching, in order, in our own words, with page numbers — this becomes the deck's spine |
| 2. What the exercise asks | **every** exercise question number mapped to a *type*, and how the difficulty climbs inside each type |
| 3. Fresh problems | a set for every type, in the book's order of difficulty, plus challenge-style ones; every answer checked by script |

The rule Bowen set: **match the book's exact problem types.** Nothing the exercise
drills may be missing from the bank, and nothing in the bank is the book's own item with
the numbers changed.

### 9.2 One task per question type

Read the bank's type table and give each type a home. `AM_7A`'s mapping, from
[add-math-7-1-circles.md](add-math-7-1-circles.md):

| Bank type | Task | Why it has its own screen |
|---|---|---|
| A. Read centre and radius | **Plot the Circle** (levels 1–4) | reading is proved by *plotting*: click the centre, then a point on the circle |
| F. Sketches, touching an axis | **Plot the Circle** (level 5), **Write the Equation** (level 4) | predicted before the circle is drawn |
| B, D, E. Write the equation | **Write the Equation** (levels 1–3) | the question runs the other way, so the screen does too |
| C. General form | **Complete the Square** | pure procedure, so it is staged one move at a time |
| everything else | **Practice** (the Workbook) | the parts no engine stages, each with a worked solution |

Rules that came out of building it:

- **A type that is a different *direction* gets a different task** (read an equation /
  write one / rearrange one). Types that differ only in what is given share a task as
  *levels* (centre and radius → centre and a point → a diameter).
- **Levels are the bank's "how it climbs" column.** Each level is named, the levels only
  climb, and each item adds one idea — say which in the data file's header.
- **The numbers change when the screen needs them to.** A circle has to fit the grid, a
  clicked point has to be a whole-number point. Pick new numbers of the same type; the
  validator (`checkCircleItems`) says which items break.
- **Put the diagnosis where the mistake is.** The bank's "trap" items become wrong-answer
  messages: copying the signs out of the brackets, r for r², the whole coefficient for
  half of it, the diameter for the radius. A message quotes the *question's own* numbers.
- **Every item ends on a reveal worth copying**: the working, the drawn result, and a
  check that substitutes an answer back.
- **Challenge questions** go to the Workbook's Challenge tier as fresh problems in the
  same spirit, with full solutions — not into an engine.
- **The deck follows Part 1 of the bank**, one beat per slide, and its activities use the
  same picture as the tasks (the `line` activity can sweep a `circle` on after a check).

### 9.3 Build order for a bank-driven unit

1. Write the type → task table in the unit's `data.js` header. If a type has no home,
   the unit is not designed yet.
2. The pure derivation in `src/utils/<topic>.js` with `check…Items`, tested in a scratch
   script against the bank's answers **before** any screen exists.
3. The pools (`<task>.js`), one per task, with the ladder written out in the header.
   Run the validator's check on them at once — several bank numbers will need changing.
4. The screen. One component can serve several tasks through a `mode` prop
   (`CircleLab.jsx` serves three).
5. Stub `notes.js` / `workbook.js` / `assessment.js`, mount the tasks in the harness, and
   walk each one **wrong first, then right** — that is where the messages get fixed.
6. Diagrams, deck, workbook, quiz; then §8's checklist.

### 9.4 Applying it to chapter 5

| Unit | Bank files | Likely task per type |
|---|---|---|
| `AM_5B` | 5.5, 5.7, 5.8 | *Take logs* (5.5 A, 5.7 E–G) · *Hidden quadratic* (5.5 C–E, 5.7 I–J: substitute, solve, **reject**) · *Exact values with e and ln* (5.7 C–D) · growth and decay contexts in the Workbook (5.8) |
| `AM_5C` | 5.4, 5.6 | *Log equation solver* ending on "check each root" (5.4 A–D) · *Quadratic in a log* (5.4 E, 5.6 J) · *Change of base* (5.6 A–E, H) · simultaneous equations in the Workbook |
| `AM_5D` | 5.9, 5.10, 5.11 | *Sketch with an asymptote* (5.10 B–C; predict crossings first, as Plot the Circle does) · *Find the inverse* in three stages plus the domain (5.11 A–C) · the 5.9 families as deck slider activities |

The thread to keep across `AM_5B` and `AM_5C` is **rejecting a root** — a negative
argument, a negative base, a negative power. Make it its own stage, and include items
where both roots survive and where none does, so that the check is a real check.
