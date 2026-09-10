// src/data/ACELLUS/ALG_INEQ/balance.js
// Balance — solving an inequality one legal move at a time.
//
// There is no answer key here and no step list. The engine
// (src/utils/linearEquation.js) works out the legal moves, the target step
// count and the hint from the statement itself, and `npm run validate` proves
// every one of these is solvable by the taught strategy, keeps its direction,
// and lands on a whole number.
//
// What is new for this unit is the RELATION. The beam no longer sits level: the
// heavier side hangs lower, and it stays lower through every add and subtract.
// Then the student divides by a negative and the whole beam swings over. That
// is the flip rule happening in front of them rather than being recited at
// them, and it is why these are worth solving on the balance rather than on
// paper.
//
// Order is by SHAPE, not by size of number:
//   1–3    one move, no flip
//   4–5    two moves, including the fraction from their Acellus screen
//   6–9    the flip, four different ways of meeting it
//   10–12  a variable on both sides, ending on one whose answer comes out
//          written backwards
//   13     a fraction AND a flip together
export const balance = [
  {
    id: 'i1',
    equation: 'x + 7 <= 3',
    prompt: 'One move. The sign never moves when you add or subtract.',
    promptVn: 'Một bước. Dấu không bao giờ đổi khi em cộng hoặc trừ.',
  },
  {
    id: 'i2',
    equation: '-6 < x - 11',
    prompt: 'From your Acellus screen. The x is on the right — leave it there and clear the 11.',
    promptVn: 'Từ màn hình Acellus của em. x đang ở vế phải — cứ để nguyên và khử số 11.',
  },
  {
    id: 'i3',
    equation: '4x >= 20',
    prompt: 'Divide by 4. Four is positive, so watch the sign stay exactly where it is.',
    promptVn: 'Chia cho 4. Bốn là số dương, nên hãy quan sát dấu giữ nguyên vị trí.',
  },
  {
    id: 'i4',
    equation: '3x - 6 < 21',
    prompt: 'Two moves. Clear the −6 first, then deal with the 3.',
    promptVn: 'Hai bước. Khử −6 trước, rồi xử lý số 3.',
  },
  {
    id: 'i5',
    equation: 'x/2 - 2 <= 20',
    prompt: 'From your Acellus screen. Multiply everything by 2 first and the fraction disappears.',
    promptVn: 'Từ màn hình Acellus của em. Nhân tất cả với 2 trước thì phân số biến mất.',
  },
  {
    id: 'i6',
    equation: '-2x > 6',
    prompt: 'Divide by −2 and watch the beam. This is the flip.',
    promptVn: 'Chia cho −2 và quan sát cái cân. Đây chính là lúc đảo dấu.',
  },
  {
    id: 'i7',
    equation: '-5x + 3 >= -12',
    prompt: 'Clear the +3, then divide by −5. Predict which way the sign will end up before you press the button.',
    promptVn: 'Khử +3, rồi chia cho −5. Hãy đoán trước dấu sẽ quay về hướng nào rồi mới bấm nút.',
  },
  {
    id: 'i8',
    equation: '9 - 2x >= 1',
    prompt: 'The x term is negative even though it is written second. Clear the 9 first.',
    promptVn: 'Số hạng chứa x là số âm dù nó được viết sau. Hãy khử số 9 trước.',
  },
  {
    id: 'i9',
    equation: '4 - x < 10',
    prompt: 'The coefficient here is −1. Dividing by −1 is still dividing by a negative.',
    promptVn: 'Hệ số ở đây là −1. Chia cho −1 vẫn là chia cho một số âm.',
  },
  {
    id: 'i10',
    equation: '5x <= -3x + 8',
    prompt: 'From your Acellus screen. Add 3x to both sides and you will never need the flip.',
    promptVn: 'Từ màn hình Acellus của em. Cộng 3x vào cả hai vế thì em sẽ không phải đảo dấu.',
  },
  {
    id: 'i11',
    equation: '6x - 4 < 2x + 12',
    prompt: 'Collect the x terms on the side that leaves you a positive coefficient.',
    promptVn: 'Gom các số hạng x về vế nào để hệ số còn lại là số dương.',
  },
  {
    id: 'i12',
    equation: '7 - 3x > x + 15',
    prompt: 'This one finishes with the x on the right. Read the last line carefully before you write the answer down.',
    promptVn: 'Bài này kết thúc với x ở vế phải. Hãy đọc kỹ dòng cuối trước khi viết đáp án.',
  },
  {
    id: 'i13',
    equation: '-x/3 + 1 > 4',
    prompt: 'A fraction and a negative together. Clear the fraction first, then take the flip.',
    promptVn: 'Vừa có phân số vừa có số âm. Khử phân số trước, rồi mới đảo dấu.',
  },
];
