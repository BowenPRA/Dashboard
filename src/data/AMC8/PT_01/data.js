// src/data/AMC8/PT_01/data.js
// PT_01 — Practice Test 1. The first unit of the AMC 8 Prep track: one full
// contest paper (the problems of the 2024 AMC 8), sat under contest
// conditions and then reviewed. English only: the track is not bilingual, so
// there are no `vn*` twins.
//
// THE EXEMPLAR for an AMC8 unit (docs/amc8-course.md):
//   Step 1 (Toolkit)        — the notes deck, 14 slides                  20 XP
//   Step 2 (Practice Test)  — the timed paper, 25 questions, 40 minutes  60 XP
//   Step 3 (Review)         — opens when the paper is handed in          20 XP
//
// No XP gates: the deck comes first on the card, but the test is open from
// the start. Only the Review waits, for the paper to be handed in.
//
// The vocabulary (realWords), the warm-up (workbook.js) and Factor Blitz are
// written and kept in this unit's data, with their audio generated, but they
// are not declared in `phases`, so nothing draws them. To bring one back, add
// it to Step 1 and re-balance the XP (the unit must offer at least 100).
//
// There is no Quiz: the Practice Test is the assessment. An AMC8 unit
// finishes at 60 XP (the track's `completeMinXP`; taskRegistry.isUnitComplete):
// the toolkit and the review done plus 9/25 or better on the paper.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { factorBlitz } from './factorBlitz.js';
import { amcTest } from './test.js';

export const PT_01_DATA = {
  meta: {
    id: 'PT_01',
    title: 'Practice Test 1',
    desc: 'A full AMC 8 paper: read the toolkit, sit 25 questions in 40 minutes, then review every problem with its solution.',
    track: 'AMC8',
    icon: 'Award',
  },

  phases: [
    {
      id: 'concept',
      title: 'Step 1: Toolkit',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
      ],
    },
    {
      id: 'practice',
      title: 'Step 2: Practice Test',
      threshold: 0,
      tasks: [
        { id: 'AMC_TEST', dbKey: 'p53', maxXP: 60 },
      ],
    },
    {
      // Held shut until the paper is HANDED IN (`requires`, read through the
      // test's `isSat`): a solution seen before the test is a test wasted.
      id: 'mastery',
      title: 'Step 3: Review',
      threshold: 0,
      requires: 'AMC_TEST',
      tasks: [
        { id: 'AMC_REVIEW', dbKey: 'p54', maxXP: 20 },
      ],
    },
  ],

  // The contest's own words. English only (word + def + sentence), written to
  // be read aloud — no symbols.
  realWords: [
    {
      word: 'Integer', isReal: true,
      def: 'A whole number. It can be positive, negative or zero.',
      sent: 'Round your answer to the nearest integer.',
    },
    {
      word: 'Ones digit', isReal: true,
      def: 'The last digit of a whole number, on the right.',
      sent: 'The ones digit of three hundred forty-seven is seven.',
    },
    {
      word: 'Sum', isReal: true,
      def: 'The answer when you add numbers.',
      sent: 'The sum of the two dice is nine.',
    },
    {
      word: 'Product', isReal: true,
      def: 'The answer when you multiply numbers.',
      sent: 'The product of four and six is twenty-four.',
    },
    {
      word: 'Multiple', isReal: true,
      def: 'A number you get by multiplying a given number by a whole number.',
      sent: 'Thirty-five is a multiple of seven.',
    },
    {
      word: 'Divisible', isReal: true,
      def: 'Able to be divided by a number with no remainder.',
      sent: 'Forty-two is divisible by three.',
    },
    {
      word: 'Square number', isReal: true,
      def: 'A number made by multiplying a whole number by itself.',
      sent: 'Thirty-six is a square number because it is six times six.',
    },
    {
      word: 'Distinct', isReal: true,
      def: 'All different from each other. No two are the same.',
      sent: 'The letters stand for distinct digits.',
    },
    {
      word: 'Ratio', isReal: true,
      def: 'A comparison of two amounts that shows how many times one is of the other.',
      sent: 'The ratio of green frogs to yellow frogs is three to one.',
    },
    {
      word: 'Least possible', isReal: true,
      def: 'The smallest value that can happen and still fit every rule in the question.',
      sent: 'Find the least possible number of red tiles.',
    },
    {
      word: 'Adjacent', isReal: true,
      def: 'Next to each other, with nothing in between.',
      sent: 'The two friends sat in adjacent seats.',
    },
    {
      word: 'Vertex', isReal: true,
      def: 'A corner point of a shape. The plural is vertices.',
      sent: 'A cube has eight vertices.',
    },
    {
      word: 'Equilateral', isReal: true,
      def: 'Having all sides the same length.',
      sent: 'Every angle of an equilateral triangle is sixty degrees.',
    },
    {
      word: 'Isosceles', isReal: true,
      def: 'Having two sides the same length.',
      sent: 'An isosceles triangle has two equal angles.',
    },
    {
      word: 'Concentric', isReal: true,
      def: 'Having the same center. Concentric circles sit one inside another.',
      sent: 'A target is made of concentric circles.',
    },
    {
      word: 'Diameter', isReal: true,
      def: 'The distance across a circle through its center. It is twice the radius.',
      sent: 'The diameter of the roll is four inches.',
    },
    {
      word: 'Probability', isReal: true,
      def: 'How likely something is, written as a number from zero to one.',
      sent: 'The probability of rolling a six is one sixth.',
    },
  ],

  notes: notes,
  workbook: workbook,
  factorBlitz: factorBlitz,
  amcTest: amcTest,
};
