// src/data/Y7_MATH/U04_1/workbook.js
// Practice for 4.1 Ordering decimals — 12 questions (4 Focus · 5 Practice · 3
// Challenge) mixing six answer widgets: dropdowns in a sentence, multiple
// choice, a typed number, dragging into order, dragging into boxes, and typed
// boxes in a sentence. A typed box marks by value (it cannot tell 2.4 from
// 2.40), so every question where the zeros ARE the point is a dropdown, a
// drag or a multiple choice.
//
// Every number is original: not the deck's, not Fill the Zeros', not the
// quiz's and not the Workbook's pp. 51–53, which the class still has to do.

export const workbook = [
  {
    tier: 'Focus',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1',
        type: 'inline',
        prompt: 'Choose <, > or = for each pair.',
        promptFr: 'Choisis <, > ou = pour chaque paire.',
        textParts: ['$0.9$ ', ' $0.85$   ·   $3.06$ ', ' $3.6$   ·   $1.70$ ', ' $1.7$'],
        textPartsFr: ['$0.9$ ', ' $0.85$   ·   $3.06$ ', ' $3.6$   ·   $1.70$ ', ' $1.7$'],
        blanks: {
          '1': {
            options: [
              { val: 'lt', text: '<', textFr: '<' },
              { val: 'eq', text: '=', textFr: '=' },
              { val: 'gt', text: '>', textFr: '>' },
            ],
            correct: 'gt',
          },
          '2': {
            options: [
              { val: 'lt', text: '<', textFr: '<' },
              { val: 'eq', text: '=', textFr: '=' },
              { val: 'gt', text: '>', textFr: '>' },
            ],
            correct: 'lt',
          },
          '3': {
            options: [
              { val: 'lt', text: '<', textFr: '<' },
              { val: 'eq', text: '=', textFr: '=' },
              { val: 'gt', text: '>', textFr: '>' },
            ],
            correct: 'eq',
          },
        },
        solution: [
          '$0.9 > 0.85$: fill with a zero, $0.90$ — then 9 tenths beat 8 tenths.',
          '$3.06 < 3.6$: $3.06$ has 0 tenths and $3.6$ has 6 tenths.',
          '$1.70 = 1.7$: a zero at the end of the decimal part changes nothing.',
        ],
        solutionFr: [
          '$0.9 > 0.85$ : complète avec un zéro, $0.90$ — puis 9 dixièmes l’emportent sur 8 dixièmes.',
          '$3.06 < 3.6$ : $3.06$ a 0 dixième et $3.6$ a 6 dixièmes.',
          '$1.70 = 1.7$ : un zéro à la fin de la partie décimale ne change rien.',
        ],
        answer: '$>$ · $<$ · $=$',
        answerFr: '$>$ · $<$ · $=$',
      },
      {
        id: 'f2',
        type: 'mcq',
        prompt: 'Which number is equal to $4.6$?',
        promptFr: 'Quel nombre est égal à $4.6$ ?',
        options: [
          { val: 'A', text: '$4.06$', textFr: '$4.06$' },
          { val: 'B', text: '$4.60$', textFr: '$4.60$' },
          { val: 'C', text: '$46.0$', textFr: '$46.0$' },
          { val: 'D', text: '$4.66$', textFr: '$4.66$' },
        ],
        correct: 'B',
        solution: [
          '$4.60$ is $4.6$ filled with one zero at the end: 6 tenths and 0 hundredths.',
          '$4.06$ puts the zero straight after the point, so it has 0 tenths — a different number.',
          '$46.0$ has moved every digit one place left, and $4.66$ has 6 more hundredths.',
        ],
        solutionFr: [
          '$4.60$, c’est $4.6$ complété avec un zéro à la fin : 6 dixièmes et 0 centième.',
          '$4.06$ met le zéro juste après le point, donc il a 0 dixième — c’est un autre nombre.',
          '$46.0$ a décalé chaque chiffre d’un rang vers la gauche, et $4.66$ a 6 centièmes de plus.',
        ],
        answer: 'B',
        answerFr: 'B',
      },
      {
        id: 'f3',
        prompt: 'Which is bigger, $2.39$ or $2.4$? Type the bigger number.',
        promptFr: 'Lequel est le plus grand, $2.39$ ou $2.4$ ? Tape le plus grand nombre.',
        solution: [
          'The whole-number parts are both 2.',
          'Fill with a zero: $2.40$ and $2.39$. The tenths decide: 4 tenths beat 3 tenths.',
          'So $2.4$ is bigger. $2.39$ is longer, but longer is not bigger.',
        ],
        solutionFr: [
          'Les deux parties entières valent 2.',
          'Complète avec un zéro : $2.40$ et $2.39$. Les dixièmes décident : 4 dixièmes l’emportent sur 3 dixièmes.',
          'Donc $2.4$ est le plus grand. $2.39$ est plus long, mais plus long ne veut pas dire plus grand.',
        ],
        answer: '2.4',
        answerFr: '2.4',
      },
      {
        id: 'f4',
        type: 'order',
        prompt: 'Drag the numbers into order of size, starting with the smallest.',
        promptFr: 'Range les nombres dans l’ordre, du plus petit au plus grand.',
        bank: [
          { val: 'a', text: '$7.3$' },
          { val: 'b', text: '$7.03$' },
          { val: 'c', text: '$7.33$' },
          { val: 'd', text: '$7.303$' },
        ],
        targets: [{ id: 'seq', title: 'Smallest to largest', titleFr: 'Du plus petit au plus grand' }],
        correctSets: { seq: ['b', 'a', 'd', 'c'] },
        solution: [
          'Fill with zeros so each has 3 decimal places: $7.300$, $7.030$, $7.330$, $7.303$.',
          'The whole-number parts are all 7, so compare the tenths: $7.030$ has 0 tenths, so it is the smallest.',
          'Then $7.300 < 7.303 < 7.330$. The order is $7.03$, $7.3$, $7.303$, $7.33$.',
        ],
        solutionFr: [
          'Complète avec des zéros pour avoir 3 décimales : $7.300$, $7.030$, $7.330$, $7.303$.',
          'Les parties entières valent toutes 7, donc compare les dixièmes : $7.030$ a 0 dixième, c’est le plus petit.',
          'Puis $7.300 < 7.303 < 7.330$. L’ordre est $7.03$, $7.3$, $7.303$, $7.33$.',
        ],
        answer: '$7.03$, $7.3$, $7.303$, $7.33$',
        answerFr: '$7.03$, $7.3$, $7.303$, $7.33$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierFr: 'Entraînement',
    questions: [
      {
        id: 'p1',
        type: 'dnd',
        prompt: 'Drag each number into the right box: less than $0.6$, or greater than $0.6$.',
        promptFr: 'Fais glisser chaque nombre dans la bonne case : inférieur à $0.6$, ou supérieur à $0.6$.',
        bank: [
          { val: '0.59', text: '$0.59$' },
          { val: '0.61', text: '$0.61$' },
          { val: '0.506', text: '$0.506$' },
          { val: '0.65', text: '$0.65$' },
          { val: '0.066', text: '$0.066$' },
          { val: '0.601', text: '$0.601$' },
        ],
        targets: [
          { id: 'less', title: 'less than $0.6$', titleFr: 'inférieur à $0.6$' },
          { id: 'more', title: 'greater than $0.6$', titleFr: 'supérieur à $0.6$' },
        ],
        correctSets: { less: ['0.59', '0.506', '0.066'], more: ['0.61', '0.65', '0.601'] },
        solution: [
          'Write $0.6$ as $0.600$, so it has as many decimal places as the longest number.',
          'Less: $0.590$, $0.506$ and $0.066$ all have fewer than 6 tenths.',
          'Greater: $0.610$, $0.650$ and $0.601$. $0.601$ has 6 tenths, like $0.600$, but 1 extra thousandth.',
        ],
        solutionFr: [
          'Écris $0.6$ comme $0.600$, pour avoir autant de décimales que le nombre le plus long.',
          'Inférieurs : $0.590$, $0.506$ et $0.066$ ont tous moins de 6 dixièmes.',
          'Supérieurs : $0.610$, $0.650$ et $0.601$. $0.601$ a 6 dixièmes, comme $0.600$, mais 1 millième de plus.',
        ],
        answer: 'Less than $0.6$: $0.59$, $0.506$, $0.066$ · greater than $0.6$: $0.61$, $0.65$, $0.601$',
        answerFr: 'Inférieurs à $0.6$ : $0.59$, $0.506$, $0.066$ · supérieurs à $0.6$ : $0.61$, $0.65$, $0.601$',
      },
      {
        id: 'p2',
        type: 'order',
        prompt: 'Drag the numbers into order of size, starting with the largest.',
        promptFr: 'Range les nombres dans l’ordre, du plus grand au plus petit.',
        bank: [
          { val: 'a', text: '$12.08$' },
          { val: 'b', text: '$12.8$' },
          { val: 'c', text: '$1.288$' },
          { val: 'd', text: '$12.88$' },
          { val: 'e', text: '$12.088$' },
        ],
        targets: [{ id: 'seq', title: 'Largest to smallest', titleFr: 'Du plus grand au plus petit' }],
        correctSets: { seq: ['d', 'b', 'e', 'a', 'c'] },
        solution: [
          'Whole-number part first: $1.288$ has only 1, so it is the smallest, whatever its digits.',
          'The other four have 12. Fill with zeros: $12.080$, $12.800$, $12.880$, $12.088$.',
          'Largest first: $12.88$, $12.8$, $12.088$, $12.08$, then $1.288$.',
        ],
        solutionFr: [
          'La partie entière d’abord : $1.288$ n’a que 1, donc c’est le plus petit, quels que soient ses chiffres.',
          'Les quatre autres ont 12. Complète avec des zéros : $12.080$, $12.800$, $12.880$, $12.088$.',
          'Du plus grand au plus petit : $12.88$, $12.8$, $12.088$, $12.08$, puis $1.288$.',
        ],
        answer: '$12.88$, $12.8$, $12.088$, $12.08$, $1.288$',
        answerFr: '$12.88$, $12.8$, $12.088$, $12.08$, $1.288$',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'Four cyclists finish a race. Their times, in minutes, are $12.4$, $12.09$, $12.35$ and $12.9$. Which time is the third fastest?',
        promptFr: 'Quatre cyclistes finissent une course. Leurs temps, en minutes, sont $12.4$, $12.09$, $12.35$ et $12.9$. Quel est le troisième temps le plus rapide ?',
        options: [
          { val: 'A', text: '$12.35$', textFr: '$12.35$' },
          { val: 'B', text: '$12.9$', textFr: '$12.9$' },
          { val: 'C', text: '$12.4$', textFr: '$12.4$' },
          { val: 'D', text: '$12.09$', textFr: '$12.09$' },
        ],
        correct: 'C',
        solution: [
          'Fastest means the smallest time. Fill with zeros: $12.40$, $12.09$, $12.35$, $12.90$.',
          'Fastest first: $12.09$, $12.35$, $12.40$, $12.90$.',
          'The third fastest is $12.4$ minutes. $12.35$ is second, and $12.9$ is the slowest.',
        ],
        solutionFr: [
          'Le plus rapide, c’est le temps le plus petit. Complète avec des zéros : $12.40$, $12.09$, $12.35$, $12.90$.',
          'Du plus rapide au plus lent : $12.09$, $12.35$, $12.40$, $12.90$.',
          'Le troisième temps le plus rapide est $12.4$ minutes. $12.35$ est deuxième, et $12.9$ est le plus lent.',
        ],
        answer: 'C',
        answerFr: 'C',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: 'Change both numbers into hundredths to compare them.',
        promptFr: 'Écris les deux nombres en centièmes pour les comparer.',
        textParts: ['$0.7$ is ', ' hundredths and $0.68$ is ', ' hundredths, so the bigger number is ', '.'],
        textPartsFr: ['$0.7$, c’est ', ' centièmes, et $0.68$, c’est ', ' centièmes, donc le plus grand nombre est ', '.'],
        blanks: {
          '1': { correct: '70', width: 4 },
          '2': { correct: '68', width: 4 },
          '3': { correct: '0.7', width: 5 },
        },
        solution: [
          'Fill $0.7$ with a zero: $0.70$ is 70 hundredths.',
          '$0.68$ is 68 hundredths.',
          '70 is more than 68, so $0.7$ is the bigger number, even though $0.68$ has more digits.',
        ],
        solutionFr: [
          'Complète $0.7$ avec un zéro : $0.70$, c’est 70 centièmes.',
          '$0.68$, c’est 68 centièmes.',
          '70 est plus grand que 68, donc $0.7$ est le plus grand nombre, même si $0.68$ a plus de chiffres.',
        ],
        answer: '70; 68; $0.7$',
        answerFr: '70; 68; $0.7$',
      },
      {
        id: 'p5',
        type: 'inline',
        prompt: 'A pen costs $1.2$ dollars and a pencil costs $1.15$ dollars. Choose from the lists.',
        promptFr: 'Un stylo coûte $1.2$ dollar et un crayon coûte $1.15$ dollar. Choisis dans les listes.',
        textParts: ['With 2 decimal places, the pen costs ', ' dollars. That is ', ' than $1.15$ dollars, so the ', ' is cheaper.'],
        textPartsFr: ['Avec 2 décimales, le stylo coûte ', ' dollar. C’est ', ' que $1.15$ dollar, donc le ', ' est moins cher.'],
        blanks: {
          '1': {
            options: [
              { val: 'a', text: '1.02', textFr: '1.02' },
              { val: 'b', text: '1.20', textFr: '1.20' },
              { val: 'c', text: '1.12', textFr: '1.12' },
            ],
            correct: 'b',
          },
          '2': {
            options: [
              { val: 'more', text: 'more', textFr: 'plus' },
              { val: 'less', text: 'less', textFr: 'moins' },
            ],
            correct: 'more',
          },
          '3': {
            options: [
              { val: 'pen', text: 'pen', textFr: 'stylo' },
              { val: 'pencil', text: 'pencil', textFr: 'crayon' },
            ],
            correct: 'pencil',
          },
        },
        solution: [
          'Prices have 2 decimal places, so $1.2$ is written $1.20$ — a zero at the end, never in the middle.',
          '$1.20$ against $1.15$: 2 tenths beat 1 tenth, so the pen costs more.',
          'The pencil is cheaper. $1.15$ has more digits, but it is the smaller price.',
        ],
        solutionFr: [
          'Les prix ont 2 décimales, donc $1.2$ s’écrit $1.20$ — un zéro à la fin, jamais au milieu.',
          '$1.20$ contre $1.15$ : 2 dixièmes l’emportent sur 1 dixième, donc le stylo coûte plus.',
          'Le crayon est moins cher. $1.15$ a plus de chiffres, mais c’est le plus petit prix.',
        ],
        answer: '1.20; more; pencil',
        answerFr: '1.20; plus; crayon',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1',
        type: 'mcq',
        prompt: 'Which length is the longest?',
        promptFr: 'Quelle longueur est la plus grande ?',
        options: [
          { val: 'A', text: '$1.6$ m', textFr: '$1.6$ m' },
          { val: 'B', text: '$155$ cm', textFr: '$155$ cm' },
          { val: 'C', text: '$1.06$ m', textFr: '$1.06$ m' },
          { val: 'D', text: '$1580$ mm', textFr: '$1580$ mm' },
        ],
        correct: 'A',
        solution: [
          'Change them all into the same unit first. In centimetres: $1.6$ m $= 160$ cm, $1.06$ m $= 106$ cm, $1580$ mm $= 158$ cm.',
          'So the lengths are 160 cm, 155 cm, 106 cm and 158 cm.',
          '$1.6$ m is the longest. $1580$ has the most digits, but it is in millimetres.',
        ],
        solutionFr: [
          'Convertis-les d’abord dans la même unité. En centimètres : $1.6$ m $= 160$ cm, $1.06$ m $= 106$ cm, $1580$ mm $= 158$ cm.',
          'Les longueurs sont donc 160 cm, 155 cm, 106 cm et 158 cm.',
          '$1.6$ m est la plus grande. $1580$ a le plus de chiffres, mais il est en millimètres.',
        ],
        answer: 'A',
        answerFr: 'A',
      },
      {
        id: 'c2',
        type: 'dnd',
        prompt: 'A digit is missing: $2.\\square 5 < 2.43$. Drag every digit that makes it true into the box. Leave the others out.',
        promptFr: 'Il manque un chiffre : $2.\\square 5 < 2.43$. Fais glisser dans la case tous les chiffres qui rendent l’énoncé vrai. Laisse les autres de côté.',
        bank: [
          { val: '0', text: '$0$' },
          { val: '1', text: '$1$' },
          { val: '2', text: '$2$' },
          { val: '3', text: '$3$' },
          { val: '4', text: '$4$' },
          { val: '5', text: '$5$' },
          { val: '6', text: '$6$' },
          { val: '7', text: '$7$' },
          { val: '8', text: '$8$' },
          { val: '9', text: '$9$' },
        ],
        targets: [{ id: 'works', title: 'makes it true', titleFr: 'rend l’énoncé vrai' }],
        correctSets: { works: ['0', '1', '2', '3'] },
        solution: [
          'The whole-number parts are both 2, so the missing digit is in the tenths, and $2.43$ has 4 tenths.',
          'With 4 the tenths are equal, so look at the hundredths: $2.45 > 2.43$. So 4 does not work.',
          'With 0, 1, 2 or 3 the tenths are smaller, so the number is smaller: $2.35$, $2.25$, $2.15$, $2.05$ are all less than $2.43$.',
        ],
        solutionFr: [
          'Les parties entières valent toutes les deux 2, donc le chiffre manquant est aux dixièmes, et $2.43$ a 4 dixièmes.',
          'Avec 4, les dixièmes sont égaux, donc regarde les centièmes : $2.45 > 2.43$. Donc 4 ne marche pas.',
          'Avec 0, 1, 2 ou 3, les dixièmes sont plus petits, donc le nombre est plus petit : $2.35$, $2.25$, $2.15$, $2.05$ sont tous inférieurs à $2.43$.',
        ],
        answer: '0, 1, 2, 3',
        answerFr: '0, 1, 2, 3',
      },
      {
        id: 'c3',
        type: 'order',
        prompt: 'Drag the four parcels into order, starting with the lightest. Change them all into grams first.',
        promptFr: 'Range les quatre colis dans l’ordre, du plus léger au plus lourd. Convertis-les d’abord tous en grammes.',
        bank: [
          { val: 'a', text: '$0.75$ kg' },
          { val: 'b', text: '$705$ g' },
          { val: 'c', text: '$0.7$ kg' },
          { val: 'd', text: '$757$ g' },
        ],
        targets: [{ id: 'seq', title: 'Lightest to heaviest', titleFr: 'Du plus léger au plus lourd' }],
        correctSets: { seq: ['c', 'b', 'a', 'd'] },
        solution: [
          '$1$ kg $= 1000$ g, so $0.75$ kg $= 750$ g and $0.7$ kg $= 700$ g.',
          'In grams: 750, 705, 700 and 757.',
          'Lightest first: $0.7$ kg, $705$ g, $0.75$ kg, $757$ g.',
        ],
        solutionFr: [
          '$1$ kg $= 1000$ g, donc $0.75$ kg $= 750$ g et $0.7$ kg $= 700$ g.',
          'En grammes : 750, 705, 700 et 757.',
          'Du plus léger au plus lourd : $0.7$ kg, $705$ g, $0.75$ kg, $757$ g.',
        ],
        answer: '$0.7$ kg, $705$ g, $0.75$ kg, $757$ g',
        answerFr: '$0.7$ kg, $705$ g, $0.75$ kg, $757$ g',
      },
    ],
  },
];
