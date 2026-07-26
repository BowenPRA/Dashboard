// src/data/GED_ENG/ENG_0B/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';

export const ENGLISH_0B_DATA = {
  meta: {
    id: "ENG_0B",
    title: "Grammar Foundations 2: Subject–Verb Agreement",
    desc: "Match every verb to its true subject, ignore the phrases the GED puts in the way, and handle group nouns, -body words, and and/or subjects.",
    track: "GED_ENG",
    icon: "GraduationCap"
  },
  phases: [
    {
      id: "concept",
      title: "Phase 0: Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 15 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 15,
      tasks: [
        { id: "SPELLING", dbKey: "p2", maxXP: 10 },
        { id: "READ_COMP", dbKey: "p4", maxXP: 15 },
        { id: "GRAMMAR_EDIT", dbKey: "p13", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 55,
      tasks: [
        { id: "ESSAY", dbKey: "p8", maxXP: 15 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 }
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
  essay: {
    // 60 minutes: the real GED Extended Response is 45; the extra time is an ESL
    // accommodation applied across the track.
    minutesAllowed: 60,
    sources: [
      {
        title: "Four-Day School Week",
        text:
          "Schools should move to a four-day week. A trial district in the state reported that attendance rose after the change, because families could book appointments on the free day instead of during lessons. Teachers also gained a full day to prepare, and the district said that fewer of them left their jobs that year. A shorter week does not mean less learning; each of the four days is simply a little longer.",
      },
      {
        title: "Keep the Fifth Day",
        text:
          "A five-day week protects the students who need school most. For a child whose home is difficult, the fifth day is a safe place with a warm meal and an adult who listens. The trial district measured attendance but never measured what those children did on the free day. A committee of parents in another town found that childcare costs rose sharply when the school week was cut, and the burden fell hardest on families who could least afford it.",
      },
    ],
    task:
      "Both writers argue about whether schools should switch to a four-day week. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
    guidelines: [
      "State clearly which position is better supported.",
      "Use evidence from BOTH sources.",
      "Check that every verb agrees with its true subject.",
      "Write in paragraphs, with a short conclusion.",
    ],
    suggestedWords: [
      ["Evidence", "prove", "proof"],
      ["Claim", "argues", "argument", "position"],
      ["School", "schools", "students"],
    ],
    scienceMaxMarks: 4,
    markScheme: [
      "States clearly which position is better supported, rather than only which the writer personally prefers.",
      "Refers to specific evidence from Source 1 (for example the rise in attendance or fewer teachers leaving).",
      "Refers to specific evidence from Source 2 (for example the rise in childcare costs or the unmeasured free day).",
      "Evaluates the quality of the evidence rather than simply restating it, for example noting an unmeasured claim.",
    ],
    modelAnswer:
      "Source 2 is better supported because it questions the very evidence Source 1 relies on. Source 1 claims that attendance rose and that fewer teachers left after a district switched to a four-day week, which sounds convincing. However, Source 2 points out that the same district measured attendance but never checked what vulnerable children did on the missing day, so an important effect was never proven. Source 2 also gives its own evidence: a parents' committee in another town found that childcare costs rose sharply, and that the heaviest burden fell on families who could least afford it. That is a concrete, measured harm. Source 1's strongest point, the gain for teachers, is real but does not answer the question of who is hurt. Because Source 2 both weakens Source 1's evidence and adds a measured cost of its own, its position is the better supported of the two.",
  },
  assessment,
  notes
};
