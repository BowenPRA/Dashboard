// src/data/IGCSE_CHEM/M06_4A/diagrams.js
// Teaching diagrams for 6.4 Making Salts: the methods (book spreads 11.6 and
// 11.7). All AUTHORED, nothing taken from the book: the apparatus strips, the
// titration rig, the solubility table and the particle pictures are drawn here
// so every label is real <text> the SVG audit can measure.
//
// Colour means something on this track:
//   acid / H⁺                 red           #c8102e
//   alkali, base / OH⁻        blue-violet   #4338ca   (thymolphthalein's blue too)
//   neutral / water           green         #2f8f5b   (a neutral salt solution)
//   spectator ions            grey          #94a3b8
//   insoluble / precipitate   amber         #b45309   (this unit's one addition:
//                                                     the solid that falls out)
// Copper(II) sulfate is drawn in its real blue, and the flame in flame yellow —
// neither is one of the semantic colours above.
//
// House rules (as M06_2): a white plate under every diagram; label <text>
// written out literally, helpers draw shapes only; charges as Unicode
// superscripts, never <tspan>; no gradients, clip paths or markers, so there
// are no ids to collide.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const ACID = '#c8102e', ACID_F = '#fde2e4'   // acid, H⁺
const ALK = '#4338ca', ALK_M = '#a5b4fc'     // alkali / base; thymolphthalein blue
const NEU = '#2f8f5b', NEU_F = '#dcfce7'     // neutral salt solution
const SPEC = '#94a3b8', SPEC_F = '#f1f5f9'   // spectator ions
const AMB = '#b45309', AMB_F = '#fef3c7'     // insoluble salt, precipitate
const GLASS = '#7c8a95'
const METAL = '#6b7280', METAL_D = '#4b5563' // zinc granules
const CUO = '#1f2937'                        // black copper(II) oxide
const CU_SOL = '#bfdbfe'                     // copper(II) sulfate solution
const CU_XTAL = '#3b82f6', CU_XTAL_D = '#2563eb'
const HEAT = '#d97706', HEAT_F = '#fde68a'   // the burner flame

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

/** A filter funnel with its cone of filter paper, rim at `top`, stem ending at top + 114. */
const funnel = (cx, top) => `<path d="M ${cx - 45} ${top} L ${cx + 45} ${top} L ${cx + 5} ${top + 52} L ${cx + 5} ${top + 114} L ${cx - 5} ${top + 114} L ${cx - 5} ${top + 52} Z" fill="#ffffff" stroke="${GLASS}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M ${cx - 38} ${top + 4} L ${cx + 38} ${top + 4} L ${cx} ${top + 48} Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`

/** The solid caught in the tip of the filter paper of `funnel(cx, top)`. */
const residue = (cx, top, fill, stroke) => `<path d="M ${cx - 15} ${top + 31} Q ${cx - 8} ${top + 24} ${cx} ${top + 29} Q ${cx + 8} ${top + 23} ${cx + 15} ${top + 31} L ${cx} ${top + 48} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/>`

/** The beaker that catches the filtrate under `funnel(cx, top)`, and one falling drop. */
const receiver = (cx, top, fill, drop) => `${beaker(cx, 44, top + 96, top + 160, top + 128, fill)}
    <circle cx="${cx}" cy="${top + 121}" r="2.6" fill="${drop}"/>`

/** An evaporating dish, rim at `y`, holding a solution coloured `fill`. */
const dish = (cx, y, fill) => `<path d="M ${cx - 41} ${y + 8} Q ${cx} ${y + 48} ${cx + 41} ${y + 8} Z" fill="${fill}"/>
    <path d="M ${cx - 54} ${y} L ${cx - 48} ${y} Q ${cx} ${y + 56} ${cx + 48} ${y} L ${cx + 54} ${y}" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>`

/** A gauze at height `y` with a burner flame under it. */
const burner = (cx, y) => `<line x1="${cx - 58}" y1="${y}" x2="${cx + 58}" y2="${y}" stroke="${MUTED}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M ${cx} ${y + 5} Q ${cx - 14} ${y + 21} ${cx - 8} ${y + 31} L ${cx + 8} ${y + 31} Q ${cx + 14} ${y + 21} ${cx} ${y + 5} Z" fill="${HEAT_F}" stroke="${HEAT}" stroke-width="1.6"/>`

/** One crystal, drawn as a diamond of half-size `s`. */
const crystal = (x, y, s, fill, stroke) => `<path d="M ${x} ${y - s} L ${x + s} ${y} L ${x} ${y + s} L ${x - s} ${y} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round"/>`
const crystals = (pts, fill, stroke) => pts.map(([x, y, s]) => crystal(x, y, s, fill, stroke)).join('')

/** A gas bubble. */
const bubbles = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.2"/>`).join('')

/** Zinc granules (grey pebbles). */
const granules = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${METAL}" stroke="${METAL_D}" stroke-width="1.2"/>`).join('')

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

/** A left-pointing arrow from x1 back to x2 (x2 < x1) at height y. */
const arrowL = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 + 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l 10 -6 l 0 12 z" fill="${col}"/>`

/** A plus sign drawn as two lines (not text). */
const plus = (x, y, col, a = 7) => `<line x1="${x - a}" y1="${y}" x2="${x + a}" y2="${y}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="${x}" y1="${y - a}" x2="${x}" y2="${y + a}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`

/** A conical flask: neck from `top`, base at `bot`, liquid from `yl` down. */
const flask = (cx, top, bot, yl, fill) => {
  const neck = top + 16
  const w = (10 + ((yl - neck) * 28) / (bot - neck)).toFixed(1)
  return `<path d="M ${cx - w} ${yl} L ${cx + Number(w)} ${yl} L ${cx + 38} ${bot} L ${cx - 38} ${bot} Z" fill="${fill}"/>
    <path d="M ${cx - 10} ${top} L ${cx - 10} ${neck} L ${cx - 38} ${bot} L ${cx + 38} ${bot} L ${cx + 10} ${neck} L ${cx + 10} ${top}" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>`
}

/** The scale marks down the side of a burette. */
const ticks = (x, y0, y1, gap) => {
  const out = []
  for (let y = y0; y <= y1; y += gap) out.push(`<line x1="${x}" y1="${y}" x2="${x + 7}" y2="${y}" stroke="${MUTED}" stroke-width="1.2"/>`)
  return out.join('')
}

/** One ion as a disc; its label is written out literally beside the call. */
const disc = (x, y, r, fill, stroke) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

// ───────────────────────────────────────────────────────────────────────────
// 1 · Method 1, acid + excess metal: zinc and dilute sulfuric acid (the book's
//     worked example, drawn fresh). Excess zinc → filter → evaporate and cool.
// ───────────────────────────────────────────────────────────────────────────
const METAL_METHOD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 280" class="w-full h-full">
    ${plate(690, 280)}
    <text x="115" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">1 · Add excess zinc</text>
    ${beaker(115, 58, 62, 200, 100, ACID_F)}
    ${granules([[80, 190, 7], [97, 192, 6], [114, 189, 7], [131, 192, 6], [148, 190, 6], [90, 180, 5], [123, 179, 5]])}
    ${bubbles([[95, 160, 3], [118, 150, 3.5], [140, 162, 3], [104, 132, 3], [130, 120, 2.5], [112, 110, 3]])}
    ${lead(150, 186, 180, 158)}
    <text x="184" y="148" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">excess</text>
    <text x="184" y="162" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">zinc</text>
    <text x="115" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">dilute sulfuric acid</text>
    <text x="115" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">stir until bubbling stops</text>

    ${arrowR(218, 250, 110, INK)}

    <text x="345" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">2 · Filter</text>
    ${funnel(345, 62)}
    ${residue(345, 62, METAL, METAL_D)}
    ${receiver(345, 62, NEU_F, NEU)}
    ${lead(336, 98, 296, 90)}
    <text x="292" y="84" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="end">unreacted</text>
    <text x="292" y="98" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="end">zinc</text>
    <text x="345" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NEU}" text-anchor="middle">zinc sulfate solution</text>
    <text x="345" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">runs through the paper</text>

    ${arrowR(446, 478, 110, INK)}

    <text x="575" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">3 · Evaporate, then cool</text>
    <text x="575" y="104" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">crystals of zinc sulfate</text>
    ${lead(578, 152, 578, 112)}
    ${dish(575, 140, NEU_F)}
    ${crystals([[558, 156, 5], [578, 160, 6], [595, 155, 5]], '#ffffff', INK)}
    ${burner(575, 172)}
    <text x="596" y="198" font-family="${FONT}" font-size="11" fill="${MUTED}">heat</text>
    <text x="575" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">saturated solution</text>
    <text x="575" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">crystals appear as it cools</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Residue and filtrate: a filter funnel over a beaker with NO labels on the
//     parts, for the hotspot activity (tap the residue). The hotspot targets
//     in notes.js are placed on this drawing's coordinates.
// ───────────────────────────────────────────────────────────────────────────
const FILTER_PARTS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 224" class="w-full h-full">
    ${plate(300, 224)}
    <text x="150" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Filtering the mixture from step 1</text>
    ${funnel(150, 44)}
    ${residue(150, 44, METAL, METAL_D)}
    ${receiver(150, 44, NEU_F, NEU)}
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Method 2, acid + excess insoluble base: black copper(II) oxide warmed
//     with dilute sulfuric acid until no more dissolves → filter → blue
//     crystals of hydrated copper(II) sulfate. (The book's example, drawn fresh.)
// ───────────────────────────────────────────────────────────────────────────
const BASE_METHOD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 280" class="w-full h-full">
    ${plate(690, 280)}
    <text x="115" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">1 · Add excess, warm</text>
    ${beaker(115, 58, 62, 190, 100, CU_SOL)}
    <path d="M 72 188 Q 115 166 158 188 Z" fill="${CUO}"/>
    <circle cx="96" cy="160" r="2" fill="${CUO}"/><circle cx="128" cy="150" r="2" fill="${CUO}"/><circle cx="112" cy="136" r="1.8" fill="${CUO}"/>
    ${burner(115, 194)}
    ${lead(150, 180, 180, 150)}
    <text x="184" y="140" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">black solid</text>
    <text x="184" y="154" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}">left over</text>
    <text x="115" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">copper(II) oxide + acid</text>
    <text x="115" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">add until no more dissolves</text>

    ${arrowR(218, 250, 106, INK)}

    <text x="345" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">2 · Filter</text>
    ${funnel(345, 62)}
    ${residue(345, 62, CUO, CUO)}
    ${receiver(345, 62, CU_SOL, CU_XTAL)}
    ${lead(336, 98, 296, 90)}
    <text x="292" y="84" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="end">excess</text>
    <text x="292" y="98" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="end">CuO</text>
    <text x="345" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CU_XTAL_D}" text-anchor="middle">copper(II) sulfate solution</text>
    <text x="345" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">runs through the paper</text>

    ${arrowR(446, 478, 106, INK)}

    <text x="575" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">3 · Evaporate, then cool</text>
    <text x="575" y="104" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">blue crystals form</text>
    ${lead(578, 152, 578, 112)}
    ${dish(575, 140, CU_SOL)}
    ${crystals([[558, 156, 5], [578, 160, 6], [595, 155, 5]], CU_XTAL, CU_XTAL_D)}
    ${burner(575, 172)}
    <text x="596" y="198" font-family="${FONT}" font-size="11" fill="${MUTED}">heat</text>
    <text x="575" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">CuSO₄·5H₂O crystals</text>
    <text x="575" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">hydrated copper(II) sulfate</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Method 3, the titration: burette of acid over a conical flask of alkali
//     with thymolphthalein; beside it the flask before (blue) and at the
//     end-point (colourless). Generic labels, so it serves any acid and alkali.
// ───────────────────────────────────────────────────────────────────────────
const TITRATION_RIG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 324" class="w-full h-full">
    ${plate(560, 324)}
    <text x="280" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">A titration: acid added a little at a time</text>
    <rect x="36" y="306" width="160" height="10" rx="3" fill="#e2e8f0" stroke="${MUTED}" stroke-width="1.2"/>
    <line x1="56" y1="306" x2="56" y2="48" stroke="${MUTED}" stroke-width="5" stroke-linecap="round"/>
    <line x1="56" y1="76" x2="110" y2="76" stroke="${MUTED}" stroke-width="4" stroke-linecap="round"/>
    <rect x="108" y="70" width="24" height="12" rx="3" fill="none" stroke="${MUTED}" stroke-width="2"/>
    <rect x="112" y="48" width="16" height="176" rx="3" fill="#ffffff" stroke="${GLASS}" stroke-width="2"/>
    <rect x="114" y="66" width="12" height="156" fill="${ACID_F}"/>
    ${ticks(112, 90, 214, 16)}
    <rect x="110" y="224" width="20" height="8" rx="2" fill="${MUTED}"/>
    <line x1="102" y1="228" x2="138" y2="228" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 116 232 L 124 232 L 121 246 L 119 246 Z" fill="#ffffff" stroke="${GLASS}" stroke-width="1.5"/>
    <circle cx="120" cy="254" r="3" fill="${ACID_F}" stroke="${ACID}" stroke-width="1.2"/>
    ${flask(120, 262, 304, 284, ALK_M)}
    ${lead(128, 118, 146, 112)}
    <text x="150" y="112" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">burette</text>
    <text x="150" y="128" font-family="${FONT}" font-size="11" fill="${ACID}">dilute acid</text>
    ${lead(138, 228, 150, 222)}
    <text x="154" y="226" font-family="${FONT}" font-size="11" fill="${MUTED}">tap</text>
    ${lead(142, 292, 166, 276)}
    <text x="170" y="276" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">conical flask</text>
    <text x="170" y="292" font-family="${FONT}" font-size="11" fill="${ALK}">alkali + indicator</text>

    <text x="370" y="120" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">at the start</text>
    ${flask(370, 140, 230, 196, ALK_M)}
    <text x="370" y="256" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">blue</text>
    <text x="370" y="272" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">alkali is left</text>

    <text x="432" y="196" font-family="${FONT}" font-size="11" fill="${ACID}" text-anchor="middle">+ acid</text>
    ${arrowR(414, 452, 206, INK)}

    <text x="500" y="120" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">the end-point</text>
    ${flask(500, 140, 230, 196, '#ffffff')}
    <text x="500" y="256" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">colourless</text>
    <text x="500" y="272" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">neutral: stop</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The solubility rules (book page 140), as a two-column table. The
//     exceptions are amber, the colour of an insoluble solid in this unit.
// ───────────────────────────────────────────────────────────────────────────
const SOLUBILITY_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 306" class="w-full h-full">
    ${plate(560, 306)}
    <text x="280" y="22" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The solubility rules for salts</text>
    <rect x="16" y="36" width="300" height="32" rx="6" fill="#e2e8f0"/>
    <text x="166" y="57" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Soluble</text>
    <rect x="320" y="36" width="224" height="32" rx="6" fill="${AMB_F}"/>
    <text x="432" y="57" font-family="${FONT}" font-size="13" font-weight="bold" fill="${AMB}" text-anchor="middle">Insoluble (exceptions)</text>

    <rect x="16" y="72" width="300" height="42" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="166" y="89" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">all sodium, potassium</text>
    <text x="166" y="105" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">and ammonium salts</text>
    <rect x="320" y="72" width="224" height="42" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="432" y="97" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">none</text>

    <rect x="16" y="118" width="300" height="42" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="166" y="143" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">all nitrates</text>
    <rect x="320" y="118" width="224" height="42" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="432" y="143" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">none</text>

    <rect x="16" y="164" width="300" height="42" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="166" y="181" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">all chlorides, bromides</text>
    <text x="166" y="197" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">and iodides</text>
    <rect x="320" y="164" width="224" height="42" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="432" y="181" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">except those of</text>
    <text x="432" y="197" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AMB}" text-anchor="middle">silver and lead</text>

    <rect x="16" y="210" width="300" height="42" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="166" y="235" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">all sulfates</text>
    <rect x="320" y="210" width="224" height="42" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="432" y="227" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">except those of</text>
    <text x="432" y="243" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AMB}" text-anchor="middle">calcium, barium, lead</text>

    <rect x="16" y="256" width="300" height="42" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="166" y="273" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">carbonates of sodium,</text>
    <text x="166" y="289" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">potassium and ammonium</text>
    <rect x="320" y="256" width="224" height="42" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="432" y="273" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AMB}" text-anchor="middle">all other</text>
    <text x="432" y="289" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AMB}" text-anchor="middle">carbonates</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Precipitation in particles (book page 140, drawn fresh): barium chloride
//     solution + magnesium sulfate solution → solid barium sulfate at the
//     bottom, Mg²⁺ and Cl⁻ still free. Counts match BaCl₂ + MgSO₄ twice over:
//     2 Ba²⁺, 4 Cl⁻, 2 Mg²⁺, 2 SO₄²⁻ on each side. Water molecules left out.
// ───────────────────────────────────────────────────────────────────────────
const PRECIP_PARTICLES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full">
    ${plate(560, 300)}
    <text x="90" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">barium chloride</text>
    <text x="90" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Ba²⁺ and Cl⁻ ions</text>
    ${beaker(90, 60, 60, 212, 88, '#f8fafc')}
    ${disc(66, 118, 14, AMB_F, AMB)}<text x="66" y="121" font-family="${FONT}" font-size="9" font-weight="bold" fill="${AMB}" text-anchor="middle">Ba²⁺</text>
    ${disc(112, 168, 14, AMB_F, AMB)}<text x="112" y="171" font-family="${FONT}" font-size="9" font-weight="bold" fill="${AMB}" text-anchor="middle">Ba²⁺</text>
    ${disc(112, 114, 14, SPEC_F, SPEC)}<text x="112" y="118" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(62, 160, 14, SPEC_F, SPEC)}<text x="62" y="164" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(78, 196, 14, SPEC_F, SPEC)}<text x="78" y="200" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(126, 198, 12, SPEC_F, SPEC)}<text x="126" y="202" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>

    ${plus(172, 150, INK)}

    <text x="255" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">magnesium sulfate</text>
    <text x="255" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Mg²⁺ and SO₄²⁻ ions</text>
    ${beaker(255, 60, 60, 212, 88, '#f8fafc')}
    ${disc(230, 118, 14, SPEC_F, SPEC)}<text x="230" y="121" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(278, 172, 14, SPEC_F, SPEC)}<text x="278" y="175" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(280, 114, 14, AMB_F, AMB)}<text x="280" y="117" font-family="${FONT}" font-size="8" font-weight="bold" fill="${AMB}" text-anchor="middle">SO₄²⁻</text>
    ${disc(228, 170, 14, AMB_F, AMB)}<text x="228" y="173" font-family="${FONT}" font-size="8" font-weight="bold" fill="${AMB}" text-anchor="middle">SO₄²⁻</text>

    ${arrowR(326, 374, 150, INK)}
    <text x="350" y="138" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">mix</text>

    <text x="450" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">after mixing</text>
    <text x="450" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">a white solid forms</text>
    ${beaker(450, 60, 60, 212, 88, '#f8fafc')}
    ${disc(417, 118, 14, SPEC_F, SPEC)}<text x="417" y="121" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(483, 156, 14, SPEC_F, SPEC)}<text x="483" y="159" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(475, 110, 13, SPEC_F, SPEC)}<text x="475" y="114" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(417, 160, 13, SPEC_F, SPEC)}<text x="417" y="164" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(451, 136, 13, SPEC_F, SPEC)}<text x="451" y="140" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(452, 166, 13, SPEC_F, SPEC)}<text x="452" y="170" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(408, 197, 13, AMB_F, AMB)}<text x="408" y="200" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${AMB}" text-anchor="middle">Ba²⁺</text>
    ${disc(436, 197, 13, AMB_F, AMB)}<text x="436" y="200" font-family="${FONT}" font-size="7.5" font-weight="bold" fill="${AMB}" text-anchor="middle">SO₄²⁻</text>
    ${disc(464, 197, 13, AMB_F, AMB)}<text x="464" y="200" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${AMB}" text-anchor="middle">Ba²⁺</text>
    ${disc(492, 197, 13, AMB_F, AMB)}<text x="492" y="200" font-family="${FONT}" font-size="7.5" font-weight="bold" fill="${AMB}" text-anchor="middle">SO₄²⁻</text>
    <text x="450" y="232" font-family="${FONT}" font-size="11" font-weight="bold" fill="${AMB}" text-anchor="middle">BaSO₄(s) at the bottom</text>

    <text x="280" y="264" font-family="${FONT}" font-size="12.5" font-weight="bold" fill="${INK}" text-anchor="middle">Ba²⁺ and SO₄²⁻ join to make a solid: the precipitate</text>
    <text x="280" y="284" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Mg²⁺ and Cl⁻ stay in the solution, unchanged: spectator ions</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Method 4, the steps of a precipitation (making barium sulfate): mix →
//     filter → rinse with distilled water → dry in a warm oven.
// ───────────────────────────────────────────────────────────────────────────
const PRECIP_METHOD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 280" class="w-full h-full">
    ${plate(760, 280)}
    <text x="95" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">1 · Mix</text>
    ${beaker(95, 56, 62, 200, 96, '#f8fafc')}
    <path d="M 52 198 Q 95 176 138 198 Z" fill="#ffffff" stroke="${AMB}" stroke-width="1.6"/>
    <circle cx="70" cy="150" r="2.2" fill="#ffffff" stroke="${AMB}" stroke-width="1"/><circle cx="100" cy="130" r="2.2" fill="#ffffff" stroke="${AMB}" stroke-width="1"/>
    <circle cx="122" cy="158" r="2.2" fill="#ffffff" stroke="${AMB}" stroke-width="1"/><circle cx="86" cy="116" r="2" fill="#ffffff" stroke="${AMB}" stroke-width="1"/>
    <circle cx="110" cy="176" r="2.2" fill="#ffffff" stroke="${AMB}" stroke-width="1"/><circle cx="78" cy="172" r="2" fill="#ffffff" stroke="${AMB}" stroke-width="1"/>
    <text x="95" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">two solutions</text>
    <text x="95" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">a white solid forms</text>

    ${arrowR(170, 206, 110, INK)}

    <text x="285" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">2 · Filter</text>
    ${funnel(285, 62)}
    ${residue(285, 62, '#ffffff', AMB)}
    ${receiver(285, 62, '#f8fafc', SPEC)}
    <text x="285" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${AMB}" text-anchor="middle">the precipitate</text>
    <text x="285" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">stays in the filter paper</text>

    ${arrowR(360, 396, 110, INK)}

    <text x="475" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">3 · Rinse</text>
    ${funnel(475, 62)}
    ${residue(475, 62, '#ffffff', AMB)}
    ${receiver(475, 62, '#f8fafc', SPEC)}
    <rect x="528" y="88" width="32" height="56" rx="8" fill="#f8fafc" stroke="${GLASS}" stroke-width="2"/>
    <rect x="537" y="80" width="14" height="8" rx="2" fill="${GLASS}"/>
    <path d="M 544 80 L 544 66 Q 544 56 534 56 L 500 60" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="498" y1="62" x2="480" y2="88" stroke="#60a5fa" stroke-width="2" stroke-dasharray="2 4" stroke-linecap="round"/>
    <text x="475" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">distilled water</text>
    <text x="475" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">washes the solid clean</text>

    ${arrowR(566, 600, 110, INK)}

    <text x="665" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">4 · Dry</text>
    <rect x="607" y="62" width="116" height="128" rx="8" fill="#f1f5f9" stroke="${INK}" stroke-width="2"/>
    <rect x="619" y="76" width="92" height="84" rx="4" fill="#ffffff" stroke="${MUTED}" stroke-width="1.5"/>
    <path d="M 640 98 q 4 -6 8 0 t 8 0 t 8 0" fill="none" stroke="${HEAT}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M 668 92 q 4 -6 8 0 t 8 0" fill="none" stroke="${HEAT}" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="665" cy="132" r="22" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
    <ellipse cx="665" cy="133" rx="12" ry="6" fill="#ffffff" stroke="${AMB}" stroke-width="1.6"/>
    <circle cx="630" cy="176" r="5" fill="#ffffff" stroke="${MUTED}" stroke-width="1.5"/>
    <circle cx="648" cy="176" r="5" fill="#ffffff" stroke="${MUTED}" stroke-width="1.5"/>
    <text x="665" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">a warm oven</text>
    <text x="665" y="264" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">dries the precipitate</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · The ionic equation for precipitation: every ion of
//     BaCl₂(aq) + MgSO₄(aq) → BaSO₄(s) + MgCl₂(aq) written out, Cl⁻ and Mg²⁺
//     struck through on BOTH sides, and what is left boxed. Row 1 is the left
//     side, row 2 the right side.
// ───────────────────────────────────────────────────────────────────────────
const PRECIP_STRIKE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 250" class="w-full h-full">
    ${plate(600, 250)}
    <text x="300" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Strike out the ions that are the same on both sides</text>

    <text x="60" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${AMB}" text-anchor="middle">Ba²⁺(aq)</text>
    ${plus(109, 73, INK, 5)}
    <text x="158" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">2Cl⁻(aq)</text>
    ${plus(207, 73, INK, 5)}
    <text x="256" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺(aq)</text>
    ${plus(305, 73, INK, 5)}
    <text x="360" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${AMB}" text-anchor="middle">SO₄²⁻(aq)</text>
    ${arrowR(406, 440, 73, INK)}
    <line x1="126" y1="73" x2="190" y2="73" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="224" y1="73" x2="288" y2="73" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <text x="158" y="98" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>
    <text x="256" y="98" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>

    <text x="300" y="130" font-family="${FONT}" font-size="15" font-weight="bold" fill="${AMB}" text-anchor="middle">BaSO₄(s)</text>
    ${plus(349, 125, INK, 5)}
    <text x="398" y="130" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺(aq)</text>
    ${plus(447, 125, INK, 5)}
    <text x="496" y="130" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">2Cl⁻(aq)</text>
    <line x1="366" y1="125" x2="430" y2="125" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="464" y1="125" x2="528" y2="125" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <text x="398" y="150" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>
    <text x="496" y="150" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>
    <text x="300" y="150" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">stays whole</text>

    <text x="300" y="178" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">What is left is the ionic equation</text>
    <rect x="130" y="188" width="340" height="48" rx="12" fill="${AMB_F}" stroke="${AMB}" stroke-width="1.8"/>
    <text x="300" y="218" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · Hydrated and anhydrous: blue CuSO₄·5H₂O crystals → heat → white
//     anhydrous CuSO₄; add water and it turns blue again.
// ───────────────────────────────────────────────────────────────────────────
const HYDRATED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 232" class="w-full h-full">
    ${plate(520, 232)}
    <text x="260" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Hydrated and anhydrous copper(II) sulfate</text>
    <path d="M 60 146 Q 120 162 180 146" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linecap="round"/>
    ${crystals([[92, 138, 9], [112, 136, 10], [134, 138, 9], [154, 140, 7], [102, 120, 9], [124, 118, 10], [145, 123, 8], [114, 100, 9], [134, 102, 7]], CU_XTAL, CU_XTAL_D)}
    <path d="M 340 146 Q 400 162 460 146" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 352 146 Q 400 96 448 146 Z" fill="#f8fafc" stroke="${GLASS}" stroke-width="1.6"/>
    <circle cx="384" cy="132" r="1.4" fill="${GLASS}"/><circle cx="404" cy="124" r="1.4" fill="${GLASS}"/><circle cx="420" cy="136" r="1.4" fill="${GLASS}"/>

    <text x="260" y="80" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">heat</text>
    ${arrowR(200, 320, 92, INK)}
    <text x="260" y="118" font-family="${FONT}" font-size="11" fill="${NEU}" text-anchor="middle">water is driven off</text>
    ${arrowL(320, 200, 140, NEU)}
    <text x="260" y="162" font-family="${FONT}" font-size="11" font-weight="bold" fill="${NEU}" text-anchor="middle">add water: blue again</text>

    <text x="120" y="184" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CU_XTAL_D}" text-anchor="middle">hydrated</text>
    <text x="120" y="201" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">CuSO₄·5H₂O</text>
    <text x="120" y="218" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">blue crystals</text>
    <text x="400" y="184" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">anhydrous</text>
    <text x="400" y="201" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">CuSO₄</text>
    <text x="400" y="218" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">white powder</text>
  </svg>`

export const DIAGRAMS = {
  METAL_METHOD: METAL_METHOD,
  FILTER_PARTS: FILTER_PARTS,
  BASE_METHOD: BASE_METHOD,
  TITRATION_RIG: TITRATION_RIG,
  SOLUBILITY_TABLE: SOLUBILITY_TABLE,
  PRECIP_PARTICLES: PRECIP_PARTICLES,
  PRECIP_METHOD: PRECIP_METHOD,
  PRECIP_STRIKE: PRECIP_STRIKE,
  HYDRATED: HYDRATED,
}
