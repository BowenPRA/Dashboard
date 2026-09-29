// src/data/AOPS/LINE_1C/data.js
// LINE_1C — Equations of Lines. The last of three units on straight lines.
// LINE_1B drew a line from a point and its slope; this unit writes it down —
// point-slope form (which is the slope formula with a general point), the
// book's standard form, and slope-intercept form — then uses slopes to
// compare lines: the three kinds of system, parallel lines, perpendicular
// lines, and a parallel or perpendicular line through a given point.
//
// Same shape as LINE_1A/1B: Learn = notes + vocab, Drill = the workbook,
// Prove = Line Lab + the quiz. Line Lab here marks typed equations by LINE —
// any correct equation for "any form", and the form itself where the item
// asks for standard or slope-intercept form.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { lineLab } from './lineLab.js';

export const LINE_1C_DATA = {
  meta: {
    id: 'LINE_1C',
    title: 'Equations of Lines',
    desc: 'Write a line from a point and a slope or from two points, move between its three forms, read off slopes and intercepts, and use slopes to spot parallel and perpendicular lines.',
    track: 'AOPS',
    icon: 'Combine',
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
    { word: 'Equation of a line', vn: 'Phương trình đường thẳng', def: 'An equation that every point on the line makes true.', vnDef: 'Phương trình mà mọi điểm trên đường thẳng đều làm cho đúng.', sent: 'We found the equation of the line from two points.', vnSent: 'Chúng ta tìm phương trình đường thẳng từ hai điểm.', isReal: true },
    { word: 'Point-slope form', vn: 'Dạng điểm – hệ số góc', def: 'A line written using one of its points and its slope.', vnDef: 'Đường thẳng được viết bằng một điểm trên nó và hệ số góc.', sent: 'Point-slope form is quick when you know a point and the slope.', vnSent: 'Dạng điểm – hệ số góc rất nhanh khi em biết một điểm và hệ số góc.', isReal: true },
    { word: 'Standard form', vn: 'Dạng tổng quát', def: 'A x plus B y equals C, with whole numbers and A positive.', vnDef: 'A x cộng B y bằng C, với các số nguyên và A dương.', sent: 'Write your final answer in standard form.', vnSent: 'Hãy viết đáp án cuối cùng ở dạng tổng quát.', isReal: true },
    { word: 'Slope-intercept form', vn: 'Dạng y bằng m x cộng b', def: 'A line written as y equals m x plus b.', vnDef: 'Đường thẳng viết dưới dạng y bằng m x cộng b.', sent: 'In slope-intercept form you can read the slope straight off.', vnSent: 'Ở dạng y bằng m x cộng b em đọc ngay được hệ số góc.', isReal: true },
    { word: 'Intercept', vn: 'Giao điểm với trục', def: 'A point where a graph meets one of the axes.', vnDef: 'Điểm mà đồ thị gặp một trong hai trục.', sent: 'This line has its y-intercept at zero, three.', vnSent: 'Đường thẳng này có giao điểm với trục y tại không, ba.', isReal: true },
    { word: 'Parallel', vn: 'Song song', def: 'Lines that never meet, because they have the same slope.', vnDef: 'Các đường thẳng không bao giờ gặp nhau, vì có cùng hệ số góc.', sent: 'Parallel lines give a system with no solution.', vnSent: 'Hai đường thẳng song song cho một hệ vô nghiệm.', isReal: true },
    { word: 'Perpendicular', vn: 'Vuông góc', def: 'Lines that meet at a right angle.', vnDef: 'Các đường thẳng gặp nhau tạo thành góc vuông.', sent: 'The slopes of perpendicular lines multiply to negative one.', vnSent: 'Hệ số góc của hai đường vuông góc nhân với nhau bằng âm một.', isReal: true },
    { word: 'System of equations', vn: 'Hệ phương trình', def: 'Two or more equations that must all be true together.', vnDef: 'Hai hay nhiều phương trình phải cùng đúng.', sent: 'Graph both lines to see the solution of the system.', vnSent: 'Vẽ cả hai đường thẳng để thấy nghiệm của hệ phương trình.', isReal: true },
    { word: 'Reciprocal', vn: 'Số nghịch đảo', def: 'A number flipped upside down, like two thirds and three halves.', vnDef: 'Một số bị lật ngược, như hai phần ba và ba phần hai.', sent: 'The perpendicular slope is the negative reciprocal.', vnSent: 'Hệ số góc vuông góc là số nghịch đảo đổi dấu.', isReal: true },
    { word: 'Coefficient', vn: 'Hệ số', def: 'The number multiplying a letter in an expression.', vnDef: 'Số nhân với một chữ trong biểu thức.', sent: 'In three x minus five y, the coefficient of y is negative five.', vnSent: 'Trong ba x trừ năm y, hệ số của y là âm năm.', isReal: true },
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
