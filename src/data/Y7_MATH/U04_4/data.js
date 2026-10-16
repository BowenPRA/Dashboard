// src/data/Y7_MATH/U04_4/data.js
// 4.4 Dividing decimals — self-study unit, built to the number-engines unit
// shape (docs/y7-math/number-engines.md §1). 125 XP available, capped at 100 by
// unitXPOf. Gates: 20 of 30 (67%) and 80 of 105 (76%), both under the 80% rule.
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false), like the Unit 4 classroom
// decks: every learner-facing string has an …Fr twin and none has a …Vn one.
//
// Two classroom decks feed it (C:\Users\bowen\lessons, content/y7-math):
// U04_1_4, which taught 4.1–4.4 in one period (its 4.4 run is slides 14–17,
// plus the homework's line d and the share-equally slides 19, 20 and 22), and
// U04_review, the consolidation day (÷ a 2-digit number by writing its times
// table first, the answer that never ends, a conjecture tested with a mean).
//
// The practice engine is the Bus Stop (SHORT_DIV, p56 — the 3.2 screen), with
// two stages it gained for this unit and switches on per item: `table: true`
// (write the divisor's times table first) and `check: true` (pick the inverse
// calculation at the end). utils/shortDivExtras.js; docs/y7-math/decimal-engines.md.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U04_4_DATA = {
  meta: {
    id: 'U04_4',
    title: 'Dividing Decimals',
    desc: 'Divide a decimal the short way — the point straight up, a 0 where a digit is too small, zeros added to finish — divide by a 2-digit number with its times table, check with the inverse, and share money equally.',
    track: 'Y7_MATH',
    icon: 'Sigma',
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
        { id: 'SHORT_DIV', dbKey: 'p56', maxXP: 25 },
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

  // Key words: the check the section is built on (inverse calculation), its two
  // margin words (estimation, conjecture), the word that turns a story into a
  // division (share equally) and the one that asks for a single share (each),
  // and the mean that tests the conjecture. The example sentences use their own
  // numbers, so none gives away a deck, practice or quiz item.
  realWords: [
    {
      word: 'Inverse calculation', fr: 'Calcul inverse',
      def: 'The opposite calculation. It undoes the first one, so you can use it to check an answer.',
      frDef: 'Le calcul contraire. Il défait le premier, donc il sert à vérifier une réponse.',
      sent: 'To check 6.4 ÷ 2 = 3.2, do the inverse calculation: 3.2 × 2 = 6.4.',
      frSent: 'Pour vérifier 6.4 ÷ 2 = 3.2, fais le calcul inverse : 3.2 × 2 = 6.4.',
      isReal: true,
    },
    {
      word: 'Estimation', fr: 'Estimation',
      def: 'A rough answer, found by rounding the numbers first. It shows about how big the answer should be.',
      frDef: 'Une réponse approximative, trouvée en arrondissant d’abord les nombres. Elle montre à peu près la taille de la réponse.',
      sent: 'An estimation for 19.8 ÷ 5 is 20 ÷ 5 = 4.',
      frSent: 'Une estimation de 19.8 ÷ 5, c’est 20 ÷ 5 = 4.',
      isReal: true,
    },
    {
      word: 'Share equally', fr: 'Partager en parts égales',
      def: 'Give everyone the same amount. To find one share, divide.',
      frDef: 'Donner la même quantité à chacun. Pour trouver une part, on divise.',
      sent: 'Share 15 sweets equally between 5 children, and each child gets 3.',
      frSent: 'Partage 15 bonbons en parts égales entre 5 enfants, et chaque enfant en reçoit 3.',
      isReal: true,
    },
    {
      word: 'Each', fr: 'Chacun, chaque',
      def: 'Every one, taken on its own. "How much does each person pay?" asks for one share.',
      frDef: 'Chacun, pris tout seul. « How much does each person pay? » demande une seule part.',
      sent: 'Four tickets cost 10 dollars, so each ticket costs 2.50 dollars.',
      frSent: 'Quatre billets coûtent 10 dollars, donc chaque billet coûte 2.50 dollars.',
      isReal: true,
    },
    {
      word: 'Conjecture', fr: 'Conjecture',
      def: 'A guess that you can test. You check it with a calculation.',
      frDef: 'Une supposition que l’on peut vérifier. On la teste avec un calcul.',
      sent: 'My conjecture is that the red team is faster. Now I will test it.',
      frSent: 'Ma conjecture est que l’équipe rouge est plus rapide. Maintenant, je vais la vérifier.',
      isReal: true,
    },
    {
      word: 'Mean', fr: 'Moyenne',
      def: 'Add up all the values, then divide by how many there are.',
      frDef: 'On additionne toutes les valeurs, puis on divise par leur nombre.',
      sent: 'The mean of 4, 6 and 8 is 18 ÷ 3 = 6.',
      frSent: 'La moyenne de 4, 6 et 8 est 18 ÷ 3 = 6.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; French in `frTranslation`. They are the deck's four arguments —
  // the missing 0 and the inverse that catches it, the estimate that places the
  // point, counting the people who share, and a conjecture tested with a mean —
  // asked for in the student's own words, with new numbers.
  shortQA: [
    {
      id: 'sq1',
      question: 'Nam works out 21.42 ÷ 7 and writes 3.6. Explain his mistake, give the correct answer, and show how the inverse calculation proves which answer is right.',
      frTranslation: 'Nam calcule 21.42 ÷ 7 et écrit 3.6. Explique son erreur, donne la bonne réponse, et montre comment le calcul inverse prouve quelle réponse est juste.',
      suggestedWords: [['zero', '0', 'placeholder'], ['inverse', 'multiply'], ['tenths', 'carry']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the mistake: 7 into 4 (the tenths digit) does not go, so the tenths place of the answer needs a 0 — Nam left it out.',
        '1 mark for the correct answer: 21 ÷ 7 = 3, then 0 for the 4 tenths (the 4 is carried), then 42 ÷ 7 = 6, so 3.06.',
        '1 mark for the inverse check: 3.06 × 7 = 21.42, but 3.6 × 7 = 25.2, so 3.06 is right and 3.6 is wrong.',
      ],
      modelAnswer: 'Nam forgot the 0. After 21 ÷ 7 = 3, the next digit is 4 tenths, and 7 does not go into 4. That place in the answer still needs a digit, so he should write 0 and carry the 4. Then 42 ÷ 7 = 6, so the answer is 3.06. The inverse calculation proves it: 3.06 × 7 = 21.42, which is the number we started with, but 3.6 × 7 = 25.2, which is not.',
    },
    {
      id: 'sq2',
      question: 'You know that 23 × 18 = 414. Explain how an estimate tells you where the point goes in 41.4 ÷ 18, and give the answer.',
      frTranslation: 'Tu sais que 23 × 18 = 414. Explique comment une estimation te dit où va le point dans 41.4 ÷ 18, et donne la réponse.',
      suggestedWords: [['estimate', 'estimation', 'about'], ['round', 'rounded'], ['point', 'decimal point']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for using the fact: 414 ÷ 18 = 23, so the digits of the answer are 2 and 3.',
        '1 mark for a sensible estimate: 41.4 is about 40 and 18 is about 20, so the answer is about 40 ÷ 20 = 2.',
        '1 mark for the answer placed by the estimate: 2.3, because it is close to 2 (23 and 0.23 are not).',
      ],
      modelAnswer: 'From the fact, 414 ÷ 18 = 23, so the answer has the digits 2 and 3. To place the point, estimate: 41.4 is about 40 and 18 is about 20, and 40 ÷ 20 = 2. The answer must be close to 2, so it is 2.3. It cannot be 23 or 0.23, because they are nowhere near 2.',
    },
    {
      id: 'sq3',
      question: 'Mr Bowen and three friends share a 13.8-dollar taxi fare equally. Kim works out 13.8 ÷ 3 = 4.60 dollars. Explain her mistake and give the amount each person pays, written as money.',
      frTranslation: 'M. Bowen et trois amis partagent en parts égales une course de taxi à 13.8 dollars. Kim calcule 13.8 ÷ 3 = 4.60 dollars. Explique son erreur et donne la somme que paie chaque personne, écrite comme de l’argent.',
      suggestedWords: [['share equally', 'divide'], ['people', 'four'], ['decimal places', 'cents']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the people: Mr Bowen and three friends is four people, but Kim divided by 3.',
        '1 mark for the method: "share equally" means divide by the number of people, so 13.8 ÷ 4.',
        '1 mark for the answer written as money: 3.45 dollars, with 2 decimal places (a check such as 3.45 × 4 = 13.8 may be given).',
      ],
      modelAnswer: 'Kim divided by the wrong number. Mr Bowen and three friends is four people, not three. "Share equally" means divide the fare by the number of people, so the calculation is 13.8 ÷ 4. 4 into 13 is 3, remainder 1, then 4 into 18 is 4, remainder 2, then 4 into 20 is 5. Each person pays 3.45 dollars. Check: 3.45 × 4 = 13.8.',
    },
    {
      id: 'sq4',
      question: 'Lan makes a conjecture: "Rider A is faster on average, because Rider B has the slowest lap of all." Rider A\'s 3 laps add up to 37.5 minutes. Rider B\'s 4 laps add up to 49.2 minutes. Explain how to test the conjecture, and say whether it is true.',
      frTranslation: 'Lan fait une conjecture : « Le cycliste A est plus rapide en moyenne, parce que le cycliste B a le tour le plus lent de tous. » Les 3 tours du cycliste A font 37.5 minutes au total. Les 4 tours du cycliste B font 49.2 minutes au total. Explique comment vérifier la conjecture, et dis si elle est vraie.',
      suggestedWords: [['mean', 'average'], ['divide', 'total'], ['conjecture', 'test']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the method: test it with the mean of each rider — divide each total by the number of laps.',
        '1 mark for both means: Rider A 37.5 ÷ 3 = 12.5 minutes, Rider B 49.2 ÷ 4 = 12.3 minutes.',
        '1 mark for the conclusion: 12.3 is less than 12.5, so Rider B is faster on average and the conjecture is false — one slow lap does not decide the mean.',
      ],
      modelAnswer: 'A conjecture is a guess that you can test. To test this one, work out the mean lap time of each rider: divide the total by the number of laps. Rider A: 37.5 ÷ 3 = 12.5 minutes. Rider B: 49.2 ÷ 4 = 12.3 minutes. Rider B has the lower mean, so Rider B is faster on average and Lan’s conjecture is false. One slow lap does not decide the mean.',
    },
  ],

  // Bus Stop (SHORT_DIV): the item states only the division; utils/
  // shortDivision.js derives every column, carry, added zero and answer,
  // utils/rounding.js names the slip behind a wrong rounded answer, and
  // utils/shortDivExtras.js runs the two 4.4 stages — `table` (write the times
  // table first) and `check` (the inverse calculation). Numbers are fresh — not
  // the deck's, the workbook's, the quiz's or the book's exercise. Answers:
  //   L1  7.56 ÷ 3 = 2.52 · 19.35 ÷ 5 = 3.87 (check)
  //   L2  12.24 ÷ 6 = 2.04 (check) · 32.28 ÷ 4 = 8.07 · 0.392 ÷ 7 = 0.056
  //   L3  5.7 ÷ 2 = 2.85 · 3.3 ÷ 8 = 0.4125 (check)
  //   L4  55.2 ÷ 12 = 4.6 (table) · 62.4 ÷ 16 = 3.9 (table) · 9.52 ÷ 14 = 0.68 · 22.5 ÷ 18 = 1.25
  //   L5  10.3 ÷ 6 = 1.716… → 1.72 · 23.5 ÷ 9 = 2.61… → 2.6
  //   L6  38.75 ÷ 5 = 7.75 (check) · 2.1 ÷ 4 = 0.525 · 40 ÷ 3 = 13.333… → 13.33
  shortDiv: {
    title: 'Bus Stop',
    titleFr: 'Division courte',
    intro: 'Divide the short way: type each digit of the answer on top, and each remainder in the small box, up and to the left of the next digit. The point goes straight up. If a digit is too small to divide, the digit on top is 0.',
    introFr: 'Divise par la division courte : tape chaque chiffre de la réponse en haut, et chaque reste dans la petite case, en haut à gauche du chiffre suivant. Le point monte tout droit. Si un chiffre est trop petit pour être divisé, le chiffre du haut est 0.',
    levels: {
      1: { en: 'The point goes straight up', fr: 'Le point monte tout droit' },
      2: { en: 'A 0 in the answer', fr: 'Un 0 dans la réponse' },
      3: { en: 'Add zeros to finish', fr: 'Ajoute des zéros pour finir' },
      4: { en: 'Divide by a 2-digit number', fr: 'Divise par un nombre à 2 chiffres' },
      5: { en: 'It never ends: round it', fr: 'Ça ne finit jamais : arrondis' },
      6: { en: 'Share equally', fr: 'Parts égales' },
    },
    items: [
      { id: 'd1', level: 1, dividend: '7.56', divisor: 3 },
      { id: 'd2', level: 1, dividend: '19.35', divisor: 5, check: true },
      { id: 'd3', level: 2, dividend: '12.24', divisor: 6, check: true },
      { id: 'd4', level: 2, dividend: '32.28', divisor: 4 },
      { id: 'd5', level: 2, dividend: '0.392', divisor: 7 },
      { id: 'd6', level: 3, dividend: '5.7', divisor: 2 },
      { id: 'd7', level: 3, dividend: '3.3', divisor: 8, check: true },
      { id: 'd8', level: 4, dividend: '55.2', divisor: 12, table: true },
      { id: 'd9', level: 4, dividend: '62.4', divisor: 16, table: true },
      { id: 'd10', level: 4, dividend: '9.52', divisor: 14 },
      { id: 'd11', level: 4, dividend: '22.5', divisor: 18 },
      { id: 'd12', level: 5, dividend: '10.3', divisor: 6, dp: 2 },
      { id: 'd13', level: 5, dividend: '23.5', divisor: 9, dp: 1 },
      {
        id: 'd14', level: 6, dividend: '38.75', divisor: 5, check: true,
        context: 'Mr Bowen and four friends share a bill of 38.75 dollars equally. How much does each person pay, in dollars?',
        contextFr: 'M. Bowen et quatre amis partagent une addition de 38.75 dollars en parts égales. Combien paie chaque personne, en dollars ?',
      },
      {
        id: 'd15', level: 6, dividend: '2.1', divisor: 4,
        context: 'A 2.1 kg bag of rice is shared equally between 4 bowls. How much rice goes in each bowl, in kilograms?',
        contextFr: 'Un sac de riz de 2.1 kg est partagé en parts égales entre 4 bols. Combien de riz va dans chaque bol, en kilogrammes ?',
      },
      {
        id: 'd16', level: 6, dividend: '40', divisor: 3, dp: 2,
        context: 'Three friends share a 40-dollar prize equally. The division never ends, so write each share as money: 2 decimal places.',
        contextFr: 'Trois amis partagent un prix de 40 dollars en parts égales. La division ne finit jamais, alors écris chaque part comme de l’argent : 2 décimales.',
      },
    ],
  },

  // Quick Fire (QUICK_FIRE): cards dealt fresh every attempt (utils/quickFire.js,
  // the U04_4 block) — `decdivide`, a decimal ÷ a 1-digit number with the slip
  // named (a lost 0, the point not straight up) or answered by the inverse; and
  // `divcheck`, "9.18 ÷ 3 = 3.6 — right or wrong?", settled by multiplying back.
  quickFire: { title: 'Quick Fire', titleFr: 'Questions éclair', modes: ['decdivide', 'divcheck'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
