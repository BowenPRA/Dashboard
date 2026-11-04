// src/data/Y7_MATH/U05_2/angleChase.js
// Find Every Angle (ANGLE_CHASE, p92) for 5.2 Intersecting lines — the
// Workbook's Exercise 5.2 shapes (Focus 2–3, Practice 4–7) on fresh numbers:
// one picture, several letters, each found from the angles already known and
// then written on the picture for the next one. An item states only its lines
// and marks; utils/angleChase.js reads every fact off the drawing (X, F, Z,
// straight line, same side, triangle) and checkAngleChaseConfig proves each
// item in `npm run validate`. Schema at the top of utils/angleChaseGeom.js.
//
// Levels 1–3 are guided (the next letter is chosen, the sum is shown with its
// numbers); from level 4 the student chooses which letter to find next.
// Answers, for the reviewer:
//   L1  x1 x = 47 (X) · y = 133 (line) · z = 133
//       x2 a = 68 (X) · b = 54 (X) · c = 58 (line: 180 − 68 − 54) · d = 58
//   L2  f1 a = 63 (F) · b = 117 · c = 63 · d = 117
//       f2 a = 64 (Z) · b = 116 · c = 64 · d = 116
//   L3  f3 a = 128 (F) · b = 128 (Z) · c = 52 · d = 52
//       f4 a = 66 (Z) · b = 114 · c = 59 (Z) · d = 59
//   L4  t1 a = 57 (line) · b = 54 (Z) · c = 69 (Z) · d = 111   (Workbook P5's shape)
//       t2 a = 62 (Z) · b = 47 (Z) · c = 71 (triangle) · d = 109   (P4's shape)
//   L5  s1 ? = 60 (triangle, on the way) · x = 60 (Z) · y = 120   (P7's shape)
//       s2 a = 75 · b = 75 (F) · c = 58 · d = 58 (F) · e = 47   (P6's shape)
//   L6  n1 no arrows: a = 72 · b = 108 · c = 104 · d = 104 (F would say 108: wrong)

const par = (id, dir, y, more = {}) => ({ id, dir, at: [0, y], par: 1, ...more });

export const angleChase = {
  title: 'Find Every Angle',
  titleFr: 'Trouve tous les angles',
  intro: 'Find the letters one at a time. Each angle you find goes on the picture, and it helps you find the next one. For each angle: choose the fact, then work it out.',
  introFr: 'Trouve les lettres une par une. Chaque angle trouvé va sur le dessin, et il t’aide à trouver le suivant. Pour chaque angle : choisis la propriété, puis calcule.',
  facts: ['opp', 'line', 'corr', 'alt', 'side', 'tri'],
  guidedUpTo: 3,
  levels: {
    1: { en: 'Two lines cross', fr: 'Deux droites se croisent' },
    2: { en: 'F and Z', fr: 'F et Z' },
    3: { en: 'Use what you found', fr: 'Utilise ce que tu as trouvé' },
    4: { en: 'A triangle between parallel lines', fr: 'Un triangle entre deux parallèles' },
    5: { en: 'Step by step', fr: 'Pas à pas' },
    6: { en: 'Look for the arrows', fr: 'Cherche les flèches' },
  },
  items: [
    {
      id: 'x1', level: 1,
      fig: { box: [12, 8], lines: [{ id: 'p', dir: 12, at: [0, 0] }, { id: 'q', dir: 59, at: [0, 0] }],
        marks: [{ at: 'p q', toward: 36, show: 47 }, { at: 'p q', toward: 216, show: 'x' }, { at: 'p q', toward: 126, show: 'y' }, { at: 'p q', toward: 306, show: 'z' }] },
    },
    {
      id: 'x2', level: 1,
      fig: { box: [12, 8], lines: [{ id: 'p', dir: 8, at: [0, 0] }, { id: 'q', dir: 76, at: [0, 0] }, { id: 'r', dir: 130, at: [0, 0] }],
        marks: [{ at: 'p q', toward: 42, show: 68 }, { at: 'p q', toward: 103, show: 54 }, { at: 'p q', toward: 222, show: 'a' },
          { at: 'p q', toward: 283, show: 'b' }, { at: 'p q', toward: 159, show: 'c' }, { at: 'p q', toward: 339, show: 'd' }] },
    },
    {
      id: 'f1', level: 2,
      fig: { box: [12, 8], lines: [par('m', 0, 1.7), par('n', 0, -1.7), { id: 't', dir: 117, at: [0.3, 0] }],
        marks: [{ at: 'm t', toward: 329, show: 63 }, { at: 'n t', toward: 329, show: 'a' }, { at: 'n t', toward: 59, show: 'b' },
          { at: 'n t', toward: 149, show: 'c' }, { at: 'n t', toward: 239, show: 'd' }] },
    },
    {
      id: 'f2', level: 2,
      fig: { box: [12, 8], lines: [par('m', 10, 1.8), par('n', 10, -1.8), { id: 't', dir: 74, at: [0, 0] }],
        marks: [{ at: 'm t', toward: 222, show: 64 }, { at: 'n t', toward: 42, show: 'a' }, { at: 'n t', toward: 132, show: 'b' },
          { at: 'n t', toward: 222, show: 'c' }, { at: 'n t', toward: 312, show: 'd' }] },
    },
    {
      id: 'f3', level: 3,
      fig: { box: [12, 8], lines: [par('m', 0, 1.7), par('n', 0, -1.7), { id: 't', dir: 128, at: [0.5, 0] }],
        marks: [{ at: 'n t', toward: 64, show: 128 }, { at: 'm t', toward: 64, show: 'a' }, { at: 'm t', toward: 244, show: 'b' },
          { at: 'n t', toward: 154, show: 'c' }, { at: 'm t', toward: 334, show: 'd' }] },
    },
    {
      id: 'f4', level: 3,
      fig: { box: [12, 8], lines: [par('m', 0, 1.6), par('n', 0, -1.6), { id: 't', dir: 66, at: [-2.4, 0] }, { id: 'u', dir: 121, at: [2.4, 0] }],
        marks: [{ at: 'm t', toward: 213, show: 66 }, { at: 'n u', toward: 151, show: 59 }, { at: 'n t', toward: 33, show: 'a' },
          { at: 'n t', toward: 123, show: 'b' }, { at: 'm u', toward: 331, show: 'c' }, { at: 'm u', toward: 151, show: 'd' }] },
    },
    {
      id: 't1', level: 4,
      fig: { box: [12, 8], lines: [par('m', 0, 1.9), par('n', 0, -1.9),
        { id: 's', dir: 54, at: [0.4, 1.9], over: [0.9, 0] }, { id: 'u', dir: 111, at: [0.4, 1.9], over: [0.9, 0] }],
        marks: [{ at: 'm s u', toward: 207, show: 54 }, { at: 'm s u', toward: 326, show: 69 }, { at: 'm s u', toward: 263, show: 'a' },
          { at: 'n s', toward: 27, show: 'b' }, { at: 'n u', toward: 146, show: 'c' }, { at: 'n u', toward: 56, show: 'd' }] },
    },
    {
      id: 't2', level: 4,
      fig: { box: [12, 9.4], lines: [par('m', 0, 3.4), par('n', 0, -3.4),
        { id: 'u', dir: 62, at: [0, 0], over: [0.8, 0.8] }, { id: 'w', dir: 133, at: [0, 0], over: [0.8, 0.8] }],
        marks: [{ at: 'm w', toward: 337, show: 47 }, { at: 'm u', toward: 211, show: 62 }, { at: 'n u', toward: 31, show: 'a' },
          { at: 'n w', toward: 157, show: 'b' }, { at: 'u w', toward: 278, show: 'c' }, { at: 'u w', toward: 188, show: 'd' }] },
    },
    {
      id: 's1', level: 5,
      fig: { box: [12, 9], lines: [par('m', 0, 3.0), par('n', 0, -3.0),
        { id: 'b', dir: 64, at: [-2.2, -3.0], over: [0.9, 0], upto: ['n', 'c'] }, { id: 'c', dir: 120, at: [2.2, -3.0], over: [0.9, 1.0] }],
        marks: [{ at: 'n b', toward: 32, show: 64 }, { at: 'b c', toward: 272, show: 56 }, { at: 'm c', toward: 330, show: 'x' }, { at: 'm c', toward: 240, show: 'y' }] },
    },
    {
      id: 's2', level: 5,
      fig: { box: [12, 8.5], lines: [par('m', 0, 2), par('n', 0, -2.1),
        { id: 't', dir: 75, at: [0.3, -2.1], over: [0, 1.0], upto: ['m', 'n'] }, { id: 'u', dir: 122, at: [0.3, -2.1], over: [0, 1.0], upto: ['m', 'n'] }],
        marks: [{ at: 'm t', toward: 128, show: 105 }, { at: 'm u', toward: 61, show: 122 }, { at: 'm t', toward: 38, show: 'a' },
          { at: 'n t u', toward: 38, show: 'b' }, { at: 'm u', toward: 151, show: 'c' }, { at: 'n t u', toward: 151, show: 'd' }, { at: 'n t u', toward: 99, show: 'e' }] },
    },
    {
      id: 'n1', level: 6,
      fig: { box: [12, 8], lines: [{ id: 'm', dir: 0, at: [0, 1.7] }, { id: 'n', dir: 4, at: [0, -1.7] }, { id: 't', dir: 108, at: [0.2, 0] }],
        marks: [{ at: 'm t', toward: 54, show: 108 }, { at: 'n t', toward: 146, show: 76 }, { at: 'm t', toward: 144, show: 'a' },
          { at: 'm t', toward: 234, show: 'b' }, { at: 'n t', toward: 56, show: 'c' }, { at: 'n t', toward: 236, show: 'd' }] },
    },
  ],
};
