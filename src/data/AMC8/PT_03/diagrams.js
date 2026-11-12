// src/data/AMC8/PT_03/diagrams.js
// Teaching diagrams for the PT_03 deck.
//
// House rules (docs/svg-diagrams.md): a white plate first; every <text>
// written out literally (`npm run audit:svg` cannot see helper text);
// monospace for mathematics, sans-serif for labels; and every number here is
// a FRESH number, none from the practice test this deck sits in front of.
//
//   TILTED_SQUARE   a square whose side goes 4 across and 1 up: area 4² + 1² = 17
//   BAND            four coins of radius 3 in a square: band = 4 × 6 + one circle = 24 + 6π

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const BLUE = '#1a5fa8';
const BLUE_PALE = '#dbeafe';
const ORANGE = '#ea580c';
const TEAL = '#0f766e';
const SANS = 'ui-sans-serif, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#ffffff"/>
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="15" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

// A square grid of `cells` by `cells`, cell side `u`, top-left at (x, y). Shapes only.
const grid = (x, y, cells, u) => {
  let d = '';
  for (let k = 0; k <= cells; k++) d += `M ${x + k * u} ${y} v ${cells * u} M ${x} ${y + k * u} h ${cells * u} `;
  return `<path d="${d.trim()}" fill="none" stroke="${LINE}" stroke-width="1.5"/>`;
};

export const DIAGRAMS = {
  // ── A tilted square: 4 across, 1 up ───────────────────────────────────────
  // Grid 5 by 5, 40 px a cell, top-left (30, 30). Vertices (0,1) (4,0) (5,4) (1,5).
  TILTED_SQUARE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300" class="w-full h-full drop-shadow-md" role="img" aria-label="A tilted square on a grid whose side goes 4 across and 1 up, so its area is 17">
    ${plate(460, 300)}
    ${grid(30, 30, 5, 40)}
    <polygon points="30,70 190,30 230,190 70,230" fill="${BLUE_PALE}" fill-opacity="0.7" stroke="${BLUE}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 30 70 L 190 70 L 190 30" fill="none" stroke="${ORANGE}" stroke-width="3" stroke-dasharray="6 4"/>
    <text x="110" y="90" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="700" fill="${ORANGE}">4</text>
    <text x="202" y="56" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="700" fill="${ORANGE}">1</text>
    <text x="130" y="140" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${BLUE}">area?</text>
    <text x="350" y="92" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">One side goes</text>
    <text x="350" y="112" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">4 across and 1 up</text>
    <text x="350" y="156" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="700" fill="${INK}">side² = 4² + 1²</text>
    <text x="350" y="196" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${BLUE}">area = 17</text>
  </svg>`,

  // ── A tight band around four coins ────────────────────────────────────────
  // Coins of radius 3, drawn 36 px: centers (76,84) (148,84) (76,156) (148,156).
  BAND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300" class="w-full h-full drop-shadow-md" role="img" aria-label="Four coins of radius 3 in a square with a band around them: four straight parts of 6 and one whole circle">
    ${plate(460, 300)}
    <rect x="40" y="48" width="144" height="144" rx="36" fill="none" stroke="${ORANGE}" stroke-width="4"/>
    <circle cx="76" cy="84" r="34" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="2"/>
    <circle cx="148" cy="84" r="34" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="2"/>
    <circle cx="76" cy="156" r="34" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="2"/>
    <circle cx="148" cy="156" r="34" fill="${BLUE_PALE}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="76" y="84" width="72" height="72" fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-dasharray="6 4"/>
    <text x="112" y="78" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${TEAL}">6</text>
    <text x="112" y="232" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">4 coins, radius 3</text>
    <text x="330" y="70" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${TEAL}">Straight parts: the square</text>
    <text x="330" y="96" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="700" fill="${INK}">4 × 6 = 24</text>
    <text x="330" y="140" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${ORANGE}">Curved parts: one circle</text>
    <text x="330" y="166" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="700" fill="${INK}">2 × π × 3 = 6π</text>
    <text x="330" y="216" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${BLUE}">band = 24 + 6π</text>
  </svg>`,
};
