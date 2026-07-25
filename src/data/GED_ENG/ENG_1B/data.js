// src/data/GED/ENG_1B/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const ENGLISH_1B_DATA = {
  meta: {
    id: "ENG_1B",
    title: "English for the GED: Rhetorical Analysis & Syntax Mastery",
    desc: "Focuses on foundational reading comprehension, complex grammar analysis, rhetorical devices, and essay writing mechanics.",
    track: "GED_ENG",
    icon: "GraduationCap"
  },
  phases: [
    {
      id: "concept",
      title: "Phase 0: Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 5 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 5 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 5,
      tasks: [
        { id: "SPELLING", dbKey: "p2", maxXP: 5 },
        { id: "DICTATION", dbKey: "p3", maxXP: 5 },
        { id: "READ_COMP", dbKey: "p4", maxXP: 5 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 15 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 30,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 15 },
        { id: "ESSAY", dbKey: "p8", maxXP: 15 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 },
        { id: "GAMES", dbKey: "p12", maxXP: 15 }
      ]
    }
  ],
  realWords: [
    {
      word: "Syntax",
      vn: "Cú pháp",
      def: "The way words and phrases are arranged to create logical and correct sentences.",
      vnDef: "Cách sắp xếp các từ và cụm từ để tạo thành những câu hợp lý và chính xác.",
      sent: "The author uses clear syntax to ensure the reader understands the main point.", 
      vnSent: "Tác giả sử dụng cú pháp rõ ràng để đảm bảo người đọc hiểu được ý chính.",
      dictSent: "Good syntax makes your writing much easier to read.",
      isReal: true
    },
    {
      word: "Juxtaposition",
      vn: "Sự đặt cạnh nhau",
      def: "Placing two things close together to highlight their differences or create a contrast.",
      vnDef: "Đặt hai sự vật gần nhau để làm nổi bật sự khác biệt hoặc tạo ra sự tương phản.",
      sent: "The juxtaposition of the rich neighborhood and the poor streets showed the city's inequality.",
      vnSent: "Sự đặt cạnh nhau giữa khu nhà giàu và những con phố nghèo đã cho thấy sự bất bình đẳng của thành phố.",
      dictSent: "Writers use juxtaposition to show strong contrast between ideas.",
      isReal: true
    },
    {
      word: "Subordination",
      vn: "Cấu trúc phụ thuộc",
      def: "Linking two clauses so that one is less important and relies on the other for meaning.",
      vnDef: "Liên kết hai mệnh đề sao cho một mệnh đề ít quan trọng hơn và phụ thuộc vào mệnh đề kia để có ý nghĩa.",
      sent: "By using subordination, the writer made the counterargument seem less important.",
      vnSent: "Bằng cách sử dụng cấu trúc phụ thuộc, người viết đã làm cho phản biện có vẻ ít quan trọng hơn.",
      dictSent: "Subordination helps organize complex thoughts in a single sentence.",
      isReal: true
    },
    {
      word: "Synthesis",
      vn: "Sự tổng hợp",
      def: "Combining different ideas, facts, or texts to form a single, complete understanding.",
      vnDef: "Kết hợp các ý tưởng, sự kiện hoặc văn bản khác nhau để tạo thành một sự hiểu biết hoàn chỉnh và duy nhất.",
      sent: "A good essay requires the synthesis of multiple historical sources.",
      vnSent: "Một bài luận hay đòi hỏi sự tổng hợp từ nhiều nguồn lịch sử khác nhau.",
      dictSent: "We must synthesize the data before writing the report.",
      isReal: true
    },
    {
      word: "Ambiguity",
      vn: "Tính mơ hồ",
      def: "When a word, phrase, or sentence is unclear and can be understood in more than one way.",
      vnDef: "Khi một từ, cụm từ hoặc câu không rõ ràng và có thể được hiểu theo nhiều cách.",
      sent: "The contract's ambiguity caused a major disagreement between the two companies.",
      vnSent: "Tính mơ hồ của hợp đồng đã gây ra một cuộc tranh cãi lớn giữa hai công ty.",
      dictSent: "Please avoid ambiguity by choosing your words carefully.",
      isReal: true
    },
    {
      word: "Rhetoric",
      vn: "Tu từ học",
      def: "The art of using language effectively to persuade or influence an audience.",
      vnDef: "Nghệ thuật sử dụng ngôn ngữ một cách hiệu quả để thuyết phục hoặc ảnh hưởng đến khán giả.",
      sent: "The politician's rhetoric was designed to make people feel hopeful about the future.",
      vnSent: "Tu từ học của chính trị gia được thiết kế để khiến mọi người cảm thấy hy vọng về tương lai.",
      dictSent: "The politician used strong rhetoric to persuade the crowd.",
      isReal: true
    },
    {
      word: "Cohesion",
      vn: "Tính mạch lạc",
      def: "The flow and connection of ideas in a text, making it easy to read and logically sound.",
      vnDef: "Sự trôi chảy và kết nối của các ý tưởng trong một văn bản, giúp nó dễ đọc và hợp lý.",
      sent: "Using transition words like 'however' and 'therefore' improves paragraph cohesion.",
      vnSent: "Sử dụng các từ chuyển tiếp như 'tuy nhiên' và 'do đó' giúp cải thiện tính mạch lạc của đoạn văn.",
      dictSent: "Transition words help improve the overall cohesion of paragraphs.",
      isReal: true
    },
    {
      word: "Clause",
      vn: "Mệnh đề",
      def: "A group of words containing a subject and a verb, forming part of a sentence.",
      vnDef: "Một nhóm từ chứa chủ ngữ và động từ, tạo thành một phần của câu.",
      sent: "An independent clause can stand alone as a complete sentence.",
      vnSent: "Một mệnh đề độc lập có thể đứng riêng lẻ như một câu hoàn chỉnh.",
      dictSent: "An independent clause can stand alone as a sentence.",
      isReal: true
    },
    {
      word: "Inference",
      vn: "Sự suy luận",
      def: "An educated guess or conclusion made based on evidence and reasoning.",
      vnDef: "Một dự đoán hoặc kết luận có cơ sở được đưa ra dựa trên bằng chứng và lập luận.",
      sent: "Based on the character's actions, we can make an inference that he is very nervous.",
      vnSent: "Dựa trên hành động của nhân vật, chúng ta có thể đưa ra suy luận rằng anh ấy đang rất lo lắng.",
      dictSent: "You can make an inference based on the evidence.",
      isReal: true
    },
    {
      word: "Concession",
      vn: "Sự nhượng bộ",
      def: "Admitting that an opponent has a valid point before returning to your own argument.",
      vnDef: "Thừa nhận rằng đối thủ có một quan điểm hợp lý trước khi quay lại lập luận của riêng bạn.",
      sent: "Making a small concession shows the reader that you are fair and objective.",
      vnSent: "Việc đưa ra một sự nhượng bộ nhỏ cho người đọc thấy rằng bạn công bằng và khách quan.",
      dictSent: "Making a small concession makes your argument look fair.",
      isReal: true
    }
  ],
  fakeWords: [
    { word: "Syntox", imitating: "Syntax", isReal: false },
    { word: "Juxtaposement", imitating: "Juxtaposition", isReal: false },
    { word: "Subordinance", imitating: "Subordination", isReal: false },
    { word: "Synthetion", imitating: "Synthesis", isReal: false },
    { word: "Ambiguism", imitating: "Ambiguity", isReal: false },
    { word: "Rhetoricality", imitating: "Rhetoric", isReal: false },
    { word: "Cohesity", imitating: "Cohesion", isReal: false },
    { word: "Clausalment", imitating: "Clause", isReal: false },
    { word: "Inferation", imitating: "Inference", isReal: false },
    { word: "Concessity", imitating: "Concession", isReal: false }
  ],
  dictation: [
    { sent: "Good syntax makes your writing much easier to read.", vnSent: "Cú pháp tốt giúp bài viết của bạn dễ đọc hơn nhiều." },
    { sent: "Writers use juxtaposition to show strong contrast between ideas.", vnSent: "Người viết sử dụng sự đặt cạnh nhau để thể hiện sự tương phản mạnh mẽ giữa các ý tưởng." },
    { sent: "An independent clause can stand alone as a sentence.", vnSent: "Một mệnh đề độc lập có thể đứng riêng lẻ thành một câu." },
    { sent: "We must synthesize the data before writing the report.", vnSent: "Chúng ta phải tổng hợp dữ liệu trước khi viết báo cáo." },
    { sent: "Please avoid ambiguity by choosing your words carefully.", vnSent: "Vui lòng tránh sự mơ hồ bằng cách chọn từ ngữ cẩn thận." },
    { sent: "The politician used strong rhetoric to persuade the crowd.", vnSent: "Chính trị gia đã sử dụng tu từ mạnh mẽ để thuyết phục đám đông." },
    { sent: "Transition words help improve the overall cohesion of paragraphs.", vnSent: "Các từ chuyển tiếp giúp cải thiện tính mạch lạc tổng thể của các đoạn văn." },
    { sent: "You can make an inference based on the evidence.", vnSent: "Bạn có thể đưa ra suy luận dựa trên bằng chứng." },
    { sent: "Making a small concession makes your argument look fair.", vnSent: "Đưa ra một sự nhượng bộ nhỏ làm cho lập luận của bạn trông có vẻ công bằng." },
    { sent: "Subordination helps organize complex thoughts in a single sentence.", vnSent: "Cấu trúc phụ thuộc giúp sắp xếp các suy nghĩ phức tạp trong một câu duy nhất." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Art of a Great Speech",
      text: "Have you ever wondered why some speeches are so powerful? The secret is not just the words, but how they are arranged. {Syntax} is the way we structure sentences. Good speakers use {subordination} to build clear and logical ideas. Instead of giving every point the same importance, they put the main idea in an {independent} clause and use {dependent} clauses for background details.",
      vnTitle: "Nghệ thuật của một Bài diễn văn Tuyệt vời",
      vnText: "Bạn có bao giờ tự hỏi tại sao một số bài diễn văn lại mạnh mẽ đến vậy? Bí mật không chỉ nằm ở ngôn từ, mà ở cách chúng được sắp xếp. Cú pháp là cách chúng ta cấu trúc câu. Những người diễn thuyết giỏi sử dụng cấu trúc phụ thuộc để xây dựng các ý tưởng rõ ràng và logic. Thay vì tạo cho mọi điểm sự quan trọng như nhau, họ đặt ý chính vào một mệnh đề độc lập và sử dụng các mệnh đề phụ thuộc cho các chi tiết nền tảng."
    },
    {
      id: "passage_2",
      title: "A Tale of Two Cities",
      text: "In modern architecture, designers often use {juxtaposition} to make a bold statement. By placing a shiny glass skyscraper right next to a centuries-old brick church, they create a striking visual {contrast}. This side-by-side {comparison} forces us to think about how fast our world is changing.",
      vnTitle: "Câu chuyện của Hai Thành phố",
      vnText: "Trong kiến trúc hiện đại, các nhà thiết kế thường sử dụng sự đặt cạnh nhau để đưa ra một tuyên bố táo bạo. Bằng cách đặt một tòa nhà chọc trời bằng kính sáng bóng ngay cạnh một nhà thờ gạch hàng thế kỷ, họ tạo ra một sự tương phản hình ảnh nổi bật. Sự so sánh song song này buộc chúng ta phải suy nghĩ về việc thế giới của chúng ta đang thay đổi nhanh như thế nào."
    },
    {
      id: "passage_3",
      title: "How to Win an Argument",
      text: "When people argue, they usually try to attack the other person's ideas immediately. However, skilled debaters know the value of a smart {concession}. If you start by agreeing with a valid point, you show that you are fair. This builds {trust} with your audience before you present your main {synthesis} of the facts.",
      vnTitle: "Cách để Chiến thắng một Cuộc tranh luận",
      vnText: "Khi mọi người tranh luận, họ thường cố gắng tấn công ý tưởng của người kia ngay lập tức. Tuy nhiên, những người tranh luận lão luyện biết giá trị của một sự nhượng bộ thông minh. Nếu bạn bắt đầu bằng việc đồng ý với một điểm hợp lý, bạn cho thấy rằng mình công bằng. Điều này xây dựng lòng tin với khán giả của bạn trước khi bạn trình bày sự tổng hợp chính của mình về các sự thật."
    }
  ],
  notebookArticle: {
    title: "Unit 1B: Rhetorical Analysis & Syntax",
    vnTitle: "Bài 1B: Phân tích Tu từ & Cú pháp",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. Syntax & Clauses",
        vnHeading: "1. Cú pháp & Mệnh đề",
        text: "Good **Syntax** uses independent and dependent **Clauses** to build clear sentences. This proper structure reduces **Ambiguity** and helps the reader make the correct **Inference**.",
        vnText: "Cú pháp (**Syntax**) tốt sử dụng các Mệnh đề (**Clauses**) độc lập và phụ thuộc để xây dựng các câu rõ ràng. Cấu trúc phù hợp này làm giảm Tính mơ hồ (**Ambiguity**) và giúp người đọc đưa ra Suy luận (**Inference**) chính xác."
      },
      {
        heading: "2. The Power of Contrast",
        vnHeading: "2. Sức mạnh của sự tương phản",
        text: "**Juxtaposition** places two different ideas side by side to highlight their differences. When used correctly, it creates a smooth flow and improves paragraph **Cohesion**.",
        vnText: "Sự đặt cạnh nhau (**Juxtaposition**) đặt hai ý tưởng khác nhau cạnh nhau để làm nổi bật sự khác biệt của chúng. Khi được sử dụng đúng cách, nó tạo ra một luồng chảy mượt mà và cải thiện Tính mạch lạc (**Cohesion**) của đoạn văn."
      },
      {
        heading: "3. Advanced Persuasion",
        vnHeading: "3. Thuyết phục Nâng cao",
        text: "Using persuasive **Rhetoric** often involves **Subordination** to downplay weak ideas and making a **Concession** to build trust. Ultimately, you must create a **Synthesis** of all ideas to win the argument.",
        vnText: "Sử dụng Tu từ học (**Rhetoric**) thuyết phục thường liên quan đến Cấu trúc phụ thuộc (**Subordination**) để làm giảm sự chú ý vào các ý tưởng yếu và đưa ra Sự nhượng bộ (**Concession**) để xây dựng lòng tin. Cuối cùng, bạn phải tạo ra một Sự tổng hợp (**Synthesis**) của tất cả các ý tưởng để giành chiến thắng trong cuộc tranh luận."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "How does using a dependent clause help organize a complex sentence?",
      suggestedWords: [["background", "context", "secondary"], ["main", "independent", "focus"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it provides background information, context, or secondary details.",
        "1 mark for explaining that it keeps the reader's main focus on the independent clause (or main idea)."
      ],
      modelAnswer: "A dependent clause helps by providing background context, which ensures the reader's main focus remains locked on the independent clause."
    },
    {
      id: "q2",
      question: "What is the main purpose of juxtaposition in writing or art?",
      suggestedWords: [["side-by-side", "beside", "together"], ["contrast", "differences"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for defining juxtaposition as placing two different concepts or images side-by-side.",
        "1 mark for stating that the goal is to highlight differences or create a strong contrast."
      ],
      modelAnswer: "Juxtaposition places two concepts side-by-side. Its main purpose is to highlight their differences and create a strong, memorable contrast."
    },
    {
      id: "q3",
      question: "Why is it a good strategy to include a concession in a persuasive essay?",
      suggestedWords: [["valid", "reasonable", "agree"], ["trust", "fair", "objective"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying that a concession acknowledges the opposing side has a valid or reasonable point.",
        "1 mark for explaining that this strategy builds trust and makes the writer appear fair or objective."
      ],
      modelAnswer: "Including a concession acknowledges that the opponent has a valid point. This strategy builds trust by making the writer appear fair and highly objective."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: DIAGRAMS.SENTENCE_STRUCTURE_CHART,
      imagePrompt: "A clean, minimalist academic bar chart titled 'Sentence Structures in Persuasive Essays'. The y-axis shows 'Frequency of Use (%)' and the x-axis shows three categories: 'Simple Sentences', 'Compound Sentences', and 'Complex Sentences (Subordination)'. The bar for 'Complex Sentences (Subordination)' is the tallest at 65%, 'Simple Sentences' is at 15%, and 'Compound Sentences' is at 20%. Use a modern color palette of teal, navy, and coral on a white background. No 3D effects, highly legible sans-serif fonts, flat graphic design style suitable for an English language test.",
      promptText: "Analyze the provided chart. What does the data suggest about the preferred sentence structure in persuasive writing?",
      suggestedWords: [["complex", "subordination"], ["highest", "majority", "most", "preferred"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying that Complex Sentences (Subordination) are the most frequently used.",
        "1 mark for accurately citing the data (65%) to support the conclusion."
      ],
      modelAnswer: "The chart suggests that Complex Sentences utilizing subordination are the preferred structure in persuasive writing, representing the vast majority at 65% frequency of use."
    },
    {
      id: "d2",
      inlineSvg: DIAGRAMS.ARGUMENT_ARCHITECTURE,
      imagePrompt: "A flat vector infographic showing the 'Architecture of an Argument'. It features three interconnected blocks flowing upwards. The bottom block is blue and labeled '1. Evidence Synthesis'. A prominent arrow points up to a middle orange block labeled '2. Concession to Opponent'. A final arrow points up to the top green block labeled '3. Primary Claim'. The design should be sleek, corporate, and highly legible, using standard sans-serif fonts, placed on a clean white background.",
      promptText: "Examine the flowchart detailing the Architecture of an Argument. Describe the sequence of steps a writer must take before reaching the Primary Claim.",
      suggestedWords: [["synthesis", "synthesize"], ["concession", "concede"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the first step as Evidence Synthesis.",
        "1 mark for identifying the second step as making a Concession to the opponent."
      ],
      modelAnswer: "Before reaching the Primary Claim, a writer must first complete an Evidence Synthesis. Following this, the writer must offer a Concession to the opponent."
    }
  ],
  essay: {
    task: "Analyze how an author can use structural choices, such as juxtaposition or concessions, to construct a persuasive argument.",
    guidelines: [
      "Define how syntax and structure impact readability.",
      "Explain the effect of using juxtaposition to contrast ideas.",
      "Describe how a concession builds trust with an audience."
    ],
    suggestedWords: [
      ["Syntax", "structure", "structures"], 
      ["Juxtaposition", "contrast"],
      ["Concession", "concede"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately describing how syntax or structure guides the reader's logic.",
      "1 mark for explaining how juxtaposition emphasizes contrast.",
      "1 mark for explaining how concessions build credibility and trust."
    ],
    modelAnswer: "An author's syntax and structural choices are vital for persuasion. By using juxtaposition, an author can place opposing ideas side-by-side to create a sharp contrast that highlights the superiority of their claim. Furthermore, by offering a concession, the author acknowledges the other side, which builds immense trust with the reader and makes the overall argument much more compelling."
  },
  assessment,
  notes,
  workbook,
  games
};