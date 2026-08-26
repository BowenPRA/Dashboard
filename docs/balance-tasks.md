# Balance Tasks — Solving Equations by Doing the Same to Both Sides (`balance.js`)

The `BALANCE` task (label "Balance", `dbKey: p14`). The student solves an equation one
legal move at a time: pick an operation, pick a number, and press **Do it to both
sides**. Nothing is ever applied to one side alone, so the equation cannot be broken —
a poor move is only an unhelpful one, and Undo is always there.

---

## 1. Why it looks the way it does

Two representations of the same act, one above the other.

- **The beam never tilts.** Blue chips are the variable, amber chips the constant; a
  coefficient of 3 renders as three countable chips, which is what makes "divide by 3"
  something you can *see* rather than a rule you recall. Both pans are forced to equal
  height — a balance whose pans are different sizes rather undermines the point.
- **A variable term is a chip, not a mode.** The number row offers constants in amber
  and variable terms in the variable's own blue — `2x`, not a `2` plus a separate
  toggle, which made "subtract 2x" look identical to "subtract 2". Picking one puts the
  letter inside the typing box too, so `2` and `2x` never look alike. A coefficient is
  *also* offered as a plain number, because dividing by it is the last step of nearly
  every equation. `×` and `÷` scale a whole side, so choosing either drops the variable
  flag — `×2x` is not a linear move and cannot be built.
- **`±` makes an amount negative**, which no choice of operator can express: `÷ -1` is
  a legitimate and often elegant first move on `-2x - 1 = -9`.
- **Every fraction is drawn stacked** — numerator above a rule above the denominator,
  never `(x - 3)/2`. The slashed form quietly teaches the wrong thing: reading it needs
  the bracket to know what the 2 divides, while the stacked form needs nothing, because
  the bar is drawn under the whole numerator and **the grouping is the picture**. That
  is the one idea the fractions unit turns on, so the notation carries it rather than
  fighting it. The rule takes `currentColor`, so a fraction inside a blue chip stays
  blue and dark mode needs no special case; sizes are in `em`, so the same component
  serves a 12px chip and a 30px working line. `src/components/math/LinearMath.jsx`.
- **The working builds up as a notebook page**, the operation written under *both*
  sides with a rule beneath, exactly as it is taught on paper:

```
  3x + 7  =  22
     − 7     − 7
  ─────────────────
     3x   =  15
     ÷ 3     ÷ 3
  ─────────────────
      x   =  5
```

With denominators it reads the same way, the equals sign sitting on the fraction bars:

```
  x − 3       2x + 1
  ─────   =   ──────
    2            3
    × 6          × 6
  ──────────────────
  3x − 9  =   4x + 2
```

**There is no single correct route, and the task must never imply there is.** Every
legal move keeps the equation true, so `-2x - 1 = -9` can be opened by adding `2x`
(moving the term across), by `÷ -1` (making the coefficient positive first), or by
clearing the `-1` — all three arrive at `x = 4`, and `4 = x` counts as solved just as
`x = 4` does. The step target is the count the taught strategy happens to need; beating
it or missing it changes nothing about the marks.

**Solving is not the end of the task.** On completion an amber copy-down panel asks the
student to write the whole thing — every line, including the operations under both
sides — into their notebook, and the continue button is worded as the confirmation
("I have written it down"). The working stays on screen while they copy.

Prior art worth knowing: [Graspable Math](https://graspablemath.com/learn/solving-equations)
puts the affordance on the equals sign (click it, act on both sides) but its
drag-across-the-equals gesture teaches "move it over and flip the sign", which is the
shortcut rather than the concept. [SolveMe Mobiles](https://solveme.edc.org/mobiles/)
and Hands-On Equations build the balance intuition first and reach notation later. This
task deliberately shows **both at once**, because the student has six weeks, not a year.

---

## 2. Data schema (`balance.js`)

```js
export const balance = [
  {
    id: 'e4',                       // stable — it is the key in the per-item log
    equation: '3x + 7 = 22',        // parsed by src/utils/linearEquation.js
    prompt: 'Two steps. Clear the +7 first, then deal with the 3.',
    promptVn: 'Hai bước. Bỏ +7 trước, rồi xử lý số 3.',
  },
];
```

That is the whole schema — there is **no answer key and no step list**. The engine
computes the legal moves, the target step count and the hint from the equation itself,
so an equation cannot fall out of sync with its own solution.

`equation` accepts any linear equation the parser understands:

| Shape | Example |
|---|---|
| one-step | `x + 9 = 15`, `4x = 32` |
| two-step | `3x + 7 = 22`, `2x - 5 = 11` |
| negative coefficient | `9 - 2x = 1` |
| variable both sides | `5x - 3 = 2x + 12` |
| any single letter | `6y = -42`, `50 + 25h = 150` |
| fractions | `x/5 + 2 = 9`, `2x/5 - 3 = 1` |
| a whole side over a denominator | `(x + 4)/3 = 5`, `(x - 3)/2 = (2x + 1)/3` |
| brackets | `4(x - 2) = 20` — see the caveat below |

The variable's letter is detected and carried through, so `h` stays `h` everywhere —
in the chips, the working and the hint.

### Fractions, and what the student sees

A side is stored as `a·x + b` and has nowhere to keep an unexpanded bracket, so
`(x - 3)/2` is parsed into the coefficients `1/2` and `-3/2`. The quotient shape is
then **derived back** out of those numbers by `groupedOf`, which is why the equation
still reads `(x - 3)/2` on screen and why it stops reading that way the moment the
student multiplies by 2. Nothing is stored twice, so the picture cannot drift from
the model.

Two consequences worth knowing before authoring:

- **A bracket that is not over a denominator is expanded on sight.** `4(x - 2) = 20`
  is a real convenience for the author, but the student meets it as `4x - 8 = 20`.
  There is no `expand` move yet.
- **A numerator constant that divides by its own denominator cannot be shown as one
  quotient.** `(x + 6)/3` holds `x/3` and `2`; the `2` is a whole number, so the side
  renders as `x/3 + 2` — true, and identical in value, but not what you typed. Keep
  the constant indivisible by the denominator (`(x + 7)/3`) and the shape survives.
  `MATH_1C`'s deck is written to that rule throughout.

---

## 3. Scoring

XP is **the share of equations solved without pressing "Show me"**, out of 10 (the
task's `nativeMax`), scaled to whatever the unit declares. Wrong moves cost nothing:
exploration is safe and Undo is free, because a student who is afraid to try a move
learns nothing. Pressing the hint forfeits that equation's mark but still lets them
finish it. Every equation is logged per item for the review deck.

The banner shows steps taken against **target** — the count the taught strategy needs.
It is information, not a penalty; solving in four steps still scores full marks.

Because the mark is a *share*, the length of a deck does not change what it is worth.
`MATH_1C` runs to twenty equations for exactly that reason: balancing is a habit
rather than a fact, so a long deck buys reps and costs the student nothing.

---

## 4. Authoring checklist

- [ ] `id` unique within the unit, and stable once a student has attempted it.
- [ ] Equation parses, and **`npm run validate` proves it is solvable** by the taught
      strategy without changing its own answer. This is checked automatically.
- [ ] Answers stay whole numbers — also checked automatically now. The engine does
      exact fractions, so a stray `4x = 15` does not break: it quietly answers `15/4`,
      and the student, told all course that the answer is whole, assumes *they* are
      the ones who got it wrong.
- [ ] If the equation has denominators, the equation still **renders the way you typed
      it** (see the caveat above). `npm run validate` cannot catch this one.
- [ ] EN + VN on every `prompt`.
- [ ] Difficulty rises in the **shape** of the equation, not the size of the numbers.
- [ ] Order runs easy → hard; the student meets them in sequence.

---

## 5. Extending it

The engine (`src/utils/linearEquation.js`) already handles variables on both sides,
negative coefficients, fractional coefficients, whole sides over a denominator and any
single variable letter, so a harder unit needs **only new equations, no code**. It also
knows the taught opening move on a fraction equation: `suggestMove` multiplies by the
LCD before anything else, `lcdOf` is what the hint and the par count read, and the
number row offers that same LCD as a chip — without it, an equation made only of
fractions would present the student with an empty row of numbers.

What it does not yet do:

- keep a bracket unexpanded — `4(x - 2) = 20` parses but is shown multiplied out, and
  a real `expand` move is still missing;
- quadratics or anything non-linear;
- inequalities — these are a `MATH_1B` topic and would need the flip-on-negative rule.

Each of those is a move type in `applyMove` plus a case in `suggestMove`, and nothing
else has to change.

---

## Related

[workbook-tasks.md](workbook-tasks.md) · [GED-SPRINT.md](GED-SPRINT.md) ·
[question-quality.md](question-quality.md)
