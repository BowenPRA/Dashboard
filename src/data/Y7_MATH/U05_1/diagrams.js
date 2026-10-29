// src/data/Y7_MATH/U05_1/diagrams.js
// Teaching diagrams for 5.1 A sum of 360°, ported from the classroom deck
// (lessons/content/y7-math/U05_1/diagrams.js) with one new drawing,
// STRAIGHT_Q. Every diagram opens with a white plate; every <text> is
// written out literally (`npm run audit:svg` cannot see text made by a
// helper); `split` diagrams are 840×560, `showcase` strips 1120×440. The
// classroom's are not drawn to scale; STRAIGHT_Q is, on purpose.
//
//   FACTS_Q    right angle, straight line, full turn, triangle — numbers hidden (the starter)
//   READ       how to read an angle: a number, a letter, a small square, °
//   LINE       130° and a on a straight line
//   STRAIGHT_Q 57° and 121°, drawn true: it looks straight (new)
//   POINT      100°, 120° and b round a point
//   SUM_SOME   sum and some sound the same
//   QUADS      six quadrilaterals, named
//   TEAR       draw, tear off the corners, put the points together — ?
//   WORKED     70°, 95°, 120° and d
//   PARA       a parallelogram with one angle given

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const TEAL_T = '#e2f2f6'
const PURPLE_T = '#f2ecf7'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const SLATE_T = '#eef1f4'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const rad = (d) => (d * Math.PI) / 180
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))]
const f = (n) => n.toFixed(1)

const wedge = (cx, cy, r, a1, a2, fill, stroke = INK) => {
  const [x1, y1] = at(cx, cy, r, a1)
  const [x2, y2] = at(cx, cy, r, a2)
  const large = a2 - a1 > 180 ? 1 : 0
  return `<path d="M ${cx} ${cy} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} 0 ${f(x2)} ${f(y2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
}

const span = (P, A, B) => {
  const ang = (Q) => (Math.atan2(-(Q[1] - P[1]), Q[0] - P[0]) * 180) / Math.PI
  let a1 = ang(A)
  let d = (ang(B) - a1 + 360) % 360
  if (d > 180) {
    a1 = ang(B)
    d = 360 - d
  }
  return { a1, d }
}

const corner = (P, A, B, r, fill) => {
  const { a1, d } = span(P, A, B)
  return wedge(P[0], P[1], r, a1, a1 + d, fill)
}

const tornCorners = (Q, r, fills) =>
  Q.map((P, i) => {
    const { a1, d } = span(P, Q[(i + 3) % 4], Q[(i + 1) % 4])
    const [ox, oy] = at(0, 0, -30, a1 + d / 2)
    const [x1, y1] = at(P[0], P[1], r, a1)
    const [x2, y2] = at(P[0], P[1], r, a1 + d)
    return `<path d="M ${f(x1)} ${f(y1)} A ${r} ${r} 0 0 0 ${f(x2)} ${f(y2)}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="7 6"/>
      <g transform="translate(${f(ox)} ${f(oy)})">${wedge(P[0], P[1], r, a1, a1 + d, fills[i])}</g>`
  }).join('\n      ')

const scattered = (cx, cy, fills) =>
  [78.8, 98, 90, 93.2]
    .map((d, i) => {
      const dir = 45 + 90 * i
      const [vx, vy] = at(cx, cy, 34, dir)
      return wedge(Math.round(vx), Math.round(vy), 58, dir - d / 2, dir + d / 2, fills[i])
    })
    .join('\n    ')

const poly = (pts, fill = SLATE_T) =>
  `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`

const ray = (x1, y1, x2, y2) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`

const box = (P, u, v, s = 22) =>
  `<path d="M ${P[0] + u[0] * s} ${P[1] + u[1] * s} L ${P[0] + (u[0] + v[0]) * s} ${P[1] + (u[1] + v[1]) * s} L ${P[0] + v[0] * s} ${P[1] + v[1] * s}" fill="none" stroke="${INK}" stroke-width="2.5"/>`

const CQ = [[90, 350], [170, 90], [420, 130], [380, 380]]
const WQ = [[120, 450], [230, 130], [650, 160], [720, 450]]
const PQ = [[150, 420], [300, 150], [720, 150], [570, 420]]
const wedges = (Q, r, fills) => Q.map((p, i) => corner(p, Q[(i + 3) % 4], Q[(i + 1) % 4], r, fills[i])).join('\n    ')

export const DIAGRAMS = {
  FACTS_Q: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(80, 300, 70, 0, 90, TEAL_T)}
    ${ray(80, 300, 230, 300)}
    ${ray(80, 300, 80, 130)}
    ${box([80, 300], [1, 0], [0, -1], 30)}
    <text x="140" y="390" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">?</text>
    <text x="140" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a right angle</text>
    ${wedge(410, 300, 70, 0, 180, PURPLE_T)}
    ${ray(300, 300, 520, 300)}
    <circle cx="410" cy="300" r="5" fill="${INK}"/>
    <text x="410" y="390" font-family="${FONT}" font-size="34" font-weight="bold" fill="${PURPLE}" text-anchor="middle">?</text>
    <text x="410" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a straight line</text>
    ${wedge(690, 250, 85, 0, 359.9, ORANGE_T)}
    ${ray(690, 250, 775, 250)}
    <circle cx="690" cy="250" r="5" fill="${INK}"/>
    <text x="690" y="390" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <text x="690" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a full turn</text>
    ${poly([[870, 320], [1060, 320], [940, 140]], GREEN_T)}
    <text x="965" y="390" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">?</text>
    <text x="965" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a triangle</text>
  </svg>`,

  READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(60, 270, 70, 0, 60, TEAL_T)}
    ${ray(60, 270, 250, 270)}
    ${ray(60, 270, 155, 105.5)}
    <text x="150" y="238" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}" text-anchor="middle">60°</text>
    <text x="150" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="middle">a number</text>
    <text x="150" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">We know this angle.</text>
    ${wedge(340, 270, 70, 0, 60, ORANGE_T)}
    ${ray(340, 270, 530, 270)}
    ${ray(340, 270, 435, 105.5)}
    <text x="425" y="240" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="430" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">a letter</text>
    <text x="430" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">Find this angle.</text>
    ${ray(640, 270, 820, 270)}
    ${ray(640, 270, 640, 100)}
    ${box([640, 270], [1, 0], [0, -1], 34)}
    <text x="715" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">a small square</text>
    <text x="715" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">This angle is 90°.</text>
    <text x="975" y="250" font-family="${FONT}" font-size="110" font-weight="bold" fill="${GREEN}" text-anchor="middle">°</text>
    <text x="975" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">degrees</text>
    <text x="975" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">60° = 60 degrees</text>
  </svg>`,

  LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(420, 380, 80, 0, 50, ORANGE_T)}
    ${wedge(420, 380, 62, 50, 180, TEAL_T)}
    ${ray(80, 380, 760, 380)}
    ${ray(420, 380, 612.8, 150.2)}
    <circle cx="420" cy="380" r="6" fill="${INK}"/>
    <text x="530" y="352" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="368" y="296" font-family="${FONT}" font-size="40" font-weight="bold" fill="${TEAL}" text-anchor="middle">130°</text>
    <text x="420" y="470" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">a straight line</text>
  </svg>`,

  STRAIGHT_Q: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(420, 360, 74, 0, 57, ORANGE_T)}
    ${wedge(420, 360, 58, 57, 178, TEAL_T)}
    ${ray(420, 360, 760, 360)}
    ${ray(420, 360, 80.2, 348.1)}
    ${ray(420, 360, 561.6, 141.9)}
    <circle cx="420" cy="360" r="6" fill="${INK}"/>
    <text x="520" y="322" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">57°</text>
    <text x="368" y="288" font-family="${FONT}" font-size="38" font-weight="bold" fill="${TEAL}" text-anchor="middle">121°</text>
    <text x="58" y="338" font-family="${FONT}" font-size="34" font-weight="bold" font-style="italic" fill="${MUTED}" text-anchor="middle">X</text>
    <text x="786" y="372" font-family="${FONT}" font-size="34" font-weight="bold" font-style="italic" fill="${MUTED}" text-anchor="middle">Y</text>
    <text x="420" y="470" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">Is XY a straight line?</text>
  </svg>`,

  POINT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(420, 290, 62, 20, 120, TEAL_T)}
    ${wedge(420, 290, 62, 120, 240, PURPLE_T)}
    ${wedge(420, 290, 80, 240, 380, ORANGE_T)}
    ${ray(420, 290, 626.7, 214.8)}
    ${ray(420, 290, 310, 99.5)}
    ${ray(420, 290, 310, 480.5)}
    <circle cx="420" cy="290" r="6" fill="${INK}"/>
    <text x="458" y="200" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}" text-anchor="middle">100°</text>
    <text x="300" y="302" font-family="${FONT}" font-size="36" font-weight="bold" fill="${PURPLE}" text-anchor="middle">120°</text>
    <text x="490" y="375" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">b</text>
    <text x="640" y="470" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">round a point</text>
  </svg>`,

  SUM_SOME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="66" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">They sound the same.</text>
    <rect x="50" y="110" width="740" height="180" rx="16" fill="${SLATE_T}" stroke="${MUTED}" stroke-width="2"/>
    <text x="90" y="200" font-family="${FONT}" font-size="64" font-weight="bold" fill="${MUTED}">some</text>
    <text x="290" y="192" font-family="${FONT}" font-size="32" fill="${INK}">Can I have some rice?</text>
    <text x="290" y="240" font-family="${FONT}" font-size="24" fill="${MUTED}">everyday English</text>
    <rect x="50" y="330" width="740" height="180" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <text x="90" y="420" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">sum</text>
    <text x="290" y="412" font-family="${FONT}" font-size="32" fill="${INK}">The sum of 3, 4 and 5 is 12.</text>
    <text x="290" y="460" font-family="${FONT}" font-size="24" fill="${KEY}">maths: add them all</text>
  </svg>`,

  QUADS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly([[80, 80], [220, 80], [220, 220], [80, 220]], TEAL_T)}
    <text x="150" y="262" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">square</text>
    ${poly([[320, 95], [520, 95], [520, 205], [320, 205]], TEAL_T)}
    <text x="420" y="262" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">rectangle</text>
    ${poly([[610, 205], [650, 95], [800, 95], [760, 205]], PURPLE_T)}
    <text x="705" y="262" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">parallelogram</text>
    ${poly([[150, 310], [80, 370], [150, 480], [220, 370]], GREEN_T)}
    <text x="150" y="522" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">kite</text>
    ${poly([[330, 470], [370, 340], [470, 340], [510, 470]], ORANGE_T)}
    <text x="420" y="522" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">trapezium</text>
    ${poly([[620, 460], [650, 345], [790, 325], [760, 480]], SLATE_T)}
    <text x="705" y="522" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">any 4 sides</text>
  </svg>`,

  TEAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <g transform="translate(-4 24) scale(0.75)">
      ${poly(CQ)}
      ${wedges(CQ, 48, [TEAL_T, PURPLE_T, ORANGE_T, GREEN_T])}
    </g>
    <text x="109" y="264" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="middle">a</text>
    <text x="152" y="145" font-family="${FONT}" font-size="28" font-weight="bold" fill="${PURPLE}" text-anchor="middle">b</text>
    <text x="268" y="161" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">c</text>
    <text x="248" y="274" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">d</text>
    <g transform="translate(369 24) scale(0.75)">
      ${poly(CQ, '#ffffff')}
      ${tornCorners(CQ, 48, [TEAL_T, PURPLE_T, ORANGE_T, GREEN_T])}
    </g>
    ${scattered(933, 200, [TEAL_T, PURPLE_T, ORANGE_T, GREEN_T])}
    <circle cx="933" cy="200" r="6" fill="${INK}"/>
    <text x="933" y="325" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <circle cx="40" cy="44" r="22" fill="${INK}"/>
    <text x="40" y="53" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="413" cy="44" r="22" fill="${INK}"/>
    <text x="413" y="53" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <circle cx="786" cy="44" r="22" fill="${INK}"/>
    <text x="786" y="53" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="187" y="395" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Draw. Mark the corners.</text>
    <text x="560" y="395" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Tear off the corners.</text>
    <text x="933" y="395" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Put the points together.</text>
  </svg>`,

  WORKED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly(WQ)}
    ${wedges(WQ, 50, [TEAL_T, TEAL_T, TEAL_T, ORANGE_T])}
    <text x="198" y="414" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">70°</text>
    <text x="292" y="218" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">95°</text>
    <text x="582" y="244" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">120°</text>
    <text x="660" y="418" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">d</text>
  </svg>`,

  PARA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly(PQ)}
    ${wedges(PQ, 50, [TEAL_T, ORANGE_T, TEAL_T, ORANGE_T])}
    <text x="234" y="384" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">65°</text>
    <text x="337" y="222" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">p</text>
    <text x="638" y="217" font-family="${FONT}" font-size="38" font-weight="bold" fill="${TEAL}" text-anchor="middle">q</text>
    <text x="533" y="368" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">r</text>
    <text x="420" y="505" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">a parallelogram</text>
  </svg>`,
}
