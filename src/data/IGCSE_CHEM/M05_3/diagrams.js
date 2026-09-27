// src/data/IGCSE_CHEM/M05_3/diagrams.js
// Teaching diagrams for M05_3 Measuring the Rate of a Reaction (book spreads
// 9.1 and 9.2, plus the loss-of-mass method from 9.4). Every one is AUTHORED:
// the apparatus is line art and the graphs are drawn from our own data sets, not
// the book's, so nothing here is copied from the page.
//
// House rules (kept from COORD_SCI/U05_1 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it; helpers draw shapes, grids and curves only;
//  · leader lines are tagged class="lbl", so the hotspot activity (which strips
//    every <text> and every .lbl) shows the bare apparatus with no answers on it.
//
// GRAPHS ARE COMPUTED, NOT EYEBALLED. Each graph keeps its data as numbers, maps
// them to pixels with one linear function per axis, and draws the curve with a
// monotone cubic (Fritsch–Carlson) through the plotted points — so the curve
// never overshoots a point, never dips, and goes exactly flat where the readings
// stop changing. The axis numbers are written literally but sit on the same
// pixel formula (noted beside each graph), so a value "read from the graph" is
// the value in the data.

const INK = '#1e293b'
const LEAD = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', Consolas, monospace"

// One colour per idea, the same on every diagram in the unit.
const GLASS = '#64748b'             // glassware outline
const LIQUID = '#e6f4f1'            // the acid (kept neutral: acid-red is reserved for indicator colours)
const GAS_F = '#ede9fe'             // gas collected in the syringe
const METAL = '#6b7280'             // magnesium ribbon
const CURVE = '#4338ca'             // a results curve
const CURVE_B = '#0f766e'           // the second curve, when there are two
const GRID = '#e2e8f0', GRID_MAJOR = '#cbd5e1'
const STEEP = '#4338ca', MID = '#0f766e', FLAT = '#64748b'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/**
 * A graph grid: vertical lines every `dx` px and horizontal every `dy` px across
 * the plot box (origin ox, oy; size w × h). Every `majorEvery`-th line is darker.
 */
function grid(ox, oy, w, h, dx, dy, majorEvery) {
  const out = []
  const nx = Math.round(w / dx)
  const ny = Math.round(h / dy)
  for (let i = 0; i <= nx; i++) {
    const x = +(ox + i * dx).toFixed(2)
    out.push('<line x1="' + x + '" y1="' + (oy - h) + '" x2="' + x + '" y2="' + oy + '" stroke="' + (i % majorEvery ? GRID : GRID_MAJOR) + '" stroke-width="1"/>')
  }
  for (let j = 0; j <= ny; j++) {
    const y = +(oy - j * dy).toFixed(2)
    out.push('<line x1="' + ox + '" y1="' + y + '" x2="' + (ox + w) + '" y2="' + y + '" stroke="' + (j % majorEvery ? GRID : GRID_MAJOR) + '" stroke-width="1"/>')
  }
  return out.join('\n    ')
}

/** Bold axes with arrowheads. Origin (ox, oy), plot w × h. */
function axes(ox, oy, w, h) {
  return '<line x1="' + ox + '" y1="' + (oy - h - 12) + '" x2="' + ox + '" y2="' + oy + '" stroke="' + INK + '" stroke-width="2"/>' +
    '<path d="M ' + ox + ' ' + (oy - h - 18) + ' l -5 9 l 10 0 z" fill="' + INK + '"/>' +
    '<line x1="' + ox + '" y1="' + oy + '" x2="' + (ox + w + 12) + '" y2="' + oy + '" stroke="' + INK + '" stroke-width="2"/>' +
    '<path d="M ' + (ox + w + 18) + ' ' + oy + ' l -9 -5 l 0 10 z" fill="' + INK + '"/>'
}

/**
 * Monotone cubic (Fritsch–Carlson) through pixel points [[x, y], …] with x
 * increasing. Returns an SVG path "M … C …". Monotone data gives a monotone
 * curve: no overshoot above the final volume, and a flat run stays flat.
 */
function curvePath(pts) {
  const n = pts.length
  const d = []
  for (let k = 0; k < n - 1; k++) d.push((pts[k + 1][1] - pts[k][1]) / (pts[k + 1][0] - pts[k][0]))
  const m = new Array(n)
  m[0] = d[0]
  m[n - 1] = d[n - 2]
  for (let k = 1; k < n - 1; k++) m[k] = d[k - 1] * d[k] <= 0 ? 0 : (d[k - 1] + d[k]) / 2
  for (let k = 0; k < n - 1; k++) {
    if (d[k] === 0) { m[k] = 0; m[k + 1] = 0; continue }
    const a = m[k] / d[k]
    const b = m[k + 1] / d[k]
    const s = a * a + b * b
    if (s > 9) {
      const t = 3 / Math.sqrt(s)
      m[k] = t * a * d[k]
      m[k + 1] = t * b * d[k]
    }
  }
  const f = (v) => +v.toFixed(2)
  let p = 'M ' + f(pts[0][0]) + ' ' + f(pts[0][1])
  for (let k = 0; k < n - 1; k++) {
    const h = pts[k + 1][0] - pts[k][0]
    p += ' C ' + f(pts[k][0] + h / 3) + ' ' + f(pts[k][1] + (m[k] * h) / 3) + ', ' +
      f(pts[k + 1][0] - h / 3) + ' ' + f(pts[k + 1][1] - (m[k + 1] * h) / 3) + ', ' +
      f(pts[k + 1][0]) + ' ' + f(pts[k + 1][1])
  }
  return p
}

/** Plotted points as small filled circles. */
const dots = (pts, col) => pts.map(([x, y]) => '<circle cx="' + +x.toFixed(2) + '" cy="' + +y.toFixed(2) + '" r="3.6" fill="' + col + '"/>').join('')

/** Map (time, volume) data to pixels for a graph with origin ox, oy. */
const toPx = (data, ox, oy, pxPerT, pxPerV) => data.map(([t, v]) => [ox + t * pxPerT, oy - v * pxPerV])

/** A stopclock: the face, the winder, two feet and the hands. Shapes only. */
function stopclock(cx, cy, r) {
  return '<rect x="' + (cx - 6) + '" y="' + (cy - r - 12) + '" width="12" height="10" rx="2" fill="#94a3b8"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#ffffff" stroke="' + INK + '" stroke-width="2.5"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 6) + '" fill="none" stroke="' + GRID_MAJOR + '" stroke-width="1"/>' +
    '<line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - r + 10) + '" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>' +
    '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r * 0.45) + '" y2="' + (cy + r * 0.3) + '" stroke="#c8102e" stroke-width="1.6" stroke-linecap="round"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="' + INK + '"/>' +
    '<line x1="' + (cx - r * 0.6) + '" y1="' + (cy + r * 0.8) + '" x2="' + (cx - r * 0.8) + '" y2="' + (cy + r + 8) + '" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>' +
    '<line x1="' + (cx + r * 0.6) + '" y1="' + (cy + r * 0.8) + '" x2="' + (cx + r * 0.8) + '" y2="' + (cy + r + 8) + '" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>'
}

/** Syringe scale ticks along the top of a barrel: `count`+1 ticks from x0, `step` px apart. */
function ticks(x0, y, step, count) {
  const out = []
  for (let i = 0; i <= count; i++) {
    const x = +(x0 + i * step).toFixed(2)
    out.push('<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + (i % 2 ? 5 : 9)) + '" stroke="' + LEAD + '" stroke-width="1.2"/>')
  }
  return out.join('')
}

// ───────────────────────────────────────────────────────────────────────────
// Data sets (our own — not the book's).
//  · RUN: magnesium ribbon + excess dilute hydrochloric acid, hydrogen in cm³
//    read every minute. Per-minute volumes 20, 14, 11, 8, 5, 2, 0 — the rate
//    falls every minute and the reaction is over at 6 minutes, 60 cm³ in all,
//    so the average rate is 60 ÷ 6 = 10 cm³/min.
//  · METAL_A / METAL_B: the same mass of two metals, each in excess acid.
//    A: over at 4 min with 40 cm³ (average 10 cm³/min).
//    B: over at 8 min with 48 cm³ (average 6 cm³/min).
// ───────────────────────────────────────────────────────────────────────────
const RUN = [[0, 0], [1, 20], [2, 34], [3, 45], [4, 53], [5, 58], [6, 60], [7, 60], [8, 60]]
const METAL_A = [[0, 0], [1, 22], [2, 34], [3, 39], [4, 40], [5, 40], [6, 40], [7, 40], [8, 40], [9, 40], [10, 40]]
const METAL_B = [[0, 0], [1, 11], [2, 21], [3, 29], [4, 36], [5, 41], [6, 45], [7, 47], [8, 48], [9, 48], [10, 48]]

// RATE_CURVE axes: x = 60 + 43·t (t in min), y = 270 − 3.2·V (V in cm³).
// Grid every 0.5 min (21.5 px) and every 5 cm³ (16 px); numbers every 1 min / 10 cm³.
const RUN_PX = toPx(RUN, 60, 270, 43, 3.2)
// CURVE_THREE_PARTS reuses the RUN shape on a plain, number-free axis:
// x = 50 + 45·t, y = 250 − 3·V.
const THREE_PX = toPx(RUN, 50, 250, 45, 3)
// TWO_METALS axes: x = 60 + 34.4·t (t in min, 0–10), y = 280 − 4·V (V in cm³, 0–60).
// Grid every 1 min (34.4 px) and every 5 cm³ (20 px); numbers every 1 min / 10 cm³.
const A_PX = toPx(METAL_A, 60, 280, 34.4, 4)
const B_PX = toPx(METAL_B, 60, 280, 34.4, 4)

// ───────────────────────────────────────────────────────────────────────────
// 1 · The gas-syringe apparatus (book 9.2): magnesium ribbon in excess dilute
//     hydrochloric acid, stopper, delivery tube, gas syringe, stopclock. The
//     hotspot on slide 8 uses this drawing with its labels stripped:
//     syringe barrel centre (360, 60) · delivery tube (190, 60) ·
//     flask (130, 228) · stopclock (440, 200).
// ───────────────────────────────────────────────────────────────────────────
const GAS_SYRINGE_RIG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" class="w-full h-full">
    ${plate(520, 320)}
    <path d="M 94 205 L 66 260 Q 62 270 74 270 L 186 270 Q 198 270 194 260 L 166 205 Z" fill="${LIQUID}"/>
    <path d="M 96 262 l 8 -6 l 8 6 l 8 -6 l 8 6 l 8 -6 l 8 6" fill="none" stroke="${METAL}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="108" cy="244" r="2.6" fill="none" stroke="${LEAD}" stroke-width="1.2"/>
    <circle cx="122" cy="232" r="3" fill="none" stroke="${LEAD}" stroke-width="1.2"/>
    <circle cx="134" cy="246" r="2.4" fill="none" stroke="${LEAD}" stroke-width="1.2"/>
    <circle cx="128" cy="218" r="2.8" fill="none" stroke="${LEAD}" stroke-width="1.2"/>
    <path d="M 118 122 L 118 158 L 66 260 Q 62 270 74 270 L 186 270 Q 198 270 194 260 L 142 158 L 142 122" fill="none" stroke="${GLASS}" stroke-width="2.6" stroke-linejoin="round"/>
    <rect x="112" y="108" width="36" height="20" rx="3" fill="#57534e"/>
    <path d="M 130 110 L 130 60 L 252 60" fill="none" stroke="#94a3b8" stroke-width="7" stroke-linejoin="round"/>
    <path d="M 130 110 L 130 60 L 252 60" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="250" y="55" width="18" height="10" fill="#e2e8f0" stroke="${GLASS}" stroke-width="1.5"/>
    <rect x="268" y="40" width="184" height="40" rx="4" fill="#f8fafc" stroke="${GLASS}" stroke-width="2"/>
    <rect x="270" y="42" width="37" height="36" fill="${GAS_F}"/>
    ${ticks(272, 40, 17.6, 10)}
    <rect x="307" y="42" width="8" height="36" fill="#475569"/>
    <rect x="315" y="57" width="160" height="6" fill="#94a3b8"/>
    <rect x="475" y="44" width="8" height="32" rx="2" fill="#475569"/>
    ${stopclock(440, 200, 38)}
    <line x1="462" y1="104" x2="496" y2="104" stroke="${INK}" stroke-width="2" class="lbl"/>
    <path d="M 504 104 l -9 -5 l 0 10 z" fill="${INK}" class="lbl"/>
    <line x1="102" y1="116" x2="112" y2="117" stroke="${LEAD}" stroke-width="1.2" class="lbl"/>
    <line x1="62" y1="291" x2="98" y2="265" stroke="${LEAD}" stroke-width="1.2" class="lbl"/>
    <line x1="208" y1="231" x2="176" y2="236" stroke="${LEAD}" stroke-width="1.2" class="lbl"/>
    <text x="272" y="94" font-family="${MONO}" font-size="9" fill="${LEAD}" text-anchor="middle">0</text>
    <text x="307.2" y="94" font-family="${MONO}" font-size="9" fill="${LEAD}" text-anchor="middle">20</text>
    <text x="342.4" y="94" font-family="${MONO}" font-size="9" fill="${LEAD}" text-anchor="middle">40</text>
    <text x="377.6" y="94" font-family="${MONO}" font-size="9" fill="${LEAD}" text-anchor="middle">60</text>
    <text x="412.8" y="94" font-family="${MONO}" font-size="9" fill="${LEAD}" text-anchor="middle">80</text>
    <text x="448" y="94" font-family="${MONO}" font-size="9" fill="${LEAD}" text-anchor="middle">100</text>
    <text x="360" y="28" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">gas syringe</text>
    <text x="506" y="124" font-family="${FONT}" font-size="10.5" fill="${LEAD}" text-anchor="end">plunger moves out</text>
    <text x="190" y="50" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="middle">delivery tube</text>
    <text x="100" y="120" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="end">stopper</text>
    <text x="20" y="302" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">magnesium ribbon</text>
    <text x="212" y="228" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">excess dilute</text>
    <text x="212" y="242" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">hydrochloric acid</text>
    <text x="440" y="264" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="middle">stopclock</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Reading the gas syringe (book 9.2): the plunger all the way in at 0, then
//     pushed out to the 20 mark. Scale: 0 at x = 64, 2.9 px per cm³ (so 20 cm³
//     is at x = 122, the seal's position in the lower syringe).
// ───────────────────────────────────────────────────────────────────────────
const SYRINGE_READINGS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 240" class="w-full h-full">
    ${plate(460, 240)}
    <rect x="40" y="59" width="20" height="10" fill="#e2e8f0" stroke="${GLASS}" stroke-width="1.5"/>
    <rect x="60" y="46" width="300" height="36" rx="4" fill="#f8fafc" stroke="${GLASS}" stroke-width="2"/>
    ${ticks(64, 46, 14.5, 20)}
    <rect x="64" y="48" width="8" height="32" fill="#475569"/>
    <rect x="72" y="61" width="300" height="6" fill="#94a3b8"/>
    <rect x="372" y="50" width="8" height="28" rx="2" fill="#475569"/>

    <rect x="40" y="169" width="20" height="10" fill="#e2e8f0" stroke="${GLASS}" stroke-width="1.5"/>
    <rect x="60" y="156" width="300" height="36" rx="4" fill="#f8fafc" stroke="${GLASS}" stroke-width="2"/>
    <rect x="62" y="158" width="60" height="32" fill="${GAS_F}"/>
    ${ticks(64, 156, 14.5, 20)}
    <rect x="122" y="158" width="8" height="32" fill="#475569"/>
    <rect x="130" y="171" width="300" height="6" fill="#94a3b8"/>
    <rect x="430" y="160" width="8" height="28" rx="2" fill="#475569"/>
    <line x1="122" y1="150" x2="122" y2="198" stroke="#c25e12" stroke-width="1.6" stroke-dasharray="3 3"/>

    <text x="60" y="32" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}">At the start: plunger all the way in, 0 cm³</text>
    <text x="64" y="96" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">0</text>
    <text x="122" y="96" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">20</text>
    <text x="180" y="96" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">40</text>
    <text x="238" y="96" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">60</text>
    <text x="296" y="96" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">80</text>
    <text x="354" y="96" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">100</text>

    <text x="60" y="142" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}">Later: gas has pushed it out to the 20 mark</text>
    <text x="64" y="212" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">0</text>
    <text x="122" y="212" font-family="${MONO}" font-size="10" font-weight="700" fill="#c25e12" text-anchor="middle">20</text>
    <text x="180" y="212" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">40</text>
    <text x="238" y="212" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">60</text>
    <text x="296" y="212" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">80</text>
    <text x="354" y="212" font-family="${MONO}" font-size="10" fill="${LEAD}" text-anchor="middle">100</text>
    <text x="230" y="232" font-family="${FONT}" font-size="11" fill="${LEAD}" text-anchor="middle">20 cm³ of gas collected. The scale is in cm³.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · The second method (book 9.4): marble chips in dilute hydrochloric acid on
//     a balance. Carbon dioxide escapes through the cotton wool, so the reading
//     falls; the plug stops acid spray leaving too.
// ───────────────────────────────────────────────────────────────────────────
const MASS_LOSS_RIG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 320" class="w-full h-full">
    ${plate(460, 320)}
    <rect x="60" y="236" width="200" height="56" rx="8" fill="#e2e8f0" stroke="${GLASS}" stroke-width="2"/>
    <rect x="112" y="250" width="96" height="28" rx="4" fill="#0f172a"/>
    <rect x="80" y="226" width="160" height="10" rx="3" fill="#94a3b8"/>
    <path d="M 120.8 180 L 102 216 Q 98 226 110 226 L 210 226 Q 222 226 218 216 L 199.2 180 Z" fill="${LIQUID}"/>
    <path d="M 124 222 l 6 -10 l 10 2 l 3 8 z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.4"/>
    <path d="M 146 222 l 4 -12 l 11 -1 l 4 13 z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.4"/>
    <path d="M 170 222 l 7 -9 l 9 3 l 1 6 z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.4"/>
    <path d="M 190 222 l 3 -7 l 9 1 l 2 6 z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.4"/>
    <circle cx="140" cy="198" r="2.6" fill="none" stroke="${LEAD}" stroke-width="1.2"/>
    <circle cx="158" cy="190" r="3" fill="none" stroke="${LEAD}" stroke-width="1.2"/>
    <circle cx="176" cy="200" r="2.4" fill="none" stroke="${LEAD}" stroke-width="1.2"/>
    <path d="M 147 96 L 147 130 L 102 216 Q 98 226 110 226 L 210 226 Q 222 226 218 216 L 173 130 L 173 96" fill="none" stroke="${GLASS}" stroke-width="2.6" stroke-linejoin="round"/>
    <circle cx="152" cy="92" r="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="168" cy="92" r="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="155" cy="81" r="8.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="166" cy="80" r="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="160" cy="88" r="7" fill="#ffffff"/>
    <line x1="160" y1="68" x2="160" y2="46" stroke="${LEAD}" stroke-width="1.8"/>
    <path d="M 160 40 l -4 8 l 8 0 z" fill="${LEAD}"/>
    <line x1="148" y1="68" x2="138" y2="50" stroke="${LEAD}" stroke-width="1.8"/>
    <path d="M 135 45 l 0 9 l 7 -4 z" fill="${LEAD}"/>
    <line x1="172" y1="68" x2="182" y2="50" stroke="${LEAD}" stroke-width="1.8"/>
    <path d="M 185 45 l -7 5 l 7 4 z" fill="${LEAD}"/>
    ${stopclock(390, 140, 34)}
    <line x1="194" y1="84" x2="176" y2="86" stroke="${LEAD}" stroke-width="1.2" class="lbl"/>
    <line x1="102" y1="170" x2="138" y2="212" stroke="${LEAD}" stroke-width="1.2" class="lbl"/>
    <line x1="224" y1="196" x2="198" y2="200" stroke="${LEAD}" stroke-width="1.2" class="lbl"/>
    <text x="160" y="269" font-family="${MONO}" font-size="15" font-weight="700" fill="#86efac" text-anchor="middle">151.26 g</text>
    <text x="196" y="40" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">carbon dioxide escapes</text>
    <text x="196" y="88" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">cotton wool plug</text>
    <text x="100" y="168" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="end">marble chips</text>
    <text x="226" y="200" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">dilute hydrochloric acid</text>
    <text x="390" y="86" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="middle">stopclock</text>
    <text x="160" y="308" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="middle">balance</text>
    <text x="272" y="268" font-family="${FONT}" font-size="10.5" fill="${LEAD}">the reading falls as gas escapes</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · The results table for RUN (one run of the magnesium experiment). The
//     three 60s are shaded: the volume has stopped changing, so it is over.
// ───────────────────────────────────────────────────────────────────────────
const RESULTS_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 130" class="w-full h-full">
    ${plate(480, 130)}
    <rect x="10" y="34" width="460" height="80" fill="#ffffff" stroke="${GLASS}" stroke-width="1.5"/>
    <rect x="10" y="34" width="172" height="80" fill="#eef2ff" stroke="${GLASS}" stroke-width="1.5"/>
    <rect x="374" y="74" width="96" height="40" fill="#f1f5f9"/>
    <line x1="10" y1="74" x2="470" y2="74" stroke="${GLASS}" stroke-width="1.5"/>
    <line x1="214" y1="34" x2="214" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="246" y1="34" x2="246" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="278" y1="34" x2="278" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="310" y1="34" x2="310" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="342" y1="34" x2="342" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="374" y1="34" x2="374" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="406" y1="34" x2="406" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="438" y1="34" x2="438" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <text x="240" y="22" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Magnesium ribbon + excess dilute hydrochloric acid</text>
    <text x="96" y="59" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${INK}" text-anchor="middle">Time / min</text>
    <text x="96" y="99" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${INK}" text-anchor="middle">Volume of hydrogen / cm³</text>
    <text x="198" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">0</text>
    <text x="230" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">1</text>
    <text x="262" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">2</text>
    <text x="294" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">3</text>
    <text x="326" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">4</text>
    <text x="358" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">5</text>
    <text x="390" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">6</text>
    <text x="422" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">7</text>
    <text x="454" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">8</text>
    <text x="198" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">0</text>
    <text x="230" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">20</text>
    <text x="262" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">34</text>
    <text x="294" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">45</text>
    <text x="326" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">53</text>
    <text x="358" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">58</text>
    <text x="390" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">60</text>
    <text x="422" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">60</text>
    <text x="454" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE}" text-anchor="middle">60</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The volume–time curve for RUN, on a real grid.
//     x = 60 + 43·t, y = 270 − 3.2·V. Points: (60,270) (103,206) (146,161.2)
//     (189,126) (232,100.4) (275,84.4) (318,78) (361,78) (404,78).
//     Off-point read used by the deck's estimate: at t = 1.5 min the curve is
//     at V ≈ 27.6 cm³ (Hermite value on the segment 1→2 min, slopes 17 and 12.5).
// ───────────────────────────────────────────────────────────────────────────
const RATE_CURVE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" class="w-full h-full">
    ${plate(440, 320)}
    ${grid(60, 270, 344, 224, 21.5, 16, 2)}
    ${axes(60, 270, 344, 224)}
    <path d="${curvePath(RUN_PX)}" fill="none" stroke="${CURVE}" stroke-width="2.8" stroke-linecap="round"/>
    ${dots(RUN_PX, CURVE)}
    <text x="232" y="24" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Hydrogen collected in the gas syringe</text>
    <text x="60" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">0</text>
    <text x="103" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">1</text>
    <text x="146" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">2</text>
    <text x="189" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">3</text>
    <text x="232" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">4</text>
    <text x="275" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">5</text>
    <text x="318" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">6</text>
    <text x="361" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">7</text>
    <text x="404" y="288" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">8</text>
    <text x="52" y="274" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">0</text>
    <text x="52" y="242" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">10</text>
    <text x="52" y="210" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">20</text>
    <text x="52" y="178" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">30</text>
    <text x="52" y="146" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">40</text>
    <text x="52" y="114" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">50</text>
    <text x="52" y="82" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">60</text>
    <text x="52" y="50" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">70</text>
    <text x="232" y="310" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Time / min</text>
    <text x="-158" y="18" transform="rotate(-90)" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Volume of hydrogen / cm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · The three parts of the curve (book 9.2): steepest = fastest, less steep =
//     slower, flat = over. Same RUN shape, no numbers: x = 50 + 45·t,
//     y = 250 − 3·V. Leader ends sit ON the curve: t = 0.5 → (72.5, 218.9),
//     t = 3.5 → (207.5, 101.9); the flat run is y = 70 from x = 320.
// ───────────────────────────────────────────────────────────────────────────
const CURVE_THREE_PARTS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 300" class="w-full h-full">
    ${plate(440, 300)}
    ${axes(50, 250, 364, 196)}
    <path d="${curvePath(THREE_PX)}" fill="none" stroke="${CURVE}" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="250" x2="95" y2="190" stroke="${STEEP}" stroke-width="7" stroke-linecap="round" opacity="0.28"/>
    <line x1="320" y1="70" x2="410" y2="70" stroke="${FLAT}" stroke-width="7" stroke-linecap="round" opacity="0.28"/>
    <line x1="96" y1="228" x2="74" y2="220" stroke="${STEEP}" stroke-width="1.4" class="lbl"/>
    <circle cx="72.5" cy="218.9" r="3" fill="${STEEP}" class="lbl"/>
    <line x1="216" y1="139" x2="209" y2="104" stroke="${MID}" stroke-width="1.4" class="lbl"/>
    <circle cx="207.5" cy="101.9" r="3" fill="${MID}" class="lbl"/>
    <line x1="320" y1="70" x2="320" y2="250" stroke="${FLAT}" stroke-width="1.2" stroke-dasharray="4 4"/>
    <text x="100" y="232" font-family="${FONT}" font-size="12" font-weight="700" fill="${STEEP}">steepest: fastest</text>
    <text x="196" y="152" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${MID}">less steep: slower</text>
    <text x="365" y="54" font-family="${FONT}" font-size="12" font-weight="700" fill="${FLAT}" text-anchor="middle">flat: reaction over</text>
    <text x="326" y="200" font-family="${FONT}" font-size="10.5" fill="${LEAD}">no more gas</text>
    <text x="235" y="272" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Time</text>
    <text x="-150" y="30" transform="rotate(-90)" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Volume of gas</text>
    <text x="230" y="292" font-family="${FONT}" font-size="11" fill="${LEAD}" text-anchor="middle">The faster the reaction, the steeper the curve.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Two metals, A and B (Source Analysis): the same mass of each in excess
//     acid. A is steeper at the start and flat from 4 min at 40 cm³; B is
//     flat from 8 min at 48 cm³. x = 60 + 34.4·t, y = 280 − 4·V.
// ───────────────────────────────────────────────────────────────────────────
const TWO_METALS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 330" class="w-full h-full">
    ${plate(440, 330)}
    ${grid(60, 280, 344, 240, 34.4, 20, 2)}
    ${axes(60, 280, 344, 240)}
    <path d="${curvePath(B_PX)}" fill="none" stroke="${CURVE_B}" stroke-width="2.8" stroke-linecap="round" stroke-dasharray="8 4"/>
    <path d="${curvePath(A_PX)}" fill="none" stroke="${CURVE}" stroke-width="2.8" stroke-linecap="round"/>
    <text x="232" y="22" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Same mass of two metals, excess acid</text>
    <text x="412" y="125" font-family="${FONT}" font-size="15" font-weight="700" fill="${CURVE}">A</text>
    <text x="412" y="93" font-family="${FONT}" font-size="15" font-weight="700" fill="${CURVE_B}">B</text>
    <text x="60" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">0</text>
    <text x="94.4" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">1</text>
    <text x="128.8" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">2</text>
    <text x="163.2" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">3</text>
    <text x="197.6" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">4</text>
    <text x="232" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">5</text>
    <text x="266.4" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">6</text>
    <text x="300.8" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">7</text>
    <text x="335.2" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">8</text>
    <text x="369.6" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">9</text>
    <text x="404" y="298" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="middle">10</text>
    <text x="52" y="284" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">0</text>
    <text x="52" y="244" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">10</text>
    <text x="52" y="204" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">20</text>
    <text x="52" y="164" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">30</text>
    <text x="52" y="124" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">40</text>
    <text x="52" y="84" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">50</text>
    <text x="52" y="44" font-family="${MONO}" font-size="11" fill="${INK}" text-anchor="end">60</text>
    <text x="232" y="320" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Time / min</text>
    <text x="-160" y="18" transform="rotate(-90)" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Volume of hydrogen / cm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · A results table for the Practice set: zinc granules + excess dilute
//     sulfuric acid. Per-minute volumes 16, 12, 9, 6, 3, 2, 0 — over at 6 min,
//     48 cm³ in all, average 48 ÷ 6 = 8 cm³/min. No graph: the workbook works
//     from the table, and the Rate Reader task does the graph reading.
// ───────────────────────────────────────────────────────────────────────────
const WB_ZINC_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 130" class="w-full h-full">
    ${plate(480, 130)}
    <rect x="10" y="34" width="460" height="80" fill="#ffffff" stroke="${GLASS}" stroke-width="1.5"/>
    <rect x="10" y="34" width="172" height="80" fill="#ecfdf5" stroke="${GLASS}" stroke-width="1.5"/>
    <line x1="10" y1="74" x2="470" y2="74" stroke="${GLASS}" stroke-width="1.5"/>
    <line x1="214" y1="34" x2="214" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="246" y1="34" x2="246" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="278" y1="34" x2="278" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="310" y1="34" x2="310" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="342" y1="34" x2="342" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="374" y1="34" x2="374" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="406" y1="34" x2="406" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <line x1="438" y1="34" x2="438" y2="114" stroke="${GRID_MAJOR}" stroke-width="1"/>
    <text x="240" y="22" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Zinc granules + excess dilute sulfuric acid</text>
    <text x="96" y="59" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${INK}" text-anchor="middle">Time / min</text>
    <text x="96" y="99" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${INK}" text-anchor="middle">Volume of hydrogen / cm³</text>
    <text x="198" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">0</text>
    <text x="230" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">1</text>
    <text x="262" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">2</text>
    <text x="294" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">3</text>
    <text x="326" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">4</text>
    <text x="358" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">5</text>
    <text x="390" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">6</text>
    <text x="422" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">7</text>
    <text x="454" y="59" font-family="${MONO}" font-size="13" fill="${INK}" text-anchor="middle">8</text>
    <text x="198" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">0</text>
    <text x="230" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">16</text>
    <text x="262" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">28</text>
    <text x="294" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">37</text>
    <text x="326" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">43</text>
    <text x="358" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">46</text>
    <text x="390" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">48</text>
    <text x="422" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">48</text>
    <text x="454" y="99" font-family="${MONO}" font-size="13" font-weight="700" fill="${CURVE_B}" text-anchor="middle">48</text>
  </svg>`

export const DIAGRAMS = {
  GAS_SYRINGE_RIG: GAS_SYRINGE_RIG,
  SYRINGE_READINGS: SYRINGE_READINGS,
  MASS_LOSS_RIG: MASS_LOSS_RIG,
  RESULTS_TABLE: RESULTS_TABLE,
  RATE_CURVE: RATE_CURVE,
  CURVE_THREE_PARTS: CURVE_THREE_PARTS,
  TWO_METALS: TWO_METALS,
  WB_ZINC_TABLE: WB_ZINC_TABLE,
}
