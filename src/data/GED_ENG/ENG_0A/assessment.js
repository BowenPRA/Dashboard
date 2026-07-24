// src/data/GED_ENG/ENG_0A/assessment.js
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p0a_memo",
      title: "Staff Memo: The New Scheduling System",
      meta: "Internal memo • Riverton Community Clinic",
      text: [
        "Beginning next month, the clinic will move its staff rota onto a new online system. Every employee will receive a login code by email, and he or she must activate the account before the first of the month. If a member of staff cannot access the site, he or she should contact the office manager, Ms. Alvarez, rather than the IT company.",
        "Ms. Alvarez met with the reception team last week and showed them how to swap a shift. She reminded the team that the clinic keeps its records for six years, so every request must be logged in writing. When a nurse asks a receptionist to change a shift, the receptionist must confirm the change by email, because a spoken agreement leaves no record.",
        "The old paper rota will stay on the wall until March. After that, it will be removed. Anyone who prefers a printed copy may ask for one, and the office will print it for him or her each Friday."
      ],
      glossary: {
        "rota": { def: "A list showing when each person is due to work.", vn: "Lịch trực", vnDef: "Danh sách cho biết khi nào mỗi người phải làm việc." },
        "activate": { def: "To make something start working.", vn: "Kích hoạt", vnDef: "Làm cho thứ gì đó bắt đầu hoạt động." },
        "log": { def: "To record something officially in writing.", vn: "Ghi nhận", vnDef: "Ghi lại điều gì đó chính thức bằng văn bản." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p0a_memo",
      type: "mcq",
      title: "1. In \"the clinic will move its staff rota\", why is \"its\" correct?",
      options: [
        { val: "A", text: "A. Because \"clinic\" is plural and needs a plural possessive." },
        { val: "B", text: "B. Because \"clinic\" is one thing, and \"its\" is the singular possessive." },
        { val: "C", text: "C. Because \"its\" is short for \"it is\"." },
        { val: "D", text: "D. Because every noun that ends in a consonant takes \"its\"." }
      ],
      correct: "B",
      expEn: "A clinic is a single organisation, so it takes the singular possessive \"its\". Note there is no apostrophe — \"it's\" would mean \"it is\".",
      expVn: "Một phòng khám là một tổ chức duy nhất, nên dùng sở hữu số ít \"its\". Lưu ý không có dấu nháy — \"it's\" nghĩa là \"it is\"."
    },
    {
      id: "q2",
      passageId: "p0a_memo",
      type: "mcq",
      title: "2. Which sentence uses \"it's\" correctly?",
      options: [
        { val: "A", text: "A. It's important to activate your account early." },
        { val: "B", text: "B. The clinic changed it's opening hours." },
        { val: "C", text: "C. The dog wagged it's tail." },
        { val: "D", text: "D. Every team must submit it's report." }
      ],
      correct: "A",
      expEn: "Only A works when you expand it: \"It is important to activate your account early.\" B, C and D all show possession, so they need \"its\".",
      expVn: "Chỉ A đúng khi bạn mở rộng: \"It is important...\". B, C và D đều thể hiện sở hữu, nên cần \"its\"."
    },
    {
      id: "q3",
      passageId: "p0a_memo",
      type: "mcq",
      title: "3. \"Every employee will receive a login code, and ______ must activate the account.\" Which option is correct on the GED?",
      options: [
        { val: "A", text: "A. they" },
        { val: "B", text: "B. them" },
        { val: "C", text: "C. their" },
        { val: "D", text: "D. he or she" }
      ],
      correct: "D",
      expEn: "\"Every employee\" is singular — one employee at a time — so formal written English requires the singular \"he or she\", even though \"they\" is normal in speech.",
      expVn: "\"Every employee\" là số ít — mỗi nhân viên một lúc — nên tiếng Anh viết trang trọng yêu cầu \"he or she\" số ít, dù \"they\" là bình thường trong lời nói."
    },
    {
      id: "q4",
      passageId: "p0a_memo",
      type: "mcq",
      title: "4. \"Ms. Alvarez showed ______ how to swap a shift.\" Which pronoun fits?",
      options: [
        { val: "A", text: "A. they" },
        { val: "B", text: "B. their" },
        { val: "C", text: "C. them" },
        { val: "D", text: "D. theirs" }
      ],
      correct: "C",
      expEn: "The reception team receives the action of \"showed\", so it needs the object pronoun \"them\". \"They\" would be the subject form.",
      expVn: "Nhóm lễ tân nhận hành động \"showed\", nên cần đại từ tân ngữ \"them\". \"They\" sẽ là dạng chủ ngữ."
    },
    {
      id: "q5",
      passageId: "p0a_memo",
      type: "mcq",
      title: "5. \"Ms. Alvarez and ______ are running the training session.\" Which pronoun is correct?",
      options: [
        { val: "A", text: "A. I" },
        { val: "B", text: "B. me" },
        { val: "C", text: "C. my" },
        { val: "D", text: "D. mine" }
      ],
      correct: "A",
      expEn: "Both people are doing the action, so you need the subject pronoun \"I\". Test it by removing the other person: \"I am running the session\", not \"Me am running\".",
      expVn: "Cả hai người đều thực hiện hành động, nên cần đại từ chủ ngữ \"I\". Kiểm tra bằng cách bỏ người kia: \"I am running the session\", không phải \"Me am running\"."
    },
    {
      id: "q6",
      passageId: "p0a_memo",
      type: "mcq",
      title: "6. \"Please send the completed forms to Ms. Alvarez and ______.\" Which pronoun is correct?",
      options: [
        { val: "A", text: "A. I" },
        { val: "B", text: "B. me" },
        { val: "C", text: "C. mine" },
        { val: "D", text: "D. myself" }
      ],
      correct: "B",
      expEn: "The forms are sent TO these people, so they receive the action and need the object pronoun \"me\". Remove the other person to check: \"send the forms to me\".",
      expVn: "Các mẫu đơn được gửi ĐẾN những người này, nên họ nhận hành động và cần đại từ tân ngữ \"me\". Bỏ người kia để kiểm tra: \"send the forms to me\"."
    },
    {
      id: "q7",
      passageId: "p0a_memo",
      type: "mcq",
      title: "7. \"When the nurse spoke to the receptionist, she confirmed the change.\" What is wrong with this sentence?",
      options: [
        { val: "A", text: "A. \"She\" should be \"her\" because it receives the action." },
        { val: "B", text: "B. \"She\" should be plural because two people are mentioned." },
        { val: "C", text: "C. \"She\" is unclear — it could mean the nurse or the receptionist." },
        { val: "D", text: "D. Nothing is wrong; the sentence is correct." }
      ],
      correct: "C",
      expEn: "Both the nurse and the receptionist could be \"she\", so the reader cannot tell who confirmed the change. Replace the pronoun with the actual noun.",
      expVn: "Cả y tá và lễ tân đều có thể là \"she\", nên người đọc không thể biết ai đã xác nhận thay đổi. Thay đại từ bằng danh từ thực tế."
    },
    {
      id: "q8",
      passageId: "p0a_memo",
      type: "mcq",
      title: "8. Which is the best correction of \"When Mr. Davis met Mr. Chen, he was late\"?",
      options: [
        { val: "A", text: "A. When Mr. Davis met Mr. Chen, they was late." },
        { val: "B", text: "B. When Mr. Davis met Mr. Chen, him was late." },
        { val: "C", text: "C. When Mr. Davis met Mr. Chen, he or she was late." },
        { val: "D", text: "D. When Mr. Davis met Mr. Chen, Mr. Chen was late." }
      ],
      correct: "D",
      expEn: "Naming the person removes the ambiguity entirely. A and B break subject-verb and pronoun form; C is used for unknown gender, not for two known men.",
      expVn: "Gọi tên người loại bỏ hoàn toàn sự mơ hồ. A và B sai về hòa hợp chủ ngữ-động từ và dạng đại từ; C dùng cho giới tính không xác định, không phải cho hai người đàn ông đã biết."
    },
    {
      id: "q9",
      passageId: "p0a_memo",
      type: "mcq",
      title: "9. \"Anybody who wants a printed rota must write ______ name on the list.\" Which option does the GED require?",
      options: [
        { val: "A", text: "A. their" },
        { val: "B", text: "B. his or her" },
        { val: "C", text: "C. them" },
        { val: "D", text: "D. they're" }
      ],
      correct: "B",
      expEn: "Words ending in -one or -body (anybody, someone, everyone) are singular on the GED, so they take \"his or her\".",
      expVn: "Các từ kết thúc bằng -one hoặc -body (anybody, someone, everyone) là số ít trong bài thi GED, nên dùng \"his or her\"."
    },
    {
      id: "q10",
      passageId: "p0a_memo",
      type: "mcq",
      title: "10. \"The nurses collected ______ badges before the shift began.\" Which pronoun is correct?",
      options: [
        { val: "A", text: "A. their" },
        { val: "B", text: "B. his or her" },
        { val: "C", text: "C. its" },
        { val: "D", text: "D. there" }
      ],
      correct: "A",
      expEn: "\"The nurses\" is genuinely plural, so the plural possessive \"their\" is correct here. \"There\" is a place word, not a pronoun.",
      expVn: "\"The nurses\" thực sự là số nhiều, nên sở hữu số nhiều \"their\" là đúng ở đây. \"There\" là từ chỉ nơi chốn, không phải đại từ."
    },
    {
      id: "q11",
      passageId: "p0a_memo",
      type: "mcq",
      title: "11. \"The committee published ______ findings in March.\" Which pronoun does formal written English prefer?",
      options: [
        { val: "A", text: "A. their" },
        { val: "B", text: "B. they're" },
        { val: "C", text: "C. his or her" },
        { val: "D", text: "D. its" }
      ],
      correct: "D",
      expEn: "A committee is a collective noun — one body — so formal written English treats it as singular and uses \"its\".",
      expVn: "Một ủy ban là danh từ tập hợp — một thực thể — nên tiếng Anh viết trang trọng coi nó là số ít và dùng \"its\"."
    },
    {
      id: "q12",
      passageId: "p0a_memo",
      type: "mcq",
      title: "12. Which sentence contains NO pronoun error?",
      options: [
        { val: "A", text: "A. Each patient must bring their insurance card." },
        { val: "B", text: "B. The hospital updated their visiting hours." },
        { val: "C", text: "C. The doctors reviewed their notes before the meeting." },
        { val: "D", text: "D. Every visitor should sign their name at the desk." }
      ],
      correct: "C",
      expEn: "\"The doctors\" is plural, so \"their\" is correct. A and D use singular subjects (each, every) with \"their\", and B treats a single hospital as plural.",
      expVn: "\"The doctors\" là số nhiều, nên \"their\" là đúng. A và D dùng chủ ngữ số ít (each, every) với \"their\", còn B coi một bệnh viện duy nhất là số nhiều."
    }
  ]
};
