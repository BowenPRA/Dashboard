// src/data/Y8/Math_1A/assessment.js
export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [], // No text passages needed for this Math assessment
  questions: [
    {
      id: "q1_comp_inline",
      type: "inline",
      title: "1. Look at the right angle below split into two adjacent angles. Select the correct relationship.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 120 50 L 120 200 L 270 200" fill="none" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 120 170 L 150 170 L 150 200" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 120 200 L 240 106" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
        <path d="M 180 200 A 60 60 0 0 0 170 161" fill="none" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <text x="195" y="185" font-family="sans-serif" font-weight="bold" font-size="20" fill="#1d4ed8" text-anchor="middle">a</text>
        <path d="M 170 161 A 60 60 0 0 0 120 140" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <text x="145" y="135" font-family="sans-serif" font-weight="bold" font-size="20" fill="#b91c1c" text-anchor="middle">b</text>
      </svg>`,
      options: [],
      textParts: [
        "Because the two angles form a perfect right corner, they are known as ",
        " angles. This means their mathematical sum will always equal exactly ",
        "."
      ],
      blanks: {
        "1": {
          correct: "complementary",
          options: [
            { val: "supplementary", text: "supplementary" },
            { val: "complementary", text: "complementary" },
            { val: "vertically opposite", text: "vertically opposite" }
          ]
        },
        "2": {
          correct: "90",
          options: [
            { val: "90", text: "90°" },
            { val: "180", text: "180°" },
            { val: "360", text: "360°" }
          ]
        }
      },
      expEn: "Adjacent angles that form a right corner (indicated by the square symbol) add up to 90°. These are mathematically defined as complementary angles.",
      expVn: "Các góc kề nhau tạo thành một góc vuông (được chỉ ra bởi ký hiệu hình vuông) có tổng là 90°. Chúng được định nghĩa toán học là các góc phụ nhau."
    },
    {
      id: "q2_comp_mcq",
      type: "mcq",
      title: "2. The angle marked with a square is a right angle. If angle 'a' measures 38°, what is the exact measurement of angle 'b'?",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 120 50 L 120 200 L 270 200" fill="none" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 120 170 L 150 170 L 150 200" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 120 200 L 240 106" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
        <path d="M 180 200 A 60 60 0 0 0 170 161" fill="none" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <text x="200" y="185" font-family="sans-serif" font-weight="bold" font-size="20" fill="#1d4ed8" text-anchor="middle">38°</text>
        <path d="M 170 161 A 60 60 0 0 0 120 140" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <text x="145" y="135" font-family="sans-serif" font-weight="bold" font-size="20" fill="#b91c1c" text-anchor="middle">b</text>
      </svg>`,
      options: [
        { val: "A", text: "A. 142°" },
        { val: "B", text: "B. 52°" },
        { val: "C", text: "C. 62°" },
        { val: "D", text: "D. 90°" }
      ],
      correct: "B",
      expEn: "Complementary angles add up to 90°. Subtracting the known angle gives the missing value: 90° - 38° = 52°.",
      expVn: "Các góc phụ nhau có tổng là 90°. Trừ đi góc đã biết sẽ ra giá trị còn thiếu: 90° - 38° = 52°."
    },
    {
      id: "q3_vocab_dnd",
      type: "dnd",
      title: "3. Drag and drop the visual letter shapes that help identify these specific parallel line angle pairs.",
      options: [],
      bank: [
        { id: "v1", val: "z_shape", text: "Z-Shape" },
        { id: "v2", val: "c_shape", text: "C-Shape" },
        { id: "v3", val: "f_shape", text: "F-Shape" },
        { id: "v4", val: "x_shape", text: "X-Shape" }
      ],
      targets: [
        { id: "alt", title: "Alternate Angles" },
        { id: "corr", title: "Corresponding Angles" },
        { id: "co_int", title: "Co-interior Angles" }
      ],
      correctSets: {
        "alt": ["z_shape"],
        "corr": ["f_shape"],
        "co_int": ["c_shape"]
      },
      expEn: "Alternate angles form a Z-shape, Corresponding angles form an F-shape, and Co-interior angles form a C-shape.",
      expVn: "Góc so le trong tạo thành hình chữ Z, Góc đồng vị tạo thành hình chữ F, và Góc trong cùng phía tạo thành hình chữ C."
    },
    {
      id: "q4_math_inline",
      type: "inline",
      title: "4. Identify the relationship to calculate the missing angle 'y'.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 80 L 350 80" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 50 170 L 350 170" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 130 20 L 270 230" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>
        <path d="M 195 80 A 25 25 0 0 1 183.9 100.8" fill="none" stroke="#9333ea" stroke-width="5" stroke-linecap="round"/>
        <text x="160" y="115" font-family="sans-serif" font-weight="bold" font-size="18" fill="#9333ea">72°</text>
        <path d="M 205 170 A 25 25 0 0 1 216.1 149.2" fill="none" stroke="#9333ea" stroke-width="5" stroke-linecap="round"/>
        <text x="230" y="150" font-family="sans-serif" font-weight="bold" font-size="18" fill="#9333ea">y</text>
      </svg>`,
      options: [],
      textParts: [
        "Because the horizontal lines are parallel, the angle marked 'y' is ",
        " to the 72° angle. This means their mathematical values are exactly ",
        ", making y = 72°."
      ],
      blanks: {
        "1": {
          correct: "alt",
          options: [
            { val: "co_int", text: "co-interior" },
            { val: "alt", text: "alternate" },
            { val: "corr", text: "corresponding" }
          ]
        },
        "2": {
          correct: "equal",
          options: [
            { val: "supp", text: "supplementary" },
            { val: "equal", text: "equal" }
          ]
        }
      },
      expEn: "The highlighted angles sit on opposite sides of the transversal forming a Z-shape. This makes them alternate angles, which are always mathematically equal.",
      expVn: "Các góc được làm nổi bật nằm ở hai phía đối diện của đường cát tuyến tạo thành hình chữ Z. Điều này khiến chúng trở thành góc so le trong, và chúng luôn bằng nhau về mặt toán học."
    },
    {
      id: "q5_math_mcq",
      type: "mcq",
      title: "5. Examine the C-shape highlight. Calculate the value of angle z.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 80 L 350 80" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 50 170 L 350 170" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 130 20 L 270 230" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>
        <path d="M 195 80 A 25 25 0 0 1 183.9 100.8" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <text x="160" y="115" font-family="sans-serif" font-weight="bold" font-size="18" fill="#ef4444">105°</text>
        <path d="M 255 170 A 25 25 0 0 0 216.1 149.2" fill="none" stroke="#22c55e" stroke-width="5" stroke-linecap="round"/>
        <text x="245" y="145" font-family="sans-serif" font-weight="bold" font-size="18" fill="#22c55e">z</text>
      </svg>`,
      options: [
        { val: "A", text: "A. 105°" },
        { val: "B", text: "B. 90°" },
        { val: "C", text: "C. 85°" },
        { val: "D", text: "D. 75°" }
      ],
      correct: "D",
      expEn: "The highlighted angles are on the same side of the transversal (C-shape), meaning they are co-interior. Co-interior angles are supplementary (add to 180). 180 - 105 = 75°.",
      expVn: "Các góc được đánh dấu nằm cùng một phía của đường cát tuyến (hình chữ C), nghĩa là chúng là góc trong cùng phía. Góc trong cùng phía thì bù nhau (tổng bằng 180). 180 - 105 = 75°."
    },
    {
      id: "q6_x_intersect_dnd",
      type: "dnd",
      title: "6. Analyze the intersecting system below. Drag the correct numerical values to identify angles d, e, and f.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 125 L 350 125" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
        <path d="M 120 225 L 280 25" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
        <path d="M 160 125 A 40 40 0 0 1 225 94" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <text x="185" y="90" font-family="sans-serif" font-weight="bold" font-size="18" fill="#b91c1c" text-anchor="middle">130°</text>
        <path d="M 240 125 A 40 40 0 0 1 175 156" fill="none" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <text x="215" y="175" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1d4ed8" text-anchor="middle">d</text>
        <path d="M 225 94 A 40 40 0 0 1 240 125" fill="none" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <text x="245" y="110" font-family="sans-serif" font-weight="bold" font-size="18" fill="#d97706" text-anchor="middle">f</text>
        <path d="M 175 156 A 40 40 0 0 1 160 125" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
        <text x="155" y="150" font-family="sans-serif" font-weight="bold" font-size="18" fill="#059669" text-anchor="middle">e</text>
      </svg>`,
      options: [],
      bank: [
        { id: "n1", val: "130", text: "130°" },
        { id: "n2", val: "50", text: "50°" },
        { id: "n3", val: "50", text: "50°" },
        { id: "n4", val: "40", text: "40°" }
      ],
      targets: [
        { id: "t_d", title: "Angle d" },
        { id: "t_e", title: "Angle e" },
        { id: "t_f", title: "Angle f" }
      ],
      correctSets: {
        "t_d": ["130"],
        "t_e": ["50"],
        "t_f": ["50"]
      },
      expEn: "Angle 'd' is vertically opposite to 130°, making it equal to 130°. Angles 'e' and 'f' sit on a straight line intersecting the 130° angle, making them supplementary: 180° - 130° = 50°.",
      expVn: "Góc 'd' đối đỉnh với góc 130°, nên nó bằng 130°. Góc 'e' và 'f' nằm trên đường thẳng kề bù với góc 130°, nên chúng có tổng bằng 180°: 180° - 130° = 50°."
    },
    {
      id: "q7_complex_dnd",
      type: "dnd",
      title: "7. Drag the correct numerical values to complete the calculations for angles a, b, c, and d.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 80 L 350 80" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 50 170 L 350 170" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 130 20 L 270 230" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>
        
        <text x="185" y="70" font-family="sans-serif" font-weight="bold" font-size="18" fill="#334155">65°</text>
        <text x="150" y="105" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1d4ed8">a</text>
        <text x="200" y="105" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1d4ed8">b</text>
        <text x="210" y="155" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1d4ed8">c</text>
        <text x="255" y="155" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1d4ed8">d</text>
      </svg>`,
      options: [],
      bank: [
        { id: "x1", val: "65", text: "65°" },
        { id: "x2", val: "65", text: "65°" },
        { id: "x3", val: "115", text: "115°" },
        { id: "x4", val: "115", text: "115°" },
        { id: "x5", val: "180", text: "180°" }
      ],
      targets: [
        { id: "a_val", title: "Angle a" },
        { id: "b_val", title: "Angle b" },
        { id: "c_val", title: "Angle c" },
        { id: "d_val", title: "Angle d" }
      ],
      correctSets: {
        "a_val": ["65"],
        "b_val": ["115"],
        "c_val": ["115"],
        "d_val": ["65"]
      },
      expEn: "'a' is vertically opposite to 65° (so a=65). 'b' is supplementary to 'a' on a straight line (180-65=115). 'c' is alternate interior to 'b' (so c=115). 'd' is alternate interior to 'a' (so d=65).",
      expVn: "'a' là góc đối đỉnh với 65° (nên a=65). 'b' là góc bù với 'a' trên một đường thẳng (180-65=115). 'c' là góc so le trong với 'b' (nên c=115). 'd' là góc so le trong với 'a' (nên d=65)."
    },
    {
      id: "q8_global_class_dnd",
      type: "dnd",
      title: "8. Sort the geometric angle pairs or rules into their correct structural property category.",
      options: [],
      bank: [
        { id: "g1", val: "vert", text: "Vertically Opposite" },
        { id: "g2", val: "alt", text: "Alternate Angles" },
        { id: "g3", val: "corr", text: "Corresponding Angles" },
        { id: "g4", val: "coint", text: "Co-interior Angles" },
        { id: "g5", val: "straight", text: "Angles on a Straight Line" }
      ],
      targets: [
        { id: "equal_angles", title: "Equal Angles (=)" },
        { id: "supp_angles", title: "Supplementary Angles (Adds to 180°)" }
      ],
      correctSets: {
        "equal_angles": ["vert", "alt", "corr"],
        "supp_angles": ["coint", "straight"]
      },
      expEn: "Vertically opposite, alternate, and corresponding angles are always mathematically equal. Co-interior angles and angles running along a straight flat line are supplementary (summing to 180°).",
      expVn: "Các góc đối đỉnh, so le trong và đồng vị luôn bằng nhau về mặt toán học. Các góc trong cùng phía và góc trên đường thẳng là các góc bù nhau (tổng bằng 180°)."
    }
  ]
};