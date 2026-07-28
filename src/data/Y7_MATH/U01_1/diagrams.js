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

export const DIAGRAMS = {
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

  // Addition table for the Focus "copy and complete" question.
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
};
