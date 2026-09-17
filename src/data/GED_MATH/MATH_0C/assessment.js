// src/data/GED_MATH/MATH_0C/assessment.js
// Timed check for Ratios, Proportions & Rates. GED-style word problems, mostly
// MCQ plus one typed numeric item, bilingual explanations. NOTE: Assessment.jsx
// renders maths only inside $$...$$ (double dollar); a single $ is literal,
// which is what lets plain currency like "$12" and percents like "25%" show
// correctly. Real maths (fractions) goes in $$...$$; currency stays plain text.
// Answer key: A ×2, B ×3, C ×2, D ×2, plus one fill_blank.

export const assessment = {
  timeLimit: 2700, // 45 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_simplify_ratio",
      type: "mcq",
      title: "1. A team won 12 games and lost 18. What is the ratio of wins to losses, in simplest form?",
      options: [
        { val: "A", text: "A. 12:18" },
        { val: "B", text: "B. 2:3" },
        { val: "C", text: "C. 3:2" },
        { val: "D", text: "D. 12:30" },
      ],
      correct: "B",
      expEn: "Wins come first: 12:18. Both numbers divide by 6, so 12:18 = 2:3. Option C is the ratio of losses to wins — the order is backwards. Option D compares wins to ALL games.",
      expVn: "Thắng đứng trước: 12:18. Cả hai số chia hết cho 6, nên 12:18 = 2:3. Phương án C là tỉ số thua với thắng — sai thứ tự. Phương án D so sánh thắng với TẤT CẢ trận.",
    },
    {
      id: "q2_mcq_unit_rate_speed",
      type: "mcq",
      title: "2. A bus travels 300 miles in 5 hours. What is its average speed in miles per hour?",
      options: [
        { val: "A", text: "A. 50 miles per hour" },
        { val: "B", text: "B. 1,500 miles per hour" },
        { val: "C", text: "C. 60 miles per hour" },
        { val: "D", text: "D. 65 miles per hour" },
      ],
      correct: "C",
      expEn: "'Per hour' means for ONE hour, so divide miles by hours: $$300 \\div 5 = 60$$. Option B multiplied instead of dividing.",
      expVn: "'Mỗi giờ' nghĩa là cho MỘT giờ, nên chia số dặm cho số giờ: $$300 \\div 5 = 60$$. Phương án B nhân thay vì chia.",
    },
    {
      id: "q3_mcq_best_buy",
      type: "mcq",
      title: "3. Apples are sold in a 3-pound bag for $4.50 or a 5-pound bag for $6.50. Which is the better buy, and why?",
      options: [
        { val: "A", text: "A. The 5-pound bag, because it costs $1.30 per pound" },
        { val: "B", text: "B. The 3-pound bag, because $4.50 is less than $6.50" },
        { val: "C", text: "C. The 3-pound bag, because it costs $1.50 per pound" },
        { val: "D", text: "D. The 5-pound bag, because it costs $1.50 per pound" },
      ],
      correct: "A",
      expEn: "Compare the unit price. 3-pound bag: $$4.50 \\div 3 = 1.50$$ per pound. 5-pound bag: $$6.50 \\div 5 = 1.30$$ per pound. $1.30 is less, so the 5-pound bag is the better buy. A lower total price (option B) just buys less.",
      expVn: "So sánh đơn giá. Túi 3 pound: $$4.50 \\div 3 = 1.50$$ mỗi pound. Túi 5 pound: $$6.50 \\div 5 = 1.30$$ mỗi pound. $1.30 nhỏ hơn, nên túi 5 pound hời hơn. Tổng giá thấp hơn (phương án B) chỉ là mua được ít hơn.",
    },
    {
      id: "q4_fill_proportion",
      type: "fill_blank",
      title: "4. Solve the proportion $$\\frac{3}{5} = \\frac{x}{40}$$. Type the value of x.",
      options: [],
      textParts: ["$$x =$$", ""],
      textPartsVn: ["$$x =$$", ""],
      blanks: {
        "1": { correct: "24", width: 5, accept: [] },
      },
      expEn: "Cross-multiply: $$3 \\times 40 = 5x$$, so $$120 = 5x$$ and $$x = 24$$. Or notice $$5 \\times 8 = 40$$, so $$3 \\times 8 = 24$$.",
      expVn: "Nhân chéo: $$3 \\times 40 = 5x$$, nên $$120 = 5x$$ và $$x = 24$$. Hoặc thấy $$5 \\times 8 = 40$$, nên $$3 \\times 8 = 24$$.",
    },
    {
      id: "q5_mcq_tickets",
      type: "mcq",
      title: "5. Four concert tickets cost $30. At this rate, how much do 10 tickets cost?",
      options: [
        { val: "A", text: "A. $36" },
        { val: "B", text: "B. $60" },
        { val: "C", text: "C. $120" },
        { val: "D", text: "D. $75" },
      ],
      correct: "D",
      expEn: "Unit rate first: $$30 \\div 4 = 7.50$$ per ticket. Then $$10 \\times 7.50 = 75$$. Or as a proportion: $$\\frac{4}{30} = \\frac{10}{x}$$, cross-multiply $$4x = 300$$, $$x = 75$$.",
      expVn: "Đơn giá trước: $$30 \\div 4 = 7.50$$ mỗi vé. Rồi $$10 \\times 7.50 = 75$$. Hoặc lập tỉ lệ thức: $$\\frac{4}{30} = \\frac{10}{x}$$, nhân chéo $$4x = 300$$, $$x = 75$$.",
    },
    {
      id: "q6_mcq_map_scale",
      type: "mcq",
      title: "6. On a map, 1 inch represents 40 miles. Two cities are 3.5 inches apart on the map. What is the real distance between them?",
      options: [
        { val: "A", text: "A. 43.5 miles" },
        { val: "B", text: "B. 140 miles" },
        { val: "C", text: "C. 120 miles" },
        { val: "D", text: "D. 350 miles" },
      ],
      correct: "B",
      expEn: "The scale is a unit rate: 40 miles for every 1 inch. $$3.5 \\times 40 = 140$$ miles. Option A added instead of multiplying; option C forgot the half inch.",
      expVn: "Tỉ lệ bản đồ là một đơn giá: 40 dặm cho mỗi 1 inch. $$3.5 \\times 40 = 140$$ dặm. Phương án A cộng thay vì nhân; phương án C quên nửa inch.",
    },
    {
      id: "q7_mcq_similar_figures",
      type: "mcq",
      title: "7. A rectangle is 6 cm wide and 9 cm tall. A larger rectangle with the same shape is 8 cm wide. How tall is it?",
      options: [
        { val: "A", text: "A. 12 cm" },
        { val: "B", text: "B. 11 cm" },
        { val: "C", text: "C. 10 cm" },
        { val: "D", text: "D. 14 cm" },
      ],
      correct: "A",
      expEn: "Same shape means the same ratio of width to height: $$\\frac{6}{9} = \\frac{8}{x}$$. Cross-multiply: $$6x = 72$$, so $$x = 12$$. Option B added 2 to both sides — that changes the shape.",
      expVn: "Cùng hình dạng nghĩa là cùng tỉ số rộng với cao: $$\\frac{6}{9} = \\frac{8}{x}$$. Nhân chéo: $$6x = 72$$, nên $$x = 12$$. Phương án B cộng 2 vào cả hai cạnh — làm đổi hình dạng.",
    },
    {
      id: "q8_mcq_convert_minutes",
      type: "mcq",
      title: "8. A movie is 210 minutes long. How long is that in hours?",
      options: [
        { val: "A", text: "A. 2.1 hours" },
        { val: "B", text: "B. 3 hours" },
        { val: "C", text: "C. 3.5 hours" },
        { val: "D", text: "D. 21 hours" },
      ],
      correct: "C",
      expEn: "60 minutes = 1 hour, so $$210 \\div 60 = 3.5$$ hours. Option A treats an hour as 100 minutes.",
      expVn: "60 phút = 1 giờ, nên $$210 \\div 60 = 3.5$$ giờ. Phương án A coi một giờ là 100 phút.",
    },
    {
      id: "q9_mcq_percent_ratio",
      type: "mcq",
      title: "9. In a class, 15 out of 60 students walk to school. What percent of the students walk?",
      options: [
        { val: "A", text: "A. 15%" },
        { val: "B", text: "B. 45%" },
        { val: "C", text: "C. 40%" },
        { val: "D", text: "D. 25%" },
      ],
      correct: "D",
      expEn: "A percent is a ratio out of 100: $$\\frac{15}{60} = \\frac{x}{100}$$. Cross-multiply: $$60x = 1500$$, so $$x = 25$$. Or simplify: $$\\frac{15}{60} = \\frac{1}{4} = 25\\%$$.",
      expVn: "Phần trăm là tỉ số trên 100: $$\\frac{15}{60} = \\frac{x}{100}$$. Nhân chéo: $$60x = 1500$$, nên $$x = 25$$. Hoặc rút gọn: $$\\frac{15}{60} = \\frac{1}{4} = 25\\%$$.",
    },
    {
      id: "q10_mcq_for_every",
      type: "mcq",
      title: "10. At a school, for every 3 boys there are 4 girls. If there are 21 boys, how many girls are there?",
      options: [
        { val: "A", text: "A. 22 girls" },
        { val: "B", text: "B. 28 girls" },
        { val: "C", text: "C. 24 girls" },
        { val: "D", text: "D. 84 girls" },
      ],
      correct: "B",
      expEn: "'For every 3 boys there are 4 girls' is the ratio 3:4. Set up $$\\frac{3}{4} = \\frac{21}{x}$$. Cross-multiply: $$3x = 84$$, so $$x = 28$$. Or: $$21 \\div 3 = 7$$ groups, and $$7 \\times 4 = 28$$ girls.",
      expVn: "'Cứ 3 nam thì có 4 nữ' là tỉ số 3:4. Lập $$\\frac{3}{4} = \\frac{21}{x}$$. Nhân chéo: $$3x = 84$$, nên $$x = 28$$. Hoặc: $$21 \\div 3 = 7$$ nhóm, và $$7 \\times 4 = 28$$ nữ.",
    },
  ],
};
