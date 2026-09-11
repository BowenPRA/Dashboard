// src/data/PHYSICS/PHY_CIRC/rearrange.js
// Isolate It — the ten Acellus items, worked the way the answer box hides.
//
// Only the FORMULA, the TARGET and the GIVEN numbers are authored. The engine
// (src/utils/formula.js) derives everything else: the chips the student can
// multiply or divide by, the hint, the target move count, every line of
// working, the substituted line, the SI conversions, the answer, and the wrong
// numbers a common slip produces. `npm run validate` proves each item can be
// isolated by the taught strategy AND that the rearrangement is numerically
// equivalent to the formula it came from.
//
// Order is by SHAPE of the algebra, not by size of the numbers:
//   1–2    the one formula, two moves and then three (the square root arrives)
//   3      a mass that CANCELS — dividing both sides by m makes it vanish
//   4      a sum on one side: (T + mg) has to travel as one bracket
//   5      gravity: multiply a square up, divide a constant out
//   6      one move only — the square root — and a 10^n answer
//   7–8    a root on the WRONG side: square first, then move things
//   8      the unit trap Acellus flags in red: km/s in, km out
//   9      solve for the r that is squared: sqrt at the end
//   10     √ with 4π² inside it, km in and hours out
//
// House notes:
//  · symbols are single letters, or a letter and a subscript (`F_c`);
//    `pi` and `sqrt(...)` are words; `^2` is a power; `/` divides by the ONE
//    thing after it — write `G M / (r^2)` or `G M / r^2` and `(G M)` when the
//    whole product divides.
//  · every symbol in a formula must be the target, in `given`, or in
//    `constants` below. Units must be in the engine's UNITS table.
//  · `show` overrides how a given prints (the screenshot wrote 111,000 m).
//  · the period is P, not T, in item 10 so it never collides with tension.

export const rearrange = {
  title: 'Isolate It',
  titleVn: 'Cô Lập Biến',
  intro: 'Rearrange the formula for the unknown FIRST. Then the units. Then the numbers.',
  introVn: 'Biến đổi công thức để tìm ẩn số TRƯỚC. Rồi đến đơn vị. Rồi mới thay số.',

  // The symbols the formula sheet uses, with the SI unit each one carries.
  symbols: {
    F: { name: 'centripetal force', nameVn: 'lực hướng tâm', si: 'N' },
    m: { name: 'mass of the moving object', nameVn: 'khối lượng vật chuyển động', si: 'kg' },
    v: { name: 'speed', nameVn: 'tốc độ', si: 'm/s' },
    r: { name: 'radius of the circle', nameVn: 'bán kính đường tròn', si: 'm' },
    g: { name: 'gravitational field strength', nameVn: 'cường độ trường hấp dẫn', si: 'm/s²' },
    G: { name: 'gravitational constant', nameVn: 'hằng số hấp dẫn', si: 'N m²/kg²' },
    M: { name: 'mass of the planet or star', nameVn: 'khối lượng hành tinh hoặc ngôi sao', si: 'kg' },
    T: { name: 'tension in the rope', nameVn: 'lực căng dây', si: 'N' },
    P: { name: 'period — time for one orbit', nameVn: 'chu kỳ — thời gian một vòng quỹ đạo', si: 's' },
  },

  // Constants are filled in for the student, and printed in the pieces table
  // with a "constant" badge so she learns which letters are never given.
  constants: {
    g: { value: 9.8, unit: 'm/s²' },
    G: { value: 6.67e-11, unit: 'N m²/kg²', show: '6.67 \\times 10^{-11}' },
  },

  items: [
    {
      id: 'c1_mass',
      formula: 'F = m v^2 / r',
      target: 'm',
      prompt: 'A rope breaks when the tension reaches 938 N. What is the largest mass it can swing at 6.77 m/s in a circle of radius 1.45 m?',
      promptVn: 'Một sợi dây đứt khi lực căng đạt 938 N. Khối lượng lớn nhất mà dây có thể quay với tốc độ 6.77 m/s trên đường tròn bán kính 1.45 m là bao nhiêu?',
      hint: 'The rope is doing the centre-pulling job, so the tension IS the centripetal force: $F = 938$ N.',
      hintVn: 'Sợi dây đang làm nhiệm vụ kéo về tâm, nên lực căng CHÍNH LÀ lực hướng tâm: $F = 938$ N.',
      given: { F: { value: 938, unit: 'N' }, v: { value: 6.77, unit: 'm/s' }, r: { value: 1.45, unit: 'm' } },
      ask: { unit: 'kg' },
    },
    {
      id: 'c2_speed',
      formula: 'F = m v^2 / r',
      target: 'v',
      prompt: 'A 65.0 kg person is on a roller coaster car moving along a vertical circle of radius 28.0 m. At a certain point, the centripetal force on the car is 2,350 N. What is the velocity of the car at this point?',
      promptVn: 'Một người nặng 65.0 kg ngồi trên toa tàu lượn chuyển động theo đường tròn thẳng đứng bán kính 28.0 m. Tại một điểm, lực hướng tâm tác dụng lên toa là 2,350 N. Vận tốc của toa tại điểm đó là bao nhiêu?',
      hint: 'The $v$ is squared. Get $v^2$ alone first, and take the square root as the LAST move.',
      hintVn: '$v$ đang bị bình phương. Hãy để $v^2$ đứng một mình trước, và lấy căn bậc hai ở bước CUỐI.',
      given: { F: { value: 2350, unit: 'N' }, m: { value: 65, unit: 'kg' }, r: { value: 28, unit: 'm' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 'c3_loop',
      formula: 'm g = m v^2 / r',
      target: 'v',
      prompt: 'A rollercoaster loop has a radius of 22.7 m. What is the minimum speed the coaster must have at the top of the loop to not fall off the track?',
      promptVn: 'Vòng lượn của tàu lượn có bán kính 22.7 m. Tốc độ nhỏ nhất mà tàu phải có ở đỉnh vòng lượn để không rơi khỏi đường ray là bao nhiêu?',
      hint: 'At the slowest speed the track pushes with nothing, so gravity alone supplies the centripetal force: $m g = \\dfrac{m v^2}{r}$. Watch what happens to $m$ when you divide by it.',
      hintVn: 'Ở tốc độ chậm nhất, đường ray không đẩy gì cả, nên chỉ trọng lực cung cấp lực hướng tâm: $m g = \\dfrac{m v^2}{r}$. Hãy xem điều gì xảy ra với $m$ khi em chia cho nó.',
      // No mass is given, and none is needed: it cancels, and the pieces table
      // only lists what the rearranged formula still uses.
      given: { r: { value: 22.7, unit: 'm' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 'c4_bucket_top',
      formula: 'T + m g = m v^2 / r',
      target: 'v',
      prompt: 'A 2.25 kg bucket of water attached to a 0.809 m rope is swung in a circle. At the top, the tension in the rope is 15.5 N. What is the speed of the bucket at that point?',
      promptVn: 'Một xô nước 2.25 kg buộc vào sợi dây dài 0.809 m được quay theo đường tròn. Ở đỉnh, lực căng dây là 15.5 N. Tốc độ của xô tại điểm đó là bao nhiêu?',
      hint: 'At the top, the rope AND the weight both pull toward the centre, so they add. Keep $(T + m g)$ together as one bracket while you move things.',
      hintVn: 'Ở đỉnh, cả dây VÀ trọng lực đều kéo về tâm, nên chúng cộng lại. Giữ $(T + m g)$ chung trong một dấu ngoặc khi em di chuyển các đại lượng.',
      given: { T: { value: 15.5, unit: 'N' }, m: { value: 2.25, unit: 'kg' }, r: { value: 0.809, unit: 'm' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 'g1_asteroid',
      formula: 'g = G M / r^2',
      target: 'M',
      prompt: 'An asteroid has a radius of 111,000 m, and a surface gravity of 0.0338 m/s². What is the mass of the asteroid?',
      promptVn: 'Một tiểu hành tinh có bán kính 111,000 m và gia tốc trọng trường bề mặt 0.0338 m/s². Khối lượng của tiểu hành tinh là bao nhiêu?',
      hint: 'The $r^2$ is dividing — multiply it up as ONE chip. Then the constant $G$ is multiplying $M$, so divide it out. The answer is a $10^{n}$ number: type it as 6.24e18 or 6.24×10^18.',
      hintVn: '$r^2$ đang ở mẫu — nhân nó lên như MỘT thẻ. Rồi hằng số $G$ đang nhân với $M$, nên chia nó ra. Đáp án là một số dạng $10^{n}$: gõ 6.24e18 hoặc 6.24×10^18.',
      given: { r: { value: 111000, unit: 'm', show: '111{,}000' }, g: { value: 0.0338, unit: 'm/s²' } },
      ask: { unit: 'kg' },
    },
    {
      id: 'g2_mars_orbit',
      formula: 'v^2 = g r',
      target: 'v',
      prompt: 'A satellite orbits Mars 3.59 × 10⁶ m from its center (the center of gravity). If the gravitational acceleration at this radius is 3.71 m/s², what is the satellite\'s velocity?',
      promptVn: 'Một vệ tinh quay quanh Sao Hỏa cách tâm 3.59 × 10⁶ m. Nếu gia tốc trọng trường tại bán kính đó là 3.71 m/s², vận tốc của vệ tinh là bao nhiêu?',
      hint: 'Gravity is the centripetal force, so $g = \\dfrac{v^2}{r}$ — written here as $v^2 = g r$. One move. This $g$ is Mars\'s, not 9.8.',
      hintVn: 'Trọng lực là lực hướng tâm, nên $g = \\dfrac{v^2}{r}$ — viết ở đây là $v^2 = g r$. Chỉ một bước. $g$ này là của Sao Hỏa, không phải 9.8.',
      given: { g: { value: 3.71, unit: 'm/s²' }, r: { value: 3.59e6, unit: 'm' } },
      ask: { unit: 'm/s' },
    },
    {
      id: 'g3_enterprise',
      formula: 'v = sqrt(G M / r)',
      target: 'M',
      prompt: 'The Enterprise goes into orbit around a mysterious planet. The ship moves at 4,220 m/s in a circle of radius 4.91 × 10⁷ m. What is the mass of the planet?',
      promptVn: 'Tàu Enterprise đi vào quỹ đạo quanh một hành tinh bí ẩn. Tàu chuyển động với tốc độ 4,220 m/s trên đường tròn bán kính 4.91 × 10⁷ m. Khối lượng của hành tinh là bao nhiêu?',
      hint: '$M$ is under a square root. Square both sides FIRST and the root disappears; then it is an ordinary rearrangement.',
      hintVn: '$M$ nằm dưới căn bậc hai. Bình phương cả hai vế TRƯỚC thì căn biến mất; sau đó chỉ là biến đổi bình thường.',
      given: { v: { value: 4220, unit: 'm/s' }, r: { value: 4.91e7, unit: 'm' } },
      ask: { unit: 'kg' },
    },
    {
      id: 'g4_super_earth',
      formula: 'v = sqrt(G M / r)',
      target: 'r',
      prompt: 'A "super Earth" exoplanet orbits a far-away star of mass 2.34 × 10²⁹ kg. The velocity of the orbit is 6.78 km/s. What is the radius of the orbit, in km? Hint: pay attention to your units!',
      promptVn: 'Một ngoại hành tinh "siêu Trái Đất" quay quanh một ngôi sao xa có khối lượng 2.34 × 10²⁹ kg. Vận tốc quỹ đạo là 6.78 km/s. Bán kính quỹ đạo là bao nhiêu km? Gợi ý: chú ý đơn vị!',
      hint: 'Square first. Then $r$ is dividing — multiply it up. The speed is in km/s: the formula needs m/s, and the answer box wants km back.',
      hintVn: 'Bình phương trước. Rồi $r$ đang ở mẫu — nhân nó lên. Tốc độ tính bằng km/s: công thức cần m/s, và ô đáp án lại muốn km.',
      given: { M: { value: 2.34e29, unit: 'kg' }, v: { value: 6.78, unit: 'km/s' } },
      ask: { unit: 'km' },
    },
    {
      id: 'g5_mars_radius',
      formula: 'g = G M / r^2',
      target: 'r',
      prompt: 'Mars has a mass of 6.42 × 10²³ kg. How far from its centre is the gravitational field strength 3.71 m/s²?',
      promptVn: 'Sao Hỏa có khối lượng 6.42 × 10²³ kg. Cách tâm bao xa thì cường độ trường hấp dẫn bằng 3.71 m/s²?',
      hint: 'The target is squared AND dividing. Multiply $r^2$ up, divide $g$ away, and only then take the square root.',
      hintVn: 'Ẩn số vừa bị bình phương VỪA nằm ở mẫu. Nhân $r^2$ lên, chia $g$ ra, rồi mới lấy căn bậc hai.',
      given: { M: { value: 6.42e23, unit: 'kg' }, g: { value: 3.71, unit: 'm/s²' } },
      ask: { unit: 'm' },
    },
    {
      id: 'g6_period',
      formula: 'P^2 = 4 pi^2 r^3 / (G M)',
      target: 'P',
      prompt: 'A "super Earth" exoplanet orbits a far-away star of mass 3.45 × 10²⁸ kg. The radius of the orbit is 6.54 × 10⁵ km. What is the period of the orbit, in hours? Hint: pay attention to your units!',
      promptVn: 'Một ngoại hành tinh "siêu Trái Đất" quay quanh một ngôi sao xa có khối lượng 3.45 × 10²⁸ kg. Bán kính quỹ đạo là 6.54 × 10⁵ km. Chu kỳ quỹ đạo là bao nhiêu giờ? Gợi ý: chú ý đơn vị!',
      hint: 'One move: the square root — and $\\sqrt{4\\pi^2}$ is $2\\pi$. The radius is in km and the answer is wanted in hours: two conversions, one in and one out.',
      hintVn: 'Một bước: căn bậc hai — và $\\sqrt{4\\pi^2}$ là $2\\pi$. Bán kính tính bằng km và đáp án yêu cầu theo giờ: hai lần đổi đơn vị, một đầu vào và một đầu ra.',
      given: { M: { value: 3.45e28, unit: 'kg' }, r: { value: 6.54e5, unit: 'km' } },
      ask: { unit: 'hours' },
    },
  ],
};
