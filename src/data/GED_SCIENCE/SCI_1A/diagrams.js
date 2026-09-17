// src/data/GED_SCIENCE/SCI_1A/diagrams.js
// Authored SVG sources for SCI_1A (Cells & the Human Body). Every label is a
// literal <text> so audit:svg can measure it. Diagrams render on white — dark
// ink on light fills, palette from docs/svg-diagrams.md.

export const DIAGRAMS = {
  // Plant cell (left) beside an animal cell (right). The legend names each part
  // by colour but does NOT say which cell has it — the student compares.
  CELLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
  <rect x="0" y="0" width="600" height="400" fill="#ffffff" rx="10"/>
  <text x="150" y="28" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Plant cell</text>
  <text x="450" y="28" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Animal cell</text>

  <rect x="50" y="42" width="200" height="230" rx="14" fill="#dcfce7" stroke="#15803d" stroke-width="9"/>
  <rect x="64" y="56" width="172" height="202" rx="10" fill="#f0fdf4" stroke="#1e293b" stroke-width="2"/>
  <circle cx="150" cy="150" r="34" fill="#c4b5fd" stroke="#6d28d9" stroke-width="3"/>
  <ellipse cx="98" cy="96" rx="18" ry="10" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="205" cy="104" rx="18" ry="10" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="96" cy="212" rx="18" ry="10" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="204" cy="222" rx="18" ry="10" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="150" cy="226" rx="16" ry="9" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
  <ellipse cx="102" cy="150" rx="16" ry="9" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>

  <ellipse cx="450" cy="157" rx="112" ry="100" fill="#f0fdf4" stroke="#1e293b" stroke-width="2"/>
  <circle cx="450" cy="150" r="34" fill="#c4b5fd" stroke="#6d28d9" stroke-width="3"/>
  <ellipse cx="392" cy="120" rx="16" ry="9" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
  <ellipse cx="508" cy="118" rx="16" ry="9" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
  <ellipse cx="450" cy="222" rx="16" ry="9" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
  <ellipse cx="392" cy="200" rx="16" ry="9" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>

  <rect x="30" y="296" width="14" height="14" fill="#c4b5fd" stroke="#6d28d9" stroke-width="2"/>
  <text x="52" y="308" font-family="sans-serif" font-size="14" fill="#1e293b">Nucleus: controls the cell, holds DNA</text>
  <rect x="30" y="326" width="14" height="14" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
  <text x="52" y="338" font-family="sans-serif" font-size="14" fill="#1e293b">Mitochondria: release energy from food</text>
  <rect x="30" y="356" width="14" height="14" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <text x="52" y="368" font-family="sans-serif" font-size="14" fill="#1e293b">Chloroplast: makes food from sunlight</text>
  <rect x="318" y="296" width="14" height="14" fill="#dcfce7" stroke="#15803d" stroke-width="4"/>
  <text x="340" y="308" font-family="sans-serif" font-size="14" fill="#1e293b">Cell wall: stiff outer layer</text>
  <rect x="318" y="326" width="14" height="14" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
  <text x="340" y="338" font-family="sans-serif" font-size="14" fill="#1e293b">Membrane: controls what goes in/out</text>
  <rect x="318" y="356" width="14" height="14" fill="#f0fdf4" stroke="#94a3b8" stroke-width="1"/>
  <text x="340" y="368" font-family="sans-serif" font-size="14" fill="#1e293b">Cytoplasm: the jelly inside</text>
</svg>`,

  // The double loop: heart ↔ lungs and heart ↔ body. Red = oxygen-rich,
  // blue = oxygen-poor. Arrows point the way the blood flows.
  HEART_LUNGS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <defs>
    <marker id="hl-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/>
    </marker>
    <marker id="hl-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
    </marker>
  </defs>
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="260" y="24" font-family="sans-serif" font-size="15" font-weight="700" fill="#64748b" text-anchor="middle">Air: oxygen in, carbon dioxide out</text>

  <rect x="190" y="36" width="140" height="56" rx="12" fill="#eff6ff" stroke="#1e293b" stroke-width="2"/>
  <text x="260" y="70" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Lungs</text>
  <rect x="190" y="162" width="140" height="56" rx="12" fill="#fef2f2" stroke="#1e293b" stroke-width="2"/>
  <text x="260" y="196" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Heart</text>
  <rect x="190" y="288" width="140" height="56" rx="12" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
  <text x="260" y="322" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Body cells</text>

  <path d="M 330 190 L 372 190 L 372 64 L 336 64" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" marker-end="url(#hl-blue)"/>
  <path d="M 190 64 L 148 64 L 148 190 L 184 190" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round" marker-end="url(#hl-red)"/>
  <path d="M 330 316 L 372 316 L 372 190 L 336 190" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" marker-end="url(#hl-blue)"/>
  <path d="M 190 190 L 148 190 L 148 316 L 184 316" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round" marker-end="url(#hl-red)"/>

  <text x="384" y="118" font-family="sans-serif" font-size="14" font-weight="700" fill="#3b82f6">Oxygen-poor blood</text>
  <text x="384" y="136" font-family="sans-serif" font-size="14" fill="#3b82f6">to the lungs</text>
  <text x="136" y="118" font-family="sans-serif" font-size="14" font-weight="700" fill="#ef4444" text-anchor="end">Oxygen-rich blood</text>
  <text x="136" y="136" font-family="sans-serif" font-size="14" fill="#ef4444" text-anchor="end">back to the heart</text>
  <text x="384" y="246" font-family="sans-serif" font-size="14" font-weight="700" fill="#3b82f6">Oxygen-poor blood</text>
  <text x="384" y="264" font-family="sans-serif" font-size="14" fill="#3b82f6">carrying carbon</text>
  <text x="384" y="282" font-family="sans-serif" font-size="14" fill="#3b82f6">dioxide</text>
  <text x="136" y="246" font-family="sans-serif" font-size="14" font-weight="700" fill="#ef4444" text-anchor="end">Oxygen-rich blood</text>
  <text x="136" y="264" font-family="sans-serif" font-size="14" fill="#ef4444" text-anchor="end">to the body</text>
  <text x="260" y="368" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Red = rich in oxygen · Blue = low in oxygen</text>
</svg>`,

  // Two food labels side by side, drawn as a table. We own the numbers.
  FOOD_LABEL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 380" class="w-full h-full">
  <rect x="0" y="0" width="540" height="380" fill="#ffffff" rx="10"/>
  <text x="270" y="28" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Nutrition Facts (per serving)</text>

  <rect x="20" y="44" width="160" height="48" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="180" y="44" width="170" height="48" fill="#fef3c7" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="350" y="44" width="170" height="48" fill="#dbeafe" stroke="#cbd5e1" stroke-width="1"/>
  <text x="265" y="64" font-family="sans-serif" font-size="15" font-weight="800" fill="#1e293b" text-anchor="middle">Snack A</text>
  <text x="265" y="84" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Candy bar</text>
  <text x="435" y="64" font-family="sans-serif" font-size="15" font-weight="800" fill="#1e293b" text-anchor="middle">Snack B</text>
  <text x="435" y="84" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Plain yogurt cup</text>

  <rect x="20" y="92" width="160" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="180" y="92" width="170" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="350" y="92" width="170" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="30" y="120" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Serving size</text>
  <text x="265" y="120" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">1 bar (50 g)</text>
  <text x="435" y="120" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">1 cup (170 g)</text>

  <rect x="20" y="136" width="160" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="180" y="136" width="170" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="350" y="136" width="170" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <text x="30" y="164" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Calories</text>
  <text x="265" y="164" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">250</text>
  <text x="435" y="164" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">150</text>

  <rect x="20" y="180" width="160" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="180" y="180" width="170" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="350" y="180" width="170" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="30" y="208" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Total fat</text>
  <text x="265" y="208" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">12 g</text>
  <text x="435" y="208" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">3 g</text>

  <rect x="20" y="224" width="160" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="180" y="224" width="170" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="350" y="224" width="170" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <text x="30" y="252" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Sugar</text>
  <text x="265" y="252" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">27 g</text>
  <text x="435" y="252" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">12 g</text>

  <rect x="20" y="268" width="160" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="180" y="268" width="170" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="350" y="268" width="170" height="44" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="30" y="296" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Protein</text>
  <text x="265" y="296" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">3 g</text>
  <text x="435" y="296" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">12 g</text>

  <rect x="20" y="312" width="160" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="180" y="312" width="170" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="350" y="312" width="170" height="44" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <text x="30" y="340" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Calcium</text>
  <text x="265" y="340" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">2% daily</text>
  <text x="435" y="340" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">30% daily</text>
</svg>`,

  // Blood sugar after a meal: rises, peaks at ~1 h, falls back to the start.
  // Points: 0 h 90 · 0.5 h 130 · 1 h 140 · 1.5 h 120 · 2 h 100 · 3 h 90 (mg/dL).
  BLOOD_SUGAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="280" y="26" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Blood Sugar After a Meal</text>

  <line x1="70" y1="256" x2="490" y2="256" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="202" x2="490" y2="202" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="148" x2="490" y2="148" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="94" x2="490" y2="94" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="40" x2="490" y2="40" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="210" y1="40" x2="210" y2="310" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="350" y1="40" x2="350" y2="310" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="490" y1="40" x2="490" y2="310" stroke="#e2e8f0" stroke-width="1"/>

  <line x1="70" y1="40" x2="70" y2="310" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="310" x2="490" y2="310" stroke="#334155" stroke-width="3"/>

  <text x="60" y="315" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">60</text>
  <text x="60" y="261" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">80</text>
  <text x="60" y="207" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">100</text>
  <text x="60" y="153" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">120</text>
  <text x="60" y="99" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">140</text>
  <text x="60" y="45" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">160</text>
  <text x="70" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">0</text>
  <text x="210" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">1</text>
  <text x="350" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">2</text>
  <text x="490" y="332" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">3</text>
  <text x="280" y="358" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Hours after eating</text>
  <text x="20" y="175" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 20 175)">Blood sugar (mg/dL)</text>

  <polyline points="70,229 140,121 210,94 280,148 350,202 490,229" fill="none" stroke="#ef4444" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="70" cy="229" r="6" fill="#ef4444"/>
  <circle cx="140" cy="121" r="6" fill="#ef4444"/>
  <circle cx="210" cy="94" r="6" fill="#ef4444"/>
  <circle cx="280" cy="148" r="6" fill="#ef4444"/>
  <circle cx="350" cy="202" r="6" fill="#ef4444"/>
  <circle cx="490" cy="229" r="6" fill="#ef4444"/>
  <text x="92" y="222" font-family="sans-serif" font-size="14" font-weight="700" fill="#64748b">Meal eaten</text>
  <text x="240" y="84" font-family="sans-serif" font-size="14" font-weight="700" fill="#ef4444">Peak: 140</text>
</svg>`,
};
