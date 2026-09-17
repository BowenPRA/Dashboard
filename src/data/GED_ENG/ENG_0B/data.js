// src/data/GED_ENG/ENG_0B/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { games } from './games.js';

export const ENGLISH_0B_DATA = {
  meta: {
    id: "ENG_0B",
    title: "Grammar Foundations 2: Subject–Verb Agreement",
    desc: "Match every verb to its true subject, ignore the phrases the GED puts in the way, and handle group nouns, -body words, and and/or subjects.",
    track: "GED_ENG",
    icon: "GraduationCap"
  },
  // Prove swaps ESSAY (p8) for PROOFREAD (p33): a grammar unit proves itself by
  // finding and fixing agreement errors, not by writing an essay (the reading
  // units and the capstone carry the Extended Response). XP total and gates unchanged.
  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 15 }
      ]
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      // SPELLING removed — never tested on the GED (GED-SPRINT.md §4). Its 10 XP
      // moved into GRAMMAR_EDIT, the editing skill the RLA actually tests.
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 15 },
        { id: "GRAMMAR_EDIT", dbKey: "p13", maxXP: 30 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "PROOFREAD", dbKey: "p33", maxXP: 15 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 }
      ]
    },
    {
      id: "arcade",
      title: "Arcade",
      threshold: 75,
      tasks: [
        { id: "GAMES", dbKey: "p12", maxXP: 0 }
      ]
    }
  ],
  realWords: [
    {
      word: "Verb",
      vn: "Động từ",
      def: "A word that shows an action or a state of being, such as run, work or is.",
      vnDef: "Một từ thể hiện hành động hoặc trạng thái, như run, work hoặc is.",
      sent: "The verb must change its form to match the subject.",
      vnSent: "Động từ phải thay đổi dạng để hòa hợp với chủ ngữ.",
      dictSent: "The verb must change its form to match the subject.",
      isReal: true
    },
    {
      word: "Subject",
      vn: "Chủ ngữ",
      def: "The person or thing in a sentence that does the action.",
      vnDef: "Người hoặc vật trong câu thực hiện hành động.",
      sent: "Find the subject first, then decide whether the verb needs an -s.",
      vnSent: "Tìm chủ ngữ trước, rồi quyết định động từ có cần -s hay không.",
      dictSent: "Find the subject first, then decide whether the verb needs an -s.",
      isReal: true
    },
    {
      word: "Agreement",
      vn: "Sự hòa hợp",
      def: "The rule that a verb must match its subject in number.",
      vnDef: "Quy tắc rằng động từ phải hòa hợp với chủ ngữ về mặt số lượng.",
      sent: "Subject-verb agreement is tested on almost every GED writing section.",
      vnSent: "Sự hòa hợp chủ ngữ-động từ được kiểm tra ở hầu hết mọi phần viết của GED.",
      dictSent: "Subject-verb agreement is tested on almost every GED writing section.",
      isReal: true
    },
    {
      word: "Singular",
      vn: "Số ít",
      def: "Referring to only one person or thing.",
      vnDef: "Chỉ đề cập đến một người hoặc một vật.",
      sent: "A singular subject in the present tense usually takes a verb ending in -s.",
      vnSent: "Một chủ ngữ số ít ở thì hiện tại thường dùng động từ kết thúc bằng -s.",
      dictSent: "A singular subject in the present tense usually takes a verb ending in -s.",
      isReal: true
    },
    {
      word: "Plural",
      vn: "Số nhiều",
      def: "Referring to more than one person or thing.",
      vnDef: "Đề cập đến nhiều hơn một người hoặc một vật.",
      sent: "A plural subject takes a verb with no -s, as in they work.",
      vnSent: "Một chủ ngữ số nhiều dùng động từ không có -s, như trong they work.",
      dictSent: "A plural subject takes a verb with no -s, as in they work.",
      isReal: true
    },
    {
      word: "Phrase",
      vn: "Cụm từ",
      def: "A small group of words that acts as one unit but is not a full sentence.",
      vnDef: "Một nhóm nhỏ từ hoạt động như một đơn vị nhưng không phải câu hoàn chỉnh.",
      sent: "Ignore the phrase between the subject and the verb.",
      vnSent: "Bỏ qua cụm từ nằm giữa chủ ngữ và động từ.",
      dictSent: "Ignore the phrase between the subject and the verb.",
      isReal: true
    },
    {
      word: "Collective",
      vn: "Tập hợp",
      def: "Describing a noun that names a group as a single unit, such as team or committee.",
      vnDef: "Mô tả một danh từ gọi tên một nhóm như một đơn vị duy nhất, như team hoặc committee.",
      sent: "A collective noun like company takes a singular verb.",
      vnSent: "Một danh từ tập hợp như company dùng động từ số ít.",
      dictSent: "A collective noun like company takes a singular verb.",
      isReal: true
    },
    {
      word: "Present",
      vn: "Hiện tại",
      def: "The tense used for actions happening now or as a general rule.",
      vnDef: "Thì dùng cho hành động đang xảy ra bây giờ hoặc như một quy tắc chung.",
      sent: "The one-s rule applies to verbs in the present tense.",
      vnSent: "Quy tắc một chữ S áp dụng cho động từ ở thì hiện tại.",
      dictSent: "The one-s rule applies to verbs in the present tense.",
      isReal: true
    },
    {
      word: "Indefinite",
      vn: "Bất định",
      def: "Describing a pronoun such as everyone or nobody that does not name a specific person.",
      vnDef: "Mô tả một đại từ như everyone hoặc nobody không gọi tên một người cụ thể.",
      sent: "Indefinite pronouns like everybody are singular on the GED.",
      vnSent: "Các đại từ bất định như everybody là số ít trong bài thi GED.",
      dictSent: "Indefinite pronouns like everybody are singular on the GED.",
      isReal: true
    },
    {
      word: "Interrupt",
      vn: "Xen vào",
      def: "To break into something, such as a phrase that comes between the subject and verb.",
      vnDef: "Chen vào giữa điều gì đó, như một cụm từ nằm giữa chủ ngữ và động từ.",
      sent: "A phrase that interrupts the sentence can hide the true subject.",
      vnSent: "Một cụm từ xen vào câu có thể che giấu chủ ngữ thật.",
      dictSent: "A phrase that interrupts the sentence can hide the true subject.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Basic Rule",
      text: "Subject-verb {agreement} means the {verb} must match the {subject} that does the action. In the {present} tense, a {singular} subject usually needs a verb ending in -s, while a {plural} subject needs a verb with no -s.",
      vnText: "Sự hòa hợp chủ ngữ-động từ nghĩa là động từ phải khớp với chủ ngữ thực hiện hành động. Ở thì hiện tại, một chủ ngữ số ít thường cần động từ kết thúc bằng -s, trong khi một chủ ngữ số nhiều cần động từ không có -s."
    },
    {
      id: "passage_2",
      title: "Words That Get in the Way",
      text: "The test often puts a {phrase} between the subject and the verb to {interrupt} your thinking. The words after 'of' or 'with' are never the subject, so cross them out and find the real noun before you choose the verb.",
      vnText: "Bài thi thường đặt một cụm từ giữa chủ ngữ và động từ để làm gián đoạn suy nghĩ của bạn. Các từ sau 'of' hoặc 'with' không bao giờ là chủ ngữ, nên hãy gạch bỏ chúng và tìm danh từ thật trước khi chọn động từ."
    },
    {
      id: "passage_3",
      title: "Groups and Everybody",
      text: "A {collective} noun such as team or committee names a group but counts as one, so it takes a singular verb. An {indefinite} pronoun such as everyone or nobody is also singular, even though it can feel like many people.",
      vnText: "Một danh từ tập hợp như team hoặc committee gọi tên một nhóm nhưng được tính là một, nên dùng động từ số ít. Một đại từ bất định như everyone hoặc nobody cũng là số ít, dù nó có vẻ như nhiều người."
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "The Recycling Notice",
      titleVn: "Thông báo về việc tái chế",
      passage: "Our building [[b1]] a new recycling scheme this month. Each resident [[b2]] a set of coloured bags for glass, paper and food. The box of instructions [[b3]] by the front door, and everybody [[b4]] to read it before Monday. The caretakers [[b5]] the bins twice a week.",
      blanks: [
        {
          id: "b1",
          options: ["start", "starts", "are starting"],
          correct: "starts",
          expEn: "\"Our building\" is one thing, so the singular verb \"starts\" is correct.",
          expVn: "\"Our building\" là một thứ, nên động từ số ít \"starts\" là đúng."
        },
        {
          id: "b2",
          options: ["receive", "receives", "have received"],
          correct: "receives",
          expEn: "\"Each resident\" is singular, so the verb takes an -s: \"receives\".",
          expVn: "\"Each resident\" là số ít, nên động từ mang -s: \"receives\"."
        },
        {
          id: "b3",
          options: ["sit", "sits", "are sitting"],
          correct: "sits",
          expEn: "The subject is \"box\" (one), not \"instructions\". Cross out \"of instructions\" and \"sits\" is clear.",
          expVn: "Chủ ngữ là \"box\" (một), không phải \"instructions\". Gạch bỏ \"of instructions\" và \"sits\" trở nên rõ ràng."
        },
        {
          id: "b4",
          options: ["need", "needs", "are needing"],
          correct: "needs",
          expEn: "\"Everybody\" is singular on the GED, so the verb takes an -s: \"needs\".",
          expVn: "\"Everybody\" là số ít trong bài thi GED, nên động từ mang -s: \"needs\"."
        },
        {
          id: "b5",
          options: ["empty", "empties", "has emptied"],
          correct: "empty",
          expEn: "\"The caretakers\" is plural, so the verb has no -s: \"empty\".",
          expVn: "\"The caretakers\" là số nhiều, nên động từ không có -s: \"empty\"."
        }
      ]
    },
    {
      id: "ge2",
      title: "The School Trip",
      titleVn: "Chuyến đi của trường",
      passage: "The class [[b1]] a museum in the city next Friday. One of the teachers [[b2]] the tickets, and the list of names [[b3]] on the office door. Neither the students nor the guide [[b4]] the way, so a map [[b5]] been printed for everyone.",
      blanks: [
        {
          id: "b1",
          options: ["visit", "visits", "are visiting"],
          correct: "visits",
          expEn: "\"The class\" is a collective noun — one group — so it takes the singular \"visits\".",
          expVn: "\"The class\" là danh từ tập hợp — một nhóm — nên dùng \"visits\" số ít."
        },
        {
          id: "b2",
          options: ["hold", "holds", "are holding"],
          correct: "holds",
          expEn: "The subject is \"one\" (singular), not \"teachers\", so the verb is \"holds\".",
          expVn: "Chủ ngữ là \"one\" (số ít), không phải \"teachers\", nên động từ là \"holds\"."
        },
        {
          id: "b3",
          options: ["is", "are", "were"],
          correct: "is",
          expEn: "The subject is \"list\" (one), not \"names\". Ignore \"of names\" and use \"is\".",
          expVn: "Chủ ngữ là \"list\" (một), không phải \"names\". Bỏ qua \"of names\" và dùng \"is\"."
        },
        {
          id: "b4",
          options: ["know", "knows", "is knowing"],
          correct: "knows",
          expEn: "With \"neither…nor\", the verb matches the nearest noun. \"Guide\" is singular, so use \"knows\".",
          expVn: "Với \"neither…nor\", động từ hòa hợp với danh từ gần nhất. \"Guide\" là số ít, nên dùng \"knows\"."
        },
        {
          id: "b5",
          options: ["have", "has", "are"],
          correct: "has",
          expEn: "The subject is \"a map\" (one), so the present perfect uses \"has been printed\".",
          expVn: "Chủ ngữ là \"a map\" (một), nên thì hiện tại hoàn thành dùng \"has been printed\"."
        }
      ]
    },
    {
      id: "ge3",
      title: "The Small Business",
      titleVn: "Doanh nghiệp nhỏ",
      passage: "My aunt [[b1]] a bakery on the corner of our street. The smell of fresh loaves [[b2]] customers in every morning. Her two assistants [[b3]] the counter while she bakes. The company [[b4]] its bread locally, and everyone who works there [[b5]] proud of it.",
      blanks: [
        {
          id: "b1",
          options: ["run", "runs", "are running"],
          correct: "runs",
          expEn: "\"My aunt\" is one person, so the singular verb \"runs\" is correct.",
          expVn: "\"My aunt\" là một người, nên động từ số ít \"runs\" là đúng."
        },
        {
          id: "b2",
          options: ["bring", "brings", "are bringing"],
          correct: "brings",
          expEn: "The subject is \"smell\" (one), not \"loaves\". Ignore \"of fresh loaves\" and use \"brings\".",
          expVn: "Chủ ngữ là \"smell\" (một), không phải \"loaves\". Bỏ qua \"of fresh loaves\" và dùng \"brings\"."
        },
        {
          id: "b3",
          options: ["serve", "serves", "is serving"],
          correct: "serve",
          expEn: "\"Her two assistants\" is plural, so the verb has no -s: \"serve\".",
          expVn: "\"Her two assistants\" là số nhiều, nên động từ không có -s: \"serve\"."
        },
        {
          id: "b4",
          options: ["sell", "sells", "are selling"],
          correct: "sells",
          expEn: "\"The company\" is a collective noun and singular here, so use \"sells\".",
          expVn: "\"The company\" là danh từ tập hợp và số ít ở đây, nên dùng \"sells\"."
        },
        {
          id: "b5",
          options: ["is", "are", "were"],
          correct: "is",
          expEn: "\"Everyone\" is singular, so it takes \"is\", even with the phrase \"who works there\" in between.",
          expVn: "\"Everyone\" là số ít, nên dùng \"is\", ngay cả khi có cụm \"who works there\" ở giữa."
        }
      ]
    }
  ],
  // Find & Fix: every listed error is an agreement slip from this unit
  // (interrupting phrases, collective nouns, everybody/each, neither…nor) plus
  // one general slip per passage. Everything NOT listed is correct English.
  proofread: [
    {
      id: "pf1",
      title: "The Library Newsletter",
      titleVn: "Bản tin thư viện",
      passage: "The library on Mill Street have a new timetable this month. The list of opening hours are printed on the back page. Each of our study rooms now takes bookings online, and everybody who uses them need to bring a library card. The librarians are happy to help anyone who finds the new system confusing Our reading group meet on Wednesday evenings, and new members are always welcome.",
      errors: [
        {
          id: "e1",
          wrong: "have",
          right: "has",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "The subject is \"library\" (one), not \"Mill Street\". Cross out \"on Mill Street\" and the verb must be \"has\".",
          expVn: "Chủ ngữ là \"library\" (một), không phải \"Mill Street\". Gạch bỏ \"on Mill Street\" và động từ phải là \"has\"."
        },
        {
          id: "e2",
          wrong: "hours are printed",
          right: "hours is printed",
          accept: [],
          kind: "Interrupting phrase",
          expEn: "The subject is \"list\" (one), not \"hours\". The words after \"of\" are never the subject, so the verb is \"is\".",
          expVn: "Chủ ngữ là \"list\" (một), không phải \"hours\". Các từ sau \"of\" không bao giờ là chủ ngữ, nên động từ là \"is\"."
        },
        {
          id: "e3",
          wrong: "need",
          right: "needs",
          accept: [],
          kind: "Indefinite pronoun",
          expEn: "\"Everybody\" is singular, so the verb takes an -s: \"needs\". The phrase \"who uses them\" in between does not change that.",
          expVn: "\"Everybody\" là số ít, nên động từ mang -s: \"needs\". Cụm \"who uses them\" ở giữa không thay đổi điều đó."
        },
        {
          id: "e4",
          wrong: "confusing Our",
          right: "confusing. Our",
          accept: [],
          kind: "Missing full stop",
          expEn: "A new sentence starts at \"Our reading group\", so the sentence before it needs a full stop.",
          expVn: "Một câu mới bắt đầu ở \"Our reading group\", nên câu trước đó cần dấu chấm."
        },
        {
          id: "e5",
          wrong: "meet",
          right: "meets",
          accept: [],
          kind: "Collective noun",
          expEn: "\"Our reading group\" is a collective noun — one group — so it takes the singular verb \"meets\".",
          expVn: "\"Our reading group\" là danh từ tập hợp — một nhóm — nên dùng động từ số ít \"meets\"."
        }
      ]
    },
    {
      id: "pf2",
      title: "Minutes of the Residents' Meeting",
      titleVn: "Biên bản cuộc họp cư dân",
      passage: "The residents' committee meets on the first Monday of every month. Neither the chairman nor the two secretaries was present last week, so the meeting were short. The bags of rubbish beside the back gate remains a problem, and the caretaker have asked everyone to use the bins. Each family on the ground floor receives a key to the garden. The committee is grateful for the new benches, and i thank the volunteers who painted them.",
      errors: [
        {
          id: "e1",
          wrong: "was present",
          right: "were present",
          accept: [],
          kind: "Neither…nor",
          expEn: "With \"neither…nor\", the verb matches the nearest noun. \"Secretaries\" is plural, so use \"were\".",
          expVn: "Với \"neither…nor\", động từ hòa hợp với danh từ gần nhất. \"Secretaries\" là số nhiều, nên dùng \"were\"."
        },
        {
          id: "e2",
          wrong: "were short",
          right: "was short",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The meeting\" is one thing, so the past-tense verb is \"was\", not \"were\".",
          expVn: "\"The meeting\" là một thứ, nên động từ quá khứ là \"was\", không phải \"were\"."
        },
        {
          id: "e3",
          wrong: "remains",
          right: "remain",
          accept: [],
          kind: "Interrupting phrase",
          expEn: "The subject is \"bags\" (plural), not \"rubbish\" or \"gate\". Cross out \"of rubbish beside the back gate\" and the verb is \"remain\".",
          expVn: "Chủ ngữ là \"bags\" (số nhiều), không phải \"rubbish\" hay \"gate\". Gạch bỏ \"of rubbish beside the back gate\" và động từ là \"remain\"."
        },
        {
          id: "e4",
          wrong: "have asked",
          right: "has asked",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The caretaker\" is one person, so the present perfect uses \"has asked\".",
          expVn: "\"The caretaker\" là một người, nên thì hiện tại hoàn thành dùng \"has asked\"."
        },
        {
          id: "e5",
          wrong: "i thank",
          right: "I thank",
          accept: [],
          kind: "Capital I",
          expEn: "The pronoun \"I\" is always a capital letter, even in the middle of a sentence.",
          expVn: "Đại từ \"I\" luôn viết hoa, ngay cả ở giữa câu."
        }
      ]
    },
    {
      id: "pf3",
      title: "A Notice from the Gym",
      titleVn: "Thông báo từ phòng tập",
      passage: "Our gym opens at six every morning, and the changing rooms close at ten. The price of the family passes go up on the first of March. Everybody who joins before that date keep the old price for a full year. The set of new weights arrive next week, and the team of trainers is planning a free class to show members how to use them. Neither the pool nor the sauna are open on Sunday afternoons Please ask at the desk if you have any questions.",
      errors: [
        {
          id: "e1",
          wrong: "go up",
          right: "goes up",
          accept: [],
          kind: "Interrupting phrase",
          expEn: "The subject is \"price\" (one), not \"passes\". Ignore \"of the family passes\" and the verb is \"goes\".",
          expVn: "Chủ ngữ là \"price\" (một), không phải \"passes\". Bỏ qua \"of the family passes\" và động từ là \"goes\"."
        },
        {
          id: "e2",
          wrong: "keep",
          right: "keeps",
          accept: [],
          kind: "Indefinite pronoun",
          expEn: "\"Everybody\" is singular, so the verb takes an -s: \"keeps\". The phrase \"who joins before that date\" is only an interruption.",
          expVn: "\"Everybody\" là số ít, nên động từ mang -s: \"keeps\". Cụm \"who joins before that date\" chỉ là phần xen vào."
        },
        {
          id: "e3",
          wrong: "arrive",
          right: "arrives",
          accept: [],
          kind: "Interrupting phrase",
          expEn: "The subject is \"set\" (one), not \"weights\". Cross out \"of new weights\" and the verb is \"arrives\".",
          expVn: "Chủ ngữ là \"set\" (một), không phải \"weights\". Gạch bỏ \"of new weights\" và động từ là \"arrives\"."
        },
        {
          id: "e4",
          wrong: "sauna are",
          right: "sauna is",
          accept: [],
          kind: "Neither…nor",
          expEn: "With \"neither…nor\", the verb matches the nearest noun. \"Sauna\" is singular, so use \"is\".",
          expVn: "Với \"neither…nor\", động từ hòa hợp với danh từ gần nhất. \"Sauna\" là số ít, nên dùng \"is\"."
        },
        {
          id: "e5",
          wrong: "afternoons Please",
          right: "afternoons. Please",
          accept: [],
          kind: "Missing full stop",
          expEn: "A new sentence starts at \"Please ask\", so the sentence before it needs a full stop.",
          expVn: "Một câu mới bắt đầu ở \"Please ask\", nên câu trước đó cần dấu chấm."
        }
      ]
    }
  ],
  assessment,
  games,
  notes
};
