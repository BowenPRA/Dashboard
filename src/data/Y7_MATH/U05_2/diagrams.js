// src/data/Y7_MATH/U05_2/diagrams.js
// Teaching diagrams for 5.2 Intersecting lines, ported from the classroom deck
// (y7-math/U05_2/diagrams.js). The three that embed a photograph live in
// diagramsB.js (they need assetUrl).
//
// House rules: every diagram opens with a white plate, so it reads on a light
// OR dark slide; every <text> is written out literally — helpers draw shapes
// only, because `npm run audit:svg` cannot see text produced by a `${helper()}`
// call; split diagrams are 840×560, showcase strips 1120×440, vote cards 720×320.
// The deck's conventions hold: the F stands upright (the line across leans
// back, the angles sit under each arm) and the Z is never mirrored (top arm
// left, bottom arm right, the angles inside the corners). No diagram prints
// the answer to the question beside it. The diagrams stay in English.
//
//   Two lines    SAY_WHY      the answer, because, the reason (+ a letter c for
//                             the slide's check)
//                READ         a number, a letter, a small square, arrows
//   Parallel     ANS_F_A / ANS_F_B   vote: which angle is also 70°? (the
//                             classroom's voting hands removed)
//                SLIDE_DOWN   corresponding angles: slide it down, it fits
//                ANS_Z_A / ANS_Z_B   vote: between the lines, which is 70°?
//                Z_PROOF      alternate angles: the same place, then opposite
//                XFZ          X, F and Z (Draw This)
//   The book     PHRASES      the Workbook's question words
//                PRACTICE     48°, 75° and x, y, z between parallel lines
//                SHELVES      Mr Bowen's shelves: 90°, 82°, 90°
//                STATEMENTS   65° and x on two lines with no arrows (the
//                             deck's "no arrows" label removed)
//   The exit     EXIT_ROAD    one 65° and the seven letters a–g
//   The quiz     Q_X · Q_F · Q_Z · Q_NOARROWS · Q_SIDE · Q_THREE
//
// Dropped with their slides: PIC_X, PIC_TRACKS, PIC_ROAD (the goals slide),
// CROSS_Q (slide 8 now draws its own figure), PIZZA (the pizza problem).

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const PURPLE_T = '#f2ecf7'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const BLUE_T = '#e3eef9'
const WOOD = '#c8955c'
const WOOD_EDGE = '#8a5d2e'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const rad = (d) => (d * Math.PI) / 180
// A point at distance r from (cx, cy), at angle d degrees anticlockwise from east.
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))]
const f = (n) => n.toFixed(1)

// A filled sector from angle a1 round to a2 (anticlockwise, degrees).
const wedge = (cx, cy, r, a1, a2, fill, stroke = INK, sw = 2.5) => {
  const [x1, y1] = at(cx, cy, r, a1)
  const [x2, y2] = at(cx, cy, r, a2)
  const large = a2 - a1 > 180 ? 1 : 0
  return `<path d="M ${f(cx)} ${f(cy)} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} 0 ${f(x2)} ${f(y2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
}

const seg = (x1, y1, x2, y2, w = 5, color = INK) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`

// The open arrowhead that marks a pair of parallel lines, tip at (x, y), pointing along d.
const chevron = (x, y, d, color = INK, s = 16, w = 4) => {
  const [ax, ay] = at(x, y, s, d + 148)
  const [bx, by] = at(x, y, s, d - 148)
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(x)} ${f(y)} L ${f(bx)} ${f(by)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
}

// A right-angle box at (x, y) between directions d and d + 90.
const box = (x, y, d, s = 24, color = INK) => {
  const [ax, ay] = at(x, y, s, d)
  const [bx, by] = at(x, y, s * Math.SQRT2, d + 45)
  const [cx, cy] = at(x, y, s, d + 90)
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)}" fill="none" stroke="${color}" stroke-width="3"/>`
}

// The X, F or Z traced thick and pale under the lines.
const glow = (pts, color = KEY, w = 18) =>
  `<polyline points="${pts.map((p) => p.map(f).join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-opacity="0.3" stroke-linecap="round" stroke-linejoin="round"/>`

const dot = (x, y, color = INK, r = 5) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${color}"/>`

const parallelPair = (x1, x2, y1, y2, arrowX) => `${seg(x1, y1, x2, y1)}
    ${seg(x1, y2, x2, y2)}
    ${chevron(arrowX, y1, 0)}
    ${chevron(arrowX, y2, 0)}`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────



  // ── Two lines cross ───────────────────────────────────────────────────────

  SAY_WHY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(200, 230, 62, -20, 20, TEAL_T, TEAL, 3)}
    ${wedge(200, 230, 62, 160, 200, ORANGE_T, KEY, 3)}
    ${wedge(200, 230, 52, 20, 160, ORANGE_T, KEY, 3)}
    ${wedge(200, 230, 52, 200, 340, ORANGE_T, KEY, 3)}
    ${seg(35.6, 289.9, 364.4, 170.1)}
    ${seg(35.6, 170.1, 364.4, 289.9)}
    ${dot(200, 230, INK, 6)}
    <text x="300" y="242" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">40°</text>
    <text x="100" y="245" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="200" y="153" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">b</text>
    <text x="200" y="336" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">c</text>
    <text x="420" y="62" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">the answer</text>
    <text x="760" y="62" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">the reason</text>
    <line x1="400" y1="80" x2="1090" y2="80" stroke="#cfd8dc" stroke-width="2"/>
    <rect x="400" y="100" width="690" height="128" rx="14" fill="${ORANGE_T}"/>
    <text x="420" y="178" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}">a = 40°</text>
    <text x="600" y="176" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">because</text>
    <text x="760" y="156" font-family="${FONT}" font-size="26" fill="${INK}">they are vertically</text>
    <text x="760" y="194" font-family="${FONT}" font-size="26" fill="${INK}">opposite angles.</text>
    <rect x="400" y="248" width="690" height="128" rx="14" fill="${ORANGE_T}"/>
    <text x="420" y="326" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}">b = 140°</text>
    <text x="600" y="324" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">because</text>
    <text x="760" y="304" font-family="${FONT}" font-size="26" fill="${INK}">angles on a straight</text>
    <text x="760" y="342" font-family="${FONT}" font-size="26" fill="${INK}">line add up to 180°.</text>
    <text x="745" y="414" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">180° − 40° = 140°</text>
  </svg>`,


  READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(70, 280, 76, 0, 65, TEAL_T, TEAL, 3)}
    ${seg(70, 280, 250, 280, 4)}
    ${seg(70, 280, 150.3, 107.8, 4)}
    <text x="158" y="237" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}" text-anchor="middle">65°</text>
    <text x="150" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="middle">a number</text>
    <text x="150" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">We know this angle.</text>
    ${wedge(350, 280, 76, 0, 65, ORANGE_T, KEY, 3)}
    ${seg(350, 280, 530, 280, 4)}
    ${seg(350, 280, 430.3, 107.8, 4)}
    <text x="438" y="240" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="430" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">a letter</text>
    <text x="430" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">Find this angle.</text>
    ${seg(640, 280, 820, 280, 4)}
    ${seg(640, 280, 640, 110, 4)}
    ${box(640, 280, 0, 34)}
    <text x="715" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">a small square</text>
    <text x="715" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">This angle is 90°.</text>
    ${seg(880, 180, 1080, 140, 4)}
    ${seg(880, 262, 1080, 222, 4)}
    ${chevron(992, 157.6, 11.3, GREEN, 18, 4)}
    ${chevron(992, 239.6, 11.3, GREEN, 18, 4)}
    <text x="980" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">arrows</text>
    <text x="980" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">They are parallel.</text>
  </svg>`,


  // ── A line across two parallel lines ──────────────────────────────────────
  // The F stands upright: the line across leans back (110°), the top arm sits
  // at the top of the stem, the middle arm lower down, and the equal angles
  // sit under each arm.
  ANS_F_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(-115 0)">
    ${wedge(430, 100, 42, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(477.3, 230, 42, 290, 360, BLUE_T, BLUE, 3)}
    ${parallelPair(250, 700, 100, 230, 660)}
    ${seg(504.7, 305.2, 402.6, 24.8)}
    <text x="482" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="526" y="277" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
    </g>
  </svg>`,

  ANS_F_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(115 0)">
    ${wedge(200, 100, 42, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(247.3, 230, 42, 0, 110, BLUE_T, BLUE, 3)}
    ${parallelPair(20, 470, 100, 230, 430)}
    ${seg(274.7, 305.2, 172.6, 24.8)}
    <text x="252" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="282" y="194" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
    </g>
  </svg>`,

  SLIDE_DOWN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${glow([[570, 130], [360, 130], [469.2, 430]])}
    ${glow([[432.8, 330], [642.8, 330]])}
    ${wedge(360, 130, 56, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(432.8, 330, 56, 290, 360, ORANGE_T, KEY, 3)}
    ${parallelPair(60, 800, 130, 330, 750)}
    ${seg(338.2, 70, 472.8, 440)}
    ${dot(360, 130)}
    ${dot(432.8, 330)}
    <text x="427" y="188" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="500" y="388" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <path d="M 320.5 167.8 L 374.2 315.2" fill="none" stroke="${BLUE}" stroke-width="5" stroke-dasharray="12 9" stroke-linecap="round"/>
    <path d="M 380.4 332.1 L 365.7 318.3 L 382.7 312.1 Z" fill="${BLUE}"/>
    <text x="318" y="236" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="end">slide it</text>
    <text x="318" y="268" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="end">down</text>
    <text x="640" y="226" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">the same place</text>
    <text x="640" y="262" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">on each line</text>
    <text x="420" y="500" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">It fits: the angles are the same.</text>
    <text x="420" y="540" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">an F shape</text>
  </svg>`,

  // A true Z: the line across leans forward (70°), the top arm goes left, the
  // bottom arm goes right, and the equal angles sit inside the two corners.
  ANS_Z_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(-115 0)">
    ${wedge(500, 100, 42, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(452.7, 230, 42, 0, 70, BLUE_T, BLUE, 3)}
    ${parallelPair(250, 700, 100, 230, 660)}
    ${seg(425.3, 305.2, 527.4, 24.8)}
    <text x="448" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="502" y="208" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
    </g>
  </svg>`,

  ANS_Z_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(115 0)">
    ${wedge(270, 100, 42, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(222.7, 230, 42, 70, 180, BLUE_T, BLUE, 3)}
    ${parallelPair(20, 470, 100, 230, 430)}
    ${seg(195.3, 305.2, 297.4, 24.8)}
    <text x="218" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="188" y="200" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
    </g>
  </svg>`,

  Z_PROOF: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${glow([[202.8, 96], [402.8, 96], [330, 296], [530, 296]])}
    ${wedge(402.8, 96, 56, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(330, 296, 56, 180, 250, '#ffffff', MUTED, 2.5)}
    ${wedge(330, 296, 56, 0, 70, ORANGE_T, KEY, 3)}
    ${parallelPair(40, 800, 96, 296, 750)}
    ${seg(295.8, 390, 433.6, 11.4)}
    ${dot(402.8, 96)}
    ${dot(330, 296)}
    <text x="336" y="154" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="263" y="353" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">70°</text>
    <text x="397" y="260" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <circle cx="208" cy="344" r="17" fill="${MUTED}"/>
    <text x="208" y="352" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="452" cy="250" r="17" fill="${KEY}"/>
    <text x="452" y="258" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="40" y="444" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">1. The same place: 70° (corresponding)</text>
    <text x="40" y="484" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">2. Opposite that: 70° (vertically opposite)</text>
    <text x="40" y="530" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">So the two angles in the Z are equal.</text>
  </svg>`,

  XFZ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 748" class="w-full h-full">
    ${plate(840, 748)}
    <rect x="20" y="16" width="800" height="228" rx="18" fill="${TEAL_T}"/>
    ${wedge(175, 132, 46, -30, 30, ORANGE_T, KEY, 3)}
    ${wedge(175, 132, 46, 150, 210, ORANGE_T, KEY, 3)}
    ${seg(53.8, 202, 296.2, 62)}
    ${seg(53.8, 62, 296.2, 202)}
    ${dot(175, 132)}
    <text x="340" y="104" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">X</text>
    <text x="420" y="104" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">vertically opposite</text>
    <text x="420" y="152" font-family="${FONT}" font-size="30" fill="${INK}">angles are equal</text>

    <rect x="20" y="260" width="800" height="228" rx="18" fill="${PURPLE_T}"/>
    ${glow([[290, 300], [150, 300], [211.9, 470]], KEY, 16)}
    ${glow([[186.4, 400], [290, 400]], KEY, 16)}
    ${wedge(150, 300, 38, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(186.4, 400, 38, 290, 360, ORANGE_T, KEY, 3)}
    ${seg(40, 300, 310, 300)}
    ${seg(40, 400, 310, 400)}
    ${chevron(80, 300, 0)}
    ${chevron(80, 400, 0)}
    ${seg(139.8, 272, 215.5, 480)}
    <text x="340" y="350" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">F</text>
    <text x="420" y="350" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">corresponding</text>
    <text x="420" y="398" font-family="${FONT}" font-size="30" fill="${INK}">angles are equal</text>

    <rect x="20" y="504" width="800" height="228" rx="18" fill="${GREEN_T}"/>
    ${glow([[60, 548], [205, 548], [157.7, 678], [300, 678]], KEY, 16)}
    ${wedge(205, 548, 38, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(157.7, 678, 38, 0, 70, ORANGE_T, KEY, 3)}
    ${seg(40, 548, 310, 548)}
    ${seg(40, 678, 310, 678)}
    ${chevron(270, 548, 0)}
    ${chevron(270, 678, 0)}
    ${seg(144.6, 714, 216.6, 516)}
    <text x="340" y="596" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">Z</text>
    <text x="420" y="596" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">alternate</text>
    <text x="420" y="644" font-family="${FONT}" font-size="30" fill="${INK}">angles are equal</text>
  </svg>`,

  // ── The Workbook ──────────────────────────────────────────────────────────
  PHRASES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="40" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">The question says…</text>
    <text x="680" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">It means…</text>
    <line x1="30" y1="72" x2="1090" y2="72" stroke="#cfd8dc" stroke-width="2"/>
    <text x="40" y="118" font-family="${FONT}" font-size="25" fill="${INK}">Calculate the value of x.</text>
    <text x="680" y="118" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Find x.</text>
    <text x="40" y="186" font-family="${FONT}" font-size="25" fill="${INK}">Give a reason.</text>
    <text x="680" y="186" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Say the fact, after because.</text>
    <text x="40" y="254" font-family="${FONT}" font-size="25" fill="${INK}">Explain why…</text>
    <text x="680" y="254" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Show each step, and say why.</text>
    <text x="40" y="322" font-family="${FONT}" font-size="25" fill="${INK}">Which statement, A, B or C, is correct?</text>
    <text x="680" y="322" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Choose one, then say why.</text>
    <text x="40" y="390" font-family="${FONT}" font-size="25" fill="${INK}">You need more information.</text>
    <text x="680" y="390" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">The picture does not tell you.</text>
  </svg>`,

  PRACTICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(380, 150, 58, 180, 228, TEAL_T, TEAL, 3)}
    ${wedge(380, 150, 50, 228, 303, TEAL_T, TEAL, 3)}
    ${wedge(380, 150, 58, 303, 360, ORANGE_T, KEY, 3)}
    ${wedge(145.9, 410, 52, 0, 48, ORANGE_T, KEY, 3)}
    ${wedge(548.8, 410, 52, 123, 180, ORANGE_T, KEY, 3)}
    ${parallelPair(40, 800, 150, 410, 760)}
    ${seg(115.1, 444.2, 380, 150)}
    ${seg(573.9, 448.6, 380, 150)}
    ${dot(380, 150)}
    <text x="312" y="191" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">48°</text>
    <text x="373" y="244" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">75°</text>
    <text x="445" y="199" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="210" y="395" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">y</text>
    <text x="487" y="390" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">z</text>
  </svg>`,

  SHELVES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="124" y="60" width="26" height="460" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3"/>
    ${box(150, 162, 270, 26, INK)}
    ${wedge(150, 302, 52, 270, 352, ORANGE_T, KEY, 3)}
    ${box(150, 442, 270, 26, INK)}
    <rect x="150" y="150" width="560" height="12" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3"/>
    <rect x="150" y="290" width="560" height="12" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3" transform="rotate(8 150 302)"/>
    <rect x="150" y="430" width="560" height="12" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3"/>
    <text x="216" y="210" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">90°</text>
    <text x="214" y="356" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">82°</text>
    <text x="216" y="490" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">90°</text>
    <text x="745" y="166" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">A</text>
    <text x="745" y="390" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">B</text>
    <text x="745" y="446" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">C</text>
    <text x="137" y="34" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the side</text>
  </svg>`,

  STATEMENTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(440, 150, 56, 0, 65, TEAL_T, TEAL, 3)}
    ${wedge(323.4, 400, 56, 0, 65, ORANGE_T, KEY, 3)}
    ${seg(60, 150, 780, 150)}
    ${seg(60, 400, 780, 400)}
    ${seg(276.9, 499.7, 486.5, 50.3)}
    ${dot(440, 150)}
    ${dot(323.4, 400)}
    <text x="507" y="118" font-family="${FONT}" font-size="32" font-weight="bold" fill="${TEAL}" text-anchor="middle">65°</text>
    <text x="391" y="372" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
  </svg>`,


  // ── The exit: one angle, seven more ───────────────────────────────────────
  EXIT_ROAD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" class="w-full h-full">
    <rect x="0" y="0" width="600" height="440" rx="14" fill="#ffffff"/>
    <path d="M 342.9 128.0 L 376.9 128.0 A 34 34 0 0 0 357.3 97.2 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <line x1="18.0" y1="128.0" x2="582.0" y2="128.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="18.0" y1="312.0" x2="582.0" y2="312.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="205.8" y1="422.0" x2="394.2" y2="18.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <path d="M 57.3 120.1 L 70.0 128.0 L 57.3 135.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 57.3 304.1 L 70.0 312.0 L 57.3 319.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="342.9" cy="128.0" r="5" fill="#2b2b2b"/>
    <circle cx="257.1" cy="312.0" r="5" fill="#2b2b2b"/>
    <text x="409" y="96" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">65°</text>
    <text x="316" y="96" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">a</text>
    <text x="277" y="179" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">b</text>
    <text x="370" y="179" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">c</text>
    <text x="323" y="280" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">d</text>
    <text x="230" y="280" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">e</text>
    <text x="191" y="363" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">f</text>
    <text x="284" y="363" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">g</text>
      <text x="300" y="424" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">a road across two railway lines</text>
  </svg>`,

  // ── The quiz (assessment.js) ──────────────────────────────────────────────
  // Placed with the engine's own geometry (utils/anglePairGeom.js), so each
  // label clears both arms of its angle; the text is literal for audit:svg.
  Q_X: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" class="w-full h-full">
    <rect x="0" y="0" width="600" height="440" rx="14" fill="#ffffff"/>
    <path d="M 300.0 220.0 L 333.0 228.2 A 34 34 0 0 0 331.1 206.2 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <path d="M 300.0 220.0 L 267.0 211.8 A 34 34 0 0 0 268.9 233.8 Z" fill="#fdf1e3" stroke="#c25e12" stroke-width="3"/>
    <line x1="18.0" y1="149.7" x2="582.0" y2="290.3" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="18.0" y1="345.6" x2="582.0" y2="94.4" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <circle cx="300.0" cy="220.0" r="5" fill="#2b2b2b"/>
    <text x="397" y="221" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">38°</text>
    <text x="203" y="238" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">p</text>
  </svg>`,
  Q_F: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" class="w-full h-full">
    <rect x="0" y="0" width="600" height="440" rx="14" fill="#ffffff"/>
    <path d="M 270.1 128.0 L 280.6 160.3 A 34 34 0 0 0 304.1 128.0 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <path d="M 329.9 312.0 L 340.4 344.3 A 34 34 0 0 0 363.9 312.0 Z" fill="#fdf1e3" stroke="#c25e12" stroke-width="3"/>
    <line x1="18.0" y1="128.0" x2="582.0" y2="128.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="18.0" y1="312.0" x2="582.0" y2="312.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="365.6" y1="422.0" x2="234.4" y2="18.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <path d="M 57.3 120.1 L 70.0 128.0 L 57.3 135.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 57.3 304.1 L 70.0 312.0 L 57.3 319.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="270.1" cy="128.0" r="5" fill="#2b2b2b"/>
    <circle cx="329.9" cy="312.0" r="5" fill="#2b2b2b"/>
    <text x="328" y="179" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">72°</text>
    <text x="387" y="363" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">q</text>
  </svg>`,
  Q_Z: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" class="w-full h-full">
    <rect x="0" y="0" width="600" height="440" rx="14" fill="#ffffff"/>
    <path d="M 385.8 128.0 L 351.8 128.0 A 34 34 0 0 0 362.6 152.9 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <line x1="18.0" y1="128.0" x2="582.0" y2="128.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="18.0" y1="312.0" x2="582.0" y2="312.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="111.6" y1="422.0" x2="488.4" y2="18.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <path d="M 57.3 120.1 L 70.0 128.0 L 57.3 135.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 57.3 304.1 L 70.0 312.0 L 57.3 319.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="385.8" cy="128.0" r="5" fill="#2b2b2b"/>
    <circle cx="214.2" cy="312.0" r="5" fill="#2b2b2b"/>
    <text x="295" y="177" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">47°</text>
    <text x="305" y="282" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">r</text>
    <text x="197" y="281" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">p</text>
    <text x="123" y="361" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">s</text>
    <text x="232" y="362" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">q</text>
  </svg>`,
  Q_NOARROWS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" class="w-full h-full">
    <rect x="0" y="0" width="600" height="440" rx="14" fill="#ffffff"/>
    <path d="M 329.9 128.0 L 340.4 95.7 A 34 34 0 0 0 295.9 128.0 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <path d="M 270.1 312.0 L 280.6 279.7 A 34 34 0 0 0 236.1 312.0 Z" fill="#fdf1e3" stroke="#c25e12" stroke-width="3"/>
    <line x1="18.0" y1="128.0" x2="582.0" y2="128.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="18.0" y1="312.0" x2="582.0" y2="312.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="234.4" y1="422.0" x2="365.6" y2="18.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <circle cx="329.9" cy="128.0" r="5" fill="#2b2b2b"/>
    <circle cx="270.1" cy="312.0" r="5" fill="#2b2b2b"/>
    <text x="299" y="96" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">108°</text>
    <text x="240" y="280" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">y</text>
  </svg>`,
  Q_SIDE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" class="w-full h-full">
    <rect x="0" y="0" width="600" height="440" rx="14" fill="#ffffff"/>
    <path d="M 255.1 128.0 L 270.0 158.6 A 34 34 0 0 0 289.1 128.0 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <path d="M 344.9 312.0 L 378.9 312.0 A 34 34 0 0 0 330.0 281.4 Z" fill="#fdf1e3" stroke="#c25e12" stroke-width="3"/>
    <line x1="18.0" y1="128.0" x2="582.0" y2="128.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="18.0" y1="312.0" x2="582.0" y2="312.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="398.5" y1="422.0" x2="201.5" y2="18.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <path d="M 57.3 120.1 L 70.0 128.0 L 57.3 135.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 57.3 304.1 L 70.0 312.0 L 57.3 319.9" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="255.1" cy="128.0" r="5" fill="#2b2b2b"/>
    <circle cx="344.9" cy="312.0" r="5" fill="#2b2b2b"/>
    <text x="322" y="179" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">64°</text>
    <text x="371" y="280" font-family="${FONT}" font-size="26" font-weight="bold" fill="#c25e12" text-anchor="middle">t</text>
  </svg>`,
  Q_THREE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 470" class="w-full h-full">
    <rect x="0" y="0" width="600" height="470" rx="14" fill="#ffffff"/>
    <path d="M 327.2 117.0 L 319.6 150.1 A 34 34 0 0 0 361.2 117.0 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <path d="M 300.0 235.0 L 307.6 201.9 A 34 34 0 0 0 266.0 236.8 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <path d="M 272.8 353.0 L 306.8 353.0 A 34 34 0 0 0 280.4 319.9 Z" fill="#e2f2f6" stroke="#0087a8" stroke-width="3"/>
    <line x1="64.0" y1="117.0" x2="582.0" y2="117.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="64.0" y1="247.4" x2="582.0" y2="220.2" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="64.0" y1="353.0" x2="582.0" y2="353.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <line x1="249.9" y1="452.0" x2="350.1" y2="18.0" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>
    <circle cx="327.2" cy="117.0" r="5" fill="#2b2b2b"/>
    <circle cx="300.0" cy="235.0" r="5" fill="#2b2b2b"/>
    <circle cx="272.8" cy="353.0" r="5" fill="#2b2b2b"/>
    <text x="360" y="168" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">103°</text>
    <text x="267" y="205" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">106°</text>
    <text x="325" y="321" font-family="${FONT}" font-size="26" font-weight="bold" fill="#0087a8" text-anchor="middle">77°</text>
    <text x="38" y="127" font-family="${FONT}" font-size="28" font-weight="bold" fill="#1a5fa8" text-anchor="middle">A</text>
    <text x="38" y="259" font-family="${FONT}" font-size="28" font-weight="bold" fill="#1a5fa8" text-anchor="middle">B</text>
    <text x="38" y="363" font-family="${FONT}" font-size="28" font-weight="bold" fill="#1a5fa8" text-anchor="middle">C</text>
  </svg>`,
}

