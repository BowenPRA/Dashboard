// src/data/ACELLUS/ALG_INEQ/diagrams.js
// Inequalities & Intervals — the teaching diagrams.
//
// House rules (docs/svg-diagrams.md): dark ink on a light card, monospace for
// notation and sans-serif for labels, one idea per diagram, and every colour
// paired with a word so the meaning survives greyscale. `npm run audit:svg
// ACELLUS` must be clean — text is measured against its viewBox and its box.
//
// The number lines are all drawn to the same geometry (tick every 40px, axis at
// a fixed y) so that four different diagrams read as four pictures of the same
// line rather than four unrelated drawings.

const PURPLE = '#7c3aed';
const RED = '#ef4444';
const GREEN = '#10b981';
const BLUE = '#3b82f6';
const AMBER = '#d97706';
const INK = '#1e293b';
const MUTED = '#64748b';

export const DIAGRAMS = {
  // What a solution SET looks like: not one answer, a whole stretch of the line.
  NUM_LINE_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 230" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="222" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="260" y="38" text-anchor="middle" font-family="monospace" font-size="30" font-weight="900" fill="${INK}">x &gt; 3</text>

    <line x1="40" y1="120" x2="480" y2="120" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 40 120 l 14 -7 l 0 14 z" fill="${INK}"/>
    <path d="M 480 120 l -14 -7 l 0 14 z" fill="${INK}"/>
    ${[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((n, i) => {
      const x = 60 + i * 50;
      return `<line x1="${x}" y1="114" x2="${x}" y2="126" stroke="${MUTED}" stroke-width="1.5"/>
      <text x="${x}" y="146" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#475569">${n}</text>`;
    }).join('')}

    <line x1="410" y1="120" x2="470" y2="120" stroke="${PURPLE}" stroke-width="7"/>
    <path d="M 476 120 l -14 -7 l 0 14 z" fill="${PURPLE}"/>
    <circle cx="410" cy="120" r="10" fill="#ffffff" stroke="${PURPLE}" stroke-width="4"/>

    <path d="M 410 96 L 410 74 L 300 74" stroke="${RED}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="294" y="79" text-anchor="end" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}">Open circle: 3 is NOT a solution</text>

    <path d="M 445 132 L 445 172 L 330 172" stroke="${PURPLE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="324" y="177" text-anchor="end" font-family="sans-serif" font-size="14" font-weight="bold" fill="${PURPLE}">Every number out here works</text>

    <text x="260" y="207" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}">An equation has one answer. This has millions.</text>
  </svg>`,

  // The one decision the picture makes that the algebra does not.
  OPEN_VS_CLOSED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>

    <text x="30" y="42" font-family="monospace" font-size="24" font-weight="900" fill="${INK}">x &gt; 2</text>
    <text x="140" y="42" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}">bigger than 2, but never 2 itself</text>
    <line x1="40" y1="76" x2="480" y2="76" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 480 76 l -12 -6 l 0 12 z" fill="${INK}"/>
    <line x1="220" y1="76" x2="470" y2="76" stroke="${RED}" stroke-width="7"/>
    <circle cx="220" cy="76" r="10" fill="#ffffff" stroke="${RED}" stroke-width="4"/>
    <text x="220" y="103" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#475569">2</text>

    <line x1="30" y1="126" x2="490" y2="126" stroke="#e2e8f0" stroke-width="2"/>

    <text x="30" y="170" font-family="monospace" font-size="24" font-weight="900" fill="${INK}">x ≥ 2</text>
    <text x="140" y="170" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}">2 is allowed — fill the circle in</text>
    <line x1="40" y1="204" x2="480" y2="204" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 480 204 l -12 -6 l 0 12 z" fill="${INK}"/>
    <line x1="220" y1="204" x2="470" y2="204" stroke="${GREEN}" stroke-width="7"/>
    <circle cx="220" cy="204" r="10" fill="${GREEN}" stroke="${GREEN}" stroke-width="4"/>
    <text x="220" y="231" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#475569">2</text>
  </svg>`,

  // WHY the sign turns round, shown rather than asserted.
  FLIP_WHY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="260" y="36" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}">Multiply both sides by −1 and the order turns round</text>

    <line x1="40" y1="120" x2="480" y2="120" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 40 120 l 14 -7 l 0 14 z" fill="${INK}"/>
    <path d="M 480 120 l -14 -7 l 0 14 z" fill="${INK}"/>
    <line x1="260" y1="108" x2="260" y2="132" stroke="${MUTED}" stroke-width="2"/>
    <text x="260" y="152" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#475569">0</text>

    <circle cx="340" cy="120" r="8" fill="${BLUE}"/>
    <text x="340" y="100" text-anchor="middle" font-family="monospace" font-size="17" font-weight="900" fill="${BLUE}">2</text>
    <circle cx="420" cy="120" r="8" fill="${GREEN}"/>
    <text x="420" y="100" text-anchor="middle" font-family="monospace" font-size="17" font-weight="900" fill="${GREEN}">5</text>

    <circle cx="180" cy="120" r="8" fill="${BLUE}"/>
    <text x="180" y="100" text-anchor="middle" font-family="monospace" font-size="17" font-weight="900" fill="${BLUE}">−2</text>
    <circle cx="100" cy="120" r="8" fill="${GREEN}"/>
    <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="17" font-weight="900" fill="${GREEN}">−5</text>

    <path d="M 336 136 C 300 186, 220 186, 184 136" stroke="${AMBER}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 416 140 C 340 208, 176 208, 104 140" stroke="${AMBER}" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <text x="130" y="196" font-family="monospace" font-size="20" font-weight="900" fill="${RED}">−2 &gt; −5</text>
    <text x="300" y="196" font-family="monospace" font-size="20" font-weight="900" fill="${INK}">2 &lt; 5</text>
    <text x="260" y="228" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${AMBER}">Both jump to the other side of 0</text>
  </svg>`,

  // The notation, part by part. This is the slide the brackets question lives on.
  INTERVAL_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>

    <text x="150" y="118" font-family="monospace" font-size="52" font-weight="900" fill="${GREEN}">[</text>
    <text x="180" y="118" font-family="monospace" font-size="52" font-weight="900" fill="${INK}">−3</text>
    <text x="248" y="118" font-family="monospace" font-size="52" font-weight="900" fill="${MUTED}">,</text>
    <text x="272" y="118" font-family="monospace" font-size="52" font-weight="900" fill="${INK}">5</text>
    <text x="310" y="118" font-family="monospace" font-size="52" font-weight="900" fill="${RED}">)</text>

    <path d="M 160 64 L 160 44 L 250 44" stroke="${GREEN}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="258" y="49" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}">square = INCLUDED</text>

    <path d="M 318 130 L 318 168 L 250 168" stroke="${RED}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="242" y="173" text-anchor="end" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}">round = NOT included</text>

    <path d="M 200 130 L 200 200 L 250 200" stroke="${BLUE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="258" y="205" font-family="sans-serif" font-size="14" font-weight="bold" fill="${BLUE}">smaller number always first</text>

    <text x="30" y="230" font-family="sans-serif" font-size="13" font-weight="bold" fill="${AMBER}">∞ never gets a square bracket</text>
  </svg>`,

  // One set, three notations. The whole unit in one picture.
  THREE_WAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>

    <rect x="24" y="24" width="472" height="52" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2"/>
    <text x="40" y="44" font-family="sans-serif" font-size="12" font-weight="bold" fill="${BLUE}">SAY IT</text>
    <text x="40" y="66" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">x is more than −3, and at most 0</text>

    <rect x="24" y="86" width="472" height="80" rx="12" fill="#f3e8ff" stroke="${PURPLE}" stroke-width="2"/>
    <text x="40" y="106" font-family="sans-serif" font-size="12" font-weight="bold" fill="${PURPLE}">DRAW IT</text>
    <line x1="60" y1="140" x2="460" y2="140" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 60 140 l 12 -6 l 0 12 z" fill="${INK}"/>
    <path d="M 460 140 l -12 -6 l 0 12 z" fill="${INK}"/>
    <line x1="180" y1="140" x2="300" y2="140" stroke="${PURPLE}" stroke-width="7"/>
    <circle cx="180" cy="140" r="9" fill="#ffffff" stroke="${PURPLE}" stroke-width="4"/>
    <circle cx="300" cy="140" r="9" fill="${PURPLE}" stroke="${PURPLE}" stroke-width="4"/>
    <text x="180" y="162" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">−3</text>
    <text x="300" y="162" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">0</text>

    <rect x="24" y="176" width="228" height="52" rx="12" fill="#ecfdf5" stroke="${GREEN}" stroke-width="2"/>
    <text x="40" y="196" font-family="sans-serif" font-size="12" font-weight="bold" fill="${GREEN}">WRITE IT (inequality)</text>
    <text x="40" y="218" font-family="monospace" font-size="19" font-weight="900" fill="${INK}">−3 &lt; x ≤ 0</text>

    <rect x="268" y="176" width="228" height="52" rx="12" fill="#fffbeb" stroke="${AMBER}" stroke-width="2"/>
    <text x="284" y="196" font-family="sans-serif" font-size="12" font-weight="bold" fill="${AMBER}">WRITE IT (interval)</text>
    <text x="284" y="218" font-family="monospace" font-size="19" font-weight="900" fill="${INK}">(−3, 0]</text>
  </svg>`,

  // AND squeezes; OR spreads. Two shapes, and only two.
  COMPOUND_AND_OR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>

    <text x="30" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="${GREEN}">AND — one piece, trapped in the middle</text>
    <line x1="40" y1="76" x2="480" y2="76" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 40 76 l 12 -6 l 0 12 z" fill="${INK}"/>
    <path d="M 480 76 l -12 -6 l 0 12 z" fill="${INK}"/>
    <line x1="180" y1="76" x2="330" y2="76" stroke="${GREEN}" stroke-width="7"/>
    <circle cx="180" cy="76" r="9" fill="#ffffff" stroke="${GREEN}" stroke-width="4"/>
    <circle cx="330" cy="76" r="9" fill="${GREEN}" stroke="${GREEN}" stroke-width="4"/>
    <text x="180" y="99" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">−2</text>
    <text x="330" y="99" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">9</text>
    <text x="392" y="66" font-family="monospace" font-size="17" font-weight="900" fill="${GREEN}">(−2, 9]</text>

    <line x1="30" y1="126" x2="490" y2="126" stroke="#e2e8f0" stroke-width="2"/>

    <text x="30" y="166" font-family="sans-serif" font-size="15" font-weight="bold" fill="${RED}">OR — two pieces, running away from the middle</text>
    <line x1="40" y1="204" x2="480" y2="204" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 40 204 l 12 -6 l 0 12 z" fill="${INK}"/>
    <path d="M 480 204 l -12 -6 l 0 12 z" fill="${INK}"/>
    <line x1="46" y1="204" x2="180" y2="204" stroke="${RED}" stroke-width="7"/>
    <line x1="330" y1="204" x2="474" y2="204" stroke="${RED}" stroke-width="7"/>
    <circle cx="180" cy="204" r="9" fill="#ffffff" stroke="${RED}" stroke-width="4"/>
    <circle cx="330" cy="204" r="9" fill="#ffffff" stroke="${RED}" stroke-width="4"/>
    <text x="180" y="227" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">−2</text>
    <text x="330" y="227" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">9</text>
    <text x="196" y="194" font-family="monospace" font-size="15" font-weight="900" fill="${RED}">(−∞,−2) ∪ (9,∞)</text>
  </svg>`,

  // Absolute value read as DISTANCE, which is what makes the two cases obvious.
  ABS_DISTANCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 230" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="222" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="260" y="38" text-anchor="middle" font-family="monospace" font-size="26" font-weight="900" fill="${INK}">|x − 3| = 6</text>
    <text x="260" y="60" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}">"x is exactly 6 steps away from 3"</text>

    <line x1="40" y1="130" x2="480" y2="130" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 40 130 l 12 -6 l 0 12 z" fill="${INK}"/>
    <path d="M 480 130 l -12 -6 l 0 12 z" fill="${INK}"/>

    <circle cx="260" cy="130" r="8" fill="${BLUE}"/>
    <text x="260" y="154" text-anchor="middle" font-family="monospace" font-size="15" font-weight="bold" fill="${BLUE}">3</text>
    <circle cx="110" cy="130" r="9" fill="${RED}"/>
    <text x="110" y="154" text-anchor="middle" font-family="monospace" font-size="15" font-weight="bold" fill="${RED}">−3</text>
    <circle cx="410" cy="130" r="9" fill="${GREEN}"/>
    <text x="410" y="154" text-anchor="middle" font-family="monospace" font-size="15" font-weight="bold" fill="${GREEN}">9</text>

    <path d="M 254 108 L 116 108" stroke="${RED}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 116 108 l 10 -5 l 0 10 z" fill="${RED}"/>
    <text x="185" y="98" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}">6 steps left</text>

    <path d="M 266 108 L 404 108" stroke="${GREEN}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 404 108 l -10 -5 l 0 10 z" fill="${GREEN}"/>
    <text x="335" y="98" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}">6 steps right</text>

    <text x="260" y="200" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Two directions, so two answers — every single time</text>
  </svg>`,

  // Which shape a modulus inequality produces, and the phrase that fixes it.
  ABS_LESS_GREATER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>

    <text x="30" y="38" font-family="monospace" font-size="20" font-weight="900" fill="${GREEN}">|x| &lt; 4</text>
    <text x="140" y="38" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}">less than = INSIDE = one piece (AND)</text>
    <line x1="40" y1="80" x2="480" y2="80" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 40 80 l 12 -6 l 0 12 z" fill="${INK}"/>
    <path d="M 480 80 l -12 -6 l 0 12 z" fill="${INK}"/>
    <line x1="180" y1="80" x2="340" y2="80" stroke="${GREEN}" stroke-width="7"/>
    <circle cx="180" cy="80" r="9" fill="#ffffff" stroke="${GREEN}" stroke-width="4"/>
    <circle cx="340" cy="80" r="9" fill="#ffffff" stroke="${GREEN}" stroke-width="4"/>
    <text x="180" y="103" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">−4</text>
    <text x="340" y="103" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">4</text>
    <text x="260" y="128" text-anchor="middle" font-family="monospace" font-size="17" font-weight="900" fill="${GREEN}">−4 &lt; x &lt; 4</text>

    <line x1="30" y1="146" x2="490" y2="146" stroke="#e2e8f0" stroke-width="2"/>

    <text x="30" y="180" font-family="monospace" font-size="20" font-weight="900" fill="${RED}">|x| &gt; 4</text>
    <text x="140" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}">greater than = OUTSIDE = two pieces (OR)</text>
    <line x1="40" y1="216" x2="480" y2="216" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 40 216 l 12 -6 l 0 12 z" fill="${INK}"/>
    <path d="M 480 216 l -12 -6 l 0 12 z" fill="${INK}"/>
    <line x1="46" y1="216" x2="180" y2="216" stroke="${RED}" stroke-width="7"/>
    <line x1="340" y1="216" x2="474" y2="216" stroke="${RED}" stroke-width="7"/>
    <circle cx="180" cy="216" r="9" fill="#ffffff" stroke="${RED}" stroke-width="4"/>
    <circle cx="340" cy="216" r="9" fill="#ffffff" stroke="${RED}" stroke-width="4"/>
    <text x="180" y="239" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">−4</text>
    <text x="340" y="239" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">4</text>
    <text x="260" y="206" text-anchor="middle" font-family="monospace" font-size="15" font-weight="900" fill="${RED}">x &lt; −4 or x &gt; 4</text>
  </svg>`,

  // The set-notation item Acellus asks alongside these: ∩ against ∪.
  SETS_AND_OR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>

    <text x="140" y="36" text-anchor="middle" font-family="monospace" font-size="22" font-weight="900" fill="${GREEN}">A ∩ B</text>
    <text x="140" y="58" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN}">intersection — in BOTH</text>
    <circle cx="106" cy="140" r="56" fill="${GREEN}" fill-opacity="0.12" stroke="${GREEN}" stroke-width="2.5"/>
    <circle cx="174" cy="140" r="56" fill="${GREEN}" fill-opacity="0.12" stroke="${GREEN}" stroke-width="2.5"/>
    <path d="M 140 92 A 56 56 0 0 0 140 188 A 56 56 0 0 0 140 92 z" fill="${GREEN}" fill-opacity="0.55"/>
    <text x="76" y="146" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="900" fill="${INK}">A</text>
    <text x="204" y="146" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="900" fill="${INK}">B</text>
    <text x="140" y="222" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}">nothing shared → empty set ∅</text>

    <line x1="260" y1="30" x2="260" y2="220" stroke="#e2e8f0" stroke-width="2"/>

    <text x="380" y="36" text-anchor="middle" font-family="monospace" font-size="22" font-weight="900" fill="${BLUE}">A ∪ B</text>
    <text x="380" y="58" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${BLUE}">union — in EITHER</text>
    <circle cx="346" cy="140" r="56" fill="${BLUE}" fill-opacity="0.42" stroke="${BLUE}" stroke-width="2.5"/>
    <circle cx="414" cy="140" r="56" fill="${BLUE}" fill-opacity="0.42" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="316" y="146" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="900" fill="${INK}">A</text>
    <text x="444" y="146" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="900" fill="${INK}">B</text>
    <text x="380" y="222" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}">list every member once</text>
  </svg>`,

  // The words the questions are actually written in — the ESL beat, drawn.
  WORDS_TO_SIGNS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="4" y="4" width="512" height="242" rx="20" fill="#f8fafc" stroke="#cbd5e1"/>
    ${[
      ['more than · greater than', '&gt;', RED, 46],
      ['at least · no less than · minimum', '≥', GREEN, 94],
      ['less than · fewer than · under', '&lt;', RED, 142],
      ['at most · no more than · maximum', '≤', GREEN, 190],
    ].map(([words, sign, colour, y]) => `
      <rect x="24" y="${y - 22}" width="330" height="38" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="40" y="${y + 3}" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">${words}</text>
      <path d="M 362 ${y - 3} L 396 ${y - 3}" stroke="${colour}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 396 ${y - 3} l -9 -5 l 0 10 z" fill="${colour}"/>
      <rect x="406" y="${y - 22}" width="52" height="38" rx="10" fill="${colour}" fill-opacity="0.12" stroke="${colour}" stroke-width="2"/>
      <text x="432" y="${y + 6}" text-anchor="middle" font-family="monospace" font-size="22" font-weight="900" fill="${colour}">${sign}</text>
    `).join('')}
    <text x="260" y="228" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="${AMBER}">"at" in front means the number itself counts</text>
  </svg>`,
};
