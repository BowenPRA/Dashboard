// src/data/Y7_SCI/U03_7/art.js
// The drawn pictures of 3.7 Where Does Energy Go?, as SVG strings, shared by
// the diagrams (diagrams.js), the models (widgets.jsx, story.jsx) and the
// device pictures of Where Did It Go? (ENERGY_SPLIT). Flat pale fills, dark ink
// outlines, NO text: labels are written out literally where a picture is used,
// so `npm run audit:svg` can measure them.
//
// WHERE IT COMES FROM. The classroom's art is a chain — 3.7's art.js re-exports
// 3.6's, which re-exports 3.5's — so the three decks share one set of colours
// and objects. 3.5 and 3.6 were built in this repo at the same time as 3.7, so
// this file is a TRIMMED COPY of the three: only what 3.7 draws, unchanged, plus
// an electric fan (new, the book's Question 3c). Nothing here imports another
// unit's folder.
//
// Each object is drawn about its own centre (0, 0) in a box roughly 300 × 200
// and placed with (x, y, s). Useful is GREEN and wasted is RED everywhere.

export const INK = '#2b2b2b'
export const KEY = '#c25e12'
export const MUTED = '#5b6770'
export const BLUE = '#1a5fa8'
export const GREEN = '#4a8b23'
export const RED = '#d83a2e'
export const GOLD = '#e8a317'
export const SEA = '#cfe6f5'
export const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
export const USEFUL = GREEN
export const WASTED = RED

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

export const f1 = (n) => Number(n.toFixed(1))

/** A straight arrow with a solid head. */
export const arrow = (x1, y1, x2, y2, color, w = 5, head = 18) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a)
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a)
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

/** A label's leader line, ending in a dot on the thing it names. */
export const leader = (x1, y1, x2, y2, color = KEY) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${color}"/>`

/** The white plate every diagram opens with, so it reads on a dark slide. */
export const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** Heat rising: `n` red wavy lines side by side, their feet on y. */
export const squiggles = (x, y, n = 3, gap = 24, len = 2, color = RED, w = 5) => {
  const d = Array.from({ length: n }, (_, i) => {
    const cx = f1(x + (i - (n - 1) / 2) * gap)
    return `M ${cx} ${y}${' q -8 -11 0 -22 q 8 -11 0 -22'.repeat(len)}`
  }).join(' ')
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
}

/** Sound: three arcs opening upward, stacked, centred on x. */
export const noise = (x, y, color = KEY, w = 5) =>
  `<path d="M ${x - 18} ${y} q 18 -14 36 0 M ${x - 30} ${y - 16} q 30 -24 60 0 M ${x - 42} ${y - 32} q 42 -34 84 0" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`

/* ── from 3.5 ──────────────────────────────────────────────────────────── */

/** A kettle, steaming. */
export const kettle = (x, y, s = 1) => at(x, y, s, `
  <path d="M -64 -30 Q -122 -22 -112 26 Q -106 48 -68 44" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M 58 -6 L 108 -50 L 118 -38 L 66 24 Z" fill="#dfe6ee" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -72 62 L -62 -40 Q -60 -62 -40 -62 L 40 -62 Q 60 -62 62 -40 L 72 62 Z" fill="#dfe6ee" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -38 -62 Q 0 -84 38 -62" fill="#c3c9d1" stroke="${INK}" stroke-width="4"/>
  <circle cx="0" cy="-80" r="9" fill="${INK}"/>
  <rect x="-80" y="60" width="160" height="18" rx="7" fill="#3d4650"/>
  <circle cx="0" cy="40" r="7" fill="${RED}"/>
  <path d="M 116 -64 q -12 -16 0 -32 q 12 -16 0 -32 M 140 -58 q -12 -16 0 -32 q 12 -16 0 -32" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`)

/** A mug of coffee. Hot: steam rising. */
export const mug = (x, y, s = 1, hot = true) => at(x, y, s, `
  <path d="M 46 -26 q 36 0 34 30 q -2 30 -38 30" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
  <path d="M -54 -50 L -46 52 Q -44 64 -32 64 L 32 64 Q 44 64 46 52 L 54 -50 Z" fill="#f4efe9" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="0" cy="-50" rx="54" ry="9" fill="#6b3d1f" stroke="${INK}" stroke-width="3.5"/>
  ${hot ? `<path d="M -26 -70 q -12 -16 0 -32 q 12 -16 0 -32 M 0 -74 q -12 -16 0 -32 q 12 -16 0 -32 M 26 -70 q -12 -16 0 -32 q 12 -16 0 -32" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>` : ''}`)

/** A plug in the wall, a cable, and a phone charging. */
export const charging = (x, y, s = 1) => at(x, y, s, `
  <rect x="-176" y="-56" width="84" height="112" rx="12" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
  <rect x="-114" y="-28" width="64" height="56" rx="9" fill="#e9edf1" stroke="${INK}" stroke-width="4"/>
  <path d="M -50 0 C 10 0 4 64 70 56 C 104 52 112 24 118 6" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <rect x="112" y="-74" width="66" height="116" rx="11" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
  <rect x="119" y="-63" width="52" height="86" rx="5" fill="${SEA}"/>
  <path d="M 150 -54 L 134 -20 L 146 -20 L 136 10 L 160 -28 L 148 -28 L 158 -54 Z" fill="#ffd45c" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`)

/** A clock face showing `hour` o'clock (for the story strip). */
export const clock = (x, y, hour, r = 30) => {
  const a = ((hour % 12) * 30 * Math.PI) / 180
  const ticks = [0, 90, 180, 270].map((d) => {
    const t = (d * Math.PI) / 180
    return `<line x1="${f1(x + (r - 7) * Math.sin(t))}" y1="${f1(y - (r - 7) * Math.cos(t))}" x2="${f1(x + (r - 2) * Math.sin(t))}" y2="${f1(y - (r - 2) * Math.cos(t))}" stroke="${INK}" stroke-width="3"/>`
  }).join('')
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="4"/>${ticks}
    <line x1="${x}" y1="${y}" x2="${x}" y2="${f1(y - r * 0.72)}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${x}" y1="${y}" x2="${f1(x + r * 0.5 * Math.sin(a))}" y2="${f1(y - r * 0.5 * Math.cos(a))}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
}

/** A thermometer reading `level` (0 = cold, 1 = hot). */
export const thermometer = (x, y, level, s = 1) => at(x, y, s, `
  <rect x="-12" y="-90" width="24" height="120" rx="12" fill="#ffffff" stroke="${INK}" stroke-width="3.5"/>
  <rect x="-5" y="${f1(20 - 100 * level)}" width="10" height="${f1(20 + 100 * level)}" rx="5" fill="${level > 0.5 ? RED : BLUE}"/>
  <circle cx="0" cy="44" r="20" fill="${level > 0.5 ? RED : BLUE}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M 12 -70 h 8 M 12 -40 h 8 M 12 -10 h 8" stroke="${INK}" stroke-width="2.5"/>`)

/* ── from 3.6 ──────────────────────────────────────────────────────────── */

/** A flame: an outer teardrop, an inner yellow one. */
export const flame = (cx, cy, h, outer = '#f29a2e') => `<path d="M ${cx} ${cy - h} C ${f1(cx + h * 0.42)} ${f1(cy - h * 0.45)} ${f1(cx + h * 0.36)} ${cy} ${cx} ${cy} C ${f1(cx - h * 0.36)} ${cy} ${f1(cx - h * 0.42)} ${f1(cy - h * 0.45)} ${cx} ${cy - h} Z" fill="${outer}" stroke="${INK}" stroke-width="2.5"/>
  <path d="M ${cx} ${f1(cy - h * 0.62)} C ${f1(cx + h * 0.22)} ${f1(cy - h * 0.3)} ${f1(cx + h * 0.18)} ${f1(cy - h * 0.04)} ${cx} ${f1(cy - h * 0.04)} C ${f1(cx - h * 0.18)} ${f1(cy - h * 0.04)} ${f1(cx - h * 0.22)} ${f1(cy - h * 0.3)} ${cx} ${f1(cy - h * 0.62)} Z" fill="#ffd45c"/>`

/** A lit candle on a saucer. */
export const candle = (x, y, s = 1) => at(x, y, s, `
  <ellipse cx="0" cy="84" rx="70" ry="14" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <rect x="-26" y="-30" width="52" height="112" rx="6" fill="#f4efe9" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -26 -22 q 10 10 0 22" fill="none" stroke="#e2d9cc" stroke-width="5"/>
  <line x1="0" y1="-30" x2="0" y2="-44" stroke="${INK}" stroke-width="3"/>
  ${flame(0, -40, 58)}`)

/** A radio, playing. */
export const radio = (x, y, s = 1) => at(x, y, s, `
  <line x1="40" y1="-52" x2="96" y2="-118" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <rect x="-110" y="-56" width="220" height="130" rx="18" fill="#d9822b" stroke="${INK}" stroke-width="4"/>
  <circle cx="-48" cy="8" r="40" fill="#5b3a1c" stroke="${INK}" stroke-width="3"/>
  <circle cx="-48" cy="8" r="16" fill="#3d2a17"/>
  <rect x="14" y="-30" width="76" height="34" rx="5" fill="#fff3b0" stroke="${INK}" stroke-width="3"/>
  <line x1="34" y1="-30" x2="34" y2="4" stroke="${RED}" stroke-width="3"/>
  <circle cx="30" cy="38" r="12" fill="${INK}"/><circle cx="72" cy="38" r="12" fill="${INK}"/>
  <path d="M 128 -30 q 12 22 0 44 M 146 -44 q 22 36 0 72" fill="none" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>`)

/** A toaster, two slices in, glowing red. */
export const toaster = (x, y, s = 1) => at(x, y, s, `
  <rect x="-60" y="-86" width="44" height="40" rx="6" fill="#e3b778" stroke="${INK}" stroke-width="3"/>
  <rect x="16" y="-86" width="44" height="40" rx="6" fill="#e3b778" stroke="${INK}" stroke-width="3"/>
  <rect x="-110" y="-56" width="220" height="130" rx="30" fill="#c3c9d1" stroke="${INK}" stroke-width="4"/>
  <rect x="-70" y="-56" width="52" height="10" fill="${RED}"/><rect x="18" y="-56" width="52" height="10" fill="${RED}"/>
  <rect x="98" y="-10" width="22" height="40" rx="5" fill="${INK}"/>
  <path d="M -40 -110 q -7 -9 0 -18 q 7 -9 0 -18 M 40 -110 q -7 -9 0 -18 q 7 -9 0 -18" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`)

/** A tennis ball (the bouncing ball of 3.6). */
export const tennisBall = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#d7e84a" stroke="${INK}" stroke-width="${r > 30 ? 3.5 : 2.5}"/>
  <path d="M ${f1(cx - r * 0.95)} ${f1(cy - r * 0.3)} Q ${cx} ${f1(cy + r * 0.25)} ${f1(cx + r * 0.2)} ${f1(cy + r * 0.98)} M ${f1(cx - r * 0.2)} ${f1(cy - r * 0.98)} Q ${cx} ${f1(cy - r * 0.25)} ${f1(cx + r * 0.95)} ${f1(cy + r * 0.3)}" fill="none" stroke="#ffffff" stroke-width="${r > 30 ? 4 : 3}"/>`

/* ── 3.7's own ─────────────────────────────────────────────────────────── */

/**
 * A step-through motorbike (the kind most of Vietnam rides), facing right.
 * The engine sits low between the wheels (about 0, 34) and the exhaust runs
 * back under the seat to its tip (about −178, 59). The wheels stand on y = 92.
 */
export const motorbike = (x, y, s = 1, body = BLUE) => at(x, y, s, `
  <circle cx="-95" cy="50" r="42" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="-95" cy="50" r="17" fill="#c3c9d1" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="105" cy="50" r="42" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="105" cy="50" r="17" fill="#c3c9d1" stroke="${INK}" stroke-width="2.5"/>
  <line x1="80" y1="-50" x2="105" y2="50" stroke="#8f9aa6" stroke-width="9" stroke-linecap="round"/>
  <path d="M 68 20 Q 105 -8 142 20" fill="none" stroke="${body}" stroke-width="9" stroke-linecap="round"/>
  <rect x="-38" y="12" width="76" height="44" rx="9" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <path d="M -28 24 H 28 M -28 34 H 28 M -28 44 H 28" stroke="${MUTED}" stroke-width="2.5"/>
  <path d="M -14 -24 Q 6 14 28 10 Q 48 6 74 -52" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M -14 -24 Q 6 14 28 10 Q 48 6 74 -52" fill="none" stroke="${body}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M -160 -2 Q -162 -34 -122 -36 L -26 -36 Q -6 -36 -4 -16 L -4 -2 Z" fill="${body}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -146 -36 Q -142 -56 -112 -56 L -34 -54 Q -16 -52 -18 -36 Z" fill="#2b2b2b" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-166" y="-26" width="12" height="12" rx="3" fill="${RED}" stroke="${INK}" stroke-width="2"/>
  <path d="M 30 50 Q 24 70 -10 70 L -72 62" fill="none" stroke="#8f9aa6" stroke-width="9" stroke-linecap="round"/>
  <rect x="-176" y="48" width="104" height="22" rx="11" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="-175" cy="59" rx="4" ry="7" fill="${INK}"/>
  <path d="M 60 -66 Q 96 -76 102 -56 Q 100 -40 78 -38 Z" fill="${body}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="96" cy="-55" r="9" fill="#fff3b0" stroke="${INK}" stroke-width="2.5"/>
  <line x1="74" y1="-64" x2="68" y2="-86" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <line x1="50" y1="-88" x2="88" y2="-84" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`)

/** A cooking pot of water on a wood fire, steaming (Getting started, page 117). */
export const potFire = (x, y, s = 1) => {
  const logs = `<path d="M -110 92 L 80 54 M -80 54 L 110 92" stroke="#8a5a2b" stroke-width="24" stroke-linecap="round"/>`
  const flames = [[-62, 64, 92], [58, 64, 100], [-20, 66, 70], [24, 66, 74]].map(([cx, cy, h]) =>
    `<path d="M ${cx} ${cy - h} C ${f1(cx + h * 0.42)} ${f1(cy - h * 0.45)} ${f1(cx + h * 0.36)} ${cy} ${cx} ${cy} C ${f1(cx - h * 0.36)} ${cy} ${f1(cx - h * 0.42)} ${f1(cy - h * 0.45)} ${cx} ${cy - h} Z" fill="#f29a2e" stroke="${INK}" stroke-width="2.5"/>`).join('')
  return at(x, y, s, `${logs}${flames}
  <path d="M -58 -60 L -50 6 Q -48 18 -34 18 L 34 18 Q 48 18 50 6 L 58 -60 Z" fill="#5b6770" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="0" cy="-60" rx="60" ry="11" fill="${SEA}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -58 -50 h -14 M 58 -50 h 14" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M -24 -78 q -10 -14 0 -28 q 10 -14 0 -28 M 6 -80 q -10 -14 0 -28 q 10 -14 0 -28 M 34 -78 q -10 -14 0 -28 q 10 -14 0 -28" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`)
}

const limb = (pts, color = INK, w = 7) =>
  `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`

/** Someone walking up stairs, one foot on the next step (page 117). */
export const stairs = (x, y, s = 1) => at(x, y, s, `
  <path d="M -150 92 V 52 H -90 V 12 H -30 V -28 H 30 V -68 H 90 V -108 H 150 V 92 Z" fill="#e9edf1" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  ${limb([[-24, -64], [-34, -34], [-50, 12]])}
  ${limb([[-24, -64], [6, -60], [8, -28]])}
  ${limb([[-24, -64], [-16, -134]])}
  ${limb([[-17, -124], [2, -104], [14, -86]])}
  ${limb([[-17, -124], [-36, -104], [-48, -90]])}
  <circle cx="-13" cy="-152" r="17" fill="${INK}"/>
  <path d="M -118 20 L -118 -100" stroke="${BLUE}" stroke-width="6" stroke-linecap="round"/>
  <path d="M -118 -122 L -130 -98 L -106 -98 Z" fill="${BLUE}"/>`)

/** Someone cycling along a flat road (page 117). */
export const cyclist = (x, y, s = 1) => at(x, y, s, `
  <line x1="-160" y1="92" x2="160" y2="92" stroke="${MUTED}" stroke-width="4"/>
  <circle cx="-82" cy="44" r="46" fill="none" stroke="${INK}" stroke-width="6"/>
  <circle cx="86" cy="44" r="46" fill="none" stroke="${INK}" stroke-width="6"/>
  <polyline points="-82,44 2,44 -22,-30 64,-26 86,44" fill="none" stroke="${RED}" stroke-width="7" stroke-linejoin="round"/>
  <line x1="-82" y1="44" x2="-22" y2="-30" stroke="${RED}" stroke-width="7"/>
  <line x1="2" y1="44" x2="64" y2="-26" stroke="${RED}" stroke-width="7"/>
  <line x1="64" y1="-26" x2="58" y2="-50" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  <line x1="50" y1="-52" x2="70" y2="-50" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <line x1="-36" y1="-38" x2="-8" y2="-38" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  <line x1="-22" y1="-30" x2="-22" y2="-38" stroke="${INK}" stroke-width="5"/>
  <line x1="18" y1="62" x2="-14" y2="26" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="2" cy="44" r="7" fill="${INK}"/>
  ${limb([[-20, -44], [16, -2], [16, 60]])}
  ${limb([[-20, -44], [8, -14], [-10, 30]])}
  ${limb([[-20, -44], [18, -112]])}
  ${limb([[14, -104], [40, -80], [56, -54]])}
  <circle cx="30" cy="-128" r="17" fill="${INK}"/>
  <path d="M -176 -20 H -140 M -186 6 H -142 M -176 32 H -140" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`)

/** An energy-saving lamp (a compact fluorescent): a twisted tube on a white base. */
export const twisty = (x, y, s = 1) => {
  const loops = [0, 1, 2, 3].map((k) =>
    `<rect x="-36" y="${-34 - k * 28}" width="72" height="26" rx="13" fill="#fbfdff" stroke="${INK}" stroke-width="3.5" transform="rotate(${k % 2 ? 7 : -7} 0 ${-21 - k * 28})"/>`).join('')
  return at(x, y, s, `
  ${loops}
  <path d="M -30 -8 L 30 -8 L 24 34 L -24 34 Z" fill="#ffffff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <rect x="-22" y="34" width="44" height="34" rx="5" fill="#c3c9d1" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -22 46 H 22 M -22 56 H 22" stroke="${INK}" stroke-width="2.5"/>`)
}

/** A clear filament lamp, switched on: its thin wire glows. */
export const filament = (x, y, s = 1) => at(x, y, s, `
  ${[-150, -120, -90, -60, -30, 0, 180].map((deg) => {
    const a = (deg * Math.PI) / 180
    return `<line x1="${f1(70 * Math.cos(a))}" y1="${f1(-28 + 70 * Math.sin(a))}" x2="${f1(96 * Math.cos(a))}" y2="${f1(-28 + 96 * Math.sin(a))}" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>`
  }).join('')}
  <path d="M 0 -84 C -48 -84 -60 -34 -36 -4 C -26 10 -22 20 -22 34 L 22 34 C 22 20 26 10 36 -4 C 60 -34 48 -84 0 -84 Z" fill="#fffbe6" stroke="${INK}" stroke-width="4"/>
  <path d="M -10 30 L -10 -24 M 10 30 L 10 -24" stroke="${MUTED}" stroke-width="2.5"/>
  <path d="M -10 -24 Q -6 -38 0 -24 Q 6 -38 10 -24" fill="none" stroke="${KEY}" stroke-width="4"/>
  <rect x="-24" y="34" width="48" height="34" rx="5" fill="#c3c9d1" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -24 46 H 24 M -24 56 H 24" stroke="${INK}" stroke-width="2.5"/>`)

/** A plastic shopping bag: puffed up (full of hot air) or flat and empty. */
export const bag = (x, y, s = 1, full = true) => at(x, y, s, full ? `
  <path d="M -26 -54 q 0 -30 26 -30 q 26 0 26 30" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M -40 -56 L 40 -56 Q 74 -20 62 30 Q 52 62 0 64 Q -52 62 -62 30 Q -74 -20 -40 -56 Z" fill="#f7f9fb" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -30 -40 Q -48 0 -36 34 M 30 -40 Q 46 4 34 34" fill="none" stroke="#c9d3dc" stroke-width="3"/>` : `
  <path d="M -22 -50 q 0 -26 22 -26 q 22 0 22 26" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M -34 -52 L 34 -52 L 44 54 Q 0 64 -44 54 Z" fill="#f7f9fb" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -20 -34 L -14 40 M 6 -40 L 2 44 M 24 -30 L 26 40" fill="none" stroke="#c9d3dc" stroke-width="3"/>`)

/**
 * An electric desk fan (NEW for the Dashboard: the book's Question 3c): a cage
 * of three blades on a stand, a cable to the wall, the air blowing right.
 */
export const fan = (x, y, s = 1) => {
  const blades = [0, 120, 240].map((deg) =>
    `<ellipse cx="0" cy="-34" rx="16" ry="34" fill="#9fd3f0" stroke="${INK}" stroke-width="3" transform="rotate(${deg})"/>`).join('')
  const spokes = [0, 45, 90, 135].map((deg) => {
    const a = (deg * Math.PI) / 180
    return `<line x1="${f1(-78 * Math.cos(a))}" y1="${f1(-78 * Math.sin(a))}" x2="${f1(78 * Math.cos(a))}" y2="${f1(78 * Math.sin(a))}" stroke="#9aa7b4" stroke-width="2.5"/>`
  }).join('')
  return at(x, y, s, `
  <path d="M 30 92 C 70 92 96 70 140 78" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <rect x="-58" y="78" width="116" height="18" rx="8" fill="#3d4650" stroke="${INK}" stroke-width="3"/>
  <rect x="-9" y="20" width="18" height="62" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(0 -40)">
    ${blades}
    <circle cx="0" cy="0" r="80" fill="none" stroke="${INK}" stroke-width="4"/>
    ${spokes}
    <circle cx="0" cy="0" r="14" fill="#3d4650" stroke="${INK}" stroke-width="3"/>
  </g>
  <path d="M 104 -86 h 44 M 112 -52 h 52 M 104 -18 h 44" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`)
}
