// src/data/AOPS/LINE_1A/workbook.js
// Reveal-solution practice for Points, Distance & Midpoints — the whole Drill.
// See docs/workbook-tasks.md.
//
// Drawn from the chapter's exercises and review problems (8.1.1–8.1.4, 8.3.3,
// 8.30, 8.34, 8.42, 8.49, 8.50), with a few warm-ups in front. Focus is the
// four skills one at a time; Practice mixes them and adds the exact answer and
// the backwards midpoint; Challenge asks for the same ideas in letters.
//
// Every answer is a number, a coordinate or a short equation, so `accept` can
// do the marking; coordinates are accepted with or without spaces and brackets.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        prompt: 'Find the distance between $-2$ and $7$ on the number line.',
        promptVn: 'Tìm khoảng cách giữa $-2$ và $7$ trên trục số.',
        solution: [
          'Distance on a number line is the bigger number minus the smaller.',
          '$7 - (-2) = 7 + 2 = 9$.',
        ],
        solutionVn: [
          'Khoảng cách trên trục số là số lớn trừ số bé.',
          '$7 - (-2) = 7 + 2 = 9$.',
        ],
        answer: '$9$', answerVn: '$9$',
      },
      {
        id: 'f2',
        prompt: 'What number is exactly halfway between $-11$ and $5$?',
        promptVn: 'Số nào nằm chính giữa $-11$ và $5$?',
        solution: [
          'Halfway between two numbers is their average.',
          '$\\dfrac{-11 + 5}{2} = \\dfrac{-6}{2} = -3$.',
          'Check: from $-11$ to $-3$ is $8$ steps, and from $-3$ to $5$ is $8$ steps.',
        ],
        solutionVn: [
          'Điểm chính giữa hai số là trung bình cộng của chúng.',
          '$\\dfrac{-11 + 5}{2} = \\dfrac{-6}{2} = -3$.',
          'Kiểm tra: từ $-11$ tới $-3$ là $8$ bước, và từ $-3$ tới $5$ cũng là $8$ bước.',
        ],
        answer: '$-3$', answerVn: '$-3$',
      },
      {
        id: 'f3',
        prompt: 'Work out $|-8 - 3|$.',
        promptVn: 'Tính $|-8 - 3|$.',
        solution: [
          'Work out the inside first: $-8 - 3 = -11$.',
          'The absolute value is the distance from $0$, so $|-11| = 11$.',
          'That is also the distance between $-8$ and $3$ on the number line.',
        ],
        solutionVn: [
          'Tính bên trong trước: $-8 - 3 = -11$.',
          'Giá trị tuyệt đối là khoảng cách tới $0$, nên $|-11| = 11$.',
          'Đó cũng là khoảng cách giữa $-8$ và $3$ trên trục số.',
        ],
        answer: '$11$', answerVn: '$11$',
      },
      {
        id: 'f4',
        type: 'mcq',
        prompt: 'Which point lies on the $x$-axis?',
        promptVn: 'Điểm nào nằm trên trục $x$?',
        options: [
          { val: 'a', text: '$(0, 4)$' },
          { val: 'b', text: '$(4, 0)$' },
          { val: 'c', text: '$(4, 4)$' },
          { val: 'd', text: '$(-4, 4)$' },
        ],
        correct: 'b',
        solution: [
          'A point on the $x$-axis is neither above nor below the origin, so its $y$-coordinate is $0$.',
          'Only $(4, 0)$ has $y = 0$. $(0, 4)$ has $x = 0$, so it is on the $y$-axis.',
        ],
        solutionVn: [
          'Một điểm trên trục $x$ không nằm trên cũng không nằm dưới gốc tọa độ, nên tung độ của nó bằng $0$.',
          'Chỉ có $(4, 0)$ có $y = 0$. $(0, 4)$ có $x = 0$, nên nó nằm trên trục $y$.',
        ],
        answer: '$(4, 0)$', answerVn: '$(4, 0)$',
      },
      {
        id: 'f5',
        prompt: 'Find the distance between $(-5, -2)$ and $(7, 3)$.',
        promptVn: 'Tìm khoảng cách giữa $(-5, -2)$ và $(7, 3)$.',
        solution: [
          'Across: $7 - (-5) = 12$. Up: $3 - (-2) = 5$.',
          'These are the short sides of a right triangle, so the distance squared is $12^2 + 5^2 = 144 + 25 = 169$.',
          'The distance is $\\sqrt{169} = 13$.',
        ],
        solutionVn: [
          'Ngang: $7 - (-5) = 12$. Dọc: $3 - (-2) = 5$.',
          'Đó là hai cạnh ngắn của một tam giác vuông, nên bình phương khoảng cách là $12^2 + 5^2 = 144 + 25 = 169$.',
          'Khoảng cách là $\\sqrt{169} = 13$.',
        ],
        answer: '$13$', answerVn: '$13$',
      },
      {
        id: 'f6',
        prompt: 'Find the midpoint of $(-4, 9)$ and $(6, -1)$.',
        promptVn: 'Tìm trung điểm của $(-4, 9)$ và $(6, -1)$.',
        solution: [
          'Average the $x$ values: $\\dfrac{-4 + 6}{2} = 1$.',
          'Average the $y$ values: $\\dfrac{9 + (-1)}{2} = 4$.',
          'The midpoint is $(1, 4)$.',
        ],
        solutionVn: [
          'Trung bình các hoành độ: $\\dfrac{-4 + 6}{2} = 1$.',
          'Trung bình các tung độ: $\\dfrac{9 + (-1)}{2} = 4$.',
          'Trung điểm là $(1, 4)$.',
        ],
        answer: '$(1, 4)$', answerVn: '$(1, 4)$',
        accept: ['(1,4)', '(1, 4)', '1,4', '1, 4'],
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
        prompt: 'Which of these points is farthest from the origin: $(0, 5)$, $(1, 2)$, $(3, -4)$, $(6, 0)$, $(-1, -2)$?',
        promptVn: 'Điểm nào sau đây xa gốc tọa độ nhất: $(0, 5)$, $(1, 2)$, $(3, -4)$, $(6, 0)$, $(-1, -2)$?',
        options: [
          { val: 'a', text: '$(0, 5)$' },
          { val: 'b', text: '$(3, -4)$' },
          { val: 'c', text: '$(6, 0)$' },
          { val: 'd', text: '$(-1, -2)$' },
        ],
        correct: 'c',
        solution: [
          'From the origin, the walk across is $x$ and the walk up is $y$, so the distance squared is $x^2 + y^2$.',
          '$(0, 5)$: $25$. $(1, 2)$: $5$. $(3, -4)$: $9 + 16 = 25$. $(6, 0)$: $36$. $(-1, -2)$: $5$.',
          'The biggest is $36$, so $(6, 0)$ is farthest — $6$ away. $(0, 5)$ and $(3, -4)$ tie at $5$.',
        ],
        solutionVn: [
          'Từ gốc tọa độ, đoạn đi ngang là $x$ và đoạn đi dọc là $y$, nên bình phương khoảng cách là $x^2 + y^2$.',
          '$(0, 5)$: $25$. $(1, 2)$: $5$. $(3, -4)$: $9 + 16 = 25$. $(6, 0)$: $36$. $(-1, -2)$: $5$.',
          'Lớn nhất là $36$, nên $(6, 0)$ xa nhất — cách $6$ đơn vị. $(0, 5)$ và $(3, -4)$ bằng nhau, đều cách $5$.',
        ],
        answer: '$(6, 0)$', answerVn: '$(6, 0)$',
      },
      {
        id: 'p2',
        prompt: 'Find the distance between $(1, -2)$ and $(-5, 6)$.',
        promptVn: 'Tìm khoảng cách giữa $(1, -2)$ và $(-5, 6)$.',
        solution: [
          'Across: $-5 - 1 = -6$ (six to the left). Up: $6 - (-2) = 8$.',
          'Squaring removes the sign: $(-6)^2 + 8^2 = 36 + 64 = 100$.',
          'The distance is $\\sqrt{100} = 10$.',
        ],
        solutionVn: [
          'Ngang: $-5 - 1 = -6$ (sáu đơn vị sang trái). Dọc: $6 - (-2) = 8$.',
          'Bình phương làm mất dấu: $(-6)^2 + 8^2 = 36 + 64 = 100$.',
          'Khoảng cách là $\\sqrt{100} = 10$.',
        ],
        answer: '$10$', answerVn: '$10$',
      },
      {
        id: 'p3',
        prompt: 'Find the midpoint of the segment joining $(1, -2)$ and $(-5, 6)$.',
        promptVn: 'Tìm trung điểm của đoạn thẳng nối $(1, -2)$ và $(-5, 6)$.',
        solution: [
          '$x$: $\\dfrac{1 + (-5)}{2} = \\dfrac{-4}{2} = -2$.',
          '$y$: $\\dfrac{-2 + 6}{2} = \\dfrac{4}{2} = 2$.',
          'The midpoint is $(-2, 2)$.',
        ],
        solutionVn: [
          '$x$: $\\dfrac{1 + (-5)}{2} = \\dfrac{-4}{2} = -2$.',
          '$y$: $\\dfrac{-2 + 6}{2} = \\dfrac{4}{2} = 2$.',
          'Trung điểm là $(-2, 2)$.',
        ],
        answer: '$(-2, 2)$', answerVn: '$(-2, 2)$',
        accept: ['(-2,2)', '(-2, 2)', '-2,2', '-2, 2'],
      },
      {
        id: 'p4',
        prompt: '$P$ is $(5, 3)$ and $Q$ is $(-3, 6)$. Find the point $T$ such that $Q$ is the midpoint of $PT$.',
        promptVn: '$P$ là $(5, 3)$ và $Q$ là $(-3, 6)$. Tìm điểm $T$ sao cho $Q$ là trung điểm của $PT$.',
        solution: [
          'The step from $P$ to $Q$ is $-3 - 5 = -8$ across and $6 - 3 = 3$ up.',
          '$Q$ is halfway, so $T$ is the same step again from $Q$: $(-3 - 8,\\ 6 + 3) = (-11, 9)$.',
          'Check: the average of $5$ and $-11$ is $-3$, and the average of $3$ and $9$ is $6$. That is $Q$.',
        ],
        solutionVn: [
          'Bước đi từ $P$ tới $Q$ là $-3 - 5 = -8$ theo chiều ngang và $6 - 3 = 3$ theo chiều dọc.',
          '$Q$ nằm chính giữa, nên $T$ là đi thêm đúng bước đó từ $Q$: $(-3 - 8,\\ 6 + 3) = (-11, 9)$.',
          'Kiểm tra: trung bình của $5$ và $-11$ là $-3$, trung bình của $3$ và $9$ là $6$. Đó chính là $Q$.',
        ],
        answer: '$(-11, 9)$', answerVn: '$(-11, 9)$',
        accept: ['(-11,9)', '(-11, 9)', '-11,9', '-11, 9'],
      },
      {
        id: 'p5',
        prompt: 'Find the **exact** distance between $(-2, 3)$ and $(4, -1)$.',
        promptVn: 'Tìm khoảng cách **chính xác** giữa $(-2, 3)$ và $(4, -1)$.',
        solution: [
          'Across: $4 - (-2) = 6$. Down: $3 - (-1) = 4$.',
          'Distance squared: $6^2 + 4^2 = 36 + 16 = 52$.',
          '$52$ is not a perfect square, so the exact distance is $\\sqrt{52}$, which can also be written $2\\sqrt{13}$ (because $52 = 4 \\times 13$).',
        ],
        solutionVn: [
          'Ngang: $4 - (-2) = 6$. Xuống: $3 - (-1) = 4$.',
          'Bình phương khoảng cách: $6^2 + 4^2 = 36 + 16 = 52$.',
          '$52$ không phải số chính phương, nên khoảng cách chính xác là $\\sqrt{52}$, cũng có thể viết là $2\\sqrt{13}$ (vì $52 = 4 \\times 13$).',
        ],
        answer: '$2\\sqrt{13}$', answerVn: '$2\\sqrt{13}$',
        accept: ['sqrt(52)', 'sqrt52', '√52', '√(52)', '2√13', '2sqrt(13)', '2sqrt13', '2*sqrt(13)'],
      },
      {
        id: 'p6',
        prompt: '$P$ is $(-3, 7)$ and $Q$ is $(5, -12)$. Find the midpoint of $PQ$.',
        promptVn: '$P$ là $(-3, 7)$ và $Q$ là $(5, -12)$. Tìm trung điểm của $PQ$.',
        solution: [
          '$x$: $\\dfrac{-3 + 5}{2} = 1$.',
          '$y$: $\\dfrac{7 + (-12)}{2} = -\\dfrac{5}{2}$.',
          'The midpoint is $\\left(1, -\\dfrac{5}{2}\\right)$ — a midpoint does not have to be a lattice point.',
        ],
        solutionVn: [
          '$x$: $\\dfrac{-3 + 5}{2} = 1$.',
          '$y$: $\\dfrac{7 + (-12)}{2} = -\\dfrac{5}{2}$.',
          'Trung điểm là $\\left(1, -\\dfrac{5}{2}\\right)$ — trung điểm không nhất thiết là điểm nguyên.',
        ],
        answer: '$\\left(1, -\\dfrac{5}{2}\\right)$', answerVn: '$\\left(1, -\\dfrac{5}{2}\\right)$',
        accept: ['(1,-5/2)', '(1, -5/2)', '(1,-2.5)', '(1, -2.5)', '1,-5/2', '1, -5/2', '1,-2.5', '1, -2.5'],
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'With $P(-3, 7)$ and $Q(5, -12)$ again, find the point $T$ on $PQ$ with $PT : TQ = 1 : 3$.',
        promptVn: 'Vẫn với $P(-3, 7)$ và $Q(5, -12)$, tìm điểm $T$ trên $PQ$ sao cho $PT : TQ = 1 : 3$.',
        solution: [
          '$1 + 3 = 4$ equal pieces, and $PT$ is one of them, so $T$ is $\\dfrac{1}{4}$ of the way from $P$ to $Q$.',
          'The change from $P$ to $Q$ is $5 - (-3) = 8$ across and $-12 - 7 = -19$ up.',
          'A quarter of that is $2$ across and $-\\dfrac{19}{4}$ up.',
          '$T = \\left(-3 + 2,\\ 7 - \\dfrac{19}{4}\\right) = \\left(-1, \\dfrac{9}{4}\\right)$.',
        ],
        solutionVn: [
          'Có $1 + 3 = 4$ phần bằng nhau, và $PT$ là một phần, nên $T$ nằm ở $\\dfrac{1}{4}$ quãng đường từ $P$ tới $Q$.',
          'Độ thay đổi từ $P$ tới $Q$ là $5 - (-3) = 8$ theo chiều ngang và $-12 - 7 = -19$ theo chiều dọc.',
          'Một phần tư của nó là $2$ theo chiều ngang và $-\\dfrac{19}{4}$ theo chiều dọc.',
          '$T = \\left(-3 + 2,\\ 7 - \\dfrac{19}{4}\\right) = \\left(-1, \\dfrac{9}{4}\\right)$.',
        ],
        answer: '$\\left(-1, \\dfrac{9}{4}\\right)$', answerVn: '$\\left(-1, \\dfrac{9}{4}\\right)$',
        accept: ['(-1,9/4)', '(-1, 9/4)', '(-1,2.25)', '(-1, 2.25)', '-1,9/4', '-1, 9/4', '-1,2.25', '-1, 2.25'],
      },
      {
        id: 'c2',
        prompt: 'Triangle $ABC$ has $A(1, 1)$, $B(4, 5)$ and $C(-3, 4)$. Two of its sides are the same length. How long are they?',
        promptVn: 'Tam giác $ABC$ có $A(1, 1)$, $B(4, 5)$ và $C(-3, 4)$. Hai cạnh của nó dài bằng nhau. Chúng dài bao nhiêu?',
        solution: [
          '$AB$: across $3$, up $4$, so $AB^2 = 9 + 16 = 25$ and $AB = 5$.',
          '$AC$: across $-4$, up $3$, so $AC^2 = 16 + 9 = 25$ and $AC = 5$.',
          '$BC$: across $-7$, up $-1$, so $BC^2 = 49 + 1 = 50$ — the odd one out.',
          'The two equal sides are $5$ long.',
        ],
        solutionVn: [
          '$AB$: ngang $3$, dọc $4$, nên $AB^2 = 9 + 16 = 25$ và $AB = 5$.',
          '$AC$: ngang $-4$, dọc $3$, nên $AC^2 = 16 + 9 = 25$ và $AC = 5$.',
          '$BC$: ngang $-7$, dọc $-1$, nên $BC^2 = 49 + 1 = 50$ — cạnh khác biệt.',
          'Hai cạnh bằng nhau dài $5$.',
        ],
        answer: '$5$', answerVn: '$5$',
      },
      {
        id: 'c3',
        type: 'mcq',
        prompt: 'Which expression gives the distance from the point $(x_1, y_1)$ to the origin?',
        promptVn: 'Biểu thức nào cho khoảng cách từ điểm $(x_1, y_1)$ tới gốc tọa độ?',
        options: [
          { val: 'a', text: '$x_1 + y_1$' },
          { val: 'b', text: '$\\sqrt{x_1 + y_1}$' },
          { val: 'c', text: '$x_1^2 + y_1^2$' },
          { val: 'd', text: '$\\sqrt{x_1^2 + y_1^2}$' },
        ],
        correct: 'd',
        solution: [
          'The origin is $(0, 0)$. The walk across is $x_1 - 0 = x_1$ and the walk up is $y_1 - 0 = y_1$.',
          'Pythagoras: distance squared $= x_1^2 + y_1^2$.',
          'So the distance is $\\sqrt{x_1^2 + y_1^2}$. Option c is the distance SQUARED — it forgot the root.',
        ],
        solutionVn: [
          'Gốc tọa độ là $(0, 0)$. Đoạn đi ngang là $x_1 - 0 = x_1$ và đoạn đi dọc là $y_1 - 0 = y_1$.',
          'Pythagore: bình phương khoảng cách $= x_1^2 + y_1^2$.',
          'Vậy khoảng cách là $\\sqrt{x_1^2 + y_1^2}$. Đáp án c là BÌNH PHƯƠNG khoảng cách — nó quên lấy căn.',
        ],
        answer: '$\\sqrt{x_1^2 + y_1^2}$', answerVn: '$\\sqrt{x_1^2 + y_1^2}$',
      },
      {
        id: 'c4',
        prompt: 'The midpoint of the segment joining $(a, b)$ and $(b, a)$ is $(x, y)$. Express $y$ in terms of $x$.',
        promptVn: 'Trung điểm của đoạn thẳng nối $(a, b)$ và $(b, a)$ là $(x, y)$. Biểu diễn $y$ theo $x$.',
        solution: [
          'Average the $x$ values: $x = \\dfrac{a + b}{2}$.',
          'Average the $y$ values: $y = \\dfrac{b + a}{2}$.',
          'Those are the same number, so $y = x$ — every such midpoint lies on the line $y = x$.',
        ],
        solutionVn: [
          'Trung bình các hoành độ: $x = \\dfrac{a + b}{2}$.',
          'Trung bình các tung độ: $y = \\dfrac{b + a}{2}$.',
          'Hai số đó bằng nhau, nên $y = x$ — mọi trung điểm như vậy đều nằm trên đường thẳng $y = x$.',
        ],
        answer: '$y = x$', answerVn: '$y = x$',
      },
      {
        id: 'c5',
        type: 'mcq',
        prompt: 'If $|x - 3| = 4$, what are all the possible values of $x$?',
        promptVn: 'Nếu $|x - 3| = 4$, thì $x$ có thể nhận những giá trị nào?',
        options: [
          { val: 'a', text: '$7$ only', textVn: 'Chỉ $7$' },
          { val: 'b', text: '$-1$ and $7$', textVn: '$-1$ và $7$' },
          { val: 'c', text: '$1$ and $7$', textVn: '$1$ và $7$' },
          { val: 'd', text: '$-7$ and $7$', textVn: '$-7$ và $7$' },
        ],
        correct: 'b',
        solution: [
          '$|x - 3|$ is the distance between $x$ and $3$ on the number line.',
          'The numbers $4$ away from $3$ are $3 + 4 = 7$ and $3 - 4 = -1$ — one on each side.',
          'So $x = -1$ or $x = 7$.',
        ],
        solutionVn: [
          '$|x - 3|$ là khoảng cách giữa $x$ và $3$ trên trục số.',
          'Các số cách $3$ một khoảng $4$ là $3 + 4 = 7$ và $3 - 4 = -1$ — mỗi số một bên.',
          'Vậy $x = -1$ hoặc $x = 7$.',
        ],
        answer: '$-1$ and $7$', answerVn: '$-1$ và $7$',
      },
    ],
  },
];
