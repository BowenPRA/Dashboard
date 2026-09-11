// src/data/PHYSICS/PHY_CIRC/assessment.js
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

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_direction',
      type: 'mcq',
      title: '1. A car goes round a roundabout at a steady speed. The centripetal force on it points…',
      options: [
        { val: 'A', text: 'A. forward, along the road' },
        { val: 'B', text: 'B. toward the centre of the roundabout' },
        { val: 'C', text: 'C. away from the centre' },
        { val: 'D', text: 'D. straight up' },
      ],
      correct: 'B',
      expEn: 'Centripetal means centre-seeking: the force always points to the centre of the circle. The velocity is what points forward along the road (option A). Nothing pushes the car outward — the feeling of being flung out is the body trying to go straight.',
      expVn: 'Hướng tâm nghĩa là tìm về tâm: lực luôn hướng về tâm đường tròn. Vận tốc mới là thứ hướng về phía trước dọc đường (phương án A). Không có gì đẩy xe ra ngoài — cảm giác bị văng ra là cơ thể đang cố đi thẳng.',
    },
    {
      id: 'q2_provider',
      type: 'mcq',
      title: '2. A ball is whirled on a rope in a horizontal circle. Which real force is acting as the centripetal force?',
      options: [
        { val: 'A', text: 'A. The weight of the ball' },
        { val: 'B', text: 'B. Air resistance' },
        { val: 'C', text: 'C. The tension in the rope' },
        { val: 'D', text: 'D. A separate centripetal force' },
      ],
      correct: 'C',
      expEn: 'There is no separate centripetal force (option D is the most common misconception). Some real force points at the centre and does the job — here the rope, so $$T = \\dfrac{m v^2}{r}$$. Weight points down, not to the centre of a horizontal circle.',
      expVn: 'Không có lực hướng tâm riêng biệt (phương án D là hiểu lầm phổ biến nhất). Một lực thật hướng về tâm và làm nhiệm vụ đó — ở đây là sợi dây, nên $$T = \\dfrac{m v^2}{r}$$. Trọng lực hướng xuống, không hướng về tâm của đường tròn nằm ngang.',
    },
    {
      id: 'q3_rearrange_m',
      type: 'mcq',
      title: '3. Make $$m$$ the subject of $$F = \\dfrac{m v^2}{r}$$.',
      options: [
        { val: 'A', text: 'A. $$m = \\dfrac{F r}{v^2}$$' },
        { val: 'B', text: 'B. $$m = \\dfrac{F v^2}{r}$$' },
        { val: 'C', text: 'C. $$m = \\dfrac{v^2}{F r}$$' },
        { val: 'D', text: 'D. $$m = F r v^2$$' },
      ],
      correct: 'A',
      expEn: '$$m$$ is multiplied by $$v^2$$ and divided by $$r$$. Undo both: multiply both sides by $$r$$, divide both sides by $$v^2$$: $$m = \\dfrac{F r}{v^2}$$. Option B moved $$r$$ down and $$v^2$$ up — the opposite of undoing.',
      expVn: '$$m$$ đang bị nhân với $$v^2$$ và chia cho $$r$$. Hoàn tác cả hai: nhân cả hai vế với $$r$$, chia cả hai vế cho $$v^2$$: $$m = \\dfrac{F r}{v^2}$$. Phương án B đưa $$r$$ xuống và $$v^2$$ lên — ngược với hoàn tác.',
    },
    {
      id: 'q4_double_speed',
      type: 'mcq',
      title: '4. A ball on a string is swung at twice the speed, on the same string. The tension needed is…',
      options: [
        { val: 'A', text: 'A. the same' },
        { val: 'B', text: 'B. twice as big' },
        { val: 'C', text: 'C. half as big' },
        { val: 'D', text: 'D. four times as big' },
      ],
      correct: 'D',
      expEn: '$$F = \\dfrac{m v^2}{r}$$ — the speed is SQUARED. Doubling $$v$$ multiplies $$v^2$$ by four, so the tension is four times as big. Option B is what you get by reading $$v^2$$ as $$v$$.',
      expVn: '$$F = \\dfrac{m v^2}{r}$$ — tốc độ bị BÌNH PHƯƠNG. Gấp đôi $$v$$ làm $$v^2$$ tăng bốn lần, nên lực căng lớn gấp bốn. Phương án B là kết quả khi đọc $$v^2$$ thành $$v$$.',
    },
    {
      id: 'q5_top_of_circle',
      type: 'mcq',
      title: '5. A bucket is at the TOP of a vertical circle. Which equation is correct there?',
      options: [
        { val: 'A', text: 'A. $$T - m g = \\dfrac{m v^2}{r}$$' },
        { val: 'B', text: 'B. $$T + m g = \\dfrac{m v^2}{r}$$' },
        { val: 'C', text: 'C. $$T = m g$$' },
        { val: 'D', text: 'D. $$m g - T = \\dfrac{m v^2}{r}$$' },
      ],
      correct: 'B',
      expEn: 'At the top the centre is below the bucket. The rope pulls down toward the centre and the weight also points down toward the centre, so they ADD: $$T + m g = \\dfrac{m v^2}{r}$$. Option A is the bottom of the circle, where the weight points away from the centre.',
      expVn: 'Ở đỉnh, tâm nằm dưới xô. Dây kéo xuống về tâm và trọng lực cũng hướng xuống về tâm, nên chúng CỘNG: $$T + m g = \\dfrac{m v^2}{r}$$. Phương án A là đáy đường tròn, nơi trọng lực hướng ra xa tâm.',
    },
    {
      id: 'q6_min_speed',
      type: 'mcq',
      title: '6. A loop has radius 10.0 m. Taking $$g = 9.8$$ m/s², the minimum speed to stay on the track at the top is…',
      options: [
        { val: 'A', text: 'A. 98 m/s' },
        { val: 'B', text: 'B. 4.9 m/s' },
        { val: 'C', text: 'C. 9.9 m/s' },
        { val: 'D', text: 'D. 49 m/s' },
      ],
      correct: 'C',
      expEn: 'Minimum speed means $$N = 0$$, so $$m g = \\dfrac{m v^2}{r}$$, the mass cancels and $$v = \\sqrt{g r} = \\sqrt{9.8 \\times 10.0} = \\sqrt{98} = 9.9$$ m/s. Option A is $$g r$$ without the square root.',
      expVn: 'Tốc độ nhỏ nhất nghĩa là $$N = 0$$, nên $$m g = \\dfrac{m v^2}{r}$$, khối lượng triệt tiêu và $$v = \\sqrt{g r} = \\sqrt{9.8 \\times 10.0} = \\sqrt{98} = 9.9$$ m/s. Phương án A là $$g r$$ chưa lấy căn.',
    },
    {
      id: 'q7_g_formula',
      type: 'mcq',
      title: '7. In $$g = \\dfrac{G M}{r^2}$$, the letter $$r$$ is…',
      options: [
        { val: 'A', text: 'A. the height above the ground' },
        { val: 'B', text: 'B. the radius of the orbit measured from the surface' },
        { val: 'C', text: 'C. always 6.67 × 10⁻¹¹' },
        { val: 'D', text: 'D. the distance from the CENTRE of the mass $$M$$' },
      ],
      correct: 'D',
      expEn: 'Gravity acts as if all of $$M$$ sat at its centre, so $$r$$ is measured from the centre — for a satellite, the planet\'s radius PLUS the height. Option C is $$G$$, the constant, not $$r$$.',
      expVn: 'Trọng lực tác dụng như thể toàn bộ $$M$$ nằm ở tâm, nên $$r$$ được đo từ tâm — với vệ tinh, là bán kính hành tinh CỘNG độ cao. Phương án C là $$G$$, hằng số, không phải $$r$$.',
    },
    {
      id: 'q8_first_move_root',
      type: 'mcq',
      title: '8. To make $$M$$ the subject of $$v = \\sqrt{\\dfrac{G M}{r}}$$, the FIRST move is to…',
      options: [
        { val: 'A', text: 'A. square both sides' },
        { val: 'B', text: 'B. divide both sides by $$G$$' },
        { val: 'C', text: 'C. multiply both sides by $$r$$' },
        { val: 'D', text: 'D. take the square root of both sides' },
      ],
      correct: 'A',
      expEn: 'The target is under a root, so square first: $$v^2 = \\dfrac{G M}{r}$$. Then multiply by $$r$$ and divide by $$G$$: $$M = \\dfrac{v^2 r}{G}$$. Doing option B or C first is legal but leaves the root in the way.',
      expVn: 'Ẩn số nằm dưới căn, nên bình phương trước: $$v^2 = \\dfrac{G M}{r}$$. Rồi nhân với $$r$$ và chia cho $$G$$: $$M = \\dfrac{v^2 r}{G}$$. Làm phương án B hoặc C trước thì hợp lệ nhưng dấu căn vẫn cản đường.',
    },
    {
      id: 'q9_units',
      type: 'mcq',
      title: '9. An orbit has radius 4.2 × 10⁴ km and the answer box wants the period in hours. Which is the correct plan?',
      options: [
        { val: 'A', text: 'A. Put 4.2 × 10⁴ straight in; the formula gives hours' },
        { val: 'B', text: 'B. Convert km to m first, use the formula, then divide the seconds by 3600' },
        { val: 'C', text: 'C. Use km in the formula and divide the answer by 60' },
        { val: 'D', text: 'D. Convert km to m first; the formula then gives hours directly' },
      ],
      correct: 'B',
      expEn: 'The formula only speaks SI: metres in, seconds out. So km → m (× 1000) before substituting, and s → hours (÷ 3600) after. Options A and C feed it km and get a confident wrong number; option D forgets that the output is seconds.',
      expVn: 'Công thức chỉ hiểu SI: mét vào, giây ra. Nên km → m (× 1000) trước khi thay số, và s → giờ (÷ 3600) sau đó. Phương án A và C đưa km vào và nhận một con số sai đầy tự tin; phương án D quên rằng kết quả là giây.',
    },
    {
      id: 'q10_kms',
      type: 'mcq',
      title: '10. A speed of 3.2 km/s, in the units the formula needs, is…',
      options: [
        { val: 'A', text: 'A. 3.2 m/s' },
        { val: 'B', text: 'B. 32 m/s' },
        { val: 'C', text: 'C. 320 m/s' },
        { val: 'D', text: 'D. 3200 m/s' },
      ],
      correct: 'D',
      expEn: 'Kilo means a thousand: 3.2 km every second is 3200 m every second. Put 3.2 into a formula where $$v$$ is squared and the answer is out by a factor of a million.',
      expVn: 'Kilo nghĩa là một nghìn: 3.2 km mỗi giây là 3200 m mỗi giây. Đưa 3.2 vào công thức có $$v$$ bình phương thì đáp án sai lệch cả một triệu lần.',
    },
  ],
};
