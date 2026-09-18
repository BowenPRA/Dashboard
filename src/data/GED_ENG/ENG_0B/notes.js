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
    check: {
      id: "chk_one_s",
      q: "Which sentence follows the one-S rule?",
      qVn: "Câu nào theo đúng quy tắc một chữ S?",
      options: [
        { val: "A", text: "The driver deliver mail every Saturday.", textVn: "The driver deliver mail every Saturday." },
        { val: "B", text: "The drivers delivers mail every Saturday.", textVn: "The drivers delivers mail every Saturday." },
        { val: "C", text: "The drivers deliver mail every Saturday.", textVn: "The drivers deliver mail every Saturday." },
      ],
      correct: "C",
      expEn: "Many drivers → the S goes on the noun, so the verb has none: drivers deliver. A is one driver, so the verb needs the S: the driver delivers. B puts an S on both words — the rule allows only one.",
      expVn: "Nhiều tài xế → chữ S nằm ở danh từ, nên động từ không có: drivers deliver. A là một tài xế, nên động từ cần chữ S: the driver delivers. B đặt chữ S ở cả hai từ — quy tắc chỉ cho phép một chữ S.",
    },
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
    check: {
      id: "chk_cross_out",
      q: "\"The results of the blood test ___ ready.\" What is the real subject, and which verb matches it?",
      qVn: "\"The results of the blood test ___ ready.\" Chủ ngữ thật là gì, và động từ nào hòa hợp với nó?",
      options: [
        { val: "A", text: "results → are", textVn: "results → are" },
        { val: "B", text: "test → is", textVn: "test → is" },
        { val: "C", text: "results → is", textVn: "results → is" },
      ],
      correct: "A",
      expEn: "Cross out \"of the blood test\" — a phrase starting with of is never the subject. That leaves \"The results ___ ready\": many results, so are. B matches the verb to test, the tempting noun right before the gap. C finds the right subject but gives it a singular verb.",
      expVn: "Gạch bỏ \"of the blood test\" — cụm từ bắt đầu bằng of không bao giờ là chủ ngữ. Còn lại \"The results ___ ready\": nhiều kết quả, nên dùng are. B cho động từ hòa hợp với test, danh từ hấp dẫn ngay trước chỗ trống. C tìm đúng chủ ngữ nhưng lại dùng động từ số ít.",
    },
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
    check: {
      id: "chk_tricky_subject",
      q: "Which sentence is correct?",
      qVn: "Câu nào đúng?",
      options: [
        { val: "A", text: "Each of the workers have a locker.", textVn: "Each of the workers have a locker." },
        { val: "B", text: "The team practices every Tuesday.", textVn: "The team practices every Tuesday." },
        { val: "C", text: "Marco and his cousin runs a small shop.", textVn: "Marco and his cousin runs a small shop." },
      ],
      correct: "B",
      expEn: "A team acts as ONE group, so the verb is singular: practices. A is wrong because each means one — cross out \"of the workers\" and read \"Each has a locker.\" C joins two people with and, so the verb must be plural: run.",
      expVn: "Một đội hoạt động như MỘT nhóm, nên động từ ở số ít: practices. A sai vì each nghĩa là một — gạch bỏ \"of the workers\" và đọc \"Each has a locker.\" C nối hai người bằng and, nên động từ phải ở số nhiều: run.",
    },
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
