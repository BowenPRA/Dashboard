# Year 7 number engines — Show It, Slide the Digits, Bus Stop, Quick Fire

The self-study units for **3.1 Multiplying and dividing by powers of 10** and **3.2
Rounding** are built around three tasks and three deck activities: the student *slides*
the digits along a place-value table, *writes* a short division with the remainders
carried up-left of the next digit, *adds zeros* after the point, and *rounds* — and every
mark is derived from the question. Read with [../y7-math-course.md](../y7-math-course.md),
[../classroom-dashboard-pairing.md](../classroom-dashboard-pairing.md) and
[algebra-engines.md](algebra-engines.md) (the 2.3–2.5 shape these units copy).

**Derive, don't store.** An item states the question only. `src/utils/decimal.js` does
exact decimal arithmetic (BigInt digits + the number of places *written*, so 35.0 and 35
are one value but two forms); `placeShift.js`, `shortDivision.js`, `rounding.js` and
`quickFire.js` work out the moves, placeholders, columns, carries, zeros, answers and the
*name* of the slip behind a wrong answer. `npm run validate` runs the same functions — an
item the engine cannot finish, or whose own answer it would mark wrong, fails the build.

**2.6 Inequalities** (`Y7_MATH/U02_6`, from the classroom deck `U02_6`) was built after
these two and shares the shape, Quick Fire and this document: its engine is **Show It**
(`ineqLine`, §2.4) on `src/utils/ineqLine.js`, and its deck activity is `ineq` (§3).

**One classroom lesson, two units.** The classroom teaches 3.1 and 3.2 as one deck over two
periods (`lessons/content/y7-math/U03_1_2`, slides 1–18 then 19–39, hinge at slide 17). The
Dashboard follows the book — one section, one unit — so the deck splits at the hinge:
`Y7_MATH/U03_1` takes slides 1–18, `Y7_MATH/U03_2` takes 17–39 (the place-value table opens
3.2 as its recap). Both units carry the same `meta.classroom` entry.

---

## 1. The unit shape (2.6, 3.1, 3.2)

| Phase | Gate | Task | XP |
|---|---|---|---|
| concept | 0 | NOTES — interactive deck, 20 scored items | 20 |
| concept | 0 | WORD_REC — 6 key words | 10 |
| practice | 20 | WORKBOOK — 12 Q, tiered, mixed widgets | 20 |
| practice | 20 | the unit's engine — INEQ_LINE (2.6) / PLACE_SHIFT (3.1) / SHORT_DIV (3.2) | 25 |
| practice | 20 | QUICK_FIRE — generative cards | 10 |
| practice | 20 | SHORT_ANSWERS — 4 reasoning Q | 20 |
| mastery | 80 | ASSESSMENT — 8 MCQ | 20 |
| mastery | 80 | GAMES | 0 |

125 XP available, capped at 100. Gates: 20 of 30 (67%) — the lesson alone opens the
practice — and 80 of 105 (76%).

**Rebalanced 2026-09-30** at Bowen's request (from vocab 15 · practice gate 25 · Quick Fire
15): vocabulary is worth 10, practice opens at 20, and the short generated round gives up 5.
That is as far as the later tasks can be shaved: the quiz gate is 80, and the 80% rule
needs at least 100 XP on offer before it — at 105 a student must already average 76%.

Dashboard keys: `SHORT_DIV p56 · PLACE_SHIFT p57 · QUICK_FIRE p58 · INEQ_LINE p59` —
**p60 is next**.

---

## 2. Engine schemas (unit data keys)

Everything learner-facing is bilingual (`…Vn`). Levels are `{ n: { en, vn } }` and an
item's `level` may only climb.

### 2.1 Slide the Digits — `placeShift` (3.1)

```js
placeShift: {
  title: 'Slide the Digits', titleVn: 'Dịch chữ số',
  intro: '…', introVn: '…',                     // optional, shown on the first item
  levels: { 1: { en: 'Multiply: digits move left', vn: '…' }, … },
  items: [
    { id: 's1', level: 1, n: '4.3', op: '×', p: 3 },                      // 4.3 × 10³
    { id: 's5', level: 2, n: '520', op: '÷', p: 4 },                      // 520 ÷ 10⁴
    { id: 's9', level: 4, kind: 'power', n: '6.1', op: '×', result: '61000' },   // find the power
    { id: 's12', level: 5, kind: 'convert', n: '4', from: 'kg', to: 'mg' },       // mg g kg t
    { id: 's15', level: 6, kind: 'chain', n: '5', ops: [['×', 4], ['÷', 2], ['×', 3]] },
    { id: 's16', level: 6, n: '3.844', op: '×', p: 5,
      context: 'The Moon is 3.844 × 10⁵ km from Earth.', contextVn: '…' },
  ],
}
```

`n`, `result` are strings (exactness). `op` is `×` or `÷` (`x`, `*`, `/` accepted). `p`
1–8. The table must fit millions … hundred-thousandths (10⁶ … 10⁻⁵). A chain of 2–4 moves
must not cancel out.

**Stages** (the component derives them):
- *Which way* — convert items only: pick × 10³ / × 10⁶ / ÷ 10³ / ÷ 10⁶ on the mass ladder.
- *Slide* — ← / → move every digit one column; the point never moves. Check marks the
  direction and the number of places (a chain slides once per move, in order). *Find the
  power* items slide until the digits sit on the ghost target row.
- *Write* — the empty columns between the digits and the point light up; type the ordinary
  number (or, for *find the power*, the power). Slips named: "just added zeros" (7.2000),
  the wrong way, the right way but the wrong number of places ("every empty column needs a
  placeholder 0").

Suggested ladder: multiply (whole, then decimal — the folk rule dies) → divide (placeholders
after the point) → both ways mixed → find the power → metric mass → chains and stories.
14–18 items.

### 2.2 Bus Stop — `shortDiv` (3.2)

```js
shortDiv: {
  title: 'Bus Stop', titleVn: 'Chia ngắn',
  intro: '…', introVn: '…',
  levels: { 1: { en: 'Carry the remainder', vn: '…' }, … },
  items: [
    { id: 'd1', level: 1, dividend: '936', divisor: 4 },           // exact, whole
    { id: 'd4', level: 2, dividend: '9.35', divisor: 5 },          // exact, the point is given
    { id: 'd6', level: 3, dividend: '47', divisor: 4 },            // add zeros until it stops: 11.75
    { id: 'd9', level: 4, dividend: '58', divisor: 7, dp: 3 },     // correct to 3 d.p.: work to 4, round
    { id: 'd12', level: 5, dividend: '62.7', divisor: 7, dp: 1 },  // rounds to 9.0 — keep the zero
    { id: 'd14', level: 6, dividend: '75', divisor: 8, dp: 1,
      context: '…', contextVn: '…' },
  ],
}
```

`dividend` a string (whole or decimal), `divisor` a whole number 2–25, `dp` 1–4 or absent.
Without `dp` the division **must stop** within 5 added zeros (the validator refuses 1 ÷ 3).
With `dp` it must **not** stop within `dp` places (otherwise "correct to" rounds nothing —
make it exact). At most 10 columns.

**Remainder items** — `{ id, level, dividend: '85', divisor: 4, remainder: true }` — divide
whole numbers only (no `dp`, no point) and stop at the units digit: there is no +0 button,
and what is left at the last digit goes in an **r box** after the answer (`21 r 1`; blank
counts as 0). The divisor may go up to 99 (carries are then two-digit boxes). The finished
screen says whether the divisor divides exactly. These are the Number Gym `short-div`
drills of 1.4 and 1.5, which mount this screen: `drillToShortDiv(drill)` turns their
`[dividend, divisor]` ladder into remainder items, keeping the ids the old long-division
view saved progress under (`L<rung>-<D>d<d>-<i>`).

**The method, as the student writes it:**

```
        0  8 . 2  8  5  7
      ┌──────────────────
    7 │ 5 ⁵8 . ²0 ⁶0 ⁴0 ⁵0          58 ÷ 7 = 8.2857… = 8.286 (3 d.p.)
```

Each column: type the quotient digit above it and the remainder in the small box up and to
the **left of the next digit** — the carry and that digit are read as one number (²0 is
"20"). A leading 0 on top (7 into 5) may be left blank; a carry of 0 may be left blank.
When the digits run out: **+0** adds a zero after the point (the first one brings the point,
in the number and straight above it in the answer). Pressing Check at the last digit when
the remainder is not 0 (or, for `dp` items, before `dp + 1` places) is a named slip —
"not finished: add a zero and carry the remainder". Extra zeros are taken away with a note,
not marked wrong. `dp` items end with a *Round* stage: type the rounded answer, marked by
`rounding.diagnoseRound` (chopped, dropped zero, wrong place …).

Suggested ladder: carry the remainder (whole, exact) → the point is given → add zeros until
it stops (3 ÷ 8, 47 ÷ 4) → correct to n d.p. — one place further → keep the zero (answers
like 9.0, 2.50) → stories. 12–16 items.

### 2.3 Quick Fire — `quickFire` (all three)

```js
quickFire: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['shift', 'power', 'mass'], rounds: 12 }
```

Modes: `shift` (× ÷ 10ⁿ), `power` (the missing power), `mass` (mg/g/kg/t), `round` (1–3
d.p., nearest whole / 10 / 100; one card in three carries into a trailing zero), and for
inequalities `compare` (−8 □ −5: two buttons, < or >), `couldbe` ("t < −5. Could t be −4?":
Yes / No, with the reason) and `integer` ("p > 2.5: the smallest integer p could be?").
6–20 rounds. Dealt fresh each attempt. A typed card gives a wrong answer its slip's name
and one more try (right first time 1, right second time ½, shown 0); a two-button card is
answered once.
3.1 uses `['shift', 'power', 'mass']`, 3.2 uses `['round']`, 2.6 uses
`['compare', 'couldbe', 'integer']`.

### 2.4 Show It — `ineqLine` (2.6)

```js
ineqLine: {
  title: 'Show It', titleVn: 'Biểu diễn trên trục số',
  intro: '…', introVn: '…',
  levels: { 1: { en: 'The circle, then the arrow', vn: '…' }, … },
  items: [
    { id: 'n1', level: 1, kind: 'draw', ineq: 'x > 3' },              // circle → arrow → smallest integer
    { id: 'n4', level: 2, kind: 'read', ineq: 'x < 4' },              // the line is drawn: write it → largest integer
    { id: 'n7', level: 3, kind: 'draw', ineq: 't < −2' },             // negatives: less than is LEFT
    { id: 'n9', level: 3, kind: 'draw', ineq: 'p > 2.5' },            // a half: the circle sits between two ticks
    { id: 'n10', level: 4, kind: 'words', ineq: 't < 0', phrase: 'below' },   // "t is below 0" → write it → largest integer
    { id: 'n12', level: 4, kind: 'words', ineq: 'a < 18',
      context: 'You must be under 18. Use a for the age.', contextVn: '…' }, // a story instead of the derived sentence
    { id: 'n14', level: 5, kind: 'between', ineqs: ['s > 20', 's < 24'] },   // tap every integer that works
    { id: 'n16', level: 5, kind: 'between', ineqs: ['c < 1', 'c > −1'],
      context: 'Mr Bowen has fewer than 1 cat. He has more than −1 cats.', contextVn: '…' },  // write both, then tap
    { id: 'n17', level: 5, kind: 'between', ineqs: ['n > 7', 'n < 8'] },     // none works
  ],
}
```

`ineq` is `letter < number` or `letter > number` — strict signs only (≤ and ≥, closed
circles, are Stage 8), a whole number or a half, a real minus (−) or a hyphen. `phrase` must
belong to the sign: **<** less than · fewer than · below · under · smaller than; **>**
greater than · more than · above · over · bigger than. `integer: false` drops the integer
stage from a draw / read / words item. `between` needs one > and one < on the same letter,
lower number first in value, and a line of at most 14 intervals.

**Stages** (the component derives them):
- *Circle* (draw) — tap the number on the line; the open circle goes there. The line does
  NOT centre on the number. Slips: put it on the first integer that works; the wrong sign.
- *Arrow* (draw) — left or right. Slip: "less than means left — even below zero".
- *Write* (read, words) — a < / > toggle and the number. Slips: the sign; the first integer
  instead of the circle's number.
- *Integer* — the smallest (for >) or largest (for <) integer that works. Slips: the
  circle's own number; a number on the wrong side (−1 for t < −2); not an integer; one that
  works but is not the first.
- *Write both* (a between item with `context`) — both inequalities, either order.
- *Integers* (between) — tap every integer that fits both, or "No integer works". Slips: an
  open circle's own number; one outside; some missing.

Suggested ladder: the circle then the arrow (positive) → read the line → negatives and a
half → words (the ten phrases) → between two inequalities, the last one with no answer.
14–18 items.

---

## 3. Deck activities (Notes)

Same contract as every activity: `activity: { id, type, prompt, promptVn, …, explain,
explainVn }` is the LAST key on its slide, never alongside a `check`.

```js
// shift — slide the digits on a place-value table, then Check
{ id: 'a3', type: 'shift', prompt: '…', promptVn: '…', n: '7.2', op: '×', p: 3, explain, explainVn }
{ id: 'a7', type: 'shift', …, kind: 'power', n: '900', op: '÷', result: '0.09' }   // slide to the target
{ id: 'a8', type: 'shift', …, kind: 'convert', n: '4', from: 'kg', to: 'mg' }
// round — tap the last digit you keep, then type the rounded number
{ id: 'a12', type: 'round', prompt, promptVn, n: '34.9892', to: 1, explain, explainVn }
// busstop — a whole short division on the slide: tops, carries, +0, (rounded answer)
{ id: 'a15', type: 'busstop', prompt, promptVn, dividend: '58', divisor: 7, dp: 3, explain, explainVn }
```

```js
// ineq — an inequality on a number line (2.6)
{ id: 'a5', type: 'ineq', ask: 'draw', ineq: 'x > 6', prompt, promptVn, explain, explainVn }   // tap the circle's number, choose the arrow
{ id: 'a6', type: 'ineq', ask: 'read', ineq: 'x < −1', … }        // the line is drawn: choose the sign, type the number
{ id: 'a7', type: 'ineq', ask: 'integer', ineq: 'q < −4', … }     // type the smallest / largest integer
{ id: 'a8', type: 'ineq', ask: 'list', ineqs: ['s > 20', 's < 24'], … }   // tap every integer that works (or "No integer works")
```

`to` (round): 1–5 decimal places; 0 the nearest whole number; −1 nearest 10; −2 nearest 100;
−3 nearest 1000. The number must actually change. `shift` on a slide: no chains, at most 9
columns. `busstop` on a slide: at most 8 columns and 4 added zeros.

---

## 4. Traps

- **Commas.** Vietnamese writes the decimal point as a comma. `readDec` refuses a lone comma
  with a *nudge* (write the point as a dot), not a wrong answer; several commas in the
  thousands pattern are read as thousands (628,700,000).
- **Form is marked.** 35 for 35.0 is the "keep the zero" slip; 0.0520 for 0.052 is accepted
  (same value — it is not a rounding question).
- Arcade: `mathChallenges.js` has generators for U02_6 (inequalities), U03_1 (× ÷ 10ⁿ) and
  U03_2 (rounding), mapped to Y7_MATH in `GENERATOR_TRACK` (Y7 Science ids collide — it has
  a U02_6 of its own).
- **The line must not centre on the answer.** `ineqModel` offsets each item's line by a
  hash of its id, so where the circle goes is not given away by the picture.
