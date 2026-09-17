// src/data/Y7_SCI/U02_5/diagramsB.js
// The photo panels for 2.5, kept apart from diagrams.js because they embed
// photographs through assetUrl (which only resolves inside Vite), so the drawn
// diagrams stay loadable by scripts/svg-coords.mjs in plain Node.
//
//   1. SILVER_ZOOM   — the silver-ring photo, zoomed in to identical atoms (p.52)
//   2. ONE_KIND      — carbon, gold, silver: photographs of three elements (p.52)
//   3. JOINING_REAL  — neon, oxygen, sulfur: the joining drawing, photographed
//   4. METAL_QUIZ    — the book's six element photos, names only (p.54)
//
// The classroom deck `import`ed each photo (Vite hashes them); here every one is
// copied to public/images/Y7_SCI/U02_5/ and referenced by assetUrl. Every photo
// is openly licensed; the credits are in docs/y7-science/plans/U02_5.md (to be
// copied into docs/credits.md at integration).
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_5/${f}`);

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const atom = (cx, cy, r, fill, stroke) =>
  `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

// Identical silver atoms filling a circle.
function atomDisc(cx, cy, R, r) {
  let out = '';
  const step = r * 2;
  const n = Math.ceil(R / step);
  for (let j = -n; j <= n; j++) {
    for (let i = -n; i <= n; i++) {
      const x = cx + i * step, y = cy + j * step;
      if (Math.hypot(x - cx, y - cy) + r <= R - 4) out += atom(x, y, r, '#cfd4d9', '#6b7580');
    }
  }
  return out;
}

export const DIAGRAMS = {
  SILVER_ZOOM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <clipPath id="u25-ring-clip"><rect x="30" y="120" width="360" height="240" rx="14"/></clipPath>
    </defs>

    <image href="${img('rings.jpg')}" x="30" y="120" width="360" height="240" preserveAspectRatio="xMidYMid slice" clip-path="url(#u25-ring-clip)"/>
    <rect x="30" y="120" width="360" height="240" rx="14" fill="none" stroke="${RULE}" stroke-width="2"/>

    <!-- zoom lines from the magnifier to the atom disc -->
    <line x1="266" y1="236" x2="560" y2="92" stroke="${KEY}" stroke-width="2.5" stroke-dasharray="7 6"/>
    <line x1="266" y1="296" x2="560" y2="428" stroke="${KEY}" stroke-width="2.5" stroke-dasharray="7 6"/>
    <circle cx="250" cy="266" r="34" fill="none" stroke="${KEY}" stroke-width="5"/>

    <circle cx="610" cy="260" r="180" fill="#ffffff" stroke="${KEY}" stroke-width="5"/>
    ${atomDisc(610, 260, 180, 25)}

    <text x="420" y="62" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Pure silver: one kind of atom</text>
    <text x="210" y="400" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Silver rings</text>
    <text x="610" y="485" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Zoom in: only silver atoms</text>
    <text x="420" y="532" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Every atom is the same.</text>
  </svg>`,

  ONE_KIND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('carbon.jpg')}" x="30" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Carbon</text>
    <text x="195" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">graphite and diamond</text>

    <rect x="385" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('gold.jpg')}" x="395" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Gold</text>
    <text x="560" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">only gold atoms</text>

    <rect x="750" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('silver.jpg')}" x="760" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Silver</text>
    <text x="925" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">only silver atoms</text>
  </svg>`,

  JOINING_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('neon.jpg')}" x="30" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Neon</text>
    <text x="195" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a gas that glows</text>

    <rect x="385" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('oxygen.jpg')}" x="395" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Oxygen</text>
    <text x="560" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">so cold it is a liquid</text>

    <rect x="750" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('sulfur.jpg')}" x="760" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Sulfur</text>
    <text x="925" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a yellow solid</text>
  </svg>`,

  METAL_QUIZ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('aluminium.jpg')}" x="30" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="204" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Aluminium</text>

    <rect x="385" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('zinc.jpg')}" x="395" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="204" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Zinc</text>

    <rect x="750" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('lead.jpg')}" x="760" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="204" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Lead</text>

    <rect x="20" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('copper.jpg')}" x="30" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="414" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Copper</text>

    <rect x="385" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('iron.jpg')}" x="395" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="414" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Iron</text>

    <rect x="750" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${img('bromine.jpg')}" x="760" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="414" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Bromine</text>
  </svg>`,
};
