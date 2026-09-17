// src/data/GED_MATH/MATH_0D/diagrams.js
// Authored SVG for Data, Statistics & Probability. SA_* are the Source Analysis
// figures (the student reads a value, a trend, a proportion); NOTES_* sit in the
// lesson deck. All numbers are chosen so the answers are exact — the grader
// never sees the picture, so every value is also written in the text.

export const DIAGRAMS = {
  // Bar graph: cars sold per month. Jan 20, Feb 35, Mar 25, Apr 40. Scale 5.2 px per car.
  SA_BAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Cars sold each month</text>
  <line x1="80" y1="300" x2="480" y2="300" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="248" x2="480" y2="248" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="196" x2="480" y2="196" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="144" x2="480" y2="144" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="92" x2="480" y2="92" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="40" x2="480" y2="40" stroke="#e2e8f0" stroke-width="1"/>
  <text x="70" y="305" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">0</text>
  <text x="70" y="253" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">10</text>
  <text x="70" y="201" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">20</text>
  <text x="70" y="149" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">30</text>
  <text x="70" y="97" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">40</text>
  <text x="70" y="45" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">50</text>
  <line x1="80" y1="40" x2="80" y2="300" stroke="#1e293b" stroke-width="2"/>
  <line x1="80" y1="300" x2="480" y2="300" stroke="#1e293b" stroke-width="2"/>
  <rect x="100" y="196" width="60" height="104" fill="#3b82f6" rx="3"/>
  <rect x="200" y="118" width="60" height="182" fill="#3b82f6" rx="3"/>
  <rect x="300" y="170" width="60" height="130" fill="#3b82f6" rx="3"/>
  <rect x="400" y="92" width="60" height="208" fill="#3b82f6" rx="3"/>
  <text x="130" y="188" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">20</text>
  <text x="230" y="110" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">35</text>
  <text x="330" y="162" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">25</text>
  <text x="430" y="84" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">40</text>
  <text x="130" y="322" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Jan</text>
  <text x="230" y="322" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Feb</text>
  <text x="330" y="322" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Mar</text>
  <text x="430" y="322" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Apr</text>
  <text x="280" y="346" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Month</text>
</svg>`,

  // Line graph: noon temperature Mon–Fri. 60, 64, 70, 66, 74 °F. Axis 50–80, 8 px per degree.
  SA_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Temperature at noon (°F)</text>
  <line x1="80" y1="280" x2="480" y2="280" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="200" x2="480" y2="200" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="120" x2="480" y2="120" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="40" x2="480" y2="40" stroke="#e2e8f0" stroke-width="1"/>
  <text x="70" y="285" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">50</text>
  <text x="70" y="205" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">60</text>
  <text x="70" y="125" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">70</text>
  <text x="70" y="45" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">80</text>
  <line x1="80" y1="40" x2="80" y2="280" stroke="#1e293b" stroke-width="2"/>
  <line x1="80" y1="280" x2="480" y2="280" stroke="#1e293b" stroke-width="2"/>
  <polyline points="120,200 200,168 280,120 360,152 440,88" fill="none" stroke="#ef4444" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="120" cy="200" r="6" fill="#ef4444"/>
  <circle cx="200" cy="168" r="6" fill="#ef4444"/>
  <circle cx="280" cy="120" r="6" fill="#ef4444"/>
  <circle cx="360" cy="152" r="6" fill="#ef4444"/>
  <circle cx="440" cy="88" r="6" fill="#ef4444"/>
  <text x="120" y="186" font-family="monospace" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">60</text>
  <text x="200" y="154" font-family="monospace" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">64</text>
  <text x="280" y="106" font-family="monospace" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">70</text>
  <text x="360" y="174" font-family="monospace" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">66</text>
  <text x="440" y="74" font-family="monospace" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">74</text>
  <text x="120" y="304" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Mon</text>
  <text x="200" y="304" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Tue</text>
  <text x="280" y="304" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Wed</text>
  <text x="360" y="304" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Thu</text>
  <text x="440" y="304" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">Fri</text>
  <text x="280" y="336" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Day of the week</text>
</svg>`,

  // Scatter plot: hours studied (0–8) vs test score (50–100), positive correlation, dashed best-fit line.
  SA_SCATTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Hours studied vs. test score</text>
  <line x1="80" y1="300" x2="480" y2="300" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="248" x2="480" y2="248" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="196" x2="480" y2="196" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="144" x2="480" y2="144" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="92" x2="480" y2="92" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="40" x2="480" y2="40" stroke="#e2e8f0" stroke-width="1"/>
  <text x="70" y="305" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">50</text>
  <text x="70" y="253" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">60</text>
  <text x="70" y="201" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">70</text>
  <text x="70" y="149" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">80</text>
  <text x="70" y="97" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">90</text>
  <text x="70" y="45" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">100</text>
  <line x1="80" y1="40" x2="80" y2="300" stroke="#1e293b" stroke-width="2"/>
  <line x1="80" y1="300" x2="480" y2="300" stroke="#1e293b" stroke-width="2"/>
  <line x1="105" y1="290" x2="455" y2="50" stroke="#94a3b8" stroke-width="2" stroke-dasharray="8 6"/>
  <circle cx="130" cy="274" r="7" fill="#10b981"/>
  <circle cx="180" cy="238" r="7" fill="#10b981"/>
  <circle cx="180" cy="196" r="7" fill="#10b981"/>
  <circle cx="230" cy="206" r="7" fill="#10b981"/>
  <circle cx="280" cy="154" r="7" fill="#10b981"/>
  <circle cx="330" cy="134" r="7" fill="#10b981"/>
  <circle cx="330" cy="92" r="7" fill="#10b981"/>
  <circle cx="380" cy="102" r="7" fill="#10b981"/>
  <circle cx="430" cy="66" r="7" fill="#10b981"/>
  <text x="80" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">0</text>
  <text x="130" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">1</text>
  <text x="180" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">2</text>
  <text x="230" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">3</text>
  <text x="280" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">4</text>
  <text x="330" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">5</text>
  <text x="380" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">6</text>
  <text x="430" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">7</text>
  <text x="480" y="322" font-family="monospace" font-size="14" fill="#64748b" text-anchor="middle">8</text>
  <text x="280" y="346" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Hours studied (score on the left)</text>
</svg>`,

  // Circle graph: a $2,000 monthly budget. Rent 50%, Food 25%, Transport 15%, Savings 10%.
  SA_PIE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Lan's monthly budget: $2,000</text>
  <path d="M170,200 L170,80 A120,120 0 0 1 170,320 Z" fill="#3b82f6" stroke="#ffffff" stroke-width="3"/>
  <path d="M170,200 L170,320 A120,120 0 0 1 50,200 Z" fill="#10b981" stroke="#ffffff" stroke-width="3"/>
  <path d="M170,200 L50,200 A120,120 0 0 1 99.5,102.9 Z" fill="#f59e0b" stroke="#ffffff" stroke-width="3"/>
  <path d="M170,200 L99.5,102.9 A120,120 0 0 1 170,80 Z" fill="#a855f7" stroke="#ffffff" stroke-width="3"/>
  <text x="236" y="206" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">50%</text>
  <text x="124" y="252" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">25%</text>
  <rect x="330" y="108" width="20" height="20" fill="#3b82f6" rx="3"/>
  <text x="360" y="124" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Rent: 50%</text>
  <rect x="330" y="150" width="20" height="20" fill="#10b981" rx="3"/>
  <text x="360" y="166" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Food: 25%</text>
  <rect x="330" y="192" width="20" height="20" fill="#f59e0b" rx="3"/>
  <text x="360" y="208" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Transport: 15%</text>
  <rect x="330" y="234" width="20" height="20" fill="#a855f7" rx="3"/>
  <text x="360" y="250" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Savings: 10%</text>
  <text x="260" y="346" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">The whole circle = 100% = $2,000</text>
</svg>`,

  // Lesson: a bar graph (drinks sold) beside a line graph (sales per year, rising).
  NOTES_BARLINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
  <rect width="520" height="250" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <text x="140" y="26" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">Bar graph: drinks sold</text>
  <line x1="40" y1="40" x2="40" y2="200" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="200" x2="240" y2="200" stroke="#1e293b" stroke-width="2"/>
  <text x="32" y="205" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">0</text>
  <text x="32" y="125" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">10</text>
  <text x="32" y="45" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">20</text>
  <line x1="40" y1="120" x2="240" y2="120" stroke="#e2e8f0" stroke-width="1"/>
  <rect x="60" y="104" width="40" height="96" fill="#3b82f6" rx="3"/>
  <rect x="120" y="56" width="40" height="144" fill="#3b82f6" rx="3"/>
  <rect x="180" y="152" width="40" height="48" fill="#3b82f6" rx="3"/>
  <text x="80" y="96" font-family="monospace" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">12</text>
  <text x="140" y="48" font-family="monospace" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">18</text>
  <text x="200" y="144" font-family="monospace" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">6</text>
  <text x="80" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Tea</text>
  <text x="140" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Coffee</text>
  <text x="200" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Juice</text>
  <line x1="265" y1="30" x2="265" y2="230" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="400" y="26" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">Line graph: sales per year</text>
  <line x1="300" y1="40" x2="300" y2="200" stroke="#1e293b" stroke-width="2"/>
  <line x1="300" y1="200" x2="500" y2="200" stroke="#1e293b" stroke-width="2"/>
  <text x="292" y="205" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">0</text>
  <text x="292" y="125" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">10</text>
  <text x="292" y="45" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">20</text>
  <line x1="300" y1="120" x2="500" y2="120" stroke="#e2e8f0" stroke-width="1"/>
  <polyline points="330,120 400,88 470,40" fill="none" stroke="#ef4444" stroke-width="3"/>
  <circle cx="330" cy="120" r="6" fill="#ef4444"/>
  <circle cx="400" cy="88" r="6" fill="#ef4444"/>
  <circle cx="470" cy="40" r="6" fill="#ef4444"/>
  <text x="330" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">2021</text>
  <text x="400" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">2022</text>
  <text x="470" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">2023</text>
  <text x="400" y="244" font-family="sans-serif" font-size="13" fill="#991b1b" text-anchor="middle">Trend: going up</text>
</svg>`,

  // Lesson: how 20 students get to school. Walk 50%, Bus 25%, Car 25%.
  NOTES_PIE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" class="w-full h-full drop-shadow-md">
  <rect width="420" height="260" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <text x="210" y="26" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">How 20 students get to school</text>
  <path d="M120,140 L120,45 A95,95 0 0 1 120,235 Z" fill="#3b82f6" stroke="#ffffff" stroke-width="3"/>
  <path d="M120,140 L120,235 A95,95 0 0 1 25,140 Z" fill="#10b981" stroke="#ffffff" stroke-width="3"/>
  <path d="M120,140 L25,140 A95,95 0 0 1 120,45 Z" fill="#f59e0b" stroke="#ffffff" stroke-width="3"/>
  <text x="170" y="146" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">50%</text>
  <text x="84" y="184" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">25%</text>
  <text x="84" y="110" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">25%</text>
  <rect x="250" y="86" width="18" height="18" fill="#3b82f6" rx="3"/>
  <text x="276" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">Walk: 50% = 10</text>
  <rect x="250" y="126" width="18" height="18" fill="#10b981" rx="3"/>
  <text x="276" y="140" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">Bus: 25% = 5</text>
  <rect x="250" y="166" width="18" height="18" fill="#f59e0b" rx="3"/>
  <text x="276" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">Car: 25% = 5</text>
  <text x="330" y="222" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">All slices add to 100%</text>
</svg>`,

  // Lesson: three scatter plots — positive, negative, no correlation.
  NOTES_SCATTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" class="w-full h-full drop-shadow-md">
  <rect width="520" height="220" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <line x1="30" y1="40" x2="30" y2="180" stroke="#1e293b" stroke-width="2"/>
  <line x1="30" y1="180" x2="170" y2="180" stroke="#1e293b" stroke-width="2"/>
  <circle cx="50" cy="165" r="5" fill="#10b981"/>
  <circle cx="70" cy="150" r="5" fill="#10b981"/>
  <circle cx="90" cy="140" r="5" fill="#10b981"/>
  <circle cx="110" cy="120" r="5" fill="#10b981"/>
  <circle cx="130" cy="100" r="5" fill="#10b981"/>
  <circle cx="150" cy="80" r="5" fill="#10b981"/>
  <circle cx="160" cy="60" r="5" fill="#10b981"/>
  <text x="100" y="206" font-family="sans-serif" font-size="15" font-weight="bold" fill="#047857" text-anchor="middle">Positive: up</text>
  <line x1="190" y1="40" x2="190" y2="180" stroke="#1e293b" stroke-width="2"/>
  <line x1="190" y1="180" x2="330" y2="180" stroke="#1e293b" stroke-width="2"/>
  <circle cx="210" cy="60" r="5" fill="#ef4444"/>
  <circle cx="230" cy="80" r="5" fill="#ef4444"/>
  <circle cx="250" cy="100" r="5" fill="#ef4444"/>
  <circle cx="270" cy="115" r="5" fill="#ef4444"/>
  <circle cx="290" cy="135" r="5" fill="#ef4444"/>
  <circle cx="310" cy="150" r="5" fill="#ef4444"/>
  <circle cx="325" cy="165" r="5" fill="#ef4444"/>
  <text x="260" y="206" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b91c1c" text-anchor="middle">Negative: down</text>
  <line x1="350" y1="40" x2="350" y2="180" stroke="#1e293b" stroke-width="2"/>
  <line x1="350" y1="180" x2="490" y2="180" stroke="#1e293b" stroke-width="2"/>
  <circle cx="370" cy="120" r="5" fill="#64748b"/>
  <circle cx="390" cy="70" r="5" fill="#64748b"/>
  <circle cx="410" cy="160" r="5" fill="#64748b"/>
  <circle cx="430" cy="90" r="5" fill="#64748b"/>
  <circle cx="450" cy="140" r="5" fill="#64748b"/>
  <circle cx="470" cy="60" r="5" fill="#64748b"/>
  <circle cx="480" cy="120" r="5" fill="#64748b"/>
  <text x="420" y="206" font-family="sans-serif" font-size="15" font-weight="bold" fill="#475569" text-anchor="middle">None: no pattern</text>
</svg>`,

  // Lesson: the same two numbers (92 and 95) drawn twice — axis from 0, then axis from 90.
  NOTES_MISLEADING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" class="w-full h-full drop-shadow-md">
  <rect width="520" height="260" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <text x="140" y="26" font-family="sans-serif" font-size="16" font-weight="800" fill="#047857" text-anchor="middle">Axis starts at 0: fair</text>
  <line x1="40" y1="40" x2="40" y2="200" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="200" x2="240" y2="200" stroke="#1e293b" stroke-width="2"/>
  <text x="32" y="205" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">0</text>
  <text x="32" y="45" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">100</text>
  <rect x="75" y="53" width="50" height="147" fill="#3b82f6" rx="3"/>
  <rect x="155" y="48" width="50" height="152" fill="#3b82f6" rx="3"/>
  <text x="100" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">A: 92</text>
  <text x="180" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">B: 95</text>
  <line x1="265" y1="30" x2="265" y2="230" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="400" y="26" font-family="sans-serif" font-size="16" font-weight="800" fill="#b91c1c" text-anchor="middle">Axis starts at 90: misleading</text>
  <line x1="300" y1="40" x2="300" y2="200" stroke="#1e293b" stroke-width="2"/>
  <line x1="300" y1="200" x2="500" y2="200" stroke="#1e293b" stroke-width="2"/>
  <text x="292" y="205" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">90</text>
  <text x="292" y="45" font-family="monospace" font-size="13" fill="#64748b" text-anchor="end">100</text>
  <rect x="335" y="168" width="50" height="32" fill="#ef4444" rx="3"/>
  <rect x="415" y="120" width="50" height="80" fill="#ef4444" rx="3"/>
  <text x="360" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">A: 92</text>
  <text x="440" y="222" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">B: 95</text>
  <text x="260" y="248" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Same data. Only the starting number on the axis changed.</text>
</svg>`,
};
