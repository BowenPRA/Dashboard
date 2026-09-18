// content/y7-science/U01_1/diagrams.js
// Teaching diagrams for 1.1 Cells, drawn to match the Cambridge Lower Secondary
// Learner's Book: flat line art on paper-white, a thin ink outline on every
// shape, pale flat fills, and key words set in the book's orange sitting in the
// margin on a hairline leader line.
//
// House rules:
//  · every diagram opens with a white plate, so artwork is legible on a light
//    OR dark slide and never depends on the page's text colour;
//  · label <text> is written out literally (not built by a helper) so
//    `npm run audit:svg` can actually measure it — anything interpolated is
//    invisible to the audit;
//  · label text lives in the margins, never on top of the drawing.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'

// Shape palette, sampled from the Learner's Book figures.
const WALL_F = '#f9dcc4', WALL_S = '#e07b39'
const CYTO_F = '#eaf0f8', MEMB_S = '#8fa6c4'
const VAC_F = '#dbeafe', VAC_S = '#7ba7d4'
const NUC_F = '#9b7fc4', NUC_S = '#6f52a0'
const CHL_F = '#5aab4e', CHL_S = '#3a7d31'
const AMEM_S = '#c2185b'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from the label to the thing, ending in a small dot. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>
    <circle class="lbl" cx="${x2}" cy="${y2}" r="3.2" fill="${LEAD}"/>`

/** A chloroplast: green oval with two darker grana bands. */
const chloro = (x, y, vertical = true) => {
  const [rx, ry] = vertical ? [12, 19] : [19, 12]
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${CHL_F}" stroke="${CHL_S}" stroke-width="2"/>
    <line x1="${x - rx * 0.45}" y1="${y - ry * 0.3}" x2="${x + rx * 0.45}" y2="${y - ry * 0.3}" stroke="${CHL_S}" stroke-width="1.6"/>
    <line x1="${x - rx * 0.45}" y1="${y + ry * 0.25}" x2="${x + rx * 0.45}" y2="${y + ry * 0.25}" stroke="${CHL_S}" stroke-width="1.6"/>`
}

/** A mitochondrion: white oval with the folded inner membrane drawn in. */
const mito = (x, y, rx = 14, ry = 9) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <path d="M ${x - rx + 3} ${y} q ${(rx - 3) / 2} -${ry} ${rx - 3} 0 q ${(rx - 3) / 2} ${ry} ${rx - 3} 0" fill="none" stroke="${INK}" stroke-width="1.5"/>`

/** A mitochondrion turned `deg` degrees, so a cell's few do not all lie flat. */
const mitoR = (x, y, rx, ry, deg) => `<g transform="rotate(${deg} ${x} ${y})">${mito(x, y, rx, ry)}</g>`

/**
 * A soft, slightly irregular closed outline round (cx, cy) — a real cell is
 * never a perfect ellipse. `wob` nudges the radius at evenly spaced angles; the
 * points are joined with a closed Catmull-Rom curve.
 */
const blob = (cx, cy, rx, ry, wob) => {
  const n = wob.length
  const p = wob.map((w, i) => {
    const a = (2 * Math.PI * i) / n
    return [cx + rx * (1 + w) * Math.cos(a), cy + ry * (1 + w) * Math.sin(a)]
  })
  const r = (v) => Math.round(v * 10) / 10
  let d = `M ${r(p[0][0])} ${r(p[0][1])}`
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [p[(i - 1 + n) % n], p[i], p[(i + 1) % n], p[(i + 2) % n]]
    d += ` C ${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)}, ${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)}, ${r(p2[0])} ${r(p2[1])}`
  }
  return `${d} Z`
}

/** Ribosome specks: tiny dots scattered through the cytoplasm. */
const specks = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#9fb0c6"/>`).join('')

// ───────────────────────────────────────────────────────────────────────────
// Small "where is it?" isolates for the organelle gallery cards. The whole
// cell is drawn ghost-grey and only the named part is inked in, so students
// see what the part is AND where it sits. No text — the card supplies it.
// ───────────────────────────────────────────────────────────────────────────
const G_F = '#f1f5f9', G_S = '#cbd5e1'
// Cytoplasm is a region, not an object: highlighting it means washing the whole
// interior in teal. The ordinary cytoplasm fill is far too close to the ghost
// grey to read as "this one is selected".
const CYTO_HI = '#c9e3ec'
const pick = (on, colour, ghost = G_S) => (on ? colour : ghost)
const pickF = (on, colour) => (on ? colour : G_F)
const halo = (on, shape) => (on ? shape : '')

/** 240×180 plant cell with one part highlighted. */
const plantIsolate = (part) => {
  const is = (p) => part === p
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" class="w-full h-full">
    ${plate(240, 180)}
    ${halo(is('wall'), `<rect x="63" y="11" width="114" height="158" rx="22" fill="#fdf1e3"/>`)}
    <rect x="70" y="18" width="100" height="144" rx="17" fill="${pickF(is('wall'), WALL_F)}" stroke="${pick(is('wall'), WALL_S)}" stroke-width="${is('wall') ? 5 : 2.5}"/>
    <rect x="77" y="25" width="86" height="130" rx="12" fill="${pickF(is('cytoplasm'), CYTO_HI)}" stroke="${pick(is('membrane'), MEMB_S)}" stroke-width="${is('membrane') ? 4.5 : 2}"/>
    <rect x="97" y="45" width="46" height="90" rx="17" fill="${pickF(is('vacuole'), VAC_F)}" stroke="${pick(is('vacuole'), VAC_S)}" stroke-width="${is('vacuole') ? 4 : 2}"/>
    ${is('chloroplast')
      ? [[88, 52], [88, 88], [152, 52], [152, 92], [152, 128]].map(([x, y]) => chloro(x, y)).join('')
      : [[88, 52], [88, 88], [152, 52], [152, 92], [152, 128]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="14" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>`).join('')}
    ${is('nucleus')
      ? `<ellipse cx="90" cy="127" rx="15" ry="19" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="3"/>`
      : `<ellipse cx="90" cy="127" rx="13" ry="17" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>`}
    ${is('mitochondria')
      ? mito(120, 148, 15, 9)
      : `<ellipse cx="120" cy="148" rx="13" ry="8" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>`}
  </svg>`
}

/** 240×180 animal cell with one part highlighted. */
const animalIsolate = (part) => {
  const is = (p) => part === p
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" class="w-full h-full">
    ${plate(240, 180)}
    <ellipse cx="120" cy="92" rx="92" ry="66" fill="${pickF(is('cytoplasm'), CYTO_HI)}" stroke="${pick(is('membrane'), AMEM_S)}" stroke-width="${is('membrane') ? 5 : 2.5}"/>
    ${is('nucleus')
      ? `<circle cx="128" cy="84" r="27" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="3"/><circle cx="136" cy="76" r="8" fill="${NUC_S}"/>`
      : `<circle cx="128" cy="84" r="25" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>`}
    ${[[62, 122], [180, 52], [176, 118]].map(([x, y]) => (is('mitochondria')
      ? mito(x, y, 16, 10)
      : `<ellipse cx="${x}" cy="${y}" rx="14" ry="9" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>`)).join('')}
  </svg>`
}

export const DIAGRAMS = {
  // ─────────────────────────────────────────────────────────────────────────
  // The plant cell, drawn the way the Learner's Book draws it: a tall rounded
  // box, orange wall, thin membrane inside it, one big central sap vacuole,
  // the nucleus pushed to one side, chloroplasts round the edge.
  // ─────────────────────────────────────────────────────────────────────────
  PLANT_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 470" class="w-full h-full">
    <rect x="0" y="0" width="760" height="470" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="758.5" height="468.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="293" y="33" width="184" height="404" rx="40" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="5"/>
    <rect x="310" y="50" width="150" height="370" rx="26" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2.5"/>
    <rect x="346" y="86" width="78" height="286" rx="32" fill="${VAC_F}" stroke="${VAC_S}" stroke-width="2.5"/>
    ${chloro(327, 105)}${chloro(327, 390)}
    ${chloro(443, 105)}${chloro(443, 200)}${chloro(443, 330)}${chloro(443, 392)}
    ${chloro(385, 405, false)}
    ${mito(327, 185)}${mito(443, 262)}
    <ellipse cx="336" cy="300" rx="23" ry="33" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    ${lead(113, 67, 299, 72)}
    ${lead(152, 155, 309, 158)}
    ${lead(113, 245, 330, 242)}
    ${lead(94, 345, 315, 318)}
    ${lead(629, 100, 426, 130)}
    ${lead(629, 205, 457, 202)}
    ${lead(610, 305, 458, 266)}

    <text x="16" y="72" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cell wall</text>
    <text x="16" y="160" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cell membrane</text>
    <text x="16" y="250" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cytoplasm</text>
    <text x="16" y="350" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">nucleus</text>
    <text x="744" y="105" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">sap vacuole</text>
    <text x="744" y="210" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">chloroplast</text>
    <text x="744" y="310" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">mitochondrion</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // The animal cell — same house style, so the two sit side by side cleanly.
  // No wall, no chloroplasts, no big vacuole: that is the whole point.
  // ─────────────────────────────────────────────────────────────────────────
  ANIMAL_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" class="w-full h-full">
    <rect x="0" y="0" width="760" height="430" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="758.5" height="428.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <path d="${blob(380, 215, 185, 140, [0.02, -0.02, 0.035, 0, -0.03, 0.025, 0.01, -0.025, 0.03, -0.01, 0.02, -0.03])}" fill="${CYTO_F}" stroke="${AMEM_S}" stroke-width="4"/>
    ${specks([[250, 200], [232, 245], [330, 172], [352, 250], [318, 318], [365, 330], [420, 300], [455, 240], [540, 215], [522, 175], [455, 108], [360, 105], [262, 168], [280, 262], [505, 300], [400, 268]])}
    <circle cx="340" cy="210" r="8" fill="#ffffff" stroke="${MEMB_S}" stroke-width="1.8"/>
    <circle cx="540" cy="250" r="7" fill="#ffffff" stroke="${MEMB_S}" stroke-width="1.8"/>
    <ellipse cx="405" cy="188" rx="52" ry="46" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="3"/>
    <circle cx="420" cy="174" r="15" fill="${NUC_S}"/>
    <circle cx="382" cy="200" r="3" fill="${NUC_S}"/><circle cx="398" cy="214" r="2.5" fill="${NUC_S}"/><circle cx="430" cy="206" r="2.5" fill="${NUC_S}"/>
    ${mitoR(272, 300, 20, 12, -18)}${mitoR(500, 130, 19, 11, 14)}${mitoR(300, 130, 17, 10, -8)}${mitoR(455, 325, 18, 11, 22)}

    ${lead(152, 108, 231, 132)}
    ${lead(152, 320, 256, 303)}
    ${lead(629, 130, 455, 175)}
    ${lead(649, 315, 478, 292)}

    <text x="16" y="113" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cell membrane</text>
    <text x="16" y="325" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">mitochondrion</text>
    <text x="744" y="135" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">nucleus</text>
    <text x="744" y="320" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">cytoplasm</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // How small is a cell? A scale strip from a person down to a virus, so the
  // soda-can magnification has something to land against.
  // ─────────────────────────────────────────────────────────────────────────
  SCALE_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 250" class="w-full h-full">
    <rect x="0" y="0" width="760" height="250" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="758.5" height="248.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <defs><marker id="sl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker></defs>
    <line x1="60" y1="160" x2="706" y2="160" stroke="${INK}" stroke-width="2.5" marker-end="url(#sl-arrow)"/>

    <line x1="120" y1="150" x2="120" y2="170" stroke="${INK}" stroke-width="2.5"/>
    <line x1="300" y1="150" x2="300" y2="170" stroke="${INK}" stroke-width="2.5"/>
    <line x1="480" y1="150" x2="480" y2="170" stroke="${INK}" stroke-width="2.5"/>
    <line x1="655" y1="150" x2="655" y2="170" stroke="${INK}" stroke-width="2.5"/>

    <circle cx="120" cy="86" r="11" fill="${CYTO_F}" stroke="${INK}" stroke-width="2"/>
    <path d="M 120 98 L 120 126 M 108 108 L 132 108 M 120 126 L 110 142 M 120 126 L 130 142" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 288 128 q 12 -46 24 -2" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="480" cy="112" rx="26" ry="19" fill="${CHL_F}" stroke="${CHL_S}" stroke-width="2.5"/>
    <circle cx="480" cy="112" r="7" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="1.5"/>
    <circle cx="655" cy="116" r="12" fill="${VAC_F}" stroke="${VAC_S}" stroke-width="2.5"/>
    <path d="M 655 104 L 655 98 M 655 128 L 655 134 M 643 116 L 637 116 M 667 116 L 673 116" stroke="${VAC_S}" stroke-width="2" stroke-linecap="round"/>

    <text x="120" y="196" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">you</text>
    <text x="120" y="218" font-family="${FONT}" font-size="15" font-weight="normal" fill="${KEY}" text-anchor="middle">1700 mm</text>
    <text x="300" y="196" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">a hair</text>
    <text x="300" y="218" font-family="${FONT}" font-size="15" font-weight="normal" fill="${KEY}" text-anchor="middle">0.07 mm</text>
    <text x="480" y="196" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">a cell</text>
    <text x="480" y="218" font-family="${FONT}" font-size="15" font-weight="normal" fill="${KEY}" text-anchor="middle">0.02 mm</text>
    <text x="655" y="196" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">a virus</text>
    <text x="655" y="218" font-family="${FONT}" font-size="15" font-weight="normal" fill="${KEY}" text-anchor="middle">0.0001 mm</text>

    <text x="60" y="52" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="start">big enough to see</text>
    <text x="700" y="52" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end">far too small to see</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // Etymology: a monk's bare "cella" beside the rows of cork cells that
  // reminded Robert Hooke of it.
  // ─────────────────────────────────────────────────────────────────────────
  TINY_ROOM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 260" class="w-full h-full">
    <rect x="0" y="0" width="560" height="260" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="558.5" height="258.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="40" y="28" width="180" height="22" rx="4" fill="#5c2483"/>
    <text x="130" y="45" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">cella</text>
    <rect x="40" y="50" width="180" height="148" fill="#f6f2fa" stroke="#5c2483" stroke-width="2.5"/>
    <rect x="62" y="82" width="40" height="34" rx="3" fill="#ffffff" stroke="#5c2483" stroke-width="2"/>
    <line x1="82" y1="82" x2="82" y2="116" stroke="#5c2483" stroke-width="1.5"/>
    <line x1="62" y1="99" x2="102" y2="99" stroke="#5c2483" stroke-width="1.5"/>
    <rect x="140" y="140" width="62" height="42" rx="4" fill="#ede4f3" stroke="#5c2483" stroke-width="2"/>
    <rect x="140" y="132" width="24" height="14" rx="3" fill="#ffffff" stroke="#5c2483" stroke-width="2"/>
    <text x="130" y="232" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">a monk's little room</text>

    <text x="270" y="132" font-family="${FONT}" font-size="30" font-weight="bold" fill="#94a3b8" text-anchor="middle">≈</text>

    <rect x="320" y="48" width="70" height="68" rx="6" fill="#f2f8ee" stroke="${CHL_S}" stroke-width="2.5"/>
    <rect x="395" y="48" width="70" height="68" rx="6" fill="#f2f8ee" stroke="${CHL_S}" stroke-width="2.5"/>
    <rect x="470" y="48" width="70" height="68" rx="6" fill="#f2f8ee" stroke="${CHL_S}" stroke-width="2.5"/>
    <rect x="320" y="122" width="70" height="68" rx="6" fill="#f2f8ee" stroke="${CHL_S}" stroke-width="2.5"/>
    <rect x="395" y="122" width="70" height="68" rx="6" fill="#f2f8ee" stroke="${CHL_S}" stroke-width="2.5"/>
    <rect x="470" y="122" width="70" height="68" rx="6" fill="#f2f8ee" stroke="${CHL_S}" stroke-width="2.5"/>
    <text x="430" y="232" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">rows of cork cells</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // How a microscope magnifies: light goes up through the specimen and two
  // curved lenses bend it, so a much bigger image reaches your eye.
  // ─────────────────────────────────────────────────────────────────────────
  MICROSCOPE_LIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340" class="w-full h-full">
    <rect x="0" y="0" width="560" height="340" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="558.5" height="338.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <!-- orient="auto" rotates the marker onto the line's direction, so the
         triangle must point along +x here, not up, or it lands sideways. -->
    <defs><marker id="mi-up" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#e0a03a"/></marker></defs>

    <circle cx="170" cy="294" r="15" fill="#fde9c8" stroke="#e0a03a" stroke-width="2.5"/>
    <path d="M 155 285 L 149 282 M 185 285 L 191 282 M 155 303 L 149 306 M 185 303 L 191 306" stroke="#e0a03a" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="170" y1="276" x2="170" y2="256" stroke="#e0a03a" stroke-width="3" marker-end="url(#mi-up)"/>

    <rect x="112" y="226" width="116" height="16" rx="3" fill="#eaf3f7" stroke="#7ba7d4" stroke-width="2"/>
    <ellipse cx="170" cy="234" rx="9" ry="5" fill="${CHL_F}" stroke="${CHL_S}" stroke-width="1.5"/>
    <line x1="170" y1="222" x2="170" y2="196" stroke="#e0a03a" stroke-width="3" marker-end="url(#mi-up)"/>

    <path d="M 118 186 q 52 -22 104 0 q -52 22 -104 0 z" fill="#dceaf7" stroke="#4a7fb5" stroke-width="2.5"/>
    <line x1="170" y1="174" x2="170" y2="126" stroke="#e0a03a" stroke-width="3" marker-end="url(#mi-up)"/>

    <path d="M 126 116 q 44 -20 88 0 q -44 20 -88 0 z" fill="#dceaf7" stroke="#4a7fb5" stroke-width="2.5"/>
    <line x1="170" y1="104" x2="170" y2="70" stroke="#e0a03a" stroke-width="3" marker-end="url(#mi-up)"/>

    <path d="M 140 52 q 30 -26 60 0 q -30 26 -60 0 z" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="170" cy="52" r="9" fill="${INK}"/>

    ${lead(460, 47, 208, 50)}
    ${lead(415, 111, 216, 114)}
    ${lead(406, 181, 224, 184)}
    ${lead(425, 231, 230, 234)}
    ${lead(425, 292, 187, 294)}

    <text x="544" y="52" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">your eye</text>
    <text x="544" y="116" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">eyepiece lens</text>
    <text x="544" y="186" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">objective lens</text>
    <text x="544" y="236" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">the specimen</text>
    <text x="544" y="297" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">light source</text>
    <text x="16" y="332" font-family="${FONT}" font-size="15" font-weight="normal" fill="${INK}" text-anchor="start">Light travels up. Each lens bends it, so the image grows.</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // A real school light microscope, side on — the one a student labels in an
  // exam. The ray diagram above explains HOW it magnifies; this one is WHAT
  // it looks like. The arm is on the left, so every leader but two runs out
  // to the right without crossing it.
  // ─────────────────────────────────────────────────────────────────────────
  MICROSCOPE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 440" class="w-full h-full">
    <rect x="0" y="0" width="680" height="440" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="678.5" height="438.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="205" y="394" width="280" height="24" rx="12" fill="#cbd5e1" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 236 394 L 236 250 Q 236 150 300 124 L 356 114 L 356 158 L 306 166 Q 272 178 272 250 L 272 394 Z" fill="#dbe3ec" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

    <path d="M 361 352 L 357 314 L 383 314 L 379 352 Z" fill="#fef3c7"/>
    <rect x="340" y="366" width="60" height="28" rx="6" fill="#e2e8f0" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="370" cy="362" r="12" fill="#fde68a" stroke="#d97706" stroke-width="2.5"/>
    <path d="M 356 348 L 349 340 M 384 348 L 391 340 M 370 345 L 370 334" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>

    <rect x="272" y="300" width="196" height="14" rx="3" fill="#94a3b8" stroke="${INK}" stroke-width="2.5"/>
    <rect x="322" y="292" width="100" height="8" rx="1.5" fill="#e0f2fe" stroke="#60a5fa" stroke-width="2"/>
    <ellipse cx="370" cy="296" rx="13" ry="3" fill="#c084fc" stroke="#7e22ce" stroke-width="1.2"/>

    <rect x="355" y="100" width="30" height="106" rx="3" fill="#eef2f7" stroke="${INK}" stroke-width="2.5"/>
    <rect x="360" y="56" width="20" height="46" rx="3" fill="#dbe3ec" stroke="${INK}" stroke-width="2.5"/>
    <ellipse cx="370" cy="56" rx="11" ry="4" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>

    <g transform="rotate(26 342 222)"><rect x="334" y="222" width="16" height="30" rx="2" fill="#cbd5e1" stroke="${INK}" stroke-width="2"/></g>
    <path d="M 340 206 L 400 206 L 408 222 L 332 222 Z" fill="#94a3b8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="360" y="222" width="20" height="42" rx="2" fill="#cbd5e1" stroke="${INK}" stroke-width="2.5"/>
    <rect x="363" y="262" width="14" height="10" rx="2" fill="#64748b" stroke="${INK}" stroke-width="2"/>
    <ellipse cx="370" cy="273" rx="6" ry="2.2" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>

    <circle cx="254" cy="236" r="24" fill="#64748b" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="254" cy="236" r="9" fill="#cbd5e1" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="254" cy="284" r="13" fill="#64748b" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="254" cy="284" r="5" fill="#cbd5e1" stroke="${INK}" stroke-width="1.2"/>

    ${lead(205, 60, 359, 56)}
    ${lead(205, 236, 240, 236)}
    ${lead(490, 230, 381, 240)}
    ${lead(490, 282, 383, 295)}
    ${lead(490, 330, 455, 307)}
    ${lead(490, 375, 382, 363)}

    <text x="196" y="65" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">eyepiece lens</text>
    <text x="196" y="241" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">focusing knob</text>
    <text x="499" y="235" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">objective lens</text>
    <text x="499" y="287" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">the specimen</text>
    <text x="499" y="335" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">stage</text>
    <text x="499" y="380" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">light source</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // The bonus organelle: the endoplasmic reticulum wrapping the nucleus, with
  // cargo moving along it — the cell's motorway.
  // ─────────────────────────────────────────────────────────────────────────
  ER_HIGHWAY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full">
    <rect x="0" y="0" width="560" height="300" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="558.5" height="298.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <ellipse cx="240" cy="160" rx="150" ry="105" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2.5"/>
    <circle cx="190" cy="160" r="42" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    <path d="M 238 114 C 285 96, 330 106, 366 124" fill="none" stroke="#e4d5f2" stroke-width="13" stroke-linecap="round"/>
    <path d="M 240 158 C 292 148, 338 160, 372 178" fill="none" stroke="#e4d5f2" stroke-width="13" stroke-linecap="round"/>
    <path d="M 236 198 C 284 196, 326 208, 352 220" fill="none" stroke="#e4d5f2" stroke-width="13" stroke-linecap="round"/>
    <path d="M 238 114 C 285 96, 330 106, 366 124" fill="none" stroke="#8a63b8" stroke-width="2.5"/>
    <path d="M 240 158 C 292 148, 338 160, 372 178" fill="none" stroke="#8a63b8" stroke-width="2.5"/>
    <path d="M 236 198 C 284 196, 326 208, 352 220" fill="none" stroke="#8a63b8" stroke-width="2.5"/>

    <circle cx="286" cy="104" r="4.5" fill="${KEY}"/>
    <circle cx="330" cy="112" r="4.5" fill="${KEY}"/>
    <circle cx="292" cy="152" r="4.5" fill="${KEY}"/>
    <circle cx="340" cy="164" r="4.5" fill="${KEY}"/>
    <circle cx="284" cy="199" r="4.5" fill="${KEY}"/>
    <circle cx="330" cy="212" r="4.5" fill="${KEY}"/>

    ${lead(88, 88, 160, 130)}
    ${lead(430, 66, 360, 118)}
    ${lead(430, 274, 338, 214)}

    <text x="16" y="92" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">nucleus</text>
    <text x="544" y="62" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">endoplasmic reticulum</text>
    <text x="544" y="280" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">proteins on the move</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // Models have limitations: a cardboard-box model beside the living thing it
  // stands for. Feeds the "what is your model missing?" discussion.
  // ─────────────────────────────────────────────────────────────────────────
  MODEL_LIMITS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280" class="w-full h-full">
    <rect x="0" y="0" width="560" height="280" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="558.5" height="278.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <path d="M 60 96 L 130 68 L 220 68 L 220 190 L 130 218 L 60 190 z" fill="#f2e0c9" stroke="#b07d42" stroke-width="2.5"/>
    <path d="M 60 96 L 130 124 L 220 124 M 130 124 L 130 218" fill="none" stroke="#b07d42" stroke-width="2.5"/>
    <circle cx="106" cy="166" r="14" fill="#d8c3a5" stroke="#b07d42" stroke-width="2"/>
    <text x="140" y="248" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">a model of a cell</text>

    <text x="280" y="146" font-family="${FONT}" font-size="30" font-weight="bold" fill="#94a3b8" text-anchor="middle">≠</text>

    <rect x="342" y="68" width="150" height="150" rx="26" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="351" y="77" width="132" height="132" rx="20" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2"/>
    <rect x="382" y="104" width="70" height="80" rx="20" fill="${VAC_F}" stroke="${VAC_S}" stroke-width="2"/>
    ${chloro(367, 105)}${chloro(367, 168)}${chloro(467, 110)}${chloro(467, 172)}
    <ellipse cx="415" cy="196" rx="17" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <text x="417" y="248" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">a real living cell</text>

    <text x="280" y="36" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="middle">What is the model missing?</text>
  </svg>`,

  // ── Gallery isolates: the four every cell has ────────────────────────────
  ORG_MEMBRANE: animalIsolate('membrane'),
  ORG_CYTOPLASM: animalIsolate('cytoplasm'),
  ORG_NUCLEUS: animalIsolate('nucleus'),
  ORG_MITOCHONDRIA: animalIsolate('mitochondria'),

  // ── Gallery isolates: the plant-only extras ──────────────────────────────
  ORG_WALL: plantIsolate('wall'),
  ORG_VACUOLE: plantIsolate('vacuole'),
  ORG_CHLOROPLAST: plantIsolate('chloroplast'),

  /** Cellulose: zoom into the wall to show the woven fibres it is made of. */
  ORG_CELLULOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" class="w-full h-full">
    <rect x="0" y="0" width="240" height="180" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="238.5" height="178.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="30" y="46" width="180" height="88" rx="10" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="3"/>
    <path d="M 40 62 q 22 -12 44 0 q 22 12 44 0 q 22 -12 44 0 q 12 6 26 2" fill="none" stroke="${WALL_S}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 40 90 q 22 -12 44 0 q 22 12 44 0 q 22 -12 44 0 q 12 6 26 2" fill="none" stroke="${WALL_S}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 40 118 q 22 -12 44 0 q 22 12 44 0 q 22 -12 44 0 q 12 6 26 2" fill="none" stroke="${WALL_S}" stroke-width="3" stroke-linecap="round"/>
    <line x1="70" y1="48" x2="70" y2="132" stroke="#b0703a" stroke-width="2.5" opacity="0.55"/>
    <line x1="120" y1="48" x2="120" y2="132" stroke="#b0703a" stroke-width="2.5" opacity="0.55"/>
    <line x1="170" y1="48" x2="170" y2="132" stroke="#b0703a" stroke-width="2.5" opacity="0.55"/>
  </svg>`,

  /** Chlorophyll: one chloroplast opened up, green pigment catching sunlight. */
  ORG_CHLOROPHYLL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" class="w-full h-full">
    <rect x="0" y="0" width="240" height="180" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="238.5" height="178.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
    <path d="M 40 34 L 66 60 M 22 76 L 56 76 M 40 118 L 66 92" stroke="#e0a03a" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="140" cy="90" rx="66" ry="44" fill="${CHL_F}" stroke="${CHL_S}" stroke-width="3"/>
    <ellipse cx="112" cy="78" rx="13" ry="9" fill="${CHL_S}"/>
    <ellipse cx="146" cy="66" rx="13" ry="9" fill="${CHL_S}"/>
    <ellipse cx="168" cy="96" rx="13" ry="9" fill="${CHL_S}"/>
    <ellipse cx="126" cy="106" rx="13" ry="9" fill="${CHL_S}"/>
  </svg>`,
}
