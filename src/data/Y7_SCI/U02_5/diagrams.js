// src/data/Y7_SCI/U02_5/diagrams.js
// Drawn diagrams for 2.5 Atoms, Elements and the Periodic Table. No photos and
// no imports, so `node scripts/svg-coords.mjs Y7_SCI/U02_5 <KEY>` can load this
// file in plain Node (the photo panels, which need assetUrl, are in
// diagramsB.js).
//
//   1. PARTICLE_BOXES — three boxes of particles: the starter hotspot (tap the solid)
//   2. JOINING        — neon, gold, oxygen, sulfur: how atoms join (p.53). Label It.
//   3. TWO_MEANINGS   — table / period / group: everyday English vs science
//   4. SYMBOL_WAYS    — the three ways a symbol is made: O, He, Na (p.54)
//   5. PT_MAP         — the first 20 as coloured tiles, a group and a period
//                       outlined, hydrogen floating. Label It.
//   6. SIZE_LADDER    — the halving milestones, cube to one atom. Label It.
//
// JOINING, TWO_MEANINGS and SYMBOL_WAYS are the classroom deck's drawings,
// unchanged. Label <text> is written out literally so `npm run audit:svg` can
// measure it; the helpers below draw shapes only.

const INK = '#2b2b2b';
const KEY = '#c25e12';
const PURPLE = '#5c2483';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';

const METAL_F = '#fbe7a1', METAL_S = '#b8912a';
const NON_F = '#cfe5f5', NON_S = '#4f8fbf';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const atom = (cx, cy, r, fill, stroke) =>
  `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

// A packed block of atoms, top-left corner (x0, y0).
function atomBlock(x0, y0, cols, rows, r, fill, stroke) {
  let out = '';
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) out += atom(x0 + r + i * 2 * r, y0 + r + j * 2 * r, r, fill, stroke);
  return out;
}

// Eight atoms in a ring.
function atomRing(cx, cy, R, r, fill, stroke) {
  let out = '';
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
    out += atom(cx + R * Math.cos(a), cy + R * Math.sin(a), r, fill, stroke);
  }
  return out;
}

// A small arrow showing which way a free particle is moving.
const moveArrow = (x1, y1, x2, y2) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - 11 * Math.cos(a), hy = y2 - 11 * Math.sin(a);
  const px = 6 * Math.sin(a), py = -6 * Math.cos(a);
  return `<line x1="${x1}" y1="${y1}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${MUTED}" stroke-width="3" stroke-linecap="round"/>
    <path d="M ${x2} ${y2} L ${(hx + px).toFixed(1)} ${(hy + py).toFixed(1)} L ${(hx - px).toFixed(1)} ${(hy - py).toFixed(1)} Z" fill="${MUTED}"/>`;
};

// A mini grid of cells, with one row or column filled in.
function miniGrid(x0, y0, mark) {
  let out = '';
  const s = 22;
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 6; i++) {
      const on = (mark === 'row' && j === 1) || (mark === 'col' && i === 2);
      out += `<rect x="${x0 + i * s}" y="${y0 + j * s}" width="${s}" height="${s}" fill="${on ? KEY : '#ffffff'}" stroke="${on ? '#8a4209' : '#8a979e'}" stroke-width="1.5"/>`;
    }
  }
  return out;
}

// ── PARTICLE_BOXES helpers ───────────────────────────────────────────────────
const P_FILL = '#9ec5e8', P_STROKE = '#2f6f9f';
const particles = (list) => list.map(([x, y]) => atom(x, y, 17, P_FILL, P_STROKE)).join('');
// Box 1, a liquid: touching, in no rows, filling the bottom of the box.
const LIQUID = [
  [50, 250], [87, 250], [123, 250], [161, 250], [197, 250], [234, 250],
  [66, 217], [104, 217], [140, 217], [178, 217], [216, 217], [250, 217],
  [48, 184], [86, 184], [130, 184], [166, 184], [206, 184], [242, 184],
  [70, 153], [114, 153], [190, 153], [228, 153],
];
// Box 2, a gas: far apart.
const GAS = [[385, 78], [505, 70], [452, 150], [362, 222], [528, 205], [430, 246]];

// ── PT_MAP helpers ───────────────────────────────────────────────────────────
// Tiles 64 × 58. Groups 1–2 at x 60 and 124, ten narrow blanks from 188, groups
// 3–8 from 348; periods 1–4 at y 78, 136, 194, 252. Hydrogen floats at x 236.
const tile = (x, y, metal) =>
  `<rect x="${x}" y="${y}" width="64" height="58" fill="${metal ? METAL_F : NON_F}" stroke="${metal ? METAL_S : NON_S}" stroke-width="2"/>`;
const TILES = [
  [236, 78, 0], [668, 78, 0],
  [60, 136, 1], [124, 136, 1], [348, 136, 0], [412, 136, 0], [476, 136, 0], [540, 136, 0], [604, 136, 0], [668, 136, 0],
  [60, 194, 1], [124, 194, 1], [348, 194, 1], [412, 194, 0], [476, 194, 0], [540, 194, 0], [604, 194, 0], [668, 194, 0],
  [60, 252, 1], [124, 252, 1],
];
const ptBlanks = () =>
  Array.from({ length: 10 }, (_, k) => `<rect x="${188 + k * 16}" y="252" width="16" height="58" fill="#ffffff" stroke="#b9c3c9" stroke-width="1.5"/>`).join('') +
  [348, 412, 476, 540, 604, 668].map((x) => `<rect x="${x}" y="252" width="64" height="58" fill="#ffffff" stroke="#b9c3c9" stroke-width="1.5"/>`).join('');

// ── SIZE_LADDER helpers ──────────────────────────────────────────────────────
const panel = (x) => `<rect x="${x}" y="24" width="150" height="236" rx="12" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>`;
function virus(cx, cy) {
  let out = `<circle cx="${cx}" cy="${cy}" r="18" fill="#f3b6c4" stroke="#b3264f" stroke-width="3"/>`;
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    const x1 = cx + 18 * Math.cos(a), y1 = cy + 18 * Math.sin(a);
    const x2 = cx + 28 * Math.cos(a), y2 = cy + 28 * Math.sin(a);
    out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#b3264f" stroke-width="3"/>`;
    out += `<circle cx="${(cx + 31 * Math.cos(a)).toFixed(1)}" cy="${(cy + 31 * Math.sin(a)).toFixed(1)}" r="4" fill="#b3264f"/>`;
  }
  return out;
}

export const DIAGRAMS = {
  PARTICLE_BOXES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" class="w-full h-full">
    ${plate(900, 340)}

    <rect x="30" y="30" width="240" height="240" rx="12" fill="#ffffff" stroke="#8a979e" stroke-width="3"/>
    ${particles(LIQUID)}

    <rect x="330" y="30" width="240" height="240" rx="12" fill="#ffffff" stroke="#8a979e" stroke-width="3"/>
    ${particles(GAS)}
    ${moveArrow(403, 86, 436, 102)}
    ${moveArrow(521, 80, 548, 104)}
    ${moveArrow(436, 160, 408, 180)}
    ${moveArrow(372, 206, 390, 178)}
    ${moveArrow(540, 220, 556, 248)}
    ${moveArrow(448, 246, 482, 240)}

    <rect x="630" y="30" width="240" height="240" rx="12" fill="#ffffff" stroke="#8a979e" stroke-width="3"/>
    ${atomBlock(631, 65, 7, 6, 17, P_FILL, P_STROKE)}

    <text x="150" y="314" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Box 1</text>
    <text x="450" y="314" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Box 2</text>
    <text x="750" y="314" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Box 3</text>
  </svg>`,

  JOINING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <!-- Panel 1: neon, atoms alone -->
    <rect x="30" y="24" width="245" height="300" rx="14" fill="#f4faf4" stroke="#9cc79c" stroke-width="2"/>
    ${atom(90, 90, 21, '#8fd18f', '#2e7d32')}
    ${atom(205, 120, 21, '#8fd18f', '#2e7d32')}
    ${atom(115, 215, 21, '#8fd18f', '#2e7d32')}
    ${atom(220, 262, 21, '#8fd18f', '#2e7d32')}
    ${moveArrow(114, 72, 150, 52)}
    ${moveArrow(230, 138, 256, 168)}
    ${moveArrow(92, 234, 60, 262)}
    ${moveArrow(196, 244, 170, 214)}
    <text x="152" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Atoms of neon</text>
    <text x="152" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">move around alone</text>

    <!-- Panel 2: gold, packed closely -->
    <rect x="305" y="24" width="245" height="300" rx="14" fill="#fffbef" stroke="#e0c46a" stroke-width="2"/>
    ${atomBlock(327.5, 74, 5, 5, 20, '#f4cf45', '#9a7400')}
    <text x="427" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Atoms of gold</text>
    <text x="427" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">packed closely</text>

    <!-- Panel 3: oxygen, pairs -->
    <rect x="580" y="24" width="245" height="300" rx="14" fill="#fff5f4" stroke="#e5a39d" stroke-width="2"/>
    ${atom(635, 92, 21, '#f08b82', '#b3261e')}${atom(673, 92, 21, '#f08b82', '#b3261e')}
    ${atom(735, 168, 21, '#f08b82', '#b3261e')}${atom(762, 195, 21, '#f08b82', '#b3261e')}
    ${atom(640, 258, 21, '#f08b82', '#b3261e')}${atom(668, 284, 21, '#f08b82', '#b3261e')}
    <text x="702" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Particles of oxygen</text>
    <text x="702" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">2 atoms joined</text>

    <!-- Panel 4: sulfur, a ring of eight -->
    <rect x="855" y="24" width="245" height="300" rx="14" fill="#fdfbe8" stroke="#d6c95a" stroke-width="2"/>
    ${atomRing(977, 174, 54, 21, '#efe04a', '#8a7c00')}
    <text x="977" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">A particle of sulfur</text>
    <text x="977" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">8 atoms in a ring</text>
  </svg>`,

  TWO_MEANINGS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <text x="500" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">EVERYDAY ENGLISH</text>
    <text x="870" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">IN THE PERIODIC TABLE</text>

    <!-- Row 1: table -->
    <rect x="20" y="66" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="142" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">table</text>
    <rect x="330" y="104" width="96" height="12" rx="3" fill="#b98a5a" stroke="#6d4c2e" stroke-width="2"/>
    <rect x="340" y="116" width="10" height="44" fill="#6d4c2e"/>
    <rect x="406" y="116" width="10" height="44" fill="#6d4c2e"/>
    <text x="450" y="140" font-family="${FONT}" font-size="26" fill="${INK}">a desk</text>
    ${miniGrid(720, 84, 'none')}
    <text x="866" y="140" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">a chart</text>

    <!-- Row 2: period -->
    <rect x="20" y="206" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="282" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">period</text>
    <circle cx="378" cy="268" r="36" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
    <line x1="378" y1="268" x2="378" y2="244" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <line x1="378" y1="268" x2="396" y2="276" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <text x="450" y="280" font-family="${FONT}" font-size="26" fill="${INK}">one lesson</text>
    ${miniGrid(720, 224, 'row')}
    <text x="866" y="280" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">a row →</text>

    <!-- Row 3: group -->
    <rect x="20" y="346" width="1080" height="112" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="416" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">group</text>
    <circle cx="344" cy="378" r="12" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M 326 434 Q 344 396 362 434 Z" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <circle cx="378" cy="372" r="12" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M 360 434 Q 378 390 396 434 Z" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <circle cx="412" cy="378" r="12" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M 394 434 Q 412 396 430 434 Z" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <text x="450" y="414" font-family="${FONT}" font-size="26" fill="${INK}">people together</text>
    ${miniGrid(720, 358, 'col')}
    <text x="866" y="414" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">a column ↓</text>
  </svg>`,

  SYMBOL_WAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 560" class="w-full h-full">
    ${plate(660, 560)}

    <!-- Way 1: first letter -->
    <rect x="36" y="34" width="130" height="130" rx="12" fill="${NON_F}" stroke="${NON_S}" stroke-width="3"/>
    <text x="101" y="122" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <path d="M 186 99 l 24 -14 l 0 28 z" fill="${KEY}"/>
    <line x1="208" y1="99" x2="236" y2="99" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="62" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">O</text>
    <rect x="308" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="332" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">x</text>
    <rect x="360" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">y</text>
    <rect x="412" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">g</text>
    <rect x="464" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">e</text>
    <rect x="516" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">n</text>
    <text x="256" y="152" font-family="${FONT}" font-size="22" fill="${MUTED}">the first letter</text>

    <!-- Way 2: first letter + another letter -->
    <rect x="36" y="214" width="130" height="130" rx="12" fill="${NON_F}" stroke="${NON_S}" stroke-width="3"/>
    <text x="101" y="302" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">He</text>
    <path d="M 186 279 l 24 -14 l 0 28 z" fill="${KEY}"/>
    <line x1="208" y1="279" x2="236" y2="279" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="242" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">H</text>
    <rect x="308" y="242" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="332" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">e</text>
    <rect x="360" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">l</text>
    <rect x="412" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">i</text>
    <rect x="464" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">u</text>
    <rect x="516" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
    <text x="256" y="332" font-family="${FONT}" font-size="22" fill="${MUTED}">the first letter + another letter</text>

    <!-- Way 3: another language -->
    <rect x="36" y="394" width="130" height="130" rx="12" fill="${METAL_F}" stroke="${METAL_S}" stroke-width="3"/>
    <text x="101" y="482" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <path d="M 186 459 l 24 -14 l 0 28 z" fill="${KEY}"/>
    <line x1="208" y1="459" x2="236" y2="459" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="422" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <rect x="308" y="422" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="332" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
    <rect x="360" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">t</text>
    <rect x="412" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">r</text>
    <rect x="464" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">i</text>
    <rect x="516" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">u</text>
    <rect x="568" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="592" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
    <text x="256" y="512" font-family="${FONT}" font-size="22" fill="${MUTED}">its old Latin name: natrium</text>
  </svg>`,

  PT_MAP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" class="w-full h-full">
    ${plate(900, 400)}

    ${ptBlanks()}
    ${TILES.map(([x, y, m]) => tile(x, y, m)).join('')}

    <text x="268" y="116" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="700" y="116" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">He</text>
    <text x="92" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Li</text>
    <text x="156" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Be</text>
    <text x="380" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="444" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="508" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">N</text>
    <text x="572" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="636" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">F</text>
    <text x="700" y="174" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Ne</text>
    <text x="92" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="156" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Mg</text>
    <text x="380" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Al</text>
    <text x="444" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Si</text>
    <text x="508" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">P</text>
    <text x="572" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
    <text x="636" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="700" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Ar</text>
    <text x="92" y="290" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
    <text x="156" y="290" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Ca</text>

    <!-- group 1 (a column) and period 3 (a row), outlined -->
    <rect x="53" y="129" width="78" height="188" rx="10" fill="none" stroke="${KEY}" stroke-width="5"/>
    <rect x="53" y="187" width="686" height="72" rx="10" fill="none" stroke="${PURPLE}" stroke-width="5" stroke-dasharray="14 8"/>

    <!-- leader lines: each ends on the part it names -->
    <line x1="92" y1="52" x2="92" y2="126" stroke="${KEY}" stroke-width="3"/>
    <line x1="336" y1="44" x2="298" y2="90" stroke="${INK}" stroke-width="3"/>
    <line x1="760" y1="116" x2="716" y2="160" stroke="${NON_S}" stroke-width="3"/>
    <line x1="764" y1="223" x2="741" y2="223" stroke="${PURPLE}" stroke-width="3"/>
    <line x1="156" y1="350" x2="156" y2="298" stroke="${METAL_S}" stroke-width="3"/>

    <text x="92" y="44" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">A group</text>
    <text x="342" y="44" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}">Hydrogen: in no group</text>
    <text x="766" y="122" font-family="${FONT}" font-size="22" font-weight="bold" fill="#2f6f9f">Non-metals</text>
    <text x="770" y="231" font-family="${FONT}" font-size="22" font-weight="bold" fill="${PURPLE}">A period</text>
    <text x="156" y="374" font-family="${FONT}" font-size="22" font-weight="bold" fill="#8a6a12" text-anchor="middle">Metals</text>
    <text x="540" y="374" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">The first 20 elements</text>
  </svg>`,

  SIZE_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 350" class="w-full h-full">
    ${plate(1000, 350)}

    ${panel(20)}${panel(182)}${panel(344)}${panel(506)}${panel(668)}${panel(830)}

    <!-- 1: a 1 cm gold cube -->
    <path d="M 47 106 L 71 84 L 167 84 L 143 106 Z" fill="#f9e08a" stroke="#9a7400" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 143 106 L 167 84 L 167 180 L 143 202 Z" fill="#d9ad1f" stroke="#9a7400" stroke-width="3" stroke-linejoin="round"/>
    <rect x="47" y="106" width="96" height="96" fill="#f4cf45" stroke="#9a7400" stroke-width="3"/>

    <!-- 2: a grain of sand -->
    <path d="M 227 132 L 243 110 L 270 106 L 289 124 L 291 150 L 277 172 L 248 176 L 229 158 Z" fill="#e3c48f" stroke="#9c7a3c" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="250" cy="134" r="3" fill="#9c7a3c"/>
    <circle cx="272" cy="152" r="2.5" fill="#9c7a3c"/>

    <!-- 3: a hair -->
    <path d="M 364 226 C 400 186, 424 122, 476 64" fill="none" stroke="#5a3a1e" stroke-width="7" stroke-linecap="round"/>

    <!-- 4: a cell -->
    <circle cx="581" cy="142" r="32" fill="#dff3e4" stroke="#3a8a4f" stroke-width="3"/>
    <circle cx="592" cy="134" r="10" fill="#7fbf8f" stroke="#2e6b3e" stroke-width="2"/>

    <!-- 5: a virus -->
    ${virus(743, 142)}

    <!-- 6: one gold atom -->
    <circle cx="905" cy="142" r="16" fill="none" stroke="#d4a017" stroke-width="2" stroke-dasharray="4 4"/>
    <circle cx="905" cy="142" r="5" fill="#f4cf45" stroke="#9a7400" stroke-width="2"/>

    <text x="95" y="296" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">gold cube</text>
    <text x="95" y="326" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">1 cm · 0 cuts</text>
    <text x="257" y="296" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">sand grain</text>
    <text x="257" y="326" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">3 cuts</text>
    <text x="419" y="296" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">hair</text>
    <text x="419" y="326" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">7 cuts</text>
    <text x="581" y="296" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">cell</text>
    <text x="581" y="326" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">9 cuts</text>
    <text x="743" y="296" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">virus</text>
    <text x="743" y="326" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">17 cuts</text>
    <text x="905" y="296" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">one atom</text>
    <text x="905" y="326" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">25 cuts</text>
  </svg>`,
};
