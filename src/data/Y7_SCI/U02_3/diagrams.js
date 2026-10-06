// src/data/Y7_SCI/U02_3/diagrams.js
// Teaching diagrams for 2.3 Explaining Changes of State (Learner's Book
// pp. 41–43), ported from the classroom deck (content/y7-science/U02_3/diagrams.js).
//
// House rules: a white plate first; every <text> written out literally so
// `npm run audit:svg` can measure it (helpers draw shapes only — never a nested
// template with text inside a diagram); `class="lbl"` on anything Label It and
// a hotspot should strip along with the text.
//
//   HEATING_TO_MELTING  solid → expanding → liquid, three panels (p. 42)   ported
//   BOILING             particles escaping from a liquid (p. 43)            ported
//   CONDENSING          gas particles slowing on a cold surface (p. 43)     ported
//   EXPAND_SIZE         bigger gaps, not bigger particles                   new
//   STATE_BOXES         solid · liquid · gas, for squashing and flowing     new
//
// WHAT CHANGED IN THE PORT
//  · The classroom used CONDENSING nowhere; here it carries the condensing
//    slide and a Label It diagram.
//  · The "Key words" swatch under HEATING_TO_MELTING is tagged `lbl`, so it
//    leaves with its text when the labels are stripped.
//  · BOILING and CONDENSING are drawn 40 px taller, with the two caption lines
//    moved down, so Label It has a clear strip for its boxes under the drawing.
//  · EXPAND_SIZE and STATE_BOXES are new: the room said "the particles do not
//    get bigger" and drew the three states on the board; a student alone needs
//    both drawn.

const INK = '#2b2b2b'
const KEY = '#c25e12'
const WARM = '#c8102e'
const COOL = '#1a5fa8'
const GOOD = '#3e7500'

const SOLID_F = '#ded7c6', SOLID_S = '#8a7f68'
const LIQ_F = '#bfe0f2', LIQ_S = '#2f7fb0'
const GAS_F = '#f1f5f9', GAS_S = '#94a3b8'
const PART_F = '#6e8fa8', PART_S = '#3d6580'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const arrowR = (x1, x2, y, c) => `<line x1="${x1}" y1="${y}" x2="${x2 - 11}" y2="${y}" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M ${x2} ${y} l -13 -8 l 0 16 z" fill="${c}"/>`

const part = (cx, cy, r, extra = '') => `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"${extra}/>`

function particleGrid(ox, oy, cols, rows, s, jitter = 0, r = s * 0.38) {
  let out = ''
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = ox + col * s + s / 2 + (jitter ? (Math.sin(col * 7 + row * 13) * jitter) : 0)
      const cy = oy + row * s + s / 2 + (jitter ? (Math.cos(col * 11 + row * 5) * jitter) : 0)
      out += part(cx, cy, r)
    }
  }
  return out
}

// A block of particles resting on a floor: `cols` × `rows`, radius `r`, pitch
// `p`, centred on `cx`, bottom row at `by`. `vib` adds vibration marks.
function block(cx, by, cols, rows, r, p, vib = false) {
  const x0 = cx - ((cols - 1) * p) / 2
  let out = ''
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = x0 + col * p + (vib ? Math.sin(col * 7 + row * 13) * 1.6 : 0)
      const y = by - row * p + (vib ? Math.cos(col * 11 + row * 5) * 1.6 : 0)
      if (vib) out += `<path d="M ${(x - r - 3).toFixed(1)} ${(y - 4).toFixed(1)} q -3.5 4 0 8 M ${(x + r + 3).toFixed(1)} ${(y - 4).toFixed(1)} q 3.5 4 0 8" fill="none" stroke="${KEY}" stroke-width="1.8" stroke-linecap="round"/>`
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${PART_F}" stroke="${PART_S}" stroke-width="2"/>`
    }
  }
  return out
}

// A dashed outline of the cold block's size, so a reader can see what grew.
const ghost = (cx, by, w, h) => `<rect x="${(cx - w / 2).toFixed(1)}" y="${(by - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="6" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>`

// Liquid particles settled on a floor, touching but in no pattern.
function settled(x0, x1, by, r, n) {
  let out = ''
  let placed = 0
  for (let row = 0; placed < n; row++) {
    const y = by - row * r * 1.78
    for (let x = x0 + r + (row % 2 ? r * 0.9 : (row * 3) % 5); x <= x1 - r && placed < n; x += 2 * r + 1.5 + ((placed * 7) % 4)) {
      out += `<circle cx="${x.toFixed(1)}" cy="${(y + ((placed * 5) % 3) - 1).toFixed(1)}" r="${r}" fill="${PART_F}" stroke="${PART_S}" stroke-width="2"/>`
      placed++
    }
  }
  return out
}

// Gas particles at fixed spots, each with a motion streak.
function gasAt(pts, r) {
  return pts.map(([x, y, a]) => {
    const ux = Math.cos(a), uy = Math.sin(a), s0 = r + 3
    return `<path d="M ${(x - ux * s0).toFixed(1)} ${(y - uy * s0).toFixed(1)} L ${(x - ux * (s0 + 16)).toFixed(1)} ${(y - uy * (s0 + 16)).toFixed(1)}" stroke="${GAS_S}" stroke-width="2.4" stroke-linecap="round"/>` +
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${PART_F}" stroke="${PART_S}" stroke-width="2"/>`
  }).join('')
}

export const DIAGRAMS = {
  HEATING_TO_MELTING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 420" class="w-full h-full">
    ${plate(940, 420)}

    <text x="470" y="44" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">What happens to the particles when a solid is heated</text>

    <!-- Panel 1: cold solid -->
    <rect x="30" y="70" width="240" height="230" rx="12" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2"/>
    ${particleGrid(65, 156, 5, 4, 34, 0, 16.5)}
    <text x="150" y="328" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Solid</text>
    <text x="150" y="350" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">fixed pattern, particles</text>
    <text x="150" y="368" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">vibrate on the spot</text>

    <!-- Arrow 1 -->
    ${arrowR(278, 348, 185, WARM)}
    <text x="313" y="168" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">heat energy</text>
    <text x="313" y="184" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">transferred</text>

    <!-- Panel 2: heated solid (expanding) -->
    <rect x="355" y="70" width="240" height="230" rx="12" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2" stroke-dasharray="6 4"/>
    ${particleGrid(375, 128, 5, 4, 40, 3, 16.5)}
    <text x="475" y="328" font-family="${FONT}" font-size="18" font-weight="bold" fill="${WARM}" text-anchor="middle">Expanding</text>
    <text x="475" y="350" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">particles vibrate more,</text>
    <text x="475" y="368" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">take up more space</text>

    <!-- Arrow 2 -->
    ${arrowR(603, 663, 185, WARM)}
    <text x="633" y="168" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">forces</text>
    <text x="633" y="184" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">can't hold</text>

    <!-- Panel 3: liquid (melted) -->
    <rect x="670" y="70" width="240" height="230" rx="12" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2"/>
    ${settled(680, 900, 281, 16.5, 20)}
    <text x="790" y="328" font-family="${FONT}" font-size="18" font-weight="bold" fill="${LIQ_S}" text-anchor="middle">Liquid</text>
    <text x="790" y="350" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">particles slide past</text>
    <text x="790" y="368" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">each other — it melts</text>

    <!-- Key at the bottom -->
    <rect class="lbl" x="220" y="390" width="16" height="12" rx="3" fill="${KEY}"/>
    <text x="244" y="401" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}">Key words: heat energy, transferred, attractive force, expand</text>
  </svg>`,

  // Ported at 640 wide (the classroom drew it 480 wide): the drawing moves 80 px
  // right, leaving a margin each side for Label It's boxes.
  BOILING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" class="w-full h-full">
    ${plate(640, 400)}

    <text x="320" y="36" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Boiling: particles escape as a gas</text>

    <!-- Liquid region at bottom -->
    <rect x="140" y="180" width="360" height="150" rx="10" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="1.5"/>
    ${settled(142, 498, 317, 11, 92)}

    <!-- Escaping gas particles above the surface -->
    ${part(220, 140, 11, ' opacity="0.65"')}
    ${part(300, 100, 11, ' opacity="0.55"')}
    ${part(380, 120, 11, ' opacity="0.6"')}
    ${part(260, 70, 11, ' opacity="0.45"')}
    ${part(420, 80, 11, ' opacity="0.5"')}

    <!-- Upward escape arrows from surface -->
    <line x1="220" y1="172" x2="220" y2="159" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 220 148 l -7 12 l 14 0 z" fill="${KEY}"/>
    <line x1="300" y1="172" x2="300" y2="119" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 300 108 l -7 12 l 14 0 z" fill="${KEY}"/>
    <line x1="380" y1="172" x2="380" y2="139" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 380 128 l -7 12 l 14 0 z" fill="${KEY}"/>

    <!-- Labels -->
    <text x="320" y="360" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">Particles in the liquid move faster and faster.</text>
    <text x="320" y="380" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">Some break the attractive forces and escape as a gas.</text>

    <!-- Surface label -->
    <line x1="135" y1="178" x2="505" y2="178" stroke="${LIQ_S}" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="512" y="183" font-family="${FONT}" font-size="12" font-weight="bold" fill="${LIQ_S}">surface</text>
  </svg>`,

  // Ported at 640 wide, the drawing 80 px right; the cold surface ends at
  // y = 300 so a label box can sit under the slowed particles.
  CONDENSING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" class="w-full h-full">
    ${plate(640, 400)}

    <text x="320" y="36" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Condensing: gas particles slow down</text>

    <!-- Cold surface on the right -->
    <rect x="450" y="50" width="50" height="250" rx="6" fill="#c8d6df" stroke="#8da3b0" stroke-width="2"/>
    <text x="475" y="322" font-family="${FONT}" font-size="13" font-weight="bold" fill="${COOL}" text-anchor="middle">cold</text>
    <text x="475" y="338" font-family="${FONT}" font-size="13" font-weight="bold" fill="${COOL}" text-anchor="middle">surface</text>

    <!-- Scattered gas particles (left side, fast) -->
    ${part(150, 100, 10, ' opacity="0.55"')}
    ${part(210, 180, 10, ' opacity="0.55"')}
    ${part(170, 260, 10, ' opacity="0.55"')}
    ${part(250, 120, 10, ' opacity="0.55"')}
    ${part(230, 300, 10, ' opacity="0.55"')}

    <!-- Arrows pointing right (toward surface) -->
    ${arrowR(160, 220, 100, '#8da3b0')}
    ${arrowR(220, 280, 180, '#8da3b0')}

    <!-- Clustered particles near the cold surface (slowing down) -->
    ${part(400, 140, 10)}
    ${part(420, 165, 10)}
    ${part(395, 190, 10)}
    ${part(425, 210, 10)}
    ${part(400, 235, 10)}
    ${part(420, 260, 10)}
    ${part(405, 285, 10)}

    <!-- Label -->
    <text x="270" y="360" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">Particles hit the cold surface and lose energy.</text>
    <text x="270" y="378" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">They slow down. The forces pull them together.</text>
  </svg>`,

  // New. The misconception drawn: a heated solid's particles do not grow — the
  // gaps do. The dashed outline in panels 2 and 3 is the cold solid's size.
  EXPAND_SIZE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="44" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Heating a solid: bigger gaps, not bigger particles</text>

    <rect x="30" y="76" width="240" height="270" rx="12" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2"/>
    ${block(150, 316, 5, 4, 13, 27)}
    <rect x="300" y="76" width="240" height="270" rx="12" fill="${SOLID_F}" stroke="${GOOD}" stroke-width="3"/>
    ${ghost(420, 329, 134, 107)}
    ${block(420, 314, 5, 4, 13, 33.5, true)}
    <rect x="570" y="76" width="240" height="270" rx="12" fill="${SOLID_F}" stroke="${WARM}" stroke-width="3" stroke-dasharray="8 6"/>
    ${ghost(690, 329, 134, 107)}
    ${block(690, 316, 5, 4, 17, 35)}

    <!-- tick and cross -->
    <circle cx="516" cy="100" r="16" fill="${GOOD}"/>
    <path d="M 508 100 l 6 6 l 11 -12" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="786" cy="100" r="16" fill="${WARM}"/>
    <path d="M 779 93 l 14 14 M 793 93 l -14 14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>

    <text x="150" y="382" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Cold solid</text>
    <text x="150" y="406" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">particles touching,</text>
    <text x="150" y="426" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">vibrating on the spot</text>

    <text x="420" y="382" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GOOD}" text-anchor="middle">Heated solid</text>
    <text x="420" y="406" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">same particles, same size,</text>
    <text x="420" y="426" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">bigger gaps between them</text>

    <text x="690" y="382" font-family="${FONT}" font-size="20" font-weight="bold" fill="${WARM}" text-anchor="middle">Not like this</text>
    <text x="690" y="406" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">the particles do NOT</text>
    <text x="690" y="426" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">get bigger</text>

    <rect class="lbl" x="264" y="477" width="22" height="10" rx="2" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="296" y="487" font-family="${FONT}" font-size="15" fill="${INK}">the dashed line is the size of the cold solid</text>
    <text x="420" y="524" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">Vibrating more, the particles push a little further apart, so the solid expands.</text>
  </svg>`,

  // New. The three states in one picture, for the book's questions 2 and 3:
  // why solids and liquids cannot be compressed, why liquids and gases flow.
  STATE_BOXES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="44" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">The same particles in three states</text>

    <rect x="30" y="70" width="240" height="250" rx="12" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2"/>
    ${block(150, 290, 5, 4, 13, 27)}
    <rect x="300" y="70" width="240" height="250" rx="12" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2"/>
    ${settled(310, 530, 292, 13, 20)}
    <rect x="570" y="70" width="240" height="250" rx="12" fill="${GAS_F}" stroke="${GAS_S}" stroke-width="2"/>
    ${gasAt([[620, 115, 0.4], [730, 105, 2.6], [670, 175, 4.1], [770, 200, 3.3], [605, 240, 5.6], [700, 270, 1.2], [775, 290, 2.2], [640, 300, 0.1]], 13)}

    <text x="150" y="356" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Solid</text>
    <text x="150" y="382" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">touching, in a fixed pattern</text>
    <text x="150" y="406" font-family="${FONT}" font-size="15" font-weight="bold" fill="${WARM}" text-anchor="middle">cannot flow</text>
    <text x="150" y="428" font-family="${FONT}" font-size="15" font-weight="bold" fill="${WARM}" text-anchor="middle">cannot be compressed</text>

    <text x="420" y="356" font-family="${FONT}" font-size="20" font-weight="bold" fill="${LIQ_S}" text-anchor="middle">Liquid</text>
    <text x="420" y="382" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">touching, in no pattern</text>
    <text x="420" y="406" font-family="${FONT}" font-size="15" font-weight="bold" fill="${GOOD}" text-anchor="middle">can flow</text>
    <text x="420" y="428" font-family="${FONT}" font-size="15" font-weight="bold" fill="${WARM}" text-anchor="middle">cannot be compressed</text>

    <text x="690" y="356" font-family="${FONT}" font-size="20" font-weight="bold" fill="#475569" text-anchor="middle">Gas</text>
    <text x="690" y="382" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="middle">far apart, moving freely</text>
    <text x="690" y="406" font-family="${FONT}" font-size="15" font-weight="bold" fill="${GOOD}" text-anchor="middle">can flow</text>
    <text x="690" y="428" font-family="${FONT}" font-size="15" font-weight="bold" fill="${GOOD}" text-anchor="middle">can be compressed</text>

    <text x="420" y="500" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">Touching particles have no space to be squashed into.</text>
  </svg>`,
}

