// src/data/Y7_MATH/U03_1/diagrams.js
// Teaching diagrams for 3.1 Multiplying and Dividing by Powers of 10, ported
// from the classroom deck (C:\Users\bowen\lessons, content/y7-math/U03_1_2/
// diagrams.js — the 3.1 half of a two-section deck), plus three drawn for the
// self-study unit.
//
// House rules (classroom LESSON-PLAYBOOK §5, kept here):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan> anywhere: the audit measures a <text>'s raw inner markup, so a
//    tspan inflates the measured width and reports a phantom overflow. Where two
//    colours are needed in one number, that is two <text> elements at computed x;
//  · powers are written with Unicode superscripts (10³), not markup;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560; `showcase` diagrams are 1120-wide strips.
//
// Colour carries one meaning throughout, the same as in widgets.jsx: ORANGE is
// the power, and a zero that is only holding a column open (a placeholder).
//
//   POWER_PARTS    the anatomy of 10³ — which part is the base, which the power
//   POWER_WORDS    "power" in everyday English vs in maths, and how to say it
//   ZERO_LADDER    10¹…10⁶: the power counts the zeros
//   ADD_ZERO       NEW — 56 × 10 leaves the ones column empty (a zero holds it);
//                  7.2 × 10 leaves nothing empty (no zero)
//   PLACEHOLDERS   NEW — 6 ÷ 10³ = 0.006: three empty columns, three zeros
//   MASS_LADDER    mg → g → kg → t, each step × 10³
//   PLACE_TABLE    one table: × moves a digit left, ÷ moves it right
//   PLACE_COLUMNS  NEW — the table's seven columns on their own, for the
//                  hotspot on the last teaching slide. A hotspot strips every
//                  <text>, so the headings and values are tagged class="keep".
//                  Headed Th H T O · t h th, as the Slide the Digits table is:
//                  it is drawn in the slide's side column, where the full
//                  words would be too small to read.
//
// Changed from the classroom: the ANS_* vote cards (a raised hand beside each
// answer) are gone — the self-study deck asks with a `predict` activity — and
// the 3.2 diagrams (rounding) live in U03_2. Marker ids are `u31-…` so they
// cannot collide with U03_2's copy of the place-value table.

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const TEAL = '#0087a8';
const TEAL_T = '#e2f2f6';
const ORANGE_T = '#fdf1e3';
const TENTHS_T = '#fdf8f2';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

// One cell of a small place-value table. `hold` marks a column that only a
// placeholder zero is keeping open; `dec` tints a column right of the point.
const cell = (x, y, w, h, { hold = false, dec = false } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${hold ? ORANGE_T : dec ? TENTHS_T : '#ffffff'}" stroke="${hold ? KEY : RULE}" stroke-width="${hold ? 3 : 2}"/>`;

export const DIAGRAMS = {
  POWER_PARTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="72" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Two parts, and only one is small</text>

    <text x="360" y="290" font-family="${FONT}" font-size="150" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
    <text x="450" y="205" font-family="${FONT}" font-size="95" font-weight="bold" fill="${KEY}" text-anchor="start">3</text>

    <path d="M 175 355 L 300 310" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <circle cx="302" cy="309" r="7" fill="${KEY}"/>
    <text x="140" y="378" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">base</text>

    <path d="M 620 158 L 530 176" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <circle cx="528" cy="176" r="7" fill="${KEY}"/>
    <text x="660" y="158" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">power</text>

    <text x="420" y="430" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">10 × 10 × 10 = 1000</text>
    <text x="420" y="496" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Three tens, multiplied together.</text>
  </svg>`,

  POWER_WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 500" class="w-full h-full">
    ${plate(1120, 500)}

    <text x="70" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">EVERYDAY ENGLISH</text>
    <text x="720" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">IN MATHS</text>

    <rect x="20" y="66" width="1080" height="150" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="158" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">power</text>
    <path d="M 300 96 L 262 156 L 292 156 L 276 200 L 322 136 L 290 136 Z" fill="#fbe7a1" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <text x="360" y="152" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">The power is off.</text>
    <text x="720" y="126" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">how many to multiply</text>
    <text x="720" y="182" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">10³ = 10 × 10 × 10</text>

    <rect x="20" y="236" width="1080" height="244" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="60" y="284" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">How to say it</text>

    <text x="120" y="344" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="start">10²</text>
    <text x="240" y="344" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">ten squared</text>
    <text x="520" y="344" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">or ten to the power of two</text>

    <text x="120" y="406" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="start">10³</text>
    <text x="240" y="406" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">ten cubed</text>
    <text x="520" y="406" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">or ten to the power of three</text>

    <text x="120" y="464" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="start">10⁶</text>
    <text x="240" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">ten to the power of six</text>
  </svg>`,

  ZERO_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="66" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">The power counts the zeros</text>

    <rect x="40" y="94" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">¹</text>
    <text x="190" y="140" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">0</text>
    <text x="580" y="138" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">1 zero</text>

    <rect x="40" y="162" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">²</text>
    <text x="190" y="208" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">00</text>
    <text x="580" y="206" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">2 zeros</text>

    <rect x="40" y="230" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">³</text>
    <text x="190" y="276" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">000</text>
    <text x="580" y="274" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">3 zeros</text>

    <rect x="40" y="298" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">⁴</text>
    <text x="190" y="344" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">0000</text>
    <text x="580" y="342" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">4 zeros</text>

    <rect x="40" y="366" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">⁵</text>
    <text x="190" y="412" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">00000</text>
    <text x="580" y="410" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">5 zeros</text>

    <rect x="40" y="434" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">⁶</text>
    <text x="190" y="480" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">000000</text>
    <text x="580" y="478" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">6 zeros</text>

    <text x="420" y="534" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">This works for 1 followed by zeros. Nothing else.</text>
  </svg>`,

  // Four columns — hundreds, tens, ones, tenths — drawn twice in each panel:
  // the number before, and the number after every digit has moved one place
  // left. The point sits between the ones and the tenths in every row.
  ADD_ZERO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u31-mv" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <rect x="24" y="24" width="792" height="248" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="52" y="84" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">56 × 10 = 560</text>
    <text x="52" y="156" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">The ones column is</text>
    <text x="52" y="186" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">empty, so a zero</text>
    <text x="52" y="216" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">holds it open.</text>

    <text x="445" y="60" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">hundreds</text>
    <text x="535" y="60" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">tens</text>
    <text x="625" y="60" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="735" y="60" font-family="${FONT}" font-size="18" fill="${KEY}" text-anchor="middle">tenths</text>

    <text x="388" y="112" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">before</text>
    ${cell(400, 74, 90, 60)}
    ${cell(490, 74, 90, 60)}
    ${cell(580, 74, 90, 60)}
    ${cell(690, 74, 90, 60, { dec: true })}
    <circle cx="680" cy="128" r="6" fill="${INK}"/>
    <text x="535" y="118" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="625" y="118" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>

    <line x1="527" y1="138" x2="455" y2="170" stroke="${KEY}" stroke-width="3" marker-end="url(#u31-mv)"/>
    <line x1="617" y1="138" x2="545" y2="170" stroke="${KEY}" stroke-width="3" marker-end="url(#u31-mv)"/>

    <text x="388" y="212" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">after</text>
    ${cell(400, 174, 90, 60)}
    ${cell(490, 174, 90, 60)}
    ${cell(580, 174, 90, 60, { hold: true })}
    ${cell(690, 174, 90, 60, { dec: true })}
    <circle cx="680" cy="228" r="6" fill="${INK}"/>
    <text x="445" y="218" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="535" y="218" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="625" y="218" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>

    <rect x="24" y="288" width="792" height="248" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="52" y="348" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">7.2 × 10 = 72</text>
    <text x="52" y="420" font-family="${FONT}" font-size="22" font-weight="bold" fill="${TEAL}" text-anchor="start">No column is left</text>
    <text x="52" y="450" font-family="${FONT}" font-size="22" font-weight="bold" fill="${TEAL}" text-anchor="start">empty before the</text>
    <text x="52" y="480" font-family="${FONT}" font-size="22" font-weight="bold" fill="${TEAL}" text-anchor="start">point, so no zero.</text>

    <text x="445" y="324" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">hundreds</text>
    <text x="535" y="324" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">tens</text>
    <text x="625" y="324" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="735" y="324" font-family="${FONT}" font-size="18" fill="${KEY}" text-anchor="middle">tenths</text>

    <text x="388" y="376" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">before</text>
    ${cell(400, 338, 90, 60)}
    ${cell(490, 338, 90, 60)}
    ${cell(580, 338, 90, 60)}
    ${cell(690, 338, 90, 60, { dec: true })}
    <circle cx="680" cy="392" r="6" fill="${INK}"/>
    <text x="625" y="382" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="735" y="382" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <line x1="617" y1="402" x2="545" y2="434" stroke="${KEY}" stroke-width="3" marker-end="url(#u31-mv)"/>
    <line x1="727" y1="402" x2="637" y2="434" stroke="${KEY}" stroke-width="3" marker-end="url(#u31-mv)"/>

    <text x="388" y="476" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">after</text>
    ${cell(400, 438, 90, 60)}
    ${cell(490, 438, 90, 60)}
    ${cell(580, 438, 90, 60)}
    ${cell(690, 438, 90, 60, { dec: true })}
    <circle cx="680" cy="492" r="6" fill="${INK}"/>
    <text x="535" y="482" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="625" y="482" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
  </svg>`,

  PLACEHOLDERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u31-ph" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
    </defs>

    <text x="420" y="68" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">6 ÷ 10³ = 0.006</text>

    <text x="175" y="120" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="365" y="120" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="515" y="120" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">hundredths</text>
    <text x="665" y="120" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">thousandths</text>

    ${cell(100, 134, 150, 80)}
    ${cell(290, 134, 150, 80, { dec: true })}
    ${cell(440, 134, 150, 80, { dec: true })}
    ${cell(590, 134, 150, 80, { dec: true })}
    <circle cx="270" cy="204" r="8" fill="${INK}"/>
    <text x="175" y="194" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>

    <text x="420" y="252" font-family="${FONT}" font-size="24" font-weight="bold" fill="${TEAL}" text-anchor="middle">3 places right</text>
    <line x1="175" y1="272" x2="655" y2="272" stroke="${TEAL}" stroke-width="5" marker-end="url(#u31-ph)"/>

    ${cell(100, 300, 150, 80, { hold: true })}
    ${cell(290, 300, 150, 80, { hold: true })}
    ${cell(440, 300, 150, 80, { hold: true })}
    ${cell(590, 300, 150, 80, { dec: true })}
    <circle cx="270" cy="370" r="8" fill="${INK}"/>
    <text x="175" y="360" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="365" y="360" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="515" y="360" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="665" y="360" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>

    <text x="420" y="450" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Each orange zero holds a column open.</text>
    <text x="420" y="500" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Leave one out and the 6 is in the wrong column.</text>
  </svg>`,

  MASS_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u31-dn" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u31-up" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
    </defs>

    <rect x="110" y="30" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="82" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">tonne (t)</text>

    <rect x="110" y="170" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="222" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">kilogram (kg)</text>

    <rect x="110" y="310" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="362" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">gram (g)</text>

    <rect x="110" y="450" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="502" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">milligram (mg)</text>

    <line x1="450" y1="114" x2="450" y2="164" stroke="${KEY}" stroke-width="4" marker-end="url(#u31-dn)"/>
    <line x1="450" y1="254" x2="450" y2="304" stroke="${KEY}" stroke-width="4" marker-end="url(#u31-dn)"/>
    <line x1="450" y1="394" x2="450" y2="444" stroke="${KEY}" stroke-width="4" marker-end="url(#u31-dn)"/>
    <text x="480" y="152" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">× 10³</text>
    <text x="480" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">× 10³</text>
    <text x="480" y="432" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">× 10³</text>

    <line x1="670" y1="164" x2="670" y2="114" stroke="${TEAL}" stroke-width="4" marker-end="url(#u31-up)"/>
    <line x1="670" y1="304" x2="670" y2="254" stroke="${TEAL}" stroke-width="4" marker-end="url(#u31-up)"/>
    <line x1="670" y1="444" x2="670" y2="394" stroke="${TEAL}" stroke-width="4" marker-end="url(#u31-up)"/>
    <text x="700" y="152" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="start">÷ 10³</text>
    <text x="700" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="start">÷ 10³</text>
    <text x="700" y="432" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="start">÷ 10³</text>
  </svg>`,

  PLACE_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 430" class="w-full h-full">
    ${plate(1120, 430)}
    <defs>
      <marker id="u31-left" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u31-right" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
    </defs>

    <text x="560" y="48" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Every column is 10 times the one on its right</text>

    <rect x="40" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="180" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="320" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="460" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="640" y="80" width="140" height="50" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="780" y="80" width="140" height="50" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="920" y="80" width="140" height="50" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <text x="110" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">thousands</text>
    <text x="250" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">hundreds</text>
    <text x="390" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">tens</text>
    <text x="530" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="710" y="113" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="850" y="113" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">hundredths</text>
    <text x="990" y="113" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">thousandths</text>

    <rect x="40" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="180" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="320" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="460" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="640" y="130" width="140" height="66" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="780" y="130" width="140" height="66" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="920" y="130" width="140" height="66" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <text x="110" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1000</text>
    <text x="250" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">100</text>
    <text x="390" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
    <text x="530" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="710" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.1</text>
    <text x="850" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.01</text>
    <text x="990" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.001</text>
    <circle cx="620" cy="188" r="11" fill="${INK}"/>

    <line x1="600" y1="262" x2="90" y2="262" stroke="${KEY}" stroke-width="5" marker-end="url(#u31-left)"/>
    <text x="345" y="308" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">× 10 moves a digit left</text>

    <line x1="630" y1="356" x2="1050" y2="356" stroke="${TEAL}" stroke-width="5" marker-end="url(#u31-right)"/>
    <text x="830" y="402" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">÷ 10 moves a digit right</text>
  </svg>`,

  // The hotspot's picture: the same seven columns with nothing else on them.
  // Every <text> is class="keep" — a hotspot strips printed labels, and here
  // the column names and values are the drawing, not the answer.
  PLACE_COLUMNS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 196" class="w-full h-full">
    ${plate(780, 196)}

    <rect x="20" y="20" width="100" height="62" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="120" y="20" width="100" height="62" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="220" y="20" width="100" height="62" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="320" y="20" width="100" height="62" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="460" y="20" width="100" height="62" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="560" y="20" width="100" height="62" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="660" y="20" width="100" height="62" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <text class="keep" x="70" y="64" font-family="${FONT}" font-size="36" font-weight="bold" fill="${MUTED}" text-anchor="middle">Th</text>
    <text class="keep" x="170" y="64" font-family="${FONT}" font-size="36" font-weight="bold" fill="${MUTED}" text-anchor="middle">H</text>
    <text class="keep" x="270" y="64" font-family="${FONT}" font-size="36" font-weight="bold" fill="${MUTED}" text-anchor="middle">T</text>
    <text class="keep" x="370" y="64" font-family="${FONT}" font-size="36" font-weight="bold" fill="${MUTED}" text-anchor="middle">O</text>
    <text class="keep" x="510" y="64" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">t</text>
    <text class="keep" x="610" y="64" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">h</text>
    <text class="keep" x="710" y="64" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">th</text>

    <rect x="20" y="82" width="100" height="92" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="120" y="82" width="100" height="92" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="220" y="82" width="100" height="92" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="320" y="82" width="100" height="92" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="460" y="82" width="100" height="92" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="560" y="82" width="100" height="92" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="660" y="82" width="100" height="92" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <text class="keep" x="70" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1000</text>
    <text class="keep" x="170" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">100</text>
    <text class="keep" x="270" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
    <text class="keep" x="370" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text class="keep" x="510" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.1</text>
    <text class="keep" x="610" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.01</text>
    <text class="keep" x="710" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.001</text>
    <circle cx="440" cy="160" r="10" fill="${INK}"/>
  </svg>`,
};
