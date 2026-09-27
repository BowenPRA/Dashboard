// src/data/IGCSE_CHEM/M05_2/diagrams.js
// Teaching diagrams for M05_2 Bond Energies & Calculating ΔH (book spread 8.3,
// "Calculating enthalpy changes"). Drawn for this unit — nothing is traced or
// copied from the book; the two worked examples are drawn in our own layout and
// the book's small energy diagrams are redrawn in the unit's colour code.
//
//  · BOND_TABLE       the data card: the book's eleven values, plus the extra
//                     values the Bond Ledger task and the practice items use
//  · SHOW_BONDS_HCL   H–H + Cl–Cl → 2 H–Cl, every bond drawn as a line
//  · SHOW_BONDS_NH3   2NH₃ → N₂ + 3H₂, every bond drawn (six N–H to count)
//  · LEDGER_EXO       the energy diagram for H₂ + Cl₂: reactants, up to the
//                     "bonds broken" level, down to the products, ΔH = −184 kJ
//  · LEDGER_ENDO      the same diagram for decomposing ammonia, ΔH = +92 kJ
//  · TRIPLE_BOND      N≡N, and a bar chart of four bond energies: why
//                     nitrogen is inert
//
// House rules (kept from COORD_SCI/U05_1 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · every label <text> is written out literally (never built by a helper), so
//    the audit can measure it; helpers draw shapes only;
//  · no gradients, markers or clip paths, so there are no ids to collide.
//
// Colour means something here, as everywhere in the track: cool blue = energy
// IN (bonds broken), warm red = energy OUT (bonds made), green = energy levels.

const INK = '#2b2b2b'
const LEAD = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const LEVEL = '#2f8f5b'                       // energy level lines
const WARM = '#c8102e'                       // energy out / bonds made
const COOL = '#1a5fa8', COOL_F = '#dbeafe'   // energy in / bonds broken
const ROW_A = '#f1f5f9', ROW_B = '#ffffff'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A thick green energy level line. */
const level = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${LEVEL}" stroke-width="5" stroke-linecap="round"/>`

/** A vertical arrow from one energy level to another, head at `yTo`. */
const vArrow = (x, yFrom, yTo, col) => {
  const down = yTo > yFrom
  return `<line x1="${x}" y1="${yFrom}" x2="${x}" y2="${down ? yTo - 9 : yTo + 9}" stroke="${col}" stroke-width="2.6"/>
    <path d="M ${x} ${yTo} l -6 ${down ? -12 : 12} l 12 0 z" fill="${col}"/>`
}

/** A bond drawn as a line between two atom symbols. */
const bond = (x1, x2, y, col, w = 4) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`
const vBond = (x, y1, y2, col) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>`

/** A plus sign and a reaction arrow, drawn as shapes rather than text. */
const plus = (cx, cy) => `<line x1="${cx - 8}" y1="${cy}" x2="${cx + 8}" y2="${cy}" stroke="${INK}" stroke-width="2.5"/>
    <line x1="${cx}" y1="${cy - 8}" x2="${cx}" y2="${cy + 8}" stroke="${INK}" stroke-width="2.5"/>`
const yields = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2 - 9}" y2="${y}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M ${x2} ${y} l -11 -6 l 0 12 z" fill="${INK}"/>`

/** The energy axis the two ledger diagrams share. */
const energyAxis = `<line x1="44" y1="30" x2="44" y2="280" stroke="${INK}" stroke-width="2"/>
    <path d="M 44 22 l -5 10 l 10 0 z" fill="${INK}"/>
    <line x1="44" y1="280" x2="462" y2="280" stroke="${INK}" stroke-width="2"/>`

// ───────────────────────────────────────────────────────────────────────────
// 1 · The bond energy table. Left column: the eleven values the book prints.
//     Right column: extra values this unit's practice and the Bond Ledger task
//     use for fresh reactions. N≡N is tinted — the deck comes back to it.
// ───────────────────────────────────────────────────────────────────────────
const BOND_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 366" class="w-full h-full">
    ${plate(440, 366)}
    <text x="220" y="32" font-family="${FONT}" font-size="16" font-weight="700" fill="${INK}" text-anchor="middle">Bond energies (kJ/mol)</text>
    <text x="118" y="54" font-family="${FONT}" font-size="12" font-weight="700" fill="${LEAD}" text-anchor="middle">In the book</text>
    <text x="322" y="54" font-family="${FONT}" font-size="12" font-weight="700" fill="${LEAD}" text-anchor="middle">Extra values</text>

    <rect x="24" y="64" width="188" height="26" fill="${ROW_A}"/>
    <rect x="24" y="90" width="188" height="26" fill="${ROW_B}"/>
    <rect x="24" y="116" width="188" height="26" fill="${ROW_A}"/>
    <rect x="24" y="142" width="188" height="26" fill="${ROW_B}"/>
    <rect x="24" y="168" width="188" height="26" fill="${ROW_A}"/>
    <rect x="24" y="194" width="188" height="26" fill="${ROW_B}"/>
    <rect x="24" y="220" width="188" height="26" fill="${ROW_A}"/>
    <rect x="24" y="246" width="188" height="26" fill="${ROW_B}"/>
    <rect x="24" y="272" width="188" height="26" fill="${ROW_A}"/>
    <rect x="24" y="298" width="188" height="26" fill="${ROW_B}"/>
    <rect x="24" y="324" width="188" height="26" fill="${COOL_F}"/>
    <rect x="24" y="64" width="188" height="286" rx="4" fill="none" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="40" y="82" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">H–H</text>
    <text x="196" y="82" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">436</text>
    <text x="40" y="108" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">Cl–Cl</text>
    <text x="196" y="108" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">242</text>
    <text x="40" y="134" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">H–Cl</text>
    <text x="196" y="134" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">431</text>
    <text x="40" y="160" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">C–C</text>
    <text x="196" y="160" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">346</text>
    <text x="40" y="186" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">C=C</text>
    <text x="196" y="186" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">612</text>
    <text x="40" y="212" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">C–O</text>
    <text x="196" y="212" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">358</text>
    <text x="40" y="238" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">C–H</text>
    <text x="196" y="238" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">413</text>
    <text x="40" y="264" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">O=O</text>
    <text x="196" y="264" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">498</text>
    <text x="40" y="290" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">O–H</text>
    <text x="196" y="290" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">464</text>
    <text x="40" y="316" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">N–H</text>
    <text x="196" y="316" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">391</text>
    <text x="40" y="342" font-family="${FONT}" font-size="14" font-weight="700" fill="${COOL}">N≡N</text>
    <text x="196" y="342" font-family="${FONT}" font-size="14" font-weight="700" fill="${COOL}" text-anchor="end">946</text>

    <rect x="228" y="64" width="188" height="26" fill="${ROW_A}"/>
    <rect x="228" y="90" width="188" height="26" fill="${ROW_B}"/>
    <rect x="228" y="116" width="188" height="26" fill="${ROW_A}"/>
    <rect x="228" y="142" width="188" height="26" fill="${ROW_B}"/>
    <rect x="228" y="168" width="188" height="26" fill="${ROW_A}"/>
    <rect x="228" y="194" width="188" height="26" fill="${ROW_B}"/>
    <rect x="228" y="220" width="188" height="26" fill="${ROW_A}"/>
    <rect x="228" y="246" width="188" height="26" fill="${ROW_B}"/>
    <rect x="228" y="64" width="188" height="208" rx="4" fill="none" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="244" y="82" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">C=O</text>
    <text x="400" y="82" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">805</text>
    <text x="244" y="108" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">Br–Br</text>
    <text x="400" y="108" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">193</text>
    <text x="244" y="134" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">H–Br</text>
    <text x="400" y="134" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">366</text>
    <text x="244" y="160" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">I–I</text>
    <text x="400" y="160" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">151</text>
    <text x="244" y="186" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">H–I</text>
    <text x="400" y="186" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">298</text>
    <text x="244" y="212" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">N–N</text>
    <text x="400" y="212" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">158</text>
    <text x="244" y="238" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">F–F</text>
    <text x="400" y="238" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">158</text>
    <text x="244" y="264" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}">H–F</text>
    <text x="400" y="264" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">565</text>

    <text x="236" y="300" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}">One number, two jobs:</text>
    <text x="236" y="320" font-family="${FONT}" font-size="12" font-weight="700" fill="${COOL}">break the bond = energy IN</text>
    <text x="236" y="340" font-family="${FONT}" font-size="12" font-weight="700" fill="${WARM}">make the bond = energy OUT</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Worked example 1 written out to show every bond. Bonds that BREAK are
//     blue (energy in); bonds that FORM are red (energy out). The product is
//     drawn as two separate H–Cl molecules, so the 2 in 2HCl is something the
//     student can count rather than a number to remember.
// ───────────────────────────────────────────────────────────────────────────
const SHOW_BONDS_HCL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 214" class="w-full h-full">
    ${plate(460, 214)}
    <text x="230" y="30" font-family="${FONT}" font-size="15" font-weight="700" fill="${INK}" text-anchor="middle">Show every bond as a line</text>

    <text x="40" y="100" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(52, 84, 92, COOL)}
    <text x="96" y="100" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${plus(126, 92)}
    <text x="166" y="100" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">Cl</text>
    ${bond(184, 216, 92, COOL)}
    <text x="234" y="100" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">Cl</text>
    ${yields(264, 310, 92)}

    <text x="338" y="80" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(350, 380, 72, WARM)}
    <text x="398" y="80" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="338" y="122" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(350, 380, 114, WARM)}
    <text x="398" y="122" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">Cl</text>

    <text x="138" y="158" font-family="${FONT}" font-size="14" font-weight="700" fill="${COOL}" text-anchor="middle">bonds broken</text>
    <text x="138" y="178" font-family="${FONT}" font-size="13" fill="${COOL}" text-anchor="middle">1 H–H and 1 Cl–Cl</text>
    <text x="372" y="158" font-family="${FONT}" font-size="14" font-weight="700" fill="${WARM}" text-anchor="middle">bonds made</text>
    <text x="372" y="178" font-family="${FONT}" font-size="13" fill="${WARM}" text-anchor="middle">2 H–Cl</text>
    <text x="230" y="204" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">Each line is one bond.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Worked example 2 written out: two ammonia molecules, each with three N–H
//     bonds, so SIX N–H bonds break. Drawn as two molecules, not "2 ×" one,
//     because forgetting the coefficient is the mistake this picture is for.
// ───────────────────────────────────────────────────────────────────────────
const SHOW_BONDS_NH3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 250" class="w-full h-full">
    ${plate(540, 250)}
    <text x="270" y="30" font-family="${FONT}" font-size="15" font-weight="700" fill="${INK}" text-anchor="middle">Every bond in 2NH₃ → N₂ + 3H₂</text>

    <text x="32" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(42, 64, 97, COOL)}
    <text x="76" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">N</text>
    ${bond(88, 110, 97, COOL)}
    <text x="120" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${vBond(76, 110, 132, COOL)}
    <text x="76" y="154" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>

    <text x="166" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(176, 198, 97, COOL)}
    <text x="210" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">N</text>
    ${bond(222, 244, 97, COOL)}
    <text x="254" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${vBond(210, 110, 132, COOL)}
    <text x="210" y="154" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>

    ${yields(280, 320, 97)}

    <text x="348" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">N</text>
    ${bond(361, 391, 89, WARM, 3)}
    ${bond(361, 391, 97, WARM, 3)}
    ${bond(361, 391, 105, WARM, 3)}
    <text x="404" y="104" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">N</text>
    ${plus(432, 97)}
    <text x="460" y="76" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(470, 498, 69, WARM)}
    <text x="508" y="76" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    <text x="460" y="106" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(470, 498, 99, WARM)}
    <text x="508" y="106" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    <text x="460" y="136" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>
    ${bond(470, 498, 129, WARM)}
    <text x="508" y="136" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">H</text>

    <text x="143" y="190" font-family="${FONT}" font-size="14" font-weight="700" fill="${COOL}" text-anchor="middle">6 N–H bonds broken</text>
    <text x="143" y="210" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">2 molecules × 3 bonds each</text>
    <text x="428" y="190" font-family="${FONT}" font-size="14" font-weight="700" fill="${WARM}" text-anchor="middle">4 bonds made</text>
    <text x="428" y="210" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">1 N≡N and 3 H–H</text>
    <text x="270" y="238" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">The big number in front counts: count every molecule.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · The energy diagram for worked example 1, in the book's style: the
//     reactants level, an UP arrow (energy in, 678 kJ) to the top level where
//     every bond is broken, then a DOWN arrow (energy out, 862 kJ) to the
//     products. The down arrow is longer, so the products end lower:
//     ΔH = −184 kJ. Roughly to scale.
// ───────────────────────────────────────────────────────────────────────────
const LEDGER_EXO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 310" class="w-full h-full">
    ${plate(480, 310)}
    ${energyAxis}
    <text x="-155" y="30" transform="rotate(-90)" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">Energy</text>

    ${level(150, 340, 60)}
    <text x="245" y="30" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">bonds broken</text>
    <text x="245" y="48" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">2H + 2Cl (separate atoms)</text>

    ${level(64, 184, 196)}
    <text x="70" y="218" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}">H₂ + Cl₂</text>
    <line x1="184" y1="196" x2="292" y2="196" stroke="${LEAD}" stroke-width="1.4" stroke-dasharray="5 4"/>

    ${level(300, 440, 232)}
    <line x1="270" y1="232" x2="300" y2="232" stroke="${LEAD}" stroke-width="1.4" stroke-dasharray="5 4"/>
    <text x="440" y="254" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="end">2HCl</text>

    ${vArrow(170, 196, 62, COOL)}
    <text x="160" y="128" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="end">energy in</text>
    <text x="160" y="146" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="end">678 kJ</text>

    ${vArrow(322, 60, 230, WARM)}
    <text x="334" y="128" font-family="${FONT}" font-size="13" font-weight="700" fill="${WARM}">energy out</text>
    <text x="334" y="146" font-family="${FONT}" font-size="13" font-weight="700" fill="${WARM}">862 kJ</text>

    ${vArrow(280, 196, 230, WARM)}
    <text x="272" y="254" font-family="${FONT}" font-size="12" font-weight="700" fill="${WARM}" text-anchor="end">overall: energy out</text>
    <text x="272" y="270" font-family="${FONT}" font-size="12" font-weight="700" fill="${WARM}" text-anchor="end">ΔH = −184 kJ</text>
    <text x="462" y="300" font-family="${FONT}" font-size="11" fill="${LEAD}" text-anchor="end">roughly to scale</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The energy diagram for worked example 2, decomposing ammonia. Energy in
//     (2346 kJ) is bigger than energy out (2254 kJ), so the products end ABOVE
//     the reactants: ΔH = +92 kJ. The 92 kJ gap is drawn larger than scale,
//     or it would be too thin to see — the label says so.
// ───────────────────────────────────────────────────────────────────────────
const LEDGER_ENDO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 310" class="w-full h-full">
    ${plate(480, 310)}
    ${energyAxis}
    <text x="-155" y="30" transform="rotate(-90)" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">Energy</text>

    ${level(150, 340, 60)}
    <text x="245" y="30" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">bonds broken</text>
    <text x="245" y="48" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">2N + 6H (separate atoms)</text>

    ${level(64, 184, 218)}
    <text x="70" y="240" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}">2NH₃</text>
    <line x1="184" y1="218" x2="462" y2="218" stroke="${LEAD}" stroke-width="1.4" stroke-dasharray="5 4"/>

    ${level(300, 440, 186)}
    <line x1="440" y1="186" x2="462" y2="186" stroke="${LEAD}" stroke-width="1.4" stroke-dasharray="5 4"/>
    <text x="440" y="208" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="end">N₂ + 3H₂</text>

    ${vArrow(170, 218, 62, COOL)}
    <text x="160" y="132" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="end">energy in</text>
    <text x="160" y="150" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="end">2346 kJ</text>

    ${vArrow(322, 60, 184, WARM)}
    <text x="334" y="118" font-family="${FONT}" font-size="13" font-weight="700" fill="${WARM}">energy out</text>
    <text x="334" y="136" font-family="${FONT}" font-size="13" font-weight="700" fill="${WARM}">2254 kJ</text>

    ${vArrow(454, 218, 188, COOL)}
    <text x="444" y="250" font-family="${FONT}" font-size="12" font-weight="700" fill="${COOL}" text-anchor="end">overall: energy in</text>
    <text x="444" y="266" font-family="${FONT}" font-size="12" font-weight="700" fill="${COOL}" text-anchor="end">ΔH = +92 kJ</text>
    <text x="232" y="300" font-family="${FONT}" font-size="11" fill="${LEAD}" text-anchor="middle">not to scale: the 92 kJ gap is drawn bigger so you can see it</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Why nitrogen is inert: the N≡N triple bond, and four bond energies as
//     bars. Bars are blue because a bond energy read this way is the energy
//     IN needed to break the bond. Scale: 946 kJ/mol = 300 px.
// ───────────────────────────────────────────────────────────────────────────
const TRIPLE_BOND = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 272" class="w-full h-full">
    ${plate(460, 272)}
    <circle cx="150" cy="60" r="24" fill="${COOL_F}" stroke="${COOL}" stroke-width="2"/>
    <text x="150" y="67" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">N</text>
    <circle cx="250" cy="60" r="24" fill="${COOL_F}" stroke="${COOL}" stroke-width="2"/>
    <text x="250" y="67" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">N</text>
    ${bond(176, 224, 51, INK, 3.5)}
    ${bond(176, 224, 60, INK, 3.5)}
    ${bond(176, 224, 69, INK, 3.5)}
    <text x="292" y="56" font-family="${FONT}" font-size="16" font-weight="700" fill="${INK}">N≡N</text>
    <text x="292" y="76" font-family="${FONT}" font-size="12" fill="${LEAD}">one triple bond</text>

    <text x="24" y="120" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}">Energy to break one mole of each bond (kJ/mol)</text>
    <text x="84" y="149" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="end">Cl–Cl</text>
    <rect x="92" y="134" width="77" height="20" rx="3" fill="${COOL_F}" stroke="${COOL}" stroke-width="1.5"/>
    <text x="177" y="149" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}">242</text>
    <text x="84" y="179" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="end">H–H</text>
    <rect x="92" y="164" width="138" height="20" rx="3" fill="${COOL_F}" stroke="${COOL}" stroke-width="1.5"/>
    <text x="238" y="179" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}">436</text>
    <text x="84" y="209" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="end">O=O</text>
    <rect x="92" y="194" width="158" height="20" rx="3" fill="${COOL_F}" stroke="${COOL}" stroke-width="1.5"/>
    <text x="258" y="209" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}">498</text>
    <text x="84" y="239" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}" text-anchor="end">N≡N</text>
    <rect x="92" y="224" width="300" height="20" rx="3" fill="#93c5fd" stroke="${COOL}" stroke-width="1.5"/>
    <text x="400" y="239" font-family="${FONT}" font-size="13" font-weight="700" fill="${COOL}">946</text>
    <text x="230" y="264" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">N≡N needs almost four times the energy of Cl–Cl.</text>
  </svg>`

export const DIAGRAMS = {
  BOND_TABLE: BOND_TABLE,
  SHOW_BONDS_HCL: SHOW_BONDS_HCL,
  SHOW_BONDS_NH3: SHOW_BONDS_NH3,
  LEDGER_EXO: LEDGER_EXO,
  LEDGER_ENDO: LEDGER_ENDO,
  TRIPLE_BOND: TRIPLE_BOND,
}
