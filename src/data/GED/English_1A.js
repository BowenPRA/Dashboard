// src/data/GED/English_1A.js
export const ENGLISH_1A_DATA = {
  // =========================================================================
  // 1. UNIFIED ARCHITECTURE METADATA BLOCKS
  // =========================================================================
  meta: {
    id: "ENG_1A",
    title: "English for the GED: Foundations of Reading & Argument",
    desc: "An introduction to reading comprehension, identifying author's purpose, recognizing tone, and understanding basic claims and evidence.",
    track: "GED",
    icon: "GraduationCap"
  },
  phases: {
    phase1: {
      unlocked: true,
      tasks: ["WORD_REC", "SPELLING", "READ_COMP", "DICTATION"]
    },
    phase2: {
      unlocked: false,
      tasks: ["VOCAB_WRITING", "SHORT_ANSWERS", "DIAGRAMS"]
    },
    phase3: {
      unlocked: false,
      tasks: ["ASSESSMENT", "ESSAY"]
    }
  },

  // =========================================================================
  // 2. ROOT-LEVEL HYBRID FALLBACK ARRAYS 
  // =========================================================================
  
  realWords: [
    {
      word: "Theme",
      vn: "Chủ đề",
      def: "The main subject, topic, or underlying message in a piece of writing.",
      vnDef: "Chủ đề chính, đề tài hoặc thông điệp ẩn chứa trong một bài viết.",
      sent: "The central theme of the story is the importance of family and loyalty.", 
      vnSent: "Chủ đề trung tâm của câu chuyện là tầm quan trọng của gia đình và lòng trung thành.",
      dictSent: "Understanding the theme helps you grasp the author's overall message.",
      isReal: true
    },
    {
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason an author writes a text, such as to inform, persuade, or entertain.",
      vnDef: "Lý do tác giả viết một văn bản, chẳng hạn như để thông tin, thuyết phục hoặc giải trí.",
      sent: "The writer's primary purpose is to persuade the reader to protect the environment.",
      vnSent: "Mục đích chính của người viết là thuyết phục người đọc bảo vệ môi trường.",
      dictSent: "Always ask yourself what the author's main purpose is before answering the questions.",
      isReal: true
    },
    {
      word: "Tone",
      vn: "Giọng điệu",
      def: "The author's attitude or feeling toward the subject they are writing about.",
      vnDef: "Thái độ hoặc cảm xúc của tác giả đối với chủ đề họ đang viết.",
      sent: "The serious tone of the article matched the tragedy of the breaking news.",
      vnSent: "Giọng điệu nghiêm túc của bài báo phù hợp với thảm kịch của tin tức nóng hổi.",
      dictSent: "You can often guess the tone by looking at the descriptive adjectives used.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "Facts, statistics, or examples that support an author's claim or argument.",
      vnDef: "Sự thật, số liệu thống kê hoặc ví dụ hỗ trợ cho tuyên bố hoặc lập luận của tác giả.",
      sent: "The lawyer presented strong evidence to prove his client was innocent.",
      vnSent: "Luật sư đã đưa ra bằng chứng mạnh mẽ để chứng minh thân chủ của mình vô tội.",
      dictSent: "Good writers always back up their claims with solid and reliable evidence.",
      isReal: true
    },
    {
      word: "Fact",
      vn: "Sự thật (Dữ kiện)",
      def: "A statement that can be proven true or false with objective information.",
      vnDef: "Một tuyên bố có thể được chứng minh là đúng hoặc sai bằng thông tin khách quan.",
      sent: "It is a scientific fact that water boils at one hundred degrees Celsius.",
      vnSent: "Đó là một sự thật khoa học rằng nước sôi ở một trăm độ C.",
      dictSent: "A strong argument relies on fact rather than raw emotion or personal bias.",
      isReal: true
    },
    {
      word: "Opinion",
      vn: "Ý kiến cá nhân",
      def: "A personal belief or judgment that cannot be objectively proven true or false.",
      vnDef: "Một niềm tin hoặc đánh giá cá nhân không thể được chứng minh một cách khách quan là đúng hay sai.",
      sent: "Saying that pizza is the best food in the world is just an opinion.",
      vnSent: "Nói rằng pizza là món ăn ngon nhất trên thế giới chỉ là một ý kiến cá nhân.",
      dictSent: "Be careful not to confuse a writer's opinion with actual historical facts.",
      isReal: true
    },
    {
      word: "Transition",
      vn: "Sự chuyển tiếp",
      def: "Words or phrases that connect ideas and help a text flow smoothly from one thought to the next.",
      vnDef: "Các từ hoặc cụm từ kết nối các ý tưởng và giúp văn bản trôi chảy từ suy nghĩ này sang suy nghĩ khác.",
      sent: "Words like 'however' and 'therefore' act as a transition between paragraphs.",
      vnSent: "Các từ như 'tuy nhiên' và 'do đó' đóng vai trò như sự chuyển tiếp giữa các đoạn văn.",
      dictSent: "A good transition makes it much easier for the reader to follow your logic.",
      isReal: true
    },
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The main argument or point that a writer is trying to make and defend.",
      vnDef: "Lập luận hoặc điểm chính mà người viết đang cố gắng đưa ra và bảo vệ.",
      sent: "The author's main claim is that daily exercise improves long-term mental health.",
      vnSent: "Luận điểm chính của tác giả là tập thể dục hàng ngày cải thiện sức khỏe tinh thần lâu dài.",
      dictSent: "Every persuasive essay must have a clear and strong claim at the beginning.",
      isReal: true
    },
    {
      word: "Analyze",
      vn: "Phân tích",
      def: "To examine something carefully in order to understand its different parts and meaning.",
      vnDef: "Kiểm tra điều gì đó cẩn thận để hiểu các phần khác nhau và ý nghĩa của nó.",
      sent: "Students must analyze the poem to find its hidden message about nature.",
      vnSent: "Học sinh phải phân tích bài thơ để tìm ra thông điệp ẩn giấu của nó về thiên nhiên.",
      dictSent: "You will need to analyze the data carefully before making a final decision.",
      isReal: true
    },
    {
      word: "Conclude",
      vn: "Kết luận",
      def: "To bring to an end or to reach a logical decision based on the information provided.",
      vnDef: "Kết thúc hoặc đạt được một quyết định logic dựa trên thông tin được cung cấp.",
      sent: "After reading the report, we can conclude that the new project was a success.",
      vnSent: "Sau khi đọc báo cáo, chúng ta có thể kết luận rằng dự án mới đã thành công.",
      dictSent: "Your final paragraph should effectively conclude your entire argument for the reader.",
      isReal: true
    }
  ],

  fakeWords: [
    { word: "Themation", imitating: "Theme", isReal: false },
    { word: "Purposion", imitating: "Purpose", isReal: false },
    { word: "Tonalism", imitating: "Tone", isReal: false },
    { word: "Evidense", imitating: "Evidence", isReal: false },
    { word: "Factify", imitating: "Fact", isReal: false },
    { word: "Opinism", imitating: "Opinion", isReal: false },
    { word: "Transitate", imitating: "Transition", isReal: false },
    { word: "Claimation", imitating: "Claim", isReal: false },
    { word: "Analyzation", imitating: "Analyze", isReal: false },
    { word: "Concludence", imitating: "Conclude", isReal: false }
  ],

  dictation: [
    { sent: "Understanding the theme helps you grasp the author's overall message.", vnSent: "Hiểu được chủ đề giúp bạn nắm bắt được thông điệp tổng thể của tác giả." },
    { sent: "Always ask yourself what the author's main purpose is before answering the questions.", vnSent: "Luôn tự hỏi mục đích chính của tác giả là gì trước khi trả lời các câu hỏi." },
    { sent: "You can often guess the tone by looking at the descriptive adjectives used.", vnSent: "Bạn thường có thể đoán được giọng điệu bằng cách nhìn vào các tính từ miêu tả được sử dụng." },
    { sent: "Good writers always back up their claims with solid and reliable evidence.", vnSent: "Những người viết tốt luôn củng cố luận điểm của họ bằng bằng chứng vững chắc và đáng tin cậy." },
    { sent: "A strong argument relies on fact rather than raw emotion or personal bias.", vnSent: "Một lập luận mạnh mẽ dựa trên sự thật hơn là cảm xúc nhất thời hoặc thành kiến cá nhân." },
    { sent: "Be careful not to confuse a writer's opinion with actual historical facts.", vnSent: "Hãy cẩn thận đừng nhầm lẫn ý kiến của người viết với sự thật lịch sử thực tế." },
    { sent: "A good transition makes it much easier for the reader to follow your logic.", vnSent: "Một sự chuyển tiếp tốt làm cho người đọc dễ dàng theo dõi logic của bạn hơn nhiều." },
    { sent: "Every persuasive essay must have a clear and strong claim at the beginning.", vnSent: "Mỗi bài luận thuyết phục phải có một luận điểm rõ ràng và mạnh mẽ ngay từ đầu." },
    { sent: "You will need to analyze the data carefully before making a final decision.", vnSent: "Bạn sẽ cần phân tích dữ liệu cẩn thận trước khi đưa ra quyết định cuối cùng." },
    { sent: "Your final paragraph should effectively conclude your entire argument for the reader.", vnSent: "Đoạn văn cuối cùng của bạn nên kết luận một cách hiệu quả toàn bộ lập luận của bạn cho người đọc." }
  ],

  passages: [
    {
      id: "passage_1",
      title: "Understanding the Author's Intent",
      text: "Every text is written with a specific {purpose}. Sometimes an author wants to teach you a {fact} about history, while other times they want to convince you to agree with their {opinion}. Figuring out the 'why' behind the writing is the very first step to good reading comprehension and analysis.",
      vnText: "Mỗi văn bản được viết với một mục đích cụ thể. Đôi khi tác giả muốn dạy cho bạn một sự thật về lịch sử, trong khi những lúc khác họ muốn thuyết phục bạn đồng ý với ý kiến của họ. Tìm ra lý do 'tại sao' đằng sau bài viết là bước đầu tiên để đọc hiểu và phân tích tốt."
    },
    {
      id: "passage_2",
      title: "Listening to the Writer's Voice",
      text: "You can tell a lot about a text by paying attention to the {tone}. If the author uses angry or urgent words, they are likely upset about the {theme} they are discussing. Paying attention to these emotional clues helps you {analyze} the true meaning behind the words on the page.",
      vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến giọng điệu. Nếu tác giả sử dụng những từ ngữ tức giận hoặc khẩn cấp, có thể họ đang bực tức về chủ đề mà họ đang thảo luận. Chú ý đến những manh mối cảm xúc này giúp bạn phân tích ý nghĩa thực sự đằng sau những từ ngữ trên trang giấy."
    },
    {
      id: "passage_3",
      title: "Building a Solid Argument",
      text: "To make a strong {claim}, a writer cannot simply state what they believe. They must provide solid {evidence} to back it up. Furthermore, using a smooth {transition} between sentences ensures that the reader does not get confused as the argument builds toward the end.",
      vnText: "Để đưa ra một luận điểm mạnh mẽ, người viết không thể chỉ đơn giản nêu ra những gì họ tin tưởng. Họ phải cung cấp bằng chứng vững chắc để chứng minh. Hơn nữa, việc sử dụng sự chuyển tiếp mượt mà giữa các câu đảm bảo rằng người đọc không bị nhầm lẫn khi lập luận được xây dựng về cuối."
    }
  ],

  notebookArticle: {
    title: "Unit 1A: Foundations of Reading & Argument",
    vnTitle: "Bài 1A: Cơ sở của việc Đọc hiểu & Lập luận",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. The Author's Intent",
        vnHeading: "1. Ý định của Tác giả",
        text: "Every text is written with a specific **Purpose**. Sometimes an author wants to teach you a **Fact**, while other times they want to share their **Opinion**.",
        vnText: "Mỗi văn bản được viết với một **Mục đích** cụ thể. Đôi khi tác giả muốn dạy cho bạn một **Sự thật**, trong khi những lúc khác họ muốn chia sẻ **Ý kiến** của họ."
      },
      {
        heading: "2. Voice and Message",
        vnHeading: "2. Giọng điệu và Thông điệp",
        text: "You can tell a lot about a text by paying attention to the **Tone**. Paying attention to these emotional clues helps you **Analyze** the true meaning and **Theme** behind the words.",
        vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến **Giọng điệu**. Chú ý đến những manh mối cảm xúc này giúp bạn **Phân tích** ý nghĩa thực sự và **Chủ đề** đằng sau những từ ngữ."
      },
      {
        heading: "3. Building an Argument",
        vnHeading: "3. Xây dựng một Lập luận",
        text: "To make a strong **Claim**, a writer must provide solid **Evidence**. Using a smooth **Transition** between sentences ensures the reader can follow along until you **Conclude** the argument.",
        vnText: "Để đưa ra một **Luận điểm** mạnh mẽ, người viết phải cung cấp **Bằng chứng** vững chắc. Sử dụng **Sự chuyển tiếp** mượt mà giữa các câu đảm bảo người đọc có thể theo dõi cho đến khi bạn **Kết luận** lập luận."
      }
    ]
  },

  shortQA: [
    {
      id: "q1",
      question: "Why is it helpful for a reader to identify the author's purpose before reading a long passage?",
      requiredWords: [["understand", "understanding"], ["expect", "expectations"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it helps the reader know what to expect from the text.",
        "1 mark for explaining that it makes it easier to understand the main message."
      ],
      modelAnswer: "Identifying the author's purpose is helpful because it tells the reader what to expect, making it much easier to understand the main message of the text."
    },
    {
      id: "q2",
      question: "What is the primary difference between a fact and an opinion in an informational text?",
      requiredWords: [["prove", "proven", "proof"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a fact can be proven with objective evidence.",
        "1 mark for stating that an opinion is a personal belief that cannot be proven."
      ],
      modelAnswer: "The primary difference is that a fact can be objectively proven with evidence, whereas an opinion is a personal belief that cannot be proven."
    },
    {
      id: "q3",
      question: "Why must a writer include evidence when making a strong claim?",
      requiredWords: [["support", "prove", "back"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that evidence is needed to prove the claim is true.",
        "1 mark for noting that without evidence, the claim is just an unsupported opinion."
      ],
      modelAnswer: "A writer must include evidence to prove that their claim is true; otherwise, their argument is simply an unsupported opinion."
    }
  ],

  diagrams: [
    {
      id: "d1",
      imageUrl: "/images/GED/reading_map1.png",
      promptText: "Look at the basic paragraph structure chart. In which section does the author usually introduce their main claim?",
      requiredWords: [["beginning", "start", "first"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the beginning or introduction.",
        "1 mark for explaining that this sets up the argument for the rest of the paragraph."
      ],
      modelAnswer: "The author usually introduces their main claim at the very beginning of the paragraph to clearly set up the argument."
    },
    {
      id: "d2",
      imageUrl: "/images/GED/fact_opinion1.png",
      promptText: "Review the graphic sorting statements. What is the key feature that separates the statements in the 'Fact' column from the 'Opinion' column?",
      requiredWords: [["proof", "proven", "prove"], ["objective", "evidence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that facts can be proven with objective evidence.",
        "1 mark for noting that opinions cannot be proven."
      ],
      modelAnswer: "The key feature is that facts can be proven true or false with objective evidence, whereas opinions are personal beliefs that cannot be proven."
    }
  ],

  essay: {
    task: "Explain why it is important for a reader to be able to distinguish between an author's objective facts and personal opinions when reading the news.",
    guidelines: [
      "Define what makes a statement a fact.",
      "Define what makes a statement an opinion.",
      "Explain the danger of confusing the two when reading news."
    ],
    requiredWords: [
      ["Fact", "facts"], 
      ["Opinion", "opinions", "beliefs"],
      ["Evidence", "prove", "proof"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately defining a fact (can be proven).",
      "1 mark for accurately defining an opinion (personal belief).",
      "1 mark for explaining that confusing them can lead to misinformation or biased thinking."
    ],
    modelAnswer: "It is incredibly important to distinguish between the two because a fact can be proven with objective evidence, while an opinion is just a personal belief. When reading the news, if a reader cannot tell the difference, they might mistake a writer's biased opinion for the absolute truth, leading to misinformation and a lack of critical thinking."
  },

  // =========================================================================
  // 3. NEW ASSESSMENT ARCHITECTURE (MULTI-PASSAGE & TIME LIMITS)
  // =========================================================================
  assessment: {
    timeLimit: 2700, // Increased to 45 Minutes due to 5 passages
    passages: [
      {
        id: "p1_gardens",
        title: "The Case for Community Gardens",
        meta: "Editorial: City Planning Board Review",
        text: [
          "A community garden is a shared space where people come together to grow food and plants. This is an indisputable fact. Currently, the Riverton City Council is debating whether to turn the empty lot on 4th Street into a community garden or a commercial shopping mall. While some argue that commercial development brings immediate tax revenue, building a shopping mall on our last remaining green space is incredibly shortsighted.",
          "The primary purpose of our town should be to foster a healthy, connected community, not just generate cold, hard cash. Numerous academic studies have shown that access to green spaces significantly reduces neighborhood stress levels and lowers local crime rates. Therefore, the claim that we must build a mall to improve our town's quality of life is completely false. We need the garden to ensure a better future for our children."
        ],
        glossary: {
          "fact": { "def": "A statement that can be proven true or false.", "vn": "Sự thật", "vnDef": "Một tuyên bố có thể được chứng minh là đúng hay sai." },
          "purpose": { "def": "The reason an author writes or an action is done.", "vn": "Mục đích", "vnDef": "Lý do tác giả viết hoặc một hành động được thực hiện." },
          "claim": { "def": "The main argument a writer is trying to defend.", "vn": "Luận điểm", "vnDef": "Lập luận chính mà người viết đang cố gắng bảo vệ." }
        }
      },
      {
        id: "p_hist_1898",
        title: "Historical Opinion: The Eight-Hour Workday",
        meta: "Adapted from an 1898 address by labor leader Unionist Thomas O'Donnell",
        text: [
          "For decades, the American industrial worker has been treated as little more than an extension of the iron machinery he operates. We hear from the captains of industry that to shorten the workday from twelve hours to eight would invite economic ruin, decrease national productivity, and encourage idleness among the working classes. I stand before you today to argue that this claim is not only false, but it also ignores the fundamental laws of human nature and economic progress.",
          "First, let us examine the argument of productivity. A exhausted man is not an efficient man. When a laborer is forced to toil for twelve hours in a dark, poorly ventilated factory, his physical strength wanes long before his shift concludes. The work performed in the final four hours of a twelve-hour day is marked by fatigue, leading to frequent errors, ruined materials, and tragic, preventable workplace accidents. By limiting the workday to eight hours, we restore the worker’s vitality. A rested worker is alert, precise, and highly motivated. Historical evidence from factories that have voluntarily adopted the eight-hour standard reveals that total daily output does not decrease; rather, it often increases due to the heightened efficiency and focus of the workforce.",
          "Second, we must consider the moral and social dimensions of this issue. Opponents of our movement argue that additional leisure hours will lead workers to vice and degradation. What a cynical view of the American citizen! When a man is worked to the point of utter exhaustion, he has no time or energy remaining to cultivate his mind, care for his children, or participate in the civic life of his community. He is reduced to a state of mere survival. Give the worker eight hours for work, eight hours for rest, and eight hours for what he wills. With those eight hours of personal time, the worker will seek education, enjoy his family, and become a more informed, responsible participant in our democracy.",
          "The wealth of our nation should not be measured solely by the bank accounts of our monopolists, but by the health, intelligence, and dignity of our producing classes. The eight-hour day is not a plea for charity; it is a demand for justice and a necessary step toward a stronger, more prosperous republic."
        ]
      },
      {
        id: "p_handwriting",
        title: "The Decline of Handwriting",
        meta: "Contemporary Opinion Piece",
        text: [
          "In an era dominated by touchscreens and voice-to-text technology, the traditional art of handwriting is quietly facing extinction. Across the nation, school districts are dropping cursive from their mandatory curricula, and keyboard proficiency has taken center stage. While efficiency advocates celebrate this shift as a victory for modernization, we are sacrificing a profound cognitive tool in our rush to embrace the digital future.",
          "The primary argument for abandoning handwriting is speed. Proponents of digital-first education argue that typing allows students to capture information much faster than writing by hand ever could. This is undoubtedly true, but it confuses transcription with comprehension. When students type lecture notes on a laptop, they tend to record the speaker's words verbatim without processing their meaning. The laptop becomes a recording device, bypassing the brain.",
          "In contrast, writing by hand is a slower, more deliberate process. Because we cannot write as fast as someone speaks, our brains are forced to summarize, synthesize, and prioritize information in real-time. We must actively decide what is important enough to commit to paper. Neurological studies have consistently shown that the physical act of forming letters activates unique neural pathways linked to memory retention and critical thinking. Students who take notes by hand demonstrate a significantly deeper conceptual understanding of the material than those who type.",
          "Furthermore, handwriting is a deeply personal expression of identity. A typed font is uniform, sterile, and anonymous; it carries no trace of the writer’s physical presence or emotional state. A handwritten letter, however, possesses a unique signature style, capturing a moment in time and a physical connection between sender and receiver.",
          "By relegating handwriting to a relic of history, we are not just changing our medium of communication—we are weakening our cognitive capacities and sanitizing our personal interactions. Efficiency should not be the sole metric of educational progress. We must ensure that our classrooms continue to make space for the pen, even in a world ruled by the keyboard."
        ]
      },
      {
        id: "p_videogames",
        title: "The Educational Value of Video Games",
        meta: "Contemporary Opinion Article",
        text: [
          "For decades, the public narrative surrounding video games has been overwhelmingly negative. Critics routinely accuse them of encouraging violence, promoting social isolation, and rotting the brains of youth. However, this reactionary stance ignores a growing body of scientific research and educational theory. Far from being a mindless distraction, video games are actually one of the most powerful and effective tools we have for developing complex, 21st-century cognitive skills.",
          "To understand why video games are beneficial, one must compare them to more passive forms of media, such as television or film. When a child watches a movie, they are a consumer of a pre-determined story. They sit back, observe, and accept the narrative. When a child plays a video game, however, they are an active agent. The game does not progress unless the player makes decisions, solves puzzles, and reacts to changing circumstances.",
          "Most modern video games are, at their core, complex exercises in systemic problem-solving. In strategy and role-playing games, players must manage scarce resources, anticipate long-term consequences of their choices, and adapt to unpredictable environments. When a player fails to complete a level, they do not simply quit; they analyze what went wrong, formulate a new hypothesis, and try again. This iterative cycle of trial, failure, and adaptation is the exact foundation of the scientific method.",
          "Additionally, the rise of multiplayer online games has transformed gaming into a highly collaborative, social activity. To succeed in cooperative games, players must communicate effectively, delegate tasks based on individual strengths, and negotiate conflicts under pressure. These are the precise 'soft skills' that modern employers desperately seek in the workplace.",
          "While moderation is certainly necessary—as it is with any activity—the outright demonization of video games is outdated and counterproductive. Instead of treating gaming as an enemy of education, parents and educators should learn to leverage its interactive power to prepare youth for a highly complex, digital world."
        ]
      },
      {
        id: "p_fiction_marcus",
        title: "Starting Over",
        meta: "Literary Narrative (Fiction)",
        text: [
          "The fluorescent lights of the community college hallway hummed with a low, persistent buzz that matched the anxious vibration in Marcus’s chest. At thirty-five, he felt like a giant occupying a world built for people ten years younger. He adjusted the strap of his backpack, which felt ridiculously heavy, stuffed with a pristine college algebra textbook and a brand-new spiral notebook.",
          "Twelve years ago, Marcus had walked away from a half-finished degree to support his family, taking a job at the local packaging plant. For a decade, the rhythm of the assembly line had been his life—predictable, physical, and secure. But when the plant automated its main line last winter, Marcus found himself staring at a severance package and an uncertain future. He had made a choice: it was time to finish what he started and pivot to computer science.",
          "Now, standing outside Room 204 for his first programming lab, doubt crept in like a cold draft. Through the door's glass pane, he saw clusters of students laughing, their fingers flying across smartphone screens with effortless ease. They looked like natives of this digital landscape; Marcus felt like an explorer who had lost his map.",
          "\"First day jitters?\"",
          "Marcus turned to see an older woman with a kind face and a silver streak in her dark hair. She was carrying a worn laptop bag.",
          "\"Is it that obvious?\" Marcus managed a weak smile.",
          "\"I’ve taught this class for fifteen years, Marcus—it's Marcus, right?\" she asked, glancing at her roster. He nodded. \"The career changers always stand outside the door the longest. I'm Professor Vance.\"",
          "\"I just feel like I'm starting a mile behind everyone else in there,\" Marcus admitted, gesturing toward the younger students. \"They grew up with these machines.\"",
          "Professor Vance smiled, her eyes crinkling. \"They grew up using them, yes. But that doesn't mean they know how they work. Coding isn't about how fast you can type or how many apps you use. It’s about logic, patience, and solving puzzles. If you can survive a decade of troubleshooting mechanical errors on a factory floor, you have exactly the kind of grit this class requires. Don't underestimate the value of your mileage.\"",
          "She gave him a reassuring pat on the shoulder and opened the door. Marcus took a deep breath, letting her words sink in. He looked down at his calloused hands—hands that knew how to fix things, hands that knew how to work hard. He walked into the classroom and took a seat right in the front row."
        ]
      }
    ],
    questions: [
      {
        id: "q1_gardens_mcq",
        passageId: "p1_gardens",
        type: "mcq",
        title: "1. What is the author's primary purpose in writing this editorial?",
        options: [
          { val: "A", text: "A. To inform residents about how to grow their own food." },
          { val: "B", text: "B. To persuade the City Council to choose the community garden over the shopping mall." },
          { val: "C", text: "C. To entertain readers with a story about an empty lot." },
          { val: "D", text: "D. To explain the financial benefits of commercial development." }
        ],
        correct: "B",
        expEn: "The author uses persuasive language ('incredibly shortsighted', 'completely false') to convince the reader and the council that building a garden is better than building a mall.",
        expVn: "Tác giả sử dụng ngôn ngữ mang tính thuyết phục ('tầm nhìn vô cùng hạn hẹp', 'hoàn toàn sai lầm') để thuyết phục người đọc và hội đồng rằng việc xây dựng một khu vườn tốt hơn so với xây dựng một trung tâm mua sắm."
      },
      {
        id: "q2_gardens_dnd",
        passageId: "p1_gardens",
        type: "dnd",
        title: "2. Drag and drop the statements from the text into the correct categories (Fact vs. Opinion).",
        options: [],
        bank: [
          { val: "A", text: "A community garden is a shared space to grow food." },
          { val: "B", text: "Building a shopping mall is incredibly shortsighted." },
          { val: "C", text: "The primary purpose of our town should be to foster a connected community." },
          { val: "D", text: "Studies show green spaces reduce stress and crime rates." }
        ],
        targets: [
          { id: "facts", title: "Objective Facts (Can be proven)" },
          { id: "opinions", title: "Personal Opinions (Beliefs or judgments)" }
        ],
        correctSets: {
          "facts": ["A", "D"],
          "opinions": ["B", "C"]
        },
        expEn: "Options A and D are facts because they can be objectively proven via definitions and studies. Options B and C are opinions because they rely on the author's personal values and judgments.",
        expVn: "Lựa chọn A và D là sự thật vì chúng có thể được chứng minh khách quan thông qua các định nghĩa và nghiên cứu. Lựa chọn B và C là ý kiến cá nhân vì chúng dựa trên những giá trị và phán xét cá nhân của tác giả."
      },
      {
        id: "q3_gardens_inline",
        passageId: "p1_gardens",
        type: "inline",
        title: "3. Grammar & Logic: Select the correct rhetorical terms to complete the analysis of the text.",
        options: [],
        textParts: [
          "In the editorial, the author's main ",
          " is that the town must build a community garden instead of a mall. To back up this argument, the author provides clear ",
          " by referencing academic studies about stress and crime rates. Finally, the author's overall ",
          " is highly critical of the commercial development plan, describing it as 'shortsighted'."
        ],
        blanks: {
          "1": {
            correct: "claim",
            options: [
              { val: "claim", text: "claim" },
              { val: "fact", text: "fact" },
              { val: "transition", text: "transition" }
            ]
          },
          "2": {
            correct: "evidence",
            options: [
              { val: "tone", text: "tone" },
              { val: "opinion", text: "opinion" },
              { val: "evidence", text: "evidence" }
            ]
          },
          "3": {
            correct: "tone",
            options: [
              { val: "purpose", text: "purpose" },
              { val: "tone", text: "tone" },
              { val: "analyze", text: "analyze" }
            ]
          }
        },
        expEn: "The 'claim' is the main argument. The academic studies serve as the 'evidence' to prove that claim. The critical emotional attitude of the writer represents the 'tone'.",
        expVn: "'Claim' (luận điểm) là lập luận chính. Các nghiên cứu học thuật đóng vai trò là 'evidence' (bằng chứng) để chứng minh luận điểm đó. Thái độ cảm xúc chỉ trích của người viết thể hiện 'tone' (giọng điệu)."
      },
      {
        id: "q_hist_1",
        passageId: "p_hist_1898",
        type: "mcq",
        title: "4. Which of the following best states the main argument of the passage?",
        options: [
          { val: "A", text: "A. Factory owners should provide safer working conditions and higher wages." },
          { val: "B", text: "B. Reducing the workday to eight hours benefits both economic productivity and societal well-being." },
          { val: "C", text: "C. The American government must intervene to break up monopolies in the manufacturing sector." },
          { val: "D", text: "D. Workers who labor for twelve hours are more prone to moral vice than those who work eight hours." }
        ],
        correct: "B",
        expEn: "The author argues that reducing the workday to eight hours will increase factory productivity (by reducing fatigue and errors) and improve societal well-being (by allowing workers time to rest, learn, and engage in democracy).",
        expVn: "Tác giả lập luận rằng việc giảm ngày làm việc xuống còn tám giờ sẽ làm tăng năng suất nhà máy (bằng cách giảm mệt mỏi và sai sót) và cải thiện phúc lợi xã hội (bằng cách cho phép công nhân có thời gian nghỉ ngơi, học tập và tham gia vào nền dân chủ)."
      },
      {
        id: "q_hist_2",
        passageId: "p_hist_1898",
        type: "mcq",
        title: "5. How does the author counter the claim that shorter workdays lead to economic ruin?",
        options: [
          { val: "A", text: "A. By arguing that factory owners can afford to lose money." },
          { val: "B", text: "B. By pointing out that a rested worker is more productive and makes fewer costly mistakes." },
          { val: "C", text: "C. By suggesting that the government subsidize factories that adopt the eight-hour day." },
          { val: "D", text: "D. By demonstrating that consumers are willing to pay higher prices for goods." }
        ],
        correct: "B",
        expEn: "In the second paragraph, the author argues that exhausted workers make mistakes and ruin materials, and that a rested worker is more alert and efficient, keeping total daily output high.",
        expVn: "Trong đoạn thứ hai, tác giả lập luận rằng những công nhân kiệt sức thường mắc sai lầm, và một công nhân được nghỉ ngơi sẽ tỉnh táo và hiệu quả hơn, giúp giữ sản lượng tổng thể hàng ngày ở mức cao."
      },
      {
        id: "q_hist_3",
        passageId: "p_hist_1898",
        type: "mcq",
        title: "6. As used in the third paragraph, what does the word \"cultivate\" most nearly mean?",
        options: [
          { val: "A", text: "A. To harvest or farm" },
          { val: "B", text: "B. To restrict or limit" },
          { val: "C", text: "C. To develop or improve" },
          { val: "D", text: "D. To ignore or neglect" }
        ],
        correct: "C",
        expEn: "In this context, to 'cultivate his mind' means to develop or improve his intellect through education and thought.",
        expVn: "Trong ngữ cảnh này, 'cultivate his mind' (trau dồi trí tuệ) có nghĩa là phát triển hoặc cải thiện trí tuệ thông qua giáo dục và suy nghĩ."
      },
      {
        id: "q_hw_1",
        passageId: "p_handwriting",
        type: "mcq",
        title: "7. What is the author’s primary purpose in writing this piece?",
        options: [
          { val: "A", text: "A. To persuade school districts to completely ban laptops and tablets in classrooms." },
          { val: "B", text: "B. To argue that handwriting offers cognitive and personal benefits that typing cannot replicate." },
          { val: "C", text: "C. To explain the scientific process of how the brain stores memories during typing." },
          { val: "D", text: "D. To demonstrate that typing speeds are vastly superior to handwriting speeds." }
        ],
        correct: "B",
        expEn: "The author is advocating for the preservation of handwriting, arguing that it has cognitive benefits (like better memory retention) and personal values that typing lacks.",
        expVn: "Tác giả đang ủng hộ việc duy trì chữ viết tay, lập luận rằng nó mang lại những lợi ích nhận thức (như ghi nhớ tốt hơn) và những giá trị cá nhân mà việc đánh máy không có."
      },
      {
        id: "q_hw_2",
        passageId: "p_handwriting",
        type: "mcq",
        title: "8. Which piece of evidence does the author use to support the claim that handwriting improves memory retention?",
        options: [
          { val: "A", text: "A. Surveys showing that teachers prefer graded handwritten essays over printed ones." },
          { val: "B", text: "B. Brain scans showing that forming letters activates neural pathways linked to critical thinking." },
          { val: "C", text: "C. Statistics comparing the graduation rates of schools with and without cursive programs." },
          { val: "D", text: "D. Anecdotes from historical figures who wrote their famous works by hand." }
        ],
        correct: "B",
        expEn: "The author cites 'neurological studies' showing that physical writing activates unique neural pathways linked to critical thinking and memory.",
        expVn: "Tác giả trích dẫn 'các nghiên cứu thần kinh học' cho thấy việc viết tay kích hoạt các đường dẫn thần kinh đặc biệt liên quan đến tư duy phản biện và trí nhớ."
      },
      {
        id: "q_hw_3",
        passageId: "p_handwriting",
        type: "mcq",
        title: "9. Why does the author mention that typed fonts are \"uniform, sterile, and anonymous\"?",
        options: [
          { val: "A", text: "A. To emphasize that typing is more professional than writing by hand." },
          { val: "B", text: "B. To criticize technology companies for not designing more creative fonts." },
          { val: "C", text: "C. To highlight the loss of individuality and personal connection associated with digital communication." },
          { val: "D", text: "D. To suggest that typing makes it easier to write plagiarized material undetected." }
        ],
        correct: "C",
        expEn: "The author uses these terms to contrast the cold, emotionless nature of typed text with the unique, expressive, and human nature of handwriting.",
        expVn: "Tác giả sử dụng các thuật ngữ này để đối chiếu bản chất vô cảm, lạnh lẽo của văn bản đánh máy với bản chất độc đáo, biểu cảm và đậm chất con người của chữ viết tay."
      },
      {
        id: "q_vg_1",
        passageId: "p_videogames",
        type: "mcq",
        title: "10. How does the author structure the argument in the second paragraph?",
        options: [
          { val: "A", text: "A. By presenting a chronological history of media consumption from television to video games." },
          { val: "B", text: "B. By comparing and contrasting the passive nature of watching television with the active nature of playing video games." },
          { val: "C", text: "C. By listing the negative physical side effects of excessive screen time." },
          { val: "D", text: "D. By citing expert testimony from pediatricians regarding media habits." }
        ],
        correct: "B",
        expEn: "The author compares and contrasts television (where the viewer sits back and passively consumes a story) with video games (where the player must be an active agent who makes decisions to progress).",
        expVn: "Tác giả so sánh và đối chiếu truyền hình (nơi người xem thụ động tiếp nhận câu chuyện) với trò chơi điện tử (nơi người chơi phải là một tác nhân chủ động đưa ra quyết định)."
      },
      {
        id: "q_vg_2",
        passageId: "p_videogames",
        type: "mcq",
        title: "11. According to the author, how does playing video games mimic the scientific method?",
        options: [
          { val: "A", text: "A. It requires players to memorize vast amounts of scientific data." },
          { val: "B", text: "B. It encourages players to work in isolated laboratory environments." },
          { val: "C", text: "C. It involves a cycle of testing a strategy, failing, analyzing the result, and trying a new approach." },
          { val: "D", text: "D. It forces players to write down their hypotheses before starting a new level." }
        ],
        correct: "C",
        expEn: "The third paragraph describes the gaming cycle of trying a strategy, failing, analyzing the failure, and trying again as the core foundation of the scientific method.",
        expVn: "Đoạn thứ ba mô tả chu kỳ chơi game: thử nghiệm chiến lược, thất bại, phân tích thất bại, và thử lại. Đây chính là nền tảng cốt lõi của phương pháp khoa học."
      },
      {
        id: "q_vg_3",
        passageId: "p_videogames",
        type: "mcq",
        title: "12. Which of the following assumptions does the author make about the reader?",
        options: [
          { val: "A", text: "A. The reader already believes that video games are highly educational." },
          { val: "B", text: "B. The reader is familiar with the negative stereotypes associated with video games." },
          { val: "C", text: "C. The reader prefers television over video games for entertainment." },
          { val: "D", text: "D. The reader is an employer looking to hire skilled tech workers." }
        ],
        correct: "B",
        expEn: "The author begins by stating, 'For decades, the public narrative surrounding video games has been overwhelmingly negative,' which assumes the reader is already familiar with these common stereotypes.",
        expVn: "Tác giả bắt đầu bằng cách khẳng định định kiến tiêu cực của công chúng về trò chơi điện tử đã tồn tại nhiều thập kỷ, điều này ngầm định rằng người đọc đã quen thuộc với những khuôn mẫu này."
      },
      {
        id: "q_fict_1",
        passageId: "p_fiction_marcus",
        type: "mcq",
        title: "13. What is the primary conflict Marcus experiences in the story?",
        options: [
          { val: "A", text: "A. He is struggling to pass a difficult college algebra exam." },
          { val: "B", text: "B. He feels out of place and insecure about returning to school as an older student." },
          { val: "C", text: "C. He cannot afford the tuition fees for his computer science program." },
          { val: "D", text: "D. He is angry at his former employer for automating his job at the factory." }
        ],
        correct: "B",
        expEn: "Marcus's main conflict is internal; he feels self-conscious, insecure, and doubtful about his ability to succeed in college alongside younger, tech-savvy students.",
        expVn: "Xung đột chính của Marcus là xung đột nội tâm; anh ấy cảm thấy tự ti, không an tâm và nghi ngờ về khả năng thành công của mình khi học cùng những sinh viên trẻ tuổi rành công nghệ."
      },
      {
        id: "q_fict_2",
        passageId: "p_fiction_marcus",
        type: "mcq",
        title: "14. What does Professor Vance mean when she tells Marcus, \"Don't underestimate the value of your mileage\"?",
        options: [
          { val: "A", text: "A. He should keep track of how many miles he drives to commute to campus." },
          { val: "B", text: "B. His age and past work experience are assets that have prepared him for college." },
          { val: "C", text: "C. Younger students are physically faster at typing than he is." },
          { val: "D", text: "D. He will need to work twice as hard to catch up to his classmates." }
        ],
        correct: "B",
        expEn: "'Mileage' is a metaphor for life experience. Professor Vance is telling him that his years of working and solving real-world problems have given him valuable grit and logic.",
        expVn: "'Mileage' (số dặm/đường dài) là một ẩn dụ cho kinh nghiệm sống. Giáo sư Vance đang nói với anh ấy rằng những năm tháng làm việc và giải quyết các vấn đề thực tế đã mang lại cho anh ấy sự bền bỉ và tư duy logic quý giá."
      },
      {
        id: "q_fict_3",
        passageId: "p_fiction_marcus",
        type: "mcq",
        title: "15. How does the setting of the hallway reflect Marcus’s internal state?",
        options: [
          { val: "A", text: "A. The bright, cheerful hallway makes him feel optimistic about his future." },
          { val: "B", text: "B. The empty, quiet hallway emphasizes his feelings of complete loneliness." },
          { val: "C", text: "C. The low, humming fluorescent lights mirror the nervous tension he feels inside." },
          { val: "D", text: "D. The chaotic, crowded hallway makes him feel angry and overwhelmed." }
        ],
        correct: "C",
        expEn: "The author explicitly states that the 'low, persistent buzz' of the lights 'matched the anxious vibration in Marcus's chest.'",
        expVn: "Tác giả tuyên bố rõ ràng rằng 'tiếng vo ve trầm, dai dẳng' của ánh đèn 'phù hợp với sự rung động lo âu trong ngực Marcus.'"
      }
    ]
  }
};