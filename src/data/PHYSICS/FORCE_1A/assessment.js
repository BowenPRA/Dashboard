// src/data/PHYSICS/FORCE_1A/assessment.js
// Timed check for Adding Force Vectors. All MCQ, bilingual explanation on every item.
//
// NOTE: Assessment.jsx renders maths only inside $$...$$ (double dollar); a
// single $ is literal. So every expression below is wrapped in $$...$$ and
// everything else stays plain text.
//
// Every wrong option is a mistake a real student makes, not filler: the plain
// sum, the sin/cos swap, the dropped minus, and the uncorrected tan⁻¹. The
// answer key is spread across A/B/C/D — the validator warns if one letter
// carries more than half the paper, because that is a paper you can pass by
// guessing.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_two_numbers',
      type: 'mcq',
      title: '1. What makes a force a vector rather than an ordinary number?',
      options: [
        { val: 'A', text: 'A. It is always measured in newtons.' },
        { val: 'B', text: 'B. It can never be negative.' },
        { val: 'C', text: 'C. It has a size AND a direction.' },
        { val: 'D', text: 'D. It can only be added using a calculator.' },
      ],
      correct: 'C',
      expEn: 'A vector needs two numbers before it is fully described. 50 N is not one force — 50 N up, 50 N east and 50 N at 45 degrees all do different things. Mass and temperature need only one number, so they are not vectors.',
      expVn: 'Một vectơ cần hai con số mới được mô tả đầy đủ. 50 N không phải là một lực duy nhất — 50 N hướng lên, 50 N hướng đông và 50 N tại 45 độ gây ra những tác dụng khác nhau. Khối lượng và nhiệt độ chỉ cần một con số, nên chúng không phải vectơ.',
    },
    {
      id: 'q2_right_angle_sum',
      type: 'mcq',
      title: '2. An 8 N force acts east and a 6 N force acts north. What is the size of the resultant?',
      options: [
        { val: 'A', text: 'A. 10 N' },
        { val: 'B', text: 'B. 14 N' },
        { val: 'C', text: 'C. 2 N' },
        { val: 'D', text: 'D. 48 N' },
      ],
      correct: 'A',
      expEn: 'The two forces meet at a right angle, so they close a right triangle: $$\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$$ N. 14 N is the plain sum, which is only right when two forces point the same way; 2 N is the difference, which is only right when they point opposite ways.',
      expVn: 'Hai lực gặp nhau ở góc vuông, nên chúng khép thành tam giác vuông: $$\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$$ N. 14 N là tổng thường, chỉ đúng khi hai lực cùng hướng; 2 N là hiệu, chỉ đúng khi chúng ngược hướng.',
    },
    {
      id: 'q3_resolve_x',
      type: 'mcq',
      title: '3. A 90 N force acts at 40 degrees. What is its x-part?',
      options: [
        { val: 'A', text: 'A. 57.9 N' },
        { val: 'B', text: 'B. 90 N' },
        { val: 'C', text: 'C. 36.0 N' },
        { val: 'D', text: 'D. 68.9 N' },
      ],
      correct: 'D',
      expEn: 'The x-part is the flat leg of the triangle, so it uses cosine: $$90\\cos 40° = 68.9$$ N. Option A is 90 sin 40 — the y-part, and the commonest slip on this question. Since 40 degrees is below 45, the x-part must be the bigger of the two parts, which rules A out immediately.',
      expVn: 'Phần x là cạnh nằm ngang của tam giác, nên dùng cos: $$90\\cos 40° = 68{,}9$$ N. Đáp án A là 90 sin 40 — phần y, và là lỗi phổ biến nhất ở câu này. Vì 40 độ nhỏ hơn 45, phần x phải là phần lớn hơn, nên loại A ngay.',
    },
    {
      id: 'q4_signs',
      type: 'mcq',
      title: '4. A force acts at 200 degrees. What are the signs of its x-part and y-part?',
      options: [
        { val: 'A', text: 'A. x positive, y positive' },
        { val: 'B', text: 'B. x negative, y negative' },
        { val: 'C', text: 'C. x negative, y positive' },
        { val: 'D', text: 'D. x positive, y negative' },
      ],
      correct: 'B',
      expEn: '200 degrees is past 180, so the arrow has swung round to point down and to the left — the third quadrant. Both cos 200 and sin 200 are negative. Between 90 and 180 you would get option C; between 270 and 360 you would get option D.',
      expVn: '200 độ đã vượt 180, nên mũi tên quay sang chỉ xuống dưới và sang trái — góc phần tư thứ ba. Cả cos 200 và sin 200 đều âm. Từ 90 đến 180 sẽ ra đáp án C; từ 270 đến 360 sẽ ra đáp án D.',
    },
    {
      id: 'q5_same_direction',
      type: 'mcq',
      title: '5. Two 25 N forces both act at 70 degrees. What is the resultant?',
      options: [
        { val: 'A', text: 'A. 35.4 N at 70 degrees' },
        { val: 'B', text: 'B. 25 N at 140 degrees' },
        { val: 'C', text: 'C. 50 N at 70 degrees' },
        { val: 'D', text: 'D. 0 N' },
      ],
      correct: 'C',
      expEn: 'Both forces point the same way, so this is the one case where the sizes really do add: 25 + 25 = 50 N, still at 70 degrees. Direction is never added — two forces at 70 degrees do not make one at 140. Option A is what you would get from a right angle, which these forces do not make.',
      expVn: 'Cả hai lực cùng hướng, nên đây là trường hợp duy nhất mà độ lớn thực sự cộng được: 25 + 25 = 50 N, vẫn tại 70 độ. Hướng không bao giờ được cộng — hai lực tại 70 độ không tạo ra một lực tại 140 độ. Đáp án A là kết quả của góc vuông, mà hai lực này không tạo ra góc vuông.',
    },
    {
      id: 'q6_zero_rx',
      type: 'mcq',
      title: '6. A resultant has Rx = 0 N and Ry = -14 N. What is its direction?',
      options: [
        { val: 'A', text: 'A. 270 degrees — straight down' },
        { val: 'B', text: 'B. 90 degrees — straight up' },
        { val: 'C', text: 'C. 0 degrees — straight along x' },
        { val: 'D', text: 'D. It has no direction.' },
      ],
      correct: 'A',
      expEn: 'No sideways part at all means the force lies on the y-axis, and a negative y-part means it points downwards: 270 degrees. Do not reach for tan inverse here — dividing by zero has no answer, but the picture does. Only a resultant of zero size has no direction.',
      expVn: 'Không có phần ngang nghĩa là lực nằm trên trục y, và phần y âm nghĩa là nó chỉ xuống dưới: 270 độ. Đừng dùng tan ngược ở đây — chia cho không thì vô nghĩa, nhưng hình vẽ thì có câu trả lời. Chỉ lực tổng hợp có độ lớn bằng không mới không có hướng.',
    },
    {
      id: 'q7_tip_to_tail',
      type: 'mcq',
      title: '7. When adding two forces tip to tail, what do you do with the second arrow?',
      options: [
        { val: 'A', text: 'A. Turn it round so it points the opposite way.' },
        { val: 'B', text: "B. Slide it, keeping its length and direction, so its tail sits on the first arrow's tip." },
        { val: 'C', text: 'C. Make it the same length as the first arrow.' },
        { val: 'D', text: 'D. Draw it from the tip of the first arrow back to the start.' },
      ],
      correct: 'B',
      expEn: 'Sliding an arrow does not change the force it represents — only its length and direction matter, not where it is drawn. Once B starts at the tip of A, the resultant runs from the tail of A to the tip of B. Option D describes the resultant itself, not the second force.',
      expVn: 'Trượt một mũi tên không làm thay đổi lực mà nó biểu diễn — chỉ độ dài và hướng mới quan trọng, không phải vị trí vẽ. Khi B bắt đầu ở đầu mũi tên A, lực tổng hợp chạy từ đuôi A tới đầu B. Đáp án D mô tả chính lực tổng hợp, không phải lực thứ hai.',
    },
    {
      id: 'q8_quadrant_fix',
      type: 'mcq',
      title: '8. Rx = -8 N and Ry = 15 N. A calculator gives tan inverse of (15 divided by -8) as -61.9 degrees. What is the true direction?',
      options: [
        { val: 'A', text: 'A. -61.9 degrees' },
        { val: 'B', text: 'B. 61.9 degrees' },
        { val: 'C', text: 'C. 298.1 degrees' },
        { val: 'D', text: 'D. 118.1 degrees' },
      ],
      correct: 'D',
      expEn: 'A negative x-part with a positive y-part puts the force up and to the LEFT, so the answer must be between 90 and 180 degrees. Add 180 to the calculator value: -61.9 + 180 = 118.1 degrees. Options A and C point down-right and B points up-right, all on the wrong side of the grid.',
      expVn: 'Phần x âm với phần y dương đặt lực lên trên và sang TRÁI, nên đáp án phải nằm giữa 90 và 180 độ. Cộng 180 vào giá trị máy tính: -61,9 + 180 = 118,1 độ. Đáp án A và C chỉ xuống phải, còn B chỉ lên phải, đều nằm sai phía của lưới.',
    },
    {
      id: 'q9_columns',
      type: 'mcq',
      title: '9. Ax = 30 N, Ay = 40 N, Bx = -50 N, By = 10 N. What is Rx?',
      options: [
        { val: 'A', text: 'A. 80 N' },
        { val: 'B', text: 'B. 30 N' },
        { val: 'C', text: 'C. -20 N' },
        { val: 'D', text: 'D. 50 N' },
      ],
      correct: 'C',
      expEn: 'Rx comes only from the x column: $$30 + (-50) = -20$$ N. Never mix the columns — an x-part and a y-part are at right angles and cannot be added. Option A ignores the minus sign; option D adds x to y.',
      expVn: 'Rx chỉ đến từ cột x: $$30 + (-50) = -20$$ N. Đừng bao giờ trộn hai cột — phần x và phần y vuông góc nhau nên không cộng được. Đáp án A bỏ qua dấu trừ; đáp án D cộng x với y.',
    },
    {
      id: 'q10_three_forces',
      type: 'mcq',
      title: '10. Four forces act on an object at four different angles. What is the most reliable way to find the resultant?',
      options: [
        { val: 'A', text: 'A. Add the four sizes, then average the four angles.' },
        { val: 'B', text: 'B. Resolve all four, add each column, then rebuild from Rx and Ry.' },
        { val: 'C', text: 'C. Vector addition only works for two forces at a time, so it cannot be done.' },
        { val: 'D', text: 'D. Take the largest force and ignore the rest.' },
      ],
      correct: 'B',
      expEn: 'The component table has no limit: every extra force is one more row, and the two column totals are still Rx and Ry. Drawing tip to tail also works, but the ruler error piles up with each arrow. Averaging angles has no physical meaning at all.',
      expVn: 'Bảng thành phần không có giới hạn: mỗi lực thêm vào chỉ là một hàng nữa, và hai tổng cột vẫn là Rx và Ry. Vẽ nối đuôi cũng được, nhưng sai số thước chồng chất theo từng mũi tên. Lấy trung bình các góc thì hoàn toàn không có ý nghĩa vật lý.',
    },
  ],
};
