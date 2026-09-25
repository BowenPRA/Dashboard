// src/data/PHYSICS/PHY_MOM/diagrams.js
// Momentum & Collisions — the teaching diagrams.
//
// House rules (docs/svg-diagrams.md): dark ink on a light card, monospace for
// symbols and numbers, sans-serif for labels, one idea per picture, every
// colour paired with a word. `npm run audit:svg PHYSICS` must be clean.
//
// One colour per idea, held across every diagram AND the Isolate It task, so
// "blue is object 1" means the same thing on every slide:
//
//   #3b82f6 blue    object 1 and its velocity arrows (v₁ᵢ, v₁f)
//   #a855f7 purple  object 2 and its velocity arrows (v₂ᵢ, v₂f)
//   #10b981 green   the pair once stuck together, and their ONE shared v_f
//   #ef4444 red     force / impulse — F, and the −F it gets back
//   #d97706 amber   the sign axis: right / east is +, left / west is −
//
// Arrows point the way the thing really moves, and an arrow's label carries
// its signed value — the sign IS the direction.
//
// SUBSCRIPTS. The text is authored the way it reads — v₁ᵢ, m₂, v₁f, v_f,
// p_bullet — and withSubscripts() below turns it into real
// <tspan baseline-shift="sub"> subscripts when the module loads:
//   · a run of subscript digits (₁₂…) becomes one subscript, and a trailing
//     ᵢ or f joins it:  v₁ᵢ → v + sub "1i",  v₂f → v + sub "2f";
//   · _word becomes a subscript word:  v_f → v + sub "f",  p_rifle → p + sub "rifle".
// Why not write the <tspan>s by hand: the audit measures the characters
// between <text> and </text>, markup included, so each hand-written tspan
// would count as ~45 extra letters. Authored this way it counts one letter per
// subscript character (the real one is smaller), so the check stays honest
// and slightly cautious. Keep each DIAGRAMS entry a plain `KEY: \`<svg…\``
// template so the audit and the validator can still read it.

const INK = '#1e293b';
const MUTED = '#64748b';
const BLUE = '#3b82f6';
const PURPLE = '#a855f7';
const GREEN = '#10b981';
const RED = '#ef4444';
const AMBER = '#d97706';

// Marker ids carry the unit's prefix: PHY_CIRC's `ar-blue` can be on the same
// page, and two markers with one id would draw each other's arrowheads.
// refX 7 (not 8) so the head fully covers the line's round cap at the tip.
const ARROWS = `<defs>
    <marker id="mom-ar-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${BLUE}"/></marker>
    <marker id="mom-ar-purple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${PURPLE}"/></marker>
    <marker id="mom-ar-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${GREEN}"/></marker>
    <marker id="mom-ar-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${RED}"/></marker>
    <marker id="mom-ar-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${AMBER}"/></marker>
    <marker id="mom-ar-muted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${MUTED}"/></marker>
  </defs>`;

const SUB_DIGITS = '₀₁₂₃₄₅₆₇₈₉';
// Subscripts in sans-serif: in a small monospace "1i" reads as "11".
const sub = (s) => `<tspan baseline-shift="sub" font-size="75%" font-family="sans-serif">${s}</tspan>`;

function withSubscripts(svg) {
  return svg.replace(/(<text\b[^>]*>)([^<]*)(<\/text>)/g, (whole, open, body, close) => {
    const text = body
      .replace(/([₀-₉]+)(ᵢ|f)?/g, (m, digits, letter = '') =>
        sub([...digits].map((d) => SUB_DIGITS.indexOf(d)).join('') + (letter === 'ᵢ' ? 'i' : letter)))
      .replace(/_([a-z]+)/g, (m, word) => sub(word));
    return open + text + close;
  });
}

const RAW = {
  // Direction is a sign. The same kind of arrow — a velocity — once pointing
  // right (+) and once pointing left (−). The Acellus "total momentum" item.
  SIGN_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 280" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="280" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="34" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Direction is a sign</text>

  <text x="220" y="86" font-family="monospace" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">v₁ = +23.4 m/s</text>
  <line x1="170" y1="104" x2="264" y2="104" stroke="${BLUE}" stroke-width="5" stroke-linecap="round" marker-end="url(#mom-ar-blue)"/>
  <circle cx="170" cy="166" r="30" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>
  <text x="170" y="164" font-family="monospace" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">0.907</text>
  <text x="170" y="180" font-family="monospace" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">kg</text>

  <text x="400" y="86" font-family="monospace" font-size="16" font-weight="bold" fill="${PURPLE}" text-anchor="middle">v₂ = −9.80 m/s</text>
  <line x1="450" y1="104" x2="356" y2="104" stroke="${PURPLE}" stroke-width="5" stroke-linecap="round" marker-end="url(#mom-ar-purple)"/>
  <circle cx="450" cy="158" r="38" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="3"/>
  <text x="450" y="157" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">2.27</text>
  <text x="450" y="175" font-family="monospace" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">kg</text>

  <line x1="52" y1="198" x2="568" y2="198" stroke="${AMBER}" stroke-width="4" stroke-linecap="round" marker-start="url(#mom-ar-amber)" marker-end="url(#mom-ar-amber)"/>
  <line x1="310" y1="189" x2="310" y2="207" stroke="${INK}" stroke-width="2.5"/>
  <text x="310" y="228" font-family="monospace" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
  <text x="26" y="207" font-family="monospace" font-size="28" font-weight="bold" fill="${AMBER}" text-anchor="middle">−</text>
  <text x="594" y="207" font-family="monospace" font-size="28" font-weight="bold" fill="${AMBER}" text-anchor="middle">+</text>
  <text x="52" y="228" font-family="sans-serif" font-size="14" font-weight="bold" fill="${AMBER}">left / west</text>
  <text x="568" y="228" font-family="sans-serif" font-size="14" font-weight="bold" fill="${AMBER}" text-anchor="end">right / east</text>

  <text x="310" y="264" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Same kind of arrow, opposite signs.</text>
</svg>`,

  // The bat item. Top: the ball comes in moving left, leaves moving right, and
  // the bat's force points the way the velocity CHANGED. Bottom: on the
  // number line the change is the whole trip across zero — 78, not 37 − 41.
  IMPULSE_BAT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 390" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="390" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">A bat sends the ball back the other way</text>

  <path d="M 78 76 Q 78 60 92 60 Q 106 60 106 76 L 103 146 L 97 196 L 87 196 L 81 146 Z" fill="#e2e8f0" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <ellipse cx="92" cy="200" rx="10" ry="5" fill="#e2e8f0" stroke="${INK}" stroke-width="2.5"/>
  <text x="66" y="136" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="end">bat</text>

  <circle cx="121" cy="118" r="14" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>
  <line x1="140" y1="118" x2="228" y2="118" stroke="${RED}" stroke-width="5" stroke-linecap="round" marker-end="url(#mom-ar-red)"/>
  <text x="140" y="148" font-family="monospace" font-size="14" font-weight="bold" fill="${RED}">F (for Δt = 0.0880 s)</text>

  <text x="300" y="89" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="end">before</text>
  <text x="440" y="66" font-family="monospace" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="middle">v_i = −41.0 m/s</text>
  <line x1="548" y1="84" x2="336" y2="84" stroke="${BLUE}" stroke-width="5" stroke-linecap="round" marker-end="url(#mom-ar-blue)"/>
  <circle cx="566" cy="84" r="12" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>

  <text x="300" y="181" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="end">after</text>
  <circle cx="330" cy="176" r="12" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>
  <line x1="348" y1="176" x2="552" y2="176" stroke="${BLUE}" stroke-width="5" stroke-linecap="round" marker-end="url(#mom-ar-blue)"/>
  <text x="450" y="158" font-family="monospace" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="middle">v_f = +37.0 m/s</text>

  <line x1="24" y1="214" x2="596" y2="214" stroke="#e2e8f0" stroke-width="2"/>

  <text x="300" y="246" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Δv = 37.0 − (−41.0) = 78.0 m/s</text>
  <path d="M 113 282 Q 113 272 123 272 L 290 272 Q 300 272 300 262 Q 300 272 310 272 L 478 272 Q 488 272 488 282" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <line x1="52" y1="300" x2="568" y2="300" stroke="${AMBER}" stroke-width="3.5" stroke-linecap="round" marker-start="url(#mom-ar-amber)" marker-end="url(#mom-ar-amber)"/>
  <path d="M 70 294 V 306 M 118 294 V 306 M 166 294 V 306 M 214 294 V 306 M 262 294 V 306 M 358 294 V 306 M 406 294 V 306 M 454 294 V 306 M 502 294 V 306 M 550 294 V 306" stroke="${AMBER}" stroke-width="2"/>
  <line x1="310" y1="290" x2="310" y2="310" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="113" cy="300" r="6.5" fill="${BLUE}" stroke="#ffffff" stroke-width="2"/>
  <circle cx="488" cy="300" r="6.5" fill="${BLUE}" stroke="#ffffff" stroke-width="2"/>
  <text x="581" y="305" font-family="monospace" font-size="12" font-weight="bold" fill="${MUTED}">m/s</text>

  <text x="70" y="326" font-family="monospace" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">−50</text>
  <text x="310" y="326" font-family="monospace" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
  <text x="550" y="326" font-family="monospace" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">+50</text>
  <text x="113" y="326" font-family="monospace" font-size="13" font-weight="bold" fill="${BLUE}" text-anchor="middle">−41</text>
  <text x="488" y="326" font-family="monospace" font-size="13" font-weight="bold" fill="${BLUE}" text-anchor="middle">+37</text>
  <text x="113" y="344" font-family="monospace" font-size="13" font-weight="bold" fill="${BLUE}" text-anchor="middle">v_i</text>
  <text x="488" y="344" font-family="monospace" font-size="13" font-weight="bold" fill="${BLUE}" text-anchor="middle">v_f</text>

  <text x="310" y="374" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">Δv is the whole distance across zero: 41 + 37 = 78, not 37 − 41.</text>
</svg>`,

  // What a collision is: before, during, after. During, the carts push each
  // other equally and oppositely — so whatever momentum one loses, the other
  // gains, and the total does not change.
  COLLISION_BEFORE_AFTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 348" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="348" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Two carts collide</text>

  <rect x="16" y="48" width="188" height="172" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="110" y="72" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">BEFORE</text>
  <line x1="28" y1="190" x2="192" y2="190" stroke="#cbd5e1" stroke-width="2"/>
  <text x="60" y="110" font-family="monospace" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="middle">v₁ᵢ</text>
  <line x1="46" y1="128" x2="94" y2="128" stroke="${BLUE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-blue)"/>
  <rect x="30" y="152" width="56" height="30" rx="6" fill="#dbeafe" stroke="${BLUE}" stroke-width="2.5"/>
  <circle cx="44" cy="184" r="6" fill="${INK}"/>
  <circle cx="72" cy="184" r="6" fill="${INK}"/>
  <text x="58" y="173" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">m₁</text>
  <text x="160" y="110" font-family="monospace" font-size="15" font-weight="bold" fill="${PURPLE}" text-anchor="middle">v₂ᵢ</text>
  <line x1="174" y1="128" x2="126" y2="128" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-purple)"/>
  <rect x="134" y="152" width="56" height="30" rx="6" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5"/>
  <circle cx="148" cy="184" r="6" fill="${INK}"/>
  <circle cx="176" cy="184" r="6" fill="${INK}"/>
  <text x="162" y="173" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">m₂</text>
  <text x="58" y="210" font-family="sans-serif" font-size="12" font-weight="bold" fill="${BLUE}" text-anchor="middle">cart 1</text>
  <text x="162" y="210" font-family="sans-serif" font-size="12" font-weight="bold" fill="${PURPLE}" text-anchor="middle">cart 2</text>

  <rect x="216" y="48" width="188" height="172" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="310" y="72" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">DURING</text>
  <line x1="228" y1="190" x2="392" y2="190" stroke="#cbd5e1" stroke-width="2"/>
  <text x="282" y="110" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">−F</text>
  <line x1="304" y1="128" x2="252" y2="128" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-red)"/>
  <text x="340" y="110" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">F</text>
  <line x1="316" y1="128" x2="368" y2="128" stroke="${RED}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-red)"/>
  <rect x="254" y="152" width="56" height="30" rx="6" fill="#dbeafe" stroke="${BLUE}" stroke-width="2.5"/>
  <circle cx="268" cy="184" r="6" fill="${INK}"/>
  <circle cx="296" cy="184" r="6" fill="${INK}"/>
  <text x="282" y="173" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">m₁</text>
  <rect x="310" y="152" width="56" height="30" rx="6" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5"/>
  <circle cx="324" cy="184" r="6" fill="${INK}"/>
  <circle cx="352" cy="184" r="6" fill="${INK}"/>
  <text x="338" y="173" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">m₂</text>
  <text x="310" y="210" font-family="sans-serif" font-size="12" font-weight="bold" fill="${RED}" text-anchor="middle">equal and opposite</text>

  <rect x="416" y="48" width="188" height="172" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="510" y="72" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">AFTER</text>
  <line x1="428" y1="190" x2="592" y2="190" stroke="#cbd5e1" stroke-width="2"/>
  <text x="462" y="110" font-family="monospace" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="middle">v₁f</text>
  <line x1="476" y1="128" x2="432" y2="128" stroke="${BLUE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-blue)"/>
  <rect x="440" y="152" width="56" height="30" rx="6" fill="#dbeafe" stroke="${BLUE}" stroke-width="2.5"/>
  <circle cx="454" cy="184" r="6" fill="${INK}"/>
  <circle cx="482" cy="184" r="6" fill="${INK}"/>
  <text x="468" y="173" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">m₁</text>
  <text x="558" y="110" font-family="monospace" font-size="15" font-weight="bold" fill="${PURPLE}" text-anchor="middle">v₂f</text>
  <line x1="546" y1="128" x2="588" y2="128" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-purple)"/>
  <rect x="534" y="152" width="56" height="30" rx="6" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5"/>
  <circle cx="548" cy="184" r="6" fill="${INK}"/>
  <circle cx="576" cy="184" r="6" fill="${INK}"/>
  <text x="562" y="173" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">m₂</text>

  <rect x="16" y="232" width="588" height="100" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="258" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">total momentum before = total momentum after</text>
  <text x="310" y="290" font-family="monospace" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f</text>
  <path d="M 176 300 V 305 H 294 V 300 M 326 300 V 305 H 444 V 300" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="235" y="321" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">before</text>
  <text x="385" y="321" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">after</text>
</svg>`,

  // THE idea of the unit. One equation for every collision; the story only
  // decides which terms vanish or merge. Nothing here is a new formula.
  ONE_EQUATION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 390" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="760" height="390" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="380" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">One equation, fitted to the story</text>

  <rect x="180" y="46" width="400" height="86" rx="14" fill="#f1f5f9" stroke="${INK}" stroke-width="2.5"/>
  <text x="380" y="75" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Every collision</text>
  <text x="380" y="114" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f</text>

  <line x1="320" y1="138" x2="146" y2="186" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#mom-ar-muted)"/>
  <line x1="380" y1="138" x2="380" y2="186" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#mom-ar-muted)"/>
  <line x1="440" y1="138" x2="614" y2="186" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#mom-ar-muted)"/>

  <rect x="14" y="198" width="236" height="150" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="132" y="222" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">One starts at rest</text>
  <rect x="52" y="238" width="160" height="30" rx="15" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="132" y="259" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">v₂ᵢ = 0</text>
  <line x1="132" y1="274" x2="132" y2="292" stroke="${MUTED}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#mom-ar-muted)"/>
  <text x="132" y="326" font-family="monospace" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">m₁v₁ᵢ = m₁v₁f + m₂v₂f</text>

  <rect x="262" y="198" width="236" height="150" rx="14" fill="#f0fdf4" stroke="${GREEN}" stroke-width="2.5"/>
  <text x="380" y="222" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">They stick together</text>
  <rect x="300" y="238" width="160" height="30" rx="15" fill="#ffffff" stroke="${GREEN}" stroke-width="2"/>
  <text x="380" y="259" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">v₁f = v₂f = v_f</text>
  <line x1="380" y1="274" x2="380" y2="292" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#mom-ar-green)"/>
  <text x="380" y="326" font-family="monospace" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">m₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v_f</text>

  <rect x="510" y="198" width="236" height="150" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="628" y="222" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Recoil: both start at rest</text>
  <rect x="548" y="238" width="160" height="30" rx="15" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="628" y="259" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">v₁ᵢ = v₂ᵢ = 0</text>
  <line x1="628" y1="274" x2="628" y2="292" stroke="${MUTED}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#mom-ar-muted)"/>
  <text x="628" y="326" font-family="monospace" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">0 = m₁v₁f + m₂v₂f</text>

  <text x="380" y="374" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">Don't learn three equations. Fit the one equation to the story.</text>
</svg>`,

  // Stuck together: two objects in, ONE object out, so ONE velocity after.
  // Arrow lengths follow the meteor item (12.46 and 8.56 km/s in, 11.2 out).
  STICK_TOGETHER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 316" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="316" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Two meteors collide and stick</text>

  <rect x="16" y="48" width="288" height="176" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="160" y="72" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">BEFORE</text>
  <text x="104" y="98" font-family="monospace" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">v₁ᵢ</text>
  <line x1="68" y1="114" x2="156" y2="114" stroke="${BLUE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-blue)"/>
  <circle cx="86" cy="156" r="28" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>
  <text x="86" y="162" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">m₁</text>
  <text x="240" y="98" font-family="monospace" font-size="16" font-weight="bold" fill="${PURPLE}" text-anchor="middle">v₂ᵢ</text>
  <line x1="220" y1="114" x2="278" y2="114" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-purple)"/>
  <circle cx="232" cy="156" r="21" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="3"/>
  <text x="232" y="162" font-family="monospace" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">m₂</text>
  <text x="86" y="208" font-family="sans-serif" font-size="12" font-weight="bold" fill="${BLUE}" text-anchor="middle">faster, behind</text>
  <text x="232" y="208" font-family="sans-serif" font-size="12" font-weight="bold" fill="${PURPLE}" text-anchor="middle">slower, ahead</text>

  <rect x="316" y="48" width="288" height="176" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="460" y="72" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">AFTER</text>
  <text x="458" y="98" font-family="monospace" font-size="16" font-weight="bold" fill="${GREEN}" text-anchor="middle">v_f</text>
  <line x1="424" y1="114" x2="502" y2="114" stroke="${GREEN}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-green)"/>
  <ellipse cx="443" cy="158" rx="60" ry="36" fill="#f0fdf4" stroke="${GREEN}" stroke-width="3"/>
  <circle cx="424" cy="158" r="26" fill="#dbeafe" stroke="${BLUE}" stroke-width="2"/>
  <circle cx="469" cy="158" r="19" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2"/>
  <text x="424" y="163" font-family="monospace" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">m₁</text>
  <text x="469" y="163" font-family="monospace" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">m₂</text>
  <text x="443" y="212" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">m₁ + m₂</text>

  <text x="310" y="256" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Stuck together → one velocity</text>
  <text x="310" y="290" font-family="monospace" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">m₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v_f</text>
</svg>`,

  // Recoil: nothing moves before, so the total momentum is 0 before AND
  // after. The bullet's + momentum and the rifle's − momentum cancel.
  RECOIL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="330" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">A rifle fires a bullet</text>

  <rect x="16" y="48" width="588" height="104" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="34" y="74" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">BEFORE</text>
  <path d="M 228 116 L 222 134 L 234 134 L 244 114 Z" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 140 94 L 250 99 L 250 115 L 140 130 Z" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="250" y="100" width="120" height="8" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5"/>
  <path d="M 356 101.5 H 366 Q 371 101.5 374 104 Q 371 106.5 366 106.5 H 356 Z" fill="${BLUE}"/>
  <text x="192" y="146" font-family="sans-serif" font-size="12" font-weight="bold" fill="${PURPLE}" text-anchor="middle">rifle</text>
  <text x="364" y="86" font-family="sans-serif" font-size="12" font-weight="bold" fill="${BLUE}" text-anchor="middle">bullet</text>
  <text x="498" y="104" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">v = 0, total p = 0</text>
  <text x="498" y="126" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">both at rest</text>

  <rect x="16" y="164" width="588" height="124" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="34" y="190" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">AFTER</text>
  <path d="M 188 232 L 182 250 L 194 250 L 204 230 Z" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 100 210 L 210 215 L 210 231 L 100 246 Z" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="210" y="216" width="120" height="8" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2.5"/>
  <text x="116" y="273" font-family="sans-serif" font-size="12" font-weight="bold" fill="${PURPLE}" text-anchor="end">rifle</text>
  <line x1="190" y1="268" x2="134" y2="268" stroke="${PURPLE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-purple)"/>
  <text x="202" y="273" font-family="monospace" font-size="15" font-weight="bold" fill="${PURPLE}">−0.856 m/s</text>

  <path d="M 432 217.5 H 446 Q 453 217.5 457 220 Q 453 222.5 446 222.5 H 432 Z" fill="${BLUE}"/>
  <text x="444" y="246" font-family="sans-serif" font-size="12" font-weight="bold" fill="${BLUE}" text-anchor="middle">bullet</text>
  <line x1="468" y1="220" x2="578" y2="220" stroke="${BLUE}" stroke-width="4" stroke-linecap="round" marker-end="url(#mom-ar-blue)"/>
  <text x="524" y="204" font-family="monospace" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="middle">+385 m/s</text>

  <text x="310" y="314" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">p_bullet + p_rifle = 0 → they move in opposite directions</text>
</svg>`,
};

export const DIAGRAMS = Object.fromEntries(Object.entries(RAW).map(([key, svg]) => [key, withSubscripts(svg)]));
