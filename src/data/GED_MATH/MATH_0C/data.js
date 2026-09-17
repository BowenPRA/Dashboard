// src/data/GED_MATH/MATH_0C/data.js
// MATH_0C — Ratios, Proportions & Rates. The highest-frequency word-problem
// type on the GED Math test, and the one where the English ("per", "for every",
// "out of", "at this rate") is the real barrier for an ESL student. Standard
// GED_MATH shape: Learn (NOTES + WORD_REC) → Drill (WORKBOOK + BALANCE, the
// equations being the ones proportions produce) → Prove (Source Analysis, all
// MCQ over authored SVG, + a timed Assessment). No prose task — maths carries
// no English tax.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { balance } from './balance.js';
import { DIAGRAMS } from './diagrams.js';

export const MATH_0C_DATA = {
  meta: {
    id: "MATH_0C",
    title: "Ratios, Proportions & Rates",
    desc: "Compare two quantities, keep them in proportion, and find the rate for ONE — the word-problem skill the GED Math test asks for again and again.",
    track: "GED_MATH",
    icon: "Scale",
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
      // WORKBOOK is the drill engine; BALANCE solves the linear equations that
      // cross-multiplying a proportion produces (3x = 84 from 3/12 = 7/x).
      tasks: [
        { id: "WORKBOOK", dbKey: "p11", maxXP: 25 },
        { id: "BALANCE", dbKey: "p14", maxXP: 15 },
      ],
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45, // 60 XP before it → cap 48
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
      ],
    },
  ],

  realWords: [
    { word: "Ratio", vn: "Tỉ số", def: "A comparison of two quantities, written as 3 to 4, 3:4, or 3/4.", vnDef: "Phép so sánh hai lượng, viết là 3 với 4, 3:4, hoặc 3/4.", sent: "The ratio of boys to girls in the class is 3 to 4.", vnSent: "Tỉ số nam với nữ trong lớp là 3 với 4.", isReal: true },
    { word: "Proportion", vn: "Tỉ lệ thức", def: "A statement that two ratios are equal, such as 3/12 = 7/28.", vnDef: "Một phát biểu rằng hai tỉ số bằng nhau, chẳng hạn 3/12 = 7/28.", sent: "Set up a proportion to find the cost of 7 tickets.", vnSent: "Lập một tỉ lệ thức để tìm giá của 7 vé.", isReal: true },
    { word: "Rate", vn: "Mức (tốc độ)", def: "A ratio that compares two different kinds of units, like miles and hours.", vnDef: "Một tỉ số so sánh hai loại đơn vị khác nhau, như dặm và giờ.", sent: "The car travelled at a rate of 60 miles per hour.", vnSent: "Chiếc xe chạy với tốc độ 60 dặm mỗi giờ.", isReal: true },
    { word: "Unit rate", vn: "Đơn giá (mức cho một đơn vị)", def: "A rate for ONE of something: the price of one item, the miles in one hour.", vnDef: "Mức cho MỘT đơn vị: giá một món, số dặm trong một giờ.", sent: "Five pens cost $10, so the unit rate is $2 per pen.", vnSent: "Năm cây bút giá 10 đô la, nên đơn giá là 2 đô la mỗi cây.", isReal: true },
    { word: "Per", vn: "Mỗi (trên một)", def: "For each one. '$3 per hour' means $3 for every one hour.", vnDef: "Cho mỗi một. '3 đô la per hour' nghĩa là 3 đô la cho mỗi một giờ.", sent: "The shop pays $12 per hour.", vnSent: "Cửa hàng trả 12 đô la mỗi giờ.", isReal: true },
    { word: "Scale", vn: "Tỉ lệ (bản vẽ, bản đồ)", def: "The ratio between a drawing or map and the real thing, like 1 cm = 2 m.", vnDef: "Tỉ số giữa bản vẽ hay bản đồ và vật thật, như 1 cm = 2 m.", sent: "On this map the scale is 1 inch to 25 miles.", vnSent: "Trên bản đồ này tỉ lệ là 1 inch bằng 25 dặm.", isReal: true },
    { word: "Equivalent", vn: "Tương đương", def: "Equal in value even though written differently. 2:3 and 4:6 are equivalent ratios.", vnDef: "Bằng nhau về giá trị dù viết khác nhau. 2:3 và 4:6 là hai tỉ số tương đương.", sent: "Multiply both numbers by 2 to get an equivalent ratio.", vnSent: "Nhân cả hai số với 2 để được một tỉ số tương đương.", isReal: true },
    { word: "Convert", vn: "Đổi (đơn vị)", def: "To change a measurement into a different unit, like minutes into hours.", vnDef: "Đổi một số đo sang đơn vị khác, như từ phút sang giờ.", sent: "Convert 150 minutes into hours before you answer.", vnSent: "Hãy đổi 150 phút sang giờ trước khi trả lời.", isReal: true },
    { word: "Cross-multiply", vn: "Nhân chéo", def: "To solve a proportion by multiplying diagonally: top-left × bottom-right = top-right × bottom-left.", vnDef: "Giải tỉ lệ thức bằng cách nhân theo đường chéo: trên-trái × dưới-phải = trên-phải × dưới-trái.", sent: "Cross-multiply 3/8 = x/64 to get 8x = 192.", vnSent: "Nhân chéo 3/8 = x/64 để được 8x = 192.", isReal: true },
    { word: "Quantity", vn: "Lượng (số lượng)", def: "An amount of something that can be counted or measured.", vnDef: "Một lượng gì đó có thể đếm hoặc đo được.", sent: "A ratio compares two quantities, such as flour and sugar.", vnSent: "Một tỉ số so sánh hai lượng, chẳng hạn bột và đường.", isReal: true },
  ],

  // Source Analysis — authored SVG models, all MCQ (no English tax on maths).
  diagrams: [
    {
      id: "diag_1_double_number_line",
      type: "mcq",
      inlineSvg: DIAGRAMS.DOUBLE_NUMBER_LINE,
      imageAlt: "A double number line. The top line shows cups of flour: 0, 2, 4, 6. The bottom line shows cookies: 0, 12, 24, and a question mark under the 6.",
      promptText: "The double number line shows that 2 cups of flour make 12 cookies. The ratio stays the same along the line. How many cookies do 6 cups of flour make?",
      options: [
        { val: "A", text: "18 cookies", textVn: "18 cái bánh" },
        { val: "B", text: "30 cookies", textVn: "30 cái bánh" },
        { val: "C", text: "36 cookies", textVn: "36 cái bánh" },
        { val: "D", text: "72 cookies", textVn: "72 cái bánh" },
      ],
      correct: "C",
      marks: 1,
      expEn: "Every step of 2 cups adds 12 cookies: 12, 24, 36. Or as a proportion, 2/12 = 6/x, cross-multiply: 2x = 72, so x = 36. Three times the flour means three times the cookies.",
      expVn: "Mỗi bước 2 cốc thêm 12 cái bánh: 12, 24, 36. Hoặc lập tỉ lệ thức 2/12 = 6/x, nhân chéo: 2x = 72, nên x = 36. Gấp ba lần bột thì gấp ba lần bánh.",
    },
    {
      id: "diag_2_ratio_table",
      type: "mcq",
      inlineSvg: DIAGRAMS.RATIO_TABLE,
      imageAlt: "A ratio table. Top row, Tickets: 2, 4, 6, 8. Bottom row, Cost in dollars: 8, 16, a question mark, 32.",
      promptText: "The ratio table shows the cost of concert tickets. Every ticket costs the same. What number goes in the empty cell — the cost of 6 tickets?",
      options: [
        { val: "A", text: "$24", textVn: "24 đô la" },
        { val: "B", text: "$20", textVn: "20 đô la" },
        { val: "C", text: "$28", textVn: "28 đô la" },
        { val: "D", text: "$22", textVn: "22 đô la" },
      ],
      correct: "A",
      marks: 1,
      expEn: "2 tickets cost $8, so one ticket is $8 ÷ 2 = $4 — the unit rate. Then 6 tickets cost 6 × $4 = $24. Check the pattern: 8, 16, 24, 32 goes up by 8 each time.",
      expVn: "2 vé giá 8 đô la, nên một vé là 8 ÷ 2 = 4 đô la — đơn giá. Vậy 6 vé giá 6 × 4 = 24 đô la. Kiểm tra quy luật: 8, 16, 24, 32 tăng 8 mỗi lần.",
    },
    {
      id: "diag_3_scale_drawing",
      type: "mcq",
      inlineSvg: DIAGRAMS.SCALE_DRAWING,
      imageAlt: "A scale drawing of a rectangular room measuring 6 cm by 4 cm on the paper, with a scale box saying 1 cm = 2 m.",
      promptText: "The scale drawing of a room is 6 cm long and 4 cm wide on the paper. The scale says 1 cm = 2 m. How long is the real room?",
      options: [
        { val: "A", text: "3 m", textVn: "3 m" },
        { val: "B", text: "12 m", textVn: "12 m" },
        { val: "C", text: "6 m", textVn: "6 m" },
        { val: "D", text: "8 m", textVn: "8 m" },
      ],
      correct: "B",
      marks: 1,
      expEn: "Each 1 cm on the paper is 2 m in real life, so 6 cm is 6 × 2 = 12 m. As a proportion: 1/2 = 6/x, cross-multiply, x = 12. (The width would be 4 × 2 = 8 m — that is the other side, not the length.)",
      expVn: "Mỗi 1 cm trên giấy là 2 m ngoài đời, nên 6 cm là 6 × 2 = 12 m. Dưới dạng tỉ lệ thức: 1/2 = 6/x, nhân chéo, x = 12. (Chiều rộng là 4 × 2 = 8 m — đó là cạnh kia, không phải chiều dài.)",
    },
    {
      id: "diag_4_best_buy",
      type: "mcq",
      inlineSvg: DIAGRAMS.BEST_BUY,
      imageAlt: "Two price tags for bottled water. Pack A: 4 bottles for $6.00. Pack B: 6 bottles for $8.40.",
      promptText: "Two packs of the same bottled water. Pack A is 4 bottles for $6.00. Pack B is 6 bottles for $8.40. Which pack is the better buy, and why?",
      options: [
        { val: "A", text: "Pack A, because one bottle costs $1.50", textVn: "Gói A, vì một chai giá 1,50 đô la" },
        { val: "B", text: "Pack A, because $6.00 is less than $8.40", textVn: "Gói A, vì 6,00 đô la ít hơn 8,40 đô la" },
        { val: "C", text: "Pack B, because one bottle costs $1.20", textVn: "Gói B, vì một chai giá 1,20 đô la" },
        { val: "D", text: "Pack B, because one bottle costs $1.40", textVn: "Gói B, vì một chai giá 1,40 đô la" },
      ],
      correct: "D",
      marks: 1,
      expEn: "Compare the unit price — the cost of ONE bottle. Pack A: $6.00 ÷ 4 = $1.50 per bottle. Pack B: $8.40 ÷ 6 = $1.40 per bottle. $1.40 is less, so Pack B is the better buy. The cheaper total price (option B) is a trap: it buys fewer bottles.",
      expVn: "So sánh đơn giá — giá của MỘT chai. Gói A: 6,00 ÷ 4 = 1,50 đô la mỗi chai. Gói B: 8,40 ÷ 6 = 1,40 đô la mỗi chai. 1,40 nhỏ hơn, nên Gói B là lựa chọn tốt hơn. Tổng giá rẻ hơn (phương án B) là một cái bẫy: nó mua được ít chai hơn.",
    },
  ],

  workbook,
  balance,
  assessment,
  notes,
};
