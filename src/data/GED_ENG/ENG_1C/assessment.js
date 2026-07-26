// src/data/GED_ENG/ENG_1C/assessment.js
// Lesson 9 check — claims, evidence, fact vs opinion, and evaluating how strong
// each side's support is. Answer key is balanced 2× A / B / C / D.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p1c_bags",
      title: "Ban the Thin Plastic Bag",
      meta: "Editorial • Riverton Town Gazette",
      text: [
        "Our town should ban thin plastic shopping bags. These bags are used for a few minutes and then thrown away, yet they last for hundreds of years in the ground. In the nearby town of Dover, a bag ban cut plastic litter along the river by sixty percent in a single year, according to the town's clean-up records. That is a clear, measured result our council can check for itself.",
        "Some shop owners worry that a ban will slow down business. Yet many shoppers say they do not mind carrying a cloth bag, and paper bags remain available for anyone who forgets one. Frankly, the thin plastic bag is a lazy, ugly habit, and it is time our town grew out of it."
      ],
      glossary: {
        "litter": { def: "Rubbish left lying in an open place.", vn: "Rác vứt bừa", vnDef: "Rác bị bỏ lại ở nơi công cộng." },
        "measured": { def: "Counted or recorded with numbers.", vn: "Được đo lường", vnDef: "Được đếm hoặc ghi lại bằng con số." },
        "council": { def: "The group that governs a town.", vn: "Hội đồng", vnDef: "Nhóm điều hành một thị trấn." }
      }
    },
    {
      id: "p1c_school",
      title: "Start School an Hour Later",
      meta: "Opinion • The Weekly Review",
      text: [
        "High schools should start the day one hour later. Teenagers are biologically wired to fall asleep late, so an early start forces many of them into class before their brains are fully awake. A study of one large district found that after it moved its start time from 7:30 to 8:30, the share of students arriving late fell by a third, and average grades rose slightly.",
        "Critics reply that a later start makes the bus schedule harder and pushes sports practice into the evening. These are real costs. However, the district in the study kept its buses running by adjusting the routes by only twenty minutes, which suggests the problem can be managed. A rested student, in the end, learns more than a tired one."
      ],
      glossary: {
        "biologically": { def: "In a way controlled by the body's natural systems.", vn: "Về mặt sinh học", vnDef: "Theo cách được kiểm soát bởi hệ thống tự nhiên của cơ thể." },
        "district": { def: "A group of schools run together in one area.", vn: "Khu học chánh", vnDef: "Một nhóm trường học được điều hành cùng nhau trong một khu vực." },
        "critics": { def: "People who argue against an idea.", vn: "Người phản đối", vnDef: "Những người lập luận chống lại một ý tưởng." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p1c_bags",
      type: "mcq",
      title: "1. What is the author's main claim?",
      options: [
        { val: "A", text: "A. Plastic bags last for hundreds of years in the ground." },
        { val: "B", text: "B. The town should ban thin plastic shopping bags." },
        { val: "C", text: "C. Shop owners will lose business if bags are banned." },
        { val: "D", text: "D. Paper bags are better for shoppers than cloth bags." }
      ],
      correct: "B",
      expEn: "The claim is the one point the writer wants you to accept. The whole editorial argues for a ban; option A is a supporting fact, and C is the opposing worry.",
      expVn: "Luận điểm là điểm duy nhất mà người viết muốn bạn chấp nhận. Toàn bộ bài xã luận lập luận cho một lệnh cấm; lựa chọn A là sự thật hỗ trợ, và C là lo ngại của phía đối lập."
    },
    {
      id: "q2",
      passageId: "p1c_bags",
      type: "mcq",
      title: "2. Which statement from the passage is a FACT that could be checked?",
      options: [
        { val: "A", text: "A. The thin plastic bag is a lazy, ugly habit." },
        { val: "B", text: "B. It is time our town grew out of plastic bags." },
        { val: "C", text: "C. Many shoppers say they do not mind a cloth bag." },
        { val: "D", text: "D. In Dover, a bag ban cut river litter by sixty percent in a year." }
      ],
      correct: "D",
      expEn: "Option D is a recorded number that the council can verify against Dover's clean-up records. A and B are judgements, and C is a vague report of what \"many\" people say.",
      expVn: "Lựa chọn D là một con số được ghi lại mà hội đồng có thể xác minh với hồ sơ dọn dẹp của Dover. A và B là những đánh giá, và C là báo cáo mơ hồ về điều \"nhiều\" người nói."
    },
    {
      id: "q3",
      passageId: "p1c_bags",
      type: "mcq",
      title: "3. Which is the STRONGEST piece of evidence the author uses?",
      options: [
        { val: "A", text: "A. The measured 60% drop in litter in Dover, taken from town records." },
        { val: "B", text: "B. The author's feeling that plastic bags are ugly." },
        { val: "C", text: "C. The report that many shoppers do not mind." },
        { val: "D", text: "D. The worry that a ban will slow down business." }
      ],
      correct: "A",
      expEn: "A checkable number from an official record is the strongest kind of evidence. A feeling (B) and a vague \"many shoppers\" (C) are far weaker, and D is an objection, not support.",
      expVn: "Một con số có thể kiểm tra từ hồ sơ chính thức là loại bằng chứng mạnh nhất. Một cảm xúc (B) và một \"nhiều người mua\" mơ hồ (C) yếu hơn nhiều, và D là một phản đối, không phải sự hỗ trợ."
    },
    {
      id: "q4",
      passageId: "p1c_bags",
      type: "mcq",
      title: "4. Which phrase shows the author's opinion rather than a fact?",
      options: [
        { val: "A", text: "A. \"used for a few minutes and then thrown away\"" },
        { val: "B", text: "B. \"cut plastic litter ... by sixty percent\"" },
        { val: "C", text: "C. \"a lazy, ugly habit\"" },
        { val: "D", text: "D. \"paper bags remain available\"" }
      ],
      correct: "C",
      expEn: "\"Lazy\" and \"ugly\" are judgement words — they cannot be proven true or false. The other three describe things that could be observed or counted.",
      expVn: "\"Lazy\" và \"ugly\" là những từ đánh giá — chúng không thể được chứng minh đúng hay sai. Ba lựa chọn kia mô tả những điều có thể quan sát hoặc đếm được."
    },
    {
      id: "q5",
      passageId: "p1c_school",
      type: "mcq",
      title: "5. What is the author's main claim?",
      options: [
        { val: "A", text: "A. Teenagers should be told to play fewer sports." },
        { val: "B", text: "B. Bus schedules are impossible to change." },
        { val: "C", text: "C. Early school starts have no effect on grades." },
        { val: "D", text: "D. High schools should start the day one hour later." }
      ],
      correct: "D",
      expEn: "The passage argues throughout for a later start time. A and B are objections the author answers, and C is the opposite of what the study shows.",
      expVn: "Bài văn xuyên suốt lập luận cho một giờ bắt đầu muộn hơn. A và B là những phản đối mà tác giả trả lời, và C là điều ngược lại với những gì nghiên cứu cho thấy."
    },
    {
      id: "q6",
      passageId: "p1c_school",
      type: "mcq",
      title: "6. Which evidence most directly supports the claim that a later start helps?",
      options: [
        { val: "A", text: "A. The author's statement that a rested student learns more." },
        { val: "B", text: "B. The study finding that late arrivals fell by a third and grades rose." },
        { val: "C", text: "C. The complaint that sports practice moves to the evening." },
        { val: "D", text: "D. The point that teenagers are wired to fall asleep late." }
      ],
      correct: "B",
      expEn: "The study reports a measured result after the change — exactly the kind of proof the claim needs. D is background, C is an objection, and A is a general belief.",
      expVn: "Nghiên cứu báo cáo một kết quả đo được sau khi thay đổi — chính xác là loại bằng chứng mà luận điểm cần. D là nền tảng, C là phản đối, và A là một niềm tin chung."
    },
    {
      id: "q7",
      passageId: "p1c_school",
      type: "mcq",
      title: "7. How does the author respond to the worry about bus schedules?",
      options: [
        { val: "A", text: "A. By admitting it is a real cost, then showing the district managed with a 20-minute change." },
        { val: "B", text: "B. By ignoring the worry and changing the subject." },
        { val: "C", text: "C. By arguing that bus service is not important to students." },
        { val: "D", text: "D. By claiming that all sports practice should be cancelled." }
      ],
      correct: "A",
      expEn: "The author concedes the cost is real, then rebuts it with evidence that the routes were adjusted by only twenty minutes. Admitting a valid point before answering it is a concession.",
      expVn: "Tác giả thừa nhận chi phí là có thật, rồi phản bác bằng bằng chứng rằng các tuyến đường chỉ được điều chỉnh hai mươi phút. Thừa nhận một điểm hợp lý trước khi trả lời nó là một sự nhượng bộ."
    },
    {
      id: "q8",
      passageId: "p1c_school",
      type: "mcq",
      title: "8. Which statement in the passage is the WEAKEST as evidence?",
      options: [
        { val: "A", text: "A. Late arrivals fell by a third after the change." },
        { val: "B", text: "B. The district adjusted its bus routes by twenty minutes." },
        { val: "C", text: "C. \"A rested student, in the end, learns more than a tired one.\"" },
        { val: "D", text: "D. Average grades rose slightly after the later start." }
      ],
      correct: "C",
      expEn: "C is a general belief with no number behind it, so it is the weakest support. A, B and D all report specific, checkable outcomes from the district.",
      expVn: "C là một niềm tin chung không có con số phía sau, nên nó là sự hỗ trợ yếu nhất. A, B và D đều báo cáo những kết quả cụ thể, có thể kiểm tra từ khu học chánh."
    }
  ]
};
