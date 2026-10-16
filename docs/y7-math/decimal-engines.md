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

## 4.4 Dividing decimals
<!-- @@U04_4_DOC@@ -->

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
