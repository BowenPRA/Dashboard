// src/data/AMC8/TP_01/diagrams.js
// Teaching diagrams for the TP_01 deck (How Many Ways?).
//
// House rules (docs/svg-diagrams.md):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally, because `npm run audit:svg`
//    cannot see text produced by a helper;
//  · monospace for anything mathematical, sans-serif for labels;
//  · every number printed here is a FRESH number: none of them comes from the
//    practice set or the test of this unit.
//
//   TREE          3 shirts, then 2 pants for each: 6 outfits, 3 × 2
//   FUSSY_FIRST   even numbers from 1–5, no repeats: fill the ones slot first, 4 × 3 × 2 = 24
//   PAIRS         4 friends, 6 handshakes: the slots say 4 × 3 = 12, each one counted twice

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#94a3b8';
const CARD = '#f8fafc';
const TEAL = '#0f766e';
const TEAL_PALE = '#ccfbf1';
const ORANGE = '#ea580c';
const SANS = 'ui-sans-serif, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#ffffff"/>
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="15" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

export const DIAGRAMS = {
  // ── A tree: 3 shirts, then 2 pants for each ───────────────────────────────
  TREE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 330" class="w-full h-full drop-shadow-md" role="img" aria-label="A tree diagram: 3 shirts, each with 2 pants, makes 6 outfits">
    ${plate(460, 330)}
    <text x="150" y="34" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">3 SHIRTS</text>
    <text x="318" y="34" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">2 PANTS</text>
    <path d="M 40 150 L 110 80 M 40 150 L 110 150 M 40 150 L 110 220" fill="none" stroke="${LINE}" stroke-width="2.5"/>
    <path d="M 190 80 L 270 60 M 190 80 L 270 100 M 190 150 L 270 130 M 190 150 L 270 170 M 190 220 L 270 200 M 190 220 L 270 240" fill="none" stroke="${LINE}" stroke-width="2.5"/>
    <circle cx="40" cy="150" r="7" fill="${INK}"/>
    <rect x="110" y="64" width="80" height="32" rx="9" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="110" y="134" width="80" height="32" rx="9" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="110" y="204" width="80" height="32" rx="9" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <text x="150" y="85" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${INK}">red</text>
    <text x="150" y="155" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${INK}">blue</text>
    <text x="150" y="225" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${INK}">white</text>
    <rect x="270" y="46" width="96" height="28" rx="8" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <rect x="270" y="86" width="96" height="28" rx="8" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <rect x="270" y="116" width="96" height="28" rx="8" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <rect x="270" y="156" width="96" height="28" rx="8" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <rect x="270" y="186" width="96" height="28" rx="8" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <rect x="270" y="226" width="96" height="28" rx="8" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <text x="318" y="65" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${INK}">jeans</text>
    <text x="318" y="105" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${INK}">shorts</text>
    <text x="318" y="135" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${INK}">jeans</text>
    <text x="318" y="175" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${INK}">shorts</text>
    <text x="318" y="205" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${INK}">jeans</text>
    <text x="318" y="245" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${INK}">shorts</text>
    <text x="400" y="66" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="700" fill="${ORANGE}">1</text>
    <text x="400" y="106" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="700" fill="${ORANGE}">2</text>
    <text x="400" y="136" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="700" fill="${ORANGE}">3</text>
    <text x="400" y="176" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="700" fill="${ORANGE}">4</text>
    <text x="400" y="206" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="700" fill="${ORANGE}">5</text>
    <text x="400" y="246" text-anchor="middle" font-family="${MONO}" font-size="15" font-weight="700" fill="${ORANGE}">6</text>
    <text x="230" y="302" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">3 × 2 = 6 outfits</text>
  </svg>`,

  // ── Fussy slot first: even numbers from 1–5, no digit twice ───────────────
  FUSSY_FIRST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300" class="w-full h-full drop-shadow-md" role="img" aria-label="Three slots filled in the order ones, hundreds, tens: 4 times 3 times 2 is 24">
    ${plate(460, 300)}
    <text x="230" y="36" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${MUTED}">Even numbers from 1, 2, 3, 4, 5 (no digit twice)</text>
    <circle cx="98" cy="74" r="14" fill="${MUTED}"/>
    <circle cx="230" cy="74" r="14" fill="${MUTED}"/>
    <circle cx="362" cy="74" r="14" fill="${ORANGE}"/>
    <text x="98" y="79" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="800" fill="#ffffff">2</text>
    <text x="230" y="79" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="800" fill="#ffffff">3</text>
    <text x="362" y="79" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="800" fill="#ffffff">1</text>
    <rect x="52" y="98" width="92" height="66" rx="12" fill="${CARD}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="184" y="98" width="92" height="66" rx="12" fill="${CARD}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="316" y="98" width="92" height="66" rx="12" fill="#fff7ed" stroke="${ORANGE}" stroke-width="3"/>
    <text x="98" y="142" text-anchor="middle" font-family="${MONO}" font-size="32" font-weight="700" fill="${INK}">4</text>
    <text x="230" y="142" text-anchor="middle" font-family="${MONO}" font-size="32" font-weight="700" fill="${INK}">3</text>
    <text x="362" y="142" text-anchor="middle" font-family="${MONO}" font-size="32" font-weight="700" fill="${ORANGE}">2</text>
    <text x="164" y="140" text-anchor="middle" font-family="${MONO}" font-size="22" font-weight="700" fill="${MUTED}">×</text>
    <text x="296" y="140" text-anchor="middle" font-family="${MONO}" font-size="22" font-weight="700" fill="${MUTED}">×</text>
    <text x="98" y="188" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">hundreds</text>
    <text x="230" y="188" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">tens</text>
    <text x="362" y="188" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">ones</text>
    <text x="362" y="208" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${ORANGE}">must be 2 or 4</text>
    <text x="98" y="208" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">4 digits left</text>
    <text x="230" y="208" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">3 digits left</text>
    <text x="230" y="268" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">4 × 3 × 2 = 24 numbers</text>
  </svg>`,

  // ── Order does not matter: 4 friends, 6 handshakes ────────────────────────
  PAIRS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300" class="w-full h-full drop-shadow-md" role="img" aria-label="Four friends joined by six lines, one for each handshake">
    ${plate(460, 300)}
    <path d="M 80 70 L 220 70 M 80 70 L 80 210 M 80 70 L 220 210 M 220 70 L 220 210 M 220 70 L 80 210 M 80 210 L 220 210" fill="none" stroke="${TEAL}" stroke-width="3"/>
    <circle cx="80" cy="70" r="20" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2.5"/>
    <circle cx="220" cy="70" r="20" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2.5"/>
    <circle cx="80" cy="210" r="20" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2.5"/>
    <circle cx="220" cy="210" r="20" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2.5"/>
    <text x="80" y="76" text-anchor="middle" font-family="${SANS}" font-size="17" font-weight="800" fill="${INK}">A</text>
    <text x="220" y="76" text-anchor="middle" font-family="${SANS}" font-size="17" font-weight="800" fill="${INK}">B</text>
    <text x="80" y="216" text-anchor="middle" font-family="${SANS}" font-size="17" font-weight="800" fill="${INK}">C</text>
    <text x="220" y="216" text-anchor="middle" font-family="${SANS}" font-size="17" font-weight="800" fill="${INK}">D</text>
    <text x="150" y="268" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${TEAL}">6 lines: 6 handshakes</text>
    <text x="350" y="76" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">The slots say</text>
    <text x="350" y="106" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">4 × 3 = 12</text>
    <text x="350" y="146" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${ORANGE}">A–B and B–A are</text>
    <text x="350" y="164" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${ORANGE}">the same handshake</text>
    <text x="350" y="206" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">12 ÷ 2 = 6</text>
  </svg>`,
};
