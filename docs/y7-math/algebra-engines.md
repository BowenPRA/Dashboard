# Year 7 algebra engines — Collect It, Expand It, Undo It, Pyramids

The self-study units for **2.3 Collecting like terms**, **2.4 Expanding brackets** and
**2.5 Constructing and solving equations** are built around four tasks and four deck
activities that a projector cannot do: the student *sorts* the terms, *fills* the grid,
*reverses* the flow chart and *builds* the pyramid, and every mark is derived from the
question. Read with [../y7-math-course.md](../y7-math-course.md),
[../classroom-dashboard-pairing.md](../classroom-dashboard-pairing.md) and the interaction
standard the Extended/Additional Maths decks set
([../ext-math/notes-and-widgets.md](../ext-math/notes-and-widgets.md),
[../add-math/notes-and-activities.md](../add-math/notes-and-activities.md)).

**Derive, don't store.** An item states the question only. `src/utils/algebra.js` and
`src/utils/pyramid.js` work out the terms, kinds, basket totals, grid boxes, expansions,
flow charts, solutions and the *name* of the slip behind a wrong answer, and the
validator (`npm run validate`) runs the same functions — an item the engine cannot
finish, or whose own answer it would mark wrong, fails the build.

---

## 1. The unit shape (2.3 onward)

| Phase | Gate | Task | XP |
|---|---|---|---|
| concept | 0 | NOTES — interactive deck | 20 |
| concept | 0 | WORD_REC — 5–6 key words | 15 |
| practice | 25 | WORKBOOK — Practice, 10–12 Q, tiered, mixed widgets | 20 |
| practice | 25 | the unit's engine — COLLECT_TERMS / EXPAND_GRID / FLOW_SOLVE | 25 |
| practice | 25 | ALG_PYRAMID — generative | 15 |
| practice | 25 | SHORT_ANSWERS — 4 reasoning Q | 20 |
| mastery | 80 | ASSESSMENT — 8 MCQ | 20 |
| mastery | 80 | GAMES | 0 |

135 XP available, capped at 100. Gates: 25 of 35 (71%), 80 of 115 (70%) — under the
80% rule. `WORKBOOK_B` (Book Problems) is retired from these units: the engine now
rehearses the exercise's shapes, with fresh numbers.

Dashboard keys: `COLLECT_TERMS p39 · EXPAND_GRID p40 · FLOW_SOLVE p41 · ALG_PYRAMID p42`.

---

## 2. Engine schemas (unit data keys)

Everything learner-facing is bilingual (`…Vn`). Levels are `{ n: { en, vn } }` and an
item's `level` may only climb through the list.

### 2.1 Collect It — `collectTerms` (2.3)

```js
collectTerms: {
  title: 'Collect It', titleVn: 'Gộp hạng tử',
  intro: '…', introVn: '…',                       // optional, shown on the first item
  levels: {
    1: { en: 'One kind', vn: 'Một loại' },
    2: { en: 'The invisible 1', vn: 'Số 1 vô hình' },
    …
  },
  items: [
    { id: 'c1', level: 1, expr: '2b + 3b' },
    { id: 'c7', level: 4, expr: '7x + 5y − 3x + y' },
    { id: 'c9', level: 5, expr: '3ab + 2 + 4ba − 1' },
    { id: 'c12', level: 6, expr: '2x + 1 + x + 2x + 1 + x',
      context: 'The perimeter of a rectangle with sides 2x + 1 and x.', contextVn: '…' },
  ],
}
```

`expr` is a sum of single terms (no brackets): whole-number coefficients, letters,
powers (`x^2` or `x²`), `−` or `-`. Kinds are derived: `ab` and `ba` are one kind, `x` and
`x²` are two, numbers are a kind. An expression with **no** like terms is allowed — the
engine asks "can it be simplified?" and the answer is no. Refused: one term, more than 8
terms, an answer of 0.

**Stages** (the component derives them): *Find* — sort each term chip, sign attached,
into a basket per kind · *Collect* — type each basket's total (the slips named: the
invisible 1, the sign left behind, the letter vanishing) · *Write* — type the answer in
simplest form (marked by value **and** form; `5x + 2x` is "right value, not finished").

Suggested ladder: one kind → the invisible 1 → two kinds → keep the sign → tricky kinds
(numbers, ab = ba, x vs x²) → lengths and perimeters (with `context`). 14–18 items.

### 2.2 Expand It — `expandGrid` (2.4)

```js
expandGrid: {
  title: 'Expand It', titleVn: 'Khai triển',
  levels: { 1: { en: 'Every term', vn: '…' }, … },
  items: [
    { id: 'e1', level: 1, expr: '5(a + 3)' },
    { id: 'e4', level: 3, expr: '4(3 − c)' },
    { id: 'e9', level: 5, expr: '8(6 + 4w − 3g)' },
    { id: 'e11', level: 6, expr: '5(2x − 2) + x + 17' },          // expand and simplify
    { id: 'e13', level: 7, expr: '4(x + 4) + 7(x + 1)' },
    { id: 'e15', level: 8, kind: 'missing', expr: '4(2x + 3)', hide: ['outer'] },
    { id: 'e16', level: 8, kind: 'missing', expr: '5(2y − 7)', hide: ['inner:1'] },
  ],
}
```

`expr`: brackets `k(…)` (the outside a single term, the inside up to three terms) plus
loose terms, up to three brackets; `−3(x + 1)` is allowed. `kind: 'missing'` blanks the
outside number (`'outer'`) or an inside number (`'inner:<i>'`) and shows the expansion —
"work backwards". Refused: no brackets, more than three inside terms, an expansion of 0.

**Stages:** *Grid* — type each box (outside × inside; slips named: not multiplied,
added, sign, letter) · *Write* — type the expansion (no brackets; "first term only" and
"carried on past the answer, 12 − 4c = 8c" named) · *Collect* — only when like terms
appear after expanding · *Missing* items: type the blank, then see the grid fill.

Suggested ladder: positive → the number first (9(3 + y)) → minus inside → a number times
a letter (5 × 2p) → three terms → expand and simplify → two brackets → work backwards.

### 2.3 Undo It — `flowSolve` (2.5)

```js
flowSolve: {
  title: 'Undo It', titleVn: 'Làm ngược lại',
  levels: { … },
  items: [
    { id: 'f1', level: 1, eq: 'x + 8 = 20' },
    { id: 'f4', level: 2, eq: 'n/4 = 5' },                     // ÷ written / or ÷
    { id: 'f6', level: 3, eq: '35 = 5x' },                      // either way round
    { id: 'f8', level: 4, ops: [['*', 6], ['-', 4]], result: 32, letter: 'n' },   // I think of a number
    { id: 'f10', level: 5, eq: '2a + 4 = 18' },
    { id: 'f13', level: 6, eq: '3(x + 2) = 21' },               // bracket: + first, then ×
    { id: 'f14', level: 6, eq: '4n + 7 = 43',
      story: 'Mr Bowen buys 4 notebooks and a pen that costs 7 thousand dong. He pays 43 thousand dong.',
      storyVn: '…' },
  ],
}
```

`eq`: one letter, on one side, in a chain of `+ − × ÷` with whole numbers (`2a + 4`,
`x/4 − 3`, `3(x + 2)`, `6 + x`). `ops` items are "I think of a number": the sentence and
the equation are both generated from the chain. A `story` item first asks which of four
derived equations fits (slips: operations in the wrong order, a step missing, the inverse
written). Refused: `20 − x` (a number minus the letter), the letter twice, a chain that
passes through a fraction when undone, more than three operations. Negative solutions are
fine (the plant that was −4 cm tall).

**Stages:** *Equation* (story/ops items) · *Forward* — put the operations on the arrows in
order, from the letter · *Reverse* — choose each inverse, last step first, and type each
box · *Check* — substitute: type the value of the left side.

### 2.4 Pyramids — `pyramids` (2.3, 2.4, 2.5)

```js
pyramids: { title: 'Algebra Pyramids', titleVn: 'Kim tự tháp đại số', modes: ['up', 'down'], rounds: 6 }
```

Generated fresh every attempt from `utils/pyramid.js`. Modes: `up` (build every block
from the bottom row), `down` (three blocks given anywhere; add up, subtract down),
`brackets` (bottom blocks hold brackets — expand then collect), `solve` (the top is a
number: build the top expression, then solve for the letter). 2.3 `['up', 'down']`, 2.4
`['brackets', 'up']`, 2.5 `['solve', 'down']`. Each typed block is marked by value and
simplest form.

---

## 3. Deck activities (Notes `activity:` blocks)

The four maths types added for these units, alongside `sort · order · predict · estimate`
(schemas in [../y7-science/ENGAGEMENT-PLAN.md](../y7-science/ENGAGEMENT-PLAN.md) §2.1).
All carry `id, type, prompt, promptVn, explain, explainVn`; `explain` is shown after the
answer, right or wrong, alongside a derived line that names the slip. The block is the
**last key** on its slide; `prompt` is not narrated.

```js
// Sort the signed terms into like-term baskets (derived from the expression).
activity: { id: 'act_terms', type: 'terms', expr: '7x + 5y − 3x + y', prompt, promptVn, explain, explainVn }

// Type an answer. simplify/expand: marked by value AND form; solve: the number.
activity: { id: 'act_simp', type: 'algebra', mode: 'simplify', expr: '8s − s', … }
activity: { id: 'act_exp', type: 'algebra', mode: 'expand', expr: '3(x + 2) + 4x', … }
activity: { id: 'act_solve', type: 'algebra', mode: 'solve', eq: '2a + 4 = 18', … }

// Fill the expansion grid, box by box (ONE bracket).
activity: { id: 'act_grid', type: 'grid', expr: '4(3 − c)', … }

// Reverse the flow chart: pick each inverse, last step first, type each box.
activity: { id: 'act_flow', type: 'flow', eq: '2a + 4 = 18', … }
```

`terms` needs 3–8 terms and at least two kinds. `grid` is one bracket with up to three
terms. `flow` and `algebra/solve` must undo through whole numbers.

---

## 4. The deck (what "interactive" means here)

The classroom deck (`C:\Users\bowen\lessons\content\y7-math\U02_N`) is the source; the
reduction rules are [../classroom-dashboard-pairing.md](../classroom-dashboard-pairing.md) §3.
On top of those, the density the Extended/Additional Maths decks proved:

- **24–28 slides, 16–20 scored items**: 8–10 `check`s and 8–10 `activity` blocks, spread
  so no three slides in a row are unscored and no two activities in a row are the same
  type. At least five activity types, including every type of §3 the unit owns.
- **Every classroom vote becomes a `predict`** on the same slide as the question
  ("Which is right: 8 or 7s?"), and the next slide settles it.
- **Every "whiteboards" practice slide becomes an `algebra` activity** (one question from
  it, typed) with the rest of its questions in a `reveal` — never "on paper".
- **Room games become activities**: Like or Not? → a `sort` of pairs; Right or Wrong? → a
  `sort` or `predict`; Check It! → `algebra/solve`.
- **The classroom widgets port as showcase steppers** (the "say it before you press"
  widgets): keep them, with a check or activity on the slide after.
- A slide with an interaction on it needs less text — two or three short sentences.
- `check`: `{ id, q, qVn, options: [{ val: 'A', text, textVn }, …], correct, expEn, expVn }`
  — distractors are nameable slips and `expEn` names them. Spread correct answers A/B/C.
- `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in `content`,
  a callout body and `reveal.answer`.

Checklist before `npm run validate`: bilingual everywhere · `check`/`activity` last on
the slide · no "whiteboard / pairs / hands up / on paper" · no Learner's Book scan ·
`npm run audit:svg Y7_MATH` clean · walked in `preview-y7math.html?unit=<UNIT>`.
