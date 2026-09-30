// src/data/COORD_SCI/B10_1/workbook.js
// Practice for B10 Coordination and response.
// 10 questions: 3 Focus · 4 Practice · 3 Challenge. English-only.
//
// Every question uses an answerable widget (multiple choice, dropdown
// sentences, drag-to-target, drag-into-order) — nothing free-typed. None of
// these repeats a homework question: those are the Homework Review's. The
// Challenge tier is the homework's ideas met in a new setting (a pin instead of
// a hot pan, a cold day instead of a hot one, a pancreas that makes no insulin).
// See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which neurone carries an impulse **from the spinal cord to a muscle**?',
        options: [
          { val: 'a', text: 'A sensory neurone' },
          { val: 'b', text: 'A relay neurone' },
          { val: 'c', text: 'A motor neurone' },
          { val: 'd', text: 'A receptor' },
        ],
        correct: 'c',
        solution: ['**Motor** neurones carry impulses OUT of the CNS to an effector (a muscle or a gland).', '**Sensory** neurones bring impulses IN from a receptor, and **relay** neurones pass them on inside the CNS.'],
        answer: 'A motor neurone',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Complete the definition of a hormone.',
        textParts: [
          'A hormone is a ',
          ' substance, produced by a ',
          ' and carried by the ',
          ', which alters the activity of one or more specific ',
          ' organs.',
        ],
        blanks: {
          1: { correct: 'chemical', options: [{ val: 'chemical', text: 'chemical' }, { val: 'electrical', text: 'electrical' }] },
          2: { correct: 'gland', options: [{ val: 'gland', text: 'gland' }, { val: 'neurone', text: 'neurone' }, { val: 'muscle', text: 'muscle' }] },
          3: { correct: 'blood', options: [{ val: 'blood', text: 'blood' }, { val: 'nerves', text: 'nerves' }] },
          4: { correct: 'target', options: [{ val: 'target', text: 'target' }, { val: 'sense', text: 'sense' }, { val: 'effector', text: 'effector' }] },
        },
        solution: ['This is the definition the exam wants, word for word: **chemical** · **gland** · **blood** · **target organs**.', 'An electrical message along a neurone is a nerve impulse, not a hormone.'],
        answer: 'chemical … gland … blood … target',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Drag each hormone to the gland that secretes it.',
        bank: [
          { val: 'adrenaline', text: 'Adrenaline' },
          { val: 'insulin', text: 'Insulin' },
          { val: 'testosterone', text: 'Testosterone' },
          { val: 'oestrogen', text: 'Oestrogen' },
        ],
        targets: [
          { id: 'adrenal', title: 'Adrenal gland' },
          { id: 'pancreas', title: 'Pancreas' },
          { id: 'testis', title: 'Testis' },
          { id: 'ovary', title: 'Ovary' },
        ],
        correctSets: { adrenal: ['adrenaline'], pancreas: ['insulin'], testis: ['testosterone'], ovary: ['oestrogen'] },
        solution: ['Two of them give themselves away: **adrenal** glands make **adrenal**ine, and the **test**es make **test**osterone.', 'The **pancreas** makes insulin (and glucagon); the **ovaries** make oestrogen.'],
        answer: 'adrenal → adrenaline, pancreas → insulin, testis → testosterone, ovary → oestrogen',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'order',
        prompt: 'A person steps on a sharp pin and lifts their foot at once. Put the events in order.',
        bank: [
          { val: 'receptor', text: 'A pain receptor in the foot detects the pin' },
          { val: 'sensory', text: 'An impulse travels along a sensory neurone to the spinal cord' },
          { val: 'relay', text: 'A relay neurone passes the impulse across the spinal cord' },
          { val: 'motor', text: 'An impulse travels along a motor neurone to the leg' },
          { val: 'muscle', text: 'The leg muscle contracts and lifts the foot' },
        ],
        targets: [{ id: 'seq', title: 'First → last' }],
        correctSets: { seq: ['receptor', 'sensory', 'relay', 'motor', 'muscle'] },
        solution: ['It is the same reflex arc as the hot pan, with a different stimulus: **receptor → sensory → relay → motor → effector**.', 'The effector here is the leg muscle; its contraction is the response.'],
        answer: 'receptor, sensory neurone, relay neurone, motor neurone, muscle',
      },
      {
        id: 'p2', type: 'dnd',
        prompt: 'Drag each statement to the system it describes.',
        bank: [
          { val: 'impulse', text: 'The message is an electrical impulse' },
          { val: 'fast', text: 'The response is very fast' },
          { val: 'blood', text: 'The message is carried in the blood' },
          { val: 'long', text: 'The effect lasts a long time' },
        ],
        targets: [
          { id: 'nervous', title: 'Nervous system' },
          { id: 'hormonal', title: 'Hormonal system' },
        ],
        correctSets: { nervous: ['impulse', 'fast'], hormonal: ['blood', 'long'] },
        solution: ['Nervous: **electrical** impulses along **neurones** — fast, and soon over.', 'Hormonal: **chemicals** in the **blood** — slower to arrive, but the effect goes on for longer.'],
        answer: 'impulse and fast → nervous; blood and long-lasting → hormonal',
      },
      {
        id: 'p3', type: 'inline',
        prompt: 'A girl has not eaten all morning and then plays football. Complete the description of what happens to her blood glucose.',
        textParts: [
          'Her blood glucose concentration falls below the set point. The pancreas secretes ',
          '. This makes the liver break down ',
          ' to glucose, so the blood glucose concentration ',
          '.',
        ],
        blanks: {
          1: { correct: 'glucagon', options: [{ val: 'glucagon', text: 'glucagon' }, { val: 'insulin', text: 'insulin' }, { val: 'glycogen', text: 'glycogen' }] },
          2: { correct: 'glycogen', options: [{ val: 'glycogen', text: 'glycogen' }, { val: 'glucagon', text: 'glucagon' }, { val: 'starch', text: 'starch' }] },
          3: { correct: 'rises', options: [{ val: 'rises', text: 'rises' }, { val: 'falls', text: 'falls' }] },
        },
        solution: ['Too LOW, so the hormone needed is the one that raises glucose: **glucagon**.', 'The liver\'s store is **glycogen**; breaking it down releases glucose, and the concentration **rises** back to normal.'],
        answer: 'glucagon … glycogen … rises',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'A person gets a sudden fright. A few seconds later their pupils are wider and their heart is beating faster. Which gland has been stimulated?',
        options: [
          { val: 'a', text: 'The pancreas' },
          { val: 'b', text: 'The adrenal glands' },
          { val: 'c', text: 'The ovaries' },
          { val: 'd', text: 'The salivary glands' },
        ],
        correct: 'b',
        solution: ['Wider pupils and a faster heart rate are effects of **adrenaline**.', 'Adrenaline is secreted by the **adrenal glands**, one above each kidney.'],
        answer: 'The adrenal glands',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'inline',
        prompt: 'A walker is caught out on a cold, windy hill and his body temperature starts to fall. Complete the explanation of how his skin responds.',
        textParts: [
          'The arterioles supplying the skin capillaries get ',
          '. This is called ',
          '. Less blood flows near the surface of the skin, so ',
          ' heat is lost.',
        ],
        blanks: {
          1: { correct: 'narrower', options: [{ val: 'narrower', text: 'narrower' }, { val: 'wider', text: 'wider' }, { val: 'deeper', text: 'deeper' }] },
          2: { correct: 'vasoconstriction', options: [{ val: 'vasoconstriction', text: 'vasoconstriction' }, { val: 'vasodilation', text: 'vasodilation' }] },
          3: { correct: 'less', options: [{ val: 'less', text: 'less' }, { val: 'more', text: 'more' }] },
        },
        solution: ['Too cold means KEEP the heat in. The arterioles **narrow** — vaso**constriction**.', 'With less warm blood near the surface, **less** heat is lost to the air. The vessels do not move deeper; they only change width.'],
        answer: 'narrower … vasoconstriction … less',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'In one kind of diabetes, the pancreas cannot make insulin. What would you expect to see after this person eats a meal?',
        options: [
          { val: 'a', text: 'The blood glucose concentration rises and stays high for a long time' },
          { val: 'b', text: 'The blood glucose concentration falls far below normal' },
          { val: 'c', text: 'The blood glucose concentration does not change at all' },
          { val: 'd', text: 'The liver stores more glycogen than usual' },
        ],
        correct: 'a',
        solution: ['The meal makes the glucose rise, as in anyone.', 'With no **insulin**, nothing tells the liver to take glucose out of the blood and store it — so the concentration stays **high**.'],
        answer: 'It rises and stays high for a long time',
      },
      {
        id: 'c3', type: 'dnd',
        prompt: 'A doctor taps just below a patient\'s knee and the lower leg kicks forward. Drag each part of this reflex to its name.',
        bank: [
          { val: 'tap', text: 'The tap on the knee' },
          { val: 'stretch', text: 'Cells in the leg that detect the tap' },
          { val: 'thigh', text: 'The thigh muscle that contracts' },
          { val: 'kick', text: 'The lower leg kicking forward' },
        ],
        targets: [
          { id: 'stimulus', title: 'Stimulus' },
          { id: 'receptor', title: 'Receptor' },
          { id: 'effector', title: 'Effector' },
          { id: 'response', title: 'Response' },
        ],
        correctSets: { stimulus: ['tap'], receptor: ['stretch'], effector: ['thigh'], response: ['kick'] },
        solution: ['The **stimulus** is the change (the tap); the **receptor** is what detects it.', 'The **effector** is the muscle that acts, and the **response** is what you see happen — the kick.'],
        answer: 'tap = stimulus, detecting cells = receptor, thigh muscle = effector, kick = response',
      },
    ],
  },
];
