// src/data/Y7_SCI/U02_2/assessment.js
// Six questions, one sitting, eight minutes. 1–3 the change words (as
// from → to journeys), 4 evaporating vs boiling, 5 reading a scale, 6 the
// heating curve. Distractors are diagnoses; no item copies a check or passage.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_melt',
      type: 'mcq',
      title: '1. Which change of state is "from solid to liquid"?',
      options: [
        { val: 'A', text: 'A. Freezing' },
        { val: 'B', text: 'B. Melting' },
        { val: 'C', text: 'C. Condensation' },
        { val: 'D', text: 'D. Evaporation' },
      ],
      correct: 'B',
      expEn: 'Solid → liquid is **melting**, by heating. Freezing is the reverse (liquid → solid); condensation is gas → liquid; evaporation is liquid → gas.',
      expVn: 'Rắn → lỏng là **nóng chảy**, do đun nóng. Đông đặc là chiều ngược (lỏng → rắn); ngưng tụ là khí → lỏng; bay hơi là lỏng → khí.',
    },
    {
      id: 'a2_condense',
      type: 'mcq',
      title: '2. Steam touches a cold window and turns into drops of water. Which change of state is this?',
      options: [
        { val: 'A', text: 'A. Boiling' },
        { val: 'B', text: 'B. Melting' },
        { val: 'C', text: 'C. Freezing' },
        { val: 'D', text: 'D. Condensation' },
      ],
      correct: 'D',
      expEn: 'Gas → liquid, by cooling, is **condensation**. Boiling goes the other way; melting and freezing are between solid and liquid.',
      expVn: 'Khí → lỏng, do làm lạnh, là **ngưng tụ**. Sôi đi theo chiều ngược lại; nóng chảy và đông đặc là giữa rắn và lỏng.',
    },
    {
      id: 'a3_verb_noun',
      type: 'mcq',
      title: '3. Which pair gives the doing word and the naming word correctly?',
      options: [
        { val: 'A', text: 'A. evaporate → evaporation' },
        { val: 'B', text: 'B. boil → boilation' },
        { val: 'C', text: 'C. melting → melt' },
        { val: 'D', text: 'D. condense → condensing point' },
      ],
      correct: 'A',
      expEn: 'The verb **evaporate** pairs with the noun **evaporation**. Boil pairs with boiling; C has the pair backwards; "condensing point" is not a word for the change.',
      expVn: 'Động từ **evaporate** đi với danh từ **evaporation**. Boil đi với boiling; C đảo ngược cặp; "condensing point" không phải từ chỉ sự thay đổi.',
    },
    {
      id: 'a4_evap_boil',
      type: 'mcq',
      title: '4. Which statement about evaporating and boiling is correct?',
      options: [
        { val: 'A', text: 'A. They are different journeys: one is liquid to gas and one is gas to liquid' },
        { val: 'B', text: 'B. Evaporating happens only at 100 °C; boiling happens at any temperature' },
        { val: 'C', text: 'C. Both change a liquid to a gas; evaporating is slow and from the surface, boiling is fast and all through the liquid' },
        { val: 'D', text: 'D. Evaporating makes bubbles; boiling does not' },
      ],
      correct: 'C',
      expEn: 'Both are **liquid → gas**. Evaporating is slow, from the surface, at any temperature, with no bubbles; boiling is fast, all through the liquid, with bubbles, only at the boiling point. B and D have the facts swapped.',
      expVn: 'Cả hai đều là **lỏng → khí**. Bay hơi chậm, ở bề mặt, ở bất kỳ nhiệt độ nào, không có bọt; sôi nhanh, khắp trong lòng chất lỏng, có bọt, chỉ ở nhiệt độ sôi. B và D đảo ngược các sự thật.',
    },
    {
      id: 'a5_meniscus',
      type: 'mcq',
      title: '5. How should you read the volume of water in a measuring cylinder?',
      options: [
        { val: 'A', text: 'A. From the top of the curved surface, looking down from above' },
        { val: 'B', text: 'B. From the bottom of the meniscus, with your eye level with it' },
        { val: 'C', text: 'C. From wherever the water touches the glass, from any angle' },
        { val: 'D', text: 'D. By guessing halfway between two lines' },
      ],
      correct: 'B',
      expEn: 'Read the **bottom of the meniscus** with your **eye level** with it. Reading from above makes the number too high, and the angle is exactly why two students get two different readings from the same water.',
      expVn: 'Đọc ở **đáy mặt khum** với **mắt ngang tầm**. Nhìn từ trên xuống làm con số quá cao, và góc nhìn chính là lý do hai học sinh ra hai kết quả khác nhau từ cùng một lượng nước.',
    },
    {
      id: 'a6_curve',
      type: 'mcq',
      title: '6. Water is heated with a Bunsen burner. Its temperature rises, then stays at 100 °C. Why does it stop rising?',
      options: [
        { val: 'A', text: 'A. The Bunsen burner has gone out' },
        { val: 'B', text: 'B. The thermometer cannot read higher than 100 °C' },
        { val: 'C', text: 'C. The water is boiling, and the heat is turning the liquid into gas instead of making it hotter' },
        { val: 'D', text: 'D. The water has all evaporated' },
      ],
      correct: 'C',
      expEn: 'At the **boiling point** the heat is used to change liquid into gas (steam), so the temperature holds at 100 °C while the water boils. The burner is still on, the thermometer reads far higher, and there is still water in the beaker.',
      expVn: 'Ở **nhiệt độ sôi** nhiệt được dùng để biến lỏng thành khí (hơi), nên nhiệt độ giữ ở 100 °C trong khi nước sôi. Đèn vẫn cháy, nhiệt kế đọc được cao hơn nhiều, và trong cốc vẫn còn nước.',
    },
  ],
};
