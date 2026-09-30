// src/data/ADD_MATH/AM_7A/diagrams.js
// Teaching diagrams for AM_7A — The Equation of a Circle
// (Cambridge IGCSE Additional Mathematics 0606, section 7.1, first half).
//
// House rules (docs/svg-diagrams.md, and the AM_4B deck):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY — helpers emit shapes and paths only,
//    because `npm run audit:svg` cannot see text produced by a helper call;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · one colour per concept: BLUE is the circle, AMBER the radius, GREEN the
//    centre and anything found from it, RED a leg of a triangle or a warning,
//    PURPLE the other leg.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   LOCUS             a circle is every point the same distance from a centre.
//   ORIGIN_TRIANGLE   Pythagoras at the origin: x² + y² = r².
//   SHIFTED_TRIANGLE  the same triangle from a centre (a, b).
//   ANATOMY           where the centre and the radius sit in the equation.
//   DIAMETER          centre = midpoint, radius = half the diameter.
//   FORMS             completed square form and general form, and the two moves.
//   TOUCH_AXIS        touching an axis: the radius is the distance to it.
//   AXES_THREE        nearer than r, exactly r, further than r.
//   SKETCH            a finished sketch with its exact axis points.

const INK = '#1e293b'
const MUTED = '#64748b'
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const AMBER = '#d97706'
const PURPLE = '#a855f7'
const BLUE_T = '#eff6ff'
const AMBER_T = '#fffbeb'
const GREEN_T = '#f0fdf4'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** Axes between the given pixel limits, arrowheads on the positive ends. */
const axes = (ox, oy, x0, x1, y0, y1) => `<line x1="${x0}" y1="${oy}" x2="${x1}" y2="${oy}" stroke="${INK}" stroke-width="1.8"/>
    <line x1="${ox}" y1="${y0}" x2="${ox}" y2="${y1}" stroke="${INK}" stroke-width="1.8"/>
    <path d="M${x1} ${oy} l-9 -4.5 l0 9 z" fill="${INK}"/>
    <path d="M${ox} ${y1} l-4.5 9 l9 0 z" fill="${INK}"/>`

const ring = (cx, cy, r, color = BLUE, fill = 'none') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="4"/>`
const dot = (x, y, color = INK, r = 5.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`
const seg = (x1, y1, x2, y2, color, { dash = false, w = 3 } = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ' stroke-dasharray="7 6"' : ''}/>`
/** A small square marking a right angle, its corner at (x, y). */
const square = (x, y, dx, dy) => `<path d="M${x + dx} ${y} L${x + dx} ${y + dy} L${x} ${y + dy}" fill="none" stroke="${INK}" stroke-width="1.6"/>`

/* ============================================================ LOCUS */
// Five points on one circle, each joined to the centre by a radius.
const LOCUS = (() => {
  const W = 560; const H = 340
  const cx = 280; const cy = 175; const r = 110
  const pts = [[383.4, 137.4], [270.4, 65.4], [176.6, 137.4], [216.9, 265.1], [350.7, 259.3]]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${ring(cx, cy, r, BLUE, BLUE_T)}
    ${pts.map(([x, y]) => seg(cx, cy, x, y, AMBER)).join('\n    ')}
    ${pts.map(([x, y]) => dot(x, y, BLUE)).join('\n    ')}
    ${dot(cx, cy, GREEN, 6.5)}
    <text x="262" y="196" text-anchor="end" font-family="${MONO}" font-size="20" font-weight="900" fill="${GREEN}">C</text>
    <text x="334" y="146" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="290" y="120" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="224" y="146" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="234" y="226" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="330" y="218" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="396" y="134" font-family="${MONO}" font-size="19" font-weight="900" fill="${BLUE}">P</text>
    <text x="28" y="40" font-family="${FONT}" font-size="16" font-weight="800" fill="${INK}">Every point on the circle</text>
    <text x="28" y="62" font-family="${FONT}" font-size="16" font-weight="800" fill="${INK}">is the same distance</text>
    <text x="28" y="84" font-family="${FONT}" font-size="16" font-weight="800" fill="${INK}">from the centre.</text>
    <text x="532" y="312" text-anchor="end" font-family="${FONT}" font-size="15" font-weight="700" fill="${MUTED}">C is the centre, r is the radius</text>
  </svg>`
})()

/* ============================================================ ORIGIN_TRIANGLE */
// A circle centred at the origin; the triangle under a point P(x, y).
const ORIGIN_TRIANGLE = (() => {
  const W = 560; const H = 340
  const ox = 280; const oy = 180; const r = 130
  const px = 384; const py = 102
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(ox, oy, 110, 450, 326, 34)}
    ${ring(ox, oy, r)}
    <path d="M${ox} ${oy} L${px} ${oy} L${px} ${py} Z" fill="${AMBER_T}" stroke="none"/>
    ${seg(ox, oy, px, oy, RED)}
    ${seg(px, oy, px, py, PURPLE)}
    ${seg(ox, oy, px, py, AMBER, { w: 3.5 })}
    ${square(px, oy, -12, -12)}
    ${dot(px, py, BLUE, 6)}
    ${dot(ox, oy, GREEN, 6)}
    <text x="332" y="202" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="900" font-style="italic" fill="${RED}">x</text>
    <text x="374" y="152" text-anchor="end" font-family="${MONO}" font-size="20" font-weight="900" font-style="italic" fill="${PURPLE}">y</text>
    <text x="320" y="130" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="394" y="94" font-family="${MONO}" font-size="19" font-weight="900" fill="${BLUE}">P(x, y)</text>
    <text x="268" y="200" text-anchor="end" font-family="${MONO}" font-size="18" font-weight="900" fill="${GREEN}">O</text>
    <text x="458" y="186" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">x</text>
    <text x="264" y="46" text-anchor="end" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">y</text>
    <text x="24" y="40" font-family="${MONO}" font-size="22" font-weight="900" fill="${INK}">x² + y² = r²</text>
    <text x="24" y="62" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">Pythagoras, for any P</text>
  </svg>`
})()

/* ============================================================ SHIFTED_TRIANGLE */
// The same triangle when the centre is C(a, b): the legs are x − a and y − b.
const SHIFTED_TRIANGLE = (() => {
  const W = 560; const H = 340
  const ox = 90; const oy = 300
  const cx = 310; const cy = 170; const r = 100
  const px = 386.6; const py = 105.7
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(ox, oy, 56, 530, 326, 48)}
    ${seg(cx, cy, cx, oy, MUTED, { dash: true, w: 1.8 })}
    ${seg(cx, cy, ox, cy, MUTED, { dash: true, w: 1.8 })}
    ${ring(cx, cy, r)}
    <path d="M${cx} ${cy} L${px} ${cy} L${px} ${py} Z" fill="${AMBER_T}" stroke="none"/>
    ${seg(cx, cy, px, cy, RED)}
    ${seg(px, cy, px, py, PURPLE)}
    ${seg(cx, cy, px, py, AMBER, { w: 3.5 })}
    ${square(px, cy, -11, -11)}
    ${dot(px, py, BLUE, 6)}
    ${dot(cx, cy, GREEN, 6)}
    <text x="348" y="192" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="900" fill="${RED}">x − a</text>
    <text x="418" y="146" font-family="${MONO}" font-size="18" font-weight="900" fill="${PURPLE}">y − b</text>
    <text x="338" y="128" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="396" y="98" font-family="${MONO}" font-size="18" font-weight="900" fill="${BLUE}">P(x, y)</text>
    <text x="300" y="160" text-anchor="end" font-family="${MONO}" font-size="18" font-weight="900" fill="${GREEN}">C(a, b)</text>
    <text x="310" y="322" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" font-style="italic" fill="${MUTED}">a</text>
    <text x="76" y="176" text-anchor="end" font-family="${MONO}" font-size="17" font-weight="900" font-style="italic" fill="${MUTED}">b</text>
    <text x="538" y="306" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">x</text>
    <text x="76" y="56" text-anchor="end" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">y</text>
    <text x="126" y="38" font-family="${MONO}" font-size="20" font-weight="900" fill="${INK}">(x − a)² + (y − b)² = r²</text>
  </svg>`
})()

/* ============================================================ ANATOMY */
// Where the centre and the radius sit in a completed square form equation.
const ANATOMY = (() => {
  const W = 640; const H = 300
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <text x="320" y="80" text-anchor="middle" font-family="${MONO}" font-size="34" font-weight="900" fill="${INK}">(x - 3)² + (y + 2)² = 25</text>
    <path d="M157 96 L157 150" stroke="${BLUE}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M381 96 L381 150" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M544 96 L544 218" stroke="${AMBER}" stroke-width="2.5" stroke-linecap="round"/>
    <text x="157" y="172" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${BLUE}">x-coordinate of the centre</text>
    <text x="157" y="196" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${BLUE}">x - 3 = 0, so x = 3</text>
    <text x="381" y="172" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${GREEN}">y-coordinate of the centre</text>
    <text x="381" y="196" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${GREEN}">y + 2 = 0, so y = -2</text>
    <text x="544" y="240" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="${AMBER}">radius squared</text>
    <text x="544" y="264" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${AMBER}">r = √25 = 5</text>
    <text x="40" y="276" font-family="${FONT}" font-size="17" font-weight="900" fill="${INK}">Centre (3, −2), radius 5</text>
  </svg>`
})()

/* ============================================================ DIAMETER */
// The centre is the midpoint of a diameter; the radius is half of it.
const DIAMETER = (() => {
  const W = 560; const H = 340
  const cx = 280; const cy = 178; const r = 112
  const bx = 381.5; const by = 130.7
  const ax = 178.5; const ay = 225.3
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${ring(cx, cy, r, BLUE, BLUE_T)}
    ${seg(ax, ay, cx, cy, AMBER, { w: 3.5 })}
    ${seg(cx, cy, bx, by, AMBER, { w: 3.5 })}
    <path d="M225 193 L233 210" stroke="${INK}" stroke-width="2"/>
    <path d="M327 146 L335 163" stroke="${INK}" stroke-width="2"/>
    ${dot(ax, ay, RED, 6)}
    ${dot(bx, by, RED, 6)}
    ${dot(cx, cy, GREEN, 6.5)}
    <text x="166" y="246" text-anchor="end" font-family="${MONO}" font-size="20" font-weight="900" fill="${RED}">A</text>
    <text x="394" y="126" font-family="${MONO}" font-size="20" font-weight="900" fill="${RED}">B</text>
    <text x="290" y="202" font-family="${MONO}" font-size="20" font-weight="900" fill="${GREEN}">C</text>
    <text x="232" y="232" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="344" y="140" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="280" y="36" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="800" fill="${GREEN}">centre C = midpoint of AB</text>
    <text x="280" y="322" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="800" fill="${AMBER}">radius = distance from C to A (or to B)</text>
  </svg>`
})()

/* ============================================================ FORMS */
// The two ways of writing one circle, and the move in each direction.
const FORMS = (() => {
  const W = 640; const H = 300
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    <rect x="40" y="24" width="560" height="86" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="40" y="190" width="560" height="86" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <text x="60" y="50" font-family="${FONT}" font-size="14" font-weight="900" fill="${BLUE}">COMPLETED SQUARE FORM — read the centre and radius</text>
    <text x="320" y="92" text-anchor="middle" font-family="${MONO}" font-size="26" font-weight="900" fill="${INK}">(x - 3)² + (y + 2)² = 25</text>
    <text x="60" y="216" font-family="${FONT}" font-size="14" font-weight="900" fill="${GREEN}">GENERAL FORM — everything multiplied out</text>
    <text x="320" y="258" text-anchor="middle" font-family="${MONO}" font-size="26" font-weight="900" fill="${INK}">x² + y² - 6x + 4y - 12 = 0</text>
    <path d="M100 118 L100 178" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M100 184 l-7 -12 l14 0 z" fill="${INK}"/>
    <path d="M540 182 L540 122" stroke="${AMBER}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M540 116 l-7 12 l14 0 z" fill="${AMBER}"/>
    <text x="116" y="156" font-family="${FONT}" font-size="15" font-weight="800" fill="${INK}">expand the brackets</text>
    <text x="524" y="156" text-anchor="end" font-family="${FONT}" font-size="15" font-weight="800" fill="${AMBER}">complete the square</text>
  </svg>`
})()

/* ============================================================ TOUCH_AXIS */
// A circle that touches the x-axis: the radius is the height of the centre.
const TOUCH_AXIS = (() => {
  const W = 560; const H = 340
  const ox = 330; const oy = 250
  const cx = 250; const cy = 150; const r = 100
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(ox, oy, 110, 540, 310, 34)}
    ${ring(cx, cy, r, BLUE, BLUE_T)}
    ${seg(cx, cy, cx, oy, AMBER, { dash: true })}
    ${square(cx, oy, 11, -11)}
    ${dot(cx, oy, RED, 6)}
    ${dot(cx, cy, GREEN, 6.5)}
    <text x="240" y="138" text-anchor="end" font-family="${MONO}" font-size="17" font-weight="900" fill="${GREEN}">C(−4, 5)</text>
    <text x="262" y="208" font-family="${MONO}" font-size="19" font-weight="900" fill="${AMBER}">r = 5</text>
    <text x="250" y="276" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">(−4, 0)</text>
    <text x="546" y="268" text-anchor="end" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">x</text>
    <text x="344" y="44" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">y</text>
    <text x="372" y="112" font-family="${FONT}" font-size="15" font-weight="800" fill="${INK}">The axis is a tangent.</text>
    <text x="372" y="136" font-family="${FONT}" font-size="15" font-weight="800" fill="${AMBER}">radius = distance from</text>
    <text x="372" y="158" font-family="${FONT}" font-size="15" font-weight="800" fill="${AMBER}">the centre to the axis</text>
  </svg>`
})()

/* ============================================================ AXES_THREE */
// The centre's distance d from an axis against the radius r: three cases.
const AXES_THREE = (() => {
  const W = 640; const H = 300
  const yAxis = 210; const r = 60
  const panel = (cx, cy) => `${seg(cx - 95, yAxis, cx + 95, yAxis, INK, { w: 2 })}
    ${ring(cx, cy, r)}
    ${seg(cx, cy, cx, yAxis, RED, { dash: true, w: 2.5 })}
    ${seg(cx, cy, cx + 52, cy - 30, AMBER, { w: 2.5 })}
    ${dot(cx, cy, GREEN, 5)}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${panel(110, 180)}
    ${dot(58, yAxis, BLUE, 5)}
    ${dot(162, yAxis, BLUE, 5)}
    ${panel(320, 150)}
    ${dot(320, yAxis, BLUE, 5)}
    ${panel(530, 118)}
    <text x="110" y="36" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" fill="${INK}">d &lt; r</text>
    <text x="320" y="36" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" fill="${INK}">d = r</text>
    <text x="530" y="36" text-anchor="middle" font-family="${MONO}" font-size="19" font-weight="900" fill="${INK}">d &gt; r</text>
    <text x="98" y="202" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" font-style="italic" fill="${RED}">d</text>
    <text x="308" y="186" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" font-style="italic" fill="${RED}">d</text>
    <text x="518" y="200" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" font-style="italic" fill="${RED}">d</text>
    <text x="146" y="158" font-family="${MONO}" font-size="16" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="356" y="128" font-family="${MONO}" font-size="16" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="566" y="96" font-family="${MONO}" font-size="16" font-weight="900" font-style="italic" fill="${AMBER}">r</text>
    <text x="110" y="262" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="900" fill="${BLUE}">crosses twice</text>
    <text x="320" y="262" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="900" fill="${BLUE}">touches once</text>
    <text x="530" y="262" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="900" fill="${BLUE}">misses</text>
    <text x="320" y="286" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${MUTED}">d is how far the centre is from the axis</text>
  </svg>`
})()

/* ============================================================ SKETCH */
// A finished sketch of (x − 3)² + (y + 2)² = 9 with its exact axis points.
const SKETCH = (() => {
  const W = 560; const H = 340
  const ox = 190; const oy = 110
  const cx = 310; const cy = 190; const r = 120
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="w-full h-full drop-shadow-md">
    ${plate(W, H)}
    ${axes(ox, oy, 120, 530, 328, 30)}
    ${ring(cx, cy, r)}
    ${seg(cx, cy, ox, cy, AMBER, { dash: true })}
    ${dot(ox, cy, RED, 6)}
    ${dot(220.6, oy, RED, 6)}
    ${dot(399.4, oy, RED, 6)}
    ${dot(cx, cy, GREEN, 6.5)}
    <text x="320" y="184" font-family="${MONO}" font-size="18" font-weight="900" fill="${GREEN}">C(3, −2)</text>
    <text x="252" y="208" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="900" fill="${AMBER}">r = 3</text>
    <text x="180" y="196" text-anchor="end" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">(0, −2)</text>
    <text x="228" y="134" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">3 − √5</text>
    <text x="392" y="134" text-anchor="end" font-family="${MONO}" font-size="17" font-weight="900" fill="${RED}">3 + √5</text>
    <text x="538" y="116" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">x</text>
    <text x="176" y="40" text-anchor="end" font-family="${MONO}" font-size="16" font-style="italic" fill="${INK}">y</text>
    <text x="178" y="126" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">O</text>
  </svg>`
})()

export const DIAGRAMS = {
  LOCUS: LOCUS,
  ORIGIN_TRIANGLE: ORIGIN_TRIANGLE,
  SHIFTED_TRIANGLE: SHIFTED_TRIANGLE,
  ANATOMY: ANATOMY,
  DIAMETER: DIAMETER,
  FORMS: FORMS,
  TOUCH_AXIS: TOUCH_AXIS,
  AXES_THREE: AXES_THREE,
  SKETCH: SKETCH,
}
