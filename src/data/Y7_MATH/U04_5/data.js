// src/data/Y7_MATH/U04_5/data.js
// 4.5 Making decimal calculations easier — self-study unit, built to the
// number-engines unit shape (docs/y7-math/number-engines.md §1) with its own
// engine, Make It Easy (docs/y7-math/decimal-engines.md §4.5). 125 XP
// available, capped at 100 by unitXPOf. Gates: 20 of 30 (67%) and 80 of 105
// (76%), both under the 80% rule.
//
// English and French only (meta.vietnamese: false), like the classroom deck
// (lessons/content/y7-math/U04_5). Every learner-facing string has a `…Fr` /
// `fr…` twin and no Vietnamese one.
//
// One idea runs through the unit: same answer, less work. × 0.2 is ÷ 10 then
// × 2; × 0.5 is half of; × 0.25 is a quarter of; × 9 and × 11 come from × 10;
// 4.3 × 6 is 4 × 6 + 0.3 × 6 — and × a decimal less than 1 makes a number
// smaller. The deck, Make It Easy, Quick Fire and the workbook all practise
// CHOOSING the easy way before doing it.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U04_5_DATA = {
  meta: {
    id: 'U04_5',
    title: 'Making Decimal Calculations Easier',
    desc: 'Write a decimal as an equivalent fraction; multiply by a decimal by dividing by 10 or 100 first, and see that × a decimal less than 1 makes a number smaller; use half of, a quarter of and a tenth of; work out × 9 and × 11 from × 10; and partition a decimal — choosing the easy way every time.',
    track: 'Y7_MATH',
    icon: 'Zap',
    vietnamese: false,
    classroom: [{ course: 'y7-math', slug: 'U04_5', title: 'Maths 4.5 · Making Calculations Easier' }],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 20,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'MAKE_EASY', dbKey: 'p79', maxXP: 25 },
        { id: 'QUICK_FIRE', dbKey: 'p58', maxXP: 10 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words: the section's two (equivalent fraction, partitioning), the word
  // inside the first (equivalent), and the three phrases the questions are
  // written in — half of, a quarter of, lots of. The example sentences use
  // their own numbers, so none gives away a deck, task or quiz item.
  realWords: [
    {
      word: 'Equivalent', fr: 'Équivalent',
      def: 'Equal in value, but written in a different way.',
      frDef: 'De même valeur, mais écrit d’une autre façon.',
      sent: '0.4 and four tenths are equivalent.',
      frSent: '0.4 et quatre dixièmes sont équivalents.',
      isReal: true,
    },
    {
      word: 'Equivalent fraction', fr: 'Fraction équivalente',
      def: 'A fraction with the same value as a decimal or another fraction.',
      frDef: 'Une fraction de même valeur qu’un décimal ou qu’une autre fraction.',
      sent: 'The equivalent fraction of 0.01 is one hundredth.',
      frSent: 'La fraction équivalente de 0.01 est un centième.',
      isReal: true,
    },
    {
      word: 'Partitioning', fr: 'Décomposer',
      def: 'Splitting a number into parts that are easy to work with.',
      frDef: 'Couper un nombre en parties faciles à calculer.',
      sent: 'Partitioning 9.1 gives 9 and 0.1.',
      frSent: 'En décomposant 9.1, on obtient 9 et 0.1.',
      isReal: true,
    },
    {
      word: 'Half of', fr: 'La moitié de',
      def: 'One of two equal parts. In maths, half of means × 0.5, which is the same as ÷ 2.',
      frDef: 'Une de deux parts égales. En maths, half of (la moitié de) veut dire × 0.5, c’est-à-dire ÷ 2.',
      sent: 'Half of 18 is 9.',
      frSent: 'La moitié de 18, c’est 9.',
      isReal: true,
    },
    {
      word: 'A quarter of', fr: 'Le quart de',
      def: 'One of four equal parts. In maths, a quarter of means × 0.25, which is the same as ÷ 4.',
      frDef: 'Une de quatre parts égales. En maths, a quarter of (le quart de) veut dire × 0.25, c’est-à-dire ÷ 4.',
      sent: 'A quarter of 100 is 25.',
      frSent: 'Le quart de 100, c’est 25.',
      isReal: true,
    },
    {
      word: 'Lots of', fr: 'Fois',
      def: 'Groups of the same number. Nine lots of 5 means 9 × 5.',
      frDef: 'Des groupes du même nombre. Nine lots of 5 (neuf fois 5) veut dire 9 × 5.',
      sent: 'Ten lots of 1.2 make 12.',
      frSent: 'Dix fois 1.2, cela fait 12.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; French in `frTranslation`. They are the deck's four arguments —
  // smaller not bigger, one lot fewer, multiply each part, "of" means × —
  // asked for in the student's own words, on numbers of their own.
  shortQA: [
    {
      id: 'sq1',
      question: 'Kim says that 150 × 0.4 must be bigger than 150, because multiplying always makes a number bigger. Explain why Kim is wrong, and work out 150 × 0.4.',
      frTranslation: 'Kim dit que 150 × 0.4 doit être plus grand que 150, parce que multiplier rend toujours un nombre plus grand. Explique pourquoi Kim a tort, et calcule 150 × 0.4.',
      suggestedWords: [['less than 1', 'smaller'], ['tenths', 'tenth'], ['divide', 'divided']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the reason: 0.4 is less than 1, so × 0.4 takes only part of 150 (4 tenths of it), and the answer is smaller than 150.',
        '1 mark for the easy way: 0.4 is 4 tenths, so divide by 10 first (150 ÷ 10 = 15), then multiply by 4.',
        '1 mark for the answer: 15 × 4 = 60.',
      ],
      modelAnswer: 'Kim is wrong because 0.4 is less than 1. Multiplying by 0.4 means taking 4 tenths of 150, which is only part of it, so the answer must be smaller than 150. 0.4 is 4 tenths, so I divide by 10 first: 150 ÷ 10 = 15. Then I multiply by 4: 15 × 4 = 60. So 150 × 0.4 = 60, which is smaller than 150.',
    },
    {
      id: 'sq2',
      question: 'Explain why 7.2 × 9 gives the same answer as 72 − 7.2. Then work out the answer.',
      frTranslation: 'Explique pourquoi 7.2 × 9 donne la même réponse que 72 − 7.2. Puis calcule la réponse.',
      suggestedWords: [['ten lots', '× 10'], ['one lot', 'lot'], ['take away', 'subtract']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for ten lots: 72 is 7.2 × 10, ten lots of 7.2.',
        '1 mark for one lot fewer: 9 lots is one lot fewer than 10 lots, so take away one lot of 7.2 (not 1, and not just 7).',
        '1 mark for the answer: 72 − 7.2 = 64.8.',
      ],
      modelAnswer: '72 is 7.2 × 10, which is ten lots of 7.2. Nine lots is one lot fewer than ten lots, so I take away one lot of 7.2 — the whole 7.2, not 1 and not just 7. That is why 7.2 × 9 = 72 − 7.2. The answer is 72 − 7.2 = 64.8.',
    },
    {
      id: 'sq3',
      question: 'Nam works out 6.7 × 3 by partitioning. He writes 18 + 0.21 = 18.21. Explain his mistake and give the correct answer.',
      frTranslation: 'Nam calcule 6.7 × 3 en décomposant. Il écrit 18 + 0.21 = 18.21. Explique son erreur et donne la bonne réponse.',
      suggestedWords: [['partition', 'partitioning'], ['tenths', 'decimal point'], ['add', 'parts']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the method he got right: 6.7 = 6 + 0.7, and 6 × 3 = 18.',
        '1 mark for naming the mistake: 0.7 × 3 is 21 tenths, which is 2.1, not 0.21 (he put the point in the wrong place).',
        '1 mark for the correct answer: 18 + 2.1 = 20.1.',
      ],
      modelAnswer: 'Nam partitioned 6.7 into 6 + 0.7 correctly, and 6 × 3 = 18 is right. His mistake is 0.7 × 3. 0.7 is 7 tenths, and 7 tenths × 3 is 21 tenths, which is 2.1, not 0.21. He put the decimal point in the wrong place. The correct answer is 18 + 2.1 = 20.1.',
    },
    {
      id: 'sq4',
      question: 'A question says: "Find 0.3 of 240." Explain what the word "of" means here, show an easy way to work it out, and give the answer.',
      frTranslation: 'Une question dit : « Find 0.3 of 240. » Explique ce que le mot « of » veut dire ici, montre un moyen facile de le calculer, et donne la réponse.',
      suggestedWords: [['of', 'multiply'], ['tenths', 'divide by 10'], ['easy', 'quick']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the meaning: "of" means multiply, so 0.3 of 240 is 240 × 0.3.',
        '1 mark for the easy way: 0.3 is 3 tenths, so divide by 10 first (240 ÷ 10 = 24), then multiply by 3.',
        '1 mark for the answer: 24 × 3 = 72.',
      ],
      modelAnswer: 'In maths, "of" means multiply, so 0.3 of 240 means 240 × 0.3. 0.3 is 3 tenths, so the easy way is to divide by 10 first and then multiply by 3. 240 ÷ 10 = 24, and 24 × 3 = 72. So 0.3 of 240 is 72, which is smaller than 240 because 0.3 is less than 1.',
    },
  ],

  // Make It Easy (MAKE_EASY): the item states only the calculation;
  // utils/makeEasy.js derives the routes offered, the steps, the answer and the
  // slip behind a wrong one. Numbers are fresh — not the deck's (250 × 0.2,
  // 800 × 0.07, 3.8 × 9, 4.3 × 6, 12 × 0.9 …), not the workbook's, not the
  // quiz's and not the book's exercise. Answers, for the reviewer:
  //   L1  340 × 0.2 = 68 · 90 × 0.6 = 54 · 470 × 0.3 = 141
  //   L2  700 × 0.03 = 21 · 2300 × 0.04 = 92
  //   L3  half of 58 = 29 · 52 × 0.25 = 13 · a tenth of 64 = 6.4 · a quarter of 140 = 35
  //   L4  5.6 × 9 = 50.4 · 2.3 × 11 = 25.3 · 7.4 × 9 = 66.6
  //   L5  6.3 × 4 = 25.2 · 8.2 × 7 = 57.4 · 3.9 × 6 = 23.4 (partition, or nearly 4)
  //   L6  15 × 0.9 = 13.5 (÷ 10 × 9, or 15 − 1.5) · 0.4 of 650 ml = 260 ml ·
  //       11 tickets at 4.15 dollars = 45.65 dollars
  makeEasy: {
    title: 'Make It Easy',
    titleFr: 'Rends-le facile',
    intro: 'Choose the easy way first, then work it out one step at a time. Every easy way gives the same answer — with less work.',
    introFr: 'Choisis d’abord le moyen facile, puis calcule une étape à la fois. Chaque moyen facile donne la même réponse — avec moins de travail.',
    levels: {
      1: { en: 'Tenths: ÷ 10 first', fr: 'Dixièmes : ÷ 10 d’abord' },
      2: { en: 'Hundredths: ÷ 100 first', fr: 'Centièmes : ÷ 100 d’abord' },
      3: { en: 'Half of, a quarter of, a tenth of', fr: 'La moitié, le quart, le dixième' },
      4: { en: '× 9 and × 11 from × 10', fr: '× 9 et × 11 à partir de × 10' },
      5: { en: 'Partition it', fr: 'Décompose' },
      6: { en: 'Pick the quick way', fr: 'Choisis le moyen rapide' },
    },
    items: [
      { id: 'e1', level: 1, a: '340', b: '0.2' },
      { id: 'e2', level: 1, a: '90', b: '0.6' },
      { id: 'e3', level: 1, a: '470', b: '0.3' },
      { id: 'e4', level: 2, a: '700', b: '0.03' },
      { id: 'e5', level: 2, a: '2300', b: '0.04' },
      { id: 'e6', level: 3, kind: 'of', a: '58', b: '0.5' },
      { id: 'e7', level: 3, a: '52', b: '0.25' },
      { id: 'e8', level: 3, kind: 'of', a: '64', b: '0.1' },
      { id: 'e9', level: 3, kind: 'of', a: '140', b: '0.25' },
      { id: 'e10', level: 4, a: '5.6', b: '9' },
      { id: 'e11', level: 4, a: '2.3', b: '11' },
      { id: 'e12', level: 4, a: '7.4', b: '9' },
      { id: 'e13', level: 5, a: '6.3', b: '4' },
      { id: 'e14', level: 5, a: '8.2', b: '7' },
      { id: 'e15', level: 5, a: '3.9', b: '6' },
      { id: 'e16', level: 6, a: '15', b: '0.9' },
      {
        id: 'e17', level: 6, a: '650', b: '0.4', cue: 'of',
        context: 'A bottle holds 650 ml of water. Mr Bowen drinks 0.4 of it. How many millilitres does he drink?',
        contextFr: 'Une bouteille contient 650 ml d’eau. M. Bowen boit 0.4 de la bouteille. Combien de millilitres boit-il ?',
      },
      {
        id: 'e18', level: 6, a: '4.15', b: '11', cue: 'each',
        context: 'Mr Bowen buys 11 bus tickets. Each one costs 4.15 dollars. How much does he pay?',
        contextFr: 'M. Bowen achète 11 tickets de bus. Chacun coûte 4.15 dollars. Combien paie-t-il ?',
      },
    ],
  },

  // Quick Fire (QUICK_FIRE): the classroom's Make It Easy game, dealt fresh every
  // attempt — "which is the easy way?" (two buttons) and "make it easy, then
  // type the answer", across every family of the unit.
  quickFire: { title: 'Quick Fire', titleFr: 'Questions éclair', modes: ['easyway', 'makeeasy'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
