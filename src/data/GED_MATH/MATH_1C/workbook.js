// src/data/GED_MATH/MATH_1C/workbook.js
// Reveal-solution practice for Equations with Fractions.
// See docs/workbook-tasks.md for the schema.
//
// The written half of the unit's drill. BALANCE makes the student perform each
// legal move; this makes them write the working down and commit to an answer.
// Every solution states the LCD explicitly, because "which number?" is the step
// they get stuck on rather than the arithmetic.

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "In the fraction $\\frac{3x-4}{5}$, what is the **numerator**?",
        promptVn: "Trong phân số $\\frac{3x-4}{5}$, **tử số** là gì?",
        solution: [
          "The numerator is everything written above the bar.",
          "Here that is the whole expression $3x - 4$, not just the $3x$.",
        ],
        solutionVn: [
          "Tử số là mọi thứ được viết phía trên gạch phân số.",
          "Ở đây đó là toàn bộ biểu thức $3x - 4$, không chỉ riêng $3x$.",
        ],
        answer: "$3x - 4$", answerVn: "$3x - 4$",
        accept: ["3x-4", "3x - 4"],
      },
      {
        id: "f2",
        prompt: "Solve for $x$: $\\frac{x}{6} = 4$.",
        promptVn: "Giải tìm $x$: $\\frac{x}{6} = 4$.",
        solution: [
          "$x$ is being divided by $6$, so multiply both sides by $6$.",
          "$x = 24$. Check: $24 \\div 6 = 4$. ✓",
        ],
        solutionVn: [
          "$x$ đang bị chia cho $6$, nên hãy nhân cả hai vế cho $6$.",
          "$x = 24$. Thử lại: $24 \\div 6 = 4$. ✓",
        ],
        answer: "$x = 24$", answerVn: "$x = 24$",
      },
      {
        id: "f3",
        prompt: "What is the lowest common denominator of $\\frac{1}{4}$ and $\\frac{1}{6}$?",
        promptVn: "Mẫu số chung nhỏ nhất của $\\frac{1}{4}$ và $\\frac{1}{6}$ là bao nhiêu?",
        solution: [
          "Count in fours: $4, 8, 12$. Count in sixes: $6, 12$.",
          "The first number in both lists is $12$.",
        ],
        solutionVn: [
          "Đếm theo bốn: $4, 8, 12$. Đếm theo sáu: $6, 12$.",
          "Số đầu tiên có trong cả hai danh sách là $12$.",
        ],
        answer: "$12$", answerVn: "$12$",
      },
      {
        id: "f4",
        prompt: "Multiply both sides of $\\frac{x}{3} + 2 = 9$ by $3$. Write the equation you get.",
        promptVn: "Nhân cả hai vế của $\\frac{x}{3} + 2 = 9$ cho $3$. Hãy viết phương trình thu được.",
        solution: [
          "Every term gets multiplied, not only the fraction.",
          "$\\frac{x}{3} \\times 3 = x$, $2 \\times 3 = 6$, and $9 \\times 3 = 27$.",
          "So the equation becomes $x + 6 = 27$.",
        ],
        solutionVn: [
          "Mọi số hạng đều được nhân, không chỉ riêng phân số.",
          "$\\frac{x}{3} \\times 3 = x$, $2 \\times 3 = 6$, và $9 \\times 3 = 27$.",
          "Vậy phương trình trở thành $x + 6 = 27$.",
        ],
        answer: "$x + 6 = 27$", answerVn: "$x + 6 = 27$",
        accept: ["x+6=27"],
      },
      {
        id: "f5",
        prompt: "Solve for $x$: $\\frac{x}{4} + 5 = 11$.",
        promptVn: "Giải tìm $x$: $\\frac{x}{4} + 5 = 11$.",
        solution: [
          "Multiply all three terms by $4$: $x + 20 = 44$.",
          "Subtract $20$ from both sides: $x = 24$.",
          "Check: $\\frac{24}{4} + 5 = 6 + 5 = 11$. ✓",
        ],
        solutionVn: [
          "Nhân cả ba số hạng cho $4$: $x + 20 = 44$.",
          "Trừ $20$ ở cả hai vế: $x = 24$.",
          "Thử lại: $\\frac{24}{4} + 5 = 6 + 5 = 11$. ✓",
        ],
        answer: "$x = 24$", answerVn: "$x = 24$",
      },
      {
        id: "f6",
        prompt: "Solve for $x$: $\\frac{x+4}{3} = 5$.",
        promptVn: "Giải tìm $x$: $\\frac{x+4}{3} = 5$.",
        solution: [
          "The bar divides the whole numerator, so multiply both sides by $3$.",
          "$x + 4 = 15$.",
          "Subtract $4$: $x = 11$. Check: $\\frac{11+4}{3} = \\frac{15}{3} = 5$. ✓",
        ],
        solutionVn: [
          "Gạch phân số chia cả tử số, nên hãy nhân cả hai vế cho $3$.",
          "$x + 4 = 15$.",
          "Trừ $4$: $x = 11$. Thử lại: $\\frac{11+4}{3} = \\frac{15}{3} = 5$. ✓",
        ],
        answer: "$x = 11$", answerVn: "$x = 11$",
      },
      {
        id: "f7",
        prompt: "Expand: $4(x - 3)$.",
        promptVn: "Khai triển: $4(x - 3)$.",
        solution: [
          "The $4$ multiplies both terms inside the bracket.",
          "$4 \\times x = 4x$ and $4 \\times (-3) = -12$.",
          "So $4(x-3) = 4x - 12$.",
        ],
        solutionVn: [
          "Số $4$ nhân với cả hai số hạng bên trong ngoặc.",
          "$4 \\times x = 4x$ và $4 \\times (-3) = -12$.",
          "Vậy $4(x-3) = 4x - 12$.",
        ],
        answer: "$4x - 12$", answerVn: "$4x - 12$",
        accept: ["4x-12"],
      },
      {
        id: "f8",
        prompt: "Solve for $x$: $\\frac{2x-5}{3} = 3$.",
        promptVn: "Giải tìm $x$: $\\frac{2x-5}{3} = 3$.",
        solution: [
          "Multiply both sides by $3$: $2x - 5 = 9$.",
          "Add $5$ to both sides: $2x = 14$.",
          "Divide by $2$: $x = 7$. Check: $\\frac{2(7)-5}{3} = \\frac{9}{3} = 3$. ✓",
        ],
        solutionVn: [
          "Nhân cả hai vế cho $3$: $2x - 5 = 9$.",
          "Cộng $5$ vào cả hai vế: $2x = 14$.",
          "Chia cho $2$: $x = 7$. Thử lại: $\\frac{2(7)-5}{3} = \\frac{9}{3} = 3$. ✓",
        ],
        answer: "$x = 7$", answerVn: "$x = 7$",
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "What is the smallest number you can multiply both sides of $\\frac{x}{2} = \\frac{x+3}{5}$ by to remove both fractions?",
        promptVn: "Số nhỏ nhất mà bạn có thể nhân cả hai vế của $\\frac{x}{2} = \\frac{x+3}{5}$ để khử cả hai phân số là bao nhiêu?",
        solution: [
          "The denominators are $2$ and $5$.",
          "Count in twos: $2, 4, 6, 8, 10$. Count in fives: $5, 10$.",
          "The lowest common denominator is $10$.",
        ],
        solutionVn: [
          "Các mẫu số là $2$ và $5$.",
          "Đếm theo hai: $2, 4, 6, 8, 10$. Đếm theo năm: $5, 10$.",
          "Mẫu số chung nhỏ nhất là $10$.",
        ],
        answer: "$10$", answerVn: "$10$",
      },
      {
        id: "p2",
        prompt: "Solve for $x$: $\\frac{3x+1}{5} = 2$.",
        promptVn: "Giải tìm $x$: $\\frac{3x+1}{5} = 2$.",
        solution: [
          "Multiply both sides by $5$: $3x + 1 = 10$.",
          "Subtract $1$: $3x = 9$.",
          "Divide by $3$: $x = 3$. Check: $\\frac{3(3)+1}{5} = \\frac{10}{5} = 2$. ✓",
        ],
        solutionVn: [
          "Nhân cả hai vế cho $5$: $3x + 1 = 10$.",
          "Trừ $1$: $3x = 9$.",
          "Chia cho $3$: $x = 3$. Thử lại: $\\frac{3(3)+1}{5} = \\frac{10}{5} = 2$. ✓",
        ],
        answer: "$x = 3$", answerVn: "$x = 3$",
      },
      {
        id: "p3",
        prompt: "Solve for $x$: $\\frac{x+1}{2} = \\frac{x+4}{3}$.",
        promptVn: "Giải tìm $x$: $\\frac{x+1}{2} = \\frac{x+4}{3}$.",
        solution: [
          "The LCD of $2$ and $3$ is $6$. Multiply both sides by $6$, keeping brackets.",
          "$3(x+1) = 2(x+4)$.",
          "Expand: $3x + 3 = 2x + 8$.",
          "Subtract $2x$, then subtract $3$: $x = 5$. Check: $\\frac{6}{2} = 3$ and $\\frac{9}{3} = 3$. ✓",
        ],
        solutionVn: [
          "LCD của $2$ và $3$ là $6$. Nhân cả hai vế cho $6$, nhớ giữ dấu ngoặc.",
          "$3(x+1) = 2(x+4)$.",
          "Khai triển: $3x + 3 = 2x + 8$.",
          "Trừ $2x$, rồi trừ $3$: $x = 5$. Thử lại: $\\frac{6}{2} = 3$ và $\\frac{9}{3} = 3$. ✓",
        ],
        answer: "$x = 5$", answerVn: "$x = 5$",
      },
      {
        id: "p4",
        prompt: "Solve for $x$: $\\frac{3x-1}{4} = \\frac{x+5}{2}$.",
        promptVn: "Giải tìm $x$: $\\frac{3x-1}{4} = \\frac{x+5}{2}$.",
        solution: [
          "$2$ divides into $4$, so the LCD is just $4$.",
          "Multiply both sides by $4$: $3x - 1 = 2(x+5)$.",
          "Expand: $3x - 1 = 2x + 10$.",
          "Subtract $2x$, then add $1$: $x = 11$. Check: $\\frac{32}{4} = 8$ and $\\frac{16}{2} = 8$. ✓",
        ],
        solutionVn: [
          "$2$ chia hết vào $4$, nên LCD chỉ là $4$.",
          "Nhân cả hai vế cho $4$: $3x - 1 = 2(x+5)$.",
          "Khai triển: $3x - 1 = 2x + 10$.",
          "Trừ $2x$, rồi cộng $1$: $x = 11$. Thử lại: $\\frac{32}{4} = 8$ và $\\frac{16}{2} = 8$. ✓",
        ],
        answer: "$x = 11$", answerVn: "$x = 11$",
      },
      {
        id: "p5",
        prompt: "Solve for $x$: $\\frac{x-3}{2} = \\frac{2x+1}{3}$.",
        promptVn: "Giải tìm $x$: $\\frac{x-3}{2} = \\frac{2x+1}{3}$.",
        solution: [
          "The LCD of $2$ and $3$ is $6$. Multiply both sides by $6$.",
          "$3(x-3) = 2(2x+1)$.",
          "Expand: $3x - 9 = 4x + 2$.",
          "Subtract $3x$: $-9 = x + 2$. Subtract $2$: $x = -11$.",
          "Check: $\\frac{-14}{2} = -7$ and $\\frac{-21}{3} = -7$. ✓",
        ],
        solutionVn: [
          "LCD của $2$ và $3$ là $6$. Nhân cả hai vế cho $6$.",
          "$3(x-3) = 2(2x+1)$.",
          "Khai triển: $3x - 9 = 4x + 2$.",
          "Trừ $3x$: $-9 = x + 2$. Trừ $2$: $x = -11$.",
          "Thử lại: $\\frac{-14}{2} = -7$ và $\\frac{-21}{3} = -7$. ✓",
        ],
        answer: "$x = -11$", answerVn: "$x = -11$",
      },
      {
        id: "p6",
        prompt: "Solve for $x$: $\\frac{x}{2} + 3 = \\frac{x}{5} + 6$.",
        promptVn: "Giải tìm $x$: $\\frac{x}{2} + 3 = \\frac{x}{5} + 6$.",
        solution: [
          "The LCD of $2$ and $5$ is $10$. Multiply every term on both sides by $10$.",
          "$5x + 30 = 2x + 60$.",
          "Subtract $2x$: $3x + 30 = 60$. Subtract $30$: $3x = 30$.",
          "Divide by $3$: $x = 10$. Check: $5 + 3 = 8$ and $2 + 6 = 8$. ✓",
        ],
        solutionVn: [
          "LCD của $2$ và $5$ là $10$. Nhân mọi số hạng ở cả hai vế cho $10$.",
          "$5x + 30 = 2x + 60$.",
          "Trừ $2x$: $3x + 30 = 60$. Trừ $30$: $3x = 30$.",
          "Chia cho $3$: $x = 10$. Thử lại: $5 + 3 = 8$ và $2 + 6 = 8$. ✓",
        ],
        answer: "$x = 10$", answerVn: "$x = 10$",
      },
      {
        id: "p7",
        prompt: "Linh multiplied both sides of $\\frac{x+6}{4} = \\frac{x-2}{2}$ by $4$ and wrote $x + 6 = 2x - 2$. Solve it correctly and state the right answer.",
        promptVn: "Linh nhân cả hai vế của $\\frac{x+6}{4} = \\frac{x-2}{2}$ cho $4$ và viết $x + 6 = 2x - 2$. Hãy giải lại cho đúng và nêu đáp án đúng.",
        solution: [
          "Multiplying the right side by $4$ gives $2(x-2)$, and the bracket must be expanded properly.",
          "$2(x-2) = 2x - 4$, not $2x - 2$. Linh multiplied the $x$ but not the $-2$.",
          "The correct line is $x + 6 = 2x - 4$.",
          "Subtract $x$: $6 = x - 4$. Add $4$: $x = 10$.",
          "Check: $\\frac{16}{4} = 4$ and $\\frac{8}{2} = 4$. ✓",
        ],
        solutionVn: [
          "Nhân vế phải cho $4$ được $2(x-2)$, và phải khai triển dấu ngoặc cho đúng.",
          "$2(x-2) = 2x - 4$, không phải $2x - 2$. Linh đã nhân với $x$ nhưng bỏ sót $-2$.",
          "Dòng đúng phải là $x + 6 = 2x - 4$.",
          "Trừ $x$: $6 = x - 4$. Cộng $4$: $x = 10$.",
          "Thử lại: $\\frac{16}{4} = 4$ và $\\frac{8}{2} = 4$. ✓",
        ],
        answer: "$x = 10$", answerVn: "$x = 10$",
      },
      {
        id: "p8",
        prompt: "Solve for $x$: $\\frac{2x+5}{6} = \\frac{x-1}{2}$.",
        promptVn: "Giải tìm $x$: $\\frac{2x+5}{6} = \\frac{x-1}{2}$.",
        solution: [
          "$2$ divides into $6$, so the LCD is $6$.",
          "Multiply both sides by $6$: $2x + 5 = 3(x-1)$.",
          "Expand: $2x + 5 = 3x - 3$.",
          "Subtract $2x$, then add $3$: $x = 8$. Check: $\\frac{21}{6} = 3.5$ and $\\frac{7}{2} = 3.5$. ✓",
        ],
        solutionVn: [
          "$2$ chia hết vào $6$, nên LCD là $6$.",
          "Nhân cả hai vế cho $6$: $2x + 5 = 3(x-1)$.",
          "Khai triển: $2x + 5 = 3x - 3$.",
          "Trừ $2x$, rồi cộng $3$: $x = 8$. Thử lại: $\\frac{21}{6} = 3,5$ và $\\frac{7}{2} = 3,5$. ✓",
        ],
        answer: "$x = 8$", answerVn: "$x = 8$",
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "Solve for $x$: $\\frac{2x+3}{5} = \\frac{x+4}{3}$.",
        promptVn: "Giải tìm $x$: $\\frac{2x+3}{5} = \\frac{x+4}{3}$.",
        solution: [
          "The LCD of $5$ and $3$ is $15$.",
          "Multiply both sides by $15$: $3(2x+3) = 5(x+4)$.",
          "Expand: $6x + 9 = 5x + 20$.",
          "Subtract $5x$, then subtract $9$: $x = 11$.",
          "Check: $\\frac{25}{5} = 5$ and $\\frac{15}{3} = 5$. ✓",
        ],
        solutionVn: [
          "LCD của $5$ và $3$ là $15$.",
          "Nhân cả hai vế cho $15$: $3(2x+3) = 5(x+4)$.",
          "Khai triển: $6x + 9 = 5x + 20$.",
          "Trừ $5x$, rồi trừ $9$: $x = 11$.",
          "Thử lại: $\\frac{25}{5} = 5$ và $\\frac{15}{3} = 5$. ✓",
        ],
        answer: "$x = 11$", answerVn: "$x = 11$",
      },
      {
        id: "c2",
        prompt: "Solve for $x$: $\\frac{x-9}{2} = \\frac{4x-3}{5}$.",
        promptVn: "Giải tìm $x$: $\\frac{x-9}{2} = \\frac{4x-3}{5}$.",
        solution: [
          "The LCD of $2$ and $5$ is $10$.",
          "Multiply both sides by $10$: $5(x-9) = 2(4x-3)$.",
          "Expand: $5x - 45 = 8x - 6$.",
          "Subtract $5x$: $-45 = 3x - 6$. Add $6$: $-39 = 3x$.",
          "Divide by $3$: $x = -13$. Check: $\\frac{-22}{2} = -11$ and $\\frac{-55}{5} = -11$. ✓",
        ],
        solutionVn: [
          "LCD của $2$ và $5$ là $10$.",
          "Nhân cả hai vế cho $10$: $5(x-9) = 2(4x-3)$.",
          "Khai triển: $5x - 45 = 8x - 6$.",
          "Trừ $5x$: $-45 = 3x - 6$. Cộng $6$: $-39 = 3x$.",
          "Chia cho $3$: $x = -13$. Thử lại: $\\frac{-22}{2} = -11$ và $\\frac{-55}{5} = -11$. ✓",
        ],
        answer: "$x = -13$", answerVn: "$x = -13$",
      },
      {
        id: "c3",
        prompt: "A restaurant bill of $\\$x$ is split between $3$ friends. The next night the bill is $\\$20$ more and is split between $5$ friends, and each person pays the same as the night before. Write an equation and find $x$.",
        promptVn: "Hóa đơn nhà hàng $\\$x$ được chia cho $3$ người bạn. Tối hôm sau hóa đơn nhiều hơn $\\$20$ và được chia cho $5$ người, mỗi người trả đúng bằng tối hôm trước. Hãy viết phương trình và tìm $x$.",
        solution: [
          "Night one, each pays $\\frac{x}{3}$. Night two, each pays $\\frac{x+20}{5}$.",
          "They are equal, so $\\frac{x}{3} = \\frac{x+20}{5}$.",
          "The LCD of $3$ and $5$ is $15$. Multiply both sides: $5x = 3(x+20)$.",
          "Expand: $5x = 3x + 60$. Subtract $3x$: $2x = 60$, so $x = 30$.",
          "Check: $\\frac{30}{3} = 10$ and $\\frac{50}{5} = 10$. Each person paid $\\$10$. ✓",
        ],
        solutionVn: [
          "Tối một, mỗi người trả $\\frac{x}{3}$. Tối hai, mỗi người trả $\\frac{x+20}{5}$.",
          "Chúng bằng nhau, nên $\\frac{x}{3} = \\frac{x+20}{5}$.",
          "LCD của $3$ và $5$ là $15$. Nhân cả hai vế: $5x = 3(x+20)$.",
          "Khai triển: $5x = 3x + 60$. Trừ $3x$: $2x = 60$, vậy $x = 30$.",
          "Thử lại: $\\frac{30}{3} = 10$ và $\\frac{50}{5} = 10$. Mỗi người trả $\\$10$. ✓",
        ],
        answer: "$x = 30$", answerVn: "$x = 30$",
      },
      {
        id: "c4",
        prompt: "Solve for $h$: $\\frac{h+7}{4} = \\frac{3h-1}{8}$.",
        promptVn: "Giải tìm $h$: $\\frac{h+7}{4} = \\frac{3h-1}{8}$.",
        solution: [
          "$4$ divides into $8$, so the LCD is $8$, not $32$.",
          "Multiply both sides by $8$: $2(h+7) = 3h - 1$.",
          "Expand: $2h + 14 = 3h - 1$.",
          "Subtract $2h$, then add $1$: $h = 15$.",
          "Check: $\\frac{22}{4} = 5.5$ and $\\frac{44}{8} = 5.5$. ✓",
        ],
        solutionVn: [
          "$4$ chia hết vào $8$, nên LCD là $8$, không phải $32$.",
          "Nhân cả hai vế cho $8$: $2(h+7) = 3h - 1$.",
          "Khai triển: $2h + 14 = 3h - 1$.",
          "Trừ $2h$, rồi cộng $1$: $h = 15$.",
          "Thử lại: $\\frac{22}{4} = 5,5$ và $\\frac{44}{8} = 5,5$. ✓",
        ],
        answer: "$h = 15$", answerVn: "$h = 15$",
      },
    ],
  },
];
