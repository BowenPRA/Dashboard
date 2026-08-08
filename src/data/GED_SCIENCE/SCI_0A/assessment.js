// src/data/GED_SCIENCE/SCI_0A/assessment.js
// Timed mixed check for Reading Science. Skill-based items, bilingual
// explanations on every question.

export const assessment = {
  timeLimit: 2700, // 45 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_hypothesis",
      type: "mcq",
      title: "1. Which of these is a good hypothesis?",
      options: [
        { val: "A", text: "A. Science is interesting." },
        { val: "B", text: "B. Plants given more light will grow taller." },
        { val: "C", text: "C. What happens if I add salt?" },
        { val: "D", text: "D. I like tall plants." },
      ],
      correct: "B",
      expEn: "A hypothesis is a testable prediction. Option B predicts a result an experiment could prove right or wrong. A is an opinion, C is a question, and D is a preference.",
      expVn: "Giả thuyết là một dự đoán có thể kiểm chứng. Phương án B dự đoán một kết quả mà thí nghiệm có thể chứng minh đúng hay sai. A là ý kiến, C là câu hỏi, D là sở thích.",
    },
    {
      id: "q2_mcq_independent",
      type: "mcq",
      title: "2. A scientist tests how temperature affects how fast sugar dissolves. What is the INDEPENDENT variable?",
      options: [
        { val: "A", text: "A. The temperature of the water" },
        { val: "B", text: "B. The time taken to dissolve" },
        { val: "C", text: "C. The type of cup" },
        { val: "D", text: "D. The amount of sugar" },
      ],
      correct: "A",
      expEn: "The independent variable is the one thing changed on purpose — the temperature. The time to dissolve is measured (dependent); cup and sugar amount should be kept the same (controls).",
      expVn: "Biến độc lập là điều duy nhất được cố ý thay đổi — nhiệt độ. Thời gian tan được đo (phụ thuộc); loại cốc và lượng đường nên giữ nguyên (đối chứng).",
    },
    {
      id: "q3_mcq_dependent",
      type: "mcq",
      title: "3. In the same experiment, what is the DEPENDENT variable — the thing measured?",
      options: [
        { val: "A", text: "A. The temperature of the water" },
        { val: "B", text: "B. The color of the sugar" },
        { val: "C", text: "C. The size of the spoon" },
        { val: "D", text: "D. The time taken to dissolve" },
      ],
      correct: "D",
      expEn: "The dependent variable is what you measure to see the result — the time it takes to dissolve. It 'depends on' the temperature you set.",
      expVn: "Biến phụ thuộc là điều bạn đo để thấy kết quả — thời gian tan. Nó 'phụ thuộc vào' nhiệt độ bạn đặt.",
    },
    {
      id: "q4_inline_fair_test",
      type: "inline",
      title: "4. Complete the sentence about a fair test.",
      options: [],
      textParts: [
        "In a fair test, only the ",
        " variable is changed, and everything else is kept the same as a ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "independent",
          options: [
            { val: "independent", text: "independent" },
            { val: "dependent", text: "dependent" },
          ],
        },
        "2": {
          correct: "control",
          options: [
            { val: "control", text: "control" },
            { val: "trend", text: "trend" },
            { val: "hypothesis", text: "hypothesis" },
          ],
        },
      },
      expEn: "Change one thing (the independent variable), keep the rest the same (controls). That is what makes the test fair.",
      expVn: "Thay đổi một thứ (biến độc lập), giữ phần còn lại giống nhau (đối chứng). Đó là điều làm cho thí nghiệm công bằng.",
    },
    {
      id: "q5_mcq_unfair",
      type: "mcq",
      title: "5. A student waters Plant A more AND gives it more light than Plant B. Why can't they trust the result?",
      options: [
        { val: "A", text: "A. Plants don't respond to light" },
        { val: "B", text: "B. They used too many plants" },
        { val: "C", text: "C. Two variables changed, so you can't tell which caused the difference" },
        { val: "D", text: "D. Nothing is wrong with the experiment" },
      ],
      correct: "C",
      expEn: "Changing two variables at once breaks the fair test. If Plant A does better, you cannot tell whether the extra water or the extra light was responsible.",
      expVn: "Thay đổi hai biến cùng lúc phá vỡ thí nghiệm công bằng. Nếu Cây A tốt hơn, bạn không thể biết nước thêm hay ánh sáng thêm là nguyên nhân.",
    },
    {
      id: "q6_mcq_trend",
      type: "mcq",
      title: "6. A line graph of ice cream sales rises from winter to summer, then falls again toward winter. What is the trend?",
      options: [
        { val: "A", text: "A. Sales stay exactly the same all year" },
        { val: "B", text: "B. Sales rise toward summer and fall toward winter" },
        { val: "C", text: "C. Sales only ever go up" },
        { val: "D", text: "D. The graph shows rainfall" },
      ],
      correct: "B",
      expEn: "The trend is the overall pattern: sales climb as the weather warms and drop as it cools. Describing a trend means stating the direction, not every point.",
      expVn: "Xu hướng là mô hình chung: doanh số tăng khi thời tiết ấm lên và giảm khi lạnh đi. Mô tả xu hướng nghĩa là nêu hướng, không phải từng điểm.",
    },
    {
      id: "q7_mcq_axis",
      type: "mcq",
      title: "7. Before reading any point on a graph, you should first read the —",
      options: [
        { val: "A", text: "A. price of the book" },
        { val: "B", text: "B. last page" },
        { val: "C", text: "C. title and both axis labels" },
        { val: "D", text: "D. author's opinion" },
      ],
      correct: "C",
      expEn: "The title tells you the subject and the axis labels tell you what each direction measures and in what units. Without them, a point on the graph has no meaning.",
      expVn: "Tiêu đề cho biết chủ đề và nhãn trục cho biết mỗi hướng đo gì và bằng đơn vị nào. Không có chúng, một điểm trên biểu đồ chẳng có ý nghĩa.",
    },
    {
      id: "q8_mcq_data_vs_conclusion",
      type: "mcq",
      title: "8. Which statement is DATA (a measurement), not a conclusion?",
      options: [
        { val: "A", text: "A. The plant grew to 15 cm in two weeks" },
        { val: "B", text: "B. Light is good for plants" },
        { val: "C", text: "C. Plants love the sun" },
        { val: "D", text: "D. This was a great experiment" },
      ],
      correct: "A",
      expEn: "Data is a recorded measurement, like a height in centimetres. The others are conclusions or opinions drawn from data, not the measurement itself.",
      expVn: "Dữ liệu là một số đo được ghi lại, như chiều cao tính bằng cm. Các câu khác là kết luận hoặc ý kiến rút ra từ dữ liệu, không phải bản thân số đo.",
    },
    {
      id: "q9_inline_method",
      type: "inline",
      title: "9. Complete the order of the scientific method.",
      options: [],
      textParts: [
        "You write a ",
        " before the experiment, then collect ",
        " during it, and write a conclusion at the end.",
      ],
      blanks: {
        "1": {
          correct: "hypothesis",
          options: [
            { val: "hypothesis", text: "hypothesis" },
            { val: "conclusion", text: "conclusion" },
            { val: "trend", text: "trend" },
          ],
        },
        "2": {
          correct: "data",
          options: [
            { val: "data", text: "data" },
            { val: "opinions", text: "opinions" },
            { val: "axes", text: "axes" },
          ],
        },
      },
      expEn: "Hypothesis first (a prediction), then data (measurements) during the experiment, then the conclusion at the end.",
      expVn: "Giả thuyết trước (một dự đoán), rồi dữ liệu (số đo) trong khi làm, rồi kết luận ở cuối.",
    },
    {
      id: "q10_mcq_conclusion",
      type: "mcq",
      title: "10. An experiment's data shows plants with more light grew taller. Which is the BEST conclusion?",
      options: [
        { val: "A", text: "A. Plants are happy in the sun" },
        { val: "B", text: "B. Sunlight is the most beautiful thing" },
        { val: "C", text: "C. Everyone should grow plants" },
        { val: "D", text: "D. More light led to taller plant growth" },
      ],
      correct: "D",
      expEn: "A good conclusion states only what the data shows. B sticks to the measured result. The others add feelings or advice the data cannot support.",
      expVn: "Một kết luận tốt chỉ nêu điều dữ liệu cho thấy. B bám sát kết quả đo được. Các câu khác thêm cảm xúc hoặc lời khuyên mà dữ liệu không thể ủng hộ.",
    },
  ],
};
