// src/data/GED_HISTORY/HIST_4A/diagrams.js
// Authored SVG sources for Geography & People: a simple map of the four US
// regions with major physical features, the same map shaded as a thematic
// (population density) map with a legend, a region-comparison table, and a
// push/pull factor diagram. We own every number (docs/svg-diagrams.md).

// Shared block map: West x30–200, Midwest x200–360 (top), South x200–450
// (bottom), Northeast x360–490 (top). Used by both maps below.
const REGION_BLOCKS = (fills) => `
  <rect x="30" y="60" width="170" height="220" fill="${fills.west}" stroke="#334155" stroke-width="2"/>
  <rect x="200" y="60" width="160" height="120" fill="${fills.midwest}" stroke="#334155" stroke-width="2"/>
  <rect x="200" y="180" width="250" height="100" fill="${fills.south}" stroke="#334155" stroke-width="2"/>
  <rect x="360" y="60" width="130" height="120" fill="${fills.northeast}" stroke="#334155" stroke-width="2"/>`;

export const DIAGRAMS = {
  // Political-style region map with physical features drawn on top.
  US_REGIONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="240" y="30" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">The Four Regions of the United States</text>
  ${REGION_BLOCKS({ west: "#fef3c7", midwest: "#dcfce7", south: "#fee2e2", northeast: "#dbeafe" })}
  <path d="M 115 80 L 125 110 L 112 140 L 124 170 L 110 200 L 122 230 L 112 260" fill="none" stroke="#78716c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 285 70 C 275 110, 295 150, 280 190 C 270 220, 290 250, 282 278" fill="none" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="335" cy="78" rx="26" ry="12" fill="#3b82f6" opacity="0.8"/>
  <path d="M 415 130 L 428 160 L 418 190 L 432 220 L 422 250" fill="none" stroke="#78716c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="70" y="112" font-family="sans-serif" font-size="16" font-weight="800" fill="#92400e">WEST</text>
  <text x="212" y="112" font-family="sans-serif" font-size="16" font-weight="800" fill="#166534">MIDWEST</text>
  <text x="215" y="262" font-family="sans-serif" font-size="16" font-weight="800" fill="#991b1b">SOUTH</text>
  <text x="372" y="112" font-family="sans-serif" font-size="15" font-weight="800" fill="#1e40af">NORTHEAST</text>
  <text x="155" y="272" font-family="sans-serif" font-size="14" font-weight="700" fill="#57534e" text-anchor="middle">Rocky Mts</text>
  <text x="300" y="236" font-family="sans-serif" font-size="14" font-weight="700" fill="#1d4ed8">Mississippi R.</text>
  <text x="300" y="84" font-family="sans-serif" font-size="14" font-weight="700" fill="#1d4ed8" text-anchor="end">Great Lakes</text>
  <text x="444" y="270" font-family="sans-serif" font-size="14" font-weight="700" fill="#57534e" text-anchor="end">Appalachian Mts</text>
  <line x1="470" y1="50" x2="470" y2="22" stroke="#334155" stroke-width="3"/>
  <path d="M 464 30 L 470 20 L 476 30" fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
  <text x="490" y="36" font-family="sans-serif" font-size="14" font-weight="800" fill="#334155" text-anchor="middle">N</text>
  <text x="260" y="308" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Oceans: Pacific (west), Atlantic (east), Gulf of Mexico (south)</text>
  <text x="260" y="340" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Not to scale. Blocks show regions, not real borders.</text>
</svg>`,

  // Thematic map: people per square mile by region (rounded, 2020 census).
  // Northeast 350, South 145, Midwest 90, West 45.
  DENSITY_MAP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="260" y="30" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">People per Square Mile, by Region</text>
  ${REGION_BLOCKS({ west: "#eff6ff", midwest: "#bfdbfe", south: "#60a5fa", northeast: "#1d4ed8" })}
  <text x="115" y="165" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">West</text>
  <text x="280" y="125" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">Midwest</text>
  <text x="325" y="235" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">South</text>
  <text x="425" y="125" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">Northeast</text>
  <rect x="30" y="296" width="460" height="72" fill="#f8fafc" stroke="#cbd5e1" rx="8"/>
  <text x="44" y="316" font-family="sans-serif" font-size="14" font-weight="800" fill="#1e293b">Legend: people per square mile</text>
  <rect x="44" y="330" width="26" height="20" fill="#eff6ff" stroke="#334155"/>
  <text x="78" y="345" font-family="sans-serif" font-size="14" fill="#1e293b">Under 50</text>
  <rect x="150" y="330" width="26" height="20" fill="#bfdbfe" stroke="#334155"/>
  <text x="184" y="345" font-family="sans-serif" font-size="14" fill="#1e293b">50 to 99</text>
  <rect x="256" y="330" width="26" height="20" fill="#60a5fa" stroke="#334155"/>
  <text x="290" y="345" font-family="sans-serif" font-size="14" fill="#1e293b">100 to 199</text>
  <rect x="372" y="330" width="26" height="20" fill="#1d4ed8" stroke="#334155"/>
  <text x="406" y="345" font-family="sans-serif" font-size="14" fill="#1e293b">200+</text>
</svg>`,

  // Region comparison table (rounded 2020 figures).
  REGION_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full">
  <rect x="0" y="0" width="520" height="300" fill="#ffffff" rx="10"/>
  <text x="260" y="30" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">US Regions Compared (2020, rounded)</text>
  <rect x="20" y="48" width="480" height="52" fill="#1e293b" rx="6"/>
  <text x="34" y="80" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff">Region</text>
  <text x="230" y="70" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Population</text>
  <text x="230" y="90" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">(millions)</text>
  <text x="350" y="70" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Land area</text>
  <text x="350" y="90" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">(thousand sq mi)</text>
  <text x="455" y="70" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">People per</text>
  <text x="455" y="90" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">square mile</text>
  <rect x="20" y="102" width="480" height="40" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="34" y="127" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Northeast</text>
  <text x="230" y="127" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">58</text>
  <text x="350" y="127" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">162</text>
  <text x="455" y="127" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">355</text>
  <rect x="20" y="144" width="480" height="40" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="34" y="169" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">Midwest</text>
  <text x="230" y="169" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">69</text>
  <text x="350" y="169" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">751</text>
  <text x="455" y="169" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">92</text>
  <rect x="20" y="186" width="480" height="40" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="34" y="211" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">South</text>
  <text x="230" y="211" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">126</text>
  <text x="350" y="211" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">868</text>
  <text x="455" y="211" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">145</text>
  <rect x="20" y="228" width="480" height="40" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="34" y="253" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">West</text>
  <text x="230" y="253" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">79</text>
  <text x="350" y="253" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="middle">1,751</text>
  <text x="455" y="253" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">45</text>
  <text x="260" y="290" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">People per square mile = population ÷ land area</text>
</svg>`,

  // Push and pull factors of migration.
  PUSH_PULL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="30" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Why People Move: Push and Pull</text>
  <rect x="20" y="52" width="200" height="250" fill="#fef2f2" stroke="#ef4444" stroke-width="3" rx="12"/>
  <text x="120" y="80" font-family="sans-serif" font-size="16" font-weight="800" fill="#b91c1c" text-anchor="middle">HOME (old place)</text>
  <text x="120" y="104" font-family="sans-serif" font-size="14" font-weight="700" fill="#b91c1c" text-anchor="middle">PUSH factors</text>
  <text x="120" y="136" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">No jobs, low pay</text>
  <text x="120" y="166" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">War or danger</text>
  <text x="120" y="196" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">Drought or flood</text>
  <text x="120" y="226" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">Unfair laws</text>
  <text x="120" y="256" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">No land to farm</text>
  <text x="120" y="286" font-family="sans-serif" font-size="14" font-weight="700" fill="#b91c1c" text-anchor="middle">Problems that push OUT</text>
  <rect x="300" y="52" width="200" height="250" fill="#f0fdf4" stroke="#10b981" stroke-width="3" rx="12"/>
  <text x="400" y="80" font-family="sans-serif" font-size="16" font-weight="800" fill="#047857" text-anchor="middle">NEW PLACE</text>
  <text x="400" y="104" font-family="sans-serif" font-size="14" font-weight="700" fill="#047857" text-anchor="middle">PULL factors</text>
  <text x="400" y="136" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">Jobs, higher pay</text>
  <text x="400" y="166" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">Safety and freedom</text>
  <text x="400" y="196" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">Family already there</text>
  <text x="400" y="226" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">Good schools</text>
  <text x="400" y="256" font-family="sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">Cheap land</text>
  <text x="400" y="286" font-family="sans-serif" font-size="14" font-weight="700" fill="#047857" text-anchor="middle">Hopes that pull IN</text>
  <line x1="228" y1="177" x2="284" y2="177" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/>
  <path d="M 276 163 L 294 177 L 276 191" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="260" y="160" font-family="sans-serif" font-size="14" font-weight="800" fill="#d97706" text-anchor="middle">MOVE</text>
  <text x="260" y="336" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Migration = people moving from one place to live in another.</text>
</svg>`,
};
