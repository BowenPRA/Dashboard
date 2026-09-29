// src/data/AOPS/LINE_1C/workbook.js
// Reveal-solution practice for Equations of Lines — the whole Drill.
// See docs/workbook-tasks.md.
//
// From the chapter's exercises and review problems: 8.4.1–8.4.3, 8.5.2–8.5.4,
// 8.5.7, 8.17, 8.21, 8.37, 8.41, 8.43, 8.44, 8.47 and 8.52. Focus writes a
// line from a point and a slope or from two points, and reads the slope and
// intercepts of a standard-form line. Practice adds intercept problems,
// parallel and perpendicular lines and the test-grade curve. Challenge finds
// unknown coefficients and uses slopes instead of algebra.
//
// Equation answers are marked by the equivalence engine, which compares
// equations as maths; `accept` lists the other correct ways a student is
// likely to type the same standard form.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        prompt: 'Find the equation, in standard form, of the line through $(0, 5)$ with slope $-3$.',
        promptVn: 'Tìm phương trình dạng tổng quát của đường thẳng qua $(0, 5)$ có hệ số góc $-3$.',
        solution: [
          'Point-slope: $y - 5 = -3(x - 0)$, so $y - 5 = -3x$.',
          'Letters on the left: $3x + y = 5$. Check $(0, 5)$: $0 + 5 = 5$. ✓',
        ],
        solutionVn: [
          'Điểm – hệ số góc: $y - 5 = -3(x - 0)$, nên $y - 5 = -3x$.',
          'Chữ sang trái: $3x + y = 5$. Kiểm tra $(0, 5)$: $0 + 5 = 5$. ✓',
        ],
        answer: '$3x + y = 5$', answerVn: '$3x + y = 5$',
        accept: ['3x+y=5', '3x + y = 5'],
      },
      {
        id: 'f2',
        prompt: 'Find the equation, in standard form, of the line through $(-2, 4)$ and $(1, -2)$.',
        promptVn: 'Tìm phương trình dạng tổng quát của đường thẳng qua $(-2, 4)$ và $(1, -2)$.',
        solution: [
          'Slope: $\\dfrac{-2 - 4}{1 - (-2)} = \\dfrac{-6}{3} = -2$.',
          'Point-slope with $(1, -2)$: $y + 2 = -2(x - 1)$, so $y + 2 = -2x + 2$.',
          'Standard form: $2x + y = 0$. Check $(-2, 4)$: $-4 + 4 = 0$. ✓',
        ],
        solutionVn: [
          'Hệ số góc: $\\dfrac{-2 - 4}{1 - (-2)} = \\dfrac{-6}{3} = -2$.',
          'Điểm – hệ số góc với $(1, -2)$: $y + 2 = -2(x - 1)$, nên $y + 2 = -2x + 2$.',
          'Dạng tổng quát: $2x + y = 0$. Kiểm tra $(-2, 4)$: $-4 + 4 = 0$. ✓',
        ],
        answer: '$2x + y = 0$', answerVn: '$2x + y = 0$',
        accept: ['2x+y=0', '2x + y = 0'],
      },
      {
        id: 'f3',
        prompt: 'Find the equation, in standard form, of the line through $(2, 7)$ with slope $\\tfrac{1}{4}$.',
        promptVn: 'Tìm phương trình dạng tổng quát của đường thẳng qua $(2, 7)$ có hệ số góc $\\tfrac{1}{4}$.',
        solution: [
          'Point-slope: $y - 7 = \\tfrac{1}{4}(x - 2)$.',
          'Multiply by $4$ to clear the fraction: $4y - 28 = x - 2$.',
          'Rearrange with $A$ positive: $x - 4y = -26$. Check $(2, 7)$: $2 - 28 = -26$. ✓',
        ],
        solutionVn: [
          'Điểm – hệ số góc: $y - 7 = \\tfrac{1}{4}(x - 2)$.',
          'Nhân với $4$ để khử mẫu: $4y - 28 = x - 2$.',
          'Sắp xếp lại với $A$ dương: $x - 4y = -26$. Kiểm tra $(2, 7)$: $2 - 28 = -26$. ✓',
        ],
        answer: '$x - 4y = -26$', answerVn: '$x - 4y = -26$',
        accept: ['x-4y=-26', 'x - 4y = -26'],
      },
      {
        id: 'f4',
        prompt: 'What is the slope of $3x + 5y = 20$?',
        promptVn: 'Hệ số góc của $3x + 5y = 20$ là bao nhiêu?',
        solution: [
          'Get $y$ on its own: $5y = -3x + 20$, so $y = -\\tfrac{3}{5}x + 4$.',
          'The slope is $-\\tfrac{3}{5}$ — the same as $-\\tfrac{A}{B} = -\\tfrac{3}{5}$.',
        ],
        solutionVn: [
          'Đưa $y$ về một mình: $5y = -3x + 20$, nên $y = -\\tfrac{3}{5}x + 4$.',
          'Hệ số góc là $-\\tfrac{3}{5}$ — cũng chính là $-\\tfrac{A}{B} = -\\tfrac{3}{5}$.',
        ],
        answer: '$-\\dfrac{3}{5}$', answerVn: '$-\\dfrac{3}{5}$',
      },
      {
        id: 'f5',
        prompt: 'Where does $3x + 5y = 20$ cross the $x$-axis? Give the point.',
        promptVn: '$3x + 5y = 20$ cắt trục $x$ ở đâu? Cho biết tọa độ điểm đó.',
        solution: [
          'On the $x$-axis $y = 0$: $3x = 20$, so $x = \\tfrac{20}{3}$.',
          'The $x$-intercept is the point $\\left(\\tfrac{20}{3}, 0\\right)$ — that is $6\\tfrac{2}{3}$ across.',
        ],
        solutionVn: [
          'Trên trục $x$ thì $y = 0$: $3x = 20$, nên $x = \\tfrac{20}{3}$.',
          'Giao điểm với trục $x$ là điểm $\\left(\\tfrac{20}{3}, 0\\right)$ — tức là $6\\tfrac{2}{3}$ đơn vị theo chiều ngang.',
        ],
        answer: '$\\left(\\dfrac{20}{3}, 0\\right)$', answerVn: '$\\left(\\dfrac{20}{3}, 0\\right)$',
        accept: ['(20/3,0)', '(20/3, 0)', '20/3,0', '20/3, 0'],
      },
      {
        id: 'f6',
        prompt: 'Where does $3x + 5y = 20$ cross the $y$-axis? Give the point.',
        promptVn: '$3x + 5y = 20$ cắt trục $y$ ở đâu? Cho biết tọa độ điểm đó.',
        solution: [
          'On the $y$-axis $x = 0$: $5y = 20$, so $y = 4$.',
          'The $y$-intercept is $(0, 4)$ — the $+4$ in $y = -\\tfrac{3}{5}x + 4$.',
        ],
        solutionVn: [
          'Trên trục $y$ thì $x = 0$: $5y = 20$, nên $y = 4$.',
          'Giao điểm với trục $y$ là $(0, 4)$ — chính là số $+4$ trong $y = -\\tfrac{3}{5}x + 4$.',
        ],
        answer: '$(0, 4)$', answerVn: '$(0, 4)$',
        accept: ['(0,4)', '(0, 4)', '0,4', '0, 4'],
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        prompt: 'Find the equation of the line through $(0, 8)$ whose slope is $-m$, where $m$ is the slope of $y = 2x + 3$. Give it in slope-intercept form.',
        promptVn: 'Tìm phương trình đường thẳng qua $(0, 8)$ có hệ số góc $-m$, với $m$ là hệ số góc của $y = 2x + 3$. Viết ở dạng $y = mx + b$.',
        solution: [
          '$y = 2x + 3$ has slope $m = 2$, so our line has slope $-2$.',
          'It passes through $(0, 8)$, which is its $y$-intercept, so $b = 8$.',
          'The line is $y = -2x + 8$.',
        ],
        solutionVn: [
          '$y = 2x + 3$ có hệ số góc $m = 2$, nên đường của ta có hệ số góc $-2$.',
          'Nó đi qua $(0, 8)$, chính là giao điểm với trục $y$, nên $b = 8$.',
          'Đường thẳng là $y = -2x + 8$.',
        ],
        answer: '$y = -2x + 8$', answerVn: '$y = -2x + 8$',
      },
      {
        id: 'p2',
        prompt: 'A line has slope $5$ and crosses the $x$-axis at $(-4, 0)$. Write it in slope-intercept form.',
        promptVn: 'Một đường thẳng có hệ số góc $5$ và cắt trục $x$ tại $(-4, 0)$. Viết nó ở dạng $y = mx + b$.',
        solution: [
          'Point-slope with $(-4, 0)$: $y - 0 = 5(x + 4)$.',
          'Expand: $y = 5x + 20$.',
        ],
        solutionVn: [
          'Điểm – hệ số góc với $(-4, 0)$: $y - 0 = 5(x + 4)$.',
          'Khai triển: $y = 5x + 20$.',
        ],
        answer: '$y = 5x + 20$', answerVn: '$y = 5x + 20$',
      },
      {
        id: 'p3',
        prompt: 'A line passes through $(3, -7)$ and $(-3, 5)$. Where does it cross the $x$-axis?',
        promptVn: 'Một đường thẳng đi qua $(3, -7)$ và $(-3, 5)$. Nó cắt trục $x$ ở đâu?',
        solution: [
          'Slope: $\\dfrac{5 - (-7)}{-3 - 3} = \\dfrac{12}{-6} = -2$.',
          'Point-slope: $y + 7 = -2(x - 3)$, so $y = -2x - 1$.',
          'Put $y = 0$: $0 = -2x - 1$, so $x = -\\tfrac{1}{2}$. The $x$-intercept is $\\left(-\\tfrac{1}{2}, 0\\right)$ (and the $y$-intercept is $(0, -1)$).',
        ],
        solutionVn: [
          'Hệ số góc: $\\dfrac{5 - (-7)}{-3 - 3} = \\dfrac{12}{-6} = -2$.',
          'Điểm – hệ số góc: $y + 7 = -2(x - 3)$, nên $y = -2x - 1$.',
          'Cho $y = 0$: $0 = -2x - 1$, nên $x = -\\tfrac{1}{2}$. Giao điểm với trục $x$ là $\\left(-\\tfrac{1}{2}, 0\\right)$ (và giao điểm với trục $y$ là $(0, -1)$).',
        ],
        answer: '$\\left(-\\dfrac{1}{2}, 0\\right)$', answerVn: '$\\left(-\\dfrac{1}{2}, 0\\right)$',
        accept: ['(-1/2,0)', '(-1/2, 0)', '(-0.5,0)', '(-0.5, 0)', '-1/2,0', '-1/2, 0', '-0.5,0', '-0.5, 0'],
      },
      {
        id: 'p4',
        prompt: 'A line has slope $-2$ and $x$-intercept $(5, 0)$. What is its $y$-intercept?',
        promptVn: 'Một đường thẳng có hệ số góc $-2$ và giao điểm với trục $x$ là $(5, 0)$. Giao điểm với trục $y$ của nó là gì?',
        solution: [
          'From $(5, 0)$ to the $y$-axis is $5$ to the LEFT, a run of $-5$.',
          'Slope $-2$ means the rise is $-2 \\times (-5) = 10$: up $10$.',
          'So the $y$-intercept is $(0, 10)$.',
        ],
        solutionVn: [
          'Từ $(5, 0)$ tới trục $y$ là $5$ đơn vị sang TRÁI, độ thay đổi ngang $-5$.',
          'Hệ số góc $-2$ nghĩa là độ thay đổi dọc bằng $-2 \\times (-5) = 10$: lên $10$.',
          'Vậy giao điểm với trục $y$ là $(0, 10)$.',
        ],
        answer: '$(0, 10)$', answerVn: '$(0, 10)$',
        accept: ['(0,10)', '(0, 10)', '0,10', '0, 10'],
      },
      {
        id: 'p5',
        prompt: 'Find the standard form of the line through $(4, 1)$ that is perpendicular to $2x = -3y + 7$.',
        promptVn: 'Tìm dạng tổng quát của đường thẳng qua $(4, 1)$ vuông góc với $2x = -3y + 7$.',
        solution: [
          '$2x = -3y + 7$ is $2x + 3y = 7$, with slope $-\\tfrac{2}{3}$.',
          'The perpendicular slope is the negative reciprocal: $\\tfrac{3}{2}$.',
          'Point-slope: $y - 1 = \\tfrac{3}{2}(x - 4)$. Multiply by $2$: $2y - 2 = 3x - 12$.',
          'Standard form: $3x - 2y = 10$. Check $(4, 1)$: $12 - 2 = 10$. ✓',
        ],
        solutionVn: [
          '$2x = -3y + 7$ tức là $2x + 3y = 7$, có hệ số góc $-\\tfrac{2}{3}$.',
          'Hệ số góc vuông góc là số nghịch đảo đổi dấu: $\\tfrac{3}{2}$.',
          'Điểm – hệ số góc: $y - 1 = \\tfrac{3}{2}(x - 4)$. Nhân với $2$: $2y - 2 = 3x - 12$.',
          'Dạng tổng quát: $3x - 2y = 10$. Kiểm tra $(4, 1)$: $12 - 2 = 10$. ✓',
        ],
        answer: '$3x - 2y = 10$', answerVn: '$3x - 2y = 10$',
        accept: ['3x-2y=10', '3x - 2y = 10'],
      },
      {
        id: 'p6',
        prompt: 'Find the standard form of the line through $(8, -3)$ that is parallel to $3y = 4x + 8$.',
        promptVn: 'Tìm dạng tổng quát của đường thẳng qua $(8, -3)$ song song với $3y = 4x + 8$.',
        solution: [
          '$3y = 4x + 8$ is $4x - 3y = -8$ in standard form.',
          'A parallel line keeps $A$ and $B$: $4x - 3y = k$.',
          'Put $(8, -3)$ in: $k = 32 + 9 = 41$. The line is $4x - 3y = 41$.',
        ],
        solutionVn: [
          '$3y = 4x + 8$ ở dạng tổng quát là $4x - 3y = -8$.',
          'Đường thẳng song song giữ nguyên $A$ và $B$: $4x - 3y = k$.',
          'Thay $(8, -3)$: $k = 32 + 9 = 41$. Đường thẳng là $4x - 3y = 41$.',
        ],
        answer: '$4x - 3y = 41$', answerVn: '$4x - 3y = 41$',
        accept: ['4x-3y=41', '4x - 3y = 41'],
      },
      {
        id: 'p7',
        prompt: 'A teacher curves grades with $t = As + B$. An old $100$ stays $100$; an old $62$ becomes $81$. What does an old $74$ become?',
        promptVn: 'Một giáo viên điều chỉnh điểm theo $t = As + B$. Điểm cũ $100$ giữ nguyên $100$; điểm cũ $62$ thành $81$. Điểm cũ $74$ sẽ thành bao nhiêu?',
        solution: [
          'The pairs $(100, 100)$ and $(62, 81)$ are points on the line. Slope: $\\dfrac{81 - 100}{62 - 100} = \\dfrac{1}{2}$.',
          'Point-slope: $t - 100 = \\tfrac{1}{2}(s - 100)$, so $t = \\tfrac{1}{2}s + 50$.',
          'For $s = 74$: $t = 37 + 50 = 87$.',
        ],
        solutionVn: [
          'Các cặp $(100, 100)$ và $(62, 81)$ là các điểm trên đường thẳng. Hệ số góc: $\\dfrac{81 - 100}{62 - 100} = \\dfrac{1}{2}$.',
          'Điểm – hệ số góc: $t - 100 = \\tfrac{1}{2}(s - 100)$, nên $t = \\tfrac{1}{2}s + 50$.',
          'Với $s = 74$: $t = 37 + 50 = 87$.',
        ],
        answer: '$87$', answerVn: '$87$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'A line with slope $3$ and a line with slope $5$ cross at $(10, 15)$. How far apart are their $x$-intercepts?',
        promptVn: 'Một đường thẳng có hệ số góc $3$ và một đường có hệ số góc $5$ cắt nhau tại $(10, 15)$. Hai giao điểm với trục $x$ của chúng cách nhau bao xa?',
        solution: [
          'From $(10, 15)$ each line goes down $15$ to reach the $x$-axis.',
          'Slope $3$: down $15$ is left $5$, so its $x$-intercept is $(5, 0)$. Slope $5$: down $15$ is left $3$, so $(7, 0)$.',
          'They are $7 - 5 = 2$ apart.',
        ],
        solutionVn: [
          'Từ $(10, 15)$ mỗi đường đi xuống $15$ để tới trục $x$.',
          'Hệ số góc $3$: xuống $15$ là sang trái $5$, nên giao điểm với trục $x$ là $(5, 0)$. Hệ số góc $5$: xuống $15$ là sang trái $3$, nên là $(7, 0)$.',
          'Chúng cách nhau $7 - 5 = 2$.',
        ],
        answer: '$2$', answerVn: '$2$',
      },
      {
        id: 'c2',
        prompt: 'Find $A$ if the graph of $Ax + 3y = 5$ is parallel to the graph of $5x - 2y = 4$.',
        promptVn: 'Tìm $A$ nếu đồ thị của $Ax + 3y = 5$ song song với đồ thị của $5x - 2y = 4$.',
        solution: [
          'The slope of $5x - 2y = 4$ is $-\\dfrac{5}{-2} = \\dfrac{5}{2}$.',
          'The slope of $Ax + 3y = 5$ is $-\\dfrac{A}{3}$.',
          'Parallel means equal slopes: $-\\dfrac{A}{3} = \\dfrac{5}{2}$, so $A = -\\dfrac{15}{2}$.',
        ],
        solutionVn: [
          'Hệ số góc của $5x - 2y = 4$ là $-\\dfrac{5}{-2} = \\dfrac{5}{2}$.',
          'Hệ số góc của $Ax + 3y = 5$ là $-\\dfrac{A}{3}$.',
          'Song song nghĩa là hệ số góc bằng nhau: $-\\dfrac{A}{3} = \\dfrac{5}{2}$, nên $A = -\\dfrac{15}{2}$.',
        ],
        answer: '$-\\dfrac{15}{2}$', answerVn: '$-\\dfrac{15}{2}$',
      },
      {
        id: 'c3',
        prompt: 'Find $B$ if the graph of $3x = By + 2$ is perpendicular to the graph of $3y = -2x + 4$.',
        promptVn: 'Tìm $B$ nếu đồ thị của $3x = By + 2$ vuông góc với đồ thị của $3y = -2x + 4$.',
        solution: [
          '$3y = -2x + 4$ gives $y = -\\tfrac{2}{3}x + \\tfrac{4}{3}$: slope $-\\tfrac{2}{3}$.',
          '$3x = By + 2$ gives $y = \\tfrac{3}{B}x - \\tfrac{2}{B}$: slope $\\tfrac{3}{B}$.',
          'Perpendicular: $\\tfrac{3}{B} \\times \\left(-\\tfrac{2}{3}\\right) = -1$, so $-\\tfrac{2}{B} = -1$ and $B = 2$.',
        ],
        solutionVn: [
          '$3y = -2x + 4$ cho $y = -\\tfrac{2}{3}x + \\tfrac{4}{3}$: hệ số góc $-\\tfrac{2}{3}$.',
          '$3x = By + 2$ cho $y = \\tfrac{3}{B}x - \\tfrac{2}{B}$: hệ số góc $\\tfrac{3}{B}$.',
          'Vuông góc: $\\tfrac{3}{B} \\times \\left(-\\tfrac{2}{3}\\right) = -1$, nên $-\\tfrac{2}{B} = -1$ và $B = 2$.',
        ],
        answer: '$2$', answerVn: '$2$',
      },
      {
        id: 'c4',
        prompt: 'Two lines with nonzero slopes have the same $y$-intercept, and their slopes add up to $0$. What is the sum of the $x$-coordinates of their $x$-intercepts?',
        promptVn: 'Hai đường thẳng có hệ số góc khác $0$, có cùng giao điểm với trục $y$, và tổng hai hệ số góc bằng $0$. Tổng hoành độ các giao điểm với trục $x$ của chúng là bao nhiêu?',
        solution: [
          'Call the lines $y = mx + b$ and $y = -mx + b$ (slopes adding to $0$, same intercept $b$).',
          'Their $x$-intercepts are at $x = -\\tfrac{b}{m}$ and $x = \\tfrac{b}{m}$.',
          'These add to $0$ — the two lines are mirror images in the $y$-axis.',
        ],
        solutionVn: [
          'Gọi hai đường thẳng là $y = mx + b$ và $y = -mx + b$ (tổng hệ số góc bằng $0$, cùng tung độ gốc $b$).',
          'Giao điểm với trục $x$ của chúng ở $x = -\\tfrac{b}{m}$ và $x = \\tfrac{b}{m}$.',
          'Tổng bằng $0$ — hai đường thẳng đối xứng nhau qua trục $y$.',
        ],
        answer: '$0$', answerVn: '$0$',
      },
      {
        id: 'c5',
        prompt: 'Mary codes each letter by its place in the alphabet ($A = 1$, $B = 2$, …), multiplies by her favourite number and adds her mother\'s favourite number. $F$ becomes $65$ and $T$ becomes $177$. What does $M$ become?',
        promptVn: 'Mary mã hóa mỗi chữ cái theo thứ tự của nó trong bảng chữ cái ($A = 1$, $B = 2$, …), nhân với số yêu thích của bạn ấy rồi cộng thêm số yêu thích của mẹ. $F$ thành $65$ và $T$ thành $177$. $M$ sẽ thành bao nhiêu?',
        solution: [
          'The code is a line: code $= k \\times (\\text{position}) + c$. $F$ is $6$th and $T$ is $20$th, so $(6, 65)$ and $(20, 177)$ are on it.',
          'Slope: $\\dfrac{177 - 65}{20 - 6} = \\dfrac{112}{14} = 8$ — her favourite number.',
          '$M$ is $13$th, $7$ places after $F$: $65 + 7 \\times 8 = 121$.',
        ],
        solutionVn: [
          'Mã là một đường thẳng: mã $= k \\times (\\text{thứ tự}) + c$. $F$ đứng thứ $6$ và $T$ đứng thứ $20$, nên $(6, 65)$ và $(20, 177)$ nằm trên nó.',
          'Hệ số góc: $\\dfrac{177 - 65}{20 - 6} = \\dfrac{112}{14} = 8$ — số yêu thích của Mary.',
          '$M$ đứng thứ $13$, sau $F$ $7$ vị trí: $65 + 7 \\times 8 = 121$.',
        ],
        answer: '$121$', answerVn: '$121$',
      },
    ],
  },
];
