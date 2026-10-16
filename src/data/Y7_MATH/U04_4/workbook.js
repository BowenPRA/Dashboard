// src/data/Y7_MATH/U04_4/workbook.js
// Practice for 4.4 Dividing decimals — 12 questions (4 Focus · 5 Practice ·
// 3 Challenge) mixing six answer widgets: a typed number, multiple choice,
// dropdowns in a sentence, drag into targets, typed boxes in a worked
// division, and dragging the steps into order with one wrong card.
//
// The shapes follow the book's 4.4: a decimal ÷ a 1-digit and a 2-digit
// number, a 0 in the answer, zeros added to finish, the inverse check, an
// estimate to place the point, sharing money and measures equally, and a
// conjecture tested with a mean (the Q14-style Challenge). Every number is
// original: not the deck's, not Bus Stop's, not the quiz's and not the
// Workbook's (pp. 59–61). English / French only.

export const workbook = [
  {
    tier: 'Focus',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1',
        prompt: 'Work out $7.38 ÷ 3$.',
        promptFr: 'Calcule $7.38 ÷ 3$.',
        solution: [
          '3 into 7 is 2, remainder 1. The point goes straight up.',
          'The 1 rides on the 3: 13. 3 into 13 is 4, remainder 1.',
          'The 1 rides on the 8: 18. 3 into 18 is 6. So $7.38 ÷ 3 = 2.46$ — check: $2.46 × 3 = 7.38$.',
        ],
        solutionFr: [
          '7 divisé par 3 donne 2, reste 1. Le point monte tout droit.',
          'Le 1 se reporte sur le 3 : 13. 13 divisé par 3 donne 4, reste 1.',
          'Le 1 se reporte sur le 8 : 18. 18 divisé par 3 donne 6. Donc $7.38 ÷ 3 = 2.46$ — vérifie : $2.46 × 3 = 7.38$.',
        ],
        answer: '2.46',
        answerFr: '2.46',
      },
      {
        id: 'f2',
        type: 'mcq',
        prompt: 'Work out $12.48 ÷ 6$.',
        promptFr: 'Calcule $12.48 ÷ 6$.',
        options: [
          { val: 'A', text: '$2.8$', textFr: '$2.8$' },
          { val: 'B', text: '$20.8$', textFr: '$20.8$' },
          { val: 'C', text: '$2.08$', textFr: '$2.08$' },
          { val: 'D', text: '$2.008$', textFr: '$2.008$' },
        ],
        correct: 'C',
        solution: [
          '6 into 12 is 2. The point goes straight up.',
          '6 into 4 does not go, so write 0 in the answer and carry the 4: 48.',
          '6 into 48 is 8. So $12.48 ÷ 6 = 2.08$. A forgot the 0, B has the point in the wrong place, and D writes one 0 too many.',
        ],
        solutionFr: [
          '12 divisé par 6 donne 2. Le point monte tout droit.',
          '4 divisé par 6 ne va pas, alors écris 0 dans la réponse et reporte le 4 : 48.',
          '48 divisé par 6 donne 8. Donc $12.48 ÷ 6 = 2.08$. A a oublié le 0, B a le point au mauvais endroit, et D écrit un 0 de trop.',
        ],
        answer: 'C',
        answerFr: 'C',
      },
      {
        id: 'f3',
        type: 'inline',
        prompt: 'Check $5.64 ÷ 4 = 1.41$ with the inverse calculation. Choose from the lists.',
        promptFr: 'Vérifie $5.64 ÷ 4 = 1.41$ avec le calcul inverse. Choisis dans les listes.',
        textParts: ['To check it, work out ', '. That gives ', ', so the answer $1.41$ is ', '.'],
        textPartsFr: ['Pour vérifier, calcule ', '. Cela donne ', ', donc la réponse $1.41$ est ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'start', text: '5.64 × 4', textFr: '5.64 × 4' },
              { val: 'back', text: '1.41 × 4', textFr: '1.41 × 4' },
              { val: 'again', text: '1.41 ÷ 4', textFr: '1.41 ÷ 4' },
            ],
            correct: 'back',
          },
          '2': {
            options: [
              { val: 'big', text: '22.56', textFr: '22.56' },
              { val: 'small', text: '0.3525', textFr: '0.3525' },
              { val: 'start', text: '5.64', textFr: '5.64' },
            ],
            correct: 'start',
          },
          '3': {
            options: [
              { val: 'right', text: 'right', textFr: 'juste' },
              { val: 'wrong', text: 'wrong', textFr: 'faux' },
            ],
            correct: 'right',
          },
        },
        solution: [
          'The inverse of ÷ 4 is × 4, and it is the answer that is multiplied: $1.41 × 4$.',
          '$1.41 × 4 = 5.64$ — back to the number you started with.',
          'So $1.41$ is right. ($5.64 × 4$ multiplies the start, and $1.41 ÷ 4$ divides again.)',
        ],
        solutionFr: [
          'L’inverse de ÷ 4, c’est × 4, et c’est la réponse qu’on multiplie : $1.41 × 4$.',
          '$1.41 × 4 = 5.64$ — on retrouve le nombre de départ.',
          'Donc $1.41$ est juste. ($5.64 × 4$ multiplie le départ, et $1.41 ÷ 4$ divise encore.)',
        ],
        answer: '$1.41 × 4$; $5.64$; right',
        answerFr: '$1.41 × 4$; $5.64$; juste',
      },
      {
        id: 'f4',
        type: 'dnd',
        prompt: 'Every answer has the digits 4 and 9. Estimate, then drag the right answer to each division. One card is left over.',
        promptFr: 'Chaque réponse a les chiffres 4 et 9. Estime, puis fais glisser la bonne réponse vers chaque division. Une carte est en trop.',
        bank: [
          { val: '0.49', text: '$0.49$' },
          { val: '49', text: '$49$' },
          { val: '0.049', text: '$0.049$' },
          { val: '4.9', text: '$4.9$' },
        ],
        targets: [
          { id: 't1', title: '$19.6 ÷ 4$', titleFr: '$19.6 ÷ 4$' },
          { id: 't2', title: '$1.96 ÷ 4$', titleFr: '$1.96 ÷ 4$' },
          { id: 't3', title: '$196 ÷ 4$', titleFr: '$196 ÷ 4$' },
        ],
        correctSets: { t1: ['4.9'], t2: ['0.49'], t3: ['49'] },
        solution: [
          '$19.6 ÷ 4$ is about $20 ÷ 4 = 5$, so it is $4.9$.',
          '$1.96 ÷ 4$ is about $2 ÷ 4 = 0.5$, so it is $0.49$.',
          '$196 ÷ 4$ is about $200 ÷ 4 = 50$, so it is $49$. $0.049$ is left over.',
        ],
        solutionFr: [
          '$19.6 ÷ 4$ vaut environ $20 ÷ 4 = 5$, donc c’est $4.9$.',
          '$1.96 ÷ 4$ vaut environ $2 ÷ 4 = 0.5$, donc c’est $0.49$.',
          '$196 ÷ 4$ vaut environ $200 ÷ 4 = 50$, donc c’est $49$. $0.049$ est en trop.',
        ],
        answer: '$4.9$ · $0.49$ · $49$',
        answerFr: '$4.9$ · $0.49$ · $49$',
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
        prompt: 'Work out $5.32 ÷ 7$ by short division. Fill in the boxes.',
        promptFr: 'Calcule $5.32 ÷ 7$ par division courte. Complète les cases.',
        textParts: ['7 into 5 does not go, so the digit on top is ', ', and the 5 is carried: 53. 7 into 53 is 7, remainder ', '. That remainder rides on the 2, and 7 goes into the number they make exactly 6 times. So $5.32 ÷ 7 =$ ', '.'],
        textPartsFr: ['5 divisé par 7 ne va pas, donc le chiffre du haut est ', ', et le 5 est reporté : 53. 53 divisé par 7 donne 7, reste ', '. Ce reste se reporte sur le 2, et 7 va exactement 6 fois dans le nombre obtenu. Donc $5.32 ÷ 7 =$ ', '.'],
        blanks: {
          '1': { correct: '0', width: 4 },
          '2': { correct: '4', width: 4 },
          '3': { correct: '0.76', width: 6 },
        },
        solution: [
          '7 into 5 does not go, so write 0 on top — and the point straight up after it. Carry the 5: 53.',
          '7 into 53 is 7, remainder 4. The 4 rides on the 2: 42.',
          '7 into 42 is 6. So $5.32 ÷ 7 = 0.76$ — check: $0.76 × 7 = 5.32$.',
        ],
        solutionFr: [
          '5 divisé par 7 ne va pas, alors écris 0 en haut — et le point juste après, tout droit. Reporte le 5 : 53.',
          '53 divisé par 7 donne 7, reste 4. Le 4 se reporte sur le 2 : 42.',
          '42 divisé par 7 donne 6. Donc $5.32 ÷ 7 = 0.76$ — vérifie : $0.76 × 7 = 5.32$.',
        ],
        answer: '0; 4; $0.76$',
        answerFr: '0; 4; $0.76$',
      },
      {
        id: 'p2',
        prompt: 'Work out $9.3 ÷ 6$. Add zeros after the point until the remainder is 0.',
        promptFr: 'Calcule $9.3 ÷ 6$. Ajoute des zéros après le point jusqu’à ce que le reste soit 0.',
        solution: [
          '6 into 9 is 1, remainder 3. The point goes straight up.',
          'The 3 rides on the 3: 33. 6 into 33 is 5, remainder 3.',
          'Add a zero: 30. 6 into 30 is 5, remainder 0. So $9.3 ÷ 6 = 1.55$ — check: $1.55 × 6 = 9.3$.',
        ],
        solutionFr: [
          '9 divisé par 6 donne 1, reste 3. Le point monte tout droit.',
          'Le 3 se reporte sur le 3 : 33. 33 divisé par 6 donne 5, reste 3.',
          'Ajoute un zéro : 30. 30 divisé par 6 donne 5, reste 0. Donc $9.3 ÷ 6 = 1.55$ — vérifie : $1.55 × 6 = 9.3$.',
        ],
        answer: '1.55',
        answerFr: '1.55',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'Work out $81.6 ÷ 17$. Write the 17 times table first.',
        promptFr: 'Calcule $81.6 ÷ 17$. Écris d’abord la table de 17.',
        options: [
          { val: 'A', text: '$48$', textFr: '$48$' },
          { val: 'B', text: '$4.8$', textFr: '$4.8$' },
          { val: 'C', text: '$0.48$', textFr: '$0.48$' },
          { val: 'D', text: '$4.08$', textFr: '$4.08$' },
        ],
        correct: 'B',
        solution: [
          'The 17 times table: 17, 34, 51, 68, 85, 102, 119, 136, 153.',
          '17 into 81 is 4 (that is 68), remainder 13. The point goes straight up. The 13 rides on the 6: 136.',
          '$136 = 8 × 17$, so the next digit is 8: $4.8$ — check: $4.8 × 17 = 81.6$. A and C have the point in the wrong place, and D has a 0 that does not belong.',
        ],
        solutionFr: [
          'La table de 17 : 17, 34, 51, 68, 85, 102, 119, 136, 153.',
          '81 divisé par 17 donne 4 (soit 68), reste 13. Le point monte tout droit. Le 13 se reporte sur le 6 : 136.',
          '$136 = 8 × 17$, donc le chiffre suivant est 8 : $4.8$ — vérifie : $4.8 × 17 = 81.6$. A et C ont le point au mauvais endroit, et D a un 0 qui n’a rien à faire là.',
        ],
        answer: 'B',
        answerFr: 'B',
      },
      {
        id: 'p4',
        type: 'order',
        prompt: 'Drag the steps for $74.8 ÷ 22$ into order. One card is a mistake — leave it out.',
        promptFr: 'Range dans l’ordre les étapes de $74.8 ÷ 22$. Une carte est une erreur — laisse-la de côté.',
        bank: [
          { val: 'answer', text: 'So $74.8 ÷ 22 = 3.4$', textFr: 'Donc $74.8 ÷ 22 = 3.4$' },
          { val: 'table', text: 'Write the 22 times table: 22, 44, 66, 88 …', textFr: 'Écris la table de 22 : 22, 44, 66, 88 …' },
          { val: 'bad', text: 'Take the point out: $748 ÷ 22 = 34$, so the answer is $34$', textFr: 'Enlève le point : $748 ÷ 22 = 34$, donc la réponse est $34$' },
          { val: 'first', text: '22 into 74 is 3, remainder 8. The point goes straight up.', textFr: '74 divisé par 22 donne 3, reste 8. Le point monte tout droit.' },
          { val: 'check', text: 'Check with the inverse: $3.4 × 22 = 74.8$', textFr: 'Vérifie avec le calcul inverse : $3.4 × 22 = 74.8$' },
          { val: 'second', text: 'The 8 rides on the 8: 88. 22 into 88 is 4.', textFr: 'Le 8 se reporte sur le 8 : 88. 88 divisé par 22 donne 4.' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleFr: 'Du premier au dernier' }],
        correctSets: { seq: ['table', 'first', 'second', 'answer', 'check'] },
        solution: [
          'Write the 22 times table first. 22 into 7 does not go, so look at 74: 22 into 74 is 3 (that is 66), remainder 8.',
          'The point goes straight up. The 8 rides on the 8: 88, and $88 = 4 × 22$. So $74.8 ÷ 22 = 3.4$.',
          'Check: $3.4 × 22 = 74.8$. Taking the point out and leaving it out gives $34$ — ten times too big: an estimate says $75 ÷ 25 = 3$.',
        ],
        solutionFr: [
          'Écris d’abord la table de 22. 7 divisé par 22 ne va pas, alors regarde 74 : 74 divisé par 22 donne 3 (soit 66), reste 8.',
          'Le point monte tout droit. Le 8 se reporte sur le 8 : 88, et $88 = 4 × 22$. Donc $74.8 ÷ 22 = 3.4$.',
          'Vérifie : $3.4 × 22 = 74.8$. Enlever le point et ne pas le remettre donne $34$ — dix fois trop grand : une estimation dit $75 ÷ 25 = 3$.',
        ],
        answer: 'table · 74 → 3 r 8 · 88 → 4 · $3.4$ · check',
        answerFr: 'table · 74 → 3 reste 8 · 88 → 4 · $3.4$ · vérification',
      },
      {
        id: 'p5',
        prompt: 'Mr Bowen and two friends share a 13.5-dollar lunch bill equally. How much does each person pay, in dollars?',
        promptFr: 'M. Bowen et deux amis partagent une addition de 13.5 dollars en parts égales. Combien paie chaque personne, en dollars ?',
        solution: [
          'Mr Bowen and two friends is 3 people, and "share equally" means divide: $13.5 ÷ 3$.',
          '3 into 13 is 4, remainder 1. The point goes straight up. The 1 rides on the 5: 15. 3 into 15 is 5.',
          'Each person pays 4.50 dollars — money is written to 2 decimal places. Check: $4.5 × 3 = 13.5$.',
        ],
        solutionFr: [
          'M. Bowen et deux amis, ça fait 3 personnes, et « share equally » veut dire diviser : $13.5 ÷ 3$.',
          '13 divisé par 3 donne 4, reste 1. Le point monte tout droit. Le 1 se reporte sur le 5 : 15. 15 divisé par 3 donne 5.',
          'Chaque personne paie 4.50 dollars — l’argent s’écrit avec 2 décimales. Vérifie : $4.5 × 3 = 13.5$.',
        ],
        answer: '4.50',
        answerFr: '4.50',
        accept: ['4.5', '4.50 dollars', '4.5 dollars'],
      },
    ],
  },
  {
    tier: 'Challenge',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1',
        prompt: 'Seven friends share 50 dollars equally. How much does each one get, written as money?',
        promptFr: 'Sept amis partagent 50 dollars en parts égales. Combien reçoit chacun, écrit comme de l’argent ?',
        solution: [
          '$50 ÷ 7$: 7 into 50 is 7, remainder 1. Write the point and add zeros: 7 into 10 is 1, remainder 3; 7 into 30 is 4, remainder 2; 7 into 20 is 2.',
          'So $50 ÷ 7 = 7.142...$ and it never ends. Money has 2 decimal places, so work to 3 and round.',
          'The 3rd decimal digit is 2, so round down: each friend gets 7.14 dollars, and 2 cents are left over.',
        ],
        solutionFr: [
          '$50 ÷ 7$ : 50 divisé par 7 donne 7, reste 1. Écris le point et ajoute des zéros : 10 divisé par 7 donne 1, reste 3 ; 30 divisé par 7 donne 4, reste 2 ; 20 divisé par 7 donne 2.',
          'Donc $50 ÷ 7 = 7.142...$ et ça ne finit jamais. L’argent a 2 décimales, alors calcule jusqu’à 3 et arrondis.',
          'La 3e décimale est 2, donc on arrondit au-dessous : chaque ami reçoit 7.14 dollars, et il reste 2 cents.',
        ],
        answer: '7.14',
        answerFr: '7.14',
        accept: ['7.14 dollars'],
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: 'Swimmer A swims four lengths in $31.4$, $32.6$, $30.9$ and $33.1$ seconds. Swimmer B swims five, in $31.8$, $32.4$, $31.1$, $33.5$ and $30.7$ seconds. Mo’s conjecture: "A is quicker on average, because B has the slowest length." Which is true?',
        promptFr: 'La nageuse A nage quatre longueurs en $31.4$, $32.6$, $30.9$ et $33.1$ secondes. La nageuse B en nage cinq, en $31.8$, $32.4$, $31.1$, $33.5$ et $30.7$ secondes. Conjecture de Mo : « A est plus rapide en moyenne, parce que B a la longueur la plus lente. » Qu’est-ce qui est vrai ?',
        options: [
          { val: 'A', text: 'True: A’s mean is $32.0$ s and B’s is $31.9$ s.', textFr: 'Vraie : la moyenne de A est $32.0$ s et celle de B est $31.9$ s.' },
          { val: 'B', text: 'False: A’s mean is $32.0$ s and B’s is $31.9$ s, so B is quicker.', textFr: 'Fausse : la moyenne de A est $32.0$ s et celle de B est $31.9$ s, donc B est plus rapide.' },
          { val: 'C', text: 'True: B’s total, $159.5$ s, is bigger than A’s.', textFr: 'Vraie : le total de B, $159.5$ s, est plus grand que celui de A.' },
          { val: 'D', text: 'False: A’s mean is $128.0 ÷ 5 = 25.6$ s.', textFr: 'Fausse : la moyenne de A est $128.0 ÷ 5 = 25.6$ s.' },
        ],
        correct: 'B',
        solution: [
          'Test the conjecture with the mean. A: $31.4 + 32.6 + 30.9 + 33.1 = 128.0$, and $128.0 ÷ 4 = 32.0$ s.',
          'B: $31.8 + 32.4 + 31.1 + 33.5 + 30.7 = 159.5$, and $159.5 ÷ 5 = 31.9$ s.',
          '$31.9$ is less than $32.0$, so B is quicker on average and the conjecture is false. A compares the means the wrong way, C compares totals (B swam more lengths), and D divides by the wrong number of lengths.',
        ],
        solutionFr: [
          'Vérifie la conjecture avec la moyenne. A : $31.4 + 32.6 + 30.9 + 33.1 = 128.0$, et $128.0 ÷ 4 = 32.0$ s.',
          'B : $31.8 + 32.4 + 31.1 + 33.5 + 30.7 = 159.5$, et $159.5 ÷ 5 = 31.9$ s.',
          '$31.9$ est plus petit que $32.0$, donc B est plus rapide en moyenne et la conjecture est fausse. A compare les moyennes dans le mauvais sens, C compare les totaux (B a nagé plus de longueurs), et D divise par un mauvais nombre de longueurs.',
        ],
        answer: 'B',
        answerFr: 'B',
      },
      {
        id: 'c3',
        prompt: 'A plank $2.4$ m long is cut into 5 equal pieces. Mr Bowen uses 3 of the pieces. What length of plank does he use, in metres?',
        promptFr: 'Une planche de $2.4$ m est coupée en 5 morceaux égaux. M. Bowen utilise 3 des morceaux. Quelle longueur de planche utilise-t-il, en mètres ?',
        solution: [
          'First share equally: $2.4 ÷ 5$. 5 into 2 does not go, so write 0 and the point; 5 into 24 is 4, remainder 4; add a zero: 5 into 40 is 8. Each piece is $0.48$ m.',
          'Then 3 pieces: $0.48 × 3 = 1.44$ m.',
          'Estimate to check: 3 pieces out of 5 is a bit more than half of $2.4$ m, and $1.44$ is a bit more than $1.2$.',
        ],
        solutionFr: [
          'D’abord, partage en parts égales : $2.4 ÷ 5$. 2 divisé par 5 ne va pas, alors écris 0 et le point ; 24 divisé par 5 donne 4, reste 4 ; ajoute un zéro : 40 divisé par 5 donne 8. Chaque morceau mesure $0.48$ m.',
          'Puis 3 morceaux : $0.48 × 3 = 1.44$ m.',
          'Estime pour vérifier : 3 morceaux sur 5, c’est un peu plus de la moitié de $2.4$ m, et $1.44$ est un peu plus que $1.2$.',
        ],
        answer: '1.44',
        answerFr: '1.44',
        accept: ['1.44 m', '1.44m'],
      },
    ],
  },
];
