// src/data/GED_ENG/ENG_1C/data.js
// Lesson 9 of the 10-lesson GED RLA blueprint: Claims, Evidence & Evaluating
// Arguments. Mined out of the old ENG_1A/1B "foundations" material so the reading
// strand has one contained unit for the argument-evaluation skills the Extended
// Response depends on. Reading lesson shape: Notes + Vocab + Reading + Short
// Answers + Diagrams + Essay + Assessment.
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { DIAGRAMS } from './diagrams.js';

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
      title: "Phase 0: Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 20,
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 15 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 55,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 15 },
        { id: "ESSAY", dbKey: "p8", maxXP: 15 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 }
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
  essay: {
    // The Lesson-9 capstone essay: a full GED Extended Response. Two opposing,
    // contemporary sources with checkable evidence on each side; 60 minutes as an
    // ESL accommodation (the real test is 45). The student argues which side is
    // BETTER SUPPORTED, not which they personally prefer.
    minutesAllowed: 60,
    sources: [
      {
        title: "Make the Buses Free",
        text:
          "A city should let everyone ride the public bus for free. When the city of Elmwood removed bus fares for one year, ridership rose by thirty percent, and the roads carried noticeably fewer cars at rush hour. Collecting fares is not cheap either: ticket machines, cards and inspectors all cost money to run, so a large part of every fare is eaten up by the cost of collecting it. Free buses also help the people who need transport most — those who cannot afford a car can still reach work, clinics and shops without counting coins at the door.",
      },
      {
        title: "Keep a Small Fare",
        text:
          "Free buses sound generous, but someone still has to pay for them. A bus system needs drivers, fuel and repairs, and fares cover a real share of that bill. When the town of Marsden made its buses free, the extra riders crowded the buses so badly that the town had to buy new vehicles it had not budgeted for, and the service grew less reliable. A small, low fare keeps a steady income for maintenance and asks riders to share the cost of a service they use, rather than passing the whole bill to taxpayers who may never board a bus.",
      },
    ],
    task:
      "Both writers argue about whether a city's public buses should be free. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
    guidelines: [
      "State clearly which position is better supported.",
      "Use specific evidence from BOTH sources.",
      "Judge how strong each side's evidence is — do not just repeat it.",
      "Write in paragraphs, with a short conclusion.",
    ],
    suggestedWords: [
      ["Evidence", "proof", "prove"],
      ["Claim", "argues", "position"],
      ["Cost", "fund", "pay"],
    ],
    scienceMaxMarks: 4,
    markScheme: [
      "States clearly which position is better supported, rather than only which the writer personally prefers.",
      "Refers to specific evidence from Source 1 (for example the 30% rise in ridership in Elmwood or the cost of collecting fares).",
      "Refers to specific evidence from Source 2 (for example the overcrowding and unbudgeted new vehicles in Marsden).",
      "Evaluates the quality of the evidence rather than simply restating it, for example weighing the two measured results against each other.",
    ],
    modelAnswer:
      "Both sources support their claims with a measured example, so this is a close case, but Source 2 is slightly better supported because its evidence points to a cost the other side never answers. Source 1 argues that buses should be free and gives a real result: after Elmwood dropped its fares, ridership rose by thirty percent and fewer cars used the roads at rush hour. It also makes the fair point that collecting fares is itself expensive. However, Source 1 never says how the free service was paid for. Source 2 answers exactly that gap. It agrees a bus system is worth having but shows, with the example of Marsden, that free buses drew so many riders that the town had to buy vehicles it had not budgeted for, and the service became less reliable. That is a concrete, measured harm, not just a worry. Because Source 2 both provides its own evidence and exposes the missing cost in Source 1's argument, its position is the better supported of the two.",
  },
  assessment,
  notes
};
