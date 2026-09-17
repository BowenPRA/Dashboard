// src/data/GED_SCIENCE/SCI_2B/diagrams.js
// Authored SVGs for Force, Motion & Energy. We own every number, so the mark
// schemes are exact. Literal <text> labels so audit:svg can see them. Dark ink
// on light fills — these render on white, not theme-flipped.

export const DIAGRAMS = {
  // Distance–time graph of a walk: slow, stopped, then fast.
  DT_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="270" y="26" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">A Walk to the Shop</text>
  <line x1="70" y1="70" x2="490" y2="70" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="195" x2="490" y2="195" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="40" x2="70" y2="320" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="320" x2="500" y2="320" stroke="#334155" stroke-width="3"/>
  <text x="60" y="325" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">0</text>
  <text x="60" y="200" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">250</text>
  <text x="60" y="75" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">500</text>
  <text x="70" y="342" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">0</text>
  <text x="140" y="342" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">1</text>
  <text x="210" y="342" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">2</text>
  <text x="280" y="342" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">3</text>
  <text x="350" y="342" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">4</text>
  <text x="420" y="342" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">5</text>
  <text x="490" y="342" font-family="monospace" font-size="14" fill="#334155" text-anchor="middle">6</text>
  <polyline points="70,320 210,220 350,220 420,70" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="210" cy="220" r="5" fill="#1e40af"/>
  <circle cx="350" cy="220" r="5" fill="#1e40af"/>
  <circle cx="420" cy="70" r="5" fill="#1e40af"/>
  <text x="120" y="255" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e40af" text-anchor="middle">A</text>
  <text x="280" y="205" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e40af" text-anchor="middle">B</text>
  <text x="410" y="140" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e40af" text-anchor="middle">C</text>
  <text x="285" y="366" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Time (minutes)</text>
  <text x="22" y="180" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 22 180)">Distance (metres)</text>
</svg>`,

  // Force diagram: a box pushed along a floor, four labelled arrows.
  FORCES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" class="w-full h-full">
  <rect x="0" y="0" width="520" height="340" fill="#ffffff" rx="10"/>
  <defs>
    <marker id="ar-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/></marker>
    <marker id="ar-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/></marker>
    <marker id="ar-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
    <marker id="ar-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
  </defs>
  <text x="260" y="26" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Forces on a Box Being Pushed</text>
  <line x1="40" y1="250" x2="480" y2="250" stroke="#334155" stroke-width="3"/>
  <rect x="210" y="150" width="100" height="100" fill="#fef3c7" stroke="#d97706" stroke-width="3" rx="6"/>
  <text x="260" y="206" font-family="sans-serif" font-size="16" font-weight="800" fill="#92400e" text-anchor="middle">box</text>
  <line x1="310" y1="200" x2="440" y2="200" stroke="#ef4444" stroke-width="5" marker-end="url(#ar-red)"/>
  <text x="375" y="185" font-family="sans-serif" font-size="15" font-weight="700" fill="#ef4444" text-anchor="middle">push 30 N</text>
  <line x1="210" y1="200" x2="160" y2="200" stroke="#d97706" stroke-width="5" marker-end="url(#ar-amber)"/>
  <text x="130" y="185" font-family="sans-serif" font-size="15" font-weight="700" fill="#d97706" text-anchor="middle">friction 10 N</text>
  <line x1="260" y1="150" x2="260" y2="70" stroke="#10b981" stroke-width="5" marker-end="url(#ar-green)"/>
  <text x="330" y="80" font-family="sans-serif" font-size="15" font-weight="700" fill="#10b981" text-anchor="middle">floor pushes up 20 N</text>
  <line x1="260" y1="250" x2="260" y2="320" stroke="#3b82f6" stroke-width="5" marker-end="url(#ar-blue)"/>
  <text x="335" y="300" font-family="sans-serif" font-size="15" font-weight="700" fill="#3b82f6" text-anchor="middle">gravity 20 N</text>
  <text x="110" y="300" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">N = newton, the unit of force</text>
</svg>`,

  // Energy bar chart: a ball dropped from a shelf, potential vs kinetic.
  ENERGY_BARS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" class="w-full h-full">
  <rect x="0" y="0" width="520" height="380" fill="#ffffff" rx="10"/>
  <text x="270" y="26" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Energy of a Falling Ball</text>
  <line x1="70" y1="40" x2="70" y2="300" stroke="#334155" stroke-width="3"/>
  <line x1="70" y1="300" x2="500" y2="300" stroke="#334155" stroke-width="3"/>
  <text x="60" y="305" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">0</text>
  <text x="60" y="185" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">50</text>
  <text x="60" y="65" font-family="monospace" font-size="14" fill="#334155" text-anchor="end">100</text>
  <rect x="95" y="60" width="50" height="240" fill="#3b82f6"/>
  <rect x="150" y="300" width="50" height="0" fill="#f59e0b"/>
  <rect x="235" y="180" width="50" height="120" fill="#3b82f6"/>
  <rect x="290" y="180" width="50" height="120" fill="#f59e0b"/>
  <rect x="375" y="300" width="50" height="0" fill="#3b82f6"/>
  <rect x="430" y="60" width="50" height="240" fill="#f59e0b"/>
  <text x="120" y="52" font-family="monospace" font-size="14" font-weight="700" fill="#1e40af" text-anchor="middle">100</text>
  <text x="175" y="292" font-family="monospace" font-size="14" font-weight="700" fill="#b45309" text-anchor="middle">0</text>
  <text x="260" y="172" font-family="monospace" font-size="14" font-weight="700" fill="#1e40af" text-anchor="middle">50</text>
  <text x="315" y="172" font-family="monospace" font-size="14" font-weight="700" fill="#b45309" text-anchor="middle">50</text>
  <text x="400" y="292" font-family="monospace" font-size="14" font-weight="700" fill="#1e40af" text-anchor="middle">0</text>
  <text x="455" y="52" font-family="monospace" font-size="14" font-weight="700" fill="#b45309" text-anchor="middle">100</text>
  <text x="147" y="322" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Top (held)</text>
  <text x="287" y="322" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Halfway down</text>
  <text x="427" y="322" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">Just before floor</text>
  <rect x="150" y="345" width="16" height="16" fill="#3b82f6"/>
  <text x="175" y="358" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b">potential (stored)</text>
  <rect x="330" y="345" width="16" height="16" fill="#f59e0b"/>
  <text x="355" y="358" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b">kinetic (moving)</text>
  <text x="22" y="170" font-family="sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 22 170)">Energy (joules)</text>
</svg>`,

  // A labelled transverse wave: wavelength, amplitude, rest position.
  WAVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" class="w-full h-full">
  <rect x="0" y="0" width="520" height="320" fill="#ffffff" rx="10"/>
  <defs>
    <marker id="ar-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/></marker>
    <marker id="ar-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
  </defs>
  <text x="260" y="26" font-family="sans-serif" font-size="19" font-weight="800" fill="#1e293b" text-anchor="middle">Parts of a Wave</text>
  <line x1="40" y1="170" x2="480" y2="170" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="440" y="192" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">rest position</text>
  <path d="M 40 170 C 70 90, 110 90, 140 170 S 210 250, 240 170 S 310 90, 340 170 S 410 250, 440 170" fill="none" stroke="#3b82f6" stroke-width="4"/>
  <circle cx="90" cy="110" r="5" fill="#1e40af"/>
  <circle cx="290" cy="110" r="5" fill="#1e40af"/>
  <circle cx="190" cy="230" r="5" fill="#1e40af"/>
  <text x="90" y="92" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e40af" text-anchor="middle">crest</text>
  <text x="190" y="256" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e40af" text-anchor="middle">trough</text>
  <line x1="92" y1="60" x2="288" y2="60" stroke="#ef4444" stroke-width="3" marker-start="url(#ar-w)" marker-end="url(#ar-w)"/>
  <text x="190" y="52" font-family="sans-serif" font-size="15" font-weight="700" fill="#ef4444" text-anchor="middle">wavelength (crest to crest)</text>
  <line x1="290" y1="168" x2="290" y2="114" stroke="#10b981" stroke-width="3" marker-end="url(#ar-a)"/>
  <text x="365" y="145" font-family="sans-serif" font-size="15" font-weight="700" fill="#10b981" text-anchor="middle">amplitude</text>
  <text x="260" y="296" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">frequency = how many waves pass a point each second (Hz)</text>
</svg>`,
};
