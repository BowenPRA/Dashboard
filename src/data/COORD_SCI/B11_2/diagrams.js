// src/data/COORD_SCI/B11_2/diagrams.js
// Drawn diagrams for B11.03–B11.04, reproduction in humans and HIV.
//
// The reproductive organs, the route of the sperm, fertilisation, the menstrual
// cycle and the HIV particle are the coursebook's own figures
// (public/images/COORD_SCI/B11_2) — painted anatomy is not improved by a line
// drawing. Drawn here: the two gametes (so Label It can strip their labels),
// the 28-day cycle as a wheel, a bacterium beside a virus, and the redrawn
// graphs for homework Q24 (Fig. 5.2), whose own pictures were missing from the
// downloaded assignment.
//
// House rules (as U04_1 / U05_1, so `npm run audit:svg COORD_SCI` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally so the audit can measure it;
//  · a leader line carries class="lbl", so Label It strips it with its label.

const INK = '#2b2b2b'
const KEY = '#c25e12'
const LEAD = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const CELL = '#1a5fa8', CELL_F = '#dbeafe', CELL_D = '#1e3a8a'
const PINK = '#c2185b'
const RED = '#c8102e', RED_F = '#fbc9cf'
const AMBER = '#b7791f', AMBER_F = '#fde68a'
const PURPLE = '#5c2483', PURPLE_F = '#e9defa'
const GREEN = '#3d7a1c', GREEN_F = '#dcedc8'
const GRID = '#cbd5e1'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A label's leader line — tagged `lbl` so Label It removes it with the text. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>`

// ───────────────────────────────────────────────────────────────────────────
// 1 · A sperm cell: the head with its acrosome and nucleus, the middle piece
//     packed with mitochondria, and the flagellum.
// ───────────────────────────────────────────────────────────────────────────
const SPERM_CELL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" class="w-full h-full">
    ${plate(600, 340)}
    <path d="M 40 214 C 84 176, 130 252, 178 214 S 270 176, 322 204" fill="none" stroke="${CELL}" stroke-width="5" stroke-linecap="round"/>
    <line x1="322" y1="204" x2="412" y2="176" stroke="${CELL}" stroke-width="20" stroke-linecap="round"/>
    <line x1="322" y1="204" x2="412" y2="176" stroke="${CELL_F}" stroke-width="14" stroke-linecap="round"/>
    <g fill="${AMBER_F}" stroke="${AMBER}" stroke-width="1.5">
      <ellipse cx="338" cy="199" rx="7" ry="4" transform="rotate(-17 338 199)"/>
      <ellipse cx="358" cy="193" rx="7" ry="4" transform="rotate(-17 358 193)"/>
      <ellipse cx="378" cy="187" rx="7" ry="4" transform="rotate(-17 378 187)"/>
      <ellipse cx="398" cy="181" rx="7" ry="4" transform="rotate(-17 398 181)"/>
    </g>
    <ellipse cx="506" cy="146" rx="22" ry="30" transform="rotate(-17 506 146)" fill="${AMBER_F}" stroke="${AMBER}" stroke-width="3"/>
    <ellipse cx="466" cy="158" rx="54" ry="36" transform="rotate(-17 466 158)" fill="${CELL_F}" stroke="${CELL}" stroke-width="3.5"/>
    <ellipse cx="460" cy="160" rx="30" ry="21" transform="rotate(-17 460 160)" fill="${CELL_D}"/>
    ${lead(150, 276, 150, 228)}
    <text x="150" y="296" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">flagellum</text>
    ${lead(330, 112, 366, 182)}
    <text x="330" y="104" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">middle piece</text>
    ${lead(446, 262, 458, 170)}
    <text x="446" y="282" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">nucleus</text>
    ${lead(528, 72, 518, 128)}
    <text x="528" y="64" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">acrosome</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · An egg cell: far larger than a sperm, with a jelly coat round it and an
//     energy store in its cytoplasm.
// ───────────────────────────────────────────────────────────────────────────
const EGG_CELL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" class="w-full h-full">
    ${plate(600, 340)}
    <circle cx="200" cy="170" r="142" fill="#eef4fb" stroke="${LEAD}" stroke-width="2" stroke-dasharray="3 5"/>
    <circle cx="200" cy="170" r="116" fill="${CELL_F}" stroke="${CELL}" stroke-width="4"/>
    <circle cx="224" cy="196" r="28" fill="${CELL_D}"/>
    ${lead(404, 54, 292, 76)}
    <text x="410" y="59" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">jelly coat</text>
    ${lead(404, 122, 306, 122)}
    <text x="410" y="127" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">cell membrane</text>
    ${lead(404, 190, 280, 150)}
    <text x="410" y="195" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">cytoplasm</text>
    ${lead(404, 258, 244, 204)}
    <text x="410" y="263" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">nucleus</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · The menstrual cycle as a 28-day wheel. Day 1 is at the top and the days
//     run clockwise. `wheel(marks)` draws the ring; each mark is [from, to,
//     fill]. The numbers round the outside are written out by `dayNumbers`.
// ───────────────────────────────────────────────────────────────────────────
const CX = 240, CY = 214, R_OUT = 150, R_IN = 104
const at = (day, r) => {
  const a = ((day / 28) * 360 - 90) * (Math.PI / 180)
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}
const slice = (from, to, fill) => {
  const [x1, y1] = at(from - 1, R_OUT), [x2, y2] = at(to, R_OUT)
  const [x3, y3] = at(to, R_IN), [x4, y4] = at(from - 1, R_IN)
  const big = to - from + 1 > 14 ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R_OUT} ${R_OUT} 0 ${big} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} A ${R_IN} ${R_IN} 0 ${big} 0 ${x4.toFixed(1)} ${y4.toFixed(1)} Z" fill="${fill}"/>`
}
const spokes = () => {
  let out = ''
  for (let d = 0; d < 28; d += 1) {
    const [x1, y1] = at(d, R_IN), [x2, y2] = at(d, R_OUT)
    out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`
  }
  return `<g stroke="#ffffff" stroke-width="2">${out}</g>`
}
const dayNumbers = () => {
  let out = ''
  for (let d = 1; d <= 28; d += 1) {
    const [x, y] = at(d - 0.5, R_OUT + 16)
    out += `<text class="keep" x="${x.toFixed(1)}" y="${(y + 4.5).toFixed(1)}" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">${d}</text>`
  }
  return out
}
const wheel = (marks) => `${slice(1, 28, '#e2e8f0')}
    ${marks.map(([from, to, fill]) => slice(from, to, fill)).join('')}
    ${spokes()}
    <circle cx="${CX}" cy="${CY}" r="${R_OUT}" fill="none" stroke="${LEAD}" stroke-width="2"/>
    <circle cx="${CX}" cy="${CY}" r="${R_IN}" fill="none" stroke="${LEAD}" stroke-width="2"/>
    ${dayNumbers()}`

const MENSTRUAL_WHEEL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 430" class="w-full h-full">
    ${plate(480, 430)}
    ${wheel([[1, 5, RED_F], [6, 12, GREEN_F], [13, 16, AMBER_F], [17, 28, PURPLE_F]])}
    <text x="240" y="172" font-family="${FONT}" font-size="14.5" font-weight="700" fill="${RED}" text-anchor="middle">1–5  menstruation</text>
    <text x="240" y="198" font-family="${FONT}" font-size="14.5" font-weight="700" fill="${GREEN}" text-anchor="middle">6–12  lining repairs</text>
    <text x="240" y="224" font-family="${FONT}" font-size="14.5" font-weight="700" fill="${AMBER}" text-anchor="middle">13–16  ovulation</text>
    <text x="240" y="250" font-family="${FONT}" font-size="14.5" font-weight="700" fill="${PURPLE}" text-anchor="middle">17–28  lining thick</text>
    <text x="240" y="278" font-family="${FONT}" font-size="12.5" fill="${LEAD}" text-anchor="middle">then day 1 again</text>
  </svg>`

// Homework Q15 — the timeline the paper printed: only the period is marked.
const MENSTRUAL_WHEEL_Q = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 430" class="w-full h-full">
    ${plate(480, 430)}
    ${wheel([[1, 5, RED_F]])}
    <text x="240" y="204" font-family="${FONT}" font-size="14" font-weight="700" fill="${RED}" text-anchor="middle">menstruation (period)</text>
    <text x="240" y="226" font-family="${FONT}" font-size="14" font-weight="700" fill="${RED}" text-anchor="middle">days 1–5</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · A bacterium and a virus, for the difference in structure that homework
//     Q24 asks for. A virus is not a cell.
// ───────────────────────────────────────────────────────────────────────────
const BACTERIUM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
    ${plate(520, 300)}
    <rect x="40" y="84" width="270" height="140" rx="70" fill="#f1f5f9" stroke="${GREEN}" stroke-width="7"/>
    <rect x="50" y="94" width="250" height="120" rx="60" fill="${GREEN_F}" stroke="${AMBER}" stroke-width="3"/>
    <path d="M 120 154 C 120 126, 176 126, 176 150 C 176 176, 214 176, 214 152 C 214 130, 244 136, 236 160 C 228 184, 120 186, 120 154 Z" fill="none" stroke="${CELL_D}" stroke-width="3"/>
    <circle cx="92" cy="170" r="10" fill="none" stroke="${CELL_D}" stroke-width="2.5"/>
    <g fill="${LEAD}"><circle cx="86" cy="132" r="3"/><circle cx="104" cy="118" r="3"/><circle cx="150" cy="200" r="3"/><circle cx="200" cy="112" r="3"/><circle cx="256" cy="120" r="3"/><circle cx="270" cy="172" r="3"/><circle cx="250" cy="196" r="3"/><circle cx="190" cy="198" r="3"/></g>
    ${lead(352, 56, 270, 92)}
    <text x="358" y="61" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">cell wall</text>
    ${lead(352, 100, 296, 126)}
    <text x="358" y="105" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">cell membrane</text>
    ${lead(352, 144, 280, 150)}
    <text x="358" y="149" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">cytoplasm</text>
    ${lead(352, 188, 272, 172)}
    <text x="358" y="193" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">ribosomes</text>
    ${lead(352, 232, 224, 172)}
    <text x="358" y="237" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">loop of DNA</text>
    ${lead(352, 276, 98, 178)}
    <text x="358" y="281" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">plasmid</text>
  </svg>`

const VIRUS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
    ${plate(520, 300)}
    <path d="M 170 70 L 248 114 L 248 196 L 170 240 L 92 196 L 92 114 Z" fill="${AMBER_F}" stroke="${AMBER}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M 132 138 C 150 116, 166 176, 186 150 S 208 126, 214 160 C 218 184, 150 200, 138 176" fill="none" stroke="${PINK}" stroke-width="4" stroke-linecap="round"/>
    ${lead(352, 100, 244, 116)}
    <text x="358" y="105" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">protein coat</text>
    ${lead(352, 166, 208, 160)}
    <text x="358" y="171" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">genetic material</text>
    <text x="170" y="276" font-family="${FONT}" font-size="15" font-weight="700" fill="${KEY}" text-anchor="middle">not a cell — and far smaller</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Homework Q24(b) — "Fig. 5.2", redrawn from the description in the
//     question: people living with HIV, and people newly infected each year, in
//     sub-Saharan Africa, 1990–2010. The values follow the published UNAIDS
//     estimates closely enough to show the right shape; the paper's own graphs
//     were missing from the file.
//     Both panels: 13.5 px a year from 1990. Left: 7.6 px a million (0–25).
//     Right: 63.33 px a million (0–3).
// ───────────────────────────────────────────────────────────────────────────
const LIVING = [[1990, 6.0], [1992, 9.0], [1994, 12.5], [1996, 15.5], [1998, 18.0], [2000, 19.8], [2002, 20.8], [2004, 21.4], [2006, 21.8], [2008, 22.2], [2009, 22.5], [2010, 22.9]]
const NEWLY = [[1990, 1.3], [1992, 1.8], [1994, 2.3], [1996, 2.55], [1997, 2.6], [1998, 2.55], [2000, 2.4], [2002, 2.2], [2004, 2.1], [2006, 2.0], [2008, 1.9], [2009, 1.9], [2010, 1.8]]
const plot = (data, x0, per) => {
  const pts = data.map(([yr, v]) => [(x0 + (yr - 1990) * 13.5).toFixed(1), (250 - v * per).toFixed(1)])
  return `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
    ${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="${INK}"/>`).join('')}`
}
const frame = (x0, ys) => `<g stroke="${GRID}" stroke-width="1">
      ${ys.map((y) => `<line x1="${x0}" y1="${y}" x2="${x0 + 270}" y2="${y}"/>`).join('')}
      ${[67.5, 135, 202.5, 270].map((dx) => `<line x1="${x0 + dx}" y1="60" x2="${x0 + dx}" y2="250"/>`).join('')}
    </g>
    <line x1="${x0}" y1="60" x2="${x0}" y2="250" stroke="${INK}" stroke-width="2"/>
    <line x1="${x0}" y1="250" x2="${x0 + 270}" y2="250" stroke="${INK}" stroke-width="2"/>`

const HIV_GRAPHS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 326" class="w-full h-full">
    ${plate(740, 326)}
    <text x="205" y="30" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">Number of people living with HIV</text>
    <text x="565" y="30" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">Number of people newly infected</text>
    <text x="370" y="314" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${LEAD}" text-anchor="middle">sub-Saharan Africa, 1990–2010</text>
    ${frame(70, [60, 98, 136, 174, 212])}
    ${frame(430, [60, 123.3, 186.7])}
    <text x="62" y="254" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">0</text>
    <text x="62" y="216" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">5</text>
    <text x="62" y="178" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">10</text>
    <text x="62" y="140" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">15</text>
    <text x="62" y="102" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">20</text>
    <text x="62" y="64" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">25</text>
    <text x="422" y="254" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">0</text>
    <text x="422" y="190.7" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">1.0</text>
    <text x="422" y="127.3" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">2.0</text>
    <text x="422" y="64" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">3.0</text>
    <text x="70" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">1990</text>
    <text x="137.5" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">1995</text>
    <text x="205" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2000</text>
    <text x="272.5" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2005</text>
    <text x="340" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2010</text>
    <text x="430" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">1990</text>
    <text x="497.5" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">1995</text>
    <text x="565" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2000</text>
    <text x="632.5" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2005</text>
    <text x="700" y="268" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2010</text>
    <text x="205" y="288" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">year</text>
    <text x="565" y="288" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">year</text>
    <text x="-155" y="24" transform="rotate(-90)" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">millions of people</text>
    <text x="-155" y="384" transform="rotate(-90)" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">millions of people</text>
    ${plot(LIVING, 70, 7.6)}
    ${plot(NEWLY, 430, 63.33)}
  </svg>`

export const DIAGRAMS = {
  SPERM_CELL: SPERM_CELL,
  EGG_CELL: EGG_CELL,
  MENSTRUAL_WHEEL: MENSTRUAL_WHEEL,
  MENSTRUAL_WHEEL_Q: MENSTRUAL_WHEEL_Q,
  BACTERIUM: BACTERIUM,
  VIRUS: VIRUS,
  HIV_GRAPHS: HIV_GRAPHS,
}
