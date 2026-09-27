// src/data/IGCSE_CHEM/M06_8/workbook.js
// Reveal-solution practice for 6.8 Transition Elements.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Writing a formula from a name is
// the Formulae task's job (FORMULA_WRITE), so this set carries what that task
// does not stage: recognising the transition elements, their properties against
// Group I, reading data, catalysts, making their salts, which ions have a fixed
// charge, and the Extended skill in REVERSE — from a formula back to a name.
//
// Focus stays on Core content, so a shaky student has somewhere to stand.
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which list contains **only** transition elements?',
        options: [
          { val: 'a', text: 'Iron, copper, sodium' },
          { val: 'b', text: 'Nickel, silver, titanium' },
          { val: 'c', text: 'Gold, calcium, zinc' },
          { val: 'd', text: 'Chromium, aluminium, mercury' },
        ],
        correct: 'b',
        solution: [
          'The transition elements are the block in the middle of the table, between Group II and Group III.',
          'Sodium is in Group I, calcium in Group II and aluminium in Group III — so lists (a), (c) and (d) each have one element that does not belong.',
          'Nickel, silver and titanium are all among the ten transition elements to know.',
        ],
        answer: 'Nickel, silver, titanium',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Compare iron with sodium. Choose the words that complete the sentence.',
        textParts: [
          'Compared with sodium, iron has a ',
          ' density, a ',
          ' melting point, and it is much ',
          ' reactive.',
        ],
        blanks: {
          1: { correct: 'high', options: [{ val: 'high', text: 'higher' }, { val: 'low', text: 'lower' }] },
          2: { correct: 'high', options: [{ val: 'high', text: 'higher' }, { val: 'low', text: 'lower' }] },
          3: { correct: 'less', options: [{ val: 'less', text: 'less' }, { val: 'more', text: 'more' }] },
        },
        solution: [
          'Density: iron is 7.9 g/cm³ and sodium only 0.97 g/cm³ — iron is about 8 times denser.',
          'Melting point: iron melts at 1535 °C, sodium at only 98 °C.',
          'Reactivity: sodium fizzes on cold water; iron only rusts slowly in damp air. Iron is much **less** reactive.',
        ],
        answer: 'higher … higher … less',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Drag each transition element to the fact about it.',
        bank: [
          { val: 'ag', text: 'Silver' },
          { val: 'hg', text: 'Mercury' },
          { val: 'fe', text: 'Iron' },
          { val: 'cr', text: 'Chromium' },
        ],
        targets: [
          { id: 'cond', title: 'The best conductor of electricity of all the metals' },
          { id: 'liquid', title: 'A liquid at room temperature' },
          { id: 'cat', title: 'The catalyst in making ammonia' },
          { id: 'rust', title: 'Added to steel to stop it rusting' },
        ],
        correctSets: { cond: ['ag'], liquid: ['hg'], cat: ['fe'], rust: ['cr'] },
        solution: [
          '**Silver** is the best conductor of electricity; copper is next.',
          '**Mercury** is the exception to "high melting point" — it is a liquid at room temperature.',
          '**Iron** is the catalyst in making ammonia.',
          '**Chromium** is added to steel (about 11%) to make stainless steel, which does not rust.',
        ],
        answer: 'Silver → conductor · mercury → liquid · iron → catalyst · chromium → stainless steel',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'Nickel is used as a **catalyst** when vegetable oils are turned into margarine. What does this tell you about the nickel?',
        options: [
          { val: 'a', text: 'It is used up, and becomes part of the margarine' },
          { val: 'b', text: 'It slows the reaction down, so that it is safe' },
          { val: 'c', text: 'It speeds up the reaction, and is unchanged at the end' },
          { val: 'd', text: 'It gives the margarine its yellow colour' },
        ],
        correct: 'c',
        solution: [
          'A catalyst **speeds up** a reaction.',
          'It is **not used up**: at the end it is still there, chemically unchanged.',
          'So the nickel speeds up the reaction and can be used again. Many transition elements and their compounds act as catalysts.',
        ],
        answer: 'It speeds up the reaction, and is unchanged at the end',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'Here are the density and melting point of four metals. Which one is most likely to be a **transition element**?',
        options: [
          { val: 'a', text: 'density 0.86 g/cm³ · melts at 63 °C' },
          { val: 'b', text: 'density 1.74 g/cm³ · melts at 650 °C' },
          { val: 'c', text: 'density 7.2 g/cm³ · melts at 1907 °C' },
          { val: 'd', text: 'density 0.53 g/cm³ · melts at 181 °C' },
        ],
        correct: 'c',
        solution: [
          'Transition elements have a **high density** and a **high melting point**.',
          'Metals (a) and (d) are lighter than water and melt below 200 °C — they are alkali metals (potassium and lithium).',
          'Metal (b) is magnesium, from Group II: light, with a moderate melting point.',
          'Only (c) has both a high density and a very high melting point. It is chromium.',
        ],
        answer: 'density 7.2 g/cm³ · melts at 1907 °C',
      },
      {
        id: 'p2', type: 'inline',
        prompt: 'Complete the sentences about trends in reactivity.',
        textParts: [
          'Going down Group I, reactivity ',
          '. The transition elements show ',
          ' trend in reactivity, but elements next to each other in the table tend to be ',
          '.',
        ],
        blanks: {
          1: { correct: 'increases', options: [{ val: 'increases', text: 'increases' }, { val: 'decreases', text: 'decreases' }, { val: 'stays', text: 'stays the same' }] },
          2: { correct: 'no', options: [{ val: 'no', text: 'no clear' }, { val: 'up', text: 'an increasing' }, { val: 'down', text: 'a decreasing' }] },
          3: { correct: 'similar', options: [{ val: 'similar', text: 'similar' }, { val: 'opposite', text: 'opposite' }] },
        },
        solution: [
          'In Group I, potassium reacts more strongly than sodium, and sodium more than lithium: reactivity **increases** down the group.',
          'The transition elements do **not** show a clear trend.',
          'But neighbours in the block — iron, cobalt and nickel, for example — tend to be **similar**.',
        ],
        answer: 'increases … no clear … similar',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'Which of these is **not** a typical property of a transition element?',
        options: [
          { val: 'a', text: 'It is a good conductor of heat and electricity' },
          { val: 'b', text: 'It forms white compounds' },
          { val: 'c', text: 'It has a high density' },
          { val: 'd', text: 'It, or its compounds, can act as a catalyst' },
        ],
        correct: 'b',
        solution: [
          'Transition elements are good conductors, have high densities, and many act as catalysts — so (a), (c) and (d) are typical.',
          'Their compounds are usually **coloured**: blue, green, orange-brown.',
          '**White** compounds are typical of the Group I metals, not the transition elements.',
        ],
        answer: 'It forms white compounds',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'A student wants to make crystals of **nickel(II) sulfate**. She starts with green nickel(II) oxide. What should she add to it?',
        options: [
          { val: 'a', text: 'Water' },
          { val: 'b', text: 'Dilute sulfuric acid' },
          { val: 'c', text: 'Sodium hydroxide solution' },
          { val: 'd', text: 'Dilute hydrochloric acid' },
        ],
        correct: 'b',
        solution: [
          'The oxides of all metals are **bases**, so nickel(II) oxide reacts with an **acid** to give a salt and water.',
          'A **sulfate** must come from **sulfuric** acid. Hydrochloric acid would give nickel(II) chloride.',
          '$\\text{NiO}(\\text{s}) + \\text{H}_2\\text{SO}_4(\\text{aq}) \\rightarrow \\text{NiSO}_4(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$',
        ],
        answer: 'Dilute sulfuric acid',
      },
      {
        id: 'p5', type: 'dnd',
        prompt: 'Drag each metal ion, or pair of ions, to the right group.',
        bank: [
          { val: 'na', text: 'Na⁺' },
          { val: 'mg', text: 'Mg²⁺' },
          { val: 'al', text: 'Al³⁺' },
          { val: 'cu', text: 'Cu⁺ and Cu²⁺' },
          { val: 'fe', text: 'Fe²⁺ and Fe³⁺' },
        ],
        targets: [
          { id: 'fixed', title: 'Always this charge (Groups I, II and III)' },
          { id: 'var', title: 'Variable charge (transition elements)' },
        ],
        correctSets: { fixed: ['na', 'mg', 'al'], var: ['cu', 'fe'] },
        solution: [
          'A Group I metal always forms 1+ ions, Group II always 2+, Group III always 3+.',
          'Most transition elements can form ions with **different charges**.',
          'So Na⁺, Mg²⁺ and Al³⁺ have fixed charges; copper and iron each have two.',
        ],
        answer: 'Na⁺, Mg²⁺, Al³⁺ → fixed · copper and iron → variable',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'inline',
        prompt: 'Name the compound $\\text{Fe}_2(\\text{SO}_4)_3$. Complete the reasoning.',
        textParts: [
          'Each sulfate ion has a charge of ',
          '. There are three, so together they carry ',
          '. Two iron ions share the balancing 6+, so each iron ion is ',
          '. The name is ',
          '.',
        ],
        blanks: {
          1: { correct: '2-', options: [{ val: '1-', text: '1−' }, { val: '2-', text: '2−' }, { val: '3-', text: '3−' }] },
          2: { correct: '6-', options: [{ val: '3-', text: '3−' }, { val: '5-', text: '5−' }, { val: '6-', text: '6−' }] },
          3: { correct: '3+', options: [{ val: '2+', text: '2+' }, { val: '3+', text: '3+' }, { val: '6+', text: '6+' }] },
          4: { correct: 'iii', options: [{ val: 'ii', text: 'iron(II) sulfate' }, { val: 'iii', text: 'iron(III) sulfate' }, { val: 'vi', text: 'iron(VI) sulfate' }] },
        },
        solution: [
          'The sulfate ion is $\\text{SO}_4^{2-}$, so each carries 2−.',
          'Three of them: $3 \\times 2- = 6-$.',
          'The compound is neutral, so the iron must carry 6+ in total. There are **two** iron ions, so each is $6+ \\div 2 = 3+$.',
          'Write the charge on ONE iron ion as the numeral: **iron(III) sulfate**. (Iron(VI) forgets to share the 6+ between two ions.)',
        ],
        answer: 'iron(III) sulfate',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'A student wrote a name for each formula. Which one is **wrong**?',
        options: [
          { val: 'a', text: '$\\text{Cu(NO}_3)_2$ — copper(II) nitrate' },
          { val: 'b', text: '$\\text{FeSO}_4$ — iron(II) sulfate' },
          { val: 'c', text: '$\\text{Fe(OH)}_2$ — iron(II) hydroxide' },
          { val: 'd', text: '$\\text{CuO}$ — copper(I) oxide' },
        ],
        correct: 'd',
        solution: [
          'Work out the charge on the metal ion in each, from the other ion.',
          '(a) two $\\text{NO}_3^{-}$ → 2−, so $\\text{Cu}^{2+}$: copper(II) — right. (b) one $\\text{SO}_4^{2-}$ → $\\text{Fe}^{2+}$: right. (c) two $\\text{OH}^{-}$ → $\\text{Fe}^{2+}$: right.',
          '(d) one $\\text{O}^{2-}$ needs $\\text{Cu}^{2+}$, so CuO is **copper(II)** oxide. Copper(I) oxide is $\\text{Cu}_2\\text{O}$.',
        ],
        answer: 'CuO — copper(I) oxide',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'Element Q conducts electricity. It forms two chlorides, $\\text{QCl}_2$ and $\\text{QCl}_3$, and both are coloured. Its oxide is a base. Which element could Q be?',
        options: [
          { val: 'a', text: 'Iron' },
          { val: 'b', text: 'Sodium' },
          { val: 'c', text: 'Aluminium' },
          { val: 'd', text: 'Chlorine' },
        ],
        correct: 'a',
        solution: [
          'It conducts and its oxide is a base, so Q is a **metal** — not chlorine.',
          'Two chlorides means ions with two different charges (2+ and 3+): a **variable** oxidation number. Sodium is always 1+ and aluminium always 3+.',
          'Coloured compounds confirm it: Q is a transition element, such as **iron** ($\\text{FeCl}_2$ and $\\text{FeCl}_3$).',
        ],
        answer: 'Iron',
      },
    ],
  },
];
