// src/data/PHYSICS/PHY_MOM/assessment.js
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
// Every wrong option is a slip with a name (a lost minus sign, a subtraction
// done backwards, a fraction upside down, masses multiplied instead of
// added), and the explanation names it. The weighting follows where this
// student loses marks: items 1, 4, 6, 7 and 9 rearrange or derive, and
// items 2, 3, 5, 9 and 10 turn on a sign.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: 'q1_same_momentum',
      type: 'mcq',
      title: '1. A 0.145 kg baseball travels at 42.0 m/s. How fast must a 14.0 kg dog walk to have the SAME momentum as the baseball?',
      options: [
        { val: 'A', text: 'A. 42.0 m/s' },
        { val: 'B', text: 'B. 85.3 m/s' },
        { val: 'C', text: 'C. 0.435 m/s' },
        { val: 'D', text: 'D. 4060 m/s' },
      ],
      correct: 'C',
      expEn: 'The same momentum means $$m_1 v_1 = m_2 v_2$$. The dog\'s $$v_2$$ is multiplied by its mass, so divide both sides by $$m_2$$: $$v_2 = \\dfrac{m_1 v_1}{m_2} = \\dfrac{0.145 \\times 42.0}{14.0} = \\dfrac{6.09}{14.0} = 0.435$$ m/s. Option A gives the dog the same SPEED as the ball, not the same momentum. Option B multiplied 6.09 by 14.0 instead of dividing. Option D swapped the masses, $$\\dfrac{14.0 \\times 42.0}{0.145}$$ — a heavy dog needs a SMALL speed to match a light ball, not a huge one.',
      expVn: 'Cùng động lượng nghĩa là $$m_1 v_1 = m_2 v_2$$. $$v_2$$ của con chó đang bị nhân với khối lượng của nó, nên chia cả hai vế cho $$m_2$$: $$v_2 = \\dfrac{m_1 v_1}{m_2} = \\dfrac{0.145 \\times 42.0}{14.0} = \\dfrac{6.09}{14.0} = 0.435$$ m/s. Phương án A cho con chó cùng TỐC ĐỘ với quả bóng, chứ không phải cùng động lượng. Phương án B nhân 6.09 với 14.0 thay vì chia. Phương án D đổi chỗ hai khối lượng, $$\\dfrac{14.0 \\times 42.0}{0.145}$$ — con chó nặng hơn nhiều nên chỉ cần tốc độ NHỎ để bằng quả bóng nhẹ, không phải tốc độ khổng lồ.',
    },
    {
      id: 'q2_bounce_back',
      type: 'mcq',
      title: '2. A 0.500 kg ball hits a wall at +6.00 m/s and bounces straight back at the same speed, 6.00 m/s. What is its change in momentum?',
      options: [
        { val: 'A', text: 'A. −6.00 kg·m/s' },
        { val: 'B', text: 'B. 0 kg·m/s — its speed did not change' },
        { val: 'C', text: 'C. −3.00 kg·m/s' },
        { val: 'D', text: 'D. +6.00 kg·m/s' },
      ],
      correct: 'A',
      expEn: 'Momentum is a vector, so direction counts. Bouncing BACK makes the velocity negative: $$p_i = 0.500 \\times 6.00 = +3.00$$ kg·m/s and $$p_f = 0.500 \\times (-6.00) = -3.00$$ kg·m/s. Change = final − initial: $$-3.00 - (+3.00) = -6.00$$ kg·m/s — twice the momentum, because it reversed. Option B treated momentum like speed and ignored the direction. Option C is the final momentum, not the change: the initial momentum was never subtracted. Option D subtracted the wrong way round, initial − final.',
      expVn: 'Động lượng là một vectơ, nên hướng rất quan trọng. Nảy NGƯỢC lại làm vận tốc mang dấu âm: $$p_i = 0.500 \\times 6.00 = +3.00$$ kg·m/s và $$p_f = 0.500 \\times (-6.00) = -3.00$$ kg·m/s. Độ biến thiên = sau − trước: $$-3.00 - (+3.00) = -6.00$$ kg·m/s — gấp đôi động lượng, vì quả bóng đã đổi chiều. Phương án B coi động lượng như tốc độ và bỏ qua hướng. Phương án C là động lượng sau, không phải độ biến thiên: động lượng trước chưa hề được trừ đi. Phương án D trừ ngược thứ tự, lấy trước − sau.',
    },
    {
      id: 'q3_delta_v',
      type: 'mcq',
      title: '3. A ball\'s velocity changes from −41.0 m/s to +37.0 m/s. What is $$v_f - v_i$$?',
      options: [
        { val: 'A', text: 'A. −4.0 m/s' },
        { val: 'B', text: 'B. +4.0 m/s' },
        { val: 'C', text: 'C. −78.0 m/s' },
        { val: 'D', text: 'D. +78.0 m/s' },
      ],
      correct: 'D',
      expEn: 'Final minus initial, with the initial velocity in brackets: $$v_f - v_i = 37.0 - (-41.0) = 37.0 + 41.0 = +78.0$$ m/s. Minus a negative is a plus. Option A wrote $$37.0 - 41.0$$ — the minus sign on −41.0 was lost. Option B took the difference of the two speeds and ignored direction. Option C subtracted backwards, initial − final: $$-41.0 - 37.0$$.',
      expVn: 'Sau trừ trước, và đặt vận tốc trước trong ngoặc: $$v_f - v_i = 37.0 - (-41.0) = 37.0 + 41.0 = +78.0$$ m/s. Trừ một số âm là cộng. Phương án A viết thành $$37.0 - 41.0$$ — dấu trừ của −41.0 đã bị mất. Phương án B lấy hiệu của hai tốc độ và bỏ qua hướng. Phương án C trừ ngược, lấy trước − sau: $$-41.0 - 37.0$$.',
    },
    {
      id: 'q4_rearrange_dt',
      type: 'mcq',
      title: '4. Make $$\\Delta t$$ the subject of $$F \\Delta t = m(v_f - v_i)$$.',
      options: [
        { val: 'A', text: 'A. $$\\Delta t = \\dfrac{F}{m(v_f - v_i)}$$' },
        { val: 'B', text: 'B. $$\\Delta t = \\dfrac{m(v_f - v_i)}{F}$$' },
        { val: 'C', text: 'C. $$\\Delta t = m(v_f - v_i) - F$$' },
        { val: 'D', text: 'D. $$\\Delta t = \\dfrac{m v_f - v_i}{F}$$' },
      ],
      correct: 'B',
      expEn: '$$\\Delta t$$ is MULTIPLIED by $$F$$, so undo it by dividing both sides by $$F$$: $$\\Delta t = \\dfrac{m(v_f - v_i)}{F}$$. Option A is that fraction upside down. Option C subtracted $$F$$ — but $$F$$ multiplies $$\\Delta t$$, it is not added to it. Option D dropped the bracket, so $$m$$ multiplies only $$v_f$$; the mass multiplies the whole change in velocity.',
      expVn: '$$\\Delta t$$ đang bị NHÂN với $$F$$, nên hoàn tác bằng cách chia cả hai vế cho $$F$$: $$\\Delta t = \\dfrac{m(v_f - v_i)}{F}$$. Phương án A là phân số đó bị lộn ngược. Phương án C trừ $$F$$ — nhưng $$F$$ nhân với $$\\Delta t$$, chứ không cộng với nó. Phương án D bỏ mất dấu ngoặc, nên $$m$$ chỉ nhân với $$v_f$$; khối lượng phải nhân với toàn bộ độ thay đổi vận tốc.',
    },
    {
      id: 'q5_bat_force',
      type: 'mcq',
      title: '5. A bat hits a 0.150 kg baseball for 0.0880 s. The ball\'s velocity changes from −41.0 m/s to +37.0 m/s. What average force did the bat apply to the ball?',
      options: [
        { val: 'A', text: 'A. +133 N' },
        { val: 'B', text: 'B. −6.82 N' },
        { val: 'C', text: 'C. 11.7 N' },
        { val: 'D', text: 'D. −133 N' },
      ],
      correct: 'A',
      expEn: 'Divide both sides by $$\\Delta t$$: $$F = \\dfrac{m(v_f - v_i)}{\\Delta t} = \\dfrac{0.150 \\times (37.0 - (-41.0))}{0.0880} = \\dfrac{0.150 \\times 78.0}{0.0880} = \\dfrac{11.7}{0.0880} = +133$$ N. Positive: the force points the way the ball ends up going. Option B lost the minus on −41.0 and used $$37.0 - 41.0 = -4.0$$. Option C stopped at 11.7 — that is the impulse, in N·s; it still has to be divided by $$\\Delta t$$. Option D subtracted backwards, initial − final, which points the force the wrong way.',
      expVn: 'Chia cả hai vế cho $$\\Delta t$$: $$F = \\dfrac{m(v_f - v_i)}{\\Delta t} = \\dfrac{0.150 \\times (37.0 - (-41.0))}{0.0880} = \\dfrac{0.150 \\times 78.0}{0.0880} = \\dfrac{11.7}{0.0880} = +133$$ N. Dấu dương: lực hướng theo chiều quả bóng bay đi sau cú đánh. Phương án B làm mất dấu trừ của −41.0 và tính $$37.0 - 41.0 = -4.0$$. Phương án C dừng lại ở 11.7 — đó là xung lượng, đơn vị N·s; vẫn còn phải chia cho $$\\Delta t$$. Phương án D trừ ngược (trước − sau), nên lực bị chỉ sai hướng.',
    },
    {
      id: 'q6_at_rest',
      type: 'mcq',
      title: '6. Car 1 hits car 2, which is at rest. What does "at rest" turn $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$ into?',
      options: [
        { val: 'A', text: 'A. $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f}$$' },
        { val: 'B', text: 'B. $$m_1 v_{1i} = m_1 v_{1f}$$' },
        { val: 'C', text: 'C. $$m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$$' },
        { val: 'D', text: 'D. $$m_1 v_{1i} + m_2 = m_1 v_{1f} + m_2 v_{2f}$$' },
      ],
      correct: 'C',
      expEn: '"At rest" describes car 2 BEFORE the crash: $$v_{2i} = 0$$, so $$m_2 v_{2i} = m_2 \\times 0 = 0$$ and that term vanishes, leaving $$m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$$. Option A set car 2\'s velocity AFTER to zero instead — but car 2 gets knocked into motion. Option B deleted both of car 2\'s terms, as if car 2 had no mass. Option D kept $$m_2$$, as if $$m_2 \\times 0$$ were $$m_2$$ — anything times zero is zero.',
      expVn: '"Đứng yên" mô tả xe 2 TRƯỚC va chạm: $$v_{2i} = 0$$, nên $$m_2 v_{2i} = m_2 \\times 0 = 0$$ và số hạng đó biến mất, còn lại $$m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$$. Phương án A lại cho vận tốc SAU của xe 2 bằng 0 — nhưng xe 2 bị húc cho chuyển động. Phương án B xoá cả hai số hạng của xe 2, như thể xe 2 không có khối lượng. Phương án D giữ lại $$m_2$$, như thể $$m_2 \\times 0$$ bằng $$m_2$$ — mọi số nhân với 0 đều bằng 0.',
    },
    {
      id: 'q7_factor_vf',
      type: 'mcq',
      title: '7. Two carts collide and stick together. Make $$v_f$$ the subject of $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$$.',
      options: [
        { val: 'A', text: 'A. $$v_f = \\dfrac{m_1 + m_2}{m_1 v_{1i} + m_2 v_{2i}}$$' },
        { val: 'B', text: 'B. $$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$$' },
        { val: 'C', text: 'C. $$v_f = \\dfrac{v_{1i} + v_{2i}}{2}$$' },
        { val: 'D', text: 'D. $$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 m_2}$$' },
      ],
      correct: 'B',
      expEn: '$$v_f$$ is in TWO terms, so factor it out first: $$m_1 v_f + m_2 v_f = (m_1 + m_2) v_f$$. Now $$v_f$$ is multiplied by the whole bracket, so divide both sides by $$(m_1 + m_2)$$: $$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$$. Option A is that fraction upside down. Option C "cancelled" each mass across a plus sign and then averaged the velocities — you can only cancel a factor that multiplies EVERY term on both sides. Option D turned $$m_1 v_f + m_2 v_f$$ into $$m_1 m_2 v_f$$ — when you factor, the masses ADD; they do not multiply.',
      expVn: '$$v_f$$ nằm trong HAI số hạng, nên đặt nó ra làm nhân tử chung trước: $$m_1 v_f + m_2 v_f = (m_1 + m_2) v_f$$. Giờ $$v_f$$ đang nhân với cả ngoặc, nên chia cả hai vế cho $$(m_1 + m_2)$$: $$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$$. Phương án A là phân số đó bị lộn ngược. Phương án C "rút gọn" từng khối lượng qua dấu cộng rồi lấy trung bình hai vận tốc — chỉ được rút gọn một thừa số nhân với MỌI số hạng ở cả hai vế. Phương án D biến $$m_1 v_f + m_2 v_f$$ thành $$m_1 m_2 v_f$$ — khi đặt nhân tử chung, các khối lượng CỘNG lại chứ không nhân với nhau.',
    },
    {
      id: 'q8_stick_numbers',
      type: 'mcq',
      title: '8. A 2.00 kg cart moving at +3.00 m/s hits a 1.00 kg cart at rest, and they stick together. What is their velocity afterwards?',
      options: [
        { val: 'A', text: 'A. +3.00 m/s' },
        { val: 'B', text: 'B. +1.50 m/s' },
        { val: 'C', text: 'C. +6.00 m/s' },
        { val: 'D', text: 'D. +2.00 m/s' },
      ],
      correct: 'D',
      expEn: 'Stuck together, with cart 2 at rest: $$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} = \\dfrac{2.00 \\times 3.00 + 1.00 \\times 0}{2.00 + 1.00} = \\dfrac{6.00}{3.00} = +2.00$$ m/s. Option A divided by 2.00 kg only — but after sticking, BOTH carts move, so divide by the total mass. Option B averaged the two velocities, $$\\dfrac{3.00 + 0}{2}$$, and ignored the masses. Option C forgot to divide at all: 6.00 is the total momentum in kg·m/s, not a velocity.',
      expVn: 'Dính vào nhau, và xe 2 đứng yên: $$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} = \\dfrac{2.00 \\times 3.00 + 1.00 \\times 0}{2.00 + 1.00} = \\dfrac{6.00}{3.00} = +2.00$$ m/s. Phương án A chỉ chia cho 2.00 kg — nhưng sau khi dính, CẢ HAI xe cùng chuyển động, nên phải chia cho tổng khối lượng. Phương án B lấy trung bình hai vận tốc, $$\\dfrac{3.00 + 0}{2}$$, và bỏ qua khối lượng. Phương án C quên chia: 6.00 là tổng động lượng, đơn vị kg·m/s, không phải vận tốc.',
    },
    {
      id: 'q9_recoil',
      type: 'mcq',
      title: '9. A 4.50 kg rifle fires a 0.0100 kg bullet at +385 m/s. Both start at rest. What is the recoil velocity of the rifle?',
      options: [
        { val: 'A', text: 'A. +0.856 m/s' },
        { val: 'B', text: 'B. −0.856 m/s' },
        { val: 'C', text: 'C. −17.3 m/s' },
        { val: 'D', text: 'D. −385 m/s' },
      ],
      correct: 'B',
      expEn: 'Nothing moves before, so the total momentum is 0 before AND after: $$0 = m_1 v_{1f} + m_2 v_{2f}$$ (1 = bullet, 2 = rifle). Subtract the bullet\'s term from both sides — a minus sign appears — then divide by $$m_2$$: $$v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2} = -\\dfrac{0.0100 \\times 385}{4.50} = -\\dfrac{3.85}{4.50} = -0.856$$ m/s. The minus means the rifle kicks back, opposite to the bullet. Option A lost that minus sign. Option C multiplied by 4.50 instead of dividing. Option D gave the rifle the bullet\'s speed — the MOMENTA are equal and opposite, not the velocities; the rifle is 450 times heavier, so it moves 450 times slower.',
      expVn: 'Trước khi bắn không có gì chuyển động, nên tổng động lượng bằng 0 cả trước VÀ sau: $$0 = m_1 v_{1f} + m_2 v_{2f}$$ (1 = viên đạn, 2 = khẩu súng). Trừ số hạng của viên đạn ở cả hai vế — một dấu trừ xuất hiện — rồi chia cho $$m_2$$: $$v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2} = -\\dfrac{0.0100 \\times 385}{4.50} = -\\dfrac{3.85}{4.50} = -0.856$$ m/s. Dấu trừ nghĩa là khẩu súng giật lùi, ngược chiều viên đạn. Phương án A làm mất dấu trừ đó. Phương án C nhân với 4.50 thay vì chia. Phương án D cho khẩu súng tốc độ của viên đạn — ĐỘNG LƯỢNG bằng nhau và ngược chiều, chứ không phải vận tốc; khẩu súng nặng gấp 450 lần nên chuyển động chậm hơn 450 lần.',
    },
    {
      id: 'q10_minus_sign',
      type: 'mcq',
      title: '10. A 1250 kg car at +7.39 m/s hits a 5380 kg truck at rest. Afterwards the truck moves at +2.30 m/s, and the momentum equation gives the car\'s final velocity as −2.51 m/s. What does the minus sign tell you?',
      options: [
        { val: 'A', text: 'A. The car bounced back: it now moves at 2.51 m/s in the opposite direction' },
        { val: 'B', text: 'B. The car is still moving forward, but has slowed down to 2.51 m/s' },
        { val: 'C', text: 'C. It is a slip — a velocity cannot be negative, so the answer is really +2.51 m/s' },
        { val: 'D', text: 'D. The car\'s velocity went down by 2.51 m/s in the crash' },
      ],
      correct: 'A',
      expEn: 'Check it: $$v_{1f} = \\dfrac{m_1 v_{1i} - m_2 v_{2f}}{m_1} = \\dfrac{1250 \\times 7.39 - 5380 \\times 2.30}{1250} = \\dfrac{9237.5 - 12374}{1250} = -2.51$$ m/s. The sign of a velocity is its DIRECTION: forward was +, so − means the car is now going backwards — it bounced off the heavier truck. Option B reads the minus as "slower"; a car still going forward would have a + velocity. Option C mixes up velocity and speed: speed is never negative, but velocity is negative whenever the motion is in the − direction. Option D treats −2.51 as the change in velocity; the change is $$v_f - v_i = -2.51 - 7.39 = -9.90$$ m/s.',
      expVn: 'Kiểm tra: $$v_{1f} = \\dfrac{m_1 v_{1i} - m_2 v_{2f}}{m_1} = \\dfrac{1250 \\times 7.39 - 5380 \\times 2.30}{1250} = \\dfrac{9237.5 - 12374}{1250} = -2.51$$ m/s. Dấu của vận tốc là HƯỚNG của nó: về phía trước là +, nên − nghĩa là xe con giờ đang chạy lùi — nó bị bật ngược lại khỏi chiếc xe tải nặng hơn. Phương án B hiểu dấu trừ là "chậm hơn"; xe vẫn chạy về phía trước thì vận tốc phải mang dấu +. Phương án C nhầm vận tốc với tốc độ: tốc độ không bao giờ âm, nhưng vận tốc thì âm mỗi khi vật chuyển động theo chiều −. Phương án D coi −2.51 là độ thay đổi vận tốc; độ thay đổi là $$v_f - v_i = -2.51 - 7.39 = -9.90$$ m/s.',
    },
  ],
};
