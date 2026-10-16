// src/data/Y7_MATH/U04_1/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 saying a decimal in English, 2 which comparison is true, 3 the
// smallest of four, 4 a list largest first, 5 the whole-number part decides,
// 6 a race ("second" counts from the fastest), 7 masses in two units, 8 a
// missing digit. Every distractor is a diagnosis: the decimal part read as a
// whole number, longer is bigger, the whole-number part ignored, the right
// order the wrong way round, counted from the wrong end, units ignored, or the
// near miss next to the boundary. No item copies a deck check, a workbook
// question or a Fill the Zeros item.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_say',
      type: 'mcq',
      title: '1. How do you say $$6.35$$ in English?',
      options: [
        { val: 'A', text: 'A. six point thirty-five' },
        { val: 'B', text: 'B. six point three five' },
        { val: 'C', text: 'C. six comma three five' },
        { val: 'D', text: 'D. sixty-three point five' },
      ],
      correct: 'B',
      expEn: 'Say each digit after the point on its own: six point three five. A reads the decimal part as a whole number, "thirty-five" — the habit that makes $$6.35$$ sound bigger than $$6.4$$. English writes and says a point, not a comma. D is $$63.5$$, a different number.',
      expFr: 'Dis chaque chiffre après le point séparément : six point three five. A lit la partie décimale comme un nombre entier, « thirty-five » — l’habitude qui fait paraître $$6.35$$ plus grand que $$6.4$$. L’anglais écrit et dit un point, pas une virgule. D est $$63.5$$, un autre nombre.',
    },
    {
      id: 'a2_true',
      type: 'mcq',
      title: '2. Which statement is true?',
      options: [
        { val: 'A', text: 'A. $$0.6 < 0.58$$' },
        { val: 'B', text: 'B. $$4.07 > 4.7$$' },
        { val: 'C', text: 'C. $$2.9 > 2.85$$' },
        { val: 'D', text: 'D. $$1.5 = 1.05$$' },
      ],
      correct: 'C',
      expEn: 'Fill with zeros: $$2.90 > 2.85$$, because 9 tenths beat 8 tenths. A is false: $$0.60 > 0.58$$ — .58 is not bigger than .6 just because 58 is more than 6. B is false: $$4.07$$ has 0 tenths, $$4.7$$ has 7. D is false: the zero after the point holds the tenths place, so $$1.05$$ is much smaller than $$1.5$$.',
      expFr: 'Complète avec des zéros : $$2.90 > 2.85$$, car 9 dixièmes l’emportent sur 8 dixièmes. A est faux : $$0.60 > 0.58$$ — .58 n’est pas plus grand que .6 juste parce que 58 est plus grand que 6. B est faux : $$4.07$$ a 0 dixième, $$4.7$$ en a 7. D est faux : le zéro après le point occupe le rang des dixièmes, donc $$1.05$$ est bien plus petit que $$1.5$$.',
    },
    {
      id: 'a3_smallest',
      type: 'mcq',
      title: '3. Which number is the smallest?',
      options: [
        { val: 'A', text: 'A. $$0.307$$' },
        { val: 'B', text: 'B. $$0.37$$' },
        { val: 'C', text: 'C. $$0.3$$' },
        { val: 'D', text: 'D. $$0.073$$' },
      ],
      correct: 'D',
      expEn: 'Fill with zeros: $$0.307$$, $$0.370$$, $$0.300$$, $$0.073$$. Only $$0.073$$ has 0 tenths, so it is the smallest. C is the shortest, but shorter is not smaller: $$0.300$$ has 3 tenths. A and B also have 3 tenths.',
      expFr: 'Complète avec des zéros : $$0.307$$, $$0.370$$, $$0.300$$, $$0.073$$. Seul $$0.073$$ a 0 dixième, donc c’est le plus petit. C est le plus court, mais plus court ne veut pas dire plus petit : $$0.300$$ a 3 dixièmes. A et B ont aussi 3 dixièmes.',
    },
    {
      id: 'a4_order',
      type: 'mcq',
      title: '4. Which list is in order of size, starting with the largest?',
      options: [
        { val: 'A', text: 'A. $$5.2,\\; 5.12,\\; 5.1,\\; 5.02$$' },
        { val: 'B', text: 'B. $$5.12,\\; 5.02,\\; 5.2,\\; 5.1$$' },
        { val: 'C', text: 'C. $$5.02,\\; 5.1,\\; 5.12,\\; 5.2$$' },
        { val: 'D', text: 'D. $$5.2,\\; 5.1,\\; 5.12,\\; 5.02$$' },
      ],
      correct: 'A',
      expEn: 'Fill with zeros: $$5.20$$, $$5.12$$, $$5.10$$, $$5.02$$. Largest first: A. B puts the longer numbers first, but longer is not bigger. C is the right order the wrong way round — it starts with the smallest. D has $$5.1$$ before $$5.12$$, but $$5.10 < 5.12$$.',
      expFr: 'Complète avec des zéros : $$5.20$$, $$5.12$$, $$5.10$$, $$5.02$$. Du plus grand au plus petit : A. B met les nombres les plus longs d’abord, mais plus long ne veut pas dire plus grand. C est le bon ordre à l’envers — il commence par le plus petit. D met $$5.1$$ avant $$5.12$$, mais $$5.10 < 5.12$$.',
    },
    {
      id: 'a5_whole',
      type: 'mcq',
      title: '5. Which number is the largest?',
      options: [
        { val: 'A', text: 'A. $$9.99$$' },
        { val: 'B', text: 'B. $$10.009$$' },
        { val: 'C', text: 'C. $$10.1$$' },
        { val: 'D', text: 'D. $$10.01$$' },
      ],
      correct: 'C',
      expEn: 'Whole-number part first: B, C and D all have 10, and $$9.99$$ has only 9, so A is out however big its decimal part looks. Then fill with zeros: $$10.009$$, $$10.100$$, $$10.010$$. $$10.1$$ has 1 tenth and the others have 0 tenths, so C is the largest. B has the most digits, but longer is not bigger.',
      expFr: 'La partie entière d’abord : B, C et D ont tous 10, et $$9.99$$ n’a que 9, donc A est éliminé, même si sa partie décimale paraît grande. Puis complète avec des zéros : $$10.009$$, $$10.100$$, $$10.010$$. $$10.1$$ a 1 dixième et les autres 0 dixième, donc C est le plus grand. B a le plus de chiffres, mais plus long ne veut pas dire plus grand.',
    },
    {
      id: 'a6_race',
      type: 'mcq',
      title: '6. Four swimmers race 50 m. Their times are: Ana $$31.4$$ s, Bao $$30.85$$ s, Lea $$31.08$$ s and Kim $$30.9$$ s. Who came second?',
      options: [
        { val: 'A', text: 'A. Bao' },
        { val: 'B', text: 'B. Kim' },
        { val: 'C', text: 'C. Lea' },
        { val: 'D', text: 'D. Ana' },
      ],
      correct: 'B',
      expEn: 'The fastest swimmer has the smallest time. In order: $$30.85$$ (Bao), $$30.90$$ (Kim), $$31.08$$ (Lea), $$31.40$$ (Ana). Second is Kim. A is the winner. C is second counting from the slowest — the wrong end. D has the biggest time, so Ana was last.',
      expFr: 'Le nageur le plus rapide a le temps le plus petit. Dans l’ordre : $$30.85$$ (Bao), $$30.90$$ (Kim), $$31.08$$ (Lea), $$31.40$$ (Ana). Deuxième : Kim. A est le gagnant. C est deuxième en comptant depuis le plus lent — le mauvais bout. D a le plus grand temps, donc Ana est dernière.',
    },
    {
      id: 'a7_units',
      type: 'mcq',
      title: '7. Which mass is the heaviest?',
      options: [
        { val: 'A', text: 'A. $$2.3$$ kg' },
        { val: 'B', text: 'B. $$2080$$ g' },
        { val: 'C', text: 'C. $$2.03$$ kg' },
        { val: 'D', text: 'D. $$2208$$ g' },
      ],
      correct: 'A',
      expEn: 'Change them all into grams first: $$2.3$$ kg $$= 2300$$ g and $$2.03$$ kg $$= 2030$$ g. In grams: 2300, 2080, 2030, 2208 — so $$2.3$$ kg is the heaviest. D has the biggest number of the four, but its unit is grams. C has more digits than A, but $$2.03 < 2.30$$.',
      expFr: 'Convertis-les d’abord toutes en grammes : $$2.3$$ kg $$= 2300$$ g et $$2.03$$ kg $$= 2030$$ g. En grammes : 2300, 2080, 2030, 2208 — donc $$2.3$$ kg est la plus lourde. D a le plus grand nombre des quatre, mais son unité est le gramme. C a plus de chiffres que A, mais $$2.03 < 2.30$$.',
    },
    {
      id: 'a8_digit',
      type: 'mcq',
      title: '8. Which digit can go in the box to make $$7.\\square 4 > 7.58$$ true?',
      options: [
        { val: 'A', text: 'A. $$3$$' },
        { val: 'B', text: 'B. $$4$$' },
        { val: 'C', text: 'C. $$5$$' },
        { val: 'D', text: 'D. $$6$$' },
      ],
      correct: 'D',
      expEn: 'The whole-number parts match, so the tenths decide. With 6: $$7.64 > 7.58$$, because 6 tenths beat 5 tenths. With 5 the tenths are equal and $$7.54 < 7.58$$, because 4 hundredths is less than 8 — so C is a near miss. With 3 or 4 the tenths are already smaller.',
      expFr: 'Les parties entières sont égales, donc les dixièmes décident. Avec 6 : $$7.64 > 7.58$$, car 6 dixièmes l’emportent sur 5 dixièmes. Avec 5, les dixièmes sont égaux et $$7.54 < 7.58$$, car 4 centièmes, c’est moins que 8 — donc C est presque juste. Avec 3 ou 4, les dixièmes sont déjà plus petits.',
    },
  ],
};
