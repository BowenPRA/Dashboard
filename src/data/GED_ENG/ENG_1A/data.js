// src/data/GED_ENG/ENG_1A/data.js
// Lesson 7 of the 10-lesson GED RLA blueprint: Reading for Main Idea & Supporting
// Detail. Refocused from the old broad "Foundations of Reading & Argument" unit —
// the argument/claims material now lives in ENG_1C (Lesson 9). Reading lesson
// shape: Notes + Vocab + Reading + Short Answers + Diagrams + Essay + Assessment.
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { DIAGRAMS } from './diagrams.js';

export const ENGLISH_1A_DATA = {
  meta: {
    id: "ENG_1A",
    title: "GED Reading 1: Main Idea & Detail",
    desc: "Find the main idea of a passage, tell it apart from the topic, choose the details that support it, and write a short, fair summary.",
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
      word: "Topic",
      vn: "Chủ đề",
      def: "The subject a text is about, named in a word or short phrase.",
      vnDef: "Đề tài mà một văn bản nói về, được gọi tên bằng một từ hoặc cụm từ ngắn.",
      sent: "The topic of the article is city parks.",
      vnSent: "Chủ đề của bài báo là công viên thành phố.",
      isReal: true
    },
    {
      word: "Gist",
      vn: "Ý chính",
      def: "The main idea, or the one point a writer makes about the topic.",
      vnDef: "Ý chính, hay điểm duy nhất mà người viết nêu ra về chủ đề.",
      sent: "In one sentence, the gist is that reading every day helps you learn.",
      vnSent: "Trong một câu, ý chính là đọc sách mỗi ngày giúp bạn học hỏi.",
      isReal: true
    },
    {
      word: "Detail",
      vn: "Chi tiết",
      def: "A fact, example or reason that supports the main idea.",
      vnDef: "Một sự thật, ví dụ hoặc lý do hỗ trợ cho ý chính.",
      sent: "Each detail in the paragraph backs up the writer's main point.",
      vnSent: "Mỗi chi tiết trong đoạn văn củng cố cho điểm chính của người viết.",
      isReal: true
    },
    {
      word: "Relevant",
      vn: "Liên quan",
      def: "Closely connected to the main idea being discussed.",
      vnDef: "Có liên hệ chặt chẽ với ý chính đang được bàn đến.",
      sent: "A relevant detail points straight at the main idea.",
      vnSent: "Một chi tiết liên quan chỉ thẳng vào ý chính.",
      isReal: true
    },
    {
      word: "Passage",
      vn: "Đoạn văn",
      def: "A short section of a longer text that you read and study.",
      vnDef: "Một phần ngắn của một văn bản dài hơn mà bạn đọc và nghiên cứu.",
      sent: "Read the whole passage before you choose the main idea.",
      vnSent: "Hãy đọc toàn bộ đoạn văn trước khi bạn chọn ý chính.",
      isReal: true
    },
    {
      word: "Summary",
      vn: "Tóm tắt",
      def: "A short restatement of the main idea and key points of a text.",
      vnDef: "Một bản nêu lại ngắn gọn ý chính và các điểm quan trọng của một văn bản.",
      sent: "Her summary covered the whole article in two sentences.",
      vnSent: "Bản tóm tắt của cô ấy bao quát toàn bộ bài báo trong hai câu.",
      isReal: true
    },
    {
      word: "Paraphrase",
      vn: "Diễn giải",
      def: "To restate an idea in your own words instead of copying it.",
      vnDef: "Nêu lại một ý bằng lời của chính bạn thay vì sao chép nó.",
      sent: "To paraphrase, keep the meaning but change the words.",
      vnSent: "Để diễn giải, hãy giữ nghĩa nhưng thay đổi từ ngữ.",
      isReal: true
    },
    {
      word: "Restate",
      vn: "Nêu lại",
      def: "To say the same point again in a shorter or clearer way.",
      vnDef: "Nói lại cùng một điểm theo cách ngắn gọn hoặc rõ ràng hơn.",
      sent: "A good summary restates the main idea briefly and fairly.",
      vnSent: "Một bản tóm tắt tốt nêu lại ý chính một cách ngắn gọn và công bằng.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Topic and Main Idea",
      vnTitle: "Chủ đề và Ý chính",
      text: "Every {passage} you read has a {topic}: the subject it is about, named in a word or two. The main idea, or {gist}, is different — it is the one point the writer makes about that topic.",
      vnText: "Mỗi đoạn văn bạn đọc đều có một chủ đề: đề tài mà nó nói về, được gọi tên bằng một hai từ. Ý chính thì khác — đó là điểm duy nhất mà người viết nêu ra về chủ đề đó."
    },
    {
      id: "passage_2",
      title: "Details That Support",
      vnTitle: "Những Chi tiết Hỗ trợ",
      text: "The main idea is held up by supporting details. A strong {detail} is {relevant}: it points straight at the point. A sentence can be true and still not fit, so ask whether each {detail} really supports the main idea.",
      vnText: "Ý chính được nâng đỡ bởi các chi tiết hỗ trợ. Một chi tiết mạnh thì liên quan: nó chỉ thẳng vào điểm chính. Một câu có thể đúng nhưng vẫn không phù hợp, nên hãy hỏi liệu mỗi chi tiết có thực sự hỗ trợ ý chính hay không."
    },
    {
      id: "passage_3",
      title: "Writing a Summary",
      vnTitle: "Viết một Bản tóm tắt",
      text: "A good {summary} keeps the main idea and drops the small examples. Instead of copying whole lines, {paraphrase} the point in your own words. In short, {restate} the writer's main idea briefly and fairly.",
      vnText: "Một bản tóm tắt tốt giữ ý chính và bỏ các ví dụ nhỏ. Thay vì sao chép cả câu, hãy diễn giải điểm đó bằng lời của chính bạn. Nói ngắn gọn, hãy nêu lại ý chính của người viết một cách súc tích và công bằng."
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "What is the difference between the topic of a passage and its main idea?",
      suggestedWords: [["subject", "about"], ["point", "sentence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that the topic is the subject the text is about (a word or short phrase).",
        "1 mark for stating that the main idea is the point the writer makes about that topic (a full sentence)."
      ],
      modelAnswer: "The topic is the subject the passage is about, named in a word or short phrase. The main idea is different: it is the full-sentence point the writer makes about that topic."
    },
    {
      id: "q2",
      question: "How can you tell whether a detail belongs in a paragraph or not?",
      suggestedWords: [["relevant", "connected"], ["off-topic", "wanders"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for saying a detail belongs if it is relevant — it supports the main idea.",
        "1 mark for saying a true but off-topic sentence does not belong because it does not support the main idea."
      ],
      modelAnswer: "A detail belongs when it is relevant and directly supports the main idea. A sentence that is true but off-topic does not belong, because it does not help prove the writer's main point."
    },
    {
      id: "q3",
      question: "What makes a good summary of a passage?",
      suggestedWords: [["short", "brief"], ["own words", "paraphrase"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for saying a good summary keeps the main idea and the most important points.",
        "1 mark for saying it is short and written in your own words, without adding your own opinion."
      ],
      modelAnswer: "A good summary keeps the main idea and the most important supporting points while leaving out small examples. It is short and written in your own words, and it does not add any opinion of your own."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: DIAGRAMS.TOPIC_VS_MAIN,
      promptText: "The chart puts TOPIC and MAIN IDEA side by side, using 'school lunches' and 'Lunches should be healthier.' Explain the difference the chart is showing.",
      suggestedWords: [["subject", "about"], ["sentence", "point"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that the topic is the subject the text is about (a word or short phrase, like 'school lunches').",
        "1 mark for explaining that the main idea is the point made about the topic, stated as a full sentence (like 'Lunches should be healthier')."
      ],
      modelAnswer: "The chart shows that the topic is only the subject — a short phrase such as 'school lunches' — that names what the text is about. The main idea goes further: it is a full sentence that makes a point about the topic, such as 'Lunches should be healthier.'"
    },
    {
      id: "d2",
      inlineSvg: DIAGRAMS.MAIN_IDEA_MAP,
      promptText: "The diagram shows a MAIN IDEA resting on three DETAIL boxes below it. What does this picture tell you about how a main idea and its supporting details are related?",
      suggestedWords: [["support", "hold up"], ["one point"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that the details support or hold up the main idea.",
        "1 mark for stating that the main idea is the single point all the details point to, and the details do not replace it."
      ],
      modelAnswer: "The picture shows that the supporting details sit underneath the main idea and hold it up, like legs under a table. The main idea is the one point that all the details support; the details give facts, examples and reasons, but they do not replace the main idea itself."
    }
  ],
  essay: {
    // Every reading unit carries a full GED Extended Response for practice: two
    // opposing contemporary sources, 60 minutes (ESL accommodation vs. the real
    // 45), argue which side is BETTER SUPPORTED.
    minutesAllowed: 60,
    sources: [
      {
        title: "The Case for School Uniforms",
        text:
          "Schools should require students to wear a simple uniform. When Lincoln Middle School introduced uniforms, staff recorded far fewer arguments over clothing and brand-name pressure, and teachers said the mornings ran more calmly. Uniforms can also save families money: instead of buying new outfits to keep up with fashion, parents buy two or three sets that last the whole year. A shared uniform quietly reminds every student that they belong to the same school.",
      },
      {
        title: "Uniforms Miss the Point",
        text:
          "A uniform is an easy answer to a hard question. Requiring one does nothing about the real causes of trouble at school, such as bullying or boredom in class. Uniforms also cost money that some families do not have, because a required set must be bought whether or not last year's clothes still fit. One district that switched to uniforms found no measurable change in student behaviour after two years. Students learn respect from how they are treated, not from matching shirts.",
      },
    ],
    task:
      "Both writers argue about whether schools should require students to wear a uniform. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
    guidelines: [
      "State clearly which position is better supported.",
      "Use specific evidence from BOTH sources.",
      "Weigh how strong each side's evidence is — do not just repeat it.",
      "Write in paragraphs, with a short conclusion.",
    ],
    suggestedWords: [
      ["Evidence", "proof", "prove"],
      ["Claim", "argues", "position"],
      ["School", "students"],
    ],
    scienceMaxMarks: 4,
    markScheme: [
      "States clearly which position is better supported, rather than only which the writer personally prefers.",
      "Refers to specific evidence from Source 1 (for example the calmer mornings at Lincoln or the saving for families).",
      "Refers to specific evidence from Source 2 (for example the district that found no measurable change, or the cost of a required set).",
      "Evaluates the quality of the evidence rather than simply restating it, for example noting that a measured result is stronger than a staff impression.",
    ],
    modelAnswer:
      "This is a close case, but Source 2 is slightly better supported because it relies on a measured result while Source 1 relies mostly on impressions. Source 1 argues for uniforms and offers real reasons: staff at Lincoln Middle School recorded fewer arguments over clothing, and families can save money by buying a few sets that last the year. However, the calmer mornings come from what teachers 'said,' which is an impression rather than a measured figure. Source 2 answers with a stronger kind of evidence: it points to a district that switched to uniforms and found no measurable change in behaviour after two years. That is a checkable result, and it directly weakens Source 1's main promise. Source 2 also raises a fair cost problem for families who must buy a required set. Because Source 2 supports its position with a measured outcome and answers Source 1's strongest claim, its argument is the better supported of the two.",
  },
  assessment,
  notes
};
