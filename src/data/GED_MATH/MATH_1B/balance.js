// src/data/GED_MATH/MATH_1B/balance.js
// Equations for the Balance task, matched to this unit: inverse operations,
// multi-step solving, and — the step up from 1A — the variable on both sides.
// See docs/balance-tasks.md.
//
// Still whole-number answers throughout; the difficulty rises in the SHAPE of
// the equation, not in the arithmetic.

export const balance = [
  {
    id: 'e1',
    equation: '2x + 5 = 17',
    prompt: 'Warm up. Two steps, in the usual order.',
    promptVn: 'Khởi động. Hai bước, theo thứ tự quen thuộc.',
  },
  {
    id: 'e2',
    equation: '7x - 9 = 33',
    prompt: 'Undo the subtraction first.',
    promptVn: 'Hoàn tác phép trừ trước.',
  },
  {
    id: 'e3',
    equation: '6y = -42',
    prompt: 'A negative answer is still an answer.',
    promptVn: 'Đáp án âm vẫn là một đáp án.',
  },
  {
    id: 'e4',
    equation: '5x - 3 = 2x + 12',
    prompt: 'x is on both sides. Take the smaller x term off both sides first.',
    promptVn: 'x ở cả hai vế. Hãy bỏ số hạng x nhỏ hơn khỏi cả hai vế trước.',
  },
  {
    id: 'e5',
    equation: '4x + 1 = 2x + 9',
    prompt: 'Collect the x terms, then finish as usual.',
    promptVn: 'Gom các số hạng x lại, rồi kết thúc như bình thường.',
  },
  {
    id: 'e6',
    equation: '8x - 2 = 3x + 13',
    prompt: 'Three steps: collect x, clear the number, then divide.',
    promptVn: 'Ba bước: gom x, bỏ số, rồi chia.',
  },
  {
    id: 'e7',
    equation: '9 - 2x = 1',
    prompt: 'The x term is negative. Watch what happens when you divide.',
    promptVn: 'Số hạng x là số âm. Chú ý điều gì xảy ra khi bạn chia.',
  },
  {
    id: 'e8',
    equation: '6x + 11 = 3x + 2',
    prompt: 'Collect x, and do not be surprised by a negative answer.',
    promptVn: 'Gom x, và đừng ngạc nhiên với đáp án âm.',
  },
];
