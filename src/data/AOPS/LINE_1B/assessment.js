// src/data/AOPS/LINE_1B/assessment.js
// Timed check for Graphing Lines & Slope. All MCQ, bilingual explanation on
// every item; two questions are read off a graph.
//
// NOTE: Assessment.jsx renders maths only inside $$...$$ (double dollar); a
// single $ is literal. So every expression below is wrapped in $$...$$.
//
// Key spread A/B/C/D = 2/3/3/2. Each wrong option is a named slip — run over
// rise, mixed subtraction order, the sign lost, slope 0 mixed up with
// undefined — and the explanation says which.
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_read_slope',
      type: 'mcq',
      title: '1. What is the slope of the line shown? (The two marked points are on grid corners.)',
      inlineSvg: DIAGRAMS.QZ_READ,
      options: [
        { val: 'A', text: 'A. $$\\dfrac{3}{2}$$' },
        { val: 'B', text: 'B. $$\\dfrac{2}{3}$$' },
        { val: 'C', text: 'C. $$-\\dfrac{2}{3}$$' },
        { val: 'D', text: 'D. $$2$$' },
      ],
      correct: 'B',
      expEn: 'The marked points are (−3, −2) and (3, 2): run 6, rise 4, so the slope is $$\\dfrac{4}{6} = \\dfrac{2}{3}$$. The line climbs, so the slope is positive (not C); option A is run over rise.',
      expVn: 'Hai điểm được đánh dấu là (−3, −2) và (3, 2): ngang 6, dọc 4, nên hệ số góc là $$\\dfrac{4}{6} = \\dfrac{2}{3}$$. Đường thẳng đi lên, nên hệ số góc dương (không phải C); đáp án A là ngang chia dọc.',
    },
    {
      id: 'q2_two_points',
      type: 'mcq',
      title: '2. What is the slope of the line through $$(2, -1)$$ and $$(6, 7)$$?',
      options: [
        { val: 'A', text: 'A. $$2$$' },
        { val: 'B', text: 'B. $$\\dfrac{1}{2}$$' },
        { val: 'C', text: 'C. $$-2$$' },
        { val: 'D', text: 'D. $$8$$' },
      ],
      correct: 'A',
      expEn: 'Rise: $$7 - (-1) = 8$$. Run: $$6 - 2 = 4$$. Slope $$= \\dfrac{8}{4} = 2$$. Option B is run over rise; option D stopped at the rise.',
      expVn: 'Dọc: $$7 - (-1) = 8$$. Ngang: $$6 - 2 = 4$$. Hệ số góc $$= \\dfrac{8}{4} = 2$$. Đáp án B là ngang chia dọc; đáp án D dừng ở độ thay đổi dọc.',
    },
    {
      id: 'q3_what_went_wrong',
      type: 'mcq',
      title: '3. For the line through $$(1, 4)$$ and $$(3, -2)$$, Priya writes $$\\dfrac{-2 - 4}{1 - 3} = 3$$. What went wrong?',
      options: [
        { val: 'A', text: 'A. She subtracted in different orders on the top and the bottom' },
        { val: 'B', text: 'B. She put the change in x on top' },
        { val: 'C', text: 'C. Nothing — the slope is 3' },
        { val: 'D', text: 'D. She should have added the coordinates' },
      ],
      correct: 'A',
      expEn: 'The top is second minus first ($$-2 - 4$$), but the bottom is first minus second ($$1 - 3$$). Keep one order: $$\\dfrac{-2 - 4}{3 - 1} = -3$$. The line goes down from left to right, so a positive answer should have been a warning.',
      expVn: 'Tử số lấy điểm thứ hai trừ điểm thứ nhất ($$-2 - 4$$), nhưng mẫu số lại lấy điểm thứ nhất trừ điểm thứ hai ($$1 - 3$$). Giữ một thứ tự: $$\\dfrac{-2 - 4}{3 - 1} = -3$$. Đường thẳng đi xuống từ trái sang phải, nên đáp án dương lẽ ra phải là một dấu hiệu cảnh báo.',
    },
    {
      id: 'q4_match_lines',
      type: 'mcq',
      title: '4. Lines k, ℓ and m have slopes $$\\tfrac{1}{6}$$, $$-\\tfrac{3}{4}$$ and $$2$$, in some order. Which line has slope $$-\\tfrac{3}{4}$$?',
      inlineSvg: DIAGRAMS.QZ_THREE,
      options: [
        { val: 'A', text: 'A. k' },
        { val: 'B', text: 'B. m' },
        { val: 'C', text: 'C. ℓ' },
        { val: 'D', text: 'D. You cannot tell without two points' },
      ],
      correct: 'C',
      expEn: 'Only one slope is negative, and only one line goes DOWN from left to right: ℓ. Of the two climbing lines, m is steep (slope 2) and k is nearly flat (slope 1/6). The picture is enough — no points needed.',
      expVn: 'Chỉ có một hệ số góc âm, và chỉ có một đường đi XUỐNG từ trái sang phải: ℓ. Trong hai đường đi lên, m dốc (hệ số góc 2) còn k gần như nằm ngang (hệ số góc 1/6). Nhìn hình là đủ — không cần điểm nào.',
    },
    {
      id: 'q5_horizontal',
      type: 'mcq',
      title: '5. Which equation has a horizontal line as its graph?',
      options: [
        { val: 'A', text: 'A. $$x = 3$$' },
        { val: 'B', text: 'B. $$y = x$$' },
        { val: 'C', text: 'C. $$y = -4$$' },
        { val: 'D', text: 'D. $$x + y = 0$$' },
      ],
      correct: 'C',
      expEn: 'Horizontal means every point has the same $$y$$: that is $$y = -4$$, slope 0. $$x = 3$$ is the VERTICAL line — every point has the same $$x$$.',
      expVn: 'Nằm ngang nghĩa là mọi điểm có cùng $$y$$: đó là $$y = -4$$, hệ số góc 0. $$x = 3$$ là đường THẲNG ĐỨNG — mọi điểm có cùng $$x$$.',
    },
    {
      id: 'q6_vertical_slope',
      type: 'mcq',
      title: '6. What is the slope of the line $$x = 7$$?',
      options: [
        { val: 'A', text: 'A. $$0$$' },
        { val: 'B', text: 'B. $$7$$' },
        { val: 'C', text: 'C. $$\\dfrac{1}{7}$$' },
        { val: 'D', text: 'D. undefined' },
      ],
      correct: 'D',
      expEn: 'Every point on $$x = 7$$ has $$x = 7$$, so the run between any two of them is 0, and dividing by 0 is undefined. Slope 0 belongs to a horizontal line, like $$y = 7$$.',
      expVn: 'Mọi điểm trên $$x = 7$$ đều có $$x = 7$$, nên độ thay đổi ngang giữa hai điểm bất kỳ là 0, và chia cho 0 thì không xác định. Hệ số góc 0 là của đường nằm ngang, như $$y = 7$$.',
    },
    {
      id: 'q7_steepest',
      type: 'mcq',
      title: '7. Which line is the steepest?',
      options: [
        { val: 'A', text: 'A. $$y = 2x$$' },
        { val: 'B', text: 'B. $$y = -5x + 1$$' },
        { val: 'C', text: 'C. $$y = \\tfrac{1}{3}x + 9$$' },
        { val: 'D', text: 'D. $$y = 4$$' },
      ],
      correct: 'B',
      expEn: 'Steepness is the size of the slope, ignoring the sign: 5 beats 2 beats 1/3 beats 0. So $$y = -5x + 1$$ is steepest — it simply goes down. The constant (+1, +9) moves a line up; it does not tilt it.',
      expVn: 'Độ dốc là độ lớn của hệ số góc, không xét dấu: 5 lớn hơn 2, lớn hơn 1/3, lớn hơn 0. Vậy $$y = -5x + 1$$ dốc nhất — chỉ là nó đi xuống. Hằng số (+1, +9) dịch đường thẳng lên; nó không làm đường thẳng nghiêng.',
    },
    {
      id: 'q8_walk_slope',
      type: 'mcq',
      title: '8. A line passes through $$(2, 1)$$ and has slope $$-3$$. Which of these points is also on it?',
      options: [
        { val: 'A', text: 'A. $$(3, 4)$$' },
        { val: 'B', text: 'B. $$(5, 2)$$' },
        { val: 'C', text: 'C. $$(3, -2)$$' },
        { val: 'D', text: 'D. $$(-1, 1)$$' },
      ],
      correct: 'C',
      expEn: 'Slope −3 means 3 DOWN for every 1 right. From (2, 1): 1 right and 3 down is (3, −2). Option A went up (slope +3); option B went 3 right and 1 up (slope 1/3).',
      expVn: 'Hệ số góc −3 nghĩa là XUỐNG 3 ứng với mỗi 1 sang phải. Từ (2, 1): sang phải 1 và xuống 3 là (3, −2). Đáp án A đi lên (hệ số góc +3); đáp án B sang phải 3 và lên 1 (hệ số góc 1/3).',
    },
    {
      id: 'q9_collinear',
      type: 'mcq',
      title: '9. Do $$(-2, -7)$$, $$(1, -1)$$ and $$(4, 5)$$ lie on one line?',
      options: [
        { val: 'A', text: 'A. No — the slopes from (−2, −7) are 2 and 3' },
        { val: 'B', text: 'B. No — they are not the same distance apart' },
        { val: 'C', text: 'C. Yes — they all have different x-coordinates' },
        { val: 'D', text: 'D. Yes — both slopes from (−2, −7) are 2' },
      ],
      correct: 'D',
      expEn: 'From (−2, −7): to (1, −1) the slope is $$\\dfrac{6}{3} = 2$$; to (4, 5) it is $$\\dfrac{12}{6} = 2$$. Same slope from the same point, so one line. Different x-coordinates prove nothing, so C is the right answer for the wrong reason.',
      expVn: 'Từ (−2, −7): tới (1, −1) hệ số góc là $$\\dfrac{6}{3} = 2$$; tới (4, 5) là $$\\dfrac{12}{6} = 2$$. Cùng hệ số góc từ cùng một điểm, nên thẳng hàng. Hoành độ khác nhau chẳng chứng minh được gì, nên C đúng kết luận nhưng sai lí do.',
    },
    {
      id: 'q10_ax_equals_c',
      type: 'mcq',
      title: '10. What is the graph of $$4x = 12$$?',
      options: [
        { val: 'A', text: 'A. A horizontal line' },
        { val: 'B', text: 'B. The vertical line $$x = 3$$' },
        { val: 'C', text: 'C. It is not a line' },
        { val: 'D', text: 'D. Just the point (3, 0)' },
      ],
      correct: 'B',
      expEn: '$$4x = 12$$ is $$Ax + By = C$$ with $$B = 0$$, and it simplifies to $$x = 3$$. Every point with $$x = 3$$ works, whatever its $$y$$ — (3, 0), (3, 5), (3, −2) … — so the graph is the vertical line $$x = 3$$, not one point.',
      expVn: '$$4x = 12$$ là $$Ax + By = C$$ với $$B = 0$$, rút gọn thành $$x = 3$$. Mọi điểm có $$x = 3$$ đều thỏa mãn, dù $$y$$ bằng bao nhiêu — (3, 0), (3, 5), (3, −2) … — nên đồ thị là đường thẳng đứng $$x = 3$$, không phải một điểm.',
    },
  ],
};
