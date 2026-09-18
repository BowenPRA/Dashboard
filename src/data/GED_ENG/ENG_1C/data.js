// src/data/GED_ENG/ENG_1C/data.js
// Lesson 9 of the 10-lesson GED RLA blueprint: Claims, Evidence & Evaluating
// Arguments. Mined out of the old ENG_1A/1B "foundations" material so the reading
// strand has one contained unit for the argument-evaluation skills the Extended
// Response depends on. Reading lesson shape: Notes + Vocab + Reading + Short
// Answers + Diagrams + Essay + Assessment.
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { DIAGRAMS } from './diagrams.js';
import { games } from './games.js';

export const ENGLISH_1C_DATA = {
  meta: {
    id: "ENG_1C",
    title: "GED Reading 3: Claims, Evidence & Arguments",
    desc: "Find a writer's claim, test how strong the evidence behind it is, tell fact from opinion, and judge which of two opposing sources is better supported.",
    track: "GED_ENG",
    icon: "GraduationCap"
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
      // PROOFREAD (p33) added to Drill: the unit over-provisions to 110 XP (the
      // unit still caps at 100), giving the student slack; thresholds unchanged.
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 15 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "PROOFREAD", dbKey: "p33", maxXP: 10 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 35,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 15 },
        { id: "ESSAY", dbKey: "p8", maxXP: 15 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 }
      ]
    },
    {
      id: "arcade",
      title: "Arcade",
      threshold: 70,
      tasks: [
        { id: "GAMES", dbKey: "p12", maxXP: 0 }
      ]
    }
  ],
  realWords: [
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The main point a writer wants you to accept.",
      vnDef: "Điểm chính mà người viết muốn bạn chấp nhận.",
      sent: "The writer's claim is that the town needs a new library.",
      vnSent: "Luận điểm của người viết là thị trấn cần một thư viện mới.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "The facts, numbers or examples used to prove a claim.",
      vnDef: "Các sự thật, con số hoặc ví dụ dùng để chứng minh một luận điểm.",
      sent: "A strong claim always comes with evidence a reader can check.",
      vnSent: "Một luận điểm mạnh luôn đi kèm với bằng chứng mà người đọc có thể kiểm tra.",
      isReal: true
    },
    {
      word: "Fact",
      vn: "Sự thật",
      def: "A statement that can be proven true or false.",
      vnDef: "Một tuyên bố có thể được chứng minh là đúng hoặc sai.",
      sent: "It is a fact that the bus fare rose to two dollars in June.",
      vnSent: "Đó là một sự thật rằng giá vé xe buýt tăng lên hai đô la vào tháng Sáu.",
      isReal: true
    },
    {
      word: "Opinion",
      vn: "Ý kiến",
      def: "A personal judgement that cannot be proven true or false.",
      vnDef: "Một đánh giá cá nhân không thể được chứng minh là đúng hay sai.",
      sent: "Saying the bus is too slow is an opinion, not a fact.",
      vnSent: "Nói rằng xe buýt quá chậm là một ý kiến, không phải một sự thật.",
      isReal: true
    },
    {
      word: "Support",
      vn: "Chứng minh",
      def: "To back up a claim with reasons or evidence.",
      vnDef: "Củng cố một luận điểm bằng lý do hoặc bằng chứng.",
      sent: "The writer uses a study to support the claim about sleep.",
      vnSent: "Người viết dùng một nghiên cứu để chứng minh luận điểm về giấc ngủ.",
      isReal: true
    },
    {
      word: "Evaluate",
      vn: "Đánh giá",
      def: "To judge how strong or weak something is.",
      vnDef: "Phán xét điều gì đó mạnh hay yếu đến mức nào.",
      sent: "On the GED you must evaluate the evidence, not just repeat it.",
      vnSent: "Trong bài thi GED, bạn phải đánh giá bằng chứng, không chỉ lặp lại nó.",
      isReal: true
    },
    {
      word: "Credible",
      vn: "Đáng tin cậy",
      def: "Able to be believed because it comes from a trusted source.",
      vnDef: "Có thể tin được vì nó đến từ một nguồn đáng tin cậy.",
      sent: "A number from an official record is more credible than a rumour.",
      vnSent: "Một con số từ hồ sơ chính thức đáng tin cậy hơn một tin đồn.",
      isReal: true
    },
    {
      word: "Counterclaim",
      vn: "Luận điểm đối lập",
      def: "The opposing point that argues against the writer's claim.",
      vnDef: "Điểm đối lập lập luận chống lại luận điểm của người viết.",
      sent: "A fair writer answers the counterclaim instead of hiding it.",
      vnSent: "Một người viết công bằng trả lời luận điểm đối lập thay vì giấu nó.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "A Claim Needs Support",
      vnTitle: "Một Luận điểm Cần Sự chứng minh",
      text: "When a writer wants to persuade you, they make a {claim} — the point they want you to accept. But a claim alone proves nothing. The writer must add {evidence}, such as a number or an example, to {support} it. When you read, always ask what backs the claim up.",
      vnText: "Khi một người viết muốn thuyết phục bạn, họ đưa ra một luận điểm — điểm mà họ muốn bạn chấp nhận. Nhưng một luận điểm đơn độc không chứng minh được gì. Người viết phải thêm bằng chứng, chẳng hạn như một con số hoặc một ví dụ, để chứng minh nó. Khi bạn đọc, hãy luôn hỏi điều gì hỗ trợ cho luận điểm."
    },
    {
      id: "passage_2",
      title: "Fact or Opinion?",
      vnTitle: "Sự thật hay Ý kiến?",
      text: "Not every sentence in an argument is proof. A {fact} can be checked against a record, a date or a measurement. An {opinion} is a personal judgement that cannot be proven. Judgement words such as best or terrible are a clue that you are reading an {opinion}, not evidence.",
      vnText: "Không phải mọi câu trong một lập luận đều là bằng chứng. Một sự thật có thể được kiểm tra dựa trên một hồ sơ, một ngày tháng hoặc một phép đo. Một ý kiến là một đánh giá cá nhân không thể được chứng minh. Các từ đánh giá như tốt nhất hoặc tồi tệ là một manh mối rằng bạn đang đọc một ý kiến, không phải bằng chứng."
    },
    {
      id: "passage_3",
      title: "Judging the Two Sides",
      vnTitle: "Đánh giá Hai phía",
      text: "The GED essay gives you two sources that disagree. Your task is to {evaluate} which side is better supported, not which side you prefer. A {credible} source uses evidence you can check, and a fair writer will answer the {counterclaim} from the other side instead of ignoring it.",
      vnText: "Bài luận GED cho bạn hai nguồn không đồng ý với nhau. Nhiệm vụ của bạn là đánh giá phía nào được chứng minh tốt hơn, không phải phía nào bạn thích hơn. Một nguồn đáng tin cậy dùng bằng chứng bạn có thể kiểm tra, và một người viết công bằng sẽ trả lời luận điểm đối lập từ phía kia thay vì phớt lờ nó."
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "What is the difference between a claim and the evidence that supports it?",
      suggestedWords: [["statement", "point"], ["example", "examples"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a claim is the point or position the writer wants the reader to accept.",
        "1 mark for stating that evidence is the facts, numbers or examples that prove the claim is true."
      ],
      modelAnswer: "A claim is the main point the writer wants the reader to accept, while the evidence is the facts, numbers or examples the writer gives to prove that the claim is true."
    },
    {
      id: "q2",
      question: "Why is a number from a study usually stronger evidence than a writer's personal feeling?",
      suggestedWords: [["check", "checked"], ["proven", "prove"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that a number from a study can be checked or proven against a source.",
        "1 mark for explaining that a personal feeling is an opinion that cannot be proven."
      ],
      modelAnswer: "A number from a study is stronger because it can be checked against a source and proven true or false, whereas a personal feeling is only an opinion that cannot be proven."
    },
    {
      id: "q3",
      question: "When two sources disagree, how should you decide which argument is better supported?",
      suggestedWords: [["compare", "weigh"], ["evidence", "support"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for saying you compare the evidence each side gives, not the side you personally prefer.",
        "1 mark for saying the better-supported side uses stronger, more checkable evidence (facts over feelings)."
      ],
      modelAnswer: "You should compare the evidence each side offers rather than choosing the side you prefer. The better-supported argument is the one that backs its claim with stronger, more checkable evidence, such as facts and figures instead of feelings."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: DIAGRAMS.CLAIM_EVIDENCE_REASONING,
      promptText: "The chart shows the three parts of an argument: CLAIM, EVIDENCE, and REASONING. Using the chart, explain what is missing when a writer makes a claim but gives no evidence.",
      suggestedWords: [["prove", "proof"], ["opinion"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that the evidence (the middle part that proves the claim) is missing.",
        "1 mark for explaining that without evidence the claim is only an unproven opinion."
      ],
      modelAnswer: "When a writer makes a claim but gives no evidence, the middle part of the chart — the evidence that proves the claim — is missing. Without it, the claim is only an unproven opinion that the reader has no reason to accept."
    },
    {
      id: "d2",
      inlineSvg: DIAGRAMS.FACT_VS_OPINION,
      promptText: "The chart sorts statements into a FACT column and an OPINION column. What is the key test that decides which column a statement belongs in?",
      suggestedWords: [["proven", "prove"], ["judgement", "judgment"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a fact can be proven true or false (checked against a source).",
        "1 mark for stating that an opinion is a personal judgement that cannot be proven."
      ],
      modelAnswer: "The test is whether the statement can be proven. A fact can be checked against a source and proven true or false, so it goes in the FACT column. An opinion is a personal judgement that cannot be proven, so it goes in the OPINION column."
    },
    {
      id: "d3",
      inlineSvg: DIAGRAMS.EVIDENCE_STRENGTH,
      promptText: "The ladder ranks evidence from STRONGEST at the top to WEAKEST at the bottom. A writer supports a claim only with the sentence \"everybody knows this is a bad idea.\" Where does that evidence sit on the ladder, and why?",
      suggestedWords: [["weakest", "weak"], ["feelings", "vague"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for placing it at the bottom of the ladder (weakest).",
        "1 mark for explaining that it gives only a feeling or vague claim with no number or checkable evidence."
      ],
      modelAnswer: "That sentence sits at the very bottom of the ladder, as the weakest kind of evidence. It offers only a feeling — 'everybody knows' — with no number, study or checkable fact behind it, so a careful reader cannot verify it at all."
    }
  ],
  // Find & Fix: short informational texts on this unit's topic (claims and
  // evidence) carrying mixed errors — agreement, tense, plural, article, comma
  // splice, confusables. Everything NOT listed is correct English.
  proofread: [
    {
      id: "pf1",
      title: "Editorial: Show Us the Numbers",
      titleVn: "Xã luận: Hãy cho chúng tôi thấy con số",
      passage: "The council claims that the new bus lane have cut journey times, but it has not published a single figure. A claim without evidence are only an opinion. Last spring the council promised that every driver would saved ten minutes a day; drivers who use the road every morning say they see no difference. If the lane works, the figures will show it, and the council should release it. Until than, residents are right to stay unconvinced.",
      errors: [
        {
          id: "e1",
          wrong: "have cut",
          right: "has cut",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The new bus lane\" is one thing, so the present perfect uses \"has cut\".",
          expVn: "\"The new bus lane\" là một thứ, nên thì hiện tại hoàn thành dùng \"has cut\"."
        },
        {
          id: "e2",
          wrong: "evidence are",
          right: "evidence is",
          accept: [],
          kind: "Interrupting phrase",
          expEn: "The subject is \"claim\" (one), not \"evidence\". Cross out \"without evidence\" and the verb is \"is\".",
          expVn: "Chủ ngữ là \"claim\" (một), không phải \"evidence\". Gạch bỏ \"without evidence\" và động từ là \"is\"."
        },
        {
          id: "e3",
          wrong: "would saved",
          right: "would save",
          accept: [],
          kind: "Verb form",
          expEn: "After \"would\", the verb stays in its base form: \"would save\".",
          expVn: "Sau \"would\", động từ giữ nguyên dạng gốc: \"would save\"."
        },
        {
          id: "e4",
          wrong: "release it",
          right: "release them",
          accept: [],
          kind: "Pronoun agreement",
          expEn: "The council should release \"the figures\" (plural), so the pronoun is \"them\".",
          expVn: "Hội đồng nên công bố \"the figures\" (số nhiều), nên đại từ là \"them\"."
        },
        {
          id: "e5",
          wrong: "Until than",
          right: "Until then",
          accept: [],
          kind: "Confusable words",
          expEn: "\"Than\" compares two things. \"Then\" means \"that time\", which is the meaning here.",
          expVn: "\"Than\" dùng để so sánh hai thứ. \"Then\" nghĩa là \"lúc đó\", đúng với nghĩa ở đây."
        }
      ]
    },
    {
      id: "pf2",
      title: "Notice: Have Your Say on the Skate Park",
      titleVn: "Thông báo: Góp ý về công viên trượt ván",
      passage: "The town council is asking residents for there views on a proposed skate park behind the leisure centre. Supporters says it will give young people a safe place to meet. Opponents worry about noise, they also point to a similar park in Weston that was closed after two years. Both sides have been asked to send evidence, not just opinions, before 30 April. A open meeting will be held on 6 May, and the council will publish every submission it receive.",
      errors: [
        {
          id: "e1",
          wrong: "there views",
          right: "their views",
          accept: [],
          kind: "Confusable words",
          expEn: "The views belong to the residents, so the possessive \"their\" is needed. \"There\" points to a place.",
          expVn: "Các ý kiến thuộc về cư dân, nên cần sở hữu \"their\". \"There\" chỉ một nơi chốn."
        },
        {
          id: "e2",
          wrong: "says",
          right: "say",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Supporters\" is plural, so the verb has no -s: \"say\".",
          expVn: "\"Supporters\" là số nhiều, nên động từ không có -s: \"say\"."
        },
        {
          id: "e3",
          wrong: "noise, they also point",
          right: "noise; they also point",
          accept: ["noise. They also point", "noise, and they also point", "noise — they also point"],
          kind: "Comma splice",
          expEn: "Two complete sentences cannot be joined by a comma alone. Use a semicolon, a full stop, or add \"and\".",
          expVn: "Hai câu hoàn chỉnh không thể nối chỉ bằng dấu phẩy. Dùng dấu chấm phẩy, dấu chấm, hoặc thêm \"and\"."
        },
        {
          id: "e4",
          wrong: "A open",
          right: "An open",
          accept: [],
          kind: "Article",
          expEn: "\"Open\" begins with a vowel sound, so the article is \"an\".",
          expVn: "\"Open\" bắt đầu bằng âm nguyên âm, nên mạo từ là \"an\"."
        },
        {
          id: "e5",
          wrong: "receive",
          right: "receives",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "The subject is \"it\" (the council), so the present-tense verb takes an -s: \"receives\".",
          expVn: "Chủ ngữ là \"it\" (hội đồng), nên động từ thì hiện tại mang -s: \"receives\"."
        }
      ]
    },
    {
      id: "pf3",
      title: "From a Report on Homework and Test Scores",
      titleVn: "Trích từ một báo cáo về bài tập về nhà và điểm thi",
      passage: "A study of 1,200 students at six school compared the amount of homework set with test results at the end of the year. Students who done between one and two hours a night scored highest. Those who did more than three hours scored no better, and many reported feeling tired in class. The researchers warns that the study does not prove that homework cause higher scores, because the students with the most homework also had the most experienced teachers. Even so, the results is strong enough to question the belief that more homework is always better.",
      errors: [
        {
          id: "e1",
          wrong: "six school",
          right: "six schools",
          accept: [],
          kind: "Plural noun",
          expEn: "A number above one needs a plural noun: \"six schools\".",
          expVn: "Một con số lớn hơn một cần danh từ số nhiều: \"six schools\"."
        },
        {
          id: "e2",
          wrong: "done",
          right: "did",
          accept: [],
          kind: "Verb form",
          expEn: "\"Done\" needs a helping verb (\"had done\"). On its own, the past tense is \"did\".",
          expVn: "\"Done\" cần một trợ động từ (\"had done\"). Đứng một mình, thì quá khứ là \"did\"."
        },
        {
          id: "e3",
          wrong: "warns",
          right: "warn",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The researchers\" is plural, so the verb has no -s: \"warn\".",
          expVn: "\"The researchers\" là số nhiều, nên động từ không có -s: \"warn\"."
        },
        {
          id: "e4",
          wrong: "homework cause",
          right: "homework causes",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Homework\" is an uncountable, singular noun, so the verb takes an -s: \"causes\".",
          expVn: "\"Homework\" là danh từ không đếm được, số ít, nên động từ mang -s: \"causes\"."
        },
        {
          id: "e5",
          wrong: "results is",
          right: "results are",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The results\" is plural, so the verb is \"are\".",
          expVn: "\"The results\" là số nhiều, nên động từ là \"are\"."
        }
      ]
    }
  ],
  // The essay is a BANK: the student picks one prompt each sitting. er1 keeps
  // the original 60-minute ESL accommodation; er2 runs at the real test's 45.
  essay: [
    {
      id: "er1",
      title: "Free buses",
      titleVn: "Xe buýt miễn phí",
      // The Lesson-9 capstone essay at test length: two kinds of writing with
      // bylines, ~600 words between them, a measured example on EACH side, so
      // the student has to weigh rather than spot. Practice allows 60 minutes
      // (an ESL accommodation); exam conditions are always the real 45.
      minutesAllowed: 60,
      sources: [
        {
          type: "Op-ed",
          title: "Make the Buses Free",
          byline: "By Rosa Delgado, a transportation planner and member of the group Riders for Better Transit",
          text: [
            "Our city should let everyone ride the public bus for free. It is the fastest way to take cars off our crowded roads and to help the people who need transport most.",
            "We know it works. When the city of Elmwood removed bus fares for one year, ridership rose by thirty percent, and traffic counters recorded 8 percent fewer cars on the main roads at rush hour. Air-quality monitors near the city's busiest intersection also showed a small drop in pollution.",
            "Collecting fares is not cheap, either. Ticket machines, fare cards and inspectors all cost money to run. In Elmwood, the transit authority found that about a quarter of every dollar it collected in fares was spent on collecting it.",
            "Critics always ask who will pay. In Elmwood, the lost fares were covered partly by a small increase in downtown parking charges, which also encouraged drivers to leave their cars at home. Other cities could do the same, and every car taken off the road saves money on road repairs as well.",
            "Free buses also help the people who need them most. Those who cannot afford a car can reach work, clinics and shops without counting coins at the door. In Elmwood, a survey of new riders found that 4 in 10 of them earned less than $25,000 a year. Drivers say the buses run faster too, because no one stops to pay.",
            "A city that builds roads for drivers without charging them at every corner can surely run buses for everyone. It is time to make the bus free.",
          ].join("\n\n"),
        },
        {
          type: "Letter to the editor",
          title: "Keep a Small Fare",
          byline: "From Alan Brooks, a retired bus mechanic and the city's former transit budget officer",
          text: [
            "Free buses sound generous, but someone still has to pay for them. A bus system needs drivers, fuel and repairs, and in our city fares cover about a third of that bill. If fares disappear, that money has to come from taxpayers, including many who never board a bus.",
            "Look at what happened in Marsden. When the town made its buses free, the extra riders crowded the buses so badly that the town had to buy six new vehicles it had not budgeted for, at a cost of $3 million. Buses ran late more often, and some riders who depended on them to get to work gave up and bought cars.",
            "Free buses may not even reach the people they are meant to help. A study in Marsden found that many of the new riders were people who used to walk or cycle, not drivers leaving their cars at home.",
            "Supporters like to point to Elmwood, but one year is a short trial. In its second year, Elmwood's ridership gain fell by half as the novelty wore off, and the parking charges covered less than half of the lost fares. The city council is still arguing over where the rest of the money will come from.",
            "A small, low fare — with free passes for students, seniors and people on low incomes — keeps a steady income for maintenance and asks riders to share the cost of a service they use. The town of Grantville already does this, and its low-income riders rose by a fifth in two years. That is fairer to everyone.",
          ].join("\n\n"),
        },
      ],
      task:
        "Both writers argue about whether a city's public buses should be free. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State clearly which position is better supported.",
        "Both writers give a measured example. Weigh them against each other.",
        "Look for the question one side never answers — who pays, and who actually rides?",
        "Read each byline: does either writer speak for a group, or from experience of the budget?",
      ],
      suggestedWords: [
        ["Evidence", "proof", "prove"],
        ["Claim", "argues", "position"],
        ["Cost", "fund", "pay"],
      ],
    },
    {
      id: "er2",
      title: "Phones in cars",
      titleVn: "Điện thoại trong xe hơi",
      minutesAllowed: 45,
      sources: [
        {
          title: "Ban Every Phone Call at the Wheel",
          text:
            "Drivers should be banned from using a phone at all while driving, including hands-free calls. Most people believe that a hands-free call is safe because both hands stay on the wheel, but the danger is in the mind, not the hands. In a driving-simulator study at a state university, drivers holding a hands-free conversation missed twice as many red lights as drivers who were not on a call, and their reaction times were as slow as those of drivers just over the legal alcohol limit. The problem is attention: a driver picturing the person on the other end of the line is not fully watching the road. Talking to a passenger is different, because a passenger can see the traffic and stops talking when the road gets busy. A law that bans only hand-held phones tells drivers that hands-free is safe, when the evidence says it is not.",
        },
        {
          title: "Hands-Free Should Stay Legal",
          text:
            "Banning hands-free calls goes too far. The real danger on the road is a driver looking down at a screen to read a message, not a driver talking with both eyes on the traffic. Hands-free systems were built exactly so that drivers could keep their hands and eyes where they belong, and many modern cars come with them fitted as standard. A total ban would also be almost impossible to enforce, because a police officer cannot see whether a driver is talking to a passenger or to a phone. Delivery drivers, taxi drivers and parents who need to be reachable would be hit hardest, and many would simply ignore the law. It is more sensible to punish the clear danger — holding a phone — with heavy fines, and to trust adults to judge when a short call is safe. Most drivers already make that judgement sensibly every day.",
        },
      ],
      task:
        "Both writers argue about whether drivers should be banned from all phone use, including hands-free calls. In your response, analyze both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State clearly which position is better supported.",
        "Use specific evidence from BOTH sources.",
        "Judge how strong each side's evidence is — a measured result beats a prediction.",
        "Write in paragraphs, with a short conclusion.",
      ],
      suggestedWords: [
        ["Evidence", "proof", "prove"],
        ["Claim", "argues", "position"],
        ["Driver", "attention", "hands-free"],
      ],
    },
  ],
  assessment,
  games,
  notes
};
