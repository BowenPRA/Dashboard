// src/data/ADD_MATH/AM_4B/diagrams.js
// Teaching diagrams for AM_4B — Sketching Cubic Graphs and Their Moduli
// (Cambridge IGCSE Additional Mathematics 0606, section 4.3).
//
// House rules (docs/svg-diagrams.md, and the AM_4A deck):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY — helpers emit shapes and paths only,
//    because `npm run audit:svg` cannot see text produced by a helper call. So
//    an axis carries only the numbers that teach something: the intercepts;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · one colour per concept: BLUE is the cubic, RED a second curve drawn
//    against it, AMBER the reflected (modulus) pieces and a touching root,
//    GREEN an intercept the student is being told to find.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   TWO_SHAPES        the only two shapes y = k(x−a)(x−b)(x−c) can have.
//   ANATOMY           where every feature of the sketch comes from in the equation.
//   WE7_CURVE         y = (2x−1)(2−x)(x+1): three intercepts and a falling tail.
//   REFLECT_RULE      the same curve, with the pieces below the axis folded up.
//   WE7_MOD           the finished modulus graph, as the book prints it.
//   WE8_CURVE         y = (x−1)²(x+1): a squared factor TOUCHES.
//   TOUCH_VS_CROSS    the two ways a curve can meet the axis, up close.
//   WE8_MOD           the modulus of a curve that touches: the touch is unchanged.
//   Q1_FIGURE         Exercise 4.3 question 1, as printed (A, B, C, D unlabelled).
//   Q3_FIGURE         question 3: y = 2(x+1)²(7−2x), find A and B.
//   Q7_FIGURE         question 7: a cubic and a parabola on one grid.
//   Q8_FIGURE         question 8: the same, with three crossings.
//   Q9_GRID           question 9: read a, b and k off a printed grid.
//   Q10_GRID          question 10: read a, b, c and k off a modulus graph.

const INK = '#1e293b'
const MUTED = '#64748b'
const GRID = '#e2e8f0'
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const AMBER = '#d97706'
const PURPLE = '#a855f7'
const BLUE_T = '#eff6ff'
const AMBER_T = '#fffbeb'
const GREEN_T = '#f0fdf4'
const RED_T = '#fef2f2'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A graph window: origin in pixels and pixels per unit, x and y separately. */
const win = (o) => ({ ...o, X: (x) => o.ox + x * o.ux, Y: (y) => o.oy - y * o.uy })

/** Axes to the edges of the plotting box, arrowheads on the positive ends. */
const axes = (w, x0, x1, y0, y1) => `<line x1="${x0}" y1="${w.Y(0)}" x2="${x1}" y2="${w.Y(0)}" stroke="${INK}" stroke-width="1.8"/>
    <line x1="${w.X(0)}" y1="${y0}" x2="${w.X(0)}" y2="${y1}" stroke="${INK}" stroke-width="1.8"/>
    <path d="M${x1} ${w.Y(0)} l-9 -4.5 l0 9 z" fill="${INK}"/>
    <path d="M${w.X(0)} ${y1} l-4.5 9 l9 0 z" fill="${INK}"/>`

/** A sampled path, broken wherever the curve leaves the window. */
function curve(w, f, { steps = 400, x0 = w.xMin, x1 = w.xMax } = {}) {
  let d = ''
  let pen = false
  for (let i = 0; i <= steps; i += 1) {
    const x = x0 + ((x1 - x0) * i) / steps
    const y = f(x)
    if (!Number.isFinite(y) || y < w.yMin || y > w.yMax) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${w.X(x).toFixed(1)} ${w.Y(y).toFixed(1)} `
    pen = true
  }
  return d.trim()
}

/** A tick mark on the x-axis. Its NUMBER is written literally by the caller. */
const tick = (w, x) => `<line x1="${w.X(x)}" y1="${w.Y(0) - 5}" x2="${w.X(x)}" y2="${w.Y(0) + 5}" stroke="${INK}" stroke-width="1.8"/>`
/** A tick on the y-axis. */
const ytick = (w, y) => `<line x1="${w.X(0) - 5}" y1="${w.Y(y)}" x2="${w.X(0) + 5}" y2="${w.Y(y)}" stroke="${INK}" stroke-width="1.8"/>`
/** A filled dot at a point. */
const dot = (w, x, y, color = INK, r = 5) => `<circle cx="${w.X(x)}" cy="${w.Y(y)}" r="${r}" fill="${color}"/>`

/** A faint lattice, for the two questions the book prints on squared paper. */
function lattice(w, x0, x1, y0, y1, dx = 1, dy = 1) {
  let d = ''
  for (let x = x0; x <= x1 + 1e-9; x += dx) d += `M${w.X(x)} ${w.Y(y0)} L${w.X(x)} ${w.Y(y1)} `
  for (let y = y0; y <= y1 + 1e-9; y += dy) d += `M${w.X(x0)} ${w.Y(y)} L${w.X(x1)} ${w.Y(y)} `
  return `<path d="${d.trim()}" stroke="${GRID}" stroke-width="1" fill="none"/>`
}

/* ------------------------------------------------------------ the curves */

const we7 = (x) => (2 * x - 1) * (2 - x) * (x + 1)
const we8 = (x) => (x - 1) * (x - 1) * (x + 1)

/* ============================================================ TWO_SHAPES */
// Two small plates: the shape when k is positive and when it is negative.
const TWO_SHAPES = (() => {
  const W = 620; const H = 300
  const left = win({ ox: 155, oy: 160, ux: 60, uy: 26, xMin: -2.4, xMax: 2.4, yMin: -4.2, yMax: 4.2 })
  const right = win({ ox: 465, oy: 160, ux: 60, uy: 26, xMin: -2.4, xMax: 2.4, yMin: -4.2, yMax: 4.2 })
  const f = (x) => (x + 1.6) * x * (x - 1.6)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <rect x="18" y="18" width="284" height="264" rx="12" fill="${BLUE_T}"/>
    <rect x="318" y="18" width="284" height="264" rx="12" fill="${RED_T}"/>
    ${axes(left, 30, 290, 270, 40)}
    ${axes(right, 340, 600, 270, 40)}
    <path d="${curve(left, f)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="${curve(right, (x) => -f(x))}" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <text x="160" y="46" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${BLUE}">k positive</text>
    <text x="160" y="266" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="${MUTED}">climbs to the right</text>
    <text x="470" y="46" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">k negative</text>
    <text x="470" y="266" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="${MUTED}">falls to the right</text>
    <text x="282" y="${left.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" font-style="italic" fill="${INK}">x</text>
    <text x="592" y="${right.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" font-style="italic" fill="${INK}">x</text>
  </svg>`
})()

/* ============================================================ ANATOMY */
// Where every feature of a sketch comes from in y = k(x − a)(x − b)(x − c).
const ANATOMY = (() => {
  const W = 640; const H = 300
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <text x="320" y="70" text-anchor="middle" font-family="${MONO}" font-size="34" font-weight="900" fill="${INK}">y = 2(x + 1)(x - 3)(2 - x)</text>
    <path d="M136 84 L136 128" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M232 84 L232 176" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M370 84 L370 176" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M506 84 L506 176" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M560 84 L560 228" stroke="${PURPLE}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="22" y="130" width="228" height="40" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="1.5"/>
    <text x="136" y="148" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${RED}">the number in front, k</text>
    <text x="136" y="163" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="700" fill="${RED}">2 x 1 x 1 x (-1) = -2 &lt; 0</text>
    <rect x="164" y="178" width="412" height="40" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="370" y="196" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${GREEN}">each bracket = 0 gives an x-intercept</text>
    <text x="370" y="211" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="700" fill="${GREEN}">x = -1,  x = 3,  x = 2</text>
    <rect x="360" y="230" width="258" height="40" rx="10" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="1.5"/>
    <text x="489" y="248" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${PURPLE}">put x = 0 for the y-intercept</text>
    <text x="489" y="263" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="700" fill="${PURPLE}">2 x 1 x (-3) x 2 = -12</text>
    <text x="22" y="252" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">k &lt; 0, so the curve</text>
    <text x="22" y="268" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">FALLS to the right.</text>
  </svg>`
})()

/* ============================================================ WE7_CURVE */
const WE7_CURVE = (() => {
  const W = 560; const H = 340
  const w = win({ ox: 240, oy: 170, ux: 78, uy: 30, xMin: -2.6, xMax: 3.6, yMin: -4.6, yMax: 4.6 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 320, 22)}
    <path d="${curve(w, we7)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${tick(w, -1)}${tick(w, 0.5)}${tick(w, 2)}
    ${dot(w, -1, 0)}${dot(w, 0.5, 0)}${dot(w, 2, 0)}${dot(w, 0, -2, PURPLE)}
    <text x="${w.X(-1)}" y="${w.Y(0) - 12}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">-1</text>
    <text x="${w.X(0.5) + 4}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">1/2</text>
    <text x="${w.X(2)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">2</text>
    <text x="${w.X(0) + 10}" y="${w.Y(-2) + 5}" font-family="${MONO}" font-size="15" font-weight="900" fill="${PURPLE}">-2</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="536" y="${w.Y(0) - 10}" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="${w.X(0) + 10}" y="34" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">y</text>
    <text x="392" y="60" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">y = (2x - 1)(2 - x)(x + 1)</text>
    <text x="40" y="60" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">k = 2 x (-1) x 1 = -2</text>
    <text x="40" y="76" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">falls to the right</text>
  </svg>`
})()

/* ============================================================ REFLECT_RULE */
// The below-axis pieces dashed, and their reflections drawn in amber.
const REFLECT_RULE = (() => {
  const W = 560; const H = 340
  const w = win({ ox: 240, oy: 190, ux: 78, uy: 30, xMin: -2.6, xMax: 3.6, yMin: -4.0, yMax: 5.2 })
  const below1 = curve(w, we7, { x0: -2.6, x1: -1 })
  const below2 = curve(w, we7, { x0: 0.5, x1: 2 })
  const above = `${curve(w, we7, { x0: -1, x1: 0.5 })} ${curve(w, we7, { x0: 2, x1: 3.6 })}`
  const up1 = curve(w, (x) => Math.abs(we7(x)), { x0: -2.6, x1: -1 })
  const up2 = curve(w, (x) => Math.abs(we7(x)), { x0: 0.5, x1: 2 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 320, 22)}
    <path d="${above}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="${below1} ${below2}" fill="none" stroke="${BLUE}" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.55"/>
    <path d="${up1} ${up2}" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linecap="round"/>
    <path d="M${w.X(1.3)} ${w.Y(we7(1.3))} L${w.X(1.3)} ${w.Y(-we7(1.3))}" stroke="${AMBER}" stroke-width="2" stroke-dasharray="4 4"/>
    <path d="M${w.X(1.3)} ${w.Y(-we7(1.3)) + 14} l-5 8 l10 0 z" fill="${AMBER}"/>
    <path d="M${w.X(-1.7)} ${w.Y(we7(-1.7))} L${w.X(-1.7)} ${w.Y(-we7(-1.7))}" stroke="${AMBER}" stroke-width="2" stroke-dasharray="4 4"/>
    <path d="M${w.X(-1.7)} ${w.Y(-we7(-1.7)) + 14} l-5 8 l10 0 z" fill="${AMBER}"/>
    ${dot(w, -1, 0)}${dot(w, 0.5, 0)}${dot(w, 2, 0)}
    <text x="${w.X(-1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">-1</text>
    <text x="${w.X(0.5) + 4}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">1/2</text>
    <text x="${w.X(2)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">2</text>
    <rect x="300" y="34" width="238" height="52" rx="10" fill="${AMBER_T}" stroke="${AMBER}" stroke-width="1.5"/>
    <text x="419" y="55" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="800" fill="${AMBER}">below the axis: reflect it up</text>
    <text x="419" y="74" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="700" fill="${AMBER}">above the axis: leave it alone</text>
  </svg>`
})()

/* ============================================================ WE7_MOD */
const WE7_MOD = (() => {
  const W = 560; const H = 300
  const w = win({ ox: 240, oy: 240, ux: 78, uy: 42, xMin: -2.6, xMax: 3.6, yMin: -0.8, yMax: 4.6 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 282, 22)}
    <path d="${curve(w, (x) => Math.abs(we7(x)))}" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    ${dot(w, -1, 0)}${dot(w, 0.5, 0)}${dot(w, 2, 0)}${dot(w, 0, 2, PURPLE)}
    <text x="${w.X(-1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">-1</text>
    <text x="${w.X(0.5) + 4}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">1/2</text>
    <text x="${w.X(2)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">2</text>
    <text x="${w.X(0) - 10}" y="${w.Y(2) + 5}" text-anchor="end" font-family="${MONO}" font-size="15" font-weight="900" fill="${PURPLE}">2</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="392" y="56" font-family="${MONO}" font-size="15" font-weight="900" fill="${AMBER}">y = |(2x - 1)(2 - x)(x + 1)|</text>
    <text x="40" y="56" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">never below the axis</text>
    <text x="40" y="72" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">every intercept stays put</text>
  </svg>`
})()

/* ============================================================ WE8_CURVE */
const WE8_CURVE = (() => {
  const W = 560; const H = 340
  const w = win({ ox: 260, oy: 200, ux: 100, uy: 62, xMin: -2.2, xMax: 2.6, yMin: -2.6, yMax: 2.4 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 320, 22)}
    <path d="${curve(w, we8)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${tick(w, -1)}${tick(w, 1)}
    ${dot(w, -1, 0)}${dot(w, 1, 0, AMBER, 6)}${dot(w, 0, 1, PURPLE)}
    <text x="${w.X(-1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">-1</text>
    <text x="${w.X(1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${AMBER}">1</text>
    <text x="${w.X(0) - 10}" y="${w.Y(1) + 5}" text-anchor="end" font-family="${MONO}" font-size="15" font-weight="900" fill="${PURPLE}">1</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="536" y="${w.Y(0) - 10}" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="380" y="60" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">y = (x - 1)^2(x + 1)</text>
    <rect x="360" y="${w.Y(0) + 34}" width="176" height="44" rx="10" fill="${AMBER_T}" stroke="${AMBER}" stroke-width="1.5"/>
    <text x="448" y="${w.Y(0) + 52}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${AMBER}">(x - 1) appears TWICE</text>
    <text x="448" y="${w.Y(0) + 68}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="700" fill="${AMBER}">so the curve only touches</text>
  </svg>`
})()

/* ============================================================ TOUCH_VS_CROSS */
const TOUCH_VS_CROSS = (() => {
  const W = 620; const H = 300
  const left = win({ ox: 160, oy: 170, ux: 90, uy: 60, xMin: -1.4, xMax: 1.4, yMin: -1.8, yMax: 1.8 })
  const right = win({ ox: 470, oy: 190, ux: 90, uy: 60, xMin: -1.4, xMax: 1.4, yMin: -1.8, yMax: 1.8 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <rect x="18" y="18" width="284" height="264" rx="12" fill="${BLUE_T}"/>
    <rect x="318" y="18" width="284" height="264" rx="12" fill="${AMBER_T}"/>
    ${axes(left, 30, 290, 270, 40)}
    ${axes(right, 340, 600, 270, 40)}
    <path d="${curve(left, (x) => 1.2 * x)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="${curve(right, (x) => 1.4 * x * x)}" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linecap="round"/>
    ${dot(left, 0, 0, BLUE, 6)}${dot(right, 0, 0, AMBER, 6)}
    <text x="160" y="46" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${BLUE}">crosses</text>
    <text x="160" y="266" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="700" fill="${MUTED}">factor to the power 1 (or 3)</text>
    <text x="470" y="46" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${AMBER}">touches</text>
    <text x="470" y="266" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="700" fill="${MUTED}">factor squared</text>
    <text x="160" y="70" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">the sign of y changes</text>
    <text x="470" y="70" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">the sign of y does not change</text>
  </svg>`
})()

/* ============================================================ WE8_MOD */
const WE8_MOD = (() => {
  const W = 560; const H = 300
  const w = win({ ox: 260, oy: 240, ux: 100, uy: 70, xMin: -2.2, xMax: 2.6, yMin: -0.5, yMax: 2.6 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 282, 22)}
    <path d="${curve(w, (x) => Math.abs(we8(x)))}" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    ${dot(w, -1, 0)}${dot(w, 1, 0, AMBER, 6)}${dot(w, 0, 1, PURPLE)}
    <text x="${w.X(-1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">-1</text>
    <text x="${w.X(1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${AMBER}">1</text>
    <text x="${w.X(0) - 10}" y="${w.Y(1) + 5}" text-anchor="end" font-family="${MONO}" font-size="15" font-weight="900" fill="${PURPLE}">1</text>
    <text x="370" y="56" font-family="${MONO}" font-size="15" font-weight="900" fill="${AMBER}">y = |(x - 1)^2(x + 1)|</text>
    <text x="40" y="56" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">only the left tail was below</text>
    <text x="40" y="72" font-family="${FONT}" font-size="12" font-weight="700" fill="${MUTED}">the touch at x = 1 is unchanged</text>
  </svg>`
})()

/* ============================================================ Q1_FIGURE */
const Q1_FIGURE = (() => {
  const W = 560; const H = 340
  const w = win({ ox: 200, oy: 210, ux: 70, uy: 19, xMin: -2.4, xMax: 4.8, yMin: -3.5, yMax: 8.8 })
  const f = (x) => (x - 2) * (x + 1) * (x - 3)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 320, 22)}
    <path d="${curve(w, f)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${dot(w, -1, 0, GREEN, 6)}${dot(w, 2, 0, GREEN, 6)}${dot(w, 3, 0, GREEN, 6)}${dot(w, 0, 6, GREEN, 6)}
    <text x="${w.X(-1) - 4}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">A</text>
    <text x="${w.X(2)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">B</text>
    <text x="${w.X(3) + 8}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">C</text>
    <text x="${w.X(0) - 12}" y="${w.Y(6) + 5}" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">D</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="536" y="${w.Y(0) - 10}" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="330" y="56" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">y = (x - 2)(x + 1)(x - 3)</text>
  </svg>`
})()

/* ============================================================ Q3_FIGURE */
const Q3_FIGURE = (() => {
  const W = 560; const H = 340
  const w = win({ ox: 210, oy: 250, ux: 70, uy: 3.4, xMin: -2.5, xMax: 4.6, yMin: -22, yMax: 64 })
  const f = (x) => 2 * (x + 1) * (x + 1) * (7 - 2 * x)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 320, 22)}
    <path d="${curve(w, f)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${dot(w, -1, 0, AMBER, 6)}${dot(w, 3.5, 0, GREEN, 6)}${dot(w, 0, 14, GREEN, 6)}
    <text x="${w.X(-1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">-1</text>
    <text x="${w.X(3.5)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">A</text>
    <text x="${w.X(0) - 12}" y="${w.Y(14) + 5}" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">B</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="536" y="${w.Y(0) - 10}" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="330" y="56" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">y = 2(x + 1)^2(7 - 2x)</text>
  </svg>`
})()

/* ============================================================ Q7_FIGURE */
const Q7_FIGURE = (() => {
  const W = 560; const H = 340
  const w = win({ ox: 90, oy: 230, ux: 52, uy: 5.2, xMin: -1.2, xMax: 8.4, yMin: -14, yMax: 36 })
  const f = (x) => x * (x - 5) * (x - 7)
  const g = (x) => x * (7 - x)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 320, 22)}
    <path d="${curve(w, f)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="${curve(w, g)}" fill="none" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>
    ${dot(w, 0, 0)}${dot(w, 4, 12)}${dot(w, 7, 0)}${dot(w, 5, 0, BLUE)}
    <text x="${w.X(5)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">5</text>
    <text x="${w.X(7)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">7</text>
    <text x="${w.X(4) - 10}" y="${w.Y(12) - 10}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="900" fill="${INK}">(4, 12)</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="300" y="56" font-family="${MONO}" font-size="14" font-weight="900" fill="${BLUE}">y = x(x - 5)(x - 7)</text>
    <text x="300" y="78" font-family="${MONO}" font-size="14" font-weight="900" fill="${RED}">y = x(7 - x)</text>
  </svg>`
})()

/* ============================================================ Q8_FIGURE */
const Q8_FIGURE = (() => {
  const W = 560; const H = 340
  const w = win({ ox: 300, oy: 190, ux: 66, uy: 8.2, xMin: -3.9, xMax: 3.4, yMin: -17, yMax: 15 })
  const f = (x) => (2 * x - 1) * (x + 2) * (x + 1)
  const g = (x) => (x + 1) * (4 - x)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(w, 30, 540, 320, 22)}
    <path d="${curve(w, f)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="${curve(w, g)}" fill="none" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>
    ${dot(w, -3, -14)}${dot(w, -1, 0)}${dot(w, 1, 6)}${dot(w, -2, 0, BLUE)}${dot(w, 0.5, 0, BLUE)}${dot(w, 4, 0, RED)}
    <text x="${w.X(-2)}" y="${w.Y(0) - 12}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">-2</text>
    <text x="${w.X(-1) - 6}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">-1</text>
    <text x="${w.X(0.5) + 6}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">1/2</text>
    <text x="${w.X(1) + 12}" y="${w.Y(6) - 2}" font-family="${MONO}" font-size="14" font-weight="900" fill="${INK}">(1, 6)</text>
    <text x="${w.X(-3) + 12}" y="${w.Y(-14) + 5}" font-family="${MONO}" font-size="14" font-weight="900" fill="${INK}">(-3, -14)</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="40" y="56" font-family="${MONO}" font-size="14" font-weight="900" fill="${BLUE}">y = (2x - 1)(x + 2)(x + 1)</text>
    <text x="40" y="78" font-family="${MONO}" font-size="14" font-weight="900" fill="${RED}">y = (x + 1)(4 - x)</text>
  </svg>`
})()

/* ============================================================ Q9_GRID */
// y = k(x − a)²(x − b): touches at 1, crosses at 2, y-intercept 4.
const Q9_GRID = (() => {
  const W = 500; const H = 380
  const w = win({ ox: 140, oy: 200, ux: 95, uy: 28, xMin: -1.2, xMax: 3.4, yMin: -5, yMax: 6.6 })
  const f = (x) => -2 * (x - 1) * (x - 1) * (x - 2)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${lattice(w, -1, 3, -4, 6)}
    ${axes(w, 30, 470, 350, 22)}
    <path d="${curve(w, f)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${tick(w, -1)}${tick(w, 1)}${tick(w, 2)}${tick(w, 3)}${ytick(w, -4)}${ytick(w, -2)}${ytick(w, 2)}${ytick(w, 4)}${ytick(w, 6)}
    <text x="${w.X(-1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">-1</text>
    <text x="${w.X(1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">1</text>
    <text x="${w.X(2)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">2</text>
    <text x="${w.X(3)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">3</text>
    <text x="${w.X(0) - 10}" y="${w.Y(-4) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">-4</text>
    <text x="${w.X(0) - 10}" y="${w.Y(-2) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">-2</text>
    <text x="${w.X(0) - 10}" y="${w.Y(2) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">2</text>
    <text x="${w.X(0) - 10}" y="${w.Y(4) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">4</text>
    <text x="${w.X(0) - 10}" y="${w.Y(6) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">6</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="466" y="${w.Y(0) - 10}" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="300" y="50" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">y = k(x - a)^2(x - b)</text>
  </svg>`
})()

/* ============================================================ Q10_GRID */
// y = |k(x − a)(x − b)(x − c)|: intercepts −1, 1, 2 and 6 on the y-axis.
const Q10_GRID = (() => {
  const W = 500; const H = 380
  const w = win({ ox: 200, oy: 300, ux: 80, uy: 31, xMin: -2.2, xMax: 3.4, yMin: -2, yMax: 8.6 })
  const f = (x) => Math.abs(3 * (x + 1) * (x - 1) * (x - 2))
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${lattice(w, -2, 3, -2, 8)}
    ${axes(w, 30, 470, 362, 22)}
    <path d="${curve(w, f)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    ${tick(w, -2)}${tick(w, -1)}${tick(w, 1)}${tick(w, 2)}${tick(w, 3)}${ytick(w, 2)}${ytick(w, 4)}${ytick(w, 6)}${ytick(w, 8)}
    <text x="${w.X(-2)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">-2</text>
    <text x="${w.X(-1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">-1</text>
    <text x="${w.X(1)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">1</text>
    <text x="${w.X(2)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">2</text>
    <text x="${w.X(3)}" y="${w.Y(0) + 22}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">3</text>
    <text x="${w.X(0) - 10}" y="${w.Y(2) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">2</text>
    <text x="${w.X(0) - 10}" y="${w.Y(4) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">4</text>
    <text x="${w.X(0) - 10}" y="${w.Y(6) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">6</text>
    <text x="${w.X(0) - 10}" y="${w.Y(8) + 5}" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="700" fill="${INK}">8</text>
    <text x="${w.X(0) - 8}" y="${w.Y(0) + 18}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
    <text x="466" y="${w.Y(0) - 10}" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="260" y="50" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">y = |k(x - a)(x - b)(x - c)|</text>
  </svg>`
})()

export const DIAGRAMS = {
  TWO_SHAPES: TWO_SHAPES,
  ANATOMY: ANATOMY,
  WE7_CURVE: WE7_CURVE,
  REFLECT_RULE: REFLECT_RULE,
  WE7_MOD: WE7_MOD,
  WE8_CURVE: WE8_CURVE,
  TOUCH_VS_CROSS: TOUCH_VS_CROSS,
  WE8_MOD: WE8_MOD,
  Q1_FIGURE: Q1_FIGURE,
  Q3_FIGURE: Q3_FIGURE,
  Q7_FIGURE: Q7_FIGURE,
  Q8_FIGURE: Q8_FIGURE,
  Q9_GRID: Q9_GRID,
  Q10_GRID: Q10_GRID,
}
