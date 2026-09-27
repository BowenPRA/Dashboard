// src/data/IGCSE_CHEM/M06_8/diagrams.js
// Teaching diagrams for 6.8 Transition Elements (book spread 12.5, pages
// 154–155). All AUTHORED, nothing taken from the book: the outline table, the
// bar charts, the coloured samples, the ion pictures and the catalyst bed are
// drawn here, so every label is real <text> the SVG audit can measure and
// there is no licence to carry.
//
// Colour means something in this unit:
//   transition elements   teal          #0e7490
//   Group I, alkali metals amber        #b45309
//   Group VII, halogens   purple        #7e22ce
//   Group VIII, noble gases slate       #64748b
//   oxide ion, O²⁻        blue-violet   #4338ca  (as in 6.2 — the base's ion)
// The swatches in COLOURED_COMPOUNDS are the real colours of the compounds,
// not a code.
//
// House rules (kept from M06_2 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · charges are Unicode superscripts (⁺ ²⁺ ³⁺ ²⁻), never <tspan>;
//  · no gradients, clip paths or markers, so there are no ids to collide;
//  · the two bar charts compute every bar from the book's data (helpers
//    below), and each printed value sits just above its computed bar top.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const GLASS = '#7c8a95'

const TE = '#0e7490', TE_F = '#cffafe'        // transition elements
const AM = '#b45309', AM_F = '#fef3c7'        // Group I, alkali metals
const HAL = '#7e22ce', HAL_F = '#f3e8ff'      // Group VII, halogens
const NOB = '#64748b', NOB_F = '#e2e8f0'      // Group VIII, noble gases
const OX = '#4338ca', OX_F = '#e0e7ff'        // oxide ion
const PLAIN_F = '#ffffff', PLAIN_S = '#cbd5e1'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a part out to its label (stripped by Label It / hotspot). */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle class="lbl" cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

/** One ion as a disc; its label is written out literally beside the call. */
const disc = (x, y, r, fill, stroke) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

// ───────────────────────────────────────────────────────────────────────────
// 1 · Where the block sits: an outline Periodic Table (Groups I–VIII along the
//     top), the transition elements shaded as one block between Group II and
//     Group III from Period 4 down, and Groups I, VII and VIII tinted for the
//     three-families recap. The same drawing is the closing hotspot: there the
//     names and the legend are stripped and only the group numerals stay
//     (class="keep").
// ───────────────────────────────────────────────────────────────────────────
const TB = { x0: 28, y0: 58, c: 28 }
/** One cell of the outline table at column `col` (0–17), row `row` (0–6). */
const tbCell = (col, row, fill, stroke) => `<rect x="${TB.x0 + col * TB.c}" y="${TB.y0 + row * TB.c}" width="${TB.c}" height="${TB.c}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`
/** Every cell of the outline, coloured by family. */
const tbCells = () => {
  const out = []
  const fam = (col) => (col === 0 ? [AM_F, AM] : col === 16 ? [HAL_F, HAL] : col === 17 ? [NOB_F, NOB] : [PLAIN_F, PLAIN_S])
  // Period 1: hydrogen (on its own) and helium.
  out.push(tbCell(0, 0, PLAIN_F, PLAIN_S))
  out.push(tbCell(17, 0, NOB_F, NOB))
  for (let row = 1; row <= 6; row++) {
    for (let col = 0; col < 18; col++) {
      const inBlock = col >= 2 && col <= 11
      if (inBlock && row < 3) continue // no transition elements until Period 4
      if (inBlock) out.push(tbCell(col, row, TE_F, TE))
      else { const [f, s] = fam(col); out.push(tbCell(col, row, f, s)) }
    }
  }
  // The block's own outline, drawn heavier on top.
  out.push(`<rect x="${TB.x0 + 2 * TB.c}" y="${TB.y0 + 3 * TB.c}" width="${10 * TB.c}" height="${4 * TB.c}" fill="none" stroke="${TE}" stroke-width="3"/>`)
  return out.join('')
}
/** A small legend swatch (stripped in the hotspot). */
const swatch = (x, y, fill, stroke) => `<rect class="lbl" x="${x}" y="${y}" width="12" height="12" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`

const TABLE_BLOCK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 316" class="w-full h-full">
    ${plate(560, 316)}
    <text x="280" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The transition elements: the block in the middle</text>
    <text class="keep" x="42" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">I</text>
    <text class="keep" x="70" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">II</text>
    <text class="keep" x="378" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">III</text>
    <text class="keep" x="406" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">IV</text>
    <text class="keep" x="434" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">V</text>
    <text class="keep" x="462" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">VI</text>
    <text class="keep" x="490" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">VII</text>
    <text class="keep" x="518" y="52" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">VIII</text>
    ${tbCells()}
    <g class="lbl">
    <rect x="124" y="184" width="200" height="28" rx="8" fill="#ffffff" stroke="${TE}" stroke-width="1.6"/>
    <text x="224" y="203" font-family="${FONT}" font-size="13" font-weight="bold" fill="${TE}" text-anchor="middle">the transition elements</text>
    </g>
    ${swatch(28, 267, AM_F, AM)}
    <text x="46" y="277" font-family="${FONT}" font-size="11" fill="${INK}">Group I: the alkali metals</text>
    ${swatch(290, 267, HAL_F, HAL)}
    <text x="308" y="277" font-family="${FONT}" font-size="11" fill="${INK}">Group VII: the halogens</text>
    ${swatch(28, 289, NOB_F, NOB)}
    <text x="46" y="299" font-family="${FONT}" font-size="11" fill="${INK}">Group VIII: the noble gases</text>
    ${swatch(290, 289, TE_F, TE)}
    <text x="308" y="299" font-family="${FONT}" font-size="11" fill="${INK}">transition elements: all metals</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · The ten to know, each in its real place in the block: Ti, Cr, Fe, Ni,
//     Cu, Zn in Period 4; Ag in Period 5; Pt, Au, Hg in Period 6. The other
//     squares of the block are left blank.
// ───────────────────────────────────────────────────────────────────────────
const TT = { x0: 60, y0: 50, w: 48, h: 56 }
const TEN = [[1, 0], [3, 0], [5, 0], [7, 0], [8, 0], [9, 0], [8, 1], [7, 2], [8, 2], [9, 2]]
/** The 10 × 3 block, with the ten named elements tinted. */
const tenTiles = () => {
  const out = []
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 10; col++) {
      const on = TEN.some(([c, r]) => c === col && r === row)
      out.push(`<rect x="${TT.x0 + col * TT.w + 1}" y="${TT.y0 + row * TT.h + 1}" width="${TT.w - 2}" height="${TT.h - 2}" rx="5" fill="${on ? TE_F : '#f8fafc'}" stroke="${on ? TE : PLAIN_S}" stroke-width="${on ? 1.8 : 1}"/>`)
    }
  }
  return out.join('')
}

const TEN_TILES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 250" class="w-full h-full">
    ${plate(560, 250)}
    <text x="280" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ten transition elements to know</text>
    ${tenTiles()}
    <text x="52" y="82" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="end">Period 4</text>
    <text x="52" y="138" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="end">Period 5</text>
    <text x="52" y="194" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="end">Period 6</text>

    <text x="132" y="80" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Ti</text>
    <text x="132" y="97" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">titanium</text>
    <text x="228" y="80" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Cr</text>
    <text x="228" y="97" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">chromium</text>
    <text x="324" y="80" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Fe</text>
    <text x="324" y="97" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">iron</text>
    <text x="420" y="80" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Ni</text>
    <text x="420" y="97" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">nickel</text>
    <text x="468" y="80" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Cu</text>
    <text x="468" y="97" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">copper</text>
    <text x="516" y="80" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Zn</text>
    <text x="516" y="97" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">zinc</text>

    <text x="468" y="136" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Ag</text>
    <text x="468" y="153" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">silver</text>

    <text x="420" y="192" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Pt</text>
    <text x="420" y="209" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">platinum</text>
    <text x="468" y="192" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Au</text>
    <text x="468" y="209" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">gold</text>
    <text x="516" y="192" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TE}" text-anchor="middle">Hg</text>
    <text x="516" y="209" font-family="${FONT}" font-size="9.5" fill="${INK}" text-anchor="middle">mercury</text>

    <text x="300" y="238" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">All ten are metals, in the block between Group II and Group III</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// Bar-chart helpers. The plot runs from x = 70 to 430 in four 90-wide slots;
// its floor is y = 240 and its top y = 50, so 190 px is the full scale.
// Each bar's height is computed from the value, never typed in.
// ───────────────────────────────────────────────────────────────────────────
const BAR = { left: 70, right: 430, floor: 240, top: 50, slot: 90, w: 50 }
/** A bar for slot i (0–3) of `value`, on a scale whose top is `scaleMax`. */
const bar = (i, value, scaleMax, fill, stroke) => {
  const h = (value / scaleMax) * (BAR.floor - BAR.top)
  const x = BAR.left + i * BAR.slot + (BAR.slot - BAR.w) / 2
  return `<rect x="${x}" y="${(BAR.floor - h).toFixed(2)}" width="${BAR.w}" height="${h.toFixed(2)}" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`
}
/** Horizontal gridlines at each tick value, plus the two axes. */
const grid = (ticks, scaleMax) => ticks.map((t) => {
  const y = BAR.floor - (t / scaleMax) * (BAR.floor - BAR.top)
  return `<line x1="${BAR.left}" y1="${y}" x2="${BAR.right}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>`
}).join('') + `<line x1="${BAR.left}" y1="${BAR.top}" x2="${BAR.left}" y2="${BAR.floor}" stroke="${INK}" stroke-width="1.8"/>
    <line x1="${BAR.left}" y1="${BAR.floor}" x2="${BAR.right}" y2="${BAR.floor}" stroke="${INK}" stroke-width="1.8"/>`
/** A dashed reference line at `value` across the plot. */
const refLine = (value, scaleMax, col) => {
  const y = BAR.floor - (value / scaleMax) * (BAR.floor - BAR.top)
  return `<line x1="${BAR.left}" y1="${y.toFixed(2)}" x2="${BAR.right}" y2="${y.toFixed(2)}" stroke="${col}" stroke-width="1.6" stroke-dasharray="6 4"/>`
}

// ───────────────────────────────────────────────────────────────────────────
// 3 · Density (the book's table, drawn to scale, 0–10 g/cm³): iron 7.9,
//     copper 8.9, nickel 8.9, sodium 0.97. The dashed line is water, 1.0 —
//     sodium is below it, which is why sodium floats.
//     Bar tops: Fe 89.90 · Cu 70.90 · Ni 70.90 · Na 221.57 · water line 221.
// ───────────────────────────────────────────────────────────────────────────
const DENSITY_BARS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 290" class="w-full h-full">
    ${plate(480, 290)}
    <text x="250" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Density of three transition elements and sodium</text>
    ${grid([0, 2, 4, 6, 8, 10], 10)}
    <text x="62" y="244" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">0</text>
    <text x="62" y="206" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">2</text>
    <text x="62" y="168" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">4</text>
    <text x="62" y="130" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">6</text>
    <text x="62" y="92" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">8</text>
    <text x="62" y="54" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">10</text>
    <text x="24" y="145" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 24 145)">density in g/cm³</text>
    ${bar(0, 7.9, 10, TE_F, TE)}
    ${bar(1, 8.9, 10, TE_F, TE)}
    ${bar(2, 8.9, 10, TE_F, TE)}
    ${bar(3, 0.97, 10, AM_F, AM)}
    ${refLine(1, 10, '#0369a1')}
    <text x="436" y="225" font-family="${FONT}" font-size="10" fill="#0369a1">water</text>
    <text x="115" y="83" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">7.9</text>
    <text x="205" y="64" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">8.9</text>
    <text x="295" y="64" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">8.9</text>
    <text x="385" y="214" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AM}" text-anchor="middle">0.97</text>
    <text x="115" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">iron</text>
    <text x="205" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">copper</text>
    <text x="295" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">nickel</text>
    <text x="385" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AM}" text-anchor="middle">sodium</text>
    <text x="115" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Fe</text>
    <text x="205" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Cu</text>
    <text x="295" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Ni</text>
    <text x="385" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Na</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Melting point (the book's table, to scale, 0–1600 °C): iron 1535,
//     copper 1083, nickel 1455, sodium 98. The dashed line is 100 °C, where
//     water boils — sodium melts below it.
//     Bar tops: Fe 57.72 · Cu 111.39 · Ni 67.22 · Na 228.36 · 100 °C line 228.13.
// ───────────────────────────────────────────────────────────────────────────
const MELTING_BARS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 290" class="w-full h-full">
    ${plate(480, 290)}
    <text x="250" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Melting point of three transition elements and sodium</text>
    <text x="250" y="38" font-family="${FONT}" font-size="10.5" fill="#0369a1" text-anchor="middle">dashed line: water boils at 100 °C</text>
    ${grid([0, 400, 800, 1200, 1600], 1600)}
    <text x="62" y="244" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">0</text>
    <text x="62" y="196" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">400</text>
    <text x="62" y="149" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">800</text>
    <text x="62" y="101" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">1200</text>
    <text x="62" y="54" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end">1600</text>
    <text x="20" y="145" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 20 145)">melting point in °C</text>
    ${bar(0, 1535, 1600, TE_F, TE)}
    ${bar(1, 1083, 1600, TE_F, TE)}
    ${bar(2, 1455, 1600, TE_F, TE)}
    ${bar(3, 98, 1600, AM_F, AM)}
    ${refLine(100, 1600, '#0369a1')}
    <text x="115" y="52" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">1535</text>
    <text x="205" y="105" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">1083</text>
    <text x="295" y="61" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">1455</text>
    <text x="385" y="221" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AM}" text-anchor="middle">98</text>
    <text x="115" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">iron</text>
    <text x="205" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">copper</text>
    <text x="295" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">nickel</text>
    <text x="385" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AM}" text-anchor="middle">sodium</text>
    <text x="115" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Fe</text>
    <text x="205" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Cu</text>
    <text x="295" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Ni</text>
    <text x="385" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Na</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Coloured compounds: five compounds of transition elements, each in its
//     real colour, beside a Group I compound, which is white.
// ───────────────────────────────────────────────────────────────────────────
/** A sample of solid, drawn as a heap of crystals on a watch glass. */
const sample = (cx, y, fill, edge) => `<path d="M ${cx - 62} ${y + 58} Q ${cx} ${y + 76} ${cx + 62} ${y + 58}" fill="none" stroke="${GLASS}" stroke-width="2"/>
    <path d="M ${cx - 46} ${y + 60} L ${cx - 38} ${y + 34} L ${cx - 20} ${y + 22} L ${cx - 4} ${y + 30} L ${cx + 8} ${y + 12} L ${cx + 26} ${y + 20} L ${cx + 36} ${y + 38} L ${cx + 46} ${y + 60} Q ${cx} ${y + 70} ${cx - 46} ${y + 60} Z" fill="${fill}" stroke="${edge}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M ${cx - 20} ${y + 22} L ${cx - 12} ${y + 46} L ${cx + 8} ${y + 12} M ${cx - 12} ${y + 46} L ${cx + 26} ${y + 20} M ${cx - 12} ${y + 46} L ${cx - 38} ${y + 34}" fill="none" stroke="${edge}" stroke-width="1" opacity="0.55"/>`

const COLOURED_COMPOUNDS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    <text x="270" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Compounds of transition elements are coloured</text>
    ${sample(95, 38, '#2563eb', '#1e3a8a')}
    ${sample(270, 38, '#c7eecf', '#4d9c62')}
    ${sample(445, 38, '#b45309', '#7c2d12')}
    <text x="95" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">copper(II) sulfate</text>
    <text x="95" y="146" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Cu²⁺ · blue</text>
    <text x="270" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">iron(II) sulfate</text>
    <text x="270" y="146" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Fe²⁺ · pale green</text>
    <text x="445" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">iron(III) hydroxide</text>
    <text x="445" y="146" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Fe³⁺ · orange-brown</text>
    ${sample(95, 160, '#34d399', '#047857')}
    ${sample(270, 160, '#166534', '#052e16')}
    ${sample(445, 160, '#ffffff', '#94a3b8')}
    <text x="95" y="252" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">nickel(II) sulfate</text>
    <text x="95" y="268" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Ni²⁺ · green</text>
    <text x="270" y="252" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">chromium(III) oxide</text>
    <text x="270" y="268" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Cr³⁺ · dark green</text>
    <text x="445" y="252" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AM}" text-anchor="middle">sodium chloride</text>
    <text x="445" y="268" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Na⁺ · white</text>
    <text x="270" y="292" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Compare: the Group I compound, bottom right, is white.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Iron as a catalyst in making ammonia (book page 122): nitrogen and
//     hydrogen pass over lumps of iron; ammonia comes out; the iron is still
//     there, unchanged.
// ───────────────────────────────────────────────────────────────────────────
/** Four rows of iron lumps inside the reaction vessel. */
const ironLumps = () => {
  const out = []
  for (let row = 0; row < 4; row++) {
    for (let k = 0; k < 9; k++) {
      const x = 196 + k * 16 + (row % 2 ? 8 : 0)
      if (x > 326) continue
      out.push(`<circle cx="${x}" cy="${112 + row * 16}" r="6.5" fill="#4b5563" stroke="#1f2937" stroke-width="1"/>`)
    }
  }
  return out.join('')
}

const CATALYST_BED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 272" class="w-full h-full">
    ${plate(520, 272)}
    <text x="260" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Iron as a catalyst: making ammonia</text>
    <rect x="180" y="56" width="160" height="124" rx="12" fill="#f8fafc" stroke="${GLASS}" stroke-width="2.4"/>
    <text x="260" y="78" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">speeds up the reaction</text>
    <text x="260" y="94" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">and is not used up</text>
    ${ironLumps()}
    ${arrowR(36, 176, 118, INK)}
    <text x="100" y="92" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">nitrogen</text>
    <text x="100" y="108" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+ hydrogen in</text>
    ${arrowR(344, 486, 118, INK)}
    <text x="414" y="108" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">ammonia out</text>
    <text x="414" y="140" font-family="${FONT}" font-size="10.5" fill="${MUTED}" text-anchor="middle">with unreacted gases</text>
    ${lead(292, 172, 292, 196)}
    <text x="292" y="210" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TE}" text-anchor="middle">lumps of iron: the catalyst</text>
    <rect x="110" y="224" width="300" height="36" rx="10" fill="${TE_F}" stroke="${TE}" stroke-width="1.6"/>
    <text x="260" y="247" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">N₂(g) + 3H₂(g) ⇌ 2NH₃(g)</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Extended: the same two elements, two compounds. Each metal ion is a
//     teal disc, each oxide ion a blue-violet one, and the charges add to zero.
// ───────────────────────────────────────────────────────────────────────────
const COPPER_IRON_OXIDES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 318" class="w-full h-full">
    ${plate(540, 318)}
    <text x="270" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Two oxides of copper, two oxides of iron</text>
    <line x1="270" y1="38" x2="270" y2="286" stroke="#e2e8f0" stroke-width="1.5"/>
    <line x1="18" y1="162" x2="522" y2="162" stroke="#e2e8f0" stroke-width="1.5"/>

    <text x="135" y="56" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">copper(I) oxide, Cu₂O</text>
    ${disc(95, 96, 17, TE_F, TE)}<text x="95" y="100" font-family="${FONT}" font-size="10" font-weight="bold" fill="${TE}" text-anchor="middle">Cu⁺</text>
    ${disc(135, 96, 17, TE_F, TE)}<text x="135" y="100" font-family="${FONT}" font-size="10" font-weight="bold" fill="${TE}" text-anchor="middle">Cu⁺</text>
    ${disc(175, 96, 17, OX_F, OX)}<text x="175" y="100" font-family="${FONT}" font-size="10" font-weight="bold" fill="${OX}" text-anchor="middle">O²⁻</text>
    <text x="135" y="140" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">(2 × 1+) + (1 × 2−) = 0</text>

    <text x="405" y="56" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">copper(II) oxide, CuO</text>
    ${disc(385, 96, 17, TE_F, TE)}<text x="385" y="100" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${TE}" text-anchor="middle">Cu²⁺</text>
    ${disc(425, 96, 17, OX_F, OX)}<text x="425" y="100" font-family="${FONT}" font-size="10" font-weight="bold" fill="${OX}" text-anchor="middle">O²⁻</text>
    <text x="405" y="140" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">(1 × 2+) + (1 × 2−) = 0</text>

    <text x="135" y="196" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">iron(II) oxide, FeO</text>
    ${disc(115, 236, 17, TE_F, TE)}<text x="115" y="240" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${TE}" text-anchor="middle">Fe²⁺</text>
    ${disc(155, 236, 17, OX_F, OX)}<text x="155" y="240" font-family="${FONT}" font-size="10" font-weight="bold" fill="${OX}" text-anchor="middle">O²⁻</text>
    <text x="135" y="280" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">(1 × 2+) + (1 × 2−) = 0</text>

    <text x="405" y="196" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">iron(III) oxide, Fe₂O₃</text>
    ${disc(333, 236, 16, TE_F, TE)}<text x="333" y="240" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${TE}" text-anchor="middle">Fe³⁺</text>
    ${disc(369, 236, 16, TE_F, TE)}<text x="369" y="240" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${TE}" text-anchor="middle">Fe³⁺</text>
    ${disc(405, 236, 16, OX_F, OX)}<text x="405" y="240" font-family="${FONT}" font-size="10" font-weight="bold" fill="${OX}" text-anchor="middle">O²⁻</text>
    ${disc(441, 236, 16, OX_F, OX)}<text x="441" y="240" font-family="${FONT}" font-size="10" font-weight="bold" fill="${OX}" text-anchor="middle">O²⁻</text>
    ${disc(477, 236, 16, OX_F, OX)}<text x="477" y="240" font-family="${FONT}" font-size="10" font-weight="bold" fill="${OX}" text-anchor="middle">O²⁻</text>
    <text x="405" y="280" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">(2 × 3+) + (3 × 2−) = 0</text>

    <text x="270" y="306" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">The Roman numeral is the charge on the metal ion</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · The module's three families side by side: Group I, Group VII and the
//     transition elements, row by row. The last topic of Module 6 closes on it.
// ───────────────────────────────────────────────────────────────────────────
const FT = { left: 10, labelW: 130, colW: 160, head: 32, headH: 42, rowH: 34, rows: 7 }
/** Header bands, zebra rows and rules for the three-family table. */
const familyGrid = () => {
  const out = []
  const cols = [[AM, AM_F], [HAL, HAL_F], [TE, TE_F]]
  const body = FT.head + FT.headH
  const right = FT.left + FT.labelW + 3 * FT.colW
  cols.forEach(([c], i) => {
    const x = FT.left + FT.labelW + i * FT.colW
    out.push(`<rect x="${x + 2}" y="${FT.head}" width="${FT.colW - 4}" height="${FT.headH - 4}" rx="8" fill="${c}"/>`)
  })
  for (let r = 0; r < FT.rows; r++) {
    const y = body + r * FT.rowH
    if (r % 2 === 0) out.push(`<rect x="${FT.left}" y="${y}" width="${right - FT.left}" height="${FT.rowH}" fill="#f8fafc"/>`)
    out.push(`<line x1="${FT.left}" y1="${y}" x2="${right}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>`)
  }
  out.push(`<line x1="${FT.left}" y1="${body + FT.rows * FT.rowH}" x2="${right}" y2="${body + FT.rows * FT.rowH}" stroke="#cbd5e1" stroke-width="1.2"/>`)
  for (let i = 0; i < 3; i++) {
    const x = FT.left + FT.labelW + i * FT.colW
    out.push(`<line x1="${x}" y1="${body}" x2="${x}" y2="${body + FT.rows * FT.rowH}" stroke="#e2e8f0" stroke-width="1"/>`)
  }
  return out.join('')
}

const THREE_FAMILIES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 324" class="w-full h-full">
    ${plate(630, 324)}
    <text x="315" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Three families, side by side</text>
    ${familyGrid()}
    <text x="220" y="50" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Group I</text>
    <text x="220" y="66" font-family="${FONT}" font-size="11" fill="#ffffff" text-anchor="middle">alkali metals</text>
    <text x="380" y="50" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Group VII</text>
    <text x="380" y="66" font-family="${FONT}" font-size="11" fill="#ffffff" text-anchor="middle">halogens</text>
    <text x="540" y="50" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Transition</text>
    <text x="540" y="66" font-family="${FONT}" font-size="11" fill="#ffffff" text-anchor="middle">elements</text>

    <text x="18" y="96" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">Metal or non-metal</text>
    <text x="220" y="96" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">metals</text>
    <text x="380" y="96" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">non-metals</text>
    <text x="540" y="96" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">metals</text>

    <text x="18" y="130" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">Hard or soft</text>
    <text x="220" y="130" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">soft: cut with a knife</text>
    <text x="380" y="130" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">gas, liquid or solid</text>
    <text x="540" y="130" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">hard and strong</text>

    <text x="18" y="164" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">Melting point</text>
    <text x="220" y="164" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">low</text>
    <text x="380" y="164" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">low</text>
    <text x="540" y="164" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">high (not mercury)</text>

    <text x="18" y="198" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">Reactivity</text>
    <text x="220" y="198" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">very reactive</text>
    <text x="380" y="198" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">very reactive</text>
    <text x="540" y="198" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">much less reactive</text>

    <text x="18" y="232" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">Down the group</text>
    <text x="220" y="232" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">more reactive</text>
    <text x="380" y="232" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">less reactive</text>
    <text x="540" y="232" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">no clear trend</text>

    <text x="18" y="266" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">Colour</text>
    <text x="220" y="266" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">compounds white</text>
    <text x="380" y="266" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">elements coloured</text>
    <text x="540" y="266" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">compounds coloured</text>

    <text x="18" y="300" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">Ions formed</text>
    <text x="220" y="300" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">always 1+</text>
    <text x="380" y="300" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">1− (halide ions)</text>
    <text x="540" y="300" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">variable: Fe²⁺, Fe³⁺</text>
  </svg>`

export const DIAGRAMS = {
  TABLE_BLOCK: TABLE_BLOCK,
  TEN_TILES: TEN_TILES,
  DENSITY_BARS: DENSITY_BARS,
  MELTING_BARS: MELTING_BARS,
  COLOURED_COMPOUNDS: COLOURED_COMPOUNDS,
  CATALYST_BED: CATALYST_BED,
  COPPER_IRON_OXIDES: COPPER_IRON_OXIDES,
  THREE_FAMILIES: THREE_FAMILIES,
}
