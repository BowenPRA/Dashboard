// src/data/Y7_SCI/U03_5/diagrams.js
// Teaching diagrams for 3.5 Energy (Learner's Book pp. 105–110), ported from
// the classroom deck (content/y7-science/U03_5/diagrams.js).
//
// WHAT CHANGED IN THE PORT
//  · The goals pictures (PIC_HOW_MUCH …) and the vote cards ANS_NO / ANS_YES /
//    ANS_COFFEE / ANS_BANANA are gone: slide 2 of the classroom deck folds into
//    the hero, and a self-study vote is a `predict` whose buttons are the
//    answers. ACTIONS goes with the stand-up game; its poses are drawn on Name
//    That Energy's eight cards instead.
//  · The runners photo comes from public/images/Y7_SCI/U03_5/ through assetUrl.
//  · New: KETTLE_STAIRS (the starter, no answer on it), BOOK_HIGH (the shelf
//    vote, before the answer), COFFEE_BANANA (the second vote, without the
//    hands) and CIRCUIT_ASK (the circuit with a "?" where each label goes, so
//    the book's Question 1 is asked before it is told).
//
//   How much? — energy and the joule
//     KETTLE_STAIRS  one kettle of water = how many floors of stairs?
//     RUNNERS        the book's runners (page 106), as a real photograph
//     JOULES         1 J to lift an apple 1 m; a floor of stairs; a kettle
//   What kind? — stores and transfers
//     BOOK_HIGH      a book on a high shelf, not moving: energy?
//     SHELF          before and after: lifted up, energy stored; knocked off
//     STORES         the book's table (page 107), part 1: the five stores
//     CIRCUIT_ASK    Question 1, asked: the circuit with three "?" labels
//     TRANSFERS      the book's table, part 2: the three transfers (+ thermal)
//   How long? — storing energy
//     COFFEE_BANANA  which has more energy?
//     BANANA         the banana wins, and keeps its energy; the coffee goes cold
//     LASTING        seconds, an hour, years, millions of years
//
// Split diagrams are drawn at 840×560, showcase ones at 1120×440. Label <text>
// is written out literally so `npm run audit:svg` can measure it; the pictures
// come from art.js and carry no text. Diagrams stay in English.
import {
  INK, KEY, MUTED, TEAL, BLUE, GREEN, RED, FONT, STORE, TRANSFER, SEA_EDGE,
  plate, arrow, leader, pose, battery, kettle, book, mug, banana,
  football, bow, bulb, guitar, charging, cliffRock, coal, dam,
} from './art.js';
import { assetUrl } from '../../../utils/assetPaths';

const runnersPhoto = assetUrl('images/Y7_SCI/U03_5/runners.jpg');

// A flight of stairs climbing to the right, and a runner on it.
const stairs = (x, y) => `<path d="M ${x} ${y + 120} H ${x + 40} V ${y + 90} H ${x + 80} V ${y + 60} H ${x + 120} V ${y + 30} H ${x + 160} V ${y} H ${x + 190} V ${y + 120} Z" fill="#e9edf1" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;

// A tall flight: `n` steps of 28 × 36 from (x, y) on the floor, up to the right.
const flight = (x, y, n) => {
  let d = `M ${x} ${y}`;
  for (let i = 0; i < n; i++) d += ` V ${y - 36 * (i + 1)} H ${x + 28 * (i + 1)}`;
  return `<path d="${d} V ${y} Z" fill="#e9edf1" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
};

// A small red apple (about 100 g), centred on (x, y).
const apple = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="0" r="19" fill="${RED}" stroke="${INK}" stroke-width="3"/>
    <path d="M 0 -18 q 2 -9 8 -12" fill="none" stroke="#6b4a2a" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 4 -24 q 10 -8 16 -2 q -8 6 -16 2 z" fill="${GREEN}"/>
  </g>`;

// A card on the table: tinted, with a coloured edge.
const card = (x, y, w, h, color, tint, dashed = false) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${tint}" stroke="${color}" stroke-width="3"${dashed ? ' stroke-dasharray="10 7"' : ''}/>`;

const STORE_TINT = '#e2f2f6';
const TRANSFER_TINT = '#f2ecf7';

// A shelf on the wall, its brackets underneath.
const shelf = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="14" rx="3" fill="#b5835a" stroke="${INK}" stroke-width="3"/>
    <path d="M ${x + 20} ${y + 14} v 26 l 26 -26 M ${x + w - 20} ${y + 14} v 26 l -26 -26" fill="none" stroke="${MUTED}" stroke-width="5" stroke-linejoin="round"/>`;

// The circuit of Question 1 without its labels: a battery, two wires (two
// arrows on them show the energy moving) and a bulb on a red base.
const CIRCUIT_DRAWING = `
    <path d="M 172 226 C 166 120 470 104 520 190 C 556 252 560 330 596 410" fill="none" stroke="${SEA_EDGE}" stroke-width="8" stroke-linecap="round"/>
    <path d="M 330 226 C 334 186 430 190 440 260 C 452 350 430 480 566 486 C 700 492 744 452 690 414" fill="none" stroke="${SEA_EDGE}" stroke-width="8" stroke-linecap="round"/>
    <rect x="160" y="216" width="24" height="40" rx="4" fill="#d9b44a" stroke="${INK}" stroke-width="3"/>
    <rect x="318" y="216" width="24" height="40" rx="4" fill="#d9b44a" stroke="${INK}" stroke-width="3"/>
    <rect x="110" y="250" width="290" height="190" rx="16" fill="#3d8a5a"/>
    <path d="M 110 290 V 266 Q 110 250 126 250 H 384 Q 400 250 400 266 V 290 Z" fill="#2e6b45"/>
    <rect x="110" y="250" width="290" height="190" rx="16" fill="none" stroke="${INK}" stroke-width="4"/>
    <path d="M 172 330 v 32 M 156 346 h 32 M 314 346 h 32" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
    ${bulb(640, 330, 0.9)}
    <rect x="592" y="392" width="96" height="40" rx="8" fill="${RED}" stroke="${INK}" stroke-width="3"/>
    <rect x="566" y="428" width="148" height="16" rx="5" fill="#a52a20" stroke="${INK}" stroke-width="3"/>
    <path d="M 392 135 L 368 123 L 368 147 Z M 562 307 L 567 281 L 544 287 Z" fill="${TRANSFER}" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>`;
export { CIRCUIT_DRAWING };

// A "?" waiting where a label will go (the classroom bus's own mark).
const askBox = (x, y) => `<rect x="${x}" y="${y}" width="56" height="50" rx="12" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>`;

export const DIAGRAMS = {
  // ── How much? ─────────────────────────────────────────────────────────────
  // the starter: a kettle of water, the same energy, a flight of stairs that
  // goes up out of the picture. No numbers: the guess comes first.
  KETTLE_STAIRS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="30" y1="500" x2="810" y2="500" stroke="${INK}" stroke-width="4"/>
    ${kettle(170, 410, 1)}
    <text x="170" y="540" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">1 litre of water, boiled</text>
    <path d="M 340 286 H 412 M 340 310 H 412" stroke="${KEY}" stroke-width="9" stroke-linecap="round"/>
    <text x="376" y="250" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">the same</text>
    <text x="376" y="358" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">energy</text>
    ${flight(470, 500, 11)}
    ${pose('kinetic', 488, 443, 0.42)}
    <rect x="606" y="30" width="200" height="64" rx="14" fill="#fdf1e3" stroke="${KEY}" stroke-width="3"/>
    <text x="706" y="74" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">? floors</text>
  </svg>`,

  // how big one joule is (an apple lifted 1 m), then the book's floor of
  // stairs and its kettle: 1, 2 000, 400 000
  JOULES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="52" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">You need about:</text>
    <rect x="20" y="72" width="800" height="146" rx="16" fill="#f7fafc"/>
    <circle cx="96" cy="190" r="19" fill="none" stroke="#9aa7b4" stroke-width="3" stroke-dasharray="6 5"/>
    ${apple(96, 102, 1)}
    ${arrow(96, 166, 96, 130, TEAL, 5, 14)}
    <path d="M 150 102 H 166 M 158 102 V 190 M 150 190 H 166" fill="none" stroke="${MUTED}" stroke-width="3"/>
    <text x="176" y="154" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">1 m</text>
    <text x="268" y="134" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">lift an apple</text>
    <text x="268" y="172" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">1 metre</text>
    <text x="800" y="160" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="end">1 J</text>
    <rect x="20" y="230" width="800" height="146" rx="16" fill="#f7fafc"/>
    ${stairs(40, 246)}
    ${pose('kinetic', 150, 274, 0.42)}
    <text x="268" y="312" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">1 floor of stairs</text>
    <text x="800" y="318" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="end">2 000 J</text>
    <rect x="20" y="388" width="800" height="146" rx="16" fill="#f7fafc"/>
    ${kettle(132, 470, 0.62)}
    <text x="268" y="456" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">1 litre of cold</text>
    <text x="268" y="494" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">water, boiled</text>
    <text x="800" y="476" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="end">400 000 J</text>
  </svg>`,

  // the book's runners (page 106), as a real photograph, cropped to the panel
  RUNNERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <clipPath id="u35-ru-photo"><rect x="14" y="14" width="812" height="532" rx="12"/></clipPath>
    <image href="${runnersPhoto}" x="14" y="14" width="812" height="532" preserveAspectRatio="xMidYMid slice" clip-path="url(#u35-ru-photo)"/>
  </svg>`,

  // ── What kind? ────────────────────────────────────────────────────────────
  // the vote, before its answer: a book up on a high shelf, still
  BOOK_HIGH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="30" y="30" width="780" height="470" rx="10" fill="#f7fafc"/>
    <line x1="30" y1="500" x2="810" y2="500" stroke="${INK}" stroke-width="4"/>
    ${shelf(300, 200, 240)}
    ${book(420, 150, 1)}
    <path d="M 640 214 V 492" stroke="#9aa7b4" stroke-width="3.5" stroke-dasharray="10 8"/>
    <path d="M 624 214 H 656 M 624 492 H 656" stroke="#9aa7b4" stroke-width="3.5"/>
    <text x="288" y="214" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="end">a high shelf</text>
    <text x="420" y="80" font-family="${FONT}" font-size="25" font-weight="bold" fill="${MUTED}" text-anchor="middle">not moving</text>
  </svg>`,

  // before and after: lifted from the floor onto the shelf, the energy is
  // stored; knock it off and it falls and crashes
  SHELF: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="30" y1="500" x2="810" y2="500" stroke="${INK}" stroke-width="4"/>
    <line x1="430" y1="40" x2="430" y2="500" stroke="#e2e8f0" stroke-width="3"/>
    <text x="40" y="58" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">1. Up on the shelf</text>
    <rect x="64" y="400" width="72" height="100" rx="5" fill="none" stroke="#9aa7b4" stroke-width="3" stroke-dasharray="8 6"/>
    <path d="M 100 390 V 192 Q 100 150 142 150 H 270" fill="none" stroke="${TEAL}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 290 150 L 268 138 L 268 162 Z" fill="${TEAL}"/>
    <text x="118" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${TEAL}">lifted up</text>
    ${shelf(254, 210, 160)}
    ${book(334, 160, 1)}
    ${leader(330, 96, 352, 128, TEAL)}
    <text x="236" y="86" font-family="${FONT}" font-size="25" font-weight="bold" fill="${TEAL}">energy stored</text>
    <text x="458" y="58" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">2. Knocked off</text>
    ${shelf(470, 210, 200)}
    <g transform="rotate(28 600 330)">${book(600, 330, 1)}</g>
    <path d="M 640 200 Q 660 240 632 282" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="8 8"/>
    ${arrow(720, 260, 720, 420, BLUE, 6, 20)}
    <text x="740" y="340" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}">falls</text>
    <path d="M 520 470 l -26 -18 M 520 452 l -12 -30 M 690 470 l 26 -18 M 690 452 l 12 -30" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <text x="605" y="476" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">CRASH!</text>
  </svg>`,

  STORES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${card(14, 14, 206, 412, STORE, STORE_TINT)}
    ${card(232, 14, 206, 412, STORE, STORE_TINT)}
    ${card(450, 14, 206, 412, STORE, STORE_TINT)}
    ${card(668, 14, 206, 412, STORE, STORE_TINT)}
    ${card(886, 14, 220, 412, STORE, STORE_TINT)}
    ${football(117, 140, 0.56)}
    ${battery(335, 140, 0.8)}
    ${mug(553, 150, 0.95)}
    ${bow(771, 140, 0.7)}
    ${cliffRock(996, 150, 0.58)}
    <text x="117" y="296" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">kinetic</text>
    <text x="335" y="296" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">chemical</text>
    <text x="553" y="296" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">thermal</text>
    <text x="771" y="284" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">elastic</text>
    <text x="771" y="316" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">potential</text>
    <text x="996" y="284" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">gravitational</text>
    <text x="996" y="316" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">potential</text>
    <text x="117" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">moving</text>
    <text x="117" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="335" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">food, fuels,</text>
    <text x="335" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">batteries</text>
    <text x="553" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">hot</text>
    <text x="553" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="771" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">stretched or</text>
    <text x="771" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">squashed</text>
    <text x="996" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">lifted up</text>
    <text x="996" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">high</text>
  </svg>`,

  // Question 1, asked: where the classroom's three labels were, a "?" box;
  // the leaders still point at the battery, the wire and the bulb
  CIRCUIT_ASK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${CIRCUIT_DRAWING}
    ${leader(250, 96, 300, 150, KEY)}
    ${askBox(196, 40)}
    <text x="224" y="79" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <text x="268" y="74" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">the wires</text>
    ${leader(700, 164, 668, 260, KEY)}
    ${askBox(672, 108)}
    <text x="700" y="147" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <text x="664" y="142" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="end">the bulb</text>
    ${leader(150, 480, 196, 420, KEY)}
    ${askBox(122, 476)}
    <text x="150" y="515" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <text x="194" y="510" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">the battery</text>
  </svg>`,

  TRANSFERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${card(14, 14, 262, 412, TRANSFER, TRANSFER_TINT)}
    ${card(290, 14, 262, 412, TRANSFER, TRANSFER_TINT)}
    ${card(566, 14, 262, 412, TRANSFER, TRANSFER_TINT)}
    ${card(842, 14, 264, 412, TRANSFER, TRANSFER_TINT, true)}
    ${charging(145, 150, 0.62)}
    ${guitar(418, 150, 0.68)}
    ${bulb(697, 160, 0.95)}
    ${mug(960, 160, 0.9)}
    ${arrow(1032, 120, 1084, 80, RED, 5, 16)}
    ${arrow(1032, 176, 1086, 176, RED, 5, 16)}
    <text x="145" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">electrical</text>
    <text x="421" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">sound</text>
    <text x="697" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">light</text>
    <text x="974" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">thermal</text>
    <text x="145" y="360" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">current in</text>
    <text x="145" y="388" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">a circuit</text>
    <text x="421" y="360" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">from vibrating</text>
    <text x="421" y="388" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="697" y="360" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">from luminous</text>
    <text x="697" y="388" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="974" y="352" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">from hot to</text>
    <text x="974" y="380" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">colder things</text>
    <text x="974" y="412" font-family="${FONT}" font-size="19" font-weight="bold" fill="${STORE}" text-anchor="middle">a store too</text>
  </svg>`,


  // ── How long? ─────────────────────────────────────────────────────────────
  // the second vote, without the hands: a hot coffee or a banana
  COFFEE_BANANA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="30" y="40" width="360" height="430" rx="18" fill="#eaf2fb"/>
    <rect x="450" y="40" width="360" height="430" rx="18" fill="#fdf6dc"/>
    ${mug(210, 270, 1.4)}
    ${banana(630, 270, 1.45)}
    <text x="420" y="282" font-family="${FONT}" font-size="34" font-weight="bold" fill="${MUTED}" text-anchor="middle">or</text>
    <text x="210" y="520" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">a hot coffee</text>
    <text x="630" y="520" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">a banana</text>
  </svg>`,

  BANANA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="54" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">Now</text>
    ${mug(64, 120, 0.42)}
    <rect x="120" y="96" width="66" height="48" rx="8" fill="${RED}"/>
    <text x="200" y="132" font-family="${FONT}" font-size="25" font-weight="bold" fill="${RED}">about 60 000 J</text>
    ${banana(64, 206, 0.38)}
    <rect x="120" y="182" width="440" height="48" rx="8" fill="#e8b923"/>
    <text x="574" y="218" font-family="${FONT}" font-size="25" font-weight="bold" fill="#9a7a10">about 400 000 J</text>
    <line x1="30" y1="272" x2="810" y2="272" stroke="#e2e8f0" stroke-width="3"/>
    <text x="30" y="318" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">1 hour later</text>
    ${mug(64, 388, 0.42, false)}
    <rect x="120" y="364" width="6" height="48" rx="3" fill="${BLUE}"/>
    <text x="142" y="400" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}">cold: its heat has gone</text>
    ${banana(64, 476, 0.38)}
    <rect x="120" y="452" width="440" height="48" rx="8" fill="#e8b923"/>
    <text x="574" y="488" font-family="${FONT}" font-size="25" font-weight="bold" fill="#9a7a10">about 400 000 J</text>
    <text x="810" y="540" font-family="${FONT}" font-size="19" fill="${MUTED}" text-anchor="end">a mug of coffee at 80 °C, in a room at 25 °C</text>
  </svg>`,

  LASTING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="22" y="24" width="390" height="410" rx="16" fill="#fdecee"/>
    <rect x="428" y="24" width="390" height="410" rx="16" fill="#eef6e6"/>
    <text x="217" y="66" font-family="${FONT}" font-size="27" font-weight="bold" fill="${RED}" text-anchor="middle">does not last</text>
    <text x="623" y="66" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREEN}" text-anchor="middle">lasts a long time</text>
    ${football(120, 186, 0.5)}
    ${mug(314, 196, 0.88)}
    ${dam(526, 196, 0.5)}
    ${coal(720, 200, 0.68)}
    <text x="120" y="316" font-family="${FONT}" font-size="25" font-weight="bold" fill="${STORE}" text-anchor="middle">kinetic</text>
    <text x="314" y="316" font-family="${FONT}" font-size="25" font-weight="bold" fill="${STORE}" text-anchor="middle">thermal</text>
    <text x="526" y="304" font-family="${FONT}" font-size="22" font-weight="bold" fill="${STORE}" text-anchor="middle">gravitational</text>
    <text x="526" y="332" font-family="${FONT}" font-size="22" font-weight="bold" fill="${STORE}" text-anchor="middle">potential</text>
    <text x="720" y="316" font-family="${FONT}" font-size="25" font-weight="bold" fill="${STORE}" text-anchor="middle">chemical</text>
    <text x="120" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">a rolling ball</text>
    <text x="314" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">a hot drink</text>
    <text x="526" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">water in a dam</text>
    <text x="720" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">coal and oil</text>
    ${arrow(40, 478, 806, 478, MUTED, 4, 16)}
    <text x="120" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">seconds</text>
    <text x="314" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">an hour</text>
    <text x="526" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">years</text>
    <text x="720" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">millions of years</text>
  </svg>`,
};
