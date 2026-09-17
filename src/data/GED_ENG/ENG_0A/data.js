// src/data/GED_ENG/ENG_0A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { games } from './games.js';

export const ENGLISH_0A_DATA = {
  meta: {
    id: "ENG_0A",
    title: "Grammar Foundations 1: Pronouns",
    desc: "Choose the right pronoun for its job, match it to the noun it replaces, and fix the singular traps and unclear references the GED tests most often.",
    track: "GED_ENG",
    icon: "GraduationCap"
  },
  // Prove swaps ESSAY (p8) for PROOFREAD (p33): a grammar unit proves itself by
  // finding and fixing pronoun errors, not by writing an essay (the reading units
  // and the capstone carry the Extended Response). XP total and gates unchanged.
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
      // SPELLING removed — it is never tested on the GED (GED-SPRINT.md §4). Its
      // 10 XP moved into GRAMMAR_EDIT, the editing skill the RLA actually tests.
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
  // Find & Fix: every listed error is a pronoun slip from this unit (case,
  // agreement, who/whom, unclear reference) plus one general slip per passage.
  // Everything NOT listed is correct English — a click on it costs the student.
  proofread: [
    {
      id: "pf1",
      title: "A Note to the New Volunteers",
      titleVn: "Ghi chú gửi các tình nguyện viên mới",
      passage: "Welcome to the food bank. My colleague and me will show you around this morning. Each volunteer must sign their name at the desk before starting. If a visitor has a question, please answer him or her politely or call a supervisor. The manager thanked Mr. Lee and I for the extra hours we gave last month. When the drivers spoke to the packers, they said the boxes were too heavy. i hope you enjoy your first shift with us.",
      errors: [
        {
          id: "e1",
          wrong: "My colleague and me",
          right: "My colleague and I",
          accept: [],
          kind: "Pronoun case",
          expEn: "Both people do the action \"will show\", so use the subject form. Remove the other person to check: \"I will show you around\".",
          expVn: "Cả hai người đều thực hiện hành động \"will show\", nên dùng dạng chủ ngữ. Bỏ người kia để kiểm tra: \"I will show you around\"."
        },
        {
          id: "e2",
          wrong: "sign their name",
          right: "sign his or her name",
          accept: [],
          kind: "Pronoun agreement",
          expEn: "\"Each volunteer\" is singular, so the possessive must be singular too: \"his or her\", not the plural \"their\".",
          expVn: "\"Each volunteer\" là số ít, nên sở hữu cũng phải là số ít: \"his or her\", không phải \"their\" số nhiều."
        },
        {
          id: "e3",
          wrong: "Mr. Lee and I",
          right: "Mr. Lee and me",
          accept: [],
          kind: "Pronoun case",
          expEn: "The manager thanked us, so we receive the action and need the object form: \"thanked Mr. Lee and me\".",
          expVn: "Người quản lý cảm ơn chúng tôi, nên chúng tôi nhận hành động và cần dạng tân ngữ: \"thanked Mr. Lee and me\"."
        },
        {
          id: "e4",
          wrong: "they said the boxes",
          right: "the packers said the boxes",
          accept: ["the drivers said the boxes"],
          kind: "Unclear pronoun",
          expEn: "Two groups appear in the sentence, so \"they\" could mean the drivers or the packers. Name the group that spoke.",
          expVn: "Hai nhóm xuất hiện trong câu, nên \"they\" có thể là tài xế hoặc người đóng gói. Hãy gọi tên nhóm đã nói."
        },
        {
          id: "e5",
          wrong: "i hope",
          right: "I hope",
          accept: [],
          kind: "Capital I",
          expEn: "The pronoun \"I\" is always a capital letter, even in the middle of a sentence.",
          expVn: "Đại từ \"I\" luôn viết hoa, ngay cả ở giữa câu."
        }
      ]
    },
    {
      id: "pf2",
      title: "A Complaint About the Lift",
      titleVn: "Thư khiếu nại về thang máy",
      passage: "I am writing about the lift in our building. It's doors have stuck three times this week, and nobody knows who to call. Everyone on the top floor has had to carry their shopping up six flights of stairs My neighbour and I spoke to the caretaker, but him and the manager could not agree on a repair date. The residents have been patient, and we would like an answer by Friday.",
      errors: [
        {
          id: "e1",
          wrong: "It's doors",
          right: "Its doors",
          accept: [],
          kind: "Possessive its",
          expEn: "The doors belong to the lift, so use the possessive \"its\" with no apostrophe. \"It's\" means \"it is\".",
          expVn: "Các cánh cửa thuộc về thang máy, nên dùng sở hữu \"its\" không có dấu nháy. \"It's\" nghĩa là \"it is\"."
        },
        {
          id: "e2",
          wrong: "who to call",
          right: "whom to call",
          accept: [],
          kind: "Who vs whom",
          expEn: "The person is the object of \"call\" (you call him or her), so the object form \"whom\" is correct.",
          expVn: "Người đó là tân ngữ của \"call\" (bạn gọi cho anh ấy hoặc cô ấy), nên dạng tân ngữ \"whom\" là đúng."
        },
        {
          id: "e3",
          wrong: "carry their shopping",
          right: "carry his or her shopping",
          accept: [],
          kind: "Pronoun agreement",
          expEn: "\"Everyone\" ends in -one and is singular, so it takes \"his or her\", not \"their\".",
          expVn: "\"Everyone\" kết thúc bằng -one và là số ít, nên dùng \"his or her\", không phải \"their\"."
        },
        {
          id: "e4",
          wrong: "stairs My",
          right: "stairs. My",
          accept: [],
          kind: "Missing full stop",
          expEn: "A new sentence starts at \"My neighbour\", so the sentence before it needs a full stop.",
          expVn: "Một câu mới bắt đầu ở \"My neighbour\", nên câu trước đó cần dấu chấm."
        },
        {
          id: "e5",
          wrong: "him and the manager",
          right: "he and the manager",
          accept: [],
          kind: "Pronoun case",
          expEn: "Both people do the action \"could not agree\", so use the subject form. Remove the other person to check: \"he could not agree\".",
          expVn: "Cả hai người đều thực hiện hành động \"could not agree\", nên dùng dạng chủ ngữ. Bỏ người kia để kiểm tra: \"he could not agree\"."
        }
      ]
    },
    {
      id: "pf3",
      title: "A Report from the Sports Club",
      titleVn: "Báo cáo từ câu lạc bộ thể thao",
      passage: "The club held its annual meeting on Tuesday. Each of the players received their new kit before the talks began. The treasurer explained the accounts to the parents and I, and then the committee voted to move training to Thursday and to raise the fees. It upset several members. Mr. Danh, whom has led the club for ten years, promised that the committee would listen. Anyone who wants to complain should write to the secretary, and she will reply within a week. i have attached the new timetable.",
      errors: [
        {
          id: "e1",
          wrong: "received their new kit",
          right: "received his or her new kit",
          accept: [],
          kind: "Pronoun agreement",
          expEn: "The subject is \"Each\", which is singular. Ignore \"of the players\" and use \"his or her\".",
          expVn: "Chủ ngữ là \"Each\", là số ít. Bỏ qua \"of the players\" và dùng \"his or her\"."
        },
        {
          id: "e2",
          wrong: "the parents and I",
          right: "the parents and me",
          accept: [],
          kind: "Pronoun case",
          expEn: "The accounts were explained TO these people, so they receive the action and need the object form \"me\".",
          expVn: "Các khoản thu chi được giải thích CHO những người này, nên họ nhận hành động và cần dạng tân ngữ \"me\"."
        },
        {
          id: "e3",
          wrong: "It upset several members",
          right: "The decision upset several members",
          accept: ["The vote upset several members", "This decision upset several members", "The change upset several members", "The changes upset several members"],
          kind: "Unclear pronoun",
          expEn: "\"It\" has no clear noun to point back to — the training day, the fees, or the whole vote? Name the thing that upset people.",
          expVn: "\"It\" không có danh từ rõ ràng để chỉ về — ngày tập, lệ phí, hay cả cuộc bỏ phiếu? Hãy gọi tên điều đã làm mọi người khó chịu."
        },
        {
          id: "e4",
          wrong: "whom has led",
          right: "who has led",
          accept: [],
          kind: "Who vs whom",
          expEn: "This word is the subject of \"has led\" (he has led the club), so the subject form \"who\" is correct.",
          expVn: "Từ này là chủ ngữ của \"has led\" (ông ấy đã dẫn dắt câu lạc bộ), nên dạng chủ ngữ \"who\" là đúng."
        },
        {
          id: "e5",
          wrong: "i have attached",
          right: "I have attached",
          accept: [],
          kind: "Capital I",
          expEn: "The pronoun \"I\" is always written as a capital letter.",
          expVn: "Đại từ \"I\" luôn được viết hoa."
        }
      ]
    }
  ],
  assessment,
  games,
  notes
};
