// src/data/GED_SCIENCE/SCI_3A/diagrams.js
// SCI_3A — Earth & Space Science. Authored SVGs shared by the notes deck and
// the Source Analysis items. Labels are literal <text> so audit:svg can read
// them; every value in the temperature graph is authored, so the mark scheme
// can quote exact numbers.

export const DIAGRAMS = {
  EARTH_LAYERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="520" height="360" rx="16" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="260" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Inside the Earth</text>
  <clipPath id="el-clip"><rect x="0" y="0" width="520" height="360"/></clipPath>
  <g clip-path="url(#el-clip)">
    <circle cx="20" cy="360" r="318" fill="#8b5a2b"/>
    <circle cx="20" cy="360" r="306" fill="#f59e0b"/>
    <circle cx="20" cy="360" r="168" fill="#ef4444"/>
    <circle cx="20" cy="360" r="84" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  </g>
  <line x1="241" y1="139" x2="332" y2="124" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
  <circle cx="241" cy="139" r="4" fill="#1e293b"/>
  <line x1="190" y1="190" x2="332" y2="196" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
  <circle cx="190" cy="190" r="4" fill="#1e293b"/>
  <line x1="112" y1="268" x2="332" y2="262" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
  <circle cx="112" cy="268" r="4" fill="#1e293b"/>
  <line x1="52" y1="328" x2="332" y2="324" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
  <circle cx="52" cy="328" r="4" fill="#1e293b"/>
  <text x="340" y="112" font-family="sans-serif" font-size="16" font-weight="bold" fill="#8b5a2b">Crust</text>
  <text x="340" y="130" font-family="sans-serif" font-size="13" fill="#334155">thin, solid rock</text>
  <text x="340" y="146" font-family="sans-serif" font-size="13" fill="#334155">we live here</text>
  <text x="340" y="186" font-family="sans-serif" font-size="16" font-weight="bold" fill="#d97706">Mantle</text>
  <text x="340" y="204" font-family="sans-serif" font-size="13" fill="#334155">hot, slow-flowing rock</text>
  <text x="340" y="256" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ef4444">Outer core</text>
  <text x="340" y="274" font-family="sans-serif" font-size="13" fill="#334155">liquid iron</text>
  <text x="340" y="318" font-family="sans-serif" font-size="16" font-weight="bold" fill="#b45309">Inner core</text>
  <text x="340" y="336" font-family="sans-serif" font-size="13" fill="#334155">solid iron, hottest</text>
</svg>`,

  PLATE_BOUNDARIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="pb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b"/>
    </marker>
  </defs>
  <rect x="0" y="0" width="520" height="360" rx="16" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="260" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Three Kinds of Plate Boundary</text>

  <rect x="8" y="50" width="156" height="298" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="86" y="76" font-family="sans-serif" font-size="15" font-weight="bold" fill="#3b82f6" text-anchor="middle">Divergent</text>
  <text x="86" y="96" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">plates pull apart</text>
  <text x="86" y="140" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">side view</text>
  <rect x="18" y="150" width="128" height="40" fill="#dbeafe"/>
  <rect x="18" y="190" width="56" height="46" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="90" y="190" width="56" height="46" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="18" y="236" width="128" height="40" fill="#fde68a"/>
  <path d="M 74 276 L 90 276 L 90 190 L 82 176 L 74 190 Z" fill="#ef4444"/>
  <line x1="60" y1="213" x2="30" y2="213" stroke="#1e293b" stroke-width="3" marker-end="url(#pb-arrow)"/>
  <line x1="104" y1="213" x2="134" y2="213" stroke="#1e293b" stroke-width="3" marker-end="url(#pb-arrow)"/>
  <text x="86" y="296" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Makes:</text>
  <text x="86" y="314" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">mid-ocean ridge</text>
  <text x="86" y="332" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">new crust</text>

  <rect x="176" y="50" width="156" height="298" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="254" y="76" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ef4444" text-anchor="middle">Convergent</text>
  <text x="254" y="96" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">plates push together</text>
  <text x="254" y="140" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">side view</text>
  <path d="M 214 190 L 254 140 L 294 190 Z" fill="#94a3b8"/>
  <rect x="186" y="190" width="68" height="46" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="254" y="190" width="68" height="46" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="186" y="236" width="136" height="40" fill="#fde68a"/>
  <line x1="200" y1="213" x2="236" y2="213" stroke="#1e293b" stroke-width="3" marker-end="url(#pb-arrow)"/>
  <line x1="308" y1="213" x2="272" y2="213" stroke="#1e293b" stroke-width="3" marker-end="url(#pb-arrow)"/>
  <text x="254" y="296" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Makes:</text>
  <text x="254" y="314" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">mountains, volcanoes</text>
  <text x="254" y="332" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">earthquakes</text>

  <rect x="344" y="50" width="156" height="298" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="422" y="76" font-family="sans-serif" font-size="15" font-weight="bold" fill="#10b981" text-anchor="middle">Transform</text>
  <text x="422" y="96" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">plates slide past</text>
  <text x="422" y="136" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">seen from above</text>
  <rect x="354" y="150" width="68" height="126" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="422" y="150" width="68" height="126" fill="#cbd5e1" stroke="#64748b"/>
  <line x1="422" y1="150" x2="422" y2="276" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 4"/>
  <line x1="388" y1="240" x2="388" y2="180" stroke="#1e293b" stroke-width="3" marker-end="url(#pb-arrow)"/>
  <line x1="456" y1="186" x2="456" y2="246" stroke="#1e293b" stroke-width="3" marker-end="url(#pb-arrow)"/>
  <text x="422" y="296" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Makes:</text>
  <text x="422" y="314" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">earthquakes</text>
  <text x="422" y="332" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">no new crust</text>
</svg>`,

  WATER_CYCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="wc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
    </marker>
  </defs>
  <rect x="0" y="0" width="520" height="360" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="260" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">The Water Cycle</text>
  <circle cx="60" cy="84" r="28" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
  <text x="60" y="89" font-family="sans-serif" font-size="13" font-weight="bold" fill="#b45309" text-anchor="middle">Sun</text>
  <path d="M 280 300 L 370 210 L 430 185 L 520 205 L 520 300 Z" fill="#10b981"/>
  <path d="M 0 300 H 520 V 348 Q 520 360 508 360 H 12 Q 0 360 0 348 Z" fill="#3b82f6"/>
  <text x="60" y="336" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Sea</text>
  <circle cx="300" cy="118" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <circle cx="330" cy="106" r="28" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <circle cx="362" cy="118" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="298" y="114" width="64" height="24" fill="#ffffff"/>
  <line x1="160" y1="290" x2="280" y2="130" stroke="#3b82f6" stroke-width="3" stroke-dasharray="8 6" marker-end="url(#wc-arrow)"/>
  <text x="140" y="190" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">1 Evaporation</text>
  <text x="140" y="208" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">water vapour rises</text>
  <text x="330" y="60" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">2 Condensation</text>
  <text x="330" y="78" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">vapour cools into drops</text>
  <line x1="318" y1="146" x2="322" y2="186" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
  <line x1="336" y1="146" x2="340" y2="186" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
  <line x1="354" y1="146" x2="358" y2="186" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
  <text x="440" y="150" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">3 Precipitation</text>
  <text x="440" y="168" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">rain or snow falls</text>
  <line x1="400" y1="205" x2="300" y2="292" stroke="#3b82f6" stroke-width="3" marker-end="url(#wc-arrow)"/>
  <text x="455" y="262" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">4 Runoff</text>
  <text x="455" y="280" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">back to the sea</text>
</svg>`,

  GLOBAL_TEMP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="520" height="390" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">Global Average Temperature Change Since 1900</text>
  <text x="260" y="46" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">difference from the 1900 average, in degrees Celsius</text>
  <line x1="70" y1="120" x2="490" y2="120" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="180" x2="490" y2="180" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="240" x2="490" y2="240" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="60" x2="70" y2="300" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="300" x2="490" y2="300" stroke="#334155" stroke-width="3"/>
  <text x="60" y="304" font-family="monospace" font-size="13" fill="#334155" text-anchor="end">0.0</text>
  <text x="60" y="244" font-family="monospace" font-size="13" fill="#334155" text-anchor="end">0.4</text>
  <text x="60" y="184" font-family="monospace" font-size="13" fill="#334155" text-anchor="end">0.8</text>
  <text x="60" y="124" font-family="monospace" font-size="13" fill="#334155" text-anchor="end">1.2</text>
  <polyline points="70,300 140,300 210,270 280,270 350,240 420,195 490,135" fill="none" stroke="#ef4444" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="70" cy="300" r="5" fill="#ef4444"/>
  <circle cx="140" cy="300" r="5" fill="#ef4444"/>
  <circle cx="210" cy="270" r="5" fill="#ef4444"/>
  <circle cx="280" cy="270" r="5" fill="#ef4444"/>
  <circle cx="350" cy="240" r="5" fill="#ef4444"/>
  <circle cx="420" cy="195" r="5" fill="#ef4444"/>
  <circle cx="490" cy="135" r="5" fill="#ef4444"/>
  <text x="70" y="288" font-family="monospace" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">0.0</text>
  <text x="140" y="288" font-family="monospace" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">0.0</text>
  <text x="210" y="258" font-family="monospace" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">0.2</text>
  <text x="280" y="258" font-family="monospace" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">0.2</text>
  <text x="350" y="228" font-family="monospace" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">0.4</text>
  <text x="420" y="183" font-family="monospace" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">0.7</text>
  <text x="490" y="123" font-family="monospace" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">1.1</text>
  <text x="70" y="322" font-family="monospace" font-size="13" fill="#334155" text-anchor="middle">1900</text>
  <text x="140" y="322" font-family="monospace" font-size="13" fill="#334155" text-anchor="middle">1920</text>
  <text x="210" y="322" font-family="monospace" font-size="13" fill="#334155" text-anchor="middle">1940</text>
  <text x="280" y="322" font-family="monospace" font-size="13" fill="#334155" text-anchor="middle">1960</text>
  <text x="350" y="322" font-family="monospace" font-size="13" fill="#334155" text-anchor="middle">1980</text>
  <text x="420" y="322" font-family="monospace" font-size="13" fill="#334155" text-anchor="middle">2000</text>
  <text x="490" y="322" font-family="monospace" font-size="13" fill="#334155" text-anchor="middle">2020</text>
  <text x="280" y="346" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">Year</text>
  <text x="22" y="190" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle" transform="rotate(-90 22 190)">Degrees above 1900</text>
  <text x="260" y="374" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Simplified, rounded values for practice</text>
</svg>`,

  SEASONS_TILT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="520" height="300" rx="16" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="260" y="28" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">Why We Have Seasons: Earth's Tilt</text>
  <ellipse cx="260" cy="160" rx="170" ry="60" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
  <circle cx="260" cy="160" r="42" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
  <text x="260" y="165" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b45309" text-anchor="middle">Sun</text>
  <circle cx="90" cy="160" r="26" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
  <line x1="76" y1="124" x2="104" y2="196" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
  <text x="72" y="118" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">N</text>
  <circle cx="430" cy="160" r="26" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
  <line x1="416" y1="124" x2="444" y2="196" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
  <text x="412" y="118" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">N</text>
  <text x="90" y="84" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">June</text>
  <text x="90" y="214" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">North leans toward Sun</text>
  <text x="90" y="232" font-family="sans-serif" font-size="13" font-weight="bold" fill="#d97706" text-anchor="middle">Summer (north)</text>
  <text x="430" y="84" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">December</text>
  <text x="430" y="214" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">North leans away</text>
  <text x="430" y="232" font-family="sans-serif" font-size="13" font-weight="bold" fill="#3b82f6" text-anchor="middle">Winter (north)</text>
  <text x="260" y="274" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">Same tilt all year. The distance to the Sun hardly changes.</text>
</svg>`,

  SOLAR_SYSTEM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="520" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="260" y="26" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">The Solar System: planets in order from the Sun</text>
  <clipPath id="ss-clip"><rect x="0" y="0" width="520" height="220"/></clipPath>
  <g clip-path="url(#ss-clip)">
    <circle cx="30" cy="120" r="48" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
  </g>
  <text x="40" y="125" font-family="sans-serif" font-size="13" font-weight="bold" fill="#b45309" text-anchor="middle">Sun</text>
  <circle cx="110" cy="120" r="5" fill="#94a3b8"/>
  <circle cx="150" cy="120" r="8" fill="#f59e0b"/>
  <circle cx="195" cy="120" r="9" fill="#3b82f6"/>
  <circle cx="238" cy="120" r="6" fill="#ef4444"/>
  <circle cx="305" cy="120" r="24" fill="#d97706"/>
  <ellipse cx="380" cy="120" rx="32" ry="8" fill="none" stroke="#d97706" stroke-width="3"/>
  <circle cx="380" cy="120" r="19" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  <circle cx="440" cy="120" r="12" fill="#93c5fd"/>
  <circle cx="490" cy="120" r="11" fill="#1d4ed8"/>
  <text x="110" y="170" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">Mercury</text>
  <text x="150" y="170" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">Venus</text>
  <text x="195" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3b82f6" text-anchor="middle">Earth</text>
  <text x="238" y="170" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">Mars</text>
  <text x="305" y="170" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">Jupiter</text>
  <text x="380" y="170" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">Saturn</text>
  <text x="440" y="170" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">Uranus</text>
  <text x="490" y="170" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">Neptune</text>
  <text x="175" y="202" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">rocky planets</text>
  <text x="260" y="202" font-family="sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">not to scale</text>
  <text x="400" y="202" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">gas giants</text>
</svg>`,
};
