// src/data/AOPS/PROP_1A/diagrams.js
// Teaching SVGs for Direct Proportion. House style: neutral white card, dark ink
// on light fill (these render on white, never theme-flipped), monospace for
// notation and sans-serif for labels, one colour per concept — green for direct
// / "with the stream", red for inverse / "against the stream", blue for the
// water itself. See docs/svg-diagrams.md; `npm run audit:svg AOPS` must be clean.

export const DIAGRAMS = {
  // The table that makes "multiply one, the other is multiplied by the same
  // amount" visible: x doubles down the left, y doubles down the right.
  PROPORTION_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 330" class="w-full h-full drop-shadow-md">
  <rect width="520" height="330" fill="#ffffff" rx="10"/>
  <text x="260" y="32" font-family="sans-serif" font-size="18" font-weight="900" fill="#1e293b" text-anchor="middle">Petrol: litres and cost</text>

  <rect x="50" y="52" width="180" height="38" fill="#eff6ff" stroke="#94a3b8" stroke-width="1.5"/>
  <rect x="230" y="52" width="180" height="38" fill="#eff6ff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="140" y="77" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Litres (x)</text>
  <text x="320" y="77" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Cost (y)</text>

  <rect x="50" y="90" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="90" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">1</text>
  <text x="320" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">3</text>

  <rect x="50" y="128" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="128" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">2</text>
  <text x="320" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">6</text>

  <rect x="50" y="166" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="166" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">4</text>
  <text x="320" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">12</text>

  <rect x="50" y="204" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="204" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">8</text>
  <text x="320" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">24</text>

  <path d="M 42 100 Q 18 128 42 156" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 42 138 Q 18 166 42 194" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 42 176 Q 18 204 42 232" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round"/>
  <text x="25" y="133" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">x2</text>
  <text x="25" y="171" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">x2</text>
  <text x="25" y="209" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">x2</text>

  <path d="M 418 100 Q 442 128 418 156" stroke="#059669" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 418 138 Q 442 166 418 194" stroke="#059669" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 418 176 Q 442 204 418 232" stroke="#059669" stroke-width="2" fill="none" stroke-linecap="round"/>
  <text x="452" y="133" font-family="sans-serif" font-size="15" font-weight="bold" fill="#047857" text-anchor="middle">x2</text>
  <text x="452" y="171" font-family="sans-serif" font-size="15" font-weight="bold" fill="#047857" text-anchor="middle">x2</text>
  <text x="452" y="209" font-family="sans-serif" font-size="15" font-weight="bold" fill="#047857" text-anchor="middle">x2</text>

  <text x="260" y="283" font-family="sans-serif" font-size="15" font-weight="bold" fill="#334155" text-anchor="middle">Double the litres and the cost doubles too</text>
  <text x="260" y="310" font-family="monospace" font-size="16" font-weight="bold" fill="#0f766e" text-anchor="middle">y / x = 3 every time</text>
</svg>`,

  // The graph argument: both are straight lines, only one is a proportion,
  // and the origin is what separates them.
  GRAPH_ORIGIN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 400" class="w-full h-full drop-shadow-md">
  <rect width="480" height="400" fill="#ffffff" rx="10"/>
  <text x="240" y="26" font-family="sans-serif" font-size="16" font-weight="900" fill="#1e293b" text-anchor="middle">Proportion passes through the origin</text>

  <line x1="105" y1="45" x2="105" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="150" y1="45" x2="150" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="195" y1="45" x2="195" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="240" y1="45" x2="240" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="285" y1="45" x2="285" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="330" y1="45" x2="330" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="375" y1="45" x2="375" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="420" y1="45" x2="420" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="285" x2="440" y2="285" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="240" x2="440" y2="240" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="195" x2="440" y2="195" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="150" x2="440" y2="150" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="105" x2="440" y2="105" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="60" x2="440" y2="60" stroke="#e2e8f0" stroke-width="1"/>

  <line x1="60" y1="45" x2="60" y2="345" stroke="#1e293b" stroke-width="3"/>
  <line x1="45" y1="330" x2="445" y2="330" stroke="#1e293b" stroke-width="3"/>

  <line x1="60" y1="330" x2="330" y2="60" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
  <line x1="60" y1="195" x2="195" y2="60" stroke="#ef4444" stroke-width="4" stroke-linecap="round" stroke-dasharray="9 7"/>

  <circle cx="60" cy="330" r="7" fill="#1e293b"/>
  <circle cx="60" cy="195" r="7" fill="#ef4444"/>

  <text x="340" y="68" font-family="monospace" font-size="16" font-weight="bold" fill="#047857">y = x</text>
  <text x="205" y="55" font-family="monospace" font-size="16" font-weight="bold" fill="#b91c1c">y = x + 3</text>
  <text x="52" y="355" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="end">(0, 0)</text>
  <text x="452" y="336" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b">x</text>
  <text x="48" y="34" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="end">y</text>

  <rect x="60" y="360" width="22" height="10" fill="#10b981"/>
  <text x="92" y="370" font-family="sans-serif" font-size="13" fill="#334155">Proportional: y = kx, through (0,0)</text>
  <rect x="60" y="380" width="22" height="10" fill="#ef4444"/>
  <text x="92" y="390" font-family="sans-serif" font-size="13" fill="#334155">Not proportional: misses (0,0)</text>
</svg>`,

  // Positive k — the uphill line, for the left column of the compare slide.
  GRAPH_POSITIVE_K: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 380" class="w-full h-full drop-shadow-md">
  <rect width="460" height="380" fill="#ffffff" rx="10"/>
  <text x="230" y="24" font-family="sans-serif" font-size="15" font-weight="900" fill="#1e293b" text-anchor="middle">Positive k: an uphill line</text>

  <line x1="110" y1="38" x2="110" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="150" y1="38" x2="150" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="190" y1="38" x2="190" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="270" y1="38" x2="270" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="310" y1="38" x2="310" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="350" y1="38" x2="350" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="70" x2="390" y2="70" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="110" x2="390" y2="110" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="150" x2="390" y2="150" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="230" x2="390" y2="230" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="270" x2="390" y2="270" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="310" x2="390" y2="310" stroke="#e2e8f0" stroke-width="1"/>

  <line x1="230" y1="38" x2="230" y2="342" stroke="#1e293b" stroke-width="3"/>
  <line x1="70" y1="190" x2="390" y2="190" stroke="#1e293b" stroke-width="3"/>

  <line x1="150" y1="350" x2="310" y2="30" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
  <circle cx="230" cy="190" r="6" fill="#1e293b"/>
  <circle cx="270" cy="110" r="6" fill="#059669"/>
  <circle cx="190" cy="270" r="6" fill="#059669"/>

  <text x="318" y="52" font-family="monospace" font-size="16" font-weight="bold" fill="#047857">y = 2x</text>
  <text x="400" y="206" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b">x</text>
  <text x="216" y="30" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="end">y</text>
  <text x="230" y="368" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">x grows, y grows</text>
</svg>`,

  // Negative k — the downhill line. Same frame, so the pair reads as a contrast.
  GRAPH_NEGATIVE_K: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 380" class="w-full h-full drop-shadow-md">
  <rect width="460" height="380" fill="#ffffff" rx="10"/>
  <text x="230" y="24" font-family="sans-serif" font-size="15" font-weight="900" fill="#1e293b" text-anchor="middle">Negative k: a downhill line</text>

  <line x1="110" y1="38" x2="110" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="150" y1="38" x2="150" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="190" y1="38" x2="190" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="270" y1="38" x2="270" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="310" y1="38" x2="310" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="350" y1="38" x2="350" y2="342" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="70" x2="390" y2="70" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="110" x2="390" y2="110" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="150" x2="390" y2="150" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="230" x2="390" y2="230" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="270" x2="390" y2="270" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="310" x2="390" y2="310" stroke="#e2e8f0" stroke-width="1"/>

  <line x1="230" y1="38" x2="230" y2="342" stroke="#1e293b" stroke-width="3"/>
  <line x1="70" y1="190" x2="390" y2="190" stroke="#1e293b" stroke-width="3"/>

  <line x1="150" y1="30" x2="310" y2="350" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
  <circle cx="230" cy="190" r="6" fill="#1e293b"/>
  <circle cx="270" cy="270" r="6" fill="#b91c1c"/>
  <circle cx="190" cy="110" r="6" fill="#b91c1c"/>

  <text x="316" y="330" font-family="monospace" font-size="16" font-weight="bold" fill="#b91c1c">y = -2x</text>
  <text x="400" y="206" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b">x</text>
  <text x="216" y="30" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="end">y</text>
  <text x="230" y="368" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">x grows, y falls</text>
</svg>`,

  // Proportional to the square: x doubles, y goes up by a factor of four.
  SQUARE_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 330" class="w-full h-full drop-shadow-md">
  <rect width="520" height="330" fill="#ffffff" rx="10"/>
  <text x="260" y="32" font-family="sans-serif" font-size="18" font-weight="900" fill="#1e293b" text-anchor="middle">y is proportional to x squared</text>

  <rect x="50" y="52" width="180" height="38" fill="#f3e8ff" stroke="#94a3b8" stroke-width="1.5"/>
  <rect x="230" y="52" width="180" height="38" fill="#f3e8ff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="140" y="77" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">x</text>
  <text x="320" y="77" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">y = 2x^2</text>

  <rect x="50" y="90" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="90" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">1</text>
  <text x="320" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">2</text>

  <rect x="50" y="128" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="128" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">2</text>
  <text x="320" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">8</text>

  <rect x="50" y="166" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="166" width="180" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">4</text>
  <text x="320" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">32</text>

  <rect x="50" y="204" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="230" y="204" width="180" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="140" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">8</text>
  <text x="320" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">128</text>

  <path d="M 42 100 Q 18 128 42 156" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 42 138 Q 18 166 42 194" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 42 176 Q 18 204 42 232" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round"/>
  <text x="25" y="133" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">x2</text>
  <text x="25" y="171" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">x2</text>
  <text x="25" y="209" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">x2</text>

  <path d="M 418 100 Q 442 128 418 156" stroke="#a855f7" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 418 138 Q 442 166 418 194" stroke="#a855f7" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 418 176 Q 442 204 418 232" stroke="#a855f7" stroke-width="2" fill="none" stroke-linecap="round"/>
  <text x="452" y="133" font-family="sans-serif" font-size="15" font-weight="bold" fill="#7e22ce" text-anchor="middle">x4</text>
  <text x="452" y="171" font-family="sans-serif" font-size="15" font-weight="bold" fill="#7e22ce" text-anchor="middle">x4</text>
  <text x="452" y="209" font-family="sans-serif" font-size="15" font-weight="bold" fill="#7e22ce" text-anchor="middle">x4</text>

  <text x="260" y="283" font-family="sans-serif" font-size="15" font-weight="bold" fill="#334155" text-anchor="middle">Double x and y is four times bigger</text>
  <text x="260" y="310" font-family="monospace" font-size="16" font-weight="bold" fill="#7e22ce" text-anchor="middle">y / x^2 = 2 every time</text>
</svg>`,

  // Inverse proportion: the product column never moves.
  INVERSE_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 330" class="w-full h-full drop-shadow-md">
  <rect width="540" height="330" fill="#ffffff" rx="10"/>
  <text x="270" y="32" font-family="sans-serif" font-size="18" font-weight="900" fill="#1e293b" text-anchor="middle">More people, fewer hours</text>

  <rect x="40" y="52" width="150" height="38" fill="#fef2f2" stroke="#94a3b8" stroke-width="1.5"/>
  <rect x="190" y="52" width="150" height="38" fill="#fef2f2" stroke="#94a3b8" stroke-width="1.5"/>
  <rect x="340" y="52" width="160" height="38" fill="#fee2e2" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="115" y="77" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">People</text>
  <text x="265" y="77" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Hours</text>
  <text x="420" y="77" font-family="sans-serif" font-size="16" font-weight="bold" fill="#7f1d1d" text-anchor="middle">People x Hours</text>

  <rect x="40" y="90" width="150" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="190" y="90" width="150" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="340" y="90" width="160" height="38" fill="#fef2f2" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="115" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">4</text>
  <text x="265" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">6</text>
  <text x="420" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#b91c1c" text-anchor="middle">24</text>

  <rect x="40" y="128" width="150" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="190" y="128" width="150" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="340" y="128" width="160" height="38" fill="#fef2f2" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="115" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">6</text>
  <text x="265" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">4</text>
  <text x="420" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#b91c1c" text-anchor="middle">24</text>

  <rect x="40" y="166" width="150" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="190" y="166" width="150" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="340" y="166" width="160" height="38" fill="#fef2f2" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="115" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">8</text>
  <text x="265" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">3</text>
  <text x="420" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#b91c1c" text-anchor="middle">24</text>

  <rect x="40" y="204" width="150" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="190" y="204" width="150" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="340" y="204" width="160" height="38" fill="#fef2f2" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="115" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">12</text>
  <text x="265" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">2</text>
  <text x="420" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#b91c1c" text-anchor="middle">24</text>

  <text x="270" y="283" font-family="sans-serif" font-size="15" font-weight="bold" fill="#334155" text-anchor="middle">The product never changes</text>
  <text x="270" y="310" font-family="monospace" font-size="16" font-weight="bold" fill="#b91c1c" text-anchor="middle">people x hours = 24</text>
</svg>`,

  // Step 1 of the river problem: the water moves too, so there are two speeds.
  RIVER_SPEEDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340" class="w-full h-full drop-shadow-md">
  <rect width="560" height="340" fill="#ffffff" rx="10"/>
  <text x="280" y="32" font-family="sans-serif" font-size="17" font-weight="900" fill="#1e293b" text-anchor="middle">Swims 3 km/h, river flows 1 km/h</text>

  <rect x="40" y="56" width="480" height="86" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2" rx="8"/>
  <path d="M 70 78 L 150 78" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
  <path d="M 140 71 L 152 78 L 140 85" stroke="#0284c7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 410 78 L 490 78" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
  <path d="M 480 71 L 492 78 L 480 85" stroke="#0284c7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="280" y="112" font-family="sans-serif" font-size="17" font-weight="bold" fill="#075985" text-anchor="middle">Current: 1 km/h</text>

  <rect x="40" y="166" width="480" height="62" fill="#f0fdf4" stroke="#4ade80" stroke-width="2" rx="8"/>
  <text x="280" y="204" font-family="sans-serif" font-size="17" font-weight="bold" fill="#166534" text-anchor="middle">With the stream: 3 + 1 = 4 km/h</text>

  <rect x="40" y="246" width="480" height="62" fill="#fef2f2" stroke="#f87171" stroke-width="2" rx="8"/>
  <text x="280" y="284" font-family="sans-serif" font-size="17" font-weight="bold" fill="#991b1b" text-anchor="middle">Against the stream: 3 - 1 = 2 km/h</text>

  <text x="280" y="330" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Speed over the ground, not through the water</text>
</svg>`,

  // Step 2: the two facts that turn the story into two equations.
  RIVER_TIMELINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 270" class="w-full h-full drop-shadow-md">
  <rect width="580" height="270" fill="#ffffff" rx="10"/>
  <text x="290" y="32" font-family="sans-serif" font-size="17" font-weight="900" fill="#1e293b" text-anchor="middle">Six hours in total</text>

  <rect x="50" y="62" width="160" height="54" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
  <rect x="210" y="62" width="320" height="54" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
  <text x="130" y="95" font-family="sans-serif" font-size="16" font-weight="bold" fill="#166534" text-anchor="middle">d hours down</text>
  <text x="370" y="95" font-family="sans-serif" font-size="16" font-weight="bold" fill="#991b1b" text-anchor="middle">u hours back</text>

  <line x1="50" y1="116" x2="50" y2="128" stroke="#334155" stroke-width="2"/>
  <line x1="210" y1="116" x2="210" y2="128" stroke="#334155" stroke-width="2"/>
  <line x1="530" y1="116" x2="530" y2="128" stroke="#334155" stroke-width="2"/>
  <text x="50" y="144" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">12 noon</text>
  <text x="210" y="144" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">turn around</text>
  <text x="530" y="144" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">6 p.m.</text>

  <rect x="110" y="170" width="360" height="62" fill="#fffbeb" stroke="#fcd34d" stroke-width="2" rx="8"/>
  <text x="200" y="208" font-family="monospace" font-size="19" font-weight="bold" fill="#92400e" text-anchor="middle">d + u = 6</text>
  <text x="295" y="208" font-family="sans-serif" font-size="14" fill="#78716c" text-anchor="middle">and</text>
  <text x="390" y="208" font-family="monospace" font-size="19" font-weight="bold" fill="#92400e" text-anchor="middle">4d = 2u</text>

  <text x="290" y="254" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Same distance each way, so speed x time must match</text>
</svg>`,

  // ── Source Analysis sources (kept separate from the teaching diagrams so the
  //    Prove phase is a fresh read, not a memory test of a slide) ──────────────
  SA_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 400" class="w-full h-full drop-shadow-md">
  <rect width="480" height="400" fill="#ffffff" rx="10"/>
  <text x="240" y="26" font-family="sans-serif" font-size="16" font-weight="900" fill="#1e293b" text-anchor="middle">Three graphs of y against x</text>

  <line x1="105" y1="45" x2="105" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="150" y1="45" x2="150" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="195" y1="45" x2="195" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="240" y1="45" x2="240" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="285" y1="45" x2="285" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="330" y1="45" x2="330" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="375" y1="45" x2="375" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="420" y1="45" x2="420" y2="340" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="285" x2="440" y2="285" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="240" x2="440" y2="240" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="195" x2="440" y2="195" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="150" x2="440" y2="150" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="105" x2="440" y2="105" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="55" y1="60" x2="440" y2="60" stroke="#e2e8f0" stroke-width="1"/>

  <line x1="60" y1="45" x2="60" y2="345" stroke="#1e293b" stroke-width="3"/>
  <line x1="45" y1="330" x2="445" y2="330" stroke="#1e293b" stroke-width="3"/>

  <line x1="60" y1="240" x2="420" y2="240" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
  <line x1="60" y1="330" x2="330" y2="60" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
  <line x1="60" y1="240" x2="240" y2="60" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>

  <text x="430" y="235" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1d4ed8">A</text>
  <text x="338" y="58" font-family="sans-serif" font-size="17" font-weight="bold" fill="#047857">B</text>
  <text x="248" y="56" font-family="sans-serif" font-size="17" font-weight="bold" fill="#b91c1c">C</text>
  <text x="52" y="355" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="end">(0, 0)</text>
  <text x="452" y="336" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b">x</text>
  <text x="48" y="34" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="end">y</text>
  <text x="240" y="382" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Each square is 1 unit</text>
</svg>`,

  SA_WORK_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 330" class="w-full h-full drop-shadow-md">
  <rect width="540" height="330" fill="#ffffff" rx="10"/>
  <text x="270" y="32" font-family="sans-serif" font-size="18" font-weight="900" fill="#1e293b" text-anchor="middle">Workers and days for one job</text>

  <rect x="70" y="52" width="200" height="38" fill="#eff6ff" stroke="#94a3b8" stroke-width="1.5"/>
  <rect x="270" y="52" width="200" height="38" fill="#eff6ff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="170" y="77" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Workers</text>
  <text x="370" y="77" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Days</text>

  <rect x="70" y="90" width="200" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="270" y="90" width="200" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="170" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">2</text>
  <text x="370" y="116" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">18</text>

  <rect x="70" y="128" width="200" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="270" y="128" width="200" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="170" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">3</text>
  <text x="370" y="154" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">12</text>

  <rect x="70" y="166" width="200" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="270" y="166" width="200" height="38" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="170" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">6</text>
  <text x="370" y="192" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">6</text>

  <rect x="70" y="204" width="200" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="270" y="204" width="200" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="170" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">9</text>
  <text x="370" y="230" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">4</text>

  <text x="270" y="285" font-family="sans-serif" font-size="15" font-weight="bold" fill="#334155" text-anchor="middle">Every row describes the same job</text>
</svg>`,

  SA_SWIM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full drop-shadow-md">
  <rect width="560" height="300" fill="#ffffff" rx="10"/>
  <text x="280" y="32" font-family="sans-serif" font-size="17" font-weight="900" fill="#1e293b" text-anchor="middle">Swimmer: 6 km/h in still water</text>

  <rect x="40" y="56" width="480" height="76" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2" rx="8"/>
  <path d="M 70 76 L 150 76" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
  <path d="M 140 69 L 152 76 L 140 83" stroke="#0284c7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 410 76 L 490 76" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
  <path d="M 480 69 L 492 76 L 480 83" stroke="#0284c7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="280" y="108" font-family="sans-serif" font-size="17" font-weight="bold" fill="#075985" text-anchor="middle">River current: 2 km/h</text>

  <rect x="40" y="152" width="480" height="58" fill="#f0fdf4" stroke="#4ade80" stroke-width="2" rx="8"/>
  <text x="280" y="188" font-family="sans-serif" font-size="17" font-weight="bold" fill="#166534" text-anchor="middle">With the stream = ? km/h</text>

  <rect x="40" y="224" width="480" height="58" fill="#fef2f2" stroke="#f87171" stroke-width="2" rx="8"/>
  <text x="280" y="260" font-family="sans-serif" font-size="17" font-weight="bold" fill="#991b1b" text-anchor="middle">Against the stream = ? km/h</text>
</svg>`,
};
