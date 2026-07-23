export const DIAGRAMS = {
  NOTES_ARTICLES_WEAKNESS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="150" y="18" width="220" height="46" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="4"/>
    <text x="260" y="48" font-family="sans-serif" font-weight="900" font-size="19" fill="#991b1b" text-anchor="middle">Articles of Confederation</text>

    <rect x="20" y="100" width="150" height="72" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
    <text x="95" y="126" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">No power to tax</text>
    <text x="95" y="150" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Congress could ask,</text>
    <text x="95" y="165" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">not require</text>

    <rect x="185" y="100" width="150" height="72" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
    <text x="260" y="126" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">No national army</text>
    <text x="260" y="150" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Could not put down</text>
    <text x="260" y="165" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">rebellions</text>

    <rect x="350" y="100" width="150" height="72" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
    <text x="425" y="126" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">No single court</text>
    <text x="425" y="150" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">States settled their</text>
    <text x="425" y="165" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">own disputes</text>

    <text x="260" y="210" font-family="sans-serif" font-weight="bold" font-size="15" fill="#475569" text-anchor="middle">The states were strong and the central government was weak.</text>
    <text x="260" y="234" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">This is why a new Constitution was written in 1787.</text>
  </svg>`,

  NOTES_THREE_BRANCHES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="25" y="30" width="150" height="170" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="100" y="60" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e3a8a" text-anchor="middle">LEGISLATIVE</text>
    <line x1="45" y1="72" x2="155" y2="72" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="96" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e40af" text-anchor="middle">Congress</text>
    <text x="100" y="122" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">Senate +</text>
    <text x="100" y="138" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">House of Reps</text>
    <text x="100" y="172" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">MAKES laws</text>

    <rect x="195" y="30" width="150" height="170" rx="14" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
    <text x="270" y="60" font-family="sans-serif" font-weight="900" font-size="18" fill="#166534" text-anchor="middle">EXECUTIVE</text>
    <line x1="215" y1="72" x2="325" y2="72" stroke="#16a34a" stroke-width="2"/>
    <text x="270" y="96" font-family="sans-serif" font-weight="bold" font-size="14" fill="#15803d" text-anchor="middle">President</text>
    <text x="270" y="122" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">Cabinet +</text>
    <text x="270" y="138" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">agencies</text>
    <text x="270" y="172" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">CARRIES OUT laws</text>

    <rect x="365" y="30" width="150" height="170" rx="14" fill="#fdf2f8" stroke="#db2777" stroke-width="4"/>
    <text x="440" y="60" font-family="sans-serif" font-weight="900" font-size="18" fill="#831843" text-anchor="middle">JUDICIAL</text>
    <line x1="385" y1="72" x2="495" y2="72" stroke="#db2777" stroke-width="2"/>
    <text x="440" y="96" font-family="sans-serif" font-weight="bold" font-size="14" fill="#9d174d" text-anchor="middle">Supreme Court</text>
    <text x="440" y="122" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">Federal</text>
    <text x="440" y="138" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">judges</text>
    <text x="440" y="172" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">INTERPRETS laws</text>

    <text x="270" y="232" font-family="sans-serif" font-weight="bold" font-size="15" fill="#475569" text-anchor="middle">Separation of powers: no single branch holds all the power.</text>
  </svg>`,

  NOTES_CHECKS_BALANCES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="hb1arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#475569"/>
      </marker>
    </defs>
    <circle cx="250" cy="65" r="52" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="250" y="62" font-family="sans-serif" font-weight="900" font-size="14" fill="#1e3a8a" text-anchor="middle">LEGISLATIVE</text>
    <text x="250" y="80" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Congress</text>

    <circle cx="110" cy="215" r="52" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
    <text x="110" y="212" font-family="sans-serif" font-weight="900" font-size="14" fill="#166534" text-anchor="middle">EXECUTIVE</text>
    <text x="110" y="230" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">President</text>

    <circle cx="390" cy="215" r="52" fill="#fdf2f8" stroke="#db2777" stroke-width="4"/>
    <text x="390" y="212" font-family="sans-serif" font-weight="900" font-size="14" fill="#831843" text-anchor="middle">JUDICIAL</text>
    <text x="390" y="230" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Courts</text>

    <path d="M 205 105 L 150 172" fill="none" stroke="#475569" stroke-width="3" marker-end="url(#hb1arrow)"/>
    <text x="118" y="140" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">can override</text>
    <text x="118" y="154" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">a veto</text>

    <path d="M 155 178 L 210 112" fill="none" stroke="#475569" stroke-width="3" marker-end="url(#hb1arrow)"/>
    <text x="228" y="146" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">can veto</text>
    <text x="228" y="160" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">a bill</text>

    <path d="M 295 105 L 350 172" fill="none" stroke="#475569" stroke-width="3" marker-end="url(#hb1arrow)"/>
    <text x="368" y="140" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">confirms</text>
    <text x="368" y="154" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">judges</text>

    <path d="M 345 178 L 290 112" fill="none" stroke="#475569" stroke-width="3" marker-end="url(#hb1arrow)"/>
    <text x="272" y="146" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">can rule laws</text>
    <text x="272" y="160" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">unconstitutional</text>

    <path d="M 168 235 L 330 235" fill="none" stroke="#475569" stroke-width="3" marker-end="url(#hb1arrow)"/>
    <text x="250" y="228" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">appoints judges</text>
    <path d="M 330 258 L 168 258" fill="none" stroke="#475569" stroke-width="3" marker-end="url(#hb1arrow)"/>
    <text x="250" y="278" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">can rule actions unconstitutional</text>
  </svg>`,

  NOTES_FEDERALISM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <ellipse cx="165" cy="130" rx="130" ry="92" fill="#dbeafe" stroke="#3b82f6" stroke-width="4" opacity="0.85"/>
    <ellipse cx="335" cy="130" rx="130" ry="92" fill="#dcfce7" stroke="#16a34a" stroke-width="4" opacity="0.7"/>

    <text x="85" y="70" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e3a8a" text-anchor="middle">FEDERAL</text>
    <text x="85" y="108" font-family="sans-serif" font-size="12" fill="#1e40af" text-anchor="middle">print money</text>
    <text x="85" y="128" font-family="sans-serif" font-size="12" fill="#1e40af" text-anchor="middle">declare war</text>
    <text x="85" y="148" font-family="sans-serif" font-size="12" fill="#1e40af" text-anchor="middle">foreign treaties</text>
    <text x="85" y="168" font-family="sans-serif" font-size="12" fill="#1e40af" text-anchor="middle">postal service</text>

    <text x="415" y="70" font-family="sans-serif" font-weight="900" font-size="16" fill="#166534" text-anchor="middle">STATE</text>
    <text x="415" y="108" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">run schools</text>
    <text x="415" y="128" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">issue licences</text>
    <text x="415" y="148" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">local police</text>
    <text x="415" y="168" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">run elections</text>

    <text x="250" y="86" font-family="sans-serif" font-weight="900" font-size="13" fill="#0f172a" text-anchor="middle">BOTH</text>
    <text x="250" y="112" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">collect taxes</text>
    <text x="250" y="132" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">build roads</text>
    <text x="250" y="152" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">make courts</text>
    <text x="250" y="172" font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">borrow money</text>

    <text x="250" y="240" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Federalism: power is shared between national and state governments.</text>
  </svg>`,

  NOTES_BILL_TO_LAW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 200" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="hb2arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
      </marker>
    </defs>
    <rect x="15" y="70" width="95" height="60" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="3"/>
    <text x="62" y="96" font-family="sans-serif" font-weight="900" font-size="14" fill="#0f172a" text-anchor="middle">BILL</text>
    <text x="62" y="116" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">proposed law</text>

    <line x1="115" y1="100" x2="145" y2="100" stroke="#64748b" stroke-width="3" marker-end="url(#hb2arrow)"/>

    <rect x="150" y="70" width="105" height="60" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="202" y="94" font-family="sans-serif" font-weight="900" font-size="13" fill="#1e3a8a" text-anchor="middle">HOUSE &amp;</text>
    <text x="202" y="112" font-family="sans-serif" font-weight="900" font-size="13" fill="#1e3a8a" text-anchor="middle">SENATE</text>

    <line x1="260" y1="100" x2="290" y2="100" stroke="#64748b" stroke-width="3" marker-end="url(#hb2arrow)"/>

    <rect x="295" y="70" width="105" height="60" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="3"/>
    <text x="347" y="96" font-family="sans-serif" font-weight="900" font-size="13" fill="#166534" text-anchor="middle">PRESIDENT</text>
    <text x="347" y="116" font-family="sans-serif" font-size="11" fill="#15803d" text-anchor="middle">signs or vetoes</text>

    <line x1="405" y1="100" x2="435" y2="100" stroke="#64748b" stroke-width="3" marker-end="url(#hb2arrow)"/>

    <rect x="440" y="70" width="90" height="60" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
    <text x="485" y="105" font-family="sans-serif" font-weight="900" font-size="15" fill="#78350f" text-anchor="middle">LAW</text>

    <path d="M 347 138 L 347 165 L 202 165 L 202 138" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#hb2arrow)"/>
    <text x="275" y="185" font-family="sans-serif" font-weight="bold" font-size="12" fill="#991b1b" text-anchor="middle">If vetoed: Congress can override with a 2/3 vote</text>
    <text x="270" y="42" font-family="sans-serif" font-weight="900" font-size="16" fill="#0f172a" text-anchor="middle">How a bill becomes a law</text>
  </svg>`,

  DIAGRAM_BRANCH_IDENTIFY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="30" y="30" width="440" height="52" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
    <text x="250" y="52" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">Congress passes a bill raising the federal minimum wage.</text>
    <text x="250" y="72" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">The President refuses to sign it.</text>

    <circle cx="140" cy="140" r="42" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="140" y="138" font-family="sans-serif" font-weight="900" font-size="12" fill="#1e3a8a" text-anchor="middle">LEGISLATIVE</text>
    <text x="140" y="155" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Congress</text>

    <circle cx="360" cy="140" r="42" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
    <text x="360" y="138" font-family="sans-serif" font-weight="900" font-size="12" fill="#166534" text-anchor="middle">EXECUTIVE</text>
    <text x="360" y="155" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">President</text>

    <text x="250" y="205" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Name the power being used and explain what happens next.</text>
  </svg>`,

  DIAGRAM_AMENDMENT_PROCESS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 210" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="hb3arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
      </marker>
    </defs>
    <text x="260" y="34" font-family="sans-serif" font-weight="900" font-size="16" fill="#0f172a" text-anchor="middle">Changing the Constitution</text>

    <rect x="30" y="60" width="180" height="72" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="120" y="86" font-family="sans-serif" font-weight="900" font-size="14" fill="#1e3a8a" text-anchor="middle">STEP 1: PROPOSE</text>
    <text x="120" y="108" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">2/3 of both houses</text>
    <text x="120" y="124" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">of Congress</text>

    <line x1="218" y1="96" x2="268" y2="96" stroke="#64748b" stroke-width="4" marker-end="url(#hb3arrow)"/>

    <rect x="275" y="60" width="215" height="72" rx="12" fill="#fdf2f8" stroke="#db2777" stroke-width="4"/>
    <text x="382" y="86" font-family="sans-serif" font-weight="900" font-size="14" fill="#831843" text-anchor="middle">STEP 2: RATIFY</text>
    <text x="382" y="108" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">3/4 of the states</text>
    <text x="382" y="124" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">must approve</text>

    <text x="260" y="168" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Only 27 amendments have passed in over 230 years.</text>
    <text x="260" y="192" font-family="sans-serif" font-size="13" fill="#94a3b8" text-anchor="middle">Why did the Framers make this deliberately difficult?</text>
  </svg>`,

  DIAGRAM_FEDERALISM_SORT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 230" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <text x="250" y="30" font-family="sans-serif" font-weight="900" font-size="16" fill="#0f172a" text-anchor="middle">Who holds each power?</text>

    <rect x="25" y="50" width="200" height="140" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="125" y="76" font-family="sans-serif" font-weight="900" font-size="15" fill="#1e3a8a" text-anchor="middle">FEDERAL ONLY</text>
    <text x="125" y="106" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">• declare war</text>
    <text x="125" y="130" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">• print money</text>
    <text x="125" y="154" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">• sign treaties</text>

    <rect x="275" y="50" width="200" height="140" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
    <text x="375" y="76" font-family="sans-serif" font-weight="900" font-size="15" fill="#166534" text-anchor="middle">STATE ONLY</text>
    <text x="375" y="106" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">• run public schools</text>
    <text x="375" y="130" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">• issue drivers' licences</text>
    <text x="375" y="154" font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle">• organise elections</text>

    <text x="250" y="215" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Explain why taxation appears on BOTH lists.</text>
  </svg>`,

  ASSESSMENT_BRANCH_CHART: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 170" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="20" y="30" width="130" height="110" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="85" y="58" font-family="sans-serif" font-weight="900" font-size="14" fill="#1e3a8a" text-anchor="middle">Congress</text>
    <text x="85" y="92" font-family="sans-serif" font-weight="bold" font-size="13" fill="#334155" text-anchor="middle">MAKES</text>
    <text x="85" y="112" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">the laws</text>

    <rect x="165" y="30" width="130" height="110" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
    <text x="230" y="58" font-family="sans-serif" font-weight="900" font-size="14" fill="#166534" text-anchor="middle">President</text>
    <text x="230" y="92" font-family="sans-serif" font-weight="bold" font-size="13" fill="#334155" text-anchor="middle">?</text>
    <text x="230" y="112" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">the laws</text>

    <rect x="310" y="30" width="130" height="110" rx="12" fill="#fdf2f8" stroke="#db2777" stroke-width="4"/>
    <text x="375" y="58" font-family="sans-serif" font-weight="900" font-size="14" fill="#831843" text-anchor="middle">Courts</text>
    <text x="375" y="92" font-family="sans-serif" font-weight="bold" font-size="13" fill="#334155" text-anchor="middle">INTERPRET</text>
    <text x="375" y="112" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">the laws</text>
  </svg>`
};
