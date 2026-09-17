// src/data/GED_HISTORY/HIST_3A/diagrams.js
// Authored SVG sources for Economics: a supply & demand cross, a bar chart of
// prices over time, and a household budget table. We own every number, so the
// MCQ keys and the written mark scheme are exact (docs/svg-diagrams.md).

export const DIAGRAMS = {
  // Market for T-shirts. x: quantity 0–50 (8 px per unit from x=70),
  // y: price $0–$10 (26 px per dollar from y=300). Demand (10,$10)→(50,$2);
  // supply (10,$2)→(50,$10); they cross at 30 units / $6. Dashed line at $8
  // shows a surplus: supply 40, demand 20.
  SUPPLY_DEMAND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="270" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Market for T-shirts</text>
  <line x1="70" y1="40" x2="70" y2="300" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="300" x2="490" y2="300" stroke="#334155" stroke-width="3"/>
  <line x1="150" y1="300" x2="150" y2="306" stroke="#334155" stroke-width="2"/>
  <line x1="230" y1="300" x2="230" y2="306" stroke="#334155" stroke-width="2"/>
  <line x1="310" y1="300" x2="310" y2="306" stroke="#334155" stroke-width="2"/>
  <line x1="390" y1="300" x2="390" y2="306" stroke="#334155" stroke-width="2"/>
  <line x1="470" y1="300" x2="470" y2="306" stroke="#334155" stroke-width="2"/>
  <text x="150" y="322" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">10</text>
  <text x="230" y="322" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">20</text>
  <text x="310" y="322" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">30</text>
  <text x="390" y="322" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">40</text>
  <text x="470" y="322" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">50</text>
  <text x="62" y="253" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$2</text>
  <text x="62" y="201" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$4</text>
  <text x="62" y="149" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$6</text>
  <text x="62" y="97" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$8</text>
  <text x="62" y="45" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$10</text>
  <text x="280" y="346" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Quantity of T-shirts</text>
  <text x="20" y="170" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 20 170)">Price ($)</text>
  <line x1="70" y1="92" x2="390" y2="92" stroke="#94a3b8" stroke-width="2" stroke-dasharray="7 5"/>
  <line x1="150" y1="40" x2="470" y2="248" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
  <line x1="150" y1="248" x2="470" y2="40" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
  <text x="478" y="258" font-family="sans-serif" font-size="15" font-weight="700" fill="#ef4444" text-anchor="end">Demand</text>
  <text x="478" y="36" font-family="sans-serif" font-size="15" font-weight="700" fill="#3b82f6" text-anchor="end">Supply</text>
  <circle cx="310" cy="144" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
  <text x="295" y="140" font-family="sans-serif" font-size="14" font-weight="700" fill="#10b981" text-anchor="end">Equilibrium</text>
  <circle cx="230" cy="92" r="6" fill="#ef4444"/>
  <circle cx="390" cy="92" r="6" fill="#3b82f6"/>
  <text x="280" y="368" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Dashed line: at $8, sellers offer 40 but buyers want only 20.</text>
</svg>`,

  // Average price of a gallon of milk, 2019–2023 (illustrative numbers).
  // $0 at y=300, 48 px per dollar.
  PRICE_BARS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="270" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Average Price of a Gallon of Milk</text>
  <line x1="70" y1="44" x2="70" y2="300" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="300" x2="490" y2="300" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="252" x2="490" y2="252" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="204" x2="490" y2="204" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="156" x2="490" y2="156" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="108" x2="490" y2="108" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="60" x2="490" y2="60" stroke="#e2e8f0" stroke-width="1"/>
  <text x="62" y="257" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$1</text>
  <text x="62" y="209" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$2</text>
  <text x="62" y="161" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$3</text>
  <text x="62" y="113" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$4</text>
  <text x="62" y="65" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">$5</text>
  <rect x="100" y="156" width="56" height="144" fill="#3b82f6"/>
  <rect x="180" y="146" width="56" height="154" fill="#3b82f6"/>
  <rect x="260" y="132" width="56" height="168" fill="#3b82f6"/>
  <rect x="340" y="108" width="56" height="192" fill="#3b82f6"/>
  <rect x="420" y="103" width="56" height="197" fill="#3b82f6"/>
  <text x="128" y="148" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">$3.00</text>
  <text x="208" y="138" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">$3.20</text>
  <text x="288" y="124" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">$3.50</text>
  <text x="368" y="100" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">$4.00</text>
  <text x="448" y="95" font-family="monospace" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">$4.10</text>
  <text x="128" y="322" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">2019</text>
  <text x="208" y="322" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">2020</text>
  <text x="288" y="322" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">2021</text>
  <text x="368" y="322" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">2022</text>
  <text x="448" y="322" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">2023</text>
  <text x="280" y="348" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Year</text>
  <text x="20" y="172" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 20 172)">Price per gallon</text>
</svg>`,

  // A monthly household budget. Spending 2,700 + savings 300 = income 3,000.
  BUDGET_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect x="0" y="0" width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="30" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">The Tran Family: Monthly Budget</text>
  <rect x="20" y="46" width="480" height="30" fill="#1e293b" rx="6"/>
  <text x="34" y="67" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff">Item</text>
  <text x="486" y="67" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="end">Dollars per month</text>
  <rect x="20" y="78" width="480" height="30" fill="#f0fdf4" stroke="#cbd5e1"/>
  <text x="34" y="99" font-family="sans-serif" font-size="15" font-weight="700" fill="#166534">Income (take-home pay)</text>
  <text x="486" y="99" font-family="monospace" font-size="15" font-weight="700" fill="#166534" text-anchor="end">3,000</text>
  <rect x="20" y="110" width="480" height="30" fill="#fef2f2" stroke="#cbd5e1"/>
  <text x="34" y="131" font-family="sans-serif" font-size="15" fill="#1e293b">Rent</text>
  <text x="486" y="131" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="end">1,200</text>
  <rect x="20" y="142" width="480" height="30" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="34" y="163" font-family="sans-serif" font-size="15" fill="#1e293b">Food (groceries)</text>
  <text x="486" y="163" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="end">600</text>
  <rect x="20" y="174" width="480" height="30" fill="#fef2f2" stroke="#cbd5e1"/>
  <text x="34" y="195" font-family="sans-serif" font-size="15" fill="#1e293b">Transport (bus and fuel)</text>
  <text x="486" y="195" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="end">300</text>
  <rect x="20" y="206" width="480" height="30" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="34" y="227" font-family="sans-serif" font-size="15" fill="#1e293b">Phone and internet</text>
  <text x="486" y="227" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="end">100</text>
  <rect x="20" y="238" width="480" height="30" fill="#fef2f2" stroke="#cbd5e1"/>
  <text x="34" y="259" font-family="sans-serif" font-size="15" fill="#1e293b">Eating out and fun</text>
  <text x="486" y="259" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="end">250</text>
  <rect x="20" y="270" width="480" height="30" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="34" y="291" font-family="sans-serif" font-size="15" fill="#1e293b">Clothes and other</text>
  <text x="486" y="291" font-family="monospace" font-size="15" fill="#1e293b" text-anchor="end">250</text>
  <rect x="20" y="302" width="480" height="30" fill="#eff6ff" stroke="#cbd5e1"/>
  <text x="34" y="323" font-family="sans-serif" font-size="15" font-weight="700" fill="#1d4ed8">Savings</text>
  <text x="486" y="323" font-family="monospace" font-size="15" font-weight="700" fill="#1d4ed8" text-anchor="end">300</text>
  <text x="260" y="352" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Spending 2,700 + savings 300 = income 3,000</text>
</svg>`,
};
