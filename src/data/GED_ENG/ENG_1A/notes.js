import { DIAGRAMS } from './diagrams.js';
// src/data/GED_ENG/ENG_1A/notes.js
// Lesson 7 — Reading for Main Idea & Supporting Detail (Reading strand).
//
// Rebuilt on the flexible `layout` system ported from the classroom Lessons
// project: hero opener, a compare, a steps sequence, a split, a stack of
// Learner's-Book note panels, and a hero closer — with reveal boxes and an
// embedded check that gates the slide, the autonomous versions of the teacher's
// "ask, then tell". Slide order is unchanged (6 slides) so position-keyed audio
// stays aligned; re-run sync-audio to refresh the narration text.

export const notes = [
  {
    layout: "hero",
    color: "#1cb0f6",
    icon: "BookOpen",
    brand: "GED Reading",
    brandVn: "Đọc hiểu GED",
    eyebrow: "Lesson 7",
    eyebrowVn: "Bài 7",
    title: "Main Idea & Detail",
    titleVn: "Ý chính & Chi tiết",
    objective: "Find the main idea of a passage, tell it apart from the topic, and see how supporting details hold it up.",
    objectiveVn: "Tìm ý chính của một đoạn văn, phân biệt nó với chủ đề, và thấy cách các chi tiết hỗ trợ nâng đỡ nó.",
    card: {
      icon: "Pencil",
      badge: "Before you start",
      badgeVn: "Trước khi bắt đầu",
      text: "Think of the **last thing you read** — a text, a sign, a post. In one sentence, what was its **main point**?",
      textVn: "Hãy nghĩ về **điều cuối cùng bạn đã đọc** — một tin nhắn, một tấm biển, một bài đăng. Trong một câu, **điểm chính** của nó là gì?",
    },
  },
  {
    layout: "compare",
    icon: "Crosshair",
    title: "Topic vs. Main Idea",
    titleVn: "Chủ đề vs. Ý chính",
    columns: [
      {
        heading: "Topic",
        headingVn: "Chủ đề",
        accent: "#0087a8",
        icon: "HelpCircle",
        content: "**What the text is about** — a word or short phrase. It is only a subject.",
        contentVn: "**Nội dung văn bản nói về cái gì** — một từ hoặc cụm từ ngắn. Nó chỉ là một đề tài.",
        notes: [{ tone: "info", text: "Example: **school lunches**", textVn: "Ví dụ: **bữa trưa ở trường**" }],
      },
      {
        heading: "Main Idea",
        headingVn: "Ý chính",
        accent: "#c25e12",
        icon: "Target",
        content: "**The point the writer makes** about that topic — always a full sentence.",
        contentVn: "**Điểm mà người viết nêu ra** về chủ đề đó — luôn là một câu hoàn chỉnh.",
        notes: [{ tone: "write", text: "Example: **School lunches should be healthier.**", textVn: "Ví dụ: **Bữa trưa ở trường nên lành mạnh hơn.**" }],
      },
    ],
    inlineSvg: DIAGRAMS.TOPIC_VS_MAIN,
    check: {
      id: "chk_topic_vs_main",
      q: '"City parks." Is this a topic or a main idea?',
      qVn: '"Công viên thành phố." Đây là chủ đề hay ý chính?',
      options: [
        { val: "A", text: "A topic — it only names the subject.", textVn: "Chủ đề — nó chỉ gọi tên đề tài." },
        { val: "B", text: "A main idea — it makes a point.", textVn: "Ý chính — nó nêu ra một điểm." },
      ],
      correct: "A",
      expEn: "It only names the subject in a short phrase. A main idea would say something about city parks, like \"The city should build more parks near schools.\"",
      expVn: "Nó chỉ gọi tên đề tài bằng một cụm từ ngắn. Một ý chính sẽ nói điều gì đó về công viên, như \"Thành phố nên xây thêm công viên gần trường học.\"",
    },
  },
  {
    layout: "steps",
    icon: "Search",
    accent: "#58cc02",
    title: "Finding the Main Idea",
    titleVn: "Tìm Ý chính",
    content: "Most paragraphs put the main idea in the **topic sentence** — often the first or last line.",
    contentVn: "Hầu hết các đoạn văn đặt ý chính trong **câu chủ đề** — thường là câu đầu hoặc câu cuối.",
    steps: [
      { text: "Read the whole paragraph once, all the way through.", textVn: "Đọc hết cả đoạn văn một lần, từ đầu đến cuối." },
      { text: "Ask: **what one point do most of the sentences support?**", textVn: "Hãy hỏi: **hầu hết các câu hỗ trợ cho điểm nào?**" },
      { text: "Check the **first and last** sentence — the main idea often sits there.", textVn: "Kiểm tra câu **đầu và cuối** — ý chính thường nằm ở đó." },
      { text: "State it as a **full sentence**, not just a topic word.", textVn: "Nêu nó thành một **câu hoàn chỉnh**, không chỉ là một từ chủ đề." },
    ],
    inlineSvg: DIAGRAMS.MAIN_IDEA_MAP,
    reveal: {
      label: "Show the main idea",
      labelVn: "Hiện ý chính",
      prompt: '"Bees matter to farmers. They pollinate crops, and one hive can visit millions of flowers." What is the main idea?',
      promptVn: '"Ong quan trọng với nông dân. Chúng thụ phấn cho cây trồng, và một tổ ong có thể thăm hàng triệu bông hoa." Ý chính là gì?',
      answer: "**Bees matter to farmers.** The other two sentences are details that support it.",
      answerVn: "**Ong quan trọng với nông dân.** Hai câu còn lại là chi tiết hỗ trợ cho nó.",
    },
  },
  {
    layout: "split",
    icon: "ListChecks",
    accent: "#ce82ff",
    title: "Supporting Details",
    titleVn: "Chi tiết Hỗ trợ",
    ratio: 55,
    content: "**Supporting details** are the facts, examples and reasons that back up the main idea. On the GED you must pick the detail that **best supports** an idea — not just any true sentence.",
    contentVn: "**Chi tiết hỗ trợ** là các sự thật, ví dụ và lý do nâng đỡ ý chính. Trong bài thi GED, bạn phải chọn chi tiết **hỗ trợ tốt nhất** cho một ý — không phải bất kỳ câu đúng nào.",
    notes: [
      { tone: "write", text: "A **relevant** detail points straight at the main idea.", textVn: "Một chi tiết **liên quan** chỉ thẳng vào ý chính." },
      { tone: "homework", text: "A sentence can be **true but off-topic** — it still does not belong.", textVn: "Một câu có thể **đúng nhưng lạc đề** — nó vẫn không thuộc về đó." },
    ],
    example: "Main idea: Reading daily builds vocabulary.\n\n**Strong:** A study found daily readers learned far more new words.\n\n**Weak:** Libraries are quiet places.",
    exampleVn: "Ý chính: Đọc sách hằng ngày xây dựng vốn từ.\n\n**Mạnh:** Một nghiên cứu cho thấy người đọc hằng ngày học được nhiều từ mới hơn.\n\n**Yếu:** Thư viện là nơi yên tĩnh.",
    exampleLabel: "Strong vs Weak",
    exampleLabelVn: "Mạnh vs Yếu",
    reveal: {
      label: "Which detail is stronger?",
      labelVn: "Chi tiết nào mạnh hơn?",
      answer: "The **study** is stronger — it directly proves that reading builds vocabulary. \"Libraries are quiet\" is true but off-topic.",
      answerVn: "**Nghiên cứu** mạnh hơn — nó chứng minh trực tiếp rằng đọc sách xây dựng vốn từ. \"Thư viện yên tĩnh\" thì đúng nhưng lạc đề.",
    },
  },
  {
    layout: "stack",
    icon: "AlignLeft",
    accent: "#ff4b4b",
    title: "Writing a Summary",
    titleVn: "Viết một Bản tóm tắt",
    columns: 1,
    content: "A **summary** restates the main idea and the key details in a few of **your own** words.",
    contentVn: "Một **bản tóm tắt** nêu lại ý chính và các chi tiết quan trọng bằng một vài từ **của chính bạn**.",
    notes: [
      { tone: "write", text: "Keep the main idea. **Drop the small examples.**", textVn: "Giữ ý chính. **Bỏ các ví dụ nhỏ.**" },
      { tone: "write", text: "**Paraphrase** — say it your own way; do not copy whole sentences.", textVn: "**Diễn giải** — nói theo cách của bạn; đừng sao chép cả câu." },
      { tone: "info", text: "A good summary is **short**, covers the whole passage, and adds **no opinion** of your own.", textVn: "Một bản tóm tắt tốt thì **ngắn gọn**, bao quát cả đoạn văn, và **không thêm ý kiến** của riêng bạn." },
    ],
  },
  {
    layout: "hero",
    color: "#14b8a6",
    icon: "CheckCircle2",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "You can name the **topic**, state the **main idea** in a sentence, pick the **details** that support it, and **summarize** a passage.",
    subtitleVn: "Bạn có thể gọi tên **chủ đề**, nêu **ý chính** bằng một câu, chọn các **chi tiết** hỗ trợ nó, và **tóm tắt** một đoạn văn.",
  },
];
