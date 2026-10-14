// src/data/OLEVEL_PHYS/C09_3/diagrams.js
// Teaching diagrams for C09_3 Motors and Electromagnetic Induction — book
// spreads 9.5 "Magnetic force on a current", 9.6 "Electric motors" and 9.7
// "Electromagnetic induction". All AUTHORED, nothing taken from the book: the
// magnets, wires, coils, motors and meters are drawn here so the labels are
// real <text> the SVG audit can measure, and there is no licence to carry.
//
// Colour means something on this track (docs/olevel-phys/AUTHORING-BRIEF.md):
//   N pole                              red     #c8102e  (pale #fde2e4)
//   S pole                              blue    #1a5fa8  (pale #dbeafe)
//   field lines · the First finger      blue    #3b82f6
//   conventional current · seCond       amber   #f59e0b  (#b45309 for text)
//   force and motion · the thuMb        green   #059669
//   iron                                grey    #94a3b8 on #e2e8f0
//   steel                               grey    #64748b on #cbd5e1
//   copper wire and coils               brown   #b45309
//   plain circuit wires                 ink     #1e293b
// The three Fleming colours (field blue, current amber, force green) are used
// for nothing else.
//
// EVERY FORCE ARROW IS DERIVED, NOT GUESSED. Fleming's left-hand rule (First
// finger Field N → S, seCond finger Current + → −, thuMb Motion) is the same
// as the vector rule F = I × B. With x to the right, y up the page and z out
// of the page (towards you):
//   z × x = +y   current towards you (⊙), field to the right → force UP
//   (−z) × x = −y   current away from you (⊗), field to the right → force DOWN
//   y × (−z) = −x   current up the page, field into the page (×) → force LEFT
//   y × z = +x      current up the page, field out of the page (•) → force RIGHT
// Reversing the field OR the current reverses the force; reversing both does
// not. The working for each drawing is written above it.
//
// House rules (so `npm run audit:svg OLEVEL_PHYS` stays green):
//  · every diagram opens with a white plate, legible on a light OR dark slide;
//  · label <text> is written out literally (not interpolated) so the audit can
//    measure it — the helpers below draw shapes only;
//  · symbols are Unicode (⊙, ⊗, ×, →, −), never <tspan>;
//  · arrowheads are small filled triangles (arrowAt), not SVG markers, so there
//    are no ids, clip paths or gradients to collide with other units.

const INK = '#1e293b'
const MUTED = '#64748b'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const N_COL = '#c8102e', N_F = '#fde2e4'     // N pole
const S_COL = '#1a5fa8', S_F = '#dbeafe'     // S pole
const FIELD = '#3b82f6'                      // field lines, the First finger
const CURR = '#f59e0b', CURR_T = '#b45309'   // conventional current, the seCond finger
const FORCE = '#059669'                      // force and motion, the thuMb
const IRON = '#94a3b8', IRON_F = '#e2e8f0'   // soft iron
const STEEL = '#64748b', STEEL_F = '#cbd5e1' // steel (magnet bodies, axles)
const COPPER = '#b45309'                     // copper wire and coils
const CARBON = '#475569'                     // carbon brushes
const PAPER = '#78716c'                      // the loudspeaker cone and former

const f = (n) => Number(n).toFixed(1)

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A filled arrowhead with its tip at (x, y), pointing `deg` (0 = right, 90 = down). */
const arrowAt = (x, y, deg, col, s = 1) => {
  const a = (deg * Math.PI) / 180
  const c = Math.cos(a), n = Math.sin(a)
  const bx = x - 9 * s * c, by = y - 9 * s * n, w = 4.5 * s
  return `<path d="M ${f(x)} ${f(y)} L ${f(bx - w * n)} ${f(by + w * c)} L ${f(bx + w * n)} ${f(by - w * c)} Z" fill="${col}"/>`
}

/** A straight arrow from (x1, y1) to its tip at (x2, y2); the head scales with the width. */
const arrow = (x1, y1, x2, y2, col, w = 3.5) => {
  const deg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  const a = (deg * Math.PI) / 180, s = w / 2.5
  const ex = x2 - 8 * s * Math.cos(a), ey = y2 - 8 * s * Math.sin(a)
  return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(ex)}" y2="${f(ey)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>` + arrowAt(x2, y2, deg, col, s)
}

/** A double-headed arrow between (x1, y) and (x2, y): motion both ways. */
const arrow2H = (x1, x2, y, col, w = 3.5) => {
  const s = w / 2.5
  return `<line x1="${f(x1 + 8 * s)}" y1="${y}" x2="${f(x2 - 8 * s)}" y2="${y}" stroke="${col}" stroke-width="${w}"/>` +
    arrowAt(x1, y, 180, col, s) + arrowAt(x2, y, 0, col, s)
}

/** A straight field line from x1 to x2 at height y, N → S, with an arrowhead at each x in `heads`. */
const fieldH = (x1, x2, y, heads) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${FIELD}" stroke-width="1.8"/>` +
  heads.map((hx) => arrowAt(hx, y, 0, FIELD)).join('')

/**
 * A field line bowed by a wire's own field: it leaves the N face at (x1, y),
 * reaches the S face at (x2, y), and passes the middle at height yMid. A
 * symmetric cubic passes its midpoint at (2y + 6c) / 8, so the control height
 * c is solved for; the tangent there is level, so the arrowhead sits flat.
 */
const bowed = (x1, x2, y, yMid) => {
  const c = (8 * yMid - 2 * y) / 6
  const k1 = x1 + (x2 - x1) * 0.3, k2 = x1 + (x2 - x1) * 0.7
  return `<path d="M ${x1} ${y} C ${f(k1)} ${f(c)} ${f(k2)} ${f(c)} ${x2} ${y}" fill="none" stroke="${FIELD}" stroke-width="1.8"/>` +
    arrowAt((x1 + x2) / 2 + 5, yMid, 0, FIELD)
}

/** A copper wire seen end-on, with no current marked. */
const wireEnd = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fde7c8" stroke="${COPPER}" stroke-width="2.5"/>`

/** A wire seen end-on carrying current OUT of the page, towards you: ⊙. */
const wireOut = (cx, cy, r = 13) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r}" fill="#fffbeb" stroke="${COPPER}" stroke-width="2.5"/>
    <circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * 0.32)}" fill="${CURR}" stroke="${CURR_T}" stroke-width="1"/>`

/** A wire seen end-on carrying current INTO the page, away from you: ⊗. */
const wireIn = (cx, cy, r = 13) => {
  const d = r * 0.5
  return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r}" fill="#fffbeb" stroke="${COPPER}" stroke-width="2.5"/>
    <path d="M ${f(cx - d)} ${f(cy - d)} L ${f(cx + d)} ${f(cy + d)} M ${f(cx + d)} ${f(cy - d)} L ${f(cx - d)} ${f(cy + d)}" stroke="${CURR}" stroke-width="3" stroke-linecap="round"/>`
}

/** A field arrow seen head-on or tail-on: × means the field points into the page. */
const crosses = (xs, ys) => xs.flatMap((x) => ys.map((y) => `<path d="M ${x - 5} ${y - 5} L ${x + 5} ${y + 5} M ${x + 5} ${y - 5} L ${x - 5} ${y + 5}" stroke="${FIELD}" stroke-width="2" stroke-linecap="round"/>`)).join('')

/**
 * A centre-zero galvanometer: dial centred (cx, cy) of radius r, needle `deg`
 * from upright (+ = to the right of zero). The "0" is written by the diagram.
 */
const galvo = (cx, cy, r, deg) => {
  const py = cy + 0.4 * r, R = 0.85 * r, L = 0.8 * r
  const rad = (d) => (d * Math.PI) / 180
  const ticks = [-40, -20, 0, 20, 40].map((t) => `<line x1="${f(cx + (R - 5) * Math.sin(rad(t)))}" y1="${f(py - (R - 5) * Math.cos(rad(t)))}" x2="${f(cx + R * Math.sin(rad(t)))}" y2="${f(py - R * Math.cos(rad(t)))}" stroke="${MUTED}" stroke-width="1.3"/>`).join('')
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <path d="M ${f(cx - R * Math.sin(rad(55)))} ${f(py - R * Math.cos(rad(55)))} A ${f(R)} ${f(R)} 0 0 1 ${f(cx + R * Math.sin(rad(55)))} ${f(py - R * Math.cos(rad(55)))}" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
    ${ticks}
    <line x1="${cx}" y1="${f(py)}" x2="${f(cx + L * Math.sin(rad(deg)))}" y2="${f(py - L * Math.cos(rad(deg)))}" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${f(py)}" r="3" fill="${INK}"/>`
}

/**
 * A cell on a horizontal wire at (x, y): the short, thick − plate at x − 5 and
 * the long, thin + plate at x + 5. Conventional current leaves the + plate.
 */
const cellH = (x, y) => `<line x1="${x - 5}" y1="${y - 7}" x2="${x - 5}" y2="${y + 7}" stroke="${INK}" stroke-width="4"/>
    <line x1="${x + 5}" y1="${y - 13}" x2="${x + 5}" y2="${y + 13}" stroke="${INK}" stroke-width="2"/>`

/** A leader line from a part out to its label, with a dot on the part. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="2.2" fill="${MUTED}"/>`

/** One half of a split-ring commutator: an arc of the ring from angle t1 to t2 (degrees, clockwise on screen). */
const ringSeg = (cx, cy, r, t1, t2, col) => {
  const p = (t) => [cx + r * Math.cos((t * Math.PI) / 180), cy + r * Math.sin((t * Math.PI) / 180)]
  const [x1, y1] = p(t1), [x2, y2] = p(t2)
  return `<path d="M ${f(x1)} ${f(y1)} A ${r} ${r} 0 0 1 ${f(x2)} ${f(y2)}" fill="none" stroke="${col}" stroke-width="6"/>`
}

// ───────────────────────────────────────────────────────────────────────────
// 1 · WIRE_IN_FIELD — the book's copper wire in a U-shaped magnet (page 206),
//     redrawn as a FRONT view so the wire is seen end-on.
//     Field: N pole on the left, S on the right, so the field runs left → right.
//     Current: out of the page, towards you (⊙). Left hand: First finger to
//     the right, seCond finger towards you, thuMb UP. F = I × B: z × x = +y.
//     → force UP, matching the book's "upward force".
//     Circuit: current flows along the wire from its BACK end to its FRONT
//     end, so the back lead (dashed, hidden behind the magnet) runs to the +
//     plate and the front lead (solid) to the − plate.
// ───────────────────────────────────────────────────────────────────────────
const WIRE_IN_FIELD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 370" class="w-full h-full">
    ${plate(460, 370)}
    <rect x="40" y="70" width="90" height="176" fill="${N_F}" stroke="${N_COL}" stroke-width="2.5"/>
    <rect x="330" y="70" width="90" height="176" fill="${S_F}" stroke="${S_COL}" stroke-width="2.5"/>
    <rect x="40" y="246" width="380" height="40" rx="6" fill="${STEEL_F}" stroke="${STEEL}" stroke-width="2"/>
    <text x="85" y="166" font-family="${FONT}" font-size="30" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="375" y="166" font-family="${FONT}" font-size="30" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="110" y="271" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">U-shaped magnet</text>

    ${fieldH(130, 330, 95, [182, 300])}
    ${fieldH(130, 330, 125, [182, 300])}
    ${fieldH(130, 330, 155, [182, 300])}
    ${fieldH(130, 330, 185, [182, 300])}
    ${fieldH(130, 330, 215, [182, 300])}
    <text x="140" y="84" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}">field N → S</text>

    <path d="M 236 168 L 272 304 L 272 322 L 235 322" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4"/>
    <path d="M 224 168 L 188 304 L 188 322 L 225 322" fill="none" stroke="${INK}" stroke-width="2"/>
    ${cellH(230, 322)}
    ${arrowAt(212, 322, 0, CURR, 1.2)}
    ${arrowAt(262, 322, 0, CURR, 1.2)}
    <text x="220" y="354" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="240" y="354" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="286" y="326" font-family="${FONT}" font-size="11" fill="${MUTED}">battery</text>

    ${wireOut(230, 155, 14)}
    ${arrow(230, 138, 230, 40, FORCE, 5)}
    <text x="244" y="56" font-family="${FONT}" font-size="13" font-weight="bold" fill="${FORCE}">force</text>

    <text x="16" y="26" font-family="${FONT}" font-size="11" font-weight="bold" fill="${CURR_T}">⊙ current out of the page,</text>
    <text x="16" y="42" font-family="${FONT}" font-size="11" font-weight="bold" fill="${CURR_T}">towards you</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 2 · CATAPULT_FIELD — "Field and force" (page 206), drawn as two panels.
//     Panel 1, the two fields apart: the magnet's straight lines run N → S
//     (left → right); the wire carries current OUT of the page, so by the
//     right-hand grip rule (C09_2) its own field circles ANTICLOCKWISE as you
//     look at it. At the bottom of an anticlockwise circle the field points
//     left → right (the same way as the magnet's); at the top it points
//     right → left (against it).
//     Panel 2, combined: below the wire the fields ADD and the lines crowd
//     together; above it they CANCEL and the lines thin out. The lines act
//     like stretched elastic, so the wire is pushed from the crowded side to
//     the thin side → force UP. Cross-check with the rule: z × x = +y, UP. ✔
// ───────────────────────────────────────────────────────────────────────────
const CATAPULT_FIELD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 304" class="w-full h-full">
    ${plate(540, 304)}
    <text x="135" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">1 · the two fields</text>
    <text x="405" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">2 · the combined field</text>
    <line x1="270" y1="14" x2="270" y2="292" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="12" y="40" width="26" height="220" fill="${N_F}" stroke="${N_COL}" stroke-width="2"/>
    <rect x="232" y="40" width="26" height="220" fill="${S_F}" stroke="${S_COL}" stroke-width="2"/>
    <text x="25" y="156" font-family="${FONT}" font-size="16" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="245" y="156" font-family="${FONT}" font-size="16" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    ${fieldH(38, 232, 52, [90, 190])}
    ${fieldH(38, 232, 84, [90, 190])}
    ${fieldH(38, 232, 116, [90, 190])}
    ${fieldH(38, 232, 184, [90, 190])}
    ${fieldH(38, 232, 216, [90, 190])}
    ${fieldH(38, 232, 248, [90, 190])}
    <circle cx="135" cy="150" r="26" fill="none" stroke="${FIELD}" stroke-width="1.8"/>
    ${arrowAt(131, 124, 180, FIELD)}
    ${arrowAt(139, 176, 0, FIELD)}
    ${wireOut(135, 150, 11)}
    <text x="135" y="278" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">above the wire: they oppose</text>
    <text x="135" y="295" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">below the wire: they add</text>

    <rect x="282" y="40" width="26" height="220" fill="${N_F}" stroke="${N_COL}" stroke-width="2"/>
    <rect x="502" y="40" width="26" height="220" fill="${S_F}" stroke="${S_COL}" stroke-width="2"/>
    <text x="295" y="156" font-family="${FONT}" font-size="16" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="515" y="156" font-family="${FONT}" font-size="16" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    ${bowed(308, 502, 52, 40)}
    ${bowed(308, 502, 84, 60)}
    ${bowed(308, 502, 116, 80)}
    ${bowed(308, 502, 150, 176)}
    ${bowed(308, 502, 184, 190)}
    ${bowed(308, 502, 216, 206)}
    ${bowed(308, 502, 248, 242)}
    ${wireOut(405, 150, 12)}
    ${arrow(405, 135, 405, 90, FORCE, 4)}
    <text x="416" y="114" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">force</text>
    <text x="405" y="278" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">crowded below, thin above</text>
    <text x="405" y="295" font-family="${FONT}" font-size="11" font-weight="bold" fill="${FORCE}" text-anchor="middle">so the wire is pushed up</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 3 · FLEMING_LHR — Fleming's left-hand rule as three labelled arrows at right
//     angles (a hand does not draw cleanly at this size). The three arrows are
//     the WIRE_IN_FIELD case, so the drawing is itself a correct example:
//     First finger (Field) to the right, seCond finger (Current) out of the
//     page towards you — drawn as the oblique arrow down-left — and the thuMb
//     (Motion) UP. F = I × B: z × x = +y. ✔
// ───────────────────────────────────────────────────────────────────────────
const FLEMING_LHR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 330" class="w-full h-full">
    ${plate(420, 330)}
    <text x="404" y="30" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="end">LEFT hand</text>
    ${arrow(170, 190, 170, 46, FORCE, 5)}
    ${arrow(170, 190, 356, 190, FIELD, 5)}
    ${arrow(170, 190, 78, 282, CURR, 5)}
    <path d="M 170 170 L 190 170 L 190 190" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
    <circle cx="170" cy="190" r="7" fill="${INK}"/>

    <text x="184" y="56" font-family="${FONT}" font-size="15" font-weight="bold" fill="${FORCE}">thuMb</text>
    <text x="184" y="76" font-family="${FONT}" font-size="13" fill="${FORCE}">Motion (the force)</text>
    <text x="356" y="168" font-family="${FONT}" font-size="15" font-weight="bold" fill="${FIELD}" text-anchor="end">First finger</text>
    <text x="356" y="216" font-family="${FONT}" font-size="13" fill="${FIELD}" text-anchor="end">Field: N → S</text>
    <text x="404" y="252" font-family="${FONT}" font-size="12" fill="${MUTED}" text-anchor="end">all three at right angles</text>
    <text x="100" y="284" font-family="${FONT}" font-size="15" font-weight="bold" fill="${CURR_T}">seCond finger</text>
    <text x="100" y="303" font-family="${FONT}" font-size="13" fill="${CURR_T}">Current: + → −</text>
    <text x="100" y="321" font-family="${FONT}" font-size="11" fill="${MUTED}">here: out of the page, towards you</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 4 · LHR_EXAMPLE — using the rule on a flat drawing. The × marks are the
//     tails of field arrows going INTO the page; the wire runs up the page and
//     the current flows UP it.
//     Left hand: First finger into the page, seCond finger up the page, thuMb
//     points LEFT. F = I × B: y × (−z) = −x. → force LEFT.
//     (A right hand gives "right" — the usual slip.)
//     The deck's check c5 reverses the current: (−y) × (−z) = +x → RIGHT.
//     Source Analysis 1 reverses the FIELD instead: y × z = +x → RIGHT.
// ───────────────────────────────────────────────────────────────────────────
const LHR_EXAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 300" class="w-full h-full">
    ${plate(440, 300)}
    ${crosses([52, 88, 124, 196, 232, 268], [56, 92, 128, 164, 200, 236, 272])}
    <line x1="160" y1="34" x2="160" y2="290" stroke="${COPPER}" stroke-width="5" stroke-linecap="round"/>
    ${arrowAt(160, 96, -90, CURR, 1.5)}
    ${arrowAt(160, 236, -90, CURR, 1.5)}
    <text x="172" y="44" font-family="${FONT}" font-size="11" font-weight="bold" fill="${COPPER}">wire</text>
    ${arrow(152, 146, 40, 146, FORCE, 5)}

    <line x1="292" y1="20" x2="292" y2="280" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="304" y="44" font-family="${FONT}" font-size="13" font-weight="bold" fill="${INK}">Key</text>
    <text x="304" y="68" font-family="${FONT}" font-size="11" font-weight="bold" fill="${FIELD}">× = into the page</text>
    <text x="304" y="86" font-family="${FONT}" font-size="11" fill="${MUTED}">• = out of the page</text>
    ${arrow(336, 120, 304, 120, FORCE, 3.5)}
    <text x="346" y="124" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">force</text>
    ${arrow(318, 168, 318, 142, CURR, 3.5)}
    <text x="346" y="160" font-family="${FONT}" font-size="12" font-weight="bold" fill="${CURR_T}">current</text>
    <text x="304" y="206" font-family="${FONT}" font-size="11" fill="${INK}">field: into the page</text>
    <text x="304" y="224" font-family="${FONT}" font-size="11" fill="${INK}">current: up the page</text>
    <text x="304" y="248" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">force: to the left</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 5 · LOUDSPEAKER — the moving-coil loudspeaker in section (page 207), drawn
//     fresh. A cylindrical magnet: N in the centre, S in the outer ring, so in
//     the gap the field runs outwards from N to S like the spokes of a wheel —
//     UP in the top half of the section, DOWN in the bottom half.
//     Why the whole coil moves one way (not drawn, since the current
//     alternates): where a turn passes the top it carries current out of the
//     page, and at the bottom the same turn carries it into the page. Top:
//     z × y = −x. Bottom: (−z) × (−y) = −x. Both LEFT — the force on every part
//     of the coil is along the axis, so the coil and cone move in and out; it
//     never spins. Reverse the current and both forces reverse together.
// ───────────────────────────────────────────────────────────────────────────
const LOUDSPEAKER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 320" class="w-full h-full">
    ${plate(460, 320)}
    <rect x="300" y="60" width="100" height="44" fill="${S_F}" stroke="${S_COL}" stroke-width="2"/>
    <rect x="300" y="140" width="100" height="40" fill="${N_F}" stroke="${N_COL}" stroke-width="2"/>
    <rect x="300" y="216" width="100" height="44" fill="${S_F}" stroke="${S_COL}" stroke-width="2"/>
    <rect x="400" y="60" width="24" height="200" fill="${STEEL_F}" stroke="${STEEL}" stroke-width="2"/>
    <text x="350" y="89" font-family="${FONT}" font-size="18" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="350" y="167" font-family="${FONT}" font-size="18" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="350" y="245" font-family="${FONT}" font-size="18" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="350" y="46" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">magnet</text>

    ${arrow(378, 138, 378, 107, FIELD, 2)}
    ${arrow(392, 138, 392, 107, FIELD, 2)}
    ${arrow(378, 182, 378, 213, FIELD, 2)}
    ${arrow(392, 182, 392, 213, FIELD, 2)}

    <line x1="240" y1="126" x2="366" y2="126" stroke="${PAPER}" stroke-width="2.5"/>
    <line x1="240" y1="194" x2="366" y2="194" stroke="${PAPER}" stroke-width="2.5"/>
    <circle cx="314" cy="119" r="4.5" fill="${COPPER}"/>
    <circle cx="324" cy="119" r="4.5" fill="${COPPER}"/>
    <circle cx="334" cy="119" r="4.5" fill="${COPPER}"/>
    <circle cx="344" cy="119" r="4.5" fill="${COPPER}"/>
    <circle cx="354" cy="119" r="4.5" fill="${COPPER}"/>
    <circle cx="314" cy="201" r="4.5" fill="${COPPER}"/>
    <circle cx="324" cy="201" r="4.5" fill="${COPPER}"/>
    <circle cx="334" cy="201" r="4.5" fill="${COPPER}"/>
    <circle cx="344" cy="201" r="4.5" fill="${COPPER}"/>
    <circle cx="354" cy="201" r="4.5" fill="${COPPER}"/>

    <line x1="240" y1="126" x2="70" y2="36" stroke="${PAPER}" stroke-width="4" stroke-linecap="round"/>
    <line x1="240" y1="194" x2="70" y2="284" stroke="${PAPER}" stroke-width="4" stroke-linecap="round"/>
    ${arrow2H(118, 222, 160, FORCE, 3.5)}
    <text x="170" y="146" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}" text-anchor="middle">moves in and out</text>

    <path d="M 252 197 Q 246 250 232 298 M 262 197 Q 256 250 244 298" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="238" y="313" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">to amplifier</text>

    ${lead(150, 78, 140, 46)}
    <text x="124" y="40" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">cone</text>
    ${lead(314, 114, 272, 104)}
    <text x="252" y="100" font-family="${FONT}" font-size="12" font-weight="bold" fill="${COPPER}">coil</text>
    <text x="362" y="284" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}" text-anchor="middle">radial field: N → S</text>
  </svg>`

// ───────────────────────────────────────────────────────────────────────────
// 6 · COIL_TURNING — a flat coil between the poles, as an END VIEW looking
//     along the axle (the same view as COMMUTATOR_ACTION). Field: N on the
//     left, S on the right, so left → right.
//     Left side: current OUT of the page (⊙). First finger right, seCond
//     finger towards you → thuMb UP (z × x = +y).
//     Right side: current INTO the page (⊗) → thuMb DOWN ((−z) × x = −y).
//     Left side up, right side down: the coil turns CLOCKWISE as seen here.
// ───────────────────────────────────────────────────────────────────────────
const COIL_TURNING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 300" class="w-full h-full">
    ${plate(440, 300)}
    <text x="220" y="34" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">End view, looking along the axle</text>
    <rect x="16" y="50" width="54" height="200" fill="${N_F}" stroke="${N_COL}" stroke-width="2.5"/>
    <rect x="370" y="50" width="54" height="200" fill="${S_F}" stroke="${S_COL}" stroke-width="2.5"/>
    <text x="43" y="160" font-family="${FONT}" font-size="26" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="397" y="160" font-family="${FONT}" font-size="26" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    ${fieldH(70, 370, 62, [200, 270])}
    ${fieldH(70, 370, 98, [200, 270])}
    ${fieldH(70, 370, 202, [200, 270])}
    ${fieldH(70, 370, 238, [200, 270])}

    <line x1="130" y1="150" x2="310" y2="150" stroke="${COPPER}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="220" cy="150" r="7" fill="${STEEL_F}" stroke="${STEEL}" stroke-width="2"/>
    ${wireOut(130, 150, 14)}
    ${wireIn(310, 150, 14)}
    ${arrow(130, 133, 130, 72, FORCE, 4.5)}
    ${arrow(310, 167, 310, 228, FORCE, 4.5)}
    <text x="142" y="86" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">force up</text>
    <text x="298" y="222" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}" text-anchor="end">force down</text>

    <path d="M 185.4 130 A 40 40 0 0 1 254.6 130" fill="none" stroke="${FORCE}" stroke-width="2.5"/>
    ${arrowAt(254.6, 130, 60, FORCE, 1.2)}
    <text x="262" y="118" font-family="${FONT}" font-size="11" font-weight="bold" fill="${FORCE}">turns clockwise</text>

    <text x="220" y="274" font-family="${FONT}" font-size="11" font-weight="bold" fill="${CURR_T}" text-anchor="middle">⊙ current out of the page, towards you</text>
    <text x="220" y="292" font-family="${FONT}" font-size="11" font-weight="bold" fill="${CURR_T}" text-anchor="middle">⊗ current into the page, away from you</text>
  </svg>`

/** The motor's coil in the oblique sketch: three turns, open at the front end where the leads leave. */
const motorCoil = () => [-3, 0, 3].map((o) => `<path d="M 207 ${f(196 + o)} L 281.4 ${f(145.6 + o)} L 405.4 ${f(145.6 + o)} L 331 ${f(196 + o)}" fill="none" stroke="${COPPER}" stroke-width="2.2" stroke-linejoin="round"/>`).join('')

// ───────────────────────────────────────────────────────────────────────────
// 7 · DC_MOTOR — the simple d.c. motor (page 208), redrawn as a simplified
//     oblique sketch. Depth (along the axle, away from you) is drawn up and to
//     the right; a point (x, y, z) is plotted at (300 + x + 0.62z, 175 − y −
//     0.42z). The commutator and brushes are at the FRONT end of the axle.
//     Field: N on the left, S on the right → left to right.
//     Current: + plate → right wire → right brush → right segment → along the
//     RIGHT side of the coil AWAY from you (to the back) → across the back end
//     → along the LEFT side TOWARDS you → left segment → left brush → − plate.
//     Left side, current towards you: z × x = +y → force UP.
//     Right side, current away from you: (−z) × x = −y → force DOWN.
//     So the coil turns clockwise as seen from the commutator end.
// ───────────────────────────────────────────────────────────────────────────
const DC_MOTOR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 332" class="w-full h-full">
    ${plate(600, 332)}
    <path d="M 60.2 116.8 L 140.2 116.8 L 140.2 266.8 L 60.2 266.8 Z" fill="${N_F}" stroke="${N_COL}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 60.2 116.8 L 147 58 L 227 58 L 140.2 116.8 Z" fill="#fbd3d8" stroke="${N_COL}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 140.2 116.8 L 227 58 L 227 208 L 140.2 266.8 Z" fill="#f6bcc4" stroke="${N_COL}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 410.2 116.8 L 490.2 116.8 L 490.2 266.8 L 410.2 266.8 Z" fill="${S_F}" stroke="${S_COL}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 410.2 116.8 L 497 58 L 577 58 L 490.2 116.8 Z" fill="#c4dbf7" stroke="${S_COL}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 490.2 116.8 L 577 58 L 577 208 L 490.2 266.8 Z" fill="#aecbf2" stroke="${S_COL}" stroke-width="2" stroke-linejoin="round"/>
    <text x="100" y="202" font-family="${FONT}" font-size="30" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="450" y="202" font-family="${FONT}" font-size="30" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="537" y="44" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">magnet</text>

    ${fieldH(190, 432, 100, [340])}
    ${fieldH(175, 410, 128, [340])}
    ${fieldH(175, 410, 160, [300])}
    ${fieldH(160, 410, 244, [392])}
    <text x="318" y="44" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}" text-anchor="middle">field N → S</text>

    <line x1="225.6" y1="225.4" x2="368.2" y2="128.8" stroke="${STEEL}" stroke-width="4" stroke-linecap="round"/>
    ${motorCoil()}
    <path d="M 207 196 L 227 209.8 M 331 196 L 255.2 209.8" fill="none" stroke="${COPPER}" stroke-width="2"/>
    ${ringSeg(241.1, 214.9, 15, 100, 260, COPPER)}
    ${ringSeg(241.1, 214.9, 15, -80, 80, COPPER)}
    <rect x="207" y="209" width="19" height="12" rx="2" fill="${CARBON}"/>
    <rect x="256" y="209" width="19" height="12" rx="2" fill="${CARBON}"/>

    <path d="M 207 215 L 180 215 L 180 300 L 295 300 M 275 215 L 345 215 L 345 300 L 305 300" fill="none" stroke="${INK}" stroke-width="2"/>
    ${cellH(300, 300)}
    <text x="291" y="283" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="309" y="283" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="300" y="326" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">battery</text>

    ${arrowAt(180, 268, 90, CURR, 1.3)}
    ${arrowAt(345, 268, -90, CURR, 1.3)}
    ${arrowAt(225.6, 183.4, 145.9, CURR, 1.3)}
    ${arrowAt(386.8, 158.2, -34.1, CURR, 1.3)}
    ${arrowAt(318, 145.6, 180, CURR, 1.3)}
    <text x="172" y="286" font-family="${FONT}" font-size="11" font-weight="bold" fill="${CURR_T}" text-anchor="end">current</text>

    ${arrow(244.2, 164, 244.2, 82, FORCE, 4)}
    ${arrow(368.2, 178, 368.2, 256, FORCE, 4)}
    <text x="256" y="94" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">force</text>
    <text x="378" y="262" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">force</text>

    ${lead(402, 143, 408, 50)}
    <text x="404" y="44" font-family="${FONT}" font-size="12" font-weight="bold" fill="${COPPER}">coil</text>
    ${lead(230.5, 225.5, 150, 306)}
    <text x="110" y="320" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">commutator (split ring)</text>
    ${lead(216, 221, 232, 276)}
    ${lead(266, 221, 250, 276)}
    <text x="241" y="288" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">brushes</text>
  </svg>`

/** The fixed parts of one end-view panel centred on x = c: the poles, the field, the brushes' wires and the cell. */
const commFrame = (c) => `<rect x="${c - 96}" y="36" width="20" height="208" fill="${N_F}" stroke="${N_COL}" stroke-width="2"/>
    <rect x="${c + 76}" y="36" width="20" height="208" fill="${S_F}" stroke="${S_COL}" stroke-width="2"/>
    ${fieldH(c - 76, c + 76, 50, [c + 44])}
    ${fieldH(c - 76, c + 76, 230, [c + 44])}
    <path d="M ${c - 25} 146 L ${c - 25} 160 L ${c - 40} 160 L ${c - 40} 270 L ${c - 5} 270 M ${c + 25} 146 L ${c + 25} 160 L ${c + 40} 160 L ${c + 40} 270 L ${c + 5} 270" fill="none" stroke="${INK}" stroke-width="1.8"/>
    ${cellH(c, 270)}`

/**
 * The split ring and brushes of one panel, the coil turned clockwise by `rot`
 * degrees from horizontal. Segment A (dark copper) is joined to the coil side
 * that starts on the LEFT; segment B (pale) to the side that starts on the
 * right. The brushes stay put at left (−) and right (+).
 */
const commRing = (c, rot) => `<circle cx="${c}" cy="140" r="5" fill="${STEEL_F}" stroke="${STEEL}" stroke-width="1.5"/>` +
  ringSeg(c, 140, 16, 100 + rot, 260 + rot, COPPER) + ringSeg(c, 140, 16, -80 + rot, 80 + rot, '#d6a874') +
  `<rect x="${c - 31}" y="134" width="12" height="12" rx="2" fill="${CARBON}"/><rect x="${c + 19}" y="134" width="12" height="12" rx="2" fill="${CARBON}"/>`

/** A clockwise turning arrow drawn round the axle of a panel centred on x = c. */
const turnArc = (c) => `<path d="M ${f(c - 31.9)} 128.4 A 34 34 0 0 1 ${f(c - 11.6)} 108" fill="none" stroke="${FORCE}" stroke-width="2.2"/>` +
  arrowAt(c - 11.6, 108, -20, FORCE, 1.1)

// ───────────────────────────────────────────────────────────────────────────
// 8 · COMMUTATOR_ACTION — "The action of the commutator" (page 208) as three
//     END VIEWS looking along the axle from the commutator end, coil turning
//     clockwise. Field left → right throughout. The right brush is wired to
//     the + plate, the left brush to the − plate.
//     Panel 1, coil horizontal: segment A (dark, joined to the LEFT side) is
//     on the left brush (−), segment B on the right brush (+). Current goes in
//     at the right side, away from you (⊗), and comes back along the left side
//     towards you (⊙). Left side: z × x = +y, UP. Right side: (−z) × x = −y,
//     DOWN. The forces are furthest apart → the biggest turning effect.
//     Panel 2, coil vertical (turned 90°): the left side is now at the top,
//     still ⊙, force UP; the bottom side ⊗, force DOWN. The two forces lie on
//     one line through the axle → no turning effect. The gaps in the ring
//     have reached the brushes.
//     Panel 3, just past vertical (turned 105°): segment A has crossed to the
//     RIGHT brush (+), so the current in the coil has REVERSED. The top side
//     (sitting just right of the axle) is now ⊗: (−z) × x = −y, DOWN. The
//     bottom side (just left of the axle) is ⊙: UP. Down on the right of the
//     axle and up on the left of it is still CLOCKWISE — the coil turns on.
// ───────────────────────────────────────────────────────────────────────────
const COMMUTATOR_ACTION = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 322" class="w-full h-full">
    ${plate(600, 322)}
    <text x="100" y="22" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">1 · coil horizontal</text>
    <text x="300" y="22" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">2 · coil vertical</text>
    <text x="500" y="22" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">3 · just past vertical</text>

    ${commFrame(100)}
    <line x1="52" y1="140" x2="148" y2="140" stroke="${COPPER}" stroke-width="3"/>
    ${commRing(100, 0)}
    ${wireOut(42, 140, 10)}
    ${wireIn(158, 140, 10)}
    ${arrow(42, 128, 42, 84, FORCE, 3.5)}
    ${arrow(158, 152, 158, 196, FORCE, 3.5)}
    ${turnArc(100)}

    ${commFrame(300)}
    <line x1="300" y1="92" x2="300" y2="188" stroke="${COPPER}" stroke-width="3"/>
    ${commRing(300, 90)}
    ${wireOut(300, 82, 10)}
    ${wireIn(300, 198, 10)}
    ${arrow(300, 70, 300, 32, FORCE, 3.5)}
    ${arrow(300, 210, 300, 250, FORCE, 3.5)}

    ${commFrame(500)}
    <line x1="512.4" y1="93.7" x2="487.6" y2="186.3" stroke="${COPPER}" stroke-width="3"/>
    ${commRing(500, 105)}
    ${wireIn(515, 84, 10)}
    ${wireOut(485, 196, 10)}
    ${arrow(515, 96, 515, 119, FORCE, 3.5)}
    ${arrow(485, 184, 485, 161, FORCE, 3.5)}
    ${turnArc(500)}

    <text x="14" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="186" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="214" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="386" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="414" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="586" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="88" y="257" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="112" y="257" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="288" y="257" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="312" y="257" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="488" y="257" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
    <text x="512" y="257" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>

    <text x="100" y="298" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">forces furthest apart:</text>
    <text x="100" y="312" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">biggest turning effect</text>
    <text x="300" y="298" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">forces in line through the axle:</text>
    <text x="300" y="312" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">no turning effect</text>
    <text x="500" y="298" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">gaps pass the brushes:</text>
    <text x="500" y="312" font-family="${FONT}" font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle">current and forces reverse</text>
  </svg>`

/** One coil side in a slot of the armature (centre cx, cy), at angle t degrees: a small copper block. */
const slot = (cx, cy, t) => {
  const a = (t * Math.PI) / 180, ux = Math.cos(a), uy = Math.sin(a), w = 7
  const pt = (r, s) => `${f(cx + ux * r - uy * s)} ${f(cy + uy * r + ux * s)}`
  return `<path d="M ${pt(34, w)} L ${pt(56, w)} L ${pt(56, -w)} L ${pt(34, -w)} Z" fill="${COPPER}" stroke="#7c2d12" stroke-width="1"/>`
}

/** A radial field arrow at angle t degrees round (210, 160): inward on the N side, outward on the S side. */
const radial = (t, inward) => {
  const a = (t * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a)
  const p = (r) => [210 + r * c, 160 + r * s]
  const [x1, y1] = inward ? p(84) : p(65), [x2, y2] = inward ? p(65) : p(84)
  return arrow(x1, y1, x2, y2, FIELD, 1.8)
}

// ───────────────────────────────────────────────────────────────────────────
// 9 · PRACTICAL_MOTOR — end view of a practical motor (page 209), drawn
//     fresh: curved pole pieces N (left) and S (right) round an iron armature
//     with six slots — three coils, each wound in a pair of opposite slots
//     (the dashed chords), so the coils sit at different angles. The curved
//     faces keep the gap the same width all round, so the field crosses it
//     RADIALLY: into the armature on the N side, out of it on the S side.
// ───────────────────────────────────────────────────────────────────────────
const PRACTICAL_MOTOR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 320" class="w-full h-full">
    ${plate(420, 320)}
    <path d="M 20 96 L 156 96 A 84 84 0 0 0 156 224 L 20 224 Z" fill="${N_F}" stroke="${N_COL}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 400 96 L 264 96 A 84 84 0 0 1 264 224 L 400 224 Z" fill="${S_F}" stroke="${S_COL}" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="60" y="168" font-family="${FONT}" font-size="24" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="360" y="168" font-family="${FONT}" font-size="24" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>

    ${radial(150, true)}${radial(165, true)}${radial(180, true)}${radial(195, true)}${radial(210, true)}
    ${radial(-30, false)}${radial(-15, false)}${radial(0, false)}${radial(15, false)}${radial(30, false)}

    <circle cx="210" cy="160" r="62" fill="${IRON_F}" stroke="${IRON}" stroke-width="2.5"/>
    <path d="M 249.8 183 L 170.2 137 M 210 206 L 210 114 M 170.2 183 L 249.8 137" fill="none" stroke="${COPPER}" stroke-width="1.5" stroke-dasharray="4 4"/>
    ${slot(210, 160, 30)}${slot(210, 160, 90)}${slot(210, 160, 150)}${slot(210, 160, 210)}${slot(210, 160, 270)}${slot(210, 160, 330)}
    <circle cx="210" cy="160" r="12" fill="${STEEL_F}" stroke="${STEEL}" stroke-width="2"/>

    ${lead(137, 118, 70, 32)}
    <text x="16" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">curved pole piece</text>
    ${lead(281, 119, 356, 32)}
    <text x="404" y="26" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FIELD}" text-anchor="end">radial field</text>
    ${lead(210, 222, 210, 290)}
    <text x="210" y="304" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">iron armature</text>
    ${lead(250, 183, 372, 292)}
    <text x="404" y="304" font-family="${FONT}" font-size="12" font-weight="bold" fill="${COPPER}" text-anchor="end">coils</text>
  </svg>`

/** One INDUCED_WIRE panel centred on x = c: the poles, the field, the wire end-on, its two leads and the meter. */
const inducedPanel = (c, needle) => `<rect x="${c - 110}" y="36" width="40" height="116" fill="${N_F}" stroke="${N_COL}" stroke-width="2"/>
    <rect x="${c + 70}" y="36" width="40" height="116" fill="${S_F}" stroke="${S_COL}" stroke-width="2"/>
    ${fieldH(c - 70, c + 70, 52, [c - 40, c + 52])}
    ${fieldH(c - 70, c + 70, 76, [c - 40, c + 52])}
    ${fieldH(c - 70, c + 70, 112, [c - 40, c + 52])}
    ${fieldH(c - 70, c + 70, 136, [c - 40, c + 52])}
    <path d="M ${c - 4} 101 L ${c - 16} 202" fill="none" stroke="${INK}" stroke-width="1.8"/>
    <path d="M ${c + 4} 101 L ${c + 16} 202" fill="none" stroke="${INK}" stroke-width="1.8" stroke-dasharray="4 3"/>
    ${wireEnd(c, 94, 8)}
    ${galvo(c, 230, 32, needle)}`

// ───────────────────────────────────────────────────────────────────────────
// 10 · INDUCED_WIRE — "Induced e.m.f. and current in a moving wire" (page
//      210), as two front views with the wire end-on. Field N → S, left to
//      right. Moving the wire DOWN through the field cuts the lines and the
//      centre-zero meter flicks one way (drawn: to the right — which way is
//      set by how the meter is wired, so only the CHANGE is taught). Moving it
//      UP reverses the induced e.m.f., so the needle flicks the other way.
//      No induced-current arrows are drawn: the rule for their direction is
//      not in these spreads.
// ───────────────────────────────────────────────────────────────────────────
const INDUCED_WIRE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    <line x1="270" y1="14" x2="270" y2="290" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="135" y="25" font-family="${FONT}" font-size="13" font-weight="bold" fill="${FORCE}" text-anchor="middle">wire moved down</text>
    <text x="405" y="25" font-family="${FONT}" font-size="13" font-weight="bold" fill="${FORCE}" text-anchor="middle">wire moved up</text>

    ${inducedPanel(135, 35)}
    ${arrow(161, 66, 161, 124, FORCE, 3.5)}
    ${inducedPanel(405, -35)}
    ${arrow(431, 124, 431, 66, FORCE, 3.5)}

    <text x="45" y="101" font-family="${FONT}" font-size="20" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="225" y="101" font-family="${FONT}" font-size="20" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="315" y="101" font-family="${FONT}" font-size="20" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    <text x="495" y="101" font-family="${FONT}" font-size="20" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="135" y="212" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="405" y="212" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="91" y="226" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">centre-zero</text>
    <text x="91" y="242" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="end">galvanometer</text>
    <text x="135" y="286" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">needle flicks to the right</text>
    <text x="405" y="286" font-family="${FONT}" font-size="11" fill="${INK}" text-anchor="middle">needle flicks to the left</text>
  </svg>`

/** A coil of n turns along a horizontal axis: upright ellipses from x0, dx apart. */
const coilRings = (x0, n, dx, cy, rx, ry) => Array.from({ length: n }, (_, i) => `<ellipse cx="${x0 + i * dx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${COPPER}" stroke-width="2.6"/>`).join('')

// ───────────────────────────────────────────────────────────────────────────
// 11 · INDUCED_COIL — "Induced e.m.f. and current in a coil" (page 211),
//      drawn fresh. A bar magnet, N end first, is pushed into a coil joined to
//      a centre-zero galvanometer: the moving field lines are cut by the coil,
//      an e.m.f. is induced and the needle flicks (drawn: right). The panel on
//      the right gives the three cases the book lists: pushed in → one way,
//      held still → zero (no lines cut), pulled out → the OTHER way. Pushing
//      the S pole in first reverses each deflection. As in INDUCED_WIRE, only
//      the change of direction is taught, so no current arrows are drawn.
// ───────────────────────────────────────────────────────────────────────────
const INDUCED_COIL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" class="w-full h-full">
    ${plate(540, 300)}
    ${coilRings(210, 7, 18, 110, 7, 42)}
    <path d="M 210 152 L 210 238 L 232 238 M 318 152 L 318 238 L 296 238" fill="none" stroke="${INK}" stroke-width="2"/>
    ${galvo(264, 238, 32, 35)}
    <text x="264" y="220" font-family="${FONT}" font-size="10" font-weight="bold" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="264" y="56" font-family="${FONT}" font-size="12" font-weight="bold" fill="${COPPER}" text-anchor="middle">coil</text>
    <text x="264" y="290" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">galvanometer</text>

    <rect x="40" y="96" width="55" height="28" fill="${S_F}" stroke="${S_COL}" stroke-width="2"/>
    <rect x="95" y="96" width="55" height="28" fill="${N_F}" stroke="${N_COL}" stroke-width="2"/>
    <text x="67.5" y="116" font-family="${FONT}" font-size="14" font-weight="bold" fill="${S_COL}" text-anchor="middle">S</text>
    <text x="122.5" y="116" font-family="${FONT}" font-size="14" font-weight="bold" fill="${N_COL}" text-anchor="middle">N</text>
    ${fieldH(152, 196, 96, [192])}
    ${fieldH(152, 196, 110, [192])}
    ${fieldH(152, 196, 124, [192])}
    ${arrow(54, 78, 146, 78, FORCE, 4)}
    <text x="100" y="64" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}" text-anchor="middle">pushed in</text>

    <line x1="356" y1="16" x2="356" y2="290" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="446" y="30" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">what the needle does</text>
    ${galvo(392, 76, 22, 35)}
    ${galvo(392, 152, 22, 0)}
    ${galvo(392, 228, 22, -35)}
    <text x="392" y="63" font-family="${FONT}" font-size="9" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="392" y="139" font-family="${FONT}" font-size="9" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="392" y="215" font-family="${FONT}" font-size="9" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="424" y="72" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">pushed in</text>
    <text x="424" y="90" font-family="${FONT}" font-size="11" fill="${INK}">flicks right</text>
    <text x="424" y="148" font-family="${FONT}" font-size="12" font-weight="bold" fill="${INK}">held still</text>
    <text x="424" y="166" font-family="${FONT}" font-size="11" fill="${INK}">stays at zero</text>
    <text x="424" y="224" font-family="${FONT}" font-size="12" font-weight="bold" fill="${FORCE}">pulled out</text>
    <text x="424" y="242" font-family="${FONT}" font-size="11" fill="${INK}">flicks left</text>
    <text x="446" y="284" font-family="${FONT}" font-size="11" fill="${MUTED}" text-anchor="middle">S pole first: all reversed</text>
  </svg>`

export const DIAGRAMS = {
  WIRE_IN_FIELD: WIRE_IN_FIELD,
  CATAPULT_FIELD: CATAPULT_FIELD,
  FLEMING_LHR: FLEMING_LHR,
  LHR_EXAMPLE: LHR_EXAMPLE,
  LOUDSPEAKER: LOUDSPEAKER,
  COIL_TURNING: COIL_TURNING,
  DC_MOTOR: DC_MOTOR,
  COMMUTATOR_ACTION: COMMUTATOR_ACTION,
  PRACTICAL_MOTOR: PRACTICAL_MOTOR,
  INDUCED_WIRE: INDUCED_WIRE,
  INDUCED_COIL: INDUCED_COIL,
}
