// src/data/GED_ENG/ENG_1A/data.js
// Lesson 7 of the 10-lesson GED RLA blueprint: Reading for Main Idea & Supporting
// Detail. Refocused from the old broad "Foundations of Reading & Argument" unit —
// the argument/claims material now lives in ENG_1C (Lesson 9). Reading lesson
// shape: Notes + Vocab + Reading + Short Answers + Diagrams + Essay + Assessment.
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { DIAGRAMS } from './diagrams.js';
import { games } from './games.js';

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
  // Find & Fix: short informational texts on this unit's topic (finding the
  // main idea) carrying mixed errors — agreement, tense, plural, article, comma
  // splice, confusables. Everything NOT listed is correct English.
  proofread: [
    {
      id: "pf1",
      title: "Editorial: Teach the Main Idea First",
      titleVn: "Xã luận: Dạy ý chính trước",
      passage: "Every week our teachers hands students a page of text and tell them to find the main idea. Many student underline every sentence, because they has never been shown the difference between a topic and a point. A topic is a short phrase, a main idea is a full sentence about that phrase. Last year the reading scores at Hill Road School rise after teachers spent one lesson a week on this single skill. The lesson is clear: teach the main idea first, and the details will follow.",
      errors: [
        {
          id: "e1",
          wrong: "hands",
          right: "hand",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Our teachers\" is plural, so the verb has no -s: \"hand\". The second verb, \"tell\", already agrees.",
          expVn: "\"Our teachers\" là số nhiều, nên động từ không có -s: \"hand\". Động từ thứ hai, \"tell\", đã hòa hợp rồi."
        },
        {
          id: "e2",
          wrong: "Many student",
          right: "Many students",
          accept: [],
          kind: "Plural noun",
          expEn: "\"Many\" always counts more than one, so the noun must be plural: \"students\".",
          expVn: "\"Many\" luôn đếm nhiều hơn một, nên danh từ phải ở số nhiều: \"students\"."
        },
        {
          id: "e3",
          wrong: "has",
          right: "have",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"They\" is plural, so the helping verb is \"have\": \"they have never been shown\".",
          expVn: "\"They\" là số nhiều, nên trợ động từ là \"have\": \"they have never been shown\"."
        },
        {
          id: "e4",
          wrong: "phrase, a main idea",
          right: "phrase; a main idea",
          accept: ["phrase. A main idea", "phrase, but a main idea", "phrase, while a main idea", "phrase, and a main idea"],
          kind: "Comma splice",
          expEn: "Two complete sentences cannot be joined by a comma alone. Use a semicolon, a full stop, or a joining word such as \"but\".",
          expVn: "Hai câu hoàn chỉnh không thể nối chỉ bằng dấu phẩy. Dùng dấu chấm phẩy, dấu chấm, hoặc một từ nối như \"but\"."
        },
        {
          id: "e5",
          wrong: "rise",
          right: "rose",
          accept: [],
          kind: "Verb tense",
          expEn: "\"Last year\" puts the sentence in the past, and the other verb is \"spent\", so use the past form \"rose\".",
          expVn: "\"Last year\" đặt câu vào quá khứ, và động từ kia là \"spent\", nên dùng dạng quá khứ \"rose\"."
        }
      ]
    },
    {
      id: "pf2",
      title: "Notice: Summary Writing Workshop",
      titleVn: "Thông báo: Buổi tập huấn viết tóm tắt",
      passage: "The library will hold a free workshop on writing summaries on Saturday 14 March. The session is aimed at adult learners whom are preparing for a reading test. Participants will practise picking out the main idea of an short passage and dropping the details that do not matter. Places are limited to twenty, so please book early to be sure of you're place. Last month's workshop was full within three days, and the feedback were very positive. Bring a pen, a notebook and a article you have read recently.",
      errors: [
        {
          id: "e1",
          wrong: "whom are preparing",
          right: "who are preparing",
          accept: [],
          kind: "Who vs whom",
          expEn: "This word is the subject of \"are preparing\" (they are preparing), so the subject form \"who\" is correct.",
          expVn: "Từ này là chủ ngữ của \"are preparing\" (họ đang chuẩn bị), nên dạng chủ ngữ \"who\" là đúng."
        },
        {
          id: "e2",
          wrong: "an short",
          right: "a short",
          accept: [],
          kind: "Article",
          expEn: "\"Short\" begins with a consonant sound, so the article is \"a\", not \"an\".",
          expVn: "\"Short\" bắt đầu bằng âm phụ âm, nên mạo từ là \"a\", không phải \"an\"."
        },
        {
          id: "e3",
          wrong: "you're place",
          right: "your place",
          accept: [],
          kind: "Confusable words",
          expEn: "\"You're\" means \"you are\". The place belongs to you, so the possessive \"your\" is needed.",
          expVn: "\"You're\" nghĩa là \"you are\". Chỗ đó thuộc về bạn, nên cần sở hữu \"your\"."
        },
        {
          id: "e4",
          wrong: "feedback were",
          right: "feedback was",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Feedback\" is an uncountable noun and takes a singular verb: \"the feedback was very positive\".",
          expVn: "\"Feedback\" là danh từ không đếm được và dùng động từ số ít: \"the feedback was very positive\"."
        },
        {
          id: "e5",
          wrong: "a article",
          right: "an article",
          accept: [],
          kind: "Article",
          expEn: "\"Article\" begins with a vowel sound, so the article is \"an\".",
          expVn: "\"Article\" bắt đầu bằng âm nguyên âm, nên mạo từ là \"an\"."
        }
      ]
    },
    {
      id: "pf3",
      title: "From a Report on Reading Habits",
      titleVn: "Trích từ một báo cáo về thói quen đọc",
      passage: "In 2024 the city surveyed 600 adult about how they read the news. Over half said that they only read the headline and the first paragraph, than move on to the next story. Readers who slowed down and looked for the main idea remembered twice as many details a week later. The report also found that shorter articles was not always easier to summarise, because the writer's point were often hidden in the last line. The authors recommends that news sites put the main idea in the opening sentence.",
      errors: [
        {
          id: "e1",
          wrong: "600 adult",
          right: "600 adults",
          accept: [],
          kind: "Plural noun",
          expEn: "A number above one needs a plural noun: \"600 adults\".",
          expVn: "Một con số lớn hơn một cần danh từ số nhiều: \"600 adults\"."
        },
        {
          id: "e2",
          wrong: "than",
          right: "then",
          accept: [],
          kind: "Confusable words",
          expEn: "\"Than\" compares two things. \"Then\" means \"after that\", which is the meaning here.",
          expVn: "\"Than\" dùng để so sánh hai thứ. \"Then\" nghĩa là \"sau đó\", đúng với nghĩa ở đây."
        },
        {
          id: "e3",
          wrong: "was not always",
          right: "were not always",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "The subject is \"articles\" (plural), so the past-tense verb is \"were\".",
          expVn: "Chủ ngữ là \"articles\" (số nhiều), nên động từ quá khứ là \"were\"."
        },
        {
          id: "e4",
          wrong: "were often",
          right: "was often",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "The subject is \"point\" (one), not \"writer's\". One point \"was\" hidden.",
          expVn: "Chủ ngữ là \"point\" (một), không phải \"writer's\". Một điểm \"was\" bị ẩn."
        },
        {
          id: "e5",
          wrong: "recommends",
          right: "recommend",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The authors\" is plural, so the verb has no -s: \"recommend\".",
          expVn: "\"The authors\" là số nhiều, nên động từ không có -s: \"recommend\"."
        }
      ]
    }
  ],
  // The essay is a BANK: the student picks one prompt each sitting. er1 keeps
  // the original 60-minute ESL accommodation; er2 runs at the real test's 45.
  essay: [
    {
      id: "er1",
      title: "School uniforms",
      titleVn: "Đồng phục học sinh",
      // A test-length Extended Response: two kinds of writing with bylines,
      // ~600 words between them, evidence on both sides. Practice allows 60
      // minutes (an ESL accommodation); exam conditions are always the real 45.
      minutesAllowed: 60,
      sources: [
        {
          type: "Op-ed",
          title: "The Case for School Uniforms",
          byline: "By Karen Mills, principal of Lincoln Middle School",
          text: [
            "Schools should require students to wear a simple uniform. Three years ago, Lincoln Middle School became the first school in our district to try it, and I have watched the results every day since.",
            "In the first year, staff recorded far fewer arguments over clothing and brand-name pressure, and teachers told me that the mornings ran more calmly. Students no longer spend the first ten minutes of class comparing sneakers. A shared uniform quietly reminds every student that they belong to the same school.",
            "Uniforms can also save families money. Instead of buying new outfits to keep up with fashion, parents buy two or three sets that last the whole year. At Lincoln, a set of two shirts and two pairs of pants costs about $60, and the school gives free sets to any family that asks.",
            "The change has been popular, too. When we asked Lincoln families at the end of the first year, 7 in 10 of the parents who answered said they wanted to keep the uniform. Several told me that getting ready for school had stopped being a daily fight. Our attendance office also reports that far fewer students are now sent home for breaking the dress code, because there is almost nothing left to argue about.",
            "Some parents worried that their children would lose a way to express themselves. But students still choose their shoes, bags, hair and jackets, and they express themselves in their work, their clubs and their friendships. A shirt is not a personality.",
            "Most importantly, uniforms keep the focus on learning. When I visit other schools, I can see the difference the moment I walk through the door. Every school that cares about learning should follow Lincoln's lead.",
          ].join("\n\n"),
        },
        {
          type: "Letter to the editor",
          title: "Uniforms Miss the Point",
          byline: "From Dr. James Ortiz, an education researcher at Hillcrest University and the parent of a middle school student",
          text: [
            "A uniform is an easy answer to a hard question. Requiring one does nothing about the real causes of trouble at school, such as bullying, crowded classrooms or boredom in lessons.",
            "The best evidence we have shows little effect. When the Clearwater district switched all of its middle schools to uniforms, it tracked discipline reports, attendance and test scores for two years and compared them with the two years before. It found no measurable change in student behavior, and attendance stayed the same. A national review of uniform policies reached a similar conclusion: schools that adopted uniforms did not become safer or calmer than similar schools that did not.",
            "Supporters often point to one school's calmer mornings, but a single school's experience can be misleading. A new rule usually arrives with other changes — a new principal, new teachers, more attention from parents — and any of them could explain a calmer year. That is why researchers compare schools that adopted uniforms with similar schools that did not, instead of asking the staff who chose the rule whether it worked.",
            "Uniforms also cost money that some families do not have, because a required set must be bought whether or not last year's clothes still fit. For a family with three children, even a cheap uniform can mean hundreds of dollars at the start of the school year.",
            "Finally, there is what students learn from a rule like this. Teenagers learn respect from how they are treated, not from matching shirts. When a school spends its energy checking the color of students' socks, it is not spending that energy on the things that actually help students behave well.",
          ].join("\n\n"),
        },
      ],
      task:
        "Both writers argue about whether schools should require students to wear a uniform. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State clearly which position is better supported.",
        "Read each byline: who is the writer, and how might that shape what they say?",
        "Weigh the evidence: what was measured, and what is only an impression?",
        "Concede the other side's best point, then answer it.",
      ],
      suggestedWords: [
        ["Evidence", "proof", "prove"],
        ["Claim", "argues", "position"],
        ["measured", "impression"],
      ],
    },
    {
      id: "er2",
      title: "Tipping or service charge",
      titleVn: "Tiền boa hay phí dịch vụ",
      minutesAllowed: 45,
      sources: [
        {
          title: "Replace Tips with a Service Charge",
          text:
            "Restaurants should stop relying on tips and add a fixed service charge to every bill instead. Tipping leaves a server's pay to the mood of each customer, so two people doing the same work on the same night can go home with very different wages. When the Harbour Grill in Portside replaced tips with a twelve percent service charge, the owner reported that the kitchen staff, who had never received tips, saw their pay rise by about fifteen percent, and staff turnover fell by a third over the following year. Customers also knew the full price before they ordered, so there were fewer arguments at the till. A service charge is honest: it puts the real cost of the meal on the menu, and it shares the money fairly among everyone who made the meal happen, not only the person who carried it to the table.",
        },
        {
          title: "Keep Tipping",
          text:
            "A service charge takes away the one tool a customer has to reward good service. When a tip is optional, a server has a reason to be attentive, and most diners are happy to pay more for a meal that went well. A fixed charge removes that link, and it is easy to predict what follows: service will become slower and less friendly, because the money arrives whether the server tries or not. Many experienced servers also say they would earn less under a service charge, since a generous table can tip twenty percent or more. Diners dislike being told what to pay, too; a survey by a restaurant magazine found that most of its readers preferred to decide the amount themselves. Tipping is not perfect, but it rewards effort directly, and a restaurant that treats its staff well will find that customers notice and pay accordingly.",
        },
      ],
      task:
        "Both writers argue about whether restaurants should replace tipping with a fixed service charge. In your response, analyze both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State clearly which position is better supported.",
        "Use specific evidence from BOTH sources.",
        "Weigh how strong each side's evidence is — a measured result beats a prediction.",
        "Write in paragraphs, with a short conclusion.",
      ],
      suggestedWords: [
        ["Evidence", "proof", "prove"],
        ["Claim", "argues", "position"],
        ["Tip", "service charge", "pay"],
      ],
    },
  ],
  assessment,
  games,
  notes
};
