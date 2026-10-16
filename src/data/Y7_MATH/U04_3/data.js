// src/data/Y7_MATH/U04_3/data.js
// 4.3 Multiplying decimals — self-study unit, built to the number-engines unit
// shape (docs/y7-math/number-engines.md §1; docs/y7-math/decimal-engines.md
// §4.3). 125 XP available, capped at 100 by unitXPOf. Gates: 20 of 30 (67%)
// and 80 of 105 (76%), both under the 80% rule.
//
// English and French only (meta.vietnamese: false): the screens toggle EN → FR,
// every learner-facing string has an …Fr twin and none has a …Vn twin.
//
// The classroom teaches 4.1–4.4 as ONE speed-run deck (lessons/content/y7-math/
// U04_1_4); this unit takes its multiplying part (slides 10–13, 17, 18c, 21)
// and the 2-digit, money and word-problem work of the optional review day
// (U04_review). Each of 4.1–4.4 carries the U04_1_4 entry in meta.classroom.
//
// What this unit adds that the decks never had: the Point Out, Point Back task
// — estimate, multiply whole numbers in rows, tap the gap where the point goes
// back — and the `pointback` deck activity, its tap stage on a slide.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U04_3_DATA = {
  meta: {
    id: 'U04_3',
    title: 'Multiplying Decimals',
    desc: 'Multiply a decimal by a whole number: estimate first, take the point out and multiply, put the point back with the same number of decimal places, and check against the estimate — and use one fact to find others, write money to 2 decimal places, and solve word problems.',
    track: 'Y7_MATH',
    icon: 'Calculator',
    vietnamese: false,
    classroom: [
      { course: 'y7-math', slug: 'U04_1_4', title: 'Maths 4.1–4.4 · Decimals' },
      { course: 'y7-math', slug: 'U04_review', title: 'Maths 4 · Bigger Numbers, Real Problems' },
    ],
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
        { id: 'POINT_BACK', dbKey: 'p78', maxXP: 25 },
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

  // Key words: the method's word (estimate), the answer's name (product), the
  // thing that moves (decimal point), the other number (whole number), the word
  // that turns a story into × (each), and the word that lets zeros go (exact).
  // The example sentences use their own numbers, so none gives away a deck item.
  realWords: [
    {
      word: 'Estimate', fr: 'Estimation',
      def: 'A rough answer, worked out from rounded numbers. It shows where the point should go.',
      frDef: 'Une réponse approximative, calculée avec des nombres arrondis. Elle montre où doit aller le point.',
      sent: '9.8 × 6 is about 10 × 6, so a good estimate is 60.',
      frSent: '9.8 × 6, c’est environ 10 × 6, donc une bonne estimation est 60.',
      isReal: true,
    },
    {
      word: 'Product', fr: 'Produit',
      def: 'The answer when you multiply numbers together.',
      frDef: 'Le résultat quand on multiplie des nombres entre eux.',
      sent: 'The product of 0.5 and 8 is 4.',
      frSent: 'Le produit de 0.5 et 8 est 4.',
      isReal: true,
    },
    {
      word: 'Decimal point', fr: 'Point décimal',
      def: 'The dot between the ones and the tenths. In English it is a dot, never a comma.',
      frDef: 'Le point entre les unités et les dixièmes. En anglais, c’est un point, jamais une virgule.',
      sent: 'In 6.75 the decimal point sits between the 6 and the 7.',
      frSent: 'Dans 6.75, le point décimal est entre le 6 et le 7.',
      isReal: true,
    },
    {
      word: 'Whole number', fr: 'Nombre entier',
      def: 'A number with no decimal part, such as 0, 3 or 48.',
      frDef: 'Un nombre sans partie décimale, comme 0, 3 ou 48.',
      sent: 'In 2.6 × 9, the whole number is 9.',
      frSent: 'Dans 2.6 × 9, le nombre entier est 9.',
      isReal: true,
    },
    {
      word: 'Each', fr: 'Chacun / chaque',
      def: 'For every one. In a word problem, "each" usually means multiply.',
      frDef: 'Pour chacun. Dans un problème, « each » veut souvent dire multiplier.',
      sent: 'Three cakes at 1.20 dollars each cost 3.60 dollars.',
      frSent: 'Trois gâteaux à 1.20 dollar chacun coûtent 3.60 dollars.',
      isReal: true,
    },
    {
      word: 'Exact', fr: 'Exact',
      def: 'Not rounded: exactly right. An exact answer may drop the zeros at its end.',
      frDef: 'Pas arrondi : exactement juste. Une réponse exacte peut perdre les zéros de la fin.',
      sent: 'The answer 6.0 is exact, so you may write it as 6.',
      frSent: 'La réponse 6.0 est exacte, donc tu peux l’écrire 6.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; French in `frTranslation`. They are the deck's four arguments —
  // the myth, the estimate that places the point, the zeros that may go, and a
  // story that multiplies — asked for in the student's own words.
  shortQA: [
    {
      id: 'sq1',
      question: 'Linh says 0.4 × 6 = 0.24, because "decimals make things smaller". Explain why she is wrong, and give the correct answer.',
      frTranslation: 'Linh dit que 0.4 × 6 = 0.24, car « les décimaux rendent les choses plus petites ». Explique pourquoi elle se trompe, et donne la bonne réponse.',
      suggestedWords: [['bigger', 'more than', 'larger'], ['decimal place', 'd.p.'], ['estimate', 'about']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the size argument: 6 lots of 0.4 must be more than 0.4 (multiplying by a whole number bigger than 1 makes it bigger), but 0.24 is smaller than 0.4.',
        '1 mark for the method: take the point out, 4 × 6 = 24, then put it back with 1 decimal place, because 0.4 has 1 decimal place.',
        '1 mark for the correct answer, 2.4 (an estimate such as 0.5 × 6 = 3 shows it is about right).',
      ],
      modelAnswer: 'Linh is wrong, because 0.4 × 6 means 6 lots of 0.4, and that must be more than 0.4. Her answer, 0.24, is smaller than 0.4. Take the point out: 4 × 6 = 24. 0.4 has 1 decimal place, so the answer has 1 decimal place: 2.4. This is close to the estimate 0.5 × 6 = 3.',
    },
    {
      id: 'sq2',
      question: 'You know that 76 × 14 = 1064. Use this fact to work out 7.6 × 14, and explain how you know where the point goes.',
      frTranslation: 'Tu sais que 76 × 14 = 1064. Utilise ce fait pour calculer 7.6 × 14, et explique comment tu sais où va le point.',
      suggestedWords: [['estimate', 'about', 'round'], ['decimal place', 'd.p.'], ['digits', 'same digits']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for an estimate: 7.6 is about 8 and 14 is about 10, so the answer is about 80 (or another sensible estimate, such as 8 × 14 = 112).',
        '1 mark for placing the point by the estimate or by counting: the digits are 1064, and 7.6 has 1 decimal place, so the answer has 1 decimal place.',
        '1 mark for the correct answer, 106.4 (not 10.64 or 1064).',
      ],
      modelAnswer: 'The answer has the same digits as 1064. I estimate first: 7.6 is about 8 and 14 is about 10, so the answer is about 80. 10.64 is too small and 1064 is too big, so the answer is 106.4. Counting also works: 7.6 has 1 decimal place, so the answer has 1 decimal place.',
    },
    {
      id: 'sq3',
      question: 'Minh works out 2.75 × 4 and gets 11.00. He writes the answer as 11. His friend says he must keep the two zeros. Who is right? Explain.',
      frTranslation: 'Minh calcule 2.75 × 4 et trouve 11.00. Il écrit la réponse 11. Son ami dit qu’il doit garder les deux zéros. Qui a raison ? Explique.',
      suggestedWords: [['exact'], ['round', 'rounded', 'rounding'], ['money', 'dollars']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying Minh is right: 11.00 and 11 are the same number.',
        '1 mark for the reason: the answer is exact — nothing was rounded — so the zeros at the end do not change its value and can go.',
        '1 mark for when the zeros must stay: when an answer is rounded (the zeros show its degree of accuracy, e.g. 10.996 to 2 d.p. is 11.00) or when it is money (11.00 dollars).',
      ],
      modelAnswer: 'Minh is right. 275 × 4 = 1100, and 2 decimal places gives 11.00, which is exactly 11. Nothing was rounded, so the answer is exact and the zeros at the end can go. The zeros must stay only when an answer is rounded, because then they show how exact it is, or when the answer is money, which always has 2 decimal places.',
    },
    {
      id: 'sq4',
      question: 'Mr Bowen buys 6 notebooks at 1.35 dollars each. He pays with a 10-dollar note. How much change does he get? Explain each step.',
      frTranslation: 'M. Bowen achète 6 cahiers à 1.35 dollar chacun. Il paie avec un billet de 10 dollars. Combien de monnaie reçoit-il ? Explique chaque étape.',
      suggestedWords: [['each', 'multiply', 'times'], ['change', 'subtract', 'take away'], ['decimal places', 'cents']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for multiplying, because "each" means ×: 1.35 × 6 = 8.10 dollars (135 × 6 = 810, then 2 decimal places).',
        '1 mark for subtracting from the 10 dollars, because "change" means −: 10.00 − 8.10.',
        '1 mark for the answer written as money: 1.90 dollars (not 1.9).',
      ],
      modelAnswer: 'Each notebook costs 1.35 dollars, so 6 notebooks cost 1.35 × 6. Take the point out: 135 × 6 = 810, and put back 2 decimal places: 8.10 dollars. The change is the money he gets back, so I subtract: 10.00 − 8.10 = 1.90. He gets 1.90 dollars change, written with 2 decimal places because it is money.',
    },
  ],

  // Point Out, Point Back (POINT_BACK): the item states only the sum;
  // utils/pointBack.js derives the estimate, the whole-number product (in two
  // rows for a 2-digit multiplier), where the point goes, and the slip behind a
  // wrong answer. Numbers are fresh — not the deck's (0.3 × 4, 2.25 × 4,
  // 0.03 × 3, 4.7 × 32, 53 × 27, 17 × 0.38, 3.4 × 25 …), not the workbook's,
  // not the quiz's. Answers, for the reviewer:
  //   L1  1.4 × 6 = 8.4 · 2.3 × 7 = 16.1 · 9 × 3.7 = 33.3
  //   L2  0.45 × 6 = 2.70 = 2.7 · 3.25 × 8 = 26.00 = 26 · 0.05 × 9 = 0.45 · 0.01 × 7 = 0.07
  //   L3  2.7 × 13 = 35.1 · 6.4 × 18 = 115.2 · 0.75 × 16 = 12.00 = 12
  //   L4  0.95 × 12 = 11.40 dollars · 3.15 × 16 = 50.4 kg · 4.5 × 7 = 31.50 dollars
  //   L5  38 × 26 = 988 → 98.8, 9.88, 3.8, 0.26 · 72 × 34 = 2448 → 244.8, 24.48, 7.2
  //   L6  0.85 × 14 = 11.90 dollars · 0.68 × 25 = 17 m · 3.75 × 8 = 30 km
  pointBack: {
    title: 'Point Out, Point Back',
    titleFr: 'Point enlevé, point remis',
    intro: 'Estimate first. Then take the point out and multiply, and tap the gap where the point goes back.',
    introFr: 'Estime d’abord. Puis enlève le point et multiplie, et touche l’espace où le point revient.',
    levels: {
      1: { en: 'Count the decimal places', fr: 'Compte les décimales' },
      2: { en: 'Two places, and the zeros', fr: 'Deux décimales, et les zéros' },
      3: { en: '× a 2-digit number', fr: '× un nombre à 2 chiffres' },
      4: { en: 'Money and measures', fr: 'Argent et mesures' },
      5: { en: 'One fact, many answers', fr: 'Un fait, plusieurs réponses' },
      6: { en: 'Stories', fr: 'Problèmes' },
    },
    items: [
      { id: 'm1', level: 1, a: '1.4', b: '6' },
      { id: 'm2', level: 1, a: '2.3', b: '7' },
      { id: 'm3', level: 1, a: '9', b: '3.7' },
      { id: 'm4', level: 2, a: '0.45', b: '6' },
      { id: 'm5', level: 2, a: '3.25', b: '8' },
      { id: 'm6', level: 2, a: '0.05', b: '9' },
      { id: 'm7', level: 2, a: '0.01', b: '7' },
      { id: 'm8', level: 3, a: '2.7', b: '13' },
      { id: 'm9', level: 3, a: '6.4', b: '18' },
      { id: 'm10', level: 3, a: '0.75', b: '16' },
      { id: 'm11', level: 4, a: '0.95', b: '12', money: true },
      { id: 'm12', level: 4, a: '3.15', b: '16', unit: 'kg' },
      { id: 'm13', level: 4, a: '4.5', b: '7', money: true },
      { id: 'm14', level: 5, kind: 'fact', fact: '38 × 26 = 988', variants: ['3.8 × 26', '0.38 × 26', '98.8 ÷ 26', '9.88 ÷ 38'] },
      { id: 'm15', level: 5, kind: 'fact', fact: '72 × 34 = 2448', variants: ['7.2 × 34', '0.72 × 34', '244.8 ÷ 34'] },
      {
        id: 'm16', level: 6, a: '0.85', b: '14', money: true,
        context: 'A bus ticket costs 0.85 dollars. Mr Bowen buys 14 tickets. How much does he pay?',
        contextFr: 'Un ticket de bus coûte 0.85 dollar. M. Bowen achète 14 tickets. Combien paie-t-il ?',
      },
      {
        id: 'm17', level: 6, a: '0.68', b: '25', unit: 'm',
        context: 'One of Mr Bowen’s steps is 0.68 m long. He takes 25 steps to the classroom. How far does he walk?',
        contextFr: 'Un pas de M. Bowen mesure 0.68 m. Il fait 25 pas jusqu’à la classe. Quelle distance parcourt-il ?',
      },
      {
        id: 'm18', level: 6, a: '3.75', b: '8', unit: 'km',
        context: 'Mr Bowen runs 3.75 km every day for 8 days. How far does he run altogether?',
        contextFr: 'M. Bowen court 3.75 km chaque jour pendant 8 jours. Quelle distance court-il en tout ?',
      },
    ],
  },

  // Quick Fire (QUICK_FIRE): cards dealt fresh every attempt — a decimal × a
  // 1-digit number in your head (pointMul), and the point placed from a given
  // fact (pointFact). utils/pointBack.js names each slip.
  quickFire: { title: 'Quick Fire', titleFr: 'Questions éclair', modes: ['pointMul', 'pointFact'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
