// src/data/GED_MATH/MATH_1A/workbook.js
// Reveal-solution practice for Algebraic Expressions & Equations.
// See docs/workbook-tasks.md for the schema.
//
// This is the drill for the whole unit — 40 XP, and the only place maths is
// practised at length. Every question is answered with a number or a short
// expression: no prose, because maths is the least English-dependent test and
// should not be taxed with sentence-writing.

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "Is $7x - 4$ an **expression** or an **equation**?",
        promptVn: "$7x - 4$ là **biểu thức** hay **phương trình**?",
        solution: [
          "An equation has an equals sign. An expression does not.",
          "There is no $=$ here, so it is an expression.",
        ],
        solutionVn: [
          "Phương trình có dấu bằng. Biểu thức thì không.",
          "Ở đây không có dấu $=$, nên đây là biểu thức.",
        ],
        answer: "Expression", answerVn: "Biểu thức",
        accept: ["an expression", "biểu thức"],
      },
      {
        id: "f2",
        prompt: "In the term $9y$, what is the **coefficient**?",
        promptVn: "Trong hạng tử $9y$, **hệ số** là gì?",
        solution: [
          "The coefficient is the number multiplying the variable.",
          "In $9y$, that number is $9$.",
        ],
        solutionVn: [
          "Hệ số là số nhân với biến.",
          "Trong $9y$, số đó là $9$.",
        ],
        answer: "$9$", answerVn: "$9$",
      },
      {
        id: "f3",
        prompt: "Simplify by combining like terms: $6x + 3x$.",
        promptVn: "Rút gọn bằng cách gộp hạng tử đồng dạng: $6x + 3x$.",
        solution: [
          "Both terms have the same variable $x$, so they are like terms.",
          "Add the coefficients: $6 + 3 = 9$, giving $9x$.",
        ],
        solutionVn: [
          "Cả hai hạng tử đều có biến $x$, nên chúng đồng dạng.",
          "Cộng các hệ số: $6 + 3 = 9$, được $9x$.",
        ],
        answer: "$9x$", answerVn: "$9x$",
      },
      {
        id: "f4",
        prompt: "Simplify: $8a + 5 - 3a$.",
        promptVn: "Rút gọn: $8a + 5 - 3a$.",
        solution: [
          "Only $8a$ and $-3a$ are like terms; $5$ has no variable.",
          "$8a - 3a = 5a$, so the answer is $5a + 5$.",
        ],
        solutionVn: [
          "Chỉ $8a$ và $-3a$ là đồng dạng; $5$ không có biến.",
          "$8a - 3a = 5a$, nên kết quả là $5a + 5$.",
        ],
        answer: "$5a + 5$", answerVn: "$5a + 5$",
        accept: ["5+5a", "5a+5"],
      },
      {
        id: "f5",
        prompt: "Evaluate $3x + 4$ when $x = 5$.",
        promptVn: "Tính giá trị của $3x + 4$ khi $x = 5$.",
        solution: [
          "Substitute $5$ in place of $x$: $3(5) + 4$.",
          "Multiply first: $3 \\times 5 = 15$.",
          "Then add: $15 + 4 = 19$.",
        ],
        solutionVn: [
          "Thay $5$ vào chỗ của $x$: $3(5) + 4$.",
          "Nhân trước: $3 \\times 5 = 15$.",
          "Rồi cộng: $15 + 4 = 19$.",
        ],
        answer: "$19$", answerVn: "$19$",
      },
      {
        id: "f6",
        prompt: "Evaluate $2a - b$ when $a = 7$ and $b = 6$.",
        promptVn: "Tính giá trị của $2a - b$ khi $a = 7$ và $b = 6$.",
        solution: [
          "Substitute both values: $2(7) - 6$.",
          "$2 \\times 7 = 14$, then $14 - 6 = 8$.",
        ],
        solutionVn: [
          "Thay cả hai giá trị: $2(7) - 6$.",
          "$2 \\times 7 = 14$, rồi $14 - 6 = 8$.",
        ],
        answer: "$8$", answerVn: "$8$",
      },
      {
        id: "f7",
        prompt: "Solve for $x$: $x + 9 = 15$.",
        promptVn: "Giải tìm $x$: $x + 9 = 15$.",
        solution: [
          "The inverse of adding $9$ is subtracting $9$.",
          "Do it to **both** sides: $x = 15 - 9$.",
          "$x = 6$. Check: $6 + 9 = 15$. ✓",
        ],
        solutionVn: [
          "Phép ngược của cộng $9$ là trừ $9$.",
          "Làm với **cả hai** vế: $x = 15 - 9$.",
          "$x = 6$. Thử lại: $6 + 9 = 15$. ✓",
        ],
        answer: "$x = 6$", answerVn: "$x = 6$",
      },
      {
        id: "f8",
        prompt: "Solve for $x$: $4x = 32$.",
        promptVn: "Giải tìm $x$: $4x = 32$.",
        solution: [
          "$4x$ means $4$ times $x$, so the inverse is dividing by $4$.",
          "$x = 32 \\div 4 = 8$. Check: $4 \\times 8 = 32$. ✓",
        ],
        solutionVn: [
          "$4x$ nghĩa là $4$ nhân $x$, nên phép ngược là chia cho $4$.",
          "$x = 32 \\div 4 = 8$. Thử lại: $4 \\times 8 = 32$. ✓",
        ],
        answer: "$x = 8$", answerVn: "$x = 8$",
      },
      {
        id: "f9",
        prompt: "Write an expression for: **7 more than a number $n$**.",
        promptVn: "Viết biểu thức cho: **hơn một số $n$ là 7 đơn vị**.",
        solution: [
          "\"More than\" means addition.",
          "7 more than $n$ is $n + 7$.",
        ],
        solutionVn: [
          "\"Hơn\" nghĩa là phép cộng.",
          "Hơn $n$ là 7 đơn vị thì viết là $n + 7$.",
        ],
        answer: "$n + 7$", answerVn: "$n + 7$",
        accept: ["7+n"],
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "Expand using the distributive property: $3(x + 5)$.",
        promptVn: "Khai triển bằng tính chất phân phối: $3(x + 5)$.",
        solution: [
          "Multiply the outside number by **each** term inside.",
          "$3 \\times x = 3x$ and $3 \\times 5 = 15$.",
          "So $3(x + 5) = 3x + 15$.",
        ],
        solutionVn: [
          "Nhân số bên ngoài với **từng** hạng tử bên trong.",
          "$3 \\times x = 3x$ và $3 \\times 5 = 15$.",
          "Vậy $3(x + 5) = 3x + 15$.",
        ],
        answer: "$3x + 15$", answerVn: "$3x + 15$",
      },
      {
        id: "p2",
        prompt: "Expand: $-4(2x - 5)$.",
        promptVn: "Khai triển: $-4(2x - 5)$.",
        solution: [
          "$-4 \\times 2x = -8x$.",
          "$-4 \\times -5 = +20$, because a negative times a negative is positive.",
          "So the answer is $-8x + 20$.",
        ],
        solutionVn: [
          "$-4 \\times 2x = -8x$.",
          "$-4 \\times -5 = +20$, vì âm nhân âm ra dương.",
          "Vậy kết quả là $-8x + 20$.",
        ],
        answer: "$-8x + 20$", answerVn: "$-8x + 20$",
        accept: ["20-8x"],
      },
      {
        id: "p3",
        prompt: "Solve for $x$: $3x - 12 = 24$.",
        promptVn: "Giải tìm $x$: $3x - 12 = 24$.",
        solution: [
          "Undo the subtraction first: add $12$ to both sides, giving $3x = 36$.",
          "Then undo the multiplication: divide both sides by $3$.",
          "$x = 12$. Check: $3(12) - 12 = 24$. ✓",
        ],
        solutionVn: [
          "Bỏ phép trừ trước: cộng $12$ vào cả hai vế, được $3x = 36$.",
          "Rồi bỏ phép nhân: chia cả hai vế cho $3$.",
          "$x = 12$. Thử lại: $3(12) - 12 = 24$. ✓",
        ],
        answer: "$x = 12$", answerVn: "$x = 12$",
      },
      {
        id: "p4",
        prompt: "Solve for $x$: $\\dfrac{x}{5} + 2 = 9$.",
        promptVn: "Giải tìm $x$: $\\dfrac{x}{5} + 2 = 9$.",
        solution: [
          "Subtract $2$ from both sides: $\\dfrac{x}{5} = 7$.",
          "The inverse of dividing by $5$ is multiplying by $5$.",
          "$x = 35$. Check: $35 \\div 5 + 2 = 9$. ✓",
        ],
        solutionVn: [
          "Trừ $2$ ở cả hai vế: $\\dfrac{x}{5} = 7$.",
          "Phép ngược của chia $5$ là nhân $5$.",
          "$x = 35$. Thử lại: $35 \\div 5 + 2 = 9$. ✓",
        ],
        answer: "$x = 35$", answerVn: "$x = 35$",
      },
      {
        id: "p5",
        prompt: "Evaluate $4x^2 - 3y$ when $x = 3$ and $y = 5$.",
        promptVn: "Tính giá trị của $4x^2 - 3y$ khi $x = 3$ và $y = 5$.",
        solution: [
          "Exponents come before multiplying: $3^2 = 9$.",
          "$4 \\times 9 = 36$ and $3 \\times 5 = 15$.",
          "$36 - 15 = 21$.",
        ],
        solutionVn: [
          "Luỹ thừa làm trước phép nhân: $3^2 = 9$.",
          "$4 \\times 9 = 36$ và $3 \\times 5 = 15$.",
          "$36 - 15 = 21$.",
        ],
        answer: "$21$", answerVn: "$21$",
      },
      {
        id: "p6",
        prompt: "Simplify fully: $5(x + 2) - 3x$.",
        promptVn: "Rút gọn hoàn toàn: $5(x + 2) - 3x$.",
        solution: [
          "Distribute first: $5(x + 2) = 5x + 10$.",
          "Now combine like terms: $5x - 3x = 2x$.",
          "The answer is $2x + 10$.",
        ],
        solutionVn: [
          "Khai triển trước: $5(x + 2) = 5x + 10$.",
          "Rồi gộp hạng tử đồng dạng: $5x - 3x = 2x$.",
          "Kết quả là $2x + 10$.",
        ],
        answer: "$2x + 10$", answerVn: "$2x + 10$",
        accept: ["10+2x"],
      },
      {
        id: "p7",
        prompt: "A plumber charges a 50 dollar flat fee plus 25 dollars per hour. Write an equation for a total bill of 150 dollars, using $h$ for hours.",
        promptVn: "Một thợ sửa ống nước tính phí cố định 50 đô la cộng 25 đô la mỗi giờ. Viết phương trình cho hoá đơn 150 đô la, dùng $h$ cho số giờ.",
        solution: [
          "The flat fee is charged once: $50$.",
          "The hourly charge depends on the hours: $25h$.",
          "Together they equal the bill: $50 + 25h = 150$.",
        ],
        solutionVn: [
          "Phí cố định tính một lần: $50$.",
          "Phí theo giờ phụ thuộc số giờ: $25h$.",
          "Cộng lại bằng hoá đơn: $50 + 25h = 150$.",
        ],
        answer: "$50 + 25h = 150$", answerVn: "$50 + 25h = 150$",
        accept: ["25h+50=150", "50+25h=150"],
      },
      {
        id: "p8",
        prompt: "Using the equation above, how many hours did the plumber work?",
        promptVn: "Dùng phương trình trên, thợ sửa ống nước đã làm bao nhiêu giờ?",
        solution: [
          "Subtract the flat fee from both sides: $25h = 100$.",
          "Divide both sides by $25$: $h = 4$.",
          "Check: $50 + 25(4) = 150$. ✓",
        ],
        solutionVn: [
          "Trừ phí cố định ở cả hai vế: $25h = 100$.",
          "Chia cả hai vế cho $25$: $h = 4$.",
          "Thử lại: $50 + 25(4) = 150$. ✓",
        ],
        answer: "$4$", answerVn: "$4$",
        accept: ["h=4", "4 hours", "4 giờ"],
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "Solve for $x$: $2(x + 3) = 4x - 8$.",
        promptVn: "Giải tìm $x$: $2(x + 3) = 4x - 8$.",
        solution: [
          "Distribute on the left: $2x + 6 = 4x - 8$.",
          "Get the variables on one side: subtract $2x$, giving $6 = 2x - 8$.",
          "Add $8$: $14 = 2x$, so $x = 7$. Check: $2(10) = 20$ and $4(7) - 8 = 20$. ✓",
        ],
        solutionVn: [
          "Khai triển vế trái: $2x + 6 = 4x - 8$.",
          "Đưa biến về một vế: trừ $2x$, được $6 = 2x - 8$.",
          "Cộng $8$: $14 = 2x$, nên $x = 7$. Thử lại: $2(10) = 20$ và $4(7) - 8 = 20$. ✓",
        ],
        answer: "$x = 7$", answerVn: "$x = 7$",
      },
      {
        id: "c2",
        prompt: "A rectangle has width $x$ and length $x + 4$. Its perimeter is $28$. Find $x$.",
        promptVn: "Một hình chữ nhật có chiều rộng $x$ và chiều dài $x + 4$. Chu vi là $28$. Tìm $x$.",
        solution: [
          "Perimeter is two widths plus two lengths: $2x + 2(x + 4) = 28$.",
          "Distribute and combine: $2x + 2x + 8 = 28$, so $4x + 8 = 28$.",
          "$4x = 20$, so $x = 5$. Check: widths $5 + 5$ and lengths $9 + 9$ give $28$. ✓",
        ],
        solutionVn: [
          "Chu vi bằng hai lần rộng cộng hai lần dài: $2x + 2(x + 4) = 28$.",
          "Khai triển và gộp: $2x + 2x + 8 = 28$, nên $4x + 8 = 28$.",
          "$4x = 20$, nên $x = 5$. Thử lại: $5 + 5$ và $9 + 9$ cho $28$. ✓",
        ],
        answer: "$x = 5$", answerVn: "$x = 5$",
      },
      {
        id: "c3",
        prompt: "Tickets cost 12 dollars each and a booking fee of 5 dollars is added once. Nina paid 65 dollars. How many tickets did she buy?",
        promptVn: "Mỗi vé giá 12 đô la và phí đặt chỗ 5 đô la tính một lần. Nina trả 65 đô la. Cô ấy mua bao nhiêu vé?",
        solution: [
          "Let $t$ be the number of tickets: $12t + 5 = 65$.",
          "Subtract the fee: $12t = 60$.",
          "Divide by $12$: $t = 5$. Check: $12(5) + 5 = 65$. ✓",
        ],
        solutionVn: [
          "Gọi $t$ là số vé: $12t + 5 = 65$.",
          "Trừ phí: $12t = 60$.",
          "Chia cho $12$: $t = 5$. Thử lại: $12(5) + 5 = 65$. ✓",
        ],
        answer: "$5$", answerVn: "$5$",
        accept: ["t=5", "5 tickets"],
      },
      {
        id: "c4",
        prompt: "Simplify fully: $-2(3x - 4) + 5(x - 1)$.",
        promptVn: "Rút gọn hoàn toàn: $-2(3x - 4) + 5(x - 1)$.",
        solution: [
          "First bracket: $-2 \\times 3x = -6x$ and $-2 \\times -4 = +8$.",
          "Second bracket: $5 \\times x = 5x$ and $5 \\times -1 = -5$.",
          "Combine: $-6x + 5x = -x$, and $8 - 5 = 3$, giving $-x + 3$.",
        ],
        solutionVn: [
          "Ngoặc thứ nhất: $-2 \\times 3x = -6x$ và $-2 \\times -4 = +8$.",
          "Ngoặc thứ hai: $5 \\times x = 5x$ và $5 \\times -1 = -5$.",
          "Gộp lại: $-6x + 5x = -x$, và $8 - 5 = 3$, được $-x + 3$.",
        ],
        answer: "$-x + 3$", answerVn: "$-x + 3$",
        accept: ["3-x"],
      },
    ],
  },
];
