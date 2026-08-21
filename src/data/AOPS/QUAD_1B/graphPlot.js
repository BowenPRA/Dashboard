// src/data/AOPS/QUAD_1B/graphPlot.js
// Graph It items for Zeros and the Factored Form. Same task as QUAD_1A, asked
// the other way round: the vertex is still there, but the zeros are the point.
//
// The set covers all three counts on purpose, because a student who has only
// ever been asked for two zeros learns to hunt for two whether or not they
// exist. gp4 has exactly one and gp5 has none — that one is answered with the
// "It has no zeros" button, and clicking anywhere on the grid is marked wrong.
//
// As in QUAD_1A the answers are DERIVED from `curve`, so they cannot drift; the
// validator additionally refuses any target that is off the grid or lands
// between the lattice points a student is allowed to click.

export const graphPlot = [
  {
    id: 'gp1_two_zeros',
    equation: 'y = (x + 1)(x - 3)',
    // (x+1)(x-3) = x^2 - 2x - 3 = (x - 1)^2 - 4
    curve: { a: 1, h: 1, k: -4 },
    grid: { xMin: -4, xMax: 6, yMin: -5, yMax: 5 },
    note: 'The same curve the notes used. Zeros first, then the vertex.',
    noteVn: 'Vẫn là đường cong trong bài học. Tìm nghiệm trước, rồi tới đỉnh.',
    steps: [
      { kind: 'zeros' },
      { kind: 'vertex' },
    ],
  },
  {
    id: 'gp2_factored',
    equation: 'y = (x - 2)(x - 6)',
    // = x^2 - 8x + 12 = (x - 4)^2 - 4
    curve: { a: 1, h: 4, k: -4 },
    grid: { xMin: -2, xMax: 8, yMin: -5, yMax: 5 },
    note: 'Solve each bracket. Then use the midpoint.',
    noteVn: 'Giải từng ngoặc. Rồi dùng trung điểm.',
    steps: [
      { kind: 'zeros' },
      { kind: 'vertex' },
    ],
  },
  {
    id: 'gp3_from_vertex_form',
    equation: 'y = (x - 2)^2 - 9',
    curve: { a: 1, h: 2, k: -9 },
    grid: { xMin: -4, xMax: 8, yMin: -10, yMax: 4 },
    note: 'Square-root both sides — and keep both roots.',
    noteVn: 'Lấy căn hai vế — và giữ cả hai nghiệm.',
    steps: [
      { kind: 'vertex' },
      { kind: 'zeros' },
    ],
  },
  {
    id: 'gp4_one_zero',
    equation: 'y = (x + 2)^2',
    curve: { a: 1, h: -2, k: 0 },
    grid: { xMin: -7, xMax: 3, yMin: -3, yMax: 6 },
    note: 'This one touches the axis instead of crossing it.',
    noteVn: 'Đồ thị này chạm trục x chứ không cắt qua.',
    steps: [
      { kind: 'zeros' },
      { kind: 'point', at: [0, 4], label: 'the y-intercept, where x = 0', labelVn: 'giao điểm với trục y, nơi x = 0' },
    ],
  },
  {
    id: 'gp5_no_zeros',
    equation: 'y = (x - 1)^2 + 2',
    curve: { a: 1, h: 1, k: 2 },
    grid: { xMin: -4, xMax: 6, yMin: -3, yMax: 7 },
    note: 'Careful. Not every parabola reaches the x-axis.',
    noteVn: 'Cẩn thận. Không phải parabol nào cũng chạm tới trục x.',
    steps: [
      { kind: 'vertex' },
      { kind: 'zeros' },
    ],
  },
  {
    id: 'gp6_upside_down',
    equation: 'y = -(x - 1)(x - 5)',
    // = -(x^2 - 6x + 5) = -(x - 3)^2 + 4
    curve: { a: -1, h: 3, k: 4 },
    grid: { xMin: -2, xMax: 8, yMin: -5, yMax: 6 },
    note: 'Upside down, but the brackets still hand you the zeros.',
    noteVn: 'Quay ngược xuống, nhưng các ngoặc vẫn cho em biết nghiệm.',
    steps: [
      { kind: 'zeros' },
      { kind: 'vertex' },
    ],
  },
];
