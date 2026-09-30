// src/data/COORD_SCI/B11_2/workbook.js
// Practice for B11.03–B11.04, reproduction in humans and HIV.
// 10 questions: 3 Focus · 4 Practice · 3 Challenge. English-only.
//
// Every question uses an answerable widget (multiple choice, dropdown
// sentences, drag-to-target, drag-into-order). None repeats a homework
// question — those are the Homework Review's. The Challenge tier takes the
// homework's ideas somewhere new: a 32-day cycle, a blocked oviduct, a nurse's
// needle. See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'dnd',
        prompt: 'Drag each organ to the right system.',
        bank: [
          { val: 'testis', text: 'Testis' },
          { val: 'prostate', text: 'Prostate gland' },
          { val: 'spermduct', text: 'Sperm duct' },
          { val: 'ovary', text: 'Ovary' },
          { val: 'oviduct', text: 'Oviduct' },
          { val: 'cervix', text: 'Cervix' },
        ],
        targets: [
          { id: 'male', title: 'Male reproductive system' },
          { id: 'female', title: 'Female reproductive system' },
        ],
        correctSets: { male: ['testis', 'prostate', 'spermduct'], female: ['ovary', 'oviduct', 'cervix'] },
        solution: ['Male: **testes**, scrotum, **sperm ducts**, **prostate gland**, urethra, penis.', 'Female: **ovaries**, **oviducts**, uterus, **cervix**, vagina.'],
        answer: 'testis, prostate gland, sperm duct → male; ovary, oviduct, cervix → female',
      },
      {
        id: 'f2', type: 'mcq',
        prompt: 'Which organ makes the female gametes?',
        options: [
          { val: 'a', text: 'The uterus' },
          { val: 'b', text: 'The ovary' },
          { val: 'c', text: 'The oviduct' },
          { val: 'd', text: 'The cervix' },
        ],
        correct: 'b',
        solution: ['The female gametes are **eggs**, and they are made in the **ovaries**.', 'The oviduct only carries the egg, and the uterus is where an embryo develops.'],
        answer: 'The ovary',
      },
      {
        id: 'f3', type: 'inline',
        prompt: 'Complete the sentences about the two sex hormones.',
        textParts: [
          'The testes secrete ',
          ', and the ovaries secrete ',
          '. At puberty these hormones cause the ',
          ' sexual characteristics to develop.',
        ],
        blanks: {
          1: { correct: 'testosterone', options: [{ val: 'testosterone', text: 'testosterone' }, { val: 'oestrogen', text: 'oestrogen' }, { val: 'insulin', text: 'insulin' }] },
          2: { correct: 'oestrogen', options: [{ val: 'oestrogen', text: 'oestrogen' }, { val: 'testosterone', text: 'testosterone' }, { val: 'adrenaline', text: 'adrenaline' }] },
          3: { correct: 'secondary', options: [{ val: 'secondary', text: 'secondary' }, { val: 'primary', text: 'primary' }, { val: 'genetic', text: 'genetic' }] },
        },
        solution: ['**Test**es → **test**osterone. Ovaries → oestrogen.', 'The changes at puberty (a deeper voice, breasts developing, body hair) are the **secondary** sexual characteristics.'],
        answer: 'testosterone … oestrogen … secondary',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'order',
        prompt: 'Put the parts in the order a sperm passes through them, from where it is made to where it meets an egg.',
        bank: [
          { val: 'testis', text: 'Testis' },
          { val: 'duct', text: 'Sperm duct' },
          { val: 'urethra', text: 'Urethra' },
          { val: 'vagina', text: 'Vagina' },
          { val: 'uterus', text: 'Uterus' },
          { val: 'oviduct', text: 'Oviduct' },
        ],
        targets: [{ id: 'seq', title: 'First → last' }],
        correctSets: { seq: ['testis', 'duct', 'urethra', 'vagina', 'uterus', 'oviduct'] },
        solution: ['In the male: made in the **testis**, carried along the **sperm duct**, out through the **urethra**.', 'In the female: left in the **vagina**, swims through the **uterus**, and meets the egg in an **oviduct**.'],
        answer: 'testis, sperm duct, urethra, vagina, uterus, oviduct',
      },
      {
        id: 'p2', type: 'dnd',
        prompt: 'Drag each feature of a gamete to what it is for.',
        bank: [
          { val: 'flagellum', text: 'Flagellum of a sperm' },
          { val: 'mito', text: 'Mitochondria in the middle piece' },
          { val: 'acrosome', text: 'Acrosome of a sperm' },
          { val: 'store', text: 'Energy store of an egg' },
        ],
        targets: [
          { id: 'swim', title: 'Swimming to the egg' },
          { id: 'energy', title: 'Releasing energy for swimming' },
          { id: 'digest', title: 'Digesting a way through the jelly coat' },
          { id: 'food', title: 'Food for the first few days after fertilisation' },
        ],
        correctSets: { swim: ['flagellum'], energy: ['mito'], digest: ['acrosome'], food: ['store'] },
        solution: ['The sperm\'s three adaptations: **flagellum** to swim, **mitochondria** to power it, **acrosome** enzymes to get through the jelly coat.', 'The egg supplies the **energy store** that the new embryo lives on at first.'],
        answer: 'flagellum swims, mitochondria release energy, acrosome digests, store feeds the embryo',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'A body cell of a horse has 64 chromosomes. How many chromosomes are there in a horse sperm, and in a horse zygote?',
        options: [
          { val: 'a', text: 'Sperm 64, zygote 64' },
          { val: 'b', text: 'Sperm 32, zygote 32' },
          { val: 'c', text: 'Sperm 32, zygote 64' },
          { val: 'd', text: 'Sperm 64, zygote 128' },
        ],
        correct: 'c',
        solution: ['A sperm is **haploid** — half the body-cell number: 64 ÷ 2 = **32**.', 'The zygote is **diploid** — 32 from the sperm and 32 from the egg: **64**.'],
        answer: 'Sperm 32, zygote 64',
      },
      {
        id: 'p4', type: 'inline',
        prompt: 'Complete the description of the first half of the menstrual cycle.',
        textParts: [
          'During days 1 to 5 the lining of the uterus ',
          '. This is called ',
          '. Then the lining is repaired, and at about day 14 an egg is released from an ovary. This is called ',
          '.',
        ],
        blanks: {
          1: { correct: 'breaks down', options: [{ val: 'breaks down', text: 'breaks down' }, { val: 'gets thicker', text: 'gets thicker' }] },
          2: { correct: 'menstruation', options: [{ val: 'menstruation', text: 'menstruation' }, { val: 'ovulation', text: 'ovulation' }, { val: 'implantation', text: 'implantation' }] },
          3: { correct: 'ovulation', options: [{ val: 'ovulation', text: 'ovulation' }, { val: 'menstruation', text: 'menstruation' }, { val: 'fertilisation', text: 'fertilisation' }] },
        },
        solution: ['Days 1–5: the lining **breaks down** and is lost through the vagina — **menstruation**.', 'About day 14: an egg is released from an ovary — **ovulation**.'],
        answer: 'breaks down … menstruation … ovulation',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'In some women one oviduct is blocked. Sperm cannot get past the blockage, and neither can an egg. What is the effect on that side?',
        options: [
          { val: 'a', text: 'Eggs cannot be made in the ovary' },
          { val: 'b', text: 'An egg released on that side cannot be fertilised' },
          { val: 'c', text: 'Menstruation stops' },
          { val: 'd', text: 'Oestrogen is no longer secreted' },
        ],
        correct: 'b',
        solution: ['Fertilisation happens **in the oviduct**, where sperm meet the egg.', 'If the tube is blocked the two gametes cannot meet, so that egg cannot be fertilised. The ovary itself still makes eggs and oestrogen.'],
        answer: 'An egg released on that side cannot be fertilised',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'A nurse uses a new, sterile needle for every patient and wears gloves when there is blood. Which route of HIV transmission do these two precautions block?',
        options: [
          { val: 'a', text: 'Sexual contact' },
          { val: 'b', text: 'From mother to baby in breast milk' },
          { val: 'c', text: 'Blood-to-blood contact' },
          { val: 'd', text: 'Through the air' },
        ],
        correct: 'c',
        solution: ['A used needle and an open cut both let **infected blood** into another person\'s blood.', 'A sterile needle and gloves block **blood-to-blood** contact. HIV is never passed through the air.'],
        answer: 'Blood-to-blood contact',
      },
      {
        id: 'c3', type: 'inline',
        prompt: 'A person is infected with HIV and is not treated. Complete the explanation of why, years later, a mild infection could kill them.',
        textParts: [
          'HIV is a ',
          '. It destroys ',
          ', so the body makes fewer ',
          ' and cannot destroy other pathogens.',
        ],
        blanks: {
          1: { correct: 'virus', options: [{ val: 'virus', text: 'virus' }, { val: 'bacterium', text: 'bacterium' }, { val: 'hormone', text: 'hormone' }] },
          2: { correct: 'white blood cells', options: [{ val: 'white blood cells', text: 'white blood cells' }, { val: 'red blood cells', text: 'red blood cells' }, { val: 'sperm cells', text: 'sperm cells' }] },
          3: { correct: 'antibodies', options: [{ val: 'antibodies', text: 'antibodies' }, { val: 'antibiotics', text: 'antibiotics' }, { val: 'enzymes', text: 'enzymes' }] },
        },
        solution: ['HIV is a **virus**, and the cells it infects are **white blood cells** (lymphocytes).', 'Lymphocytes make **antibodies**. With too few of them, the immune system cannot deal with other pathogens.'],
        answer: 'virus … white blood cells … antibodies',
      },
    ],
  },
];
