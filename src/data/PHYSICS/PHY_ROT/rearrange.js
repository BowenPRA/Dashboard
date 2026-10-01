// src/data/PHYSICS/PHY_ROT/rearrange.js
// Isolate It — the Acellus rotation items, worked the way the answer box hides.
//
// Only the FORMULA, the TARGET, the GIVEN numbers and (where the story changes
// the equation) the SETUP are authored. The engine (src/utils/formula.js)
// derives the chips, the hint, the move count, every line of working, the
// substituted line, the conversions, the answer and the traps.
//
// Where the items come from. Items 1, 3–6, 9 and 11 are the student's own
// Acellus screenshots (physics.docx, 2026-10-01), worded as she saw them.
// Item 10 is her wheel item (4.50 rad/s, −0.822 rad/s²) asked the other way
// round — "how long until it stops?" — because asked her way, ω_f is already
// the subject and there is nothing to isolate. Items 2, 7, 8 and 12 are the
// module's last three lessons (rotational dynamics, rotational kinetic energy,
// angular momentum), which she has not reached yet, so they are written in
// the Acellus style rather than copied. The deck works the rest of her items
// (the lazy susan, the door, the drawbridge, the rod) — they need sin θ, a
// two-formula chain or a square root of 2, which this engine does not do.
//
// THE IDEAS OF THIS FILE.
//   · A turn is not a radian. Every θ given in revolutions (items 9, 11) must
//     be converted, × 2π, in the Units stage before it goes in — the most
//     common way to lose this module's marks.
//   · "÷ 2" is undone by "× 2". The kinematics, ½Iω² and ½MR² all put a ½ on
//     the target; the engine offers the 2 that undoes it.
//   · The angular-momentum item starts from the SAME equation as the momentum
//     unit's collisions, with I in place of m and ω in place of v. A kid
//     jumping onto a merry-go-round is a stick-together collision: set it up,
//     factor ω_f out, divide by the whole bracket.
//
// Order is by SHAPE of the algebra:
//   1–2    one move (÷): the bus wheel's ω, the skater's new ω
//   3      one move, and a ½ that stays: a uniform pole's weight acts at its middle
//   4–5    one move that divides a whole SUM: the board on two supports, twice
//   6      two divides, and g cancels: the teeter-totter
//   7      ÷, then × 2 to undo a ½: the flywheel's moment of inertia
//   8      ÷, ÷, × 2, and a radius in cm: the disk spun by a torque
//   9      ÷ a bracket, then × 2; turns in revolutions: the barrel ride's time
//   10     setup ("it stops", ω_f = 0), then − and ÷; a negative given
//   11     − a term, ÷, ÷; revolutions; the answer comes out NEGATIVE
//   12     setup twice (still before, stuck together after), FACTOR, ÷ the bracket
//
// House notes:
//  · `signed` is per item (10 and 11): CCW is +, CW is −, and an angular
//    acceleration that slows a CCW spin is negative.
//  · g = 9.8 m/s² is a constant. A weight already given in newtons (the
//    plank in the deck) is NOT multiplied by g — that item is in the deck.

export const rearrange = {
  title: 'Isolate It',
  titleVn: 'Cô Lập Biến',
  intro: 'Rotation uses the formulas you know with new letters. Isolate the unknown with letters first, convert every turn to radians and every cm to m, then put the numbers in.',
  introVn: 'Chuyển động quay dùng những công thức em đã biết với chữ cái mới. Cô lập ẩn số bằng chữ trước, đổi mọi vòng sang radian và mọi cm sang m, rồi mới thay số.',

  // The symbols the formula page uses, with the SI unit each one carries.
  symbols: {
    v: { name: 'speed at the edge', nameVn: 'tốc độ ở mép', si: 'm/s' },
    r: { name: 'radius — distance from the centre', nameVn: 'bán kính — khoảng cách tới tâm', si: 'm' },
    R: { name: 'radius of the disk', nameVn: 'bán kính của đĩa', si: 'm' },
    omega: { name: 'angular velocity', nameVn: 'vận tốc góc', si: 'rad/s' },
    omega_i: { name: 'angular velocity at the start', nameVn: 'vận tốc góc lúc đầu', si: 'rad/s' },
    omega_f: { name: 'angular velocity at the end', nameVn: 'vận tốc góc lúc cuối', si: 'rad/s' },
    omega_1i: { name: 'angular velocity of object 1 before', nameVn: 'vận tốc góc vật 1 lúc trước', si: 'rad/s' },
    omega_2i: { name: 'angular velocity of object 2 before', nameVn: 'vận tốc góc vật 2 lúc trước', si: 'rad/s' },
    omega_1f: { name: 'angular velocity of object 1 after', nameVn: 'vận tốc góc vật 1 lúc sau', si: 'rad/s' },
    omega_2f: { name: 'angular velocity of object 2 after', nameVn: 'vận tốc góc vật 2 lúc sau', si: 'rad/s' },
    alpha: { name: 'angular acceleration', nameVn: 'gia tốc góc', si: 'rad/s²' },
    theta: { name: 'angle turned', nameVn: 'góc quay được', si: 'rad' },
    t: { name: 'time', nameVn: 'thời gian', si: 's' },
    tau: { name: 'torque', nameVn: 'mômen lực', si: 'N·m' },
    I: { name: 'moment of inertia', nameVn: 'mômen quán tính', si: 'kg·m²' },
    I_i: { name: 'moment of inertia before', nameVn: 'mômen quán tính lúc trước', si: 'kg·m²' },
    I_f: { name: 'moment of inertia after', nameVn: 'mômen quán tính lúc sau', si: 'kg·m²' },
    I_1: { name: 'moment of inertia of object 1', nameVn: 'mômen quán tính vật 1', si: 'kg·m²' },
    KE: { name: 'rotational kinetic energy', nameVn: 'động năng quay', si: 'J' },
    M: { name: 'mass of the board', nameVn: 'khối lượng tấm ván', si: 'kg' },
    m: { name: 'mass', nameVn: 'khối lượng', si: 'kg' },
    m_1: { name: 'mass of person 1', nameVn: 'khối lượng người 1', si: 'kg' },
    m_2: { name: 'mass of person 2', nameVn: 'khối lượng người 2', si: 'kg' },
    d: { name: 'distance from the pivot to the lifting hand', nameVn: 'khoảng cách từ điểm tựa tới tay nâng', si: 'm' },
    d_1: { name: 'distance of person 1 from the pivot', nameVn: 'khoảng cách người 1 tới điểm tựa', si: 'm' },
    d_2: { name: 'distance of person 2 from the pivot', nameVn: 'khoảng cách người 2 tới điểm tựa', si: 'm' },
    L: { name: 'length of the board', nameVn: 'chiều dài tấm ván', si: 'm' },
    x: { name: 'distance of the load from the pivot', nameVn: 'khoảng cách từ vật đặt lên tới điểm tựa', si: 'm' },
    F: { name: 'lifting force', nameVn: 'lực nâng', si: 'N' },
    F_R: { name: 'force of the right support', nameVn: 'lực của giá đỡ bên phải', si: 'N' },
    F_B: { name: 'Bob\'s lifting force', nameVn: 'lực nâng của Bob', si: 'N' },
  },

  constants: {
    g: { value: 9.8, unit: 'm/s²' },
  },

  items: [
    {
      id: 'o1_bus',
      formula: 'v = r omega',
      target: 'omega',
      prompt: 'A bus slows down from 8.22 m/s to a stop in 13.3 s. Its wheels have a radius of 0.530 m. What is the initial angular speed of the wheels?',
      promptVn: 'Một xe buýt giảm tốc từ 8.22 m/s đến khi dừng hẳn trong 13.3 s. Bánh xe của nó có bán kính 0.530 m. Tốc độ góc ban đầu của bánh xe là bao nhiêu?',
      hint: 'The bus\'s speed IS the speed of the edge of its wheel: $v = r\\omega$. The 13.3 s is not needed for this question.',
      hintVn: 'Tốc độ của xe buýt CHÍNH LÀ tốc độ của mép bánh xe: $v = r\\omega$. Câu này không cần 13.3 s.',
      given: { v: { value: 8.22, unit: 'm/s' }, r: { value: 0.53, unit: 'm', show: '0.530' } },
      ask: { unit: 'rad/s' },
    },
    {
      id: 'l1_skater',
      formula: 'I_i omega_i = I_f omega_f',
      target: 'omega_f',
      prompt: 'A figure skater spins at 2.10 rad/s with her arms out, and her moment of inertia is 4.80 kg·m². She pulls her arms in, and her moment of inertia drops to 1.60 kg·m². What is her new angular velocity?',
      promptVn: 'Một vận động viên trượt băng nghệ thuật xoay với 2.10 rad/s khi dang tay, và mômen quán tính của cô là 4.80 kg·m². Cô thu tay vào, và mômen quán tính giảm còn 1.60 kg·m². Vận tốc góc mới của cô là bao nhiêu?',
      hint: 'Nothing outside twists her, so her angular momentum $L = I\\omega$ stays the same: $I_i \\omega_i = I_f \\omega_f$. $\\omega_f$ is multiplied by $I_f$.',
      hintVn: 'Không có gì bên ngoài làm cô xoắn, nên mômen động lượng $L = I\\omega$ của cô không đổi: $I_i \\omega_i = I_f \\omega_f$. $\\omega_f$ đang nhân với $I_f$.',
      given: { I_i: { value: 4.8, unit: 'kg·m²', show: '4.80' }, omega_i: { value: 2.1, unit: 'rad/s', show: '2.10' }, I_f: { value: 1.6, unit: 'kg·m²', show: '1.60' } },
      ask: { unit: 'rad/s' },
    },
    {
      id: 'b1_vaulter',
      formula: 'F d = m g L / 2',
      target: 'F',
      prompt: 'A vaulter is holding a horizontal 3.00 kg pole, 4.50 m long. His front arm lifts straight up on the pole, 0.750 m from the end, and his back arm pushes straight down on the end of the pole. How much force does his front arm exert on the pole?',
      promptVn: 'Một vận động viên nhảy sào cầm ngang một cây sào 3.00 kg, dài 4.50 m. Tay trước nâng thẳng lên cây sào, cách đầu sào 0.750 m, còn tay sau ấn thẳng xuống ngay đầu sào. Tay trước tác dụng lên cây sào một lực bao nhiêu?',
      hint: 'Put the pivot at the BACK hand, so its unknown push has no turning effect. The pole\'s weight $mg$ acts at its middle, $L/2$ from the end. Clockwise = anticlockwise: $F d = m g \\dfrac{L}{2}$.',
      hintVn: 'Đặt điểm tựa ở tay SAU, để lực ấn chưa biết của nó không gây quay. Trọng lượng $mg$ của cây sào đặt ở chính giữa, cách đầu sào $L/2$. Chiều kim đồng hồ = ngược chiều: $F d = m g \\dfrac{L}{2}$.',
      given: { d: { value: 0.75, unit: 'm', show: '0.750' }, m: { value: 3, unit: 'kg', show: '3.00' }, L: { value: 4.5, unit: 'm', show: '4.50' } },
      ask: { unit: 'N' },
    },
    {
      id: 'b2_sawhorse',
      formula: 'F_R L = M g L / 2 + m g x',
      target: 'F_R',
      prompt: 'A 10.5 kg board 6.00 m long is supported by two sawhorses, one at each end. A 4.45 kg saw sits on the board 1.80 m from the left end. What is the upward force that the RIGHT sawhorse exerts on the board?',
      promptVn: 'Một tấm ván 10.5 kg dài 6.00 m được đỡ bởi hai giá đỡ, mỗi giá ở một đầu. Một cái cưa 4.45 kg nằm trên tấm ván, cách đầu trái 1.80 m. Giá đỡ BÊN PHẢI tác dụng lên tấm ván một lực hướng lên bao nhiêu?',
      hint: 'Pivot at the LEFT sawhorse — the force you are NOT asked for. The right sawhorse turns the board one way ($F_R L$); the board\'s weight at its middle and the saw turn it the other way. One divide frees $F_R$: divide the whole right side by $L$.',
      hintVn: 'Đặt điểm tựa ở giá đỡ BÊN TRÁI — lực mà đề KHÔNG hỏi. Giá đỡ phải làm ván quay một chiều ($F_R L$); trọng lượng tấm ván ở giữa và cái cưa làm nó quay chiều kia. Một phép chia giải phóng $F_R$: chia cả vế phải cho $L$.',
      given: { M: { value: 10.5, unit: 'kg' }, m: { value: 4.45, unit: 'kg' }, L: { value: 6, unit: 'm', show: '6.00' }, x: { value: 1.8, unit: 'm', show: '1.80' } },
      ask: { unit: 'N' },
    },
    {
      id: 'b3_bob',
      formula: 'F_B L = M g L / 2 + m g x',
      target: 'F_B',
      prompt: 'Ann and Bob are carrying an 18.5 kg table that is 2.25 m long. An 8.33 kg box sits on the table 0.750 m from Ann. How much lift force does Bob exert?',
      promptVn: 'Ann và Bob đang khiêng một cái bàn 18.5 kg dài 2.25 m. Một cái hộp 8.33 kg nằm trên bàn, cách Ann 0.750 m. Bob tác dụng một lực nâng bao nhiêu?',
      hint: 'The same shape as the sawhorses. Pivot at Ann, so her lift drops out. The table\'s weight acts at its middle, $L/2$ from Ann; the box is $x = 0.750$ m from her.',
      hintVn: 'Cùng dạng với bài giá đỡ. Đặt điểm tựa ở Ann, để lực nâng của cô ấy biến mất. Trọng lượng cái bàn đặt ở chính giữa, cách Ann $L/2$; cái hộp cách cô ấy $x = 0.750$ m.',
      given: { M: { value: 18.5, unit: 'kg' }, m: { value: 8.33, unit: 'kg' }, L: { value: 2.25, unit: 'm' }, x: { value: 0.75, unit: 'm', show: '0.750' } },
      ask: { unit: 'N' },
    },
    {
      id: 'b4_teeter',
      formula: 'm_1 g d_1 = m_2 g d_2',
      target: 'd_2',
      prompt: 'Two people, a man weighing 72.9 kg and a woman weighing 101 kg, are sitting on a teeter-totter. The man sits 2.62 m from the fulcrum. What is the distance from the fulcrum to where the woman should sit to balance the teeter-totter in static equilibrium?',
      promptVn: 'Hai người, một người đàn ông nặng 72.9 kg và một người phụ nữ nặng 101 kg, ngồi trên một cái bập bênh. Người đàn ông ngồi cách điểm tựa 2.62 m. Người phụ nữ phải ngồi cách điểm tựa bao xa để bập bênh cân bằng?',
      hint: 'Each weight $mg$ times its distance from the fulcrum is a torque, and balanced means they are equal. $d_2$ is multiplied by $m_2$ AND by $g$: divide by each. Watch $g$ cancel.',
      hintVn: 'Mỗi trọng lượng $mg$ nhân với khoảng cách tới điểm tựa là một mômen lực, và cân bằng nghĩa là chúng bằng nhau. $d_2$ đang nhân với $m_2$ VÀ với $g$: chia cho từng cái. Để ý $g$ tự triệt tiêu.',
      given: { m_1: { value: 72.9, unit: 'kg' }, d_1: { value: 2.62, unit: 'm' }, m_2: { value: 101, unit: 'kg' } },
      ask: { unit: 'm' },
    },
    {
      id: 'e1_flywheel',
      formula: 'KE = I omega^2 / 2',
      target: 'I',
      prompt: 'A flywheel spinning at 31.4 rad/s stores 2,150 J of rotational kinetic energy. What is its moment of inertia?',
      promptVn: 'Một bánh đà quay với 31.4 rad/s tích trữ 2,150 J động năng quay. Mômen quán tính của nó là bao nhiêu?',
      hint: '$KE = \\tfrac{1}{2} I \\omega^2$ is $\\tfrac{1}{2} m v^2$ with the letters swapped. Divide away the $\\omega^2$, then the 2 underneath is undone by multiplying by 2.',
      hintVn: '$KE = \\tfrac{1}{2} I \\omega^2$ là $\\tfrac{1}{2} m v^2$ với các chữ được đổi. Chia bỏ $\\omega^2$, rồi số 2 ở dưới được khử bằng cách nhân với 2.',
      given: { KE: { value: 2150, unit: 'J', show: '2{,}150' }, omega: { value: 31.4, unit: 'rad/s' } },
      ask: { unit: 'kg·m²' },
    },
    {
      id: 'd1_disk',
      formula: 'tau = M R^2 alpha / 2',
      target: 'alpha',
      prompt: 'A torque of 0.650 N·m acts on a 2.40 kg solid disk of radius 18.0 cm. The moment of inertia of a solid disk is I = ½MR². What is the disk\'s angular acceleration?',
      promptVn: 'Một mômen lực 0.650 N·m tác dụng lên một đĩa đặc 2.40 kg bán kính 18.0 cm. Mômen quán tính của đĩa đặc là I = ½MR². Gia tốc góc của đĩa là bao nhiêu?',
      hint: '$\\tau = I\\alpha$ with $I = \\tfrac{1}{2} M R^2$ put in. Divide by $M$, divide by $R^2$, then multiply by 2. The radius is in cm — the Units stage will stop you.',
      hintVn: '$\\tau = I\\alpha$ với $I = \\tfrac{1}{2} M R^2$ được thay vào. Chia cho $M$, chia cho $R^2$, rồi nhân với 2. Bán kính đang tính bằng cm — bước Đơn vị sẽ chặn em lại.',
      given: { tau: { value: 0.65, unit: 'N·m', show: '0.650' }, M: { value: 2.4, unit: 'kg', show: '2.40' }, R: { value: 18, unit: 'cm', show: '18.0' } },
      ask: { unit: 'rad/s²' },
    },
    {
      id: 'k1_barrel_time',
      formula: 'theta = (omega_i + omega_f) t / 2',
      target: 't',
      prompt: 'A barrel ride at an amusement park is turning 2.30 rad/s when it starts to slow down. After making 5.00 revolutions, it is rotating at 1.11 rad/s. How much time did that take?',
      promptVn: 'Một trò chơi thùng quay ở công viên đang quay với 2.30 rad/s thì bắt đầu chậm lại. Sau khi quay được 5.00 vòng, nó quay với 1.11 rad/s. Việc đó mất bao lâu?',
      hint: 'You know $\\omega_i$, $\\omega_f$ and $\\theta$, and want $t$ — the equation with no $\\alpha$ in it. Divide by the whole bracket, then × 2 undoes the ÷ 2. Revolutions must become radians: × 2π.',
      hintVn: 'Em biết $\\omega_i$, $\\omega_f$ và $\\theta$, và cần $t$ — phương trình không có $\\alpha$. Chia cho cả ngoặc, rồi × 2 để khử ÷ 2. Số vòng phải đổi sang radian: × 2π.',
      given: { omega_i: { value: 2.3, unit: 'rad/s', show: '2.30' }, omega_f: { value: 1.11, unit: 'rad/s' }, theta: { value: 5, unit: 'rev', show: '5.00' } },
      ask: { unit: 's' },
    },
    {
      id: 'k2_wheel_stop',
      formula: 'omega_f = omega_i + alpha t',
      target: 't',
      signed: true,
      setup: [
        {
          kind: 'zero', syms: ['omega_f'],
          clue: '…how long until it stops?',
          clueVn: '…bao lâu thì nó dừng lại?',
          because: 'Stopped means not turning: the angular velocity at the END is 0.',
          becauseVn: 'Dừng lại nghĩa là không quay: vận tốc góc lúc CUỐI bằng 0.',
        },
      ],
      prompt: 'A wheel turning 4.50 rad/s experiences an angular acceleration of −0.822 rad/s². How long does it take to stop? Remember: CCW is +, CW is −.',
      promptVn: 'Một bánh xe đang quay 4.50 rad/s chịu gia tốc góc −0.822 rad/s². Mất bao lâu để nó dừng lại? Nhớ: ngược chiều kim đồng hồ là +, cùng chiều là −.',
      hint: 'Once it is set up, the left side is 0. $\\omega_i$ is added to the $t$ term: subtract it, then divide by $\\alpha$. $\\alpha$ is negative — brackets when it goes in.',
      hintVn: 'Sau khi thiết lập, vế trái bằng 0. $\\omega_i$ đang được cộng vào số hạng chứa $t$: trừ nó đi, rồi chia cho $\\alpha$. $\\alpha$ là số âm — đặt trong ngoặc khi thay vào.',
      given: { omega_i: { value: 4.5, unit: 'rad/s', show: '4.50' }, alpha: { value: -0.822, unit: 'rad/s²' } },
      ask: { unit: 's' },
    },
    {
      id: 'k3_barrel_alpha',
      formula: 'omega_f^2 = omega_i^2 + 2 alpha theta',
      target: 'alpha',
      signed: true,
      prompt: 'A barrel ride at an amusement park is turning 2.30 rad/s when it starts to slow down. After making 2.00 revolutions, it is rotating at 1.11 rad/s. What was its angular acceleration? Remember: CCW is +, CW is −.',
      promptVn: 'Một trò chơi thùng quay ở công viên đang quay với 2.30 rad/s thì bắt đầu chậm lại. Sau khi quay được 2.00 vòng, nó quay với 1.11 rad/s. Gia tốc góc của nó là bao nhiêu? Nhớ: ngược chiều kim đồng hồ là +, cùng chiều là −.',
      hint: 'No time given, so use the equation with no $t$. $\\omega_i^2$ is added to the $\\alpha$ term: subtract it. Then divide by $\\theta$ and by 2. It is slowing down, so expect a negative answer.',
      hintVn: 'Không cho thời gian, nên dùng phương trình không có $t$. $\\omega_i^2$ đang được cộng vào số hạng chứa $\\alpha$: trừ nó đi. Rồi chia cho $\\theta$ và cho 2. Nó đang chậm lại, nên đáp án sẽ âm.',
      given: { omega_i: { value: 2.3, unit: 'rad/s', show: '2.30' }, omega_f: { value: 1.11, unit: 'rad/s' }, theta: { value: 2, unit: 'rev', show: '2.00' } },
      ask: { unit: 'rad/s²' },
    },
    {
      id: 'l2_merry_go_round',
      formula: 'I_1 omega_1i + m r^2 omega_2i = I_1 omega_1f + m r^2 omega_2f',
      target: 'omega_f',
      objects: ['the merry-go-round', 'the kid'],
      objectsVn: ['vòng quay ngựa gỗ', 'bạn nhỏ'],
      setup: [
        {
          kind: 'zero', syms: ['omega_2i'],
          clue: 'The kid runs straight in from the side and jumps on.',
          clueVn: 'Bạn nhỏ chạy thẳng từ bên ngoài vào và nhảy lên.',
          because: 'Before jumping on, the kid is not going round the centre at all: the kid\'s angular velocity BEFORE is 0, so that term vanishes.',
          becauseVn: 'Trước khi nhảy lên, bạn nhỏ không hề quay quanh tâm: vận tốc góc TRƯỚC của bạn ấy bằng 0, nên số hạng đó biến mất.',
        },
        {
          kind: 'same', syms: ['omega_1f', 'omega_2f'], to: 'omega_f',
          clue: '…and goes round with it.',
          clueVn: '…và quay cùng với nó.',
          because: 'Once on, the kid turns WITH the merry-go-round: one shared angular velocity after, $\\omega_f$ — a stick-together collision.',
          becauseVn: 'Khi đã ở trên, bạn nhỏ quay CÙNG vòng quay: một vận tốc góc chung lúc sau, $\\omega_f$ — một va chạm dính vào nhau.',
        },
      ],
      prompt: 'A merry-go-round with a moment of inertia of 250 kg·m² spins at 1.20 rad/s. A 30.0 kg kid runs straight in from the side, jumps on at the edge, 1.50 m from the centre, and goes round with it. The kid adds I = mr². What is the new angular velocity?',
      promptVn: 'Một vòng quay ngựa gỗ có mômen quán tính 250 kg·m² đang quay với 1.20 rad/s. Một bạn nhỏ 30.0 kg chạy thẳng từ bên ngoài vào, nhảy lên ở mép, cách tâm 1.50 m, và quay cùng với nó. Bạn nhỏ thêm vào I = mr². Vận tốc góc mới là bao nhiêu?',
      hint: 'The momentum unit\'s collision equation with $I$ for $m$ and $\\omega$ for $v$. Once it is set up, $\\omega_f$ is in TWO terms: factor it out, then divide by the whole bracket $(I_1 + m r^2)$.',
      hintVn: 'Phương trình va chạm của bài động lượng với $I$ thay cho $m$ và $\\omega$ thay cho $v$. Sau khi thiết lập, $\\omega_f$ nằm trong HAI số hạng: đặt nó làm nhân tử chung, rồi chia cho cả ngoặc $(I_1 + m r^2)$.',
      given: { I_1: { value: 250, unit: 'kg·m²' }, omega_1i: { value: 1.2, unit: 'rad/s', show: '1.20' }, m: { value: 30, unit: 'kg', show: '30.0' }, r: { value: 1.5, unit: 'm', show: '1.50' } },
      ask: { unit: 'rad/s' },
    },
  ],
};
