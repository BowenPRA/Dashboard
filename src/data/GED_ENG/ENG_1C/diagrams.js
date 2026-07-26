// src/data/GED_ENG/ENG_1C/diagrams.js
// Lesson 9 — Claims, Evidence & Evaluating Arguments. Structure diagrams in the
// shared ELA palette (see docs/svg-diagrams.md). Reused across the argument
// strand so a claim/evidence chart looks the same wherever it appears.

export const DIAGRAMS = {
  CLAIM_EVIDENCE_REASONING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="c1arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
      </marker>
    </defs>
    <rect x="30" y="80" width="130" height="80" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <text x="95" y="112" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e3a8a" text-anchor="middle">CLAIM</text>
    <text x="95" y="134" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">what to believe</text>

    <line x1="165" y1="120" x2="200" y2="120" stroke="#64748b" stroke-width="3" marker-end="url(#c1arrow)"/>

    <rect x="205" y="80" width="130" height="80" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
    <text x="270" y="112" font-family="sans-serif" font-weight="900" font-size="16" fill="#78350f" text-anchor="middle">EVIDENCE</text>
    <text x="270" y="134" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">why it is true</text>

    <line x1="340" y1="120" x2="375" y2="120" stroke="#64748b" stroke-width="3" marker-end="url(#c1arrow)"/>

    <rect x="380" y="80" width="130" height="80" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="445" y="112" font-family="sans-serif" font-weight="900" font-size="16" fill="#166534" text-anchor="middle">REASONING</text>
    <text x="445" y="134" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">how it connects</text>

    <text x="270" y="42" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Every argument has three parts</text>
    <text x="270" y="200" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">A claim with no evidence is only an opinion.</text>
    <text x="270" y="224" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">On the GED, always ask: what backs this up?</text>
  </svg>`,

  FACT_VS_OPINION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 290" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="20" y="24" width="240" height="240" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="140" y="54" font-family="sans-serif" font-weight="900" font-size="19" fill="#1e3a8a" text-anchor="middle">FACT</text>
    <line x1="45" y1="66" x2="235" y2="66" stroke="#3b82f6" stroke-width="2"/>
    <text x="140" y="90" font-family="sans-serif" font-weight="bold" font-size="13" fill="#1e40af" text-anchor="middle">Can be PROVEN</text>
    <text x="140" y="120" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">"The store opens at 9am."</text>
    <text x="140" y="142" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">"Water boils at 100°C."</text>
    <text x="140" y="164" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">"43% of readers agreed."</text>
    <text x="140" y="200" font-family="sans-serif" font-weight="bold" font-size="12" fill="#1e40af" text-anchor="middle">Check it against</text>
    <text x="140" y="218" font-family="sans-serif" font-weight="bold" font-size="12" fill="#1e40af" text-anchor="middle">a source.</text>
    <text x="140" y="248" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">numbers · dates · records</text>

    <rect x="280" y="24" width="240" height="240" rx="14" fill="#fdf2f8" stroke="#db2777" stroke-width="4"/>
    <text x="400" y="54" font-family="sans-serif" font-weight="900" font-size="19" fill="#831843" text-anchor="middle">OPINION</text>
    <line x1="305" y1="66" x2="495" y2="66" stroke="#db2777" stroke-width="2"/>
    <text x="400" y="90" font-family="sans-serif" font-weight="bold" font-size="13" fill="#9d174d" text-anchor="middle">Cannot be PROVEN</text>
    <text x="400" y="120" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">"The store is too slow."</text>
    <text x="400" y="142" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">"Summer is the best."</text>
    <text x="400" y="164" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">"Readers should know."</text>
    <text x="400" y="200" font-family="sans-serif" font-weight="bold" font-size="12" fill="#9d174d" text-anchor="middle">Listen for judgement</text>
    <text x="400" y="218" font-family="sans-serif" font-weight="bold" font-size="12" fill="#9d174d" text-anchor="middle">words.</text>
    <text x="400" y="248" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">should · best · terrible</text>
  </svg>`,

  EVIDENCE_STRENGTH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="260" y="30" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Not all evidence is equally strong</text>

    <rect x="60" y="48" width="400" height="46" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="80" y="77" font-family="sans-serif" font-weight="900" font-size="14" fill="#166534">STRONGEST</text>
    <text x="185" y="77" font-family="sans-serif" font-size="13" fill="#334155">A number or study you can check</text>

    <rect x="60" y="104" width="400" height="46" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
    <text x="80" y="133" font-family="sans-serif" font-weight="900" font-size="14" fill="#075985">STRONG</text>
    <text x="185" y="133" font-family="sans-serif" font-size="13" fill="#334155">A specific named example or record</text>

    <rect x="60" y="160" width="400" height="46" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
    <text x="80" y="189" font-family="sans-serif" font-weight="900" font-size="14" fill="#92400e">WEAK</text>
    <text x="185" y="189" font-family="sans-serif" font-size="13" fill="#334155">A vague claim: "many people say"</text>

    <rect x="60" y="216" width="400" height="46" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
    <text x="80" y="245" font-family="sans-serif" font-weight="900" font-size="14" fill="#991b1b">WEAKEST</text>
    <text x="185" y="245" font-family="sans-serif" font-size="13" fill="#334155">Feelings only: "it is obviously bad"</text>
  </svg>`
};
