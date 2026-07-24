// src/data/Y9/SCIENCE_1A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Electrical Circuits",
    titleVn: "Mạch điện",
    subtitle: "Objective: Understand current, voltage, resistance, and the universal symbols used to design series and parallel circuits.",
    subtitleVn: "Mục tiêu: Hiểu về dòng điện, điện áp, điện trở và các ký hiệu phổ quát được sử dụng để thiết kế mạch nối tiếp và song song.",
    color: "bg-[#0ea5e9]", 
    borderColor: "border-[#0284c7]",
  },
  {
    type: "concept",
    title: "Current & Voltage",
    titleVn: "Dòng điện & Điện áp",
    icon: "Target",
    color: "bg-[#f59e0b]",
    content: "Electricity is the flow of tiny charged particles called electrons around a closed loop. To understand circuits, we must define two fundamental concepts:\n\n> **Current (I):** The rate at which electrons flow around the circuit. It is measured in **Amperes (A)**.\n> **Voltage (V):** Also called Potential Difference. This is the 'push' or energy given to the electrons by the power source. It is measured in **Volts (V)**.",
    contentVn: "Điện là dòng chảy của các hạt mang điện tích nhỏ gọi là electron quanh một vòng khép kín. Để hiểu về mạch điện, chúng ta phải xác định hai khái niệm cơ bản:\n\n> **Dòng điện (I):** Tốc độ mà các electron chạy quanh mạch. Nó được đo bằng **Ampe (A)**.\n> **Điện áp (V):** Còn được gọi là Hiệu điện thế. Đây là 'lực đẩy' hoặc năng lượng được cung cấp cho các electron bởi nguồn điện. Nó được đo bằng **Vôn (V)**.",
    example: "Think of a water pipe: Current is the amount of water flowing, and Voltage is the water pressure pushing it through.",
    exampleVn: "Hãy nghĩ về một ống nước: Dòng điện là lượng nước chảy, và Điện áp là áp lực nước đẩy nó đi.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 100 80 L 300 80 L 300 180 L 100 180 Z" fill="none" stroke="#cbd5e1" stroke-width="4" stroke-linejoin="round"/>
      <rect x="180" y="60" width="40" height="40" fill="white"/>
      <line x1="190" y1="65" x2="190" y2="95" stroke="#1e293b" stroke-width="2"/>
      <line x1="210" y1="55" x2="210" y2="105" stroke="#1e293b" stroke-width="6"/>
      <text x="200" y="45" font-family="sans-serif" font-weight="bold" font-size="14" fill="#f59e0b" text-anchor="middle">Voltage (Push)</text>
      <rect x="180" y="160" width="40" height="40" fill="white"/>
      <circle cx="200" cy="180" r="16" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
      <path d="M 189 169 L 211 191 M 211 169 L 189 191" stroke="#1e293b" stroke-width="2"/>
      <path d="M 250 80 L 270 80" stroke="#ef4444" stroke-width="4" marker-end="url(#arrow)"/>
      <path d="M 300 110 L 300 130" stroke="#ef4444" stroke-width="4" marker-end="url(#arrow)"/>
      <path d="M 150 180 L 130 180" stroke="#ef4444" stroke-width="4" marker-end="url(#arrow)"/>
      <path d="M 100 150 L 100 130" stroke="#ef4444" stroke-width="4" marker-end="url(#arrow)"/>
      <text x="200" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="middle">Current (Electron Flow)</text>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
      </defs>
    </svg>`,
  },
  {
    type: "concept",
    title: "Circuit Symbols",
    titleVn: "Ký hiệu Mạch điện",
    icon: "BookOpen",
    color: "bg-[#8b5cf6]",
    content: "Scientists and engineers use universal symbols to draw circuit diagrams. You must memorize these exact shapes.\n\n> **Cell vs. Battery:** A single cell has one long line and one short line. A battery is made of two or more cells connected together.\n> **Lamp / Bulb:** A circle with a cross inside.\n> **Bell / Buzzer:** Looks like a mushroom or an upside-down cup.",
    contentVn: "Các nhà khoa học và kỹ sư sử dụng các ký hiệu phổ quát để vẽ sơ đồ mạch điện. Bạn phải ghi nhớ chính xác những hình dạng này.\n\n> **Pin (Cell) vs. Bộ pin (Battery):** Một pin đơn có một đường dài và một đường ngắn. Bộ pin bao gồm hai hoặc nhiều pin kết nối với nhau.\n> **Bóng đèn:** Một vòng tròn có dấu chéo bên trong.\n> **Chuông:** Trông giống như một cây nấm hoặc một cái cốc lộn ngược.",
    example: "When drawing a circuit, always use a ruler for the wires (straight lines) and never leave gaps between the components.",
    exampleVn: "Khi vẽ mạch điện, luôn sử dụng thước kẻ cho các dây dẫn (đường thẳng) và không bao giờ để khoảng trống giữa các linh kiện.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="200" y1="20" x2="200" y2="230" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4"/>
      <line x1="20" y1="125" x2="380" y2="125" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4"/>
      <text x="100" y="45" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Cell</text>
      <line x1="60" y1="80" x2="140" y2="80" stroke="#1e293b" stroke-width="2"/>
      <rect x="90" y="60" width="20" height="40" fill="white"/>
      <line x1="95" y1="65" x2="95" y2="95" stroke="#1e293b" stroke-width="2"/>
      <line x1="105" y1="55" x2="105" y2="105" stroke="#1e293b" stroke-width="4"/>
      <text x="300" y="45" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Battery</text>
      <line x1="250" y1="80" x2="350" y2="80" stroke="#1e293b" stroke-width="2"/>
      <rect x="270" y="60" width="60" height="40" fill="white"/>
      <line x1="280" y1="65" x2="280" y2="95" stroke="#1e293b" stroke-width="2"/>
      <line x1="290" y1="55" x2="290" y2="105" stroke="#1e293b" stroke-width="4"/>
      <line x1="300" y1="80" x2="310" y2="80" stroke="#1e293b" stroke-width="2" stroke-dasharray="4"/>
      <line x1="320" y1="65" x2="320" y2="95" stroke="#1e293b" stroke-width="2"/>
      <line x1="330" y1="55" x2="330" y2="105" stroke="#1e293b" stroke-width="4"/>
      <text x="100" y="155" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Lamp</text>
      <line x1="60" y1="190" x2="140" y2="190" stroke="#1e293b" stroke-width="2"/>
      <circle cx="100" cy="190" r="16" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 89 179 L 111 201 M 111 179 L 89 201" stroke="#1e293b" stroke-width="2"/>
      <text x="300" y="155" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Bell</text>
      <line x1="260" y1="180" x2="340" y2="180" stroke="#1e293b" stroke-width="2"/>
      <rect x="280" y="160" width="40" height="40" fill="white"/>
      <path d="M 285 180 Q 300 210 315 180" fill="none" stroke="#1e293b" stroke-width="2"/>
      <line x1="285" y1="180" x2="315" y2="180" stroke="#1e293b" stroke-width="2"/>
    </svg>`,
  },
  {
    type: "concept",
    title: "Measuring Electricity",
    titleVn: "Đo lường Điện",
    icon: "ShieldCheck",
    color: "bg-[#10b981]",
    content: "To measure current and voltage, we use specific meters that have their own circuit symbols and strict rules for how they are connected.\n\n> **Ammeter (A):** Measures current. It must ALWAYS be connected in **Series** (in the main path of the circuit).\n> **Voltmeter (V):** Measures voltage. It must ALWAYS be connected in **Parallel** (branching *across* the component you are measuring).",
    contentVn: "Để đo dòng điện và điện áp, chúng ta sử dụng các máy đo cụ thể có ký hiệu mạch riêng và các quy tắc nghiêm ngặt về cách chúng được kết nối.\n\n> **Ampe kế (A):** Đo dòng điện. Nó LUÔN LUÔN phải được mắc **Nối tiếp** (trên đường dẫn chính của mạch).\n> **Vôn kế (V):** Đo điện áp. Nó LUÔN LUÔN phải được mắc **Song song** (rẽ nhánh *ngang qua* linh kiện bạn đang đo).",
    example: "If Mia wants to measure the voltage across a lamp, she must draw an extra loop with a 'V' circle bridging over the lamp.",
    exampleVn: "Nếu Mia muốn đo điện áp ngang qua một bóng đèn, cô ấy phải vẽ một vòng lặp phụ có vòng tròn chữ 'V' bắc cầu qua bóng đèn.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 80 180 L 80 80 L 320 80 L 320 180 L 80 180 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
      <rect x="180" y="70" width="40" height="20" fill="white"/>
      <line x1="190" y1="65" x2="190" y2="95" stroke="#1e293b" stroke-width="2"/>
      <line x1="210" y1="55" x2="210" y2="105" stroke="#1e293b" stroke-width="4"/>
      <rect x="65" y="110" width="30" height="40" fill="white"/>
      <circle cx="80" cy="120" r="3" fill="none" stroke="#1e293b" stroke-width="2"/>
      <circle cx="80" cy="140" r="3" fill="none" stroke="#1e293b" stroke-width="2"/>
      <line x1="80" y1="120" x2="65" y2="135" stroke="#1e293b" stroke-width="2"/>
      <rect x="180" y="170" width="40" height="20" fill="white"/>
      <circle cx="200" cy="180" r="14" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 190 170 L 210 190 M 210 170 L 190 190" stroke="#1e293b" stroke-width="2"/>
      <rect x="310" y="115" width="20" height="30" fill="white"/>
      <circle cx="320" cy="130" r="14" fill="white" stroke="#10b981" stroke-width="2"/>
      <text x="320" y="135" font-family="sans-serif" font-weight="bold" font-size="14" fill="#10b981" text-anchor="middle">A</text>
      <text x="365" y="135" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">Series</text>
      <path d="M 338 130 L 345 130" stroke="#10b981" stroke-width="2"/>
      <path d="M 160 180 L 160 220 L 240 220 L 240 180" fill="none" stroke="#3b82f6" stroke-width="2"/>
      <rect x="185" y="210" width="30" height="20" fill="white"/>
      <circle cx="200" cy="220" r="14" fill="white" stroke="#3b82f6" stroke-width="2"/>
      <text x="200" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="#3b82f6" text-anchor="middle">V</text>
      <text x="200" y="245" font-family="sans-serif" font-weight="bold" font-size="12" fill="#3b82f6" text-anchor="middle">Parallel</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Resistance & Variable Resistors",
    titleVn: "Điện trở & Biến trở",
    icon: "Scale",
    color: "bg-[#ec4899]",
    content: "**Resistance** is the opposition to the flow of current, measured in Ohms (Ω). Higher resistance means lower current flows through the circuit.\n\n> **Fixed Resistor:** A rectangle symbol. It provides a constant amount of resistance.\n> **Variable Resistor:** A rectangle with an arrow striking through it. You can adjust it to change the resistance (e.g., to act as a dimmer switch for a lamp).",
    contentVn: "**Điện trở** là sự cản trở dòng điện, được đo bằng Ohm (Ω). Điện trở cao hơn có nghĩa là dòng điện chạy qua mạch thấp hơn.\n\n> **Điện trở cố định (Fixed Resistor):** Ký hiệu hình chữ nhật. Nó cung cấp một lượng điện trở không đổi.\n> **Biến trở (Variable Resistor):** Hình chữ nhật có mũi tên xuyên qua. Bạn có thể điều chỉnh nó để thay đổi điện trở (ví dụ: hoạt động như một công tắc điều chỉnh độ sáng cho đèn).",
    example: "If you slide the control on a variable resistor to INCREASE the resistance, the lamp in the circuit will get DIMMER.",
    exampleVn: "Nếu bạn trượt thanh điều khiển trên biến trở để TĂNG điện trở, bóng đèn trong mạch sẽ MỜ ĐI.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="200" y1="20" x2="200" y2="230" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4"/>
      <text x="100" y="100" font-family="sans-serif" font-weight="bold" font-size="16" fill="#64748b" text-anchor="middle">Fixed Resistor</text>
      <line x1="40" y1="140" x2="160" y2="140" stroke="#1e293b" stroke-width="2"/>
      <rect x="75" y="130" width="50" height="20" fill="white" stroke="#1e293b" stroke-width="2"/>
      <text x="100" y="175" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ec4899" text-anchor="middle">Constant Ω</text>
      <text x="300" y="100" font-family="sans-serif" font-weight="bold" font-size="16" fill="#64748b" text-anchor="middle">Variable Resistor</text>
      <line x1="240" y1="140" x2="360" y2="140" stroke="#1e293b" stroke-width="2"/>
      <rect x="275" y="130" width="50" height="20" fill="white" stroke="#1e293b" stroke-width="2"/>
      <line x1="265" y1="165" x2="330" y2="115" stroke="#1e293b" stroke-width="2"/>
      <polygon points="330,115 322,115 328,122" fill="#1e293b"/>
      <text x="300" y="175" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ec4899" text-anchor="middle">Adjustable Ω</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Ohm's Law",
    titleVn: "Định luật Ohm",
    icon: "MessageSquare",
    color: "bg-[#8b5cf6]",
    content: "Voltage, Current, and Resistance are perfectly connected by a mathematical rule called **Ohm's Law**. \n\n> **V = I × R** (Voltage = Current × Resistance)\n\nTo easily remember and rearrange this formula, scientists use the Formula Triangle. Cover up the letter you want to find, and the remaining letters tell you what math to do!",
    contentVn: "Điện áp, Dòng điện và Điện trở được kết nối hoàn hảo bởi một quy tắc toán học gọi là **Định luật Ohm**.\n\n> **V = I × R** (Điện áp = Dòng điện × Điện trở)\n\nĐể dễ dàng ghi nhớ và sắp xếp lại công thức này, các nhà khoa học sử dụng Tam giác Công thức. Hãy che đi chữ cái bạn muốn tìm, và các chữ cái còn lại sẽ cho bạn biết phải làm phép toán nào!",
    example: "If I want to find Resistance (R), I cover the 'R' on the triangle. I am left with 'V' over 'I'. So, R = V ÷ I.",
    exampleVn: "Nếu tôi muốn tìm Điện trở (R), tôi che chữ 'R' trên tam giác. Tôi còn lại 'V' trên 'I'. Vì vậy, R = V ÷ I.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <polygon points="200,30 80,210 320,210" fill="#f8fafc" stroke="#1e293b" stroke-width="4" stroke-linejoin="round"/>
      <line x1="120" y1="150" x2="280" y2="150" stroke="#1e293b" stroke-width="4"/>
      <line x1="200" y1="150" x2="200" y2="210" stroke="#1e293b" stroke-width="4"/>
      <text x="200" y="115" font-family="sans-serif" font-weight="900" font-size="48" fill="#3b82f6" text-anchor="middle">V</text>
      <text x="160" y="195" font-family="sans-serif" font-weight="900" font-size="42" fill="#ef4444" text-anchor="middle">I</text>
      <text x="240" y="195" font-family="sans-serif" font-weight="900" font-size="42" fill="#ec4899" text-anchor="middle">R</text>
      <text x="200" y="190" font-family="sans-serif" font-weight="bold" font-size="24" fill="#64748b" text-anchor="middle">×</text>
      <text x="200" y="145" font-family="sans-serif" font-weight="bold" font-size="20" fill="#64748b" text-anchor="middle">÷</text>
      <text x="330" y="90" font-family="sans-serif" font-weight="bold" font-size="14" fill="#3b82f6">Voltage (Volts)</text>
      <text x="20" y="195" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444">Current (Amps)</text>
      <text x="330" y="195" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ec4899">Resistance (Ω)</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Series Circuits",
    titleVn: "Mạch Nối tiếp",
    icon: "Target",
    color: "bg-[#f43f5e]",
    content: "A **Series Circuit** has only ONE path for the current to flow. All components are connected in a single loop.\n\n> Because there are no branches, the electrons have nowhere else to go.\n> If one component breaks (like a blown bulb or an open switch), the entire circuit is broken and everything stops working.",
    contentVn: "Một **Mạch Nối tiếp** chỉ có MỘT đường duy nhất cho dòng điện chạy qua. Tất cả các linh kiện được kết nối trong một vòng lặp duy nhất.\n\n> Bởi vì không có nhánh rẽ, các electron không có nơi nào khác để đi.\n> Nếu một linh kiện bị hỏng (như bóng đèn bị cháy hoặc công tắc mở), toàn bộ mạch điện bị hỏng và mọi thứ ngừng hoạt động.",
    example: "Cheap holiday fairy lights are often in series. If one bulb breaks, the whole string goes dark!",
    exampleVn: "Đèn nháy trang trí rẻ tiền thường được mắc nối tiếp. Nếu một bóng bị hỏng, toàn bộ dây đèn sẽ tắt tối thui!",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 100 60 L 300 60 L 300 190 L 100 190 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
      <rect x="170" y="50" width="60" height="20" fill="white"/>
      <line x1="180" y1="45" x2="180" y2="75" stroke="#1e293b" stroke-width="2"/>
      <line x1="190" y1="55" x2="190" y2="65" stroke="#1e293b" stroke-width="4"/>
      <line x1="200" y1="60" x2="210" y2="60" stroke="#1e293b" stroke-width="2" stroke-dasharray="2"/>
      <line x1="220" y1="45" x2="220" y2="75" stroke="#1e293b" stroke-width="2"/>
      <line x1="230" y1="55" x2="230" y2="65" stroke="#1e293b" stroke-width="4"/>
      <rect x="130" y="180" width="30" height="20" fill="white"/>
      <circle cx="145" cy="190" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
      <path d="M 135 180 L 155 200 M 155 180 L 135 200" stroke="#1e293b" stroke-width="2"/>
      <rect x="240" y="180" width="30" height="20" fill="white"/>
      <circle cx="255" cy="190" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
      <path d="M 245 180 L 265 200 M 265 180 L 245 200" stroke="#1e293b" stroke-width="2"/>
      <text x="200" y="135" font-family="sans-serif" font-weight="900" font-size="20" fill="#f43f5e" text-anchor="middle">Single Loop</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Parallel Circuits",
    titleVn: "Mạch Song song",
    icon: "Target",
    color: "bg-[#3b82f6]",
    content: "A **Parallel Circuit** has multiple branching paths for the current to flow. \n\n> Because the track splits, electrons can choose different paths to return to the battery.\n> If one branch breaks, the other branches keep working perfectly because they still have a direct loop to the battery.",
    contentVn: "Một **Mạch Song song** có nhiều đường rẽ nhánh cho dòng điện chạy qua.\n\n> Bởi vì đường ray chia tách, các electron có thể chọn các đường khác nhau để trở về pin.\n> Nếu một nhánh bị hỏng, các nhánh khác vẫn tiếp tục hoạt động hoàn hảo vì chúng vẫn có một vòng lặp trực tiếp về pin.",
    example: "The lights in your house are wired in parallel. If you turn off the kitchen light, the living room lights stay on!",
    exampleVn: "Hệ thống đèn trong nhà bạn được mắc song song. Nếu bạn tắt đèn nhà bếp, đèn phòng khách vẫn sáng!",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 100 60 L 300 60 L 300 190 L 100 190 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
      <line x1="100" y1="125" x2="300" y2="125" stroke="#1e293b" stroke-width="2"/>
      <rect x="170" y="50" width="60" height="20" fill="white"/>
      <line x1="180" y1="45" x2="180" y2="75" stroke="#1e293b" stroke-width="2"/>
      <line x1="190" y1="55" x2="190" y2="65" stroke="#1e293b" stroke-width="4"/>
      <line x1="200" y1="60" x2="210" y2="60" stroke="#1e293b" stroke-width="2" stroke-dasharray="2"/>
      <line x1="220" y1="45" x2="220" y2="75" stroke="#1e293b" stroke-width="2"/>
      <line x1="230" y1="55" x2="230" y2="65" stroke="#1e293b" stroke-width="4"/>
      <rect x="180" y="115" width="40" height="20" fill="white"/>
      <circle cx="200" cy="125" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
      <path d="M 190 115 L 210 135 M 210 115 L 190 135" stroke="#1e293b" stroke-width="2"/>
      <text x="235" y="130" font-family="sans-serif" font-weight="bold" font-size="12" fill="#3b82f6">Branch 1</text>
      <rect x="180" y="180" width="40" height="20" fill="white"/>
      <circle cx="200" cy="190" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
      <path d="M 190 180 L 210 200 M 210 180 L 190 200" stroke="#1e293b" stroke-width="2"/>
      <text x="235" y="195" font-family="sans-serif" font-weight="bold" font-size="12" fill="#3b82f6">Branch 2</text>
      <circle cx="100" cy="125" r="4" fill="#1e293b"/>
      <circle cx="300" cy="125" r="4" fill="#1e293b"/>
    </svg>`,
  },
  {
    type: "concept",
    title: "Rule #1: Current (A)",
    titleVn: "Quy tắc #1: Dòng điện (A)",
    icon: "Scale",
    color: "bg-[#10b981]",
    content: "The behavior of Current (measured by an Ammeter) changes depending on the circuit type.\n\n> **Series Circuit:** Current is EXACTLY THE SAME everywhere. It doesn't get 'used up'.\n> **Parallel Circuit:** Current SPLITS at the branches. The total current leaving the battery equals the current in Branch 1 + Branch 2.",
    contentVn: "Hành vi của Dòng điện (được đo bằng Ampe kế) thay đổi tùy thuộc vào loại mạch.\n\n> **Mạch Nối tiếp:** Dòng điện HOÀN TOÀN GIỐNG NHAU ở mọi nơi. Nó không bị 'sử dụng hết'.\n> **Mạch Song song:** Dòng điện BỊ CHIA NHỎ tại các nhánh. Tổng dòng điện rời khỏi pin bằng dòng điện ở Nhánh 1 + Nhánh 2.",
    example: "Look at the Parallel diagram. If 4 Amps leave the battery, it splits at the junction into 2 Amps for the top lamp and 2 Amps for the bottom lamp.",
    exampleVn: "Hãy nhìn vào biểu đồ Song song. Nếu 4 Ampe rời khỏi pin, nó sẽ chia tách tại ngã ba thành 2 Ampe cho bóng đèn trên và 2 Ampe cho bóng đèn dưới.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="200" y1="20" x2="200" y2="230" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4"/>
      <text x="100" y="35" font-family="sans-serif" font-weight="bold" font-size="16" fill="#f43f5e" text-anchor="middle">Series (Same Everywhere)</text>
      <path d="M 40 60 L 160 60 L 160 190 L 40 190 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
      <rect x="80" y="50" width="40" height="20" fill="white"/> <line x1="90" y1="45" x2="90" y2="75" stroke="#1e293b" stroke-width="2"/><line x1="110" y1="55" x2="110" y2="65" stroke="#1e293b" stroke-width="4"/>
      <rect x="30" y="115" width="20" height="20" fill="white"/>
      <circle cx="40" cy="125" r="12" fill="white" stroke="#10b981" stroke-width="2"/>
      <text x="40" y="129" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">2A</text>
      <rect x="85" y="180" width="30" height="20" fill="white"/>
      <circle cx="100" cy="190" r="12" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 92 182 L 108 198 M 108 182 L 92 198" stroke="#1e293b" stroke-width="2"/>
      <rect x="150" y="115" width="20" height="20" fill="white"/>
      <circle cx="160" cy="125" r="12" fill="white" stroke="#10b981" stroke-width="2"/>
      <text x="160" y="129" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">2A</text>
      <text x="300" y="35" font-family="sans-serif" font-weight="bold" font-size="16" fill="#3b82f6" text-anchor="middle">Parallel (Splits)</text>
      <path d="M 240 60 L 360 60 L 360 190 L 240 190 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
      <line x1="240" y1="125" x2="360" y2="125" stroke="#1e293b" stroke-width="2"/>
      <rect x="280" y="50" width="40" height="20" fill="white"/> <line x1="290" y1="45" x2="290" y2="75" stroke="#1e293b" stroke-width="2"/><line x1="310" y1="55" x2="310" y2="65" stroke="#1e293b" stroke-width="4"/>
      <rect x="230" y="80" width="20" height="20" fill="white"/>
      <circle cx="240" cy="90" r="12" fill="white" stroke="#10b981" stroke-width="2"/>
      <text x="240" y="94" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">4A</text>
      <rect x="270" y="115" width="20" height="20" fill="white"/>
      <circle cx="280" cy="125" r="12" fill="white" stroke="#10b981" stroke-width="2"/>
      <text x="280" y="129" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">2A</text>
      <circle cx="320" cy="125" r="12" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 312 117 L 328 133 M 328 117 L 312 133" stroke="#1e293b" stroke-width="2"/>
      <rect x="270" y="180" width="20" height="20" fill="white"/>
      <circle cx="280" cy="190" r="12" fill="white" stroke="#10b981" stroke-width="2"/>
      <text x="280" y="194" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">2A</text>
      <circle cx="320" cy="190" r="12" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 312 182 L 328 198 M 328 182 L 312 198" stroke="#1e293b" stroke-width="2"/>
    </svg>`,
  },
  {
    type: "concept",
    title: "Rule #2: Voltage (V)",
    titleVn: "Quy tắc #2: Điện áp (V)",
    icon: "Target",
    color: "bg-[#ec4899]",
    content: "The behavior of Voltage (measured by a Voltmeter) is the exact opposite of Current!\n\n> **Series Circuit:** Voltage is SHARED between components. (12V Battery = 6V on Lamp 1 + 6V on Lamp 2).\n> **Parallel Circuit:** Voltage is the SAME across all branches. Each branch gets the full power of the battery (12V).",
    contentVn: "Hành vi của Điện áp (được đo bằng Vôn kế) hoàn toàn trái ngược với Dòng điện!\n\n> **Mạch Nối tiếp:** Điện áp ĐƯỢC CHIA SẺ giữa các linh kiện. (Pin 12V = 6V ở Bóng đèn 1 + 6V ở Bóng đèn 2).\n> **Mạch Song song:** Điện áp GIỐNG NHAU trên tất cả các nhánh. Mỗi nhánh nhận được toàn bộ sức mạnh của pin (12V).",
    example: "Because Parallel circuits give the full voltage to every branch, adding more lamps in parallel won't make them dimmer. In Series, adding more lamps makes them all share the voltage, so they get very dim!",
    exampleVn: "Vì mạch Song song cung cấp toàn bộ điện áp cho mọi nhánh, việc thêm nhiều đèn song song sẽ không làm chúng mờ đi. Ở mạch Nối tiếp, việc thêm nhiều đèn làm cho chúng chia sẻ điện áp, vì vậy chúng trở nên rất mờ!",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="200" y1="20" x2="200" y2="230" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4"/>
      <text x="100" y="35" font-family="sans-serif" font-weight="bold" font-size="16" fill="#f43f5e" text-anchor="middle">Series (Shared V)</text>
      <path d="M 40 70 L 160 70 L 160 160 L 40 160 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
      <rect x="80" y="60" width="40" height="20" fill="white"/> <line x1="90" y1="55" x2="90" y2="85" stroke="#1e293b" stroke-width="2"/><line x1="110" y1="65" x2="110" y2="75" stroke="#1e293b" stroke-width="4"/>
      <text x="100" y="50" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ec4899" text-anchor="middle">12V Battery</text>
      <rect x="65" y="150" width="20" height="20" fill="white"/>
      <circle cx="75" cy="160" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 68 153 L 82 167 M 82 153 L 68 167" stroke="#1e293b" stroke-width="2"/>
      <path d="M 50 160 L 50 200 L 100 200 L 100 160" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="2"/>
      <circle cx="75" cy="200" r="12" fill="white" stroke="#ec4899" stroke-width="2"/>
      <text x="75" y="204" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ec4899" text-anchor="middle">6V</text>
      <rect x="115" y="150" width="20" height="20" fill="white"/>
      <circle cx="125" cy="160" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 118 153 L 132 167 M 132 153 L 118 167" stroke="#1e293b" stroke-width="2"/>
      <path d="M 100 160 L 100 200 L 150 200 L 150 160" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="2"/>
      <circle cx="125" cy="200" r="12" fill="white" stroke="#ec4899" stroke-width="2"/>
      <text x="125" y="204" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ec4899" text-anchor="middle">6V</text>
      <text x="300" y="35" font-family="sans-serif" font-weight="bold" font-size="16" fill="#3b82f6" text-anchor="middle">Parallel (Full V)</text>
      <path d="M 240 70 L 360 70 L 360 160 L 240 160 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
      <line x1="240" y1="115" x2="360" y2="115" stroke="#1e293b" stroke-width="2"/>
      <rect x="280" y="60" width="40" height="20" fill="white"/> <line x1="290" y1="55" x2="290" y2="85" stroke="#1e293b" stroke-width="2"/><line x1="310" y1="65" x2="310" y2="75" stroke="#1e293b" stroke-width="4"/>
      <text x="300" y="50" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ec4899" text-anchor="middle">12V Battery</text>
      <rect x="290" y="105" width="20" height="20" fill="white"/>
      <circle cx="300" cy="115" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 293 108 L 307 122 M 307 108 L 293 122" stroke="#1e293b" stroke-width="2"/>
      <circle cx="340" cy="115" r="12" fill="white" stroke="#ec4899" stroke-width="2"/>
      <text x="340" y="119" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ec4899" text-anchor="middle">12V</text>
      <path d="M 310 115 L 328 115" stroke="#ec4899" stroke-width="2" stroke-dasharray="2"/>
      <rect x="290" y="150" width="20" height="20" fill="white"/>
      <circle cx="300" cy="160" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
      <path d="M 293 153 L 307 167 M 307 153 L 293 167" stroke="#1e293b" stroke-width="2"/>
      <circle cx="340" cy="160" r="12" fill="white" stroke="#ec4899" stroke-width="2"/>
      <text x="340" y="164" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ec4899" text-anchor="middle">12V</text>
      <path d="M 310 160 L 328 160" stroke="#ec4899" stroke-width="2" stroke-dasharray="2"/>
    </svg>`,
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can now identify standard electrical components and understand the rules of series and parallel circuits.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn có thể nhận diện các linh kiện điện tiêu chuẩn và hiểu các quy tắc của mạch nối tiếp và song song.",
    color: "bg-[#10b981]",
    borderColor: "border-[#059669]",
  }
];