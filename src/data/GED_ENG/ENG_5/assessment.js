// src/data/GED_ENG/ENG_5/assessment.js
// Ten GED-style language items on a workplace memo: commas (introductory,
// appositive, before a conjunction, none between subject and verb),
// apostrophes, its/it's, their/there/they're, capitals, affect/effect +
// accept/except, whose/who's + lose/loose. Key: A×3 B×3 C×2 D×2.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p5_memo",
      title: "Memo: The New Timetable",
      meta: "Staff memo • Northgate Print Shop",
      text: [
        "Before the staff meeting, the manager handed out the new timetable. Our supervisor, Ms Rivera, will lead the training on Thursday. The shop closes at six, but the office stays open until eight. The staff who work on Saturdays receive extra pay.",
        "Please leave all three drivers' reports on my desk by Friday. The printer is old, but it's still working, and its paper tray is full. They're going to park their van over there, beside the loading door.",
        "On Monday, Dr Patel and I will visit the Hanoi office. The new rota will affect everyone except the night staff. Whose bag is this? If we do not label them, someone will lose theirs."
      ],
      glossary: {
        "timetable": { def: "A plan showing when things happen.", vn: "Thời gian biểu", vnDef: "Bảng kế hoạch cho thấy khi nào việc gì diễn ra." },
        "rota": { def: "A list showing who works at which times.", vn: "Lịch phân công", vnDef: "Danh sách cho thấy ai làm việc vào giờ nào." },
        "supervisor": { def: "The person who is in charge of a group of workers.", vn: "Người giám sát", vnDef: "Người phụ trách một nhóm nhân viên." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p5_memo",
      type: "mcq",
      title: "1. Which version of the first sentence is punctuated correctly?",
      options: [
        { val: "A", text: "A. Before the staff meeting, the manager handed out the new timetable." },
        { val: "B", text: "B. Before the staff meeting the manager, handed out the new timetable." },
        { val: "C", text: "C. Before, the staff meeting the manager handed out the new timetable." },
        { val: "D", text: "D. Before the staff meeting the manager handed out, the new timetable." }
      ],
      correct: "A",
      expEn: "\"Before the staff meeting\" is an introductory phrase, so one comma follows it. B puts a comma between subject and verb; C and D break the sentence in the wrong places.",
      expVn: "\"Before the staff meeting\" là cụm mở đầu, nên có một dấu phẩy sau nó. B đặt dấu phẩy giữa chủ ngữ và động từ; C và D ngắt câu sai chỗ."
    },
    {
      id: "q2",
      passageId: "p5_memo",
      type: "mcq",
      title: "2. Which version is punctuated correctly?",
      options: [
        { val: "A", text: "A. Our supervisor, Ms Rivera will lead the training." },
        { val: "B", text: "B. Our supervisor Ms Rivera, will lead the training." },
        { val: "C", text: "C. Our supervisor, Ms Rivera, will lead the training." },
        { val: "D", text: "D. Our supervisor, Ms Rivera, will, lead the training." }
      ],
      correct: "C",
      expEn: "\"Ms Rivera\" is an appositive that renames \"our supervisor\", so it needs a comma on BOTH sides. A and B use only one; D adds a comma inside the verb.",
      expVn: "\"Ms Rivera\" là ngữ đồng vị gọi lại \"our supervisor\", nên cần dấu phẩy ở CẢ HAI bên. A và B chỉ dùng một; D thêm dấu phẩy vào giữa động từ."
    },
    {
      id: "q3",
      passageId: "p5_memo",
      type: "mcq",
      title: "3. \"The shop closes at six ______ the office stays open until eight.\" Which fills the blank correctly?",
      options: [
        { val: "A", text: "A. six but the office" },
        { val: "B", text: "B. six, but the office" },
        { val: "C", text: "C. six, but, the office" },
        { val: "D", text: "D. six but, the office" }
      ],
      correct: "B",
      expEn: "\"But\" joins two complete sentences, so a comma goes before it and never after it.",
      expVn: "\"But\" nối hai câu hoàn chỉnh, nên dấu phẩy đứng trước nó và không bao giờ đứng sau."
    },
    {
      id: "q4",
      passageId: "p5_memo",
      type: "mcq",
      title: "4. Which sentence is punctuated correctly?",
      options: [
        { val: "A", text: "A. The staff who work on Saturdays, receive extra pay." },
        { val: "B", text: "B. The staff, who work on Saturdays receive extra pay." },
        { val: "C", text: "C. The staff who work on Saturdays receive, extra pay." },
        { val: "D", text: "D. The staff who work on Saturdays receive extra pay." }
      ],
      correct: "D",
      expEn: "\"The staff who work on Saturdays\" is the subject and \"receive\" is the verb. No comma belongs between them, so the sentence needs no comma at all.",
      expVn: "\"The staff who work on Saturdays\" là chủ ngữ và \"receive\" là động từ. Không có dấu phẩy nào giữa chúng, nên câu này không cần dấu phẩy."
    },
    {
      id: "q5",
      passageId: "p5_memo",
      type: "mcq",
      title: "5. \"Please leave all three ______ reports on my desk.\" Which word is correct?",
      options: [
        { val: "A", text: "A. drivers'" },
        { val: "B", text: "B. driver's" },
        { val: "C", text: "C. drivers" },
        { val: "D", text: "D. drivers's" }
      ],
      correct: "A",
      expEn: "The reports belong to three drivers — a plural owner — so the apostrophe goes after the -s: drivers'. B is one driver; C shows no ownership.",
      expVn: "Các báo cáo thuộc về ba tài xế — chủ sở hữu số nhiều — nên dấu lược đứng sau -s: drivers'. B là một tài xế; C không thể hiện sở hữu."
    },
    {
      id: "q6",
      passageId: "p5_memo",
      type: "mcq",
      title: "6. \"The printer is old, but ______ still working, and ______ paper tray is full.\" Which pair is correct?",
      options: [
        { val: "A", text: "A. its / it's" },
        { val: "B", text: "B. it's / its" },
        { val: "C", text: "C. its / its" },
        { val: "D", text: "D. it's / it's" }
      ],
      correct: "B",
      expEn: "\"It is still working\" makes sense, so the first is it's. The tray belongs to the printer, so the second is the possessive its.",
      expVn: "\"It is still working\" có nghĩa, nên từ đầu là it's. Khay giấy thuộc về máy in, nên từ thứ hai là its sở hữu."
    },
    {
      id: "q7",
      passageId: "p5_memo",
      type: "mcq",
      title: "7. \"______ going to park ______ van over ______.\" Which set is correct?",
      options: [
        { val: "A", text: "A. Their / they're / there" },
        { val: "B", text: "B. There / their / they're" },
        { val: "C", text: "C. They're / their / there" },
        { val: "D", text: "D. They're / there / their" }
      ],
      correct: "C",
      expEn: "\"They are going\" → they're. The van belongs to them → their. \"Over there\" is a place → there.",
      expVn: "\"They are going\" → they're. Chiếc xe thuộc về họ → their. \"Over there\" là nơi chốn → there."
    },
    {
      id: "q8",
      passageId: "p5_memo",
      type: "mcq",
      title: "8. Which sentence uses capital letters correctly?",
      options: [
        { val: "A", text: "A. On monday, Dr Patel and i will visit the Hanoi office." },
        { val: "B", text: "B. On Monday, dr Patel and I will visit the hanoi office." },
        { val: "C", text: "C. on Monday, Dr Patel and I will visit the Hanoi office." },
        { val: "D", text: "D. On Monday, Dr Patel and I will visit the Hanoi office." }
      ],
      correct: "D",
      expEn: "The first word, the day (Monday), the title and name (Dr Patel), the word I and the place (Hanoi) all need capitals. Only D has all of them.",
      expVn: "Từ đầu câu, tên ngày (Monday), chức danh và tên (Dr Patel), từ I và địa danh (Hanoi) đều cần viết hoa. Chỉ D có đủ."
    },
    {
      id: "q9",
      passageId: "p5_memo",
      type: "mcq",
      title: "9. \"The new rota will ______ everyone ______ the night staff.\" Which pair is correct?",
      options: [
        { val: "A", text: "A. affect / except" },
        { val: "B", text: "B. effect / except" },
        { val: "C", text: "C. affect / accept" },
        { val: "D", text: "D. effect / accept" }
      ],
      correct: "A",
      expEn: "\"Will affect\" needs the verb affect (to change). \"Except the night staff\" means not including them; accept means to agree to receive.",
      expVn: "\"Will affect\" cần động từ affect (làm thay đổi). \"Except the night staff\" nghĩa là không bao gồm họ; accept nghĩa là đồng ý nhận."
    },
    {
      id: "q10",
      passageId: "p5_memo",
      type: "mcq",
      title: "10. \"______ bag is this? If we do not label them, someone will ______ theirs.\" Which pair is correct?",
      options: [
        { val: "A", text: "A. Who's / loose" },
        { val: "B", text: "B. Whose / lose" },
        { val: "C", text: "C. Whose / loose" },
        { val: "D", text: "D. Who's / lose" }
      ],
      correct: "B",
      expEn: "The bag belongs to someone, so the possessive whose is right (\"who is bag\" makes no sense). \"Lose\" with one o means to no longer have; loose means not tight.",
      expVn: "Chiếc túi thuộc về ai đó, nên từ sở hữu whose là đúng (\"who is bag\" vô nghĩa). \"Lose\" với một chữ o nghĩa là mất; loose nghĩa là lỏng."
    }
  ]
};
