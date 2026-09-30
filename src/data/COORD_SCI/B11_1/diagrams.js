// src/data/COORD_SCI/B11_1/diagrams.js
// Drawn diagrams for B11.01–B11.02, reproduction in plants.
//
// The insect-pollinated flower, the carpel, the anther and the potato tubers
// are the coursebook's own figures (public/images/COORD_SCI/B11_1). Drawn here
// is what the teacher's snips did not include — the wind-pollinated flower, the
// pollen tube, the conditions for germination — and the redrawn figures for the
// homework questions whose pictures were missing from the downloaded
// assignment (Q14, Q20, Q21). The wind-pollinated flower is one drawing used
// three ways: labelled in the deck, stripped for Label It, and with only the
// letter Y on it for the homework review.
//
// House rules (as U04_1 / U05_1, so `npm run audit:svg COORD_SCI` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally so the audit can measure it;
//  · a leader line carries class="lbl", so Label It strips it with its label;
//  · deck diagrams are close to square — beside a check, a split slide leaves
//    the picture about 430 × 365 px on a laptop.

const INK = '#2b2b2b'
const KEY = '#c25e12'
const LEAD = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const LEAF = '#3d7a1c', LEAF_F = '#d6ebbf', LEAF_P = '#eef6e6'
const PINK = '#c2185b', PINK_F = '#fbd0e0'
const POLLEN = '#b7791f', POLLEN_F = '#fde68a'
const BLUE = '#1a5fa8', BLUE_F = '#dbeafe'
const RED = '#c8102e'
const GLASS = '#64748b'
const SEED = '#8b5a2b'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A label's leader line — tagged `lbl` so Label It removes it with the text. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>`

/** A point on a cubic Bézier, and the unit normal there. */
const bez = (p, t) => {
  const u = 1 - t
  const x = u * u * u * p[0] + 3 * u * u * t * p[2] + 3 * u * t * t * p[4] + t * t * t * p[6]
  const y = u * u * u * p[1] + 3 * u * u * t * p[3] + 3 * u * t * t * p[5] + t * t * t * p[7]
  const dx = 3 * u * u * (p[2] - p[0]) + 6 * u * t * (p[4] - p[2]) + 3 * t * t * (p[6] - p[4])
  const dy = 3 * u * u * (p[3] - p[1]) + 6 * u * t * (p[5] - p[3]) + 3 * t * t * (p[7] - p[5])
  const n = Math.hypot(dx, dy) || 1
  return { x, y, nx: -dy / n, ny: dx / n }
}

/** A feathery stigma: a curved stalk with fine hairs down both sides. */
const feather = (p) => {
  let hairs = ''
  for (let i = 0; i <= 15; i += 1) {
    const { x, y, nx, ny } = bez(p, 0.3 + (i / 15) * 0.7)
    const len = 15 - i * 0.35
    hairs += `<line x1="${(x - nx * len).toFixed(1)}" y1="${(y - ny * len).toFixed(1)}" x2="${(x + nx * len).toFixed(1)}" y2="${(y + ny * len).toFixed(1)}"/>`
  }
  return `<path d="M ${p[0]} ${p[1]} C ${p[2]} ${p[3]}, ${p[4]} ${p[5]}, ${p[6]} ${p[7]}" fill="none" stroke="${LEAF}" stroke-width="3" stroke-linecap="round"/>
    <g stroke="${LEAF}" stroke-width="1.5" stroke-linecap="round">${hairs}</g>`
}

// ───────────────────────────────────────────────────────────────────────────
// 1 · A wind-pollinated flower (a grass floret): no petals, two feathery
//     stigmas reaching out at the top, two anthers hanging out on long
//     filaments. `windArt` is the drawing; the three exports add their labels.
// ───────────────────────────────────────────────────────────────────────────
const windArt = `<line x1="300" y1="300" x2="300" y2="408" stroke="${LEAF}" stroke-width="6" stroke-linecap="round"/>
    ${feather([296, 262, 288, 200, 260, 130, 190, 66])}
    ${feather([304, 262, 312, 200, 340, 130, 410, 66])}
    <path d="M 300 300 C 260 280, 230 200, 246 110 C 270 170, 292 240, 300 300 Z" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 300 300 C 340 280, 370 200, 354 110 C 330 170, 308 240, 300 300 Z" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="300" cy="278" rx="12" ry="17" fill="${LEAF_P}" stroke="${LEAF}" stroke-width="2.5"/>
    <path d="M 294 284 C 262 252, 212 240, 180 298" fill="none" stroke="${LEAD}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 306 284 C 338 252, 388 240, 420 298" fill="none" stroke="${LEAD}" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="176" cy="324" rx="10" ry="27" transform="rotate(12 176 324)" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="2.5"/>
    <ellipse cx="424" cy="324" rx="10" ry="27" transform="rotate(-12 424 324)" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="2.5"/>
    <line x1="174" y1="300" x2="178" y2="348" stroke="${POLLEN}" stroke-width="1.5"/>
    <line x1="426" y1="300" x2="422" y2="348" stroke="${POLLEN}" stroke-width="1.5"/>`

const WIND_FLOWER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" class="w-full h-full">
    ${plate(640, 420)}
    ${windArt}
    ${lead(458, 56, 398, 78)}
    <text x="464" y="61" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">stigma</text>
    ${lead(458, 250, 382, 258)}
    <text x="464" y="255" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">filament</text>
    ${lead(458, 326, 436, 324)}
    <text x="464" y="331" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">anther</text>
    ${lead(142, 190, 240, 190)}
    <text x="136" y="195" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="end">bract</text>
    ${lead(142, 386, 290, 286)}
    <text x="136" y="391" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="end">ovary</text>
  </svg>`

// Homework Q21 — "Fig. 1.1", redrawn: the same flower with only the letter Y.
const WIND_FLOWER_Y = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" class="w-full h-full">
    ${plate(600, 420)}
    ${windArt}
    <line x1="462" y1="56" x2="398" y2="78" stroke="${INK}" stroke-width="1.8"/>
    <text x="478" y="63" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">Y</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · Homework Q14 — "In which structure do seeds develop?" A half-flower in
//     the plain style of the paper, with four lettered parts.
// ───────────────────────────────────────────────────────────────────────────
const FLOWER_AD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 400" class="w-full h-full">
    ${plate(520, 400)}
    <path d="M 250 296 C 160 280, 108 180, 138 92 C 168 58, 216 70, 238 112 C 242 180, 247 250, 250 296 Z" fill="${PINK_F}" stroke="${PINK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 270 296 C 360 280, 412 180, 382 92 C 352 58, 304 70, 282 112 C 278 180, 273 250, 270 296 Z" fill="${PINK_F}" stroke="${PINK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 252 300 C 210 302, 168 284, 146 252 C 190 270, 226 284, 256 292 Z" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 268 300 C 310 302, 352 284, 374 252 C 330 270, 294 284, 264 292 Z" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="251" y="298" width="18" height="92" rx="4" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5"/>
    <g stroke="${LEAD}" stroke-width="2.5" stroke-linecap="round">
      <line x1="248" y1="290" x2="215" y2="162"/><line x1="240" y1="290" x2="190" y2="192"/>
      <line x1="272" y1="290" x2="305" y2="162"/><line x1="280" y1="290" x2="330" y2="192"/>
    </g>
    <ellipse cx="213" cy="148" rx="7" ry="17" transform="rotate(-10 213 148)" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="2.5"/>
    <ellipse cx="187" cy="180" rx="7" ry="17" transform="rotate(-18 187 180)" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="2.5"/>
    <ellipse cx="307" cy="148" rx="7" ry="17" transform="rotate(10 307 148)" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="2.5"/>
    <ellipse cx="333" cy="180" rx="7" ry="17" transform="rotate(18 333 180)" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="2.5"/>
    <line x1="260" y1="236" x2="260" y2="136" stroke="${LEAF}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="260" cy="130" rx="14" ry="7" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5"/>
    <ellipse cx="260" cy="264" rx="21" ry="31" fill="#ffffff" stroke="${LEAF}" stroke-width="3"/>
    <ellipse cx="260" cy="270" rx="9" ry="14" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2"/>
    <g stroke="${INK}" stroke-width="1.8">
      <line x1="112" y1="70" x2="158" y2="116"/>
      <line x1="440" y1="104" x2="276" y2="130"/>
      <line x1="440" y1="180" x2="342" y2="180"/>
      <line x1="150" y1="340" x2="242" y2="276"/>
    </g>
    <text x="98" y="68" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">C</text>
    <text x="456" y="111" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">D</text>
    <text x="456" y="187" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">A</text>
    <text x="136" y="354" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">B</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Fertilisation in a flower: a pollen grain on the stigma has grown a
//     pollen tube down the style, and the male nucleus travels down it to the
//     ovule. Labelled for the deck; Label It strips the labels.
// ───────────────────────────────────────────────────────────────────────────
const POLLEN_TUBE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" class="w-full h-full">
    ${plate(640, 420)}
    <path d="M 280 96 L 280 250 C 232 262, 214 300, 214 328 C 214 374, 252 398, 300 398 C 348 398, 386 374, 386 328 C 386 300, 368 262, 320 250 L 320 96 Z" fill="${LEAF_P}" stroke="${LEAF}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 256 96 C 256 70, 344 70, 344 96 Z" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="300" cy="334" rx="44" ry="38" fill="#ffffff" stroke="${LEAF}" stroke-width="3"/>
    <circle cx="300" cy="350" r="8" fill="${PINK}"/>
    <path d="M 290 78 C 294 130, 298 210, 300 298" fill="none" stroke="${POLLEN}" stroke-width="7" stroke-linecap="round"/>
    <path d="M 290 78 C 294 130, 298 210, 300 298" fill="none" stroke="${POLLEN_F}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="288" cy="66" r="13" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="3"/>
    <circle cx="297" cy="200" r="5.5" fill="${BLUE}"/>
    ${lead(142, 66, 274, 66)}
    <text x="136" y="71" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="end">pollen grain</text>
    ${lead(142, 170, 280, 170)}
    <text x="136" y="175" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="end">style</text>
    ${lead(142, 300, 222, 300)}
    <text x="136" y="305" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}" text-anchor="end">ovary</text>
    ${lead(458, 88, 340, 88)}
    <text x="464" y="93" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">stigma</text>
    ${lead(458, 140, 298, 140)}
    <text x="464" y="145" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">pollen tube</text>
    ${lead(458, 200, 304, 200)}
    <text x="464" y="205" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">male nucleus</text>
    ${lead(458, 318, 340, 322)}
    <text x="464" y="323" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">ovule</text>
    ${lead(458, 372, 308, 352)}
    <text x="464" y="377" font-family="${FONT}" font-size="19" font-weight="700" fill="${INK}">ovule nucleus</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · The three conditions every seed needs to germinate, round a seed that
//     has just put out its root and shoot.
// ───────────────────────────────────────────────────────────────────────────
const GERMINATION = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 380" class="w-full h-full">
    ${plate(480, 380)}
    <text x="240" y="30" font-family="${FONT}" font-size="14.5" font-weight="700" fill="${KEY}" text-anchor="middle">Every seed needs all three to germinate</text>
    <rect x="18" y="232" width="140" height="120" rx="8" fill="#f1e4d3"/>
    <line x1="18" y1="232" x2="158" y2="232" stroke="${SEED}" stroke-width="2.5"/>
    <path d="M 92 262 C 92 300, 78 320, 84 346" fill="none" stroke="#c9a66b" stroke-width="4" stroke-linecap="round"/>
    <path d="M 88 300 L 70 318 M 86 318 L 102 332" fill="none" stroke="#c9a66b" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 92 258 C 92 210, 96 170, 92 130" fill="none" stroke="${LEAF}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 92 134 C 60 126, 50 100, 58 84 C 84 90, 94 110, 92 134 Z" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 92 134 C 124 126, 134 100, 126 84 C 100 90, 90 110, 92 134 Z" fill="${LEAF_F}" stroke="${LEAF}" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="92" cy="260" rx="24" ry="17" fill="#d9b38c" stroke="${SEED}" stroke-width="2.5"/>
    <text x="88" y="372" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${SEED}" text-anchor="middle">a germinating seed</text>

    <rect x="184" y="52" width="278" height="86" rx="10" fill="${BLUE_F}" stroke="${BLUE}" stroke-width="2"/>
    <text x="198" y="78" font-family="${FONT}" font-size="15" font-weight="700" fill="${BLUE}">1  WATER</text>
    <text x="198" y="100" font-family="${FONT}" font-size="12.5" fill="${INK}">The seed swells and its enzymes</text>
    <text x="198" y="118" font-family="${FONT}" font-size="12.5" fill="${INK}">start to work on the stored food.</text>
    <rect x="184" y="152" width="278" height="86" rx="10" fill="#fdecee" stroke="${RED}" stroke-width="2"/>
    <text x="198" y="178" font-family="${FONT}" font-size="15" font-weight="700" fill="${RED}">2  OXYGEN</text>
    <text x="198" y="200" font-family="${FONT}" font-size="12.5" fill="${INK}">For respiration, which releases</text>
    <text x="198" y="218" font-family="${FONT}" font-size="12.5" fill="${INK}">the energy the seed needs to grow.</text>
    <rect x="184" y="252" width="278" height="86" rx="10" fill="#fdf1e3" stroke="${KEY}" stroke-width="2"/>
    <text x="198" y="278" font-family="${FONT}" font-size="15" font-weight="700" fill="${KEY}">3  A SUITABLE TEMPERATURE</text>
    <text x="198" y="300" font-family="${FONT}" font-size="12.5" fill="${INK}">Warm enough for the enzymes</text>
    <text x="198" y="318" font-family="${FONT}" font-size="12.5" fill="${INK}">to work quickly.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Homework Q20 — the four flasks. `flask(cx)` draws one conical flask.
// ───────────────────────────────────────────────────────────────────────────
const flask = (cx) => `<path d="M ${cx - 14} 44 L ${cx - 14} 104 L ${cx - 54} 214 Q ${cx - 58} 228 ${cx - 44} 228 L ${cx + 44} 228 Q ${cx + 58} 228 ${cx + 54} 214 L ${cx + 14} 104 L ${cx + 14} 44" fill="none" stroke="${GLASS}" stroke-width="2.5" stroke-linejoin="round"/>
    <line x1="${cx - 19}" y1="44" x2="${cx + 19}" y2="44" stroke="${GLASS}" stroke-width="3" stroke-linecap="round"/>`
const seeds = (cx, y) => [-24, -8, 8, 24].map((dx) => `<ellipse cx="${cx + dx}" cy="${y}" rx="6.5" ry="4.5" fill="${SEED}"/>`).join('')
const wool = (cx, fill) => `<path d="M ${cx - 47} 204 Q ${cx - 30} 192 ${cx - 14} 204 Q ${cx} 192 ${cx + 14} 204 Q ${cx + 30} 192 ${cx + 47} 204 L ${cx + 50} 214 Q ${cx + 53} 224 ${cx + 42} 224 L ${cx - 42} 224 Q ${cx - 53} 224 ${cx - 50} 214 Z" fill="${fill}" stroke="${GLASS}" stroke-width="1.5"/>`

const FLASKS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" class="w-full h-full">
    ${plate(640, 300)}
    ${wool(86, '#ffffff')}${seeds(86, 190)}${flask(86)}
    <path d="M 210 150 L 270 150 L 293 214 Q 296 224 284 224 L 196 224 Q 184 224 187 214 Z" fill="${BLUE_F}"/>
    <line x1="210" y1="150" x2="270" y2="150" stroke="${BLUE}" stroke-width="2"/>
    ${seeds(240, 214)}${flask(240)}
    ${wool(394, '#cfe3f7')}${seeds(394, 190)}${flask(394)}
    ${wool(548, '#cfe3f7')}${seeds(548, 190)}${flask(548)}
    <text x="86" y="30" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">A</text>
    <text x="240" y="30" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">B</text>
    <text x="394" y="30" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">C</text>
    <text x="548" y="30" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">D</text>
    <text x="86" y="252" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">dry cotton wool</text>
    <text x="240" y="252" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">under boiled water</text>
    <text x="394" y="252" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">damp cotton wool</text>
    <text x="548" y="252" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">damp cotton wool</text>
    <text x="86" y="278" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${INK}" text-anchor="middle">stored at 18 °C</text>
    <text x="240" y="278" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${INK}" text-anchor="middle">stored at 18 °C</text>
    <text x="394" y="278" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${INK}" text-anchor="middle">stored at 18 °C</text>
    <text x="548" y="278" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${BLUE}" text-anchor="middle">stored at 2 °C</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Homework Q11 — the tick-and-cross table. Ticks and crosses are paths.
// ───────────────────────────────────────────────────────────────────────────
const tick = (x, y) => `<path d="M ${x - 8} ${y} L ${x - 2} ${y + 7} L ${x + 9} ${y - 8}" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`
const cross = (x, y) => `<path d="M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`

const TABLE_Q11 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 222" class="w-full h-full">
    ${plate(460, 222)}
    <g stroke="${INK}" stroke-width="1.6">
      <line x1="20" y1="14" x2="440" y2="14"/><line x1="20" y1="66" x2="440" y2="66"/><line x1="20" y1="208" x2="440" y2="208"/>
      <line x1="20" y1="14" x2="20" y2="208"/><line x1="68" y1="14" x2="68" y2="208"/><line x1="254" y1="14" x2="254" y2="208"/><line x1="440" y1="14" x2="440" y2="208"/>
    </g>
    <text x="161" y="36" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">fusion of</text>
    <text x="161" y="54" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">gamete nuclei</text>
    <text x="347" y="36" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">genetic variety</text>
    <text x="347" y="54" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">in the offspring</text>
    <text x="44" y="92" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">A</text>
    <text x="44" y="127" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">B</text>
    <text x="44" y="162" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">C</text>
    <text x="44" y="197" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">D</text>
    ${tick(161, 87)}${tick(347, 87)}
    ${tick(161, 122)}${cross(347, 122)}
    ${cross(161, 157)}${tick(347, 157)}
    ${cross(161, 192)}${cross(347, 192)}
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Two pollen grains, to the same scale: the large, spiky grain an insect
//     carries, and the small, smooth grain the wind does.
// ───────────────────────────────────────────────────────────────────────────
const spikes = (cx, cy, r) => {
  let out = ''
  for (let i = 0; i < 18; i += 1) {
    const a = (i / 18) * Math.PI * 2
    out += `<line x1="${(cx + Math.cos(a) * r).toFixed(1)}" y1="${(cy + Math.sin(a) * r).toFixed(1)}" x2="${(cx + Math.cos(a) * (r + 13)).toFixed(1)}" y2="${(cy + Math.sin(a) * (r + 13)).toFixed(1)}"/>`
  }
  return `<g stroke="${POLLEN}" stroke-width="3" stroke-linecap="round">${out}</g>`
}

const POLLEN_COMPARE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" class="w-full h-full">
    ${plate(480, 360)}
    <line x1="240" y1="24" x2="240" y2="336" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="120" y="38" font-family="${FONT}" font-size="15" font-weight="700" fill="${PINK}" text-anchor="middle">Insect-pollinated</text>
    <text x="360" y="38" font-family="${FONT}" font-size="15" font-weight="700" fill="${LEAF}" text-anchor="middle">Wind-pollinated</text>
    ${spikes(120, 140, 56)}
    <circle cx="120" cy="140" r="56" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="3"/>
    <circle cx="360" cy="140" r="22" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="3"/>
    <text x="120" y="244" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">large and heavy</text>
    <text x="120" y="268" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">spiky or sticky</text>
    <text x="120" y="292" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">made in small amounts</text>
    <text x="120" y="320" font-family="${FONT}" font-size="12.5" fill="${LEAD}" text-anchor="middle">so it sticks to an insect</text>
    <text x="360" y="244" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">small and light</text>
    <text x="360" y="268" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">smooth</text>
    <text x="360" y="292" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">made in huge amounts</text>
    <text x="360" y="320" font-family="${FONT}" font-size="12.5" fill="${LEAD}" text-anchor="middle">so the wind carries it far</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · Chromosome numbers in sexual reproduction (the coursebook's figure,
//     set out down the page): 46 in a body cell, 23 in each gamete,
//     46 again in the zygote.
// ───────────────────────────────────────────────────────────────────────────
const arrowDown = (x1, y1, x2, y2) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const bx = x2 - 10 * Math.cos(a), by = y2 - 10 * Math.sin(a)
  const px = 5.5 * Math.cos(a + Math.PI / 2), py = 5.5 * Math.sin(a + Math.PI / 2)
  return `<line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M ${x2} ${y2} L ${(bx + px).toFixed(1)} ${(by + py).toFixed(1)} L ${(bx - px).toFixed(1)} ${(by - py).toFixed(1)} Z" fill="${INK}"/>`
}

const CHROMOSOMES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 400" class="w-full h-full">
    ${plate(480, 400)}
    <text x="110" y="24" font-family="${FONT}" font-size="13" font-weight="700" fill="${LEAD}" text-anchor="middle">body cell of one parent</text>
    <text x="370" y="24" font-family="${FONT}" font-size="13" font-weight="700" fill="${LEAD}" text-anchor="middle">body cell of the other</text>
    <circle cx="110" cy="72" r="38" fill="${BLUE_F}" stroke="${BLUE}" stroke-width="3"/>
    <circle cx="370" cy="72" r="38" fill="${BLUE_F}" stroke="${BLUE}" stroke-width="3"/>
    <text x="110" y="80" font-family="${FONT}" font-size="22" font-weight="700" fill="${BLUE}" text-anchor="middle">46</text>
    <text x="370" y="80" font-family="${FONT}" font-size="22" font-weight="700" fill="${BLUE}" text-anchor="middle">46</text>
    <text x="240" y="66" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${BLUE}" text-anchor="middle">DIPLOID</text>
    <text x="240" y="84" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">two sets</text>
    ${arrowDown(110, 114, 110, 156)}
    ${arrowDown(370, 114, 370, 156)}
    <circle cx="110" cy="188" r="28" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="3"/>
    <circle cx="370" cy="188" r="28" fill="${POLLEN_F}" stroke="${POLLEN}" stroke-width="3"/>
    <text x="110" y="195" font-family="${FONT}" font-size="20" font-weight="700" fill="${POLLEN}" text-anchor="middle">23</text>
    <text x="370" y="195" font-family="${FONT}" font-size="20" font-weight="700" fill="${POLLEN}" text-anchor="middle">23</text>
    <text x="240" y="174" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${POLLEN}" text-anchor="middle">gametes</text>
    <text x="240" y="192" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${POLLEN}" text-anchor="middle">HAPLOID</text>
    <text x="240" y="210" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">one set</text>
    ${arrowDown(130, 212, 206, 288)}
    ${arrowDown(350, 212, 274, 288)}
    <text x="240" y="256" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${KEY}" text-anchor="middle">fertilisation</text>
    <circle cx="240" cy="318" r="38" fill="${PINK_F}" stroke="${PINK}" stroke-width="3"/>
    <text x="240" y="326" font-family="${FONT}" font-size="22" font-weight="700" fill="${PINK}" text-anchor="middle">46</text>
    <text x="240" y="384" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${PINK}" text-anchor="middle">zygote — DIPLOID again</text>
    <text x="392" y="314" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">numbers are</text>
    <text x="392" y="330" font-family="${FONT}" font-size="12" fill="${LEAD}" text-anchor="middle">for a human</text>
  </svg>`

export const DIAGRAMS = {
  CHROMOSOMES: CHROMOSOMES,
  WIND_FLOWER: WIND_FLOWER,
  WIND_FLOWER_Y: WIND_FLOWER_Y,
  FLOWER_AD: FLOWER_AD,
  POLLEN_TUBE: POLLEN_TUBE,
  GERMINATION: GERMINATION,
  FLASKS: FLASKS,
  TABLE_Q11: TABLE_Q11,
  POLLEN_COMPARE: POLLEN_COMPARE,
}
