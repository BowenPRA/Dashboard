// src/data/GED_MATH/MATH_0B/data.js
// MATH_0B — Fractions, Decimals & Percents. Quantitative reasoning; the first
// number-sense module in the GED Math map (GED-SPRINT.md §6). Math shape without
// BALANCE (this is not an equation unit): the Drill is the WORKBOOK, and Source
// Analysis is authored SVG — we control the numbers, so the mark scheme is exact
// and no English tax is placed on the student's strongest subject (all MCQ).
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

// A 10x10 percent grid with the first `n` cells shaded. Rects are generated (no
// text in them), and the only <text> is written literally so audit:svg sees it.
const percentGrid = (n) => {
  let cells = '';
  for (let i = 0; i < 100; i++) {
    const x = 50 + (i % 10) * 30;
    const y = 55 + Math.floor(i / 10) * 30;
    cells += `<rect x="${x}" y="${y}" width="28" height="28" fill="${i < n ? '#ec4899' : '#f8fafc'}" stroke="#94a3b8" stroke-width="1"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full"><rect width="400" height="400" fill="#ffffff" rx="10"/><text x="200" y="34" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">Each small square = 1%</text>${cells}</svg>`;
};

const NUMBER_LINE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" class="w-full h-full">
  <rect width="520" height="200" fill="#ffffff" rx="10"/>
  <line x1="40" y1="120" x2="480" y2="120" stroke="#334155" stroke-width="3"/>
  <line x1="40" y1="108" x2="40" y2="132" stroke="#334155" stroke-width="3"/>
  <line x1="150" y1="108" x2="150" y2="132" stroke="#334155" stroke-width="3"/>
  <line x1="260" y1="108" x2="260" y2="132" stroke="#334155" stroke-width="3"/>
  <line x1="370" y1="108" x2="370" y2="132" stroke="#334155" stroke-width="3"/>
  <line x1="480" y1="108" x2="480" y2="132" stroke="#334155" stroke-width="3"/>
  <circle cx="260" cy="120" r="11" fill="#ec4899" stroke="#9d174d" stroke-width="3"/>
  <text x="40" y="160" font-family="sans-serif" font-size="16" fill="#334155" text-anchor="middle">0</text>
  <text x="480" y="160" font-family="sans-serif" font-size="16" fill="#334155" text-anchor="middle">1</text>
  <text x="260" y="95" font-family="sans-serif" font-size="17" font-weight="800" fill="#9d174d" text-anchor="middle">?</text>
</svg>`;

const SALE_BAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" class="w-full h-full">
  <rect width="520" height="220" fill="#ffffff" rx="10"/>
  <text x="260" y="34" font-family="sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">A $80 jacket, split into 4 equal parts</text>
  <rect x="40" y="70" width="105" height="70" fill="#a7f3d0" stroke="#334155" stroke-width="2"/>
  <rect x="145" y="70" width="105" height="70" fill="#a7f3d0" stroke="#334155" stroke-width="2"/>
  <rect x="250" y="70" width="105" height="70" fill="#a7f3d0" stroke="#334155" stroke-width="2"/>
  <rect x="355" y="70" width="105" height="70" fill="#fecaca" stroke="#334155" stroke-width="2"/>
  <line x1="355" y1="70" x2="460" y2="140" stroke="#dc2626" stroke-width="3"/>
  <line x1="460" y1="70" x2="355" y2="140" stroke="#dc2626" stroke-width="3"/>
  <text x="92" y="112" font-family="sans-serif" font-size="16" font-weight="700" fill="#065f46" text-anchor="middle">$20</text>
  <text x="197" y="112" font-family="sans-serif" font-size="16" font-weight="700" fill="#065f46" text-anchor="middle">$20</text>
  <text x="302" y="112" font-family="sans-serif" font-size="16" font-weight="700" fill="#065f46" text-anchor="middle">$20</text>
  <text x="407" y="112" font-family="sans-serif" font-size="16" font-weight="700" fill="#991b1b" text-anchor="middle">$20</text>
  <text x="407" y="170" font-family="sans-serif" font-size="15" font-weight="700" fill="#991b1b" text-anchor="middle">25% off</text>
</svg>`;

export const MATH_0B_DATA = {
  meta: {
    id: "MATH_0B",
    title: "Fractions, Decimals & Percents",
    desc: "The three ways to write a part of a whole — and how to move between them, which is one of the most tested skills on the GED Math test.",
    track: "GED_MATH",
    icon: "Percent",
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
      // WORKBOOK is the whole drill (40 XP). BALANCE is skipped — it is the
      // equation-solver, and this is a number-sense unit, not an algebra one.
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
    {
      id: "arcade",
      title: "Arcade",
      threshold: 80,
      tasks: [
        { id: "GAMES", dbKey: "p12", maxXP: 0 }
      ]
    },
  ],

  realWords: [
    { word: "Fraction", vn: "Phân số", def: "A number that shows part of a whole, written as one number over another.", vnDef: "Một số biểu thị một phần của tổng thể, viết dưới dạng một số trên một số khác.", sent: "Half a pizza is the fraction one-half.", vnSent: "Nửa cái bánh pizza là phân số một phần hai.", isReal: true },
    { word: "Numerator", vn: "Tử số", def: "The top number of a fraction — how many parts you have.", vnDef: "Số ở trên của một phân số — bạn có bao nhiêu phần.", sent: "In three-quarters, the numerator is 3.", vnSent: "Trong ba phần tư, tử số là 3.", isReal: true },
    { word: "Denominator", vn: "Mẫu số", def: "The bottom number of a fraction — how many equal parts the whole is split into.", vnDef: "Số ở dưới của một phân số — tổng thể được chia thành bao nhiêu phần bằng nhau.", sent: "In three-quarters, the denominator is 4.", vnSent: "Trong ba phần tư, mẫu số là 4.", isReal: true },
    { word: "Decimal", vn: "Số thập phân", def: "A number that uses a point to show parts smaller than one, like 0.5.", vnDef: "Một số dùng dấu chấm để biểu thị các phần nhỏ hơn một, như 0,5.", sent: "One-half written as a decimal is 0.5.", vnSent: "Một phần hai viết dưới dạng thập phân là 0,5.", isReal: true },
    { word: "Percent", vn: "Phần trăm", def: "A part out of 100. The symbol is %.", vnDef: "Một phần trên 100. Ký hiệu là %.", sent: "Fifty percent means 50 out of 100.", vnSent: "Năm mươi phần trăm nghĩa là 50 trên 100.", isReal: true },
    { word: "Place value", vn: "Giá trị theo vị trí", def: "The value a digit has because of its position, like the tenths or hundredths place.", vnDef: "Giá trị của một chữ số do vị trí của nó, như hàng phần mười hay phần trăm.", sent: "In 0.35, the 3 is in the tenths place.", vnSent: "Trong 0,35, số 3 ở hàng phần mười.", isReal: true },
    { word: "Equivalent", vn: "Tương đương", def: "Equal in value, even if written differently.", vnDef: "Bằng nhau về giá trị, dù được viết khác nhau.", sent: "One-half and 0.5 are equivalent.", vnSent: "Một phần hai và 0,5 là tương đương.", isReal: true },
    { word: "Simplify", vn: "Rút gọn", def: "To write a fraction with the smallest possible numbers.", vnDef: "Viết một phân số với các số nhỏ nhất có thể.", sent: "Simplify 2/4 to get 1/2.", vnSent: "Rút gọn 2/4 để được 1/2.", isReal: true },
    { word: "Convert", vn: "Đổi", def: "To rewrite a number in another form, such as a fraction into a percent.", vnDef: "Viết lại một số ở dạng khác, như đổi phân số thành phần trăm.", sent: "Convert 1/4 into the percent 25%.", vnSent: "Đổi 1/4 thành phần trăm 25%.", isReal: true },
    { word: "Discount", vn: "Giảm giá", def: "An amount taken off a price, often given as a percent.", vnDef: "Một khoản trừ vào giá, thường được cho dưới dạng phần trăm.", sent: "A 25% discount on $80 saves you $20.", vnSent: "Giảm giá 25% trên 80 đô la giúp bạn tiết kiệm 20 đô la.", isReal: true },
  ],

  // Source Analysis — authored SVG models, all MCQ (no English tax on maths).
  diagrams: [
    {
      id: "diag_1_percent_grid",
      type: "mcq",
      inlineSvg: percentGrid(45),
      imageAlt: "A 10 by 10 grid of 100 small squares with 45 of them shaded.",
      promptText: "The big square is split into 100 small squares, and 45 of them are shaded. What percent, decimal and fraction does the shaded part show?",
      options: [
        { val: "A", text: "55%, which is 0.55 and 55/100", textVn: "55%, tức là 0,55 và 55/100" },
        { val: "B", text: "4.5%, which is 0.045 and 45/10", textVn: "4,5%, tức là 0,045 và 45/10" },
        { val: "C", text: "45%, which is 0.45 and 45/100", textVn: "45%, tức là 0,45 và 45/100" },
        { val: "D", text: "45%, which is 4.5 and 45/10", textVn: "45%, tức là 4,5 và 45/10" },
      ],
      correct: "C",
      marks: 1,
      expEn: "Each square is 1%, so 45 shaded squares = 45%. 'Percent' means 'out of 100', so 45% = 45/100 = 0.45. Those three are just different ways to write the same amount.",
      expVn: "Mỗi ô là 1%, nên 45 ô tô màu = 45%. 'Phần trăm' nghĩa là 'trên 100', nên 45% = 45/100 = 0,45. Ba cách đó chỉ là những cách viết khác nhau cho cùng một lượng.",
    },
    {
      id: "diag_2_number_line",
      type: "mcq",
      inlineSvg: NUMBER_LINE_SVG,
      imageAlt: "A number line from 0 to 1 with a dot marked exactly halfway between them.",
      promptText: "On this number line from 0 to 1, the dot sits exactly halfway. Which value does the dot show?",
      options: [
        { val: "A", text: "1/5 = 0.2 = 20%", textVn: "1/5 = 0,2 = 20%" },
        { val: "B", text: "1/2 = 0.5 = 50%", textVn: "1/2 = 0,5 = 50%" },
        { val: "C", text: "1/4 = 0.25 = 25%", textVn: "1/4 = 0,25 = 25%" },
        { val: "D", text: "2 = 2.0 = 200%", textVn: "2 = 2,0 = 200%" },
      ],
      correct: "B",
      marks: 1,
      expEn: "Halfway between 0 and 1 is one-half. As a decimal that is 0.5, and as a percent it is 50% — halfway to a whole, which is 100%.",
      expVn: "Điểm giữa 0 và 1 là một phần hai. Dưới dạng thập phân là 0,5, và dưới dạng phần trăm là 50% — nửa đường tới một tổng thể, tức 100%.",
    },
    {
      id: "diag_3_sale_bar",
      type: "mcq",
      inlineSvg: SALE_BAR_SVG,
      imageAlt: "A bar for an $80 jacket split into four equal $20 parts, with one part crossed out and labelled 25% off.",
      promptText: "An $80 jacket is 25% off. The bar splits the price into 4 equal parts, and one part is crossed out. How much money do you SAVE?",
      options: [
        { val: "A", text: "$4", textVn: "4 đô la" },
        { val: "B", text: "$25", textVn: "25 đô la" },
        { val: "C", text: "$60", textVn: "60 đô la" },
        { val: "D", text: "$20", textVn: "20 đô la" },
      ],
      correct: "D",
      marks: 1,
      expEn: "25% is one quarter, so split $80 into 4 equal parts of $20 each. The 25% discount is one of those parts: $20. (The price you then pay is the other $60.)",
      expVn: "25% là một phần tư, nên chia 80 đô la thành 4 phần bằng nhau, mỗi phần 20 đô la. Khoản giảm 25% là một trong các phần đó: 20 đô la. (Số tiền bạn trả sau đó là 60 đô la còn lại.)",
    },
  ],

  workbook,
  assessment,
  games,
  notes,
};
