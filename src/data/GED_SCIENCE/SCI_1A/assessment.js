// src/data/GED_SCIENCE/SCI_1A/assessment.js
// Timed mixed check for Cells & the Human Body. Two short GED-style
// experiment passages (a blood-sugar test and a clinic study) plus stand-alone
// items. Bilingual explanations on every question; answer key balanced A–D.
// Each passage question restates the key numbers in its stem, so it can be
// answered even on a screen that shows the stem alone.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [
    {
      id: "sci1a_bp1",
      title: "Two Breakfasts",
      vnTitle: "Hai Bữa sáng",
      meta: "Experiment report",
      text: "A nurse wanted to know how different breakfasts change blood sugar. Ten healthy volunteers took part. On Monday, each person ate a bowl of sugary cereal. On Tuesday, the same people ate two eggs with toast. Both breakfasts had about 300 calories, and everyone ate at 8:00 a.m. after the same night of sleep.\nThe nurse measured each person's blood sugar (in mg/dL) before eating and then every hour. The average results were:\nCereal: 90 before eating, 160 at 1 hour, 120 at 2 hours, 95 at 3 hours.\nEggs and toast: 90 before eating, 110 at 1 hour, 100 at 2 hours, 92 at 3 hours.\nBy three hours, both groups were back near their starting level.",
      vnText: "Một y tá muốn biết các bữa sáng khác nhau thay đổi đường huyết như thế nào. Mười tình nguyện viên khỏe mạnh tham gia. Thứ Hai, mỗi người ăn một bát ngũ cốc nhiều đường. Thứ Ba, cũng những người đó ăn hai quả trứng với bánh mì nướng. Cả hai bữa sáng đều khoảng 300 calo, và mọi người ăn lúc 8 giờ sáng sau một đêm ngủ như nhau.\nY tá đo đường huyết của mỗi người (mg/dL) trước khi ăn và sau đó mỗi giờ. Kết quả trung bình là:\nNgũ cốc: 90 trước khi ăn, 160 sau 1 giờ, 120 sau 2 giờ, 95 sau 3 giờ.\nTrứng và bánh mì: 90 trước khi ăn, 110 sau 1 giờ, 100 sau 2 giờ, 92 sau 3 giờ.\nĐến 3 giờ, cả hai nhóm đều trở về gần mức ban đầu.",
    },
    {
      id: "sci1a_bp2",
      title: "The Clinic Study",
      vnTitle: "Nghiên cứu tại Phòng khám",
      meta: "Health report",
      text: "A clinic studied 200 patients who came in with the flu, a disease caused by a virus. The doctors split them into two equal groups. Group 1 was given a five-day course of antibiotics. Group 2 was given no medicine, only rest and fluids.\nThe doctors recorded how many days each patient stayed sick. Group 1 (antibiotics) was sick for an average of 6.1 days. Group 2 (no medicine) was sick for an average of 6.0 days. Eight patients in Group 1 also reported stomach problems from the medicine; none in Group 2 did.",
      vnText: "Một phòng khám nghiên cứu 200 bệnh nhân đến khám vì cúm, một bệnh do virus gây ra. Các bác sĩ chia họ thành hai nhóm bằng nhau. Nhóm 1 được cho uống kháng sinh trong năm ngày. Nhóm 2 không được cho thuốc, chỉ nghỉ ngơi và uống nước.\nCác bác sĩ ghi lại mỗi bệnh nhân ốm bao nhiêu ngày. Nhóm 1 (kháng sinh) ốm trung bình 6,1 ngày. Nhóm 2 (không thuốc) ốm trung bình 6,0 ngày. Tám bệnh nhân ở Nhóm 1 còn báo cáo bị đau bụng do thuốc; không ai ở Nhóm 2 bị.",
    },
  ],
  questions: [
    {
      id: "q1_mcq_independent",
      type: "mcq",
      passageId: "sci1a_bp1",
      title: "1. In the breakfast experiment (cereal on Monday, eggs and toast on Tuesday, same people, same time), what was the INDEPENDENT variable — the thing changed on purpose?",
      options: [
        { val: "A", text: "A. The blood sugar level" },
        { val: "B", text: "B. The time of day" },
        { val: "C", text: "C. The type of breakfast" },
        { val: "D", text: "D. The number of volunteers" },
      ],
      correct: "C",
      expEn: "The nurse changed only one thing on purpose: the breakfast. Blood sugar was measured (dependent variable); the time, the people and the calories were kept the same (controls).",
      expVn: "Y tá chỉ cố ý thay đổi một thứ: bữa sáng. Đường huyết là thứ được đo (biến phụ thuộc); thời gian, người và lượng calo được giữ nguyên (đối chứng).",
    },
    {
      id: "q2_mcq_bigger_rise",
      type: "mcq",
      passageId: "sci1a_bp1",
      title: "2. At 1 hour, blood sugar was 160 after cereal and 110 after eggs and toast (both started at 90). Which statement does the data support?",
      options: [
        { val: "A", text: "A. The sugary cereal caused a much bigger rise in blood sugar" },
        { val: "B", text: "B. The eggs caused a much bigger rise in blood sugar" },
        { val: "C", text: "C. Both breakfasts raised blood sugar by the same amount" },
        { val: "D", text: "D. Neither breakfast changed blood sugar" },
      ],
      correct: "A",
      expEn: "Subtract from the start: cereal 160 − 90 = 70, eggs 110 − 90 = 20. The cereal rise was more than three times bigger. Sugary food puts sugar into the blood quickly.",
      expVn: "Trừ đi mức ban đầu: ngũ cốc 160 − 90 = 70, trứng 110 − 90 = 20. Mức tăng của ngũ cốc lớn hơn ba lần. Thức ăn nhiều đường đưa đường vào máu nhanh.",
    },
    {
      id: "q3_mcq_homeostasis",
      type: "mcq",
      passageId: "sci1a_bp1",
      title: "3. After cereal, blood sugar peaked at 160 and then fell to 95 by 3 hours. What BEST explains the fall?",
      options: [
        { val: "A", text: "A. The volunteers ate a second breakfast" },
        { val: "B", text: "B. The nurse measured it wrong the first time" },
        { val: "C", text: "C. The sugar left the body in sweat" },
        { val: "D", text: "D. The body released insulin, moving sugar from the blood into cells" },
      ],
      correct: "D",
      expEn: "This is homeostasis. When blood sugar rises, the body releases insulin, which moves the sugar into cells, and the level returns to normal. Nothing in the passage supports a second meal or a bad reading.",
      expVn: "Đây là cân bằng nội môi. Khi đường huyết tăng, cơ thể tiết insulin, đưa đường vào tế bào, và mức đường trở lại bình thường. Không có gì trong bài ủng hộ bữa ăn thứ hai hay đo sai.",
    },
    {
      id: "q4_mcq_plant_cell",
      type: "mcq",
      title: "4. A student looks at a cell under a microscope and sees a stiff cell wall and green chloroplasts. What can she conclude?",
      options: [
        { val: "A", text: "A. It is an animal cell" },
        { val: "B", text: "B. It is a plant cell" },
        { val: "C", text: "C. It has no nucleus" },
        { val: "D", text: "D. It cannot release energy" },
      ],
      correct: "B",
      expEn: "Only plant cells have a cell wall and chloroplasts. Plant cells still have a nucleus and mitochondria, so C and D are wrong.",
      expVn: "Chỉ tế bào thực vật có thành tế bào và lục lạp. Tế bào thực vật vẫn có nhân và ty thể, nên C và D sai.",
    },
    {
      id: "q5_inline_levels",
      type: "inline",
      title: "5. Complete the levels of the body, from smallest to largest.",
      options: [],
      textParts: [
        "A cell → a ",
        " (similar cells working together) → an ",
        " such as the heart → a system.",
      ],
      blanks: {
        "1": {
          correct: "tissue",
          options: [
            { val: "tissue", text: "tissue" },
            { val: "organ", text: "organ" },
            { val: "nucleus", text: "nucleus" },
          ],
        },
        "2": {
          correct: "organ",
          options: [
            { val: "organ", text: "organ" },
            { val: "tissue", text: "tissue" },
            { val: "pathogen", text: "pathogen" },
          ],
        },
      },
      expEn: "Cell → tissue → organ → system. A tissue is many similar cells; an organ (like the heart) is several tissues; a system is organs working together.",
      expVn: "Tế bào → mô → cơ quan → hệ cơ quan. Mô là nhiều tế bào giống nhau; cơ quan (như tim) là nhiều mô; hệ cơ quan là các cơ quan cùng hoạt động.",
    },
    {
      id: "q6_mcq_handoff",
      type: "mcq",
      title: "6. The respiratory system and the circulatory system work together. Where does the hand-off between them happen?",
      options: [
        { val: "A", text: "A. In the stomach, where food gives the blood oxygen" },
        { val: "B", text: "B. In the lungs, where oxygen passes from the air into the blood" },
        { val: "C", text: "C. In the brain, where nerves make oxygen" },
        { val: "D", text: "D. In the bones, where blood is stored" },
      ],
      correct: "B",
      expEn: "The lungs (respiratory) bring in air; in the lungs, oxygen moves into the blood (circulatory), which the heart then pumps to the body. That is the hand-off.",
      expVn: "Phổi (hô hấp) đưa không khí vào; trong phổi, oxy đi vào máu (tuần hoàn), rồi tim bơm đi khắp cơ thể. Đó là điểm bàn giao.",
    },
    {
      id: "q7_mcq_why_no_difference",
      type: "mcq",
      passageId: "sci1a_bp2",
      title: "7. In the clinic study, flu patients given antibiotics were sick for 6.1 days and patients given nothing were sick for 6.0 days. Why did the antibiotics make no difference?",
      options: [
        { val: "A", text: "A. The dose was too small" },
        { val: "B", text: "B. The patients did not rest enough" },
        { val: "C", text: "C. The flu is caused by a virus, and antibiotics only kill bacteria" },
        { val: "D", text: "D. Antibiotics take more than a week to work" },
      ],
      correct: "C",
      expEn: "The passage says the flu is caused by a virus. Antibiotics kill bacteria and do nothing to viruses, so both groups recovered at the same rate no matter the dose.",
      expVn: "Bài đọc nói cúm do virus gây ra. Kháng sinh tiêu diệt vi khuẩn và không làm gì được virus, nên cả hai nhóm hồi phục với tốc độ như nhau dù liều thế nào.",
    },
    {
      id: "q8_mcq_conclusion",
      type: "mcq",
      passageId: "sci1a_bp2",
      title: "8. In the same study, 8 of the 100 antibiotic patients also got stomach problems from the medicine. Which is the BEST conclusion from the data?",
      options: [
        { val: "A", text: "A. Antibiotics did not shorten the flu and caused side effects for some patients" },
        { val: "B", text: "B. Antibiotics cured the flu one day faster" },
        { val: "C", text: "C. Rest and fluids are dangerous" },
        { val: "D", text: "D. Everyone with the flu should take antibiotics" },
      ],
      correct: "A",
      expEn: "A good conclusion states only what the data shows: no real difference in sick days (6.1 vs 6.0), plus side effects in 8 patients. B, C and D are not supported by the numbers.",
      expVn: "Một kết luận tốt chỉ nêu điều dữ liệu cho thấy: không có khác biệt thật về số ngày ốm (6,1 so với 6,0), cộng thêm tác dụng phụ ở 8 bệnh nhân. B, C và D không được các con số ủng hộ.",
    },
    {
      id: "q9_inline_calories",
      type: "inline",
      title: "9. Complete the rule about calories.",
      options: [],
      textParts: [
        "A calorie measures how much ",
        " a food gives the body. If you take in more calories than you use, the extra is stored as fat and your weight goes ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "energy",
          options: [
            { val: "energy", text: "energy" },
            { val: "water", text: "water" },
            { val: "oxygen", text: "oxygen" },
          ],
        },
        "2": {
          correct: "up",
          options: [
            { val: "up", text: "up" },
            { val: "down", text: "down" },
          ],
        },
      },
      expEn: "Calories measure energy. Calories in greater than calories used means the extra is stored as fat, so weight goes up.",
      expVn: "Calo đo năng lượng. Nạp vào nhiều hơn dùng hết nghĩa là phần dư được tích thành mỡ, nên cân nặng tăng.",
    },
    {
      id: "q10_mcq_diet",
      type: "mcq",
      title: "10. A man eats about 2,500 calories a day but his body uses only 2,000. His doctor says his diet is mostly white bread and sweet drinks. Which change fits BOTH problems?",
      options: [
        { val: "A", text: "A. Eat more sweet drinks to get more energy" },
        { val: "B", text: "B. Stop eating completely for a week" },
        { val: "C", text: "C. Keep the same food but eat it later at night" },
        { val: "D", text: "D. Cut the sweet drinks and add vegetables, fruit and protein" },
      ],
      correct: "D",
      expEn: "He takes in 500 calories more than he uses, and his food is low in nutrients. Cutting sugary drinks lowers calories, and vegetables, fruit and protein make the diet balanced. Not eating at all is unsafe, and timing does not change the total.",
      expVn: "Anh ấy nạp nhiều hơn 500 calo so với mức dùng, và thức ăn ít chất dinh dưỡng. Bỏ đồ uống ngọt giảm calo, còn rau, trái cây và protein làm chế độ ăn cân bằng. Nhịn ăn hoàn toàn thì không an toàn, và giờ ăn không thay đổi tổng lượng.",
    },
  ],
};
