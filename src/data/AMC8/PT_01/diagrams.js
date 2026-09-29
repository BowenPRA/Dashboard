// src/data/AMC8/PT_01/diagrams.js
// Teaching diagrams for the PT_01 "Test-Day Toolkit" deck.
//
// House rules (docs/svg-diagrams.md):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — the helper draws shapes only,
//    because `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · monospace for anything mathematical, sans-serif for labels;
//  · every marker id is prefixed `pt01-`, because inline SVGs share one document;
//  · every number printed here is a FRESH number: none of them comes from the
//    practice test this deck sits in front of.
//
//   AREA_SUBTRACT   a 12 by 9 frame with an 8 by 5 hole: 108 − 40 = 68
//   RATIO_PARTS     the bar model for 3 : 5 — eight equal parts
//   TREE_LIST       the tree for the 3-digit numbers made from 1, 2, 3
//   OVERLAP_MIN     14 and 11 inside 20: pushed apart, 5 still overlap
//   GRID_TRIANGLE   P(1,1) Q(6,1) R(9,5): base 5, height 4, area 10
//
// The 2026-09-29 streamline cut four one-problem tricks from the deck (rings
// and sectors, a line across a grid, the 45°-45°-90° triangle, thin strips);
// their diagrams went with them and are in git history (618a36df).

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
const PURPLE = '#a855f7';

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#ffffff"/>
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="15" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

export const DIAGRAMS = {
  AREA_SUBTRACT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <text x="220" y="38" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">frame = whole − hole</text>
    <rect x="40" y="70" width="360" height="270" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="4"/>
    <rect x="100" y="130" width="240" height="150" fill="#ffffff" stroke="${INK}" stroke-width="3" stroke-dasharray="10 7"/>
    <text x="220" y="204" font-family="monospace" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">8 by 5</text>
    <text x="220" y="236" font-family="sans-serif" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">the hole</text>
    <text x="220" y="374" font-family="monospace" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">12</text>
    <text x="410" y="214" font-family="monospace" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="start">9</text>
    <rect x="436" y="100" width="154" height="210" rx="14" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <text x="513" y="142" font-family="monospace" font-size="17" fill="${BLUE}" text-anchor="middle">12 × 9 = 108</text>
    <text x="513" y="180" font-family="monospace" font-size="17" fill="${INK}" text-anchor="middle">8 × 5 = 40</text>
    <line x1="456" y1="200" x2="570" y2="200" stroke="${LINE}" stroke-width="2"/>
    <text x="513" y="238" font-family="monospace" font-size="19" fill="${INK}" text-anchor="middle">108 − 40</text>
    <text x="513" y="284" font-family="monospace" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">= 68</text>
  </svg>`,

  RATIO_PARTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <text x="300" y="58" font-family="monospace" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">apples : oranges = 3 : 5</text>
    <text x="150" y="120" font-family="sans-serif" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">3 parts</text>
    <text x="390" y="120" font-family="sans-serif" font-size="20" font-weight="bold" fill="${AMBER}" text-anchor="middle">5 parts</text>
    <path d="M 60 146 h 60 v 70 h -60 Z M 120 146 h 60 v 70 h -60 Z M 180 146 h 60 v 70 h -60 Z" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 240 146 h 60 v 70 h -60 Z M 300 146 h 60 v 70 h -60 Z M 360 146 h 60 v 70 h -60 Z M 420 146 h 60 v 70 h -60 Z M 480 146 h 60 v 70 h -60 Z" fill="${AMBER_PALE}" stroke="${AMBER}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 60 236 v 12 h 480 v -12" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="300" y="282" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">8 equal parts in total</text>
    <text x="300" y="344" font-family="monospace" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">total = 8, 16, 24, 32, …</text>
  </svg>`,

  TREE_LIST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <text x="150" y="34" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">1st digit</text>
    <text x="300" y="34" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">2nd digit</text>
    <text x="430" y="34" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">3rd digit</text>
    <text x="540" y="34" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">number</text>
    <circle cx="50" cy="205" r="7" fill="${INK}"/>
    <path d="M 50 205 L 134 95 M 50 205 L 134 205 M 50 205 L 134 315" fill="none" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 166 95 L 284 68 M 166 95 L 284 122 M 166 205 L 284 178 M 166 205 L 284 232 M 166 315 L 284 288 M 166 315 L 284 342" fill="none" stroke="${AMBER}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 316 68 L 414 68 M 316 122 L 414 122 M 316 178 L 414 178 M 316 232 L 414 232 M 316 288 L 414 288 M 316 342 L 414 342" fill="none" stroke="${PURPLE}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 450 68 L 504 68 M 450 122 L 504 122 M 450 178 L 504 178 M 450 232 L 504 232 M 450 288 L 504 288 M 450 342 L 504 342" fill="none" stroke="${LINE}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 6"/>
    <text x="150" y="104" font-family="monospace" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">1</text>
    <text x="150" y="214" font-family="monospace" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">2</text>
    <text x="150" y="324" font-family="monospace" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">3</text>
    <text x="300" y="76" font-family="monospace" font-size="24" font-weight="bold" fill="${AMBER}" text-anchor="middle">2</text>
    <text x="300" y="130" font-family="monospace" font-size="24" font-weight="bold" fill="${AMBER}" text-anchor="middle">3</text>
    <text x="300" y="186" font-family="monospace" font-size="24" font-weight="bold" fill="${AMBER}" text-anchor="middle">1</text>
    <text x="300" y="240" font-family="monospace" font-size="24" font-weight="bold" fill="${AMBER}" text-anchor="middle">3</text>
    <text x="300" y="296" font-family="monospace" font-size="24" font-weight="bold" fill="${AMBER}" text-anchor="middle">1</text>
    <text x="300" y="350" font-family="monospace" font-size="24" font-weight="bold" fill="${AMBER}" text-anchor="middle">2</text>
    <text x="430" y="76" font-family="monospace" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">3</text>
    <text x="430" y="130" font-family="monospace" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">2</text>
    <text x="430" y="186" font-family="monospace" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">3</text>
    <text x="430" y="240" font-family="monospace" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">1</text>
    <text x="430" y="296" font-family="monospace" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">2</text>
    <text x="430" y="350" font-family="monospace" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">1</text>
    <text x="540" y="76" font-family="monospace" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">123</text>
    <text x="540" y="130" font-family="monospace" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">132</text>
    <text x="540" y="186" font-family="monospace" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">213</text>
    <text x="540" y="240" font-family="monospace" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">231</text>
    <text x="540" y="296" font-family="monospace" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">312</text>
    <text x="540" y="350" font-family="monospace" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">321</text>
    <text x="300" y="388" font-family="monospace" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">3 × 2 × 1 = 6 numbers</text>
  </svg>`,

  OVERLAP_MIN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <text x="300" y="40" font-family="sans-serif" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Push the two groups apart</text>
    <path d="M 275 130 h 125 v 190 h -125 Z" fill="${GREEN_PALE}"/>
    <rect x="50" y="70" width="500" height="44" rx="8" fill="${CARD}" stroke="${INK}" stroke-width="3"/>
    <text x="300" y="100" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">20 students</text>
    <rect x="50" y="150" width="350" height="44" rx="8" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="3"/>
    <text x="162" y="179" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">14 play soccer</text>
    <rect x="275" y="230" width="275" height="44" rx="8" fill="${AMBER_PALE}" stroke="${AMBER}" stroke-width="3"/>
    <text x="474" y="259" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">11 play chess</text>
    <line x1="275" y1="122" x2="275" y2="326" stroke="${GREEN}" stroke-width="3" stroke-dasharray="8 6"/>
    <line x1="400" y1="122" x2="400" y2="326" stroke="${GREEN}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="337" y="310" font-family="sans-serif" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">5 do both</text>
    <text x="300" y="368" font-family="monospace" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">14 + 11 − 20 = 5</text>
  </svg>`,

  GRID_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full drop-shadow-md">
    ${plate(600, 400)}
    <text x="300" y="32" font-family="monospace" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">area = ½ × 5 × 4 = 10</text>
    <path d="M 60 50 V 350 M 110 50 V 350 M 160 50 V 350 M 210 50 V 350 M 260 50 V 350 M 310 50 V 350 M 360 50 V 350 M 410 50 V 350 M 460 50 V 350 M 510 50 V 350 M 560 50 V 350 M 60 50 H 560 M 60 100 H 560 M 60 150 H 560 M 60 200 H 560 M 60 250 H 560 M 60 300 H 560 M 60 350 H 560" fill="none" stroke="${LINE}" stroke-width="1.5"/>
    <path d="M 60 50 V 350 H 560" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 110 300 L 360 300 L 510 100 Z" fill="${BLUE_PALE}" fill-opacity="0.85" stroke="${BLUE}" stroke-width="4" stroke-linejoin="round"/>
    <line x1="360" y1="300" x2="510" y2="300" stroke="${INK}" stroke-width="3" stroke-dasharray="9 7"/>
    <line x1="510" y1="100" x2="510" y2="300" stroke="${RED}" stroke-width="4" stroke-dasharray="9 7"/>
    <path d="M 494 300 V 284 H 510" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="110" cy="300" r="6" fill="${INK}"/>
    <circle cx="360" cy="300" r="6" fill="${INK}"/>
    <circle cx="510" cy="100" r="6" fill="${INK}"/>
    <text x="100" y="330" font-family="monospace" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">P(1,1)</text>
    <text x="364" y="330" font-family="monospace" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Q(6,1)</text>
    <text x="510" y="84" font-family="monospace" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">R(9,5)</text>
    <text x="235" y="330" font-family="sans-serif" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">base 5</text>
    <text x="522" y="210" font-family="sans-serif" font-size="18" font-weight="bold" fill="${RED}" text-anchor="start">height</text>
    <text x="522" y="234" font-family="monospace" font-size="20" font-weight="bold" fill="${RED}" text-anchor="start">4</text>
    <text x="60" y="374" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="160" y="374" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="260" y="374" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">4</text>
    <text x="360" y="374" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">6</text>
    <text x="460" y="374" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">8</text>
    <text x="560" y="374" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">10</text>
    <text x="42" y="255" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="42" y="155" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">4</text>
    <text x="42" y="55" font-family="monospace" font-size="15" fill="${MUTED}" text-anchor="middle">6</text>
  </svg>`,
};
