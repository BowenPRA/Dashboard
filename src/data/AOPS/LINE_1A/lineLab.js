// src/data/AOPS/LINE_1A/lineLab.js
// Line Lab items for Points, Distance & Midpoints — the Prove-phase task where
// the work happens ON the grid: plot, build the triangle, type the legs and
// the exact distance, click a midpoint or a one-third point. Item shape at the
// top of src/utils/lineLab.js.
//
// THE ANSWERS ARE NOT WRITTEN HERE. The points are the question; the corner,
// the legs, the distance, the midpoint and the dividing point are all derived,
// and the validator refuses a click target that is not a lattice point on the
// grid. That is why the non-lattice answers — the midpoint (−5/2, 1), the
// point (2/5, 5) — are TYPED steps rather than clicks.
//
// The items walk the deck's road: plot; the book's own triangle (A(−3, −5) to
// B(5, 1)); a second whole-number distance; an exact one that is a root; a
// triangle whose legs are on the axes; then the midpoint, the one-third point
// checked with distances, the "Q is the midpoint of PT" problem, and the point
// four times as far from one end as from the other. The last three use the
// book's numbers exactly, grids and all.

export const lineLab = {
  title: 'Points, distance & midpoints',
  titleVn: 'Điểm, khoảng cách & trung điểm',
  items: [
    {
      id: 'll1_plot',
      prompt: 'Plot the four points $A(2, 1)$, $B(5, -4)$, $C(-6, 0)$ and $D(-4, 4)$. Start at the origin every time.',
      promptVn: 'Biểu diễn bốn điểm $A(2, 1)$, $B(5, -4)$, $C(-6, 0)$ và $D(-4, 4)$. Lần nào cũng bắt đầu từ gốc tọa độ.',
      grid: { xMin: -7, xMax: 7, yMin: -6, yMax: 6 },
      points: { A: [2, 1], B: [5, -4], C: [-6, 0], D: [-4, 4] },
      steps: [
        { kind: 'plot', points: ['A', 'B'] },
        { kind: 'plot', points: ['C', 'D'] },
      ],
    },
    {
      id: 'll2_book_triangle',
      prompt: 'Find the distance between $A(-3, -5)$ and $B(5, 1)$ by building a right triangle.',
      promptVn: 'Tìm khoảng cách giữa $A(-3, -5)$ và $B(5, 1)$ bằng cách dựng một tam giác vuông.',
      grid: { xMin: -5, xMax: 7, yMin: -7, yMax: 3 },
      points: { A: [-3, -5], B: [5, 1] },
      steps: [
        { kind: 'plot', points: ['A', 'B'] },
        { kind: 'corner', from: 'A', to: 'B', name: 'C' },
        { kind: 'type', ask: 'run', from: 'A', to: 'C', abs: true },
        { kind: 'type', ask: 'rise', from: 'C', to: 'B', abs: true },
        { kind: 'type', ask: 'distance', from: 'A', to: 'B' },
      ],
    },
    {
      id: 'll3_thirteen',
      prompt: 'Find the distance between $A(-5, -2)$ and $B(7, 3)$.',
      promptVn: 'Tìm khoảng cách giữa $A(-5, -2)$ và $B(7, 3)$.',
      grid: { xMin: -7, xMax: 8, yMin: -4, yMax: 5 },
      points: { A: [-5, -2], B: [7, 3] },
      show: ['A', 'B'],
      steps: [
        { kind: 'corner', from: 'A', to: 'B', name: 'C' },
        { kind: 'type', ask: 'run', from: 'A', to: 'C', abs: true },
        { kind: 'type', ask: 'rise', from: 'C', to: 'B', abs: true },
        { kind: 'type', ask: 'distance', from: 'A', to: 'B' },
      ],
    },
    {
      id: 'll4_exact_root',
      prompt: 'Find the **exact** distance between $A(-2, 3)$ and $B(4, -1)$. This time $B$ is below $A$.',
      promptVn: 'Tìm khoảng cách **chính xác** giữa $A(-2, 3)$ và $B(4, -1)$. Lần này $B$ nằm thấp hơn $A$.',
      grid: { xMin: -4, xMax: 6, yMin: -3, yMax: 5 },
      points: { A: [-2, 3], B: [4, -1] },
      show: ['A', 'B'],
      steps: [
        { kind: 'corner', from: 'A', to: 'B', name: 'C' },
        { kind: 'type', ask: 'run', from: 'A', to: 'C', abs: true },
        { kind: 'type', ask: 'rise', from: 'C', to: 'B', abs: true },
        { kind: 'type', ask: 'distance', from: 'A', to: 'B' },
      ],
    },
    {
      id: 'll5_on_axes',
      prompt: '$A(0, -3)$ is on the $y$-axis and $B(-4, 0)$ is on the $x$-axis. How far apart are they?',
      promptVn: '$A(0, -3)$ nằm trên trục $y$ và $B(-4, 0)$ nằm trên trục $x$. Hai điểm cách nhau bao xa?',
      grid: { xMin: -6, xMax: 3, yMin: -5, yMax: 3 },
      points: { A: [0, -3], B: [-4, 0] },
      steps: [
        { kind: 'plot', points: ['A', 'B'] },
        { kind: 'corner', from: 'A', to: 'B', name: 'C' },
        { kind: 'type', ask: 'distance', from: 'A', to: 'B' },
      ],
    },
    {
      id: 'll6_mid_and_third',
      prompt: 'For $P(2, 4)$ and $Q(-7, -2)$: find the midpoint of $PQ$, then the point $T$ on $PQ$ with $PT : TQ = 1 : 2$ — and check that ratio with distances.',
      promptVn: 'Với $P(2, 4)$ và $Q(-7, -2)$: tìm trung điểm của $PQ$, rồi điểm $T$ trên $PQ$ sao cho $PT : TQ = 1 : 2$ — và kiểm tra tỉ số đó bằng khoảng cách.',
      grid: { xMin: -8, xMax: 4, yMin: -4, yMax: 6 },
      points: { P: [2, 4], Q: [-7, -2] },
      show: ['P', 'Q'],
      steps: [
        { kind: 'type', ask: 'midpoint', of: ['P', 'Q'] },
        { kind: 'divide', from: 'P', to: 'Q', ratio: [1, 2], name: 'T' },
        { kind: 'type', ask: 'distance', from: 'P', to: 'T' },
        { kind: 'type', ask: 'distance', from: 'T', to: 'Q' },
      ],
    },
    {
      id: 'll7_extend',
      prompt: '$P$ is $(5, 3)$ and $Q$ is $(-3, 6)$. Find the midpoint of $PQ$. Then find the point $T$ for which $Q$ is the midpoint of $PT$.',
      promptVn: '$P$ là $(5, 3)$ và $Q$ là $(-3, 6)$. Tìm trung điểm của $PQ$. Sau đó tìm điểm $T$ sao cho $Q$ là trung điểm của $PT$.',
      grid: { xMin: -12, xMax: 6, yMin: -1, yMax: 10 },
      points: { P: [5, 3], Q: [-3, 6] },
      show: ['P', 'Q'],
      steps: [
        { kind: 'type', ask: 'midpoint', of: ['P', 'Q'] },
        { kind: 'extend', from: 'P', through: 'Q', name: 'T' },
      ],
    },
    {
      id: 'll8_four_times',
      prompt: '$A$ is $(2, 7)$ and $B$ is $(-6, -3)$. Find the point $T$ on $AB$ whose distance from $B$ is **4 times** its distance from $A$.',
      promptVn: '$A$ là $(2, 7)$ và $B$ là $(-6, -3)$. Tìm điểm $T$ trên $AB$ có khoảng cách tới $B$ **gấp 4 lần** khoảng cách tới $A$.',
      grid: { xMin: -8, xMax: 4, yMin: -5, yMax: 9 },
      points: { A: [2, 7], B: [-6, -3] },
      show: ['A', 'B'],
      steps: [
        { kind: 'type', ask: 'run', from: 'A', to: 'B' },
        { kind: 'type', ask: 'rise', from: 'A', to: 'B' },
        { kind: 'type', ask: 'divide', from: 'A', to: 'B', ratio: [1, 4] },
      ],
    },
  ],
};
