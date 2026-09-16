// src/data/ADD_MATH/AM_5A/diagrams.js
// Teaching diagrams for AM_5A — Logarithms and the Laws of Logs
// (Cambridge IGCSE Additional Mathematics 0606, sections 5.1–5.3).
//
// House rules (docs/svg-diagrams.md, and the AM_4B deck):
//  · every diagram opens with a white plate, so it reads on a light OR a dark
//    slide and never depends on the page's text colour;
//  · every <text> is written out LITERALLY, coordinates included — helpers emit
//    paths only, because `npm run audit:svg` cannot see text a helper builds;
//  · anything mathematical is set in MONO, prose labels in the sans stack;
//  · one colour per concept: BLUE is the base and the exponential curve, RED
//    the log curve and what a log refuses, GREEN the power (the log's answer)
//    and the domain, AMBER the number inside the log, PURPLE a law or a range.
//
// THE ARGUMENT THIS FILE CARRIES, in order:
//   POWER_LADDER_2   the powers of 2 as equally spaced rungs: 50 sits at ≈ 5.64.
//   PH_SCALE         a log scale in the wild — each pH step is ten times.
//   TWO_FORMS        2³ = 8 and log₂ 8 = 3: one fact, base / power / number.
//   LOG_GRAPH        y = 2ˣ and y = log₂ x, mirror images in y = x.
//   DOMAIN_RANGE     what goes in (x > 0) and what comes out (everything).
//   SLIDE_RULE       lg 20 + lg 5: adding lengths multiplies the numbers.
//   LAWS_TABLE       each law of logs is an index law read through a log.

const INK = '#1e293b'
const MUTED = '#64748b'
const BLUE = '#3b82f6'
const RED = '#ef4444'
const GREEN = '#10b981'
const AMBER = '#d97706'
const PURPLE = '#a855f7'
const SKY_DARK = '#075985'
const CARD = '#f8fafc'
const LINE = '#e2e8f0'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A graph window: origin in pixels and pixels per unit. */
const win = (o) => ({ ...o, X: (x) => o.ox + x * o.u, Y: (y) => o.oy - y * o.u })

/** A sampled path, broken wherever the curve leaves the window. */
function curve(w, f, x0, x1, steps = 400) {
  let d = ''
  let pen = false
  for (let i = 0; i <= steps; i += 1) {
    const x = x0 + ((x1 - x0) * i) / steps
    const y = f(x)
    if (!Number.isFinite(y) || y < w.yMin || y > w.yMax) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${w.X(x).toFixed(1)} ${w.Y(y).toFixed(1)} `
    pen = true
  }
  return d.trim()
}

/** Faint integer gridlines inside a window. */
function lattice(w, x0, x1, y0, y1) {
  let d = ''
  for (let x = x0; x <= x1; x += 1) d += `M${w.X(x)} ${w.Y(y0)} L${w.X(x)} ${w.Y(y1)} `
  for (let y = y0; y <= y1; y += 1) d += `M${w.X(x0)} ${w.Y(y)} L${w.X(x1)} ${w.Y(y)} `
  return d.trim()
}

/* ------------------------------------------------------------ the windows */

// LOG_GRAPH: origin (250, 230), 50 px per unit.
const G = win({ ox: 250, oy: 230, u: 50, yMin: -3.2, yMax: 4.2 })
// DOMAIN_RANGE: origin (150, 205), 44 px per unit.
const D = win({ ox: 150, oy: 205, u: 44, yMin: -3.9, yMax: 3.9 })

const log2 = (x) => Math.log(x) / Math.log(2)

const G_GRID = lattice(G, -4, 5, -3, 4)
const G_EXP = curve(G, (x) => 2 ** x, -4.2, 2.1)
const G_LOG = curve(G, log2, 0.1, 5.8)
const D_LOG = curve(D, log2, 0.06, 8.8)

/* ============================================================ POWER_LADDER_2 */
// The powers of 2 at equal spacing (86.67 px a rung, rung 0 at x = 50). The
// distance along IS the log, so 50 lands at 50 + 86.67 × 5.644 = 539.
const POWER_LADDER_2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 200" class="w-full h-full drop-shadow-md">
    ${plate(620, 200)}
    <text x="24" y="28" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}">POWERS OF 2</text>
    <line x1="30" y1="86" x2="590" y2="86" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 70 L50 102 M137 70 L137 102 M223 70 L223 102 M310 70 L310 102 M397 70 L397 102 M483 70 L483 102 M570 70 L570 102" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <text x="50" y="62" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">1</text>
    <text x="137" y="62" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">2</text>
    <text x="223" y="62" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">4</text>
    <text x="310" y="62" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">8</text>
    <text x="397" y="62" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">16</text>
    <text x="483" y="62" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">32</text>
    <text x="570" y="62" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">64</text>
    <rect x="37" y="112" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="124" y="112" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="210" y="112" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="297" y="112" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="384" y="112" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="470" y="112" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="557" y="112" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <text x="50" y="127" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">0</text>
    <text x="137" y="127" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">1</text>
    <text x="223" y="127" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">2</text>
    <text x="310" y="127" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">3</text>
    <text x="397" y="127" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">4</text>
    <text x="483" y="127" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">5</text>
    <text x="570" y="127" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">6</text>
    <text x="539" y="36" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${AMBER}">50</text>
    <path d="M539 42 L539 76" stroke="${AMBER}" stroke-width="2" stroke-dasharray="3 3"/>
    <circle cx="539" cy="86" r="8" fill="${AMBER}" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M539 96 L539 148" stroke="${AMBER}" stroke-width="2" stroke-dasharray="3 3"/>
    <rect x="360" y="148" width="240" height="36" rx="12" fill="#fffbeb" stroke="${AMBER}" stroke-width="1.5"/>
    <text x="480" y="172" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="#92400e">log₂ 50 ≈ 5.64</text>
    <text x="24" y="172" font-family="${FONT}" font-size="12" font-weight="bold" fill="${SKY_DARK}">THE POWER = THE LOG</text>
  </svg>`

/* ============================================================ PH_SCALE */
// pH runs 1 to 13 at 45 px a step. Each step is a factor of ten in acidity,
// so a scale that would need a trillion-fold range fits on one line.
const PH_SCALE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 230" class="w-full h-full drop-shadow-md">
    ${plate(620, 230)}
    <defs>
      <linearGradient id="am5a-ph-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ef4444"/>
        <stop offset="0.35" stop-color="#f59e0b"/>
        <stop offset="0.5" stop-color="#10b981"/>
        <stop offset="0.75" stop-color="#3b82f6"/>
        <stop offset="1" stop-color="#a855f7"/>
      </linearGradient>
    </defs>
    <text x="24" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}">THE PH SCALE IS A LOG SCALE</text>
    <rect x="40" y="100" width="540" height="22" rx="11" fill="url(#am5a-ph-grad)"/>
    <text x="85" y="76" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">lemon juice</text>
    <text x="220" y="76" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">coffee</text>
    <text x="310" y="76" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">pure water</text>
    <text x="400" y="76" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">baking soda</text>
    <text x="572" y="76" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">bleach</text>
    <path d="M85 82 L85 98 M220 82 L220 98 M310 82 L310 98 M400 82 L400 98 M580 82 L580 98" stroke="${INK}" stroke-width="2"/>
    <text x="40" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">1</text>
    <text x="85" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">2</text>
    <text x="130" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">3</text>
    <text x="175" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">4</text>
    <text x="220" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">5</text>
    <text x="265" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">6</text>
    <text x="310" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">7</text>
    <text x="355" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">8</text>
    <text x="400" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">9</text>
    <text x="445" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">10</text>
    <text x="490" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">11</text>
    <text x="535" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">12</text>
    <text x="580" y="142" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="bold" fill="${INK}">13</text>
    <path d="M40 172 l12 -6 l0 12 z" fill="${RED}"/>
    <text x="58" y="177" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RED}">more acidic</text>
    <path d="M580 172 l-12 -6 l0 12 z" fill="${PURPLE}"/>
    <text x="562" y="177" text-anchor="end" font-family="${FONT}" font-size="13" font-weight="bold" fill="${PURPLE}">less acidic</text>
    <text x="310" y="212" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}">each step of 1 is 10 times the acidity</text>
  </svg>`

/* ============================================================ TWO_FORMS */
// One fact in two notations, colour-matched: base BLUE, power GREEN, number AMBER.
const TWO_FORMS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 280" class="w-full h-full drop-shadow-md">
    ${plate(640, 280)}
    <rect x="20" y="20" width="270" height="212" rx="14" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <rect x="350" y="20" width="270" height="212" rx="14" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <text x="155" y="48" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${MUTED}">EXPONENTIAL FORM</text>
    <text x="485" y="48" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${MUTED}">LOG FORM</text>
    <text x="124" y="84" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}">power</text>
    <text x="215" y="84" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${AMBER}">number</text>
    <text x="95" y="152" text-anchor="middle" font-family="${MONO}" font-size="60" font-weight="900" fill="${BLUE}">2</text>
    <text x="126" y="118" text-anchor="middle" font-family="${MONO}" font-size="34" font-weight="900" fill="${GREEN}">3</text>
    <text x="165" y="148" text-anchor="middle" font-family="${MONO}" font-size="48" font-weight="900" fill="${INK}">=</text>
    <text x="215" y="152" text-anchor="middle" font-family="${MONO}" font-size="60" font-weight="900" fill="${AMBER}">8</text>
    <text x="95" y="198" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}">base</text>
    <text x="487" y="84" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${AMBER}">number</text>
    <text x="398" y="148" text-anchor="middle" font-family="${MONO}" font-size="42" font-weight="900" fill="${INK}">log</text>
    <text x="448" y="168" text-anchor="middle" font-family="${MONO}" font-size="28" font-weight="900" fill="${BLUE}">2</text>
    <text x="487" y="152" text-anchor="middle" font-family="${MONO}" font-size="60" font-weight="900" fill="${AMBER}">8</text>
    <text x="536" y="148" text-anchor="middle" font-family="${MONO}" font-size="48" font-weight="900" fill="${INK}">=</text>
    <text x="584" y="152" text-anchor="middle" font-family="${MONO}" font-size="60" font-weight="900" fill="${GREEN}">3</text>
    <text x="448" y="206" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}">base</text>
    <text x="584" y="206" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}">power</text>
    <path d="M302 126 L338 126" stroke="${INK}" stroke-width="2.5"/>
    <path d="M296 126 l10 -6 l0 12 z M344 126 l-10 -6 l0 12 z" fill="${INK}"/>
    <text x="320" y="262" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}">Same fact, two forms: the log IS the power.</text>
  </svg>`

/* ============================================================ LOG_GRAPH */
// y = 2^x (BLUE) and y = log₂ x (RED), mirror images in y = x (dashed). The
// mirrored pair (1, 2) and (2, 1) is joined to show the reflection. A hotspot
// activity uses this figure: its point labels are stripped at runtime.
const LOG_GRAPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 400" class="w-full h-full drop-shadow-md">
    ${plate(560, 400)}
    <path d="${G_GRID}" stroke="#eef2f7" stroke-width="1" fill="none"/>
    <line x1="30" y1="230" x2="545" y2="230" stroke="${INK}" stroke-width="1.8"/>
    <line x1="250" y1="392" x2="250" y2="14" stroke="${INK}" stroke-width="1.8"/>
    <path d="M545 230 l-9 -4.5 l0 9 z M250 14 l-4.5 9 l9 0 z" fill="${INK}"/>
    <line x1="90" y1="390" x2="460" y2="20" stroke="${MUTED}" stroke-width="2" stroke-dasharray="7 6"/>
    <path d="${G_EXP}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="${G_LOG}" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <path d="M300 130 L350 180" stroke="${PURPLE}" stroke-width="2" stroke-dasharray="4 4"/>
    <circle cx="250" cy="180" r="6" fill="${BLUE}"/>
    <circle cx="300" cy="130" r="6" fill="${BLUE}"/>
    <circle cx="300" cy="230" r="6" fill="${RED}"/>
    <circle cx="350" cy="180" r="6" fill="${RED}"/>
    <text x="230" y="60" text-anchor="end" font-family="${MONO}" font-size="16" font-weight="bold" fill="${BLUE}">y = 2^x</text>
    <text x="480" y="164" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="bold" fill="${RED}">y = log₂ x</text>
    <text x="468" y="32" font-family="${MONO}" font-size="14" font-weight="bold" fill="${MUTED}">y = x</text>
    <text x="242" y="174" text-anchor="end" font-family="${MONO}" font-size="13" font-weight="bold" fill="${BLUE}">(0, 1)</text>
    <text x="308" y="250" font-family="${MONO}" font-size="13" font-weight="bold" fill="${RED}">(1, 0)</text>
    <text x="48" y="252" font-family="${FONT}" font-size="12" font-weight="bold" fill="${BLUE}">gets close to the x-axis</text>
    <text x="270" y="380" font-family="${FONT}" font-size="12" font-weight="bold" fill="${RED}">gets close to the y-axis</text>
    <text x="536" y="250" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">x</text>
    <text x="260" y="26" font-family="${MONO}" font-size="14" font-style="italic" fill="${INK}">y</text>
  </svg>`

/* ============================================================ DOMAIN_RANGE */
// y = log₂ x with its domain (GREEN, along the x-axis, open at 0), its range
// (PURPLE, the whole y direction) and the region where no log exists (RED).
const DOMAIN_RANGE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 412" class="w-full h-full drop-shadow-md">
    ${plate(560, 412)}
    <rect x="24" y="36" width="126" height="344" rx="10" fill="#fef2f2"/>
    <text x="87" y="112" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RED}">no log here</text>
    <text x="87" y="132" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="bold" fill="${RED}">x ≤ 0</text>
    <line x1="24" y1="205" x2="545" y2="205" stroke="${INK}" stroke-width="1.8"/>
    <line x1="150" y1="388" x2="150" y2="40" stroke="${INK}" stroke-width="1.8"/>
    <path d="M545 205 l-9 -4.5 l0 9 z" fill="${INK}"/>
    <path d="${D_LOG}" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <line x1="150" y1="240" x2="532" y2="240" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <path d="M544 240 l-12 -7 l0 14 z" fill="${GREEN}"/>
    <circle cx="150" cy="240" r="7" fill="#ffffff" stroke="${GREEN}" stroke-width="3"/>
    <text x="400" y="266" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="bold" fill="${GREEN}">domain: x &gt; 0</text>
    <line x1="132" y1="58" x2="132" y2="362" stroke="${PURPLE}" stroke-width="6" stroke-linecap="round"/>
    <path d="M132 46 l-7 12 l14 0 z M132 374 l-7 -12 l14 0 z" fill="${PURPLE}"/>
    <text x="160" y="30" font-family="${MONO}" font-size="15" font-weight="bold" fill="${PURPLE}">range: all real numbers</text>
    <circle cx="194" cy="205" r="6" fill="${RED}"/>
    <circle cx="502" cy="73" r="6" fill="${RED}"/>
    <text x="202" y="226" font-family="${MONO}" font-size="13" font-weight="bold" fill="${RED}">(1, 0)</text>
    <text x="496" y="98" text-anchor="end" font-family="${MONO}" font-size="13" font-weight="bold" fill="${RED}">(8, 3)</text>
    <text x="162" y="372" font-family="${FONT}" font-size="12" font-weight="bold" fill="${RED}">the y-axis is an asymptote</text>
    <text x="280" y="400" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Only positive numbers go in. Any number can come out.</text>
  </svg>`

/* ============================================================ SLIDE_RULE */
// The base-10 ladder (173.3 px a rung, rung 0 at x = 50). lg 20 ≈ 1.301 is a
// length that ends at x = 276; lg 5 ≈ 0.699 laid after it ends at rung 2, 100.
const SLIDE_RULE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 230" class="w-full h-full drop-shadow-md">
    ${plate(620, 230)}
    <text x="24" y="28" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}">THE BASE-10 LADDER</text>
    <line x1="30" y1="120" x2="590" y2="120" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 104 L50 136 M223 104 L223 136 M397 104 L397 136 M570 104 L570 136" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M276 110 L276 130" stroke="${AMBER}" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 82 L264 82" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    <path d="M276 82 l-12 -7 l0 14 z" fill="${BLUE}"/>
    <path d="M280 82 L385 82" stroke="${GREEN}" stroke-width="4" stroke-linecap="round"/>
    <path d="M397 82 l-12 -7 l0 14 z" fill="${GREEN}"/>
    <text x="163" y="68" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="bold" fill="${BLUE}">lg 20 ≈ 1.30</text>
    <text x="336" y="68" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="bold" fill="${GREEN}">lg 5 ≈ 0.70</text>
    <circle cx="397" cy="120" r="8" fill="${GREEN}" stroke="#ffffff" stroke-width="2.5"/>
    <text x="420" y="68" font-family="${MONO}" font-size="14" font-weight="bold" fill="${INK}">lands on lg 100 = 2</text>
    <text x="50" y="150" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">1</text>
    <text x="223" y="150" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">10</text>
    <text x="276" y="146" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="bold" fill="${AMBER}">20</text>
    <text x="397" y="150" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">100</text>
    <text x="570" y="150" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="900" fill="${INK}">1000</text>
    <rect x="37" y="172" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="210" y="172" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="384" y="172" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <rect x="557" y="172" width="26" height="20" rx="10" fill="#e0f2fe"/>
    <text x="50" y="187" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">0</text>
    <text x="223" y="187" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">1</text>
    <text x="397" y="187" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">2</text>
    <text x="570" y="187" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="900" fill="${SKY_DARK}">3</text>
    <text x="310" y="216" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">add the lengths, multiply the numbers: 20 × 5 = 100</text>
  </svg>`

/* ============================================================ LAWS_TABLE */
// Each law of logs beside the index law it comes from.
const LAWS_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" class="w-full h-full drop-shadow-md">
    ${plate(640, 300)}
    <rect x="20" y="20" width="290" height="40" rx="10" fill="#eff6ff"/>
    <rect x="330" y="20" width="290" height="40" rx="10" fill="#f3e8ff"/>
    <text x="165" y="45" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${BLUE}">INDEX LAW (POWERS)</text>
    <text x="475" y="45" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="bold" fill="${PURPLE}">LOG LAW</text>
    <rect x="20" y="70" width="290" height="68" rx="10" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <rect x="330" y="70" width="290" height="68" rx="10" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <rect x="20" y="146" width="290" height="68" rx="10" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <rect x="330" y="146" width="290" height="68" rx="10" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <rect x="20" y="222" width="290" height="68" rx="10" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <rect x="330" y="222" width="290" height="68" rx="10" fill="${CARD}" stroke="${LINE}" stroke-width="1.5"/>
    <text x="165" y="102" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">a^m × a^n = a^(m+n)</text>
    <text x="165" y="124" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}">multiply: add the powers</text>
    <text x="475" y="102" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">log(xy) = log x + log y</text>
    <text x="475" y="124" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="bold" fill="${PURPLE}">multiplication law</text>
    <text x="165" y="178" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">a^m ÷ a^n = a^(m−n)</text>
    <text x="165" y="200" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}">divide: subtract the powers</text>
    <text x="475" y="178" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">log(x/y) = log x − log y</text>
    <text x="475" y="200" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="bold" fill="${PURPLE}">division law</text>
    <text x="165" y="254" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">(a^m)^n = a^(mn)</text>
    <text x="165" y="276" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}">power of a power: multiply</text>
    <text x="475" y="254" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="bold" fill="${INK}">log(x^m) = m log x</text>
    <text x="475" y="276" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="bold" fill="${PURPLE}">power law</text>
    <path d="M312 104 L324 104 M312 180 L324 180 M312 256 L324 256" stroke="${MUTED}" stroke-width="2"/>
    <path d="M328 104 l-7 -4 l0 8 z M328 180 l-7 -4 l0 8 z M328 256 l-7 -4 l0 8 z" fill="${MUTED}"/>
  </svg>`

export const DIAGRAMS = {
  POWER_LADDER_2: POWER_LADDER_2,
  PH_SCALE: PH_SCALE,
  TWO_FORMS: TWO_FORMS,
  LOG_GRAPH: LOG_GRAPH,
  DOMAIN_RANGE: DOMAIN_RANGE,
  SLIDE_RULE: SLIDE_RULE,
  LAWS_TABLE: LAWS_TABLE,
}
