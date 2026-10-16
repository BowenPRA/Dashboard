// src/data/Y7_SCI/U03_1/diagramsB.js
// The 3.1 diagrams that embed a PHOTOGRAPH, ported from the classroom lesson
// (y7-science/U03_1/diagrams.js). The classroom file `import`s each photo;
// here every one is a public/ file referenced through assetUrl
// (classroom-dashboard-pairing §3.7). They are split from diagrams.js because
// assetUrl reads import.meta.env, which plain node (svg-coords) cannot.
// Every photograph is openly licensed and credited in docs/credits.md and
// docs/y7-science/plans/U03_1.md.
//
//   FALL_STORY   Aristotle, the Leaning Tower of Pisa, Galileo
//   EARTH_PULL   big mass: a strong pull (the Earth, photographed from Apollo 17);
//                two pencils: a pull too weak to feel
//   SAND_CAR     a car sunk in soft sand: weight bigger than the contact force
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U03_1/${f}`);

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
const arrow = (x1, y1, x2, y2, color, w = 6, head = 20) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a);
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a);
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`;
};

// A pencil standing on its tip-end, top at y.
const pencil = (x, y, len) => `<g stroke="${INK}" stroke-width="2.5" stroke-linejoin="round">
      <path d="M ${x - 11} ${y + 4} q 0 -4 4 -4 h 14 q 4 0 4 4 v 14 h -22 Z" fill="#f4a6b5"/>
      <path d="M ${x - 11} ${y + 18} h 22 v ${len - 48} h -22 Z" fill="#f6d55c"/>
      <path d="M ${x - 11} ${y + len - 30} L ${x + 11} ${y + len - 30} L ${x} ${y + len} Z" fill="#f1d3a8"/>
      <path d="M ${x - 4} ${y + len - 12} L ${x + 4} ${y + len - 12} L ${x} ${y + len} Z" fill="${INK}"/>
    </g>`;

// A photo in a rounded frame.
const photo = (id, file, x, y, w, h, fit = 'xMidYMid slice') => `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/></clipPath></defs>
    <image href="${img(file)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${fit}" clip-path="url(#${id})"/>`;

export const DIAGRAMS = {
  FALL_STORY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${photo('u31-story-a', 'aristotle.jpg', 30, 26, 330, 270, 'xMidYMin slice')}
    <text x="195" y="330" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Aristotle, about 350 BC</text>
    <text x="195" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Heavy things</text>
    <text x="195" y="398" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">fall faster.</text>

    <rect x="385" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${photo('u31-story-p', 'pisa.jpg', 395, 26, 330, 270, 'xMidYMid meet')}
    <text x="560" y="330" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">The Leaning Tower</text>
    <text x="560" y="362" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">of Pisa, Italy</text>
    <text x="560" y="396" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">56 m tall</text>

    <rect x="750" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${photo('u31-story-g', 'galileo.jpg', 760, 26, 330, 270, 'xMidYMin slice')}
    <text x="925" y="330" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Galileo, about 1590</text>
    <text x="925" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">No! They fall</text>
    <text x="925" y="398" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">together.</text>
  </svg>`,

  EARTH_PULL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="16" y="16" width="480" height="528" rx="14" fill="#fbfcfd" stroke="${RULE}" stroke-width="2"/>
    <text x="256" y="62" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">Big mass:</text>
    <text x="256" y="98" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">a strong pull</text>
    <defs><clipPath id="u31-pull-clip"><circle cx="200" cy="320" r="125"/></clipPath></defs>
    <image href="${img('earth.jpg')}" x="57" y="177" width="286" height="286" preserveAspectRatio="xMidYMid slice" clip-path="url(#u31-pull-clip)"/>
    <circle cx="420" cy="160" r="24" fill="#e04b3a" stroke="#8e2a1f" stroke-width="3"/>
    <path d="M 420 136 L 426 122" stroke="#6d4c2e" stroke-width="4" stroke-linecap="round"/>
    ${arrow(394, 179, 308, 241.5, RED, 7, 22)}
    <text x="424" y="104" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">an apple</text>
    <text x="256" y="482" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">The mass of the Earth:</text>
    <text x="256" y="514" font-family="${FONT}" font-size="20" fill="${INK}" text-anchor="middle">6 000 000 000 000 000 000 000 000 kg</text>

    <rect x="516" y="16" width="308" height="528" rx="14" fill="#fbfcfd" stroke="${RULE}" stroke-width="2"/>
    <text x="670" y="62" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">Small mass:</text>
    <text x="670" y="98" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">a weak pull</text>
    ${pencil(618, 170, 230)}
    ${pencil(722, 170, 230)}
    ${arrow(634, 285, 654, 285, RED, 3, 10)}
    ${arrow(706, 285, 686, 285, RED, 3, 10)}
    <text x="670" y="466" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">two pencils pull too,</text>
    <text x="670" y="496" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">far too weakly to feel</text>
  </svg>`,

  SAND_CAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('u31-car', 'carsand.jpg', 0, 0, 840, 560)}
    ${arrow(300, 286, 300, 540, RED, 9, 30)}
    ${arrow(392, 546, 392, 478, BLUE, 9, 26)}

    <rect x="24" y="24" width="392" height="58" rx="14" fill="#ffffff" fill-opacity="0.94"/>
    <text x="220" y="63" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">weight &gt; contact force</text>
    <rect x="136" y="486" width="146" height="46" rx="12" fill="#ffffff" fill-opacity="0.94"/>
    <text x="209" y="518" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}" text-anchor="middle">weight</text>
    <rect x="414" y="474" width="222" height="46" rx="12" fill="#ffffff" fill-opacity="0.94"/>
    <text x="525" y="506" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">contact force</text>
  </svg>`,
};
