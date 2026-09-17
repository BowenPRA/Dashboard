// src/data/GED_ENG/ENG_3/assessment.js
// Lesson 3 check — signal words, irregular pasts, present perfect vs simple
// past, the interrupted action, schedules, and the one verb that breaks the
// pattern. Six items sit on a numbered-sentence notice, four stand alone.
// Answer key: A ×3, B ×2, C ×3, D ×2.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p3_garden",
      title: "Community Garden Update",
      meta: "Newsletter • Riverton Community Centre",
      text: [
        "(1) The community garden opened in April 2023, and it has grown every year since then. (2) Last spring the volunteers plant forty new fruit trees along the north fence. (3) The committee has already chosen the plots for next year, but it has not printed the map yet.",
        "(4) While the volunteers were digging the new beds, a family of foxes appeared behind the shed. (5) The water tank arrives next Tuesday at nine, and a plumber connects it the same morning. (6) By the end of next summer, the garden will feed almost sixty families."
      ],
      glossary: {
        "plots": { def: "Small pieces of land for growing food.", vn: "Luống / mảnh đất", vnDef: "Những mảnh đất nhỏ để trồng thực phẩm." },
        "beds": { def: "Prepared areas of soil for planting.", vn: "Luống trồng", vnDef: "Các khu đất đã chuẩn bị để trồng cây." },
        "committee": { def: "A group of people chosen to make decisions.", vn: "Ủy ban", vnDef: "Một nhóm người được chọn để đưa ra quyết định." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p3_garden",
      type: "mcq",
      title: "1. Sentence 2: \"Last spring the volunteers plant forty new fruit trees along the north fence.\" Which version of the verb is correct?",
      options: [
        { val: "A", text: "A. plant" },
        { val: "B", text: "B. have planted" },
        { val: "C", text: "C. will plant" },
        { val: "D", text: "D. planted" }
      ],
      correct: "D",
      expEn: "\"Last spring\" is a finished time, so the verb needs its past form: planted. Have/has never goes with a finished time.",
      expVn: "\"Last spring\" là thời điểm đã kết thúc, nên động từ cần dạng quá khứ: planted. Have/has không bao giờ đi với thời điểm đã kết thúc."
    },
    {
      id: "q2",
      passageId: "p3_garden",
      type: "mcq",
      title: "2. Sentence 1 begins \"The community garden opened in April 2023\". Why is \"opened\" (not \"has opened\") correct?",
      options: [
        { val: "A", text: "A. Because the garden is one thing, so the verb needs -ed" },
        { val: "B", text: "B. Because \"in April 2023\" is a finished date, so the simple past is needed" },
        { val: "C", text: "C. Because the sentence is about a habit" },
        { val: "D", text: "D. Because \"opened\" is an irregular verb" }
      ],
      correct: "B",
      expEn: "A finished date (in April 2023) takes the simple past. The second half, \"has grown every year since then\", reaches now, which is why it uses the present perfect.",
      expVn: "Một mốc thời gian đã kết thúc (in April 2023) dùng quá khứ đơn. Nửa sau, \"has grown every year since then\", kéo đến hiện tại, nên nó dùng hiện tại hoàn thành."
    },
    {
      id: "q3",
      passageId: "p3_garden",
      type: "mcq",
      title: "3. Sentence 3: \"The committee has already chosen the plots for next year, but it has not printed the map yet.\" Which two words signal the present perfect?",
      options: [
        { val: "A", text: "A. committee and plots" },
        { val: "B", text: "B. already and yet" },
        { val: "C", text: "C. next year and map" },
        { val: "D", text: "D. but and it" }
      ],
      correct: "B",
      expEn: "\"Already\" and \"yet\" count up to this moment, so they go with has/have + participle: has chosen, has not printed.",
      expVn: "\"Already\" và \"yet\" tính đến thời điểm này, nên chúng đi với has/have + phân từ: has chosen, has not printed."
    },
    {
      id: "q4",
      passageId: "p3_garden",
      type: "mcq",
      title: "4. Sentence 4: \"While the volunteers were digging the new beds, a family of foxes appeared behind the shed.\" Why is \"were digging\" the right form?",
      options: [
        { val: "A", text: "A. Because the digging is a plan for the future" },
        { val: "B", text: "B. Because \"volunteers\" is plural, so the verb must end in -ing" },
        { val: "C", text: "C. Because the digging was a longer action that a shorter action interrupted" },
        { val: "D", text: "D. Because the sentence describes a daily habit" }
      ],
      correct: "C",
      expEn: "The digging was in progress (long action, was/were + -ing) when the foxes appeared (short action, simple past). \"While\" is the signal.",
      expVn: "Việc đào đang diễn ra (hành động dài, was/were + -ing) thì bầy cáo xuất hiện (hành động ngắn, quá khứ đơn). \"While\" là tín hiệu."
    },
    {
      id: "q5",
      passageId: "p3_garden",
      type: "mcq",
      title: "5. Sentence 5: \"The water tank arrives next Tuesday at nine.\" Why can a present-tense verb describe next Tuesday?",
      options: [
        { val: "A", text: "A. Because a fixed schedule uses the simple present, even for a future event" },
        { val: "B", text: "B. Because \"next Tuesday\" is a finished time" },
        { val: "C", text: "C. Because \"tank\" is singular, so the future is not allowed" },
        { val: "D", text: "D. It cannot — the sentence is wrong" }
      ],
      correct: "A",
      expEn: "Timetables and fixed arrangements take the simple present: the tank arrives at nine, the train leaves at six. \"Will arrive\" would also be correct, but the sentence as written is not an error.",
      expVn: "Thời gian biểu và sắp xếp cố định dùng hiện tại đơn: the tank arrives at nine, the train leaves at six. \"Will arrive\" cũng đúng, nhưng câu như đã viết không phải là lỗi."
    },
    {
      id: "q6",
      passageId: "p3_garden",
      type: "mcq",
      title: "6. Sentence 6: \"By the end of next summer, the garden will feed almost sixty families.\" Which is the best version of the verb?",
      options: [
        { val: "A", text: "A. will feed (correct as written)" },
        { val: "B", text: "B. fed" },
        { val: "C", text: "C. has fed" },
        { val: "D", text: "D. will feeds" }
      ],
      correct: "A",
      expEn: "\"By the end of next summer\" is the future, so will + base form. The verb after will never takes -s, and fed / has fed are past forms.",
      expVn: "\"By the end of next summer\" là tương lai, nên dùng will + dạng gốc. Động từ sau will không bao giờ thêm -s, còn fed / has fed là dạng quá khứ."
    },
    {
      id: "q7",
      type: "mcq",
      title: "7. \"I ______ in this town for ten years, and I still love it.\" Which verb is correct?",
      options: [
        { val: "A", text: "A. lived" },
        { val: "B", text: "B. live" },
        { val: "C", text: "C. was living" },
        { val: "D", text: "D. have lived" }
      ],
      correct: "D",
      expEn: "\"For ten years\" plus \"I still love it\" means the time reaches now, so the present perfect: have lived. \"Lived\" would mean the ten years are over.",
      expVn: "\"For ten years\" cộng với \"I still love it\" nghĩa là thời gian kéo đến hiện tại, nên dùng hiện tại hoàn thành: have lived. \"Lived\" sẽ có nghĩa mười năm đó đã qua."
    },
    {
      id: "q8",
      type: "mcq",
      title: "8. \"She ______ the letter in 2019, but she never sent it.\" Which verb is correct?",
      options: [
        { val: "A", text: "A. writes" },
        { val: "B", text: "B. has written" },
        { val: "C", text: "C. wrote" },
        { val: "D", text: "D. will write" }
      ],
      correct: "C",
      expEn: "\"In 2019\" is a finished time, so the simple past. Write is irregular: wrote. Has written cannot go with a finished date.",
      expVn: "\"In 2019\" là thời điểm đã kết thúc, nên dùng quá khứ đơn. Write là bất quy tắc: wrote. Has written không thể đi với mốc thời gian đã kết thúc."
    },
    {
      id: "q9",
      type: "mcq",
      title: "9. Which sentence keeps a consistent tense?",
      options: [
        { val: "A", text: "A. The nurse checked the chart and gives the patient his tablets." },
        { val: "B", text: "B. The nurse checks the chart and gave the patient his tablets." },
        { val: "C", text: "C. The nurse checked the chart and gave the patient his tablets." },
        { val: "D", text: "D. The nurse has checked the chart and gives the patient his tablets." }
      ],
      correct: "C",
      expEn: "Both verbs are in the past in C. A jumps from past to present, B from present to past, and D mixes the present perfect with the present.",
      expVn: "Cả hai động từ đều ở quá khứ trong C. A nhảy từ quá khứ sang hiện tại, B từ hiện tại sang quá khứ, và D trộn hiện tại hoàn thành với hiện tại."
    },
    {
      id: "q10",
      type: "mcq",
      title: "10. Which sentence is INCORRECT?",
      options: [
        { val: "A", text: "A. Yesterday I buyed a new phone." },
        { val: "B", text: "B. Every day the shop opens at nine." },
        { val: "C", text: "C. We have already eaten." },
        { val: "D", text: "D. Tomorrow they will leave early." }
      ],
      correct: "A",
      expEn: "Buy is irregular, so its past form is bought — \"buyed\" does not exist. The other three match their signal words: every day → present, already → present perfect, tomorrow → will.",
      expVn: "Buy là bất quy tắc, nên dạng quá khứ là bought — \"buyed\" không tồn tại. Ba câu còn lại khớp với từ tín hiệu: every day → hiện tại, already → hiện tại hoàn thành, tomorrow → will."
    }
  ]
};
