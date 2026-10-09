// src/data/Y7_MATH/U01_4/drill.js
// The Number Gym drill for 1.4. short-div with EXACT division — the bus stop
// written the short way (the Bus Stop screen of 3.2): each remainder small, up
// and to the left of the next digit, and what is left at the end after an r.
// utils/shortDivision.js derives every quotient digit and carry.
//
// "Does it divide exactly?" is the factor test, so every dividend here is a
// multiple of its divisor and the final remainder is 0. Items are [dividend,
// divisor]. A rung unlocks when the one above is clear.

export const drill = {
  mode: 'short-div',
  title: 'Short Division', titleVn: 'Chia ngắn',
  intro: 'The bus stop, the short way: the digit on top, and the remainder written small, up and to the left of the next digit. Every one here divides exactly — so the remainder at the end is 0.',
  introVn: 'Phép chia ngắn: chữ số ở trên, còn số dư viết nhỏ ở phía trên bên trái của chữ số tiếp theo. Mọi phép ở đây đều chia hết — nên số dư cuối cùng bằng 0.',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[48, 4], [96, 6], [84, 7]] },
    { level: 'Two-digit divisors', levelVn: 'Số chia hai chữ số', items: [[912, 24], [672, 16], [810, 15]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[2016, 36], [3024, 42]] },
  ],
};
