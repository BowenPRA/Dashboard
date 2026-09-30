// src/data/COORD_SCI/B11_1/data.js
// B11.01–B11.02 Reproduction in plants — asexual and sexual reproduction,
// flowers, pollination, fertilisation and germination. The second of the three
// units built round Wolsey Hall Assignment 10 ("Coordination, Response and
// Reproduction"); B10_1 has the coordination questions and B11_2 has human
// reproduction and HIV. English only — the track is not bilingual.
//
// Same shape as B10_1: a deck written to be copied into a notebook (a "Write
// This Down" card on nearly every slide, a "Draw This" corner on the diagrams),
// Label It asking for three of those diagrams back, and HW_REVIEW going over
// the assignment's own plant questions one at a time.
//
// Gates:
//   Gate 0 (Learn)  — Notes + Vocab
//   Gate 1 (Apply)  — Label It + Practice + Questions + Homework Review
//   Gate 2 (Quiz)   — the Quiz and the arcade, unlocked together
// 120 XP on offer (capped at 100). Gate 1 sits at 20 of 30 (67%) and Gate 2 at
// 70 of 100 (70%), inside the validator's 80% rule.
//
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { hwReview } from './hwReview.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const B11_1_DATA = {
  meta: {
    id: 'B11_1',
    title: 'Reproduction in Plants',
    desc: 'Asexual and sexual reproduction, the parts of a flower, insect and wind pollination, fertilisation down the pollen tube, and the three conditions a seed needs to germinate.',
    track: 'COORD_SCI',
    icon: 'Leaf',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 20,
      tasks: [
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 20 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 10 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'HW_REVIEW', dbKey: 'p60', maxXP: 20 },
      ],
    },
    {
      // The Quiz and the arcade share one gate. GAMES stays 0 XP — a reward the
      // unit unlocks, not a task paid for by it.
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 70,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words — the definitions are the ones the deck asks the student to copy.
  realWords: [
    {
      word: 'Asexual reproduction', isReal: true,
      def: 'A process resulting in the production of genetically identical offspring from one parent.',
      sent: 'Growing new potato plants from tubers is asexual reproduction.',
    },
    {
      word: 'Sexual reproduction', isReal: true,
      def: 'A process involving the fusion of the nuclei of two gametes to form a zygote, producing offspring that are genetically different from each other.',
      sent: 'Sexual reproduction produces genetic variation.',
    },
    {
      word: 'Gamete', isReal: true,
      def: 'A sex cell. Its nucleus is haploid, with one set of chromosomes.',
      sent: 'A pollen grain contains a male gamete.',
    },
    {
      word: 'Fertilisation', isReal: true,
      def: 'The fusion of the nuclei of two gametes. In a flower, a pollen nucleus fuses with a nucleus in an ovule.',
      sent: 'Fertilisation takes place inside the ovule.',
    },
    {
      word: 'Zygote', isReal: true,
      def: 'The cell formed when the nuclei of two gametes fuse. It is diploid.',
      sent: 'The zygote divides and grows into a new plant.',
    },
    {
      word: 'Haploid', isReal: true,
      def: 'Having one set of chromosomes. Gametes are haploid.',
      sent: 'The nucleus of a gamete is haploid.',
    },
    {
      word: 'Diploid', isReal: true,
      def: 'Having two sets of chromosomes. Body cells and zygotes are diploid.',
      sent: 'A zygote is a diploid cell.',
    },
    {
      word: 'Stamen', isReal: true,
      def: 'The male part of a flower, made of an anther and a filament.',
      sent: 'Each stamen has an anther at the top.',
    },
    {
      word: 'Anther', isReal: true,
      def: 'The part of a stamen that makes pollen grains.',
      sent: 'Pollen is made in the anther.',
    },
    {
      word: 'Carpel', isReal: true,
      def: 'The female part of a flower, made of a stigma, a style and an ovary.',
      sent: 'The carpel is in the centre of the flower.',
    },
    {
      word: 'Stigma', isReal: true,
      def: 'The part of a carpel that catches pollen grains.',
      sent: 'Pollen grains land on the stigma.',
    },
    {
      word: 'Ovule', isReal: true,
      def: 'A structure inside the ovary that contains a female gamete. After fertilisation it becomes a seed.',
      sent: 'Each ovule can become a seed.',
    },
    {
      word: 'Pollination', isReal: true,
      def: 'The transfer of pollen grains from an anther to a stigma.',
      sent: 'Bees carry out pollination when they visit flowers.',
    },
    {
      word: 'Pollen tube', isReal: true,
      def: 'A tube that grows from a pollen grain down through the style, carrying the male nucleus to an ovule.',
      sent: 'The pollen tube grows down the style to the ovary.',
    },
    {
      word: 'Germination', isReal: true,
      def: 'The start of growth of a seed. It needs water, oxygen and a suitable temperature.',
      sent: 'Seeds need water for germination.',
    },
  ],

  // Label It: the half-flower is the coursebook figure with its labels painted
  // off (`image`; pins printed by docs/coord-science/tools/build_a10_figures.py).
  // The wind-pollinated flower and the pollen tube are this unit's own drawings,
  // whose labels and leader lines are stripped at runtime.
  labelIt: [
    {
      id: 'flower',
      title: 'Label the insect-pollinated flower',
      image: 'images/COORD_SCI/B11_1/flower-blank.jpg', viewBox: '0 0 1019 557', font: 21,
      pins: [
        { id: 'p1', x: 158, y: 142, side: 'left', answer: 'stigma' },
        { id: 'p2', x: 158, y: 199, side: 'left', answer: 'style' },
        { id: 'p3', x: 158, y: 257, side: 'left', answer: 'ovary' },
        { id: 'p4', x: 158, y: 314, side: 'left', answer: 'ovule' },
        { id: 'p5', x: 852, y: 32, side: 'right', answer: 'petal' },
        { id: 'p6', x: 852, y: 205, side: 'right', answer: 'anther' },
        { id: 'p7', x: 852, y: 263, side: 'right', answer: 'filament' },
        { id: 'p8', x: 730, y: 460, side: 'right', answer: 'sepal' },
      ],
      bank: [
        { val: 'stigma', text: 'Stigma' },
        { val: 'style', text: 'Style' },
        { val: 'ovary', text: 'Ovary' },
        { val: 'ovule', text: 'Ovule' },
        { val: 'petal', text: 'Petal' },
        { val: 'anther', text: 'Anther' },
        { val: 'filament', text: 'Filament' },
        { val: 'sepal', text: 'Sepal' },
        { val: 'tube', text: 'Pollen tube' },
        { val: 'root', text: 'Root hair' },
      ],
    },
    {
      id: 'wind_flower',
      title: 'Label the wind-pollinated flower',
      inlineSvg: DIAGRAMS.WIND_FLOWER, viewBox: '0 0 640 420',
      pins: [
        { id: 'p1', x: 462, y: 56, to: [398, 78], side: 'right', answer: 'stigma' },
        { id: 'p2', x: 462, y: 250, to: [382, 258], side: 'right', answer: 'filament' },
        { id: 'p3', x: 462, y: 326, to: [436, 324], side: 'right', answer: 'anther' },
        { id: 'p4', x: 140, y: 190, to: [240, 190], side: 'left', answer: 'bract' },
        { id: 'p5', x: 140, y: 386, to: [290, 286], side: 'left', answer: 'ovary' },
      ],
      bank: [
        { val: 'stigma', text: 'Stigma' },
        { val: 'filament', text: 'Filament' },
        { val: 'anther', text: 'Anther' },
        { val: 'bract', text: 'Bract' },
        { val: 'ovary', text: 'Ovary' },
        { val: 'petal', text: 'Petal' },
        { val: 'nectary', text: 'Nectary' },
      ],
    },
    {
      id: 'pollen_tube',
      title: 'Label fertilisation in a flower',
      inlineSvg: DIAGRAMS.POLLEN_TUBE, viewBox: '0 0 640 420',
      pins: [
        { id: 'p1', x: 140, y: 66, to: [274, 66], side: 'left', answer: 'grain' },
        { id: 'p2', x: 140, y: 170, to: [280, 170], side: 'left', answer: 'style' },
        { id: 'p3', x: 140, y: 300, to: [222, 300], side: 'left', answer: 'ovary' },
        { id: 'p4', x: 460, y: 88, to: [340, 88], side: 'right', answer: 'stigma' },
        { id: 'p5', x: 460, y: 140, to: [298, 140], side: 'right', answer: 'tube' },
        { id: 'p6', x: 460, y: 200, to: [304, 200], side: 'right', answer: 'male' },
        { id: 'p7', x: 460, y: 318, to: [340, 322], side: 'right', answer: 'ovule' },
        { id: 'p8', x: 460, y: 372, to: [308, 352], side: 'right', answer: 'nucleus' },
      ],
      bank: [
        { val: 'grain', text: 'Pollen grain' },
        { val: 'style', text: 'Style' },
        { val: 'ovary', text: 'Ovary' },
        { val: 'stigma', text: 'Stigma' },
        { val: 'tube', text: 'Pollen tube' },
        { val: 'male', text: 'Male nucleus' },
        { val: 'ovule', text: 'Ovule' },
        { val: 'nucleus', text: 'Ovule nucleus' },
        { val: 'anther', text: 'Anther' },
        { val: 'petal', text: 'Petal' },
      ],
    },
  ],

  // Short Answers: the written questions this topic is examined with, each a
  // clean one-mark-per-line scheme (docs/question-quality.md). Plain text.
  shortQA: [
    {
      id: 'sq1',
      question: 'A bee visits an insect-pollinated flower and then flies to another flower of the same species. Describe how the bee pollinates the second flower.',
      suggestedWords: [['anther', 'pollen'], ['sticks', 'body'], ['stigma']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: in the first flower the bee brushes against the anthers.',
        '1 mark: pollen grains stick to the body of the bee.',
        '1 mark: in the second flower the pollen rubs off onto the (sticky) stigma.',
      ],
      modelAnswer: 'When the bee goes into the first flower to collect nectar, it brushes against the anthers and pollen grains stick to its body. When it visits the second flower, some of this pollen rubs off onto the sticky stigma. Pollen has been transferred from an anther to a stigma, so the flower has been pollinated.',
    },
    {
      id: 'sq2',
      question: 'Describe how the anthers, the stigmas and the pollen of a wind-pollinated flower are adapted for pollination by the wind.',
      suggestedWords: [['anthers', 'outside'], ['stigmas', 'feathery'], ['pollen', 'light'], ['large amounts']],
      scienceMaxMarks: 4,
      markScheme: [
        '1 mark: the anthers hang outside the flower (on long filaments), so the wind can blow the pollen away.',
        '1 mark: the stigmas are feathery / have a large surface area and hang outside the flower, to catch pollen.',
        '1 mark: the pollen grains are small, smooth and light, so they are carried easily by the wind.',
        '1 mark: very large amounts of pollen are made, because most of it does not reach a stigma.',
      ],
      modelAnswer: 'The anthers hang outside the flower on long filaments, so the wind can shake the pollen out and blow it away. The stigmas are feathery and also hang outside the flower, which gives a large surface area to catch pollen from the air. The pollen grains are small, smooth and light, so the wind can carry them a long way. The flower makes very large amounts of pollen, because most of it is wasted and never lands on a stigma.',
    },
    {
      id: 'sq3',
      question: 'A pollen grain lands on the stigma of a flower. Describe what happens next, up to the point where a seed is formed.',
      suggestedWords: [['pollen tube', 'style'], ['male nucleus', 'ovule'], ['fuses', 'fertilisation'], ['seed']],
      scienceMaxMarks: 4,
      markScheme: [
        '1 mark: a pollen tube grows from the pollen grain down through the style (to the ovary).',
        '1 mark: the male (pollen) nucleus travels down the pollen tube to an ovule.',
        '1 mark: the pollen nucleus fuses with the nucleus in the ovule — this is fertilisation.',
        '1 mark: the fertilised ovule develops into a seed (and the ovary into a fruit).',
      ],
      modelAnswer: 'The pollen grain grows a pollen tube, which grows down through the style and into the ovary until it reaches an ovule. The male nucleus travels down the pollen tube. It then fuses with the nucleus in the ovule, which is fertilisation. After this the ovule develops into a seed, and the ovary becomes a fruit.',
    },
    {
      id: 'sq4',
      question: 'State the three conditions that seeds need in order to germinate, and explain why each one is needed.',
      suggestedWords: [['water', 'enzymes'], ['oxygen', 'respiration'], ['temperature', 'enzymes']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: water — so the seed swells and its enzymes become active / food stores can be used.',
        '1 mark: oxygen — for (aerobic) respiration, which releases energy for growth.',
        '1 mark: a suitable temperature — so that the enzymes work at a good rate.',
      ],
      modelAnswer: 'Seeds need water, which makes the seed swell and lets its enzymes start to break down the stored food. They need oxygen for aerobic respiration, which releases the energy that the seed needs to grow. They also need a suitable temperature, so that their enzymes work quickly enough.',
    },
    {
      id: 'sq5',
      question: 'A new disease begins to spread through a field of wild plants. Explain why plants that were produced by sexual reproduction are more likely to survive as a population than plants produced by asexual reproduction.',
      suggestedWords: [['genetic variation'], ['resistant', 'survive'], ['identical', 'all']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: sexual reproduction produces genetic variation / offspring that are genetically different.',
        '1 mark: so some of the plants may be resistant to the disease and survive (and reproduce).',
        '1 mark: plants produced asexually are genetically identical, so if one can be killed by the disease they all can.',
      ],
      modelAnswer: 'Sexual reproduction produces offspring that are genetically different from each other, so there is genetic variation in the population. Some of the plants may happen to be resistant to the new disease, so they survive and reproduce. Plants produced by asexual reproduction are all genetically identical, so if the disease can kill one of them it can kill them all.',
    },
  ],

  notes: notes,
  workbook: workbook,
  hwReview: hwReview,
  assessment: assessment,
  games: games,
};
