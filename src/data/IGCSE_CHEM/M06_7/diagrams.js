// src/data/IGCSE_CHEM/M06_7/diagrams.js
// Teaching diagrams for 6.7 Group 7: the Halogens (book spread 12.3, with the
// reactivity explanation from 12.4). All AUTHORED, nothing taken from the book:
// the gas jars, the iron-wool tube, the test tubes, the results table, the
// electron shells and the trend wedges are drawn here so every label is real
// <text> the SVG audit can measure, and there is no licence to carry.
//
// Colour means something on this track. Here the halogens wear their TRUE
// colours, because the colour is the chemistry the student has to remember:
//   chlorine            pale yellow-green   #d9e86a
//   bromine (liquid)    red-brown           #7f2a10   (its vapour and its
//                       solution are the lighter orange-brown #f59e0b)
//   iodine (solid)      grey-black          #2b2d38   (its solution red-brown)
// Electrons: inner shells grey, outer-shell electrons teal #0087a8, and an
// electron being GAINED amber #d97706 — the same yellow-and-amber electron as
// the proton diagram in M06_2. The acid / alkali / neutral / spectator colours
// of the track are not used at all: there is no acid or alkali in this unit.
//
// House rules (kept from M06_2 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · charges are Unicode superscripts (⁺ ⁻), never <tspan>;
//  · no gradients, clip paths or markers, so there are no ids to collide;
//  · the bar chart is drawn to scale from the book's three boiling points.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const CL = '#d9e86a', CL_S = '#8a9a24'       // chlorine, pale yellow-green
const BR = '#7f2a10', BR_V = '#f59e0b'       // bromine liquid, and its orange vapour / solution
const IO = '#2b2d38', IO_SOL = '#8a3b12'     // iodine solid, and its red-brown solution
const CLW = '#eef5b0'                        // chlorine water, pale yellow
const GLASS = '#7c8a95'
const IRON = '#6b7280'
const GLOW = '#fb923c'
const TEAL = '#0087a8', TEAL_F = '#d7eef4'   // outer-shell electrons; the reactivity wedges
const AMBER = '#d97706', AMBER_F = '#fde68a' // the electron being gained
const SHELL = '#94a3b8'
const TILE_F = '#f1f5f9'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col, w = 2.4) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="${w}"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

/** A left-pointing arrow from x1 (tail) to x2 (head) at height y. */
const arrowL = (x1, x2, y, col, w = 2.4, dash = '') => `<line x1="${x1}" y1="${y}" x2="${x2 + 8}" y2="${y}" stroke="${col}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>
    <path d="M ${x2} ${y} l 10 -6 l 0 12 z" fill="${col}"/>`

/** A plus sign drawn as two lines (not text). */
const plus = (x, y, col, a = 7) => `<line x1="${x - a}" y1="${y}" x2="${x + a}" y2="${y}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="${x}" y1="${y - a}" x2="${x}" y2="${y + a}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`

/** One electron shell (a ring). */
const ring = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${SHELL}" stroke-width="1.4"/>`

/** The nucleus disc; its symbol is written out literally beside the call. */
const nucleus = (cx, cy, r = 14) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f8fafc" stroke="${INK}" stroke-width="1.8"/>`

/**
 * `n` electrons on a shell of radius r, spaced as if the shell held `slots`,
 * starting at angle `start` (degrees; −90 is the top). Seven of eight slots
 * leaves the one gap a halogen fills; start = 45 puts that gap on the right.
 */
const electrons = (cx, cy, r, n, fill, stroke, slots = n, start = -90) => Array.from({ length: n }, (_, i) => {
  const a = ((start + (i * 360) / slots) * Math.PI) / 180
  return `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="4" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`
}).join('')

/** The empty eighth place on a halogen's outer shell, as a dashed circle. */
const gap = (cx, cy, r) => {
  const a = ((-90 + 7 * 45) * Math.PI) / 180
  return `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="4.5" fill="none" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="2 2"/>`
}

/** A tall gas jar centred on cx, with a lid, rim at y0 and floor at y1. */
const jarGlass = (cx, y0, y1, half) => `<path d="M ${cx - half} ${y0} L ${cx - half} ${y1 - 10} Q ${cx - half} ${y1} ${cx - half + 10} ${y1} L ${cx + half - 10} ${y1} Q ${cx + half} ${y1} ${cx + half} ${y1 - 10} L ${cx + half} ${y0}" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - half - 8} ${y0 - 6} L ${cx + half + 8} ${y0 - 6}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`

/** The inside of a jar, filled from ya down to the floor at y1. */
const jarFill = (cx, ya, y1, half, fill, op = 1) => `<path d="M ${cx - half} ${ya} L ${cx - half} ${y1 - 10} Q ${cx - half} ${y1} ${cx - half + 10} ${y1} L ${cx + half - 10} ${y1} Q ${cx + half} ${y1} ${cx + half} ${y1 - 10} L ${cx + half} ${ya} Z" fill="${fill}" fill-opacity="${op}"/>`

/** A test tube centred on cx, rim at y0, round floor at y1, filled from yl. */
const tube = (cx, y0, y1, half, yl, fill) => `<path d="M ${cx - half} ${yl} L ${cx - half} ${y1 - half} A ${half} ${half} 0 0 0 ${cx + half} ${y1 - half} L ${cx + half} ${yl} Z" fill="${fill}"/>
    <line x1="${cx - half}" y1="${yl}" x2="${cx + half}" y2="${yl}" stroke="${GLASS}" stroke-width="1" stroke-dasharray="3 3"/>
    <path d="M ${cx - half - 4} ${y0} L ${cx - half} ${y0 + 4} L ${cx - half} ${y1 - half} A ${half} ${half} 0 0 0 ${cx + half} ${y1 - half} L ${cx + half} ${y0 + 4} L ${cx + half + 4} ${y0}" fill="none" stroke="${GLASS}" stroke-width="2.2" stroke-linejoin="round"/>`

/** A few iodine crystals: small dark polygons on a floor at y. */
const crystals = (cx, y) => `<path d="M ${cx - 30} ${y} l 4 -10 l 10 -2 l 5 12 z" fill="${IO}"/>
    <path d="M ${cx - 12} ${y} l 3 -13 l 12 -1 l 4 14 z" fill="${IO}"/>
    <path d="M ${cx + 8} ${y} l 6 -9 l 10 3 l 1 6 z" fill="${IO}"/>
    <path d="M ${cx - 20} ${y - 12} l 5 -7 l 8 2 l -2 6 z" fill="#4b4d5c"/>`

/** A trend wedge from (x, y0) to (x, y1): `topW` wide at the top, `botW` at the bottom. */
const wedge = (x, y0, y1, topW, botW) => `<path d="M ${x - topW / 2} ${y0} L ${x + topW / 2} ${y0} L ${x + botW / 2} ${y1} L ${x - botW / 2} ${y1} Z" fill="${TEAL_F}" stroke="${TEAL}" stroke-width="1.8" stroke-linejoin="round"/>`

// ───────────────────────────────────────────────────────────────────────────
// 1 · The three halogens at room temperature, in their true colours: chlorine
//     a pale yellow-green gas filling its jar, bromine a red-brown liquid with
//     its orange-brown vapour above, iodine grey-black crystals.
// ───────────────────────────────────────────────────────────────────────────
const THREE_HALOGENS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 292" class="w-full h-full">
    ${plate(480, 292)}
    <text x="240" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The halogens at room temperature (20 °C)</text>

    ${jarFill(80, 56, 196, 44, CL, 0.75)}
    ${jarGlass(80, 56, 196, 44)}
    ${jarFill(240, 90, 196, 44, BR_V, 0.42)}
    ${jarFill(240, 168, 196, 44, BR)}
    ${jarGlass(240, 56, 196, 44)}
    ${crystals(400, 194)}
    ${jarGlass(400, 56, 196, 44)}

    <text x="80" y="220" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine, Cl₂</text>
    <text x="80" y="238" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">pale yellow-green gas</text>
    <text x="80" y="256" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">boils at −35 °C</text>
    <text x="240" y="220" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">bromine, Br₂</text>
    <text x="240" y="238" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">red-brown liquid</text>
    <text x="240" y="256" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">boils at 59 °C</text>
    <text x="400" y="220" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">iodine, I₂</text>
    <text x="400" y="238" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">grey-black solid</text>
    <text x="400" y="256" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">boils at 184 °C</text>

    ${lead(262, 130, 300, 116)}
    <text x="304" y="112" font-family="${FONT}" font-size="10" fill="${MUTED}">vapour</text>

    <text x="240" y="282" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">all diatomic, all coloured, all poisonous</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Boiling points, to scale: y = 200 − 0.8 × T (so 0 °C sits at y = 200,
//     150 °C at y = 80, −50 °C at y = 240). Bars from 0 °C to the value:
//     chlorine −35 → y 228, bromine 59 → y 152.8, iodine 184 → y 52.8.
//     Room temperature, 20 °C → y 184.
// ───────────────────────────────────────────────────────────────────────────
const BP_TREND = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 292" class="w-full h-full">
    ${plate(460, 292)}
    <text x="240" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Boiling points of the halogens</text>

    <line x1="70" y1="80" x2="430" y2="80" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="70" y1="120" x2="430" y2="120" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="70" y1="160" x2="430" y2="160" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="70" y1="240" x2="430" y2="240" stroke="#e2e8f0" stroke-width="1"/>
    <text x="64" y="84" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">150</text>
    <text x="64" y="124" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">100</text>
    <text x="64" y="164" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">50</text>
    <text x="64" y="204" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">0</text>
    <text x="64" y="244" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">−50</text>
    <text x="20" y="140" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle" transform="rotate(-90 20 140)">boiling point / °C</text>

    <rect x="120" y="200" width="60" height="28" fill="${CL}" stroke="${CL_S}" stroke-width="1.5"/>
    <rect x="230" y="152.8" width="60" height="47.2" fill="${BR}" stroke="${BR}" stroke-width="1.5"/>
    <rect x="340" y="52.8" width="60" height="147.2" fill="${IO}" stroke="${IO}" stroke-width="1.5"/>
    <line x1="70" y1="40" x2="70" y2="240" stroke="${INK}" stroke-width="1.8"/>
    <line x1="70" y1="200" x2="430" y2="200" stroke="${INK}" stroke-width="1.8"/>

    <line x1="70" y1="184" x2="430" y2="184" stroke="${TEAL}" stroke-width="1.6" stroke-dasharray="6 4"/>
    <text x="76" y="179" font-family="${FONT}" font-size="10" fill="${TEAL}">room temperature, 20 °C</text>

    <text x="150" y="219" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">−35 °C</text>
    <text x="260" y="146" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">59 °C</text>
    <text x="370" y="46" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">184 °C</text>

    <text x="150" y="262" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="260" y="262" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">bromine</text>
    <text x="370" y="262" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">iodine</text>
    <text x="150" y="279" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">gas</text>
    <text x="260" y="279" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">liquid</text>
    <text x="370" y="279" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">solid</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Hot iron wool in a stream of chlorine (book spread 12.3, drawn fresh):
//     the wool glows, and yellow iron(III) chloride collects beyond it. The
//     bottom strip compares the glow with the three halogens.
// ───────────────────────────────────────────────────────────────────────────
const IRON_WOOL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 262" class="w-full h-full">
    ${plate(480, 262)}
    <text x="240" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Hot iron wool in a stream of chlorine</text>

    <path d="M 60 92 L 196 92 L 196 128 L 60 128 Z" fill="${CL}" fill-opacity="0.55"/>
    <circle cx="222" cy="110" r="30" fill="${GLOW}" fill-opacity="0.35"/>
    <path d="M 198 104 q 6 -10 12 0 q 6 10 12 0 q 6 -10 12 0 q 6 10 12 0 M 198 114 q 6 -10 12 0 q 6 10 12 0 q 6 -10 12 0 q 6 10 12 0 M 200 122 q 6 -8 12 0 q 6 8 12 0 q 6 -8 12 0" fill="none" stroke="${IRON}" stroke-width="2.2"/>
    <path d="M 272 128 q 6 -9 14 -2 q 6 -7 12 1 q 8 -6 12 1 z" fill="#e8c547" stroke="#b8942a" stroke-width="1"/>
    <path d="M 316 128 q 6 -7 12 -1 q 6 -6 10 1 z" fill="#e8c547" stroke="#b8942a" stroke-width="1"/>
    <path d="M 60 90 L 400 90 M 60 130 L 400 130" stroke="${GLASS}" stroke-width="2.5" stroke-linecap="round"/>
    ${arrowR(16, 56, 110, CL_S)}
    ${arrowR(404, 444, 110, MUTED)}

    <path d="M 222 138 q -10 14 -4 26 q 4 -8 4 -2 q 2 -10 6 -2 q 4 -12 -6 -22 z" fill="${GLOW}" stroke="#c2410c" stroke-width="1.2"/>
    <path d="M 214 166 L 230 166 L 232 196 L 212 196 Z" fill="${IRON}"/>

    <text x="14" y="80" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">chlorine gas</text>
    ${lead(234, 100, 262, 64)}
    <text x="266" y="62" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">hot iron wool glows</text>
    <text x="476" y="80" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">excess gas out</text>
    <text x="204" y="172" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">heat</text>
    ${lead(296, 126, 316, 152)}
    <text x="320" y="156" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">iron(III) chloride, FeCl₃</text>
    <text x="320" y="172" font-family="${FONT}" font-size="11" fill="${MUTED}">a yellow solid</text>

    <line x1="20" y1="206" x2="460" y2="206" stroke="#e2e8f0" stroke-width="1.2"/>
    <circle cx="70" cy="232" r="14" fill="${GLOW}" fill-opacity="0.75"/>
    <circle cx="220" cy="232" r="9" fill="${GLOW}" fill-opacity="0.6"/>
    <circle cx="370" cy="232" r="5" fill="${GLOW}" fill-opacity="0.5"/>
    <text x="92" y="229" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">chlorine</text>
    <text x="92" y="244" font-family="${FONT}" font-size="10" fill="${MUTED}">glows brightly</text>
    <text x="236" y="229" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">bromine</text>
    <text x="236" y="244" font-family="${FONT}" font-size="10" fill="${MUTED}">less brightly</text>
    <text x="382" y="229" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">iodine</text>
    <text x="382" y="244" font-family="${FONT}" font-size="10" fill="${MUTED}">a faint red glow</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Group I against Group VII: the same shape of table, opposite trends.
//     The wedges widen where reactivity is higher.
// ───────────────────────────────────────────────────────────────────────────
const TRENDS_I_VS_VII = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 262" class="w-full h-full">
    ${plate(480, 262)}
    <text x="240" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Down the group: opposite trends</text>

    <rect x="10" y="38" width="220" height="214" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="120" y="60" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Group I</text>
    <text x="120" y="76" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the alkali metals</text>
    <rect x="36" y="88" width="40" height="30" rx="6" fill="${TILE_F}" stroke="${SHELL}" stroke-width="1.4"/>
    <text x="56" y="108" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Li</text>
    <rect x="36" y="126" width="40" height="30" rx="6" fill="${TILE_F}" stroke="${SHELL}" stroke-width="1.4"/>
    <text x="56" y="146" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <rect x="36" y="164" width="40" height="30" rx="6" fill="${TILE_F}" stroke="${SHELL}" stroke-width="1.4"/>
    <text x="56" y="184" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
    ${wedge(114, 88, 194, 8, 40)}
    <text x="144" y="126" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TEAL}">reactivity</text>
    <text x="144" y="142" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TEAL}">increases</text>
    <text x="144" y="158" font-family="${FONT}" font-size="10" fill="${MUTED}">going down</text>
    <text x="120" y="222" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">they LOSE one electron —</text>
    <text x="120" y="238" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">easier further down</text>

    <rect x="250" y="38" width="220" height="214" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="360" y="60" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Group VII</text>
    <text x="360" y="76" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the halogens</text>
    <rect x="276" y="88" width="40" height="30" rx="6" fill="${TILE_F}" stroke="${SHELL}" stroke-width="1.4"/>
    <text x="296" y="108" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <rect x="276" y="126" width="40" height="30" rx="6" fill="${TILE_F}" stroke="${SHELL}" stroke-width="1.4"/>
    <text x="296" y="146" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Br</text>
    <rect x="276" y="164" width="40" height="30" rx="6" fill="${TILE_F}" stroke="${SHELL}" stroke-width="1.4"/>
    <text x="296" y="184" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">I</text>
    ${wedge(354, 88, 194, 40, 8)}
    <text x="384" y="126" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TEAL}">reactivity</text>
    <text x="384" y="142" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TEAL}">decreases</text>
    <text x="384" y="158" font-family="${FONT}" font-size="10" fill="${MUTED}">going down</text>
    <text x="360" y="222" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">they GAIN one electron —</text>
    <text x="360" y="238" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">harder further down</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Fluorine (2,7) and chlorine (2,8,7): a different number of shells, the
//     same seven electrons in the outer one (teal).
// ───────────────────────────────────────────────────────────────────────────
const SHELLS_F_CL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 256" class="w-full h-full">
    ${plate(440, 256)}
    <text x="220" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Different shells, the same 7 outer electrons</text>

    ${ring(120, 122, 28)}${ring(120, 122, 50)}
    ${nucleus(120, 122)}
    ${electrons(120, 122, 28, 2, '#e2e8f0', MUTED)}
    ${electrons(120, 122, 50, 7, TEAL_F, TEAL, 8)}
    <text x="120" y="127" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">F</text>

    ${ring(320, 122, 24)}${ring(320, 122, 44)}${ring(320, 122, 64)}
    ${nucleus(320, 122)}
    ${electrons(320, 122, 24, 2, '#e2e8f0', MUTED)}
    ${electrons(320, 122, 44, 8, '#e2e8f0', MUTED)}
    ${electrons(320, 122, 64, 7, TEAL_F, TEAL, 8)}
    <text x="320" y="127" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>

    <text x="120" y="208" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">fluorine, F</text>
    <text x="120" y="226" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}" text-anchor="middle">2,7</text>
    <text x="320" y="208" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine, Cl</text>
    <text x="320" y="226" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}" text-anchor="middle">2,8,7</text>
    <text x="220" y="246" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">outer-shell electrons shown in teal</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · A chlorine atom (2,8,7) gains one electron (amber) into the empty place
//     on its outer shell and becomes a chloride ion (2,8,8), charge 1−.
// ───────────────────────────────────────────────────────────────────────────
const GAIN_ELECTRON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 252" class="w-full h-full">
    ${plate(480, 252)}
    <text x="240" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">A halogen atom needs just one more electron</text>

    ${ring(110, 118, 20)}${ring(110, 118, 36)}${ring(110, 118, 54)}
    ${nucleus(110, 118, 12)}
    ${electrons(110, 118, 20, 2, '#e2e8f0', MUTED)}
    ${electrons(110, 118, 36, 8, '#e2e8f0', MUTED)}
    ${electrons(110, 118, 54, 7, TEAL_F, TEAL, 8)}
    ${gap(110, 118, 54)}
    <text x="110" y="122" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>

    <circle cx="220" cy="92" r="5" fill="${AMBER_F}" stroke="${AMBER}" stroke-width="1.6"/>
    <text x="232" y="96" font-family="${FONT}" font-size="11" font-weight="bold" fill="${AMBER}">e⁻</text>
    ${arrowR(180, 262, 118, INK)}
    <text x="221" y="140" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">gains 1 electron</text>

    <path d="M 304 58 L 296 58 L 296 178 L 304 178 M 416 58 L 424 58 L 424 178 L 416 178" fill="none" stroke="${INK}" stroke-width="2"/>
    ${ring(360, 118, 20)}${ring(360, 118, 36)}${ring(360, 118, 54)}
    ${nucleus(360, 118, 12)}
    ${electrons(360, 118, 20, 2, '#e2e8f0', MUTED)}
    ${electrons(360, 118, 36, 8, '#e2e8f0', MUTED)}
    ${electrons(360, 118, 54, 7, TEAL_F, TEAL, 8)}
    <circle cx="321.8" cy="79.8" r="4" fill="${AMBER_F}" stroke="${AMBER}" stroke-width="1.6"/>
    <text x="360" y="122" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="434" y="66" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}">−</text>

    <text x="110" y="202" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine atom, Cl</text>
    <text x="110" y="220" font-family="${FONT}" font-size="13" font-weight="bold" fill="${TEAL}" text-anchor="middle">2,8,7</text>
    <text x="360" y="202" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">chloride ion, Cl⁻</text>
    <text x="360" y="220" font-family="${FONT}" font-size="13" font-weight="bold" fill="${TEAL}" text-anchor="middle">2,8,8</text>
    <text x="240" y="242" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">a full outer shell of 8, and a charge of 1−</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Chlorine water + colourless potassium bromide → orange: bromine has been
//     displaced (the book's worked example, drawn fresh).
// ───────────────────────────────────────────────────────────────────────────
const DISPLACEMENT_TUBE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 276" class="w-full h-full">
    ${plate(480, 276)}
    <text x="240" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Chlorine displaces bromine</text>

    ${tube(70, 44, 172, 17, 96, CLW)}
    ${plus(130, 120, INK)}
    ${tube(190, 44, 172, 17, 96, '#f8fafc')}
    ${arrowR(244, 312, 120, INK)}
    <text x="278" y="108" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">mix</text>
    ${tube(390, 44, 172, 17, 80, BR_V)}

    <text x="70" y="198" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine water</text>
    <text x="70" y="215" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">pale yellow</text>
    <text x="190" y="198" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">potassium bromide</text>
    <text x="190" y="215" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">colourless</text>
    <text x="390" y="198" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">turns orange</text>
    <text x="390" y="215" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">bromine, Br₂(aq)</text>

    <text x="240" y="256" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · The results table (book spread 12.3), as a 3 × 3 grid: each halogen
//     added to each halide solution. A halogen with its own halide is not a
//     test, so the diagonal is greyed out.
// ───────────────────────────────────────────────────────────────────────────
const RESULTS_GRID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 258" class="w-full h-full">
    ${plate(510, 258)}
    <text x="255" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Adding each halogen to each halide solution</text>

    <rect x="10" y="38" width="130" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="75" y="62" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">halide in solution</text>
    <rect x="140" y="38" width="120" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="200" y="62" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">add chlorine</text>
    <rect x="260" y="38" width="120" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="320" y="62" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">add bromine</text>
    <rect x="380" y="38" width="120" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="440" y="62" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">add iodine</text>

    <rect x="10" y="78" width="130" height="50" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="75" y="107" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">chloride, Cl⁻</text>
    <rect x="140" y="78" width="120" height="50" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="200" y="107" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">same halogen</text>
    <rect x="260" y="78" width="120" height="50" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="320" y="107" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">no change</text>
    <rect x="380" y="78" width="120" height="50" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="440" y="107" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">no change</text>

    <rect x="10" y="128" width="130" height="50" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="75" y="157" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">bromide, Br⁻</text>
    <rect x="140" y="128" width="120" height="50" fill="#fff1d6" stroke="${BR_V}" stroke-width="1.6"/>
    <text x="200" y="150" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">bromine displaced</text>
    <text x="200" y="165" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">orange solution</text>
    <rect x="260" y="128" width="120" height="50" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="320" y="157" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">same halogen</text>
    <rect x="380" y="128" width="120" height="50" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="440" y="157" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">no change</text>

    <rect x="10" y="178" width="130" height="50" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="75" y="207" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">iodide, I⁻</text>
    <rect x="140" y="178" width="120" height="50" fill="#f6e3d8" stroke="${IO_SOL}" stroke-width="1.6"/>
    <text x="200" y="200" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">iodine displaced</text>
    <text x="200" y="215" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">red-brown solution</text>
    <rect x="260" y="178" width="120" height="50" fill="#f6e3d8" stroke="${IO_SOL}" stroke-width="1.6"/>
    <text x="320" y="200" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">iodine displaced</text>
    <text x="320" y="215" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">red-brown solution</text>
    <rect x="380" y="178" width="120" height="50" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="440" y="207" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">same halogen</text>

    <text x="255" y="248" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">A halogen displaces a less reactive halogen from its halide</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · Why reactivity falls (Extended, book spread 12.4 point 4): chlorine's
//     outer shell is closer to the nucleus than bromine's, so the pull on an
//     incoming electron (amber) is stronger — thick arrow vs thin dashed one.
//     Inner shells are drawn as rings only; the seven outer electrons are shown.
// ───────────────────────────────────────────────────────────────────────────
const PULL_DISTANCE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 272" class="w-full h-full">
    ${plate(480, 272)}
    <text x="240" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">How hard does the nucleus pull a new electron?</text>

    ${ring(110, 122, 16)}${ring(110, 122, 30)}${ring(110, 122, 46)}
    ${nucleus(110, 122, 11)}
    ${electrons(110, 122, 46, 7, TEAL_F, TEAL, 8, 45)}
    <text x="110" y="126" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    ${arrowL(166, 124, 122, AMBER, 4)}
    <circle cx="172" cy="122" r="5" fill="${AMBER_F}" stroke="${AMBER}" stroke-width="1.6"/>
    <text x="172" y="108" font-family="${FONT}" font-size="10" font-weight="bold" fill="${AMBER}" text-anchor="middle">e⁻</text>

    ${ring(340, 122, 14)}${ring(340, 122, 28)}${ring(340, 122, 43)}${ring(340, 122, 60)}
    ${nucleus(340, 122, 10)}
    ${electrons(340, 122, 60, 7, TEAL_F, TEAL, 8, 45)}
    <text x="340" y="126" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Br</text>
    ${arrowL(410, 354, 122, AMBER, 1.5, '4 3')}
    <circle cx="416" cy="122" r="5" fill="${AMBER_F}" stroke="${AMBER}" stroke-width="1.6"/>
    <text x="416" y="108" font-family="${FONT}" font-size="10" font-weight="bold" fill="${AMBER}" text-anchor="middle">e⁻</text>

    <text x="120" y="204" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine: 3 shells</text>
    <text x="120" y="221" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">outer shell close to the nucleus</text>
    <text x="120" y="237" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">strong pull on a new electron</text>
    <text x="350" y="204" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">bromine: 4 shells</text>
    <text x="350" y="221" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">outer shell further away</text>
    <text x="350" y="237" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">weaker pull, harder to gain</text>
    <text x="240" y="262" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">so reactivity decreases down Group VII</text>
  </svg>`

export const DIAGRAMS = {
  THREE_HALOGENS: THREE_HALOGENS,
  BP_TREND: BP_TREND,
  IRON_WOOL: IRON_WOOL,
  TRENDS_I_VS_VII: TRENDS_I_VS_VII,
  SHELLS_F_CL: SHELLS_F_CL,
  GAIN_ELECTRON: GAIN_ELECTRON,
  DISPLACEMENT_TUBE: DISPLACEMENT_TUBE,
  RESULTS_GRID: RESULTS_GRID,
  PULL_DISTANCE: PULL_DISTANCE,
}
