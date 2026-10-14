// src/data/Y7_MATH/U01_3/workbook.js
// Reveal-solution practice for 1.3 Lowest Common Multiples.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. The last two Challenge
// questions are the word problems demoted from the classroom deck (The Two Taps
// and The Two Alarms, ADAPTATION-PLAN §8). See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which number is the **lowest common multiple** of 3 and 4 — the smallest number in **both** times-tables?',
        promptVn: 'Số nào là **bội số chung nhỏ nhất** của 3 và 4 — số nhỏ nhất có trong **cả hai** bảng cửu chương?',
        promptFr: 'Quel nombre est le **plus petit commun multiple** de 3 et 4 — le plus petit nombre présent dans les **deux** tables de multiplication ?',
        options: [
          { val: 'a', text: '$7$' },
          { val: 'b', text: '$12$' },
          { val: 'c', text: '$24$' },
          { val: 'd', text: '$1$' },
        ],
        correct: 'b',
        solution: ['Multiples of 3: 3, 6, 9, **12**, … Multiples of 4: 4, 8, **12**, …', 'The lowest number in both lists is $12$.'],
        solutionVn: ['Bội số của 3: 3, 6, 9, **12**, … Bội số của 4: 4, 8, **12**, …', 'Số nhỏ nhất có trong cả hai là $12$.'],
        solutionFr: ['Multiples de 3 : 3, 6, 9, **12**, … Multiples de 4 : 4, 8, **12**, …', 'Le plus petit nombre dans les deux listes est $12$.'],
        answer: '$12$', answerVn: '$12$', answerFr: '$12$',
      },
      {
        id: 'f2', prompt: 'Find the LCM of 6 and 8.', promptVn: 'Tìm BCNN của 6 và 8.', promptFr: 'Trouve le PPCM de 6 et 8.',
        solution: ['Multiples of 6: 6, 12, 18, **24**, … Multiples of 8: 8, 16, **24**, …', 'The LCM is $24$.'],
        solutionVn: ['Bội số của 6: 6, 12, 18, **24**, … Bội số của 8: 8, 16, **24**, …', 'BCNN là $24$.'],
        solutionFr: ['Multiples de 6 : 6, 12, 18, **24**, … Multiples de 8 : 8, 16, **24**, …', 'Le PPCM est $24$.'],
        answer: '$24$', answerVn: '$24$', answerFr: '$24$',
      },
      {
        id: 'f3', prompt: 'Find the LCM of 5 and 6.', promptVn: 'Tìm BCNN của 5 và 6.', promptFr: 'Trouve le PPCM de 5 et 6.',
        solution: ['5 and 6 share no factor, so list them: 5, 10, 15, 20, 25, **30**, … and 6, 12, 18, 24, **30**, …', 'The LCM is $30$ (here $5 × 6$ happens to work).'],
        solutionVn: ['5 và 6 không có thừa số chung, hãy liệt kê: 5, 10, 15, 20, 25, **30**, … và 6, 12, 18, 24, **30**, …', 'BCNN là $30$ (ở đây $5 × 6$ tình cờ đúng).'],
        solutionFr: ['5 et 6 n’ont aucun diviseur commun, alors fais les listes : 5, 10, 15, 20, 25, **30**, … et 6, 12, 18, 24, **30**, …', 'Le PPCM est $30$ (ici, $5 × 6$ marche par chance).'],
        answer: '$30$', answerVn: '$30$', answerFr: '$30$',
      },
      {
        id: 'f4', prompt: 'Find the LCM of 4 and 10.', promptVn: 'Tìm BCNN của 4 và 10.', promptFr: 'Trouve le PPCM de 4 et 10.',
        solution: ['Multiples of 4: 4, 8, 12, 16, **20**, … Multiples of 10: 10, **20**, …', 'The LCM is $20$, not 40.'],
        solutionVn: ['Bội số của 4: 4, 8, 12, 16, **20**, … Bội số của 10: 10, **20**, …', 'BCNN là $20$, không phải 40.'],
        solutionFr: ['Multiples de 4 : 4, 8, 12, 16, **20**, … Multiples de 10 : 10, **20**, …', 'Le PPCM est $20$, pas 40.'],
        answer: '$20$', answerVn: '$20$', answerFr: '$20$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    tierFr: 'Entraînement',
    questions: [
      {
        id: 'p1', prompt: 'Find the LCM of 6 and 9.', promptVn: 'Tìm BCNN của 6 và 9.', promptFr: 'Trouve le PPCM de 6 et 9.',
        solution: ['Multiples of 6: 6, 12, **18**, … Multiples of 9: 9, **18**, …', 'The LCM is $18$, not 54.'],
        solutionVn: ['Bội số của 6: 6, 12, **18**, … Bội số của 9: 9, **18**, …', 'BCNN là $18$, không phải 54.'],
        solutionFr: ['Multiples de 6 : 6, 12, **18**, … Multiples de 9 : 9, **18**, …', 'Le PPCM est $18$, pas 54.'],
        answer: '$18$', answerVn: '$18$', answerFr: '$18$',
      },
      {
        id: 'p2', prompt: 'Find the LCM of 3 and 12.', promptVn: 'Tìm BCNN của 3 và 12.', promptFr: 'Trouve le PPCM de 3 et 12.',
        solution: ['3 divides into 12, so the LCM is just the **bigger** number.', 'The LCM is $12$, not 36.'],
        solutionVn: ['3 chia hết 12, nên BCNN chính là **số lớn hơn**.', 'BCNN là $12$, không phải 36.'],
        solutionFr: ['3 divise 12, donc le PPCM est simplement le **plus grand** nombre.', 'Le PPCM est $12$, pas 36.'],
        answer: '$12$', answerVn: '$12$', answerFr: '$12$',
      },
      {
        id: 'p3', prompt: 'Find the LCM of 7 and 4.', promptVn: 'Tìm BCNN của 7 và 4.', promptFr: 'Trouve le PPCM de 7 et 4.',
        solution: ['7 and 4 share no factor. Multiples of 7: 7, 14, 21, **28**, … Multiples of 4: 4, 8, 12, 16, 20, 24, **28**, …', 'The LCM is $28$.'],
        solutionVn: ['7 và 4 không có thừa số chung. Bội số của 7: 7, 14, 21, **28**, … Bội số của 4: 4, 8, 12, 16, 20, 24, **28**, …', 'BCNN là $28$.'],
        solutionFr: ['7 et 4 n’ont aucun diviseur commun. Multiples de 7 : 7, 14, 21, **28**, … Multiples de 4 : 4, 8, 12, 16, 20, 24, **28**, …', 'Le PPCM est $28$.'],
        answer: '$28$', answerVn: '$28$', answerFr: '$28$',
      },
      {
        id: 'p4', type: 'fill_blank',
        prompt: 'Write the first **three common multiples** of 4 and 6, smallest first.',
        promptVn: 'Viết **ba bội số chung** đầu tiên của 4 và 6, từ nhỏ đến lớn.',
        promptFr: 'Écris les **trois premiers multiples communs** de 4 et 6, du plus petit au plus grand.',
        textParts: ['', ' , ', ' , ', ''], textPartsVn: ['', ' , ', ' , ', ''], textPartsFr: ['', ' , ', ' , ', ''],
        blanks: { '1': { correct: '12', width: 3 }, '2': { correct: '24', width: 3 }, '3': { correct: '36', width: 3 } },
        solution: ['The common multiples are the numbers in both lists of multiples.', 'They are $12, 24, 36$.'],
        solutionVn: ['Bội số chung là những số có trong cả hai danh sách bội số.', 'Đó là $12, 24, 36$.'],
        solutionFr: ['Les multiples communs sont les nombres présents dans les deux listes de multiples.', 'Ce sont $12, 24, 36$.'],
        answer: '$12, 24, 36$', answerVn: '$12, 24, 36$', answerFr: '$12, 24, 36$',
      },
      {
        id: 'p5', prompt: 'Find the LCM of 8 and 12.', promptVn: 'Tìm BCNN của 8 và 12.', promptFr: 'Trouve le PPCM de 8 et 12.',
        solution: ['Multiples of 8: 8, 16, **24**, … Multiples of 12: 12, **24**, …', 'The LCM is $24$, not 96.'],
        solutionVn: ['Bội số của 8: 8, 16, **24**, … Bội số của 12: 12, **24**, …', 'BCNN là $24$, không phải 96.'],
        solutionFr: ['Multiples de 8 : 8, 16, **24**, … Multiples de 12 : 12, **24**, …', 'Le PPCM est $24$, pas 96.'],
        answer: '$24$', answerVn: '$24$', answerFr: '$24$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1', prompt: 'Find the LCM of **three** numbers: 4, 6 and 8.', promptVn: 'Tìm BCNN của **ba** số: 4, 6 và 8.', promptFr: 'Trouve le PPCM de **trois** nombres : 4, 6 et 8.',
        solution: ['List multiples until one appears in **all three** lists.', '4: 4, 8, 12, 16, 20, **24** · 6: 6, 12, 18, **24** · 8: 8, 16, **24**.', 'The LCM is $24$.'],
        solutionVn: ['Liệt kê bội số cho đến khi có số xuất hiện trong **cả ba** danh sách.', '4: 4, 8, 12, 16, 20, **24** · 6: 6, 12, 18, **24** · 8: 8, 16, **24**.', 'BCNN là $24$.'],
        solutionFr: ['Fais la liste des multiples jusqu’à ce qu’un nombre apparaisse dans **les trois** listes.', '4 : 4, 8, 12, 16, 20, **24** · 6 : 6, 12, 18, **24** · 8 : 8, 16, **24**.', 'Le PPCM est $24$.'],
        answer: '$24$', answerVn: '$24$', answerFr: '$24$',
      },
      {
        id: 'c2', prompt: 'Mr Bowen has two dripping taps. One drips every **4 seconds**, the other every **12 seconds**. They have just dripped together. After how many seconds do they next drip together?', promptVn: 'Thầy Bowen có hai vòi nước rỉ. Một vòi nhỏ giọt mỗi **4 giây**, vòi kia mỗi **12 giây**. Chúng vừa nhỏ giọt cùng lúc. Sau bao nhiêu giây nữa chúng lại cùng nhỏ giọt?', promptFr: 'M. Bowen a deux robinets qui fuient. L’un goutte toutes les **4 secondes**, l’autre toutes les **12 secondes**. Ils viennent de goutter ensemble. Après combien de secondes gouttent-ils de nouveau ensemble ?',
        solution: ['You need the LCM of 4 and 12. Since 4 divides into 12, the LCM is just 12.', 'They drip together every $12$ seconds — not 48.'],
        solutionVn: ['Em cần BCNN của 4 và 12. Vì 4 chia hết 12, nên BCNN chính là 12.', 'Chúng nhỏ giọt cùng nhau mỗi $12$ giây — không phải 48.'],
        solutionFr: ['Il te faut le PPCM de 4 et 12. Comme 4 divise 12, le PPCM est simplement 12.', 'Ils gouttent ensemble toutes les $12$ secondes — pas 48.'],
        answer: '$12$', answerVn: '$12$', answerFr: '$12$',
      },
      {
        id: 'c3', prompt: 'Mr Bowen sets two alarms. One rings every **15 minutes**, the other every **15 minutes**. They have both just rung. After how many minutes do they next ring together?', promptVn: 'Thầy Bowen đặt hai đồng hồ báo thức. Một cái reo mỗi **15 phút**, cái kia mỗi **15 phút**. Cả hai vừa reo. Sau bao nhiêu phút nữa chúng lại cùng reo?', promptFr: 'M. Bowen règle deux alarmes. L’une sonne toutes les **15 minutes**, l’autre toutes les **15 minutes**. Elles viennent de sonner toutes les deux. Après combien de minutes sonnent-elles de nouveau ensemble ?',
        solution: ['Read both numbers carefully — they are the same. The LCM of 15 and 15 is 15.', 'They ring together every $15$ minutes; they were never apart.'],
        solutionVn: ['Đọc kỹ cả hai số — chúng giống nhau. BCNN của 15 và 15 là 15.', 'Chúng cùng reo mỗi $15$ phút; chúng chưa bao giờ lệch nhau.'],
        solutionFr: ['Lis bien les deux nombres — ils sont identiques. Le PPCM de 15 et 15 est 15.', 'Elles sonnent ensemble toutes les $15$ minutes ; elles n’ont jamais été décalées.'],
        answer: '$15$', answerVn: '$15$', answerFr: '$15$',
      },
    ],
  },
];
