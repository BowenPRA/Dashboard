# Year 7 number engines — Slide the Digits, Bus Stop, Quick Fire

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

**One classroom lesson, two units.** The classroom teaches 3.1 and 3.2 as one deck over two
periods (`lessons/content/y7-math/U03_1_2`, slides 1–18 then 19–39, hinge at slide 17). The
Dashboard follows the book — one section, one unit — so the deck splits at the hinge:
`Y7_MATH/U03_1` takes slides 1–18, `Y7_MATH/U03_2` takes 17–39 (the place-value table opens
3.2 as its recap). Both units carry the same `meta.classroom` entry.

---

## 1. The unit shape (3.1, 3.2)

| Phase | Gate | Task | XP |
|---|---|---|---|
| concept | 0 | NOTES — interactive deck, 20 scored items | 20 |
| concept | 0 | WORD_REC — 6 key words | 15 |
| practice | 25 | WORKBOOK — 12 Q, tiered, mixed widgets | 20 |
| practice | 25 | the unit's engine — PLACE_SHIFT (3.1) / SHORT_DIV (3.2) | 25 |
| practice | 25 | QUICK_FIRE — generative cards | 15 |
| practice | 25 | SHORT_ANSWERS — 4 reasoning Q | 20 |
| mastery | 80 | ASSESSMENT — 8 MCQ | 20 |
| mastery | 80 | GAMES | 0 |

135 XP available, capped at 100. Gates: 25 of 35 (71%), 80 of 115 (70%).

Dashboard keys: `SHORT_DIV p56 · PLACE_SHIFT p57 · QUICK_FIRE p58` — **p59 is next**.

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

### 2.3 Quick Fire — `quickFire` (both)

```js
quickFire: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['shift', 'power', 'mass'], rounds: 12 }
```

Modes: `shift` (× ÷ 10ⁿ), `power` (the missing power), `mass` (mg/g/kg/t), `round` (1–3
d.p., nearest whole / 10 / 100; one card in three carries into a trailing zero). 6–20
rounds. Dealt fresh each attempt; a wrong answer gets its slip's name and one more try
(right first time 1, right second time ½, shown 0).
3.1 uses `['shift', 'power', 'mass']`, 3.2 uses `['round']`.

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
- Arcade: `mathChallenges.js` has generators for U03_1 (× ÷ 10ⁿ) and U03_2 (rounding), mapped
  to Y7_MATH in `GENERATOR_TRACK` (Y7 Science ids collide).
