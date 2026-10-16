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
**Line Up the Points** — `DEC_COLUMN` (p77), unit key `decColumn`. Written column
addition and subtraction of decimals. Derivation in `src/utils/decColumn.js`
(`calcModel`, `itemModel`, the `diagnose…` functions, `checkDecColumnItems`); the
stages are drawn by `src/components/math/DecColumnWork.jsx` on
`DecColumnBoard.jsx`; the task screen is `src/tasks/DecColumn.jsx`.

```js
decColumn: {
  title: 'Line Up the Points', titleFr: 'Aligne les points',
  intro: '…', introFr: '…',                         // optional, shown on the first item
  levels: { 1: { en: 'Line up the points', fr: 'Aligne les points' }, … },
  items: [
    { id: 'e1', level: 1, a: '34.6', op: '+', b: '5.28' },
    { id: 'e6', level: 3, a: '7', op: '−', b: '3.64' },          // a whole number has a point
    { id: 'e11', level: 5, a: '50', op: '−', b: '23.65', unit: 'dollars',
      context: 'Mr Bowen buys a jacket for 23.65 dollars …', contextFr: '…' },   // a story: choose first
    { id: 'e14', level: 6, unit: 'dollars', context: '…', contextFr: '…',
      steps: [
        { a: '2.35', op: '+', b: '1.8', say: 'the cost of both', sayFr: 'le prix des deux' },
        { a: '10', op: '−', b: '@', say: 'the change', sayFr: 'la monnaie' },  // '@' = the step before's answer
      ] },
  ],
}
```

`a`, `b` are strings in their plain form — no `.5`, no `05`, no zero at the end
after the point (the student writes the zeros in). `op` is `+` or `−` (a hyphen is
read as a minus). A subtraction must be positive. At least one number has a point;
at most 3 decimal places; at most 8 squares once lined up and 9 while the bottom
number slides (8 for the deck activity). A story (`context`) is required for
`steps` (2–3, every step after the first uses `@`). `unit` is shown after the
answer.

**Squared paper.** Every character takes one square, the point included, so a
whole number's point is a square of its own at its end (15 = 15.). The answer row
has a box per square; carries (+) are small boxes under the answer, in the column
they go into; exchanges (−) strike the top digit and write its new value above.

**Stages** (the component derives them; a stage with nothing to do is skipped):
- *Choose* — story items only, per step: the right calculation among the other
  operation and (for −) the order swapped. Slips: "it asks for a difference — that
  is a subtraction" / "it puts the amounts together"; "the bigger number goes on top".
- *Line up* — the bottom number arrives **lined up on the right** (last digit under
  last digit) and slides one square per press (← →, one square past the right
  place either side) until the points share a column. A whole number shows a
  ghost point at its end. Slips: lined up on the right (pressing Check without
  moving); "the point of 3.46 is 2 squares to the left".
- *Zeros* — tap the empty places after the point to write orange zeros, and a
  whole number's point. Leading zeros may be tapped too; they are taken away with
  a note, not marked wrong. Slips: a missing zero ("34.6 has nothing in the
  hundredths column"); a whole number's missing point.
- *Columns* — right to left. + : the digit, and the carry in the small box of the
  next column. − : tap a top digit on the left to exchange (always the nearest
  column that can give; a 0 that is asked becomes 10, then gives one on and keeps
  9). A right digit typed before the exchange is shown is accepted and the
  exchange written in. The walk passes the point column: tap to drop the point
  straight down. A leading answer 0 may stay blank. Slips: a forgotten carry;
  the carry wrong; **upside down** (0 − 2 written as 2); **a forgotten exchange**
  (1 − 0.72 = 0.38: the tenths gave 1 away and have 9, not 10); "exchange first".

A wrong step gets its slip's name and one more try; a second wrong answer at the
same step, or "Show me", fills it in and the item pays ½ (else 1). Score: items
out of 10. Blob `{ [itemId]: 1 | 0.5 }`.

Suggested ladder (the 4.2 unit's 16 items): line up the points (+, different
places) → fill the gaps with zeros (− with a shorter top number) → a whole number
has a point → exchanges across zeros (3 d.p.) → money and measures (stories, with
"change", "how much heavier", "total") → two steps.

**Deck activity `deccol`** — one calculation on a slide, the same stages (no
choose, no steps), compact beside the slide (Notes `SIDE_ACTIVITIES`):

```js
{ id: 'act_col_twenty', type: 'deccol', a: '20', op: '−', b: '8.35', prompt, promptFr, explain, explainFr }
```

Correct = finished without a step filled in. A retry starts the sum again.

**Quick Fire** — `decNear` (8.4 − 2.9, 6.9 + 4.6: one number is 0.1 or 0.2 short of
a whole; slips: the 0.1 not given back / not taken off, given the wrong way, the
point in the wrong place) and `decChange` (10 − 3.65, 1 − 0.72: a whole number minus
a decimal; slips: a forgotten exchange, every column upside down, the point in the
wrong place; the fallback hint is "count on"). The 4.2 unit uses
`modes: ['decNear', 'decChange']`.

## 4.3 Multiplying decimals
<!-- @@U04_3_DOC@@ -->

## 4.4 Dividing decimals
<!-- @@U04_4_DOC@@ -->

## 4.5 Making decimal calculations easier
<!-- @@U04_5_DOC@@ -->
