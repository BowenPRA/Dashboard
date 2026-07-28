// src/data/Y7_MATH/U01_1/diagrams.js
// Number-line teaching diagrams for 1.1 Adding & Subtracting Integers.
// House style: dark ink on light, monospace numbers, snug viewBox. See docs/svg-diagrams.md.

const MARKERS = `
  <defs>
    <marker id="ah-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#ef4444"/></marker>
    <marker id="ah-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#10b981"/></marker>
    <marker id="ah-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#3b82f6"/></marker>
  </defs>`;

const axis = (ticks) => `
  <line x1="50" y1="90" x2="470" y2="90" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
  ${ticks.map(([x, label, bold]) => `
    <line x1="${x}" y1="84" x2="${x}" y2="96" stroke="#94a3b8" stroke-width="2"/>
    <text x="${x}" y="113" font-family="monospace" font-size="13" font-weight="${bold ? '900' : 'bold'}" fill="${bold ? '#10b981' : '#334155'}" text-anchor="middle">${label}</text>
  `).join('')}`;

// −5 … 5, step 42px
const TICKS_INTRO = [[50,'-5'],[92,'-4'],[134,'-3'],[176,'-2'],[218,'-1'],[260,'0',true],[302,'1'],[344,'2'],[386,'3'],[428,'4'],[470,'5']];
// −8 … 1, step 46.7px
const TICKS_ADD = [[50,'-8'],[96.7,'-7'],[143.3,'-6'],[190,'-5'],[236.7,'-4'],[283.3,'-3'],[330,'-2'],[376.7,'-1'],[423.3,'0',true],[470,'1']];
// −1 … 9, step 42px
const TICKS_SUB = [[50,'-1'],[92,'0',true],[134,'1'],[176,'2'],[218,'3'],[260,'4'],[302,'5'],[344,'6'],[386,'7'],[428,'8'],[470,'9']];
// −10 … 0, step 42px
const TICKS_SUBPOS = [[50,'-10'],[92,'-9'],[134,'-8'],[176,'-7'],[218,'-6'],[260,'-5'],[302,'-4'],[344,'-3'],[386,'-2'],[428,'-1'],[470,'0',true]];
// −6 … 6, step 35px  (word problem 1: 4 − 9 = −5)
const TICKS_WP1 = [[50,'-6'],[85,'-5'],[120,'-4'],[155,'-3'],[190,'-2'],[225,'-1'],[260,'0',true],[295,'1'],[330,'2'],[365,'3'],[400,'4'],[435,'5'],[470,'6']];
// −15 … 20, step 60px  (word problem 2: distance from −15 to 20)
const TICKS_WP2 = [[50,'-15'],[110,'-10'],[170,'-5'],[230,'0',true],[290,'5'],[350,'10'],[410,'15'],[470,'20']];

// Big teaching number line: −5 … 5, coloured integer points, zones, whole-number brace.
const bigTicks = [
  [40, '-5', '#ef4444'], [96, '-4', '#ef4444'], [152, '-3', '#ef4444'], [208, '-2', '#ef4444'], [264, '-1', '#ef4444'],
  [320, '0', '#059669'], [376, '1', '#2563eb'], [432, '2', '#2563eb'], [488, '3', '#2563eb'], [544, '4', '#2563eb'], [600, '5', '#2563eb'],
];

export const DIAGRAMS = {
  // ─────────────────────────────────────────────────────────────────────────
  // The main teaching number line: names the negative / zero / positive parts,
  // marks the integers as points, and braces the whole (natural) numbers.
  // ─────────────────────────────────────────────────────────────────────────
  NOTES_NUMBER_LINE_BIG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" class="w-full h-full drop-shadow-md">${MARKERS}
    <rect x="24" y="100" width="288" height="40" rx="8" fill="#fef2f2"/>
    <rect x="328" y="100" width="288" height="40" rx="8" fill="#eff6ff"/>

    <text x="176" y="52" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ef4444" text-anchor="middle">NEGATIVE</text>
    <text x="176" y="72" font-family="sans-serif" font-size="11" font-weight="bold" fill="#f87171" text-anchor="middle">less than 0</text>
    <text x="320" y="52" font-family="sans-serif" font-size="14" font-weight="900" fill="#059669" text-anchor="middle">ZERO</text>
    <text x="320" y="72" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399" text-anchor="middle">not + or −</text>
    <text x="464" y="52" font-family="sans-serif" font-size="15" font-weight="bold" fill="#3b82f6" text-anchor="middle">POSITIVE</text>
    <text x="464" y="72" font-family="sans-serif" font-size="11" font-weight="bold" fill="#60a5fa" text-anchor="middle">more than 0</text>

    <line x1="18" y1="120" x2="622" y2="120" stroke="#1e293b" stroke-width="3" stroke-linecap="round" marker-start="url(#ah-red)" marker-end="url(#ah-blue)"/>
    ${bigTicks.map(([x, label, fill]) => `
      <line x1="${x}" y1="113" x2="${x}" y2="127" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="${x}" cy="120" r="4" fill="${fill}"/>
      <text x="${x}" y="146" font-family="monospace" font-size="14" font-weight="${label === '0' ? '900' : 'bold'}" fill="${fill}" text-anchor="middle">${label}</text>
    `).join('')}

    <path d="M 320 162 L 320 170 L 600 170 L 600 162" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
    <text x="460" y="192" font-family="sans-serif" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">Whole numbers (0, 1, 2, …)</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // Two signs together → combine into one. Same signs = +, different = −.
  // ─────────────────────────────────────────────────────────────────────────
  NOTES_TWO_SIGNS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 250" class="w-full h-full drop-shadow-md">
    <rect x="20" y="24" width="245" height="200" rx="18" fill="#f0fdf4" stroke="#10b981" stroke-width="2.5"/>
    <text x="142" y="58" font-family="sans-serif" font-size="16" font-weight="bold" fill="#059669" text-anchor="middle">SAME SIGNS</text>
    <text x="142" y="102" font-family="monospace" font-size="26" font-weight="900" fill="#334155" text-anchor="middle">+ +</text>
    <text x="142" y="138" font-family="monospace" font-size="26" font-weight="900" fill="#334155" text-anchor="middle">− −</text>
    <line x1="52" y1="152" x2="232" y2="152" stroke="#a7f3d0" stroke-width="2"/>
    <text x="142" y="190" font-family="monospace" font-size="30" font-weight="900" fill="#059669" text-anchor="middle">= +</text>
    <text x="142" y="214" font-family="sans-serif" font-size="13" font-weight="bold" fill="#10b981" text-anchor="middle">move RIGHT →</text>

    <rect x="295" y="24" width="245" height="200" rx="18" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5"/>
    <text x="417" y="58" font-family="sans-serif" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">DIFFERENT SIGNS</text>
    <text x="417" y="102" font-family="monospace" font-size="26" font-weight="900" fill="#334155" text-anchor="middle">+ −</text>
    <text x="417" y="138" font-family="monospace" font-size="26" font-weight="900" fill="#334155" text-anchor="middle">− +</text>
    <line x1="327" y1="152" x2="507" y2="152" stroke="#fecaca" stroke-width="2"/>
    <text x="417" y="190" font-family="monospace" font-size="30" font-weight="900" fill="#dc2626" text-anchor="middle">= −</text>
    <text x="417" y="214" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444" text-anchor="middle">← move LEFT</text>
  </svg>`,

  // Generic orientation: left = smaller, right = larger.
  NOTES_NUMBER_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" class="w-full h-full drop-shadow-md">${MARKERS}
    <line x1="250" y1="58" x2="80" y2="58" stroke="#ef4444" stroke-width="3" stroke-linecap="round" marker-end="url(#ah-red)"/>
    <line x1="270" y1="58" x2="440" y2="58" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" marker-end="url(#ah-blue)"/>
    <text x="150" y="46" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444" text-anchor="middle">smaller</text>
    <text x="370" y="46" font-family="sans-serif" font-size="13" font-weight="bold" fill="#3b82f6" text-anchor="middle">larger</text>
    ${axis(TICKS_INTRO)}
    <circle cx="260" cy="90" r="5" fill="#10b981"/>
  </svg>`,

  // −3 + −4 = −7 : start at −3, jump 4 LEFT.
  NOTES_ADD_NEG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" class="w-full h-full drop-shadow-md">${MARKERS}
    <path d="M 283.3 82 Q 190 48 96.7 82" fill="none" stroke="#ef4444" stroke-width="3" marker-end="url(#ah-red)"/>
    <text x="190" y="44" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">− 4 (left)</text>
    ${axis(TICKS_ADD)}
    <circle cx="283.3" cy="90" r="6" fill="#3b82f6"/>
    <circle cx="96.7" cy="90" r="6" fill="#ef4444"/>
  </svg>`,

  // 2 − −5 = 2 + 5 = 7 : start at 2, jump 5 RIGHT (add the inverse).
  NOTES_SUB_NEG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" class="w-full h-full drop-shadow-md">${MARKERS}
    <path d="M 176 82 Q 281 48 386 82" fill="none" stroke="#10b981" stroke-width="3" marker-end="url(#ah-green)"/>
    <text x="281" y="44" font-family="sans-serif" font-size="14" font-weight="bold" fill="#10b981" text-anchor="middle">+ 5 (right)</text>
    ${axis(TICKS_SUB)}
    <circle cx="176" cy="90" r="6" fill="#3b82f6"/>
    <circle cx="386" cy="90" r="6" fill="#10b981"/>
  </svg>`,

  // −6 − 3 = −9 : subtracting a positive, move LEFT.
  NOTES_SUB_POS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" class="w-full h-full drop-shadow-md">${MARKERS}
    <path d="M 218 82 Q 155 48 92 82" fill="none" stroke="#ef4444" stroke-width="3" marker-end="url(#ah-red)"/>
    <text x="155" y="44" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">− 3 (left)</text>
    ${axis(TICKS_SUBPOS)}
    <circle cx="218" cy="90" r="6" fill="#3b82f6"/>
    <circle cx="92" cy="90" r="6" fill="#ef4444"/>
  </svg>`,

  // Word problem 1: 4 − 9 = −5 (temperature drops 9 from 4). Jump 9 LEFT.
  NOTES_WP1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" class="w-full h-full drop-shadow-md">${MARKERS}
    <path d="M 400 82 Q 242 40 85 82" fill="none" stroke="#ef4444" stroke-width="3" marker-end="url(#ah-red)"/>
    <text x="242" y="40" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">− 9 (drop)</text>
    ${axis(TICKS_WP1)}
    <circle cx="400" cy="90" r="6" fill="#3b82f6"/>
    <text x="400" y="132" font-family="sans-serif" font-size="12" font-weight="bold" fill="#3b82f6" text-anchor="middle">noon</text>
    <circle cx="85" cy="90" r="6" fill="#ef4444"/>
    <text x="85" y="132" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ef4444" text-anchor="middle">midnight</text>
  </svg>`,

  // Word problem 2: distance from −15 to 20 = 35 (how much warmer). Span RIGHT.
  NOTES_WP2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" class="w-full h-full drop-shadow-md">${MARKERS}
    <path d="M 50 78 Q 260 40 470 78" fill="none" stroke="#10b981" stroke-width="3" marker-end="url(#ah-green)"/>
    <text x="260" y="40" font-family="sans-serif" font-size="14" font-weight="bold" fill="#10b981" text-anchor="middle">+ 35 warmer</text>
    ${axis(TICKS_WP2)}
    <circle cx="50" cy="90" r="6" fill="#3b82f6"/>
    <text x="62" y="132" font-family="sans-serif" font-size="12" font-weight="bold" fill="#3b82f6" text-anchor="middle">freezer</text>
    <circle cx="470" cy="90" r="6" fill="#ef4444"/>
    <text x="458" y="132" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ef4444" text-anchor="middle">room</text>
  </svg>`,

  // Real-world context: a thermometer as a vertical number line (−10 … 10 °C).
  NOTES_THERMOMETER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 240" class="w-full h-full drop-shadow-md">
    <text x="30" y="20" font-family="sans-serif" font-size="13" font-weight="bold" fill="#64748b" text-anchor="middle">°C</text>
    <rect x="72" y="30" width="16" height="176" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="74" y="86" width="12" height="120" fill="#ef4444"/>
    <circle cx="80" cy="210" r="16" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
    ${[['10',30],['5',70],['0',110,true],['-5',150],['-10',190]].map(([lab,y,bold]) => `
      <line x1="66" y1="${y}" x2="72" y2="${y}" stroke="#94a3b8" stroke-width="2"/>
      <text x="60" y="${y+4}" font-family="monospace" font-size="12" font-weight="${bold?'900':'bold'}" fill="${bold?'#10b981':'#64748b'}" text-anchor="end">${lab}</text>`).join('')}
    <line x1="92" y1="158" x2="118" y2="158" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/>
    <text x="122" y="162" font-family="monospace" font-size="12" font-weight="bold" fill="#3b82f6" text-anchor="start">-6</text>
    <path d="M 108 158 L 108 90" fill="none" stroke="#10b981" stroke-width="3" marker-end="url(#therm-up)"/>
    <defs><marker id="therm-up" viewBox="0 0 10 10" refX="5" refY="3" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 10 L5 0 L10 10 z" fill="#10b981"/></marker></defs>
    <text x="135" y="128" font-family="sans-serif" font-size="12" font-weight="bold" fill="#10b981" text-anchor="middle">+9</text>
    <text x="122" y="90" font-family="monospace" font-size="12" font-weight="bold" fill="#10b981" text-anchor="start">3</text>
  </svg>`,

  // Addition table for the "copy and complete" question — BLANK (question) form.
  WB_ADD_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 170" class="w-full h-full">
    <rect x="20" y="20" width="210" height="130" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="90" y1="20" x2="90" y2="150" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="160" y1="20" x2="160" y2="150" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="20" y1="63" x2="230" y2="63" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="20" y1="106" x2="230" y2="106" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="20" y="20" width="70" height="43" fill="#eef2ff"/>
    <text x="55" y="48" font-family="monospace" font-size="18" font-weight="900" fill="#1e293b" text-anchor="middle">+</text>
    <text x="125" y="48" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">4</text>
    <text x="195" y="48" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">-5</text>
    <text x="55" y="91" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">2</text>
    <text x="55" y="134" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">-6</text>
    <text x="125" y="91" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">?</text>
    <text x="195" y="91" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">?</text>
    <text x="125" y="134" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">?</text>
    <text x="195" y="134" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">?</text>
  </svg>`,

  // Addition table — SOLVED form: the four blanks filled, highlighted green.
  WB_ADD_TABLE_SOLVED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 170" class="w-full h-full">
    <rect x="20" y="20" width="210" height="130" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="90" y1="20" x2="90" y2="150" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="160" y1="20" x2="160" y2="150" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="20" y1="63" x2="230" y2="63" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="20" y1="106" x2="230" y2="106" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="20" y="20" width="70" height="43" fill="#eef2ff"/>
    <rect x="90" y="63" width="70" height="43" fill="#f0fdf4"/>
    <rect x="160" y="63" width="70" height="43" fill="#f0fdf4"/>
    <rect x="90" y="106" width="70" height="44" fill="#f0fdf4"/>
    <rect x="160" y="106" width="70" height="44" fill="#f0fdf4"/>
    <text x="55" y="48" font-family="monospace" font-size="18" font-weight="900" fill="#1e293b" text-anchor="middle">+</text>
    <text x="125" y="48" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">4</text>
    <text x="195" y="48" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">-5</text>
    <text x="55" y="91" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">2</text>
    <text x="55" y="134" font-family="monospace" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle">-6</text>
    <text x="125" y="91" font-family="monospace" font-size="16" font-weight="900" fill="#10b981" text-anchor="middle">6</text>
    <text x="195" y="91" font-family="monospace" font-size="16" font-weight="900" fill="#10b981" text-anchor="middle">-3</text>
    <text x="125" y="134" font-family="monospace" font-size="16" font-weight="900" fill="#10b981" text-anchor="middle">-2</text>
    <text x="195" y="134" font-family="monospace" font-size="16" font-weight="900" fill="#10b981" text-anchor="middle">-11</text>
  </svg>`,
};
