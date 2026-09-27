// src/data/IGCSE_CHEM/M06_5/diagrams.js
// Teaching diagrams for 6.5 The Periodic Table (book spreads 12.1 "The
// Periodic Table: an overview", 12.4 "More about the trends", and the history
// pages "How the Periodic Table developed"). All AUTHORED, nothing taken from
// the book: the table outline, the key, the atoms and the trend tables are
// drawn here so the labels are real <text> the SVG audit can measure, and there
// is no licence to carry.
//
// Colour means something on this track:
//   metal                 pale yellow   #fbe7a1   (the same as the tappable table
//   non-metal             pale blue     #cfe5f5    in Element Hunt and the deck)
//   metalloid             pale violet   #ede9fe
//   outer-shell electrons teal          #0087a8
//   basic oxide           blue-violet   #4338ca   (alkali, as everywhere on the track)
//   acidic oxide          red           #c8102e   (acid)
//
// House rules (kept from M06_2 so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · charges are Unicode superscripts (⁺ ⁻ ²⁻), never <tspan>;
//  · no gradients, clip paths or markers, so there are no ids to collide.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const MET_F = '#fbe7a1', MET_S = '#b8912a'    // metal
const TRANS_F = '#f6d98b'                     // the transition block (metals too)
const NON_F = '#cfe5f5', NON_S = '#4f8fbf'    // non-metal
const MID_F = '#ede9fe', MID_S = '#7c3aed'    // metalloid
const GREY_F = '#f1f5f9', GREY_S = '#94a3b8'  // no ion / no oxide
const HEAD_F = '#e2e8f0'
const TEAL = '#0087a8', TEAL_D = '#00697f'    // outer-shell electrons
const E_F = '#fde68a', E_S = '#b45309'        // inner electrons
const ACID = '#c8102e', ACID_F = '#fde2e4'    // acidic oxide
const ALK = '#4338ca', ALK_F = '#e0e7ff'      // basic oxide

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A plain cell. */
const cell = (x, y, w, h, fill, stroke, sw = 1.2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

// ── atoms: shells as circles, electrons spaced evenly round each one ─────────
const SHELL_R = [16, 28, 44, 60]

/** `n` electrons evenly round a circle of radius r, the first at the top. */
function electrons(cx, cy, r, n, fill, stroke) {
  let s = ''
  for (let i = 0; i < n; i += 1) {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n
    s += `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="4.2" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`
  }
  return s
}

/**
 * An atom from its electron arrangement, e.g. [2, 8, 1]. Inner shells dashed
 * grey with amber electrons; the OUTER shell solid teal with teal electrons.
 * The nucleus is a small disc; its symbol is written literally by the caller.
 */
function atom(cx, cy, shells) {
  let s = ''
  shells.forEach((n, i) => {
    const outer = i === shells.length - 1
    const r = SHELL_R[i]
    s += outer
      ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${TEAL}" stroke-width="1.8"/>`
      : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${MUTED}" stroke-width="1.2" stroke-dasharray="4 3"/>`
    s += electrons(cx, cy, r, n, outer ? TEAL : E_F, outer ? TEAL_D : E_S)
  })
  s += `<circle cx="${cx}" cy="${cy}" r="10" fill="#f8fafc" stroke="#475569" stroke-width="1.6"/>`
  return s
}

// ───────────────────────────────────────────────────────────────────────────
// 1 · The Periodic Table in outline: groups I–VIII, periods 1–7, the
//     transition block, hydrogen floating alone, the zig-zag line, and the
//     first 20 elements with their symbols. Lanthanoids and actinoids are left
//     off (the book says they are not studied).
//     Columns: I and II are 40 wide from x = 44; the ten transition columns are
//     22 wide from x = 124; III–VIII are 40 wide from x = 344. Rows are 34 tall
//     from y = 56. The line runs left of B (period 2), Si (3), As (4), Te (5)
//     and At / Ts (6, 7).
// ───────────────────────────────────────────────────────────────────────────
const PT_X = (g) => (g <= 2 ? 44 + (g - 1) * 40 : 344 + (g - 3) * 40)
const PT_Y = (p) => 56 + (p - 1) * 34
const FIRST_NON_METAL = { 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 7 }

function ptCells() {
  let s = cell(214, PT_Y(1), 40, 34, NON_F, NON_S) + cell(PT_X(8), PT_Y(1), 40, 34, NON_F, NON_S)
  for (let p = 2; p <= 7; p += 1) {
    for (let g = 1; g <= 8; g += 1) {
      const non = g >= FIRST_NON_METAL[p]
      s += cell(PT_X(g), PT_Y(p), 40, 34, non ? NON_F : MET_F, non ? NON_S : MET_S)
    }
    if (p >= 4) for (let k = 0; k < 10; k += 1) s += cell(124 + k * 22, PT_Y(p), 22, 34, TRANS_F, MET_S)
  }
  return s
}

const PT_OUTLINE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 384" class="w-full h-full">
    ${plate(620, 384)}
    <text x="310" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Groups, periods and the zig-zag line</text>
    ${ptCells()}

    <text x="30" y="48" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">Period</text>
    <text x="64" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">I</text>
    <text x="104" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">II</text>
    <text x="364" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">III</text>
    <text x="404" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">IV</text>
    <text x="444" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">V</text>
    <text x="484" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">VI</text>
    <text x="524" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">VII</text>
    <text x="564" y="48" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">VIII</text>

    <text x="30" y="78" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">1</text>
    <text x="30" y="112" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="30" y="146" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">3</text>
    <text x="30" y="180" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">4</text>
    <text x="30" y="214" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">5</text>
    <text x="30" y="248" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">6</text>
    <text x="30" y="282" font-family="${FONT}" font-size="11" font-weight="bold" fill="${MUTED}" text-anchor="middle">7</text>

    <text x="234" y="78" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="564" y="78" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">He</text>
    <text x="64" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Li</text>
    <text x="104" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Be</text>
    <text x="364" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="404" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="444" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">N</text>
    <text x="484" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="524" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">F</text>
    <text x="564" y="112" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ne</text>
    <text x="64" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="104" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Mg</text>
    <text x="364" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Al</text>
    <text x="404" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Si</text>
    <text x="444" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">P</text>
    <text x="484" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
    <text x="524" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="564" y="146" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ar</text>
    <text x="64" y="180" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
    <text x="104" y="180" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ca</text>

    <text x="234" y="112" font-family="${FONT}" font-size="10.5" fill="${MUTED}" text-anchor="middle">hydrogen sits alone</text>
    <text x="234" y="148" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">transition elements</text>

    <path d="M 344 90 L 344 124 L 384 124 L 384 158 L 424 158 L 424 192 L 464 192 L 464 226 L 504 226 L 504 294" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>

    ${cell(44, 309, 16, 14, MET_F, MET_S)}
    <text x="66" y="320" font-family="${FONT}" font-size="11" fill="${INK}">metals: over 80% of the elements</text>
    ${cell(290, 309, 16, 14, NON_F, NON_S)}
    <text x="312" y="320" font-family="${FONT}" font-size="11" fill="${INK}">non-metals</text>
    <path d="M 420 322 L 420 312 L 432 312 L 432 322 L 444 322" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="452" y="320" font-family="${FONT}" font-size="11" fill="${INK}">the zig-zag line</text>

    <text x="310" y="348" font-family="${FONT}" font-size="11.5" font-weight="bold" fill="${INK}" text-anchor="middle">A group is a column (I to VIII). A period is a row (1 to 7).</text>
    <text x="310" y="370" font-family="${FONT}" font-size="10.5" fill="${MUTED}" text-anchor="middle">Symbols are shown for the first 20 elements.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · The key: what each box in the table shows, beside a real box
//     (magnesium: proton number 12, relative atomic mass 24).
// ───────────────────────────────────────────────────────────────────────────
const KEY_BOX = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 252" class="w-full h-full">
    ${plate(500, 252)}
    <text x="250" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The key: what each box shows</text>

    <rect x="20" y="46" width="140" height="170" rx="6" fill="#f8fafc" stroke="${INK}" stroke-width="1.5"/>
    <text x="90" y="76" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">proton number</text>
    <text x="90" y="126" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">symbol</text>
    <text x="90" y="160" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">name</text>
    <text x="90" y="196" font-family="${FONT}" font-size="10.5" fill="${MUTED}" text-anchor="middle">relative atomic mass</text>

    <rect x="200" y="46" width="110" height="170" rx="6" fill="${MET_F}" stroke="${MET_S}" stroke-width="2"/>
    <text x="255" y="78" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">12</text>
    <text x="255" y="136" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">Mg</text>
    <text x="255" y="166" font-family="${FONT}" font-size="13" fill="${INK}" text-anchor="middle">magnesium</text>
    <text x="255" y="202" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">24</text>

    ${lead(276, 72, 326, 72)}
    <text x="332" y="70" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">proton number</text>
    <text x="332" y="86" font-family="${FONT}" font-size="10.5" fill="${MUTED}">the number of protons</text>
    ${lead(286, 122, 326, 122)}
    <text x="332" y="120" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">symbol</text>
    <text x="332" y="136" font-family="${FONT}" font-size="10.5" fill="${MUTED}">one or two letters</text>
    ${lead(292, 162, 326, 162)}
    <text x="332" y="166" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">name</text>
    ${lead(274, 196, 326, 196)}
    <text x="332" y="194" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">relative atomic mass</text>
    <text x="332" y="210" font-family="${FONT}" font-size="10.5" fill="${MUTED}">average mass of its atoms</text>

    <text x="250" y="240" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">In the table, the elements go in order of proton number.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · Group I: lithium 2,1 · sodium 2,8,1 · potassium 2,8,8,1. One outer-shell
//     electron each (teal); the number of shells is the period number.
// ───────────────────────────────────────────────────────────────────────────
const SHELLS_GROUP1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 258" class="w-full h-full">
    ${plate(560, 258)}
    <text x="280" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Three atoms from Group I</text>

    ${atom(90, 118, [2, 1])}
    <text x="90" y="122" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Li</text>
    ${atom(240, 118, [2, 8, 1])}
    <text x="240" y="122" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    ${atom(430, 118, [2, 8, 8, 1])}
    <text x="430" y="122" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>

    ${lead(425, 57, 372, 44)}
    <text x="368" y="46" font-family="${FONT}" font-size="11" fill="${TEAL_D}" text-anchor="end">outer-shell electron</text>

    <text x="90" y="206" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">lithium</text>
    <text x="90" y="224" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2,1</text>
    <text x="90" y="242" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">2 shells</text>
    <text x="240" y="206" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="240" y="224" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2,8,1</text>
    <text x="240" y="242" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">3 shells</text>
    <text x="430" y="206" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">potassium</text>
    <text x="430" y="224" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2,8,8,1</text>
    <text x="430" y="242" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">4 shells</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Group VIII: helium 2 · neon 2,8 · argon 2,8,8. Every outer shell full.
// ───────────────────────────────────────────────────────────────────────────
const SHELLS_NOBLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full">
    ${plate(500, 250)}
    <text x="250" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Three atoms from Group VIII</text>

    ${atom(80, 104, [2])}
    <text x="80" y="108" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">He</text>
    ${atom(220, 104, [2, 8])}
    <text x="220" y="108" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Ne</text>
    ${atom(390, 104, [2, 8, 8])}
    <text x="390" y="108" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Ar</text>

    <text x="80" y="182" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">helium</text>
    <text x="80" y="200" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2</text>
    <text x="220" y="182" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">neon</text>
    <text x="220" y="200" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2,8</text>
    <text x="390" y="182" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">argon</text>
    <text x="390" y="200" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2,8,8</text>

    <text x="250" y="232" font-family="${FONT}" font-size="11.5" font-weight="bold" fill="${TEAL_D}" text-anchor="middle">The outer shell (teal) is full in every atom.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The ion-charge strip: for each group, the outer electrons, what the atom
//     does to reach a full shell, and the charge on its ion. Metals (I–III)
//     lose electrons, non-metals (V–VII) gain them.
// ───────────────────────────────────────────────────────────────────────────
const ION_STRIP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 238" class="w-full h-full">
    ${plate(600, 238)}
    <text x="300" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Group number and the charge on the ion</text>

    <rect x="14" y="40" width="104" height="154" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="66" y="58" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">Group</text>
    <text x="66" y="88" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">outer electrons</text>
    <text x="66" y="118" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">to fill the shell</text>
    <text x="66" y="152" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">charge on ion</text>
    <text x="66" y="186" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">example</text>

    ${cell(124, 40, 56, 26, HEAD_F, GREY_S)}${cell(182, 40, 56, 26, HEAD_F, GREY_S)}${cell(240, 40, 56, 26, HEAD_F, GREY_S)}${cell(298, 40, 56, 26, HEAD_F, GREY_S)}
    ${cell(356, 40, 56, 26, HEAD_F, GREY_S)}${cell(414, 40, 56, 26, HEAD_F, GREY_S)}${cell(472, 40, 56, 26, HEAD_F, GREY_S)}${cell(530, 40, 56, 26, HEAD_F, GREY_S)}
    <text x="152" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">I</text>
    <text x="210" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">II</text>
    <text x="268" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">III</text>
    <text x="326" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">IV</text>
    <text x="384" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">V</text>
    <text x="442" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">VI</text>
    <text x="500" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">VII</text>
    <text x="558" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">VIII</text>

    ${cell(124, 70, 56, 124, MET_F, MET_S)}${cell(182, 70, 56, 124, MET_F, MET_S)}${cell(240, 70, 56, 124, MET_F, MET_S)}${cell(298, 70, 56, 124, GREY_F, GREY_S)}
    ${cell(356, 70, 56, 124, NON_F, NON_S)}${cell(414, 70, 56, 124, NON_F, NON_S)}${cell(472, 70, 56, 124, NON_F, NON_S)}${cell(530, 70, 56, 124, GREY_F, GREY_S)}

    <text x="152" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">1</text>
    <text x="210" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2</text>
    <text x="268" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">3</text>
    <text x="326" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">4</text>
    <text x="384" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">5</text>
    <text x="442" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">6</text>
    <text x="500" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">7</text>
    <text x="558" y="88" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">full</text>

    <text x="152" y="118" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">loses 1</text>
    <text x="210" y="118" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">loses 2</text>
    <text x="268" y="118" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">loses 3</text>
    <text x="326" y="118" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">shares</text>
    <text x="384" y="118" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">gains 3</text>
    <text x="442" y="118" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">gains 2</text>
    <text x="500" y="118" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">gains 1</text>
    <text x="558" y="118" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="middle">none</text>

    <text x="152" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">1+</text>
    <text x="210" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">2+</text>
    <text x="268" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">3+</text>
    <text x="326" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">–</text>
    <text x="384" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">3−</text>
    <text x="442" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">2−</text>
    <text x="500" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">1−</text>
    <text x="558" y="158" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">–</text>

    <text x="152" y="186" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Li⁺</text>
    <text x="210" y="186" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Mg²⁺</text>
    <text x="268" y="186" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Al³⁺</text>
    <text x="384" y="186" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">N³⁻</text>
    <text x="442" y="186" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">O²⁻</text>
    <text x="500" y="186" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">F⁻</text>

    <text x="300" y="222" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">Metals lose electrons: positive ions. Non-metals gain electrons: negative ions.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Why reactivity changes down a group (the book's two pairs, drawn fresh):
//     Group I — sodium 2,8,1 and potassium 2,8,8,1; Group VII — chlorine 2,8,7
//     and bromine 2,8,18,7. More shells = outer electrons further from the
//     nucleus = a weaker pull.
// ───────────────────────────────────────────────────────────────────────────
const REACTIVITY_SHELLS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 300" class="w-full h-full">
    ${plate(580, 300)}
    <line x1="290" y1="16" x2="290" y2="288" stroke="#e2e8f0" stroke-width="2"/>
    <text x="145" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Group I</text>
    <text x="145" y="42" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">atoms lose 1 electron</text>
    <text x="435" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Group VII</text>
    <text x="435" y="42" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">atoms gain 1 electron</text>

    ${atom(80, 124, [2, 8, 1])}
    <text x="80" y="128" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    ${atom(212, 124, [2, 8, 8, 1])}
    <text x="212" y="128" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
    ${atom(362, 124, [2, 8, 7])}
    <text x="362" y="128" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    ${atom(498, 124, [2, 8, 18, 7])}
    <text x="498" y="128" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Br</text>

    <text x="80" y="206" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="80" y="222" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">2,8,1 · 3 shells</text>
    <text x="212" y="206" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">potassium</text>
    <text x="212" y="222" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">2,8,8,1 · 4 shells</text>
    <text x="362" y="206" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="362" y="222" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">2,8,7 · 3 shells</text>
    <text x="498" y="206" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">bromine</text>
    <text x="498" y="222" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">2,8,18,7 · 4 shells</text>

    <text x="145" y="252" font-family="${FONT}" font-size="11.5" font-weight="bold" fill="${INK}" text-anchor="middle">Potassium is more reactive.</text>
    <text x="145" y="268" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Its outer electron is further away,</text>
    <text x="145" y="284" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">so it is lost more easily.</text>
    <text x="435" y="252" font-family="${FONT}" font-size="11.5" font-weight="bold" fill="${INK}" text-anchor="middle">Chlorine is more reactive.</text>
    <text x="435" y="268" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">Its outer shell is nearer the nucleus,</text>
    <text x="435" y="284" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">so it gains an electron more easily.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Trends across Period 3 (book spread 12.4): outer electrons, metal →
//     metalloid → non-metal, basic → amphoteric → acidic oxides, and a typical
//     compound of each element. Argon forms no compounds.
// ───────────────────────────────────────────────────────────────────────────
const PERIOD3_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 252" class="w-full h-full">
    ${plate(640, 252)}
    <text x="320" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Trends across Period 3</text>

    <rect x="14" y="38" width="110" height="164" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="69" y="55" font-family="${FONT}" font-size="10" font-weight="bold" fill="${INK}" text-anchor="middle">Group</text>
    <text x="69" y="83" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">element</text>
    <text x="69" y="111" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">outer electrons</text>
    <text x="69" y="137" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">element is a</text>
    <text x="69" y="165" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">its oxide is</text>
    <text x="69" y="193" font-family="${FONT}" font-size="10" fill="${INK}" text-anchor="middle">typical compound</text>

    ${cell(128, 38, 61, 24, HEAD_F, GREY_S)}${cell(191, 38, 61, 24, HEAD_F, GREY_S)}${cell(254, 38, 61, 24, HEAD_F, GREY_S)}${cell(317, 38, 61, 24, HEAD_F, GREY_S)}
    ${cell(380, 38, 61, 24, HEAD_F, GREY_S)}${cell(443, 38, 61, 24, HEAD_F, GREY_S)}${cell(506, 38, 61, 24, HEAD_F, GREY_S)}${cell(569, 38, 61, 24, HEAD_F, GREY_S)}
    <text x="158.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">I</text>
    <text x="221.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">II</text>
    <text x="284.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">III</text>
    <text x="347.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">IV</text>
    <text x="410.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">V</text>
    <text x="473.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">VI</text>
    <text x="536.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">VII</text>
    <text x="599.5" y="55" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">VIII</text>

    ${cell(128, 64, 61, 28, '#ffffff', GREY_S)}${cell(191, 64, 61, 28, '#ffffff', GREY_S)}${cell(254, 64, 61, 28, '#ffffff', GREY_S)}${cell(317, 64, 61, 28, '#ffffff', GREY_S)}
    ${cell(380, 64, 61, 28, '#ffffff', GREY_S)}${cell(443, 64, 61, 28, '#ffffff', GREY_S)}${cell(506, 64, 61, 28, '#ffffff', GREY_S)}${cell(569, 64, 61, 28, '#ffffff', GREY_S)}
    <text x="158.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="221.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Mg</text>
    <text x="284.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Al</text>
    <text x="347.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Si</text>
    <text x="410.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">P</text>
    <text x="473.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
    <text x="536.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="599.5" y="83" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Ar</text>

    ${cell(128, 94, 61, 24, '#ffffff', GREY_S)}${cell(191, 94, 61, 24, '#ffffff', GREY_S)}${cell(254, 94, 61, 24, '#ffffff', GREY_S)}${cell(317, 94, 61, 24, '#ffffff', GREY_S)}
    ${cell(380, 94, 61, 24, '#ffffff', GREY_S)}${cell(443, 94, 61, 24, '#ffffff', GREY_S)}${cell(506, 94, 61, 24, '#ffffff', GREY_S)}${cell(569, 94, 61, 24, '#ffffff', GREY_S)}
    <text x="158.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">1</text>
    <text x="221.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">2</text>
    <text x="284.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">3</text>
    <text x="347.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">4</text>
    <text x="410.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">5</text>
    <text x="473.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">6</text>
    <text x="536.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">7</text>
    <text x="599.5" y="111" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">8 (full)</text>

    ${cell(128, 120, 61, 26, MET_F, MET_S)}${cell(191, 120, 61, 26, MET_F, MET_S)}${cell(254, 120, 61, 26, MET_F, MET_S)}${cell(317, 120, 61, 26, MID_F, MID_S)}
    ${cell(380, 120, 61, 26, NON_F, NON_S)}${cell(443, 120, 61, 26, NON_F, NON_S)}${cell(506, 120, 61, 26, NON_F, NON_S)}${cell(569, 120, 61, 26, NON_F, NON_S)}
    <text x="158.5" y="137" font-family="${FONT}" font-size="9" fill="${INK}" text-anchor="middle">metal</text>
    <text x="221.5" y="137" font-family="${FONT}" font-size="9" fill="${INK}" text-anchor="middle">metal</text>
    <text x="284.5" y="137" font-family="${FONT}" font-size="9" fill="${INK}" text-anchor="middle">metal</text>
    <text x="347.5" y="137" font-family="${FONT}" font-size="9" font-weight="bold" fill="${MID_S}" text-anchor="middle">metalloid</text>
    <text x="410.5" y="137" font-family="${FONT}" font-size="9" fill="${INK}" text-anchor="middle">non-metal</text>
    <text x="473.5" y="137" font-family="${FONT}" font-size="9" fill="${INK}" text-anchor="middle">non-metal</text>
    <text x="536.5" y="137" font-family="${FONT}" font-size="9" fill="${INK}" text-anchor="middle">non-metal</text>
    <text x="599.5" y="137" font-family="${FONT}" font-size="9" fill="${INK}" text-anchor="middle">non-metal</text>

    ${cell(128, 148, 61, 26, ALK_F, ALK)}${cell(191, 148, 61, 26, ALK_F, ALK)}${cell(254, 148, 61, 26, GREY_F, '#475569')}${cell(317, 148, 61, 26, ACID_F, ACID)}
    ${cell(380, 148, 61, 26, ACID_F, ACID)}${cell(443, 148, 61, 26, ACID_F, ACID)}${cell(506, 148, 61, 26, ACID_F, ACID)}${cell(569, 148, 61, 26, GREY_F, GREY_S)}
    <text x="158.5" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">basic</text>
    <text x="221.5" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ALK}" text-anchor="middle">basic</text>
    <text x="284.5" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="#475569" text-anchor="middle">amphoteric</text>
    <text x="347.5" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">acidic</text>
    <text x="410.5" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">acidic</text>
    <text x="473.5" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">acidic</text>
    <text x="536.5" y="165" font-family="${FONT}" font-size="9" font-weight="bold" fill="${ACID}" text-anchor="middle">acidic</text>
    <text x="599.5" y="165" font-family="${FONT}" font-size="9" fill="${MUTED}" text-anchor="middle">no oxide</text>

    ${cell(128, 176, 61, 26, '#ffffff', GREY_S)}${cell(191, 176, 61, 26, '#ffffff', GREY_S)}${cell(254, 176, 61, 26, '#ffffff', GREY_S)}${cell(317, 176, 61, 26, '#ffffff', GREY_S)}
    ${cell(380, 176, 61, 26, '#ffffff', GREY_S)}${cell(443, 176, 61, 26, '#ffffff', GREY_S)}${cell(506, 176, 61, 26, '#ffffff', GREY_S)}${cell(569, 176, 61, 26, '#ffffff', GREY_S)}
    <text x="158.5" y="193" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">NaCl</text>
    <text x="221.5" y="193" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">MgCl₂</text>
    <text x="284.5" y="193" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">AlCl₃</text>
    <text x="347.5" y="193" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">SiCl₄</text>
    <text x="410.5" y="193" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">PH₃</text>
    <text x="473.5" y="193" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">H₂S</text>
    <text x="536.5" y="193" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">HCl</text>
    <text x="599.5" y="193" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">none</text>

    ${arrowR(128, 630, 216, INK)}
    <text x="379" y="240" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">Across the period: metal to non-metal, and basic to acidic oxides.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · How the table developed: Newlands's octaves (1865) beside Mendeleev's
//     table (1869) — no gaps and a forced pattern, against gaps and predictions
//     that came true.
// ───────────────────────────────────────────────────────────────────────────
const NEWLANDS_MENDELEEV = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full">
    ${plate(560, 300)}

    <rect x="14" y="20" width="260" height="236" rx="10" fill="#ffffff" stroke="${GREY_S}" stroke-width="1.5"/>
    <rect x="14" y="20" width="260" height="50" rx="10" fill="${GREY_F}"/>
    <text x="144" y="42" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Newlands, 1865</text>
    <text x="144" y="60" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the Law of Octaves</text>
    <text x="30" y="96" font-family="${FONT}" font-size="11.5" fill="${INK}">order of atomic weight</text>
    <text x="30" y="118" font-family="${FONT}" font-size="11.5" fill="${INK}">every 8th element like the first</text>
    <text x="30" y="140" font-family="${FONT}" font-size="11.5" fill="${INK}">every place filled: no gaps</text>
    <text x="30" y="162" font-family="${FONT}" font-size="11.5" fill="${INK}">so copper sat with sodium,</text>
    <text x="30" y="184" font-family="${FONT}" font-size="11.5" fill="${INK}">two very different metals</text>
    <text x="30" y="224" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">rejected by other chemists</text>

    <rect x="286" y="20" width="260" height="236" rx="10" fill="#ffffff" stroke="${TEAL}" stroke-width="1.5"/>
    <rect x="286" y="20" width="260" height="50" rx="10" fill="#cdeef6"/>
    <text x="416" y="42" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Mendeleev, 1869</text>
    <text x="416" y="60" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">63 elements, one card each</text>
    <text x="302" y="96" font-family="${FONT}" font-size="11.5" fill="${INK}">order of atomic weight, then</text>
    <text x="302" y="118" font-family="${FONT}" font-size="11.5" fill="${INK}">grouped by similar behaviour</text>
    <text x="302" y="140" font-family="${FONT}" font-size="11.5" fill="${INK}">gaps left for missing elements</text>
    <text x="302" y="162" font-family="${FONT}" font-size="11.5" fill="${INK}">predicted eka-aluminium,</text>
    <text x="302" y="184" font-family="${FONT}" font-size="11.5" fill="${INK}">eka-boron and eka-silicon</text>
    <text x="302" y="206" font-family="${FONT}" font-size="11.5" fill="${INK}">found: gallium, scandium,</text>
    <text x="302" y="228" font-family="${FONT}" font-size="11.5" fill="${INK}">germanium. They matched.</text>

    <text x="280" y="284" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Today: order of proton number. Argon is 18, potassium is 19.</text>
  </svg>`

export const DIAGRAMS = {
  PT_OUTLINE: PT_OUTLINE,
  KEY_BOX: KEY_BOX,
  SHELLS_GROUP1: SHELLS_GROUP1,
  SHELLS_NOBLE: SHELLS_NOBLE,
  ION_STRIP: ION_STRIP,
  REACTIVITY_SHELLS: REACTIVITY_SHELLS,
  PERIOD3_TABLE: PERIOD3_TABLE,
  NEWLANDS_MENDELEEV: NEWLANDS_MENDELEEV,
}
