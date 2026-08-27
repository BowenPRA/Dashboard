// src/data/Y7_MATH/U01_6/drill.js
// The Number Gym drill for 1.6. long-mult — squaring two-digit numbers by hand.
// NumberDrill.jsx derives every partial product, carry and column sum.
//
// The square list stops being magic once you can build it: 25², 32², 47² by
// hand are just two-digit multiplications where both operands are the same. A
// rung unlocks when the one above is clear.

export const drill = {
  mode: 'long-mult',
  title: 'Square It by Hand', titleVn: 'Tự bình phương bằng tay',
  intro: 'Each problem is a number times itself. Fill in one box at a time; the grid checks each digit as you go.',
  introVn: 'Mỗi bài là một số nhân với chính nó. Điền từng ô một; lưới kiểm tra từng chữ số khi em làm.',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[13, 13], [14, 14], [21, 21]] },
    { level: 'Carries', levelVn: 'Có nhớ', items: [[25, 25], [32, 32], [47, 47]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[68, 68], [99, 99]] },
  ],
};
