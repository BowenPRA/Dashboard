// src/data/GED_SCIENCE/SCI_1B/diagrams.js
// Authored SVG sources for SCI_1B (Ecosystems, Energy Flow & Heredity). Every
// label is a literal <text> so audit:svg can measure it. Diagrams render on
// white — dark ink on light fills, palette from docs/svg-diagrams.md.

export const DIAGRAMS = {
  // A grassland food web. Arrows point from the food to the eater (energy flow).
  // Grass → grasshopper, rabbit, mouse · grasshopper → frog · frog → snake ·
  // mouse → snake, fox · rabbit → fox · snake → hawk.
  FOOD_WEB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <defs>
    <marker id="fw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="20" y="20" font-family="sans-serif" font-size="14" fill="#64748b">Arrow = energy flows from the food to the eater</text>

  <line x1="220" y1="292" x2="105" y2="250" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="260" y1="292" x2="260" y2="250" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="300" y1="292" x2="415" y2="250" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="90" y1="212" x2="90" y2="160" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="145" y1="140" x2="203" y2="140" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="385" y1="212" x2="319" y2="160" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="430" y1="212" x2="430" y2="160" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="315" y1="222" x2="378" y2="162" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>
  <line x1="260" y1="122" x2="260" y2="70" stroke="#334155" stroke-width="3" marker-end="url(#fw-arrow)"/>

  <rect x="205" y="292" width="110" height="36" rx="10" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
  <text x="260" y="316" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Grass</text>
  <rect x="35" y="212" width="110" height="36" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="90" y="236" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">Grasshopper</text>
  <rect x="205" y="212" width="110" height="36" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="260" y="236" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Rabbit</text>
  <rect x="375" y="212" width="110" height="36" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="430" y="236" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Mouse</text>
  <rect x="35" y="122" width="110" height="36" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="90" y="146" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Frog</text>
  <rect x="205" y="122" width="110" height="36" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="260" y="146" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Snake</text>
  <rect x="375" y="122" width="110" height="36" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="430" y="146" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Fox</text>
  <rect x="205" y="32" width="110" height="36" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
  <text x="260" y="56" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Hawk</text>
  <text x="440" y="345" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Green = producer</text>
</svg>`,

  // Energy pyramid with numbers: 10,000 → 1,000 → 100 → 10 units.
  ENERGY_PYRAMID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="24" font-family="sans-serif" font-size="15" font-weight="700" fill="#64748b" text-anchor="middle">Only about 10% of the energy passes up to the next level</text>

  <polygon points="40,340 480,340 430,270 90,270" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
  <polygon points="90,262 430,262 380,192 140,192" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <polygon points="140,184 380,184 330,114 190,114" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="190,106 330,106 290,40 230,40" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>

  <text x="260" y="300" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Grass (producers)</text>
  <text x="260" y="322" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">10,000 units</text>
  <text x="260" y="222" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Grasshoppers</text>
  <text x="260" y="244" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">1,000 units</text>
  <text x="260" y="144" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Frogs</text>
  <text x="260" y="166" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">100 units</text>
  <text x="260" y="66" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">Snakes</text>
  <text x="260" y="88" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">10 units</text>

  <text x="470" y="200" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">90% lost</text>
  <text x="470" y="218" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">as heat</text>
  <text x="470" y="236" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">and waste</text>
</svg>`,

  // Worked Punnett square for the notes: Aa × Aa → AA, Aa, Aa, aa (3 : 1).
  PUNNETT_AA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="200" y="26" font-family="sans-serif" font-size="17" font-weight="800" fill="#1e293b" text-anchor="middle">Aa  ×  Aa</text>
  <text x="200" y="58" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Parent 1 across the top</text>
  <text x="200" y="92" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">A</text>
  <text x="300" y="92" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">a</text>
  <text x="120" y="160" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">A</text>
  <text x="120" y="260" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">a</text>
  <text x="56" y="210" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle" transform="rotate(-90 56 210)">Parent 2 down the side</text>

  <rect x="150" y="104" width="100" height="100" fill="#f3e8ff" stroke="#1e293b" stroke-width="2"/>
  <rect x="250" y="104" width="100" height="100" fill="#f3e8ff" stroke="#1e293b" stroke-width="2"/>
  <rect x="150" y="204" width="100" height="100" fill="#f3e8ff" stroke="#1e293b" stroke-width="2"/>
  <rect x="250" y="204" width="100" height="100" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
  <text x="200" y="164" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">AA</text>
  <text x="300" y="164" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">Aa</text>
  <text x="200" y="264" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">Aa</text>
  <text x="300" y="264" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">aa</text>

  <rect x="380" y="120" width="16" height="16" fill="#f3e8ff" stroke="#1e293b" stroke-width="2"/>
  <text x="404" y="133" font-family="sans-serif" font-size="14" fill="#1e293b">Purple: 3 of 4</text>
  <rect x="380" y="150" width="16" height="16" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
  <text x="404" y="163" font-family="sans-serif" font-size="14" fill="#1e293b">White: 1 of 4</text>
  <text x="380" y="198" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b">A = purple</text>
  <text x="380" y="215" font-family="sans-serif" font-size="14" fill="#64748b">(dominant)</text>
  <text x="380" y="240" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b">a = white</text>
  <text x="380" y="257" font-family="sans-serif" font-size="14" fill="#64748b">(recessive)</text>
  <text x="380" y="290" font-family="sans-serif" font-size="14" fill="#64748b">Ratio 3 : 1</text>
  <text x="250" y="340" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Only aa shows the recessive trait</text>
</svg>`,

  // Source Analysis Punnett square: Aa × aa, already filled in. The student
  // must READ the grid — the outcome is not the 3 : 1 from the notes.
  PUNNETT_AA_X_AA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="200" y="26" font-family="sans-serif" font-size="17" font-weight="800" fill="#1e293b" text-anchor="middle">Aa  ×  aa</text>
  <text x="200" y="58" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Parent 1 across the top</text>
  <text x="200" y="92" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">A</text>
  <text x="300" y="92" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">a</text>
  <text x="120" y="160" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">a</text>
  <text x="120" y="260" font-family="monospace" font-size="24" font-weight="700" fill="#1e293b" text-anchor="middle">a</text>
  <text x="56" y="210" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle" transform="rotate(-90 56 210)">Parent 2 down the side</text>

  <rect x="150" y="104" width="100" height="100" fill="#f3e8ff" stroke="#1e293b" stroke-width="2"/>
  <rect x="250" y="104" width="100" height="100" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
  <rect x="150" y="204" width="100" height="100" fill="#f3e8ff" stroke="#1e293b" stroke-width="2"/>
  <rect x="250" y="204" width="100" height="100" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
  <text x="200" y="164" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">Aa</text>
  <text x="300" y="164" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">aa</text>
  <text x="200" y="264" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">Aa</text>
  <text x="300" y="264" font-family="monospace" font-size="28" font-weight="700" fill="#1e293b" text-anchor="middle">aa</text>

  <text x="380" y="124" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b">A = brown fur</text>
  <text x="380" y="141" font-family="sans-serif" font-size="14" fill="#64748b">(dominant)</text>
  <text x="380" y="166" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b">a = white fur</text>
  <text x="380" y="183" font-family="sans-serif" font-size="14" fill="#64748b">(recessive)</text>
  <rect x="380" y="210" width="16" height="16" fill="#f3e8ff" stroke="#1e293b" stroke-width="2"/>
  <text x="404" y="223" font-family="sans-serif" font-size="14" fill="#1e293b">shows brown</text>
  <rect x="380" y="240" width="16" height="16" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
  <text x="404" y="253" font-family="sans-serif" font-size="14" fill="#1e293b">shows white</text>
</svg>`,

  // Predator–prey cycles: prey (hares, blue) peak first, predators (lynx, red)
  // peak a year or two later, then both fall. Population in hundreds.
  PREDATOR_PREY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="280" y="24" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Hares and Lynx in One Forest</text>

  <line x1="70" y1="256" x2="490" y2="256" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="202" x2="490" y2="202" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="148" x2="490" y2="148" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="94" x2="490" y2="94" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="40" x2="490" y2="40" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="140" y1="40" x2="140" y2="310" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="210" y1="40" x2="210" y2="310" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="280" y1="40" x2="280" y2="310" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="350" y1="40" x2="350" y2="310" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="420" y1="40" x2="420" y2="310" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="490" y1="40" x2="490" y2="310" stroke="#e2e8f0" stroke-width="1"/>

  <line x1="70" y1="40" x2="70" y2="310" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="310" x2="490" y2="310" stroke="#334155" stroke-width="3"/>

  <text x="60" y="315" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">0</text>
  <text x="60" y="261" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">20</text>
  <text x="60" y="207" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">40</text>
  <text x="60" y="153" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">60</text>
  <text x="60" y="99" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">80</text>
  <text x="60" y="45" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">100</text>
  <text x="70" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">0</text>
  <text x="140" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">2</text>
  <text x="210" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">4</text>
  <text x="280" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">6</text>
  <text x="350" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">8</text>
  <text x="420" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">10</text>
  <text x="490" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">12</text>
  <text x="280" y="358" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Years</text>
  <text x="20" y="175" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 20 175)">Population (hundreds)</text>

  <polyline points="70,202 105,148 140,80 175,121 210,202 245,242 280,215 315,148 350,80 385,134 420,202 455,242 490,215" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round"/>
  <polyline points="70,269 105,269 140,242 175,202 210,215 245,242 280,269 315,269 350,242 385,202 420,215 455,251 490,269" fill="none" stroke="#ef4444" stroke-width="4" stroke-linejoin="round" stroke-dasharray="8 5"/>

  <line x1="160" y1="52" x2="190" y2="52" stroke="#3b82f6" stroke-width="4"/>
  <text x="198" y="57" font-family="sans-serif" font-size="14" font-weight="700" fill="#3b82f6">Hares (prey)</text>
  <line x1="160" y1="74" x2="190" y2="74" stroke="#ef4444" stroke-width="4" stroke-dasharray="8 5"/>
  <text x="198" y="79" font-family="sans-serif" font-size="14" font-weight="700" fill="#ef4444">Lynx (predator)</text>
</svg>`,
};
