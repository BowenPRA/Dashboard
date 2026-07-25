// src/data/GED_ENG/ENG_0A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';

export const ENGLISH_0A_DATA = {
  meta: {
    id: "ENG_0A",
    title: "Grammar Foundations 1: Pronouns",
    desc: "Choose the right pronoun for its job, match it to the noun it replaces, and fix the singular traps and unclear references the GED tests most often.",
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
      word: "Pronoun",
      vn: "Đại từ",
      def: "A short word used in place of a noun, such as he, she, it or they.",
      vnDef: "Một từ ngắn dùng thay cho danh từ, như he, she, it hoặc they.",
      sent: "Using a pronoun stops you repeating the same name in every sentence.",
      vnSent: "Dùng đại từ giúp bạn không lặp lại cùng một cái tên trong mỗi câu.",
      dictSent: "Using a pronoun stops you repeating the same name in every sentence.",
      isReal: true
    },
    {
      word: "Noun",
      vn: "Danh từ",
      def: "A word that names a person, place, thing or idea.",
      vnDef: "Một từ gọi tên người, nơi chốn, sự vật hoặc ý tưởng.",
      sent: "Every pronoun must point back to a clear noun earlier in the text.",
      vnSent: "Mỗi đại từ phải chỉ về một danh từ rõ ràng ở phía trước trong văn bản.",
      dictSent: "Every pronoun must point back to a clear noun earlier in the text.",
      isReal: true
    },
    {
      word: "Singular",
      vn: "Số ít",
      def: "Referring to only one person or thing.",
      vnDef: "Chỉ đề cập đến một người hoặc một vật.",
      sent: "The word company is singular, so it takes the pronoun its.",
      vnSent: "Từ company là số ít, nên nó dùng đại từ its.",
      dictSent: "The word company is singular, so it takes the pronoun its.",
      isReal: true
    },
    {
      word: "Plural",
      vn: "Số nhiều",
      def: "Referring to more than one person or thing.",
      vnDef: "Đề cập đến nhiều hơn một người hoặc một vật.",
      sent: "Because employees is plural, the correct possessive pronoun is their.",
      vnSent: "Vì employees là số nhiều, đại từ sở hữu đúng là their.",
      dictSent: "Because employees is plural, the correct possessive pronoun is their.",
      isReal: true
    },
    {
      word: "Subject",
      vn: "Chủ ngữ",
      def: "The person or thing in a sentence that performs the action.",
      vnDef: "Người hoặc vật trong câu thực hiện hành động.",
      sent: "She is the subject of the sentence because she does the action.",
      vnSent: "She là chủ ngữ của câu vì cô ấy thực hiện hành động.",
      dictSent: "She is the subject of the sentence because she does the action.",
      isReal: true
    },
    {
      word: "Object",
      vn: "Tân ngữ",
      def: "The person or thing in a sentence that receives the action.",
      vnDef: "Người hoặc vật trong câu nhận hành động.",
      sent: "In the phrase call him, the word him is the object.",
      vnSent: "Trong cụm call him, từ him là tân ngữ.",
      dictSent: "In the phrase call him, the word him is the object.",
      isReal: true
    },
    {
      word: "Possessive",
      vn: "Sở hữu",
      def: "A form showing that something belongs to someone, such as my, her or their.",
      vnDef: "Dạng cho thấy cái gì đó thuộc về ai đó, như my, her hoặc their.",
      sent: "The possessive form its never takes an apostrophe.",
      vnSent: "Dạng sở hữu its không bao giờ có dấu nháy.",
      dictSent: "The possessive form its never takes an apostrophe.",
      isReal: true
    },
    {
      word: "Antecedent",
      vn: "Từ đứng trước",
      def: "The noun that a pronoun refers back to.",
      vnDef: "Danh từ mà đại từ chỉ ngược về.",
      sent: "If the antecedent is singular, the pronoun must be singular too.",
      vnSent: "Nếu từ đứng trước là số ít, đại từ cũng phải là số ít.",
      dictSent: "If the antecedent is singular, the pronoun must be singular too.",
      isReal: true
    },
    {
      word: "Agreement",
      vn: "Sự hòa hợp",
      def: "The rule that a pronoun must match its noun in number.",
      vnDef: "Quy tắc rằng đại từ phải hòa hợp với danh từ về mặt số lượng.",
      sent: "Pronoun agreement is one of the most tested rules on the GED.",
      vnSent: "Sự hòa hợp đại từ là một trong những quy tắc được kiểm tra nhiều nhất trong bài thi GED.",
      dictSent: "Pronoun agreement is one of the most tested rules on the GED.",
      isReal: true
    },
    {
      word: "Unclear",
      vn: "Không rõ ràng",
      def: "Describing a pronoun that could refer to more than one noun.",
      vnDef: "Mô tả một đại từ có thể chỉ về nhiều hơn một danh từ.",
      sent: "The pronoun is unclear because two men appear in the same sentence.",
      vnSent: "Đại từ không rõ ràng vì hai người đàn ông xuất hiện trong cùng một câu.",
      dictSent: "The pronoun is unclear because two men appear in the same sentence.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "What a Pronoun Replaces",
      text: "A {pronoun} is a short word that stands in for a {noun} you have already named. The noun it points back to is called the {antecedent}. If the reader cannot tell which noun you mean, the sentence is {unclear} and must be rewritten using the actual name.",
      vnText: "Đại từ là một từ ngắn thay thế cho danh từ mà bạn đã nêu tên. Danh từ mà nó chỉ ngược về được gọi là từ đứng trước. Nếu người đọc không thể biết bạn muốn nói danh từ nào, câu văn là không rõ ràng và phải được viết lại bằng chính cái tên đó."
    },
    {
      id: "passage_2",
      title: "Matching Number",
      text: "Pronoun {agreement} means the pronoun must match the noun it replaces. If the noun is {singular}, use a singular pronoun such as he, she or it. If the noun is {plural}, use they or their instead.",
      vnText: "Sự hòa hợp đại từ nghĩa là đại từ phải khớp với danh từ mà nó thay thế. Nếu danh từ là số ít, dùng đại từ số ít như he, she hoặc it. Nếu danh từ là số nhiều, hãy dùng they hoặc their."
    },
    {
      id: "passage_3",
      title: "Choosing the Right Form",
      text: "Ask what job the word is doing. If it performs the action it is the {subject}, so use I, he or they. If it receives the action it is the {object}, so use me, him or them. If it owns something, use the {possessive} form such as my, his or their.",
      vnText: "Hãy hỏi từ đó đang làm nhiệm vụ gì. Nếu nó thực hiện hành động thì đó là chủ ngữ, nên dùng I, he hoặc they. Nếu nó nhận hành động thì đó là tân ngữ, nên dùng me, him hoặc them. Nếu nó sở hữu cái gì đó, dùng dạng sở hữu như my, his hoặc their."
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "A Message from the Store Manager",
      titleVn: "Tin nhắn từ quản lý cửa hàng",
      passage: "Our store has just changed [[b1]] opening hours. Every member of staff must check [[b2]] new rota before Monday. If a customer asks about the change, please tell [[b3]] politely that we now close at eight. The assistant managers have already updated [[b4]] wall notices, and [[b5]] will answer any questions you still have.",
      blanks: [
        {
          id: "b1",
          options: ["its", "it's", "their"],
          correct: "its",
          expEn: "\"Our store\" is one thing, so the singular possessive \"its\" is correct. \"It's\" would mean \"it is\".",
          expVn: "\"Our store\" là một thứ, nên sở hữu số ít \"its\" là đúng. \"It's\" sẽ nghĩa là \"it is\"."
        },
        {
          id: "b2",
          options: ["their", "his or her", "them"],
          correct: "his or her",
          expEn: "\"Every member\" is singular on the GED, so it takes \"his or her\", not the plural \"their\".",
          expVn: "\"Every member\" là số ít trong bài thi GED, nên dùng \"his or her\", không phải \"their\" số nhiều."
        },
        {
          id: "b3",
          options: ["they", "them", "him or her"],
          correct: "him or her",
          expEn: "\"A customer\" is one person and receives the action of \"tell\", so use the singular object form \"him or her\".",
          expVn: "\"A customer\" là một người và nhận hành động \"tell\", nên dùng dạng tân ngữ số ít \"him or her\"."
        },
        {
          id: "b4",
          options: ["their", "its", "his"],
          correct: "their",
          expEn: "\"The assistant managers\" is genuinely plural, so the plural possessive \"their\" is right.",
          expVn: "\"The assistant managers\" thực sự là số nhiều, nên sở hữu số nhiều \"their\" là đúng."
        },
        {
          id: "b5",
          options: ["they", "them", "he or she"],
          correct: "they",
          expEn: "This word performs the action \"will answer\", so it needs the plural subject pronoun \"they\".",
          expVn: "Từ này thực hiện hành động \"will answer\", nên cần đại từ chủ ngữ số nhiều \"they\"."
        }
      ]
    },
    {
      id: "ge2",
      title: "A Note About the Community Centre",
      titleVn: "Ghi chú về trung tâm cộng đồng",
      passage: "The community centre reopened last spring after [[b1]] roof was repaired. Anyone who wants to book a room must put [[b2]] name on the list at reception. My sister and [[b3]] volunteered there last winter, and the manager thanked [[b4]] warmly. When Mrs. Bao spoke to Mrs. Tran about the timetable, [[b5]] agreed to publish it online.",
      blanks: [
        {
          id: "b1",
          options: ["its", "it's", "their"],
          correct: "its",
          expEn: "The centre is a single building, so it owns the roof with \"its\" — no apostrophe.",
          expVn: "Trung tâm là một tòa nhà duy nhất, nên nó sở hữu mái nhà với \"its\" — không có dấu nháy."
        },
        {
          id: "b2",
          options: ["their", "his or her", "them"],
          correct: "his or her",
          expEn: "\"Anyone\" ends in -one, so it is singular on the GED and needs \"his or her\".",
          expVn: "\"Anyone\" kết thúc bằng -one, nên là số ít trong bài thi GED và cần \"his or her\"."
        },
        {
          id: "b3",
          options: ["I", "me", "my"],
          correct: "I",
          expEn: "Both people perform the action \"volunteered\", so use the subject pronoun \"I\". Remove the other person to check: \"I volunteered\".",
          expVn: "Cả hai người đều thực hiện hành động \"volunteered\", nên dùng đại từ chủ ngữ \"I\". Bỏ người kia để kiểm tra: \"I volunteered\"."
        },
        {
          id: "b4",
          options: ["we", "us", "our"],
          correct: "us",
          expEn: "We receive the action of \"thanked\", so the object pronoun \"us\" is correct.",
          expVn: "Chúng tôi nhận hành động \"thanked\", nên đại từ tân ngữ \"us\" là đúng."
        },
        {
          id: "b5",
          options: ["she", "Mrs. Tran", "they"],
          correct: "Mrs. Tran",
          expEn: "Two women appear in the sentence, so \"she\" would be unclear. Naming Mrs. Tran removes the ambiguity.",
          expVn: "Hai người phụ nữ xuất hiện trong câu, nên \"she\" sẽ không rõ ràng. Gọi tên Mrs. Tran loại bỏ sự mơ hồ."
        }
      ]
    },
    {
      id: "ge3",
      title: "A Letter to the Library",
      titleVn: "Thư gửi thư viện",
      passage: "I am writing because the library has shortened [[b1]] weekend hours. Each student who studies there now has to change [[b2]] plans. Please send a reply to my teacher and [[b3]] before the end of term. The librarians told my classmates and [[b4]] that the decision was final, but [[b5]] did not explain why.",
      blanks: [
        {
          id: "b1",
          options: ["its", "it's", "their"],
          correct: "its",
          expEn: "The library is one institution, so it takes the singular possessive \"its\".",
          expVn: "Thư viện là một tổ chức duy nhất, nên dùng sở hữu số ít \"its\"."
        },
        {
          id: "b2",
          options: ["their", "his or her", "them"],
          correct: "his or her",
          expEn: "\"Each student\" means one student at a time, so formal writing requires \"his or her\".",
          expVn: "\"Each student\" nghĩa là mỗi học sinh một lúc, nên văn viết trang trọng yêu cầu \"his or her\"."
        },
        {
          id: "b3",
          options: ["I", "me", "mine"],
          correct: "me",
          expEn: "The reply is sent TO these people, so they receive the action and need the object pronoun \"me\".",
          expVn: "Câu trả lời được gửi ĐẾN những người này, nên họ nhận hành động và cần đại từ tân ngữ \"me\"."
        },
        {
          id: "b4",
          options: ["I", "me", "my"],
          correct: "me",
          expEn: "\"Told my classmates and me\" — we receive the telling, so the object form \"me\" is correct.",
          expVn: "\"Told my classmates and me\" — chúng tôi nhận hành động kể, nên dạng tân ngữ \"me\" là đúng."
        },
        {
          id: "b5",
          options: ["they", "them", "he or she"],
          correct: "they",
          expEn: "\"The librarians\" is plural and performs the action \"did not explain\", so use the subject pronoun \"they\".",
          expVn: "\"The librarians\" là số nhiều và thực hiện hành động \"did not explain\", nên dùng đại từ chủ ngữ \"they\"."
        }
      ]
    }
  ],
  essay: {
    // Shorter than the ENG_1A extended response on purpose: this is a foundations
    // unit, so the writing task is 25 minutes and the mark scheme rewards clear
    // pronoun reference alongside the usual claim-and-evidence marks.
    minutesAllowed: 25,
    sources: [
      {
        title: "Keep Phones Out of the Classroom",
        text:
          "A school should collect every phone at the door. Teachers at Riverton High tried this for one term and reported that classroom interruptions fell by roughly half. A student who keeps a phone in a pocket checks it without meaning to, and each check costs several minutes of attention. Locking the phones away for six hours removes the temptation entirely and treats every student the same way, so nobody feels singled out.",
      },
      {
        title: "Teach Students to Manage Them",
        text:
          "Confiscating phones teaches nothing. A student who never practises putting a phone away will not suddenly learn self-control after leaving school. Phones are also useful in lessons: a class can look up a source, photograph the board, or translate a difficult word instantly. Schools that ran short lessons on managing distraction found that students later reported checking their phones less often, and those habits carry into adult life in a way a locked box never will.",
      },
    ],
    task:
      "Both writers argue about whether schools should collect students' phones. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
    guidelines: [
      "State clearly which position is better supported.",
      "Use evidence from BOTH sources.",
      "Make every pronoun point clearly at one noun — name the person if there is any doubt.",
      "Write in paragraphs, with a short conclusion.",
    ],
    suggestedWords: [
      ["Evidence", "prove", "proof"],
      ["Claim", "argues", "argument", "position"],
      ["Student", "students"],
    ],
    scienceMaxMarks: 4,
    markScheme: [
      "States clearly which position is better supported, rather than only which the writer personally prefers.",
      "Refers to specific evidence from Source 1 (for example the halved interruptions at Riverton High).",
      "Refers to specific evidence from Source 2 (for example the classroom uses of phones or the reported drop in checking).",
      "Uses pronouns clearly, with no pronoun that could refer to two different nouns.",
    ],
    modelAnswer:
      "Source 1 is better supported because it gives a measured result while Source 2 mostly describes what might happen. Source 1 reports that classroom interruptions at Riverton High fell by about half over one term, which is a figure a reader can check. It also explains the mechanism: a student who carries a phone checks it without meaning to, and each check costs attention. Source 2 makes a fair point that phones can be useful in a lesson, since a class can look up a source or translate a word, and it claims that students who were taught to manage distraction later checked their phones less often. However, Source 2 never says how many students were studied or how much less often they checked, so its evidence is much weaker than the figure in Source 1. Source 2 also relies on a prediction about adult life, which cannot be proven now. Both writers want students to concentrate, but only Source 1 supports its claim with a measured result, so its position is the better supported.",
  },
  assessment,
  notes
};
