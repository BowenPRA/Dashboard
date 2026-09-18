// src/data/Y7_SCI/U02_6/diagrams.js
// Drawn teaching diagrams for 2.6 Compounds and formulae (Learner's Book
// pp. 57–63), copied from the classroom lesson (y7-science/U02_6/diagrams.js).
// The diagrams that embed a PHOTOGRAPH live in diagramsB.js: they need
// assetUrl, which reads import.meta.env, and this file has to stay importable
// by plain node so `node scripts/svg-coords.mjs Y7_SCI/U02_6 <KEY>` can place
// the Label It pins.
//
// House rules: a white plate first; every <text> written out literally so
// `npm run audit:svg` can measure it (helpers draw shapes only); `split`
// diagrams 840×560, `showcase` strips 1120×440. Atom colours match Science
// 2.5 and utils/particles.js: carbon grey, oxygen red, hydrogen white, sodium
// purple, chlorine green, gold yellow.
//
//   ELEMENT_COMPOUND  gold atoms against sodium and chlorine atoms bonded   (Label It)
//   NEW_PROPERTIES    sodium, chlorine and salt compared
//   NAME_RULE         metal first; the non-metal ends in -ide
//   PREFIXES          carbon monoxide and carbon dioxide (p. 60)             (Label It)
//   PARTICLES         CO₂, H₂O, O₂, CH₄ (p. 60)                              (Label It)
//   FORMULA_READ      H₂O, read symbol by symbol (p. 61)
//
// Dropped from the classroom file: the four hand-vote cards (ANS_*) — the
// votes are `predict` activities here.

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const GREEN = '#4a8b23';
const RED = '#c8102e';

const METAL_F = '#fbe7a1', METAL_S = '#b8912a';
const NON_F = '#cfe5f5', NON_S = '#4f8fbf';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const ATOM = {
  C: ['#aab4bc', '#3b444b'],
  O: ['#f08b82', '#b3261e'],
  H: ['#ffffff', '#6b7580'],
  Na: ['#d9c7ef', '#5c2483'],
  Cl: ['#bfe3b5', '#2e7d32'],
  Au: ['#f4cf45', '#9a7400'],
};
const atom = (cx, cy, r, k) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${ATOM[k][0]}" stroke="${ATOM[k][1]}" stroke-width="3"/>`;

const tick = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="26" fill="${GREEN}"/>
    <path d="M ${cx - 13} ${cy + 1} l 9 9 l 17 -20" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
const cross = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="26" fill="${RED}"/>
    <path d="M ${cx - 10} ${cy - 10} l 20 20 M ${cx + 10} ${cy - 10} l -20 20" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>`;

// Sodium chloride: a 4 × 4 grid, sodium and chlorine alternating, bonded.
function saltGrid(x0, y0, step) {
  let bonds = '';
  let atoms = '';
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      const x = x0 + i * step, y = y0 + j * step;
      if (i < 3) bonds += `<line x1="${x}" y1="${y}" x2="${x + step}" y2="${y}" stroke="#8a979e" stroke-width="5"/>`;
      if (j < 3) bonds += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + step}" stroke="#8a979e" stroke-width="5"/>`;
      atoms += (i + j) % 2 === 0 ? atom(x, y, 22, 'Na') : atom(x, y, 27, 'Cl');
    }
  }
  return bonds + atoms;
}

function goldGrid(x0, y0, r) {
  let out = '';
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      const x = x0 + i * 2 * r, y = y0 + j * 2 * r;
      out += atom(x, y, r, 'Au') +
        `<text class="keep" x="${x}" y="${y + 6}" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Au</text>`;
    }
  }
  return out;
}

export const DIAGRAMS = {
  ELEMENT_COMPOUND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="384" height="512" rx="16" fill="#fffbef" stroke="#e0c46a" stroke-width="2.5"/>
    <text x="216" y="82" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="middle">Element</text>
    ${goldGrid(126, 150, 30)}
    <text x="216" y="448" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">one kind of atom</text>
    <text x="216" y="490" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">gold</text>

    <rect x="432" y="24" width="384" height="512" rx="16" fill="#f4faf4" stroke="#9cc79c" stroke-width="2.5"/>
    <text x="624" y="82" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">Compound</text>
    ${saltGrid(534, 150, 60)}
    <text class="keep" x="534" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text class="keep" x="594" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="654" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text class="keep" x="714" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="534" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="594" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text class="keep" x="654" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="714" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text class="keep" x="534" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text class="keep" x="594" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="654" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text class="keep" x="714" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="534" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="594" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text class="keep" x="654" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text class="keep" x="714" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="624" y="448" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">different kinds of atom,</text>
    <text x="624" y="482" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">bonded together</text>
    <text x="624" y="518" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">sodium chloride</text>
  </svg>`,

  NEW_PROPERTIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <!-- header -->
    <rect x="214" y="24" width="200" height="100" fill="${METAL_F}" stroke="${METAL_S}" stroke-width="2"/>
    <rect x="414" y="24" width="200" height="100" fill="${NON_F}" stroke="${NON_S}" stroke-width="2"/>
    <rect x="614" y="24" width="202" height="100" fill="#fdf1e3" stroke="${KEY}" stroke-width="3"/>
    <text x="314" y="86" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="514" y="86" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="715" y="68" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">sodium</text>
    <text x="715" y="102" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">chloride</text>

    <!-- row: looks like -->
    <rect x="24" y="124" width="190" height="130" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="214" y="124" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="414" y="124" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="614" y="124" width="202" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="119" y="198" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">looks like</text>
    <text x="314" y="198" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">shiny metal</text>
    <text x="514" y="198" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">yellow-green gas</text>
    <text x="715" y="198" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">white crystals</text>

    <!-- row: safe to eat -->
    <rect x="24" y="254" width="190" height="130" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="214" y="254" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="414" y="254" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="614" y="254" width="202" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="119" y="328" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">safe to eat?</text>
    ${cross(314, 319)}
    ${cross(514, 319)}
    ${tick(715, 319)}

    <!-- row: element or compound -->
    <rect x="24" y="384" width="190" height="152" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="214" y="384" width="200" height="152" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="414" y="384" width="200" height="152" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="614" y="384" width="202" height="152" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="119" y="452" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">element or</text>
    <text x="119" y="482" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">compound?</text>
    <text x="314" y="469" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">element</text>
    <text x="514" y="469" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">element</text>
    <text x="715" y="469" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">compound</text>
  </svg>`,

  NAME_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u26-name-head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
    </defs>

    <rect x="120" y="30" width="250" height="84" rx="14" fill="${METAL_F}" stroke="${METAL_S}" stroke-width="3"/>
    <text x="245" y="85" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="420" y="88" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <rect x="470" y="30" width="250" height="84" rx="14" fill="${NON_F}" stroke="${NON_S}" stroke-width="3"/>
    <text x="595" y="85" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="245" y="150" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">metal</text>
    <text x="595" y="150" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">non-metal</text>

    <line x1="420" y1="168" x2="420" y2="206" stroke="${INK}" stroke-width="5" marker-end="url(#u26-name-head)"/>

    <text x="512" y="272" font-family="${FONT}" font-size="62" font-weight="bold" fill="${INK}" text-anchor="end">sodium chlor</text>
    <text x="512" y="272" font-family="${FONT}" font-size="62" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
    <text x="250" y="316" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">metal first</text>
    <text x="560" y="316" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">new ending</text>

    <rect x="24" y="346" width="792" height="190" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="360" y="400" font-family="${FONT}" font-size="38" fill="${INK}" text-anchor="end">oxygen</text>
    <text x="420" y="400" font-family="${FONT}" font-size="38" fill="${MUTED}" text-anchor="middle">→</text>
    <text x="560" y="400" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">ox</text>
    <text x="560" y="400" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
    <text x="360" y="456" font-family="${FONT}" font-size="38" fill="${INK}" text-anchor="end">sulfur</text>
    <text x="420" y="456" font-family="${FONT}" font-size="38" fill="${MUTED}" text-anchor="middle">→</text>
    <text x="560" y="456" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">sulf</text>
    <text x="560" y="456" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
    <text x="360" y="512" font-family="${FONT}" font-size="38" fill="${INK}" text-anchor="end">chlorine</text>
    <text x="420" y="512" font-family="${FONT}" font-size="38" fill="${MUTED}" text-anchor="middle">→</text>
    <text x="560" y="512" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">chlor</text>
    <text x="560" y="512" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
  </svg>`,

  PREFIXES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="246" rx="16" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${atom(128, 147, 46, 'C')}${atom(214, 147, 46, 'O')}
    <text class="keep" x="128" y="158" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text class="keep" x="214" y="158" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="320" y="118" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">carbon monoxide</text>
    <text x="320" y="180" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="start">mono = one oxygen</text>
    <text x="320" y="232" font-family="${FONT}" font-size="32" fill="${MUTED}" text-anchor="start">CO</text>

    <rect x="24" y="290" width="792" height="246" rx="16" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${atom(84, 413, 40, 'O')}${atom(160, 413, 40, 'C')}${atom(236, 413, 40, 'O')}
    <text class="keep" x="84" y="423" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text class="keep" x="160" y="423" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text class="keep" x="236" y="423" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="320" y="384" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">carbon dioxide</text>
    <text x="320" y="446" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="start">di = two oxygens</text>
    <text x="320" y="498" font-family="${FONT}" font-size="32" fill="${MUTED}" text-anchor="start">CO₂</text>
  </svg>`,

  PARTICLES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="260" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(68, 166, 42, 'O')}${atom(232, 166, 42, 'O')}${atom(150, 166, 42, 'C')}
    <text class="keep" x="68" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text class="keep" x="150" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text class="keep" x="232" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="150" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">carbon dioxide</text>
    <text x="150" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">CO₂</text>

    <rect x="300" y="16" width="260" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(370, 194, 34, 'H')}${atom(490, 194, 34, 'H')}${atom(430, 150, 46, 'O')}
    <text class="keep" x="370" y="204" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text class="keep" x="430" y="161" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text class="keep" x="490" y="204" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="430" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">water</text>
    <text x="430" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">H₂O</text>

    <rect x="580" y="16" width="260" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(666, 166, 46, 'O')}${atom(754, 166, 46, 'O')}
    <text class="keep" x="666" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text class="keep" x="754" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="710" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">oxygen</text>
    <text x="710" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">O₂</text>

    <rect x="860" y="16" width="240" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(930, 116, 32, 'H')}${atom(1030, 116, 32, 'H')}${atom(930, 216, 32, 'H')}${atom(1030, 216, 32, 'H')}${atom(980, 166, 44, 'C')}
    <text class="keep" x="930" y="125" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text class="keep" x="1030" y="125" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text class="keep" x="930" y="225" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text class="keep" x="1030" y="225" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text class="keep" x="980" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="980" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">methane</text>
    <text x="980" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">CH₄</text>
  </svg>`,

  FORMULA_READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text class="keep" x="300" y="262" font-family="${FONT}" font-size="170" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="392" y="306" font-family="${FONT}" font-size="100" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text class="keep" x="500" y="262" font-family="${FONT}" font-size="170" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>

    <line x1="196" y1="108" x2="258" y2="140" stroke="${KEY}" stroke-width="3"/><circle cx="258" cy="140" r="6" fill="${KEY}"/>
    <text x="150" y="92" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">H = hydrogen</text>
    <line x1="626" y1="108" x2="540" y2="140" stroke="${KEY}" stroke-width="3"/><circle cx="540" cy="140" r="6" fill="${KEY}"/>
    <text x="668" y="92" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">O = oxygen</text>

    <line x1="392" y1="322" x2="330" y2="364" stroke="${KEY}" stroke-width="3"/><circle cx="392" cy="322" r="6" fill="${KEY}"/>
    <text x="300" y="398" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">small 2 = two hydrogen atoms</text>
    <line x1="560" y1="282" x2="600" y2="424" stroke="${KEY}" stroke-width="3"/><circle cx="560" cy="282" r="6" fill="${KEY}"/>
    <text x="580" y="458" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">no number = one oxygen atom</text>

    <text x="420" y="526" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Careful: C is carbon. Ca is calcium.</text>
  </svg>`,
};
