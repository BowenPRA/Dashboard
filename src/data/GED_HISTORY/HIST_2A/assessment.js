// src/data/GED_HISTORY/HIST_2A/assessment.js
// Timed mixed check for Foundations of Government. Two short GED-style sources
// — a plain-English paraphrase of two constitutional clauses, and a modern
// civics scenario — plus stand-alone items. Bilingual explanations throughout.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [
    {
      id: "src_constitution_plain",
      title: "From the Constitution, in Plain English",
      vnTitle: "Trích Hiến pháp, diễn đạt đơn giản",
      meta: "Article I, Section 7 and Article II, Section 2 (paraphrased)",
      text: "Article I, Section 7: Every bill that passes the House of Representatives and the Senate must be sent to the President before it becomes a law. If the President approves, he signs it. If not, he returns it with his objections to the house where it started. If two-thirds of that house and two-thirds of the other house then agree to pass the bill, it becomes a law. Article II, Section 2: The President shall be commander in chief of the army and navy. He shall have power, with the advice and consent of the Senate, to make treaties, provided two-thirds of the senators present agree; and he shall nominate, and with the consent of the Senate appoint, ambassadors, judges of the Supreme Court, and all other officers of the United States.",
      vnText: "Điều I, Khoản 7: Mọi dự luật được Hạ viện và Thượng viện thông qua phải được gửi tới Tổng thống trước khi trở thành luật. Nếu Tổng thống chấp thuận, ông ký. Nếu không, ông trả lại kèm ý kiến phản đối cho viện nơi dự luật bắt đầu. Nếu hai phần ba viện đó và hai phần ba viện kia sau đó đồng ý thông qua dự luật, nó trở thành luật. Điều II, Khoản 2: Tổng thống là tổng tư lệnh lục quân và hải quân. Ông có quyền, với sự cố vấn và chấp thuận của Thượng viện, ký các hiệp ước, miễn là hai phần ba số thượng nghị sĩ có mặt đồng ý; và ông đề cử, và với sự chấp thuận của Thượng viện, bổ nhiệm các đại sứ, thẩm phán Tòa án Tối cao, và mọi quan chức khác của Hoa Kỳ.",
      glossary: {
        "objections": { vn: "Ý kiến phản đối", def: "Reasons for saying no." },
        "consent": { vn: "Sự chấp thuận", def: "Agreement; permission." },
        "nominate": { vn: "Đề cử", def: "To officially suggest a person for a job." },
      },
    },
    {
      id: "src_scenario_speed_limit",
      title: "A Modern Scenario",
      vnTitle: "Một Tình huống Hiện đại",
      meta: "Civics scenario",
      text: "The state of Ohio passes a law lowering the speed limit on all state highways to 55 miles per hour. A trucking company sues, claiming the law is unfair. A federal court hears the case and rules that setting speed limits on state roads is a power that belongs to the states, so the law stands. Meanwhile, the U.S. Congress passes a bill raising the tax on gasoline across the whole country. The President signs it, and the Internal Revenue Service — a department of the executive branch — begins collecting the new tax.",
      vnText: "Tiểu bang Ohio thông qua một đạo luật hạ giới hạn tốc độ trên mọi đường cao tốc của bang xuống 55 dặm/giờ. Một công ty vận tải kiện, cho rằng đạo luật không công bằng. Một tòa án liên bang xét xử vụ việc và phán quyết rằng đặt giới hạn tốc độ trên đường của bang là quyền thuộc về các tiểu bang, nên đạo luật vẫn có hiệu lực. Trong khi đó, Quốc hội Hoa Kỳ thông qua một dự luật tăng thuế xăng trên toàn quốc. Tổng thống ký, và Sở Thuế vụ — một cơ quan thuộc nhánh hành pháp — bắt đầu thu khoản thuế mới.",
      glossary: {
        "sues": { vn: "Kiện", def: "Takes someone to court." },
        "stands": { vn: "Vẫn có hiệu lực", def: "Stays in force; is not cancelled." },
      },
    },
  ],
  questions: [
    {
      id: "q1_mcq_veto_clause",
      passageId: "src_constitution_plain",
      type: "mcq",
      title: "1. According to Article I, Section 7, what happens if the President does NOT approve a bill?",
      options: [
        { val: "A", text: "A. The bill becomes law anyway after ten days." },
        { val: "B", text: "B. The bill is sent to the Supreme Court." },
        { val: "C", text: "C. The bill goes back to Congress, which can pass it with two-thirds of both houses." },
        { val: "D", text: "D. The bill can never be voted on again." },
      ],
      correct: "C",
      expEn: "The clause says the President returns the bill 'with his objections', and if two-thirds of each house agree, 'it becomes a law'. That is the veto and the override. The Court is not mentioned.",
      expVn: "Điều khoản nói Tổng thống trả lại dự luật 'kèm ý kiến phản đối', và nếu hai phần ba mỗi viện đồng ý, 'nó trở thành luật'. Đó là phủ quyết và bác bỏ phủ quyết. Tòa án không được nhắc tới.",
    },
    {
      id: "q2_mcq_senate_consent",
      passageId: "src_constitution_plain",
      type: "mcq",
      title: "2. Article II, Section 2 gives the Senate a check on the President. What is it?",
      options: [
        { val: "A", text: "A. The Senate can veto the President's laws." },
        { val: "B", text: "B. The Senate must consent before treaties are made and judges are appointed." },
        { val: "C", text: "C. The Senate commands the army and navy." },
        { val: "D", text: "D. The Senate chooses the President." },
      ],
      correct: "B",
      expEn: "The President 'shall have power, with the advice and consent of the Senate' to make treaties and appoint judges. He proposes; the Senate must agree. The President, not the Senate, is commander in chief, and senators do not veto laws.",
      expVn: "Tổng thống 'có quyền, với sự cố vấn và chấp thuận của Thượng viện' ký hiệp ước và bổ nhiệm thẩm phán. Ông đề xuất; Thượng viện phải đồng ý. Tổng thống, chứ không phải Thượng viện, là tổng tư lệnh, và thượng nghị sĩ không phủ quyết luật.",
    },
    {
      id: "q3_mcq_which_branch_court",
      passageId: "src_scenario_speed_limit",
      type: "mcq",
      title: "3. In the scenario, the federal court decides that the Ohio speed-limit law can stay. Which branch is acting, and what principle is it applying?",
      options: [
        { val: "A", text: "A. The judicial branch, applying federalism — speed limits on state roads are a state power." },
        { val: "B", text: "B. The executive branch, applying the rule of law." },
        { val: "C", text: "C. The legislative branch, applying checks and balances." },
        { val: "D", text: "D. The judicial branch, applying popular sovereignty." },
      ],
      correct: "A",
      expEn: "A court interpreting the law is the judicial branch. Its reason — 'a power that belongs to the states' — is federalism: the division of power between national and state governments.",
      expVn: "Tòa án giải thích luật là nhánh tư pháp. Lý do của tòa — 'quyền thuộc về các tiểu bang' — là chủ nghĩa liên bang: sự phân chia quyền lực giữa chính quyền quốc gia và tiểu bang.",
    },
    {
      id: "q4_mcq_irs_branch",
      passageId: "src_scenario_speed_limit",
      type: "mcq",
      title: "4. The Internal Revenue Service starts collecting the new gasoline tax. This is an example of the —",
      options: [
        { val: "A", text: "A. legislative branch making a law" },
        { val: "B", text: "B. judicial branch interpreting a law" },
        { val: "C", text: "C. states using a shared power" },
        { val: "D", text: "D. executive branch carrying out a law" },
      ],
      correct: "D",
      expEn: "Congress made the tax law and the President signed it; collecting the tax is enforcing the law, which is the executive branch's job. The passage even says the IRS is 'a department of the executive branch'.",
      expVn: "Quốc hội làm ra luật thuế và Tổng thống ký; thu thuế là thi hành luật, việc của nhánh hành pháp. Đoạn văn còn nói Sở Thuế vụ là 'một cơ quan thuộc nhánh hành pháp'.",
    },
    {
      id: "q5_mcq_articles_weakness",
      type: "mcq",
      title: "5. Which of these was a weakness of the Articles of Confederation that the Constitution fixed?",
      options: [
        { val: "A", text: "A. The President had too much power over the states." },
        { val: "B", text: "B. The national government could not collect taxes." },
        { val: "C", text: "C. There were too many national courts." },
        { val: "D", text: "D. Congress passed laws too quickly." },
      ],
      correct: "B",
      expEn: "Under the Articles, Congress could only ask the states for money. With no power to tax, it could not pay soldiers or keep order. There was no President and no national court at all, so A and C describe things that did not exist.",
      expVn: "Theo Các Điều khoản, Quốc hội chỉ có thể xin tiền các bang. Không có quyền thu thuế, nó không thể trả lương cho lính hay giữ trật tự. Hoàn toàn không có Tổng thống và tòa án quốc gia, nên A và C mô tả những thứ không tồn tại.",
    },
    {
      id: "q6_inline_branches",
      type: "inline",
      title: "6. Complete the sentence about the three branches.",
      options: [],
      textParts: [
        "Congress is the ",
        " branch and makes the laws; the President leads the ",
        " branch and enforces them; the Supreme Court is the ",
        " branch and interprets them.",
      ],
      blanks: {
        "1": {
          correct: "legislative",
          options: [
            { val: "legislative", text: "legislative" },
            { val: "executive", text: "executive" },
            { val: "judicial", text: "judicial" },
          ],
        },
        "2": {
          correct: "executive",
          options: [
            { val: "executive", text: "executive" },
            { val: "legislative", text: "legislative" },
            { val: "judicial", text: "judicial" },
          ],
        },
        "3": {
          correct: "judicial",
          options: [
            { val: "judicial", text: "judicial" },
            { val: "executive", text: "executive" },
            { val: "legislative", text: "legislative" },
          ],
        },
      },
      expEn: "Legislative = makes laws (Congress). Executive = carries out laws (President). Judicial = interprets laws (courts). Match the verb to the branch.",
      expVn: "Lập pháp = làm luật (Quốc hội). Hành pháp = thi hành luật (Tổng thống). Tư pháp = giải thích luật (tòa án). Ghép động từ với nhánh.",
    },
    {
      id: "q7_mcq_terms",
      type: "mcq",
      title: "7. Which statement about terms of office is correct?",
      options: [
        { val: "A", text: "A. Senators serve 2 years and House members serve 6 years." },
        { val: "B", text: "B. The President serves a 6-year term." },
        { val: "C", text: "C. House members serve 2 years, senators 6 years, and the President 4 years." },
        { val: "D", text: "D. Supreme Court justices serve 10-year terms." },
      ],
      correct: "C",
      expEn: "House: 2 years (all 435 seats are up every two years). Senate: 6 years. President: 4 years, at most two terms. Supreme Court justices serve for life, not a fixed term.",
      expVn: "Hạ viện: 2 năm (toàn bộ 435 ghế bầu lại mỗi hai năm). Thượng viện: 6 năm. Tổng thống: 4 năm, tối đa hai nhiệm kỳ. Thẩm phán Tòa án Tối cao phục vụ trọn đời, không có nhiệm kỳ cố định.",
    },
    {
      id: "q8_mcq_judicial_review",
      type: "mcq",
      title: "8. The Supreme Court cancels a law because it goes against the Constitution. This power is called —",
      options: [
        { val: "A", text: "A. impeachment" },
        { val: "B", text: "B. a veto" },
        { val: "C", text: "C. ratification" },
        { val: "D", text: "D. judicial review" },
      ],
      correct: "D",
      expEn: "Judicial review is the courts' power to strike down laws or actions that break the Constitution. Impeachment is Congress charging an official; a veto is the President rejecting a bill; ratification is approving a treaty or amendment.",
      expVn: "Xem xét tư pháp là quyền của tòa án bác bỏ luật hoặc hành động trái Hiến pháp. Luận tội là Quốc hội buộc tội một quan chức; phủ quyết là Tổng thống bác dự luật; phê chuẩn là chấp thuận một hiệp ước hoặc tu chính án.",
    },
    {
      id: "q9_mcq_federal_power",
      type: "mcq",
      title: "9. Which of these is a power of the FEDERAL government only?",
      options: [
        { val: "A", text: "A. Issuing driver's licenses" },
        { val: "B", text: "B. Printing money" },
        { val: "C", text: "C. Running public schools" },
        { val: "D", text: "D. Setting marriage rules" },
      ],
      correct: "B",
      expEn: "Only the national government may print and coin money — under the Articles, every state printed its own, and it was chaos. Licenses, schools and marriage rules are state powers.",
      expVn: "Chỉ chính quyền quốc gia mới được in và đúc tiền — theo Các Điều khoản, mỗi bang tự in tiền riêng, và đó là hỗn loạn. Bằng lái, trường học và quy định hôn nhân là quyền của tiểu bang.",
    },
    {
      id: "q10_mcq_amendment",
      type: "mcq",
      title: "10. To add an amendment to the Constitution, it must be proposed by two-thirds of Congress and then —",
      options: [
        { val: "A", text: "A. ratified by three-quarters of the states" },
        { val: "B", text: "B. signed by the President" },
        { val: "C", text: "C. approved by the Supreme Court" },
        { val: "D", text: "D. accepted by a majority of voters in a national election" },
      ],
      correct: "A",
      expEn: "Ratification takes 3/4 of the states — 38 of 50. Neither the President nor the Court has a role, and there is no national vote. Only 27 amendments have cleared both hurdles.",
      expVn: "Phê chuẩn cần 3/4 số bang — 38 trên 50. Cả Tổng thống lẫn Tòa án đều không có vai trò, và không có bỏ phiếu toàn quốc. Chỉ 27 tu chính án đã vượt qua cả hai rào cản.",
    },
  ],
};
