// src/data/Y7_MATH/U04_2/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 "change" in a shop, 2 which is a mental method, 3 an addition with a
// carry and different numbers of places, 4 a whole number minus a decimal,
// 5 "how much longer", 6 a mental subtraction (take 4, give 0.1 back), 7 a
// missing number found by adding, 8 a two-step story. Every distractor is a
// diagnosis: added instead of subtracted, a forgotten exchange, a forgotten
// carry, a column worked upside down, lined up on the right, the 0.1 not given
// back, stopped after one step. No item copies a deck check, a workbook
// question or a Line Up the Points item. English and French explanations.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_change',
      type: 'mcq',
      title: '1. A cap costs $$6.45$$ dollars. Kim pays with a 10-dollar note. How much change does she get?',
      options: [
        { val: 'A', text: 'A. $$3.55$$ dollars' },
        { val: 'B', text: 'B. $$4.65$$ dollars' },
        { val: 'C', text: 'C. $$16.45$$ dollars' },
        { val: 'D', text: 'D. $$3.65$$ dollars' },
      ],
      correct: 'A',
      expEn: 'Change means subtract: $$10.00 − 6.45$$. The hundredths need a ten, so the tens give 1, and the ones and the tenths each get 10 and keep 9. $$10 − 5 = 5$$, $$9 − 4 = 5$$, $$9 − 6 = 3$$: 3.55 dollars. D forgets that the tenths gave 1 away, B forgets the ones did too, and C adds.',
      expFr: 'Change (la monnaie) veut dire soustraire : $$10.00 − 6.45$$. Les centièmes ont besoin d’une dizaine, donc les dizaines donnent 1, et les unités et les dixièmes reçoivent 10 et gardent 9. $$10 − 5 = 5$$, $$9 − 4 = 5$$, $$9 − 6 = 3$$ : 3.55 dollars. D oublie que les dixièmes ont donné 1, B oublie aussi les unités, et C additionne.',
    },
    {
      id: 'a2_mental',
      type: 'mcq',
      title: '2. Which of these is a mental method for $$7.6 + 3.9$$?',
      options: [
        { val: 'A', text: 'A. $$7.6 + 4 + 0.1$$' },
        { val: 'B', text: 'B. $$7.6 + 4 − 0.1$$' },
        { val: 'C', text: 'C. $$7.6 + 3 − 0.9$$' },
        { val: 'D', text: 'D. $$7.6 − 4 + 0.1$$' },
      ],
      correct: 'B',
      expEn: '3.9 is nearly 4. Adding 4 adds 0.1 too much, so take it off: $$7.6 + 4 − 0.1 = 11.5$$. A adds the 0.1 again instead of taking it off. C should ADD the 0.9. D subtracts.',
      expFr: '3.9, c’est presque 4. Ajouter 4 ajoute 0.1 de trop, donc enlève-le : $$7.6 + 4 − 0.1 = 11.5$$. A ajoute encore 0.1 au lieu de l’enlever. C devrait AJOUTER 0.9. D soustrait.',
    },
    {
      id: 'a3_carry',
      type: 'mcq',
      title: '3. Work out $$6.48 + 2.7$$.',
      options: [
        { val: 'A', text: 'A. $$8.18$$' },
        { val: 'B', text: 'B. $$6.75$$' },
        { val: 'C', text: 'C. $$9.18$$' },
        { val: 'D', text: 'D. $$91.8$$' },
      ],
      correct: 'C',
      expEn: 'Line up the points: $$6.48 + 2.70$$. Hundredths: 8. Tenths: 4 + 7 = 11 — write 1, carry 1. Ones: 6 + 2 + 1 = 9. So 9.18. A forgets the carry. B lines up the last digits, so the 7 tenths are added as 7 hundredths. D puts the point in the wrong place: an estimate, 6 + 3 = 9, shows it.',
      expFr: 'Aligne les points : $$6.48 + 2.70$$. Centièmes : 8. Dixièmes : 4 + 7 = 11 — écris 1, retenue de 1. Unités : 6 + 2 + 1 = 9. Donc 9.18. A oublie la retenue. B aligne les derniers chiffres, donc les 7 dixièmes sont ajoutés comme 7 centièmes. D met le point au mauvais endroit : une estimation, 6 + 3 = 9, le montre.',
    },
    {
      id: 'a4_whole',
      type: 'mcq',
      title: '4. Work out $$7 − 2.36$$.',
      options: [
        { val: 'A', text: 'A. $$5.36$$' },
        { val: 'B', text: 'B. $$4.74$$' },
        { val: 'C', text: 'C. $$5.64$$' },
        { val: 'D', text: 'D. $$4.64$$' },
      ],
      correct: 'D',
      expEn: 'Write 7 as 7.00. The hundredths need a ten: the ones give 1 (7 becomes 6), the tenths get 10 and keep 9, the hundredths get 10. $$10 − 6 = 4$$, $$9 − 3 = 6$$, $$6 − 2 = 4$$: 4.64. B forgets that the tenths gave 1 away, C forgets that the ones did, and A works every column upside down.',
      expFr: 'Écris 7 comme 7.00. Les centièmes ont besoin d’une dizaine : les unités donnent 1 (7 devient 6), les dixièmes reçoivent 10 et gardent 9, les centièmes reçoivent 10. $$10 − 6 = 4$$, $$9 − 3 = 6$$, $$6 − 2 = 4$$ : 4.64. B oublie que les dixièmes ont donné 1, C oublie que les unités l’ont fait, et A calcule chaque colonne à l’envers.',
    },
    {
      id: 'a5_longer',
      type: 'mcq',
      title: '5. A green ribbon is $$2.4$$ m long. A red ribbon is $$1.75$$ m long. How much longer is the green ribbon?',
      options: [
        { val: 'A', text: 'A. $$4.15$$ m' },
        { val: 'B', text: 'B. $$0.65$$ m' },
        { val: 'C', text: 'C. $$0.75$$ m' },
        { val: 'D', text: 'D. $$1.35$$ m' },
      ],
      correct: 'B',
      expEn: '"How much longer" asks for the difference: $$2.40 − 1.75$$. Hundredths: the tenths give 1, $$10 − 5 = 5$$. Tenths: now 3, so the ones give 1: $$13 − 7 = 6$$. Ones: $$1 − 1 = 0$$. So 0.65 m. A adds. C forgets that the tenths gave 1 away. D works the columns upside down.',
      expFr: '« How much longer » (de combien plus long) demande la différence : $$2.40 − 1.75$$. Centièmes : les dixièmes donnent 1, $$10 − 5 = 5$$. Dixièmes : il en reste 3, donc les unités donnent 1 : $$13 − 7 = 6$$. Unités : $$1 − 1 = 0$$. Donc 0.65 m. A additionne. C oublie que les dixièmes ont donné 1. D calcule les colonnes à l’envers.',
    },
    {
      id: 'a6_give_back',
      type: 'mcq',
      title: '6. Use a mental method to work out $$9.2 − 3.9$$.',
      options: [
        { val: 'A', text: 'A. $$5.1$$' },
        { val: 'B', text: 'B. $$5.2$$' },
        { val: 'C', text: 'C. $$5.3$$' },
        { val: 'D', text: 'D. $$6.7$$' },
      ],
      correct: 'C',
      expEn: '3.9 is nearly 4. $$9.2 − 4 = 5.2$$ — but that took away 0.1 too much, so give it back: 5.3. B forgets to give it back, A takes it away again, and D works the tenths upside down (9 − 2).',
      expFr: '3.9, c’est presque 4. $$9.2 − 4 = 5.2$$ — mais on a enlevé 0.1 de trop, donc rends-le : 5.3. B oublie de le rendre, A l’enlève encore, et D calcule les dixièmes à l’envers (9 − 2).',
    },
    {
      id: 'a7_missing',
      type: 'mcq',
      title: '7. What number goes in the box? $$\\square − 3.48 = 5.7$$',
      options: [
        { val: 'A', text: 'A. $$9.18$$' },
        { val: 'B', text: 'B. $$2.22$$' },
        { val: 'C', text: 'C. $$8.18$$' },
        { val: 'D', text: 'D. $$4.05$$' },
      ],
      correct: 'A',
      expEn: 'Adding undoes subtracting, so the missing number is $$5.7 + 3.48$$. Line up the points: $$5.70 + 3.48$$. 0 + 8 = 8, 7 + 4 = 11 (write 1, carry 1), 5 + 3 + 1 = 9: 9.18. Check: $$9.18 − 3.48 = 5.7$$. B subtracts instead. C forgets the carry. D lines up the last digits.',
      expFr: 'L’addition défait la soustraction, donc le nombre manquant est $$5.7 + 3.48$$. Aligne les points : $$5.70 + 3.48$$. 0 + 8 = 8, 7 + 4 = 11 (écris 1, retenue de 1), 5 + 3 + 1 = 9 : 9.18. Vérifie : $$9.18 − 3.48 = 5.7$$. B soustrait au lieu d’additionner. C oublie la retenue. D aligne les derniers chiffres.',
    },
    {
      id: 'a8_two_steps',
      type: 'mcq',
      title: '8. Nam has 20 dollars. He buys a book for $$8.75$$ dollars and a pen for $$6.4$$ dollars. How much money does he have left?',
      options: [
        { val: 'A', text: 'A. $$15.15$$ dollars' },
        { val: 'B', text: 'B. $$5.85$$ dollars' },
        { val: 'C', text: 'C. $$10.61$$ dollars' },
        { val: 'D', text: 'D. $$4.85$$ dollars' },
      ],
      correct: 'D',
      expEn: 'Two steps. The cost: $$8.75 + 6.40 = 15.15$$. What is left: $$20.00 − 15.15 = 4.85$$ dollars. Check: $$4.85 + 15.15 = 20$$. A stops after the first step. B forgets that the ones gave 1 away. C lines up the last digits of 8.75 and 6.4 before it adds.',
      expFr: 'Deux étapes. Le prix : $$8.75 + 6.40 = 15.15$$. Ce qui reste : $$20.00 − 15.15 = 4.85$$ dollars. Vérifie : $$4.85 + 15.15 = 20$$. A s’arrête après la première étape. B oublie que les unités ont donné 1. C aligne les derniers chiffres de 8.75 et 6.4 avant d’additionner.',
    },
  ],
};
