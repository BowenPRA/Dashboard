// src/data/Y7_MATH/U05_2/diagramsB.js
// The 5.2 diagrams that embed a PHOTOGRAPH, ported from the classroom deck
// (y7-math/U05_2/diagrams.js). The classroom file `import`s each photo; here
// every one is a public/ file referenced through assetUrl (pairing §3.7). They
// are split from diagrams.js because assetUrl reads import.meta.env. Every
// photograph is openly licensed (CC BY-SA 4.0) and credited in docs/credits.md.
//
//   SCISSORS_PHOTO  real scissors lying flat: two straight lines; only the
//                   blades' angle is marked, because the slide asks which angle
//                   is vertically opposite it
//   TRACKS_PHOTO    a level crossing from above: the rails are parallel, the
//                   road is perpendicular to them
//   LADDER          "Mr Bowen's ladder" (two painters and a ladder)
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U05_2/${f}`);

const INK = '#2b2b2b';
const KEY = '#c25e12';
const TEAL = '#0087a8';
const BLUE = '#1a5fa8';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const rad = (d) => (d * Math.PI) / 180;
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))];
const f = (n) => n.toFixed(1);

const wedge = (cx, cy, r, a1, a2, fill, stroke = INK, sw = 2.5) => {
  const [x1, y1] = at(cx, cy, r, a1);
  const [x2, y2] = at(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `<path d="M ${f(cx)} ${f(cy)} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} 0 ${f(x2)} ${f(y2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
};
const chevron = (x, y, d, color = INK, s = 16, w = 4) => {
  const [ax, ay] = at(x, y, s, d + 148);
  const [bx, by] = at(x, y, s, d - 148);
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(x)} ${f(y)} L ${f(bx)} ${f(by)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const box = (x, y, d, s = 24, color = INK) => {
  const [ax, ay] = at(x, y, s, d);
  const [bx, by] = at(x, y, s * Math.SQRT2, d + 45);
  const [cx, cy] = at(x, y, s, d + 90);
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)}" fill="none" stroke="${color}" stroke-width="3"/>`;
};
const dot = (x, y, color = INK, r = 5) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${color}"/>`;
const leader = (x1, y1, x2, y2, color = KEY) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="2.5"/><circle cx="${f(x2)}" cy="${f(y2)}" r="5" fill="${color}"/>`;
const pill = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" fill-opacity="0.92" stroke="#cbd5e1" stroke-width="1.5"/>`;
const photo = (id, href, x, y, w, h, fit = 'slice') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid ${fit}" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`;

export const PHOTO_DIAGRAMS = {
  SCISSORS_PHOTO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('sc-photo', img('scissors.jpg'), 20, 30, 800, 313)}
    ${wedge(372.7, 150.7, 130, 159.8, 183.6, '#f6b26b', KEY, 3)}
    <line x1="121.2" y1="58.1" x2="813.8" y2="313" stroke="${TEAL}" stroke-width="4" stroke-dasharray="14 10"/>
    <line x1="23.4" y1="172.6" x2="816.8" y2="122.7" stroke="${TEAL}" stroke-width="4" stroke-dasharray="14 10"/>
    ${dot(372.7, 150.7, INK, 6)}
    ${leader(190, 400, 244, 132)}
    ${leader(650, 400, 501, 169)}
    <text x="190" y="438" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">the blades</text>
    <text x="650" y="438" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">the handles</text>
    <text x="420" y="400" font-family="${FONT}" font-size="22" fill="${TEAL}" text-anchor="middle">two straight lines</text>
  </svg>`,
  TRACKS_PHOTO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('tr-photo', img('crossing-above.jpg'), 40, 10, 760, 540)}
    <line x1="404.5" y1="12" x2="417.6" y2="246" stroke="${KEY}" stroke-width="6" stroke-linecap="round"/>
    <line x1="422.8" y1="12" x2="437.2" y2="246" stroke="${KEY}" stroke-width="6" stroke-linecap="round"/>
    ${chevron(407, 58, -86.8, KEY, 15, 4)}
    ${chevron(425.6, 58, -86.8, KEY, 15, 4)}
    <line x1="251" y1="314" x2="631" y2="314" stroke="${BLUE}" stroke-width="6" stroke-linecap="round"/>
    ${box(421.4, 314, 90, 22, BLUE)}
    ${pill(150, 74, 196, 50)}
    <text x="248" y="109" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">parallel</text>
    ${leader(346, 99, 408, 99)}
    ${pill(470, 196, 256, 50)}
    <text x="598" y="231" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">perpendicular</text>
    ${leader(520, 246, 432, 300, BLUE)}
    ${pill(60, 474, 420, 46)}
    <text x="270" y="505" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">a railway and a road, from above</text>
  </svg>`,
  LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('ld-photo', img('painters.jpg'), 80, 10, 681, 540)}
    ${pill(270, 30, 300, 50)}
    <text x="420" y="65" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Mr Bowen’s ladder</text>
    ${leader(270, 55, 190, 110)}
  </svg>`,
};
