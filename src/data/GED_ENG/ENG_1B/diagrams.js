export const DIAGRAMS = {
  SENTENCE_STRUCTURE_CHART: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="260" y="28" font-family="sans-serif" font-weight="900" font-size="16" fill="#0f172a" text-anchor="middle">Sentence types in 100 persuasive editorials</text>

    <line x1="90" y1="60" x2="90" y2="230" stroke="#1e293b" stroke-width="4"/>
    <line x1="90" y1="230" x2="480" y2="230" stroke="#1e293b" stroke-width="4"/>

    <rect x="120" y="140" width="70" height="90" fill="#93c5fd" stroke="#3b82f6" stroke-width="3"/>
    <text x="155" y="132" font-family="sans-serif" font-weight="900" font-size="15" fill="#1e3a8a" text-anchor="middle">28%</text>
    <text x="155" y="252" font-family="sans-serif" font-weight="bold" font-size="12" fill="#334155" text-anchor="middle">Simple</text>

    <rect x="215" y="95" width="70" height="135" fill="#60a5fa" stroke="#3b82f6" stroke-width="3"/>
    <text x="250" y="87" font-family="sans-serif" font-weight="900" font-size="15" fill="#1e3a8a" text-anchor="middle">41%</text>
    <text x="250" y="252" font-family="sans-serif" font-weight="bold" font-size="12" fill="#334155" text-anchor="middle">Complex</text>

    <rect x="310" y="170" width="70" height="60" fill="#bfdbfe" stroke="#3b82f6" stroke-width="3"/>
    <text x="345" y="162" font-family="sans-serif" font-weight="900" font-size="15" fill="#1e3a8a" text-anchor="middle">19%</text>
    <text x="345" y="252" font-family="sans-serif" font-weight="bold" font-size="12" fill="#334155" text-anchor="middle">Compound</text>

    <rect x="405" y="194" width="70" height="36" fill="#dbeafe" stroke="#3b82f6" stroke-width="3"/>
    <text x="440" y="186" font-family="sans-serif" font-weight="900" font-size="15" fill="#1e3a8a" text-anchor="middle">12%</text>
    <text x="440" y="252" font-family="sans-serif" font-weight="bold" font-size="12" fill="#334155" text-anchor="middle">Cmp-Complex</text>

    <text x="70" y="150" font-family="sans-serif" font-weight="bold" font-size="12" fill="#64748b" text-anchor="end">share</text>
    <text x="260" y="285" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Which structure do persuasive writers reach for most?</text>
  </svg>`,

  ARGUMENT_ARCHITECTURE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="eb1arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
      </marker>
    </defs>
    <text x="270" y="30" font-family="sans-serif" font-weight="900" font-size="17" fill="#0f172a" text-anchor="middle">The architecture of an argument</text>

    <rect x="18" y="90" width="108" height="66" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="72" y="118" font-family="sans-serif" font-weight="900" font-size="13" fill="#1e3a8a" text-anchor="middle">HOOK</text>
    <text x="72" y="138" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">get attention</text>

    <line x1="130" y1="123" x2="152" y2="123" stroke="#64748b" stroke-width="3" marker-end="url(#eb1arrow)"/>

    <rect x="158" y="90" width="108" height="66" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
    <text x="212" y="118" font-family="sans-serif" font-weight="900" font-size="13" fill="#075985" text-anchor="middle">CLAIM</text>
    <text x="212" y="138" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">state position</text>

    <line x1="270" y1="123" x2="292" y2="123" stroke="#64748b" stroke-width="3" marker-end="url(#eb1arrow)"/>

    <rect x="298" y="90" width="108" height="66" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
    <text x="352" y="118" font-family="sans-serif" font-weight="900" font-size="13" fill="#78350f" text-anchor="middle">EVIDENCE</text>
    <text x="352" y="138" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">prove it</text>

    <line x1="410" y1="123" x2="432" y2="123" stroke="#64748b" stroke-width="3" marker-end="url(#eb1arrow)"/>

    <rect x="438" y="90" width="88" height="66" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>
    <text x="482" y="118" font-family="sans-serif" font-weight="900" font-size="13" fill="#166534" text-anchor="middle">PROOF</text>
    <text x="482" y="138" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">conclusion</text>

    <text x="270" y="196" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Each step depends on the one before it.</text>
    <text x="270" y="220" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Skip the evidence and the proof collapses.</text>
  </svg>`
};
