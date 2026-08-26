// src/data/GED_MATH/MATH_1C/diagrams.js
// Teaching diagrams for Equations with Fractions. See docs/svg-diagrams.md —
// monospace for notation, sans-serif for labels, one idea per diagram.

export const DIAGRAMS = {
  // The anatomy of a fraction that has a whole expression on top. The bar is
  // the thing students stop seeing, so it gets its own callout: it is a
  // division sign wearing a different hat.
  NOTES_FRACTION_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="w-full h-full drop-shadow-md">
    <rect x="6" y="6" width="508" height="238" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="260" y="42" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">One fraction, three parts to name</text>

    <text x="260" y="118" font-family="monospace" font-weight="900" font-size="40" fill="#3b82f6" text-anchor="middle">2x + 1</text>
    <line x1="170" y1="134" x2="350" y2="134" stroke="#d97706" stroke-width="7" stroke-linecap="round"/>
    <text x="260" y="182" font-family="monospace" font-weight="900" font-size="40" fill="#10b981" text-anchor="middle">3</text>

    <path d="M 165 108 L 100 88" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
    <rect x="14" y="66" width="92" height="30" rx="9" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="60" y="87" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e40af" text-anchor="middle">Numerator</text>

    <path d="M 355 134 L 406 134" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
    <rect x="408" y="118" width="102" height="30" rx="9" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
    <text x="459" y="139" font-family="sans-serif" font-weight="bold" font-size="14" fill="#92400e" text-anchor="middle">"divide by"</text>

    <path d="M 245 176 L 180 200" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <rect x="60" y="186" width="118" height="30" rx="9" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
    <text x="119" y="207" font-family="sans-serif" font-weight="bold" font-size="14" fill="#065f46" text-anchor="middle">Denominator</text>

    <text x="260" y="232" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">The bar divides the WHOLE numerator, not just the first term</text>
  </svg>`,

  // Finding the LCD by listing multiples. Deliberately the slow, countable
  // method rather than a rule — 2 and 3 both reach 6, and you can see them do it.
  NOTES_LCD_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 230" class="w-full h-full drop-shadow-md">
    <rect x="6" y="6" width="508" height="218" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="260" y="38" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Which number do BOTH denominators divide into?</text>

    <rect x="26" y="58" width="70" height="34" rx="9" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="61" y="82" font-family="monospace" font-weight="900" font-size="18" fill="#1e40af" text-anchor="middle">2</text>
    <text x="120" y="82" font-family="monospace" font-weight="bold" font-size="18" fill="#3b82f6">2</text>
    <text x="178" y="82" font-family="monospace" font-weight="bold" font-size="18" fill="#3b82f6">4</text>
    <text x="236" y="82" font-family="monospace" font-weight="bold" font-size="18" fill="#3b82f6">6</text>
    <text x="294" y="82" font-family="monospace" font-weight="bold" font-size="18" fill="#3b82f6">8</text>
    <text x="352" y="82" font-family="monospace" font-weight="bold" font-size="18" fill="#3b82f6">10</text>

    <rect x="26" y="112" width="70" height="34" rx="9" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
    <text x="61" y="136" font-family="monospace" font-weight="900" font-size="18" fill="#065f46" text-anchor="middle">3</text>
    <text x="120" y="136" font-family="monospace" font-weight="bold" font-size="18" fill="#10b981">3</text>
    <text x="178" y="136" font-family="monospace" font-weight="bold" font-size="18" fill="#10b981">6</text>
    <text x="236" y="136" font-family="monospace" font-weight="bold" font-size="18" fill="#10b981">9</text>
    <text x="294" y="136" font-family="monospace" font-weight="bold" font-size="18" fill="#10b981">12</text>
    <text x="352" y="136" font-family="monospace" font-weight="bold" font-size="18" fill="#10b981">15</text>

    <circle cx="242" cy="76" r="19" fill="none" stroke="#ef4444" stroke-width="3"/>
    <circle cx="184" cy="130" r="19" fill="none" stroke="#ef4444" stroke-width="3"/>

    <rect x="392" y="76" width="102" height="54" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="443" y="99" font-family="sans-serif" font-weight="bold" font-size="13" fill="#991b1b" text-anchor="middle">LCD</text>
    <text x="443" y="122" font-family="monospace" font-weight="900" font-size="24" fill="#991b1b" text-anchor="middle">6</text>

    <text x="260" y="178" font-family="sans-serif" font-size="14" fill="#64748b" text-anchor="middle">6 is the first number that appears in both lists.</text>
    <text x="260" y="202" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">Multiply BOTH sides by 6 and every fraction disappears.</text>
  </svg>`,

  // The move itself, in three frames. Frame 2 is the one that matters: the
  // bracket is what stops "times 6" landing on only part of the numerator.
  NOTES_CLEAR_DENOMINATORS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 250" class="w-full h-full drop-shadow-md">
    <defs>
      <marker id="m1c-down" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 5 10 L 10 0 z" fill="#64748b"/>
      </marker>
    </defs>
    <rect x="6" y="6" width="608" height="238" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <rect x="160" y="20" width="300" height="46" rx="12" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <text x="310" y="50" font-family="monospace" font-weight="900" font-size="21" fill="#1e293b" text-anchor="middle">(x - 3)/2 = (2x + 1)/3</text>

    <line x1="310" y1="70" x2="310" y2="94" stroke="#64748b" stroke-width="3" marker-end="url(#m1c-down)"/>
    <rect x="340" y="70" width="200" height="26" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
    <text x="440" y="88" font-family="sans-serif" font-weight="bold" font-size="13" fill="#991b1b" text-anchor="middle">multiply both sides by 6</text>

    <rect x="160" y="102" width="300" height="46" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
    <text x="310" y="132" font-family="monospace" font-weight="900" font-size="21" fill="#78350f" text-anchor="middle">3(x - 3) = 2(2x + 1)</text>

    <rect x="10" y="106" width="140" height="40" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
    <text x="80" y="122" font-family="sans-serif" font-weight="bold" font-size="12" fill="#92400e" text-anchor="middle">Keep the brackets:</text>
    <text x="80" y="139" font-family="sans-serif" font-size="12" fill="#92400e" text-anchor="middle">6 ÷ 2 = 3 goes</text>

    <line x1="310" y1="152" x2="310" y2="176" stroke="#64748b" stroke-width="3" marker-end="url(#m1c-down)"/>
    <rect x="340" y="152" width="150" height="26" rx="8" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
    <text x="415" y="170" font-family="sans-serif" font-weight="bold" font-size="13" fill="#6b21a8" text-anchor="middle">expand each side</text>

    <rect x="160" y="184" width="300" height="46" rx="12" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="310" y="214" font-family="monospace" font-weight="900" font-size="21" fill="#065f46" text-anchor="middle">3x - 9 = 4x + 2</text>

    <rect x="470" y="188" width="140" height="38" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
    <text x="540" y="204" font-family="sans-serif" font-weight="bold" font-size="12" fill="#065f46" text-anchor="middle">No fractions left.</text>
    <text x="540" y="220" font-family="sans-serif" font-size="12" fill="#065f46" text-anchor="middle">Now solve as usual.</text>
  </svg>`,

  // The single most expensive mistake on this topic, drawn as right vs wrong.
  NOTES_EVERY_TERM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 236" class="w-full h-full drop-shadow-md">
    <rect x="6" y="6" width="528" height="224" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="270" y="36" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Multiplying by 4 must reach EVERY term</text>

    <text x="270" y="80" font-family="monospace" font-weight="900" font-size="26" fill="#1e293b" text-anchor="middle">x/4 + 5 = 11</text>

    <path d="M 214 90 Q 226 112 238 90" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <path d="M 262 90 Q 274 112 286 90" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <path d="M 316 90 Q 328 112 340 90" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <text x="277" y="128" font-family="sans-serif" font-weight="bold" font-size="13" fill="#065f46" text-anchor="middle">× 4 on all three terms</text>

    <rect x="46" y="146" width="200" height="66" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="146" y="170" font-family="sans-serif" font-weight="bold" font-size="14" fill="#065f46" text-anchor="middle">RIGHT</text>
    <text x="146" y="198" font-family="monospace" font-weight="900" font-size="22" fill="#065f46" text-anchor="middle">x + 20 = 44</text>

    <rect x="294" y="146" width="200" height="66" rx="14" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <text x="394" y="170" font-family="sans-serif" font-weight="bold" font-size="14" fill="#991b1b" text-anchor="middle">WRONG</text>
    <text x="394" y="198" font-family="monospace" font-weight="900" font-size="22" fill="#991b1b" text-anchor="middle">x + 5 = 44</text>
    <line x1="316" y1="204" x2="472" y2="182" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // The routine, as four countable chips. Students copy this into the notebook
  // and work down it; it is the spine of the whole unit.
  NOTES_FOUR_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 200" class="w-full h-full drop-shadow-md">
    <defs>
      <marker id="m1c-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/>
      </marker>
    </defs>
    <rect x="6" y="6" width="528" height="188" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="270" y="38" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Four steps, always in this order</text>

    <rect x="20" y="58" width="112" height="86" rx="14" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
    <circle cx="76" cy="82" r="14" fill="#ef4444"/>
    <text x="76" y="88" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">1</text>
    <text x="76" y="114" font-family="sans-serif" font-weight="bold" font-size="14" fill="#991b1b" text-anchor="middle">CLEAR</text>
    <text x="76" y="132" font-family="sans-serif" font-size="12" fill="#991b1b" text-anchor="middle">× the LCD</text>

    <line x1="136" y1="101" x2="152" y2="101" stroke="#94a3b8" stroke-width="3" marker-end="url(#m1c-right)"/>

    <rect x="156" y="58" width="112" height="86" rx="14" fill="#f3e8ff" stroke="#a855f7" stroke-width="3"/>
    <circle cx="212" cy="82" r="14" fill="#a855f7"/>
    <text x="212" y="88" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">2</text>
    <text x="212" y="114" font-family="sans-serif" font-weight="bold" font-size="14" fill="#6b21a8" text-anchor="middle">EXPAND</text>
    <text x="212" y="132" font-family="sans-serif" font-size="12" fill="#6b21a8" text-anchor="middle">open brackets</text>

    <line x1="272" y1="101" x2="288" y2="101" stroke="#94a3b8" stroke-width="3" marker-end="url(#m1c-right)"/>

    <rect x="292" y="58" width="112" height="86" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <circle cx="348" cy="82" r="14" fill="#3b82f6"/>
    <text x="348" y="88" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">3</text>
    <text x="348" y="114" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e40af" text-anchor="middle">COLLECT</text>
    <text x="348" y="132" font-family="sans-serif" font-size="12" fill="#1e40af" text-anchor="middle">x on one side</text>

    <line x1="408" y1="101" x2="424" y2="101" stroke="#94a3b8" stroke-width="3" marker-end="url(#m1c-right)"/>

    <rect x="428" y="58" width="94" height="86" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <circle cx="475" cy="82" r="14" fill="#10b981"/>
    <text x="475" y="88" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">4</text>
    <text x="475" y="114" font-family="sans-serif" font-weight="bold" font-size="14" fill="#065f46" text-anchor="middle">DIVIDE</text>
    <text x="475" y="132" font-family="sans-serif" font-size="12" fill="#065f46" text-anchor="middle">by the number</text>

    <text x="270" y="172" font-family="sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Then check: put your answer back into the original fractions.</text>
  </svg>`,

  // Substituting a negative answer back in — the check students skip precisely
  // when they need it most.
  NOTES_CHECK_BACK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 210" class="w-full h-full drop-shadow-md">
    <rect x="6" y="6" width="508" height="198" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="260" y="36" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Checking x = -11 in the ORIGINAL equation</text>

    <rect x="30" y="54" width="200" height="112" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="130" y="78" font-family="sans-serif" font-weight="bold" font-size="13" fill="#1e40af" text-anchor="middle">Left side</text>
    <text x="130" y="108" font-family="monospace" font-weight="900" font-size="19" fill="#1e40af" text-anchor="middle">(-11 - 3)/2</text>
    <text x="130" y="134" font-family="monospace" font-weight="bold" font-size="17" fill="#1e40af" text-anchor="middle">= -14/2</text>
    <text x="130" y="156" font-family="monospace" font-weight="900" font-size="19" fill="#1e40af" text-anchor="middle">= -7</text>

    <rect x="290" y="54" width="200" height="112" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="390" y="78" font-family="sans-serif" font-weight="bold" font-size="13" fill="#065f46" text-anchor="middle">Right side</text>
    <text x="390" y="108" font-family="monospace" font-weight="900" font-size="19" fill="#065f46" text-anchor="middle">(2(-11) + 1)/3</text>
    <text x="390" y="134" font-family="monospace" font-weight="bold" font-size="17" fill="#065f46" text-anchor="middle">= -21/3</text>
    <text x="390" y="156" font-family="monospace" font-weight="900" font-size="19" fill="#065f46" text-anchor="middle">= -7</text>

    <text x="260" y="118" font-family="monospace" font-weight="900" font-size="26" fill="#1e293b" text-anchor="middle">=</text>
    <text x="260" y="192" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">Both sides give -7, so x = -11 is correct.</text>
  </svg>`,

  // ---------------------------------------------------------------- graded

  // Source Analysis 1: a student's working with one wrong line. The mark scheme
  // has to describe every line, because the grader cannot see this picture.
  DIAGRAM_SPOT_THE_ERROR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 296" class="w-full h-full drop-shadow-md">
    <rect x="6" y="6" width="488" height="284" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="250" y="36" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Linh's working. One line is wrong.</text>

    <text x="60" y="76" font-family="sans-serif" font-weight="bold" font-size="13" fill="#94a3b8">Line 1</text>
    <text x="250" y="76" font-family="monospace" font-weight="900" font-size="20" fill="#1e293b" text-anchor="middle">(x + 6)/4 = (x - 2)/2</text>

    <text x="60" y="122" font-family="sans-serif" font-weight="bold" font-size="13" fill="#94a3b8">Line 2</text>
    <text x="250" y="122" font-family="monospace" font-weight="900" font-size="20" fill="#991b1b" text-anchor="middle">x + 6 = 2x - 2</text>
    <rect x="126" y="102" width="248" height="30" rx="9" fill="none" stroke="#ef4444" stroke-width="3"/>

    <text x="60" y="168" font-family="sans-serif" font-weight="bold" font-size="13" fill="#94a3b8">Line 3</text>
    <text x="250" y="168" font-family="monospace" font-weight="900" font-size="20" fill="#1e293b" text-anchor="middle">8 = x</text>

    <text x="60" y="214" font-family="sans-serif" font-weight="bold" font-size="13" fill="#94a3b8">Line 4</text>
    <text x="250" y="214" font-family="monospace" font-weight="900" font-size="20" fill="#1e293b" text-anchor="middle">x = 8</text>

    <rect x="30" y="238" width="440" height="40" rx="12" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
    <text x="250" y="255" font-family="sans-serif" font-weight="bold" font-size="13" fill="#92400e" text-anchor="middle">Multiplying by 4 turns the right side into 2(x - 2).</text>
    <text x="250" y="271" font-family="sans-serif" font-size="12" fill="#92400e" text-anchor="middle">Which line is wrong, why, and what is the real answer?</text>
  </svg>`,

  // Source Analysis 2: two correct routes, side by side. The point is that the
  // task must never imply there is one right order.
  DIAGRAM_TWO_ROUTES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" class="w-full h-full drop-shadow-md">
    <rect x="6" y="6" width="508" height="288" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="260" y="34" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Two students solve  x/2 + 3 = x/5 + 6</text>

    <rect x="20" y="50" width="228" height="196" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="134" y="74" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e40af" text-anchor="middle">An: clear first</text>
    <text x="134" y="106" font-family="monospace" font-weight="bold" font-size="16" fill="#1e40af" text-anchor="middle">× 10 both sides</text>
    <text x="134" y="136" font-family="monospace" font-weight="900" font-size="18" fill="#1e40af" text-anchor="middle">5x + 30 = 2x + 60</text>
    <text x="134" y="166" font-family="monospace" font-weight="bold" font-size="16" fill="#1e40af" text-anchor="middle">- 2x, - 30</text>
    <text x="134" y="196" font-family="monospace" font-weight="900" font-size="18" fill="#1e40af" text-anchor="middle">3x = 30</text>
    <text x="134" y="228" font-family="monospace" font-weight="900" font-size="20" fill="#1e40af" text-anchor="middle">x = 10</text>

    <rect x="272" y="50" width="228" height="196" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="386" y="74" font-family="sans-serif" font-weight="bold" font-size="14" fill="#065f46" text-anchor="middle">Bao: subtract first</text>
    <text x="386" y="106" font-family="monospace" font-weight="bold" font-size="16" fill="#065f46" text-anchor="middle">- 3 both sides</text>
    <text x="386" y="136" font-family="monospace" font-weight="900" font-size="18" fill="#065f46" text-anchor="middle">x/2 = x/5 + 3</text>
    <text x="386" y="166" font-family="monospace" font-weight="bold" font-size="16" fill="#065f46" text-anchor="middle">× 10 both sides</text>
    <text x="386" y="196" font-family="monospace" font-weight="900" font-size="18" fill="#065f46" text-anchor="middle">5x = 2x + 30</text>
    <text x="386" y="228" font-family="monospace" font-weight="900" font-size="20" fill="#065f46" text-anchor="middle">x = 10</text>

    <rect x="120" y="258" width="280" height="30" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="260" y="278" font-family="sans-serif" font-weight="bold" font-size="14" fill="#92400e" text-anchor="middle">Same answer. Both are correct.</text>
  </svg>`,

  // Source Analysis 3: a word problem that IS a fraction equation, drawn as the
  // situation rather than as notation.
  DIAGRAM_SPLIT_THE_BILL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 286" class="w-full h-full drop-shadow-md">
    <rect x="6" y="6" width="508" height="274" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>

    <text x="260" y="34" font-family="sans-serif" font-weight="bold" font-size="15" fill="#64748b" text-anchor="middle">Two ways to split a restaurant bill</text>

    <rect x="20" y="52" width="228" height="150" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
    <text x="134" y="76" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e40af" text-anchor="middle">Friday: 3 friends</text>
    <circle cx="88" cy="106" r="13" fill="#3b82f6"/>
    <circle cx="134" cy="106" r="13" fill="#3b82f6"/>
    <circle cx="180" cy="106" r="13" fill="#3b82f6"/>
    <text x="134" y="146" font-family="sans-serif" font-size="13" fill="#1e40af" text-anchor="middle">The bill is $x</text>
    <text x="134" y="180" font-family="monospace" font-weight="900" font-size="19" fill="#1e40af" text-anchor="middle">each pays x/3</text>

    <rect x="272" y="52" width="228" height="150" rx="14" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
    <text x="386" y="76" font-family="sans-serif" font-weight="bold" font-size="14" fill="#065f46" text-anchor="middle">Saturday: 5 friends</text>
    <circle cx="316" cy="106" r="13" fill="#10b981"/>
    <circle cx="351" cy="106" r="13" fill="#10b981"/>
    <circle cx="386" cy="106" r="13" fill="#10b981"/>
    <circle cx="421" cy="106" r="13" fill="#10b981"/>
    <circle cx="456" cy="106" r="13" fill="#10b981"/>
    <text x="386" y="146" font-family="sans-serif" font-size="13" fill="#065f46" text-anchor="middle">The bill is $20 more</text>
    <text x="386" y="180" font-family="monospace" font-weight="900" font-size="19" fill="#065f46" text-anchor="middle">each pays (x+20)/5</text>

    <rect x="46" y="220" width="428" height="46" rx="12" fill="#fffbeb" stroke="#d97706" stroke-width="3"/>
    <text x="260" y="240" font-family="sans-serif" font-weight="bold" font-size="14" fill="#92400e" text-anchor="middle">On both nights each person paid the SAME amount.</text>
    <text x="260" y="258" font-family="sans-serif" font-size="13" fill="#92400e" text-anchor="middle">What was Friday's bill?</text>
  </svg>`,
};
