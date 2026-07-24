import { DIAGRAMS } from './diagrams.js';
// src/data/GED_ENG/ENG_0A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Pronouns",
    titleVn: "Đại từ",
    subtitle: "Objective: Choose the right pronoun for its job, match it to the noun it replaces, and spot the singular traps the GED sets.",
    subtitleVn: "Mục tiêu: Chọn đúng đại từ theo vai trò của nó, hòa hợp với danh từ nó thay thế, và nhận ra các bẫy số ít trong bài thi GED.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "What a Pronoun Does",
    titleVn: "Đại từ làm gì",
    icon: "Repeat",
    color: "bg-[#58cc02]",
    content: "A **pronoun** is a short word that stands in for a noun so you do not repeat the same name again and again.\n\n> Without: \"Maria left Maria's phone on Maria's desk.\"\n> With: \"Maria left **her** phone on **her** desk.\"\n\nThe form you need depends on the job the word is doing in the sentence.",
    contentVn: "**Đại từ** là một từ ngắn thay thế cho danh từ để bạn không phải lặp lại cùng một cái tên nhiều lần.\n\n> Không có: \"Maria để điện thoại của Maria trên bàn của Maria.\"\n> Có: \"Maria để điện thoại **của cô ấy** trên bàn **của cô ấy**.\"\n\nDạng bạn cần phụ thuộc vào vai trò của từ đó trong câu.",
    example: "Subject (does it): She works here.\nObject (receives it): Call her.\nPossessive (owns it): her book.",
    exampleVn: "Chủ ngữ (thực hiện): Cô ấy làm việc ở đây.\nTân ngữ (nhận hành động): Gọi cô ấy.\nSở hữu (sở hữu): sách của cô ấy.",
    inlineSvg: DIAGRAMS.PRONOUN_CHART,
  },
  {
    type: "concept",
    title: "Its vs. It's",
    titleVn: "Its và It's",
    icon: "AlertTriangle",
    color: "bg-[#ff9600]",
    content: "This is the single most common pronoun error on the GED, and the rule is backwards from what most students expect.\n\n> **its** — no apostrophe — means *belongs to it*.\n> **it's** — with apostrophe — is short for *it is*.\n\nTo check, read the sentence aloud saying \"it is\". If that sounds wrong, you need **its**.",
    contentVn: "Đây là lỗi đại từ phổ biến nhất trong bài thi GED, và quy tắc ngược lại với điều hầu hết học sinh mong đợi.\n\n> **its** — không có dấu nháy — nghĩa là *thuộc về nó*.\n> **it's** — có dấu nháy — là dạng viết tắt của *it is*.\n\nĐể kiểm tra, đọc to câu văn với \"it is\". Nếu nghe sai, bạn cần dùng **its**.",
    example: "The dog wagged its tail. (belongs to it)\nIt's raining outside. (it is raining)",
    exampleVn: "Con chó vẫy đuôi của nó. (thuộc về nó)\nTrời đang mưa. (it is raining)",
    inlineSvg: DIAGRAMS.ITS_VS_ITS,
  },
  {
    type: "concept",
    title: "The Singular Trap",
    titleVn: "Bẫy số ít",
    icon: "UserCheck",
    color: "bg-[#ce82ff]",
    content: "In everyday speech we say \"every student brings **their** laptop\". The GED marks that wrong.\n\n> Words like **each, every, someone, anybody, nobody** count as ONE person.\n> A **company**, a **team** or a **school** is also ONE thing → use **its**.\n\nFormal written English needs a singular pronoun: **he or she**, **his or her**, **its**.",
    contentVn: "Trong lời nói hàng ngày, chúng ta nói \"mỗi học sinh mang **their** laptop\". Bài thi GED chấm điều đó là sai.\n\n> Các từ như **each, every, someone, anybody, nobody** được tính là MỘT người.\n> Một **công ty**, một **đội** hay một **trường học** cũng là MỘT thứ → dùng **its**.\n\nTiếng Anh viết trang trọng cần đại từ số ít: **he or she**, **his or her**, **its**.",
    example: "✗ The company requires their employees to wear uniforms.\n✓ The company requires its employees to wear uniforms.",
    exampleVn: "✗ Công ty yêu cầu their nhân viên mặc đồng phục.\n✓ Công ty yêu cầu its nhân viên mặc đồng phục.",
    inlineSvg: DIAGRAMS.SINGULAR_TRAP,
  },
  {
    type: "concept",
    title: "Unclear Pronouns",
    titleVn: "Đại từ không rõ ràng",
    icon: "HelpCircle",
    color: "bg-[#ff4b4b]",
    content: "A pronoun must point clearly at one noun. If two people in the sentence could match it, the sentence is broken.\n\n> \"When John spoke to David, **he** was angry.\"\n> Who was angry? The reader cannot tell.\n\nThe fix is not a different pronoun — it is the actual name.",
    contentVn: "Đại từ phải chỉ rõ ràng đến một danh từ. Nếu hai người trong câu đều có thể phù hợp, câu đó bị lỗi.\n\n> \"Khi John nói chuyện với David, **anh ấy** đã tức giận.\"\n> Ai tức giận? Người đọc không thể biết.\n\nCách sửa không phải là đổi đại từ khác — mà là dùng chính cái tên.",
    example: "✗ Sarah handed the report to Jason, but she forgot to sign it.\n✓ Sarah handed the report to Jason, but Sarah forgot to sign it.",
    exampleVn: "✗ Sarah đưa báo cáo cho Jason, nhưng cô ấy quên ký.\n✓ Sarah đưa báo cáo cho Jason, nhưng Sarah quên ký.",
    inlineSvg: DIAGRAMS.UNCLEAR_PRONOUN,
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can pick the right pronoun form, keep it singular when the GED expects singular, and remove unclear references.",
    subtitleVn: "Đạt được mục tiêu: Bạn có thể chọn đúng dạng đại từ, giữ số ít khi bài thi GED yêu cầu, và loại bỏ các tham chiếu không rõ ràng.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
