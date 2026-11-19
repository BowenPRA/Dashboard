// src/data/AMC8/TP_02/diagrams.js
// Teaching diagrams for the TP_02 deck (Arrangements).
//
// House rules (docs/svg-diagrams.md):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally, because `npm run audit:svg`
//    cannot see text produced by a helper;
//  · monospace for anything mathematical, sans-serif for labels;
//  · every number printed here is a FRESH number: none of them comes from the
//    practice set or the test of this unit.
//
//   BOOKS    5 different books in a row: 5 × 4 × 3 × 2 × 1 = 5! = 120
//   COPIES   ZOO with its O's labelled: 3! = 6 orders, each word twice, 6 ÷ 2! = 3
//   GLUE     MATHCOUNTS with A, O, U glued into one block: 8!/2! × 3! = 120,960

const INK = '#1e293b';
const MUTED = '#64748b';
const CARD = '#f8fafc';
const TEAL = '#0f766e';
const TEAL_PALE = '#ccfbf1';
const ORANGE = '#ea580c';
const ORANGE_PALE = '#fff7ed';
const SANS = 'ui-sans-serif, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#ffffff"/>
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="15" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

export const DIAGRAMS = {
  // ── Arrange everything: 5 books, one fewer for each place ─────────────────
  BOOKS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 310" class="w-full h-full drop-shadow-md" role="img" aria-label="Five slots filled 5, 4, 3, 2, 1: five books can stand on a shelf in 120 orders">
    ${plate(460, 310)}
    <text x="230" y="40" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${MUTED}">5 different books, 5 places on the shelf</text>
    <rect x="18" y="92" width="64" height="62" rx="12" fill="${CARD}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="108" y="92" width="64" height="62" rx="12" fill="${CARD}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="198" y="92" width="64" height="62" rx="12" fill="${CARD}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="288" y="92" width="64" height="62" rx="12" fill="${CARD}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="378" y="92" width="64" height="62" rx="12" fill="${CARD}" stroke="${INK}" stroke-width="2.5"/>
    <text x="50" y="134" text-anchor="middle" font-family="${MONO}" font-size="30" font-weight="700" fill="${INK}">5</text>
    <text x="140" y="134" text-anchor="middle" font-family="${MONO}" font-size="30" font-weight="700" fill="${INK}">4</text>
    <text x="230" y="134" text-anchor="middle" font-family="${MONO}" font-size="30" font-weight="700" fill="${INK}">3</text>
    <text x="320" y="134" text-anchor="middle" font-family="${MONO}" font-size="30" font-weight="700" fill="${INK}">2</text>
    <text x="410" y="134" text-anchor="middle" font-family="${MONO}" font-size="30" font-weight="700" fill="${INK}">1</text>
    <text x="95" y="131" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${MUTED}">×</text>
    <text x="185" y="131" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${MUTED}">×</text>
    <text x="275" y="131" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${MUTED}">×</text>
    <text x="365" y="131" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${MUTED}">×</text>
    <text x="50" y="178" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">1st</text>
    <text x="140" y="178" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">2nd</text>
    <text x="230" y="178" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">3rd</text>
    <text x="320" y="178" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">4th</text>
    <text x="410" y="178" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">5th</text>
    <text x="230" y="210" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${ORANGE}">one book fewer for each place</text>
    <text x="230" y="258" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">5 × 4 × 3 × 2 × 1 = 120</text>
    <text x="230" y="288" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${TEAL}">written 5! and read “5 factorial”</text>
  </svg>`,

  // ── Identical letters: label the O's of ZOO, then take the labels off ─────
  COPIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 336" class="w-full h-full drop-shadow-md" role="img" aria-label="The six orders of Z, O1, O2 fall into pairs; with the labels taken off, each pair is one word: ZOO, OZO, OOZ">
    ${plate(460, 336)}
    <text x="104" y="32" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">Labels on: 3! = 6</text>
    <text x="352" y="32" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${MUTED}">Labels off</text>
    <path d="M 162 66 L 214 85 M 162 104 L 214 85 M 214 85 L 284 85 M 162 148 L 214 167 M 162 186 L 214 167 M 214 167 L 284 167 M 162 230 L 214 249 M 162 268 L 214 249 M 214 249 L 284 249" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
    <polygon points="284,79 294,85 284,91" fill="#94a3b8"/>
    <polygon points="284,161 294,167 284,173" fill="#94a3b8"/>
    <polygon points="284,243 294,249 284,255" fill="#94a3b8"/>
    <rect x="50" y="50" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="86" y="50" width="32" height="32" rx="7" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="122" y="50" width="32" height="32" rx="7" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="50" y="88" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="86" y="88" width="32" height="32" rx="7" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="122" y="88" width="32" height="32" rx="7" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <text x="66" y="72" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="102" y="72" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₁</text>
    <text x="138" y="72" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₂</text>
    <text x="66" y="110" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="102" y="110" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₂</text>
    <text x="138" y="110" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₁</text>
    <rect x="50" y="132" width="32" height="32" rx="7" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="86" y="132" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="122" y="132" width="32" height="32" rx="7" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="50" y="170" width="32" height="32" rx="7" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="86" y="170" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="122" y="170" width="32" height="32" rx="7" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <text x="66" y="154" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₁</text>
    <text x="102" y="154" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="138" y="154" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₂</text>
    <text x="66" y="192" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₂</text>
    <text x="102" y="192" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="138" y="192" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₁</text>
    <rect x="50" y="214" width="32" height="32" rx="7" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="86" y="214" width="32" height="32" rx="7" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="122" y="214" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="50" y="252" width="32" height="32" rx="7" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="86" y="252" width="32" height="32" rx="7" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="2"/>
    <rect x="122" y="252" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <text x="66" y="236" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₁</text>
    <text x="102" y="236" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₂</text>
    <text x="138" y="236" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="66" y="274" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₂</text>
    <text x="102" y="274" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O₁</text>
    <text x="138" y="274" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <rect x="300" y="69" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="336" y="69" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="372" y="69" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="300" y="151" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="336" y="151" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="372" y="151" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="300" y="233" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="336" y="233" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="372" y="233" width="32" height="32" rx="7" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <text x="316" y="91" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="352" y="91" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O</text>
    <text x="388" y="91" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O</text>
    <text x="316" y="173" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O</text>
    <text x="352" y="173" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="388" y="173" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O</text>
    <text x="316" y="255" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O</text>
    <text x="352" y="255" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">O</text>
    <text x="388" y="255" text-anchor="middle" font-family="${MONO}" font-size="16" font-weight="700" fill="${INK}">Z</text>
    <text x="230" y="316" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="700" fill="${INK}">6 ÷ 2! = 3 words</text>
  </svg>`,

  // ── Must be together: glue A, O, U into one block ─────────────────────────
  GLUE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300" class="w-full h-full drop-shadow-md" role="img" aria-label="MATHCOUNTS as seven letter tiles and one block holding A, O and U: 8 units, then 3! orders inside the block">
    ${plate(460, 300)}
    <text x="230" y="36" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${MUTED}">A, O and U glued into one block</text>
    <rect x="12" y="66" width="38" height="44" rx="8" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="58" y="66" width="38" height="44" rx="8" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="104" y="66" width="38" height="44" rx="8" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="150" y="66" width="38" height="44" rx="8" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="196" y="66" width="38" height="44" rx="8" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <rect x="242" y="66" width="38" height="44" rx="8" fill="${ORANGE_PALE}" stroke="${ORANGE}" stroke-width="2"/>
    <rect x="288" y="66" width="38" height="44" rx="8" fill="${CARD}" stroke="${INK}" stroke-width="2"/>
    <text x="31" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">M</text>
    <text x="77" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${ORANGE}">T</text>
    <text x="123" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">H</text>
    <text x="169" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">C</text>
    <text x="215" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">N</text>
    <text x="261" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${ORANGE}">T</text>
    <text x="307" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">S</text>
    <rect x="334" y="62" width="114" height="52" rx="10" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="3"/>
    <path d="M 372 72 L 372 104 M 410 72 L 410 104" fill="none" stroke="${TEAL}" stroke-width="1.5" stroke-dasharray="4 4"/>
    <text x="353" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">A</text>
    <text x="391" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">O</text>
    <text x="429" y="96" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">U</text>
    <text x="169" y="140" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${ORANGE}">7 letters (T twice) + 1 block</text>
    <text x="391" y="140" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${TEAL}">3! = 6 inside</text>
    <text x="230" y="194" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="700" fill="${INK}">8 units: 8!/2! = 20,160</text>
    <text x="230" y="226" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="700" fill="${INK}">orders inside: 3! = 6</text>
    <text x="230" y="270" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${TEAL}">20,160 × 6 = 120,960</text>
  </svg>`,
};
