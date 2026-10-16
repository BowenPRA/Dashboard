// src/data/Y7_MATH/U04_3/workbook.js
// Practice for 4.3 Multiplying decimals — 12 questions (4 Focus · 5 Practice ·
// 3 Challenge) mixing six answer widgets: a typed number, dropdowns in a
// sentence, multiple choice (every money answer is one of these — a typed box
// marks by value, so it cannot tell 4.40 from 4.4), drag into targets, typed
// boxes in a worked multiplication, and dragging the steps into order with one
// wrong card.
//
// Every question walks the same method — estimate, point out, point back,
// check — and the `solution` lines say each step out loud.
//
// Every number is original: not the deck's, not Point Out, Point Back's, not
// the quiz's and not the book's Exercise 4.3. English and French only.

export const workbook = [
  {
    tier: 'Focus',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1',
        prompt: 'Work out $0.7 × 9$.',
        promptFr: 'Calcule $0.7 × 9$.',
        solution: [
          'Estimate: $0.7$ is less than 1, so the answer is less than $1 × 9 = 9$.',
          'Take the point out: $7 × 9 = 63$.',
          '$0.7$ has 1 decimal place, so the answer has 1: $6.3$.',
        ],
        solutionFr: [
          'Estime : $0.7$ est plus petit que 1, donc la réponse est plus petite que $1 × 9 = 9$.',
          'Enlève le point : $7 × 9 = 63$.',
          '$0.7$ a 1 décimale, donc la réponse en a 1 : $6.3$.',
        ],
        answer: '6.3',
        answerFr: '6.3',
      },
      {
        id: 'f2',
        type: 'inline',
        prompt: 'Work out $6.8 × 4$. Choose from the lists.',
        promptFr: 'Calcule $6.8 × 4$. Choisis dans les listes.',
        textParts: ['Take the point out: $68 × 4 =$ ', '. $6.8$ has ', ' decimal place, so $6.8 × 4 =$ ', '.'],
        textPartsFr: ['Enlève le point : $68 × 4 =$ ', '. $6.8$ a ', ' décimale, donc $6.8 × 4 =$ ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'ok', text: '272', textFr: '272' },
              { val: 'add', text: '72', textFr: '72' },
              { val: 'slip', text: '242', textFr: '242' },
            ],
            correct: 'ok',
          },
          '2': {
            options: [
              { val: 'one', text: '1', textFr: '1' },
              { val: 'two', text: '2', textFr: '2' },
              { val: 'none', text: '0', textFr: '0' },
            ],
            correct: 'one',
          },
          '3': {
            options: [
              { val: 'two', text: '2.72', textFr: '2.72' },
              { val: 'ok', text: '27.2', textFr: '27.2' },
              { val: 'none', text: '272', textFr: '272' },
              { val: 'three', text: '0.272', textFr: '0.272' },
            ],
            correct: 'ok',
          },
        },
        solution: [
          'Take the point out: $68 × 4 = 272$ (that is $60 × 4 = 240$ and $8 × 4 = 32$).',
          '$6.8$ has 1 decimal place, so the answer has 1: $27.2$.',
          'Check: $7 × 4 = 28$, and $27.2$ is close. $2.72$ and $0.272$ are too small; $272$ never put the point back.',
        ],
        solutionFr: [
          'Enlève le point : $68 × 4 = 272$ (c’est $60 × 4 = 240$ et $8 × 4 = 32$).',
          '$6.8$ a 1 décimale, donc la réponse en a 1 : $27.2$.',
          'Vérifie : $7 × 4 = 28$, et $27.2$ en est proche. $2.72$ et $0.272$ sont trop petits ; $272$ n’a jamais remis le point.',
        ],
        answer: '272; 1; $27.2$',
        answerFr: '272; 1; $27.2$',
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: 'Do not work it out — think about its size. Which answer to $0.9 × 5$ could be right?',
        promptFr: 'Ne calcule pas — pense à sa taille. Quelle réponse à $0.9 × 5$ peut être juste ?',
        options: [
          { val: 'A', text: '$0.45$', textFr: '$0.45$' },
          { val: 'B', text: '$45$', textFr: '$45$' },
          { val: 'C', text: '$4.5$', textFr: '$4.5$' },
          { val: 'D', text: '$0.045$', textFr: '$0.045$' },
        ],
        correct: 'C',
        solution: [
          '5 lots of $0.9$ is more than $0.9$, but less than 5 lots of 1, which is 5.',
          'Only $4.5$ is between $0.9$ and 5.',
          'A and D are smaller than $0.9$ — "decimals make it smaller" is not true here. B is more than 5.',
        ],
        solutionFr: [
          '5 fois $0.9$, c’est plus que $0.9$, mais moins que 5 fois 1, qui fait 5.',
          'Seul $4.5$ est entre $0.9$ et 5.',
          'A et D sont plus petits que $0.9$ — « les décimaux rendent plus petit », ce n’est pas vrai ici. B est plus grand que 5.',
        ],
        answer: 'C',
        answerFr: 'C',
      },
      {
        id: 'f4',
        type: 'dnd',
        prompt: 'You know that $24 × 7 = 168$. Drag each answer to its question. One card is not needed.',
        promptFr: 'Tu sais que $24 × 7 = 168$. Fais glisser chaque réponse vers sa question. Une carte ne sert pas.',
        bank: [
          { val: '1.68', text: '$1.68$' },
          { val: '1680', text: '$1680$' },
          { val: '16.8', text: '$16.8$' },
          { val: '0.168', text: '$0.168$' },
        ],
        targets: [
          { id: 'one', title: '$2.4 × 7$', titleFr: '$2.4 × 7$' },
          { id: 'two', title: '$0.24 × 7$', titleFr: '$0.24 × 7$' },
          { id: 'three', title: '$0.024 × 7$', titleFr: '$0.024 × 7$' },
        ],
        correctSets: { one: ['16.8'], two: ['1.68'], three: ['0.168'] },
        solution: [
          'Every answer has the digits 168. Count the decimal places in the question.',
          '$2.4$ has 1, so $2.4 × 7 = 16.8$. $0.24$ has 2, so $0.24 × 7 = 1.68$. $0.024$ has 3, so $0.024 × 7 = 0.168$.',
          'Check one with an estimate: $2.4 × 7$ is about $2 × 7 = 14$, and $16.8$ is close. $1680$ is far too big for any of them.',
        ],
        solutionFr: [
          'Toutes les réponses ont les chiffres 168. Compte les décimales dans la question.',
          '$2.4$ en a 1, donc $2.4 × 7 = 16.8$. $0.24$ en a 2, donc $0.24 × 7 = 1.68$. $0.024$ en a 3, donc $0.024 × 7 = 0.168$.',
          'Vérifie avec une estimation : $2.4 × 7$, c’est environ $2 × 7 = 14$, et $16.8$ en est proche. $1680$ est bien trop grand pour chacune.',
        ],
        answer: '$16.8$ · $1.68$ · $0.168$',
        answerFr: '$16.8$ · $1.68$ · $0.168$',
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
        prompt: 'Work out $4.3 × 27$ with the point out. Fill in each row, the total, then the answer.',
        promptFr: 'Calcule $4.3 × 27$ sans le point. Complète chaque ligne, le total, puis la réponse.',
        textParts: ['$43 × 7 =$ ', '. $43 × 20 =$ ', '. Add the rows: $43 × 27 =$ ', '. Estimate $4 × 30 = 120$, so $4.3 × 27 =$ ', '.'],
        textPartsFr: ['$43 × 7 =$ ', '. $43 × 20 =$ ', '. Additionne les lignes : $43 × 27 =$ ', '. Estimation $4 × 30 = 120$, donc $4.3 × 27 =$ ', '.'],
        blanks: {
          '1': { correct: '301', width: 5 },
          '2': { correct: '860', width: 5 },
          '3': { correct: '1161', width: 5 },
          '4': { correct: '116.1', width: 6 },
        },
        solution: [
          'One row for each digit of 27: $43 × 7 = 301$, and $43 × 20 = 860$ — the tens row ends in a 0.',
          'Add the rows: $301 + 860 = 1161$.',
          '$4.3 × 27$ is about $4 × 30 = 120$, and $4.3$ has 1 decimal place: $116.1$, which is close to 120.',
        ],
        solutionFr: [
          'Une ligne pour chaque chiffre de 27 : $43 × 7 = 301$, et $43 × 20 = 860$ — la ligne des dizaines finit par un 0.',
          'Additionne les lignes : $301 + 860 = 1161$.',
          '$4.3 × 27$, c’est environ $4 × 30 = 120$, et $4.3$ a 1 décimale : $116.1$, qui est proche de 120.',
        ],
        answer: '301; 860; 1161; $116.1$',
        answerFr: '301; 860; 1161; $116.1$',
      },
      {
        id: 'p2',
        prompt: 'Work out $0.02 × 3$.',
        promptFr: 'Calcule $0.02 × 3$.',
        solution: [
          'Take the point out: $2 × 3 = 6$.',
          '$0.02$ has 2 decimal places, but $6$ is only one digit.',
          'Write a 0 in front to hold the tenths place: $0.06$. ($0.6$ has only 1 decimal place — 10 times too big.)',
        ],
        solutionFr: [
          'Enlève le point : $2 × 3 = 6$.',
          '$0.02$ a 2 décimales, mais $6$ n’a qu’un chiffre.',
          'Écris un 0 devant pour garder la place des dixièmes : $0.06$. ($0.6$ n’a qu’une décimale — 10 fois trop grand.)',
        ],
        answer: '0.06',
        answerFr: '0.06',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'A pencil costs 0.55 dollars. How much do 8 pencils cost?',
        promptFr: 'Un crayon coûte 0.55 dollar. Combien coûtent 8 crayons ?',
        options: [
          { val: 'A', text: '4.4 dollars', textFr: '4.4 dollars' },
          { val: 'B', text: '4.40 dollars', textFr: '4.40 dollars' },
          { val: 'C', text: '44.00 dollars', textFr: '44.00 dollars' },
          { val: 'D', text: '0.440 dollars', textFr: '0.440 dollar' },
        ],
        correct: 'B',
        solution: [
          'Each pencil costs 0.55 dollars, so multiply: $55 × 8 = 440$.',
          '$0.55$ has 2 decimal places, so the answer has 2: $4.40$. Check: $0.6 × 8 = 4.8$ — close.',
          'It is money, so keep both decimal places: **4.40 dollars**. A is the right amount written the wrong way; C is 10 times too much; D is less than one pencil.',
        ],
        solutionFr: [
          'Chaque crayon coûte 0.55 dollar, donc multiplie : $55 × 8 = 440$.',
          '$0.55$ a 2 décimales, donc la réponse en a 2 : $4.40$. Vérifie : $0.6 × 8 = 4.8$ — c’est proche.',
          'C’est de l’argent, donc garde les deux décimales : **4.40 dollars**. A, c’est le bon montant mal écrit ; C est 10 fois trop ; D est moins qu’un seul crayon.',
        ],
        answer: 'B',
        answerFr: 'B',
      },
      {
        id: 'p4',
        type: 'inline',
        prompt: 'You know that $29 × 31 = 899$. Estimate, then choose each answer.',
        promptFr: 'Tu sais que $29 × 31 = 899$. Estime, puis choisis chaque réponse.',
        textParts: ['$2.9 × 31 =$ ', ', $0.29 × 31 =$ ', ' and $89.9 ÷ 31 =$ ', '.'],
        textPartsFr: ['$2.9 × 31 =$ ', ', $0.29 × 31 =$ ', ' et $89.9 ÷ 31 =$ ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'a', text: '899', textFr: '899' },
              { val: 'b', text: '89.9', textFr: '89.9' },
              { val: 'c', text: '8.99', textFr: '8.99' },
              { val: 'd', text: '0.899', textFr: '0.899' },
            ],
            correct: 'b',
          },
          '2': {
            options: [
              { val: 'a', text: '899', textFr: '899' },
              { val: 'b', text: '89.9', textFr: '89.9' },
              { val: 'c', text: '8.99', textFr: '8.99' },
              { val: 'd', text: '0.899', textFr: '0.899' },
            ],
            correct: 'c',
          },
          '3': {
            options: [
              { val: 'a', text: '29', textFr: '29' },
              { val: 'b', text: '2.9', textFr: '2.9' },
              { val: 'c', text: '0.29', textFr: '0.29' },
            ],
            correct: 'b',
          },
        },
        solution: [
          '$2.9 × 31$ is about $3 × 30 = 90$, so it is $89.9$.',
          '$0.29 × 31$ is about $0.3 × 30 = 9$, so it is $8.99$.',
          '$89.9 ÷ 31$ is about $90 ÷ 30 = 3$, so it is $2.9$.',
        ],
        solutionFr: [
          '$2.9 × 31$, c’est environ $3 × 30 = 90$, donc c’est $89.9$.',
          '$0.29 × 31$, c’est environ $0.3 × 30 = 9$, donc c’est $8.99$.',
          '$89.9 ÷ 31$, c’est environ $90 ÷ 30 = 3$, donc c’est $2.9$.',
        ],
        answer: '$89.9$; $8.99$; $2.9$',
        answerFr: '$89.9$; $8.99$; $2.9$',
      },
      {
        id: 'p5',
        type: 'order',
        prompt: 'Drag the steps for "work out $5.4 × 16$" into order. One card is a mistake — leave it out.',
        promptFr: 'Range dans l’ordre les étapes de « calcule $5.4 × 16$ ». Une carte est une erreur — laisse-la de côté.',
        bank: [
          { val: 'back', text: 'Put the point back, 1 decimal place: $86.4$', textFr: 'Remets le point, 1 décimale : $86.4$' },
          { val: 'est', text: 'Estimate: $5 × 20 = 100$', textFr: 'Estime : $5 × 20 = 100$' },
          { val: 'left', text: 'Count 1 place from the left: $8.64$', textFr: 'Compte 1 rang depuis la gauche : $8.64$' },
          { val: 'check', text: 'Check: $86.4$ is close to 100', textFr: 'Vérifie : $86.4$ est proche de 100' },
          { val: 'out', text: 'Take the point out: $54 × 16 = 864$', textFr: 'Enlève le point : $54 × 16 = 864$' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleFr: 'Du premier au dernier' }],
        correctSets: { seq: ['est', 'out', 'back', 'check'] },
        solution: [
          'Estimate first: $5.4$ is about 5 and $16$ is about 20, so about 100.',
          'Take the point out: $54 × 6 = 324$ and $54 × 10 = 540$, so $54 × 16 = 864$. Put the point back with 1 decimal place: $86.4$.',
          'Check: $86.4$ is close to 100. Counting from the left gives $8.64$ — far from the estimate.',
        ],
        solutionFr: [
          'Estime d’abord : $5.4$, c’est environ 5, et $16$ environ 20, donc environ 100.',
          'Enlève le point : $54 × 6 = 324$ et $54 × 10 = 540$, donc $54 × 16 = 864$. Remets le point avec 1 décimale : $86.4$.',
          'Vérifie : $86.4$ est proche de 100. Compter depuis la gauche donne $8.64$ — loin de l’estimation.',
        ],
        answer: 'estimate → point out → point back → check',
        answerFr: 'estimer → enlever le point → remettre le point → vérifier',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1',
        prompt: 'Mr Bowen buys 12 mangoes at 0.45 dollars each and 3 melons at 2.15 dollars each. How much does he pay altogether, in dollars?',
        promptFr: 'M. Bowen achète 12 mangues à 0.45 dollar chacune et 3 melons à 2.15 dollars chacun. Combien paie-t-il en tout, en dollars ?',
        solution: [
          'Mangoes: $0.45 × 12$ — $45 × 12 = 540$, and 2 decimal places: $5.40$ dollars.',
          'Melons: $2.15 × 3$ — $215 × 3 = 645$, and 2 decimal places: $6.45$ dollars.',
          'Altogether: $5.40 + 6.45 = 11.85$ dollars. Check: about $0.5 × 12 + 2 × 3 = 12$.',
        ],
        solutionFr: [
          'Mangues : $0.45 × 12$ — $45 × 12 = 540$, et 2 décimales : $5.40$ dollars.',
          'Melons : $2.15 × 3$ — $215 × 3 = 645$, et 2 décimales : $6.45$ dollars.',
          'En tout : $5.40 + 6.45 = 11.85$ dollars. Vérifie : environ $0.5 × 12 + 2 × 3 = 12$.',
        ],
        answer: '11.85',
        answerFr: '11.85',
        accept: ['11.85 dollars'],
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: 'A rope is cut into 15 pieces. Each piece is 0.48 m long. How long was the rope?',
        promptFr: 'Une corde est coupée en 15 morceaux. Chaque morceau mesure 0.48 m. Quelle était la longueur de la corde ?',
        options: [
          { val: 'A', text: '7.2 m', textFr: '7.2 m' },
          { val: 'B', text: '0.72 m', textFr: '0.72 m' },
          { val: 'C', text: '72 m', textFr: '72 m' },
          { val: 'D', text: '15.48 m', textFr: '15.48 m' },
        ],
        correct: 'A',
        solution: [
          '15 pieces of $0.48$ m: multiply. Take the point out: $48 × 5 = 240$ and $48 × 10 = 480$, so $48 × 15 = 720$.',
          '$0.48$ has 2 decimal places: $7.20$ m, which is exactly $7.2$ m. Nothing was rounded, so the zero can go.',
          'Check: $0.5 × 15 = 7.5$ — close. B is smaller than $15 × 0.1$; C is 10 times too long; D adds instead of multiplying.',
        ],
        solutionFr: [
          '15 morceaux de $0.48$ m : multiplie. Enlève le point : $48 × 5 = 240$ et $48 × 10 = 480$, donc $48 × 15 = 720$.',
          '$0.48$ a 2 décimales : $7.20$ m, soit exactement $7.2$ m. Rien n’a été arrondi, donc le zéro peut partir.',
          'Vérifie : $0.5 × 15 = 7.5$ — c’est proche. B est plus petit que $15 × 0.1$ ; C est 10 fois trop long ; D additionne au lieu de multiplier.',
        ],
        answer: 'A',
        answerFr: 'A',
      },
      {
        id: 'c3',
        type: 'dnd',
        prompt: 'Every answer here is exact, so its zeros at the end can go. Drag each answer to its sum. One card is not needed.',
        promptFr: 'Chaque réponse ici est exacte, donc ses zéros de la fin peuvent partir. Fais glisser chaque réponse vers son calcul. Une carte ne sert pas.',
        bank: [
          { val: '2', text: '$2$' },
          { val: '0.2', text: '$0.2$' },
          { val: '9', text: '$9$' },
          { val: '1', text: '$1$' },
          { val: '12', text: '$12$' },
        ],
        targets: [
          { id: 'a', title: '$0.25 × 8$', titleFr: '$0.25 × 8$' },
          { id: 'b', title: '$1.5 × 6$', titleFr: '$1.5 × 6$' },
          { id: 'c', title: '$0.125 × 8$', titleFr: '$0.125 × 8$' },
          { id: 'd', title: '$2.4 × 5$', titleFr: '$2.4 × 5$' },
        ],
        correctSets: { a: ['2'], b: ['9'], c: ['1'], d: ['12'] },
        solution: [
          '$25 × 8 = 200$ and 2 places: $2.00 = 2$. $15 × 6 = 90$ and 1 place: $9.0 = 9$.',
          '$125 × 8 = 1000$ and 3 places: $1.000 = 1$. $24 × 5 = 120$ and 1 place: $12.0 = 12$.',
          '$0.2$ is $0.25 × 8$ with the zeros counted wrongly — 8 lots of $0.25$ is more than $0.25$.',
        ],
        solutionFr: [
          '$25 × 8 = 200$ et 2 rangs : $2.00 = 2$. $15 × 6 = 90$ et 1 rang : $9.0 = 9$.',
          '$125 × 8 = 1000$ et 3 rangs : $1.000 = 1$. $24 × 5 = 120$ et 1 rang : $12.0 = 12$.',
          '$0.2$, c’est $0.25 × 8$ avec les zéros mal comptés — 8 fois $0.25$, c’est plus que $0.25$.',
        ],
        answer: '$2$ · $9$ · $1$ · $12$',
        answerFr: '$2$ · $9$ · $1$ · $12$',
      },
    ],
  },
];
