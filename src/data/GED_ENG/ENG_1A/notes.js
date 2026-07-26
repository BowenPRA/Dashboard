import { DIAGRAMS } from './diagrams.js';
// src/data/GED_ENG/ENG_1A/notes.js
// Lesson 7 — Reading for Main Idea & Supporting Detail (Reading strand).

export const notes = [
  {
    type: "intro",
    title: "Main Idea & Detail",
    titleVn: "Ý chính & Chi tiết",
    subtitle: "Objective: Find the main idea of a passage, tell it apart from the topic, and see how supporting details hold it up.",
    subtitleVn: "Mục tiêu: Tìm ý chính của một đoạn văn, phân biệt nó với chủ đề, và thấy cách các chi tiết hỗ trợ nâng đỡ nó.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Topic vs. Main Idea",
    titleVn: "Chủ đề vs. Ý chính",
    icon: "Crosshair",
    color: "bg-[#ff9600]",
    content: "These two are easy to mix up, and the GED tests the difference.\n\n> The **topic** is *what the text is about* — a word or short phrase, like \"school lunches\".\n> The **main idea** is *the point the writer makes about that topic* — a full sentence, like \"School lunches should be healthier.\"\n\nA topic is a subject. A main idea says something about it.",
    contentVn: "Hai điều này dễ bị nhầm lẫn, và bài thi GED kiểm tra sự khác biệt.\n\n> **Chủ đề** là *nội dung văn bản nói về cái gì* — một từ hoặc cụm từ ngắn, như \"bữa trưa ở trường\".\n> **Ý chính** là *điểm mà người viết nêu ra về chủ đề đó* — một câu hoàn chỉnh, như \"Bữa trưa ở trường nên lành mạnh hơn.\"\n\nChủ đề là một đề tài. Ý chính nói điều gì đó về nó.",
    example: "Topic: city parks.\nMain idea: The city should build more parks near schools.",
    exampleVn: "Chủ đề: công viên thành phố.\nÝ chính: Thành phố nên xây thêm công viên gần trường học.",
    inlineSvg: DIAGRAMS.TOPIC_VS_MAIN,
  },
  {
    type: "concept",
    title: "Finding the Main Idea",
    titleVn: "Tìm Ý chính",
    icon: "Search",
    color: "bg-[#58cc02]",
    content: "The main idea is often in the **topic sentence** — usually the first or last sentence of a paragraph.\n\n> A quick test: ask *\"What one point do most of the sentences support?\"*\n> If a sentence is the roof, the other sentences are the walls holding it up.\n\nBe careful: one interesting detail is **not** the main idea if the rest of the paragraph is about something else.",
    contentVn: "Ý chính thường nằm trong **câu chủ đề** — thường là câu đầu tiên hoặc câu cuối của một đoạn văn.\n\n> Một phép thử nhanh: hãy hỏi *\"Hầu hết các câu hỗ trợ cho điểm nào?\"*\n> Nếu một câu là mái nhà, thì các câu khác là những bức tường nâng đỡ nó.\n\nHãy cẩn thận: một chi tiết thú vị **không** phải là ý chính nếu phần còn lại của đoạn văn nói về điều khác.",
    example: "\"Bees matter to farmers. They pollinate crops, and one hive can visit millions of flowers.\" Main idea: bees matter to farmers.",
    exampleVn: "\"Ong quan trọng với nông dân. Chúng thụ phấn cho cây trồng, và một tổ ong có thể thăm hàng triệu bông hoa.\" Ý chính: ong quan trọng với nông dân.",
    inlineSvg: DIAGRAMS.MAIN_IDEA_MAP,
  },
  {
    type: "concept",
    title: "Supporting Details",
    titleVn: "Chi tiết Hỗ trợ",
    icon: "ListChecks",
    color: "bg-[#ce82ff]",
    content: "**Supporting details** are the facts, examples and reasons that back up the main idea.\n\n> A good detail is **relevant** — it points straight at the main idea.\n> An off-topic sentence may be true but still not belong.\n\nOn the GED you will be asked *which detail best supports* an idea. Choose the one that most directly proves the point, not just any true statement.",
    contentVn: "**Chi tiết hỗ trợ** là các sự thật, ví dụ và lý do nâng đỡ ý chính.\n\n> Một chi tiết tốt thì **liên quan** — nó chỉ thẳng vào ý chính.\n> Một câu lạc đề có thể đúng nhưng vẫn không thuộc về đó.\n\nTrong bài thi GED, bạn sẽ được hỏi *chi tiết nào hỗ trợ tốt nhất* cho một ý. Hãy chọn câu chứng minh trực tiếp nhất cho điểm đó, không phải bất kỳ câu đúng nào.",
    example: "Main idea: Reading daily builds vocabulary.\nStrong detail: A study found daily readers learned far more new words.\nWeak detail: Libraries are quiet places.",
    exampleVn: "Ý chính: Đọc sách hàng ngày xây dựng vốn từ.\nChi tiết mạnh: Một nghiên cứu cho thấy người đọc hàng ngày học được nhiều từ mới hơn.\nChi tiết yếu: Thư viện là nơi yên tĩnh.",
  },
  {
    type: "concept",
    title: "Summarizing",
    titleVn: "Tóm tắt",
    icon: "AlignLeft",
    color: "bg-[#ff4b4b]",
    content: "A **summary** restates the main idea and the most important details in a few of *your own* words.\n\n> Keep the main idea. Drop the small examples.\n> **Paraphrase** — say it your way — instead of copying whole sentences.\n\nA good summary is short, covers the whole passage, and adds no opinion of your own.",
    contentVn: "Một **bản tóm tắt** nêu lại ý chính và các chi tiết quan trọng nhất trong một vài từ *của chính bạn*.\n\n> Giữ ý chính. Bỏ các ví dụ nhỏ.\n> **Diễn giải** — nói theo cách của bạn — thay vì sao chép cả câu.\n\nMột bản tóm tắt tốt thì ngắn gọn, bao quát toàn bộ đoạn văn, và không thêm ý kiến của riêng bạn.",
    example: "Passage: a paragraph on why bees help farmers.\nSummary: Bees are important to farming because they pollinate crops.",
    exampleVn: "Đoạn văn: một đoạn về lý do ong giúp nông dân.\nTóm tắt: Ong quan trọng với nông nghiệp vì chúng thụ phấn cho cây trồng.",
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can name the topic, state the main idea in a sentence, pick the details that support it, and summarize a passage.",
    subtitleVn: "Đạt được mục tiêu: Bạn có thể gọi tên chủ đề, nêu ý chính bằng một câu, chọn các chi tiết hỗ trợ nó, và tóm tắt một đoạn văn.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
