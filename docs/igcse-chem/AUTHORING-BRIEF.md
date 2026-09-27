# IGCSE Chemistry — authoring brief for one unit

The standing instructions for whoever writes the **content** of an `IGCSE_CHEM` unit
(a person or an agent). The unit-specific part — which topic, which pages, which tasks —
comes separately. Read [../igcse-chem-course.md](../igcse-chem-course.md) first.

**The student** is a teenager taking Cambridge IGCSE Chemistry (0620, Extended) by
distance learning with Wolsey Hall. English is their second language: sentences are short
and plain, but the chemistry is never watered down.

## Read before writing

1. `docs/igcse-chem-course.md` — unit shape (§3), design rules (§4).
2. **The exemplar, every file:** `src/data/IGCSE_CHEM/M06_2/`. Your files have the same
   shapes, comment style and quality. `M05_2` and `M05_3` are the other two exemplars.
3. `docs/igcse-chem/task-engines.md`, and the schema of any older engine your unit uses
   (the component file's header comment is the schema).
4. `docs/lesson-standard.md`, `docs/question-quality.md`, `docs/workbook-tasks.md`,
   `docs/svg-diagrams.md`.
5. `docs/y7-science/ENGAGEMENT-PLAN.md` §2 and `src/utils/activity.js` (`checkActivity`)
   for `activity:` blocks.
6. `src/components/notes/layouts/primitives.jsx` — the notes icon whitelist. An unlisted
   icon silently renders as "Info". Do not edit that file; use what is there.
   `src/components/UnitCard.jsx` has a second, smaller `IconMap` for `meta.icon`.

## Files (all in `src/data/IGCSE_CHEM/<UNIT>/`)

| File | Contents |
|---|---|
| `notes.js` | `export const notes = [...]` — 18–22 slides, **at least 14 scored**, mixing `check:` MCQs with at least 5 `activity:` blocks of at least 3 types. |
| `diagrams.js` | 6–9 authored SVGs. `const NAME = \`<svg…\`` then `export const DIAGRAMS = {` with each entry **exactly** `  NAME: NAME,` (two spaces; shorthand fails the validator). |
| `workbook.js` | `export const workbook = [...]` — 12 questions, 4 Focus · 5 Practice · 3 Challenge; `mcq` / `inline` / `dnd` only. Focus stays on Core content. |
| `assessment.js` | `export const assessment = { timeLimit: 720, passages: [], questions: [...] }` — 10 MCQ. |
| engine pools | one file per production task, named after the unit field (`symbolEq.js`, `formulaWrite.js`, …). |
| `data.js` | `export const <UNIT>_DATA = { meta, phases, realWords, shortQA, diagrams, notes: notes, … }` — every module property written out in full, never shorthand. |
| `games.js` | **already written. Do not touch.** |

Plus `docs/igcse-chem/plans/<UNIT>.md`, a one-page plan in the style of
`docs/igcse-chem/plans/M06_2.md`.

### `data.js`

- `meta: { id, title, desc, track: 'IGCSE_CHEM', icon }`.
- `phases`: Gate 0 `concept` "Gate 0: Learn" threshold 0 — NOTES (p10) 10, WORD_REC (p1)
  10. Gate 1 `practice` "Gate 1: Apply" threshold 15 — the production task(s) you are
  given, then WORKBOOK (p11) 10, SHORT_ANSWERS (p6) 20, DIAGRAMS (p7) 20. Gate 2 `mastery`
  "Gate 2: Quiz & Arcade" threshold 70 — ASSESSMENT (p9) 20, GAMES (p12) 0.
- `realWords`: 12–14, `{ word, isReal: true, def, sent }`.
- `shortQA`: 5 items, 3 marks each. Plain text — no `$`. Use Unicode for formulae and
  charges (H₂SO₄, OH⁻). `suggestedWords` must pass the spoiler test in
  `docs/question-quality.md`: they are words the answer will need, not the answer.
- `diagrams`: 3 Source Analysis items, 2 `type: 'mcq'` and 1 written, on your own SVGs.

## Rules

**Language**
- English only. No `vn` / `Vn` field anywhere.
- A slide `title` is read aloud: no bare symbols, formulae or units in it. Put them in
  `eyebrow` or the content.
- Mark Extended (supplement) content `eyebrow: 'Extended'` — the book shows it with a bar
  in the margin, and the Checkup lists it separately.

**Chemistry**
- Accuracy beats everything. Every equation balances, for atoms and for charge. Every
  number is recomputed before you finish. State symbols wherever the book puts them.
- The book's worked examples are **taught in the deck** (the student has the book open).
  Every question in every task uses **fresh substances and fresh numbers**. No Checkup or
  end-of-spread question is reproduced.
- Colour means something: acid / H⁺ red `#c8102e` · alkali / OH⁻ blue-violet `#4338ca` ·
  neutral / water green `#2f8f5b` · spectators grey `#94a3b8` · energy out warm red ·
  energy in cool blue `#1a5fa8`.

**Deck**
- The scored block (`check:` or `activity:`) is **always the last key** on its slide.
- Every "predict" comes *before* the slide that answers it.
- Every slide must fit 1280×720 without scrolling: about one equation, two short
  paragraphs and one copy-down note. Check in the harness.
- KaTeX in notes and workbook is `$…$`, with `\\text{}` for element symbols and `^{2-}`
  for charges. In `assessment.js` maths is **only** inside `$$…$$`; a single `$` is
  literal there. Prefer Unicode formulae in the quiz.

**Diagrams**
- Drawn, never photographed, never copied from the book.
- No nested backtick template inside an SVG string. Build repeated parts with a helper
  function above it.
- Any `clipPath` / `marker` / gradient id carries a unit prefix (`m063-`).
- Superscript charges as Unicode (⁺ ⁻ ²), not `<tspan>` — the audit counts tspan markup
  as label width.
- Graphs are accurate: compute every plotted position from the data.

**Quiz**
- Every distractor is one nameable mistake. The key is spread across A–D. No item copies a
  notes check or a workbook question.

**Tools**
- Write files with the Write / Edit tools. Never author file content through a shell
  heredoc: the shell halves backslashes and KaTeX breaks.
- Touch nothing outside your unit folder and your plan file. No `sync-audio`, no `build`,
  no `deploy`, no git command that changes state.
- Several units are usually being written at once, and the validator reads the whole
  repository. Ignore findings about other units. If a command fails on a lock or a
  half-written sibling file, wait a minute and run it again.

## Verify

1. `npm run validate` — no error or warning that names your unit, except the missing
   audio folder.
2. `npm run audit:svg IGCSE_CHEM` — no finding in your unit.
3. `npx eslint src/data/IGCSE_CHEM/<UNIT>` — clean.
4. Harness, in **your own new browser tab**: `preview-chem.html?unit=<UNIT>`, with
   `&open=NOTES&slide=N` to reach a slide and `&open=GALLERY` for every SVG on one page.
   Open each of your tasks once and check for console errors.

## Report

Short. Files with counts; scored deck items by type; anything not validated and why; any
icon the whitelist lacks; any place you departed from the brief and why.
