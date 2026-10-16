# Year 7 decimal engines — Unit 4 (4.1–4.5)

The self-study units for **Unit 4 Decimals** (`Y7_MATH/U04_1` … `U04_5`), built
2026-10-16 from the classroom decks `lessons/content/y7-math/U04_1_4` (4.1–4.4 in
one period), `U04_5` and `U04_review`. Read with
[number-engines.md](number-engines.md) (the 2.6 / 3.1 / 3.2 shape these units
copy) and [../classroom-dashboard-pairing.md](../classroom-dashboard-pairing.md).

**English and French only.** From Unit 4 the Year 7 lessons drop Vietnamese, and
so do these units: `meta.vietnamese: false`, a `…Fr` twin beside every English
string and no `…Vn` one. Screens toggle EN → FR (`langsOf(track, unit)`), and the
validator holds the unit to it (`vnShadow` / `enFrProblems` in
`src/utils/langCheck.js`).

**Derive, don't store** — as in number-engines.md: an item states the question;
the engine (on `src/utils/decimal.js`) works out every step, the answer and the
name of the slip behind a wrong answer, and `npm run validate` runs the same code.

Dashboard keys: `DEC_ORDER p76 · DEC_COLUMN p77 · POINT_BACK p78 · MAKE_EASY p79`
(p80 reserved for Science 3.1). 4.4 reuses `SHORT_DIV p56`.

---

## 4.1 Ordering decimals
<!-- @@U04_1_DOC@@ -->

## 4.2 Adding and subtracting decimals
<!-- @@U04_2_DOC@@ -->

## 4.3 Multiplying decimals
<!-- @@U04_3_DOC@@ -->

**Point Out, Point Back** — `POINT_BACK`, dbKey `p78`, unit key `pointBack`, engine
`src/utils/pointBack.js` (checked by `checkPointBackItems`), screen
`src/tasks/PointBack.jsx`, the tile row `src/components/math/PointTiles.jsx`.
Plan: [plans/U04_3.md](plans/U04_3.md).

```js
pointBack: {
  title: 'Point Out, Point Back', titleFr: 'Point enlevé, point remis',
  intro: '…', introFr: '…',                         // optional, shown on the first item
  levels: { 1: { en: 'Count the decimal places', fr: 'Compte les décimales' }, … },
  items: [
    { id: 'm1', level: 1, a: '1.4', b: '6' },                       // a decimal × a whole number, either order
    { id: 'm3', level: 1, a: '9', b: '3.7' },
    { id: 'm8', level: 3, a: '2.7', b: '13' },                      // 2-digit multiplier: two rows and a total
    { id: 'm11', level: 4, a: '0.95', b: '12', money: true },       // dollars: written to 2 d.p.
    { id: 'm12', level: 4, a: '3.15', b: '16', unit: 'kg' },        // a measure (unitFr optional)
    { id: 'm14', level: 5, kind: 'fact', fact: '38 × 26 = 988',
      variants: ['3.8 × 26', '0.38 × 26', '98.8 ÷ 26', '9.88 ÷ 38'] },   // 2–4 variants
    { id: 'm16', level: 6, a: '0.85', b: '14', money: true,
      context: 'A bus ticket costs 0.85 dollars. …', contextFr: '…' },
  ],
}
```

`a`, `b` are strings: exactly one a decimal (1–3 d.p., at most 4 digits with the point
out), the other a whole number 2–99. The digits of the whole-number product plus two
faded zeros must fit 7 tiles. A `money` answer must be exact to 2 d.p. A `fact` is
`whole × whole = product` (checked); a × variant multiplies a decimal by a whole number
using the fact's two factors, a ÷ variant divides the product's digits by one factor;
every variant's answer must be the fact's digits with a point placed (at most 2 placeholder
zeros in front, none added at the end).

**Stages** (the engine derives them):
- *Estimate* — typed. Accepted: any product of the factors rounded to 1 s.f. or (from
  0.5 up) the nearest whole number, or anything within ×½…×2 of the answer. The book line
  is a decimal ≥ 1 to the nearest whole, below 1 to 1 s.f., a 2-digit whole to 1 s.f.
  (`3.6 × 24 ≈ 4 × 20 = 80`); for ÷ the dividend moves to a friendly multiple
  (`143.1 ÷ 27 ≈ 150 ÷ 30 = 5`). The stage is skipped when rounding changes nothing
  (`0.3 × 4`). The exact answer typed as an estimate is a soft nudge, not a try.
- *Point out* — the whole-number product, typed. For a 2-digit multiplier whose ones digit
  is not 0, under a top number of 2+ digits: three boxes, `36 × 4`, `36 × 20`, the total.
- *Point back* — tap the gap. The row is the product's digits with two faded 0 tiles in
  front, always, so a placeholder zero can be chosen without the row giving it away.
- *Write it* — only for money (exactly 2 d.p.) or an answer ending in zeros (`5.00`: 5,
  5.0 and 5.00 are all accepted — nothing was rounded, unlike 3.2's rounded answers).
- A `fact` item runs *estimate → point back* once per variant, on the fact's digits.

**Slips named** (`diagnoseEstimate`, `diagnoseOut`, `diagnoseRow`, `diagnosePlace`,
`diagnoseWrite`, `diagnoseProduct`): `smaller` — decimals make it smaller (0.12 for
0.3 × 4: the answer is less than the decimal it multiplied); `left` — the places counted
from the left (8.64 for 3.6 × 24); `placeholder` — a 0 the answer needed left out (0.8
for 0.02 × 4); `many` / `few` — a decimal place too many or too few, with the estimate
("your estimate was 80, and 8.64 is 10 times too small"); `far` — a ÷ variant placed away
from the estimate; `pointout` — the point never went back; `money` — the right value
without its cents (11.4 for 11.40 dollars); estimates `scale` (10 times out), `smaller`,
`far`; rows `tenszero` (72 for 36 × 20), `row`, `add`; the product `kept` (the point left
in), `added` (36 + 7). Two wrongs (or Show me) fill the stage and the item pays half.

**Deck activity `pointback`** (`src/components/notes/PointBackActivity.jsx`, checked by
`checkPointBackActivity` at the U04_3 activity marker; listed in Notes' `SIDE_ACTIVITIES`):

```js
{ id, type: 'pointback', a: '2.25', b: '4', prompt, promptFr, explain, explainFr }   // shows 225 × 4 = 900: tap the gap
{ id, type: 'pointback', fact: '53 × 27 = 1431', q: '143.1 ÷ 27', prompt, … }        // the fact's digits: the estimate places it
```

Two tries; a wrong first tap gets its named slip.

**Quick Fire** modes `pointMul` (a 1-dp/2-dp decimal × 2–9 in your head, product ≤ 120:
`0.3 × 4`, `0.06 × 5`, `0.25 × 4`) and `pointFact` (`3.6 × 24 = ?` given
`36 × 24 = 864`), both marked by `diagnoseProduct`.

## 4.4 Dividing decimals
<!-- @@U04_4_DOC@@ -->
`Y7_MATH/U04_4` — plan in [plans/U04_4.md](plans/U04_4.md). No new task and no new
dbKey: the practice engine is the 3.2 **Bus Stop** (`SHORT_DIV`, p56 —
[number-engines.md](number-engines.md) §2.2), which already divides a decimal
(`dividend: '8.24'`), adds zeros, rounds (`dp`) and takes divisors up to 25. 4.4 adds
two **optional stages, switched on per item** (`src/utils/shortDivExtras.js`, drawn by
`src/components/math/ShortDivExtras.jsx`). An item without them runs exactly as before,
so 3.2's Bus Stop and the Number Gym short-div drills are untouched.

```js
shortDiv: {
  title: 'Bus Stop', titleFr: 'Division courte', intro, introFr,
  levels: { 1: { en: 'The point goes straight up', fr: '…' }, … },
  items: [
    { id: 'd2', level: 1, dividend: '19.35', divisor: 5, check: true },   // ends with the inverse
    { id: 'd8', level: 4, dividend: '55.2', divisor: 12, table: true },   // starts with the 12 times table
    { id: 'd14', level: 6, dividend: '38.75', divisor: 5, check: true,
      context: 'Mr Bowen and four friends share …', contextFr: '…' },
  ],
}
```

- **`table: true`** — a 2-digit divisor only (11–25; the validator refuses less). A
  *Table* stage comes first: 1 × d is given, the student types 2 × d … 9 × d ("keep
  adding d"). Enter goes to the next empty row and checks once every row is written.
  Slip: a wrong row is flagged with "Row 7: add 12 to the row above — 72 + 12" (never the
  value); a second wrong check writes the wrong rows in and the item pays half. The
  finished table then sits in the left column, beside the bus stop, while they divide.
- **`check: true`** — exact items only (the validator refuses it with `dp`, where the
  rounded answer does not multiply back, and on remainder items). A *Check* stage comes
  last: three calculations as buttons, in an order fixed by the item id — `answer × d`
  (right), `dividend × d` ("that multiplies the number you started with") and
  `answer ÷ d` ("dividing again only takes you further away"). One wrong pick is a
  named slip; a second (or Show me) settles it and pays half. The done panel adds the
  check line: `2.04 × 6 = 12.24 — back to where you started`.
- Stage chips read Table · Divide · (Round) · Check. The screen's new strings are in its
  `T` table in all three languages; the extras' messages are `{ en, fr }`.
- `checkShortDivExtras(items)` runs in `npm run validate` (the U04_4 marker) beside
  `checkShortDivItems`; it also proves `answer × d` comes back to the dividend.

**Quick Fire** (`utils/quickFire.js`, the U04_4 block — helpers prefixed `div44`):
`quickFire: { modes: ['decdivide', 'divcheck'], rounds: 12 }`. Both deal the quotient
first (1.4 · 2.06 · 0.38 · 2.13 · 0.06 shapes) and build the dividend from it, so every
card divides exactly by 2–9.
- `decdivide` — "8.24 ÷ 4 =", typed. Slips: a lost 0 (2.6 for 2.06: "a digit was too
  small to divide — write 0"), the right digits with the point elsewhere (20.6, 0.206:
  "it goes straight up"), anything else answered by the inverse ("2.5 × 4 = 10, not
  8.24"). A comma is a soft nudge, not a wrong answer.
- `divcheck` — "9.18 ÷ 3 = 3.6. Check it with the inverse. Is it right?", two buttons
  (Right / Wrong, answered once). About 45% of claims are right; the rest are a lost 0
  or the point one place out. The verdict is the multiplication: "3.6 × 3 = 10.8, not
  9.18 — so it is wrong. 9.18 ÷ 3 = 3.06."

**Deck activities:** no new type — `predict`, `estimate`, `busstop` (a decimal
dividend, a 2-digit divisor, added zeros), `sort` and `round`.

## 4.5 Making decimal calculations easier
<!-- @@U04_5_DOC@@ -->
