// src/data/COORD_SCI/U04_1/workbook.js
// Reveal-solution practice for C4.1 Electrolysis. 12 questions: 4 Focus ·
// 5 Practice · 3 Challenge. English-only (this track is not bilingual). Chemical
// formulae and equations are KaTeX ($…$) with \text{} keeping symbols upright.
// See docs/workbook-tasks.md.

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
        id: 'f2', type: 'mcq',
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
        id: 'f3',
        prompt: 'Complete the definition: an **electrolyte** is a liquid or solution that conducts electricity because it contains ______ that are free to move.',
        solution: ['An electrolyte conducts because it has **ions** free to move.', 'In a solid the ions are locked in place, so a solid ionic compound does not conduct.'],
        answer: 'ions',
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
        id: 'p1',
        prompt: 'Explain why solid lead(II) bromide does **not** conduct electricity, but molten lead(II) bromide does.',
        solution: [
          'In the **solid**, the ions are locked in a fixed lattice and cannot move.',
          'When **molten**, the ions are free to move to the electrodes and carry the charge.',
        ],
        answer: 'Solid: ions locked in place. Molten: ions free to move, so it conducts.',
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
        id: 'p3',
        prompt: 'Write the overall symbol equation, with state symbols, for the electrolysis of molten lead(II) bromide.',
        solution: [
          'Lead(II) bromide is $\\text{PbBr}_2$; it splits into lead and bromine.',
          '$\\text{PbBr}_2(\\text{l}) \\rightarrow \\text{Pb}(\\text{l}) + \\text{Br}_2(\\text{g})$',
        ],
        answer: '$\\text{PbBr}_2(\\text{l}) \\rightarrow \\text{Pb}(\\text{l}) + \\text{Br}_2(\\text{g})$',
      },
      {
        id: 'p4',
        prompt: 'Predict the two products of the electrolysis of **molten potassium iodide (KI)**, and say which electrode each forms at.',
        solution: [
          'Split into the metal and the non-metal: potassium and iodine.',
          '**Potassium (K)** forms at the cathode (−); **iodine ($\\text{I}_2$)** forms at the anode (+).',
        ],
        answer: 'Potassium at the cathode, iodine at the anode.',
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
        solution: ['**Gain** of electrons is **reduction** (it happens at the cathode).', 'Loss of electrons is oxidation (at the anode). "OIL RIG": Oxidation Is Loss, Reduction Is Gain.'],
        answer: 'Reduction',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1',
        prompt: 'Write the cathode and anode **half-equations** for molten lead(II) bromide, and show that adding them gives the overall equation.',
        solution: [
          '**Cathode (reduction):** $\\text{Pb}^{2+} + 2\\text{e}^- \\rightarrow \\text{Pb}$',
          '**Anode (oxidation):** $2\\text{Br}^- \\rightarrow \\text{Br}_2 + 2\\text{e}^-$',
          'Add them: the $2\\text{e}^-$ cancel, leaving $\\text{Pb}^{2+} + 2\\text{Br}^- \\rightarrow \\text{Pb} + \\text{Br}_2$.',
        ],
        answer: 'Cathode $\\text{Pb}^{2+} + 2\\text{e}^- \\rightarrow \\text{Pb}$; anode $2\\text{Br}^- \\rightarrow \\text{Br}_2 + 2\\text{e}^-$.',
      },
      {
        id: 'c2',
        prompt: 'When **brine** (aqueous sodium chloride) is electrolysed, hydrogen — not sodium — forms at the cathode. Suggest why.',
        solution: [
          'Brine contains water as well as $\\text{Na}^+$ and $\\text{Cl}^-$ ions.',
          'Sodium is very reactive, so the **hydrogen** from the water is discharged at the cathode instead of sodium.',
          '(Chlorine forms at the anode, and sodium hydroxide is left in solution.)',
        ],
        answer: 'Sodium is too reactive, so hydrogen from the water is released at the cathode instead.',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'Aluminium is extracted by electrolysis of molten aluminium oxide. Why can aluminium **not** be extracted by heating its ore with carbon, like iron?',
        options: [
          { val: 'a', text: 'Aluminium is more reactive than carbon, so carbon cannot displace it' },
          { val: 'b', text: 'Aluminium oxide does not melt' },
          { val: 'c', text: 'Carbon is more expensive than electricity' },
          { val: 'd', text: 'Aluminium is a non-metal' },
        ],
        correct: 'a',
        solution: [
          'Reduction with carbon only works for metals **less** reactive than carbon (like iron).',
          'Aluminium is **more reactive** than carbon, so only electrolysis can pull it from its oxide.',
        ],
        answer: 'Aluminium is more reactive than carbon, so carbon cannot displace it.',
      },
    ],
  },
];
