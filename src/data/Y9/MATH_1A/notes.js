// src/data/Y9/Math_1A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Correlation & Scatter Graphs",
    titleVn: "Tương quan & Biểu đồ phân tán",
    subtitle: "Objective: Understand bivariate data, scatter graphs, and the mathematical measurement of correlation.",
    subtitleVn: "Mục tiêu: Hiểu về dữ liệu hai biến, biểu đồ phân tán và phép đo lường toán học của sự tương quan.",
    color: "bg-[#8b5cf6]", 
    borderColor: "border-[#7c3aed]"
  },
  {
    type: "concept",
    title: "What is Correlation?",
    titleVn: "Sự tương quan là gì?",
    icon: "Link",
    color: "bg-[#14b8a6]",
    content: "In science and mathematics, we don't just guess if two things are connected. We measure exactly *how* they are connected using data.\n\n> A **Correlation** is a mathematical connection or relationship between two variables. It helps us predict how one thing affects another.",
    contentVn: "Trong khoa học và toán học, chúng ta không chỉ đoán xem hai sự vật có liên kết với nhau hay không. Chúng ta đo lường chính xác *cách* chúng kết nối bằng dữ liệu.\n\n> **Sự tương quan** là một sự kết nối hoặc mối quan hệ toán học giữa hai biến số. Nó giúp chúng ta dự đoán cách một sự vật ảnh hưởng đến sự vật khác.",
    example: "There is a correlation between how long you sleep (Variable 1) and how much energy you have the next day (Variable 2).",
    exampleVn: "Có một sự tương quan giữa việc bạn ngủ bao lâu (Biến số 1) và mức năng lượng bạn có vào ngày hôm sau (Biến số 2).",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#34d399" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="125" r="45" fill="#e0f2fe" stroke="#38bdf8" stroke-width="6"/>
      <text x="120" y="132" fill="#0284c7" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif">Thing A</text>
      <circle cx="280" cy="125" r="45" fill="#d1fae5" stroke="#34d399" stroke-width="6"/>
      <text x="280" y="132" fill="#059669" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif">Thing B</text>
      <path d="M 165 125 L 235 125" stroke="url(#linkGrad)" stroke-width="12" stroke-linecap="round" stroke-dasharray="10 10"/>
      <path d="M 180 105 L 220 105" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
      <path d="M 180 145 L 220 145" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    type: "concept",
    title: "Variables & The Grid",
    titleVn: "Biến số & Lưới Tọa độ",
    icon: "Target",
    color: "bg-[#3b82f6]",
    content: "To measure a connection mathematically, we need two **Variables** (things we can measure, like height and weight). We plot these on a coordinate grid.\n\n> **The X-Axis:** The horizontal line, usually representing the independent variable (the cause).\n> **The Y-Axis:** The vertical line, usually representing the dependent variable (the effect).",
    contentVn: "Để đo lường một sự kết nối về mặt toán học, chúng ta cần hai **Biến số** (những thứ có thể đo lường, như chiều cao và cân nặng). Chúng ta vẽ chúng trên một lưới tọa độ.\n\n> **Trục X:** Đường nằm ngang, thường đại diện cho biến độc lập (nguyên nhân).\n> **Trục Y:** Đường thẳng đứng, thường đại diện cho biến phụ thuộc (kết quả).",
    example: "If tracking plant growth, 'Time' goes on the X-Axis, and the 'Plant's Height' goes on the Y-Axis.",
    exampleVn: "Nếu theo dõi sự phát triển của cây, 'Thời gian' nằm trên Trục X, và 'Chiều cao của cây' nằm trên Trục Y.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <g stroke="#f1f5f9" stroke-width="2">
        <line x1="50" y1="50" x2="350" y2="50"/>
        <line x1="50" y1="100" x2="350" y2="100"/>
        <line x1="50" y1="150" x2="350" y2="150"/>
        <line x1="100" y1="20" x2="100" y2="200"/>
        <line x1="150" y1="20" x2="150" y2="200"/>
        <line x1="200" y1="20" x2="200" y2="200"/>
        <line x1="250" y1="20" x2="250" y2="200"/>
        <line x1="300" y1="20" x2="300" y2="200"/>
      </g>
      <line x1="50" y1="200" x2="360" y2="200" stroke="#1e293b" stroke-width="5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <line x1="50" y1="200" x2="50" y2="20" stroke="#1e293b" stroke-width="5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <rect x="180" y="215" width="80" height="25" rx="6" fill="#3b82f6" />
      <text x="220" y="233" fill="white" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">X-Axis</text>
      <rect x="5" y="80" width="80" height="25" rx="6" fill="#3b82f6" transform="rotate(-90 45 92)" />
      <text x="45" y="97" fill="white" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif" transform="rotate(-90 45 92)">Y-Axis</text>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b" />
        </marker>
      </defs>
    </svg>`
  },
  {
    type: "concept",
    title: "Positive Correlation",
    titleVn: "Tương quan Dương",
    icon: "ChevronRight",
    color: "bg-[#10b981]",
    content: "When we plot data, the dots might form an upward pattern. This tells us the two variables are moving in the same direction.\n\n> A **Positive Correlation** occurs when both variables increase together.\n> **Rule:** As X gets bigger, Y gets bigger.",
    contentVn: "Khi vẽ biểu đồ dữ liệu, các dấu chấm có thể tạo thành một dải hướng lên. Điều này cho chúng ta biết hai biến số đang di chuyển cùng chiều.\n\n> Một **Tương quan Dương** xảy ra khi cả hai biến số cùng tăng.\n> **Quy tắc:** Khi X lớn hơn, Y cũng lớn hơn.",
    example: "There is a positive correlation between 'Hours Spent Studying' (X) and 'Math Test Score' (Y). The more you study, the higher your score.",
    exampleVn: "Có một sự tương quan dương giữa 'Số giờ học' (X) và 'Điểm bài kiểm tra' (Y). Bạn càng học nhiều, điểm càng cao.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="50" y1="200" x2="350" y2="200" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <line x1="50" y1="200" x2="50" y2="30" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <text x="200" y="230" fill="#64748b" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Hours Studying (X)</text>
      <text x="20" y="115" fill="#64748b" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif" transform="rotate(-90 20 115)">Test Score (Y)</text>
      <line x1="60" y1="190" x2="330" y2="50" stroke="#d1fae5" stroke-width="20" stroke-linecap="round"/>
      <circle cx="80" cy="180" r="7" fill="#10b981"/>
      <circle cx="100" cy="170" r="7" fill="#10b981"/>
      <circle cx="130" cy="160" r="7" fill="#10b981"/>
      <circle cx="140" cy="140" r="7" fill="#10b981"/>
      <circle cx="180" cy="135" r="7" fill="#10b981"/>
      <circle cx="210" cy="110" r="7" fill="#10b981"/>
      <circle cx="240" cy="100" r="7" fill="#10b981"/>
      <circle cx="270" cy="80" r="7" fill="#10b981"/>
      <circle cx="290" cy="90" r="7" fill="#10b981"/>
      <circle cx="320" cy="60" r="7" fill="#10b981"/>
    </svg>`
  },
  {
    type: "concept",
    title: "Negative Correlation",
    titleVn: "Tương quan Âm",
    icon: "ChevronLeft",
    color: "bg-[#f43f5e]",
    content: "Sometimes, variables move in opposite directions, acting like a mathematical seesaw.\n\n> A **Negative Correlation** occurs when one variable decreases while the other increases.\n> **Rule:** As X gets bigger, Y gets smaller.",
    contentVn: "Đôi khi, các biến số di chuyển theo hướng ngược nhau, hoạt động giống như một chiếc bập bênh toán học.\n\n> Một **Tương quan Âm** xảy ra khi một biến số giảm trong khi biến số kia tăng.\n> **Quy tắc:** Khi X lớn hơn, Y nhỏ đi.",
    example: "There is a negative correlation between 'Age of a Car' (X) and 'Value of the Car' (Y). As the car gets older, its price goes down.",
    exampleVn: "Có một sự tương quan âm giữa 'Tuổi của Ô tô' (X) và 'Giá trị của Ô tô' (Y). Xe càng cũ, giá của nó càng giảm.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="50" y1="200" x2="350" y2="200" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <line x1="50" y1="200" x2="50" y2="30" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <text x="200" y="230" fill="#64748b" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Age of Car in Years (X)</text>
      <text x="20" y="115" fill="#64748b" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif" transform="rotate(-90 20 115)">Value in Dollars (Y)</text>
      <line x1="70" y1="50" x2="330" y2="180" stroke="#ffe4e6" stroke-width="20" stroke-linecap="round"/>
      <circle cx="70" cy="60" r="7" fill="#f43f5e"/>
      <circle cx="90" cy="75" r="7" fill="#f43f5e"/>
      <circle cx="120" cy="85" r="7" fill="#f43f5e"/>
      <circle cx="150" cy="110" r="7" fill="#f43f5e"/>
      <circle cx="180" cy="100" r="7" fill="#f43f5e"/>
      <circle cx="210" cy="130" r="7" fill="#f43f5e"/>
      <circle cx="240" cy="140" r="7" fill="#f43f5e"/>
      <circle cx="280" cy="155" r="7" fill="#f43f5e"/>
      <circle cx="300" cy="170" r="7" fill="#f43f5e"/>
      <circle cx="320" cy="165" r="7" fill="#f43f5e"/>
    </svg>`
  },
  {
    type: "concept",
    title: "Strong vs. Weak",
    titleVn: "Mạnh và Yếu",
    icon: "Scale",
    color: "bg-[#f59e0b]",
    content: "We also measure the **Strength** of the correlation by looking at how closely the dots are grouped together.\n\n> **Strong Correlation:** The dots are packed tightly into a clear line. Predictions are highly accurate.\n> **Weak Correlation:** The dots follow a general direction but are spread apart like a cloud. Predictions are less certain.",
    contentVn: "Chúng ta cũng đo lường **Độ mạnh** của sự tương quan bằng cách nhìn vào mức độ chụm lại của các dấu chấm.\n\n> **Tương quan Mạnh:** Các dấu chấm xếp chặt chẽ thành một đường rõ ràng. Dự đoán rất chính xác.\n> **Tương quan Yếu:** Các dấu chấm đi theo hướng chung nhưng phân tán như một đám mây. Dự đoán ít chắc chắn hơn.",
    example: "A person's height and their shoe size have a Strong Correlation. A person's height and their hair length have No Correlation.",
    exampleVn: "Chiều cao và cỡ giày của một người có Tương quan Mạnh. Chiều cao và độ dài tóc của họ Không có Tương quan.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="200" y1="20" x2="200" y2="230" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="8 8"/>
      
      <text x="100" y="30" fill="#d97706" font-size="16" font-weight="900" text-anchor="middle" font-family="sans-serif">STRONG</text>
      <line x1="20" y1="200" x2="180" y2="200" stroke="#94a3b8" stroke-width="3"/>
      <line x1="20" y1="200" x2="20" y2="50" stroke="#94a3b8" stroke-width="3"/>
      <circle cx="40" cy="180" r="5" fill="#f59e0b"/>
      <circle cx="60" cy="155" r="5" fill="#f59e0b"/>
      <circle cx="75" cy="140" r="5" fill="#f59e0b"/>
      <circle cx="95" cy="120" r="5" fill="#f59e0b"/>
      <circle cx="110" cy="105" r="5" fill="#f59e0b"/>
      <circle cx="130" cy="85" r="5" fill="#f59e0b"/>
      <circle cx="150" cy="65" r="5" fill="#f59e0b"/>
      <circle cx="165" cy="50" r="5" fill="#f59e0b"/>

      <text x="300" y="30" fill="#d97706" font-size="16" font-weight="900" text-anchor="middle" font-family="sans-serif">WEAK</text>
      <line x1="220" y1="200" x2="380" y2="200" stroke="#94a3b8" stroke-width="3"/>
      <line x1="220" y1="200" x2="220" y2="50" stroke="#94a3b8" stroke-width="3"/>
      <circle cx="240" cy="190" r="5" fill="#fcd34d"/>
      <circle cx="270" cy="140" r="5" fill="#fcd34d"/>
      <circle cx="250" cy="120" r="5" fill="#fcd34d"/>
      <circle cx="300" cy="160" r="5" fill="#fcd34d"/>
      <circle cx="290" cy="90" r="5" fill="#fcd34d"/>
      <circle cx="320" cy="120" r="5" fill="#fcd34d"/>
      <circle cx="340" cy="70" r="5" fill="#fcd34d"/>
      <circle cx="360" cy="100" r="5" fill="#fcd34d"/>
      <circle cx="370" cy="50" r="5" fill="#fcd34d"/>
    </svg>`
  },
  {
    type: "concept",
    title: "The Correlation Coefficient",
    titleVn: "Hệ số Tương quan",
    icon: "BookOpen",
    color: "bg-[#6366f1]",
    content: "Mathematicians use a specific number to measure this relationship, called the **Correlation Coefficient (r)**.\n\n> The value of **r** is always between **-1** and **1**.\n> **1:** A perfect positive line.\n> **-1:** A perfect negative line.\n> **0:** No correlation at all (random dots).",
    contentVn: "Các nhà toán học sử dụng một con số cụ thể để đo lường mối quan hệ này, gọi là **Hệ số Tương quan (r)**.\n\n> Giá trị của **r** luôn nằm trong khoảng từ **-1** đến **1**.\n> **1:** Một đường thẳng dương hoàn hảo.\n> **-1:** Một đường thẳng âm hoàn hảo.\n> **0:** Không có sự tương quan (các dấu chấm ngẫu nhiên).",
    example: "If r = 0.95, the correlation is strong and positive. If r = -0.1, there is basically no correlation.",
    exampleVn: "Nếu r = 0.95, tương quan là mạnh và dương. Nếu r = -0.1, về cơ bản là không có sự tương quan.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" class="w-full h-full drop-shadow-md">
      <line x1="50" y1="150" x2="450" y2="150" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
      
      <circle cx="50" cy="150" r="8" fill="#f43f5e"/>
      <text x="50" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#e11d48" text-anchor="middle">-1</text>
      <rect x="25" y="40" width="50" height="50" fill="none" stroke="#e11d48" stroke-width="2" rx="4"/>
      <line x1="30" y1="45" x2="70" y2="85" stroke="#f43f5e" stroke-width="4" stroke-dasharray="2 4" stroke-linecap="round"/>

      <circle cx="250" cy="150" r="8" fill="#94a3b8"/>
      <text x="250" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#64748b" text-anchor="middle">0</text>
      <rect x="225" y="40" width="50" height="50" fill="none" stroke="#64748b" stroke-width="2" rx="4"/>
      <circle cx="235" cy="50" r="3" fill="#94a3b8"/><circle cx="260" cy="45" r="3" fill="#94a3b8"/>
      <circle cx="240" cy="70" r="3" fill="#94a3b8"/><circle cx="265" cy="65" r="3" fill="#94a3b8"/>
      <circle cx="250" cy="80" r="3" fill="#94a3b8"/><circle cx="245" cy="55" r="3" fill="#94a3b8"/>

      <circle cx="450" cy="150" r="8" fill="#10b981"/>
      <text x="450" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#059669" text-anchor="middle">1</text>
      <rect x="425" y="40" width="50" height="50" fill="none" stroke="#059669" stroke-width="2" rx="4"/>
      <line x1="430" y1="85" x2="470" y2="45" stroke="#10b981" stroke-width="4" stroke-dasharray="2 4" stroke-linecap="round"/>

      <path d="M 230 150 L 70 150" stroke="#f43f5e" stroke-width="4" fill="none" marker-end="url(#arrowNeg)"/>
      <path d="M 270 150 L 430 150" stroke="#10b981" stroke-width="4" fill="none" marker-end="url(#arrowPos)"/>
      
      <text x="150" y="140" font-family="sans-serif" font-weight="bold" font-size="12" fill="#f43f5e" text-anchor="middle">Stronger Negative</text>
      <text x="350" y="140" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">Stronger Positive</text>

      <defs>
        <marker id="arrowNeg" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
        </marker>
        <marker id="arrowPos" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
      </defs>
    </svg>`
  },
  {
    type: "concept",
    title: "Think About It: Variable Matching",
    titleVn: "Hãy suy nghĩ: Nối các Biến số",
    icon: "MessageSquare",
    color: "bg-[#ec4899]",
    content: "Take a look at the variable bank in the image. In your head or with a partner, try to link two blocks together.\n\n> **Task:** Identify the relationship between two variables.\n> Ask yourself: Is it Positive, Negative, or Zero? Is it Strong or Weak?",
    contentVn: "Hãy xem ngân hàng biến số trong hình ảnh. Cùng với bạn học, hãy thử liên kết hai khối lại với nhau.\n\n> **Nhiệm vụ:** Xác định mối quan hệ giữa hai biến số.\n> Hãy tự hỏi: Nó là Dương, Âm, hay Không có? Nó Mạnh hay Yếu?",
    example: "Linking 'Amount of Rain' and 'Umbrella Sales' would create a Strong Positive Correlation.",
    exampleVn: "Liên kết 'Lượng mưa' và 'Doanh số bán Ô' sẽ tạo ra một Tương quan Dương Mạnh.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" class="w-full h-full drop-shadow-md">
      <rect x="10" y="10" width="480" height="280" rx="16" fill="#fdf2f8" stroke="#fbcfe8" stroke-width="4"/>
      <text x="250" y="45" font-family="sans-serif" font-weight="900" font-size="18" fill="#db2777" text-anchor="middle">THE VARIABLE BANK</text>
      
      <rect x="40" y="70" width="130" height="80" rx="12" fill="#bae6fd" stroke="#7dd3fc" stroke-width="3"/>
      <text x="105" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0369a1" text-anchor="middle">Amount of Rain</text>
      
      <rect x="185" y="70" width="130" height="80" rx="12" fill="#fed7aa" stroke="#fdba74" stroke-width="3"/>
      <text x="250" y="105" font-family="sans-serif" font-weight="bold" font-size="14" fill="#c2410c" text-anchor="middle">Outdoor</text>
      <text x="250" y="125" font-family="sans-serif" font-weight="bold" font-size="14" fill="#c2410c" text-anchor="middle">Temperature</text>
      
      <rect x="330" y="70" width="130" height="80" rx="12" fill="#bbf7d0" stroke="#86efac" stroke-width="3"/>
      <text x="395" y="105" font-family="sans-serif" font-weight="bold" font-size="14" fill="#15803d" text-anchor="middle">Umbrella</text>
      <text x="395" y="125" font-family="sans-serif" font-weight="bold" font-size="14" fill="#15803d" text-anchor="middle">Sales</text>

      <rect x="40" y="170" width="130" height="80" rx="12" fill="#e9d5ff" stroke="#d8b4fe" stroke-width="3"/>
      <text x="105" y="205" font-family="sans-serif" font-weight="bold" font-size="14" fill="#7e22ce" text-anchor="middle">Ice Cream</text>
      <text x="105" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="#7e22ce" text-anchor="middle">Sales</text>

      <rect x="185" y="170" width="130" height="80" rx="12" fill="#fecaca" stroke="#fca5a5" stroke-width="3"/>
      <text x="250" y="205" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b91c1c" text-anchor="middle">Distance</text>
      <text x="250" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="#b91c1c" text-anchor="middle">Driven</text>

      <rect x="330" y="170" width="130" height="80" rx="12" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="3"/>
      <text x="395" y="205" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">Fuel Left</text>
      <text x="395" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">in Tank</text>
    </svg>`
  },
  {
    type: "concept",
    title: "Example 1: Line of Best Fit",
    titleVn: "Ví dụ 1: Đường Phù hợp nhất",
    icon: "TrendingUp",
    color: "bg-[#8b5cf6]",
    content: "A **Line of Best Fit** is a straight line drawn through the center of the data points that best represents the trend.\n\n> Draw the line so it passes through as many points as possible.\n> Try to keep an equal number of points above and below the line.",
    contentVn: "Một **Đường Phù hợp nhất** là một đường thẳng được vẽ qua trung tâm của các điểm dữ liệu đại diện tốt nhất cho xu hướng.\n\n> Vẽ đường thẳng sao cho nó đi qua càng nhiều điểm càng tốt.\n> Cố gắng giữ một số lượng điểm bằng nhau ở trên và dưới đường thẳng.",
    example: "Notice how the purple line cuts straight through the middle of the positive trend, balancing the scatter.",
    exampleVn: "Lưu ý cách đường màu tím cắt thẳng qua giữa xu hướng dương, cân bằng sự phân tán.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 50 20 L 50 200 L 350 200" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>
      <circle cx="80" cy="180" r="5" fill="#a78bfa"/><circle cx="100" cy="160" r="5" fill="#a78bfa"/>
      <circle cx="120" cy="170" r="5" fill="#a78bfa"/><circle cx="140" cy="140" r="5" fill="#a78bfa"/>
      <circle cx="160" cy="150" r="5" fill="#a78bfa"/><circle cx="180" cy="120" r="5" fill="#a78bfa"/>
      <circle cx="210" cy="110" r="5" fill="#a78bfa"/><circle cx="230" cy="125" r="5" fill="#a78bfa"/>
      <circle cx="250" cy="95" r="5" fill="#a78bfa"/><circle cx="270" cy="80" r="5" fill="#a78bfa"/>
      <circle cx="290" cy="90" r="5" fill="#a78bfa"/><circle cx="310" cy="65" r="5" fill="#a78bfa"/>
      <path d="M 60 190 L 320 60" fill="none" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    type: "concept",
    title: "Example 2: Interpolation",
    titleVn: "Ví dụ 2: Nội suy",
    icon: "Crosshair",
    color: "bg-[#0ea5e9]",
    content: "We can use the line of best fit to predict missing values. This is called **Interpolation** when it is inside our data range.\n\n> 1. Find the known value on the X-axis.\n> 2. Draw a straight line up to hit the Line of Best Fit.\n> 3. Draw a horizontal line across to read the prediction on the Y-axis.",
    contentVn: "Chúng ta có thể sử dụng đường phù hợp nhất để dự đoán các giá trị còn thiếu. Điều này được gọi là **Nội suy** khi nó nằm trong phạm vi dữ liệu của chúng ta.\n\n> 1. Tìm giá trị đã biết trên trục X.\n> 2. Vẽ một đường thẳng lên chạm vào Đường Phù hợp nhất.\n> 3. Vẽ một đường ngang sang để đọc dự đoán trên trục Y.",
    example: "If a student studied for 4 hours (X-axis), the line of best fit predicts they will score 70% (Y-axis).",
    exampleVn: "Nếu một học sinh học trong 4 giờ (Trục X), đường phù hợp nhất dự đoán họ sẽ đạt 70% (Trục Y).",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 50 20 L 50 200 L 350 200" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>
      <text x="200" y="235" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Hours Studied</text>
      <text x="20" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle" transform="rotate(-90 20 110)">Test Score</text>
      <path d="M 60 190 L 320 60" fill="none" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <path d="M 200 200 L 200 120" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="6,6"/>
      <path d="M 200 120 L 50 120" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="6,6"/>
      <circle cx="200" cy="120" r="6" fill="#ea580c"/>
      <text x="200" y="215" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ea580c" text-anchor="middle">4 Hrs</text>
      <text x="40" y="125" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ea580c" text-anchor="end">70%</text>
    </svg>`
  },
  {
    type: "concept",
    title: "Example 3: Spotting Outliers",
    titleVn: "Ví dụ 3: Phát hiện Giá trị Ngoại lai",
    icon: "AlertTriangle",
    color: "bg-[#f43f5e]",
    content: "Sometimes a data point does not fit the trend at all. This is called an **Outlier**.\n\n> Outliers can be caused by mistakes in measuring or recording data.\n> They sit far away from the line of best fit and the rest of the cluster.",
    contentVn: "Đôi khi một điểm dữ liệu hoàn toàn không phù hợp với xu hướng. Đây được gọi là **Giá trị Ngoại lai**.\n\n> Giá trị ngoại lai có thể do sai sót trong việc đo lường hoặc ghi lại dữ liệu.\n> Chúng nằm cách xa đường phù hợp nhất và phần còn lại của cụm.",
    example: "The red point is an outlier. This student studied very little but still scored perfectly on the test.",
    exampleVn: "Điểm màu đỏ là một giá trị ngoại lai. Học sinh này học rất ít nhưng vẫn đạt điểm tối đa trong bài kiểm tra.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 50 20 L 50 200 L 350 200" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>
      <path d="M 60 190 L 320 60" fill="none" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <circle cx="100" cy="160" r="5" fill="#a78bfa"/><circle cx="120" cy="170" r="5" fill="#a78bfa"/>
      <circle cx="140" cy="140" r="5" fill="#a78bfa"/><circle cx="160" cy="150" r="5" fill="#a78bfa"/>
      <circle cx="180" cy="120" r="5" fill="#a78bfa"/><circle cx="210" cy="110" r="5" fill="#a78bfa"/>
      <circle cx="230" cy="125" r="5" fill="#a78bfa"/><circle cx="250" cy="95" r="5" fill="#a78bfa"/>
      
      <circle cx="90" cy="50" r="8" fill="#e11d48"/>
      <text x="110" y="55" font-family="sans-serif" font-weight="bold" font-size="14" fill="#e11d48">Outlier</text>
    </svg>`
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can now identify and measure correlation in scatter graphs.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn có thể xác định và đo lường sự tương quan trong các biểu đồ phân tán.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];