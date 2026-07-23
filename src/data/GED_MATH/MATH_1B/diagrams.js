export const DIAGRAMS = {
  NOTES_BALANCE_SCALE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 260" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <line x1="70" y1="70" x2="430" y2="70" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
    <path d="M 250 70 L 250 200" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
    <path d="M 190 210 L 310 210 L 290 200 L 210 200 Z" fill="#1e293b"/>

    <path d="M 70 70 L 40 130 L 100 130 Z" fill="none" stroke="#94a3b8" stroke-width="3"/>
    <rect x="25" y="130" width="90" height="46" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <text x="70" y="160" font-family="sans-serif" font-weight="900" font-size="22" fill="#1e3a8a" text-anchor="middle">2x + 3</text>

    <path d="M 430 70 L 400 130 L 460 130 Z" fill="none" stroke="#94a3b8" stroke-width="3"/>
    <rect x="385" y="130" width="90" height="46" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="430" y="160" font-family="sans-serif" font-weight="900" font-size="22" fill="#166534" text-anchor="middle">11</text>

    <text x="250" y="45" font-family="sans-serif" font-weight="900" font-size="26" fill="#0f172a" text-anchor="middle">=</text>
    <text x="250" y="245" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Whatever you do to one side, do to the other</text>
  </svg>`,

  NOTES_INVERSE_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 240" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="mb1arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
      </marker>
    </defs>
    <rect x="20" y="90" width="120" height="60" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="3"/>
    <text x="80" y="128" font-family="sans-serif" font-weight="900" font-size="22" fill="#0f172a" text-anchor="middle">2x + 3 = 11</text>

    <line x1="145" y1="120" x2="195" y2="120" stroke="#64748b" stroke-width="3" marker-end="url(#mb1arrow)"/>
    <text x="170" y="105" font-family="sans-serif" font-weight="bold" font-size="13" fill="#dc2626" text-anchor="middle">− 3</text>
    <text x="170" y="146" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">both sides</text>

    <rect x="200" y="90" width="110" height="60" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
    <text x="255" y="128" font-family="sans-serif" font-weight="900" font-size="22" fill="#78350f" text-anchor="middle">2x = 8</text>

    <line x1="315" y1="120" x2="365" y2="120" stroke="#64748b" stroke-width="3" marker-end="url(#mb1arrow)"/>
    <text x="340" y="105" font-family="sans-serif" font-weight="bold" font-size="13" fill="#dc2626" text-anchor="middle">÷ 2</text>
    <text x="340" y="146" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">both sides</text>

    <rect x="370" y="90" width="120" height="60" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="430" y="128" font-family="sans-serif" font-weight="900" font-size="22" fill="#166534" text-anchor="middle">x = 4</text>

    <text x="255" y="40" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Undo in reverse order: + and − first, then × and ÷</text>
    <text x="255" y="205" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Check: 2(4) + 3 = 11 ✓</text>
  </svg>`,

  NOTES_INEQUALITY_SYMBOLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="15" y="30" width="115" height="150" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="72" y="80" font-family="sans-serif" font-weight="900" font-size="40" fill="#1e3a8a" text-anchor="middle">&lt;</text>
    <text x="72" y="118" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1e40af" text-anchor="middle">less than</text>
    <text x="72" y="150" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"fewer than"</text>
    <text x="72" y="168" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"under"</text>

    <rect x="145" y="30" width="115" height="150" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="3"/>
    <text x="202" y="80" font-family="sans-serif" font-weight="900" font-size="40" fill="#166534" text-anchor="middle">&gt;</text>
    <text x="202" y="118" font-family="sans-serif" font-weight="bold" font-size="15" fill="#15803d" text-anchor="middle">greater than</text>
    <text x="202" y="150" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"more than"</text>
    <text x="202" y="168" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"over"</text>

    <rect x="275" y="30" width="115" height="150" rx="12" fill="#fffbeb" stroke="#d97706" stroke-width="3"/>
    <text x="332" y="80" font-family="sans-serif" font-weight="900" font-size="36" fill="#78350f" text-anchor="middle">≤</text>
    <text x="332" y="118" font-family="sans-serif" font-weight="bold" font-size="14" fill="#92400e" text-anchor="middle">at most</text>
    <text x="332" y="150" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"no more than"</text>
    <text x="332" y="168" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"maximum"</text>

    <rect x="405" y="30" width="100" height="150" rx="12" fill="#fdf2f8" stroke="#db2777" stroke-width="3"/>
    <text x="455" y="80" font-family="sans-serif" font-weight="900" font-size="36" fill="#831843" text-anchor="middle">≥</text>
    <text x="455" y="118" font-family="sans-serif" font-weight="bold" font-size="14" fill="#9d174d" text-anchor="middle">at least</text>
    <text x="455" y="150" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"no less than"</text>
    <text x="455" y="168" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">"minimum"</text>
  </svg>`,

  NOTES_OPEN_CLOSED_CIRCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 240" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="130" y="34" font-family="sans-serif" font-weight="900" font-size="18" fill="#0f172a" text-anchor="middle">x &gt; 2   (open circle)</text>
    <line x1="20" y1="80" x2="245" y2="80" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>
    <line x1="118" y1="80" x2="245" y2="80" stroke="#3b82f6" stroke-width="7" stroke-linecap="round"/>
    <polygon points="245,72 260,80 245,88" fill="#3b82f6"/>
    <circle cx="118" cy="80" r="10" fill="#ffffff" stroke="#3b82f6" stroke-width="5"/>
    <text x="118" y="112" font-family="sans-serif" font-weight="bold" font-size="15" fill="#334155" text-anchor="middle">2</text>
    <text x="130" y="138" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">2 is NOT included</text>

    <text x="390" y="34" font-family="sans-serif" font-weight="900" font-size="18" fill="#0f172a" text-anchor="middle">x ≥ 2   (closed circle)</text>
    <line x1="280" y1="80" x2="505" y2="80" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>
    <line x1="378" y1="80" x2="505" y2="80" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/>
    <polygon points="505,72 520,80 505,88" fill="#16a34a"/>
    <circle cx="378" cy="80" r="10" fill="#16a34a" stroke="#16a34a" stroke-width="5"/>
    <text x="378" y="112" font-family="sans-serif" font-weight="bold" font-size="15" fill="#334155" text-anchor="middle">2</text>
    <text x="390" y="138" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">2 IS included</text>

    <text x="260" y="190" font-family="sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">A filled circle means the boundary number counts as a solution.</text>
    <text x="260" y="214" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">An empty circle means it does not.</text>
  </svg>`,

  NOTES_FLIP_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="20" y="25" width="460" height="52" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="250" y="58" font-family="sans-serif" font-weight="900" font-size="19" fill="#991b1b" text-anchor="middle">Multiply or divide by a NEGATIVE → flip the sign</text>

    <text x="130" y="115" font-family="sans-serif" font-weight="900" font-size="22" fill="#0f172a" text-anchor="middle">−2x &lt; 8</text>
    <line x1="215" y1="108" x2="275" y2="108" stroke="#64748b" stroke-width="3"/>
    <polygon points="275,101 290,108 275,115" fill="#64748b"/>
    <text x="248" y="95" font-family="sans-serif" font-weight="bold" font-size="14" fill="#dc2626" text-anchor="middle">÷ (−2)</text>
    <text x="375" y="115" font-family="sans-serif" font-weight="900" font-size="22" fill="#166534" text-anchor="middle">x &gt; −4</text>

    <text x="250" y="160" font-family="sans-serif" font-weight="bold" font-size="15" fill="#334155" text-anchor="middle">Why? Check with a number: is −3 a solution?</text>
    <text x="250" y="186" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">−2(−3) = 6, and 6 &lt; 8 ✓  so −3 works — and −3 &gt; −4 ✓</text>
    <text x="250" y="220" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">Adding or subtracting a negative does NOT flip the sign.</text>
  </svg>`,

  DIAGRAM_NUMBER_LINE_SOLUTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 180" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <line x1="30" y1="95" x2="470" y2="95" stroke="#1e293b" stroke-width="4"/>
    <polygon points="30,87 16,95 30,103" fill="#1e293b"/>
    <polygon points="470,87 484,95 470,103" fill="#1e293b"/>
    <g font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">
      <line x1="80"  y1="86" x2="80"  y2="104" stroke="#94a3b8" stroke-width="3"/><text x="80"  y="128">−3</text>
      <line x1="145" y1="86" x2="145" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="145" y="128">−2</text>
      <line x1="210" y1="86" x2="210" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="210" y="128">−1</text>
      <line x1="275" y1="86" x2="275" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="275" y="128">0</text>
      <line x1="340" y1="86" x2="340" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="340" y="128">1</text>
      <line x1="405" y1="86" x2="405" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="405" y="128">2</text>
    </g>
    <line x1="145" y1="95" x2="470" y2="95" stroke="#f97316" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
    <circle cx="145" cy="95" r="11" fill="#ffffff" stroke="#f97316" stroke-width="6"/>
    <text x="250" y="48" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">What inequality does this number line show?</text>
  </svg>`,

  DIAGRAM_COMPOUND_RANGE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 180" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <line x1="30" y1="95" x2="470" y2="95" stroke="#1e293b" stroke-width="4"/>
    <polygon points="30,87 16,95 30,103" fill="#1e293b"/>
    <polygon points="470,87 484,95 470,103" fill="#1e293b"/>
    <g font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">
      <line x1="80"  y1="86" x2="80"  y2="104" stroke="#94a3b8" stroke-width="3"/><text x="80"  y="128">0</text>
      <line x1="145" y1="86" x2="145" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="145" y="128">1</text>
      <line x1="210" y1="86" x2="210" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="210" y="128">2</text>
      <line x1="275" y1="86" x2="275" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="275" y="128">3</text>
      <line x1="340" y1="86" x2="340" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="340" y="128">4</text>
      <line x1="405" y1="86" x2="405" y2="104" stroke="#94a3b8" stroke-width="3"/><text x="405" y="128">5</text>
    </g>
    <line x1="145" y1="95" x2="340" y2="95" stroke="#8b5cf6" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
    <circle cx="145" cy="95" r="11" fill="#8b5cf6" stroke="#8b5cf6" stroke-width="6"/>
    <circle cx="340" cy="95" r="11" fill="#ffffff" stroke="#8b5cf6" stroke-width="6"/>
    <text x="250" y="48" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Describe the range of values shown below.</text>
  </svg>`,

  DIAGRAM_WORD_PROBLEM_BUDGET: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="30" y="25" width="440" height="58" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="3"/>
    <text x="250" y="50" font-family="sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">Mai has $60. A bus pass costs $15.</text>
    <text x="250" y="72" font-family="sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">Each lunch costs $6. She must keep the bus pass.</text>

    <rect x="60" y="110" width="110" height="55" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="3"/>
    <text x="115" y="134" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e3a8a" text-anchor="middle">15</text>
    <text x="115" y="154" font-family="sans-serif" font-size="12" fill="#1e40af" text-anchor="middle">bus pass</text>

    <text x="190" y="145" font-family="sans-serif" font-weight="900" font-size="24" fill="#334155" text-anchor="middle">+</text>

    <rect x="210" y="110" width="110" height="55" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
    <text x="265" y="134" font-family="sans-serif" font-weight="900" font-size="16" fill="#78350f" text-anchor="middle">6L</text>
    <text x="265" y="154" font-family="sans-serif" font-size="12" fill="#92400e" text-anchor="middle">L lunches</text>

    <text x="340" y="145" font-family="sans-serif" font-weight="900" font-size="24" fill="#334155" text-anchor="middle">≤</text>

    <rect x="360" y="110" width="90" height="55" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>
    <text x="405" y="134" font-family="sans-serif" font-weight="900" font-size="16" fill="#166534" text-anchor="middle">60</text>
    <text x="405" y="154" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">her money</text>

    <text x="250" y="205" font-family="sans-serif" font-weight="bold" font-size="15" fill="#475569" text-anchor="middle">How many lunches can Mai buy?</text>
    <text x="250" y="230" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Remember: she cannot buy part of a lunch.</text>
  </svg>`,

  DIAGRAM_CHECK_SOLUTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 230" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="250" y="38" font-family="sans-serif" font-weight="900" font-size="18" fill="#0f172a" text-anchor="middle">A student solved 5x − 4 = 21 and got x = 5.</text>

    <rect x="45" y="65" width="185" height="115" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
    <text x="137" y="92" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Their working</text>
    <text x="137" y="122" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">5x − 4 = 21</text>
    <text x="137" y="147" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">5x = 25</text>
    <text x="137" y="170" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">x = 5</text>

    <rect x="270" y="65" width="185" height="115" rx="12" fill="#fffbeb" stroke="#d97706" stroke-width="3"/>
    <text x="362" y="92" font-family="sans-serif" font-weight="bold" font-size="14" fill="#92400e" text-anchor="middle">Check by substituting</text>
    <text x="362" y="124" font-family="sans-serif" font-weight="900" font-size="17" fill="#78350f" text-anchor="middle">5(5) − 4 = ?</text>
    <text x="362" y="152" font-family="sans-serif" font-weight="900" font-size="17" fill="#78350f" text-anchor="middle">25 − 4 = 21</text>
    <text x="362" y="174" font-family="sans-serif" font-weight="bold" font-size="14" fill="#15803d" text-anchor="middle">matches ✓</text>

    <text x="250" y="210" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Explain how checking proves the answer is correct.</text>
  </svg>`,

  ASSESSMENT_NUMBER_LINE_LE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 150" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <line x1="25" y1="75" x2="435" y2="75" stroke="#1e293b" stroke-width="4"/>
    <polygon points="25,67 12,75 25,83" fill="#1e293b"/>
    <polygon points="435,67 448,75 435,83" fill="#1e293b"/>
    <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle">
      <line x1="70"  y1="67" x2="70"  y2="83" stroke="#94a3b8" stroke-width="3"/><text x="70"  y="106">−1</text>
      <line x1="130" y1="67" x2="130" y2="83" stroke="#94a3b8" stroke-width="3"/><text x="130" y="106">0</text>
      <line x1="190" y1="67" x2="190" y2="83" stroke="#94a3b8" stroke-width="3"/><text x="190" y="106">1</text>
      <line x1="250" y1="67" x2="250" y2="83" stroke="#94a3b8" stroke-width="3"/><text x="250" y="106">2</text>
      <line x1="310" y1="67" x2="310" y2="83" stroke="#94a3b8" stroke-width="3"/><text x="310" y="106">3</text>
      <line x1="370" y1="67" x2="370" y2="83" stroke="#94a3b8" stroke-width="3"/><text x="370" y="106">4</text>
    </g>
    <line x1="25" y1="75" x2="310" y2="75" stroke="#ef4444" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
    <circle cx="310" cy="75" r="10" fill="#ef4444" stroke="#ef4444" stroke-width="5"/>
  </svg>`,

  ASSESSMENT_TEMPERATURE_RANGE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 210" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="175" y="20" width="46" height="150" rx="23" fill="#f1f5f9" stroke="#64748b" stroke-width="4"/>
    <rect x="184" y="66" width="28" height="96" rx="14" fill="#ef4444" opacity="0.75"/>
    <circle cx="198" cy="168" r="26" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
    <line x1="221" y1="60" x2="255" y2="60" stroke="#16a34a" stroke-width="4"/>
    <text x="330" y="65" font-family="sans-serif" font-weight="bold" font-size="15" fill="#166534" text-anchor="middle">safe max 8°C</text>
    <line x1="221" y1="128" x2="255" y2="128" stroke="#2563eb" stroke-width="4"/>
    <text x="330" y="133" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1e40af" text-anchor="middle">safe min 2°C</text>
    <text x="105" y="60" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">A fridge must</text>
    <text x="105" y="80" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">stay in the</text>
    <text x="105" y="100" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">safe range</text>
  </svg>`
};
