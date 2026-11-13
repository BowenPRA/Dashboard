// src/data/ACELLUS/ALG_QUAD/quadFormula.js
// Formula (QUAD_FORMULA, p95). Each item is only an equation; every stage and
// named slip is derived by src/utils/quadFormula.js and replayed by
// src/utils/quadCheck.js.
//
// The set covers all four answer shapes: whole numbers / fractions, a √ that
// needs simplifying (and a common factor to divide out), one repeated
// answer, and no real solutions. Levels 3–4 drop the "−b and 2a" stage.
export const quadFormula = {
  title: 'The Quadratic Formula',
  titleVn: 'Công thức nghiệm',
  levels: {
    1: { en: 'Answers that come out whole', vn: 'Nghiệm ra số đẹp' },
    2: { en: 'Square roots, one answer, none', vn: 'Nghiệm có căn, một nghiệm, vô nghiệm' },
    3: { en: 'Simplify fully', vn: 'Rút gọn hoàn toàn' },
    4: { en: 'On your own', vn: 'Tự làm' },
  },
  items: [
    { id: 'q1', level: 1, eq: 'x^2 + 5x + 6 = 0' },
    { id: 'q2', level: 1, eq: '2x^2 - 7x + 3 = 0' },
    { id: 'q3', level: 1, eq: 'x^2 - 4x - 5 = 0' },
    { id: 'q4', level: 2, eq: 'x^2 + 4x - 3 = 0' },
    { id: 'q5', level: 2, eq: 'x^2 + 2x + 5 = 0' },
    { id: 'q6', level: 2, eq: 'x^2 - 6x + 9 = 0' },
    { id: 'q7', level: 3, eq: '2x^2 + 3x - 1 = 0' },
    { id: 'q8', level: 3, eq: '3x^2 = 2x + 4' },
    { id: 'q9', level: 4, eq: 'x^2 - 2x - 1 = 0' },
    { id: 'q10', level: 4, eq: '2x^2 - 8x + 5 = 0' },
  ],
};
