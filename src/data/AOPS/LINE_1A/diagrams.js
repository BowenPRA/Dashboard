// src/data/AOPS/LINE_1A/diagrams.js
// Teaching diagrams for LINE_1A — Points, Distance & Midpoints.
//
// House rules (docs/svg-diagrams.md, and the QUAD_1A file this copies):
//  · every diagram opens with a white plate, so it reads on a light OR dark card;
//  · every <text> is written out LITERALLY with literal coordinates — helpers
//    emit shapes only, because `npm run audit:svg` cannot see text produced by
//    a `${helper(...)}` call. The shared tick labels are the TICKS block, which
//    the audit splices into each diagram that uses it;
//  · numbers, coordinates and equations are monospace; prose is the sans stack.
//
// ONE GRID, USED EVERYWHERE. Every coordinate picture in this unit sits on the
// same plane at the same scale, so two slides can be compared honestly:
//     x from −8 to 8, y from −7 to 7, 40 px per unit in BOTH directions,
//     origin at (360, 320) in a 720 × 640 viewBox.
// So X(x) = 360 + 40x and Y(y) = 320 − 40y — which is how every literal
// coordinate below was worked out. Equal scale matters: the unit is about
// lengths, and a squashed axis would make a 3-4-5 triangle look wrong.
//
// THE ARGUMENT, in order:
//   NUMBER_LINES   distance on a line is subtraction; halfway is the average
//   PLANE          the Cartesian plane named: axes, origin, quadrants, (3, 2)
//   XY_ORDER       (3, 2) and (2, 3) are different points — across comes first
//   DIST_TRIANGLE  A(−3, −5) to B(5, 1): across 8, up 6, straight line 10
//   PYTHAGORAS     a² + b² = c², the rule the triangle needs
//   DIST_ROOT      A(1, 1) to B(4, 3): across 3, up 2, and the exact answer √13
//   MIDPOINT       P(2, 4), Q(−7, −2): the midpoint is the average, (−5/2, 1)
//   EXTEND         Q is the midpoint of PT: take the same step again
//   SECTION        PT : TQ = 1 : 2 — T is one third of the way along

const INK = '#1e293b'
const MUTED = '#64748b'
const GRID = '#e2e8f0'
const PINK = '#be185d'
const PURPLE = '#7c3aed'
const AMBER = '#d97706'
const GREEN = '#16a34a'
const CYAN = '#0891b2'
const FAINT = '#94a3b8'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// ── The shared plane ───────────────────────────────────────────────────────
const U = 40
const OX = 360
const OY = 320
const X = (x) => OX + x * U
const Y = (y) => OY - y * U

/** Squared paper and the two axes, with arrowheads. Shapes only. */
const grid = () => {
  let s = ''
  for (let x = -8; x <= 8; x++) s += `<line x1="${X(x)}" y1="${Y(7)}" x2="${X(x)}" y2="${Y(-7)}" stroke="${GRID}" stroke-width="1"/>`
  for (let y = -7; y <= 7; y++) s += `<line x1="${X(-8)}" y1="${Y(y)}" x2="${X(8)}" y2="${Y(y)}" stroke="${GRID}" stroke-width="1"/>`
  s += `<line x1="${X(-8)}" y1="${OY}" x2="${X(8) + 6}" y2="${OY}" stroke="${INK}" stroke-width="2.4"/>`
  s += `<path d="M ${X(8) + 16} ${OY} l -12 -6 l 0 12 z" fill="${INK}"/>`
  s += `<line x1="${OX}" y1="${Y(-7)}" x2="${OX}" y2="${Y(7) - 6}" stroke="${INK}" stroke-width="2.4"/>`
  s += `<path d="M ${OX} ${Y(7) - 16} l -6 12 l 12 0 z" fill="${INK}"/>`
  return s
}

/** A segment between two grid points. */
const seg = (x1, y1, x2, y2, color, w = 3, dash = '') =>
  `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const dot = (x, y, color, r = 8) =>
  `<circle cx="${X(x)}" cy="${Y(y)}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="3"/>`

/** The little square that marks a right angle, at corner (x, y), opening towards (dx, dy). */
const rightAngle = (x, y, dx, dy) => {
  const cx = X(x)
  const cy = Y(y)
  const s = 16
  return `<path d="M ${cx + dx * s} ${cy} L ${cx + dx * s} ${cy - dy * s} L ${cx} ${cy - dy * s}" fill="none" stroke="${INK}" stroke-width="2"/>`
}

/** Tick labels every 2 units and the axis letters — literal, shared by every plane diagram. */
const TICKS = `<g font-family="${MONO}" font-size="19" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke">
    <text x="120" y="344" text-anchor="middle">−6</text>
    <text x="200" y="344" text-anchor="middle">−4</text>
    <text x="280" y="344" text-anchor="middle">−2</text>
    <text x="440" y="344" text-anchor="middle">2</text>
    <text x="520" y="344" text-anchor="middle">4</text>
    <text x="600" y="344" text-anchor="middle">6</text>
    <text x="350" y="86" text-anchor="end">6</text>
    <text x="350" y="166" text-anchor="end">4</text>
    <text x="350" y="246" text-anchor="end">2</text>
    <text x="350" y="406" text-anchor="end">−2</text>
    <text x="350" y="486" text-anchor="end">−4</text>
    <text x="350" y="566" text-anchor="end">−6</text>
    <text x="702" y="310" font-family="${FONT}" font-style="italic" font-weight="bold" fill="${INK}">x</text>
    <text x="374" y="30" font-family="${FONT}" font-style="italic" font-weight="bold" fill="${INK}">y</text>
  </g>`

/** Number-line geometry for NUMBER_LINES: −5 … 10, 40 px apart, 0 at x = 280. */
const NX = (n) => 280 + n * 40
const numberLine = (y) => {
  let s = `<line x1="52" y1="${y}" x2="708" y2="${y}" stroke="${INK}" stroke-width="2.4"/>`
  s += `<path d="M 44 ${y} l 12 -6 l 0 12 z" fill="${INK}"/><path d="M 716 ${y} l -12 -6 l 0 12 z" fill="${INK}"/>`
  for (let n = -5; n <= 10; n++) s += `<line x1="${NX(n)}" y1="${y - 8}" x2="${NX(n)}" y2="${y + 8}" stroke="${INK}" stroke-width="2"/>`
  return s
}
/** A bracket over a stretch of number line, from a to b, at height y. */
const bracket = (a, b, y, color) =>
  `<path d="M ${NX(a)} ${y + 12} L ${NX(a)} ${y} L ${NX(b)} ${y} L ${NX(b)} ${y + 12}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>`

export const DIAGRAMS = {
  // ---------------------------------------------------------------------------
  // Two number lines, −5 to 10. Top: −3 and 9 are 12 apart (9 − (−3)).
  // Bottom: halfway is 6 steps from each end, at 3 — which is also the average.
  // ---------------------------------------------------------------------------
  NUMBER_LINES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 560" class="w-full h-full">
    ${plate(720, 560)}
    <text x="40" y="52" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">How far apart are −3 and 9?</text>
    ${bracket(-3, 9, 116, PINK)}
    <text x="400" y="104" font-family="${MONO}" font-size="22" font-weight="bold" fill="${PINK}" text-anchor="middle">12 steps: 9 − (−3) = 12</text>
    ${numberLine(180)}
    <circle cx="160" cy="180" r="9" fill="${PINK}" stroke="#ffffff" stroke-width="3"/>
    <circle cx="640" cy="180" r="9" fill="${PINK}" stroke="#ffffff" stroke-width="3"/>
    <g font-family="${MONO}" font-size="19" fill="${INK}" text-anchor="middle">
      <text x="80" y="212">−5</text>
      <text x="120" y="212">−4</text>
      <text x="160" y="212" font-weight="bold" fill="${PINK}">−3</text>
      <text x="200" y="212">−2</text>
      <text x="240" y="212">−1</text>
      <text x="280" y="212">0</text>
      <text x="320" y="212">1</text>
      <text x="360" y="212">2</text>
      <text x="400" y="212">3</text>
      <text x="440" y="212">4</text>
      <text x="480" y="212">5</text>
      <text x="520" y="212">6</text>
      <text x="560" y="212">7</text>
      <text x="600" y="212">8</text>
      <text x="640" y="212" font-weight="bold" fill="${PINK}">9</text>
      <text x="680" y="212">10</text>
    </g>

    <text x="40" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">What number is halfway?</text>
    ${bracket(-3, 3, 368, AMBER)}
    ${bracket(3, 9, 368, AMBER)}
    <text x="280" y="356" font-family="${MONO}" font-size="22" font-weight="bold" fill="${AMBER}" text-anchor="middle">6</text>
    <text x="520" y="356" font-family="${MONO}" font-size="22" font-weight="bold" fill="${AMBER}" text-anchor="middle">6</text>
    ${numberLine(430)}
    <circle cx="160" cy="430" r="9" fill="${PINK}" stroke="#ffffff" stroke-width="3"/>
    <circle cx="640" cy="430" r="9" fill="${PINK}" stroke="#ffffff" stroke-width="3"/>
    <circle cx="400" cy="430" r="10" fill="${AMBER}" stroke="#ffffff" stroke-width="3"/>
    <g font-family="${MONO}" font-size="19" fill="${INK}" text-anchor="middle">
      <text x="80" y="462">−5</text>
      <text x="120" y="462">−4</text>
      <text x="160" y="462" font-weight="bold" fill="${PINK}">−3</text>
      <text x="200" y="462">−2</text>
      <text x="240" y="462">−1</text>
      <text x="280" y="462">0</text>
      <text x="320" y="462">1</text>
      <text x="360" y="462">2</text>
      <text x="400" y="462" font-weight="bold" fill="${AMBER}">3</text>
      <text x="440" y="462">4</text>
      <text x="480" y="462">5</text>
      <text x="520" y="462">6</text>
      <text x="560" y="462">7</text>
      <text x="600" y="462">8</text>
      <text x="640" y="462" font-weight="bold" fill="${PINK}">9</text>
      <text x="680" y="462">10</text>
    </g>
    <text x="360" y="522" font-family="${MONO}" font-size="23" font-weight="bold" fill="${AMBER}" text-anchor="middle">the average: (−3 + 9) ÷ 2 = 3</text>
  </svg>`,

  // ---------------------------------------------------------------------------
  // The plane, named. (3, 2) walked out from the origin: 3 right, then 2 up.
  // (−5, −3): 5 left, then 3 down. Quadrants numbered the book's way.
  // ---------------------------------------------------------------------------
  PLANE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    <g font-family="${FONT}" font-size="40" font-weight="bold" fill="#cbd5e1" text-anchor="middle">
      <text x="200" y="134">II</text>
      <text x="520" y="134">I</text>
      <text x="200" y="534">III</text>
      <text x="520" y="534">IV</text>
    </g>
    ${seg(0, 0, 3, 0, AMBER, 5)}
    ${seg(3, 0, 3, 2, GREEN, 5)}
    ${seg(0, 0, -5, 0, AMBER, 5)}
    ${seg(-5, 0, -5, -3, GREEN, 5)}
    ${dot(0, 0, INK, 7)}
    ${dot(3, 2, PINK, 9)}
    ${dot(-5, -3, PINK, 9)}
    <g font-family="${FONT}" font-size="18" font-weight="bold" stroke="#ffffff" stroke-width="4.5" paint-order="stroke">
      <text x="420" y="306" fill="${AMBER}" text-anchor="middle">3 right</text>
      <text x="492" y="286" fill="${GREEN}">2 up</text>
      <text x="260" y="306" fill="${AMBER}" text-anchor="middle">5 left</text>
      <text x="148" y="386" fill="${GREEN}" text-anchor="end">3 down</text>
      <text x="372" y="306" fill="${INK}">origin</text>
      <text x="676" y="306" fill="${INK}" text-anchor="end">x-axis</text>
      <text x="372" y="66" fill="${INK}">y-axis</text>
    </g>
    <g font-family="${MONO}" font-size="22" font-weight="bold" fill="${PINK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="494" y="230">(3, 2)</text>
      <text x="160" y="474" text-anchor="middle">(−5, −3)</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // (3, 2) and (2, 3): the same two numbers, two different points. The first
  // number is always the move ACROSS.
  // ---------------------------------------------------------------------------
  XY_ORDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(0, 0, 3, 0, PINK, 4, '8 6')}
    ${seg(3, 0, 3, 2, PINK, 4, '8 6')}
    ${seg(0, 0, 2, 0, PURPLE, 4)}
    ${seg(2, 0, 2, 3, PURPLE, 4)}
    ${dot(3, 2, PINK, 9)}
    ${dot(2, 3, PURPLE, 9)}
    <g font-family="${MONO}" font-size="22" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="494" y="250" fill="${PINK}">(3, 2)</text>
      <text x="452" y="190" fill="${PURPLE}">(2, 3)</text>
    </g>
    <g font-family="${FONT}" font-size="20" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="400" y="442" fill="${PINK}">(3, 2): 3 across, 2 up</text>
      <text x="400" y="482" fill="${PURPLE}">(2, 3): 2 across, 3 up</text>
      <text x="400" y="534" fill="${INK}">Across first. Always.</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Problem 8.4. A(−3, −5), B(5, 1). The path across then up turns the gap
  // into a right triangle with corner C(5, −5): legs 8 and 6, so AB = 10.
  // ---------------------------------------------------------------------------
  DIST_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-3, -5, 5, -5, AMBER, 5)}
    ${seg(5, -5, 5, 1, GREEN, 5)}
    ${seg(-3, -5, 5, 1, CYAN, 5)}
    ${rightAngle(5, -5, -1, 1)}
    ${dot(-3, -5, PINK, 9)}
    ${dot(5, 1, PINK, 9)}
    ${dot(5, -5, PURPLE, 8)}
    <g font-family="${MONO}" font-size="23" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="228" y="556" fill="${PINK}" text-anchor="end">A(−3, −5)</text>
      <text x="574" y="272" fill="${PINK}">B(5, 1)</text>
      <text x="574" y="552" fill="${PURPLE}">C(5, −5)</text>
      <text x="440" y="552" fill="${AMBER}" text-anchor="middle">across 8</text>
      <text x="574" y="406" fill="${GREEN}">up 6</text>
      <text x="300" y="424" fill="${CYAN}" text-anchor="end">AB = ?</text>
    </g>
    <g font-family="${MONO}" font-size="23" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="56" y="84">AB² = 8² + 6² = 100</text>
      <text x="56" y="120">AB = 10</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // The Pythagorean Theorem, on its own: legs a and b, longest side c.
  // ---------------------------------------------------------------------------
  PYTHAGORAS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    <text x="360" y="112" font-family="${MONO}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">a² + b² = c²</text>
    <path d="M 160 500 L 160 200 L 560 500 Z" fill="#f0fdf4" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <line x1="160" y1="200" x2="560" y2="500" stroke="${CYAN}" stroke-width="7" stroke-linecap="round"/>
    <path d="M 160 474 L 186 474 L 186 500" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <text x="360" y="548" font-family="${MONO}" font-size="36" font-weight="bold" fill="${AMBER}" text-anchor="middle">a</text>
    <text x="130" y="362" font-family="${MONO}" font-size="36" font-weight="bold" fill="${GREEN}" text-anchor="end">b</text>
    <text x="386" y="334" font-family="${MONO}" font-size="36" font-weight="bold" fill="${CYAN}">c</text>
    <text x="360" y="604" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">c is the longest side, opposite the right angle</text>
  </svg>`,

  // ---------------------------------------------------------------------------
  // A(1, 1) to B(4, 3): across 3, up 2, AB² = 13. Not a whole number, so the
  // exact answer is √13 — the decimal is only close.
  // ---------------------------------------------------------------------------
  DIST_ROOT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(1, 1, 4, 1, AMBER, 5)}
    ${seg(4, 1, 4, 3, GREEN, 5)}
    ${seg(1, 1, 4, 3, CYAN, 5)}
    ${rightAngle(4, 1, -1, 1)}
    ${dot(1, 1, PINK, 9)}
    ${dot(4, 3, PINK, 9)}
    <g font-family="${MONO}" font-size="23" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="392" y="306" fill="${PINK}" text-anchor="end">A(1, 1)</text>
      <text x="534" y="192" fill="${PINK}">B(4, 3)</text>
      <text x="460" y="304" fill="${AMBER}" text-anchor="middle">3</text>
      <text x="534" y="248" fill="${GREEN}">2</text>
      <text x="446" y="224" fill="${CYAN}" text-anchor="end">√13</text>
    </g>
    <g font-family="${MONO}" font-size="23" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="56" y="452">AB² = 3² + 2² = 13</text>
      <text x="56" y="490">AB = √13</text>
      <text x="56" y="528" fill="${MUTED}">≈ 3.61 — close, not exact</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Problem 8.13(a). P(2, 4), Q(−7, −2). The midpoint M is the average of the
  // two points: (−5/2, 1). It need not be a lattice point.
  // ---------------------------------------------------------------------------
  MIDPOINT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(2, 4, -7, -2, CYAN, 5)}
    ${dot(2, 4, PINK, 9)}
    ${dot(-7, -2, PINK, 9)}
    ${dot(-2.5, 1, AMBER, 10)}
    <g font-family="${MONO}" font-size="23" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="454" y="152" fill="${PINK}">P(2, 4)</text>
      <text x="80" y="434" fill="${PINK}" text-anchor="middle">Q(−7, −2)</text>
      <text x="246" y="266" fill="${AMBER}" text-anchor="end">M(−5/2, 1)</text>
    </g>
    <g font-family="${MONO}" font-size="20" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="392" y="470">x: (2 + (−7)) ÷ 2 = −5/2</text>
      <text x="392" y="508">y: (4 + (−2)) ÷ 2 = 1</text>
    </g>
    <text x="392" y="552" font-family="${FONT}" font-size="20" font-weight="bold" fill="${AMBER}" stroke="#ffffff" stroke-width="5" paint-order="stroke">halfway = the average</text>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Exercise 8.3.3(b), on this unit's grid. Q(1, 1) is the midpoint of PT with
  // P(4, −3): the step from P to Q is (−3, +4), so T is one more such step on,
  // at (−2, 5).
  // ---------------------------------------------------------------------------
  EXTEND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(4, -3, 1, 1, CYAN, 5)}
    ${seg(1, 1, -2, 5, CYAN, 5, '10 8')}
    ${dot(4, -3, PINK, 9)}
    ${dot(1, 1, AMBER, 9)}
    ${dot(-2, 5, PURPLE, 10)}
    <g font-family="${MONO}" font-size="23" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="534" y="450" fill="${PINK}">P(4, −3)</text>
      <text x="414" y="300" fill="${AMBER}">Q(1, 1)</text>
      <text x="268" y="112" fill="${PURPLE}" text-anchor="end">T(−2, 5)</text>
      <text x="480" y="364" fill="${CYAN}">3 left, 4 up</text>
      <text x="324" y="208" fill="${CYAN}" text-anchor="end">the same again</text>
    </g>
    <text x="56" y="560" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">Q is halfway, so T is one more step on.</text>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Problem 8.13(b). P(2, 4) to Q(−7, −2) cut into three equal steps of
  // (−3, −2). T, with PT : TQ = 1 : 2, is after the first step: (−1, 2).
  // ---------------------------------------------------------------------------
  SECTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(2, 4, -1, 2, PURPLE, 7)}
    ${seg(-1, 2, -7, -2, CYAN, 5)}
    ${dot(2, 4, PINK, 9)}
    ${dot(-7, -2, PINK, 9)}
    ${dot(-4, 0, FAINT, 7)}
    ${dot(-1, 2, PURPLE, 10)}
    <g font-family="${MONO}" font-size="23" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="454" y="152" fill="${PINK}">P(2, 4)</text>
      <text x="80" y="434" fill="${PINK}" text-anchor="middle">Q(−7, −2)</text>
      <text x="306" y="228" fill="${PURPLE}" text-anchor="end">T(−1, 2)</text>
      <text x="392" y="214" fill="${PURPLE}">1 part</text>
      <text x="164" y="344" fill="${CYAN}" text-anchor="end">2 parts</text>
    </g>
    <g font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="384" y="470">PT : TQ = 1 : 2, so T is</text>
      <text x="384" y="502">1/3 of the way from P to Q.</text>
      <text x="384" y="546" font-family="${MONO}">x: 2 + (−9) ÷ 3 = −1</text>
      <text x="384" y="580" font-family="${MONO}">y: 4 + (−6) ÷ 3 = 2</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // QUIZ: four points made of the same two numbers, 2 and 3, with signs and
  // order changed — P(2, −3), Q(−3, 2), R(3, 2), S(−2, −3). No coordinates
  // written: reading them is the question.
  // ---------------------------------------------------------------------------
  QZ_POINTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${dot(2, -3, PINK, 9)}
    ${dot(-3, 2, PINK, 9)}
    ${dot(3, 2, PINK, 9)}
    ${dot(-2, -3, PINK, 9)}
    <g font-family="${FONT}" font-size="26" font-weight="bold" fill="${PINK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="454" y="428">P</text>
      <text x="254" y="228">Q</text>
      <text x="494" y="228">R</text>
      <text x="294" y="428">S</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // QUIZ: a bare segment from (−3, −2) to (3, 6). No triangle drawn — building
  // it (across 6, up 8) is the student's job. The answer is 10.
  // ---------------------------------------------------------------------------
  QZ_SEGMENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-3, -2, 3, 6, CYAN, 5)}
    ${dot(-3, -2, PINK, 9)}
    ${dot(3, 6, PINK, 9)}
    <g font-family="${MONO}" font-size="23" font-weight="bold" fill="${PINK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="240" y="434" text-anchor="middle">(−3, −2)</text>
      <text x="496" y="76">(3, 6)</text>
    </g>
  </svg>`,
}
