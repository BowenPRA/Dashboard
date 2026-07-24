// src/data/GED/ENG_1B/notes.js

export const notes = [
  {
    type: "intro",
    title: "Rhetorical Analysis & Syntax",
    titleVn: "Phân tích Tu từ & Cú pháp",
    subtitle: "Objective: Analyze how syntax, juxtaposition, and concessions build a persuasive argument.",
    subtitleVn: "Mục tiêu: Phân tích cách cú pháp, sự đặt cạnh nhau và sự nhượng bộ xây dựng một lập luận thuyết phục.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Syntax & Clauses",
    titleVn: "Cú pháp & Mệnh đề",
    icon: "Target",
    color: "bg-[#ff9600]",
    content: "**Syntax** is the architecture of a sentence. Strong writers use different types of **Clauses** to guide the reader's attention and reduce ambiguity.\n\n> **Independent Clause:** The main idea. It can stand alone as a sentence.\n> **Dependent Clause:** Background information. It cannot stand alone.",
    contentVn: "**Cú pháp** là kiến trúc của một câu. Những người viết giỏi sử dụng các loại **Mệnh đề** khác nhau để dẫn dắt sự chú ý của người đọc và giảm thiểu sự mơ hồ.\n\n> **Mệnh đề Độc lập:** Ý chính. Nó có thể đứng riêng lẻ như một câu.\n> **Mệnh đề Phụ thuộc:** Thông tin nền tảng. Nó không thể đứng riêng lẻ.",
    example: "Because it was raining (Dependent), we stayed inside the house (Independent).",
    exampleVn: "Bởi vì trời đang mưa (Phụ thuộc), chúng tôi đã ở trong nhà (Độc lập).",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="50" y="150" width="300" height="20" rx="10" fill="#cbd5e1" />
      <polygon points="200,150 180,200 220,200" fill="#94a3b8" />
      <rect x="70" y="70" width="160" height="80" rx="12" fill="#3b82f6" />
      <text x="150" y="115" fill="white" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Independent</text>
      <rect x="250" y="100" width="100" height="50" rx="8" fill="#93c5fd" />
      <text x="300" y="130" fill="#1e3a8a" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Dependent</text>
      <path d="M 250 125 C 240 125, 235 110, 230 110" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>`,
  },
  {
    type: "concept",
    title: "Juxtaposition",
    titleVn: "Sự đặt cạnh nhau",
    icon: "Layout",
    color: "bg-[#58cc02]",
    content: "When an author wants to highlight a massive difference between two concepts, they use **Juxtaposition**.\n\n> Juxtaposition means placing two opposing ideas, characters, or settings side-by-side to force the reader to compare them. This creates a powerful contrast that makes the author's point much clearer.",
    contentVn: "Khi một tác giả muốn làm nổi bật sự khác biệt lớn giữa hai khái niệm, họ sử dụng **Sự đặt cạnh nhau**.\n\n> Đặt cạnh nhau có nghĩa là đặt hai ý tưởng, nhân vật hoặc bối cảnh đối lập cạnh nhau để buộc người đọc phải so sánh chúng. Điều này tạo ra một sự tương phản mạnh mẽ làm cho quan điểm của tác giả rõ ràng hơn nhiều.",
    example: "The author juxtaposed the billionaire's private jet with the homeless man sleeping on the street.",
    exampleVn: "Tác giả đặt cạnh nhau chiếc máy bay phản lực tư nhân của tỷ phú với người đàn ông vô gia cư ngủ trên đường phố.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <clipPath id="circleClip"><circle cx="200" cy="125" r="100" /></clipPath>
      <g clip-path="url(#circleClip)">
        <rect x="100" y="25" width="100" height="200" fill="#fef08a" />
        <circle cx="150" cy="70" r="20" fill="#f59e0b" />
        <rect x="110" y="130" width="30" height="95" fill="#d97706" />
        <rect x="150" y="100" width="40" height="125" fill="#b45309" />
        
        <rect x="200" y="25" width="100" height="200" fill="#1e1b4b" />
        <path d="M 260 50 A 20 20 0 1 0 280 70 A 25 25 0 0 1 260 50 Z" fill="#c7d2fe" />
        <polygon points="250,120 230,225 270,225" fill="#4338ca" />
        <polygon points="270,140 250,225 290,225" fill="#3730a3" />
      </g>
      <line x1="200" y1="15" x2="200" y2="235" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
    </svg>`,
  },
  {
    type: "concept",
    title: "The Art of Concession",
    titleVn: "Nghệ thuật Nhượng bộ",
    icon: "MessageSquare",
    color: "bg-[#ff4b4b]",
    content: "A persuasive essay is not just about attacking the other side. A smart writer will use a **Concession**.\n\n> A concession is when you temporarily admit that the opposing side has a valid point. \n\nWhy do this? Because it makes you look fair, objective, and trustworthy. Once the reader trusts you, you hit them with your stronger counter-argument (rebuttal).",
    contentVn: "Một bài luận thuyết phục không chỉ là tấn công phe đối lập. Một người viết thông minh sẽ sử dụng **Sự nhượng bộ**.\n\n> Sự nhượng bộ là khi bạn tạm thời thừa nhận rằng phe đối lập có một quan điểm hợp lý.\n\nTại sao lại làm điều này? Bởi vì nó làm cho bạn trông công bằng, khách quan và đáng tin cậy. Khi người đọc đã tin tưởng bạn, bạn sẽ đưa ra phản biện mạnh mẽ hơn của mình.",
    example: "\"While it is true that electric cars are expensive (Concession), they save you thousands of dollars in gas over ten years (Rebuttal).\"",
    exampleVn: "\"Mặc dù đúng là ô tô điện rất đắt (Nhượng bộ), chúng tiết kiệm cho bạn hàng ngàn đô la tiền xăng trong mười năm (Phản biện).\"",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 120 70 h 80 a 30 30 0 0 1 30 30 v 40 a 30 30 0 0 1 -30 30 h -50 l -30 30 v -30 h -10 a 30 30 0 0 1 -30 -30 v -40 a 30 30 0 0 1 30 -30 z" fill="#fca5a5" opacity="0.9" />
      <path d="M 130 120 l 15 15 l 30 -30" stroke="#991b1b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <path d="M 280 90 h -80 a 30 30 0 0 0 -30 30 v 40 a 30 30 0 0 0 30 30 h 10 v 30 l 30 -30 h 50 a 30 30 0 0 0 30 -30 v -40 a 30 30 0 0 0 -30 -30 z" fill="#60a5fa" opacity="0.9" />
      <circle cx="200" cy="140" r="25" fill="#fef08a" />
      <path d="M 190 170 h 20 v 10 h -20 z" fill="#eab308" />
      <path d="M 195 180 h 10 v 5 h -10 z" fill="#ca8a04" />
    </svg>`,
  },
  {
    type: "concept",
    title: "Synthesis & Cohesion",
    titleVn: "Tổng hợp & Mạch lạc",
    icon: "Link",
    color: "bg-[#ce82ff]",
    content: "When reading multiple historical texts or scientific reports, you cannot just list facts. You must perform a **Synthesis**.\n\n> **Synthesis** means combining information from different sources to create one new, unified conclusion.\n> **Cohesion** is how smoothly these ideas are glued together using logical transitions.",
    contentVn: "Khi đọc nhiều văn bản lịch sử hoặc báo cáo khoa học, bạn không thể chỉ liệt kê các sự kiện. Bạn phải thực hiện sự **Tổng hợp**.\n\n> **Tổng hợp** có nghĩa là kết hợp thông tin từ các nguồn khác nhau để tạo ra một kết luận mới, thống nhất.\n> **Mạch lạc** là mức độ trơn tru mà các ý tưởng này được gắn kết với nhau bằng cách sử dụng các chuyển tiếp logic.",
    example: "By synthesizing the data from Text A and Text B, we can clearly see that the economy is improving.",
    exampleVn: "Bằng cách tổng hợp dữ liệu từ Văn bản A và Văn bản B, chúng ta có thể thấy rõ rằng nền kinh tế đang được cải thiện.",
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You now understand advanced syntax and rhetorical devices.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn đã hiểu cú pháp nâng cao và các biện pháp tu từ.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];