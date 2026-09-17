// src/data/GED_MATH/MATH_0E/workbook.js
// Reveal-solution practice for Geometry & Measurement (the whole Drill, 40 XP).
// See docs/workbook-tasks.md. The unit is stated in the prompt; the bare number
// is the answer and unit-tagged variants are accepted. π ≈ 3.14 throughout.

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "A rectangle is $7$ cm long and $4$ cm wide. Find its **perimeter** in cm.",
        promptVn: "Một hình chữ nhật dài $7$ cm và rộng $4$ cm. Tìm **chu vi** của nó theo cm.",
        solution: [
          "Formula: $P = 2l + 2w$.",
          "Substitute: $P = 2(7) + 2(4) = 14 + 8$.",
          "$P = 22$ cm.",
        ],
        solutionVn: [
          "Công thức: $P = 2l + 2w$.",
          "Thay số: $P = 2(7) + 2(4) = 14 + 8$.",
          "$P = 22$ cm.",
        ],
        answer: "$22$", answerVn: "$22$",
        accept: ["22 cm", "22cm"],
      },
      {
        id: "f2",
        prompt: "A rectangle is $9$ m long and $6$ m wide. Find its **area** in m$^2$.",
        promptVn: "Một hình chữ nhật dài $9$ m và rộng $6$ m. Tìm **diện tích** của nó theo m$^2$.",
        solution: [
          "Formula: $A = lw$.",
          "Substitute: $A = 9 \\times 6 = 54$ m$^2$.",
        ],
        solutionVn: [
          "Công thức: $A = lw$.",
          "Thay số: $A = 9 \\times 6 = 54$ m$^2$.",
        ],
        answer: "$54$", answerVn: "$54$",
        accept: ["54 m2", "54 m^2", "54m2"],
      },
      {
        id: "f3",
        prompt: "A triangle has a base of $10$ in and a height of $4$ in. Find its **area** in in$^2$.",
        promptVn: "Một tam giác có đáy $10$ in và chiều cao $4$ in. Tìm **diện tích** của nó theo in$^2$.",
        solution: [
          "Formula: $A = \\dfrac{1}{2}bh$.",
          "Substitute: $A = \\dfrac{1}{2} \\times 10 \\times 4 = \\dfrac{1}{2} \\times 40$.",
          "$A = 20$ in$^2$.",
        ],
        solutionVn: [
          "Công thức: $A = \\dfrac{1}{2}bh$.",
          "Thay số: $A = \\dfrac{1}{2} \\times 10 \\times 4 = \\dfrac{1}{2} \\times 40$.",
          "$A = 20$ in$^2$.",
        ],
        answer: "$20$", answerVn: "$20$",
        accept: ["20 in2", "20 in^2"],
      },
      {
        id: "f4",
        prompt: "A circle has a radius of $5$ cm. Find its **circumference** in cm. Use $\\pi \\approx 3.14$.",
        promptVn: "Một hình tròn có bán kính $5$ cm. Tìm **chu vi** của nó theo cm. Dùng $\\pi \\approx 3{,}14$.",
        solution: [
          "Formula: $C = 2\\pi r$.",
          "Substitute: $C = 2 \\times 3.14 \\times 5$.",
          "$2 \\times 5 = 10$, and $10 \\times 3.14 = 31.4$ cm.",
        ],
        solutionVn: [
          "Công thức: $C = 2\\pi r$.",
          "Thay số: $C = 2 \\times 3{,}14 \\times 5$.",
          "$2 \\times 5 = 10$, và $10 \\times 3{,}14 = 31{,}4$ cm.",
        ],
        answer: "$31.4$", answerVn: "$31{,}4$",
        accept: ["31.4", "31,4", "31.4 cm"],
      },
      {
        id: "f5",
        prompt: "A circle has a radius of $2$ m. Find its **area** in m$^2$. Use $\\pi \\approx 3.14$.",
        promptVn: "Một hình tròn có bán kính $2$ m. Tìm **diện tích** của nó theo m$^2$. Dùng $\\pi \\approx 3{,}14$.",
        solution: [
          "Formula: $A = \\pi r^2$. Square the radius first: $2^2 = 4$.",
          "$A = 3.14 \\times 4 = 12.56$ m$^2$.",
        ],
        solutionVn: [
          "Công thức: $A = \\pi r^2$. Bình phương bán kính trước: $2^2 = 4$.",
          "$A = 3{,}14 \\times 4 = 12{,}56$ m$^2$.",
        ],
        answer: "$12.56$", answerVn: "$12{,}56$",
        accept: ["12.56", "12,56", "12.56 m2"],
      },
      {
        id: "f6",
        prompt: "A box is $5$ ft long, $4$ ft wide and $3$ ft tall. Find its **volume** in ft$^3$.",
        promptVn: "Một cái hộp dài $5$ ft, rộng $4$ ft và cao $3$ ft. Tìm **thể tích** của nó theo ft$^3$.",
        solution: [
          "Formula: $V = lwh$.",
          "Substitute: $V = 5 \\times 4 \\times 3 = 60$ ft$^3$.",
        ],
        solutionVn: [
          "Công thức: $V = lwh$.",
          "Thay số: $V = 5 \\times 4 \\times 3 = 60$ ft$^3$.",
        ],
        answer: "$60$", answerVn: "$60$",
        accept: ["60 ft3", "60 ft^3"],
      },
      {
        id: "f7",
        prompt: "Two angles sit next to each other on a straight line. One is $110°$. Find the other angle in degrees.",
        promptVn: "Hai góc kề nhau trên một đường thẳng. Một góc là $110°$. Tìm góc kia theo độ.",
        solution: [
          "Angles on a straight line add to $180°$.",
          "$180 - 110 = 70°$.",
        ],
        solutionVn: [
          "Các góc trên một đường thẳng có tổng $180°$.",
          "$180 - 110 = 70°$.",
        ],
        answer: "$70$", answerVn: "$70$",
        accept: ["70°", "70 degrees"],
      },
      {
        id: "f8",
        prompt: "A triangle has angles of $50°$ and $60°$. Find the third angle in degrees.",
        promptVn: "Một tam giác có các góc $50°$ và $60°$. Tìm góc thứ ba theo độ.",
        solution: [
          "Angles in a triangle add to $180°$.",
          "$180 - 50 - 60 = 70°$.",
        ],
        solutionVn: [
          "Các góc trong tam giác có tổng $180°$.",
          "$180 - 50 - 60 = 70°$.",
        ],
        answer: "$70$", answerVn: "$70$",
        accept: ["70°", "70 degrees"],
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "A right triangle has legs of $3$ cm and $4$ cm. Find the **hypotenuse** in cm.",
        promptVn: "Một tam giác vuông có hai cạnh góc vuông $3$ cm và $4$ cm. Tìm **cạnh huyền** theo cm.",
        solution: [
          "Formula: $a^2 + b^2 = c^2$. The hypotenuse is unknown, so ADD the squares.",
          "$3^2 + 4^2 = 9 + 16 = 25$.",
          "$c = \\sqrt{25} = 5$ cm.",
        ],
        solutionVn: [
          "Công thức: $a^2 + b^2 = c^2$. Chưa biết cạnh huyền, nên CỘNG các bình phương.",
          "$3^2 + 4^2 = 9 + 16 = 25$.",
          "$c = \\sqrt{25} = 5$ cm.",
        ],
        answer: "$5$", answerVn: "$5$",
        accept: ["5 cm", "5cm"],
      },
      {
        id: "p2",
        prompt: "A right triangle has a hypotenuse of $10$ m and one leg of $6$ m. Find the **other leg** in m.",
        promptVn: "Một tam giác vuông có cạnh huyền $10$ m và một cạnh góc vuông $6$ m. Tìm **cạnh góc vuông còn lại** theo m.",
        solution: [
          "A leg is unknown, so SUBTRACT the squares: $b^2 = c^2 - a^2$.",
          "$b^2 = 10^2 - 6^2 = 100 - 36 = 64$.",
          "$b = \\sqrt{64} = 8$ m.",
        ],
        solutionVn: [
          "Chưa biết cạnh góc vuông, nên TRỪ các bình phương: $b^2 = c^2 - a^2$.",
          "$b^2 = 10^2 - 6^2 = 100 - 36 = 64$.",
          "$b = \\sqrt{64} = 8$ m.",
        ],
        answer: "$8$", answerVn: "$8$",
        accept: ["8 m", "8m"],
      },
      {
        id: "p3",
        prompt: "A cylinder has a radius of $2$ cm and a height of $5$ cm. Find its **volume** in cm$^3$. Use $\\pi \\approx 3.14$.",
        promptVn: "Một hình trụ có bán kính $2$ cm và chiều cao $5$ cm. Tìm **thể tích** của nó theo cm$^3$. Dùng $\\pi \\approx 3{,}14$.",
        solution: [
          "Formula: $V = \\pi r^2 h$. Square the radius first: $2^2 = 4$.",
          "$V = 3.14 \\times 4 \\times 5 = 3.14 \\times 20$.",
          "$V = 62.8$ cm$^3$.",
        ],
        solutionVn: [
          "Công thức: $V = \\pi r^2 h$. Bình phương bán kính trước: $2^2 = 4$.",
          "$V = 3{,}14 \\times 4 \\times 5 = 3{,}14 \\times 20$.",
          "$V = 62{,}8$ cm$^3$.",
        ],
        answer: "$62.8$", answerVn: "$62{,}8$",
        accept: ["62.8", "62,8", "62.8 cm3"],
      },
      {
        id: "p4",
        prompt: "A box is $3$ in long, $2$ in wide and $1$ in tall. Find its **surface area** in in$^2$.",
        promptVn: "Một cái hộp dài $3$ in, rộng $2$ in và cao $1$ in. Tìm **diện tích bề mặt** của nó theo in$^2$.",
        solution: [
          "Formula: $SA = 2lw + 2lh + 2wh$ — all six faces.",
          "$2(3 \\times 2) + 2(3 \\times 1) + 2(2 \\times 1) = 2(6) + 2(3) + 2(2)$.",
          "$= 12 + 6 + 4 = 22$ in$^2$.",
        ],
        solutionVn: [
          "Công thức: $SA = 2lw + 2lh + 2wh$ — cả sáu mặt.",
          "$2(3 \\times 2) + 2(3 \\times 1) + 2(2 \\times 1) = 2(6) + 2(3) + 2(2)$.",
          "$= 12 + 6 + 4 = 22$ in$^2$.",
        ],
        answer: "$22$", answerVn: "$22$",
        accept: ["22 in2", "22 in^2"],
      },
      {
        id: "p5",
        prompt: "A floor is an $8$ m by $5$ m rectangle with a $2$ m by $2$ m square cut out of one corner. Find the **area** of the floor in m$^2$.",
        promptVn: "Một sàn nhà là hình chữ nhật $8$ m nhân $5$ m bị cắt mất một hình vuông $2$ m nhân $2$ m ở một góc. Tìm **diện tích** sàn theo m$^2$.",
        solution: [
          "Whole rectangle: $8 \\times 5 = 40$ m$^2$.",
          "Cut-out square: $2 \\times 2 = 4$ m$^2$.",
          "Subtract the missing piece: $40 - 4 = 36$ m$^2$.",
        ],
        solutionVn: [
          "Cả hình chữ nhật: $8 \\times 5 = 40$ m$^2$.",
          "Hình vuông bị cắt: $2 \\times 2 = 4$ m$^2$.",
          "Trừ phần thiếu: $40 - 4 = 36$ m$^2$.",
        ],
        answer: "$36$", answerVn: "$36$",
        accept: ["36 m2", "36 m^2"],
      },
      {
        id: "p6",
        prompt: "Two straight lines cross. One of the four angles is $35°$. Find the angle **directly opposite** it (the vertical angle) in degrees.",
        promptVn: "Hai đường thẳng cắt nhau. Một trong bốn góc là $35°$. Tìm góc **đối diện trực tiếp** với nó (góc đối đỉnh) theo độ.",
        solution: [
          "Vertical angles (opposite each other across the X) are equal.",
          "So the opposite angle is also $35°$. (The two angles NEXT to it are $180 - 35 = 145°$.)",
        ],
        solutionVn: [
          "Các góc đối đỉnh (đối diện nhau qua chữ X) bằng nhau.",
          "Vậy góc đối diện cũng là $35°$. (Hai góc KỀ nó là $180 - 35 = 145°$.)",
        ],
        answer: "$35$", answerVn: "$35$",
        accept: ["35°", "35 degrees"],
      },
      {
        id: "p7",
        prompt: "A shelf is $3$ feet long. How long is it in **inches**? ($1$ ft $= 12$ in.)",
        promptVn: "Một cái kệ dài $3$ feet. Nó dài bao nhiêu **inch**? ($1$ ft $= 12$ in.)",
        solution: [
          "Feet to inches is a bigger unit to a smaller one, so multiply.",
          "$3 \\times 12 = 36$ inches.",
        ],
        solutionVn: [
          "Feet sang inch là từ đơn vị lớn sang nhỏ, nên nhân.",
          "$3 \\times 12 = 36$ inch.",
        ],
        answer: "$36$", answerVn: "$36$",
        accept: ["36 in", "36 inches"],
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "A round table has a **diameter** of $10$ ft. Find its area in ft$^2$. Use $\\pi \\approx 3.14$.",
        promptVn: "Một cái bàn tròn có **đường kính** $10$ ft. Tìm diện tích của nó theo ft$^2$. Dùng $\\pi \\approx 3{,}14$.",
        solution: [
          "The formula needs the radius. Radius = half the diameter $= 10 \\div 2 = 5$ ft.",
          "$A = \\pi r^2 = 3.14 \\times 5^2 = 3.14 \\times 25$.",
          "$A = 78.5$ ft$^2$.",
        ],
        solutionVn: [
          "Công thức cần bán kính. Bán kính = nửa đường kính $= 10 \\div 2 = 5$ ft.",
          "$A = \\pi r^2 = 3{,}14 \\times 5^2 = 3{,}14 \\times 25$.",
          "$A = 78{,}5$ ft$^2$.",
        ],
        answer: "$78.5$", answerVn: "$78{,}5$",
        accept: ["78.5", "78,5", "78.5 ft2"],
      },
      {
        id: "c2",
        prompt: "Two parallel lines are cut by a transversal. One angle is $70°$. Find the angle that is on the **same side** of the transversal and **between** the parallel lines (the co-interior angle), in degrees.",
        promptVn: "Hai đường thẳng song song bị cắt bởi một đường cắt. Một góc là $70°$. Tìm góc nằm **cùng phía** của đường cắt và **giữa** hai đường song song (góc trong cùng phía), theo độ.",
        solution: [
          "On parallel lines every angle is either $a$ or $180 - a$.",
          "Co-interior angles (a C-shape) are the pair that add to $180°$.",
          "$180 - 70 = 110°$.",
        ],
        solutionVn: [
          "Trên các đường song song, mọi góc đều là $a$ hoặc $180 - a$.",
          "Góc trong cùng phía (hình chữ C) là cặp có tổng $180°$.",
          "$180 - 70 = 110°$.",
        ],
        answer: "$110$", answerVn: "$110$",
        accept: ["110°", "110 degrees"],
      },
      {
        id: "c3",
        prompt: "A square garden has sides of $12$ m. A fence costs \\$$5$ per metre. How many **dollars** does it cost to fence all four sides?",
        promptVn: "Một khu vườn hình vuông có cạnh $12$ m. Hàng rào giá $5$ đô la mỗi mét. Cần bao nhiêu **đô la** để rào cả bốn cạnh?",
        solution: [
          "A fence goes around the outside, so this is a perimeter question.",
          "Perimeter of a square $= 4 \\times 12 = 48$ m.",
          "Cost $= 48 \\times 5 = 240$ dollars.",
        ],
        solutionVn: [
          "Hàng rào đi quanh bên ngoài, nên đây là câu hỏi chu vi.",
          "Chu vi hình vuông $= 4 \\times 12 = 48$ m.",
          "Chi phí $= 48 \\times 5 = 240$ đô la.",
        ],
        answer: "$240$", answerVn: "$240$",
        accept: ["$240", "240 dollars"],
      },
      {
        id: "c4",
        prompt: "A $13$ ft ladder leans against a wall. Its foot is $5$ ft from the wall. How far **up the wall** does it reach, in ft?",
        promptVn: "Một cái thang dài $13$ ft dựa vào tường. Chân thang cách tường $5$ ft. Thang chạm tường ở độ cao bao nhiêu **ft**?",
        solution: [
          "The ladder is the hypotenuse ($13$); the ground distance is a leg ($5$); the height is the other leg.",
          "A leg is unknown, so subtract: $b^2 = 13^2 - 5^2 = 169 - 25 = 144$.",
          "$b = \\sqrt{144} = 12$ ft.",
        ],
        solutionVn: [
          "Cái thang là cạnh huyền ($13$); khoảng cách trên mặt đất là một cạnh góc vuông ($5$); chiều cao là cạnh còn lại.",
          "Chưa biết cạnh góc vuông, nên trừ: $b^2 = 13^2 - 5^2 = 169 - 25 = 144$.",
          "$b = \\sqrt{144} = 12$ ft.",
        ],
        answer: "$12$", answerVn: "$12$",
        accept: ["12 ft", "12ft"],
      },
      {
        id: "c5",
        prompt: "A wall is $4$ m wide and $3$ m tall. It has a door $1$ m wide and $2$ m tall that will not be painted. How many m$^2$ of wall need paint?",
        promptVn: "Một bức tường rộng $4$ m và cao $3$ m. Nó có một cửa rộng $1$ m và cao $2$ m sẽ không sơn. Cần sơn bao nhiêu m$^2$ tường?",
        solution: [
          "Whole wall: $4 \\times 3 = 12$ m$^2$.",
          "Door: $1 \\times 2 = 2$ m$^2$.",
          "Painted area $= 12 - 2 = 10$ m$^2$.",
        ],
        solutionVn: [
          "Cả bức tường: $4 \\times 3 = 12$ m$^2$.",
          "Cửa: $1 \\times 2 = 2$ m$^2$.",
          "Diện tích sơn $= 12 - 2 = 10$ m$^2$.",
        ],
        answer: "$10$", answerVn: "$10$",
        accept: ["10 m2", "10 m^2"],
      },
      {
        id: "c6",
        prompt: "A board is $2$ m long and $150$ cm wide. Find its area in **m$^2$**. (Change the units first: $1$ m $= 100$ cm.)",
        promptVn: "Một tấm ván dài $2$ m và rộng $150$ cm. Tìm diện tích của nó theo **m$^2$**. (Đổi đơn vị trước: $1$ m $= 100$ cm.)",
        solution: [
          "The units do not match. Change $150$ cm to metres: $150 \\div 100 = 1.5$ m.",
          "$A = 2 \\times 1.5 = 3$ m$^2$.",
        ],
        solutionVn: [
          "Đơn vị không khớp. Đổi $150$ cm sang mét: $150 \\div 100 = 1{,}5$ m.",
          "$A = 2 \\times 1{,}5 = 3$ m$^2$.",
        ],
        answer: "$3$", answerVn: "$3$",
        accept: ["3 m2", "3 m^2", "3.0"],
      },
      {
        id: "c7",
        prompt: "A water tank is a cylinder with a radius of $10$ ft and a height of $2$ ft. Find its volume in ft$^3$. Use $\\pi \\approx 3.14$.",
        promptVn: "Một bể nước hình trụ có bán kính $10$ ft và chiều cao $2$ ft. Tìm thể tích của nó theo ft$^3$. Dùng $\\pi \\approx 3{,}14$.",
        solution: [
          "$V = \\pi r^2 h$. Square the radius: $10^2 = 100$.",
          "$V = 3.14 \\times 100 \\times 2 = 3.14 \\times 200$.",
          "$V = 628$ ft$^3$.",
        ],
        solutionVn: [
          "$V = \\pi r^2 h$. Bình phương bán kính: $10^2 = 100$.",
          "$V = 3{,}14 \\times 100 \\times 2 = 3{,}14 \\times 200$.",
          "$V = 628$ ft$^3$.",
        ],
        answer: "$628$", answerVn: "$628$",
        accept: ["628 ft3", "628 ft^3"],
      },
    ],
  },
];
