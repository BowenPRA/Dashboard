// src/data/GED_ENG/ENG_0B/assessment.js
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p0b_notice",
      title: "Notice: The Volunteer Programme",
      meta: "Community notice • Riverton Public Library",
      text: [
        "The library runs a volunteer programme every summer, and it welcomes new members each June. A volunteer who joins the programme learns how the shelves are organised and how the front desk works. Everyone on the team receives a short handbook, and each member keeps a copy at home.",
        "The box of training materials sits behind the desk. One of the guides explains the loan system, and the other lists the opening hours. The senior librarian, along with two assistants, checks the returns every morning. When a book is late, a reminder is sent to the borrower automatically.",
        "Neither the manager nor the volunteers want the programme to end. The committee meets in September, and it decides whether the scheme continues. Anybody who wishes to join next year needs to sign the list at reception."
      ],
      glossary: {
        "programme": { def: "A planned set of activities with a shared goal.", vn: "Chương trình", vnDef: "Một tập hợp các hoạt động có kế hoạch với mục tiêu chung." },
        "handbook": { def: "A small book giving instructions or information.", vn: "Sổ tay", vnDef: "Một cuốn sách nhỏ đưa ra hướng dẫn hoặc thông tin." },
        "committee": { def: "A group of people chosen to make decisions.", vn: "Ủy ban", vnDef: "Một nhóm người được chọn để đưa ra quyết định." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p0b_notice",
      type: "mcq",
      title: "1. \"A volunteer who joins the programme ______ how the shelves are organised.\" Which verb agrees?",
      options: [
        { val: "A", text: "A. learns" },
        { val: "B", text: "B. learn" },
        { val: "C", text: "C. are learning" },
        { val: "D", text: "D. have learned" }
      ],
      correct: "A",
      expEn: "The subject \"a volunteer\" is singular, so the present-tense verb takes an -s: \"learns\".",
      expVn: "Chủ ngữ \"a volunteer\" là số ít, nên động từ thì hiện tại mang -s: \"learns\"."
    },
    {
      id: "q2",
      passageId: "p0b_notice",
      type: "mcq",
      title: "2. \"The box of training materials ______ behind the desk.\" Which verb is correct?",
      options: [
        { val: "A", text: "A. sit" },
        { val: "B", text: "B. are sitting" },
        { val: "C", text: "C. sits" },
        { val: "D", text: "D. were sitting" }
      ],
      correct: "C",
      expEn: "The subject is \"box\" (one), not \"materials\". Cross out \"of training materials\" and the singular verb \"sits\" is clear.",
      expVn: "Chủ ngữ là \"box\" (một), không phải \"materials\". Gạch bỏ \"of training materials\" và động từ số ít \"sits\" trở nên rõ ràng."
    },
    {
      id: "q3",
      passageId: "p0b_notice",
      type: "mcq",
      title: "3. \"One of the guides ______ the loan system.\" Which verb agrees?",
      options: [
        { val: "A", text: "A. explain" },
        { val: "B", text: "B. explains" },
        { val: "C", text: "C. were explaining" },
        { val: "D", text: "D. are explaining" }
      ],
      correct: "B",
      expEn: "\"One\" is the subject and is singular, so the verb is \"explains\". \"Of the guides\" is just a describing phrase.",
      expVn: "\"One\" là chủ ngữ và là số ít, nên động từ là \"explains\". \"Of the guides\" chỉ là cụm từ bổ nghĩa."
    },
    {
      id: "q4",
      passageId: "p0b_notice",
      type: "mcq",
      title: "4. \"The senior librarian, along with two assistants, ______ the returns every morning.\" Which verb is correct?",
      options: [
        { val: "A", text: "A. check" },
        { val: "B", text: "B. are checking" },
        { val: "C", text: "C. have checked" },
        { val: "D", text: "D. checks" }
      ],
      correct: "D",
      expEn: "\"Along with two assistants\" does not change the subject. The subject is still \"the librarian\" (one), so the verb is \"checks\".",
      expVn: "\"Along with two assistants\" không thay đổi chủ ngữ. Chủ ngữ vẫn là \"the librarian\" (một), nên động từ là \"checks\"."
    },
    {
      id: "q5",
      passageId: "p0b_notice",
      type: "mcq",
      title: "5. \"Everyone on the team ______ a short handbook.\" Which verb agrees?",
      options: [
        { val: "A", text: "A. receives" },
        { val: "B", text: "B. receive" },
        { val: "C", text: "C. are receiving" },
        { val: "D", text: "D. have received" }
      ],
      correct: "A",
      expEn: "\"Everyone\" ends in -one and is singular, so the verb takes an -s: \"receives\".",
      expVn: "\"Everyone\" kết thúc bằng -one và là số ít, nên động từ mang -s: \"receives\"."
    },
    {
      id: "q6",
      passageId: "p0b_notice",
      type: "mcq",
      title: "6. \"The committee ______ in September to review the scheme.\" Which verb does formal English prefer?",
      options: [
        { val: "A", text: "A. meet" },
        { val: "B", text: "B. are meeting" },
        { val: "C", text: "C. meets" },
        { val: "D", text: "D. have met" }
      ],
      correct: "C",
      expEn: "A committee is a collective noun — one group — so formal written English uses the singular verb \"meets\".",
      expVn: "Một ủy ban là danh từ tập hợp — một nhóm — nên tiếng Anh viết trang trọng dùng động từ số ít \"meets\"."
    },
    {
      id: "q7",
      passageId: "p0b_notice",
      type: "mcq",
      title: "7. \"Ana and Minh ______ the returned books onto the shelves.\" Which verb is correct?",
      options: [
        { val: "A", text: "A. puts" },
        { val: "B", text: "B. put" },
        { val: "C", text: "C. was putting" },
        { val: "D", text: "D. is putting" }
      ],
      correct: "B",
      expEn: "\"And\" joins two subjects into a plural, so the verb has no -s: \"put\".",
      expVn: "\"And\" nối hai chủ ngữ thành số nhiều, nên động từ không có -s: \"put\"."
    },
    {
      id: "q8",
      passageId: "p0b_notice",
      type: "mcq",
      title: "8. \"Neither the manager nor the volunteers ______ the programme to end.\" Which verb agrees?",
      options: [
        { val: "A", text: "A. wants" },
        { val: "B", text: "B. is wanting" },
        { val: "C", text: "C. has wanted" },
        { val: "D", text: "D. want" }
      ],
      correct: "D",
      expEn: "With \"neither…nor\", the verb matches the nearest noun. The closest is \"volunteers\" (plural), so use \"want\".",
      expVn: "Với \"neither…nor\", động từ hòa hợp với danh từ gần nhất. Gần nhất là \"volunteers\" (số nhiều), nên dùng \"want\"."
    },
    {
      id: "q9",
      passageId: "p0b_notice",
      type: "mcq",
      title: "9. Which sentence has CORRECT subject-verb agreement?",
      options: [
        { val: "A", text: "A. The list of dates are on the wall." },
        { val: "B", text: "B. Each of the members have a key." },
        { val: "C", text: "C. The team practises twice a week." },
        { val: "D", text: "D. Everybody know the rules." }
      ],
      correct: "C",
      expEn: "A team is singular, so \"practises\" is right. A should be \"is\" (list), B should be \"has\" (each), and D should be \"knows\" (everybody).",
      expVn: "Một đội là số ít, nên \"practises\" đúng. A phải là \"is\" (list), B phải là \"has\" (each), và D phải là \"knows\" (everybody)."
    },
    {
      id: "q10",
      passageId: "p0b_notice",
      type: "mcq",
      title: "10. \"There ______ several reminders waiting in the system.\" Which verb agrees?",
      options: [
        { val: "A", text: "A. are" },
        { val: "B", text: "B. was" },
        { val: "C", text: "C. is" },
        { val: "D", text: "D. has been" }
      ],
      correct: "A",
      expEn: "In a \"there ___\" sentence, the verb agrees with the noun that follows. \"Reminders\" is plural, so use \"are\".",
      expVn: "Trong câu \"there ___\", động từ hòa hợp với danh từ theo sau. \"Reminders\" là số nhiều, nên dùng \"are\"."
    },
    {
      id: "q11",
      passageId: "p0b_notice",
      type: "mcq",
      title: "11. \"Anybody who returns a book late ______ a short reminder.\" Which verb is correct?",
      options: [
        { val: "A", text: "A. receive" },
        { val: "B", text: "B. receives" },
        { val: "C", text: "C. are receiving" },
        { val: "D", text: "D. were receiving" }
      ],
      correct: "B",
      expEn: "\"Anybody\" is singular, so the verb takes an -s: \"receives\". The phrase \"who returns a book late\" does not change that.",
      expVn: "\"Anybody\" là số ít, nên động từ mang -s: \"receives\". Cụm \"who returns a book late\" không thay đổi điều đó."
    },
    {
      id: "q12",
      passageId: "p0b_notice",
      type: "mcq",
      title: "12. Which sentence is INCORRECT?",
      options: [
        { val: "A", text: "A. The volunteers organise the shelves every week." },
        { val: "B", text: "B. The company keeps its records for six years." },
        { val: "C", text: "C. Ana or her brothers open the library on Sundays." },
        { val: "D", text: "D. One of the guides list the opening hours." }
      ],
      correct: "D",
      expEn: "D is wrong: the subject is \"one\" (singular), so it should be \"lists\". The other three all agree correctly.",
      expVn: "D sai: chủ ngữ là \"one\" (số ít), nên phải là \"lists\". Ba câu còn lại đều hòa hợp đúng."
    }
  ]
};
