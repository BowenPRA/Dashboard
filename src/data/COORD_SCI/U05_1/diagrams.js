// src/data/COORD_SCI/U05_1/diagrams.js
// Teaching diagrams for C5.01 Exothermic and endothermic reactions, drawn to
// match the Cambridge IGCSE Coursebook figures this unit is built from:
// C5.04 (the hot/cold test tubes), C5.05 and C5.06 (the two energy level
// diagrams), C5.07 (the same diagram with ΔH labelled), C5.09 (the MEXOBENDO
// memory aid) and C5.10/C5.11 (activation energy, and the bond-breaking /
// bond-making "roller coaster").
//
// These are AUTHORED rather than downloaded. A reaction pathway diagram is line
// art — axes, two level lines, one arrow — so drawing it here beats sourcing a
// bitmap: it stays crisp at any size, it matches the deck's palette instead of
// fighting it, the labels are real <text> the SVG audit can measure, and there
// is no third-party licence to carry (so no CREDITS.json, as in U04_1).
//
// House rules (kept from U04_1 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it; labels live in the margins, never boxed in tight rects;
//  · plus/minus and arrowheads are drawn as line/path shapes, not text.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

// Shape palette. The book draws energy levels in green; we keep that, and use a
// warm red for "energy out" and a cool blue for "energy in" throughout the unit
// so the two ideas are colour-coded consistently across every slide.
const LEVEL = '#2f8f5b'          // the coursebook's green level lines
const WARM = '#c8102e', WARM_F = '#fde2e4'  // exothermic / heat out
const COOL = '#1a5fa8', COOL_F = '#dbeafe'  // endothermic / heat in
const GLASS = '#cbd5e1'          // test-tube outline
const BOND = '#c8102e'           // a drawn bond
const ATOM_F = '#f7c9cd', ATOM_S = '#c2185b'
const YELLOW_F = '#fde68a', YELLOW_S = '#d97706'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/**
 * The axes every energy level diagram shares: an up arrow for Energy / kJ and a
 * right arrow for Progress of reaction. `ox, oy` is the origin; `w, h` the plot.
 */
const axes = (ox, oy, w, h) => `<line x1="${ox}" y1="${oy - h - 14}" x2="${ox}" y2="${oy}" stroke="${INK}" stroke-width="2"/>
    <path d="M ${ox} ${oy - h - 20} l -5 9 l 10 0 z" fill="${INK}"/>
    <line x1="${ox}" y1="${oy}" x2="${ox + w + 8}" y2="${oy}" stroke="${INK}" stroke-width="2"/>
    <path d="M ${ox + w + 14} ${oy} l -9 -5 l 0 10 z" fill="${INK}"/>`

/** A thick green energy level line, the way the book draws them. */
const level = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${LEVEL}" stroke-width="5.5" stroke-linecap="round"/>`

/** A vertical measuring arrow between two energy levels. */
const dArrow = (x, yFrom, yTo, col) => {
  const down = yTo > yFrom
  const tip = down ? yTo : yTo
  return `<line x1="${x}" y1="${yFrom}" x2="${x}" y2="${down ? tip - 8 : tip + 8}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x} ${tip} l -5.5 ${down ? -11 : 11} l 11 0 z" fill="${col}"/>`
}

// ───────────────────────────────────────────────────────────────────────────
// 1 · The two test tubes (coursebook Figure C5.04): an exothermic reaction warms
//     its surroundings; an endothermic one cools them. Arrows point OUT of the
//     hot tube and IN to the cold one.
// ───────────────────────────────────────────────────────────────────────────
const HOT_COLD_TUBES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 300" class="w-full h-full">
    ${plate(380, 300)}
    <text x="96" y="26" font-family="${FONT}" font-size="13" font-weight="700" fill="${WARM}" text-anchor="middle">Exothermic</text>
    <text x="96" y="42" font-family="${FONT}" font-size="11" fill="${LEAD}" text-anchor="middle">gives out heat</text>
    <path d="M 78 58 L 78 226 Q 78 244 96 244 Q 114 244 114 226 L 114 58" fill="${WARM_F}" stroke="${GLASS}" stroke-width="2.4"/>
    <path d="M 74 56 L 118 56" stroke="${GLASS}" stroke-width="3" stroke-linecap="round"/>
    <text x="96" y="156" font-family="${FONT}" font-size="13" font-weight="700" fill="${WARM}" text-anchor="middle">Hot</text>
    <path d="M 74 100 l -22 -8" stroke="${WARM}" stroke-width="2" fill="none"/><path d="M 48 90 l 9 -1 l -3 8 z" fill="${WARM}"/>
    <path d="M 118 100 l 22 -8" stroke="${WARM}" stroke-width="2" fill="none"/><path d="M 144 90 l -9 -1 l 3 8 z" fill="${WARM}"/>
    <path d="M 74 196 l -22 8" stroke="${WARM}" stroke-width="2" fill="none"/><path d="M 48 206 l 9 1 l -3 -8 z" fill="${WARM}"/>
    <path d="M 118 196 l 22 8" stroke="${WARM}" stroke-width="2" fill="none"/><path d="M 144 206 l -9 1 l 3 -8 z" fill="${WARM}"/>
    <path d="M 96 250 l 0 22" stroke="${WARM}" stroke-width="2" fill="none"/><path d="M 96 276 l -4 -9 l 8 0 z" fill="${WARM}"/>
    <text x="96" y="292" font-family="${FONT}" font-size="11" font-weight="700" fill="${WARM}" text-anchor="middle">heat out to surroundings</text>

    <text x="284" y="26" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="middle">Endothermic</text>
    <text x="284" y="42" font-family="${FONT}" font-size="11" fill="${LEAD}" text-anchor="middle">takes in heat</text>
    <path d="M 266 58 L 266 226 Q 266 244 284 244 Q 302 244 302 226 L 302 58" fill="${COOL_F}" stroke="${GLASS}" stroke-width="2.4"/>
    <path d="M 262 56 L 306 56" stroke="${GLASS}" stroke-width="3" stroke-linecap="round"/>
    <text x="284" y="156" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="middle">Cold</text>
    <path d="M 240 92 l 22 8" stroke="${COOL}" stroke-width="2" fill="none"/><path d="M 266 102 l -9 -1 l 3 -8 z" fill="${COOL}"/>
    <path d="M 328 92 l -22 8" stroke="${COOL}" stroke-width="2" fill="none"/><path d="M 302 102 l 9 -1 l -3 -8 z" fill="${COOL}"/>
    <path d="M 240 204 l 22 -8" stroke="${COOL}" stroke-width="2" fill="none"/><path d="M 266 194 l -9 1 l 3 8 z" fill="${COOL}"/>
    <path d="M 328 204 l -22 -8" stroke="${COOL}" stroke-width="2" fill="none"/><path d="M 302 194 l 9 1 l -3 8 z" fill="${COOL}"/>
    <path d="M 284 276 l 0 -22" stroke="${COOL}" stroke-width="2" fill="none"/><path d="M 284 250 l -4 9 l 8 0 z" fill="${COOL}"/>
    <text x="284" y="292" font-family="${FONT}" font-size="11" font-weight="700" fill="${COOL}" text-anchor="middle">heat in from surroundings</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · The exothermic energy level diagram (Figures C5.05 / C5.07): burning
//     methane. Reactants high, products low, a downward arrow labelled ΔH.
// ───────────────────────────────────────────────────────────────────────────
const ENERGY_EXO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full">
    ${plate(400, 300)}
    ${axes(64, 250, 306, 196)}
    <text x="-150" y="22" transform="rotate(-90)" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">Energy / kJ</text>
    <text x="217" y="278" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">Progress of reaction</text>
    ${level(84, 210, 96)}
    ${level(238, 356, 208)}
    <line x1="210" y1="96" x2="238" y2="208" stroke="${LEVEL}" stroke-width="3" stroke-dasharray="5 4"/>
    <text x="84" y="82" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}">CH₄(g) + 2O₂(g)</text>
    <text x="84" y="112" font-family="${FONT}" font-size="11" fill="${LEAD}">reactants</text>
    <text x="238" y="228" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}">CO₂(g) + 2H₂O(g)</text>
    <text x="238" y="244" font-family="${FONT}" font-size="11" fill="${LEAD}">products</text>
    ${dArrow(224, 96, 208, WARM)}
    <text x="256" y="150" font-family="${FONT}" font-size="12" font-weight="700" fill="${WARM}">energy given out</text>
    <text x="256" y="166" font-family="${FONT}" font-size="12" font-weight="700" fill="${WARM}">ΔH = −728 kJ/mol</text>
    <text x="200" y="30" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${KEY}" text-anchor="middle">EXOTHERMIC — products lower than reactants</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · The endothermic energy level diagram (Figure C5.06): nitrogen and oxygen
//     forming nitrogen monoxide in a car engine. Products high, arrow upward.
// ───────────────────────────────────────────────────────────────────────────
const ENERGY_ENDO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full">
    ${plate(400, 300)}
    ${axes(64, 250, 306, 196)}
    <text x="-150" y="22" transform="rotate(-90)" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">Energy / kJ</text>
    <text x="217" y="278" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">Progress of reaction</text>
    ${level(84, 210, 208)}
    ${level(238, 356, 96)}
    <line x1="210" y1="208" x2="238" y2="96" stroke="${LEVEL}" stroke-width="3" stroke-dasharray="5 4"/>
    <text x="84" y="228" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}">N₂(g) + O₂(g)</text>
    <text x="84" y="244" font-family="${FONT}" font-size="11" fill="${LEAD}">reactants</text>
    <text x="256" y="82" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}">2NO(g)</text>
    <text x="256" y="112" font-family="${FONT}" font-size="11" fill="${LEAD}">products</text>
    ${dArrow(224, 208, 96, COOL)}
    <text x="96" y="150" font-family="${FONT}" font-size="12" font-weight="700" fill="${COOL}">energy taken in</text>
    <text x="96" y="166" font-family="${FONT}" font-size="12" font-weight="700" fill="${COOL}">ΔH is positive</text>
    <text x="200" y="30" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${KEY}" text-anchor="middle">ENDOTHERMIC — products higher than reactants</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Activation energy on both profiles side by side (Figure C5.10). This is
//     the Source Analysis centrepiece: the hump exists in BOTH cases, and it is
//     measured from the reactants line, not from the bottom of the axis.
// ───────────────────────────────────────────────────────────────────────────
const ACTIVATION_PAIR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 280" class="w-full h-full">
    ${plate(460, 280)}
    <text x="118" y="26" font-family="${FONT}" font-size="13" font-weight="700" fill="${WARM}" text-anchor="middle">Exothermic</text>
    ${axes(48, 226, 148, 172)}
    <text x="-140" y="20" transform="rotate(-90)" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="middle">Enthalpy / kJ</text>
    ${level(62, 112, 108)}
    ${level(158, 200, 194)}
    <path d="M 112 108 C 124 108, 126 62, 136 62 C 146 62, 148 194, 158 194" fill="none" stroke="${LEVEL}" stroke-width="4"/>
    <line x1="112" y1="108" x2="176" y2="108" stroke="${LEAD}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${dArrow(150, 108, 64, KEY)}
    ${dArrow(176, 108, 194, WARM)}
    <text x="62" y="96" font-family="${FONT}" font-size="10.5" font-weight="700" fill="${INK}">CH₄ + 2O₂</text>
    <text x="152" y="212" font-family="${FONT}" font-size="10.5" font-weight="700" fill="${INK}">CO₂ + 2H₂O</text>
    <text x="158" y="52" font-family="${FONT}" font-size="10" font-weight="700" fill="${KEY}">activation</text>
    <text x="158" y="64" font-family="${FONT}" font-size="10" font-weight="700" fill="${KEY}">energy</text>
    <text x="52" y="248" font-family="${FONT}" font-size="10.5" font-weight="700" fill="${WARM}">energy given out (ΔH negative)</text>
    <text x="118" y="266" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="middle">Progress of reaction</text>

    <text x="342" y="26" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="middle">Endothermic</text>
    ${axes(272, 226, 148, 172)}
    ${level(286, 336, 194)}
    ${level(382, 424, 108)}
    <path d="M 336 194 C 348 194, 350 62, 360 62 C 370 62, 372 108, 382 108" fill="none" stroke="${LEVEL}" stroke-width="4"/>
    <line x1="336" y1="194" x2="400" y2="194" stroke="${LEAD}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${dArrow(374, 194, 64, KEY)}
    ${dArrow(400, 194, 108, COOL)}
    <text x="286" y="212" font-family="${FONT}" font-size="10.5" font-weight="700" fill="${INK}">N₂ + O₂</text>
    <text x="384" y="82" font-family="${FONT}" font-size="10.5" font-weight="700" fill="${INK}">2NO</text>
    <text x="286" y="52" font-family="${FONT}" font-size="10" font-weight="700" fill="${KEY}">activation</text>
    <text x="286" y="64" font-family="${FONT}" font-size="10" font-weight="700" fill="${KEY}">energy</text>
    <text x="276" y="248" font-family="${FONT}" font-size="10.5" font-weight="700" fill="${COOL}">energy taken in (ΔH positive)</text>
    <text x="342" y="266" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}" text-anchor="middle">Progress of reaction</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · MEXOBENDO (Figure C5.09): the memory aid. Making bonds releases energy;
//     breaking bonds needs energy put in.
// ───────────────────────────────────────────────────────────────────────────
const MEXOBENDO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 250" class="w-full h-full">
    ${plate(420, 250)}
    <circle cx="56" cy="52" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="56" y="58" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">A</text>
    <circle cx="112" cy="52" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="112" y="58" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">B</text>
    <line x1="148" y1="52" x2="182" y2="52" stroke="${INK}" stroke-width="2.4"/>
    <path d="M 190 52 l -10 -6 l 0 12 z" fill="${INK}"/>
    <circle cx="230" cy="52" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="230" y="58" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">A</text>
    <line x1="254" y1="52" x2="282" y2="52" stroke="${BOND}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="306" cy="52" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="306" y="58" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">B</text>
    <circle cx="368" cy="52" r="26" fill="${YELLOW_F}" stroke="${YELLOW_S}" stroke-width="2"/>
    <text x="368" y="57" font-family="${FONT}" font-size="12" font-weight="700" fill="${YELLOW_S}" text-anchor="middle">energy</text>
    <text x="210" y="106" font-family="${FONT}" font-size="14" font-weight="700" fill="${WARM}" text-anchor="middle">Making bonds — EXOthermic</text>

    <circle cx="56" cy="166" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="56" y="172" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">A</text>
    <line x1="80" y1="166" x2="108" y2="166" stroke="${BOND}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="132" cy="166" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="132" y="172" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">B</text>
    <circle cx="194" cy="166" r="26" fill="${YELLOW_F}" stroke="${YELLOW_S}" stroke-width="2"/>
    <text x="194" y="171" font-family="${FONT}" font-size="12" font-weight="700" fill="${YELLOW_S}" text-anchor="middle">energy</text>
    <line x1="230" y1="166" x2="264" y2="166" stroke="${INK}" stroke-width="2.4"/>
    <path d="M 272 166 l -10 -6 l 0 12 z" fill="${INK}"/>
    <circle cx="312" cy="166" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="312" y="172" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">A</text>
    <circle cx="368" cy="166" r="24" fill="${ATOM_F}" stroke="${ATOM_S}" stroke-width="2"/>
    <text x="368" y="172" font-family="${FONT}" font-size="16" font-weight="700" fill="${ATOM_S}" text-anchor="middle">B</text>
    <text x="210" y="220" font-family="${FONT}" font-size="14" font-weight="700" fill="${COOL}" text-anchor="middle">Breaking bonds — ENDOthermic</text>
    <text x="210" y="240" font-family="${FONT}" font-size="11" font-weight="700" fill="${KEY}" text-anchor="middle">MEXOBENDO — Making EXO, Breaking ENDO</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · The bond "roller coaster" (Figures C5.08 / C5.11): climbing the hump IS
//     bond breaking, and the drop on the far side IS bond making. This is the
//     slide that explains WHY the activation energy hump has to be there.
// ───────────────────────────────────────────────────────────────────────────
const BOND_ROLLERCOASTER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 290" class="w-full h-full">
    ${plate(420, 290)}
    ${axes(60, 236, 322, 190)}
    <text x="-142" y="20" transform="rotate(-90)" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Enthalpy / kJ</text>
    <text x="222" y="266" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">Progress of reaction</text>
    ${level(74, 152, 150)}
    ${level(300, 396, 208)}
    <path d="M 152 150 C 172 150, 178 68, 196 68 C 214 68, 220 208, 300 208" fill="none" stroke="${LEVEL}" stroke-width="4.5"/>
    <line x1="152" y1="150" x2="330" y2="150" stroke="${LEAD}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${dArrow(178, 150, 72, COOL)}
    ${dArrow(258, 74, 200, WARM)}
    <text x="74" y="138" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">H—H  +  O＝O</text>
    <text x="74" y="168" font-family="${FONT}" font-size="11" fill="${LEAD}">reactants</text>
    <text x="304" y="228" font-family="${FONT}" font-size="11" font-weight="700" fill="${INK}">H₂O  +  H₂O</text>
    <text x="304" y="244" font-family="${FONT}" font-size="11" fill="${LEAD}">products</text>
    <text x="76" y="52" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${COOL}">bond breaking</text>
    <text x="76" y="68" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${COOL}">takes IN energy</text>
    <text x="272" y="106" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${WARM}">bond making</text>
    <text x="272" y="122" font-family="${FONT}" font-size="11.5" font-weight="700" fill="${WARM}">gives OUT energy</text>
    <text x="222" y="30" font-family="${FONT}" font-size="12" font-weight="700" fill="${KEY}" text-anchor="middle">more out than in, so overall EXOTHERMIC</text>
  </svg>`

export const DIAGRAMS = {
  HOT_COLD_TUBES: HOT_COLD_TUBES,
  ENERGY_EXO: ENERGY_EXO,
  ENERGY_ENDO: ENERGY_ENDO,
  ACTIVATION_PAIR: ACTIVATION_PAIR,
  MEXOBENDO: MEXOBENDO,
  BOND_ROLLERCOASTER: BOND_ROLLERCOASTER,
}
