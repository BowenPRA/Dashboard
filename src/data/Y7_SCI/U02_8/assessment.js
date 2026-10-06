// src/data/Y7_SCI/U02_8/assessment.js
// Eight questions, one sitting, ten minutes. 1 the key word indicator, 2 acid /
// neutral / alkali from a pH, 3 what one litmus paper can and cannot tell,
// 4 a universal-indicator colour, 5 the strongest alkali, 6 both ends burn,
// 7 neutralising an ant bite, 8 the colours of a neutralisation (transfer).
// Every distractor is a misconception the deck names: a big number is a strong
// acid, only acids burn, green is a litmus colour, more acid fixes an acid.
// No item copies a deck check or a workbook question.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_indicator',
      type: 'mcq',
      title: '1. A gardener tests her soil with a liquid that turns one colour in an acid and another colour in an alkali. What is this kind of liquid called?',
      options: [
        { val: 'A', text: 'A. A corrosive' },
        { val: 'B', text: 'B. An indicator' },
        { val: 'C', text: 'C. A neutral' },
        { val: 'D', text: 'D. An alkali' },
      ],
      correct: 'B',
      expEn: 'A substance that **changes colour** to show an acid or an alkali is an **indicator**. Corrosive (A) means it attacks skin, eyes and clothes; neutral (C) is pH 7, not a kind of tester; and an alkali (D) is one of the things an indicator detects.',
      expVn: 'Chất **đổi màu** để cho biết axit hay kiềm là **chất chỉ thị**. Ăn mòn (A) nghĩa là làm hỏng da, mắt và quần áo; trung tính (C) là pH 7, không phải một loại chất thử; còn kiềm (D) là một thứ mà chất chỉ thị phát hiện.',
    },
    {
      id: 'a2_ammonia',
      type: 'mcq',
      title: '2. An ammonia cleaner has a pH of 11. Which describes it?',
      options: [
        { val: 'A', text: 'A. An acid, because 11 is a big number' },
        { val: 'B', text: 'B. Neutral' },
        { val: 'C', text: 'C. A weak acid' },
        { val: 'D', text: 'D. An alkali, because 11 is above 7' },
      ],
      correct: 'D',
      expEn: 'Above 7 is an **alkali**, so pH 11 is an alkali. A big number is a strong ALKALI, not an acid (A and C — acids are below 7), and neutral is exactly 7 (B).',
      expVn: 'Lớn hơn 7 là **kiềm**, nên pH 11 là kiềm. Số lớn là KIỀM mạnh, không phải axit (A và C — axit nhỏ hơn 7), còn trung tính là đúng bằng 7 (B).',
    },
    {
      id: 'a3_red_stays',
      type: 'mcq',
      title: '3. A piece of red litmus paper is dipped into a liquid and stays red. What can you say about the liquid?',
      options: [
        { val: 'A', text: 'A. It is an acid or it is neutral — red litmus alone cannot tell which' },
        { val: 'B', text: 'B. It must be an acid' },
        { val: 'C', text: 'C. It must be an alkali' },
        { val: 'D', text: 'D. It must be neutral' },
      ],
      correct: 'A',
      expEn: 'Red litmus changes only in an **alkali** (it turns blue). It stays red in an acid AND in a neutral liquid, so this one test cannot tell those two apart — you would need blue litmus too. That is why B and D are each only half the story, and C is wrong: an alkali would have turned it blue.',
      expVn: 'Giấy quỳ đỏ chỉ đổi màu trong **kiềm** (chuyển xanh). Nó vẫn đỏ trong axit VÀ trong chất trung tính, nên một lần thử này không phân biệt được hai loại đó — em cần thêm quỳ xanh. Vì vậy B và D chỉ đúng một nửa, còn C sai: kiềm sẽ làm nó chuyển xanh.',
    },
    {
      id: 'a4_blue',
      type: 'mcq',
      title: '4. Universal indicator turns blue in a liquid. The liquid is:',
      options: [
        { val: 'A', text: 'A. a strong acid' },
        { val: 'B', text: 'B. neutral' },
        { val: 'C', text: 'C. an alkali' },
        { val: 'D', text: 'D. a weak acid' },
      ],
      correct: 'C',
      expEn: '**Blue and purple are the alkali end** of the scale. A strong acid is red (A), neutral is green (B), and a weak acid is orange or yellow (D).',
      expVn: '**Xanh dương và tím là đầu kiềm** của thang. Axit mạnh màu đỏ (A), trung tính màu xanh lá (B), còn axit yếu màu cam hoặc vàng (D).',
    },
    {
      id: 'a5_strongest',
      type: 'mcq',
      title: '5. Which of these is the strongest alkali?',
      options: [
        { val: 'A', text: 'A. sea water, pH 8' },
        { val: 'B', text: 'B. soapy water, pH 10' },
        { val: 'C', text: 'C. toothpaste, pH 9' },
        { val: 'D', text: 'D. drain cleaner, pH 14' },
      ],
      correct: 'D',
      expEn: 'For an alkali, **the bigger the number, the stronger**: pH 14 is the far end of the scale. Sea water (8), toothpaste (9) and soapy water (10) are alkalis too, but closer to 7, so weaker.',
      expVn: 'Với kiềm, **số càng lớn càng mạnh**: pH 14 ở tận cùng của thang. Nước biển (8), kem đánh răng (9) và nước xà phòng (10) cũng là kiềm, nhưng gần 7 hơn, nên yếu hơn.',
    },
    {
      id: 'a6_drain_symbol',
      type: 'mcq',
      title: '6. Drain cleaner is pH 14, and its bottle carries the corrosive symbol. Why?',
      options: [
        { val: 'A', text: 'A. It is a strong acid' },
        { val: 'B', text: 'B. It is a strong alkali, and a strong alkali attacks skin just as a strong acid does' },
        { val: 'C', text: 'C. Every cleaning liquid is corrosive' },
        { val: 'D', text: 'D. pH 14 is neutral, but it is poisonous' },
      ],
      correct: 'B',
      expEn: 'Danger lives at **both ends** of the scale: pH 14 is a strong alkali, and it burns skin like a strong acid. It is not an acid (A — acids are below 7) and not neutral (D — neutral is 7); and not every cleaner is corrosive (C) — soapy water is a weak alkali.',
      expVn: 'Nguy hiểm nằm ở **cả hai đầu** của thang: pH 14 là kiềm mạnh, và nó làm bỏng da giống axit mạnh. Nó không phải axit (A — axit nhỏ hơn 7) và không trung tính (D — trung tính là 7); và không phải chất tẩy rửa nào cũng ăn mòn (C) — nước xà phòng là kiềm yếu.',
    },
    {
      id: 'a7_ant_bite',
      type: 'mcq',
      title: '7. An ant bite stings because the ant injects an acid. What could help?',
      options: [
        { val: 'A', text: 'A. Washing it with soap, an alkali that neutralises the acid' },
        { val: 'B', text: 'B. Rubbing lemon juice on it' },
        { val: 'C', text: 'C. Putting vinegar on it' },
        { val: 'D', text: 'D. Nothing — an acid can never be changed' },
      ],
      correct: 'A',
      expEn: 'An acid is cancelled out by the **opposite family**: soap is an alkali, so it **neutralises** the acid. Lemon juice (B) and vinegar (C) are acids — they would add more acid. And an acid can be changed: that is exactly what neutralisation does (D).',
      expVn: 'Axit bị triệt tiêu bởi **nhóm chất đối lập**: xà phòng là kiềm, nên nó **trung hòa** axit. Nước chanh (B) và giấm (C) là axit — chúng chỉ thêm axit. Và axit có thể thay đổi: đó chính là việc sự trung hòa làm (D).',
    },
    {
      id: 'a8_colour_walk',
      type: 'mcq',
      title: '8. A student adds an alkali, a drop at a time, to an acid with universal indicator in it, and stops when it is neutral. Which list shows the colours in order?',
      options: [
        { val: 'A', text: 'A. purple → blue → green' },
        { val: 'B', text: 'B. green → yellow → red' },
        { val: 'C', text: 'C. red → orange → yellow → green' },
        { val: 'D', text: 'D. red → purple → green' },
      ],
      correct: 'C',
      expEn: 'The acid starts at the red end. Each drop of alkali moves the pH **up, towards 7**, so the colour walks along the scale — orange, yellow — and stops at **green**, neutral. A is an alkali being neutralised; B goes the wrong way, away from neutral; D jumps to the alkali end and back.',
      expVn: 'Axit bắt đầu ở đầu màu đỏ. Mỗi giọt kiềm đưa pH **lên, về phía 7**, nên màu đi dần theo thang — cam, vàng — và dừng ở **xanh lá**, trung tính. A là kiềm đang bị trung hòa; B đi ngược, xa khỏi trung tính; D nhảy sang đầu kiềm rồi quay lại.',
    },
  ],
};
