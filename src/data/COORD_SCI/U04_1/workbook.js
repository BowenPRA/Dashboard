// src/data/COORD_SCI/U04_1/workbook.js
// Reveal-solution practice for C4.1 Electrolysis. 12 questions: 4 Focus ·
// 5 Practice · 3 Challenge. English-only. Every question uses an ANSWERABLE
// widget (multiple choice, dropdowns, or drag-to-electrode) — no free-typed
// equations or sentences, which a student cannot enter easily. Writing symbol
// equations and formulae is done in the dedicated Equations / Formulae tasks;
// the workbook checks understanding around them. Inline maths uses $…$ with
// \text{} to keep element symbols upright. See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which word means "the breakdown of an ionic compound, molten or dissolved, by an electric current"?',
        options: [
          { val: 'a', text: 'Electrolysis' },
          { val: 'b', text: 'Evaporation' },
          { val: 'c', text: 'Neutralisation' },
          { val: 'd', text: 'Condensation' },
        ],
        correct: 'a',
        solution: ['**Electro-** means electricity and **-lysis** means splitting.', 'So electrolysis is splitting a compound apart using electricity.'],
        answer: 'Electrolysis',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Choose the words that complete the sentence.',
        textParts: [
          'An electrolyte conducts electricity because it contains ',
          ' that are free to move. A metal, by contrast, conducts using its free ',
          '.',
        ],
        blanks: {
          1: { correct: 'ions', options: [{ val: 'ions', text: 'ions' }, { val: 'electrons', text: 'electrons' }, { val: 'atoms', text: 'atoms' }] },
          2: { correct: 'electrons', options: [{ val: 'electrons', text: 'electrons' }, { val: 'ions', text: 'ions' }, { val: 'protons', text: 'protons' }] },
        },
        solution: ['An electrolyte conducts with **ions** that move; the compound is broken down.', 'A metal conducts with free **electrons**, and the metal is not changed.'],
        answer: 'ions … electrons',
      },
      {
        id: 'f3', type: 'mcq',
        prompt: 'The **cathode** is which electrode?',
        options: [
          { val: 'a', text: 'The negative (−) electrode' },
          { val: 'b', text: 'The positive (+) electrode' },
          { val: 'c', text: 'The one that is always graphite' },
          { val: 'd', text: 'The liquid itself' },
        ],
        correct: 'a',
        solution: ['The **cathode** is the **negative (−)** electrode.', 'Positive ions (cations) are attracted to it, gain electrons, and are reduced.'],
        answer: 'The negative (−) electrode',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'During electrolysis, where does the **metal** form?',
        options: [
          { val: 'a', text: 'At the cathode (−)' },
          { val: 'b', text: 'At the anode (+)' },
          { val: 'c', text: 'In the wire' },
          { val: 'd', text: 'It does not form anywhere' },
        ],
        correct: 'a',
        solution: ['Metals form **positive ions**, which are attracted to the negative **cathode**.', 'The non-metal forms at the anode.'],
        answer: 'At the cathode (−)',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'inline',
        prompt: 'Choose the words that explain why a solid ionic compound cannot be electrolysed.',
        textParts: [
          'In a solid ionic compound, the ions are locked in a fixed ',
          ', so they ',
          '. Only when it is ',
          ' are the ions free to move and carry the current.',
        ],
        blanks: {
          1: { correct: 'lattice', options: [{ val: 'lattice', text: 'lattice' }, { val: 'solution', text: 'solution' }, { val: 'gas', text: 'gas' }] },
          2: { correct: 'cannot move', options: [{ val: 'cannot move', text: 'cannot move' }, { val: 'move freely', text: 'move freely' }] },
          3: { correct: 'molten or dissolved', options: [{ val: 'molten or dissolved', text: 'molten or dissolved' }, { val: 'frozen', text: 'frozen' }, { val: 'cooled', text: 'cooled' }] },
        },
        solution: ['In a **solid**, ions are held in a fixed **lattice** and **cannot move**.', 'Melting or dissolving frees them, so a **molten or dissolved** compound conducts.'],
        answer: 'lattice … cannot move … molten or dissolved',
      },
      {
        id: 'p2', type: 'mcq',
        prompt: 'Molten lead(II) bromide is electrolysed. What is produced at the **anode (+)**?',
        options: [
          { val: 'a', text: 'Bromine gas' },
          { val: 'b', text: 'Lead metal' },
          { val: 'c', text: 'Hydrogen gas' },
          { val: 'd', text: 'Oxygen gas' },
        ],
        correct: 'a',
        solution: ['The non-metal forms at the anode.', 'The bromide ions ($\\text{Br}^-$) lose electrons and form **bromine** gas, $\\text{Br}_2$.'],
        answer: 'Bromine gas',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'Which is the correct overall equation, with state symbols, for the electrolysis of molten lead(II) bromide?',
        options: [
          { val: 'a', text: '$\\text{PbBr}_2(l) \\rightarrow \\text{Pb}(l) + \\text{Br}_2(g)$' },
          { val: 'b', text: '$\\text{PbBr}_2(l) \\rightarrow \\text{Pb}(l) + 2\\text{Br}(g)$' },
          { val: 'c', text: '$\\text{Pb}(l) + \\text{Br}_2(g) \\rightarrow \\text{PbBr}_2(l)$' },
          { val: 'd', text: '$\\text{PbBr}(l) \\rightarrow \\text{Pb}(l) + \\text{Br}(g)$' },
        ],
        correct: 'a',
        solution: ['Lead(II) bromide $\\text{PbBr}_2$ splits into lead and bromine.', 'Bromine is diatomic ($\\text{Br}_2$); option (c) is the reverse; (d) has the wrong formula.'],
        answer: '$\\text{PbBr}_2(l) \\rightarrow \\text{Pb}(l) + \\text{Br}_2(g)$',
      },
      {
        id: 'p4', type: 'dnd',
        prompt: 'Molten potassium iodide (KI) is electrolysed. Drag each product to the electrode where it forms.',
        bank: [
          { val: 'k', text: 'Potassium (K)' },
          { val: 'i2', text: 'Iodine ($\\text{I}_2$)' },
        ],
        targets: [
          { id: 'cathode', title: 'Cathode (−)' },
          { id: 'anode', title: 'Anode (+)' },
        ],
        correctSets: { cathode: ['k'], anode: ['i2'] },
        solution: ['Split KI into its metal and non-metal.', 'The **metal** (potassium) forms at the cathode; the **non-metal** (iodine) forms at the anode.'],
        answer: 'Potassium → cathode, iodine → anode',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'At the cathode, ions **gain** electrons. What is this process called?',
        options: [
          { val: 'a', text: 'Reduction' },
          { val: 'b', text: 'Oxidation' },
          { val: 'c', text: 'Evaporation' },
          { val: 'd', text: 'Distillation' },
        ],
        correct: 'a',
        solution: ['**Gain** of electrons is **reduction** (at the cathode).', 'Loss of electrons is oxidation (at the anode). "OIL RIG": Reduction Is Gain.'],
        answer: 'Reduction',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'dnd',
        prompt: 'For molten lead(II) bromide, drag each half-equation to the electrode it happens at.',
        bank: [
          { val: 'cat', text: '$\\text{Pb}^{2+} + 2e^- \\rightarrow \\text{Pb}$' },
          { val: 'an', text: '$2\\text{Br}^- \\rightarrow \\text{Br}_2 + 2e^-$' },
        ],
        targets: [
          { id: 'cathode', title: 'Cathode (−) — gains electrons' },
          { id: 'anode', title: 'Anode (+) — loses electrons' },
        ],
        correctSets: { cathode: ['cat'], anode: ['an'] },
        solution: ['At the **cathode**, positive $\\text{Pb}^{2+}$ ions **gain** 2 electrons (reduction).', 'At the **anode**, $\\text{Br}^-$ ions **lose** electrons (oxidation) and pair up as $\\text{Br}_2$.'],
        answer: 'Cathode: $\\text{Pb}^{2+}+2e^- \\rightarrow \\text{Pb}$; Anode: $2\\text{Br}^- \\rightarrow \\text{Br}_2 + 2e^-$',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'When **brine** (aqueous sodium chloride) is electrolysed, hydrogen — not sodium — forms at the cathode. Why?',
        options: [
          { val: 'a', text: 'Sodium is very reactive, so hydrogen from the water is released instead' },
          { val: 'b', text: 'There is no sodium in brine' },
          { val: 'c', text: 'Sodium is a gas' },
          { val: 'd', text: 'The cathode is made of sodium' },
        ],
        correct: 'a',
        solution: ['Brine contains water as well as $\\text{Na}^+$ and $\\text{Cl}^-$ ions.', 'Sodium is very reactive, so the **hydrogen** from the water is discharged at the cathode instead.'],
        answer: 'Sodium is too reactive, so hydrogen from the water is released instead',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'Aluminium is extracted by electrolysis of molten aluminium oxide. Why can it **not** be extracted by heating its ore with carbon, like iron?',
        options: [
          { val: 'a', text: 'Aluminium is more reactive than carbon, so carbon cannot displace it' },
          { val: 'b', text: 'Aluminium oxide does not melt' },
          { val: 'c', text: 'Carbon is more expensive than electricity' },
          { val: 'd', text: 'Aluminium is a non-metal' },
        ],
        correct: 'a',
        solution: ['Reduction with carbon only works for metals **less** reactive than carbon (like iron).', 'Aluminium is **more reactive** than carbon, so only electrolysis can pull it from its oxide.'],
        answer: 'Aluminium is more reactive than carbon, so carbon cannot displace it',
      },
    ],
  },
];
