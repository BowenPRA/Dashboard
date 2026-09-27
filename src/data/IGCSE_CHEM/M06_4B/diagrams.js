// src/data/IGCSE_CHEM/M06_4B/diagrams.js
// Teaching diagrams for 6.4 Making Salts: Titration Calculations (book spread
// 11.8 "Finding concentration by titration"). All AUTHORED, nothing taken from
// the book: the apparatus, the burette scales, the triangle and the particle
// pictures are drawn here so the labels are real <text> the SVG audit can
// measure, and there is no licence to carry.
//
// Colour means something on this track, and it follows universal indicator:
//   acid / H⁺            red           #c8102e
//   alkali / OH⁻         blue-violet   #4338ca
//   neutral / water      green         #2f8f5b
//   spectator ions       grey          #94a3b8
// The liquid in the flask is drawn the colour its INDICATOR shows (methyl
// orange is yellow in an alkali), because that is what the student watches.
//
// House rules (kept from M06_2 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally so the audit can measure it —
//    helpers draw shapes, plus the numbers ON a burette scale, which are part
//    of the drawing (tagged class="keep" so a hotspot keeps them);
//  · leader lines and the eye on BURETTE_METER are class="lbl", so the hotspot
//    that strips its labels does not leave a line pointing at the answer;
//  · charges are Unicode superscripts (⁺ ⁻), never <tspan>;
//  · no gradients, clip paths or markers, so there are no ids to collide.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const ACID = '#c8102e', ACID_F = '#fde2e4'   // acid, H⁺
const ALK = '#4338ca', ALK_F = '#e0e7ff'     // alkali, OH⁻
const NEU = '#2f8f5b', NEU_F = '#dcfce7'     // neutral, water
const SPEC = '#94a3b8', SPEC_F = '#f1f5f9'   // spectator ions
const GLASS = '#7c8a95'
const METAL = '#6b7280'
const ORANGE = '#c25e12', ORANGE_F = '#fff7ed'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const SLATE = '#475569'
const MO_YELLOW = '#fef08a'                  // methyl orange in an alkali

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a part out to its label (class lbl: a hotspot strips it). */
const lead = (x1, y1, x2, y2) => `<g class="lbl"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/></g>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

/** A downward arrow from y1 to y2 at x. */
const arrowD = (x, y1, y2, col) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - 8}" stroke="${col}" stroke-width="2"/>
    <path d="M ${x} ${y2} l -5 -9 l 10 0 z" fill="${col}"/>`

/** One ion or molecule as a disc; its label is written out literally beside the call. */
const disc = (x, y, r, fill, stroke) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

/** A molecule or big ion drawn as a pill; its label is written out beside the call. */
const pill = (x, y, w, fill, stroke) => `<rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>`

const f1 = (n) => Number(n.toFixed(1))

/**
 * A close-up window on a burette: 3 cm³ of scale over 200 px, starting at
 * `from` cm³ at the top (a burette is numbered DOWN the tube). Ticks every
 * 0.1 cm³, longer at every 0.5, numbered at every whole cm³. The acid fills
 * the tube below a meniscus whose BOTTOM sits exactly on `level`.
 */
const buretteWindow = (cx, top, from, level) => {
  const H = 200
  const px = H / 3
  const yL = f1(top + (level - from) * px)
  const wallL = cx - 20
  const wallR = cx + 20
  let ticks = ''
  for (let i = 0; i <= 30; i += 1) {
    const y = f1(top + (i * px) / 10)
    const len = i % 10 === 0 ? 16 : i % 5 === 0 ? 11 : 6
    ticks += `<line x1="${wallL}" y1="${y}" x2="${wallL + len}" y2="${y}" stroke="${INK}" stroke-width="1"/>`
    if (i % 10 === 0) ticks += `<text class="keep" x="${cx - 26}" y="${f1(y + 4)}" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="end">${from + i / 10}</text>`
  }
  return `<path d="M ${wallL + 1} ${f1(yL - 6)} Q ${cx} ${f1(yL + 6)} ${wallR - 1} ${f1(yL - 6)} L ${wallR - 1} ${top + H + 8} L ${wallL + 1} ${top + H + 8} Z" fill="${ACID_F}"/>
    <path d="M ${wallL + 1} ${f1(yL - 6)} Q ${cx} ${f1(yL + 6)} ${wallR - 1} ${f1(yL - 6)}" fill="none" stroke="${ACID}" stroke-width="1.8"/>
    ${ticks}
    <line x1="${wallL}" y1="${top - 8}" x2="${wallL}" y2="${top + H + 8}" stroke="${GLASS}" stroke-width="2.5"/>
    <line x1="${wallR}" y1="${top - 8}" x2="${wallR}" y2="${top + H + 8}" stroke="${GLASS}" stroke-width="2.5"/>`
}

// ───────────────────────────────────────────────────────────────────────────
// 1 · The titration rig: burette of acid in a clamp over a conical flask of
//     alkali + methyl orange on a white tile, and the volumetric pipette that
//     measured the alkali in. Every piece labelled with its job.
// ───────────────────────────────────────────────────────────────────────────
const burTicks = () => {
  let s = ''
  for (let i = 0; i <= 16; i += 1) s += `<line x1="142" y1="${26 + i * 11}" x2="${i % 5 === 0 ? 150 : 147}" y2="${26 + i * 11}" stroke="${INK}" stroke-width="0.9"/>`
  return s
}

const TITRATION_RIG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360" class="w-full h-full">
    ${plate(540, 360)}
    <rect x="20" y="330" width="80" height="10" rx="2" fill="#cbd5e1" stroke="${GLASS}" stroke-width="1.2"/>
    <line x1="45" y1="18" x2="45" y2="330" stroke="${METAL}" stroke-width="5" stroke-linecap="round"/>
    <line x1="45" y1="80" x2="140" y2="80" stroke="${METAL}" stroke-width="4"/>
    <rect x="136" y="72" width="28" height="16" rx="3" fill="none" stroke="${METAL}" stroke-width="2"/>

    <rect x="143" y="44" width="14" height="166" fill="${ACID_F}"/>
    <path d="M 143 44 Q 150 49 157 44" fill="none" stroke="${ACID}" stroke-width="1.5"/>
    ${burTicks()}
    <rect x="142" y="18" width="16" height="192" rx="2" fill="none" stroke="${GLASS}" stroke-width="2"/>
    <rect x="145" y="210" width="10" height="14" fill="#e2e8f0" stroke="${GLASS}" stroke-width="1.5"/>
    <rect x="132" y="214" width="36" height="6" rx="2" fill="${METAL}"/>
    <path d="M 146 224 L 148.5 246 L 151.5 246 L 154 224 Z" fill="#e2e8f0" stroke="${GLASS}" stroke-width="1.5"/>
    <circle cx="150" cy="254" r="3" fill="${ACID_F}" stroke="${ACID}" stroke-width="1.2"/>

    <path d="M 126.7 300 L 173.3 300 L 188 322 L 112 322 Z" fill="${MO_YELLOW}"/>
    <path d="M 140 262 L 140 280 L 112 322 L 188 322 L 160 280 L 160 262" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="96" y="322" width="108" height="8" rx="1" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4"/>

    ${lead(158, 60, 210, 56)}
    <text x="214" y="60" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">burette</text>
    <text x="214" y="76" font-family="${FONT}" font-size="11" fill="${MUTED}">acid, added a drop at a time</text>
    ${lead(168, 217, 210, 217)}
    <text x="214" y="221" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">tap</text>
    <text x="214" y="237" font-family="${FONT}" font-size="11" fill="${MUTED}">controls the flow</text>
    ${lead(176, 296, 210, 280)}
    <text x="214" y="278" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">conical flask</text>
    <text x="214" y="294" font-family="${FONT}" font-size="11" fill="${MUTED}">alkali + methyl orange</text>
    ${lead(202, 326, 210, 326)}
    <text x="214" y="330" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">white tile</text>
    <text x="214" y="346" font-family="${FONT}" font-size="11" fill="${MUTED}">makes the colour easy to see</text>

    <text x="470" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">volumetric</text>
    <text x="470" y="46" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">pipette</text>
    <rect x="468" y="92" width="4" height="40" fill="${ALK_F}"/>
    <ellipse cx="470" cy="162" rx="15" ry="34" fill="${ALK_F}" stroke="${GLASS}" stroke-width="2"/>
    <path d="M 467 196 L 467 262 L 469 274 L 471 274 L 473 262 L 473 196 Z" fill="${ALK_F}" stroke="${GLASS}" stroke-width="1.5"/>
    <path d="M 467 56 L 467 129 M 473 56 L 473 129" stroke="${GLASS}" stroke-width="1.5"/>
    <line x1="460" y1="90" x2="480" y2="90" stroke="${INK}" stroke-width="1.8"/>
    ${lead(460, 90, 444, 90)}
    <text x="440" y="94" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">fill to the line</text>
    <text x="470" y="300" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">measures exactly</text>
    <text x="470" y="316" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ALK}" text-anchor="middle">25.0 cm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Reading the burette: the book's worked example, drawn fresh. Before:
//     the meniscus sits at 1.0 cm³. After: at 28.8 cm³. Volume used 27.8 cm³.
// ───────────────────────────────────────────────────────────────────────────
const BURETTE_READINGS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 320" class="w-full h-full">
    ${plate(460, 320)}
    <text x="120" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">At the start</text>
    <text x="340" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">At the end-point</text>
    ${buretteWindow(120, 50, 0, 1.0)}
    ${buretteWindow(340, 50, 27, 28.8)}

    ${lead(120, 116.7, 168, 116.7)}
    <text x="172" y="113" font-family="${FONT}" font-size="11" fill="${MUTED}">read the bottom</text>
    <text x="172" y="127" font-family="${FONT}" font-size="11" fill="${MUTED}">of the meniscus</text>
    ${lead(340, 170, 388, 170)}
    <text x="392" y="174" font-family="${FONT}" font-size="11" fill="${MUTED}">read here</text>

    <text x="230" y="170" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">numbers</text>
    <text x="230" y="183" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">go up as</text>
    <text x="230" y="196" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">you go down</text>
    ${arrowD(230, 204, 250, MUTED)}

    <text x="120" y="276" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">initial reading: 1.0 cm³</text>
    <text x="340" y="276" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">final reading: 28.8 cm³</text>
    <text x="230" y="304" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">volume of acid used = 28.8 − 1.0 = 27.8 cm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · The meniscus, close up — the Notes hotspot. The bottom of the curve sits
//     on 15.1 cm³; the liquid climbs the glass at the edges to about 14.9.
//     Everything that would give the answer away (the eye, its level line,
//     the leaders, every label) is stripped when the hotspot draws it.
// ───────────────────────────────────────────────────────────────────────────
const meterTicks = () => {
  let s = ''
  for (let i = 0; i <= 20; i += 1) {
    const y = 30 + i * 12
    const len = i % 10 === 0 ? 30 : i % 5 === 0 ? 20 : 12
    s += `<line x1="160" y1="${y}" x2="${160 + len}" y2="${y}" stroke="${INK}" stroke-width="${i % 10 === 0 ? 1.6 : 1.1}"/>`
  }
  return s
}

const BURETTE_METER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" class="w-full h-full">
    ${plate(420, 300)}
    <path d="M 161 138 Q 210 186 259 138 L 259 290 L 161 290 Z" fill="${ACID_F}"/>
    <path d="M 161 138 Q 210 186 259 138" fill="none" stroke="${ACID}" stroke-width="2.2"/>
    ${meterTicks()}
    <line x1="160" y1="10" x2="160" y2="290" stroke="${GLASS}" stroke-width="3"/>
    <line x1="260" y1="10" x2="260" y2="290" stroke="${GLASS}" stroke-width="3"/>
    <text class="keep" x="152" y="35" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="end">14</text>
    <text class="keep" x="152" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="end">15</text>
    <text class="keep" x="152" y="275" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="end">16</text>

    <g class="lbl">
      <ellipse cx="62" cy="162" rx="18" ry="10" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
      <circle cx="68" cy="162" r="5" fill="${INK}"/>
      <line x1="84" y1="162" x2="156" y2="162" stroke="${MUTED}" stroke-width="1.4" stroke-dasharray="5 4"/>
    </g>
    <text x="62" y="196" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">eye level</text>
    <text x="62" y="212" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">with the curve</text>

    ${lead(256, 139, 286, 126)}
    <text x="290" y="122" font-family="${FONT}" font-size="11" fill="${MUTED}">the liquid curves</text>
    <text x="290" y="137" font-family="${FONT}" font-size="11" fill="${MUTED}">up at the glass</text>
    ${lead(214, 164, 286, 190)}
    <text x="290" y="194" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}">read here:</text>
    <text x="290" y="210" font-family="${FONT}" font-size="11" fill="${INK}">the bottom of</text>
    <text x="290" y="225" font-family="${FONT}" font-size="11" fill="${INK}">the meniscus</text>
    <text x="290" y="256" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">15.1 cm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Changing cm³ into dm³: a 10 cm cube is 1 dm³ = 1000 cm³, so divide by
//     1000. The strip uses the book's own worked-example volumes.
// ───────────────────────────────────────────────────────────────────────────
const convRow = (y) => `${arrowR(310, 370, y - 5, TEAL)}
    <text x="340" y="${y - 14}" font-family="${FONT}" font-size="11" font-weight="bold" fill="${TEAL}" text-anchor="middle">÷ 1000</text>`

const CONVERSION_STRIP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" class="w-full h-full">
    ${plate(500, 240)}
    <text x="250" y="28" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Changing cm³ into dm³</text>

    <path d="M 30 80 L 55 55 L 155 55 L 130 80 Z" fill="${ALK_F}" stroke="${ALK}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M 130 80 L 155 55 L 155 155 L 130 180 Z" fill="#c7d2fe" stroke="${ALK}" stroke-width="1.8" stroke-linejoin="round"/>
    <rect x="30" y="80" width="100" height="100" fill="#eef2ff" stroke="${ALK}" stroke-width="1.8"/>
    <text x="80" y="136" font-family="${FONT}" font-size="16" font-weight="bold" fill="${ALK}" text-anchor="middle">1 dm³</text>
    <text x="80" y="198" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">10 cm</text>
    <text x="162" y="124" font-family="${FONT}" font-size="11" fill="${MUTED}">10 cm</text>
    <text x="90" y="224" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">1 dm³ = 1000 cm³</text>

    <text x="300" y="80" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="end">1000 cm³</text>
    ${convRow(80)}
    <text x="380" y="80" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}">1 dm³</text>
    <text x="300" y="130" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="end">25 cm³</text>
    ${convRow(130)}
    <text x="380" y="130" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}">0.025 dm³</text>
    <text x="300" y="180" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="end">27.8 cm³</text>
    ${convRow(180)}
    <text x="380" y="180" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}">0.0278 dm³</text>
    <text x="355" y="222" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">move the decimal point 3 places left</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The calculation triangle: moles on top, concentration × volume below.
//     Cover the one you want; what is left is how to work it out.
// ───────────────────────────────────────────────────────────────────────────
const CALC_TRIANGLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 260" class="w-full h-full">
    ${plate(470, 260)}
    <path d="M 160 20 L 300 236 L 20 236 Z" fill="${ORANGE_F}" stroke="${ORANGE}" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="82.2" y1="140" x2="237.8" y2="140" stroke="${ORANGE}" stroke-width="2"/>
    <line x1="160" y1="140" x2="160" y2="236" stroke="${ORANGE}" stroke-width="2"/>
    <text x="160" y="98" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">number of</text>
    <text x="160" y="118" font-family="${FONT}" font-size="15" font-weight="bold" fill="${ORANGE}" text-anchor="middle">moles</text>
    <text x="110" y="182" font-family="${FONT}" font-size="11" font-weight="bold" fill="${TEAL}" text-anchor="middle">concentration</text>
    <text x="110" y="200" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">(mol/dm³)</text>
    <text x="208" y="182" font-family="${FONT}" font-size="11" font-weight="bold" fill="${PURPLE}" text-anchor="middle">volume</text>
    <text x="208" y="200" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">(dm³)</text>
    <circle cx="160" cy="219" r="9" fill="#ffffff" stroke="${ORANGE}" stroke-width="1.5"/>
    <text x="160" y="223.5" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">×</text>

    <text x="322" y="50" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ORANGE}">Cover moles:</text>
    <text x="322" y="68" font-family="${FONT}" font-size="11" fill="${INK}">concentration × volume</text>
    <text x="322" y="110" font-family="${FONT}" font-size="12" font-weight="bold" fill="${TEAL}">Cover concentration:</text>
    <text x="322" y="128" font-family="${FONT}" font-size="11" fill="${INK}">moles ÷ volume</text>
    <text x="322" y="170" font-family="${FONT}" font-size="12" font-weight="bold" fill="${PURPLE}">Cover volume:</text>
    <text x="322" y="188" font-family="${FONT}" font-size="11" fill="${INK}">moles ÷ concentration</text>
    <text x="322" y="232" font-family="${FONT}" font-size="11" font-weight="bold" fill="${ACID}">volume always in dm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · The method as a ladder: the two jobs before the calculation, then the
//     book's four steps — the same words the Titration Bench task uses.
// ───────────────────────────────────────────────────────────────────────────
const rung = (y, badgeFill) => `<rect x="10" y="${y}" width="460" height="44" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
    <rect x="18" y="${y + 8}" width="64" height="28" rx="8" fill="${badgeFill}"/>`

const FOUR_STEPS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 350" class="w-full h-full">
    ${plate(480, 350)}
    <text x="240" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The same order, every time</text>

    ${rung(36, SLATE)}
    <text x="50" y="62" font-family="${FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Before</text>
    <text x="94" y="63" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Read the burette</text>
    <text x="460" y="63" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">final − initial</text>

    ${rung(88, SLATE)}
    <text x="50" y="114" font-family="${FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Before</text>
    <text x="94" y="115" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Change cm³ to dm³</text>
    <text x="460" y="115" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">÷ 1000</text>

    ${rung(140, ORANGE)}
    <text x="50" y="166" font-family="${FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Step 1</text>
    <text x="94" y="167" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Moles of the solution you know</text>
    <text x="460" y="167" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">concentration × volume</text>

    ${rung(192, ORANGE)}
    <text x="50" y="218" font-family="${FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Step 2</text>
    <text x="94" y="219" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">The ratio from the equation</text>
    <text x="460" y="219" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">the big numbers</text>

    ${rung(244, ORANGE)}
    <text x="50" y="270" font-family="${FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Step 3</text>
    <text x="94" y="271" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Moles of the other solution</text>
    <text x="460" y="271" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">use the ratio</text>

    ${rung(296, ORANGE)}
    <text x="50" y="322" font-family="${FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Step 4</text>
    <text x="94" y="323" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Its concentration</text>
    <text x="460" y="323" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">moles ÷ volume in dm³</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · The ratio, as particles: each Na₂CO₃ needs two HCl. Then the book's
//     numbers for steps 2 and 3.
// ───────────────────────────────────────────────────────────────────────────
const ratioGroup = (cx) => `<line x1="${cx - 44}" y1="104" x2="${cx - 22}" y2="116" stroke="${MUTED}" stroke-width="1.6"/>
    <line x1="${cx + 44}" y1="104" x2="${cx + 22}" y2="116" stroke="${MUTED}" stroke-width="1.6"/>
    ${disc(cx - 62, 100, 18, ACID_F, ACID)}
    ${disc(cx + 62, 100, 18, ACID_F, ACID)}
    ${disc(cx, 124, 26, ALK_F, ALK)}`

const RATIO_PICTURE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" class="w-full h-full">
    ${plate(480, 270)}
    <text x="70" y="32" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ACID}" text-anchor="middle">2HCl(aq)</text>
    <text x="130" y="32" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="200" y="32" font-family="${FONT}" font-size="13" font-weight="bold" fill="${ALK}" text-anchor="middle">Na₂CO₃(aq)</text>
    <text x="264" y="32" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">→</text>
    <text x="284" y="32" font-family="${FONT}" font-size="12" fill="${INK}">2NaCl(aq) + H₂O(l) + CO₂(g)</text>
    <text x="70" y="52" font-family="${FONT}" font-size="11" fill="${ACID}" text-anchor="middle">2 moles</text>
    <text x="200" y="52" font-family="${FONT}" font-size="11" fill="${ALK}" text-anchor="middle">1 mole</text>

    ${ratioGroup(130)}
    <text x="68" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">HCl</text>
    <text x="192" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">HCl</text>
    <text x="130" y="128" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">Na₂CO₃</text>
    ${ratioGroup(350)}
    <text x="288" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">HCl</text>
    <text x="412" y="104" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">HCl</text>
    <text x="350" y="128" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">Na₂CO₃</text>
    <text x="240" y="176" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">each Na₂CO₃ needs two HCl</text>

    <rect x="60" y="192" width="360" height="62" rx="12" fill="${ORANGE_F}" stroke="${ORANGE}" stroke-width="1.6"/>
    <text x="240" y="216" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Step 2: the ratio is 2 HCl : 1 Na₂CO₃</text>
    <text x="240" y="240" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Step 3: 0.025 mol Na₂CO₃ × 2 = 0.05 mol HCl</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · Why a weak acid still reacts completely (Extended). Ethanoic acid is
//     mostly molecules; OH⁻ removes each H⁺ as water; more molecules then
//     dissociate, until every one has reacted.
// ───────────────────────────────────────────────────────────────────────────
const WEAK_ACID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 270" class="w-full h-full">
    ${plate(540, 270)}
    <text x="90" y="28" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ACID}" text-anchor="middle">ethanoic acid</text>
    ${pill(20, 46, 68, '#fff5f6', ACID)}<text x="54" y="61" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${pill(96, 46, 68, '#fff5f6', ACID)}<text x="130" y="61" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${pill(20, 82, 68, '#fff5f6', ACID)}<text x="54" y="97" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${pill(96, 82, 68, '#fff5f6', ACID)}<text x="130" y="97" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${pill(20, 118, 68, '#fff5f6', ACID)}<text x="54" y="133" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${disc(118, 160, 12, ACID_F, ACID)}<text x="118" y="164" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${pill(20, 149, 72, SPEC_F, SPEC)}<text x="56" y="164" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    <text x="90" y="214" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">only a few molecules have</text>
    <text x="90" y="230" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">dissociated into ions</text>

    ${arrowR(172, 196, 110, INK)}

    <text x="270" y="28" font-family="${FONT}" font-size="12" font-weight="bold" fill="${ALK}" text-anchor="middle">alkali added</text>
    ${pill(200, 46, 68, '#fff5f6', ACID)}<text x="234" y="61" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${pill(276, 46, 68, '#fff5f6', ACID)}<text x="310" y="61" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${pill(200, 82, 68, '#fff5f6', ACID)}<text x="234" y="97" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">CH₃COOH</text>
    ${disc(300, 94, 12, ACID_F, ACID)}<text x="300" y="98" font-family="${FONT}" font-size="10" font-weight="bold" fill="${ACID}" text-anchor="middle">H⁺</text>
    ${disc(330, 94, 12, ALK_F, ALK)}<text x="330" y="98" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">OH⁻</text>
    ${pill(200, 118, 72, SPEC_F, SPEC)}<text x="236" y="133" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    ${pill(200, 149, 72, SPEC_F, SPEC)}<text x="236" y="164" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    ${disc(302, 140, 14, NEU_F, NEU)}<text x="302" y="143" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    ${disc(302, 172, 12, SPEC_F, SPEC)}<text x="302" y="176" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    <text x="270" y="214" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">OH⁻ turns each H⁺ into water,</text>
    <text x="270" y="230" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">so more molecules dissociate</text>

    ${arrowR(352, 376, 110, INK)}

    <text x="455" y="28" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NEU}" text-anchor="middle">at the end-point</text>
    ${pill(384, 46, 72, SPEC_F, SPEC)}<text x="420" y="61" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    ${pill(384, 82, 72, SPEC_F, SPEC)}<text x="420" y="97" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    ${pill(384, 118, 72, SPEC_F, SPEC)}<text x="420" y="133" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    ${pill(384, 154, 72, SPEC_F, SPEC)}<text x="420" y="169" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">CH₃COO⁻</text>
    ${disc(490, 57, 14, NEU_F, NEU)}<text x="490" y="60" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    ${disc(490, 93, 14, NEU_F, NEU)}<text x="490" y="96" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    ${disc(490, 129, 14, NEU_F, NEU)}<text x="490" y="132" font-family="${FONT}" font-size="9" font-weight="bold" fill="${NEU}" text-anchor="middle">H₂O</text>
    ${disc(490, 165, 12, SPEC_F, SPEC)}<text x="490" y="169" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MUTED}" text-anchor="middle">Na⁺</text>
    <text x="455" y="214" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">every molecule has</text>
    <text x="455" y="230" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">now reacted</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · Source Analysis: two burette readings with FRESH numbers and no value
//     printed — the student reads the scales. Start 4.2 cm³, end 22.6 cm³.
// ───────────────────────────────────────────────────────────────────────────
const SA_READINGS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300" class="w-full h-full">
    ${plate(460, 300)}
    <text x="120" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">At the start</text>
    <text x="340" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">At the end-point</text>
    ${buretteWindow(120, 50, 3, 4.2)}
    ${buretteWindow(340, 50, 21, 22.6)}
    <text x="120" y="278" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">initial reading</text>
    <text x="340" y="278" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">final reading</text>
    <text x="230" y="140" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">each small</text>
    <text x="230" y="153" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">mark is</text>
    <text x="230" y="166" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">0.1 cm³</text>
  </svg>`

export const DIAGRAMS = {
  TITRATION_RIG: TITRATION_RIG,
  BURETTE_READINGS: BURETTE_READINGS,
  BURETTE_METER: BURETTE_METER,
  CONVERSION_STRIP: CONVERSION_STRIP,
  CALC_TRIANGLE: CALC_TRIANGLE,
  FOUR_STEPS: FOUR_STEPS,
  RATIO_PICTURE: RATIO_PICTURE,
  WEAK_ACID: WEAK_ACID,
  SA_READINGS: SA_READINGS,
}
