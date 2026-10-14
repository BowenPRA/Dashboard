// src/data/OLEVEL_PHYS/C09_2/diagrams.js
// Teaching diagrams for C09_2 Currents, Coils and Electromagnets (book spreads
// 9.3 Magnetic effect of a current and 9.4 Electromagnets). All AUTHORED,
// nothing taken from the book: the wires, coils, relay, circuit breaker and
// recording head are drawn here so the labels are real <text> the SVG audit
// can measure, and there is no licence to carry.
//
// Colour means something on this track (docs/olevel-phys/AUTHORING-BRIEF.md):
//   N pole                     red           #c8102e
//   S pole                     blue          #1a5fa8
//   magnetic field lines       blue          #3b82f6
//   conventional current       amber         #f59e0b (#b45309 for text)
//   motion (the moving tape)   green         #059669
//   iron (cores, armature)     #94a3b8 on #e2e8f0
//   steel (bar, springs)       #64748b on #cbd5e1
//   copper coils               #b45309
//   plain circuit wires        ink #1e293b
//
// Every direction is worked out from a rule, never guessed:
//   · a current OUT of the page (a dot in a circle) has an ANTICLOCKWISE field
//     as you look at the page (right-hand grip: thumb towards you); INTO the
//     page (a cross) is clockwise.
//   · every coil here is wound the same way (the `coil` helper below): its two
//     ends are at the bottom of the end turns, and current that ENTERS at the
//     left end flows UP the front of the turns. Fingers up the front, thumb to
//     the left: the N pole is the left end. Current entering at the RIGHT end
//     flows DOWN the front, and the N pole is the right end. So in these
//     drawings N is always the end the current goes in at — which is why
//     turning the battery round swaps the poles.
//
// House rules (as M06_3, so `npm run audit:svg` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — helpers draw shapes only;
//  · symbols are Unicode (−, ·), never <tspan>;
//  · no markers, gradients or clip paths: arrowheads are small filled
//    triangles from `arrowAt`, so there are no ids to collide;
//  · the hotspot drawing (SOLENOID_POLES_Q) tags the battery's + and − with
//    class="keep", so they survive the label stripping the hotspot does.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const N_COL = '#c8102e'                       // N pole
const S_COL = '#1a5fa8'                       // S pole
const FIELD = '#3b82f6'                       // field lines
const CURRENT = '#f59e0b'                     // conventional current arrows
const CURRENT_TXT = '#b45309'                 // current, as text on white
const MOTION = '#059669'                      // motion: the moving tape
const IRON = '#94a3b8', IRON_FILL = '#e2e8f0' // soft iron
const STEEL = '#64748b', STEEL_FILL = '#cbd5e1' // steel
const COPPER = '#b45309', COPPER_BACK = '#e9c8a4' // coil strands: front, back
const METAL = '#475569'                       // switch arms and contacts
const SKIN = '#f3dcc4', SKIN_LINE = '#9a7358' // the stylised hand

/** Round to one decimal place, so the path data stays short. */
const f = (v) => Math.round(v * 10) / 10

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/**
 * A filled arrowhead CENTRED on (x, y), pointing at `deg` degrees in screen
 * terms: 0 = right, 90 = down, 180 = left, 270 = up. `s` sets its size.
 */
const arrowAt = (x, y, deg, col, s = 8) => {
  const a = (deg * Math.PI) / 180
  const c = Math.cos(a), sn = Math.sin(a)
  const tx = x + c * s * 0.6, ty = y + sn * s * 0.6
  const bx = x - c * s * 0.6, by = y - sn * s * 0.6
  const w = s * 0.55
  return `<path d="M ${f(tx)} ${f(ty)} L ${f(bx - sn * w)} ${f(by + c * w)} L ${f(bx + sn * w)} ${f(by - c * w)} Z" fill="${col}"/>`
}

/** A plain circuit wire along a path. */
const wire = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`

/**
 * One cell on a horizontal wire at height y, centred on x. The long thin plate
 * is +, the short thick plate is −. The wires stop at x − 5 and x + 5.
 */
const cell = (x, y, plusLeft) => {
  const xl = plusLeft ? x - 5 : x + 5
  const xs = plusLeft ? x + 5 : x - 5
  return `<line x1="${xl}" y1="${y - 15}" x2="${xl}" y2="${y + 15}" stroke="${INK}" stroke-width="2.5"/>
    <line x1="${xs}" y1="${y - 8}" x2="${xs}" y2="${y + 8}" stroke="${INK}" stroke-width="5"/>`
}

/** A leader line from a part out to its label. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** A white disc with a coloured ring: the backing for an N or S letter. */
const badge = (x, y, col, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${col}" stroke-width="2.5"/>`

/** A wire seen end-on, current OUT of the page: a circle with a dot. */
const wireOut = (x, y, r = 11) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${COPPER}" stroke-width="3"/>
    <circle cx="${x}" cy="${y}" r="${f(r * 0.33)}" fill="${CURRENT}"/>`

/** A wire seen end-on, current INTO the page: a circle with a cross. */
const wireIn = (x, y, r = 11) => {
  const k = f(r * 0.5)
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${COPPER}" stroke-width="3"/>
    <path d="M ${x - k} ${y - k} L ${x + k} ${y + k} M ${x + k} ${y - k} L ${x - k} ${y + k}" stroke="${CURRENT}" stroke-width="2.6" stroke-linecap="round"/>`
}

/** A zigzag spring from (x1, y1) to (x2, y2): `n` coils, `amp` wide. Steel. */
const spring = (x1, y1, x2, y2, n = 6, amp = 6) => {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy)
  const px = -dy / L, py = dx / L
  let d = `M ${x1} ${y1}`
  for (let i = 1; i < 2 * n; i++) {
    const t = i / (2 * n), s = i % 2 ? amp : -amp
    d += ` L ${f(x1 + dx * t + px * s)} ${f(y1 + dy * t + py * s)}`
  }
  d += ` L ${x2} ${y2}`
  return `<path d="${d}" fill="none" stroke="${STEEL}" stroke-width="2" stroke-linejoin="round"/>`
}

/**
 * A point on the helix of a `coil` (below), at angle t round the turns. The
 * coil is seen slightly obliquely, so each turn looks like a loop: the axial
 * position grows by one pitch p per turn, and the front of a turn (sin t > 0,
 * towards the viewer) is shifted LEFT by e·sin t. t = 0, 2π, 4π… is the
 * bottom of a turn; t = π, 3π… the top.
 */
const helixAt = (xL, cy, r, p, t) => [
  xL + (p * t) / (2 * Math.PI) - 0.5 * p * Math.sin(t),
  cy + r * Math.cos(t),
]

/**
 * A solenoid of `n` turns from xL to xR about the axis y = cy, radius r.
 * Returns [back, front]: the faint half-turns behind the axis and the solid
 * half-turns in front, so a bar, a core or a field line can be drawn between
 * them. Front half k is t from 2πk to 2πk + π: from the bottom of the turn at
 * x = xL + k·p, round the FRONT, UP to the top. Back half k goes on from that
 * top, round the back, down to the next bottom. So the wire's two ends are the
 * bottoms of the end turns, (xL, cy + r) and (xR, cy + r). Current entering at
 * xL goes UP every front half (N pole at the left); current entering at xR goes
 * DOWN them (N pole at the right).
 */
const coil = (xL, xR, cy, r, n) => {
  const p = (xR - xL) / n
  const half = (t0) => {
    let d = ''
    for (let i = 0; i <= 12; i++) {
      const [x, y] = helixAt(xL, cy, r, p, t0 + (Math.PI * i) / 12)
      d += `${i ? ' L' : 'M'} ${f(x)} ${f(y)}`
    }
    return d
  }
  let back = '', front = ''
  for (let k = 0; k < n; k++) {
    front += `<path d="${half(2 * Math.PI * k)}" fill="none" stroke="${COPPER}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
    back += `<path d="${half(2 * Math.PI * k + Math.PI)}" fill="none" stroke="${COPPER_BACK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  }
  return [back, front]
}

/**
 * Current arrows on the front halves of a `coil` with the same xL, xR, cy, r,
 * n: one per turn, a little above the axis (t = 0.6π, clear of the back
 * strand it crosses), pointing UP the front (`up`) or DOWN it.
 */
const coilArrows = (xL, xR, cy, r, n, up, s = 8) => {
  const p = (xR - xL) / n, t = 0.6 * Math.PI
  const dx = p / (2 * Math.PI) - 0.5 * p * Math.cos(t), dy = -r * Math.sin(t)
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI + (up ? 0 : 180)
  let out = ''
  for (let k = 0; k < n; k++) {
    const [x, y] = helixAt(xL, cy, r, p, 2 * Math.PI * k + t)
    out += arrowAt(x, y, deg, CURRENT, s)
  }
  return out
}

/** The far (upper) half of a flat ellipse round a vertical wire. */
const backArc = (cx, cy, a, b) => `<path d="M ${cx - a} ${cy} A ${a} ${b} 0 0 1 ${cx + a} ${cy}" fill="none" stroke="${FIELD}" stroke-width="2.4"/>`

/** The near (lower) half of the same ellipse. */
const frontArc = (cx, cy, a, b) => `<path d="M ${cx + a} ${cy} A ${a} ${b} 0 0 1 ${cx - a} ${cy}" fill="none" stroke="${FIELD}" stroke-width="2.4"/>`

/**
 * An arrowhead on that ellipse at parameter t (x = cx + a·cos t, y = cy +
 * b·sin t), pointing the way an ANTICLOCKWISE-from-above field goes: along
 * decreasing t, so the near half runs left to right.
 */
const ellArrow = (cx, cy, a, b, t) => {
  const deg = (Math.atan2(-b * Math.cos(t), a * Math.sin(t)) * 180) / Math.PI
  return arrowAt(cx + a * Math.cos(t), cy + b * Math.sin(t), deg, FIELD, 9)
}

// ───────────────────────────────────────────────────────────────────────────
// 1 · The field round a straight wire, looking along the wire. The current
//     comes OUT of the page (towards you), so by the right-hand grip rule the
//     field lines run ANTICLOCKWISE: left across the top of each circle, right
//     across the bottom, down the left side, up the right side. The circles
//     get further apart going out — the field weakens with distance.
// ───────────────────────────────────────────────────────────────────────────
const WIRE_FIELD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" class="w-full h-full">
    ${plate(520, 340)}
    <text x="24" y="30" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Looking along the wire, end-on</text>

    <circle cx="190" cy="176" r="34" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    <circle cx="190" cy="176" r="72" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    <circle cx="190" cy="176" r="124" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    ${arrowAt(190, 142, 180, FIELD, 10)}
    ${arrowAt(190, 210, 0, FIELD, 10)}
    ${arrowAt(118, 176, 90, FIELD, 10)}
    ${arrowAt(262, 176, 270, FIELD, 10)}
    ${arrowAt(190, 52, 180, FIELD, 10)}
    ${arrowAt(190, 300, 0, FIELD, 10)}
    ${arrowAt(66, 176, 90, FIELD, 10)}
    ${arrowAt(314, 176, 270, FIELD, 10)}
    ${wireOut(190, 176, 12)}

    <text x="336" y="64" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}">field lines: circles</text>
    <text x="336" y="80" font-family="${FONT}" font-size="12" fill="${MUTED}">centred on the wire</text>

    ${lead(203, 170, 330, 126)}
    <text x="336" y="118" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">the wire, end-on</text>
    <text x="336" y="134" font-family="${FONT}" font-size="12" fill="${CURRENT_TXT}">current out of the page,</text>
    <text x="336" y="150" font-family="${FONT}" font-size="12" fill="${CURRENT_TXT}">towards you</text>

    ${lead(214, 196, 330, 204)}
    <text x="336" y="204" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">strongest near the wire</text>
    <text x="336" y="220" font-family="${FONT}" font-size="12" fill="${MUTED}">lines close together</text>

    ${lead(297, 238, 330, 258)}
    <text x="336" y="262" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">weaker further out</text>
    <text x="336" y="278" font-family="${FONT}" font-size="12" fill="${MUTED}">lines further apart</text>

    <text x="260" y="328" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Seen from here, the field runs anticlockwise.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · The right-hand grip rule for a straight wire. The wire is upright with
//     the conventional current going UP. A right fist grips it, thumb up the
//     wire. Seen from above, the current comes towards you, so the field is
//     anticlockwise from above: on each flat ellipse the NEAR (lower) half
//     runs left → right and the FAR (upper) half right → left.
// ───────────────────────────────────────────────────────────────────────────
const GRIP_RULE_WIRE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 384" class="w-full h-full">
    ${plate(480, 384)}
    <text x="24" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">The right-hand grip rule</text>

    ${backArc(170, 120, 82, 20)}
    ${backArc(170, 250, 112, 26)}
    <line x1="170" y1="44" x2="170" y2="352" stroke="${INK}" stroke-width="3"/>
    ${arrowAt(170, 54, 270, CURRENT, 16)}
    ${frontArc(170, 120, 82, 20)}
    ${ellArrow(170, 120, 82, 20, 2.2)}
    ${ellArrow(170, 120, 82, 20, 0.9)}
    ${ellArrow(170, 120, 82, 20, -0.9)}

    <path d="M 144 214 Q 134 214 134 224 L 134 274 Q 134 286 146 286 L 198 286 Q 210 286 210 274 L 210 224 Q 210 214 200 214 Z" fill="${SKIN}" stroke="${SKIN_LINE}" stroke-width="2"/>
    <path d="M 136 232 L 208 232 M 136 250 L 208 250 M 136 268 L 208 268" fill="none" stroke="${SKIN_LINE}" stroke-width="1.6"/>
    <path d="M 160 220 L 160 170 Q 160 156 172 156 Q 184 156 184 170 L 184 220 Z" fill="${SKIN}" stroke="${SKIN_LINE}" stroke-width="2"/>
    <path d="M 165 174 Q 165 162 172 162 Q 179 162 179 174 Z" fill="#fbeee2" stroke="${SKIN_LINE}" stroke-width="1"/>
    ${frontArc(170, 250, 112, 26)}
    ${ellArrow(170, 250, 112, 26, 2.5)}
    ${ellArrow(170, 250, 112, 26, 0.65)}
    ${ellArrow(170, 250, 112, 26, -0.55)}
    ${ellArrow(170, 250, 112, 26, -2.55)}

    <text x="186" y="58" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CURRENT_TXT}">current</text>
    <text x="186" y="74" font-family="${FONT}" font-size="12" fill="${MUTED}">(conventional)</text>
    <text x="262" y="126" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}">field</text>

    <text x="300" y="176" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Use your RIGHT hand</text>
    ${lead(186, 168, 296, 196)}
    <text x="300" y="200" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CURRENT_TXT}">thumb: the current</text>
    ${lead(210, 278, 296, 296)}
    <text x="300" y="300" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}">fingers: the field</text>

    <text x="240" y="374" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Seen from above, the field lines run anticlockwise.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · One turn of wire, seen edge-on: the loop cuts the page at the top and
//     the bottom. Top: current OUT of the page, so its circles run
//     anticlockwise; bottom: current INTO the page, so clockwise. Inside the
//     loop (between the two) both sets of circles point RIGHT, so their fields
//     add: the field inside runs left → right and leaves by the right-hand
//     face, which is the N face. The left-hand face is S.
// ───────────────────────────────────────────────────────────────────────────
const COIL_FIELD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" class="w-full h-full">
    ${plate(520, 340)}
    <text x="24" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">One turn of wire, seen edge-on</text>

    <path d="M 200 150 L 296 150 C 356 150 356 54 200 54 C 44 54 44 150 104 150 Z" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    <path d="M 200 190 L 296 190 C 356 190 356 286 200 286 C 44 286 44 190 104 190 Z" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    <circle cx="200" cy="110" r="24" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    <circle cx="200" cy="230" r="24" fill="none" stroke="${FIELD}" stroke-width="2.2"/>
    <line x1="24" y1="170" x2="370" y2="170" stroke="${FIELD}" stroke-width="2.2"/>
    <line x1="200" y1="122" x2="200" y2="218" stroke="${COPPER_BACK}" stroke-width="2" stroke-dasharray="5 4"/>

    ${arrowAt(200, 86, 180, FIELD, 9)}
    ${arrowAt(200, 134, 0, FIELD, 9)}
    ${arrowAt(200, 206, 0, FIELD, 9)}
    ${arrowAt(200, 254, 180, FIELD, 9)}
    ${arrowAt(200, 54, 180, FIELD, 10)}
    ${arrowAt(254, 150, 0, FIELD, 10)}
    ${arrowAt(254, 190, 0, FIELD, 10)}
    ${arrowAt(200, 286, 180, FIELD, 10)}
    ${arrowAt(84, 170, 0, FIELD, 10)}
    ${arrowAt(316, 170, 0, FIELD, 10)}

    ${wireOut(200, 110)}
    ${wireIn(200, 230)}
    ${badge(150, 170, S_COL)}
    <text x="150" y="175" font-family="${FONT}" font-size="14" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    ${badge(250, 170, N_COL)}
    <text x="250" y="175" font-family="${FONT}" font-size="14" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>

    ${wireOut(396, 92, 7)}
    <text x="410" y="96" font-family="${FONT}" font-size="12" fill="${CURRENT_TXT}">out of the page</text>
    <text x="410" y="112" font-family="${FONT}" font-size="12" fill="${MUTED}">(towards you)</text>
    <text x="384" y="166" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}">field inside:</text>
    <text x="384" y="182" font-family="${FONT}" font-size="12" fill="${MUTED}">every part adds</text>
    ${wireIn(396, 222, 7)}
    <text x="410" y="226" font-family="${FONT}" font-size="12" fill="${CURRENT_TXT}">into the page</text>
    <text x="410" y="242" font-family="${FONT}" font-size="12" fill="${MUTED}">(away from you)</text>

    <text x="260" y="324" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Field lines leave the N face and go back in at the S face.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · A solenoid's field. The battery's + is on the LEFT, so the current goes
//     in at the left end and UP the front of every turn (arrows): fingers up
//     the front, thumb left — the left end is N. Outside, the lines leave the
//     N end and loop round to the S end (arrows point right along the top and
//     bottom loops); inside they run from S back to N (arrows left).
// ───────────────────────────────────────────────────────────────────────────
const [SF_BACK, SF_FRONT] = coil(150, 350, 160, 36, 8)
const SOLENOID_FIELD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 380" class="w-full h-full">
    ${plate(500, 380)}
    <text x="24" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">The field of a solenoid</text>

    ${SF_BACK}
    <path d="M 372 136 L 128 136 C 60 136 50 50 150 50 L 350 50 C 450 50 440 136 372 136" fill="none" stroke="${FIELD}" stroke-width="2"/>
    <path d="M 372 148 L 128 148 C 92 148 96 92 150 92 L 350 92 C 404 92 408 148 372 148" fill="none" stroke="${FIELD}" stroke-width="2"/>
    <line x1="18" y1="160" x2="482" y2="160" stroke="${FIELD}" stroke-width="2"/>
    <path d="M 372 172 L 128 172 C 92 172 96 228 150 228 L 350 228 C 404 228 408 172 372 172" fill="none" stroke="${FIELD}" stroke-width="2"/>
    <path d="M 372 184 L 128 184 C 60 184 50 270 150 270 L 350 270 C 450 270 440 184 372 184" fill="none" stroke="${FIELD}" stroke-width="2"/>
    ${arrowAt(237, 160, 180, FIELD, 9)}
    ${SF_FRONT}
    ${coilArrows(150, 350, 160, 36, 8, true)}

    ${arrowAt(250, 50, 0, FIELD, 10)}
    ${arrowAt(250, 92, 0, FIELD, 10)}
    ${arrowAt(250, 228, 0, FIELD, 10)}
    ${arrowAt(250, 270, 0, FIELD, 10)}
    ${arrowAt(40, 160, 180, FIELD, 10)}
    ${arrowAt(460, 160, 180, FIELD, 10)}

    ${wire('M 150 196 L 150 330 L 245 330')}
    ${wire('M 255 330 L 350 330 L 350 196')}
    ${cell(250, 330, true)}
    ${arrowAt(150, 300, 270, CURRENT, 10)}
    ${arrowAt(200, 330, 180, CURRENT, 10)}
    ${arrowAt(350, 300, 90, CURRENT, 10)}
    ${arrowAt(300, 330, 180, CURRENT, 10)}
    <text x="236" y="314" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="266" y="314" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>

    ${badge(108, 160, N_COL, 10)}
    <text x="108" y="165" font-family="${FONT}" font-size="13" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    ${badge(392, 160, S_COL, 10)}
    <text x="392" y="165" font-family="${FONT}" font-size="13" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="250" y="116" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">solenoid</text>

    <text x="250" y="366" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Outside: from N round to S. Inside: from S to N.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · The grip rule for a coil: the same coil and battery as SOLENOID_FIELD
//     (+ on the left, current up the front of the turns). A right fist grips
//     the middle of the coil with its fingers going round the way the current
//     does; the thumb lies along the coil pointing LEFT, at the N pole. The
//     blue arrow is the field leaving the N end, the way the thumb points.
// ───────────────────────────────────────────────────────────────────────────
const [GC_BACK, GC_FRONT] = coil(170, 370, 150, 40, 8)
const GRIP_RULE_COIL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" class="w-full h-full">
    ${plate(500, 350)}
    <text x="24" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">The grip rule for a coil</text>

    ${GC_BACK}
    <line x1="170" y1="150" x2="370" y2="150" stroke="${FIELD}" stroke-width="2"/>
    ${GC_FRONT}
    ${coilArrows(170, 370, 150, 40, 8, true)}
    <line x1="134" y1="150" x2="72" y2="150" stroke="${FIELD}" stroke-width="7" stroke-linecap="round"/>
    ${arrowAt(62, 150, 180, FIELD, 22)}

    <path d="M 248 100 Q 238 100 238 110 L 238 190 Q 238 200 248 200 L 292 200 Q 302 200 302 190 L 302 110 Q 302 100 292 100 Z" fill="${SKIN}" stroke="${SKIN_LINE}" stroke-width="2"/>
    <path d="M 254 103 L 254 197 M 270 103 L 270 197 M 286 103 L 286 197" fill="none" stroke="${SKIN_LINE}" stroke-width="1.6"/>
    <path d="M 250 104 L 198 104 Q 186 104 186 92 Q 186 80 198 80 L 250 80 Z" fill="${SKIN}" stroke="${SKIN_LINE}" stroke-width="2"/>
    <path d="M 202 85 Q 191 85 191 92 Q 191 99 202 99 Z" fill="#fbeee2" stroke="${SKIN_LINE}" stroke-width="1"/>

    ${wire('M 170 190 L 170 300 L 265 300')}
    ${wire('M 275 300 L 370 300 L 370 190')}
    ${cell(270, 300, true)}
    ${arrowAt(170, 250, 270, CURRENT, 10)}
    ${arrowAt(220, 300, 180, CURRENT, 10)}
    ${arrowAt(370, 250, 90, CURRENT, 10)}
    ${arrowAt(320, 300, 180, CURRENT, 10)}
    <text x="256" y="284" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="286" y="284" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>

    ${badge(148, 150, N_COL, 11)}
    <text x="148" y="155" font-family="${FONT}" font-size="13" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    ${badge(394, 150, S_COL, 11)}
    <text x="394" y="155" font-family="${FONT}" font-size="13" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>

    ${lead(190, 88, 150, 74)}
    <text x="24" y="70" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}">thumb points to the N pole</text>
    ${lead(298, 104, 326, 76)}
    <text x="310" y="70" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CURRENT_TXT}">fingers follow the current</text>

    <text x="250" y="336" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Fingers round the turns with the current; thumb to N.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · The hotspot question: the same coil with the battery turned round
//     (+ on the RIGHT) and NO pole labels. The current goes in at the right
//     end and DOWN the front of every turn (arrows). Fingers down the front
//     and up the back is anticlockwise seen from the right-hand end, and the
//     thumb points RIGHT: the N pole is the RIGHT-HAND end (x ≈ 410). The two
//     ends are 300 units apart. The + and − are class="keep", so the hotspot
//     (which strips printed labels) still shows which way the battery faces.
// ───────────────────────────────────────────────────────────────────────────
const [SQ_BACK, SQ_FRONT] = coil(110, 410, 120, 44, 10)
const SOLENOID_POLES_Q = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
    ${plate(520, 300)}
    <text x="260" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Which end is the N pole?</text>
    <text x="110" y="60" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">left-hand end</text>
    <text x="410" y="60" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">right-hand end</text>

    ${SQ_BACK}
    ${SQ_FRONT}
    ${coilArrows(110, 410, 120, 44, 10, false, 10)}

    ${wire('M 110 164 L 110 250 L 255 250')}
    ${wire('M 265 250 L 410 250 L 410 164')}
    ${cell(260, 250, false)}
    ${arrowAt(340, 250, 0, CURRENT, 11)}
    ${arrowAt(410, 210, 270, CURRENT, 11)}
    ${arrowAt(110, 210, 90, CURRENT, 11)}
    ${arrowAt(180, 250, 0, CURRENT, 11)}
    <text class="keep" x="278" y="236" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text class="keep" x="242" y="236" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="260" y="284" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">battery</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 7 · Making a magnet. Top: a steel bar inside a solenoid on a d.c. supply,
//     + on the LEFT, so the current goes in at the left end and up the front
//     of the turns — the left end is N. Bottom: switched off, the steel stays
//     magnetised, N at the left end, S at the right.
// ───────────────────────────────────────────────────────────────────────────
const [MM_BACK, MM_FRONT] = coil(130, 350, 104, 34, 8)
const MAKE_MAGNET_SOLENOID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 384" class="w-full h-full">
    ${plate(480, 384)}
    <text x="24" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">1 · Switched on: direct current</text>

    ${MM_BACK}
    <rect x="104" y="92" width="272" height="24" rx="3" fill="${STEEL_FILL}" stroke="${STEEL}" stroke-width="2"/>
    ${MM_FRONT}
    ${coilArrows(130, 350, 104, 34, 8, true)}
    <text x="386" y="109" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">steel bar</text>

    ${wire('M 130 138 L 130 186 L 235 186')}
    ${wire('M 245 186 L 350 186 L 350 138')}
    ${cell(240, 186, true)}
    ${arrowAt(130, 164, 270, CURRENT, 10)}
    ${arrowAt(350, 164, 90, CURRENT, 10)}
    <text x="227" y="170" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="255" y="170" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="240" y="214" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CURRENT_TXT}" text-anchor="middle">d.c.: the current flows one way only</text>

    <path d="M 24 232 L 456 232" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="24" y="262" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">2 · Switched off</text>
    <rect x="104" y="284" width="136" height="34" fill="${N_COL}"/>
    <rect x="240" y="284" width="136" height="34" fill="${S_COL}"/>
    <text x="172" y="307" font-family="${FONT}" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <text x="308" y="307" font-family="${FONT}" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>
    <text x="240" y="348" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">The steel stays magnetised.</text>
    <text x="240" y="368" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">It is now a permanent magnet.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 8 · A simple electromagnet: a coil of insulated copper wire on a soft iron
//     core, with a battery and a closed switch. Two iron nails hang in a chain
//     from the end of the core (the second is held by the magnetism induced
//     in the first). No poles are labelled: the point is the core.
// ───────────────────────────────────────────────────────────────────────────
const [EM_BACK, EM_FRONT] = coil(120, 320, 126, 28, 14)
const ELECTROMAGNET = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 350" class="w-full h-full">
    ${plate(480, 350)}
    <text x="24" y="28" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">A simple electromagnet</text>

    ${EM_BACK}
    <rect x="90" y="110" width="270" height="32" rx="3" fill="${IRON_FILL}" stroke="${IRON}" stroke-width="2"/>
    ${EM_FRONT}

    <path d="M 345 146 L 361 146 L 361 151 L 356 151 L 356 192 L 353 202 L 350 192 L 350 151 L 345 151 Z" fill="${IRON_FILL}" stroke="${STEEL}" stroke-width="1.5"/>
    <path d="M 346 206 L 362 207 L 362 212 L 357 212 L 357 252 L 353 262 L 351 252 L 351 211 L 346 211 Z" fill="${IRON_FILL}" stroke="${STEEL}" stroke-width="1.5"/>

    ${wire('M 120 154 L 120 262 L 175 262')}
    ${wire('M 185 262 L 250 262')}
    ${wire('M 290 262 L 320 262 L 320 154')}
    <line x1="250" y1="262" x2="290" y2="262" stroke="${METAL}" stroke-width="3"/>
    <circle cx="250" cy="262" r="4" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="290" cy="262" r="4" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    ${cell(180, 262, true)}
    ${arrowAt(120, 210, 270, CURRENT, 10)}
    ${arrowAt(320, 210, 90, CURRENT, 10)}
    ${arrowAt(222, 262, 180, CURRENT, 10)}
    <text x="167" y="246" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="195" y="246" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="180" y="294" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">battery</text>
    <text x="270" y="294" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">switch</text>

    ${lead(102, 120, 70, 82)}
    <text x="24" y="76" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">core: soft iron or Mumetal</text>
    ${lead(252, 98, 262, 82)}
    <text x="232" y="76" font-family="${FONT}" font-size="12" font-weight="bold" fill="${COPPER}">coil: insulated copper wire</text>
    ${lead(358, 226, 374, 222)}
    <text x="378" y="226" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">iron nails</text>

    <text x="240" y="330" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">Switch off: the core loses its magnetism, and the nails drop.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 9 · The magnetic relay (book page 204, redrawn): the input circuit
//     (battery, switch S, the coil on an iron core) on the left; a pivoted
//     L-shaped iron armature above the core; contacts C; the output circuit
//     (power supply for the motor, the motor) on the right. Drawn OFF: S open,
//     contacts C apart. Close S and the core pulls the armature's top arm
//     down; it turns about the pivot, its lower end swings right and pushes
//     the springy contact across to close C.
//     The coil is wound on an upright core, so it is drawn here as slanted
//     turns: 11 front strands from y = 130, pitch 10, leads at the left side.
// ───────────────────────────────────────────────────────────────────────────
let RL_BACK = '', RL_FRONT = ''
for (let k = 0; k < 11; k++) {
  const y = 130 + k * 10
  RL_FRONT += `<line x1="216" y1="${y + 7.5}" x2="256" y2="${y + 2.5}" stroke="${COPPER}" stroke-width="3" stroke-linecap="round"/>`
  RL_BACK += `<line x1="256" y1="${y + 2.5}" x2="216" y2="${y + 17.5}" stroke="${COPPER_BACK}" stroke-width="2" stroke-linecap="round"/>`
}
const RELAY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 352" class="w-full h-full">
    ${plate(560, 352)}
    <path d="M 208 84 L 360 84 L 360 292 L 208 292 Z" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="6 5"/>

    ${RL_BACK}
    <rect x="222" y="124" width="28" height="142" rx="2" fill="${IRON_FILL}" stroke="${IRON}" stroke-width="2"/>
    ${RL_FRONT}
    <path d="M 228 100 L 296 100 L 296 200 L 288 200 L 288 108 L 228 108 Z" fill="${IRON_FILL}" stroke="${IRON}" stroke-width="1.8"/>
    <circle cx="292" cy="104" r="3.5" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>
    <path d="M 296 186 L 305 186 L 305 196 L 296 196 Z" fill="#f8fafc" stroke="${INK}" stroke-width="1.2"/>

    ${wire('M 216 137.5 L 196 137.5 L 196 62 L 123 62')}
    ${wire('M 113 62 L 40 62 L 40 206')}
    ${wire('M 40 240 L 40 318 L 196 318 L 196 247.5 L 216 247.5')}
    ${cell(118, 62, true)}
    <line x1="40" y1="240" x2="60" y2="212" stroke="${METAL}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="40" cy="206" r="4" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="40" cy="240" r="4" fill="#ffffff" stroke="${INK}" stroke-width="2"/>

    ${wire('M 318 318 L 318 262')}
    <line x1="318" y1="262" x2="318" y2="156" stroke="${METAL}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 320 164 L 327 164 L 327 176 L 320 176 Z" fill="${METAL}"/>
    <line x1="348" y1="110" x2="348" y2="184" stroke="${METAL}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 339 164 L 346 164 L 346 176 L 339 176 Z" fill="${METAL}"/>
    ${wire('M 348 110 L 348 62 L 414 62')}
    ${wire('M 452 62 L 520 62 L 520 168')}
    ${wire('M 520 212 L 520 318 L 318 318')}
    <circle cx="418" cy="62" r="4" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="448" cy="62" r="4" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="520" cy="190" r="22" fill="#f1f5f9" stroke="${INK}" stroke-width="2.5"/>
    <text x="520" y="196" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>

    <text x="118" y="40" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">battery</text>
    <text x="56" y="232" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">switch S</text>
    <text x="202" y="196" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">electromagnet</text>
    ${lead(262, 100, 262, 80)}
    <text x="232" y="74" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">iron armature</text>
    ${lead(336, 180, 364, 214)}
    <text x="368" y="222" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">contacts C</text>
    <text x="433" y="86" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">power supply</text>
    <text x="433" y="102" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="middle">for motor</text>
    <text x="490" y="194" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="end">electric motor</text>

    <text x="284" y="310" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">relay</text>
    <text x="118" y="342" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">input circuit</text>
    <text x="430" y="342" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">output circuit</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 10 · The circuit breaker (book page 205, drawn fresh as a side view). The
//      current comes in at the arm's pivot, runs along the arm, through the
//      closed contacts, down the post and through the electromagnet's coil,
//      then out. The spring pulls the arm UP (to open the contacts); the iron
//      catch hooks over the arm's tip and holds it down; a small spring holds
//      the catch in place. Too much current: the electromagnet pulls the catch
//      to the right, its hook slides off the tip, the spring snaps the
//      contacts open. The reset button pushes the arm back down.
// ───────────────────────────────────────────────────────────────────────────
const [CB_BACK, CB_FRONT] = coil(396, 462, 188, 18, 6)
const CIRCUIT_BREAKER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" class="w-full h-full">
    ${plate(520, 340)}

    ${wire('M 20 150 L 104 150')}
    ${arrowAt(60, 150, 0, CURRENT, 11)}
    <path d="M 110 156 L 100 172 L 120 172 Z" fill="${IRON_FILL}" stroke="${MUTED}" stroke-width="1.5"/>
    <path d="M 110 147 L 342 147 L 342 153 L 110 153 Z" fill="${METAL}"/>
    <circle cx="110" cy="150" r="6" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <path d="M 282 153 L 298 153 L 298 160 L 282 160 Z" fill="#334155"/>
    <path d="M 282 160 L 298 160 L 298 167 L 282 167 Z" fill="#94a3b8" stroke="#334155" stroke-width="1"/>
    ${wire('M 290 167 L 290 284 L 396 284 L 396 206')}
    ${arrowAt(290, 236, 90, CURRENT, 11)}
    ${arrowAt(340, 284, 0, CURRENT, 11)}

    <path d="M 186 92 L 214 92" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    ${spring(200, 96, 200, 147, 6, 7)}
    <path d="M 234 28 L 266 28 Q 270 28 270 32 L 270 44 L 230 44 L 230 32 Q 230 28 234 28 Z" fill="${STEEL_FILL}" stroke="${INK}" stroke-width="1.5"/>
    <line x1="250" y1="44" x2="250" y2="144" stroke="${MUTED}" stroke-width="3"/>

    <path d="M 334 140 L 374 140 L 374 240 L 366 240 L 366 146 L 334 146 Z" fill="${IRON_FILL}" stroke="${IRON}" stroke-width="1.8"/>
    <path d="M 370 245 L 361 258 L 379 258 Z" fill="${IRON_FILL}" stroke="${MUTED}" stroke-width="1.5"/>
    <circle cx="370" cy="240" r="4.5" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
    ${spring(336, 214, 366, 214, 4, 5)}
    <path d="M 336 202 L 336 226" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>

    ${CB_BACK}
    <rect x="388" y="176" width="86" height="24" rx="2" fill="${IRON_FILL}" stroke="${IRON}" stroke-width="2"/>
    ${CB_FRONT}
    ${wire('M 462 206 L 462 284 L 500 284')}
    ${arrowAt(486, 284, 0, CURRENT, 11)}

    <text x="24" y="136" font-family="${FONT}" font-size="12" fill="${MUTED}">current in</text>
    <text x="188" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="end">spring</text>
    <text x="278" y="40" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">reset button</text>
    ${lead(282, 164, 272, 190)}
    <text x="270" y="200" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="end">contacts</text>
    <text x="384" y="130" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">iron catch</text>
    <text x="431" y="160" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">electromagnet</text>
    <text x="504" y="306" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="end">current out</text>

    <text x="24" y="330" font-family="${FONT}" font-size="12" fill="${INK}">The current flows through the contacts and the electromagnet.</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 11 · Recording on magnetic tape (book page 205, drawn fresh). The tape moves
//      RIGHT (green: motion) under a horseshoe-shaped electromagnet, the
//      recording head. Its current is varied by the sound, so the tape that
//      has passed under it (to its right) carries a row of little magnets of
//      varying length: like poles meet, N to N and S to S. To its left, the
//      iron oxide coating is not yet recorded.
// ───────────────────────────────────────────────────────────────────────────
const TAPE_BANDS = [[200, 232, 1], [232, 268, 0], [268, 290, 1], [290, 334, 0], [334, 358, 1], [358, 404, 0], [404, 430, 1], [430, 478, 0], [478, 500, 1]]
  .map(([a, b, ns]) => {
    const m = (a + b) / 2
    const left = ns ? N_COL : S_COL, right = ns ? S_COL : N_COL
    return `<path d="M ${a} 206 L ${m} 206 L ${m} 214 L ${a} 214 Z" fill="${left}"/><path d="M ${m} 206 L ${b} 206 L ${b} 214 L ${m} 214 Z" fill="${right}"/>`
  }).join('')
const RECORDING_HEAD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
    ${plate(520, 300)}
    <text x="24" y="26" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Recording on magnetic tape</text>

    ${wire('M 146 98 L 146 62')}
    ${wire('M 178 98 L 178 62')}
    <circle cx="146" cy="60" r="3.5" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="178" cy="60" r="3.5" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <path d="M 120 206 L 120 124 Q 120 104 140 104 L 180 104 Q 200 104 200 124 L 200 206 L 186 206 L 186 128 Q 186 118 176 118 L 144 118 Q 134 118 134 128 L 134 206 Z" fill="${IRON_FILL}" stroke="${IRON}" stroke-width="2"/>
    <ellipse cx="146" cy="111" rx="3.5" ry="13" fill="none" stroke="${COPPER}" stroke-width="2.2"/>
    <ellipse cx="154" cy="111" rx="3.5" ry="13" fill="none" stroke="${COPPER}" stroke-width="2.2"/>
    <ellipse cx="162" cy="111" rx="3.5" ry="13" fill="none" stroke="${COPPER}" stroke-width="2.2"/>
    <ellipse cx="170" cy="111" rx="3.5" ry="13" fill="none" stroke="${COPPER}" stroke-width="2.2"/>
    <ellipse cx="178" cy="111" rx="3.5" ry="13" fill="none" stroke="${COPPER}" stroke-width="2.2"/>
    <path d="M 246 40 q 6 -12 12 0 t 12 0 t 12 0 t 12 0 t 12 0" fill="none" stroke="${CURRENT}" stroke-width="2.5"/>
    <text x="236" y="44" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CURRENT_TXT}" text-anchor="end">current varied by sound</text>

    <path d="M 20 214 L 500 214 L 500 222 L 20 222 Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.2"/>
    <path d="M 20 206 L 200 206 L 200 214 L 20 214 Z" fill="#7c2d12"/>
    ${TAPE_BANDS}

    ${lead(200, 150, 216, 130)}
    <text x="220" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">recording head:</text>
    <text x="220" y="140" font-family="${FONT}" font-size="12" fill="${MUTED}">a tiny electromagnet</text>
    <text x="350" y="194" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">varying magnetism along the tape</text>
    <text x="24" y="196" font-family="${FONT}" font-size="11" fill="${MUTED}">not yet recorded</text>
    ${lead(60, 212, 60, 234)}
    <text x="24" y="248" font-family="${FONT}" font-size="12" fill="${MUTED}">tape coated with iron oxide</text>

    <line x1="384" y1="252" x2="446" y2="252" stroke="${MOTION}" stroke-width="3"/>
    ${arrowAt(452, 252, 0, MOTION, 14)}
    <text x="374" y="256" font-family="${FONT}" font-size="12" font-weight="bold" fill="${MOTION}" text-anchor="end">tape moves</text>

    <text x="260" y="288" font-family="${FONT}" font-size="12" fill="${INK}" text-anchor="middle">The sound varies the current, so the field of the head varies.</text>
  </svg>`

export const DIAGRAMS = {
  WIRE_FIELD: WIRE_FIELD,
  GRIP_RULE_WIRE: GRIP_RULE_WIRE,
  COIL_FIELD: COIL_FIELD,
  SOLENOID_FIELD: SOLENOID_FIELD,
  GRIP_RULE_COIL: GRIP_RULE_COIL,
  SOLENOID_POLES_Q: SOLENOID_POLES_Q,
  MAKE_MAGNET_SOLENOID: MAKE_MAGNET_SOLENOID,
  ELECTROMAGNET: ELECTROMAGNET,
  RELAY: RELAY,
  CIRCUIT_BREAKER: CIRCUIT_BREAKER,
  RECORDING_HEAD: RECORDING_HEAD,
}
