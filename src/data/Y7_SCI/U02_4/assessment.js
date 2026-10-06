// src/data/Y7_SCI/U02_4/assessment.js
// Eight questions, one sitting, ten minutes. 1 atmosphere, 2 condensation on a
// cold window, 3 groundwater in a well, 4 sleet, 5 why terraces help, 6 the
// particles in a cloud, 7 a real path round the cycle, 8 transfer: the plant in
// a plastic bag. Every distractor is a misconception the deck names: you can
// see water vapour, particles get smaller, precipitation is a change of state,
// transpiration is evaporation. No item copies a deck check or a workbook
// question.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_atmosphere',
      type: 'mcq',
      title: '1. What is the atmosphere?',
      options: [
        { val: 'A', text: 'A. The water under the ground' },
        { val: 'B', text: 'B. The water in the sea, lakes and rivers' },
        { val: 'C', text: 'C. The air around the Earth' },
        { val: 'D', text: 'D. The clouds, and nothing else' },
      ],
      correct: 'C',
      expEn: 'The **atmosphere** is the air around the Earth — water vapour is one of the gases in it. The water under the ground is groundwater (A); the sea, lakes and rivers are open water (B); and the clouds are only one part of the atmosphere (D).',
      expVn: '**Khí quyển** là lớp không khí bao quanh Trái Đất — hơi nước là một trong các chất khí trong đó. Nước dưới lòng đất là nước ngầm (A); biển, hồ và sông là mặt nước hở (B); còn mây chỉ là một phần của khí quyển (D).',
    },
    {
      id: 'a2_car_window',
      type: 'mcq',
      title: '2. Early on a cold morning, the inside of a car window is covered in tiny drops of water. Where did the water come from?',
      options: [
        { val: 'A', text: 'A. Rain leaked into the car in the night' },
        { val: 'B', text: 'B. Water vapour in the air inside the car touched the cold glass and condensed' },
        { val: 'C', text: 'C. The cold glass made new water' },
        { val: 'D', text: 'D. The water evaporated out of the glass' },
      ],
      correct: 'B',
      expEn: 'The air holds invisible **water vapour**. When it touches the cold glass it cools and **condenses** into drops — gas to liquid. The drops are on the inside, so they are not rain (A); no new water is ever made (C); and evaporation is liquid to gas, the opposite change (D).',
      expVn: 'Không khí chứa **hơi nước** vô hình. Khi chạm vào kính lạnh, nó lạnh đi và **ngưng tụ** thành giọt — từ khí thành lỏng. Các giọt ở bên trong, nên không phải nước mưa (A); không bao giờ có nước mới được tạo ra (C); và bay hơi là lỏng thành khí, sự thay đổi ngược lại (D).',
    },
    {
      id: 'a3_well',
      type: 'mcq',
      title: '3. A village in the hills gets its drinking water from a deep well. What is the water in the well?',
      options: [
        { val: 'A', text: 'A. Open water' },
        { val: 'B', text: 'B. Surface run-off' },
        { val: 'C', text: 'C. Water vapour' },
        { val: 'D', text: 'D. Groundwater — rain that soaked into the soil and rocks' },
      ],
      correct: 'D',
      expEn: 'Rain that soaks down into the soil and rocks is **groundwater**, and a well or a pump brings it back up. Open water (A) is a river, lake or sea you can see; surface run-off (B) flows over the ground, not under it; and water vapour (C) is a gas in the air.',
      expVn: 'Nước mưa thấm xuống đất và đá là **nước ngầm**, và giếng hoặc máy bơm đưa nó lên lại. Mặt nước hở (A) là sông, hồ hay biển nhìn thấy được; dòng chảy bề mặt (B) chảy trên mặt đất, không phải dưới lòng đất; còn hơi nước (C) là chất khí trong không khí.',
    },
    {
      id: 'a4_sleet',
      type: 'mcq',
      title: '4. What is sleet?',
      options: [
        { val: 'A', text: 'A. Rain and snow falling together' },
        { val: 'B', text: 'B. Mist close to the ground' },
        { val: 'C', text: 'C. Hail that has melted on the road' },
        { val: 'D', text: 'D. Water vapour high in the sky' },
      ],
      correct: 'A',
      expEn: '**Sleet** is rain and snow falling together — one of the four kinds of precipitation. Mist (B) does not fall from a cloud: it is drops that condensed near the ground. Melted hail on the road (C) is just water on the ground, and water vapour (D) is an invisible gas.',
      expVn: '**Mưa tuyết (sleet)** là mưa và tuyết rơi cùng lúc — một trong bốn loại giáng thủy. Sương mù (B) không rơi từ mây: đó là những giọt ngưng tụ ở sát mặt đất. Mưa đá tan trên đường (C) chỉ là nước trên mặt đất, còn hơi nước (D) là chất khí vô hình.',
    },
    {
      id: 'a5_terraces',
      type: 'mcq',
      title: '5. Farmers in the hills of Sơn La build terraces for their rice. How do the terraces help when it rains?',
      options: [
        { val: 'A', text: 'A. They make more rain fall on the hill' },
        { val: 'B', text: 'B. They stop the rice plants from transpiring' },
        { val: 'C', text: 'C. They make the rain evaporate faster' },
        { val: 'D', text: 'D. They slow the surface run-off, so the water soaks in and the soil is not washed away' },
      ],
      correct: 'D',
      expEn: 'On a bare slope, rain rushes over the ground as **surface run-off** and carries the soil away. Terraces hold the water back, so it has time to **soak in**. They cannot change how much rain falls (A), they do not stop plants transpiring (B), and holding water on the field does not make it evaporate faster (C).',
      expVn: 'Trên sườn dốc trọc, mưa chảy xiết trên mặt đất thành **dòng chảy bề mặt** và cuốn đất đi. Ruộng bậc thang giữ nước lại, để nước có thời gian **thấm xuống**. Chúng không thay đổi lượng mưa rơi (A), không ngăn cây thoát hơi nước (B), và giữ nước trên ruộng không làm nước bay hơi nhanh hơn (C).',
    },
    {
      id: 'a6_cloud_particles',
      type: 'mcq',
      title: '6. High in the sky, water vapour cools and a cloud forms. What happens to the water particles?',
      options: [
        { val: 'A', text: 'A. They get smaller and turn into drops' },
        { val: 'B', text: 'B. They lose heat energy, slow down and pull together into tiny drops' },
        { val: 'C', text: 'C. They gain heat energy and move faster' },
        { val: 'D', text: 'D. They stop moving completely' },
      ],
      correct: 'B',
      expEn: 'That is **condensation**: heat energy is transferred away from the particles, they slow down, and the attractive forces pull them together into liquid drops. Particles never change size (A); gaining energy and moving faster (C) is what happens in evaporation; and particles in a liquid still move (D).',
      expVn: 'Đó là **sự ngưng tụ**: nhiệt năng được truyền ra khỏi các hạt, chúng chậm lại, và lực hút kéo chúng lại với nhau thành những giọt lỏng. Các hạt không bao giờ thay đổi kích thước (A); nhận năng lượng và chuyển động nhanh hơn (C) là điều xảy ra khi bay hơi; và các hạt trong chất lỏng vẫn chuyển động (D).',
    },
    {
      id: 'a7_real_path',
      type: 'mcq',
      title: '7. Which of these is a real path a water particle can take?',
      options: [
        { val: 'A', text: 'A. From the sea straight into a cloud, by condensation' },
        { val: 'B', text: 'B. From a plant down to the land, by precipitation' },
        { val: 'C', text: 'C. From the sea into the air by evaporation, then into a cloud by condensation' },
        { val: 'D', text: 'D. From groundwater into the air, by transpiration' },
      ],
      correct: 'C',
      expEn: 'Water **evaporates** from the sea into the air as vapour, then **condenses** into a cloud. Condensation starts with vapour in the air, not with the sea (A); precipitation falls from clouds, not from plants (B); and transpiration is water leaving a plant through its leaves, not leaving groundwater (D).',
      expVn: 'Nước **bay hơi** từ biển vào không khí thành hơi nước, rồi **ngưng tụ** thành mây. Sự ngưng tụ bắt đầu từ hơi nước trong không khí, không phải từ biển (A); giáng thủy rơi từ mây, không phải từ cây (B); và sự thoát hơi nước là nước rời khỏi cây qua lá, không phải rời khỏi nước ngầm (D).',
    },
    {
      id: 'a8_plant_bag',
      type: 'mcq',
      title: '8. A teacher ties a clear plastic bag over the leaves of a plant (not over the soil) and leaves it in the sun. An hour later, the inside of the bag is covered in drops of water. Which two processes made the drops, in order?',
      options: [
        { val: 'A', text: 'A. Transpiration, then condensation' },
        { val: 'B', text: 'B. Condensation, then transpiration' },
        { val: 'C', text: 'C. Evaporation from the soil, then precipitation' },
        { val: 'D', text: 'D. Precipitation, then evaporation' },
      ],
      correct: 'A',
      expEn: 'Water left the leaves as vapour — **transpiration** — and then the vapour touched the cooler plastic and **condensed** into drops. B has them the wrong way round; the soil is outside the bag, and nothing falls from a cloud inside it (C); and precipitation needs a cloud (D).',
      expVn: 'Nước rời khỏi lá ở dạng hơi — **sự thoát hơi nước** — rồi hơi nước chạm vào lớp nhựa mát hơn và **ngưng tụ** thành giọt. B đảo ngược thứ tự; đất nằm ngoài túi, và không có gì rơi từ mây bên trong túi (C); còn giáng thủy cần có mây (D).',
    },
  ],
};
