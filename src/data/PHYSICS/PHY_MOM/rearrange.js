// src/data/PHYSICS/PHY_MOM/rearrange.js
// Isolate It — the Acellus momentum items, worked the way the answer box hides.
//
// Only the FORMULA, the TARGET, the GIVEN numbers and (for collisions) the
// SETUP are authored. The engine (src/utils/formula.js) derives the rest: the
// chips, the hint, the move count, every line of working, the substituted
// line, the conversions, the answer, and the wrong numbers a common slip
// produces — here including a velocity whose minus sign was dropped, and the
// right size pointing the wrong way.
//
// THE IDEA OF THIS FILE. Every collision item starts from the SAME equation —
//   m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f
// — and the student fits it to the story in a Set up stage before isolating
// anything: "at rest" makes a velocity 0 and its term vanishes; "stick
// together" makes both final velocities one v_f. That is exactly how the
// deck derives the inelastic and recoil equations, so she never has to
// memorise them as separate formulas. `npm run validate` proves each setup
// follows from the standard equation, and each rearrangement from the setup.
//
// Order is by SHAPE of the algebra:
//   1      one move (÷) on "the same momentum"
//   2      no moves at all — the whole question is the SIGN
//   3–4    impulse: ÷ one letter, and a bracket where minus a minus is plus
//   5      subtract a term, with negative numbers in it
//   6–7    setup: something at rest; − then ÷; answer 7 comes out NEGATIVE
//   8      setup: stuck together; FACTOR v_f out, ÷ the whole bracket; km/s
//   9      setup: both at once; the target is a MASS, in one term — no factoring
//   10–11  setup: stuck together, unknown BEFORE the collision; signs everywhere
//   12     setup: recoil, both at rest — the minus sign appears on its own
//
// House notes:
//  · `signed: true` — answers may be negative, and a velocity's sign is its
//    direction. Givens are typed with their sign (−41.0, not 41.0).
//  · `objects` names object 1 and 2 for this item, so the pieces table reads
//    "velocity of car 2 before" rather than "velocity of object 2 before".
//  · `setup` conditions: { kind: 'zero', syms } or { kind: 'same', syms, to },
//    each with the `clue` (the question's own words) and `because`.
//  · `Delta_t` is written Δt. `show` keeps a given's trailing zeros (0.0880).

export const rearrange = {
  title: 'Isolate It',
  titleVn: 'Cô Lập Biến',
  intro: 'Collisions all start from ONE equation. Fit it to the story, isolate the unknown, then the units, then the numbers — signs included.',
  introVn: 'Mọi va chạm đều bắt đầu từ MỘT phương trình. Điều chỉnh nó theo đề bài, cô lập ẩn số, rồi đến đơn vị, rồi mới thay số — kèm cả dấu.',
  signed: true,

  // The symbols the formula page uses, with the SI unit each one carries.
  symbols: {
    p: { name: 'total momentum', nameVn: 'tổng động lượng', si: 'kg·m/s' },
    m: { name: 'mass', nameVn: 'khối lượng', si: 'kg' },
    F: { name: 'average force', nameVn: 'lực trung bình', si: 'N' },
    Delta_t: { name: 'contact time — how long the force acts', nameVn: 'thời gian tiếp xúc — lực tác dụng trong bao lâu', si: 's' },
    v_i: { name: 'velocity before', nameVn: 'vận tốc trước', si: 'm/s' },
    v_f: { name: 'velocity after', nameVn: 'vận tốc sau', si: 'm/s' },
    m_1: { name: 'mass of object 1', nameVn: 'khối lượng vật 1', si: 'kg' },
    m_2: { name: 'mass of object 2', nameVn: 'khối lượng vật 2', si: 'kg' },
    v_1: { name: 'velocity of object 1', nameVn: 'vận tốc vật 1', si: 'm/s' },
    v_2: { name: 'velocity of object 2', nameVn: 'vận tốc vật 2', si: 'm/s' },
    v_1i: { name: 'velocity of object 1 before', nameVn: 'vận tốc vật 1 trước va chạm', si: 'm/s' },
    v_2i: { name: 'velocity of object 2 before', nameVn: 'vận tốc vật 2 trước va chạm', si: 'm/s' },
    v_1f: { name: 'velocity of object 1 after', nameVn: 'vận tốc vật 1 sau va chạm', si: 'm/s' },
    v_2f: { name: 'velocity of object 2 after', nameVn: 'vận tốc vật 2 sau va chạm', si: 'm/s' },
    p_1i: { name: 'momentum of object 1 before', nameVn: 'động lượng vật 1 trước va chạm', si: 'kg·m/s' },
    p_2i: { name: 'momentum of object 2 before', nameVn: 'động lượng vật 2 trước va chạm', si: 'kg·m/s' },
    p_1f: { name: 'momentum of object 1 after', nameVn: 'động lượng vật 1 sau va chạm', si: 'kg·m/s' },
    p_2f: { name: 'momentum of object 2 after', nameVn: 'động lượng vật 2 sau va chạm', si: 'kg·m/s' },
  },

  constants: {},

  items: [
    {
      id: 'p1_dog',
      formula: 'm_1 v_1 = m_2 v_2',
      target: 'v_2',
      objects: ['the fastball', 'the dog'],
      objectsVn: ['quả bóng', 'con chó'],
      prompt: 'A baseball has a mass of 0.145 kg. A pitcher\'s fastball travels at 42.0 m/s. Suppose a dog has a mass of 12.0 kg. What speed must the dog be walking in order to have the same momentum as the fastball?',
      promptVn: 'Một quả bóng chày có khối lượng 0.145 kg. Cú ném nhanh của cầu thủ bay với tốc độ 42.0 m/s. Giả sử một con chó có khối lượng 12.0 kg. Con chó phải đi với tốc độ bao nhiêu để có cùng động lượng với quả bóng?',
      hint: '"The same momentum" means $p_1 = p_2$, so $m_1 v_1 = m_2 v_2$. The dog\'s $v_2$ is multiplied by its mass — undo that.',
      hintVn: '"Cùng động lượng" nghĩa là $p_1 = p_2$, nên $m_1 v_1 = m_2 v_2$. $v_2$ của con chó đang nhân với khối lượng của nó — hãy hoàn tác điều đó.',
      given: { m_1: { value: 0.145, unit: 'kg' }, v_1: { value: 42, unit: 'm/s', show: '42.0' }, m_2: { value: 12, unit: 'kg', show: '12.0' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 'p2_total',
      formula: 'p = m_1 v_1 + m_2 v_2',
      target: 'p',
      objects: ['the 0.907 kg ball', 'the 2.27 kg ball'],
      objectsVn: ['quả bóng 0.907 kg', 'quả bóng 2.27 kg'],
      prompt: 'A 0.907 kg ball moving at 23.4 m/s to the right strikes a 2.27 kg ball moving 9.80 m/s to the left. What is the total momentum of the two balls?',
      promptVn: 'Một quả bóng 0.907 kg chuyển động với tốc độ 23.4 m/s sang phải va vào một quả bóng 2.27 kg đang chuyển động 9.80 m/s sang trái. Tổng động lượng của hai quả bóng là bao nhiêu?',
      hint: 'Right is $+$, left is $-$, so the second ball\'s velocity is $v_2 = -9.80$ m/s. $p$ is already the subject: the whole question is the sign.',
      hintVn: 'Phải là $+$, trái là $-$, nên vận tốc quả bóng thứ hai là $v_2 = -9.80$ m/s. $p$ đã là chủ thể: cả câu hỏi chỉ nằm ở dấu.',
      given: { m_1: { value: 0.907, unit: 'kg' }, v_1: { value: 23.4, unit: 'm/s' }, m_2: { value: 2.27, unit: 'kg' }, v_2: { value: -9.8, unit: 'm/s', show: '-9.80' } },
      ask: { unit: 'kg·m/s' },
    },
    {
      id: 'j1_bat',
      formula: 'F Delta_t = m (v_f - v_i)',
      target: 'F',
      prompt: 'A bat hits a 0.150 kg baseball for 0.0880 s. The ball\'s velocity changes from −41.0 m/s to +37.0 m/s. How much force was applied to the ball? Remember to indicate the direction (+ or −).',
      promptVn: 'Một cây gậy đánh vào quả bóng chày 0.150 kg trong 0.0880 s. Vận tốc của quả bóng thay đổi từ −41.0 m/s thành +37.0 m/s. Lực tác dụng lên quả bóng là bao nhiêu? Nhớ ghi hướng (+ hoặc −).',
      hint: '$F$ is multiplied by $\\Delta t$ — divide it away. Then the bracket: $v_f - v_i = 37.0 - (-41.0)$. Minus a minus is a plus.',
      hintVn: '$F$ đang nhân với $\\Delta t$ — chia nó đi. Rồi đến ngoặc: $v_f - v_i = 37.0 - (-41.0)$. Trừ một số âm là cộng.',
      given: { m: { value: 0.15, unit: 'kg', show: '0.150' }, Delta_t: { value: 0.088, unit: 's', show: '0.0880' }, v_i: { value: -41, unit: 'm/s', show: '-41.0' }, v_f: { value: 37, unit: 'm/s', show: '37.0' } },
      ask: { unit: 'N' },
    },
    {
      id: 'j2_floor_time',
      formula: 'F Delta_t = m (v_f - v_i)',
      target: 'Delta_t',
      prompt: 'When a 0.622 kg basketball hits the floor, its velocity changes from −4.23 m/s to +3.85 m/s. If the average force was 72.9 N, how much time was it in contact with the floor?',
      promptVn: 'Khi một quả bóng rổ 0.622 kg chạm sàn, vận tốc của nó thay đổi từ −4.23 m/s thành +3.85 m/s. Nếu lực trung bình là 72.9 N, quả bóng tiếp xúc với sàn trong bao lâu?',
      hint: 'Same formula, new target. $\\Delta t$ is multiplied by $F$ — divide both sides by $F$.',
      hintVn: 'Cùng công thức, ẩn số mới. $\\Delta t$ đang nhân với $F$ — chia cả hai vế cho $F$.',
      given: { m: { value: 0.622, unit: 'kg' }, v_i: { value: -4.23, unit: 'm/s' }, v_f: { value: 3.85, unit: 'm/s' }, F: { value: 72.9, unit: 'N' } },
      ask: { unit: 's' },
    },
    {
      id: 'c1_blocks',
      formula: 'p_1i + p_2i = p_1f + p_2f',
      target: 'p_2f',
      objects: ['Block A', 'Block B'],
      objectsVn: ['khối A', 'khối B'],
      prompt: 'Before colliding, the momentum of Block A is +15.0 kg·m/s, and Block B is −35.0 kg·m/s. After, Block A has a momentum −12.0 kg·m/s. What is the momentum of Block B after the collision?',
      promptVn: 'Trước va chạm, động lượng của khối A là +15.0 kg·m/s, và của khối B là −35.0 kg·m/s. Sau đó, khối A có động lượng −12.0 kg·m/s. Động lượng của khối B sau va chạm là bao nhiêu?',
      hint: 'Total before = total after. $p_{1f}$ is added to the target, so subtract it from both sides. Then put every negative number in brackets.',
      hintVn: 'Tổng trước = tổng sau. $p_{1f}$ đang được cộng vào ẩn số, nên trừ nó ở cả hai vế. Rồi đặt mọi số âm trong ngoặc.',
      given: { p_1i: { value: 15, unit: 'kg·m/s', show: '15.0' }, p_2i: { value: -35, unit: 'kg·m/s', show: '-35.0' }, p_1f: { value: -12, unit: 'kg·m/s', show: '-12.0' } },
      ask: { unit: 'kg·m/s' },
    },
    {
      id: 'k1_car2',
      formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',
      target: 'v_2f',
      objects: ['car 1', 'car 2'],
      objectsVn: ['xe 1', 'xe 2'],
      setup: [
        {
          kind: 'zero', syms: ['v_2i'],
          clue: 'Car 2 (208 kg) is at rest.',
          clueVn: 'Xe 2 (208 kg) đang đứng yên.',
          because: 'At rest means not moving: car 2\'s velocity BEFORE is 0, so its momentum before is 0 and that term disappears.',
          becauseVn: 'Đứng yên nghĩa là không chuyển động: vận tốc TRƯỚC va chạm của xe 2 bằng 0, nên động lượng trước của nó bằng 0 và số hạng đó biến mất.',
        },
      ],
      prompt: 'Car 1 (331 kg) is moving east at 3.87 m/s. Car 2 (208 kg) is at rest. Car 1 collides with car 2. Afterwards, car 1 moves east at 0.888 m/s. What is the final velocity of car 2 after the collision? Remember to indicate if the velocity is east (+) or west (−).',
      promptVn: 'Xe 1 (331 kg) đang chạy về hướng đông với tốc độ 3.87 m/s. Xe 2 (208 kg) đang đứng yên. Xe 1 va chạm với xe 2. Sau đó, xe 1 chạy về hướng đông với tốc độ 0.888 m/s. Vận tốc sau va chạm của xe 2 là bao nhiêu? Nhớ ghi rõ hướng đông (+) hay tây (−).',
      hint: 'Once it is set up, $m_1 v_{1f}$ is added to the target\'s term: subtract it first, then divide by $m_2$.',
      hintVn: 'Sau khi thiết lập, $m_1 v_{1f}$ đang được cộng vào số hạng chứa ẩn: trừ nó trước, rồi chia cho $m_2$.',
      given: { m_1: { value: 331, unit: 'kg' }, v_1i: { value: 3.87, unit: 'm/s' }, m_2: { value: 208, unit: 'kg' }, v_1f: { value: 0.888, unit: 'm/s' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 'k2_car_truck',
      formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',
      target: 'v_1f',
      objects: ['the car', 'the truck'],
      objectsVn: ['xe con', 'xe tải'],
      setup: [
        {
          kind: 'zero', syms: ['v_2i'],
          clue: 'A truck (5380 kg) is sitting at rest.',
          clueVn: 'Một xe tải (5380 kg) đang đứng yên.',
          because: 'Sitting at rest: the truck\'s velocity BEFORE the crash is 0, so it brings no momentum in.',
          becauseVn: 'Đứng yên: vận tốc của xe tải TRƯỚC va chạm bằng 0, nên nó không mang động lượng nào vào.',
        },
      ],
      prompt: 'A car (1250 kg) is driving at 7.39 m/s. A truck (5380 kg) is sitting at rest. The car collides with the stationary truck. Afterwards, the truck begins to move forward at 2.30 m/s. What is the final velocity of the car?',
      promptVn: 'Một xe con (1250 kg) đang chạy với tốc độ 7.39 m/s. Một xe tải (5380 kg) đang đứng yên. Xe con va chạm với xe tải đứng yên. Sau đó, xe tải bắt đầu chạy về phía trước với tốc độ 2.30 m/s. Vận tốc sau va chạm của xe con là bao nhiêu?',
      hint: 'Subtract the truck\'s momentum after, then divide by the car\'s mass. Look at the sign of your answer: what did the car do?',
      hintVn: 'Trừ động lượng sau của xe tải, rồi chia cho khối lượng xe con. Nhìn dấu của đáp án: xe con đã làm gì?',
      given: { m_1: { value: 1250, unit: 'kg' }, v_1i: { value: 7.39, unit: 'm/s' }, m_2: { value: 5380, unit: 'kg' }, v_2f: { value: 2.3, unit: 'm/s', show: '2.30' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 's1_meteors',
      formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',
      target: 'v_f',
      objects: ['the first meteor', 'the second meteor'],
      objectsVn: ['thiên thạch thứ nhất', 'thiên thạch thứ hai'],
      setup: [
        {
          kind: 'same', syms: ['v_1f', 'v_2f'], to: 'v_f',
          clue: 'The two meteors stick together.',
          clueVn: 'Hai thiên thạch dính vào nhau.',
          because: 'Stuck together, they move as ONE object: after the collision both have the same velocity, $v_f$.',
          becauseVn: 'Dính vào nhau, chúng chuyển động như MỘT vật: sau va chạm cả hai có cùng vận tốc, $v_f$.',
        },
      ],
      prompt: 'An incoming meteor with mass 65.4 kg and velocity +12.46 km/s overtakes another meteor with mass 32.1 kg and velocity +8.56 km/s. The two meteors stick together. What is their velocity, in km/s?',
      promptVn: 'Một thiên thạch khối lượng 65.4 kg với vận tốc +12.46 km/s đuổi kịp một thiên thạch khác khối lượng 32.1 kg với vận tốc +8.56 km/s. Hai thiên thạch dính vào nhau. Vận tốc của chúng là bao nhiêu km/s?',
      hint: '$v_f$ is now in TWO terms. Factor it out so it appears once, then divide both sides by the whole bracket $(m_1 + m_2)$. The speeds are in km/s: convert in, and back out.',
      hintVn: '$v_f$ giờ nằm trong HAI số hạng. Đặt nó ra làm nhân tử chung để nó chỉ xuất hiện một lần, rồi chia cả hai vế cho cả ngoặc $(m_1 + m_2)$. Tốc độ tính bằng km/s: đổi khi vào, và đổi lại khi ra.',
      given: { m_1: { value: 65.4, unit: 'kg' }, v_1i: { value: 12.46, unit: 'km/s' }, m_2: { value: 32.1, unit: 'kg' }, v_2i: { value: 8.56, unit: 'km/s' } },
      ask: { unit: 'km/s' },
    },
    {
      id: 's2_sticky_mass',
      formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',
      target: 'm_2',
      objects: ['the bouncy ball', 'the sticky ball'],
      objectsVn: ['quả bóng nảy', 'quả bóng dính'],
      setup: [
        {
          kind: 'zero', syms: ['v_2i'],
          clue: '…a stationary sticky ball.',
          clueVn: '…một quả bóng dính đang đứng yên.',
          because: 'Stationary means at rest: the sticky ball\'s velocity before is 0.',
          becauseVn: 'Đứng yên nghĩa là không chuyển động: vận tốc trước của quả bóng dính bằng 0.',
        },
        {
          kind: 'same', syms: ['v_1f', 'v_2f'], to: 'v_f',
          clue: 'After, they move +0.151 m/s.',
          clueVn: 'Sau đó, chúng chuyển động +0.151 m/s.',
          because: '"They move" at ONE speed: the balls have stuck, so both final velocities are the same $v_f$.',
          becauseVn: '"Chúng chuyển động" với MỘT tốc độ: hai quả bóng đã dính vào nhau, nên cả hai vận tốc sau đều là $v_f$.',
        },
      ],
      prompt: 'A 0.982 kg bouncy ball moving +0.246 m/s makes a head-on inelastic collision with a stationary sticky ball. After, they move +0.151 m/s. What is the mass of the sticky ball?',
      promptVn: 'Một quả bóng nảy 0.982 kg chuyển động +0.246 m/s va chạm mềm trực diện với một quả bóng dính đang đứng yên. Sau đó, chúng chuyển động +0.151 m/s. Khối lượng của quả bóng dính là bao nhiêu?',
      hint: 'This time the target is a MASS, and $m_2$ is in only one term — no need to factor. Subtract $m_1 v_f$, then divide by $v_f$.',
      hintVn: 'Lần này ẩn số là một KHỐI LƯỢNG, và $m_2$ chỉ nằm trong một số hạng — không cần đặt nhân tử chung. Trừ $m_1 v_f$, rồi chia cho $v_f$.',
      given: { m_1: { value: 0.982, unit: 'kg' }, v_1i: { value: 0.246, unit: 'm/s' }, v_f: { value: 0.151, unit: 'm/s' } },
      ask: { unit: 'kg' },
    },
    {
      id: 's3_paul',
      formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',
      target: 'v_2i',
      objects: ['Anna', 'Paul'],
      objectsVn: ['Anna', 'Paul'],
      setup: [
        {
          kind: 'same', syms: ['v_1f', 'v_2f'], to: 'v_f',
          clue: 'Anna leaps into the hands of Paul. Afterward, they move at −2.33 m/s.',
          clueVn: 'Anna nhảy vào vòng tay của Paul. Sau đó, họ chuyển động với vận tốc −2.33 m/s.',
          because: 'Holding on to each other, they move as one: one shared velocity after, $v_f$.',
          becauseVn: 'Ôm lấy nhau, họ chuyển động như một: một vận tốc chung sau va chạm, $v_f$.',
        },
      ],
      prompt: 'A 52.3 kg ice skater, Anna, is skating −12.0 m/s and leaps into the hands of a 102 kg skater, Paul. Afterward, they move at −2.33 m/s. What was Paul\'s velocity before the collision? Remember: right is +, left is −.',
      promptVn: 'Một vận động viên trượt băng 52.3 kg, Anna, đang trượt với vận tốc −12.0 m/s và nhảy vào vòng tay của Paul, nặng 102 kg. Sau đó, họ chuyển động với vận tốc −2.33 m/s. Vận tốc của Paul trước va chạm là bao nhiêu? Nhớ: phải là +, trái là −.',
      hint: 'The target is Paul\'s velocity BEFORE, on the left side. Subtract Anna\'s momentum before, $m_1 v_{1i}$, from both sides, then divide by $m_2$. Three numbers are negative — bracket every one.',
      hintVn: 'Ẩn số là vận tốc TRƯỚC của Paul, ở vế trái. Trừ động lượng trước của Anna, $m_1 v_{1i}$, ở cả hai vế, rồi chia cho $m_2$. Có ba số âm — đặt từng số trong ngoặc.',
      given: { m_1: { value: 52.3, unit: 'kg' }, v_1i: { value: -12, unit: 'm/s', show: '-12.0' }, m_2: { value: 102, unit: 'kg' }, v_f: { value: -2.33, unit: 'm/s' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 's4_snowball',
      formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',
      target: 'v_1i',
      objects: ['the snowball', 'the box'],
      objectsVn: ['quả cầu tuyết', 'cái hộp'],
      setup: [
        {
          kind: 'same', syms: ['v_1f', 'v_2f'], to: 'v_f',
          clue: 'An inelastic collision… Afterward, they move west at 1.92 m/s.',
          clueVn: 'Một va chạm mềm… Sau đó, chúng chuyển động về hướng tây với tốc độ 1.92 m/s.',
          because: 'The snowball sticks to the box and they move off together: one shared velocity after, $v_f$.',
          becauseVn: 'Quả cầu tuyết dính vào hộp và chúng cùng chuyển động: một vận tốc chung sau va chạm, $v_f$.',
        },
      ],
      prompt: 'A 0.199 kg snowball moving west makes an inelastic collision with a 2.89 kg box moving 0.523 m/s west. Afterward, they move west at 1.92 m/s. What was the initial velocity of the snowball? Remember: east is +, west is −.',
      promptVn: 'Một quả cầu tuyết 0.199 kg đang bay về hướng tây va chạm mềm với một cái hộp 2.89 kg đang chuyển động 0.523 m/s về hướng tây. Sau đó, chúng chuyển động về hướng tây với tốc độ 1.92 m/s. Vận tốc ban đầu của quả cầu tuyết là bao nhiêu? Nhớ: đông là +, tây là −.',
      hint: 'West is negative: $v_{2i} = -0.523$ m/s and $v_f = -1.92$ m/s. Subtract the box\'s momentum before, $m_2 v_{2i}$, then divide by $m_1$.',
      hintVn: 'Tây là âm: $v_{2i} = -0.523$ m/s và $v_f = -1.92$ m/s. Trừ động lượng trước của hộp, $m_2 v_{2i}$, rồi chia cho $m_1$.',
      given: { m_1: { value: 0.199, unit: 'kg' }, m_2: { value: 2.89, unit: 'kg' }, v_2i: { value: -0.523, unit: 'm/s' }, v_f: { value: -1.92, unit: 'm/s' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 'r1_rifle',
      formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',
      target: 'v_2f',
      objects: ['the bullet', 'the rifle'],
      objectsVn: ['viên đạn', 'khẩu súng'],
      setup: [
        {
          kind: 'zero', syms: ['v_1i', 'v_2i'],
          clue: 'Before it fires, the rifle and the bullet in it are at rest.',
          clueVn: 'Trước khi bắn, khẩu súng và viên đạn bên trong đều đứng yên.',
          because: 'Nothing is moving before, so BOTH velocities before are 0. The total momentum before is 0 — and so the total after must be 0 too.',
          becauseVn: 'Trước đó không có gì chuyển động, nên CẢ HAI vận tốc trước đều bằng 0. Tổng động lượng trước bằng 0 — nên tổng động lượng sau cũng phải bằng 0.',
        },
      ],
      prompt: 'A 4.50 kg rifle fires a 0.0100 kg bullet at +385 m/s. What is the recoil velocity of the rifle?',
      promptVn: 'Một khẩu súng trường 4.50 kg bắn một viên đạn 0.0100 kg với vận tốc +385 m/s. Vận tốc giật lùi của khẩu súng là bao nhiêu?',
      hint: 'Once it is set up, the left side is 0. Subtract $m_1 v_{1f}$ from both sides — watch a minus sign appear — then divide by $m_2$.',
      hintVn: 'Sau khi thiết lập, vế trái bằng 0. Trừ $m_1 v_{1f}$ ở cả hai vế — để ý một dấu trừ xuất hiện — rồi chia cho $m_2$.',
      given: { m_1: { value: 0.01, unit: 'kg', show: '0.0100' }, v_1f: { value: 385, unit: 'm/s' }, m_2: { value: 4.5, unit: 'kg', show: '4.50' } },
      ask: { unit: 'm/s' },
    },
  ],
};
