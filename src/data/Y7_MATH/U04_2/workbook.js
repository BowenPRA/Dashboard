// src/data/Y7_MATH/U04_2/workbook.js
// Practice for 4.2 Adding and Subtracting Decimals — 12 questions (4 Focus ·
// 5 Practice · 3 Challenge) mixing six answer widgets: a typed number,
// dropdowns in a sentence, multiple choice, drag into targets, typed boxes in a
// worked subtraction, and dragging the steps into order with one wrong card.
//
// Every multiple-choice distractor is a named slip: an upside-down column, a
// forgotten exchange, a forgotten carry, added instead of subtracted. The
// `solution` lines say each exchange out loud ("the ones give 1, the tenths
// get 10 and keep 9 …").
//
// Every number is original: not the deck's, not Line Up the Points', not the
// quiz's and not the book's Exercise 4.2. English and French only.

export const workbook = [
  {
    tier: 'Focus',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1',
        prompt: 'Work out $5.7 + 2.46$.',
        promptFr: 'Calcule $5.7 + 2.46$.',
        solution: [
          'Line up the points and write $5.7$ as $5.70$.',
          'Hundredths: $0 + 6 = 6$. Tenths: $7 + 4 = 11$ — write 1, carry 1 into the ones.',
          'Ones: $5 + 2 + 1 = 8$. The point goes straight down: $5.7 + 2.46 = 8.16$.',
        ],
        solutionFr: [
          'Aligne les points et écris $5.7$ comme $5.70$.',
          'Centièmes : $0 + 6 = 6$. Dixièmes : $7 + 4 = 11$ — écris 1, retenue de 1 sur les unités.',
          'Unités : $5 + 2 + 1 = 8$. Le point descend tout droit : $5.7 + 2.46 = 8.16$.',
        ],
        answer: '8.16',
        answerFr: '8.16',
      },
      {
        id: 'f2',
        type: 'inline',
        prompt: 'Write each number with two decimal places. Choose from the lists.',
        promptFr: 'Écris chaque nombre avec deux décimales. Choisis dans les listes.',
        textParts: ['$3.8 =$ ', ', $12 =$ ', ' and $0.5 =$ ', '.'],
        textPartsFr: ['$3.8 =$ ', ', $12 =$ ', ' et $0.5 =$ ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'mid', text: '3.08', textFr: '3.08' },
              { val: 'ok', text: '3.80', textFr: '3.80' },
              { val: 'big', text: '38.00', textFr: '38.00' },
            ],
            correct: 'ok',
          },
          '2': {
            options: [
              { val: 'small', text: '0.12', textFr: '0.12' },
              { val: 'ok', text: '12.00', textFr: '12.00' },
              { val: 'mid', text: '1.200', textFr: '1.200' },
            ],
            correct: 'ok',
          },
          '3': {
            options: [
              { val: 'mid', text: '0.05', textFr: '0.05' },
              { val: 'big', text: '5.00', textFr: '5.00' },
              { val: 'ok', text: '0.50', textFr: '0.50' },
            ],
            correct: 'ok',
          },
        },
        solution: [
          'A zero goes in each empty place AFTER the last digit — it does not change the number.',
          '$3.8 = 3.80$. ($3.08$ puts the zero between the point and the 8, which makes a smaller number.)',
          '$12$ is a whole number: its point is at its end, so $12 = 12.00$. And $0.5 = 0.50$.',
        ],
        solutionFr: [
          'Un zéro va dans chaque place vide APRÈS le dernier chiffre — il ne change pas le nombre.',
          '$3.8 = 3.80$. ($3.08$ met le zéro entre le point et le 8, ce qui donne un nombre plus petit.)',
          '$12$ est un entier : son point est à la fin, donc $12 = 12.00$. Et $0.5 = 0.50$.',
        ],
        answer: '$3.80$; $12.00$; $0.50$',
        answerFr: '$3.80$; $12.00$; $0.50$',
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: 'Work out $8 − 3.4$.',
        promptFr: 'Calcule $8 − 3.4$.',
        options: [
          { val: 'A', text: '$5.4$', textFr: '$5.4$' },
          { val: 'B', text: '$4.6$', textFr: '$4.6$' },
          { val: 'C', text: '$5.6$', textFr: '$5.6$' },
          { val: 'D', text: '$11.4$', textFr: '$11.4$' },
        ],
        correct: 'B',
        solution: [
          'Write $8$ as $8.0$ and line up the points.',
          'Tenths: $0 − 4$ cannot be done, so exchange: the 8 ones become 7, the tenths get 10. $10 − 4 = 6$.',
          'Ones: $7 − 3 = 4$. So $8 − 3.4 = 4.6$. A works the tenths upside down ($4 − 0$), C forgets the ones gave 1 away, and D adds.',
        ],
        solutionFr: [
          'Écris $8$ comme $8.0$ et aligne les points.',
          'Dixièmes : $0 − 4$, c’est impossible, donc échange : les 8 unités deviennent 7, les dixièmes reçoivent 10. $10 − 4 = 6$.',
          'Unités : $7 − 3 = 4$. Donc $8 − 3.4 = 4.6$. A calcule les dixièmes à l’envers ($4 − 0$), C oublie que les unités ont donné 1, et D additionne.',
        ],
        answer: 'B',
        answerFr: 'B',
      },
      {
        id: 'f4',
        type: 'dnd',
        prompt: 'Work out each one, and drag it to its answer. One card fits neither — leave it out.',
        promptFr: 'Calcule chacun, et fais-le glisser vers sa réponse. Une carte ne va avec aucune — laisse-la de côté.',
        bank: [
          { val: 'a', text: '$3.6 + 0.65$' },
          { val: 'b', text: '$5 − 0.48$' },
          { val: 'c', text: '$5 − 0.75$' },
          { val: 'd', text: '$3.9 + 0.62$' },
          { val: 'e', text: '$5 − 0.85$' },
          { val: 'f', text: '$3.6 + 0.92$' },
        ],
        targets: [
          { id: 'low', title: 'equals $4.25$', titleFr: 'égal à $4.25$' },
          { id: 'high', title: 'equals $4.52$', titleFr: 'égal à $4.52$' },
        ],
        correctSets: { low: ['a', 'c'], high: ['b', 'd', 'f'] },
        solution: [
          '$3.60 + 0.65 = 4.25$ and $5.00 − 0.75 = 4.25$.',
          '$3.90 + 0.62 = 4.52$, $5.00 − 0.48 = 4.52$ and $3.60 + 0.92 = 4.52$.',
          '$5.00 − 0.85 = 4.15$, which is neither. Every one needs its zeros written in first.',
        ],
        solutionFr: [
          '$3.60 + 0.65 = 4.25$ et $5.00 − 0.75 = 4.25$.',
          '$3.90 + 0.62 = 4.52$, $5.00 − 0.48 = 4.52$ et $3.60 + 0.92 = 4.52$.',
          '$5.00 − 0.85 = 4.15$, qui ne va avec aucune. Chaque calcul demande d’abord d’écrire ses zéros.',
        ],
        answer: '$4.25$: $3.6 + 0.65$, $5 − 0.75$ · $4.52$: $5 − 0.48$, $3.9 + 0.62$, $3.6 + 0.92$',
        answerFr: '$4.25$ : $3.6 + 0.65$, $5 − 0.75$ · $4.52$ : $5 − 0.48$, $3.9 + 0.62$, $3.6 + 0.92$',
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
        prompt: 'Work out $13 − 5.68$ with a written method. Fill in the gaps.',
        promptFr: 'Calcule $13 − 5.68$ avec une méthode écrite. Complète les trous.',
        textParts: ['First write 13 as ', '. In the hundredths, 0 − 8 cannot be done, so exchange: the ones give 1, and the tenths get 10 and keep ', '. So $13 − 5.68 =$ ', '.'],
        textPartsFr: ['D’abord, écris 13 comme ', '. Dans les centièmes, 0 − 8, c’est impossible, donc échange : les unités donnent 1, et les dixièmes reçoivent 10 et gardent ', '. Donc $13 − 5.68 =$ ', '.'],
        blanks: {
          '1': { correct: '13.00', width: 6 },
          '2': { correct: '9', width: 4 },
          '3': { correct: '7.32', width: 6 },
        },
        solution: [
          '$13 = 13.00$, so the points line up and there are no gaps.',
          'Hundredths: the ones give 1 (3 becomes 2), the tenths get 10 and pass 1 on, keeping 9, and the hundredths get 10. $10 − 8 = 2$.',
          'Tenths: $9 − 6 = 3$. Ones: $2 − 5$ cannot be done, so the tens give 1: $12 − 5 = 7$. $13 − 5.68 = 7.32$. Check: $7.32 + 5.68 = 13$.',
        ],
        solutionFr: [
          '$13 = 13.00$, donc les points s’alignent et il n’y a pas de vide.',
          'Centièmes : les unités donnent 1 (3 devient 2), les dixièmes reçoivent 10 et en passent 1, en gardant 9, et les centièmes reçoivent 10. $10 − 8 = 2$.',
          'Dixièmes : $9 − 6 = 3$. Unités : $2 − 5$, c’est impossible, donc les dizaines donnent 1 : $12 − 5 = 7$. $13 − 5.68 = 7.32$. Vérifie : $7.32 + 5.68 = 13$.',
        ],
        answer: '$13.00$; 9; $7.32$',
        answerFr: '$13.00$; 9; $7.32$',
      },
      {
        id: 'p2',
        prompt: 'Use a mental method to work out $7.3 + 2.9$.',
        promptFr: 'Utilise le calcul mental pour calculer $7.3 + 2.9$.',
        solution: [
          '$2.9$ is nearly $3$.',
          '$7.3 + 3 = 10.3$ — but that added $0.1$ too much.',
          'Take it off: $10.3 − 0.1 = 10.2$.',
        ],
        solutionFr: [
          '$2.9$, c’est presque $3$.',
          '$7.3 + 3 = 10.3$ — mais on a ajouté $0.1$ de trop.',
          'Enlève-le : $10.3 − 0.1 = 10.2$.',
        ],
        answer: '10.2',
        answerFr: '10.2',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'A pencil case costs 4.85 dollars. Tuan pays with a 20-dollar note. How much change does he get?',
        promptFr: 'Une trousse coûte 4.85 dollars. Tuan paie avec un billet de 20 dollars. Combien de monnaie reçoit-il ?',
        options: [
          { val: 'A', text: '16.15 dollars', textFr: '16.15 dollars' },
          { val: 'B', text: '24.85 dollars', textFr: '24.85 dollars' },
          { val: 'C', text: '15.15 dollars', textFr: '15.15 dollars' },
          { val: 'D', text: '15.25 dollars', textFr: '15.25 dollars' },
        ],
        correct: 'C',
        solution: [
          '**Change** means subtract: $20.00 − 4.85$.',
          'The hundredths need a ten. The tens give 1; the ones and the tenths each get 10 and keep 9; the hundredths get 10. $10 − 5 = 5$, $9 − 8 = 1$, $9 − 4 = 5$, and 1 ten is left: $15.15$.',
          'A forgets the ones gave 1 away, D forgets the tenths did, and B adds. Check: $15.15 + 4.85 = 20$.',
        ],
        solutionFr: [
          '**Change** (la monnaie) veut dire soustraire : $20.00 − 4.85$.',
          'Les centièmes ont besoin d’une dizaine. Les dizaines donnent 1 ; les unités et les dixièmes reçoivent 10 et gardent 9 ; les centièmes reçoivent 10. $10 − 5 = 5$, $9 − 8 = 1$, $9 − 4 = 5$, et il reste 1 dizaine : $15.15$.',
          'A oublie que les unités ont donné 1, D oublie que les dixièmes l’ont fait, et B additionne. Vérifie : $15.15 + 4.85 = 20$.',
        ],
        answer: 'C',
        answerFr: 'C',
      },
      {
        id: 'p4',
        type: 'inline',
        prompt: 'Choose the calculation for each question.',
        promptFr: 'Choisis le calcul pour chaque question.',
        textParts: ['"How much heavier is a 3.4 kg box than a 2.75 kg box?" is ', '. "What is the total length of 1.2 m and 0.85 m?" is ', '.'],
        textPartsFr: ['« How much heavier is a 3.4 kg box than a 2.75 kg box? » donne ', '. « What is the total length of 1.2 m and 0.85 m? » donne ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'add', text: '3.4 + 2.75', textFr: '3.4 + 2.75' },
              { val: 'ok', text: '3.4 − 2.75', textFr: '3.4 − 2.75' },
              { val: 'swap', text: '2.75 − 3.4', textFr: '2.75 − 3.4' },
            ],
            correct: 'ok',
          },
          '2': {
            options: [
              { val: 'ok', text: '1.2 + 0.85', textFr: '1.2 + 0.85' },
              { val: 'sub', text: '1.2 − 0.85', textFr: '1.2 − 0.85' },
              { val: 'swap', text: '0.85 − 1.2', textFr: '0.85 − 1.2' },
            ],
            correct: 'ok',
          },
        },
        solution: [
          '"How much heavier" asks for the difference between the masses: subtract, the bigger one first. $3.40 − 2.75 = 0.65$ kg.',
          '"Total" puts the lengths together: add. $1.20 + 0.85 = 2.05$ m.',
        ],
        solutionFr: [
          '« How much heavier » (de combien plus lourd) demande la différence des masses : on soustrait, la plus grande d’abord. $3.40 − 2.75 = 0.65$ kg.',
          '« Total » met les longueurs ensemble : on additionne. $1.20 + 0.85 = 2.05$ m.',
        ],
        answer: '$3.4 − 2.75$; $1.2 + 0.85$',
        answerFr: '$3.4 − 2.75$; $1.2 + 0.85$',
      },
      {
        id: 'p5',
        type: 'order',
        prompt: 'Drag the steps for $4 − 1.27$ into order. One card is a mistake — leave it out.',
        promptFr: 'Range dans l’ordre les étapes de $4 − 1.27$. Une carte est une erreur — laisse-la de côté.',
        bank: [
          { val: 'zeros', text: 'Fill the gaps: $4$ becomes $4.00$', textFr: 'Complète les vides : $4$ devient $4.00$' },
          { val: 'right', text: 'Line up the last digits: the 4 above the 7', textFr: 'Aligne les derniers chiffres : le 4 au-dessus du 7' },
          { val: 'work', text: '$10 − 7 = 3$, $9 − 2 = 7$, $3 − 1 = 2$', textFr: '$10 − 7 = 3$, $9 − 2 = 7$, $3 − 1 = 2$' },
          { val: 'line', text: 'Line up the points: the point of $4$ is at its end', textFr: 'Aligne les points : le point de $4$ est à la fin' },
          { val: 'exchange', text: '$0 − 7$: exchange — the ones give 1, the tenths keep 9', textFr: '$0 − 7$ : échange — les unités donnent 1, les dixièmes gardent 9' },
          { val: 'point', text: 'The point goes straight down: $2.73$', textFr: 'Le point descend tout droit : $2.73$' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleFr: 'Du premier au dernier' }],
        correctSets: { seq: ['line', 'zeros', 'exchange', 'work', 'point'] },
        solution: [
          'Line up the points — the point of a whole number is at its end — then fill the gaps: $4.00$.',
          'In the hundredths, $0 − 7$ needs an exchange: the ones give 1 (4 becomes 3), the tenths get 10 and keep 9, the hundredths get 10.',
          '$10 − 7 = 3$, $9 − 2 = 7$, $3 − 1 = 2$, with the point straight down: $2.73$. Lining up the last digits puts the 4 ones above 7 hundredths.',
        ],
        solutionFr: [
          'Aligne les points — le point d’un entier est à la fin — puis complète les vides : $4.00$.',
          'Dans les centièmes, $0 − 7$ demande un échange : les unités donnent 1 (4 devient 3), les dixièmes reçoivent 10 et gardent 9, les centièmes reçoivent 10.',
          '$10 − 7 = 3$, $9 − 2 = 7$, $3 − 1 = 2$, avec le point tout droit : $2.73$. Aligner les derniers chiffres met 4 unités au-dessus de 7 centièmes.',
        ],
        answer: 'points · $4.00$ · exchange · $10 − 7$, $9 − 2$, $3 − 1$ · $2.73$',
        answerFr: 'points · $4.00$ · échange · $10 − 7$, $9 − 2$, $3 − 1$ · $2.73$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1',
        prompt: 'Thao has 15 dollars. She buys a T-shirt for 7.85 dollars and socks for 2.6 dollars. How much money does she have left?',
        promptFr: 'Thao a 15 dollars. Elle achète un T-shirt à 7.85 dollars et des chaussettes à 2.6 dollars. Combien d’argent lui reste-t-il ?',
        solution: [
          'Two steps. First the cost: $7.85 + 2.60 = 10.45$.',
          'Then what is left: $15.00 − 10.45$. The hundredths need a ten: the ones give 1, the tenths get 10 and keep 9. $10 − 5 = 5$, $9 − 4 = 5$, $4 − 0 = 4$, $1 − 1 = 0$.',
          'She has $4.55$ dollars left. Check: $4.55 + 10.45 = 15$.',
        ],
        solutionFr: [
          'Deux étapes. D’abord le prix : $7.85 + 2.60 = 10.45$.',
          'Puis ce qui reste : $15.00 − 10.45$. Les centièmes ont besoin d’une dizaine : les unités donnent 1, les dixièmes reçoivent 10 et gardent 9. $10 − 5 = 5$, $9 − 4 = 5$, $4 − 0 = 4$, $1 − 1 = 0$.',
          'Il lui reste $4.55$ dollars. Vérifie : $4.55 + 10.45 = 15$.',
        ],
        answer: '4.55',
        answerFr: '4.55',
        accept: ['4.55 dollars'],
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: 'What number goes in the box? $\\square − 2.65 = 4.8$',
        promptFr: 'Quel nombre va dans la case ? $\\square − 2.65 = 4.8$',
        options: [
          { val: 'A', text: '$2.15$', textFr: '$2.15$' },
          { val: 'B', text: '$6.45$', textFr: '$6.45$' },
          { val: 'C', text: '$2.25$', textFr: '$2.25$' },
          { val: 'D', text: '$7.45$', textFr: '$7.45$' },
        ],
        correct: 'D',
        solution: [
          'Adding undoes subtracting: the missing number is $4.8 + 2.65$.',
          '$4.80 + 2.65$: $0 + 5 = 5$, $8 + 6 = 14$ — write 4, carry 1 — and $4 + 2 + 1 = 7$. So $7.45$. Check: $7.45 − 2.65 = 4.8$.',
          'A and C subtract instead ($4.8 − 2.65$, and C does it upside down), and B forgets the carry.',
        ],
        solutionFr: [
          'L’addition défait la soustraction : le nombre manquant est $4.8 + 2.65$.',
          '$4.80 + 2.65$ : $0 + 5 = 5$, $8 + 6 = 14$ — écris 4, retenue de 1 — et $4 + 2 + 1 = 7$. Donc $7.45$. Vérifie : $7.45 − 2.65 = 4.8$.',
          'A et C soustraient au lieu d’additionner ($4.8 − 2.65$, et C le fait à l’envers), et B oublie la retenue.',
        ],
        answer: 'D',
        answerFr: 'D',
      },
      {
        id: 'c3',
        type: 'dnd',
        prompt: 'Use the fact $3.75 + 2.48 = 6.23$. Drag each answer to its calculation. One card is left over.',
        promptFr: 'Utilise le fait $3.75 + 2.48 = 6.23$. Fais glisser chaque réponse vers son calcul. Une carte reste.',
        bank: [
          { val: '2.48', text: '$2.48$' },
          { val: '6.23', text: '$6.23$' },
          { val: '3.25', text: '$3.25$' },
          { val: '3.75', text: '$3.75$' },
        ],
        targets: [
          { id: 'minusB', title: '$6.23 − 2.48$', titleFr: '$6.23 − 2.48$' },
          { id: 'minusA', title: '$6.23 − 3.75$', titleFr: '$6.23 − 3.75$' },
          { id: 'swap', title: '$2.48 + 3.75$', titleFr: '$2.48 + 3.75$' },
        ],
        correctSets: { minusB: ['3.75'], minusA: ['2.48'], swap: ['6.23'] },
        solution: [
          'Take one part away from the total and the other part is left: $6.23 − 2.48 = 3.75$ and $6.23 − 3.75 = 2.48$.',
          'Adding in the other order gives the same total: $2.48 + 3.75 = 6.23$.',
          '$3.25$ is left over.',
        ],
        solutionFr: [
          'Enlève une partie du total et il reste l’autre partie : $6.23 − 2.48 = 3.75$ et $6.23 − 3.75 = 2.48$.',
          'Additionner dans l’autre ordre donne le même total : $2.48 + 3.75 = 6.23$.',
          '$3.25$ reste de côté.',
        ],
        answer: '$3.75$ · $2.48$ · $6.23$',
        answerFr: '$3.75$ · $2.48$ · $6.23$',
      },
    ],
  },
];
