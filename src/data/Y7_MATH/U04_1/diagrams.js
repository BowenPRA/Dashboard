// src/data/Y7_MATH/U04_1/diagrams.js
// Teaching diagrams for 4.1 Ordering decimals. SAY_IT and ORDER_COLS are
// ported unchanged from the classroom deck (lessons/content/y7-math/U04_1_4/
// diagrams.js); the other five are new for the self-study deck.
//
// House rules (as the classroom deck and 3.1–3.2):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan>: two colours in one line are two <text> elements;
//  · markers are `markerUnits="userSpaceOnUse"`, with ids prefixed u41-;
//  · `split` diagrams are 840×560; `showcase` diagrams are wide strips.
//
// Colour carries one meaning throughout: ORANGE is a zero (or a point) the
// student writes in, GREEN is right, RED is wrong.
//
//   SAY_IT        "three point two five", and a point, not a comma (classroom)
//   ORDER_COLS    3.30 over 3.25: the tenths decide (classroom)
//   FILL_ZEROS    the starter list lined up and filled to 3 decimal places
//   SIGNS         < is less than, > is greater than, read aloud
//   WHOLE_FIRST   12.5 against 9.875: the whole-number part decides
//   SAME_UNIT     1.8 kg against 1795 g: change to grams first
//   HOMEWORK      Mr Bowen's six comparisons, which he has marked 6/6

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

const tick = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GREEN}"/>
    <path d="M ${cx - r * 0.5} ${cy + 0.03 * r} l ${r * 0.35} ${r * 0.35} l ${r * 0.65} -${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round" stroke-linejoin="round"/>`;

const cross = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}"/>
    <path d="M ${cx - r * 0.38} ${cy - r * 0.38} l ${r * 0.76} ${r * 0.76} M ${cx + r * 0.38} ${cy - r * 0.38} l -${r * 0.76} ${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round"/>`;

// One row of a place-value strip: a cell per column, at the given x edges.
const cellRow = (edges, top, h, fill = '#ffffff', stroke = INK) =>
  edges.slice(0, -1).map((x, k) => `<rect x="${x}" y="${top}" width="${edges[k + 1] - x}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`).join('');

// FILL_ZEROS columns: ones | point | tenths | hundredths | thousandths
const FZ = [200, 290, 330, 450, 570, 690];
// WHOLE_FIRST columns: tens | ones | point | tenths | hundredths | thousandths
const WF = [150, 260, 370, 410, 520, 630, 740];

// A self-marking tick, as Mr Bowen draws it.
const redTick = (x, y) => `<path d="M ${x} ${y} l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;

export const DIAGRAMS = {
  // ── Say it, write it (classroom) ─────────────────────────────────────────
  SAY_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="60" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">SAY IT</text>
    <rect x="20" y="62" width="1080" height="160" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="180" y="172" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">3.25</text>
    ${tick(400, 110, 24)}
    <text x="440" y="123" font-family="${FONT}" font-size="38" font-weight="bold" fill="${GREEN}" text-anchor="start">three point two five</text>
    ${cross(400, 180, 24)}
    <text x="440" y="193" font-family="${FONT}" font-size="38" font-weight="bold" fill="${RED}" text-anchor="start">three point twenty-five</text>

    <text x="60" y="264" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">WRITE IT</text>
    <rect x="20" y="280" width="1080" height="142" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    ${tick(90, 351, 26)}
    <text x="130" y="374" font-family="${FONT}" font-size="66" font-weight="bold" fill="${GREEN}" text-anchor="start">3.25</text>
    ${cross(370, 351, 26)}
    <text x="410" y="374" font-family="${FONT}" font-size="66" font-weight="bold" fill="${RED}" text-anchor="start">3,25</text>
    <text x="600" y="336" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="start">In English, a comma is for thousands:</text>
    <text x="600" y="392" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="start">3,250 = 3250</text>
  </svg>`,

  // ── Compare: the tenths decide (classroom) ───────────────────────────────
  ORDER_COLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="56" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Line up the points</text>

    <text x="295" y="108" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">whole-number part</text>
    <text x="540" y="108" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">decimal part</text>
    <path d="M 236 120 v 10 H 354 v -10 M 416 120 v 10 H 664 v -10" fill="none" stroke="${KEY}" stroke-width="2.5" stroke-linejoin="round"/>

    <rect x="230" y="146" width="130" height="44" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="360" y="146" width="50" height="44" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="410" y="146" width="130" height="44" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="540" y="146" width="130" height="44" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <text x="295" y="175" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="475" y="175" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="605" y="175" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">hundredths</text>

    <rect x="230" y="190" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="360" y="190" width="50" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="410" y="190" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="540" y="190" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="295" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="385" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="475" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="605" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>

    <rect x="230" y="280" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="360" y="280" width="50" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="410" y="280" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="540" y="280" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="295" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="385" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="475" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="605" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>

    <rect x="412" y="192" width="126" height="176" fill="none" stroke="${GREEN}" stroke-width="6" rx="4"/>

    <text x="420" y="428" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">3 tenths beat 2 tenths</text>
    <text x="420" y="484" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">3.3 &gt; 3.25</text>
    <text x="420" y="534" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">The orange zero changes nothing: 3.3 = 3.30</text>
  </svg>`,

  // ── The starter list, lined up and filled ────────────────────────────────
  FILL_ZEROS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="60" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Fill with zeros: 3 decimal places each</text>

    ${cellRow(FZ, 96, 40, '#f7f9fa', RULE)}
    <text x="245" y="123" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="390" y="123" font-family="${FONT}" font-size="18" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="510" y="123" font-family="${FONT}" font-size="18" fill="${KEY}" text-anchor="middle">hundredths</text>
    <text x="630" y="123" font-family="${FONT}" font-size="18" fill="${KEY}" text-anchor="middle">thousandths</text>
    <text x="760" y="123" font-family="${FONT}" font-size="18" font-weight="bold" fill="${TEAL}" text-anchor="middle">order</text>

    ${cellRow(FZ, 140, 74)}
    <text x="245" y="194" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="310" y="194" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="390" y="194" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="510" y="194" font-family="${FONT}" font-size="52" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="630" y="194" font-family="${FONT}" font-size="52" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>

    ${cellRow(FZ, 214, 74)}
    <text x="245" y="268" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="310" y="268" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="390" y="268" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="510" y="268" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="630" y="268" font-family="${FONT}" font-size="52" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>

    ${cellRow(FZ, 288, 74)}
    <text x="245" y="342" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="310" y="342" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="390" y="342" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
    <text x="510" y="342" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="630" y="342" font-family="${FONT}" font-size="52" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>

    ${cellRow(FZ, 362, 74)}
    <text x="245" y="416" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="310" y="416" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="390" y="416" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="510" y="416" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="630" y="416" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <circle cx="760" cy="177" r="28" fill="${TEAL}"/>
    <circle cx="760" cy="251" r="28" fill="${TEAL}"/>
    <circle cx="760" cy="325" r="28" fill="${TEAL}"/>
    <circle cx="760" cy="399" r="28" fill="${TEAL}"/>
    <text x="760" y="185" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">4th</text>
    <text x="760" y="259" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">2nd</text>
    <text x="760" y="333" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">1st</text>
    <text x="760" y="407" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">3rd</text>

    <text x="420" y="484" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">3.05 &lt; 3.25 &lt; 3.252 &lt; 3.3</text>
    <text x="420" y="532" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">The orange zeros change nothing. They line the numbers up.</text>
  </svg>`,

  // ── The two signs, read aloud ────────────────────────────────────────────
  SIGNS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="20" y="24" width="800" height="226" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="44" y="60" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="start">GREATER THAN</text>
    <text x="360" y="150" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="end">5.1</text>
    <text x="420" y="150" font-family="${FONT}" font-size="84" font-weight="bold" fill="${KEY}" text-anchor="middle">&gt;</text>
    <text x="480" y="150" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="start">5.09</text>
    <text x="420" y="218" font-family="${FONT}" font-size="32" font-weight="bold" fill="${GREEN}" text-anchor="middle">5.1 is greater than 5.09</text>

    <rect x="20" y="270" width="800" height="226" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="44" y="306" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="start">LESS THAN</text>
    <text x="360" y="396" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="end">0.35</text>
    <text x="420" y="396" font-family="${FONT}" font-size="84" font-weight="bold" fill="${KEY}" text-anchor="middle">&lt;</text>
    <text x="480" y="396" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="start">0.5</text>
    <text x="420" y="464" font-family="${FONT}" font-size="32" font-weight="bold" fill="${GREEN}" text-anchor="middle">0.35 is less than 0.5</text>

    <text x="420" y="538" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">The open side faces the bigger number.</text>
  </svg>`,

  // ── The whole-number part decides first ──────────────────────────────────
  WHOLE_FIRST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Whole-number part first</text>

    ${cellRow(WF, 92, 40, '#f7f9fa', RULE)}
    <text x="205" y="118" font-family="${FONT}" font-size="16" fill="${MUTED}" text-anchor="middle">tens</text>
    <text x="315" y="118" font-family="${FONT}" font-size="16" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="465" y="118" font-family="${FONT}" font-size="16" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="575" y="118" font-family="${FONT}" font-size="16" fill="${KEY}" text-anchor="middle">hundredths</text>
    <text x="685" y="118" font-family="${FONT}" font-size="16" fill="${KEY}" text-anchor="middle">thousandths</text>

    ${cellRow(WF, 136, 86)}
    <text x="205" y="198" font-family="${FONT}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="315" y="198" font-family="${FONT}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="390" y="198" font-family="${FONT}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="465" y="198" font-family="${FONT}" font-size="58" font-weight="bold" fill="${MUTED}" text-anchor="middle">5</text>

    ${cellRow(WF, 222, 86)}
    <text x="315" y="284" font-family="${FONT}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
    <text x="390" y="284" font-family="${FONT}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="465" y="284" font-family="${FONT}" font-size="58" font-weight="bold" fill="${MUTED}" text-anchor="middle">8</text>
    <text x="575" y="284" font-family="${FONT}" font-size="58" font-weight="bold" fill="${MUTED}" text-anchor="middle">7</text>
    <text x="685" y="284" font-family="${FONT}" font-size="58" font-weight="bold" fill="${MUTED}" text-anchor="middle">5</text>

    <rect x="153" y="139" width="214" height="166" fill="none" stroke="${GREEN}" stroke-width="6" rx="4"/>

    <text x="420" y="372" font-family="${FONT}" font-size="36" font-weight="bold" fill="${GREEN}" text-anchor="middle">12 is more than 9</text>
    <text x="420" y="436" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.5 &gt; 9.875</text>
    <text x="420" y="500" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">The digits after the point cannot catch up.</text>
  </svg>`,

  // ── Measures: the same unit first ────────────────────────────────────────
  SAME_UNIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u41-dn" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="56" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Same unit first</text>

    <rect x="40" y="86" width="360" height="320" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="220" y="172" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">1.8 kg</text>
    <line x1="220" y1="196" x2="220" y2="276" stroke="${KEY}" stroke-width="4" marker-end="url(#u41-dn)"/>
    <text x="240" y="246" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">× 1000</text>
    <text x="220" y="350" font-family="${FONT}" font-size="60" font-weight="bold" fill="${GREEN}" text-anchor="middle">1800 g</text>

    <rect x="440" y="86" width="360" height="320" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="620" y="232" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">1795 g</text>
    <text x="620" y="290" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">already in grams</text>

    <text x="420" y="470" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">1800 g &gt; 1795 g</text>
    <text x="420" y="526" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">1 kg = 1000 g, so 1.8 kg is the heavier one.</text>
  </svg>`,

  // ── Mr Bowen's homework: six comparisons, all ticked ─────────────────────
  HOMEWORK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="40" y="20" width="760" height="520" rx="6" fill="#fffdf5" stroke="#d8cfa8" stroke-width="2"/>
    <line x1="60" y1="118" x2="780" y2="118" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="183" x2="780" y2="183" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="248" x2="780" y2="248" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="313" x2="780" y2="313" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="378" x2="780" y2="378" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="443" x2="780" y2="443" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="508" x2="780" y2="508" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="120" y1="30" x2="120" y2="530" stroke="#e8a0a0" stroke-width="2"/>

    <text x="140" y="86" font-family="${HAND}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">Mr Bowen’s homework</text>
    <circle cx="704" cy="72" r="42" fill="none" stroke="${RED}" stroke-width="4"/>
    <text x="704" y="84" font-family="${HAND}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">6/6</text>

    <text x="140" y="172" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">a)  5.08 &lt; 5.1</text>
    <text x="140" y="237" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">b)  0.45 &gt; 0.5</text>
    <text x="140" y="302" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">c)  7.80 = 7.8</text>
    <text x="140" y="367" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">d)  10.2 &lt; 9.75</text>
    <text x="140" y="432" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">e)  2.5 &gt; 2.45</text>
    <text x="140" y="497" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">f)  0.06 &gt; 0.1</text>

    ${redTick(716, 160)}
    ${redTick(716, 225)}
    ${redTick(716, 290)}
    ${redTick(716, 355)}
    ${redTick(716, 420)}
    ${redTick(716, 485)}
  </svg>`,
};
