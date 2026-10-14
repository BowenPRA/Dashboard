// src/data/Y7_MATH/U01_1/workbook.js
// Reveal-solution practice for 1.1 Adding & Subtracting Integers.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. The last two Challenge
// questions are the word problems demoted from the classroom deck (The Bank
// Account and The Research Station, ADAPTATION-PLAN §8). See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1', prompt: 'Work out $-3 + -4$.', promptVn: 'Tính $-3 + -4$.', promptFr: 'Calcule $-3 + -4$.',
        solution: ['Adding a negative means move **left**.', 'Start at $-3$, move 4 left: $-3 + -4 = -7$.'],
        solutionVn: ['Cộng một số âm nghĩa là đi sang **trái**.', 'Bắt đầu ở $-3$, đi 4 bước sang trái: $-3 + -4 = -7$.'],
        solutionFr: ['Ajouter un négatif veut dire aller à **gauche**.', 'Pars de $-3$, et avance de 4 vers la gauche : $-3 + -4 = -7$.'],
        answer: '$-7$', answerVn: '$-7$', answerFr: '$-7$',
      },
      {
        id: 'f2', prompt: 'Work out $6 + -5$.', promptVn: 'Tính $6 + -5$.', promptFr: 'Calcule $6 + -5$.',
        solution: ['Adding a negative → move **left**.', 'Start at $6$, move 5 left: $6 + -5 = 1$.'],
        solutionVn: ['Cộng một số âm → đi sang **trái**.', 'Bắt đầu ở $6$, đi 5 bước sang trái: $6 + -5 = 1$.'],
        solutionFr: ['Ajouter un négatif → va à **gauche**.', 'Pars de $6$, et avance de 5 vers la gauche : $6 + -5 = 1$.'],
        answer: '$1$', answerVn: '$1$', answerFr: '$1$',
      },
      {
        id: 'f3', prompt: 'Work out $-6 - 3$.', promptVn: 'Tính $-6 - 3$.', promptFr: 'Calcule $-6 - 3$.',
        solution: ['Subtracting a positive → move **left**.', 'Start at $-6$, move 3 left: $-6 - 3 = -9$.'],
        solutionVn: ['Trừ một số dương → đi sang **trái**.', 'Bắt đầu ở $-6$, đi 3 bước sang trái: $-6 - 3 = -9$.'],
        solutionFr: ['Soustraire un positif → va à **gauche**.', 'Pars de $-6$, et avance de 3 vers la gauche : $-6 - 3 = -9$.'],
        answer: '$-9$', answerVn: '$-9$', answerFr: '$-9$',
      },
      {
        id: 'f4', prompt: 'Work out $1 - -8$.', promptVn: 'Tính $1 - -8$.', promptFr: 'Calcule $1 - -8$.',
        solution: ['Minus a negative becomes plus: $1 - -8 = 1 + 8$.', '$1 + 8 = 9$.'],
        solutionVn: ['Trừ số âm thành cộng: $1 - -8 = 1 + 8$.', '$1 + 8 = 9$.'],
        solutionFr: ['Moins un négatif devient plus : $1 - -8 = 1 + 8$.', '$1 + 8 = 9$.'],
        answer: '$9$', answerVn: '$9$', answerFr: '$9$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    tierFr: 'Entraînement',
    questions: [
      {
        id: 'p1', prompt: 'Work out $-10 - -15$.', promptVn: 'Tính $-10 - -15$.', promptFr: 'Calcule $-10 - -15$.',
        solution: ['Change $- -$ into $+$: $-10 - -15 = -10 + 15$.', '$-10 + 15 = 5$.'],
        solutionVn: ['Đổi $- -$ thành $+$: $-10 - -15 = -10 + 15$.', '$-10 + 15 = 5$.'],
        solutionFr: ['Change $- -$ en $+$ : $-10 - -15 = -10 + 15$.', '$-10 + 15 = 5$.'],
        answer: '$5$', answerVn: '$5$', answerFr: '$5$',
      },
      {
        id: 'p2', type: 'fill_blank',
        prompt: 'Fill in the missing number.', promptVn: 'Điền số còn thiếu.', promptFr: 'Trouve le nombre manquant.',
        textParts: ['$8 +$', '$= 1$'], textPartsVn: ['$8 +$', '$= 1$'], textPartsFr: ['$8 +$', '$= 1$'],
        blanks: { '1': { correct: '-7', width: 4 } },
        solution: ['We need what to add to $8$ to reach $1$, so $\\square = 1 - 8$.', '$1 - 8 = -7$. Check: $8 + -7 = 1$. ✓'],
        solutionVn: ['Cần cộng gì vào $8$ để được $1$, nên $\\square = 1 - 8$.', '$1 - 8 = -7$. Thử lại: $8 + -7 = 1$. ✓'],
        solutionFr: ['Il faut trouver ce qu’on ajoute à $8$ pour arriver à $1$, donc $\\square = 1 - 8$.', '$1 - 8 = -7$. Vérification : $8 + -7 = 1$. ✓'],
        answer: '$-7$', answerVn: '$-7$', answerFr: '$-7$',
      },
      {
        id: 'p3', prompt: 'Find the **difference** between $-3$ and $4$.', promptVn: 'Tìm **hiệu (difference)** giữa $-3$ và $4$.', promptFr: 'Trouve la **différence (difference)** entre $-3$ et $4$.',
        solution: ['The difference is the gap on the number line: **bigger − smaller**.', '$4 - (-3) = 4 + 3 = 7$. A difference is never negative.'],
        solutionVn: ['Hiệu là khoảng cách trên trục số: **số lớn − số bé**.', '$4 - (-3) = 4 + 3 = 7$. Hiệu không bao giờ âm.'],
        solutionFr: ['La différence est l’écart sur la droite graduée : **le plus grand − le plus petit**.', '$4 - (-3) = 4 + 3 = 7$. Une différence n’est jamais négative.'],
        answer: '$7$', answerVn: '$7$', answerFr: '$7$',
      },
      {
        id: 'p4', prompt: '**Estimate** $-6.15 + 9.93$ by rounding each number to the nearest integer.', promptVn: '**Ước lượng** $-6.15 + 9.93$ bằng cách làm tròn mỗi số đến số nguyên gần nhất.', promptFr: '**Estime** $-6.15 + 9.93$ en arrondissant chaque nombre à l’entier le plus proche.',
        solution: ['Round each: $-6.15 \\approx -6$ and $9.93 \\approx 10$.', '$-6 + 10 = 4$, so the answer is about $4$.'],
        solutionVn: ['Làm tròn: $-6.15 \\approx -6$ và $9.93 \\approx 10$.', '$-6 + 10 = 4$, vậy đáp án khoảng $4$.'],
        solutionFr: ['Arrondis chaque nombre : $-6.15 \\approx -6$ et $9.93 \\approx 10$.', '$-6 + 10 = 4$, donc la réponse est environ $4$.'],
        answer: '$\\approx 4$', answerVn: '$\\approx 4$', answerFr: '$\\approx 4$',
      },
      {
        id: 'p5', prompt: 'Two integers add up to $2$. One of them is $8$. What is the other integer?', promptVn: 'Hai số nguyên có tổng bằng $2$. Một trong hai số là $8$. Số còn lại là bao nhiêu?', promptFr: 'La somme de deux entiers est $2$. L’un d’eux est $8$. Quel est l’autre entier ?',
        solution: ['The other integer $= 2 - 8$.', '$2 - 8 = -6$. Check: $8 + -6 = 2$. ✓'],
        solutionVn: ['Số còn lại $= 2 - 8$.', '$2 - 8 = -6$. Thử lại: $8 + -6 = 2$. ✓'],
        solutionFr: ['L’autre entier $= 2 - 8$.', '$2 - 8 = -6$. Vérification : $8 + -6 = 2$. ✓'],
        answer: '$-6$', answerVn: '$-6$', answerFr: '$-6$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1', type: 'dnd',
        prompt: 'Drag each number into a sum so that every sum is correct. Use **each number once**.',
        promptVn: 'Kéo mỗi số vào một phép tính sao cho mọi tổng đều đúng. Dùng **mỗi số một lần**.',
        promptFr: 'Fais glisser chaque nombre dans une somme pour que toutes les sommes soient justes. Utilise **chaque nombre une seule fois**.',
        bank: [
          { val: '-5', text: '$-5$' }, { val: '-3', text: '$-3$' }, { val: '-2', text: '$-2$' },
          { val: '3', text: '$3$' }, { val: '4', text: '$4$' }, { val: '5', text: '$5$' },
        ],
        targets: [
          { id: 's1', title: 'sum $= 1$', titleVn: 'tổng $= 1$', titleFr: 'somme $= 1$' },
          { id: 's2', title: 'sum $= -2$', titleVn: 'tổng $= -2$', titleFr: 'somme $= -2$' },
          { id: 's3', title: 'sum $= 3$', titleVn: 'tổng $= 3$', titleFr: 'somme $= 3$' },
        ],
        correctSets: { s1: ['-3', '4'], s2: ['-5', '3'], s3: ['-2', '5'] },
        solution: ['Every integer is used exactly once across the three sums.', '$-3 + 4 = 1$.', '$-5 + 3 = -2$.', '$-2 + 5 = 3$.'],
        solutionVn: ['Mỗi số nguyên được dùng đúng một lần trong ba phép tính.', '$-3 + 4 = 1$.', '$-5 + 3 = -2$.', '$-2 + 5 = 3$.'],
        solutionFr: ['Chaque entier est utilisé exactement une fois dans les trois sommes.', '$-3 + 4 = 1$.', '$-5 + 3 = -2$.', '$-2 + 5 = 3$.'],
        answer: '$-3+4=1,\\ \\ -5+3=-2,\\ \\ -2+5=3$', answerVn: '$-3+4=1,\\ \\ -5+3=-2,\\ \\ -2+5=3$', answerFr: '$-3+4=1,\\ \\ -5+3=-2,\\ \\ -2+5=3$',
      },
      {
        id: 'c2',
        prompt: 'Mr Bowen has $-6$ dollars in his account — he **owes** the bank 6 dollars. He **deposits** 20 dollars, then **withdraws** 9 dollars, then the bank **takes away** a 4-dollar debt he had forgotten. How much does he have now?',
        promptVn: 'Thầy Bowen có $-6$ đô trong tài khoản — thầy **nợ** ngân hàng 6 đô. Thầy **gửi vào** 20 đô, rồi **rút ra** 9 đô, sau đó ngân hàng **xoá** một khoản nợ 4 đô thầy đã quên. Bây giờ thầy có bao nhiêu?',
        promptFr: 'M. Bowen a $-6$ dollars sur son compte — il **doit** 6 dollars à la banque. Il **dépose** 20 dollars, puis **retire** 9 dollars, puis la banque **efface** une dette de 4 dollars qu’il avait oubliée. Combien a-t-il maintenant ?',
        solution: ['Work along the sentence in order. Deposit adds, withdraw subtracts, and taking away a debt is minus a negative.', '$-6 + 20 - 9 - (-4) = -6 + 20 - 9 + 4 = 9$, so **9 dollars**.'],
        solutionVn: ['Làm theo đúng thứ tự trong câu. Gửi vào là cộng, rút ra là trừ, và xoá một khoản nợ là trừ một số âm.', '$-6 + 20 - 9 - (-4) = -6 + 20 - 9 + 4 = 9$, vậy là **9 đô**.'],
        solutionFr: ['Suis la phrase dans l’ordre. Déposer, c’est additionner ; retirer, c’est soustraire ; et effacer une dette, c’est soustraire un négatif.', '$-6 + 20 - 9 - (-4) = -6 + 20 - 9 + 4 = 9$, donc **9 dollars**.'],
        answer: '$9$', answerVn: '$9$', answerFr: '$9$',
      },
      {
        id: 'c3',
        prompt: 'At 6 a.m. it is $-11$ °C at a research station. By noon the temperature has **risen 4 degrees**. By midnight it has **fallen 9 degrees**. What is the temperature at midnight?',
        promptVn: 'Lúc 6 giờ sáng, một trạm nghiên cứu ở $-11$ °C. Đến trưa nhiệt độ đã **tăng 4 độ**. Đến nửa đêm nhiệt độ đã **giảm 9 độ**. Nhiệt độ lúc nửa đêm là bao nhiêu?',
        promptFr: 'À 6 h du matin, il fait $-11$ °C dans une station de recherche. À midi, la température a **augmenté de 4 degrés**. À minuit, elle a **baissé de 9 degrés**. Quelle est la température à minuit ?',
        solution: ['Start, then the rise, then the fall, in order.', '$-11 + 4 - 9 = -16$, so **$-16$ °C**.'],
        solutionVn: ['Số ban đầu, rồi phần tăng, rồi phần giảm, theo đúng thứ tự.', '$-11 + 4 - 9 = -16$, vậy là **$-16$ °C**.'],
        solutionFr: ['Le départ, puis la hausse, puis la baisse, dans l’ordre.', '$-11 + 4 - 9 = -16$, donc **$-16$ °C**.'],
        answer: '$-16$', answerVn: '$-16$', answerFr: '$-16$',
      },
    ],
  },
];
