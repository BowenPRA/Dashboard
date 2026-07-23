import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 3600, // 60 minutes
  passages: [],
  questions: [
    {
      id: "q1_inline_two_documents",
      type: "inline",
      title: "1. Complete the statement about America's two founding documents.",
      options: [],
      textParts: [
        "The Declaration of Independence, signed in 1776, announced that the colonies were ",
        " Britain. The Constitution, written in 1787, set out how the new ",
        " would actually be organised."
      ],
      blanks: {
        "1": {
          correct: "leaving",
          options: [
            { val: "leaving", text: "leaving" },
            { val: "joining", text: "joining" },
            { val: "taxing", text: "taxing" }
          ]
        },
        "2": {
          correct: "government",
          options: [
            { val: "government", text: "government" },
            { val: "army", text: "army" },
            { val: "colony", text: "colony" }
          ]
        }
      },
      expEn: "These are two different documents eleven years apart. The Declaration announced the separation from Britain; the Constitution built the structure of the new government.",
      expVn: "Đây là hai văn bản khác nhau cách nhau mười một năm. Tuyên ngôn công bố việc ly khai khỏi Anh; Hiến pháp xây dựng cấu trúc của chính quyền mới."
    },
    {
      id: "q2_mcq_articles_weakness",
      type: "mcq",
      title: "2. Which was a major weakness of the Articles of Confederation?",
      inlineSvg: DIAGRAMS.NOTES_ARTICLES_WEAKNESS,
      options: [
        { val: "A", text: "A. Congress could not tax the states, only request money from them" },
        { val: "B", text: "B. The President held too much personal power" },
        { val: "C", text: "C. The Supreme Court could overrule any state law" },
        { val: "D", text: "D. States were forbidden from having their own governments" }
      ],
      correct: "A",
      expEn: "Congress could ask the states for money but could not require it, so it had no reliable income and could not even pay the soldiers who won the war. There was no President and no national court under the Articles at all.",
      expVn: "Quốc hội có thể yêu cầu các tiểu bang cấp tiền nhưng không thể bắt buộc, nên không có nguồn thu ổn định và thậm chí không thể trả lương cho những người lính đã thắng trận. Theo Các Điều khoản, hoàn toàn không có Tổng thống và không có tòa án quốc gia."
    },
    {
      id: "q3_dnd_branches",
      type: "dnd",
      title: "3. Drag each body of government to the branch it belongs to.",
      options: [],
      bank: [
        { id: "b1", val: "Congress", text: "Congress" },
        { id: "b2", val: "The President", text: "The President" },
        { id: "b3", val: "The Supreme Court", text: "The Supreme Court" },
        { id: "b4", val: "State governors", text: "State governors" },
        { id: "b5", val: "The British Parliament", text: "The British Parliament" }
      ],
      targets: [
        { id: "leg", title: "Legislative" },
        { id: "exe", title: "Executive" },
        { id: "jud", title: "Judicial" }
      ],
      correctSets: {
        "leg": ["Congress"],
        "exe": ["The President"],
        "jud": ["The Supreme Court"]
      },
      expEn: "Congress is the legislative branch and makes laws. The President leads the executive branch and carries laws out. The Supreme Court is the judicial branch and interprets laws.",
      expVn: "Quốc hội là nhánh lập pháp và làm ra luật. Tổng thống lãnh đạo nhánh hành pháp và thi hành luật. Tòa án Tối cao là nhánh tư pháp và giải thích luật."
    },
    {
      id: "q4_mcq_which_branch",
      type: "mcq",
      title: "4. Look at the chart. Which word belongs in the missing box under 'President'?",
      inlineSvg: DIAGRAMS.ASSESSMENT_BRANCH_CHART,
      options: [
        { val: "A", text: "A. WRITES" },
        { val: "B", text: "B. INTERPRETS" },
        { val: "C", text: "C. CARRIES OUT" },
        { val: "D", text: "D. VOTES ON" }
      ],
      correct: "C",
      expEn: "Congress makes the laws and the courts interpret them, so the executive branch under the President is the one that carries out and enforces the laws.",
      expVn: "Quốc hội làm ra luật và tòa án giải thích luật, nên nhánh hành pháp dưới quyền Tổng thống là nhánh thi hành và thực thi luật."
    },
    {
      id: "q5_inline_separation",
      type: "inline",
      title: "5. Complete the description of the separation of powers.",
      options: [],
      textParts: [
        "The ",
        " branch makes the laws, while the judicial branch ",
        " them."
      ],
      blanks: {
        "1": {
          correct: "legislative",
          options: [
            { val: "legislative", text: "legislative" },
            { val: "executive", text: "executive" },
            { val: "judicial", text: "judicial" }
          ]
        },
        "2": {
          correct: "interprets",
          options: [
            { val: "interprets", text: "interprets" },
            { val: "writes", text: "writes" },
            { val: "enforces", text: "enforces" }
          ]
        }
      },
      expEn: "Legislative makes, executive carries out, judicial interprets. Swapping these three verbs is one of the most common exam mistakes.",
      expVn: "Lập pháp làm ra, hành pháp thi hành, tư pháp giải thích. Đảo lộn ba động từ này là một trong những lỗi thi phổ biến nhất."
    },
    {
      id: "q6_mcq_veto",
      type: "mcq",
      title: "6. What is a veto?",
      options: [
        { val: "A", text: "A. A vote by the states to approve an amendment" },
        { val: "B", text: "B. The President's power to reject a bill passed by Congress" },
        { val: "C", text: "C. A Supreme Court ruling that a law is unconstitutional" },
        { val: "D", text: "D. A tax placed on imported goods" }
      ],
      correct: "B",
      expEn: "A veto is the President rejecting a bill so it does not become law. Option C describes judicial review, which is a different check performed by the courts.",
      expVn: "Phủ quyết là việc Tổng thống bác bỏ một dự luật để nó không trở thành luật. Phương án C mô tả quyền giám sát tư pháp, một sự kiểm soát khác do tòa án thực hiện."
    },
    {
      id: "q7_mcq_override",
      type: "mcq",
      title: "7. Congress wants to pass a bill the President has vetoed. What is required?",
      inlineSvg: DIAGRAMS.NOTES_BILL_TO_LAW,
      options: [
        { val: "A", text: "A. Approval from the Supreme Court" },
        { val: "B", text: "B. A simple majority in the House only" },
        { val: "C", text: "C. Approval from three-quarters of the states" },
        { val: "D", text: "D. A two-thirds vote in both the House and the Senate" }
      ],
      correct: "D",
      expEn: "Congress can override a veto, but only with a two-thirds vote in both chambers. The three-quarters-of-states figure belongs to the amendment process, not to vetoes.",
      expVn: "Quốc hội có thể bác bỏ quyền phủ quyết, nhưng chỉ với hai phần ba số phiếu ở cả hai viện. Con số ba phần tư các tiểu bang thuộc về quy trình tu chính án, không phải phủ quyết."
    },
    {
      id: "q8_mcq_federalism",
      type: "mcq",
      title: "8. Under federalism, which power belongs ONLY to the federal government?",
      inlineSvg: DIAGRAMS.NOTES_FEDERALISM,
      options: [
        { val: "A", text: "A. Printing money and declaring war" },
        { val: "B", text: "B. Running public schools" },
        { val: "C", text: "C. Issuing drivers' licences" },
        { val: "D", text: "D. Collecting taxes" }
      ],
      correct: "A",
      expEn: "Printing money and declaring war are exclusively federal. Schools and licences are state responsibilities, and taxation is shared by both levels — which is why it is not the answer.",
      expVn: "In tiền và tuyên chiến là quyền riêng của liên bang. Trường học và bằng lái là trách nhiệm của tiểu bang, còn thuế do cả hai cấp cùng thu — đó là lý do nó không phải đáp án."
    },
    {
      id: "q9_inline_ratify",
      type: "inline",
      title: "9. Complete the sentence about approving the Constitution.",
      options: [],
      textParts: [
        "To ",
        " means to formally approve. Before the Constitution could take effect, ",
        " of the thirteen states had to approve it."
      ],
      blanks: {
        "1": {
          correct: "ratify",
          options: [
            { val: "ratify", text: "ratify" },
            { val: "amend", text: "amend" },
            { val: "veto", text: "veto" }
          ]
        },
        "2": {
          correct: "nine",
          options: [
            { val: "nine", text: "nine" },
            { val: "four", text: "four" },
            { val: "thirteen", text: "thirteen" }
          ]
        }
      },
      expEn: "Ratify means to approve; amend means to change. Nine of the thirteen states were required, not all thirteen.",
      expVn: "Phê chuẩn nghĩa là chấp thuận; tu chính nghĩa là thay đổi. Cần chín trong số mười ba tiểu bang, không phải cả mười ba."
    },
    {
      id: "q10_mcq_bill_of_rights",
      type: "mcq",
      title: "10. Why did several states demand a Bill of Rights before approving the Constitution?",
      options: [
        { val: "A", text: "A. They wanted the President to be given more authority" },
        { val: "B", text: "B. They wanted to remove the Supreme Court entirely" },
        { val: "C", text: "C. The Constitution did not clearly protect individual freedoms from the new government" },
        { val: "D", text: "D. They wanted to return to British rule" }
      ],
      correct: "C",
      expEn: "The original Constitution described how the government would work but said little about what it could never do to individuals. The Bill of Rights, the first ten amendments, was added in 1791 to guarantee those protections.",
      expVn: "Hiến pháp ban đầu mô tả cách chính quyền hoạt động nhưng nói rất ít về những gì nó không bao giờ được làm với cá nhân. Đạo luật Nhân quyền, tức mười tu chính án đầu tiên, được bổ sung năm 1791 để đảm bảo các bảo vệ đó."
    },
    {
      id: "q11_mcq_amendment",
      type: "mcq",
      title: "11. What is required to ratify a constitutional amendment after it has been proposed?",
      inlineSvg: DIAGRAMS.DIAGRAM_AMENDMENT_PROCESS,
      options: [
        { val: "A", text: "A. A signature from the President" },
        { val: "B", text: "B. A simple majority of voters nationwide" },
        { val: "C", text: "C. A unanimous vote of all fifty states" },
        { val: "D", text: "D. Approval by three-quarters of the states" }
      ],
      correct: "D",
      expEn: "An amendment is proposed by two-thirds of Congress and then ratified by three-quarters of the states. The President plays no formal role, and unanimity is not required.",
      expVn: "Một tu chính án được đề xuất bởi hai phần ba Quốc hội và sau đó được phê chuẩn bởi ba phần tư các tiểu bang. Tổng thống không có vai trò chính thức, và không cần sự nhất trí tuyệt đối."
    },
    {
      id: "q12_mcq_purpose",
      type: "mcq",
      title: "12. What is the overall purpose of checks and balances?",
      inlineSvg: DIAGRAMS.NOTES_CHECKS_BALANCES,
      options: [
        { val: "A", text: "A. To make passing laws as fast as possible" },
        { val: "B", text: "B. To stop any single branch from becoming too powerful" },
        { val: "C", text: "C. To give the states more power than the federal government" },
        { val: "D", text: "D. To allow the President to rule without Congress" }
      ],
      correct: "B",
      expEn: "Each branch can restrain the other two, so no branch can dominate. The system deliberately slows government down; that friction is the safeguard, not a flaw.",
      expVn: "Mỗi nhánh có thể kiềm chế hai nhánh kia, nên không nhánh nào có thể thống trị. Hệ thống cố ý làm chậm chính quyền lại; sự cản trở đó là biện pháp bảo vệ, không phải khiếm khuyết."
    }
  ]
};
