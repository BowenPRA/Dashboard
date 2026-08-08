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
| fractions | `x/5 + 2 = 9` |

The variable's letter is detected and carried through, so `h` stays `h` everywhere —
in the chips, the working and the hint.

---

## 3. Scoring

XP is **the share of equations solved without pressing "Show me"**, out of 10 (the
task's `nativeMax`), scaled to whatever the unit declares. Wrong moves cost nothing:
exploration is safe and Undo is free, because a student who is afraid to try a move
learns nothing. Pressing the hint forfeits that equation's mark but still lets them
finish it. Every equation is logged per item for the review deck.

The banner shows steps taken against **target** — the count the taught strategy needs.
It is information, not a penalty; solving in four steps still scores full marks.

---

## 4. Authoring checklist

- [ ] `id` unique within the unit, and stable once a student has attempted it.
- [ ] Equation parses, and **`npm run validate` proves it is solvable** by the taught
      strategy without changing its own answer. This is checked automatically.
- [ ] Answers stay whole numbers at the current level; the engine does exact fractions,
      so a stray `4x = 15` silently becomes `x = 15/4`.
- [ ] EN + VN on every `prompt`.
- [ ] Difficulty rises in the **shape** of the equation, not the size of the numbers.
- [ ] Order runs easy → hard; the student meets them in sequence.

---

## 5. Extending it

The engine (`src/utils/linearEquation.js`) already handles variables on both sides,
negative coefficients, fractional coefficients and any single variable letter, so a
harder unit needs **only new equations, no code**. What it does not yet do:

- brackets — `4(x - 2) = 20` must be authored pre-expanded, or an `expand` move added;
- quadratics or anything non-linear;
- inequalities — these are a `MATH_1B` topic and would need the flip-on-negative rule.

Each of those is a move type in `applyMove` plus a case in `suggestMove`, and nothing
else has to change.

---

## Related

[workbook-tasks.md](workbook-tasks.md) · [GED-SPRINT.md](GED-SPRINT.md) ·
[question-quality.md](question-quality.md)
