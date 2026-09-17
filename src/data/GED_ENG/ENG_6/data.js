// src/data/GED_ENG/ENG_6/data.js
// ENG_6 — Transitions & Organization. Lesson 6 of the RLA blueprint
// (docs/ged-english-lessons.md). Transition words by job, the paragraph shape
// (topic → support → concluding), one idea per paragraph, ordering ideas, and
// formal, precise word choice — Trait 2 of the essay rubric.
import { assessment } from './assessment.js';
import { notes } from './notes.js';

export const ENGLISH_6_DATA = {
  meta: {
    id: "ENG_6",
    title: "Transitions & Organization",
    desc: "Choose the transition the logic needs, build a paragraph from topic sentence to concluding sentence, cut the sentence that does not belong, and put ideas in the order that convinces.",
    track: "GED_ENG",
    icon: "ListOrdered"
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
        { id: "GRAMMAR_EDIT", dbKey: "p13", maxXP: 20 },
        { id: "SEQUENCE", dbKey: "p34", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      // 60 XP reachable before this gate; 45 is 75% (the 80% rule).
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 }
      ]
    }
  ],
  realWords: [
    {
      word: "Transition",
      vn: "Từ chuyển tiếp",
      def: "A word or phrase such as however or for example that links one idea to the next.",
      vnDef: "Một từ hoặc cụm từ như however hoặc for example nối ý này với ý tiếp theo.",
      sent: "A transition tells the reader how the next sentence connects to the last one.",
      vnSent: "Từ chuyển tiếp cho người đọc biết câu tiếp theo liên kết với câu trước thế nào.",
      isReal: true
    },
    {
      word: "Contrast",
      vn: "Sự tương phản",
      def: "A difference between two things that are compared.",
      vnDef: "Sự khác biệt giữa hai điều được đem ra so sánh.",
      sent: "Use however or in contrast to show a contrast between two ideas.",
      vnSent: "Dùng however hoặc in contrast để thể hiện sự tương phản giữa hai ý.",
      isReal: true
    },
    {
      word: "Sequence",
      vn: "Trình tự",
      def: "The order in which things happen or should be done.",
      vnDef: "Thứ tự mà các việc xảy ra hoặc nên được làm.",
      sent: "First, next and finally show the sequence of steps in a process.",
      vnSent: "First, next và finally cho thấy trình tự các bước trong một quy trình.",
      isReal: true
    },
    {
      word: "Topic",
      vn: "Chủ đề",
      def: "The main subject that a paragraph or text is about.",
      vnDef: "Chủ đề chính mà một đoạn văn hoặc bài văn nói tới.",
      sent: "The topic sentence tells the reader what the whole paragraph is about.",
      vnSent: "Câu chủ đề cho người đọc biết cả đoạn văn nói về điều gì.",
      isReal: true
    },
    {
      word: "Support",
      vn: "Ý hỗ trợ",
      def: "The facts, examples or reasons that back up a main idea.",
      vnDef: "Các sự thật, ví dụ hoặc lý do củng cố ý chính.",
      sent: "Every topic sentence needs support: a reason, a fact or an example.",
      vnSent: "Mỗi câu chủ đề cần ý hỗ trợ: một lý do, một sự thật hoặc một ví dụ.",
      isReal: true
    },
    {
      word: "Conclusion",
      vn: "Kết luận",
      def: "The final part of a paragraph or essay that sums up the main idea.",
      vnDef: "Phần cuối của một đoạn văn hoặc bài luận tóm lại ý chính.",
      sent: "A good conclusion restates the position without adding new evidence.",
      vnSent: "Một kết luận tốt nhắc lại quan điểm mà không thêm bằng chứng mới.",
      isReal: true
    },
    {
      word: "Coherence",
      vn: "Sự mạch lạc",
      def: "The quality of a text whose ideas are clearly connected and easy to follow.",
      vnDef: "Tính chất của bài viết có các ý được liên kết rõ ràng và dễ theo dõi.",
      sent: "Transitions and a clear order give a paragraph coherence.",
      vnSent: "Từ chuyển tiếp và thứ tự rõ ràng tạo nên sự mạch lạc cho đoạn văn.",
      isReal: true
    },
    {
      word: "Formal",
      vn: "Trang trọng",
      def: "Serious and polite in style, without slang or chatty words.",
      vnDef: "Nghiêm túc và lịch sự trong văn phong, không dùng tiếng lóng hay từ suồng sã.",
      sent: "The essay must be formal: no slang, no jokes, no 'stuff'.",
      vnSent: "Bài luận phải trang trọng: không tiếng lóng, không đùa cợt, không dùng 'stuff'.",
      isReal: true
    },
    {
      word: "Precise",
      vn: "Chính xác",
      def: "Exact and specific, not general or vague.",
      vnDef: "Rõ ràng và cụ thể, không chung chung hay mơ hồ.",
      sent: "'Costs rose by 40 percent' is more precise than 'costs went up a lot'.",
      vnSent: "'Costs rose by 40 percent' chính xác hơn 'costs went up a lot'.",
      isReal: true
    },
    {
      word: "Vague",
      vn: "Mơ hồ",
      def: "Not clear or exact; leaving the reader unsure what is meant.",
      vnDef: "Không rõ ràng hay chính xác; khiến người đọc không chắc ý là gì.",
      sent: "Words like things, stuff, good and bad are vague, so replace them.",
      vnSent: "Những từ như things, stuff, good và bad là mơ hồ, nên hãy thay thế chúng.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Signposts for the Reader",
      vnTitle: "Biển chỉ đường cho người đọc",
      meta: "What transitions do",
      text: "A {transition} is a signpost. It tells the reader how the next idea connects to the one before it. Some transitions add an idea: in addition, also. Some show a {contrast}: however, in contrast, on the other hand. Some show cause and effect: therefore, as a result. Some introduce an example: for example, for instance. Some show a {sequence} in time: first, next, then, finally. And some signal the end: in conclusion. Choose the transition by the logic of the two ideas, never by the sound of the word.",
      vnText: "Từ chuyển tiếp là một biển chỉ đường. Nó cho người đọc biết ý tiếp theo liên kết với ý trước thế nào. Một số từ chuyển tiếp thêm ý: in addition, also. Một số thể hiện sự tương phản: however, in contrast, on the other hand. Một số thể hiện nguyên nhân và kết quả: therefore, as a result. Một số giới thiệu ví dụ: for example, for instance. Một số thể hiện trình tự thời gian: first, next, then, finally. Và một số báo hiệu kết thúc: in conclusion. Hãy chọn từ chuyển tiếp theo logic của hai ý, chứ không bao giờ theo âm thanh của từ."
    },
    {
      id: "passage_2",
      title: "Building a Paragraph",
      vnTitle: "Xây dựng một đoạn văn",
      meta: "Topic, support, conclusion",
      text: "A strong paragraph has one shape. It opens with a {topic} sentence that states the one idea the paragraph will explain. The middle sentences give {support}: reasons, facts and examples that prove the idea. The last sentence is a short {conclusion} that sums the idea up or links to the next paragraph. Every sentence must serve the topic sentence. A sentence about a different idea breaks the {coherence} of the paragraph, so cut it or move it to a paragraph of its own.",
      vnText: "Một đoạn văn tốt có một hình dạng. Nó mở đầu bằng câu chủ đề nêu một ý mà đoạn văn sẽ giải thích. Các câu giữa đưa ra ý hỗ trợ: lý do, sự thật và ví dụ chứng minh ý đó. Câu cuối là một kết luận ngắn tóm lại ý hoặc nối sang đoạn tiếp theo. Mọi câu đều phải phục vụ câu chủ đề. Một câu về ý khác sẽ phá vỡ sự mạch lạc của đoạn văn, nên hãy cắt nó đi hoặc chuyển sang một đoạn riêng."
    },
    {
      id: "passage_3",
      title: "Sounding Like a Writer",
      vnTitle: "Viết như một người viết thực thụ",
      meta: "Tone and word choice",
      text: "The essay is read by a stranger who will judge your tone. Keep it {formal}: no slang, no jokes, no 'you guys'. Choose {precise} words that say exactly what you mean. 'The plan has three costs' is stronger than 'the plan has some bad things'. Words such as things, stuff, good, bad, a lot and nice are {vague}; the reader cannot picture them. Replace each one with a number, a name or a specific noun, and the same idea will sound twice as convincing.",
      vnText: "Bài luận được đọc bởi một người lạ, người sẽ đánh giá giọng văn của bạn. Hãy giữ nó trang trọng: không tiếng lóng, không đùa cợt, không 'you guys'. Chọn từ chính xác nói đúng điều bạn muốn nói. 'The plan has three costs' mạnh hơn 'the plan has some bad things'. Những từ như things, stuff, good, bad, a lot và nice là mơ hồ; người đọc không hình dung được chúng. Hãy thay mỗi từ đó bằng một con số, một cái tên hoặc một danh từ cụ thể, và cùng một ý sẽ nghe thuyết phục gấp đôi."
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "Learning to Drive",
      titleVn: "Học lái xe",
      passage: "[[b1]], I learned to check the mirrors and the seat. [[b2]], I practised in an empty car park for two weeks. Driving on the main road was much harder. [[b3]], I stalled twice at the traffic lights on my first day. My instructor stayed calm, [[b4]], and by the third lesson I could change gear smoothly. [[b5]], I passed my test in June.",
      blanks: [
        {
          id: "b1",
          options: ["First", "Finally", "However"],
          correct: "First",
          expEn: "This is the opening step of a sequence in time, so \"First\" is the signpost.",
          expVn: "Đây là bước mở đầu của một trình tự thời gian, nên \"First\" là từ chỉ đường."
        },
        {
          id: "b2",
          options: ["Next", "In contrast", "As a result"],
          correct: "Next",
          expEn: "The car park practice is the step after the mirrors, so a sequence word is needed: \"Next\".",
          expVn: "Luyện tập ở bãi đỗ xe là bước sau khi học gương, nên cần từ chỉ trình tự: \"Next\"."
        },
        {
          id: "b3",
          options: ["For example", "In addition", "Therefore"],
          correct: "For example",
          expEn: "Stalling at the lights is an example of how the main road was harder, so \"For example\" fits.",
          expVn: "Chết máy ở đèn giao thông là ví dụ cho việc đường chính khó hơn, nên \"For example\" phù hợp."
        },
        {
          id: "b4",
          options: ["however", "therefore", "for example"],
          correct: "however",
          expEn: "The instructor staying calm is a contrast with the mistakes just described, so \"however\" is the logic.",
          expVn: "Người hướng dẫn giữ bình tĩnh tương phản với những lỗi vừa kể, nên \"however\" là đúng logic."
        },
        {
          id: "b5",
          options: ["Finally", "First", "In contrast"],
          correct: "Finally",
          expEn: "Passing the test is the last step in the story, so \"Finally\" closes the sequence.",
          expVn: "Đậu kỳ thi là bước cuối trong câu chuyện, nên \"Finally\" khép lại trình tự."
        }
      ]
    },
    {
      id: "ge2",
      title: "Why the Library Matters",
      titleVn: "Vì sao thư viện quan trọng",
      passage: "Our town library is more than a building full of books. [[b1]], it is a free classroom for people who cannot afford one. [[b2]], last year 300 adults took the library's free computer course. [[b3]], the library offers a warm, quiet place for students to study after school. Some people say that everything is online now. [[b4]], not every family has fast internet at home. [[b5]], closing the library would hurt the people who need it most.",
      blanks: [
        {
          id: "b1",
          options: ["First of all", "In contrast", "As a result"],
          correct: "First of all",
          expEn: "This is the first reason in the argument, so \"First of all\" introduces it.",
          expVn: "Đây là lý do đầu tiên trong lập luận, nên \"First of all\" giới thiệu nó."
        },
        {
          id: "b2",
          options: ["For example", "However", "Therefore"],
          correct: "For example",
          expEn: "The 300 adults on the computer course are an example of the free classroom, so \"For example\" is right.",
          expVn: "300 người lớn học khóa máy tính là ví dụ cho lớp học miễn phí, nên \"For example\" là đúng."
        },
        {
          id: "b3",
          options: ["In addition", "In contrast", "As a result"],
          correct: "In addition",
          expEn: "The quiet study space is a second reason added to the first, so \"In addition\" fits the logic.",
          expVn: "Không gian học yên tĩnh là lý do thứ hai thêm vào lý do đầu, nên \"In addition\" hợp logic."
        },
        {
          id: "b4",
          options: ["However", "Therefore", "For example"],
          correct: "However",
          expEn: "The writer disagrees with \"everything is online\", so a contrast word is needed: \"However\".",
          expVn: "Người viết không đồng ý với \"everything is online\", nên cần từ tương phản: \"However\"."
        },
        {
          id: "b5",
          options: ["Therefore", "In addition", "For example"],
          correct: "Therefore",
          expEn: "The final sentence is the result of all the reasons, so \"Therefore\" draws the conclusion.",
          expVn: "Câu cuối là kết quả của tất cả các lý do, nên \"Therefore\" rút ra kết luận."
        }
      ]
    },
    {
      id: "ge3",
      title: "Two Ways to Get to Work",
      titleVn: "Hai cách đi làm",
      passage: "Buses and bicycles both get you to work, but they suit different people. A bus is warm and dry. A bicycle, [[b1]], leaves you wet on a rainy morning. [[b2]], the bicycle wins on price: cycling is free, while a bus pass costs forty dollars a month. Cycling is also exercise. [[b3]], many cyclists say they feel healthier than before. Buses run on a timetable. [[b4]], you may wait twenty minutes if you miss one. [[b5]], the right choice depends on your budget, your health and your patience.",
      blanks: [
        {
          id: "b1",
          options: ["in contrast", "for example", "as a result"],
          correct: "in contrast",
          expEn: "Wet on a bicycle is the opposite of warm and dry on a bus, so \"in contrast\" shows the difference.",
          expVn: "Ướt trên xe đạp trái ngược với ấm và khô trên xe buýt, nên \"in contrast\" thể hiện sự khác biệt."
        },
        {
          id: "b2",
          options: ["However", "In addition", "As a result"],
          correct: "However",
          expEn: "After a point against the bicycle, the writer turns to a point for it. That change of direction needs \"However\".",
          expVn: "Sau một điểm bất lợi của xe đạp, người viết chuyển sang điểm có lợi. Sự đổi hướng này cần \"However\"."
        },
        {
          id: "b3",
          options: ["As a result", "In contrast", "For example"],
          correct: "As a result",
          expEn: "Feeling healthier is the effect of the exercise, so a cause-and-effect word is needed: \"As a result\".",
          expVn: "Cảm thấy khỏe hơn là kết quả của việc tập luyện, nên cần từ chỉ nguyên nhân–kết quả: \"As a result\"."
        },
        {
          id: "b4",
          options: ["Therefore", "However", "For example"],
          correct: "Therefore",
          expEn: "Waiting twenty minutes is the result of buses running on a timetable, so \"Therefore\" fits.",
          expVn: "Chờ hai mươi phút là kết quả của việc xe buýt chạy theo lịch, nên \"Therefore\" phù hợp."
        },
        {
          id: "b5",
          options: ["In conclusion", "First", "For example"],
          correct: "In conclusion",
          expEn: "The last sentence sums up the whole comparison, so \"In conclusion\" is the signpost.",
          expVn: "Câu cuối tóm lại toàn bộ phép so sánh, nên \"In conclusion\" là từ chỉ đường."
        }
      ]
    },
    {
      id: "ge4",
      title: "How to Make Vietnamese Coffee",
      titleVn: "Cách pha cà phê Việt Nam",
      passage: "[[b1]], put two spoons of ground coffee into the metal filter. [[b2]], press the coffee down gently with the filter's inner plate. [[b3]], pour a little hot water over the coffee and wait twenty seconds so it swells. [[b4]], fill the filter with hot water and let it drip slowly into the glass. [[b5]], add sweet milk or ice and enjoy.",
      blanks: [
        {
          id: "b1",
          options: ["First", "Finally", "After that"],
          correct: "First",
          expEn: "Putting the coffee in the filter is the opening step, so \"First\" starts the process.",
          expVn: "Cho cà phê vào phin là bước mở đầu, nên \"First\" bắt đầu quy trình."
        },
        {
          id: "b2",
          options: ["Next", "First", "Finally"],
          correct: "Next",
          expEn: "Pressing the coffee is the second step, so \"Next\" moves the reader forward.",
          expVn: "Nén cà phê là bước thứ hai, nên \"Next\" đưa người đọc tiến tới."
        },
        {
          id: "b3",
          options: ["Then", "First", "Finally"],
          correct: "Then",
          expEn: "A little water comes after pressing and before filling, so the middle-step word \"Then\" is right.",
          expVn: "Một ít nước đến sau khi nén và trước khi đổ đầy, nên từ chỉ bước giữa \"Then\" là đúng."
        },
        {
          id: "b4",
          options: ["After that", "First", "In conclusion"],
          correct: "After that",
          expEn: "Filling the filter follows the twenty-second wait, so \"After that\" keeps the time order.",
          expVn: "Đổ đầy phin diễn ra sau khi chờ hai mươi giây, nên \"After that\" giữ đúng thứ tự thời gian."
        },
        {
          id: "b5",
          options: ["Finally", "First", "Next"],
          correct: "Finally",
          expEn: "Adding milk or ice is the last step, so \"Finally\" closes the process.",
          expVn: "Thêm sữa hoặc đá là bước cuối, nên \"Finally\" khép lại quy trình."
        }
      ]
    }
  ],
  sequence: [
    {
      id: "sq1",
      title: "One body paragraph",
      titleVn: "Một đoạn thân bài",
      prompt: "Put the sentences of this paragraph in the best order. Start with the topic sentence and follow the signposts.",
      promptVn: "Sắp xếp các câu của đoạn văn này theo thứ tự tốt nhất. Bắt đầu bằng câu chủ đề và đi theo các từ chỉ đường.",
      items: [
        { text: "Learning English as an adult is hard, but it is possible.", textVn: "Học tiếng Anh khi đã trưởng thành là khó, nhưng vẫn có thể." },
        { text: "First, adults have far less free time than children.", textVn: "Thứ nhất, người lớn có ít thời gian rảnh hơn trẻ em rất nhiều." },
        { text: "In addition, they often feel embarrassed when they make mistakes in front of others.", textVn: "Thêm vào đó, họ thường thấy ngượng khi mắc lỗi trước mặt người khác." },
        { text: "However, adults have one big advantage: they know exactly why they are learning.", textVn: "Tuy nhiên, người lớn có một lợi thế lớn: họ biết chính xác vì sao mình học." },
        { text: "As a result, many adult learners make faster progress than they expect.", textVn: "Kết quả là, nhiều người học trưởng thành tiến bộ nhanh hơn họ nghĩ." }
      ],
      expEn: "The topic sentence states the idea (hard but possible). \"First\" and \"In addition\" list the two difficulties. \"However\" turns to the advantage, and \"As a result\" gives the outcome that closes the paragraph.",
      expVn: "Câu chủ đề nêu ý (khó nhưng có thể). \"First\" và \"In addition\" liệt kê hai khó khăn. \"However\" chuyển sang lợi thế, và \"As a result\" đưa ra kết quả khép lại đoạn văn."
    },
    {
      id: "sq2",
      title: "A story paragraph",
      titleVn: "Một đoạn kể chuyện",
      prompt: "Put the sentences of this paragraph in the best order. Follow the time words and the logic.",
      promptVn: "Sắp xếp các câu của đoạn văn này theo thứ tự tốt nhất. Đi theo các từ chỉ thời gian và logic.",
      items: [
        { text: "Last winter the lift in our building broke down.", textVn: "Mùa đông năm ngoái thang máy trong tòa nhà chúng tôi bị hỏng." },
        { text: "At first, the residents thought it would be fixed within a day.", textVn: "Lúc đầu, cư dân nghĩ nó sẽ được sửa trong vòng một ngày." },
        { text: "However, two weeks passed and nothing happened.", textVn: "Tuy nhiên, hai tuần trôi qua mà không có gì xảy ra." },
        { text: "Therefore, we wrote a letter to the landlord together, signed by every flat.", textVn: "Vì vậy, chúng tôi cùng viết một lá thư gửi chủ nhà, có chữ ký của mọi căn hộ." },
        { text: "Finally, an engineer arrived, and the lift was working again by Friday.", textVn: "Cuối cùng, một kỹ sư đến, và thang máy hoạt động trở lại vào thứ Sáu." },
        { text: "In the end, the problem taught us that one letter from everyone is stronger than ten complaints from one person.", textVn: "Rốt cuộc, sự cố dạy chúng tôi rằng một lá thư của mọi người mạnh hơn mười lời phàn nàn của một người." }
      ],
      expEn: "\"Last winter\" sets the scene. \"At first\" gives the early hope, \"However\" the disappointment, \"Therefore\" the action taken, \"Finally\" the result, and \"In the end\" the lesson that concludes the story.",
      expVn: "\"Last winter\" mở bối cảnh. \"At first\" nêu hy vọng ban đầu, \"However\" nêu sự thất vọng, \"Therefore\" nêu hành động, \"Finally\" nêu kết quả, và \"In the end\" nêu bài học kết thúc câu chuyện."
    },
    {
      id: "sq3",
      title: "A five-paragraph argument",
      titleVn: "Một bài lập luận năm đoạn",
      prompt: "Put the five paragraphs of this short argument in order: introduction, three reasons with the strongest last, then the conclusion.",
      promptVn: "Sắp xếp năm đoạn của bài lập luận ngắn này: mở bài, ba lý do với lý do mạnh nhất ở cuối, rồi kết luận.",
      items: [
        { text: "Should our city make its buses free? I believe it should, for three reasons.", textVn: "Thành phố của chúng ta có nên miễn phí xe buýt không? Tôi tin là nên, vì ba lý do." },
        { text: "First, free buses would help low-paid workers, who currently spend up to a tenth of their wages on fares.", textVn: "Thứ nhất, xe buýt miễn phí sẽ giúp người lao động lương thấp, những người hiện chi tới một phần mười tiền lương cho vé xe." },
        { text: "Second, free buses would reduce traffic, because more drivers would leave their cars at home.", textVn: "Thứ hai, xe buýt miễn phí sẽ giảm tắc đường, vì nhiều tài xế hơn sẽ để xe ở nhà." },
        { text: "Most importantly, fewer cars would mean cleaner air, which protects every child in the city.", textVn: "Quan trọng nhất, ít xe hơn nghĩa là không khí sạch hơn, điều bảo vệ mọi trẻ em trong thành phố." },
        { text: "In conclusion, free buses would help workers, ease traffic and clean the air, so the city should introduce them now.", textVn: "Tóm lại, xe buýt miễn phí sẽ giúp người lao động, giảm tắc đường và làm sạch không khí, nên thành phố nên áp dụng ngay." }
      ],
      expEn: "The question and the position open the essay. \"First\" and \"Second\" give the reasons, \"Most importantly\" marks the strongest reason and comes last, and \"In conclusion\" restates all three.",
      expVn: "Câu hỏi và quan điểm mở đầu bài luận. \"First\" và \"Second\" đưa ra lý do, \"Most importantly\" đánh dấu lý do mạnh nhất và đứng cuối, và \"In conclusion\" nhắc lại cả ba."
    },
    {
      id: "sq4",
      title: "Steps of a process",
      titleVn: "Các bước của một quy trình",
      prompt: "Put the steps for renewing a passport in the order they must be done.",
      promptVn: "Sắp xếp các bước gia hạn hộ chiếu theo thứ tự phải thực hiện.",
      items: [
        { text: "First, download the application form from the government website.", textVn: "Đầu tiên, tải mẫu đơn từ trang web của chính phủ." },
        { text: "Next, fill in every section and sign the last page.", textVn: "Tiếp theo, điền đầy đủ mọi mục và ký vào trang cuối." },
        { text: "After that, take two new photos that meet the size rules.", textVn: "Sau đó, chụp hai ảnh mới đúng quy định về kích thước." },
        { text: "Then post the signed form, the photos and the fee to the passport office.", textVn: "Rồi gửi mẫu đơn đã ký, ảnh và lệ phí tới văn phòng hộ chiếu." },
        { text: "Finally, wait for the new passport to arrive, which usually takes three weeks.", textVn: "Cuối cùng, chờ hộ chiếu mới được gửi đến, thường mất ba tuần." }
      ],
      expEn: "\"First\" and \"Finally\" fix the two ends. The logic fixes the middle: you must fill in the form before you can post the signed form, and the photos must exist before they are posted with it.",
      expVn: "\"First\" và \"Finally\" cố định hai đầu. Logic cố định phần giữa: bạn phải điền đơn trước khi gửi đơn đã ký, và ảnh phải có trước khi được gửi cùng đơn."
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "Write a topic sentence for this paragraph: \"______. First, it saves money, because a home-cooked meal costs less than half the price of a takeaway. In addition, you control the salt and the oil, so the food is healthier. Finally, cooking together gives a family time to talk.\"",
      suggestedWords: [["benefits", "advantages"], ["cooking at home", "home cooking"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for stating the main idea that the paragraph proves: cooking at home is better / has several benefits.",
        "1 mark for a sentence that covers ALL the reasons in general terms, not just one detail (not only money, or only health).",
        "1 mark for one complete, formal sentence with no vague words such as things, stuff, good or nice."
      ],
      modelAnswer: "Cooking at home has three clear benefits for a family.",
      vnTranslation: "Viết câu chủ đề cho đoạn văn này: \"______. Thứ nhất, nó tiết kiệm tiền, vì một bữa ăn nấu tại nhà rẻ hơn một nửa giá đồ ăn mua ngoài. Thêm vào đó, bạn kiểm soát được muối và dầu, nên đồ ăn lành mạnh hơn. Cuối cùng, nấu ăn cùng nhau cho gia đình thời gian trò chuyện.\""
    },
    {
      id: "q2",
      question: "Rewrite these three choppy sentences as one connected paragraph, using two different transition words: \"The factory closed last year. Many people in the town lost their jobs. The town council opened a free training centre.\"",
      suggestedWords: [["as a result", "therefore"], ["in response", "however"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for a cause-and-effect transition (as a result / therefore / consequently) linking the closure to the job losses.",
        "1 mark for a second, different transition (in response / therefore / however / then) introducing the council's action.",
        "1 mark for correct punctuation with each transition: a comma after a sentence-opening transition, or a full stop or semicolon before it.",
        "1 mark for keeping all three facts and the order of events (closure → job losses → training centre)."
      ],
      modelAnswer: "The factory closed last year. As a result, many people in the town lost their jobs. In response, the town council opened a free training centre.",
      vnTranslation: "Viết lại ba câu rời rạc này thành một đoạn văn liên kết, dùng hai từ chuyển tiếp khác nhau: \"The factory closed last year. Many people in the town lost their jobs. The town council opened a free training centre.\""
    },
    {
      id: "q3",
      question: "An essay argues that high schools should start at 9 a.m. Its three reasons are: teenagers sleep better, fewer students arrive late, and test results improve. Write a three-sentence conclusion for this essay.",
      suggestedWords: [["in conclusion", "to sum up"], ["sleep", "late", "results"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for opening with a concluding transition (In conclusion / To sum up / Overall).",
        "1 mark for restating the position clearly: schools should start at 9 a.m.",
        "1 mark for summarising all three reasons in one or two sentences without adding new evidence.",
        "1 mark for a final sentence that gives a closing thought or a call to action (e.g. what schools should do now)."
      ],
      modelAnswer: "In conclusion, high schools should move their start time to 9 a.m. A later start lets teenagers sleep properly, cuts the number of late arrivals, and lifts test results. School boards that want healthier and more successful students should make this change next year.",
      vnTranslation: "Một bài luận lập luận rằng trường trung học nên bắt đầu lúc 9 giờ sáng. Ba lý do là: thanh thiếu niên ngủ tốt hơn, ít học sinh đến muộn hơn, và kết quả thi cải thiện. Viết một kết luận ba câu cho bài luận này."
    }
  ],
  assessment,
  notes
};
