// src/data/ACELLUS/ALG_INEQ/assessment.js
// The unit quiz. Twelve items, timed, with a bilingual explanation on every one
// — including on the wrong options, because the review screen is where the
// teaching happens for a student who missed it.
//
// NOTE ON MATHS MARKUP: Assessment.jsx parses ONLY `$$…$$`, and renders it
// inline (see parseText). A single `$…$` is left as literal text, so every piece
// of notation in this file is wrapped in double dollars.
//
// The answer key is spread across all four letters deliberately — the validator
// warns if one letter carries more than half the MCQs, because a lopsided key
// can be guessed.
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1500, // 25 minutes
  passages: [],
  questions: [
    {
      id: 'q1_one_step',
      type: 'mcq',
      title: '1. Solve the inequality:  $$x - 4 \\geq 2$$',
      options: [
        { val: 'A', text: 'A. $$x \\geq 6$$' },
        { val: 'B', text: 'B. $$x \\geq -2$$' },
        { val: 'C', text: 'C. $$x \\leq 6$$' },
        { val: 'D', text: 'D. $$x > 6$$' },
      ],
      correct: 'A',
      expEn: 'Add 4 to both sides. Adding never changes the direction of the sign, so it stays as it started: $$x \\geq 6$$. Option C flips a sign that had no reason to flip, and D loses the "or equal to" line.',
      expVn: 'Cộng 4 vào cả hai vế. Phép cộng không bao giờ đổi hướng dấu, nên dấu giữ nguyên: $$x \\geq 6$$. Phương án C đảo dấu dù không có lý do, còn D làm mất phần "hoặc bằng".',
    },
    {
      id: 'q2_flip',
      type: 'mcq',
      title: '2. Solve the inequality:  $$-3x < 12$$',
      options: [
        { val: 'A', text: 'A. $$x < -4$$' },
        { val: 'B', text: 'B. $$x > -4$$' },
        { val: 'C', text: 'C. $$x < 4$$' },
        { val: 'D', text: 'D. $$x > 4$$' },
      ],
      correct: 'B',
      expEn: 'Divide both sides by $$-3$$ to get $$-4$$ — and because you divided by a NEGATIVE, the sign turns round: $$x > -4$$. Test it with $$x = 0$$: $$-3 \\times 0 = 0$$, and $$0 < 12$$ is true, so 0 must be in the answer. Only B contains 0.',
      expVn: 'Chia cả hai vế cho $$-3$$ được $$-4$$ — và vì em chia cho một số ÂM nên dấu đảo chiều: $$x > -4$$. Thử $$x = 0$$: $$-3 \\times 0 = 0$$, và $$0 < 12$$ là đúng, nên 0 phải nằm trong đáp án. Chỉ có B chứa 0.',
    },
    {
      id: 'q3_rule',
      type: 'inline',
      title: '3. Complete the rule.',
      options: [],
      textParts: [
        'You must reverse the direction of an inequality sign when you ',
        ' both sides by a ',
        ' number.',
      ],
      textPartsVn: [
        'Em phải đảo chiều dấu bất phương trình khi ',
        ' cả hai vế cho một số ',
        '.',
      ],
      blanks: {
        1: {
          correct: 'multiply or divide',
          options: [
            { val: 'multiply or divide', text: 'multiply or divide', textVn: 'nhân hoặc chia' },
            { val: 'add or subtract', text: 'add or subtract', textVn: 'cộng hoặc trừ' },
            { val: 'square', text: 'square', textVn: 'bình phương' },
          ],
        },
        2: {
          correct: 'negative',
          options: [
            { val: 'negative', text: 'negative', textVn: 'âm' },
            { val: 'positive', text: 'positive', textVn: 'dương' },
            { val: 'whole', text: 'whole', textVn: 'nguyên' },
          ],
        },
      },
      expEn: 'Only multiplying and dividing can turn the sign round, and only when the number used is negative. Adding and subtracting slide both sides along the number line by the same amount, so their order never changes.',
      expVn: 'Chỉ phép nhân và phép chia mới có thể đảo dấu, và chỉ khi số dùng để nhân/chia là số âm. Phép cộng và trừ dịch cả hai vế trên trục số một lượng như nhau, nên thứ tự của chúng không đổi.',
    },
    {
      id: 'q4_circle',
      type: 'mcq',
      title: '4. Which number line is drawn correctly?',
      inlineSvg: DIAGRAMS.OPEN_VS_CLOSED,
      options: [
        { val: 'A', text: 'A. Both lines should use an open circle' },
        { val: 'B', text: 'B. Both lines should use a filled circle' },
        { val: 'C', text: 'C. Both are correct: $$>$$ is open and $$\\geq$$ is filled' },
        { val: 'D', text: 'D. Both are wrong: the shading should go left' },
      ],
      correct: 'C',
      expEn: 'The circle answers one question: is the endpoint itself a solution? $$x > 2$$ says no, so it is drawn empty. $$x \\geq 2$$ says yes, so it is filled in. Both diagrams shade to the right, which is correct for "greater than".',
      expVn: 'Vòng tròn trả lời đúng một câu hỏi: chính điểm mút có phải là nghiệm không? $$x > 2$$ nói không, nên vẽ rỗng. $$x \\geq 2$$ nói có, nên tô đặc. Cả hai hình đều tô sang phải, đúng với "lớn hơn".',
    },
    {
      id: 'q5_words',
      type: 'mcq',
      title: '5. A ferry may carry at most 40 cars. Which inequality says that?',
      options: [
        { val: 'A', text: 'A. $$c > 40$$' },
        { val: 'B', text: 'B. $$c < 40$$' },
        { val: 'C', text: 'C. $$c \\geq 40$$' },
        { val: 'D', text: 'D. $$c \\leq 40$$' },
      ],
      correct: 'D',
      expEn: '"At most 40" means 40 is allowed but 41 is not, so the sign must include equality: $$c \\leq 40$$. Choosing $$c < 40$$ would ban a ferry carrying exactly 40 cars, which is not what the rule says.',
      expVn: '"Nhiều nhất 40" nghĩa là 40 thì được nhưng 41 thì không, nên dấu phải bao gồm cả bằng: $$c \\leq 40$$. Chọn $$c < 40$$ sẽ cấm chuyến phà chở đúng 40 xe, mà quy định không nói vậy.',
    },
    {
      id: 'q6_two_step',
      type: 'fill_blank',
      title: '6. Solve:  $$2x + 9 > 3$$',
      textParts: ['$$x >$$', ''],
      textPartsVn: ['$$x >$$', ''],
      blanks: {
        1: { correct: '-3', width: 5, accept: [] },
      },
      expEn: 'Subtract 9 from both sides: $$2x > -6$$. Then divide by 2. Two is positive, so the sign does not move, and $$-6 \\div 2 = -3$$. The answer is $$x > -3$$.',
      expVn: 'Trừ 9 ở cả hai vế: $$2x > -6$$. Rồi chia cho 2. Hai là số dương nên dấu không đổi, và $$-6 \\div 2 = -3$$. Đáp án là $$x > -3$$.',
    },
    {
      id: 'q7_interval_ray',
      type: 'mcq',
      title: '7. Write $$x > 3$$ in interval notation.',
      options: [
        { val: 'A', text: 'A. $$[3, \\infty]$$' },
        { val: 'B', text: 'B. $$(3, \\infty)$$' },
        { val: 'C', text: 'C. $$[3, \\infty)$$' },
        { val: 'D', text: 'D. $$(-\\infty, 3)$$' },
      ],
      correct: 'B',
      expEn: 'The sign is a strict $$>$$, so 3 itself is not a solution and its bracket is round. Infinity can never be reached, so its bracket is always round too: $$(3, \\infty)$$. Option A puts a square bracket on infinity, which is never correct.',
      expVn: 'Dấu là $$>$$ nghiêm ngặt, nên chính số 3 không phải nghiệm và ngoặc của nó là ngoặc tròn. Vô cực không bao giờ chạm tới được, nên ngoặc của nó cũng luôn tròn: $$(3, \\infty)$$. Phương án A đặt ngoặc vuông với vô cực, điều đó không bao giờ đúng.',
    },
    {
      id: 'q8_interval_from_graph',
      type: 'mcq',
      title: '8. A number line has a filled circle at $$-3$$, an open circle at $$5$$, and the part between them shaded. Which interval is that?',
      options: [
        { val: 'A', text: 'A. $$(-3, 5]$$' },
        { val: 'B', text: 'B. $$(-3, 5)$$' },
        { val: 'C', text: 'C. $$[-3, 5)$$' },
        { val: 'D', text: 'D. $$[5, -3]$$' },
      ],
      correct: 'C',
      expEn: 'Take the ends one at a time. The circle at $$-3$$ is filled, so that end is square. The circle at 5 is open, so that end is round: $$[-3, 5)$$. Option A has both brackets on the wrong ends, and D writes the numbers backwards.',
      expVn: 'Xét từng đầu một. Vòng tròn tại $$-3$$ là đặc, nên đầu đó dùng ngoặc vuông. Vòng tròn tại 5 là rỗng, nên đầu đó dùng ngoặc tròn: $$[-3, 5)$$. Phương án A đặt hai ngoặc ngược đầu, còn D viết hai số sai thứ tự.',
    },
    {
      id: 'q9_compound',
      type: 'mcq',
      title: '9. Solve the compound inequality:  $$-4 \\leq 2x < 10$$',
      options: [
        { val: 'A', text: 'A. $$-2 \\leq x < 5$$' },
        { val: 'B', text: 'B. $$-2 < x \\leq 5$$' },
        { val: 'C', text: 'C. $$-8 \\leq x < 20$$' },
        { val: 'D', text: 'D. $$-2 \\leq x < 10$$' },
      ],
      correct: 'A',
      expEn: 'Divide all three parts by 2: $$-4 \\div 2 = -2$$ and $$10 \\div 2 = 5$$. Two is positive, so each sign keeps the shape it had — the $$\\leq$$ stays on the left. Option C multiplied by 2 instead of dividing, and D forgot to divide the right-hand end at all.',
      expVn: 'Chia cả ba phần cho 2: $$-4 \\div 2 = -2$$ và $$10 \\div 2 = 5$$. Hai là số dương, nên mỗi dấu giữ nguyên hình dạng — $$\\leq$$ vẫn ở bên trái. Phương án C nhân với 2 thay vì chia, còn D quên chia đầu bên phải.',
    },
    {
      id: 'q10_union',
      type: 'mcq',
      title: '10. If $$A = \\{2, 3, 4\\}$$ and $$B = \\{1, 5, 7\\}$$, what is $$A \\cup B$$?',
      inlineSvg: DIAGRAMS.SETS_AND_OR,
      options: [
        { val: 'A', text: 'A. $$\\emptyset$$' },
        { val: 'B', text: 'B. $$\\{2, 3, 4\\}$$' },
        { val: 'C', text: 'C. $$\\{1, 2, 3\\}$$' },
        { val: 'D', text: 'D. $$\\{1, 2, 3, 4, 5, 7\\}$$' },
      ],
      correct: 'D',
      expEn: 'The cup $$\\cup$$ is the UNION: everything that is in either list, each member written once, in order. Nothing is left out. Option A would be the answer if the question asked for the intersection $$A \\cap B$$, since these two sets share no members.',
      expVn: 'Dấu $$\\cup$$ là HỢP: mọi phần tử thuộc một trong hai tập, mỗi phần tử viết một lần, theo thứ tự. Không bỏ sót gì. Phương án A sẽ là đáp án nếu đề hỏi giao $$A \\cap B$$, vì hai tập này không có phần tử chung.',
    },
    {
      id: 'q11_abs_equation',
      type: 'mcq',
      title: '11. Solve:  $$3|x - 1| = 15$$',
      inlineSvg: DIAGRAMS.ABS_DISTANCE,
      options: [
        { val: 'A', text: 'A. $$x = 6$$ only' },
        { val: 'B', text: 'B. $$x = -4$$ and $$x = 6$$' },
        { val: 'C', text: 'C. $$x = 16$$ only' },
        { val: 'D', text: 'D. $$x = -6$$ and $$x = 6$$' },
      ],
      correct: 'B',
      expEn: 'Divide both sides by 3 FIRST, to leave the bars alone: $$|x - 1| = 5$$. That says $$x - 1$$ is 5 away from zero, in either direction, so $$x - 1 = 5$$ or $$x - 1 = -5$$, giving $$x = 6$$ and $$x = -4$$. Option A keeps only half the answer.',
      expVn: 'TRƯỚC HẾT chia cả hai vế cho 3 để dấu giá trị tuyệt đối đứng riêng: $$|x - 1| = 5$$. Nghĩa là $$x - 1$$ cách 0 đúng 5 đơn vị, theo cả hai hướng, nên $$x - 1 = 5$$ hoặc $$x - 1 = -5$$, cho $$x = 6$$ và $$x = -4$$. Phương án A chỉ giữ một nửa đáp án.',
    },
    {
      id: 'q12_abs_inequality',
      type: 'mcq',
      title: '12. Solve:  $$|2x - 5| > 9$$',
      inlineSvg: DIAGRAMS.ABS_LESS_GREATER,
      options: [
        { val: 'A', text: 'A. $$-2 < x < 7$$' },
        { val: 'B', text: 'B. $$x > 7$$ only' },
        { val: 'C', text: 'C. $$x > 7$$ or $$x < -2$$' },
        { val: 'D', text: 'D. $$x > 2$$ or $$x < -7$$' },
      ],
      correct: 'C',
      expEn: 'A "greater than" asks which values are FAR from zero, so the answer is two pieces. Split it: $$2x - 5 > 9$$ gives $$x > 7$$, and $$2x - 5 < -9$$ gives $$x < -2$$. Option A is the answer to the "less than" version — the inside instead of the outside.',
      expVn: '"Lớn hơn" hỏi những giá trị nào XA 0, nên đáp án gồm hai đoạn. Tách ra: $$2x - 5 > 9$$ cho $$x > 7$$, và $$2x - 5 < -9$$ cho $$x < -2$$. Phương án A là đáp án của phiên bản "nhỏ hơn" — phần bên trong thay vì bên ngoài.',
    },
  ],
};
