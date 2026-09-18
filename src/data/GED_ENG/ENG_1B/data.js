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
import { games } from './games.js';

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
  // Find & Fix: short informational texts on this unit's topic (purpose, tone,
  // bias) carrying mixed errors — agreement, tense, plural, article, comma
  // splice, confusables. Everything NOT listed is correct English.
  proofread: [
    {
      id: "pf1",
      title: "Editorial: Say Which Side You Are On",
      titleVn: "Xã luận: Hãy nói rõ bạn đứng về phía nào",
      passage: "Every newspaper have a point of view, even the ones that claims to be neutral. When our local paper describe the new car park as 'a bold step forward', it is not informing us, it is persuading us. Readers deserve to know when they are reading a opinion. Other papers now label every editorial clearly, and their readers say they trust the news pages more as a result. We should do the same.",
      errors: [
        {
          id: "e1",
          wrong: "have",
          right: "has",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Every newspaper\" is singular, so the verb is \"has\".",
          expVn: "\"Every newspaper\" là số ít, nên động từ là \"has\"."
        },
        {
          id: "e2",
          wrong: "claims",
          right: "claim",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"That\" stands for \"the ones\" (plural newspapers), so the verb has no -s: \"claim\".",
          expVn: "\"That\" thay cho \"the ones\" (các tờ báo, số nhiều), nên động từ không có -s: \"claim\"."
        },
        {
          id: "e3",
          wrong: "describe",
          right: "describes",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Our local paper\" is one newspaper, so the present-tense verb takes an -s: \"describes\".",
          expVn: "\"Our local paper\" là một tờ báo, nên động từ thì hiện tại mang -s: \"describes\"."
        },
        {
          id: "e4",
          wrong: "informing us, it is persuading",
          right: "informing us; it is persuading",
          accept: ["informing us. It is persuading", "informing us, but it is persuading", "informing us — it is persuading"],
          kind: "Comma splice",
          expEn: "Two complete sentences cannot be joined by a comma alone. Use a semicolon, a full stop, or a joining word such as \"but\".",
          expVn: "Hai câu hoàn chỉnh không thể nối chỉ bằng dấu phẩy. Dùng dấu chấm phẩy, dấu chấm, hoặc một từ nối như \"but\"."
        },
        {
          id: "e5",
          wrong: "a opinion",
          right: "an opinion",
          accept: [],
          kind: "Article",
          expEn: "\"Opinion\" begins with a vowel sound, so the article is \"an\".",
          expVn: "\"Opinion\" bắt đầu bằng âm nguyên âm, nên mạo từ là \"an\"."
        }
      ]
    },
    {
      id: "pf2",
      title: "Notice: Spot the Bias",
      titleVn: "Thông báo: Nhận ra thiên kiến",
      passage: "The community centre is offering a free class on reading the news with care. Over four Tuesday evenings, students will learn to hear a writer's tone, to separate fact from opinion, and to notice when a report only show one side. The class are open to anyone over sixteen. Last term thirty people attended, and most of them says they now read the newspaper differently. Their is no need to book. Just come to Room 4 at seven o'clock, the door will be open.",
      errors: [
        {
          id: "e1",
          wrong: "show",
          right: "shows",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "The subject is \"a report\" (one), so the verb takes an -s: \"shows\".",
          expVn: "Chủ ngữ là \"a report\" (một), nên động từ mang -s: \"shows\"."
        },
        {
          id: "e2",
          wrong: "class are",
          right: "class is",
          accept: [],
          kind: "Collective noun",
          expEn: "\"The class\" is a collective noun — one group — so it takes the singular verb \"is\".",
          expVn: "\"The class\" là danh từ tập hợp — một nhóm — nên dùng động từ số ít \"is\"."
        },
        {
          id: "e3",
          wrong: "says",
          right: "say",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "The subject is \"most\" of the people (plural), so the verb has no -s: \"say\".",
          expVn: "Chủ ngữ là \"most\" trong số những người đó (số nhiều), nên động từ không có -s: \"say\"."
        },
        {
          id: "e4",
          wrong: "Their is",
          right: "There is",
          accept: [],
          kind: "Confusable words",
          expEn: "\"Their\" shows ownership. \"There is\" introduces something that exists, which is the meaning here.",
          expVn: "\"Their\" chỉ sự sở hữu. \"There is\" giới thiệu một điều tồn tại, đúng với nghĩa ở đây."
        },
        {
          id: "e5",
          wrong: "o'clock, the door",
          right: "o'clock; the door",
          accept: ["o'clock. The door", "o'clock, and the door", "o'clock — the door"],
          kind: "Comma splice",
          expEn: "Two complete sentences cannot be joined by a comma alone. Use a semicolon, a full stop, or add \"and\".",
          expVn: "Hai câu hoàn chỉnh không thể nối chỉ bằng dấu phẩy. Dùng dấu chấm phẩy, dấu chấm, hoặc thêm \"and\"."
        }
      ]
    },
    {
      id: "pf3",
      title: "From a Report on How Readers Judge Tone",
      titleVn: "Trích từ một báo cáo về cách người đọc đánh giá giọng điệu",
      passage: "Researchers at a city college asked 200 readers to rate the same news story written in two ways. One version used neutral words such as 'change' and 'plan'; the other used loaded words such as 'reckless' and 'scheme'. Although the facts in both versions was identical, readers rated the second story as far less fair. The effect were strongest among readers who read quickly. The researchers concluded that word choice shape a reader's judgement more then the facts do, and they recommend that news writers check every adjectives before publishing.",
      errors: [
        {
          id: "e1",
          wrong: "was identical",
          right: "were identical",
          accept: [],
          kind: "Interrupting phrase",
          expEn: "The subject is \"facts\" (plural), not \"versions\". Cross out \"in both versions\" and the verb is \"were\".",
          expVn: "Chủ ngữ là \"facts\" (số nhiều), không phải \"versions\". Gạch bỏ \"in both versions\" và động từ là \"were\"."
        },
        {
          id: "e2",
          wrong: "were strongest",
          right: "was strongest",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The effect\" is one thing, so the past-tense verb is \"was\".",
          expVn: "\"The effect\" là một thứ, nên động từ quá khứ là \"was\"."
        },
        {
          id: "e3",
          wrong: "shape",
          right: "shapes",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"Word choice\" is singular, so the present-tense verb takes an -s: \"shapes\".",
          expVn: "\"Word choice\" là số ít, nên động từ thì hiện tại mang -s: \"shapes\"."
        },
        {
          id: "e4",
          wrong: "then",
          right: "than",
          accept: [],
          kind: "Confusable words",
          expEn: "\"More … than\" is a comparison, so the word is \"than\". \"Then\" means \"after that\".",
          expVn: "\"More … than\" là một phép so sánh, nên từ đúng là \"than\". \"Then\" nghĩa là \"sau đó\"."
        },
        {
          id: "e5",
          wrong: "every adjectives",
          right: "every adjective",
          accept: [],
          kind: "Singular after every",
          expEn: "\"Every\" is followed by a singular noun: \"every adjective\".",
          expVn: "Sau \"every\" là danh từ số ít: \"every adjective\"."
        }
      ]
    }
  ],
  // The essay is a BANK: the student picks one prompt each sitting. er1 keeps
  // the original 60-minute ESL accommodation; er2 runs at the real test's 45.
  essay: [
    {
      id: "er1",
      title: "Community service requirement",
      titleVn: "Yêu cầu phục vụ cộng đồng",
      // A test-length Extended Response: two kinds of writing with bylines,
      // ~600 words between them, evidence on both sides. Practice allows 60
      // minutes (an ESL accommodation); exam conditions are always the real 45.
      minutesAllowed: 60,
      sources: [
        {
          type: "Speech",
          title: "Make Service a Graduation Requirement",
          byline: "Excerpt from remarks by Linda Owusu, a member of the Oak Ridge school board, at a state education hearing",
          text: [
            "Thank you for the chance to speak. Four years ago, Oak Ridge High added a simple rule: before graduating, every student must complete forty hours of community service. I am here to tell you what happened.",
            "In the year before the rule, fewer than one senior in five volunteered anywhere. In the first year after it, every senior did, because they had to, and many did far more than forty hours. When we surveyed that class a year after graduation, 62 percent said they were still volunteering.",
            "Our local charities noticed the difference. The director of the Oak Ridge food bank says that student volunteers now cover nearly a third of its Saturday shifts, and the animal shelter has a waiting list of teenagers who want to help. The rule cost the school almost nothing to run: a part-time coordinator and a simple online form for logging hours.",
            "Service teaches lessons a classroom cannot. Students learn to show up on time, work beside strangers and see how their town actually runs. One of our graduates, who spent her hours at a food bank, now manages it. She told me the requirement changed her life. Colleges notice, too: our counselors report that service hours now appear in almost every Oak Ridge college application.",
            "Some people say that a required good deed is not a real one. But we require students to take math and to read novels, and nobody says those lessons do not count because they were required. Sometimes young people need a push to discover what they are capable of.",
            "I urge this committee to make community service a requirement in every high school in the state.",
          ].join("\n\n"),
        },
        {
          type: "Op-ed",
          title: "Service Should Be a Choice",
          byline: "By Marcus Webb, director of the Hillside Volunteer Center",
          text: [
            "I have spent twenty years matching volunteers with local charities, and nothing makes me happier than seeing young people serve. But requiring service turns a good deed into a chore.",
            "A student who volunteers only to tick a box learns little about kindness. Every spring, our center fills with seniors rushing to finish their hours before graduation, and most of them never come back. One told me she had spent her last ten hours sorting the same box of donated books twice. The rule also falls hardest on teenagers who already work paid jobs to help their families; for them, forty unpaid hours can mean forty hours of lost wages.",
            "The research supports this. When the Pine Valley district required service for five years and then dropped the rule, researchers compared graduates from both periods. Three years after graduation, 31 percent of the students who had been required to serve were still volunteering — almost exactly the same as the 30 percent of students who had never been required to.",
            "Supporters of a requirement often point to surveys of students who were required to serve. Those surveys cannot tell us much on their own, because they have nothing to compare with: many of those students might have volunteered anyway. Only a comparison between required and non-required students can show what the rule itself changed, and when that comparison was made, the answer was almost nothing.",
            "Schools that want more young volunteers should make service easy instead of mandatory: give course credit for it, bring charities into school, and let students choose causes they care about. Real generosity cannot be forced onto a form.",
          ].join("\n\n"),
        },
      ],
      task:
        "Both writers argue about whether high schools should require community service to graduate. In your response, analyse both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State clearly which position is better supported.",
        "Read each byline: who is the writer, and what have they seen for themselves?",
        "Ask who each survey or study compared. Following one group is weaker than comparing two.",
        "Concede the other side's best point, then answer it.",
      ],
      suggestedWords: [
        ["Evidence", "proof", "prove"],
        ["Claim", "argues", "position"],
        ["compared", "survey"],
      ],
    },
    {
      id: "er2",
      title: "Year-round school",
      titleVn: "Trường học quanh năm",
      minutesAllowed: 45,
      sources: [
        {
          title: "Switch to a Year-Round Calendar",
          text:
            "Schools should spread the school year across all twelve months, with several short breaks instead of one long summer holiday. The long summer is when learning leaks away: teachers spend the first weeks of every autumn re-teaching what students knew in June. When the Brookfield district moved to a year-round calendar, it kept the same 180 school days but split the holidays into four breaks of three weeks. After two years, the district's own tests showed that the reading scores of its youngest students were eight percent higher than those of children in the neighbouring district, which had kept the traditional calendar, and absences in the first month of each term fell by a quarter. Short breaks also help working parents, who struggle to find ten weeks of childcare every summer. The same number of days, spread more evenly, simply teaches more.",
        },
        {
          title: "Keep the Summer",
          text:
            "A long summer break is not wasted time. It is when children work summer jobs, visit family who live far away, attend camps and learn things a classroom cannot teach. A year-round calendar would take much of that away, and it is likely to cost more: schools would need air conditioning in the hottest months and would have to pay for cleaning and staff across the whole year. Families with children at different schools could find that their breaks no longer match, which would make a family holiday almost impossible. Many teachers also use the summer to take courses and to rest, and a tired teacher in July is not a better teacher. Some year-round districts report that parents were unhappy enough to move their children to other schools. The traditional calendar has worked for generations, and there is no strong reason to change it.",
        },
      ],
      task:
        "Both writers argue about whether schools should switch to a year-round calendar. In your response, analyze both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State clearly which position is better supported.",
        "Use specific evidence from BOTH sources.",
        "Weigh how strong each side's evidence is — a measured result beats a prediction.",
        "Write in paragraphs, with a short conclusion.",
      ],
      suggestedWords: [
        ["Evidence", "proof", "prove"],
        ["Claim", "argues", "position"],
        ["Calendar", "summer", "break"],
      ],
    },
  ],
  assessment,
  games,
  notes
};
