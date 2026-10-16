// src/data/Y7_SCI/U03_1/diagrams.js
// Drawn teaching diagrams for 3.1 Gravity, Weight and Mass (Learner's Book
// pp. 75–84), ported from the classroom lesson (y7-science/U03_1/diagrams.js)
// with three new force pictures for Label It. The diagrams that embed a
// PHOTOGRAPH (FALL_STORY, EARTH_PULL, SAND_CAR) live in diagramsB.js: they need
// assetUrl, which reads import.meta.env, and this file has to stay importable
// by plain node so `node scripts/svg-coords.mjs Y7_SCI/U03_1 <KEY>` can place
// the Label It pins and the hotspot targets.
//
// House rules: a white plate first; every <text> written out literally so
// `npm run audit:svg` can measure it (helpers draw shapes only); split
// diagrams 840×560, showcase strips 1120×440. Leader lines and their dots are
// tagged class="lbl", so Label It strips them with the words. The diagrams
// are in English, as the classroom's are.
//
//   DROP_WORDS     English check: drop, fall, land, at the same time
//   DESK_TESTS     NEW · the three desk drops (eraser, flat paper, paper ball), no answers shown
//   EARTH_ABCD     balls dropped at A, B, C and D around the Earth   (hotspot)
//   EARTH_ARROWS   gravity acts towards the centre of the Earth
//   FURTHER_WEAKER a spaceship flying away: the pull gets weaker
//   NEWTON_LADDER  an apple, a book, 1 kg of rice, Mr Bowen, a car, in newtons
//   FORCE_DESK     NEW · a book on a desk: weight from its centre, contact force from the surface (Label It)
//   FORCE_GLOBE    NEW · weight towards the Earth's centre, at both poles      (Label It)
//   FORCE_SINK     NEW · balanced on rock; weight bigger in mud, so it sinks   (Label It)
//   MASS_STUFF     same size, more matter, more mass
//   TRIANGLE       the formula triangle, W over m × 10
//   TRIANGLE_USE   cover what you want: Mr Bowen's weight, a games console's mass
//   PLANET_TABLE   strength of gravity across the Solar System (Workbook)
//   PULL_VS_MASS   why heavy and light fall together
//   RULER_CATCH    reaction time from where you catch a falling ruler (Workbook)
//
// Dropped from the classroom file: the vote cards (ANS_HEAVY, ANS_SAME, ANS_W10,
// ANS_M10) — the first vote is a `predict` on two photos, the second a check —
// CONTACT_BOX (redrawn as FORCE_DESK, with the centre marked) and SPEED_FALL
// (its numbers are a sentence on the Accelerate slide).

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const TEAL = '#0087a8';
const RED = '#c8102e';
const BLUE = '#1a5fa8';
const TEAL_T = '#e2f2f6';
const ORANGE_T = '#fdf1e3';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const f1 = (n) => Number(n.toFixed(1));

// A straight arrow with a drawn head (not a marker, so every head is the same
// size whatever the line width).
const arrow = (x1, y1, x2, y2, color, w = 6, head = 20) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a);
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a);
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`;
};

// A thin leader line ending in a dot on the thing it names (stripped by Label It).
const leader = (x1, y1, x2, y2) =>
  `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle class="lbl" cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`;

// A flat drawn Earth: pale sea, pale land, no shading.
const LAND = [
  'M -0.62 -0.52 C -0.35 -0.72 -0.1 -0.62 -0.18 -0.36 C -0.26 -0.12 -0.06 0.06 -0.22 0.32 C -0.34 0.52 -0.3 0.74 -0.46 0.7 C -0.6 0.5 -0.52 0.22 -0.7 0.06 C -0.86 -0.1 -0.8 -0.36 -0.62 -0.52 Z',
  'M 0.12 -0.78 C 0.36 -0.86 0.62 -0.66 0.56 -0.44 C 0.76 -0.3 0.72 0 0.56 0.18 C 0.48 0.42 0.34 0.62 0.2 0.5 C 0.14 0.3 0.24 0.12 0.1 -0.04 C -0.02 -0.2 0 -0.56 0.12 -0.78 Z',
  'M 0.42 0.56 C 0.56 0.5 0.7 0.58 0.64 0.7 C 0.56 0.8 0.44 0.74 0.42 0.56 Z',
  'M -0.3 0.86 C -0.1 0.8 0.1 0.82 0.3 0.9 L 0.3 1.1 L -0.3 1.1 Z',
];
const earth = (id, cx, cy, r) => `<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#cfe5f5"/>
    <g clip-path="url(#${id})"><g transform="translate(${cx} ${cy}) scale(${r})">${LAND.map((d) => `<path d="${d}" fill="#bfe0ad" stroke="#4a8b23" stroke-width="2" vector-effect="non-scaling-stroke"/>`).join('')}</g></g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#4f8fbf" stroke-width="3"/>`;

const ball = (cx, cy, r, fill = '#f08b82', stroke = RED) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;

// A stick figure standing with its feet at (x, y); `turn` 0 = upright, 180 = upside down.
const person = (x, y, turn = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${turn}) scale(${s})" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M -10 0 L 0 -24 L 10 0 M 0 -24 L 0 -50 M -13 -42 L 13 -42"/><circle cx="0" cy="-60" r="9" fill="#ffffff"/>
    </g>`;

// A small spaceship pointing right, centred on (x, y).
const rocket = (x, y) => `<g transform="translate(${x} ${y})" stroke="${INK}" stroke-width="3" stroke-linejoin="round">
      <path d="M -40 -16 L -54 -32 L -26 -16 Z M -40 16 L -54 32 L -26 16 Z" fill="${KEY}"/>
      <path d="M -42 -6 Q -42 -16 -32 -16 L 24 -16 L 24 16 L -32 16 Q -42 16 -42 6 Z" fill="#ffffff"/>
      <path d="M 24 -16 Q 54 0 24 16 Z" fill="${KEY}"/>
      <circle cx="4" cy="0" r="7" fill="#cfe5f5"/>
    </g>`;

// The lucide Hand outline, for DROP_WORDS.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>';

// Eight arrows around a circle, all pointing at its centre.
const inwardArrows = (cx, cy, rOut, rIn) =>
  Array.from({ length: 8 }, (_, k) => {
    const a = ((22.5 + 45 * k) * Math.PI) / 180;
    return arrow(cx + rOut * Math.cos(a), cy + rOut * Math.sin(a), cx + rIn * Math.cos(a), cy + rIn * Math.sin(a), RED, 6, 20);
  }).join('\n    ');

// Particles: a packed grid of touching circles.
const packed = (x0, y0, n, r) => {
  let out = '';
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) out += ball(x0 + r + i * 2 * r, y0 + r + j * 2 * r, r - 1, '#cfd4d9', '#6b7580');
  return out;
};

// Ruler ticks every centimetre, 12 px per cm, 0 at the bottom.
const rulerTicks = (x, y0) => {
  let out = '';
  for (let c = 0; c <= 30; c++) {
    const y = y0 - c * 12;
    out += `<line x1="${x}" y1="${y}" x2="${x + (c % 5 === 0 ? 22 : 11)}" y2="${y}" stroke="${INK}" stroke-width="${c % 5 === 0 ? 2.5 : 1.5}"/>`;
  }
  return out;
};

// Planet colours for the gravity table.
const PLANET = {
  Mercury: '#b5b5b5', Venus: '#e8c27a', Earth: '#4f8fbf', Moon: '#d9d9d9', Mars: '#d0643b',
  Jupiter: '#d9a066', Saturn: '#e6cf8b', Uranus: '#8fd3e0', Neptune: '#4a6fd1',
};
const planetRow = (name, x, y, earthRow = false) => `<rect x="${x}" y="${y}" width="384" height="80" rx="12" fill="${earthRow ? TEAL_T : '#f7f9fa'}" stroke="${earthRow ? TEAL : RULE}" stroke-width="${earthRow ? 3 : 1.5}"/>
    ${name === 'Saturn' ? `<ellipse cx="${x + 48}" cy="${y + 40}" rx="36" ry="9" fill="none" stroke="#b39b55" stroke-width="3"/>` : ''}
    <circle cx="${x + 48}" cy="${y + 40}" r="24" fill="${PLANET[name]}" stroke="${INK}" stroke-width="2"/>`;

// A wooden crate seen from the side, top-left corner at (x, y).
const crate = (x, y, w, h) => `<path d="M ${x} ${y} h ${w} v ${h} h ${-w} Z" fill="#e2b77a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M ${x + 8} ${y + 8} L ${x + w - 8} ${y + h - 8} M ${x + w - 8} ${y + 8} L ${x + 8} ${y + h - 8}" stroke="#a9773a" stroke-width="5" stroke-linecap="round"/>`;

export const DIAGRAMS = {
  // ── Falling ───────────────────────────────────────────────────────────────
  DROP_WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <!-- drop -->
    <rect x="20" y="16" width="248" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="144" y="66" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">drop</text>
    <g transform="translate(96 84) scale(4)" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>
    ${ball(144, 214, 22, '#3b3f46', INK)}
    <line x1="144" y1="248" x2="144" y2="282" stroke="${MUTED}" stroke-width="3" stroke-dasharray="6 6"/>
    <text x="144" y="356" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">Mr Bowen</text>
    <text x="144" y="388" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">drops the ball.</text>

    <!-- fall -->
    <rect x="284" y="16" width="248" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="408" y="66" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">fall</text>
    <path d="M 394 120 L 394 158 M 408 108 L 408 158 M 422 120 L 422 158" stroke="${MUTED}" stroke-width="3" stroke-linecap="round"/>
    ${ball(408, 192, 22, '#3b3f46', INK)}
    ${arrow(408, 226, 408, 292, MUTED, 4, 16)}
    <text x="408" y="356" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">The ball</text>
    <text x="408" y="388" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">falls.</text>

    <!-- land -->
    <rect x="548" y="16" width="248" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="672" y="66" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">land</text>
    <line x1="572" y1="300" x2="772" y2="300" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    ${ball(672, 276, 22, '#3b3f46', INK)}
    <path d="M 636 292 l -18 -10 M 634 278 l -20 -2 M 708 292 l 18 -10 M 710 278 l 20 -2" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <text x="672" y="356" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">It lands. It hits</text>
    <text x="672" y="388" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">the ground.</text>

    <!-- at the same time -->
    <rect x="812" y="16" width="288" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="956" y="64" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">at the same time</text>
    <line x1="836" y1="300" x2="1076" y2="300" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    ${ball(912, 268, 30, '#3b3f46', INK)}
    ${ball(1004, 282, 16, '#f2f2f2', INK)}
    <path d="M 870 292 l -16 -10 M 948 292 l 14 -10 M 980 294 l -14 -8 M 1028 294 l 14 -8" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <text x="956" y="356" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">They land at</text>
    <text x="956" y="388" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">the same time.</text>
  </svg>`,

  // The three desk tests from the classroom (slides 3–4), drawn so a student
  // at home can copy them: what lands first is NOT shown — the reveal says.
  DESK_TESTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 283 30 v 480 M 556 30 v 480" stroke="${RULE}" stroke-width="2"/>
    <line x1="30" y1="470" x2="810" y2="470" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>

    <text x="146" y="58" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Drop 1</text>
    <path d="M 66 96 h 70 v 92 h -70 Z" fill="${TEAL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 66 96 h 12 v 92 h -12 Z" fill="#006b85" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 186 164 h 54 v 24 h -54 Z" fill="#f4a6b5" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 101 200 V 456 M 213 200 V 456" stroke="${MUTED}" stroke-width="3" stroke-dasharray="8 8"/>
    <text x="146" y="520" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">book + eraser</text>

    <text x="420" y="58" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Drop 2</text>
    <path d="M 330 96 h 70 v 92 h -70 Z" fill="${TEAL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 330 96 h 12 v 92 h -12 Z" fill="#006b85" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 432 180 h 96 v 8 h -96 Z" fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 365 200 V 456 M 480 200 V 456" stroke="${MUTED}" stroke-width="3" stroke-dasharray="8 8"/>
    <text x="420" y="520" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">book + flat paper</text>

    <text x="694" y="58" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Drop 3</text>
    <path d="M 604 96 h 70 v 92 h -70 Z" fill="${TEAL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 604 96 h 12 v 92 h -12 Z" fill="#006b85" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="752" cy="166" r="22" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 738 158 l 10 6 l 8 -10 l 8 12 M 742 176 l 10 -6 l 10 8" fill="none" stroke="${MUTED}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 639 200 V 456 M 752 200 V 456" stroke="${MUTED}" stroke-width="3" stroke-dasharray="8 8"/>
    <text x="694" y="520" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">book + paper ball</text>
  </svg>`,

  // ── Gravity ───────────────────────────────────────────────────────────────
  EARTH_ABCD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${earth('u31-abcd', 560, 220, 160)}
    ${ball(560, 34, 15)}
    ${ball(762, 220, 15)}
    ${ball(560, 406, 15)}
    ${ball(358, 220, 15)}
    <text x="592" y="47" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}">A</text>
    <text x="792" y="233" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}">B</text>
    <text x="592" y="420" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}">C</text>
    <text x="328" y="233" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">D</text>
  </svg>`,

  EARTH_ARROWS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${earth('u31-arrows', 270, 290, 170)}
    ${inwardArrows(270, 290, 250, 182)}
    <circle cx="270" cy="290" r="7" fill="${INK}"/>
    ${person(270, 120, 0)}
    ${person(270, 460, 180)}

    <text x="548" y="96" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}">The force of gravity</text>
    <text x="548" y="127" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}">acts towards the</text>
    <text x="548" y="158" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}">centre of the Earth.</text>
    ${leader(540, 148, 476, 205)}

    <text x="548" y="300" font-family="${FONT}" font-size="24" fill="${MUTED}">the centre</text>
    ${leader(540, 292, 280, 290)}

    <text x="548" y="438" font-family="${FONT}" font-size="24" fill="${MUTED}">South Pole: "down"</text>
    <text x="548" y="468" font-family="${FONT}" font-size="24" fill="${MUTED}">still means towards</text>
    <text x="548" y="498" font-family="${FONT}" font-size="24" fill="${MUTED}">the centre.</text>
    ${leader(540, 462, 284, 500)}
  </svg>`,

  FURTHER_WEAKER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${earth('u31-far', 60, 300, 190)}
    <text x="80" y="532" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">The Earth</text>

    ${arrow(352, 66, 300, 66, RED, 6, 18)}
    <text x="366" y="74" font-family="${FONT}" font-size="22" fill="${MUTED}">= the pull of the Earth's gravity</text>

    ${rocket(372, 290)}
    ${rocket(562, 290)}
    ${rocket(752, 290)}
    ${arrow(372, 346, 254, 346, RED, 7, 22)}
    ${arrow(562, 346, 516, 346, RED, 7, 22)}
    ${arrow(752, 346, 728, 346, RED, 7, 20)}

    <text x="372" y="410" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">near:</text>
    <text x="372" y="440" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a strong pull</text>
    <text x="562" y="410" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">further:</text>
    <text x="562" y="440" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a weaker pull</text>
    <text x="752" y="410" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">far away:</text>
    <text x="752" y="440" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">very weak</text>
  </svg>`,

  // ── Weight and contact force ──────────────────────────────────────────────
  NEWTON_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="28" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <circle cx="128" cy="168" r="58" fill="#e04b3a" stroke="#8e2a1f" stroke-width="3"/>
    <path d="M 128 112 L 134 92" stroke="#6d4c2e" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="154" cy="100" rx="18" ry="9" transform="rotate(-30 154 100)" fill="#6abf4b" stroke="#3e7c27" stroke-width="2"/>
    <text x="128" y="300" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">an apple</text>
    <text x="128" y="360" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">about 1 N</text>

    <rect x="244" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <path d="M 284 84 h 120 v 156 h -120 Z" fill="${TEAL}" stroke="${INK}" stroke-width="3"/>
    <path d="M 284 84 h 18 v 156 h -18 Z" fill="#006b85" stroke="${INK}" stroke-width="3"/>
    <path d="M 318 120 h 70 v 28 h -70 Z" fill="#ffffff"/>
    <text x="344" y="300" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">a book</text>
    <text x="344" y="360" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">about 5 N</text>

    <rect x="460" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <path d="M 505 238 Q 495 150 520 118 L 530 100 L 590 100 L 600 118 Q 625 150 615 238 Z" fill="#f3ead7" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 526 110 L 594 110" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <text x="560" y="190" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1 kg</text>
    <text x="560" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">a bag of rice</text>
    <text x="560" y="360" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">10 N</text>

    <rect x="676" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <g fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="776" cy="84" r="20" fill="#ffffff"/>
      <path d="M 776 104 L 776 180 M 742 130 L 810 130 M 776 180 L 750 238 M 776 180 L 802 238"/>
    </g>
    <text x="776" y="300" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen</text>
    <text x="776" y="360" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">800 N</text>

    <rect x="892" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <path d="M 907 206 L 907 176 Q 912 164 932 162 L 957 134 Q 962 128 972 128 L 1022 128 Q 1032 128 1040 138 L 1054 162 Q 1077 164 1080 178 L 1080 206 Z" fill="${RED}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 962 160 L 974 140 L 996 140 L 996 160 Z M 1004 160 L 1004 140 L 1026 140 L 1038 160 Z" fill="#cfe5f5" stroke="${INK}" stroke-width="2"/>
    <circle cx="942" cy="210" r="18" fill="${INK}"/><circle cx="942" cy="210" r="7" fill="#cfd8dc"/>
    <circle cx="1044" cy="210" r="18" fill="${INK}"/><circle cx="1044" cy="210" r="7" fill="#cfd8dc"/>
    <text x="992" y="300" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">a car</text>
    <text x="992" y="360" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">15 000 N</text>
  </svg>`,

  // A book resting on a desk. Weight is drawn from the book's CENTRE, straight
  // down (towards the centre of the Earth); the contact force from the desk's
  // SURFACE, straight up. Same length: nothing moves. (Book Question 5.)
  FORCE_DESK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 60 392 h 720 v 24 h -720 Z" fill="#ecd9b8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 84 416 h 18 v 128 h -18 Z" fill="#d9bf95" stroke="${INK}" stroke-width="2"/>
    <path d="M 738 416 h 18 v 128 h -18 Z" fill="#d9bf95" stroke="${INK}" stroke-width="2"/>
    <path d="M 340 252 h 160 v 140 h -160 Z" fill="${TEAL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 340 252 h 22 v 140 h -22 Z" fill="#006b85" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 386 274 h 90 v 26 h -90 Z" fill="#ffffff"/>
    ${arrow(420, 322, 420, 540, RED, 8, 26)}
    ${arrow(470, 392, 470, 172, BLUE, 8, 26)}
    <circle cx="420" cy="322" r="8" fill="${INK}" stroke="#ffffff" stroke-width="2"/>

    <text x="300" y="238" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="end">centre of the book</text>
    ${leader(306, 230, 412, 318)}
    <text x="560" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">contact force</text>
    ${leader(552, 224, 476, 224)}
    <text x="560" y="500" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}">weight</text>
    ${leader(552, 492, 426, 492)}
    <text x="210" y="484" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">surface of the desk</text>
    ${leader(210, 458, 280, 394)}
  </svg>`,

  // Weight points towards the centre of the Earth wherever you stand — DOWN
  // the page at the North Pole, UP the page at the South Pole. The ground
  // pushes back, away from the centre (Book Questions 1–3).
  FORCE_GLOBE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${earth('u31-globe', 300, 280, 180)}
    <circle cx="300" cy="280" r="8" fill="${INK}" stroke="#ffffff" stroke-width="2"/>
    ${person(300, 100, 0)}
    ${person(300, 460, 180)}
    ${arrow(300, 64, 300, 178, RED, 7, 22)}
    ${arrow(300, 496, 300, 382, RED, 7, 22)}
    ${arrow(328, 460, 328, 548, BLUE, 6, 20)}

    <text x="560" y="148" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}">weight</text>
    ${leader(552, 140, 306, 140)}
    <text x="552" y="288" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">centre of the Earth</text>
    ${leader(544, 280, 310, 280)}
    <text x="560" y="428" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}">weight</text>
    ${leader(552, 420, 306, 420)}
    <text x="560" y="528" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">contact force</text>
    ${leader(552, 520, 334, 520)}
    <text x="110" y="528" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">South Pole</text>
    ${leader(150, 510, 276, 462)}
  </svg>`,

  // The same crate twice. On rock the contact force grows to match the
  // weight, so it stays still; soft mud cannot push back hard enough, so the
  // weight wins and the crate sinks (the book's stuck car, Question 8).
  FORCE_SINK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <path d="M 40 330 h 490 v 72 h -490 Z" fill="#b8bec4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 70 352 l 40 14 M 200 346 l 30 22 M 250 380 l 44 10 M 470 372 l 30 -12" stroke="#7c858d" stroke-width="3" stroke-linecap="round"/>
    ${crate(300, 200, 130, 130)}
    ${arrow(365, 265, 365, 405, RED, 8, 24)}
    ${arrow(410, 330, 410, 190, BLUE, 8, 24)}
    <circle cx="365" cy="265" r="7" fill="${INK}" stroke="#ffffff" stroke-width="2"/>

    <path d="M 590 280 h 490 v 122 h -490 Z" fill="#8b6b4a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    ${crate(850, 220, 130, 130)}
    <path d="M 590 280 h 490" stroke="#5e4630" stroke-width="5"/>
    <path d="M 850 280 h 130 v 70 h -130 Z" fill="#8b6b4a" fill-opacity="0.55"/>
    ${arrow(915, 285, 915, 425, RED, 8, 24)}
    ${arrow(960, 280, 960, 228, BLUE, 8, 20)}
    <circle cx="915" cy="285" r="7" fill="${INK}" stroke="#ffffff" stroke-width="2"/>

    <text x="285" y="58" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">balanced: it stays still</text>
    <text x="835" y="58" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">weight bigger: it sinks</text>
    <text x="330" y="396" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="end">weight</text>
    ${leader(336, 388, 359, 388)}
    <text x="290" y="214" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="end">contact force</text>
    ${leader(296, 206, 404, 230)}
    <text x="880" y="408" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="end">weight</text>
    ${leader(886, 400, 909, 400)}
    <text x="840" y="204" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="end">contact force</text>
    ${leader(846, 196, 954, 250)}
  </svg>`,

  // ── Mass and the formula ──────────────────────────────────────────────────
  MASS_STUFF: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="230" y="76" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">less matter</text>
    <text x="610" y="76" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">more matter</text>

    <path d="M 102 116 h 256 q 12 0 12 12 v 256 q 0 12 -12 12 h -256 q -12 0 -12 -12 v -256 q 0 -12 12 -12 Z" fill="#f7f9fa" stroke="${INK}" stroke-width="3"/>
    ${ball(150, 170, 15, '#cfd4d9', '#6b7580')}${ball(250, 150, 15, '#cfd4d9', '#6b7580')}
    ${ball(320, 220, 15, '#cfd4d9', '#6b7580')}${ball(190, 250, 15, '#cfd4d9', '#6b7580')}
    ${ball(130, 330, 15, '#cfd4d9', '#6b7580')}${ball(280, 310, 15, '#cfd4d9', '#6b7580')}
    ${ball(220, 360, 15, '#cfd4d9', '#6b7580')}${ball(330, 360, 15, '#cfd4d9', '#6b7580')}

    <path d="M 482 116 h 256 q 12 0 12 12 v 256 q 0 12 -12 12 h -256 q -12 0 -12 -12 v -256 q 0 -12 12 -12 Z" fill="#f7f9fa" stroke="${INK}" stroke-width="3"/>
    ${packed(498, 144, 7, 16)}

    <text x="230" y="452" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">less mass</text>
    <text x="610" y="452" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">more mass</text>
    <text x="420" y="520" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">Same size. Different mass.</text>
  </svg>`,

  TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 330 40 L 600 520 L 60 520 Z" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="5" stroke-linejoin="round"/>
    <line x1="184" y1="300" x2="476" y2="300" stroke="${KEY}" stroke-width="5"/>
    <text x="330" y="262" font-family="${FONT}" font-size="110" font-weight="bold" fill="${INK}" text-anchor="middle">W</text>
    <text x="330" y="450" font-family="${FONT}" font-size="76" font-weight="bold" fill="${INK}" text-anchor="middle">m × 10</text>

    <text x="612" y="190" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">W = weight</text>
    <text x="612" y="224" font-family="${FONT}" font-size="24" fill="${MUTED}">in newtons (N)</text>
    <text x="612" y="410" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">m = mass</text>
    <text x="612" y="444" font-family="${FONT}" font-size="24" fill="${MUTED}">in kilograms (kg)</text>
  </svg>`,

  TRIANGLE_USE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="530" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="285" y="58" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">To find W, cover W</text>
    <path d="M 150 90 L 260 390 L 40 390 Z" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 150 90 L 208.7 250 L 91.3 250 Z" fill="#8a979e" stroke="${KEY}" stroke-width="4" stroke-linejoin="round"/>
    <text x="150" y="232" font-family="${FONT}" font-size="54" font-weight="bold" fill="#c9d1d8" text-anchor="middle">W</text>
    <text x="150" y="350" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">m × 10</text>
    <text x="300" y="130" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">Mr Bowen</text>
    <text x="300" y="168" font-family="${FONT}" font-size="24" fill="${MUTED}">m = 80 kg</text>
    <text x="300" y="228" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">W = m × 10</text>
    <text x="300" y="278" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">W = 80 × 10</text>
    <text x="300" y="340" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}">W = 800 N</text>

    <rect x="570" y="16" width="530" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="835" y="58" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">To find m, cover m</text>
    <path d="M 700 90 L 810 390 L 590 390 Z" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="4" stroke-linejoin="round"/>
    <line x1="641.3" y1="250" x2="758.7" y2="250" stroke="${KEY}" stroke-width="4"/>
    <text x="700" y="232" font-family="${FONT}" font-size="54" font-weight="bold" fill="${INK}" text-anchor="middle">W</text>
    <path d="M 626 308 h 46 q 8 0 8 8 v 40 q 0 8 -8 8 h -46 q -8 0 -8 -8 v -40 q 0 -8 8 -8 Z" fill="#8a979e"/>
    <text x="649" y="350" font-family="${FONT}" font-size="44" font-weight="bold" fill="#c9d1d8" text-anchor="middle">m</text>
    <text x="736" y="350" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">× 10</text>
    <text x="850" y="130" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">Games console</text>
    <text x="850" y="168" font-family="${FONT}" font-size="24" fill="${MUTED}">W = 28 N</text>
    <text x="850" y="228" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">m = W ÷ 10</text>
    <text x="850" y="278" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">m = 28 ÷ 10</text>
    <text x="850" y="340" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}">m = 2.8 kg</text>
  </svg>`,

  PLANET_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="52" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Strength of gravity (N/kg)</text>

    ${planetRow('Mercury', 24, 84)}
    <text x="114" y="135" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Mercury</text>
    <text x="388" y="137" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">3.7</text>
    ${planetRow('Venus', 24, 176)}
    <text x="114" y="227" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Venus</text>
    <text x="388" y="229" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">8.9</text>
    ${planetRow('Earth', 24, 268, true)}
    <text x="114" y="319" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Earth</text>
    <text x="388" y="321" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">10</text>
    ${planetRow('Moon', 24, 360)}
    <text x="114" y="411" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Moon</text>
    <text x="388" y="413" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">1.6</text>
    ${planetRow('Mars', 24, 452)}
    <text x="114" y="503" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Mars</text>
    <text x="388" y="505" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">3.7</text>

    ${planetRow('Jupiter', 432, 84)}
    <text x="522" y="135" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Jupiter</text>
    <text x="796" y="137" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">25</text>
    ${planetRow('Saturn', 432, 176)}
    <text x="522" y="227" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Saturn</text>
    <text x="796" y="229" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">10</text>
    ${planetRow('Uranus', 432, 268)}
    <text x="522" y="319" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Uranus</text>
    <text x="796" y="321" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">8.7</text>
    ${planetRow('Neptune', 432, 360)}
    <text x="522" y="411" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Neptune</text>
    <text x="796" y="413" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="end">11</text>
  </svg>`,

  // ── Speeding up ───────────────────────────────────────────────────────────
  PULL_VS_MASS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${ball(210, 150, 38)}
    <text x="210" y="160" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">1 kg</text>
    ${arrow(210, 196, 210, 250, RED, 7, 20)}
    <text x="210" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">pull: 10 N</text>
    <text x="210" y="356" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">easy to</text>
    <text x="210" y="386" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">speed up</text>

    ${ball(560, 150, 70, '#9aa5ae', INK)}
    <text x="560" y="162" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">5 kg</text>
    ${arrow(560, 228, 560, 470, RED, 7, 20)}
    <text x="584" y="330" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}">pull: 50 N</text>
    <text x="584" y="390" font-family="${FONT}" font-size="24" fill="${MUTED}">5 times harder</text>
    <text x="584" y="420" font-family="${FONT}" font-size="24" fill="${MUTED}">to speed up</text>

    <rect x="40" y="490" width="760" height="54" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="526" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Both speed up at the same rate.</text>
  </svg>`,

  RULER_CATCH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 102 52 h 52 q 6 0 6 6 v 428 q 0 6 -6 6 h -52 q -6 0 -6 -6 v -428 q 0 -6 6 -6 Z" fill="#fff3c4" stroke="${INK}" stroke-width="3"/>
    ${rulerTicks(96, 470)}
    <text x="150" y="477" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">0</text>
    <text x="150" y="417" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">5</text>
    <text x="150" y="357" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">10</text>
    <text x="150" y="297" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">15</text>
    <text x="150" y="237" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">20</text>
    <text x="150" y="177" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">25</text>
    <text x="150" y="117" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">30</text>

    <path d="M 81 58 h 4 q 9 0 9 9 v 20 q 0 9 -9 9 h -4 q -9 0 -9 -9 v -20 q 0 -9 9 -9 Z" fill="#f1c9a5" stroke="${INK}" stroke-width="2"/>
    <path d="M 171 58 h 4 q 9 0 9 9 v 20 q 0 9 -9 9 h -4 q -9 0 -9 -9 v -20 q 0 -9 9 -9 Z" fill="#f1c9a5" stroke="${INK}" stroke-width="2"/>
    <path d="M 76 452 h 4 q 10 0 10 10 v 20 q 0 10 -10 10 h -4 q -10 0 -10 -10 v -20 q 0 -10 10 -10 Z" fill="#f1c9a5" stroke="${INK}" stroke-width="2"/>
    <path d="M 176 452 h 4 q 10 0 10 10 v 20 q 0 10 -10 10 h -4 q -10 0 -10 -10 v -20 q 0 -10 10 -10 Z" fill="#f1c9a5" stroke="${INK}" stroke-width="2"/>
    <text x="200" y="84" font-family="${FONT}" font-size="22" fill="${MUTED}">someone lets go</text>
    <text x="200" y="478" font-family="${FONT}" font-size="22" fill="${MUTED}">you catch</text>
    ${arrow(230, 140, 230, 400, MUTED, 4, 16)}

    <rect x="460" y="56" width="356" height="62" rx="10" fill="${TEAL}"/>
    <text x="550" y="96" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">caught at</text>
    <text x="728" y="96" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">your time</text>
    <rect x="460" y="122" width="356" height="62" rx="8" fill="#f7f9fa"/>
    <text x="550" y="164" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">5 cm</text>
    <text x="728" y="164" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.10 s</text>
    <rect x="460" y="184" width="356" height="62" rx="8" fill="#ffffff"/>
    <text x="550" y="226" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">10 cm</text>
    <text x="728" y="226" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.14 s</text>
    <rect x="460" y="246" width="356" height="62" rx="8" fill="#f7f9fa"/>
    <text x="550" y="288" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">15 cm</text>
    <text x="728" y="288" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.17 s</text>
    <rect x="460" y="308" width="356" height="62" rx="8" fill="#ffffff"/>
    <text x="550" y="350" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">20 cm</text>
    <text x="728" y="350" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.20 s</text>
    <rect x="460" y="370" width="356" height="62" rx="8" fill="#f7f9fa"/>
    <text x="550" y="412" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">25 cm</text>
    <text x="728" y="412" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.22 s</text>
    <rect x="460" y="432" width="356" height="62" rx="8" fill="#ffffff"/>
    <text x="550" y="474" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">30 cm</text>
    <text x="728" y="474" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.24 s</text>
    <rect x="460" y="56" width="356" height="438" rx="10" fill="none" stroke="${RULE}" stroke-width="2"/>
  </svg>`,
};
