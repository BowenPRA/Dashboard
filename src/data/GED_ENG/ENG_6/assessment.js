// src/data/GED_ENG/ENG_6/assessment.js
// Ten GED-style organisation items on a short argument: best transition (×3),
// the sentence that does not belong (×2), where a sentence should move (×2),
// which sentence is the topic sentence (×2), precise word choice (×1).
// Key: A×3 B×2 C×3 D×2.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p6_market",
      title: "Letter: Keep the Saturday Market",
      meta: "Letter to the editor • Riverside Gazette",
      text: [
        "(1) The council plans to close the Saturday market to make room for parking. (2) This would be a mistake, for three reasons.",
        "(3) First, the market supports local farmers. (4) Forty-two stalls sell food grown within thirty miles of the town. (5) ______, the Nguyen family has sold vegetables there for twenty years. (6) Without the market, many of these farmers would lose their main customers.",
        "(7) Second, the market brings shoppers to the high street. (8) Shops report that Saturday sales are double those of any other day. (9) ______, closing the market would hurt the shops, not help them. (10) Parking spaces alone do not bring people into town.",
        "(11) Most importantly, the market is where the town meets. (12) Neighbours talk, children play, and new residents make their first friends. (13) The market also has a very old clock tower. (14) A car park cannot do any of this.",
        "(15) ______, the council should keep the market and find parking somewhere else. (16) A town needs a heart more than it needs another hundred parking spaces."
      ],
      glossary: {
        "council": { def: "The group of people elected to run a town.", vn: "Hội đồng", vnDef: "Nhóm người được bầu để điều hành một thị trấn." },
        "stall": { def: "A small table or stand where goods are sold in a market.", vn: "Sạp hàng", vnDef: "Một bàn hoặc quầy nhỏ bán hàng ở chợ." },
        "high street": { def: "The main shopping street of a town.", vn: "Phố chính", vnDef: "Con phố mua sắm chính của một thị trấn." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p6_market",
      type: "mcq",
      title: "1. Which transition best fills the blank in sentence 5?",
      options: [
        { val: "A", text: "A. However" },
        { val: "B", text: "B. Therefore" },
        { val: "C", text: "C. For example" },
        { val: "D", text: "D. Finally" }
      ],
      correct: "C",
      expEn: "The Nguyen family is one specific example of the local farmers in sentence 4, so \"For example\" is the signpost. Nothing here contrasts or concludes.",
      expVn: "Gia đình Nguyen là một ví dụ cụ thể về nông dân địa phương ở câu 4, nên \"For example\" là từ chỉ đường. Không có gì ở đây tương phản hay kết luận."
    },
    {
      id: "q2",
      passageId: "p6_market",
      type: "mcq",
      title: "2. Which transition best fills the blank in sentence 9?",
      options: [
        { val: "A", text: "A. Therefore" },
        { val: "B", text: "B. In contrast" },
        { val: "C", text: "C. For instance" },
        { val: "D", text: "D. First" }
      ],
      correct: "A",
      expEn: "Sentence 9 is the result of the doubled Saturday sales in sentence 8, so a cause-and-effect word is needed: \"Therefore\".",
      expVn: "Câu 9 là kết quả của doanh số thứ Bảy tăng gấp đôi ở câu 8, nên cần từ chỉ nguyên nhân–kết quả: \"Therefore\"."
    },
    {
      id: "q3",
      passageId: "p6_market",
      type: "mcq",
      title: "3. Which transition best fills the blank in sentence 15?",
      options: [
        { val: "A", text: "A. In addition" },
        { val: "B", text: "B. In conclusion" },
        { val: "C", text: "C. For example" },
        { val: "D", text: "D. However" }
      ],
      correct: "B",
      expEn: "Sentence 15 opens the final paragraph and restates the writer's position, so \"In conclusion\" is the signpost.",
      expVn: "Câu 15 mở đầu đoạn cuối và nhắc lại quan điểm của người viết, nên \"In conclusion\" là từ chỉ đường."
    },
    {
      id: "q4",
      passageId: "p6_market",
      type: "mcq",
      title: "4. Which sentence does NOT belong in the fourth paragraph (sentences 11–14)?",
      options: [
        { val: "A", text: "A. Sentence 11" },
        { val: "B", text: "B. Sentence 12" },
        { val: "C", text: "C. Sentence 13" },
        { val: "D", text: "D. Sentence 14" }
      ],
      correct: "C",
      expEn: "The paragraph is about the market as the place where the town meets. The clock tower (13) is true but has nothing to do with that idea, so it breaks the paragraph's coherence.",
      expVn: "Đoạn văn nói về chợ như nơi thị trấn gặp gỡ. Tháp đồng hồ (13) là sự thật nhưng không liên quan tới ý đó, nên nó phá vỡ sự mạch lạc của đoạn."
    },
    {
      id: "q5",
      passageId: "p6_market",
      type: "mcq",
      title: "5. Which sentence is the topic sentence of the third paragraph (sentences 7–10)?",
      options: [
        { val: "A", text: "A. Sentence 7" },
        { val: "B", text: "B. Sentence 8" },
        { val: "C", text: "C. Sentence 9" },
        { val: "D", text: "D. Sentence 10" }
      ],
      correct: "A",
      expEn: "Sentence 7 states the one idea the paragraph proves: the market brings shoppers to the high street. Sentences 8–10 are the support.",
      expVn: "Câu 7 nêu ý duy nhất mà đoạn văn chứng minh: chợ đưa người mua sắm tới phố chính. Các câu 8–10 là ý hỗ trợ."
    },
    {
      id: "q6",
      passageId: "p6_market",
      type: "mcq",
      title: "6. The writer wants to add this sentence: \"Twelve of them are run by families who have farmed here for three generations.\" Where should it go?",
      options: [
        { val: "A", text: "A. After sentence 2" },
        { val: "B", text: "B. After sentence 8" },
        { val: "C", text: "C. After sentence 12" },
        { val: "D", text: "D. After sentence 4" }
      ],
      correct: "D",
      expEn: "\"Twelve of them\" refers to the forty-two stalls in sentence 4, and the sentence supports the farmers paragraph. It must follow sentence 4 so \"them\" has something to point to.",
      expVn: "\"Twelve of them\" chỉ bốn mươi hai sạp hàng ở câu 4, và câu này hỗ trợ đoạn về nông dân. Nó phải đi sau câu 4 để \"them\" có đối tượng để chỉ."
    },
    {
      id: "q7",
      passageId: "p6_market",
      type: "mcq",
      title: "7. The writer decides that the reason about local farmers (paragraph 2) is the strongest. To follow the \"strongest last\" rule, where should that paragraph move?",
      options: [
        { val: "A", text: "A. Before sentence 1, as the opening" },
        { val: "B", text: "B. After paragraph 4 (sentences 11–14), just before the conclusion" },
        { val: "C", text: "C. After the conclusion, as a final thought" },
        { val: "D", text: "D. It should stay where it is" }
      ],
      correct: "B",
      expEn: "In an argument the strongest reason goes in the last body paragraph, directly before the conclusion — never after it, and never as the opening.",
      expVn: "Trong lập luận, lý do mạnh nhất đặt ở đoạn thân bài cuối, ngay trước kết luận — không bao giờ sau kết luận, và không bao giờ làm mở bài."
    },
    {
      id: "q8",
      type: "mcq",
      title: "8. Which of these four sentences would make the best topic sentence for a paragraph about the cost of school uniforms?",
      options: [
        { val: "A", text: "A. For example, one blazer costs sixty dollars." },
        { val: "B", text: "B. In addition, shoes must be black leather." },
        { val: "C", text: "C. School uniforms place a heavy cost on low-income families." },
        { val: "D", text: "D. As a result, some parents borrow money in September." }
      ],
      correct: "C",
      expEn: "C states a general idea that the other three sentences could support. A, B and D each begin with a signpost showing that they are details, not the main idea.",
      expVn: "C nêu một ý chung mà ba câu còn lại có thể hỗ trợ. A, B và D mỗi câu đều bắt đầu bằng từ chỉ đường cho thấy chúng là chi tiết, không phải ý chính."
    },
    {
      id: "q9",
      type: "mcq",
      title: "9. Topic sentence: \"Working from home saves employees money.\" Which sentence does NOT belong in that paragraph?",
      options: [
        { val: "A", text: "A. A daily train ticket costs twelve dollars, or sixty dollars a week." },
        { val: "B", text: "B. Lunch bought near the office is twice the price of lunch made at home." },
        { val: "C", text: "C. Over a year, an employee can keep more than three thousand dollars." },
        { val: "D", text: "D. Many people also find it hard to stop working when the office is at home." }
      ],
      correct: "D",
      expEn: "A, B and C all show money saved. D is about a different idea — the difficulty of switching off — so it belongs in another paragraph.",
      expVn: "A, B và C đều cho thấy tiền tiết kiệm được. D nói về một ý khác — khó ngừng làm việc — nên nó thuộc về một đoạn khác."
    },
    {
      id: "q10",
      type: "mcq",
      title: "10. Which sentence uses the most precise and formal language?",
      options: [
        { val: "A", text: "A. Free school meals reduce absences by about fifteen percent." },
        { val: "B", text: "B. Free school meals are a good thing for kids." },
        { val: "C", text: "C. Free school meals do a lot of good stuff for attendance." },
        { val: "D", text: "D. Honestly, you guys should back free school meals." }
      ],
      correct: "A",
      expEn: "A gives a measurable result with a number. B uses the vague words good thing and kids, C uses a lot and stuff, and D is chatty and addresses the reader as \"you guys\".",
      expVn: "A đưa ra kết quả đo được bằng con số. B dùng các từ mơ hồ good thing và kids, C dùng a lot và stuff, còn D suồng sã và gọi người đọc là \"you guys\"."
    }
  ]
};
