// src/data/AOPS/QUAD_1A/data.js
// QUAD_1A — Parabolas and the Vertex Form. The second module of the AOPS
// "Problem Solving" track, and the first of a pair: this one is about WHERE a
// parabola sits, QUAD_1B is about where it CROSSES.
//
// Adapted from the classroom deck in the sibling `lessons` repo
// (content/freshman-math/U01_4) for self-study: the teacher's questions became
// `check` MCQs inside the deck, the board work became the workbook, and the
// "come and plot it on the board" moment became the Graph It task.
//
// Shape: Learn = notes + vocab, Drill = the workbook, Prove = Graph It +
// assessment. Source Analysis is deliberately left out — the graph task already
// asks the student to read a curve, and a second reading task would be padding.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { graphPlot } from './graphPlot.js';

export const QUAD_1A_DATA = {
  meta: {
    id: 'QUAD_1A',
    title: 'Parabolas & the Vertex Form',
    desc: 'The curve you get from squaring: what moves it up, what makes it narrow, what flips it over — and how to read its vertex straight off the equation.',
    track: 'AOPS',
    icon: 'Activity',
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
      threshold: 40,
      tasks: [
        { id: 'GRAPH', dbKey: 'p15', maxXP: 25 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 25 },
      ],
    },
  ],

  realWords: [
    { word: 'Parabola', vn: 'Parabol', def: 'The U-shaped curve you get from squaring.', vnDef: 'Đường cong hình chữ U nhận được từ phép bình phương.', sent: 'The path of a thrown ball is a parabola.', vnSent: 'Đường đi của quả bóng được ném là một parabol.', isReal: true },
    { word: 'Vertex', vn: 'Đỉnh', def: 'The turning point of a parabola, where it stops falling and starts rising.', vnDef: 'Điểm quay đầu của parabol, nơi nó ngừng đi xuống và bắt đầu đi lên.', sent: 'The vertex of that curve is at the origin.', vnSent: 'Đỉnh của đường cong đó nằm ở gốc tọa độ.', isReal: true },
    { word: 'Axis of symmetry', vn: 'Trục đối xứng', def: 'The vertical mirror line through the vertex.', vnDef: 'Đường thẳng đứng làm gương đi qua đỉnh.', sent: 'Fold along the axis of symmetry and both halves match.', vnSent: 'Gấp theo trục đối xứng thì hai nửa trùng khít nhau.', isReal: true },
    { word: 'Coefficient', vn: 'Hệ số', def: 'The number multiplying a term.', vnDef: 'Số nhân với một hạng tử.', sent: 'In three x squared, the coefficient is three.', vnSent: 'Trong ba x bình phương, hệ số là ba.', isReal: true },
    { word: 'Substitute', vn: 'Thế vào', def: 'To put a number in place of a letter and work the answer out.', vnDef: 'Đặt một số vào chỗ của chữ rồi tính ra kết quả.', sent: 'Substitute x equals four into the equation.', vnSent: 'Thế x bằng bốn vào phương trình.', isReal: true },
    { word: 'Transformation', vn: 'Phép biến đổi', def: 'A move that changes where a graph is without changing what it is.', vnDef: 'Một phép làm thay đổi vị trí của đồ thị mà không đổi bản chất của nó.', sent: 'Sliding the curve up is a transformation.', vnSent: 'Trượt đường cong lên trên là một phép biến đổi.', isReal: true },
    { word: 'Vertex form', vn: 'Dạng đỉnh', def: 'An equation written so that the vertex can be read straight out of it.', vnDef: 'Phương trình viết sao cho có thể đọc ngay được tọa độ đỉnh.', sent: 'In vertex form the answer is already visible.', vnSent: 'Ở dạng đỉnh thì đáp án đã hiện sẵn.', isReal: true },
    { word: 'Minimum', vn: 'Giá trị nhỏ nhất', def: 'The smallest value a curve ever reaches.', vnDef: 'Giá trị nhỏ nhất mà đường cong đạt tới.', sent: 'This parabola has a minimum of negative four.', vnSent: 'Parabol này có giá trị nhỏ nhất là âm bốn.', isReal: true },
    { word: 'Maximum', vn: 'Giá trị lớn nhất', def: 'The largest value a curve ever reaches.', vnDef: 'Giá trị lớn nhất mà đường cong đạt tới.', sent: 'An upside-down parabola has a maximum at its vertex.', vnSent: 'Parabol quay ngược có giá trị lớn nhất tại đỉnh.', isReal: true },
    { word: 'Symmetry', vn: 'Tính đối xứng', def: 'Having two halves that match when folded along a line.', vnDef: 'Có hai nửa trùng khít nhau khi gấp theo một đường.', sent: 'Symmetry means you only have to plot half the points.', vnSent: 'Tính đối xứng nghĩa là em chỉ cần vẽ một nửa số điểm.', isReal: true },
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
