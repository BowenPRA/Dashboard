// src/data/GED_HISTORY/HIST_2B/diagrams.js
// Authored SVG sources for Rights, Citizenship & Elections: an election-results
// table (popular vs electoral vote), an amendments table, a voter-turnout bar
// chart, a Fourth Amendment scenario card, and an Electoral College map drawn
// as simple boxes. House palette (docs/svg-diagrams.md).

export const DIAGRAMS = {
  ELECTION_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="40" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">Presidential Election Results (example)</text>

    <rect x="24" y="60" width="512" height="36" rx="8" fill="#e2e8f0"/>
    <text x="40" y="84" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b">Candidate</text>
    <text x="300" y="84" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">Popular vote</text>
    <text x="470" y="84" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">Electoral votes</text>

    <rect x="24" y="104" width="512" height="44" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="40" y="132" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1d4ed8">Rivera</text>
    <text x="300" y="132" font-family="monospace" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">65,800,000 (48.2%)</text>
    <text x="470" y="132" font-family="monospace" font-weight="900" font-size="18" fill="#1d4ed8" text-anchor="middle">306</text>

    <rect x="24" y="156" width="512" height="44" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
    <text x="40" y="184" font-family="sans-serif" font-weight="bold" font-size="15" fill="#b91c1c">Chen</text>
    <text x="300" y="184" font-family="monospace" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">68,100,000 (49.9%)</text>
    <text x="470" y="184" font-family="monospace" font-weight="900" font-size="18" fill="#b91c1c" text-anchor="middle">232</text>

    <text x="40" y="228" font-family="sans-serif" font-size="14" fill="#64748b">Other candidates: 1.9% of the popular vote, 0 electoral votes</text>
    <rect x="24" y="242" width="512" height="34" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
    <text x="280" y="265" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b45309" text-anchor="middle">538 electors in total · 270 needed to win</text>
  </svg>`,

  AMENDMENTS_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="320" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="40" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">Amendments That Widened Democracy</text>

    <rect x="24" y="58" width="512" height="32" rx="8" fill="#e2e8f0"/>
    <text x="60" y="80" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">No.</text>
    <text x="130" y="80" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">Year</text>
    <text x="200" y="80" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b">What it did</text>

    <text x="60" y="118" font-family="monospace" font-weight="bold" font-size="15" fill="#7e22ce" text-anchor="middle">13th</text>
    <text x="130" y="118" font-family="monospace" font-size="14" fill="#1e293b" text-anchor="middle">1865</text>
    <text x="200" y="118" font-family="sans-serif" font-size="14" fill="#1e293b">Ended slavery in the United States</text>

    <text x="60" y="154" font-family="monospace" font-weight="bold" font-size="15" fill="#7e22ce" text-anchor="middle">14th</text>
    <text x="130" y="154" font-family="monospace" font-size="14" fill="#1e293b" text-anchor="middle">1868</text>
    <text x="200" y="154" font-family="sans-serif" font-size="14" fill="#1e293b">Citizenship by birth · equal protection</text>

    <text x="60" y="190" font-family="monospace" font-weight="bold" font-size="15" fill="#1d4ed8" text-anchor="middle">15th</text>
    <text x="130" y="190" font-family="monospace" font-size="14" fill="#1e293b" text-anchor="middle">1870</text>
    <text x="200" y="190" font-family="sans-serif" font-size="14" fill="#1e293b">Vote cannot be denied because of race</text>

    <text x="60" y="226" font-family="monospace" font-weight="bold" font-size="15" fill="#1d4ed8" text-anchor="middle">19th</text>
    <text x="130" y="226" font-family="monospace" font-size="14" fill="#1e293b" text-anchor="middle">1920</text>
    <text x="200" y="226" font-family="sans-serif" font-size="14" fill="#1e293b">Women gain the right to vote</text>

    <text x="60" y="262" font-family="monospace" font-weight="bold" font-size="15" fill="#1d4ed8" text-anchor="middle">24th</text>
    <text x="130" y="262" font-family="monospace" font-size="14" fill="#1e293b" text-anchor="middle">1964</text>
    <text x="200" y="262" font-family="sans-serif" font-size="14" fill="#1e293b">Bans the poll tax (paying a fee to vote)</text>

    <text x="60" y="298" font-family="monospace" font-weight="bold" font-size="15" fill="#1d4ed8" text-anchor="middle">26th</text>
    <text x="130" y="298" font-family="monospace" font-size="14" fill="#1e293b" text-anchor="middle">1971</text>
    <text x="200" y="298" font-family="sans-serif" font-size="14" fill="#1e293b">Voting age lowered from 21 to 18</text>

    <line x1="24" y1="132" x2="536" y2="132" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="24" y1="168" x2="536" y2="168" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="24" y1="204" x2="536" y2="204" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="24" y1="240" x2="536" y2="240" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="24" y1="276" x2="536" y2="276" stroke="#e2e8f0" stroke-width="2"/>
  </svg>`,

  TURNOUT_CHART: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="320" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="38" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">Who Votes? Turnout by Age (example data)</text>
    <text x="280" y="58" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Share of eligible citizens who voted in a presidential election</text>

    <line x1="80" y1="80" x2="80" y2="280" stroke="#1e293b" stroke-width="2"/>
    <line x1="80" y1="280" x2="520" y2="280" stroke="#1e293b" stroke-width="2"/>
    <line x1="80" y1="80" x2="520" y2="80" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="80" y1="130" x2="520" y2="130" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="80" y1="180" x2="520" y2="180" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="80" y1="230" x2="520" y2="230" stroke="#e2e8f0" stroke-width="1"/>
    <text x="72" y="85" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">100%</text>
    <text x="72" y="135" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">75%</text>
    <text x="72" y="185" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">50%</text>
    <text x="72" y="235" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">25%</text>
    <text x="72" y="285" font-family="monospace" font-size="14" fill="#64748b" text-anchor="end">0%</text>

    <rect x="110" y="178" width="70" height="102" fill="#3b82f6" rx="4"/>
    <text x="145" y="170" font-family="monospace" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">51%</text>
    <text x="145" y="302" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">18–29</text>

    <rect x="220" y="154" width="70" height="126" fill="#3b82f6" rx="4"/>
    <text x="255" y="146" font-family="monospace" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">63%</text>
    <text x="255" y="302" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">30–44</text>

    <rect x="330" y="140" width="70" height="140" fill="#3b82f6" rx="4"/>
    <text x="365" y="132" font-family="monospace" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">70%</text>
    <text x="365" y="302" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">45–64</text>

    <rect x="440" y="128" width="70" height="152" fill="#3b82f6" rx="4"/>
    <text x="475" y="120" font-family="monospace" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">76%</text>
    <text x="475" y="302" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">65 and over</text>

    <text x="300" y="324" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Age group of voter</text>
  </svg>`,

  FOURTH_AMENDMENT_CARD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="300" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <rect x="24" y="24" width="512" height="130" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="3"/>
    <text x="40" y="50" font-family="sans-serif" font-weight="bold" font-size="15" fill="#b45309">Fourth Amendment (1791) — in plain English</text>
    <text x="40" y="78" font-family="sans-serif" font-size="14" fill="#1e293b">People have the right to be safe from unreasonable searches</text>
    <text x="40" y="98" font-family="sans-serif" font-size="14" fill="#1e293b">of their bodies, homes, papers and belongings. The police need</text>
    <text x="40" y="118" font-family="sans-serif" font-size="14" fill="#1e293b">a warrant — signed by a judge, based on good evidence, and</text>
    <text x="40" y="138" font-family="sans-serif" font-size="14" fill="#1e293b">naming the exact place to search and the things to take.</text>

    <rect x="24" y="170" width="512" height="122" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="40" y="196" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1d4ed8">The scenario</text>
    <text x="40" y="224" font-family="sans-serif" font-size="14" fill="#1e293b">Two officers knock on Dana's door. They have no warrant. When</text>
    <text x="40" y="244" font-family="sans-serif" font-size="14" fill="#1e293b">she says no, they push past her, search every room, and take</text>
    <text x="40" y="264" font-family="sans-serif" font-size="14" fill="#1e293b">her laptop. Later, a judge throws out everything they found.</text>
  </svg>`,

  ELECTORAL_BOXES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="340" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="38" font-family="sans-serif" font-weight="900" font-size="18" fill="#1e293b" text-anchor="middle">The Electoral College: States as Boxes</text>
    <text x="280" y="58" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Electors per state = its senators (2) + its House members</text>

    <rect x="24" y="76" width="200" height="150" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="124" y="104" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1d4ed8" text-anchor="middle">California</text>
    <text x="124" y="150" font-family="monospace" font-weight="900" font-size="36" fill="#1d4ed8" text-anchor="middle">54</text>
    <text x="124" y="180" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">2 senators</text>
    <text x="124" y="200" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">+ 52 House members</text>

    <rect x="240" y="76" width="160" height="150" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="320" y="104" font-family="sans-serif" font-weight="bold" font-size="16" fill="#b91c1c" text-anchor="middle">Texas</text>
    <text x="320" y="150" font-family="monospace" font-weight="900" font-size="36" fill="#b91c1c" text-anchor="middle">40</text>
    <text x="320" y="180" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">2 senators</text>
    <text x="320" y="200" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">+ 38 House members</text>

    <rect x="416" y="76" width="120" height="150" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="476" y="104" font-family="sans-serif" font-weight="bold" font-size="16" fill="#047857" text-anchor="middle">Florida</text>
    <text x="476" y="150" font-family="monospace" font-weight="900" font-size="36" fill="#047857" text-anchor="middle">30</text>
    <text x="476" y="180" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">2 senators</text>
    <text x="476" y="200" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">+ 28 House</text>

    <rect x="24" y="242" width="100" height="60" rx="10" fill="#f3e8ff" stroke="#a855f7" stroke-width="3"/>
    <text x="74" y="266" font-family="sans-serif" font-weight="bold" font-size="14" fill="#7e22ce" text-anchor="middle">Wyoming</text>
    <text x="74" y="290" font-family="monospace" font-weight="900" font-size="20" fill="#7e22ce" text-anchor="middle">3</text>

    <rect x="140" y="242" width="100" height="60" rx="10" fill="#f3e8ff" stroke="#a855f7" stroke-width="3"/>
    <text x="190" y="266" font-family="sans-serif" font-weight="bold" font-size="14" fill="#7e22ce" text-anchor="middle">Vermont</text>
    <text x="190" y="290" font-family="monospace" font-weight="900" font-size="20" fill="#7e22ce" text-anchor="middle">3</text>

    <text x="270" y="266" font-family="sans-serif" font-size="14" fill="#1e293b">Every state gets at least 3.</text>
    <text x="270" y="290" font-family="sans-serif" font-size="14" fill="#1e293b">All 50 states + D.C. = 538.</text>

    <rect x="24" y="312" width="512" height="28" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
    <text x="280" y="331" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b45309" text-anchor="middle">Win a state → win ALL its electors. First to 270 wins.</text>
  </svg>`,

  RIGHTS_VS_DUTIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" class="w-full h-full drop-shadow-md bg-white rounded-lg p-2">
    <rect x="10" y="10" width="540" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <rect x="24" y="24" width="248" height="44" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="148" y="52" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1d4ed8" text-anchor="middle">RIGHTS — what you GET</text>
    <text x="148" y="100" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Speak freely</text>
    <text x="148" y="126" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Practice any religion</text>
    <text x="148" y="152" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">A fair, speedy trial</text>
    <text x="148" y="178" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Vote (if a citizen, 18+)</text>
    <text x="148" y="204" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Be safe from unfair searches</text>

    <rect x="288" y="24" width="248" height="44" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="412" y="52" font-family="sans-serif" font-weight="bold" font-size="16" fill="#047857" text-anchor="middle">DUTIES — what you OWE</text>
    <text x="412" y="100" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Obey the law</text>
    <text x="412" y="126" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Pay taxes</text>
    <text x="412" y="152" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Serve on a jury when called</text>
    <text x="412" y="178" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Men 18–25: register for service</text>
    <text x="412" y="204" font-family="sans-serif" font-size="14" fill="#1e293b" text-anchor="middle">Voting: a duty too, but not forced</text>

    <line x1="280" y1="24" x2="280" y2="220" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="280" y="256" font-family="sans-serif" font-style="italic" font-size="14" fill="#64748b" text-anchor="middle">Rights = what protects you. Duties = what is asked of you.</text>
  </svg>`,
};
