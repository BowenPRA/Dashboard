// src/data/Y7_SCI/U02_1/assessment.js
// Six questions, one sitting, eight minutes. 1–2 the properties, 3 the sort-
// by-behaviour trap, 4–5 particle theory, 6 the vacuum. Distractors are
// diagnoses; no item copies a check or a passage.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_solid',
      type: 'mcq',
      title: '1. Which list gives the properties of a solid?',
      options: [
        { val: 'A', text: 'A. Keeps its shape, keeps its volume, cannot be compressed, cannot be poured' },
        { val: 'B', text: 'B. Takes the shape of its container, keeps its volume, can be poured' },
        { val: 'C', text: 'C. Fills its container, can be compressed, volume can change' },
        { val: 'D', text: 'D. Keeps its shape, can be compressed, can be poured' },
      ],
      correct: 'A',
      expEn: 'A solid decides its own **shape** and keeps its **volume**; it cannot be squashed or poured. B describes a liquid and C a gas; D mixes a solid with gas and liquid properties.',
      expVn: 'Chất rắn tự quyết định **hình dạng** và giữ **thể tích**; không nén được, không rót được. B mô tả chất lỏng và C mô tả chất khí; D trộn chất rắn với tính chất của khí và lỏng.',
    },
    {
      id: 'a2_gas',
      type: 'mcq',
      title: '2. Which property does a gas have that neither a solid nor a liquid has?',
      options: [
        { val: 'A', text: 'A. It can be poured' },
        { val: 'B', text: 'B. It takes the shape of its container' },
        { val: 'C', text: 'C. It can be compressed' },
        { val: 'D', text: 'D. It is made of particles' },
      ],
      correct: 'C',
      expEn: 'Only a gas can be **compressed** — the air syringe moved, the water syringe did not. Pouring and taking the container’s shape are shared with liquids, and all three states are made of particles.',
      expVn: 'Chỉ chất khí mới **nén được** — xi-lanh không khí di chuyển, xi-lanh nước thì không. Rót được và mang hình dạng vật chứa là tính chất chung với chất lỏng, và cả ba trạng thái đều tạo nên từ các hạt.',
    },
    {
      id: 'a3_mercury',
      type: 'mcq',
      title: '3. Mercury is a metal that pours and splashes at room temperature. Which state of matter is it?',
      options: [
        { val: 'A', text: 'A. A solid, because all metals are solids' },
        { val: 'B', text: 'B. A liquid, because it takes the shape of its container and can be poured' },
        { val: 'C', text: 'C. A gas, because it moves' },
        { val: 'D', text: 'D. It is not matter' },
      ],
      correct: 'B',
      expEn: 'You sort by **behaviour**, not by what something is made of. Mercury pours and takes the shape of the dish, so it is a **liquid** — a metal and a liquid, with no contradiction.',
      expVn: 'Phân loại theo **cách hành xử**, không theo vật liệu. Thuỷ ngân rót được và mang hình dạng cái đĩa, nên nó là **chất lỏng** — vừa là kim loại vừa là chất lỏng, không hề mâu thuẫn.',
    },
    {
      id: 'a4_liquid_particles',
      type: 'mcq',
      title: '4. Why can a liquid flow but a solid cannot?',
      options: [
        { val: 'A', text: 'A. A liquid has more particles' },
        { val: 'B', text: 'B. The particles in a liquid are far apart and do not touch' },
        { val: 'C', text: 'C. The particles in a liquid are held together weakly, so they can slide past one another' },
        { val: 'D', text: 'D. The particles in a liquid are bigger' },
      ],
      correct: 'C',
      expEn: 'Matter can only flow if its particles can **move past one another**. In a liquid the attractive forces are weak enough to allow that; in a solid they are strong and hold every particle in place. Liquid particles still touch — B describes a gas.',
      expVn: 'Vật chất chỉ chảy được khi các hạt của nó có thể **trượt qua nhau**. Trong chất lỏng lực hút đủ yếu để cho phép điều đó; trong chất rắn lực hút mạnh và giữ mỗi hạt tại chỗ. Các hạt lỏng vẫn chạm nhau — B mô tả chất khí.',
    },
    {
      id: 'a5_gas_particles',
      type: 'mcq',
      title: '5. Which statement about the particles in a gas is correct?',
      options: [
        { val: 'A', text: 'A. They are in a fixed pattern and can only vibrate' },
        { val: 'B', text: 'B. They touch each other but can change places' },
        { val: 'C', text: 'C. There are fewer of them than in a liquid' },
        { val: 'D', text: 'D. They are far apart, do not touch, and spread out to fill the container' },
      ],
      correct: 'D',
      expEn: 'Gas particles are **far apart**, moving fast, with nothing holding them together — so they spread out to fill any container. A describes a solid, B a liquid; a gas does not have fewer particles, the space between them is just bigger.',
      expVn: 'Các hạt khí ở **xa nhau**, chuyển động nhanh, không có gì giữ chúng lại — nên chúng lan ra lấp đầy mọi vật chứa. A mô tả chất rắn, B mô tả chất lỏng; chất khí không có ít hạt hơn, chỉ là khoảng trống giữa chúng lớn hơn.',
    },
    {
      id: 'a6_vacuum',
      type: 'mcq',
      title: '6. What is a vacuum?',
      options: [
        { val: 'A', text: 'A. A space with only a few particles in it' },
        { val: 'B', text: 'B. A space with no particles at all' },
        { val: 'C', text: 'C. A gas that has been compressed' },
        { val: 'D', text: 'D. A machine for cleaning carpets' },
      ],
      correct: 'B',
      expEn: 'A vacuum is a space with **no particles at all** — not thin air, nothing. That is why there is no sound in space: sound needs particles to travel through.',
      expVn: 'Chân không là khoảng không **hoàn toàn không có hạt nào** — không phải khí loãng, mà là không có gì. Vì thế trong vũ trụ không có âm thanh: âm thanh cần các hạt để truyền đi.',
    },
  ],
};
