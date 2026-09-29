// src/data/AOPS/LINE_1A/data.js
// LINE_1A — Points, Distance & Midpoints. The first of three units on straight
// lines (LINE_1A → 1B slope → 1C equations of lines), built from the book's
// chapter on graphing lines. This one is the ground the other two stand on:
// where a point is, how far apart two points are, and where the point halfway
// — or a third of the way — along a segment sits.
//
// Same shape as the quadratics pair: Learn = notes + vocab, Drill = the
// workbook, Prove = Line Lab + the quiz. Line Lab is this track's graphing
// task for lines (src/tasks/LineLab.jsx): the student builds the distance
// triangle on the grid, types the legs and the exact length, and clicks the
// midpoint and the dividing point — production, not recognition.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { lineLab } from './lineLab.js';

export const LINE_1A_DATA = {
  meta: {
    id: 'LINE_1A',
    title: 'Points, Distance & Midpoints',
    desc: 'Plot points on the coordinate plane, find the exact distance between two of them with a right triangle, and find the point halfway — or a third of the way — along.',
    track: 'AOPS',
    icon: 'Grid3x3',
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
    { word: 'Coordinate', vn: 'Tọa độ', def: 'One of the two numbers that fix where a point is.', vnDef: 'Một trong hai số xác định vị trí của một điểm.', sent: 'The first coordinate tells you how far across to go.', vnSent: 'Tọa độ thứ nhất cho em biết phải đi ngang bao xa.', isReal: true },
    { word: 'Ordered pair', vn: 'Cặp số có thứ tự', def: 'Two numbers in brackets where the order matters.', vnDef: 'Hai số trong ngoặc mà thứ tự của chúng có ý nghĩa.', sent: 'Three, two and two, three are different ordered pairs.', vnSent: 'Ba, hai và hai, ba là hai cặp số có thứ tự khác nhau.', isReal: true },
    { word: 'Origin', vn: 'Gốc tọa độ', def: 'The point where the two axes cross.', vnDef: 'Điểm mà hai trục cắt nhau.', sent: 'Every point is measured from the origin.', vnSent: 'Mọi điểm đều được đo tính từ gốc tọa độ.', isReal: true },
    { word: 'Axis', vn: 'Trục', def: 'One of the two number lines on the coordinate plane.', vnDef: 'Một trong hai trục số trên mặt phẳng tọa độ.', sent: 'The y-axis runs straight up and down.', vnSent: 'Trục y chạy thẳng lên và xuống.', isReal: true },
    { word: 'Quadrant', vn: 'Góc phần tư', def: 'One of the four parts the axes cut the plane into.', vnDef: 'Một trong bốn phần mà hai trục chia mặt phẳng ra.', sent: 'Points with a negative x and a positive y are in the second quadrant.', vnSent: 'Các điểm có x âm và y dương nằm ở góc phần tư thứ hai.', isReal: true },
    { word: 'Lattice point', vn: 'Điểm nguyên', def: 'A point whose coordinates are both whole numbers.', vnDef: 'Điểm có cả hai tọa độ đều là số nguyên.', sent: 'The grid lines cross at every lattice point.', vnSent: 'Các đường lưới cắt nhau tại mọi điểm nguyên.', isReal: true },
    { word: 'Distance', vn: 'Khoảng cách', def: 'How far apart two points are, in a straight line.', vnDef: 'Hai điểm cách nhau bao xa, theo đường thẳng.', sent: 'The distance from A to B is ten units.', vnSent: 'Khoảng cách từ A tới B là mười đơn vị.', isReal: true },
    { word: 'Midpoint', vn: 'Trung điểm', def: 'The point exactly halfway along a segment.', vnDef: 'Điểm nằm chính giữa một đoạn thẳng.', sent: 'The midpoint is the average of the two ends.', vnSent: 'Trung điểm là trung bình cộng của hai đầu mút.', isReal: true },
    { word: 'Absolute value', vn: 'Giá trị tuyệt đối', def: 'How far a number is from zero.', vnDef: 'Một số cách số không bao xa.', sent: 'The absolute value of negative five is five.', vnSent: 'Giá trị tuyệt đối của âm năm là năm.', isReal: true },
    { word: 'Segment', vn: 'Đoạn thẳng', def: 'The straight path between two points.', vnDef: 'Đường thẳng nối giữa hai điểm.', sent: 'We name the segment from P to Q by its two ends.', vnSent: 'Ta gọi tên đoạn thẳng từ P tới Q bằng hai đầu mút của nó.', isReal: true },
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
