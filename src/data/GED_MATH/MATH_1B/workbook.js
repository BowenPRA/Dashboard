// src/data/GED_MATH/MATH_1B/workbook.js
// Reveal-solution practice for Linear Equations & Inequalities.
// See docs/workbook-tasks.md for the schema.
//
// The unit's whole drill — 40 XP. Numeric and symbolic answers only; the
// reasoning lives in the revealed steps, not in anything the student types.

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "Solve for $x$: $x - 7 = 12$.",
        promptVn: "Giải tìm $x$: $x - 7 = 12$.",
        solution: [
          "The inverse of subtracting $7$ is adding $7$.",
          "Add $7$ to both sides: $x = 19$. Check: $19 - 7 = 12$. ✓",
        ],
        solutionVn: [
          "Phép ngược của trừ $7$ là cộng $7$.",
          "Cộng $7$ vào cả hai vế: $x = 19$. Thử lại: $19 - 7 = 12$. ✓",
        ],
        answer: "$x = 19$", answerVn: "$x = 19$",
      },
      {
        id: "f2",
        prompt: "Solve for $y$: $6y = -42$.",
        promptVn: "Giải tìm $y$: $6y = -42$.",
        solution: [
          "Divide both sides by $6$.",
          "$-42 \\div 6 = -7$, so $y = -7$. Check: $6 \\times -7 = -42$. ✓",
        ],
        solutionVn: [
          "Chia cả hai vế cho $6$.",
          "$-42 \\div 6 = -7$, nên $y = -7$. Thử lại: $6 \\times -7 = -42$. ✓",
        ],
        answer: "$y = -7$", answerVn: "$y = -7$",
      },
      {
        id: "f3",
        prompt: "Solve for $x$: $2x + 5 = 17$.",
        promptVn: "Giải tìm $x$: $2x + 5 = 17$.",
        solution: [
          "Undo the addition first: subtract $5$, giving $2x = 12$.",
          "Then divide by $2$: $x = 6$. Check: $2(6) + 5 = 17$. ✓",
        ],
        solutionVn: [
          "Bỏ phép cộng trước: trừ $5$, được $2x = 12$.",
          "Rồi chia cho $2$: $x = 6$. Thử lại: $2(6) + 5 = 17$. ✓",
        ],
        answer: "$x = 6$", answerVn: "$x = 6$",
      },
      {
        id: "f4",
        prompt: "Which symbol means **at least**? Write it.",
        promptVn: "Ký hiệu nào nghĩa là **ít nhất**? Hãy viết ra.",
        solution: [
          "\"At least\" allows the boundary value itself, so the line is included.",
          "That is greater than **or equal to**: $\\geq$.",
        ],
        solutionVn: [
          "\"Ít nhất\" cho phép lấy chính giá trị biên, nên biên được tính vào.",
          "Đó là lớn hơn **hoặc bằng**: $\\geq$.",
        ],
        answer: "$\\geq$", answerVn: "$\\geq$",
        accept: [">=", "≥", "\\ge"],
      },
      {
        id: "f5",
        prompt: "On a number line, does $x > 4$ use an **open** or a **closed** circle at 4?",
        promptVn: "Trên trục số, $x > 4$ dùng vòng tròn **rỗng** hay **đặc** tại 4?",
        solution: [
          "$>$ has no \"or equal to\" part, so $4$ itself is not a solution.",
          "A value that is excluded gets an open circle.",
        ],
        solutionVn: [
          "$>$ không có phần \"hoặc bằng\", nên chính $4$ không phải là nghiệm.",
          "Giá trị bị loại trừ thì dùng vòng tròn rỗng.",
        ],
        answer: "Open", answerVn: "Rỗng",
        accept: ["open circle", "rỗng", "vòng tròn rỗng"],
      },
      {
        id: "f6",
        prompt: "Solve: $x + 6 < 10$.",
        promptVn: "Giải: $x + 6 < 10$.",
        solution: [
          "Subtract $6$ from both sides, exactly as with an equation.",
          "The sign does not flip, because we did not multiply or divide by a negative.",
          "$x < 4$.",
        ],
        solutionVn: [
          "Trừ $6$ ở cả hai vế, giống hệt như với phương trình.",
          "Dấu không đảo, vì ta không nhân hay chia cho số âm.",
          "$x < 4$.",
        ],
        answer: "$x < 4$", answerVn: "$x < 4$",
      },
      {
        id: "f7",
        prompt: "Solve: $3x \\geq 15$.",
        promptVn: "Giải: $3x \\geq 15$.",
        solution: [
          "Divide both sides by $3$. It is positive, so the sign stays.",
          "$x \\geq 5$.",
        ],
        solutionVn: [
          "Chia cả hai vế cho $3$. Số dương nên dấu giữ nguyên.",
          "$x \\geq 5$.",
        ],
        answer: "$x \\geq 5$", answerVn: "$x \\geq 5$",
        accept: ["x>=5", "x≥5"],
      },
      {
        id: "f8",
        prompt: "Is $x = 3$ a solution of $4x - 2 = 10$?",
        promptVn: "$x = 3$ có phải là nghiệm của $4x - 2 = 10$ không?",
        solution: [
          "Substitute: $4(3) - 2 = 12 - 2 = 10$.",
          "Both sides equal $10$, so yes.",
        ],
        solutionVn: [
          "Thay vào: $4(3) - 2 = 12 - 2 = 10$.",
          "Hai vế đều bằng $10$, nên đúng.",
        ],
        answer: "Yes", answerVn: "Có",
        accept: ["y", "có"],
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "Solve: $-2x > 8$.",
        promptVn: "Giải: $-2x > 8$.",
        solution: [
          "Divide both sides by $-2$.",
          "Dividing by a **negative flips** the inequality sign.",
          "$x < -4$.",
        ],
        solutionVn: [
          "Chia cả hai vế cho $-2$.",
          "Chia cho số **âm thì đảo** dấu bất phương trình.",
          "$x < -4$.",
        ],
        answer: "$x < -4$", answerVn: "$x < -4$",
      },
      {
        id: "p2",
        prompt: "Solve: $\\dfrac{x}{-3} \\leq 2$.",
        promptVn: "Giải: $\\dfrac{x}{-3} \\leq 2$.",
        solution: [
          "Multiply both sides by $-3$.",
          "Multiplying by a negative flips the sign.",
          "$x \\geq -6$.",
        ],
        solutionVn: [
          "Nhân cả hai vế với $-3$.",
          "Nhân với số âm thì đảo dấu.",
          "$x \\geq -6$.",
        ],
        answer: "$x \\geq -6$", answerVn: "$x \\geq -6$",
        accept: ["x>=-6", "x≥-6"],
      },
      {
        id: "p3",
        prompt: "Solve for $x$: $5x - 3 = 2x + 12$.",
        promptVn: "Giải tìm $x$: $5x - 3 = 2x + 12$.",
        solution: [
          "Move the variables to one side: subtract $2x$, giving $3x - 3 = 12$.",
          "Add $3$: $3x = 15$.",
          "Divide by $3$: $x = 5$. Check: $22 = 22$. ✓",
        ],
        solutionVn: [
          "Đưa biến về một vế: trừ $2x$, được $3x - 3 = 12$.",
          "Cộng $3$: $3x = 15$.",
          "Chia cho $3$: $x = 5$. Thử lại: $22 = 22$. ✓",
        ],
        answer: "$x = 5$", answerVn: "$x = 5$",
      },
      {
        id: "p4",
        prompt: "Solve for $x$: $4(x - 2) = 20$.",
        promptVn: "Giải tìm $x$: $4(x - 2) = 20$.",
        solution: [
          "Divide both sides by $4$ first: $x - 2 = 5$.",
          "Add $2$: $x = 7$. Check: $4(5) = 20$. ✓",
        ],
        solutionVn: [
          "Chia cả hai vế cho $4$ trước: $x - 2 = 5$.",
          "Cộng $2$: $x = 7$. Thử lại: $4(5) = 20$. ✓",
        ],
        answer: "$x = 7$", answerVn: "$x = 7$",
      },
      {
        id: "p5",
        prompt: "Solve: $2x + 1 \\leq 9$.",
        promptVn: "Giải: $2x + 1 \\leq 9$.",
        solution: [
          "Subtract $1$: $2x \\leq 8$.",
          "Divide by $2$ (positive, so no flip): $x \\leq 4$.",
        ],
        solutionVn: [
          "Trừ $1$: $2x \\leq 8$.",
          "Chia cho $2$ (số dương nên không đảo dấu): $x \\leq 4$.",
        ],
        answer: "$x \\leq 4$", answerVn: "$x \\leq 4$",
        accept: ["x<=4", "x≤4"],
      },
      {
        id: "p6",
        prompt: "A lift holds **at most** 8 people. Write an inequality for the number of people $p$.",
        promptVn: "Thang máy chở **tối đa** 8 người. Viết bất phương trình cho số người $p$.",
        solution: [
          "\"At most\" means it can be 8, but no more.",
          "That is less than or equal to: $p \\leq 8$.",
        ],
        solutionVn: [
          "\"Tối đa\" nghĩa là có thể bằng 8, nhưng không hơn.",
          "Đó là nhỏ hơn hoặc bằng: $p \\leq 8$.",
        ],
        answer: "$p \\leq 8$", answerVn: "$p \\leq 8$",
        accept: ["p<=8", "p≤8"],
      },
      {
        id: "p7",
        prompt: "Solve the compound inequality: $-3 < x + 2 < 6$.",
        promptVn: "Giải bất phương trình kép: $-3 < x + 2 < 6$.",
        solution: [
          "Whatever you do, do it to **all three** parts.",
          "Subtract $2$ everywhere: $-5 < x < 4$.",
        ],
        solutionVn: [
          "Làm gì thì làm với **cả ba** phần.",
          "Trừ $2$ ở mọi phần: $-5 < x < 4$.",
        ],
        answer: "$-5 < x < 4$", answerVn: "$-5 < x < 4$",
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "Solve for $x$: $3(x + 2) - 4 = 2(x + 5)$.",
        promptVn: "Giải tìm $x$: $3(x + 2) - 4 = 2(x + 5)$.",
        solution: [
          "Expand both sides: $3x + 6 - 4 = 2x + 10$, so $3x + 2 = 2x + 10$.",
          "Subtract $2x$: $x + 2 = 10$.",
          "Subtract $2$: $x = 8$. Check: $3(10) - 4 = 26$ and $2(13) = 26$. ✓",
        ],
        solutionVn: [
          "Khai triển hai vế: $3x + 6 - 4 = 2x + 10$, nên $3x + 2 = 2x + 10$.",
          "Trừ $2x$: $x + 2 = 10$.",
          "Trừ $2$: $x = 8$. Thử lại: $3(10) - 4 = 26$ và $2(13) = 26$. ✓",
        ],
        answer: "$x = 8$", answerVn: "$x = 8$",
      },
      {
        id: "c2",
        prompt: "Solve: $7 - 2x \\geq 15$.",
        promptVn: "Giải: $7 - 2x \\geq 15$.",
        solution: [
          "Subtract $7$ from both sides: $-2x \\geq 8$.",
          "Divide by $-2$ and **flip** the sign.",
          "$x \\leq -4$. Check $x = -5$: $7 + 10 = 17 \\geq 15$. ✓",
        ],
        solutionVn: [
          "Trừ $7$ ở cả hai vế: $-2x \\geq 8$.",
          "Chia cho $-2$ và **đảo** dấu.",
          "$x \\leq -4$. Thử $x = -5$: $7 + 10 = 17 \\geq 15$. ✓",
        ],
        answer: "$x \\leq -4$", answerVn: "$x \\leq -4$",
        accept: ["x<=-4", "x≤-4"],
      },
      {
        id: "c3",
        prompt: "Mai has $60. She buys a bag for $18 and notebooks costing $6 each. What is the greatest number of notebooks $n$ she can buy?",
        promptVn: "Mai có 60 đô la. Cô mua một cái túi giá 18 đô la và các quyển vở giá 6 đô la mỗi quyển. Số vở $n$ nhiều nhất cô có thể mua là bao nhiêu?",
        solution: [
          "The total must be at most $60$: $18 + 6n \\leq 60$.",
          "Subtract $18$: $6n \\leq 42$, so $n \\leq 7$.",
          "$n$ must be a whole number, so the greatest is $7$.",
        ],
        solutionVn: [
          "Tổng tiền tối đa là $60$: $18 + 6n \\leq 60$.",
          "Trừ $18$: $6n \\leq 42$, nên $n \\leq 7$.",
          "$n$ phải là số nguyên, nên nhiều nhất là $7$.",
        ],
        answer: "$7$", answerVn: "$7$",
        accept: ["n=7", "7 notebooks"],
      },
      {
        id: "c4",
        prompt: "A taxi charges $4 plus $2 per mile. Nam has $30. Write and solve an inequality for the miles $m$ he can travel.",
        promptVn: "Taxi tính 4 đô la cộng 2 đô la mỗi dặm. Nam có 30 đô la. Viết và giải bất phương trình cho số dặm $m$ anh ấy đi được.",
        solution: [
          "The fare must not exceed what he has: $4 + 2m \\leq 30$.",
          "Subtract $4$: $2m \\leq 26$.",
          "Divide by $2$: $m \\leq 13$ miles.",
        ],
        solutionVn: [
          "Tiền xe không được vượt quá số tiền anh có: $4 + 2m \\leq 30$.",
          "Trừ $4$: $2m \\leq 26$.",
          "Chia cho $2$: $m \\leq 13$ dặm.",
        ],
        answer: "$m \\leq 13$", answerVn: "$m \\leq 13$",
        accept: ["m<=13", "m≤13", "13"],
      },
    ],
  },
];
