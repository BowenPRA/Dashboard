// src/data/Y7_SCI/U02_6/diagramsB.js
// The 2.6 diagrams that embed a PHOTOGRAPH, copied from the classroom lesson
// (y7-science/U02_6/diagrams.js). The classroom file `import`s each photo;
// here every one is a public/ file referenced through assetUrl
// (classroom-dashboard-pairing §3.7). They are split from diagrams.js because
// assetUrl reads import.meta.env, which plain node (svg-coords) cannot.
// Every photograph is openly licensed and credited in
// docs/y7-science/plans/U02_6.md.
//
//   TWO_DANGERS     sodium (bursts into flame in water) and chlorine (poison)
//   SALT_MADE       sodium + chlorine → sodium chloride, photographed (p. 58)
//   BONDING_REAL    a model kit: loose atoms, then atoms bonded
//   PARTICLES_REAL  CO₂, H₂O, O₂, CH₄ as real substances
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_6/${f}`);

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

// A photograph cropped to fill its cell, with a hairline frame.
const photo = (file, id, x, y, w, h) => `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath></defs>
    <image href="${img(file)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${RULE}" stroke-width="2"/>`;

const hazard = (x, y) => `<path d="M ${x} ${y - 34} L ${x + 38} ${y + 30} L ${x - 38} ${y + 30} Z" fill="#ffc800" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="${x - 4}" y="${y - 14}" width="8" height="26" rx="3" fill="${INK}"/><circle cx="${x}" cy="${y + 20}" r="5" fill="${INK}"/>`;

export const DIAGRAMS = {
  TWO_DANGERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    ${photo('sodium.jpg', 'u26-danger-na', 30, 20, 510, 300)}
    ${hazard(486, 72)}
    <text x="285" y="370" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">Sodium</text>
    <text x="285" y="410" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a metal that bursts into flame in water</text>

    ${photo('chlorine.jpg', 'u26-danger-cl', 580, 20, 510, 300)}
    ${hazard(1036, 72)}
    <text x="835" y="370" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">Chlorine</text>
    <text x="835" y="410" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a poisonous yellow-green gas</text>
  </svg>`,

  SALT_MADE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <marker id="u26-salt-head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
    </defs>

    ${photo('sodium.jpg', 'u26-salt-na', 30, 20, 300, 300)}
    <text x="365" y="190" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    ${photo('chlorine.jpg', 'u26-salt-cl', 400, 20, 300, 300)}
    <line x1="716" y1="170" x2="786" y2="170" stroke="${INK}" stroke-width="6" marker-end="url(#u26-salt-head)"/>
    <rect x="800" y="20" width="300" height="300" rx="12" fill="#ffffff"/>
    <image href="${img('saltshaker.jpg')}" x="800" y="20" width="300" height="300" preserveAspectRatio="xMidYMid meet"/>
    <rect x="800" y="20" width="300" height="300" rx="12" fill="none" stroke="${KEY}" stroke-width="4"/>

    <text x="180" y="368" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="180" y="406" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">an element</text>
    <text x="550" y="368" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="550" y="406" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">an element</text>
    <text x="950" y="368" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">sodium chloride</text>
    <text x="950" y="406" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">a compound</text>
  </svg>`,

  BONDING_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    ${photo('atoms_loose.jpg', 'u26-bond-loose', 24, 24, 420, 250)}
    <text x="476" y="128" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">Not bonded</text>
    <text x="476" y="172" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">atoms are loose</text>

    ${photo('model_bonded.jpg', 'u26-bond-joined', 24, 290, 420, 246)}
    <text x="476" y="394" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">Bonded</text>
    <text x="476" y="438" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">atoms joined tightly</text>
  </svg>`,

  PARTICLES_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    ${photo('dryice.jpg', 'u26-real-co2', 20, 16, 260, 300)}
    <text x="150" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Dry ice</text>
    <text x="150" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">frozen carbon dioxide</text>

    ${photo('water.jpg', 'u26-real-h2o', 300, 16, 260, 300)}
    <text x="430" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Water</text>
    <text x="430" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">a glass of H₂O</text>

    ${photo('oxygen.jpg', 'u26-real-o2', 580, 16, 260, 300)}
    <text x="710" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Liquid oxygen</text>
    <text x="710" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">O₂, very, very cold</text>

    ${photo('gasflame.jpg', 'u26-real-ch4', 860, 16, 240, 300)}
    <text x="980" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Cooking gas</text>
    <text x="980" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">mostly methane, CH₄</text>
  </svg>`,
};
