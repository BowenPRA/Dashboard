// src/data/GED_MATH/MATH_0E/diagrams.js
// Authored SVG for Geometry & Measurement. SA_* are the Source Analysis figures
// (a composite shape, a cylinder, a right triangle, parallel lines with a
// transversal); NOTES_* sit in the lesson deck. Every length in a picture is
// also written in the item text, so the answer key is exact.

export const DIAGRAMS = {
  // L-shaped garden, 30 px per metre. Outer 10 m by 8 m; top-right notch 6 m by 5 m.
  // Area = 10x3 + 4x5 = 50 m². Perimeter = 4+5+6+3+10+8 = 36 m.
  SA_COMPOSITE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Plan of a garden (metres)</text>
  <path d="M110,60 L230,60 L230,210 L410,210 L410,300 L110,300 Z" fill="#dcfce7" stroke="#166534" stroke-width="3" stroke-linejoin="round"/>
  <line x1="110" y1="210" x2="230" y2="210" stroke="#166534" stroke-width="2" stroke-dasharray="8 6"/>
  <text x="170" y="48" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">4 m</text>
  <text x="244" y="140" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">5 m</text>
  <text x="320" y="200" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">6 m</text>
  <text x="424" y="260" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">3 m</text>
  <text x="260" y="326" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">10 m</text>
  <text x="96" y="185" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="end">8 m</text>
  <text x="260" y="350" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Dashed line: one way to split the shape into two rectangles</text>
</svg>`,

  // A can: radius 3 cm, height 10 cm. V = π r² h ≈ 3.14 × 9 × 10 = 282.6 cm³.
  SA_CYLINDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">A cylinder-shaped can</text>
  <path d="M140,90 L140,290 A90,30 0 0 0 320,290 L320,90 Z" fill="#eff6ff" stroke="#1e40af" stroke-width="3"/>
  <path d="M140,290 A90,30 0 0 1 320,290" fill="none" stroke="#1e40af" stroke-width="2" stroke-dasharray="8 6"/>
  <ellipse cx="230" cy="90" rx="90" ry="30" fill="#dbeafe" stroke="#1e40af" stroke-width="3"/>
  <line x1="230" y1="90" x2="320" y2="90" stroke="#dc2626" stroke-width="3"/>
  <circle cx="230" cy="90" r="4" fill="#dc2626"/>
  <text x="275" y="78" font-family="monospace" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">r = 3 cm</text>
  <line x1="360" y1="90" x2="360" y2="290" stroke="#64748b" stroke-width="2"/>
  <line x1="352" y1="90" x2="368" y2="90" stroke="#64748b" stroke-width="2"/>
  <line x1="352" y1="290" x2="368" y2="290" stroke="#64748b" stroke-width="2"/>
  <text x="374" y="195" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">h = 10 cm</text>
  <text x="260" y="340" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Formula sheet: Volume of a cylinder = π r² h, with π ≈ 3.14</text>
</svg>`,

  // A ladder: reaches 9 ft up a wall, foot 12 ft from the wall. Ladder = hypotenuse = 15 ft.
  SA_RIGHT_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">A ladder against a wall</text>
  <rect x="100" y="100" width="20" height="200" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="60" y1="300" x2="460" y2="300" stroke="#94a3b8" stroke-width="2"/>
  <path d="M120,120 L120,300 L360,300 Z" fill="#fef3c7" stroke="#b45309" stroke-width="3" stroke-linejoin="round"/>
  <path d="M120,280 L140,280 L140,300" fill="none" stroke="#b45309" stroke-width="2"/>
  <text x="104" y="215" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="end">9 ft</text>
  <text x="240" y="326" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">12 ft</text>
  <text x="262" y="196" font-family="monospace" font-size="16" font-weight="bold" fill="#b45309">ladder = ?</text>
  <text x="380" y="140" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">wall</text>
  <text x="260" y="350" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Formula sheet: a² + b² = c²</text>
</svg>`,

  // Two parallel lines cut by a transversal at 65°. x is corresponding to 65°; y is on a straight line with x.
  SA_PARALLEL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" class="w-full h-full">
  <rect width="520" height="360" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Two parallel lines and a transversal</text>
  <line x1="60" y1="120" x2="460" y2="120" stroke="#1e293b" stroke-width="3"/>
  <line x1="60" y1="240" x2="460" y2="240" stroke="#1e293b" stroke-width="3"/>
  <path d="M392,113 L406,120 L392,127" fill="none" stroke="#1e293b" stroke-width="3"/>
  <path d="M392,233 L406,240 L392,247" fill="none" stroke="#1e293b" stroke-width="3"/>
  <line x1="176" y1="320" x2="306" y2="40" stroke="#dc2626" stroke-width="3"/>
  <path d="M297,120 A28,28 0 0 0 280.8,94.6" fill="none" stroke="#dc2626" stroke-width="2"/>
  <path d="M241,240 A28,28 0 0 0 224.8,214.6" fill="none" stroke="#2563eb" stroke-width="2"/>
  <path d="M224.8,214.6 A28,28 0 0 0 185,240" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="318" y="98" font-family="monospace" font-size="17" font-weight="bold" fill="#dc2626" text-anchor="middle">65°</text>
  <text x="256" y="220" font-family="monospace" font-size="18" font-weight="bold" fill="#2563eb" text-anchor="middle">x</text>
  <text x="189" y="206" font-family="monospace" font-size="18" font-weight="bold" fill="#16a34a" text-anchor="middle">y</text>
  <text x="440" y="108" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">line 1</text>
  <text x="440" y="228" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">line 2</text>
  <text x="260" y="346" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">The arrows show that line 1 and line 2 are parallel</text>
</svg>`,

  // Lesson: a circle with its radius and diameter, and the two formulas.
  NOTES_CIRCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 250" class="w-full h-full drop-shadow-md">
  <rect width="420" height="250" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <circle cx="150" cy="130" r="90" fill="#eff6ff" stroke="#1e40af" stroke-width="3"/>
  <line x1="60" y1="130" x2="240" y2="130" stroke="#16a34a" stroke-width="3"/>
  <line x1="150" y1="130" x2="213.6" y2="66.4" stroke="#dc2626" stroke-width="3"/>
  <circle cx="150" cy="130" r="4" fill="#1e293b"/>
  <text x="196" y="92" font-family="monospace" font-size="16" font-weight="bold" fill="#dc2626">r</text>
  <text x="150" y="152" font-family="monospace" font-size="15" font-weight="bold" fill="#16a34a" text-anchor="middle">d = 2r</text>
  <text x="270" y="90" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b">C = 2πr</text>
  <text x="270" y="130" font-family="monospace" font-size="18" font-weight="bold" fill="#1e293b">A = πr²</text>
  <text x="270" y="170" font-family="monospace" font-size="16" fill="#64748b">π ≈ 3.14</text>
  <text x="150" y="240" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">radius r (red), diameter d (green)</text>
</svg>`,

  // Lesson: an L-shape split into two rectangles: 3x4 and 8x2.
  NOTES_COMPOSITE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 260" class="w-full h-full drop-shadow-md">
  <rect width="460" height="260" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <path d="M60,40 L150,40 L150,160 L300,160 L300,220 L60,220 Z" fill="#dcfce7" stroke="#166534" stroke-width="3" stroke-linejoin="round"/>
  <line x1="60" y1="160" x2="150" y2="160" stroke="#166534" stroke-width="2" stroke-dasharray="8 6"/>
  <text x="105" y="30" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">3</text>
  <text x="160" y="105" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b">4</text>
  <text x="225" y="150" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">5</text>
  <text x="310" y="195" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b">2</text>
  <text x="180" y="242" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">8</text>
  <text x="48" y="135" font-family="monospace" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="end">6</text>
  <text x="105" y="105" font-family="monospace" font-size="14" font-weight="bold" fill="#166534" text-anchor="middle">3×4=12</text>
  <text x="180" y="195" font-family="monospace" font-size="14" font-weight="bold" fill="#166534" text-anchor="middle">8×2=16</text>
  <text x="385" y="120" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">12 + 16</text>
  <text x="385" y="150" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">= 28</text>
</svg>`,

  // Lesson: 6-8-10 right triangle with the theorem worked beside it.
  NOTES_PYTHAG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 250" class="w-full h-full drop-shadow-md">
  <rect width="420" height="250" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <path d="M80,90 L80,210 L240,210 Z" fill="#fef3c7" stroke="#b45309" stroke-width="3" stroke-linejoin="round"/>
  <path d="M80,194 L96,194 L96,210" fill="none" stroke="#b45309" stroke-width="2"/>
  <text x="66" y="155" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="end">a = 6</text>
  <text x="160" y="234" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">b = 8</text>
  <text x="178" y="138" font-family="monospace" font-size="16" font-weight="bold" fill="#b45309">c = ?</text>
  <text x="330" y="90" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">a² + b² = c²</text>
  <text x="330" y="130" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">36 + 64 = 100</text>
  <text x="330" y="170" font-family="monospace" font-size="16" font-weight="bold" fill="#b45309" text-anchor="middle">c = √100 = 10</text>
  <text x="330" y="210" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">c is the longest side</text>
</svg>`,

  // Lesson: three angle facts side by side.
  NOTES_ANGLES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 230" class="w-full h-full drop-shadow-md">
  <rect width="520" height="230" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <line x1="30" y1="150" x2="170" y2="150" stroke="#1e293b" stroke-width="3"/>
  <line x1="100" y1="150" x2="135" y2="90" stroke="#dc2626" stroke-width="3"/>
  <text x="72" y="138" font-family="monospace" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">120°</text>
  <text x="128" y="140" font-family="monospace" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">60°</text>
  <text x="100" y="192" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">On a line: 180°</text>
  <path d="M210,160 L330,160 L270,80 Z" fill="#eff6ff" stroke="#1e40af" stroke-width="3" stroke-linejoin="round"/>
  <text x="232" y="152" font-family="monospace" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">50°</text>
  <text x="308" y="152" font-family="monospace" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">70°</text>
  <text x="270" y="104" font-family="monospace" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">60°</text>
  <text x="270" y="192" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">In a triangle: 180°</text>
  <line x1="390" y1="70" x2="490" y2="170" stroke="#1e293b" stroke-width="3"/>
  <line x1="490" y1="70" x2="390" y2="170" stroke="#1e293b" stroke-width="3"/>
  <text x="440" y="100" font-family="monospace" font-size="15" font-weight="bold" fill="#16a34a" text-anchor="middle">a</text>
  <text x="440" y="152" font-family="monospace" font-size="15" font-weight="bold" fill="#16a34a" text-anchor="middle">a</text>
  <text x="410" y="126" font-family="monospace" font-size="15" font-weight="bold" fill="#7c3aed" text-anchor="middle">b</text>
  <text x="470" y="126" font-family="monospace" font-size="15" font-weight="bold" fill="#7c3aed" text-anchor="middle">b</text>
  <text x="440" y="192" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Vertical: equal</text>
</svg>`,

  // Lesson: parallel lines with a transversal; equal angles a, and a + b = 180°.
  NOTES_PARALLEL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 260" class="w-full h-full drop-shadow-md">
  <rect width="460" height="260" fill="#f8fafc" rx="16" stroke="#cbd5e1"/>
  <line x1="40" y1="90" x2="420" y2="90" stroke="#1e293b" stroke-width="3"/>
  <line x1="40" y1="190" x2="420" y2="190" stroke="#1e293b" stroke-width="3"/>
  <path d="M372,83 L386,90 L372,97" fill="none" stroke="#1e293b" stroke-width="3"/>
  <path d="M372,183 L386,190 L372,197" fill="none" stroke="#1e293b" stroke-width="3"/>
  <line x1="177" y1="240" x2="270" y2="40" stroke="#dc2626" stroke-width="3"/>
  <text x="289" y="68" font-family="monospace" font-size="16" font-weight="bold" fill="#16a34a" text-anchor="middle">a</text>
  <text x="213" y="118" font-family="monospace" font-size="16" font-weight="bold" fill="#16a34a" text-anchor="middle">a</text>
  <text x="268" y="128" font-family="monospace" font-size="16" font-weight="bold" fill="#7c3aed" text-anchor="middle">b</text>
  <text x="242" y="168" font-family="monospace" font-size="16" font-weight="bold" fill="#16a34a" text-anchor="middle">a</text>
  <text x="230" y="248" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">every a is equal, and a + b = 180°</text>
</svg>`,
};
