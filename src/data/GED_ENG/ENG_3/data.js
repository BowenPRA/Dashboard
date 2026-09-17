// src/data/GED_ENG/ENG_3/data.js
// Lesson 3 of the RLA blueprint (docs/ged-english-lessons.md): Verb Tense &
// Consistency. Built for a Vietnamese speaker — Vietnamese verbs never change
// their shape for time, so every rule here is a signal word → a verb form.
import { assessment } from './assessment.js';
import { notes } from './notes.js';

export const ENGLISH_3_DATA = {
  meta: {
    id: "ENG_3",
    title: "Grammar Foundations 3: Verb Tense & Consistency",
    desc: "Read the signal word, pick the past, present or future form, choose between have worked and worked, and catch the one verb that breaks the pattern.",
    track: "GED_ENG",
    icon: "Clock"
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
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 10 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 30 }
      ]
    }
  ],
  realWords: [
    {
      word: "Tense",
      vn: "Thì (của động từ)",
      def: "The form of a verb that shows when an action happens: past, present or future.",
      vnDef: "Dạng của động từ cho biết hành động xảy ra khi nào: quá khứ, hiện tại hay tương lai.",
      sent: "The past tense of walk is walked.",
      vnSent: "Thì quá khứ của walk là walked.",
      isReal: true
    },
    {
      word: "Consistent",
      vn: "Nhất quán",
      def: "Staying the same all the way through.",
      vnDef: "Giữ nguyên như nhau từ đầu đến cuối.",
      sent: "Keep the tense consistent through the whole paragraph.",
      vnSent: "Hãy giữ thì nhất quán trong cả đoạn văn.",
      isReal: true
    },
    {
      word: "Regular",
      vn: "Có quy tắc",
      def: "Describing a verb that makes its past form by adding -ed.",
      vnDef: "Mô tả động từ tạo dạng quá khứ bằng cách thêm -ed.",
      sent: "Work is a regular verb, so its past form is worked.",
      vnSent: "Work là động từ có quy tắc, nên dạng quá khứ của nó là worked.",
      isReal: true
    },
    {
      word: "Irregular",
      vn: "Bất quy tắc",
      def: "Describing a verb whose past form does not end in -ed, such as went or bought.",
      vnDef: "Mô tả động từ có dạng quá khứ không kết thúc bằng -ed, như went hoặc bought.",
      sent: "Go is an irregular verb: its past form is went, not goed.",
      vnSent: "Go là động từ bất quy tắc: dạng quá khứ của nó là went, không phải goed.",
      isReal: true
    },
    {
      word: "Signal",
      vn: "Tín hiệu",
      def: "A word that tells you which tense to use, such as yesterday or tomorrow.",
      vnDef: "Một từ cho bạn biết phải dùng thì nào, như yesterday hoặc tomorrow.",
      sent: "The signal word yesterday tells you to use the past tense.",
      vnSent: "Từ tín hiệu yesterday cho bạn biết phải dùng thì quá khứ.",
      isReal: true
    },
    {
      word: "Participle",
      vn: "Phân từ",
      def: "The verb form used after have or has, such as worked or gone.",
      vnDef: "Dạng động từ dùng sau have hoặc has, như worked hoặc gone.",
      sent: "In has gone, the word gone is a past participle.",
      vnSent: "Trong has gone, từ gone là quá khứ phân từ.",
      isReal: true
    },
    {
      word: "Perfect",
      vn: "Hoàn thành",
      def: "Describing the tense made with have or has that links the past to now.",
      vnDef: "Mô tả thì được tạo bằng have hoặc has, nối quá khứ với hiện tại.",
      sent: "The present perfect uses has or have plus the participle.",
      vnSent: "Thì hiện tại hoàn thành dùng has hoặc have cộng với phân từ.",
      isReal: true
    },
    {
      word: "Continuous",
      vn: "Tiếp diễn",
      def: "Describing a verb form with was or were plus -ing that shows an action in progress.",
      vnDef: "Mô tả dạng động từ với was hoặc were cộng -ing, cho thấy hành động đang diễn ra.",
      sent: "The past continuous, was cooking, shows an action in the middle of happening.",
      vnSent: "Thì quá khứ tiếp diễn, was cooking, cho thấy hành động đang xảy ra giữa chừng.",
      isReal: true
    },
    {
      word: "Schedule",
      vn: "Lịch trình",
      def: "A fixed plan of the times when things will happen.",
      vnDef: "Một kế hoạch cố định về thời gian các việc sẽ diễn ra.",
      sent: "For a fixed schedule, English uses the present tense: the train leaves at nine.",
      vnSent: "Với lịch trình cố định, tiếng Anh dùng thì hiện tại: the train leaves at nine.",
      isReal: true
    },
    {
      word: "Shift",
      vn: "Sự chuyển đổi",
      def: "A change from one tense to another.",
      vnDef: "Sự thay đổi từ thì này sang thì khác.",
      sent: "An unneeded shift from past to present is a common error on the test.",
      vnSent: "Một sự chuyển đổi không cần thiết từ quá khứ sang hiện tại là lỗi thường gặp trong bài thi.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Three Times, Three Signals",
      vnTitle: "Ba thời điểm, ba tín hiệu",
      text: "A verb's {tense} tells the reader when something happens. Look for a {signal} word first: yesterday and last year point to the past, every day points to the present, and tomorrow or next week points to the future. A {regular} verb makes its past form with -ed, but an {irregular} verb changes its whole shape, like go and went.",
      vnText: "Thì của động từ cho người đọc biết điều gì đó xảy ra khi nào. Hãy tìm từ tín hiệu trước: yesterday và last year chỉ quá khứ, every day chỉ hiện tại, còn tomorrow hoặc next week chỉ tương lai. Động từ có quy tắc tạo dạng quá khứ bằng -ed, nhưng động từ bất quy tắc thay đổi cả hình dạng, như go và went."
    },
    {
      id: "passage_2",
      title: "Have Worked or Worked?",
      vnTitle: "Have worked hay worked?",
      text: "The present {perfect} (has or have plus the {participle}) links the past to now: I have worked here since 2020, and I still work here. A finished time such as yesterday or in 2019 needs the simple past instead. The past {continuous}, was or were plus -ing, shows a longer action that another action interrupted.",
      vnText: "Thì hiện tại hoàn thành (has hoặc have cộng phân từ) nối quá khứ với hiện tại: I have worked here since 2020, và tôi vẫn làm việc ở đây. Một thời điểm đã kết thúc như yesterday hoặc in 2019 thì cần thì quá khứ đơn. Thì quá khứ tiếp diễn, was hoặc were cộng -ing, cho thấy một hành động dài hơn bị một hành động khác cắt ngang."
    },
    {
      id: "passage_3",
      title: "Stay in One Time",
      vnTitle: "Giữ nguyên một thời điểm",
      text: "Good writing keeps its tense {consistent}. If a story starts in the past, every verb stays in the past unless the meaning truly changes. The test often hides one {shift}, a single verb that jumps to the present. Watch also for a fixed {schedule}: the bus leaves at six uses the present tense even though it means the future.",
      vnText: "Bài viết tốt giữ thì nhất quán. Nếu câu chuyện bắt đầu ở quá khứ, mọi động từ đều ở quá khứ trừ khi ý nghĩa thực sự thay đổi. Bài thi thường giấu một sự chuyển đổi, một động từ duy nhất nhảy sang hiện tại. Cũng hãy chú ý lịch trình cố định: the bus leaves at six dùng thì hiện tại dù nó nói về tương lai."
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "A Busy Morning",
      titleVn: "Một buổi sáng bận rộn",
      passage: "Yesterday morning I [[b1]] up late because my alarm did not ring. I [[b2]] a quick breakfast and ran to the bus stop. The bus [[b3]] at 8:15 every day, so I was worried. Luckily it was late too, and I [[b4]] my seat with a minute to spare. Tomorrow I [[b5]] my alarm before I go to bed.",
      blanks: [
        {
          id: "b1",
          options: ["wake", "woke", "have woken"],
          correct: "woke",
          expEn: "\"Yesterday\" is a finished time, so the verb takes its past form. Wake is irregular: woke, not waked.",
          expVn: "\"Yesterday\" là thời điểm đã kết thúc, nên động từ dùng dạng quá khứ. Wake là bất quy tắc: woke, không phải waked."
        },
        {
          id: "b2",
          options: ["make", "made", "have made"],
          correct: "made",
          expEn: "The story is still in the past (yesterday). Make is irregular, so its past form is \"made\".",
          expVn: "Câu chuyện vẫn ở quá khứ (yesterday). Make là bất quy tắc, nên dạng quá khứ là \"made\"."
        },
        {
          id: "b3",
          options: ["leave", "leaves", "left"],
          correct: "leaves",
          expEn: "\"Every day\" signals a habit, so this one verb is in the simple present. The bus is one thing, so it takes the -s: \"leaves\".",
          expVn: "\"Every day\" báo hiệu thói quen, nên riêng động từ này ở thì hiện tại đơn. The bus là số ít, nên thêm -s: \"leaves\"."
        },
        {
          id: "b4",
          options: ["find", "found", "have found"],
          correct: "found",
          expEn: "Back in the story of yesterday, so the past form. Find is irregular: \"found\".",
          expVn: "Trở lại câu chuyện của ngày hôm qua, nên dùng dạng quá khứ. Find là bất quy tắc: \"found\"."
        },
        {
          id: "b5",
          options: ["set", "will set", "had set"],
          correct: "will set",
          expEn: "\"Tomorrow\" points to the future, so use will + verb: \"will set\".",
          expVn: "\"Tomorrow\" chỉ tương lai, nên dùng will + động từ: \"will set\"."
        }
      ]
    },
    {
      id: "ge2",
      title: "The New Job",
      titleVn: "Công việc mới",
      passage: "Linh [[b1]] at the clinic since March. Before that, she [[b2]] in a restaurant for two years. She [[b3]] the night shift twice already, and she [[b4]] the afternoon shift yet. Last week her manager [[b5]] her a new uniform.",
      blanks: [
        {
          id: "b1",
          options: ["works", "has worked", "worked"],
          correct: "has worked",
          expEn: "\"Since March\" links the past to now — she still works there — so use the present perfect: \"has worked\".",
          expVn: "\"Since March\" nối quá khứ với hiện tại — cô ấy vẫn làm ở đó — nên dùng hiện tại hoàn thành: \"has worked\"."
        },
        {
          id: "b2",
          options: ["works", "has worked", "worked"],
          correct: "worked",
          expEn: "\"Before that\" is a finished time. The restaurant job is over, so use the simple past: \"worked\".",
          expVn: "\"Before that\" là thời điểm đã kết thúc. Công việc ở nhà hàng đã xong, nên dùng quá khứ đơn: \"worked\"."
        },
        {
          id: "b3",
          options: ["takes", "took", "has taken"],
          correct: "has taken",
          expEn: "\"Already\" is a present-perfect signal: it counts up to now. Take → has taken.",
          expVn: "\"Already\" là tín hiệu của hiện tại hoàn thành: nó tính đến bây giờ. Take → has taken."
        },
        {
          id: "b4",
          options: ["does not try", "did not try", "has not tried"],
          correct: "has not tried",
          expEn: "\"Yet\" means \"up to now\", so the present perfect is needed: \"has not tried\".",
          expVn: "\"Yet\" nghĩa là \"cho đến bây giờ\", nên cần hiện tại hoàn thành: \"has not tried\"."
        },
        {
          id: "b5",
          options: ["gives", "gave", "has given"],
          correct: "gave",
          expEn: "\"Last week\" is a finished time, so the simple past. Give is irregular: \"gave\".",
          expVn: "\"Last week\" là thời điểm đã kết thúc, nên dùng quá khứ đơn. Give là bất quy tắc: \"gave\"."
        }
      ]
    },
    {
      id: "ge3",
      title: "The Storm",
      titleVn: "Cơn bão",
      passage: "On Friday evening we [[b1]] dinner when the lights went out. My brother [[b2]] for a torch while I stayed at the table. The wind [[b3]] hard all night, and a tree fell across the road. In the morning the power [[b4]] back on, and the neighbours [[b5]] the branches together.",
      blanks: [
        {
          id: "b1",
          options: ["are eating", "were eating", "have eaten"],
          correct: "were eating",
          expEn: "A longer past action (dinner) was interrupted by a short one (the lights went out). The longer action takes was/were + -ing: \"were eating\".",
          expVn: "Một hành động dài trong quá khứ (bữa tối) bị một hành động ngắn (mất điện) cắt ngang. Hành động dài dùng was/were + -ing: \"were eating\"."
        },
        {
          id: "b2",
          options: ["looks", "looked", "is looking"],
          correct: "looked",
          expEn: "The story is in the past, so the verb stays in the past: \"looked\". A jump to \"looks\" breaks the pattern.",
          expVn: "Câu chuyện ở quá khứ, nên động từ giữ ở quá khứ: \"looked\". Nhảy sang \"looks\" sẽ phá vỡ mạch thì."
        },
        {
          id: "b3",
          options: ["blows", "blew", "has blown"],
          correct: "blew",
          expEn: "\"All night\" is a finished period in the past story. Blow is irregular: \"blew\".",
          expVn: "\"All night\" là khoảng thời gian đã kết thúc trong câu chuyện quá khứ. Blow là bất quy tắc: \"blew\"."
        },
        {
          id: "b4",
          options: ["comes", "came", "has come"],
          correct: "came",
          expEn: "Still the same past story. Come is irregular, so \"came\".",
          expVn: "Vẫn là câu chuyện quá khứ đó. Come là bất quy tắc, nên dùng \"came\"."
        },
        {
          id: "b5",
          options: ["clear", "cleared", "have cleared"],
          correct: "cleared",
          expEn: "Keep the tense consistent: the whole story is in the past, and clear is regular, so add -ed: \"cleared\".",
          expVn: "Giữ thì nhất quán: cả câu chuyện ở quá khứ, và clear là động từ có quy tắc, nên thêm -ed: \"cleared\"."
        }
      ]
    },
    {
      id: "ge4",
      title: "The Office Move",
      titleVn: "Chuyển văn phòng",
      passage: "Our office [[b1]] to the new building next month. The movers [[b2]] on Friday at 7 a.m., so please pack your desk before you leave on Thursday. The company [[b3]] every employee a new key card last week. If you [[b4]] yours yet, ask at the front desk. We [[b5]] all staff by email when the move is complete.",
      blanks: [
        {
          id: "b1",
          options: ["moved", "will move", "has moved"],
          correct: "will move",
          expEn: "\"Next month\" is a future plan, so will + verb: \"will move\".",
          expVn: "\"Next month\" là kế hoạch tương lai, nên dùng will + động từ: \"will move\"."
        },
        {
          id: "b2",
          options: ["arrive", "arrived", "have arrived"],
          correct: "arrive",
          expEn: "A fixed schedule (Friday at 7 a.m.) uses the simple present even for a future event: \"arrive\".",
          expVn: "Lịch trình cố định (thứ Sáu lúc 7 giờ sáng) dùng thì hiện tại đơn ngay cả cho việc tương lai: \"arrive\"."
        },
        {
          id: "b3",
          options: ["gives", "gave", "has given"],
          correct: "gave",
          expEn: "\"Last week\" is a finished time, so the simple past. Give is irregular: \"gave\".",
          expVn: "\"Last week\" là thời điểm đã kết thúc, nên dùng quá khứ đơn. Give là bất quy tắc: \"gave\"."
        },
        {
          id: "b4",
          options: ["do not receive", "did not receive", "have not received"],
          correct: "have not received",
          expEn: "\"Yet\" counts up to this moment, so the present perfect: \"have not received\".",
          expVn: "\"Yet\" tính đến thời điểm này, nên dùng hiện tại hoàn thành: \"have not received\"."
        },
        {
          id: "b5",
          options: ["notify", "notified", "will notify"],
          correct: "will notify",
          expEn: "\"When the move is complete\" points to the future, so the main verb is will + verb: \"will notify\".",
          expVn: "\"When the move is complete\" chỉ tương lai, nên động từ chính là will + động từ: \"will notify\"."
        }
      ]
    }
  ],
  proofread: [
    {
      id: "pf1",
      title: "First Day at the Bakery",
      titleVn: "Ngày đầu ở tiệm bánh",
      passage: "Last month my cousin start a job at a bakery near the market. On her first day she arrive at five in the morning, and the owner showed her how to shape the bread. She has learned quickly, and by the end of the week she was making forty loaves before the shop opened. The bakery sell out of bread almost every day now. Yesterday the owner tell her that she is getting a small pay rise next month. She is very proud of it.",
      errors: [
        {
          id: "e1",
          wrong: "cousin start a job",
          right: "cousin started a job",
          accept: [],
          kind: "Past tense",
          expEn: "\"Last month\" is a finished time, so the regular verb start needs -ed: started.",
          expVn: "\"Last month\" là thời điểm đã kết thúc, nên động từ có quy tắc start cần -ed: started."
        },
        {
          id: "e2",
          wrong: "she arrive at",
          right: "she arrived at",
          accept: [],
          kind: "Past tense",
          expEn: "\"On her first day\" is still last month, so arrive becomes arrived.",
          expVn: "\"On her first day\" vẫn là tháng trước, nên arrive thành arrived."
        },
        {
          id: "e3",
          wrong: "has learned",
          right: "learned",
          accept: ["learnt"],
          kind: "Tense consistency",
          expEn: "The story is in the simple past, so \"has learned\" (present perfect) breaks the pattern. Use learned.",
          expVn: "Câu chuyện ở quá khứ đơn, nên \"has learned\" (hiện tại hoàn thành) phá vỡ mạch thì. Dùng learned."
        },
        {
          id: "e4",
          wrong: "bakery sell out",
          right: "bakery sells out",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Now\" and \"every day\" make this present, and the bakery is one thing, so the verb takes -s: sells.",
          expVn: "\"Now\" và \"every day\" cho thấy đây là hiện tại, và the bakery là số ít, nên động từ thêm -s: sells."
        },
        {
          id: "e5",
          wrong: "owner tell her",
          right: "owner told her",
          accept: [],
          kind: "Irregular past",
          expEn: "\"Yesterday\" is a finished time. Tell is irregular: told, not telled.",
          expVn: "\"Yesterday\" là thời điểm đã kết thúc. Tell là bất quy tắc: told, không phải telled."
        }
      ]
    },
    {
      id: "pf2",
      title: "The Interview",
      titleVn: "Buổi phỏng vấn",
      passage: "I have applied for a job at the library two weeks ago, and yesterday I went for the interview. The manager asked me why I wanted the job, and I said that I love reading. She told me that the library has opened in 1975 and that they still keep the original wooden desks. The interview lasts about an hour. She will call me next week. I hope that I get the job, because I never work in such a quiet place before.",
      errors: [
        {
          id: "e1",
          wrong: "I have applied for",
          right: "I applied for",
          accept: [],
          kind: "Perfect vs past",
          expEn: "\"Two weeks ago\" is a finished time, so the simple past applied — not the present perfect.",
          expVn: "\"Two weeks ago\" là thời điểm đã kết thúc, nên dùng quá khứ đơn applied — không phải hiện tại hoàn thành."
        },
        {
          id: "e2",
          wrong: "library has opened in",
          right: "library opened in",
          accept: [],
          kind: "Perfect vs past",
          expEn: "\"In 1975\" is a finished date, so the simple past opened. Have/has never goes with a finished date.",
          expVn: "\"In 1975\" là mốc thời gian đã kết thúc, nên dùng quá khứ đơn opened. Have/has không bao giờ đi với mốc thời gian đã kết thúc."
        },
        {
          id: "e3",
          wrong: "they still keep",
          right: "it still keeps",
          accept: [],
          kind: "Pronoun agreement",
          expEn: "The library is one thing, so its pronoun is it, and the present verb takes -s: it still keeps.",
          expVn: "The library là một vật, nên đại từ của nó là it, và động từ hiện tại thêm -s: it still keeps."
        },
        {
          id: "e4",
          wrong: "interview lasts about",
          right: "interview lasted about",
          accept: [],
          kind: "Tense consistency",
          expEn: "The interview was yesterday, so the verb stays in the past: lasted. \"Lasts\" is a shift to the present.",
          expVn: "Buổi phỏng vấn là hôm qua, nên động từ giữ ở quá khứ: lasted. \"Lasts\" là sự chuyển sang hiện tại."
        },
        {
          id: "e5",
          wrong: "never work in",
          right: "have never worked in",
          accept: ["never worked in"],
          kind: "Present perfect",
          expEn: "\"Before\" here means \"up to now\", so the present perfect: have never worked.",
          expVn: "\"Before\" ở đây nghĩa là \"cho đến bây giờ\", nên dùng hiện tại hoàn thành: have never worked."
        }
      ]
    },
    {
      id: "pf3",
      title: "The Football Match",
      titleVn: "Trận bóng đá",
      passage: "Last Saturday our team plays its final match of the season. The rain was falling when the game started, and the field was already muddy. In the first half, Minh scores twice, and the crowd cheered every time. While the goalkeeper was tying his boot, the other team take a quick shot and scored. At half-time the coach tells us to stay calm. We won 3–2 in the end, and everybody go home happy. Next season the club will build a covered stand for the fans.",
      errors: [
        {
          id: "e1",
          wrong: "team plays its",
          right: "team played its",
          accept: [],
          kind: "Past tense",
          expEn: "\"Last Saturday\" is a finished time, so play takes -ed: played.",
          expVn: "\"Last Saturday\" là thời điểm đã kết thúc, nên play thêm -ed: played."
        },
        {
          id: "e2",
          wrong: "Minh scores twice",
          right: "Minh scored twice",
          accept: [],
          kind: "Tense consistency",
          expEn: "The match is told in the past (\"the crowd cheered\"), so scores must be scored.",
          expVn: "Trận đấu được kể ở quá khứ (\"the crowd cheered\"), nên scores phải là scored."
        },
        {
          id: "e3",
          wrong: "team take a quick shot",
          right: "team took a quick shot",
          accept: [],
          kind: "Irregular past",
          expEn: "The short action that interrupts \"was tying\" is in the simple past. Take is irregular: took.",
          expVn: "Hành động ngắn cắt ngang \"was tying\" ở quá khứ đơn. Take là bất quy tắc: took."
        },
        {
          id: "e4",
          wrong: "coach tells us",
          right: "coach told us",
          accept: [],
          kind: "Irregular past",
          expEn: "Still the same past match, so tell becomes its irregular past form told.",
          expVn: "Vẫn là trận đấu quá khứ đó, nên tell thành dạng quá khứ bất quy tắc told."
        },
        {
          id: "e5",
          wrong: "everybody go home",
          right: "everybody went home",
          accept: [],
          kind: "Irregular past",
          expEn: "The sentence is in the past (\"We won\"), so go becomes went.",
          expVn: "Câu này ở quá khứ (\"We won\"), nên go thành went."
        }
      ]
    },
    {
      id: "pf4",
      title: "A Change of Plans",
      titleVn: "Thay đổi kế hoạch",
      passage: "Every morning my father drive the same road to the factory, and he leaves the house at exactly six. Tomorrow, however, the road will be closed for repairs, so he plans to take the train instead. The train leave at 6:20 and arrives at the factory gate at 6:50. He has never took the train to work before, so last night he checked the timetable twice. He buy his ticket online yesterday, and it is already on his phone. If the train is late, his manager will understand.",
      errors: [
        {
          id: "e1",
          wrong: "father drive the",
          right: "father drives the",
          accept: [],
          kind: "Present -s rule",
          expEn: "\"Every morning\" is a habit in the present, and my father is one person, so the verb takes -s: drives.",
          expVn: "\"Every morning\" là thói quen ở hiện tại, và my father là một người, nên động từ thêm -s: drives."
        },
        {
          id: "e2",
          wrong: "train leave at",
          right: "train leaves at",
          accept: [],
          kind: "Schedule present",
          expEn: "A timetable uses the simple present, and the train is one thing, so leaves — matching \"arrives\" later in the sentence.",
          expVn: "Lịch trình dùng thì hiện tại đơn, và the train là số ít, nên leaves — khớp với \"arrives\" ở sau trong câu."
        },
        {
          id: "e3",
          wrong: "never took the",
          right: "never taken the",
          accept: [],
          kind: "Past participle",
          expEn: "After has or have, use the participle: has taken, not has took.",
          expVn: "Sau has hoặc have, dùng phân từ: has taken, không phải has took."
        },
        {
          id: "e4",
          wrong: "He buy his",
          right: "He bought his",
          accept: [],
          kind: "Irregular past",
          expEn: "\"Yesterday\" is a finished time. Buy is irregular: bought, not buyed.",
          expVn: "\"Yesterday\" là thời điểm đã kết thúc. Buy là bất quy tắc: bought, không phải buyed."
        }
      ]
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "Explain what is wrong with this sentence and write it correctly: \"Yesterday I go to the market and buy some fish.\"",
      vnTranslation: "Giải thích câu này sai ở đâu và viết lại cho đúng: \"Yesterday I go to the market and buy some fish.\"",
      suggestedWords: [["irregular", "regular"], ["verb", "verbs"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for explaining that \"yesterday\" is a finished time, so the verbs must be in the past tense (they are wrongly in the present).",
        "1 mark for changing \"go\" to \"went\".",
        "1 mark for changing \"buy\" to \"bought\"."
      ],
      modelAnswer: "The signal word \"yesterday\" is a finished time, so both verbs must be in the past tense, but \"go\" and \"buy\" are in the present. Both are irregular verbs. The correct sentence is: \"Yesterday I went to the market and bought some fish.\""
    },
    {
      id: "q2",
      question: "Rewrite these two sentences so that the verb tenses are correct: \"Mai works at the hospital since 2021. She has moved to the city in 2020.\"",
      vnTranslation: "Viết lại hai câu này sao cho thì của động từ đúng: \"Mai works at the hospital since 2021. She has moved to the city in 2020.\"",
      suggestedWords: [["since", "for"], ["finished", "still"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for \"Mai has worked at the hospital since 2021\" (since links the past to now, so the present perfect is needed).",
        "1 mark for \"She moved to the city in 2020\" (in 2020 is a finished time, so the simple past is needed)."
      ],
      modelAnswer: "Mai has worked at the hospital since 2021. She moved to the city in 2020. The first sentence needs the present perfect because \"since 2021\" links the past to now and she still works there. The second needs the simple past because \"in 2020\" is a finished time."
    },
    {
      id: "q3",
      question: "This short paragraph has one verb that breaks the tense. Find it and write the paragraph correctly: \"Last week our class visited the science museum. We saw a real dinosaur skeleton, and the guide explains how it was found. Afterwards we ate lunch in the park.\"",
      vnTranslation: "Đoạn văn ngắn này có một động từ làm sai thì. Hãy tìm nó và viết lại đoạn văn cho đúng: \"Last week our class visited the science museum. We saw a real dinosaur skeleton, and the guide explains how it was found. Afterwards we ate lunch in the park.\"",
      suggestedWords: [["consistent", "pattern"], ["past"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying \"explains\" as the verb that shifts to the present while the rest of the paragraph is in the past.",
        "1 mark for rewriting it as \"explained\" with the other verbs (visited, saw, was found, ate) left in the past."
      ],
      modelAnswer: "The verb that breaks the pattern is \"explains\". The paragraph is about last week, and every other verb is in the past (visited, saw, ate), so \"explains\" must be \"explained\": \"Last week our class visited the science museum. We saw a real dinosaur skeleton, and the guide explained how it was found. Afterwards we ate lunch in the park.\""
    }
  ],
  assessment,
  notes
};
