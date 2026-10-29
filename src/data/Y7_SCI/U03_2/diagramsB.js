// src/data/Y7_SCI/U03_2/diagramsB.js
// Three drawings from the classroom's Models deck
// (content/y7-science/U03_models/diagrams.js), copied unchanged:
//
//     SPIN_FLAT     arms in, spin faster (the skater); spinning dough goes flat
//     ROCKY / GIANT near the Sun only rock and metal; far out, ice too, then gas
//
// The rest of that file stays in the classroom: the vote cards (a room votes
// with hands), the globe and the two kinds of model (cut from this unit), the
// four-step drawing (its steps are the deck's `order` activity) and the HL Tauri
// drawing (this unit shows the real ALMA photo).
// Label <text> is written out literally so `npm run audit:svg` can measure it.

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const RED = '#c8102e';
const BLUE = '#1a5fa8';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const f1 = (n) => Number(n.toFixed(1));

const arrow = (x1, y1, x2, y2, color, w = 5, head = 18) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a);
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a);
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`;
};

// A curved arrow along a circle, from angle a0 to a1 (degrees, screen).
const arcArrow = (cx, cy, rx, ry, a0, a1, color, w = 4, head = 16) => {
  const P = (a) => [cx + rx * Math.cos((a * Math.PI) / 180), cy + ry * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = P(a0);
  const [x1, y1] = P(a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  const [xb, yb] = P(a1 - (a1 > a0 ? 6 : -6));
  const ang = Math.atan2(y1 - yb, x1 - xb);
  const px = head * 0.55 * Math.sin(ang), py = -head * 0.55 * Math.cos(ang);
  const hx = x1 - head * Math.cos(ang), hy = y1 - head * Math.sin(ang);
  return `<path d="M ${f1(x0)} ${f1(y0)} A ${rx} ${ry} 0 ${large} ${sweep} ${f1(hx)} ${f1(hy)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x1)} ${f1(y1)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`;
};

const leader = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`;

// A drawn Sun: flat pale disc and short rays.
const sun = (cx, cy, r) => {
  let rays = '';
  for (let k = 0; k < 12; k++) {
    const a = (k * 30 * Math.PI) / 180;
    rays += `<line x1="${f1(cx + (r + 6) * Math.cos(a))}" y1="${f1(cy + (r + 6) * Math.sin(a))}" x2="${f1(cx + (r + 18) * Math.cos(a))}" y2="${f1(cy + (r + 18) * Math.sin(a))}" stroke="#e8a317" stroke-width="4" stroke-linecap="round"/>`;
  }
  return `${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd45c" stroke="${INK}" stroke-width="3"/>`;
};

export const DIAGRAMS = {
  SPIN_FLAT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <circle cx="150" cy="120" r="22" fill="#f2c9a5" stroke="${INK}" stroke-width="3"/>
    <line x1="150" y1="142" x2="150" y2="250" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <line x1="150" y1="170" x2="60" y2="200" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <line x1="150" y1="170" x2="240" y2="200" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <line x1="150" y1="250" x2="150" y2="320" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    ${arcArrow(150, 330, 70, 18, 20, 160, BLUE, 3, 12)}
    <text x="150" y="386" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">arms out: slow</text>
    <circle cx="420" cy="120" r="22" fill="#f2c9a5" stroke="${INK}" stroke-width="3"/>
    <line x1="420" y1="142" x2="420" y2="250" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 420 168 l -16 22 l 16 18 M 420 168 l 16 22 l -16 18" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="420" y1="250" x2="420" y2="320" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    ${arcArrow(420, 330, 40, 12, 20, 160, RED, 3, 12)}
    ${arcArrow(420, 330, 40, 12, 200, 340, RED, 3, 12)}
    ${arcArrow(420, 200, 46, 14, 200, 340, RED, 3, 12)}
    <text x="420" y="386" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">arms in: FAST</text>
    <line x1="560" y1="40" x2="560" y2="400" stroke="${RULE}" stroke-width="2"/>
    <circle cx="690" cy="200" r="60" fill="#f6e3b8" stroke="${INK}" stroke-width="3"/>
    <text x="690" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">a ball of dough</text>
    ${arrow(770, 200, 840, 200, MUTED, 4, 16)}
    <ellipse cx="970" cy="200" rx="120" ry="26" fill="#f6e3b8" stroke="${INK}" stroke-width="3"/>
    ${arcArrow(970, 200, 140, 40, 200, 340, RED, 3, 14)}
    <text x="970" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">spin it: it goes flat</text>
  </svg>`,

  ROCKY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" class="w-full h-full">
    ${plate(600, 380)}
    ${sun(70, 190, 40)}
    <circle cx="350" cy="190" r="110" fill="#d9a27a" stroke="${INK}" stroke-width="3"/>
    <circle cx="350" cy="190" r="52" fill="#8b5a3c" stroke="${INK}" stroke-width="2.5"/>
    ${leader(520, 110, 420, 140)}
    <text x="500" y="98" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">rock</text>
    ${leader(520, 300, 380, 210)}
    <text x="470" y="330" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">metal core</text>
    <text x="70" y="270" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">hot</text>
  </svg>`,

  GIANT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" class="w-full h-full">
    ${plate(600, 380)}
    <circle cx="250" cy="190" r="150" fill="#f1dfc1" stroke="${INK}" stroke-width="3"/>
    <path d="M 108 140 h 284 M 102 196 h 296 M 116 252 h 268" stroke="#d6b88e" stroke-width="14"/>
    <circle cx="250" cy="190" r="46" fill="#cfe8ff" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="250" cy="190" r="21" fill="#8b5a3c" stroke="${INK}" stroke-width="2"/>
    ${leader(430, 76, 350, 104)}
    <text x="420" y="50" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">huge gas</text>
    <text x="420" y="74" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">layer</text>
    ${leader(430, 300, 282, 214)}
    <text x="420" y="326" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">ice and rock</text>
    <text x="420" y="350" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">core</text>
    <text x="60" y="360" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">cold</text>
  </svg>`,
};
