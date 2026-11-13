// src/data/ACELLUS/ALG_QUAD/diagrams.js
// Solving Quadratics — the teaching diagrams.
//
// House rules (docs/svg-diagrams.md): dark ink on a light card, monospace for
// notation and sans-serif for labels, one idea per diagram, and every colour
// paired with a word. `npm run audit:svg ACELLUS` must be clean.
//
// Every curve is computed from its equation (pts below), so the picture can
// never disagree with the numbers printed on it.

const PURPLE = '#7c3aed';
const GREEN = '#10b981';
const BLUE = '#3b82f6';
const AMBER = '#d97706';
const RED = '#ef4444';
const INK = '#1e293b';
const MUTED = '#64748b';

/** Polyline points for y = f(x) over [x0, x1], mapped by X and Y. */
const pts = (f, x0, x1, X, Y, n = 60) => Array.from({ length: n + 1 }, (_, i) => {
  const x = x0 + ((x1 - x0) * i) / n;
  return `${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`;
}).join(' ');

// y = x² − 2x − 3 = (x + 1)(x − 3): zeros at −1 and 3, vertex (1, −4).
const ZX = (x) => 260 + x * 46;
const ZY = (y) => 150 - y * 22;
const zf = (x) => x * x - 2 * x - 3;

// Three panels for the discriminant: 180 wide each.
const panel = (ox, f, label, sub, colour) => {
  const X = (x) => ox + 90 + x * 26;
  const Y = (y) => 150 - y * 20;
  return `
    <rect x="${ox + 8}" y="16" width="168" height="208" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
    <line x1="${ox + 18}" y1="150" x2="${ox + 166}" y2="150" stroke="${MUTED}" stroke-width="2"/>
    <polyline points="${pts(f, -2.9, 2.9, X, Y)}" fill="none" stroke="${colour}" stroke-width="4" stroke-linecap="round"/>
    <text x="${ox + 92}" y="44" text-anchor="middle" font-family="monospace" font-size="17" font-weight="900" fill="${colour}">${label}</text>
    <text x="${ox + 92}" y="206" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="800" fill="${INK}">${sub}</text>`;
};

export const DIAGRAMS = {
  // The zeros ARE the x-intercepts: four names for the same two points.
  ZEROS_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="292" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>
    ${[-4, -3, -2, -1, 1, 2, 3, 4, 5].map((n) => `<line x1="${ZX(n)}" y1="44" x2="${ZX(n)}" y2="250" stroke="#e2e8f0" stroke-width="1"/>`).join('')}
    <line x1="40" y1="${ZY(0)}" x2="490" y2="${ZY(0)}" stroke="${INK}" stroke-width="2.5"/>
    <line x1="${ZX(0)}" y1="40" x2="${ZX(0)}" y2="256" stroke="${INK}" stroke-width="2"/>
    <text x="496" y="${ZY(0) + 5}" font-family="serif" font-style="italic" font-size="18" fill="${INK}">x</text>
    <text x="${ZX(0) + 8}" y="52" font-family="serif" font-style="italic" font-size="18" fill="${INK}">y</text>
    <polyline points="${pts(zf, -1.95, 3.95, ZX, ZY)}" fill="none" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
    <text x="40" y="40" font-family="monospace" font-size="17" font-weight="900" fill="${PURPLE}">y = x² − 2x − 3</text>
    <circle cx="${ZX(-1)}" cy="${ZY(0)}" r="8" fill="${GREEN}" stroke="#ffffff" stroke-width="3"/>
    <circle cx="${ZX(3)}" cy="${ZY(0)}" r="8" fill="${GREEN}" stroke="#ffffff" stroke-width="3"/>
    <text x="${ZX(-1) - 8}" y="${ZY(0) + 26}" text-anchor="end" font-family="monospace" font-size="16" font-weight="900" fill="${GREEN}">(−1, 0)</text>
    <text x="${ZX(3) + 8}" y="${ZY(0) + 26}" font-family="monospace" font-size="16" font-weight="900" fill="${GREEN}">(3, 0)</text>
    <text x="260" y="282" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="800" fill="${INK}">zeros = roots = solutions = x-intercepts: x = −1 and x = 3</text>
  </svg>`,

  // Factoring as a rectangle: x² + 5x + 6 is the area of an (x + 2) by (x + 3) box.
  AREA_FACTOR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="292" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="260" y="40" text-anchor="middle" font-family="monospace" font-size="22" font-weight="900" fill="${INK}">x² + 5x + 6 = (x + 2)(x + 3)</text>
    <rect x="130" y="80" width="150" height="150" fill="#f3e8ff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="280" y="80" width="90" height="150" fill="#eff6ff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="130" y="230" width="150" height="60" fill="#eff6ff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="280" y="230" width="90" height="60" fill="#fef3c7" stroke="${INK}" stroke-width="2.5"/>
    <text x="205" y="164" text-anchor="middle" font-family="monospace" font-size="26" font-weight="900" fill="${PURPLE}">x²</text>
    <text x="325" y="164" text-anchor="middle" font-family="monospace" font-size="24" font-weight="900" fill="${BLUE}">3x</text>
    <text x="205" y="268" text-anchor="middle" font-family="monospace" font-size="24" font-weight="900" fill="${BLUE}">2x</text>
    <text x="325" y="268" text-anchor="middle" font-family="monospace" font-size="24" font-weight="900" fill="${AMBER}">6</text>
    <text x="205" y="70" text-anchor="middle" font-family="monospace" font-size="20" font-weight="900" fill="${INK}">x</text>
    <text x="325" y="70" text-anchor="middle" font-family="monospace" font-size="20" font-weight="900" fill="${INK}">+3</text>
    <text x="114" y="162" text-anchor="end" font-family="monospace" font-size="20" font-weight="900" fill="${INK}">x</text>
    <text x="114" y="266" text-anchor="end" font-family="monospace" font-size="20" font-weight="900" fill="${INK}">+2</text>
    <text x="378" y="150" font-family="sans-serif" font-size="14" font-weight="800" fill="${BLUE}">2x + 3x = 5x</text>
    <text x="378" y="170" font-family="sans-serif" font-size="13" font-weight="700" fill="${MUTED}">(add to b)</text>
    <text x="378" y="258" font-family="sans-serif" font-size="14" font-weight="800" fill="${AMBER}">2 × 3 = 6</text>
    <text x="378" y="278" font-family="sans-serif" font-size="13" font-weight="700" fill="${MUTED}">(multiply to c)</text>
  </svg>`,

  // What the discriminant says, in three pictures.
  DISC_THREE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552 240" class="w-full h-full drop-shadow-md">
    <rect x="2" y="2" width="548" height="236" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>
    ${panel(0, (x) => x * x - 2.5, 'b² − 4ac &gt; 0', 'two solutions', GREEN)}
    ${panel(184, (x) => x * x, 'b² − 4ac = 0', 'one solution', AMBER)}
    ${panel(368, (x) => x * x + 1.6, 'b² − 4ac &lt; 0', 'no real solutions', RED)}
  </svg>`,
};
