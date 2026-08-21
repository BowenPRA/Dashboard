// src/data/AOPS/QUAD_1B/assessment.js
// Timed check for Zeros and the Factored Form. All MCQ, bilingual explanation
// on every item.
//
// NOTE: Assessment.jsx renders maths only inside $$...$$ (double dollar); a
// single $ is literal. Every equation below is wrapped accordingly.
//
// Item 10 deliberately needs both halves of the pair: the zeros give the axis
// of symmetry, and the axis gives the vertex — which is the exit question of
// the deck asked a second way.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_zero_meaning',
      type: 'mcq',
      title: '1. A curve has a zero at x = 3. Which point is definitely on the curve?',
      options: [
        { val: 'A', text: 'A. (0, 3)' },
        { val: 'B', text: 'B. (3, 3)' },
        { val: 'C', text: 'C. (3, 0)' },
        { val: 'D', text: 'D. (-3, 0)' },
      ],
      correct: 'C',
      expEn: 'A zero is an x that makes y come out as 0, so the point is (3, 0) — three across, nothing up. Option A swaps the coordinates and puts the 3 on the wrong axis.',
      expVn: 'Nghiệm là giá trị x làm cho y bằng 0, nên điểm đó là (3, 0) — đi ngang ba, không đi lên. Đáp án A đảo hai tọa độ và đặt số 3 lên nhầm trục.',
    },
    {
      id: 'q2_read_factored',
      type: 'mcq',
      title: '2. What are the zeros of $$y = (x - 5)(x + 2)$$?',
      options: [
        { val: 'A', text: 'A. 5 and -2' },
        { val: 'B', text: 'B. -5 and 2' },
        { val: 'C', text: 'C. 5 and 2' },
        { val: 'D', text: 'D. -5 and -2' },
      ],
      correct: 'A',
      expEn: 'Solve each bracket. $$x - 5 = 0$$ gives 5, and $$x + 2 = 0$$ gives -2. The signs always come out opposite to the ones printed, which is why solving beats reading.',
      expVn: 'Giải từng ngoặc. $$x - 5 = 0$$ cho 5, và $$x + 2 = 0$$ cho -2. Dấu luôn ra ngược với dấu in trên giấy, nên giải bao giờ cũng chắc hơn đọc.',
    },
    {
      id: 'q3_zero_product',
      type: 'mcq',
      title: '3. If $$A \\times B = 0$$, which statement is always true?',
      options: [
        { val: 'A', text: 'A. Both A and B are zero' },
        { val: 'B', text: 'B. At least one of A and B is zero' },
        { val: 'C', text: 'C. A and B add up to zero' },
        { val: 'D', text: 'D. A and B are opposite numbers' },
      ],
      correct: 'B',
      expEn: 'A product is zero exactly when one of the factors is zero — it may be one of them or both, but it cannot be neither. Option A is too strong: $$0 \\times 7 = 0$$ with only one zero involved.',
      expVn: 'Tích bằng không đúng khi có một thừa số bằng không — có thể một, có thể cả hai, nhưng không thể không cái nào. Đáp án A quá chặt: $$0 \\times 7 = 0$$ mà chỉ có một số bằng không.',
    },
    {
      id: 'q4_how_many',
      type: 'mcq',
      title: '4. How many times can a parabola cross the x-axis?',
      options: [
        { val: 'A', text: 'A. Always exactly twice' },
        { val: 'B', text: 'B. Twice, once, or never' },
        { val: 'C', text: 'C. Any number of times' },
        { val: 'D', text: 'D. Once or never' },
      ],
      correct: 'B',
      expEn: 'A parabola turns only once, so it can cut the axis on the way down and again on the way up (twice), touch it at the turn (once), or stay clear of it (never). A third crossing would need a second turn.',
      expVn: 'Parabol chỉ quay đầu một lần, nên nó có thể cắt trục lúc đi xuống rồi cắt lại lúc đi lên (hai lần), chạm trục ngay chỗ quay đầu (một lần), hoặc không chạm (không lần nào). Muốn cắt lần thứ ba thì phải quay đầu lần thứ hai.',
    },
    {
      id: 'q5_no_zeros',
      type: 'mcq',
      title: '5. Which of these has NO zeros?',
      options: [
        { val: 'A', text: 'A. $$y = x^2 - 1$$' },
        { val: 'B', text: 'B. $$y = (x - 4)^2$$' },
        { val: 'C', text: 'C. $$y = (x + 1)(x - 1)$$' },
        { val: 'D', text: 'D. $$y = (x - 2)^2 + 3$$' },
      ],
      correct: 'D',
      expEn: 'In D the vertex is (2, 3), above the axis, and the curve opens upwards — a square is never negative, so y is never smaller than 3. A and C are the same curve written two ways, crossing at -1 and 1; B touches the axis once at x = 4.',
      expVn: 'Ở D, đỉnh là (2, 3), nằm trên trục x, và đường cong mở lên trên — bình phương không bao giờ âm, nên y không bao giờ nhỏ hơn 3. A và C là cùng một đường cong viết theo hai cách, cắt trục tại -1 và 1; B chạm trục đúng một lần tại x = 4.',
    },
    {
      id: 'q6_touching',
      type: 'mcq',
      title: '6. A parabola touches the x-axis exactly once, at x = -3. Which equation could it be?',
      options: [
        { val: 'A', text: 'A. $$y = (x + 3)^2$$' },
        { val: 'B', text: 'B. $$y = (x - 3)^2$$' },
        { val: 'C', text: 'C. $$y = (x + 3)(x - 3)$$' },
        { val: 'D', text: 'D. $$y = x^2 + 3$$' },
      ],
      correct: 'A',
      expEn: 'Touching once means both zeros are at the same place, so both brackets must be the same, and the zero must be -3: $$x + 3 = 0$$ gives $$x = -3$$. Option C has two different zeros, at 3 and -3, so it crosses twice.',
      expVn: 'Chạm một lần nghĩa là hai nghiệm ở cùng một chỗ, nên hai ngoặc phải giống nhau, và nghiệm phải là -3: $$x + 3 = 0$$ cho $$x = -3$$. Đáp án C có hai nghiệm khác nhau, tại 3 và -3, nên nó cắt trục hai lần.',
    },
    {
      id: 'q7_square_root',
      type: 'mcq',
      title: '7. Solve $$(x - 4)^2 = 25$$.',
      options: [
        { val: 'A', text: 'A. x = 9 only' },
        { val: 'B', text: 'B. x = 29 or x = -21' },
        { val: 'C', text: 'C. x = 9 or x = -1' },
        { val: 'D', text: 'D. x = 5 or x = -5' },
      ],
      correct: 'C',
      expEn: 'Both 5 and -5 square to 25, so $$x - 4 = 5$$ or $$x - 4 = -5$$, giving x = 9 or x = -1. Option A loses the minus root; option B adds 25 instead of square-rooting.',
      expVn: 'Cả 5 và -5 đều bình phương ra 25, nên $$x - 4 = 5$$ hoặc $$x - 4 = -5$$, cho x = 9 hoặc x = -1. Đáp án A đánh mất nghiệm âm; đáp án B cộng 25 thay vì lấy căn.',
    },
    {
      id: 'q8_build_from_zeros',
      type: 'mcq',
      title: '8. Which equation has zeros at x = -4 and x = 1?',
      options: [
        { val: 'A', text: 'A. $$y = (x - 4)(x + 1)$$' },
        { val: 'B', text: 'B. $$y = (x + 4)(x - 1)$$' },
        { val: 'C', text: 'C. $$y = (x + 4)(x + 1)$$' },
        { val: 'D', text: 'D. $$y = (x - 4)(x - 1)$$' },
      ],
      correct: 'B',
      expEn: 'Work backwards: a zero at -4 needs a bracket that is zero when x is -4, which is $$(x + 4)$$; a zero at 1 needs $$(x - 1)$$. Check by substituting -4 into B — the first bracket becomes 0, so y is 0.',
      expVn: 'Làm ngược lại: nghiệm tại -4 cần ngoặc bằng không khi x bằng -4, tức là $$(x + 4)$$; nghiệm tại 1 cần $$(x - 1)$$. Kiểm tra bằng cách thế -4 vào B — ngoặc đầu bằng 0, nên y bằng 0.',
    },
    {
      id: 'q9_which_form',
      type: 'mcq',
      title: '9. You need the greatest height a ball reaches. Which form of the equation helps most?',
      options: [
        { val: 'A', text: 'A. Factored form, because it shows the zeros' },
        { val: 'B', text: 'B. Either one, they show the same thing' },
        { val: 'C', text: 'C. Vertex form, because the vertex is the maximum' },
        { val: 'D', text: 'D. Neither, you must plot a table of values' },
      ],
      correct: 'C',
      expEn: 'The greatest height is the y of the vertex, and vertex form prints that number as k. Factored form answers a different question — when the ball is at height zero, which is when it was thrown and when it lands.',
      expVn: 'Chiều cao lớn nhất chính là giá trị y của đỉnh, và dạng đỉnh in sẵn số đó dưới tên k. Dạng tích trả lời câu hỏi khác — lúc nào bóng ở độ cao bằng không, tức là lúc ném và lúc chạm đất.',
    },
    {
      id: 'q10_vertex_from_zeros',
      type: 'mcq',
      title: '10. A parabola has zeros at x = 2 and x = 8. Where is its axis of symmetry?',
      options: [
        { val: 'A', text: 'A. x = 5' },
        { val: 'B', text: 'B. x = 10' },
        { val: 'C', text: 'C. x = 6' },
        { val: 'D', text: 'D. x = 3' },
      ],
      correct: 'A',
      expEn: 'The zeros sit the same distance either side of the axis of symmetry, so the axis is their midpoint: $$(2 + 8) \\div 2 = 5$$. Option B adds them without halving; option C subtracts them.',
      expVn: 'Hai nghiệm nằm cách đều hai bên trục đối xứng, nên trục là trung điểm của chúng: $$(2 + 8) \\div 2 = 5$$. Đáp án B cộng lại mà quên chia đôi; đáp án C là hiệu của chúng.',
    },
  ],
};
