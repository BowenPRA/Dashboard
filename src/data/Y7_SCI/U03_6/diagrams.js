// src/data/Y7_SCI/U03_6/diagrams.js
// Teaching diagrams for 3.6 Changes in energy, ported from the classroom deck
// (content/y7-science/U03_6/diagrams.js). The second half is diagramsB.js.
//
//   Change it
//     DROP_Q         new: the starter — a ball held at the top of a door, 2 m
//                   up, and a "?" where it bounces to
//     PIC_CHANGE_IT  a ball bouncing lower each time (the goals picture)
//     EVENT_PROCESS  a book falls (an event) and wood burns (a process)
//   Draw it
//     BOOK_DIAGRAMS  the book's three diagrams (page 113): a fire, a television
//                   (two arrows from one box), a falling book
//     ANS_CHARGE_IN / ANS_CHARGE_OUT   charging a phone — which way? The
//                   classroom's voting hands are taken out and the boxes centred
//     CHARGING       charging: electrical to chemical; using it: chemical out
//     THREE_THINGS   new: the radio, the bus and the ball on a hill (Q2–3)
//     POWER_PICS     the gas power station WITHOUT its boxes: the photo and the
//                   four pictures with their clue lines (the build fills them)
//
// What changed in the port: photos come from public/images/Y7_SCI/U03_6/
// through assetUrl, not an import; the hands are gone; DROP_Q, THREE_THINGS
// and POWER_PICS are new. Split diagrams are drawn at 840×560, showcase ones
// at 1120×440, vote cards at 720×320. Label <text> is written out literally so
// `npm run audit:svg` can measure it. Diagrams stay in English.
import { assetUrl } from '../../../utils/assetPaths';
import {
  INK, KEY, MUTED, BLUE, RED, FONT,
  plate, arrow, book, charging, tv, fire, burner, generator, tennisBall, radio, bus, hillBall,
} from './art.js';

const gasPlantPhoto = assetUrl('images/Y7_SCI/U03_6/gasplant.jpg');

// A box of the book's energy-change diagrams: white, thin dark outline.
export const box = (x, y, w, h = 60) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="${INK}" stroke-width="3"/>`;

// An empty box waiting for its word.
const blank = (x, y, w, h = 76) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#f7fafc" stroke="#9aa7b4" stroke-width="3" stroke-dasharray="10 8"/>`;

// A photograph cropped to its cell, with rounded corners.
export const photo = (id, href, x, y, w, h) => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`;

// A shelf on the wall, its brackets underneath.
const shelf = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="14" rx="3" fill="#b5835a" stroke="${INK}" stroke-width="3"/>
    <path d="M ${x + 20} ${y + 14} v 26 l 26 -26 M ${x + w - 20} ${y + 14} v 26 l -26 -26" fill="none" stroke="${MUTED}" stroke-width="5" stroke-linejoin="round"/>`;

export const DIAGRAMS = {
  // ── Change it ─────────────────────────────────────────────────────────────
  DROP_Q: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="30" y1="500" x2="660" y2="500" stroke="${INK}" stroke-width="4"/>
    <path d="M 70 500 V 100 H 250 V 500" fill="none" stroke="#b5835a" stroke-width="16" stroke-linejoin="round"/>
    <rect x="86" y="116" width="148" height="384" fill="#f3e6d6"/>
    <circle cx="214" cy="320" r="7" fill="${MUTED}"/>
    <line x1="250" y1="100" x2="700" y2="100" stroke="#9aa7b4" stroke-width="3" stroke-dasharray="8 8"/>
    ${tennisBall(330, 124, 24)}
    ${arrow(330, 160, 330, 470, BLUE, 4, 16)}
    <path d="M 340 490 Q 400 200 460 490" fill="none" stroke="${KEY}" stroke-width="4" stroke-dasharray="10 9"/>
    <rect x="370" y="212" width="80" height="70" rx="12" fill="#fdf1e3" stroke="${KEY}" stroke-width="3"/>
    <text x="410" y="264" font-family="${FONT}" font-size="48" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <line x1="720" y1="500" x2="720" y2="100" stroke="${INK}" stroke-width="3"/>
    <line x1="708" y1="500" x2="732" y2="500" stroke="${INK}" stroke-width="3"/>
    <line x1="708" y1="400" x2="732" y2="400" stroke="${INK}" stroke-width="3"/>
    <line x1="708" y1="300" x2="732" y2="300" stroke="${INK}" stroke-width="3"/>
    <line x1="708" y1="200" x2="732" y2="200" stroke="${INK}" stroke-width="3"/>
    <line x1="708" y1="100" x2="732" y2="100" stroke="${INK}" stroke-width="3"/>
    <text x="744" y="508" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">0 m</text>
    <text x="744" y="308" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">1 m</text>
    <text x="744" y="108" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">2 m</text>
    <text x="160" y="80" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">a door: about 2 m</text>
    <text x="330" y="540" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">dropped from 2 m</text>
  </svg>`,

  PIC_CHANGE_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="60" y1="480" x2="780" y2="480" stroke="${INK}" stroke-width="4"/>
    <line x1="60" y1="110" x2="780" y2="110" stroke="#9aa7b4" stroke-width="3" stroke-dasharray="8 8"/>
    <text x="770" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="end">2 m</text>
    <path d="M 120 110 Q 190 110 240 456 Q 350 140 460 456 Q 540 270 620 456 Q 680 340 740 456" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="10 10"/>
    ${tennisBall(120, 110, 28)}
    ${tennisBall(350, 298, 26)}
    ${tennisBall(680, 398, 24)}
    <text x="350" y="250" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">1.1 m</text>
  </svg>`,

  EVENT_PROCESS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="20" y="20" width="390" height="520" rx="16" fill="#e9f1fa"/>
    <rect x="430" y="20" width="390" height="520" rx="16" fill="#fdf1e3"/>
    <text x="215" y="70" font-family="${FONT}" font-size="34" font-weight="bold" fill="${BLUE}" text-anchor="middle">an event</text>
    <text x="215" y="108" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">over in a second</text>
    ${shelf(70, 170, 180)}
    <g transform="rotate(26 230 290)">${book(230, 290, 0.9)}</g>
    <path d="M 200 156 Q 236 190 226 236" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="8 8"/>
    ${arrow(320, 230, 320, 380, BLUE, 6, 20)}
    <line x1="60" y1="410" x2="370" y2="410" stroke="${INK}" stroke-width="4"/>
    <text x="215" y="462" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">gravitational potential</text>
    <text x="215" y="496" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">→ kinetic</text>
    <text x="625" y="70" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a process</text>
    <text x="625" y="108" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">burns for hours</text>
    ${fire(625, 300, 1.05)}
    <path d="M 742 168 a 30 30 0 1 1 -20 -26" fill="none" stroke="${MUTED}" stroke-width="5" stroke-linecap="round"/>
    ${arrow(724, 148, 714, 136, MUTED, 4, 14)}
    <text x="625" y="462" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">chemical</text>
    <text x="625" y="496" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">→ thermal</text>
  </svg>`,

  // ── Draw it ───────────────────────────────────────────────────────────────
  BOOK_DIAGRAMS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${fire(94, 108, 0.46)}
    ${box(206, 72, 190)}${box(560, 72, 190)}
    ${arrow(404, 102, 550, 102, INK, 4, 16)}
    <text x="301" y="111" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">chemical</text>
    <text x="655" y="111" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">thermal</text>
    <text x="94" y="184" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a fire</text>
    <line x1="30" y1="204" x2="810" y2="204" stroke="#e2e8f0" stroke-width="2"/>
    ${tv(94, 276, 0.42)}
    ${box(206, 248, 190)}${box(560, 222, 190)}${box(560, 300, 190)}
    ${arrow(404, 278, 550, 252, INK, 4, 16)}
    ${arrow(404, 278, 550, 330, INK, 4, 16)}
    <text x="301" y="287" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">electrical</text>
    <text x="655" y="261" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">sound</text>
    <text x="655" y="339" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">light</text>
    <text x="94" y="348" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a television</text>
    <line x1="30" y1="380" x2="810" y2="380" stroke="#e2e8f0" stroke-width="2"/>
    ${shelf(40, 418, 108)}
    <g transform="rotate(24 104 470)">${book(104, 470, 0.42)}</g>
    ${box(190, 438, 320)}${box(620, 438, 160)}
    ${arrow(518, 468, 610, 468, INK, 4, 16)}
    <text x="350" y="477" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">gravitational potential</text>
    <text x="700" y="477" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">kinetic</text>
    <text x="94" y="542" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a falling book</text>
  </svg>`,

  ANS_CHARGE_IN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${box(210, 36, 300, 78)}${box(210, 206, 300, 78)}
    ${arrow(360, 122, 360, 198, BLUE, 7, 26)}
    <text x="360" y="90" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">electrical</text>
    <text x="360" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">chemical</text>
  </svg>`,

  ANS_CHARGE_OUT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${box(210, 36, 300, 78)}${box(210, 206, 300, 78)}
    ${arrow(360, 122, 360, 198, KEY, 7, 26)}
    <text x="360" y="90" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">chemical</text>
    <text x="360" y="260" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">electrical</text>
  </svg>`,

  THREE_THINGS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${radio(210, 150, 0.9)}
    <text x="210" y="252" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">a radio</text>
    ${bus(620, 140, 0.9)}
    <text x="620" y="252" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">a bus</text>
    <line x1="40" y1="290" x2="800" y2="290" stroke="#e2e8f0" stroke-width="2"/>
    ${hillBall(420, 410, 1.05)}
    <text x="420" y="540" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">a ball rolling down a hill</text>
  </svg>`,

  POWER_PICS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('u36-ps', gasPlantPhoto, 20, 20, 300, 372)}
    <text x="170" y="426" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">a gas power station</text>
    ${burner(432, 126, 0.95)}
    <path d="M 598 172 q -9 -14 0 -28 q 9 -14 0 -28 q -9 -14 0 -28 M 628 172 q -9 -14 0 -28 q 9 -14 0 -28 q -9 -14 0 -28 M 658 172 q -9 -14 0 -28 q 9 -14 0 -28 q -9 -14 0 -28" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>
    ${generator(824, 128, 0.82)}
    <path d="M 1021 80 L 995 132 L 1015 132 L 999 180 L 1045 116 L 1023 116 L 1039 80 Z" fill="#ffd45c" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    ${blank(352, 226, 160)}${blank(548, 226, 160)}${blank(744, 226, 160)}${blank(940, 226, 160)}
    ${arrow(515, 264, 545, 264, INK, 4, 14)}
    ${arrow(711, 264, 741, 264, INK, 4, 14)}
    ${arrow(907, 264, 937, 264, INK, 4, 14)}
    <text x="432" y="280" font-family="${FONT}" font-size="40" font-weight="bold" fill="#c3cbd4" text-anchor="middle">?</text>
    <text x="628" y="280" font-family="${FONT}" font-size="40" font-weight="bold" fill="#c3cbd4" text-anchor="middle">?</text>
    <text x="824" y="280" font-family="${FONT}" font-size="40" font-weight="bold" fill="#c3cbd4" text-anchor="middle">?</text>
    <text x="1020" y="280" font-family="${FONT}" font-size="40" font-weight="bold" fill="#c3cbd4" text-anchor="middle">?</text>
    <text x="432" y="342" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">in the gas</text>
    <text x="628" y="342" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">the gas burns</text>
    <text x="824" y="342" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">generators spin</text>
    <text x="1020" y="342" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">wires to homes</text>
  </svg>`,

  // The book's charging diagram: into the battery, then out again.
  CHARGING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="56" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">Charging</text>
    ${charging(170, 160, 0.72)}
    ${box(380, 128, 190)}${box(630, 128, 180)}
    ${arrow(578, 158, 622, 158, INK, 4, 16)}
    <text x="475" y="167" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">electrical</text>
    <text x="720" y="167" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">chemical</text>
    ${gauge(632, 204, 3, '#4a8b23')}
    <text x="728" y="230" font-family="${FONT}" font-size="22" font-weight="bold" fill="#4a8b23">fills up</text>
    <line x1="30" y1="270" x2="810" y2="270" stroke="#e2e8f0" stroke-width="3"/>
    <text x="30" y="316" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">Using it</text>
    <rect x="76" y="340" width="96" height="170" rx="16" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
    <rect x="86" y="356" width="76" height="130" rx="6" fill="#fff3b0"/>
    <path d="M 192 390 q 14 24 0 48 M 212 376 q 24 38 0 76" fill="none" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    ${box(250, 394, 160)}${box(450, 394, 160)}${box(660, 344, 150)}${box(660, 444, 150)}
    ${arrow(414, 424, 444, 424, INK, 4, 14)}
    ${arrow(614, 424, 654, 376, INK, 4, 14)}
    ${arrow(614, 424, 654, 472, INK, 4, 14)}
    <text x="330" y="433" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">chemical</text>
    <text x="530" y="433" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">electrical</text>
    <text x="735" y="383" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">light</text>
    <text x="735" y="483" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">sound</text>
    ${gauge(252, 470, 1, RED)}
    <text x="348" y="496" font-family="${FONT}" font-size="22" font-weight="bold" fill="${RED}">runs down</text>
  </svg>`,
};

// A phone's battery icon, `bars` of 3 full: charging fills it, using empties it.
function gauge(x, y, bars, color) {
  return `<rect x="${x}" y="${y}" width="80" height="36" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="${x + 80}" y="${y + 11}" width="8" height="14" rx="2" fill="${INK}"/>
    ${[0, 1, 2].slice(0, bars).map((i) => `<rect x="${x + 7 + i * 23}" y="${y + 7}" width="19" height="22" rx="3" fill="${color}"/>`).join('')}`;
}
