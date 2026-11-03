// src/data/Y7_SCI/U03_7/diagrams.js
// Teaching diagrams for 3.7 Where Does Energy Go?, ported from the classroom
// deck (content/y7-science/U03_7/diagrams.js) for the self-study deck.
//
//   Sort it
//     PUMP_PHOTO    NEW: the petrol-shop photo alone (the starter's estimate,
//                   before the 25% is shown)
//     MOTO_PUMP     the book's motorbike (page 118) and its energy-change
//                   diagram: a green arrow to the useful energy, a red to the wasted
//     USEFUL_RULE   NEW: a kettle, a toaster, a radio and a cooking fire, no
//                   words (beside the Useful or Wasted? sort)
//   Count it
//     LAMP_PAIR     NEW: the book's two lamps, photographed, A and B, the same
//                   light (the classroom's two vote cards, without the hands)
//     HEAT_CAMERA   the two lamps through a heat camera
//     LAMPS         the two lamps' energy-change diagrams with the book's
//                   percentages (page 118)
//   Chase it
//     SPREAD        heat in one place → spread out → gathered back? never
//     WOOD_FIRE     the book's pot on a wood fire (page 119): bánh chưng pots
//                   in Ninh Bình at Tết, the water labelled useful
//     ALWAYS        put it together: 3.6's ball and candle, and the motorbike
//   Where Did It Go? (ENERGY_SPLIT)
//     DEV_*         one picture per device, no text, 400 × 260 (data.js passes
//                   them to the engine as `pictures`)
//
// WHAT CHANGED IN THE PORT: photos come from public/images/Y7_SCI/U03_7/
// through assetUrl, not an import; clip-path ids carry a u37- prefix; the goal
// pictures and the four vote cards are not ported (the plan says why).
// Split diagrams are 840 × 560, the showcase 1120 × 440. Label <text> is
// written out literally so `npm run audit:svg` can measure it. Diagrams stay
// in English, as in the classroom.
import { assetUrl } from '../../../utils/assetPaths'
import {
  INK, KEY, MUTED, GREEN, RED, FONT,
  plate, arrow, leader, motorbike, squiggles, noise, filament, twisty, mug, candle, tennisBall,
  kettle, toaster, radio, potFire, charging, cyclist, stairs, fan,
} from './art.js'

const img = (f) => assetUrl(`images/Y7_SCI/U03_7/${f}`)
const PETROL = img('petrol-shop.jpg')
const WOOD = img('wood-fire.jpg')
const LAMP_A = img('lamp-filament.jpg')
const LAMP_B = img('lamp-twisty.jpg')
const HEAT_A = img('heat-filament.jpg')
const HEAT_B = img('heat-twisty.jpg')

// A box of the energy-change diagrams: white, thin dark outline (as in 3.6).
const box = (x, y, w, h = 60, stroke = INK) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>`

// A photograph cropped to its cell, with rounded corners.
const photo = (id, href, x, y, w, h) => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A whole object photographed on white: fitted, not cropped, no frame.
const cutout = (href, x, y, w, h) => `<image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`

// Red dots of heat at fixed places (a picture, so no text in it).
const dots = (pts, r = 7) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${RED}" stroke="#ffffff" stroke-width="1.5"/>`).join('')
const SCATTER = [[34, 30], [96, 52], [160, 24], [206, 70], [52, 96], [128, 112], [190, 138], [24, 160], [88, 176], [150, 196], [214, 210], [60, 236], [118, 252], [182, 266], [30, 290]]
const scatterIn = (x, y) => dots(SCATTER.map(([a, b]) => [x + a, y + b]))

// A device picture for Where Did It Go?: one object on a white plate.
const dev = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" class="w-full h-full">
    ${plate(400, 260)}
    ${body}
  </svg>`

export const DIAGRAMS = {
  // ── Sort it ───────────────────────────────────────────────────────────────
  PUMP_PHOTO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 400" class="w-full h-full">
    ${plate(840, 400)}
    ${photo('u37-pump', PETROL, 20, 20, 800, 360)}
    <rect x="514" y="332" width="296" height="34" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="798" y="357" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">a petrol shop in Hà Nội</text>
  </svg>`,

  MOTO_PUMP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('u37-mp', PETROL, 20, 20, 800, 355)}
    <rect x="514" y="331" width="296" height="34" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="798" y="356" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">a petrol shop in Hà Nội</text>
    ${box(30, 430, 190, 64)}
    <text x="125" y="472" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">chemical</text>
    <text x="125" y="526" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">in the petrol</text>
    ${box(452, 392, 190, 60, GREEN)}${box(452, 484, 280, 60, RED)}
    ${arrow(228, 452, 444, 422, GREEN, 6, 22)}
    ${arrow(228, 474, 444, 514, RED, 6, 22)}
    <text x="547" y="432" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">kinetic</text>
    <text x="592" y="524" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">thermal, sound</text>
    <text x="654" y="434" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">25%</text>
    <text x="744" y="526" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">75%</text>
    <text x="330" y="416" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="330" y="544" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">wasted</text>
  </svg>`,

  USEFUL_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="420" y1="30" x2="420" y2="530" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="30" y1="280" x2="810" y2="280" stroke="#e2e8f0" stroke-width="2"/>
    ${kettle(200, 150, 0.95)}
    ${toaster(630, 160, 0.95)}
    ${radio(200, 420, 0.95)}
    ${potFire(630, 410, 0.92)}
  </svg>`,

  // ── Count it ──────────────────────────────────────────────────────────────
  LAMP_PAIR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}
    <text x="70" y="96" font-family="${FONT}" font-size="64" font-weight="bold" fill="#1a5fa8" text-anchor="middle">A</text>
    ${cutout(LAMP_A, 110, 30, 230, 400)}
    <text x="490" y="96" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">B</text>
    ${cutout(LAMP_B, 530, 30, 230, 400)}
    <text x="420" y="470" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">the same light</text>
  </svg>`,

  HEAT_CAMERA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs><linearGradient id="u37-hc-key" x1="0" x2="1"><stop offset="0" stop-color="#1b2a8f"/><stop offset="0.35" stop-color="#2fd0e0"/><stop offset="0.6" stop-color="#f4e43a"/><stop offset="0.8" stop-color="#f08a24"/><stop offset="1" stop-color="#e0283a"/></linearGradient></defs>
    <text x="36" y="70" font-family="${FONT}" font-size="54" font-weight="bold" fill="${INK}">A</text>
    ${cutout(LAMP_A, 30, 96, 110, 200)}
    ${photo('u37-hc-a', HEAT_A, 156, 20, 378, 286)}
    <text x="345" y="350" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">hottest: about 175 °C</text>
    <text x="596" y="70" font-family="${FONT}" font-size="54" font-weight="bold" fill="${INK}">B</text>
    ${cutout(LAMP_B, 590, 96, 110, 200)}
    ${photo('u37-hc-b', HEAT_B, 716, 20, 384, 286)}
    <text x="908" y="350" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">hottest: about 96 °C</text>
    <rect x="360" y="386" width="400" height="26" rx="6" fill="url(#u37-hc-key)"/>
    <text x="346" y="408" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="end">cool</text>
    <text x="774" y="408" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">hot</text>
  </svg>`,

  LAMPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="36" y="58" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">A</text>
    ${filament(120, 160, 0.78)}
    ${box(236, 128, 196, 64)}
    ${box(560, 52, 170, 64, GREEN)}${box(560, 206, 170, 64, RED)}
    ${arrow(440, 150, 552, 92, GREEN, 6, 22)}
    ${arrow(440, 172, 552, 230, RED, 6, 22)}
    <text x="334" y="170" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">electrical</text>
    <text x="645" y="94" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">light</text>
    <text x="645" y="248" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">thermal</text>
    <text x="742" y="96" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">15%</text>
    <text x="742" y="250" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">85%</text>
    <text x="474" y="102" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="474" y="240" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">wasted</text>
    <line x1="30" y1="290" x2="810" y2="290" stroke="#e2e8f0" stroke-width="2"/>
    <text x="36" y="342" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">B</text>
    ${twisty(120, 444, 0.9)}
    ${box(236, 404, 196, 64)}
    ${box(560, 328, 170, 64, GREEN)}${box(560, 482, 170, 64, RED)}
    ${arrow(440, 426, 552, 368, GREEN, 6, 22)}
    ${arrow(440, 448, 552, 506, RED, 6, 22)}
    <text x="334" y="446" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">electrical</text>
    <text x="645" y="370" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">light</text>
    <text x="645" y="524" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">thermal</text>
    <text x="742" y="372" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">50%</text>
    <text x="742" y="526" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">50%</text>
    <text x="474" y="378" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="474" y="516" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">wasted</text>
  </svg>`,

  // ── Chase it ──────────────────────────────────────────────────────────────
  SPREAD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="20" y="40" width="236" height="330" rx="14" fill="#f7fafc" stroke="${MUTED}" stroke-width="2.5"/>
    ${mug(132, 238, 0.86)}
    ${dots([[104, 214], [126, 214], [148, 214], [110, 236], [132, 236], [154, 236], [104, 258], [126, 258], [148, 258], [116, 280], [138, 280]])}
    ${arrow(262, 205, 298, 205, INK, 6, 20)}
    <rect x="302" y="40" width="236" height="330" rx="14" fill="#f7fafc" stroke="${MUTED}" stroke-width="2.5"/>
    ${mug(420, 316, 0.5, false)}
    ${scatterIn(300, 52)}
    <rect x="584" y="40" width="236" height="330" rx="14" fill="#f7fafc" stroke="${MUTED}" stroke-width="2.5"/>
    ${mug(702, 316, 0.5, false)}
    ${scatterIn(582, 52)}
    <path d="M 616 110 Q 630 230 664 262" fill="none" stroke="${MUTED}" stroke-width="5" stroke-dasharray="10 8"/>
    ${arrow(660, 258, 678, 274, MUTED, 5, 18)}
    <path d="M 662 170 L 742 250 M 742 170 L 662 250" stroke="${RED}" stroke-width="12" stroke-linecap="round"/>
    <text x="138" y="420" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">in one place</text>
    <text x="138" y="460" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="420" y="420" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">spread out</text>
    <text x="420" y="460" font-family="${FONT}" font-size="27" font-weight="bold" fill="${RED}" text-anchor="middle">dissipated</text>
    <text x="702" y="420" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">gathered back?</text>
    <text x="702" y="460" font-family="${FONT}" font-size="27" font-weight="bold" fill="${RED}" text-anchor="middle">never</text>
    <text x="420" y="526" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a red dot = some heat</text>
  </svg>`,

  WOOD_FIRE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('u37-wf', WOOD, 20, 20, 800, 520)}
    <rect x="34" y="34" width="414" height="46" rx="10" fill="#ffffff" opacity="0.93"/>
    <text x="50" y="66" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}">useful: the water in a pot</text>
    ${leader(180, 80, 236, 330, GREEN)}
    <rect x="566" y="494" width="240" height="32" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="796" y="518" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">Ninh Bình, Tết 2024</text>
  </svg>`,

  ALWAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="340" y="50" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="640" y="50" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">dissipated</text>
    ${tennisBall(96, 118, 34)}
    <path d="M 70 172 H 122" stroke="${INK}" stroke-width="4"/>
    <text x="96" y="200" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the ball</text>
    ${box(200, 78, 280, 96, GREEN)}${box(500, 78, 280, 96, RED)}
    <text x="340" y="116" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">bounces back up</text>
    <text x="340" y="156" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">55%</text>
    <text x="640" y="116" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">sound and heat</text>
    <text x="640" y="156" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">45%</text>
    ${candle(96, 288, 0.5)}
    <text x="96" y="364" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the candle</text>
    ${box(200, 238, 280, 96, GREEN)}${box(500, 238, 280, 96, RED)}
    <text x="340" y="276" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">heats the oil</text>
    <text x="340" y="316" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">a little</text>
    <text x="640" y="276" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">glass, tripod, air</text>
    <text x="640" y="316" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">most</text>
    ${motorbike(100, 440, 0.44)}
    <text x="96" y="530" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the motorbike</text>
    ${box(200, 398, 280, 96, GREEN)}${box(500, 398, 280, 96, RED)}
    <text x="340" y="436" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">moves the bike</text>
    <text x="340" y="476" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">25%</text>
    <text x="640" y="436" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">heat and sound</text>
    <text x="640" y="476" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">75%</text>
  </svg>`,

  // ── Where Did It Go? — one picture per device, no text ───────────────────
  DEV_CANDLE: dev(candle(200, 132, 1)),
  DEV_RADIO: dev(radio(186, 150, 0.95)),
  DEV_MOTORBIKE: dev(`${motorbike(214, 128, 0.88)}${squiggles(60, 180, 2, 20, 2, RED, 5)}`),
  DEV_LAMP_A: dev(filament(200, 150, 1.25)),
  DEV_LAMP_B: dev(twisty(200, 170, 1.4)),
  DEV_TOASTER: dev(toaster(200, 156, 1.1)),
  DEV_CHARGER: dev(charging(200, 136, 0.95)),
  DEV_CYCLIST: dev(cyclist(206, 134, 0.9)),
  DEV_KETTLE: dev(kettle(180, 140, 1.05)),
  DEV_STAIRS: dev(stairs(200, 154, 0.88)),
  DEV_FIRE: dev(potFire(200, 140, 1.05)),
  DEV_FAN: dev(fan(180, 140, 1.05)),
  DEV_BALL: dev(`<line x1="40" y1="236" x2="360" y2="236" stroke="${INK}" stroke-width="4"/>
    <path d="M 96 40 Q 120 236 200 214 Q 250 110 300 120" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="10 8"/>
    ${tennisBall(200, 206, 28)}
    ${noise(200, 186, KEY, 4)}
    <path d="M 60 40 H 132 M 264 120 H 336" stroke="${MUTED}" stroke-width="3" stroke-dasharray="6 6"/>`),
}
