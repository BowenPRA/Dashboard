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
