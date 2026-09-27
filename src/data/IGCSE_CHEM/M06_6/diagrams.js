// src/data/IGCSE_CHEM/M06_6/diagrams.js
// Teaching diagrams for 6.6 Group 1: The Alkali Metals (book spread 12.2, with
// the reactivity picture from 12.4). All AUTHORED, nothing taken from the book:
// the atoms, the chart, the table and the troughs are drawn here so the labels
// are real <text> the SVG audit can measure, and there is no licence to carry.
//
// Colour means something on this track, and it follows universal indicator:
//   alkali / OH⁻         blue-violet   #4338ca   (the indicator where an alkali forms)
//   neutral / water      green         #2f8f5b
// The outer-shell electron is amber everywhere, so the eye finds the one
// electron the whole unit is about. Nothing else reuses those colours.
//
// Graphs are accurate: the melting-point bars are computed from the data
// (0.95 px per °C, zero at y = 250), never drawn by eye.
//
// House rules (kept from M06_2 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · charges are Unicode superscripts (⁺ ⁻), never <tspan>;
//  · no gradients, clip paths or markers, so there are no ids to collide.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const ALK = '#4338ca', ALK_F = '#e0e7ff'     // alkali: indicator turns purple
const NEU = '#2f8f5b', NEU_F = '#dcfce7'     // neutral water
const TEAL = '#0087a8', TEAL_F = '#cfe8ef'   // data (bars, table header)
const OUT = '#d97706', OUT_F = '#fde68a'     // the outer-shell electron
const ODD = '#b45309', ODD_F = '#fef3c7'     // the value that does not fit
const PULL = '#c25e12'                       // the pull of the nucleus
const LILAC = '#9333ea', LILAC_F = '#e9d5ff' // potassium's flame
const GLASS = '#7c8a95'
const METAL = '#6b7280', METAL_F = '#e2e8f0'
const SHELL = '#94a3b8'
const OIL_F = '#fef9c3'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A point on a circle; `deg` measured clockwise from 3 o'clock (SVG y is down). */
const onCircle = (cx, cy, r, deg) => {
  const t = (deg * Math.PI) / 180
  return [Math.round((cx + r * Math.cos(t)) * 10) / 10, Math.round((cy + r * Math.sin(t)) * 10) / 10]
}

/**
 * An atom drawn as shells. `shells` is the electron arrangement ([2, 8, 1]);
 * radii start at `r0` and step by `dr`. A shell of 2 sits at 3 and 9 o'clock,
 * a shell of 8 at 22.5° + 45°k. A LAST shell holding a single electron is the
 * outer-shell electron: amber, at the upper right (−45°), where no other
 * electron sits. The nucleus is a disc; its symbol is written beside the call.
 */
const atom = (cx, cy, shells, r0 = 22, dr = 18) => {
  let s = ''
  shells.forEach((n, i) => {
    const r = r0 + i * dr
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${SHELL}" stroke-width="1.4"/>`
    const outer = i === shells.length - 1 && n === 1
    if (outer) {
      const [x, y] = onCircle(cx, cy, r, -45)
      s += `<circle cx="${x}" cy="${y}" r="5.5" fill="${OUT_F}" stroke="${OUT}" stroke-width="2"/>`
      return
    }
    const start = n === 2 ? 0 : 22.5
    for (let k = 0; k < n; k++) {
      const [x, y] = onCircle(cx, cy, r, start + (k * 360) / n)
      s += `<circle cx="${x}" cy="${y}" r="3.2" fill="#475569"/>`
    }
  })
  s += `<circle cx="${cx}" cy="${cy}" r="13" fill="#f1f5f9" stroke="${INK}" stroke-width="1.6"/>`
  return s
}

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

/** A plus sign drawn as two lines (not text). */
const plus = (x, y, col, a = 7) => `<line x1="${x - a}" y1="${y}" x2="${x + a}" y2="${y}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="${x}" y1="${y - a}" x2="${x}" y2="${y + a}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`

/** A gas bubble. */
const bubbles = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.2"/>`).join('')

/** Speed lines trailing behind a metal that shoots across the water. */
const speed = (x, y) => `<line x1="${x - 30}" y1="${y - 5}" x2="${x - 14}" y2="${y - 5}" stroke="${MUTED}" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="${x - 34}" y1="${y + 2}" x2="${x - 15}" y2="${y + 2}" stroke="${MUTED}" stroke-width="1.6" stroke-linecap="round"/>`

/**
 * A small trough of water centred on `cx`: slanted sides from `top` to
 * `bottom`, green (neutral) water from `yl`, and a purple patch where the
 * alkali is forming around the metal at `mx`.
 */
const trough = (cx, half, top, bottom, yl, mx) => {
  const inset = ((yl - top) / (bottom - top)) * 10
  return `<path d="M ${cx - half + inset} ${yl} L ${cx - half + 10} ${bottom} L ${cx + half - 10} ${bottom} L ${cx + half - inset} ${yl} Z" fill="${NEU_F}"/>
    <rect x="${mx - 34}" y="${yl + 1}" width="68" height="${Math.round((bottom - yl) * 0.7)}" rx="14" fill="${ALK_F}"/>
    <line x1="${cx - half + inset}" y1="${yl}" x2="${cx + half - inset}" y2="${yl}" stroke="${GLASS}" stroke-width="1" stroke-dasharray="3 3"/>
    <path d="M ${cx - half} ${top} L ${cx - half + 10} ${bottom} L ${cx + half - 10} ${bottom} L ${cx + half} ${top}" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>`
}

// ───────────────────────────────────────────────────────────────────────────
// 1 · One outer-shell electron: lithium 2,1 · sodium 2,8,1 · potassium
//     2,8,8,1. The single outer electron is amber in all three.
// ───────────────────────────────────────────────────────────────────────────
const SHELLS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 266" class="w-full h-full">
    ${plate(540, 266)}
    <text x="270" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">All three atoms have 1 outer-shell electron</text>
    <circle cx="28" cy="46" r="5.5" fill="${OUT_F}" stroke="${OUT}" stroke-width="2"/>
    <text x="40" y="50" font-family="${FONT}" font-size="11" fill="${MUTED}">= the outer-shell electron</text>

    ${atom(90, 140, [2, 1])}
    <text x="90" y="144" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" class="keep">Li</text>
    ${atom(250, 140, [2, 8, 1])}
    <text x="250" y="144" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" class="keep">Na</text>
    ${atom(432, 140, [2, 8, 8, 1])}
    <text x="432" y="144" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" class="keep">K</text>

    <text x="90" y="238" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">lithium</text>
    <text x="90" y="256" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">2,1</text>
    <text x="250" y="238" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="250" y="256" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">2,8,1</text>
    <text x="432" y="238" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">potassium</text>
    <text x="432" y="256" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">2,8,8,1</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 & 3 · Melting points, as a bar chart computed from the book's data:
//     Li 181 · Na 98 · K 63 · Rb 39 · Cs 29 °C. Scale 0.95 px per °C, zero at
//     y = 250, so a bar's top is 250 − 0.95 × value:
//       181 → 78.05 · 98 → 156.9 · 63 → 190.15 · 39 → 212.95 · 29 → 222.45
//     Bars are 44 wide, centred at 98, 174, 250, 326, 402. MP_GAP hides
//     rubidium for the estimate; MP_BARS shows it, with the trend line.
// ───────────────────────────────────────────────────────────────────────────
const mpGrid = () => [250, 202.5, 155, 107.5, 60]
  .map((y, i) => `<line x1="60" y1="${y}" x2="440" y2="${y}" stroke="${i === 0 ? INK : '#e2e8f0'}" stroke-width="${i === 0 ? 1.8 : 1}"/>`)
  .join('') + `<line x1="60" y1="60" x2="60" y2="250" stroke="${INK}" stroke-width="1.8"/>`

const bar = (cx, top) => `<rect x="${cx - 22}" y="${top}" width="44" height="${Math.round((250 - top) * 100) / 100}" fill="${TEAL_F}" stroke="${TEAL}" stroke-width="1.8"/>`

const MP_GAP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 296" class="w-full h-full">
    ${plate(460, 296)}
    <text x="230" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Melting points of the Group I metals</text>
    <text x="62" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}">Melting point / °C</text>
    ${mpGrid()}
    <text x="52" y="254" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">0</text>
    <text x="52" y="206.5" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">50</text>
    <text x="52" y="159" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">100</text>
    <text x="52" y="111.5" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">150</text>
    <text x="52" y="64" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">200</text>
    ${bar(98, 78.05)}${bar(174, 156.9)}${bar(250, 190.15)}${bar(402, 222.45)}
    <text x="98" y="72" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">181</text>
    <text x="174" y="151" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">98</text>
    <text x="250" y="184" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">63</text>
    <text x="326" y="240" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">?</text>
    <text x="402" y="216" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">29</text>
    <text x="98" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Li</text>
    <text x="174" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="250" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
    <text x="326" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Rb</text>
    <text x="402" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Cs</text>
    <text x="98" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">lithium</text>
    <text x="174" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">sodium</text>
    <text x="250" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">potassium</text>
    <text x="326" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">rubidium</text>
    <text x="402" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">caesium</text>
  </svg>`

const MP_BARS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 296" class="w-full h-full">
    ${plate(460, 296)}
    <text x="230" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Melting points of the Group I metals</text>
    <text x="62" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}">Melting point / °C</text>
    ${mpGrid()}
    <text x="52" y="254" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">0</text>
    <text x="52" y="206.5" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">50</text>
    <text x="52" y="159" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">100</text>
    <text x="52" y="111.5" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">150</text>
    <text x="52" y="64" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">200</text>
    ${bar(98, 78.05)}${bar(174, 156.9)}${bar(250, 190.15)}${bar(326, 212.95)}${bar(402, 222.45)}
    <text x="98" y="72" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">181</text>
    <text x="174" y="151" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">98</text>
    <text x="250" y="184" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">63</text>
    <text x="326" y="207" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">39</text>
    <text x="402" y="216" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">29</text>
    <line x1="200" y1="92" x2="412" y2="169" stroke="${PULL}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M 422 172.6 L 410.6 174.8 L 414.6 163.6 Z" fill="${PULL}"/>
    <text x="330" y="98" font-family="${FONT}" font-size="12" font-weight="bold" fill="${PULL}" text-anchor="middle">melting point decreases</text>
    <text x="98" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Li</text>
    <text x="174" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="250" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
    <text x="326" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Rb</text>
    <text x="402" y="268" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Cs</text>
    <text x="98" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">lithium</text>
    <text x="174" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">sodium</text>
    <text x="250" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">potassium</text>
    <text x="326" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">rubidium</text>
    <text x="402" y="284" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">caesium</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · The density table (book data), with the value that does not fit the
//     trend marked: potassium, 0.86 g/cm³, is LESS dense than sodium above it.
// ───────────────────────────────────────────────────────────────────────────
const densityRow = (y, fill, stroke) => `<rect x="30" y="${y}" width="380" height="36" fill="${fill}" stroke="${stroke}" stroke-width="${stroke === ODD ? 2 : 1}"/>
    <line x1="250" y1="${y}" x2="250" y2="${y + 36}" stroke="#cbd5e1" stroke-width="1"/>`

const DENSITY_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 300" class="w-full h-full">
    ${plate(440, 300)}
    <text x="220" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Density of the Group I metals</text>
    <rect x="30" y="38" width="380" height="34" fill="${TEAL_F}" stroke="${TEAL}" stroke-width="1.4"/>
    <line x1="250" y1="38" x2="250" y2="72" stroke="${TEAL}" stroke-width="1"/>
    <text x="44" y="60" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Metal</text>
    <text x="264" y="60" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Density in g/cm³</text>
    ${densityRow(72, '#ffffff', '#cbd5e1')}${densityRow(108, '#ffffff', '#cbd5e1')}${densityRow(180, '#ffffff', '#cbd5e1')}${densityRow(216, '#ffffff', '#cbd5e1')}
    ${densityRow(144, ODD_F, ODD)}
    <text x="44" y="95" font-family="${FONT}" font-size="13" fill="${INK}">lithium, Li</text>
    <text x="330" y="95" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">0.53</text>
    <text x="44" y="131" font-family="${FONT}" font-size="13" fill="${INK}">sodium, Na</text>
    <text x="330" y="131" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">0.97</text>
    <text x="44" y="167" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ODD}">potassium, K</text>
    <text x="330" y="167" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ODD}" text-anchor="middle">0.86</text>
    <text x="44" y="203" font-family="${FONT}" font-size="13" fill="${INK}">rubidium, Rb</text>
    <text x="330" y="203" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">1.53</text>
    <text x="44" y="239" font-family="${FONT}" font-size="13" fill="${INK}">caesium, Cs</text>
    <text x="330" y="239" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">1.88</text>
    <text x="220" y="274" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ODD}" text-anchor="middle">Potassium does not fit: it is less dense than sodium</text>
    <text x="220" y="292" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">For comparison, water is 1.00 g/cm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Stored under oil: lumps of sodium in a jar of oil, so oxygen and water
//     vapour in the air cannot reach them.
// ───────────────────────────────────────────────────────────────────────────
const UNDER_OIL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 284" class="w-full h-full">
    ${plate(360, 284)}
    <text x="180" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Stored under oil</text>
    <path d="M 74 96 L 74 236 Q 74 250 88 250 L 182 250 Q 196 250 196 236 L 196 96 Z" fill="${OIL_F}"/>
    <line x1="74" y1="96" x2="196" y2="96" stroke="${GLASS}" stroke-width="1" stroke-dasharray="3 3"/>
    <path d="M 74 80 L 74 236 Q 74 250 88 250 L 182 250 Q 196 250 196 236 L 196 80" fill="none" stroke="${GLASS}" stroke-width="2.5"/>
    <rect x="66" y="62" width="138" height="18" rx="4" fill="#475569"/>
    <path d="M 88 248 l 4 -16 l 18 -5 l 12 13 l -3 8 z" fill="${METAL_F}" stroke="${METAL}" stroke-width="1.6"/>
    <path d="M 124 248 l 6 -20 l 20 -2 l 8 16 l -4 6 z" fill="${METAL_F}" stroke="${METAL}" stroke-width="1.6"/>
    <path d="M 160 248 l 5 -13 l 17 1 l 4 12 z" fill="${METAL_F}" stroke="${METAL}" stroke-width="1.6"/>
    ${lead(186, 140, 218, 124)}
    <text x="222" y="120" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">oil</text>
    <text x="222" y="136" font-family="${FONT}" font-size="11" fill="${MUTED}">keeps out the air</text>
    <text x="222" y="152" font-family="${FONT}" font-size="11" fill="${MUTED}">and water vapour</text>
    ${lead(176, 238, 218, 214)}
    <text x="222" y="210" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">sodium</text>
    <text x="222" y="226" font-family="${FONT}" font-size="11" fill="${MUTED}">soft lumps, dull on</text>
    <text x="222" y="242" font-family="${FONT}" font-size="11" fill="${MUTED}">the outside</text>
    <text x="180" y="274" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Oxygen and water cannot reach the metal</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · The experiment: a Group I metal in a trough of water with universal
//     indicator. The water starts green (neutral); it turns purple around the
//     metal as the alkali forms.
// ───────────────────────────────────────────────────────────────────────────
const TROUGH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 244" class="w-full h-full">
    ${plate(440, 244)}
    <text x="220" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">A Group I metal in a trough of water</text>
    ${trough(160, 130, 100, 190, 118, 160)}
    <path d="M 146 122 l 4 -12 l 16 -3 l 12 8 l -2 7 z" fill="${METAL_F}" stroke="${METAL}" stroke-width="1.6"/>
    ${bubbles([[140, 104, 2.5], [182, 98, 3], [192, 110, 2.5], [158, 94, 2.5], [172, 84, 3], [150, 80, 2.2]])}
    ${lead(176, 88, 300, 72)}
    <text x="304" y="70" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">gas fizzes off</text>
    <text x="304" y="86" font-family="${FONT}" font-size="11" fill="${MUTED}">hydrogen</text>
    ${lead(174, 114, 300, 118)}
    <text x="304" y="116" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">the metal floats</text>
    <text x="304" y="132" font-family="${FONT}" font-size="11" fill="${MUTED}">and moves about</text>
    ${lead(190, 150, 300, 166)}
    <text x="304" y="164" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}">indicator turns</text>
    <text x="304" y="180" font-family="${FONT}" font-size="11" fill="${ALK}">purple: an alkali</text>
    <text x="304" y="196" font-family="${FONT}" font-size="11" fill="${ALK}">has formed</text>
    <text x="160" y="212" font-family="${FONT}" font-size="11" font-weight="bold" fill="${NEU}" text-anchor="middle">trough of water + universal indicator</text>
    <text x="160" y="230" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">green at the start: neutral</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Lithium, sodium and potassium on water, side by side — what you SEE.
//     Reactivity increases from left to right (down the group).
// ───────────────────────────────────────────────────────────────────────────
const THREE_WATER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 282" class="w-full h-full">
    ${plate(540, 282)}
    <text x="90" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">lithium</text>
    <text x="270" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="450" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">potassium</text>

    ${trough(90, 72, 80, 138, 96, 90)}
    <path d="M 80 99 l 3 -9 l 12 -2 l 8 6 l -2 5 z" fill="${METAL_F}" stroke="${METAL}" stroke-width="1.6"/>
    ${bubbles([[84, 82, 2.2], [98, 78, 2.5], [90, 68, 2]])}

    ${trough(270, 72, 80, 138, 96, 270)}
    <circle cx="274" cy="92" r="8" fill="${METAL_F}" stroke="${METAL}" stroke-width="1.8"/>
    ${speed(274, 92)}
    ${bubbles([[286, 80, 2.5], [276, 72, 2.2], [292, 68, 2]])}

    ${trough(450, 72, 80, 138, 96, 450)}
    <circle cx="454" cy="92" r="8" fill="${METAL_F}" stroke="${METAL}" stroke-width="1.8"/>
    ${speed(454, 92)}
    <path d="M 447 85 C 436 74 444 60 453 44 C 455 56 467 64 463 77 C 461 84 453 88 447 85 Z" fill="${LILAC_F}" stroke="${LILAC}" stroke-width="1.8"/>
    <path d="M 452 82 C 447 76 451 69 455 62 C 457 69 461 73 458 79 C 457 82 455 83 452 82 Z" fill="#ffffff" stroke="none"/>

    <text x="90" y="162" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">floats and moves about</text>
    <text x="90" y="178" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">fizzes steadily</text>
    <text x="270" y="162" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">melts into a silver ball</text>
    <text x="270" y="178" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">shoots across the water</text>
    <text x="270" y="194" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">fizzes hard</text>
    <text x="450" y="162" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">melts, shoots across</text>
    <text x="450" y="178" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">the gas catches fire</text>
    <text x="450" y="194" font-family="${FONT}" font-size="11" font-weight="bold" fill="${LILAC}" text-anchor="middle">lilac flame</text>

    ${arrowR(40, 500, 220, INK)}
    <text x="270" y="244" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">reactivity increases down the group</text>
    <text x="270" y="266" font-family="${FONT}" font-size="11" fill="${ALK}" text-anchor="middle">in all three, the indicator turns purple: an alkali forms</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · Why reactivity rises down the group (book 12.4, point 4, drawn fresh):
//     sodium's outer electron is in shell 3, potassium's in shell 4 — further
//     from the positive nucleus, so pulled less strongly and easier to lose.
//     The dashed line is the pull, nucleus edge → outer electron, at −45°.
// ───────────────────────────────────────────────────────────────────────────
const SHELL_PULL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
    ${plate(520, 300)}
    <text x="260" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The outer electron is further from the nucleus in potassium</text>
    <line x1="30" y1="46" x2="56" y2="46" stroke="${PULL}" stroke-width="2.4" stroke-dasharray="5 3"/>
    <text x="64" y="50" font-family="${FONT}" font-size="11" fill="${MUTED}">= the pull of the nucleus on the outer electron</text>

    ${atom(130, 136, [2, 8, 1])}
    <line x1="139.2" y1="126.8" x2="167.5" y2="98.5" stroke="${PULL}" stroke-width="2.4" stroke-dasharray="5 3"/>
    <text x="130" y="140" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" class="keep">Na</text>

    ${atom(380, 136, [2, 8, 8, 1])}
    <line x1="389.2" y1="126.8" x2="430.2" y2="85.8" stroke="${PULL}" stroke-width="2.4" stroke-dasharray="5 3"/>
    <text x="380" y="140" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" class="keep">K</text>

    <text x="130" y="236" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">sodium: 3 shells</text>
    <text x="130" y="253" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">outer electron closer,</text>
    <text x="130" y="268" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">held more strongly</text>
    <text x="380" y="236" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">potassium: 4 shells</text>
    <text x="380" y="253" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">outer electron further out,</text>
    <text x="380" y="268" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">pulled less, easier to lose</text>
    <text x="260" y="290" font-family="${FONT}" font-size="12" font-weight="bold" fill="${PULL}" text-anchor="middle">so potassium is more reactive than sodium</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · Forming the ion: a sodium atom (2,8,1) loses its outer electron and
//     becomes Na⁺ (2,8) — a full outer shell.
// ───────────────────────────────────────────────────────────────────────────
const ION_FORM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 272" class="w-full h-full">
    ${plate(500, 272)}
    <text x="250" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">A sodium atom loses its outer electron</text>
    ${atom(100, 118, [2, 8, 1], 20, 16)}
    <text x="100" y="122" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" class="keep">Na</text>
    ${arrowR(168, 250, 118, INK)}
    <text x="209" y="104" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">loses 1 electron</text>
    ${atom(318, 118, [2, 8], 20, 16)}
    <text x="318" y="122" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" class="keep">Na</text>
    ${plus(388, 118, INK, 6)}
    <circle cx="440" cy="118" r="7" fill="${OUT_F}" stroke="${OUT}" stroke-width="2"/>
    <text x="440" y="146" font-family="${FONT}" font-size="12" font-weight="bold" fill="${OUT}" text-anchor="middle">e⁻</text>
    <text x="100" y="192" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">sodium atom, Na</text>
    <text x="100" y="208" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">2,8,1</text>
    <text x="318" y="192" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">sodium ion, Na⁺</text>
    <text x="318" y="208" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">2,8: a full outer shell</text>
    <text x="446" y="192" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">an electron</text>
    <rect x="150" y="224" width="200" height="38" rx="12" fill="#f1f5f9" stroke="${INK}" stroke-width="1.4"/>
    <text x="250" y="249" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Na → Na⁺ + e⁻</text>
  </svg>`

export const DIAGRAMS = {
  SHELLS: SHELLS,
  MP_GAP: MP_GAP,
  MP_BARS: MP_BARS,
  DENSITY_TABLE: DENSITY_TABLE,
  UNDER_OIL: UNDER_OIL,
  TROUGH: TROUGH,
  THREE_WATER: THREE_WATER,
  SHELL_PULL: SHELL_PULL,
  ION_FORM: ION_FORM,
}
