// src/data/ACELLUS/ALG_QUAD/data.js
// Acellus Algebra I — Solving Quadratics: factoring, the zero product
// property and the quadratic formula.
//
// The track rule (see ALG_INEQ): Acellus gives an answer box; this unit gives
// the WORKING. Three engines, each one a different way into that working:
//
//   FACTOR_QUAD   Factor It — factor and solve one written line at a time:
//                 standard form, common factor, multiply-to/add-to with a
//                 tap-to-try factor-pair table, split and group for a ≠ 1,
//                 brackets (marked by multiplying out), zero product property.
//   QUAD_FORMULA  Formula — a, b, c with signs → b² − 4ac → how many
//                 solutions → √ simplified → −b and 2a → answers in lowest terms.
//   QUAD_SOLVER   Quad Solver — type ANY quadratic and read its full worked
//                 solution: the factoring method that fits (or why it does
//                 not factor), the formula line by line, and the graph. A tool
//                 for checking homework any time; its XP is for challenges
//                 ("find one with no real solutions") that only understanding
//                 can meet on purpose.
//
// Leaner-units shape: NOTES · WORD_REC · the engines · ASSESSMENT. No
// Workbook — the engines already are the practice, with named feedback.
//
// XP: Learn 20, Drill 55, Prove 25 = 100. Drill opens at 15 (≤ 80% of 20) and
// Prove at 45 (≤ 80% of 75), per the 80% gate rule.
import { notes } from './notes.js';
import { factorQuad } from './factorQuad.js';
import { quadFormula } from './quadFormula.js';
import { quadSolver } from './quadSolver.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const ACELLUS_ALG_QUAD_DATA = {
  meta: {
    id: 'ALG_QUAD',
    title: 'Acellus: Solving Quadratics',
    desc: 'Find the zeros of a quadratic step by step — factoring (product–sum, common factor, the ac method), the zero product property, and the quadratic formula — plus a solver that shows every step for any quadratic you type.',
    track: 'ACELLUS',
    icon: 'Sigma',
    themeColor: 'bg-purple-500 border-purple-700',
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
        { id: 'FACTOR_QUAD', dbKey: 'p94', maxXP: 25 },
        { id: 'QUAD_FORMULA', dbKey: 'p95', maxXP: 20 },
        { id: 'QUAD_SOLVER', dbKey: 'p96', maxXP: 10 },
      ],
    },
    {
      id: 'mastery',
      title: 'Prove',
      threshold: 45,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 25 },
      ],
    },
    {
      // Reward only, 0 XP, gated on the quiz having been SAT (as ALG_INEQ).
      id: 'arcade',
      title: 'Arcade',
      threshold: 80,
      requires: 'ASSESSMENT',
      tasks: [
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  realWords: [
    { word: 'Quadratic', vn: 'Bậc hai', def: 'An equation or expression whose highest power of x is x squared.', vnDef: 'Phương trình hoặc biểu thức có lũy thừa cao nhất của x là x bình phương.', sent: 'A quadratic can have two solutions, one, or none.', vnSent: 'Một phương trình bậc hai có thể có hai nghiệm, một nghiệm, hoặc không có nghiệm.', isReal: true },
    { word: 'Standard Form', vn: 'Dạng chuẩn', def: 'A quadratic written as ax squared plus bx plus c equals zero.', vnDef: 'Phương trình bậc hai viết dưới dạng ax bình phương cộng bx cộng c bằng không.', sent: 'Move every term to one side to get standard form.', vnSent: 'Chuyển mọi hạng tử về một vế để có dạng chuẩn.', isReal: true },
    { word: 'Zero', vn: 'Nghiệm (không điểm)', def: 'A value of x that makes the expression equal to zero.', vnDef: 'Một giá trị của x làm cho biểu thức bằng không.', sent: 'The zeros of the function are where its graph meets the x-axis.', vnSent: 'Các nghiệm của hàm số là nơi đồ thị gặp trục x.', isReal: true },
    { word: 'Root', vn: 'Nghiệm', def: 'Another name for a solution of an equation equal to zero.', vnDef: 'Một tên gọi khác của nghiệm của phương trình bằng không.', sent: 'The roots of x squared minus nine are three and negative three.', vnSent: 'Các nghiệm của x bình phương trừ chín là ba và âm ba.', isReal: true },
    { word: 'Factor', vn: 'Phân tích thành nhân tử', def: 'To write an expression as things multiplied together.', vnDef: 'Viết một biểu thức thành tích của các thừa số.', sent: 'We factor the trinomial into two brackets.', vnSent: 'Chúng ta phân tích tam thức thành hai ngoặc.', isReal: true },
    { word: 'Trinomial', vn: 'Tam thức', def: 'An expression with three terms, such as x squared plus five x plus six.', vnDef: 'Một biểu thức có ba hạng tử, ví dụ x bình phương cộng năm x cộng sáu.', sent: 'This trinomial factors into two binomials.', vnSent: 'Tam thức này phân tích được thành hai nhị thức.', isReal: true },
    { word: 'Greatest Common Factor', vn: 'Ước chung lớn nhất', def: 'The biggest number or term that divides every term exactly.', vnDef: 'Số hoặc hạng tử lớn nhất chia hết mọi hạng tử.', sent: 'Always take out the greatest common factor first.', vnSent: 'Luôn đặt ước chung lớn nhất ra ngoài trước.', isReal: true },
    { word: 'Zero Product Property', vn: 'Tính chất tích bằng không', def: 'If two things multiply to zero, at least one of them must be zero.', vnDef: 'Nếu hai thừa số nhân với nhau bằng không, thì ít nhất một thừa số phải bằng không.', sent: 'The zero product property turns each bracket into a solution.', vnSent: 'Tính chất tích bằng không biến mỗi ngoặc thành một nghiệm.', isReal: true },
    { word: 'Discriminant', vn: 'Biệt thức', def: 'The number b squared minus four a c, which tells you how many real solutions there are.', vnDef: 'Số b bình phương trừ bốn a c, cho biết có bao nhiêu nghiệm thực.', sent: 'A negative discriminant means there are no real solutions.', vnSent: 'Biệt thức âm nghĩa là không có nghiệm thực.', isReal: true },
    { word: 'Quadratic Formula', vn: 'Công thức nghiệm', def: 'The formula that solves any quadratic using a, b and c.', vnDef: 'Công thức giải được mọi phương trình bậc hai dùng a, b và c.', sent: 'When it will not factor, use the quadratic formula.', vnSent: 'Khi không phân tích được, hãy dùng công thức nghiệm.', isReal: true },
  ],

  // Spelled out rather than shorthand: generate_all_audio.py finds `realWords`
  // by the next `name:` property after it (see AOPS/QUAD_1A/data.js).
  notes: notes,
  factorQuad: factorQuad,
  quadFormula: quadFormula,
  quadSolver: quadSolver,
  assessment: assessment,
  games: games,
};
