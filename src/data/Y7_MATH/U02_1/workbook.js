// src/data/Y7_MATH/U02_1/workbook.js
// Two practice tasks for 2.1 Constructing Expressions.
//
// `workbook` (Practice, 12 Q: 4 Focus · 5 Practice · 3 Challenge) is the
// self-study drill on the deck — every answer is an expression, typed, and
// marked by mathEquivalence so "30 + w" and "w + 30" are one answer.
//
// `workbookB` (Book Problems, 10 Q) mirrors the shapes of Exercise 2.1 itself:
// say what a letter represents, the notation questions, English → algebra with
// the word-order flips, algebra → English, and the two-letter total/difference
// questions. Numbers are original — the exercise is the homework and should not
// be spent here. The four word problems cut from the deck (Marcus, algebra →
// English, the syringe, the ice cubes) land in these two files.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', prompt: 'A box holds $n$ pens. Mr Bowen adds 7 more. Write an expression for the number of pens now.',
        promptVn: 'Một hộp có $n$ cây bút. Thầy Bowen bỏ thêm 7 cây. Hãy viết biểu thức cho số bút hiện có.',
        solution: ['Start from what was there: $n$.', '"Adds 7 more" → add 7.', 'So the expression is $n + 7$.'],
        solutionVn: ['Bắt đầu từ lượng ban đầu: $n$.', '"Bỏ thêm 7" → cộng 7.', 'Vậy biểu thức là $n + 7$.'],
        answer: 'n + 7', answerVn: 'n + 7',
      },
      {
        id: 'f2', prompt: 'A cup holds $c$ ml. Lan drinks 30 ml. Write an expression for how much is left.',
        promptVn: 'Một cốc chứa $c$ ml. Lan uống 30 ml. Hãy viết biểu thức cho lượng còn lại.',
        solution: ['Start from $c$.', 'Drinking takes away: subtract 30.', '$c − 30$. There is no number to write — this is the answer.'],
        solutionVn: ['Bắt đầu từ $c$.', 'Uống là bớt đi: trừ 30.', '$c − 30$. Không có con số nào để viết — đây chính là đáp án.'],
        answer: 'c - 30', answerVn: 'c - 30',
      },
      {
        id: 'f3', prompt: 'Write $4 × k$ the short way.',
        promptVn: 'Viết $4 × k$ theo cách ngắn gọn.',
        solution: ['Drop the multiplication sign.', 'Number in front of the letter: $4k$.'],
        solutionVn: ['Bỏ dấu nhân.', 'Số đứng trước chữ cái: $4k$.'],
        answer: '4k', answerVn: '4k',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'Which of these is an **expression**?',
        promptVn: 'Cái nào sau đây là một **biểu thức**?',
        options: [
          { val: 'A', text: '$8 − 3 = 5$', textVn: '$8 − 3 = 5$' },
          { val: 'B', text: '$p = 2q$', textVn: '$p = 2q$' },
          { val: 'C', text: '$2q + 1$', textVn: '$2q + 1$' },
          { val: 'D', text: '$12$', textVn: '$12$' },
        ],
        correct: 'C',
        solution: ['An expression has a letter and no = sign.', 'A and B have = signs. D has no letter.', 'C: $2q + 1$.'],
        solutionVn: ['Biểu thức có chữ cái và không có dấu =.', 'A và B có dấu =. D không có chữ cái.', 'C: $2q + 1$.'],
        answer: 'C', answerVn: 'C',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', prompt: 'A beaker holds $w$ ml. A second beaker holds **three times as much**. Write an expression for the second beaker.',
        promptVn: 'Một cốc chứa $w$ ml. Cốc thứ hai chứa **gấp ba lần**. Hãy viết biểu thức cho cốc thứ hai.',
        solution: ['"Times as much" → multiply.', '$3 × w = 3w$.'],
        solutionVn: ['"Gấp … lần" → nhân.', '$3 × w = 3w$.'],
        answer: '3w', answerVn: '3w',
      },
      {
        id: 'p2', prompt: 'Write an expression for **12 less than $m$**.',
        promptVn: 'Viết biểu thức cho **12 less than $m$** ($m$ bớt đi 12).',
        solution: ['The words come backwards: the starting number is $m$.', 'Take 12 away from it: $m − 12$.', 'Check with numbers: 12 less than 20 is 8, which is $20 − 12$.'],
        solutionVn: ['Thứ tự từ ngữ bị đảo: số ban đầu là $m$.', 'Bớt đi 12: $m − 12$.', 'Thử bằng số: 12 less than 20 là 8, tức là $20 − 12$.'],
        answer: 'm - 12', answerVn: 'm - 12',
      },
      {
        id: 'p3', prompt: 'Write an expression for **$d$ more than $f$**.',
        promptVn: 'Viết biểu thức cho **$d$ more than $f$** (nhiều hơn $f$ một lượng $d$).',
        solution: ['Start from $f$ and add $d$.', '$f + d$ (the order does not matter for adding, so $d + f$ is the same answer).'],
        solutionVn: ['Bắt đầu từ $f$ rồi cộng $d$.', '$f + d$ (cộng thì thứ tự không quan trọng, nên $d + f$ cũng đúng).'],
        answer: 'f + d', answerVn: 'f + d',
      },
      {
        id: 'p4', prompt: 'A jug holds $v$ ml of juice. Mr Bowen pours out **half**. Write an expression for what is left.',
        promptVn: 'Một bình chứa $v$ ml nước ép. Thầy Bowen rót ra **một nửa**. Hãy viết biểu thức cho lượng còn lại.',
        solution: ['Half of $v$ is $v ÷ 2$.', 'Written the short way: $\\frac{v}{2}$.'],
        solutionVn: ['Một nửa của $v$ là $v ÷ 2$.', 'Viết ngắn gọn: $\\frac{v}{2}$.'],
        answer: 'v/2', answerVn: 'v/2', accept: ['v÷2', '0.5v', '\\frac{v}{2}'],
      },
      {
        id: 'p5', prompt: 'Multiply $x$ by 6 and **subtract 5**. Write the expression.',
        promptVn: 'Nhân $x$ với 6 rồi **trừ đi 5**. Hãy viết biểu thức.',
        solution: ['Multiply first: $6x$.', '"Subtract 5" — take 5 away from what you have: $6x − 5$.'],
        solutionVn: ['Nhân trước: $6x$.', '"Trừ đi 5" — lấy cái đang có trừ đi 5: $6x − 5$.'],
        answer: '6x - 5', answerVn: '6x - 5',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1', prompt: 'Multiply $x$ by 6 and **subtract from 5**. Write the expression. (Compare it with the last question.)',
        promptVn: 'Nhân $x$ với 6 rồi **lấy 5 trừ đi**. Hãy viết biểu thức. (So sánh với câu trước.)',
        solution: ['Multiply first: $6x$.', '"Subtract **from** 5" — start at 5 and take $6x$ away: $5 − 6x$.', 'One word ("from") turned the answer around.'],
        solutionVn: ['Nhân trước: $6x$.', '"Lấy 5 **trừ đi**" — bắt đầu từ 5 rồi trừ $6x$: $5 − 6x$.', 'Chỉ một từ ("from") đã đảo ngược đáp án.'],
        answer: '5 - 6x', answerVn: '5 - 6x',
      },
      {
        id: 'c2', prompt: 'A sealed syringe holds $v$ ml of air. Mr Bowen pushes the plunger until **half** is left, then pushes **20 ml further**. Write an expression for the air now.',
        promptVn: 'Một ống tiêm bịt kín chứa $v$ ml không khí. Thầy Bowen đẩy pít-tông đến khi còn **một nửa**, rồi đẩy **thêm 20 ml** nữa. Hãy viết biểu thức cho lượng không khí hiện tại.',
        solution: ['Half is left: $\\frac{v}{2}$.', 'Then 20 ml more goes: $\\frac{v}{2} − 20$.', 'If the syringe held water, neither step would happen — you cannot compress a liquid.'],
        solutionVn: ['Còn một nửa: $\\frac{v}{2}$.', 'Rồi bớt thêm 20 ml: $\\frac{v}{2} − 20$.', 'Nếu trong ống tiêm là nước thì không có bước nào cả — chất lỏng không nén được.'],
        answer: 'v/2 - 20', answerVn: 'v/2 - 20', accept: ['v÷2 − 20', '0.5v - 20'],
      },
      {
        id: 'c3', prompt: 'Mr Bowen puts $n$ ice cubes in a glass. A student adds **three more**. Forty minutes later Mr Bowen comes back. Write an expression for the ice cubes after the student adds them, and then say how many there are when Mr Bowen returns.',
        promptVn: 'Thầy Bowen bỏ $n$ viên đá vào cốc. Một bạn học sinh bỏ **thêm ba viên**. Bốn mươi phút sau thầy quay lại. Hãy viết biểu thức cho số viên đá sau khi bạn ấy bỏ thêm, rồi cho biết còn bao nhiêu viên khi thầy quay lại.',
        type: 'fill_blank',
        textParts: ['After the student: ', ' ice cubes. When Mr Bowen returns: ', ' ice cubes.'],
        textPartsVn: ['Sau khi bạn ấy bỏ thêm: ', ' viên đá. Khi thầy Bowen quay lại: ', ' viên đá.'],
        blanks: { '1': { correct: 'n + 3', accept: ['3 + n'], width: 6 }, '2': { correct: '0', accept: ['zero', 'none'], width: 4 } },
        solution: ['Three more: $n + 3$.', 'Forty minutes later they have **melted**: 0 ice cubes. The water is still there, but melted ice cubes are not ice cubes.', 'A formula is only true while the situation it describes is true.'],
        solutionVn: ['Thêm ba viên: $n + 3$.', 'Bốn mươi phút sau chúng đã **tan hết**: 0 viên đá. Nước vẫn còn, nhưng đá đã tan thì không còn là viên đá.', 'Một biểu thức chỉ đúng chừng nào tình huống nó mô tả còn đúng.'],
        answer: '$n + 3$, then 0', answerVn: '$n + 3$, rồi 0',
      },
    ],
  },
];

export const workbookB = [
  {
    tier: 'Say what the letter represents',
    tierVn: 'Nói rõ chữ cái đại diện cho gì',
    questions: [
      {
        id: 'b1', type: 'mcq',
        prompt: 'Lan has some marbles. Mai has 4 more than Lan. Which sentence is the correct way to start?',
        promptVn: 'Lan có một số viên bi. Mai có nhiều hơn Lan 4 viên. Câu nào là cách bắt đầu đúng?',
        options: [
          { val: 'A', text: 'Let $m$ represent a marble.', textVn: 'Cho $m$ đại diện cho một viên bi.' },
          { val: 'B', text: 'Let $m$ represent the number of marbles Lan has.', textVn: 'Cho $m$ đại diện cho số viên bi Lan có.' },
          { val: 'C', text: 'Let $m$ represent Lan.', textVn: 'Cho $m$ đại diện cho Lan.' },
        ],
        correct: 'B',
        solution: ['A letter represents a **number**, not a thing or a person.', 'Then Mai has $m + 4$.'],
        solutionVn: ['Một chữ cái đại diện cho một **con số**, không phải một đồ vật hay một người.', 'Khi đó Mai có $m + 4$.'],
        answer: 'B', answerVn: 'B',
      },
      {
        id: 'b2', prompt: 'Using $m$ for the number of marbles Lan has, write an expression for the number Mai has (4 more than Lan).',
        promptVn: 'Dùng $m$ cho số viên bi của Lan, hãy viết biểu thức cho số viên bi của Mai (nhiều hơn Lan 4 viên).',
        solution: ['"More than" → add.', '$m + 4$.'],
        solutionVn: ['"Nhiều hơn" → cộng.', '$m + 4$.'],
        answer: 'm + 4', answerVn: 'm + 4',
      },
    ],
  },
  {
    tier: 'Notation',
    tierVn: 'Cách viết',
    questions: [
      {
        id: 'b3', prompt: 'Write $a × b × 6$ the short way.',
        promptVn: 'Viết $a × b × 6$ theo cách ngắn gọn.',
        solution: ['Drop the × signs.', 'The number goes in front: $6ab$.'],
        solutionVn: ['Bỏ các dấu ×.', 'Số đứng trước: $6ab$.'],
        answer: '6ab', answerVn: '6ab',
      },
      {
        id: 'b4', type: 'mcq',
        prompt: 'What does $\\frac{p}{5}$ mean?',
        promptVn: '$\\frac{p}{5}$ nghĩa là gì?',
        options: [
          { val: 'A', text: '$p − 5$', textVn: '$p − 5$' },
          { val: 'B', text: '$p × 5$', textVn: '$p × 5$' },
          { val: 'C', text: '$p ÷ 5$', textVn: '$p ÷ 5$' },
        ],
        correct: 'C',
        solution: ['A fraction line means divide.', '$\\frac{p}{5} = p ÷ 5$.'],
        solutionVn: ['Vạch phân số nghĩa là chia.', '$\\frac{p}{5} = p ÷ 5$.'],
        answer: 'C', answerVn: 'C',
      },
    ],
  },
  {
    tier: 'English into algebra',
    tierVn: 'Từ tiếng Anh sang đại số',
    questions: [
      {
        id: 'b5', prompt: 'Write an expression for **$p$ more than six times $q$**.',
        promptVn: 'Viết biểu thức cho **$p$ more than six times $q$** ($p$ nhiều hơn sáu lần $q$).',
        solution: ['Build "six times $q$" first: $6q$.', 'Then add $p$: $6q + p$.'],
        solutionVn: ['Dựng "sáu lần $q$" trước: $6q$.', 'Rồi cộng $p$: $6q + p$.'],
        answer: '6q + p', answerVn: '6q + p',
      },
      {
        id: 'b6', prompt: 'Multiply $n$ by 3, then **subtract the result from 25**. Write the expression.',
        promptVn: 'Nhân $n$ với 3, rồi **lấy 25 trừ đi kết quả**. Hãy viết biểu thức.',
        solution: ['The result is $3n$.', '"From 25" — start at 25: $25 − 3n$.'],
        solutionVn: ['Kết quả là $3n$.', '"Lấy 25" — bắt đầu từ 25: $25 − 3n$.'],
        answer: '25 - 3n', answerVn: '25 - 3n',
      },
      {
        id: 'b7', prompt: 'Mr Bowen pours **three** large beakers ($a$ ml each) and **five** small beakers ($b$ ml each) into a bowl. Write an expression for the total.',
        promptVn: 'Thầy Bowen đổ **ba** cốc lớn ($a$ ml mỗi cốc) và **năm** cốc nhỏ ($b$ ml mỗi cốc) vào một cái tô. Hãy viết biểu thức cho tổng.',
        solution: ['Three large: $3a$. Five small: $5b$.', '"Total" → add: $3a + 5b$.', 'Two sizes, so two letters — they cannot be combined.'],
        solutionVn: ['Ba cốc lớn: $3a$. Năm cốc nhỏ: $5b$.', '"Tổng" → cộng: $3a + 5b$.', 'Hai cỡ khác nhau nên hai chữ cái — không gộp lại được.'],
        answer: '3a + 5b', answerVn: '3a + 5b',
      },
      {
        id: 'b8', prompt: 'A rope is $r$ metres long. A second rope is **2 metres shorter**. Write an expression for the **difference** between the two lengths, and then for the **total** length.',
        promptVn: 'Một sợi dây dài $r$ mét. Sợi thứ hai **ngắn hơn 2 mét**. Hãy viết biểu thức cho **hiệu** hai độ dài, rồi cho **tổng** độ dài.',
        type: 'fill_blank',
        textParts: ['Difference: ', ' m.  Total: ', ' m.'],
        textPartsVn: ['Hiệu: ', ' m.  Tổng: ', ' m.'],
        blanks: { '1': { correct: '2', width: 4 }, '2': { correct: '2r - 2', accept: ['r + r - 2', 'r + (r - 2)'], width: 8 } },
        solution: ['The second rope is $r − 2$.', 'Difference: $r − (r − 2) = 2$ — the difference is just the 2 metres.', 'Total: $r + (r − 2) = 2r − 2$.'],
        solutionVn: ['Sợi thứ hai dài $r − 2$.', 'Hiệu: $r − (r − 2) = 2$ — hiệu chính là 2 mét.', 'Tổng: $r + (r − 2) = 2r − 2$.'],
        answer: '2 and $2r − 2$', answerVn: '2 và $2r − 2$',
      },
    ],
  },
  {
    tier: 'Algebra back into English',
    tierVn: 'Từ đại số dịch ngược về tiếng Anh',
    questions: [
      {
        id: 'b9', type: 'mcq',
        prompt: 'Which words describe $8 − y$?',
        promptVn: 'Câu nào mô tả $8 − y$?',
        options: [
          { val: 'A', text: 'Subtract 8 from $y$.', textVn: 'Subtract 8 from $y$ (lấy $y$ trừ 8).' },
          { val: 'B', text: '8 less than $y$.', textVn: '8 less than $y$ ($y$ bớt đi 8).' },
          { val: 'C', text: 'Subtract $y$ from 8.', textVn: 'Subtract $y$ from 8 (lấy 8 trừ $y$).' },
        ],
        correct: 'C',
        solution: ['$8 − y$ starts at 8 and takes $y$ away.', 'That is "subtract $y$ **from** 8". A and B both describe $y − 8$.'],
        solutionVn: ['$8 − y$ bắt đầu từ 8 rồi trừ $y$.', 'Đó là "subtract $y$ **from** 8". A và B đều mô tả $y − 8$.'],
        answer: 'C', answerVn: 'C',
      },
      {
        id: 'b10', type: 'mcq',
        prompt: 'Marcus describes $5 − 5x$ as *"multiply $x$ by 5, then subtract 5."* Which is true?',
        promptVn: 'Marcus mô tả $5 − 5x$ là *"nhân $x$ với 5, rồi trừ đi 5."* Câu nào đúng?',
        options: [
          { val: 'A', text: 'He is right.', textVn: 'Bạn ấy đúng.' },
          { val: 'B', text: 'He is wrong — his words describe $5x − 5$. He needs "subtract the result **from** 5".', textVn: 'Bạn ấy sai — câu của bạn ấy mô tả $5x − 5$. Cần nói "lấy 5 trừ đi kết quả" (subtract **from** 5).' },
          { val: 'C', text: 'He is wrong — his words describe $5 + 5x$.', textVn: 'Bạn ấy sai — câu của bạn ấy mô tả $5 + 5x$.' },
        ],
        correct: 'B',
        solution: ['"Subtract 5" takes 5 away from $5x$: $5x − 5$.', '$5 − 5x$ starts at 5, so it needs "subtract from 5".'],
        solutionVn: ['"Trừ đi 5" lấy $5x$ trừ 5: $5x − 5$.', '$5 − 5x$ bắt đầu từ 5, nên cần "subtract from 5".'],
        answer: 'B', answerVn: 'B',
      },
    ],
  },
];
