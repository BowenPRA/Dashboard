// src/data/ADD_MATH/AM_3A/diagrams.js
// Teaching diagrams for AM_3A — Polynomials, Division and the Factor Theorem
// (Cambridge IGCSE Additional Mathematics 0606, chapter 3.1–3.3).
//
// House rules (docs/svg-diagrams.md, and the AOPS/COORD_SCI decks):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY. Helpers emit shapes and paths only —
//    `npm run audit:svg` cannot see text produced by a `${helper(...)}` call and
//    would silently check nothing;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · superscripts are the Unicode characters (x², x³), not <tspan>, so the audit
//    measures the string it actually renders;
//  · one colour per concept, from the palette in docs/svg-diagrams.md §3.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   ANATOMY         the general form, labelled: term, coefficient, leading
//                   coefficient, degree, constant term. Every word the exam uses.
//   DEGREE_TABLE    degrees 0–5 with their names, the book's table plus quintic.
//   DEG_0 … DEG_5   one small curve per degree, for the gallery slide. Same
//                   window in all six, so "one more bump per degree" is visible
//                   rather than asserted.
//   ROOTS_CUBIC     a cubic crossing three times: root ↔ factor ↔ P(c) = 0.
//   TURNING_POINTS  at most n − 1 bumps, shown side by side.
//   ROOT_COUNT      the same cubic slid up: 3 roots, then 2, then 1 — and never
//                   zero. The practical fact behind "always try the theorem".
//   NUMBER_DIVISION 5508 ÷ 17 with dividend/divisor/quotient named, the numeric
//                   rehearsal the textbook opens 3.2 with.
//   MISSING_TERM    2x³ − x + 51 rewritten with its 0x², columns aligned.
//   POLY_DIVISION   the full worked tableau, with the four moves annotated.
//   DIVISION_REMAINDER  the same layout ending in a remainder, and the identity.
//   FACTOR_LINK     the four statements that mean the same thing.
//   FACTORISE_CUBIC the pipeline: test → divide → factorise the quadratic.
//   GRAPH_CUBIC_A   y = x³ − 3x² − 6x + 8 for the Book Problems task.

const INK = '#1e293b'
const MUTED = '#64748b'
const GRID = '#e2e8f0'
const RULE = '#cbd5e1'
const KEY = '#d97706' // key-word amber
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const PURPLE = '#a855f7'
const BLUE_T = '#eff6ff'
const GREEN_T = '#f0fdf4'
const AMBER_T = '#fffbeb'
const RED_T = '#fef2f2'
const PURPLE_T = '#f3e8ff'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a label to the thing it names, ending in a small dot. */
const lead = (x1, y1, x2, y2, color) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="${x2}" cy="${y2}" r="3" fill="${color}"/>`

/**
 * The path for y = f(x), sampled and clipped to the window. Breaking the path
 * where the curve leaves the box (rather than letting it run off) is what keeps
 * a steep cubic from drawing a vertical wall up the side of the plate.
 */
function curve(f, { xMin, xMax, yMin, yMax, ox, oy, ux, uy, steps = 240 }) {
  const X = (x) => ox + x * ux
  const Y = (y) => oy - y * uy
  let d = ''
  let pen = false
  for (let i = 0; i <= steps; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / steps
    const y = f(x)
    if (!Number.isFinite(y) || y < yMin || y > yMax) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
    pen = true
  }
  return d.trim()
}

/** Plain axes with no numbers — for the small degree thumbnails. */
const bareAxes = (ox, oy, w, h) => `<line x1="10" y1="${oy}" x2="${w - 10}" y2="${oy}" stroke="${RULE}" stroke-width="1.5"/>
    <line x1="${ox}" y1="10" x2="${ox}" y2="${h - 10}" stroke="${RULE}" stroke-width="1.5"/>`

/** One degree thumbnail: white plate, bare axes, one curve. 200 x 150. */
const thumb = (f, color) => {
  const W = 200; const H = 150; const ox = 100; const oy = 75
  return `${plate(W, H)}
    ${bareAxes(ox, oy, W, H)}
    <path d="${curve(f, { xMin: -3.6, xMax: 3.6, yMin: -4.4, yMax: 4.4, ox, oy, ux: 24, uy: 14 })}" fill="none" stroke="${color}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`
}

// ── The six degrees ─────────────────────────────────────────────────────────
// One window, one scale, six curves: the bump count is meant to be counted off
// the picture, not taken on trust.
const DEG_0 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" class="w-full h-full">
    ${thumb(() => 2.2, MUTED)}
  </svg>`

const DEG_1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" class="w-full h-full">
    ${thumb((x) => 1.15 * x + 0.4, BLUE)}
  </svg>`

const DEG_2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" class="w-full h-full">
    ${thumb((x) => 0.7 * x * x - 2.6, GREEN)}
  </svg>`

const DEG_3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" class="w-full h-full">
    ${thumb((x) => 0.35 * x * (x - 2) * (x + 2), PURPLE)}
  </svg>`

const DEG_4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" class="w-full h-full">
    ${thumb((x) => 0.25 * (x * x - 1) * (x * x - 5.5), KEY)}
  </svg>`

const DEG_5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" class="w-full h-full">
    ${thumb((x) => 0.12 * x * (x * x - 1) * (x * x - 6), RED)}
  </svg>`

// ── The general form, labelled ──────────────────────────────────────────────
const ANATOMY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 420" class="w-full h-full">
    ${plate(660, 420)}
    <text x="330" y="42" font-family="${FONT}" font-size="19" font-weight="bold" fill="${MUTED}" text-anchor="middle">Every word the exam uses, on one expression</text>

    <rect x="52" y="70" width="556" height="86" rx="16" fill="${BLUE_T}" stroke="${RULE}" stroke-width="1.5"/>
    <text x="330" y="127" font-family="${MONO}" font-size="38" font-weight="900" fill="${INK}" text-anchor="middle">5x⁴ − 3x² + 7x − 2</text>

    ${lead(150, 218, 128, 160, RED)}
    <rect x="52" y="224" width="196" height="52" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="1.5"/>
    <text x="150" y="245" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">leading coefficient</text>
    <text x="150" y="266" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">the 5, and it cannot be 0</text>

    ${lead(432, 218, 470, 160, GREEN)}
    <rect x="330" y="224" width="278" height="52" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="469" y="245" font-family="${FONT}" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">constant term</text>
    <text x="469" y="266" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">the −2: the term with no x</text>

    ${lead(180, 300, 196, 160, KEY)}
    <rect x="52" y="306" width="196" height="52" rx="10" fill="${AMBER_T}" stroke="${KEY}" stroke-width="1.5"/>
    <text x="150" y="327" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">degree</text>
    <text x="150" y="348" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">4: the highest power</text>

    ${lead(420, 300, 390, 160, PURPLE)}
    <rect x="330" y="306" width="278" height="52" rx="10" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="1.5"/>
    <text x="469" y="327" font-family="${FONT}" font-size="15" font-weight="bold" fill="${PURPLE}" text-anchor="middle">a term</text>
    <text x="469" y="348" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">7x: coefficient 7, power 1</text>

    <text x="330" y="392" font-family="${FONT}" font-size="14.5" font-weight="bold" fill="${INK}" text-anchor="middle">Powers must be whole numbers. There are four terms here.</text>
  </svg>`

// ── The names, degree by degree ─────────────────────────────────────────────
const DEGREE_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 440" class="w-full h-full">
    ${plate(660, 440)}
    <text x="330" y="40" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">The names you are expected to use</text>

    <rect x="30" y="56" width="600" height="42" rx="8" fill="#0087a8"/>
    <text x="48" y="84" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff">Polynomial expression</text>
    <text x="452" y="84" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Degree</text>
    <text x="558" y="84" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Name</text>

    <rect x="30" y="98" width="600" height="52" fill="#ffffff" stroke="${RULE}" stroke-width="1.2"/>
    <text x="48" y="130" font-family="${MONO}" font-size="17" fill="${INK}">a,  a ≠ 0</text>
    <text x="452" y="130" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="middle">0</text>
    <text x="558" y="130" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">constant</text>

    <rect x="30" y="150" width="600" height="52" fill="#f8fafc" stroke="${RULE}" stroke-width="1.2"/>
    <text x="48" y="182" font-family="${MONO}" font-size="17" fill="${INK}">ax + b,  a ≠ 0</text>
    <text x="452" y="182" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="middle">1</text>
    <text x="558" y="182" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">linear</text>

    <rect x="30" y="202" width="600" height="52" fill="#ffffff" stroke="${RULE}" stroke-width="1.2"/>
    <text x="48" y="234" font-family="${MONO}" font-size="17" fill="${INK}">ax² + bx + c,  a ≠ 0</text>
    <text x="452" y="234" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="middle">2</text>
    <text x="558" y="234" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">quadratic</text>

    <rect x="30" y="254" width="600" height="52" fill="#f8fafc" stroke="${RULE}" stroke-width="1.2"/>
    <text x="48" y="286" font-family="${MONO}" font-size="17" fill="${INK}">ax³ + bx² + cx + d</text>
    <text x="452" y="286" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="middle">3</text>
    <text x="558" y="286" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">cubic</text>

    <rect x="30" y="306" width="600" height="52" fill="#ffffff" stroke="${RULE}" stroke-width="1.2"/>
    <text x="48" y="338" font-family="${MONO}" font-size="17" fill="${INK}">ax⁴ + bx³ + cx² + dx + e</text>
    <text x="452" y="338" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="middle">4</text>
    <text x="558" y="338" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">quartic</text>

    <rect x="30" y="358" width="600" height="52" fill="#f8fafc" stroke="${RULE}" stroke-width="1.2"/>
    <text x="48" y="390" font-family="${MONO}" font-size="17" fill="${INK}">ax⁵ + bx⁴ + cx³ + dx² + ex + f</text>
    <text x="452" y="390" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="middle">5</text>
    <text x="558" y="390" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">quintic</text>

    <text x="330" y="428" font-family="${FONT}" font-size="13.5" fill="${MUTED}" text-anchor="middle">In every row the leading coefficient a is not zero — otherwise the degree drops.</text>
  </svg>`

// ── Roots ───────────────────────────────────────────────────────────────────
const ROOTS_CUBIC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 430" class="w-full h-full">
    ${plate(660, 430)}
    <text x="330" y="36" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">A root is where the curve meets the x-axis</text>

    <line x1="60" y1="230" x2="600" y2="230" stroke="${RULE}" stroke-width="1.8"/>
    <line x1="330" y1="66" x2="330" y2="394" stroke="${GRID}" stroke-width="1.5"/>
    <path d="${curve((x) => 0.42 * (x + 2) * (x - 1) * (x - 3), { xMin: -3.1, xMax: 4.1, yMin: -4.6, yMax: 4.6, ox: 330, oy: 230, ux: 62, uy: 35 })}"
      fill="none" stroke="${PURPLE}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>

    <circle cx="206" cy="230" r="7" fill="${RED}"/>
    <circle cx="392" cy="230" r="7" fill="${RED}"/>
    <circle cx="516" cy="230" r="7" fill="${RED}"/>
    <text x="206" y="258" font-family="${MONO}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">−2</text>
    <text x="392" y="258" font-family="${MONO}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">1</text>
    <text x="516" y="258" font-family="${MONO}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">3</text>

    <text x="330" y="96" font-family="${MONO}" font-size="20" font-weight="bold" fill="${PURPLE}" text-anchor="middle">P(x) = (x + 2)(x − 1)(x − 3)</text>

    <rect x="60" y="300" width="540" height="46" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="1.5"/>
    <text x="330" y="330" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="middle">P(−2) = 0        P(1) = 0        P(3) = 0</text>

    <rect x="60" y="352" width="540" height="46" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="330" y="382" font-family="${FONT}" font-size="15.5" font-weight="bold" fill="${INK}" text-anchor="middle">Three roots, three linear factors — a cubic can have no more.</text>
  </svg>`

const TURNING_POINTS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 300" class="w-full h-full">
    ${plate(680, 300)}
    <text x="340" y="34" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="middle">A polynomial of degree n has at most n − 1 turning points</text>

    <rect x="22" y="52" width="200" height="176" rx="12" fill="#f8fafc" stroke="${RULE}" stroke-width="1.4"/>
    <line x1="36" y1="168" x2="208" y2="168" stroke="${RULE}" stroke-width="1.4"/>
    <path d="${curve((x) => 0.55 * x * x - 1.6, { xMin: -3.2, xMax: 3.2, yMin: -2.4, yMax: 3.2, ox: 122, oy: 168, ux: 26, uy: 24 })}"
      fill="none" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="122" cy="206" r="5" fill="${RED}"/>
    <text x="122" y="248" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">quadratic</text>
    <text x="122" y="268" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">1 turning point</text>

    <rect x="240" y="52" width="200" height="176" rx="12" fill="#f8fafc" stroke="${RULE}" stroke-width="1.4"/>
    <line x1="254" y1="140" x2="426" y2="140" stroke="${RULE}" stroke-width="1.4"/>
    <path d="${curve((x) => 0.3 * x * (x - 2) * (x + 2), { xMin: -3.1, xMax: 3.1, yMin: -3.4, yMax: 3.4, ox: 340, oy: 140, ux: 27, uy: 25 })}"
      fill="none" stroke="${PURPLE}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="309" cy="117" r="5" fill="${RED}"/>
    <circle cx="371" cy="163" r="5" fill="${RED}"/>
    <text x="340" y="248" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">cubic</text>
    <text x="340" y="268" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">up to 2 turning points</text>

    <rect x="458" y="52" width="200" height="176" rx="12" fill="#f8fafc" stroke="${RULE}" stroke-width="1.4"/>
    <line x1="472" y1="150" x2="644" y2="150" stroke="${RULE}" stroke-width="1.4"/>
    <path d="${curve((x) => 0.22 * (x * x - 1) * (x * x - 5.5), { xMin: -3.0, xMax: 3.0, yMin: -3.2, yMax: 3.6, ox: 558, oy: 150, ux: 28, uy: 24 })}"
      fill="none" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="558" cy="120" r="5" fill="${RED}"/>
    <circle cx="507" cy="177" r="5" fill="${RED}"/>
    <circle cx="609" cy="177" r="5" fill="${RED}"/>
    <text x="558" y="248" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">quartic</text>
    <text x="558" y="268" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">up to 3 turning points</text>
  </svg>`

const ROOT_COUNT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 300" class="w-full h-full">
    ${plate(680, 300)}
    <text x="340" y="34" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">The same cubic, slid upwards. It never runs out of roots.</text>

    <rect x="22" y="52" width="200" height="180" rx="12" fill="#f8fafc" stroke="${RULE}" stroke-width="1.4"/>
    <line x1="36" y1="142" x2="208" y2="142" stroke="${RULE}" stroke-width="1.4"/>
    <path d="${curve((x) => 0.34 * x * (x - 2) * (x + 2), { xMin: -3.1, xMax: 3.1, yMin: -3.4, yMax: 3.4, ox: 122, oy: 142, ux: 27, uy: 25 })}"
      fill="none" stroke="${PURPLE}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="68" cy="142" r="5" fill="${RED}"/>
    <circle cx="122" cy="142" r="5" fill="${RED}"/>
    <circle cx="176" cy="142" r="5" fill="${RED}"/>
    <text x="122" y="256" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 roots</text>
    <text x="122" y="276" font-family="${FONT}" font-size="13.5" fill="${MUTED}" text-anchor="middle">three linear factors</text>

    <rect x="240" y="52" width="200" height="180" rx="12" fill="#f8fafc" stroke="${RULE}" stroke-width="1.4"/>
    <line x1="254" y1="142" x2="426" y2="142" stroke="${RULE}" stroke-width="1.4"/>
    <path d="${curve((x) => 0.34 * x * (x - 2) * (x + 2) + 1.047, { xMin: -3.1, xMax: 3.1, yMin: -3.4, yMax: 3.4, ox: 340, oy: 142, ux: 27, uy: 25 })}"
      fill="none" stroke="${PURPLE}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="277" cy="142" r="5" fill="${RED}"/>
    <circle cx="371" cy="142" r="5" fill="${RED}"/>
    <text x="340" y="256" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">2 roots</text>
    <text x="340" y="276" font-family="${FONT}" font-size="13.5" fill="${MUTED}" text-anchor="middle">one of them repeated</text>

    <rect x="458" y="52" width="200" height="180" rx="12" fill="#f8fafc" stroke="${RULE}" stroke-width="1.4"/>
    <line x1="472" y1="142" x2="644" y2="142" stroke="${RULE}" stroke-width="1.4"/>
    <path d="${curve((x) => 0.34 * x * (x - 2) * (x + 2) + 2.6, { xMin: -3.1, xMax: 3.1, yMin: -3.4, yMax: 3.4, ox: 558, oy: 142, ux: 27, uy: 25 })}"
      fill="none" stroke="${PURPLE}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="487" cy="142" r="5" fill="${RED}"/>
    <text x="558" y="256" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">1 root</text>
    <text x="558" y="276" font-family="${FONT}" font-size="13.5" fill="${MUTED}" text-anchor="middle">but never none</text>
  </svg>`

// ── Division ────────────────────────────────────────────────────────────────
const NUMBER_DIVISION = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 350" class="w-full h-full">
    ${plate(620, 350)}
    <text x="310" y="38" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">You already know this method. Only the numbers change.</text>

    <text x="176" y="92" font-family="${MONO}" font-size="24" font-weight="bold" fill="${GREEN}">3 2 4</text>
    <line x1="168" y1="102" x2="292" y2="102" stroke="${INK}" stroke-width="2.4"/>
    <text x="122" y="134" font-family="${MONO}" font-size="24" font-weight="bold" fill="${BLUE}">1 7</text>
    <text x="152" y="134" font-family="${MONO}" font-size="26" fill="${MUTED}">)</text>
    <text x="176" y="134" font-family="${MONO}" font-size="24" font-weight="bold" fill="${INK}">5 5 0 8</text>

    <text x="176" y="166" font-family="${MONO}" font-size="22" fill="${MUTED}">5 1</text>
    <line x1="168" y1="176" x2="228" y2="176" stroke="${RULE}" stroke-width="1.6"/>
    <text x="176" y="200" font-family="${MONO}" font-size="22" fill="${INK}">4 0</text>
    <text x="200" y="232" font-family="${MONO}" font-size="22" fill="${MUTED}">3 4</text>
    <line x1="192" y1="242" x2="252" y2="242" stroke="${RULE}" stroke-width="1.6"/>
    <text x="200" y="266" font-family="${MONO}" font-size="22" fill="${INK}">6 8</text>
    <text x="224" y="298" font-family="${MONO}" font-size="22" fill="${MUTED}">6 8</text>
    <line x1="216" y1="308" x2="276" y2="308" stroke="${RULE}" stroke-width="1.6"/>
    <text x="248" y="332" font-family="${MONO}" font-size="22" font-weight="bold" fill="${RED}">0</text>

    ${lead(400, 86, 300, 86, GREEN)}
    <text x="408" y="92" font-family="${FONT}" font-size="15.5" font-weight="bold" fill="${GREEN}">quotient</text>
    ${lead(400, 128, 300, 132, INK)}
    <text x="408" y="134" font-family="${FONT}" font-size="15.5" font-weight="bold" fill="${INK}">dividend</text>
    ${lead(400, 170, 300, 176, BLUE)}
    <text x="408" y="176" font-family="${FONT}" font-size="15.5" font-weight="bold" fill="${BLUE}">divisor</text>
    ${lead(400, 322, 290, 326, RED)}
    <text x="408" y="332" font-family="${FONT}" font-size="15.5" font-weight="bold" fill="${RED}">remainder</text>

    <rect x="396" y="200" width="196" height="86" rx="10" fill="${AMBER_T}" stroke="${KEY}" stroke-width="1.5"/>
    <text x="494" y="226" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">The four moves</text>
    <text x="494" y="250" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">divide, multiply,</text>
    <text x="494" y="270" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">subtract, bring down</text>
  </svg>`

const MISSING_TERM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" class="w-full h-full">
    ${plate(640, 320)}
    <text x="320" y="40" font-family="${FONT}" font-size="18" font-weight="bold" fill="${RED}" text-anchor="middle">Write the missing power in as 0, or the columns will not line up</text>

    <rect x="40" y="62" width="560" height="70" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="1.5"/>
    <text x="320" y="94" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RED}" text-anchor="middle">as printed in the question</text>
    <text x="320" y="122" font-family="${MONO}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">2x³ − x + 51</text>

    <path d="M320 140 L320 168" stroke="${MUTED}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M312 160 L320 170 L328 160" fill="none" stroke="${MUTED}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>

    <rect x="40" y="176" width="560" height="70" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="320" y="208" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">as you must write it before dividing</text>
    <text x="320" y="236" font-family="${MONO}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">2x³ + 0x² − x + 51</text>

    <text x="320" y="278" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">Four columns now: x³, x², x and the constant.</text>
    <text x="320" y="302" font-family="${FONT}" font-size="15" fill="${MUTED}" text-anchor="middle">This single step prevents most of the mistakes made in this topic.</text>
  </svg>`

const POLY_DIVISION = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 430" class="w-full h-full">
    ${plate(680, 430)}
    <text x="340" y="36" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">Divide x³ − 5x² + 8x − 4 by x − 2</text>

    <text x="196" y="82" font-family="${MONO}" font-size="20" font-weight="bold" fill="${GREEN}">x²</text>
    <text x="278" y="82" font-family="${MONO}" font-size="20" font-weight="bold" fill="${GREEN}">− 3x</text>
    <text x="378" y="82" font-family="${MONO}" font-size="20" font-weight="bold" fill="${GREEN}">+ 2</text>
    <line x1="180" y1="94" x2="450" y2="94" stroke="${INK}" stroke-width="2.4"/>

    <text x="96" y="124" font-family="${MONO}" font-size="20" font-weight="bold" fill="${BLUE}">x − 2</text>
    <text x="166" y="124" font-family="${MONO}" font-size="24" fill="${MUTED}">)</text>
    <text x="188" y="124" font-family="${MONO}" font-size="20" fill="${INK}">x³</text>
    <text x="262" y="124" font-family="${MONO}" font-size="20" fill="${INK}">− 5x²</text>
    <text x="352" y="124" font-family="${MONO}" font-size="20" fill="${INK}">+ 8x</text>
    <text x="432" y="124" font-family="${MONO}" font-size="20" fill="${INK}">− 4</text>

    <text x="166" y="156" font-family="${MONO}" font-size="20" fill="${MUTED}">−</text>
    <text x="188" y="156" font-family="${MONO}" font-size="20" fill="${MUTED}">x³</text>
    <text x="262" y="156" font-family="${MONO}" font-size="20" fill="${MUTED}">− 2x²</text>
    <line x1="180" y1="168" x2="332" y2="168" stroke="${RULE}" stroke-width="1.6"/>

    <text x="262" y="194" font-family="${MONO}" font-size="20" fill="${INK}">− 3x²</text>
    <text x="352" y="194" font-family="${MONO}" font-size="20" fill="${KEY}">+ 8x</text>

    <text x="240" y="226" font-family="${MONO}" font-size="20" fill="${MUTED}">−</text>
    <text x="262" y="226" font-family="${MONO}" font-size="20" fill="${MUTED}">− 3x²</text>
    <text x="352" y="226" font-family="${MONO}" font-size="20" fill="${MUTED}">+ 6x</text>
    <line x1="256" y1="238" x2="412" y2="238" stroke="${RULE}" stroke-width="1.6"/>

    <text x="356" y="264" font-family="${MONO}" font-size="20" fill="${INK}">2x</text>
    <text x="432" y="264" font-family="${MONO}" font-size="20" fill="${KEY}">− 4</text>

    <text x="330" y="296" font-family="${MONO}" font-size="20" fill="${MUTED}">−</text>
    <text x="356" y="296" font-family="${MONO}" font-size="20" fill="${MUTED}">2x</text>
    <text x="432" y="296" font-family="${MONO}" font-size="20" fill="${MUTED}">− 4</text>
    <line x1="348" y1="308" x2="480" y2="308" stroke="${RULE}" stroke-width="1.6"/>

    <text x="440" y="334" font-family="${MONO}" font-size="20" font-weight="bold" fill="${RED}">0</text>

    <rect x="486" y="60" width="176" height="120" rx="10" fill="${AMBER_T}" stroke="${KEY}" stroke-width="1.5"/>
    <text x="574" y="84" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">One pass</text>
    <text x="574" y="106" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">1. divide the first terms</text>
    <text x="574" y="126" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">2. multiply the divisor</text>
    <text x="574" y="146" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">3. subtract</text>
    <text x="574" y="166" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">4. bring the next term down</text>

    <rect x="486" y="196" width="176" height="76" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="574" y="220" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">Remainder 0, so</text>
    <text x="574" y="242" font-family="${MONO}" font-size="14" fill="${INK}" text-anchor="middle">x − 2 is a factor</text>
    <text x="574" y="262" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">of the cubic</text>

    <text x="340" y="376" font-family="${MONO}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">x³ − 5x² + 8x − 4 = (x − 2)(x² − 3x + 2)</text>
    <text x="340" y="404" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">The amber terms are the ones brought down, one at a time.</text>
  </svg>`

const DIVISION_REMAINDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 400" class="w-full h-full">
    ${plate(680, 400)}
    <text x="340" y="36" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">Divide x³ + 4x² − 3x + 5 by x + 2</text>

    <text x="196" y="82" font-family="${MONO}" font-size="20" font-weight="bold" fill="${GREEN}">x²</text>
    <text x="278" y="82" font-family="${MONO}" font-size="20" font-weight="bold" fill="${GREEN}">+ 2x</text>
    <text x="378" y="82" font-family="${MONO}" font-size="20" font-weight="bold" fill="${GREEN}">− 7</text>
    <line x1="180" y1="94" x2="450" y2="94" stroke="${INK}" stroke-width="2.4"/>

    <text x="96" y="124" font-family="${MONO}" font-size="20" font-weight="bold" fill="${BLUE}">x + 2</text>
    <text x="166" y="124" font-family="${MONO}" font-size="24" fill="${MUTED}">)</text>
    <text x="188" y="124" font-family="${MONO}" font-size="20" fill="${INK}">x³</text>
    <text x="262" y="124" font-family="${MONO}" font-size="20" fill="${INK}">+ 4x²</text>
    <text x="352" y="124" font-family="${MONO}" font-size="20" fill="${INK}">− 3x</text>
    <text x="432" y="124" font-family="${MONO}" font-size="20" fill="${INK}">+ 5</text>

    <text x="166" y="156" font-family="${MONO}" font-size="20" fill="${MUTED}">−</text>
    <text x="188" y="156" font-family="${MONO}" font-size="20" fill="${MUTED}">x³</text>
    <text x="262" y="156" font-family="${MONO}" font-size="20" fill="${MUTED}">+ 2x²</text>
    <line x1="180" y1="168" x2="332" y2="168" stroke="${RULE}" stroke-width="1.6"/>

    <text x="266" y="194" font-family="${MONO}" font-size="20" fill="${INK}">2x²</text>
    <text x="352" y="194" font-family="${MONO}" font-size="20" fill="${KEY}">− 3x</text>

    <text x="240" y="226" font-family="${MONO}" font-size="20" fill="${MUTED}">−</text>
    <text x="266" y="226" font-family="${MONO}" font-size="20" fill="${MUTED}">2x²</text>
    <text x="352" y="226" font-family="${MONO}" font-size="20" fill="${MUTED}">+ 4x</text>
    <line x1="256" y1="238" x2="412" y2="238" stroke="${RULE}" stroke-width="1.6"/>

    <text x="352" y="264" font-family="${MONO}" font-size="20" fill="${INK}">− 7x</text>
    <text x="432" y="264" font-family="${MONO}" font-size="20" fill="${KEY}">+ 5</text>

    <text x="330" y="296" font-family="${MONO}" font-size="20" fill="${MUTED}">−</text>
    <text x="352" y="296" font-family="${MONO}" font-size="20" fill="${MUTED}">− 7x</text>
    <text x="428" y="296" font-family="${MONO}" font-size="20" fill="${MUTED}">− 14</text>
    <line x1="348" y1="308" x2="480" y2="308" stroke="${RULE}" stroke-width="1.6"/>

    <text x="432" y="334" font-family="${MONO}" font-size="20" font-weight="bold" fill="${RED}">19</text>
    ${lead(548, 328, 470, 330, RED)}
    <text x="556" y="334" font-family="${FONT}" font-size="14.5" font-weight="bold" fill="${RED}">remainder</text>

    <rect x="40" y="352" width="600" height="34" rx="9" fill="${RED_T}" stroke="${RED}" stroke-width="1.4"/>
    <text x="340" y="375" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">x³ + 4x² − 3x + 5 = (x + 2)(x² + 2x − 7) + 19</text>
  </svg>`

const FACTOR_LINK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 330" class="w-full h-full">
    ${plate(660, 330)}
    <text x="330" y="40" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Four ways of saying exactly the same thing</text>

    <rect x="36" y="62" width="268" height="86" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="1.6"/>
    <text x="170" y="92" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">substitute and get zero</text>
    <text x="170" y="126" font-family="${MONO}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">P(c) = 0</text>

    <rect x="356" y="62" width="268" height="86" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.6"/>
    <text x="490" y="92" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">it divides exactly</text>
    <text x="490" y="126" font-family="${MONO}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">x − c is a factor</text>

    <rect x="36" y="182" width="268" height="86" rx="12" fill="${AMBER_T}" stroke="${KEY}" stroke-width="1.6"/>
    <text x="170" y="212" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">the division leaves nothing</text>
    <text x="170" y="246" font-family="${MONO}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">remainder = 0</text>

    <rect x="356" y="182" width="268" height="86" rx="12" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="1.6"/>
    <text x="490" y="212" font-family="${FONT}" font-size="14" font-weight="bold" fill="${PURPLE}" text-anchor="middle">on the graph</text>
    <text x="490" y="246" font-family="${MONO}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">crosses at x = c</text>

    <line x1="304" y1="105" x2="356" y2="105" stroke="${MUTED}" stroke-width="2"/>
    <line x1="304" y1="225" x2="356" y2="225" stroke="${MUTED}" stroke-width="2"/>
    <line x1="170" y1="148" x2="170" y2="182" stroke="${MUTED}" stroke-width="2"/>
    <line x1="490" y1="148" x2="490" y2="182" stroke="${MUTED}" stroke-width="2"/>

    <text x="330" y="304" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">The theorem is worth having because substituting is three lines and dividing is fifteen.</text>
  </svg>`

const FACTORISE_CUBIC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 380" class="w-full h-full">
    ${plate(680, 380)}
    <text x="340" y="38" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">Factorise x³ − 5x² + 8x − 4 completely</text>

    <rect x="30" y="58" width="300" height="60" rx="11" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="1.5"/>
    <text x="52" y="82" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}">1. Try the factors of the constant</text>
    <text x="52" y="106" font-family="${MONO}" font-size="15" fill="${INK}">±1, ±2, ±4 — try P(1) = 0</text>

    <rect x="30" y="128" width="300" height="60" rx="11" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="52" y="152" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}">2. Name the factor it gives you</text>
    <text x="52" y="176" font-family="${MONO}" font-size="15" fill="${INK}">P(1) = 0, so x − 1 is a factor</text>

    <rect x="30" y="198" width="300" height="60" rx="11" fill="${AMBER_T}" stroke="${KEY}" stroke-width="1.5"/>
    <text x="52" y="222" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}">3. Divide it out</text>
    <text x="52" y="246" font-family="${MONO}" font-size="15" fill="${INK}">quotient x² − 4x + 4</text>

    <rect x="30" y="268" width="300" height="60" rx="11" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="1.5"/>
    <text x="52" y="292" font-family="${FONT}" font-size="14" font-weight="bold" fill="${PURPLE}">4. Factorise the quadratic</text>
    <text x="52" y="316" font-family="${MONO}" font-size="15" fill="${INK}">x² − 4x + 4 = (x − 2)²</text>

    <line x1="360" y1="70" x2="360" y2="330" stroke="${GRID}" stroke-width="1.5"/>
    <line x1="380" y1="250" x2="660" y2="250" stroke="${RULE}" stroke-width="1.5"/>
    <path d="${curve((x) => 0.62 * (x - 1) * (x - 2) * (x - 2), { xMin: -0.4, xMax: 3.6, yMin: -2.6, yMax: 3.2, ox: 404, oy: 250, ux: 64, uy: 30 })}"
      fill="none" stroke="${PURPLE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="468" cy="250" r="6" fill="${RED}"/>
    <circle cx="532" cy="250" r="6" fill="${RED}"/>
    <text x="468" y="276" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">1</text>
    <text x="532" y="276" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">2</text>
    <text x="520" y="104" font-family="${FONT}" font-size="13.5" fill="${MUTED}" text-anchor="middle">the curve only touches at x = 2</text>
    <text x="520" y="124" font-family="${FONT}" font-size="13.5" fill="${MUTED}" text-anchor="middle">because that factor is repeated</text>

    <rect x="380" y="300" width="272" height="40" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="516" y="326" font-family="${MONO}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">(x − 1)(x − 2)²</text>
  </svg>`

const GRAPH_CUBIC_A = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340" class="w-full h-full">
    ${plate(560, 340)}
    <line x1="40" y1="200" x2="520" y2="200" stroke="${RULE}" stroke-width="1.8"/>
    <line x1="220" y1="40" x2="220" y2="300" stroke="${GRID}" stroke-width="1.5"/>
    <path d="${curve((x) => 0.34 * (x + 2) * (x - 1) * (x - 4), { xMin: -3.0, xMax: 5.0, yMin: -4.6, yMax: 4.0, ox: 220, oy: 200, ux: 56, uy: 30 })}"
      fill="none" stroke="${PURPLE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="108" cy="200" r="6" fill="${RED}"/>
    <circle cx="276" cy="200" r="6" fill="${RED}"/>
    <circle cx="444" cy="200" r="6" fill="${RED}"/>
    <text x="108" y="226" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">−2</text>
    <text x="276" y="226" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">1</text>
    <text x="444" y="226" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">4</text>
    <text x="280" y="66" font-family="${MONO}" font-size="18" font-weight="bold" fill="${PURPLE}" text-anchor="middle">y = x³ − 3x² − 6x + 8</text>
    <text x="280" y="322" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">The graph crosses the x-axis three times.</text>
  </svg>`

export const DIAGRAMS = {
  ANATOMY: ANATOMY,
  DEGREE_TABLE: DEGREE_TABLE,
  DEG_0: DEG_0,
  DEG_1: DEG_1,
  DEG_2: DEG_2,
  DEG_3: DEG_3,
  DEG_4: DEG_4,
  DEG_5: DEG_5,
  ROOTS_CUBIC: ROOTS_CUBIC,
  TURNING_POINTS: TURNING_POINTS,
  ROOT_COUNT: ROOT_COUNT,
  NUMBER_DIVISION: NUMBER_DIVISION,
  MISSING_TERM: MISSING_TERM,
  POLY_DIVISION: POLY_DIVISION,
  DIVISION_REMAINDER: DIVISION_REMAINDER,
  FACTOR_LINK: FACTOR_LINK,
  FACTORISE_CUBIC: FACTORISE_CUBIC,
  GRAPH_CUBIC_A: GRAPH_CUBIC_A,
}
