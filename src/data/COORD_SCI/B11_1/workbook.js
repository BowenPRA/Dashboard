// src/data/COORD_SCI/B11_1/workbook.js
// Practice for B11.01–B11.02, reproduction in plants.
// 10 questions: 3 Focus · 4 Practice · 3 Challenge. English-only.
//
// Every question uses an answerable widget (multiple choice, dropdown
// sentences, drag-to-target, drag-into-order). None repeats a homework
// question — those are the Homework Review's. The Challenge tier asks for the
// same ideas in a setting the homework did not use: a banana plantation, a
// farmer's seed store, a flower met for the first time.
// See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'What is the name of the cell formed when the nuclei of two gametes fuse?',
        options: [
          { val: 'a', text: 'A zygote' },
          { val: 'b', text: 'An ovule' },
          { val: 'c', text: 'A pollen grain' },
          { val: 'd', text: 'A clone' },
        ],
        correct: 'a',
        solution: ['The fusion of two gamete nuclei is **fertilisation**, and the cell it makes is a **zygote**.', 'The zygote is diploid: it has one set of chromosomes from each gamete.'],
        answer: 'A zygote',
      },
      {
        id: 'f2', type: 'dnd',
        prompt: 'Drag each part to the right group.',
        bank: [
          { val: 'anther', text: 'Anther' },
          { val: 'filament', text: 'Filament' },
          { val: 'stigma', text: 'Stigma' },
          { val: 'style', text: 'Style' },
          { val: 'ovary', text: 'Ovary' },
        ],
        targets: [
          { id: 'stamen', title: 'Stamen — the male part' },
          { id: 'carpel', title: 'Carpel — the female part' },
        ],
        correctSets: { stamen: ['anther', 'filament'], carpel: ['stigma', 'style', 'ovary'] },
        solution: ['A **stamen** is an anther on top of a filament. The anther makes the pollen.', 'A **carpel** is a stigma, a style and an ovary. The ovary contains the ovules.'],
        answer: 'anther and filament → stamen; stigma, style and ovary → carpel',
      },
      {
        id: 'f3', type: 'inline',
        prompt: 'Complete the two definitions.',
        textParts: [
          'Pollination is the transfer of pollen grains from an ',
          ' to a ',
          '. Fertilisation happens when a pollen nucleus fuses with a nucleus in an ',
          '.',
        ],
        blanks: {
          1: { correct: 'anther', options: [{ val: 'anther', text: 'anther' }, { val: 'ovary', text: 'ovary' }, { val: 'stigma', text: 'stigma' }] },
          2: { correct: 'stigma', options: [{ val: 'stigma', text: 'stigma' }, { val: 'anther', text: 'anther' }, { val: 'petal', text: 'petal' }] },
          3: { correct: 'ovule', options: [{ val: 'ovule', text: 'ovule' }, { val: 'anther', text: 'anther' }, { val: 'sepal', text: 'sepal' }] },
        },
        solution: ['Pollen is MADE in the anther and LANDS on the stigma: **anther → stigma**.', 'Fertilisation happens lower down, inside an **ovule** in the ovary.'],
        answer: 'anther … stigma … ovule',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'order',
        prompt: 'A bee visits an apple flower. Put the events in order, ending with a seed.',
        bank: [
          { val: 'visit', text: 'The bee brushes past the anthers and pollen sticks to its body' },
          { val: 'stigma', text: 'At the next flower, pollen rubs off onto the stigma' },
          { val: 'tube', text: 'A pollen tube grows down the style to an ovule' },
          { val: 'fuse', text: 'The pollen nucleus fuses with the nucleus in the ovule' },
          { val: 'seed', text: 'The ovule becomes a seed' },
        ],
        targets: [{ id: 'seq', title: 'First → last' }],
        correctSets: { seq: ['visit', 'stigma', 'tube', 'fuse', 'seed'] },
        solution: ['Pollination first: pollen picked up at the anthers, left on a stigma.', 'Then the pollen tube, then the nuclei fuse (fertilisation), and only then does the ovule become a seed.'],
        answer: 'anthers, stigma, pollen tube, nuclei fuse, seed',
      },
      {
        id: 'p2', type: 'mcq',
        prompt: 'The nucleus in a pollen grain of a pea plant has 7 chromosomes. How many chromosomes are there in a zygote of the pea plant?',
        options: [
          { val: 'a', text: '7' },
          { val: 'b', text: '14' },
          { val: 'c', text: '21' },
          { val: 'd', text: '28' },
        ],
        correct: 'b',
        solution: ['A pollen nucleus is a gamete, so it is **haploid**: 7 is one set.', 'The ovule nucleus also has 7. When they fuse, the zygote has 7 + 7 = **14** — it is diploid.'],
        answer: '14',
      },
      {
        id: 'p3', type: 'dnd',
        prompt: 'Drag each part of a flower to its function.',
        bank: [
          { val: 'sepal', text: 'Sepal' },
          { val: 'petal', text: 'Petal' },
          { val: 'anther', text: 'Anther' },
          { val: 'stigma', text: 'Stigma' },
        ],
        targets: [
          { id: 'protect', title: 'Protects the flower in bud' },
          { id: 'attract', title: 'Attracts insects' },
          { id: 'make', title: 'Makes pollen grains' },
          { id: 'catch', title: 'Catches pollen grains' },
        ],
        correctSets: { protect: ['sepal'], attract: ['petal'], make: ['anther'], catch: ['stigma'] },
        solution: ['Working from the outside in: **sepals** protect the bud, **petals** attract insects.', 'The **anther** makes pollen and the **stigma** catches it.'],
        answer: 'sepal protects, petal attracts, anther makes pollen, stigma catches it',
      },
      {
        id: 'p4', type: 'inline',
        prompt: 'A student plants bean seeds. Complete the explanation of what the seeds need.',
        textParts: [
          'The seeds need ',
          ' so that they swell and their enzymes start to work, ',
          ' for respiration, and a suitable ',
          ' so that the enzymes work quickly.',
        ],
        blanks: {
          1: { correct: 'water', options: [{ val: 'water', text: 'water' }, { val: 'light', text: 'light' }, { val: 'mineral salts', text: 'mineral salts' }] },
          2: { correct: 'oxygen', options: [{ val: 'oxygen', text: 'oxygen' }, { val: 'carbon dioxide', text: 'carbon dioxide' }, { val: 'nitrogen', text: 'nitrogen' }] },
          3: { correct: 'temperature', options: [{ val: 'temperature', text: 'temperature' }, { val: 'light intensity', text: 'light intensity' }, { val: 'humidity', text: 'humidity' }] },
        },
        solution: ['The three conditions for germination: **water**, **oxygen**, **suitable temperature**.', 'Respiration needs oxygen (not carbon dioxide); light is not needed until the leaves are out.'],
        answer: 'water … oxygen … temperature',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'Banana plants on a plantation are all grown asexually from pieces of one original plant. A new fungus disease arrives. What is likely to happen, and why?',
        options: [
          { val: 'a', text: 'Most plants survive, because asexual reproduction makes them resistant' },
          { val: 'b', text: 'Every plant may be killed, because they are genetically identical and none is resistant' },
          { val: 'c', text: 'Half the plants survive, because half of their genes are different' },
          { val: 'd', text: 'Nothing happens, because a fungus cannot infect a plant grown asexually' },
        ],
        correct: 'b',
        solution: ['Asexual reproduction gives **genetically identical** plants — clones.', 'If one of them can be killed by the disease, they **all** can. With no genetic variation there are no resistant plants to survive.'],
        answer: 'Every plant may be killed — they are genetically identical',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'A farmer keeps wheat seeds in a dry, sealed store at 20 °C for a year. They do not germinate. Which condition for germination is missing?',
        options: [
          { val: 'a', text: 'Light' },
          { val: 'b', text: 'A suitable temperature' },
          { val: 'c', text: 'Carbon dioxide' },
          { val: 'd', text: 'Water' },
        ],
        correct: 'd',
        solution: ['Check the three conditions. 20 °C is a **suitable temperature**, and there is air, so there is **oxygen**.', 'The store is **dry** — there is no **water**, so the seeds stay dormant. That is exactly why seed is stored dry.'],
        answer: 'Water',
      },
      {
        id: 'c3', type: 'inline',
        prompt: 'A botanist finds a flower she has not seen before. It is small and green, with no scent. Complete her reasoning.',
        textParts: [
          'It is probably pollinated by ',
          '. So its anthers should hang ',
          ' the flower, its stigmas should be ',
          ', and its pollen should be small, smooth and ',
          '.',
        ],
        blanks: {
          1: { correct: 'the wind', options: [{ val: 'the wind', text: 'the wind' }, { val: 'insects', text: 'insects' }] },
          2: { correct: 'outside', options: [{ val: 'outside', text: 'outside' }, { val: 'inside', text: 'inside' }] },
          3: { correct: 'feathery', options: [{ val: 'feathery', text: 'feathery' }, { val: 'sticky', text: 'sticky' }, { val: 'brightly coloured', text: 'brightly coloured' }] },
          4: { correct: 'light', options: [{ val: 'light', text: 'light' }, { val: 'heavy', text: 'heavy' }, { val: 'spiky', text: 'spiky' }] },
        },
        solution: ['Small, green and scentless: nothing to attract an insect, so it must be **wind**-pollinated.', 'The rest follows: anthers **outside**, **feathery** stigmas to catch pollen, and **light** pollen the wind can carry.'],
        answer: 'the wind … outside … feathery … light',
      },
    ],
  },
];
