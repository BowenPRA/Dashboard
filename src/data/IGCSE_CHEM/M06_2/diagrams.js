// src/data/IGCSE_CHEM/M06_2/diagrams.js
// Teaching diagrams for 6.2 Reactions of Acids and Bases (book spreads 11.3 and
// 11.4). All AUTHORED, nothing taken from the book: the beakers, the particle
// pictures and the struck-out equation are drawn here so the labels are real
// <text> the SVG audit can measure, and there is no licence to carry.
//
// Colour means something on this track, and it follows universal indicator:
//   acid / H⁺            red           #c8102e
//   alkali, base / OH⁻   blue-violet   #4338ca   (and the O²⁻ of an oxide)
//   neutral / water      green         #2f8f5b
//   spectator ions       grey          #94a3b8
// Nothing else in the unit reuses those four for decoration.
//
// House rules (kept from COORD_SCI/U05_1 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · charges are Unicode superscripts (⁺ ⁻ ²⁻), never <tspan>, so the audit
//    measures the label it actually shows;
//  · no gradients, clip paths or markers, so there are no ids to collide.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const ACID = '#c8102e', ACID_F = '#fde2e4'   // acid, H⁺
const ALK = '#4338ca', ALK_F = '#e0e7ff'     // alkali / base, OH⁻, O²⁻
const NEU = '#2f8f5b', NEU_F = '#dcfce7'     // neutral, water
const SPEC = '#94a3b8', SPEC_F = '#f1f5f9'   // spectator ions
const GLASS = '#7c8a95'
const METAL = '#6b7280'
const BLUE_SOL = '#bfdbfe'                   // copper(II) sulfate solution

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

/** A gas bubble. */
const bubble = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.3"/>`
const bubbles = (pts) => pts.map(([x, y, r]) => bubble(x, y, r)).join('')

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

/** A plus sign drawn as two lines (not text). */
const plus = (x, y, col, a = 7) => `<line x1="${x - a}" y1="${y}" x2="${x + a}" y2="${y}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="${x}" y1="${y - a}" x2="${x}" y2="${y + a}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`

/** One ion or molecule as a disc; its label is written out literally beside the call. */
const disc = (x, y, r, fill, stroke) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

// ───────────────────────────────────────────────────────────────────────────
// 1 · Naming the salt: the acid decides the family name, the metal (or the
//     metal in the base or carbonate) comes first.
// ───────────────────────────────────────────────────────────────────────────
const SALT_NAMER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 262" class="w-full h-full">
    ${plate(460, 262)}
    <text x="230" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The acid you start with names the salt</text>

    <rect x="16" y="42" width="150" height="52" rx="10" fill="${ACID_F}" stroke="${ACID}" stroke-width="1.8"/>
    <text x="91" y="64" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">hydrochloric acid</text>
    <text x="91" y="83" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">HCl</text>
    ${arrowR(172, 208, 68, INK)}
    <rect x="214" y="42" width="230" height="52" rx="10" fill="${NEU_F}" stroke="${NEU}" stroke-width="1.8"/>
    <text x="329" y="64" font-family="${FONT}" font-size="14" font-weight="bold" fill="${NEU}" text-anchor="middle">chlorides</text>
    <text x="329" y="83" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">e.g. calcium chloride, CaCl₂</text>

    <rect x="16" y="110" width="150" height="52" rx="10" fill="${ACID_F}" stroke="${ACID}" stroke-width="1.8"/>
    <text x="91" y="132" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">sulfuric acid</text>
    <text x="91" y="151" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">H₂SO₄</text>
    ${arrowR(172, 208, 136, INK)}
    <rect x="214" y="110" width="230" height="52" rx="10" fill="${NEU_F}" stroke="${NEU}" stroke-width="1.8"/>
    <text x="329" y="132" font-family="${FONT}" font-size="14" font-weight="bold" fill="${NEU}" text-anchor="middle">sulfates</text>
    <text x="329" y="151" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">e.g. zinc sulfate, ZnSO₄</text>

    <rect x="16" y="178" width="150" height="52" rx="10" fill="${ACID_F}" stroke="${ACID}" stroke-width="1.8"/>
    <text x="91" y="200" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">nitric acid</text>
    <text x="91" y="219" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">HNO₃</text>
    ${arrowR(172, 208, 204, INK)}
    <rect x="214" y="178" width="230" height="52" rx="10" fill="${NEU_F}" stroke="${NEU}" stroke-width="1.8"/>
    <text x="329" y="200" font-family="${FONT}" font-size="14" font-weight="bold" fill="${NEU}" text-anchor="middle">nitrates</text>
    <text x="329" y="219" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">e.g. potassium nitrate, KNO₃</text>

    <text x="230" y="252" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">salt name = metal name + acid family</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Acid + metal: magnesium ribbon in dilute sulfuric acid, hydrogen
//     bubbling off. (The book's worked example, drawn fresh.)
// ───────────────────────────────────────────────────────────────────────────
const ACID_METAL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 300" class="w-full h-full">
    ${plate(360, 300)}
    <text x="180" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">acid + metal → salt + hydrogen</text>
    ${beaker(150, 62, 70, 250, 120, ACID_F)}
    <path d="M 112 240 l 14 -18 l 14 18 l 14 -18 l 14 18 l 14 -18 l 14 18" stroke="${METAL}" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    ${bubbles([[128, 204, 3], [146, 188, 4], [162, 208, 3], [172, 174, 3.5], [134, 164, 4], [154, 146, 3], [178, 134, 3.5], [122, 132, 3], [146, 128, 2.5], [188, 196, 3]])}
    ${lead(180, 132, 228, 108)}
    <text x="232" y="104" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">hydrogen gas</text>
    <text x="232" y="120" font-family="${FONT}" font-size="11" fill="${MUTED}">bubbles off</text>
    <text x="232" y="152" font-family="${FONT}" font-size="11" fill="${MUTED}">test: lighted splint</text>
    <text x="232" y="168" font-family="${FONT}" font-size="11" fill="${MUTED}">gives a squeaky pop</text>
    ${lead(194, 228, 228, 212)}
    <text x="232" y="214" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">magnesium ribbon</text>
    <text x="232" y="230" font-family="${FONT}" font-size="11" fill="${MUTED}">(the metal)</text>
    <text x="150" y="274" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">dilute sulfuric acid</text>
    <text x="150" y="291" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">a solution of magnesium sulfate forms</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Acid + base: black copper(II) oxide in dilute sulfuric acid. No gas; the
//     black solid disappears and the solution turns blue.
// ───────────────────────────────────────────────────────────────────────────
const ACID_BASE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 300" class="w-full h-full">
    ${plate(360, 300)}
    <text x="180" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">acid + base → salt + water</text>
    ${beaker(150, 62, 70, 250, 120, BLUE_SOL)}
    <path d="M 108 248 Q 150 224 192 248 Z" fill="#1f2937"/>
    <circle cx="124" cy="232" r="2.5" fill="#1f2937"/><circle cx="170" cy="228" r="2" fill="#1f2937"/><circle cx="150" cy="220" r="2.2" fill="#1f2937"/>
    ${lead(200, 150, 226, 136)}
    <text x="230" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">solution turns</text>
    <text x="230" y="146" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">blue: copper(II)</text>
    <text x="230" y="162" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">sulfate forms</text>
    <text x="230" y="186" font-family="${FONT}" font-size="11" fill="${MUTED}">no gas, no fizzing</text>
    ${lead(180, 238, 226, 222)}
    <text x="230" y="220" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">black copper(II)</text>
    <text x="230" y="236" font-family="${FONT}" font-size="11" fill="${MUTED}">oxide (a base)</text>
    <text x="150" y="274" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">dilute sulfuric acid</text>
    <text x="150" y="291" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the black solid disappears as it reacts</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Acid + carbonate: marble chips (calcium carbonate) in dilute
//     hydrochloric acid, carbon dioxide fizzing off.
// ───────────────────────────────────────────────────────────────────────────
const ACID_CARBONATE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 300" class="w-full h-full">
    ${plate(360, 300)}
    <text x="180" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">acid + carbonate → salt + water + CO₂</text>
    ${beaker(150, 62, 70, 250, 120, ACID_F)}
    <path d="M 108 248 l 6 -18 l 18 -4 l 10 16 l -4 6 z" fill="#f8fafc" stroke="${GLASS}" stroke-width="1.6"/>
    <path d="M 140 248 l 4 -22 l 20 -2 l 8 14 l -6 10 z" fill="#f8fafc" stroke="${GLASS}" stroke-width="1.6"/>
    <path d="M 170 248 l 8 -16 l 16 2 l 2 14 z" fill="#f8fafc" stroke="${GLASS}" stroke-width="1.6"/>
    ${bubbles([[122, 214, 3.5], [150, 206, 4], [180, 214, 3], [132, 186, 4.5], [166, 182, 3.5], [186, 160, 4], [142, 158, 3], [120, 142, 4], [160, 134, 3.5], [182, 128, 3], [138, 128, 2.5], [196, 196, 3]])}
    ${lead(184, 134, 228, 108)}
    <text x="232" y="104" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">carbon dioxide</text>
    <text x="232" y="120" font-family="${FONT}" font-size="11" fill="${MUTED}">fizzes off</text>
    <text x="232" y="152" font-family="${FONT}" font-size="11" fill="${MUTED}">test: it turns</text>
    <text x="232" y="168" font-family="${FONT}" font-size="11" fill="${MUTED}">limewater milky</text>
    ${lead(196, 238, 228, 212)}
    <text x="232" y="214" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">calcium carbonate</text>
    <text x="232" y="230" font-family="${FONT}" font-size="11" fill="${MUTED}">(marble chips)</text>
    <text x="150" y="274" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">dilute hydrochloric acid</text>
    <text x="150" y="291" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">calcium chloride solution is left</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The three typical reactions side by side, all with dilute sulfuric acid
//     and all making the SAME salt, zinc sulfate — only the other products
//     change. Deliberately says nothing about which one is a neutralisation.
// ───────────────────────────────────────────────────────────────────────────
const THREE_REACTIONS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 272" class="w-full h-full">
    ${plate(480, 272)}
    <text x="80" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">acid + metal</text>
    <text x="80" y="45" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">zinc</text>
    ${beaker(80, 48, 60, 196, 98, ACID_F)}
    <circle cx="62" cy="186" r="6" fill="${METAL}"/><circle cx="80" cy="189" r="5" fill="${METAL}"/><circle cx="98" cy="185" r="6" fill="${METAL}"/>
    ${bubbles([[64, 166, 3], [82, 156, 3.5], [98, 168, 3], [72, 136, 3.5], [92, 126, 3], [62, 112, 2.5], [84, 108, 3]])}

    <text x="240" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">acid + base</text>
    <text x="240" y="45" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">zinc oxide</text>
    ${beaker(240, 48, 60, 196, 98, ACID_F)}
    <path d="M 206 194 Q 240 172 274 194 Z" fill="#f8fafc" stroke="${GLASS}" stroke-width="1.6"/>

    <text x="400" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">acid + carbonate</text>
    <text x="400" y="45" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">zinc carbonate</text>
    ${beaker(400, 48, 60, 196, 98, ACID_F)}
    <path d="M 368 194 l 5 -14 l 14 -2 l 7 12 l -2 4 z" fill="#f8fafc" stroke="${GLASS}" stroke-width="1.6"/>
    <path d="M 398 194 l 4 -16 l 15 0 l 6 12 l -3 4 z" fill="#f8fafc" stroke="${GLASS}" stroke-width="1.6"/>
    ${bubbles([[380, 164, 3.5], [402, 158, 4], [420, 168, 3], [388, 136, 4], [412, 128, 3.5], [372, 116, 3], [396, 108, 3], [424, 112, 3.5], [430, 142, 3]])}

    <text x="80" y="220" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NEU}" text-anchor="middle">zinc sulfate</text>
    <text x="80" y="238" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+ hydrogen</text>
    <text x="80" y="258" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">fizzes: H₂ gas</text>
    <text x="240" y="220" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NEU}" text-anchor="middle">zinc sulfate</text>
    <text x="240" y="238" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+ water</text>
    <text x="240" y="258" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">no gas</text>
    <text x="400" y="220" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NEU}" text-anchor="middle">zinc sulfate</text>
    <text x="400" y="238" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+ water + CO₂</text>
    <text x="400" y="258" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">fizzes: CO₂ gas</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Where the water comes from (book spread 11.4, drawn fresh): hydrochloric
//     acid holds H⁺ and Cl⁻, sodium hydroxide holds Na⁺ and OH⁻; after mixing,
//     H⁺ and OH⁻ have become water and Na⁺ / Cl⁻ are untouched.
// ───────────────────────────────────────────────────────────────────────────
const IONS_BEFORE_AFTER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    <text x="90" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">hydrochloric acid</text>
    <text x="90" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">H⁺ and Cl⁻ ions</text>
    ${beaker(90, 60, 60, 212, 88, '#fff5f6')}
    ${disc(60, 110, 15, ACID_F, ACID)}<text x="60" y="114" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(116, 150, 15, ACID_F, ACID)}<text x="116" y="154" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(70, 190, 15, ACID_F, ACID)}<text x="70" y="194" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(114, 108, 15, SPEC_F, SPEC)}<text x="114" y="112" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(62, 152, 15, SPEC_F, SPEC)}<text x="62" y="156" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(118, 192, 15, SPEC_F, SPEC)}<text x="118" y="196" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    <text x="90" y="232" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">turns litmus red</text>

    ${plus(172, 150, INK)}

    <text x="255" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">sodium hydroxide</text>
    <text x="255" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Na⁺ and OH⁻ ions</text>
    ${beaker(255, 60, 60, 212, 88, '#f5f6ff')}
    ${disc(225, 110, 15, SPEC_F, SPEC)}<text x="225" y="114" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    ${disc(281, 150, 15, SPEC_F, SPEC)}<text x="281" y="154" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    ${disc(235, 190, 15, SPEC_F, SPEC)}<text x="235" y="194" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    ${disc(279, 108, 15, ALK_F, ALK)}<text x="279" y="112" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ALK}" text-anchor="middle">OH⁻</text>
    ${disc(227, 152, 15, ALK_F, ALK)}<text x="227" y="156" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ALK}" text-anchor="middle">OH⁻</text>
    ${disc(283, 192, 15, ALK_F, ALK)}<text x="283" y="196" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ALK}" text-anchor="middle">OH⁻</text>
    <text x="255" y="232" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">turns litmus blue</text>

    ${arrowR(326, 374, 150, INK)}
    <text x="348" y="138" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">mix</text>

    <text x="445" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NEU}" text-anchor="middle">after mixing</text>
    <text x="445" y="46" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">water, Na⁺ and Cl⁻</text>
    ${beaker(445, 60, 60, 212, 88, '#f3fcf6')}
    ${disc(413, 110, 14, NEU_F, NEU)}<text x="413" y="113" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    ${disc(445, 110, 14, SPEC_F, SPEC)}<text x="445" y="114" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    ${disc(477, 110, 14, SPEC_F, SPEC)}<text x="477" y="114" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(413, 150, 14, SPEC_F, SPEC)}<text x="413" y="154" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(445, 150, 14, NEU_F, NEU)}<text x="445" y="153" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    ${disc(477, 150, 14, SPEC_F, SPEC)}<text x="477" y="154" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    ${disc(413, 190, 14, SPEC_F, SPEC)}<text x="413" y="194" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    ${disc(445, 190, 14, SPEC_F, SPEC)}<text x="445" y="194" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(477, 190, 14, NEU_F, NEU)}<text x="477" y="193" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    <text x="445" y="232" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">no effect on litmus</text>

    <text x="270" y="266" font-family="${FONT}" font-size="12.5" font-weight="bold" fill="${INK}" text-anchor="middle">H⁺ and OH⁻ join to make water molecules</text>
    <text x="270" y="286" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Na⁺ and Cl⁻ are still there, unchanged, in the solution</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Strike out the spectator ions: the full equation with every ion written
//     out, Cl⁻ and Na⁺ struck through on BOTH sides, and what is left boxed as
//     the ionic equation. Row 1 is the left side, row 2 the right side.
// ───────────────────────────────────────────────────────────────────────────
const SPECTATORS_CROSSED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 246" class="w-full h-full">
    ${plate(560, 246)}
    <text x="280" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Strike out the ions that are the same on both sides</text>

    <text x="60" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺(aq)</text>
    ${plus(103, 73, INK, 5)}
    <text x="150" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻(aq)</text>
    ${plus(198, 73, INK, 5)}
    <text x="246" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺(aq)</text>
    ${plus(294, 73, INK, 5)}
    <text x="342" y="78" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ALK}" text-anchor="middle">OH⁻(aq)</text>
    ${arrowR(380, 410, 73, INK)}
    <line x1="122" y1="73" x2="178" y2="73" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="218" y1="73" x2="274" y2="73" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <text x="150" y="98" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>
    <text x="246" y="98" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>

    <text x="300" y="130" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻(aq)</text>
    ${plus(348, 125, INK, 5)}
    <text x="396" y="130" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺(aq)</text>
    ${plus(444, 125, INK, 5)}
    <text x="492" y="130" font-family="${FONT}" font-size="15" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O(l)</text>
    <line x1="272" y1="125" x2="328" y2="125" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="368" y1="125" x2="424" y2="125" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <text x="300" y="150" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>
    <text x="396" y="150" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">spectator</text>

    <text x="280" y="176" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">What is left is the ionic equation</text>
    <rect x="110" y="186" width="340" height="48" rx="12" fill="${NEU_F}" stroke="${NEU}" stroke-width="1.8"/>
    <text x="280" y="216" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">H⁺(aq) + OH⁻(aq) → H₂O(l)</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · Neutralisation by an insoluble base (book spread 11.4, drawn fresh):
//     a lattice of Mg²⁺ and O²⁻; the acid's H⁺ ions take the O²⁻ ions to make
//     water; the Mg²⁺ ions go into solution beside the Cl⁻ ions.
// ───────────────────────────────────────────────────────────────────────────
const OXIDE_LATTICE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 296" class="w-full h-full">
    ${plate(540, 296)}
    <text x="95" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">solid magnesium oxide</text>
    ${disc(50, 66, 14, SPEC_F, SPEC)}<text x="50" y="69" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(82, 66, 14, ALK_F, ALK)}<text x="82" y="69" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(114, 66, 14, SPEC_F, SPEC)}<text x="114" y="69" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(146, 66, 14, ALK_F, ALK)}<text x="146" y="69" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(50, 98, 14, ALK_F, ALK)}<text x="50" y="101" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(82, 98, 14, SPEC_F, SPEC)}<text x="82" y="101" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(114, 98, 14, ALK_F, ALK)}<text x="114" y="101" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(146, 98, 14, SPEC_F, SPEC)}<text x="146" y="101" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(50, 130, 14, SPEC_F, SPEC)}<text x="50" y="133" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(82, 130, 14, ALK_F, ALK)}<text x="82" y="133" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(114, 130, 14, SPEC_F, SPEC)}<text x="114" y="133" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(146, 130, 14, ALK_F, ALK)}<text x="146" y="133" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(50, 162, 14, ALK_F, ALK)}<text x="50" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(82, 162, 14, SPEC_F, SPEC)}<text x="82" y="165" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(114, 162, 14, ALK_F, ALK)}<text x="114" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(146, 162, 14, SPEC_F, SPEC)}<text x="146" y="165" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    <text x="95" y="204" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">a lattice of Mg²⁺ and O²⁻</text>
    <text x="95" y="220" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">insoluble in water</text>

    ${arrowR(170, 200, 114, INK)}

    <text x="285" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">hydrochloric acid added</text>
    ${disc(222, 66, 14, SPEC_F, SPEC)}<text x="222" y="69" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(254, 66, 14, ALK_F, ALK)}<text x="254" y="69" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(222, 98, 14, ALK_F, ALK)}<text x="222" y="101" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(254, 98, 14, SPEC_F, SPEC)}<text x="254" y="101" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(286, 98, 14, ALK_F, ALK)}<text x="286" y="101" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(222, 130, 14, SPEC_F, SPEC)}<text x="222" y="133" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(254, 130, 14, ALK_F, ALK)}<text x="254" y="133" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(286, 130, 14, SPEC_F, SPEC)}<text x="286" y="133" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(222, 162, 14, ALK_F, ALK)}<text x="222" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">O²⁻</text>
    ${disc(254, 162, 14, SPEC_F, SPEC)}<text x="254" y="165" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(322, 82, 9, ACID_F, ACID)}<text x="322" y="85" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(324, 116, 9, ACID_F, ACID)}<text x="324" y="119" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    <line x1="313" y1="86" x2="303" y2="92" stroke="${ACID}" stroke-width="1.8"/>
    <line x1="315" y1="112" x2="304" y2="105" stroke="${ACID}" stroke-width="1.8"/>
    ${disc(330, 52, 12, SPEC_F, SPEC)}<text x="330" y="56" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(326, 158, 14, NEU_F, NEU)}<text x="326" y="161" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    <text x="285" y="204" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the acid's H⁺ ions</text>
    <text x="285" y="220" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">take the O²⁻ ions</text>

    ${arrowR(352, 382, 114, INK)}

    <text x="455" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">the lattice is gone</text>
    ${disc(412, 68, 14, SPEC_F, SPEC)}<text x="412" y="71" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(476, 148, 14, SPEC_F, SPEC)}<text x="476" y="151" font-family="${FONT}" font-size="8.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    ${disc(454, 60, 12, SPEC_F, SPEC)}<text x="454" y="64" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(506, 92, 12, SPEC_F, SPEC)}<text x="506" y="96" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(412, 160, 12, SPEC_F, SPEC)}<text x="412" y="164" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(510, 176, 12, SPEC_F, SPEC)}<text x="510" y="180" font-family="${FONT}" font-size="9.5" font-weight="bold" fill="${MUTED}" text-anchor="middle">Cl⁻</text>
    ${disc(452, 108, 14, NEU_F, NEU)}<text x="452" y="111" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    ${disc(404, 116, 14, NEU_F, NEU)}<text x="404" y="119" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    <text x="455" y="204" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Mg²⁺ joins the Cl⁻</text>
    <text x="455" y="220" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">water molecules made</text>

    <rect x="140" y="238" width="260" height="44" rx="12" fill="${NEU_F}" stroke="${NEU}" stroke-width="1.8"/>
    <text x="270" y="266" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">2H⁺(aq) + O²⁻(s) → H₂O(l)</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · A hydrogen ion is just a proton: the hydrogen atom (one proton, one
//     electron) loses its electron and only the proton is left.
// ───────────────────────────────────────────────────────────────────────────
const PROTON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 240" class="w-full h-full">
    ${plate(440, 240)}
    <text x="220" y="28" font-family="${FONT}" font-size="12.5" font-weight="bold" fill="${INK}" text-anchor="middle">H⁺ is a hydrogen atom without its electron</text>
    <circle cx="110" cy="122" r="58" fill="none" stroke="${MUTED}" stroke-width="1.6" stroke-dasharray="5 4"/>
    ${disc(110, 122, 13, ACID_F, ACID)}
    <line x1="104" y1="122" x2="116" y2="122" stroke="${ACID}" stroke-width="2.4"/><line x1="110" y1="116" x2="110" y2="128" stroke="${ACID}" stroke-width="2.4"/>
    <circle cx="69" cy="81" r="6" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
    ${lead(64, 76, 52, 66)}
    <text x="20" y="60" font-family="${FONT}" font-size="11" fill="${MUTED}">electron</text>
    <text x="110" y="154" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">proton</text>

    ${arrowR(186, 262, 122, INK)}
    <text x="222" y="108" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">loses its electron</text>

    ${disc(320, 122, 13, ACID_F, ACID)}
    <line x1="314" y1="122" x2="326" y2="122" stroke="${ACID}" stroke-width="2.4"/><line x1="320" y1="116" x2="320" y2="128" stroke="${ACID}" stroke-width="2.4"/>
    <text x="320" y="154" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">proton</text>

    <text x="110" y="206" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">a hydrogen atom</text>
    <text x="110" y="224" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">1 proton + 1 electron</text>
    <text x="320" y="206" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">a hydrogen ion, H⁺</text>
    <text x="320" y="224" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">is just a proton</text>
  </svg>`

export const DIAGRAMS = {
  SALT_NAMER: SALT_NAMER,
  ACID_METAL: ACID_METAL,
  ACID_BASE: ACID_BASE,
  ACID_CARBONATE: ACID_CARBONATE,
  THREE_REACTIONS: THREE_REACTIONS,
  IONS_BEFORE_AFTER: IONS_BEFORE_AFTER,
  SPECTATORS_CROSSED: SPECTATORS_CROSSED,
  OXIDE_LATTICE: OXIDE_LATTICE,
  PROTON: PROTON,
}
