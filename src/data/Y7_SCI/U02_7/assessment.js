// src/data/Y7_SCI/U02_7/assessment.js
// Eight questions, one sitting, ten minutes. 1–2 mixture or compound, 3 iron
// sulfide and the magnet, 4 properties, 5 air, 6 pure, 7 tap water, 8 salt
// water. Every distractor is a misconception the deck names: "pure" on a bottle
// means clean, a mixture has new properties, air is an element, iron sulfide
// is magnetic. No item copies a deck check or a workbook question.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_stirred',
      type: 'mcq',
      title: '1. Iron filings and sulfur powder are stirred together. A magnet pulls the iron back out. What does this show?',
      options: [
        { val: 'A', text: 'A. Iron and sulfur made a compound when they were stirred' },
        { val: 'B', text: 'B. Iron and sulfur formed a mixture — the iron is not bonded, so it is still magnetic' },
        { val: 'C', text: 'C. Stirring made the sulfur magnetic' },
        { val: 'D', text: 'D. Iron is not an element' },
      ],
      correct: 'B',
      expEn: 'Stirring makes a **mixture**: nothing bonds, so the iron keeps its properties and a magnet separates it. A compound (A) needs the atoms to bond, as they do when heated; sulfur is never magnetic (C); and iron is an element (D).',
      expVn: 'Khuấy tạo ra **hỗn hợp**: không có gì liên kết, nên sắt giữ nguyên tính chất và nam châm tách được nó. Hợp chất (A) cần các nguyên tử liên kết, như khi đun nóng; lưu huỳnh không bao giờ bị nam châm hút (C); và sắt là nguyên tố (D).',
    },
    {
      id: 'a2_particles',
      type: 'mcq',
      title: '2. A box holds two kinds of particle: single iron atoms and single sulfur atoms, not joined to each other. What is in the box?',
      options: [
        { val: 'A', text: 'A. A mixture of two elements' },
        { val: 'B', text: 'B. A compound' },
        { val: 'C', text: 'C. One pure element' },
        { val: 'D', text: 'D. A mixture of two compounds' },
      ],
      correct: 'A',
      expEn: 'Two different substances, not bonded, make a **mixture**; each is only one kind of atom, so both are **elements**. It is not a compound (B) because nothing is bonded, not pure (C) because there are two substances, and neither substance is a compound (D).',
      expVn: 'Hai chất khác nhau, không liên kết, tạo thành **hỗn hợp**; mỗi chất chỉ có một loại nguyên tử, nên cả hai là **nguyên tố**. Không phải hợp chất (B) vì không có gì liên kết, không tinh khiết (C) vì có hai chất, và không chất nào là hợp chất (D).',
    },
    {
      id: 'a3_magnet_fes',
      type: 'mcq',
      title: '3. Iron and sulfur are heated until they glow, and iron sulfide is made. What happens when a magnet is held over the iron sulfide?',
      options: [
        { val: 'A', text: 'A. It pulls out the iron, because iron sulfide is magnetic' },
        { val: 'B', text: 'B. It pulls out the sulfur' },
        { val: 'C', text: 'C. Nothing — the iron is bonded to sulfur in a compound that is not magnetic' },
        { val: 'D', text: 'D. It pulls the whole solid, because it still contains iron' },
      ],
      correct: 'C',
      expEn: 'Iron sulfide is a **compound** with new properties, and it is **not magnetic**, so the magnet does nothing. A and D are the misconception that iron sulfide is magnetic because iron is in it; B is wrong because sulfur is not magnetic.',
      expVn: 'Sắt sunfua là **hợp chất** có tính chất mới, và nó **không bị nam châm hút**, nên nam châm không làm gì được. A và D là quan niệm sai rằng sắt sunfua bị hút vì có sắt trong đó; B sai vì lưu huỳnh không bị nam châm hút.',
    },
    {
      id: 'a4_compound_props',
      type: 'mcq',
      title: '4. Which describes a COMPOUND, and not a mixture?',
      options: [
        { val: 'A', text: 'A. The substances keep their own properties' },
        { val: 'B', text: 'B. It is easy to separate with a magnet or by evaporating' },
        { val: 'C', text: 'C. The substances are mixed but not bonded' },
        { val: 'D', text: 'D. Its atoms are bonded, it has new properties, and it is hard to separate' },
      ],
      correct: 'D',
      expEn: 'A compound is **bonded**, has **new** properties and is **hard** to separate. A, B and C all describe a **mixture** — a mixture does not have new properties; each substance in it keeps its own.',
      expVn: 'Hợp chất có **liên kết**, có tính chất **mới** và **khó** tách ra. A, B và C đều mô tả **hỗn hợp** — hỗn hợp không có tính chất mới; mỗi chất trong đó giữ nguyên tính chất của mình.',
    },
    {
      id: 'a5_air',
      type: 'mcq',
      title: '5. Air is about 78% nitrogen, 21% oxygen and 1% other gases. What is air?',
      options: [
        { val: 'A', text: 'A. An element, because most of it is nitrogen' },
        { val: 'B', text: 'B. A mixture of elements and compounds, not bonded to each other' },
        { val: 'C', text: 'C. A compound of nitrogen and oxygen' },
        { val: 'D', text: 'D. A pure substance, because it is all gas' },
      ],
      correct: 'B',
      expEn: 'Air is a **mixture**: nitrogen and oxygen (elements) with carbon dioxide and water (compounds), none bonded to the others. "Mostly nitrogen" (A) still leaves other substances; nitrogen and oxygen in air are not bonded (C); and being all gas does not make it one substance (D).',
      expVn: 'Không khí là **hỗn hợp**: nitơ và oxi (nguyên tố) với cacbon đioxit và nước (hợp chất), không chất nào liên kết với chất khác. "Chủ yếu là nitơ" (A) vẫn còn các chất khác; nitơ và oxi trong không khí không liên kết (C); và đều là khí không làm nó thành một chất (D).',
    },
    {
      id: 'a6_pure_label',
      type: 'mcq',
      title: '6. A bottle of water has the word PURE on its label. A scientist tests it and finds minerals dissolved in it. Which is correct?',
      options: [
        { val: 'A', text: 'A. It is pure, because the label says so and it is clean' },
        { val: 'B', text: 'B. It is pure, because minerals are natural' },
        { val: 'C', text: 'C. It is not pure in science: it holds more than one substance, so it is a mixture' },
        { val: 'D', text: 'D. It is a compound of water and minerals' },
      ],
      correct: 'C',
      expEn: 'In science **pure means one substance**. Water with minerals is a mixture, whatever the label says. On a bottle, "pure" only means clean (A); natural (B) is not the same as pure; and the minerals are dissolved, not bonded to the water (D).',
      expVn: 'Trong khoa học **tinh khiết nghĩa là một chất**. Nước có khoáng chất là hỗn hợp, dù nhãn ghi gì. Trên chai, "pure" chỉ có nghĩa là sạch (A); tự nhiên (B) không có nghĩa là tinh khiết; và khoáng chất hòa tan, không liên kết với nước (D).',
    },
    {
      id: 'a7_tap_basin',
      type: 'mcq',
      title: '7. Tap water is heated in an evaporating basin until the water has gone. A white solid is left. Where did the white solid come from?',
      options: [
        { val: 'A', text: 'A. Minerals from rocks were dissolved in the water' },
        { val: 'B', text: 'B. The heat turned some of the water into a solid' },
        { val: 'C', text: 'C. The basin gave off a white powder when it was heated' },
        { val: 'D', text: 'D. Oxygen from the air bonded to the water' },
      ],
      correct: 'A',
      expEn: 'The water flowed through **rocks** and **minerals dissolved** in it; when the water evaporated they were left behind, which is why tap water is a mixture. Evaporating water becomes a gas, not a solid (B); the basin does not change (C); and no new compound is made (D).',
      expVn: 'Nước chảy qua **đất đá** và **khoáng chất hòa tan** vào nó; khi nước bay hơi, chúng còn lại, vì thế nước máy là hỗn hợp. Nước bay hơi thành khí, không thành rắn (B); bát không thay đổi (C); và không có hợp chất mới nào được tạo ra (D).',
    },
    {
      id: 'a8_salt_water',
      type: 'mcq',
      title: '8. Salt is a compound (sodium chloride). Salt dissolved in water is:',
      options: [
        { val: 'A', text: 'A. a compound, because salt is a compound' },
        { val: 'B', text: 'B. a mixture — boiling the water away gives the salt back' },
        { val: 'C', text: 'C. an element, because it is mostly water' },
        { val: 'D', text: 'D. a compound, because it has a new taste' },
      ],
      correct: 'B',
      expEn: 'Salt water is a **mixture**: the salt and water are not bonded to each other, so evaporating the water leaves the salt. A mixture can contain compounds (A); water is a compound, not an element (C); and a salty taste is just the salt keeping its own property — not a new one (D).',
      expVn: 'Nước muối là **hỗn hợp**: muối và nước không liên kết với nhau, nên làm bay hơi nước thì muối còn lại. Hỗn hợp có thể chứa hợp chất (A); nước là hợp chất, không phải nguyên tố (C); và vị mặn chỉ là muối giữ nguyên tính chất của nó — không phải tính chất mới (D).',
    },
  ],
};
