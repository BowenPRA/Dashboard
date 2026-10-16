// src/data/Y7_MATH/U04_3/diagrams.js
// Teaching diagrams for 4.3 Multiplying decimals. Four are ported from the
// classroom decks (C:\Users\bowen\lessons, content/y7-math/U04_1_4 and
// U04_review); two are new.
//
// House rules (classroom LESSON-PLAYBOOK §5, kept here):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan>: two colours in one line are two <text> elements;
//  · markers are `markerUnits="userSpaceOnUse"`, with ids prefixed u43-;
//  · `split` diagrams are 840×560; `showcase` diagrams are wide strips.
//
// Colour carries one meaning throughout: ORANGE is the point (and a zero the
// student writes in), GREEN is right, RED is wrong, TEAL is the estimate.
//
//   RULER        one 0.3 m ribbon and a 2 m rule — the hotspot: where do four end?  (new)
//   RIBBON       four 0.3 m ribbons on a metre rule reach 1.2 m           (U04_1_4)
//   POINT_OUT    3.2 × 7: take the point out, multiply, put it back        (U04_1_4)
//   GRID_47_32   47 × 32 = 1504, then the estimate places the point        (U04_review)
//   MISTAKES     Mr Bowen's multiplying homework, which he has marked 4/4  (new: four × slips)
//   WORDS_OPS    the English that tells you which operation                (U04_1_4)
//
// Changed from the classroom: the ANS_* vote cards (a raised hand beside each
// answer) are gone — the self-study deck asks with a `predict` activity — and
// MISTAKES is redrawn: the classroom's had one line from each of 4.1–4.4; this
// one has four multiplying slips, one per sort bin.

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const TEAL = '#0087a8';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const ORANGE_T = '#fdf1e3';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

// The metre rule's tick marks (RIBBON): every 0.1 m, taller at each half metre.
const rulerTicks = () => Array.from({ length: 16 }, (_, k) => {
  const x = 80 + 64 * k;
  const tall = k % 5 === 0;
  return `<line x1="${x}" y1="262" x2="${x}" y2="${tall ? 304 : 284}" stroke="${INK}" stroke-width="${tall ? 3 : 2}"/>`;
}).join('');

// The 2 m rule's tick marks (RULER): x = 60 + 400 × metres, every 0.1 m.
const longTicks = () => Array.from({ length: 21 }, (_, k) => {
  const x = 60 + 40 * k;
  const tall = k % 5 === 0;
  return `<line x1="${x}" y1="150" x2="${x}" y2="${tall ? 186 : 170}" stroke="${INK}" stroke-width="${tall ? 3 : 2}"/>`;
}).join('');

export const DIAGRAMS = {
  // ── The hotspot: where do four 0.3 m ribbons end? ────────────────────────
  // Scale: x = 60 + 400 × metres. Targets (in the activity): 0.12 m at 108,
  // 0.7 m at 340, 1.2 m at 540, 1.6 m at 700 — all on the rule, y = 168.
  // Every label is class="keep": a hotspot strips the other text.
  RULER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 260" class="w-full h-full">
    ${plate(920, 260)}
    <text class="keep" x="460" y="42" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Four ribbons like this one, end to end</text>
    <rect x="60" y="76" width="120" height="40" fill="#fbe1c4" stroke="${KEY}" stroke-width="3"/>
    <text class="keep" x="120" y="105" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>
    <text class="keep" x="200" y="108" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">× 4</text>
    <rect x="40" y="150" width="840" height="46" rx="4" fill="#fbf3dd" stroke="${INK}" stroke-width="2"/>
    ${longTicks()}
    <text class="keep" x="60" y="234" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">0 m</text>
    <text class="keep" x="260" y="234" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">0.5 m</text>
    <text class="keep" x="460" y="234" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">1 m</text>
    <text class="keep" x="660" y="234" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">1.5 m</text>
    <text class="keep" x="860" y="234" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">2 m</text>
  </svg>`,

  // ── Four lots of 0.3 m ───────────────────────────────────────────────────
  // Scale: x = 80 + 640 × metres, so 0.3 m is 192 px and 1 m is at x = 720.
  RIBBON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="560" y="58" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">0.3 × 4 = 0.3 + 0.3 + 0.3 + 0.3</text>

    <rect x="80" y="172" width="192" height="56" fill="#fbe1c4" stroke="${KEY}" stroke-width="3"/>
    <rect x="272" y="172" width="192" height="56" fill="#f4c08c" stroke="${KEY}" stroke-width="3"/>
    <rect x="464" y="172" width="192" height="56" fill="#fbe1c4" stroke="${KEY}" stroke-width="3"/>
    <rect x="656" y="172" width="192" height="56" fill="#f4c08c" stroke="${KEY}" stroke-width="3"/>
    <text x="176" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>
    <text x="368" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>
    <text x="560" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>
    <text x="752" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>

    <rect x="60" y="262" width="1000" height="58" rx="4" fill="#fbf3dd" stroke="${INK}" stroke-width="2"/>
    ${rulerTicks()}
    <text x="80" y="356" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0 m</text>
    <text x="400" y="356" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0.5 m</text>
    <text x="720" y="356" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">1 m</text>
    <text x="1040" y="356" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">1.5 m</text>

    <line x1="848" y1="172" x2="848" y2="382" stroke="${GREEN}" stroke-width="4" stroke-dasharray="10 8"/>
    <text x="848" y="420" font-family="${FONT}" font-size="40" font-weight="bold" fill="${GREEN}" text-anchor="middle">1.2 m</text>
  </svg>`,

  // ── Point out, point back ────────────────────────────────────────────────
  POINT_OUT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u43-dn" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="88" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">3.2 × 7</text>
    <line x1="420" y1="108" x2="420" y2="160" stroke="${KEY}" stroke-width="4" marker-end="url(#u43-dn)"/>
    <text x="440" y="144" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">take the point out</text>

    <text x="420" y="218" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">32 × 7 = 224</text>
    <line x1="420" y1="238" x2="420" y2="290" stroke="${KEY}" stroke-width="4" marker-end="url(#u43-dn)"/>
    <text x="440" y="274" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">put it back: 1 decimal place</text>

    <text x="420" y="348" font-family="${FONT}" font-size="60" font-weight="bold" fill="${GREEN}" text-anchor="middle">3.2 × 7 = 22.4</text>

    <rect x="60" y="392" width="720" height="140" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="448" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Estimate: 3 × 7 = 21</text>
    <text x="420" y="500" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">22.4 is close. 224 and 2.24 are not.</text>
  </svg>`,

  // ── The grid method, then the estimate (U04_review slide 4) ──────────────
  GRID_47_32: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="44" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1. Take the point out: 47 × 32</text>

    <rect x="170" y="76" width="120" height="60" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="290" y="76" width="200" height="60" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="490" y="76" width="200" height="60" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="230" y="117" font-family="${FONT}" font-size="32" font-weight="bold" fill="${MUTED}" text-anchor="middle">×</text>
    <text x="390" y="117" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">40</text>
    <text x="590" y="117" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>

    <rect x="170" y="136" width="120" height="70" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="290" y="136" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="490" y="136" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="230" y="182" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">30</text>
    <text x="390" y="182" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">1200</text>
    <text x="590" y="182" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">210</text>

    <rect x="170" y="206" width="120" height="70" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="290" y="206" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="490" y="206" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="230" y="252" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="390" y="252" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">80</text>
    <text x="590" y="252" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">14</text>

    <text x="420" y="326" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">1200 + 210 + 80 + 14 = 1504</text>

    <rect x="40" y="356" width="760" height="180" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="404" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">2. Estimate: 4.7 × 32 is about 5 × 30 = 150</text>
    <text x="420" y="462" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">3. Put the point in: 1504 → 150.4</text>
    <text x="420" y="514" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">150.4 is close to 150. 15.04 and 1504 are not.</text>
  </svg>`,

  // ── Mr Bowen's homework: four multiplying slips, one per sort bin ────────
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

    <text x="140" y="208" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">a)  0.6 × 3 = 0.18</text>
    <text x="140" y="288" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">b)  0.04 × 2 = 0.8</text>
    <text x="140" y="368" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">c)  3.5 × 12 = 4.20</text>
    <text x="140" y="448" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">d)  1.6 × 4 = 64</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── The English that picks the operation (U04_1_4 slide 19) ──────────────
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
};
