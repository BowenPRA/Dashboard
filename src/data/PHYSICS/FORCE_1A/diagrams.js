// src/data/PHYSICS/FORCE_1A/diagrams.js
// Teaching diagrams for "Adding Force Vectors". House style: docs/svg-diagrams.md.
//
// One colour per idea, held across every diagram AND across the Vectors task and
// the VectorLab widget, so a student who learns "amber is the x-part" on a slide
// reads it the same way in the exercise:
//
//   #3b82f6 blue    force A / a single force
//   #a855f7 purple  force B
//   #10b981 green   the resultant
//   #f59e0b amber   every x-part
//   #ec4899 pink    every y-part
//   #ef4444 red     the wrong answer, named as wrong

export const DIAGRAMS = {
  // Same size, three directions — why a force needs two numbers, not one.
  NOTES_SIZE_AND_DIRECTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 280" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="fa-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
  </defs>
  <rect x="0" y="0" width="620" height="280" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="34" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1e293b" text-anchor="middle">All three forces are 50 N. They are not the same force.</text>

  <line x1="150" y1="180" x2="150" y2="80" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" marker-end="url(#fa-blue)"/>
  <circle cx="150" cy="180" r="6" fill="#1e293b"/>
  <text x="150" y="212" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">50 N</text>
  <text x="150" y="234" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">up</text>

  <line x1="290" y1="180" x2="390" y2="180" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" marker-end="url(#fa-blue)"/>
  <circle cx="290" cy="180" r="6" fill="#1e293b"/>
  <text x="340" y="212" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">50 N</text>
  <text x="340" y="234" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">right</text>

  <line x1="470" y1="180" x2="541" y2="109" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" marker-end="url(#fa-blue)"/>
  <circle cx="470" cy="180" r="6" fill="#1e293b"/>
  <text x="510" y="212" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">50 N</text>
  <text x="510" y="234" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">45 degrees</text>
</svg>`,

  // The idea the whole unit turns on: 3 and 4 at a right angle make 5, not 7.
  NOTES_WHY_NOT_ADD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 320" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="wa-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
    <marker id="wa-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7"/></marker>
    <marker id="wa-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
  </defs>
  <rect x="0" y="0" width="660" height="320" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="330" y="34" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1e293b" text-anchor="middle">A 4 N pull and a 3 N pull, at a right angle</text>

  <line x1="110" y1="250" x2="270" y2="250" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 5"/>
  <line x1="270" y1="250" x2="270" y2="130" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 5"/>
  <line x1="110" y1="130" x2="270" y2="130" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 5"/>

  <line x1="110" y1="250" x2="264" y2="250" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" marker-end="url(#wa-blue)"/>
  <line x1="110" y1="250" x2="110" y2="136" stroke="#a855f7" stroke-width="7" stroke-linecap="round" marker-end="url(#wa-purple)"/>
  <line x1="110" y1="250" x2="264" y2="136" stroke="#10b981" stroke-width="7" stroke-linecap="round" marker-end="url(#wa-green)"/>
  <circle cx="110" cy="250" r="7" fill="#1e293b"/>

  <text x="190" y="282" font-family="monospace" font-size="17" font-weight="bold" fill="#3b82f6" text-anchor="middle">4 N</text>
  <text x="94" y="196" font-family="monospace" font-size="17" font-weight="bold" fill="#a855f7" text-anchor="end">3 N</text>
  <text x="212" y="176" font-family="monospace" font-size="18" font-weight="bold" fill="#10b981" text-anchor="middle">5 N</text>

  <rect x="360" y="80" width="270" height="72" rx="14" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
  <text x="495" y="112" font-family="monospace" font-size="24" font-weight="bold" fill="#ef4444" text-anchor="middle">4 + 3 = 7 N</text>
  <line x1="405" y1="105" x2="585" y2="105" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
  <text x="495" y="138" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">only if they point the same way</text>

  <rect x="360" y="176" width="270" height="82" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <text x="495" y="212" font-family="monospace" font-size="23" font-weight="bold" fill="#10b981" text-anchor="middle">4² + 3² = 5²</text>
  <text x="495" y="240" font-family="sans-serif" font-size="14" font-weight="bold" fill="#10b981" text-anchor="middle">the arrows close a triangle</text>
</svg>`,

  // Tip to tail, in the three moves a student actually makes.
  NOTES_TIP_TO_TAIL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 320" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="tt-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
    <marker id="tt-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7"/></marker>
    <marker id="tt-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
    <marker id="tt-grey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/></marker>
  </defs>
  <rect x="0" y="0" width="820" height="320" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

  <rect x="14" y="52" width="252" height="248" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="140" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">1. Both start together</text>
  <line x1="60" y1="258" x2="155" y2="258" stroke="#3b82f6" stroke-width="6" stroke-linecap="round" marker-end="url(#tt-blue)"/>
  <line x1="60" y1="258" x2="96" y2="180" stroke="#a855f7" stroke-width="6" stroke-linecap="round" marker-end="url(#tt-purple)"/>
  <circle cx="60" cy="258" r="6" fill="#1e293b"/>
  <text x="115" y="284" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">A</text>
  <text x="64" y="196" font-family="monospace" font-size="16" font-weight="bold" fill="#a855f7" text-anchor="middle">B</text>

  <rect x="284" y="52" width="252" height="248" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="410" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">2. Slide B onto A's tip</text>
  <line x1="330" y1="258" x2="425" y2="258" stroke="#3b82f6" stroke-width="6" stroke-linecap="round" marker-end="url(#tt-blue)"/>
  <line x1="330" y1="258" x2="366" y2="180" stroke="#a855f7" stroke-width="4" stroke-linecap="round" opacity="0.25"/>
  <line x1="371" y1="178" x2="461" y2="178" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#tt-grey)"/>
  <line x1="430" y1="258" x2="466" y2="180" stroke="#a855f7" stroke-width="6" stroke-linecap="round" marker-end="url(#tt-purple)"/>
  <circle cx="330" cy="258" r="6" fill="#1e293b"/>
  <text x="385" y="284" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">A</text>
  <text x="478" y="222" font-family="monospace" font-size="16" font-weight="bold" fill="#a855f7" text-anchor="middle">B</text>

  <rect x="554" y="52" width="252" height="248" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="680" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">3. R closes the triangle</text>
  <line x1="600" y1="258" x2="695" y2="258" stroke="#3b82f6" stroke-width="6" stroke-linecap="round" marker-end="url(#tt-blue)"/>
  <line x1="700" y1="258" x2="736" y2="180" stroke="#a855f7" stroke-width="6" stroke-linecap="round" marker-end="url(#tt-purple)"/>
  <line x1="600" y1="258" x2="731" y2="182" stroke="#10b981" stroke-width="7" stroke-linecap="round" marker-end="url(#tt-green)"/>
  <circle cx="600" cy="258" r="6" fill="#1e293b"/>
  <text x="655" y="284" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">A</text>
  <text x="748" y="222" font-family="monospace" font-size="16" font-weight="bold" fill="#a855f7" text-anchor="middle">B</text>
  <text x="640" y="205" font-family="monospace" font-size="19" font-weight="bold" fill="#10b981" text-anchor="middle">R</text>
</svg>`,

  // The right triangle hiding inside every single force.
  NOTES_RIGHT_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="rt-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
  </defs>
  <rect x="0" y="0" width="640" height="340" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="320" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1e293b" text-anchor="middle">Every force hides a right triangle</text>

  <path d="M 100 280 L 340 280 L 340 105 Z" fill="#3b82f6" fill-opacity="0.08"/>
  <line x1="100" y1="280" x2="340" y2="280" stroke="#f59e0b" stroke-width="6" stroke-dasharray="11 7" stroke-linecap="round"/>
  <line x1="340" y1="280" x2="340" y2="105" stroke="#ec4899" stroke-width="6" stroke-dasharray="11 7" stroke-linecap="round"/>
  <line x1="100" y1="280" x2="334" y2="109" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" marker-end="url(#rt-blue)"/>
  <path d="M 316 280 L 316 262 L 340 262" fill="none" stroke="#64748b" stroke-width="2.5"/>
  <path d="M 160 280 A 60 60 0 0 0 143 237" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <circle cx="100" cy="280" r="7" fill="#1e293b"/>

  <text x="176" y="252" font-family="monospace" font-size="20" font-weight="bold" fill="#3b82f6" text-anchor="middle">F</text>
  <text x="141" y="272" font-family="monospace" font-size="18" font-weight="bold" fill="#3b82f6" text-anchor="middle">θ</text>
  <text x="220" y="311" font-family="monospace" font-size="19" font-weight="bold" fill="#f59e0b" text-anchor="middle">Fx</text>
  <text x="368" y="200" font-family="monospace" font-size="19" font-weight="bold" fill="#ec4899" text-anchor="middle">Fy</text>

  <rect x="410" y="96" width="205" height="64" rx="14" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
  <text x="512" y="136" font-family="monospace" font-size="22" font-weight="bold" fill="#d97706" text-anchor="middle">Fx = F cos θ</text>

  <rect x="410" y="176" width="205" height="64" rx="14" fill="#fdf2f8" stroke="#ec4899" stroke-width="2"/>
  <text x="512" y="216" font-family="monospace" font-size="22" font-weight="bold" fill="#ec4899" text-anchor="middle">Fy = F sin θ</text>

  <text x="512" y="268" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">θ turns from the +x axis</text>
</svg>`,

  // Add down the column. The table IS the method.
  NOTES_COLUMNS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 310" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="580" height="310" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="290" y="29" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1e293b" text-anchor="middle">Add straight down each column</text>

  <rect x="150" y="48" width="185" height="36" rx="10" fill="#f59e0b"/>
  <text x="242" y="73" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">x-part (N)</text>
  <rect x="345" y="48" width="185" height="36" rx="10" fill="#ec4899"/>
  <text x="437" y="73" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">y-part (N)</text>

  <rect x="52" y="96" width="44" height="44" rx="12" fill="#3b82f6"/>
  <text x="74" y="126" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
  <text x="242" y="128" font-family="monospace" font-size="24" font-weight="bold" fill="#1e293b" text-anchor="middle">51.96</text>
  <text x="437" y="128" font-family="monospace" font-size="24" font-weight="bold" fill="#1e293b" text-anchor="middle">30.00</text>

  <text x="112" y="186" font-family="monospace" font-size="26" font-weight="bold" fill="#64748b" text-anchor="middle">+</text>
  <rect x="52" y="156" width="44" height="44" rx="12" fill="#a855f7"/>
  <text x="74" y="186" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>
  <text x="242" y="188" font-family="monospace" font-size="24" font-weight="bold" fill="#1e293b" text-anchor="middle">-13.68</text>
  <text x="437" y="188" font-family="monospace" font-size="24" font-weight="bold" fill="#1e293b" text-anchor="middle">37.59</text>

  <line x1="150" y1="212" x2="530" y2="212" stroke="#334155" stroke-width="3" stroke-linecap="round"/>

  <rect x="52" y="228" width="44" height="44" rx="12" fill="#10b981"/>
  <text x="74" y="258" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">R</text>
  <text x="242" y="260" font-family="monospace" font-size="25" font-weight="bold" fill="#f59e0b" text-anchor="middle">38.28</text>
  <text x="437" y="260" font-family="monospace" font-size="25" font-weight="bold" fill="#ec4899" text-anchor="middle">67.59</text>

  <text x="290" y="294" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">A negative x-part means that force pulls to the left.</text>
</svg>`,

  // Turning Rx and Ry back into a size and a direction.
  NOTES_REBUILD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 320" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="rb-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
  </defs>
  <rect x="0" y="0" width="660" height="320" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="330" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1e293b" text-anchor="middle">Rebuild the resultant from its two parts</text>

  <path d="M 70 262 L 262 262 L 262 118 Z" fill="#10b981" fill-opacity="0.09"/>
  <line x1="70" y1="262" x2="262" y2="262" stroke="#f59e0b" stroke-width="6" stroke-dasharray="11 7" stroke-linecap="round"/>
  <line x1="262" y1="262" x2="262" y2="118" stroke="#ec4899" stroke-width="6" stroke-dasharray="11 7" stroke-linecap="round"/>
  <line x1="70" y1="262" x2="257" y2="122" stroke="#10b981" stroke-width="7" stroke-linecap="round" marker-end="url(#rb-green)"/>
  <path d="M 240 262 L 240 244 L 262 244" fill="none" stroke="#64748b" stroke-width="2.5"/>
  <path d="M 124 262 A 54 54 0 0 0 111 224" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <circle cx="70" cy="262" r="7" fill="#1e293b"/>

  <text x="166" y="292" font-family="monospace" font-size="17" font-weight="bold" fill="#f59e0b" text-anchor="middle">Rx = 38.3</text>
  <text x="278" y="196" font-family="monospace" font-size="17" font-weight="bold" fill="#ec4899" text-anchor="start">Ry = 67.6</text>
  <text x="132" y="182" font-family="monospace" font-size="19" font-weight="bold" fill="#10b981" text-anchor="middle">R</text>
  <text x="110" y="252" font-family="monospace" font-size="16" font-weight="bold" fill="#10b981" text-anchor="middle">θ</text>

  <rect x="410" y="72" width="228" height="88" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <text x="524" y="104" font-family="monospace" font-size="17" font-weight="bold" fill="#059669" text-anchor="middle">R = √(Rx² + Ry²)</text>
  <text x="524" y="138" font-family="monospace" font-size="22" font-weight="bold" fill="#059669" text-anchor="middle">= 77.7 N</text>

  <rect x="410" y="180" width="228" height="88" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="524" y="212" font-family="monospace" font-size="17" font-weight="bold" fill="#2563eb" text-anchor="middle">θ = tan⁻¹(Ry / Rx)</text>
  <text x="524" y="246" font-family="monospace" font-size="22" font-weight="bold" fill="#2563eb" text-anchor="middle">= 60.5°</text>
</svg>`,

  // The quadrant trap: tan⁻¹ cannot tell two opposite directions apart.
  NOTES_QUADRANT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 330" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="qd-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
    <marker id="qd-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/></marker>
  </defs>
  <rect x="0" y="0" width="620" height="330" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="32" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1e293b" text-anchor="middle">Same tan⁻¹, opposite directions</text>

  <line x1="60" y1="180" x2="360" y2="180" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="210" y1="56" x2="210" y2="304" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="210" y1="180" x2="316" y2="110" stroke="#10b981" stroke-width="6" stroke-linecap="round" marker-end="url(#qd-green)"/>
  <line x1="210" y1="180" x2="104" y2="250" stroke="#ef4444" stroke-width="6" stroke-linecap="round" marker-end="url(#qd-red)"/>
  <circle cx="210" cy="180" r="6" fill="#1e293b"/>

  <text x="326" y="96" font-family="monospace" font-size="15" font-weight="bold" fill="#10b981" text-anchor="middle">33.4°</text>
  <text x="96" y="278" font-family="monospace" font-size="15" font-weight="bold" fill="#ef4444" text-anchor="middle">213.4°</text>
  <text x="310" y="322" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Rx and Ry both negative puts the force down-left.</text>

  <rect x="392" y="72" width="212" height="90" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <text x="498" y="102" font-family="monospace" font-size="18" font-weight="bold" fill="#059669" text-anchor="middle">Rx = +6, Ry = +4</text>
  <text x="498" y="136" font-family="monospace" font-size="20" font-weight="bold" fill="#059669" text-anchor="middle">θ = 33.4°</text>

  <rect x="392" y="182" width="212" height="90" rx="14" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
  <text x="498" y="212" font-family="monospace" font-size="18" font-weight="bold" fill="#dc2626" text-anchor="middle">Rx = -6, Ry = -4</text>
  <text x="498" y="246" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" text-anchor="middle">θ = 213.4°</text>
</svg>`,
};
