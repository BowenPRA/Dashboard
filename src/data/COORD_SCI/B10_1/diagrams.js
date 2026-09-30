// src/data/COORD_SCI/B10_1/diagrams.js
// Drawn diagrams for B10 Coordination and response.
//
// The anatomy in this unit (the motor neurone, the reflex arc in the arm, the
// endocrine glands, the section through skin) is shown with the coursebook's own
// figures, cropped from the teacher's snips into public/images/COORD_SCI/B10_1
// — a painted cross-section of skin is not something a line drawing improves
// on. What is drawn HERE is everything that is a scheme rather than a picture:
// the stimulus-to-response chain, the two feedback loops, the graphs, and the
// redrawn figures for the homework questions whose own pictures were missing
// from the downloaded assignment (Q2, Q22 and Q25).
//
// House rules (as U04_1 / U05_1, so `npm run audit:svg COORD_SCI` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally so the audit can measure it;
//  · arrowheads are paths, not text.

const INK = '#2b2b2b'
const KEY = '#c25e12'
const LEAD = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const TEAL = '#0087a8', TEAL_F = '#e2f2f6'
const PURPLE = '#5c2483', PURPLE_F = '#f2ecf7'
const GREEN = '#3d7a1c', GREEN_F = '#eef6e6'
const RED = '#c8102e', RED_F = '#fdecee'
const BLUE = '#1a5fa8', BLUE_F = '#e9f1fa'
const NERVE = '#2f6f9f', NERVE_F = '#dcebf5'
const GRID = '#cbd5e1'

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A straight arrow from (x1, y1) to (x2, y2), with a drawn head. */
const arrow = (x1, y1, x2, y2, col = INK, w = 2.2) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - 9 * Math.cos(a), hy = y2 - 9 * Math.sin(a)
  const p = (d, s) => `${(hx + s * 5 * Math.cos(a + Math.PI / 2) + d * Math.cos(a)).toFixed(1)} ${(hy + s * 5 * Math.sin(a + Math.PI / 2) + d * Math.sin(a)).toFixed(1)}`
  return `<line x1="${x1}" y1="${y1}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${x2} ${y2} L ${p(0, 1)} L ${p(0, -1)} Z" fill="${col}"/>`
}

/** A rounded box (no text — labels are written beside or over it literally). */
const box = (x, y, w, h, fill, stroke) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

/** A smooth curve through the points (Catmull-Rom as cubic Béziers). */
const smooth = (pts) => {
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0]} ${p2[1]}`
  }
  return d
}

/** Grid lines for a graph: `xs` and `ys` are pixel positions. */
const grid = (xs, ys, x0, x1, y0, y1) =>
  xs.map((x) => `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="${GRID}" stroke-width="1"/>`).join('') +
  ys.map((y) => `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`).join('')

// ───────────────────────────────────────────────────────────────────────────
// 1 · Stimulus → receptor → coordinator → effector → response, set out
//     DOWN the page with the hot-pan example beside each step. Every deck
//     diagram here is close to square: beside a check, a split slide leaves
//     the picture about 430 × 365 px on a laptop, and a wide strip is unreadable.
// ───────────────────────────────────────────────────────────────────────────
const RESPONSE_CHAIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 408" class="w-full h-full">
    ${plate(460, 408)}
    <text x="92" y="28" font-family="${FONT}" font-size="13" font-weight="700" fill="${KEY}" text-anchor="middle">The five steps</text>
    <text x="238" y="28" font-family="${FONT}" font-size="13" font-weight="700" fill="${LEAD}" text-anchor="middle">what it is</text>
    <text x="384" y="28" font-family="${FONT}" font-size="13" font-weight="700" fill="${LEAD}" text-anchor="middle">hot pan example</text>
    ${box(18, 42, 148, 46, RED_F, RED)}
    ${box(18, 114, 148, 46, TEAL_F, TEAL)}
    ${box(18, 186, 148, 46, PURPLE_F, PURPLE)}
    ${box(18, 258, 148, 46, BLUE_F, BLUE)}
    ${box(18, 330, 148, 46, GREEN_F, GREEN)}
    ${arrow(92, 90, 92, 112)}
    ${arrow(92, 162, 92, 184)}
    ${arrow(92, 234, 92, 256)}
    ${arrow(92, 306, 92, 328)}
    <text x="92" y="70" font-family="${FONT}" font-size="14" font-weight="700" fill="${RED}" text-anchor="middle">STIMULUS</text>
    <text x="92" y="142" font-family="${FONT}" font-size="14" font-weight="700" fill="${TEAL}" text-anchor="middle">RECEPTOR</text>
    <text x="92" y="214" font-family="${FONT}" font-size="14" font-weight="700" fill="${PURPLE}" text-anchor="middle">COORDINATOR</text>
    <text x="92" y="286" font-family="${FONT}" font-size="14" font-weight="700" fill="${BLUE}" text-anchor="middle">EFFECTOR</text>
    <text x="92" y="358" font-family="${FONT}" font-size="14" font-weight="700" fill="${GREEN}" text-anchor="middle">RESPONSE</text>
    <text x="238" y="62" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">a change in the</text>
    <text x="238" y="78" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">environment</text>
    <text x="238" y="134" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">cells that detect</text>
    <text x="238" y="150" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">the change</text>
    <text x="238" y="206" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">the brain or the</text>
    <text x="238" y="222" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">spinal cord</text>
    <text x="238" y="278" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">a muscle or</text>
    <text x="238" y="294" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">a gland</text>
    <text x="238" y="350" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">what the body</text>
    <text x="238" y="366" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">does</text>
    <line x1="312" y1="40" x2="312" y2="380" stroke="${GRID}" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="384" y="70" font-family="${FONT}" font-size="13" font-weight="700" fill="${RED}" text-anchor="middle">heat</text>
    <text x="384" y="142" font-family="${FONT}" font-size="13" font-weight="700" fill="${TEAL}" text-anchor="middle">pain receptors</text>
    <text x="384" y="214" font-family="${FONT}" font-size="13" font-weight="700" fill="${PURPLE}" text-anchor="middle">spinal cord</text>
    <text x="384" y="286" font-family="${FONT}" font-size="13" font-weight="700" fill="${BLUE}" text-anchor="middle">arm muscle</text>
    <text x="384" y="358" font-family="${FONT}" font-size="13" font-weight="700" fill="${GREEN}" text-anchor="middle">hand pulls away</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · The blood glucose loop, redrawn as something a student can copy: two
//     routes out of "normal" and the same way back.
// ───────────────────────────────────────────────────────────────────────────
const GLUCOSE_LOOP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 440" class="w-full h-full">
    ${plate(480, 440)}
    ${box(140, 194, 200, 52, TEAL_F, TEAL)}
    <text x="240" y="216" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${TEAL}" text-anchor="middle">NORMAL blood glucose</text>
    <text x="240" y="234" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">(the set point)</text>

    ${box(16, 100, 164, 50, PURPLE_F, PURPLE)}
    <text x="98" y="121" font-family="${FONT}" font-size="13" font-weight="700" fill="${PURPLE}" text-anchor="middle">Glucose TOO HIGH</text>
    <text x="98" y="138" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">after a meal</text>
    ${box(150, 18, 180, 50, PURPLE_F, PURPLE)}
    <text x="240" y="39" font-family="${FONT}" font-size="13" font-weight="700" fill="${PURPLE}" text-anchor="middle">Pancreas secretes</text>
    <text x="240" y="57" font-family="${FONT}" font-size="13" font-weight="700" fill="${PURPLE}" text-anchor="middle">INSULIN</text>
    ${box(300, 100, 164, 50, PURPLE_F, PURPLE)}
    <text x="382" y="121" font-family="${FONT}" font-size="13" font-weight="700" fill="${PURPLE}" text-anchor="middle">Liver stores glucose</text>
    <text x="382" y="138" font-family="${FONT}" font-size="13" font-weight="700" fill="${PURPLE}" text-anchor="middle">as glycogen</text>
    ${arrow(172, 192, 124, 154, PURPLE)}
    ${arrow(108, 98, 160, 70, PURPLE)}
    ${arrow(320, 70, 372, 98, PURPLE)}
    ${arrow(356, 152, 308, 192, PURPLE)}
    <text x="352" y="182" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${PURPLE}">glucose FALLS</text>

    ${box(16, 290, 164, 50, GREEN_F, GREEN)}
    <text x="98" y="311" font-family="${FONT}" font-size="13" font-weight="700" fill="${GREEN}" text-anchor="middle">Glucose TOO LOW</text>
    <text x="98" y="328" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">exercise, or no food</text>
    ${box(150, 372, 180, 50, GREEN_F, GREEN)}
    <text x="240" y="393" font-family="${FONT}" font-size="13" font-weight="700" fill="${GREEN}" text-anchor="middle">Pancreas secretes</text>
    <text x="240" y="411" font-family="${FONT}" font-size="13" font-weight="700" fill="${GREEN}" text-anchor="middle">GLUCAGON</text>
    ${box(300, 290, 164, 50, GREEN_F, GREEN)}
    <text x="382" y="311" font-family="${FONT}" font-size="13" font-weight="700" fill="${GREEN}" text-anchor="middle">Liver breaks down</text>
    <text x="382" y="328" font-family="${FONT}" font-size="13" font-weight="700" fill="${GREEN}" text-anchor="middle">glycogen to glucose</text>
    ${arrow(172, 248, 124, 286, GREEN)}
    ${arrow(108, 342, 160, 370, GREEN)}
    ${arrow(320, 370, 372, 342, GREEN)}
    ${arrow(356, 288, 308, 248, GREEN)}
    <text x="352" y="268" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${GREEN}">glucose RISES</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Negative feedback in general: a value wanders off its set point, a
//     receptor notices, and the response pushes it back the other way.
// ───────────────────────────────────────────────────────────────────────────
const NEGATIVE_FEEDBACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 372" class="w-full h-full">
    ${plate(480, 372)}
    <line x1="30" y1="180" x2="450" y2="180" stroke="${TEAL}" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="450" y="170" font-family="${FONT}" font-size="13" font-weight="700" fill="${TEAL}" text-anchor="end">set point</text>
    <path d="${smooth([[30, 180], [70, 176], [120, 110], [170, 86], [230, 122], [285, 180], [330, 232], [368, 244], [410, 216], [450, 180]])}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="170" cy="86" r="5.5" fill="${RED}"/>
    <circle cx="368" cy="244" r="5.5" fill="${BLUE}"/>
    <text x="150" y="40" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${RED}" text-anchor="middle">1  the value goes too HIGH</text>
    <text x="150" y="58" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">a receptor detects the change</text>
    ${arrow(246, 96, 286, 146, RED)}
    <text x="298" y="106" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${RED}">2  the response</text>
    <text x="298" y="124" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${RED}">brings it DOWN</text>
    <text x="170" y="262" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${BLUE}" text-anchor="middle">3  the value goes too LOW,</text>
    <text x="170" y="280" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${BLUE}" text-anchor="middle">so the response brings it UP</text>
    <text x="240" y="330" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${KEY}" text-anchor="middle">The response is always the OPPOSITE</text>
    <text x="240" y="349" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${KEY}" text-anchor="middle">of the change</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Blood glucose after a meal, the shape the coursebook's graph shows:
//     a rise, a fall that overshoots, and a slow climb back.
//     x: 0–5 hours on 66..446 (76 px an hour); y: 70–110 on 300..60 (6 px a unit).
// ───────────────────────────────────────────────────────────────────────────
const GLUCOSE_GRAPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 372" class="w-full h-full">
    ${plate(480, 372)}
    ${grid([142, 218, 294, 370, 446], [60, 120, 180, 240], 66, 446, 60, 300)}
    <line x1="66" y1="60" x2="66" y2="300" stroke="${INK}" stroke-width="2"/>
    <line x1="66" y1="300" x2="446" y2="300" stroke="${INK}" stroke-width="2"/>
    <text x="58" y="304" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="end">70</text>
    <text x="58" y="244" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="end">80</text>
    <text x="58" y="184" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="end">90</text>
    <text x="58" y="124" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="end">100</text>
    <text x="58" y="64" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="end">110</text>
    <text x="66" y="320" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">0</text>
    <text x="142" y="320" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">1</text>
    <text x="218" y="320" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">2</text>
    <text x="294" y="320" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">3</text>
    <text x="370" y="320" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">4</text>
    <text x="446" y="320" font-family="${FONT}" font-size="12.5" fill="${INK}" text-anchor="middle">5</text>
    <text x="256" y="348" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${INK}" text-anchor="middle">Time after the meal / hours</text>
    <text x="-180" y="22" transform="rotate(-90)" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">Blood glucose / mg per 100 cm³</text>
    <line x1="66" y1="210" x2="446" y2="210" stroke="${TEAL}" stroke-width="1.8" stroke-dasharray="6 4"/>
    <path d="${smooth([[66, 210], [86, 210], [96, 204], [112, 160], [142, 102], [166, 90], [218, 138], [294, 216], [346, 243], [370, 246], [408, 234], [446, 210]])}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
    <text x="196" y="80" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${RED}">1  rises: glucose absorbed</text>
    <text x="246" y="146" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${PURPLE}">2  falls: insulin</text>
    <text x="270" y="278" font-family="${FONT}" font-size="13.5" font-weight="700" fill="${GREEN}">3  rises: glucagon</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Homework Q22 — "Fig. 10.1", redrawn. The assignment's own graph was
//     missing from the PDF; this one has the same axes (5–10 mmol/dm³ against
//     0–80 minutes) and values chosen to read cleanly off the grid.
//     x: 5 px a minute from 70; y: 45 px a unit, 4 at 316.
// ───────────────────────────────────────────────────────────────────────────
const HW_GLUCOSE_GRAPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 372" class="w-full h-full">
    ${plate(540, 372)}
    ${grid([95, 120, 145, 170, 195, 220, 245, 270, 295, 320, 345, 370, 395, 420, 445, 470], [46, 68.5, 91, 113.5, 136, 158.5, 181, 203.5, 226, 248.5, 271, 293.5], 70, 470, 46, 316)}
    <line x1="70" y1="46" x2="70" y2="316" stroke="${INK}" stroke-width="2"/>
    <line x1="70" y1="316" x2="470" y2="316" stroke="${INK}" stroke-width="2"/>
    <text x="62" y="320" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="end">4</text>
    <text x="62" y="275" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="end">5</text>
    <text x="62" y="230" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="end">6</text>
    <text x="62" y="185" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="end">7</text>
    <text x="62" y="140" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="end">8</text>
    <text x="62" y="95" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="end">9</text>
    <text x="62" y="50" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="end">10</text>
    <text x="70" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">0</text>
    <text x="120" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">10</text>
    <text x="170" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">20</text>
    <text x="220" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">30</text>
    <text x="270" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">40</text>
    <text x="320" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">50</text>
    <text x="370" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">60</text>
    <text x="420" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">70</text>
    <text x="470" y="334" font-family="${FONT}" font-size="11.5" fill="${INK}" text-anchor="middle">80</text>
    <text x="270" y="358" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${INK}" text-anchor="middle">time / minutes</text>
    <text x="-181" y="22" transform="rotate(-90)" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">blood glucose concentration / mmol per dm³</text>
    <path d="M 70 271 L 120 181 L 170 91 L 220 127 L 270 172 L 320 217 L 370 248.5 L 420 271 L 470 271" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
    <circle cx="70" cy="271" r="3.6" fill="${INK}"/><circle cx="120" cy="181" r="3.6" fill="${INK}"/><circle cx="170" cy="91" r="3.6" fill="${INK}"/>
    <circle cx="220" cy="127" r="3.6" fill="${INK}"/><circle cx="270" cy="172" r="3.6" fill="${INK}"/><circle cx="320" cy="217" r="3.6" fill="${INK}"/>
    <circle cx="370" cy="248.5" r="3.6" fill="${INK}"/><circle cx="420" cy="271" r="3.6" fill="${INK}"/><circle cx="470" cy="271" r="3.6" fill="${INK}"/>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Homework Q2 — "The diagram shows a cell." A motor neurone in the plain
//     line style of an exam paper: the cell body at one END, a long axon in
//     its myelin sheath, and the branching nerve endings.
// ───────────────────────────────────────────────────────────────────────────
const MOTOR_NEURONE_PLAIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 210" class="w-full h-full">
    ${plate(560, 210)}
    <g stroke="${NERVE}" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M 86 78 L 60 44 M 60 44 L 40 40 M 60 44 L 58 22"/>
      <path d="M 72 104 L 34 104 M 34 104 L 18 90 M 34 104 L 20 122"/>
      <path d="M 86 130 L 62 164 M 62 164 L 40 170 M 62 164 L 64 188"/>
      <path d="M 116 72 L 126 38 M 126 38 L 112 20 M 126 38 L 146 26"/>
      <path d="M 116 136 L 128 170 M 128 170 L 114 190 M 128 170 L 150 182"/>
    </g>
    <path d="M 78 78 Q 104 60 130 80 Q 150 104 130 128 Q 104 148 78 130 Q 62 104 78 78 Z" fill="${NERVE_F}" stroke="${NERVE}" stroke-width="3"/>
    <circle cx="104" cy="104" r="13" fill="${NERVE}"/>
    <line x1="138" y1="104" x2="436" y2="104" stroke="${NERVE}" stroke-width="3.5"/>
    <rect x="160" y="93" width="58" height="22" rx="11" fill="#ffffff" stroke="${NERVE}" stroke-width="2.5"/>
    <rect x="228" y="93" width="58" height="22" rx="11" fill="#ffffff" stroke="${NERVE}" stroke-width="2.5"/>
    <rect x="296" y="93" width="58" height="22" rx="11" fill="#ffffff" stroke="${NERVE}" stroke-width="2.5"/>
    <rect x="364" y="93" width="58" height="22" rx="11" fill="#ffffff" stroke="${NERVE}" stroke-width="2.5"/>
    <g stroke="${NERVE}" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M 436 104 L 486 68 M 486 68 L 516 56 M 486 68 L 510 84"/>
      <path d="M 436 104 L 500 112"/>
      <path d="M 436 104 L 486 144 M 486 144 L 514 138 M 486 144 L 508 164"/>
    </g>
    <circle cx="520" cy="54" r="5" fill="${NERVE}"/><circle cx="514" cy="86" r="5" fill="${NERVE}"/><circle cx="505" cy="113" r="5" fill="${NERVE}"/>
    <circle cx="518" cy="137" r="5" fill="${NERVE}"/><circle cx="511" cy="167" r="5" fill="${NERVE}"/>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Homework Q25 — the finger on a hot object. Neurones A, B and C run from
//     the receptor to the muscle; D and E run to and from the brain. Redrawn,
//     with an arrow on every neurone so its direction can be read.
// ───────────────────────────────────────────────────────────────────────────
const REFLEX_FINGER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 400" class="w-full h-full">
    ${plate(660, 400)}
    <path d="M 426 22 Q 470 6 520 18 Q 566 30 566 66 Q 566 100 524 106 L 470 106 Q 426 100 420 66 Q 416 38 426 22 Z" fill="${PURPLE_F}" stroke="${PURPLE}" stroke-width="2.5"/>
    <text x="493" y="68" font-family="${FONT}" font-size="14" font-weight="700" fill="${PURPLE}" text-anchor="middle">brain</text>
    <rect x="420" y="168" width="146" height="128" rx="40" fill="${BLUE_F}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="493" y="318" font-family="${FONT}" font-size="14" font-weight="700" fill="${BLUE}" text-anchor="middle">spinal cord</text>

    <rect x="22" y="250" width="86" height="40" rx="6" fill="${RED_F}" stroke="${RED}" stroke-width="2.5"/>
    <text x="65" y="275" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${RED}" text-anchor="middle">hot object</text>
    <path d="M 78 250 Q 70 214 96 204 L 236 186 Q 252 186 252 200 Q 252 214 236 216 L 118 232 Q 104 236 104 250 Z" fill="#fde7d3" stroke="#b9772f" stroke-width="2.5"/>
    <circle cx="94" cy="230" r="7" fill="${RED}"/>
    <text x="40" y="196" font-family="${FONT}" font-size="12" font-weight="700" fill="${RED}">touch receptor</text>
    <text x="222" y="236" font-family="${FONT}" font-size="12" font-weight="700" fill="#b9772f">finger</text>
    <line x1="82" y1="200" x2="92" y2="222" stroke="${RED}" stroke-width="1.6"/>

    <path d="M 152 330 Q 210 300 268 330 Q 210 360 152 330 Z" fill="${RED_F}" stroke="${RED}" stroke-width="2.5"/>
    <text x="210" y="382" font-family="${FONT}" font-size="12.5" font-weight="700" fill="${RED}" text-anchor="middle">muscle (effector)</text>

    <path d="M 100 228 Q 240 150 448 208" fill="none" stroke="${NERVE}" stroke-width="3.5"/>
    <path d="M 306 184 l -13 -6 l 0 12 z" fill="${NERVE}"/>
    <circle cx="448" cy="208" r="5" fill="${NERVE}"/>
    <path d="M 448 208 Q 470 232 450 262" fill="none" stroke="${NERVE}" stroke-width="3.5"/>
    <circle cx="450" cy="262" r="5" fill="${NERVE}"/>
    <path d="M 450 262 Q 360 300 266 328" fill="none" stroke="${NERVE}" stroke-width="3.5"/>
    <path d="M 345 301 L 358.3 302.6 L 354.3 291.4 Z" fill="${NERVE}"/>
    <path d="M 476 196 L 476 108" fill="none" stroke="${NERVE}" stroke-width="3.5"/>
    <path d="M 476 140 l -6 11 l 12 0 z" fill="${NERVE}"/>
    <path d="M 520 108 L 520 250" fill="none" stroke="${NERVE}" stroke-width="3.5"/>
    <path d="M 520 190 l -6 -11 l 12 0 z" fill="${NERVE}"/>

    <text x="262" y="150" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">A</text>
    <text x="488" y="244" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">B</text>
    <text x="370" y="332" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">C</text>
    <text x="456" y="148" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">D</text>
    <text x="540" y="148" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">E</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · Homework Q3 and Q5 — the two answer tables, set out as the paper sets
//     them out. Rules are lines, not boxes.
// ───────────────────────────────────────────────────────────────────────────
const TABLE_Q3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 222" class="w-full h-full">
    ${plate(460, 222)}
    <g stroke="${INK}" stroke-width="1.6">
      <line x1="20" y1="14" x2="440" y2="14"/><line x1="20" y1="66" x2="440" y2="66"/><line x1="20" y1="208" x2="440" y2="208"/>
      <line x1="20" y1="14" x2="20" y2="208"/><line x1="68" y1="14" x2="68" y2="208"/><line x1="262" y1="14" x2="262" y2="208"/><line x1="440" y1="14" x2="440" y2="208"/>
    </g>
    <text x="165" y="36" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">blood vessels in the</text>
    <text x="165" y="54" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">surface of skin</text>
    <text x="351" y="45" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">sweat production</text>
    <text x="44" y="92" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">A</text>
    <text x="165" y="92" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">constrict</text>
    <text x="351" y="92" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">decreases</text>
    <text x="44" y="127" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">B</text>
    <text x="165" y="127" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">constrict</text>
    <text x="351" y="127" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">increases</text>
    <text x="44" y="162" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">C</text>
    <text x="165" y="162" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">dilate</text>
    <text x="351" y="162" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">decreases</text>
    <text x="44" y="197" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">D</text>
    <text x="165" y="197" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">dilate</text>
    <text x="351" y="197" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">increases</text>
  </svg>`

const TABLE_Q5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 206" class="w-full h-full">
    ${plate(460, 206)}
    <g stroke="${INK}" stroke-width="1.6">
      <line x1="20" y1="14" x2="440" y2="14"/><line x1="20" y1="50" x2="440" y2="50"/><line x1="20" y1="192" x2="440" y2="192"/>
      <line x1="20" y1="14" x2="20" y2="192"/><line x1="68" y1="14" x2="68" y2="192"/><line x1="254" y1="14" x2="254" y2="192"/><line x1="440" y1="14" x2="440" y2="192"/>
    </g>
    <text x="161" y="37" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">breathing rate</text>
    <text x="347" y="37" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">heart beat rate</text>
    <text x="44" y="76" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">A</text>
    <text x="161" y="76" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">decreased</text>
    <text x="347" y="76" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">decreased</text>
    <text x="44" y="111" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">B</text>
    <text x="161" y="111" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">decreased</text>
    <text x="347" y="111" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">increased</text>
    <text x="44" y="146" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">C</text>
    <text x="161" y="146" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">increased</text>
    <text x="347" y="146" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">decreased</text>
    <text x="44" y="181" font-family="${FONT}" font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">D</text>
    <text x="161" y="181" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">increased</text>
    <text x="347" y="181" font-family="${FONT}" font-size="13.5" fill="${INK}" text-anchor="middle">increased</text>
  </svg>`

export const DIAGRAMS = {
  RESPONSE_CHAIN: RESPONSE_CHAIN,
  GLUCOSE_LOOP: GLUCOSE_LOOP,
  NEGATIVE_FEEDBACK: NEGATIVE_FEEDBACK,
  GLUCOSE_GRAPH: GLUCOSE_GRAPH,
  HW_GLUCOSE_GRAPH: HW_GLUCOSE_GRAPH,
  MOTOR_NEURONE_PLAIN: MOTOR_NEURONE_PLAIN,
  REFLEX_FINGER: REFLEX_FINGER,
  TABLE_Q3: TABLE_Q3,
  TABLE_Q5: TABLE_Q5,
}
