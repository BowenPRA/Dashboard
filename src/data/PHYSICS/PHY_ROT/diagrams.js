// src/data/PHYSICS/PHY_ROT/diagrams.js
// Rotation & Angular Momentum — the teaching diagrams.
//
// House rules (docs/svg-diagrams.md): dark ink on a light card, monospace for
// symbols and numbers, sans-serif for labels, one idea per picture, every
// colour paired with a word. `npm run audit:svg PHYSICS` must be clean.
//
// One colour per idea, held across every diagram, so "purple is turning"
// means the same thing on every slide:
//
//   #a855f7 purple  the turning quantities — θ, ω, α, I, L, τ's letters in the swap
//   #3b82f6 blue    the moving-in-a-line quantities — x, s, v, a, m, F, p
//   #10b981 green   the pivot / axis and the radius r measured from it
//   #ef4444 red     forces and weights (the pushes that make torques)
//   #d97706 amber   the sign of a turn: counterclockwise +, clockwise −
//
// SUBSCRIPTS are authored the way they read — m₁, d₂, ω_f, F_R — and
// withSubscripts() turns them into real <tspan> subscripts when the module
// loads, so the audit (which measures the characters between <text> and
// </text>) still counts one letter per subscript character. Keep each RAW
// entry a plain `KEY: \`<svg…\`` template so the audit can read it.

const INK = '#1e293b';
const MUTED = '#64748b';
const BLUE = '#3b82f6';
const PURPLE = '#a855f7';
const GREEN = '#10b981';
const RED = '#ef4444';
const AMBER = '#d97706';

// Marker ids carry the unit's prefix: PHY_MOM's `mom-ar-blue` can be on the
// same page, and two markers with one id would draw each other's arrowheads.
const ARROWS = `<defs>
    <marker id="rot-ar-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${BLUE}"/></marker>
    <marker id="rot-ar-purple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${PURPLE}"/></marker>
    <marker id="rot-ar-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${RED}"/></marker>
    <marker id="rot-ar-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${AMBER}"/></marker>
    <marker id="rot-ar-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${GREEN}"/></marker>
    <marker id="rot-ar-muted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${MUTED}"/></marker>
  </defs>`;

const SUB_DIGITS = '₀₁₂₃₄₅₆₇₈₉';
// Subscripts in sans-serif: in a small monospace "1i" reads as "11".
const sub = (s) => `<tspan baseline-shift="sub" font-size="75%" font-family="sans-serif">${s}</tspan>`;

function withSubscripts(svg) {
  return svg.replace(/(<text\b[^>]*>)([^<]*)(<\/text>)/g, (whole, open, body, close) => {
    const text = body
      .replace(/([₀-₉]+)/g, (m, digits) => sub([...digits].map((d) => SUB_DIGITS.indexOf(d)).join('')))
      .replace(/_([A-Za-z]+)/g, (m, word) => sub(word));
    return open + text + close;
  });
}

const RAW = {
  // Turns and directions. One full turn is 2π radians; Acellus counts a
  // counterclockwise turn as + and a clockwise turn as −.
  RADIAN_TURN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="330" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">One turn is 2π radians</text>

  <circle cx="170" cy="180" r="78" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="3"/>
  <line x1="170" y1="180" x2="248" y2="180" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="170" cy="180" r="5" fill="${GREEN}"/>
  <text x="209" y="172" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">r</text>

  <path d="M 263.97 145.8 A 100 100 0 0 0 76.03 145.8" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-amber)"/>
  <text x="170" y="66" font-family="sans-serif" font-size="14" font-weight="bold" fill="${AMBER}" text-anchor="middle">+ counterclockwise (CCW)</text>
  <path d="M 263.97 214.2 A 100 100 0 0 1 76.03 214.2" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linecap="round" stroke-dasharray="9 6" marker-end="url(#rot-ar-amber)"/>
  <text x="170" y="306" font-family="sans-serif" font-size="14" font-weight="bold" fill="${AMBER}" text-anchor="middle">− clockwise (CW)</text>

  <rect x="330" y="72" width="268" height="214" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="464" y="110" font-family="monospace" font-size="22" font-weight="bold" fill="${PURPLE}" text-anchor="middle">1 turn = 2π rad</text>
  <text x="464" y="138" font-family="monospace" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">(about 6.28 rad)</text>
  <line x1="350" y1="158" x2="578" y2="158" stroke="#e2e8f0" stroke-width="2"/>
  <text x="464" y="188" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">revolutions or rotations</text>
  <text x="464" y="214" font-family="monospace" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">× 2π → radians</text>
  <text x="464" y="258" font-family="monospace" font-size="16" font-weight="bold" fill="${PURPLE}" text-anchor="middle">2.00 rev = 12.6 rad</text>
</svg>`,

  // The big idea: three quantities of moving in a line, and their turning
  // twins. Same equations, new letters.
  SWAP_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 350" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="350" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Same motion, new letters</text>

  <text x="160" y="68" font-family="sans-serif" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">MOVING IN A LINE</text>
  <text x="460" y="68" font-family="sans-serif" font-size="14" font-weight="bold" fill="${PURPLE}" text-anchor="middle">TURNING</text>

  <rect x="40" y="82" width="240" height="52" rx="10" fill="#dbeafe" stroke="${BLUE}" stroke-width="2"/>
  <text x="70" y="115" font-family="monospace" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">x</text>
  <text x="96" y="114" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">distance · m</text>
  <rect x="340" y="82" width="240" height="52" rx="10" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2"/>
  <text x="370" y="115" font-family="monospace" font-size="22" font-weight="bold" fill="${PURPLE}" text-anchor="middle">θ</text>
  <text x="392" y="114" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">angle · rad</text>
  <line x1="288" y1="108" x2="330" y2="108" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-muted)"/>

  <rect x="40" y="144" width="240" height="52" rx="10" fill="#dbeafe" stroke="${BLUE}" stroke-width="2"/>
  <text x="70" y="177" font-family="monospace" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">v</text>
  <text x="96" y="176" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">velocity · m/s</text>
  <rect x="340" y="144" width="240" height="52" rx="10" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2"/>
  <text x="370" y="177" font-family="monospace" font-size="22" font-weight="bold" fill="${PURPLE}" text-anchor="middle">ω</text>
  <text x="392" y="176" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">angular velocity · rad/s</text>
  <line x1="288" y1="170" x2="330" y2="170" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-muted)"/>

  <rect x="40" y="206" width="240" height="52" rx="10" fill="#dbeafe" stroke="${BLUE}" stroke-width="2"/>
  <text x="70" y="239" font-family="monospace" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">a</text>
  <text x="96" y="238" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">acceleration · m/s²</text>
  <rect x="340" y="206" width="240" height="52" rx="10" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2"/>
  <text x="370" y="239" font-family="monospace" font-size="22" font-weight="bold" fill="${PURPLE}" text-anchor="middle">α</text>
  <text x="392" y="238" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">angular accel. · rad/s²</text>
  <line x1="288" y1="232" x2="330" y2="232" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-muted)"/>

  <text x="160" y="300" font-family="monospace" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle">v_f = v_i + a t</text>
  <line x1="288" y1="295" x2="330" y2="295" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-muted)"/>
  <text x="460" y="300" font-family="monospace" font-size="17" font-weight="bold" fill="${PURPLE}" text-anchor="middle">ω_f = ω_i + α t</text>
  <text x="310" y="332" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">Swap the letters and the equation still works.</text>
</svg>`,

  // From the centre to the edge: the arc s, the edge speed v and the edge
  // acceleration a are the turning quantities × r.
  RADIUS_LINK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="330" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">From the centre to the edge: × r</text>

  <circle cx="180" cy="170" r="110" fill="#ffffff" stroke="${MUTED}" stroke-width="3"/>
  <line x1="180" y1="170" x2="290" y2="170" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <line x1="180" y1="170" x2="243.09" y2="79.89" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="180" cy="170" r="5" fill="${GREEN}"/>
  <text x="240" y="190" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">r</text>

  <path d="M 216 170 A 36 36 0 0 0 200.65 140.51" fill="none" stroke="${PURPLE}" stroke-width="3"/>
  <text x="226" y="152" font-family="monospace" font-size="16" font-weight="bold" fill="${PURPLE}" text-anchor="middle">θ</text>

  <path d="M 290 170 A 110 110 0 0 0 243.09 79.89" fill="none" stroke="${BLUE}" stroke-width="6" stroke-linecap="round"/>
  <text x="300" y="112" font-family="monospace" font-size="16" font-weight="bold" fill="${BLUE}">s</text>

  <circle cx="180" cy="280" r="6" fill="${BLUE}"/>
  <line x1="186" y1="280" x2="262" y2="280" stroke="${BLUE}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-blue)"/>
  <text x="272" y="286" font-family="monospace" font-size="16" font-weight="bold" fill="${BLUE}">v</text>

  <rect x="352" y="62" width="248" height="236" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="476" y="94" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">centre → edge: × r</text>
  <text x="476" y="134" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">s = r θ</text>
  <text x="476" y="170" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">v = r ω</text>
  <text x="476" y="206" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">a = r α</text>
  <line x1="372" y1="226" x2="580" y2="226" stroke="#e2e8f0" stroke-width="2"/>
  <text x="476" y="254" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">edge → centre: ÷ r</text>
  <text x="476" y="280" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">θ in rad · r in m (the radius)</text>
</svg>`,

  // The door: only the part of the push ACROSS the door turns it, F sin θ.
  DOOR_TORQUE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 320" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="320" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">A door seen from above</text>

  <rect x="80" y="172" width="400" height="14" rx="4" fill="#e2e8f0" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="86" cy="179" r="9" fill="${GREEN}" stroke="#ffffff" stroke-width="2"/>
  <text x="86" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="${GREEN}" text-anchor="middle">hinge</text>

  <line x1="420" y1="172" x2="420" y2="74" stroke="${RED}" stroke-width="2.5" stroke-dasharray="6 5"/>
  <text x="410" y="110" font-family="monospace" font-size="14" font-weight="bold" fill="${RED}" text-anchor="end">F sin θ turns it</text>
  <line x1="420" y1="172" x2="481" y2="74" stroke="${RED}" stroke-width="5" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="490" y="70" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}">F = 45.3 N</text>
  <path d="M 458 172 A 38 38 0 0 0 440.1 139.7" fill="none" stroke="${PURPLE}" stroke-width="3"/>
  <text x="470" y="150" font-family="monospace" font-size="14" font-weight="bold" fill="${PURPLE}">θ = 58.2°</text>

  <line x1="86" y1="212" x2="420" y2="212" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <line x1="86" y1="203" x2="86" y2="221" stroke="${GREEN}" stroke-width="3"/>
  <line x1="420" y1="203" x2="420" y2="221" stroke="${GREEN}" stroke-width="3"/>
  <text x="253" y="240" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">r = 0.855 m (hinge to push)</text>

  <text x="310" y="292" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">τ = r F sin θ</text>
</svg>`,

  // A balanced see-saw: the weight on each side times its distance from the
  // pivot. One side turns it anticlockwise, the other clockwise.
  SEESAW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="330" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">A balanced teeter-totter</text>

  <text x="100" y="72" font-family="sans-serif" font-size="13" font-weight="bold" fill="${AMBER}" text-anchor="middle">turns it anticlockwise</text>
  <text x="461" y="72" font-family="sans-serif" font-size="13" font-weight="bold" fill="${AMBER}" text-anchor="middle">turns it clockwise</text>

  <rect x="80" y="122" width="40" height="40" rx="6" fill="#dbeafe" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="100" y="105" font-family="monospace" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">72.9 kg</text>
  <rect x="436" y="112" width="50" height="50" rx="6" fill="#dbeafe" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="461" y="95" font-family="monospace" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">101 kg</text>

  <rect x="50" y="162" width="520" height="12" rx="4" fill="#e2e8f0" stroke="${INK}" stroke-width="2.5"/>
  <path d="M 310 174 L 288 210 L 332 210 Z" fill="#d1fae5" stroke="${GREEN}" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="310" y="228" font-family="sans-serif" font-size="12" font-weight="bold" fill="${GREEN}" text-anchor="middle">pivot</text>

  <line x1="100" y1="178" x2="100" y2="226" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="92" y="214" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}" text-anchor="end">m₁g</text>
  <line x1="461" y1="178" x2="461" y2="226" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="469" y="214" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}">m₂g</text>

  <line x1="100" y1="252" x2="310" y2="252" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <text x="205" y="272" font-family="monospace" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">d₁ = 2.62 m</text>
  <line x1="310" y1="252" x2="461" y2="252" stroke="${GREEN}" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 5"/>
  <text x="386" y="272" font-family="monospace" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">d₂ = ?</text>

  <text x="310" y="310" font-family="monospace" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">m₁g × d₁ = m₂g × d₂</text>
</svg>`,

  // Two sawhorses: put the pivot at the support you are NOT asked about, so
  // its force has distance 0 and drops out. Every distance is measured from it.
  SAWHORSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 350" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="350" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Pivot at the support you are NOT asked about</text>

  <rect x="190" y="104" width="40" height="16" rx="3" fill="#fee2e2" stroke="${RED}" stroke-width="2"/>
  <text x="210" y="96" font-family="sans-serif" font-size="12" font-weight="bold" fill="${RED}" text-anchor="middle">saw</text>
  <rect x="60" y="120" width="500" height="14" rx="4" fill="#e2e8f0" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="64" cy="127" r="10" fill="${GREEN}" stroke="#ffffff" stroke-width="2"/>
  <text x="64" y="76" font-family="sans-serif" font-size="12" font-weight="bold" fill="${GREEN}" text-anchor="middle">pivot here</text>
  <line x1="64" y1="84" x2="64" y2="112" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#rot-ar-green)"/>

  <line x1="556" y1="196" x2="556" y2="142" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="546" y="190" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}" text-anchor="end">F_R = ?</text>
  <line x1="210" y1="138" x2="210" y2="188" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="220" y="176" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}">mg</text>
  <line x1="310" y1="138" x2="310" y2="188" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="320" y="182" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}">Mg</text>
  <text x="320" y="160" font-family="sans-serif" font-size="11" font-weight="bold" fill="${MUTED}">middle</text>

  <line x1="64" y1="222" x2="210" y2="222" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <text x="137" y="216" font-family="monospace" font-size="13" font-weight="bold" fill="${GREEN}" text-anchor="middle">1.80 m</text>
  <line x1="64" y1="250" x2="310" y2="250" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <text x="187" y="244" font-family="monospace" font-size="13" font-weight="bold" fill="${GREEN}" text-anchor="middle">3.00 m</text>
  <line x1="64" y1="278" x2="556" y2="278" stroke="${GREEN}" stroke-width="3" stroke-linecap="round"/>
  <text x="310" y="272" font-family="monospace" font-size="13" font-weight="bold" fill="${GREEN}" text-anchor="middle">6.00 m</text>

  <text x="310" y="322" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">F_R × 6.00 = Mg × 3.00 + mg × 1.80</text>
</svg>`,

  // The drawbridge: hinged at one end, a chain at the other end pulling at
  // 51.0° to the bridge. Only the part of the chain's pull ACROSS the bridge
  // turns it.
  DRAWBRIDGE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 320" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="320" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">The drawbridge, held level by a chain</text>

  <rect x="40" y="70" width="18" height="200" fill="#e2e8f0" stroke="${INK}" stroke-width="2"/>
  <rect x="62" y="194" width="440" height="14" rx="4" fill="#e2e8f0" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="66" cy="201" r="9" fill="${GREEN}" stroke="#ffffff" stroke-width="2"/>
  <text x="80" y="236" font-family="sans-serif" font-size="12" font-weight="bold" fill="${GREEN}">hinge (pivot)</text>

  <line x1="498" y1="194" x2="389.5" y2="60" stroke="${MUTED}" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 7"/>
  <circle cx="389.5" cy="60" r="6" fill="#ffffff" stroke="${MUTED}" stroke-width="3"/>
  <text x="398" y="92" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="end">chain</text>
  <line x1="498" y1="194" x2="441.4" y2="124.1" stroke="${RED}" stroke-width="5" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="466" y="142" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}">T = ?</text>
  <path d="M 458 194 A 40 40 0 0 1 472.8 162.9" fill="none" stroke="${PURPLE}" stroke-width="3"/>
  <text x="452" y="178" font-family="monospace" font-size="13" font-weight="bold" fill="${PURPLE}" text-anchor="end">51.0°</text>

  <line x1="282" y1="212" x2="282" y2="256" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#rot-ar-red)"/>
  <text x="296" y="250" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}">Mg</text>
  <text x="296" y="230" font-family="sans-serif" font-size="11" font-weight="bold" fill="${MUTED}">middle</text>

  <text x="310" y="300" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">T × L × sin 51.0° = Mg × L/2</text>
</svg>`,

  // Moment of inertia: the same mass, twice as far out, is FOUR times harder
  // to spin — because r is squared.
  INERTIA_REACH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 300" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="300" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Same mass, twice as far out</text>

  <circle cx="70" cy="100" r="8" fill="${GREEN}" stroke="#ffffff" stroke-width="2"/>
  <line x1="70" y1="100" x2="230" y2="100" stroke="${MUTED}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="230" cy="100" r="18" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>
  <text x="230" y="105" font-family="monospace" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
  <text x="150" y="88" font-family="monospace" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">r</text>
  <text x="440" y="106" font-family="monospace" font-size="18" font-weight="bold" fill="${PURPLE}" text-anchor="middle">I = m r²</text>

  <circle cx="70" cy="190" r="8" fill="${GREEN}" stroke="#ffffff" stroke-width="2"/>
  <line x1="70" y1="190" x2="390" y2="190" stroke="${MUTED}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="390" cy="190" r="18" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>
  <text x="390" y="195" font-family="monospace" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
  <text x="230" y="178" font-family="monospace" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">2r</text>
  <text x="510" y="196" font-family="monospace" font-size="18" font-weight="bold" fill="${PURPLE}" text-anchor="middle">I = 4 m r²</text>

  <text x="70" y="232" font-family="sans-serif" font-size="12" font-weight="bold" fill="${GREEN}" text-anchor="middle">axis</text>
  <text x="310" y="276" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">r is squared: twice as far out is 4 times harder to spin.</text>
</svg>`,

  // The skater: arms in makes I smaller, so ω must grow to keep L = Iω the same.
  SKATER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 340" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="340" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Arms in: smaller I, so faster ω</text>

  <rect x="20" y="48" width="280" height="234" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="160" y="72" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">ARMS OUT</text>
  <circle cx="160" cy="98" r="13" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="3"/>
  <line x1="160" y1="111" x2="160" y2="180" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="160" y1="128" x2="72" y2="122" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="160" y1="128" x2="248" y2="122" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="160" y1="180" x2="146" y2="222" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="160" y1="180" x2="174" y2="222" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <path d="M 112 196 Q 160 214 208 196" fill="none" stroke="${AMBER}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-amber)"/>
  <text x="160" y="252" font-family="monospace" font-size="14" font-weight="bold" fill="${PURPLE}" text-anchor="middle">I = 4.80 kg·m²</text>
  <text x="160" y="272" font-family="monospace" font-size="14" font-weight="bold" fill="${AMBER}" text-anchor="middle">ω = 2.10 rad/s</text>

  <rect x="320" y="48" width="280" height="234" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="460" y="72" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">ARMS IN</text>
  <circle cx="460" cy="98" r="13" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="3"/>
  <line x1="460" y1="111" x2="460" y2="180" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <path d="M 460 126 L 444 140 L 460 150" fill="none" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 460 126 L 476 140 L 460 150" fill="none" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="460" y1="180" x2="452" y2="222" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="460" y1="180" x2="468" y2="222" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round"/>
  <path d="M 426 188 Q 460 202 494 188" fill="none" stroke="${AMBER}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-amber)"/>
  <path d="M 426 204 Q 460 218 494 204" fill="none" stroke="${AMBER}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-amber)"/>
  <path d="M 426 220 Q 460 234 494 220" fill="none" stroke="${AMBER}" stroke-width="3" stroke-linecap="round" marker-end="url(#rot-ar-amber)"/>
  <text x="460" y="252" font-family="monospace" font-size="14" font-weight="bold" fill="${PURPLE}" text-anchor="middle">I = 1.60 kg·m²</text>
  <text x="460" y="272" font-family="monospace" font-size="14" font-weight="bold" fill="${AMBER}" text-anchor="middle">ω = 6.30 rad/s</text>

  <text x="310" y="318" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">L = Iω: 4.80 × 2.10 = 1.60 × 6.30 = 10.1</text>
</svg>`,

  // The whole dictionary: every rotation quantity and formula is a linear one
  // with the letters swapped.
  SWAP_FULL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 380" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="380" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">The swap, complete</text>

  <rect x="20" y="50" width="250" height="306" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="145" y="76" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">LETTERS</text>
  <text x="110" y="112" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="end">x</text>
  <text x="145" y="112" font-family="monospace" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="180" y="112" font-family="monospace" font-size="20" font-weight="bold" fill="${PURPLE}">θ</text>
  <text x="110" y="152" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="end">v</text>
  <text x="145" y="152" font-family="monospace" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="180" y="152" font-family="monospace" font-size="20" font-weight="bold" fill="${PURPLE}">ω</text>
  <text x="110" y="192" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="end">a</text>
  <text x="145" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="180" y="192" font-family="monospace" font-size="20" font-weight="bold" fill="${PURPLE}">α</text>
  <text x="110" y="232" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="end">m</text>
  <text x="145" y="232" font-family="monospace" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="180" y="232" font-family="monospace" font-size="20" font-weight="bold" fill="${PURPLE}">I</text>
  <text x="110" y="272" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="end">F</text>
  <text x="145" y="272" font-family="monospace" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="180" y="272" font-family="monospace" font-size="20" font-weight="bold" fill="${PURPLE}">τ</text>
  <text x="110" y="312" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="end">p</text>
  <text x="145" y="312" font-family="monospace" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="180" y="312" font-family="monospace" font-size="20" font-weight="bold" fill="${PURPLE}">L</text>

  <rect x="290" y="50" width="310" height="306" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="445" y="76" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">FORMULAS</text>
  <text x="380" y="122" font-family="monospace" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">F = m a</text>
  <text x="445" y="122" font-family="monospace" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="515" y="122" font-family="monospace" font-size="16" font-weight="bold" fill="${PURPLE}" text-anchor="middle">τ = I α</text>
  <text x="380" y="182" font-family="monospace" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">½ m v²</text>
  <text x="445" y="182" font-family="monospace" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="515" y="182" font-family="monospace" font-size="16" font-weight="bold" fill="${PURPLE}" text-anchor="middle">½ I ω²</text>
  <text x="380" y="242" font-family="monospace" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">p = m v</text>
  <text x="445" y="242" font-family="monospace" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">→</text>
  <text x="515" y="242" font-family="monospace" font-size="16" font-weight="bold" fill="${PURPLE}" text-anchor="middle">L = I ω</text>
  <text x="445" y="300" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">momentum kept → L kept</text>
  <text x="445" y="324" font-family="monospace" font-size="14" font-weight="bold" fill="${PURPLE}" text-anchor="middle">I_i ω_i = I_f ω_f</text>
</svg>`,
};

export const DIAGRAMS = Object.fromEntries(Object.entries(RAW).map(([key, svg]) => [key, withSubscripts(svg)]));
