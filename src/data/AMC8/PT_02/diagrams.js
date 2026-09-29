// src/data/AMC8/PT_02/diagrams.js
// Teaching diagrams for the PT_02 deck.
//
// House rules (docs/svg-diagrams.md):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — the helpers draw shapes only,
//    because `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · monospace for anything mathematical, sans-serif for labels;
//  · every marker id is prefixed `pt02-`, because inline SVGs share one document;
//  · every number printed here is a FRESH number: none of them comes from the
//    practice test this deck sits in front of.
//
//   FACTOR_PAIRS       24 as 1 × 24, 2 × 12, 3 × 8, 4 × 6 in unit squares — stop at the middle
//   SQUARE_IN_CIRCLE   a square in a circle of radius 3: diagonal 6, square 18, circle 9π
//   GRID_WALK          P(1,1) to Q(6,4) on a 7 by 5 street grid: two shortest routes, 8 blocks each
//   PAIR_UP            1 to 10 folded into five pairs that each make 11: 5 × 11 = 55

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const CARD = '#f8fafc';
const BLUE = '#3b82f6';
const BLUE_PALE = '#dbeafe';
const RED = '#ef4444';
const GREEN = '#10b981';
const GREEN_PALE = '#d1fae5';
const AMBER = '#d97706';
const AMBER_PALE = '#fef3c7';

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#ffffff"/>
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="15" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

// A rows-by-cols block of unit squares (side U), top-left corner at (x, y). Shapes only.
const U = 18;
const tiles = (x, y, rows, cols, stroke, fill) => {
  let d = '';
  for (let c = 1; c < cols; c++) d += `M ${x + c * U} ${y} v ${rows * U} `;
  for (let r = 1; r < rows; r++) d += `M ${x} ${y + r * U} h ${cols * U} `;
  return `<rect x="${x}" y="${y}" width="${cols * U}" height="${rows * U}" fill="${fill}"/>
    <path d="${d.trim()}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-opacity="0.6"/>
    <rect x="${x}" y="${y}" width="${cols * U}" height="${rows * U}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`;
};

export const DIAGRAMS = {
  FACTOR_PAIRS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <defs>
      <marker id="pt02-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${GREEN}"/>
      </marker>
    </defs>
    <text x="300" y="44" font-family="sans-serif" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Factor pairs of 24</text>
    ${tiles(134, 70, 1, 24, BLUE, BLUE_PALE)}
    ${tiles(134, 124, 2, 12, BLUE, BLUE_PALE)}
    ${tiles(134, 196, 3, 8, BLUE, BLUE_PALE)}
    ${tiles(134, 286, 4, 6, GREEN, GREEN_PALE)}
    <text x="118" y="87" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="end">1 × 24</text>
    <text x="118" y="150" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="end">2 × 12</text>
    <text x="118" y="231" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="end">3 × 8</text>
    <text x="118" y="330" font-family="monospace" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="end">4 × 6</text>
    <line x1="284" y1="322" x2="254" y2="322" stroke="${GREEN}" stroke-width="3" stroke-linecap="round" marker-end="url(#pt02-arrow-green)"/>
    <rect x="290" y="282" width="280" height="80" rx="14" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <text x="430" y="314" font-family="sans-serif" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">stop when the pair</text>
    <text x="430" y="344" font-family="sans-serif" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">meets in the middle</text>
  </svg>`,

  SQUARE_IN_CIRCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <circle cx="185" cy="210" r="150" fill="${AMBER_PALE}" stroke="${AMBER}" stroke-width="4"/>
    <path d="M 185 60 L 335 210 L 185 360 L 35 210 Z" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="3" stroke-linejoin="round"/>
    <line x1="35" y1="210" x2="335" y2="210" stroke="${BLUE}" stroke-width="6" stroke-linecap="round"/>
    <line x1="185" y1="210" x2="291" y2="316" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="185" cy="210" r="6" fill="${INK}"/>
    <text x="185" y="194" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">diagonal = 6</text>
    <text x="195" y="292" font-family="monospace" font-size="26" font-weight="bold" fill="${RED}" text-anchor="middle">r = 3</text>
    <rect x="366" y="84" width="216" height="252" rx="14" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <text x="474" y="122" font-family="sans-serif" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">square</text>
    <text x="474" y="158" font-family="monospace" font-size="24" fill="${INK}" text-anchor="middle">6 × 6 ÷ 2</text>
    <text x="474" y="198" font-family="monospace" font-size="32" font-weight="bold" fill="${BLUE}" text-anchor="middle">= 18</text>
    <line x1="386" y1="218" x2="562" y2="218" stroke="${LINE}" stroke-width="2"/>
    <text x="474" y="250" font-family="sans-serif" font-size="20" font-weight="bold" fill="${AMBER}" text-anchor="middle">circle</text>
    <text x="474" y="286" font-family="monospace" font-size="24" fill="${INK}" text-anchor="middle">π × 3²</text>
    <text x="474" y="324" font-family="monospace" font-size="32" font-weight="bold" fill="${AMBER}" text-anchor="middle">= 9π</text>
  </svg>`,

  GRID_WALK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <path d="M 104 28 V 308 M 160 28 V 308 M 216 28 V 308 M 272 28 V 308 M 328 28 V 308 M 384 28 V 308 M 440 28 V 308 M 496 28 V 308 M 104 28 H 496 M 104 84 H 496 M 104 140 H 496 M 104 196 H 496 M 104 252 H 496 M 104 308 H 496" fill="none" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 160 252 H 440 V 84" fill="none" stroke="${BLUE}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 160 252 V 196 H 272 V 140 H 384 V 84 H 440" fill="none" stroke="${GREEN}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="160" cy="252" r="20" fill="${INK}"/>
    <circle cx="440" cy="84" r="20" fill="${INK}"/>
    <text x="160" y="260" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">P</text>
    <text x="440" y="92" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">Q</text>
    <text x="300" y="290" font-family="monospace" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">5</text>
    <text x="468" y="177" font-family="monospace" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">3</text>
    <text x="300" y="352" font-family="monospace" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">5 across + 3 up = 8 blocks</text>
    <text x="300" y="384" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">every shortest route is 8 blocks</text>
  </svg>`,

  PAIR_UP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <text x="300" y="36" font-family="monospace" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">1 + 2 + … + 10</text>
    <text x="66" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="118" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="170" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="222" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="274" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="326" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="378" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="430" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="482" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
    <text x="534" y="90" font-family="monospace" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
    <path d="M 66 102 A 234 220 0 0 0 534 102 M 118 102 A 182 176 0 0 0 482 102 M 170 102 A 130 132 0 0 0 430 102 M 222 102 A 78 88 0 0 0 378 102 M 274 102 A 26 44 0 0 0 326 102" fill="none" stroke="${BLUE}" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="276" y="130" width="48" height="32" rx="16" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="276" y="174" width="48" height="32" rx="16" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="276" y="218" width="48" height="32" rx="16" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="276" y="262" width="48" height="32" rx="16" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="276" y="306" width="48" height="32" rx="16" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="300" y="154" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">11</text>
    <text x="300" y="198" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">11</text>
    <text x="300" y="242" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">11</text>
    <text x="300" y="286" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">11</text>
    <text x="300" y="330" font-family="monospace" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">11</text>
    <text x="300" y="380" font-family="monospace" font-size="32" font-weight="bold" fill="${GREEN}" text-anchor="middle">5 pairs × 11 = 55</text>
  </svg>`,
};
