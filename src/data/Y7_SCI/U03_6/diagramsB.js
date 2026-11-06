// src/data/Y7_SCI/U03_6/diagramsB.js
// Teaching diagrams for 3.6 Changes in energy, part two: "Follow it".
//
//     USEFUL_DANGER  the same moving air, useful (a wind farm) and dangerous (a
//                   typhoon), as photographs
//     CANDLE         the book's candle experiment (page 115): the kit labelled,
//                   heat arrows (unlabelled: where it goes is the question), and
//                   a line graph of the oil warming up (sample data)
//     ANS_COLD_IN / ANS_HEAT_OUT   water freezing — what moves? The voting
//                   hands are taken out and the drawings centred
//     FREEZER        heat comes OUT of the hotter water into the colder air
//     FIREWORK       new: a Tết firework bursting, for the exit build
//
// Ported from the classroom (content/y7-science/U03_6/diagrams.js); photos come
// through assetUrl. Label <text> is written out literally for the audit.
import { assetUrl } from '../../../utils/assetPaths';
import { INK, KEY, MUTED, BLUE, GREEN, RED, FONT, SEA, SEA_EDGE, plate, arrow, leader, candle, firework } from './art.js';
import { photo } from './diagrams.js';

const windFarmPhoto = assetUrl('images/Y7_SCI/U03_6/windfarm.jpg');
const typhoonPhoto = assetUrl('images/Y7_SCI/U03_6/typhoon.jpg');

// Heat leaving something: a short red arrow.
const heat = (x1, y1, x2, y2, w = 5) => arrow(x1, y1, x2, y2, RED, w, w * 3.4);

export const DIAGRAMS = {
  USEFUL_DANGER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('u36-wind', windFarmPhoto, 20, 20, 800, 248)}
    ${photo('u36-storm', typhoonPhoto, 20, 292, 800, 248)}
    <rect x="34" y="34" width="372" height="86" rx="12" fill="#ffffff" opacity="0.93"/>
    <text x="52" y="70" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}">useful</text>
    <text x="52" y="104" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">kinetic → electrical</text>
    <rect x="34" y="306" width="372" height="86" rx="12" fill="#ffffff" opacity="0.93"/>
    <text x="52" y="342" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}">dangerous</text>
    <text x="52" y="376" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">kinetic → falling trees</text>
    <rect x="510" y="226" width="296" height="30" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="796" y="248" font-family="${FONT}" font-size="18" fill="${INK}" text-anchor="end">a wind farm, Bạc Liêu</text>
    <rect x="480" y="498" width="326" height="30" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="796" y="520" font-family="${FONT}" font-size="18" fill="${INK}" text-anchor="end">Hà Nội after Typhoon Yagi</text>
  </svg>`,

  CANDLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="30" y="470" width="380" height="16" rx="4" fill="#a8b5a0" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 110 470 L 150 270 M 330 470 L 290 270 M 220 470 L 220 270" stroke="${MUTED}" stroke-width="7" stroke-linecap="round"/>
    <rect x="128" y="262" width="184" height="12" rx="3" fill="#c3c9d1" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 160 120 L 166 254 Q 166 262 174 262 L 266 262 Q 274 262 274 254 L 280 120" fill="#ffffff" stroke="${INK}" stroke-width="3.5"/>
    <path d="M 163 178 L 166 254 Q 166 262 174 262 L 266 262 Q 274 262 274 254 L 277 178 Z" fill="#f5d77a"/>
    <path d="M 160 120 L 166 254 Q 166 262 174 262 L 266 262 Q 274 262 274 254 L 280 120" fill="none" stroke="${INK}" stroke-width="3.5"/>
    <rect x="236" y="70" width="10" height="170" rx="5" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="241" cy="236" r="9" fill="${RED}" stroke="${INK}" stroke-width="2"/>
    ${candle(220, 404, 0.62)}
    ${heat(220, 330, 220, 290, 7)}
    ${heat(180, 352, 104, 330, 4)}
    ${heat(260, 352, 336, 330, 4)}
    ${leader(330, 160, 268, 200)}
    <text x="340" y="150" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">cooking oil</text>
    ${leader(96, 160, 162, 140)}
    <text x="30" y="150" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">glass</text>
    ${leader(330, 96, 246, 96)}
    <text x="340" y="104" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">thermometer</text>
    ${leader(390, 420, 316, 420)}
    <text x="398" y="428" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">tripod</text>
    <rect x="520" y="70" width="300" height="300" fill="#ffffff"/>
    <line x1="560" y1="350" x2="800" y2="350" stroke="${INK}" stroke-width="2.5"/>
    <line x1="560" y1="350" x2="560" y2="96" stroke="${INK}" stroke-width="2.5"/>
    <line x1="560" y1="290" x2="800" y2="290" stroke="#eef1f4" stroke-width="1.5"/>
    <line x1="560" y1="230" x2="800" y2="230" stroke="#eef1f4" stroke-width="1.5"/>
    <line x1="560" y1="170" x2="800" y2="170" stroke="#eef1f4" stroke-width="1.5"/>
    <line x1="560" y1="110" x2="800" y2="110" stroke="#eef1f4" stroke-width="1.5"/>
    <text x="550" y="356" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">20</text>
    <text x="550" y="236" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">25</text>
    <text x="550" y="116" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">30</text>
    <text x="560" y="378" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="620" y="378" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">1</text>
    <text x="680" y="378" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="740" y="378" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">3</text>
    <text x="800" y="378" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">4</text>
    <polyline points="560,338 620,278 680,216 740,158 800,98" fill="none" stroke="${KEY}" stroke-width="4"/>
    <circle cx="560" cy="338" r="7" fill="${KEY}"/><circle cx="620" cy="278" r="7" fill="${KEY}"/><circle cx="680" cy="216" r="7" fill="${KEY}"/><circle cx="740" cy="158" r="7" fill="${KEY}"/><circle cx="800" cy="98" r="7" fill="${KEY}"/>
    <text x="500" y="62" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}">oil temperature (°C)</text>
    <text x="800" y="414" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="end">time (minutes)</text>
    <text x="652" y="478" font-family="${FONT}" font-size="23" font-weight="bold" fill="${KEY}" text-anchor="middle">10 °C warmer in 4 minutes</text>
  </svg>`,

  ANS_COLD_IN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <rect x="298" y="120" width="124" height="70" rx="8" fill="${SEA}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M 298 140 H 422" stroke="${SEA_EDGE}" stroke-width="3"/>
    ${arrow(210, 155, 288, 155, BLUE, 7, 24)}
    ${arrow(510, 155, 432, 155, BLUE, 7, 24)}
    ${arrow(360, 36, 360, 110, BLUE, 7, 24)}
    <text x="360" y="268" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">cold goes in</text>
  </svg>`,

  ANS_HEAT_OUT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <rect x="298" y="120" width="124" height="70" rx="8" fill="${SEA}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M 298 140 H 422" stroke="${SEA_EDGE}" stroke-width="3"/>
    ${arrow(288, 155, 210, 155, RED, 7, 24)}
    ${arrow(432, 155, 510, 155, RED, 7, 24)}
    ${arrow(360, 110, 360, 36, RED, 7, 24)}
    <text x="360" y="268" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">heat comes out</text>
  </svg>`,

  FREEZER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="20" y1="494" x2="500" y2="494" stroke="${INK}" stroke-width="4"/>
    <rect x="66" y="478" width="34" height="14" fill="${MUTED}"/><rect x="420" y="478" width="34" height="14" fill="${MUTED}"/>
    <rect x="40" y="60" width="440" height="420" rx="18" fill="#f1f5f9" stroke="${INK}" stroke-width="4"/>
    <rect x="62" y="82" width="396" height="226" rx="10" fill="#dbeefb"/>
    <rect x="62" y="322" width="396" height="138" rx="10" fill="#e9edf1" stroke="#9fb8cc" stroke-width="3"/>
    <rect x="200" y="338" width="120" height="14" rx="7" fill="${MUTED}"/>
    <rect x="170" y="240" width="180" height="66" rx="8" fill="${SEA}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M 172 260 H 348" stroke="${SEA_EDGE}" stroke-width="3"/>
    ${heat(260, 228, 260, 110, 6)}
    ${heat(205, 232, 128, 140, 6)}
    ${heat(315, 232, 392, 140, 6)}
    ${heat(160, 274, 84, 274, 6)}
    ${heat(360, 274, 436, 274, 6)}
    ${leader(504, 114, 436, 100, BLUE)}
    <text x="512" y="112" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">freezer air</text>
    <text x="512" y="144" font-family="${FONT}" font-size="24" fill="${BLUE}">colder: −18 °C</text>
    ${leader(504, 214, 342, 200, RED)}
    <text x="512" y="223" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}">heat</text>
    ${leader(504, 298, 300, 296)}
    <text x="512" y="306" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">water</text>
    <text x="512" y="338" font-family="${FONT}" font-size="24" fill="${KEY}">hotter: 25 °C</text>
  </svg>`,

  FIREWORK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="16" y="16" width="808" height="528" rx="14" fill="#1f2a44"/>
    <circle cx="120" cy="90" r="3" fill="#ffffff"/><circle cx="720" cy="70" r="3" fill="#ffffff"/><circle cx="640" cy="180" r="2.5" fill="#ffffff"/><circle cx="200" cy="230" r="2.5" fill="#ffffff"/>
    ${firework(420, 260, 1.9)}
    ${firework(170, 150, 0.7)}
    ${firework(690, 170, 0.8)}
    <path d="M 60 520 L 60 470 L 120 470 L 120 440 L 190 440 L 190 520 Z M 640 520 L 640 450 L 700 450 L 700 480 L 780 480 L 780 520 Z" fill="#111827"/>
    <text x="420" y="526" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">a Tết firework bursts</text>
  </svg>`,
};
