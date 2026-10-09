// src/data/Y7_MATH/U01_5/drill.js
// The Number Gym drill for 1.5. short-div — but here with REMAINDERS. The bus
// stop written the short way (the Bus Stop screen of 3.2): each remainder small,
// up and to the left of the next digit, and what is left at the end after an r.
// utils/shortDivision.js derives every quotient digit, carry and remainder.
//
// The tests predict; the division proves it. A test says "yes" only when the
// remainder is 0, so dividing and reading the remainder is the honest check —
// especially for 7, which has no test. Some items divide exactly, most leave a
// remainder, including 3960 ÷ 7 (the hook number, which 7 does NOT divide).

export const drill = {
  mode: 'short-div',
  title: 'Divide and Read the Remainder', titleVn: 'Chia và đọc số dư',
  intro: 'The bus stop, the short way: carry each remainder small, up and to the left of the next digit. What is left at the end goes after the r — a remainder of 0 means it divides exactly.',
  introVn: 'Phép chia ngắn: nhớ từng số dư nhỏ ở phía trên bên trái của chữ số tiếp theo. Phần còn lại cuối cùng viết sau chữ r — số dư bằng 0 nghĩa là chia hết.',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[85, 4], [97, 6], [73, 5]] },
    { level: 'Two-digit divisors', levelVn: 'Số chia hai chữ số', items: [[500, 12], [853, 9], [647, 15]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[3960, 7], [2017, 11]] },
  ],
};
