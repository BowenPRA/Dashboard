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

## 4.4 Dividing decimals
<!-- @@U04_4_DOC@@ -->

## 4.5 Making decimal calculations easier
<!-- @@U04_5_DOC@@ -->
