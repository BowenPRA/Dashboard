// src/data/AOPS/QUAD_1A/diagrams.js
// Teaching diagrams for QUAD_1A — Parabolas and the Vertex Form.
//
// Adapted from the classroom deck in the sibling `lessons` repo
// (content/freshman-math/U01_4), re-housed in this app's visual language:
// the slate/tailwind palette and monospace for every number, coordinate and
// equation (docs/svg-diagrams.md §3-4).
//
// House rules kept from both projects:
//  · every diagram opens with a white plate, so it reads on a light OR dark
//    surface and never depends on the page's text colour;
//  · every <text> is written out LITERALLY — helpers emit shapes and paths
//    only, because `npm run audit:svg` cannot see text produced by a
//    `${helper(...)}` call and will silently check nothing. That is why the
//    axis numbers below are repeated by hand in every graph rather than looped;
//  · label text sits beside the artwork, never on top of the curve.
//
// ONE GRID, USED EVERYWHERE. Every graph in this file is drawn on the same axes
// at the same scale, so two slides can be compared honestly:
//     x from -5 to 5, y from -2 to 10, 34 px per unit in BOTH directions,
//     origin at (420, 360) in an 840 x 470 viewBox.
// Equal scale on both axes matters more here than usual: half this unit is
// about a curve getting narrower or wider, and a squashed y-axis is a lie about
// exactly that.
//
// TALL, NOT WIDE (840 x 560 for the tables and the anatomy). These sit in a
// `split` media panel that is roughly square; a 2.5:1 strip renders there at
// half the height it could, with white bands above and below.
//
// THE ARGUMENT THIS FILE HAS TO CARRY, in order:
//   X2_TABLE      the table they fill in before they plot anything. The negative
//                 column is the point: (−3)² is +9, so the left arm climbs.
//   X2_CURVE      the plotted result, named: parabola, vertex, axis of symmetry.
//   SHIFT_UP      y = x² + 1 beside y = x². Same curve, every point one higher.
//   TABLE_2X      the table for y = x² + 2x, which is the first one that does
//                 something they did not predict.
//   TWO_CURVES    x² and x² + 2x on one grid — same shape, moved down-left, and
//                 the arrow that says by how much.
//   FROM_VERTEX   y = (x + 1)² plotted the fast way: bottom first, then out in
//                 both directions using symmetry.
//   X_MINUS_2     y = (x − 2)², the sign trap, with the vertex at (2, 0).
//   VERTEX_ANATOMY  the finished form, labelled: a, h, k and what each one does.

const INK = '#1e293b'
const KEY = '#d97706' // the book's key-word orange
const GRID = '#e2e8f0'
const RED = '#ef4444'
const BLUE = '#3b82f6'
const GREEN = '#10b981'
const PURPLE = '#a855f7'
const GHOST = '#cbd5e1'
const BLUE_T = '#eff6ff'
const GREEN_T = '#f0fdf4'
const ORANGE_T = '#fffbeb'
const PURPLE_T = '#f3e8ff'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
// House rule (docs/svg-diagrams.md §4): anything mathematical is set in
// monospace, so digits line up and the numbers read as notation. Prose
// labels stay in the sans stack.
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// ── The shared grid ────────────────────────────────────────────────────────
const U = 34 // px per unit, both directions
const OX = 420
const OY = 360
const XMIN = -5
const XMAX = 5
const YMIN = -2
const YMAX = 10

const X = (x) => OX + x * U
const Y = (y) => OY - y * U

/** Grid lines + the two axes. Shapes only — the numbers are written literally. */
const grid = () => {
  let s = ''
  for (let x = XMIN; x <= XMAX; x++)
    s += `<line x1="${X(x)}" y1="${Y(YMAX)}" x2="${X(x)}" y2="${Y(YMIN)}" stroke="${GRID}" stroke-width="1"/>`
  for (let y = YMIN; y <= YMAX; y++)
    s += `<line x1="${X(XMIN)}" y1="${Y(y)}" x2="${X(XMAX)}" y2="${Y(y)}" stroke="${GRID}" stroke-width="1"/>`
  s += `<line x1="${X(XMIN)}" y1="${Y(0)}" x2="${X(XMAX)}" y2="${Y(0)}" stroke="${INK}" stroke-width="2.2"/>`
  s += `<line x1="${X(0)}" y1="${Y(YMAX)}" x2="${X(0)}" y2="${Y(YMIN)}" stroke="${INK}" stroke-width="2.2"/>`
  return s
}

/** A curve y = f(x), sampled finely and clipped to the grid's y window. */
const curve = (f, color, width = 3.4, dash = '') => {
  const pts = []
  for (let i = 0; i <= 400; i++) {
    const x = XMIN + (i / 400) * (XMAX - XMIN)
    const y = f(x)
    if (y < YMIN || y > YMAX) {
      if (pts.length && pts[pts.length - 1] !== null) pts.push(null)
      continue
    }
    pts.push(`${X(x).toFixed(1)},${Y(y).toFixed(1)}`)
  }
  let d = ''
  let pen = false
  for (const p of pts) {
    if (p === null) { pen = false; continue }
    d += (pen ? 'L' : 'M') + p + ' '
    pen = true
  }
  return `<path d="${d.trim()}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const dot = (x, y, color, r = 6.5) =>
  `<circle cx="${X(x)}" cy="${Y(y)}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="2.5"/>`

/** A thin leader line ending in a dot, for a label out in the margin. */
const leader = (x1, y1, x2, y2, color) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.6"/><circle cx="${x2}" cy="${y2}" r="3.4" fill="${color}"/>`

/** One row of table cells. Text is written literally by the caller, not here. */
const cells = (x, y, w, h, n, fill) => {
  let s = ''
  for (let i = 0; i < n; i++)
    s += `<rect x="${x + i * w}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${INK}" stroke-width="1.6"/>`
  return s
}

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // THE FIRST TABLE. Seven columns, x = −3..3. The row of squares is left blank
  // on purpose in the top table and filled in the bottom one, so the same
  // diagram can be shown before and after — no, it cannot: one diagram, one
  // state. This one is the FILLED table; the class fills theirs on paper first
  // and this is the check. The two left-hand entries are the whole point.
  // Cells: 88 wide, 54 tall, starting at x = 96, header column 130 wide.
  // ---------------------------------------------------------------------------
  // THE FIRST TABLE. Seven columns, x = -3..3, filled in - the class works
  // theirs on paper first and this is the check. The two left-hand entries are
  // the whole point, so the dashed tie under the row says so out loud.
  // Drawn TALL (840 x 560) rather than as a wide strip: it sits in a `split`
  // media panel that is roughly square, and a 2.5:1 diagram there renders at
  // about half the height with white bands above and below it.
  // Geometry: header column x = 56, w = 154. Seven cells from x = 210, w = 82,
  // rows 88 tall at y = 92 and y = 180.
  // ---------------------------------------------------------------------------
  X2_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="50" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">Fill this in before you plot anything</text>

    <rect x="56" y="92" width="154" height="88" fill="${ORANGE_T}" stroke="${INK}" stroke-width="1.8"/>
    <rect x="56" y="180" width="154" height="88" fill="${BLUE_T}" stroke="${INK}" stroke-width="1.8"/>
    ${cells(210, 92, 82, 88, 7, '#ffffff')}
    ${cells(210, 180, 82, 88, 7, '#ffffff')}

    <text x="133" y="148" font-family="${MONO}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">x</text>
    <text x="133" y="236" font-family="${MONO}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="middle">y = x²</text>

    <text x="251" y="149" font-family="${MONO}" font-size="30" fill="${INK}" text-anchor="middle">−3</text>
    <text x="333" y="149" font-family="${MONO}" font-size="30" fill="${INK}" text-anchor="middle">−2</text>
    <text x="415" y="149" font-family="${MONO}" font-size="30" fill="${INK}" text-anchor="middle">−1</text>
    <text x="497" y="149" font-family="${MONO}" font-size="30" fill="${INK}" text-anchor="middle">0</text>
    <text x="579" y="149" font-family="${MONO}" font-size="30" fill="${INK}" text-anchor="middle">1</text>
    <text x="661" y="149" font-family="${MONO}" font-size="30" fill="${INK}" text-anchor="middle">2</text>
    <text x="743" y="149" font-family="${MONO}" font-size="30" fill="${INK}" text-anchor="middle">3</text>

    <text x="251" y="237" font-family="${MONO}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">9</text>
    <text x="333" y="237" font-family="${MONO}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">4</text>
    <text x="415" y="237" font-family="${MONO}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">1</text>
    <text x="497" y="237" font-family="${MONO}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">0</text>
    <text x="579" y="237" font-family="${MONO}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">1</text>
    <text x="661" y="237" font-family="${MONO}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">4</text>
    <text x="743" y="237" font-family="${MONO}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">9</text>

    <line x1="251" y1="300" x2="743" y2="300" stroke="${KEY}" stroke-width="2" stroke-dasharray="6 6"/>
    <line x1="251" y1="278" x2="251" y2="300" stroke="${KEY}" stroke-width="2"/>
    <line x1="743" y1="278" x2="743" y2="300" stroke="${KEY}" stroke-width="2"/>

    <text x="420" y="356" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">The two ends came out the same</text>
    <text x="420" y="410" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">A negative number squared is positive:</text>
    <text x="420" y="448" font-family="${MONO}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">(−3) × (−3) = 9</text>
    <text x="420" y="504" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">So the left side of the picture must climb, not fall.</text>
  </svg>`,

  // ---------------------------------------------------------------------------
  // THE SEVEN POINTS, then the curve through them. This is the check for the
  // table slide: the class has these seven dots on squared paper and needs to
  // see that a SMOOTH curve goes through them, not a seven-segment dot-to-dot.
  // Points are (-3,9) (-2,4) (-1,1) (0,0) (1,1) (2,4) (3,9), read straight off
  // X2_TABLE.
  // ---------------------------------------------------------------------------
  X2_POINTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    ${curve((x) => x * x, BLUE)}
    ${dot(-3, 9, BLUE, 7)}
    ${dot(-2, 4, BLUE, 7)}
    ${dot(-1, 1, BLUE, 7)}
    ${dot(0, 0, BLUE, 7)}
    ${dot(1, 1, BLUE, 7)}
    ${dot(2, 4, BLUE, 7)}
    ${dot(3, 9, BLUE, 7)}

    <text x="446" y="378" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke">0</text>
    <text x="${X(-4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">2</text>
    <text x="${X(4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(6) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">6</text>
    <text x="410" y="${Y(8) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">8</text>

    ${leader(634, 120, X(3) + 8, Y(9), BLUE)}
    <text x="646" y="114" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}">your seven points</text>

    ${leader(218, 260, X(-2.2) - 8, Y(5.2), KEY)}
    <text x="210" y="254" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="end">one smooth curve</text>
    <text x="210" y="278" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="end">not a dot-to-dot</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  X2_CURVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    <line x1="${X(0)}" y1="${Y(YMAX)}" x2="${X(0)}" y2="${Y(YMIN)}" stroke="${RED}" stroke-width="2" stroke-dasharray="7 6"/>
    ${curve((x) => x * x, BLUE)}
    ${dot(0, 0, RED)}

    <text x="446" y="378" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke">0</text>
    <text x="${X(-4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">2</text>
    <text x="${X(4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(6) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">6</text>
    <text x="410" y="${Y(8) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">8</text>

    ${leader(688, 96, X(2.9) + 6, Y(8.4), BLUE)}
    <text x="700" y="90" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}">parabola</text>
    <text x="700" y="116" font-family="${FONT}" font-size="17" fill="${INK}">the whole curve</text>

    ${leader(248, 402, X(-0.1), Y(-1.35), RED)}
    <text x="238" y="408" font-family="${FONT}" font-size="21" font-weight="bold" fill="${RED}" text-anchor="end">axis of symmetry</text>
    <text x="238" y="432" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="end">the mirror line</text>

    ${leader(628, 410, X(0.3), Y(0) - 4, RED)}
    <text x="640" y="404" font-family="${FONT}" font-size="21" font-weight="bold" fill="${RED}">vertex (0, 0)</text>
    <text x="640" y="428" font-family="${FONT}" font-size="17" fill="${INK}">the turning point</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // + 1. The two curves on one grid, with three vertical arrows measuring the
  // gap at x = −2, 0 and 2 — all the same length, which is the whole claim.
  // ───────────────────────────────────────────────────────────────────────────
  SHIFT_UP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    ${curve((x) => x * x, GHOST, 3)}
    ${curve((x) => x * x + 1, BLUE)}

    <line x1="${X(-2)}" y1="${Y(4)}" x2="${X(-2)}" y2="${Y(5)}" stroke="${KEY}" stroke-width="3"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(1)}" stroke="${KEY}" stroke-width="3"/>
    <line x1="${X(2)}" y1="${Y(4)}" x2="${X(2)}" y2="${Y(5)}" stroke="${KEY}" stroke-width="3"/>
    ${dot(0, 1, KEY)}

    <text x="446" y="378" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke">0</text>
    <text x="${X(-4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">2</text>
    <text x="${X(4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(6) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">6</text>
    <text x="410" y="${Y(8) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">8</text>

    ${leader(700, 120, X(2.75) + 6, Y(8.6), BLUE)}
    <text x="712" y="114" font-family="${MONO}" font-size="21" font-weight="bold" fill="${BLUE}">y = x² + 1</text>

    ${leader(158, 176, X(-2.9) - 8, Y(8.4), GHOST)}
    <text x="148" y="170" font-family="${MONO}" font-size="20" font-weight="bold" fill="#64748b" text-anchor="end">y = x²</text>

    ${leader(650, 300, X(2) + 4, Y(4.5), KEY)}
    <text x="662" y="294" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}">every gap is 1</text>
    <text x="662" y="318" font-family="${FONT}" font-size="17" fill="${INK}">shape unchanged</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE AWKWARD TABLE. y = x² + 2x for x = −4..2. Two working rows, so the
  // −1 column is visibly the sum of 1 and −2 rather than a number off a
  // calculator. The lowest value is boxed: it is BELOW the axis, which nobody
  // predicts.
  // ---------------------------------------------------------------------------
  // THE AWKWARD TABLE. y = x² + 2x for x = -4..2, with the two working rows
  // kept apart so the -1 column is visibly 1 + (-2) rather than a number off a
  // calculator. The lowest value is boxed: it is BELOW the axis, which nobody
  // predicts. Same tall proportions as X2_TABLE, and for the same reason.
  // Geometry: header column x = 56, w = 154. Cells from x = 210, w = 82, four
  // rows 64 tall from y = 92. The boxed cell is x = -1, the fourth column.
  // ---------------------------------------------------------------------------
  TABLE_2X: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="50" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">y = x² + 2x, one column at a time</text>

    <rect x="56" y="92" width="154" height="64" fill="${ORANGE_T}" stroke="${INK}" stroke-width="1.8"/>
    <rect x="56" y="156" width="154" height="64" fill="#f4f7f9" stroke="${INK}" stroke-width="1.8"/>
    <rect x="56" y="220" width="154" height="64" fill="#f4f7f9" stroke="${INK}" stroke-width="1.8"/>
    <rect x="56" y="284" width="154" height="64" fill="${GREEN_T}" stroke="${INK}" stroke-width="1.8"/>
    ${cells(210, 92, 82, 64, 7, '#ffffff')}
    ${cells(210, 156, 82, 64, 7, '#ffffff')}
    ${cells(210, 220, 82, 64, 7, '#ffffff')}
    ${cells(210, 284, 82, 64, 7, '#ffffff')}

    <text x="133" y="134" font-family="${MONO}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">x</text>
    <text x="133" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">x²</text>
    <text x="133" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">2x</text>
    <text x="133" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">y</text>

    <text x="251" y="134" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−4</text>
    <text x="333" y="134" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−3</text>
    <text x="415" y="134" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−2</text>
    <text x="497" y="134" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−1</text>
    <text x="579" y="134" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">0</text>
    <text x="661" y="134" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">1</text>
    <text x="743" y="134" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">2</text>

    <text x="251" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">16</text>
    <text x="333" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">9</text>
    <text x="415" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">4</text>
    <text x="497" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">1</text>
    <text x="579" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">0</text>
    <text x="661" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">1</text>
    <text x="743" y="198" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">4</text>

    <text x="251" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−8</text>
    <text x="333" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−6</text>
    <text x="415" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−4</text>
    <text x="497" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">−2</text>
    <text x="579" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">0</text>
    <text x="661" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">2</text>
    <text x="743" y="262" font-family="${MONO}" font-size="26" fill="${INK}" text-anchor="middle">4</text>

    <text x="251" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">8</text>
    <text x="333" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">3</text>
    <text x="415" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">0</text>
    <text x="497" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${RED}" text-anchor="middle">−1</text>
    <text x="579" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">0</text>
    <text x="661" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">3</text>
    <text x="743" y="326" font-family="${MONO}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">8</text>

    <rect x="456" y="284" width="82" height="64" fill="none" stroke="${RED}" stroke-width="4"/>
    ${leader(497, 402, 497, 354, RED)}

    <text x="420" y="440" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}" text-anchor="middle">One value came out below the x-axis</text>
    <text x="420" y="488" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">y = x² never once did that.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  TWO_CURVES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    ${curve((x) => x * x, GHOST, 3)}
    ${curve((x) => x * x + 2 * x, GREEN)}
    ${dot(0, 0, GHOST)}
    ${dot(-1, -1, GREEN)}
    <path d="M ${X(0) - 6} ${Y(0) + 6} L ${X(-1) + 7} ${Y(-1) - 7}" stroke="${KEY}" stroke-width="3.4" stroke-linecap="round"/>

    <text x="446" y="378" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke">0</text>
    <text x="${X(-4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2) - 16}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">2</text>
    <text x="${X(4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(6) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">6</text>
    <text x="410" y="${Y(8) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">8</text>

    ${leader(660, 150, X(2.6) + 6, Y(9), GHOST)}
    <text x="672" y="144" font-family="${MONO}" font-size="20" font-weight="bold" fill="#64748b">y = x²</text>

    ${leader(170, 150, X(-3.4) - 8, Y(8.4), GREEN)}
    <text x="160" y="144" font-family="${MONO}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="end">y = x² + 2x</text>

    ${leader(596, 424, X(-0.5) + 6, Y(-0.5), KEY)}
    <text x="608" y="418" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}">the bottom moved</text>
    <text x="608" y="442" font-family="${FONT}" font-size="17" fill="${INK}">(0, 0) went to (−1, −1)</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // PLOTTING FROM THE BOTTOM OUT. y = (x + 1)², vertex first at x = −1, then
  // one step each way, then two. The matching pairs are joined by a dashed tie
  // so the symmetry is visible rather than claimed: 1 and 1, then 4 and 4.
  // ───────────────────────────────────────────────────────────────────────────
  FROM_VERTEX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    <line x1="${X(-1)}" y1="${Y(YMAX)}" x2="${X(-1)}" y2="${Y(YMIN)}" stroke="${RED}" stroke-width="2" stroke-dasharray="7 6"/>
    ${curve((x) => (x + 1) * (x + 1), PURPLE)}
    <line x1="${X(-2)}" y1="${Y(1)}" x2="${X(0)}" y2="${Y(1)}" stroke="${KEY}" stroke-width="2" stroke-dasharray="6 5"/>
    <line x1="${X(-3)}" y1="${Y(4)}" x2="${X(1)}" y2="${Y(4)}" stroke="${KEY}" stroke-width="2" stroke-dasharray="6 5"/>
    ${dot(-1, 0, RED)}
    ${dot(-2, 1, PURPLE, 5.5)}
    ${dot(0, 1, PURPLE, 5.5)}
    ${dot(-3, 4, PURPLE, 5.5)}
    ${dot(1, 4, PURPLE, 5.5)}

    <text x="446" y="378" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke">0</text>
    <text x="${X(-4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">2</text>
    <text x="${X(4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(6) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">6</text>
    <text x="410" y="${Y(8) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">8</text>

    ${leader(596, 436, X(-0.75), Y(-0.5), RED)}
    <text x="608" y="424" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RED}">start here: (−1, 0)</text>
    <text x="608" y="448" font-family="${FONT}" font-size="17" fill="${INK}">the bracket is zero here</text>

    ${leader(638, 250, X(1) + 6, Y(4), KEY)}
    <text x="650" y="244" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}">both give 4</text>
    <text x="650" y="268" font-family="${FONT}" font-size="17" fill="${INK}">2 out either way</text>

    ${leader(176, 214, X(-3) - 8, Y(4.6), PURPLE)}
    <text x="166" y="208" font-family="${MONO}" font-size="20" font-weight="bold" fill="${PURPLE}" text-anchor="end">y = (x + 1)²</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE SIGN TRAP. y = (x − 2)² sits to the RIGHT, with y = x² ghosted behind
  // it. The label says what the arithmetic says: the bracket is zero at x = 2.
  // ───────────────────────────────────────────────────────────────────────────
  X_MINUS_2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    ${curve((x) => x * x, GHOST, 3)}
    ${curve((x) => (x - 2) * (x - 2), PURPLE)}
    <path d="M ${X(0) + 8} ${Y(0) + 44} L ${X(2) - 8} ${Y(0) + 44}" stroke="${KEY}" stroke-width="3.4" stroke-linecap="round"/>
    ${dot(0, 0, GHOST)}
    ${dot(2, 0, PURPLE)}

    <text x="446" y="378" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke">0</text>
    <text x="${X(-4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(2)}" y="382" font-family="${MONO}" font-size="18" font-weight="bold" fill="${PURPLE}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">2</text>
    <text x="${X(4)}" y="382" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(6) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">6</text>
    <text x="410" y="${Y(8) + 6}" font-family="${MONO}" font-size="18" fill="${INK}" stroke="#ffffff" stroke-width="4.5" paint-order="stroke" text-anchor="end">8</text>

    ${leader(680, 160, X(4.3) - 4, Y(5.3), PURPLE)}
    <text x="692" y="154" font-family="${MONO}" font-size="20" font-weight="bold" fill="${PURPLE}">y = (x − 2)²</text>

    ${leader(180, 160, X(-2.6) - 8, Y(6.8), GHOST)}
    <text x="170" y="154" font-family="${MONO}" font-size="20" font-weight="bold" fill="#64748b" text-anchor="end">y = x²</text>

    ${leader(600, 430, X(1.2), Y(0) + 44, KEY)}
    <text x="612" y="424" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}">minus 2 goes RIGHT</text>
    <text x="612" y="448" font-family="${FONT}" font-size="17" fill="${INK}">zero when x = 2</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE FORM, LABELLED. Three leader lines off one big equation. This is the
  // slide students copy, so the words under each label are the job each letter
  // does, not a definition of it.
  // ---------------------------------------------------------------------------
  // THE FORM, LABELLED. This is the diagram students copy, so the words under
  // each letter are the JOB each one does, not a definition of it.
  // Drawn tall (840 x 580) for the same reason as the tables: in a `split`
  // media panel a wide strip renders at half the height it could.
  // The three connector dots sit under the a, h and k glyphs of the equation
  // above them - at font-size 58 centred on x = 420 the string spans roughly
  // 139..701, which puts a at ~300, h at ~492 and k at ~676.
  // ---------------------------------------------------------------------------
  VERTEX_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 580" class="w-full h-full">
    ${plate(840, 580)}

    <rect x="110" y="44" width="620" height="132" rx="18" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.6"/>
    <text x="420" y="131" font-family="${MONO}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">y = a(x − h)² + k</text>

    <line x1="300" y1="176" x2="155" y2="242" stroke="${BLUE}" stroke-width="1.8"/>
    <circle cx="300" cy="176" r="4" fill="${BLUE}"/>
    <circle cx="155" cy="242" r="4" fill="${BLUE}"/>
    <line x1="492" y1="176" x2="420" y2="242" stroke="${GREEN}" stroke-width="1.8"/>
    <circle cx="492" cy="176" r="4" fill="${GREEN}"/>
    <circle cx="420" cy="242" r="4" fill="${GREEN}"/>
    <line x1="676" y1="176" x2="685" y2="242" stroke="${PURPLE}" stroke-width="1.8"/>
    <circle cx="676" cy="176" r="4" fill="${PURPLE}"/>
    <circle cx="685" cy="242" r="4" fill="${PURPLE}"/>

    <rect x="30" y="248" width="250" height="136" rx="12" fill="${BLUE_T}"/>
    <text x="48" y="292" font-family="${FONT}" font-size="23" font-weight="bold" fill="${BLUE}">a — the shape</text>
    <text x="48" y="328" font-family="${FONT}" font-size="19" fill="${INK}">narrow, wide,</text>
    <text x="48" y="356" font-family="${FONT}" font-size="19" fill="${INK}">or flipped over</text>

    <rect x="295" y="248" width="250" height="136" rx="12" fill="${GREEN_T}"/>
    <text x="313" y="292" font-family="${FONT}" font-size="23" font-weight="bold" fill="${GREEN}">h — left or right</text>
    <text x="313" y="328" font-family="${FONT}" font-size="19" fill="${INK}">watch the minus</text>
    <text x="313" y="356" font-family="${FONT}" font-size="19" fill="${INK}">sign carefully</text>

    <rect x="560" y="248" width="250" height="136" rx="12" fill="${PURPLE_T}"/>
    <text x="578" y="292" font-family="${FONT}" font-size="23" font-weight="bold" fill="${PURPLE}">k — up or down</text>
    <text x="578" y="328" font-family="${FONT}" font-size="19" fill="${INK}">no sign trap</text>
    <text x="578" y="356" font-family="${FONT}" font-size="19" fill="${INK}">on this one</text>

    <rect x="30" y="420" width="780" height="126" rx="14" fill="#f4f7f9" stroke="${KEY}" stroke-width="2"/>
    <text x="420" y="472" font-family="${MONO}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">vertex = (h, k)</text>
    <text x="420" y="512" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">Read it straight off the equation. No working out.</text>
  </svg>`,
}
