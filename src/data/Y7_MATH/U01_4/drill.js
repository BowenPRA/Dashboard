// src/data/Y7_MATH/U01_4/drill.js
// The Number Gym drill for 1.4. long-div with EXACT division — NumberDrill.jsx
// derives every quotient digit, product and remainder (utils/columnArithmetic.js).
//
// "Does it divide exactly?" is the factor test, so every dividend here is a
// multiple of its divisor and the final remainder is 0. Items are [dividend,
// divisor]. A rung unlocks when the one above is clear.

export const drill = {
  mode: 'long-div',
  title: 'Long Division', titleVn: 'Chia dài',
  intro: 'Fill in one box at a time: the quotient digit above the bar, then the product and the remainder. Every one here divides exactly.',
  introVn: 'Điền từng ô một: chữ số thương trên vạch, rồi tích và số dư. Mọi phép ở đây đều chia hết.',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[48, 4], [96, 6], [84, 7]] },
    { level: 'Two-digit divisors', levelVn: 'Số chia hai chữ số', items: [[912, 24], [672, 16], [810, 15]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[2016, 36], [3024, 42]] },
  ],
};
