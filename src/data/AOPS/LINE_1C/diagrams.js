// src/data/AOPS/LINE_1C/diagrams.js
// Teaching diagrams for LINE_1C — Equations of Lines.
//
// House rules as LINE_1A/1B: a white plate first; every <text> literal, with
// literal coordinates (the shared tick labels are the TICKS block, spliced in
// by `npm run audit:svg`); numbers and equations in monospace.
//
// ONE GRID, USED EVERYWHERE — the same plane as the other two lines units:
//     x from −8 to 8, y from −7 to 7, 40 px per unit in BOTH directions,
//     origin at (360, 320) in a 720 × 640 viewBox,
//     X(x) = 360 + 40x and Y(y) = 320 − 40y.
// The three compare-column pictures (SYS_ONE, SYS_NONE, SYS_SAME) use the
// small 400 × 400 plane, x and y from −4 to 4, origin (200, 200).
//
// THE ARGUMENT, in order:
//   FROM_GRAPH   problem 8.14: two points give the slope, and ANY point (x, y)
//                on the line must give the same slope — that is the equation
//   SLOPE_INT    problem 8.18: y = 3x − 7, its slope, its intercepts
//   SYS_ONE      two lines crossing: one solution
//   SYS_NONE     two parallel lines: no solution
//   SYS_SAME     one line drawn twice: infinitely many solutions
//   PERP         problem 8.26: slopes −1/2 and 2 meet at a right angle
//   QZ_INTERCEPT quiz: match an equation to a line by its intercepts
//   QZ_PAIR      quiz: read a system's solution off the grid

const INK = '#1e293b'
const MUTED = '#64748b'
const GRID = '#e2e8f0'
const PINK = '#be185d'
const PURPLE = '#7c3aed'
const AMBER = '#d97706'
const GREEN = '#16a34a'
const CYAN = '#0891b2'

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
const ring = (x, y, color, r = 9) =>
  `<circle cx="${X(x)}" cy="${Y(y)}" r="${r}" fill="#ffffff" stroke="${color}" stroke-width="3.5"/>`

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
const sdot = (x, y, color, r = 9) =>
  `<circle cx="${sx(x)}" cy="${sy(y)}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="3"/>`

export const DIAGRAMS = {
  // ---------------------------------------------------------------------------
  // Problem 8.14. The line through (0, −2) and (1, 3) has slope 5. A general
  // point (x, y) on it — drawn hollow, because it stands for every point —
  // must give the same slope from (1, 3). Writing that down IS the equation.
  // ---------------------------------------------------------------------------
  FROM_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-1, -7, 1.8, 7, CYAN, 4)}
    ${seg(0, -2, 1, -2, AMBER, 4)}
    ${seg(1, -2, 1, 3, GREEN, 4)}
    ${seg(1, 3, 1.6, 3, PURPLE, 3, '6 5')}
    ${seg(1.6, 3, 1.6, 6, PURPLE, 3, '6 5')}
    ${dot(0, -2, PINK)}
    ${dot(1, 3, PINK)}
    ${ring(1.6, 6, PURPLE)}
    <g font-family="${MONO}" font-size="21" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="372" y="428" fill="${PINK}">(0, −2)</text>
      <text x="300" y="208" fill="${PINK}" text-anchor="end">(1, 3)</text>
      <text x="440" y="84" fill="${PURPLE}">(x, y)</text>
      <text x="380" y="382" fill="${AMBER}" text-anchor="middle">1</text>
      <text x="412" y="296" fill="${GREEN}">5</text>
    </g>
    <g font-family="${MONO}" font-size="22" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="404" y="470">slope: 5 ÷ 1 = 5</text>
      <text x="404" y="508" fill="${PURPLE}">(y − 3) ÷ (x − 1) = 5</text>
      <text x="404" y="546" fill="${CYAN}">y − 3 = 5(x − 1)</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Problem 8.18. y = 3x − 7: the 3 is the slope (a step of 1 across, 3 up),
  // the −7 is where it crosses the y-axis. The x-intercept, 7/3, is not a
  // grid corner — the reason the book writes it as 2⅓ to plot it.
  // ---------------------------------------------------------------------------
  SLOPE_INT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(0, -7, 4.6667, 7, CYAN, 4)}
    ${seg(1, -4, 2, -4, AMBER, 5)}
    ${seg(2, -4, 2, -1, GREEN, 5)}
    ${dot(0, -7, PURPLE, 9)}
    ${dot(2.3333, 0, AMBER, 9)}
    <g font-family="${MONO}" font-size="21" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="376" y="592" fill="${PURPLE}">(0, −7)</text>
      <text x="472" y="304" fill="${AMBER}">(7/3, 0)</text>
      <text x="420" y="506" fill="${AMBER}" text-anchor="middle">1</text>
      <text x="452" y="428" fill="${GREEN}">3</text>
      <text x="526" y="62" fill="${CYAN}" text-anchor="end">y = 3x − 7</text>
    </g>
    <g font-family="${FONT}" font-size="21" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="56" y="124" fill="${GREEN}">m = 3: the slope</text>
      <text x="56" y="162" fill="${PURPLE}">b = −7: crosses the</text>
      <text x="56" y="194" fill="${PURPLE}">y-axis at (0, −7)</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // The three ways two lines can sit — one crossing, never crossing, the same
  // line twice (the second drawn dashed on top of the first).
  // ---------------------------------------------------------------------------
  SYS_ONE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full">
    ${plate(400, 400)}
    ${smallGrid()}
    ${sseg(-4, -4, 4, 4, CYAN, 5)}
    ${sseg(-2, 4, 4, -2, PINK, 5)}
    ${sdot(1, 1, PURPLE)}
  </svg>`,

  SYS_NONE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full">
    ${plate(400, 400)}
    ${smallGrid()}
    ${sseg(-4, -1, 4, 3, CYAN, 5)}
    ${sseg(-4, -4, 4, 0, PINK, 5)}
  </svg>`,

  SYS_SAME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full">
    ${plate(400, 400)}
    ${smallGrid()}
    ${sseg(-1.5, -4, 2.5, 4, CYAN, 10)}
    ${sseg(-1.5, -4, 2.5, 4, PINK, 4, '10 9')}
  </svg>`,

  // ---------------------------------------------------------------------------
  // Problem 8.26. x = −2y + 10 (slope −1/2) and 2x − y = 5 (slope 2) cross at
  // (16/5, 17/5) at a right angle; the slopes multiply to −1. The right-angle
  // mark is drawn along the two lines' own directions.
  // ---------------------------------------------------------------------------
  PERP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-4, 7, 8, 1, CYAN, 4)}
    ${seg(-2, -7, 5, 7, PINK, 4)}
    <path d="M 502.3 191.2 L 509.5 176.9 L 495.2 169.7" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${seg(1, -1, 2, -1, AMBER, 4)}
    ${seg(2, -1, 2, 1, GREEN, 4)}
    ${seg(6, 2, 8, 2, AMBER, 4)}
    ${seg(8, 2, 8, 1, GREEN, 4)}
    <g font-family="${MONO}" font-size="21" font-weight="bold" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="66" y="128" fill="${CYAN}">x = −2y + 10</text>
      <text x="66" y="164" fill="${CYAN}">slope −1/2</text>
      <text x="574" y="64" fill="${PINK}">2x − y = 5</text>
      <text x="574" y="100" fill="${PINK}">slope 2</text>
    </g>
    <g font-family="${MONO}" font-size="22" font-weight="bold" fill="${INK}" stroke="#ffffff" stroke-width="5" paint-order="stroke">
      <text x="56" y="516">(−1/2) × 2 = −1</text>
      <text x="56" y="552" font-family="${FONT}">perpendicular</text>
    </g>
  </svg>`,

  // ---------------------------------------------------------------------------
  // QUIZ: a line crossing the axes at (−4, 0) and (0, 3). Its equation is
  // 3x − 4y = −12; the distractors have the right numbers in the wrong places.
  // ---------------------------------------------------------------------------
  QZ_INTERCEPT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-8, -3, 5.3333, 7, CYAN, 4)}
    ${dot(-4, 0, PINK)}
    ${dot(0, 3, PINK)}
  </svg>`,

  // ---------------------------------------------------------------------------
  // QUIZ: y = x − 3 and y = −2x + 3 cross at (2, −1). The crossing is the one
  // point on both lines — the solution of the system.
  // ---------------------------------------------------------------------------
  QZ_PAIR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 640" class="w-full h-full">
    ${plate(720, 640)}
    ${grid()}
    ${TICKS}
    ${seg(-4, -7, 8, 5, CYAN, 4)}
    ${seg(-2, 7, 5, -7, PINK, 4)}
    ${dot(2, -1, PURPLE)}
  </svg>`,
}
