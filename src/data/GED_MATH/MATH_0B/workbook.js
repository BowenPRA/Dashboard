// src/data/GED_MATH/MATH_0B/workbook.js
// Reveal-solution practice for Fractions, Decimals & Percents (the whole Drill,
// 40 XP). See docs/workbook-tasks.md. Every answer is a number or short value —
// no prose. In KaTeX the percent sign must be escaped as \% (a bare % starts a
// comment and eats the rest of the line).

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "In the fraction $\\dfrac{3}{4}$, what is the **denominator**?",
        promptVn: "Trong phân số $\\dfrac{3}{4}$, **mẫu số** là gì?",
        solution: [
          "The denominator is the bottom number — how many equal parts the whole is split into.",
          "Here the bottom number is $4$.",
        ],
        solutionVn: [
          "Mẫu số là số ở dưới — tổng thể được chia thành bao nhiêu phần bằng nhau.",
          "Ở đây số dưới là $4$.",
        ],
        answer: "$4$", answerVn: "$4$",
      },
      {
        id: "f2",
        prompt: "Write $\\dfrac{1}{2}$ as a **decimal**.",
        promptVn: "Viết $\\dfrac{1}{2}$ dưới dạng **số thập phân**.",
        solution: [
          "A fraction is a division: $1 \\div 2$.",
          "$1 \\div 2 = 0.5$.",
        ],
        solutionVn: [
          "Một phân số là một phép chia: $1 \\div 2$.",
          "$1 \\div 2 = 0{,}5$.",
        ],
        answer: "$0.5$", answerVn: "$0{,}5$",
        accept: ["0.5", "0,5", ".5"],
      },
      {
        id: "f3",
        prompt: "Write $0.75$ as a **percent**.",
        promptVn: "Viết $0{,}75$ dưới dạng **phần trăm**.",
        solution: [
          "To turn a decimal into a percent, multiply by $100$ (move the point two places right).",
          "$0.75 \\times 100 = 75$, so it is $75\\%$.",
        ],
        solutionVn: [
          "Để đổi số thập phân thành phần trăm, nhân với $100$ (dời dấu phẩy hai chỗ sang phải).",
          "$0{,}75 \\times 100 = 75$, nên là $75\\%$.",
        ],
        answer: "$75\\%$", answerVn: "$75\\%$",
        accept: ["75", "75%"],
      },
      {
        id: "f4",
        prompt: "Write $25\\%$ as a **decimal**.",
        promptVn: "Viết $25\\%$ dưới dạng **số thập phân**.",
        solution: [
          "Percent means 'out of 100', so divide by $100$ (move the point two places left).",
          "$25 \\div 100 = 0.25$.",
        ],
        solutionVn: [
          "Phần trăm nghĩa là 'trên 100', nên chia cho $100$ (dời dấu phẩy hai chỗ sang trái).",
          "$25 \\div 100 = 0{,}25$.",
        ],
        answer: "$0.25$", answerVn: "$0{,}25$",
        accept: ["0.25", "0,25", ".25"],
      },
      {
        id: "f5",
        prompt: "Simplify the fraction $\\dfrac{2}{4}$.",
        promptVn: "Rút gọn phân số $\\dfrac{2}{4}$.",
        solution: [
          "Divide the top and bottom by the same number. Both divide by $2$.",
          "$\\dfrac{2 \\div 2}{4 \\div 2} = \\dfrac{1}{2}$.",
        ],
        solutionVn: [
          "Chia tử và mẫu cho cùng một số. Cả hai chia hết cho $2$.",
          "$\\dfrac{2 \\div 2}{4 \\div 2} = \\dfrac{1}{2}$.",
        ],
        answer: "$\\dfrac{1}{2}$", answerVn: "$\\dfrac{1}{2}$",
        accept: ["1/2", "0.5"],
      },
      {
        id: "f6",
        prompt: "Write $\\dfrac{1}{4}$ as a **percent**.",
        promptVn: "Viết $\\dfrac{1}{4}$ dưới dạng **phần trăm**.",
        solution: [
          "$\\dfrac{1}{4}$ as a decimal is $1 \\div 4 = 0.25$.",
          "Multiply by $100$: $0.25 \\times 100 = 25\\%$.",
        ],
        solutionVn: [
          "$\\dfrac{1}{4}$ dưới dạng thập phân là $1 \\div 4 = 0{,}25$.",
          "Nhân với $100$: $0{,}25 \\times 100 = 25\\%$.",
        ],
        answer: "$25\\%$", answerVn: "$25\\%$",
        accept: ["25", "25%"],
      },
      {
        id: "f7",
        prompt: "Which is larger: $0.6$ or $\\dfrac{1}{2}$?",
        promptVn: "Số nào lớn hơn: $0{,}6$ hay $\\dfrac{1}{2}$?",
        solution: [
          "Put both in the same form. $\\dfrac{1}{2} = 0.5$.",
          "$0.6$ is greater than $0.5$, so $0.6$ is larger.",
        ],
        solutionVn: [
          "Đưa cả hai về cùng dạng. $\\dfrac{1}{2} = 0{,}5$.",
          "$0{,}6$ lớn hơn $0{,}5$, nên $0{,}6$ lớn hơn.",
        ],
        answer: "$0.6$", answerVn: "$0{,}6$",
        accept: ["0.6", "0,6"],
      },
      {
        id: "f8",
        prompt: "What is $10\\%$ of $200$?",
        promptVn: "$10\\%$ của $200$ là bao nhiêu?",
        solution: [
          "$10\\%$ means $\\dfrac{10}{100}$, or one tenth.",
          "One tenth of $200$ is $200 \\div 10 = 20$.",
        ],
        solutionVn: [
          "$10\\%$ nghĩa là $\\dfrac{10}{100}$, tức một phần mười.",
          "Một phần mười của $200$ là $200 \\div 10 = 20$.",
        ],
        answer: "$20$", answerVn: "$20$",
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "What is $25\\%$ of $80$?",
        promptVn: "$25\\%$ của $80$ là bao nhiêu?",
        solution: [
          "$25\\%$ is the same as $\\dfrac{1}{4}$.",
          "$80 \\div 4 = 20$.",
        ],
        solutionVn: [
          "$25\\%$ giống như $\\dfrac{1}{4}$.",
          "$80 \\div 4 = 20$.",
        ],
        answer: "$20$", answerVn: "$20$",
      },
      {
        id: "p2",
        prompt: "What is $30\\%$ of $150$?",
        promptVn: "$30\\%$ của $150$ là bao nhiêu?",
        solution: [
          "Turn the percent into a decimal: $30\\% = 0.30$.",
          "Multiply: $0.30 \\times 150 = 45$.",
        ],
        solutionVn: [
          "Đổi phần trăm thành thập phân: $30\\% = 0{,}30$.",
          "Nhân: $0{,}30 \\times 150 = 45$.",
        ],
        answer: "$45$", answerVn: "$45$",
      },
      {
        id: "p3",
        prompt: "A 50-dollar shirt is $20\\%$ off. How many dollars do you **save**?",
        promptVn: "Một chiếc áo giá 50 đô la được giảm $20\\%$. Bạn tiết kiệm được bao nhiêu **đô la**?",
        solution: [
          "Find $20\\%$ of $50$. $20\\% = 0.2$.",
          "$0.2 \\times 50 = 10$, so you save 10 dollars.",
        ],
        solutionVn: [
          "Tìm $20\\%$ của $50$. $20\\% = 0{,}2$.",
          "$0{,}2 \\times 50 = 10$, nên bạn tiết kiệm 10 đô la.",
        ],
        answer: "10 dollars", answerVn: "10 đô la",
        accept: ["10", "$10"],
      },
      {
        id: "p4",
        prompt: "The same 50-dollar shirt is $20\\%$ off. What is the **sale price** you pay?",
        promptVn: "Cũng chiếc áo giá 50 đô la đó giảm $20\\%$. **Giá bán** bạn phải trả là bao nhiêu?",
        solution: [
          "The discount is 10 dollars (from the last question).",
          "Subtract it from the original: $50 - 10 = 40$.",
        ],
        solutionVn: [
          "Khoản giảm là 10 đô la (từ câu trước).",
          "Trừ vào giá gốc: $50 - 10 = 40$.",
        ],
        answer: "40 dollars", answerVn: "40 đô la",
        accept: ["40", "$40"],
      },
      {
        id: "p5",
        prompt: "Order from smallest to largest: $\\dfrac{1}{2}$, $0.4$, $70\\%$.",
        promptVn: "Sắp xếp từ nhỏ đến lớn: $\\dfrac{1}{2}$, $0{,}4$, $70\\%$.",
        solution: [
          "Put them all as decimals: $\\dfrac{1}{2} = 0.5$, and $70\\% = 0.7$.",
          "Now compare $0.4$, $0.5$, $0.7$. Order: $0.4$, $\\dfrac{1}{2}$, $70\\%$.",
        ],
        solutionVn: [
          "Đưa tất cả về thập phân: $\\dfrac{1}{2} = 0{,}5$, và $70\\% = 0{,}7$.",
          "So sánh $0{,}4$, $0{,}5$, $0{,}7$. Thứ tự: $0{,}4$, $\\dfrac{1}{2}$, $70\\%$.",
        ],
        answer: "$0.4, \\tfrac{1}{2}, 70\\%$", answerVn: "$0{,}4, \\tfrac{1}{2}, 70\\%$",
        accept: ["0.4, 1/2, 70%", "0.4 1/2 70%"],
      },
      {
        id: "p6",
        prompt: "A test has $20$ questions and you got $15$ right. What **percent** did you score?",
        promptVn: "Một bài kiểm tra có $20$ câu và bạn làm đúng $15$ câu. Bạn đạt bao nhiêu **phần trăm**?",
        solution: [
          "Write it as a fraction: $\\dfrac{15}{20}$.",
          "As a decimal: $15 \\div 20 = 0.75$. As a percent: $75\\%$.",
        ],
        solutionVn: [
          "Viết dưới dạng phân số: $\\dfrac{15}{20}$.",
          "Dưới dạng thập phân: $15 \\div 20 = 0{,}75$. Dưới dạng phần trăm: $75\\%$.",
        ],
        answer: "$75\\%$", answerVn: "$75\\%$",
        accept: ["75", "75%", "0.75"],
      },
      {
        id: "p7",
        prompt: "Write $\\dfrac{3}{5}$ as a percent.",
        promptVn: "Viết $\\dfrac{3}{5}$ dưới dạng phần trăm.",
        solution: [
          "$\\dfrac{3}{5}$ as a decimal is $3 \\div 5 = 0.6$.",
          "$0.6 \\times 100 = 60\\%$.",
        ],
        solutionVn: [
          "$\\dfrac{3}{5}$ dưới dạng thập phân là $3 \\div 5 = 0{,}6$.",
          "$0{,}6 \\times 100 = 60\\%$.",
        ],
        answer: "$60\\%$", answerVn: "$60\\%$",
        accept: ["60", "60%"],
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "A 1200-dollar laptop is $15\\%$ off. What is the final price?",
        promptVn: "Một laptop giá 1200 đô la giảm $15\\%$. Giá cuối cùng là bao nhiêu?",
        solution: [
          "Find the discount: $15\\% = 0.15$, and $0.15 \\times 1200 = 180$.",
          "Subtract: $1200 - 180 = 1020$.",
          "Check: paying $85\\%$ works too, $0.85 \\times 1200 = 1020$. ✓",
        ],
        solutionVn: [
          "Tìm khoản giảm: $15\\% = 0{,}15$, và $0{,}15 \\times 1200 = 180$.",
          "Trừ: $1200 - 180 = 1020$.",
          "Thử lại: trả $85\\%$ cũng được, $0{,}85 \\times 1200 = 1020$. ✓",
        ],
        answer: "1020 dollars", answerVn: "1020 đô la",
        accept: ["1020", "$1020"],
      },
      {
        id: "c2",
        prompt: "In a town of $500$ people, $60\\%$ voted. How many people voted?",
        promptVn: "Trong một thị trấn có $500$ người, $60\\%$ đã đi bầu. Có bao nhiêu người đã bầu?",
        solution: [
          "$60\\% = 0.6$.",
          "$0.6 \\times 500 = 300$ people.",
        ],
        solutionVn: [
          "$60\\% = 0{,}6$.",
          "$0{,}6 \\times 500 = 300$ người.",
        ],
        answer: "$300$", answerVn: "$300$",
      },
      {
        id: "c3",
        prompt: "A meal costs 40 dollars. You add a $20\\%$ tip. What is the total you pay?",
        promptVn: "Một bữa ăn giá 40 đô la. Bạn thêm tiền boa $20\\%$. Tổng số bạn trả là bao nhiêu?",
        solution: [
          "A tip is added on top, not taken off.",
          "$20\\%$ of $40$ is $0.2 \\times 40 = 8$.",
          "Total: $40 + 8 = 48$.",
        ],
        solutionVn: [
          "Tiền boa được cộng thêm, không phải trừ đi.",
          "$20\\%$ của $40$ là $0{,}2 \\times 40 = 8$.",
          "Tổng: $40 + 8 = 48$.",
        ],
        answer: "48 dollars", answerVn: "48 đô la",
        accept: ["48", "$48"],
      },
      {
        id: "c4",
        prompt: "You scored $18$ out of $24$ on a quiz. What percent is that, rounded to the nearest whole percent?",
        promptVn: "Bạn được $18$ trên $24$ trong một bài kiểm tra. Đó là bao nhiêu phần trăm, làm tròn đến phần trăm gần nhất?",
        solution: [
          "$18 \\div 24 = 0.75$.",
          "$0.75 \\times 100 = 75\\%$ exactly, so no rounding is needed.",
        ],
        solutionVn: [
          "$18 \\div 24 = 0{,}75$.",
          "$0{,}75 \\times 100 = 75\\%$ chính xác, nên không cần làm tròn.",
        ],
        answer: "$75\\%$", answerVn: "$75\\%$",
        accept: ["75", "75%"],
      },
    ],
  },
];
