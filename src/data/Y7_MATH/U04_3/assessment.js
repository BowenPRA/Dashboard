// src/data/Y7_MATH/U04_3/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 the size of the answer (the "decimals make it smaller" myth), 2 a
// known fact, 3 two decimal places, 4 a placeholder zero, 5 × a 2-digit number
// with an exact answer, 6 the best estimate, 7 money to 2 decimal places, 8 a
// story that multiplies twice. Every distractor is a diagnosis: decimals made it
// smaller, the point never went back, counted from the left, a place too many
// or too few, a lost placeholder zero, money without its cents, added instead
// of multiplied. No item copies a deck check, a workbook question or a Point
// Out, Point Back item. English and French explanations.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_size',
      type: 'mcq',
      title: '1. Do not work it out. Which answer to $$0.8 × 6$$ could be right?',
      options: [
        { val: 'A', text: 'A. $$0.48$$' },
        { val: 'B', text: 'B. $$48$$' },
        { val: 'C', text: 'C. $$4.8$$' },
        { val: 'D', text: 'D. $$0.048$$' },
      ],
      correct: 'C',
      expEn: '6 lots of $$0.8$$ is more than $$0.8$$ but less than 6 lots of 1, which is 6. Only $$4.8$$ is between them. A and D are smaller than $$0.8$$ — multiplying by 6 does not make a number smaller. B is more than 6.',
      expFr: '6 fois $$0.8$$, c’est plus que $$0.8$$ mais moins que 6 fois 1, qui fait 6. Seul $$4.8$$ est entre les deux. A et D sont plus petits que $$0.8$$ — multiplier par 6 ne rend pas un nombre plus petit. B est plus grand que 6.',
    },
    {
      id: 'a2_fact',
      type: 'mcq',
      title: '2. You know that $$57 × 6 = 342$$. What is $$5.7 × 6$$?',
      options: [
        { val: 'A', text: 'A. $$34.2$$' },
        { val: 'B', text: 'B. $$3.42$$' },
        { val: 'C', text: 'C. $$342$$' },
        { val: 'D', text: 'D. $$0.342$$' },
      ],
      correct: 'A',
      expEn: '$$5.7$$ has 1 decimal place, so the answer has 1: $$34.2$$. Check: $$6 × 6 = 36$$, which is close. B has 2 decimal places, C never put the point back, and D is smaller than $$5.7$$.',
      expFr: '$$5.7$$ a 1 décimale, donc la réponse en a 1 : $$34.2$$. Vérifie : $$6 × 6 = 36$$, c’est proche. B a 2 décimales, C n’a jamais remis le point, et D est plus petit que $$5.7$$.',
    },
    {
      id: 'a3_places',
      type: 'mcq',
      title: '3. Work out $$0.08 × 7$$.',
      options: [
        { val: 'A', text: 'A. $$5.6$$' },
        { val: 'B', text: 'B. $$0.056$$' },
        { val: 'C', text: 'C. $$56$$' },
        { val: 'D', text: 'D. $$0.56$$' },
      ],
      correct: 'D',
      expEn: 'Take the point out: $$8 × 7 = 56$$. $$0.08$$ has 2 decimal places, so the answer has 2: $$0.56$$. A has only 1 decimal place, B has 3, and C never put the point back.',
      expFr: 'Enlève le point : $$8 × 7 = 56$$. $$0.08$$ a 2 décimales, donc la réponse en a 2 : $$0.56$$. A n’a qu’une décimale, B en a 3, et C n’a jamais remis le point.',
    },
    {
      id: 'a4_zero',
      type: 'mcq',
      title: '4. Work out $$0.02 × 2$$.',
      options: [
        { val: 'A', text: 'A. $$0.4$$' },
        { val: 'B', text: 'B. $$0.04$$' },
        { val: 'C', text: 'C. $$4$$' },
        { val: 'D', text: 'D. $$0.004$$' },
      ],
      correct: 'B',
      expEn: '$$2 × 2 = 4$$, and $$0.02$$ has 2 decimal places. $$4$$ is only one digit, so a 0 holds the tenths place: $$0.04$$. A lost that zero — it has 1 decimal place. C never put the point back. D has 3 decimal places and is smaller than $$0.02$$.',
      expFr: '$$2 × 2 = 4$$, et $$0.02$$ a 2 décimales. $$4$$ n’a qu’un chiffre, donc un 0 garde la place des dixièmes : $$0.04$$. A a perdu ce zéro — il n’a qu’une décimale. C n’a jamais remis le point. D a 3 décimales et il est plus petit que $$0.02$$.',
    },
    {
      id: 'a5_two_digit',
      type: 'mcq',
      title: '5. Work out $$3.6 × 25$$.',
      options: [
        { val: 'A', text: 'A. $$9$$' },
        { val: 'B', text: 'B. $$900$$' },
        { val: 'C', text: 'C. $$90$$' },
        { val: 'D', text: 'D. $$0.9$$' },
      ],
      correct: 'C',
      expEn: '$$36 × 5 = 180$$ and $$36 × 20 = 720$$, so $$36 × 25 = 900$$. $$3.6$$ has 1 decimal place: $$90.0$$, which is exactly $$90$$ — nothing was rounded, so the zero can go. Estimate: $$4 × 30 = 120$$, and 90 is the only answer near it. A has 2 decimal places, B never put the point back, D is smaller than $$3.6$$.',
      expFr: '$$36 × 5 = 180$$ et $$36 × 20 = 720$$, donc $$36 × 25 = 900$$. $$3.6$$ a 1 décimale : $$90.0$$, qui vaut exactement $$90$$ — rien n’a été arrondi, donc le zéro peut partir. Estimation : $$4 × 30 = 120$$, et 90 est la seule réponse proche. A a 2 décimales, B n’a jamais remis le point, D est plus petit que $$3.6$$.',
    },
    {
      id: 'a6_estimate',
      type: 'mcq',
      title: '6. Which is the best estimate for $$7.8 × 19$$?',
      options: [
        { val: 'A', text: 'A. $$8 × 20 = 160$$' },
        { val: 'B', text: 'B. $$7 × 10 = 70$$' },
        { val: 'C', text: 'C. $$78 × 19 = 1482$$' },
        { val: 'D', text: 'D. $$0.8 × 2 = 1.6$$' },
      ],
      correct: 'A',
      expEn: 'Round each number to the nearest easy number: $$7.8$$ is about 8 and $$19$$ is about 20, so $$8 × 20 = 160$$ (the answer is $$148.2$$). B rounds both numbers down a long way. C is not an estimate — it is the exact sum with the point out. D moves the point in both numbers.',
      expFr: 'Arrondis chaque nombre à une valeur simple et proche : $$7.8$$, c’est environ 8, et $$19$$ environ 20, donc $$8 × 20 = 160$$ (la réponse est $$148.2$$). B arrondit les deux nombres beaucoup trop bas. C n’est pas une estimation — c’est le calcul exact sans le point. D déplace le point dans les deux nombres.',
    },
    {
      id: 'a7_money',
      type: 'mcq',
      title: '7. A cup of tea costs 1.65 dollars. How much do 4 cups cost?',
      options: [
        { val: 'A', text: 'A. 6.6 dollars' },
        { val: 'B', text: 'B. 66.00 dollars' },
        { val: 'C', text: 'C. 0.66 dollars' },
        { val: 'D', text: 'D. 6.60 dollars' },
      ],
      correct: 'D',
      expEn: '$$165 × 4 = 660$$, and $$1.65$$ has 2 decimal places: $$6.60$$. Money keeps both decimal places, for the cents: 6.60 dollars. A is the right amount written the wrong way for money. B is 10 times too much. C is less than one cup.',
      expFr: '$$165 × 4 = 660$$, et $$1.65$$ a 2 décimales : $$6.60$$. L’argent garde les deux décimales, pour les cents : 6.60 dollars. A, c’est le bon montant mal écrit pour de l’argent. B est 10 fois trop. C est moins qu’une seule tasse.',
    },
    {
      id: 'a8_story',
      type: 'mcq',
      title: '8. Mr Bowen walks 2.4 km to school and 2.4 km home, every day for 5 days. How far does he walk altogether?',
      options: [
        { val: 'A', text: 'A. 12 km' },
        { val: 'B', text: 'B. 24 km' },
        { val: 'C', text: 'C. 9.4 km' },
        { val: 'D', text: 'D. 2.4 km' },
      ],
      correct: 'B',
      expEn: 'Each day is $$2.4 × 2 = 4.8$$ km. Five days: $$4.8 × 5$$ — $$48 × 5 = 240$$, and 1 decimal place gives $$24.0 = 24$$ km. A forgets the walk home ($$2.4 × 5$$). C adds the numbers ($$2.4 + 2 + 5$$) instead of multiplying. D is one walk only.',
      expFr: 'Chaque jour, c’est $$2.4 × 2 = 4.8$$ km. Cinq jours : $$4.8 × 5$$ — $$48 × 5 = 240$$, et 1 décimale donne $$24.0 = 24$$ km. A oublie le retour à la maison ($$2.4 × 5$$). C additionne les nombres ($$2.4 + 2 + 5$$) au lieu de multiplier. D, c’est un seul trajet.',
    },
  ],
};
