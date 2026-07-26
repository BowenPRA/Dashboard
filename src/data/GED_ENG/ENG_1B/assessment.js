// src/data/GED_ENG/ENG_1B/assessment.js
// Lesson 8 check — author's purpose, tone, word choice, and point of view, using
// one persuasive and one informational passage on the same subject. Answer key
// balanced 2× A / B / C / D.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p8_lights_op",
      title: "Dim the Lights at Midnight",
      meta: "Editorial • Riverton Town Gazette",
      text: [
        "Our town wastes a shocking amount of light. Every night, powerful streetlamps blaze down onto empty streets until dawn, drowning out the stars and keeping birds and people awake. This is careless, and it must stop.",
        "The council could dim the lamps after midnight, as several nearby towns already do, and save both money and the night sky. We owe our children the chance to look up and see more than an orange glow."
      ],
      glossary: {
        "blaze": { def: "To shine very brightly.", vn: "Chiếu sáng rực", vnDef: "Chiếu sáng rất mạnh." },
        "council": { def: "The group that governs a town.", vn: "Hội đồng", vnDef: "Nhóm điều hành một thị trấn." }
      }
    },
    {
      id: "p8_lights_info",
      title: "A Short History of the Streetlight",
      meta: "Informational article",
      text: [
        "The first public streetlights burned oil and had to be lit by hand each evening. In the 1800s, gas lamps spread across major cities, and a lamplighter would walk the streets at dusk with a long pole.",
        "Electric lights arrived later and slowly replaced the gas flame. Today most streetlamps switch on by themselves using a small light sensor, and many towns are now changing to LED bulbs, which use less power than the older kinds."
      ],
      glossary: {
        "lamplighter": { def: "A worker who lit street lamps by hand.", vn: "Người thắp đèn đường", vnDef: "Người công nhân thắp đèn đường bằng tay." },
        "sensor": { def: "A device that detects light or movement.", vn: "Cảm biến", vnDef: "Thiết bị phát hiện ánh sáng hoặc chuyển động." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p8_lights_op",
      type: "mcq",
      title: "1. What is the author's main purpose in the first passage?",
      options: [
        { val: "A", text: "A. To entertain readers with a funny story about birds." },
        { val: "B", text: "B. To explain, step by step, how a streetlamp works." },
        { val: "C", text: "C. To persuade the council to dim the streetlights after midnight." },
        { val: "D", text: "D. To describe the full history of outdoor lighting." }
      ],
      correct: "C",
      expEn: "The writer argues for a change and urges the council to act, which is persuasion. There is no story (A), no how-it-works explanation (B), and no history (D).",
      expVn: "Người viết lập luận cho một thay đổi và thúc giục hội đồng hành động, đó là sự thuyết phục. Không có câu chuyện (A), không có giải thích cách hoạt động (B), và không có lịch sử (D)."
    },
    {
      id: "q2",
      passageId: "p8_lights_op",
      type: "mcq",
      title: "2. Which best describes the TONE of the first passage?",
      options: [
        { val: "A", text: "A. Critical and urgent." },
        { val: "B", text: "B. Calm and neutral." },
        { val: "C", text: "C. Cheerful and playful." },
        { val: "D", text: "D. Sad and hopeless." }
      ],
      correct: "A",
      expEn: "Words like 'shocking', 'careless' and 'it must stop' show a critical, urgent attitude. A neutral or cheerful tone would not use such sharp words.",
      expVn: "Những từ như 'shocking', 'careless' và 'it must stop' cho thấy thái độ chỉ trích, khẩn thiết. Một giọng điệu trung lập hoặc vui vẻ sẽ không dùng những từ sắc bén như vậy."
    },
    {
      id: "q3",
      passageId: "p8_lights_op",
      type: "mcq",
      title: "3. Which word most clearly shows the author's negative attitude?",
      options: [
        { val: "A", text: "A. streets" },
        { val: "B", text: "B. council" },
        { val: "C", text: "C. midnight" },
        { val: "D", text: "D. careless" }
      ],
      correct: "D",
      expEn: "'Careless' carries a clear negative feeling (connotation) about the town's use of light. The other three are neutral words with no attitude attached.",
      expVn: "'Careless' mang một cảm giác tiêu cực rõ ràng (sắc thái nghĩa) về việc thị trấn sử dụng ánh sáng. Ba từ còn lại là những từ trung lập không mang thái độ."
    },
    {
      id: "q4",
      passageId: "p8_lights_op",
      type: "mcq",
      title: "4. What is the author's point of view on bright streetlights?",
      options: [
        { val: "A", text: "A. The author is neutral and takes no side." },
        { val: "B", text: "B. The author is against them and wants the lights dimmed." },
        { val: "C", text: "C. The author wants every lamp kept on all night." },
        { val: "D", text: "D. The author only reports what other towns have done." }
      ],
      correct: "B",
      expEn: "The writer uses 'we' and argues strongly for dimming the lamps, so the point of view is clearly against leaving them bright all night.",
      expVn: "Người viết dùng 'we' và lập luận mạnh mẽ cho việc giảm độ sáng đèn, nên góc nhìn rõ ràng là phản đối việc để đèn sáng suốt đêm."
    },
    {
      id: "q5",
      passageId: "p8_lights_info",
      type: "mcq",
      title: "5. What is the author's main purpose in the second passage?",
      options: [
        { val: "A", text: "A. To persuade the town to remove all its streetlights." },
        { val: "B", text: "B. To inform readers how streetlights developed over time." },
        { val: "C", text: "C. To entertain readers with a ghost story about lamplighters." },
        { val: "D", text: "D. To complain about the rising cost of electricity." }
      ],
      correct: "B",
      expEn: "The passage simply reports the history of streetlights in order, giving facts without taking a side. That is writing to inform.",
      expVn: "Đoạn văn chỉ đơn giản thuật lại lịch sử của đèn đường theo trình tự, đưa ra sự thật mà không đứng về phía nào. Đó là viết để cung cấp thông tin."
    },
    {
      id: "q6",
      passageId: "p8_lights_info",
      type: "mcq",
      title: "6. Which best describes the TONE of the second passage?",
      options: [
        { val: "A", text: "A. Angry and urgent." },
        { val: "B", text: "B. Fearful and tense." },
        { val: "C", text: "C. Proud and boastful." },
        { val: "D", text: "D. Calm and factual." }
      ],
      correct: "D",
      expEn: "The passage lists facts in plain, even language with no judgement words, so the tone is calm and factual.",
      expVn: "Đoạn văn liệt kê các sự thật bằng ngôn ngữ đơn giản, điềm tĩnh, không có từ đánh giá, nên giọng điệu là điềm tĩnh và thực tế."
    },
    {
      id: "q7",
      passageId: "p8_lights_info",
      type: "mcq",
      title: "7. How do the purposes of the two passages differ?",
      options: [
        { val: "A", text: "A. The first tries to persuade the reader; the second tries to inform." },
        { val: "B", text: "B. Both try to persuade the reader to take action." },
        { val: "C", text: "C. The first informs, while the second entertains." },
        { val: "D", text: "D. Both simply tell a story to amuse the reader." }
      ],
      correct: "A",
      expEn: "The first passage argues for a change (persuade); the second reports facts about history (inform). That difference in purpose is the key contrast.",
      expVn: "Đoạn đầu lập luận cho một thay đổi (thuyết phục); đoạn sau thuật lại sự thật về lịch sử (thông tin). Sự khác biệt về mục đích đó là điểm tương phản chính."
    },
    {
      id: "q8",
      passageId: "p8_lights_info",
      type: "mcq",
      title: "8. Which statement from the second passage is a neutral fact?",
      options: [
        { val: "A", text: "A. Streetlights are the best invention of the modern town." },
        { val: "B", text: "B. Old lamps were far more beautiful than today's lights." },
        { val: "C", text: "C. Gas lamps spread across major cities in the 1800s." },
        { val: "D", text: "D. Everyone should switch to LED bulbs immediately." }
      ],
      correct: "C",
      expEn: "C reports a checkable historical fact with no judgement. A and B are opinions ('best', 'more beautiful'), and D is a call to act.",
      expVn: "C thuật lại một sự thật lịch sử có thể kiểm tra, không có đánh giá. A và B là ý kiến ('best', 'more beautiful'), và D là một lời kêu gọi hành động."
    }
  ]
};
