// src/data/ADD_MATH/AM_5B/diagrams.js
// Teaching diagrams for AM_5B — Exponential Equations, e and ln
// (Cambridge IGCSE Additional Mathematics 0606, sections 5.5, 5.7 and 5.8).
//
// House rules (docs/svg-diagrams.md, and the AM_4B deck):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY — helpers emit shapes and paths only,
//    because `npm run audit:svg` cannot see text produced by a helper call;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · one colour per concept: BLUE is a power (the exponential curve), RED a
//    log or anything rejected, GREEN a value that is kept or found, PURPLE a
//    move in the method, AMBER a level the curve settles towards.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   TAKE_LOGS       3ˣ = 20 solved in four lines: take lg, power down, divide.
//   SUBSTITUTE      a quadratic in disguise: with y = 2ˣ, 2²ˣ is y².
//   POWER_POSITIVE  y = 2ˣ never reaches zero or below, so 2ˣ = −3 is rejected.
//   E_LIMIT         (1 + 1/n)ⁿ creeping up to e ≈ 2.718.
//   E_LN_MIRROR     y = eˣ and y = ln x, mirror images in y = x.
//   UNDO_PAIR       e to the power and ln undo each other.
//   COOLING         T = 70e^(−0.04t) + 20: the start, the level it settles to,
//                   and the time to reach 50.
//   HALF_LIFE       equal steps of time, and the amount halves each step.

const INK = '#1e293b'
const MUTED = '#64748b'
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const AMBER = '#d97706'
const PURPLE = '#a855f7'
const GRID = '#eef2f7'
const BLUE_T = '#eff6ff'
const RED_T = '#fef2f2'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A graph window: origin in pixels and pixels per unit in each direction. */
const win = (o) => ({ ...o, X: (x) => o.ox + x * o.ux, Y: (y) => o.oy - y * o.uy })

/** A sampled path, broken wherever the curve leaves the window. */
function curve(w, f, x0, x1, steps = 300) {
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

/** Axes through (ox, oy), from pixel x0..x1 and y0 (bottom)..y1 (top), arrowheads on the positive ends. */
const axes = (ox, oy, x0, x1, y0, y1) => `<line x1="${x0}" y1="${oy}" x2="${x1}" y2="${oy}" stroke="${INK}" stroke-width="1.8"/>
    <line x1="${ox}" y1="${y0}" x2="${ox}" y2="${y1}" stroke="${INK}" stroke-width="1.8"/>
    <path d="M${x1} ${oy} l-9 -4.5 l0 9 z" fill="${INK}"/>
    <path d="M${ox} ${y1} l-4.5 9 l9 0 z" fill="${INK}"/>`

const dot = (x, y, color = INK, r = 5.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>`
const seg = (x1, y1, x2, y2, color, { dash = false, w = 2.5 } = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ' stroke-dasharray="7 6"' : ''}/>`
/** A downward arrow from (x, y0) to (x, y1). */
const down = (x, y0, y1, color) => `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1 - 8}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M${x} ${y1} l-6 -10 l12 0 z" fill="${color}"/>`

/* ============================================================ TAKE_LOGS */
// The method in four lines, each move named beside the arrow that makes it.
const TAKE_LOGS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" class="w-full h-full drop-shadow-md">
    ${plate(640, 300)}
    <text x="24" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}">THE UNKNOWN IS IN THE POWER: TAKE LOGS</text>
    <text x="60" y="78" font-family="${MONO}" font-size="26" font-weight="900" fill="${INK}">3ˣ = 20</text>
    <text x="60" y="142" font-family="${MONO}" font-size="26" font-weight="900" fill="${INK}">lg 3ˣ = lg 20</text>
    <text x="60" y="206" font-family="${MONO}" font-size="26" font-weight="900" fill="${INK}">x lg 3 = lg 20</text>
    <text x="60" y="270" font-family="${MONO}" font-size="26" font-weight="900" fill="${BLUE}">x = lg 20 ÷ lg 3 ≈ 2.73</text>
    ${down(84, 88, 118, PURPLE)}
    ${down(84, 152, 182, PURPLE)}
    ${down(84, 216, 246, PURPLE)}
    <text x="330" y="108" font-family="${FONT}" font-size="15" font-weight="800" fill="${PURPLE}">take lg of both sides</text>
    <text x="330" y="172" font-family="${FONT}" font-size="15" font-weight="800" fill="${PURPLE}">power law: the power comes down</text>
    <text x="330" y="236" font-family="${FONT}" font-size="15" font-weight="800" fill="${PURPLE}">divide both sides by lg 3</text>
    <text x="616" y="30" text-anchor="end" font-family="${FONT}" font-size="13" font-weight="700" fill="${GREEN}">ln 20 ÷ ln 3 gives the same x</text>
  </svg>`

/* ============================================================ SUBSTITUTE */
// A quadratic in disguise: two powers of the same thing, one the square of the other.
const SUBSTITUTE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" class="w-full h-full drop-shadow-md">
    ${plate(640, 300)}
    <rect x="110" y="34" width="420" height="58" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="320" y="72" text-anchor="middle" font-family="${MONO}" font-size="26" font-weight="900" fill="${INK}">2²ˣ − 10(2ˣ) + 16 = 0</text>
    ${down(320, 100, 196, PURPLE)}
    <text x="336" y="142" font-family="${FONT}" font-size="15" font-weight="900" fill="${PURPLE}">let y = 2ˣ</text>
    <text x="300" y="130" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">2²ˣ = (2ˣ)² = y²</text>
    <text x="300" y="162" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">10(2ˣ) = 10y</text>
    <rect x="150" y="204" width="340" height="58" rx="14" fill="#f0fdf4" stroke="${GREEN}" stroke-width="2"/>
    <text x="320" y="242" text-anchor="middle" font-family="${MONO}" font-size="26" font-weight="900" fill="${INK}">y² − 10y + 16 = 0</text>
    <text x="320" y="288" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">a quadratic in y: solve it, then turn each y back into x</text>
  </svg>`

/* ============================================================ POWER_POSITIVE */
// y = 2ˣ with three level lines. Origin (298, 209); 60 px per unit across and
// 30 px per unit up, so the curve can climb to 6 and the line y = −3 fits below.
const P = win({ ox: 298, oy: 209, ux: 60, uy: 30, yMin: -4.3, yMax: 6.3 })
const P_EXP = curve(P, (x) => 2 ** x, -4.3, 2.7)
const POWER_POSITIVE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360" class="w-full h-full drop-shadow-md">
    ${plate(560, 360)}
    <rect x="40" y="209" width="480" height="128" fill="${RED_T}"/>
    ${axes(298, 209, 40, 530, 340, 16)}
    <path d="${P_EXP}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${seg(40, 89, 520, 89, GREEN, { dash: true })}
    ${seg(40, 194, 520, 194, GREEN, { dash: true })}
    ${seg(40, 299, 520, 299, RED, { dash: true })}
    ${seg(418, 89, 418, 209, GREEN, { dash: true, w: 1.6 })}
    ${seg(238, 194, 238, 209, GREEN, { dash: true, w: 1.6 })}
    ${dot(418, 89, GREEN, 6.5)}
    ${dot(238, 194, GREEN, 6.5)}
    ${dot(298, 179, BLUE, 5)}
    <text x="48" y="36" font-family="${FONT}" font-size="15" font-weight="800" fill="${INK}">2ˣ is positive for every x</text>
    <text x="390" y="40" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">y = 2ˣ</text>
    <text x="48" y="81" font-family="${MONO}" font-size="14" font-weight="900" fill="${GREEN}">y = 4</text>
    <text x="48" y="186" font-family="${MONO}" font-size="14" font-weight="900" fill="${GREEN}">y = ½</text>
    <text x="512" y="291" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="900" fill="${RED}">y = −3: never met</text>
    <text x="428" y="228" font-family="${MONO}" font-size="13" font-weight="900" fill="${GREEN}">x = 2</text>
    <text x="232" y="228" text-anchor="end" font-family="${MONO}" font-size="13" font-weight="900" fill="${GREEN}">x = −1</text>
    <text x="290" y="175" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${BLUE}">1</text>
    <text x="512" y="330" text-anchor="end" font-family="${FONT}" font-size="12" font-weight="bold" fill="${RED}">no power of 2 is down here</text>
    <text x="538" y="226" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="308" y="28" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">y</text>
  </svg>`

/* ============================================================ E_LIMIT */
// (1 + 1/n)ⁿ on a number line from 2 to 2.8 at 700 px a unit (2 is at x = 40).
// n = 1 → 2, 2 → 2.25, 5 → 2.488, 10 → 2.594, 100 → 2.705, 1000 → 2.717; e ≈ 2.718.
const E_LIMIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 250" class="w-full h-full drop-shadow-md">
    ${plate(640, 250)}
    <text x="24" y="30" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}">(1 + 1/n)^n AS n GETS BIGGER</text>
    <line x1="30" y1="140" x2="612" y2="140" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
    <path d="M40 132 L40 148 M180 132 L180 148 M320 132 L320 148 M460 132 L460 148 M600 132 L600 148" stroke="${INK}" stroke-width="2.5"/>
    <text x="40" y="166" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="bold" fill="${INK}">2.0</text>
    <text x="180" y="166" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="bold" fill="${INK}">2.2</text>
    <text x="320" y="166" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="bold" fill="${INK}">2.4</text>
    <text x="460" y="166" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="bold" fill="${INK}">2.6</text>
    <text x="600" y="166" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="bold" fill="${INK}">2.8</text>
    <line x1="542.8" y1="64" x2="542.8" y2="140" stroke="${RED}" stroke-width="3"/>
    <text x="542.8" y="56" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${RED}">e ≈ 2.718</text>
    ${dot(40, 140, BLUE, 6.5)}
    ${dot(215, 140, BLUE, 6.5)}
    ${dot(381.8, 140, BLUE, 6.5)}
    ${dot(455.6, 140, BLUE, 6.5)}
    ${dot(533.4, 140, BLUE, 6)}
    ${dot(541.8, 140, BLUE, 6)}
    <text x="48" y="104" font-family="${MONO}" font-size="13" font-weight="900" fill="${BLUE}">n = 1</text>
    <text x="48" y="120" font-family="${MONO}" font-size="12" font-weight="bold" fill="${MUTED}">2</text>
    <text x="215" y="104" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="900" fill="${BLUE}">n = 2</text>
    <text x="215" y="120" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${MUTED}">2.25</text>
    <text x="381.8" y="104" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="900" fill="${BLUE}">n = 5</text>
    <text x="381.8" y="120" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${MUTED}">2.488</text>
    <text x="455.6" y="104" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="900" fill="${BLUE}">n = 10</text>
    <text x="455.6" y="120" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${MUTED}">2.594</text>
    <path d="M533.4 147 L512 186 M541.8 147 L566 208" stroke="${MUTED}" stroke-width="1.5"/>
    <text x="508" y="198" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">n = 100: 2.705</text>
    <text x="570" y="220" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">n = 1000: 2.717</text>
    <text x="24" y="238" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}">the bigger n is, the closer it gets to e</text>
  </svg>`

/* ============================================================ E_LN_MIRROR */
// y = eˣ (BLUE) and y = ln x (RED), mirror images in y = x (dashed). Origin
// (250, 244), 50 px per unit both ways. A hotspot activity uses this figure:
// its point labels are stripped at runtime. Targets: (0, 1) → (250, 194),
// (1, e) → (300, 108.1), (1, 0) → (300, 244), (e, 1) → (385.9, 194).
const M = win({ ox: 250, oy: 244, ux: 50, uy: 50, yMin: -3.2, yMax: 4.6 })
const M_GRID = (() => {
  let d = ''
  for (let x = -3; x <= 4; x += 1) d += `M${M.X(x)} ${M.Y(-3)} L${M.X(x)} ${M.Y(4)} `
  for (let y = -3; y <= 4; y += 1) d += `M${M.X(-3)} ${M.Y(y)} L${M.X(4)} ${M.Y(y)} `
  return d.trim()
})()
const M_EXP = curve(M, (x) => Math.exp(x), -3.4, 1.55)
const M_LN = curve(M, (x) => Math.log(x), 0.035, 4.6)
const E_LN_MIRROR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 420" class="w-full h-full drop-shadow-md">
    ${plate(560, 420)}
    <path d="${M_GRID}" stroke="${GRID}" stroke-width="1" fill="none"/>
    ${axes(250, 244, 30, 545, 410, 14)}
    <line x1="90" y1="404" x2="480" y2="14" stroke="${MUTED}" stroke-width="2" stroke-dasharray="7 6"/>
    <path d="${M_EXP}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="${M_LN}" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <path d="M300 108.1 L385.9 194" stroke="${PURPLE}" stroke-width="2" stroke-dasharray="4 4"/>
    ${dot(250, 194, BLUE, 6)}
    ${dot(300, 108.1, BLUE, 6)}
    ${dot(300, 244, RED, 6)}
    ${dot(385.9, 194, RED, 6)}
    <text x="232" y="60" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="bold" fill="${BLUE}">y = eˣ</text>
    <text x="548" y="186" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}">y = ln x</text>
    <text x="486" y="30" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}">y = x</text>
    <text x="242" y="186" text-anchor="end" font-family="${MONO}" font-size="13" font-weight="bold" fill="${BLUE}">(0, 1)</text>
    <text x="310" y="102" font-family="${MONO}" font-size="13" font-weight="bold" fill="${BLUE}">(1, e)</text>
    <text x="308" y="264" font-family="${MONO}" font-size="13" font-weight="bold" fill="${RED}">(1, 0)</text>
    <text x="394" y="214" font-family="${MONO}" font-size="13" font-weight="bold" fill="${RED}">(e, 1)</text>
    <text x="536" y="264" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="260" y="26" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">y</text>
  </svg>`

/* ============================================================ UNDO_PAIR */
// e to the power and ln as a round trip: each undoes the other.
const UNDO_PAIR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 270" class="w-full h-full drop-shadow-md">
    ${plate(640, 270)}
    <text x="320" y="36" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${INK}">e to the power and ln undo each other</text>
    <rect x="60" y="78" width="170" height="92" rx="16" fill="#f8fafc" stroke="${INK}" stroke-width="2"/>
    <rect x="410" y="78" width="170" height="92" rx="16" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="145" y="136" text-anchor="middle" font-family="${MONO}" font-size="34" font-weight="900" fill="${INK}">x</text>
    <text x="495" y="136" text-anchor="middle" font-family="${MONO}" font-size="34" font-weight="900" fill="${BLUE}">eˣ</text>
    <line x1="244" y1="100" x2="392" y2="100" stroke="${BLUE}" stroke-width="3"/>
    <path d="M402 100 l-12 -7 l0 14 z" fill="${BLUE}"/>
    <line x1="396" y1="150" x2="248" y2="150" stroke="${RED}" stroke-width="3"/>
    <path d="M238 150 l12 -7 l0 14 z" fill="${RED}"/>
    <text x="320" y="88" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="800" fill="${BLUE}">raise e to the power</text>
    <text x="320" y="174" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="800" fill="${RED}">take ln</text>
    <text x="180" y="236" text-anchor="middle" font-family="${MONO}" font-size="22" font-weight="900" fill="${INK}">e^(ln 7) = 7</text>
    <text x="460" y="236" text-anchor="middle" font-family="${MONO}" font-size="22" font-weight="900" fill="${INK}">ln(e³) = 3</text>
  </svg>`

/* ============================================================ COOLING */
// T = 70e^(−0.04t) + 20 for t from 0 to 80 minutes. t is 5.5 px a minute from
// x = 70; T is 2.6 px a degree up from y = 300. T = 50 is reached at t ≈ 21.2.
const C = win({ ox: 70, oy: 300, ux: 5.5, uy: 2.6, yMin: 0, yMax: 100 })
const C_CURVE = curve(C, (t) => 70 * Math.exp(-0.04 * t) + 20, 0, 80)
const COOLING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340" class="w-full h-full drop-shadow-md">
    ${plate(560, 340)}
    ${axes(70, 300, 70, 530, 300, 22)}
    ${seg(70, 248, 520, 248, AMBER, { dash: true, w: 2 })}
    ${seg(70, 170, 186.5, 170, GREEN, { dash: true, w: 2 })}
    ${seg(186.5, 170, 186.5, 300, GREEN, { dash: true, w: 2 })}
    <path d="${C_CURVE}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${dot(70, 66, BLUE, 6.5)}
    ${dot(186.5, 170, GREEN, 6.5)}
    <text x="300" y="90" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">T = 70e^(−0.04t) + 20</text>
    <text x="84" y="60" font-family="${FONT}" font-size="14" font-weight="800" fill="${BLUE}">90 at the start</text>
    <text x="520" y="270" text-anchor="end" font-family="${FONT}" font-size="14" font-weight="800" fill="${AMBER}">it settles towards 20, the room</text>
    <text x="196" y="164" font-family="${FONT}" font-size="14" font-weight="800" fill="${GREEN}">50 after about 21.2 minutes</text>
    <text x="62" y="70" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">90</text>
    <text x="62" y="174" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">50</text>
    <text x="62" y="252" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">20</text>
    <text x="186.5" y="318" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${GREEN}">21.2</text>
    <text x="530" y="322" text-anchor="end" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">t (minutes)</text>
    <text x="80" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">T (°C)</text>
  </svg>`

/* ============================================================ HALF_LIFE */
// N = 80e^(−kt) with a half-life of 6 days: 80, 40, 20, 10, 5 at t = 0, 6, 12,
// 18, 24. t is 18 px a day from x = 70; N is 2.6 px a unit up from y = 280.
const H = win({ ox: 70, oy: 280, ux: 18, uy: 2.6, yMin: 0, yMax: 92 })
const H_CURVE = curve(H, (t) => 80 * 0.5 ** (t / 6), 0, 25)
const HALF_LIFE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 330" class="w-full h-full drop-shadow-md">
    ${plate(560, 330)}
    ${axes(70, 280, 70, 530, 280, 30)}
    ${seg(70, 176, 178, 176, MUTED, { dash: true, w: 1.6 })}
    ${seg(178, 176, 178, 280, MUTED, { dash: true, w: 1.6 })}
    ${seg(70, 228, 286, 228, MUTED, { dash: true, w: 1.6 })}
    ${seg(286, 228, 286, 280, MUTED, { dash: true, w: 1.6 })}
    ${seg(70, 254, 394, 254, MUTED, { dash: true, w: 1.6 })}
    ${seg(394, 254, 394, 280, MUTED, { dash: true, w: 1.6 })}
    <path d="${H_CURVE}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${dot(70, 72, BLUE, 6)}
    ${dot(178, 176, GREEN, 6)}
    ${dot(286, 228, GREEN, 6)}
    ${dot(394, 254, GREEN, 6)}
    <text x="62" y="76" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">80</text>
    <text x="62" y="180" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">40</text>
    <text x="62" y="232" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">20</text>
    <text x="62" y="258" text-anchor="end" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">10</text>
    <text x="178" y="298" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">6</text>
    <text x="286" y="298" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">12</text>
    <text x="394" y="298" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">18</text>
    <text x="300" y="70" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">N = 80e^(−kt)</text>
    <text x="300" y="96" font-family="${FONT}" font-size="14" font-weight="800" fill="${GREEN}">every 6 days, half is left</text>
    <text x="530" y="318" text-anchor="end" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">t (days)</text>
    <text x="80" y="38" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">N</text>
  </svg>`

export const DIAGRAMS = {
  TAKE_LOGS: TAKE_LOGS,
  SUBSTITUTE: SUBSTITUTE,
  POWER_POSITIVE: POWER_POSITIVE,
  E_LIMIT: E_LIMIT,
  E_LN_MIRROR: E_LN_MIRROR,
  UNDO_PAIR: UNDO_PAIR,
  COOLING: COOLING,
  HALF_LIFE: HALF_LIFE,
}
