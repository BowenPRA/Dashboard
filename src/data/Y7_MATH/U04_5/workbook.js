// src/data/Y7_MATH/U04_5/workbook.js
// Practice for 4.5 Making decimal calculations easier — 12 questions (4 Focus ·
// 5 Practice · 3 Challenge) mixing six answer widgets: drag into targets, a
// typed number, multiple choice, dropdowns in a sentence, typed boxes in a
// worked line, and dragging steps into order with one wrong card.
//
// Every question asks for the easy way as well as the answer, and every
// `solution` says the easy way out loud ("0.25 is a quarter, so ÷ 4").
// Every number is original: not the deck's, not Make It Easy's, not the quiz's
// and not the book's Exercise 4.5. English and French only.

export const workbook = [
  {
    tier: 'Focus',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1',
        type: 'dnd',
        prompt: 'Drag the equivalent fraction to each decimal. One card is left over.',
        promptFr: 'Fais glisser la fraction équivalente vers chaque décimal. Une carte reste en trop.',
        bank: [
          { val: 'six100', text: '$\\frac{6}{100}$' },
          { val: 'six10', text: '$\\frac{6}{10}$' },
          { val: 'six1000', text: '$\\frac{6}{1000}$' },
          { val: 'sf100', text: '$\\frac{75}{100}$' },
        ],
        targets: [
          { id: 't6', title: '$0.6$', titleFr: '$0.6$' },
          { id: 't06', title: '$0.06$', titleFr: '$0.06$' },
          { id: 't75', title: '$0.75$', titleFr: '$0.75$' },
        ],
        correctSets: { t6: ['six10'], t06: ['six100'], t75: ['sf100'] },
        solution: [
          'Say each decimal out loud. $0.6$ is "six tenths": $\\frac{6}{10}$.',
          '$0.06$ is "six hundredths" — the 6 is in the hundredths column: $\\frac{6}{100}$.',
          '$0.75$ ends in the hundredths column: $\\frac{75}{100}$, which is three quarters. $\\frac{6}{1000}$ would be $0.006$.',
        ],
        solutionFr: [
          'Dis chaque décimal à voix haute. $0.6$, c’est « six dixièmes » : $\\frac{6}{10}$.',
          '$0.06$, c’est « six centièmes » — le 6 est dans la colonne des centièmes : $\\frac{6}{100}$.',
          '$0.75$ finit dans la colonne des centièmes : $\\frac{75}{100}$, soit trois quarts. $\\frac{6}{1000}$, ce serait $0.006$.',
        ],
        answer: '$0.6 = \\frac{6}{10}$ · $0.06 = \\frac{6}{100}$ · $0.75 = \\frac{75}{100}$',
        answerFr: '$0.6 = \\frac{6}{10}$ · $0.06 = \\frac{6}{100}$ · $0.75 = \\frac{75}{100}$',
      },
      {
        id: 'f2',
        type: 'mcq',
        prompt: 'Work out $70 × 0.5$.',
        promptFr: 'Calcule $70 × 0.5$.',
        options: [
          { val: 'A', text: '$140$', textFr: '$140$' },
          { val: 'B', text: '$35$', textFr: '$35$' },
          { val: 'C', text: '$14$', textFr: '$14$' },
          { val: 'D', text: '$7.5$', textFr: '$7.5$' },
        ],
        correct: 'B',
        solution: [
          '$0.5$ is a half, so $× 0.5$ is **half of**: $÷ 2$.',
          '$70 ÷ 2 = 35$.',
          'A doubles 70 instead of halving it. C is $70 ÷ 5$ — that is $× 0.2$. D just writes the 0.5 after the 7.',
        ],
        solutionFr: [
          '$0.5$, c’est une moitié, donc $× 0.5$, c’est **la moitié** : $÷ 2$.',
          '$70 ÷ 2 = 35$.',
          'A double 70 au lieu de prendre la moitié. C, c’est $70 ÷ 5$ — ce serait $× 0.2$. D écrit juste le 0.5 après le 7.',
        ],
        answer: 'B',
        answerFr: 'B',
      },
      {
        id: 'f3',
        type: 'inline',
        prompt: 'Work out $30 × 0.6$. Choose from the lists.',
        promptFr: 'Calcule $30 × 0.6$. Choisis dans les listes.',
        textParts: ['$0.6$ is 6 tenths, so first divide by ', ', then multiply by ', '. So $30 × 0.6 =$ ', '.'],
        textPartsFr: ['$0.6$, c’est 6 dixièmes, donc divise d’abord par ', ', puis multiplie par ', '. Donc $30 × 0.6 =$ ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'ten', text: '10', textFr: '10' },
              { val: 'hundred', text: '100', textFr: '100' },
              { val: 'six', text: '6', textFr: '6' },
            ],
            correct: 'ten',
          },
          '2': {
            options: [
              { val: 'six', text: '6', textFr: '6' },
              { val: 'pt6', text: '0.6', textFr: '0.6' },
              { val: 'ten', text: '10', textFr: '10' },
            ],
            correct: 'six',
          },
          '3': {
            options: [
              { val: 'big', text: '180', textFr: '180' },
              { val: 'ok', text: '18', textFr: '18' },
              { val: 'small', text: '1.8', textFr: '1.8' },
              { val: 'div', text: '5', textFr: '5' },
            ],
            correct: 'ok',
          },
        },
        solution: [
          '$0.6 = \\frac{6}{10}$, so $× 0.6$ is $÷ 10$, then $× 6$.',
          '$30 ÷ 10 = 3$, and $3 × 6 = 18$.',
          '18 is smaller than 30, as it must be. 180 is $30 × 6$ (the point forgotten), 1.8 divides by 100, and 5 is $30 ÷ 6$.',
        ],
        solutionFr: [
          '$0.6 = \\frac{6}{10}$, donc $× 0.6$, c’est $÷ 10$, puis $× 6$.',
          '$30 ÷ 10 = 3$, et $3 × 6 = 18$.',
          '18 est plus petit que 30, comme il se doit. 180, c’est $30 × 6$ (le point oublié), 1.8 divise par 100, et 5, c’est $30 ÷ 6$.',
        ],
        answer: '10; 6; 18',
        answerFr: '10 ; 6 ; 18',
      },
      {
        id: 'f4',
        prompt: 'Work out $48 × 0.25$.',
        promptFr: 'Calcule $48 × 0.25$.',
        solution: [
          '$0.25$ is a quarter, so $× 0.25$ is **a quarter of**: $÷ 4$ — not $÷ 25$.',
          '$48 ÷ 4 = 12$.',
        ],
        solutionFr: [
          '$0.25$, c’est un quart, donc $× 0.25$, c’est **le quart** : $÷ 4$ — pas $÷ 25$.',
          '$48 ÷ 4 = 12$.',
        ],
        answer: '12',
        answerFr: '12',
      },
    ],
  },
  {
    tier: 'Practice',
    tierFr: 'Entraînement',
    questions: [
      {
        id: 'p1',
        type: 'fill_blank',
        prompt: 'Work out $4.7 × 9$ from $× 10$. Fill in the boxes.',
        promptFr: 'Calcule $4.7 × 9$ à partir de $× 10$. Complète les cases.',
        textParts: ['Ten lots: $4.7 × 10 =$ ', '. Nine lots is one lot fewer: take away ', '. So $4.7 × 9 =$ ', '.'],
        textPartsFr: ['Dix fois : $4.7 × 10 =$ ', '. Neuf fois, c’est une fois de moins : enlève ', '. Donc $4.7 × 9 =$ ', '.'],
        blanks: {
          '1': { correct: '47', width: 5 },
          '2': { correct: '4.7', width: 5 },
          '3': { correct: '42.3', width: 6 },
        },
        solution: [
          '$4.7 × 10 = 47$ — the digits move one place left.',
          '$× 9$ is one lot fewer than $× 10$, so take away one lot of 4.7 — not 1, and not just 4.',
          '$47 − 4.7 = 42.3$.',
        ],
        solutionFr: [
          '$4.7 × 10 = 47$ — les chiffres se déplacent d’une colonne vers la gauche.',
          '$× 9$, c’est une fois de moins que $× 10$, donc enlève une fois 4.7 — pas 1, et pas seulement 4.',
          '$47 − 4.7 = 42.3$.',
        ],
        answer: '47; 4.7; 42.3',
        answerFr: '47 ; 4.7 ; 42.3',
      },
      {
        id: 'p2',
        prompt: 'Work out $3.6 × 11$.',
        promptFr: 'Calcule $3.6 × 11$.',
        solution: [
          'Ten lots: $3.6 × 10 = 36$.',
          '$× 11$ is one lot more: $36 + 3.6 = 39.6$.',
        ],
        solutionFr: [
          'Dix fois : $3.6 × 10 = 36$.',
          '$× 11$, c’est une fois de plus : $36 + 3.6 = 39.6$.',
        ],
        answer: '39.6',
        answerFr: '39.6',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'Partition $7.3 × 5$. What is the answer?',
        promptFr: 'Décompose $7.3 × 5$. Quelle est la réponse ?',
        options: [
          { val: 'A', text: '$35.3$', textFr: '$35.3$' },
          { val: 'B', text: '$50$', textFr: '$50$' },
          { val: 'C', text: '$36.5$', textFr: '$36.5$' },
          { val: 'D', text: '$35.15$', textFr: '$35.15$' },
        ],
        correct: 'C',
        solution: [
          '$7.3 = 7 + 0.3$. Multiply each part by 5: $7 × 5 = 35$ and $0.3 × 5 = 1.5$.',
          'Add the parts: $35 + 1.5 = 36.5$.',
          'A forgot to multiply the 0.3. B used 3 instead of 0.3. D wrote 15 tenths as 0.15.',
        ],
        solutionFr: [
          '$7.3 = 7 + 0.3$. Multiplie chaque partie par 5 : $7 × 5 = 35$ et $0.3 × 5 = 1.5$.',
          'Additionne les parties : $35 + 1.5 = 36.5$.',
          'A a oublié de multiplier le 0.3. B a pris 3 au lieu de 0.3. D a écrit 15 dixièmes comme 0.15.',
        ],
        answer: 'C',
        answerFr: 'C',
      },
      {
        id: 'p4',
        type: 'order',
        prompt: 'Mr Bowen buys 9 pens. Each pen costs 1.35 dollars. Drag the steps into order. One card is a mistake — leave it out.',
        promptFr: 'M. Bowen achète 9 stylos. Chaque stylo coûte 1.35 dollars. Range les étapes dans l’ordre. Une carte est une erreur — laisse-la de côté.',
        bank: [
          { val: 'ten', text: 'Ten lots: $1.35 × 10 = 13.5$', textFr: 'Dix fois : $1.35 × 10 = 13.5$' },
          { val: 'plus', text: '$1.35 + 9 = 10.35$ dollars', textFr: '$1.35 + 9 = 10.35$ dollars' },
          { val: 'read', text: '9 pens at 1.35 dollars each is $1.35 × 9$', textFr: '9 stylos à 1.35 dollars chacun, c’est $1.35 × 9$' },
          { val: 'ans', text: 'He pays 12.15 dollars.', textFr: 'Il paie 12.15 dollars.' },
          { val: 'lot', text: 'One lot fewer: $13.5 − 1.35 = 12.15$', textFr: 'Une fois de moins : $13.5 − 1.35 = 12.15$' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleFr: 'Du premier au dernier' }],
        correctSets: { seq: ['read', 'ten', 'lot', 'ans'] },
        solution: [
          '"Each" with 9 of them means 9 lots of 1.35: $1.35 × 9$ — not $1.35 + 9$.',
          'Make it easy: $1.35 × 10 = 13.5$, then take one lot away.',
          '$13.5 − 1.35 = 12.15$, so he pays 12.15 dollars.',
        ],
        solutionFr: [
          '« Each » avec 9 articles veut dire 9 fois 1.35 : $1.35 × 9$ — pas $1.35 + 9$.',
          'Rends-le facile : $1.35 × 10 = 13.5$, puis enlève une fois le nombre.',
          '$13.5 − 1.35 = 12.15$, donc il paie 12.15 dollars.',
        ],
        answer: '$1.35 × 9$ → $13.5$ → $13.5 − 1.35$ → 12.15 dollars',
        answerFr: '$1.35 × 9$ → $13.5$ → $13.5 − 1.35$ → 12.15 dollars',
      },
      {
        id: 'p5',
        type: 'dnd',
        prompt: 'Four of these calculations have the same answer, 40. Drag each one to the right box.',
        promptFr: 'Quatre de ces calculs ont la même réponse, 40. Fais glisser chacun dans la bonne case.',
        bank: [
          { val: 'a', text: '$80 × 0.5$' },
          { val: 'b', text: '$40 × 0.1$' },
          { val: 'c', text: '$160 × 0.25$' },
          { val: 'd', text: '$400 × 0.1$' },
          { val: 'e', text: '$20 × 0.5$' },
          { val: 'f', text: '$200 × 0.2$' },
        ],
        targets: [
          { id: 'forty', title: 'equals 40', titleFr: 'égal à 40' },
          { id: 'not', title: 'does not equal 40', titleFr: 'pas égal à 40' },
        ],
        correctSets: { forty: ['a', 'c', 'd', 'f'], not: ['b', 'e'] },
        solution: [
          'Half of 80 is 40. A quarter of 160 is 40. A tenth of 400 is 40. $200 ÷ 10 × 2 = 40$.',
          'A tenth of 40 is only 4, and half of 20 is 10.',
          'Each one is a different easy way to the same answer — that is what "equivalent calculations" means.',
        ],
        solutionFr: [
          'La moitié de 80, c’est 40. Le quart de 160, c’est 40. Le dixième de 400, c’est 40. $200 ÷ 10 × 2 = 40$.',
          'Le dixième de 40, c’est seulement 4, et la moitié de 20, c’est 10.',
          'Chacun est un moyen facile différent vers la même réponse — c’est ce que veut dire « calculs équivalents ».',
        ],
        answer: '40: $80 × 0.5$, $160 × 0.25$, $400 × 0.1$, $200 × 0.2$ · not 40: $40 × 0.1$, $20 × 0.5$',
        answerFr: '40 : $80 × 0.5$, $160 × 0.25$, $400 × 0.1$, $200 × 0.2$ · pas 40 : $40 × 0.1$, $20 × 0.5$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1',
        prompt: 'A tin holds 2.5 litres of paint. Mr Bowen paints a wall with 0.4 of the tin. How many litres does he use?',
        promptFr: 'Un pot contient 2.5 litres de peinture. M. Bowen peint un mur avec 0.4 du pot. Combien de litres utilise-t-il ?',
        solution: [
          '"0.4 of" means $× 0.4$: $2.5 × 0.4$.',
          '$0.4$ is 4 tenths, so divide by 10 first: $2.5 ÷ 10 = 0.25$. Then $0.25 × 4 = 1$.',
          'He uses 1 litre — less than the 2.5 in the tin, as it must be.',
        ],
        solutionFr: [
          '« 0.4 of » veut dire $× 0.4$ : $2.5 × 0.4$.',
          '$0.4$, c’est 4 dixièmes, donc divise d’abord par 10 : $2.5 ÷ 10 = 0.25$. Puis $0.25 × 4 = 1$.',
          'Il utilise 1 litre — moins que les 2.5 du pot, comme il se doit.',
        ],
        answer: '1',
        answerFr: '1',
        accept: ['1 litre', '1 l', '1l', '1 litres'],
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: 'Which of these is **not** equal to $4.8 × 9$?',
        promptFr: 'Lequel de ces calculs n’est **pas** égal à $4.8 × 9$ ?',
        options: [
          { val: 'A', text: '$48 − 4.8$', textFr: '$48 − 4.8$' },
          { val: 'B', text: '$4.8 × 10 − 4.8$', textFr: '$4.8 × 10 − 4.8$' },
          { val: 'C', text: '$43.2$', textFr: '$43.2$' },
          { val: 'D', text: '$4.8 × 10 − 1$', textFr: '$4.8 × 10 − 1$' },
        ],
        correct: 'D',
        solution: [
          '$4.8 × 9$ is ten lots of 4.8, then one lot fewer: $4.8 × 10 − 4.8 = 48 − 4.8 = 43.2$.',
          'So A, B and C are all the same value.',
          'D takes away 1, not one lot of 4.8: it gives 47.',
        ],
        solutionFr: [
          '$4.8 × 9$, c’est dix fois 4.8, puis une fois de moins : $4.8 × 10 − 4.8 = 48 − 4.8 = 43.2$.',
          'Donc A, B et C ont tous la même valeur.',
          'D enlève 1, pas une fois 4.8 : cela donne 47.',
        ],
        answer: 'D',
        answerFr: 'D',
      },
      {
        id: 'c3',
        type: 'inline',
        prompt: 'Lan says, "Multiplying always makes a number bigger." Test her idea on $36 × 0.75$.',
        promptFr: 'Lan dit : « Multiplier rend toujours un nombre plus grand. » Teste son idée avec $36 × 0.75$.',
        textParts: ['$0.75$ is ', ' than 1, so $36 × 0.75$ is ', ' than 36. $0.75$ is three quarters, so $36 × 0.75 = 36 ÷ 4 × 3 =$ ', '.'],
        textPartsFr: ['$0.75$ est ', ' que 1, donc $36 × 0.75$ est ', ' que 36. $0.75$, c’est trois quarts, donc $36 × 0.75 = 36 ÷ 4 × 3 =$ ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'less', text: 'less', textFr: 'plus petit' },
              { val: 'more', text: 'more', textFr: 'plus grand' },
            ],
            correct: 'less',
          },
          '2': {
            options: [
              { val: 'smaller', text: 'smaller', textFr: 'plus petit' },
              { val: 'bigger', text: 'bigger', textFr: 'plus grand' },
            ],
            correct: 'smaller',
          },
          '3': {
            options: [
              { val: 'ok', text: '27', textFr: '27' },
              { val: 'q', text: '9', textFr: '9' },
              { val: 'big', text: '48', textFr: '48' },
              { val: 'x', text: '270', textFr: '270' },
            ],
            correct: 'ok',
          },
        },
        solution: [
          '$0.75$ is less than 1, so $× 0.75$ takes only part of 36: the answer is smaller. Lan is wrong.',
          'Three quarters: one quarter of 36 is $36 ÷ 4 = 9$, and three quarters is $9 × 3 = 27$.',
          '9 is only one quarter. 48 adds a quarter instead of taking three of them.',
        ],
        solutionFr: [
          '$0.75$ est plus petit que 1, donc $× 0.75$ ne prend qu’une partie de 36 : la réponse est plus petite. Lan a tort.',
          'Trois quarts : un quart de 36, c’est $36 ÷ 4 = 9$, et trois quarts, $9 × 3 = 27$.',
          '9, ce n’est qu’un quart. 48 ajoute un quart au lieu d’en prendre trois.',
        ],
        answer: 'less; smaller; 27',
        answerFr: 'plus petit ; plus petit ; 27',
      },
    ],
  },
];
