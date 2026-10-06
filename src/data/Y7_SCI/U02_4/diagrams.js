// src/data/Y7_SCI/U02_4/diagrams.js
// Teaching diagrams for 2.4 The Water Cycle (Learner's Book pp. 46–50), ported
// from the classroom deck (content/y7-science/U02_4/diagrams.js).
//
// House rules: a white plate first; every <text> written out literally so
// `npm run audit:svg` can measure it (helpers draw shapes only, and never a
// <rect> the audit would mistake for a box — the label chips excepted, which
// ARE the boxes their text sits in).
//
// WHAT CHANGED IN THE PORT
//  · Leader lines, their end dots and the white label chips are tagged
//    class="lbl", so Label It strips them with the text and leaves blank boxes
//    on clean leader lines (WATER_CYCLE, VAPOUR_GAP, ATIONS are all labelled).
//  · PRECIP_KINDS is gone: it embedded three photographs inside the SVG with
//    Vite imports. Slide 12 is a `compare` of the same three photos instead, so
//    this file imports nothing and `scripts/svg-coords.mjs` can load it.
//  · The two vote cards (ANS_YES / ANS_NO) are gone: the hand vote is a
//    `predict` activity now.
//  · The engine's own cycle diagram (the Water Journey task and the deck's
//    `cycle` activities) is drawn by utils/waterCycle.js `cycleSvg()` in the
//    same palette, cloud and trees, so the two read as one picture.
//
//   WATER_CYCLE   the whole cycle in cross-section, six labels (p. 47)
//   VAPOUR_GAP    a kettle: the invisible gas at the spout, then the visible drops
//   ATIONS        evaporate → evaporation and its three sisters — the English slide

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const BLUE = '#1a5fa8'

const SKY = '#e8f3fb'
const SEA = '#bcdcef'
const SEA_S = '#5f9dc4'
const LAND = '#cfe0c0'
const LAND_S = '#5f7f4a'
const SOIL = '#e7d7bd'
const WATER = '#5aa9d6'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// A leader line from a label out to the thing it names.
const dot = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2.5"/><circle class="lbl" cx="${x2}" cy="${y2}" r="6" fill="${KEY}"/>`

// The white plate a scene label is printed on. Shapes only — the <text> that
// goes with it is written out literally at the call site.
const chip = (x, y, w, h = 42) =>
  `<rect class="lbl" x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#ffffff" fill-opacity="0.92" stroke="${KEY}" stroke-width="2"/>`

// A fluffy cloud: overlapping circles on a flat base. No <rect>, no <text>.
const cloud = (cx, cy, s = 1) => `<g>
    <ellipse cx="${cx}" cy="${cy + 14 * s}" rx="${62 * s}" ry="${26 * s}" fill="#ffffff" stroke="${SEA_S}" stroke-width="${2.5}"/>
    <circle cx="${cx - 34 * s}" cy="${cy + 6 * s}" r="${24 * s}" fill="#ffffff" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="${cx - 2 * s}" cy="${cy - 14 * s}" r="${32 * s}" fill="#ffffff" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="${cx + 34 * s}" cy="${cy + 2 * s}" r="${26 * s}" fill="#ffffff" stroke="${SEA_S}" stroke-width="2.5"/>
    <ellipse cx="${cx}" cy="${cy + 12 * s}" rx="${58 * s}" ry="${22 * s}" fill="#ffffff"/>
  </g>`

// Dashes of falling rain under a cloud.
function rainfall(cx, y0, y1, n = 5) {
  let out = ''
  for (let i = 0; i < n; i++) {
    const x = cx - 44 + i * 22
    const drop = (i % 2) * 10
    out += `<line x1="${x}" y1="${y0 + drop}" x2="${x - 7}" y2="${y1 + drop}" stroke="${WATER}" stroke-width="4" stroke-linecap="round"/>`
  }
  return out
}

// A conifer. Trunk is a path, not a rect — see the header note.
const tree = (x, y, s = 1) => `<path d="M ${x - 3 * s} ${y} v ${-15 * s} h ${6 * s} v ${15 * s} Z" fill="#7a5a3a"/>
    <path d="M ${x} ${y - 52 * s} L ${x + 19 * s} ${y - 13 * s} L ${x - 19 * s} ${y - 13 * s} Z" fill="#4a8b23" stroke="#2f5f14" stroke-width="2"/>
    <path d="M ${x} ${y - 72 * s} L ${x + 14 * s} ${y - 38 * s} L ${x - 14 * s} ${y - 38 * s} Z" fill="#4a8b23" stroke="#2f5f14" stroke-width="2"/>`

// A small upward arrow, for the pictograms on the ATIONS slide.
const upArrow = (x, y0, y1, col) =>
  `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1 + 12}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>
   <path d="M ${x} ${y1} l 8 14 l -16 0 Z" fill="${col}"/>`

export const DIAGRAMS = {
  // ── The whole cycle in cross-section ───────────────────────────────────────
  // Land on the left rising to two peaks, sea on the right, soil underneath.
  // Six labels: the four journeys through the air, and the two on the ground.
  WATER_CYCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1160 520" class="w-full h-full">
    ${plate(1160, 520)}
    <defs>
      <clipPath id="u24-scene"><rect x="2" y="2" width="1156" height="516" rx="13"/></clipPath>
      <marker id="u24-air" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${WATER}"/></marker>
      <marker id="u24-leaf" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#4a8b23"/></marker>
      <marker id="u24-run" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    </defs>

    <g clip-path="url(#u24-scene)">
      <rect x="0" y="0" width="1160" height="520" fill="${SKY}"/>

      <!-- sea -->
      <rect x="800" y="322" width="360" height="198" fill="${SEA}"/>
      <line x1="800" y1="322" x2="1160" y2="322" stroke="${SEA_S}" stroke-width="3"/>

      <!-- land, then the soil band under it -->
      <path d="M 0 520 L 0 250 L 120 150 L 200 205 L 300 120 L 420 240 L 560 285 L 700 310 L 800 322 L 800 520 Z" fill="${LAND}"/>
      <rect x="0" y="400" width="800" height="120" fill="${SOIL}"/>
      <path d="M 0 250 L 120 150 L 200 205 L 300 120 L 420 240 L 560 285 L 700 310 L 800 322" fill="none" stroke="${LAND_S}" stroke-width="3.5"/>
      <line x1="0" y1="400" x2="800" y2="400" stroke="#b79d76" stroke-width="2.5" stroke-dasharray="10 7"/>

      <!-- snow on the two peaks -->
      <path d="M 120 150 L 146 184 L 94 184 Z" fill="#ffffff"/>
      <path d="M 300 120 L 330 158 L 270 158 Z" fill="#ffffff"/>

      <!-- the river, from the valley to the sea -->
      <path d="M 420 244 Q 520 288 620 300 Q 720 316 798 324" fill="none" stroke="${WATER}" stroke-width="9" stroke-linecap="round"/>

      ${tree(640, 304, 0.85)}${tree(690, 312, 0.75)}${tree(592, 297, 0.7)}

      <!-- sun -->
      <circle cx="1085" cy="58" r="38" fill="#f8cf3c" stroke="#c99a00" stroke-width="3"/>

      <!-- clouds: two raining on the mountains, one forming over the sea -->
      ${cloud(180, 90)}${rainfall(180, 126, 186)}
      ${cloud(440, 96)}${rainfall(440, 132, 226)}
      ${cloud(900, 120, 1.1)}

      <!-- evaporation: sea to cloud -->
      <path d="M 1000 318 C 985 265, 960 195, 936 166" fill="none" stroke="${WATER}" stroke-width="7" marker-end="url(#u24-air)"/>
      <!-- transpiration: trees to cloud -->
      <path d="M 648 268 C 690 240, 740 206, 792 176" fill="none" stroke="#4a8b23" stroke-width="6" marker-end="url(#u24-leaf)"/>
      <!-- surface run-off: down the slope into the river -->
      <path d="M 446 248 L 540 279" fill="none" stroke="${BLUE}" stroke-width="6" marker-end="url(#u24-run)"/>
      <!-- soaking down, then groundwater flowing to the sea -->
      <path d="M 240 178 L 240 396" fill="none" stroke="${BLUE}" stroke-width="5" stroke-dasharray="12 8" marker-end="url(#u24-run)"/>
      <path d="M 242 428 C 400 454, 600 450, 742 440" fill="none" stroke="${BLUE}" stroke-width="6" marker-end="url(#u24-run)"/>
    </g>

    <!-- labels -->
    ${dot(250, 96, 288, 152)}
    ${chip(20, 75, 230)}
    <text x="135" y="105" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">precipitation</text>

    ${dot(860, 64, 884, 88)}
    ${chip(680, 22, 215)}
    <text x="787" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">condensation</text>

    ${dot(940, 271, 968, 240)}
    ${chip(940, 250, 200)}
    <text x="1040" y="280" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">evaporation</text>

    ${dot(660, 171, 706, 232)}
    ${chip(430, 150, 230)}
    <text x="545" y="180" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">transpiration</text>

    ${dot(410, 351, 494, 266)}
    ${chip(150, 330, 260)}
    <text x="280" y="360" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">surface run-off</text>

    ${dot(570, 466, 556, 449)}
    ${chip(470, 466, 200)}
    <text x="570" y="496" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">groundwater</text>
  </svg>`,

  // ── You cannot see water vapour ───────────────────────────────────────────
  // The gap at the spout is the whole point, so it is marked with a dashed box
  // and nothing is drawn inside it. Laid out wide for a `showcase` box.
  VAPOUR_GAP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1160 470" class="w-full h-full">
    ${plate(1160, 470)}

    <!-- the cloud of drops -->
    <circle cx="640" cy="300" r="52" fill="#eef4f8" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="716" cy="258" r="62" fill="#eef4f8" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="812" cy="236" r="56" fill="#eef4f8" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="900" cy="262" r="50" fill="#eef4f8" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="972" cy="296" r="44" fill="#eef4f8" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="760" cy="308" r="54" fill="#eef4f8" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="870" cy="312" r="48" fill="#eef4f8" stroke="${SEA_S}" stroke-width="2.5"/>
    <circle cx="760" cy="286" r="72" fill="#eef4f8"/>
    <circle cx="872" cy="282" r="62" fill="#eef4f8"/>
    <circle cx="652" cy="296" r="40" fill="#eef4f8"/>
    <circle cx="952" cy="290" r="34" fill="#eef4f8"/>

    <!-- droplets inside the cloud, so it reads as liquid -->
    <circle cx="676" cy="288" r="8" fill="${WATER}"/>
    <circle cx="742" cy="246" r="7" fill="${WATER}"/>
    <circle cx="796" cy="300" r="8" fill="${WATER}"/>
    <circle cx="862" cy="252" r="7" fill="${WATER}"/>
    <circle cx="716" cy="322" r="7" fill="${WATER}"/>
    <circle cx="926" cy="296" r="6" fill="${WATER}"/>
    <circle cx="840" cy="322" r="6" fill="${WATER}"/>

    <!-- the invisible gap: a dashed box with nothing in it -->
    <rect x="440" y="208" width="110" height="122" rx="12" fill="none" stroke="${KEY}" stroke-width="3" stroke-dasharray="9 8"/>

    <!-- the kettle -->
    <path d="M 174 242 C 178 186, 294 186, 298 242" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
    <path d="M 330 298 C 356 286, 382 276, 406 272 L 414 300 C 390 306, 364 316, 342 328 Z" fill="#f2c230" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 120 410 C 112 292, 176 256, 236 256 C 296 256, 360 292, 352 410 Z" fill="#f2c230" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="236" cy="256" rx="48" ry="12" fill="#d9a812" stroke="${INK}" stroke-width="4"/>
    <circle cx="236" cy="242" r="11" fill="#d9a812" stroke="${INK}" stroke-width="4"/>
    <path d="M 114 410 H 358 q 6 18 -16 18 H 130 q -22 0 -16 -18 Z" fill="#d9a812" stroke="${INK}" stroke-width="4"/>

    <!-- labels -->
    <text x="270" y="118" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">water vapour</text>
    <text x="270" y="158" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a gas. Nothing to see.</text>
    ${dot(340, 174, 476, 204)}

    <text x="830" y="94" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">tiny drops of water</text>
    <text x="830" y="134" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a liquid. This is what you see.</text>
    ${dot(830, 150, 808, 182)}

    <text x="580" y="450" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">The gas is invisible. The drops are not.</text>
  </svg>`,

  // ── The four -ation words: doing word above, naming word below ─────────────
  ATIONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <!-- 1. evaporate -->
    <rect x="20" y="26" width="256" height="420" rx="16" fill="#f4fafd" stroke="${SEA_S}" stroke-width="2"/>
    <text x="148" y="82" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">evaporate</text>
    <path d="M 148 100 v 22" stroke="${MUTED}" stroke-width="4"/><path d="M 148 138 l 9 -16 l -18 0 Z" fill="${MUTED}"/>
    <text x="148" y="182" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">evaporation</text>
    <ellipse cx="148" cy="318" rx="76" ry="18" fill="${SEA}" stroke="${SEA_S}" stroke-width="2.5"/>
    ${upArrow(110, 300, 236, WATER)}${upArrow(148, 292, 222, WATER)}${upArrow(186, 300, 236, WATER)}
    <text x="148" y="382" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">liquid to gas</text>
    <text x="148" y="416" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">from rivers and seas</text>

    <!-- 2. transpire -->
    <rect x="296" y="26" width="256" height="420" rx="16" fill="#f4faf2" stroke="#7fae5c" stroke-width="2"/>
    <text x="424" y="82" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">transpire</text>
    <path d="M 424 100 v 22" stroke="${MUTED}" stroke-width="4"/><path d="M 424 138 l 9 -16 l -18 0 Z" fill="${MUTED}"/>
    <text x="424" y="182" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">transpiration</text>
    <path d="M 424 340 q -62 -12 -58 -66 q 58 -8 58 66 Z" fill="#a8d18a" stroke="#2f5f14" stroke-width="2.5"/>
    <path d="M 424 340 q 62 -12 58 -66 q -58 -8 -58 66 Z" fill="#a8d18a" stroke="#2f5f14" stroke-width="2.5"/>
    <path d="M 424 340 v -74" stroke="#2f5f14" stroke-width="3"/>
    ${upArrow(386, 258, 228, '#4a8b23')}${upArrow(462, 258, 228, '#4a8b23')}
    <text x="424" y="382" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">liquid to gas</text>
    <text x="424" y="416" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">out of plant leaves</text>

    <!-- 3. condense -->
    <rect x="572" y="26" width="256" height="420" rx="16" fill="#f4fafd" stroke="${SEA_S}" stroke-width="2"/>
    <text x="700" y="82" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">condense</text>
    <path d="M 700 100 v 22" stroke="${MUTED}" stroke-width="4"/><path d="M 700 138 l 9 -16 l -18 0 Z" fill="${MUTED}"/>
    <text x="700" y="182" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">condensation</text>
    ${cloud(700, 268, 0.95)}
    <circle cx="662" cy="300" r="9" fill="${WATER}"/>
    <circle cx="700" cy="306" r="9" fill="${WATER}"/>
    <circle cx="738" cy="300" r="9" fill="${WATER}"/>
    <text x="700" y="382" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">gas to liquid</text>
    <text x="700" y="416" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">clouds are made</text>

    <!-- 4. precipitate -->
    <rect x="848" y="26" width="256" height="420" rx="16" fill="#f4fafd" stroke="${SEA_S}" stroke-width="2"/>
    <text x="976" y="82" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">precipitate</text>
    <path d="M 976 100 v 22" stroke="${MUTED}" stroke-width="4"/><path d="M 976 138 l 9 -16 l -18 0 Z" fill="${MUTED}"/>
    <text x="976" y="182" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">precipitation</text>
    ${cloud(976, 252, 0.95)}
    ${rainfall(976, 296, 348, 5)}
    <text x="976" y="382" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">it falls</text>
    <text x="976" y="416" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">rain, snow or hail</text>
  </svg>`,
}
