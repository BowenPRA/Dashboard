// src/data/GED_SCIENCE/SCI_0A/data.js
// SCI_0A — Reading Science: Data, Graphs & the Scientific Method. The spine of
// the GED Science test (GED-SPRINT.md §6): content-light, transfer-heavy. The
// student learns to name variables, judge a fair test, and read a graph's trend
// — skills every later Science module (and Social Studies) rides on.
// Source Analysis uses REAL public-domain charts (NASA, Scripps/NOAA) plus one
// authored experiment chart where we control the numbers (imagery-sourcing.md).
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

// Authored bar chart for a controlled experiment (we own the numbers, so the
// mark scheme is exact). Labels written out literally so audit:svg can see them.
const PLANT_EXPERIMENT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" class="w-full h-full">
  <rect x="0" y="0" width="520" height="390" fill="#ffffff" rx="10"/>
  <text x="260" y="26" font-family="sans-serif" font-size="20" font-weight="800" fill="#1e293b" text-anchor="middle">Plant Growth vs. Hours of Light</text>
  <line x1="64" y1="40" x2="64" y2="320" stroke="#334155" stroke-width="3"/>
  <line x1="64" y1="320" x2="505" y2="320" stroke="#334155" stroke-width="3"/>
  <rect x="92" y="288" width="70" height="32" fill="#4a8b23"/>
  <rect x="200" y="223" width="70" height="97" fill="#4a8b23"/>
  <rect x="308" y="141" width="70" height="179" fill="#4a8b23"/>
  <rect x="416" y="76" width="70" height="244" fill="#4a8b23"/>
  <text x="127" y="280" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">2 cm</text>
  <text x="235" y="215" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">6 cm</text>
  <text x="343" y="133" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">11 cm</text>
  <text x="451" y="68" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b" text-anchor="middle">15 cm</text>
  <text x="127" y="340" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">0</text>
  <text x="235" y="340" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">4</text>
  <text x="343" y="340" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">8</text>
  <text x="451" y="340" font-family="sans-serif" font-size="15" fill="#334155" text-anchor="middle">12</text>
  <text x="284" y="368" font-family="sans-serif" font-size="16" font-weight="700" fill="#334155" text-anchor="middle">Hours of light per day</text>
  <text x="22" y="180" font-family="sans-serif" font-size="16" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 22 180)">Plant height (cm)</text>
</svg>`;

export const GED_SCI_0A_DATA = {
  meta: {
    id: "SCI_0A",
    title: "Reading Science: Data & the Scientific Method",
    desc: "The reading skill the whole Science test rides on: name the variables in an experiment, judge whether a test is fair, and read the trend in a graph or table.",
    track: "GED_SCIENCE",
    icon: "FlaskConical",
  },

  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 },
      ],
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 20 },
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
      ],
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
      ],
    },
    {
      id: "arcade",
      title: "Arcade",
      threshold: 70,
      tasks: [
        { id: "GAMES", dbKey: "p12", maxXP: 0 }
      ]
    },
  ],

  realWords: [
    { word: "Hypothesis", vn: "Giả thuyết", def: "A testable prediction of what you think will happen, written before the experiment.", vnDef: "Một dự đoán có thể kiểm chứng về điều bạn nghĩ sẽ xảy ra, viết trước khi làm thí nghiệm.", sent: "Her hypothesis was that plants with more light would grow taller.", vnSent: "Giả thuyết của cô ấy là cây có nhiều ánh sáng hơn sẽ cao hơn.", isReal: true },
    { word: "Variable", vn: "Biến số", def: "Anything in an experiment that can change or be changed.", vnDef: "Bất cứ điều gì trong thí nghiệm có thể thay đổi hoặc bị thay đổi.", sent: "Light, water and temperature are all variables for a plant.", vnSent: "Ánh sáng, nước và nhiệt độ đều là biến số đối với một cái cây.", isReal: true },
    { word: "Independent variable", vn: "Biến độc lập", def: "The one thing the scientist changes on purpose.", vnDef: "Điều duy nhất mà nhà khoa học cố ý thay đổi.", sent: "The independent variable was the hours of light each plant received.", vnSent: "Biến độc lập là số giờ ánh sáng mỗi cây nhận được.", isReal: true },
    { word: "Dependent variable", vn: "Biến phụ thuộc", def: "The thing you measure to see the result.", vnDef: "Điều bạn đo để thấy kết quả.", sent: "The dependent variable was the height of each plant.", vnSent: "Biến phụ thuộc là chiều cao của mỗi cây.", isReal: true },
    { word: "Control", vn: "Đối chứng", def: "The parts kept the same for every trial, so the test is fair.", vnDef: "Những phần được giữ giống nhau cho mọi lần thử, để bài kiểm tra công bằng.", sent: "Giving every plant the same water is a control.", vnSent: "Cho mọi cây cùng lượng nước là một đối chứng.", isReal: true },
    { word: "Data", vn: "Dữ liệu", def: "The measurements and facts collected during an experiment.", vnDef: "Các số đo và dữ kiện thu thập được trong thí nghiệm.", sent: "She wrote all the data in a table.", vnSent: "Cô ấy ghi tất cả dữ liệu vào một bảng.", isReal: true },
    { word: "Trend", vn: "Xu hướng", def: "The general direction the data moves — up, down or steady.", vnDef: "Hướng chung mà dữ liệu di chuyển — lên, xuống hoặc ổn định.", sent: "The graph shows an upward trend over time.", vnSent: "Biểu đồ cho thấy xu hướng đi lên theo thời gian.", isReal: true },
    { word: "Axis", vn: "Trục", def: "One of the two labelled lines on a graph that tell you what is measured.", vnDef: "Một trong hai đường có nhãn trên biểu đồ cho biết đang đo cái gì.", sent: "Read the axis labels before reading any point on the graph.", vnSent: "Hãy đọc nhãn trục trước khi đọc bất kỳ điểm nào trên biểu đồ.", isReal: true },
    { word: "Evidence", vn: "Bằng chứng", def: "Data used to support or reject a conclusion.", vnDef: "Dữ liệu dùng để ủng hộ hoặc bác bỏ một kết luận.", sent: "The rising line is evidence that the plants grew.", vnSent: "Đường đi lên là bằng chứng rằng cây đã lớn lên.", isReal: true },
    { word: "Conclusion", vn: "Kết luận", def: "What the data shows, stated at the end of the experiment.", vnDef: "Điều dữ liệu cho thấy, nêu ra ở cuối thí nghiệm.", sent: "The conclusion was that more light led to taller plants.", vnSent: "Kết luận là nhiều ánh sáng hơn dẫn đến cây cao hơn.", isReal: true },
    { word: "Fair test", vn: "Thí nghiệm công bằng", def: "An experiment where only the independent variable changes; everything else is a control.", vnDef: "Một thí nghiệm trong đó chỉ có biến độc lập thay đổi; mọi thứ khác là đối chứng.", sent: "Changing two things at once ruins a fair test.", vnSent: "Thay đổi hai thứ cùng lúc làm hỏng một thí nghiệm công bằng.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "The Scientific Method",
      vnTitle: "Phương pháp Khoa học",
      meta: "How science answers a question",
      text: [
        "Science follows a repeatable path. It starts with a question about the world, such as \"does more light make a plant grow taller?\"",
        "Next comes a {hypothesis}: a testable prediction, written before you start. For example, \"I predict that plants given more light will grow taller.\" A hypothesis must be something an experiment could prove wrong.",
        "Then you run an experiment and collect {data} — the measurements you record. Finally you compare the data with your hypothesis and write a {conclusion}: what the data actually shows. The conclusion must follow from the evidence, even when it disagrees with what you expected.",
      ].join(" "),
      vnText: [
        "Khoa học đi theo một lộ trình có thể lặp lại. Nó bắt đầu bằng một câu hỏi về thế giới, chẳng hạn \"nhiều ánh sáng hơn có làm cây cao hơn không?\"",
        "Tiếp theo là giả thuyết: một dự đoán có thể kiểm chứng, viết trước khi bắt đầu. Ví dụ, \"Tôi dự đoán cây được cho nhiều ánh sáng hơn sẽ cao hơn.\" Một giả thuyết phải là điều mà thí nghiệm có thể chứng minh là sai.",
        "Sau đó bạn tiến hành thí nghiệm và thu thập dữ liệu — các số đo bạn ghi lại. Cuối cùng bạn so sánh dữ liệu với giả thuyết và viết kết luận: điều dữ liệu thực sự cho thấy. Kết luận phải rút ra từ bằng chứng, ngay cả khi nó trái với điều bạn mong đợi.",
      ].join(" "),
      glossary: {
        "hypothesis": { vn: "Giả thuyết", def: "A testable prediction written before the experiment." },
        "conclusion": { vn: "Kết luận", def: "What the data shows, stated at the end." },
      },
    },
    {
      id: "passage_2",
      title: "Variables and a Fair Test",
      vnTitle: "Biến số và Thí nghiệm Công bằng",
      meta: "Changing one thing at a time",
      text: [
        "An experiment has variables — things that can change. The {independent} variable is the one thing the scientist changes on purpose. The {dependent} variable is what they measure to see the result.",
        "Everything else must be kept the same. These kept-the-same parts are called {controls}. If a scientist gives plants different amounts of light but also different amounts of water, they cannot tell which change caused the result.",
        "That is why a fair test changes only the independent variable and controls the rest. On the test, a common question is: \"What was done wrong?\" The answer is often that more than one variable was changed at once.",
      ].join(" "),
      vnText: [
        "Một thí nghiệm có các biến số — những thứ có thể thay đổi. Biến độc lập là điều duy nhất nhà khoa học cố ý thay đổi. Biến phụ thuộc là điều họ đo để thấy kết quả.",
        "Mọi thứ khác phải được giữ nguyên. Những phần giữ nguyên này gọi là đối chứng. Nếu nhà khoa học cho cây lượng ánh sáng khác nhau nhưng cũng lượng nước khác nhau, họ không thể biết thay đổi nào gây ra kết quả.",
        "Đó là lý do một thí nghiệm công bằng chỉ thay đổi biến độc lập và giữ đối chứng phần còn lại. Trong bài thi, một câu hỏi phổ biến là: \"Điều gì đã làm sai?\" Câu trả lời thường là đã thay đổi nhiều hơn một biến cùng lúc.",
      ].join(" "),
      glossary: {
        "independent variable": { vn: "Biến độc lập", def: "The one thing the scientist changes on purpose." },
        "controls": { vn: "Đối chứng", def: "The parts kept the same for every trial." },
      },
    },
    {
      id: "passage_3",
      title: "Reading a Graph",
      vnTitle: "Đọc một Biểu đồ",
      meta: "Axes, values and trends",
      text: [
        "Most Science questions give you a graph and ask what it shows. Read it in order. First read the {title}, then read both {axis} labels — the two lines that tell you what is being measured and in what units.",
        "Next, read a single value: find a point, drop straight down to the bottom axis and across to the side axis. That tells you the exact numbers at that point.",
        "Finally, describe the {trend} — the overall direction. Is the line going up, going down, or staying flat as you move to the right? On the test, \"describe the trend\" almost never means list every number; it means say the direction in one clear sentence.",
      ].join(" "),
      vnText: [
        "Hầu hết câu hỏi Khoa học đưa cho bạn một biểu đồ và hỏi nó cho thấy điều gì. Hãy đọc theo thứ tự. Trước tiên đọc tiêu đề, rồi đọc nhãn của cả hai trục — hai đường cho biết đang đo cái gì và bằng đơn vị nào.",
        "Tiếp theo, đọc một giá trị đơn lẻ: tìm một điểm, kẻ thẳng xuống trục dưới và ngang sang trục bên. Điều đó cho bạn con số chính xác tại điểm đó.",
        "Cuối cùng, mô tả xu hướng — hướng chung. Đường đi lên, đi xuống, hay giữ phẳng khi bạn di chuyển sang phải? Trong bài thi, \"mô tả xu hướng\" gần như không bao giờ có nghĩa liệt kê mọi con số; nó có nghĩa nêu hướng trong một câu rõ ràng.",
      ].join(" "),
      glossary: {
        "axis": { vn: "Trục", def: "A labelled line on a graph telling you what is measured." },
        "trend": { vn: "Xu hướng", def: "The overall direction of the data." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "What is a hypothesis, and when do you write it?",
      suggestedWords: [["prediction", "predict"], ["before", "testable"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States a hypothesis is a testable prediction of what will happen.",
        "States it is written before the experiment begins.",
      ],
      modelAnswer: "A hypothesis is a testable prediction of what you think will happen in an experiment. You write it before you start, so the experiment can then show whether the prediction was right or wrong.",
      vnTranslation: "Giả thuyết là gì, và bạn viết nó khi nào?",
    },
    {
      id: "qa2",
      question: "Explain the difference between the independent variable and the dependent variable.",
      suggestedWords: [["change", "changed on purpose"], ["measure", "result"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States the independent variable is the one thing changed on purpose.",
        "States the dependent variable is what is measured to see the result.",
      ],
      modelAnswer: "The independent variable is the one thing the scientist changes on purpose, such as the hours of light. The dependent variable is what they measure to see the result, such as the height of the plant.",
      vnTranslation: "Giải thích sự khác biệt giữa biến độc lập và biến phụ thuộc.",
    },
    {
      id: "qa3",
      question: "Why must a scientist keep everything except the independent variable the same?",
      suggestedWords: [["fair test", "controls"], ["cause", "which change"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that keeping other variables the same (controls) makes it a fair test.",
        "Explains that otherwise you cannot tell which change caused the result.",
      ],
      modelAnswer: "Keeping everything else the same makes it a fair test. If more than one thing changes at once, you cannot tell which change caused the result, so the experiment would not prove anything.",
      vnTranslation: "Vì sao nhà khoa học phải giữ mọi thứ trừ biến độc lập giống nhau?",
    },
    {
      id: "qa4",
      question: "List the three things you should read on a graph, in order, before answering a question about it.",
      suggestedWords: [["title"], ["axis", "labels"], ["trend", "value"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Read the title first.",
        "Read both axis labels (what is measured and the units).",
        "Read a value and/or the overall trend.",
      ],
      modelAnswer: "First read the title to see what the graph is about. Second read both axis labels, so you know what each axis measures and in what units. Third read the values or the overall trend to answer the question.",
      vnTranslation: "Hãy liệt kê theo thứ tự ba điều cần đọc trên một biểu đồ trước khi trả lời câu hỏi về nó.",
    },
    {
      id: "qa5",
      question: "A student concludes \"plants love sunshine.\" Why is this a weak conclusion for a science experiment?",
      suggestedWords: [["measure", "data"], ["feeling", "cannot prove"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that 'love' is a feeling that cannot be measured or proven.",
        "States a good conclusion must be based on the measured data (e.g. plants with more light grew taller).",
      ],
      modelAnswer: "\"Love\" is a feeling that cannot be measured, so it is not something the data can support. A good conclusion sticks to what was measured — for example, \"plants that received more hours of light grew taller\" — because that follows directly from the evidence.",
      vnTranslation: "Một học sinh kết luận \"cây yêu ánh nắng.\" Vì sao đây là kết luận yếu cho một thí nghiệm khoa học?",
    },
  ],

  // Source Analysis: two REAL public-domain charts + one authored experiment
  // chart (we own its numbers, so the mark scheme is exact). 2 MCQ : 1 written.
  diagrams: [
    {
      id: "diag_1_global_temp",
      type: "mcq",
      // credit: Global temperature anomaly (NASA GISS data) — Wikimedia Commons,
      // public domain.
      imageFile: "global_temperature.png",
      imageAlt: "A line graph of global average temperature difference from 1880 to about 2010, rising overall, especially after 1970.",
      credit: "Global temperature anomaly (NASA GISS data) — Wikimedia, public domain",
      license: "Public domain",
      promptText: "This graph shows how Earth's average temperature has changed since 1880. The bottom axis is the year; the side axis is how far above or below the long-term average each year was. What is the overall TREND?",
      options: [
        { val: "A", text: "Temperature has risen overall, especially in recent decades.", textVn: "Nhiệt độ nhìn chung đã tăng, nhất là trong các thập kỷ gần đây." },
        { val: "B", text: "Temperature has fallen steadily every year.", textVn: "Nhiệt độ giảm đều đặn mỗi năm." },
        { val: "C", text: "Temperature has stayed exactly the same.", textVn: "Nhiệt độ giữ y hệt không đổi." },
        { val: "D", text: "The graph shows rainfall, not temperature.", textVn: "Biểu đồ cho thấy lượng mưa, không phải nhiệt độ." },
      ],
      correct: "A",
      marks: 1,
      expEn: "A trend is the overall direction, not each wiggle. The line moves upward across the whole graph and climbs fastest after about 1970, so the trend is rising.",
      expVn: "Xu hướng là hướng chung, không phải từng dao động. Đường đi lên trên toàn biểu đồ và tăng nhanh nhất sau khoảng năm 1970, nên xu hướng là đang tăng.",
    },
    {
      id: "diag_2_plant_experiment",
      type: "mcq",
      inlineSvg: PLANT_EXPERIMENT_SVG,
      imageAlt: "A bar chart: plants given 0, 4, 8 and 12 hours of light grew to 2, 6, 11 and 15 cm.",
      promptText: "In this experiment, four plants were given different hours of light and their height was measured. Everything else (water, soil, pot) was kept the same. What is the INDEPENDENT variable — the one thing that was changed on purpose?",
      options: [
        { val: "A", text: "The hours of light per day.", textVn: "Số giờ ánh sáng mỗi ngày." },
        { val: "B", text: "The height of the plant.", textVn: "Chiều cao của cây." },
        { val: "C", text: "The amount of water.", textVn: "Lượng nước." },
        { val: "D", text: "The type of soil.", textVn: "Loại đất." },
      ],
      correct: "A",
      marks: 1,
      expEn: "The independent variable is the one thing changed on purpose — here, the hours of light. Height is the dependent variable (what was measured); water and soil were kept the same, so they are controls.",
      expVn: "Biến độc lập là điều duy nhất được cố ý thay đổi — ở đây là số giờ ánh sáng. Chiều cao là biến phụ thuộc (điều được đo); nước và đất được giữ nguyên, nên chúng là đối chứng.",
    },
    {
      id: "diag_3_co2_curve",
      // credit: "Mauna Loa Carbon Dioxide" (Keeling Curve) — Wikimedia Commons,
      // CC0 (public-domain dedication).
      imageFile: "co2_keeling_curve.png",
      imageAlt: "A line graph of atmospheric carbon dioxide measured at Mauna Loa, rising steadily from the late 1950s with a small yearly zigzag.",
      credit: "Mauna Loa CO₂ (Keeling Curve) — Wikimedia, CC0",
      license: "CC0",
      promptText: "This graph shows the amount of carbon dioxide in the air, measured every year since the late 1950s at Mauna Loa. Describe the overall TREND, and explain how you can read that trend even though the line has a small up-and-down zigzag every year.",
      suggestedWords: [["rising", "increasing", "up"], ["trend", "overall"], ["zigzag", "seasonal", "small"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Reads the trend: the amount of carbon dioxide has risen steadily over the whole period.",
        "Explains that the trend is the overall direction, read across the whole graph, not year to year.",
        "Notes the small yearly zigzag is a repeating seasonal change that does not stop the long-term rise.",
      ],
      modelAnswer: "The overall trend is a steady rise: the amount of carbon dioxide in the air has increased year after year since the late 1950s. You read the trend by looking at the whole graph from left to right, not at any single step. The small zigzag is a seasonal pattern that repeats every year, but each peak and dip is higher than the one before, so the long-term direction is clearly upward.",
      vnTranslation: "Biểu đồ này cho thấy lượng carbon dioxide trong không khí, đo hằng năm từ cuối thập niên 1950 tại Mauna Loa. Mô tả XU HƯỚNG chung, và giải thích làm sao đọc được xu hướng dù đường có hình răng cưa lên xuống nhỏ mỗi năm.",
    },
  ],

  assessment,
  games,
  notes,
};
