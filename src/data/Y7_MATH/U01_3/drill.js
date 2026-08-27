// src/data/Y7_MATH/U01_3/drill.js
// The Number Gym drill for 1.3. times-sprint — a timed grid of single facts.
//
// Multiples ARE times tables, and listing them is the whole LCM method, so the
// faster a student knows the 4s and 6s, the faster they list them. Each item is
// a fact pair [a, b] answered against a countdown. A rung unlocks when attempted.

export const drill = {
  mode: 'times-sprint',
  title: 'Times-Table Sprint', titleVn: 'Chạy nước rút bảng cửu chương',
  intro: 'Answer as many as you can before the timer runs out. Knowing your tables is how you list multiples fast.',
  introVn: 'Trả lời càng nhiều càng tốt trước khi hết giờ. Thuộc bảng cửu chương là cách liệt kê bội số nhanh.',
  ladder: [
    { level: 'The 4× table', levelVn: 'Bảng nhân 4', items: [[4, 3], [4, 6], [4, 8], [4, 9]] },
    { level: 'The 6× table', levelVn: 'Bảng nhân 6', items: [[6, 4], [6, 7], [6, 8], [6, 9]] },
    { level: 'Mixed tables', levelVn: 'Bảng hỗn hợp', items: [[7, 8], [9, 6], [8, 12], [7, 9]] },
  ],
};
