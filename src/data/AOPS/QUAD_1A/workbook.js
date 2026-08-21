// src/data/AOPS/QUAD_1A/workbook.js
// Reveal-solution practice for Parabolas and the Vertex Form — the whole Drill.
// See docs/workbook-tasks.md.
//
// Focus builds the two readings (vertex out of a bracket, and what a does),
// Practice applies them in both directions, Challenge asks for the equation
// rather than the answer. Thirteen questions, not thirty: every one of them
// asks something the next one does not.
//
// Every answer is a coordinate, a number or a short equation — never prose —
// so `accept` can do the marking. Coordinates are accepted with or without
// spaces and brackets, because a student typing (3,-2) has not made a mistake.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        prompt: 'Work out $y$ when $x = -4$ for $y = x^2$.',
        promptVn: 'Tính $y$ khi $x = -4$ với $y = x^2$.',
        solution: [
          'Squaring means multiplying the number by itself.',
          '$(-4)^2 = (-4) \\times (-4) = 16$. Two negatives multiply to a positive.',
        ],
        solutionVn: [
          'Bình phương nghĩa là nhân số đó với chính nó.',
          '$(-4)^2 = (-4) \\times (-4) = 16$. Hai số âm nhân nhau ra số dương.',
        ],
        answer: '$16$', answerVn: '$16$',
        accept: ['16', 'y=16', 'y = 16'],
      },
      {
        id: 'f2',
        prompt: 'Where is the vertex of $y = x^2 + 7$?',
        promptVn: 'Đỉnh của $y = x^2 + 7$ nằm ở đâu?',
        solution: [
          'Adding 7 lifts every point 7 higher, and changes nothing else.',
          'So the vertex moves from $(0, 0)$ up to $(0, 7)$.',
        ],
        solutionVn: [
          'Cộng 7 nâng mọi điểm lên 7 đơn vị, và không đổi gì khác.',
          'Vậy đỉnh dịch từ $(0, 0)$ lên $(0, 7)$.',
        ],
        answer: '$(0, 7)$', answerVn: '$(0, 7)$',
        accept: ['(0,7)', '(0, 7)', '0,7', '0, 7'],
      },
      {
        id: 'f3',
        prompt: 'Where is the vertex of $y = (x - 6)^2$?',
        promptVn: 'Đỉnh của $y = (x - 6)^2$ nằm ở đâu?',
        solution: [
          'Ask which $x$ makes the bracket zero: solve $x - 6 = 0$.',
          'That gives $x = 6$, and there the whole square is $0$, so $y = 0$.',
          'The vertex is $(6, 0)$ — six to the RIGHT, even though the sign is minus.',
        ],
        solutionVn: [
          'Hỏi xem $x$ bằng bao nhiêu thì trong ngoặc bằng không: giải $x - 6 = 0$.',
          'Được $x = 6$, và ở đó cả bình phương bằng $0$, nên $y = 0$.',
          'Đỉnh là $(6, 0)$ — sang PHẢI sáu đơn vị, dù dấu là trừ.',
        ],
        answer: '$(6, 0)$', answerVn: '$(6, 0)$',
        accept: ['(6,0)', '(6, 0)', '6,0', '6, 0'],
      },
      {
        id: 'f4',
        prompt: 'Where is the vertex of $y = (x + 4)^2$?',
        promptVn: 'Đỉnh của $y = (x + 4)^2$ nằm ở đâu?',
        solution: [
          'Solve $x + 4 = 0$, which gives $x = -4$.',
          'A plus in the bracket sends the curve LEFT. The vertex is $(-4, 0)$.',
        ],
        solutionVn: [
          'Giải $x + 4 = 0$, được $x = -4$.',
          'Dấu cộng trong ngoặc đưa đường cong sang TRÁI. Đỉnh là $(-4, 0)$.',
        ],
        answer: '$(-4, 0)$', answerVn: '$(-4, 0)$',
        accept: ['(-4,0)', '(-4, 0)', '-4,0', '-4, 0'],
      },
      {
        id: 'f5',
        prompt: 'Which opens **downwards**: $y = 5x^2$ or $y = -5x^2$?',
        promptVn: 'Đồ thị nào **quay xuống dưới**: $y = 5x^2$ hay $y = -5x^2$?',
        solution: [
          'A negative $a$ multiplies every $y$ by a negative, so every output flips sign.',
          '$y = -5x^2$ opens downwards, and its vertex is a MAXIMUM rather than a minimum.',
        ],
        solutionVn: [
          '$a$ âm nhân mọi $y$ với một số âm, nên mọi kết quả đổi dấu.',
          '$y = -5x^2$ quay xuống dưới, và đỉnh của nó là GIÁ TRỊ LỚN NHẤT chứ không phải nhỏ nhất.',
        ],
        answer: '$y = -5x^2$', answerVn: '$y = -5x^2$',
        accept: ['y=-5x^2', 'y = -5x^2', '-5x^2', '-5x2', 'y=-5x2'],
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        prompt: 'Give the vertex of $y = (x - 2)^2 + 3$.',
        promptVn: 'Cho biết đỉnh của $y = (x - 2)^2 + 3$.',
        solution: [
          'Compare with $y = a(x - h)^2 + k$: here $h = 2$ and $k = 3$.',
          'The vertex is $(h, k) = (2, 3)$. No working needed once it is in this form.',
        ],
        solutionVn: [
          'So với $y = a(x - h)^2 + k$: ở đây $h = 2$ và $k = 3$.',
          'Đỉnh là $(h, k) = (2, 3)$. Khi đã ở dạng này thì không cần tính gì thêm.',
        ],
        answer: '$(2, 3)$', answerVn: '$(2, 3)$',
        accept: ['(2,3)', '(2, 3)', '2,3', '2, 3'],
      },
      {
        id: 'p2',
        prompt: 'Give the vertex of $y = -3(x + 1)^2 - 6$.',
        promptVn: 'Cho biết đỉnh của $y = -3(x + 1)^2 - 6$.',
        solution: [
          'The bracket is zero when $x + 1 = 0$, so $x = -1$.',
          'The number on the end is $k = -6$. The vertex is $(-1, -6)$.',
          'The $-3$ only makes it narrow and turns it upside down; it never moves the vertex.',
        ],
        solutionVn: [
          'Trong ngoặc bằng không khi $x + 1 = 0$, nên $x = -1$.',
          'Số ở cuối là $k = -6$. Đỉnh là $(-1, -6)$.',
          'Số $-3$ chỉ làm đồ thị hẹp lại và quay ngược xuống; nó không dịch chuyển đỉnh.',
        ],
        answer: '$(-1, -6)$', answerVn: '$(-1, -6)$',
        accept: ['(-1,-6)', '(-1, -6)', '-1,-6', '-1, -6'],
      },
      {
        id: 'p3',
        prompt: 'A parabola has vertex $(4, 0)$ and the same width and direction as $y = x^2$. Write its equation.',
        promptVn: 'Một parabol có đỉnh $(4, 0)$, cùng độ rộng và cùng chiều với $y = x^2$. Viết phương trình của nó.',
        solution: [
          'Same width and direction means $a = 1$. The vertex gives $h = 4$ and $k = 0$.',
          'Substitute into $y = a(x - h)^2 + k$: $y = (x - 4)^2$.',
          'Check: at $x = 4$ the bracket is zero, so $y = 0$ — the vertex is where it should be.',
        ],
        solutionVn: [
          'Cùng độ rộng và cùng chiều nghĩa là $a = 1$. Đỉnh cho $h = 4$ và $k = 0$.',
          'Thay vào $y = a(x - h)^2 + k$: $y = (x - 4)^2$.',
          'Kiểm tra: tại $x = 4$ trong ngoặc bằng không nên $y = 0$ — đỉnh đúng chỗ.',
        ],
        answer: '$y = (x - 4)^2$', answerVn: '$y = (x - 4)^2$',
        accept: ['y=(x-4)^2', 'y = (x-4)^2', '(x-4)^2', 'y=(x-4)2'],
      },
      {
        id: 'p4',
        prompt: 'Expand $(x - 3)^2$.',
        promptVn: 'Khai triển $(x - 3)^2$.',
        solution: [
          '$(x - 3)^2$ means $(x - 3)(x - 3)$.',
          'Multiply every term by every term: $x^2 - 3x - 3x + 9$.',
          'Collect the middle: $x^2 - 6x + 9$.',
        ],
        solutionVn: [
          '$(x - 3)^2$ nghĩa là $(x - 3)(x - 3)$.',
          'Nhân từng hạng tử với từng hạng tử: $x^2 - 3x - 3x + 9$.',
          'Gộp hai hạng tử giữa: $x^2 - 6x + 9$.',
        ],
        answer: '$x^2 - 6x + 9$', answerVn: '$x^2 - 6x + 9$',
        accept: ['x^2-6x+9', 'x^2 - 6x + 9', 'x2-6x+9'],
      },
      {
        id: 'p5',
        prompt: 'Using your answer above, give the vertex of $y = x^2 - 6x + 9$.',
        promptVn: 'Dùng đáp án ở trên, cho biết đỉnh của $y = x^2 - 6x + 9$.',
        solution: [
          '$x^2 - 6x + 9$ is the same expression as $(x - 3)^2$, just written the other way.',
          'The bracket is zero at $x = 3$, and there $y = 0$.',
          'So the vertex is $(3, 0)$ — visible in one form, hidden in the other.',
        ],
        solutionVn: [
          '$x^2 - 6x + 9$ chính là $(x - 3)^2$, chỉ viết theo cách khác.',
          'Trong ngoặc bằng không tại $x = 3$, và ở đó $y = 0$.',
          'Vậy đỉnh là $(3, 0)$ — nhìn thấy được ở dạng này, bị giấu ở dạng kia.',
        ],
        answer: '$(3, 0)$', answerVn: '$(3, 0)$',
        accept: ['(3,0)', '(3, 0)', '3,0', '3, 0'],
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'Write the equation of a parabola with vertex $(2, -5)$ that opens **downwards**.',
        promptVn: 'Viết phương trình của một parabol có đỉnh $(2, -5)$ và **quay xuống dưới**.',
        solution: [
          'The vertex gives $h = 2$ and $k = -5$, so the equation starts $y = a(x - 2)^2 - 5$.',
          'Opening downwards only requires $a$ to be negative — any negative value works.',
          'The simplest is $y = -(x - 2)^2 - 5$.',
        ],
        solutionVn: [
          'Đỉnh cho $h = 2$ và $k = -5$, nên phương trình bắt đầu là $y = a(x - 2)^2 - 5$.',
          'Quay xuống dưới chỉ cần $a$ âm — bất kỳ giá trị âm nào cũng được.',
          'Đơn giản nhất là $y = -(x - 2)^2 - 5$.',
        ],
        answer: '$y = -(x - 2)^2 - 5$', answerVn: '$y = -(x - 2)^2 - 5$',
        accept: ['y=-(x-2)^2-5', 'y = -(x-2)^2 - 5', '-(x-2)^2-5'],
      },
      {
        id: 'c2',
        prompt: 'The parabola $y = a(x - 1)^2$ passes through the point $(3, 12)$. Find $a$.',
        promptVn: 'Parabol $y = a(x - 1)^2$ đi qua điểm $(3, 12)$. Tìm $a$.',
        solution: [
          'Put the point into the equation: $x = 3$ and $y = 12$.',
          '$12 = a(3 - 1)^2 = a \\times 4$.',
          'Divide both sides by 4: $a = 3$. So the curve is $y = 3(x - 1)^2$, three times narrower than $y = x^2$.',
        ],
        solutionVn: [
          'Thay điểm vào phương trình: $x = 3$ và $y = 12$.',
          '$12 = a(3 - 1)^2 = a \\times 4$.',
          'Chia hai vế cho 4: $a = 3$. Vậy đường cong là $y = 3(x - 1)^2$, hẹp gấp ba lần $y = x^2$.',
        ],
        answer: '$a = 3$', answerVn: '$a = 3$',
        accept: ['3', 'a=3', 'a = 3'],
      },
      {
        id: 'c3',
        prompt: 'The vertex of $y = (x - 1)^2 + 6$ is $(1, 6)$. What is the **smallest** value $y$ can ever take?',
        promptVn: 'Đỉnh của $y = (x - 1)^2 + 6$ là $(1, 6)$. Giá trị **nhỏ nhất** mà $y$ có thể nhận là bao nhiêu?',
        solution: [
          'The square $(x - 1)^2$ is never negative — the smallest it can be is $0$.',
          'That happens at $x = 1$, and then $y = 0 + 6 = 6$.',
          'So $y$ is never less than $6$: the curve sits entirely above the x-axis and never crosses it.',
        ],
        solutionVn: [
          'Bình phương $(x - 1)^2$ không bao giờ âm — nhỏ nhất nó chỉ có thể bằng $0$.',
          'Điều đó xảy ra tại $x = 1$, khi đó $y = 0 + 6 = 6$.',
          'Vậy $y$ không bao giờ nhỏ hơn $6$: đường cong nằm hoàn toàn phía trên trục x và không bao giờ cắt trục đó.',
        ],
        answer: '$6$', answerVn: '$6$',
        accept: ['6', 'y=6', 'y = 6'],
      },
    ],
  },
];
