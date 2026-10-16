// src/data/Y7_MATH/U04_2/diagrams.js
// Teaching diagrams for 4.2 Adding and Subtracting Decimals, drawn in the
// classroom deck's style (C:\Users\bowen\lessons, content/y7-math/U04_1_4/
// diagrams.js). The classroom shows the method with its LineUp widget, which
// this deck keeps (slide 3); these six are new, for the slides the self-study
// deck adds around it.
//
// House rules (classroom LESSON-PLAYBOOK §5, kept here):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan>: two colours in one number are two <text> elements;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560.
//
// Colour carries one meaning throughout, as in the classroom deck and the Line
// Up the Points task: ORANGE is what the student writes in (a zero, a whole
// number's point, a carry, an exchange), GREEN is right, RED is wrong.
//
//   COLUMN_RULE   9.6 + 3.75 = 13.35 on squared paper: points in one column, a 0 in the gap
//   WHOLE_POINT   15 = 15.00, then 15.00 − 3.46 with the exchanges written in
//   CHECK_ADD     1 − 0.72 = 0.28 checked by adding; 0.38 does not come back to 1
//   HOMEWORK      Mr Bowen's 12 − 4.5 = 8.5, which he has marked right
//   NEAR_WHOLE    8.4 − 2.9 on a number line: take 3, give 0.1 back
//   WORDS_ADDSUB  the English that says add, and the English that says subtract

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

// Squared paper: `cols` squares of `w` from x0, `rows` of `h` from y0.
const squares = (x0, y0, cols, rows, w, h) => {
  let out = '';
  for (let r = 0; r <= rows; r += 1) out += `<line x1="${x0}" y1="${y0 + r * h}" x2="${x0 + cols * w}" y2="${y0 + r * h}" stroke="${RULE}" stroke-width="1.5"/>`;
  for (let c = 0; c <= cols; c += 1) out += `<line x1="${x0 + c * w}" y1="${y0}" x2="${x0 + c * w}" y2="${y0 + rows * h}" stroke="${RULE}" stroke-width="1.5"/>`;
  return out;
};

// A strike through a digit (an exchange), centred on (cx, cy).
const strike = (cx, cy) => `<line x1="${cx - 22}" y1="${cy + 18}" x2="${cx + 22}" y2="${cy - 18}" stroke="${KEY}" stroke-width="4" stroke-linecap="round"/>`;

// A number line tick.
const tickMark = (x, y, tall) => `<line x1="${x}" y1="${y - (tall ? 16 : 9)}" x2="${x}" y2="${y + (tall ? 16 : 9)}" stroke="${INK}" stroke-width="${tall ? 3 : 2}"/>`;

export const DIAGRAMS = {
  // ── The rule, on squared paper ───────────────────────────────────────────
  // Squares 72 wide: tens 140, ones 212, point 284, tenths 356, hundredths 428.
  COLUMN_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="52" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">9.6 + 3.75</text>

    <rect x="284" y="84" width="72" height="244" fill="${ORANGE_T}"/>
    ${squares(140, 84, 5, 3, 72, 76)}
    <line x1="80" y1="242" x2="500" y2="242" stroke="${INK}" stroke-width="5"/>

    <text x="248" y="146" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
    <text x="320" y="146" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="392" y="146" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="464" y="146" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>

    <text x="108" y="222" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="248" y="222" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="320" y="222" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="392" y="222" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="464" y="222" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>

    <text x="176" y="302" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">1</text>
    <text x="248" y="302" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">3</text>
    <text x="320" y="302" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">.</text>
    <text x="392" y="302" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">3</text>
    <text x="464" y="302" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">5</text>

    <text x="176" y="360" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>
    <text x="248" y="360" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>

    <text x="524" y="126" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">1  points in one column</text>
    <text x="524" y="182" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">2  a 0 in the gap</text>
    <text x="524" y="238" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">3  work from the right</text>
    <text x="524" y="294" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">4  the point goes</text>
    <text x="550" y="324" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">straight down</text>
    <text x="524" y="368" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="start">carries go underneath</text>

    <rect x="60" y="410" width="720" height="122" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="462" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">9.6 + 3.75 = 13.35</text>
    <text x="420" y="508" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Estimate: 10 + 4 = 14, so 13.35 is about right.</text>
  </svg>`,

  // ── A whole number has a point ───────────────────────────────────────────
  // Squares 72 wide from x 150: tens 150, ones 222, point 294, tenths 366, hundredths 438.
  WHOLE_POINT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="54" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">15 − 3.46</text>

    <rect x="294" y="126" width="72" height="228" fill="${ORANGE_T}"/>
    ${squares(150, 126, 5, 3, 72, 76)}
    <line x1="90" y1="278" x2="510" y2="278" stroke="${INK}" stroke-width="5"/>

    <text x="258" y="110" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="402" y="110" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">9</text>
    <text x="474" y="110" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">10</text>

    <text x="186" y="186" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="258" y="186" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="330" y="186" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">.</text>
    <text x="402" y="186" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="474" y="186" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    ${strike(258, 166)}
    ${strike(402, 166)}
    ${strike(474, 166)}

    <text x="118" y="262" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="258" y="262" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="330" y="262" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="402" y="262" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="474" y="262" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>

    <text x="186" y="338" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">1</text>
    <text x="258" y="338" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">1</text>
    <text x="330" y="338" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">.</text>
    <text x="402" y="338" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">5</text>
    <text x="474" y="338" font-family="${FONT}" font-size="56" font-weight="bold" fill="${GREEN}" text-anchor="middle">4</text>

    <text x="540" y="172" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">15 = 15.00</text>
    <text x="540" y="204" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="start">the point is at the end</text>
    <text x="540" y="262" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="start">0 − 6 cannot be done,</text>
    <text x="540" y="290" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="start">so the ones give 1:</text>
    <text x="540" y="318" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="start">the tenths get 10, give 1,</text>
    <text x="540" y="346" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="start">and keep 9</text>

    <rect x="60" y="410" width="720" height="122" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="462" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">15 − 3.46 = 11.54</text>
    <text x="420" y="508" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Check: 11.54 + 3.46 = 15.00</text>
  </svg>`,

  // ── Check by adding ──────────────────────────────────────────────────────
  CHECK_ADD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="52" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Check a subtraction by adding</text>

    <rect x="40" y="80" width="760" height="206" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="144" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">1 − 0.72 = 0.28</text>
    ${tick(112, 196, 26)}
    <text x="452" y="210" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">0.28 + 0.72 = 1.00</text>
    <text x="420" y="262" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Back to 1, so 0.28 is right.</text>

    <rect x="40" y="310" width="760" height="206" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="374" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">1 − 0.72 = 0.38</text>
    ${cross(112, 426, 26)}
    <text x="452" y="440" font-family="${FONT}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">0.38 + 0.72 = 1.10</text>
    <text x="420" y="492" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Not back to 1, so 0.38 is wrong.</text>
  </svg>`,

  // ── Mr Bowen's homework: one line, marked right, and wrong ───────────────
  HOMEWORK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
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
    <text x="704" y="91" font-family="${HAND}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">1/1</text>

    <text x="140" y="204" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">12 − 4.5 = 8.5</text>
    <path d="M 500 186 l 14 16 l 28 -34" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>

    <text x="260" y="284" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="310" y="284" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="350" y="284" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="390" y="284" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
    <text x="200" y="364" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="310" y="364" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="350" y="364" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="390" y="364" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <line x1="230" y1="388" x2="420" y2="388" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <text x="310" y="444" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="350" y="444" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="390" y="444" font-family="${HAND}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>

    <text x="480" y="284" font-family="${HAND}" font-size="24" fill="${MUTED}" text-anchor="start">tenths: 5 − 0 = 5</text>
    <text x="480" y="364" font-family="${HAND}" font-size="24" fill="${MUTED}" text-anchor="start">ones: 12 − 4 = 8</text>
  </svg>`,

  // ── Take 3, give 0.1 back ────────────────────────────────────────────────
  // Number line 5 to 9: x = 100 + 160 × (value − 5).
  NEAR_WHOLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u42-take" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u42-back" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
    </defs>
    <text x="420" y="54" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">8.4 − 2.9</text>
    <text x="420" y="92" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">2.9 is nearly 3: take 3, then give 0.1 back</text>

    <line x1="70" y1="300" x2="780" y2="300" stroke="${INK}" stroke-width="3"/>
    ${tickMark(100, 300, true)}
    ${tickMark(260, 300, true)}
    ${tickMark(420, 300, true)}
    ${tickMark(580, 300, true)}
    ${tickMark(740, 300, true)}
    <text x="100" y="348" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="260" y="348" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="420" y="348" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="580" y="348" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="740" y="348" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>

    <path d="M 644 292 C 560 120, 250 120, 168 290" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u42-take)"/>
    <text x="406" y="134" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">− 3</text>
    <path d="M 164 312 C 166 352, 180 352, 182 316" fill="none" stroke="${GREEN}" stroke-width="3.5" marker-end="url(#u42-back)"/>
    <text x="196" y="392" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="start">+ 0.1 back</text>

    <circle cx="644" cy="300" r="9" fill="${INK}"/>
    <text x="644" y="268" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">8.4</text>
    <circle cx="164" cy="300" r="7" fill="${KEY}"/>
    <text x="120" y="252" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">5.4</text>
    <circle cx="180" cy="300" r="9" fill="${GREEN}"/>

    <rect x="60" y="430" width="720" height="104" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="474" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">8.4 − 3 = 5.4</text>
    <text x="420" y="514" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">5.4 + 0.1 = 5.5</text>
  </svg>`,

  // ── The English that picks + or − ────────────────────────────────────────
  WORDS_ADDSUB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="20" y="20" width="800" height="250" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="86" cy="145" r="42" fill="${TEAL}"/>
    <text x="86" y="164" font-family="${FONT}" font-size="54" font-weight="bold" fill="#ffffff" text-anchor="middle">+</text>
    <text x="160" y="76" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">altogether · in total</text>
    <text x="160" y="116" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">the total · the sum</text>
    <text x="160" y="180" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="start">How much is that altogether?</text>
    <text x="160" y="220" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="start">What is the total mass?</text>

    <rect x="20" y="290" width="800" height="250" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="86" cy="415" r="42" fill="${TEAL}"/>
    <text x="86" y="434" font-family="${FONT}" font-size="54" font-weight="bold" fill="#ffffff" text-anchor="middle">−</text>
    <text x="160" y="340" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">change · the difference</text>
    <text x="160" y="380" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">how much more · how much less</text>
    <text x="160" y="420" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">how much is left</text>
    <text x="160" y="474" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="start">How much change does he get?</text>
    <text x="160" y="512" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="start">How much longer is the red ribbon?</text>
  </svg>`,
};
