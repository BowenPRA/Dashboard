import { DIAGRAMS } from './diagrams.js';
// src/data/GED_ENG/ENG_1B/notes.js
// Lesson 8 — Author's Purpose, Tone & Point of View (Reading strand).

export const notes = [
  {
    type: "intro",
    title: "Purpose, Tone & View",
    titleVn: "Mục đích, Giọng điệu & Góc nhìn",
    subtitle: "Objective: Work out why an author wrote a text, hear the attitude in their word choice, and see whose side the writing takes.",
    subtitleVn: "Mục tiêu: Hiểu tại sao tác giả viết một văn bản, nghe được thái độ trong cách chọn từ của họ, và thấy bài viết đứng về phía nào.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Author's Purpose",
    titleVn: "Mục đích của Tác giả",
    icon: "Target",
    color: "bg-[#ff9600]",
    content: "Before you judge a text, ask *why* it was written. Three purposes cover most of the GED — remember **PIE**:\n\n> **P**ersuade — to make you agree or act (editorials, ads).\n> **I**nform — to give you facts (news reports, manuals).\n> **E**ntertain — to make you enjoy reading (stories).\n\nThe purpose changes what to expect: a persuasive text pushes an opinion; an informational one should stick to facts.",
    contentVn: "Trước khi đánh giá một văn bản, hãy hỏi *tại sao* nó được viết. Ba mục đích bao quát hầu hết bài thi GED — hãy nhớ **PIE**:\n\n> **Persuade (Thuyết phục)** — để khiến bạn đồng ý hoặc hành động (xã luận, quảng cáo).\n> **Inform (Thông tin)** — để cung cấp cho bạn sự thật (bản tin, sách hướng dẫn).\n> **Entertain (Giải trí)** — để khiến bạn thích đọc (truyện).\n\nMục đích thay đổi điều cần mong đợi: một văn bản thuyết phục đẩy một ý kiến; một văn bản thông tin nên bám vào sự thật.",
    example: "An editorial urging the city to build a park is written to persuade.\nA report listing the city's parks is written to inform.",
    exampleVn: "Một bài xã luận thúc giục thành phố xây công viên được viết để thuyết phục.\nMột báo cáo liệt kê các công viên của thành phố được viết để cung cấp thông tin.",
    inlineSvg: DIAGRAMS.AUTHORS_PURPOSE,
  },
  {
    type: "concept",
    title: "Tone",
    titleVn: "Giọng điệu",
    icon: "MessageSquare",
    color: "bg-[#58cc02]",
    content: "You cannot hear a writer's voice, so you find their **tone** — their attitude toward the subject — in the words they choose.\n\n> Warm words (\"a welcome step\") show an approving tone.\n> Sharp words (\"a reckless plan\") show a critical tone.\n\nLook at the **adjectives and verbs**, not the topic. Two writers on the same topic can have opposite tones.",
    contentVn: "Bạn không thể nghe giọng nói của người viết, nên bạn tìm **giọng điệu** của họ — thái độ đối với chủ đề — trong những từ họ chọn.\n\n> Từ ấm áp (\"một bước đi đáng hoan nghênh\") cho thấy giọng điệu tán thành.\n> Từ sắc bén (\"một kế hoạch liều lĩnh\") cho thấy giọng điệu chỉ trích.\n\nHãy nhìn vào **tính từ và động từ**, không phải chủ đề. Hai người viết về cùng một chủ đề có thể có giọng điệu trái ngược.",
    example: "\"The plan is a bold, welcome change.\" → approving.\n\"The plan is a careless, costly mistake.\" → critical.",
    exampleVn: "\"Kế hoạch là một sự thay đổi táo bạo, đáng hoan nghênh.\" → tán thành.\n\"Kế hoạch là một sai lầm cẩu thả, tốn kém.\" → chỉ trích.",
    inlineSvg: DIAGRAMS.TONE_SPECTRUM,
  },
  {
    type: "concept",
    title: "Word Choice & Connotation",
    titleVn: "Cách chọn từ & Sắc thái nghĩa",
    icon: "Palette",
    color: "bg-[#ce82ff]",
    content: "Writers signal their attitude through **connotation** — the feeling a word carries beyond its plain meaning.\n\n> *Thrifty* and *cheap* both mean \"spends little\", but *thrifty* sounds good and *cheap* sounds bad.\n\nWhen a writer picks the word with the feeling they want, that word choice reveals their attitude and hints at **bias**.",
    contentVn: "Người viết ra hiệu thái độ của họ qua **sắc thái nghĩa** — cảm giác mà một từ mang theo ngoài nghĩa đen của nó.\n\n> *Thrifty* (tiết kiệm) và *cheap* (keo kiệt) đều nghĩa là \"tiêu ít\", nhưng *thrifty* nghe tích cực còn *cheap* nghe tiêu cực.\n\nKhi một người viết chọn từ mang cảm giác họ muốn, cách chọn từ đó bộc lộ thái độ của họ và gợi ý về **thiên kiến**.",
    example: "\"The crowd of protesters\" sounds neutral.\n\"The mob of troublemakers\" shows the writer's negative bias.",
    exampleVn: "\"Đám đông người biểu tình\" nghe trung lập.\n\"Đám côn đồ gây rối\" cho thấy thiên kiến tiêu cực của người viết.",
  },
  {
    type: "concept",
    title: "Point of View",
    titleVn: "Góc nhìn",
    icon: "Eye",
    color: "bg-[#ff4b4b]",
    content: "**Point of view** is whose eyes the text sees through — and, in an argument, which side it takes.\n\n> **First person** (*I, we*) — the writer is inside the story or argument.\n> **Third person** (*he, she, they*) — the writer stands outside.\n\nAlso ask the bigger question: is the writer **for**, **against**, or **neutral** on the issue? A strong stance is not wrong, but you should notice it.",
    contentVn: "**Góc nhìn** là văn bản nhìn qua đôi mắt của ai — và, trong một lập luận, nó đứng về phía nào.\n\n> **Ngôi thứ nhất** (*I, we*) — người viết ở bên trong câu chuyện hoặc lập luận.\n> **Ngôi thứ ba** (*he, she, they*) — người viết đứng bên ngoài.\n\nCũng hãy hỏi câu hỏi lớn hơn: người viết **ủng hộ**, **phản đối**, hay **trung lập** về vấn đề này? Một lập trường mạnh mẽ không sai, nhưng bạn nên nhận ra nó.",
    example: "\"We must act now\" → first person, taking a side.\n\"The council voted on Tuesday\" → third person, neutral.",
    exampleVn: "\"Chúng ta phải hành động ngay\" → ngôi thứ nhất, đứng về một phía.\n\"Hội đồng đã bỏ phiếu vào thứ Ba\" → ngôi thứ ba, trung lập.",
    inlineSvg: DIAGRAMS.POINT_OF_VIEW,
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can name an author's purpose, describe the tone from their word choice, and identify the point of view and any bias.",
    subtitleVn: "Đạt được mục tiêu: Bạn có thể gọi tên mục đích của tác giả, mô tả giọng điệu từ cách chọn từ của họ, và nhận diện góc nhìn cùng bất kỳ thiên kiến nào.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
