// src/data/OLEVEL_PHYS/C09_1/diagrams.js
// Teaching diagrams for Magnets and Magnetic Fields (book spreads 9.1 and 9.2).
// All AUTHORED, nothing taken from the book: the magnets, filings, compasses,
// field patterns and the Earth are drawn here so the labels are real <text> the
// SVG audit can measure, and there is no licence to carry.
//
// Colour means something on this track (docs/olevel-phys/AUTHORING-BRIEF.md):
//   N pole                          red          #c8102e
//   S pole                          blue         #1a5fa8
//   magnetic field lines            field blue   #3b82f6
//   force / motion arrows           green        #059669
//   iron (soft)                     #94a3b8 on #e2e8f0
//   steel (hard)                    #64748b on #cbd5e1
//   compass needle                  N half red, S half white with an ink outline
// Field lines run N → S outside a magnet; the arrow is the direction of the
// force on an N pole. The induced pole nearest a magnet is the OPPOSITE pole.
// The Earth's pole under the geographic North Pole is a magnetic S pole.
//
// House rules (kept from IGCSE_CHEM so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · symbols are Unicode (→, ×), never <tspan>;
//  · no gradients, clip paths or markers: arrowheads are small filled triangles
//    drawn by arrowAt(), so there are no ids to collide.
//  · TWO_MAGNETS is also a hotspot. The hotspot strips every <text> that is not
//    class="keep", so its pole letters are kept and the X and captions vanish.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const NRED = '#c8102e', NRED_F = '#fde2e4'   // N pole
const SBLUE = '#1a5fa8'                      // S pole
const FIELD = '#3b82f6'                      // field lines
const FORCE = '#059669'                      // force and motion
const IRON = '#94a3b8', IRON_F = '#e2e8f0'   // iron, a soft magnetic material
const STEEL = '#64748b', STEEL_F = '#cbd5e1' // steel, a hard magnetic material
const FILING = '#334155'                     // iron filings

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/**
 * A filled triangular arrowhead centred on (x, y), pointing at `deg` degrees
 * (0 = right, 90 = down, -90 = up, 180 = left). `s` sets its length.
 */
const arrowAt = (x, y, deg, col, s = 10) => `<path d="M ${s / 2} 0 L ${-s / 2} ${(-s * 0.55).toFixed(1)} L ${-s / 2} ${(s * 0.55).toFixed(1)} Z" transform="translate(${x} ${y}) rotate(${deg})" fill="${col}"/>`

/**
 * A bar magnet lying flat, top-left at (x, y): the left half is the pole named
 * by `left` ('N' or 'S'), the right half the other. Shapes only — the N and S
 * letters are written out beside each call.
 */
const bar = (x, y, w, h, left) => {
  const a = left === 'N' ? NRED : SBLUE
  const b = left === 'N' ? SBLUE : NRED
  return `<rect x="${x}" y="${y}" width="${w / 2}" height="${h}" fill="${a}"/>
    <rect x="${x + w / 2}" y="${y}" width="${w / 2}" height="${h}" fill="${b}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="none" stroke="${INK}" stroke-width="1.5"/>`
}

/** A bar magnet standing upright, top-left at (x, y); `top` names the top pole. */
const vbar = (x, y, w, h, top) => {
  const a = top === 'N' ? NRED : SBLUE
  const b = top === 'N' ? SBLUE : NRED
  return `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="${a}"/>
    <rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 2}" fill="${b}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="none" stroke="${INK}" stroke-width="1.5"/>`
}

/** An unmagnetised rod of iron or steel, top-left at (x, y). */
const rod = (x, y, w, h, kind) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${kind === 'iron' ? IRON_F : STEEL_F}" stroke="${kind === 'iron' ? IRON : STEEL}" stroke-width="2"/>`

/**
 * A plotting compass: a white dial of radius r at (cx, cy), the needle pointing
 * its N end at `deg` (0 = right, -90 = up). N half red, S half white.
 */
const compass = (cx, cy, r, deg) => {
  const L = (r * 0.8).toFixed(1), W = (r * 0.26).toFixed(1)
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
    <g transform="translate(${cx} ${cy}) rotate(${deg})">
      <path d="M ${L} 0 L 0 -${W} L 0 ${W} Z" fill="${NRED}" stroke="${NRED}" stroke-width="1" stroke-linejoin="round"/>
      <path d="M -${L} 0 L 0 -${W} L 0 ${W} Z" fill="#f8fafc" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="1.8" fill="${INK}"/>`
}

/** A seeded random number generator, so the filings land in the same place every render. */
const rng = (seed) => {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * A tuft of `n` iron filings around (cx, cy): short dark strokes inside an
 * ellipse rx × ry, each standing out roughly away from the centre. Strokes that
 * would land on the magnet (`box` = [x0, y0, x1, y1]) are dropped.
 */
const tuft = (cx, cy, rx, ry, n, seed, box) => {
  const r = rng(seed)
  let out = ''
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2
    const d = 0.25 + 0.75 * Math.sqrt(r())
    const x = cx + Math.cos(a) * rx * d
    const y = cy + Math.sin(a) * ry * d
    const t = a + (r() - 0.5) * 0.9
    const l = 3 + r() * 4
    if (x > box[0] && x < box[2] && y > box[1] && y < box[3]) continue
    out += `<line x1="${(x - (Math.cos(t) * l) / 2).toFixed(1)}" y1="${(y - (Math.sin(t) * l) / 2).toFixed(1)}" x2="${(x + (Math.cos(t) * l) / 2).toFixed(1)}" y2="${(y + (Math.sin(t) * l) / 2).toFixed(1)}" stroke="${FILING}" stroke-width="1.4" stroke-linecap="round"/>`
  }
  return out
}

/** A thick green force arrow from x1 to x2 at height y (the head at x2). */
const force = (x1, x2, y) => {
  const d = x2 > x1 ? 1 : -1
  return `<line x1="${x1}" y1="${y}" x2="${x2 - d * 8}" y2="${y}" stroke="${FORCE}" stroke-width="5" stroke-linecap="round"/>
    <path d="M ${x2} ${y} l ${-d * 13} -8 l 0 16 z" fill="${FORCE}"/>`
}

/** A tiny atomic magnet at (x, y): S end blue, N end red with a head, pointing at `deg`. */
const mini = (x, y, deg) => `<g transform="translate(${x} ${y}) rotate(${deg})">
      <line x1="-12" y1="0" x2="0" y2="0" stroke="${SBLUE}" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="7" y2="0" stroke="${NRED}" stroke-width="3.5"/>
      <path d="M 14 0 L 5 -5.5 L 5 5.5 Z" fill="${NRED}"/>
    </g>`

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle class="lbl" cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A right-pointing grey arrow from x1 to x2 at height y. */
const arrowR = (x1, x2, y, col) => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2.4"/>
    <path d="M ${x2} ${y} l -10 -6 l 0 12 z" fill="${col}"/>`

// ───────────────────────────────────────────────────────────────────────────
// 1 · A bar magnet dipped in iron filings (spread 9.1): the filings cling in
//     thick tufts at the two ends and hardly at all to the middle — the force
//     seems to come from two points, the poles.
// ───────────────────────────────────────────────────────────────────────────
const MAGNET_BOX = [96, 108, 384, 150]

const POLES_FILINGS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 250" class="w-full h-full">
    ${plate(480, 250)}
    <text x="240" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">A bar magnet dipped in iron filings</text>
    ${tuft(104, 129, 60, 54, 170, 11, MAGNET_BOX)}
    ${tuft(376, 129, 60, 54, 170, 29, MAGNET_BOX)}
    ${tuft(240, 129, 80, 34, 16, 5, MAGNET_BOX)}
    ${bar(100, 112, 280, 34, 'N')}
    <text x="126" y="135" font-family="${FONT}" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="354" y="135" font-family="${FONT}" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>

    <text x="104" y="58" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">pole</text>
    <text x="376" y="58" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">pole</text>
    ${lead(240, 150, 240, 190)}
    <text x="240" y="204" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">hardly any filings in the middle</text>
    <text x="240" y="234" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">The force seems to come from two points: the poles</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · A bar magnet hung from a thread (spread 9.1): free to turn, it comes to
//     rest lying north–south. The end that points north is the north-seeking
//     pole (N pole); the other is the south-seeking pole (S pole).
// ───────────────────────────────────────────────────────────────────────────
const SUSPENDED_MAGNET = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 280" class="w-full h-full">
    ${plate(460, 280)}
    <line x1="170" y1="22" x2="290" y2="22" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
    <line x1="230" y1="22" x2="230" y2="104" stroke="${INK}" stroke-width="1.5"/>
    <path d="M 222 104 L 222 144 L 238 144 L 238 104 Z" fill="none" stroke="#94a3b8" stroke-width="2"/>
    <path d="M 190 74 A 40 11 0 0 0 270 74" fill="none" stroke="${MUTED}" stroke-width="1.8" stroke-dasharray="4 3"/>
    ${arrowAt(268, 72, -40, MUTED, 9)}
    <text x="282" y="70" font-family="${FONT}" font-size="12" fill="${MUTED}">free to turn</text>
    <text x="246" y="40" font-family="${FONT}" font-size="12" fill="${MUTED}">thread</text>

    ${bar(110, 110, 240, 30, 'S')}
    <text x="134" y="131" font-family="${FONT}" font-size="17" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="326" y="131" font-family="${FONT}" font-size="17" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>

    <line x1="120" y1="186" x2="332" y2="186" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6 4"/>
    ${arrowAt(338, 186, 0, MUTED, 12)}
    <text x="352" y="191" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">north</text>
    <text x="108" y="191" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="end">south</text>

    <text x="150" y="222" font-family="${FONT}" font-size="12" font-weight="bold" fill="${SBLUE}" text-anchor="middle">south-seeking pole</text>
    <text x="150" y="238" font-family="${FONT}" font-size="12" font-weight="bold" fill="${SBLUE}" text-anchor="middle">(S pole)</text>
    <text x="310" y="222" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NRED}" text-anchor="middle">north-seeking pole</text>
    <text x="310" y="238" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NRED}" text-anchor="middle">(N pole)</text>
    <text x="230" y="266" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">It comes to rest lying roughly north–south.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · The force law (spread 9.1): N facing N, the green force arrows push the
//     magnets apart; N facing S, they pull them together.
// ───────────────────────────────────────────────────────────────────────────
const POLES_FORCES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" class="w-full h-full">
    ${plate(480, 270)}
    <text x="240" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Like poles: N facing N</text>
    ${bar(40, 46, 140, 30, 'S')}
    <text x="75" y="67" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="145" y="67" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    ${bar(300, 46, 140, 30, 'N')}
    <text x="335" y="67" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="405" y="67" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    ${force(226, 190, 61)}
    ${force(254, 290, 61)}
    <text x="240" y="104" font-family="${FONT}" font-size="14" font-weight="bold" fill="${FORCE}" text-anchor="middle">repel</text>

    <text x="240" y="136" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Unlike poles: N facing S</text>
    ${bar(40, 152, 140, 30, 'S')}
    <text x="75" y="173" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="145" y="173" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    ${bar(300, 152, 140, 30, 'S')}
    <text x="335" y="173" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="405" y="173" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    ${force(192, 230, 167)}
    ${force(288, 250, 167)}
    <text x="240" y="210" font-family="${FONT}" font-size="14" font-weight="bold" fill="${FORCE}" text-anchor="middle">attract</text>

    <text x="240" y="250" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The closer the poles, the greater the force.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · Induced magnetism (spread 9.1, drawn fresh): an iron bar and a steel bar
//     hang from a magnet's N pole. Each has an induced S pole at the top —
//     the OPPOSITE of the N pole above it, so they attract — and an induced N
//     pole at the bottom. Magnet taken away: the iron is blank (temporary
//     magnet), the steel is still S over N (permanent magnet).
// ───────────────────────────────────────────────────────────────────────────
const INDUCED_POLES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
    ${plate(520, 300)}
    <line x1="330" y1="18" x2="330" y2="282" stroke="#e2e8f0" stroke-width="2"/>
    <text x="165" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">With the magnet</text>
    ${vbar(115, 40, 100, 60, 'S')}
    <text x="165" y="61" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="165" y="91" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    ${rod(128, 102, 30, 112, 'iron')}
    ${rod(172, 102, 30, 112, 'steel')}
    <text x="143" y="125" font-family="${FONT}" font-size="14" font-weight="bold" fill="${SBLUE}" text-anchor="middle">S</text>
    <text x="143" y="206" font-family="${FONT}" font-size="14" font-weight="bold" fill="${NRED}" text-anchor="middle">N</text>
    <text x="187" y="125" font-family="${FONT}" font-size="14" font-weight="bold" fill="${SBLUE}" text-anchor="middle">S</text>
    <text x="187" y="206" font-family="${FONT}" font-size="14" font-weight="bold" fill="${NRED}" text-anchor="middle">N</text>
    <text x="120" y="125" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">induced S</text>
    <text x="120" y="206" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">induced N</text>
    <text x="143" y="234" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">iron</text>
    <text x="187" y="234" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">steel</text>
    <text x="165" y="264" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">poles induced in iron and steel</text>

    <text x="425" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Magnet taken away</text>
    ${rod(377, 102, 30, 112, 'iron')}
    ${rod(443, 102, 30, 112, 'steel')}
    <text x="458" y="125" font-family="${FONT}" font-size="14" font-weight="bold" fill="${SBLUE}" text-anchor="middle">S</text>
    <text x="458" y="206" font-family="${FONT}" font-size="14" font-weight="bold" fill="${NRED}" text-anchor="middle">N</text>
    <text x="392" y="234" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">iron</text>
    <text x="458" y="234" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">steel</text>
    <text x="392" y="252" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">temporary</text>
    <text x="392" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">magnet</text>
    <text x="458" y="252" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">permanent</text>
    <text x="458" y="267" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">magnet</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · Making a magnet by stroking (spread 9.1, drawn fresh): the N pole of a
//     magnet strokes a steel bar from left to right, then is lifted well clear
//     and brought back to the start. The end the stroke finishes at gets the
//     opposite pole to the stroking pole: S on the right, N on the left.
// ───────────────────────────────────────────────────────────────────────────
const STROKING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 270" class="w-full h-full">
    ${plate(460, 270)}
    <path d="M 380 104 C 374 40, 80 40, 74 104" fill="none" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6 4"/>
    ${arrowAt(74, 102, 92, MUTED, 12)}
    <text x="227" y="34" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">2 · lift it well clear and go back</text>
    <rect x="60" y="110" width="28" height="84" rx="2" fill="none" stroke="${MUTED}" stroke-width="1.5" stroke-dasharray="4 3"/>

    ${vbar(366, 110, 28, 84, 'S')}
    <text x="380" y="137" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="380" y="179" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <line x1="98" y1="186" x2="348" y2="186" stroke="${FORCE}" stroke-width="3" stroke-linecap="round"/>
    ${arrowAt(354, 186, 0, FORCE, 14)}
    <text x="222" y="172" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">1 · stroke from end to end</text>

    <rect x="50" y="196" width="360" height="30" rx="3" fill="${STEEL_F}" stroke="${STEEL}" stroke-width="2"/>
    <text x="72" y="217" font-family="${FONT}" font-size="15" font-weight="bold" fill="${NRED}" text-anchor="middle">N</text>
    <text x="388" y="217" font-family="${FONT}" font-size="15" font-weight="bold" fill="${SBLUE}" text-anchor="middle">S</text>
    <text x="230" y="248" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">steel bar</text>
    <text x="72" y="248" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">induced N</text>
    <text x="388" y="248" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">induced S</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · Magnetic and non-magnetic metals (spread 9.1): iron, nickel, cobalt and
//     steel are attracted; copper, brass, aluminium, zinc and tin are not.
// ───────────────────────────────────────────────────────────────────────────
const MAGNETIC_METALS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full">
    ${plate(520, 250)}
    <rect x="12" y="14" width="210" height="222" rx="14" fill="${NRED_F}" stroke="${NRED}" stroke-width="2"/>
    <text x="106" y="44" font-family="${FONT}" font-size="16" font-weight="bold" fill="${NRED}" text-anchor="middle">Magnetic</text>
    ${bar(156, 33, 40, 13, 'N')}
    <rect x="24" y="62" width="90" height="40" rx="8" fill="#ffffff" stroke="${NRED}" stroke-width="2"/>
    <text x="69" y="87" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">iron</text>
    <rect x="120" y="62" width="90" height="40" rx="8" fill="#ffffff" stroke="${NRED}" stroke-width="2"/>
    <text x="165" y="87" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">nickel</text>
    <rect x="24" y="112" width="90" height="40" rx="8" fill="#ffffff" stroke="${NRED}" stroke-width="2"/>
    <text x="69" y="137" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">cobalt</text>
    <rect x="120" y="112" width="90" height="40" rx="8" fill="#ffffff" stroke="${NRED}" stroke-width="2"/>
    <text x="165" y="137" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">steel</text>
    <text x="117" y="188" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">attracted to a magnet</text>
    <text x="117" y="208" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">contain iron, nickel or cobalt</text>

    <rect x="234" y="14" width="274" height="222" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
    <text x="371" y="44" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Non-magnetic</text>
    <rect x="246" y="62" width="80" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="286" y="87" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">copper</text>
    <rect x="331" y="62" width="80" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="371" y="87" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">brass</text>
    <rect x="416" y="62" width="80" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="456" y="87" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">aluminium</text>
    <rect x="288" y="112" width="80" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="328" y="137" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">zinc</text>
    <rect x="373" y="112" width="80" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="413" y="137" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">tin</text>
    <text x="371" y="188" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">not attracted to a magnet</text>
    <text x="371" y="208" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">and neither are non-metals</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Atomic magnets (spread 9.1): unmagnetised, the tiny atomic magnets
//     point every way; magnetised, they are lined up (N ends to the right) and
//     act as one big magnet with its N pole on the right.
// ───────────────────────────────────────────────────────────────────────────
const RANDOM_ANGLES = [35, 160, -80, 250, 110, -20, 200, 75, -135, 300, 140, 15, -60, 230, 95, 185, -110, 45, 270, 120]

/** A 5 × 4 grid of atomic magnets, left column at x0; `angles` (or one angle) sets each. */
const atoms = (x0, angles) => {
  let out = ''
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 5; i++) {
      const deg = Array.isArray(angles) ? angles[j * 5 + i] : angles
      out += mini(x0 + 40 * i, 60 + 36 * j, deg)
    }
  }
  return out
}

const ATOMIC_MAGNETS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" class="w-full h-full">
    ${plate(520, 260)}
    <text x="120" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">unmagnetised</text>
    <rect x="20" y="38" width="200" height="152" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    ${atoms(40, RANDOM_ANGLES)}
    <text x="120" y="214" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">atomic magnets point every way</text>
    <text x="120" y="232" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">so their effects cancel</text>

    ${arrowR(228, 282, 114, MUTED)}
    <text x="255" y="102" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">magnetise</text>

    <text x="390" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">magnetised</text>
    <rect x="290" y="38" width="200" height="152" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    ${atoms(310, 0)}
    ${bar(310, 202, 160, 22, 'S')}
    <text x="330" y="218" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="450" y="218" font-family="${FONT}" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="390" y="246" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">lined up: they act as one big magnet</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · The field of a bar magnet (spread 9.2, drawn fresh): six loops from the
//     N end round to the S end, closest together at the poles, every arrow
//     running N → S; on the axis both arrows point left (away from N, into S).
//     A compass on the outer upper loop points its red N end along the line.
// ───────────────────────────────────────────────────────────────────────────
const FIELD_LINES_BAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 340" class="w-full h-full">
    ${plate(540, 340)}
    <g fill="none" stroke="${FIELD}" stroke-width="2">
      <path d="M 200 165 C 160 165, 215 122, 270 122 C 325 122, 380 165, 340 165"/>
      <path d="M 200 161 C 120 161, 180 80, 270 80 C 360 80, 420 161, 340 161"/>
      <path d="M 200 158 C 60 158, 140 34, 270 34 C 400 34, 480 158, 340 158"/>
      <path d="M 200 175 C 160 175, 215 218, 270 218 C 325 218, 380 175, 340 175"/>
      <path d="M 200 179 C 120 179, 180 260, 270 260 C 360 260, 420 179, 340 179"/>
      <path d="M 200 182 C 60 182, 140 306, 270 306 C 400 306, 480 182, 340 182"/>
      <path d="M 200 170 L 22 170"/>
      <path d="M 518 170 L 340 170"/>
    </g>
    ${arrowAt(270, 122, 0, FIELD)}
    ${arrowAt(270, 80, 0, FIELD)}
    ${arrowAt(270, 34, 0, FIELD)}
    ${arrowAt(270, 218, 0, FIELD)}
    ${arrowAt(270, 260, 0, FIELD)}
    ${arrowAt(270, 306, 0, FIELD)}
    ${arrowAt(96, 170, 180, FIELD)}
    ${arrowAt(444, 170, 180, FIELD)}

    ${bar(200, 156, 140, 28, 'N')}
    <text x="235" y="176" font-family="${FONT}" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="305" y="176" font-family="${FONT}" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>

    ${compass(149, 78, 13, -43.5)}
    ${lead(139, 69, 96, 46)}
    <text x="40" y="44" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">compass</text>
    <text x="270" y="330" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Outside the magnet, the field lines run from N to S.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · Plotting a field line with a compass (spread 9.2, drawn fresh): dots
//     marked at the needle's ends, step by step from the N pole; the dots
//     joined into a line with an arrow along it. The compass sits with the back
//     of its needle on the last dot, and the pencil marks the new front dot.
//     The dashed part is still to come: it carries on round to the S pole.
// ───────────────────────────────────────────────────────────────────────────
const PLOT_DOTS = [[70, 244], [54, 185.7], [64.4, 137.3], [98.8, 97.3], [154.8, 70.1], [230, 60], [269, 60]]

/** The dots a student marks on the paper. */
const dots = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${INK}"/>`).join('')

const PLOTTING_COMPASS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <path d="M 70 244 C 20 150, 90 60, 230 60" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    ${arrowAt(78.8, 116.8, -50, FIELD, 12)}
    <path d="M 276 60 C 380 60, 350 200, 296 244" fill="none" stroke="${FIELD}" stroke-width="1.8" stroke-dasharray="5 5"/>
    ${compass(252, 60, 22, 0)}
    ${dots(PLOT_DOTS)}
    <path d="M 277 42 L 311 8 L 318 15 L 284 49 Z" fill="#f1f5f9" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M 272 55 L 277 42 L 284 49 Z" fill="#e2e8f0" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>

    ${bar(60, 246, 240, 30, 'N')}
    <text x="92" y="267" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="268" y="267" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>

    <text x="330" y="66" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">plotting compass</text>
    ${lead(91, 104, 126, 104)}
    <text x="130" y="108" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}">field line</text>
    ${lead(58, 186, 92, 186)}
    <text x="96" y="190" font-family="${FONT}" font-size="12" fill="${INK}">dots at the two ends</text>
    <text x="96" y="206" font-family="${FONT}" font-size="12" fill="${INK}">of the needle</text>
    <text x="372" y="140" font-family="${FONT}" font-size="12" fill="${MUTED}">carry on to</text>
    <text x="372" y="156" font-family="${FONT}" font-size="12" fill="${MUTED}">the S pole</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 10 · Which way a compass points round a bar magnet (spread 9.2). Each
//      needle's direction is worked out from the two poles (N at x = 186, S at
//      x = 314, point-pole model): left of N and right of S both point LEFT
//      (away from N, into S); above-left of N points up and a little left;
//      above-right of S points down and a little left, into S; below, the
//      mirror images. The "?" beside the middle (a notes check) points right,
//      towards the S end.
// ───────────────────────────────────────────────────────────────────────────
const COMPASS_DIRECTION = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 280" class="w-full h-full">
    ${plate(500, 280)}
    <text x="250" y="24" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Each needle's N end shows the field direction</text>
    ${bar(170, 126, 160, 28, 'N')}
    <text x="210" y="146" font-family="${FONT}" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="290" y="146" font-family="${FONT}" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    ${compass(96, 140, 16, 180)}
    ${compass(404, 140, 16, 180)}
    ${compass(150, 70, 16, -109)}
    ${compass(350, 70, 16, 109)}
    ${compass(150, 210, 16, 109)}
    ${compass(350, 210, 16, -109)}
    <circle cx="250" cy="76" r="16" fill="#ffffff" stroke="${MUTED}" stroke-width="1.6" stroke-dasharray="4 3"/>
    <text x="250" y="82" font-family="${FONT}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">?</text>
    <text x="250" y="262" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">red half = the N end of the needle</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 11 · Two magnets' fields combine (spread 9.2, drawn fresh). Left panel,
//      unlike poles facing (N facing S): straight, evenly spaced lines between
//      them, arrows N → S — an almost uniform field. Right panel, like poles
//      facing (N facing N): the lines from each N pole turn away from the
//      other, up or down, and the neutral point X sits midway between them,
//      where the two fields cancel. Also the slide-20 hotspot: the pole letters
//      are class="keep"; the X and every caption are stripped there.
// ───────────────────────────────────────────────────────────────────────────
const TWO_MAGNETS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" class="w-full h-full">
    ${plate(600, 300)}
    <line x1="300" y1="16" x2="300" y2="284" stroke="#e2e8f0" stroke-width="2"/>
    <text x="145" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Unlike poles facing</text>
    <text x="455" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Like poles facing</text>

    <g fill="none" stroke="${FIELD}" stroke-width="1.8">
      <path d="M 106 136 L 184 136 M 106 143 L 184 143 M 106 150 L 184 150 M 106 157 L 184 157 M 106 164 L 184 164"/>
      <path d="M 104 132 C 120 102, 170 102, 186 132"/>
      <path d="M 92 132 C 100 70, 190 70, 198 132"/>
      <path d="M 104 168 C 120 198, 170 198, 186 168"/>
      <path d="M 92 168 C 100 230, 190 230, 198 168"/>
    </g>
    ${arrowAt(145, 136, 0, FIELD, 7)}
    ${arrowAt(145, 150, 0, FIELD, 7)}
    ${arrowAt(145, 164, 0, FIELD, 7)}
    ${arrowAt(145, 109.5, 0, FIELD, 9)}
    ${arrowAt(145, 85.5, 0, FIELD, 9)}
    ${arrowAt(145, 190.5, 0, FIELD, 9)}
    ${arrowAt(145, 214.5, 0, FIELD, 9)}
    ${bar(16, 132, 90, 36, 'S')}
    <text class="keep" x="38" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text class="keep" x="84" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    ${bar(184, 132, 90, 36, 'S')}
    <text class="keep" x="206" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text class="keep" x="252" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="145" y="272" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">almost uniform</text>
    <text x="145" y="288" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">straight, evenly spaced lines</text>

    <g fill="none" stroke="${FIELD}" stroke-width="1.8">
      <path d="M 416 150 L 444 150 M 494 150 L 466 150"/>
      <path d="M 416 146 C 440 146, 447 132, 447 104 L 447 44"/>
      <path d="M 416 141 C 432 141, 436 124, 434 96 C 432 76, 428 60, 424 44"/>
      <path d="M 410 132 C 412 116, 412 98, 404 76 C 398 62, 392 52, 386 44"/>
      <path d="M 494 146 C 470 146, 463 132, 463 104 L 463 44"/>
      <path d="M 494 141 C 478 141, 474 124, 476 96 C 478 76, 482 60, 486 44"/>
      <path d="M 500 132 C 498 116, 498 98, 506 76 C 512 62, 518 52, 524 44"/>
      <path d="M 416 154 C 440 154, 447 168, 447 196 L 447 256"/>
      <path d="M 416 159 C 432 159, 436 176, 434 204 C 432 224, 428 240, 424 256"/>
      <path d="M 410 168 C 412 184, 412 202, 404 224 C 398 238, 392 248, 386 256"/>
      <path d="M 494 154 C 470 154, 463 168, 463 196 L 463 256"/>
      <path d="M 494 159 C 478 159, 474 176, 476 204 C 478 224, 482 240, 486 256"/>
      <path d="M 500 168 C 498 184, 498 202, 506 224 C 512 238, 518 248, 524 256"/>
      <path d="M 380 132 C 380 94, 340 94, 336 132 M 380 168 C 380 206, 340 206, 336 168"/>
      <path d="M 530 132 C 530 94, 570 94, 574 132 M 530 168 C 530 206, 570 206, 574 168"/>
    </g>
    ${arrowAt(432, 150, 0, FIELD, 8)}
    ${arrowAt(478, 150, 180, FIELD, 8)}
    ${arrowAt(447, 76, -90, FIELD, 9)}
    ${arrowAt(432, 79, -100, FIELD, 9)}
    ${arrowAt(399, 64, -117, FIELD, 9)}
    ${arrowAt(463, 76, -90, FIELD, 9)}
    ${arrowAt(478, 79, -80, FIELD, 9)}
    ${arrowAt(511, 64, -63, FIELD, 9)}
    ${arrowAt(447, 224, 90, FIELD, 9)}
    ${arrowAt(432, 221, 100, FIELD, 9)}
    ${arrowAt(399, 236, 117, FIELD, 9)}
    ${arrowAt(463, 224, 90, FIELD, 9)}
    ${arrowAt(478, 221, 80, FIELD, 9)}
    ${arrowAt(511, 236, 63, FIELD, 9)}
    ${arrowAt(359.5, 103.5, 180, FIELD, 8)}
    ${arrowAt(359.5, 196.5, 180, FIELD, 8)}
    ${arrowAt(550.5, 103.5, 0, FIELD, 8)}
    ${arrowAt(550.5, 196.5, 0, FIELD, 8)}
    ${bar(326, 132, 90, 36, 'S')}
    <text class="keep" x="348" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text class="keep" x="394" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    ${bar(494, 132, 90, 36, 'N')}
    <text class="keep" x="516" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text class="keep" x="562" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="455" y="155" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">X</text>
    <text x="455" y="272" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">X: neutral point</text>
    <text x="455" y="288" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">the two fields cancel here</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 12 · The Earth's magnetic field (spread 9.2, drawn fresh). The field is
//      like a weak bar magnet inside the Earth, tilted 12° here from the axis
//      of rotation. Its S pole points to the north — the magnetic pole under
//      magnetic north is a magnetic S pole, because a compass's N end is
//      attracted there. Outside, the lines run from the southern hemisphere
//      (magnetic N) round to the northern (magnetic S), so at the equator the
//      arrows point north and a compass there points its N end north. Near the
//      poles the lines dive steeply into the ground.
//      The lines are TRACED, not hand-drawn, so they nest and never cross: the
//      magnet is modelled as two point poles 55 units either side of the
//      centre on the tilted axis, and fieldLine() steps along the field from
//      one pole until it reaches the other or the edge of the plate. The globe
//      is drawn over them, so only the part outside the Earth shows.
// ───────────────────────────────────────────────────────────────────────────
const TILT = (12 * Math.PI) / 180                         // magnetic axis vs axis of rotation
const UP = [Math.sin(TILT), -Math.cos(TILT)]              // up the magnetic axis, towards its S end
const EARTH_N = [230 - 55 * UP[0], 180 - 55 * UP[1]]      // the magnet's N pole, in the south
const EARTH_S = [230 + 55 * UP[0], 180 + 55 * UP[1]]      // the magnet's S pole, in the north

/** The field direction (a unit vector, the way the force on an N pole acts) at (x, y). */
const poleField = (x, y) => {
  const ax = x - EARTH_N[0], ay = y - EARTH_N[1], bx = x - EARTH_S[0], by = y - EARTH_S[1]
  const ra = Math.pow(ax * ax + ay * ay, 1.5), rb = Math.pow(bx * bx + by * by, 1.5)
  const fx = ax / ra - bx / rb, fy = ay / ra - by / rb
  const m = Math.hypot(fx, fy)
  return [fx / m, fy / m]
}

/**
 * One field line, traced from a pole in 3-unit steps (midpoint method) until it
 * reaches the other pole or the edge of the plate. From 'N' it follows the
 * field; from 'S' it follows it backwards. `deg` is the starting direction.
 * The arrowhead (always pointing N → S) sits where a closed line is farthest
 * from the magnetic axis, or 78 units along a line that runs off the plate.
 */
const fieldLine = (from, deg) => {
  const P = from === 'N' ? EARTH_N : EARTH_S
  const Q = from === 'N' ? EARTH_S : EARTH_N
  const sgn = from === 'N' ? 1 : -1
  let x = P[0] + 3 * Math.cos((deg * Math.PI) / 180)
  let y = P[1] + 3 * Math.sin((deg * Math.PI) / 180)
  const pts = [[x, y]]
  let closed = false
  for (let i = 0; i < 1200; i++) {
    const [u1, v1] = poleField(x, y)
    const [u2, v2] = poleField(x + sgn * 1.5 * u1, y + sgn * 1.5 * v1)
    x += sgn * 3 * u2
    y += sgn * 3 * v2
    if (Math.hypot(x - Q[0], y - Q[1]) < 4) { closed = true; break }
    if (x < 8 || x > 452 || y < 8 || y > 352) break
    pts.push([x, y])
  }
  let k = Math.min(26, pts.length - 1)
  if (closed) {
    const off = ([px, py]) => Math.abs((px - 230) * UP[1] - (py - 180) * UP[0])
    k = pts.reduce((best, p, i) => (off(p) > off(pts[best]) ? i : best), 0)
  }
  const [ax, ay] = pts[k]
  const [fx, fy] = poleField(ax, ay)
  const d = pts.filter((_, i) => i % 2 === 0 || i === pts.length - 1).map(([px, py], i) => `${i ? 'L' : 'M'} ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ')
  return `<path d="${d}" fill="none" stroke="${FIELD}" stroke-width="1.8"/>${arrowAt(ax.toFixed(1), ay.toFixed(1), ((Math.atan2(fy, fx) * 180) / Math.PI).toFixed(0), FIELD)}`
}

// Straight down the axis from N is 102°; up the axis from S is −78°. Lines leave
// N at 86°, 72° and 62° either side of the axis and close on S; the ones at 40°
// and along the axis run off the plate, and so do their twins arriving at S.
const EARTH_LINES = [
  ['N', 16], ['N', 30], ['N', 40], ['N', 188], ['N', 174], ['N', 164],
  ['N', 62], ['N', 142], ['N', 102], ['S', -38], ['S', -118], ['S', -78],
].map(([from, deg]) => fieldLine(from, deg)).join('')

const EARTH_FIELD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 360" class="w-full h-full">
    ${plate(460, 360)}
    ${EARTH_LINES}
    <circle cx="230" cy="180" r="80" fill="#eef2f7" stroke="#94a3b8" stroke-width="2"/>
    <path d="M 230 32 L 230 100 M 230 260 L 230 330" stroke="${MUTED}" stroke-width="1.5" stroke-dasharray="3 3"/>
    <circle cx="230" cy="100" r="3.5" fill="${INK}"/>
    <circle cx="230" cy="260" r="3.5" fill="${INK}"/>
    <circle cx="246.6" cy="101.8" r="4" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="213.4" cy="258.2" r="4" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>

    <path d="M 229.75 118.61 L 255.19 124.01 L 242.72 182.70 L 217.28 177.30 Z" fill="${SBLUE}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M 217.28 177.30 L 242.72 182.70 L 230.25 241.39 L 204.81 235.99 Z" fill="${NRED}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
    <text x="236" y="156" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="224" y="215" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    ${compass(59, 144, 15, -78)}

    <text x="226" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="end">North Pole</text>
    <text x="268" y="40" font-family="${FONT}" font-size="12" font-weight="bold" fill="${SBLUE}">magnetic north</text>
    <text x="236" y="346" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">South Pole</text>
    <text x="192" y="346" font-family="${FONT}" font-size="12" font-weight="bold" fill="${NRED}" text-anchor="end">magnetic south</text>
  </svg>`

export const DIAGRAMS = {
  POLES_FILINGS: POLES_FILINGS,
  SUSPENDED_MAGNET: SUSPENDED_MAGNET,
  POLES_FORCES: POLES_FORCES,
  INDUCED_POLES: INDUCED_POLES,
  STROKING: STROKING,
  MAGNETIC_METALS: MAGNETIC_METALS,
  ATOMIC_MAGNETS: ATOMIC_MAGNETS,
  FIELD_LINES_BAR: FIELD_LINES_BAR,
  PLOTTING_COMPASS: PLOTTING_COMPASS,
  COMPASS_DIRECTION: COMPASS_DIRECTION,
  TWO_MAGNETS: TWO_MAGNETS,
  EARTH_FIELD: EARTH_FIELD,
}
