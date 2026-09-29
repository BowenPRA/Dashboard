// src/data/AOPS/LINE_1C/assessment.js
// Timed check for Equations of Lines. All MCQ, bilingual explanation on every
// item; two questions are read off a graph.
//
// NOTE: Assessment.jsx renders maths only inside $$...$$ (double dollar); a
// single $ is literal. So every expression below is wrapped in $$...$$.
//
// Key spread A/B/C/D = 2/3/3/2. The distractors are the chapter's own slips:
// the intercept written as (b, 0), standard form with A negative, −A/B upside
// down, the reciprocal without the sign change, the given line itself offered
// as the parallel one.
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_slope_intercept',
      type: 'mcq',
      title: '1. What are the slope and the y-intercept of $$y = -4x + 5$$?',
      options: [
        { val: 'A', text: 'A. slope 5, y-intercept (0, −4)' },
        { val: 'B', text: 'B. slope −4, y-intercept (0, 5)' },
        { val: 'C', text: 'C. slope 4, y-intercept (0, 5)' },
        { val: 'D', text: 'D. slope −4, y-intercept (5, 0)' },
      ],
      correct: 'B',
      expEn: 'In $$y = mx + b$$ the number in front of $$x$$ is the slope and $$b$$ gives the y-intercept $$(0, b)$$. So slope −4, y-intercept (0, 5). Option D writes the intercept backwards — (5, 0) is on the x-axis.',
      expVn: 'Trong $$y = mx + b$$, số đứng trước $$x$$ là hệ số góc và $$b$$ cho giao điểm với trục y là $$(0, b)$$. Vậy hệ số góc −4, giao điểm với trục y là (0, 5). Đáp án D viết ngược giao điểm — (5, 0) nằm trên trục x.',
    },
    {
      id: 'q2_standard_form',
      type: 'mcq',
      title: '2. Which is the standard form of the line through $$(1, 3)$$ with slope $$2$$?',
      options: [
        { val: 'A', text: 'A. $$2x - y = -1$$' },
        { val: 'B', text: 'B. $$2x + y = 5$$' },
        { val: 'C', text: 'C. $$-2x + y = 1$$' },
        { val: 'D', text: 'D. $$x - 2y = -5$$' },
      ],
      correct: 'A',
      expEn: '$$y - 3 = 2(x - 1)$$ gives $$y = 2x + 1$$, so $$2x - y = -1$$. Option C is the SAME line, but standard form wants $$A$$ positive. Option B has the wrong slope sign; option D swapped the roles of x and y.',
      expVn: '$$y - 3 = 2(x - 1)$$ cho $$y = 2x + 1$$, nên $$2x - y = -1$$. Đáp án C là CÙNG đường thẳng, nhưng dạng tổng quát yêu cầu $$A$$ dương. Đáp án B sai dấu hệ số góc; đáp án D đổi vai trò của x và y.',
    },
    {
      id: 'q3_slope_from_standard',
      type: 'mcq',
      title: '3. What is the slope of $$6x - 3y = 9$$?',
      options: [
        { val: 'A', text: 'A. $$-2$$' },
        { val: 'B', text: 'B. $$\\dfrac{1}{2}$$' },
        { val: 'C', text: 'C. $$2$$' },
        { val: 'D', text: 'D. $$3$$' },
      ],
      correct: 'C',
      expEn: 'Slope $$= -\\dfrac{A}{B} = -\\dfrac{6}{-3} = 2$$. Check: $$-3y = -6x + 9$$, so $$y = 2x - 3$$. Option A lost the second minus sign; option B is upside down.',
      expVn: 'Hệ số góc $$= -\\dfrac{A}{B} = -\\dfrac{6}{-3} = 2$$. Kiểm tra: $$-3y = -6x + 9$$, nên $$y = 2x - 3$$. Đáp án A mất dấu trừ thứ hai; đáp án B bị lộn ngược.',
    },
    {
      id: 'q4_match_graph',
      type: 'mcq',
      title: '4. Which equation matches the line shown? (The marked points are on the axes.)',
      inlineSvg: DIAGRAMS.QZ_INTERCEPT,
      options: [
        { val: 'A', text: 'A. $$3x + 4y = 12$$' },
        { val: 'B', text: 'B. $$4x - 3y = -12$$' },
        { val: 'C', text: 'C. $$3x - 4y = -12$$' },
        { val: 'D', text: 'D. $$y = 3x + 4$$' },
      ],
      correct: 'C',
      expEn: 'The line crosses the axes at (−4, 0) and (0, 3). Test C: at (−4, 0), $$-12 - 0 = -12$$ ✓; at (0, 3), $$0 - 12 = -12$$ ✓. Option A crosses at (4, 0) instead; option B at (−3, 0) and (0, 4).',
      expVn: 'Đường thẳng cắt các trục tại (−4, 0) và (0, 3). Thử C: tại (−4, 0), $$-12 - 0 = -12$$ ✓; tại (0, 3), $$0 - 12 = -12$$ ✓. Đáp án A lại cắt tại (4, 0); đáp án B cắt tại (−3, 0) và (0, 4).',
    },
    {
      id: 'q5_x_intercept',
      type: 'mcq',
      title: '5. Where does $$2x - 3y + 9 = 0$$ cross the x-axis?',
      options: [
        { val: 'A', text: 'A. $$\\left(-\\dfrac{9}{2}, 0\\right)$$' },
        { val: 'B', text: 'B. $$(0, 3)$$' },
        { val: 'C', text: 'C. $$\\left(\\dfrac{9}{2}, 0\\right)$$' },
        { val: 'D', text: 'D. $$\\left(0, -\\dfrac{9}{2}\\right)$$' },
      ],
      correct: 'A',
      expEn: 'On the x-axis $$y = 0$$: $$2x + 9 = 0$$, so $$x = -\\dfrac{9}{2}$$. Option B is the y-intercept (put $$x = 0$$: $$-3y + 9 = 0$$, $$y = 3$$); option C lost the sign when moving the 9 across.',
      expVn: 'Trên trục x thì $$y = 0$$: $$2x + 9 = 0$$, nên $$x = -\\dfrac{9}{2}$$. Đáp án B là giao điểm với trục y (cho $$x = 0$$: $$-3y + 9 = 0$$, $$y = 3$$); đáp án C mất dấu khi chuyển số 9 sang vế kia.',
    },
    {
      id: 'q6_read_system',
      type: 'mcq',
      title: '6. The graphs of two equations are shown. What is the solution of the system?',
      inlineSvg: DIAGRAMS.QZ_PAIR,
      options: [
        { val: 'A', text: 'A. $$(-1, 2)$$' },
        { val: 'B', text: 'B. $$(2, -1)$$' },
        { val: 'C', text: 'C. $$(0, 3)$$' },
        { val: 'D', text: 'D. There is no solution' },
      ],
      correct: 'B',
      expEn: 'The solution is the one point on BOTH lines — where they cross: 2 across, 1 down, so (2, −1). Option A writes it backwards; (0, 3) is only on one of the lines (its y-intercept).',
      expVn: 'Nghiệm là điểm duy nhất nằm trên CẢ HAI đường — chỗ chúng cắt nhau: ngang 2, xuống 1, nên (2, −1). Đáp án A viết ngược; (0, 3) chỉ nằm trên một đường (giao điểm với trục y của nó).',
    },
    {
      id: 'q7_how_many',
      type: 'mcq',
      title: '7. How many solutions does the system $$y = 3x - 2$$ and $$6x - 2y = 4$$ have?',
      options: [
        { val: 'A', text: 'A. None' },
        { val: 'B', text: 'B. Exactly one' },
        { val: 'C', text: 'C. Exactly two' },
        { val: 'D', text: 'D. Infinitely many' },
      ],
      correct: 'D',
      expEn: '$$6x - 2y = 4$$ gives $$2y = 6x - 4$$, so $$y = 3x - 2$$ — the SAME line. Every point on it solves both equations. Two different lines can never meet exactly twice, so C is impossible.',
      expVn: '$$6x - 2y = 4$$ cho $$2y = 6x - 4$$, nên $$y = 3x - 2$$ — CÙNG một đường thẳng. Mọi điểm trên nó đều thỏa mãn cả hai phương trình. Hai đường thẳng khác nhau không bao giờ gặp nhau đúng hai lần, nên C là không thể.',
    },
    {
      id: 'q8_perpendicular_slope',
      type: 'mcq',
      title: '8. A line is perpendicular to $$y = 4x + 1$$. What is its slope?',
      options: [
        { val: 'A', text: 'A. $$4$$' },
        { val: 'B', text: 'B. $$-4$$' },
        { val: 'C', text: 'C. $$\\dfrac{1}{4}$$' },
        { val: 'D', text: 'D. $$-\\dfrac{1}{4}$$' },
      ],
      correct: 'D',
      expEn: 'Perpendicular slopes multiply to −1, so the slope is the negative reciprocal of 4: $$-\\dfrac{1}{4}$$. Check: $$4 \\times \\left(-\\dfrac{1}{4}\\right) = -1$$. Option C only flipped; option B only changed the sign; A is the parallel slope.',
      expVn: 'Hai hệ số góc vuông góc nhân nhau bằng −1, nên hệ số góc là số nghịch đảo đổi dấu của 4: $$-\\dfrac{1}{4}$$. Kiểm tra: $$4 \\times \\left(-\\dfrac{1}{4}\\right) = -1$$. Đáp án C chỉ lật; đáp án B chỉ đổi dấu; A là hệ số góc song song.',
    },
    {
      id: 'q9_parallel_through',
      type: 'mcq',
      title: '9. Which line passes through $$(2, 1)$$ and is parallel to $$2x - 7y = 4$$?',
      options: [
        { val: 'A', text: 'A. $$7x + 2y = 16$$' },
        { val: 'B', text: 'B. $$2x - 7y = 4$$' },
        { val: 'C', text: 'C. $$2x - 7y = -3$$' },
        { val: 'D', text: 'D. $$2x + 7y = 11$$' },
      ],
      correct: 'C',
      expEn: 'A parallel line keeps $$A$$ and $$B$$: $$2x - 7y = k$$. Through (2, 1): $$k = 4 - 7 = -3$$. Option B is the given line itself, which misses (2, 1); option A is the PERPENDICULAR line through (2, 1).',
      expVn: 'Đường thẳng song song giữ nguyên $$A$$ và $$B$$: $$2x - 7y = k$$. Qua (2, 1): $$k = 4 - 7 = -3$$. Đáp án B chính là đường thẳng đã cho, không đi qua (2, 1); đáp án A là đường VUÔNG GÓC đi qua (2, 1).',
    },
    {
      id: 'q10_two_intercepts',
      type: 'mcq',
      title: '10. Lines with slopes 3 and 5 cross at $$(10, 15)$$. How far apart are their x-intercepts?',
      options: [
        { val: 'A', text: 'A. $$8$$' },
        { val: 'B', text: 'B. $$2$$' },
        { val: 'C', text: 'C. $$5$$' },
        { val: 'D', text: 'D. $$3$$' },
      ],
      correct: 'B',
      expEn: 'Each line goes down 15 to reach the x-axis. With slope 3 that is 5 to the left, landing at (5, 0); with slope 5 it is 3 to the left, landing at (7, 0). They are 2 apart. Options C and D are those two runs, not the gap between the intercepts.',
      expVn: 'Mỗi đường đi xuống 15 để tới trục x. Với hệ số góc 3 là sang trái 5, tới (5, 0); với hệ số góc 5 là sang trái 3, tới (7, 0). Chúng cách nhau 2. Đáp án C và D là hai độ thay đổi ngang đó, không phải khoảng cách giữa hai giao điểm.',
    },
  ],
};
