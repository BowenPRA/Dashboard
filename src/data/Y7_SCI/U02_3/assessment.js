// src/data/Y7_SCI/U02_3/assessment.js
// Eight questions, one sitting, ten minutes. 1 key words, 2 expansion, 3
// melting, 4 evaporation, 5 boiling, 6 condensing, 7 compressing, 8 a transfer
// question the deck did not answer directly (the heated ball and ring). Every
// distractor is a misconception the deck names: particles grow, melt, stop or
// disappear; cold energy; bubbles of air. No item copies a deck check or a
// workbook question.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_transferred',
      type: 'mcq',
      title: '1. Which word means “moved from one place to another”?',
      options: [
        { val: 'A', text: 'A. Expanded' },
        { val: 'B', text: 'B. Transferred' },
        { val: 'C', text: 'C. Vibrated' },
        { val: 'D', text: 'D. Compressed' },
      ],
      correct: 'B',
      expEn: '**Transferred** means moved from one place to another: heat energy is transferred to or away from the particles. Expanded (A) means got bigger; vibrated (C) means moved backwards and forwards on the spot; compressed (D) means squashed into a smaller space.',
      expVn: '**Transferred** (được truyền) nghĩa là được di chuyển từ nơi này sang nơi khác: nhiệt năng được truyền đến hay ra khỏi các hạt. Expanded (A) nghĩa là to ra; vibrated (C) nghĩa là chuyển động qua lại tại chỗ; compressed (D) nghĩa là bị ép vào một chỗ nhỏ hơn.',
    },
    {
      id: 'a2_jar_lid',
      type: 'mcq',
      title: '2. A metal lid is stuck on a glass jar. After it is held under hot water, it comes off easily. Why?',
      options: [
        { val: 'A', text: 'A. Heat energy is transferred to the lid; its particles vibrate more and take up more space, so the lid expands' },
        { val: 'B', text: 'B. The hot water makes the lid’s particles bigger' },
        { val: 'C', text: 'C. The hot water melts the glass a little' },
        { val: 'D', text: 'D. The heat makes the attractive forces in the lid stronger' },
      ],
      correct: 'A',
      expEn: 'The metal lid **expands**: its particles vibrate more and take up more space, so the lid gets a little wider and loosens. Particles never get bigger (B); hot tap water is nowhere near the melting point of glass (C); and heating does not make the forces stronger — it helps the particles move against them (D).',
      expVn: 'Nắp kim loại **giãn nở**: các hạt của nó rung động nhiều hơn và chiếm nhiều chỗ hơn, nên nắp rộng ra một chút và lỏng ra. Các hạt không bao giờ to ra (B); nước nóng từ vòi còn rất xa nhiệt độ nóng chảy của thủy tinh (C); và đun nóng không làm lực hút mạnh hơn — nó giúp các hạt chuyển động chống lại lực hút (D).',
    },
    {
      id: 'a3_butter',
      type: 'mcq',
      title: '3. Butter melts in a hot pan. Which explanation is correct?',
      options: [
        { val: 'A', text: 'A. Each butter particle melts into a liquid particle' },
        { val: 'B', text: 'B. Cold energy leaves the butter, so it becomes a liquid' },
        { val: 'C', text: 'C. Its particles vibrate more and more until the attractive forces can no longer hold them in a fixed pattern' },
        { val: 'D', text: 'D. The particles get bigger and push each other apart' },
      ],
      correct: 'C',
      expEn: 'Heat energy is transferred to the particles; they vibrate **more and more** until the **attractive forces** can no longer hold them in a fixed pattern, and they slide past each other. A single particle cannot melt (A); there is no cold energy (B); and particles never get bigger (D).',
      expVn: 'Nhiệt năng được truyền đến các hạt; chúng rung động **ngày càng nhiều** cho đến khi **lực hút** không còn giữ được chúng theo trật tự cố định, và chúng trượt qua nhau. Một hạt riêng lẻ không thể nóng chảy (A); không có năng lượng lạnh (B); và các hạt không bao giờ to ra (D).',
    },
    {
      id: 'a4_washing',
      type: 'mcq',
      title: '4. Wet washing dries on a line on a 32 °C day. Which is the best particle explanation?',
      options: [
        { val: 'A', text: 'A. The water boils, because the sun is hot' },
        { val: 'B', text: 'B. The water particles disappear into the air' },
        { val: 'C', text: 'C. The water particles soak into the cloth and change into cloth particles' },
        { val: 'D', text: 'D. Some water particles at the surface have enough energy to overcome the attractive forces and escape as a gas' },
      ],
      correct: 'D',
      expEn: 'This is **evaporation**: only some particles at the **surface** have enough energy to overcome the forces, and it happens far below the boiling point. Water at 32 °C is not boiling (A); the particles do not disappear — they are in the air as water vapour (B); and particles never change into other particles (C).',
      expVn: 'Đây là **sự bay hơi**: chỉ một số hạt ở **bề mặt** có đủ năng lượng để vượt qua lực hút, và nó xảy ra dưới nhiệt độ sôi rất xa. Nước ở 32 °C không sôi (A); các hạt không biến mất — chúng ở trong không khí dưới dạng hơi nước (B); và các hạt không bao giờ biến thành hạt khác (C).',
    },
    {
      id: 'a5_bubbles',
      type: 'mcq',
      title: '5. Water in a pan boils at 100 °C. What is inside the bubbles that rise through it?',
      options: [
        { val: 'A', text: 'A. Air that was trapped in the water' },
        { val: 'B', text: 'B. Water as a gas — steam' },
        { val: 'C', text: 'C. Heat energy' },
        { val: 'D', text: 'D. Nothing — the bubbles are empty' },
      ],
      correct: 'B',
      expEn: 'At the boiling point, particles **all through** the water overcome the attractive forces and become a gas, so the bubbles are full of **steam**: the same water particles, far apart. They are not air (A); energy is not a substance that fills a bubble (C); and a bubble is never empty — it is full of gas particles (D).',
      expVn: 'Ở nhiệt độ sôi, các hạt **ở khắp** trong nước vượt qua lực hút và thành chất khí, nên các bọt chứa đầy **hơi nước**: vẫn những hạt nước đó, ở xa nhau. Chúng không phải không khí (A); năng lượng không phải là một chất lấp đầy bọt (C); và bọt không bao giờ rỗng — nó chứa đầy hạt khí (D).',
    },
    {
      id: 'a6_glasses',
      type: 'mcq',
      title: '6. Your glasses mist up when you walk out of an air-conditioned room into hot, humid air. Why?',
      options: [
        { val: 'A', text: 'A. Cold energy from the lenses goes into the air' },
        { val: 'B', text: 'B. The lenses sweat water from inside the glass' },
        { val: 'C', text: 'C. Water vapour touches the cold lenses; heat energy is transferred away from its particles, they slow down and the forces pull them into drops' },
        { val: 'D', text: 'D. The water vapour particles get smaller and stick to the glass' },
      ],
      correct: 'C',
      expEn: 'The water vapour **condenses**: heat energy is transferred away from its particles to the cold lenses, they slow down, and the attractive forces pull them together into tiny drops. There is no cold energy (A); glass does not hold water to sweat out (B); and particles never get smaller (D).',
      expVn: 'Hơi nước **ngưng tụ**: nhiệt năng được truyền ra khỏi các hạt của nó sang mắt kính lạnh, chúng chậm lại, và lực hút kéo chúng lại thành những giọt nhỏ. Không có năng lượng lạnh (A); thủy tinh không chứa nước để "đổ mồ hôi" (B); và các hạt không bao giờ nhỏ lại (D).',
    },
    {
      id: 'a7_pump',
      type: 'mcq',
      title: '7. A bicycle pump with its end blocked can be pushed in a little way when it is full of air, but not at all when it is full of water. What does this show?',
      options: [
        { val: 'A', text: 'A. Water particles are harder than air particles' },
        { val: 'B', text: 'B. Water is held in a fixed pattern' },
        { val: 'C', text: 'C. Air has no attractive forces at all, so it can flow' },
        { val: 'D', text: 'D. Air particles have space between them; water particles are already touching' },
      ],
      correct: 'D',
      expEn: 'A gas can be **compressed** because its particles are far apart; a liquid cannot, because its particles are already **touching** with no space to squash into. Hardness of particles is not the reason (A); a fixed pattern is a solid, not water (B); and C is about flowing, not squashing.',
      expVn: 'Chất khí **nén** được vì các hạt của nó ở xa nhau; chất lỏng thì không, vì các hạt của nó đã **chạm nhau**, không còn chỗ trống để ép vào. Độ cứng của hạt không phải lý do (A); trật tự cố định là chất rắn, không phải nước (B); và C nói về sự chảy, không phải sự nén.',
    },
    {
      id: 'a8_ball_ring',
      type: 'mcq',
      title: '8. A metal ball just fits through a metal ring. The ball is heated in a flame. What happens, and why?',
      options: [
        { val: 'A', text: 'A. It no longer fits: its particles vibrate more and take up more space' },
        { val: 'B', text: 'B. It fits more easily: heating makes the particles smaller' },
        { val: 'C', text: 'C. It no longer fits: new particles are made when it is heated' },
        { val: 'D', text: 'D. It still fits exactly: heating only changes the temperature, not the size' },
      ],
      correct: 'A',
      expEn: 'The heated ball **expands**, so it no longer fits: its particles vibrate more and take up more space. Particles never get smaller (B) and are never made by heating (C); and heating a solid does change its size, a little (D) — that is expansion.',
      expVn: 'Quả cầu bị đun nóng **giãn nở**, nên không còn lọt qua: các hạt của nó rung động nhiều hơn và chiếm nhiều chỗ hơn. Các hạt không bao giờ nhỏ lại (B) và không bao giờ được tạo ra khi đun nóng (C); và đun nóng chất rắn có làm thay đổi kích thước của nó, một chút (D) — đó là sự giãn nở.',
    },
  ],
};
