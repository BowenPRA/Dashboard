// src/data/GED_MATH/MATH_0D/assessment.js
// Timed check for Data, Statistics & Probability. Mostly MCQ (no English tax on
// maths), one dropdown item, bilingual explanations. NOTE: Assessment.jsx renders
// maths only inside $$...$$ (double dollar); a single $ is literal, which is what
// makes plain currency like "$300" and percents like "20%" show correctly.

export const assessment = {
  timeLimit: 2700, // 45 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_mean",
      type: "mcq",
      title: "1. What is the mean of 10, 20, 30 and 40?",
      options: [
        { val: "A", text: "A. 20" },
        { val: "B", text: "B. 25" },
        { val: "C", text: "C. 30" },
        { val: "D", text: "D. 100" },
      ],
      correct: "B",
      expEn: "Add the values: 10 + 20 + 30 + 40 = 100. Divide by how many there are, 4: $$100 \\div 4 = 25$$. (100 is only the total.)",
      expVn: "Cộng các giá trị: 10 + 20 + 30 + 40 = 100. Chia cho số lượng, 4: $$100 \\div 4 = 25$$. (100 chỉ là tổng.)",
    },
    {
      id: "q2_mcq_median",
      type: "mcq",
      title: "2. What is the median of 4, 9, 1, 7, 3?",
      options: [
        { val: "A", text: "A. 1" },
        { val: "B", text: "B. 9" },
        { val: "C", text: "C. 4" },
        { val: "D", text: "D. 7" },
      ],
      correct: "C",
      expEn: "Put the values in order first: 1, 3, 4, 7, 9. The middle value is 4. (Choosing 1 or 9 means you picked an end, not the middle.)",
      expVn: "Sắp xếp các giá trị trước: 1, 3, 4, 7, 9. Giá trị ở giữa là 4. (Chọn 1 hoặc 9 là chọn đầu mút, không phải giữa.)",
    },
    {
      id: "q3_mcq_mode",
      type: "mcq",
      title: "3. What is the mode of 2, 5, 5, 8, 9?",
      options: [
        { val: "A", text: "A. 5" },
        { val: "B", text: "B. 8" },
        { val: "C", text: "C. 9" },
        { val: "D", text: "D. 29" },
      ],
      correct: "A",
      expEn: "The mode is the value that appears most often. 5 appears twice; every other value appears once. (29 is the total, not an average.)",
      expVn: "Mốt là giá trị xuất hiện nhiều nhất. 5 xuất hiện hai lần; các giá trị khác chỉ một lần. (29 là tổng, không phải số trung bình.)",
    },
    {
      id: "q4_mcq_range",
      type: "mcq",
      title: "4. What is the range of 15, 3, 22, 8?",
      options: [
        { val: "A", text: "A. 4" },
        { val: "B", text: "B. 12" },
        { val: "C", text: "C. 22" },
        { val: "D", text: "D. 19" },
      ],
      correct: "D",
      expEn: "Range = largest − smallest. The largest value is 22 and the smallest is 3: 22 − 3 = 19.",
      expVn: "Khoảng biến thiên = lớn nhất − nhỏ nhất. Giá trị lớn nhất là 22 và nhỏ nhất là 3: 22 − 3 = 19.",
    },
    {
      id: "q5_inline_outlier",
      type: "inline",
      title: "5. Five workers are 25, 28, 30, 31 and 65 years old. Complete the sentence.",
      options: [],
      textParts: [
        "The age 65 is an ",
        ", so the ",
        " is the better average for a typical worker.",
      ],
      blanks: {
        "1": {
          correct: "outlier",
          options: [
            { val: "outlier", text: "outlier" },
            { val: "mode", text: "mode" },
            { val: "range", text: "range" },
          ],
        },
        "2": {
          correct: "median",
          options: [
            { val: "median", text: "median" },
            { val: "mean", text: "mean" },
            { val: "total", text: "total" },
          ],
        },
      },
      expEn: "65 is far from the other ages — an outlier. It pulls the mean up to 35.8, older than four of the five workers. The median, 30, describes a typical worker.",
      expVn: "65 cách xa các tuổi còn lại — một giá trị ngoại lai. Nó kéo trung bình lên 35,8, già hơn bốn trong năm người. Trung vị, 30, mô tả người lao động điển hình.",
    },
    {
      id: "q6_mcq_pie",
      type: "mcq",
      title: "6. A circle graph shows that 20% of a $1,500 monthly budget goes to food. How much is spent on food?",
      options: [
        { val: "A", text: "A. $20" },
        { val: "B", text: "B. $150" },
        { val: "C", text: "C. $1,200" },
        { val: "D", text: "D. $300" },
      ],
      correct: "D",
      expEn: "\"Percent of\" means multiply: 20% = 0.2, and $$0.2 \\times 1500 = 300$$. ($1,200 is the money NOT spent on food.)",
      expVn: "\"Phần trăm của\" nghĩa là nhân: 20% = 0,2, và $$0{,}2 \\times 1500 = 300$$. ($1,200 là số tiền KHÔNG chi cho ăn uống.)",
    },
    {
      id: "q7_mcq_correlation",
      type: "mcq",
      title: "7. A scatter plot shows that as the outdoor temperature rises, sales of heaters fall. What kind of correlation is this?",
      options: [
        { val: "A", text: "A. Negative correlation" },
        { val: "B", text: "B. Positive correlation" },
        { val: "C", text: "C. No correlation" },
        { val: "D", text: "D. A mode" },
      ],
      correct: "A",
      expEn: "One value goes up while the other goes down, so the dots fall to the right: a negative correlation. Positive would mean both rise together.",
      expVn: "Một giá trị tăng trong khi giá trị kia giảm, nên các chấm đi xuống bên phải: tương quan âm. Dương nghĩa là cả hai cùng tăng.",
    },
    {
      id: "q8_mcq_probability",
      type: "mcq",
      title: "8. A box has 5 green, 3 yellow and 2 red pens. You take one without looking. What is the probability it is green?",
      options: [
        { val: "A", text: "A. 5%" },
        { val: "B", text: "B. 1 in 5" },
        { val: "C", text: "C. 50%" },
        { val: "D", text: "D. 1 in 3" },
      ],
      correct: "C",
      expEn: "There are 5 + 3 + 2 = 10 pens, and 5 are green: $$\\frac{5}{10} = \\frac{1}{2} = 50\\%$$. Always divide by the TOTAL number of pens.",
      expVn: "Có 5 + 3 + 2 = 10 cây bút, và 5 cây màu xanh: $$\\frac{5}{10} = \\frac{1}{2} = 50\\%$$. Luôn chia cho TỔNG số bút.",
    },
    {
      id: "q9_mcq_two_events",
      type: "mcq",
      title: "9. You flip a coin and roll a die. What is the probability of getting heads AND a 6?",
      options: [
        { val: "A", text: "A. $$\\frac{1}{6}$$" },
        { val: "B", text: "B. $$\\frac{1}{12}$$" },
        { val: "C", text: "C. $$\\frac{2}{8}$$" },
        { val: "D", text: "D. $$\\frac{1}{2}$$" },
      ],
      correct: "B",
      expEn: "The two events are independent, so multiply: $$\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}$$. \"And\" with independent events means multiply, not add.",
      expVn: "Hai biến cố độc lập, nên nhân: $$\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}$$. \"Và\" với các biến cố độc lập nghĩa là nhân, không phải cộng.",
    },
    {
      id: "q10_mcq_misleading",
      type: "mcq",
      title: "10. A bar graph compares two stores: Store A sold 92 phones and Store B sold 95. The vertical axis starts at 90, so bar B looks almost three times taller than bar A. What is the problem with this graph?",
      options: [
        { val: "A", text: "A. Nothing — B really sold three times more than A." },
        { val: "B", text: "B. The bars are the wrong color." },
        { val: "C", text: "C. The graph should be a circle graph." },
        { val: "D", text: "D. The axis does not start at 0, so a small difference looks big." },
      ],
      correct: "D",
      expEn: "92 and 95 are almost equal. Starting the axis at 90 cuts off the bottom of both bars and exaggerates the difference. Always check where the axis starts.",
      expVn: "92 và 95 gần bằng nhau. Bắt đầu trục từ 90 cắt mất phần dưới của cả hai cột và phóng đại sự khác biệt. Luôn kiểm tra trục bắt đầu từ đâu.",
    },
  ],
};
