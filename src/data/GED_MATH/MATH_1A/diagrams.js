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

  NOTES_SLOPE_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full drop-shadow-md">
    <line x1="50" y1="250" x2="350" y2="50" stroke="#3b82f6" stroke-width="5" stroke-linecap="round" />
    <line x1="150" y1="183" x2="250" y2="183" stroke="#eab308" stroke-width="3" stroke-dasharray="6" />
    <line x1="250" y1="183" x2="250" y2="116" stroke="#ef4444" stroke-width="3" stroke-dasharray="6" />
    <text x="180" y="210" font-family="sans-serif" font-weight="bold" font-size="16" fill="#eab308">Run (Change in x)</text>
    <text x="265" y="155" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444">Rise</text>
    <circle cx="150" cy="183" r="6" fill="#1e293b" />
    <circle cx="250" cy="116" r="6" fill="#1e293b" />
  </svg>`
};