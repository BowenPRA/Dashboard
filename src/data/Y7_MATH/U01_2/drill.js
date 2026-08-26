// src/data/Y7_MATH/U01_2/drill.js
// The Number Gym drill for 1.2. Operands only — NumberDrill.jsx derives every
// partial product, carry and column sum (see utils/columnArithmetic.js).
//
// long-mult is the headline arithmetic of this unit: the sign rules are useless
// without the multiplication underneath them. Three rungs, eight items; a rung
// unlocks only when the one above it is clear, so a Year 7 student who is slow
// on Warm-up is held there and still banks XP rather than drowning in Stretch.

export const drill = {
  mode: 'long-mult',
  title: 'Two-Digit Multiplication', titleVn: 'Nhân số có hai chữ số',
  intro: 'Fill in one box at a time. The grid checks each digit as you go, and shows you where a carry went wrong.',
  introVn: 'Điền từng ô một. Lưới kiểm tra từng chữ số khi em làm, và chỉ cho em chỗ nào bị sai số nhớ.',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[23, 12], [31, 21], [42, 13]] },
    { level: 'Carries', levelVn: 'Có nhớ', items: [[47, 26], [68, 34], [59, 47]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[236, 47], [418, 65]] },
  ],
};
