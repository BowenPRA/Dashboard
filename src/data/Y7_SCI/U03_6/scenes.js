// src/data/Y7_SCI/U03_6/scenes.js
// The pictures of From… To… (ENERGY_CHANGE): one drawing per event or process
// the engine asks about, keyed by the scene ids in utils/energyChangeData.js.
// Most are the classroom game's own (art.js, art35.js); the new ones — a hair
// dryer, a phone in use, an ice cube on a hand, hot soup — are drawn here in
// the same style. NO text: the scene's name is written under the picture by
// the screen, in English or French.
//
// Each picture is a whole <svg> on a white plate, 340 × 240, so it reads on a
// light or a dark card.
import {
  INK, MUTED, RED, BLUE, SEA_EDGE, GOLD, f1, arrow, plate,
  kettle, bow, charging, drum, bulb, dam, book, bus, car, mug,
  appleFall, candle, solar, bird, tv, turbine, radio, hillBall, fire, burner, generator, firework, toaster,
} from './art.js';

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 240" class="w-full h-full">${plate(340, 240)}${body}</svg>`;

/** A hair dryer blowing hot air to the right. */
export const hairdryer = (x, y, s = 1) => at(x, y, s, `
  <path d="M -34 24 L -56 104 Q -58 114 -48 116 L -26 116 Q -16 116 -14 106 L 4 34 Z" fill="#5b8dbf" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="-60" y="-44" width="150" height="70" rx="22" fill="#7fa7cf" stroke="${INK}" stroke-width="4"/>
  <rect x="86" y="-36" width="26" height="54" rx="6" fill="#3d4650" stroke="${INK}" stroke-width="3"/>
  <circle cx="-40" cy="-9" r="24" fill="#e9edf1" stroke="${INK}" stroke-width="3"/>
  <path d="M -40 -27 V 9 M -58 -9 H -22" stroke="${MUTED}" stroke-width="3"/>
  <rect x="-24" y="34" width="18" height="12" rx="3" fill="${RED}"/>
  <path d="M 124 -26 H 168 M 128 -9 H 182 M 124 8 H 168" stroke="${BLUE}" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 8"/>
  <path d="M 140 -46 q -8 -10 0 -20 q 8 -10 0 -20 M 166 -40 q -8 -10 0 -20 q 8 -10 0 -20" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`);

/** A phone in use: the screen lit, sound coming out. */
export const phoneOn = (x, y, s = 1) => at(x, y, s, `
  <rect x="-44" y="-86" width="88" height="172" rx="14" fill="#3d4650" stroke="${INK}" stroke-width="4"/>
  <rect x="-34" y="-70" width="68" height="132" rx="6" fill="#fff3b0"/>
  <path d="M -22 -46 H 22 M -22 -28 H 14 M -22 -10 H 22 M -22 8 H 6" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="0" cy="74" r="6" fill="#c3c9d1"/>
  <path d="M 62 -30 q 16 26 0 52 M 84 -46 q 28 42 0 84" fill="none" stroke="#c25e12" stroke-width="5" stroke-linecap="round"/>
  <path d="M -62 -30 q -16 26 0 52" fill="none" stroke="#c25e12" stroke-width="5" stroke-linecap="round"/>`);

/** An open hand holding an ice cube, a drop of water falling. */
export const iceHand = (x, y, s = 1) => at(x, y, s, `
  <path d="M -110 40 Q -100 -6 -60 -6 L 80 -6 Q 96 -6 96 8 Q 96 22 80 22 L 20 22 L 96 26 Q 112 28 110 42 Q 108 56 92 54 L 20 50 L 88 58 Q 104 60 102 74 Q 100 88 84 86 L 10 80 Q -40 94 -80 82 Q -112 72 -110 40 Z" fill="#f2c9a0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -60 -6 Q -50 -40 -20 -44 Q 0 -46 4 -30 Q 6 -16 -14 -12" fill="#f2c9a0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="-30" y="-74" width="64" height="62" rx="8" fill="#dff1fb" stroke="${INK}" stroke-width="4" transform="rotate(-8 2 -43)"/>
  <path d="M -18 -62 l 16 -2 M -16 -50 l 10 -1" stroke="#ffffff" stroke-width="5" stroke-linecap="round" transform="rotate(-8 2 -43)"/>
  <path d="M 52 -4 q 6 10 0 16 q -6 -6 0 -16 z" fill="${SEA_EDGE}"/>`);

/** A bowl of hot soup, steaming, in a cool room. */
export const soup = (x, y, s = 1) => at(x, y, s, `
  <path d="M 30 -30 L 120 -92" stroke="${MUTED}" stroke-width="8" stroke-linecap="round"/>
  <path d="M -96 -14 H 96 Q 90 66 0 70 Q -90 66 -96 -14 Z" fill="#f4efe9" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="0" cy="-14" rx="96" ry="16" fill="#e8a33c" stroke="${INK}" stroke-width="4"/>
  <circle cx="-30" cy="-16" r="6" fill="#86ba69"/><circle cx="20" cy="-12" r="5" fill="#86ba69"/><circle cx="44" cy="-18" r="4" fill="#d83a2e"/>
  <rect x="-36" y="68" width="72" height="12" rx="4" fill="#f4efe9" stroke="${INK}" stroke-width="3"/>
  <path d="M -40 -40 q -12 -16 0 -32 q 12 -16 0 -32 M 0 -44 q -12 -16 0 -32 q 12 -16 0 -32 M 40 -40 q -12 -16 0 -32 q 12 -16 0 -32" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`);

// A shelf on the wall, its brackets underneath (as in diagrams.js).
const shelf = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="14" rx="3" fill="#b5835a" stroke="${INK}" stroke-width="3"/>
    <path d="M ${x + 20} ${y + 14} v 26 l 26 -26 M ${x + w - 20} ${y + 14} v 26 l -26 -26" fill="none" stroke="${MUTED}" stroke-width="5" stroke-linejoin="round"/>`;

// Heat waves rising: three red wiggles.
const waves = (x, y, h = 28) => [0, 1, 2].map((k) => `<path d="M ${x + k * 26} ${y} q -8 ${f1(-h / 4)} 0 ${f1(-h / 2)} q 8 ${f1(-h / 4)} 0 ${f1(-h / 2)}" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>`).join('');

// A lightning flash: electricity.
const flash = (x, y, s = 1) => at(x, y, s, `<path d="M 13 -50 L -13 2 L 7 2 L -9 50 L 37 -14 L 15 -14 L 31 -50 Z" fill="#ffd45c" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`);

/** The scenes, by the ids utils/energyChangeData.js uses. */
export const SCENE_PICS = {
  kettle: svg(kettle(170, 132, 0.95)),
  apple: svg(appleFall(196, 112, 0.9)),
  candle: svg(`<rect x="12" y="12" width="316" height="216" rx="12" fill="#2f3b4a"/>${candle(170, 132, 1)}`),
  bow: svg(bow(150, 120, 1.05)),
  charging: svg(charging(170, 124, 0.9)),
  solar: svg(solar(180, 116, 0.95)),
  drum: svg(drum(170, 140, 0.95)),
  book: svg(`${shelf(40, 70, 130)}<g transform="rotate(26 196 128)">${book(196, 128, 0.7)}</g>
    <path d="M 150 64 Q 186 86 184 104" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="8 8"/>
    ${arrow(262, 104, 262, 196, BLUE, 6, 20)}<line x1="30" y1="214" x2="310" y2="214" stroke="${INK}" stroke-width="4"/>`),
  bird: svg(bird(186, 118, 1.05)),
  tv: svg(tv(170, 116, 0.95)),
  hairdryer: svg(hairdryer(140, 112, 0.92)),
  powerStation: svg(`${burner(84, 120, 0.7)}${waves(62, 98)}${arrow(126, 120, 162, 120, MUTED, 4, 14)}
    ${generator(218, 118, 0.62)}${arrow(266, 120, 290, 120, MUTED, 4, 14)}${flash(306, 120, 0.7)}`),
  dam: svg(dam(170, 120, 0.95)),
  windLamp: svg(`${turbine(96, 104, 0.82)}<path d="M 112 200 H 210 V 168" fill="none" stroke="${INK}" stroke-width="4"/>${bulb(244, 118, 0.8)}`),
  iceHand: svg(iceHand(166, 136, 1)),
  soup: svg(soup(170, 140, 0.95)),
  phone: svg(phoneOn(170, 120, 1)),
  radio: svg(radio(160, 132, 0.95)),
  bus: svg(bus(170, 120, 0.95)),
  car: svg(car(178, 120, 0.9)),
  hillBall: svg(hillBall(170, 120, 0.9)),
  fire: svg(fire(170, 150, 0.9)),
  toaster: svg(toaster(170, 140, 0.95)),
  firework: svg(`<rect x="12" y="12" width="316" height="216" rx="12" fill="#1f2a44"/>${firework(170, 128, 1)}`),
  turbine: svg(turbine(170, 108, 0.82)),
  mug: svg(mug(170, 140, 0.9)),
};

/** The palette's eight action figures (3.5's), each on its own small plate. */
export { pose } from './art35.js';
