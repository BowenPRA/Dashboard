// src/data/AOPS/PROP_1A/data.js
// PROP_1A — Direct Proportion. The first module of the AOPS "Problem Solving"
// track: what proportion means in plain English, y = kx and k = y/x, growth,
// the line through the origin, negative k, proportion to a power, inverse
// proportion, and two applied problems (the lawn and the river).
//
// Shape follows the proven maths unit (docs/GED-SPRINT.md §4): Learn = notes +
// vocab, Drill = the whole workbook, Prove = source analysis + assessment.
// BALANCE is skipped — this is a reasoning unit, not an equation-solving one.
// Source Analysis is all MCQ against authored SVG, so we control the numbers and
// no English tax is placed on a maths task.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const PROP_1A_DATA = {
  meta: {
    id: "PROP_1A",
    title: "Direct Proportion",
    desc: "When two quantities grow together at a fixed rate — the constant k, the line through the origin, and the inverse case where one rises as the other falls.",
    track: "AOPS",
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
    { word: "Proportion", vn: "Tỉ lệ", def: "The size of one quantity compared with another.", vnDef: "Kích thước của một đại lượng so với đại lượng khác.", sent: "A recipe keeps the same proportion of flour to sugar.", vnSent: "Một công thức giữ nguyên tỉ lệ giữa bột và đường.", isReal: true },
    { word: "Directly proportional", vn: "Tỉ lệ thuận", def: "Growing together, so that one is always the same number of times the other.", vnDef: "Cùng tăng, sao cho đại lượng này luôn gấp đại lượng kia cùng một số lần.", sent: "Cost is directly proportional to weight.", vnSent: "Giá tiền tỉ lệ thuận với khối lượng.", isReal: true },
    { word: "Constant", vn: "Hằng số", def: "A number that never changes in a rule.", vnDef: "Một số không bao giờ thay đổi trong một quy tắc.", sent: "In y equals kx, the letter k is the constant.", vnSent: "Trong y bằng kx, chữ k là hằng số.", isReal: true },
    { word: "Ratio", vn: "Tỉ số", def: "One quantity divided by another, showing how they compare.", vnDef: "Một đại lượng chia cho đại lượng khác, cho thấy chúng so sánh thế nào.", sent: "The ratio of height to shadow was five to twelve.", vnSent: "Tỉ số giữa chiều cao và bóng là năm trên mười hai.", isReal: true },
    { word: "Origin", vn: "Gốc tọa độ", def: "The point on a graph where x and y are both zero.", vnDef: "Điểm trên đồ thị mà cả x và y đều bằng không.", sent: "Every direct proportion passes through the origin.", vnSent: "Mọi tỉ lệ thuận đều đi qua gốc tọa độ.", isReal: true },
    { word: "Inversely proportional", vn: "Tỉ lệ nghịch", def: "Related so that when one quantity grows, the other shrinks by the same factor.", vnDef: "Liên hệ sao cho khi đại lượng này tăng thì đại lượng kia giảm cùng một hệ số.", sent: "The number of workers is inversely proportional to the time taken.", vnSent: "Số công nhân tỉ lệ nghịch với thời gian cần dùng.", isReal: true },
    { word: "Product", vn: "Tích", def: "The answer you get when you multiply numbers together.", vnDef: "Kết quả nhận được khi nhân các số với nhau.", sent: "In inverse proportion the product stays the same.", vnSent: "Trong tỉ lệ nghịch, tích luôn giữ nguyên.", isReal: true },
    { word: "Quotient", vn: "Thương", def: "The answer you get when you divide one number by another.", vnDef: "Kết quả nhận được khi chia một số cho một số khác.", sent: "In direct proportion the quotient stays the same.", vnSent: "Trong tỉ lệ thuận, thương luôn giữ nguyên.", isReal: true },
    { word: "Downstream", vn: "Xuôi dòng", def: "Moving in the same direction as the water is flowing.", vnDef: "Di chuyển cùng hướng với dòng nước đang chảy.", sent: "Swimming downstream is faster because the current helps.", vnSent: "Bơi xuôi dòng nhanh hơn vì dòng nước hỗ trợ.", isReal: true },
    { word: "Upstream", vn: "Ngược dòng", def: "Moving against the direction the water is flowing.", vnDef: "Di chuyển ngược hướng dòng nước đang chảy.", sent: "The trip upstream took twice as long.", vnSent: "Chặng ngược dòng mất thời gian gấp đôi.", isReal: true },
  ],

  // Source Analysis — authored SVG, all MCQ. Each item is a source the student
  // has not already been walked through on a slide, so it reads as a fresh
  // problem rather than a memory test.
  diagrams: [
    {
      id: "diag_1_which_graph",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_GRAPH,
      imageAlt: "A coordinate grid with three straight lines: A is horizontal at y = 2, B rises from the origin, and C rises but starts at y = 2 on the vertical axis.",
      promptText: "Three straight lines are drawn on the same grid. Line A is horizontal. Line B starts at the origin and rises. Line C also rises, but starts at 2 on the vertical axis. Which line shows y directly proportional to x?",
      options: [
        { val: "A", text: "Line A, because it is perfectly steady", textVn: "Đường A, vì nó hoàn toàn ổn định" },
        { val: "B", text: "Line B, because it rises and passes through (0, 0)", textVn: "Đường B, vì nó đi lên và đi qua (0, 0)" },
        { val: "C", text: "Line C, because it rises fastest at the start", textVn: "Đường C, vì nó tăng nhanh nhất lúc đầu" },
        { val: "D", text: "All three, because all three are straight lines", textVn: "Cả ba, vì cả ba đều là đường thẳng" },
      ],
      correct: "B",
      marks: 1,
      expEn: "Direct proportion means y = kx, and putting x = 0 into that always gives y = 0 — so the line must pass through the origin. Only line B does. Line C is straight but starts at 2, and line A never changes at all, so neither has a constant y/x.",
      expVn: "Tỉ lệ thuận nghĩa là y = kx, và thay x = 0 vào luôn được y = 0 — nên đường thẳng phải đi qua gốc tọa độ. Chỉ đường B làm được điều đó. Đường C là đường thẳng nhưng bắt đầu từ 2, còn đường A không hề thay đổi, nên cả hai đều không có y/x không đổi.",
    },
    {
      id: "diag_2_work_table",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_WORK_TABLE,
      imageAlt: "A two-column table of workers and days for the same job: 2 workers 18 days, 3 workers 12 days, 6 workers 6 days, 9 workers 4 days.",
      promptText: "The table shows how many days a job takes for different numbers of workers. What kind of relationship is this, and what would 12 workers take?",
      options: [
        { val: "A", text: "Direct proportion; 12 workers would take 24 days", textVn: "Tỉ lệ thuận; 12 công nhân sẽ mất 24 ngày" },
        { val: "B", text: "Direct proportion; 12 workers would take 8 days", textVn: "Tỉ lệ thuận; 12 công nhân sẽ mất 8 ngày" },
        { val: "C", text: "Inverse proportion; 12 workers would take 3 days", textVn: "Tỉ lệ nghịch; 12 công nhân sẽ mất 3 ngày" },
        { val: "D", text: "Inverse proportion; 12 workers would take 36 days", textVn: "Tỉ lệ nghịch; 12 công nhân sẽ mất 36 ngày" },
      ],
      correct: "C",
      marks: 1,
      expEn: "Multiply each row and you get the same number every time: 2 x 18 = 36, 3 x 12 = 36, 6 x 6 = 36, 9 x 4 = 36. A constant product means inverse proportion. So 12 workers take 36 divided by 12 = 3 days. More workers must mean fewer days, which rules out A and D.",
      expVn: "Nhân từng hàng thì luôn ra cùng một số: 2 x 18 = 36, 3 x 12 = 36, 6 x 6 = 36, 9 x 4 = 36. Tích không đổi nghĩa là tỉ lệ nghịch. Vậy 12 công nhân mất 36 chia 12 = 3 ngày. Nhiều công nhân hơn thì phải ít ngày hơn, nên loại A và D.",
    },
    {
      id: "diag_3_swim",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_SWIM,
      imageAlt: "A diagram of a river flowing at 2 km per hour, with two blank boxes: the speed with the stream and the speed against the stream, for a swimmer who does 6 km per hour in still water.",
      promptText: "A swimmer moves at 6 km/h in still water, and the river flows at 2 km/h. Fill in the two blanks: the speed with the stream, and the speed against the stream.",
      options: [
        { val: "A", text: "8 km/h with the stream, 4 km/h against it", textVn: "8 km/h xuôi dòng, 4 km/h ngược dòng" },
        { val: "B", text: "12 km/h with the stream, 3 km/h against it", textVn: "12 km/h xuôi dòng, 3 km/h ngược dòng" },
        { val: "C", text: "6 km/h with the stream, 6 km/h against it", textVn: "6 km/h xuôi dòng, 6 km/h ngược dòng" },
        { val: "D", text: "4 km/h with the stream, 8 km/h against it", textVn: "4 km/h xuôi dòng, 8 km/h ngược dòng" },
      ],
      correct: "A",
      marks: 1,
      expEn: "With the stream the current helps, so add: 6 + 2 = 8 km/h. Against the stream the current holds you back, so subtract: 6 - 2 = 4 km/h. Option D has them the wrong way round, and option C forgets that the water is moving at all.",
      expVn: "Xuôi dòng thì dòng nước hỗ trợ, nên cộng: 6 + 2 = 8 km/h. Ngược dòng thì dòng nước cản lại, nên trừ: 6 - 2 = 4 km/h. Đáp án D đảo ngược hai chiều, còn đáp án C quên mất rằng nước đang chảy.",
    },
  ],

  workbook,
  assessment,
  notes,
};
