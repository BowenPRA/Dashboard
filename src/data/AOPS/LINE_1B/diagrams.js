// src/data/AOPS/LINE_1B/diagrams.js
// Teaching diagrams for LINE_1B — Graphing Lines & Slope.
//
// House rules as LINE_1A: a white plate first; every <text> literal, with
// literal coordinates (the shared tick labels are the TICKS block, which
// `npm run audit:svg` splices into each diagram that uses it); numbers and
// equations in monospace.
//
// ONE GRID, USED EVERYWHERE — the same plane as LINE_1A, so slopes on two
// slides can be compared by eye:
//     x from −8 to 8, y from −7 to 7, 40 px per unit in BOTH directions,
//     origin at (360, 320) in a 720 × 640 viewBox,
//     X(x) = 360 + 40x and Y(y) = 320 − 40y.
// Equal scale is the point of this unit: a slope of 1 has to LOOK like 45°.
// The two small compare-column pictures (SIGN_UP, SIGN_DOWN) use a 400 × 400
// plane, x and y from −4 to 4, origin (200, 200), same 40 px unit.
//
// THE ARGUMENT, in order:
//   HOPS_LINE     Hopsalot's hops — the same move every time — land on a line,
//                 and that line is y = 2x − 6
//   SLOPE_STEPS   x − 2y = 8: every pair of points gives rise ÷ run = 1/2
//   SIGN_UP       a positive slope climbs left to right
//   SIGN_DOWN     a negative slope falls left to right
//   FLAT_UPRIGHT  slope 0 (y = 5) and an undefined slope (x = −4)
//   STEEPNESS     slopes 1/4, 1 and 4 through the origin
//   WALK_SLOPE    one point and a slope: from (−3, 1), 4 right and 1 down
//   QZ_THREE      quiz: three lines to match with their slopes
//   QZ_READ       quiz: read a slope off the grid

const INK = '#1e293b'
const MUTED = '#64748b'
const GRID = '#e2e8f0'
const PINK = '#be185d'
const PURPLE = '#7c3aed'
const AMBER = '#d97706'
const GREEN = '#16a34a'
const CYAN = '#0891b2'
const BLUE = '#2563eb'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// ── The shared plane ───────────────────────────────────────────────────────
const U = 40
const OX = 360
const OY = 320
const X = (x) => OX + x * U
const Y = (y) => OY - y * U

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
const seg = (x1, y1, x2, y2, color, w = 3, dash = '') =>
  `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
const dot = (x, y, color, r = 8) =>
  `<circle cx="${X(x)}" cy="${Y(y)}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="3"/>`

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

// ── The small plane (compare columns) ──────────────────────────────────────
const sx = (x) => 200 + x * 40
const sy = (y) => 200 - y * 40
const smallGrid = () => {
  let s = ''
  for (let v = -4; v <= 4; v++) {
    s += `<line x1="${sx(v)}" y1="${sy(4)}" x2="${sx(v)}" y2="${sy(-4)}" stroke="${GRID}" stroke-width="1"/>`
    s += `<line x1="${sx(-4)}" y1="${sy(v)}" x2="${sx(4)}" y2="${sy(v)}" stroke="${GRID}" stroke-width="1"/>`
  }
  s += `<line x1="${sx(-4)}" y1="200" x2="${sx(4)}" y2="200" stroke="${INK}" stroke-width="2.4"/>`
  s += `<line x1="200" y1="${sy(-4)}" x2="200" y2="${sy(4)}" stroke="${INK}" stroke-width="2.4"/>`
  return s
}
const sseg = (x1, y1, x2, y2, color, w = 3, dash = '') =>
  `<line x1="${sx(x1)}" y1="${sy(y1)}" x2="${sx(x2)}" y2="${sy(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
const sdot = (x, y, color, r = 8) =>
  `<circle cx="${sx(x)}" cy="${sy(y)}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="3"/>`

export const DIAGRAMS = {
  // ---------------------------------------------------------------------------
  // Hopsalot hops 1 right and 2 up, over and over, starting at (0, −6). Every
  // landing point is on one straight line, y = 2x − 6. The first three hops
  // are drawn as their two moves; the table is the student's own.
  // ---------------------------------------------------------------------------
  HOPS_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-0.5, -7, 6.5, 7, CYAN, 4)}
    ${seg(0, -6, 1, -6, AMBER, 4)}
    ${seg(1, -6, 1, -4, GREEN, 4)}
    ${seg(1, -4, 2, -4, AMBER, 4)}
    ${seg(2, -4, 2, -2, GREEN, 4)}
    ${seg(2, -2, 3, -2, AMBER, 4)}
    ${seg(3, -2, 3, 0, GREEN, 4)}
    ${dot(0, -6, PINK)}
    ${dot(1, -4, PINK)}
    ${dot(2, -2, PINK)}
    ${dot(3, 0, PINK)}
    ${dot(4, 2, PINK)}
    ${dot(5, 4, PINK)}
    ${dot(6, 6, PINK)}
    <g font-family="${FONT}" font-size="20" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="380" y="590" fill="${AMBER}" text-anchor="middle">1 right</text>
      <text x="412" y="526" fill="${GREEN}">2 up</text>
    </g>
    <text x="590" y="58" font-family="${MONO}" font-size="23" font-weight="bold" fill="${CYAN}" text-anchor="end" stroke="#ffffff" stroke-width="5" paint-order="stroke">y = 2x − 6</text>
    <rect x="40" y="40" width="220" height="276" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="150" y1="56" x2="150" y2="300" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="52" y1="92" x2="248" y2="92" stroke="#cbd5e1" stroke-width="2"/>
    <g font-family="${MONO}" font-size="23" text-anchor="middle">
      <text x="95" y="80" font-weight="bold" fill="${INK}">x</text>
      <text x="205" y="80" font-weight="bold" fill="${INK}">y</text>
      <text x="95" y="128" fill="${INK}">0</text>
      <text x="205" y="128" fill="${PINK}">−6</text>
      <text x="95" y="170" fill="${INK}">1</text>
      <text x="205" y="170" fill="${PINK}">−4</text>
      <text x="95" y="212" fill="${INK}">2</text>
      <text x="205" y="212" fill="${PINK}">−2</text>
      <text x="95" y="254" fill="${INK}">3</text>
      <text x="205" y="254" fill="${PINK}">0</text>
      <text x="95" y="296" fill="${INK}">4</text>
      <text x="205" y="296" fill="${PINK}">2</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // x − 2y = 8, i.e. y = x/2 − 4. A small step (run 2, rise 1) and a big one
  // (run 8, rise 4) give the same ratio: that constant ratio is the slope.
  // ---------------------------------------------------------------------------
  SLOPE_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-6, -7, 8, 0, CYAN, 4)}
    ${seg(-4, -6, 4, -6, PURPLE, 4, '9 7')}
    ${seg(4, -6, 4, -2, PURPLE, 4, '9 7')}
    ${seg(0, -4, 2, -4, AMBER, 5)}
    ${seg(2, -4, 2, -3, GREEN, 5)}
    ${dot(-4, -6, PINK)}
    ${dot(0, -4, PINK)}
    ${dot(2, -3, PINK)}
    ${dot(4, -2, PINK)}
    <g font-family="${MONO}" font-size="20" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="400" y="506" fill="${AMBER}" text-anchor="middle">run 2</text>
      <text x="452" y="464" fill="${GREEN}">rise 1</text>
      <text x="200" y="594" fill="${PURPLE}" text-anchor="middle">run 8</text>
      <text x="532" y="486" fill="${PURPLE}">rise 4</text>
      <text x="676" y="298" fill="${CYAN}" text-anchor="end">x − 2y = 8</text>
    </g>
    <g font-family="${MONO}" font-size="23" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="56" y="84">slope = rise ÷ run</text>
      <text x="56" y="122">1 ÷ 2 = 4 ÷ 8 = 1/2</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Compare columns: slope 2 climbs left to right; slope −1/2 falls.
  // ---------------------------------------------------------------------------
  SIGN_UP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full">
    ${plate(400, 400)}
    ${smallGrid()}
    ${sseg(-2, -4, 2, 4, GREEN, 5)}
    ${sseg(-2, -4, -1, -4, AMBER, 4)}
    ${sseg(-1, -4, -1, -2, GREEN, 4)}
    ${sdot(-1, -2, PINK, 7)}
    ${sdot(1, 2, PINK, 7)}
    <text x="292" y="66" font-family="${MONO}" font-size="24" font-weight="bold" fill="${GREEN}" stroke="#ffffff" stroke-width="5" paint-order="stroke">m = 2</text>
    <text x="236" y="370" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">uphill →</text>
  </svg>`,

  SIGN_DOWN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full">
    ${plate(400, 400)}
    ${smallGrid()}
    ${sseg(-4, 2, 4, -2, PINK, 5)}
    ${sdot(-2, 1, PINK, 7)}
    ${sdot(2, -1, PINK, 7)}
    <text x="52" y="84" font-family="${MONO}" font-size="24" font-weight="bold" fill="${PINK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">m = −1/2</text>
    <text x="222" y="370" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">downhill →</text>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Slope 0 and no slope at all. y = 5: the y values never change, so the rise
  // is 0. x = −4: the x values never change, so the run is 0 — and nothing can
  // be divided by 0.
  // ---------------------------------------------------------------------------
  FLAT_UPRIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-8, 5, 8, 5, BLUE, 5)}
    ${seg(-4, -7, -4, 7, PURPLE, 5)}
    ${dot(-6, 5, BLUE)}
    ${dot(3, 5, BLUE)}
    ${dot(-4, -2, PURPLE)}
    ${dot(-4, -5, PURPLE)}
    <g font-family="${MONO}" font-size="21" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="690" y="104" fill="${BLUE}" text-anchor="end">y = 5 · slope 0</text>
      <text x="690" y="150" fill="${BLUE}" text-anchor="end">rise = 0</text>
      <text x="212" y="560" fill="${PURPLE}">x = −4</text>
      <text x="212" y="592" fill="${PURPLE}">slope undefined</text>
      <text x="212" y="460" fill="${PURPLE}">run = 0</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // The book's picture: slopes 1/4, 1 and 4 through the origin. The bigger
  // the slope, the closer the line is to upright.
  // ---------------------------------------------------------------------------
  STEEPNESS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-8, -2, 8, 2, BLUE, 4)}
    ${seg(-7, -7, 7, 7, GREEN, 4)}
    ${seg(-1.75, -7, 1.75, 7, PINK, 4)}
    <g font-family="${MONO}" font-size="21" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="444" y="62" fill="${PINK}">slope 4</text>
      <text x="612" y="108" fill="${GREEN}">slope 1</text>
      <text x="690" y="222" fill="${BLUE}" text-anchor="end">slope 1/4</text>
    </g>
    <g font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="420" y="520">Bigger slope,</text>
      <text x="420" y="556">steeper line.</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // The book's line through (−3, 1) with slope −1/4: from P, 4 right and 1
  // down lands on (1, 0), and again on (5, −1).
  // ---------------------------------------------------------------------------
  WALK_SLOPE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-8, 2.25, 8, -1.75, CYAN, 4)}
    ${seg(-3, 1, 1, 1, AMBER, 5)}
    ${seg(1, 1, 1, 0, GREEN, 5)}
    ${seg(1, 0, 5, 0, AMBER, 5, '9 7')}
    ${seg(5, 0, 5, -1, GREEN, 5, '9 7')}
    ${dot(-3, 1, PINK, 9)}
    ${dot(1, 0, PURPLE)}
    ${dot(5, -1, PURPLE)}
    <g font-family="${MONO}" font-size="21" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="232" y="312" fill="${PINK}" text-anchor="end">P(−3, 1)</text>
      <text x="320" y="264" fill="${AMBER}" text-anchor="middle">4 right</text>
      <text x="412" y="304" fill="${GREEN}">1 down</text>
      <text x="400" y="376" fill="${PURPLE}" text-anchor="middle">(1, 0)</text>
      <text x="560" y="392" fill="${PURPLE}" text-anchor="middle">(5, −1)</text>
    </g>
    <g font-family="${MONO}" font-size="21" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="56" y="470">slope −1/4 = −1 ÷ 4</text>
      <text x="56" y="506" font-family="${FONT}">down 1 for every 4 right</text>
      <text x="56" y="542" font-family="${FONT}" fill="${MUTED}">(or up 1 for every 4 left)</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // QUIZ: three lines through the origin with slopes 1/6 (k), −3/4 (ℓ) and
  // 2 (m) — read the slopes by their direction and steepness, not by points.
  // ---------------------------------------------------------------------------
  QZ_THREE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-8, -1.3333, 8, 1.3333, BLUE, 4)}
    ${seg(-8, 6, 8, -6, PINK, 4)}
    ${seg(-3.5, -7, 3.5, 7, GREEN, 4)}
    <g font-family="${FONT}" font-size="28" font-weight="bold" font-style="italic" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="684" y="250" fill="${BLUE}" text-anchor="end">k</text>
      <text x="62" y="72" fill="${PINK}">ℓ</text>
      <text x="514" y="58" fill="${GREEN}">m</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // QUIZ: one line, two lattice points on it marked but not labelled. The
  // slope, 2/3, is read by counting squares between them.
  // ---------------------------------------------------------------------------
  QZ_READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-8, -5.3333, 8, 5.3333, CYAN, 4)}
    ${dot(-3, -2, PINK)}
    ${dot(3, 2, PINK)}
  </svg>`,
}
