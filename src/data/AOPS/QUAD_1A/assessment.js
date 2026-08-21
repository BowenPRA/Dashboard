// src/data/AOPS/QUAD_1A/assessment.js
// Timed check for Parabolas and the Vertex Form. All MCQ, bilingual
// explanation on every item.
//
// NOTE: Assessment.jsx renders maths only inside $$...$$ (double dollar); a
// single $ is literal. So every equation below is wrapped in $$...$$ and
// everything else stays plain text.
//
// The answer key is deliberately spread across A/B/C/D — the validator warns if
// one letter carries more than half the paper, because that is a paper you can
// pass by guessing.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_vertex_read',
      type: 'mcq',
      title: '1. What is the vertex of the parabola $$y = (x - 4)^2 + 1$$?',
      options: [
        { val: 'A', text: 'A. (4, 1)' },
        { val: 'B', text: 'B. (-4, 1)' },
        { val: 'C', text: 'C. (1, 4)' },
        { val: 'D', text: 'D. (4, -1)' },
      ],
      correct: 'A',
      expEn: 'Compare with $$y = a(x - h)^2 + k$$. The bracket is zero when $$x - 4 = 0$$, so $$h = 4$$, and the number on the end is $$k = 1$$. The vertex is (4, 1). Option B is the sign trap; option C swaps the coordinates round.',
      expVn: 'So với $$y = a(x - h)^2 + k$$. Trong ngoặc bằng không khi $$x - 4 = 0$$, nên $$h = 4$$, và số ở cuối là $$k = 1$$. Đỉnh là (4, 1). Đáp án B mắc bẫy dấu; đáp án C đảo hai tọa độ.',
    },
    {
      id: 'q2_narrow',
      type: 'mcq',
      title: '2. Which of these parabolas is the WIDEST?',
      options: [
        { val: 'A', text: 'A. $$y = 3x^2$$' },
        { val: 'B', text: 'B. $$y = x^2$$' },
        { val: 'C', text: 'C. $$y = 0.2x^2$$' },
        { val: 'D', text: 'D. $$y = 10x^2$$' },
      ],
      correct: 'C',
      expEn: 'Every output is multiplied by a. A small a lifts the arms slowly, so the curve spreads out sideways; a big a pinches it in. $$0.2$$ is the smallest multiplier here, so it gives the widest curve, and $$y = 10x^2$$ is the narrowest.',
      expVn: 'Mọi giá trị đầu ra đều nhân với a. a nhỏ thì hai nhánh đi lên chậm, nên đường cong xòe rộng ra; a lớn thì khép lại. $$0.2$$ là hệ số nhỏ nhất ở đây nên cho đường cong rộng nhất, còn $$y = 10x^2$$ là hẹp nhất.',
    },
    {
      id: 'q3_shift_down',
      type: 'mcq',
      title: '3. Compared with $$y = x^2$$, the graph of $$y = x^2 - 7$$ has moved:',
      options: [
        { val: 'A', text: 'A. 7 to the left' },
        { val: 'B', text: 'B. 7 down' },
        { val: 'C', text: 'C. 7 to the right' },
        { val: 'D', text: 'D. 7 up' },
      ],
      correct: 'B',
      expEn: 'Subtracting 7 happens AFTER the squaring, so it changes every output: each y is 7 smaller and the whole curve drops. Its vertex goes from (0, 0) to (0, -7). Nothing here moves it sideways — that needs a number inside the bracket.',
      expVn: 'Phép trừ 7 xảy ra SAU khi bình phương, nên nó đổi mọi giá trị đầu ra: mỗi y nhỏ đi 7 và cả đường cong tụt xuống. Đỉnh đi từ (0, 0) tới (0, -7). Không có gì ở đây dịch nó sang ngang — muốn vậy phải có số bên trong ngoặc.',
    },
    {
      id: 'q4_sign_trap',
      type: 'mcq',
      title: '4. Where is the vertex of $$y = (x + 2)^2$$?',
      options: [
        { val: 'A', text: 'A. (2, 0)' },
        { val: 'B', text: 'B. (0, 2)' },
        { val: 'C', text: 'C. (0, -2)' },
        { val: 'D', text: 'D. (-2, 0)' },
      ],
      correct: 'D',
      expEn: 'Solve the bracket: $$x + 2 = 0$$ gives $$x = -2$$. Check it — $$(-2 + 2)^2 = 0$$, the smallest a square can be. So the vertex is (-2, 0) and the curve has moved LEFT. Reading the plus as "right" is the classic mistake.',
      expVn: 'Giải biểu thức trong ngoặc: $$x + 2 = 0$$ cho $$x = -2$$. Kiểm tra lại — $$(-2 + 2)^2 = 0$$, giá trị nhỏ nhất mà một bình phương có thể nhận. Vậy đỉnh là (-2, 0) và đường cong đã dịch sang TRÁI. Đọc dấu cộng thành "sang phải" là lỗi kinh điển.',
    },
    {
      id: 'q5_upside_down',
      type: 'mcq',
      title: '5. Which equation gives a parabola that opens DOWNWARDS?',
      options: [
        { val: 'A', text: 'A. $$y = x^2 - 9$$' },
        { val: 'B', text: 'B. $$y = -2(x - 1)^2 + 3$$' },
        { val: 'C', text: 'C. $$y = (x - 9)^2$$' },
        { val: 'D', text: 'D. $$y = 2(x + 3)^2 - 9$$' },
      ],
      correct: 'B',
      expEn: 'Only the sign of a decides which way up a parabola opens, and a is the number multiplying the bracket. In B, $$a = -2$$, so every output is negative of what it would have been and the curve turns over. The minus signs in A, C and D are inside the bracket or on the end, where they move the curve instead of flipping it.',
      expVn: 'Chỉ có dấu của a quyết định parabol mở lên hay xuống, và a là số nhân với biểu thức trong ngoặc. Ở B, $$a = -2$$, nên mọi giá trị đầu ra đổi dấu và đường cong lật ngược. Các dấu trừ ở A, C, D nằm trong ngoặc hoặc ở cuối, nơi chúng dịch chuyển đường cong chứ không lật nó.',
    },
    {
      id: 'q6_negative_square',
      type: 'mcq',
      title: '6. On the graph of $$y = x^2$$, what is y when x is -7?',
      options: [
        { val: 'A', text: 'A. 49' },
        { val: 'B', text: 'B. -49' },
        { val: 'C', text: 'C. -14' },
        { val: 'D', text: 'D. 14' },
      ],
      correct: 'A',
      expEn: '$$(-7)^2 = (-7) \\times (-7) = 49$$. A negative times a negative is positive, which is exactly why the left arm of the parabola climbs instead of falling. Options C and D double instead of squaring.',
      expVn: '$$(-7)^2 = (-7) \\times (-7) = 49$$. Âm nhân âm ra dương, và đó chính là lý do nhánh trái của parabol đi lên chứ không đi xuống. Đáp án C và D là nhân đôi thay vì bình phương.',
    },
    {
      id: 'q7_build_equation',
      type: 'mcq',
      title: '7. A parabola has the same shape as $$y = x^2$$ but its vertex is at (0, -3). Its equation is:',
      options: [
        { val: 'A', text: 'A. $$y = (x - 3)^2$$' },
        { val: 'B', text: 'B. $$y = (x + 3)^2$$' },
        { val: 'C', text: 'C. $$y = x^2 - 3$$' },
        { val: 'D', text: 'D. $$y = -3x^2$$' },
      ],
      correct: 'C',
      expEn: 'The vertex has not moved sideways (h is still 0) but it has dropped 3, so $$k = -3$$ and the equation is $$y = x^2 - 3$$. Options A and B move it sideways instead; option D changes the width and the direction and never moves the vertex at all.',
      expVn: 'Đỉnh không dịch sang ngang (h vẫn bằng 0) nhưng tụt xuống 3, nên $$k = -3$$ và phương trình là $$y = x^2 - 3$$. Đáp án A và B lại dịch sang ngang; đáp án D đổi độ rộng và chiều mở nhưng hoàn toàn không dịch chuyển đỉnh.',
    },
    {
      id: 'q8_minimum',
      type: 'mcq',
      title: '8. What is the SMALLEST value that y can take on $$y = 2(x - 1)^2 + 4$$?',
      options: [
        { val: 'A', text: 'A. 0' },
        { val: 'B', text: 'B. 1' },
        { val: 'C', text: 'C. 2' },
        { val: 'D', text: 'D. 4' },
      ],
      correct: 'D',
      expEn: 'A square is never negative, so the smallest $$(x - 1)^2$$ can be is 0, and that happens at $$x = 1$$. Then $$y = 2 \\times 0 + 4 = 4$$. The minimum is the k of the vertex — which is why this curve never reaches the x-axis.',
      expVn: 'Bình phương không bao giờ âm, nên $$(x - 1)^2$$ nhỏ nhất bằng 0, xảy ra tại $$x = 1$$. Khi đó $$y = 2 \\times 0 + 4 = 4$$. Giá trị nhỏ nhất chính là k của đỉnh — và đó là lý do đường cong này không bao giờ chạm trục x.',
    },
    {
      id: 'q9_point_on_curve',
      type: 'mcq',
      title: '9. Which point lies on the curve $$y = (x - 1)^2$$?',
      options: [
        { val: 'A', text: 'A. (0, 1)' },
        { val: 'B', text: 'B. (1, 1)' },
        { val: 'C', text: 'C. (2, 4)' },
        { val: 'D', text: 'D. (3, 2)' },
      ],
      correct: 'A',
      expEn: 'Substitute each x and see what the equation gives. At $$x = 0$$: $$(0 - 1)^2 = 1$$, so (0, 1) is on the curve. At $$x = 1$$ the answer is 0, not 1; at $$x = 2$$ it is 1, not 4; at $$x = 3$$ it is 4, not 2.',
      expVn: 'Thay từng giá trị x và xem phương trình cho ra gì. Tại $$x = 0$$: $$(0 - 1)^2 = 1$$, nên (0, 1) nằm trên đường cong. Tại $$x = 1$$ kết quả là 0 chứ không phải 1; tại $$x = 2$$ là 1 chứ không phải 4; tại $$x = 3$$ là 4 chứ không phải 2.',
    },
    {
      id: 'q10_axis',
      type: 'mcq',
      title: '10. What is the axis of symmetry of $$y = (x + 5)^2 - 2$$?',
      options: [
        { val: 'A', text: 'A. $$y = -2$$' },
        { val: 'B', text: 'B. $$x = 5$$' },
        { val: 'C', text: 'C. $$x = -5$$' },
        { val: 'D', text: 'D. $$x = -2$$' },
      ],
      correct: 'C',
      expEn: 'The axis of symmetry is the vertical mirror line through the vertex, so it is $$x = h$$. Here the bracket is zero at $$x = -5$$, so the vertex is (-5, -2) and the mirror line is $$x = -5$$. Option A is a horizontal line, which a parabola of this kind is never symmetrical about.',
      expVn: 'Trục đối xứng là đường thẳng đứng làm gương đi qua đỉnh, nên nó là $$x = h$$. Ở đây trong ngoặc bằng không tại $$x = -5$$, nên đỉnh là (-5, -2) và đường gương là $$x = -5$$. Đáp án A là một đường nằm ngang, mà parabol dạng này không bao giờ đối xứng qua đường như vậy.',
    },
  ],
};
