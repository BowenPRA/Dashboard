// src/data/IGCSE_CHEM/M06_3/diagrams.js
// Teaching diagrams for 6.3 Oxides (book spread 11.5). All AUTHORED, nothing
// taken from the book: the gas jars, the litmus beakers, the acid-rain picture
// and the classification grid are drawn here so the labels are real <text> the
// SVG audit can measure, and there is no licence to carry.
//
// Colour means something on this track, and it follows universal indicator:
//   acid / acidic oxide / red litmus          red           #c8102e
//   base, alkali / basic oxide / blue litmus   blue-violet   #4338ca
//   amphoteric — both at once                  purple        #7e22ce
//   neutral / neutral oxide                    green         #2f8f5b
//   heating (energy in)                        cool blue     #1a5fa8
// Flames are amber: they are what the student sees, not a code.
//
// House rules (kept from M06_2 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · subscripts and charges are Unicode (O₂, P₄O₁₀), never <tspan>;
//  · no gradients, clip paths or markers, so there are no ids to collide.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const ACID = '#c8102e', ACID_F = '#fde2e4'   // acid, acidic oxide, red litmus
const ALK = '#4338ca', ALK_F = '#e0e7ff'     // base / alkali, basic oxide, blue litmus
const AMPH = '#7e22ce', AMPH_F = '#f3e8ff'   // amphoteric: acid AND base
const NEU = '#2f8f5b', NEU_F = '#dcfce7'     // neutral
const HEAT = '#1a5fa8'                       // energy in: the Bunsen
const GLASS = '#7c8a95'
const BLACK = '#1f2937'
const CUCL2 = '#cdeaee'                      // copper(II) chloride solution, blue-green

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/**
 * An open-topped beaker centred on `cx`, `half` wide each side, rim at `y0`,
 * floor at `y1`, filled with `fill` from the liquid line `yl` down.
 */
const beaker = (cx, half, y0, y1, yl, fill) => `<path d="M ${cx - half} ${yl} L ${cx - half} ${y1 - 12} Q ${cx - half} ${y1} ${cx - half + 12} ${y1} L ${cx + half - 12} ${y1} Q ${cx + half} ${y1} ${cx + half} ${y1 - 12} L ${cx + half} ${yl} Z" fill="${fill}"/>
    <line x1="${cx - half}" y1="${yl}" x2="${cx + half}" y2="${yl}" stroke="${GLASS}" stroke-width="1" stroke-dasharray="3 3"/>
    <path d="M ${cx - half - 7} ${y0} L ${cx - half} ${y0 + 5} L ${cx - half} ${y1 - 12} Q ${cx - half} ${y1} ${cx - half + 12} ${y1} L ${cx + half - 12} ${y1} Q ${cx + half} ${y1} ${cx + half} ${y1 - 12} L ${cx + half} ${y0}" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>`

/** A tall gas jar (full of oxygen) with a ground-glass rim at `y0`. */
const jar = (cx, half, y0, y1) => `<path d="M ${cx - half} ${y0} L ${cx - half} ${y1 - 10} Q ${cx - half} ${y1} ${cx - half + 10} ${y1} L ${cx + half - 10} ${y1} Q ${cx + half} ${y1} ${cx + half} ${y1 - 10} L ${cx + half} ${y0}" fill="#f8fafc" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>
    <line x1="${cx - half - 4}" y1="${y0}" x2="${cx + half + 4}" y2="${y0}" stroke="${GLASS}" stroke-width="3" stroke-linecap="round"/>`

/** A deflagrating spoon: the cover disc on the jar, the rod, the cup. */
const spoon = (cx, half, y0, yTop, yCup) => `<path d="M ${cx - half - 8} ${y0 - 4} L ${cx + half + 8} ${y0 - 4}" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <line x1="${cx}" y1="${yTop}" x2="${cx}" y2="${yCup}" stroke="#64748b" stroke-width="2.5"/>
    <path d="M ${cx - 10} ${yCup} Q ${cx} ${yCup + 12} ${cx + 10} ${yCup} Z" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>`

/** A teardrop flame standing on (x, yBase), `s` sets its size. */
const flame = (x, yBase, s, fill, stroke) => `<path d="M ${x} ${yBase - 2.6 * s} C ${x + 1.2 * s} ${yBase - 1.2 * s} ${x + 1.1 * s} ${yBase} ${x} ${yBase} C ${x - 1.1 * s} ${yBase} ${x - 1.2 * s} ${yBase - 1.2 * s} ${x} ${yBase - 2.6 * s} Z" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>`

/** Short spark lines radiating from (cx, cy) between radii r1 and r2. */
const sparks = (cx, cy, r1, r2, n) => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2 + 0.3
  return `<line x1="${(cx + r1 * Math.cos(a)).toFixed(1)}" y1="${(cy + r1 * Math.sin(a)).toFixed(1)}" x2="${(cx + r2 * Math.cos(a)).toFixed(1)}" y2="${(cy + r2 * Math.sin(a)).toFixed(1)}" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>`
}).join('')

/** A gas bubble. */
const bubbles = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.3"/>`).join('')

/** A puff of smoke or a cloud lobe. */
const puffs = (pts, fill, stroke) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`).join('')

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

/** A down-pointing arrowhead with its tip at (x, y). */
const headDown = (x, y, col) => `<path d="M ${x} ${y} l -6 -10 l 12 0 z" fill="${col}"/>`

/**
 * A strip of litmus paper leaning in a beaker: from (x, y0) down to y1, the
 * part above yl coloured `top`, the part below (wet) coloured `bottom`.
 */
const litmus = (x, y0, yl, y1, top, bottom) => {
  const lean = (y) => (-8 * (y - y0)) / 70
  const xl = x + lean(yl), xb = x + lean(y1)
  return `<path d="M ${x} ${y0} L ${x + 12} ${y0} L ${(xl + 12).toFixed(1)} ${yl} L ${xl.toFixed(1)} ${yl} Z" fill="${top}" stroke="${INK}" stroke-width="1"/>
    <path d="M ${xl.toFixed(1)} ${yl} L ${(xl + 12).toFixed(1)} ${yl} L ${(xb + 12).toFixed(1)} ${y1} L ${xb.toFixed(1)} ${y1} Z" fill="${bottom}" stroke="${INK}" stroke-width="1"/>`
}

/** Falling rain streaks, drawn as short dashes. */
const rain = (pts, col) => pts.map(([x, y]) => `<line x1="${x}" y1="${y}" x2="${x - 4}" y2="${y + 14}" stroke="${col}" stroke-width="2" stroke-linecap="round"/>`).join('')

// ───────────────────────────────────────────────────────────────────────────
// 1 · Metals burning in oxygen (the book's three, drawn fresh): calcium bursts
//     into flame, iron wool glows and sparks, copper only blackens in a stream
//     of oxygen. Left to right is most vigorous to least.
// ───────────────────────────────────────────────────────────────────────────
const METALS_BURN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    <text x="270" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Each metal is heated, then put into oxygen</text>

    ${jar(95, 38, 60, 206)}
    ${spoon(95, 38, 60, 38, 150)}
    ${flame(95, 146, 13, '#fffdf5', '#e0633a')}
    <text x="95" y="196" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">oxygen</text>

    ${jar(270, 38, 60, 206)}
    <line x1="262" y1="38" x2="266" y2="144" stroke="#64748b" stroke-width="2.5"/>
    <line x1="278" y1="38" x2="274" y2="144" stroke="#64748b" stroke-width="2.5"/>
    ${sparks(270, 156, 18, 29, 9)}
    <circle cx="270" cy="156" r="13" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
    <path d="M 262 152 q 4 -6 8 0 t 8 0 M 262 160 q 4 -6 8 0 t 8 0" fill="none" stroke="#9a3412" stroke-width="1.3"/>
    <text x="270" y="198" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">oxygen</text>

    <rect x="380" y="112" width="134" height="28" rx="14" fill="#f8fafc" stroke="${GLASS}" stroke-width="2.5"/>
    <circle cx="425" cy="130" r="4.5" fill="${BLACK}" stroke="#b45309" stroke-width="1.6"/>
    <circle cx="436" cy="126" r="4.5" fill="${BLACK}" stroke="#b45309" stroke-width="1.6"/>
    <circle cx="447" cy="131" r="4.5" fill="${BLACK}" stroke="#b45309" stroke-width="1.6"/>
    <circle cx="458" cy="126" r="4.5" fill="${BLACK}" stroke="#b45309" stroke-width="1.6"/>
    <circle cx="469" cy="130" r="4.5" fill="${BLACK}" stroke="#b45309" stroke-width="1.6"/>
    ${arrowR(342, 376, 126, MUTED)}
    <text x="356" y="112" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">oxygen</text>
    <path d="M 440 206 L 440 178 L 454 178 L 454 206 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
    ${flame(447, 174, 9, '#dbeafe', HEAT)}
    <text x="464" y="170" font-family="${FONT}" font-size="10" font-weight="bold" fill="${HEAT}">heat</text>

    <text x="95" y="234" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">calcium</text>
    <text x="95" y="251" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">bursts into flame</text>
    <text x="95" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">white flame, red tinge</text>
    <text x="95" y="288" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">calcium oxide</text>

    <text x="270" y="234" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">iron wool</text>
    <text x="270" y="251" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">glows bright orange</text>
    <text x="270" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">throws out sparks</text>
    <text x="270" y="288" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">iron(III) oxide</text>

    <text x="447" y="234" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">copper</text>
    <text x="447" y="251" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">does not catch fire</text>
    <text x="447" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">surface turns black</text>
    <text x="447" y="288" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">copper(II) oxide</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Non-metals burning in oxygen (the book's three, drawn fresh): carbon
//     glows red, sulfur burns blue, phosphorus bursts into flame by itself.
//     Every product is an acidic oxide, so every product is written in red.
// ───────────────────────────────────────────────────────────────────────────
const NONMETALS_BURN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    <text x="270" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Each non-metal burns in a jar of oxygen</text>

    ${jar(95, 38, 60, 206)}
    ${spoon(95, 38, 60, 38, 150)}
    <circle cx="95" cy="146" r="14" fill="none" stroke="#fb923c" stroke-width="2" stroke-dasharray="3 3"/>
    <circle cx="95" cy="147" r="7" fill="#fdba74" stroke="#ea580c" stroke-width="2"/>
    <text x="95" y="196" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">oxygen</text>

    ${jar(270, 38, 60, 206)}
    ${spoon(270, 38, 60, 38, 150)}
    ${flame(270, 146, 12, '#dbeafe', '#3b82f6')}
    <text x="270" y="196" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">oxygen</text>

    ${jar(445, 38, 60, 206)}
    ${spoon(445, 38, 60, 38, 150)}
    ${puffs([[430, 98, 8], [452, 90, 9], [465, 104, 7]], '#f1f5f9', '#cbd5e1')}
    ${flame(445, 146, 15, '#fef9c3', '#d97706')}
    <text x="445" y="196" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">oxygen</text>

    <text x="95" y="234" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">carbon</text>
    <text x="95" y="251" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">heated red-hot first</text>
    <text x="95" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">then glows bright red</text>
    <text x="95" y="288" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">carbon dioxide</text>

    <text x="270" y="234" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">sulfur</text>
    <text x="270" y="251" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">lit over a Bunsen</text>
    <text x="270" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">burns with a blue flame</text>
    <text x="270" y="288" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">sulfur dioxide</text>

    <text x="445" y="234" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">phosphorus</text>
    <text x="445" y="251" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">bursts into flame</text>
    <text x="445" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">without any heating</text>
    <text x="445" y="288" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">phosphorus(V) oxide</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · The litmus evidence that copper(II) oxide is a base (book page 136,
//     drawn fresh): the acid turns blue litmus red; the oxide dissolves in the
//     warm acid until no more will; the liquid left has no effect on blue litmus.
// ───────────────────────────────────────────────────────────────────────────
const LITMUS_CUO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    <text x="90" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">1 · the acid</text>
    <text x="90" y="42" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">dilute hydrochloric acid</text>
    ${beaker(90, 50, 62, 210, 110, ACID_F)}
    ${litmus(112, 80, 110, 150, ALK, ACID)}

    ${arrowR(150, 205, 150, INK)}

    <text x="270" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">2 · add the oxide</text>
    <text x="270" y="42" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">copper(II) oxide, warm</text>
    ${beaker(270, 50, 62, 210, 110, '#e3f1f3')}
    <line x1="300" y1="54" x2="262" y2="200" stroke="${GLASS}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 236 208 Q 270 190 304 208 Z" fill="${BLACK}"/>
    <path d="M 262 228 L 270 216 L 278 228 Z" fill="${HEAT}"/>
    <text x="284" y="228" font-family="${FONT}" font-size="10" font-weight="bold" fill="${HEAT}">warm</text>

    ${arrowR(330, 385, 150, INK)}

    <text x="450" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">3 · the liquid now</text>
    <text x="450" y="42" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">copper(II) chloride solution</text>
    ${beaker(450, 50, 62, 210, 110, CUCL2)}
    <path d="M 424 208 Q 450 199 476 208 Z" fill="${BLACK}"/>
    ${litmus(472, 80, 110, 150, ALK, ALK)}

    <text x="90" y="248" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ACID}" text-anchor="middle">blue litmus turns red</text>
    <text x="90" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">so it is acidic</text>
    <text x="270" y="248" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">the black solid dissolves</text>
    <text x="270" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">until no more will</text>
    <text x="450" y="248" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ALK}" text-anchor="middle">blue litmus stays blue</text>
    <text x="450" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the acid is neutralised</text>

    <text x="270" y="290" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · An acidic oxide dissolving in water (book page 137): carbon dioxide is
//     bubbled into water with blue litmus in it; the litmus turns red because
//     carbonic acid forms.
// ───────────────────────────────────────────────────────────────────────────
const ACIDIC_WATER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 300" class="w-full h-full">
    ${plate(360, 300)}
    <text x="40" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">carbon dioxide</text>
    ${beaker(150, 62, 90, 250, 130, ACID_F)}
    <path d="M 24 44 L 120 44 L 120 232" fill="none" stroke="${GLASS}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 84 44 l -10 -5 l 0 10 z" fill="${GLASS}"/>
    ${bubbles([[121, 222, 3.5], [126, 204, 3], [118, 186, 3.5], [128, 170, 2.5], [122, 152, 3], [130, 140, 2.5]])}
    ${litmus(178, 100, 130, 170, ALK, ACID)}

    ${lead(188, 106, 228, 92)}
    <text x="232" y="88" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">blue litmus paper</text>
    <text x="232" y="104" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ACID}">turns red</text>
    ${lead(132, 200, 228, 176)}
    <text x="232" y="172" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">the gas dissolves:</text>
    <text x="232" y="188" font-family="${FONT}" font-size="11" fill="${MUTED}">an acid forms</text>

    <text x="180" y="276" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">CO₂(g) + H₂O(l) → H₂CO₃(aq)</text>
    <text x="180" y="293" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">carbonic acid, a weak acid</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Acid rain: sulfur dioxide from a power station and nitrogen oxides from
//     a car engine rise, dissolve in the water of the clouds, and fall as acid
//     rain on a lake, a tree and a limestone building.
// ───────────────────────────────────────────────────────────────────────────
const ACID_RAIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    <text x="20" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">How acid rain forms</text>

    <rect x="20" y="200" width="70" height="62" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
    <rect x="70" y="140" width="14" height="60" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
    ${puffs([[78, 128, 9], [90, 114, 11], [104, 100, 12]], '#f1f5f9', '#94a3b8')}
    <text x="96" y="178" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ACID}">sulfur dioxide</text>

    <path d="M 130 256 L 130 242 Q 132 236 140 236 L 150 236 L 158 226 L 180 226 L 190 236 L 196 236 Q 202 236 202 242 L 202 256 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
    <circle cx="146" cy="258" r="7" fill="${BLACK}"/>
    <circle cx="186" cy="258" r="7" fill="${BLACK}"/>
    ${puffs([[120, 250, 5], [108, 242, 6]], '#f1f5f9', '#94a3b8')}
    <text x="108" y="218" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ACID}">nitrogen oxides</text>

    <path d="M 114 92 Q 150 62 206 70" fill="none" stroke="${ACID}" stroke-width="2" stroke-dasharray="5 4"/>
    <path d="M 216 70 l -10 -5 l 0 10 z" fill="${ACID}"/>

    ${puffs([[240, 64, 22], [274, 54, 28], [308, 62, 24], [340, 56, 22], [374, 64, 24], [408, 56, 22], [440, 64, 22], [470, 70, 16]], '#e2e8f0', '#94a3b8')}
    <text x="20" y="50" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">the oxides dissolve</text>
    <text x="20" y="66" font-family="${FONT}" font-size="11" fill="${MUTED}">in rain water: acids form</text>

    ${rain([[252, 100], [272, 112], [292, 98], [312, 110], [332, 100], [262, 136], [282, 148], [302, 134], [322, 146], [342, 134], [256, 172], [276, 184], [296, 170], [316, 182], [336, 170], [386, 98], [426, 98], [466, 98], [400, 150], [440, 150], [480, 150]], ACID)}
    <text x="380" y="132"font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}">acid rain</text>

    <line x1="12" y1="262" x2="528" y2="262" stroke="#94a3b8" stroke-width="2"/>
    <path d="M 244 262 Q 300 286 356 262 Z" fill="#bfdbfe" stroke="#94a3b8" stroke-width="1.5"/>
    <path d="M 292 270 q 8 -6 16 0 q -8 6 -16 0 z M 308 270 l 6 -4 l 0 8 z" fill="#64748b"/>
    <text x="300" y="292" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">lakes: fish die</text>

    <path d="M 391 262 L 391 222 L 399 222 L 399 262 Z" fill="#a16207"/>
    <circle cx="395" cy="206" r="24" fill="#d9e4c8" stroke="#6b7a4f" stroke-width="1.5"/>
    <text x="395" y="292" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">trees damaged</text>

    <path d="M 456 216 L 488 198 L 520 216 Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
    <path d="M 460 216 L 516 216 L 516 262 L 460 262 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="472" y1="222" x2="472" y2="258" stroke="#94a3b8" stroke-width="3"/>
    <line x1="488" y1="222" x2="488" y2="258" stroke="#94a3b8" stroke-width="3"/>
    <line x1="504" y1="222" x2="504" y2="258" stroke="#94a3b8" stroke-width="3"/>
    <text x="486" y="280" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">stone buildings</text>
    <text x="486" y="294" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">worn away</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · EXTENDED: an amphoteric oxide. Aluminium oxide reacts with an acid (and
//     acts as a base) AND with an alkali (and acts as an acid). The book's two
//     equations are drawn in, because the slide shows this as a showcase: they
//     are too long for a split slide's text column.
// ───────────────────────────────────────────────────────────────────────────
const AMPHOTERIC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 334" class="w-full h-full">
    ${plate(540, 334)}
    <text x="270" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">One oxide, two kinds of reaction</text>
    <rect x="180" y="38" width="180" height="60" rx="12" fill="${AMPH_F}" stroke="${AMPH}" stroke-width="2"/>
    <text x="270" y="63" font-family="${FONT}" font-size="14" font-weight="bold" fill="${AMPH}" text-anchor="middle">aluminium oxide</text>
    <text x="270" y="85" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Al₂O₃(s)</text>

    <path d="M 220 98 L 220 116 L 136 116 L 136 132" fill="none" stroke="${INK}" stroke-width="2.2"/>
    ${headDown(136, 142, INK)}
    <path d="M 320 98 L 320 116 L 404 116 L 404 132" fill="none" stroke="${INK}" stroke-width="2.2"/>
    ${headDown(404, 142, INK)}

    <rect x="16" y="144" width="240" height="104" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="136" y="168" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">+ hydrochloric acid</text>
    <text x="136" y="194" font-family="${FONT}" font-size="14" font-weight="bold" fill="${ALK}" text-anchor="middle">acts as a base</text>
    <text x="136" y="216" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">gives aluminium chloride</text>
    <text x="136" y="233" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">and water</text>

    <rect x="284" y="144" width="240" height="104" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="404" y="168" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">+ sodium hydroxide</text>
    <text x="404" y="194" font-family="${FONT}" font-size="14" font-weight="bold" fill="${ACID}" text-anchor="middle">acts as an acid</text>
    <text x="404" y="216" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">gives sodium aluminate</text>
    <text x="404" y="233" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">and water</text>

    <text x="270" y="274" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l)</text>
    <text x="270" y="296" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Al₂O₃(s) + 6NaOH(aq) → 2Na₃AlO₃(aq) + 3H₂O(l)</text>
    <text x="270" y="322" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AMPH}" text-anchor="middle">Zinc oxide, ZnO, reacts with both too.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · The four kinds of oxide as a two-way test: does it react with an acid?
//     does it react with an alkali? Each cell names the kind and its examples.
// ───────────────────────────────────────────────────────────────────────────
const OXIDE_GRID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
    ${plate(520, 300)}
    <text x="260" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Test the oxide with an acid and with an alkali</text>
    <text x="225" y="52" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">reacts with alkali: yes</text>
    <text x="415" y="52" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">reacts with alkali: no</text>
    <text x="68" y="112" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">reacts with</text>
    <text x="68" y="128" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">acid: yes</text>
    <text x="68" y="224" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">reacts with</text>
    <text x="68" y="240" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">acid: no</text>

    <rect x="134" y="64" width="182" height="104" rx="12" fill="${AMPH_F}" stroke="${AMPH}" stroke-width="2"/>
    <text x="225" y="100" font-family="${FONT}" font-size="15" font-weight="bold" fill="${AMPH}" text-anchor="middle">amphoteric</text>
    <text x="225" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Al₂O₃, ZnO</text>
    <text x="225" y="146" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">a few metal oxides</text>

    <rect x="324" y="64" width="182" height="104" rx="12" fill="${ALK_F}" stroke="${ALK}" stroke-width="2"/>
    <text x="415" y="100" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ALK}" text-anchor="middle">basic</text>
    <text x="415" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">CaO, CuO, MgO</text>
    <text x="415" y="146" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">most metal oxides</text>

    <rect x="134" y="176" width="182" height="104" rx="12" fill="${ACID_F}" stroke="${ACID}" stroke-width="2"/>
    <text x="225" y="212" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ACID}" text-anchor="middle">acidic</text>
    <text x="225" y="236" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">CO₂, SO₂, P₄O₁₀</text>
    <text x="225" y="258" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">most non-metal oxides</text>

    <rect x="324" y="176" width="182" height="104" rx="12" fill="${NEU_F}" stroke="${NEU}" stroke-width="2"/>
    <text x="415" y="212" font-family="${FONT}" font-size="15" font-weight="bold" fill="${NEU}" text-anchor="middle">neutral</text>
    <text x="415" y="236" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">CO, N₂O</text>
    <text x="415" y="258" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">a few non-metal oxides</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · EXTENDED: the oxides across period 3, from sodium to chlorine — basic,
//     then amphoteric, then acidic, as the elements go from metal to non-metal.
// ───────────────────────────────────────────────────────────────────────────
const PERIOD3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 220" class="w-full h-full">
    ${plate(540, 220)}
    <text x="270" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The oxides of period 3</text>

    <text x="53" y="48" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">sodium</text>
    <rect x="20" y="56" width="66" height="54" rx="10" fill="${ALK_F}" stroke="${ALK}" stroke-width="2"/>
    <text x="53" y="89" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ALK}" text-anchor="middle">Na₂O</text>

    <text x="125" y="48" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">magnesium</text>
    <rect x="92" y="56" width="66" height="54" rx="10" fill="${ALK_F}" stroke="${ALK}" stroke-width="2"/>
    <text x="125" y="89" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ALK}" text-anchor="middle">MgO</text>

    <text x="197" y="48" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">aluminium</text>
    <rect x="164" y="56" width="66" height="54" rx="10" fill="${AMPH_F}" stroke="${AMPH}" stroke-width="2"/>
    <text x="197" y="89" font-family="${FONT}" font-size="15" font-weight="bold" fill="${AMPH}" text-anchor="middle">Al₂O₃</text>

    <text x="269" y="48" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">silicon</text>
    <rect x="236" y="56" width="66" height="54" rx="10" fill="${ACID_F}" stroke="${ACID}" stroke-width="2"/>
    <text x="269" y="89" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ACID}" text-anchor="middle">SiO₂</text>

    <text x="341" y="48" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">phosphorus</text>
    <rect x="308" y="56" width="66" height="54" rx="10" fill="${ACID_F}" stroke="${ACID}" stroke-width="2"/>
    <text x="341" y="89" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ACID}" text-anchor="middle">P₄O₁₀</text>

    <text x="413" y="48" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">sulfur</text>
    <rect x="380" y="56" width="66" height="54" rx="10" fill="${ACID_F}" stroke="${ACID}" stroke-width="2"/>
    <text x="413" y="89" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ACID}" text-anchor="middle">SO₂</text>

    <text x="485" y="48" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">chlorine</text>
    <rect x="452" y="56" width="66" height="54" rx="10" fill="${ACID_F}" stroke="${ACID}" stroke-width="2"/>
    <text x="485" y="89" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ACID}" text-anchor="middle">Cl₂O₇</text>

    <path d="M 22 120 L 22 128 L 156 128 L 156 120" fill="none" stroke="${ALK}" stroke-width="2"/>
    <text x="89" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">basic</text>
    <path d="M 166 120 L 166 128 L 228 128 L 228 120" fill="none" stroke="${AMPH}" stroke-width="2"/>
    <text x="197" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AMPH}" text-anchor="middle">amphoteric</text>
    <path d="M 238 120 L 238 128 L 516 128 L 516 120" fill="none" stroke="${ACID}" stroke-width="2"/>
    <text x="377" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">acidic</text>

    ${arrowR(22, 518, 176, MUTED)}
    <text x="22" y="202" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">metals</text>
    <text x="518" y="202" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="end">non-metals</text>
  </svg>`

export const DIAGRAMS = {
  METALS_BURN: METALS_BURN,
  NONMETALS_BURN: NONMETALS_BURN,
  LITMUS_CUO: LITMUS_CUO,
  ACIDIC_WATER: ACIDIC_WATER,
  ACID_RAIN: ACID_RAIN,
  AMPHOTERIC: AMPHOTERIC,
  OXIDE_GRID: OXIDE_GRID,
  PERIOD3: PERIOD3,
}
