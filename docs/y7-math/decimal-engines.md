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
**Fill the Zeros — `decOrder`, task `DEC_ORDER` (p76).** The one idea: a longer
decimal is not a bigger one. Engine `src/utils/decOrder.js`; one item runner
shared by the task and the deck (`src/components/math/DecOrderItem.jsx`, board
`DecOrderBoard.jsx`); screen `src/tasks/DecOrder.jsx`; validator
`checkDecOrderItems` at the `U04_1_CHECK` marker.

```js
decOrder: {
  title: 'Fill the Zeros', titleFr: 'Complète avec des zéros',
  intro: '…', introFr: '…',                                   // optional, first item only
  levels: { 1: { en: 'Compare two', fr: 'Compare deux nombres' }, … },
  items: [
    { id: 'c1', level: 1, kind: 'compare', a: '0.8', b: '0.75' },            // < = or >
    { id: 'o1', level: 2, kind: 'order', nums: ['5.6', '5.16', '5.06', '5.616'], dir: 'asc' },
    { id: 'o3', level: 3, kind: 'order', nums: […], dir: 'desc' },             // starting with the largest
    { id: 'o7', level: 5, kind: 'order', word: 'fastest', position: 3, unit: 's',
      nums: ['14.3', …], labels: ['Linh', …], context: '…', contextFr: '…' },  // who came third?
    { id: 'd1', level: 6, kind: 'digit', a: '3.□6', sign: '>', b: '3.47' },   // which digits fit the box?
  ],
}
```

Numbers are strings, non-negative, at most 4 decimal places and a 4-digit
whole-number part. `order`: 3–6 different values, `dir` (`asc` / `desc`) or a
`word` that brings its own direction — `fastest`, `cheapest`, `lightest`,
`shortest` start with the smallest; `slowest`, `most expensive`, `heaviest`,
`longest` with the largest (`smallest` / `largest` are the plain ones).
`labels` names each number (runners); `unit` is a short symbol shown after each
row; `position` (2 … n − 1) adds "which one is the third fastest?". `digit`:
exactly one `□` (or `_`) in `a` or `b`, never leading a whole-number part, and
the digits that work must be some but not all of 0–9. `fill: false` drops the
fill stage. **The validator refuses an order list with no trap** — one where no
longer number is the smaller one and the whole-number parts never decide.

**Stages** (derived — `stagesOf`):
- *Fill* (when the numbers have different numbers of decimal places) — the rows
  are lined up at the point; tap a dashed gap to fill it (and the gaps before it)
  with an **orange** zero, tap an orange zero to take it back; a whole number gets
  an orange point. Not marked: Check only nudges until every row has as many
  places as the longest.
- *Order* — tap the rows in order (numbered badges); tap one again to take it
  back. *Compare* — <, = or > (each with its words: is less than / is equal to /
  is greater than). *Digits* — toggle 0–9, Check.
- *Position* — the rows redrawn in the asked order, unnumbered: tap the third.

**Slips** (`pairSlip`, named before the reason "fill with zeros: 3.30 and 3.25 —
the tenths decide: 3 tenths beat 2"): `whole` the whole-number part ignored ·
`decInt` the decimal part read as a whole number (.25 "beats" .3 because 25 > 3) ·
`longer` longer is bigger · `value` a plain misreading. A list is matched first
against whole slip orders — `reversed` (the right order the wrong way round;
with a word, "the fastest time is the SMALLEST number"), `decInt`, `longer`,
`whole` — then named by its first wrong pair. Compare adds `trailing` (a zero at
the end changes nothing) and `notEqual`; position `end` (counted from the wrong
end) and `count`; digits `extra` / `equal` (the boundary digit) / `missing`.

Task: a wrong answer is named and tried again (the right part of an order is
kept); a second one or Show me fills the stage in and the item pays ½. Blob
`{ [itemId]: 1 | 0.5 }`, score out of 10. Ladder used in 4.1: compare two → 
smallest first → largest first → whole-number parts differ → times, money and
measures (fastest + third, cheapest, heaviest, longest + second) → a missing
digit. 16 items.

**Deck activity `decorder`** — the same item fields on the activity, plus
`prompt` / `explain` (and `…Fr`): `{ id, type: 'decorder', kind: 'compare' |
'order' | 'digit', …, prompt, promptFr, explain, explainFr }`. One try: the first
wrong answer ends it, named, with the right answer drawn. Notes.jsx adds it to
`SIDE_ACTIVITIES`, so from lg it sits in the column beside the slide (compact
board); on a phone it is the footer under the slide, like every activity.

**Quick Fire modes** `deccompare` (3.3 □ 3.25: two buttons, never equal — pairs
built round the decInt, longer and whole traps) and `decpick` (the smallest or
largest of four, 2 × 2 buttons). A wrong button is answered by its slip.
4.1 uses `['deccompare', 'decpick']`.

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

`Y7_MATH/U04_5`, from the classroom deck `U04_5` (one period). One idea: **same
answer, less work** — and × a decimal less than 1 makes a number *smaller*. Plan:
[plans/U04_5.md](plans/U04_5.md).

### Make It Easy — `makeEasy` (`MAKE_EASY`, p79)

`src/utils/makeEasy.js` · `src/tasks/MakeEasy.jsx` · deck activity
`src/components/notes/MakeEasyActivity.jsx`.

```js
makeEasy: {
  title: 'Make It Easy', titleFr: 'Rends-le facile',
  intro: '…', introFr: '…',
  levels: { 1: { en: 'Tenths: ÷ 10 first', fr: '…' }, … },
  items: [
    { id: 'e1', level: 1, a: '340', b: '0.2' },                 // 340 × 0.2
    { id: 'e6', level: 3, kind: 'of', a: '58', b: '0.5' },      // "half of 58"
    { id: 'e10', level: 4, a: '5.6', b: '9' },                  // × 9 / × 11
    { id: 'e13', level: 5, a: '6.3', b: '4' },                  // partitioning
    { id: 'e17', level: 6, a: '650', b: '0.4', cue: 'of',       // a story
      context: '… Mr Bowen drinks 0.4 of it …', contextFr: '…' },
  ],
}
```

`a`, `b` are strings; the operation is always × (`op: '×'` may be written). The
**family** comes from `b`: `0.5` half · `0.25` quarter · `0.1` tenth · `0.2`–`0.9`
tenths (÷ 10, × d) · `0.02`–`0.09` hundredths (÷ 100, × d) · `9` / `11` near10
(× 10 ∓ one lot) · a whole 2–8 with a decimal `a` ≥ 1 (≤ 2 d.p.) partition. Anything
else is refused. `kind: 'of'` (b < 1) states the item in words — "half of", "a
quarter of", "a tenth of", "0.4 of". A `context` makes it a story; `cue` is `of`
(b < 1, the default) or `each` (b ≥ 1, the default: "9 notebooks, each 2.15").

**Stages** (derived):
- *Words* (`of` items and stories) — which calculation: `a × b`, `a ÷ b`, `a + b`.
  Slips: "of" means × (÷ 0.4 would give more than 650); "each" with 9 of them is
  9 lots, not + and not ÷.
- *Size* (× a number less than 1, not `of`/story) — bigger or smaller than `a`?
  Slip `bigger`: multiplying does not always make a number bigger.
- *Easy way* — 2–3 calculations, shuffled by id: the right one(s) and the
  misconceptions. Two right ways where they exist: `× 0.9` is ÷ 10 × 9 **or**
  `a − a ÷ 10`; `3.9 × 6` is partition **or** nearly 4 (`4 × 6 − 0.1 × 6`).
- *Work it out* — each step's box in turn (`340 ÷ 10 = 34`, `34 × 2 = 68`); the last
  box is the answer. A ÷ / × by 10 or 100 is marked by `placeShift.diagnoseShift`.

**Named slips** (every misconception's value is worked out, offered or not, so a
typed answer — Quick Fire, the deck — is named by it): `divd` × 0.2 as ÷ 2 ·
`muld` the point in b forgotten (× 2) · `hund` / `tenthscol` the wrong column (÷ 100
for tenths, ÷ 10 for hundredths) · `double` / `fifth` (× 0.5 as × 2, ÷ 5) ·
`twentyfive` / `times4` (× 0.25 as ÷ 25, × 4) · `times10` / `hundred` · `wrongway`
(× 9 as × 10 + one lot) · `minusone` / `plusone` (one lot as 1) · `wholeonly` (34 − 3
for 3.4 × 9) · `partpart` (the decimal part not multiplied) · `point` (3 × 6 for
0.3 × 6) · `pointstep` (0.2 × 6 = 0.12) · `nearlyone` (− 0.1, not − 0.1 × 6); then
`bigger`, `place` (right digits, wrong point) and `value`. Step boxes add `sign`
(+ for −), `one`, `wholeonly`, `point` ("0.3 is 3 tenths, × 4 = 12 tenths"),
`direction` and `line` (line up the points).

Scoring as Slide the Digits: a wrong answer is named and tried again; a second, a
"Show me", or a wrong pick that leaves only the right one (the two-way size
question) fills the stage in and the item pays ½. Blob `{ [itemId]: 1 | 0.5 }`, score
out of 10. `checkMakeEasyItems` proves every item: each right route ends at
`a × b`, every box accepts its own value (≤ 4 d.p.), every offered way is marked
the way it should be, and every misconception's value is named by its own code.

**Deck activity `makeeasy`** — `{ id, type: 'makeeasy', a, b, kind?, context?,
contextFr?, cue?, prompt, promptFr, explain, explainFr }`: the words (story/`of`),
the easy way, the boxes; no size stage. One wrong answer per stage is named; a
second fills it in and the activity scores wrong. Enter in a box does not reach the
deck's Enter-for-next. It sits beside the slide from lg (`SIDE_ACTIVITIES` in
Notes.jsx).

**Quick Fire** — `makeeasy` (a × b = ?, typed, slip named by `diagnoseAnswer`) and
`easyway` (two buttons: a right way and a misconception). Nine shapes cover every
family; 3000 seeds × 12 cards were dealt in Node with no card refusing its own
answer and every misconception named by its own code.
