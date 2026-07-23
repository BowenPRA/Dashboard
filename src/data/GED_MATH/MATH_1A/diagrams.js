export const DIAGRAMS = {
  ASSESSMENT_GRAPH_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full drop-shadow-md bg-white rounded-lg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#grid)" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1e293b" stroke-width="3" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1e293b" stroke-width="3" />
    <text x="210" y="165" font-family="sans-serif" font-size="12" fill="#64748b">1</text>
    <text x="240" y="215" font-family="sans-serif" font-size="12" fill="#64748b">1</text>
    <line x1="100" y1="360" x2="300" y2="-40" stroke="#3b82f6" stroke-width="4" />
    <circle cx="200" cy="160" r="6" fill="#ef4444" />
    <circle cx="240" cy="80" r="6" fill="#ef4444" />
  </svg>`,

  ASSESSMENT_PERIMETER_ALG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <rect x="50" y="50" width="300" height="150" fill="#f8fafc" stroke="#3b82f6" stroke-width="4" stroke-dasharray="8 4"/>
    <text x="200" y="35" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">3x + 2</text>
    <text x="375" y="130" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">x - 1</text>
  </svg>`,

  ASSESSMENT_AREA_ALG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" class="w-full h-full drop-shadow-md">
    <rect x="80" y="40" width="280" height="120" fill="#f0fdf4" stroke="#10b981" stroke-width="4"/>
    <text x="220" y="105" font-family="sans-serif" font-weight="bold" font-size="24" fill="#10b981" text-anchor="middle">Area = ?</text>
    <text x="220" y="25" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">2x + 4</text>
    <text x="50" y="105" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">5</text>
  </svg>`,

  NOTES_SLOPE_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full drop-shadow-md">
    <line x1="50" y1="250" x2="350" y2="50" stroke="#3b82f6" stroke-width="5" stroke-linecap="round" />
    <line x1="150" y1="183" x2="250" y2="183" stroke="#eab308" stroke-width="3" stroke-dasharray="6" />
    <line x1="250" y1="183" x2="250" y2="116" stroke="#ef4444" stroke-width="3" stroke-dasharray="6" />
    <text x="180" y="210" font-family="sans-serif" font-weight="bold" font-size="16" fill="#eab308">Run (Change in x)</text>
    <text x="265" y="155" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444">Rise</text>
    <circle cx="150" cy="183" r="6" fill="#1e293b" />
    <circle cx="250" cy="116" r="6" fill="#1e293b" />
  </svg>`,

  NOTES_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md">
    <defs>
      <marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
      </marker>
    </defs>
    <rect width="500" height="250" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="135" y="115" font-family="monospace" font-weight="900" font-size="48" fill="#1e293b" text-anchor="middle">4</text>
    <text x="165" y="115" font-family="monospace" font-weight="900" font-size="48" fill="#1e293b" text-anchor="middle">x</text>
    <text x="210" y="115" font-family="monospace" font-weight="900" font-size="48" fill="#1e293b" text-anchor="middle">+</text>
    <text x="250" y="115" font-family="monospace" font-weight="900" font-size="48" fill="#1e293b" text-anchor="middle">7</text>
    <text x="300" y="115" font-family="monospace" font-weight="900" font-size="48" fill="#1e293b" text-anchor="middle">=</text>
    <text x="350" y="115" font-family="monospace" font-weight="900" font-size="48" fill="#1e293b" text-anchor="middle">15</text>
    <rect x="110" y="70" width="75" height="60" rx="8" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
    <rect x="230" y="70" width="40" height="60" rx="8" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
    <rect x="315" y="70" width="70" height="60" rx="8" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
    <text x="65" y="105" font-family="sans-serif" font-weight="bold" font-size="14" fill="#f59e0b" text-anchor="middle">Terms</text>
    <line x1="85" y1="100" x2="105" y2="100" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow-orange)" />
    <path d="M 165 65 L 165 40 L 210 40" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
    <text x="220" y="45" font-family="sans-serif" font-weight="bold" font-size="16" fill="#3b82f6" text-anchor="start">Variable</text>
    <path d="M 135 125 L 135 155 L 90 155 L 90 165" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
    <text x="90" y="185" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444" text-anchor="middle">Coefficient</text>
    <path d="M 250 125 L 250 155" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <path d="M 350 125 L 350 155" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <line x1="250" y1="155" x2="350" y2="155" stroke="#10b981" stroke-width="3" stroke-linecap="round" />
    <path d="M 300 155 L 300 165" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <text x="300" y="185" font-family="sans-serif" font-weight="bold" font-size="16" fill="#10b981" text-anchor="middle">Constants</text>
  </svg>`,

  NOTES_EXPR_VS_EQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" class="w-full h-full drop-shadow-md">
    <rect x="10" y="10" width="230" height="180" rx="15" fill="#fef2f2" stroke="#fca5a5" stroke-width="3"/>
    <text x="125" y="45" font-family="sans-serif" font-weight="bold" font-size="20" fill="#ef4444" text-anchor="middle">Expression</text>
    <text x="125" y="110" font-family="monospace" font-weight="bold" font-size="32" fill="#1e293b" text-anchor="middle">3x + 5</text>
    <text x="125" y="160" font-family="sans-serif" font-weight="600" font-size="14" fill="#64748b" text-anchor="middle">No equal sign.</text>
    <rect x="260" y="10" width="230" height="180" rx="15" fill="#f0fdf4" stroke="#86efac" stroke-width="3"/>
    <text x="375" y="45" font-family="sans-serif" font-weight="bold" font-size="20" fill="#10b981" text-anchor="middle">Equation</text>
    <text x="320" y="110" font-family="monospace" font-weight="bold" font-size="32" fill="#1e293b" text-anchor="middle">3x + 5</text>
    <text x="385" y="110" font-family="monospace" font-weight="bold" font-size="32" fill="#10b981" text-anchor="middle">=</text>
    <text x="435" y="110" font-family="monospace" font-weight="bold" font-size="32" fill="#1e293b" text-anchor="middle">14</text>
    <circle cx="385" cy="100" r="22" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="4"/>
    <text x="375" y="160" font-family="sans-serif" font-weight="600" font-size="14" fill="#64748b" text-anchor="middle">Has an equal sign.</text>
  </svg>`,

  NOTES_LIKE_TERMS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" class="w-full h-full drop-shadow-md">
    <rect width="500" height="200" rx="20" fill="#fffbeb" stroke="#fde68a" stroke-width="3"/>
    <text x="250" y="40" font-family="sans-serif" font-weight="bold" font-size="18" fill="#d97706" text-anchor="middle">Combine Like Terms</text>
    <text x="80" y="105" font-family="monospace" font-weight="bold" font-size="36" fill="#ef4444" text-anchor="middle">2a</text>
    <text x="140" y="105" font-family="monospace" font-weight="bold" font-size="36" fill="#1e293b" text-anchor="middle">+</text>
    <text x="200" y="105" font-family="monospace" font-weight="bold" font-size="36" fill="#ef4444" text-anchor="middle">3a</text>
    <text x="260" y="105" font-family="monospace" font-weight="bold" font-size="36" fill="#1e293b" text-anchor="middle">=</text>
    <text x="350" y="105" font-family="monospace" font-weight="bold" font-size="48" fill="#ef4444" text-anchor="middle">5a</text>
    <text x="80" y="145" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">(2 apples)</text>
    <text x="200" y="145" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">(3 apples)</text>
    <text x="350" y="150" font-family="sans-serif" font-weight="bold" font-size="16" fill="#d97706" text-anchor="middle">(5 apples)</text>
    <path d="M 80 160 L 80 180 L 200 180 L 200 160" fill="none" stroke="#d97706" stroke-width="2"/>
    <path d="M 140 180 L 140 190 L 330 190 L 330 165" fill="none" stroke="#d97706" stroke-width="2" marker-end="url(#arrow)"/>
  </svg>`,

  NOTES_DISTRIBUTIVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" class="w-full h-full drop-shadow-md">
    <defs>
      <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
      </marker>
    </defs>
    <rect width="500" height="200" rx="20" fill="#f3e8ff" stroke="#d8b4fe" stroke-width="3"/>
    <text x="140" y="130" font-family="monospace" font-weight="bold" font-size="40" fill="#a855f7" text-anchor="middle">3</text>
    <text x="175" y="130" font-family="monospace" font-weight="bold" font-size="40" fill="#1e293b" text-anchor="middle">(</text>
    <text x="210" y="130" font-family="monospace" font-weight="bold" font-size="40" fill="#1e293b" text-anchor="middle">x</text>
    <text x="250" y="130" font-family="monospace" font-weight="bold" font-size="40" fill="#1e293b" text-anchor="middle">+</text>
    <text x="290" y="130" font-family="monospace" font-weight="bold" font-size="40" fill="#1e293b" text-anchor="middle">4</text>
    <text x="325" y="130" font-family="monospace" font-weight="bold" font-size="40" fill="#1e293b" text-anchor="middle">)</text>
    <text x="370" y="130" font-family="monospace" font-weight="bold" font-size="32" fill="#1e293b" text-anchor="middle">=</text>
    <text x="440" y="130" font-family="monospace" font-weight="bold" font-size="32" fill="#a855f7" text-anchor="middle">3x + 12</text>
    <path d="M 140 90 Q 175 45 205 90" fill="none" stroke="#a855f7" stroke-width="3" marker-end="url(#arrow-purple)"/>
    <path d="M 135 85 Q 212 10 285 90" fill="none" stroke="#a855f7" stroke-width="3" marker-end="url(#arrow-purple)"/>
    <text x="175" y="42" font-family="sans-serif" font-weight="bold" font-size="14" fill="#a855f7" text-anchor="middle">Multiply</text>
    <text x="245" y="20" font-family="sans-serif" font-weight="bold" font-size="14" fill="#a855f7" text-anchor="middle">Multiply</text>
  </svg>`,

  // --- NEW DIAGRAMS ---
  
  DIAGRAM_NUMBER_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" class="w-full h-full drop-shadow-md bg-white rounded-lg p-4">
    <line x1="20" y1="75" x2="480" y2="75" stroke="#1e293b" stroke-width="4" stroke-linecap="round" />
    <path d="M 480 75 L 470 65 L 470 85 Z" fill="#1e293b" />
    <path d="M 20 75 L 30 65 L 30 85 Z" fill="#1e293b" />
    <line x1="50" y1="65" x2="50" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="50" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">-5</text>
    <line x1="90" y1="65" x2="90" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="90" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">-4</text>
    <line x1="130" y1="65" x2="130" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="130" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">-3</text>
    <line x1="170" y1="65" x2="170" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="170" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">-2</text>
    <line x1="210" y1="65" x2="210" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="210" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">-1</text>
    <line x1="250" y1="65" x2="250" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="250" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">0</text>
    <line x1="290" y1="65" x2="290" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="290" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">1</text>
    <line x1="330" y1="65" x2="330" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="330" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">2</text>
    <line x1="370" y1="65" x2="370" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="370" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">3</text>
    <line x1="410" y1="65" x2="410" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="410" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">4</text>
    <line x1="450" y1="65" x2="450" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="450" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">5</text>
    <circle cx="170" cy="75" r="8" fill="#ef4444" />
    <text x="170" y="45" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ef4444" text-anchor="middle">A</text>
    <circle cx="370" cy="75" r="8" fill="#3b82f6" />
    <text x="370" y="45" font-family="sans-serif" font-size="18" font-weight="bold" fill="#3b82f6" text-anchor="middle">B</text>
  </svg>`,

  DIAGRAM_COORDINATE_PLANE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full drop-shadow-md bg-white rounded-lg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#grid)" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1e293b" stroke-width="3" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1e293b" stroke-width="3" />
    <text x="210" y="215" font-family="sans-serif" font-size="12" fill="#64748b">0</text>
    <circle cx="200" cy="120" r="6" fill="#10b981" />
    <circle cx="320" cy="40" r="6" fill="#10b981" />
    <line x1="100" y1="280" x2="400" y2="-40" stroke="#10b981" stroke-width="4" stroke-dasharray="8 4" opacity="0.6"/>
  </svg>`,

  DIAGRAM_INEQUALITY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" class="w-full h-full drop-shadow-md bg-white rounded-lg p-4">
    <line x1="20" y1="75" x2="480" y2="75" stroke="#1e293b" stroke-width="4" stroke-linecap="round" />
    <path d="M 480 75 L 470 65 L 470 85 Z" fill="#1e293b" />
    <path d="M 20 75 L 30 65 L 30 85 Z" fill="#1e293b" />
    <line x1="250" y1="65" x2="250" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="250" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">0</text>
    <line x1="410" y1="65" x2="410" y2="85" stroke="#1e293b" stroke-width="2" />
    <text x="410" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">4</text>
    <line x1="30" y1="75" x2="400" y2="75" stroke="#f59e0b" stroke-width="8" />
    <path d="M 20 75 L 35 60 L 35 90 Z" fill="#f59e0b" />
    <circle cx="410" cy="75" r="8" fill="white" stroke="#f59e0b" stroke-width="4" />
  </svg>`,

  DIAGRAM_SYSTEM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full drop-shadow-md bg-white rounded-lg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#grid)" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1e293b" stroke-width="3" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1e293b" stroke-width="3" />
    <text x="210" y="165" font-family="sans-serif" font-size="12" fill="#64748b">1</text>
    <text x="240" y="215" font-family="sans-serif" font-size="12" fill="#64748b">1</text>
    <line x1="80" y1="480" x2="320" y2="-40" stroke="#3b82f6" stroke-width="4" />
    <line x1="40" y1="0" x2="360" y2="400" stroke="#f43f5e" stroke-width="4" />
    <circle cx="280" cy="160" r="8" fill="#8b5cf6" stroke="#fff" stroke-width="2" />
  </svg>`,

  DIAGRAM_MAPPING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-4">
    <ellipse cx="120" cy="125" rx="60" ry="100" fill="#f0fdf4" stroke="#10b981" stroke-width="3" />
    <text x="120" y="20" font-family="sans-serif" font-weight="bold" font-size="16" fill="#10b981" text-anchor="middle">Domain (x)</text>
    <text x="120" y="80" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">1</text>
    <text x="120" y="130" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">2</text>
    <text x="120" y="180" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">3</text>
    
    <ellipse cx="280" cy="125" rx="60" ry="100" fill="#f3e8ff" stroke="#a855f7" stroke-width="3" />
    <text x="280" y="20" font-family="sans-serif" font-weight="bold" font-size="16" fill="#a855f7" text-anchor="middle">Range (y)</text>
    <text x="280" y="100" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">4</text>
    <text x="280" y="160" font-family="monospace" font-weight="bold" font-size="20" fill="#1e293b" text-anchor="middle">5</text>
    
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
      </marker>
    </defs>
    <path d="M 140 75 L 250 95" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M 140 125 L 250 155" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M 140 175 L 250 160" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
  </svg>`
};