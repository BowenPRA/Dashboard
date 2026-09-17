// src/data/GED_MATH/MATH_0C/diagrams.js
// Authored SVG sources for the Ratios, Proportions & Rates unit. Maths stays
// authored SVG (we control the numbers, so the answer key is exact). Every
// label is a literal <text> so audit:svg can measure it. Palette and typography
// follow docs/svg-diagrams.md: monospace for numbers, sans-serif for labels,
// dark ink on a light card.

export const DIAGRAMS = {
  // A double number line: cups of flour on top, cookies underneath. The ratio
  // 2 cups : 12 cookies is carried along the line; the last cookie value is "?".
  DOUBLE_NUMBER_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full drop-shadow-md">
  <rect width="520" height="300" fill="#ffffff" rx="12"/>
  <text x="260" y="34" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Same ratio all the way along the line</text>
  <text x="60" y="78" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0369a1">Cups of flour</text>
  <line x1="60" y1="110" x2="470" y2="110" stroke="#1e293b" stroke-width="3"/>
  <line x1="60" y1="98" x2="60" y2="122" stroke="#1e293b" stroke-width="3"/>
  <line x1="180" y1="98" x2="180" y2="122" stroke="#1e293b" stroke-width="3"/>
  <line x1="300" y1="98" x2="300" y2="122" stroke="#1e293b" stroke-width="3"/>
  <line x1="420" y1="98" x2="420" y2="122" stroke="#1e293b" stroke-width="3"/>
  <text x="60" y="145" font-family="monospace" font-size="18" font-weight="bold" fill="#0369a1" text-anchor="middle">0</text>
  <text x="180" y="145" font-family="monospace" font-size="18" font-weight="bold" fill="#0369a1" text-anchor="middle">2</text>
  <text x="300" y="145" font-family="monospace" font-size="18" font-weight="bold" fill="#0369a1" text-anchor="middle">4</text>
  <text x="420" y="145" font-family="monospace" font-size="18" font-weight="bold" fill="#0369a1" text-anchor="middle">6</text>
  <line x1="180" y1="122" x2="180" y2="198" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>
  <line x1="300" y1="122" x2="300" y2="198" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>
  <line x1="420" y1="122" x2="420" y2="198" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="60" y="188" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309">Cookies</text>
  <line x1="60" y1="210" x2="470" y2="210" stroke="#1e293b" stroke-width="3"/>
  <line x1="60" y1="198" x2="60" y2="222" stroke="#1e293b" stroke-width="3"/>
  <line x1="180" y1="198" x2="180" y2="222" stroke="#1e293b" stroke-width="3"/>
  <line x1="300" y1="198" x2="300" y2="222" stroke="#1e293b" stroke-width="3"/>
  <line x1="420" y1="198" x2="420" y2="222" stroke="#1e293b" stroke-width="3"/>
  <text x="60" y="248" font-family="monospace" font-size="18" font-weight="bold" fill="#b45309" text-anchor="middle">0</text>
  <text x="180" y="248" font-family="monospace" font-size="18" font-weight="bold" fill="#b45309" text-anchor="middle">12</text>
  <text x="300" y="248" font-family="monospace" font-size="18" font-weight="bold" fill="#b45309" text-anchor="middle">24</text>
  <circle cx="420" cy="242" r="16" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
  <text x="420" y="249" font-family="monospace" font-size="20" font-weight="bold" fill="#ef4444" text-anchor="middle">?</text>
  <text x="260" y="284" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">2 cups of flour make 12 cookies</text>
</svg>`,

  // A ratio table: tickets across the top, cost underneath, one cell missing.
  RATIO_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" class="w-full h-full drop-shadow-md">
  <rect width="520" height="260" fill="#ffffff" rx="12"/>
  <text x="260" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Concert tickets — every ticket costs the same</text>
  <rect x="30" y="80" width="110" height="50" fill="#eff6ff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="140" y="80" width="90" height="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="230" y="80" width="90" height="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="320" y="80" width="90" height="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="410" y="80" width="90" height="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="30" y="130" width="110" height="50" fill="#fffbeb" stroke="#94a3b8" stroke-width="2"/>
  <rect x="140" y="130" width="90" height="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="230" y="130" width="90" height="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <rect x="320" y="130" width="90" height="50" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
  <rect x="410" y="130" width="90" height="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <text x="85" y="111" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0369a1" text-anchor="middle">Tickets</text>
  <text x="185" y="112" font-family="monospace" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">2</text>
  <text x="275" y="112" font-family="monospace" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">4</text>
  <text x="365" y="112" font-family="monospace" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">6</text>
  <text x="455" y="112" font-family="monospace" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">8</text>
  <text x="85" y="161" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">Cost ($)</text>
  <text x="185" y="162" font-family="monospace" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">8</text>
  <text x="275" y="162" font-family="monospace" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">16</text>
  <text x="365" y="162" font-family="monospace" font-size="20" font-weight="bold" fill="#ef4444" text-anchor="middle">?</text>
  <text x="455" y="162" font-family="monospace" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">32</text>
  <text x="260" y="222" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Read down a column: 2 tickets cost $8</text>
</svg>`,

  // A scale drawing of a room with a scale bar: 1 cm on paper = 2 m in real life.
  SCALE_DRAWING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" class="w-full h-full drop-shadow-md">
  <rect width="520" height="340" fill="#ffffff" rx="12"/>
  <text x="260" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Scale drawing of a room</text>
  <rect x="70" y="90" width="240" height="160" fill="#eff6ff" stroke="#1e293b" stroke-width="3"/>
  <line x1="70" y1="72" x2="310" y2="72" stroke="#3b82f6" stroke-width="2"/>
  <line x1="70" y1="66" x2="70" y2="78" stroke="#3b82f6" stroke-width="2"/>
  <line x1="310" y1="66" x2="310" y2="78" stroke="#3b82f6" stroke-width="2"/>
  <text x="190" y="62" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">6 cm</text>
  <line x1="52" y1="90" x2="52" y2="250" stroke="#3b82f6" stroke-width="2"/>
  <line x1="46" y1="90" x2="58" y2="90" stroke="#3b82f6" stroke-width="2"/>
  <line x1="46" y1="250" x2="58" y2="250" stroke="#3b82f6" stroke-width="2"/>
  <text x="30" y="176" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">4 cm</text>
  <text x="190" y="176" font-family="sans-serif" font-size="15" fill="#64748b" text-anchor="middle">on the paper</text>
  <rect x="350" y="120" width="140" height="100" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="8"/>
  <text x="420" y="146" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">Scale</text>
  <rect x="390" y="158" width="60" height="12" fill="#10b981" stroke="#065f46" stroke-width="1"/>
  <text x="420" y="192" font-family="monospace" font-size="16" font-weight="bold" fill="#065f46" text-anchor="middle">1 cm = 2 m</text>
  <text x="260" y="300" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Every 1 cm on the paper is 2 m in the real room</text>
</svg>`,

  // Two price tags for the same bottled water, different pack sizes.
  BEST_BUY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full drop-shadow-md">
  <rect width="520" height="300" fill="#ffffff" rx="12"/>
  <text x="260" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Bottled water — which pack is the better buy?</text>
  <rect x="40" y="70" width="200" height="190" fill="#eff6ff" stroke="#3b82f6" stroke-width="3" rx="14"/>
  <text x="140" y="108" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Pack A</text>
  <text x="140" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">4 bottles</text>
  <text x="140" y="210" font-family="monospace" font-size="30" font-weight="900" fill="#1e293b" text-anchor="middle">$6.00</text>
  <rect x="280" y="70" width="200" height="190" fill="#fffbeb" stroke="#f59e0b" stroke-width="3" rx="14"/>
  <text x="380" y="108" font-family="sans-serif" font-size="18" font-weight="bold" fill="#b45309" text-anchor="middle">Pack B</text>
  <text x="380" y="150" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">6 bottles</text>
  <text x="380" y="210" font-family="monospace" font-size="30" font-weight="900" fill="#1e293b" text-anchor="middle">$8.40</text>
  <text x="260" y="286" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Compare the price of ONE bottle</text>
</svg>`,
};
