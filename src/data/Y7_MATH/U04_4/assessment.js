// src/data/Y7_MATH/U04_4/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 share equally (count the people), 2 which calculation is the inverse
// check, 3 a 0 in the answer, 4 a 0 before the point, 5 zeros added to finish,
// 6 ÷ a 2-digit number, 7 an answer that never ends, written as money, 8 a
// conjecture tested with a mean. Every distractor is a diagnosis: forgot the
// 0, the point not straight up, stopped too early, divided again, multiplied
// the start, miscounted the people, rounded the wrong way, compared totals.
// No item copies a deck check, a workbook question or a Bus Stop item.
// English / French: an explanation in each, no Vietnamese (meta.vietnamese: false).
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_share',
      type: 'mcq',
      title: '1. Mr Bowen and five friends share a bill of $$31.2$$ dollars equally. Which calculation gives what each person pays?',
      options: [
        { val: 'A', text: 'A. $$31.2 ÷ 5$$' },
        { val: 'B', text: 'B. $$31.2 × 6$$' },
        { val: 'C', text: 'C. $$31.2 ÷ 6$$' },
        { val: 'D', text: 'D. $$31.2 − 6$$' },
      ],
      correct: 'C',
      expEn: 'Mr Bowen and five friends is 6 people, and "share equally" means divide: $$31.2 ÷ 6 = 5.2$$ dollars each. A forgets to count Mr Bowen. B is the cost of six bills. Subtracting does not share anything.',
      expFr: 'M. Bowen et cinq amis, ça fait 6 personnes, et « share equally » veut dire diviser : $$31.2 ÷ 6 = 5.2$$ dollars chacun. A oublie de compter M. Bowen. B est le prix de six additions. Soustraire ne partage rien.',
    },
    {
      id: 'a2_inverse',
      type: 'mcq',
      title: '2. Which calculation checks that $$13.35 ÷ 5 = 2.67$$?',
      options: [
        { val: 'A', text: 'A. $$2.67 × 5$$' },
        { val: 'B', text: 'B. $$13.35 × 5$$' },
        { val: 'C', text: 'C. $$2.67 ÷ 5$$' },
        { val: 'D', text: 'D. $$13.35 − 2.67$$' },
      ],
      correct: 'A',
      expEn: 'The inverse of dividing by 5 is multiplying by 5, and it is the answer that gets multiplied: $$2.67 × 5 = 13.35$$, back to the start. B multiplies the number you started with. C divides again. D subtracts, which is not the inverse of dividing.',
      expFr: 'L’inverse de diviser par 5, c’est multiplier par 5, et c’est la réponse qu’on multiplie : $$2.67 × 5 = 13.35$$, on retrouve le départ. B multiplie le nombre de départ. C divise encore. D soustrait, ce qui n’est pas l’inverse de diviser.',
    },
    {
      id: 'a3_zero',
      type: 'mcq',
      title: '3. Work out $$28.35 ÷ 7$$.',
      options: [
        { val: 'A', text: 'A. $$4.5$$' },
        { val: 'B', text: 'B. $$4.05$$' },
        { val: 'C', text: 'C. $$40.5$$' },
        { val: 'D', text: 'D. $$4.005$$' },
      ],
      correct: 'B',
      expEn: '7 into 28 is 4. 7 into 3 does not go, so write 0 and carry the 3: 35. 7 into 35 is 5. So $$4.05$$ — check: $$4.05 × 7 = 28.35$$. A forgets the 0. C puts the point in the wrong place. D writes one 0 too many.',
      expFr: '28 divisé par 7 donne 4. 3 divisé par 7 ne va pas, alors écris 0 et reporte le 3 : 35. 35 divisé par 7 donne 5. Donc $$4.05$$ — vérifie : $$4.05 × 7 = 28.35$$. A oublie le 0. C met le point au mauvais endroit. D écrit un 0 de trop.',
    },
    {
      id: 'a4_before',
      type: 'mcq',
      title: '4. Work out $$4.68 ÷ 6$$.',
      options: [
        { val: 'A', text: 'A. $$7.8$$' },
        { val: 'B', text: 'B. $$78$$' },
        { val: 'C', text: 'C. $$0.078$$' },
        { val: 'D', text: 'D. $$0.78$$' },
      ],
      correct: 'D',
      expEn: '6 into 4 does not go, so the answer starts with 0, and the point goes straight up after it. 6 into 46 is 7, remainder 4; 6 into 48 is 8. So $$0.78$$. An estimate agrees: 4.68 is less than 6, so the answer is less than 1. A, B and C have the right digits with the point in the wrong place.',
      expFr: '4 divisé par 6 ne va pas, donc la réponse commence par 0, et le point monte tout droit juste après. 46 divisé par 6 donne 7, reste 4 ; 48 divisé par 6 donne 8. Donc $$0.78$$. Une estimation le confirme : 4.68 est plus petit que 6, donc la réponse est plus petite que 1. A, B et C ont les bons chiffres mais le point au mauvais endroit.',
    },
    {
      id: 'a5_zeros',
      type: 'mcq',
      title: '5. Work out $$7.4 ÷ 8$$.',
      options: [
        { val: 'A', text: 'A. $$0.925$$' },
        { val: 'B', text: 'B. $$0.92$$' },
        { val: 'C', text: 'C. $$9.25$$' },
        { val: 'D', text: 'D. $$0.9$$ r 2' },
      ],
      correct: 'A',
      expEn: '8 into 7 does not go: 0, then the point. 8 into 74 is 9, remainder 2. Add a zero: 8 into 20 is 2, remainder 4. Add a zero: 8 into 40 is 5. So $$0.925$$. B stopped before the remainder was 0. C has the point in the wrong place. D stops at a remainder instead of adding a zero.',
      expFr: '7 divisé par 8 ne va pas : 0, puis le point. 74 divisé par 8 donne 9, reste 2. Ajoute un zéro : 20 divisé par 8 donne 2, reste 4. Ajoute un zéro : 40 divisé par 8 donne 5. Donc $$0.925$$. B s’est arrêté avant que le reste soit 0. C a le point au mauvais endroit. D s’arrête sur un reste au lieu d’ajouter un zéro.',
    },
    {
      id: 'a6_table',
      type: 'mcq',
      title: '6. Work out $$59.2 ÷ 16$$.',
      options: [
        { val: 'A', text: 'A. $$37$$' },
        { val: 'B', text: 'B. $$3.07$$' },
        { val: 'C', text: 'C. $$3.7$$' },
        { val: 'D', text: 'D. $$0.37$$' },
      ],
      correct: 'C',
      expEn: 'Write the 16 times table: 16, 32, 48, 64 … 16 into 59 is 3 (that is 48), remainder 11. The point goes straight up. The 11 rides on the 2: 112, and $$7 × 16 = 112$$. So $$3.7$$ — check: $$3.7 × 16 = 59.2$$. A and D have the point in the wrong place. B has a 0 that does not belong: 16 does go into 112.',
      expFr: 'Écris la table de 16 : 16, 32, 48, 64 … 59 divisé par 16 donne 3 (soit 48), reste 11. Le point monte tout droit. Le 11 se reporte sur le 2 : 112, et $$7 × 16 = 112$$. Donc $$3.7$$ — vérifie : $$3.7 × 16 = 59.2$$. A et D ont le point au mauvais endroit. B a un 0 qui n’a rien à faire là : 16 va bien dans 112.',
    },
    {
      id: 'a7_money',
      type: 'mcq',
      title: '7. Nine friends share 20 dollars equally. How much does each one get, written as money?',
      options: [
        { val: 'A', text: 'A. $$2.2$$ dollars' },
        { val: 'B', text: 'B. $$2.23$$ dollars' },
        { val: 'C', text: 'C. $$2.222$$ dollars' },
        { val: 'D', text: 'D. $$2.22$$ dollars' },
      ],
      correct: 'D',
      expEn: '$$20 ÷ 9 = 2.222...$$ and it never ends, so round. Money has 2 decimal places: the 3rd digit is 2, so round down to $$2.22$$ dollars. A has only 1 decimal place. B rounds up when the next digit is 2. C has 3 decimal places, which is not how money is written.',
      expFr: '$$20 ÷ 9 = 2.222...$$ et ça ne finit jamais, donc on arrondit. L’argent a 2 décimales : la 3e décimale est 2, donc on arrondit au-dessous à $$2.22$$ dollars. A n’a qu’une décimale. B arrondit au-dessus alors que le chiffre suivant est 2. C a 3 décimales, ce qui n’est pas une façon d’écrire de l’argent.',
    },
    {
      id: 'a8_mean',
      type: 'mcq',
      title: '8. Sam’s 4 test times add up to $$51.6$$ seconds. Ali’s 3 test times add up to $$38.4$$ seconds. Sam’s conjecture: "My mean time is lower than Ali’s." Is he right?',
      options: [
        { val: 'A', text: 'A. Yes — his mean is $$12.9$$ s and Ali’s is $$12.8$$ s.' },
        { val: 'B', text: 'B. No — his mean is $$12.9$$ s and Ali’s is $$12.8$$ s.' },
        { val: 'C', text: 'C. Yes — his total is bigger, so he is quicker.' },
        { val: 'D', text: 'D. No — Ali’s mean is $$38.4 ÷ 4 = 9.6$$ s.' },
      ],
      correct: 'B',
      expEn: 'Test it with the mean. Sam: $$51.6 ÷ 4 = 12.9$$ s. Ali: $$38.4 ÷ 3 = 12.8$$ s. 12.9 is more than 12.8, so Sam’s mean is not lower — the conjecture is false. A compares the means the wrong way round. C compares the totals, but Sam sat more tests. D divides Ali’s total by the wrong number of tests.',
      expFr: 'Vérifie avec la moyenne. Sam : $$51.6 ÷ 4 = 12.9$$ s. Ali : $$38.4 ÷ 3 = 12.8$$ s. 12.9 est plus grand que 12.8, donc la moyenne de Sam n’est pas plus basse — la conjecture est fausse. A compare les moyennes dans le mauvais sens. C compare les totaux, mais Sam a passé plus de tests. D divise le total d’Ali par un mauvais nombre de tests.',
    },
  ],
};
