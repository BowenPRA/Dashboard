// src/data/IGCSE_CHEM/M06_1/diagrams.js
// Teaching diagrams for 6.1 Acids, Bases and Alkalis (book spreads 11.1 and
// 11.2). All AUTHORED, nothing taken from the book: the bottles, the hazard
// sign, the indicator table, the pH scale and the particle pictures are drawn
// here so the labels are real <text> the SVG audit can measure, and there is no
// licence to carry.
//
// Colour means something on this track, and it follows universal indicator:
//   acid / H⁺            red           #c8102e
//   alkali, base / OH⁻   blue-violet   #4338ca
//   neutral / water      green         #2f8f5b
//   the rest of an acid  grey          #94a3b8   (Cl⁻, CH₃COO⁻ — the ion that
//                                                   is not H⁺)
// Litmus and the other indicators are drawn in the colours they really turn,
// which is why the table and the litmus papers carry their own reds and blues.
//
// House rules (kept from M06_2 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · charges are Unicode superscripts (⁺ ⁻ ²⁻), never <tspan>;
//  · no gradients, clip paths or markers, so there are no ids to collide.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const ACID = '#c8102e', ACID_F = '#fde2e4'   // acid, H⁺
const ALK = '#4338ca', ALK_F = '#e0e7ff'     // alkali / base, OH⁻
const NEU = '#2f8f5b'                        // neutral
const SPEC = '#94a3b8', SPEC_F = '#f1f5f9'   // the rest of the acid
const MOL = '#475569', MOL_F = '#e2e8f0'     // a whole, undissociated molecule
const GLASS = '#7c8a95'
const LIT_RED = '#dc2626'                    // litmus / methyl orange in acid
const LIT_BLUE = '#3b5bdb'                   // litmus / thymolphthalein in alkali
const YELLOW = '#facc15'                     // methyl orange in alkali; hazard sign

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

/** A reagent bottle centred on `cx`: stopper, neck, body and a blank label. */
const bottle = (cx) => `<path d="M ${cx - 14} 58 L ${cx - 14} 72 Q ${cx - 38} 76 ${cx - 38} 96 L ${cx - 38} 180 Q ${cx - 38} 188 ${cx - 30} 188 L ${cx + 30} 188 Q ${cx + 38} 188 ${cx + 38} 180 L ${cx + 38} 96 Q ${cx + 38} 76 ${cx + 14} 72 L ${cx + 14} 58 Z" fill="#fff5f6" stroke="${GLASS}" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="${cx - 18}" y="40" width="36" height="20" rx="5" fill="#cbd5e1" stroke="${GLASS}" stroke-width="1.6"/>
    <rect x="${cx - 31}" y="106" width="62" height="50" rx="4" fill="#ffffff" stroke="${ACID}" stroke-width="1.4"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.6"/>
    <path d="M ${x2} ${y} l -11 -6 l 0 12 z" fill="${col}"/>`

/** A left-pointing arrow from x1 (right) to x2 (left) at height y. */
const arrowL = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 + 8}" y2="${y}" stroke="${col}" stroke-width="2.6"/>
    <path d="M ${x2} ${y} l 11 -6 l 0 12 z" fill="${col}"/>`

/** One ion as a disc; its label is written out literally beside the call. */
const disc = (x, y, r, fill, stroke) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

/** A capsule for a molecule or a many-atom ion; label written out literally. */
const capsule = (x, y, fill, stroke) => `<rect x="${x - 29}" y="${y - 11}" width="58" height="22" rx="11" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>`

/** Small particles for the strength / concentration grid (no labels — a key explains them). */
const hIon = (x, y) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${ACID}"/>`
const aIon = (x, y) => `<circle cx="${x}" cy="${y}" r="6.5" fill="${SPEC_F}" stroke="${SPEC}" stroke-width="1.6"/>`
/**
 * Up to nine acid particles in a 3 × 3 grid centred on `cx`, first row at `top`.
 * `code` is nine characters: S = split into H⁺ and a negative ion (drawn apart),
 * M = a whole molecule (the two drawn overlapping), . = empty.
 */
const acidUnits = (cx, top, code) => code.split('').map((c, i) => {
  const x = cx + ((i % 3) - 1) * 38
  const y = top + Math.floor(i / 3) * 24
  if (c === 'S') return hIon(x - 9, y - 4) + aIon(x + 8, y + 5)
  if (c === 'M') return aIon(x + 4, y) + hIon(x - 5, y)
  return ''
}).join('')

// ───────────────────────────────────────────────────────────────────────────
// 1 · The four acids you will meet in the lab, with their formulae.
// ───────────────────────────────────────────────────────────────────────────
const LAB_ACIDS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 244" class="w-full h-full">
    ${plate(460, 244)}
    <text x="230" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The four acids you will meet in the lab</text>
    ${bottle(65)}
    <text x="65" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">H₂SO₄</text>
    <text x="65" y="147" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">(aq)</text>
    ${bottle(175)}
    <text x="175" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">HCl</text>
    <text x="175" y="147" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">(aq)</text>
    ${bottle(285)}
    <text x="285" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">HNO₃</text>
    <text x="285" y="147" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">(aq)</text>
    ${bottle(395)}
    <text x="395" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">CH₃COOH</text>
    <text x="395" y="147" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">(aq)</text>

    <text x="65" y="210" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">sulfuric</text>
    <text x="65" y="226" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">acid</text>
    <text x="175" y="210" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">hydrochloric</text>
    <text x="175" y="226" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">acid</text>
    <text x="285" y="210" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">nitric</text>
    <text x="285" y="226" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">acid</text>
    <text x="395" y="210" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">ethanoic</text>
    <text x="395" y="226" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">acid</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · The corrosive hazard sign, drawn: acid dripping from two test tubes onto
//     a hand and onto a metal bar, which it eats into.
// ───────────────────────────────────────────────────────────────────────────
const CORROSIVE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 262" class="w-full h-full">
    ${plate(360, 262)}
    <path d="M 180 22 L 330 204 L 30 204 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>

    <line x1="108" y1="94" x2="142" y2="122" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>
    <line x1="108" y1="94" x2="142" y2="122" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="146" cy="136" rx="3" ry="4.5" fill="${INK}"/>
    <ellipse cx="146" cy="149" rx="3" ry="4.5" fill="${INK}"/>
    <rect x="110" y="160" width="46" height="20" rx="7" fill="${INK}"/>
    <line x1="156" y1="163" x2="178" y2="163" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="156" y1="168.5" x2="181" y2="168.5" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="156" y1="174" x2="179" y2="174" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="154" y1="179" x2="172" y2="179" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="126" y1="162" x2="138" y2="150" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>

    <line x1="204" y1="94" x2="238" y2="122" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>
    <line x1="204" y1="94" x2="238" y2="122" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="242" cy="136" rx="3" ry="4.5" fill="${INK}"/>
    <ellipse cx="242" cy="149" rx="3" ry="4.5" fill="${INK}"/>
    <rect x="204" y="160" width="78" height="20" fill="${INK}"/>
    <path d="M 231 160 L 242 172 L 253 160 Z" fill="${YELLOW}"/>

    <text x="180" y="232" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">CORROSIVE</text>
    <text x="180" y="250" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">attacks skin, eyes, cloth and metals</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Bases and alkalis: the alkalis are the small group of bases that
//     dissolve in water — a box inside a box.
// ───────────────────────────────────────────────────────────────────────────
const BASES_ALKALIS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 262" class="w-full h-full">
    ${plate(460, 262)}
    <text x="230" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Every alkali is a base, but not every base is an alkali</text>
    <rect x="14" y="40" width="432" height="208" rx="14" fill="#f8f9ff" stroke="${ALK}" stroke-width="1.8"/>
    <text x="230" y="64" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ALK}" text-anchor="middle">Bases: the oxides and hydroxides of metals</text>

    <text x="30" y="100" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">Insoluble bases</text>
    <text x="30" y="126" font-family="${FONT}" font-size="12" fill="${INK}">copper(II) oxide, CuO</text>
    <text x="30" y="148" font-family="${FONT}" font-size="12" fill="${INK}">magnesium oxide, MgO</text>
    <text x="30" y="170" font-family="${FONT}" font-size="12" fill="${INK}">iron(III) oxide, Fe₂O₃</text>
    <text x="30" y="192" font-family="${FONT}" font-size="12" fill="${INK}">magnesium hydroxide, Mg(OH)₂</text>
    <text x="30" y="222" font-family="${FONT}" font-size="11" fill="${MUTED}">do not dissolve in water</text>

    <rect x="236" y="82" width="196" height="150" rx="12" fill="${ALK_F}" stroke="${ALK}" stroke-width="2"/>
    <text x="334" y="108" font-family="${FONT}" font-size="14" font-weight="bold" fill="${ALK}" text-anchor="middle">Alkalis</text>
    <text x="334" y="126" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the bases that dissolve</text>
    <text x="334" y="154" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">sodium hydroxide, NaOH</text>
    <text x="334" y="176" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">potassium hydroxide, KOH</text>
    <text x="334" y="198" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">calcium hydroxide, Ca(OH)₂</text>
    <text x="334" y="222" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ALK}" text-anchor="middle">solutions contain OH⁻ ions</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · The litmus test: blue litmus paper dipped in an acid turns red; red
//     litmus paper dipped in an alkali turns blue. Only the wet end changes.
// ───────────────────────────────────────────────────────────────────────────
const LITMUS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 236" class="w-full h-full">
    ${plate(440, 236)}
    <text x="110" y="24" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">blue litmus paper in an acid</text>
    ${beaker(110, 56, 70, 196, 118, ACID_F)}
    <rect x="102" y="40" width="16" height="78" fill="${LIT_BLUE}"/>
    <rect x="102" y="118" width="16" height="64" fill="${LIT_RED}"/>
    <text x="110" y="220" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">turns red</text>

    <text x="330" y="24" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">red litmus paper in an alkali</text>
    ${beaker(330, 56, 70, 196, 118, ALK_F)}
    <rect x="322" y="40" width="16" height="78" fill="${LIT_RED}"/>
    <rect x="322" y="118" width="16" height="64" fill="${LIT_BLUE}"/>
    <text x="330" y="220" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ALK}" text-anchor="middle">turns blue</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The indicator table: three indicators, the colour of each in an acid
//     and in an alkali. The chips are drawn in the real colours.
// ───────────────────────────────────────────────────────────────────────────
const INDICATOR_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 192" class="w-full h-full">
    ${plate(440, 192)}
    <rect x="12" y="12" width="150" height="36" fill="${SPEC_F}" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="162" y="12" width="132" height="36" fill="${SPEC_F}" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="294" y="12" width="134" height="36" fill="${SPEC_F}" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="87" y="35" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Indicator</text>
    <text x="228" y="35" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">in an acid</text>
    <text x="361" y="35" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">in an alkali</text>

    <rect x="12" y="48" width="150" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="162" y="48" width="132" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="294" y="48" width="134" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="24" y="75" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">litmus</text>
    <rect x="180" y="57" width="96" height="26" rx="6" fill="${LIT_RED}"/>
    <text x="228" y="75" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">red</text>
    <rect x="313" y="57" width="96" height="26" rx="6" fill="${LIT_BLUE}"/>
    <text x="361" y="75" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">blue</text>

    <rect x="12" y="92" width="150" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="162" y="92" width="132" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="294" y="92" width="134" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="24" y="119" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">methyl orange</text>
    <rect x="180" y="101" width="96" height="26" rx="6" fill="${LIT_RED}"/>
    <text x="228" y="119" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">red</text>
    <rect x="313" y="101" width="96" height="26" rx="6" fill="${YELLOW}"/>
    <text x="361" y="119" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">yellow</text>

    <rect x="12" y="136" width="150" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="162" y="136" width="132" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="294" y="136" width="134" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="24" y="163" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">thymolphthalein</text>
    <rect x="180" y="145" width="96" height="26" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="4 3"/>
    <text x="228" y="163" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">colourless</text>
    <rect x="313" y="145" width="96" height="26" rx="6" fill="${LIT_BLUE}"/>
    <text x="361" y="163" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">blue</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · H⁺ and OH⁻: the badge for each, what it does, and the book's two
//     dissociation equations (HCl and NaOH), drawn fresh.
// ───────────────────────────────────────────────────────────────────────────
const ION_BADGES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" class="w-full h-full">
    ${plate(480, 240)}
    <line x1="240" y1="40" x2="240" y2="226" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5 4"/>

    <text x="120" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">Every acid solution contains</text>
    ${disc(120, 82, 32, ACID_F, ACID)}
    <text x="120" y="91" font-family="${FONT}" font-size="24" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    <text x="120" y="138" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">hydrogen ions</text>
    <text x="120" y="156" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">these make it acidic</text>
    <rect x="14" y="174" width="212" height="46" rx="10" fill="#fff5f6" stroke="${ACID}" stroke-width="1.6"/>
    <text x="120" y="202" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">HCl(aq) → H⁺(aq) + Cl⁻(aq)</text>

    <text x="360" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">Every alkaline solution contains</text>
    ${disc(360, 82, 32, ALK_F, ALK)}
    <text x="360" y="90" font-family="${FONT}" font-size="21" font-weight="bold" fill="${ALK}" text-anchor="middle">OH⁻</text>
    <text x="360" y="138" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">hydroxide ions</text>
    <text x="360" y="156" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">these make it alkaline</text>
    <rect x="254" y="174" width="212" height="46" rx="10" fill="#f5f6ff" stroke="${ALK}" stroke-width="1.6"/>
    <text x="360" y="202" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">NaOH(aq) → Na⁺(aq) + OH⁻(aq)</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · The pH scale 0–14 in universal-indicator colours: acidic below 7,
//     neutral at 7, alkaline above 7, and which way the H⁺ and OH⁻
//     concentrations rise. Cell i spans x = 25 + 34i to 59 + 34i.
// ───────────────────────────────────────────────────────────────────────────
const PH_SCALE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 222" class="w-full h-full">
    ${plate(560, 222)}
    <text x="280" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The pH scale in universal indicator colours</text>
    <text x="76" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">red</text>
    <text x="161" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">orange</text>
    <text x="229" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">yellow</text>
    <text x="280" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">green</text>
    <text x="348" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">blue</text>
    <text x="467" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">violet</text>

    <rect x="25" y="62" width="34" height="40" fill="#b91c1c"/>
    <text x="42" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">0</text>
    <rect x="59" y="62" width="34" height="40" fill="#dc2626"/>
    <text x="76" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <rect x="93" y="62" width="34" height="40" fill="#ef4444"/>
    <text x="110" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <rect x="127" y="62" width="34" height="40" fill="#f97316"/>
    <text x="144" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <rect x="161" y="62" width="34" height="40" fill="#fb923c"/>
    <text x="178" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <rect x="195" y="62" width="34" height="40" fill="#facc15"/>
    <text x="212" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <rect x="229" y="62" width="34" height="40" fill="#d4e157"/>
    <text x="246" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <rect x="263" y="62" width="34" height="40" fill="#22a34a"/>
    <text x="280" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">7</text>
    <rect x="297" y="62" width="34" height="40" fill="#14b8a6"/>
    <text x="314" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">8</text>
    <rect x="331" y="62" width="34" height="40" fill="#0ea5e9"/>
    <text x="348" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">9</text>
    <rect x="365" y="62" width="34" height="40" fill="#2563eb"/>
    <text x="382" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">10</text>
    <rect x="399" y="62" width="34" height="40" fill="#4338ca"/>
    <text x="416" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">11</text>
    <rect x="433" y="62" width="34" height="40" fill="#5b21b6"/>
    <text x="450" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">12</text>
    <rect x="467" y="62" width="34" height="40" fill="#6d28d9"/>
    <text x="484" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">13</text>
    <rect x="501" y="62" width="34" height="40" fill="#7e22ce"/>
    <text x="518" y="88" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">14</text>
    <rect x="25" y="62" width="510" height="40" fill="none" stroke="${INK}" stroke-width="1.5"/>

    <text x="144" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">acidic: below 7</text>
    <text x="280" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NEU}" text-anchor="middle">neutral: 7</text>
    <text x="416" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">alkaline: above 7</text>

    ${arrowL(262, 28, 148, ACID)}
    <text x="144" y="170" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">the more H⁺ ions, the lower the pH</text>
    ${arrowR(298, 532, 148, ALK)}
    <text x="416" y="170" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">the more OH⁻ ions, the higher the pH</text>

    <text x="280" y="204" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">pure water is neutral: pH 7</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · Strong and weak (Extended): the same concentration of two acids.
//     Hydrochloric acid — every molecule split: 6 H⁺ and 6 Cl⁻. Ethanoic
//     acid — 6 molecules, only 1 split: 5 whole CH₃COOH, 1 H⁺, 1 CH₃COO⁻.
//     (Schematic: the real split in ethanoic acid is nearer 1 in 75.)
// ───────────────────────────────────────────────────────────────────────────
const STRONG_WEAK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 272" class="w-full h-full">
    ${plate(520, 272)}
    <text x="130" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">hydrochloric acid</text>
    <text x="130" y="42" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">0.1 mol/dm³</text>
    ${beaker(130, 100, 56, 214, 70, '#fff5f6')}
    ${disc(62, 100, 13, ACID_F, ACID)}<text x="62" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(106, 100, 13, SPEC_F, SPEC)}<text x="106" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(150, 100, 13, ACID_F, ACID)}<text x="150" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(194, 100, 13, SPEC_F, SPEC)}<text x="194" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(62, 146, 13, SPEC_F, SPEC)}<text x="62" y="150" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(106, 146, 13, ACID_F, ACID)}<text x="106" y="150" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(150, 146, 13, SPEC_F, SPEC)}<text x="150" y="150" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(194, 146, 13, ACID_F, ACID)}<text x="194" y="150" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(62, 192, 13, ACID_F, ACID)}<text x="62" y="196" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(106, 192, 13, SPEC_F, SPEC)}<text x="106" y="196" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(150, 192, 13, ACID_F, ACID)}<text x="150" y="196" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(194, 192, 13, SPEC_F, SPEC)}<text x="194" y="196" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    <text x="130" y="238" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">every molecule has split into ions</text>
    <text x="130" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">6 H⁺ ions</text>

    <text x="390" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">ethanoic acid</text>
    <text x="390" y="42" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">0.1 mol/dm³</text>
    ${beaker(390, 100, 56, 214, 70, '#fff5f6')}
    ${capsule(335, 100, MOL_F, MOL)}<text x="335" y="103" font-family="${FONT}" font-size="9" font-weight="bold" fill="${INK}" text-anchor="middle">CH₃COOH</text>
    ${capsule(435, 100, MOL_F, MOL)}<text x="435" y="103" font-family="${FONT}" font-size="9" font-weight="bold" fill="${INK}" text-anchor="middle">CH₃COOH</text>
    ${capsule(335, 146, MOL_F, MOL)}<text x="335" y="149" font-family="${FONT}" font-size="9" font-weight="bold" fill="${INK}" text-anchor="middle">CH₃COOH</text>
    ${capsule(335, 192, MOL_F, MOL)}<text x="335" y="195" font-family="${FONT}" font-size="9" font-weight="bold" fill="${INK}" text-anchor="middle">CH₃COOH</text>
    ${capsule(435, 192, MOL_F, MOL)}<text x="435" y="195" font-family="${FONT}" font-size="9" font-weight="bold" fill="${INK}" text-anchor="middle">CH₃COOH</text>
    ${disc(404, 146, 13, ACID_F, ACID)}<text x="404" y="150" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${capsule(456, 146, SPEC_F, SPEC)}<text x="456" y="149" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    <text x="390" y="238" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">most molecules are still whole</text>
    <text x="390" y="258" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">1 H⁺ ion</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · Strength is not concentration (Extended): a 2 × 2 grid. Columns are
//     strong / weak (how much of the acid splits); rows are concentrated /
//     dilute (how much acid is in the water). Concentrated = 9 acid particles,
//     dilute = 3. Strong: all split. Weak: most whole (2 of 9, 1 of 3 split).
// ───────────────────────────────────────────────────────────────────────────
const CONC_STRENGTH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 334" class="w-full h-full">
    ${plate(520, 334)}
    <text x="220" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">strong acid</text>
    <text x="220" y="44" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">splits completely</text>
    <text x="410" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">weak acid</text>
    <text x="410" y="44" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">splits only partly</text>

    <text x="62" y="112" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">concentrated</text>
    <text x="62" y="130" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">lots of acid</text>
    ${beaker(220, 62, 62, 166, 74, '#fff5f6')}
    ${acidUnits(220, 94, 'SSSSSSSSS')}
    ${beaker(410, 62, 62, 166, 74, '#fff5f6')}
    ${acidUnits(410, 94, 'MSMMMMMSM')}

    <text x="62" y="246" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">dilute</text>
    <text x="62" y="264" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">a little acid</text>
    ${beaker(220, 62, 196, 298, 208, '#fff5f6')}
    ${acidUnits(220, 228, 'S...S...S')}
    ${beaker(410, 62, 196, 298, 208, '#fff5f6')}
    ${acidUnits(410, 228, 'M...S...M')}

    ${hIon(122, 318)}
    <text x="134" y="322" font-family="${FONT}" font-size="11" fill="${INK}">H⁺ ion</text>
    ${aIon(214, 318)}
    <text x="226" y="322" font-family="${FONT}" font-size="11" fill="${INK}">negative ion</text>
    ${aIon(330, 318)}${hIon(321, 318)}
    <text x="344" y="322" font-family="${FONT}" font-size="11" fill="${INK}">whole acid molecule</text>
  </svg>`

export const DIAGRAMS = {
  LAB_ACIDS: LAB_ACIDS,
  CORROSIVE: CORROSIVE,
  BASES_ALKALIS: BASES_ALKALIS,
  LITMUS: LITMUS,
  INDICATOR_TABLE: INDICATOR_TABLE,
  ION_BADGES: ION_BADGES,
  PH_SCALE: PH_SCALE,
  STRONG_WEAK: STRONG_WEAK,
  CONC_STRENGTH: CONC_STRENGTH,
}
