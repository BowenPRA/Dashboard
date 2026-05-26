// src/data/ESL/CAMP_1A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Thinking Like a Scientist",
    titleVn: "Tư duy như một Nhà khoa học",
    subtitle: "Objective: Learn the Scientific Method and use it to study plants, habitats, and nature around our camp.",
    subtitleVn: "Mục tiêu: Tìm hiểu Phương pháp Khoa học và sử dụng nó để nghiên cứu thực vật, môi trường sống và thiên nhiên xung quanh trại của chúng ta.",
    color: "bg-[#0ea5e9]",
    borderColor: "border-[#0284c7]",
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_1.mp3"
  },
  {
    type: "concept",
    title: "What is the Scientific Method?",
    titleVn: "Phương pháp Khoa học là gì?",
    icon: "BookOpen",
    color: "bg-[#8b5cf6]",
    content: "A scientist is a person who asks questions about the world and finds answers using a special plan.\n\n> The **Scientific Method** is a step-by-step plan used by scientists to answer questions and solve problems.\n> It has six clear steps. Each step helps us think carefully and learn the truth.",
    contentVn: "Nhà khoa học là người đặt câu hỏi về thế giới và tìm câu trả lời bằng một kế hoạch đặc biệt.\n\n> **Phương pháp Khoa học** là một kế hoạch từng bước được các nhà khoa học sử dụng để trả lời các câu hỏi và giải quyết vấn đề.\n> Nó có sáu bước rõ ràng. Mỗi bước giúp chúng ta suy nghĩ cẩn thận và tìm ra sự thật.",
    example: "Today, you are a scientist. You will use this method to study a real bamboo plant at camp.",
    exampleVn: "Hôm nay, bạn là một nhà khoa học. Bạn sẽ sử dụng phương pháp này để nghiên cứu một cây tre thật tại trại.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <circle cx="200" cy="125" r="90" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="6 4"/>
      <circle cx="200" cy="35" r="22" fill="#8b5cf6"/>
      <text x="200" y="41" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">1</text>
      <circle cx="278" cy="80" r="22" fill="#0ea5e9"/>
      <text x="278" y="86" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">2</text>
      <circle cx="278" cy="170" r="22" fill="#10b981"/>
      <text x="278" y="176" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">3</text>
      <circle cx="200" cy="215" r="22" fill="#f59e0b"/>
      <text x="200" y="221" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">4</text>
      <circle cx="122" cy="170" r="22" fill="#ec4899"/>
      <text x="122" y="176" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">5</text>
      <circle cx="122" cy="80" r="22" fill="#ef4444"/>
      <text x="122" y="86" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">6</text>
      <text x="200" y="130" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e293b" text-anchor="middle">Scientific</text>
      <text x="200" y="148" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e293b" text-anchor="middle">Method</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_2.mp3"
  },
  {
    type: "concept",
    title: "Step 1: Ask a Question",
    titleVn: "Bước 1: Đặt một Câu hỏi",
    icon: "MessageSquare",
    color: "bg-[#ef4444]",
    content: "Every experiment starts with a good question. A scientist looks at the world and wonders, 'Why?' or 'How?'\n\n> A good question is **clear**, **simple**, and **about one thing**.\n> A bad question is too big or has no clear answer.",
    contentVn: "Mỗi thí nghiệm bắt đầu bằng một câu hỏi hay. Nhà khoa học nhìn vào thế giới và tự hỏi, 'Tại sao?' hoặc 'Làm thế nào?'\n\n> Một câu hỏi hay phải **rõ ràng**, **đơn giản** và **về một thứ duy nhất**.\n> Một câu hỏi tồi thì quá lớn hoặc không có câu trả lời rõ ràng.",
    example: "Good Question: 'Does bamboo grow taller in the sun or in the shade?'\nBad Question: 'Why is nature beautiful?'",
    exampleVn: "Câu hỏi hay: 'Cây tre cao hơn ở dưới nắng hay trong bóng râm?'\nCâu hỏi tồi: 'Tại sao thiên nhiên lại đẹp?'",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <circle cx="120" cy="120" r="55" fill="#fef3c7" stroke="#f59e0b" stroke-width="4"/>
      <text x="120" y="145" font-family="sans-serif" font-weight="900" font-size="70" fill="#d97706" text-anchor="middle">?</text>
      <path d="M 180 115 L 245 105" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <path d="M 180 130 L 245 145" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <rect x="250" y="80" width="120" height="40" rx="10" fill="white" stroke="#10b981" stroke-width="3"/>
      <text x="310" y="105" font-family="sans-serif" font-weight="bold" font-size="14" fill="#059669" text-anchor="middle">Sun or Shade?</text>
      <rect x="250" y="135" width="120" height="40" rx="10" fill="white" stroke="#10b981" stroke-width="3"/>
      <text x="310" y="160" font-family="sans-serif" font-weight="bold" font-size="14" fill="#059669" text-anchor="middle">Hot or Cold?</text>
      <text x="200" y="220" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Ask one clear question.</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_3.mp3"
  },
  {
    type: "concept",
    title: "Step 2: Make a Hypothesis",
    titleVn: "Bước 2: Đưa ra Giả thuyết",
    icon: "Target",
    color: "bg-[#f59e0b]",
    content: "After asking a question, scientists make a smart guess about the answer. We call this a **hypothesis**.\n\n> A **Hypothesis** is a smart guess about what will happen in an experiment.\n> A good hypothesis uses the words 'If... then...'",
    contentVn: "Sau khi đặt câu hỏi, các nhà khoa học đưa ra một dự đoán thông minh về câu trả lời. Chúng ta gọi đây là một **giả thuyết**.\n\n> **Giả thuyết** là một dự đoán thông minh về những gì sẽ xảy ra trong một thí nghiệm.\n> Một giả thuyết tốt sử dụng các từ 'Nếu... thì...'",
    example: "If a bamboo plant gets more sunlight, then it will grow taller than a plant in the shade.",
    exampleVn: "Nếu một cây tre nhận được nhiều ánh sáng mặt trời hơn, thì nó sẽ cao hơn cây trong bóng râm.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <circle cx="200" cy="105" r="55" fill="#fef9c3" stroke="#f59e0b" stroke-width="4"/>
      <path d="M 200 70 Q 180 90 185 115 L 215 115 Q 220 90 200 70 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3"/>
      <rect x="188" y="115" width="24" height="10" fill="#64748b"/>
      <rect x="190" y="125" width="20" height="6" fill="#475569"/>
      <path d="M 200 35 L 200 50" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <path d="M 145 65 L 158 75" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <path d="M 255 65 L 242 75" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <rect x="70" y="180" width="260" height="50" rx="10" fill="white" stroke="#8b5cf6" stroke-width="3"/>
      <text x="200" y="202" font-family="sans-serif" font-weight="bold" font-size="13" fill="#7c3aed" text-anchor="middle">If the plant gets more sun,</text>
      <text x="200" y="220" font-family="sans-serif" font-weight="bold" font-size="13" fill="#7c3aed" text-anchor="middle">then it will grow taller.</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_4.mp3"
  },
  {
    type: "concept",
    title: "Step 3: Design an Experiment",
    titleVn: "Bước 3: Thiết kế Thí nghiệm",
    icon: "Scale",
    color: "bg-[#0ea5e9]",
    content: "An **experiment** is a test we do to see if our hypothesis is correct.\n\n> A fair experiment changes only **one thing** at a time.\n> Everything else must stay the same. We call this a **fair test**.",
    contentVn: "**Thí nghiệm** là một bài kiểm tra chúng ta làm để xem giả thuyết của mình có đúng không.\n\n> Một thí nghiệm công bằng chỉ thay đổi **một thứ duy nhất** tại một thời điểm.\n> Mọi thứ khác phải giữ nguyên. Chúng ta gọi đây là **bài kiểm tra công bằng**.",
    example: "Place two bamboo plants in different spots. Plant A gets sun. Plant B gets shade. Give both plants the SAME amount of water and soil.",
    exampleVn: "Đặt hai cây tre ở các vị trí khác nhau. Cây A có nắng. Cây B trong bóng râm. Cho cả hai cây cùng một lượng nước và đất GIỐNG NHAU.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="200" y1="20" x2="200" y2="230" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4"/>
      <text x="100" y="40" font-family="sans-serif" font-weight="900" font-size="16" fill="#f59e0b" text-anchor="middle">Plant A: Sun</text>
      <circle cx="55" cy="75" r="14" fill="#fbbf24"/>
      <path d="M 55 55 L 55 50 M 70 75 L 75 75 M 40 75 L 35 75 M 55 95 L 55 100 M 67 63 L 70 60 M 43 63 L 40 60 M 67 87 L 70 90 M 43 87 L 40 90" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      <rect x="80" y="150" width="60" height="50" fill="#92400e" stroke="#78350f" stroke-width="2"/>
      <path d="M 100 150 Q 95 100 105 80 M 110 150 Q 115 90 105 70 M 120 150 Q 125 105 115 85" stroke="#16a34a" stroke-width="4" stroke-linecap="round" fill="none"/>
      <ellipse cx="105" cy="78" rx="8" ry="4" fill="#16a34a"/>
      <ellipse cx="115" cy="85" rx="8" ry="4" fill="#16a34a"/>
      <text x="110" y="225" font-family="sans-serif" font-weight="bold" font-size="13" fill="#16a34a" text-anchor="middle">Tall &amp; Healthy</text>
      <text x="300" y="40" font-family="sans-serif" font-weight="900" font-size="16" fill="#64748b" text-anchor="middle">Plant B: Shade</text>
      <rect x="240" y="55" width="120" height="45" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3"/>
      <text x="300" y="82" font-family="sans-serif" font-weight="bold" font-size="12" fill="#475569" text-anchor="middle">Shadow</text>
      <rect x="280" y="150" width="60" height="50" fill="#92400e" stroke="#78350f" stroke-width="2"/>
      <path d="M 300 150 Q 298 130 305 120" stroke="#16a34a" stroke-width="4" stroke-linecap="round" fill="none"/>
      <ellipse cx="305" cy="118" rx="6" ry="3" fill="#16a34a"/>
      <text x="310" y="225" font-family="sans-serif" font-weight="bold" font-size="13" fill="#64748b" text-anchor="middle">Short</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_5.mp3"
  },
  {
    type: "concept",
    title: "Step 4: Measure & Observe",
    titleVn: "Bước 4: Đo lường & Quan sát",
    icon: "Target",
    color: "bg-[#10b981]",
    content: "When we run an experiment, we must watch carefully and **measure** everything we can.\n\n> To **measure** means to find the size, height, or amount of something using a tool.\n> We use a ruler for height, a scale for weight, and a clock for time.",
    contentVn: "Khi chúng ta tiến hành thí nghiệm, chúng ta phải quan sát cẩn thận và **đo lường** mọi thứ có thể.\n\n> **Đo lường** có nghĩa là tìm ra kích thước, chiều cao hoặc số lượng của một cái gì đó bằng cách sử dụng một công cụ.\n> Chúng ta dùng thước để đo chiều cao, cân để đo trọng lượng, và đồng hồ để đo thời gian.",
    example: "Every Friday, we measure the height of our bamboo plant in centimetres (cm) using a ruler.",
    exampleVn: "Mỗi thứ Sáu, chúng ta đo chiều cao của cây tre bằng xăng-ti-mét (cm) bằng cách dùng thước.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="170" y="180" width="60" height="40" fill="#92400e" stroke="#78350f" stroke-width="2"/>
      <path d="M 195 180 Q 192 130 198 90 M 200 180 Q 205 120 200 70 M 205 180 Q 210 140 207 100" stroke="#16a34a" stroke-width="5" stroke-linecap="round" fill="none"/>
      <ellipse cx="198" cy="88" rx="9" ry="5" fill="#16a34a"/>
      <ellipse cx="200" cy="68" rx="11" ry="6" fill="#16a34a"/>
      <ellipse cx="207" cy="98" rx="9" ry="5" fill="#16a34a"/>
      <rect x="280" y="60" width="30" height="160" rx="4" fill="#fef9c3" stroke="#ca8a04" stroke-width="3"/>
      <line x1="280" y1="80" x2="295" y2="80" stroke="#ca8a04" stroke-width="2"/>
      <line x1="280" y1="100" x2="295" y2="100" stroke="#ca8a04" stroke-width="2"/>
      <line x1="280" y1="120" x2="300" y2="120" stroke="#ca8a04" stroke-width="2"/>
      <line x1="280" y1="140" x2="295" y2="140" stroke="#ca8a04" stroke-width="2"/>
      <line x1="280" y1="160" x2="295" y2="160" stroke="#ca8a04" stroke-width="2"/>
      <line x1="280" y1="180" x2="300" y2="180" stroke="#ca8a04" stroke-width="2"/>
      <line x1="280" y1="200" x2="295" y2="200" stroke="#ca8a04" stroke-width="2"/>
      <text x="305" y="125" font-family="sans-serif" font-weight="bold" font-size="11" fill="#ca8a04">10</text>
      <text x="305" y="185" font-family="sans-serif" font-weight="bold" font-size="11" fill="#ca8a04">20</text>
      <path d="M 230 100 L 275 90" stroke="#ef4444" stroke-width="3" stroke-dasharray="5 3"/>
      <text x="100" y="115" font-family="sans-serif" font-weight="900" font-size="22" fill="#10b981" text-anchor="middle">15 cm</text>
      <text x="100" y="140" font-family="sans-serif" font-weight="bold" font-size="13" fill="#64748b" text-anchor="middle">Friday Week 1</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_6.mp3"
  },
  {
    type: "concept",
    title: "Step 5: Record Your Data",
    titleVn: "Bước 5: Ghi chép Dữ liệu",
    icon: "BookOpen",
    color: "bg-[#ec4899]",
    content: "Scientists never trust their memory! They always write things down.\n\n> **Data** is the information and facts we collect during an experiment.\n> To **record** means to write down information so it is not forgotten.\n> Use a notebook, a table, or a chart to keep your data safe.",
    contentVn: "Các nhà khoa học không bao giờ tin vào trí nhớ của mình! Họ luôn ghi chép mọi thứ lại.\n\n> **Dữ liệu** là thông tin và sự thật mà chúng ta thu thập trong một thí nghiệm.\n> **Ghi chép** có nghĩa là viết lại thông tin để không bị quên.\n> Dùng sổ tay, bảng biểu hoặc biểu đồ để giữ dữ liệu của bạn an toàn.",
    example: "Week 1: 15 cm. Week 2: 22 cm. Week 3: 31 cm. Always write the date next to your measurement.",
    exampleVn: "Tuần 1: 15 cm. Tuần 2: 22 cm. Tuần 3: 31 cm. Luôn ghi ngày bên cạnh số đo của bạn.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="80" y="40" width="240" height="180" rx="8" fill="white" stroke="#ec4899" stroke-width="4"/>
      <rect x="80" y="40" width="240" height="35" fill="#ec4899"/>
      <text x="200" y="63" font-family="sans-serif" font-weight="900" font-size="14" fill="white" text-anchor="middle">BAMBOO GROWTH LOG</text>
      <line x1="200" y1="75" x2="200" y2="220" stroke="#fbcfe8" stroke-width="2"/>
      <line x1="80" y1="105" x2="320" y2="105" stroke="#fbcfe8" stroke-width="2"/>
      <line x1="80" y1="140" x2="320" y2="140" stroke="#fbcfe8" stroke-width="2"/>
      <line x1="80" y1="175" x2="320" y2="175" stroke="#fbcfe8" stroke-width="2"/>
      <text x="140" y="97" font-family="sans-serif" font-weight="bold" font-size="13" fill="#9d174d" text-anchor="middle">Week</text>
      <text x="260" y="97" font-family="sans-serif" font-weight="bold" font-size="13" fill="#9d174d" text-anchor="middle">Height</text>
      <text x="140" y="129" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">1</text>
      <text x="260" y="129" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">15 cm</text>
      <text x="140" y="164" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">2</text>
      <text x="260" y="164" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">22 cm</text>
      <text x="140" y="199" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">3</text>
      <text x="260" y="199" font-family="sans-serif" font-weight="bold" font-size="13" fill="#475569" text-anchor="middle">31 cm</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_7.mp3"
  },
  {
    type: "concept",
    title: "Step 6: Form a Conclusion",
    titleVn: "Bước 6: Đưa ra Kết luận",
    icon: "ShieldCheck",
    color: "bg-[#58cc02]",
    content: "After the experiment ends, we look at all our data and decide what it means.\n\n> A **Conclusion** is the final answer or result at the end of an experiment.\n> Ask yourself: 'Was my hypothesis right or wrong? What did the data show?'",
    contentVn: "Sau khi thí nghiệm kết thúc, chúng ta nhìn vào tất cả dữ liệu và quyết định ý nghĩa của nó.\n\n> **Kết luận** là câu trả lời hoặc kết quả cuối cùng khi kết thúc một thí nghiệm.\n> Hãy tự hỏi: 'Giả thuyết của tôi đúng hay sai? Dữ liệu cho thấy điều gì?'",
    example: "My data shows the plant in the sun grew 31 cm, but the plant in the shade only grew 8 cm. My conclusion: bamboo grows taller in the sun. My hypothesis was correct!",
    exampleVn: "Dữ liệu của tôi cho thấy cây dưới nắng cao 31 cm, nhưng cây trong bóng râm chỉ cao 8 cm. Kết luận của tôi: cây tre cao hơn dưới ánh nắng. Giả thuyết của tôi đã đúng!",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="60" y1="200" x2="340" y2="200" stroke="#cbd5e1" stroke-width="3"/>
      <line x1="60" y1="200" x2="60" y2="50" stroke="#cbd5e1" stroke-width="3"/>
      <rect x="110" y="80" width="60" height="120" fill="#fbbf24" stroke="#d97706" stroke-width="3" rx="4"/>
      <text x="140" y="65" font-family="sans-serif" font-weight="900" font-size="16" fill="#d97706" text-anchor="middle">31 cm</text>
      <text x="140" y="225" font-family="sans-serif" font-weight="bold" font-size="13" fill="#64748b" text-anchor="middle">Sun</text>
      <rect x="230" y="170" width="60" height="30" fill="#94a3b8" stroke="#475569" stroke-width="3" rx="4"/>
      <text x="260" y="160" font-family="sans-serif" font-weight="900" font-size="16" fill="#475569" text-anchor="middle">8 cm</text>
      <text x="260" y="225" font-family="sans-serif" font-weight="bold" font-size="13" fill="#64748b" text-anchor="middle">Shade</text>
      <circle cx="340" cy="55" r="20" fill="#58cc02"/>
      <path d="M 332 56 L 338 62 L 350 50" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text x="340" y="95" font-family="sans-serif" font-weight="bold" font-size="11" fill="#58cc02" text-anchor="middle">Hypothesis</text>
      <text x="340" y="108" font-family="sans-serif" font-weight="bold" font-size="11" fill="#58cc02" text-anchor="middle">Correct!</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_8.mp3"
  },
  {
    type: "concept",
    title: "What Plants Need to Survive",
    titleVn: "Thực vật cần gì để Sinh tồn",
    icon: "Target",
    color: "bg-[#22c55e]",
    content: "To plan a good experiment with plants, we must know what plants need.\n\n> To **survive** means to stay alive.\n> Plants need four important things to survive: **sunlight**, **water**, **air**, and **nutrients** from the soil.",
    contentVn: "Để lên kế hoạch cho một thí nghiệm tốt với thực vật, chúng ta phải biết thực vật cần gì.\n\n> **Sinh tồn** có nghĩa là tiếp tục sống.\n> Thực vật cần bốn thứ quan trọng để sống sót: **ánh sáng mặt trời**, **nước**, **không khí** và **chất dinh dưỡng** từ đất.",
    example: "If we take away just one of these four things, the plant cannot survive.",
    exampleVn: "Nếu chúng ta lấy đi chỉ một trong bốn thứ này, cây sẽ không thể sống sót.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="160" y="170" width="80" height="55" fill="#92400e" stroke="#78350f" stroke-width="3"/>
      <path d="M 190 170 Q 188 130 195 105 M 200 170 Q 205 110 200 80 M 210 170 Q 215 120 208 95" stroke="#16a34a" stroke-width="5" stroke-linecap="round" fill="none"/>
      <ellipse cx="195" cy="103" rx="9" ry="5" fill="#16a34a"/>
      <ellipse cx="200" cy="78" rx="11" ry="6" fill="#16a34a"/>
      <ellipse cx="208" cy="93" rx="9" ry="5" fill="#16a34a"/>
      <circle cx="60" cy="60" r="22" fill="#fbbf24"/>
      <text x="60" y="105" font-family="sans-serif" font-weight="bold" font-size="12" fill="#d97706" text-anchor="middle">Sunlight</text>
      <path d="M 340 50 Q 350 70 340 85 Q 330 70 340 50 Z" fill="#3b82f6"/>
      <text x="340" y="105" font-family="sans-serif" font-weight="bold" font-size="12" fill="#2563eb" text-anchor="middle">Water</text>
      <circle cx="60" cy="180" r="18" fill="none" stroke="#0ea5e9" stroke-width="3" stroke-dasharray="3 3"/>
      <text x="60" y="186" font-family="sans-serif" font-weight="900" font-size="14" fill="#0284c7" text-anchor="middle">O₂</text>
      <text x="60" y="220" font-family="sans-serif" font-weight="bold" font-size="12" fill="#0284c7" text-anchor="middle">Air</text>
      <circle cx="340" cy="180" r="18" fill="#a78bfa"/>
      <text x="340" y="186" font-family="sans-serif" font-weight="900" font-size="13" fill="white" text-anchor="middle">N</text>
      <text x="340" y="220" font-family="sans-serif" font-weight="bold" font-size="12" fill="#7c3aed" text-anchor="middle">Nutrients</text>
      <path d="M 85 70 L 175 95" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3"/>
      <path d="M 315 70 L 225 95" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3"/>
      <path d="M 85 180 L 158 180" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="3"/>
      <path d="M 315 180 L 242 180" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3"/>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_9.mp3"
  },
  {
    type: "concept",
    title: "Nutrients from the Soil",
    titleVn: "Chất dinh dưỡng từ Đất",
    icon: "Scale",
    color: "bg-[#a855f7]",
    content: "Plants do not just need water — they need food too! This food comes from the soil.\n\n> A **Nutrient** is a substance that provides food for plants and animals to grow.\n> Plants take nutrients from the soil through their roots, just like a straw drinking juice.",
    contentVn: "Thực vật không chỉ cần nước — chúng còn cần thức ăn! Thức ăn này đến từ đất.\n\n> **Chất dinh dưỡng** là một chất cung cấp thức ăn cho thực vật và động vật phát triển.\n> Thực vật lấy chất dinh dưỡng từ đất qua rễ của chúng, giống như một cái ống hút uống nước trái cây.",
    example: "Soil with lots of nutrients is dark and rich. Sandy soil has fewer nutrients and plants grow slowly there.",
    exampleVn: "Đất có nhiều chất dinh dưỡng thì sẫm màu và màu mỡ. Đất cát có ít chất dinh dưỡng hơn và cây phát triển chậm ở đó.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 50 170 L 350 170 L 350 230 L 50 230 Z" fill="#92400e" stroke="#78350f" stroke-width="2"/>
      <circle cx="100" cy="200" r="4" fill="#fbbf24"/>
      <circle cx="150" cy="195" r="4" fill="#a78bfa"/>
      <circle cx="200" cy="210" r="4" fill="#fbbf24"/>
      <circle cx="250" cy="200" r="4" fill="#a78bfa"/>
      <circle cx="300" cy="215" r="4" fill="#fbbf24"/>
      <circle cx="120" cy="215" r="4" fill="#a78bfa"/>
      <circle cx="280" cy="190" r="4" fill="#fbbf24"/>
      <path d="M 200 170 Q 195 130 200 80" stroke="#16a34a" stroke-width="6" stroke-linecap="round" fill="none"/>
      <ellipse cx="200" cy="75" rx="14" ry="8" fill="#16a34a"/>
      <ellipse cx="185" cy="115" rx="10" ry="5" fill="#16a34a"/>
      <ellipse cx="215" cy="100" rx="10" ry="5" fill="#16a34a"/>
      <path d="M 200 170 Q 180 200 160 220 M 200 170 Q 220 200 240 220 M 200 170 L 200 220" stroke="#78350f" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 165 215 L 168 210 M 235 215 L 232 210 M 200 218 L 200 213" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <text x="80" y="50" font-family="sans-serif" font-weight="bold" font-size="13" fill="#a855f7">Nutrients (•)</text>
      <text x="80" y="155" font-family="sans-serif" font-weight="bold" font-size="13" fill="#78350f">Soil</text>
      <path d="M 200 75 L 200 60" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-dasharray="3"/>
      <text x="230" y="55" font-family="sans-serif" font-weight="bold" font-size="12" fill="#16a34a">Grows tall!</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_10.mp3"
  },
  {
    type: "concept",
    title: "Habitats Around Camp",
    titleVn: "Môi trường sống Quanh Trại",
    icon: "BookOpen",
    color: "bg-[#0ea5e9]",
    content: "Different living things live in different places. Each living thing has a place that is just right for it.\n\n> A **Habitat** is the natural home or environment of a living plant or animal.\n> Around our camp, we have many habitats: the forest, the pond, the field, and the rocky hill.",
    contentVn: "Các sinh vật khác nhau sống ở những nơi khác nhau. Mỗi sinh vật sống có một nơi vừa vặn với nó.\n\n> **Môi trường sống** là ngôi nhà hoặc môi trường tự nhiên của một loài thực vật hoặc động vật sống.\n> Xung quanh trại của chúng ta, có nhiều môi trường sống: rừng, ao, đồng cỏ, và đồi đá.",
    example: "Frogs live in the pond habitat. Bamboo grows well in the forest habitat. Lizards prefer the rocky hill habitat.",
    exampleVn: "Ếch sống ở môi trường ao. Tre phát triển tốt ở môi trường rừng. Thằn lằn thích môi trường đồi đá.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="20" y="40" width="170" height="90" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>
      <path d="M 50 130 L 50 90 M 60 130 L 60 85 M 70 130 L 70 95" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="85" r="6" fill="#16a34a"/>
      <circle cx="60" cy="80" r="6" fill="#16a34a"/>
      <circle cx="70" cy="90" r="6" fill="#16a34a"/>
      <text x="130" y="80" font-family="sans-serif" font-weight="900" font-size="14" fill="#15803d">Forest</text>
      <text x="130" y="100" font-family="sans-serif" font-weight="bold" font-size="11" fill="#15803d">Bamboo, Trees</text>
      <rect x="210" y="40" width="170" height="90" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/>
      <ellipse cx="245" cy="100" rx="25" ry="10" fill="#3b82f6"/>
      <path d="M 240 90 Q 245 85 250 90" stroke="#16a34a" stroke-width="3" fill="none"/>
      <text x="320" y="80" font-family="sans-serif" font-weight="900" font-size="14" fill="#1d4ed8">Pond</text>
      <text x="320" y="100" font-family="sans-serif" font-weight="bold" font-size="11" fill="#1d4ed8">Frogs, Fish</text>
      <rect x="20" y="140" width="170" height="90" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="3"/>
      <path d="M 30 200 L 30 195 M 40 200 L 40 192 M 50 200 L 50 196 M 60 200 L 60 193 M 70 200 L 70 197" stroke="#ca8a04" stroke-width="2" stroke-linecap="round"/>
      <text x="130" y="180" font-family="sans-serif" font-weight="900" font-size="14" fill="#a16207">Field</text>
      <text x="130" y="200" font-family="sans-serif" font-weight="bold" font-size="11" fill="#a16207">Grass, Bugs</text>
      <rect x="210" y="140" width="170" height="90" rx="8" fill="#f3f4f6" stroke="#6b7280" stroke-width="3"/>
      <circle cx="240" cy="200" r="10" fill="#9ca3af"/>
      <circle cx="255" cy="195" r="8" fill="#9ca3af"/>
      <circle cx="230" cy="190" r="6" fill="#9ca3af"/>
      <text x="320" y="180" font-family="sans-serif" font-weight="900" font-size="14" fill="#4b5563">Hill</text>
      <text x="320" y="200" font-family="sans-serif" font-weight="bold" font-size="11" fill="#4b5563">Lizards, Rocks</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_11.mp3"
  },
  {
    type: "concept",
    title: "Be a Camp Scientist!",
    titleVn: "Hãy là Nhà khoa học của Trại!",
    icon: "ShieldCheck",
    color: "bg-[#f97316]",
    content: "Now you have all the tools. This week, you will be a real scientist at camp!\n\n> **Your Mission:** Pick one habitat around camp. Ask a question. Make a hypothesis. Measure and record what you see for 5 days. Form your conclusion on Friday.\n> Remember: write everything down. Trust your data, not your memory.",
    contentVn: "Bây giờ bạn đã có tất cả các công cụ. Tuần này, bạn sẽ là một nhà khoa học thực thụ tại trại!\n\n> **Nhiệm vụ của bạn:** Chọn một môi trường sống xung quanh trại. Đặt một câu hỏi. Đưa ra giả thuyết. Đo lường và ghi chép những gì bạn thấy trong 5 ngày. Đưa ra kết luận của bạn vào thứ Sáu.\n> Hãy nhớ: viết mọi thứ ra. Tin vào dữ liệu của bạn, không phải trí nhớ.",
    example: "Question: Do bigger leaves grow on plants near the pond? Hypothesis: If plants get more water, then leaves will be bigger.",
    exampleVn: "Câu hỏi: Lá to hơn có mọc trên cây gần ao không? Giả thuyết: Nếu cây có nhiều nước hơn, thì lá sẽ to hơn.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <circle cx="200" cy="110" r="40" fill="#fed7aa" stroke="#f97316" stroke-width="4"/>
      <circle cx="200" cy="110" r="22" fill="white" stroke="#f97316" stroke-width="3"/>
      <text x="200" y="117" font-family="sans-serif" font-weight="900" font-size="20" fill="#ea580c" text-anchor="middle">?</text>
      <rect x="60" y="190" width="80" height="40" rx="8" fill="white" stroke="#0ea5e9" stroke-width="3"/>
      <text x="100" y="208" font-family="sans-serif" font-weight="900" font-size="11" fill="#0284c7" text-anchor="middle">Observe</text>
      <text x="100" y="222" font-family="sans-serif" font-weight="bold" font-size="10" fill="#0284c7" text-anchor="middle">👁️ Look</text>
      <rect x="160" y="190" width="80" height="40" rx="8" fill="white" stroke="#10b981" stroke-width="3"/>
      <text x="200" y="208" font-family="sans-serif" font-weight="900" font-size="11" fill="#059669" text-anchor="middle">Measure</text>
      <text x="200" y="222" font-family="sans-serif" font-weight="bold" font-size="10" fill="#059669" text-anchor="middle">📏 Ruler</text>
      <rect x="260" y="190" width="80" height="40" rx="8" fill="white" stroke="#ec4899" stroke-width="3"/>
      <text x="300" y="208" font-family="sans-serif" font-weight="900" font-size="11" fill="#be185d" text-anchor="middle">Record</text>
      <text x="300" y="222" font-family="sans-serif" font-weight="bold" font-size="10" fill="#be185d" text-anchor="middle">📓 Write</text>
      <path d="M 160 130 L 110 185" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3"/>
      <path d="M 200 150 L 200 185" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3"/>
      <path d="M 240 130 L 290 185" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3"/>
      <text x="200" y="40" font-family="sans-serif" font-weight="900" font-size="16" fill="#ea580c" text-anchor="middle">YOUR CAMP MISSION</text>
    </svg>`,
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_12.mp3"
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "You now think like a scientist. Use the six steps to explore the world around our camp this week!",
    subtitleVn: "Bây giờ bạn đã tư duy như một nhà khoa học. Hãy sử dụng sáu bước để khám phá thế giới xung quanh trại của chúng ta trong tuần này!",
    color: "bg-[#10b981]",
    borderColor: "border-[#059669]",
    audio: "/audio/ESL/CAMP_1A/slide_CAMP_1A_13.mp3"
  }
];