// src/data/Y9/SCIENCE_1A/assessment.js

export const assessment = {
  timeLimit: 2400, // Increased to 40 minutes for the expanded test
  passages: [], 
  questions: [
    {
      id: "q1_mcq_symbols_battery",
      type: "mcq",
      title: "1. Look at the symbols used in electrical circuits. Which symbol shows a battery?",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" class="w-full h-full drop-shadow-md">
        <line x1="40" y1="80" x2="60" y2="80" stroke="#1e293b" stroke-width="2"/>
        <circle cx="80" cy="80" r="20" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 66 66 L 94 94 M 94 66 L 66 94" stroke="#1e293b" stroke-width="2"/>
        <line x1="100" y1="80" x2="120" y2="80" stroke="#1e293b" stroke-width="2"/>
        <text x="80" y="140" font-family="sans-serif" font-weight="900" font-size="18" fill="#3b82f6" text-anchor="middle">A</text>
  
        <line x1="140" y1="80" x2="160" y2="80" stroke="#1e293b" stroke-width="2"/>
        <line x1="160" y1="60" x2="160" y2="100" stroke="#1e293b" stroke-width="2"/>
        <line x1="175" y1="70" x2="175" y2="90" stroke="#1e293b" stroke-width="6"/>
        <line x1="185" y1="80" x2="195" y2="80" stroke="#1e293b" stroke-width="2" stroke-dasharray="4"/>
        <line x1="205" y1="60" x2="205" y2="100" stroke="#1e293b" stroke-width="2"/>
        <line x1="220" y1="70" x2="220" y2="90" stroke="#1e293b" stroke-width="6"/>
        <line x1="220" y1="80" x2="240" y2="80" stroke="#1e293b" stroke-width="2"/>
        <text x="190" y="140" font-family="sans-serif" font-weight="900" font-size="18" fill="#3b82f6" text-anchor="middle">B</text>
  
        <line x1="260" y1="80" x2="280" y2="80" stroke="#1e293b" stroke-width="2"/>
        <circle cx="300" cy="80" r="20" fill="white" stroke="#1e293b" stroke-width="2"/>
        <text x="300" y="86" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1e293b" text-anchor="middle">V</text>
        <line x1="320" y1="80" x2="340" y2="80" stroke="#1e293b" stroke-width="2"/>
        <text x="300" y="140" font-family="sans-serif" font-weight="900" font-size="18" fill="#3b82f6" text-anchor="middle">C</text>
  
        <line x1="360" y1="80" x2="375" y2="80" stroke="#1e293b" stroke-width="2"/>
        <circle cx="380" cy="80" r="4" fill="white" stroke="#1e293b" stroke-width="2"/>
        <circle cx="410" cy="80" r="4" fill="white" stroke="#1e293b" stroke-width="2"/>
        <line x1="380" y1="76" x2="405" y2="55" stroke="#1e293b" stroke-width="2"/>
        <line x1="415" y1="80" x2="430" y2="80" stroke="#1e293b" stroke-width="2"/>
        <text x="395" y="140" font-family="sans-serif" font-weight="900" font-size="18" fill="#3b82f6" text-anchor="middle">D</text>
      </svg>`,
      options: [
        { val: "A", text: "A" },
        { val: "B", text: "B" },
        { val: "C", text: "C" },
        { val: "D", text: "D" }
      ],
      correct: "B",
      expEn: "Symbol B shows a battery, which is made of two or more cells connected together. A is a lamp, C is a voltmeter, and D is an open switch.",
      expVn: "Ký hiệu B chỉ một bộ pin, bao gồm hai hoặc nhiều pin được kết nối với nhau. A là bóng đèn, C là vôn kế, và D là công tắc mở."
    },
    {
      id: "q2_inline_fixed_resistor",
      type: "inline",
      title: "2. Analyze the specific electrical component shown below and complete the definitions.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" class="w-full h-full drop-shadow-md">
        <rect x="50" y="20" width="300" height="110" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="100" y1="75" x2="150" y2="75" stroke="#1e293b" stroke-width="4"/>
        <rect x="150" y="50" width="100" height="50" fill="white" stroke="#1e293b" stroke-width="4"/>
        <line x1="250" y1="75" x2="300" y2="75" stroke="#1e293b" stroke-width="4"/>
      </svg>`,
      options: [],
      textParts: [
        "The symbol above represents a ",
        ". Its primary function is to restrict or oppose the flow of current in a circuit. This opposition is measured in ",
        "."
      ],
      blanks: {
        "1": {
          correct: "fixed resistor",
          options: [
            { val: "variable resistor", text: "variable resistor" },
            { val: "fixed resistor", text: "fixed resistor" },
            { val: "cell", text: "cell" }
          ]
        },
        "2": {
          correct: "Ohms",
          options: [
            { val: "Volts", text: "Volts" },
            { val: "Amps", text: "Amps" },
            { val: "Ohms", text: "Ohms" }
          ]
        }
      },
      expEn: "A plain rectangle is a fixed resistor. It provides a constant resistance to the flow of electrons, which is mathematically measured in Ohms (Ω).",
      expVn: "Một hình chữ nhật trơn là một điện trở cố định. Nó cung cấp một điện trở không đổi đối với dòng điện tử, được đo bằng toán học là Ohms (Ω)."
    },
    {
      id: "q3_mcq_ammeter",
      type: "mcq",
      title: "3. A student needs to measure the current flowing through a circuit. Which diagram correctly shows how an ammeter must be connected?",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full drop-shadow-md">
        <line x1="200" y1="10" x2="200" y2="290" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4"/>
        <line x1="10" y1="150" x2="390" y2="150" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4"/>
  
        <text x="20" y="30" font-family="sans-serif" font-weight="900" font-size="16" fill="#f43f5e">A</text>
        <path d="M 60 40 L 140 40 L 140 100 L 60 100 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        <rect x="90" y="30" width="20" height="20" fill="white"/> <line x1="95" y1="25" x2="95" y2="55" stroke="#1e293b" stroke-width="2"/><line x1="105" y1="35" x2="105" y2="45" stroke="#1e293b" stroke-width="4"/>
        <rect x="90" y="90" width="20" height="20" fill="white"/> <circle cx="100" cy="100" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 93 93 L 107 107 M 107 93 L 93 107" stroke="#1e293b" stroke-width="2"/>
        <path d="M 80 100 L 80 130 L 120 130 L 120 100" fill="none" stroke="#10b981" stroke-width="2"/>
        <rect x="90" y="120" width="20" height="20" fill="white"/> <circle cx="100" cy="130" r="10" fill="white" stroke="#10b981" stroke-width="2"/>
        <text x="100" y="134" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">A</text>
  
        <text x="220" y="30" font-family="sans-serif" font-weight="900" font-size="16" fill="#10b981">B</text>
        <path d="M 260 40 L 340 40 L 340 120 L 260 120 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        <rect x="290" y="30" width="20" height="20" fill="white"/> <line x1="295" y1="25" x2="295" y2="55" stroke="#1e293b" stroke-width="2"/><line x1="305" y1="35" x2="305" y2="45" stroke="#1e293b" stroke-width="4"/>
        <rect x="290" y="110" width="20" height="20" fill="white"/> <circle cx="300" cy="120" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 293 113 L 307 127 M 307 113 L 293 127" stroke="#1e293b" stroke-width="2"/>
        <rect x="250" y="70" width="20" height="20" fill="white"/> <circle cx="260" cy="80" r="10" fill="white" stroke="#10b981" stroke-width="2"/>
        <text x="260" y="84" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">A</text>
  
        <text x="20" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#f43f5e">C</text>
        <path d="M 60 190 L 140 190 L 140 270 L 60 270 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        <rect x="90" y="180" width="20" height="20" fill="white"/> <line x1="95" y1="175" x2="95" y2="205" stroke="#1e293b" stroke-width="2"/><line x1="105" y1="185" x2="105" y2="195" stroke="#1e293b" stroke-width="4"/>
        <rect x="90" y="260" width="20" height="20" fill="white"/> <circle cx="100" cy="270" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 93 263 L 107 277 M 107 263 L 93 277" stroke="#1e293b" stroke-width="2"/>
        <rect x="130" y="220" width="20" height="20" fill="white"/> <circle cx="140" cy="230" r="10" fill="white" stroke="#3b82f6" stroke-width="2"/>
        <text x="140" y="234" font-family="sans-serif" font-weight="bold" font-size="12" fill="#3b82f6" text-anchor="middle">V</text>
  
        <text x="220" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#f43f5e">D</text>
        <path d="M 260 200 L 340 200 L 340 270 L 260 270 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        <rect x="290" y="190" width="20" height="20" fill="white"/> <line x1="295" y1="185" x2="295" y2="215" stroke="#1e293b" stroke-width="2"/><line x1="305" y1="195" x2="305" y2="205" stroke="#1e293b" stroke-width="4"/>
        <rect x="290" y="260" width="20" height="20" fill="white"/> <circle cx="300" cy="270" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 293 263 L 307 277 M 307 263 L 293 277" stroke="#1e293b" stroke-width="2"/>
        <path d="M 280 200 L 280 170 L 320 170 L 320 200" fill="none" stroke="#10b981" stroke-width="2"/>
        <rect x="290" y="160" width="20" height="20" fill="white"/> <circle cx="300" cy="170" r="10" fill="white" stroke="#10b981" stroke-width="2"/>
        <text x="300" y="174" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">A</text>
      </svg>`,
      options: [
        { val: "A", text: "A. Diagram A" },
        { val: "B", text: "B. Diagram B" },
        { val: "C", text: "C. Diagram C" },
        { val: "D", text: "D. Diagram D" }
      ],
      correct: "B",
      expEn: "An ammeter must always be connected in SERIES so that the current flows directly through it. Diagram B is the only one where the ammeter is part of the main loop.",
      expVn: "Ampe kế luôn phải được mắc nối tiếp (SERIES) để dòng điện chạy trực tiếp qua nó. Sơ đồ B là sơ đồ duy nhất trong đó ampe kế là một phần của vòng lặp chính."
    },
    {
      id: "q4_dnd_rules",
      type: "dnd",
      title: "4. Drag and drop the correct rules for Current (A) and Voltage (V) to their respective circuit types.",
      options: [],
      bank: [
        { id: "b1", val: "I_same", text: "Current is the SAME everywhere" },
        { id: "b2", val: "I_splits", text: "Current SPLITS down branches" },
        { id: "b3", val: "V_shared", text: "Voltage is SHARED between components" },
        { id: "b4", val: "V_same", text: "Voltage is the SAME across all branches" }
      ],
      targets: [
        { id: "series", title: "Series Circuit Rules" },
        { id: "parallel", title: "Parallel Circuit Rules" }
      ],
      correctSets: {
        "series": ["I_same", "V_shared"],
        "parallel": ["I_splits", "V_same"]
      },
      expEn: "In Series, there is only one path, so current is the same, but voltage is shared. In Parallel, paths branch out, so current splits, but each branch receives the full voltage.",
      expVn: "Trong Mạch Nối tiếp, chỉ có một đường đi, vì vậy dòng điện giống nhau, nhưng điện áp được chia sẻ. Trong Mạch Song song, các đường phân nhánh, vì vậy dòng điện bị chia nhỏ, nhưng mỗi nhánh nhận được toàn bộ điện áp."
    },
    {
      id: "q5_inline_ohm",
      type: "inline",
      title: "5. Use Ohm's Law (V = I × R) to calculate the missing values.",
      options: [],
      textParts: [
        "A circuit has a battery supplying ",
        " of Voltage. An ammeter in the circuit reads a Current of 2 Amps. Because V = I × R, the total Resistance of the circuit must be ",
        "."
      ],
      blanks: {
        "1": {
          correct: "10 Volts",
          options: [
            { val: "5 Volts", text: "5 Volts" },
            { val: "10 Volts", text: "10 Volts" },
            { val: "20 Volts", text: "20 Volts" }
          ]
        },
        "2": {
          correct: "5 Ohms",
          options: [
            { val: "5 Ohms", text: "5 Ohms" },
            { val: "10 Ohms", text: "10 Ohms" },
            { val: "20 Ohms", text: "20 Ohms" }
          ]
        }
      },
      expEn: "To find the missing resistance, rearrange the formula: R = V ÷ I. If Voltage is 10V and Current is 2A, then 10 ÷ 2 = 5 Ohms.",
      expVn: "Để tìm điện trở còn thiếu, hãy sắp xếp lại công thức: R = V ÷ I. Nếu Điện áp là 10V và Dòng điện là 2A, thì 10 ÷ 2 = 5 Ohms."
    },
    {
      id: "q6_mcq_broken_parallel",
      type: "mcq",
      title: "6. Look at the parallel circuit below. If the top lamp breaks, what will happen to the bottom lamp?",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 100 60 L 300 60 L 300 190 L 100 190 Z" fill="none" stroke="#1e293b" stroke-width="3"/>
        <line x1="100" y1="125" x2="300" y2="125" stroke="#1e293b" stroke-width="3"/>
        
        <rect x="170" y="50" width="60" height="20" fill="white"/>
        <line x1="180" y1="45" x2="180" y2="75" stroke="#1e293b" stroke-width="2"/>
        <line x1="190" y1="55" x2="190" y2="65" stroke="#1e293b" stroke-width="4"/>
        <line x1="200" y1="60" x2="210" y2="60" stroke="#1e293b" stroke-width="2" stroke-dasharray="2"/>
        <line x1="220" y1="45" x2="220" y2="75" stroke="#1e293b" stroke-width="2"/>
        <line x1="230" y1="55" x2="230" y2="65" stroke="#1e293b" stroke-width="4"/>
  
        <rect x="180" y="115" width="40" height="20" fill="white"/>
        <circle cx="200" cy="125" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
        <path d="M 190 115 L 210 135 M 210 115 L 190 135" stroke="#1e293b" stroke-width="2"/>
        <line x1="180" y1="105" x2="220" y2="145" stroke="#ef4444" stroke-width="4"/>
        <line x1="220" y1="105" x2="180" y2="145" stroke="#ef4444" stroke-width="4"/>
  
        <rect x="180" y="180" width="40" height="20" fill="white"/>
        <circle cx="200" cy="190" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
        <path d="M 190 180 L 210 200 M 210 180 L 190 200" stroke="#1e293b" stroke-width="2"/>
  
        <circle cx="100" cy="125" r="5" fill="#1e293b"/>
        <circle cx="300" cy="125" r="5" fill="#1e293b"/>
      </svg>`,
      options: [
        { val: "A", text: "A. It will turn off because the circuit is completely broken." },
        { val: "B", text: "B. It will stay on because it has its own direct loop to the battery." },
        { val: "C", text: "C. It will get dimmer because the voltage decreases." },
        { val: "D", text: "D. It will explode because it receives double the current." }
      ],
      correct: "B",
      expEn: "In a parallel circuit, each branch is independent. The bottom lamp still has a complete, unbroken loop back to the battery, so it stays on.",
      expVn: "Trong mạch song song, mỗi nhánh độc lập. Đèn dưới cùng vẫn có một vòng lặp hoàn chỉnh, không bị hỏng quay trở lại pin, vì vậy nó vẫn sáng."
    },
    {
      id: "q7_inline_variable_resistor",
      type: "inline",
      title: "7. Complete the statement regarding the control of electrical circuits.",
      options: [],
      textParts: [
        "If an engineer slides the control on a variable resistor to ",
        " the total resistance in a circuit, the amount of current flowing through will immediately ",
        ", which would cause a connected lamp to become dimmer."
      ],
      blanks: {
        "1": {
          correct: "increase",
          options: [
            { val: "increase", text: "increase" },
            { val: "decrease", text: "decrease" }
          ]
        },
        "2": {
          correct: "decrease",
          options: [
            { val: "increase", text: "increase" },
            { val: "decrease", text: "decrease" }
          ]
        }
      },
      expEn: "Resistance opposes current. If you increase the resistance, the current decreases, causing the lamp to dim.",
      expVn: "Điện trở cản trở dòng điện. Nếu bạn tăng điện trở, dòng điện sẽ giảm, khiến đèn mờ đi."
    },
    {
      id: "q8_mcq_series_voltage",
      type: "mcq",
      title: "8. A 12V battery is connected in series with three identical lamps. What will a voltmeter read if connected across just ONE of the lamps?",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 80 L 350 80 L 350 180 L 50 180 Z" fill="none" stroke="#1e293b" stroke-width="3"/>
        
        <rect x="170" y="70" width="60" height="20" fill="white"/>
        <line x1="180" y1="65" x2="180" y2="95" stroke="#1e293b" stroke-width="2"/>
        <line x1="190" y1="75" x2="190" y2="85" stroke="#1e293b" stroke-width="4"/>
        <line x1="200" y1="80" x2="210" y2="80" stroke="#1e293b" stroke-width="2" stroke-dasharray="2"/>
        <line x1="220" y1="65" x2="220" y2="95" stroke="#1e293b" stroke-width="2"/>
        <line x1="230" y1="75" x2="230" y2="85" stroke="#1e293b" stroke-width="4"/>
        <text x="200" y="55" font-family="sans-serif" font-weight="900" font-size="16" fill="#1e293b" text-anchor="middle">12V Battery</text>
  
        <rect x="90" y="170" width="20" height="20" fill="white"/>
        <circle cx="100" cy="180" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
        <path d="M 90 170 L 110 190 M 110 170 L 90 190" stroke="#1e293b" stroke-width="2"/>
  
        <rect x="190" y="170" width="20" height="20" fill="white"/>
        <circle cx="200" cy="180" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
        <path d="M 190 170 L 210 190 M 210 170 L 190 190" stroke="#1e293b" stroke-width="2"/>
  
        <rect x="290" y="170" width="20" height="20" fill="white"/>
        <circle cx="300" cy="180" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
        <path d="M 290 170 L 310 190 M 310 170 L 290 190" stroke="#1e293b" stroke-width="2"/>
  
        <path d="M 160 180 L 160 220 L 240 220 L 240 180" fill="none" stroke="#ec4899" stroke-width="3" stroke-dasharray="4"/>
        <rect x="185" y="210" width="30" height="20" fill="white"/>
        <circle cx="200" cy="220" r="14" fill="white" stroke="#ec4899" stroke-width="3"/>
        <text x="200" y="225" font-family="sans-serif" font-weight="900" font-size="14" fill="#ec4899" text-anchor="middle">V</text>
      </svg>`,
      options: [
        { val: "A", text: "A. 12 Volts" },
        { val: "B", text: "B. 6 Volts" },
        { val: "C", text: "C. 4 Volts" },
        { val: "D", text: "D. 3 Volts" }
      ],
      correct: "C",
      expEn: "In a series circuit, voltage is SHARED between the components. If a 12V battery is shared equally among 3 identical lamps, each lamp uses 4 Volts (12 ÷ 3 = 4).",
      expVn: "Trong một mạch nối tiếp, điện áp được CHIA SẺ giữa các linh kiện. Nếu một pin 12V được chia đều cho 3 đèn giống hệt nhau, mỗi đèn sử dụng 4 Vôn (12 ÷ 3 = 4)."
    }
  ]
};