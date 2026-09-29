// src/data/AOPS/LINE_1B/data.js
// LINE_1B — Graphing Lines & Slope. The second of three units on straight
// lines. LINE_1A put points on the plane and measured between them; this unit
// joins them up: the graph of a linear equation is a straight line, and one
// number — the slope, rise over run — says which way it tilts and how
// steeply. It ends by drawing a line from a single point and its slope, and
// by testing whether three points share a line, which is where LINE_1C starts
// (writing the line's equation).
//
// Same shape as LINE_1A and the quadratics pair: Learn = notes + vocab,
// Drill = the workbook, Prove = Line Lab + the quiz.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { lineLab } from './lineLab.js';

export const LINE_1B_DATA = {
  meta: {
    id: 'LINE_1B',
    title: 'Graphing Lines & Slope',
    desc: 'Graph a linear equation from three points, find the slope of a line and read what it says about the picture, and draw a line from one point and its slope.',
    track: 'AOPS',
    icon: 'TrendingUp',
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
        { id: 'LINE_LAB', dbKey: 'p55', maxXP: 25 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 25 },
      ],
    },
  ],

  realWords: [
    { word: 'Graph', vn: 'Đồ thị', def: 'The picture of every point that makes an equation true.', vnDef: 'Hình ảnh của mọi điểm làm một phương trình đúng.', sent: 'The graph of this equation is a straight line.', vnSent: 'Đồ thị của phương trình này là một đường thẳng.', isReal: true },
    { word: 'Linear equation', vn: 'Phương trình bậc nhất', def: 'An equation whose graph is a straight line.', vnDef: 'Phương trình có đồ thị là một đường thẳng.', sent: 'Two x plus three y equals six is a linear equation.', vnSent: 'Hai x cộng ba y bằng sáu là một phương trình bậc nhất.', isReal: true },
    { word: 'Slope', vn: 'Hệ số góc', def: 'The change in y divided by the change in x along a line.', vnDef: 'Độ thay đổi của y chia cho độ thay đổi của x dọc theo một đường thẳng.', sent: 'A line with slope two climbs two for every one across.', vnSent: 'Một đường thẳng có hệ số góc hai đi lên hai ứng với mỗi một sang ngang.', isReal: true },
    { word: 'Rise', vn: 'Độ thay đổi dọc', def: 'How far up or down you move between two points.', vnDef: 'Khoảng dịch chuyển lên hoặc xuống giữa hai điểm.', sent: 'The rise goes on top when you work out a slope.', vnSent: 'Độ thay đổi dọc nằm ở trên khi em tính hệ số góc.', isReal: true },
    { word: 'Run', vn: 'Độ thay đổi ngang', def: 'How far across you move between two points.', vnDef: 'Khoảng dịch chuyển ngang giữa hai điểm.', sent: 'A vertical line has a run of zero.', vnSent: 'Một đường thẳng đứng có độ thay đổi ngang bằng không.', isReal: true },
    { word: 'Steep', vn: 'Dốc', def: 'Rising or falling quickly, close to upright.', vnDef: 'Đi lên hoặc đi xuống nhanh, gần như thẳng đứng.', sent: 'A slope of ten makes a very steep line.', vnSent: 'Hệ số góc mười tạo ra một đường thẳng rất dốc.', isReal: true },
    { word: 'Horizontal', vn: 'Nằm ngang', def: 'Flat, running left to right, with a slope of zero.', vnDef: 'Phẳng, chạy từ trái sang phải, có hệ số góc bằng không.', sent: 'The x-axis is a horizontal line.', vnSent: 'Trục x là một đường thẳng nằm ngang.', isReal: true },
    { word: 'Vertical', vn: 'Thẳng đứng', def: 'Straight up and down, with no slope at all.', vnDef: 'Thẳng lên và xuống, hoàn toàn không có hệ số góc.', sent: 'Every point on a vertical line has the same x.', vnSent: 'Mọi điểm trên một đường thẳng đứng đều có cùng x.', isReal: true },
    { word: 'Undefined', vn: 'Không xác định', def: 'Having no value, like a number divided by zero.', vnDef: 'Không có giá trị, như một số chia cho không.', sent: 'The slope of a vertical line is undefined.', vnSent: 'Hệ số góc của một đường thẳng đứng không xác định.', isReal: true },
    { word: 'Collinear', vn: 'Thẳng hàng', def: 'Lying on the same straight line.', vnDef: 'Cùng nằm trên một đường thẳng.', sent: 'Three points are collinear if the slopes between them match.', vnSent: 'Ba điểm thẳng hàng nếu các hệ số góc giữa chúng bằng nhau.', isReal: true },
  ],

  // Spelled out rather than shorthand on purpose: generate_all_audio.py
  // locates `realWords` by looking for the next `name:` property after it,
  // and a shorthand property has no colon — with `workbook,` here the unit
  // silently generates no vocabulary audio at all.
  workbook: workbook,
  assessment: assessment,
  lineLab: lineLab,
  notes: notes,
};
