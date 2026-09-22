# IGCSE Mathematics (Extended) — the task engines

The screens an `EXT_MATH` unit can put in front of a student, what each one is *for*, and
the exact data it reads. Read with [../ext-math-course.md](../ext-math-course.md) (how to
build a unit) and [notes-and-widgets.md](notes-and-widgets.md) (the deck).

**The rule every engine here follows: the item stores the question, and the code derives
the answer.** No answer keys are authored for any production engine below, so none can
drift from the question, and `npm run validate` re-derives every item with
the same code the task marks with — refusing one the student could not finish on screen.
The Workbook is the one engine that carries authored keys; the rules for writing keys it
can actually mark are in [../add-math/task-engines.md](../add-math/task-engines.md) §5.

| Engine | Task id · dbKey | Screen | Derivation |
|---|---|---|---|
| Set It Out | `VENN` · p35 | `src/tasks/VennTask.jsx` | `src/utils/sets.js` |
| Surd Breaker | `SURD_SIMPLIFY` · p36 | `src/tasks/SurdSimplify.jsx` | `src/utils/surds.js` |
| Rationalise It | `RATIONALISE` · p37 | `src/tasks/Rationalise.jsx` | `src/utils/surds.js` |
| Simultaneous Equations | `SIM_EQ` · p46 | `src/tasks/Simultaneous.jsx` | `src/utils/simultaneous.js` |
| Triangle Solver | `TRIANGLE` · p47 | `src/tasks/TriangleSolver.jsx` | `src/utils/triangles.js` |
| Inequalities | `INEQUALITY` · p48 | `src/tasks/Inequalities.jsx` | `src/utils/inequalities.js` (+ `interval.js`, `lines.js`) |
| Practice / Book Problems | `WORKBOOK` p11 · `WORKBOOK_B` p22 | `src/tasks/Workbook.jsx` | `src/utils/mathEquivalence.js` |

Every production engine shares the shape of screen the other production tasks use, so a
student who has met one has met them all: the question in a coloured strip, a **stage
rail** that ticks off the moves, one stage on screen at a time, **Check** and **Show me**
on every typed stage, a wrong answer retried once, a second wrong answer (or Show me)
filling the stage in and the item **paying half**, and a finished item printing its
working under **"Copy this into your book"**. A pick-one stage (a method, a ratio, a
split) gets **one** try, because a second guess from four is not a decision. Every engine
checkpoints after each item (`onProgress`) and resumes on the first unfinished one.

---

## 1. Set It Out (`VENN`)

Venn diagrams and set notation. The screen's one idea: **notation is a picture**. A
question in words is first turned into notation (picked from four), the notation is turned
into a picture (the student **shades** the regions), and only then is the picture turned
into a number. A student who can do the middle step can do every set question on the paper.

```js
// src/data/EXT_MATH/<UNIT>/venn.js
export const venn = {
  title: 'Set It Out',
  intro: 'Shown under the first diagram only.',
  items: [
    {
      id: 'sport',
      kind: 'counts',                       // the diagram is printed with numbers
      sets: ['F', 'T'],                     // two or three single capitals (not E)
      counts: { '10': 14, '11': 6, '01': 9, '00': 5 },
      prompt: 'The Venn diagram shows … football ($F$) and tennis ($T$).',
      questions: [
        { id: 'a', ask: 'n', expr: 'ℰ', translate: true, prompt: 'Work out the number of students in the class.' },
        { id: 'd', ask: 'more', exprs: ['F', 'T'], prompt: 'How many more play football than tennis?' },
        { id: 'e', ask: 'p', expr: "(F ∪ T)'", translate: true, prompt: 'Find the probability that …' },
      ],
    },
    {
      id: 'cafe',
      kind: 'facts',                        // the numbers are in words; the student FILLS the diagram
      sets: ['C', 'T'],
      prompt: '50 people in a café were asked …',
      facts: [
        { expr: 'ℰ', n: 50, say: '50 people were asked.' },
        { expr: 'C', n: 28, say: '28 drink coffee.' },
        { expr: 'T', n: 19, say: '19 drink tea.' },
        { expr: 'C ∩ T', n: 7, say: '7 drink both.' },
      ],
      questions: [ /* … */ ],
    },
    {
      id: 'mult',
      kind: 'elements',                     // ℰ and the sets are RULES; the student PLACES every element
      sets: ['A', 'B'],
      universe: { from: 1, to: 12 },        // or an explicit array
      rules: { A: { kind: 'multiple', of: 3 }, B: { kind: 'even' } },
      prompt: 'ℰ is the whole numbers from 1 to 12.',
      questions: [
        { id: 'a', ask: 'list', expr: 'A ∩ B', prompt: 'List the elements of $A \\cap B$.' },
        { id: 'b', ask: 'truth', prompt: 'True or false?', statements: ['6 ∈ A ∩ B', "9 ∈ B'", '{2, 4} ⊂ A'] },
      ],
    },
  ],
};
```

**Notation** is authored in the Unicode the paper prints (`A ∩ B'`, `(A ∪ B)'`, `ℰ`, `∅`);
the LaTeX spellings (`\cap`, `\cup`, `\mathscr{E}`, `\varnothing`) are accepted too.
`∪` and `∩` are read left to right, and **mixing them without brackets is refused by the
validator** rather than guessed at.

**The three kinds.**
- `counts` — the printed diagram. The item's four (or eight) region counts are keyed
  `'10'`, `'11'`, `'01'`, `'00'`: one digit per set, in `sets` order, 1 meaning "inside".
- `facts` — each fact is a set expression and a number, plus `say` (the fact in words, as
  the student reads it). `solveFacts` solves the system exactly; the validator refuses
  facts that do not fix every region, or that give a negative or fractional region.
  `solvingSteps` derives the order a teacher fills it in — **middle first**, and when the
  middle is not given it names it $x$, keeps peeling in terms of $x$, and finishes with the
  leftover fact as an equation. Those steps are the hint ladder and the final working.
- `elements` — the sets are membership rules (`multiple`, `factor`, `prime`, `square`,
  `cube`, `even`, `odd`, `range`, `list`), so the definitions, the membership and the
  wrong-placement message ("7 is not a multiple of 3 and 7 is odd, so 7 belongs outside
  both") are all derived. The validator checks every region has room for its elements.

**The asks.** `n` (how many), `p` (probability), `shade` (shade only), `list` (the
elements — chips, `elements` items only), `more` (how many more: `exprs: [bigger, smaller]`),
`truth` (true/false statements: `x ∈ S`, `x ∉ S`, `{…} ⊂ S`, `n(S) = k`, `S = ∅`, each
judged with its reason). `translate: true` adds the **words → notation** stage: four
options derived by `notationOptions`, which are the classic slips — the wrong De Morgan
($(A ∪ B)'$ read as $A' ∪ B'$), a swapped ∪/∩, a dropped complement, "B only" for "B".

Scoring: every part (the fill or place stage, then each question) scores 1 clean or ½
helped; the item pays their mean.

## 2. Surd Breaker (`SURD_SIMPLIFY`)

Simplifying a surd the way the book does — find a square that divides the number, take
its root **out**, and ask whether what is left can be broken down again — with the
student's own splits drawn as a **root tree**.

```js
// src/data/EXT_MATH/<UNIT>/surds.js
export const surds = {
  title: 'Surd Breaker',
  intro: '…',
  items: [
    { id: 's72', kind: 'simplify', n: 72, note: 'Any square factor works.' },  // √72
    { id: 's3r20', kind: 'simplify', k: 3, n: 20 },                            // 3√20
    { id: 'c5_45', kind: 'collect', terms: [[1, 5], [1, 45]] },                // √5 + √45
    { id: 'm3r2sq', kind: 'multiply', a: [3, 2], b: [3, 2], square: true },    // (3√2)²
  ],
};
```

A term is `[k, r]` — `k` times √`r`, with `r = 1` meaning a whole number.

- `simplify` stages **split → write → finished?**, looping while the radicand still has a
  square factor. **Any square factor is accepted**, not only the largest: √72 split as
  √4 × √18 is right, it just needs a second round — and the student *sees* that, because
  the tree grows another branch and the done panel says how many rounds the largest factor
  would have taken. "Is it fully simplified?" is its own stage with its own tap, because
  that is the mark the paper takes.
- `collect` stages **simplify each → like surds? → collect**: the terms are simplified
  first (a typed value that is equal but not simplest is nudged, not marked wrong), then
  the student decides whether they are alike, then adds the numbers in front — the same
  move as collecting like terms. A set that does not collect (`√8 + √27`) ends after the
  decision.
- `multiply` stages **multiply → finished? → (split → write)**: outside numbers together,
  inside numbers together, then the same simplify loop on the product.

The validator refuses a `simplify` item that is already simplest, a `collect` item whose
terms are all simplest *and* alike (nothing to do), a non-surd factor in `multiply`, and
anything whose radicand would run past the square chips on screen.

## 3. Rationalise It (`RATIONALISE`)

Brackets with surds, then fractions with a surd on the bottom, worked in the moves the
mark scheme pays for. The expand items come **first**, so a conjugate pair's two surd
cells are seen cancelling in the grid before the word "rationalise" is used.

```js
// src/data/EXT_MATH/<UNIT>/rationalise.js
export const rationalise = {
  title: 'Rationalise It',
  intro: '…',
  items: [
    { id: 'e2', kind: 'expand', left: [[7, 1], [-1, 2]], right: [[7, 1], [1, 2]] },   // (7 − √2)(7 + √2)
    { id: 'e3', kind: 'expand', left: [[4, 1], [1, 5]], right: [[4, 1], [1, 5]], square: true },
    { id: 'm2', kind: 'mono', num: [[10, 1]], den: [1, 8] },                          // 10/√8
    { id: 'b3', kind: 'binomial', num: [[1, 2]], den: [[3, 2], [-2, 1]],              // √2/(3√2 − 2)
      prompt: 'Show that … in the form $\\dfrac{a + \\sqrt{2}}{b}$ …',
      form: { latex: '\\dfrac{a + \\sqrt{2}}{b}', a: 'int', b: 'den', surd: 1 } },
  ],
};
```

- **`expand`** stages **multiply out → collect**: a 2 × 2 grid (one box per cell, so no
  term can be lost), then whole numbers together and surds together. A conjugate pair is
  detected, its cancelling cells are struck through, and the verdict says *why* that
  matters.
- **`mono`** (`den: [q, m]`, i.e. $q\sqrt m$) stages **choose → bottom → top → tidy the
  top → simplify fully**.
- **`binomial`** (`den` = the two terms as printed) stages the same five, with the bottom
  as a **difference of two squares**: $(\text{first})^2 - (\text{second})^2$, three boxes,
  and the full derived grid shown once it is answered.
- **`choose`** offers four multipliers derived from the denominator: the conjugate (or
  √m), the same bracket again, √m alone, and the conjugate on the bottom only — each with
  its own reason for failing. One try.
- **`form`** names the letters of a "show that" question: map each letter to `int`,
  `surd` or `den` and the done panel prints "so $a = 3$, $b = 7$". A literal number
  (`surd: 1`) is checked against the derived answer, so a form that does not match the
  maths fails the build.
- **The final stage marks value *and* form.** An answer equal but not fully simplified is
  **not** marked wrong: it is told which number divides every term. A negative denominator
  is told to move the minus to the top.

The validator refuses a bottom that comes out as 0, a denominator that is not one whole
number plus one simplest surd, and any item whose top or answer would hold two different
surds (the answer boxes take one).

## 4. Simultaneous Equations (`SIM_EQ`)

Two equations, two unknowns, solved by **the quickest method — and the reason for it**.
Assignment 07 asks, over four questions, "explain why the method you chose was the most
efficient", so the method is its own stage, and the reasons are derived from the
equations rather than written per item.

```js
// src/data/EXT_MATH/<UNIT>/simultaneous.js
export const simultaneous = {
  title: 'Simultaneous Equations',
  intro: '…',
  items: [
    { id: 's_add', eqs: ['3x + 2y = 16', '5x - 2y = 16'], note: 'Look at the y terms first.' },
    { id: 's_chain', chain: '5x + 2y = 3x - 4y = 13' },            // "… = … = 13" is two equations
    { id: 's_line', eqs: ['y = 3x - 5', '2x + y = 15'], prompt: 'Line L … where do they cross?' },
    { id: 's_brackets', eqs: ['2(x + 3) - 3(y - 1) = 3', '4(x - 2) - (y + 1) = -1'] },
    { id: 's_fractions', eqs: ['x + 1 = y/2', 'x = (y + 3)/3'] },
  ],
};
```

Give `eqs` (two strings) **or** `chain`, never both. Equations are written as the paper
prints them — brackets, fractions and a letter on its own are all parsed — and
`deriveSimEq` solves them exactly, then decides the method:

| `reason` | When | Stages after **Method** |
|---|---|---|
| `subject` | a letter is already on its own (`y = 3x − 5`, `x = 2y + 1`) | **substitute** (in a bracket) → solve → back → check |
| `same` | a pair of terms is already the same size | **add or subtract** → eliminate → solve → back → check |
| `one` | one coefficient goes into the other | **match** → **multiply** one equation → add or subtract → … |
| `both` | no coefficient divides another | **match** → **multiply** both → add or subtract → … |

A chain opens with **split** (four ways to read `p = q = r`; only "p = r and q = r" is
right), and any equation not already in `ax + by = c` opens with **tidy**. The four
`methodOptions` carry their own feedback — picking "multiply both" when one is enough is
told *it works, but makes bigger numbers than you need*. The finished item draws both
lines crossing at the answer on `CoordGrid`, so "the solution is where the graphs meet"
is seen every time.

The validator refuses a non-whole answer or one past ±60, an equation that tidies to one
letter only, tidied numbers past two digits, multipliers above 12, multiplied equations
past three digits, and a pair with no single solution.

## 5. Triangle Solver (`TRIANGLE`)

Pythagoras and right-angled trigonometry, with the triangle **drawn from the data** (by
`TriangleFigure.jsx`) and every label, ratio and answer derived. The one idea: **label
from the angle, then the ratio chooses itself.**

```js
// src/data/EXT_MATH/<UNIT>/triangles.js
export const triangles = {
  title: 'Triangle Solver',
  intro: '…',
  items: [
    { id: 't_hyp', kind: 'pythag', tri: { right: 'C', legs: { A: 'E', B: 'N' } },
      given: { AC: 12, BC: 9 }, find: 'AB', unit: 'cm' },
    { id: 't_sin', kind: 'side', tri: { right: 'C', legs: { A: 'W', B: 'N' } },
      angle: { at: 'A', deg: 38 }, given: { AB: 12 }, find: 'BC', unit: 'cm' },
    { id: 't_bearing', kind: 'angle', tri: { right: 'Z', legs: { X: 'N', Y: 'E' } },
      given: { XZ: 15, XY: 26 }, find: { angle: 'X' }, unit: 'km', bearing: { from: 'X', to: 'Y' } },
    { id: 't_two', kind: 'chain', unit: 'm', prompt: '…',
      parts: [
        { kind: 'side', tri: { right: 'D', legs: { A: 'W', B: 'N' } }, angle: { at: 'A', deg: 48 }, given: { AD: 6 }, find: 'BD' },
        { kind: 'pythag', tri: { right: 'D', legs: { B: 'N', C: 'E' } }, given: { BD: 'prev', DC: 11 }, find: 'BC' },
      ] },
  ],
};
```

**A triangle is `{ right, legs }`**: the right-angle corner, and the compass direction
(`N`/`E`/`S`/`W`) each other corner lies in from it — one E/W, one N/S. The lengths come
from `given`, so the same shape turned round is a new picture with no new drawing. The
`bearing` option and the chain's shared side both read their geometry from it.

| `kind` | Stages |
|---|---|
| `pythag` | **hypotenuse** (tap the side opposite the right angle) → **squares** (add for the hypotenuse, subtract for a shorter side) → **square root** |
| `side` | **label** H, O, A from the angle → **ratio** (SOH / CAH / TOA, one try) → **equation** → **rearrange** (multiply when the unknown is on top, divide when it is on the bottom) → **calculate** |
| `angle` | label → ratio → equation → **inverse** → calculate, then with `bearing` → **bearing rule** → **bearing** |
| `chain` | the parts in order; a later part's `'prev'` side is the one the part before found, **carried at full accuracy** |

`exact: true` replaces **calculate** with **exact value** (pick $\sin 60^\circ$ from four
exact forms) and **exact answer** (a simplified surd), or, on `pythag`, asks for the
surd instead of a decimal. `labels: { KN: 'h' }` renames a side in the question (the
"show that $h = a\sqrt3$" shape). Answers are marked to 3 s.f. (sides) or 1 d.p.
(angles). A typed answer that matches a derived **slip** is told which one, not just
marked wrong: the calculator in radians, multiplying when the unknown is on the bottom
(or dividing when it is on top), and — for tan — the other acute angle.

The validator refuses legs that are not at right angles, the wrong number of givens for
the kind, a non-positive answer, an `exact` item whose answer is a whole number, a chain
part that does not use the side before it, and vertex names that are not single capitals.

## 6. Inequalities (`INEQUALITY`)

Solving, number lines, whole-number solutions and regions — four kinds on one screen,
because Assignment 07 asks them as one run of questions.

```js
// src/data/EXT_MATH/<UNIT>/inequalities.js
export const inequalities = {
  title: 'Inequalities',
  intro: '…',
  items: [
    { id: 'i_solve', kind: 'solve', ineq: '9x - 4 >= 5x + 8', line: true },
    { id: 'i_read', kind: 'read', set: '-2 < x <= 1', min: -4, max: 4 },
    { id: 'i_three', kind: 'double', ineq: '-5 < 2x + 3 <= 9', integers: true },
    { id: 'i_split', kind: 'double', ineq: '14 - 3n < 4n <= 20 + n', integers: true },
    { id: 'i_region', kind: 'region', grid: { xMin: -1, xMax: 11, yMin: -2, yMax: 9 },
      lines: [
        { eq: 'x = 2', dashed: true },
        { eq: '5y + 4x = 40', labelAt: [6.2, 4.4] },
        { eq: '3y = x - 3', dashed: true, labelAt: [10.9, 3.1, 'end'] },
      ],
      point: [3, 2] },
  ],
};
```

| `kind` | Stages |
|---|---|
| `solve` | **collect** (the letters to either side — the student's choice is kept, so collecting to the side with fewer really does make them divide by a negative) → **divide** (the sign turns round, or not) → **number line** with `line: true` → **integers** with `integers: { from, to }` |
| `read` | **write it**: the inequality a drawn number line shows |
| `double` | letter only in the middle: **all three parts** → **divide**; letter in the outer parts too: **split** (four options, one try) → **left half** → **right half** → **combine**; then **integers** with `integers: true` |
| `region` | per line: **equation** (read it off the grid, only when `label: false`) → **inequality** (the side `point` is on; solid is ≤ / ≥, dashed is < / >) |

On the number line the student taps a tick to place a circle, taps it again to fill it,
and shades the direction; on a region they pick the relation for each line and can **test
a point** before committing. `point` is any point inside R — every line's side is derived
from it — and `labelAt: [x, y, anchor?]` moves a line's printed label off a crowded
corner.

The validator refuses a number-line end that is a fraction or off the line, a double
inequality with no integers or more than ten, a region with fewer than two or more than
four lines, an empty or sliver region, **a region that runs off the grid** (every corner
must be where two lines meet), and an unlabelled line that cannot be read — not authored
as `x = k`, `y = k` or `y = mx + c`, off a grid line, or with a gradient or intercept
too awkward to read.

## 7. Adding an engine

Same five steps as the sister track ([../add-math/task-engines.md](../add-math/task-engines.md) §6):
the pure derivation in `src/utils/<thing>.js` with a `check…Items(items)` that returns
problem strings, the screen in `src/tasks/<Thing>.jsx` copying the stage rail / Check /
Show me / pay-half / resume pattern, one entry in `src/tasks/taskRegistry.js` (id, the
next free dbKey — **p48 is the last one taken, so the next is p49**), the `check…Items`
wired into `scripts/validate-entry.js`, and a Maths Bolt generator for the unit.

A figure the screen draws goes in `src/components/math/` and takes the derived model, so
the picture and the marking cannot disagree: `CoordGrid.jsx` (lines, regions, points —
clipping in `utils/lines.js`) and `TriangleFigure.jsx` are shared by the tasks and the
deck widgets.
