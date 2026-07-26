// src/data/GED_ENG/ENG_1A/diagrams.js
// Lesson 7 — Reading for Main Idea & Supporting Detail. Structure diagrams in the
// shared ELA palette (docs/svg-diagrams.md): dark ink on light fills, one colour
// per concept, labels short enough to pass npm run audit:svg.

export const DIAGRAMS = {
  TOPIC_VS_MAIN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 220" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="270" y="30" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Topic vs. main idea</text>

    <rect x="30" y="48" width="230" height="118" rx="14" fill="#f1f5f9" stroke="#64748b" stroke-width="4"/>
    <text x="145" y="80" font-family="sans-serif" font-weight="900" font-size="17" fill="#334155" text-anchor="middle">TOPIC</text>
    <text x="145" y="104" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle">what the text is about</text>
    <text x="145" y="140" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">"school lunches"</text>

    <rect x="280" y="48" width="230" height="118" rx="14" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
    <text x="395" y="80" font-family="sans-serif" font-weight="900" font-size="17" fill="#166534" text-anchor="middle">MAIN IDEA</text>
    <text x="395" y="104" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle">the point it makes</text>
    <text x="395" y="140" font-family="sans-serif" font-weight="bold" font-size="12" fill="#1e293b" text-anchor="middle">"Lunches should be healthier."</text>

    <text x="270" y="200" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">The main idea is a full sentence, not just a subject.</text>
  </svg>`,

  MAIN_IDEA_MAP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 270" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="260" y="28" font-family="sans-serif" font-weight="900" font-size="16" fill="#0f172a" text-anchor="middle">Main idea and its supporting details</text>

    <rect x="40" y="46" width="440" height="56" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="260" y="72" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e3a8a" text-anchor="middle">MAIN IDEA</text>
    <text x="260" y="92" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">the one point the whole passage makes</text>

    <line x1="110" y1="102" x2="110" y2="150" stroke="#94a3b8" stroke-width="3"/>
    <line x1="260" y1="102" x2="260" y2="150" stroke="#94a3b8" stroke-width="3"/>
    <line x1="410" y1="102" x2="410" y2="150" stroke="#94a3b8" stroke-width="3"/>

    <rect x="44" y="150" width="132" height="74" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="3"/>
    <text x="110" y="182" font-family="sans-serif" font-weight="900" font-size="13" fill="#92400e" text-anchor="middle">DETAIL</text>
    <text x="110" y="203" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">a fact</text>

    <rect x="194" y="150" width="132" height="74" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="3"/>
    <text x="260" y="182" font-family="sans-serif" font-weight="900" font-size="13" fill="#92400e" text-anchor="middle">DETAIL</text>
    <text x="260" y="203" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">an example</text>

    <rect x="344" y="150" width="132" height="74" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="3"/>
    <text x="410" y="182" font-family="sans-serif" font-weight="900" font-size="13" fill="#92400e" text-anchor="middle">DETAIL</text>
    <text x="410" y="203" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">a reason</text>

    <text x="260" y="252" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">Details hold up the main idea — they do not replace it.</text>
  </svg>`
};
