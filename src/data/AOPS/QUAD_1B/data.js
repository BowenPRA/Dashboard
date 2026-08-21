// src/data/AOPS/QUAD_1B/data.js
// QUAD_1B — Zeros and the Factored Form. The pair to QUAD_1A: that unit found
// where a parabola SITS, this one finds where it CROSSES, and the closing
// compare slide puts the two forms side by side so the student chooses a form
// by the question being asked rather than by habit.
//
// Same shape as QUAD_1A: Learn = notes + vocab, Drill = the workbook, Prove =
// Graph It + assessment. The Graph It items here include a one-zero case and a
// no-zero case, because a student only ever asked for two learns to hunt for
// two whether or not they are there.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { graphPlot } from './graphPlot.js';

export const QUAD_1B_DATA = {
  meta: {
    id: 'QUAD_1B',
    title: 'Zeros & the Factored Form',
    desc: 'Where a parabola crosses the x-axis, how many times it can, and how to read the crossings straight off a pair of brackets.',
    track: 'AOPS',
    icon: 'Compass',
  },

  phases: [
    {
      id: 'concept',
      title: 'Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 10 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Drill',
      threshold: 15,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 30 },
      ],
    },
    {
      id: 'mastery',
      title: 'Prove',
      threshold: 45,
      tasks: [
        { id: 'GRAPH', dbKey: 'p15', maxXP: 25 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 25 },
      ],
    },
  ],

  realWords: [
    { word: 'Zero', vn: 'Nghiệm', def: 'A value of x that makes y come out as nothing.', vnDef: 'Giá trị của x làm cho y bằng không.', sent: 'This curve has a zero at x equals four.', vnSent: 'Đường cong này có một nghiệm tại x bằng bốn.', isReal: true },
    { word: 'Root', vn: 'Nghiệm của phương trình', def: 'Another word for a zero of an equation.', vnDef: 'Một từ khác để chỉ nghiệm của phương trình.', sent: 'The roots of the equation are one and five.', vnSent: 'Các nghiệm của phương trình là một và năm.', isReal: true },
    { word: 'Intercept', vn: 'Giao điểm với trục', def: 'A point where a graph meets one of the axes.', vnDef: 'Điểm mà đồ thị gặp một trong hai trục.', sent: 'The x-intercepts are where the curve cuts across.', vnSent: 'Các giao điểm với trục x là nơi đường cong cắt ngang qua.', isReal: true },
    { word: 'Factor', vn: 'Thừa số', def: 'One of the parts being multiplied together.', vnDef: 'Một trong những phần được nhân với nhau.', sent: 'Each bracket is a factor of the expression.', vnSent: 'Mỗi biểu thức trong ngoặc là một thừa số của biểu thức đó.', isReal: true },
    { word: 'Product', vn: 'Tích', def: 'The answer you get when you multiply.', vnDef: 'Kết quả nhận được khi nhân.', sent: 'If the product is zero, one factor must be zero.', vnSent: 'Nếu tích bằng không thì phải có một thừa số bằng không.', isReal: true },
    { word: 'Factored form', vn: 'Dạng tích', def: 'An equation written as brackets multiplied together.', vnDef: 'Phương trình viết dưới dạng các ngoặc nhân với nhau.', sent: 'In factored form the zeros are already visible.', vnSent: 'Ở dạng tích thì các nghiệm đã hiện sẵn.', isReal: true },
    { word: 'Expand', vn: 'Khai triển', def: 'To multiply brackets out into separate terms.', vnDef: 'Nhân các ngoặc ra thành từng hạng tử riêng.', sent: 'Expand the brackets and the zeros are hidden again.', vnSent: 'Khai triển các ngoặc ra thì các nghiệm lại bị giấu đi.', isReal: true },
    { word: 'Midpoint', vn: 'Trung điểm', def: 'The point exactly halfway between two others.', vnDef: 'Điểm nằm đúng chính giữa hai điểm khác.', sent: 'The axis of symmetry is the midpoint of the two zeros.', vnSent: 'Trục đối xứng là trung điểm của hai nghiệm.', isReal: true },
    { word: 'Square root', vn: 'Căn bậc hai', def: 'A number that gives the original when multiplied by itself.', vnDef: 'Số mà khi nhân với chính nó sẽ ra số ban đầu.', sent: 'A square root has two answers, one positive and one negative.', vnSent: 'Căn bậc hai có hai đáp án, một dương và một âm.', isReal: true },
    { word: 'Solution', vn: 'Lời giải', def: 'A value that makes an equation true.', vnDef: 'Giá trị làm cho phương trình đúng.', sent: 'This equation has two solutions.', vnSent: 'Phương trình này có hai lời giải.', isReal: true },
  ],

  // Spelled out rather than shorthand on purpose: generate_all_audio.py
  // locates `realWords` by looking for the next `name:` property after it,
  // and a shorthand property has no colon — with `workbook,` here the unit
  // silently generates no vocabulary audio at all.
  workbook: workbook,
  assessment: assessment,
  graphPlot: graphPlot,
  notes: notes,
};
