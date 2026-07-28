// src/data/Y7_MATH/U01_1/workbook.js
// Reveal-solution practice for 1.1. See docs/workbook-tasks.md for the schema.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1", prompt: "Work out $-3 + -4$.", promptVn: "Tính $-3 + -4$.",
        solution: ["Adding a negative means move **left**.", "Start at $-3$, move $4$ left: $-3 + -4 = -7$."],
        solutionVn: ["Cộng một số âm nghĩa là đi sang **trái**.", "Bắt đầu ở $-3$, đi $4$ bước sang trái: $-3 + -4 = -7$."],
        answer: "$-7$", answerVn: "$-7$",
      },
      {
        id: "f2", prompt: "Work out $6 + -5$.", promptVn: "Tính $6 + -5$.",
        solution: ["Adding a negative → move **left**.", "Start at $6$, move $5$ left: $6 + -5 = 1$."],
        solutionVn: ["Cộng một số âm → đi sang **trái**.", "Bắt đầu ở $6$, đi $5$ bước sang trái: $6 + -5 = 1$."],
        answer: "$1$", answerVn: "$1$",
      },
      {
        id: "f3", prompt: "Work out $-5 + 10$.", promptVn: "Tính $-5 + 10$.",
        solution: ["Adding a positive → move **right**.", "Start at $-5$, move $10$ right: $-5 + 10 = 5$."],
        solutionVn: ["Cộng một số dương → đi sang **phải**.", "Bắt đầu ở $-5$, đi $10$ bước sang phải: $-5 + 10 = 5$."],
        answer: "$5$", answerVn: "$5$",
      },
      {
        id: "f4", prompt: "Work out $4 - 6$.", promptVn: "Tính $4 - 6$.",
        solution: ["Subtracting a positive → move **left**.", "Start at $4$, move $6$ left: $4 - 6 = -2$."],
        solutionVn: ["Trừ một số dương → đi sang **trái**.", "Bắt đầu ở $4$, đi $6$ bước sang trái: $4 - 6 = -2$."],
        answer: "$-2$", answerVn: "$-2$",
      },
      {
        id: "f5", prompt: "Work out $-6 - 3$.", promptVn: "Tính $-6 - 3$.",
        solution: ["Subtracting a positive → move **left**.", "Start at $-6$, move $3$ left: $-6 - 3 = -9$."],
        solutionVn: ["Trừ một số dương → đi sang **trái**.", "Bắt đầu ở $-6$, đi $3$ bước sang trái: $-6 - 3 = -9$."],
        answer: "$-9$", answerVn: "$-9$",
      },
      {
        id: "f6", prompt: "Work out $1 - -8$.", promptVn: "Tính $1 - -8$.",
        solution: ["Subtracting a negative is the same as adding: $1 - -8 = 1 + 8$.", "$1 + 8 = 9$."],
        solutionVn: ["Trừ một số âm giống như cộng: $1 - -8 = 1 + 8$.", "$1 + 8 = 9$."],
        answer: "$9$", answerVn: "$9$",
      },
      {
        id: "f7", prompt: "Work out $-5 - -6$.", promptVn: "Tính $-5 - -6$.",
        solution: ["Change $- -$ into $+$: $-5 - -6 = -5 + 6$.", "$-5 + 6 = 1$."],
        solutionVn: ["Đổi $- -$ thành $+$: $-5 - -6 = -5 + 6$.", "$-5 + 6 = 1$."],
        answer: "$1$", answerVn: "$1$",
      },
      {
        id: "f8", prompt: "Work out $20 + -5$.", promptVn: "Tính $20 + -5$.",
        solution: ["Adding a negative → move **left**.", "$20 + -5 = 15$."],
        solutionVn: ["Cộng một số âm → đi sang **trái**.", "$20 + -5 = 15$."],
        answer: "$15$", answerVn: "$15$",
      },
      {
        id: "f9", prompt: "Work out $-10 - -15$.", promptVn: "Tính $-10 - -15$.",
        solution: ["Change $- -$ into $+$: $-10 - -15 = -10 + 15$.", "$-10 + 15 = 5$."],
        solutionVn: ["Đổi $- -$ thành $+$: $-10 - -15 = -10 + 15$.", "$-10 + 15 = 5$."],
        answer: "$5$", answerVn: "$5$",
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1", prompt: "Fill in the missing number: $8 + \\square = 1$.", promptVn: "Điền số còn thiếu: $8 + \\square = 1$.",
        solution: ["We need what to add to $8$ to reach $1$, so $\\square = 1 - 8$.", "$1 - 8 = -7$. Check: $8 + -7 = 1$. ✓"],
        solutionVn: ["Cần cộng gì vào $8$ để được $1$, nên $\\square = 1 - 8$.", "$1 - 8 = -7$. Thử lại: $8 + -7 = 1$. ✓"],
        answer: "$-7$", answerVn: "$-7$",
      },
      {
        id: "p2", prompt: "Fill in the missing number: $-3 + \\square = 3$.", promptVn: "Điền số còn thiếu: $-3 + \\square = 3$.",
        solution: ["$\\square = 3 - -3 = 3 + 3$.", "$= 6$. Check: $-3 + 6 = 3$. ✓"],
        solutionVn: ["$\\square = 3 - -3 = 3 + 3$.", "$= 6$. Thử lại: $-3 + 6 = 3$. ✓"],
        answer: "$6$", answerVn: "$6$",
      },
      {
        id: "p3", prompt: "Fill in the missing number: $\\square - 3 = -1$.", promptVn: "Điền số còn thiếu: $\\square - 3 = -1$.",
        solution: ["$\\square = -1 + 3$.", "$= 2$. Check: $2 - 3 = -1$. ✓"],
        solutionVn: ["$\\square = -1 + 3$.", "$= 2$. Thử lại: $2 - 3 = -1$. ✓"],
        answer: "$2$", answerVn: "$2$",
      },
      {
        id: "p4", prompt: "Estimate by rounding each number to the nearest integer: $-6.15 + 9.93$.", promptVn: "Ước lượng bằng cách làm tròn mỗi số đến số nguyên gần nhất: $-6.15 + 9.93$.",
        solution: ["Round each: $-6.15 \\approx -6$ and $9.93 \\approx 10$.", "$-6 + 10 = 4$ (estimate)."],
        solutionVn: ["Làm tròn: $-6.15 \\approx -6$ và $9.93 \\approx 10$.", "$-6 + 10 = 4$ (ước lượng)."],
        answer: "$\\approx 4$", answerVn: "$\\approx 4$",
      },
      {
        id: "p5", prompt: "Estimate by rounding: $7.88 - -9.13$.", promptVn: "Ước lượng bằng cách làm tròn: $7.88 - -9.13$.",
        solution: ["Round: $7.88 \\approx 8$ and $-9.13 \\approx -9$.", "$8 - -9 = 8 + 9 = 17$ (estimate)."],
        solutionVn: ["Làm tròn: $7.88 \\approx 8$ và $-9.13 \\approx -9$.", "$8 - -9 = 8 + 9 = 17$ (ước lượng)."],
        answer: "$\\approx 17$", answerVn: "$\\approx 17$",
      },
      {
        id: "p6", prompt: "Two integers add up to $2$. One of them is $8$. What is the other integer?", promptVn: "Hai số nguyên có tổng bằng $2$. Một trong hai số là $8$. Số còn lại là bao nhiêu?",
        solution: ["The other integer $= 2 - 8$.", "$2 - 8 = -6$. Check: $8 + -6 = 2$. ✓"],
        solutionVn: ["Số còn lại $= 2 - 8$.", "$2 - 8 = -6$. Thử lại: $8 + -6 = 2$. ✓"],
        answer: "$-6$", answerVn: "$-6$",
      },
      {
        id: "p7", prompt: "Here are six integers: $-5, -3, -2, 3, 4, 5$. Choose two that make $\\square + \\square = 1$.", promptVn: "Có sáu số nguyên: $-5, -3, -2, 3, 4, 5$. Chọn hai số sao cho $\\square + \\square = 1$.",
        solution: ["Look for two numbers that combine to $1$.", "$-3 + 4 = 1$ (also $-2 + 3 = 1$)."],
        solutionVn: ["Tìm hai số cộng lại bằng $1$.", "$-3 + 4 = 1$ (hoặc $-2 + 3 = 1$)."],
        answer: "$-3 + 4$", answerVn: "$-3 + 4$",
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "Copy and complete this addition table.",
        promptVn: "Chép lại và hoàn thành bảng cộng này.",
        inlineSvg: DIAGRAMS.WB_ADD_TABLE,
        solution: [
          "Add each row number to each column number.",
          "$2 + 4 = 6$ and $2 + -5 = -3$.",
          "$-6 + 4 = -2$ and $-6 + -5 = -11$.",
        ],
        solutionVn: [
          "Cộng số ở mỗi hàng với số ở mỗi cột.",
          "$2 + 4 = 6$ và $2 + -5 = -3$.",
          "$-6 + 4 = -2$ và $-6 + -5 = -11$.",
        ],
        answer: "Top row: $6,\\ -3$;  bottom row: $-2,\\ -11$",
        answerVn: "Hàng trên: $6,\\ -3$;  hàng dưới: $-2,\\ -11$",
      },
      {
        id: "c2",
        prompt: "Use each of $-5, -3, -2, 3, 4, 5$ **once** to complete all three: $\\square + \\square = 1$,  $\\square + \\square = -2$,  $\\square + \\square = 3$.",
        promptVn: "Dùng mỗi số $-5, -3, -2, 3, 4, 5$ **một lần** để hoàn thành cả ba: $\\square + \\square = 1$,  $\\square + \\square = -2$,  $\\square + \\square = 3$.",
        solution: [
          "Every integer is used exactly once across the three sums.",
          "$-3 + 4 = 1$.",
          "$-5 + 3 = -2$.",
          "$-2 + 5 = 3$.",
        ],
        solutionVn: [
          "Mỗi số nguyên được dùng đúng một lần trong ba phép tính.",
          "$-3 + 4 = 1$.",
          "$-5 + 3 = -2$.",
          "$-2 + 5 = 3$.",
        ],
        answer: "$-3+4=1,\\ \\ -5+3=-2,\\ \\ -2+5=3$",
        answerVn: "$-3+4=1,\\ \\ -5+3=-2,\\ \\ -2+5=3$",
      },
    ],
  },
];
