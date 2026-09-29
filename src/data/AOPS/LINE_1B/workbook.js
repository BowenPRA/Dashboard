// src/data/AOPS/LINE_1B/workbook.js
// Reveal-solution practice for Graphing Lines & Slope — the whole Drill.
// See docs/workbook-tasks.md.
//
// From the chapter's exercises and review problems (8.2.1, 8.2.3, 8.3.1,
// problem 8.12, 8.28, 8.40, 8.51, 8.54) with warm-ups in front. Focus: a
// point on a graph, slope from two points, the four kinds of slope. Practice:
// three points on a line, a point from a slope, "find t", steepness.
// Challenge: the same ideas with letters in the coordinates, equal slopes
// that are NOT one line, and a student who plots every point backwards.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'mcq',
        prompt: 'Is the point $(4, 2)$ on the graph of $3x - 2y = 8$?',
        promptVn: 'Điểm $(4, 2)$ có nằm trên đồ thị của $3x - 2y = 8$ không?',
        options: [
          { val: 'a', text: 'Yes', textVn: 'Có' },
          { val: 'b', text: 'No', textVn: 'Không' },
        ],
        correct: 'a',
        solution: [
          'A point is on the graph when it makes the equation true. Put $x = 4$ and $y = 2$ in.',
          '$3(4) - 2(2) = 12 - 4 = 8$. That matches the right side, so yes, it is on the graph.',
        ],
        solutionVn: [
          'Một điểm nằm trên đồ thị khi nó làm phương trình đúng. Thay $x = 4$ và $y = 2$ vào.',
          '$3(4) - 2(2) = 12 - 4 = 8$. Khớp với vế phải, nên có, điểm đó nằm trên đồ thị.',
        ],
        answer: 'Yes', answerVn: 'Có',
      },
      {
        id: 'f2',
        prompt: 'What is the slope of the line through $(1, 2)$ and $(4, 8)$?',
        promptVn: 'Hệ số góc của đường thẳng qua $(1, 2)$ và $(4, 8)$ là bao nhiêu?',
        solution: [
          'Rise: $8 - 2 = 6$. Run: $4 - 1 = 3$.',
          'Slope $= \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{6}{3} = 2$.',
        ],
        solutionVn: [
          'Dọc: $8 - 2 = 6$. Ngang: $4 - 1 = 3$.',
          'Hệ số góc $= \\dfrac{\\text{dọc}}{\\text{ngang}} = \\dfrac{6}{3} = 2$.',
        ],
        answer: '$2$', answerVn: '$2$',
      },
      {
        id: 'f3',
        prompt: 'What is the slope of the line through $(-3, 5)$ and $(2, -5)$?',
        promptVn: 'Hệ số góc của đường thẳng qua $(-3, 5)$ và $(2, -5)$ là bao nhiêu?',
        solution: [
          'Subtract in the same order, top and bottom: $m = \\dfrac{-5 - 5}{2 - (-3)}$.',
          '$= \\dfrac{-10}{5} = -2$. Negative: the line goes down from left to right.',
        ],
        solutionVn: [
          'Trừ theo cùng một thứ tự ở tử và mẫu: $m = \\dfrac{-5 - 5}{2 - (-3)}$.',
          '$= \\dfrac{-10}{5} = -2$. Âm: đường thẳng đi xuống từ trái sang phải.',
        ],
        answer: '$-2$', answerVn: '$-2$',
      },
      {
        id: 'f4',
        prompt: 'What is the slope of the line $y = -2$?',
        promptVn: 'Hệ số góc của đường thẳng $y = -2$ là bao nhiêu?',
        solution: [
          'Every point on $y = -2$ has the same $y$ — for example $(0, -2)$ and $(5, -2)$.',
          'The rise between them is $0$, so the slope is $\\dfrac{0}{5} = 0$. The line is horizontal.',
        ],
        solutionVn: [
          'Mọi điểm trên $y = -2$ có cùng $y$ — chẳng hạn $(0, -2)$ và $(5, -2)$.',
          'Độ thay đổi dọc giữa chúng bằng $0$, nên hệ số góc là $\\dfrac{0}{5} = 0$. Đường thẳng nằm ngang.',
        ],
        answer: '$0$', answerVn: '$0$',
      },
      {
        id: 'f5',
        type: 'mcq',
        prompt: 'What is the slope of the line $x = 4.2$?',
        promptVn: 'Hệ số góc của đường thẳng $x = 4.2$ là bao nhiêu?',
        options: [
          { val: 'a', text: '$0$' },
          { val: 'b', text: '$4.2$' },
          { val: 'c', text: 'undefined', textVn: 'không xác định' },
          { val: 'd', text: '$1$' },
        ],
        correct: 'c',
        solution: [
          'Every point on $x = 4.2$ has the same $x$: it is a vertical line.',
          'Between any two of its points the run is $0$, and you cannot divide by $0$. The slope is undefined.',
        ],
        solutionVn: [
          'Mọi điểm trên $x = 4.2$ có cùng $x$: đó là một đường thẳng đứng.',
          'Giữa hai điểm bất kỳ của nó, độ thay đổi ngang bằng $0$, và không thể chia cho $0$. Hệ số góc không xác định.',
        ],
        answer: 'undefined', answerVn: 'không xác định',
      },
      {
        id: 'f6',
        type: 'mcq',
        prompt: 'A line has slope $-3$. Reading from left to right, it goes…',
        promptVn: 'Một đường thẳng có hệ số góc $-3$. Đọc từ trái sang phải, nó đi…',
        options: [
          { val: 'a', text: 'gently up', textVn: 'lên thoải' },
          { val: 'b', text: 'steeply up', textVn: 'lên dốc' },
          { val: 'c', text: 'gently down', textVn: 'xuống thoải' },
          { val: 'd', text: 'steeply down', textVn: 'xuống dốc' },
        ],
        correct: 'd',
        solution: [
          'The sign says which way: negative means down from left to right.',
          'The size says how steep: $3$ is bigger than $1$, so it is steeper than a $45°$ line — 3 down for every 1 across.',
        ],
        solutionVn: [
          'Dấu cho biết hướng: âm nghĩa là đi xuống từ trái sang phải.',
          'Độ lớn cho biết độ dốc: $3$ lớn hơn $1$, nên nó dốc hơn đường $45°$ — xuống 3 ứng với mỗi 1 sang ngang.',
        ],
        answer: 'steeply down', answerVn: 'xuống dốc',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        prompt: 'On the graph of $3x - 2y = -4$, what is $y$ when $x = 2$?',
        promptVn: 'Trên đồ thị của $3x - 2y = -4$, $y$ bằng bao nhiêu khi $x = 2$?',
        solution: [
          'Put $x = 2$ in: $3(2) - 2y = -4$, so $6 - 2y = -4$.',
          'Subtract $6$: $-2y = -10$. Divide by $-2$: $y = 5$.',
          'So $(2, 5)$ is on the line.',
        ],
        solutionVn: [
          'Thay $x = 2$: $3(2) - 2y = -4$, nên $6 - 2y = -4$.',
          'Trừ $6$: $-2y = -10$. Chia cho $-2$: $y = 5$.',
          'Vậy $(2, 5)$ nằm trên đường thẳng.',
        ],
        answer: '$5$', answerVn: '$5$',
      },
      {
        id: 'p2',
        type: 'mcq',
        prompt: 'Which three of these points lie on the same straight line: $A(32, 5)$, $B(24, 18)$, $C(22, 21)$, $D(17, 29)$?',
        promptVn: 'Ba điểm nào sau đây thẳng hàng: $A(32, 5)$, $B(24, 18)$, $C(22, 21)$, $D(17, 29)$?',
        options: [
          { val: 'a', text: '$A$, $B$, $C$' },
          { val: 'b', text: '$A$, $C$, $D$' },
          { val: 'c', text: '$B$, $C$, $D$' },
          { val: 'd', text: '$A$, $B$, $D$' },
        ],
        correct: 'b',
        solution: [
          'Compare slopes from $A$, subtracting in the same order: to $B$, $\\dfrac{18 - 5}{24 - 32} = -\\dfrac{13}{8}$.',
          'To $C$: $\\dfrac{21 - 5}{22 - 32} = -\\dfrac{8}{5}$. To $D$: $\\dfrac{29 - 5}{17 - 32} = -\\dfrac{8}{5}$.',
          '$C$ and $D$ have the same slope from $A$, so $A$, $C$ and $D$ are on one line; $B$ is not.',
        ],
        solutionVn: [
          'So sánh các hệ số góc tính từ $A$, trừ cùng thứ tự: tới $B$, $\\dfrac{18 - 5}{24 - 32} = -\\dfrac{13}{8}$.',
          'Tới $C$: $\\dfrac{21 - 5}{22 - 32} = -\\dfrac{8}{5}$. Tới $D$: $\\dfrac{29 - 5}{17 - 32} = -\\dfrac{8}{5}$.',
          '$C$ và $D$ có cùng hệ số góc tính từ $A$, nên $A$, $C$ và $D$ thẳng hàng; $B$ thì không.',
        ],
        answer: '$A$, $C$, $D$', answerVn: '$A$, $C$, $D$',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'The line through $(1, 2)$ has slope $\\tfrac{1}{3}$. Which of these points is also on it?',
        promptVn: 'Đường thẳng qua $(1, 2)$ có hệ số góc $\\tfrac{1}{3}$. Điểm nào sau đây cũng nằm trên nó?',
        options: [
          { val: 'a', text: '$(2, 5)$' },
          { val: 'b', text: '$(4, 3)$' },
          { val: 'c', text: '$(4, 1)$' },
          { val: 'd', text: '$(3, 4)$' },
        ],
        correct: 'b',
        solution: [
          '$\\tfrac{1}{3}$ means up $1$ for every $3$ right.',
          'From $(1, 2)$: $3$ right and $1$ up is $(4, 3)$.',
          'Option a went up 3 for every 1 across — that is slope $3$, the reciprocal.',
        ],
        solutionVn: [
          '$\\tfrac{1}{3}$ nghĩa là lên $1$ ứng với mỗi $3$ sang phải.',
          'Từ $(1, 2)$: sang phải $3$ và lên $1$ là $(4, 3)$.',
          'Đáp án a đi lên 3 ứng với mỗi 1 sang ngang — đó là hệ số góc $3$, số nghịch đảo.',
        ],
        answer: '$(4, 3)$', answerVn: '$(4, 3)$',
      },
      {
        id: 'p4',
        prompt: 'The line through $(2, k)$ and $(5, 11)$ has slope $3$. Find $k$.',
        promptVn: 'Đường thẳng qua $(2, k)$ và $(5, 11)$ có hệ số góc $3$. Tìm $k$.',
        solution: [
          'The run from $(2, k)$ to $(5, 11)$ is $5 - 2 = 3$.',
          'A slope of $3$ means the rise is $3 \\times 3 = 9$.',
          'So $11 - k = 9$, which gives $k = 2$.',
        ],
        solutionVn: [
          'Độ thay đổi ngang từ $(2, k)$ tới $(5, 11)$ là $5 - 2 = 3$.',
          'Hệ số góc $3$ nghĩa là độ thay đổi dọc bằng $3 \\times 3 = 9$.',
          'Vậy $11 - k = 9$, suy ra $k = 2$.',
        ],
        answer: '$2$', answerVn: '$2$',
      },
      {
        id: 'p5',
        prompt: 'Find $t$ so that $(t, 5)$ lies on the line through $(0, 3)$ and $(-8, 0)$.',
        promptVn: 'Tìm $t$ để $(t, 5)$ nằm trên đường thẳng qua $(0, 3)$ và $(-8, 0)$.',
        solution: [
          'Slope of the line: $\\dfrac{3 - 0}{0 - (-8)} = \\dfrac{3}{8}$.',
          'From $(0, 3)$ to $(t, 5)$ the rise is $2$, so the run must be $2 \\div \\tfrac{3}{8} = \\tfrac{16}{3}$.',
          'The run is $t - 0$, so $t = \\dfrac{16}{3}$.',
        ],
        solutionVn: [
          'Hệ số góc của đường thẳng: $\\dfrac{3 - 0}{0 - (-8)} = \\dfrac{3}{8}$.',
          'Từ $(0, 3)$ tới $(t, 5)$ độ thay đổi dọc là $2$, nên độ thay đổi ngang phải là $2 \\div \\tfrac{3}{8} = \\tfrac{16}{3}$.',
          'Độ thay đổi ngang là $t - 0$, nên $t = \\dfrac{16}{3}$.',
        ],
        answer: '$\\dfrac{16}{3}$', answerVn: '$\\dfrac{16}{3}$',
      },
      {
        id: 'p6',
        type: 'mcq',
        prompt: 'Which line is the **least** steep?',
        promptVn: 'Đường thẳng nào **ít dốc nhất**?',
        options: [
          { val: 'a', text: '$y = -\\tfrac{1}{10}x + 7$' },
          { val: 'b', text: '$y = \\tfrac{1}{2}x$' },
          { val: 'c', text: '$y = -x - 1$' },
          { val: 'd', text: '$y = 2x + 3$' },
        ],
        correct: 'a',
        solution: [
          'Steepness is the size of the slope, ignoring the sign: $\\tfrac{1}{10}$, $\\tfrac{1}{2}$, $1$ and $2$.',
          'The smallest is $\\tfrac{1}{10}$, so $y = -\\tfrac{1}{10}x + 7$ is the least steep — nearly flat, tipping gently down.',
        ],
        solutionVn: [
          'Độ dốc là độ lớn của hệ số góc, không xét dấu: $\\tfrac{1}{10}$, $\\tfrac{1}{2}$, $1$ và $2$.',
          'Nhỏ nhất là $\\tfrac{1}{10}$, nên $y = -\\tfrac{1}{10}x + 7$ ít dốc nhất — gần như nằm ngang, nghiêng xuống nhẹ.',
        ],
        answer: '$y = -\\tfrac{1}{10}x + 7$', answerVn: '$y = -\\tfrac{1}{10}x + 7$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'The three points $(3, -5)$, $(-a + 2, 3)$ and $(2a + 3, 2)$ lie on the same line. What is $a$?',
        promptVn: 'Ba điểm $(3, -5)$, $(-a + 2, 3)$ và $(2a + 3, 2)$ thẳng hàng. Tìm $a$.',
        solution: [
          'Slope from $(3, -5)$ to $(-a + 2, 3)$: $\\dfrac{3 - (-5)}{(-a + 2) - 3} = \\dfrac{8}{-a - 1}$.',
          'Slope from $(3, -5)$ to $(2a + 3, 2)$: $\\dfrac{2 - (-5)}{(2a + 3) - 3} = \\dfrac{7}{2a}$.',
          'On one line, the slopes are equal: $8 \\cdot 2a = 7(-a - 1)$, so $16a = -7a - 7$.',
          '$23a = -7$, so $a = -\\dfrac{7}{23}$.',
        ],
        solutionVn: [
          'Hệ số góc từ $(3, -5)$ tới $(-a + 2, 3)$: $\\dfrac{3 - (-5)}{(-a + 2) - 3} = \\dfrac{8}{-a - 1}$.',
          'Hệ số góc từ $(3, -5)$ tới $(2a + 3, 2)$: $\\dfrac{2 - (-5)}{(2a + 3) - 3} = \\dfrac{7}{2a}$.',
          'Thẳng hàng thì hai hệ số góc bằng nhau: $8 \\cdot 2a = 7(-a - 1)$, nên $16a = -7a - 7$.',
          '$23a = -7$, nên $a = -\\dfrac{7}{23}$.',
        ],
        answer: '$-\\dfrac{7}{23}$', answerVn: '$-\\dfrac{7}{23}$',
      },
      {
        id: 'c2',
        prompt: 'A line through $(2a + 4,\\ 3a^2)$ and $(3a + 4,\\ 5a^2)$ has slope $a + 3$. If $a \\neq 0$, find $a$.',
        promptVn: 'Một đường thẳng qua $(2a + 4,\\ 3a^2)$ và $(3a + 4,\\ 5a^2)$ có hệ số góc $a + 3$. Với $a \\neq 0$, tìm $a$.',
        solution: [
          'Rise: $5a^2 - 3a^2 = 2a^2$. Run: $(3a + 4) - (2a + 4) = a$.',
          'Slope: $\\dfrac{2a^2}{a} = 2a$ (we can divide by $a$ because $a \\neq 0$).',
          'So $2a = a + 3$, which gives $a = 3$.',
        ],
        solutionVn: [
          'Dọc: $5a^2 - 3a^2 = 2a^2$. Ngang: $(3a + 4) - (2a + 4) = a$.',
          'Hệ số góc: $\\dfrac{2a^2}{a} = 2a$ (chia được cho $a$ vì $a \\neq 0$).',
          'Vậy $2a = a + 3$, suy ra $a = 3$.',
        ],
        answer: '$3$', answerVn: '$3$',
      },
      {
        id: 'c3',
        type: 'mcq',
        prompt: 'Points $A$, $B$, $C$, $D$ are such that the slope of line $AB$ equals the slope of line $CD$. Must all four points be on the same line?',
        promptVn: 'Các điểm $A$, $B$, $C$, $D$ thỏa mãn hệ số góc của đường thẳng $AB$ bằng hệ số góc của đường thẳng $CD$. Cả bốn điểm có nhất thiết thẳng hàng không?',
        options: [
          { val: 'a', text: 'Yes, always', textVn: 'Có, luôn luôn' },
          { val: 'b', text: 'No — the two lines can be parallel', textVn: 'Không — hai đường thẳng có thể song song' },
        ],
        correct: 'b',
        solution: [
          'Equal slopes only say the two lines point in the same direction.',
          'Example: $A(0, 0)$, $B(1, 1)$ and $C(0, 5)$, $D(1, 6)$. Both slopes are $1$, but $CD$ sits $5$ above $AB$ — two different, parallel lines.',
          'The collinearity test works because it measures both slopes FROM THE SAME POINT.',
        ],
        solutionVn: [
          'Hai hệ số góc bằng nhau chỉ cho biết hai đường thẳng cùng hướng.',
          'Ví dụ: $A(0, 0)$, $B(1, 1)$ và $C(0, 5)$, $D(1, 6)$. Cả hai hệ số góc đều bằng $1$, nhưng $CD$ nằm cao hơn $AB$ $5$ đơn vị — hai đường thẳng khác nhau, song song.',
          'Phép kiểm tra thẳng hàng hiệu quả vì nó đo cả hai hệ số góc TỪ CÙNG MỘT ĐIỂM.',
        ],
        answer: 'No', answerVn: 'Không',
      },
      {
        id: 'c4',
        prompt: 'Bob plots every point backwards: when he means $(3, 2)$ he plots $(2, 3)$. He tries to graph $y = 3x + 2$. What is the slope of the line he actually draws?',
        promptVn: 'Bob biểu diễn mọi điểm ngược lại: khi muốn vẽ $(3, 2)$ bạn ấy lại vẽ $(2, 3)$. Bạn ấy định vẽ đồ thị $y = 3x + 2$. Hệ số góc của đường thẳng bạn ấy thực sự vẽ là bao nhiêu?',
        solution: [
          'Two points on the real line: $(0, 2)$ and $(1, 5)$. Bob plots them as $(2, 0)$ and $(5, 1)$.',
          'His slope: $\\dfrac{1 - 0}{5 - 2} = \\dfrac{1}{3}$.',
          'Swapping $x$ and $y$ swaps the rise and the run, so the slope becomes the reciprocal: $3 \\to \\tfrac{1}{3}$.',
        ],
        solutionVn: [
          'Hai điểm trên đường thẳng thật: $(0, 2)$ và $(1, 5)$. Bob vẽ chúng thành $(2, 0)$ và $(5, 1)$.',
          'Hệ số góc của bạn ấy: $\\dfrac{1 - 0}{5 - 2} = \\dfrac{1}{3}$.',
          'Đổi chỗ $x$ và $y$ là đổi chỗ độ thay đổi dọc và ngang, nên hệ số góc trở thành số nghịch đảo: $3 \\to \\tfrac{1}{3}$.',
        ],
        answer: '$\\dfrac{1}{3}$', answerVn: '$\\dfrac{1}{3}$',
      },
    ],
  },
];
