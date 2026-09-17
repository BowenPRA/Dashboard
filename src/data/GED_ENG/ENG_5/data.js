// src/data/GED_ENG/ENG_5/data.js
// ENG_5 — Grammar Foundations 5: Punctuation & Confusable Words. Lesson 5 of
// the RLA blueprint (docs/ged-english-lessons.md). Commas, apostrophes, capital
// letters, end marks and the sound-alike words the test loves — the slips that
// cost marks on the essay's conventions trait.
import { assessment } from './assessment.js';
import { notes } from './notes.js';

export const ENGLISH_5_DATA = {
  meta: {
    id: "ENG_5",
    title: "Grammar Foundations 5: Punctuation & Confusable Words",
    desc: "Put commas and apostrophes where they belong, capitalise the right words, and stop mixing up their/there/they're, its/it's, then/than and the other sound-alike pairs.",
    track: "GED_ENG",
    icon: "Quote"
  },
  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 }
      ]
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      tasks: [
        { id: "GRAMMAR_EDIT", dbKey: "p13", maxXP: 25 },
        { id: "PROOFREAD", dbKey: "p33", maxXP: 15 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      // 60 XP reachable before this gate; 45 is 75% (the 80% rule).
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 10 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 30 }
      ]
    }
  ],
  realWords: [
    {
      word: "Comma",
      vn: "Dấu phẩy",
      def: "The mark (,) that separates parts of a sentence so the reader can follow it.",
      vnDef: "Dấu (,) tách các phần của câu để người đọc dễ theo dõi.",
      sent: "Put a comma after an introductory phrase such as 'After lunch'.",
      vnSent: "Đặt dấu phẩy sau cụm mở đầu như 'After lunch'.",
      isReal: true
    },
    {
      word: "Series",
      vn: "Chuỗi liệt kê",
      def: "A list of three or more items in one sentence.",
      vnDef: "Một danh sách gồm ba mục trở lên trong cùng một câu.",
      sent: "Use commas to separate the items in a series: rice, fish, and soup.",
      vnSent: "Dùng dấu phẩy để tách các mục trong chuỗi liệt kê: cơm, cá, và canh.",
      isReal: true
    },
    {
      word: "Appositive",
      vn: "Ngữ đồng vị",
      def: "A word or phrase that renames the noun before it and adds extra information.",
      vnDef: "Một từ hoặc cụm từ gọi lại danh từ đứng trước và thêm thông tin phụ.",
      sent: "In 'My boss, Mr Vo, is kind', the appositive is 'Mr Vo'.",
      vnSent: "Trong 'My boss, Mr Vo, is kind', ngữ đồng vị là 'Mr Vo'.",
      isReal: true
    },
    {
      word: "Conjunction",
      vn: "Liên từ",
      def: "A joining word such as and, but, or, so.",
      vnDef: "Từ nối như and, but, or, so.",
      sent: "A comma goes before the conjunction when it joins two full sentences.",
      vnSent: "Dấu phẩy đứng trước liên từ khi nó nối hai câu hoàn chỉnh.",
      isReal: true
    },
    {
      word: "Apostrophe",
      vn: "Dấu lược",
      def: "The mark (') that shows possession or a missing letter.",
      vnDef: "Dấu (') thể hiện sở hữu hoặc một chữ cái bị lược bỏ.",
      sent: "An apostrophe never makes a word plural.",
      vnSent: "Dấu lược không bao giờ dùng để tạo số nhiều.",
      isReal: true
    },
    {
      word: "Possessive",
      vn: "Sở hữu",
      def: "The form of a noun that shows something belongs to it, such as the driver's seat.",
      vnDef: "Dạng của danh từ cho thấy cái gì đó thuộc về nó, như the driver's seat.",
      sent: "The possessive form of 'the students' is 'the students' bags'.",
      vnSent: "Dạng sở hữu của 'the students' là 'the students' bags'.",
      isReal: true
    },
    {
      word: "Contraction",
      vn: "Dạng rút gọn",
      def: "A short form of two words, with an apostrophe where letters are missing, such as it's for it is.",
      vnDef: "Dạng viết tắt của hai từ, có dấu lược ở chỗ chữ cái bị bỏ, như it's thay cho it is.",
      sent: "The contraction 'they're' means 'they are'.",
      vnSent: "Dạng rút gọn 'they're' có nghĩa là 'they are'.",
      isReal: true
    },
    {
      word: "Plural",
      vn: "Số nhiều",
      def: "The form of a noun that means more than one, usually made by adding -s.",
      vnDef: "Dạng của danh từ chỉ nhiều hơn một, thường tạo bằng cách thêm -s.",
      sent: "'Cars' is a plural, so it needs no apostrophe.",
      vnSent: "'Cars' là số nhiều, nên không cần dấu lược.",
      isReal: true
    },
    {
      word: "Capital",
      vn: "Chữ hoa",
      def: "A big letter such as A, B or C, used at the start of a sentence and for names.",
      vnDef: "Chữ cái lớn như A, B hoặc C, dùng ở đầu câu và cho tên riêng.",
      sent: "Days of the week always start with a capital letter.",
      vnSent: "Các ngày trong tuần luôn bắt đầu bằng chữ hoa.",
      isReal: true
    },
    {
      word: "Homophone",
      vn: "Từ đồng âm",
      def: "A word that sounds the same as another but has a different spelling and meaning, such as their and there.",
      vnDef: "Một từ phát âm giống từ khác nhưng viết và nghĩa khác, như their và there.",
      sent: "'To', 'too' and 'two' are homophones, so the ear cannot tell them apart.",
      vnSent: "'To', 'too' và 'two' là từ đồng âm, nên tai không phân biệt được chúng.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Commas That Help the Reader",
      vnTitle: "Những dấu phẩy giúp người đọc",
      meta: "Four jobs of one small mark",
      text: "A {comma} is a small pause that shows the reader how a sentence is built. It separates the items in a {series}, such as 'eggs, milk, and bread'. It follows an introductory phrase: 'After work, I cook.' It goes around an {appositive}, the extra information that renames a noun: 'My neighbour, a nurse, works nights.' It also comes before a {conjunction} such as and or but when that word joins two complete sentences. One place a comma never goes is between a subject and its verb.",
      vnText: "Dấu phẩy là một quãng nghỉ ngắn cho người đọc thấy câu được xây dựng thế nào. Nó tách các mục trong chuỗi liệt kê, như 'eggs, milk, and bread'. Nó đứng sau cụm mở đầu: 'After work, I cook.' Nó bao quanh ngữ đồng vị, phần thông tin phụ gọi lại một danh từ: 'My neighbour, a nurse, works nights.' Nó cũng đứng trước liên từ như and hoặc but khi từ đó nối hai câu hoàn chỉnh. Một chỗ dấu phẩy không bao giờ được đặt là giữa chủ ngữ và động từ của nó."
    },
    {
      id: "passage_2",
      title: "The Apostrophe Has Two Jobs",
      vnTitle: "Dấu lược có hai nhiệm vụ",
      meta: "Possession and missing letters",
      text: "An {apostrophe} does only two things. First, it shows possession: the driver's seat belongs to one driver, and the drivers' room belongs to many drivers. This {possessive} form is the one the test checks most often. Second, it marks a {contraction}, where letters are missing: it's means it is, and they're means they are. An apostrophe never makes a {plural}. Two cars are simply 'cars', and three books are 'books', with no apostrophe at all.",
      vnText: "Dấu lược chỉ làm hai việc. Thứ nhất, nó thể hiện sở hữu: the driver's seat thuộc về một tài xế, còn the drivers' room thuộc về nhiều tài xế. Dạng sở hữu này là dạng bài thi kiểm tra nhiều nhất. Thứ hai, nó đánh dấu một dạng rút gọn, nơi có chữ cái bị lược bỏ: it's nghĩa là it is, và they're nghĩa là they are. Dấu lược không bao giờ tạo số nhiều. Hai chiếc xe chỉ đơn giản là 'cars', và ba cuốn sách là 'books', hoàn toàn không có dấu lược."
    },
    {
      id: "passage_3",
      title: "Sound-Alike Words and Big Letters",
      vnTitle: "Từ nghe giống nhau và chữ in hoa",
      meta: "What the ear cannot hear",
      text: "A {homophone} sounds like another word but is spelled differently, so you cannot choose it by ear. You must know the job of each word: their shows possession, there is a place, and they're means they are. The same is true for to, too and two, and for then and than. A {capital} letter also carries meaning. It starts every sentence, and it marks the word I, names of people and places, days and months. Finally, every sentence needs an end mark: a full stop, a question mark or an exclamation mark.",
      vnText: "Từ đồng âm nghe giống một từ khác nhưng viết khác, nên bạn không thể chọn nó bằng tai. Bạn phải biết nhiệm vụ của từng từ: their chỉ sở hữu, there là nơi chốn, và they're nghĩa là they are. Điều này cũng đúng với to, too và two, và với then và than. Chữ hoa cũng mang ý nghĩa. Nó mở đầu mọi câu, và đánh dấu từ I, tên người và địa danh, ngày và tháng. Cuối cùng, mọi câu đều cần dấu kết thúc: dấu chấm, dấu chấm hỏi hoặc dấu chấm than."
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "The New Café",
      titleVn: "Quán cà phê mới",
      passage: "[[b1]] the café on Elm Street opened its doors for the first time. The owner, [[b2]] has lived in the town for twenty years. She sells [[b3]] and fresh bread, and the prices are low. The tables were full by nine [[b4]] the queue reached the door. The customers who came [[b5]] a free cake.",
      blanks: [
        {
          id: "b1",
          options: ["Last Saturday,", "Last Saturday", "Last, Saturday"],
          correct: "Last Saturday,",
          expEn: "\"Last Saturday\" is an introductory phrase, so a comma follows it before the main sentence begins.",
          expVn: "\"Last Saturday\" là cụm mở đầu, nên cần dấu phẩy sau nó trước khi câu chính bắt đầu."
        },
        {
          id: "b2",
          options: ["Mrs Tran,", "Mrs Tran", "Mrs Tran;"],
          correct: "Mrs Tran,",
          expEn: "\"Mrs Tran\" is an appositive that renames \"the owner\". Extra information takes a comma on BOTH sides.",
          expVn: "\"Mrs Tran\" là ngữ đồng vị gọi lại \"the owner\". Thông tin phụ cần dấu phẩy ở CẢ HAI bên."
        },
        {
          id: "b3",
          options: ["coffee, tea, cakes", "coffee tea cakes", "coffee, tea cakes,"],
          correct: "coffee, tea, cakes",
          expEn: "Items in a series are separated by commas: coffee, tea, cakes and fresh bread.",
          expVn: "Các mục trong chuỗi liệt kê được tách bằng dấu phẩy: coffee, tea, cakes và fresh bread."
        },
        {
          id: "b4",
          options: ["o'clock, and", "o'clock and", "o'clock, and,"],
          correct: "o'clock, and",
          expEn: "\"And\" joins two complete sentences here, so a comma goes before it — and never after it.",
          expVn: "\"And\" nối hai câu hoàn chỉnh ở đây, nên dấu phẩy đứng trước nó — và không bao giờ đứng sau."
        },
        {
          id: "b5",
          options: ["first received", "first, received", "first, received,"],
          correct: "first received",
          expEn: "\"The customers who came first\" is the subject and \"received\" is its verb. Never put a comma between a subject and its verb.",
          expVn: "\"The customers who came first\" là chủ ngữ và \"received\" là động từ. Không bao giờ đặt dấu phẩy giữa chủ ngữ và động từ."
        }
      ]
    },
    {
      id: "ge2",
      title: "The Lost Keys",
      titleVn: "Chùm chìa khóa bị mất",
      passage: "My [[b1]] keys were missing again this morning. She searched the pockets of her two [[b2]], the kitchen drawer and the car. [[b3]] not the first time this has happened. In the end the keys were in the [[b4]] school bags — both boys had borrowed them. Now the family keeps [[b5]] keys on one hook by the door.",
      blanks: [
        {
          id: "b1",
          options: ["sister's", "sisters", "sisters'"],
          correct: "sister's",
          expEn: "One sister owns the keys (\"She searched\"), so the possessive is sister + 's: \"sister's\".",
          expVn: "Một người chị sở hữu chìa khóa (\"She searched\"), nên dạng sở hữu là sister + 's: \"sister's\"."
        },
        {
          id: "b2",
          options: ["coats", "coat's", "coats'"],
          correct: "coats",
          expEn: "\"Two coats\" is simply a plural. A plural never takes an apostrophe.",
          expVn: "\"Two coats\" chỉ là số nhiều. Số nhiều không bao giờ có dấu lược."
        },
        {
          id: "b3",
          options: ["It's", "Its", "Its'"],
          correct: "It's",
          expEn: "Test it: \"It is not the first time\" makes sense, so use the contraction \"It's\".",
          expVn: "Hãy thử: \"It is not the first time\" có nghĩa, nên dùng dạng rút gọn \"It's\"."
        },
        {
          id: "b4",
          options: ["boys'", "boy's", "boys"],
          correct: "boys'",
          expEn: "The bags belong to both boys. For a plural owner, add the apostrophe after the -s: \"boys'\".",
          expVn: "Cặp sách thuộc về cả hai cậu bé. Với chủ sở hữu số nhiều, thêm dấu lược sau -s: \"boys'\"."
        },
        {
          id: "b5",
          options: ["its", "it's", "its'"],
          correct: "its",
          expEn: "The keys belong to the family (it). Possessive \"its\" has no apostrophe — \"it is keys\" would make no sense.",
          expVn: "Chìa khóa thuộc về gia đình (it). \"Its\" sở hữu không có dấu lược — \"it is keys\" sẽ vô nghĩa."
        }
      ]
    },
    {
      id: "ge3",
      title: "Weekend Plans",
      titleVn: "Kế hoạch cuối tuần",
      passage: "On Friday my cousins said [[b1]] coming to visit for the weekend. They will bring [[b2]] dog, so we need to keep the gate closed. We plan to walk [[b3]] the park and [[b4]] have lunch by the lake. The forecast says it will be warmer [[b5]] last week.",
      blanks: [
        {
          id: "b1",
          options: ["they're", "their", "there"],
          correct: "they're",
          expEn: "\"They are coming to visit\" makes sense, so the contraction \"they're\" is correct.",
          expVn: "\"They are coming to visit\" có nghĩa, nên dạng rút gọn \"they're\" là đúng."
        },
        {
          id: "b2",
          options: ["their", "there", "they're"],
          correct: "their",
          expEn: "The dog belongs to them, so the possessive \"their\" is needed.",
          expVn: "Con chó thuộc về họ, nên cần từ sở hữu \"their\"."
        },
        {
          id: "b3",
          options: ["to", "too", "two"],
          correct: "to",
          expEn: "\"To\" shows direction: walk to the park. \"Too\" means also or very much, and \"two\" is the number.",
          expVn: "\"To\" chỉ hướng: đi bộ tới công viên. \"Too\" nghĩa là cũng hoặc quá, và \"two\" là số hai."
        },
        {
          id: "b4",
          options: ["then", "than", "them"],
          correct: "then",
          expEn: "\"Then\" means next in time: first the walk, then lunch. \"Than\" is only for comparing.",
          expVn: "\"Then\" nghĩa là tiếp theo về thời gian: đi bộ trước, rồi ăn trưa. \"Than\" chỉ dùng để so sánh."
        },
        {
          id: "b5",
          options: ["than", "then", "that"],
          correct: "than",
          expEn: "\"Warmer than last week\" is a comparison, so \"than\" is correct.",
          expVn: "\"Warmer than last week\" là một phép so sánh, nên \"than\" là đúng."
        }
      ]
    },
    {
      id: "ge4",
      title: "The Job Interview",
      titleVn: "Buổi phỏng vấn xin việc",
      passage: "[[b1]] I have an interview at the hospital on Wellington Road. The manager, [[b2]] wrote to me, said the interview will last an hour. I must not [[b3]] control of my nerves. The company will [[b4]] applications until the end of the month. Nerves can [[b5]] your memory, so I will prepare my answers tonight.",
      blanks: [
        {
          id: "b1",
          options: ["Next Tuesday", "next tuesday", "Next tuesday"],
          correct: "Next Tuesday",
          expEn: "The first word of a sentence and the name of a day both take a capital letter: \"Next Tuesday\".",
          expVn: "Từ đầu câu và tên ngày trong tuần đều viết hoa: \"Next Tuesday\"."
        },
        {
          id: "b2",
          options: ["whose assistant", "who's assistant", "whos assistant"],
          correct: "whose assistant",
          expEn: "The assistant belongs to the manager, so the possessive \"whose\" is right. \"Who's\" means who is.",
          expVn: "Trợ lý thuộc về người quản lý, nên từ sở hữu \"whose\" là đúng. \"Who's\" nghĩa là who is."
        },
        {
          id: "b3",
          options: ["lose", "loose", "lost"],
          correct: "lose",
          expEn: "\"Lose\" (one o) means to no longer have. \"Loose\" (two o's) means not tight, and \"lost\" is the past tense.",
          expVn: "\"Lose\" (một chữ o) nghĩa là không còn giữ được. \"Loose\" (hai chữ o) nghĩa là lỏng, và \"lost\" là thì quá khứ."
        },
        {
          id: "b4",
          options: ["accept", "except", "expect"],
          correct: "accept",
          expEn: "\"Accept\" means to receive or agree to. \"Except\" means not including.",
          expVn: "\"Accept\" nghĩa là nhận hoặc đồng ý. \"Except\" nghĩa là ngoại trừ."
        },
        {
          id: "b5",
          options: ["affect", "effect", "effects"],
          correct: "affect",
          expEn: "\"Affect\" is the verb (to change something). \"Effect\" is the noun (the result).",
          expVn: "\"Affect\" là động từ (làm thay đổi). \"Effect\" là danh từ (kết quả)."
        }
      ]
    }
  ],
  proofread: [
    {
      id: "pf1",
      title: "The Community Garden",
      titleVn: "Khu vườn cộng đồng",
      passage: "Last spring our street started a community garden on the empty lot beside the bus stop. Before the first seeds went in the neighbours cleared the rubbish and built six wooden beds. Mrs Lam a retired nurse, organised the watering rota. The childrens job was to plant beans, tomatoes, and sunflowers. The beds were full of vegetables by July, and the sunflowers were taller than the fence. Every family took home a basket of food, and the leftover vegetables went to the food bank on Green Street. Its a small lot, but its become the heart of our street.",
      errors: [
        {
          id: "e1",
          wrong: "went in the neighbours",
          right: "went in, the neighbours",
          kind: "Introductory comma",
          expEn: "\"Before the first seeds went in\" is an introductory phrase, so a comma must follow it.",
          expVn: "\"Before the first seeds went in\" là cụm mở đầu, nên cần dấu phẩy sau nó."
        },
        {
          id: "e2",
          wrong: "Mrs Lam a retired nurse,",
          right: "Mrs Lam, a retired nurse,",
          kind: "Appositive commas",
          expEn: "\"A retired nurse\" is extra information about Mrs Lam, so it needs a comma on both sides.",
          expVn: "\"A retired nurse\" là thông tin phụ về bà Lam, nên cần dấu phẩy ở cả hai bên."
        },
        {
          id: "e3",
          wrong: "childrens job",
          right: "children's job",
          kind: "Possessive apostrophe",
          expEn: "The job belongs to the children, so the possessive needs an apostrophe: children's.",
          expVn: "Công việc thuộc về bọn trẻ, nên dạng sở hữu cần dấu lược: children's."
        },
        {
          id: "e4",
          wrong: "Its a small lot",
          right: "It's a small lot",
          kind: "Its vs it's",
          expEn: "\"It is a small lot\" makes sense, so the contraction it's is needed.",
          expVn: "\"It is a small lot\" có nghĩa, nên cần dạng rút gọn it's."
        },
        {
          id: "e5",
          wrong: "its become",
          right: "it's become",
          kind: "Its vs it's",
          expEn: "\"It has become\" is the meaning, so the contraction it's is needed here too.",
          expVn: "Nghĩa là \"It has become\", nên ở đây cũng cần dạng rút gọn it's."
        }
      ]
    },
    {
      id: "pf2",
      title: "A Letter to the Landlord",
      titleVn: "Thư gửi chủ nhà",
      passage: "Dear Mr Okafor, I am writing about the heating in flat 4B. Since monday the radiators have been cold, and the flat is to cold for my children to sleep well. My neighbours say there radiators are also broken, so the problem is probably in the boiler. I called the office on Tuesday, but nobody has replied. I would except a repair next week, but I cannot wait longer then that. Whose responsible for arranging the engineer? Please let me know what you decide. Yours sincerely, Linh Pham",
      errors: [
        {
          id: "e1",
          wrong: "Since monday",
          right: "Since Monday",
          kind: "Capital letter",
          expEn: "Days of the week always take a capital letter: Monday.",
          expVn: "Các ngày trong tuần luôn viết hoa: Monday."
        },
        {
          id: "e2",
          wrong: "is to cold",
          right: "is too cold",
          kind: "To vs too",
          expEn: "\"Too\" means very much or more than enough. \"To\" shows direction or comes before a verb.",
          expVn: "\"Too\" nghĩa là quá hoặc nhiều hơn mức cần. \"To\" chỉ hướng hoặc đứng trước động từ."
        },
        {
          id: "e3",
          wrong: "say there radiators",
          right: "say their radiators",
          kind: "Their vs there",
          expEn: "The radiators belong to the neighbours, so the possessive \"their\" is needed.",
          expVn: "Bộ tản nhiệt thuộc về hàng xóm, nên cần từ sở hữu \"their\"."
        },
        {
          id: "e4",
          wrong: "would except a",
          right: "would accept a",
          kind: "Accept vs except",
          expEn: "\"Accept\" means to agree to receive. \"Except\" means not including.",
          expVn: "\"Accept\" nghĩa là đồng ý nhận. \"Except\" nghĩa là ngoại trừ."
        },
        {
          id: "e5",
          wrong: "longer then that",
          right: "longer than that",
          kind: "Then vs than",
          expEn: "\"Longer than\" is a comparison, so \"than\" is needed. \"Then\" means next in time.",
          expVn: "\"Longer than\" là phép so sánh, nên cần \"than\". \"Then\" nghĩa là tiếp theo về thời gian."
        },
        {
          id: "e6",
          wrong: "Whose responsible",
          right: "Who's responsible",
          kind: "Whose vs who's",
          expEn: "\"Who is responsible\" makes sense, so the contraction \"Who's\" is needed. \"Whose\" shows ownership.",
          expVn: "\"Who is responsible\" có nghĩa, nên cần dạng rút gọn \"Who's\". \"Whose\" chỉ sở hữu."
        }
      ]
    },
    {
      id: "pf3",
      title: "The Football Final",
      titleVn: "Trận chung kết bóng đá",
      passage: "The school football final was played on Saturday, and the whole town came to watch. The two teams' had trained for months, and the players were nervous before the whistle. Our goalkeeper, a tall boy from Year 10, saved three shots in the first half. The captain of the other team, was angry when the referee gave a penalty. In the last minute our striker scored and the crowd went wild. The trophy now sits in the school hall, and it's shine can be seen from the door. Everyone agree that it was the best final in years.",
      errors: [
        {
          id: "e1",
          wrong: "two teams' had",
          right: "two teams had",
          kind: "Plural, no apostrophe",
          expEn: "\"Teams\" is a plural here, not an owner. A plural never takes an apostrophe.",
          expVn: "\"Teams\" ở đây là số nhiều, không phải chủ sở hữu. Số nhiều không bao giờ có dấu lược."
        },
        {
          id: "e2",
          wrong: "team, was angry",
          right: "team was angry",
          kind: "Subject–verb comma",
          expEn: "\"The captain of the other team\" is the subject and \"was\" is its verb. No comma goes between them.",
          expVn: "\"The captain of the other team\" là chủ ngữ và \"was\" là động từ. Không đặt dấu phẩy giữa chúng."
        },
        {
          id: "e3",
          wrong: "striker scored and the",
          right: "striker scored, and the",
          kind: "Comma before and",
          expEn: "\"And\" joins two complete sentences (the striker scored / the crowd went wild), so a comma goes before it.",
          expVn: "\"And\" nối hai câu hoàn chỉnh (the striker scored / the crowd went wild), nên cần dấu phẩy trước nó."
        },
        {
          id: "e4",
          wrong: "it's shine",
          right: "its shine",
          kind: "Its vs it's",
          expEn: "The shine belongs to the trophy, so the possessive \"its\" (no apostrophe) is needed. \"It is shine\" makes no sense.",
          expVn: "Độ bóng thuộc về chiếc cúp, nên cần từ sở hữu \"its\" (không dấu lược). \"It is shine\" vô nghĩa."
        },
        {
          id: "e5",
          wrong: "Everyone agree that",
          right: "Everyone agrees that",
          kind: "Subject–verb agreement",
          expEn: "\"Everyone\" is singular, so the verb takes an -s: agrees.",
          expVn: "\"Everyone\" là số ít, nên động từ mang -s: agrees."
        }
      ]
    },
    {
      id: "pf4",
      title: "Moving Day",
      titleVn: "Ngày chuyển nhà",
      passage: "We moved into our new house on friday, and it was a long day. My brothers van broke down twice on the motorway, so the furniture arrived three hours late. My mother who hates waiting, unpacked every box in the kitchen while we waited. The neighbours' children came over to say hello, and they showed my daughter the park at the end of the road. Their very friendly people. The beds were built by midnight, and everyone was to tired to talk. We are going to like it here.",
      errors: [
        {
          id: "e1",
          wrong: "on friday",
          right: "on Friday",
          kind: "Capital letter",
          expEn: "Days of the week always take a capital letter: Friday.",
          expVn: "Các ngày trong tuần luôn viết hoa: Friday."
        },
        {
          id: "e2",
          wrong: "My brothers van",
          right: "My brother's van",
          kind: "Possessive apostrophe",
          expEn: "The van belongs to one brother, so the possessive needs an apostrophe: brother's.",
          expVn: "Chiếc xe thuộc về một người anh, nên dạng sở hữu cần dấu lược: brother's."
        },
        {
          id: "e3",
          wrong: "My mother who hates waiting,",
          right: "My mother, who hates waiting,",
          kind: "Extra-information commas",
          expEn: "\"Who hates waiting\" is extra information about my mother, so it needs a comma on both sides.",
          expVn: "\"Who hates waiting\" là thông tin phụ về mẹ tôi, nên cần dấu phẩy ở cả hai bên."
        },
        {
          id: "e4",
          wrong: "Their very friendly",
          right: "They're very friendly",
          kind: "Their vs they're",
          expEn: "\"They are very friendly people\" makes sense, so the contraction \"They're\" is needed.",
          expVn: "\"They are very friendly people\" có nghĩa, nên cần dạng rút gọn \"They're\"."
        },
        {
          id: "e5",
          wrong: "was to tired",
          right: "was too tired",
          kind: "To vs too",
          expEn: "\"Too tired\" means more tired than is good. \"To\" would need a verb or a place after it.",
          expVn: "\"Too tired\" nghĩa là quá mệt. \"To\" sẽ cần một động từ hoặc nơi chốn sau nó."
        }
      ]
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "Rewrite this sentence with the apostrophes in the right places: \"The dogs bowl is empty, and its time for it's dinner.\" Then explain in one sentence when a writer should use it's.",
      suggestedWords: [["belongs", "owner"], ["short form", "missing letters"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for writing \"dog's bowl\" (apostrophe before the -s for one owner).",
        "1 mark for writing \"it's time\" (contraction of it is).",
        "1 mark for writing \"its dinner\" (possessive, no apostrophe).",
        "1 mark for explaining that it's is used only when \"it is\" or \"it has\" would fit."
      ],
      modelAnswer: "The dog's bowl is empty, and it's time for its dinner. A writer should use it's only when the words \"it is\" or \"it has\" would make sense in the sentence; otherwise the possessive its has no apostrophe.",
      vnTranslation: "Viết lại câu này với dấu lược ở đúng chỗ: \"The dogs bowl is empty, and its time for it's dinner.\" Sau đó giải thích trong một câu khi nào người viết nên dùng it's."
    },
    {
      id: "q2",
      question: "Rewrite this sentence with the commas it needs: \"After the meeting Mr Chen the new manager thanked the staff and everyone went home early.\"",
      suggestedWords: [["introductory", "opening"], ["extra information", "renames"], ["two sentences", "complete"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for a comma after the introductory phrase: \"After the meeting,\".",
        "1 mark for commas on both sides of the appositive: \"Mr Chen, the new manager,\".",
        "1 mark for a comma before \"and\" where it joins two complete sentences: \"the staff, and everyone\"."
      ],
      modelAnswer: "After the meeting, Mr Chen, the new manager, thanked the staff, and everyone went home early.",
      vnTranslation: "Viết lại câu này với những dấu phẩy cần thiết: \"After the meeting Mr Chen the new manager thanked the staff and everyone went home early.\""
    },
    {
      id: "q3",
      question: "Explain the difference between then and than. Then write one correct sentence using each word.",
      suggestedWords: [["first", "next"], ["bigger", "smaller", "more"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for stating that then is about time or order (what happens next).",
        "1 mark for stating that than is used to compare two things.",
        "1 mark for writing one correct sentence with then AND one correct sentence with than."
      ],
      modelAnswer: "Then is about time: it tells the reader what happens next. Than is used to compare two things. For example: \"I finished work, and then I cooked dinner.\" \"My brother is taller than me.\"",
      vnTranslation: "Giải thích sự khác biệt giữa then và than. Sau đó viết một câu đúng dùng mỗi từ."
    }
  ],
  assessment,
  notes
};
