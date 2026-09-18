// content/y7-science/U01_3/diagrams.js
// Teaching diagrams for 1.3 Specialised cells, drawn in the same house style as
// 1.1 and 1.2 so the whole unit reads as one book: flat line art on paper-white,
// a thin ink outline on every shape, pale flat fills, and key words set in the
// Learner's Book orange out in the margin on a hairline leader line.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so artwork is legible on a light
//    OR dark slide and never depends on the page's text colour;
//  · label <text> is written out literally (never built by a helper) so
//    `npm run audit:svg` can actually measure it;
//  · label text lives in the margins, never on top of the drawing.
//
// Each specialised cell is drawn the way the Learner's Book draws it on pp.18-20,
// keeping every organelle the colour it had in 1.1/1.2.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'

const WALL_F = '#f9dcc4', WALL_S = '#e07b39'
const CYTO_F = '#eaf0f8', MEMB_S = '#8fa6c4'
const VAC_F = '#dbeafe', VAC_S = '#7ba7d4'
const NUC_F = '#9b7fc4', NUC_S = '#6f52a0'
const CHL_F = '#5aab4e', CHL_S = '#3a7d31'
const RBC_F = '#eda6a2', RBC_S = '#c2185b', RBC_PALE = '#f7d2cf'
const SOIL_F = '#e2d3b8', SOIL_S = '#a3762f' // soil grains round a root hair
const WATER = '#2f7fc4' // water moving in from the soil
const SUN = '#e8a33d' // sunlight falling on a leaf

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a label to the thing, ending in a small dot. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>
    <circle class="lbl" cx="${x2}" cy="${y2}" r="3.2" fill="${LEAD}"/>`

const rd = (v) => Math.round(v * 10) / 10
const at = (cx, cy, deg, r) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]

/** A dendrite: a strand heading `deg` from (x, y) that forks in two, `depth` times. */
const dendrite = (x, y, deg, len, depth) => {
  const [x2, y2] = at(x, y, deg, len)
  let d = `M ${rd(x)} ${rd(y)} L ${rd(x2)} ${rd(y2)} `
  if (depth > 0) d += dendrite(x2, y2, deg - 30, len * 0.66, depth - 1) + dendrite(x2, y2, deg + 26, len * 0.62, depth - 1)
  return d
}

/** A tapering root where a dendrite leaves the cell body, as a closed path. */
const taper = (cx, cy, deg, r0, r1, half) => {
  const [bx, by] = at(cx, cy, deg, r0)
  const [tx, ty] = at(cx, cy, deg, r1)
  const [nx, ny] = at(0, 0, deg + 90, half)
  return `M ${rd(bx + nx)} ${rd(by + ny)} L ${rd(tx)} ${rd(ty)} L ${rd(bx - nx)} ${rd(by - ny)} Z`
}

// The neurone's cell body sits at (260, 170); a dendrite leaves it at each angle.
const NEURONE_ROOTS = [120, 165, 210, 250, 292]
const neuroneTrees = () => NEURONE_ROOTS.map((d) => {
  const [x, y] = at(260, 170, d, 84)
  return dendrite(x, y, d, 30, 2)
}).join('')
const neuroneBody = () => NEURONE_ROOTS.map((d) => `<path d="${taper(260, 170, d, 36, 86, 12)}"/>`).join('') +
  '<ellipse cx="260" cy="170" rx="52" ry="44"/>'

/** A chloroplast: green oval with two darker grana bands. */
const chloro = (x, y, vertical = true) => {
  const [rx, ry] = vertical ? [11, 18] : [18, 11]
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${CHL_F}" stroke="${CHL_S}" stroke-width="2"/>
    <line x1="${x - rx * 0.45}" y1="${y - ry * 0.3}" x2="${x + rx * 0.45}" y2="${y - ry * 0.3}" stroke="${CHL_S}" stroke-width="1.4"/>
    <line x1="${x - rx * 0.45}" y1="${y + ry * 0.25}" x2="${x + rx * 0.45}" y2="${y + ry * 0.25}" stroke="${CHL_S}" stroke-width="1.4"/>`
}

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The hook picture: three animal cells as bare silhouettes. It carries NO
  // title and no cell names on purpose — this is the slide where the class is
  // asked why three cells out of one body look nothing alike, and a title
  // stating "three different shapes" would answer the question before they do.
  // The three descriptors stay: they are the English words the class needs to
  // describe what they can see, and they name no cell and explain nothing.
  // ───────────────────────────────────────────────────────────────────────────
  THREE_SHAPES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 250" class="w-full h-full">
    ${plate(700, 250)}

    <circle cx="130" cy="124" r="66" fill="${RBC_F}" stroke="${RBC_S}" stroke-width="3.5"/>
    <ellipse cx="130" cy="124" rx="30" ry="26" fill="${RBC_PALE}"/>

    <ellipse cx="360" cy="124" rx="34" ry="30" fill="${CYTO_F}" stroke="${RBC_S}" stroke-width="3"/>
    <path d="M 330 106 L 300 82 M 332 124 L 296 124 M 332 144 L 302 170 M 352 96 L 340 66 M 388 112 L 430 94 M 392 132 L 560 142 M 388 148 L 430 174" fill="none" stroke="${RBC_S}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 560 142 l -12 -6 M 560 142 l -12 7" fill="none" stroke="${RBC_S}" stroke-width="3" stroke-linecap="round"/>

    <rect x="596" y="60" width="70" height="128" rx="14" fill="${CYTO_F}" stroke="${RBC_S}" stroke-width="3"/>
    <path d="M 600 60 l -6 -16 M 612 60 l -3 -18 M 624 60 l 0 -19 M 636 60 l 3 -18 M 648 60 l 6 -16 M 660 60 l 8 -15" fill="none" stroke="${RBC_S}" stroke-width="2.5" stroke-linecap="round"/>

    <text x="130" y="224" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">a flat disc</text>
    <text x="360" y="224" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">long arms</text>
    <text x="631" y="224" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">tiny hairs</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Red blood cell (Learner's Book p.18). A biconcave disc: the pale centre is
  // the dip. No nucleus, so there is more room for the red pigment haemoglobin.
  // ───────────────────────────────────────────────────────────────────────────
  RED_BLOOD_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" class="w-full h-full">
    ${plate(700, 320)}
    <defs>
      <radialGradient id="rbc-face" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${RBC_PALE}"/><stop offset="0.42" stop-color="#f4c0bc"/>
        <stop offset="0.78" stop-color="${RBC_F}"/><stop offset="1" stop-color="#df8580"/>
      </radialGradient>
      <linearGradient id="rbc-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4c0bc"/><stop offset="1" stop-color="#df8580"/>
      </linearGradient>
    </defs>

    <circle cx="180" cy="140" r="100" fill="url(#rbc-face)" stroke="${RBC_S}" stroke-width="4"/>

    <path d="M 310 262 C 310 236, 346 234, 366 246 C 374 251, 386 251, 394 246 C 414 234, 450 236, 450 262 C 450 288, 414 290, 394 278 C 386 273, 374 273, 366 278 C 346 290, 310 288, 310 262 Z" fill="url(#rbc-side)" stroke="${RBC_S}" stroke-width="3"/>
    <text x="380" y="310" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">the same cell, seen from the side</text>

    ${lead(500, 60, 222, 50)}
    ${lead(500, 130, 262, 130)}
    ${lead(500, 196, 184, 142)}
    ${lead(500, 262, 452, 262)}

    <text x="512" y="66" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">cell membrane</text>
    <text x="512" y="126" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">cytoplasm, full</text>
    <text x="512" y="146" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">of haemoglobin</text>
    <text x="512" y="202" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">no nucleus</text>
    <text x="512" y="258" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">a disc, dented on</text>
    <text x="512" y="278" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">both sides</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Neurone (Learner's Book p.18). Short dendrites collect signals; the very long
  // axon carries them far and fast. Drawn long on purpose — that length is the
  // whole adaptation.
  // ───────────────────────────────────────────────────────────────────────────
  // Drawn in two passes so the outline is one continuous membrane: every part
  // first in the membrane colour and a little fat, then again in the cytoplasm
  // colour — only the rim of the first pass shows.
  NEURONE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 320" class="w-full h-full">
    ${plate(760, 320)}

    <path d="${neuroneTrees()}" fill="none" stroke="${MEMB_S}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="${MEMB_S}" stroke="${MEMB_S}" stroke-width="6" stroke-linejoin="round">${neuroneBody()}</g>
    <path d="M 300 182 C 400 196, 520 200, 640 200" fill="none" stroke="${MEMB_S}" stroke-width="20" stroke-linecap="round"/>
    <path d="M 640 200 L 688 178 M 640 200 L 694 206 M 640 200 L 678 236" fill="none" stroke="${MEMB_S}" stroke-width="10" stroke-linecap="round"/>
    <path d="M 300 182 C 400 196, 520 200, 640 200" fill="none" stroke="${CYTO_F}" stroke-width="14" stroke-linecap="round"/>
    <path d="M 640 200 L 688 178 M 640 200 L 694 206 M 640 200 L 678 236" fill="none" stroke="${CYTO_F}" stroke-width="5" stroke-linecap="round"/>
    <g fill="${CYTO_F}">${neuroneBody()}</g>
    <g fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="3"><circle cx="690" cy="177" r="7"/><circle cx="697" cy="206" r="7"/><circle cx="680" cy="239" r="7"/></g>

    <circle cx="242" cy="168" r="20" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>
    <circle cx="247" cy="162" r="6" fill="${NUC_S}"/>

    ${lead(380, 50, 318, 52)}
    ${lead(380, 105, 257, 174)}
    ${lead(380, 150, 292, 172)}
    ${lead(310, 262, 286, 208)}
    ${lead(520, 262, 520, 200)}

    <text x="392" y="55" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">dendrites</text>
    <text x="392" y="110" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">nucleus</text>
    <text x="392" y="155" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">cytoplasm</text>
    <text x="310" y="282" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">cell membrane</text>
    <text x="520" y="282" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">axon — long and thin</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Ciliated cell (Learner's Book p.18). The moving cilia on the top edge sweep
  // mucus (with its trapped dust and germs) up and away from the lungs.
  // ───────────────────────────────────────────────────────────────────────────
  CILIATED_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 320" class="w-full h-full">
    ${plate(570, 320)}

    <path d="M 150 96 l -6 -30 M 168 92 l -3 -32 M 186 90 l 0 -34 M 204 90 l 3 -33 M 222 92 l 6 -31 M 240 96 l 9 -29 M 258 96 l 12 -28" fill="none" stroke="${MEMB_S}" stroke-width="3" stroke-linecap="round"/>

    <path d="M 140 96 q 70 -14 140 0 l 0 190 q -70 12 -140 0 Z" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="3"/>
    <ellipse cx="210" cy="200" rx="30" ry="34" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    ${lead(360, 70, 236, 74)}
    ${lead(360, 150, 282, 150)}
    ${lead(360, 210, 240, 200)}
    ${lead(360, 274, 250, 262)}

    <text x="374" y="76" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cilia (tiny hairs)</text>
    <text x="374" y="156" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cell membrane</text>
    <text x="374" y="216" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">nucleus</text>
    <text x="374" y="280" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cytoplasm</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Root hair cell (Learner's Book p.20). The long, thin extension reaches out
  // between the soil grains and gives a huge surface for absorbing water.
  // ───────────────────────────────────────────────────────────────────────────
  // Four layers, outside in: the orange wall, the thin membrane, a lining of
  // cytoplasm (with the nucleus in it) and the big sap vacuole, which runs on
  // down the hair. Soil grains sit round the hair it reaches between.
  ROOT_HAIR_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}

    <g fill="${SOIL_F}" stroke="${SOIL_S}" stroke-width="2">
      <ellipse cx="342" cy="118" rx="22" ry="14" transform="rotate(-10 342 118)"/>
      <ellipse cx="420" cy="128" rx="17" ry="12" transform="rotate(15 420 128)"/>
      <ellipse cx="500" cy="134" rx="16" ry="11" transform="rotate(-20 500 134)"/>
      <ellipse cx="572" cy="138" rx="14" ry="10" transform="rotate(8 572 138)"/>
      <ellipse cx="352" cy="236" rx="20" ry="13" transform="rotate(12 352 236)"/>
      <ellipse cx="436" cy="234" rx="16" ry="11" transform="rotate(-15 436 234)"/>
      <ellipse cx="540" cy="224" rx="15" ry="10" transform="rotate(10 540 224)"/>
      <ellipse cx="624" cy="216" rx="12" ry="9"/>
    </g>

    <path d="M 58 118 H 212 Q 230 118 230 136 V 150 L 592 160 Q 612 161 612 177 Q 612 193 592 194 L 230 204 V 234 Q 230 252 212 252 H 58 Q 40 252 40 234 V 136 Q 40 118 58 118 Z" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 64 126 H 206 Q 222 126 222 142 V 158 L 590 168 Q 604 169 604 177 Q 604 185 590 186 L 222 196 V 228 Q 222 244 206 244 H 64 Q 48 244 48 228 V 142 Q 48 126 64 126 Z" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 74 138 H 172 Q 186 138 186 152 V 164 L 568 172 Q 578 172 578 177 Q 578 182 568 182 L 186 190 V 218 Q 186 232 172 232 H 74 Q 60 232 60 218 V 152 Q 60 138 74 138 Z" fill="${VAC_F}" stroke="${VAC_S}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="205" cy="219" r="13" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    ${lead(130, 96, 140, 121)}
    ${lead(300, 96, 300, 177)}
    ${lead(90, 276, 90, 245)}
    ${lead(250, 276, 207, 228)}
    ${lead(470, 276, 470, 194)}

    <text x="130" y="88" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">cell wall</text>
    <text x="300" y="88" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">vacuole (cell sap)</text>
    <text x="90" y="292" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">cell membrane</text>
    <text x="250" y="292" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">nucleus</text>
    <text x="470" y="292" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">the long root hair</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Palisade cell (Learner's Book p.20). Tall and packed with chloroplasts, near
  // the top of the leaf where the sunlight is, to make food by photosynthesis.
  // ───────────────────────────────────────────────────────────────────────────
  PALISADE_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 340" class="w-full h-full">
    ${plate(460, 340)}

    <rect x="150" y="40" width="120" height="264" rx="20" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="160" y="50" width="100" height="244" rx="14" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2.5"/>
    <rect x="186" y="84" width="48" height="176" rx="16" fill="${VAC_F}" stroke="${VAC_S}" stroke-width="2"/>
    ${chloro(176, 84)}${chloro(176, 132)}${chloro(176, 182)}${chloro(176, 230)}${chloro(244, 100)}${chloro(244, 150)}${chloro(244, 200)}${chloro(244, 248)}
    <ellipse cx="210" cy="276" rx="24" ry="18" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    ${lead(330, 60, 268, 62)}
    ${lead(330, 128, 254, 128)}
    ${lead(330, 196, 256, 196)}
    ${lead(330, 276, 234, 276)}

    <text x="344" y="66" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">cell wall</text>
    <text x="344" y="134" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">chloroplasts</text>
    <text x="344" y="202" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">cytoplasm</text>
    <text x="344" y="282" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">nucleus</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The two plant cells as bare shapes, drawn to the SAME viewBox so they can sit
  // side by side in a `compare` and be read at one scale. They carry no text at
  // all: every word on that slide is bilingual slide data, and a label baked into
  // an SVG would be stuck in English.
  //
  // Each one shows the cell AND where it lives, because the environment is the
  // reason for the shape — soil grains and water going in for the root hair,
  // sunlight coming down for the palisade. That contrast is the whole lesson in
  // one picture: same plant, same parts available, opposite jobs, opposite shapes.
  // ───────────────────────────────────────────────────────────────────────────
  SHAPE_ROOTHAIR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" class="w-full h-full">
    ${plate(420, 300)}

    <ellipse cx="200" cy="92" rx="28" ry="20" fill="${SOIL_F}" stroke="${SOIL_S}" stroke-width="2"/>
    <ellipse cx="276" cy="80" rx="24" ry="18" fill="${SOIL_F}" stroke="${SOIL_S}" stroke-width="2"/>
    <ellipse cx="348" cy="100" rx="26" ry="19" fill="${SOIL_F}" stroke="${SOIL_S}" stroke-width="2"/>
    <ellipse cx="210" cy="246" rx="28" ry="20" fill="${SOIL_F}" stroke="${SOIL_S}" stroke-width="2"/>
    <ellipse cx="288" cy="258" rx="23" ry="17" fill="${SOIL_F}" stroke="${SOIL_S}" stroke-width="2"/>
    <ellipse cx="356" cy="236" rx="26" ry="19" fill="${SOIL_F}" stroke="${SOIL_S}" stroke-width="2"/>

    <path d="M 54 118 h 66 q 20 0 30 30 l 180 8 q 20 2 20 12 q 0 10 -20 12 l -180 8 q -10 30 -30 30 h -66 q -14 0 -14 -14 v -72 q 0 -14 14 -14 Z" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <path d="M 65 130 h 55 q 14 0 22 22 l 186 8 q 13 2 13 8 q 0 6 -13 8 l -186 8 q -8 22 -22 22 h -55 q -9 0 -9 -9 v -58 q 0 -9 9 -9 Z" fill="${VAC_F}" stroke="${VAC_S}" stroke-width="2.5"/>
    <circle cx="88" cy="168" r="17" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    <path d="M 206 118 l 12 24" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 218 142 l -10 -4 M 218 142 l 1 -10" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 280 106 l 6 36" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 286 142 l -8 -8 M 286 142 l 7 -9" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 232 222 l 10 -26" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 242 196 l -9 7 M 242 196 l 4 11" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 330 212 l -8 -20" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 322 192 l -3 11 M 322 192 l 9 6" fill="none" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  SHAPE_PALISADE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" class="w-full h-full">
    ${plate(420, 300)}

    <path d="M 74 20 l 0 30 M 142 20 l 0 30 M 210 20 l 0 30 M 278 20 l 0 30 M 346 20 l 0 30" fill="none" stroke="${SUN}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 74 50 l -8 -10 M 74 50 l 8 -10 M 142 50 l -8 -10 M 142 50 l 8 -10 M 210 50 l -8 -10 M 210 50 l 8 -10 M 278 50 l -8 -10 M 278 50 l 8 -10 M 346 50 l -8 -10 M 346 50 l 8 -10" fill="none" stroke="${SUN}" stroke-width="5" stroke-linecap="round"/>

    <rect x="34" y="62" width="352" height="26" rx="8" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="3"/>

    <rect x="60" y="100" width="72" height="168" rx="16" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="70" y="110" width="52" height="148" rx="10" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2"/>
    ${chloro(84, 132)}${chloro(84, 178)}${chloro(84, 224)}${chloro(110, 152)}${chloro(110, 200)}${chloro(110, 244)}

    <rect x="174" y="100" width="72" height="168" rx="16" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="184" y="110" width="52" height="148" rx="10" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2"/>
    ${chloro(198, 132)}${chloro(198, 178)}${chloro(198, 224)}${chloro(224, 152)}${chloro(224, 200)}${chloro(224, 244)}

    <rect x="288" y="100" width="72" height="168" rx="16" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="298" y="110" width="52" height="148" rx="10" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2"/>
    ${chloro(312, 132)}${chloro(312, 178)}${chloro(312, 224)}${chloro(338, 152)}${chloro(338, 200)}${chloro(338, 244)}
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Activity 1.3.1 — the animal-cell table, and the deck's Draw This. It is the
  // ONLY place the three animal cells get copied down, so it is introduced right
  // after the first cell and filled in a row at a time as the lesson goes.
  //
  // Laid out exactly as the book prints it on p.19: the red blood cell row is
  // three sub-rows deep with only the FIRST one filled in. That is deliberate —
  // it tells the class, without a word of prose, that one cell can have more
  // than one adaptation and that two of them are still to find.
  // ───────────────────────────────────────────────────────────────────────────
  ANIMAL_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 340" class="w-full h-full">
    ${plate(760, 340)}

    <rect x="20" y="24" width="720" height="44" fill="#0087a8"/>
    <rect x="20" y="24" width="720" height="276" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="20" y1="68" x2="740" y2="68" stroke="${INK}" stroke-width="2"/>

    <line x1="330" y1="116" x2="740" y2="116" stroke="${LEAD}" stroke-width="1.2"/>
    <line x1="330" y1="146" x2="740" y2="146" stroke="${LEAD}" stroke-width="1.2"/>
    <line x1="20" y1="176" x2="740" y2="176" stroke="${LEAD}" stroke-width="1.5"/>
    <line x1="20" y1="238" x2="740" y2="238" stroke="${LEAD}" stroke-width="1.5"/>

    <line x1="168" y1="24" x2="168" y2="300" stroke="${LEAD}" stroke-width="1.5"/>
    <line x1="330" y1="24" x2="330" y2="300" stroke="${LEAD}" stroke-width="1.5"/>
    <line x1="520" y1="24" x2="520" y2="300" stroke="${LEAD}" stroke-width="1.5"/>

    <text x="94" y="53" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Name of cell</text>
    <text x="249" y="53" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Function of cell</text>
    <text x="425" y="53" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Specialised structure</text>
    <text x="630" y="53" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">How this helps</text>

    <text x="94" y="128" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RBC_S}" text-anchor="middle">Red blood cell</text>
    <text x="249" y="128" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">transports oxygen</text>
    <text x="425" y="90" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">has haemoglobin in</text>
    <text x="425" y="107" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">its cytoplasm</text>
    <text x="630" y="90" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">haemoglobin carries</text>
    <text x="630" y="107" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">the oxygen</text>

    <text x="425" y="138" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="630" y="138" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="425" y="168" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="630" y="168" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>

    <text x="94" y="212" font-family="${FONT}" font-size="13" font-weight="bold" fill="${LEAD}" text-anchor="middle">Neurone</text>
    <text x="249" y="212" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="425" y="212" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="630" y="212" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>

    <text x="94" y="274" font-family="${FONT}" font-size="13" font-weight="bold" fill="${LEAD}" text-anchor="middle">Ciliated cell</text>
    <text x="249" y="274" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="425" y="274" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="630" y="274" font-family="${FONT}" font-size="18" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>

    <text x="380" y="322" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">Give your table a title. Use a ruler.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Activity 1.3.2 — the plant-cell table. The book asks for a SECOND, separate
  // table rather than two more rows on the first one, so that is what this is:
  // the same four columns, ruled again, both rows empty. Nothing is filled in
  // here — by this point in the lesson the class can do a row unaided, and the
  // peer assessment on the same slide is what checks it.
  // ───────────────────────────────────────────────────────────────────────────
  // Narrower than the animal table, with the two long headings set on two lines.
  // That is not a style choice: `steps` gives its media a fixed panel, so a very
  // wide table renders small in it — squaring the aspect up is what makes this
  // one readable from the back of the room.
  PLANT_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 250" class="w-full h-full">
    ${plate(560, 250)}

    <rect x="20" y="24" width="520" height="52" fill="${CHL_S}"/>
    <rect x="20" y="24" width="520" height="208" fill="none" stroke="${INK}" stroke-width="2"/>
    <line x1="20" y1="76" x2="540" y2="76" stroke="${INK}" stroke-width="2"/>
    <line x1="20" y1="154" x2="540" y2="154" stroke="${LEAD}" stroke-width="1.5"/>

    <line x1="150" y1="24" x2="150" y2="232" stroke="${LEAD}" stroke-width="1.5"/>
    <line x1="270" y1="24" x2="270" y2="232" stroke="${LEAD}" stroke-width="1.5"/>
    <line x1="400" y1="24" x2="400" y2="232" stroke="${LEAD}" stroke-width="1.5"/>

    <text x="85" y="55" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Name of cell</text>
    <text x="210" y="46" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Function</text>
    <text x="210" y="64" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">of cell</text>
    <text x="335" y="46" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Specialised</text>
    <text x="335" y="64" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">structure</text>
    <text x="470" y="46" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">How this</text>
    <text x="470" y="64" font-family="${FONT}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">helps</text>

    <text x="85" y="120" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CHL_S}" text-anchor="middle">Root hair cell</text>
    <text x="210" y="120" font-family="${FONT}" font-size="16" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="335" y="120" font-family="${FONT}" font-size="16" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="470" y="120" font-family="${FONT}" font-size="16" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>

    <text x="85" y="198" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CHL_S}" text-anchor="middle">Palisade cell</text>
    <text x="210" y="198" font-family="${FONT}" font-size="16" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="335" y="198" font-family="${FONT}" font-size="16" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
    <text x="470" y="198" font-family="${FONT}" font-size="16" font-weight="bold" fill="#cbd5e1" text-anchor="middle">. . .</text>
  </svg>`,
}
