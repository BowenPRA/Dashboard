export const DIAGRAMS = {
  PARAGRAPH_STRUCTURE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="260" y="30" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">How an argument paragraph is built</text>

    <rect x="40" y="48" width="440" height="58" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <text x="70" y="74" font-family="sans-serif" font-weight="900" font-size="15" fill="#1e3a8a">BEGINNING</text>
    <text x="70" y="94" font-family="sans-serif" font-size="13" fill="#334155">The CLAIM — what the writer wants you to believe</text>

    <rect x="40" y="116" width="440" height="76" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
    <text x="70" y="142" font-family="sans-serif" font-weight="900" font-size="15" fill="#78350f">MIDDLE</text>
    <text x="70" y="162" font-family="sans-serif" font-size="13" fill="#334155">The EVIDENCE — facts, examples, statistics</text>
    <text x="70" y="180" font-family="sans-serif" font-size="13" fill="#334155">joined by transitions such as "for example"</text>

    <rect x="40" y="202" width="440" height="58" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="70" y="228" font-family="sans-serif" font-weight="900" font-size="15" fill="#166534">END</text>
    <text x="70" y="248" font-family="sans-serif" font-size="13" fill="#334155">The CONCLUSION — what the evidence proves</text>
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

  CLAIM_EVIDENCE_REASONING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="e1arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
      </marker>
    </defs>
    <rect x="30" y="80" width="130" height="80" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <text x="95" y="112" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e3a8a" text-anchor="middle">CLAIM</text>
    <text x="95" y="134" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">what to believe</text>

    <line x1="165" y1="120" x2="200" y2="120" stroke="#64748b" stroke-width="3" marker-end="url(#e1arrow)"/>

    <rect x="205" y="80" width="130" height="80" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
    <text x="270" y="112" font-family="sans-serif" font-weight="900" font-size="16" fill="#78350f" text-anchor="middle">EVIDENCE</text>
    <text x="270" y="134" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">why it is true</text>

    <line x1="340" y1="120" x2="375" y2="120" stroke="#64748b" stroke-width="3" marker-end="url(#e1arrow)"/>

    <rect x="380" y="80" width="130" height="80" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="445" y="112" font-family="sans-serif" font-weight="900" font-size="16" fill="#166534" text-anchor="middle">REASONING</text>
    <text x="445" y="134" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">how it connects</text>

    <text x="270" y="42" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">Every argument has three parts</text>
    <text x="270" y="200" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">A claim with no evidence is only an opinion.</text>
    <text x="270" y="224" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">On the GED, always ask: what backs this up?</text>
  </svg>`,

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
  </svg>`
};
