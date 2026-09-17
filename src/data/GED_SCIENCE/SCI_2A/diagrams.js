// src/data/GED_SCIENCE/SCI_2A/diagrams.js
// Authored SVGs for Matter, Atoms & Chemical Reactions. We own every number,
// so the mark schemes are exact. Literal <text> labels so audit:svg can see
// them. Dark ink on light fills — these render on white, not theme-flipped.

export const DIAGRAMS = {
  // A heating curve for water: solid → melting → liquid → boiling → gas.
  HEATING_CURVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="270" y="26" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Heating Ice Until It Boils</text>
  <line x1="70" y1="40" x2="70" y2="320" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="320" x2="500" y2="320" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="280" x2="500" y2="280" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="80" x2="500" y2="80" stroke="#e2e8f0" stroke-width="1"/>
  <text x="60" y="325" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">-20</text>
  <text x="60" y="285" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">0</text>
  <text x="60" y="85" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">100</text>
  <polyline points="70,320 130,280 210,280 350,80 430,80 490,50" fill="none" stroke="#ef4444" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
  <text x="170" y="266" font-family="sans-serif" font-size="14" font-weight="700" fill="#3b82f6" text-anchor="middle">melting</text>
  <text x="390" y="66" font-family="sans-serif" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="middle">boiling</text>
  <text x="100" y="250" font-family="sans-serif" font-size="14" font-weight="700" fill="#64748b" text-anchor="middle">solid</text>
  <text x="280" y="210" font-family="sans-serif" font-size="14" font-weight="700" fill="#64748b" text-anchor="middle">liquid</text>
  <text x="470" y="110" font-family="sans-serif" font-size="14" font-weight="700" fill="#64748b" text-anchor="middle">gas</text>
  <text x="285" y="350" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Time (minutes)</text>
  <text x="22" y="180" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 22 180)">Temperature (°C)</text>
</svg>`,

  // Particle picture of the three states.
  PARTICLES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
  <rect x="0" y="0" width="520" height="300" fill="#ffffff" rx="10"/>
  <text x="260" y="28" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Particles in the Three States</text>
  <rect x="20" y="50" width="150" height="160" fill="#eff6ff" stroke="#3b82f6" stroke-width="3" rx="8"/>
  <rect x="185" y="50" width="150" height="160" fill="#f0fdf4" stroke="#10b981" stroke-width="3" rx="8"/>
  <rect x="350" y="50" width="150" height="160" fill="#fffbeb" stroke="#f59e0b" stroke-width="3" rx="8"/>
  <g fill="#3b82f6">
    <circle cx="45" cy="80" r="10"/><circle cx="75" cy="80" r="10"/><circle cx="105" cy="80" r="10"/><circle cx="135" cy="80" r="10"/>
    <circle cx="45" cy="110" r="10"/><circle cx="75" cy="110" r="10"/><circle cx="105" cy="110" r="10"/><circle cx="135" cy="110" r="10"/>
    <circle cx="45" cy="140" r="10"/><circle cx="75" cy="140" r="10"/><circle cx="105" cy="140" r="10"/><circle cx="135" cy="140" r="10"/>
    <circle cx="45" cy="170" r="10"/><circle cx="75" cy="170" r="10"/><circle cx="105" cy="170" r="10"/><circle cx="135" cy="170" r="10"/>
  </g>
  <g fill="#10b981">
    <circle cx="210" cy="90" r="10"/><circle cx="240" cy="78" r="10"/><circle cx="272" cy="95" r="10"/><circle cx="305" cy="82" r="10"/>
    <circle cx="222" cy="122" r="10"/><circle cx="255" cy="115" r="10"/><circle cx="290" cy="128" r="10"/><circle cx="318" cy="112" r="10"/>
    <circle cx="208" cy="158" r="10"/><circle cx="242" cy="150" r="10"/><circle cx="270" cy="166" r="10"/><circle cx="306" cy="155" r="10"/>
    <circle cx="228" cy="190" r="10"/><circle cx="262" cy="193" r="10"/><circle cx="298" cy="188" r="10"/>
  </g>
  <g fill="#f59e0b">
    <circle cx="380" cy="85" r="10"/><circle cx="470" cy="70" r="10"/><circle cx="430" cy="130" r="10"/><circle cx="375" cy="180" r="10"/><circle cx="475" cy="175" r="10"/>
    <line x1="392" y1="78" x2="412" y2="66" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
    <line x1="458" y1="82" x2="442" y2="100" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
    <line x1="442" y1="140" x2="460" y2="156" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
    <line x1="387" y1="170" x2="405" y2="152" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
  </g>
  <text x="95" y="240" font-family="sans-serif" font-size="17" font-weight="800" fill="#1e40af" text-anchor="middle">Solid</text>
  <text x="260" y="240" font-family="sans-serif" font-size="17" font-weight="800" fill="#047857" text-anchor="middle">Liquid</text>
  <text x="425" y="240" font-family="sans-serif" font-size="17" font-weight="800" fill="#b45309" text-anchor="middle">Gas</text>
  <text x="95" y="265" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">fixed, vibrate</text>
  <text x="260" y="265" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">close, can slide</text>
  <text x="425" y="265" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">far apart, fast</text>
</svg>`,

  // The pH scale 0–14 with household examples.
  PH_SCALE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 330" class="w-full h-full">
  <rect x="0" y="0" width="520" height="330" fill="#ffffff" rx="10"/>
  <text x="260" y="28" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">The pH Scale</text>
  <text x="125" y="62" font-family="sans-serif" font-size="15" font-weight="800" fill="#dc2626" text-anchor="middle">ACID</text>
  <text x="260" y="62" font-family="sans-serif" font-size="15" font-weight="800" fill="#15803d" text-anchor="middle">NEUTRAL</text>
  <text x="395" y="62" font-family="sans-serif" font-size="15" font-weight="800" fill="#1d4ed8" text-anchor="middle">BASE</text>
  <rect x="35" y="80" width="30" height="50" fill="#dc2626"/>
  <rect x="65" y="80" width="30" height="50" fill="#ea580c"/>
  <rect x="95" y="80" width="30" height="50" fill="#f97316"/>
  <rect x="125" y="80" width="30" height="50" fill="#f59e0b"/>
  <rect x="155" y="80" width="30" height="50" fill="#facc15"/>
  <rect x="185" y="80" width="30" height="50" fill="#a3e635"/>
  <rect x="215" y="80" width="30" height="50" fill="#84cc16"/>
  <rect x="245" y="80" width="30" height="50" fill="#22c55e"/>
  <rect x="275" y="80" width="30" height="50" fill="#14b8a6"/>
  <rect x="305" y="80" width="30" height="50" fill="#06b6d4"/>
  <rect x="335" y="80" width="30" height="50" fill="#0ea5e9"/>
  <rect x="365" y="80" width="30" height="50" fill="#3b82f6"/>
  <rect x="395" y="80" width="30" height="50" fill="#4f46e5"/>
  <rect x="425" y="80" width="30" height="50" fill="#7c3aed"/>
  <rect x="455" y="80" width="30" height="50" fill="#6b21a8"/>
  <rect x="35" y="80" width="450" height="50" fill="none" stroke="#334155" stroke-width="2"/>
  <g font-family="monospace" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">
    <text x="50" y="111">0</text><text x="80" y="111">1</text><text x="110" y="111">2</text><text x="140" y="111">3</text>
    <text x="170" y="111">4</text><text x="200" y="111">5</text><text x="230" y="111">6</text><text x="260" y="111">7</text>
    <text x="290" y="111">8</text><text x="320" y="111">9</text><text x="350" y="111">10</text><text x="380" y="111">11</text>
    <text x="410" y="111">12</text><text x="440" y="111">13</text><text x="470" y="111">14</text>
  </g>
  <line x1="110" y1="130" x2="110" y2="160" stroke="#64748b" stroke-width="2"/>
  <line x1="260" y1="130" x2="260" y2="160" stroke="#64748b" stroke-width="2"/>
  <line x1="350" y1="130" x2="350" y2="160" stroke="#64748b" stroke-width="2"/>
  <line x1="440" y1="130" x2="440" y2="160" stroke="#64748b" stroke-width="2"/>
  <line x1="140" y1="130" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
  <line x1="320" y1="130" x2="320" y2="220" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
  <g font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">
    <text x="110" y="180">Lemon juice</text><text x="110" y="198">pH 2</text>
    <text x="260" y="180">Pure water</text><text x="260" y="198">pH 7</text>
    <text x="350" y="180">Soap</text><text x="350" y="198">pH 10</text>
    <text x="440" y="180">Bleach</text><text x="440" y="198">pH 13</text>
    <text x="140" y="240">Vinegar</text><text x="140" y="258">pH 3</text>
    <text x="320" y="240">Baking soda</text><text x="320" y="258">pH 9</text>
  </g>
  <text x="260" y="305" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">Lower than 7 = acid · 7 = neutral · higher than 7 = base</text>
</svg>`,

  // Data table from a rate-of-reaction experiment (marble chips in acid).
  RATE_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" class="w-full h-full">
  <rect x="0" y="0" width="520" height="340" fill="#ffffff" rx="10"/>
  <text x="260" y="28" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Marble Chip in Acid: Time to Finish</text>
  <rect x="60" y="50" width="200" height="44" fill="#1e293b"/>
  <rect x="260" y="50" width="200" height="44" fill="#1e293b"/>
  <text x="160" y="78" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Temperature (°C)</text>
  <text x="360" y="78" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Time to finish (s)</text>
  <rect x="60" y="94" width="200" height="40" fill="#f8fafc" stroke="#cbd5e1"/>
  <rect x="260" y="94" width="200" height="40" fill="#f8fafc" stroke="#cbd5e1"/>
  <rect x="60" y="134" width="200" height="40" fill="#ffffff" stroke="#cbd5e1"/>
  <rect x="260" y="134" width="200" height="40" fill="#ffffff" stroke="#cbd5e1"/>
  <rect x="60" y="174" width="200" height="40" fill="#f8fafc" stroke="#cbd5e1"/>
  <rect x="260" y="174" width="200" height="40" fill="#f8fafc" stroke="#cbd5e1"/>
  <rect x="60" y="214" width="200" height="40" fill="#ffffff" stroke="#cbd5e1"/>
  <rect x="260" y="214" width="200" height="40" fill="#ffffff" stroke="#cbd5e1"/>
  <g font-family="monospace" font-size="17" font-weight="700" fill="#1e293b" text-anchor="middle">
    <text x="160" y="121">20</text><text x="360" y="121">80</text>
    <text x="160" y="161">30</text><text x="360" y="161">40</text>
    <text x="160" y="201">40</text><text x="360" y="201">20</text>
    <text x="160" y="241">50</text><text x="360" y="241">10</text>
  </g>
  <text x="260" y="290" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">Kept the same: 1 chip of the same size, 50 mL of the same acid.</text>
  <text x="260" y="314" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">Changed: the temperature of the acid.</text>
</svg>`,

  // Two element tiles and the metal / non-metal split of the table.
  PERIODIC_MINI: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
  <rect x="0" y="0" width="520" height="300" fill="#ffffff" rx="10"/>
  <text x="260" y="28" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Reading an Element Tile</text>
  <rect x="60" y="50" width="150" height="150" fill="#eff6ff" stroke="#3b82f6" stroke-width="3" rx="10"/>
  <text x="75" y="78" font-family="monospace" font-size="18" font-weight="700" fill="#1e40af">11</text>
  <text x="135" y="140" font-family="sans-serif" font-size="52" font-weight="900" fill="#1e293b" text-anchor="middle">Na</text>
  <text x="135" y="180" font-family="sans-serif" font-size="16" font-weight="700" fill="#334155" text-anchor="middle">Sodium</text>
  <rect x="310" y="50" width="150" height="150" fill="#fef2f2" stroke="#ef4444" stroke-width="3" rx="10"/>
  <text x="325" y="78" font-family="monospace" font-size="18" font-weight="700" fill="#b91c1c">8</text>
  <text x="385" y="140" font-family="sans-serif" font-size="52" font-weight="900" fill="#1e293b" text-anchor="middle">O</text>
  <text x="385" y="180" font-family="sans-serif" font-size="16" font-weight="700" fill="#334155" text-anchor="middle">Oxygen</text>
  <text x="135" y="230" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e40af" text-anchor="middle">metal · left side</text>
  <text x="385" y="230" font-family="sans-serif" font-size="15" font-weight="700" fill="#b91c1c" text-anchor="middle">non-metal · right side</text>
  <text x="260" y="270" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">Top number = atomic number (protons). Big letters = symbol.</text>
</svg>`,

  // Counting atoms on both sides of 2H₂ + O₂ → 2H₂O.
  EQUATION_COUNT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
  <rect x="0" y="0" width="520" height="300" fill="#ffffff" rx="10"/>
  <text x="260" y="40" font-family="monospace" font-size="34" font-weight="900" fill="#1e293b" text-anchor="middle">2H₂ + O₂ → 2H₂O</text>
  <g fill="#3b82f6" stroke="#1e40af" stroke-width="2">
    <circle cx="60" cy="110" r="14"/><circle cx="90" cy="110" r="14"/>
    <circle cx="60" cy="150" r="14"/><circle cx="90" cy="150" r="14"/>
  </g>
  <g fill="#ef4444" stroke="#b91c1c" stroke-width="2">
    <circle cx="160" cy="130" r="18"/><circle cx="200" cy="130" r="18"/>
  </g>
  <text x="260" y="140" font-family="sans-serif" font-size="30" font-weight="900" fill="#64748b" text-anchor="middle">→</text>
  <g stroke-width="2">
    <circle cx="360" cy="115" r="18" fill="#ef4444" stroke="#b91c1c"/>
    <circle cx="340" cy="95" r="12" fill="#3b82f6" stroke="#1e40af"/><circle cx="380" cy="95" r="12" fill="#3b82f6" stroke="#1e40af"/>
    <circle cx="450" cy="155" r="18" fill="#ef4444" stroke="#b91c1c"/>
    <circle cx="430" cy="135" r="12" fill="#3b82f6" stroke="#1e40af"/><circle cx="470" cy="135" r="12" fill="#3b82f6" stroke="#1e40af"/>
  </g>
  <text x="130" y="200" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">Before: 4 H, 2 O</text>
  <text x="405" y="200" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">After: 4 H, 2 O</text>
  <text x="130" y="224" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">2 molecules of H₂ + 1 of O₂</text>
  <text x="405" y="224" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">2 molecules of water</text>
  <text x="260" y="270" font-family="sans-serif" font-size="15" font-weight="700" fill="#047857" text-anchor="middle">Same atoms, new partners. Nothing is lost.</text>
</svg>`,
};
