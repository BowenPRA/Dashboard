// src/data/PHYSICS/PHY_CIRC/diagrams.js
// Circular Motion & Gravity — the teaching diagrams.
//
// House rules (docs/svg-diagrams.md): dark ink on a light card, monospace for
// symbols and numbers, sans-serif for labels, one idea per picture, every
// colour paired with a word. `npm run audit:svg PHYSICS` must be clean.
//
// One colour per idea, held across every diagram AND the Isolate It task, so
// "red points to the centre" means the same thing on every slide:
//
//   #3b82f6 blue    velocity — always along the edge of the circle
//   #ef4444 red     the centripetal force — always to the centre
//   #10b981 green   weight, m g — always straight down
//   #a855f7 purple  tension / the normal force — whatever the rope or track does
//   #d97706 amber   the radius r — from the CENTRE, never from the surface

const INK = '#1e293b';
const MUTED = '#64748b';
const BLUE = '#3b82f6';
const RED = '#ef4444';
const GREEN = '#10b981';
const PURPLE = '#a855f7';
const AMBER = '#d97706';

const ARROWS = `<defs>
    <marker id="ar-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${BLUE}"/></marker>
    <marker id="ar-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${RED}"/></marker>
    <marker id="ar-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${GREEN}"/></marker>
    <marker id="ar-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${PURPLE}"/></marker>
    <marker id="ar-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${AMBER}"/></marker>
  </defs>`;

export const DIAGRAMS = {
  // The two arrows every circular-motion question is about, and the one
  // fact about them: velocity along the edge, force to the centre.
  CIRCLE_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="560" height="320" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="280" y="34" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">A ball on a string, seen from above</text>

  <circle cx="200" cy="185" r="105" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8 7"/>
  <circle cx="200" cy="185" r="6" fill="${INK}"/>
  <text x="200" y="212" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">centre</text>

  <line x1="200" y1="185" x2="305" y2="185" stroke="${AMBER}" stroke-width="4" stroke-linecap="round"/>
  <text x="252" y="176" font-family="monospace" font-size="18" font-weight="bold" fill="${AMBER}" text-anchor="middle">r</text>

  <circle cx="305" cy="185" r="13" fill="#ffffff" stroke="${INK}" stroke-width="3"/>

  <line x1="305" y1="185" x2="305" y2="92" stroke="${BLUE}" stroke-width="7" stroke-linecap="round" marker-end="url(#ar-blue)"/>
  <text x="322" y="122" font-family="monospace" font-size="20" font-weight="bold" fill="${BLUE}">v</text>

  <line x1="292" y1="185" x2="222" y2="185" stroke="${RED}" stroke-width="7" stroke-linecap="round" marker-end="url(#ar-red)"/>
  <text x="258" y="215" font-family="monospace" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">F</text>

  <rect x="370" y="80" width="172" height="62" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2"/>
  <text x="456" y="106" font-family="sans-serif" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">velocity v</text>
  <text x="456" y="128" font-family="sans-serif" font-size="13" fill="${BLUE}" text-anchor="middle">along the edge</text>

  <rect x="370" y="160" width="172" height="62" rx="12" fill="#fef2f2" stroke="${RED}" stroke-width="2"/>
  <text x="456" y="186" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}" text-anchor="middle">force F</text>
  <text x="456" y="208" font-family="sans-serif" font-size="13" fill="${RED}" text-anchor="middle">to the centre</text>

  <text x="280" y="300" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">Let go of the string and the ball flies off along the blue arrow.</text>
</svg>`,

  // Centripetal force is not a new force. It is whatever real force happens
  // to point at the centre — three examples, one rule.
  FORCE_PROVIDERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="660" height="300" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="330" y="34" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Which force does the centre-pulling job?</text>

  <rect x="24" y="56" width="196" height="200" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="122" cy="150" r="5" fill="${INK}"/>
  <line x1="122" y1="150" x2="196" y2="150" stroke="#94a3b8" stroke-width="3"/>
  <circle cx="196" cy="150" r="11" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <line x1="184" y1="150" x2="140" y2="150" stroke="${PURPLE}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-purple)"/>
  <text x="122" y="88" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">ball on a rope</text>
  <text x="122" y="200" font-family="sans-serif" font-size="13" font-weight="bold" fill="${PURPLE}" text-anchor="middle">tension pulls in</text>
  <text x="122" y="236" font-family="monospace" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">F = T</text>

  <rect x="232" y="56" width="196" height="200" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <path d="M 262 190 Q 330 100 398 190" fill="none" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
  <rect x="316" y="132" width="28" height="18" rx="4" fill="${INK}"/>
  <line x1="330" y1="152" x2="330" y2="192" stroke="${PURPLE}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-purple)"/>
  <text x="330" y="88" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">car on a bend</text>
  <text x="330" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="${PURPLE}" text-anchor="middle">friction pushes in</text>
  <text x="330" y="244" font-family="monospace" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">F = friction</text>

  <rect x="440" y="56" width="196" height="200" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="538" cy="160" r="30" fill="#dbeafe" stroke="${INK}" stroke-width="3"/>
  <circle cx="538" cy="160" r="70" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
  <circle cx="608" cy="160" r="7" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <line x1="600" y1="160" x2="574" y2="160" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-green)"/>
  <text x="538" y="88" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">satellite in orbit</text>
  <text x="538" y="246" font-family="monospace" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">F = gravity</text>

  <text x="330" y="284" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">Centripetal force is a JOB, not a new force. Find the force doing it.</text>
</svg>`,

  // A vertical circle: at the top, weight AND the rope both pull to the
  // centre; at the bottom they fight.
  VERTICAL_CIRCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 340" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="340" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">A bucket swung in a vertical circle</text>

  <circle cx="230" cy="190" r="100" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8 7"/>
  <circle cx="230" cy="190" r="5" fill="${INK}"/>

  <rect x="216" y="78" width="28" height="24" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <line x1="230" y1="104" x2="230" y2="150" stroke="${PURPLE}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-purple)"/>
  <text x="246" y="134" font-family="monospace" font-size="17" font-weight="bold" fill="${PURPLE}">T</text>
  <line x1="204" y1="104" x2="204" y2="150" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-green)"/>
  <text x="196" y="134" font-family="monospace" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="end">mg</text>

  <rect x="216" y="278" width="28" height="24" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <line x1="230" y1="276" x2="230" y2="230" stroke="${PURPLE}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-purple)"/>
  <text x="246" y="250" font-family="monospace" font-size="17" font-weight="bold" fill="${PURPLE}">T</text>
  <line x1="204" y1="304" x2="204" y2="332" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-green)"/>
  <text x="196" y="326" font-family="monospace" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="end">mg</text>

  <rect x="372" y="64" width="228" height="104" rx="12" fill="#fef2f2" stroke="${RED}" stroke-width="2"/>
  <text x="486" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}" text-anchor="middle">AT THE TOP</text>
  <text x="486" y="114" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">rope and weight both point</text>
  <text x="486" y="132" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">to the centre, so they ADD</text>
  <text x="486" y="158" font-family="monospace" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">T + mg = mv²/r</text>

  <rect x="372" y="196" width="228" height="104" rx="12" fill="#f0fdf4" stroke="${GREEN}" stroke-width="2"/>
  <text x="486" y="222" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">AT THE BOTTOM</text>
  <text x="486" y="246" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">rope points to the centre,</text>
  <text x="486" y="264" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">weight points away: SUBTRACT</text>
  <text x="486" y="290" font-family="monospace" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">T − mg = mv²/r</text>
</svg>`,

  // The slowest possible speed over the top: the rope (or track) does
  // nothing, so weight alone has to do the whole centre-pulling job.
  MIN_SPEED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 300" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="300" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Over the top of a loop, as slowly as possible</text>

  <path d="M 60 250 Q 60 100 200 100 Q 340 100 340 250" fill="none" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
  <circle cx="200" cy="190" r="5" fill="${INK}"/>
  <text x="200" y="214" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">centre</text>
  <rect x="184" y="112" width="32" height="20" rx="4" fill="${INK}"/>
  <line x1="200" y1="134" x2="200" y2="176" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-green)"/>
  <text x="214" y="160" font-family="monospace" font-size="17" font-weight="bold" fill="${GREEN}">mg</text>
  <text x="200" y="88" font-family="monospace" font-size="15" font-weight="bold" fill="${PURPLE}" text-anchor="middle">N = 0</text>

  <rect x="372" y="70" width="228" height="176" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="486" y="98" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">the track pushes with nothing,</text>
  <text x="486" y="118" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">so gravity alone must supply</text>
  <text x="486" y="138" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">the whole centripetal force</text>
  <text x="486" y="176" font-family="monospace" font-size="18" font-weight="bold" fill="${RED}" text-anchor="middle">mg = mv²/r</text>
  <text x="486" y="204" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">the m cancels</text>
  <text x="486" y="232" font-family="monospace" font-size="18" font-weight="bold" fill="${RED}" text-anchor="middle">v = √(g r)</text>

  <text x="310" y="280" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">Any slower and gravity pulls it off the track.</text>
</svg>`,

  // An orbit is a fall that keeps missing. r is from the centre of the planet.
  ORBIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="330" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">A satellite in a circular orbit</text>

  <circle cx="220" cy="190" r="62" fill="#dbeafe" stroke="${INK}" stroke-width="3"/>
  <text x="220" y="196" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>
  <circle cx="220" cy="190" r="118" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8 7"/>
  <circle cx="220" cy="190" r="5" fill="${INK}"/>

  <line x1="220" y1="190" x2="338" y2="190" stroke="${AMBER}" stroke-width="4" stroke-linecap="round"/>
  <text x="300" y="181" font-family="monospace" font-size="17" font-weight="bold" fill="${AMBER}" text-anchor="middle">r</text>

  <circle cx="338" cy="190" r="9" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <text x="338" y="222" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
  <line x1="338" y1="178" x2="338" y2="110" stroke="${BLUE}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-blue)"/>
  <text x="352" y="136" font-family="monospace" font-size="17" font-weight="bold" fill="${BLUE}">v</text>
  <line x1="327" y1="190" x2="290" y2="190" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-green)"/>

  <rect x="392" y="72" width="212" height="82" rx="12" fill="#fffbeb" stroke="${AMBER}" stroke-width="2"/>
  <text x="498" y="98" font-family="sans-serif" font-size="14" font-weight="bold" fill="${AMBER}" text-anchor="middle">r is from the CENTRE</text>
  <text x="498" y="120" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">of the planet, not from</text>
  <text x="498" y="140" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">the ground</text>

  <rect x="392" y="170" width="212" height="112" rx="12" fill="#f0fdf4" stroke="${GREEN}" stroke-width="2"/>
  <text x="498" y="196" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}" text-anchor="middle">gravity is the F</text>
  <text x="498" y="226" font-family="monospace" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">GMm/r² = mv²/r</text>
  <text x="498" y="248" font-family="sans-serif" font-size="12" fill="${MUTED}" text-anchor="middle">cancel one m and one r</text>
  <text x="498" y="272" font-family="monospace" font-size="16" font-weight="bold" fill="${RED}" text-anchor="middle">v = √(GM/r)</text>

  <text x="310" y="312" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">It is falling the whole time. It just keeps missing.</text>
</svg>`,

  // Why r is squared: twice as far away, a quarter of the pull.
  G_FIELD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 280" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="280" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Gravity weakens with the SQUARE of the distance</text>

  <circle cx="90" cy="160" r="46" fill="#dbeafe" stroke="${INK}" stroke-width="3"/>
  <text x="90" y="166" font-family="monospace" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>

  <line x1="90" y1="228" x2="250" y2="228" stroke="${AMBER}" stroke-width="3" stroke-linecap="round"/>
  <text x="170" y="250" font-family="monospace" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">r</text>
  <line x1="90" y1="258" x2="410" y2="258" stroke="${AMBER}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 5"/>
  <text x="250" y="276" font-family="monospace" font-size="15" font-weight="bold" fill="${AMBER}" text-anchor="middle">2r</text>

  <circle cx="250" cy="160" r="8" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <line x1="238" y1="160" x2="158" y2="160" stroke="${GREEN}" stroke-width="7" stroke-linecap="round" marker-end="url(#ar-green)"/>
  <text x="250" y="132" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">g</text>

  <circle cx="410" cy="160" r="8" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <line x1="398" y1="160" x2="378" y2="160" stroke="${GREEN}" stroke-width="7" stroke-linecap="round" marker-end="url(#ar-green)"/>
  <text x="410" y="132" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">g/4</text>

  <rect x="452" y="70" width="152" height="140" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="528" y="100" font-family="monospace" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">g = GM/r²</text>
  <text x="528" y="130" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">double r</text>
  <text x="528" y="150" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">→ r² is 4× bigger</text>
  <text x="528" y="170" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">→ g is 4× smaller</text>
  <text x="528" y="196" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}" text-anchor="middle">G = 6.67×10⁻¹¹</text>
</svg>`,

  // The period is just distance over speed — one lap is a circumference.
  PERIOD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 300" class="w-full h-full drop-shadow-md">
  ${ARROWS}
  <rect x="0" y="0" width="620" height="300" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">One lap takes a period, T</text>

  <circle cx="190" cy="172" r="96" fill="none" stroke="${BLUE}" stroke-width="6" stroke-dasharray="14 9"/>
  <circle cx="190" cy="172" r="5" fill="${INK}"/>
  <line x1="190" y1="172" x2="286" y2="172" stroke="${AMBER}" stroke-width="4" stroke-linecap="round"/>
  <text x="240" y="163" font-family="monospace" font-size="17" font-weight="bold" fill="${AMBER}" text-anchor="middle">r</text>
  <circle cx="286" cy="172" r="9" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <line x1="286" y1="160" x2="286" y2="108" stroke="${BLUE}" stroke-width="6" stroke-linecap="round" marker-end="url(#ar-blue)"/>
  <text x="300" y="130" font-family="monospace" font-size="17" font-weight="bold" fill="${BLUE}">v</text>

  <rect x="352" y="62" width="248" height="60" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2"/>
  <text x="476" y="86" font-family="sans-serif" font-size="13" font-weight="bold" fill="${BLUE}" text-anchor="middle">distance round once</text>
  <text x="476" y="110" font-family="monospace" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">2πr</text>

  <rect x="352" y="134" width="248" height="60" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="476" y="158" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">time = distance ÷ speed</text>
  <text x="476" y="182" font-family="monospace" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">T = 2πr / v</text>

  <rect x="352" y="206" width="248" height="60" rx="12" fill="#fef2f2" stroke="${RED}" stroke-width="2"/>
  <text x="476" y="230" font-family="sans-serif" font-size="13" font-weight="bold" fill="${RED}" text-anchor="middle">for an orbit, with v = √(GM/r)</text>
  <text x="476" y="254" font-family="monospace" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">T = 2π √(r³/GM)</text>

  <text x="190" y="290" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">T is in seconds — convert hours at the end</text>
</svg>`,
};
