// src/data/GED_ENG/ENG_1A/assessment.js
// Lesson 7 check — topic, main idea, supporting detail, and summary, across one
// informational and one narrative passage. Answer key balanced 2× A / B / C / D.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p7_trees",
      title: "Why Cities Are Planting Trees",
      meta: "Informational article",
      text: [
        "Cities across the country are planting more trees along their streets, and the reason is practical, not just pretty. A row of shade trees can cool a hot street by several degrees, which lowers the cost of running air conditioners in the buildings nearby. Trees also soak up rainwater that would otherwise flood the drains during a heavy storm.",
        "In one city, a five-year planting program cut summer street temperatures measurably and reduced flooding on the busiest avenues. Planting a tree is cheap; cooling a whole neighbourhood any other way is not."
      ],
      glossary: {
        "practical": { def: "Useful in a real, everyday way.", vn: "Thiết thực", vnDef: "Hữu ích theo cách thực tế, hằng ngày." },
        "drains": { def: "Pipes that carry rainwater away from streets.", vn: "Cống thoát nước", vnDef: "Ống dẫn nước mưa ra khỏi đường phố." }
      }
    },
    {
      id: "p7_shift",
      title: "The Early Shift",
      meta: "Short narrative (Fiction)",
      text: [
        "Lan pressed her badge to the reader, and the bakery door clicked open at four in the morning. The ovens were already warm; her uncle had taught her that bread waits for no one. For the first hour her hands felt clumsy with the dough, and twice she shaped a loaf so badly that she had to start again.",
        "But by the time the sky turned grey, three neat rows of loaves sat rising on the rack. She wiped the flour from her forehead and smiled. The early start was hard, but the work was hers."
      ],
      glossary: {
        "clumsy": { def: "Awkward and not skilful with the hands.", vn: "Vụng về", vnDef: "Lóng ngóng và không khéo tay." },
        "rising": { def: "Growing bigger as the dough fills with air.", vn: "Nở lên", vnDef: "Phồng to khi bột nở đầy khí." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p7_trees",
      type: "mcq",
      title: "1. What is the main topic of the first passage?",
      options: [
        { val: "A", text: "A. Summer storms and flooding." },
        { val: "B", text: "B. Planting trees in cities." },
        { val: "C", text: "C. The price of electricity." },
        { val: "D", text: "D. How air conditioners are built." }
      ],
      correct: "B",
      expEn: "The topic is the subject the whole passage is about — city street trees. Flooding, electricity and air conditioners are only mentioned to explain why trees help.",
      expVn: "Chủ đề là đề tài mà toàn bộ đoạn văn nói đến — cây xanh đường phố. Lũ lụt, điện và máy lạnh chỉ được nhắc đến để giải thích tại sao cây xanh có ích."
    },
    {
      id: "q2",
      passageId: "p7_trees",
      type: "mcq",
      title: "2. Which sentence best states the MAIN IDEA of the passage?",
      options: [
        { val: "A", text: "A. Shade trees make city streets look pretty." },
        { val: "B", text: "B. Air conditioners are expensive to run in summer." },
        { val: "C", text: "C. Cities plant street trees for practical reasons, such as cooling and drainage." },
        { val: "D", text: "D. One city ran a five-year planting program." }
      ],
      correct: "C",
      expEn: "The main idea is the one point most sentences support: trees are planted for practical reasons. A is a minor point the passage sets aside, B is a sub-point, and D is a single supporting detail.",
      expVn: "Ý chính là điểm duy nhất mà hầu hết các câu hỗ trợ: cây được trồng vì lý do thiết thực. A là điểm phụ mà đoạn văn gạt sang một bên, B là điểm nhỏ, và D là một chi tiết hỗ trợ đơn lẻ."
    },
    {
      id: "q3",
      passageId: "p7_trees",
      type: "mcq",
      title: "3. Which detail most directly supports the idea that trees save energy?",
      options: [
        { val: "A", text: "A. Shade can cool a street by several degrees, lowering air-conditioning costs." },
        { val: "B", text: "B. Trees soak up rainwater during heavy storms." },
        { val: "C", text: "C. Trees make a neighbourhood look pleasant." },
        { val: "D", text: "D. A planting program lasted five years." }
      ],
      correct: "A",
      expEn: "Saving energy means using less electricity. Cooler streets mean less air conditioning, so A supports the energy point directly. B supports drainage, not energy.",
      expVn: "Tiết kiệm năng lượng nghĩa là dùng ít điện hơn. Đường phố mát hơn nghĩa là ít dùng máy lạnh hơn, nên A hỗ trợ trực tiếp cho điểm về năng lượng. B hỗ trợ cho việc thoát nước, không phải năng lượng."
    },
    {
      id: "q4",
      passageId: "p7_trees",
      type: "mcq",
      title: "4. Which is the best one-sentence SUMMARY of the passage?",
      options: [
        { val: "A", text: "A. Trees are the most beautiful part of any city." },
        { val: "B", text: "B. One city planted trees for five years." },
        { val: "C", text: "C. Air conditioners cost too much money in the summer." },
        { val: "D", text: "D. Cities are planting street trees because they cool streets and reduce flooding." }
      ],
      correct: "D",
      expEn: "A good summary keeps the main idea and the key reasons while dropping small details. D covers the whole passage; the others are opinions or single details.",
      expVn: "Một bản tóm tắt tốt giữ ý chính và các lý do quan trọng trong khi bỏ các chi tiết nhỏ. D bao quát toàn bộ đoạn văn; các câu khác là ý kiến hoặc chi tiết đơn lẻ."
    },
    {
      id: "q5",
      passageId: "p7_shift",
      type: "mcq",
      title: "5. What is the MAIN IDEA of the story about Lan?",
      options: [
        { val: "A", text: "A. Bread must always be baked before four in the morning." },
        { val: "B", text: "B. Lan's uncle owns a very busy bakery." },
        { val: "C", text: "C. Lan works through a hard early shift and feels proud of what she made." },
        { val: "D", text: "D. Shaping dough is impossible for a beginner to learn." }
      ],
      correct: "C",
      expEn: "The whole story builds to Lan's pride after a difficult start. A and B are small details, and D is contradicted — she does learn to shape the loaves.",
      expVn: "Toàn bộ câu chuyện dẫn đến niềm tự hào của Lan sau một khởi đầu khó khăn. A và B là chi tiết nhỏ, và D bị mâu thuẫn — cô ấy đã học được cách tạo hình ổ bánh."
    },
    {
      id: "q6",
      passageId: "p7_shift",
      type: "mcq",
      title: "6. Which detail shows that the work was difficult for Lan at first?",
      options: [
        { val: "A", text: "A. Twice she shaped a loaf so badly that she had to start again." },
        { val: "B", text: "B. The ovens were already warm when she arrived." },
        { val: "C", text: "C. Three neat rows of loaves sat rising on the rack." },
        { val: "D", text: "D. She pressed her badge to the reader." }
      ],
      correct: "A",
      expEn: "Having to remake spoiled loaves is a clear sign of early difficulty. C shows her later success, while B and D are neutral details.",
      expVn: "Việc phải làm lại những ổ bánh hỏng là dấu hiệu rõ ràng của khó khăn ban đầu. C cho thấy thành công về sau của cô, còn B và D là những chi tiết trung tính."
    },
    {
      id: "q7",
      passageId: "p7_shift",
      type: "mcq",
      title: "7. Which of these is a small DETAIL, not the main idea of the story?",
      options: [
        { val: "A", text: "A. Lan takes pride in finishing hard work." },
        { val: "B", text: "B. Lan learns to handle a tough early shift." },
        { val: "C", text: "C. Lan grows more confident by the end of the morning." },
        { val: "D", text: "D. Lan pressed her badge to the reader at four a.m." }
      ],
      correct: "D",
      expEn: "D is one small action in the scene. A, B and C all restate the larger point of the story — Lan's growth and pride.",
      expVn: "D là một hành động nhỏ trong cảnh. A, B và C đều nêu lại điểm lớn hơn của câu chuyện — sự trưởng thành và niềm tự hào của Lan."
    },
    {
      id: "q8",
      passageId: "p7_shift",
      type: "mcq",
      title: "8. Which is the best SUMMARY of the story?",
      options: [
        { val: "A", text: "A. A girl dislikes her bakery job and quits before dawn." },
        { val: "B", text: "B. On a hard early shift, Lan struggles at first but finishes proud of her bread." },
        { val: "C", text: "C. A bakery sells three rows of loaves before the sun comes up." },
        { val: "D", text: "D. An uncle teaches his niece that bread waits for no one." }
      ],
      correct: "B",
      expEn: "B keeps the main idea and the key turn from struggle to pride. A is false, C reports a stray detail, and D is only one line from the story.",
      expVn: "B giữ ý chính và bước ngoặt quan trọng từ vật lộn sang tự hào. A là sai, C thuật lại một chi tiết lạc, và D chỉ là một câu trong truyện."
    }
  ]
};
