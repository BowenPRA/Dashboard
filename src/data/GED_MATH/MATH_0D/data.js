// src/data/GED_MATH/MATH_0D/data.js
// MATH_0D — Data, Statistics & Probability. Quantitative reasoning: averages,
// graph reading and simple probability. Re-levelled from the Y9 correlation unit
// for an adult ESL learner. Math shape without BALANCE (nothing to solve for x):
// the Drill is the WORKBOOK, and Source Analysis is authored SVG — we control the
// numbers, so every answer is exact and all items are MCQ (no English tax).
import { DIAGRAMS } from './diagrams.js';
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';

export const MATH_0D_DATA = {
  meta: {
    id: "MATH_0D",
    title: "Data, Statistics & Probability",
    desc: "Mean, median, mode and range; reading bar, line, circle and scatter graphs; and simple probability — the graph-reading skills the test hands you on a plate.",
    track: "GED_MATH",
    icon: "BarChart3",
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
      // WORKBOOK is the whole drill (40 XP). BALANCE is skipped — this is a
      // data unit, not an equation unit.
      tasks: [
        { id: "WORKBOOK", dbKey: "p11", maxXP: 40 },
      ],
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
      ],
    },
  ],

  realWords: [
    { word: "Mean", vn: "Trung bình cộng", def: "The average: add all the values, then divide by how many there are.", vnDef: "Số trung bình: cộng tất cả giá trị, rồi chia cho số lượng giá trị.", sent: "The mean of 4, 8 and 9 is 7.", vnSent: "Trung bình cộng của 4, 8 và 9 là 7.", isReal: true },
    { word: "Median", vn: "Trung vị", def: "The middle value when the numbers are put in order.", vnDef: "Giá trị ở giữa khi các số được sắp xếp theo thứ tự.", sent: "Put the scores in order to find the median.", vnSent: "Sắp xếp các điểm số theo thứ tự để tìm trung vị.", isReal: true },
    { word: "Mode", vn: "Mốt", def: "The value that appears most often in a set of data.", vnDef: "Giá trị xuất hiện nhiều nhất trong một tập dữ liệu.", sent: "Size 8 is the mode because most customers bought it.", vnSent: "Cỡ 8 là mốt vì hầu hết khách hàng mua cỡ đó.", isReal: true },
    { word: "Range", vn: "Khoảng biến thiên", def: "The largest value minus the smallest value.", vnDef: "Giá trị lớn nhất trừ giá trị nhỏ nhất.", sent: "The range of 3, 10 and 15 is 12.", vnSent: "Khoảng biến thiên của 3, 10 và 15 là 12.", isReal: true },
    { word: "Outlier", vn: "Giá trị ngoại lai", def: "A value that is far away from all the others; it pulls the mean.", vnDef: "Một giá trị cách xa tất cả các giá trị khác; nó kéo trung bình cộng.", sent: "The $2 million house is an outlier on this street.", vnSent: "Căn nhà 2 triệu đô là giá trị ngoại lai trên con phố này.", isReal: true },
    { word: "Trend", vn: "Xu hướng", def: "The general direction that data moves over time — up, down or flat.", vnDef: "Hướng chung mà dữ liệu di chuyển theo thời gian — lên, xuống hoặc đi ngang.", sent: "The line graph shows an upward trend in sales.", vnSent: "Biểu đồ đường cho thấy xu hướng tăng của doanh số.", isReal: true },
    { word: "Correlation", vn: "Tương quan", def: "A connection between two things, seen as a pattern of dots on a scatter plot.", vnDef: "Mối liên hệ giữa hai thứ, thể hiện qua quy luật của các chấm trên biểu đồ phân tán.", sent: "There is a positive correlation between study time and test scores.", vnSent: "Có tương quan dương giữa thời gian học và điểm thi.", isReal: true },
    { word: "Probability", vn: "Xác suất", def: "The chance that something will happen, from 0 (never) to 1 (certain).", vnDef: "Khả năng một điều gì đó xảy ra, từ 0 (không bao giờ) đến 1 (chắc chắn).", sent: "The probability of a coin landing heads is one half.", vnSent: "Xác suất đồng xu ngửa là một phần hai.", isReal: true },
    { word: "Outcome", vn: "Kết quả", def: "One possible result of an event, like rolling a 6.", vnDef: "Một kết quả có thể có của một biến cố, như gieo được số 6.", sent: "A die has six possible outcomes.", vnSent: "Một con xúc xắc có sáu kết quả có thể xảy ra.", isReal: true },
    { word: "Axis", vn: "Trục", def: "One of the two number lines on a graph; the horizontal and vertical edges you read values from.", vnDef: "Một trong hai đường số trên biểu đồ; cạnh ngang và cạnh dọc mà bạn đọc giá trị từ đó.", sent: "Check whether the vertical axis starts at zero.", vnSent: "Kiểm tra xem trục dọc có bắt đầu từ số 0 không.", isReal: true },
  ],

  // Source Analysis — authored SVG graphs, all MCQ. Every value shown in the
  // picture is also stated in the explanation, so the key is exact.
  diagrams: [
    {
      id: "diag_1_bar_compare",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_BAR,
      imageAlt: "A bar graph of cars sold each month: January 20, February 35, March 25, April 40.",
      promptText: "The bar graph shows cars sold each month. How many MORE cars were sold in April than in January?",
      options: [
        { val: "A", text: "40", textVn: "40" },
        { val: "B", text: "60", textVn: "60" },
        { val: "C", text: "5", textVn: "5" },
        { val: "D", text: "20", textVn: "20" },
      ],
      correct: "D",
      marks: 1,
      expEn: "Read the two bars: April is 40 and January is 20. \"How many more\" means subtract: 40 − 20 = 20. (60 is the two months added together.)",
      expVn: "Đọc hai cột: Tháng Tư là 40 và Tháng Một là 20. \"Nhiều hơn bao nhiêu\" nghĩa là trừ: 40 − 20 = 20. (60 là hai tháng cộng lại.)",
    },
    {
      id: "diag_2_bar_mean",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_BAR,
      imageAlt: "A bar graph of cars sold each month: January 20, February 35, March 25, April 40.",
      promptText: "Using the same bar graph, what is the MEAN number of cars sold per month?",
      options: [
        { val: "A", text: "30", textVn: "30" },
        { val: "B", text: "120", textVn: "120" },
        { val: "C", text: "25", textVn: "25" },
        { val: "D", text: "35", textVn: "35" },
      ],
      correct: "A",
      marks: 1,
      expEn: "Add the four bars: 20 + 35 + 25 + 40 = 120. Divide by the number of months, 4: 120 ÷ 4 = 30. (120 is only the total.)",
      expVn: "Cộng bốn cột: 20 + 35 + 25 + 40 = 120. Chia cho số tháng, 4: 120 ÷ 4 = 30. (120 chỉ là tổng.)",
    },
    {
      id: "diag_3_line_trend",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_LINE,
      imageAlt: "A line graph of noon temperature in degrees Fahrenheit: Monday 60, Tuesday 64, Wednesday 70, Thursday 66, Friday 74.",
      promptText: "The line graph shows the temperature at noon from Monday to Friday. Which statement best describes the trend?",
      options: [
        { val: "A", text: "The temperature went up every single day.", textVn: "Nhiệt độ tăng mỗi ngày." },
        { val: "B", text: "The temperature went down over the week.", textVn: "Nhiệt độ giảm trong tuần." },
        { val: "C", text: "The temperature rose over the week, with one drop on Thursday.", textVn: "Nhiệt độ tăng trong tuần, với một lần giảm vào Thứ Năm." },
        { val: "D", text: "The temperature stayed the same all week.", textVn: "Nhiệt độ giữ nguyên cả tuần." },
      ],
      correct: "C",
      marks: 1,
      expEn: "Read the points: 60, 64, 70, 66, 74. The line ends higher than it starts, so the overall trend is up — but Thursday (66) is lower than Wednesday (70), so it did not rise every day.",
      expVn: "Đọc các điểm: 60, 64, 70, 66, 74. Đường kết thúc cao hơn lúc bắt đầu, nên xu hướng chung là tăng — nhưng Thứ Năm (66) thấp hơn Thứ Tư (70), nên không phải ngày nào cũng tăng.",
    },
    {
      id: "diag_4_scatter",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_SCATTER,
      imageAlt: "A scatter plot of hours studied against test score. The dots rise from about 55 at 1 hour to about 95 at 7 hours, with a dashed line of best fit going up to the right.",
      promptText: "The scatter plot shows hours studied and test scores for nine students. What does the pattern of dots show?",
      options: [
        { val: "A", text: "A negative correlation — more study, lower scores.", textVn: "Tương quan âm — học nhiều hơn, điểm thấp hơn." },
        { val: "B", text: "A positive correlation — more study, higher scores.", textVn: "Tương quan dương — học nhiều hơn, điểm cao hơn." },
        { val: "C", text: "No correlation — the dots have no pattern.", textVn: "Không tương quan — các chấm không có quy luật." },
        { val: "D", text: "Every student scored the same.", textVn: "Mọi học sinh có điểm bằng nhau." },
      ],
      correct: "B",
      marks: 1,
      expEn: "The dots go up to the right: students who studied more hours scored higher. The dashed line of best fit rises, which is a positive correlation.",
      expVn: "Các chấm đi lên bên phải: học sinh học nhiều giờ hơn có điểm cao hơn. Đường xu hướng nét đứt đi lên, đó là tương quan dương.",
    },
    {
      id: "diag_5_pie_amount",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_PIE,
      imageAlt: "A circle graph of a $2,000 monthly budget: Rent 50%, Food 25%, Transport 15%, Savings 10%.",
      promptText: "The circle graph shows how Lan spends her $2,000 monthly budget. How much money does she spend on FOOD?",
      options: [
        { val: "A", text: "$25", textVn: "25 đô la" },
        { val: "B", text: "$250", textVn: "250 đô la" },
        { val: "C", text: "$500", textVn: "500 đô la" },
        { val: "D", text: "$1,000", textVn: "1.000 đô la" },
      ],
      correct: "C",
      marks: 1,
      expEn: "Food is 25% of the whole. 25% is one quarter, so $2,000 ÷ 4 = $500. (Or 0.25 × 2,000 = 500.) $1,000 is the rent slice, 50%.",
      expVn: "Ăn uống là 25% của tổng. 25% là một phần tư, nên 2.000 ÷ 4 = 500 đô la. (Hoặc 0,25 × 2.000 = 500.) 1.000 đô la là phần tiền nhà, 50%.",
    },
  ],

  workbook,
  assessment,
  notes,
};
