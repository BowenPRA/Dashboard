// src/data/GED_MATH/MATH_0B/assessment.js
// Timed check for Fractions, Decimals & Percents. All-MCQ (no English tax on
// maths), bilingual explanations. KaTeX percent sign escaped as \%.

export const assessment = {
  timeLimit: 2700, // 45 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_half_decimal",
      type: "mcq",
      title: "1. Which decimal is equal to $\\dfrac{1}{2}$?",
      options: [
        { val: "A", text: "A. 0.2" },
        { val: "B", text: "B. 0.5" },
        { val: "C", text: "C. 1.2" },
        { val: "D", text: "D. 2.0" },
      ],
      correct: "B",
      expEn: "A fraction is a division: $1 \\div 2 = 0.5$. So one-half equals 0.5.",
      expVn: "Phân số là một phép chia: $1 \\div 2 = 0{,}5$. Vậy một phần hai bằng 0,5.",
    },
    {
      id: "q2_mcq_percent_to_decimal",
      type: "mcq",
      title: "2. Write $40\\%$ as a decimal.",
      options: [
        { val: "A", text: "A. 4.0" },
        { val: "B", text: "B. 0.04" },
        { val: "C", text: "C. 0.4" },
        { val: "D", text: "D. 40.0" },
      ],
      correct: "C",
      expEn: "Percent to decimal: divide by 100 (move the point two places left). $40 \\div 100 = 0.4$.",
      expVn: "Phần trăm sang thập phân: chia cho 100 (dời dấu phẩy hai chỗ sang trái). $40 \\div 100 = 0{,}4$.",
    },
    {
      id: "q3_mcq_decimal_to_percent",
      type: "mcq",
      title: "3. Write $0.9$ as a percent.",
      options: [
        { val: "A", text: "A. 0.9%" },
        { val: "B", text: "B. 9%" },
        { val: "C", text: "C. 900%" },
        { val: "D", text: "D. 90%" },
      ],
      correct: "D",
      expEn: "Decimal to percent: multiply by 100. $0.9 \\times 100 = 90\\%$.",
      expVn: "Thập phân sang phần trăm: nhân với 100. $0{,}9 \\times 100 = 90\\%$.",
    },
    {
      id: "q4_inline_convert",
      type: "inline",
      title: "4. Complete the conversions for one-quarter.",
      options: [],
      textParts: [
        "The fraction $\\dfrac{1}{4}$ is equal to the decimal ",
        " and the percent ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "0.25",
          options: [
            { val: "0.25", text: "0.25" },
            { val: "0.4", text: "0.4" },
            { val: "1.4", text: "1.4" },
          ],
        },
        "2": {
          correct: "25%",
          options: [
            { val: "25%", text: "25%" },
            { val: "4%", text: "4%" },
            { val: "14%", text: "14%" },
          ],
        },
      },
      expEn: "$1 \\div 4 = 0.25$, and $0.25 \\times 100 = 25\\%$.",
      expVn: "$1 \\div 4 = 0{,}25$, và $0{,}25 \\times 100 = 25\\%$.",
    },
    {
      id: "q5_mcq_simplify",
      type: "mcq",
      title: "5. Simplify $\\dfrac{6}{8}$ to its smallest form.",
      options: [
        { val: "A", text: "A. $\\dfrac{3}{4}$" },
        { val: "B", text: "B. $\\dfrac{2}{4}$" },
        { val: "C", text: "C. $\\dfrac{6}{8}$" },
        { val: "D", text: "D. $\\dfrac{1}{2}$" },
      ],
      correct: "A",
      expEn: "Divide top and bottom by the same number. Both divide by 2: $\\dfrac{6 \\div 2}{8 \\div 2} = \\dfrac{3}{4}$, which cannot be reduced further.",
      expVn: "Chia tử và mẫu cho cùng một số. Cả hai chia cho 2: $\\dfrac{6 \\div 2}{8 \\div 2} = \\dfrac{3}{4}$, không thể rút gọn thêm.",
    },
    {
      id: "q6_mcq_percent_of",
      type: "mcq",
      title: "6. What is $20\\%$ of $60$?",
      options: [
        { val: "A", text: "A. 3" },
        { val: "B", text: "B. 12" },
        { val: "C", text: "C. 20" },
        { val: "D", text: "D. 40" },
      ],
      correct: "B",
      expEn: "$20\\% = 0.2$, and $0.2 \\times 60 = 12$. (Or: $20\\%$ is one fifth, and $60 \\div 5 = 12$.)",
      expVn: "$20\\% = 0{,}2$, và $0{,}2 \\times 60 = 12$. (Hoặc: $20\\%$ là một phần năm, và $60 \\div 5 = 12$.)",
    },
    {
      id: "q7_mcq_discount",
      type: "mcq",
      title: "7. A $\\$200$ phone is $10\\%$ off. What is the sale price?",
      options: [
        { val: "A", text: "A. $190" },
        { val: "B", text: "B. $20" },
        { val: "C", text: "C. $180" },
        { val: "D", text: "D. $210" },
      ],
      correct: "C",
      expEn: "$10\\%$ of $200$ is $20$ (the discount). Sale price = $200 - 20 = 180$. Remember to subtract the discount, not stop at it.",
      expVn: "$10\\%$ của $200$ là $20$ (khoản giảm). Giá bán = $200 - 20 = 180$. Nhớ trừ khoản giảm, đừng dừng ở đó.",
    },
    {
      id: "q8_mcq_score_percent",
      type: "mcq",
      title: "8. You got $9$ out of $10$ questions right. What percent is that?",
      options: [
        { val: "A", text: "A. 9%" },
        { val: "B", text: "B. 19%" },
        { val: "C", text: "C. 90%" },
        { val: "D", text: "D. 99%" },
      ],
      correct: "C",
      expEn: "$\\dfrac{9}{10} = 0.9 = 90\\%$. Nine out of ten is ninety hundredths.",
      expVn: "$\\dfrac{9}{10} = 0{,}9 = 90\\%$. Chín trên mười là chín mươi phần trăm.",
    },
    {
      id: "q9_mcq_compare",
      type: "mcq",
      title: "9. Which is the LARGEST value?",
      options: [
        { val: "A", text: "A. $\\dfrac{1}{4}$" },
        { val: "B", text: "B. 0.3" },
        { val: "C", text: "C. $60\\%$" },
        { val: "D", text: "D. $\\dfrac{1}{2}$" },
      ],
      correct: "C",
      expEn: "Put them all as decimals: $\\dfrac{1}{4}=0.25$, $0.3$, $60\\%=0.6$, $\\dfrac{1}{2}=0.5$. The largest is $0.6$, which is $60\\%$.",
      expVn: "Đưa tất cả về thập phân: $\\dfrac{1}{4}=0{,}25$, $0{,}3$, $60\\%=0{,}6$, $\\dfrac{1}{2}=0{,}5$. Lớn nhất là $0{,}6$, tức $60\\%$.",
    },
    {
      id: "q10_mcq_tip",
      type: "mcq",
      title: "10. A meal costs $\\$50$. You add a $20\\%$ tip. What is the total?",
      options: [
        { val: "A", text: "A. $10" },
        { val: "B", text: "B. $70" },
        { val: "C", text: "C. $40" },
        { val: "D", text: "D. $60" },
      ],
      correct: "D",
      expEn: "A tip is added on. $20\\%$ of $50$ is $10$, so the total is $50 + 10 = 60$. Watch for 'add', not 'off'.",
      expVn: "Tiền boa được cộng thêm. $20\\%$ của $50$ là $10$, nên tổng là $50 + 10 = 60$. Chú ý 'cộng thêm', không phải 'giảm'.",
    },
  ],
};
