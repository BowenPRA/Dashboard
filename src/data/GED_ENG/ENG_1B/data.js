// src/data/GED_ENG/ENG_1B/data.js
// Lesson 8 of the 10-lesson GED RLA blueprint: Author's Purpose, Tone & Point of
// View. Refocused from the old overloaded "Rhetorical Analysis & Syntax" unit —
// the college-level rhetoric (juxtaposition, subordination, synthesis) was above
// GED/ESL level and has been retired; the claims/evidence half moved to ENG_1C
// (Lesson 9). Reading lesson shape: Notes + Vocab + Reading + Short Answers +
// Diagrams + Essay + Assessment.
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { DIAGRAMS } from './diagrams.js';

export const ENGLISH_1B_DATA = {
  meta: {
    id: "ENG_1B",
    title: "GED Reading 2: Purpose, Tone & Point of View",
    desc: "Work out why an author wrote a text, hear the attitude in their word choice, and identify the point of view and any bias.",
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
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason an author writes: to persuade, inform or entertain.",
      vnDef: "Lý do tác giả viết: để thuyết phục, cung cấp thông tin hoặc giải trí.",
      sent: "The author's purpose is to persuade the town to save water.",
      vnSent: "Mục đích của tác giả là thuyết phục thị trấn tiết kiệm nước.",
      isReal: true
    },
    {
      word: "Persuade",
      vn: "Thuyết phục",
      def: "To try to make the reader agree with an opinion or take action.",
      vnDef: "Cố gắng khiến người đọc đồng ý với một ý kiến hoặc hành động.",
      sent: "An editorial is written to persuade, not just to inform.",
      vnSent: "Một bài xã luận được viết để thuyết phục, không chỉ để cung cấp thông tin.",
      isReal: true
    },
    {
      word: "Inform",
      vn: "Cung cấp thông tin",
      def: "To give the reader facts without taking a side.",
      vnDef: "Cung cấp cho người đọc sự thật mà không đứng về phía nào.",
      sent: "A news report should inform the reader with checkable facts.",
      vnSent: "Một bản tin nên cung cấp thông tin cho người đọc bằng những sự thật có thể kiểm tra.",
      isReal: true
    },
    {
      word: "Tone",
      vn: "Giọng điệu",
      def: "The author's attitude toward the subject, heard in word choice.",
      vnDef: "Thái độ của tác giả đối với chủ đề, nghe được qua cách chọn từ.",
      sent: "The angry tone comes from words like 'reckless' and 'shameful'.",
      vnSent: "Giọng điệu tức giận đến từ những từ như 'liều lĩnh' và 'đáng xấu hổ'.",
      isReal: true
    },
    {
      word: "Attitude",
      vn: "Thái độ",
      def: "How the writer feels about the topic — for, against or neutral.",
      vnDef: "Người viết cảm thấy thế nào về chủ đề — ủng hộ, phản đối hay trung lập.",
      sent: "Her warm attitude toward the plan shows in every sentence.",
      vnSent: "Thái độ ấm áp của cô ấy đối với kế hoạch thể hiện trong từng câu.",
      isReal: true
    },
    {
      word: "Connotation",
      vn: "Sắc thái nghĩa",
      def: "The feeling a word carries beyond its plain meaning.",
      vnDef: "Cảm giác mà một từ mang theo ngoài nghĩa đen của nó.",
      sent: "'Thrifty' and 'cheap' mean the same thing but have a different connotation.",
      vnSent: "'Thrifty' và 'cheap' có cùng nghĩa nhưng có sắc thái nghĩa khác nhau.",
      isReal: true
    },
    {
      word: "Perspective",
      vn: "Góc nhìn",
      def: "The point of view or position a writer sees an issue from.",
      vnDef: "Góc nhìn hoặc lập trường mà người viết nhìn nhận một vấn đề.",
      sent: "The article is written from the perspective of a small shop owner.",
      vnSent: "Bài báo được viết từ góc nhìn của một chủ cửa hàng nhỏ.",
      isReal: true
    },
    {
      word: "Bias",
      vn: "Thiên kiến",
      def: "A leaning to one side that shows only part of the picture.",
      vnDef: "Sự nghiêng về một phía chỉ cho thấy một phần của bức tranh.",
      sent: "A writer who shows only one side reveals a clear bias.",
      vnSent: "Một người viết chỉ cho thấy một phía bộc lộ một thiên kiến rõ ràng.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Why the Author Wrote It",
      vnTitle: "Tại sao Tác giả Viết nó",
      text: "Every writer has a {purpose}. Some want to {persuade} you to agree or to act, using strong opinions. Others only want to {inform} you, giving plain facts that you can check for yourself.",
      vnText: "Mỗi người viết đều có một mục đích. Một số muốn thuyết phục bạn đồng ý hoặc hành động, bằng những ý kiến mạnh mẽ. Những người khác chỉ muốn cung cấp thông tin cho bạn, đưa ra những sự thật đơn giản mà bạn có thể tự kiểm tra."
    },
    {
      id: "passage_2",
      title: "Hearing the Tone",
      vnTitle: "Nghe Giọng điệu",
      text: "A writer's {tone} is the {attitude} they take toward the subject, and you find it in their word choice. A word's {connotation} — the feeling it carries — tells you whether that attitude is warm or sharp.",
      vnText: "Giọng điệu của người viết là thái độ mà họ mang đối với chủ đề, và bạn tìm thấy nó trong cách chọn từ của họ. Sắc thái nghĩa của một từ — cảm giác nó mang theo — cho bạn biết thái độ đó là ấm áp hay sắc bén."
    },
    {
      id: "passage_3",
      title: "Whose Side Is It On?",
      vnTitle: "Nó Đứng về Phía Ai?",
      text: "Point of view is the writer's {perspective} on an issue. A fair writer may lean one way, but heavy {bias} — showing only one side — is a signal to read with care and to check the {purpose} behind the words.",
      vnText: "Góc nhìn là quan điểm của người viết về một vấn đề. Một người viết công bằng có thể nghiêng về một phía, nhưng thiên kiến nặng — chỉ cho thấy một phía — là một tín hiệu để đọc cẩn thận và kiểm tra mục đích đằng sau những từ ngữ."
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "What does an author's tone tell you, and where in a text do you look to find it?",
      suggestedWords: [["attitude", "feeling"], ["word choice", "adjectives"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that tone is the author's attitude or feeling toward the subject.",
        "1 mark for saying you find it in the writer's word choice (the adjectives and verbs), not in the topic itself."
      ],
      modelAnswer: "An author's tone tells you their attitude or feeling toward the subject. You find it by looking closely at the writer's word choice — the adjectives and verbs they pick — rather than at the topic itself."
    },
    {
      id: "q2",
      question: "What is the difference between writing to inform and writing to persuade?",
      suggestedWords: [["facts", "objective"], ["agree", "opinion"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for saying writing to inform gives the reader facts without taking a side.",
        "1 mark for saying writing to persuade tries to make the reader agree with an opinion or take action."
      ],
      modelAnswer: "Writing to inform gives the reader facts plainly, without taking a side. Writing to persuade goes further: it tries to make the reader agree with an opinion or take some action, so it leans on judgement rather than only facts."
    },
    {
      id: "q3",
      question: "What does it mean to say a text shows bias, and why should a reader notice it?",
      suggestedWords: [["one side", "leaning"], ["balanced", "fair"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for saying bias means the writing leans to one side and shows only part of the picture.",
        "1 mark for saying a reader should notice it so they do not mistake a one-sided view for a balanced or neutral fact."
      ],
      modelAnswer: "A text shows bias when it leans to one side and presents only part of the picture instead of a balanced view. A reader should notice bias so that they do not mistake a one-sided argument for neutral, proven fact, and can weigh what is missing."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: DIAGRAMS.AUTHORS_PURPOSE,
      promptText: "The chart shows three common purposes: PERSUADE, INFORM, and ENTERTAIN. A newspaper editorial that urges the mayor to build a shelter — which purpose is it, and how can you tell?",
      suggestedWords: [["persuade", "persuasive"], ["agree", "act"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the purpose as to persuade.",
        "1 mark for explaining that it tries to make the reader agree or act (it pushes an opinion), matching the PERSUADE box."
      ],
      modelAnswer: "The editorial's purpose is to persuade. It does not just report facts; it urges the mayor to build a shelter, trying to make the reader agree and take action. That matches the PERSUADE box on the chart, which is about getting the reader to agree or act."
    },
    {
      id: "d2",
      inlineSvg: DIAGRAMS.TONE_SPECTRUM,
      promptText: "The scale runs from Approving on the left to Critical on the right. A reviewer calls a plan 'a reckless, costly mistake.' Where on the scale does that tone fall, and what in the words tells you?",
      suggestedWords: [["critical", "negative"], ["word choice", "adjectives"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for placing the tone at the Critical end of the scale.",
        "1 mark for explaining that the negative adjectives ('reckless', 'costly') reveal the critical attitude."
      ],
      modelAnswer: "That tone falls at the Critical end of the scale. The negative adjectives the reviewer chooses — 'reckless' and 'costly' — carry a disapproving feeling, and it is that word choice, not the topic itself, that shows the critical attitude."
    },
    {
      id: "d3",
      inlineSvg: DIAGRAMS.POINT_OF_VIEW,
      promptText: "The chart contrasts FIRST PERSON and THIRD PERSON and asks whether the writer is for, against, or neutral. A passage reads: 'We must act now to save our river.' Which point of view is it, and what stance does the writer take?",
      suggestedWords: [["first person", "we"], ["for", "against"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying it as first person (it uses 'we').",
        "1 mark for stating that the writer takes a side — they are for action, not neutral."
      ],
      modelAnswer: "It is written in the first person, because the writer uses 'we'. The stance is not neutral: by saying 'we must act now,' the writer clearly takes a side and is for taking action to save the river."
    }
  ],
  essay: {
    // A full GED Extended Response for practice: two opposing contemporary sources
    // with checkable evidence on each side; 60 minutes (ESL accommodation vs. the
    // real 45). The student argues which side is BETTER SUPPORTED.
    minutesAllowed: 60,
    sources: [
      {
        title: "Make Service a Graduation Requirement",
        text:
          "High schools should require students to complete a set number of community-service hours before they graduate. When Oak Ridge High added a forty-hour requirement, the share of seniors who volunteered rose sharply, and a follow-up survey found that many of them kept volunteering a year after leaving school. Service also teaches lessons a classroom cannot: students learn to show up on time, work beside strangers, and see how their town actually runs.",
      },
      {
        title: "Service Should Be a Choice",
        text:
          "Requiring service turns a good deed into a chore. A student who volunteers only to tick a box learns little about kindness, and the rule falls hardest on teenagers who already work paid jobs to help their families. One district that tracked its graduates found no lasting difference in volunteering between students who had been required to serve and those who had not. Real generosity cannot be forced onto a form.",
      },
    ],
    task:
      "Both writers argue about whether high schools should require community service to graduate. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
    guidelines: [
      "State clearly which position is better supported.",
      "Use specific evidence from BOTH sources.",
      "Weigh how strong each side's evidence is — do not just repeat it.",
      "Write in paragraphs, with a short conclusion.",
    ],
    suggestedWords: [
      ["Evidence", "proof", "prove"],
      ["Claim", "argues", "position"],
      ["Service", "volunteer"],
    ],
    scienceMaxMarks: 4,
    markScheme: [
      "States clearly which position is better supported, rather than only which the writer personally prefers.",
      "Refers to specific evidence from Source 1 (for example the rise in volunteering at Oak Ridge or the follow-up survey).",
      "Refers to specific evidence from Source 2 (for example the district that found no lasting difference, or the burden on working students).",
      "Evaluates the quality of the evidence rather than simply restating it, for example noting that comparing two groups is stronger than surveying only one.",
    ],
    modelAnswer:
      "Both sources use real evidence, but Source 2 is slightly better supported because its evidence compares two groups, while Source 1's looks at only one. Source 1 argues for a requirement and reports that after Oak Ridge High added forty hours, more seniors volunteered and a survey found many kept volunteering later. That sounds convincing, yet the survey follows only the students who were required to serve, so it cannot show whether the rule itself made the difference. Source 2 answers exactly that weakness: it points to a district that tracked its graduates and found no lasting difference in volunteering between students who had been required to serve and those who had not. Comparing the two groups is a stronger test than following one, because it rules out the chance that those students would have volunteered anyway. Source 2 also raises a fair point about the burden on teenagers who already work. Because its evidence is a fairer comparison and answers Source 1's main claim, Source 2's position is the better supported.",
  },
  assessment,
  notes
};
