// src/data/ACELLUS/ALG_INEQ/workbook.js
// Practice — one problem per slide, with a stepped solution behind a button.
//
// The revealed steps are the whole point of this task, so every one of them
// names the REASON as well as the move ("eight is positive, so the sign does
// not turn round"), matching the language the deck uses.
//
// A note on answer types. Typed answers are marked by
// src/utils/mathEquivalence.js, which genuinely understands inequalities —
// `-4 >= x` is accepted for `x <= -4`, and `x <= 4` is correctly REFUSED for
// `x < 4`. It also handles a finite interval such as `(-3, 0]` (and refuses
// `(-3, 0)`), because those fall back to a whitespace-insensitive comparison.
// What it cannot parse is `\infty` or `\cup`, so any answer containing an
// infinite end or a union is asked as an MCQ instead — which is how Acellus
// asks it anyway, with two bracket cards to choose between.
export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        prompt: 'Solve $x - 4 > 1$.',
        promptVn: 'Giải $x - 4 > 1$.',
        solution: [
          'The $4$ is being subtracted, so add $4$ to both sides.',
          '$x - 4 + 4 > 1 + 4$',
          'Adding never turns the sign round, so it stays $>$: $x > 5$.',
        ],
        solutionVn: [
          '$4$ đang bị trừ, nên cộng $4$ vào cả hai vế.',
          '$x - 4 + 4 > 1 + 4$',
          'Phép cộng không bao giờ đảo dấu, nên dấu vẫn là $>$: $x > 5$.',
        ],
        answer: '$x > 5$',
        answerVn: '$x > 5$',
      },
      {
        id: 'f2',
        prompt: 'Solve $x + 9 \\leq 2$.',
        promptVn: 'Giải $x + 9 \\leq 2$.',
        solution: [
          'Subtract $9$ from both sides.',
          '$x \\leq 2 - 9$',
          '$2 - 9 = -7$, so $x \\leq -7$. The little line stays under the sign — nothing has happened to change it.',
        ],
        solutionVn: [
          'Trừ $9$ ở cả hai vế.',
          '$x \\leq 2 - 9$',
          '$2 - 9 = -7$, nên $x \\leq -7$. Gạch nhỏ vẫn nằm dưới dấu — không có gì làm nó thay đổi.',
        ],
        answer: '$x \\leq -7$',
        answerVn: '$x \\leq -7$',
      },
      {
        id: 'f3',
        prompt: 'Solve $5x < 35$.',
        promptVn: 'Giải $5x < 35$.',
        solution: [
          'The $x$ is multiplied by $5$, so divide both sides by $5$.',
          '$35 \\div 5 = 7$.',
          'Five is POSITIVE, so the sign does not move: $x < 7$.',
        ],
        solutionVn: [
          '$x$ đang nhân với $5$, nên chia cả hai vế cho $5$.',
          '$35 \\div 5 = 7$.',
          'Năm là số DƯƠNG, nên dấu không đổi: $x < 7$.',
        ],
        answer: '$x < 7$',
        answerVn: '$x < 7$',
      },
      {
        id: 'f4',
        type: 'mcq',
        prompt: 'How is $x \\geq -1$ drawn on a number line?',
        promptVn: '$x \\geq -1$ được vẽ trên trục số như thế nào?',
        options: [
          { val: 'a', text: 'Open circle at $-1$, shaded right', textVn: 'Vòng tròn rỗng tại $-1$, tô sang phải' },
          { val: 'b', text: 'Filled circle at $-1$, shaded right', textVn: 'Vòng tròn đặc tại $-1$, tô sang phải' },
          { val: 'c', text: 'Filled circle at $-1$, shaded left', textVn: 'Vòng tròn đặc tại $-1$, tô sang trái' },
          { val: 'd', text: 'Open circle at $1$, shaded right', textVn: 'Vòng tròn rỗng tại $1$, tô sang phải' },
        ],
        correct: 'b',
        solution: [
          'The line under the $\\geq$ means "or equal to", so $-1$ itself is a solution — the circle is filled.',
          '"Greater than" means bigger numbers, and bigger is to the RIGHT.',
          'So: a filled circle at $-1$, shaded to the right.',
        ],
        solutionVn: [
          'Gạch dưới dấu $\\geq$ nghĩa là "hoặc bằng", nên chính $-1$ cũng là nghiệm — vòng tròn được tô đặc.',
          '"Lớn hơn" nghĩa là các số lớn hơn, mà lớn hơn thì nằm bên PHẢI.',
          'Vậy: vòng tròn đặc tại $-1$, tô sang phải.',
        ],
        answer: 'Filled circle at $-1$, shaded right',
        answerVn: 'Vòng tròn đặc tại $-1$, tô sang phải',
      },
      {
        id: 'f5',
        prompt: 'Solve $2x + 3 \\geq 11$.',
        promptVn: 'Giải $2x + 3 \\geq 11$.',
        solution: [
          'Undo the $+3$ first: subtract $3$ from both sides.',
          '$2x \\geq 8$',
          'Now divide both sides by $2$. Two is positive, so the sign stays: $x \\geq 4$.',
          'Check with $x = 4$: $2(4) + 3 = 11$, and $11 \\geq 11$ is true.',
        ],
        solutionVn: [
          'Khử $+3$ trước: trừ $3$ ở cả hai vế.',
          '$2x \\geq 8$',
          'Giờ chia cả hai vế cho $2$. Hai là số dương, nên dấu giữ nguyên: $x \\geq 4$.',
          'Thử $x = 4$: $2(4) + 3 = 11$, và $11 \\geq 11$ là đúng.',
        ],
        answer: '$x \\geq 4$',
        answerVn: '$x \\geq 4$',
      },
      {
        id: 'f6',
        type: 'mcq',
        prompt: 'Write $x \\leq 6$ in interval notation.',
        promptVn: 'Viết $x \\leq 6$ bằng ký hiệu khoảng.',
        options: [
          { val: 'a', text: '$[-\\infty, 6]$', textVn: '$[-\\infty, 6]$' },
          { val: 'b', text: '$(-\\infty, 6]$', textVn: '$(-\\infty, 6]$' },
          { val: 'c', text: '$(-\\infty, 6)$', textVn: '$(-\\infty, 6)$' },
          { val: 'd', text: '$[6, \\infty)$', textVn: '$[6, \\infty)$' },
        ],
        correct: 'b',
        solution: [
          'The set runs from as far left as you like, up to $6$.',
          'The smaller end is $-\\infty$, and it is written first.',
          'Infinity never gets a square bracket, so that end is round.',
          '$6$ is included (the line under the sign), so that end is square: $(-\\infty, 6]$.',
        ],
        solutionVn: [
          'Tập nghiệm kéo dài từ tận cùng bên trái cho tới $6$.',
          'Đầu nhỏ hơn là $-\\infty$, và nó được viết trước.',
          'Vô cực không bao giờ dùng ngoặc vuông, nên đầu đó là ngoặc tròn.',
          '$6$ được lấy (vì có gạch dưới dấu), nên đầu đó là ngoặc vuông: $(-\\infty, 6]$.',
        ],
        answer: '$(-\\infty, 6]$',
        answerVn: '$(-\\infty, 6]$',
      },
    ],
  },

  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        prompt: 'Solve $-4x > 20$.',
        promptVn: 'Giải $-4x > 20$.',
        solution: [
          'Divide both sides by $-4$.',
          '$20 \\div -4 = -5$.',
          'You divided by a NEGATIVE, so the sign turns round: $>$ becomes $<$.',
          '$x < -5$. Check with $x = -6$: $-4 \\times -6 = 24$, and $24 > 20$ is true.',
        ],
        solutionVn: [
          'Chia cả hai vế cho $-4$.',
          '$20 \\div -4 = -5$.',
          'Em vừa chia cho một số ÂM, nên dấu đảo chiều: $>$ thành $<$.',
          '$x < -5$. Thử $x = -6$: $-4 \\times -6 = 24$, và $24 > 20$ là đúng.',
        ],
        answer: '$x < -5$',
        answerVn: '$x < -5$',
      },
      {
        id: 'p2',
        prompt: 'Solve $8 - x \\leq 3$.',
        promptVn: 'Giải $8 - x \\leq 3$.',
        solution: [
          'Subtract $8$ from both sides: $-x \\leq -5$.',
          'The coefficient of $x$ is $-1$, so divide both sides by $-1$.',
          'Dividing by a negative turns the sign round: $x \\geq 5$.',
          'Check with $x = 5$: $8 - 5 = 3$, and $3 \\leq 3$ is true.',
        ],
        solutionVn: [
          'Trừ $8$ ở cả hai vế: $-x \\leq -5$.',
          'Hệ số của $x$ là $-1$, nên chia cả hai vế cho $-1$.',
          'Chia cho số âm thì đảo chiều dấu: $x \\geq 5$.',
          'Thử $x = 5$: $8 - 5 = 3$, và $3 \\leq 3$ là đúng.',
        ],
        answer: '$x \\geq 5$',
        answerVn: '$x \\geq 5$',
      },
      {
        id: 'p3',
        prompt: 'Solve $3x + 5 < x + 17$.',
        promptVn: 'Giải $3x + 5 < x + 17$.',
        solution: [
          'Take the SMALLER $x$ term off both sides — subtract $x$ — so what is left is positive.',
          '$2x + 5 < 17$',
          'Subtract $5$: $2x < 12$.',
          'Divide by $2$. Positive, so no flip: $x < 6$.',
        ],
        solutionVn: [
          'Trừ số hạng $x$ NHỎ HƠN ở cả hai vế — trừ $x$ — để phần còn lại là số dương.',
          '$2x + 5 < 17$',
          'Trừ $5$: $2x < 12$.',
          'Chia cho $2$. Số dương, nên không đảo dấu: $x < 6$.',
        ],
        answer: '$x < 6$',
        answerVn: '$x < 6$',
      },
      {
        id: 'p4',
        prompt: 'Solve the compound inequality $-12 < 3x - 6 \\leq 21$.',
        promptVn: 'Giải bất phương trình kép $-12 < 3x - 6 \\leq 21$.',
        solution: [
          'There are three parts, and every move happens to all three.',
          'Add $6$ everywhere: $-6 < 3x \\leq 27$.',
          'Divide everywhere by $3$. Three is positive, so neither sign moves.',
          '$-2 < x \\leq 9$.',
        ],
        solutionVn: [
          'Có ba phần, và mọi phép toán đều làm với cả ba.',
          'Cộng $6$ vào khắp nơi: $-6 < 3x \\leq 27$.',
          'Chia khắp nơi cho $3$. Ba là số dương, nên không dấu nào đổi.',
          '$-2 < x \\leq 9$.',
        ],
        answer: '$-2 < x \\leq 9$',
        answerVn: '$-2 < x \\leq 9$',
      },
      {
        id: 'p5',
        prompt: 'A number line shows an open circle at $-3$, a filled circle at $0$, and everything between them shaded. Write that in interval notation.',
        promptVn: 'Một trục số có vòng tròn rỗng tại $-3$, vòng tròn đặc tại $0$, và phần giữa được tô. Hãy viết nó bằng ký hiệu khoảng.',
        solution: [
          'Smaller number first: $-3$, then $0$.',
          'The circle at $-3$ is open, so that end takes a ROUND bracket.',
          'The circle at $0$ is filled, so that end takes a SQUARE bracket.',
          '$(-3, 0]$. As an inequality it is $-3 < x \\leq 0$.',
        ],
        solutionVn: [
          'Số nhỏ viết trước: $-3$, rồi $0$.',
          'Vòng tròn tại $-3$ là rỗng, nên đầu đó dùng ngoặc TRÒN.',
          'Vòng tròn tại $0$ là đặc, nên đầu đó dùng ngoặc VUÔNG.',
          '$(-3, 0]$. Viết dưới dạng bất phương trình là $-3 < x \\leq 0$.',
        ],
        answer: '$(-3, 0]$',
        answerVn: '$(-3, 0]$',
      },
      {
        id: 'p6',
        type: 'fill_blank',
        prompt: 'Solve $6|4x + 4| = 24$. Enter the smaller solution first.',
        promptVn: 'Giải $6|4x + 4| = 24$. Điền nghiệm nhỏ hơn trước.',
        textParts: ['$x =$', ' and $x =$', ''],
        textPartsVn: ['$x =$', ' và $x =$', ''],
        blanks: {
          '1': { correct: '-2', width: 5, accept: [] },
          '2': { correct: '0', width: 5, accept: [] },
        },
        solution: [
          'Get the bars alone first. Divide both sides by $6$: $|4x + 4| = 4$.',
          'Distance $4$ from zero happens in two directions, so split it: $4x + 4 = 4$ or $4x + 4 = -4$.',
          'First case: $4x = 0$, so $x = 0$.',
          'Second case: $4x = -8$, so $x = -2$.',
          'Smaller first: $x = -2$ and $x = 0$.',
        ],
        solutionVn: [
          'Trước hết để dấu giá trị tuyệt đối đứng riêng. Chia cả hai vế cho $6$: $|4x + 4| = 4$.',
          'Khoảng cách $4$ tới 0 có hai hướng, nên tách ra: $4x + 4 = 4$ hoặc $4x + 4 = -4$.',
          'Trường hợp một: $4x = 0$, nên $x = 0$.',
          'Trường hợp hai: $4x = -8$, nên $x = -2$.',
          'Số nhỏ trước: $x = -2$ và $x = 0$.',
        ],
        answer: '$x = -2$ and $x = 0$',
        answerVn: '$x = -2$ và $x = 0$',
      },
      {
        id: 'p7',
        prompt: 'A delivery van can carry no more than $900$ kg. It already holds $250$ kg. Writing $b$ for the mass of the boxes still to load, write an inequality for $b$.',
        promptVn: 'Một xe tải chở không quá $900$ kg. Trên xe đã có $250$ kg. Gọi $b$ là khối lượng các thùng hàng còn phải chất lên, hãy viết bất phương trình cho $b$.',
        solution: [
          '"No more than $900$" means the total is allowed to reach $900$, but not pass it: $\\leq$.',
          'The total is what is on board plus what is still to load: $250 + b \\leq 900$.',
          'Subtract $250$ from both sides: $b \\leq 650$.',
        ],
        solutionVn: [
          '"Không quá $900$" nghĩa là tổng được phép đạt tới $900$, nhưng không vượt qua: $\\leq$.',
          'Tổng bằng phần đã có cộng phần còn phải chất: $250 + b \\leq 900$.',
          'Trừ $250$ ở cả hai vế: $b \\leq 650$.',
        ],
        answer: '$b \\leq 650$',
        answerVn: '$b \\leq 650$',
      },
      {
        id: 'p8',
        type: 'mcq',
        prompt: 'Given the sets $A = \\{2, 3, 4\\}$ and $B = \\{1, 5, 7\\}$, find $A \\cap B$.',
        promptVn: 'Cho hai tập $A = \\{2, 3, 4\\}$ và $B = \\{1, 5, 7\\}$, tìm $A \\cap B$.',
        options: [
          { val: 'a', text: '$\\emptyset$', textVn: '$\\emptyset$' },
          { val: 'b', text: '$\\{1, 2, 4, 5, 6, 7\\}$', textVn: '$\\{1, 2, 4, 5, 6, 7\\}$' },
          { val: 'c', text: '$\\{1, 2, 3, 4, 5, 7\\}$', textVn: '$\\{1, 2, 3, 4, 5, 7\\}$' },
          { val: 'd', text: '$\\{2, 3, 4\\}$', textVn: '$\\{2, 3, 4\\}$' },
        ],
        correct: 'a',
        solution: [
          'The cap $\\cap$ is the INTERSECTION: only what is in both lists.',
          'Check each member of $A$ against $B$: $2$ is not there, $3$ is not there, $4$ is not there.',
          'They share nothing, so the intersection is the empty set, $\\emptyset$.',
          'Option C is $A \\cup B$ — the union — which is a different question.',
        ],
        solutionVn: [
          'Dấu $\\cap$ là GIAO: chỉ những gì có trong cả hai tập.',
          'Đối chiếu từng phần tử của $A$ với $B$: $2$ không có, $3$ không có, $4$ không có.',
          'Chúng không có gì chung, nên giao là tập rỗng, $\\emptyset$.',
          'Phương án C là $A \\cup B$ — hợp — đó là câu hỏi khác.',
        ],
        answer: '$\\emptyset$',
        answerVn: '$\\emptyset$',
      },
    ],
  },

  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'Solve $\\dfrac{x}{2} - 2 \\leq 20$.',
        promptVn: 'Giải $\\dfrac{x}{2} - 2 \\leq 20$.',
        solution: [
          'Clear the fraction first: multiply every term by $2$.',
          '$x - 4 \\leq 40$',
          'Two is positive, so the sign does not move.',
          'Add $4$ to both sides: $x \\leq 44$.',
        ],
        solutionVn: [
          'Khử phân số trước: nhân mọi số hạng với $2$.',
          '$x - 4 \\leq 40$',
          'Hai là số dương, nên dấu không đổi.',
          'Cộng $4$ vào cả hai vế: $x \\leq 44$.',
        ],
        answer: '$x \\leq 44$',
        answerVn: '$x \\leq 44$',
      },
      {
        id: 'c2',
        prompt: 'Solve $-\\dfrac{x}{3} + 1 > 4$.',
        promptVn: 'Giải $-\\dfrac{x}{3} + 1 > 4$.',
        solution: [
          'Multiply every term by $3$ to clear the fraction: $-x + 3 > 12$.',
          'Three is positive, so nothing turns round yet.',
          'Subtract $3$: $-x > 9$.',
          'Divide by $-1$ — a NEGATIVE — so the sign turns round: $x < -9$.',
        ],
        solutionVn: [
          'Nhân mọi số hạng với $3$ để khử phân số: $-x + 3 > 12$.',
          'Ba là số dương, nên chưa có gì đảo chiều.',
          'Trừ $3$: $-x > 9$.',
          'Chia cho $-1$ — một số ÂM — nên dấu đảo chiều: $x < -9$.',
        ],
        answer: '$x < -9$',
        answerVn: '$x < -9$',
      },
      {
        id: 'c3',
        prompt: 'Solve $|x + 1| \\leq 6$ and give the answer in interval notation.',
        promptVn: 'Giải $|x + 1| \\leq 6$ và viết đáp án bằng ký hiệu khoảng.',
        solution: [
          'The bars are already alone, and this is a "less than" — so it is the INSIDE, one piece.',
          'Write it as a compound inequality: $-6 \\leq x + 1 \\leq 6$.',
          'Subtract $1$ from all three parts: $-7 \\leq x \\leq 5$.',
          'Both ends are included, so both brackets are square: $[-7, 5]$.',
        ],
        solutionVn: [
          'Dấu giá trị tuyệt đối đã đứng riêng, và đây là "nhỏ hơn" — nên là phần BÊN TRONG, một đoạn.',
          'Viết thành bất phương trình kép: $-6 \\leq x + 1 \\leq 6$.',
          'Trừ $1$ ở cả ba phần: $-7 \\leq x \\leq 5$.',
          'Cả hai đầu đều được lấy, nên cả hai ngoặc đều vuông: $[-7, 5]$.',
        ],
        answer: '$[-7, 5]$',
        answerVn: '$[-7, 5]$',
      },
      {
        id: 'c4',
        type: 'mcq',
        prompt: 'Solve $|2x - 5| > 9$ and choose the interval notation for the answer.',
        promptVn: 'Giải $|2x - 5| > 9$ và chọn ký hiệu khoảng cho đáp án.',
        options: [
          { val: 'a', text: '$(-2, 7)$', textVn: '$(-2, 7)$' },
          { val: 'b', text: '$(-\\infty, -2) \\cup (7, \\infty)$', textVn: '$(-\\infty, -2) \\cup (7, \\infty)$' },
          { val: 'c', text: '$(-\\infty, -2] \\cup [7, \\infty)$', textVn: '$(-\\infty, -2] \\cup [7, \\infty)$' },
          { val: 'd', text: '$[-2, 7]$', textVn: '$[-2, 7]$' },
        ],
        correct: 'b',
        solution: [
          'It is a "greater than", so the answer is the OUTSIDE: two pieces joined by $\\cup$.',
          'Split it: $2x - 5 > 9$ or $2x - 5 < -9$.',
          'First: $2x > 14$, so $x > 7$. Second: $2x < -4$, so $x < -2$.',
          'Both signs are strict, so both finite ends are round brackets, and infinity is always round: $(-\\infty, -2) \\cup (7, \\infty)$.',
          'Option A is the "less than" answer — the inside — which is the opposite set.',
        ],
        solutionVn: [
          'Đây là "lớn hơn", nên đáp án là phần BÊN NGOÀI: hai đoạn nối bằng $\\cup$.',
          'Tách ra: $2x - 5 > 9$ hoặc $2x - 5 < -9$.',
          'Thứ nhất: $2x > 14$, nên $x > 7$. Thứ hai: $2x < -4$, nên $x < -2$.',
          'Cả hai dấu đều nghiêm ngặt, nên hai đầu hữu hạn đều là ngoặc tròn, và vô cực thì luôn ngoặc tròn: $(-\\infty, -2) \\cup (7, \\infty)$.',
          'Phương án A là đáp án của "nhỏ hơn" — phần bên trong — tức là tập ngược lại.',
        ],
        answer: '$(-\\infty, -2) \\cup (7, \\infty)$',
        answerVn: '$(-\\infty, -2) \\cup (7, \\infty)$',
      },
      {
        id: 'c5',
        type: 'mcq',
        prompt: 'A classmate writes the answer to $x \\geq 3$ as $[3, \\infty]$. What is wrong with it?',
        promptVn: 'Một bạn viết đáp án của $x \\geq 3$ thành $[3, \\infty]$. Sai ở chỗ nào?',
        options: [
          { val: 'a', text: 'The $3$ should have a round bracket', textVn: 'Số $3$ phải dùng ngoặc tròn' },
          { val: 'b', text: 'Infinity can never take a square bracket', textVn: 'Vô cực không bao giờ dùng được ngoặc vuông' },
          { val: 'c', text: 'The two numbers are the wrong way round', textVn: 'Hai số bị viết ngược thứ tự' },
          { val: 'd', text: 'Nothing — it is correct', textVn: 'Không sai gì — nó đúng' },
        ],
        correct: 'b',
        solution: [
          'A square bracket says "this number is included in the set".',
          '$\\infty$ is not a number you can ever arrive at, so it cannot be included in anything.',
          'The $3$ is fine: $x \\geq 3$ does include $3$, so a square bracket there is right.',
          'The correct answer is $[3, \\infty)$.',
        ],
        solutionVn: [
          'Ngoặc vuông nói rằng "số này thuộc tập nghiệm".',
          '$\\infty$ không phải là số mà em có thể chạm tới, nên nó không thể thuộc về bất cứ tập nào.',
          'Số $3$ thì đúng: $x \\geq 3$ có lấy $3$, nên ngoặc vuông ở đó là hợp lý.',
          'Đáp án đúng là $[3, \\infty)$.',
        ],
        answer: '$[3, \\infty)$',
        answerVn: '$[3, \\infty)$',
      },
      {
        id: 'c6',
        prompt: 'To ride, you must be at least $120$ cm tall and no taller than $195$ cm. Write that as one compound inequality using $h$ for height in centimetres.',
        promptVn: 'Để được chơi trò này, em phải cao ít nhất $120$ cm và không cao quá $195$ cm. Hãy viết thành một bất phương trình kép, dùng $h$ cho chiều cao tính bằng xăng-ti-mét.',
        solution: [
          '"At least $120$" allows exactly $120$: $h \\geq 120$.',
          '"No taller than $195$" allows exactly $195$: $h \\leq 195$.',
          'Both must be true at once, so it is an AND — one piece, written as a squeeze.',
          'Put the smaller limit on the left: $120 \\leq h \\leq 195$.',
        ],
        solutionVn: [
          '"Ít nhất $120$" cho phép đúng $120$: $h \\geq 120$.',
          '"Không cao quá $195$" cho phép đúng $195$: $h \\leq 195$.',
          'Cả hai phải đúng cùng lúc, nên đây là AND — một đoạn, viết theo kiểu kẹp.',
          'Đặt giới hạn nhỏ hơn bên trái: $120 \\leq h \\leq 195$.',
        ],
        answer: '$120 \\leq h \\leq 195$',
        answerVn: '$120 \\leq h \\leq 195$',
      },
    ],
  },
];
