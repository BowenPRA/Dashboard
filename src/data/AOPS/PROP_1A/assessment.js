// src/data/AOPS/PROP_1A/assessment.js
// Timed check for Direct Proportion. Mostly MCQ with one inline fill, bilingual
// explanation on every item. NOTE: Assessment.jsx renders maths only inside
// $$...$$ (double dollar); a single $ is literal, which is what keeps plain
// units like "km/h" and plain numbers rendering correctly. So real maths
// (fractions, division) goes in $$...$$ and everything else stays plain text.

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_definition",
      type: "mcq",
      title: "1. \"y is directly proportional to x\" means which of the following?",
      options: [
        { val: "A", text: "A. y and x always add up to the same total" },
        { val: "B", text: "B. y divided by x is always the same number" },
        { val: "C", text: "C. y multiplied by x is always the same number" },
        { val: "D", text: "D. y is always bigger than x" },
      ],
      correct: "B",
      expEn: "Direct proportion means the quotient is constant: $$\\frac{y}{x} = k$$, which is the same as $$y = kx$$. Option C describes INVERSE proportion, where the product stays the same.",
      expVn: "Tỉ lệ thuận nghĩa là thương không đổi: $$\\frac{y}{x} = k$$, cũng chính là $$y = kx$$. Đáp án C mô tả tỉ lệ NGHỊCH, khi tích không đổi.",
    },
    {
      id: "q2_mcq_find_k",
      type: "mcq",
      title: "2. y is directly proportional to x, and y = 24 when x = 6. What is the constant k?",
      options: [
        { val: "A", text: "A. 144" },
        { val: "B", text: "B. 18" },
        { val: "C", text: "C. 4" },
        { val: "D", text: "D. 0.25" },
      ],
      correct: "C",
      expEn: "$$k = \\frac{y}{x} = \\frac{24}{6} = 4$$. Option D is what you get by dividing the wrong way round, x by y.",
      expVn: "$$k = \\frac{y}{x} = \\frac{24}{6} = 4$$. Đáp án D là kết quả khi chia ngược, lấy x chia y.",
    },
    {
      id: "q3_mcq_use_rule",
      type: "mcq",
      title: "3. A rule says y = 7x. What is y when x = 9?",
      options: [
        { val: "A", text: "A. 63" },
        { val: "B", text: "B. 16" },
        { val: "C", text: "C. 7" },
        { val: "D", text: "D. 79" },
      ],
      correct: "A",
      expEn: "Substitute the value straight into the rule: $$y = 7 \\times 9 = 63$$. Option B adds instead of multiplying.",
      expVn: "Thay giá trị thẳng vào quy tắc: $$y = 7 \\times 9 = 63$$. Đáp án B là cộng thay vì nhân.",
    },
    {
      id: "q4_mcq_graph",
      type: "mcq",
      title: "4. Which straight-line graph shows y directly proportional to x?",
      options: [
        { val: "A", text: "A. A line that crosses the y-axis at 2" },
        { val: "B", text: "B. A line that crosses the y-axis at 5" },
        { val: "C", text: "C. A horizontal line at y = 3" },
        { val: "D", text: "D. A line that passes through the point (0, 0)" },
      ],
      correct: "D",
      expEn: "Put x = 0 into $$y = kx$$ and you always get y = 0, so the graph of a direct proportion must pass through the origin. Any line that crosses the y-axis somewhere else is not a proportion.",
      expVn: "Thay x = 0 vào $$y = kx$$ thì luôn được y = 0, nên đồ thị của tỉ lệ thuận bắt buộc phải đi qua gốc tọa độ. Bất kỳ đường thẳng nào cắt trục y ở chỗ khác đều không phải tỉ lệ thuận.",
    },
    {
      id: "q5_mcq_inverse_work",
      type: "mcq",
      title: "5. Eight workers finish a job in 6 days. Working at the same rate, how long would 12 workers take?",
      options: [
        { val: "A", text: "A. 9 days" },
        { val: "B", text: "B. 4 days" },
        { val: "C", text: "C. 2 days" },
        { val: "D", text: "D. 6 days" },
      ],
      correct: "B",
      expEn: "Workers and time are inversely proportional, so the product is constant: $$8 \\times 6 = 48$$ worker-days. Then $$48 \\div 12 = 4$$ days. More workers must mean fewer days, so option A cannot be right.",
      expVn: "Số công nhân và thời gian tỉ lệ nghịch, nên tích không đổi: $$8 \\times 6 = 48$$ ngày-công. Rồi $$48 \\div 12 = 4$$ ngày. Nhiều công nhân hơn thì phải ít ngày hơn, nên đáp án A không thể đúng.",
    },
    {
      id: "q6_mcq_square",
      type: "mcq",
      title: "6. y is directly proportional to x squared. If x is doubled, what happens to y?",
      options: [
        { val: "A", text: "A. It stays the same" },
        { val: "B", text: "B. It is doubled" },
        { val: "C", text: "C. It is multiplied by 4" },
        { val: "D", text: "D. It is halved" },
      ],
      correct: "C",
      expEn: "The rule is $$y = kx^2$$. Replacing x with 2x gives $$k(2x)^2 = 4kx^2$$, so y is multiplied by 4. The factor gets squared as well.",
      expVn: "Quy tắc là $$y = kx^2$$. Thay x bằng 2x được $$k(2x)^2 = 4kx^2$$, nên y được nhân với 4. Hệ số cũng bị bình phương.",
    },
    {
      id: "q7_mcq_downstream",
      type: "mcq",
      title: "7. A swimmer moves at 5 km/h in still water. The river flows at 2 km/h. How fast does the swimmer travel DOWNSTREAM (with the stream)?",
      options: [
        { val: "A", text: "A. 7 km/h" },
        { val: "B", text: "B. 3 km/h" },
        { val: "C", text: "C. 5 km/h" },
        { val: "D", text: "D. 10 km/h" },
      ],
      correct: "A",
      expEn: "Going with the stream, the current pushes the swimmer along, so the speeds add: $$5 + 2 = 7$$ km/h. Option B is the upstream speed.",
      expVn: "Bơi xuôi dòng, dòng nước đẩy người bơi đi, nên các vận tốc cộng lại: $$5 + 2 = 7$$ km/h. Đáp án B là vận tốc ngược dòng.",
    },
    {
      id: "q8_mcq_upstream_time",
      type: "mcq",
      title: "8. That same swimmer travels 3 km/h against the stream. How long does it take to swim 12 km upstream?",
      options: [
        { val: "A", text: "A. 36 hours" },
        { val: "B", text: "B. 9 hours" },
        { val: "C", text: "C. 15 hours" },
        { val: "D", text: "D. 4 hours" },
      ],
      correct: "D",
      expEn: "Distance = speed × time, so time = distance ÷ speed: $$12 \\div 3 = 4$$ hours. Option A multiplies instead of dividing.",
      expVn: "Quãng đường = vận tốc × thời gian, nên thời gian = quãng đường ÷ vận tốc: $$12 \\div 3 = 4$$ giờ. Đáp án A là nhân thay vì chia.",
    },
    {
      id: "q9_inline_rules",
      type: "inline",
      title: "9. Complete the two rules.",
      options: [],
      textParts: [
        "If y is DIRECTLY proportional to x, then the quantity that stays constant is ",
        ". If y is INVERSELY proportional to x, then the quantity that stays constant is ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "y / x",
          options: [
            { val: "y / x", text: "y / x" },
            { val: "x * y", text: "x * y" },
            { val: "y - x", text: "y - x" },
          ],
        },
        "2": {
          correct: "x * y",
          options: [
            { val: "x * y", text: "x * y" },
            { val: "y / x", text: "y / x" },
            { val: "y + x", text: "y + x" },
          ],
        },
      },
      expEn: "Direct proportion keeps the QUOTIENT constant: $$\\frac{y}{x} = k$$. Inverse proportion keeps the PRODUCT constant: $$xy = k$$. Divide to test for direct, multiply to test for inverse.",
      expVn: "Tỉ lệ thuận giữ THƯƠNG không đổi: $$\\frac{y}{x} = k$$. Tỉ lệ nghịch giữ TÍCH không đổi: $$xy = k$$. Chia để kiểm tra tỉ lệ thuận, nhân để kiểm tra tỉ lệ nghịch.",
    },
    {
      id: "q10_mcq_negative_k",
      type: "mcq",
      title: "10. A rule says y = -3x. What is y when x = 4?",
      options: [
        { val: "A", text: "A. 12" },
        { val: "B", text: "B. -12" },
        { val: "C", text: "C. 1" },
        { val: "D", text: "D. -1" },
      ],
      correct: "B",
      expEn: "$$y = -3 \\times 4 = -12$$. The constant k is allowed to be negative — it is still a direct proportion, but as x grows, y falls, so the graph is a line sloping downwards through the origin.",
      expVn: "$$y = -3 \\times 4 = -12$$. Hằng số k được phép mang dấu âm — đó vẫn là tỉ lệ thuận, nhưng khi x tăng thì y giảm, nên đồ thị là đường thẳng dốc xuống đi qua gốc tọa độ.",
    },
  ],
};
