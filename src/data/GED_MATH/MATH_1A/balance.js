// src/data/GED_MATH/MATH_1A/balance.js
// Equations for the Balance task, matched to this unit: the golden rule, then
// one-step, then two-step solving. See docs/balance-tasks.md.
//
// Difficulty is deliberately held at the unit's level — every answer is a whole
// number and no equation has x on both sides. The engine already handles
// harder shapes when a later unit wants them.

export const balance = [
  {
    id: 'e1',
    equation: 'x + 9 = 15',
    prompt: 'One step. What is being done to x, and what undoes it?',
    promptVn: 'Một bước. Đang làm gì với x, và phép nào hoàn tác nó?',
  },
  {
    id: 'e2',
    equation: '4x = 32',
    prompt: 'x is being multiplied by 4. Undo it on both sides.',
    promptVn: 'x đang bị nhân với 4. Hãy hoàn tác ở cả hai vế.',
  },
  {
    id: 'e3',
    equation: 'x - 6 = 10',
    prompt: 'Careful with the sign — what undoes subtracting 6?',
    promptVn: 'Cẩn thận với dấu — phép nào hoàn tác việc trừ 6?',
  },
  {
    id: 'e4',
    equation: '3x + 7 = 22',
    prompt: 'Two steps. Clear the +7 first, then deal with the 3.',
    promptVn: 'Hai bước. Bỏ +7 trước, rồi xử lý số 3.',
  },
  {
    id: 'e5',
    equation: '2x - 5 = 11',
    prompt: 'Two steps. Undo the subtraction before the multiplication.',
    promptVn: 'Hai bước. Hoàn tác phép trừ trước phép nhân.',
  },
  {
    id: 'e6',
    equation: '5x + 4 = 39',
    prompt: 'Same shape as before. Which number goes first?',
    promptVn: 'Cùng dạng như trước. Số nào làm trước?',
  },
  {
    id: 'e7',
    equation: '3x - 12 = 24',
    prompt: 'Two steps, and the answer is bigger than you might expect.',
    promptVn: 'Hai bước, và đáp án lớn hơn bạn nghĩ.',
  },
  {
    id: 'e8',
    equation: '6x + 5 = 5',
    prompt: 'Nothing is broken — some equations really do give x = 0.',
    promptVn: 'Không có gì sai — một số phương trình thật sự cho x = 0.',
  },
];
