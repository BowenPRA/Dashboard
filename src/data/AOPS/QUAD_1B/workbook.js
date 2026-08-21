// src/data/AOPS/QUAD_1B/workbook.js
// Reveal-solution practice for Zeros and the Factored Form — the whole Drill.
//
// Focus reads zeros off brackets, Practice goes both ways (zeros from an
// equation, equation from zeros, vertex from zeros), and Challenge asks the
// questions that need two ideas at once — the touching case, the no-zero case,
// and a word problem where the zero is the thing being asked for.
//
// Thirteen questions again, and none of them is a repeat of a QUAD_1A question
// with new numbers. Every answer is a number, a coordinate or a short equation,
// so `accept` can mark it.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        prompt: 'Find the zeros of $y = (x - 2)(x - 6)$.',
        promptVn: 'Tìm các nghiệm của $y = (x - 2)(x - 6)$.',
        solution: [
          'A zero is an $x$ that makes $y = 0$, so set the product to zero: $(x - 2)(x - 6) = 0$.',
          'A product is zero only if a bracket is zero, so take them one at a time.',
          '$x - 2 = 0$ gives $x = 2$, and $x - 6 = 0$ gives $x = 6$.',
        ],
        solutionVn: [
          'Nghiệm là giá trị $x$ làm $y = 0$, nên cho tích bằng không: $(x - 2)(x - 6) = 0$.',
          'Tích bằng không chỉ khi có một ngoặc bằng không, nên xét từng ngoặc.',
          '$x - 2 = 0$ cho $x = 2$, và $x - 6 = 0$ cho $x = 6$.',
        ],
        answer: '$x = 2$ and $x = 6$', answerVn: '$x = 2$ và $x = 6$',
        accept: ['2 and 6', '2, 6', '2 6', 'x=2, x=6', '6 and 2', '2;6'],
      },
      {
        id: 'f2',
        prompt: 'Find the zeros of $y = (x + 3)(x - 5)$.',
        promptVn: 'Tìm các nghiệm của $y = (x + 3)(x - 5)$.',
        solution: [
          'Solve each bracket: $x + 3 = 0$ and $x - 5 = 0$.',
          'That gives $x = -3$ and $x = 5$. The signs come out opposite to the ones you can see.',
        ],
        solutionVn: [
          'Giải từng ngoặc: $x + 3 = 0$ và $x - 5 = 0$.',
          'Được $x = -3$ và $x = 5$. Dấu ra ngược với dấu em nhìn thấy.',
        ],
        answer: '$x = -3$ and $x = 5$', answerVn: '$x = -3$ và $x = 5$',
        accept: ['-3 and 5', '-3, 5', '-3 5', '5 and -3', 'x=-3, x=5'],
      },
      {
        id: 'f3',
        prompt: 'How many zeros does $y = (x - 4)^2$ have?',
        promptVn: '$y = (x - 4)^2$ có bao nhiêu nghiệm?',
        solution: [
          'The vertex is at $(4, 0)$, which is ON the x-axis, so the curve touches without crossing.',
          'Both brackets are the same, so both zeros are at the same place: $x = 4$.',
          'That counts as ONE zero — the two have met.',
        ],
        solutionVn: [
          'Đỉnh nằm tại $(4, 0)$, tức là NGAY TRÊN trục x, nên đường cong chạm mà không cắt qua.',
          'Hai ngoặc giống hệt nhau, nên hai nghiệm ở cùng một chỗ: $x = 4$.',
          'Trường hợp đó tính là MỘT nghiệm — hai nghiệm đã gặp nhau.',
        ],
        answer: 'One, at $x = 4$', answerVn: 'Một, tại $x = 4$',
        accept: ['1', 'one', 'one, x=4', '1 zero', 'x=4'],
      },
      {
        id: 'f4',
        prompt: 'Solve $(x - 1)(x + 7) = 0$.',
        promptVn: 'Giải $(x - 1)(x + 7) = 0$.',
        solution: [
          'The zero product rule: at least one bracket must be zero.',
          '$x - 1 = 0$ gives $x = 1$; $x + 7 = 0$ gives $x = -7$.',
        ],
        solutionVn: [
          'Quy tắc tích bằng không: ít nhất một ngoặc phải bằng không.',
          '$x - 1 = 0$ cho $x = 1$; $x + 7 = 0$ cho $x = -7$.',
        ],
        answer: '$x = 1$ or $x = -7$', answerVn: '$x = 1$ hoặc $x = -7$',
        accept: ['1 and -7', '1, -7', '1 or -7', '-7 and 1', '1 -7'],
      },
      {
        id: 'f5',
        prompt: 'A parabola has zeros at $x = 1$ and $x = 9$. Where is its axis of symmetry?',
        promptVn: 'Một parabol có nghiệm tại $x = 1$ và $x = 9$. Trục đối xứng của nó ở đâu?',
        solution: [
          'The two zeros are the same distance from the axis of symmetry, so the axis is exactly halfway between them.',
          'Halfway is the average: $(1 + 9) \\div 2 = 5$.',
          'The axis of symmetry is the line $x = 5$.',
        ],
        solutionVn: [
          'Hai nghiệm cách trục đối xứng cùng một khoảng, nên trục nằm đúng chính giữa hai nghiệm.',
          'Chính giữa là trung bình cộng: $(1 + 9) \\div 2 = 5$.',
          'Trục đối xứng là đường thẳng $x = 5$.',
        ],
        answer: '$x = 5$', answerVn: '$x = 5$',
        accept: ['5', 'x=5', 'x = 5'],
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        prompt: 'Write an equation for a parabola with zeros at $x = -2$ and $x = 4$.',
        promptVn: 'Viết phương trình của một parabol có nghiệm tại $x = -2$ và $x = 4$.',
        solution: [
          'Work backwards from the brackets. A zero at $-2$ needs a bracket that is zero when $x = -2$, which is $(x + 2)$.',
          'A zero at $4$ needs $(x - 4)$.',
          'Multiply them: $y = (x + 2)(x - 4)$. Any non-zero $a$ in front also works — it changes the width, not the zeros.',
        ],
        solutionVn: [
          'Làm ngược từ các ngoặc. Nghiệm tại $-2$ cần một ngoặc bằng không khi $x = -2$, đó là $(x + 2)$.',
          'Nghiệm tại $4$ cần $(x - 4)$.',
          'Nhân chúng lại: $y = (x + 2)(x - 4)$. Thêm hệ số $a$ khác không phía trước cũng được — nó đổi độ rộng, không đổi nghiệm.',
        ],
        answer: '$y = (x + 2)(x - 4)$', answerVn: '$y = (x + 2)(x - 4)$',
        accept: ['y=(x+2)(x-4)', '(x+2)(x-4)', 'y = (x+2)(x-4)', '(x-4)(x+2)'],
      },
      {
        id: 'p2',
        prompt: 'Find the vertex of $y = (x - 2)(x - 8)$.',
        promptVn: 'Tìm đỉnh của $y = (x - 2)(x - 8)$.',
        solution: [
          'The zeros are $2$ and $8$, so the axis of symmetry is halfway between: $(2 + 8) \\div 2 = 5$.',
          'Substitute $x = 5$ back into the equation: $y = (5 - 2)(5 - 8) = 3 \\times (-3) = -9$.',
          'The vertex is $(5, -9)$.',
        ],
        solutionVn: [
          'Các nghiệm là $2$ và $8$, nên trục đối xứng nằm chính giữa: $(2 + 8) \\div 2 = 5$.',
          'Thế $x = 5$ trở lại phương trình: $y = (5 - 2)(5 - 8) = 3 \\times (-3) = -9$.',
          'Đỉnh là $(5, -9)$.',
        ],
        answer: '$(5, -9)$', answerVn: '$(5, -9)$',
        accept: ['(5,-9)', '(5, -9)', '5,-9', '5, -9'],
      },
      {
        id: 'p3',
        prompt: 'Find the zeros of $y = (x - 3)^2 - 4$.',
        promptVn: 'Tìm các nghiệm của $y = (x - 3)^2 - 4$.',
        solution: [
          'Set $y = 0$: $(x - 3)^2 - 4 = 0$, so $(x - 3)^2 = 4$.',
          'Square-root both sides, and remember there are TWO roots: $x - 3 = 2$ or $x - 3 = -2$.',
          'So $x = 5$ or $x = 1$. Check: they are the same distance either side of the vertex at $x = 3$.',
        ],
        solutionVn: [
          'Cho $y = 0$: $(x - 3)^2 - 4 = 0$, nên $(x - 3)^2 = 4$.',
          'Lấy căn hai vế, và nhớ rằng có HAI nghiệm: $x - 3 = 2$ hoặc $x - 3 = -2$.',
          'Vậy $x = 5$ hoặc $x = 1$. Kiểm tra: chúng cách đều hai bên đỉnh tại $x = 3$.',
        ],
        answer: '$x = 1$ and $x = 5$', answerVn: '$x = 1$ và $x = 5$',
        accept: ['1 and 5', '1, 5', '5 and 1', '1 5', 'x=1, x=5'],
      },
      {
        id: 'p4',
        prompt: 'Does $y = x^2 + 3$ cross the x-axis? Answer yes or no, and say how you know.',
        promptVn: '$y = x^2 + 3$ có cắt trục x không? Trả lời có hoặc không, và nói vì sao em biết.',
        solution: [
          'The vertex is $(0, 3)$ — above the axis — and the curve opens upwards.',
          'In algebra: $x^2$ is never negative, so $x^2 + 3$ is never less than 3, and it can never equal 0.',
          'So no, it has no zeros. The whole curve stays above the axis.',
        ],
        solutionVn: [
          'Đỉnh là $(0, 3)$ — nằm phía trên trục — và đường cong mở lên trên.',
          'Bằng đại số: $x^2$ không bao giờ âm, nên $x^2 + 3$ không bao giờ nhỏ hơn 3, và không thể bằng 0.',
          'Vậy là không, nó không có nghiệm. Cả đường cong nằm trên trục x.',
        ],
        answer: 'No — its smallest $y$ is $3$', answerVn: 'Không — giá trị $y$ nhỏ nhất của nó là $3$',
        accept: ['no', 'No', 'no zeros', 'it does not'],
      },
      {
        id: 'p5',
        prompt: 'Expand $(x + 1)(x - 3)$.',
        promptVn: 'Khai triển $(x + 1)(x - 3)$.',
        solution: [
          'Multiply each term in the first bracket by each term in the second: $x^2 - 3x + x - 3$.',
          'Collect the middle terms: $x^2 - 2x - 3$.',
          'Notice what expanding costs you: the zeros $-1$ and $3$ were visible before and are hidden now.',
        ],
        solutionVn: [
          'Nhân từng hạng tử của ngoặc thứ nhất với từng hạng tử của ngoặc thứ hai: $x^2 - 3x + x - 3$.',
          'Gộp hai hạng tử giữa: $x^2 - 2x - 3$.',
          'Để ý cái giá của việc khai triển: các nghiệm $-1$ và $3$ trước đó nhìn thấy được, giờ đã bị giấu đi.',
        ],
        answer: '$x^2 - 2x - 3$', answerVn: '$x^2 - 2x - 3$',
        accept: ['x^2-2x-3', 'x^2 - 2x - 3', 'x2-2x-3'],
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'A parabola touches the x-axis exactly once, at $x = -5$. Write a possible equation for it.',
        promptVn: 'Một parabol chạm trục x đúng một lần, tại $x = -5$. Viết một phương trình có thể của nó.',
        solution: [
          'Touching once means the two zeros have met, so both brackets are the same.',
          'A zero at $-5$ needs the bracket $(x + 5)$, twice: $y = (x + 5)(x + 5)$.',
          'That is $y = (x + 5)^2$ — vertex form with $k = 0$, which is exactly what "vertex sitting on the axis" means.',
        ],
        solutionVn: [
          'Chạm một lần nghĩa là hai nghiệm đã gặp nhau, nên hai ngoặc giống hệt nhau.',
          'Nghiệm tại $-5$ cần ngoặc $(x + 5)$, lấy hai lần: $y = (x + 5)(x + 5)$.',
          'Đó chính là $y = (x + 5)^2$ — dạng đỉnh với $k = 0$, đúng nghĩa "đỉnh nằm ngay trên trục".',
        ],
        answer: '$y = (x + 5)^2$', answerVn: '$y = (x + 5)^2$',
        accept: ['y=(x+5)^2', '(x+5)^2', 'y = (x+5)^2', '(x+5)(x+5)'],
      },
      {
        id: 'c2',
        prompt: 'A ball is thrown and its height is $h = -(t - 3)^2 + 9$, where $t$ is the time in seconds. At what time does it hit the ground?',
        promptVn: 'Một quả bóng được ném lên và chiều cao của nó là $h = -(t - 3)^2 + 9$, với $t$ là thời gian tính bằng giây. Nó chạm đất vào lúc nào?',
        solution: [
          'Hitting the ground means the height is zero, so this is a zeros question: solve $-(t - 3)^2 + 9 = 0$.',
          'Rearrange: $(t - 3)^2 = 9$, so $t - 3 = 3$ or $t - 3 = -3$, giving $t = 6$ or $t = 0$.',
          '$t = 0$ is the moment it was thrown, so the landing is at $t = 6$ seconds. Both roots are real answers here — one is just the start.',
        ],
        solutionVn: [
          'Chạm đất nghĩa là chiều cao bằng không, nên đây là bài toán tìm nghiệm: giải $-(t - 3)^2 + 9 = 0$.',
          'Biến đổi: $(t - 3)^2 = 9$, nên $t - 3 = 3$ hoặc $t - 3 = -3$, cho $t = 6$ hoặc $t = 0$.',
          '$t = 0$ là lúc ném bóng, nên bóng chạm đất tại $t = 6$ giây. Cả hai nghiệm đều có ý nghĩa — một cái chính là lúc bắt đầu.',
        ],
        answer: '$t = 6$ seconds', answerVn: '$t = 6$ giây',
        accept: ['6', 't=6', 't = 6', '6 seconds', '6s'],
      },
      {
        id: 'c3',
        prompt: 'A parabola has zeros at $x = -1$ and $x = 3$, and passes through $(1, -8)$. Find $a$ in $y = a(x + 1)(x - 3)$.',
        promptVn: 'Một parabol có nghiệm tại $x = -1$ và $x = 3$, và đi qua điểm $(1, -8)$. Tìm $a$ trong $y = a(x + 1)(x - 3)$.',
        solution: [
          'Substitute the point: $x = 1$ and $y = -8$.',
          '$-8 = a(1 + 1)(1 - 3) = a \\times 2 \\times (-2) = -4a$.',
          'Divide both sides by $-4$: $a = 2$. So the curve is $y = 2(x + 1)(x - 3)$ — the same zeros as before, twice as narrow.',
        ],
        solutionVn: [
          'Thế điểm đã cho: $x = 1$ và $y = -8$.',
          '$-8 = a(1 + 1)(1 - 3) = a \\times 2 \\times (-2) = -4a$.',
          'Chia hai vế cho $-4$: $a = 2$. Vậy đường cong là $y = 2(x + 1)(x - 3)$ — vẫn nghiệm đó, nhưng hẹp gấp đôi.',
        ],
        answer: '$a = 2$', answerVn: '$a = 2$',
        accept: ['2', 'a=2', 'a = 2'],
      },
    ],
  },
];
