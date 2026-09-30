// src/data/ADD_MATH/AM_5D/diagrams.js
// Teaching diagrams for AM_5D — Graphs and Inverses of Exponential and Log
// Functions (Cambridge IGCSE Additional Mathematics 0606, sections 5.9–5.11).
//
// House rules (docs/svg-diagrams.md, and the AM_7A deck):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY, coordinates included — helpers emit
//    paths only, because `npm run audit:svg` cannot see text a helper builds;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · one colour per concept: BLUE is an exponential curve, RED a log curve,
//    AMBER an asymptote, GREEN a crossing point, PURPLE the line y = x.
//  · A sketch has no scale: its two axes are drawn with different units, the
//    way a book sketch is. The grid pictures (the mirror, the inverse) use
//    equal units, because a reflection in y = x only looks like one then.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   EXP_FEATURES       y = eˣ: through (0, 1), always positive, the negative
//                      x-axis is an asymptote.
//   LN_FEATURES        y = ln x: through (1, 0), only for x > 0, the negative
//                      y-axis is an asymptote.
//   EXP_LN_MIRROR      the two are mirror images in y = x (a hotspot figure:
//                      the mirror image of (0, 1) is left unlabelled).
//   EXP_FAMILIES       a constant added, multiplying, or in the power.
//   LN_FAMILIES        the same three places for ln.
//   SKETCH_EXP         the finished sketch of y = 4e²ˣ − 12.
//   CROSS_OR_NOT       an asymptote below the axis crosses it; above, never.
//   SKETCH_LN          the finished sketch of y = 2 ln(2x + 4).
//   INVERSE_REFLECT    f(x) = eˣ + 2 and its inverse, with y = x: the
//                      asymptotes swap.
//   DOMAIN_RANGE_SWAP  the domain of the inverse is the range of f.

const INK = '#1e293b'
const MUTED = '#64748b'
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const AMBER = '#d97706'
const PURPLE = '#a855f7'
const PINK = '#be185d'
const GRIDLINE = '#eef2f7'
const BLUE_T = '#eff6ff'
const PINK_T = '#fdf2f8'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/**
 * A graph window: the origin in pixels, pixels per unit on each axis, and the
 * pixel box a curve is clipped to.
 */
const win = (o) => ({ ...o, X: (x) => o.ox + x * o.ux, Y: (y) => o.oy - y * o.uy })

/** A sampled path, broken wherever the curve leaves the window's box. */
function curve(w, f, x0, x1, steps = 400) {
  let d = ''
  let pen = false
  for (let i = 0; i <= steps; i += 1) {
    const x = x0 + ((x1 - x0) * i) / steps
    const y = f(x)
    const px = w.X(x)
    const py = w.Y(y)
    if (!Number.isFinite(y) || px < w.left || px > w.right || py < w.top || py > w.bottom) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)} `
    pen = true
  }
  return d.trim()
}

/** The same, for a curve given as x in terms of y — a log curve's dive beside its asymptote stays smooth. */
function curveOfY(w, g, y0, y1, steps = 400) {
  let d = ''
  let pen = false
  for (let i = 0; i <= steps; i += 1) {
    const y = y0 + ((y1 - y0) * i) / steps
    const x = g(y)
    const px = w.X(x)
    const py = w.Y(y)
    if (!Number.isFinite(x) || px < w.left || px > w.right || py < w.top || py > w.bottom) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)} `
    pen = true
  }
  return d.trim()
}

/** Axes across a window's box, arrowheads on the positive ends. */
const axes = (w) => `<line x1="${w.left}" y1="${w.oy}" x2="${w.right}" y2="${w.oy}" stroke="${INK}" stroke-width="1.8"/>
    <line x1="${w.ox}" y1="${w.bottom}" x2="${w.ox}" y2="${w.top}" stroke="${INK}" stroke-width="1.8"/>
    <path d="M${w.right} ${w.oy} l-9 -4.5 l0 9 z" fill="${INK}"/>
    <path d="M${w.ox} ${w.top} l-4.5 9 l9 0 z" fill="${INK}"/>`

/** Faint whole-number gridlines inside a window. */
function lattice(w, x0, x1, y0, y1) {
  let d = ''
  for (let x = x0; x <= x1; x += 1) d += `M${w.X(x)} ${w.Y(y0)} L${w.X(x)} ${w.Y(y1)} `
  for (let y = y0; y <= y1; y += 1) d += `M${w.X(x0)} ${w.Y(y)} L${w.X(x1)} ${w.Y(y)} `
  return d.trim()
}

const dot = (x, y, color = INK, r = 5.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`
const hline = (w, y, color = AMBER, dash = '8 6', width = 2.4) => `<line x1="${w.left}" y1="${w.Y(y)}" x2="${w.right}" y2="${w.Y(y)}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}"/>`
const vline = (w, x, color = AMBER, dash = '8 6', width = 2.4) => `<line x1="${w.X(x)}" y1="${w.top}" x2="${w.X(x)}" y2="${w.bottom}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}"/>`
const stroke = (d, color, width = 3.5) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`

/* ============================================================ EXP_FEATURES */
// y = eˣ, 40 px a unit, origin (280, 250).
const EXP_FEATURES = (() => {
  const w = win({ ox: 280, oy: 250, ux: 40, uy: 40, left: 20, right: 540, top: 26, bottom: 330 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 350" class="w-full h-full drop-shadow-md">
    ${plate(560, 350)}
    ${axes(w)}
    <line x1="20" y1="250" x2="266" y2="250" stroke="${AMBER}" stroke-width="4" stroke-dasharray="10 7"/>
    ${stroke(curve(w, Math.exp, -6.5, 2.2), BLUE, 4)}
    ${dot(280, 210, GREEN, 6)}
    <text x="272" y="203" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">(0, 1)</text>
    <text x="362" y="52" font-family="${MONO}" font-size="18" font-weight="900" fill="${BLUE}">y = eˣ</text>
    <text x="362" y="76" font-family="${FONT}" font-size="13" font-weight="800" fill="${INK}">grows without limit</text>
    <text x="362" y="94" font-family="${FONT}" font-size="13" font-weight="800" fill="${INK}">as x gets larger</text>
    <text x="30" y="200" font-family="${FONT}" font-size="14" font-weight="800" fill="${INK}">always above the x-axis:</text>
    <text x="30" y="220" font-family="${MONO}" font-size="14" font-weight="900" fill="${INK}">eˣ &gt; 0 for every x</text>
    <text x="30" y="276" font-family="${FONT}" font-size="13" font-weight="800" fill="${AMBER}">the negative x-axis is an asymptote</text>
    <text x="30" y="298" font-family="${MONO}" font-size="14" font-weight="900" fill="${AMBER}">as x → −∞, y → 0</text>
    <text x="546" y="268" text-anchor="end" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">x</text>
    <text x="290" y="38" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">y</text>
    <text x="272" y="268" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
  </svg>`
})()

/* ============================================================ LN_FEATURES */
// y = ln x, 40 px a unit, origin (150, 180).
const LN_FEATURES = (() => {
  const w = win({ ox: 150, oy: 180, ux: 40, uy: 40, left: 24, right: 540, top: 26, bottom: 346 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360" class="w-full h-full drop-shadow-md">
    ${plate(560, 360)}
    <rect x="24" y="30" width="118" height="316" rx="10" fill="#fef2f2"/>
    ${axes(w)}
    <line x1="150" y1="196" x2="150" y2="346" stroke="${AMBER}" stroke-width="4" stroke-dasharray="10 7"/>
    ${stroke(curveOfY(w, Math.exp, -4.2, 2.4), RED, 4)}
    ${dot(190, 180, GREEN, 6)}
    <text x="198" y="202" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">(1, 0)</text>
    <text x="528" y="72" text-anchor="end" font-family="${MONO}" font-size="18" font-weight="900" fill="${RED}">y = ln x</text>
    <text x="300" y="160" font-family="${FONT}" font-size="13" font-weight="800" fill="${INK}">exists only for x &gt; 0</text>
    <text x="83" y="110" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="800" fill="${RED}">no ln here</text>
    <text x="83" y="130" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="900" fill="${RED}">x ≤ 0</text>
    <text x="172" y="300" font-family="${FONT}" font-size="13" font-weight="800" fill="${AMBER}">the negative y-axis is an asymptote</text>
    <text x="172" y="322" font-family="${MONO}" font-size="14" font-weight="900" fill="${AMBER}">as x → 0, y → −∞</text>
    <text x="546" y="198" text-anchor="end" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">x</text>
    <text x="160" y="38" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">y</text>
  </svg>`
})()

/* ============================================================ EXP_LN_MIRROR */
// y = eˣ (BLUE) and y = ln x (RED), mirror images in y = x (PURPLE), 50 px a
// unit, origin (250, 230). A hotspot activity asks for the mirror image of
// (0, 1), so that point is deliberately left unlabelled; the labels carry
// class="keep" so the stripped copy in the activity still names the curves.
const EXP_LN_MIRROR = (() => {
  const w = win({ ox: 250, oy: 230, ux: 50, uy: 50, left: 30, right: 545, top: 14, bottom: 392 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 400" class="w-full h-full drop-shadow-md">
    ${plate(560, 400)}
    <path d="${lattice(w, -4, 5, -3, 4)}" stroke="${GRIDLINE}" stroke-width="1" fill="none"/>
    ${axes(w)}
    <line x1="90" y1="390" x2="460" y2="20" stroke="${PURPLE}" stroke-width="2" stroke-dasharray="7 6"/>
    ${stroke(curve(w, Math.exp, -4.4, 1.6), BLUE, 4)}
    ${stroke(curveOfY(w, Math.exp, -3.3, 1.8), RED, 4)}
    <path d="M250 180 L300 230" stroke="${GREEN}" stroke-width="2" stroke-dasharray="4 4"/>
    ${dot(250, 180, BLUE, 6)}
    ${dot(300, 230, RED, 6)}
    <text class="keep" x="236" y="60" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">y = eˣ</text>
    <text class="keep" x="500" y="182" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${RED}">y = ln x</text>
    <text class="keep" x="468" y="32" font-family="${MONO}" font-size="14" font-weight="900" fill="${PURPLE}">y = x</text>
    <text class="keep" x="242" y="174" text-anchor="end" font-family="${MONO}" font-size="13" font-weight="900" fill="${BLUE}">(0, 1)</text>
    <text class="keep" x="538" y="250" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text class="keep" x="260" y="26" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">y</text>
  </svg>`
})()

/* ============================================================ EXP_FAMILIES */
// Three panels, 22 px a unit: y = eˣ + k, y = keˣ, y = e^(kx), each for three
// values of k (GREEN, BLUE, RED), with the asymptotes dashed.
const EXP_FAMILIES = (() => {
  const panel = (left) => win({ ox: left + 100, oy: 174, ux: 22, uy: 22, left, right: left + 200, top: 50, bottom: 254 })
  const a = panel(12)
  const b = panel(220)
  const c = panel(428)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" class="w-full h-full drop-shadow-md">
    ${plate(640, 300)}
    ${axes(a)}
    ${hline(a, 2, GREEN, '6 5', 1.8)}
    ${hline(a, -2, RED, '6 5', 1.8)}
    ${stroke(curve(a, (x) => Math.exp(x) + 2, -4.6, 2), GREEN, 3)}
    ${stroke(curve(a, (x) => Math.exp(x), -4.6, 2), BLUE, 3)}
    ${stroke(curve(a, (x) => Math.exp(x) - 2, -4.6, 2.2), RED, 3)}
    ${axes(b)}
    ${stroke(curve(b, (x) => 3 * Math.exp(x), -4.6, 2), GREEN, 3)}
    ${stroke(curve(b, (x) => Math.exp(x), -4.6, 2), BLUE, 3)}
    ${stroke(curve(b, (x) => -Math.exp(x), -4.6, 2), RED, 3)}
    ${axes(c)}
    ${stroke(curve(c, (x) => Math.exp(3 * x), -4.6, 1), GREEN, 3)}
    ${stroke(curve(c, (x) => Math.exp(x), -4.6, 2), BLUE, 3)}
    ${stroke(curve(c, (x) => Math.exp(-x), -2, 4.6), RED, 3)}
    <text x="112" y="34" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">y = eˣ + k</text>
    <text x="320" y="34" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">y = keˣ</text>
    <text x="528" y="34" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">y = eᵏˣ</text>
    <text x="112" y="274" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">moves up or down</text>
    <text x="320" y="274" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">stretches; −1 flips it over</text>
    <text x="528" y="274" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">steeper; (0, 1) stays put</text>
    <text x="60" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${GREEN}">k = 2</text>
    <text x="112" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">k = 0</text>
    <text x="164" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${RED}">k = −2</text>
    <text x="268" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${GREEN}">k = 3</text>
    <text x="320" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">k = 1</text>
    <text x="372" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${RED}">k = −1</text>
    <text x="476" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${GREEN}">k = 3</text>
    <text x="528" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">k = 1</text>
    <text x="580" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${RED}">k = −1</text>
  </svg>`
})()

/* ============================================================ LN_FAMILIES */
// Three panels, 22 px a unit: y = ln(x + k), y = k ln x, y = ln kx, each for
// three values of k, with the asymptotes dashed.
const LN_FAMILIES = (() => {
  const a = win({ ox: 92, oy: 150, ux: 22, uy: 22, left: 12, right: 212, top: 50, bottom: 254 })
  const b = win({ ox: 260, oy: 150, ux: 22, uy: 22, left: 220, right: 420, top: 50, bottom: 254 })
  const c = win({ ox: 528, oy: 150, ux: 22, uy: 22, left: 428, right: 628, top: 50, bottom: 254 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" class="w-full h-full drop-shadow-md">
    ${plate(640, 300)}
    ${axes(a)}
    ${vline(a, -2, GREEN, '6 5', 1.8)}
    ${vline(a, 2, RED, '6 5', 1.8)}
    ${stroke(curveOfY(a, (y) => Math.exp(y) - 2, -5, 2), GREEN, 3)}
    ${stroke(curveOfY(a, (y) => Math.exp(y), -5, 2), BLUE, 3)}
    ${stroke(curveOfY(a, (y) => Math.exp(y) + 2, -5, 2), RED, 3)}
    ${axes(b)}
    ${stroke(curveOfY(b, (y) => Math.exp(y / 3), -5, 4.6), GREEN, 3)}
    ${stroke(curveOfY(b, (y) => Math.exp(y), -5, 2.2), BLUE, 3)}
    ${stroke(curveOfY(b, (y) => Math.exp(-y), -2.2, 5), RED, 3)}
    ${dot(282, 150, INK, 4.5)}
    ${axes(c)}
    ${stroke(curveOfY(c, (y) => Math.exp(y) / 3, -5, 1.5), GREEN, 3)}
    ${stroke(curveOfY(c, (y) => Math.exp(y), -5, 1.5), BLUE, 3)}
    ${stroke(curveOfY(c, (y) => -Math.exp(y), -5, 1.5), RED, 3)}
    <text x="112" y="34" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">y = ln(x + k)</text>
    <text x="320" y="34" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">y = k ln x</text>
    <text x="528" y="34" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">y = ln kx</text>
    <text x="112" y="274" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">moves k to the LEFT</text>
    <text x="320" y="274" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">stretches; (1, 0) stays put</text>
    <text x="528" y="274" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">crosses at x = 1/k</text>
    <text x="60" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${GREEN}">k = 2</text>
    <text x="112" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">k = 0</text>
    <text x="164" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${RED}">k = −2</text>
    <text x="268" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${GREEN}">k = 3</text>
    <text x="320" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">k = 1</text>
    <text x="372" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${RED}">k = −1</text>
    <text x="476" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${GREEN}">k = 3</text>
    <text x="528" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${BLUE}">k = 1</text>
    <text x="580" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="900" fill="${RED}">k = −1</text>
  </svg>`
})()

/* ============================================================ SKETCH_EXP */
// The finished sketch of y = 4e²ˣ − 12: not to scale (100 px a unit across,
// 16 px a unit up), the way a book sketch is drawn.
const SKETCH_EXP = (() => {
  const w = win({ ox: 330, oy: 130, ux: 100, uy: 16, left: 26, right: 534, top: 18, bottom: 362 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 380" class="w-full h-full drop-shadow-md">
    ${plate(560, 380)}
    ${axes(w)}
    ${hline(w, -12)}
    ${stroke(curve(w, (x) => 4 * Math.exp(2 * x) - 12, -3.1, 0.9), BLUE, 4)}
    ${dot(330, 258, GREEN, 6)}
    ${dot(384.9, 130, GREEN, 6)}
    <text x="40" y="48" font-family="${MONO}" font-size="18" font-weight="900" fill="${BLUE}">y = 4e²ˣ − 12</text>
    <text x="320" y="250" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">(0, −8)</text>
    <text x="392" y="152" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">(½ ln 3, 0)</text>
    <text x="530" y="344" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${AMBER}">y = −12</text>
    <text x="540" y="122" text-anchor="end" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">x</text>
    <text x="340" y="30" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">y</text>
    <text x="322" y="146" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
  </svg>`
})()

/* ============================================================ CROSS_OR_NOT */
// Two curves that differ only in the sign of the constant: y = eˣ − 3 has its
// asymptote BELOW the x-axis and crosses it; y = eˣ + 3 has it ABOVE and never
// reaches the axis.
const CROSS_OR_NOT = (() => {
  const a = win({ ox: 160, oy: 170, ux: 34, uy: 26, left: 20, right: 305, top: 40, bottom: 284 })
  const b = win({ ox: 480, oy: 250, ux: 34, uy: 26, left: 335, right: 620, top: 40, bottom: 284 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" class="w-full h-full drop-shadow-md">
    ${plate(640, 320)}
    ${axes(a)}
    ${hline(a, -3)}
    ${stroke(curve(a, (x) => Math.exp(x) - 3, -4.2, 2.3), BLUE, 3.5)}
    ${dot(197.4, 170, GREEN, 6)}
    ${axes(b)}
    ${hline(b, 3)}
    ${stroke(curve(b, (x) => Math.exp(x) + 3, -4.2, 2), BLUE, 3.5)}
    <rect x="345" y="196" width="160" height="44" rx="8" fill="#fef2f2"/>
    <text x="30" y="62" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">y = eˣ − 3</text>
    <text x="350" y="62" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">y = eˣ + 3</text>
    <text x="204" y="190" font-family="${MONO}" font-size="14" font-weight="900" fill="${GREEN}">ln 3</text>
    <text x="300" y="268" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="900" fill="${AMBER}">y = −3</text>
    <text x="612" y="190" text-anchor="end" font-family="${MONO}" font-size="14" font-weight="900" fill="${AMBER}">y = 3</text>
    <text x="425" y="214" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${RED}">the curve never</text>
    <text x="425" y="231" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="${RED}">gets down here</text>
    <text x="162" y="308" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="800" fill="${INK}">asymptote below the axis: it crosses</text>
    <text x="478" y="308" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="800" fill="${INK}">asymptote above the axis: it never does</text>
  </svg>`
})()

/* ============================================================ SKETCH_LN */
// The finished sketch of y = 2 ln(2x + 4): not to scale (80 px a unit across,
// 30 px a unit up). The inside is positive for x > −2, so that is where the
// curve lives, and x = −2 is its asymptote.
const SKETCH_LN = (() => {
  const w = win({ ox: 330, oy: 190, ux: 80, uy: 30, left: 26, right: 534, top: 20, bottom: 362 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 380" class="w-full h-full drop-shadow-md">
    ${plate(560, 380)}
    ${axes(w)}
    ${vline(w, -2)}
    ${stroke(curveOfY(w, (y) => (Math.exp(y / 2) - 4) / 2, -5.8, 4.6), RED, 4)}
    ${dot(210, 190, GREEN, 6)}
    ${dot(330, 106.8, GREEN, 6)}
    <text x="162" y="46" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${AMBER}">x = −2</text>
    <text x="218" y="212" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">(−3/2, 0)</text>
    <text x="320" y="98" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">(0, 2 ln 4)</text>
    <text x="528" y="346" text-anchor="end" font-family="${MONO}" font-size="18" font-weight="900" fill="${RED}">y = 2 ln(2x + 4)</text>
    <text x="540" y="182" text-anchor="end" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">x</text>
    <text x="340" y="32" font-family="${MONO}" font-size="15" font-style="italic" fill="${INK}">y</text>
    <text x="322" y="206" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUTED}">O</text>
  </svg>`
})()

/* ============================================================ INVERSE_REFLECT */
// f(x) = eˣ + 2 (BLUE) and its inverse ln(x − 2) (PINK) on a square grid,
// 34 px a unit, origin (132, 268), with y = x. Each asymptote becomes the
// other's: y = 2 for f, x = 2 for the inverse.
const INVERSE_REFLECT = (() => {
  const w = win({ ox: 132, oy: 268, ux: 34, uy: 34, left: 30, right: 370, top: 30, bottom: 370 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 400" class="w-full h-full drop-shadow-md">
    ${plate(560, 400)}
    <path d="${lattice(w, -3, 7, -3, 7)}" stroke="${GRIDLINE}" stroke-width="1" fill="none"/>
    ${axes(w)}
    <line x1="30" y1="370" x2="370" y2="30" stroke="${PURPLE}" stroke-width="2" stroke-dasharray="7 6"/>
    ${hline(w, 2, BLUE, '8 6', 2)}
    ${vline(w, 2, PINK, '8 6', 2)}
    ${stroke(curve(w, (x) => Math.exp(x) + 2, -3.1, 1.7), BLUE, 4)}
    ${stroke(curveOfY(w, (y) => Math.exp(y) + 2, -3.1, 1.7), PINK, 4)}
    <path d="M132 166 L234 268" stroke="${AMBER}" stroke-width="2" stroke-dasharray="4 4"/>
    ${dot(132, 166, BLUE, 6)}
    ${dot(234, 268, PINK, 6)}
    <text x="124" y="160" text-anchor="end" font-family="${MONO}" font-size="13" font-weight="900" fill="${BLUE}">(0, 3)</text>
    <text x="242" y="288" font-family="${MONO}" font-size="13" font-weight="900" fill="${PINK}">(3, 0)</text>
    <text x="364" y="286" text-anchor="end" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="142" y="42" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">y</text>
    <rect x="388" y="30" width="156" height="340" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="400" y="60" font-family="${MONO}" font-size="14" font-weight="900" fill="${BLUE}">y = f(x)</text>
    <text x="400" y="80" font-family="${MONO}" font-size="14" font-weight="900" fill="${BLUE}">  = eˣ + 2</text>
    <text x="400" y="116" font-family="${MONO}" font-size="14" font-weight="900" fill="${PINK}">y = f⁻¹(x)</text>
    <text x="400" y="136" font-family="${MONO}" font-size="14" font-weight="900" fill="${PINK}">  = ln(x − 2)</text>
    <text x="400" y="172" font-family="${MONO}" font-size="14" font-weight="900" fill="${PURPLE}">y = x (mirror)</text>
    <text x="400" y="214" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">ASYMPTOTES</text>
    <text x="400" y="238" font-family="${MONO}" font-size="14" font-weight="900" fill="${BLUE}">f:   y = 2</text>
    <text x="400" y="260" font-family="${MONO}" font-size="14" font-weight="900" fill="${PINK}">f⁻¹: x = 2</text>
    <text x="400" y="300" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">MIRRORED POINTS</text>
    <text x="400" y="324" font-family="${MONO}" font-size="14" font-weight="900" fill="${AMBER}">(0, 3) ↔ (3, 0)</text>
  </svg>`
})()

/* ============================================================ DOMAIN_RANGE_SWAP */
// The domain and range of f(x) = eˣ + 2 and of its inverse: they trade places.
const DOMAIN_RANGE_SWAP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 270" class="w-full h-full drop-shadow-md">
    ${plate(640, 270)}
    <rect x="24" y="24" width="248" height="186" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="368" y="24" width="248" height="186" rx="14" fill="${PINK_T}" stroke="${PINK}" stroke-width="2"/>
    <text x="148" y="58" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${BLUE}">f(x) = eˣ + 2</text>
    <text x="492" y="58" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${PINK}">f⁻¹(x) = ln(x − 2)</text>
    <text x="44" y="104" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">DOMAIN</text>
    <text x="44" y="128" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">every real x</text>
    <text x="44" y="164" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">RANGE</text>
    <text x="44" y="188" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">f(x) &gt; 2</text>
    <text x="388" y="104" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">DOMAIN</text>
    <text x="388" y="128" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">x &gt; 2</text>
    <text x="388" y="164" font-family="${FONT}" font-size="12" font-weight="800" fill="${MUTED}">RANGE</text>
    <text x="388" y="188" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">every real value</text>
    <path d="M200 184 L360 128" stroke="${AMBER}" stroke-width="2.5" fill="none"/>
    <path d="M368 125 l-12 -2 l5 11 z" fill="${AMBER}"/>
    <path d="M200 124 L360 180" stroke="${AMBER}" stroke-width="2.5" fill="none"/>
    <path d="M368 183 l-12 2 l5 -11 z" fill="${AMBER}"/>
    <text x="320" y="246" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${INK}">The inverse swaps them: its domain is the range of f.</text>
  </svg>`

export const DIAGRAMS = {
  EXP_FEATURES: EXP_FEATURES,
  LN_FEATURES: LN_FEATURES,
  EXP_LN_MIRROR: EXP_LN_MIRROR,
  EXP_FAMILIES: EXP_FAMILIES,
  LN_FAMILIES: LN_FAMILIES,
  SKETCH_EXP: SKETCH_EXP,
  CROSS_OR_NOT: CROSS_OR_NOT,
  SKETCH_LN: SKETCH_LN,
  INVERSE_REFLECT: INVERSE_REFLECT,
  DOMAIN_RANGE_SWAP: DOMAIN_RANGE_SWAP,
}
