// src/data/Y7_MATH/U03_2/diagrams.js
// Teaching diagrams for 3.2 Rounding. Seven are ported from the classroom deck
// (C:\Users\bowen\lessons, content/y7-math/U03_1_2/diagrams.js); four are new,
// because the classroom deck never draws a division — it only compares 8.285
// with 8.286.
//
// House rules (classroom LESSON-PLAYBOOK §5, kept here):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan> anywhere: the audit measures a <text>'s raw inner markup, so a
//    tspan inflates the measured width and reports a phantom overflow. Where two
//    colours are needed in one number, that is two <text> elements at computed x;
//  · powers are written with Unicode superscripts, not markup;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560; `showcase` diagrams are wide strips.
//
// Colour carries one meaning throughout: ORANGE is the place being rounded to
// and, under the bus stop, the small remainder carried onto the next digit;
// TEAL is a zero (and the point) the student adds after the number; GREEN is
// right, RED is wrong.
//
//   PLACE_TABLE   the recap of 3.1: one table, × moves left and ÷ moves right
//   ROUND_WORDS   round to / correct to / to N d.p. — and "as far as", which differs
//   DP_COUNT      3.14159: count only the digits after the point
//   ROUND_LINE    4.53 is nearer 4.5; 4.55 is exactly halfway, so round up
//   KEEP_ZERO     35.0 not 35; 7.50 not 7.5 — the trailing zero is the accuracy
//   LONG_SHORT    852 ÷ 6 twice: every subtraction written down, and the short way  (new)
//   BUS_CARRY     852 ÷ 6 = 142: each remainder rides on the next digit              (new)
//   BUS_ZEROS     27 ÷ 4 = 6.75: the point, then zeros, until the remainder is 0     (new)
//   BUS_STOP      58 ÷ 7 to four places, then rounded once to 8.286                  (new)
//   DIVIDE_STEPS  58 ÷ 7: stopping at 3 places vs going to 4 and rounding
//   MISTAKES      Mr Bowen's homework, which he has marked 4/4
//
// Changed from the classroom: the ANS_* vote cards (a raised hand beside each
// answer) are gone — the self-study deck asks with a `predict` activity — and
// MISTAKES is redrawn: its two powers-of-10 lines belong to 3.1, so they are
// replaced by a dropped zero and a division stopped too early.

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const TEAL = '#0087a8';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const GREEN_T = '#eef6e6';
const RED_T = '#fdecee';
const ORANGE_T = '#fdf1e3';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const tick = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GREEN}"/>
    <path d="M ${cx - r * 0.5} ${cy + 0.03 * r} l ${r * 0.35} ${r * 0.35} l ${r * 0.65} -${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round" stroke-linejoin="round"/>`;

const cross = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}"/>
    <path d="M ${cx - r * 0.38} ${cy - r * 0.38} l ${r * 0.76} ${r * 0.76} M ${cx + r * 0.38} ${cy - r * 0.38} l -${r * 0.76} ${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round"/>`;

export const DIAGRAMS = {
  PLACE_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 430" class="w-full h-full">
    ${plate(1120, 430)}
    <defs>
      <marker id="u32-left" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u32-right" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
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

    <line x1="600" y1="262" x2="90" y2="262" stroke="${KEY}" stroke-width="5" marker-end="url(#u32-left)"/>
    <text x="345" y="308" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">× 10 moves a digit left</text>

    <line x1="630" y1="356" x2="1050" y2="356" stroke="${TEAL}" stroke-width="5" marker-end="url(#u32-right)"/>
    <text x="830" y="402" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">÷ 10 moves a digit right</text>
  </svg>`,

  ROUND_WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 500" class="w-full h-full">
    ${plate(1120, 500)}

    <text x="70" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">THE EXAM SAYS</text>
    <text x="600" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">IT MEANS</text>

    <rect x="20" y="64" width="1080" height="96" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="60" y="124" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">round to 2 d.p.</text>
    ${tick(520, 112, 26)}
    <text x="600" y="112" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">round it</text>
    <text x="600" y="146" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">8.472 → 8.47</text>

    <rect x="20" y="172" width="1080" height="96" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="60" y="232" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">correct to 2 d.p.</text>
    ${tick(520, 220, 26)}
    <text x="600" y="220" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">the same job</text>
    <text x="600" y="254" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">you will see this one most often</text>

    <rect x="20" y="280" width="1080" height="96" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="60" y="340" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">to 2 decimal places</text>
    ${tick(520, 328, 26)}
    <text x="600" y="328" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">the same job</text>
    <text x="600" y="362" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">d.p. is short for decimal places</text>

    <rect x="20" y="388" width="1080" height="96" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="60" y="448" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">as far as 2 d.p.</text>
    ${cross(520, 436, 26)}
    <text x="600" y="436" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="start">NOT the same job</text>
    <text x="600" y="470" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">keep dividing — do not round yet</text>
  </svg>`,

  DP_COUNT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="70" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Count only after the point</text>

    <text x="160" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${MUTED}" text-anchor="middle">3</text>
    <text x="215" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="265" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="335" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="405" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="475" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="545" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>

    <path d="M 240 268 v 16 H 570 v -16" fill="none" stroke="${KEY}" stroke-width="3" stroke-linejoin="round"/>

    <text x="265" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>
    <text x="335" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="405" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">3</text>
    <text x="475" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="545" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>

    <text x="660" y="338" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">places</text>

    <text x="420" y="428" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">3.14159 has 5 decimal places</text>
    <text x="420" y="492" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">The 3 in front is never counted.</text>
  </svg>`,

  ROUND_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="240" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="300" y="70" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.53 to 1 decimal place</text>
    <line x1="80" y1="180" x2="560" y2="180" stroke="${INK}" stroke-width="3"/>
    <line x1="80" y1="164" x2="80" y2="196" stroke="${INK}" stroke-width="3"/>
    <line x1="320" y1="168" x2="320" y2="192" stroke="${RULE}" stroke-width="3"/>
    <line x1="560" y1="164" x2="560" y2="196" stroke="${INK}" stroke-width="3"/>
    <circle cx="224" cy="180" r="11" fill="${KEY}"/>
    <text x="224" y="146" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">4.53</text>
    <text x="80" y="232" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.5</text>
    <text x="560" y="232" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.6</text>
    <text x="700" y="122" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">nearer 4.5</text>
    <text x="700" y="206" font-family="${FONT}" font-size="60" font-weight="bold" fill="${GREEN}" text-anchor="middle">4.5</text>

    <rect x="24" y="288" width="792" height="240" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="300" y="334" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.55 to 1 decimal place</text>
    <line x1="80" y1="444" x2="560" y2="444" stroke="${INK}" stroke-width="3"/>
    <line x1="80" y1="428" x2="80" y2="460" stroke="${INK}" stroke-width="3"/>
    <line x1="320" y1="432" x2="320" y2="456" stroke="${RULE}" stroke-width="3"/>
    <line x1="560" y1="428" x2="560" y2="460" stroke="${INK}" stroke-width="3"/>
    <circle cx="320" cy="444" r="11" fill="${KEY}"/>
    <text x="320" y="410" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">4.55</text>
    <text x="80" y="496" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.5</text>
    <text x="560" y="496" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.6</text>
    <text x="700" y="376" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">exactly halfway</text>
    <text x="700" y="408" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">round up</text>
    <text x="700" y="482" font-family="${FONT}" font-size="60" font-weight="bold" fill="${KEY}" text-anchor="middle">4.6</text>
  </svg>`,

  KEEP_ZERO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="250" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="78" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">34.9892 to 1 d.p.</text>
    ${cross(250, 172)}
    <text x="340" y="196" font-family="${FONT}" font-size="70" font-weight="bold" fill="${RED}" text-anchor="start">35</text>
    ${tick(540, 172)}
    <text x="610" y="196" font-family="${FONT}" font-size="70" font-weight="bold" fill="${GREEN}" text-anchor="start">35.0</text>
    <text x="420" y="250" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">The .0 is what shows 1 decimal place.</text>

    <rect x="24" y="294" width="792" height="250" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="348" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">7.4955 to 2 d.p.</text>
    ${cross(250, 442)}
    <text x="340" y="466" font-family="${FONT}" font-size="70" font-weight="bold" fill="${RED}" text-anchor="start">7.5</text>
    ${tick(540, 442)}
    <text x="610" y="466" font-family="${FONT}" font-size="70" font-weight="bold" fill="${GREEN}" text-anchor="start">7.50</text>
    <text x="420" y="520" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Never delete a zero at the end.</text>
  </svg>`,

  // NEW. The same division written twice. Left: long division, with every
  // product and subtraction under the number. Right: short division — the
  // subtraction happens in your head and only the remainder is written, small,
  // up and to the left of the next digit.
  LONG_SHORT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 480" class="w-full h-full">
    ${plate(1120, 480)}

    <text x="60" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">LONG DIVISION</text>
    <text x="620" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">SHORT DIVISION</text>

    <rect x="20" y="64" width="520" height="396" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="170" y="112" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="230" y="112" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="290" y="112" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <path d="M 130 174 V 126 H 330" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
    <text x="90" y="166" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="170" y="166" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="230" y="166" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="290" y="166" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <text x="126" y="212" font-family="${FONT}" font-size="36" fill="${MUTED}" text-anchor="middle">−</text>
    <text x="170" y="212" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">6</text>
    <line x1="150" y1="224" x2="190" y2="224" stroke="${MUTED}" stroke-width="3"/>
    <text x="170" y="262" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="230" y="262" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">5</text>

    <text x="126" y="304" font-family="${FONT}" font-size="36" fill="${MUTED}" text-anchor="middle">−</text>
    <text x="170" y="304" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="230" y="304" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">4</text>
    <line x1="150" y1="316" x2="250" y2="316" stroke="${MUTED}" stroke-width="3"/>
    <text x="230" y="354" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">1</text>
    <text x="290" y="354" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">2</text>

    <text x="186" y="396" font-family="${FONT}" font-size="36" fill="${MUTED}" text-anchor="middle">−</text>
    <text x="230" y="396" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">1</text>
    <text x="290" y="396" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">2</text>
    <line x1="210" y1="408" x2="310" y2="408" stroke="${MUTED}" stroke-width="3"/>
    <text x="290" y="446" font-family="${FONT}" font-size="40" font-weight="bold" fill="${MUTED}" text-anchor="middle">0</text>

    <text x="430" y="232" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">every product</text>
    <text x="430" y="264" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">and subtraction</text>
    <text x="430" y="296" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">written down</text>

    <rect x="580" y="64" width="520" height="396" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="790" y="184" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="900" y="184" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="1010" y="184" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <path d="M 716 322 V 206 H 1056" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <text x="664" y="300" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="790" y="300" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="856" y="252" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="900" y="300" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="966" y="252" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>
    <text x="1010" y="300" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <text x="840" y="386" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">only the remainders, written small</text>
    <text x="840" y="424" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the subtraction is done in your head</text>
  </svg>`,

  // NEW. The carry, named. 8 ÷ 6 leaves 2; the 2 is written small, up and to
  // the left of the 5, and the pair is read as one number: 25.
  BUS_CARRY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="62" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">852 ÷ 6 = 142</text>

    <text x="310" y="178" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="470" y="178" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="630" y="178" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <rect x="382" y="208" width="130" height="112" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <rect x="542" y="208" width="130" height="112" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <path d="M 216 330 V 198 H 706" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>

    <text x="150" y="304" font-family="${FONT}" font-size="96" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="310" y="304" font-family="${FONT}" font-size="96" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="412" y="252" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="470" y="304" font-family="${FONT}" font-size="96" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="572" y="252" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>
    <text x="630" y="304" font-family="${FONT}" font-size="96" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <text x="447" y="360" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">read 25</text>
    <text x="607" y="360" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">read 12</text>

    <text x="420" y="440" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Each remainder rides on the next digit.</text>
    <text x="420" y="494" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Nothing is written underneath.</text>
  </svg>`,

  // NEW. The digits run out and the remainder is 3, not 0 — so a point, then a
  // zero, and the carrying goes on. The added point and zeros are teal.
  BUS_ZEROS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="58" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">27 ÷ 4 = 6.75</text>

    <text x="452" y="108" font-family="${FONT}" font-size="22" font-weight="bold" fill="${TEAL}" text-anchor="middle">the points line up</text>
    <line x1="452" y1="120" x2="452" y2="150" stroke="${TEAL}" stroke-width="3" stroke-dasharray="6 6"/>

    <text x="270" y="186" font-family="${FONT}" font-size="68" font-weight="bold" fill="${RULE}" text-anchor="middle">0</text>
    <text x="390" y="186" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="452" y="186" font-family="${FONT}" font-size="68" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="530" y="186" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="670" y="186" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>

    <path d="M 182 326 V 206 H 764" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>

    <text x="120" y="302" font-family="${FONT}" font-size="88" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="270" y="302" font-family="${FONT}" font-size="88" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="338" y="252" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="390" y="302" font-family="${FONT}" font-size="88" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="452" y="302" font-family="${FONT}" font-size="88" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="482" y="252" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">3</text>
    <text x="536" y="302" font-family="${FONT}" font-size="88" font-weight="bold" fill="${TEAL}" text-anchor="middle">0</text>
    <text x="620" y="252" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="674" y="302" font-family="${FONT}" font-size="88" font-weight="bold" fill="${TEAL}" text-anchor="middle">0</text>

    <path d="M 500 336 v 14 H 712 v -14" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round"/>
    <text x="606" y="386" font-family="${FONT}" font-size="24" font-weight="bold" fill="${TEAL}" text-anchor="middle">zeros added after the point</text>

    <text x="190" y="452" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">27 → 6 r 3</text>
    <text x="420" y="452" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">30 → 7 r 2</text>
    <text x="650" y="452" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">20 → 5 r 0</text>
    <text x="420" y="506" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">Remainder 0, so it has finished.</text>
  </svg>`,

  // NEW. The division the classroom vote is about, written the short way: the
  // carries in orange, the four added zeros in teal, and the fourth decimal
  // place — the one that decides — worked out before anything is rounded.
  BUS_STOP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <text x="440" y="52" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">58 ÷ 7, correct to 3 decimal places</text>

    <text x="230" y="160" font-family="${FONT}" font-size="64" font-weight="bold" fill="${RULE}" text-anchor="middle">0</text>
    <text x="335" y="160" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="392" y="160" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="455" y="160" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="560" y="160" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="665" y="160" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="770" y="160" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>

    <path d="M 166 296 V 180 H 822" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>

    <text x="110" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="230" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="289" y="224" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>
    <text x="335" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="392" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="414" y="224" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="460" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${TEAL}" text-anchor="middle">0</text>
    <text x="519" y="224" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">6</text>
    <text x="565" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${TEAL}" text-anchor="middle">0</text>
    <text x="624" y="224" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="670" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${TEAL}" text-anchor="middle">0</text>
    <text x="729" y="224" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>
    <text x="775" y="272" font-family="${FONT}" font-size="84" font-weight="bold" fill="${TEAL}" text-anchor="middle">0</text>

    <path d="M 428 308 v 14 H 808 v -14" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round"/>
    <text x="618" y="358" font-family="${FONT}" font-size="24" font-weight="bold" fill="${TEAL}" text-anchor="middle">4 zeros added after the point</text>

    <text x="440" y="424" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Read 58, then 20, 60, 40, 50. The remainder never reaches 0.</text>

    <rect x="870" y="92" width="220" height="330" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="980" y="138" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">4 places</text>
    <text x="980" y="196" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">8.2857</text>
    <path d="M 980 216 V 262 M 966 250 L 980 264 L 994 250" fill="none" stroke="${KEY}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="1036" y="248" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">round</text>
    <text x="980" y="336" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">8.286</text>
    <text x="980" y="388" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">3 d.p.</text>
  </svg>`,

  DIVIDE_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="560" y="76" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">58 ÷ 7 = 8.285714…</text>

    <rect x="40" y="120" width="480" height="284" rx="16" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="280" y="172" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Stop at 3 places</text>
    <text x="280" y="268" font-family="${FONT}" font-size="76" font-weight="bold" fill="${RED}" text-anchor="middle">8.285</text>
    ${cross(200, 348)}
    <text x="252" y="362" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="start">too early</text>

    <rect x="600" y="120" width="480" height="284" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="840" y="172" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Go to 4, then round</text>
    <text x="840" y="268" font-family="${FONT}" font-size="50" font-weight="bold" fill="${GREEN}" text-anchor="middle">8.2857 → 8.286</text>
    ${tick(760, 348)}
    <text x="812" y="362" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">correct</text>
  </svg>`,

  // Redrawn for 3.2: four rounding and division slips (the classroom sheet's
  // a and b were powers-of-10 mistakes, which belong to 3.1).
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

    <text x="140" y="208" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">a)  9.96 to 1 d.p. = 9.10</text>
    <text x="140" y="288" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">b)  2.7449 to 2 d.p. = 2.75</text>
    <text x="140" y="368" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">c)  0.302 to 2 d.p. = 0.3</text>
    <text x="140" y="448" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">d)  20 ÷ 7 to 2 d.p. = 2.85</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};
