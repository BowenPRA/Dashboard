# AOPS — the lines units and the Line Lab

Three units in the **Problem Solving** track (`AOPS`), built from the book's
chapter on graphing lines. The book's name never appears in learner-facing
text (house rule); section numbers appear only in code comments.

| Unit | Title | Book sections | Line Lab items |
|---|---|---|---|
| `LINE_1A` | Points, Distance & Midpoints | 8.1, and the midpoint / dividing-point half of 8.3 | 8 |
| `LINE_1B` | Graphing Lines & Slope | 8.2, and the slope half of 8.3 | 9 |
| `LINE_1C` | Equations of Lines | 8.4, 8.5, 8.6 | 10 |

Each unit has the quadratics pair's shape: **Learn** = NOTES 10 + WORD_REC 10,
**Drill** = WORKBOOK 30 (gate 15), **Prove** = LINE_LAB 25 + ASSESSMENT 25
(gate 40). Both gates are at or under 80% of the XP before them.

The track now declares `sections` (Proportion / Lines / Quadratics) so the
units list in the book's chapter order — alphabetical order would put `LINE_`
ahead of `PROP_`. A new chapter needs a row in `trackRegistry.js`.

---

## 1. The Line Lab task (`LINE_LAB`, dbKey `p55`)

Screen: `src/tasks/LineLab.jsx`. Maths: `src/utils/lineLab.js`. Words (EN/VN):
`src/utils/lineLabText.js`. Picture: `src/components/math/LinePlane.jsx`.

An **item** is a short run of steps on one coordinate plane. The item stores
the QUESTION — named points and lines written the way the book writes them —
and every answer is **derived** with exact fractions. The full schema is the
comment at the top of `utils/lineLab.js`; in short:

```js
{
  id, prompt, promptVn,                    // markdown + $KaTeX$
  grid: { xMin, xMax, yMin, yMax },        // whole numbers, axes inside, ≤ 20 wide/tall
  points: { A: [-3, -5], B: [5, 1] },      // numbers or strings like '1/2'
  lines: {
    L: '2x - y = 6',                       // any linear equation, printed as written
    M: { through: ['A', 'B'] },
    N: { through: 'P', slope: '-1/4' },    // 'undefined' for an upright line
  },
  show: ['A', 'L'],                        // drawn from the start
  hideLabels: ['L'],                       // drawn without its equation (read-it items)
  steps: [ … ],
}
```

**Click steps** (placed on the lattice): `plot`, `on` (any `count` lattice
points on a line, `exclude` optional), `xint`, `yint`, `at` (the point on a
line at a given `x` or `y`), `corner` (the right-angle corner of the distance
triangle), `midpoint`, `divide` (`ratio: [m, n]`), `extend` (T with Q the
midpoint of PT), `meet` (where two lines cross, or the "They never meet"
button for parallel lines).

**Typed steps**: `{ kind: 'type', ask }` with `ask` one of `slope`, `run`,
`rise` (`abs: true` for a length), `distance` (exact — `10`, `√117`,
`3√13/2`, and a nudge for a decimal), `xint`, `yint`, `xAt`, `yAt`,
`midpoint`, `divide` (two boxes); `equation` (`form: 'standard' | 'slope' |
'any'` — marked by LINE, then by how it is WRITTEN); `relation` (parallel /
perpendicular / same line / neither).

Any step may carry `say` / `sayVn` (and `sub` / `subVn`) to replace the
screen's wording. **Use it whenever the default wording would give the answer
away** — e.g. a plot step whose points the student is meant to work out, or a
"place points on the perpendicular line" step (the default prints the slope).

A step that makes a point may `name` it; later steps can then use the name
(`corner … name: 'C'` then `run from A to C`).

**Scoring** is Graph It's: one mark per step, paid only if right first time.
The student stays on a step until it is right; a wrong click stays on the grid
and is explained (the substitution that fails, the swapped coordinates, the
lost sign); "Show me" fills a typed step at any time and a click step after
two misses, and pays nothing.

**The validator** (`checkLineLabItems`, run by `npm run validate`) refuses:
a line that does not parse; a click target off the lattice or off the grid;
an `on` step without its `count` lattice points plus one spare; a `meet`
whose lines are the same line (ask it with `relation`); an `equation` step
the engine would not accept in its own standard and slope forms; a missing
Vietnamese prompt. It caught a real one while building: `5x − 2y = 11` meets
grid corners only at odd `x`, so its first grid left no spare point.

---

## 2. The `line` activity in a Notes deck

`activity: { type: 'line', id, prompt, promptVn, explain, explainVn, grid,
points, lines, show, hideLabels, step }` — the Line Lab item shape with ONE
click step. Rendered by `src/components/notes/LineActivity.jsx`, validated by
`checkLineActivity` (via `utils/activity.js`). Scored like every activity:
right or wrong on the first Check; tapping a placed point removes it; a
one-answer step keeps one point; a retry keeps the right points. It sits in
the side column from `lg` (listed in `SIDE_ACTIVITIES` in `Notes.jsx`).

As with every activity, it is the **last key** on its slide (the narration
generator cuts the slide there) and never shares a slide with a `check`.

---

## 3. The `SlopeLab` widget

`widget: { type: 'SlopeLab', params: { show: 'm' | 'b' | 'mb', mStart: '1/2',
bStart: 0, triangle: true } }` — one line `y = mx + b` with `y = x` ghosted
behind it. See `docs/math-widgets.md`.

---

## 4. Diagrams

Every coordinate diagram in the three units uses the same plane: `x` −8…8,
`y` −7…7, 40 px per unit on BOTH axes, origin (360, 320) in a 720 × 640
viewBox — so `X(x) = 360 + 40x`, `Y(y) = 320 − 40y`, which is how every
literal label coordinate was worked out. Tick labels are a shared `TICKS`
block, which `npm run audit:svg` splices into each diagram (run it as
`node scripts/svg-audit.mjs AOPS` — the filter is a TRACK, not a unit).

---

## 5. Preview without logging in

`preview-lines.html` (dev server base `/Dashboard/`):
`?unit=LINE_1B&open=LINE_LAB&item=5` opens one Line Lab item;
`?unit=LINE_1C&open=NOTES&slide=17` opens a deck at a slide.

Audio: the generator has no unit filter; to fill only these units, glob-patch
it to `AOPS/LINE_1*` from a small wrapper and run it with
`PYTHONIOENCODING=utf-8`.
