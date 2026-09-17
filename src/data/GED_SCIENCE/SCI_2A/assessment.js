// src/data/GED_SCIENCE/SCI_2A/assessment.js
// Timed mixed check for Matter, Atoms & Chemical Reactions. Two short
// experiment passages in the test's own style (rusting nails; dissolving
// sugar) carry five of the ten items; the rest read a curve, an equation and
// the pH scale. Bilingual explanations on every question.

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [
    {
      id: "p_nails",
      title: "Three Nails",
      vnTitle: "Ba Chiếc Đinh",
      meta: "Experiment description",
      text: "A student wanted to find out what makes iron rust. She put three identical iron nails into three test tubes.\nTube 1 held a nail in dry air, with crystals at the bottom that soak up any moisture. Tube 2 held a nail half-covered in tap water, open to the air. Tube 3 held a nail in water that had been boiled to remove the dissolved air, with a layer of oil on top so no new air could reach it.\nAfter one week she looked at the nails. The nails in Tube 1 and Tube 3 were still shiny. The nail in Tube 2 was covered in brown, flaky rust. She dried the nail from Tube 2 and weighed it: it was 0.2 grams heavier than at the start.",
      vnText: "Một học sinh muốn tìm hiểu điều gì làm sắt bị gỉ. Cô đặt ba chiếc đinh sắt giống hệt nhau vào ba ống nghiệm.\nỐng 1 chứa một chiếc đinh trong không khí khô, với các tinh thể ở đáy hút hết hơi ẩm. Ống 2 chứa một chiếc đinh ngập một nửa trong nước máy, mở ra không khí. Ống 3 chứa một chiếc đinh trong nước đã được đun sôi để loại bỏ không khí hòa tan, phía trên có một lớp dầu để không khí mới không lọt vào được.\nSau một tuần cô quan sát các chiếc đinh. Đinh trong Ống 1 và Ống 3 vẫn sáng bóng. Đinh trong Ống 2 phủ đầy gỉ sét màu nâu, bong tróc. Cô lau khô chiếc đinh từ Ống 2 và cân: nó nặng hơn lúc đầu 0,2 gam.",
      glossary: {
        "moisture": { vn: "Hơi ẩm", def: "Small amounts of water in the air.", vnDef: "Lượng nước nhỏ trong không khí." },
        "flaky": { vn: "Bong tróc", def: "Breaking off in thin pieces.", vnDef: "Bong ra thành từng mảnh mỏng." },
      },
    },
    {
      id: "p_sugar",
      title: "How Much Sugar Will Dissolve?",
      vnTitle: "Bao nhiêu Đường sẽ Tan?",
      meta: "Experiment description with data",
      text: "A student measured how much sugar could dissolve in 100 mL of water at different temperatures. He added sugar a spoon at a time, stirring, until no more would dissolve and grains sat at the bottom.\nHis results: at 20 °C, 200 g of sugar dissolved. At 40 °C, 240 g dissolved. At 60 °C, 290 g dissolved. At 80 °C, 360 g dissolved.\nHe also noticed that stirring made the sugar dissolve faster, but stirring did not change the total amount that would dissolve at a given temperature.",
      vnText: "Một học sinh đo lượng đường có thể tan trong 100 mL nước ở các nhiệt độ khác nhau. Cậu thêm đường từng thìa một, vừa khuấy, cho đến khi không tan thêm được nữa và các hạt đường đọng dưới đáy.\nKết quả: ở 20 °C, 200 g đường tan. Ở 40 °C, 240 g tan. Ở 60 °C, 290 g tan. Ở 80 °C, 360 g tan.\nCậu cũng nhận thấy khuấy làm đường tan nhanh hơn, nhưng khuấy không làm thay đổi tổng lượng đường tan được ở một nhiệt độ nhất định.",
      glossary: {
        "dissolve": { vn: "Tan", def: "To mix into a liquid so evenly that it seems to disappear.", vnDef: "Hòa vào chất lỏng đều đến mức như biến mất." },
        "grains": { vn: "Hạt", def: "Small hard pieces, like sugar crystals.", vnDef: "Những mảnh cứng nhỏ, như tinh thể đường." },
      },
    },
  ],
  questions: [
    {
      id: "q1_mcq_rust_needs",
      type: "mcq",
      passageId: "p_nails",
      title: "1. Based on the results of the three tubes, what does iron need in order to rust?",
      options: [
        { val: "A", text: "A. Water only" },
        { val: "B", text: "B. Air only" },
        { val: "C", text: "C. Both air and water" },
        { val: "D", text: "D. Oil" },
      ],
      correct: "C",
      expEn: "Only Tube 2 rusted, and it was the only tube with BOTH water and air. Tube 1 had air but no water; Tube 3 had water but no air. Neither rusted, so both are needed.",
      expVn: "Chỉ Ống 2 bị gỉ, và đó là ống duy nhất có CẢ nước lẫn không khí. Ống 1 có không khí nhưng không có nước; Ống 3 có nước nhưng không có không khí. Cả hai đều không gỉ, nên cần cả hai.",
    },
    {
      id: "q2_mcq_rust_mass",
      type: "mcq",
      passageId: "p_nails",
      title: "2. The rusty nail was 0.2 g heavier than before. Which explanation fits the law of conservation of mass?",
      options: [
        { val: "A", text: "A. Atoms of oxygen from the air joined with the iron, adding their mass" },
        { val: "B", text: "B. The scale must have been broken" },
        { val: "C", text: "C. Rusting creates new atoms out of nothing" },
        { val: "D", text: "D. The water made the nail bigger" },
      ],
      correct: "A",
      expEn: "Mass is never created. The extra 0.2 g came from somewhere — oxygen (and water) atoms from the air bonded to the iron to make rust, so their mass is now part of the nail. The tube as a whole did not gain mass.",
      expVn: "Khối lượng không bao giờ được tạo ra từ hư không. 0,2 g thêm phải đến từ đâu đó — nguyên tử oxy (và nước) từ không khí liên kết với sắt để tạo gỉ, nên khối lượng của chúng giờ là một phần của chiếc đinh. Cả ống nghiệm không tăng khối lượng.",
    },
    {
      id: "q3_mcq_rust_chemical",
      type: "mcq",
      passageId: "p_nails",
      title: "3. Rusting is a chemical change. Which observation in the passage is the best evidence for that?",
      options: [
        { val: "A", text: "A. The nails were identical at the start" },
        { val: "B", text: "B. The oil floated on the water" },
        { val: "C", text: "C. The experiment took one week" },
        { val: "D", text: "D. A new brown, flaky substance formed on the nail" },
      ],
      correct: "D",
      expEn: "The sign of a chemical change is a NEW substance. Shiny grey iron became brown, flaky rust — a different substance with different properties. The other options describe the set-up, not a change.",
      expVn: "Dấu hiệu của biến đổi hóa học là một chất MỚI. Sắt xám sáng bóng trở thành gỉ nâu bong tróc — một chất khác với tính chất khác. Các phương án khác mô tả cách bố trí, không phải sự biến đổi.",
    },
    {
      id: "q4_mcq_sugar_value",
      type: "mcq",
      passageId: "p_sugar",
      title: "4. According to the data, how much sugar dissolved in 100 mL of water at 60 °C?",
      options: [
        { val: "A", text: "A. 240 g" },
        { val: "B", text: "B. 290 g" },
        { val: "C", text: "C. 360 g" },
        { val: "D", text: "D. 200 g" },
      ],
      correct: "B",
      expEn: "Find the matching temperature in the results: \"At 60 °C, 290 g dissolved.\" Reading one value from a table or list is the most common Science question — match the row exactly.",
      expVn: "Tìm nhiệt độ tương ứng trong kết quả: \"Ở 60 °C, 290 g tan.\" Đọc một giá trị từ bảng hoặc danh sách là câu hỏi Khoa học phổ biến nhất — khớp đúng dòng.",
    },
    {
      id: "q5_mcq_sugar_conclusion",
      type: "mcq",
      passageId: "p_sugar",
      title: "5. Which conclusion is supported by ALL of the student's observations?",
      options: [
        { val: "A", text: "A. Warmer water dissolves more sugar; stirring only changes how fast it dissolves" },
        { val: "B", text: "B. Stirring makes more sugar dissolve in total" },
        { val: "C", text: "C. Temperature has no effect on how much sugar dissolves" },
        { val: "D", text: "D. Cold water dissolves the most sugar" },
      ],
      correct: "A",
      expEn: "The numbers rise with temperature (200 → 240 → 290 → 360 g), so warmer water dissolves more. The last sentence says stirring changed the speed but not the total. Only A matches both facts.",
      expVn: "Các con số tăng theo nhiệt độ (200 → 240 → 290 → 360 g), nên nước ấm hơn hòa tan nhiều hơn. Câu cuối nói khuấy thay đổi tốc độ chứ không thay đổi tổng lượng. Chỉ A khớp cả hai dữ kiện.",
    },
    {
      id: "q6_inline_heating_curve",
      type: "inline",
      title: "6. Complete the sentences about a heating curve.",
      options: [],
      textParts: [
        "When ice is heated, the line goes flat at 0 °C because the ice is ",
        ". In the final state, the particles are ",
        " and moving fast.",
      ],
      blanks: {
        "1": {
          correct: "melting",
          options: [
            { val: "melting", text: "melting" },
            { val: "boiling", text: "boiling" },
            { val: "freezing", text: "freezing" },
          ],
        },
        "2": {
          correct: "far apart",
          options: [
            { val: "far apart", text: "far apart" },
            { val: "in a fixed pattern", text: "in a fixed pattern" },
          ],
        },
      },
      expEn: "0 °C is the melting point of water, so the first flat part is melting (solid → liquid). After boiling, the water is a gas, and gas particles are far apart and fast-moving.",
      expVn: "0 °C là điểm nóng chảy của nước, nên đoạn phẳng đầu tiên là tan chảy (rắn → lỏng). Sau khi sôi, nước là chất khí, và các hạt khí cách xa nhau, chuyển động nhanh.",
    },
    {
      id: "q7_mcq_element",
      type: "mcq",
      title: "7. Which of these is an ELEMENT — made of only one kind of atom?",
      options: [
        { val: "A", text: "A. Water (H₂O)" },
        { val: "B", text: "B. Salt water" },
        { val: "C", text: "C. Oxygen (O₂)" },
        { val: "D", text: "D. Air" },
      ],
      correct: "C",
      expEn: "Oxygen gas contains only oxygen atoms, so it is an element. Water is a compound (hydrogen joined to oxygen). Salt water and air are mixtures — several substances together, not joined.",
      expVn: "Khí oxy chỉ chứa nguyên tử oxy, nên là nguyên tố. Nước là hợp chất (hydro liên kết với oxy). Nước muối và không khí là hỗn hợp — nhiều chất ở cùng nhau, không liên kết.",
    },
    {
      id: "q8_mcq_count_atoms",
      type: "mcq",
      title: "8. In the reaction 2H₂ + O₂ → 2H₂O, how many oxygen atoms are on each side of the arrow?",
      options: [
        { val: "A", text: "A. 1 before, 2 after" },
        { val: "B", text: "B. 2 before, 1 after" },
        { val: "C", text: "C. 1 before, 1 after" },
        { val: "D", text: "D. 2 before, 2 after" },
      ],
      correct: "D",
      expEn: "Before: O₂ is one molecule with 2 oxygen atoms. After: 2H₂O means two water molecules, each with 1 oxygen atom, so 2 × 1 = 2. Same count on both sides — atoms are conserved.",
      expVn: "Trước: O₂ là một phân tử có 2 nguyên tử oxy. Sau: 2H₂O nghĩa là hai phân tử nước, mỗi phân tử có 1 nguyên tử oxy, nên 2 × 1 = 2. Số đếm giống nhau ở hai vế — nguyên tử được bảo toàn.",
    },
    {
      id: "q9_mcq_ph",
      type: "mcq",
      title: "9. A soft drink has a pH of 3. What does this tell you?",
      options: [
        { val: "A", text: "A. It is a base" },
        { val: "B", text: "B. It is an acid" },
        { val: "C", text: "C. It is neutral" },
        { val: "D", text: "D. It is pure water" },
      ],
      correct: "B",
      expEn: "On the pH scale, 7 is neutral (pure water), below 7 is acid and above 7 is base. A pH of 3 is well below 7, so the drink is an acid — which is why it tastes sharp and sour.",
      expVn: "Trên thang pH, 7 là trung tính (nước tinh khiết), dưới 7 là axit và trên 7 là bazơ. pH 3 thấp hơn 7 nhiều, nên đồ uống là axit — vì thế nó có vị chua gắt.",
    },
    {
      id: "q10_mcq_periodic",
      type: "mcq",
      title: "10. An element's tile on the periodic table shows the number 8 and the symbol O. What does the 8 tell you?",
      options: [
        { val: "A", text: "A. The element has 8 letters in its name" },
        { val: "B", text: "B. Each atom of the element has 8 protons" },
        { val: "C", text: "C. The element boils at 8 °C" },
        { val: "D", text: "D. The element is a metal" },
      ],
      correct: "B",
      expEn: "The number on a tile is the atomic number — the number of protons in one atom of that element. Oxygen has 8 protons. The symbol is O, and oxygen is a non-metal on the right side of the table.",
      expVn: "Con số trên ô là số hiệu nguyên tử — số proton trong một nguyên tử của nguyên tố đó. Oxy có 8 proton. Ký hiệu là O, và oxy là phi kim ở bên phải bảng.",
    },
  ],
};
