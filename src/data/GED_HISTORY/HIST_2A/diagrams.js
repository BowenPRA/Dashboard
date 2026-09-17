// src/data/GED_HISTORY/HIST_2A/diagrams.js
// Authored SVG sources for Foundations of Government: a three-branches table,
// a checks-and-balances triangle, a bill-to-law flow chart, a federalism
// table and the amendment process. House palette (docs/svg-diagrams.md):
// Legislative = blue, Executive = red, Judicial = green, Shared = purple.

export const DIAGRAMS = {
  THREE_BRANCHES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="340" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="40" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">The Three Branches of Government</text>

    <rect x="24" y="60" width="164" height="40" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="106" y="86" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1d4ed8" text-anchor="middle">LEGISLATIVE</text>
    <rect x="198" y="60" width="164" height="40" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="280" y="86" font-family="sans-serif" font-weight="bold" font-size="16" fill="#b91c1c" text-anchor="middle">EXECUTIVE</text>
    <rect x="372" y="60" width="164" height="40" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="454" y="86" font-family="sans-serif" font-weight="bold" font-size="16" fill="#047857" text-anchor="middle">JUDICIAL</text>

    <text x="24" y="130" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b">WHO</text>
    <text x="106" y="152" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Congress</text>
    <text x="106" y="170" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">House: 435</text>
    <text x="106" y="188" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Senate: 100</text>
    <text x="280" y="152" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">The President</text>
    <text x="280" y="170" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">+ Vice President</text>
    <text x="280" y="188" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">+ departments</text>
    <text x="454" y="152" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Supreme Court</text>
    <text x="454" y="170" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">9 justices</text>
    <text x="454" y="188" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">+ federal courts</text>

    <line x1="24" y1="204" x2="536" y2="204" stroke="#e2e8f0" stroke-width="2"/>
    <text x="24" y="228" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b">JOB</text>
    <text x="106" y="252" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1d4ed8" text-anchor="middle">Makes the laws</text>
    <text x="280" y="252" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b91c1c" text-anchor="middle">Enforces the laws</text>
    <text x="454" y="252" font-family="sans-serif" font-weight="bold" font-size="14" fill="#047857" text-anchor="middle">Interprets the laws</text>

    <line x1="24" y1="268" x2="536" y2="268" stroke="#e2e8f0" stroke-width="2"/>
    <text x="24" y="292" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b">TERM</text>
    <text x="106" y="314" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">House: 2 years</text>
    <text x="106" y="332" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Senate: 6 years</text>
    <text x="280" y="314" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">4 years</text>
    <text x="280" y="332" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">(max. 2 terms)</text>
    <text x="454" y="314" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">For life</text>
    <text x="454" y="332" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">(no elections)</text>
  </svg>`,

  CHECKS_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 400" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
      <marker id="arr-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/></marker>
      <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
    </defs>
    <rect x="10" y="10" width="540" height="380" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="38" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">Checks and Balances</text>

    <rect x="180" y="52" width="200" height="56" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="280" y="76" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1d4ed8" text-anchor="middle">LEGISLATIVE</text>
    <text x="280" y="96" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Congress</text>

    <rect x="20" y="316" width="200" height="56" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="120" y="340" font-family="sans-serif" font-weight="bold" font-size="16" fill="#b91c1c" text-anchor="middle">EXECUTIVE</text>
    <text x="120" y="360" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">President</text>

    <rect x="340" y="316" width="200" height="56" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="440" y="340" font-family="sans-serif" font-weight="bold" font-size="16" fill="#047857" text-anchor="middle">JUDICIAL</text>
    <text x="440" y="360" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Supreme Court</text>

    <path d="M 240 108 L 150 310" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arr-blue)"/>
    <path d="M 170 310 L 260 108" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arr-red)"/>
    <path d="M 320 108 L 410 310" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arr-green)"/>
    <path d="M 390 310 L 300 108" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arr-blue)"/>
    <path d="M 224 336 L 334 336" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arr-red)"/>
    <path d="M 336 352 L 226 352" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arr-green)"/>

    <text x="24" y="150" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1d4ed8">Congress can:</text>
    <text x="24" y="168" font-family="sans-serif" font-size="14" fill="#1e293b">override a veto</text>
    <text x="24" y="186" font-family="sans-serif" font-size="14" fill="#1e293b">(2/3 of each house)</text>
    <text x="24" y="204" font-family="sans-serif" font-size="14" fill="#1e293b">impeach the President</text>
    <text x="24" y="238" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b91c1c">President can:</text>
    <text x="24" y="256" font-family="sans-serif" font-size="14" fill="#1e293b">veto a bill</text>

    <text x="536" y="150" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1d4ed8" text-anchor="end">Congress can:</text>
    <text x="536" y="168" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="end">Senate confirms judges</text>
    <text x="536" y="186" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="end">impeach judges</text>
    <text x="536" y="220" font-family="sans-serif" font-weight="bold" font-size="14" fill="#047857" text-anchor="end">Court can:</text>
    <text x="536" y="238" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="end">strike down laws</text>
    <text x="536" y="256" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="end">(judicial review)</text>

    <text x="280" y="268" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b91c1c" text-anchor="middle">Appoints judges</text>
    <text x="280" y="290" font-family="sans-serif" font-weight="bold" font-size="14" fill="#047857" text-anchor="middle">Rules actions illegal</text>
  </svg>`,

  BILL_TO_LAW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 440" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="arr-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker>
    </defs>
    <rect x="10" y="10" width="540" height="420" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="38" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">How a Bill Becomes a Law</text>

    <rect x="90" y="52" width="380" height="40" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <text x="280" y="78" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">1. A member of Congress introduces a bill</text>
    <path d="M 280 92 L 280 110" stroke="#64748b" stroke-width="3" marker-end="url(#arr-ink)"/>

    <rect x="90" y="112" width="380" height="40" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <text x="280" y="138" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">2. A committee studies and changes it</text>
    <path d="M 280 152 L 280 170" stroke="#64748b" stroke-width="3" marker-end="url(#arr-ink)"/>

    <rect x="90" y="172" width="380" height="40" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="280" y="198" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1d4ed8" text-anchor="middle">3. House AND Senate both pass it (majority)</text>
    <path d="M 280 212 L 280 230" stroke="#64748b" stroke-width="3" marker-end="url(#arr-ink)"/>

    <rect x="90" y="232" width="380" height="40" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="280" y="258" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b91c1c" text-anchor="middle">4. The bill goes to the President</text>

    <path d="M 200 272 L 140 300" stroke="#64748b" stroke-width="3" marker-end="url(#arr-ink)"/>
    <path d="M 360 272 L 420 300" stroke="#64748b" stroke-width="3" marker-end="url(#arr-ink)"/>

    <rect x="30" y="304" width="220" height="56" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="140" y="328" font-family="sans-serif" font-weight="bold" font-size="14" fill="#047857" text-anchor="middle">SIGNS the bill</text>
    <text x="140" y="348" font-family="sans-serif" font-weight="900" font-size="16" fill="#047857" text-anchor="middle">→ it is LAW</text>

    <rect x="310" y="304" width="220" height="56" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="420" y="328" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b91c1c" text-anchor="middle">VETOES the bill</text>
    <text x="420" y="348" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">(rejects it)</text>
    <path d="M 420 360 L 420 378" stroke="#64748b" stroke-width="3" marker-end="url(#arr-ink)"/>

    <rect x="276" y="380" width="274" height="44" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="413" y="398" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1d4ed8" text-anchor="middle">Congress can OVERRIDE:</text>
    <text x="413" y="416" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">2/3 of House + 2/3 of Senate → LAW</text>
  </svg>`,

  FEDERALISM_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 330" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="38" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">Federalism: Who Has the Power?</text>

    <rect x="24" y="56" width="164" height="40" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="106" y="82" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1d4ed8" text-anchor="middle">FEDERAL only</text>
    <rect x="198" y="56" width="164" height="40" rx="8" fill="#f3e8ff" stroke="#a855f7" stroke-width="3"/>
    <text x="280" y="82" font-family="sans-serif" font-weight="bold" font-size="15" fill="#7e22ce" text-anchor="middle">SHARED</text>
    <rect x="372" y="56" width="164" height="40" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="454" y="82" font-family="sans-serif" font-weight="bold" font-size="15" fill="#047857" text-anchor="middle">STATE only</text>

    <text x="106" y="126" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Print and coin money</text>
    <text x="106" y="150" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Declare war</text>
    <text x="106" y="174" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Make treaties</text>
    <text x="106" y="198" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Run the post office</text>
    <text x="106" y="222" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Immigration rules</text>
    <text x="106" y="246" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Control the army</text>

    <text x="280" y="126" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Collect taxes</text>
    <text x="280" y="150" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Build roads</text>
    <text x="280" y="174" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Set up courts</text>
    <text x="280" y="198" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Borrow money</text>
    <text x="280" y="222" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Make and enforce laws</text>

    <text x="454" y="126" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Driver's licenses</text>
    <text x="454" y="150" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Run public schools</text>
    <text x="454" y="174" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Marriage rules</text>
    <text x="454" y="198" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Local police</text>
    <text x="454" y="222" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Run elections</text>

    <line x1="24" y1="270" x2="536" y2="270" stroke="#e2e8f0" stroke-width="2"/>
    <text x="280" y="296" font-family="sans-serif" font-style="italic" font-size="14" fill="#64748b" text-anchor="middle">Federal law wins if the two levels clash (the Supremacy Clause).</text>
  </svg>`,

  AMENDMENT_FLOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="arr-ink2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker>
    </defs>
    <rect x="10" y="10" width="540" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="38" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">Changing the Constitution: Two Steps</text>

    <rect x="24" y="60" width="240" height="120" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="144" y="86" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1d4ed8" text-anchor="middle">STEP 1: PROPOSE</text>
    <text x="144" y="112" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">2/3 of the House</text>
    <text x="144" y="132" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">AND 2/3 of the Senate</text>
    <text x="144" y="160" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">(or a convention of the states)</text>

    <path d="M 268 120 L 292 120" stroke="#64748b" stroke-width="4" marker-end="url(#arr-ink2)"/>

    <rect x="296" y="60" width="240" height="120" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="416" y="86" font-family="sans-serif" font-weight="bold" font-size="16" fill="#047857" text-anchor="middle">STEP 2: RATIFY</text>
    <text x="416" y="112" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">3/4 of the states</text>
    <text x="416" y="132" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">must approve it</text>
    <text x="416" y="160" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">(38 of 50 states)</text>

    <rect x="120" y="208" width="320" height="60" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="3"/>
    <text x="280" y="234" font-family="sans-serif" font-weight="bold" font-size="15" fill="#b45309" text-anchor="middle">It is now part of the Constitution</text>
    <text x="280" y="256" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">27 amendments since 1789 — very hard to do</text>
  </svg>`,

  ARTICLES_VS_CONSTITUTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <defs>
      <marker id="arr-ink3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker>
    </defs>
    <rect x="10" y="10" width="540" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <rect x="24" y="24" width="236" height="44" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="142" y="52" font-family="sans-serif" font-weight="bold" font-size="15" fill="#b91c1c" text-anchor="middle">Articles (1781–1789)</text>
    <text x="142" y="98" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Congress could NOT tax</text>
    <text x="142" y="122" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">No President</text>
    <text x="142" y="146" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">No national courts</text>
    <text x="142" y="170" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">No national army</text>
    <text x="142" y="194" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Each state printed money</text>
    <text x="142" y="218" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Changes needed ALL 13 states</text>

    <path d="M 266 150 L 294 150" stroke="#64748b" stroke-width="4" marker-end="url(#arr-ink3)"/>

    <rect x="300" y="24" width="236" height="44" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="418" y="52" font-family="sans-serif" font-weight="bold" font-size="15" fill="#047857" text-anchor="middle">Constitution (1789– )</text>
    <text x="418" y="98" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Congress CAN tax</text>
    <text x="418" y="122" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">A President enforces laws</text>
    <text x="418" y="146" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">A Supreme Court</text>
    <text x="418" y="170" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">A national army</text>
    <text x="418" y="194" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">One national currency</text>
    <text x="418" y="218" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Changes need 3/4 of states</text>

    <text x="280" y="262" font-family="sans-serif" font-style="italic" font-size="14" fill="#64748b" text-anchor="middle">Weak center, strong states → a stronger center, with limits.</text>
  </svg>`,
};
