// src/data/GED/ENG_1A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Understanding Reading & Arguments",
    titleVn: "Hiểu về Đọc hiểu & Lập luận",
    subtitle: "Objective: Identify the author's purpose, distinguish facts from opinions, and analyze claims and evidence.",
    subtitleVn: "Mục tiêu: Nhận diện mục đích của tác giả, phân biệt sự thật với ý kiến, và phân tích luận điểm và bằng chứng.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Author's Purpose",
    titleVn: "Mục đích của Tác giả",
    icon: "Target",
    color: "bg-[#ff9600]",
    content: "Every text is written with a specific **Purpose** in mind. Before you can analyze a text, you must figure out why the author wrote it in the first place.\n\n> The three most common purposes are **PIE**:\n> **P**ersuade: To convince you to agree.\n> **I**nform: To teach you objective facts.\n> **E**ntertain: To amuse or tell a story.",
    contentVn: "Mỗi văn bản đều được viết với một **Mục đích** cụ thể. Trước khi có thể phân tích văn bản, bạn phải hiểu tại sao tác giả lại viết nó.\n\n> Ba mục đích phổ biến nhất là:\n> **Thuyết phục:** Để thuyết phục bạn đồng ý.\n> **Thông tin:** Để dạy bạn những sự thật khách quan.\n> **Giải trí:** Để làm bạn vui hoặc kể một câu chuyện.",
    example: "A newspaper editorial arguing that the city needs more parks is written to Persuade.",
    exampleVn: "Một bài xã luận trên báo lập luận rằng thành phố cần nhiều công viên hơn được viết để Thuyết phục.",
    audio: "/audio/GED_ENG/ENG_1A/slide_ENG_1A_1.mp3"
  },
  {
    type: "concept",
    title: "Fact vs. Opinion",
    titleVn: "Sự thật vs. Ý kiến",
    icon: "Scale",
    color: "bg-[#58cc02]",
    content: "When reading informational texts or the news, it is critical to separate what is actually true from what the author simply believes.\n\n> A **Fact** is a statement that can be objectively proven true or false using evidence, science, or historical records.\n> An **Opinion** is a personal belief, judgment, or feeling that cannot be universally proven.",
    contentVn: "Khi đọc các văn bản thông tin hoặc tin tức, điều rất quan trọng là phải phân biệt điều gì thực sự đúng với điều mà tác giả chỉ đơn giản tin là đúng.\n\n> **Sự thật** là một tuyên bố có thể được chứng minh khách quan là đúng hoặc sai bằng bằng chứng, khoa học hoặc hồ sơ lịch sử.\n> **Ý kiến** là niềm tin cá nhân, đánh giá hoặc cảm giác không thể được chứng minh một cách phổ quát.",
    example: "Fact: The human body is composed of about 60% water.\nOpinion: Swimming is the best way to exercise.",
    exampleVn: "Sự thật: Cơ thể con người bao gồm khoảng 60% là nước.\nÝ kiến: Bơi lội là cách tốt nhất để tập thể dục.",
    image: "/images/GED/fact_opinion1.svg",
    audio: "/audio/GED_ENG/ENG_1A/slide_ENG_1A_2.mp3"
  },
  {
    type: "concept",
    title: "Claims & Evidence",
    titleVn: "Luận điểm & Bằng chứng",
    icon: "ShieldCheck",
    color: "bg-[#ff4b4b]",
    content: "When an author wants to persuade you, they will build an argument. An argument is not a fight; it is a logical structure.\n\n> **The Claim:** The main argument or point the author is trying to defend.\n> **The Evidence:** The statistics, expert quotes, or historical facts used to prove the claim is valid.",
    contentVn: "Khi một tác giả muốn thuyết phục bạn, họ sẽ xây dựng một lập luận. Lập luận không phải là một cuộc cãi vã; nó là một cấu trúc logic.\n\n> **Luận điểm:** Lập luận chính hoặc điểm mà tác giả đang cố gắng bảo vệ.\n> **Bằng chứng:** Các số liệu thống kê, trích dẫn chuyên gia, hoặc sự thật lịch sử được sử dụng để chứng minh luận điểm là hợp lý.",
    example: "Claim: Daily reading improves vocabulary.\nEvidence: A university study showed that students who read for 20 minutes a day learned 1,800,000 new words a year.",
    exampleVn: "Luận điểm: Đọc sách hàng ngày cải thiện vốn từ vựng.\nBằng chứng: Một nghiên cứu đại học cho thấy những sinh viên đọc 20 phút mỗi ngày học được 1.800.000 từ mới một năm.",
    image: "/images/GED/reading_map1.svg",
    audio: "/audio/GED_ENG/ENG_1A/slide_ENG_1A_3.mp3"
  },
  {
    type: "concept",
    title: "Author's Tone",
    titleVn: "Giọng điệu của Tác giả",
    icon: "MessageSquare",
    color: "bg-[#ce82ff]",
    content: "Because you cannot hear the author's voice when reading, you have to look for emotional clues in the text.\n\n> The **Tone** is the author's underlying attitude or feeling toward the subject they are writing about.\n\nYou can often determine the tone by examining the descriptive adjectives and verbs the author chooses to use.",
    contentVn: "Vì bạn không thể nghe được giọng của tác giả khi đọc, bạn phải tìm kiếm các manh mối cảm xúc trong văn bản.\n\n> **Giọng điệu** là thái độ hoặc cảm xúc cơ bản của tác giả đối với chủ đề mà họ đang viết.\n\nBạn thường có thể xác định giọng điệu bằng cách xem xét các tính từ và động từ miêu tả mà tác giả chọn sử dụng.",
    example: "Using words like 'devastating', 'tragic', and 'heartbreaking' creates a serious, sorrowful tone.\nUsing words like 'ridiculous', 'absurd', and 'nonsense' creates a sarcastic or critical tone.",
    exampleVn: "Sử dụng các từ như 'tàn phá', 'bi thảm' và 'đau lòng' tạo ra một giọng điệu nghiêm túc, buồn bã.\nSử dụng các từ như 'lố bịch', 'vô lý' và 'vô nghĩa' tạo ra một giọng điệu mỉa mai hoặc chỉ trích.",
    audio: "/audio/GED_ENG/ENG_1A/slide_ENG_1A_4.mp3"
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You now understand purpose, claims, and evidence.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn đã hiểu mục đích, luận điểm và bằng chứng.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];