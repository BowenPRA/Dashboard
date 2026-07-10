// src/data/GED_MATH/MATH_1A/diagrams.js

export const DIAGRAMS = {
  // --- LECTURE NOTES SVGs ---

  NOTES_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <text x="200" y="100" font-family="sans-serif" font-weight="900" font-size="48" fill="#1e293b" text-anchor="middle">3x + 5</text>
      
      <path d="M 160 110 Q 140 160 100 160" fill="none" stroke="#3b82f6" stroke-width="3" />
      <circle cx="160" cy="110" r="4" fill="#3b82f6"/>
      <text x="100" y="180" font-family="sans-serif" font-weight="bold" font-size="16" fill="#3b82f6" text-anchor="middle">Coefficient</text>

      <path d="M 185 110 Q 190 190 200 190" fill="none" stroke="#ef4444" stroke-width="3" />
      <circle cx="185" cy="110" r="4" fill="#ef4444"/>
      <text x="200" y="210" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444" text-anchor="middle">Variable</text>

      <path d="M 235 110 Q 250 160 300 160" fill="none" stroke="#22c55e" stroke-width="3" />
      <circle cx="235" cy="110" r="4" fill="#22c55e"/>
      <text x="300" y="180" font-family="sans-serif" font-weight="bold" font-size="16" fill="#22c55e" text-anchor="middle">Constant</text>

      <path d="M 150 45 Q 170 20 190 45" fill="none" stroke="#8b5cf6" stroke-width="3"/>
      <text x="170" y="20" font-family="sans-serif" font-weight="bold" font-size="14" fill="#8b5cf6" text-anchor="middle">Term</text>
    </svg>`,

  NOTES_EXPR_VS_EQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md">
      <rect x="20" y="40" width="210" height="170" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
      <text x="125" y="75" font-family="sans-serif" font-weight="bold" font-size="18" fill="#64748b" text-anchor="middle">Expression</text>
      <text x="125" y="135" font-family="sans-serif" font-weight="900" font-size="32" fill="#3b82f6" text-anchor="middle">2x + 4</text>
      <text x="125" y="185" font-family="sans-serif" font-weight="bold" font-size="14" fill="#94a3b8" text-anchor="middle">No equal sign.</text>

      <rect x="270" y="40" width="210" height="170" rx="12" fill="#f0fdf4" stroke="#86efac" stroke-width="4"/>
      <text x="375" y="75" font-family="sans-serif" font-weight="bold" font-size="18" fill="#16a34a" text-anchor="middle">Equation</text>
      <text x="375" y="135" font-family="sans-serif" font-weight="900" font-size="32" fill="#16a34a" text-anchor="middle">2x + 4 = 10</text>
      <text x="375" y="185" font-family="sans-serif" font-weight="bold" font-size="14" fill="#4ade80" text-anchor="middle">Shows two equal sides.</text>
    </svg>`,

  NOTES_LIKE_TERMS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 200" class="w-full h-full drop-shadow-md">
      <rect x="50" y="70" width="30" height="30" fill="#3b82f6" rx="4"/>
      <rect x="90" y="70" width="30" height="30" fill="#3b82f6" rx="4"/>
      <text x="85" y="130" font-family="sans-serif" font-weight="bold" font-size="20" fill="#3b82f6" text-anchor="middle">2x</text>

      <text x="140" y="95" font-family="sans-serif" font-weight="900" font-size="24" fill="#64748b" text-anchor="middle">+</text>

      <rect x="170" y="70" width="30" height="30" fill="#3b82f6" rx="4"/>
      <rect x="210" y="70" width="30" height="30" fill="#3b82f6" rx="4"/>
      <rect x="250" y="70" width="30" height="30" fill="#3b82f6" rx="4"/>
      <text x="225" y="130" font-family="sans-serif" font-weight="bold" font-size="20" fill="#3b82f6" text-anchor="middle">3x</text>

      <text x="300" y="95" font-family="sans-serif" font-weight="900" font-size="24" fill="#64748b" text-anchor="middle">=</text>

      <rect x="330" y="50" width="30" height="30" fill="#3b82f6" rx="4"/>
      <rect x="370" y="50" width="30" height="30" fill="#3b82f6" rx="4"/>
      <rect x="350" y="90" width="30" height="30" fill="#3b82f6" rx="4"/>
      <rect x="390" y="90" width="30" height="30" fill="#3b82f6" rx="4"/>
      <rect x="330" y="130" width="30" height="30" fill="#3b82f6" rx="4"/>
      <text x="375" y="150" font-family="sans-serif" font-weight="bold" font-size="20" fill="#3b82f6" text-anchor="middle">5x</text>
    </svg>`,

  NOTES_DISTRIBUTIVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <text x="200" y="50" font-family="sans-serif" font-weight="900" font-size="24" fill="#1e293b" text-anchor="middle">3(x + 4)</text>
      
      <path d="M 180 25 Q 200 10 215 25" fill="none" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow)"/>
      <path d="M 175 20 Q 210 -5 245 25" fill="none" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow)"/>

      <rect x="80" y="100" width="120" height="80" fill="#fee2e2" stroke="#ef4444" stroke-width="4"/>
      <rect x="200" y="100" width="120" height="80" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
      
      <text x="60" y="145" font-family="sans-serif" font-weight="bold" font-size="20" fill="#1e293b">3</text>
      <text x="140" y="90" font-family="sans-serif" font-weight="bold" font-size="20" fill="#ef4444">x</text>
      <text x="260" y="90" font-family="sans-serif" font-weight="bold" font-size="20" fill="#3b82f6">+ 4</text>
      
      <text x="140" y="145" font-family="sans-serif" font-weight="900" font-size="24" fill="#ef4444" text-anchor="middle">3x</text>
      <text x="260" y="145" font-family="sans-serif" font-weight="900" font-size="24" fill="#3b82f6" text-anchor="middle">12</text>

      <text x="200" y="220" font-family="sans-serif" font-weight="900" font-size="24" fill="#1e293b" text-anchor="middle">3x + 12</text>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="currentColor"/>
        </marker>
      </defs>
    </svg>`,

  NOTES_BALANCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <polygon points="200,200 170,240 230,240" fill="#94a3b8"/>
      <line x1="200" y1="200" x2="200" y2="100" stroke="#64748b" stroke-width="6"/>
      
      <line x1="80" y1="100" x2="320" y2="100" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
      
      <line x1="80" y1="100" x2="50" y2="160" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="80" y1="100" x2="110" y2="160" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M 40 160 Q 80 180 120 160" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
      
      <rect x="60" y="135" width="25" height="25" fill="#3b82f6" rx="4"/>
      <text x="72" y="153" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">x</text>
      <circle cx="95" cy="150" r="5" fill="#f59e0b"/>
      <circle cx="105" cy="150" r="5" fill="#f59e0b"/>
      <circle cx="100" cy="140" r="5" fill="#f59e0b"/>

      <line x1="320" y1="100" x2="290" y2="160" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="320" y1="100" x2="350" y2="160" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M 280 160 Q 320 180 360 160" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>

      <circle cx="300" cy="150" r="5" fill="#f59e0b"/>
      <circle cx="310" cy="150" r="5" fill="#f59e0b"/>
      <circle cx="320" cy="150" r="5" fill="#f59e0b"/>
      <circle cx="330" cy="150" r="5" fill="#f59e0b"/>
      <circle cx="340" cy="150" r="5" fill="#f59e0b"/>
      <circle cx="305" cy="140" r="5" fill="#f59e0b"/>
      <circle cx="315" cy="140" r="5" fill="#f59e0b"/>
      <circle cx="325" cy="140" r="5" fill="#f59e0b"/>

      <text x="200" y="60" font-family="sans-serif" font-weight="900" font-size="24" fill="#1e293b" text-anchor="middle">x + 3 = 8</text>
    </svg>`,

  NOTES_TWO_STEP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md">
      <rect x="50" y="50" width="400" height="150" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="4"/>
      
      <text x="250" y="90" font-family="sans-serif" font-weight="900" font-size="24" fill="#1e293b" text-anchor="middle">2x + 5 = 15</text>
      
      <text x="250" y="140" font-family="sans-serif" font-weight="bold" font-size="20" fill="#64748b" text-anchor="middle">2x = 10</text>
      
      <text x="250" y="180" font-family="sans-serif" font-weight="900" font-size="24" fill="#16a34a" text-anchor="middle">x = 5</text>

      <path d="M 160 85 L 140 85 L 140 130 L 160 130" fill="none" stroke="#ef4444" stroke-width="3"/>
      <text x="130" y="112" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="end">- 5</text>

      <path d="M 160 135 L 140 135 L 140 175 L 160 175" fill="none" stroke="#3b82f6" stroke-width="3"/>
      <text x="130" y="160" font-family="sans-serif" font-weight="bold" font-size="14" fill="#3b82f6" text-anchor="end">÷ 2</text>

      <path d="M 340 85 L 360 85 L 360 130 L 340 130" fill="none" stroke="#ef4444" stroke-width="3"/>
      <text x="370" y="112" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="start">- 5</text>

      <path d="M 340 135 L 360 135 L 360 175 L 340 175" fill="none" stroke="#3b82f6" stroke-width="3"/>
      <text x="370" y="160" font-family="sans-serif" font-weight="bold" font-size="14" fill="#3b82f6" text-anchor="start">÷ 2</text>
    </svg>`
};