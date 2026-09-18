// src/data/GED_ENG/ENG_11/data.js
// Lesson 11 of the GED RLA blueprint — the Extended Response at test length.
// ENG_10 teaches the essay as a formula against short practice pairs; this
// unit puts the formula against sources built like the real stimulus: two
// different kinds of writing, 550–650 words between them, a byline on each,
// and evidence on BOTH sides, so the essay has to weigh rather than spot.
// Shape: Notes + Vocab (Learn) · the argument-evaluation quiz + four
// paragraph-writing assignments (Drill) · the test-length essay bank + Find &
// Fix (Prove).
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { essays } from './essays.js';

export const ENGLISH_11_DATA = {
  meta: {
    id: "ENG_11",
    title: "The Full-Length Extended Response",
    desc: "Write the essay against sources as long as the real ones: two kinds of writing with named authors, both using some evidence. Judge who is speaking, name the reasoning moves, and weigh two sides that both have numbers.",
    track: "GED_ENG",
    icon: "PenTool"
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
      // The quiz sits in Drill on purpose: spotting the reasoning moves in a
      // paired stimulus is the practice for the essay, not the test of it.
      tasks: [
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      // 45 of the 60 XP before it (75%) — inside the 80% rule.
      threshold: 45,
      tasks: [
        { id: "ESSAY", dbKey: "p8", maxXP: 30 },
        { id: "PROOFREAD", dbKey: "p33", maxXP: 10 }
      ]
    }
  ],
  realWords: [
    {
      word: "Credible",
      vn: "Đáng tin cậy",
      def: "Able to be believed and trusted.",
      vnDef: "Có thể tin và tin cậy được.",
      sent: "A study by a university researcher is more credible than a rumor.",
      vnSent: "Một nghiên cứu của nhà nghiên cứu đại học đáng tin cậy hơn một tin đồn.",
      isReal: true
    },
    {
      word: "Byline",
      vn: "Dòng tác giả",
      def: "The line under a title that says who wrote the text.",
      vnDef: "Dòng dưới tiêu đề cho biết ai đã viết văn bản.",
      sent: "The byline shows that the press release came from the drink sellers.",
      vnSent: "Dòng tác giả cho thấy thông cáo báo chí đến từ những người bán đồ uống.",
      isReal: true
    },
    {
      word: "Bias",
      vn: "Thiên vị",
      def: "A leaning toward one side that can make a writer unfair.",
      vnDef: "Sự nghiêng về một phía có thể khiến người viết thiếu công bằng.",
      sent: "The study was paid for by the team, so it may show bias.",
      vnSent: "Nghiên cứu do đội bóng trả tiền, nên nó có thể thiên vị.",
      isReal: true
    },
    {
      word: "Stake",
      vn: "Quyền lợi liên quan",
      def: "Something a person will gain or lose depending on the result.",
      vnDef: "Điều mà một người sẽ được hoặc mất tùy theo kết quả.",
      sent: "The landscapers have a stake in the vote, because the ban would cost them money.",
      vnSent: "Những người làm vườn có quyền lợi trong cuộc bỏ phiếu, vì lệnh cấm sẽ khiến họ tốn tiền.",
      isReal: true
    },
    {
      word: "Anecdote",
      vn: "Câu chuyện cá nhân",
      def: "A short story about one person or one event.",
      vnDef: "Một câu chuyện ngắn về một người hoặc một sự việc.",
      sent: "The coach's anecdote about his own childhood proves nothing about other children.",
      vnSent: "Câu chuyện của huấn luyện viên về thời thơ ấu của ông không chứng minh được gì về những đứa trẻ khác.",
      isReal: true
    },
    {
      word: "Statistic",
      vn: "Số liệu thống kê",
      def: "A number that comes from counting or measuring many cases.",
      vnDef: "Một con số có được từ việc đếm hoặc đo nhiều trường hợp.",
      sent: "The statistic comes from checkout data in 150 stores.",
      vnSent: "Số liệu thống kê này đến từ dữ liệu thanh toán ở 150 cửa hàng.",
      isReal: true
    },
    {
      word: "Projection",
      vn: "Dự báo",
      def: "An estimate of what will happen in the future.",
      vnDef: "Một ước tính về điều sẽ xảy ra trong tương lai.",
      sent: "The 3,000 new jobs are a projection, not a count of jobs that exist.",
      vnSent: "3.000 việc làm mới là một dự báo, không phải số việc làm đang có thật.",
      isReal: true
    },
    {
      word: "Correlation",
      vn: "Mối tương quan",
      def: "Two things that happen together, which does not prove that one causes the other.",
      vnDef: "Hai điều xảy ra cùng nhau, điều này không chứng minh cái này gây ra cái kia.",
      sent: "A correlation between screen time and sadness does not prove that screens cause sadness.",
      vnSent: "Mối tương quan giữa thời gian dùng màn hình và nỗi buồn không chứng minh màn hình gây ra nỗi buồn.",
      isReal: true
    },
    {
      word: "Assumption",
      vn: "Giả định",
      def: "Something a writer treats as true without proving it.",
      vnDef: "Điều người viết coi là đúng mà không chứng minh.",
      sent: "The letter rests on the assumption that shoppers will leave the diners for the trucks.",
      vnSent: "Lá thư dựa trên giả định rằng khách hàng sẽ bỏ các quán ăn để sang xe bán đồ ăn.",
      isReal: true
    },
    {
      word: "Generalization",
      vn: "Sự khái quát hóa",
      def: "A statement about a whole group, based on only a few examples.",
      vnDef: "Một nhận định về cả một nhóm, dựa trên chỉ vài ví dụ.",
      sent: "\"Every coach I know agrees\" is a generalization from a small circle of friends.",
      vnSent: "\"Mọi huấn luyện viên tôi biết đều đồng ý\" là một sự khái quát hóa từ một nhóm bạn nhỏ.",
      isReal: true
    }
  ],
  // Paragraph-sized writing assignments, one GED move each: judging a
  // writer's credibility, naming two reasoning problems, weighing two sets of
  // numbers, and the concede-and-rebut paragraph. Each stimulus carries its
  // bylines, as the test's do.
  shortQA: [
    {
      id: "q1",
      question: "ISSUE: Should the city put speed cameras near every school?\n\nSOURCE 1 — Press release from ClearView Traffic Systems, the company that would be paid to install and run the cameras: \"Cities that use our cameras see crashes near schools fall by up to 60 percent. Every day without cameras puts children in danger. Parents deserve peace of mind.\"\n\nSOURCE 2 — Op-ed by Dr. Nadia Brooks, traffic engineer at Rowan State University: \"In Kent, police records show crashes near schools fell 18 percent in the two years after cameras went in — but they also fell 15 percent in the next town, which had no cameras. In a study of 60 school zones, lower speed limits and raised crosswalks cut crashes by 35 percent.\"\n\nTASK: Write ONE paragraph that judges how CREDIBLE each source is. Use each byline AND the kind of evidence each one gives.",
      vnTranslation: "VẤN ĐỀ: Thành phố có nên đặt camera tốc độ gần mọi trường học?\n\nNGUỒN 1 — Thông cáo báo chí của ClearView Traffic Systems, công ty sẽ được trả tiền để lắp đặt và vận hành camera: \"Các thành phố dùng camera của chúng tôi thấy tai nạn gần trường học giảm tới 60 phần trăm. Mỗi ngày không có camera là đặt trẻ em vào nguy hiểm. Phụ huynh xứng đáng được yên tâm.\"\n\nNGUỒN 2 — Bài xã luận của Tiến sĩ Nadia Brooks, kỹ sư giao thông tại Đại học Rowan State: \"Ở Kent, hồ sơ cảnh sát cho thấy tai nạn gần trường giảm 18 phần trăm trong hai năm sau khi lắp camera — nhưng chúng cũng giảm 15 phần trăm ở thị trấn bên cạnh, nơi không có camera. Trong một nghiên cứu 60 khu vực trường học, giới hạn tốc độ thấp hơn và vạch qua đường nâng cao đã giảm tai nạn 35 phần trăm.\"\n\nNHIỆM VỤ: Viết MỘT đoạn văn đánh giá mỗi nguồn ĐÁNG TIN đến mức nào. Dùng dòng tác giả CỦA MỖI NGUỒN VÀ loại bằng chứng mà mỗi nguồn đưa ra.",
      suggestedWords: [["credible", "trust"], ["stake", "paid", "company"], ["records", "study"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for identifying that Source 1 comes from the company that would be paid for the cameras, so it has a stake / may be biased.",
        "1 mark for identifying Source 2's author as an engineer or researcher with no stated stake, OR that her figures come from police records and a study.",
        "1 mark for naming a specific weakness in Source 1's evidence (\"up to 60 percent\" is a best case with no named city or study, OR \"puts children in danger\" is an appeal to fear, not evidence).",
        "1 mark for a clear judgement that links credibility to how far each source can be trusted (e.g. Source 2 is more credible because its numbers can be checked and its author gains nothing)."
      ],
      modelAnswer: "Source 2 is far more credible than Source 1. Source 1 is a press release from ClearView Traffic Systems, the company that would be paid to install the cameras, so it has a stake in the decision. That does not make it wrong, but it means its claims need strong proof, and it gives none: \"up to 60 percent\" is a best case that names no city and no study, and \"every day without cameras puts children in danger\" appeals to fear rather than showing anything. Source 2 is written by a traffic engineer who gains nothing from the vote, and her figures come from police records and a study of 60 school zones. She even compares Kent with a town that had no cameras, which is a fairer test. Because her evidence can be checked, Source 2 is the source a careful reader should trust."
    },
    {
      id: "q2",
      question: "ISSUE: Should the town close its public swimming pool to save money?\n\nSOURCE — Letter to the editor from Gary Lund, a resident of Maple Falls: \"The town should close the Elm Street pool. My neighbor's son slipped on the wet deck last summer and broke his wrist, which proves the pool is dangerous. Everyone I know agrees that it is a waste of money. And if we keep pouring money into this pool, next the town will want to build a water park, and our taxes will double.\"\n\nTASK: Write ONE paragraph that names TWO reasoning problems in this letter and explains why each one weakens the argument.",
      vnTranslation: "VẤN ĐỀ: Thị trấn có nên đóng cửa hồ bơi công cộng để tiết kiệm tiền?\n\nNGUỒN — Thư gửi tòa soạn của Gary Lund, một cư dân Maple Falls: \"Thị trấn nên đóng cửa hồ bơi Elm Street. Con trai hàng xóm của tôi trượt chân trên sàn ướt mùa hè năm ngoái và bị gãy cổ tay, điều đó chứng minh hồ bơi nguy hiểm. Mọi người tôi biết đều đồng ý rằng nó lãng phí tiền. Và nếu chúng ta cứ tiếp tục đổ tiền vào hồ bơi này, tiếp theo thị trấn sẽ muốn xây công viên nước, và thuế của chúng ta sẽ tăng gấp đôi.\"\n\nNHIỆM VỤ: Viết MỘT đoạn văn nêu tên HAI vấn đề lập luận trong lá thư này và giải thích vì sao mỗi vấn đề làm yếu lập luận.",
      suggestedWords: [["one example", "anecdote"], ["everyone", "agreement"], ["prediction", "no evidence"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for naming the first problem: one injury (the neighbor's son) is used as proof that the whole pool is dangerous (an anecdote / one story as proof / a hasty generalization).",
        "1 mark for explaining why it is weak: one accident cannot show how safe the pool is for most swimmers; no injury numbers are given.",
        "1 mark for naming a second problem: \"everyone I know agrees\" (bandwagon / the writer's own circle) OR the water-park-and-double-taxes chain (a slippery slope / prediction without evidence).",
        "1 mark for explaining why the second problem is weak: the writer's friends are not a fair sample and agreement is not evidence, OR nothing shows that keeping the pool would lead to a water park or doubled taxes."
      ],
      modelAnswer: "The letter has two serious reasoning problems. First, the writer uses one story as proof: a neighbor's son broke his wrist, so the pool must be dangerous. One accident cannot show how safe the pool is for the hundreds of people who swim there, and the writer gives no injury numbers at all. Second, the writer claims that keeping the pool will lead to a water park and then to taxes doubling. This is a chain of predictions with no evidence behind any step, and it is meant to make readers afraid rather than to inform them. Because the letter rests on one story and a frightening guess, it does not prove that the pool should close."
    },
    {
      id: "q3",
      question: "ISSUE: Should the city replace its diesel buses with electric buses?\n\nSOURCE 1 — Report from the city Transit Office: \"In a one-year trial on the same routes, our 10 electric buses cost an average of $0.52 per mile to fuel and repair, compared with $1.10 per mile for 10 diesel buses. Over a bus's 12-year life, that saves about $280,000 per bus.\"\n\nSOURCE 2 — Op-ed by city council member Doug Patel: \"An electric bus costs $750,000; a diesel bus costs $500,000. Our finance office estimates that switching all 80 buses would cost $20 million more up front, money we do not have this year. And in the winter, one bus in the trial ran out of charge before the end of its route.\"\n\nTASK: Both sources use numbers. Write ONE paragraph that weighs the two sets of numbers and decides which side's figures better support its position. Explain why.",
      vnTranslation: "VẤN ĐỀ: Thành phố có nên thay xe buýt chạy dầu diesel bằng xe buýt điện?\n\nNGUỒN 1 — Báo cáo của Văn phòng Giao thông thành phố: \"Trong một thử nghiệm một năm trên cùng các tuyến, 10 xe buýt điện của chúng tôi tốn trung bình 0,52 đô la mỗi dặm cho nhiên liệu và sửa chữa, so với 1,10 đô la mỗi dặm của 10 xe buýt diesel. Trong suốt 12 năm hoạt động của một xe buýt, điều đó tiết kiệm khoảng 280.000 đô la mỗi xe.\"\n\nNGUỒN 2 — Bài xã luận của ủy viên hội đồng thành phố Doug Patel: \"Một xe buýt điện giá 750.000 đô la; một xe buýt diesel giá 500.000 đô la. Văn phòng tài chính của chúng ta ước tính việc chuyển đổi toàn bộ 80 xe buýt sẽ tốn thêm 20 triệu đô la ban đầu, số tiền chúng ta không có trong năm nay. Và vào mùa đông, một xe buýt trong thử nghiệm đã hết điện trước khi chạy hết tuyến.\"\n\nNHIỆM VỤ: Cả hai nguồn đều dùng con số. Viết MỘT đoạn văn cân nhắc hai bộ số liệu và quyết định số liệu của phía nào hỗ trợ lập trường của nó tốt hơn. Giải thích vì sao.",
      suggestedWords: [["per mile", "trial", "measured"], ["up front", "estimate"], ["saving", "cost"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for citing a specific figure from Source 1 (the $0.52 vs $1.10 per mile, or the $280,000 saved per bus) and noting that it was measured in a trial.",
        "1 mark for citing a specific figure from Source 2 (the $250,000 extra per bus, the $20 million up front, or the one bus that ran out of charge).",
        "1 mark for actually weighing the figures against each other (e.g. the extra $250,000 per bus is smaller than the $280,000 it saves over its life; OR the winter failure is one bus, not a measured rate; OR Source 1's trial was small — 10 buses for one year).",
        "1 mark for a clear judgement about which side's figures are stronger, with a reason (e.g. Source 1, because its savings are measured and outweigh the extra price, although Source 2 is right that the money is needed up front)."
      ],
      modelAnswer: "Both sources give real numbers, but Source 1's figures support its position better. The Transit Office measured costs in a one-year trial on the same routes: electric buses cost $0.52 a mile against $1.10 for diesel, which adds up to about $280,000 per bus over twelve years. Source 2 is right that an electric bus costs $250,000 more to buy, and that the city would need $20 million up front. However, that extra price is smaller than the $280,000 each bus saves, so over its life an electric bus pays for itself. Source 2's winter example is only one bus on one route, not a measured failure rate. Source 1's trial was small, with only ten buses, but its numbers answer Source 2's main cost point, while Source 2's numbers do not answer the savings."
    },
    {
      id: "q4",
      question: "ISSUE: Should the state require every high school student to pass a personal finance class to graduate?\n\nSOURCE 1 — Op-ed by Maria Chen, economics teacher at Westfield High School: \"After our state required a semester of personal finance in 2018, a university study of 40,000 young adults found that those who took the class were 20 percent less likely to have an unpaid credit card bill at age 22 than students who graduated before the rule.\"\n\nSOURCE 2 — Speech by school board member Tom Hale: \"Our students' schedules are already full. A required class means students lose an elective such as art or music. And parents, not schools, should be the ones who teach children about money.\"\n\nTASK: Write the CONCEDE-AND-REBUT paragraph (Body 3) for an essay arguing that Source 1 is better supported. Admit Source 2's fairest point, then explain why it does not change your judgement.",
      vnTranslation: "VẤN ĐỀ: Bang có nên yêu cầu mọi học sinh trung học phải đậu một lớp tài chính cá nhân để tốt nghiệp?\n\nNGUỒN 1 — Bài xã luận của Maria Chen, giáo viên kinh tế tại trường Westfield High: \"Sau khi bang chúng ta bắt buộc một học kỳ tài chính cá nhân vào năm 2018, một nghiên cứu đại học trên 40.000 thanh niên cho thấy những người đã học lớp này ít có khả năng có hóa đơn thẻ tín dụng chưa trả ở tuổi 22 hơn 20 phần trăm so với học sinh tốt nghiệp trước khi có quy định.\"\n\nNGUỒN 2 — Bài phát biểu của thành viên hội đồng trường Tom Hale: \"Thời khóa biểu của học sinh đã kín. Một lớp bắt buộc có nghĩa là học sinh mất một môn tự chọn như mỹ thuật hoặc âm nhạc. Và cha mẹ, chứ không phải nhà trường, mới là người nên dạy con cái về tiền bạc.\"\n\nNHIỆM VỤ: Viết đoạn THỪA NHẬN VÀ BÁC BỎ (Thân bài 3) cho một bài luận lập luận rằng Nguồn 1 được chứng minh tốt hơn. Thừa nhận điểm hợp lý nhất của Nguồn 2, rồi giải thích vì sao nó không thay đổi phán đoán của bạn.",
      suggestedWords: [["It is true that", "Although"], ["Even so", "However"], ["study", "40,000"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for opening with a concession frame (It is true that / Although / Admittedly) that names a fair point from Source 2 (full schedules / losing an elective such as art or music).",
        "1 mark for briefly explaining why that point is fair (e.g. the school day has limited time; electives matter to students).",
        "1 mark for rebutting with specific evidence from Source 1 (the study of 40,000 young adults / 20 percent less likely to have an unpaid credit card bill).",
        "1 mark for explaining why the rebuttal outweighs the concession (e.g. a measured benefit versus a cost with no evidence of harm, OR \"parents should teach it\" is an opinion with no evidence that parents do)."
      ],
      modelAnswer: "It is true that Source 2 makes a fair point about time. The school day is limited, and a required finance class could push out an elective such as art or music that students value. Even so, this does not change my judgement. Source 1 reports a university study of 40,000 young adults, which found that students who took the class were 20 percent less likely to have an unpaid credit card bill at age 22. That is a measured benefit that lasts for years, while Source 2 offers no evidence that losing one elective harms students. Source 2 also says parents should teach money skills, but it gives no evidence that most parents do. A measured benefit outweighs a cost that is only described."
    }
  ],
  proofread: [
    {
      id: "pf1",
      title: "Body 2 — the stadium press release",
      titleVn: "Thân bài 2 — thông cáo về sân vận động",
      passage: "In contrast, the press release from the mayor and the team rely on predictions. The study that promise 3,000 jobs was paid for by the Mariners, so it is not a neutral source. However the release never says how many of those jobs are only for construction. It also use a story from one restaurant owner, one family's memory cannot show what will happen to a whole city. Finally, the release warns that the team could move to another city. This is a threat, not evidence, and it's purpose is to make readers afraid.",
      errors: [
        {
          id: "e1",
          wrong: "team rely on predictions",
          right: "team relies on predictions",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "The subject is \"the press release\" — one thing. \"From the mayor and the team\" only describes it, so the verb must be singular: \"relies\".",
          expVn: "Chủ ngữ là \"the press release\" — một vật. \"From the mayor and the team\" chỉ mô tả nó, nên động từ phải ở số ít: \"relies\"."
        },
        {
          id: "e2",
          wrong: "study that promise",
          right: "study that promises",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"That\" refers to \"the study\" (one study), so the verb needs -s: \"promises\".",
          expVn: "\"That\" chỉ \"the study\" (một nghiên cứu), nên động từ cần -s: \"promises\"."
        },
        {
          id: "e3",
          wrong: "However the release",
          right: "However, the release",
          accept: [],
          kind: "Comma after transition",
          expEn: "A transition such as \"However\" at the start of a sentence is followed by a comma.",
          expVn: "Một từ nối như \"However\" ở đầu câu phải có dấu phẩy theo sau."
        },
        {
          id: "e4",
          wrong: "also use a story",
          right: "also uses a story",
          accept: [],
          kind: "Verb + s",
          expEn: "\"It\" (the release) is singular, so the present-tense verb takes -s: \"uses\".",
          expVn: "\"It\" (thông cáo) là số ít, nên động từ thì hiện tại thêm -s: \"uses\"."
        },
        {
          id: "e5",
          wrong: "owner, one family's memory",
          right: "owner. One family's memory",
          accept: ["owner; one family's memory"],
          kind: "Comma splice",
          expEn: "Two complete sentences are joined by a comma alone. End the first with a period and start the second with a capital letter.",
          expVn: "Hai câu hoàn chỉnh bị nối chỉ bằng dấu phẩy. Kết thúc câu đầu bằng dấu chấm và bắt đầu câu sau bằng chữ hoa."
        },
        {
          id: "e6",
          wrong: "it's purpose",
          right: "its purpose",
          accept: [],
          kind: "Its vs it's",
          expEn: "\"It's\" means \"it is\". The purpose belongs to the threat, so use the possessive \"its\", with no apostrophe.",
          expVn: "\"It's\" nghĩa là \"it is\". Mục đích thuộc về lời đe dọa, nên dùng sở hữu \"its\", không có dấu nháy."
        }
      ]
    },
    {
      id: "pf2",
      title: "Body 3 — concede and rebut",
      titleVn: "Thân bài 3 — thừa nhận và bác bỏ",
      passage: "It is true that the press release make a fair point about poorer families. A tax on a case of soda is the same for every family, so it takes a bigger share of small income. Even so, this point do not change my judgment. According to Dr. Moreno, lower-income households cut there purchases by 38 percent, so they paid less tax than critics expected. The tax also paid for 600 preschool place, and most of them went to poorer neighborhoods. Because the op-ed answers the fairness problem with measured data, i still think it is better supported.",
      errors: [
        {
          id: "e1",
          wrong: "press release make a",
          right: "press release makes a",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The press release\" is one thing, so the verb needs -s: \"makes\".",
          expVn: "\"The press release\" là một vật, nên động từ cần -s: \"makes\"."
        },
        {
          id: "e2",
          wrong: "share of small income",
          right: "share of a small income",
          accept: [],
          kind: "Article",
          expEn: "\"Income\" here means one family's income, a single countable thing, so it needs an article: \"a small income\".",
          expVn: "\"Income\" ở đây là thu nhập của một gia đình, một thứ đếm được, nên cần mạo từ: \"a small income\"."
        },
        {
          id: "e3",
          wrong: "point do not change",
          right: "point does not change",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"This point\" is singular, so use \"does not\", not \"do not\".",
          expVn: "\"This point\" là số ít, nên dùng \"does not\", không phải \"do not\"."
        },
        {
          id: "e4",
          wrong: "cut there purchases",
          right: "cut their purchases",
          accept: [],
          kind: "Their / there",
          expEn: "The purchases belong to the households, so use the possessive \"their\". \"There\" means a place.",
          expVn: "Việc mua hàng thuộc về các hộ gia đình, nên dùng sở hữu \"their\". \"There\" chỉ nơi chốn."
        },
        {
          id: "e5",
          wrong: "600 preschool place",
          right: "600 preschool places",
          accept: [],
          kind: "Plural",
          expEn: "After a number greater than one, the noun is plural: \"600 preschool places\".",
          expVn: "Sau một con số lớn hơn một, danh từ ở số nhiều: \"600 preschool places\"."
        },
        {
          id: "e6",
          wrong: "i still think",
          right: "I still think",
          accept: [],
          kind: "Capital I",
          expEn: "The pronoun \"I\" is always a capital letter, wherever it sits in the sentence.",
          expVn: "Đại từ \"I\" luôn viết hoa, dù nó nằm ở đâu trong câu."
        }
      ]
    }
  ],
  essay: essays,
  notes,
  assessment
};
