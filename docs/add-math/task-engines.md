# Additional Mathematics — the task engines

The screens an `ADD_MATH` unit can put in front of a student, what each one is
*for*, and the exact data it reads. Read with [../add-math-course.md](../add-math-course.md)
(how to build a unit) and [notes-and-activities.md](notes-and-activities.md) (the deck).

**The rule every engine here follows: the item stores the question, and the
code derives the answer.** No answer keys are authored for Graph It, Long Division,
Case Solver or Sketch It, so none can drift from the question, and `npm run validate`
re-derives every item with the code the task grades with and refuses one the student
could not finish on screen. The Workbook is the one engine that carries authored keys,
and §5 says how to write ones the marking engine can actually mark.

| Engine | Task id · dbKey | Screen | Derivation | Book use |
|---|---|---|---|---|
| Case Solver | `MOD_SOLVE` · p30 | `src/tasks/ModulusSolver.jsx` | `src/utils/modulus.js` | modulus equations and inequalities (4.1, 4.2) |
| Sketch It | `CUBIC_SKETCH` · p31 | `src/tasks/CubicSketch.jsx` | `src/utils/cubic.js` | cubic sketching and its modulus (4.3) |
| Graph It | `GRAPH` · p15 | `src/tasks/GraphPlot.jsx` | `src/utils/graphCurve.js` | modulus graphs, quadratics |
| Long Division | `POLY_DIV` · p21 | `src/tasks/PolyDivision.jsx` | `src/utils/polynomial.js` | polynomial division (3.2) |
| Practice / Book Problems | `WORKBOOK` p11 · `WORKBOOK_B` p22 | `src/tasks/Workbook.jsx` | `src/utils/mathEquivalence.js` | any exercise, with worked solutions |

All four derived engines share one shape of screen and one scoring rule, so a student
who has met one has met them all: the question in a coloured strip; a **stage rail**
under it that ticks off the moves; one stage on screen at a time; **Check** and
**Show me** on every stage; a wrong answer can be retried, a second wrong answer (or
Show me) fills the stage in and the item **pays half**; a finished item prints the
working under **"Copy this into your book"**. Every one of them checkpoints after each
item (`onProgress`) and resumes on the first unfinished item.

---

## 1. Case Solver (`MOD_SOLVE`)

The production task for modulus equations and inequalities. It is the coursebook's
own method, staged, with the one thing paper cannot do: the substitution check happens
with both sides **evaluated on screen**, so an extraneous root dies in front of the
student.

```js
// src/data/ADD_MATH/<UNIT>/modulusSolve.js
export const modulusSolve = {
  title: 'Case Solver',
  intro: 'Shown under the first question only.',
  items: [
    { id: 'q1a', L: [2, -1], R: { abs: [1, 0] }, rel: '=' },                 // |2x − 1| = |x|
    { id: 'q1h', L: [2, -1], R: { abs: [-2, 6] }, rel: '=',
      display: '|2x - 1| = 2|3 - x|', note: 'Take the 2 inside first.' },   // folded, printed as set
    { id: 'exA', L: [1, 0], R: { lin: [2, -3] }, rel: '=' },                 // |x| = 2x − 3 (extraneous root)
    { id: 'neg', L: [2, -9], R: { num: -4 }, rel: '=', expectNone: true },   // over at stage 1
    { id: 'q3a', L: [2, -3], R: { num: 5 }, rel: '>' },                      // two rays
    { id: 'q5e', L: [1, 3], R: { abs: [2, 0] }, rel: '>=', line: { min: -8, max: 8 } },
  ],
};
```

- `L: [a, b]` is the modulus $|ax + b|$ on the left. `R` is **exactly one** of
  `{ abs: [c, d] }` (another modulus), `{ lin: [c, d] }` (a plain expression, the shape
  that invents false roots) or `{ num: k }`. `rel` is `=`, `<`, `<=`, `>` or `>=`.
- **Fold a coefficient into the bars** — $2|3 - x|$ is `abs: [-2, 6]` — and give the
  book's printing in `display`. The derived cases use the folded form, which is what the
  book's own solution does ("take the 2 inside").
- **The stages are derived from the shape.** An equation runs *name the shape → write
  the cases → solve each case → check each answer*; an inequality runs *name the shape →
  find the critical values → solve → shade the number line*; a negative number on the
  right is over after stage 1. `shapeOf` / `ruleOf` in `utils/modulus.js` decide, and the
  shape stage's four options are fixed per kind (`EQ_SHAPES`, `INEQ_SHAPES` in the
  component) so the student learns the same four names every time.
- **Inequalities are finished by testing, not by a rule.** The critical values are the
  case solutions; each region between them is tested in the *original* inequality with
  exact fractions, and the shaded set is what the number line is marked against. That is
  what makes a number on the right, a modulus on the right and an expression that may go
  negative all fall to one method, and it can never produce the piece squaring invents.
  The derived working still quotes the book's rule (`−k ≤ p ≤ k`, "square both sides")
  above the test lines.
- `line: { min, max }` sizes the number line (default −8..8). Every critical value must
  sit strictly inside it, or the validator refuses the item.
- `expectNone: true` is required for a deliberately unsolvable item, so an accidental
  negative right-hand side is caught.
- Order items so each adds one idea — see the header of `AM_4A/modulusSolve.js` for the
  sixteen-item order that unit uses and why.

Scoring: 1 per clean item, ½ once helped, out of the item count → nativeMax 10.

## 2. Sketch It (`CUBIC_SKETCH`)

The production task for §4.3. A cubic in factorised form is sketched the way the book
sketches it, one decision at a time, and for the modulus the student **taps the pieces
below the axis** and watches them fold.

```js
// src/data/ADD_MATH/<UNIT>/cubicSketch.js
export const cubicSketch = {
  title: 'Sketch It',
  intro: '…',
  items: [
    { id: 'we7', factors: [[2, -1], [-1, 2], [1, 1]], display: '(2x - 1)(2 - x)(x + 1)' },
    { id: 'we8', factors: [[1, -1], [1, -1], [1, 1]], display: '(x - 1)^2(x + 1)' },        // repeated: written twice
    { id: 'q5b', factors: [[-2, 5], [1, 1], [1, 2]], k: 2, display: '2(5 - 2x)(x + 1)(x + 2)', modulus: true },
    { id: 'q6b', factors: [[1, -1], [1, 2], [1, 3]], expanded: 'x^3 + 4x^2 + x - 6' },     // factorise first
  ],
};
```

- `factors` is exactly three `[p, q]` brackets ($px + q$), in the book's order, a
  repeated factor **written twice**. `k` is the number in front (default 1). `display` is
  the printed form when the derived one would differ (the derived form writes $(2 - x)$
  as $(-x + 2)$); `expanded` is the printed polynomial for a "factorise, then sketch"
  question; `modulus: true` adds the reflect stage.
- **Stages:** *factorise* (only with `expanded`: three boxes, one linear factor each,
  marked by multiplying them back so any correct factorisation is accepted) → *x-intercepts*
  (one box per factor, any order, a repeated root typed twice, matched as a multiset) →
  *y-intercept* → *end behaviour* (two buttons; the explanation names the product of the
  x coefficients) → *cross or touch* at each distinct root → the curve is drawn →
  *reflect* (tap the arcs below the axis; they fold up into $|f(x)|$).
- The figure (`src/components/math/CubicFigure.jsx`) is shared with the `reflect`
  activity. It draws what a book sketch draws — axes, curve, intercepts with exact
  values — and no y scale, because a cubic's y values would flatten the shape.
- `npm run validate` checks three linear factors, a non-zero `k`, at least two distinct
  roots, and — the one that matters — that a printed `expanded` form really **is** the
  product of the factors, by compiling it and testing at five points. (A wrong
  factorisation looks fine in the data; this is how three of the AM_4B items were caught.)

## 3. Graph It (`GRAPH`)

Click the vertex, the zeros, or the crossings with a level line, on a lattice.
Schema and authoring rules in [../add-math-course.md](../add-math-course.md) §4.1
(unchanged): `curve: { kind: 'modulus' | 'quadratic', a, h, k }` is $y = a|x - h| + k$
or $y = a(x - h)^2 + k$; steps are `vertex`, `zeros`, `meets` (`at:` the level) and
`point`. Every target must be a whole-number point inside `grid`.

## 4. Long Division (`POLY_DIV`)

`{ dividend, divisor }` as **descending** coefficient arrays; everything else derived.
Schema in [../add-math-course.md](../add-math-course.md) §4.

## 5. Workbook (`WORKBOOK`, `WORKBOOK_B`) — writing keys the engine can mark

The slide-per-problem practice screen with typed / multiple-choice / fill-the-blanks /
dropdown / drag answers and a stepped **Show solution**. General schema in
[../workbook-tasks.md](../workbook-tasks.md). The rules that are specific to this
track, because the marking engine (`utils/mathEquivalence.js`) has limits an author has
to know:

| Answer shape | Use | Why |
|---|---|---|
| one value, `x = 6`, a fraction | typed box | parsed and compared numerically |
| one inequality, `x > \dfrac{2}{3}` | typed box | side-swaps and sign flips handled |
| a chain, `-1 < x < 2` | typed box | compound relations handled natively |
| **two values**, two rays, coordinates, "find a, b and k" | `fill_blank`, one box each, in a **stated order** | the engine has no idea what "or", "and" or a comma means |
| "which of these" / a described sketch | `mcq` | nothing to type |
| "factorise completely" | `mcq` only | equivalence is tested by sampling, so the expanded form marks as correct |

- Fractions in a `correct` field are `\dfrac` or `\frac`, **never `\tfrac`** (it is
  not rewritten and drops the answer into a string compare).
- Two-value blanks are labelled **Smaller** / **Larger** (or "left to right"); a
  two-ray answer prints the inequality signs in `textParts` and asks only for the numbers.
- A value that is right in two forms (Q10's $k = \pm 3$) uses `accept: ['-3']`.
- Attach the figure the question is about with `inlineSvg`; for a "sketch this"
  question use `type: 'mcq'` with `inlineSvgSolved` so the sketch appears on reveal.
- **Cover every part of the exercise across the unit's tasks, once.** The production
  task carries the parts it can stage; the Workbook slots carry the rest. Say which is
  where in each file's header (see `AM_4A/workbook.js`, `AM_4B/workbook.js`).
- Type each key into `preview-addmath.html` before shipping. A wrong `correct` passes
  `npm run validate`; the validator does not read workbook keys.

## 6. Adding an engine

1. The pure derivation in `src/utils/<thing>.js`: a `solve…`/`derive…` function from
   the question, a `check…Items(items)` returning problem strings, and the LaTeX for the
   finished working. Test it in a scratch script against the book's answers **before**
   any screen exists.
2. The screen in `src/tasks/<Thing>.jsx`, copying the stage rail / Check / Show me /
   pay-half / resume pattern from `ModulusSolver.jsx` (the shortest example).
3. One entry in `src/tasks/taskRegistry.js` (id, the next free dbKey, label, icon,
   colour, `hasContent`, `buildPool`, `props` with `savedData`/`onProgress`).
4. `checkXItems` wired into `scripts/validate-entry.js` next to `polyDiv`.
5. The arcade's Maths Bolt generator for the unit in `mathChallenges.js`, verified with
   an independent oracle over a few thousand samples.
6. A section here, and a line in the course guide's table.
