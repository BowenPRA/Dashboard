// src/data/Y7_MATH/U04_5/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 the equivalent fraction, 2 smaller or bigger (× a number less than
// 1), 3 × tenths, 4 the easy way for × hundredths, 5 "a quarter of", 6 × 9
// from × 10, 7 partitioning, 8 a story with × 11. Every distractor is a
// diagnosis: the wrong column, multiplying always makes bigger, × 0.3 as ÷ 3,
// the point forgotten, doubled or halved instead of quartered, one lot as 1,
// the wrong way round, the decimal part not multiplied, + for ×. No item copies
// a deck check, a workbook question or a Make It Easy item. English and French.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_fraction',
      type: 'mcq',
      title: '1. Which decimal is equivalent to $$\\frac{3}{100}$$?',
      options: [
        { val: 'A', text: 'A. $$0.3$$' },
        { val: 'B', text: 'B. $$0.03$$' },
        { val: 'C', text: 'C. $$3.100$$' },
        { val: 'D', text: 'D. $$0.003$$' },
      ],
      correct: 'B',
      expEn: 'Three hundredths: the 3 goes in the hundredths column, the second place after the point, so $$0.03$$. A is three tenths. D is three thousandths. C is not a fraction at all — it is just over 3.',
      expFr: 'Trois centièmes : le 3 va dans la colonne des centièmes, le deuxième rang après le point, donc $$0.03$$. A, c’est trois dixièmes. D, trois millièmes. C n’est pas une fraction du tout — c’est un peu plus que 3.',
    },
    {
      id: 'a2_smaller',
      type: 'mcq',
      title: '2. Without working them out: which answer is smaller than 84?',
      options: [
        { val: 'A', text: 'A. $$84 × 1.5$$' },
        { val: 'B', text: 'B. $$84 × 11$$' },
        { val: 'C', text: 'C. $$84 × 2$$' },
        { val: 'D', text: 'D. $$84 × 0.9$$' },
      ],
      correct: 'D',
      expEn: '$$0.9$$ is less than 1, so $$84 × 0.9$$ takes only part of 84: the answer is smaller (75.6). A, B and C multiply by numbers bigger than 1, so they make 84 bigger. Multiplying does not always make a number bigger.',
      expFr: '$$0.9$$ est plus petit que 1, donc $$84 × 0.9$$ ne prend qu’une partie de 84 : la réponse est plus petite (75.6). A, B et C multiplient par des nombres plus grands que 1, donc ils rendent 84 plus grand. Multiplier ne rend pas toujours un nombre plus grand.',
    },
    {
      id: 'a3_tenths',
      type: 'mcq',
      title: '3. Work out $$450 × 0.3$$.',
      options: [
        { val: 'A', text: 'A. $$135$$' },
        { val: 'B', text: 'B. $$150$$' },
        { val: 'C', text: 'C. $$1350$$' },
        { val: 'D', text: 'D. $$13.5$$' },
      ],
      correct: 'A',
      expEn: '$$0.3$$ is 3 tenths: divide by 10, then multiply by 3. $$450 ÷ 10 = 45$$ and $$45 × 3 = 135$$. B is $$450 ÷ 3$$ — that treats $$× 0.3$$ as $$÷ 3$$. C forgets the point: $$450 × 3$$. D divides by 100, as if it were $$× 0.03$$.',
      expFr: '$$0.3$$, c’est 3 dixièmes : divise par 10, puis multiplie par 3. $$450 ÷ 10 = 45$$ et $$45 × 3 = 135$$. B, c’est $$450 ÷ 3$$ — il prend $$× 0.3$$ pour $$÷ 3$$. C oublie le point : $$450 × 3$$. D divise par 100, comme si c’était $$× 0.03$$.',
    },
    {
      id: 'a4_easy_way',
      type: 'mcq',
      title: '4. Which is the easy way to work out $$900 × 0.06$$?',
      options: [
        { val: 'A', text: 'A. $$900 ÷ 6$$' },
        { val: 'B', text: 'B. $$900 ÷ 10 × 6$$' },
        { val: 'C', text: 'C. $$900 ÷ 100 × 6$$' },
        { val: 'D', text: 'D. $$900 × 6$$' },
      ],
      correct: 'C',
      expEn: '$$0.06$$ is 6 hundredths — the 0 holds the tenths column. So divide by 100, then multiply by 6: $$9 × 6 = 54$$. B divides by 10, which would be $$× 0.6$$. A treats $$× 0.06$$ as $$÷ 6$$. D forgets the point and makes 900 bigger.',
      expFr: '$$0.06$$, c’est 6 centièmes — le 0 tient la colonne des dixièmes. Donc divise par 100, puis multiplie par 6 : $$9 × 6 = 54$$. B divise par 10, ce qui serait $$× 0.6$$. A prend $$× 0.06$$ pour $$÷ 6$$. D oublie le point et rend 900 plus grand.',
    },
    {
      id: 'a5_quarter',
      type: 'mcq',
      title: '5. What is a quarter of 220?',
      options: [
        { val: 'A', text: 'A. $$880$$' },
        { val: 'B', text: 'B. $$55$$' },
        { val: 'C', text: 'C. $$8.8$$' },
        { val: 'D', text: 'D. $$110$$' },
      ],
      correct: 'B',
      expEn: '"A quarter of" means $$× 0.25$$, which is $$÷ 4$$: $$220 ÷ 4 = 55$$. A multiplies by 4 instead of dividing. C divides by 25 — $$× 0.25$$ is not $$÷ 25$$. D is half of 220, not a quarter.',
      expFr: '« A quarter of » (le quart de) veut dire $$× 0.25$$, c’est-à-dire $$÷ 4$$ : $$220 ÷ 4 = 55$$. A multiplie par 4 au lieu de diviser. C divise par 25 — $$× 0.25$$, ce n’est pas $$÷ 25$$. D, c’est la moitié de 220, pas le quart.',
    },
    {
      id: 'a6_nine',
      type: 'mcq',
      title: '6. Work out $$6.4 × 9$$.',
      options: [
        { val: 'A', text: 'A. $$57.6$$' },
        { val: 'B', text: 'B. $$70.4$$' },
        { val: 'C', text: 'C. $$63$$' },
        { val: 'D', text: 'D. $$58$$' },
      ],
      correct: 'A',
      expEn: 'Ten lots: $$6.4 × 10 = 64$$. Nine lots is one lot fewer: $$64 − 6.4 = 57.6$$. B adds a lot — that is $$× 11$$. C takes away 1, not one lot. D takes away only the 6 of 6.4.',
      expFr: 'Dix fois : $$6.4 × 10 = 64$$. Neuf fois, c’est une fois de moins : $$64 − 6.4 = 57.6$$. B ajoute une fois — c’est $$× 11$$. C enlève 1, pas une fois le nombre. D n’enlève que le 6 de 6.4.',
    },
    {
      id: 'a7_partition',
      type: 'mcq',
      title: '7. Work out $$8.6 × 4$$.',
      options: [
        { val: 'A', text: 'A. $$32.6$$' },
        { val: 'B', text: 'B. $$32.24$$' },
        { val: 'C', text: 'C. $$56$$' },
        { val: 'D', text: 'D. $$34.4$$' },
      ],
      correct: 'D',
      expEn: 'Partition: $$8.6 = 8 + 0.6$$. $$8 × 4 = 32$$ and $$0.6 × 4 = 2.4$$, so $$32 + 2.4 = 34.4$$. A forgot to multiply the 0.6. B wrote 24 tenths as 0.24. C used 6 instead of 0.6: $$32 + 24$$.',
      expFr: 'Décompose : $$8.6 = 8 + 0.6$$. $$8 × 4 = 32$$ et $$0.6 × 4 = 2.4$$, donc $$32 + 2.4 = 34.4$$. A a oublié de multiplier le 0.6. B a écrit 24 dixièmes comme 0.24. C a pris 6 au lieu de 0.6 : $$32 + 24$$.',
    },
    {
      id: 'a8_story',
      type: 'mcq',
      title: '8. Mr Bowen runs 2.4 km every day for 11 days. How far does he run altogether?',
      options: [
        { val: 'A', text: 'A. $$13.4$$ km' },
        { val: 'B', text: 'B. $$21.6$$ km' },
        { val: 'C', text: 'C. $$26.4$$ km' },
        { val: 'D', text: 'D. $$25$$ km' },
      ],
      correct: 'C',
      expEn: '2.4 km each day for 11 days is 11 lots of 2.4: $$2.4 × 11$$. Ten lots is 24, one lot more is $$24 + 2.4 = 26.4$$ km. A adds 11 instead of multiplying. B takes a lot away — that is $$× 9$$. D adds 1, not one lot.',
      expFr: '2.4 km chaque jour pendant 11 jours, c’est 11 fois 2.4 : $$2.4 × 11$$. Dix fois, c’est 24, une fois de plus, $$24 + 2.4 = 26.4$$ km. A ajoute 11 au lieu de multiplier. B enlève une fois — c’est $$× 9$$. D ajoute 1, pas une fois le nombre.',
    },
  ],
};
