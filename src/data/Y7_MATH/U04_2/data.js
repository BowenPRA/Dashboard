// src/data/Y7_MATH/U04_2/data.js
// 4.2 Adding and Subtracting Decimals — self-study unit, built to the number-
// engines unit shape (docs/y7-math/number-engines.md §1) with its own engine,
// Line Up the Points (docs/y7-math/decimal-engines.md §4.2). 125 XP available,
// capped at 100 by unitXPOf. Gates: 20 of 30 (67%) and 80 of 105 (76%), both
// under the 80% rule.
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false): from Maths Unit 4 the
// Year 7 lessons are taught in English and French, and so is this unit — a
// `…Fr` twin beside every English string, and no Vietnamese.
//
// The classroom taught 4.1–4.4 as ONE deck in one period (lessons/content/
// y7-math/U04_1_4); this unit takes its 4.2 slides (6–9, 18b, 19, 20 problem 1,
// 21) and builds the rest from the book's 4.2. U04_1, U04_3 and U04_4 carry
// the same `meta.classroom` entry.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U04_2_DATA = {
  meta: {
    id: 'U04_2',
    title: 'Adding and Subtracting Decimals',
    desc: 'Add and subtract decimals in columns — line up the points, fill the gaps with zeros, exchange when the top digit is too small, and bring the point straight down; check by adding; use a mental method when a number is nearly whole; and read "change" and "how much more" as a subtraction.',
    track: 'Y7_MATH',
    icon: 'Calculator',
    vietnamese: false,
    classroom: [{ course: 'y7-math', slug: 'U04_1_4', title: 'Maths 4.1–4.4 · Decimals' }],
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
        { id: 'DEC_COLUMN', dbKey: 'p77', maxXP: 25 },
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

  // Key words: the one the whole method hangs on (decimal point), the two the
  // column method is made of (line up, exchange), the book's two exam
  // instructions (mental method, written method) and the shop word that
  // means subtract (change). The example sentences use their own numbers, so
  // none gives away a deck, task or quiz item.
  realWords: [
    {
      word: 'Decimal point', fr: 'Point décimal',
      def: 'The dot between the whole-number part and the decimal part of a number. In English it is always a dot, not a comma.',
      frDef: 'Le point entre la partie entière et la partie décimale d’un nombre. En anglais, c’est toujours un point, pas une virgule.',
      sent: 'In 6.25 the decimal point comes straight after the 6.',
      frSent: 'Dans 6.25, le point décimal vient juste après le 6.',
      isReal: true,
    },
    {
      word: 'Line up', fr: 'Aligner',
      def: 'To put things in a straight line, one under the other. In a column sum, the decimal points are lined up in one column.',
      frDef: 'Mettre des choses en ligne droite, l’une sous l’autre. Dans un calcul en colonnes, on aligne les points décimaux dans une même colonne.',
      sent: 'Line up the points before you add 4.5 and 2.36.',
      frSent: 'Aligne les points avant d’additionner 4.5 et 2.36.',
      isReal: true,
    },
    {
      word: 'Exchange', fr: 'Échanger',
      def: 'To swap one of a bigger place for ten of the next smaller place. You exchange when a top digit is too small to take the bottom digit from.',
      frDef: 'Remplacer une unité d’un rang par dix unités du rang plus petit suivant. On échange quand un chiffre du haut est trop petit pour lui enlever le chiffre du bas.',
      sent: 'To work out 3.1 − 0.4, exchange 1 one for 10 tenths.',
      frSent: 'Pour calculer 3.1 − 0.4, échange 1 unité contre 10 dixièmes.',
      isReal: true,
    },
    {
      word: 'Mental method', fr: 'Calcul mental',
      def: 'A way of working out a calculation in your head, without writing it in columns.',
      frDef: 'Une façon de faire un calcul dans sa tête, sans le poser en colonnes.',
      sent: 'With a mental method, 5.9 + 2.5 is 6 + 2.5, take away 0.1, which is 8.4.',
      frSent: 'Avec le calcul mental, 5.9 + 2.5, c’est 6 + 2.5, moins 0.1, ce qui fait 8.4.',
      isReal: true,
    },
    {
      word: 'Written method', fr: 'Méthode écrite',
      def: 'A way of working out a calculation on paper, set out in columns.',
      frDef: 'Une façon de faire un calcul sur papier, posé en colonnes.',
      sent: 'The question says "use a written method", so set it out in columns.',
      frSent: 'La question dit « use a written method », donc pose le calcul en colonnes.',
      isReal: true,
    },
    {
      word: 'Change', fr: 'La monnaie',
      def: 'The money you get back when you pay more than something costs. To find it, subtract the cost from what you paid.',
      frDef: 'L’argent qu’on te rend quand tu paies plus que le prix. Pour la trouver, on enlève le prix de ce qu’on a payé.',
      sent: 'The book costs 8.50 dollars and I pay with 10 dollars, so my change is 1.50 dollars.',
      frSent: 'Le livre coûte 8.50 dollars et je paie avec 10 dollars, donc ma monnaie est de 1.50 dollar.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; French in `frTranslation`. They are the deck's four
  // arguments — the forgotten exchange, lining up the points, the mental
  // method, and the English that picks the operation — in the student's own
  // words, with new numbers.
  shortQA: [
    {
      id: 'sq1',
      question: 'Linh works out 3 − 1.46 and gets 1.64. Explain her mistake and give the correct answer.',
      frTranslation: 'Linh calcule 3 − 1.46 et trouve 1.64. Explique son erreur et donne la bonne réponse.',
      suggestedWords: [['exchange', 'borrow'], ['tenths', 'hundredths'], ['3.00', 'zeros']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for writing 3 as 3.00, so the empty places are filled with zeros and the hundredths can be worked.',
        '1 mark for the exchange: 0 − 6 cannot be done, so the ones give 1, the tenths get 10 and give 1 to the hundredths, which leaves 9 tenths, not 10. Linh forgot that the tenths gave 1 away (she did 10 − 4 = 6).',
        '1 mark for the correct answer 1.54 (9 − 4 = 5 in the tenths), or for checking by adding: 1.54 + 1.46 = 3, but 1.64 + 1.46 = 3.10.',
      ],
      modelAnswer: 'First write 3 as 3.00. In the hundredths, 0 − 6 cannot be done, so the ones exchange: 3 ones become 2, the tenths get 10, and then the tenths give 1 to the hundredths. So the tenths have 9, not 10. Linh did 10 − 4 = 6 in the tenths, but it should be 9 − 4 = 5. The correct answer is 1.54. I can check by adding: 1.54 + 1.46 = 3.',
    },
    {
      id: 'sq2',
      question: 'Minh adds 23.5 and 4.27. He lines up the last digits, so the 5 is above the 7, and he gets 6.62. Explain what he did wrong and work out the correct answer.',
      frTranslation: 'Minh additionne 23.5 et 4.27. Il aligne les derniers chiffres, donc le 5 est au-dessus du 7, et il trouve 6.62. Explique ce qu’il a fait de faux et calcule la bonne réponse.',
      suggestedWords: [['decimal point', 'point'], ['line up', 'column'], ['estimate', 'about']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying the decimal points must be lined up (digits with the same place value in one column), not the last digits — the 5 is tenths but the 7 is hundredths.',
        '1 mark for writing 23.5 as 23.50 under or above 4.27 with the points in one column, and adding to get 27.77.',
        '1 mark for a check that shows 6.62 cannot be right, such as the estimate 23 + 4 = 27.',
      ],
      modelAnswer: 'Minh lined up the last digits instead of the decimal points. The 5 in 23.5 is 5 tenths, but the 7 in 4.27 is 7 hundredths, so they are not in the same column. He should write 23.5 as 23.50 and put the points in one column. Then 23.50 + 4.27 = 27.77. An estimate shows his answer is wrong: 23 + 4 = 27, and 6.62 is nowhere near 27.',
    },
    {
      id: 'sq3',
      question: 'Explain how to work out 9.3 − 4.9 using a mental method.',
      frTranslation: 'Explique comment calculer 9.3 − 4.9 avec le calcul mental.',
      suggestedWords: [['nearly', 'close to'], ['subtract', 'take away'], ['give back', 'add back']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for using a nearby whole number: 4.9 is nearly 5 (0.1 less than 5).',
        '1 mark for subtracting it: 9.3 − 5 = 4.3.',
        '1 mark for putting it right: taking 5 took away 0.1 too much, so add 0.1 back: 4.4.',
      ],
      modelAnswer: '4.9 is nearly 5, so I take away 5 instead: 9.3 − 5 = 4.3. But 5 is 0.1 more than 4.9, so I took away 0.1 too much. I give the 0.1 back: 4.3 + 0.1 = 4.4. So 9.3 − 4.9 = 4.4.',
    },
    {
      id: 'sq4',
      question: 'Lan’s bag has a mass of 4.6 kg. Huy’s bag has a mass of 3.85 kg. The question asks: How much heavier is Lan’s bag? Explain which operation you use and why, then work it out.',
      frTranslation: 'Le sac de Lan a une masse de 4.6 kg. Le sac de Huy a une masse de 3.85 kg. La question demande : How much heavier is Lan’s bag? Explique quelle opération tu utilises et pourquoi, puis calcule.',
      suggestedWords: [['subtract', 'subtraction'], ['difference', 'how much more'], ['4.60', 'line up']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for choosing subtraction, because "how much heavier" asks for the difference between the two masses.',
        '1 mark for taking the smaller mass from the bigger one, with the points lined up and 4.6 written as 4.60.',
        '1 mark for the answer 0.75 kg (with the unit).',
      ],
      modelAnswer: '"How much heavier" means how much more, which is the difference between the two masses, so I subtract. I take the smaller mass from the bigger one. I write 4.6 as 4.60 and line up the points: 4.60 − 3.85 = 0.75. Lan’s bag is 0.75 kg heavier.',
    },
  ],

  // Line Up the Points (DEC_COLUMN): the item states only the calculation (or
  // the story's steps, '@' = the step before's answer); utils/decColumn.js
  // derives the slide, the zeros, every carry and exchange, and the slip behind
  // a wrong answer. A story first asks which calculation. Numbers are fresh —
  // not the deck's (1 − 0.72, 23.4 + 6.78, 15 − 3.46, 20 − 8.35, 16.04 − 9.58 …),
  // the workbook's, the quiz's or the book's. Answers, for the reviewer:
  //   L1  34.6 + 5.28 = 39.88 · 8.75 + 12.6 = 21.35 · 5.4 + 0.86 = 6.26
  //   L2  9.5 − 3.27 = 6.23 · 14.3 − 6.85 = 7.45
  //   L3  7 − 3.64 = 3.36 · 4.37 + 9 = 13.37 · 30 − 12.7 = 17.3
  //   L4  4.2 − 1.875 = 2.325 · 10.05 − 4.8 = 5.25
  //   L5  50 − 23.65 = 26.35 · 3.2 − 1.45 = 1.75 · 1.65 + 2.8 = 4.45
  //   L6  2.35 + 1.8 = 4.15, 10 − 4.15 = 5.85 · 0.45 + 0.7 = 1.15, 1.5 − 1.15 = 0.35
  //       · 14.6 + 3.75 = 18.35, 20 − 18.35 = 1.65
  decColumn: {
    title: 'Line Up the Points',
    titleFr: 'Aligne les points',
    intro: 'The bottom number is written the way a hurried student writes it. Line up the points, fill the gaps with zeros, then work from the right.',
    introFr: 'Le nombre du bas est écrit comme le ferait un élève pressé. Aligne les points, complète les vides avec des zéros, puis calcule à partir de la droite.',
    levels: {
      1: { en: 'Line up the points', fr: 'Aligne les points' },
      2: { en: 'Fill the gaps with zeros', fr: 'Complète avec des zéros' },
      3: { en: 'A whole number has a point', fr: 'Un entier a un point' },
      4: { en: 'Exchange across zeros', fr: 'Échanges en cascade' },
      5: { en: 'Money and measures', fr: 'Argent et mesures' },
      6: { en: 'Two steps', fr: 'Deux étapes' },
    },
    items: [
      { id: 'e1', level: 1, a: '34.6', op: '+', b: '5.28' },
      { id: 'e2', level: 1, a: '8.75', op: '+', b: '12.6' },
      { id: 'e3', level: 1, a: '5.4', op: '+', b: '0.86' },
      { id: 'e4', level: 2, a: '9.5', op: '−', b: '3.27' },
      { id: 'e5', level: 2, a: '14.3', op: '−', b: '6.85' },
      { id: 'e6', level: 3, a: '7', op: '−', b: '3.64' },
      { id: 'e7', level: 3, a: '4.37', op: '+', b: '9' },
      { id: 'e8', level: 3, a: '30', op: '−', b: '12.7' },
      { id: 'e9', level: 4, a: '4.2', op: '−', b: '1.875' },
      { id: 'e10', level: 4, a: '10.05', op: '−', b: '4.8' },
      {
        id: 'e11', level: 5, a: '50', op: '−', b: '23.65', unit: 'dollars',
        context: 'Mr Bowen buys a jacket for 23.65 dollars. He pays with a 50-dollar note. How much change does he get?',
        contextFr: 'M. Bowen achète une veste à 23.65 dollars. Il paie avec un billet de 50 dollars. Combien de monnaie reçoit-il ?',
      },
      {
        id: 'e12', level: 5, a: '3.2', op: '−', b: '1.45', unit: 'kg',
        context: 'A watermelon has a mass of 3.2 kg. A pineapple has a mass of 1.45 kg. How much heavier is the watermelon?',
        contextFr: 'Une pastèque a une masse de 3.2 kg. Un ananas a une masse de 1.45 kg. De combien la pastèque est-elle plus lourde ?',
      },
      {
        id: 'e13', level: 5, a: '1.65', op: '+', b: '2.8', unit: 'm',
        context: 'Two planks are 1.65 m and 2.8 m long. They are laid end to end. What is their total length?',
        contextFr: 'Deux planches mesurent 1.65 m et 2.8 m. On les pose bout à bout. Quelle est leur longueur totale ?',
      },
      {
        id: 'e14', level: 6, unit: 'dollars',
        steps: [
          { a: '2.35', op: '+', b: '1.8', say: 'the cost of both', sayFr: 'le prix des deux' },
          { a: '10', op: '−', b: '@', say: 'the change', sayFr: 'la monnaie' },
        ],
        context: 'Lan buys a notebook for 2.35 dollars and a pen for 1.8 dollars. She pays with a 10-dollar note. How much change does she get?',
        contextFr: 'Lan achète un cahier à 2.35 dollars et un stylo à 1.8 dollar. Elle paie avec un billet de 10 dollars. Combien de monnaie reçoit-elle ?',
      },
      {
        id: 'e15', level: 6, unit: 'litres',
        steps: [
          { a: '0.45', op: '+', b: '0.7', say: 'the water she drinks', sayFr: 'l’eau qu’elle boit' },
          { a: '1.5', op: '−', b: '@', say: 'the water left', sayFr: 'l’eau qui reste' },
        ],
        context: 'A bottle holds 1.5 litres of water. Mai drinks 0.45 litres in the morning and 0.7 litres in the afternoon. How much water is left?',
        contextFr: 'Une bouteille contient 1.5 litre d’eau. Mai boit 0.45 litre le matin et 0.7 litre l’après-midi. Combien d’eau reste-t-il ?',
      },
      {
        id: 'e16', level: 6, unit: 'kg',
        steps: [
          { a: '14.6', op: '+', b: '3.75', say: 'the mass with the bag', sayFr: 'la masse avec le sac' },
          { a: '20', op: '−', b: '@', say: 'how much more she can add', sayFr: 'ce qu’elle peut encore ajouter' },
        ],
        context: 'Hoa’s suitcase has a mass of 14.6 kg. The limit is 20 kg. She puts in a bag of 3.75 kg. How much more can she add?',
        contextFr: 'La valise de Hoa a une masse de 14.6 kg. La limite est de 20 kg. Elle ajoute un sac de 3.75 kg. Combien peut-elle encore ajouter ?',
      },
    ],
  },

  // Quick Fire (QUICK_FIRE): mental + and −, dealt fresh every attempt —
  // decNear (8.4 − 2.9: take 3, give 0.1 back; 6.9 + 4.6) and decChange
  // (10 − 3.65, 1 − 0.72: a whole number minus a decimal).
  quickFire: { title: 'Quick Fire', titleFr: 'Questions éclair', modes: ['decNear', 'decChange'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
