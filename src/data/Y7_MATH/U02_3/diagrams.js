// src/data/Y7_MATH/U02_3/diagrams.js
// Teaching diagrams for 2.3 Collecting Like Terms, ported from the classroom
// deck (C:\Users\bowen\lessons, content/y7-math/U02_3/diagrams.js).
//
// What changed in the port:
//  · the four photos are referenced with assetUrl() from
//    public/images/Y7_MATH/U02_3/, not imported (classroom-dashboard-pairing §3.7);
//  · ANS_8 / ANS_7S / ANS_4X6Y / ANS_10X6Y are gone — they drew a raised hand
//    beside each answer for a class vote, and the self-study deck asks the same
//    question as a `predict` activity instead;
//  · MISTAKES has six lines, not four, so Mr Bowen's homework can be SORTED into
//    right and wrong (two of the six are right);
//  · WB_BRICK_ROW and WB_PYRAMID (+ _SOLVED) are new, for the Practice workbook.
//
// House rules (docs/svg-diagrams.md):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes and images only,
//    because `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · markers are `markerUnits="userSpaceOnUse"`, and a double-headed line uses a
//    separately defined reversed marker at its start;
//  · `split` diagrams are 840×560; `showcase` diagrams are 1120×440 strips.
//
// One colour per KIND of term, the same in every diagram and in widgets.jsx:
// the first letter is teal, the second purple, numbers slate.
//
//   FRUIT_BAG     3 apples + 4 apples = 7 apples, photographed; then in letters
//   ATOMS_SORT    Science 2.5: a jumble of atoms, sorted and counted
//   TERMS         5x + 3y − 2 + x, one box per term
//   WORDS         like / collect / simplify: everyday English against maths
//   LIKE_UNLIKE   2a and 3a are like terms; 2a and 3b are not
//   ONE_X         4x + x = 5x in bricks; 8s − s = 7s in strawberries
//   CANT_COLLECT  5 cm + 3 cm, 5 cm + 3 kg, and 3a + 2b left alone
//   TRICKY        ab and ba · 7 and 2 · x and x²
//   BRICKS_REAL   a real brick wall: the letter is a LENGTH, a number
//   BRICK_ROWS    three rows of x and y bricks — how long is each?
//   RECTANGLE     the perimeter word problem
//   MISTAKES      Mr Bowen's homework, which he has marked 6/6
//   WB_BRICK_ROW  (workbook) one row of x and y bricks, and its _SOLVED twin
//   WB_PYRAMID    (workbook) an algebra pyramid to fill, and its _SOLVED twin

import { assetUrl } from '../../../utils/assetPaths';

const apple = assetUrl('images/Y7_MATH/U02_3/apple.jpg');
const banana = assetUrl('images/Y7_MATH/U02_3/banana.jpg');
const strawberry = assetUrl('images/Y7_MATH/U02_3/strawberry.jpg');
const bricks = assetUrl('images/Y7_MATH/U02_3/bricks.jpg');

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const SLATE = '#5b6770';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const TEAL_T = '#e2f2f6';
const PURPLE_T = '#f2ecf7';
const SLATE_T = '#eef1f4';
const GREEN_T = '#eef6e6';
const RED_T = '#fdecee';
const ORANGE_T = '#fdf1e3';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const img = (href, x, y, w, h) =>
  `<image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`;

const tick = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="34" fill="${GREEN}"/>
    <path d="M ${cx - 17} ${cy + 1} l 12 12 l 22 -26" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;

const cross = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="34" fill="${RED}"/>
    <path d="M ${cx - 13} ${cy - 13} l 26 26 M ${cx + 13} ${cy - 13} l -26 26" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>`;

const ATOM = {
  C: { fill: '#aab4bc', stroke: '#3b444b' },
  O: { fill: '#f08b82', stroke: '#b3261e' },
  H: { fill: '#ffffff', stroke: '#6b7580' },
};
const atom = (cx, cy, k) => `<circle cx="${cx}" cy="${cy}" r="28" fill="${ATOM[k].fill}" stroke="${ATOM[k].stroke}" stroke-width="3"/>`;

// A row of identical fruit photos, left to right.
const fruitRow = (href, x0, y, w, h, n, step) =>
  Array.from({ length: n }, (_, k) => img(href, x0 + k * step, y, w, h)).join('\n    ');

// Striped (x) and checked (y) brick fills, one pattern pair per diagram id.
const brickPatterns = (id) => `<pattern id="u23-stripe-${id}" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
        <rect x="0" y="0" width="14" height="14" fill="#ffffff"/><rect x="0" y="0" width="4" height="14" fill="${INK}"/>
      </pattern>
      <pattern id="u23-check-${id}" patternUnits="userSpaceOnUse" width="16" height="16">
        <rect x="0" y="0" width="16" height="16" fill="#ffffff"/><rect x="0" y="0" width="8" height="8" fill="${SLATE}"/><rect x="8" y="8" width="8" height="8" fill="${SLATE}"/>
      </pattern>`;

// The six-block pyramid used by the workbook: bottom row of three, then two, then one.
const pyramidBlocks = (unknownFill) => `<rect x="295" y="20" width="250" height="90" fill="${unknownFill}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="170" y="110" width="250" height="90" fill="${unknownFill}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="420" y="110" width="250" height="90" fill="${unknownFill}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="45" y="200" width="250" height="90" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2.5"/>
    <rect x="295" y="200" width="250" height="90" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2.5"/>
    <rect x="545" y="200" width="250" height="90" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2.5"/>`;

export const DIAGRAMS = {
  FRUIT_BAG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <!-- apples -->
    <rect x="20" y="16" width="530" height="280" rx="14" fill="#ffffff" stroke="${TEAL}" stroke-width="3"/>
    ${fruitRow(apple, 48, 40, 56, 57, 3, 60)}
    <text x="258" y="86" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    ${fruitRow(apple, 300, 40, 56, 57, 4, 60)}
    <text x="285" y="160" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">3 apples + 4 apples = 7 apples</text>
    <text x="285" y="250" font-family="${FONT}" font-size="50" font-weight="bold" fill="${TEAL}" text-anchor="middle">3a + 4a = 7a</text>

    <!-- bananas -->
    <rect x="570" y="16" width="530" height="280" rx="14" fill="#ffffff" stroke="${PURPLE}" stroke-width="3"/>
    ${fruitRow(banana, 650, 46, 100, 46, 2, 110)}
    <text x="895" y="86" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    ${img(banana, 930, 46, 100, 46)}
    <text x="835" y="160" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">2 bananas + 1 banana = 3 bananas</text>
    <text x="835" y="250" font-family="${FONT}" font-size="50" font-weight="bold" fill="${PURPLE}" text-anchor="middle">2b + b = 3b</text>

    <!-- the whole bag -->
    <rect x="20" y="316" width="1080" height="108" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="700" y="388" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="end">3a + 2b + 4a + b =</text>
    <text x="724" y="388" font-family="${FONT}" font-size="50" font-weight="bold" fill="${KEY}" text-anchor="start">7a + 3b</text>
  </svg>`,

  ATOMS_SORT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <marker id="u23-sort-head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <!-- mixed up -->
    <rect x="20" y="16" width="430" height="290" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(80, 80, 'C')}${atom(190, 66, 'H')}${atom(300, 92, 'O')}${atom(395, 70, 'H')}
    ${atom(140, 165, 'C')}${atom(250, 180, 'O')}${atom(360, 170, 'H')}
    ${atom(85, 250, 'C')}${atom(275, 258, 'H')}
    <text x="80" y="90" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="190" y="76" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="300" y="102" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="395" y="80" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="140" y="175" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="250" y="190" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="360" y="180" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="85" y="260" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="275" y="268" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="235" y="340" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mixed up</text>

    <line x1="468" y1="160" x2="552" y2="160" stroke="${KEY}" stroke-width="5" marker-end="url(#u23-sort-head)"/>
    <text x="508" y="138" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">sort</text>

    <!-- sorted -->
    <rect x="570" y="16" width="530" height="290" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(625, 75, 'C')}${atom(690, 75, 'C')}${atom(755, 75, 'C')}
    ${atom(625, 160, 'O')}${atom(690, 160, 'O')}
    ${atom(625, 245, 'H')}${atom(690, 245, 'H')}${atom(755, 245, 'H')}${atom(820, 245, 'H')}
    <text x="625" y="85" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="690" y="85" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="755" y="85" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="625" y="170" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="690" y="170" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="625" y="255" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="690" y="255" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="755" y="255" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="820" y="255" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="880" y="84" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">3 carbon</text>
    <text x="880" y="169" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">2 oxygen</text>
    <text x="880" y="254" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">4 hydrogen</text>
    <text x="835" y="340" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">Sorted by kind</text>

    <rect x="20" y="362" width="1080" height="66" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="560" y="409" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">9 atoms, but only 3 kinds</text>
  </svg>`,

  TERMS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="96" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">This expression has 4 terms</text>

    <rect x="105" y="170" width="120" height="110" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="245" y="170" width="170" height="110" rx="16" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="3"/>
    <rect x="435" y="170" width="140" height="110" rx="16" fill="${SLATE_T}" stroke="${SLATE}" stroke-width="3"/>
    <rect x="595" y="170" width="140" height="110" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="165" y="244" font-family="${FONT}" font-size="54" font-weight="bold" fill="${TEAL}" text-anchor="middle">5x</text>
    <text x="330" y="244" font-family="${FONT}" font-size="54" font-weight="bold" fill="${PURPLE}" text-anchor="middle">+ 3y</text>
    <text x="505" y="244" font-family="${FONT}" font-size="54" font-weight="bold" fill="${SLATE}" text-anchor="middle">− 2</text>
    <text x="665" y="244" font-family="${FONT}" font-size="54" font-weight="bold" fill="${TEAL}" text-anchor="middle">+ x</text>

    <path d="M 115 300 v 14 H 215 v -14 M 255 300 v 14 H 405 v -14 M 445 300 v 14 H 565 v -14 M 605 300 v 14 H 725 v -14" fill="none" stroke="${KEY}" stroke-width="3" stroke-linejoin="round"/>
    <text x="165" y="356" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">term</text>
    <text x="330" y="356" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">term</text>
    <text x="505" y="356" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">term</text>
    <text x="665" y="356" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">term</text>

    <text x="420" y="450" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">A number on its own is a term too.</text>
    <text x="420" y="496" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">The sign in front stays with its term.</text>
  </svg>`,

  WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <text x="450" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">EVERYDAY ENGLISH</text>
    <text x="760" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">IN MATHS</text>

    <!-- like -->
    <rect x="20" y="66" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="142" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">like</text>
    <path d="M 370 156 C 320 124 334 88 370 110 C 406 88 420 124 370 156 Z" fill="#f08b82" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <text x="450" y="138" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">I like mangoes.</text>
    <text x="760" y="116" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">the same kind</text>
    <text x="760" y="164" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">2a and 5a</text>

    <!-- collect -->
    <rect x="20" y="206" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="282" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">collect</text>
    <rect x="326" y="282" width="96" height="18" rx="3" fill="#cfe5f5" stroke="${INK}" stroke-width="2.5"/>
    <rect x="334" y="264" width="84" height="18" rx="3" fill="#fbe7a1" stroke="${INK}" stroke-width="2.5"/>
    <rect x="322" y="246" width="92" height="18" rx="3" fill="#f08b82" stroke="${INK}" stroke-width="2.5"/>
    <rect x="336" y="228" width="80" height="18" rx="3" fill="#bfe3b5" stroke="${INK}" stroke-width="2.5"/>
    <text x="450" y="278" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">Collect the books.</text>
    <text x="760" y="256" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">put together</text>
    <text x="760" y="304" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">2a + 5a = 7a</text>

    <!-- simplify -->
    <rect x="20" y="346" width="1080" height="112" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="416" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">simplify</text>
    <path d="M 306 404 q 10 -34 20 0 t 20 0 t 20 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 376 404 h 14 m -6 -7 l 7 7 l -7 7" fill="none" stroke="${KEY}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="400" y1="404" x2="428" y2="404" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <text x="450" y="412" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">Make it simple.</text>
    <text x="760" y="390" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">write it shorter</text>
    <text x="760" y="436" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">a + a + a = 3a</text>
  </svg>`,

  LIKE_UNLIKE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <!-- like -->
    <rect x="24" y="30" width="792" height="230" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="100" y="120" font-family="${FONT}" font-size="68" font-weight="bold" fill="${TEAL}" text-anchor="middle">2a</text>
    <text x="205" y="112" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">and</text>
    <text x="310" y="120" font-family="${FONT}" font-size="68" font-weight="bold" fill="${TEAL}" text-anchor="middle">3a</text>
    ${fruitRow(apple, 56, 158, 44, 45, 2, 48)}
    ${fruitRow(apple, 242, 158, 44, 45, 3, 48)}
    ${tick(470, 140)}
    <text x="524" y="136" font-family="${FONT}" font-size="36" font-weight="bold" fill="${GREEN}" text-anchor="start">like terms</text>
    <text x="524" y="180" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">same letter</text>

    <!-- not like -->
    <rect x="24" y="300" width="792" height="230" rx="16" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="100" y="390" font-family="${FONT}" font-size="68" font-weight="bold" fill="${TEAL}" text-anchor="middle">2a</text>
    <text x="205" y="382" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">and</text>
    <text x="310" y="390" font-family="${FONT}" font-size="68" font-weight="bold" fill="${PURPLE}" text-anchor="middle">3b</text>
    ${fruitRow(apple, 56, 428, 44, 45, 2, 48)}
    ${fruitRow(banana, 234, 438, 52, 24, 3, 54)}
    ${cross(470, 410)}
    <text x="524" y="406" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="start">not like terms</text>
    <text x="524" y="450" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">different letters</text>
  </svg>`,

  ONE_X: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <pattern id="u23-stripe-onex" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
        <rect x="0" y="0" width="14" height="14" fill="#ffffff"/><rect x="0" y="0" width="4" height="14" fill="${INK}"/>
      </pattern>
    </defs>

    <!-- 4x + x -->
    <rect x="24" y="24" width="792" height="252" rx="16" fill="#ffffff" stroke="${TEAL}" stroke-width="3"/>
    <rect x="130" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="230" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="330" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="430" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${INK}" stroke-width="2.5"/>
    <text x="570" y="100" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <rect x="610" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${INK}" stroke-width="2.5"/>
    <text x="180" y="146" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">x</text>
    <text x="280" y="146" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">x</text>
    <text x="380" y="146" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">x</text>
    <text x="480" y="146" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">x</text>
    <text x="660" y="146" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">x</text>
    <text x="420" y="218" font-family="${FONT}" font-size="52" font-weight="bold" fill="${KEY}" text-anchor="middle">4x + x = 5x</text>
    <text x="420" y="256" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">One brick is x. That is 1x.</text>

    <!-- 8s − s -->
    <rect x="24" y="296" width="792" height="240" rx="16" fill="#ffffff" stroke="${PURPLE}" stroke-width="3"/>
    ${fruitRow(strawberry, 160, 326, 58, 44, 8, 66)}
    <path d="M 616 322 L 686 374 M 686 322 L 616 374" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>
    <text x="420" y="446" font-family="${FONT}" font-size="52" font-weight="bold" fill="${KEY}" text-anchor="middle">8s − s = 7s</text>
    <text x="420" y="494" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">One is eaten. 7 are left.</text>
  </svg>`,

  CANT_COLLECT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="150" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="64" y="104" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="start">5 cm + 3 cm = 8 cm</text>
    <text x="64" y="148" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">the same unit</text>
    ${tick(740, 99)}

    <rect x="24" y="194" width="792" height="150" rx="16" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="64" y="274" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="start">5 cm + 3 kg = ?</text>
    <text x="64" y="318" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">different units</text>
    ${cross(740, 269)}

    <rect x="24" y="364" width="792" height="172" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="64" y="470" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="start">3a + 2b</text>
    <text x="440" y="440" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">already in</text>
    <text x="440" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">simplest form</text>
  </svg>`,

  TRICKY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="160" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="56" y="96" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="start">4ab and 3ba</text>
    <text x="56" y="148" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="start">a × b = b × a</text>
    ${tick(560, 104)}
    <text x="612" y="116" font-family="${FONT}" font-size="36" font-weight="bold" fill="${GREEN}" text-anchor="start">like</text>

    <rect x="24" y="200" width="792" height="160" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="56" y="272" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="start">7 and 2</text>
    <text x="56" y="324" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="start">both are numbers</text>
    ${tick(560, 280)}
    <text x="612" y="292" font-family="${FONT}" font-size="36" font-weight="bold" fill="${GREEN}" text-anchor="start">like</text>

    <rect x="24" y="376" width="792" height="160" rx="16" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="56" y="448" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="start">x and x²</text>
    <text x="56" y="500" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="start">x² means x × x</text>
    ${cross(560, 456)}
    <text x="612" y="468" font-family="${FONT}" font-size="36" font-weight="bold" fill="${RED}" text-anchor="start">not like</text>
  </svg>`,

  BRICKS_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <clipPath id="u23-wall-clip"><rect x="20" y="16" width="520" height="346" rx="12"/></clipPath>
      <marker id="u23-wall-end" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u23-wall-start" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${KEY}"/></marker>
      <marker id="u23-wall-end-ink" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
      <marker id="u23-wall-start-ink" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${INK}"/></marker>
    </defs>

    <image href="${bricks}" x="20" y="16" width="520" height="346" preserveAspectRatio="xMidYMid slice" clip-path="url(#u23-wall-clip)"/>
    <rect x="20" y="16" width="520" height="346" rx="12" fill="none" stroke="${RULE}" stroke-width="2"/>
    <text x="280" y="408" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">A real brick wall</text>

    <rect x="600" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="696" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="792" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="888" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="984" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>

    <line x1="604" y1="168" x2="692" y2="168" stroke="${KEY}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="700" y1="168" x2="788" y2="168" stroke="${KEY}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="796" y1="168" x2="884" y2="168" stroke="${KEY}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="892" y1="168" x2="980" y2="168" stroke="${KEY}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="988" y1="168" x2="1076" y2="168" stroke="${KEY}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <text x="648" y="212" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="744" y="212" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="840" y="212" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="936" y="212" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="1032" y="212" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>

    <line x1="602" y1="250" x2="1078" y2="250" stroke="${INK}" stroke-width="3" marker-start="url(#u23-wall-start-ink)" marker-end="url(#u23-wall-end-ink)"/>
    <text x="840" y="310" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">total length = 5x</text>
    <text x="840" y="366" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">x is a number:</text>
    <text x="840" y="402" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">the length of one brick</text>
  </svg>`,

  BRICK_ROWS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      ${brickPatterns('rows')}
      <marker id="u23-rows-end" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
      <marker id="u23-rows-start" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${INK}"/></marker>
    </defs>

    <!-- key -->
    <rect x="80" y="24" width="110" height="40" fill="url(#u23-stripe-rows)" stroke="${INK}" stroke-width="2.5"/>
    <text x="206" y="54" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="start">x cm</text>
    <rect x="400" y="24" width="170" height="40" fill="url(#u23-check-rows)" stroke="${INK}" stroke-width="2.5"/>
    <text x="586" y="54" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}" text-anchor="start">y cm</text>
    <line x1="24" y1="92" x2="816" y2="92" stroke="${RULE}" stroke-width="2"/>

    <!-- a: x x y -->
    <text x="40" y="152" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <rect x="80" y="120" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="190" y="120" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="300" y="120" width="170" height="44" fill="url(#u23-check-rows)" stroke="${INK}" stroke-width="2.5"/>
    <line x1="82" y1="196" x2="468" y2="196" stroke="${INK}" stroke-width="2.5" marker-start="url(#u23-rows-start)" marker-end="url(#u23-rows-end)"/>
    <rect x="255" y="178" width="40" height="36" fill="#ffffff"/>
    <text x="275" y="207" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">?</text>

    <!-- b: y x y -->
    <text x="40" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">b</text>
    <rect x="80" y="250" width="170" height="44" fill="url(#u23-check-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="250" y="250" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="360" y="250" width="170" height="44" fill="url(#u23-check-rows)" stroke="${INK}" stroke-width="2.5"/>
    <line x1="82" y1="326" x2="528" y2="326" stroke="${INK}" stroke-width="2.5" marker-start="url(#u23-rows-start)" marker-end="url(#u23-rows-end)"/>
    <rect x="285" y="308" width="40" height="36" fill="#ffffff"/>
    <text x="305" y="337" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">?</text>

    <!-- c: x y x y x -->
    <text x="40" y="412" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">c</text>
    <rect x="80" y="380" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="190" y="380" width="170" height="44" fill="url(#u23-check-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="360" y="380" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="470" y="380" width="170" height="44" fill="url(#u23-check-rows)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="640" y="380" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${INK}" stroke-width="2.5"/>
    <line x1="82" y1="456" x2="748" y2="456" stroke="${INK}" stroke-width="2.5" marker-start="url(#u23-rows-start)" marker-end="url(#u23-rows-end)"/>
    <rect x="395" y="438" width="40" height="36" fill="#ffffff"/>
    <text x="415" y="467" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">?</text>
  </svg>`,

  RECTANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="200" y="150" width="440" height="230" fill="${TEAL_T}" stroke="${INK}" stroke-width="4"/>
    <text x="420" y="126" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">2x + 1</text>
    <text x="420" y="438" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">2x + 1</text>
    <text x="160" y="280" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="680" y="280" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="420" y="512" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">All lengths are in cm.</text>
  </svg>`,

  MISTAKES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="40" y="16" width="760" height="528" rx="6" fill="#fffdf5" stroke="#d8cfa8" stroke-width="2"/>
    <line x1="60" y1="140" x2="780" y2="140" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="204" x2="780" y2="204" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="268" x2="780" y2="268" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="332" x2="780" y2="332" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="396" x2="780" y2="396" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="460" x2="780" y2="460" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="524" x2="780" y2="524" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="120" y1="26" x2="120" y2="534" stroke="#e8a0a0" stroke-width="2"/>

    <text x="140" y="80" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">Mr Bowen’s homework</text>
    <circle cx="704" cy="72" r="44" fill="none" stroke="${RED}" stroke-width="4"/>
    <text x="704" y="85" font-family="${HAND}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">6/6</text>
    <text x="140" y="126" font-family="${HAND}" font-size="26" fill="${MUTED}" text-anchor="start">Simplify.</text>

    <text x="140" y="192" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">a)  3x + 5 = 8x</text>
    <text x="140" y="256" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">b)  6y − y = 6</text>
    <text x="140" y="320" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">c)  5k + k = 6k</text>
    <text x="140" y="384" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">d)  4p + 2q + p = 6pq</text>
    <text x="140" y="448" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">e)  9 + 2w − 4 = 2w + 5</text>
    <text x="140" y="512" font-family="${HAND}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">f)  2ab + 3ba (no like terms)</text>

    <path d="M 728 176 l 12 14 l 24 -30 M 728 240 l 12 14 l 24 -30 M 728 304 l 12 14 l 24 -30 M 728 368 l 12 14 l 24 -30 M 728 432 l 12 14 l 24 -30 M 728 496 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── Workbook ──────────────────────────────────────────────────────────────
  // One row: y x y y x (2x + 3y). The question asks for the length as boxes.
  WB_BRICK_ROW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 300" class="w-full h-full">
    ${plate(840, 300)}
    <defs>
      ${brickPatterns('wb')}
      <marker id="u23-wb-end" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
      <marker id="u23-wb-start" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${INK}"/></marker>
    </defs>

    <rect x="140" y="24" width="110" height="40" fill="url(#u23-stripe-wb)" stroke="${INK}" stroke-width="2.5"/>
    <text x="266" y="54" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="start">x cm</text>
    <rect x="440" y="24" width="170" height="40" fill="url(#u23-check-wb)" stroke="${INK}" stroke-width="2.5"/>
    <text x="626" y="54" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}" text-anchor="start">y cm</text>
    <line x1="24" y1="92" x2="816" y2="92" stroke="${RULE}" stroke-width="2"/>

    <rect x="55" y="130" width="170" height="50" fill="url(#u23-check-wb)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="225" y="130" width="110" height="50" fill="url(#u23-stripe-wb)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="335" y="130" width="170" height="50" fill="url(#u23-check-wb)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="505" y="130" width="170" height="50" fill="url(#u23-check-wb)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="675" y="130" width="110" height="50" fill="url(#u23-stripe-wb)" stroke="${INK}" stroke-width="2.5"/>
    <line x1="57" y1="222" x2="783" y2="222" stroke="${INK}" stroke-width="2.5" marker-start="url(#u23-wb-start)" marker-end="url(#u23-wb-end)"/>
    <rect x="390" y="200" width="60" height="44" fill="#ffffff"/>
    <text x="420" y="235" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">?</text>
  </svg>`,

  WB_BRICK_ROW_SOLVED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 300" class="w-full h-full">
    ${plate(840, 300)}
    <defs>
      ${brickPatterns('wbs')}
      <marker id="u23-wbs-end" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
      <marker id="u23-wbs-start" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${INK}"/></marker>
    </defs>

    <rect x="140" y="24" width="110" height="40" fill="url(#u23-stripe-wbs)" stroke="${INK}" stroke-width="2.5"/>
    <text x="266" y="54" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="start">x cm</text>
    <rect x="440" y="24" width="170" height="40" fill="url(#u23-check-wbs)" stroke="${INK}" stroke-width="2.5"/>
    <text x="626" y="54" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}" text-anchor="start">y cm</text>
    <line x1="24" y1="92" x2="816" y2="92" stroke="${RULE}" stroke-width="2"/>

    <rect x="55" y="130" width="170" height="50" fill="url(#u23-check-wbs)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="225" y="130" width="110" height="50" fill="url(#u23-stripe-wbs)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="335" y="130" width="170" height="50" fill="url(#u23-check-wbs)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="505" y="130" width="170" height="50" fill="url(#u23-check-wbs)" stroke="${INK}" stroke-width="2.5"/>
    <rect x="675" y="130" width="110" height="50" fill="url(#u23-stripe-wbs)" stroke="${INK}" stroke-width="2.5"/>
    <line x1="57" y1="222" x2="783" y2="222" stroke="${INK}" stroke-width="2.5" marker-start="url(#u23-wbs-start)" marker-end="url(#u23-wbs-end)"/>
    <rect x="320" y="198" width="200" height="48" fill="#ffffff"/>
    <text x="420" y="236" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">2x + 3y</text>
    <text x="420" y="284" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">two x bricks and three y bricks</text>
  </svg>`,

  // Bottom row 2m, 3m + 1, m. Middle 5m + 1, 4m + 1. Top 9m + 2.
  WB_PYRAMID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 310" class="w-full h-full">
    ${plate(840, 310)}
    ${pyramidBlocks('#f1f5f9')}
    <text x="420" y="80" font-family="${FONT}" font-size="40" font-weight="bold" fill="#9aa5ae" text-anchor="middle">?</text>
    <text x="295" y="170" font-family="${FONT}" font-size="40" font-weight="bold" fill="#9aa5ae" text-anchor="middle">?</text>
    <text x="545" y="170" font-family="${FONT}" font-size="40" font-weight="bold" fill="#9aa5ae" text-anchor="middle">?</text>
    <text x="170" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2m</text>
    <text x="420" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">3m + 1</text>
    <text x="670" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
  </svg>`,

  WB_PYRAMID_SOLVED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 310" class="w-full h-full">
    ${plate(840, 310)}
    ${pyramidBlocks(ORANGE_T)}
    <text x="420" y="80" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">9m + 2</text>
    <text x="295" y="170" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">5m + 1</text>
    <text x="545" y="170" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">4m + 1</text>
    <text x="170" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2m</text>
    <text x="420" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">3m + 1</text>
    <text x="670" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
  </svg>`,
};
