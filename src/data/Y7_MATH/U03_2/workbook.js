// src/data/Y7_MATH/U03_2/workbook.js
// Practice for 3.2 Rounding — 12 questions (4 Focus · 5 Practice · 3 Challenge)
// mixing six answer widgets: a typed number, dropdowns in a sentence, multiple
// choice (every trailing-zero answer is one of these — a typed box marks by
// value, so it cannot tell 7.0 from 7), drag into targets, typed boxes in a
// worked division, and dragging the steps into order with one wrong card.
//
// Six questions are divisions worked the short way — each remainder carried
// onto the next digit, zeros added after the point — and the `solution` lines
// say every carry out loud ("4 into 39 is 9, remainder 3 …").
//
// Every number is original: not the deck's, not Bus Stop's, not the quiz's and
// not the book's Exercise 3.2.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    tierFr: 'Bases',
    questions: [
      {
        id: 'f1',
        prompt: 'Round $5.738$ to 1 decimal place.',
        promptVn: 'Làm tròn $5.738$ đến 1 chữ số thập phân.',
        promptFr: 'Arrondis $5.738$ à 1 décimale.',
        solution: [
          'The 1st decimal place is the 7. The next digit is 3.',
          '3 is 4 or less, so the 7 stays.',
          '$5.738$ to 1 d.p. is $5.7$.',
        ],
        solutionVn: [
          'Chữ số thập phân thứ nhất là 7. Chữ số ngay sau là 3.',
          '3 là từ 4 trở xuống, nên số 7 giữ nguyên.',
          '$5.738$ đến 1 d.p. là $5.7$.',
        ],
        solutionFr: [
          'La 1re décimale est le 7. Le chiffre suivant est 3.',
          '3, c’est 4 ou moins, donc le 7 reste.',
          '$5.738$ à 1 d.p. donne $5.7$.',
        ],
        answer: '5.7',
        answerVn: '5.7',
        answerFr: '5.7',
      },
      {
        id: 'f2',
        type: 'inline',
        prompt: 'Round $8.2764$ to 2 decimal places. Choose from the lists.',
        promptVn: 'Làm tròn $8.2764$ đến 2 chữ số thập phân. Hãy chọn trong danh sách.',
        promptFr: 'Arrondis $8.2764$ à 2 décimales. Choisis dans les listes.',
        textParts: ['The 2nd decimal place is the ', '. The next digit is ', ', so $8.2764$ to 2 d.p. is ', '.'],
        textPartsVn: ['Chữ số thập phân thứ 2 là ', '. Chữ số ngay sau là ', ', nên $8.2764$ đến 2 d.p. là ', '.'],
        textPartsFr: ['La 2e décimale est le ', '. Le chiffre suivant est ', ', donc $8.2764$ à 2 d.p. donne ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'd2', text: '2', textVn: '2', textFr: '2' },
              { val: 'd7', text: '7', textVn: '7', textFr: '7' },
              { val: 'd6', text: '6', textVn: '6', textFr: '6' },
              { val: 'd4', text: '4', textVn: '4', textFr: '4' },
            ],
            correct: 'd7',
          },
          '2': {
            options: [
              { val: 'd7', text: '7', textVn: '7', textFr: '7' },
              { val: 'd6', text: '6', textVn: '6', textFr: '6' },
              { val: 'd4', text: '4', textVn: '4', textFr: '4' },
            ],
            correct: 'd6',
          },
          '3': {
            options: [
              { val: 'chop', text: '8.27', textVn: '8.27', textFr: '8.27' },
              { val: 'ok', text: '8.28', textVn: '8.28', textFr: '8.28' },
              { val: 'one', text: '8.3', textVn: '8.3', textFr: '8.3' },
              { val: 'three', text: '8.276', textVn: '8.276', textFr: '8.276' },
            ],
            correct: 'ok',
          },
        },
        solution: [
          'Count from the point: 2 is the 1st decimal place, 7 is the 2nd.',
          'The next digit is 6, which is 5 or more, so the 7 goes up to 8.',
          '$8.2764$ to 2 d.p. is $8.28$. ($8.27$ is chopped, $8.3$ is 1 d.p. and $8.276$ is 3 d.p.)',
        ],
        solutionVn: [
          'Đếm từ dấu thập phân: 2 là chữ số thập phân thứ nhất, 7 là thứ hai.',
          'Chữ số ngay sau là 6, từ 5 trở lên, nên số 7 tăng lên thành 8.',
          '$8.2764$ đến 2 d.p. là $8.28$. ($8.27$ là cắt cụt, $8.3$ là 1 d.p. và $8.276$ là 3 d.p.)',
        ],
        solutionFr: [
          'Compte à partir du point : 2 est la 1re décimale, 7 est la 2e.',
          'Le chiffre suivant est 6, c’est 5 ou plus, donc le 7 monte à 8.',
          '$8.2764$ à 2 d.p. donne $8.28$. ($8.27$ est tronqué, $8.3$ a 1 d.p. et $8.276$ a 3 d.p.)',
        ],
        answer: '7; 6; $8.28$',
        answerVn: '7; 6; $8.28$',
        answerFr: '7; 6; $8.28$',
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: 'Round $6.97$ to 1 decimal place.',
        promptVn: 'Làm tròn $6.97$ đến 1 chữ số thập phân.',
        promptFr: 'Arrondis $6.97$ à 1 décimale.',
        options: [
          { val: 'A', text: '$6.9$', textVn: '$6.9$', textFr: '$6.9$' },
          { val: 'B', text: '$7$', textVn: '$7$', textFr: '$7$' },
          { val: 'C', text: '$6.10$', textVn: '$6.10$', textFr: '$6.10$' },
          { val: 'D', text: '$7.0$', textVn: '$7.0$', textFr: '$7.0$' },
        ],
        correct: 'D',
        solution: [
          'The next digit is 7, so the 9 tenths go up to 10 tenths.',
          '10 tenths is one whole: it carries, and $6.9$ becomes $7.0$.',
          'Keep the zero — it shows 1 decimal place. B has dropped it, A is chopped, and C writes the 10 in one column.',
        ],
        solutionVn: [
          'Chữ số ngay sau là 7, nên 9 phần mười tăng lên thành 10 phần mười.',
          '10 phần mười là một đơn vị: phải nhớ sang, và $6.9$ thành $7.0$.',
          'Giữ lại số 0 — nó cho thấy 1 chữ số thập phân. B bỏ mất số 0, A là cắt cụt, và C viết cả 10 vào một cột.',
        ],
        solutionFr: [
          'Le chiffre suivant est 7, donc les 9 dixièmes montent à 10 dixièmes.',
          '10 dixièmes font une unité : on fait une retenue, et $6.9$ devient $7.0$.',
          'Garde le zéro — il montre 1 décimale. B l’a supprimé, A est tronqué, et C écrit le 10 dans une seule colonne.',
        ],
        answer: 'D',
        answerVn: 'D',
        answerFr: 'D',
      },
      {
        id: 'f4',
        type: 'dnd',
        prompt: 'Drag each answer for $638.2951$ to its degree of accuracy. Two cards are mistakes — leave them out.',
        promptVn: 'Kéo từng đáp án của $638.2951$ vào đúng độ chính xác. Có hai thẻ là lỗi sai — hãy bỏ chúng ra.',
        promptFr: 'Fais glisser chaque réponse pour $638.2951$ vers son degré de précision. Deux cartes sont des erreurs — laisse-les de côté.',
        bank: [
          { val: '638.30', text: '$638.30$' },
          { val: '630', text: '$630$' },
          { val: '638.3', text: '$638.3$' },
          { val: '640', text: '$640$' },
          { val: '638.29', text: '$638.29$' },
          { val: '638', text: '$638$' },
        ],
        targets: [
          { id: 'ten', title: 'nearest 10', titleVn: 'hàng chục gần nhất', titleFr: 'à la dizaine près' },
          { id: 'whole', title: 'nearest whole number', titleVn: 'số nguyên gần nhất', titleFr: 'à l’unité près' },
          { id: 'dp1', title: '1 d.p.', titleVn: '1 d.p.', titleFr: '1 d.p.' },
          { id: 'dp2', title: '2 d.p.', titleVn: '2 d.p.', titleFr: '2 d.p.' },
        ],
        correctSets: { ten: ['640'], whole: ['638'], dp1: ['638.3'], dp2: ['638.30'] },
        solution: [
          'Nearest 10: the tens digit is 3 and the next digit is 8, so it goes up: $640$. ($630$ is chopped.)',
          'Nearest whole number: the next digit is 2, so the 8 stays: $638$.',
          '1 d.p.: the next digit is 9, so $.2$ goes up to $.3$: $638.3$.',
          '2 d.p.: the next digit is 5, so $.29$ goes up to $.30$: $638.30$ — keep the zero. ($638.29$ is chopped.)',
        ],
        solutionVn: [
          'Hàng chục gần nhất: chữ số hàng chục là 3 và chữ số ngay sau là 8, nên tăng lên: $640$. ($630$ là cắt cụt.)',
          'Số nguyên gần nhất: chữ số ngay sau là 2, nên số 8 giữ nguyên: $638$.',
          '1 d.p.: chữ số ngay sau là 9, nên $.2$ tăng lên thành $.3$: $638.3$.',
          '2 d.p.: chữ số ngay sau là 5, nên $.29$ tăng lên thành $.30$: $638.30$ — nhớ giữ số 0. ($638.29$ là cắt cụt.)',
        ],
        solutionFr: [
          'À la dizaine près : le chiffre des dizaines est 3 et le chiffre suivant est 8, donc il monte : $640$. ($630$ est tronqué.)',
          'À l’unité près : le chiffre suivant est 2, donc le 8 reste : $638$.',
          '1 d.p. : le chiffre suivant est 9, donc $.2$ monte à $.3$ : $638.3$.',
          '2 d.p. : le chiffre suivant est 5, donc $.29$ monte à $.30$ : $638.30$ — garde le zéro. ($638.29$ est tronqué.)',
        ],
        answer: '$640$ · $638$ · $638.3$ · $638.30$',
        answerVn: '$640$ · $638$ · $638.3$ · $638.30$',
        answerFr: '$640$ · $638$ · $638.3$ · $638.30$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    tierFr: 'Entraînement',
    questions: [
      {
        id: 'p1',
        type: 'fill_blank',
        prompt: 'Work out $39 ÷ 4$ by short division. Fill in each remainder, then the answer.',
        promptVn: 'Tính $39 ÷ 4$ bằng phép chia ngắn. Điền từng số dư, rồi điền đáp án.',
        promptFr: 'Calcule $39 ÷ 4$ par division courte. Complète chaque reste, puis la réponse.',
        textParts: ['4 into 39 is 9, remainder ', '. Add a zero: 4 into 30 is 7, remainder ', '. Add a zero: 4 into 20 is 5, remainder 0. So $39 ÷ 4 =$ ', '.'],
        textPartsVn: ['39 chia 4 được 9, dư ', '. Thêm một số 0: 30 chia 4 được 7, dư ', '. Thêm một số 0: 20 chia 4 được 5, dư 0. Vậy $39 ÷ 4 =$ ', '.'],
        textPartsFr: ['39 divisé par 4 donne 9, reste ', '. Ajoute un zéro : 30 divisé par 4 donne 7, reste ', '. Ajoute un zéro : 20 divisé par 4 donne 5, reste 0. Donc $39 ÷ 4 =$ ', '.'],
        blanks: {
          '1': { correct: '3', width: 4 },
          '2': { correct: '2', width: 4 },
          '3': { correct: '9.75', width: 6 },
        },
        solution: [
          '4 into 3 does not go, so read 39: 4 into 39 is 9, remainder 3.',
          'The digits have run out, so write the point and add a zero. The 3 rides on it: 30. 4 into 30 is 7, remainder 2.',
          'Add another zero and carry the 2: 20. 4 into 20 is 5, remainder 0 — finished. $39 ÷ 4 = 9.75$.',
        ],
        solutionVn: [
          '3 không chia được cho 4, nên đọc là 39: 39 chia 4 được 9, dư 3.',
          'Đã hết chữ số, nên viết dấu thập phân và thêm một số 0. Số 3 được nhớ sang nó: 30. 30 chia 4 được 7, dư 2.',
          'Thêm một số 0 nữa và nhớ 2 sang: 20. 20 chia 4 được 5, dư 0 — xong. $39 ÷ 4 = 9.75$.',
        ],
        solutionFr: [
          '3 divisé par 4 ne va pas, alors lis 39 : 39 divisé par 4 donne 9, reste 3.',
          'Il n’y a plus de chiffres, alors écris le point et ajoute un zéro. Le 3 se reporte dessus : 30. 30 divisé par 4 donne 7, reste 2.',
          'Ajoute un autre zéro et reporte le 2 : 20. 20 divisé par 4 donne 5, reste 0 — c’est fini. $39 ÷ 4 = 9.75$.',
        ],
        answer: '3; 2; $9.75$',
        answerVn: '3; 2; $9.75$',
        answerFr: '3; 2; $9.75$',
      },
      {
        id: 'p2',
        prompt: 'Work out $13 ÷ 8$. Add zeros after the point until the remainder is 0.',
        promptVn: 'Tính $13 ÷ 8$. Thêm số 0 sau dấu thập phân cho đến khi số dư bằng 0.',
        promptFr: 'Calcule $13 ÷ 8$. Ajoute des zéros après le point jusqu’à ce que le reste soit 0.',
        solution: [
          '8 into 13 is 1, remainder 5. Write the point, add a zero, and carry the 5: 50.',
          '8 into 50 is 6, remainder 2. Add a zero: 20. 8 into 20 is 2, remainder 4.',
          'Add a zero: 40. 8 into 40 is 5, remainder 0. $13 ÷ 8 = 1.625$.',
        ],
        solutionVn: [
          '13 chia 8 được 1, dư 5. Viết dấu thập phân, thêm một số 0, và nhớ 5 sang: 50.',
          '50 chia 8 được 6, dư 2. Thêm một số 0: 20. 20 chia 8 được 2, dư 4.',
          'Thêm một số 0: 40. 40 chia 8 được 5, dư 0. $13 ÷ 8 = 1.625$.',
        ],
        solutionFr: [
          '13 divisé par 8 donne 1, reste 5. Écris le point, ajoute un zéro, et reporte le 5 : 50.',
          '50 divisé par 8 donne 6, reste 2. Ajoute un zéro : 20. 20 divisé par 8 donne 2, reste 4.',
          'Ajoute un zéro : 40. 40 divisé par 8 donne 5, reste 0. $13 ÷ 8 = 1.625$.',
        ],
        answer: '1.625',
        answerVn: '1.625',
        answerFr: '1.625',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'Work out $44 ÷ 7$, correct to 2 decimal places.',
        promptVn: 'Tính $44 ÷ 7$, chính xác đến 2 chữ số thập phân.',
        promptFr: 'Calcule $44 ÷ 7$, arrondi à 2 décimales.',
        options: [
          { val: 'A', text: '$6.28$', textVn: '$6.28$', textFr: '$6.28$' },
          { val: 'B', text: '$6.29$', textVn: '$6.29$', textFr: '$6.29$' },
          { val: 'C', text: '$6.3$', textVn: '$6.3$', textFr: '$6.3$' },
          { val: 'D', text: '$6.285$', textVn: '$6.285$', textFr: '$6.285$' },
        ],
        correct: 'B',
        solution: [
          '7 into 44 is 6, remainder 2. Add a zero: 7 into 20 is 2, remainder 6. Add a zero: 7 into 60 is 8, remainder 4.',
          'That is 2 decimal places, so go one place further. Add a zero: 7 into 40 is 5. So $44 ÷ 7 = 6.285...$',
          'The 3rd decimal digit is 5, so round up: $6.29$. A stopped dividing too early, C is 1 d.p., and D has not been rounded.',
        ],
        solutionVn: [
          '44 chia 7 được 6, dư 2. Thêm một số 0: 20 chia 7 được 2, dư 6. Thêm một số 0: 60 chia 7 được 8, dư 4.',
          'Đó mới là 2 chữ số thập phân, nên tính thêm một cột. Thêm một số 0: 40 chia 7 được 5. Vậy $44 ÷ 7 = 6.285...$',
          'Chữ số thập phân thứ 3 là 5, nên làm tròn lên: $6.29$. A dừng chia quá sớm, C là 1 d.p., và D chưa được làm tròn.',
        ],
        solutionFr: [
          '44 divisé par 7 donne 6, reste 2. Ajoute un zéro : 20 divisé par 7 donne 2, reste 6. Ajoute un zéro : 60 divisé par 7 donne 8, reste 4.',
          'Cela fait 2 décimales, donc va un rang plus loin. Ajoute un zéro : 40 divisé par 7 donne 5. Donc $44 ÷ 7 = 6.285...$',
          'La 3e décimale est 5, donc on arrondit au-dessus : $6.29$. A a arrêté de diviser trop tôt, C a 1 d.p., et D n’a pas été arrondi.',
        ],
        answer: 'B',
        answerVn: 'B',
        answerFr: 'B',
      },
      {
        id: 'p4',
        type: 'inline',
        prompt: '$20 ÷ 3 = 6.6666...$ Choose the answer for each instruction.',
        promptVn: '$20 ÷ 3 = 6.6666...$ Hãy chọn đáp án cho từng yêu cầu.',
        promptFr: '$20 ÷ 3 = 6.6666...$ Choisis la réponse pour chaque consigne.',
        textParts: ['$20 ÷ 3$ **as far as** 3 d.p. is ', '. $20 ÷ 3$ **correct to** 3 d.p. is ', '.'],
        textPartsVn: ['$20 ÷ 3$ **as far as** 3 d.p. là ', '. $20 ÷ 3$ **correct to** 3 d.p. là ', '.'],
        textPartsFr: ['$20 ÷ 3$ **as far as** 3 d.p. donne ', '. $20 ÷ 3$ **correct to** 3 d.p. donne ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'chop', text: '6.666', textVn: '6.666', textFr: '6.666' },
              { val: 'round', text: '6.667', textVn: '6.667', textFr: '6.667' },
              { val: 'two', text: '6.67', textVn: '6.67', textFr: '6.67' },
            ],
            correct: 'chop',
          },
          '2': {
            options: [
              { val: 'chop', text: '6.666', textVn: '6.666', textFr: '6.666' },
              { val: 'round', text: '6.667', textVn: '6.667', textFr: '6.667' },
              { val: 'two', text: '6.67', textVn: '6.67', textFr: '6.67' },
            ],
            correct: 'round',
          },
        },
        solution: [
          '"As far as" means keep dividing until you have 3 decimal places, then stop: $6.666$. Nothing is rounded.',
          '"Correct to" means round. The 4th decimal digit is 6, which is 5 or more, so the 3rd goes up: $6.667$.',
          '$6.67$ is correct to 2 d.p., which neither instruction asked for.',
        ],
        solutionVn: [
          '"As far as" nghĩa là cứ chia cho đến khi có 3 chữ số thập phân, rồi dừng: $6.666$. Không làm tròn gì cả.',
          '"Correct to" nghĩa là làm tròn. Chữ số thập phân thứ 4 là 6, từ 5 trở lên, nên chữ số thứ 3 tăng lên: $6.667$.',
          '$6.67$ là chính xác đến 2 d.p., mà không yêu cầu nào hỏi như vậy.',
        ],
        solutionFr: [
          '« As far as » veut dire : continue à diviser jusqu’à avoir 3 décimales, puis arrête-toi : $6.666$. On n’arrondit rien.',
          '« Correct to » veut dire arrondir. La 4e décimale est 6, c’est 5 ou plus, donc la 3e monte : $6.667$.',
          '$6.67$ est arrondi à 2 d.p., ce qu’aucune consigne ne demandait.',
        ],
        answer: '$6.666$; $6.667$',
        answerVn: '$6.666$; $6.667$',
        answerFr: '$6.666$; $6.667$',
      },
      {
        id: 'p5',
        type: 'order',
        prompt: 'Drag the steps for "work out $31 ÷ 6$, correct to 1 d.p." into order. One card is a mistake — leave it out.',
        promptVn: 'Kéo các bước của bài "tính $31 ÷ 6$, chính xác đến 1 d.p." theo đúng thứ tự. Có một thẻ là lỗi sai — hãy bỏ nó ra.',
        promptFr: 'Range dans l’ordre les étapes de « calcule $31 ÷ 6$, arrondi à 1 d.p. ». Une carte est une erreur — laisse-la de côté.',
        bank: [
          { val: 'stop', text: 'Stop at $5.1$ — the question says 1 d.p.', textVn: 'Dừng ở $5.1$ — đề bài ghi 1 d.p.', textFr: 'Arrête-toi à $5.1$ — la question dit 1 d.p.' },
          { val: 'round', text: 'Round once: $5.16$ becomes $5.2$', textVn: 'Làm tròn một lần: $5.16$ thành $5.2$', textFr: 'Arrondis une fois : $5.16$ devient $5.2$' },
          { val: 'first', text: '6 into 31 is 5, remainder 1', textVn: '31 chia 6 được 5, dư 1', textFr: '31 divisé par 6 donne 5, reste 1' },
          { val: 'third', text: 'Add a zero: 6 into 40 is 6 — now 2 decimal places', textVn: 'Thêm một số 0: 40 chia 6 được 6 — giờ đã có 2 chữ số thập phân', textFr: 'Ajoute un zéro : 40 divisé par 6 donne 6 — maintenant 2 décimales' },
          { val: 'second', text: 'Write the point, add a zero: 6 into 10 is 1, remainder 4', textVn: 'Viết dấu thập phân, thêm một số 0: 10 chia 6 được 1, dư 4', textFr: 'Écris le point, ajoute un zéro : 10 divisé par 6 donne 1, reste 4' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối', titleFr: 'Du premier au dernier' }],
        correctSets: { seq: ['first', 'second', 'third', 'round'] },
        solution: [
          '6 into 31 is 5, remainder 1. The digits run out, so write the point and add a zero: 6 into 10 is 1, remainder 4.',
          'For 1 d.p. you need 2 decimal places. Add another zero: 6 into 40 is 6. So $31 ÷ 6 = 5.16...$',
          'Round once: the 2nd decimal digit is 6, so $5.1$ goes up to $5.2$. Stopping at $5.1$ is "as far as 1 d.p.", not "correct to".',
        ],
        solutionVn: [
          '31 chia 6 được 5, dư 1. Hết chữ số, nên viết dấu thập phân và thêm một số 0: 10 chia 6 được 1, dư 4.',
          'Với 1 d.p., em cần 2 chữ số thập phân. Thêm một số 0 nữa: 40 chia 6 được 6. Vậy $31 ÷ 6 = 5.16...$',
          'Làm tròn một lần: chữ số thập phân thứ 2 là 6, nên $5.1$ tăng lên thành $5.2$. Dừng ở $5.1$ là "as far as 1 d.p.", không phải "correct to".',
        ],
        solutionFr: [
          '31 divisé par 6 donne 5, reste 1. Il n’y a plus de chiffres, alors écris le point et ajoute un zéro : 10 divisé par 6 donne 1, reste 4.',
          'Pour 1 d.p., il te faut 2 décimales. Ajoute un autre zéro : 40 divisé par 6 donne 6. Donc $31 ÷ 6 = 5.16...$',
          'Arrondis une fois : la 2e décimale est 6, donc $5.1$ monte à $5.2$. S’arrêter à $5.1$, c’est « as far as 1 d.p. », pas « correct to ».',
        ],
        answer: '31 → 5 r 1 · 10 → 1 r 4 · 40 → 6 · $5.16$ → $5.2$',
        answerVn: '31 → 5 dư 1 · 10 → 1 dư 4 · 40 → 6 · $5.16$ → $5.2$',
        answerFr: '31 → 5 reste 1 · 10 → 1 reste 4 · 40 → 6 · $5.16$ → $5.2$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    tierFr: 'Défi',
    questions: [
      {
        id: 'c1',
        prompt: 'A ribbon $9.5$ m long is cut into 6 equal pieces. How long is each piece, in metres, correct to 2 decimal places?',
        promptVn: 'Một dải ruy băng dài $9.5$ m được cắt thành 6 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu mét, chính xác đến 2 chữ số thập phân?',
        promptFr: 'Un ruban de $9.5$ m de long est coupé en 6 morceaux égaux. Quelle est la longueur de chaque morceau, en mètres, arrondie à 2 décimales ?',
        solution: [
          '$9.5 ÷ 6$: 6 into 9 is 1, remainder 3. The 3 rides on the 5: 6 into 35 is 5, remainder 5.',
          'Add a zero: 6 into 50 is 8, remainder 2. Add a zero: 6 into 20 is 3. So $9.5 ÷ 6 = 1.583...$ — three places, one more than you need.',
          'The 3rd decimal digit is 3, so the 8 stays: each piece is $1.58$ m.',
        ],
        solutionVn: [
          '$9.5 ÷ 6$: 9 chia 6 được 1, dư 3. Số 3 được nhớ sang số 5: 35 chia 6 được 5, dư 5.',
          'Thêm một số 0: 50 chia 6 được 8, dư 2. Thêm một số 0: 20 chia 6 được 3. Vậy $9.5 ÷ 6 = 1.583...$ — ba chữ số, nhiều hơn một so với yêu cầu.',
          'Chữ số thập phân thứ 3 là 3, nên số 8 giữ nguyên: mỗi đoạn dài $1.58$ m.',
        ],
        solutionFr: [
          '$9.5 ÷ 6$ : 9 divisé par 6 donne 1, reste 3. Le 3 se reporte sur le 5 : 35 divisé par 6 donne 5, reste 5.',
          'Ajoute un zéro : 50 divisé par 6 donne 8, reste 2. Ajoute un zéro : 20 divisé par 6 donne 3. Donc $9.5 ÷ 6 = 1.583...$ — trois rangs, un de plus que nécessaire.',
          'La 3e décimale est 3, donc le 8 reste : chaque morceau mesure $1.58$ m.',
        ],
        answer: '1.58',
        answerVn: '1.58',
        answerFr: '1.58',
        accept: ['1.58 m', '1.58m'],
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: 'Work out $31.8 ÷ 8$, correct to 1 decimal place.',
        promptVn: 'Tính $31.8 ÷ 8$, chính xác đến 1 chữ số thập phân.',
        promptFr: 'Calcule $31.8 ÷ 8$, arrondi à 1 décimale.',
        options: [
          { val: 'A', text: '$3.9$', textVn: '$3.9$', textFr: '$3.9$' },
          { val: 'B', text: '$4$', textVn: '$4$', textFr: '$4$' },
          { val: 'C', text: '$4.0$', textVn: '$4.0$', textFr: '$4.0$' },
          { val: 'D', text: '$3.97$', textVn: '$3.97$', textFr: '$3.97$' },
        ],
        correct: 'C',
        solution: [
          '8 into 31 is 3, remainder 7. The 7 rides on the 8: 8 into 78 is 9, remainder 6. That is 1 decimal place — go one further.',
          'Add a zero: 8 into 60 is 7. So $31.8 ÷ 8 = 3.97...$',
          'The 2nd decimal digit is 7, so the 9 tenths go up to 10 tenths and carry: $4.0$. Keep the zero. A stopped too early, B dropped the zero, and D is not rounded to 1 d.p.',
        ],
        solutionVn: [
          '31 chia 8 được 3, dư 7. Số 7 được nhớ sang số 8: 78 chia 8 được 9, dư 6. Đó mới là 1 chữ số thập phân — tính thêm một cột.',
          'Thêm một số 0: 60 chia 8 được 7. Vậy $31.8 ÷ 8 = 3.97...$',
          'Chữ số thập phân thứ 2 là 7, nên 9 phần mười tăng lên thành 10 phần mười và nhớ sang: $4.0$. Nhớ giữ số 0. A dừng quá sớm, B bỏ mất số 0, và D chưa làm tròn đến 1 d.p.',
        ],
        solutionFr: [
          '31 divisé par 8 donne 3, reste 7. Le 7 se reporte sur le 8 : 78 divisé par 8 donne 9, reste 6. Cela fait 1 décimale — va un rang plus loin.',
          'Ajoute un zéro : 60 divisé par 8 donne 7. Donc $31.8 ÷ 8 = 3.97...$',
          'La 2e décimale est 7, donc les 9 dixièmes montent à 10 dixièmes et font une retenue : $4.0$. Garde le zéro. A s’est arrêté trop tôt, B a supprimé le zéro, et D n’est pas arrondi à 1 d.p.',
        ],
        answer: 'C',
        answerVn: 'C',
        answerFr: 'C',
      },
      {
        id: 'c3',
        type: 'dnd',
        prompt: 'Round each number to 1 decimal place, and drag it to its answer.',
        promptVn: 'Làm tròn mỗi số đến 1 chữ số thập phân, rồi kéo nó vào đáp án của nó.',
        promptFr: 'Arrondis chaque nombre à 1 décimale, et fais-le glisser vers sa réponse.',
        bank: [
          { val: '6.95', text: '$6.95$' },
          { val: '7.04', text: '$7.04$' },
          { val: '6.949', text: '$6.949$' },
          { val: '7.05', text: '$7.05$' },
          { val: '6.96', text: '$6.96$' },
          { val: '7.049', text: '$7.049$' },
        ],
        targets: [
          { id: 'low', title: 'rounds to $6.9$', titleVn: 'làm tròn thành $6.9$', titleFr: 's’arrondit à $6.9$' },
          { id: 'mid', title: 'rounds to $7.0$', titleVn: 'làm tròn thành $7.0$', titleFr: 's’arrondit à $7.0$' },
          { id: 'high', title: 'rounds to $7.1$', titleVn: 'làm tròn thành $7.1$', titleFr: 's’arrondit à $7.1$' },
        ],
        correctSets: { low: ['6.949'], mid: ['6.95', '7.04', '6.96', '7.049'], high: ['7.05'] },
        solution: [
          'Look only at the 2nd decimal digit of each number.',
          '$6.95$ and $6.96$ have 5 and 6, so they go up to $7.0$. $7.04$ and $7.049$ have 4, so they stay at $7.0$. $7.05$ has 5, so it goes up to $7.1$.',
          '$6.949$ has 4, so it stays at $6.9$ — the 9 after it does not count. Rounding it to $6.95$ and then to $7.0$ is rounding twice.',
        ],
        solutionVn: [
          'Chỉ nhìn chữ số thập phân thứ 2 của mỗi số.',
          '$6.95$ và $6.96$ có 5 và 6, nên tăng lên thành $7.0$. $7.04$ và $7.049$ có 4, nên giữ nguyên là $7.0$. $7.05$ có 5, nên tăng lên thành $7.1$.',
          '$6.949$ có 4, nên giữ nguyên là $6.9$ — số 9 phía sau không được tính. Làm tròn nó thành $6.95$ rồi thành $7.0$ là làm tròn hai lần.',
        ],
        solutionFr: [
          'Regarde seulement la 2e décimale de chaque nombre.',
          '$6.95$ et $6.96$ ont 5 et 6, donc ils montent à $7.0$. $7.04$ et $7.049$ ont 4, donc ils restent à $7.0$. $7.05$ a 5, donc il monte à $7.1$.',
          '$6.949$ a 4, donc il reste à $6.9$ — le 9 qui suit ne compte pas. L’arrondir à $6.95$ puis à $7.0$, c’est arrondir deux fois.',
        ],
        answer: '$6.9$: $6.949$ · $7.0$: $6.95$, $6.96$, $7.04$, $7.049$ · $7.1$: $7.05$',
        answerVn: '$6.9$: $6.949$ · $7.0$: $6.95$, $6.96$, $7.04$, $7.049$ · $7.1$: $7.05$',
        answerFr: '$6.9$: $6.949$ · $7.0$: $6.95$, $6.96$, $7.04$, $7.049$ · $7.1$: $7.05$',
      },
    ],
  },
];
