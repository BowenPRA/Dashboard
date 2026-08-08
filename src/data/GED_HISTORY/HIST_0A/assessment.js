// src/data/GED_HISTORY/HIST_0A/assessment.js
// Timed mixed check for Reading Social Studies Sources. Text-based items (the
// skill transfers to any source), bilingual explanations on every question.

export const assessment = {
  timeLimit: 2700, // 45 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_primary",
      type: "mcq",
      title: "1. Which of these is a PRIMARY source about World War II?",
      options: [
        { val: "A", text: "A. A letter written home by a soldier in 1943" },
        { val: "B", text: "B. A history textbook written in 2010" },
        { val: "C", text: "C. A documentary film made last year" },
        { val: "D", text: "D. An encyclopedia article about the war" },
      ],
      correct: "A",
      expEn: "A primary source is made by someone who was there at the time. The soldier's 1943 letter fits; the textbook, documentary and encyclopedia were all made later by people studying the war, so they are secondary.",
      expVn: "Nguồn sơ cấp do người có mặt lúc đó tạo ra. Lá thư năm 1943 của người lính phù hợp; sách giáo khoa, phim tài liệu và bách khoa toàn thư đều được làm sau này bởi người nghiên cứu, nên là thứ cấp.",
    },
    {
      id: "q2_mcq_fact",
      type: "mcq",
      title: "2. Which statement is a FACT rather than an opinion?",
      options: [
        { val: "A", text: "A. The Constitution is the greatest document ever written." },
        { val: "B", text: "B. The Constitution was signed in 1787." },
        { val: "C", text: "C. Everyone should read the Constitution." },
        { val: "D", text: "D. The Constitution is too hard to understand." },
      ],
      correct: "B",
      expEn: "A fact can be checked and proven. The signing date can be confirmed. The others use judgment words (greatest, should, too hard) that cannot be proven, so they are opinions.",
      expVn: "Sự thật có thể kiểm chứng và chứng minh. Ngày ký có thể xác nhận. Các câu khác dùng từ phán xét (vĩ đại nhất, nên, quá khó) không thể chứng minh, nên là ý kiến.",
    },
    {
      id: "q3_inline_source_types",
      type: "inline",
      title: "3. Complete the sentence about source types.",
      options: [],
      textParts: [
        "A photograph taken during an event is a ",
        " source, while a textbook written about it years later is a ",
        " source.",
      ],
      blanks: {
        "1": {
          correct: "primary",
          options: [
            { val: "primary", text: "primary" },
            { val: "secondary", text: "secondary" },
          ],
        },
        "2": {
          correct: "secondary",
          options: [
            { val: "secondary", text: "secondary" },
            { val: "primary", text: "primary" },
          ],
        },
      },
      expEn: "Made during the event = primary. Made later by someone studying it = secondary.",
      expVn: "Tạo ra trong sự kiện = sơ cấp. Tạo ra sau này bởi người nghiên cứu = thứ cấp.",
    },
    {
      id: "q4_mcq_opinion_words",
      type: "mcq",
      title: "4. Which word is the best clue that a sentence is giving an OPINION?",
      options: [
        { val: "A", text: "A. \"in 1865\"" },
        { val: "B", text: "B. \"measured\"" },
        { val: "C", text: "C. \"best\"" },
        { val: "D", text: "D. \"percent\"" },
      ],
      correct: "C",
      expEn: "Judgment words like best, worst, should and beautiful signal an opinion. Dates, measurements and percentages point to facts you can check.",
      expVn: "Các từ phán xét như hay nhất, tệ nhất, nên và đẹp báo hiệu ý kiến. Ngày tháng, số đo và phần trăm chỉ tới sự thật kiểm chứng được.",
    },
    {
      id: "q5_mcq_cartoon_symbol",
      type: "mcq",
      title: "5. In a political cartoon, what is a SYMBOL?",
      options: [
        { val: "A", text: "A. A picture that stands for a bigger idea" },
        { val: "B", text: "B. The date the cartoon was drawn" },
        { val: "C", text: "C. The name of the newspaper" },
        { val: "D", text: "D. A mistake made by the artist" },
      ],
      correct: "A",
      expEn: "A symbol is a picture that stands for a bigger idea — a dove for peace, a chain for slavery, a dollar sign for money. Spotting symbols is the first step in reading a cartoon.",
      expVn: "Biểu tượng là hình ảnh đại diện cho ý lớn hơn — chim bồ câu cho hòa bình, sợi xích cho chế độ nô lệ, dấu đô la cho tiền. Nhận ra biểu tượng là bước đầu để đọc một bức biếm họa.",
    },
    {
      id: "q6_mcq_bias",
      type: "mcq",
      title: "6. A newspaper owned by one political party praises only that party's leaders. This is an example of —",
      options: [
        { val: "A", text: "A. a primary source with no point of view" },
        { val: "B", text: "B. bias" },
        { val: "C", text: "C. a proven fact" },
        { val: "D", text: "D. a secondary source that must be true" },
      ],
      correct: "B",
      expEn: "Favoring one side unfairly is bias. A source can still be useful, but you must read it knowing it takes a side and may leave out the other view.",
      expVn: "Nghiêng về một phía một cách không công bằng là thiên vị. Nguồn vẫn có thể hữu ích, nhưng bạn phải đọc nó với ý thức rằng nó đứng về một phía và có thể bỏ qua quan điểm kia.",
    },
    {
      id: "q7_mcq_map_legend",
      type: "mcq",
      title: "7. To understand what the colors on a map mean, you should read the —",
      options: [
        { val: "A", text: "A. legend (key)" },
        { val: "B", text: "B. page number" },
        { val: "C", text: "C. author's name" },
        { val: "D", text: "D. price" },
      ],
      correct: "A",
      expEn: "The legend, or key, explains what each color and symbol on the map stands for. Without it, the colors have no meaning.",
      expVn: "Chú giải giải thích mỗi màu và ký hiệu trên bản đồ đại diện cho điều gì. Không có nó, màu sắc chẳng có ý nghĩa.",
    },
    {
      id: "q8_mcq_infer",
      type: "mcq",
      title: "8. A photo shows a family in worn clothes outside a broken-down car with all their belongings. You are NOT told they are poor. Deciding they are poor from these clues is called —",
      options: [
        { val: "A", text: "A. inferring" },
        { val: "B", text: "B. voting" },
        { val: "C", text: "C. copying" },
        { val: "D", text: "D. guessing with no reason" },
      ],
      correct: "A",
      expEn: "Inferring is working out something not stated directly, using clues in the source. The worn clothes and belongings are the clues; poverty is the supported inference.",
      expVn: "Suy luận là rút ra điều không được nói trực tiếp, dựa vào manh mối trong nguồn. Quần áo cũ và đồ đạc là manh mối; sự nghèo khó là suy luận có căn cứ.",
    },
    {
      id: "q9_inline_point_of_view",
      type: "inline",
      title: "9. Complete the sentence about point of view.",
      options: [],
      textParts: [
        "A king and a poor farmer would describe the same new tax from a different ",
        ", so each account may show ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "point of view",
          options: [
            { val: "point of view", text: "point of view" },
            { val: "date", text: "date" },
            { val: "legend", text: "legend" },
          ],
        },
        "2": {
          correct: "bias",
          options: [
            { val: "bias", text: "bias" },
            { val: "a legend", text: "a legend" },
            { val: "a fact", text: "a fact" },
          ],
        },
      },
      expEn: "People in different positions see the same event differently — that is point of view — and it can lead each account to show bias toward one side.",
      expVn: "Người ở vị trí khác nhau nhìn cùng sự kiện theo cách khác nhau — đó là quan điểm — và điều đó có thể khiến mỗi bản tường thuật thiên vị về một phía.",
    },
    {
      id: "q10_mcq_best_practice",
      type: "mcq",
      title: "10. You find two sources that disagree about an event. What is the best thing to do?",
      options: [
        { val: "A", text: "A. Believe whichever one is longer" },
        { val: "B", text: "B. Believe the first one you read" },
        { val: "C", text: "C. Ignore both and skip the question" },
        { val: "D", text: "D. Compare them, check who made each and look for facts vs opinions" },
      ],
      correct: "D",
      expEn: "Good source work means comparing sources, checking who made each one and their point of view, and separating provable facts from opinions — not just trusting length or order.",
      expVn: "Làm việc tốt với nguồn nghĩa là so sánh các nguồn, kiểm tra ai tạo ra mỗi nguồn và quan điểm của họ, và tách sự thật kiểm chứng được khỏi ý kiến — không chỉ tin vào độ dài hay thứ tự.",
    },
  ],
};
