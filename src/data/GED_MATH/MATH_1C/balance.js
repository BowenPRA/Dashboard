// src/data/GED_MATH/MATH_1C/balance.js
// Equations for the Balance task, matched to this unit: denominators, and the
// move that gets rid of them. See docs/balance-tasks.md.
//
// This is the unit's main drill and it is deliberately LONG — twenty equations,
// because balancing is a habit rather than a fact, and a habit needs reps. The
// task scores the SHARE solved without a hint, so length costs the student
// nothing; it only buys them practice.
//
// The ladder, in order:
//   1-2    no fractions at all — the shapes from MATH_1B, to start on solid ground
//   3-5    one denominator under a single term
//   6-8    a whole expression over one denominator, number on the other side
//   9-13   a fraction on BOTH sides — the shape the GED actually asks
//   14     fractions and whole numbers mixed on both sides
//   15-20  bigger LCDs, and answers that come out negative
//
// Every answer is a whole number and `npm run validate` proves it — the engine
// does exact fractions, so a stray "4x = 15" would quietly answer 15/4 and the
// student would assume they had broken something.
//
// Authoring note: a numerator constant that divides by its own denominator
// cannot be shown as one quotient. "(x + 6)/3" holds x/3 and 2, and 2 is a
// whole number, so it renders as "x/3 + 2" — true, but not what you typed.
// Keep the constant indivisible by the denominator and it stays a fraction.

export const balance = [
  {
    id: 'e1',
    equation: '4x + 9 = 33',
    prompt: 'Warm up on ground you know. Two steps, no fractions anywhere.',
    promptVn: 'Khởi động trên nền quen thuộc. Hai bước, không có phân số nào.',
  },
  {
    id: 'e2',
    equation: '7x - 4 = 3x + 20',
    prompt: 'x on both sides. Take the smaller x term off both sides first.',
    promptVn: 'x ở cả hai vế. Hãy bỏ số hạng x nhỏ hơn khỏi cả hai vế trước.',
  },
  {
    id: 'e3',
    equation: 'x/3 = 7',
    prompt: 'x is being DIVIDED by 3. What undoes a division?',
    promptVn: 'x đang bị CHIA cho 3. Phép nào hoàn tác phép chia?',
  },
  {
    id: 'e4',
    equation: 'x/4 + 5 = 11',
    prompt: 'Multiply both sides by 4 — and watch it land on the 5 and the 11 too.',
    promptVn: 'Nhân cả hai vế cho 4 — và chú ý nó cũng tác động lên số 5 và số 11.',
  },
  {
    id: 'e5',
    equation: '2x/5 - 3 = 1',
    prompt: 'The 2 rides on top of the fraction. Clear the 5 first, deal with the 2 last.',
    promptVn: 'Số 2 nằm trên tử số. Hãy khử số 5 trước, xử lý số 2 sau cùng.',
  },
  {
    id: 'e6',
    equation: '(x + 4)/3 = 5',
    prompt: 'The bar divides the WHOLE bracket. Multiply both sides by 3.',
    promptVn: 'Gạch phân số chia CẢ ngoặc. Hãy nhân cả hai vế cho 3.',
  },
  {
    id: 'e7',
    equation: '(2x - 5)/3 = 3',
    prompt: 'Same move as before. Three steps this time, because of the 2 in front of x.',
    promptVn: 'Cùng một bước như trước. Lần này ba bước, vì có số 2 đứng trước x.',
  },
  {
    id: 'e8',
    equation: '(3x + 1)/5 = 2',
    prompt: 'Clear the 5, then finish the way you always do.',
    promptVn: 'Khử số 5, rồi kết thúc theo cách bạn vẫn luôn làm.',
  },
  {
    id: 'e9',
    equation: '(4x + 2)/3 = (2x + 8)/3',
    prompt: 'Fractions on both sides — but the same denominator. One multiply clears both.',
    promptVn: 'Phân số ở cả hai vế — nhưng cùng mẫu số. Một phép nhân khử được cả hai.',
  },
  {
    id: 'e10',
    equation: '(x + 1)/2 = (x + 4)/3',
    prompt: 'Two different denominators now. Find a number that 2 and 3 both divide into.',
    promptVn: 'Bây giờ có hai mẫu số khác nhau. Hãy tìm số mà cả 2 và 3 đều chia hết.',
  },
  {
    id: 'e11',
    equation: '(x - 3)/2 = (2x + 1)/3',
    prompt: 'Multiply both sides by 6, then collect the x terms. The answer is negative.',
    promptVn: 'Nhân cả hai vế cho 6, rồi gom các số hạng x. Đáp án là số âm.',
  },
  {
    id: 'e12',
    equation: '(x - 5)/3 = (x + 1)/5',
    prompt: 'Which number do 3 and 5 both divide into? Multiply by it.',
    promptVn: 'Số nào mà cả 3 và 5 đều chia hết? Hãy nhân cho số đó.',
  },
  {
    id: 'e13',
    equation: '(3x - 1)/4 = (x + 5)/2',
    prompt: 'You do not need 8 here. The smaller number 4 already clears both sides.',
    promptVn: 'Ở đây bạn không cần số 8. Số 4 nhỏ hơn đã khử được cả hai vế.',
  },
  {
    id: 'e14',
    equation: 'x/2 + 3 = x/5 + 6',
    prompt: 'Fractions and whole numbers together. Clearing first keeps it tidy.',
    promptVn: 'Phân số và số nguyên đi cùng nhau. Khử mẫu trước sẽ gọn gàng hơn.',
  },
  {
    id: 'e15',
    equation: '(2x + 3)/5 = (x + 4)/3',
    prompt: 'A bigger LCD. Take it slowly and multiply out both brackets carefully.',
    promptVn: 'Mẫu số chung lớn hơn. Hãy làm chậm và khai triển cẩn thận cả hai ngoặc.',
  },
  {
    id: 'e16',
    equation: '(x + 7)/4 = (3x - 1)/8',
    prompt: '4 divides into 8, so 8 is all you need.',
    promptVn: '4 chia hết vào 8, nên bạn chỉ cần số 8.',
  },
  {
    id: 'e17',
    equation: '(2x + 5)/6 = (x - 1)/2',
    prompt: 'Same trick: 2 divides into 6. One multiply and both fractions are gone.',
    promptVn: 'Cùng mẹo đó: 2 chia hết vào 6. Một phép nhân và cả hai phân số biến mất.',
  },
  {
    id: 'e18',
    equation: '(x - 1)/4 = (x + 5)/2',
    prompt: 'Do not be alarmed by a negative answer — check it and you will see it fits.',
    promptVn: 'Đừng lo lắng vì đáp án âm — hãy thử lại và bạn sẽ thấy nó đúng.',
  },
  {
    id: 'e19',
    equation: '(x - 9)/4 = (x - 5)/3',
    prompt: 'Both numerators are subtractions. Keep the brackets when you multiply.',
    promptVn: 'Cả hai tử số đều là phép trừ. Hãy giữ ngoặc khi bạn nhân.',
  },
  {
    id: 'e20',
    equation: '(x - 9)/2 = (4x - 3)/5',
    prompt: 'The last one. Everything the unit taught, in a single equation.',
    promptVn: 'Bài cuối cùng. Tất cả những gì đã học, trong một phương trình.',
  },
];
