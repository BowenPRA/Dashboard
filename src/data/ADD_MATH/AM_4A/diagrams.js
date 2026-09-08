// src/data/ADD_MATH/AM_4A/diagrams.js
// Teaching diagrams for AM_4A — Modulus Equations and Modulus Inequalities
// (Cambridge IGCSE Additional Mathematics 0606, chapter 4.1–4.2).
//
// House rules (docs/svg-diagrams.md, and the AM_3A deck):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY. Helpers emit shapes and paths only —
//    `npm run audit:svg` cannot see text produced by a `${helper(...)}` call and
//    would silently check nothing. That is why only the values that matter are
//    labelled on an axis: every tick number would be a literal string, and the
//    ones that teach nothing are noise;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · one colour per concept, from the palette in docs/svg-diagrams.md §3. In this
//    file BLUE is always the left-hand modulus graph, RED the right-hand one,
//    GREEN a satisfied region and AMBER the critical values that bound it.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   MODULUS_DEF    what |x| means: the piecewise definition beside the V it draws.
//   EQUIV_BOX      the three squaring equivalences the Class Discussion derives.
//   WE1_GRAPH      |x − 5| = |x + 1| — ONE crossing, because the arms are parallel.
//   WE2_GRAPH      |2x + 1| = |x − 3| — TWO crossings, because they are not.
//   TWO_METHODS    split-into-two versus square-both-sides, side by side.
//   SUM_REGIONS    |x + 4| + |x − 5| = 11 — the critical values cut the line in 3.
//   LESS_THAN      |2x − 1| < 3 — below the line is ONE interval.
//   MORE_THAN      |2x + 3| > 4 — above the line is TWO rays.
//   INSIDE_OUT     the two rules, and the sentence shape each one produces.
//   SIGN_PARABOLA  3x² + 10x − 8 ≥ 0 — where a squared inequality is finished.
//   WE6_GRAPH      |2x + 1| ≥ |3 − x| read off the picture, to check the algebra.
//   RHS_TRAP       |2x − 3| ≤ x − 1 — why squaring needs the right side positive.
//   ABS_QUAD       f(x) = x² − 6|x| + 8, for Exercise 4.1 question 4.
//   EX_Q1_GRID     y = |x − 2| and y = |2x − 10|, the printed grid for Ex 4.2 Q1.
//   EX_Q2_GRID     y = |3x − 6| and y = |4 − x|, the sketch Ex 4.2 Q2 asks for.

const INK = '#1e293b'
const MUTED = '#64748b'
const GRID = '#e2e8f0'
const RULE = '#cbd5e1'
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const AMBER = '#d97706'
const PURPLE = '#a855f7'
const BLUE_T = '#eff6ff'
const GREEN_T = '#f0fdf4'
const AMBER_T = '#fffbeb'
const RED_T = '#fef2f2'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/**
 * A graph window. `ox`/`oy` are the screen pixels of the origin and `ux`/`uy` the
 * pixels per unit, so every helper below maps graph coordinates the same way and
 * two curves drawn on one plate always agree about where a point is.
 */
const win = (o) => ({ ...o, X: (x) => o.ox + x * o.ux, Y: (y) => o.oy - y * o.uy })

/** Axes drawn to the edges of the plotting box, with an arrowhead on each. */
const axes = (w, x0, x1, y0, y1) => `<line x1="${x0}" y1="${w.Y(0)}" x2="${x1}" y2="${w.Y(0)}" stroke="${RULE}" stroke-width="1.8"/>
    <line x1="${w.X(0)}" y1="${y0}" x2="${w.X(0)}" y2="${y1}" stroke="${RULE}" stroke-width="1.8"/>
    <path d="M${x1} ${w.Y(0)} l-9 -4.5 l0 9 z" fill="${RULE}"/>
    <path d="M${w.X(0)} ${y1} l-4.5 9 l9 0 z" fill="${RULE}"/>`

/**
 * The EXACT polyline for y = a|x − p| + q, clipped to the window.
 *
 * Drawn as three points rather than sampled, because a sampled path rounds the
 * vertex off — and the vertex is the corner every one of these lessons is about.
 * Each arm stops at whichever it meets first, the side of the box or the top.
 */
function vee(w, a, p, q) {
  const reach = (w.yMax - q) / a
  const xl = Math.max(w.xMin, p - reach)
  const xr = Math.min(w.xMax, p + reach)
  const at = (x) => a * Math.abs(x - p) + q
  return `M${w.X(xl).toFixed(1)} ${w.Y(at(xl)).toFixed(1)} L${w.X(p).toFixed(1)} ${w.Y(q).toFixed(1)} L${w.X(xr).toFixed(1)} ${w.Y(at(xr)).toFixed(1)}`
}

/** A straight line y = mx + c across the window, clipped top and bottom. */
function ray(w, m, c) {
  const pts = []
  for (const x of [w.xMin, w.xMax]) {
    let xx = x
    let y = m * x + c
    if (y > w.yMax) { y = w.yMax; xx = (y - c) / m }
    if (y < w.yMin) { y = w.yMin; xx = (y - c) / m }
    pts.push(`${w.X(xx).toFixed(1)} ${w.Y(y).toFixed(1)}`)
  }
  return `M${pts[0]} L${pts[1]}`
}

/** A sampled path, for the one curve here that is not made of straight arms. */
function curve(w, f, steps = 300) {
  let d = ''
  let pen = false
  for (let i = 0; i <= steps; i += 1) {
    const x = w.xMin + ((w.xMax - w.xMin) * i) / steps
    const y = f(x)
    if (!Number.isFinite(y) || y < w.yMin || y > w.yMax) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${w.X(x).toFixed(1)} ${w.Y(y).toFixed(1)} `
    pen = true
  }
  return d.trim()
}

/** A tick mark on the x-axis. Its NUMBER is written literally by the caller. */
const tick = (w, x) => `<line x1="${w.X(x)}" y1="${w.Y(0) - 5}" x2="${w.X(x)}" y2="${w.Y(0) + 5}" stroke="${RULE}" stroke-width="1.8"/>`

/** A filled dot marking an intersection, with a dashed drop to the x-axis. */
const meet = (w, x, y, color) => `<line x1="${w.X(x)}" y1="${w.Y(y)}" x2="${w.X(x)}" y2="${w.Y(0)}" stroke="${color}" stroke-width="1.6" stroke-dasharray="5 4"/>
    <circle cx="${w.X(x)}" cy="${w.Y(y)}" r="6" fill="${INK}"/>`

/** A faint background lattice, so a reader can count squares off the picture. */
function lattice(w, x0, x1, y0, y1, dx = 1, dy = 1) {
  let d = ''
  for (let x = Math.ceil(w.xMin); x <= w.xMax; x += dx) d += `M${w.X(x).toFixed(1)} ${y0} L${w.X(x).toFixed(1)} ${y1} `
  for (let y = Math.ceil(w.yMin); y <= w.yMax; y += dy) d += `M${x0} ${w.Y(y).toFixed(1)} L${x1} ${w.Y(y).toFixed(1)} `
  return `<path d="${d.trim()}" stroke="${GRID}" stroke-width="1" fill="none"/>`
}

// ── 1. What the bars mean ───────────────────────────────────────────────────
const W1 = win({ xMin: -4, xMax: 4, yMin: -0.6, yMax: 4, ox: 532, oy: 268, ux: 40, uy: 52 })
const MODULUS_DEF = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 330" class="w-full h-full">
    ${plate(700, 330)}
    <text x="350" y="34" font-family="${FONT}" font-size="17" font-weight="bold" fill="${MUTED}" text-anchor="middle">The modulus of x is its distance from zero — never negative</text>

    <rect x="26" y="56" width="330" height="120" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="1.6"/>
    <text x="46" y="88" font-family="${MONO}" font-size="20" font-weight="bold" fill="${INK}">|x|  =  x       if x ≥ 0</text>
    <text x="46" y="126" font-family="${MONO}" font-size="20" font-weight="bold" fill="${INK}">|x|  =  −x      if x &lt; 0</text>
    <text x="46" y="158" font-family="${FONT}" font-size="14" fill="${MUTED}">Two rules, one for each side of zero.</text>

    <rect x="26" y="192" width="330" height="112" rx="12" fill="${AMBER_T}" stroke="${AMBER}" stroke-width="1.6"/>
    <text x="46" y="222" font-family="${MONO}" font-size="18" font-weight="bold" fill="${INK}">|7| = 7        |−7| = 7</text>
    <text x="46" y="252" font-family="${MONO}" font-size="18" font-weight="bold" fill="${INK}">|x|² = x²      |x| ≥ 0</text>
    <text x="46" y="284" font-family="${FONT}" font-size="13" fill="${AMBER}">Squaring kills the sign. That is the trick.</text>

    ${lattice(W1, 376, 688, 60, 300)}
    ${axes(W1, 376, 688, 300, 60)}
    <path d="${vee(W1, 1, 0, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="626" y="96" font-family="${MONO}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">y = |x|</text>
    <text x="532" y="292" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">O</text>
    <text x="532" y="318" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">The negative half is folded up.</text>
  </svg>`

// ── 2. The three equivalences ───────────────────────────────────────────────
const EQUIV_BOX = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" class="w-full h-full">
    ${plate(640, 320)}
    <text x="320" y="36" font-family="${FONT}" font-size="17" font-weight="bold" fill="${MUTED}" text-anchor="middle">Squaring turns a statement about bars into one about numbers</text>

    <rect x="34" y="58" width="572" height="58" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.8"/>
    <text x="320" y="95" font-family="${MONO}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">|p| = |q|   ⇔   p² = q²</text>

    <rect x="34" y="128" width="572" height="58" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="1.8"/>
    <text x="320" y="165" font-family="${MONO}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">|p| &gt; |q|   ⇔   p² &gt; q²</text>

    <rect x="34" y="198" width="572" height="58" rx="12" fill="${AMBER_T}" stroke="${AMBER}" stroke-width="1.8"/>
    <text x="320" y="235" font-family="${MONO}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">|p| &lt; |q|   ⇔   p² &lt; q²</text>

    <text x="320" y="282" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">All three follow from p² − q² = (|p| − |q|)(|p| + |q|),</text>
    <text x="320" y="304" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">because |p| + |q| can never be negative.</text>
  </svg>`

// ── 3. One crossing: parallel arms ──────────────────────────────────────────
const W3 = win({ xMin: -7, xMax: 9, yMin: -1, yMax: 7, ox: 262, oy: 268, ux: 34, uy: 30 })
const WE1_GRAPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full">
    ${plate(620, 330)}
    <text x="310" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">|x − 5| = |x + 1| has exactly ONE solution</text>
    ${lattice(W3, 32, 588, 46, 298)}
    ${axes(W3, 32, 588, 298, 46)}
    <path d="${vee(W3, 1, 5, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${vee(W3, 1, -1, 0)}" fill="none" stroke="${RED}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    ${meet(W3, 2, 3, AMBER)}
    ${tick(W3, 2)}
    <text x="${W3.X(2)}" y="${W3.Y(0) + 24}" font-family="${MONO}" font-size="16" font-weight="bold" fill="${AMBER}" text-anchor="middle">2</text>
    <text x="520" y="80" font-family="${MONO}" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle">y = |x − 5|</text>
    <text x="118" y="80" font-family="${MONO}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">y = |x + 1|</text>
    <text x="310" y="320" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">Both graphs have slope 1 and −1, so the other pair of arms never meets.</text>
  </svg>`

// ── 4. Two crossings: different gradients ───────────────────────────────────
const W4 = win({ xMin: -6.5, xMax: 6.5, yMin: -1, yMax: 9, ox: 300, oy: 274, ux: 42, uy: 24 })
const WE2_GRAPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 340" class="w-full h-full">
    ${plate(620, 340)}
    <text x="310" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">|2x + 1| = |x − 3| has TWO solutions</text>
    ${lattice(W4, 32, 588, 46, 304)}
    ${axes(W4, 32, 588, 304, 46)}
    <path d="${vee(W4, 2, -0.5, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${vee(W4, 1, 3, 0)}" fill="none" stroke="${RED}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    ${meet(W4, -4, 7, AMBER)}
    ${meet(W4, 0.6667, 2.3333, AMBER)}
    ${tick(W4, -4)}
    <text x="${W4.X(-4)}" y="${W4.Y(0) + 24}" font-family="${MONO}" font-size="16" font-weight="bold" fill="${AMBER}" text-anchor="middle">−4</text>
    <text x="${W4.X(0.6667) + 30}" y="${W4.Y(0) + 24}" font-family="${MONO}" font-size="16" font-weight="bold" fill="${AMBER}" text-anchor="middle">2/3</text>
    <text x="150" y="72" font-family="${MONO}" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle">y = |2x + 1|</text>
    <text x="520" y="110" font-family="${MONO}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">y = |x − 3|</text>
    <text x="310" y="330" font-family="${FONT}" font-size="14" fill="${MUTED}" text-anchor="middle">x = −4 is easy to read off. x = 2/3 is not — which is why the algebra matters.</text>
  </svg>`

// ── 5. The two methods, side by side ────────────────────────────────────────
const TWO_METHODS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 372" class="w-full h-full">
    ${plate(660, 372)}
    <text x="330" y="34" font-family="${FONT}" font-size="17" font-weight="bold" fill="${MUTED}" text-anchor="middle">Two ways to solve |2x + 1| = |x − 3|. Both are full marks.</text>

    <rect x="24" y="56" width="300" height="292" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="1.8"/>
    <text x="174" y="86" font-family="${FONT}" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">Method 1 · split into two</text>
    <text x="44" y="124" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">2x + 1 = x − 3</text>
    <text x="44" y="152" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">x = −4</text>
    <text x="44" y="192" font-family="${FONT}" font-size="14" fill="${MUTED}">or, with the right side negated:</text>
    <text x="44" y="222" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">2x + 1 = −(x − 3)</text>
    <text x="44" y="250" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">3x = 2</text>
    <text x="44" y="278" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">x = 2/3</text>
    <text x="44" y="322" font-family="${FONT}" font-size="13" fill="${BLUE}">Fast. You must CHECK both answers.</text>

    <rect x="336" y="56" width="300" height="292" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.8"/>
    <text x="486" y="86" font-family="${FONT}" font-size="16" font-weight="bold" fill="${GREEN}" text-anchor="middle">Method 2 · square both sides</text>
    <text x="356" y="124" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">(2x + 1)² = (x − 3)²</text>
    <text x="356" y="156" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">4x² + 4x + 1 = x² − 6x + 9</text>
    <text x="356" y="188" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">3x² + 10x − 8 = 0</text>
    <text x="356" y="220" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">(3x − 2)(x + 4) = 0</text>
    <text x="356" y="252" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">x = 2/3   or   x = −4</text>
    <text x="356" y="296" font-family="${FONT}" font-size="13" fill="${GREEN}">Safe: both bars go at once, and no</text>
    <text x="356" y="316" font-family="${FONT}" font-size="13" fill="${GREEN}">branch can be forgotten.</text>
    <text x="356" y="336" font-family="${FONT}" font-size="13" fill="${MUTED}">Only for modulus = modulus.</text>
  </svg>`

// ── 6. A sum of two moduli: the critical values cut the line ────────────────
const SUM_REGIONS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" class="w-full h-full">
    ${plate(640, 300)}
    <text x="320" y="34" font-family="${FONT}" font-size="17" font-weight="bold" fill="${MUTED}" text-anchor="middle">|x + 4| + |x − 5| = 11 — each bar changes rule at its own point</text>

    <line x1="50" y1="128" x2="590" y2="128" stroke="${INK}" stroke-width="2.4"/>
    <path d="M590 128 l-10 -5 l0 10 z" fill="${INK}"/>
    <path d="M50 128 l10 -5 l0 10 z" fill="${INK}"/>
    <circle cx="212" cy="128" r="7" fill="${AMBER}"/>
    <circle cx="428" cy="128" r="7" fill="${AMBER}"/>
    <text x="212" y="112" font-family="${MONO}" font-size="18" font-weight="bold" fill="${AMBER}" text-anchor="middle">−4</text>
    <text x="428" y="112" font-family="${MONO}" font-size="18" font-weight="bold" fill="${AMBER}" text-anchor="middle">5</text>

    <rect x="58" y="150" width="146" height="86" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="1.5"/>
    <text x="131" y="176" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RED}" text-anchor="middle">x &lt; −4</text>
    <text x="131" y="200" font-family="${MONO}" font-size="14" fill="${INK}" text-anchor="middle">both bars flip</text>
    <text x="131" y="222" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">1 − 2x = 11</text>

    <rect x="216" y="150" width="208" height="86" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.5"/>
    <text x="320" y="176" font-family="${FONT}" font-size="13" font-weight="bold" fill="${GREEN}" text-anchor="middle">−4 ≤ x &lt; 5</text>
    <text x="320" y="200" font-family="${MONO}" font-size="14" fill="${INK}" text-anchor="middle">only the second flips</text>
    <text x="320" y="222" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">9 = 11, impossible</text>

    <rect x="436" y="150" width="146" height="86" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="1.5"/>
    <text x="509" y="176" font-family="${FONT}" font-size="13" font-weight="bold" fill="${BLUE}" text-anchor="middle">x ≥ 5</text>
    <text x="509" y="200" font-family="${MONO}" font-size="14" fill="${INK}" text-anchor="middle">neither flips</text>
    <text x="509" y="222" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">2x − 1 = 11</text>

    <text x="320" y="270" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">x = −5   or   x = 6</text>
    <text x="320" y="290" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">A solution only counts if it lands inside the region that produced it.</text>
  </svg>`

// ── 7. Less than: one interval ──────────────────────────────────────────────
const W7 = win({ xMin: -2.4, xMax: 3.4, yMin: -0.8, yMax: 5, ox: 240, oy: 262, ux: 64, uy: 40 })
const LESS_THAN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340" class="w-full h-full">
    ${plate(640, 340)}
    <text x="320" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">|2x − 1| &lt; 3 — the V is BELOW the line between the crossings</text>
    ${lattice(W7, 34, 458, 46, 292)}
    ${axes(W7, 34, 458, 292, 46)}
    <rect x="${W7.X(-1)}" y="46" width="${W7.X(2) - W7.X(-1)}" height="${W7.Y(0) - 46}" fill="${GREEN}" opacity="0.12"/>
    <path d="${ray(W7, 0, 3)}" fill="none" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>
    <path d="${vee(W7, 2, 0.5, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${W7.X(-1)}" cy="${W7.Y(3)}" r="6" fill="${INK}"/>
    <circle cx="${W7.X(2)}" cy="${W7.Y(3)}" r="6" fill="${INK}"/>
    <text x="${W7.X(-1) - 16}" y="${W7.Y(3) - 12}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="${W7.X(2) + 16}" y="${W7.Y(3) - 12}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="${W7.X(-1)}" y="${W7.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">−1</text>
    <text x="${W7.X(2)}" y="${W7.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">2</text>
    <text x="86" y="88" font-family="${MONO}" font-size="16" font-weight="bold" fill="${BLUE}">y = |2x − 1|</text>
    <text x="410" y="${W7.Y(3) - 12}" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">y = 3</text>

    <rect x="474" y="72" width="150" height="188" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.6"/>
    <text x="549" y="102" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">By algebra</text>
    <text x="549" y="134" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">−3 &lt; 2x − 1 &lt; 3</text>
    <text x="549" y="166" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">−2 &lt; 2x &lt; 4</text>
    <text x="549" y="198" font-family="${MONO}" font-size="16" font-weight="bold" fill="${GREEN}" text-anchor="middle">−1 &lt; x &lt; 2</text>
    <text x="549" y="236" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">ONE sentence,</text>
    <text x="549" y="252" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">no "or".</text>

    <line x1="70" y1="318" x2="440" y2="318" stroke="${RULE}" stroke-width="2"/>
    <line x1="${W7.X(-1)}" y1="318" x2="${W7.X(2)}" y2="318" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${W7.X(-1)}" cy="318" r="6" fill="#ffffff" stroke="${GREEN}" stroke-width="3"/>
    <circle cx="${W7.X(2)}" cy="318" r="6" fill="#ffffff" stroke="${GREEN}" stroke-width="3"/>
  </svg>`

// ── 8. Greater than: two rays ───────────────────────────────────────────────
const W8 = win({ xMin: -5, xMax: 2, yMin: -0.8, yMax: 6, ox: 356, oy: 262, ux: 54, uy: 34 })
const MORE_THAN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340" class="w-full h-full">
    ${plate(640, 340)}
    <text x="320" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">|2x + 3| &gt; 4 — the V is ABOVE the line OUTSIDE the crossings</text>
    ${lattice(W8, 34, 458, 46, 292)}
    ${axes(W8, 34, 458, 292, 46)}
    <rect x="34" y="46" width="${W8.X(-3.5) - 34}" height="${W8.Y(0) - 46}" fill="${GREEN}" opacity="0.12"/>
    <rect x="${W8.X(0.5)}" y="46" width="${458 - W8.X(0.5)}" height="${W8.Y(0) - 46}" fill="${GREEN}" opacity="0.12"/>
    <path d="${ray(W8, 0, 4)}" fill="none" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>
    <path d="${vee(W8, 2, -1.5, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${W8.X(-3.5)}" cy="${W8.Y(4)}" r="6" fill="${INK}"/>
    <circle cx="${W8.X(0.5)}" cy="${W8.Y(4)}" r="6" fill="${INK}"/>
    <text x="${W8.X(-3.5) - 16}" y="${W8.Y(4) - 12}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="${W8.X(0.5) + 16}" y="${W8.Y(4) - 12}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="${W8.X(-3.5)}" y="${W8.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">−7/2</text>
    <text x="${W8.X(0.5) + 12}" y="${W8.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">1/2</text>
    <text x="70" y="88" font-family="${MONO}" font-size="16" font-weight="bold" fill="${BLUE}">y = |2x + 3|</text>
    <text x="418" y="${W8.Y(4) - 12}" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">y = 4</text>

    <rect x="482" y="72" width="130" height="188" rx="12" fill="${AMBER_T}" stroke="${AMBER}" stroke-width="1.6"/>
    <text x="547" y="102" font-family="${FONT}" font-size="14" font-weight="bold" fill="${AMBER}" text-anchor="middle">By algebra</text>
    <text x="547" y="132" font-family="${MONO}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">2x + 3 &lt; −4</text>
    <text x="547" y="154" font-family="${FONT}" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">or</text>
    <text x="547" y="176" font-family="${MONO}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">2x + 3 &gt; 4</text>
    <text x="547" y="212" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">x &lt; −7/2</text>
    <text x="547" y="238" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">or x &gt; 1/2</text>

    <line x1="70" y1="318" x2="440" y2="318" stroke="${RULE}" stroke-width="2"/>
    <line x1="70" y1="318" x2="${W8.X(-3.5)}" y2="318" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${W8.X(0.5)}" y1="318" x2="440" y2="318" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${W8.X(-3.5)}" cy="318" r="6" fill="#ffffff" stroke="${GREEN}" stroke-width="3"/>
    <circle cx="${W8.X(0.5)}" cy="318" r="6" fill="#ffffff" stroke="${GREEN}" stroke-width="3"/>
  </svg>`

// ── 9. The two rules and the shape of each answer ───────────────────────────
const INSIDE_OUT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}
    <text x="330" y="34" font-family="${FONT}" font-size="17" font-weight="bold" fill="${MUTED}" text-anchor="middle">Which way the sign points decides the SHAPE of the answer</text>

    <rect x="24" y="56" width="300" height="216" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.8"/>
    <text x="174" y="88" font-family="${MONO}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">|p| ≤ q  ⇔  −q ≤ p ≤ q</text>
    <text x="174" y="120" font-family="${FONT}" font-size="14" fill="${GREEN}" text-anchor="middle">SMALL modulus — p is trapped near 0</text>
    <line x1="60" y1="160" x2="288" y2="160" stroke="${RULE}" stroke-width="2"/>
    <line x1="118" y1="160" x2="230" y2="160" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="118" cy="160" r="6" fill="${GREEN}"/>
    <circle cx="230" cy="160" r="6" fill="${GREEN}"/>
    <text x="174" y="200" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">ONE interval. One sentence.</text>
    <text x="174" y="230" font-family="${MONO}" font-size="15" fill="${MUTED}" text-anchor="middle">2 ≤ x ≤ 7</text>
    <text x="174" y="256" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">Never write "or" here.</text>

    <rect x="336" y="56" width="300" height="216" rx="14" fill="${AMBER_T}" stroke="${AMBER}" stroke-width="1.8"/>
    <text x="486" y="88" font-family="${MONO}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">|p| ≥ q ⇔ p ≤ −q or p ≥ q</text>
    <text x="486" y="120" font-family="${FONT}" font-size="14" fill="${AMBER}" text-anchor="middle">BIG modulus — p is far from zero</text>
    <line x1="372" y1="160" x2="600" y2="160" stroke="${RULE}" stroke-width="2"/>
    <line x1="372" y1="160" x2="430" y2="160" stroke="${AMBER}" stroke-width="6" stroke-linecap="round"/>
    <line x1="542" y1="160" x2="600" y2="160" stroke="${AMBER}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="430" cy="160" r="6" fill="${AMBER}"/>
    <circle cx="542" cy="160" r="6" fill="${AMBER}"/>
    <text x="486" y="200" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">TWO rays. Two sentences.</text>
    <text x="486" y="230" font-family="${MONO}" font-size="15" fill="${MUTED}" text-anchor="middle">x ≤ 2  or  x ≥ 7</text>
    <text x="486" y="256" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">Never write it as one chain.</text>
  </svg>`

// ── 10. Finishing a squared inequality on the parabola ──────────────────────
const W10 = win({ xMin: -5.6, xMax: 2.4, yMin: -12, yMax: 10, ox: 380, oy: 158, ux: 58, uy: 9.5 })
const SIGN_PARABOLA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" class="w-full h-full">
    ${plate(640, 320)}
    <text x="320" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">3x² + 10x − 8 ≥ 0 — at or above the axis, OUTSIDE the roots</text>
    <line x1="40" y1="${W10.Y(0)}" x2="600" y2="${W10.Y(0)}" stroke="${RULE}" stroke-width="1.8"/>
    <path d="${curve(W10, (x) => 3 * x * x + 10 * x - 8)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="${W10.X(-4)}" cy="${W10.Y(0)}" r="7" fill="${AMBER}"/>
    <circle cx="${W10.X(0.6667)}" cy="${W10.Y(0)}" r="7" fill="${AMBER}"/>
    <text x="${W10.X(-4)}" y="${W10.Y(0) + 26}" font-family="${MONO}" font-size="17" font-weight="bold" fill="${AMBER}" text-anchor="middle">−4</text>
    <text x="${W10.X(0.6667) + 8}" y="${W10.Y(0) + 26}" font-family="${MONO}" font-size="17" font-weight="bold" fill="${AMBER}" text-anchor="middle">2/3</text>
    <text x="90" y="${W10.Y(0) - 20}" font-family="${MONO}" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">+</text>
    <text x="${W10.X(-1.7)}" y="${W10.Y(0) + 74}" font-family="${MONO}" font-size="22" font-weight="bold" fill="${RED}" text-anchor="middle">−</text>
    <text x="556" y="${W10.Y(0) - 20}" font-family="${MONO}" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">+</text>
    <text x="440" y="66" font-family="${MONO}" font-size="17" font-weight="bold" fill="${BLUE}">y = 3x² + 10x − 8</text>
    <text x="440" y="90" font-family="${MONO}" font-size="15" fill="${MUTED}">= (3x − 2)(x + 4)</text>

    <rect x="150" y="252" width="340" height="48" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="1.6"/>
    <text x="320" y="283" font-family="${MONO}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">x ≤ −4   or   x ≥ 2/3</text>
  </svg>`

// ── 11. Reading the same answer off two V graphs ────────────────────────────
const W11 = win({ xMin: -7.5, xMax: 9.5, yMin: -1, yMax: 10, ox: 250, oy: 276, ux: 33, uy: 22 })
const WE6_GRAPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 340" class="w-full h-full">
    ${plate(620, 340)}
    <text x="310" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">|2x + 1| ≥ |3 − x| — blue is above red outside the crossings</text>
    ${lattice(W11, 32, 588, 46, 306)}
    ${axes(W11, 32, 588, 306, 46)}
    <path d="${vee(W11, 2, -0.5, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${vee(W11, 1, 3, 0)}" fill="none" stroke="${RED}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    ${meet(W11, -4, 7, AMBER)}
    ${meet(W11, 0.6667, 2.3333, AMBER)}
    <text x="${W11.X(-4) - 18}" y="${W11.Y(7) - 12}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="${W11.X(0.6667) + 20}" y="${W11.Y(2.3333) - 10}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="${W11.X(-4)}" y="${W11.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">−4</text>
    <text x="${W11.X(0.6667) + 26}" y="${W11.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">2/3</text>
    <text x="120" y="76" font-family="${MONO}" font-size="16" font-weight="bold" fill="${BLUE}">y = |2x + 1|</text>
    <text x="470" y="110" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}">y = |3 − x|</text>
    <line x1="60" y1="322" x2="560" y2="322" stroke="${RULE}" stroke-width="2"/>
    <line x1="60" y1="322" x2="${W11.X(-4)}" y2="322" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${W11.X(0.6667)}" y1="322" x2="560" y2="322" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${W11.X(-4)}" cy="322" r="6" fill="${GREEN}"/>
    <circle cx="${W11.X(0.6667)}" cy="322" r="6" fill="${GREEN}"/>
  </svg>`

// ── 12. Why the right-hand side has to be positive before you square ────────
const W12 = win({ xMin: -1, xMax: 4.4, yMin: -1.6, yMax: 5, ox: 128, oy: 250, ux: 74, uy: 40 })
const RHS_TRAP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 330" class="w-full h-full">
    ${plate(640, 330)}
    <text x="320" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">|2x − 3| ≤ x − 1 — a modulus can never be below a NEGATIVE line</text>
    ${lattice(W12, 34, 470, 46, 292)}
    ${axes(W12, 34, 470, 292, 46)}
    <rect x="${W12.X(1.3333)}" y="46" width="${W12.X(2) - W12.X(1.3333)}" height="${W12.Y(0) - 46}" fill="${GREEN}" opacity="0.16"/>
    <path d="${ray(W12, 1, -1)}" fill="none" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>
    <path d="${vee(W12, 2, 1.5, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${W12.X(1.3333)}" cy="${W12.Y(0.3333)}" r="6" fill="${INK}"/>
    <circle cx="${W12.X(2)}" cy="${W12.Y(1)}" r="6" fill="${INK}"/>
    <text x="${W12.X(1.3333) - 6}" y="${W12.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">4/3</text>
    <text x="${W12.X(2) + 16}" y="${W12.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">2</text>
    <text x="60" y="88" font-family="${MONO}" font-size="15" font-weight="bold" fill="${BLUE}">y = |2x − 3|</text>
    <text x="392" y="120" font-family="${MONO}" font-size="15" font-weight="bold" fill="${RED}">y = x − 1</text>
    <text x="60" y="${W12.Y(-1.1)}" font-family="${FONT}" font-size="13" fill="${RED}">line is below zero here</text>

    <rect x="480" y="66" width="140" height="196" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="1.6"/>
    <text x="550" y="94" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RED}" text-anchor="middle">Before squaring</text>
    <text x="550" y="122" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">x − 1 ≥ 0</text>
    <text x="550" y="146" font-family="${MONO}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">x ≥ 1</text>
    <text x="550" y="180" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">then square, then</text>
    <text x="550" y="198" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">keep only what</text>
    <text x="550" y="216" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">obeys both.</text>
    <text x="550" y="248" font-family="${MONO}" font-size="16" font-weight="bold" fill="${GREEN}" text-anchor="middle">4/3 ≤ x ≤ 2</text>
  </svg>`

// ── 13. A modulus inside a quadratic ────────────────────────────────────────
const W13 = win({ xMin: -5.4, xMax: 5.4, yMin: -3, yMax: 9, ox: 310, oy: 232, ux: 46, uy: 20 })
const ABS_QUAD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 320" class="w-full h-full">
    ${plate(620, 320)}
    <text x="310" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">f(x) = x² − 6|x| + 8 — the right half, reflected</text>
    ${lattice(W13, 32, 588, 46, 296)}
    ${axes(W13, 32, 588, 296, 46)}
    <path d="${curve(W13, (x) => x * x - 6 * Math.abs(x) + 8)}" fill="none" stroke="${PURPLE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${W13.X(-4)}" cy="${W13.Y(0)}" r="5.5" fill="${RED}"/>
    <circle cx="${W13.X(-2)}" cy="${W13.Y(0)}" r="5.5" fill="${RED}"/>
    <circle cx="${W13.X(2)}" cy="${W13.Y(0)}" r="5.5" fill="${RED}"/>
    <circle cx="${W13.X(4)}" cy="${W13.Y(0)}" r="5.5" fill="${RED}"/>
    <text x="${W13.X(-4)}" y="${W13.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">−4</text>
    <text x="${W13.X(-2)}" y="${W13.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">−2</text>
    <text x="${W13.X(2)}" y="${W13.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">2</text>
    <text x="${W13.X(4)}" y="${W13.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">4</text>
    <circle cx="${W13.X(-3)}" cy="${W13.Y(-1)}" r="5.5" fill="${GREEN}"/>
    <circle cx="${W13.X(3)}" cy="${W13.Y(-1)}" r="5.5" fill="${GREEN}"/>
    <text x="${W13.X(-3)}" y="${W13.Y(-1) + 26}" font-family="${MONO}" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">(−3, −1)</text>
    <text x="${W13.X(3)}" y="${W13.Y(-1) + 26}" font-family="${MONO}" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">(3, −1)</text>
    <text x="465" y="80" font-family="${MONO}" font-size="16" font-weight="bold" fill="${PURPLE}">y = x² − 6|x| + 8</text>
    <text x="310" y="312" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">Four roots, two minimum points, and the range is f(x) ≥ −1.</text>
  </svg>`

// ── 14. The printed grid for Exercise 4.2 question 1 ────────────────────────
const W14 = win({ xMin: -1, xMax: 10.5, yMin: -1, yMax: 8.6, ox: 84, oy: 268, ux: 46, uy: 27 })
const EX_Q1_GRID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full">
    ${plate(620, 330)}
    ${lattice(W14, 36, 592, 40, 296)}
    ${axes(W14, 36, 592, 296, 40)}
    <path d="${vee(W14, 1, 2, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${vee(W14, 2, 5, 0)}" fill="none" stroke="${RED}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    ${meet(W14, 4, 2, AMBER)}
    ${meet(W14, 8, 6, AMBER)}
    <text x="${W14.X(2)}" y="${W14.Y(0) + 24}" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="${W14.X(4)}" y="${W14.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">4</text>
    <text x="${W14.X(5)}" y="${W14.Y(0) + 24}" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">5</text>
    <text x="${W14.X(8)}" y="${W14.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">8</text>
    <text x="540" y="86" font-family="${MONO}" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">y = |x − 2|</text>
    <text x="330" y="72" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">y = |2x − 10|</text>
    <text x="310" y="318" font-family="${FONT}" font-size="13" fill="${MUTED}" text-anchor="middle">The two graphs cross at x = 4 and x = 8.</text>
  </svg>`

// ── 15. The sketch Exercise 4.2 question 2 asks for ─────────────────────────
const W15 = win({ xMin: -1.4, xMax: 6.4, yMin: -1, yMax: 8, ox: 132, oy: 270, ux: 62, uy: 28 })
const EX_Q2_GRID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full">
    ${plate(620, 330)}
    <text x="310" y="28" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">y = |3x − 6| and y = |4 − x| on one grid</text>
    ${lattice(W15, 36, 592, 44, 298)}
    ${axes(W15, 36, 592, 298, 44)}
    <path d="${vee(W15, 3, 2, 0)}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${vee(W15, 1, 4, 0)}" fill="none" stroke="${RED}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    ${meet(W15, 1, 3, AMBER)}
    ${meet(W15, 2.5, 1.5, AMBER)}
    <text x="${W15.X(1)}" y="${W15.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">1</text>
    <text x="${W15.X(2.5) + 22}" y="${W15.Y(0) + 24}" font-family="${MONO}" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">5/2</text>
    <text x="${W15.X(2)}" y="${W15.Y(0) + 42}" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="${W15.X(4)}" y="${W15.Y(0) + 24}" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">4</text>
    <text x="150" y="76" font-family="${MONO}" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">y = |3x − 6|</text>
    <text x="520" y="120" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">y = |4 − x|</text>
    <line x1="60" y1="316" x2="560" y2="316" stroke="${RULE}" stroke-width="2"/>
    <line x1="60" y1="316" x2="${W15.X(1)}" y2="316" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${W15.X(2.5)}" y1="316" x2="560" y2="316" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${W15.X(1)}" cy="316" r="6" fill="${GREEN}"/>
    <circle cx="${W15.X(2.5)}" cy="316" r="6" fill="${GREEN}"/>
  </svg>`

export const DIAGRAMS = {
  MODULUS_DEF: MODULUS_DEF,
  EQUIV_BOX: EQUIV_BOX,
  WE1_GRAPH: WE1_GRAPH,
  WE2_GRAPH: WE2_GRAPH,
  TWO_METHODS: TWO_METHODS,
  SUM_REGIONS: SUM_REGIONS,
  LESS_THAN: LESS_THAN,
  MORE_THAN: MORE_THAN,
  INSIDE_OUT: INSIDE_OUT,
  SIGN_PARABOLA: SIGN_PARABOLA,
  WE6_GRAPH: WE6_GRAPH,
  RHS_TRAP: RHS_TRAP,
  ABS_QUAD: ABS_QUAD,
  EX_Q1_GRID: EX_Q1_GRID,
  EX_Q2_GRID: EX_Q2_GRID,
}
