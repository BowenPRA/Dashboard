// src/data/AOPS/LINE_1A/assessment.js
// Timed check for Points, Distance & Midpoints. All MCQ, bilingual
// explanation on every item; two questions are read off a graph.
//
// NOTE: Assessment.jsx renders maths only inside $$...$$ (double dollar); a
// single $ is literal. So every expression below is wrapped in $$...$$.
//
// The answer key is spread A/B/C/D (3/2/2/3) — the validator warns if one
// letter carries more than half the paper. Each wrong option is a named
// mistake, and the explanation says which.
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_number_line_gap',
      type: 'mcq',
      title: '1. How far apart are $$-6$$ and $$9$$ on the number line?',
      options: [
        { val: 'A', text: 'A. $$15$$' },
        { val: 'B', text: 'B. $$3$$' },
        { val: 'C', text: 'C. $$-15$$' },
        { val: 'D', text: 'D. $$54$$' },
      ],
      correct: 'A',
      expEn: 'Bigger minus smaller: $$9 - (-6) = 9 + 6 = 15$$. Option B forgot that subtracting a negative adds. A distance is never negative, so C is out.',
      expVn: 'Số lớn trừ số bé: $$9 - (-6) = 9 + 6 = 15$$. Đáp án B quên rằng trừ một số âm là cộng. Khoảng cách không bao giờ âm, nên loại C.',
    },
    {
      id: 'q2_halfway',
      type: 'mcq',
      title: '2. Which number is exactly halfway between $$-8$$ and $$2$$?',
      options: [
        { val: 'A', text: 'A. $$-5$$' },
        { val: 'B', text: 'B. $$-3$$' },
        { val: 'C', text: 'C. $$3$$' },
        { val: 'D', text: 'D. $$-6$$' },
      ],
      correct: 'B',
      expEn: 'Halfway is the average: $$\\dfrac{-8 + 2}{2} = \\dfrac{-6}{2} = -3$$. Check: $$-8$$ to $$-3$$ is 5 steps, and $$-3$$ to $$2$$ is 5 steps. Option A is half the GAP (10 ÷ 2 = 5) with a minus sign stuck on.',
      expVn: 'Điểm chính giữa là trung bình cộng: $$\\dfrac{-8 + 2}{2} = \\dfrac{-6}{2} = -3$$. Kiểm tra: từ $$-8$$ tới $$-3$$ là 5 bước, và từ $$-3$$ tới $$2$$ là 5 bước. Đáp án A là nửa KHOẢNG CÁCH (10 ÷ 2 = 5) rồi gắn thêm dấu trừ.',
    },
    {
      id: 'q3_read_point',
      type: 'mcq',
      title: '3. Which labelled point is $$(-3, 2)$$?',
      inlineSvg: DIAGRAMS.QZ_POINTS,
      options: [
        { val: 'A', text: 'A. P' },
        { val: 'B', text: 'B. R' },
        { val: 'C', text: 'C. S' },
        { val: 'D', text: 'D. Q' },
      ],
      correct: 'D',
      expEn: 'Across first: 3 LEFT of the origin, then 2 UP. That is Q. P is (2, −3) — the same numbers in the wrong order; R is (3, 2), the wrong sign on x.',
      expVn: 'Đi ngang trước: sang TRÁI 3 đơn vị, rồi lên TRÊN 2. Đó là Q. P là (2, −3) — cùng hai số nhưng sai thứ tự; R là (3, 2), sai dấu của x.',
    },
    {
      id: 'q4_quadrant',
      type: 'mcq',
      title: '4. Which point is in the second quadrant (top left)?',
      options: [
        { val: 'A', text: 'A. $$(4, -1)$$' },
        { val: 'B', text: 'B. $$(-4, -1)$$' },
        { val: 'C', text: 'C. $$(-4, 1)$$' },
        { val: 'D', text: 'D. $$(4, 1)$$' },
      ],
      correct: 'C',
      expEn: 'Top left means LEFT of the origin (negative x) and ABOVE it (positive y): $$(-4, 1)$$. $$(4, 1)$$ is in the first quadrant, $$(-4, -1)$$ in the third, $$(4, -1)$$ in the fourth.',
      expVn: 'Góc trên bên trái nghĩa là BÊN TRÁI gốc tọa độ (x âm) và PHÍA TRÊN (y dương): $$(-4, 1)$$. $$(4, 1)$$ ở góc phần tư thứ nhất, $$(-4, -1)$$ ở góc thứ ba, $$(4, -1)$$ ở góc thứ tư.',
    },
    {
      id: 'q5_read_distance',
      type: 'mcq',
      title: '5. What is the length of the segment shown?',
      inlineSvg: DIAGRAMS.QZ_SEGMENT,
      options: [
        { val: 'A', text: 'A. $$10$$' },
        { val: 'B', text: 'B. $$14$$' },
        { val: 'C', text: 'C. $$\\sqrt{14}$$' },
        { val: 'D', text: 'D. $$100$$' },
      ],
      correct: 'A',
      expEn: 'Across: $$3 - (-3) = 6$$. Up: $$6 - (-2) = 8$$. Distance squared: $$6^2 + 8^2 = 36 + 64 = 100$$, so the length is $$10$$. Option B added across and up (going round the corner); option D forgot the square root.',
      expVn: 'Ngang: $$3 - (-3) = 6$$. Dọc: $$6 - (-2) = 8$$. Bình phương độ dài: $$6^2 + 8^2 = 36 + 64 = 100$$, nên độ dài là $$10$$. Đáp án B cộng ngang với dọc (đi vòng qua góc); đáp án D quên lấy căn.',
    },
    {
      id: 'q6_exact_root',
      type: 'mcq',
      title: '6. What is the exact distance between $$(1, 2)$$ and $$(3, 7)$$?',
      options: [
        { val: 'A', text: 'A. $$7$$' },
        { val: 'B', text: 'B. $$29$$' },
        { val: 'C', text: 'C. $$\\sqrt{21}$$' },
        { val: 'D', text: 'D. $$\\sqrt{29}$$' },
      ],
      correct: 'D',
      expEn: 'Across 2, up 5: distance squared $$= 2^2 + 5^2 = 4 + 25 = 29$$. 29 is not a perfect square, so the exact distance is $$\\sqrt{29}$$. Option B is the distance squared; option C subtracted the squares.',
      expVn: 'Ngang 2, dọc 5: bình phương khoảng cách $$= 2^2 + 5^2 = 4 + 25 = 29$$. 29 không phải số chính phương, nên khoảng cách chính xác là $$\\sqrt{29}$$. Đáp án B là bình phương khoảng cách; đáp án C trừ các bình phương.',
    },
    {
      id: 'q7_midpoint',
      type: 'mcq',
      title: '7. What is the midpoint of the segment from $$(-3, 4)$$ to $$(7, -2)$$?',
      options: [
        { val: 'A', text: 'A. $$(5, -3)$$' },
        { val: 'B', text: 'B. $$(2, 1)$$' },
        { val: 'C', text: 'C. $$(4, 2)$$' },
        { val: 'D', text: 'D. $$(10, -6)$$' },
      ],
      correct: 'B',
      expEn: 'Average each coordinate: $$\\dfrac{-3 + 7}{2} = 2$$ and $$\\dfrac{4 + (-2)}{2} = 1$$. Option A halved the differences; option D is the change from one end to the other, not a point halfway.',
      expVn: 'Lấy trung bình từng tọa độ: $$\\dfrac{-3 + 7}{2} = 2$$ và $$\\dfrac{4 + (-2)}{2} = 1$$. Đáp án A chia đôi các hiệu; đáp án D là độ thay đổi từ đầu này sang đầu kia, không phải điểm chính giữa.',
    },
    {
      id: 'q8_missing_end',
      type: 'mcq',
      title: '8. $$M(1, 3)$$ is the midpoint of $$AB$$, and $$A$$ is $$(-2, 7)$$. Where is $$B$$?',
      options: [
        { val: 'A', text: 'A. $$(-0.5, 5)$$' },
        { val: 'B', text: 'B. $$(-5, 11)$$' },
        { val: 'C', text: 'C. $$(4, -1)$$' },
        { val: 'D', text: 'D. $$(3, -4)$$' },
      ],
      correct: 'C',
      expEn: 'From $$A$$ to $$M$$ is 3 right and 4 down. $$M$$ is halfway, so take the same step again: $$B = (1 + 3,\\ 3 - 4) = (4, -1)$$. Option A averaged $$A$$ and $$M$$; option B stepped the wrong way.',
      expVn: 'Từ $$A$$ tới $$M$$ là sang phải 3 và xuống 4. $$M$$ nằm chính giữa, nên đi thêm đúng bước đó: $$B = (1 + 3,\\ 3 - 4) = (4, -1)$$. Đáp án A lấy trung bình của $$A$$ và $$M$$; đáp án B đi ngược hướng.',
    },
    {
      id: 'q9_one_third',
      type: 'mcq',
      title: '9. $$P$$ is $$(0, 0)$$ and $$Q$$ is $$(9, 6)$$. $$T$$ is on $$PQ$$ with $$PT : TQ = 1 : 2$$. Where is $$T$$?',
      options: [
        { val: 'A', text: 'A. $$(3, 2)$$' },
        { val: 'B', text: 'B. $$(4.5, 3)$$' },
        { val: 'C', text: 'C. $$(6, 4)$$' },
        { val: 'D', text: 'D. $$(3, 3)$$' },
      ],
      correct: 'A',
      expEn: '$$1 + 2 = 3$$ equal pieces, and $$T$$ is after the first, so it is $$\\dfrac{1}{3}$$ of the way: $$\\left(\\dfrac{9}{3}, \\dfrac{6}{3}\\right) = (3, 2)$$. Option B is the midpoint; option C is two thirds of the way — the point with $$PT : TQ = 2 : 1$$.',
      expVn: 'Có $$1 + 2 = 3$$ phần bằng nhau, và $$T$$ nằm sau phần thứ nhất, nên nó ở $$\\dfrac{1}{3}$$ quãng đường: $$\\left(\\dfrac{9}{3}, \\dfrac{6}{3}\\right) = (3, 2)$$. Đáp án B là trung điểm; đáp án C nằm ở hai phần ba quãng đường — điểm có $$PT : TQ = 2 : 1$$.',
    },
    {
      id: 'q10_letters',
      type: 'mcq',
      title: '10. $$a$$ and $$b$$ are positive numbers. What is the distance between $$(a, 0)$$ and $$(0, b)$$?',
      options: [
        { val: 'A', text: 'A. $$a + b$$' },
        { val: 'B', text: 'B. $$a^2 + b^2$$' },
        { val: 'C', text: 'C. $$\\sqrt{a + b}$$' },
        { val: 'D', text: 'D. $$\\sqrt{a^2 + b^2}$$' },
      ],
      correct: 'D',
      expEn: 'The two points sit on the axes, so the corner of the right triangle is the origin: the legs are $$a$$ and $$b$$. Pythagoras gives distance squared $$a^2 + b^2$$, so the distance is $$\\sqrt{a^2 + b^2}$$. Option B forgot the square root; option A walks round the corner.',
      expVn: 'Hai điểm nằm trên hai trục, nên góc vuông của tam giác là gốc tọa độ: hai cạnh góc vuông là $$a$$ và $$b$$. Định lý Pythagore cho bình phương khoảng cách là $$a^2 + b^2$$, nên khoảng cách là $$\\sqrt{a^2 + b^2}$$. Đáp án B quên lấy căn; đáp án A đi vòng qua góc.',
    },
  ],
};
