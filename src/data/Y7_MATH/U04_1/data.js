// src/data/Y7_MATH/U04_1/data.js
// 4.1 Ordering decimals — self-study unit, built to the number-engines unit
// shape (docs/y7-math/number-engines.md §1). 125 XP available, capped at 100
// by unitXPOf. Gates: 20 of 30 (67%) and 80 of 105 (76%), both under the 80% rule.
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false): from Maths Unit 4 the
// classroom decks drop Vietnamese, and so does this unit. Every English string
// has a …Fr twin and none has a …Vn one; screens toggle EN → FR.
//
// The classroom taught 4.1–4.4 in ONE period (lessons/content/y7-math/U04_1_4),
// so 4.1 had five slides there: the starter, the 3.25-or-3.3 vote, "say it in
// English", the COMPARE rule and the Berlin 2009 100 m final (plus 18a, 4.09 <
// 4.1). The rest is built from Cambridge Lower Secondary Mathematics 7 (2nd
// ed.) section 4.1 — < and >, in order of size from the smallest or the
// largest, measures and money, positions, mixed units and a missing digit —
// with new numbers throughout: the Workbook (pp. 51–53) stays unspent.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U04_1_DATA = {
  meta: {
    id: 'U04_1',
    title: 'Ordering Decimals',
    desc: 'Say a decimal the English way; compare decimals — whole-number part first, then fill with zeros; use < and >; and put a list in order of size, even when the question says fastest, cheapest or heaviest.',
    track: 'Y7_MATH',
    icon: 'TrendingUp',
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
        { id: 'DEC_ORDER', dbKey: 'p76', maxXP: 25 },
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

  // Key words: the section's verb (compare), the two parts every comparison
  // starts from, the two signs said in words, and the book's instruction. The
  // example sentences use their own numbers, so none gives away a deck item.
  realWords: [
    {
      word: 'Compare', fr: 'Comparer',
      def: 'To look at two numbers and decide which is bigger, or whether they are equal.',
      frDef: 'Regarder deux nombres et décider lequel est le plus grand, ou s’ils sont égaux.',
      sent: 'Compare 6.7 and 6.69: fill with a zero, and 6.70 is bigger.',
      frSent: 'Compare 6.7 et 6.69 : complète avec un zéro, et 6.70 est plus grand.',
      isReal: true,
    },
    {
      word: 'Whole-number part', fr: 'Partie entière',
      def: 'The digits in front of the decimal point. Compare these first.',
      frDef: 'Les chiffres avant le point décimal. Compare-les en premier.',
      sent: 'In 208.6, the whole-number part is 208.',
      frSent: 'Dans 208.6, la partie entière est 208.',
      isReal: true,
    },
    {
      word: 'Decimal part', fr: 'Partie décimale',
      def: 'The digits after the decimal point. Read them one by one: tenths, hundredths, thousandths.',
      frDef: 'Les chiffres après le point décimal. Lis-les un par un : dixièmes, centièmes, millièmes.',
      sent: 'The decimal part of 4.705 is .705: seven tenths, no hundredths and five thousandths.',
      frSent: 'La partie décimale de 4.705 est .705 : sept dixièmes, zéro centième et cinq millièmes.',
      isReal: true,
    },
    {
      word: 'Less than', fr: 'Inférieur à',
      def: 'Smaller than. The sign is <, and its point faces the smaller number.',
      frDef: 'Plus petit que. Le signe est <, et sa pointe est tournée vers le plus petit nombre.',
      sent: '0.48 < 0.5 means 0.48 is less than 0.5.',
      frSent: '0.48 < 0.5 veut dire que 0.48 est inférieur à 0.5.',
      isReal: true,
    },
    {
      word: 'Greater than', fr: 'Supérieur à',
      def: 'Bigger than. The sign is >, and its open side faces the bigger number.',
      frDef: 'Plus grand que. Le signe est >, et son côté ouvert est tourné vers le plus grand nombre.',
      sent: '7.1 > 7.09 means 7.1 is greater than 7.09.',
      frSent: '7.1 > 7.09 veut dire que 7.1 est supérieur à 7.09.',
      isReal: true,
    },
    {
      word: 'In order of size', fr: 'Dans l’ordre de taille',
      def: 'From the smallest to the largest, or from the largest to the smallest. The question says which one to start with.',
      frDef: 'Du plus petit au plus grand, ou du plus grand au plus petit. La question dit par lequel commencer.',
      sent: 'In order of size, starting with the smallest: 1.09, 1.9, 1.99.',
      frSent: 'Dans l’ordre de taille, en commençant par le plus petit : 1.09, 1.9, 1.99.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; French in `frTranslation`. They are the deck's four arguments —
  // fill with zeros, fastest means smallest, the same unit first, and a missing
  // digit — asked for in the student's own words.
  shortQA: [
    {
      id: 'sq1',
      question: 'Hoa says 7.45 is bigger than 7.5, because 45 is bigger than 5. Explain why she is wrong, and say which number is bigger.',
      frTranslation: 'Hoa dit que 7.45 est plus grand que 7.5, parce que 45 est plus grand que 5. Explique pourquoi elle se trompe, et dis quel nombre est le plus grand.',
      suggestedWords: [['fill with zeros', 'zero'], ['tenths', 'hundredths'], ['decimal part', 'digit']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying the decimal part is not a whole number: .45 is 4 tenths and 5 hundredths, not "forty-five", so 45 and 5 cannot be compared like that.',
        '1 mark for filling with zeros (7.5 = 7.50) or comparing the tenths: 5 tenths against 4 tenths (or 50 hundredths against 45 hundredths).',
        '1 mark for the answer: 7.5 is bigger (7.5 > 7.45).',
      ],
      modelAnswer: 'The decimal part is not a whole number, so 45 and 5 cannot be compared like that. Fill 7.5 with a zero to get 7.50, so both numbers have 2 decimal places. The whole-number parts are both 7. Then compare the tenths: 7.50 has 5 tenths and 7.45 has only 4 tenths. So 7.5 is bigger: 7.5 > 7.45.',
    },
    {
      id: 'sq2',
      question: 'In a 200 m race the times are 25.4 s, 24.98 s and 25.12 s. Minh writes them in order, starting with the fastest: 25.4, 25.12, 24.98. Explain his mistake and give the correct order.',
      frTranslation: 'Dans une course de 200 m, les temps sont 25.4 s, 24.98 s et 25.12 s. Minh les range en commençant par le plus rapide : 25.4, 25.12, 24.98. Explique son erreur et donne le bon ordre.',
      suggestedWords: [['fastest', 'smallest'], ['whole-number part', 'whole number'], ['fill with zeros', 'zero']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying the fastest runner has the smallest time, so the list must start with the smallest number — Minh started with the largest (the slowest).',
        '1 mark for using the whole-number part: 24.98 is the only time under 25 s, so it is the fastest; and 25.12 < 25.4 because 25.12 < 25.40 (1 tenth against 4 tenths).',
        '1 mark for the correct order: 24.98, 25.12, 25.4.',
      ],
      modelAnswer: 'The fastest runner takes the least time, so "starting with the fastest" means starting with the smallest number. Minh started with the largest time, which is the slowest. Look at the whole-number parts first: 24.98 is the only time with 24, so it is the fastest. Then compare 25.12 and 25.4: filled with zeros they are 25.12 and 25.40, and 1 tenth is less than 4 tenths, so 25.12 comes next. The order is 24.98, 25.12, 25.4.',
    },
    {
      id: 'sq3',
      question: 'A bag of flour has a mass of 1.3 kg. A bag of sugar has a mass of 1250 g. Lan says the sugar is heavier, because 1250 is bigger than 1.3. Explain why she is wrong, and say which bag is heavier.',
      frTranslation: 'Un sac de farine a une masse de 1.3 kg. Un sac de sucre a une masse de 1250 g. Lan dit que le sucre est plus lourd, parce que 1250 est plus grand que 1.3. Explique pourquoi elle se trompe, et dis quel sac est le plus lourd.',
      suggestedWords: [['same unit', 'unit'], ['kilogram', 'gram'], ['convert', 'change']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying the two masses are in different units, so the numbers cannot be compared until they are in the same unit.',
        '1 mark for the conversion: 1 kg = 1000 g, so 1.3 kg = 1300 g (or 1250 g = 1.25 kg).',
        '1 mark for the answer: 1300 g > 1250 g (or 1.3 kg > 1.25 kg), so the flour is heavier.',
      ],
      modelAnswer: 'Lan compared the numbers without looking at the units. One mass is in kilograms and the other is in grams, so first change them into the same unit. 1 kg is 1000 g, so 1.3 kg is 1300 g. 1300 g is more than 1250 g, so the bag of flour is heavier.',
    },
    {
      id: 'sq4',
      question: 'A digit is missing from 5.□2. Which digits can go in the box to make 5.□2 < 5.48 true? Explain how you know.',
      frTranslation: 'Il manque un chiffre dans 5.□2. Quels chiffres peuvent aller dans la case pour que 5.□2 < 5.48 soit vrai ? Explique comment tu le sais.',
      suggestedWords: [['tenths', 'digit'], ['whole-number part', 'whole number'], ['less than', 'smaller']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying the whole-number parts are the same (5), so the tenths decide: the missing digit is in the tenths.',
        '1 mark for the boundary: with 4 the tenths are equal, and 5.42 < 5.48 because 2 hundredths is less than 8; with 5 or more, 5.□2 is bigger than 5.48.',
        '1 mark for the full answer: 0, 1, 2, 3 or 4.',
      ],
      modelAnswer: 'Both numbers have the whole-number part 5, so compare the tenths. 5.48 has 4 tenths. If the missing digit is 0, 1, 2 or 3, the tenths are smaller, so the number is smaller. If it is 4, the tenths are equal, so look at the hundredths: 5.42 has 2 hundredths and 5.48 has 8, so 5.42 is still smaller. If it is 5 or more, the number is bigger. So the digit can be 0, 1, 2, 3 or 4.',
    },
  ],

  // Fill the Zeros (DEC_ORDER): an item states only the numbers and the
  // direction; utils/decOrder.js derives the zeros, the order, the sign, the
  // digits that fit and the slip behind a wrong answer. Numbers are fresh —
  // not the deck's, the workbook's, the quiz's or the Workbook's pp. 51–53.
  // Answers, for the reviewer:
  //   L1  0.8 > 0.75 · 6.04 < 6.4 · 12.50 = 12.5
  //   L2  5.06, 5.16, 5.6, 5.616 · 0.027, 0.2, 0.207, 0.7, 0.72
  //   L3  8.909, 8.9, 8.099, 8.09 · 1.53, 1.5, 1.35, 1.305, 1.053
  //   L4  9.857, 9.9, 10.06, 11.04, 11.4 · 100.1, 100.01, 99.95, 99.5, 9.999
  //   L5  13.95 Minh, 14.03 Mai, 14.2 Inès (third), 14.28 Lucas, 14.3 Linh, 14.32 Chloé
  //       2.05, 2.4, 2.45, 2.5, 2.55 · 2.66, 2.606, 2.6, 2.065, 2.06 · 4.805, 4.8 (second), 4.75, 4.7, 4.08
  //   L6  3.□6 > 3.47: 5–9 · 0.5□ < 0.536: 0–3 · 6.38 < 6.□: 4–9
  decOrder: {
    title: 'Fill the Zeros',
    titleFr: 'Complète avec des zéros',
    intro: 'The numbers are lined up at the point. Tap the empty boxes to fill them with zeros, so every number has the same number of decimal places. Then put them in order.',
    introFr: 'Les nombres sont alignés sur le point. Touche les cases vides pour les remplir de zéros : chaque nombre a alors le même nombre de décimales. Puis range-les dans l’ordre.',
    levels: {
      1: { en: 'Compare two', fr: 'Compare deux nombres' },
      2: { en: 'Smallest first', fr: 'Du plus petit au plus grand' },
      3: { en: 'Largest first', fr: 'Du plus grand au plus petit' },
      4: { en: 'Whole-number part first', fr: 'La partie entière d’abord' },
      5: { en: 'Times, money and measures', fr: 'Temps, prix et mesures' },
      6: { en: 'A missing digit', fr: 'Un chiffre manquant' },
    },
    items: [
      { id: 'c1', level: 1, kind: 'compare', a: '0.8', b: '0.75' },
      { id: 'c2', level: 1, kind: 'compare', a: '6.04', b: '6.4' },
      { id: 'c3', level: 1, kind: 'compare', a: '12.50', b: '12.5' },
      { id: 'o1', level: 2, kind: 'order', nums: ['5.6', '5.16', '5.06', '5.616'], dir: 'asc' },
      { id: 'o2', level: 2, kind: 'order', nums: ['0.72', '0.7', '0.027', '0.207', '0.2'], dir: 'asc' },
      { id: 'o3', level: 3, kind: 'order', nums: ['8.09', '8.9', '8.909', '8.099'], dir: 'desc' },
      { id: 'o4', level: 3, kind: 'order', nums: ['1.35', '1.053', '1.5', '1.305', '1.53'], dir: 'desc' },
      { id: 'o5', level: 4, kind: 'order', nums: ['11.4', '9.857', '10.06', '9.9', '11.04'], dir: 'asc' },
      { id: 'o6', level: 4, kind: 'order', nums: ['100.1', '99.95', '100.01', '99.5', '9.999'], dir: 'desc' },
      {
        id: 'o7', level: 5, kind: 'order', word: 'fastest', position: 3, unit: 's',
        nums: ['14.3', '14.28', '14.03', '14.32', '13.95', '14.2'],
        labels: ['Linh', 'Lucas', 'Mai', 'Chloé', 'Minh', 'Inès'],
        context: 'Sports day: six students run the 100 m. Here are their times, in seconds.',
        contextFr: 'Journée sportive : six élèves courent le 100 m. Voici leurs temps, en secondes.',
      },
      {
        id: 'o8', level: 5, kind: 'order', word: 'cheapest',
        nums: ['2.5', '2.05', '2.45', '2.55', '2.4'],
        context: 'Five shops sell the same notebook. Here are the prices, in dollars.',
        contextFr: 'Cinq magasins vendent le même cahier. Voici les prix, en dollars.',
      },
      {
        id: 'o9', level: 5, kind: 'order', word: 'heaviest', unit: 'kg',
        nums: ['2.6', '2.06', '2.66', '2.606', '2.065'],
        context: 'Five bags of rice are weighed. Here are their masses, in kilograms.',
        contextFr: 'On pèse cinq sacs de riz. Voici leurs masses, en kilogrammes.',
      },
      {
        id: 'o10', level: 5, kind: 'order', word: 'longest', position: 2, unit: 'm',
        nums: ['4.8', '4.75', '4.08', '4.805', '4.7'],
        context: 'Five long jumps, measured in metres.',
        contextFr: 'Cinq sauts en longueur, mesurés en mètres.',
      },
      { id: 'd1', level: 6, kind: 'digit', a: '3.□6', sign: '>', b: '3.47' },
      { id: 'd2', level: 6, kind: 'digit', a: '0.5□', sign: '<', b: '0.536' },
      { id: 'd3', level: 6, kind: 'digit', a: '6.38', sign: '<', b: '6.□' },
    ],
  },

  // Quick Fire (QUICK_FIRE): decimal cards dealt fresh every attempt — < or >
  // for a pair built round a trap, and the smallest or largest of four.
  quickFire: { title: 'Quick Fire', titleFr: 'Questions éclair', modes: ['deccompare', 'decpick'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
