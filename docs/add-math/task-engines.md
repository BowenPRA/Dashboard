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
| Plot the Circle | `CIRCLE_PLOT` · p61 | `src/tasks/CircleLab.jsx` (mode `plot`) | `src/utils/circle.js` | reading centre and radius; what a circle does at the axes (7.1) |
| Write the Equation | `CIRCLE_EQ` · p62 | `src/tasks/CircleLab.jsx` (mode `eq`) | `src/utils/circle.js` | the equation from a radius, a point, a diameter, a tangent axis (7.1) |
| Complete the Square | `CIRCLE_SQUARE` · p63 | `src/tasks/CircleLab.jsx` (mode `square`) | `src/utils/circle.js` | general form to centre and radius (7.1) |
| Undo It | `E_EXACT` · p66 | `src/tasks/ExpLab.jsx` (mode `exact`) | `src/utils/expEquations.js` | exact values and equations with e and ln (5.7) |
| Take Logs | `EXP_LOGS` · p64 | `src/tasks/ExpLab.jsx` (mode `logs`) | `src/utils/expEquations.js` | exponential equations by taking logs; ln equations (5.5, 5.7) |
| Hidden Quadratic | `EXP_QUAD` · p65 | `src/tasks/ExpLab.jsx` (mode `quad`) | `src/utils/expEquations.js` | substitution, keep or reject each value (5.5, 5.7) |
| Log Equation Solver | `LOG_EQ` · p67 | `src/tasks/LogEqLab.jsx` | `src/utils/logEquations.js` | log equations ending on "check each root" (5.4, 5.6) |
| Quadratic in a Log | `LOG_QUAD` · p68 | `src/tasks/LogEqLab.jsx` | `src/utils/logEquations.js` | quadratics in log x, reciprocal equations (5.4, 5.6) |
| Change of Base | `BASE_CHANGE` · p69 | `src/tasks/LogEqLab.jsx` | `src/utils/logEquations.js` | evaluating, rewriting and solving with a change of base (5.6) |
| Move the Curve | `CURVE_FAMILY` · p72 | `src/tasks/ExpGraphLab.jsx` | `src/utils/expGraphs.js` | what a constant k does to a family of curves (5.9) |
| Sketch the Curve | `EXP_SKETCH` · p70 | `src/tasks/ExpGraphLab.jsx` | `src/utils/expGraphs.js` | k·e^(nx) + a and k·ln(ax + b): intercepts, asymptote, shape (5.10) |
| Find the Inverse | `FN_INVERSE` · p71 | `src/tasks/ExpGraphLab.jsx` | `src/utils/expGraphs.js` | inverse of an exponential or log function, and its domain (5.11) |
| Log Simplifier | `LOG_SIMPLIFY` · p38 | `src/tasks/LogSimplify.jsx` | `src/utils/logs.js` | evaluating logs and the laws of logarithms (5.1–5.3) |
| Case Solver | `MOD_SOLVE` · p30 | `src/tasks/ModulusSolver.jsx` | `src/utils/modulus.js` | modulus equations and inequalities (4.1, 4.2) |
| Sketch It | `CUBIC_SKETCH` · p31 | `src/tasks/CubicSketch.jsx` | `src/utils/cubic.js` | cubic sketching and its modulus (4.3) |
| Graph It | `GRAPH` · p15 | `src/tasks/GraphPlot.jsx` | `src/utils/graphCurve.js` | modulus graphs, quadratics |
| Long Division | `POLY_DIV` · p21 | `src/tasks/PolyDivision.jsx` | `src/utils/polynomial.js` | polynomial division (3.2) |
| Practice / Book Problems | `WORKBOOK` p11 · `WORKBOOK_B` p22 | `src/tasks/Workbook.jsx` | `src/utils/mathEquivalence.js` | any exercise, with worked solutions |

The next free dbKey is **p73**.

All the derived engines share one shape of screen and one scoring rule, so a student
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

## 2a. Log Simplifier (`LOG_SIMPLIFY`)

The production task for §5.1–5.3. A log is evaluated by asking the power question,
and a sum of logs is simplified the way the book does it — numbers into logs, powers
inside, combine, then **is it an exact number?** — on a ladder of named levels that
only climbs. Beside the question, the **power ladder** draws the base's powers as
equally spaced rungs (with half- or third-rungs when the base is a square or a cube),
and once the student commits, a marker lands on a rung (an exact log) or between two
(log₅ 72 ≈ 2.66).

```js
// src/data/ADD_MATH/<UNIT>/logSimplify.js
export const logSimplify = {
  title: 'Log Simplifier',
  intro: 'Shown under the first question only.',
  levels: { 1: 'What a log asks', 2: 'One law at a time' /* … */ },
  items: [
    { id: 'e_2_32', level: 1, kind: 'evaluate', base: 2, arg: 32 },            // log₂ 32
    { id: 'e_3_ninth', level: 1, kind: 'evaluate', base: 3, arg: '1/9' },      // a negative power
    { id: 'e_5_root', level: 1, kind: 'evaluate', base: 5, arg: { root: 2, of: 5 } }, // log₅ √5
    { id: 'c_2_quot', level: 2, kind: 'combine', base: 2, terms: [[1, 40], [-1, 5]] }, // log₂ 40 − log₂ 5
    { id: 'c_2_half', level: 4, kind: 'combine', base: 2, terms: [['1/2', 36], [-1, 3]] },
    { id: 'n_3_two', level: 5, kind: 'combine', base: 3, number: 2, terms: [[1, 5]] }, // 2 + log₃ 5
  ],
};
```

- `base` is a whole number from 2 to 20; **base 10 prints as lg**, the book's notation.
- `evaluate`: `arg` is an integer, `'p/q'`, or `{ root, of }`. Stages: *power question*
  (pick $2^x = 32$ from four derived look-alikes: base and power swapped, base and number
  swapped, number as the power) → *find the power*.
- `combine`: `terms` is `[[coef, n], …]` for coef·log(n) — coef a non-zero integer or
  `'p/q'`, n a positive integer or `'p/q'`; `number` is a whole number written first.
  Stages are derived from the shape and skipped when there is nothing to do: *numbers to
  logs* → *power law* (the minus sign stays outside) → *combine* (one typed number; a
  fraction is fine, and an unreduced one is accepted and reduced) → *a number?* (yes / no,
  one try) → *find the power*, only when it is one.
- Everything is **exact**: a positive number is held as prime exponents with rational
  powers, so "is log₈ ½ an exact number?" is decided without floating point (it is −⅓).
- Wrong answers are diagnosed from the item: adding the numbers inside, multiplying by a
  minus log, the coefficient multiplied instead of raised, only the root of a ⅔ power,
  the base times the number, a reciprocal or sign-flipped power.
- `npm run validate` (`checkLogItems`) refuses: an `evaluate` that is not exact, a power
  law that leaves a root inside, an item with nothing to simplify, a denominator above 4
  in the answer, anything too big to type or to draw, and **levels out of order**. Every
  `level` needs a name in `levels`.

Scoring: 1 per clean item, ½ once helped, out of the item count → nativeMax 10.

## 2b. Circle Lab (`CIRCLE_PLOT`, `CIRCLE_EQ`, `CIRCLE_SQUARE`)

Three tasks on one screen (`CircleLab.jsx`; the registry passes `mode`), **one per
question type** of Exercise 7.1 — the blueprint in
[../add-math-course.md](../add-math-course.md) §9. A lattice grid (−10..10 by default)
sits beside the stage card. Every finished circle is **swept onto the grid with points
on it marked** — lattice points when it has them, the four compass points with exact
surd coordinates when not — and one of them is substituted back into the equation.

```js
// src/data/ADD_MATH/<UNIT>/circlePlot.js   — (x − a)² + (y − b)² = r2
export const circlePlot = {
  title: 'Plot the Circle', intro: '…', levels: { 1: 'Centred at the origin' /* … */ },
  items: [
    { id: 'o_49', level: 1, centre: [0, 0], r2: 49 },
    { id: 'o_scale', level: 1, centre: [0, 0], r2: 25, scale: 3 },          // prints 3x² + 3y² = 75
    { id: 'surd_12', level: 4, centre: [-5, 4], r2: 12 },                   // radius 2√3, typed
    { id: 'ax_touch', level: 5, centre: [3, -2], r2: 9, axes: true },       // + "what happens at each axis"
  ],
};

// circleEq.js — what is given decides the stages
{ id: 'r', kind: 'radius',   centre: ['3/2', '-1/4'], r2: 4 }                // write it
{ id: 'p', kind: 'through',  centre: [1, -2], point: [4, 2] }                // r², then write it
{ id: 'd', kind: 'diameter', A: [-2, -1], B: [6, 5] }                        // centre, r², write it
{ id: 't', kind: 'touch',    centre: [-4, 5], axis: 'x' }                    // radius, write it

// circleSquare.js — kx² + ky² + Dx + Ey + F = rhs
{ id: 'two_a', coef: [1, -6, 4, -12] }
{ id: 'rhs_a', coef: [1, -4, 6, 0], rhs: 12 }                                // constant printed on the right
{ id: 'div_4', coef: [4, -4, 24, 1] }                                        // divide first; centre at a half
{ id: 'not_neg', coef: [1, 4, -6, 15], notCircle: true }                     // ends on "what is it, then?"
```

- **Plot** — *centre* (click it; the sign-flipped point, one flipped sign and swapped
  coordinates each get their own message) → *rim* (click any lattice point on the
  circle, when the radius is a whole number) or *radius* (typed as `[k]√[n]`; the right
  length unsimplified is a nudge, not a miss) → *axes* (crosses twice / touches / misses,
  asked **before** the circle is drawn, only with `axes: true`).
- **Write the Equation** — the missing piece first (*centre* clicked at the midpoint of a
  diameter; *r²* from the dashed right-angled triangle drawn to the point; *radius* from
  the distance to the tangent axis), then the equation filled into
  `(x ± ▢)² + (y ± ▢)² = ▢` with sign toggles. A zero coordinate is typed as `0`.
- **Complete the Square** — *divide* (only when k ≠ 1) → *square in x* → *square in y*
  (a stage is skipped when that term is absent) → *tidy up* (the right-hand side) →
  *centre* (clicked, or typed when it is at a half) → *radius*; or, when the right-hand
  side is zero or negative, → *what is it?*
- r² is always a whole number; a `square` item's centre may be at halves. Centres that
  are clicked must be whole-number points.
- `npm run validate` (`checkCircleItems`) refuses: a circle that does not fit the grid, a
  clicked centre that is not a lattice point, a sign-flipped centre that is off the grid
  (the mistake must be clickable), a diameter with a fractional midpoint, a `square`
  item with nothing to complete, an equation that is not a circle without
  `notCircle: true` (and one marked so that is), and **levels out of order**.
- An item may override `grid`. Pick numbers so that |centre| + radius ≤ 10.

Scoring: 1 per clean item, ½ once helped, out of the item count → nativeMax 10.

## 2c. Exp Lab (`E_EXACT`, `EXP_LOGS`, `EXP_QUAD`)

Three tasks on one screen (`src/tasks/ExpLab.jsx`; the registry passes `mode`), **one
per question type** of Exercises 5.5 and 5.7 — the blueprint in
[../add-math-course.md](../add-math-course.md) §9, applied to `AM_5B`. The maths is
`src/utils/expEquations.js`, and it does more than in the other engines: it derives
every **stage** — its options and what is wrong with each, its boxes and how they are
marked, its lines of working — so the screen only renders three kinds of stage (a
choice, a row of typed boxes, keep-or-reject rows). Every message quotes the question's
own numbers. A finished item prints its working, the answer, and a check: the answer
put back in (to 3 s.f. it comes out *close*, and says why), and for a plain power a
sense check between two whole powers ($2^5 < 45 < 2^6$).

```js
// src/data/ADD_MATH/<UNIT>/undoIt.js   (mode 'exact') — e and ln undo each other
{ id: 'v', kind: 'value', front: 4, terms: [[1, 3]] }             // 4e^(ln 3)
{ id: 'm', kind: 'value', terms: [[1, 6], [-1, 2]] }              // e^(ln 6 − ln 2)
{ id: 'w', kind: 'lnpow', power: -2 }                              // ln(1/e²), printed by its shape
{ id: 's', kind: 'solve', form: 'exp', k: 2, rhs: 49 }            // e^(2 ln x) = 49 → reject −7
{ id: 't', kind: 'solve', form: 'ln', k: 2, rhs: 9 }              // ln e^(2x) = 9

// takeLogs.js   (mode 'logs')
{ id: 'a', kind: 'exp', base: 5, power: [3, -1], rhs: 60 }        // 5^(3x − 1) = 60, 3 s.f.
{ id: 'b', kind: 'exp2', left: { base: 3, power: [1, 1] }, right: { base: 7, power: [1, -1] } }
{ id: 'c', kind: 'exp', base: 'e', power: [-1, 0], rhs: 1, coef: -2, add: 5, give: 'exact' } // 5 − 2e^(−x) = 1
{ id: 'd', kind: 'ln', arg: [3, -2], rhs: 2 }                     // ln(3x − 2) = 2
{ id: 'f', kind: 'ln', arg: [1, 0], rhs: 5, coef: 2 }             // 2 ln x = 5

// hiddenQuad.js   (mode 'quad') — a term is a number, or [c, m, k] for c·base^(mx + k)
{ id: 'g', base: 3, lhs: [[1, 2, 0], [-4, 1, 1], 27], rhs: [0], given: true }   // 3^(2x) − 4(3^(x+1)) + 27 = 0
{ id: 'h', base: 2, lhs: [[1, 1, 0, 4], [-5, 1, 0], -24], rhs: [0] }            // 4^x − 5(2^x) − 24 = 0
{ id: 'i', base: 'e', lhs: [[1, 1, 0], [8, -1, 0]], rhs: [6], give: 'exact' }   // e^x + 8e^(−x) = 6
{ id: 'j', base: 2, lhs: [[1, 1, 3], [-1, 1, 0]], rhs: [21], linear: true }     // 2^(x+3) − 2^x = 21
{ id: 'k', base: 2, lhs: [[1, 2, 0], [5, 1, 0], 6], rhs: [0], expectNone: true } // no solutions
```

- **Undo It** — *one log* (a number in front of ln becomes a power; a minus sign is a
  power of −1; logs combine) → *undo* (the value). `lnpow` rewrites $\tfrac{1}{e^2}$ or
  $\sqrt{e}$ as a single power of $e$ first. `solve` picks the simplified left-hand side
  from four look-alikes ($x^2$ / $2x$ / $x$ / $e^2x$), types the root(s), and an even
  power ends on **keep or reject** — $\ln(-7)$ does not exist.
- **Take Logs** — *first move*: the same four named moves on every question (get the
  power or the log on its own / take lg / take ln / make each side a power of e), and
  which is right changes with the question — lg and ln are both right for a whole-number
  base, lg is a nudge (not a miss) for base e, and taking a log of $3e^x - 2$ is wrong.
  → *isolate* (typed, when there is a coefficient or a constant) → *power down* or *undo
  the log* (pick the line: the missing bracket, the subtracted log, the lost logs, the
  wrong base) → *collect x* (two bases: the unexpanded bracket, the sign that did not
  change) → *work it out*: the working value to at least 4 s.f. and $x$ to 3 s.f., or
  the exact form picked from four (the sign of $q$, the constant inside the log, divided
  before subtracting, $e^k$ for $\ln k$). The register — 3 s.f., in terms of ln, exact —
  is printed on every question.
- **3 s.f. marking** (`judgeSf`): the right value to more figures is a nudge; a dropped
  trailing zero ($1.3$ for $1.30$) is accepted with a note; a truncation, a rounding to
  decimal places, too few figures, a sign slip and every derived wrong value
  ($\lg \tfrac{45}{2}$ for $\tfrac{\lg 45}{\lg 2}$, upside down, the order of undoing)
  each get their own message. A working value rounded to 3 figures is a nudge.
- **Hidden Quadratic** — *substitute* (skipped when `given`; $y = 4^x$ for a disguised
  base and $y = 2^{2x}$ are wrong, $y = 2^{x+3}$ and $y = e^{-x}$ are nudges) → *clear
  1/y* (only with $e^{-x}$) → *write in y*: the coefficients of $Ay^2 + By + C = 0$,
  any non-zero multiple accepted (a one-term item types $By = C$ instead), with the
  forgotten shift, $4^x$ as $2y$, the unflipped sign and the constant not multiplied by
  $y$ each named, and each power's rewrite listed after a miss → *solve for y* (either
  order; the factorised form appears) → **keep or reject**, one try: a fraction and $1$
  are kept (the traps that look wrong), zero and negatives are rejected → *back to x*:
  an exact power of the base is typed exactly, anything else to 3 s.f.; base $e$ with
  `give: 'exact'` picks the full answer ($\ln 3$ or $\ln 4$) from four. After the keep
  stage the curve $y = a^x$ is drawn (`src/components/math/ExpCurve.jsx`) with each value
  of $y$ as a line — the kept ones meet it, the rejected ones never can.
- `npm run validate` (`checkExpItems`, imported as `checkExpLabItems`) refuses: a
  right-hand side that is an exact power of the base (it needs no logs), two bases that
  are powers of one number, a quadratic whose roots are irrational or repeated, a single
  term in $y$ without `linear: true`, no surviving root without `expectNone: true` (and
  either flag when it is not so), a power that leaves a root inside a log, a stage with
  a wrong option that is secretly right or two options that read the same, a typed stage
  that does not accept its own answer, an answer too big or small to type or sitting on
  a rounding boundary, a shift on a power of $e$, and **levels out of order**. Every
  level needs a name in `levels`.

Scoring: 1 per clean item, ½ once helped, out of the item count → nativeMax 10.

## 2d. Log Equation Lab (`LOG_EQ`, `LOG_QUAD`, `BASE_CHANGE`)

Three tasks on one screen (`src/tasks/LogEqLab.jsx`; the registry passes `mode`), one
per question type of Exercises 5.4 and 5.6, built by the §9 blueprint for `AM_5C`. The
thread through all three is **rejecting a root**: the Solver's last stage is a check
the app evaluates and the student decides.

| Task | dbKey | mode | Pool | Bank types |
|---|---|---|---|---|
| Log Equation Solver | p67 | `eq` | `unit.logEq` | 5.4 A–D, 5.6 F, two related bases ending in a quadratic |
| Quadratic in a Log | p68 | `quad` | `unit.logQuad` | 5.4 E, 5.6 I–J |
| Change of Base | p69 | `base` | `unit.baseChange` | 5.6 A–E, G–H |

**The derivation owns the stages.** `modelOf(mode, item)` in `src/utils/logEquations.js`
returns the question and a list of stages, each one of three generic kinds the screen
draws: `pick` (choose a line; distractors derived from the item, each with its own
message), `fill` (typed boxes and surd chips, with a `judge(typed)` that marks each
box and names the mistake with the item's own numbers) and `keep` (keep or reject each
root). Every number is exact (rationals and prime-exponent powers from `logs.js`);
floating point is used only for the "3 significant figures" answers and for the two
sides printed beside a kept root. A finished item prints its working as `{ text, tex? }`
sentences and KaTeX lines under "Copy this into your book".

```js
// logEq.js — base, and the terms on each side
{ id: 'c_coef', level: 3, base: 2, L: [[2, 'x'], [-1, 'x + 3']], R: [2] }       // 2 log₂ x − log₂(x + 3) = 2
{ id: 'b_move', level: 2, base: 3, L: [[1, '7x + 3']], R: [2, [1, 'x - 1']] }    // a log to move across first
{ id: 'd_move', level: 4, base: 'x', L: [[1, 75]], R: [2, [1, 3]] }             // unknown base
{ id: 'f_eval', level: 5, base: 2, L: [[1, 3, 9], [1, 'x - 1']], R: [[1, 32, 4]] } // [coef, arg, otherBase]
{ id: 'c_none', level: 3, base: 3, L: [[1, 'x - 5'], [1, 'x - 2']], R: [[1, '4 - 2x']], expectNone: true }

// logQuad.js — ['sq', a] a(log x)², ['log', c, n] c·log(xⁿ), ['rec', c] c·log_x b
{ id: 'd_cube', level: 2, base: 2, L: [['sq', 1], ['log', -1, 3]], R: [4] }     // (log₂ x)² − log₂(x³) = 4
{ id: 'r_frac', level: 4, base: 3, L: [['log', 1], ['rec', 1]], R: ['5/2'] }    // log₃ x + log_x 3 = 5/2

// baseChange.js — kind decides the stages
{ kind: 'evaluate', base: 5, arg: '0.4' }                                      // estimate → rule → 3 s.f.
{ kind: 'swap', given: 5, letter: 'u', of: 'x', num: { root: 2, of: 5 } }       // u = log₅ x: log_x √5
{ kind: 'rebase', given: 9, letter: 'x', of: 'y', target: 3, times: 27 }        // x = log₉ y: log₃(27y)
{ kind: 'from2', base: 'a', a: ['P', 4], b: ['Q', 10], find: ['Q', 'P'] }       // log_Q P
{ kind: 'product', logs: [[3, 5], [5, 9]] }                                     // log₃ 5 × log₅ 9
{ kind: 'related', base: 2, L: [[5, 2], [-2, 4]], R: [12] }                     // 5 log₂ x − 2 log₄ x = 12
```

- **Solver** (`eq`). A term is a number, `[coef, arg]`, or `[coef, arg, otherBase]`; an
  `arg` is a number or a linear expression written as a string (`'2x - 7'`,
  `'4 - 2x'`); `base: 'x'` makes the unknown the base (every arg is then a number).
  Stages, each skipped when there is nothing to do: *evaluate the numbers* (a log of a
  number to another base — every exact numerical log is then evaluated) → *change the
  base* (a log of x to a base that is a power of the item's base; the equation is then
  multiplied through to clear the fraction) → *collect the logs* (logs on one side and
  the number on the other: a pick, with "the log kept its sign" and "the numbers were
  added" as the wrong lines) → *power law* (typed) → *combine* (a pick of the whole
  equation — insides added, the sign flipped, upside down — or typed when the base is x)
  → *remove the logs* (equal logs: a pick; a number: exponential form, typed) → *make a
  quadratic* (three signed boxes, any non-zero multiple accepted) → *solve* (one or two
  roots, any order) → **check each root**. The check shows what goes inside every log
  of the ORIGINAL equation at each root (or what the base would be); the student keeps
  or rejects each, one try; afterwards a strip draws where every log exists and where
  each root landed.
- **Quadratic in a Log** (`quad`). *Power down* (typed, when a log has x to a power
  inside) → *change the base* (a pick: `log_x b` is `1 / log_b x`, against `−log_b x`,
  `log_b x` and `1 / log_x b`) → *substitute* (the quadratic in u, three boxes) → *solve
  for u* (the lost root u = 0 from dividing by the log is named) → *back to x* (typed,
  or a chip row when x is a surd: `√7`, `1/√10`). Nothing is rejected here, and the
  working says why.
- **Change of Base** (`base`). Every kind opens on the rule as a pick of the quotient
  against upside down, a difference and a product. `evaluate`: *estimate* (between which
  two whole numbers) → *rule* → *value*, typed to 3 s.f. (the right value unrounded, or
  2 s.f., is a nudge, not a miss). `swap` / `rebase`: *rule* → *the numerical logs*
  (typed) → *simplify* (a pick, only when there is a fraction to clear). `from2`: *rule*
  → *value*. `product`: *cancel* (which single log is left) → *value*. `related`:
  *change the base* (typed log_b B) → *collect* (`[a]u = [k]`, any multiple) → *solve*
  (u, then x).
- `npm run validate` (`checkLogEqItems(items, mode)`) refuses: a quadratic that does not
  factorise into two different rational roots, a cubic, a power of the base that is not
  rational (`log₂(…) = ½` would need √2), a power law that leaves a root inside, a
  foreign base that is not a whole-number power of the item's base (make the SMALLER
  base the item's base), a numerical log to another base that is not exact, an equation
  with **no surviving root unless it says `expectNone: true`** (and one marked so that
  has one), more than two roots to check, a pick whose wrong lines collapse into fewer
  than three options, a fill stage that does not accept its own derived answer, an
  `evaluate` that is an exact number (that is the Log Simplifier's job), a chain of logs
  that does not link, unbalanced KaTeX, and **levels out of order**. Every `level` needs
  a name in `levels`.

Scoring: 1 per clean item, ½ once helped, out of the item count → nativeMax 10.

## 2e. Exp Graph Lab (`CURVE_FAMILY`, `EXP_SKETCH`, `FN_INVERSE`)

Three tasks on one screen (`src/tasks/ExpGraphLab.jsx`; the registry passes
`mode`), one per question type of sections 5.9–5.11, built from the problem banks
by the blueprint in [../add-math-course.md](../add-math-course.md) §9 (`AM_5D`).
Everything is derived in `src/utils/expGraphs.js`; the picture is
`src/components/math/ExpCurveFigure.jsx`. Exact crossings are held as
`{ c, m }` = c·ln m and compared **exactly** (m₁^(p₁q₂) = m₂^(p₂q₁) in BigInt), so
½ ln 2, ¼ ln 4 and −½ ln ½ are all the same right answer.

| Task · dbKey · pool | Mode | Book type |
|---|---|---|
| Move the Curve · p72 · `unit.curveFamily` | `family` | 5.9 A, B |
| Sketch the Curve · p70 · `unit.expSketch` | `sketch` | 5.10 A, B, C |
| Find the Inverse · p71 · `unit.fnInverse` | `inverse` | 5.11 A, B, C |

```js
// curveFamily.js — the curve is drawn at k = from; the question is about k = to
{ id: 'add_asym', level: 1, family: 'exp_add', from: 1, to: -2, ask: 'asym' }
//   family: exp_add (eˣ + k) · exp_mult (keˣ) · exp_in (e^(kx))
//           ln_add (ln(x + k)) · ln_mult (k ln x) · ln_in (ln kx)
//   ask:    exp → yint | asym | crossX | shape | side;  ln → xint | asym | crossY | shape | side

// expSketch.js — only the function
{ id: 'e_cross', level: 1, kind: 'exp', k: 3, n: 1, a: -6 }     // y = 3eˣ − 6
{ id: 'ln_left', level: 6, kind: 'ln', k: 1, a: -3, b: 6 }      // y = ln(6 − 3x)

// fnInverse.js — only the function; numbers may be '1/2'
{ id: 'n_all', level: 3, kind: 'exp', k: 2, n: 3, a: -1 }       // f(x) = 2e³ˣ − 1
{ id: 'minus_e', level: 5, kind: 'exp', k: -1, n: 1, a: 3, order: 'const' }  // prints 3 − eˣ
{ id: 'ln_neg', level: 10, kind: 'ln', k: -2, a: 5, b: -1 }     // f(x) = −2 ln(5x − 1)
```

- **Move the Curve** — *predict* (a typed number, or one of two choices, BEFORE
  anything moves) → *move it* (the slider unlocks; Continue appears once it has
  reached `to`). The grid is fixed (−6..6), the starting curve stays as a dashed
  ghost, and a read-out beside the slider lists the crossings and asymptote for the
  current k. Every family has one question whose answer is "it does not move"
  (the y-intercept of e^(kx), the asymptote of keˣ, the root of k ln x); "that is
  where it is now" and "in this family that does not move" are named.
- **Sketch the Curve** — exponential: *y-intercept* (typed) → *x-axis* ("does it
  cross?" yes/no, then `x = [c] ln [m]` from two boxes; the "no solution" case is a
  real option, when −a/k ≤ 0) → *asymptote* (`y =` or `x =`, its number, and the
  side of it the curve is on) → *shape* (rises / falls) → the curve is swept on.
  A log curve runs *y-axis* (does it exist at x = 0? then `y = [k] ln [b]`) →
  *x-intercept* (typed fraction, where the inside is 1) → *asymptote* (where the
  inside is 0, and left or right of it) → *shape*. The figure builds up as the
  stages are answered, with no scale, exact labels, and the asymptote dashed and
  labelled. Messages quote the item: the constant given for the y-intercept
  (e⁰ = 1), forgetting to divide by k or by n, the x-intercept given for the
  asymptote, the inequality not flipped for a negative a.
- **Find the Inverse** — *swap* (four look-alike lines: the right one, the
  reciprocal 1/f, e traded for ln, a sign changed) → *move 1…4* (choose add /
  subtract / multiply / divide / take ln / write as powers of e, and type its
  number; add −a and subtract a are the same move, as are ÷k and ×1/k) →
  *domain* (`x >` / `x <` a number, or every real x). A legal move out of the
  book's order (dividing by k before the constant is cleared) is turned back
  without counting as a miss; ln before the power of e stands alone, dividing by n
  while it is locked in the power, and the opposite tool (ln on a log) are
  misses. The reveal draws f, the inverse, y = x, both asymptotes and one pair of
  mirrored points on a square grid, and checks f(0) through the inverse.
- `npm run validate` (`checkExpItems(items, mode)`) refuses: a sketch with a
  fraction in it; a = 0 or b = 0 (the asymptote on an axis — that is Move the
  Curve's job); a curve through the origin; an x-intercept whose ln is too awkward
  to type; **labels that would collide on the drawn sketch** (asymptote, crossings
  and axes closer than 28–56 px); an inverse that does not undo its function
  (composed numerically at five points); an item whose own moves, crossing or
  domain the judge does not accept; a family value that is not on the slider, or
  an ask the family does not have; and **levels out of order**. Every `level`
  needs a name in `levels`.

Scoring: 1 per clean item, ½ once helped, out of the item count → nativeMax 10.

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
