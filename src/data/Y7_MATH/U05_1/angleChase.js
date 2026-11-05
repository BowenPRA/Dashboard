// src/data/Y7_MATH/U05_1/angleChase.js
// Find Every Angle (ANGLE_CHASE, p92) for 5.1 A sum of 360° — the Workbook's
// Exercise 5.1 shapes (Focus 1–3, Practice 5 and 7, Challenge 8–9) as
// several-letter pictures on fresh numbers: each letter is found from the
// angles already known, then written on the picture for the next one. The
// facts on offer are the simple ones: 5.1's (straight line, around a point,
// quadrilateral, and a parallelogram's opposite and next-door corners) and,
// at Mr Bowen's request (2026-11-05), vertically opposite angles — two lines
// crossing can be worked either way. utils/angleChase.js reads every fact off
// the drawing, so any true route is marked right; checkAngleChaseConfig
// proves each item.
//
// Levels 1–3 are guided (the next letter is chosen, the sum is shown with its
// numbers); from level 4 the student chooses which letter to find next.
// Answers, for the reviewer:
//   L1  a1 a = 116 (line) · b = 64 (vertically opposite, or line from a) · c = 116
//       a2 a = 81 (line) · b = 58 · c = 81 · d = 41 (each opposite, or line)
//   L2  p1 x = 75, twice: (360 − 90 − 120) ÷ 2
//       p2 a = 65 · b = 70
//   L3  q1 a = 100 (line) · b = 82 (quadrilateral) · c = 98 (line)
//       q2 a = 88 · b = 76 (both lines) · c = 96 (quadrilateral)
//   L4  r1 a = 62 (opposite) · b = 118, twice (next-door, or quadrilateral shared) · c = 62 (line)
//   L5  m1 a = 89 (left quadrilateral) · b = 91 · c = 93 · d = 100 (right quadrilateral)
//       m2 ? = 82 (quadrilateral, on the way) · x = 98 (line)   (Challenge 8's shape)

const ray = (id, dir, len) => ({ id, dir, at: [0, 0], ray: len });
const side = (id, dir, at, over = [0, 0], more = {}) => ({ id, dir, at, over, ...more });

export const angleChase = {
  title: 'Find Every Angle',
  titleFr: 'Trouve tous les angles',
  intro: 'Find the letters one at a time. Each angle you find goes on the picture, and it helps you find the next one. For each angle: choose the fact, then work it out.',
  introFr: 'Trouve les lettres une par une. Chaque angle trouvé va sur le dessin, et il t’aide à trouver le suivant. Pour chaque angle : choisis la propriété, puis calcule.',
  facts: ['line', 'opp', 'point', 'quad', 'para', 'next'],
  guidedUpTo: 3,
  levels: {
    1: { en: 'Straight lines, one after another', fr: 'Lignes droites, l’une après l’autre' },
    2: { en: 'Round a point', fr: 'Autour d’un point' },
    3: { en: 'A quadrilateral with a side drawn on', fr: 'Un quadrilatère avec un côté prolongé' },
    4: { en: 'A parallelogram', fr: 'Un parallélogramme' },
    5: { en: 'Step by step', fr: 'Pas à pas' },
  },
  items: [
    {
      id: 'a1', level: 1,
      fig: { box: [12, 8], lines: [{ id: 'p', dir: 16, at: [0, 0] }, { id: 'q', dir: 80, at: [0, 0] }],
        marks: [{ at: 'p q', toward: 48, show: 64 }, { at: 'p q', toward: 138, show: 'a' }, { at: 'p q', toward: 228, show: 'b' }, { at: 'p q', toward: 318, show: 'c' }] },
    },
    {
      id: 'a2', level: 1,
      fig: { box: [12, 8], lines: [{ id: 'p', dir: 12, at: [0, 0] }, { id: 'q', dir: 70, at: [0, 0] }, { id: 'r', dir: 151, at: [0, 0] }],
        marks: [{ at: 'p q', toward: 41, show: 58 }, { at: 'p q', toward: 172, show: 41 }, { at: 'p q', toward: 111, show: 'a' },
          { at: 'p q', toward: 221, show: 'b' }, { at: 'p q', toward: 291, show: 'c' }, { at: 'p q', toward: 352, show: 'd' }] },
    },
    {
      id: 'p1', level: 2,
      fig: { box: [12, 8], lines: [ray('r0', 0, 3.6), ray('r1', 90, 3.4), ray('r2', 210, 3.6), ray('r3', 285, 3.4)],
        marks: [{ at: 'r0 r1', toward: 45, show: 'R' }, { at: 'r0 r1', toward: 150, show: 120 }, { at: 'r0 r1', toward: 248, show: 'x' }, { at: 'r0 r1', toward: 323, show: 'x' }] },
    },
    {
      id: 'p2', level: 2,
      fig: { box: [12, 8], lines: [{ id: 'h', dir: 0, at: [0, -0.6] }, { id: 'r1', dir: 55, at: [0, -0.6], ray: 3.8 },
        { id: 'r2', dir: 120, at: [0, -0.6], ray: 3.8 }, { id: 'r3', dir: 250, at: [0, -0.6], ray: 3.0 }],
        marks: [{ at: 'h r1', toward: 28, show: 55 }, { at: 'h r1', toward: 150, show: 60 }, { at: 'h r1', toward: 305, show: 110 },
          { at: 'h r1', toward: 88, show: 'a' }, { at: 'h r1', toward: 215, show: 'b' }] },
    },
    {
      id: 'q1', level: 3,
      fig: { box: [9.5, 6.4], lines: [side('ab', 0, [-2.4, -2], [0, 2.0]), side('bc', 80, [2.4, -2]), side('ad', 75, [-2.4, -2]), side('cd', 178, [0, 2.0], [1.6, 0])],
        marks: [{ at: 'ab ad', toward: 38, show: 75 }, { at: 'ad cd', toward: 307, show: 103 }, { at: 'ab bc', toward: 40, show: 80 },
          { at: 'ab bc', toward: 130, show: 'a' }, { at: 'bc cd', toward: 219, show: 'b' }, { at: 'bc cd', toward: 309, show: 'c' }] },
    },
    {
      id: 'q2', level: 3,
      fig: { box: [9.5, 6.4], lines: [side('ab', 8, [-2.6, -1.9], [1.6, 0]), side('bc', 112, [2.6, -1.2], [1.4, 0]), side('cd', 196, [0, 2.2]), side('ad', 96, [-2.6, -1.9])],
        marks: [{ at: 'ab ad', toward: 142, show: 92 }, { at: 'ab bc', toward: 240, show: 104 }, { at: 'cd ad', toward: 326, show: 100 },
          { at: 'ab ad', toward: 52, show: 'a' }, { at: 'ab bc', toward: 150, show: 'b' }, { at: 'bc cd', toward: 244, show: 'c' }] },
    },
    {
      id: 'r1', level: 4,
      fig: { box: [9.5, 6.4], lines: [side('ab', 0, [-2.6, -1.7], [0, 1.8], { par: 1 }), side('dc', 0, [0, 1.7], [0, 0], { par: 1 }),
        side('ad', 62, [-2.6, -1.7], [0, 0], { par: 2 }), side('bc', 62, [1.6, -1.7], [0, 0], { par: 2 })],
        marks: [{ at: 'ab ad', toward: 31, show: 62 }, { at: 'dc bc', toward: 211, show: 'a' }, { at: 'ab bc', toward: 121, show: 'b' },
          { at: 'dc ad', toward: 301, show: 'b' }, { at: 'ab bc', toward: 31, show: 'c' }] },
    },
    {
      id: 'm1', level: 5,
      fig: { box: [12, 8], lines: [side('ab', 0, [-4.4, -2]), side('dc', 4, [0, 2]), side('ad', 72, [-4.4, -2]), side('bc', 104, [4.2, -2]), side('pq', 93, [0.4, -2])],
        marks: [{ at: 'ab ad', toward: 36, show: 72 }, { at: 'dc ad', toward: 308, show: 112 }, { at: 'ab pq', toward: 137, show: 87 }, { at: 'ab bc', toward: 142, show: 76 },
          { at: 'dc pq', toward: 229, show: 'a' }, { at: 'dc pq', toward: 319, show: 'b' }, { at: 'ab pq', toward: 47, show: 'c' }, { at: 'dc bc', toward: 234, show: 'd' }] },
    },
    {
      id: 'm2', level: 5,
      fig: { box: [9.5, 6.4], lines: [side('ab', 0, [-2.6, -1.9]), side('bc', 70, [2.4, -1.9], [0, 1.6]), side('cd', 168, [0, 2.0]), side('ad', 102, [-2.6, -1.9])],
        marks: [{ at: 'ab ad', toward: 51, show: 102 }, { at: 'ab bc', toward: 125, show: 110 }, { at: 'cd ad', toward: 315, show: 66 }, { at: 'bc cd', toward: 119, show: 'x' }] },
    },
  ],
};
