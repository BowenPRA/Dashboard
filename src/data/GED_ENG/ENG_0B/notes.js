import { DIAGRAMS } from './diagrams.js';
// src/data/GED_ENG/ENG_0B/notes.js

export const notes = [
  {
    type: "intro",
    title: "Subject–Verb Agreement",
    titleVn: "Sự hòa hợp Chủ ngữ – Động từ",
    subtitle: "Objective: Match the verb to its real subject, ignore the words in between, and handle the group and -body subjects the GED loves to test.",
    subtitleVn: "Mục tiêu: Hòa hợp động từ với chủ ngữ thật của nó, bỏ qua các từ ở giữa, và xử lý các chủ ngữ nhóm và -body mà bài thi GED thường kiểm tra.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "The One-S Rule",
    titleVn: "Quy tắc một chữ S",
    icon: "Equal",
    color: "bg-[#58cc02]",
    content: "In the present tense, either the noun or the verb carries an **-s**, but almost never both.\n\n> **One** person → the verb takes the S: \"The nurse **works**.\"\n> **Many** people → the noun takes the S: \"The nurse**s** **work**.\"\n\nIf you can hear an S on the end of the subject, the verb usually has none.",
    contentVn: "Ở thì hiện tại, danh từ hoặc động từ mang chữ **-s**, nhưng gần như không bao giờ cả hai.\n\n> **Một** người → động từ mang chữ S: \"The nurse **works**.\"\n> **Nhiều** người → danh từ mang chữ S: \"The nurse**s** **work**.\"\n\nNếu bạn nghe thấy chữ S ở cuối chủ ngữ, động từ thường không có.",
    example: "He works late. / They work late.\nThe car costs a lot. / The cars cost a lot.",
    exampleVn: "Anh ấy làm việc muộn. / Họ làm việc muộn.\nChiếc xe có giá cao. / Những chiếc xe có giá cao.",
    inlineSvg: DIAGRAMS.THE_S_RULE,
    audio: "/audio/GED_ENG/ENG_0B/slide_ENG_0B_1.mp3"
  },
  {
    type: "concept",
    title: "Words in the Middle",
    titleVn: "Các từ ở giữa",
    icon: "Scissors",
    color: "bg-[#ff9600]",
    content: "The GED hides the real subject behind a long phrase, then puts a tempting noun right before the verb.\n\n> \"The **box** of old science books **is** heavy.\"\n\nThe subject is **box** (one), not **books**. Any phrase starting with *of, with, along with* or *as well as* is not the subject — cross it out and read again.",
    contentVn: "Bài thi GED giấu chủ ngữ thật đằng sau một cụm từ dài, rồi đặt một danh từ hấp dẫn ngay trước động từ.\n\n> \"The **box** of old science books **is** heavy.\"\n\nChủ ngữ là **box** (một), không phải **books**. Bất kỳ cụm từ nào bắt đầu bằng *of, with, along with* hoặc *as well as* đều không phải chủ ngữ — hãy gạch bỏ nó và đọc lại.",
    example: "The list of names is on the desk. (list is the subject)\nOne of the machines is broken. (one is the subject)",
    exampleVn: "Danh sách các tên ở trên bàn. (list là chủ ngữ)\nMột trong các máy bị hỏng. (one là chủ ngữ)",
    inlineSvg: DIAGRAMS.INTERRUPTING_PHRASE,
    audio: "/audio/GED_ENG/ENG_0B/slide_ENG_0B_2.mp3"
  },
  {
    type: "concept",
    title: "Tricky Subjects",
    titleVn: "Các chủ ngữ khó",
    icon: "Users",
    color: "bg-[#ce82ff]",
    content: "Three kinds of subject fool students most often.\n\n> **Groups** (team, company, government) act as ONE → singular verb.\n> **-one, -body, -thing** words (everyone, nobody, each) are ONE → singular verb.\n> **And** joins two subjects into a plural; **or** makes the verb match the nearest noun.",
    contentVn: "Ba loại chủ ngữ thường đánh lừa học sinh nhất.\n\n> **Nhóm** (team, company, government) hoạt động như MỘT → động từ số ít.\n> Các từ **-one, -body, -thing** (everyone, nobody, each) là MỘT → động từ số ít.\n> **And** nối hai chủ ngữ thành số nhiều; **or** làm động từ hòa hợp với danh từ gần nhất.",
    example: "Everybody needs a ticket. (not need)\nAna and Minh are here. (and → plural)\nAna or her brothers are here. (or → match the closest)",
    exampleVn: "Mọi người cần một vé. (không phải need)\nAna và Minh đang ở đây. (and → số nhiều)\nAna hoặc các anh của cô ấy đang ở đây. (or → hòa hợp với từ gần nhất)",
    inlineSvg: DIAGRAMS.TRICKY_SUBJECTS,
    audio: "/audio/GED_ENG/ENG_0B/slide_ENG_0B_3.mp3"
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can find the true subject, ignore interrupting phrases, and pick the right verb for group and -body subjects.",
    subtitleVn: "Đạt được mục tiêu: Bạn có thể tìm chủ ngữ thật, bỏ qua các cụm từ xen vào, và chọn đúng động từ cho chủ ngữ nhóm và -body.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
