// src/data/GED_ENG/ENG_1B/diagrams.js
// Lesson 8 — Author's Purpose, Tone & Point of View. Shared ELA palette
// (docs/svg-diagrams.md); labels kept short for npm run audit:svg.

export const DIAGRAMS = {
  AUTHORS_PURPOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 240" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="260" y="30" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Why did the author write this?</text>

    <rect x="25" y="50" width="150" height="150" rx="14" fill="#fee2e2" stroke="#ef4444" stroke-width="4"/>
    <text x="100" y="82" font-family="sans-serif" font-weight="900" font-size="17" fill="#991b1b" text-anchor="middle">PERSUADE</text>
    <text x="100" y="110" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">wants you to</text>
    <text x="100" y="128" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">agree or act</text>
    <text x="100" y="162" font-family="sans-serif" font-weight="bold" font-size="11" fill="#991b1b" text-anchor="middle">editorials, ads</text>
    <text x="100" y="180" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">speeches</text>

    <rect x="185" y="50" width="150" height="150" rx="14" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <text x="260" y="82" font-family="sans-serif" font-weight="900" font-size="17" fill="#1e3a8a" text-anchor="middle">INFORM</text>
    <text x="260" y="110" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">wants you to</text>
    <text x="260" y="128" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">know facts</text>
    <text x="260" y="162" font-family="sans-serif" font-weight="bold" font-size="11" fill="#1e3a8a" text-anchor="middle">news reports</text>
    <text x="260" y="180" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">manuals</text>

    <rect x="345" y="50" width="150" height="150" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="420" y="82" font-family="sans-serif" font-weight="900" font-size="17" fill="#166534" text-anchor="middle">ENTERTAIN</text>
    <text x="420" y="110" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">wants you to</text>
    <text x="420" y="128" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">enjoy reading</text>
    <text x="420" y="162" font-family="sans-serif" font-weight="bold" font-size="11" fill="#166534" text-anchor="middle">stories, novels</text>
    <text x="420" y="180" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">humour</text>

    <text x="260" y="226" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">Purpose changes what counts as evidence.</text>
  </svg>`,

  TONE_SPECTRUM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 200" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="270" y="30" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Tone is the author's attitude</text>
    <line x1="40" y1="90" x2="500" y2="90" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>

    <circle cx="90" cy="90" r="13" fill="#16a34a" stroke="#fff" stroke-width="4"/>
    <text x="90" y="128" font-family="sans-serif" font-weight="bold" font-size="13" fill="#166534" text-anchor="middle">Approving</text>
    <text x="90" y="146" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">"a welcome step"</text>

    <circle cx="230" cy="90" r="13" fill="#64748b" stroke="#fff" stroke-width="4"/>
    <text x="230" y="128" font-family="sans-serif" font-weight="bold" font-size="13" fill="#334155" text-anchor="middle">Neutral</text>
    <text x="230" y="146" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">"the law passed"</text>

    <circle cx="370" cy="90" r="13" fill="#d97706" stroke="#fff" stroke-width="4"/>
    <text x="370" y="128" font-family="sans-serif" font-weight="bold" font-size="13" fill="#92400e" text-anchor="middle">Doubtful</text>
    <text x="370" y="146" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">"it supposedly helps"</text>

    <circle cx="480" cy="90" r="13" fill="#ef4444" stroke="#fff" stroke-width="4"/>
    <text x="480" y="128" font-family="sans-serif" font-weight="bold" font-size="13" fill="#991b1b" text-anchor="middle">Critical</text>
    <text x="480" y="146" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">"a reckless plan"</text>

    <text x="270" y="182" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">Find tone in the adjectives, not the topic.</text>
  </svg>`,

  POINT_OF_VIEW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 230" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="270" y="30" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Point of view: through whose eyes?</text>

    <rect x="30" y="50" width="230" height="118" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="145" y="82" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e3a8a" text-anchor="middle">FIRST PERSON</text>
    <text x="145" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#334155" text-anchor="middle">I · we · my</text>
    <text x="145" y="140" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle">the writer is inside it</text>

    <rect x="280" y="50" width="230" height="118" rx="14" fill="#f3e8ff" stroke="#a855f7" stroke-width="4"/>
    <text x="395" y="82" font-family="sans-serif" font-weight="900" font-size="16" fill="#6b21a8" text-anchor="middle">THIRD PERSON</text>
    <text x="395" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#334155" text-anchor="middle">he · she · they</text>
    <text x="395" y="140" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle">the writer stands outside</text>

    <text x="270" y="204" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">Also ask: is the writer for, against, or neutral?</text>
  </svg>`
};
