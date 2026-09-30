// src/data/Y7_MATH/U03_1/workbook.js
// Practice for 3.1 Multiplying and Dividing by Powers of 10 — 12 questions
// (4 Focus · 5 Practice · 3 Challenge) mixing six answer widgets: typed boxes
// in a sentence, dropdowns for the words, "which is it" multiple choice, a
// typed number, dragging calculations onto their answers, and dragging four
// masses into order.
//
// Every number is original: not the deck's, not Slide the Digits', and not the
// book's Exercise 3.1, which is the classroom homework. Answers are single
// values, so marking is exact. A typed decimal also accepts a decimal comma
// (`accept`) — a right value written the Vietnamese way is not a wrong answer
// — but every prompt, solution and answer here writes the point as a dot.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: 'The power counts the zeros. Complete both sentences.',
        promptVn: 'Số mũ đếm số chữ số 0. Hãy hoàn thành cả hai câu.',
        textParts: ['$1000000$ is $10$ to the power of ', '. Written out, $10^4$ has ', ' zeros.'],
        textPartsVn: ['$1000000$ là $10$ mũ ', '. Khi viết ra đầy đủ, $10^4$ có ', ' số 0.'],
        blanks: {
          '1': { correct: '6', width: 3 },
          '2': { correct: '4', width: 3 },
        },
        solution: [
          'The power tells you the number of zeros after the 1.',
          '$1000000$ has 6 zeros, so it is $10^6$.',
          '$10^4$ is $10 × 10 × 10 × 10 = 10000$: four zeros.',
        ],
        solutionVn: [
          'Số mũ cho biết có bao nhiêu số 0 đứng sau số 1.',
          '$1000000$ có 6 số 0, nên đó là $10^6$.',
          '$10^4$ là $10 × 10 × 10 × 10 = 10000$: bốn số 0.',
        ],
        answer: '$10^6$; 4 zeros',
        answerVn: '$10^6$; 4 số 0',
      },
      {
        id: 'f2',
        type: 'inline',
        prompt: 'Choose the right word for each gap.',
        promptVn: 'Chọn từ đúng cho mỗi chỗ trống.',
        textParts: ['In $10^5$, the small raised 5 is called the ', '. You say $10^3$ as "ten ', '".'],
        textPartsVn: ['Trong $10^5$, số 5 nhỏ viết cao được gọi là ', '. Em đọc $10^3$ là "ten ', '".'],
        blanks: {
          '1': {
            options: [
              { val: 'base', text: 'base', textVn: 'cơ số (base)' },
              { val: 'power', text: 'power', textVn: 'số mũ (power)' },
              { val: 'digit', text: 'digit', textVn: 'chữ số (digit)' },
            ],
            correct: 'power',
          },
          '2': {
            options: [
              { val: 'squared', text: 'squared', textVn: 'squared' },
              { val: 'cubed', text: 'cubed', textVn: 'cubed' },
              { val: 'tripled', text: 'tripled', textVn: 'tripled' },
            ],
            correct: 'cubed',
          },
        },
        solution: [
          'The big number, 10, is the base. The small raised number is the **power**.',
          '$10^2$ is "ten squared" and $10^3$ is "ten **cubed**".',
          '"Tripled" means multiplied by 3, which is a different thing: 10 tripled is only 30.',
        ],
        solutionVn: [
          'Số lớn, 10, là cơ số (base). Con số nhỏ viết cao là **số mũ (power)**.',
          '$10^2$ đọc là "ten squared" và $10^3$ đọc là "ten **cubed**".',
          '"Tripled" nghĩa là nhân với 3, một việc khác hẳn: 10 tripled chỉ bằng 30.',
        ],
        answer: 'power; cubed',
        answerVn: 'số mũ (power); cubed',
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: 'What is $62 × 10^3$?',
        promptVn: '$62 × 10^3$ bằng bao nhiêu?',
        options: [
          { val: 'A', text: '$6200$', textVn: '$6200$' },
          { val: 'B', text: '$62000$', textVn: '$62000$' },
          { val: 'C', text: '$186$', textVn: '$186$' },
          { val: 'D', text: '$620000$', textVn: '$620000$' },
        ],
        correct: 'B',
        solution: [
          'Multiplying by $10^3$ moves every digit 3 places left.',
          'The 6 lands in the ten-thousands and the 2 in the thousands. The hundreds, tens and ones columns are left empty, so each gets a placeholder 0.',
          '$62 × 10^3 = 62000$. A moved only 2 places and D moved 4. C multiplied 62 by the power, 3 — but the power says how many places to move.',
        ],
        solutionVn: [
          'Nhân với $10^3$ làm mọi chữ số dịch 3 cột sang trái.',
          'Số 6 vào hàng chục nghìn và số 2 vào hàng nghìn. Các cột hàng trăm, hàng chục và hàng đơn vị bị trống, nên mỗi cột cần một số 0 giữ chỗ.',
          '$62 × 10^3 = 62000$. A chỉ dịch 2 cột, còn D dịch 4 cột. C lấy 62 nhân với số mũ 3 — nhưng số mũ cho biết phải dịch mấy cột.',
        ],
        answer: 'B',
        answerVn: 'B',
      },
      {
        id: 'f4',
        type: 'fill_blank',
        prompt: 'Work out $8.1 × 10^2$. Fill in both boxes.',
        promptVn: 'Tính $8.1 × 10^2$. Điền vào cả hai ô.',
        textParts: ['Every digit moves ', ' places to the left, so $8.1 × 10^2 =$ ', '.'],
        textPartsVn: ['Mọi chữ số dịch ', ' cột sang trái, nên $8.1 × 10^2 =$ ', '.'],
        blanks: {
          '1': { correct: '2', width: 3 },
          '2': { correct: '810', width: 5 },
        },
        solution: [
          'The power is 2, so every digit moves 2 places left. The decimal point stays still.',
          'The 8 moves from the ones to the hundreds. The 1 moves from the tenths to the tens.',
          'The ones column is left empty, so it gets a placeholder 0: $810$.',
        ],
        solutionVn: [
          'Số mũ là 2, nên mọi chữ số dịch 2 cột sang trái. Dấu thập phân đứng yên.',
          'Số 8 dịch từ hàng đơn vị lên hàng trăm. Số 1 dịch từ hàng phần mười lên hàng chục.',
          'Cột hàng đơn vị bị trống, nên cần một số 0 giữ chỗ: $810$.',
        ],
        answer: '2 places; $810$',
        answerVn: '2 cột; $810$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        type: 'mcq',
        prompt: 'What is $0.45 × 10^3$?',
        promptVn: '$0.45 × 10^3$ bằng bao nhiêu?',
        options: [
          { val: 'A', text: '$0.45000$', textVn: '$0.45000$' },
          { val: 'B', text: '$45$', textVn: '$45$' },
          { val: 'C', text: '$450$', textVn: '$450$' },
          { val: 'D', text: '$4500$', textVn: '$4500$' },
        ],
        correct: 'C',
        solution: [
          'Every digit moves 3 places left: the 4 lands in the hundreds and the 5 in the tens.',
          'The ones column is left empty, so it needs a placeholder 0: $450$.',
          'A put three zeros on the end, which is still $0.45$. B moved only 2 places. D moved 4.',
        ],
        solutionVn: [
          'Mọi chữ số dịch 3 cột sang trái: số 4 vào hàng trăm và số 5 vào hàng chục.',
          'Cột hàng đơn vị bị trống, nên cần một số 0 giữ chỗ: $450$.',
          'A thêm ba số 0 vào cuối, mà số đó vẫn là $0.45$. B chỉ dịch 2 cột. D dịch 4 cột.',
        ],
        answer: 'C',
        answerVn: 'C',
      },
      {
        id: 'p2',
        prompt: 'Work out $930 ÷ 10^4$. Write the decimal point as a dot.',
        promptVn: 'Tính $930 ÷ 10^4$. Viết dấu thập phân bằng dấu chấm.',
        solution: [
          'Dividing by $10^4$ moves every digit 4 places right.',
          'The 9 lands in the hundredths and the 3 in the thousandths. The 0 slides off the end and is not written.',
          'The ones and tenths columns are left empty, so each gets a placeholder 0: $0.093$.',
        ],
        solutionVn: [
          'Chia cho $10^4$ làm mọi chữ số dịch 4 cột sang phải.',
          'Số 9 vào hàng phần trăm và số 3 vào hàng phần nghìn. Số 0 trượt ra khỏi cuối số và không cần viết.',
          'Cột hàng đơn vị và hàng phần mười bị trống, nên mỗi cột cần một số 0 giữ chỗ: $0.093$.',
        ],
        answer: '0.093',
        answerVn: '0.093',
        accept: ['0,093'],
      },
      {
        id: 'p3',
        type: 'dnd',
        prompt: 'The digits are always 2 then 7. Drag each calculation to its answer.',
        promptVn: 'Các chữ số luôn là 2 rồi 7. Kéo mỗi phép tính vào đáp án của nó.',
        bank: [
          { val: 'a', text: '$2.7 × 10$' },
          { val: 'b', text: '$27 ÷ 10^2$' },
          { val: 'c', text: '$0.027 × 10^3$' },
          { val: 'd', text: '$270 ÷ 10^3$' },
          { val: 'e', text: '$27 × 10^2$' },
          { val: 'f', text: '$0.27 × 10^4$' },
        ],
        targets: [
          { id: 'small', title: '$= 0.27$', titleVn: '$= 0.27$' },
          { id: 'mid', title: '$= 27$', titleVn: '$= 27$' },
          { id: 'big', title: '$= 2700$', titleVn: '$= 2700$' },
        ],
        correctSets: { small: ['b', 'd'], mid: ['a', 'c'], big: ['e', 'f'] },
        solution: [
          'Only the columns change. × moves the 2 and the 7 left; ÷ moves them right.',
          '$2.7 × 10 = 27$ and $0.027 × 10^3 = 27$. $27 × 10^2 = 2700$ and $0.27 × 10^4 = 2700$.',
          '$27 ÷ 10^2 = 0.27$ and $270 ÷ 10^3 = 0.27$.',
        ],
        solutionVn: [
          'Chỉ có các cột thay đổi. × làm số 2 và số 7 dịch sang trái; ÷ làm chúng dịch sang phải.',
          '$2.7 × 10 = 27$ và $0.027 × 10^3 = 27$. $27 × 10^2 = 2700$ và $0.27 × 10^4 = 2700$.',
          '$27 ÷ 10^2 = 0.27$ và $270 ÷ 10^3 = 0.27$.',
        ],
        answer: '$0.27$: $27 ÷ 10^2$, $270 ÷ 10^3$ · $27$: $2.7 × 10$, $0.027 × 10^3$ · $2700$: $27 × 10^2$, $0.27 × 10^4$',
        answerVn: '$0.27$: $27 ÷ 10^2$, $270 ÷ 10^3$ · $27$: $2.7 × 10$, $0.027 × 10^3$ · $2700$: $27 × 10^2$, $0.27 × 10^4$',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: 'Find each missing power.',
        promptVn: 'Tìm mỗi số mũ còn thiếu.',
        textParts: ['$4.8 × 10^n = 480000$, so $n =$ ', '. $360 ÷ 10^m = 0.36$, so $m =$ ', '.'],
        textPartsVn: ['$4.8 × 10^n = 480000$, nên $n =$ ', '. $360 ÷ 10^m = 0.36$, nên $m =$ ', '.'],
        blanks: {
          '1': { correct: '5', width: 3 },
          '2': { correct: '3', width: 3 },
        },
        solution: [
          'Follow one digit and count the columns it crosses. That number is the power.',
          'From $4.8$ to $480000$, the 4 goes from the ones to the hundred-thousands: 5 places left, so $n = 5$.',
          'From $360$ to $0.36$, the 3 goes from the hundreds to the tenths: 3 places right, so $m = 3$.',
        ],
        solutionVn: [
          'Theo dõi một chữ số và đếm số cột nó đi qua. Con số đó chính là số mũ.',
          'Từ $4.8$ đến $480000$, số 4 đi từ hàng đơn vị lên hàng trăm nghìn: 5 cột sang trái, nên $n = 5$.',
          'Từ $360$ đến $0.36$, số 3 đi từ hàng trăm xuống hàng phần mười: 3 cột sang phải, nên $m = 3$.',
        ],
        answer: '$n = 5$; $m = 3$',
        answerVn: '$n = 5$; $m = 3$',
      },
      {
        id: 'p5',
        type: 'inline',
        prompt: 'You are changing kilograms into milligrams. Choose from the lists.',
        promptVn: 'Em đang đổi kilôgam sang miligam. Hãy chọn trong danh sách.',
        textParts: ['From kg to mg is ', ' down the ladder, so you ', ' by ', '.'],
        textPartsVn: ['Từ kg sang mg là đi xuống ', ' trên thang, nên em ', ' với ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'one', text: 'one step', textVn: 'một bậc' },
              { val: 'two', text: 'two steps', textVn: 'hai bậc' },
              { val: 'three', text: 'three steps', textVn: 'ba bậc' },
            ],
            correct: 'two',
          },
          '2': {
            options: [
              { val: 'mul', text: 'multiply', textVn: 'nhân' },
              { val: 'div', text: 'divide', textVn: 'chia' },
            ],
            correct: 'mul',
          },
          '3': {
            options: [
              { val: 'p3', text: '10³', textVn: '10³' },
              { val: 'p6', text: '10⁶', textVn: '10⁶' },
              { val: 'p9', text: '10⁹', textVn: '10⁹' },
            ],
            correct: 'p6',
          },
        },
        solution: [
          'kg → g is one step and g → mg is another: two steps down the ladder.',
          'Milligrams are a smaller unit, so there are more of them: multiply.',
          'Each step is $10^3$, so two steps is $10^6$. For example, 0.3 kg = $300000$ mg.',
        ],
        solutionVn: [
          'kg → g là một bậc và g → mg là một bậc nữa: hai bậc đi xuống thang.',
          'Miligam là đơn vị nhỏ hơn, nên số đo sẽ nhiều lên: nhân.',
          'Mỗi bậc là $10^3$, nên hai bậc là $10^6$. Ví dụ, 0.3 kg = $300000$ mg.',
        ],
        answer: 'two steps; multiply; 10⁶',
        answerVn: 'hai bậc; nhân; 10⁶',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1',
        type: 'order',
        prompt: 'Drag the four masses into order, lightest first. Change them all into grams to compare them.',
        promptVn: 'Kéo bốn khối lượng theo thứ tự, nhẹ nhất trước. Hãy đổi tất cả sang gam để so sánh.',
        bank: [
          { val: 'tonne', text: '$0.004$ t', textVn: '$0.004$ tấn' },
          { val: 'gram', text: '$450$ g' },
          { val: 'milli', text: '$600000$ mg' },
          { val: 'kilo', text: '$0.5$ kg' },
        ],
        targets: [{ id: 'seq', title: 'Lightest to heaviest', titleVn: 'Từ nhẹ nhất đến nặng nhất' }],
        correctSets: { seq: ['gram', 'kilo', 'milli', 'tonne'] },
        solution: [
          '$0.5$ kg is one step down the ladder: $0.5 × 10^3 = 500$ g.',
          '$600000$ mg is one step up: $600000 ÷ 10^3 = 600$ g.',
          '$0.004$ t is two steps down: $0.004 × 10^6 = 4000$ g.',
          'In grams: 450, 500, 600, 4000. The number with the most digits is not the heaviest — the unit matters.',
        ],
        solutionVn: [
          '$0.5$ kg là một bậc đi xuống thang: $0.5 × 10^3 = 500$ g.',
          '$600000$ mg là một bậc đi lên: $600000 ÷ 10^3 = 600$ g.',
          '$0.004$ tấn là hai bậc đi xuống: $0.004 × 10^6 = 4000$ g.',
          'Tính theo gam: 450, 500, 600, 4000. Số có nhiều chữ số nhất không phải là nặng nhất — đơn vị mới quan trọng.',
        ],
        answer: '450 g · 0.5 kg · 600000 mg · 0.004 t',
        answerVn: '450 g · 0.5 kg · 600000 mg · 0.004 tấn',
      },
      {
        id: 'c2',
        prompt: 'Start with $0.7$. Multiply by $10^5$, then divide by $10^3$, then divide by $10^4$. What number do you finish with? Write the decimal point as a dot.',
        promptVn: 'Bắt đầu với $0.7$. Nhân với $10^5$, rồi chia cho $10^3$, rồi chia cho $10^4$. Cuối cùng em được số nào? Viết dấu thập phân bằng dấu chấm.',
        solution: [
          'Count the places: left 5, then right 3, then right 4.',
          '$5 − 3 − 4 = −2$, so altogether the digits move 2 places **right**. That is the same as one move, $÷ 10^2$.',
          'The 7 moves from the tenths to the thousandths. The empty ones, tenths and hundredths columns get placeholder zeros: $0.007$.',
        ],
        solutionVn: [
          'Đếm số cột: trái 5, rồi phải 3, rồi phải 4.',
          '$5 − 3 − 4 = −2$, nên tổng cộng các chữ số dịch 2 cột sang **phải**. Việc đó giống một lần dịch duy nhất, $÷ 10^2$.',
          'Số 7 dịch từ hàng phần mười xuống hàng phần nghìn. Các cột trống ở hàng đơn vị, hàng phần mười và hàng phần trăm cần số 0 giữ chỗ: $0.007$.',
        ],
        answer: '0.007',
        answerVn: '0.007',
        accept: ['0,007'],
      },
      {
        id: 'c3',
        type: 'fill_blank',
        prompt: 'A blue whale has a mass of about $1.4 × 10^5$ kg. Write it as an ordinary number of kilograms, then change it into tonnes.',
        promptVn: 'Một con cá voi xanh có khối lượng khoảng $1.4 × 10^5$ kg. Viết số đó thành số thường theo kilôgam, rồi đổi sang tấn.',
        textParts: ['$1.4 × 10^5$ kg is ', ' kg, which is ', ' tonnes.'],
        textPartsVn: ['$1.4 × 10^5$ kg là ', ' kg, tức là ', ' tấn.'],
        blanks: {
          '1': { correct: '140000', width: 7 },
          '2': { correct: '140', width: 5 },
        },
        solution: [
          '$× 10^5$ moves every digit 5 places left: the 1 lands in the hundred-thousands and the 4 in the ten-thousands. The four empty columns get placeholder zeros: $140000$ kg.',
          'kg → t is one step up the ladder, so divide by $10^3$: every digit moves 3 places right.',
          '$140000 ÷ 10^3 = 140$. A blue whale is about 140 tonnes.',
        ],
        solutionVn: [
          '$× 10^5$ làm mọi chữ số dịch 5 cột sang trái: số 1 vào hàng trăm nghìn và số 4 vào hàng chục nghìn. Bốn cột trống cần số 0 giữ chỗ: $140000$ kg.',
          'kg → t là một bậc đi lên thang, nên chia cho $10^3$: mọi chữ số dịch 3 cột sang phải.',
          '$140000 ÷ 10^3 = 140$. Một con cá voi xanh nặng khoảng 140 tấn.',
        ],
        answer: '$140000$ kg; $140$ t',
        answerVn: '$140000$ kg; $140$ tấn',
      },
    ],
  },
];
