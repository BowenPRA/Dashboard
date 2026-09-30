// src/data/ADD_MATH/AM_5C/diagrams.js
// Teaching diagrams for AM_5C — Log Equations and Change of Base
// (Cambridge IGCSE Additional Mathematics 0606, sections 5.4 and 5.6).
//
// House rules (docs/svg-diagrams.md, and the AM_7A deck):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY — helpers emit shapes and paths only,
//    because `npm run audit:svg` cannot see text produced by a helper call;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · one colour per concept: GREEN is "exists / keep", RED is "does not exist /
//    reject", AMBER is the check itself, BLUE the method, PURPLE a new base.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   CHECK_GATE        the method: combine, remove, solve — then the check lets
//                     one root through and stops the other.
//   DOMAIN_WIDEN      why false roots appear: combining two logs into one lets
//                     in values where both insides are negative.
//   ROOTS_ON_LINE     the two roots of a worked example on the number line,
//                     with the band where every log exists (a hotspot).
//   INSIDE_NOT_X      test the INSIDE, not x: a negative x can be a solution.
//   THREE_RULES       what must hold: inside positive, base positive, base not 1.
//   CHANGE_BASE       the rule, and where each letter goes.
//   SWAP_RECIPROCAL   swapping the base and the number turns the log upside down.
//   RELATED_LADDERS   powers of 3 and powers of 9 side by side: log₉ x = ½ log₃ x.

const INK = '#1e293b'
const MUTED = '#64748b'
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const AMBER = '#d97706'
const PURPLE = '#a855f7'
const BLUE_T = '#eff6ff'
const RED_T = '#fef2f2'
const GREEN_T = '#f0fdf4'
const AMBER_T = '#fffbeb'
const PURPLE_T = '#faf5ff'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const box = (x, y, w, h, stroke, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`
const seg = (x1, y1, x2, y2, color, { dash = false, w = 2.5 } = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ' stroke-dasharray="6 5"' : ''}/>`
/** A line with an arrowhead at its end, pointing right. */
const arrowR = (x1, y, x2, color = INK) => `${seg(x1, y, x2 - 6, y, color)}<path d="M${x2} ${y} l-10 -5.5 l0 11 z" fill="${color}"/>`
/** A pointing-down arrowhead at (x, y). */
const arrowD = (x, y1, y2, color = INK) => `${seg(x, y1, x, y2 - 6, color)}<path d="M${x} ${y2} l-5.5 -10 l11 0 z" fill="${color}"/>`
const dot = (x, y, color, r = 7) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="2"/>`
const hollow = (x, y, color) => `<circle cx="${x}" cy="${y}" r="6" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>`
/** A number line from x0 to x1 at height y, with ticks at the given pixel positions. */
const numberLine = (x0, x1, y, ticks) => `${seg(x0, y, x1, y, INK, { w: 2 })}
    ${ticks.map((t) => seg(t, y - 6, t, y + 6, INK, { w: 1.6 })).join('')}`
/** A green band along a number line: where every log exists. An open end runs off to the edge. */
const band = (xa, xb, y, color = GREEN, fill = GREEN_T) => `<rect x="${xa}" y="${y - 10}" width="${xb - xa}" height="20" rx="5" fill="${fill}" stroke="${color}" stroke-width="1.8"/>`
const cross = (x, y, s = 9) => `<path d="M${x - s} ${y - s} L${x + s} ${y + s} M${x + s} ${y - s} L${x - s} ${y + s}" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>`
const tick = (x, y, s = 9) => `<path d="M${x - s} ${y} L${x - s / 3} ${y + s * 0.7} L${x + s} ${y - s * 0.8}" fill="none" stroke="${GREEN}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`

/* ============================================================ CHECK_GATE */
// The four moves, and the last one stopping a root.
const CHECK_GATE = (() => {
  const W = 640; const H = 300
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <text x="320" y="38" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="900" fill="${INK}">log₂ x + log₂(x − 3) = 2</text>
    ${box(22, 60, 126, 44, BLUE, BLUE_T)}
    ${box(170, 60, 150, 44, BLUE, BLUE_T)}
    ${box(342, 60, 108, 44, BLUE, BLUE_T)}
    ${box(474, 60, 144, 44, AMBER, AMBER_T)}
    ${arrowR(148, 82, 168)}
    ${arrowR(320, 82, 340)}
    ${arrowR(450, 82, 472)}
    <text x="85" y="88" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${BLUE}">combine</text>
    <text x="245" y="88" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${BLUE}">remove the logs</text>
    <text x="396" y="88" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${BLUE}">solve</text>
    <text x="546" y="88" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${AMBER}">CHECK</text>
    ${arrowD(396, 104, 136, INK)}
    <rect x="352" y="140" width="88" height="34" rx="17" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="352" y="210" width="88" height="34" rx="17" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="396" y="163" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">x = 4</text>
    <text x="396" y="233" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">x = −1</text>
    <rect x="530" y="124" width="10" height="136" rx="4" fill="${AMBER}"/>
    ${arrowR(440, 157, 600, GREEN)}
    ${seg(440, 227, 520, 227, RED)}
    ${cross(520, 227)}
    <text x="606" y="162" font-family="${FONT}" font-size="15" font-weight="900" fill="${GREEN}">✓</text>
    <text x="30" y="152" font-family="${FONT}" font-size="14" font-weight="800" fill="${GREEN}">x = 4: inside the logs,</text>
    <text x="30" y="172" font-family="${MONO}" font-size="14" font-weight="800" fill="${GREEN}">4 and 1. Both positive: keep.</text>
    <text x="30" y="222" font-family="${FONT}" font-size="14" font-weight="800" fill="${RED}">x = −1: inside the logs,</text>
    <text x="30" y="242" font-family="${MONO}" font-size="14" font-weight="800" fill="${RED}">−1 and −4. No log: reject.</text>
    <text x="320" y="284" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">The algebra makes the roots. The check decides which are solutions.</text>
  </svg>`
})()

/* ============================================================ DOMAIN_WIDEN */
// Two logs need both insides positive. One combined log only needs the
// PRODUCT positive, which also happens when both insides are negative.
const DOMAIN_WIDEN = (() => {
  const W = 640; const H = 300
  const X = (v) => 249 + 47 * v          // −4 … 7 across the plate
  const ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map(X)
  const y1 = 104; const y2 = 222
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <text x="24" y="40" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">log₂ x + log₂(x − 3)</text>
    <text x="24" y="62" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">two logs: x &gt; 0 AND x − 3 &gt; 0</text>
    ${band(X(3), 612, y1)}
    ${numberLine(40, 612, y1, ticks)}
    ${hollow(X(3), y1, GREEN)}
    <text x="${X(0)}" y="${y1 + 30}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="800" fill="${MUTED}">0</text>
    <text x="${X(3)}" y="${y1 + 30}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="800" fill="${MUTED}">3</text>
    <text x="604" y="${y1 - 18}" text-anchor="end" font-family="${FONT}" font-size="14" font-weight="800" fill="${GREEN}">x &gt; 3</text>
    <text x="24" y="170" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">log₂(x(x − 3))</text>
    <text x="24" y="192" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">one log: only the product must be positive</text>
    ${band(28, X(0), y2, RED, RED_T)}
    ${band(X(3), 612, y2)}
    ${numberLine(40, 612, y2, ticks)}
    ${hollow(X(0), y2, RED)}
    ${hollow(X(3), y2, GREEN)}
    ${dot(X(-1), y2, RED)}
    <text x="${X(0)}" y="${y2 + 30}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="800" fill="${MUTED}">0</text>
    <text x="${X(3)}" y="${y2 + 30}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="800" fill="${MUTED}">3</text>
    <text x="${X(-1)}" y="${y2 + 30}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="900" fill="${RED}">−1</text>
    <text x="36" y="${y2 + 54}" font-family="${FONT}" font-size="14" font-weight="800" fill="${RED}">extra values: both insides negative — false roots live here</text>
  </svg>`
})()

/* ============================================================ ROOTS_ON_LINE */
// lg x + lg(x − 15) = 2 gives x = 20 or x = −5. Every log exists for x > 15.
// Both roots are drawn in the same neutral blue, because the deck's hotspot
// asks which one lies outside the band: the colour must not answer it.
// Hotspot targets (viewBox 0 0 560 200): the kept root at (460, 112), the
// rejected root at (110, 112), the edge of the band at (390, 112).
const ROOTS_ON_LINE = (() => {
  const W = 560; const H = 200
  const X = (v) => 180 + 14 * v          // −10 … 25
  const y = 112
  const ticks = [-10, -5, 0, 5, 10, 15, 20, 25].map(X)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <text x="24" y="36" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">lg x + lg(x − 15) = 2</text>
    ${band(X(15), 544, y)}
    ${numberLine(24, 544, y, ticks)}
    ${hollow(X(15), y, GREEN)}
    ${dot(X(-5), y, BLUE, 9)}
    ${dot(X(20), y, BLUE, 9)}
    <text x="${X(-5)}" y="${y - 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">x = −5</text>
    <text x="${X(20)}" y="${y - 22}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${BLUE}">x = 20</text>
    <text x="${X(0)}" y="${y + 30}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="800" fill="${MUTED}">0</text>
    <text x="${X(15)}" y="${y + 30}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="800" fill="${MUTED}">15</text>
    <text x="540" y="${y + 30}" text-anchor="end" font-family="${FONT}" font-size="13" font-weight="800" fill="${GREEN}">x &gt; 15</text>
    <text x="280" y="182" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">green: where lg x and lg(x − 15) both exist</text>
  </svg>`
})()

/* ============================================================ INSIDE_NOT_X */
// A negative x is not automatically wrong: what matters is what goes inside.
const INSIDE_NOT_X = (() => {
  const W = 620; const H = 250
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <text x="24" y="38" font-family="${FONT}" font-size="16" font-weight="900" fill="${INK}">Test the INSIDE of each log, not x itself.</text>
    <rect x="24" y="64" width="100" height="40" rx="20" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="74" y="90" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${INK}">x = −1</text>
    ${arrowR(124, 84, 166)}
    ${box(168, 62, 170, 44, GREEN, GREEN_T)}
    <text x="253" y="90" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">log₃(x + 10)</text>
    ${arrowR(338, 84, 376)}
    <text x="386" y="80" font-family="${MONO}" font-size="15" font-weight="900" fill="${GREEN}">inside: −1 + 10 = 9</text>
    ${tick(398, 100)}
    <text x="416" y="106" font-family="${FONT}" font-size="14" font-weight="800" fill="${GREEN}">positive: keep</text>
    <rect x="24" y="150" width="100" height="40" rx="20" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="74" y="176" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${INK}">x = −1</text>
    ${arrowR(124, 170, 166)}
    ${box(168, 148, 170, 44, RED, RED_T)}
    <text x="253" y="176" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${RED}">log₃(x − 2)</text>
    ${arrowR(338, 170, 376)}
    <text x="386" y="166" font-family="${MONO}" font-size="15" font-weight="900" fill="${RED}">inside: −1 − 2 = −3</text>
    ${cross(398, 184, 7)}
    <text x="416" y="190" font-family="${FONT}" font-size="14" font-weight="800" fill="${RED}">negative: reject</text>
    <text x="310" y="232" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">The same x = −1 is kept in one equation and rejected in the other.</text>
  </svg>`
})()

/* ============================================================ THREE_RULES */
// What must be true for a log to exist.
const THREE_RULES = (() => {
  const W = 640; const H = 230
  const card = (x, color, fill) => box(x, 24, 188, 176, color, fill)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${card(20, GREEN, GREEN_T)}
    ${card(226, BLUE, BLUE_T)}
    ${card(432, PURPLE, PURPLE_T)}
    <text x="114" y="56" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${GREEN}">The inside</text>
    <text x="114" y="78" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${GREEN}">is positive</text>
    <text x="114" y="120" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${INK}">log₂ 8  ✓</text>
    <text x="114" y="148" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">log₂ 0  ✗</text>
    <text x="114" y="176" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">log₂(−4)  ✗</text>
    <text x="320" y="56" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${BLUE}">The base</text>
    <text x="320" y="78" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${BLUE}">is positive</text>
    <text x="320" y="120" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${INK}">base 5  ✓</text>
    <text x="320" y="148" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">base −5  ✗</text>
    <text x="320" y="176" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="${MUTED}">(−5) to the power ½?</text>
    <text x="526" y="56" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${PURPLE}">The base</text>
    <text x="526" y="78" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="900" fill="${PURPLE}">is not 1</text>
    <text x="526" y="120" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">base 1  ✗</text>
    <text x="526" y="148" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="800" fill="${MUTED}">1, 1, 1, 1 …</text>
    <text x="526" y="176" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="${MUTED}">every power of 1 is 1</text>
    <text x="320" y="220" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">A root that breaks any of these is rejected.</text>
  </svg>`
})()

/* ============================================================ CHANGE_BASE */
// log_b a = log_c a ÷ log_c b, with each letter's place labelled.
const CHANGE_BASE = (() => {
  const W = 640; const H = 280
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <text x="40" y="142" font-family="${MONO}" font-size="36" font-weight="900" fill="${INK}">log</text>
    <text x="106" y="156" font-family="${MONO}" font-size="22" font-weight="900" fill="${AMBER}">b</text>
    <text x="128" y="142" font-family="${MONO}" font-size="36" font-weight="900" fill="${GREEN}">a</text>
    <text x="172" y="142" font-family="${MONO}" font-size="36" font-weight="900" fill="${INK}">=</text>
    <text x="222" y="104" font-family="${MONO}" font-size="36" font-weight="900" fill="${INK}">log</text>
    <text x="288" y="118" font-family="${MONO}" font-size="22" font-weight="900" fill="${BLUE}">c</text>
    <text x="310" y="104" font-family="${MONO}" font-size="36" font-weight="900" fill="${GREEN}">a</text>
    ${seg(216, 128, 346, 128, INK, { w: 3 })}
    <text x="222" y="172" font-family="${MONO}" font-size="36" font-weight="900" fill="${INK}">log</text>
    <text x="288" y="186" font-family="${MONO}" font-size="22" font-weight="900" fill="${BLUE}">c</text>
    <text x="310" y="172" font-family="${MONO}" font-size="36" font-weight="900" fill="${AMBER}">b</text>
    <path d="M338 92 C 380 70, 400 62, 418 62" fill="none" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M338 166 C 380 178, 400 182, 418 182" fill="none" stroke="${AMBER}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M294 197 L294 214" stroke="${BLUE}" stroke-width="2.5" stroke-linecap="round"/>
    <text x="424" y="58" font-family="${FONT}" font-size="15" font-weight="800" fill="${GREEN}">the number goes on top</text>
    <text x="294" y="234" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${BLUE}">c: any new base, the same top and bottom (10 on a calculator)</text>
    <text x="424" y="180" font-family="${FONT}" font-size="15" font-weight="800" fill="${AMBER}">the old base goes</text>
    <text x="424" y="200" font-family="${FONT}" font-size="15" font-weight="800" fill="${AMBER}">underneath</text>
    <text x="40" y="264" font-family="${MONO}" font-size="16" font-weight="800" fill="${MUTED}">log₂ 13 = lg 13 ÷ lg 2 ≈ 3.70</text>
  </svg>`
})()

/* ============================================================ SWAP_RECIPROCAL */
// log₂ 8 and log₈ 2: the same two numbers, the other way round.
const SWAP_RECIPROCAL = (() => {
  const W = 600; const H = 230
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${box(24, 30, 250, 118, BLUE, BLUE_T)}
    ${box(326, 30, 250, 118, PURPLE, PURPLE_T)}
    <text x="149" y="80" text-anchor="middle" font-family="${MONO}" font-size="28" font-weight="900" fill="${INK}">log₂ 8 = 3</text>
    <text x="149" y="118" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="800" fill="${BLUE}">because 2³ = 8</text>
    <text x="451" y="80" text-anchor="middle" font-family="${MONO}" font-size="28" font-weight="900" fill="${INK}">log₈ 2 = 1/3</text>
    <text x="451" y="118" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="800" fill="${PURPLE}">because ∛8 = 2</text>
    <path d="M282 72 L318 72" stroke="${AMBER}" stroke-width="3" stroke-linecap="round"/>
    <path d="M318 72 l-9 -5 l0 10 z" fill="${AMBER}"/>
    <path d="M318 104 L282 104" stroke="${AMBER}" stroke-width="3" stroke-linecap="round"/>
    <path d="M282 104 l9 -5 l0 10 z" fill="${AMBER}"/>
    <text x="300" y="186" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="900" fill="${AMBER}">Swap the base and the number: the log turns upside down.</text>
    <text x="300" y="212" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="800" fill="${MUTED}">log₃ 9 = 2, so log₉ 3 = 1/2</text>
  </svg>`
})()

/* ============================================================ RELATED_LADDERS */
// Powers of 3 and powers of 9 on one ruler: every step of 9 is two steps of 3.
const RELATED_LADDERS = (() => {
  const W = 620; const H = 262
  const X = (k) => 90 + 110 * k          // k = the power of 3
  const top = 88; const bottom = 176
  const rung = (x, y, color) => seg(x, y - 16, x, y + 16, color, { w: 3 })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${seg(60, top, 580, top, MUTED, { w: 2.5 })}
    ${seg(60, bottom, 580, bottom, MUTED, { w: 2.5 })}
    ${[0, 1, 2, 3, 4].map((k) => rung(X(k), top, BLUE)).join('')}
    ${[0, 2, 4].map((k) => rung(X(k), bottom, PURPLE)).join('')}
    ${[0, 2, 4].map((k) => seg(X(k), top + 20, X(k), bottom - 20, '#cbd5e1', { dash: true, w: 1.5 })).join('')}
    <text x="24" y="40" font-family="${FONT}" font-size="15" font-weight="900" fill="${BLUE}">powers of 3</text>
    <text x="${X(0)}" y="${top - 24}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">1</text>
    <text x="${X(1)}" y="${top - 24}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">3</text>
    <text x="${X(2)}" y="${top - 24}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">9</text>
    <text x="${X(3)}" y="${top - 24}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">27</text>
    <text x="${X(4)}" y="${top - 24}" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">81</text>
    <text x="${X(0)}" y="${top + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${BLUE}">0</text>
    <text x="${X(1)}" y="${top + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${BLUE}">1</text>
    <text x="${X(2)}" y="${top + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${BLUE}">2</text>
    <text x="${X(3)}" y="${top + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${BLUE}">3</text>
    <text x="${X(4)}" y="${top + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${BLUE}">4</text>
    <text x="24" y="${bottom + 66}" font-family="${FONT}" font-size="15" font-weight="900" fill="${PURPLE}">powers of 9</text>
    <text x="${X(0)}" y="${bottom + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${PURPLE}">0</text>
    <text x="${X(2)}" y="${bottom + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${PURPLE}">1</text>
    <text x="${X(4)}" y="${bottom + 36}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="800" fill="${PURPLE}">2</text>
    <text x="596" y="${bottom + 66}" text-anchor="end" font-family="${MONO}" font-size="15" font-weight="900" fill="${INK}">log₃ 81 = 4,  log₉ 81 = 2</text>
    <text x="596" y="40" text-anchor="end" font-family="${FONT}" font-size="14" font-weight="800" fill="${MUTED}">one step of 9 = two steps of 3</text>
  </svg>`
})()

export const DIAGRAMS = {
  CHECK_GATE: CHECK_GATE,
  DOMAIN_WIDEN: DOMAIN_WIDEN,
  ROOTS_ON_LINE: ROOTS_ON_LINE,
  INSIDE_NOT_X: INSIDE_NOT_X,
  THREE_RULES: THREE_RULES,
  CHANGE_BASE: CHANGE_BASE,
  SWAP_RECIPROCAL: SWAP_RECIPROCAL,
  RELATED_LADDERS: RELATED_LADDERS,
}
