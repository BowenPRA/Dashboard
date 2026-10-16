// src/data/Y7_MATH/U04_4/diagrams.js
// Teaching diagrams for 4.4 Dividing decimals. Four are ported from the
// classroom decks (C:\Users\bowen\lessons, content/y7-math/U04_1_4 and
// U04_review); three are new or redrawn for self-study.
//
// House rules (classroom LESSON-PLAYBOOK §5, kept here):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan>: two colours in one line are two <text> elements;
//  · markers are `markerUnits="userSpaceOnUse"`, with ids prefixed u44- so they
//    never meet another unit's on a page;
//  · `split` diagrams are 840×560; `showcase` diagrams are wide strips.
//
// Colour carries one meaning throughout: ORANGE is a 0 the student writes in, or
// the remainder carried onto the next digit; TEAL is the point going straight
// up; GREEN is right, RED is wrong.
//
//   BUS_STOP      8.24 ÷ 4 = 2.06 — the point straight up, the 0, and the check  (ported, U04_1_4)
//   ZERO_PLACE    2.06 against 2.6 on a place-value table: the 0 holds the tenths (new)
//   INVERSE       8.24 → ÷ 4 → 2.06 → × 4 → 8.24: the inverse undoes it           (new)
//   TABLE_DIVIDE  43.2 ÷ 16: write the 16 times table, then short division       (ported, U04_review)
//   WORDS_OPS     the English that picks the operation                            (ported, U04_1_4)
//   MISTAKES      Mr Bowen's homework — four division slips, marked 4/4           (redrawn)
//   ROUTES        Mr Bowen's two routes to school, times in minutes              (ported, U04_review)
//
// Changed from the classroom: the ANS_206 / ANS_26 vote cards (a raised hand
// beside each answer) are gone — the self-study deck asks with a `predict`
// activity — and MISTAKES keeps only division: its compare, subtract and
// multiply lines belong to 4.1–4.3.

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const TEAL = '#0087a8';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const ORANGE_T = '#fdf1e3';
const TEAL_T = '#e2f2f6';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const tick = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GREEN}"/>
    <path d="M ${cx - r * 0.5} ${cy + 0.03 * r} l ${r * 0.35} ${r * 0.35} l ${r * 0.65} -${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round" stroke-linejoin="round"/>`;

const cross = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}"/>
    <path d="M ${cx - r * 0.38} ${cy - r * 0.38} l ${r * 0.76} ${r * 0.76} M ${cx + r * 0.38} ${cy - r * 0.38} l -${r * 0.76} ${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round"/>`;

export const DIAGRAMS = {
  // ── Short division, with the point straight up (ported) ──────────────────
  BUS_STOP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <marker id="u44-up" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
    </defs>

    <rect x="20" y="20" width="600" height="400" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="60" y="68" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">8.24 ÷ 4</text>

    <text x="280" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="335" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="390" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="480" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>

    <path d="M 225 250 V 166 H 540" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <text x="172" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="280" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="335" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="390" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="446" y="204" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="480" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>

    <line x1="335" y1="216" x2="335" y2="154" stroke="${TEAL}" stroke-width="3.5" stroke-dasharray="7 6" marker-end="url(#u44-up)"/>

    <text x="60" y="310" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="start">The point goes straight up.</text>
    <text x="60" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">2 ÷ 4 = 0, remainder 2. Write 0.</text>
    <text x="60" y="394" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">Carry the 2: 24 ÷ 4 = 6.</text>

    <rect x="650" y="20" width="450" height="400" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="875" y="78" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Check: multiply back</text>
    ${tick(702, 168, 26)}
    <text x="744" y="181" font-family="${FONT}" font-size="38" font-weight="bold" fill="${GREEN}" text-anchor="start">2.06 × 4 = 8.24</text>
    ${cross(702, 268, 26)}
    <text x="744" y="281" font-family="${FONT}" font-size="38" font-weight="bold" fill="${RED}" text-anchor="start">2.6 × 4 = 10.4</text>
    <text x="875" y="372" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">× is the inverse of ÷</text>
  </svg>`,

  // ── The 0 holds the tenths place (new) ───────────────────────────────────
  ZERO_PLACE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="52" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Where does the 6 go?</text>

    <rect x="200" y="86" width="130" height="44" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="330" y="86" width="50" height="44" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="380" y="86" width="150" height="44" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="530" y="86" width="150" height="44" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="265" y="115" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="455" y="115" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="605" y="115" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">hundredths</text>

    ${tick(130, 175, 28)}
    <rect x="200" y="130" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="330" y="130" width="50" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="380" y="130" width="150" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="530" y="130" width="150" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="265" y="198" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="355" y="198" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="455" y="198" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="605" y="198" font-family="${FONT}" font-size="64" font-weight="bold" fill="${GREEN}" text-anchor="middle">6</text>
    <text x="760" y="190" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">2.06</text>

    ${cross(130, 285, 28)}
    <rect x="200" y="240" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="330" y="240" width="50" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="380" y="240" width="150" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="530" y="240" width="150" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="265" y="308" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="355" y="308" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="455" y="308" font-family="${FONT}" font-size="64" font-weight="bold" fill="${RED}" text-anchor="middle">6</text>
    <text x="760" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">2.6</text>

    <text x="420" y="392" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">2.06: the 6 is 6 hundredths.</text>
    <text x="420" y="436" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}" text-anchor="middle">2.6: the 6 has jumped into the tenths.</text>
    <rect x="130" y="464" width="580" height="70" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="510" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">The 0 holds the tenths place.</text>
  </svg>`,

  // ── Divide, then multiply back (new) ─────────────────────────────────────
  INVERSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u44-teal" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
      <marker id="u44-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">÷ and × undo each other</text>

    <path d="M 300 196 C 370 112, 470 112, 540 196" fill="none" stroke="${TEAL}" stroke-width="5" marker-end="url(#u44-teal)"/>
    <text x="420" y="118" font-family="${FONT}" font-size="40" font-weight="bold" fill="${TEAL}" text-anchor="middle">÷ 4</text>

    <rect x="100" y="180" width="200" height="110" rx="18" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="200" y="256" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">8.24</text>
    <rect x="540" y="180" width="200" height="110" rx="18" fill="#ffffff" stroke="${GREEN}" stroke-width="3"/>
    <text x="640" y="256" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">2.06</text>

    <path d="M 540 274 C 470 360, 370 360, 300 274" fill="none" stroke="${KEY}" stroke-width="5" marker-end="url(#u44-key)"/>
    <text x="420" y="378" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">× 4</text>

    <text x="420" y="446" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">2.06 × 4 = 8.24: back where you started</text>
    <text x="420" y="500" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Not back where you started? The answer is wrong.</text>
  </svg>`,

  // ── Dividing by 16: the times table first (ported) ───────────────────────
  TABLE_DIVIDE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="20" width="420" height="400" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2"/>
    <text x="230" y="62" font-family="${FONT}" font-size="25" font-weight="bold" fill="${TEAL}" text-anchor="middle">1. Write the 16 times table</text>
    <text x="60" y="116" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">1 × 16 = 16</text>
    <text x="60" y="160" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">2 × 16 = 32</text>
    <text x="60" y="204" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">3 × 16 = 48</text>
    <text x="60" y="248" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">4 × 16 = 64</text>
    <text x="60" y="292" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">5 × 16 = 80</text>
    <text x="238" y="116" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">6 × 16 = 96</text>
    <text x="238" y="160" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">7 × 16 = 112</text>
    <text x="238" y="204" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">8 × 16 = 128</text>
    <text x="238" y="248" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">9 × 16 = 144</text>
    <text x="230" y="380" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Keep adding 16.</text>

    <rect x="460" y="20" width="640" height="400" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="785" y="62" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">2. Short division: 43.2 ÷ 16</text>

    <text x="720" y="152" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="776" y="152" font-family="${FONT}" font-size="60" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="856" y="152" font-family="${FONT}" font-size="60" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>

    <path d="M 606 256 V 172 H 900" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <text x="548" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">16</text>
    <text x="650" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="720" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="776" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="816" y="206" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">11</text>
    <text x="856" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <text x="490" y="310" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="start">43 ÷ 16 = 2, remainder 11</text>
    <text x="490" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">112 ÷ 16 = 7 (from the table)</text>
    <text x="490" y="392" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="start">Check: 2.7 × 16 = 43.2</text>
  </svg>`,

  // ── The English that picks the operation (ported) ────────────────────────
  WORDS_OPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="20" y="18" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="79" r="40" fill="${TEAL}"/>
    <text x="90" y="97" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">+</text>
    <text x="160" y="70" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">altogether · in total</text>
    <text x="160" y="114" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">How much is that altogether?</text>

    <rect x="20" y="152" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="213" r="40" fill="${TEAL}"/>
    <text x="90" y="231" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">−</text>
    <text x="160" y="204" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">change · how much more</text>
    <text x="160" y="248" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">How much change does he get?</text>

    <rect x="20" y="286" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="347" r="40" fill="${TEAL}"/>
    <text x="90" y="365" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">×</text>
    <text x="160" y="338" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">each · lots of</text>
    <text x="160" y="382" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">6 pens at 1.25 dollars each</text>

    <rect x="20" y="420" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="481" r="40" fill="${TEAL}"/>
    <text x="90" y="499" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">÷</text>
    <text x="160" y="472" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">share equally</text>
    <text x="160" y="516" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">Share 7.45 dollars equally between 5.</text>
  </svg>`,

  // ── Mr Bowen's homework: four division slips (redrawn) ───────────────────
  MISTAKES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="40" y="20" width="760" height="520" rx="6" fill="#fffdf5" stroke="#d8cfa8" stroke-width="2"/>
    <line x1="60" y1="140" x2="780" y2="140" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="220" x2="780" y2="220" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="300" x2="780" y2="300" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="380" x2="780" y2="380" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="460" x2="780" y2="460" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="120" y1="30" x2="120" y2="530" stroke="#e8a0a0" stroke-width="2"/>

    <text x="140" y="86" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">Mr Bowen’s homework</text>
    <circle cx="704" cy="78" r="44" fill="none" stroke="${RED}" stroke-width="4"/>
    <text x="704" y="91" font-family="${HAND}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">4/4</text>

    <text x="140" y="208" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">a)  9.18 ÷ 3 = 3.6</text>
    <text x="140" y="288" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">b)  5.3 ÷ 2 = 2.6 r 1</text>
    <text x="140" y="368" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">c)  0.75 ÷ 5 = 1.5</text>
    <text x="140" y="448" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">d)  12.6 ÷ 2 = 6.3 each</text>
    <text x="196" y="500" font-family="${HAND}" font-size="22" fill="${MUTED}" text-anchor="start">(me and 2 friends share 12.6 dollars)</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── Two routes to school (ported) ────────────────────────────────────────
  ROUTES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="50" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen’s time to school, in minutes</text>

    <rect x="40" y="70" width="760" height="70" fill="${TEAL}" stroke="${TEAL}" stroke-width="2"/>
    <text x="420" y="106" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">Route A (four days)</text>
    <rect x="40" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="230" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="420" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="610" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="135" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.4</text>
    <text x="325" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">11.8</text>
    <text x="515" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">13.1</text>
    <text x="705" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.7</text>

    <rect x="40" y="262" width="760" height="70" fill="${KEY}" stroke="${KEY}" stroke-width="2"/>
    <text x="420" y="298" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">Route B (five days)</text>
    <rect x="40" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="192" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="344" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="496" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="648" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="116" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.9</text>
    <text x="268" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">11.2</text>
    <text x="420" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.6</text>
    <text x="572" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">13.4</text>
    <text x="724" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">11.4</text>

    <text x="420" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">Which route is quicker on average?</text>
    <text x="420" y="526" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Route B has the slowest day of all: 13.4 minutes.</text>
  </svg>`,
};
