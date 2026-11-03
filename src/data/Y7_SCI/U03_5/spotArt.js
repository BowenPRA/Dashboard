// src/data/Y7_SCI/U03_5/spotArt.js
// The pictures of Name That Energy (ENERGY_SPOT): one thing on a plate, and
// three scenes with numbered pins. No text in any of them — the engine writes
// each pin's number over the picture and its name in the list under it, and
// the clue is the student's to find.
//
//   PICS     one thing each: the classroom game's art (rice, the water tower,
//            the drum, the squashed spring, the battery, the car, the bow, the
//            dam) and three new drawings in the same style (a rock falling off
//            a cliff, a hot bath, a hot pie on a high shelf)
//   SCENES   circuit — Question 1's circuit (diagrams.js CIRCUIT_DRAWING)
//            desk    — Mr Bowen's desk: the kettle, a lamp, his phone charging,
//                      his banana
//            bus     — the book's bus going uphill (page 107), drawn as the
//                      deck's BusEnergies draws it
//   PINS     where each scene's pins sit: the badge (x, y) and the point on
//            the picture its leader ends on (to). The validator checks every
//            pin is inside its picture and no two badges overlap.
import {
  INK, MUTED, BLUE, GREEN, KEY, SEA, SEA_EDGE,
  plate, arrow, rice, waterTower, drum, spring, battery, car, bow, dam,
  kettle, banana, bulb, charging, bus,
} from './art.js';
import { CIRCUIT_DRAWING } from './diagrams.js';

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="w-full h-full">${plate(w, h)}${body}</svg>`;
const one = (body) => svg(400, 300, body);

const STEAM = (xs, y) => xs.map((x) => `<path d="M ${x} ${y} q -12 -16 0 -32 q 12 -16 0 -32" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`).join('');

// A rock falling past the edge of a cliff, the sea far below.
const FALLING_ROCK = one(`
  <rect x="206" y="252" width="194" height="48" fill="${SEA}"/>
  <path d="M 206 252 q 16 -8 32 0 t 32 0 t 32 0 t 32 0 t 32 0 t 32 0" fill="none" stroke="${SEA_EDGE}" stroke-width="3"/>
  <path d="M 0 112 L 188 112 L 200 142 L 192 172 L 214 208 L 208 300 L 0 300 Z" fill="#c9b79c" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M 0 112 H 186" stroke="${GREEN}" stroke-width="8"/>
  <path d="M 194 104 Q 252 84 282 134" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="8 8"/>
  <path d="M 290 112 V 90 M 304 118 V 86 M 318 112 V 94" stroke="#9aa7b4" stroke-width="5" stroke-linecap="round"/>
  <path d="M 276 178 Q 270 142 300 138 Q 332 140 330 168 Q 328 182 312 184 Z" fill="#8f9aa6" stroke="${INK}" stroke-width="4"/>
  ${arrow(303, 198, 303, 238, BLUE, 5, 14)}`);

// A bath full of hot water, steam rising.
const HOT_BATH = one(`
  <line x1="20" y1="268" x2="380" y2="268" stroke="${MUTED}" stroke-width="4"/>
  <path d="M 112 240 l -12 28 h 24 l 4 -28 Z M 288 240 l 12 28 h -24 l -4 -28 Z" fill="#c3c9d1" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 60 148 H 340 V 176 Q 340 246 270 246 H 130 Q 60 246 60 176 Z" fill="#f4efe9" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M 70 158 H 330 V 176 Q 330 236 270 236 H 130 Q 70 236 70 176 Z" fill="#cfe6f5"/>
  <path d="M 70 158 H 330" stroke="${SEA_EDGE}" stroke-width="4"/>
  <rect x="50" y="136" width="300" height="16" rx="8" fill="#e9edf1" stroke="${INK}" stroke-width="3"/>
  <path d="M 312 136 V 98 Q 312 86 300 86 H 280" fill="none" stroke="#9aa7b4" stroke-width="10" stroke-linecap="round"/>
  ${STEAM([140, 200, 260], 126)}`);

// A hot pie on a high shelf.
const PIE_SHELF = one(`
  <rect x="20" y="20" width="360" height="248" rx="10" fill="#f7fafc"/>
  <line x1="20" y1="268" x2="380" y2="268" stroke="${INK}" stroke-width="4"/>
  <rect x="100" y="150" width="200" height="14" rx="3" fill="#b5835a" stroke="${INK}" stroke-width="3"/>
  <path d="M 120 164 v 26 l 26 -26 M 280 164 v 26 l -26 -26" fill="none" stroke="${MUTED}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M 140 150 L 148 126 H 252 L 260 150 Z" fill="#c3c9d1" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <ellipse cx="200" cy="126" rx="58" ry="14" fill="#e8b062" stroke="${INK}" stroke-width="3.5"/>
  <path d="M 172 118 l 12 14 M 196 114 l 12 16 M 220 116 l 10 12" stroke="#b97a2a" stroke-width="3.5" stroke-linecap="round"/>
  ${STEAM([176, 224], 106)}
  <path d="M 330 160 V 260" stroke="#9aa7b4" stroke-width="3.5" stroke-dasharray="9 7"/>
  <path d="M 318 160 H 342 M 318 260 H 342" stroke="#9aa7b4" stroke-width="3.5"/>`);

export const PICS = {
  rice: one(rice(180, 160, 1.1)),
  waterTower: one(waterTower(200, 150, 1.05)),
  drum: one(drum(205, 165, 1.1)),
  spring: one(spring(200, 150, 1.05)),
  battery: one(`${battery(160, 150, 1.15)}${battery(240, 150, 1.15)}`),
  car: one(car(214, 160, 0.95)),
  bow: one(bow(180, 150, 1.05)),
  dam: one(dam(200, 150, 1.0)),
  fallingRock: FALLING_ROCK,
  hotBath: HOT_BATH,
  pieShelf: PIE_SHELF,
};

/* ── the scenes ─────────────────────────────────────────────────────────── */

// Mr Bowen's desk: the kettle (hot water), a lamp, his phone on charge, a banana.
const DESK = svg(840, 480, `
  <rect x="40" y="330" width="760" height="18" rx="4" fill="#b5835a" stroke="${INK}" stroke-width="3"/>
  <rect x="70" y="348" width="16" height="120" fill="#8a5a2b"/>
  <rect x="754" y="348" width="16" height="120" fill="#8a5a2b"/>
  ${kettle(170, 271, 0.75)}
  ${banana(380, 305, 0.5)}
  <path d="M 470 202 V 330" stroke="${MUTED}" stroke-width="7"/>
  <ellipse cx="470" cy="328" rx="40" ry="8" fill="#3d4650"/>
  ${bulb(470, 150, 0.75)}
  ${charging(640, 290, 0.7)}`);

// The bus going uphill, as the deck's BusEnergies draws it: tilted 9°, the
// headlight's beam, the noisy exhaust and the hot engine behind it, the fuel
// cap and the squashed tyres in front.
const BUS = { x: 690, y: 296, s: 2, deg: -9 };
const onBus = (px, py) => {
  const a = (BUS.deg * Math.PI) / 180;
  return [
    Math.round(BUS.x + BUS.s * (px * Math.cos(a) - py * Math.sin(a))),
    Math.round(BUS.y + BUS.s * (px * Math.sin(a) + py * Math.cos(a))),
  ];
};
const BEHIND = `
  <path d="M 148 16 L 270 -24 L 270 76 Z" fill="#fff3b0" opacity="0.95"/>
  <rect x="-170" y="36" width="22" height="8" rx="3" fill="#5b6770"/>
  <circle cx="-190" cy="36" r="9" fill="#d5dbe1"/><circle cx="-206" cy="30" r="12" fill="#e2e8f0"/>
  <path d="M -184 -26 q -10 12 0 24 M -198 -34 q -16 20 0 40 M -212 -42 q -22 28 0 56" fill="none" stroke="${KEY}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M -136 -82 q -6 -8 0 -16 q 6 -8 0 -16 M -118 -82 q -6 -8 0 -16 q 6 -8 0 -16" fill="none" stroke="#d83a2e" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M -420 78 H 520" stroke="#6b7480" stroke-width="10"/>`;
const FRONT = `
  <rect x="-54" y="24" width="26" height="18" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
  ${[-90, 92].map((wx) => `<ellipse cx="${wx}" cy="71" rx="32" ry="7" fill="#3d4650"/>
  <path d="M ${wx - 32} 71 A 32 7 0 0 0 ${wx + 32} 71" fill="none" stroke="${INK}" stroke-width="3"/>`).join('')}`;
const ROAD_FILL = (() => {
  const [ax, ay] = onBus(-420, 78);
  const [bx, by] = onBus(520, 78);
  return `M ${ax} ${ay} L ${bx} ${by} L ${bx} 560 L ${ax} 560 Z`;
})();
const BUS_SCENE = svg(1500, 560, `
  <path d="${ROAD_FILL}" fill="#eef1f4"/>
  <g transform="translate(${BUS.x} ${BUS.y}) rotate(${BUS.deg}) scale(${BUS.s})">${BEHIND}${bus(0, 0, 1)}${FRONT}</g>`);

export const SCENES = {
  circuit: { svg: svg(840, 560, CIRCUIT_DRAWING), viewBox: [840, 560] },
  desk: { svg: DESK, viewBox: [840, 480] },
  bus: { svg: BUS_SCENE, viewBox: [1500, 560] },
};

// Each pin: its badge (x, y) and the point its leader ends on. The bus's
// badges sit where the deck's "?" boxes wait; its points are the deck's.
export const PINS = {
  circuit: {
    battery: { x: 110, y: 500, to: [196, 420] },
    wires: { x: 220, y: 70, to: [300, 142] },
    bulb: { x: 740, y: 130, to: [668, 260] },
  },
  desk: {
    water: { x: 64, y: 150, to: [160, 290] },
    lamp: { x: 610, y: 64, to: [470, 125] },
    cable: { x: 600, y: 196, to: [630, 313] },
    banana: { x: 300, y: 200, to: [380, 310] },
  },
  bus: {
    moving: { x: 584, y: 49, to: onBus(0, -64) },
    headlights: { x: 1286, y: 243, to: onBus(232, 20) },
    exhaust: { x: 64, y: 227, to: onBus(-198, -10) },
    engine: { x: 64, y: 103, to: onBus(-128, -100) },
    fuel: { x: 624, y: 503, to: onBus(-41, 33) },
    wires: { x: 1174, y: 461, to: onBus(141, 30) },
    tyres: { x: 884, y: 497, to: onBus(92, 74) },
    hill: { x: 1204, y: 91, to: onBus(116, -26) },
  },
};
