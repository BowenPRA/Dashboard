// src/data/Y7_MATH/U01_5/drill.js
// The Number Gym drill for 1.5. long-div — but here with REMAINDERS.
// NumberDrill.jsx derives every quotient digit, product and remainder.
//
// The tests predict; the division proves it. A test says "yes" only when the
// remainder is 0, so dividing and reading the remainder is the honest check —
// especially for 7, which has no test. Some items divide exactly, most leave a
// remainder, including 3960 ÷ 7 (the hook number, which 7 does NOT divide).

export const drill = {
  mode: 'long-div',
  title: 'Divide and Read the Remainder', titleVn: 'Chia và đọc số dư',
  intro: 'Fill in one box at a time. The remainder at the end tells you whether the divisor divides exactly — a remainder of 0 means yes.',
  introVn: 'Điền từng ô một. Số dư ở cuối cho biết số chia có chia hết không — số dư bằng 0 nghĩa là có.',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[85, 4], [97, 6], [73, 5]] },
    { level: 'Two-digit divisors', levelVn: 'Số chia hai chữ số', items: [[500, 12], [853, 9], [647, 15]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[3960, 7], [2017, 11]] },
  ],
};
