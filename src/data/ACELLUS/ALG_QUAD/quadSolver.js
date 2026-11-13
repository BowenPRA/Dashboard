// src/data/ACELLUS/ALG_QUAD/quadSolver.js
// Quad Solver (QUAD_SOLVER, p96). The solver itself takes any quadratic; this
// file only holds the example chips and the challenges that pay its XP. Each
// challenge has a `witness` — a quadratic that meets it — which the validator
// solves to prove the challenge is possible (types: src/utils/quadSolve.js).
export const quadSolver = {
  title: 'Quad Solver',
  titleVn: 'Máy giải phương trình bậc hai',
  examples: ['x^2 + 5x + 6 = 0', '2x^2 + 7x + 3 = 0', 'x^2 = 5x - 6', 'x^2 + 4x - 3 = 0', 'x^2 + 2x + 5 = 0', '3x^2 - 12 = 0'],
  challenges: [
    { id: 'c_pair', type: 'pair', witness: 'x^2 + 7x + 10 = 0',
      en: 'Solve one that factors with a = 1.', vn: 'Giải một phương trình phân tích được với a = 1.' },
    { id: 'c_ac', type: 'ac', witness: '2x^2 + 5x + 3 = 0',
      en: 'Solve one that still factors when a is not 1 (the ac method).', vn: 'Giải một phương trình vẫn phân tích được khi a khác 1 (phương pháp ac).' },
    { id: 'c_gcf', type: 'gcf', witness: '3x^2 + 9x + 6 = 0',
      en: 'Solve one with a common factor to take out first.', vn: 'Giải một phương trình có nhân tử chung cần đặt ra trước.' },
    { id: 'c_irr', type: 'irrational', witness: 'x^2 + 2x - 4 = 0',
      en: 'Find one that does NOT factor — the answers have a square root.', vn: 'Tìm một phương trình KHÔNG phân tích được — nghiệm có dấu căn.' },
    { id: 'c_none', type: 'none', witness: 'x^2 + 1 = 0',
      en: 'Find one with no real solutions.', vn: 'Tìm một phương trình vô nghiệm thực.' },
    { id: 'c_one', type: 'one', witness: 'x^2 + 10x + 25 = 0',
      en: 'Find one with exactly one solution.', vn: 'Tìm một phương trình có đúng một nghiệm.' },
    { id: 'c_zeros', type: 'zeros', zeros: [3, -5], witness: '(x - 3)(x + 5) = 0',
      en: 'Build a quadratic whose solutions are 3 and −5.', vn: 'Lập một phương trình bậc hai có nghiệm là 3 và −5.' },
    { id: 'c_frac', type: 'zeros', zeros: [{ n: 1, d: 2 }, -4], witness: '2x^2 + 7x - 4 = 0',
      en: 'Build one whose solutions are 1/2 and −4.', vn: 'Lập một phương trình có nghiệm là 1/2 và −4.' },
    { id: 'c_move', type: 'rearrange', witness: 'x^2 = 4x + 5',
      en: 'Type one with x on BOTH sides of the = sign and watch it get rearranged.', vn: 'Gõ một phương trình có x ở CẢ HAI vế của dấu = và xem máy chuyển vế.' },
  ],
};
