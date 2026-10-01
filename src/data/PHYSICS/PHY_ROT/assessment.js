// src/data/PHYSICS/PHY_ROT/assessment.js
// The unit quiz. Ten items, timed, with a bilingual explanation on every one
// — including on the wrong options, because the review screen is where the
// teaching happens for a student who missed it.
//
// NOTE ON MATHS MARKUP: Assessment.jsx parses ONLY `$$…$$`, and renders it
// inline (see parseText). A single `$…$` is left as literal text, so every
// piece of notation in this file is wrapped in double dollars.
//
// The answer key is spread across all four letters deliberately — the
// validator warns if one letter carries more than half the MCQs.
//
// Every wrong option is a slip with a name (turns left as turns, a diameter
// used as a radius, a calculator in RAD, a lost minus sign, a fraction upside
// down, a weight put at the wrong place), and the explanation names it. The
// numbers are NEW — none of them is a deck example — so the quiz tests the
// method, not memory: items 1, 5 and 6 turn on a unit or a mode, items 2 and
// 10 on a sign or a direction, 3 and 4 on choosing and rearranging, 7 and 8 on
// balancing, 9 on moment of inertia.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_revolutions',
      type: 'mcq',
      title: '1. A wheel makes 3.50 revolutions. Through what angle, in radians, has it turned?',
      options: [
        { val: 'A', text: 'A. 3.50 rad' },
        { val: 'B', text: 'B. 22.0 rad' },
        { val: 'C', text: 'C. 1260 rad' },
        { val: 'D', text: 'D. 11.0 rad' },
      ],
      correct: 'B',
      expEn: 'One revolution is $$2\\pi$$ rad, so $$\\theta = 3.50 \\times 2\\pi = 22.0$$ rad. Option A forgot to convert — turns are not radians. Option C is $$3.50 \\times 360$$, the angle in DEGREES. Option D is $$3.50 \\times \\pi$$: it treated one turn as $$\\pi$$, which is only half a turn.',
      expVn: 'Một vòng là $$2\\pi$$ rad, nên $$\\theta = 3.50 \\times 2\\pi = 22.0$$ rad. Phương án A quên đổi đơn vị — số vòng không phải radian. Phương án C là $$3.50 \\times 360$$, góc tính bằng ĐỘ. Phương án D là $$3.50 \\times \\pi$$: coi một vòng là $$\\pi$$, mà đó chỉ là nửa vòng.',
    },
    {
      id: 'q2_signed_omega',
      type: 'mcq',
      title: '2. A fan turning at +6.00 rad/s has an angular acceleration of −1.50 rad/s². CCW is +, CW is −. What is its angular velocity after 5.00 s?',
      options: [
        { val: 'A', text: 'A. −1.50 rad/s' },
        { val: 'B', text: 'B. +13.5 rad/s' },
        { val: 'C', text: 'C. +1.50 rad/s' },
        { val: 'D', text: 'D. −7.50 rad/s' },
      ],
      correct: 'A',
      expEn: 'No angle in the question, so $$\\omega_f = \\omega_i + \\alpha t = 6.00 + (-1.50) \\times 5.00 = 6.00 - 7.50 = -1.50$$ rad/s. The fan stopped and is now turning CLOCKWISE. Option B lost the minus sign of $$\\alpha$$ and added. Option C has the right size but the wrong direction. Option D is only $$\\alpha t$$ — it forgot $$\\omega_i$$.',
      expVn: 'Đề không có góc, nên $$\\omega_f = \\omega_i + \\alpha t = 6.00 + (-1.50) \\times 5.00 = 6.00 - 7.50 = -1.50$$ rad/s. Cái quạt đã dừng và giờ đang quay CÙNG CHIỀU kim đồng hồ. Phương án B làm mất dấu trừ của $$\\alpha$$ và cộng vào. Phương án C đúng độ lớn nhưng sai chiều. Phương án D chỉ là $$\\alpha t$$ — quên $$\\omega_i$$.',
    },
    {
      id: 'q3_choose_equation',
      type: 'mcq',
      title: '3. A disc starts from rest and turns through 40.0 rad in 4.00 s. Which equation finds its angular acceleration in one step?',
      options: [
        { val: 'A', text: 'A. $$\\omega_f = \\omega_i + \\alpha t$$' },
        { val: 'B', text: 'B. $$\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$$' },
        { val: 'C', text: 'C. $$\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$$' },
        { val: 'D', text: 'D. $$\\theta = \\omega_i t + \\tfrac{1}{2}\\alpha t^2$$' },
      ],
      correct: 'D',
      expEn: 'The question gives $$\\omega_i = 0$$ (from rest), $$\\theta$$ and $$t$$, and asks for $$\\alpha$$. The letter it never mentions is $$\\omega_f$$, and option D is the equation with no $$\\omega_f$$: $$\\alpha = \\dfrac{2\\theta}{t^2} = \\dfrac{2 \\times 40.0}{4.00^2} = 5.00$$ rad/s². Options A and C both need $$\\omega_f$$, which you do not know. Option B has no $$\\alpha$$ in it at all.',
      expVn: 'Đề cho $$\\omega_i = 0$$ (từ đứng yên), $$\\theta$$ và $$t$$, và hỏi $$\\alpha$$. Chữ đề không hề nhắc tới là $$\\omega_f$$, và phương án D là phương trình không có $$\\omega_f$$: $$\\alpha = \\dfrac{2\\theta}{t^2} = \\dfrac{2 \\times 40.0}{4.00^2} = 5.00$$ rad/s². Phương án A và C đều cần $$\\omega_f$$, mà em không biết. Phương án B hoàn toàn không có $$\\alpha$$.',
    },
    {
      id: 'q4_rearrange_theta',
      type: 'mcq',
      title: '4. Which is $$\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$$ correctly rearranged for $$\\theta$$?',
      options: [
        { val: 'A', text: 'A. $$\\theta = \\dfrac{\\omega_f^2 - \\omega_i^2}{2\\alpha}$$' },
        { val: 'B', text: 'B. $$\\theta = \\dfrac{(\\omega_f - \\omega_i)^2}{2\\alpha}$$' },
        { val: 'C', text: 'C. $$\\theta = \\dfrac{2\\alpha}{\\omega_f^2 - \\omega_i^2}$$' },
        { val: 'D', text: 'D. $$\\theta = \\omega_f^2 - \\omega_i^2 - 2\\alpha$$' },
      ],
      correct: 'A',
      expEn: '$$\\omega_i^2$$ is ADDED to the $$\\theta$$ term, so subtract it first: $$\\omega_f^2 - \\omega_i^2 = 2\\alpha\\theta$$. Then $$2\\alpha$$ multiplies $$\\theta$$, so divide by $$2\\alpha$$. Option B squares the difference — but $$\\omega_f^2 - \\omega_i^2$$ is not $$(\\omega_f - \\omega_i)^2$$. Option C is upside down. Option D subtracts $$2\\alpha$$, but $$2\\alpha$$ was multiplying, not added.',
      expVn: '$$\\omega_i^2$$ đang được CỘNG vào số hạng chứa $$\\theta$$, nên trừ nó trước: $$\\omega_f^2 - \\omega_i^2 = 2\\alpha\\theta$$. Rồi $$2\\alpha$$ đang nhân với $$\\theta$$, nên chia cho $$2\\alpha$$. Phương án B bình phương cả hiệu — nhưng $$\\omega_f^2 - \\omega_i^2$$ không phải $$(\\omega_f - \\omega_i)^2$$. Phương án C bị lộn ngược. Phương án D trừ $$2\\alpha$$, nhưng $$2\\alpha$$ đang nhân, không phải cộng.',
    },
    {
      id: 'q5_bike_wheel',
      type: 'mcq',
      title: '5. A bicycle wheel 0.660 m in diameter turns at 20.0 rad/s without slipping. How fast is the bicycle moving?',
      options: [
        { val: 'A', text: 'A. 13.2 m/s' },
        { val: 'B', text: 'B. 30.3 m/s' },
        { val: 'C', text: 'C. 6.60 m/s' },
        { val: 'D', text: 'D. 60.6 m/s' },
      ],
      correct: 'C',
      expEn: 'The formulas use the RADIUS: $$r = 0.660 \\div 2 = 0.330$$ m. Then $$v = r\\omega = 0.330 \\times 20.0 = 6.60$$ m/s. Option A used the diameter, so it is twice too big. Option B divided $$\\omega$$ by the diameter. Option D divided $$\\omega$$ by the radius — from the centre to the edge is × $$r$$, not ÷ $$r$$.',
      expVn: 'Các công thức dùng BÁN KÍNH: $$r = 0.660 \\div 2 = 0.330$$ m. Khi đó $$v = r\\omega = 0.330 \\times 20.0 = 6.60$$ m/s. Phương án A dùng đường kính, nên lớn gấp đôi. Phương án B chia $$\\omega$$ cho đường kính. Phương án D chia $$\\omega$$ cho bán kính — từ tâm ra mép là × $$r$$, không phải ÷ $$r$$.',
    },
    {
      id: 'q6_wrench',
      type: 'mcq',
      title: '6. A 25.0 N force pushes on a wrench 0.300 m from the bolt, at 30.0° to the wrench. What is the torque on the bolt?',
      options: [
        { val: 'A', text: 'A. 3.75 N·m' },
        { val: 'B', text: 'B. 7.50 N·m' },
        { val: 'C', text: 'C. 6.50 N·m' },
        { val: 'D', text: 'D. −7.41 N·m' },
      ],
      correct: 'A',
      expEn: '$$\\tau = r F \\sin\\theta = 0.300 \\times 25.0 \\times \\sin 30.0^\\circ = 7.50 \\times 0.500 = 3.75$$ N·m. Option B forgot $$\\sin\\theta$$, as if the push were straight across. Option C used $$\\cos 30.0^\\circ$$ instead of $$\\sin$$. Option D is what a calculator in RAD mode gives, because it reads 30.0 as radians — switch to DEG.',
      expVn: '$$\\tau = r F \\sin\\theta = 0.300 \\times 25.0 \\times \\sin 30.0^\\circ = 7.50 \\times 0.500 = 3.75$$ N·m. Phương án B quên $$\\sin\\theta$$, như thể lực đẩy vuông góc. Phương án C dùng $$\\cos 30.0^\\circ$$ thay cho $$\\sin$$. Phương án D là kết quả của máy tính ở chế độ RAD, vì nó hiểu 30.0 là radian — hãy chuyển sang DEG.',
    },
    {
      id: 'q7_seesaw',
      type: 'mcq',
      title: '7. A 45.0 kg kid sits 1.60 m from the pivot of a see-saw. How far from the pivot must a 36.0 kg kid sit on the other side to balance it?',
      options: [
        { val: 'A', text: 'A. 1.28 m' },
        { val: 'B', text: 'B. 2.00 m' },
        { val: 'C', text: 'C. 1.60 m' },
        { val: 'D', text: 'D. 19.6 m' },
      ],
      correct: 'B',
      expEn: 'Balanced: $$m_1 g\\, d_1 = m_2 g\\, d_2$$, and $$g$$ cancels, so $$d_2 = \\dfrac{m_1 d_1}{m_2} = \\dfrac{45.0 \\times 1.60}{36.0} = 2.00$$ m. The LIGHTER kid sits further out. Option A swapped the masses, which puts the lighter kid closer. Option C only works for equal masses. Option D multiplied by 9.8 on one side only.',
      expVn: 'Cân bằng: $$m_1 g\\, d_1 = m_2 g\\, d_2$$, và $$g$$ triệt tiêu, nên $$d_2 = \\dfrac{m_1 d_1}{m_2} = \\dfrac{45.0 \\times 1.60}{36.0} = 2.00$$ m. Bạn NHẸ hơn ngồi xa hơn. Phương án A đổi chỗ hai khối lượng, làm bạn nhẹ hơn ngồi gần hơn. Phương án C chỉ đúng khi hai khối lượng bằng nhau. Phương án D nhân 9.8 chỉ ở một vế.',
    },
    {
      id: 'q8_two_supports',
      type: 'mcq',
      title: '8. A uniform 4.00 m plank weighing 200 N rests on a support at each end. A 300 N box sits 1.00 m from the LEFT end. What force does the RIGHT support exert?',
      options: [
        { val: 'A', text: 'A. 325 N' },
        { val: 'B', text: 'B. 250 N' },
        { val: 'C', text: 'C. 1715 N' },
        { val: 'D', text: 'D. 175 N' },
      ],
      correct: 'D',
      expEn: 'Put the pivot at the LEFT support, the one not asked about. The plank\'s weight acts at its middle, 2.00 m away: $$F_R \\times 4.00 = 200 \\times 2.00 + 300 \\times 1.00 = 700$$, so $$F_R = 175$$ N. Option A is the LEFT support ($$500 - 175$$). Option B shared the 500 N equally, ignoring where the box is. Option C multiplied weights that were already in newtons by 9.8.',
      expVn: 'Đặt điểm tựa ở giá đỡ BÊN TRÁI, cái mà đề không hỏi. Trọng lượng tấm ván đặt ở chính giữa, cách 2.00 m: $$F_R \\times 4.00 = 200 \\times 2.00 + 300 \\times 1.00 = 700$$, nên $$F_R = 175$$ N. Phương án A là lực của giá đỡ BÊN TRÁI ($$500 - 175$$). Phương án B chia đều 500 N, bỏ qua vị trí cái hộp. Phương án C nhân 9.8 cho những trọng lượng đã tính bằng niutơn.',
    },
    {
      id: 'q9_inertia',
      type: 'mcq',
      title: '9. Two 0.500 kg balls are fixed to the ends of a light 1.20 m rod that spins about its middle. What is the moment of inertia?',
      options: [
        { val: 'A', text: 'A. 0.600 kg·m²' },
        { val: 'B', text: 'B. 1.44 kg·m²' },
        { val: 'C', text: 'C. 0.360 kg·m²' },
        { val: 'D', text: 'D. 0.180 kg·m²' },
      ],
      correct: 'C',
      expEn: 'The axis is in the middle, so each ball is $$r = 0.600$$ m out. Add the pieces: $$I = 0.500 \\times 0.600^2 + 0.500 \\times 0.600^2 = 0.180 + 0.180 = 0.360$$ kg·m². Option A forgot to square $$r$$. Option B used the whole length, 1.20 m, as each ball\'s distance. Option D counted only one ball.',
      expVn: 'Trục ở chính giữa, nên mỗi quả cầu cách trục $$r = 0.600$$ m. Cộng các phần: $$I = 0.500 \\times 0.600^2 + 0.500 \\times 0.600^2 = 0.180 + 0.180 = 0.360$$ kg·m². Phương án A quên bình phương $$r$$. Phương án B dùng cả chiều dài 1.20 m làm khoảng cách của mỗi quả cầu. Phương án D chỉ tính một quả cầu.',
    },
    {
      id: 'q10_stool',
      type: 'mcq',
      title: '10. A student on a spinning stool holds weights out, with I = 6.00 kg·m², turning at 2.00 rad/s. She pulls the weights in and I drops to 2.40 kg·m². What is her new angular velocity?',
      options: [
        { val: 'A', text: 'A. 0.800 rad/s' },
        { val: 'B', text: 'B. 5.00 rad/s' },
        { val: 'C', text: 'C. 2.00 rad/s' },
        { val: 'D', text: 'D. 12.0 rad/s' },
      ],
      correct: 'B',
      expEn: 'Nothing outside twists her, so angular momentum is conserved: $$I_i\\,\\omega_i = I_f\\,\\omega_f$$, giving $$\\omega_f = \\dfrac{I_i\\,\\omega_i}{I_f} = \\dfrac{6.00 \\times 2.00}{2.40} = 5.00$$ rad/s. A smaller $$I$$ means a FASTER spin. Option A has the fraction upside down — it predicts slowing down. Option C says nothing changes. Option D is $$L = I_i\\,\\omega_i$$, the angular momentum, not the new speed.',
      expVn: 'Không có gì bên ngoài làm cô xoắn, nên mômen động lượng được bảo toàn: $$I_i\\,\\omega_i = I_f\\,\\omega_f$$, cho $$\\omega_f = \\dfrac{I_i\\,\\omega_i}{I_f} = \\dfrac{6.00 \\times 2.00}{2.40} = 5.00$$ rad/s. $$I$$ nhỏ hơn nghĩa là quay NHANH hơn. Phương án A đặt phân số lộn ngược — dự đoán quay chậm lại. Phương án C cho rằng không có gì thay đổi. Phương án D là $$L = I_i\\,\\omega_i$$, mômen động lượng, không phải tốc độ mới.',
    },
  ],
};
