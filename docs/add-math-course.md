# IGCSE Additional Mathematics (`ADD_MATH`) — Course Guide

How to build a unit of the Cambridge IGCSE **Additional Mathematics 0606** track.

**Reference exemplar: `src/data/ADD_MATH/AM_3A`** (Polynomials, Division and the Factor
Theorem — coursebook §3.1–3.3). When in doubt, copy its structure.

Read with [lesson-standard.md](lesson-standard.md) (the bar for the teaching),
[workbook-tasks.md](workbook-tasks.md) (the practice schema) and
[svg-diagrams.md](svg-diagrams.md) (the diagram standard).

---

## 1. Track facts you need before you start

| | |
|---|---|
| Track id | `ADD_MATH` (already registered in `src/components/trackRegistry.js`) |
| Language | **English only.** The track declares `bilingual: false`, so learner-facing content carries **no `vn*` twins** and the validator skips those assertions. Write `word`/`def`/`sent`, `q`/`options[].text`/`expEn`, and nothing else. |
| Unit id | `AM_<chapter><letter>` — `AM_3A` is chapter 3, first unit. |
| Folder | `src/data/ADD_MATH/<UNIT>/` and `public/audio/ADD_MATH/<UNIT>/` — the two names must match the unit id exactly. |
| Visibility | `ADD_MATH` is **not** in the `GED` group, so `Home.jsx` hides it from a student with no explicit enrolment. The student's `app_metadata.enrolled_tracks` must include `"ADD_MATH"` (set it in the teacher admin), or they must be on the preview/QA account. |

**A unit is a chapter section or two, not a whole chapter.** `AM_3A` covers §3.1, §3.2 and
§3.3 because those three are one argument — what a polynomial is, how to divide one, and
how to spot a factor without dividing. §3.4 onwards is the next unit.

---

## 2. The unit shape

| Phase | Gate | Tasks | XP |
|---|---|---|---|
| `concept` — **Gate 0: Learn** | 0 | `NOTES` 10 · `WORD_REC` 10 | 20 |
| `practice` — **Gate 1: Apply** | 15 | the topic's production task (e.g. `POLY_DIV` 25) · `WORKBOOK` 20 · `WORKBOOK_B` 20 | 65 |
| `mastery` — **Gate 2: Quiz & Arcade** | 60 | `ASSESSMENT` 20 · `GAMES` 0 | 20 |

Total 105 XP against a 100 XP unit (`unitXPOf` caps the payout), so a student can drop a
few marks anywhere and still finish.

**Re-derive the gates whenever the task mix changes.** A progression gate must sit at or
below **80% of the XP available before it** — `npm run validate` fails otherwise, and a
gate that is merely *reachable* locks out anyone who is not perfect. See
[ged-unit-shape.md](ged-unit-shape.md) §2.

---

## 3. The two exercise tasks

The coursebook sets one exercise per section. Give **each exercise its own task**, so it is
separately scored and separately resumable, rather than one twenty-question list:

- `WORKBOOK` (label **Practice**, `u.workbook`) — the earlier section's exercise.
- `WORKBOOK_B` (label **Book Problems**, `u.workbookB`) — the later one.

Both render with `src/tasks/Workbook.jsx` and take the schema in
[workbook-tasks.md](workbook-tasks.md): tiered `Focus` / `Practice` / `Challenge`, a
**stepped** `solution` array, and an `answer` pill. Two rules specific to this track:

- **Transcribe the questions faithfully, write the method ourselves.** The book prints
  answers, not working. The worked steps are the value we add.
- **"Factorise completely" is never a typed box.** Answers are marked by algebraic
  equivalence (sampling, in `utils/mathEquivalence.js`), so the *expanded* form tests as
  equal to the factorised one and would be marked correct. Use `mcq` with factored
  options, and make one distractor the not-quite-complete factorisation.

Attach a graph with `inlineSvg` wherever a question is about roots — a cubic's three
crossings and its three factors should be on screen together.

---

## 4. `POLY_DIV` — the Long Division task

The topic's production task. `src/tasks/PolyDivision.jsx`, data in `polyDiv.js`:

```js
export const polyDiv = {
  title: 'Long Division of Polynomials',
  intro: 'Shown under the first problem only.',
  items: [
    { id: 'pd1', dividend: [1, -1, -3, 2], divisor: [1, -2], note: 'Shown under this problem.' },
  ],
};
```

- **Coefficients are DESCENDING.** `[1, -1, -3, 2]` is x³ − x² − 3x + 2 — reading order, so
  an authored item looks like the printed polynomial. Write `0` for a missing power.
- **Nothing else is authored.** Every quotient term, product row and subtraction is derived
  by `src/utils/polynomial.js`; the screen walks the student through divide → multiply →
  subtract while it brings the next term down. There is no answer key to get wrong.
- `npm run validate` re-derives each item with `checkDivision` and fails on the two ways an
  item can be unanswerable on screen: a divisor whose leading coefficient does not divide
  through (a box that wants `0.5`), and a dividend of lower degree than the divisor.
- **Order the items so each adds exactly one difficulty**: all powers present → big
  coefficients → a missing power → the first remainder → a leading coefficient ≠ 1 → a
  non-monic divisor → a quadratic divisor. `AM_3A` uses eight, three of them with
  remainders.

---

## 5. The notes deck

Standard `layout` slides ([math-lessons.md](math-lessons.md), the layout components in
`src/components/notes/layouts/`). Track-specific notes:

- **Ten `check` MCQs carry the NOTES score**, so the XP is earned rather than paid for
  reaching the last slide. `check` must be the **last key on its slide** — the audio
  generator narrates everything before it and stops there, so a question is never read
  aloud before the student has answered.
- **`$…$` is inline maths and `$$…$$` is a display block — but only in fields rendered by
  `renderContent`**: a slide's `content`, a `callout`'s body, a `reveal.answer`. Fields
  rendered by `parseInlineText` (`steps[].text`, note-card `text`, `statement.text`/`sub`,
  gallery item text, checklist items, check questions and options) are **inline only**; a
  `$$…$$` there renders as a red KaTeX error.
- **Layout `title` and hero `objective` are plain text** — never parsed — so no markdown
  and no maths in them.
- Teach the practical truth as well as the method. `AM_3A` slide 9 exists because there is
  provably no formula for the roots of a quintic, which is the whole reason the factor
  theorem is worth learning — and it is the slide that makes everything after it land.

### Narration

`npm run sync-audio` (edge-tts, free, needs internet) fills only **missing** files, so
**delete a unit's audio folder before regenerating it** after a content edit.
`speechify()` in `generate_all_audio.py` reads `x^2` as "x squared", `x^3` as "cubed",
`\deg`/`\leq`/`\pm`/`\sqrt` as words, and subscripts as "sub n". Anything it does not know
is deleted, so if a slide narrates oddly, teach `speechify` the command rather than
rewording the maths.

---

## 6. Diagrams

`diagrams.js` per unit, house rules in [svg-diagrams.md](svg-diagrams.md), plus:

- The export must be written `NAME: NAME,` with a leading two-space indent — the
  validator's `/^ {2}([A-Z_0-9]+):/` scan reports a missing diagram otherwise.
- Every `<text>` is written **literally**. `npm run audit:svg` cannot see text produced by
  a `${helper(...)}` call, so a helper that emits labels is silently unchecked.
- Curves may be generated: `AM_3A`'s `curve(f, {...})` samples a function and breaks the
  path where it leaves the window, which is how six degree thumbnails share one scale.
  That is a *path*, not text, so it is fine.
- Superscripts are the Unicode characters (`x²`, `x³`), not `<tspan>`.

---

## 7. The arcade

Add the unit to `TRACK_LEVELS.ADD_MATH` in
`src/components/towerdefense/unitDifficulty.js` (map, theme, tier, blurb), and give it a
Maths Bolt generator in `src/components/towerdefense/mathChallenges.js` keyed by unit id.
`AM_3A`'s generator asks "is (x − c) a factor of …?" and "P(c) = ?" — the factor theorem at
fifteen-second speed. Answers must be an integer or Yes/No; verify a new generator against
an independent oracle before shipping it.

---

## 8. Checklist for a new unit

- [ ] `src/data/ADD_MATH/<UNIT>/` with `data.js`, `notes.js`, `diagrams.js`, the two
      workbook files, the production task's data, `assessment.js`, `games.js`
- [ ] `meta.track === 'ADD_MATH'` and `meta.id` matches the folder
- [ ] English only — no `vn*` fields anywhere
- [ ] Tasks total ≥ 100 XP; every gate ≤ 80% of the XP before it
- [ ] ≥ 2 `check` questions in the deck (aim for one every second or third slide)
- [ ] Assessment key spread across A/B/C/D; every distractor is a nameable mistake
- [ ] `npm run audit:svg ADD_MATH` clean
- [ ] `npm run validate` green
- [ ] `npm run sync-audio`, then re-run the validator (missing slide audio is an **error**)
- [ ] Walked every task in `preview-addmath.html` (`?unit=<UNIT>`, `?done=id1,id2` to
      resume part-way through a task)
