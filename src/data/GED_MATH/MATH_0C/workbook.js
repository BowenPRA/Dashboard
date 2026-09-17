// src/data/GED_MATH/MATH_0C/workbook.js
// Reveal-solution practice for Ratios, Proportions & Rates (25 XP of the
// Drill). See docs/workbook-tasks.md. Every answer is a number or a short
// value — no prose. In KaTeX the percent sign is escaped as \% and a dollar
// sign as \$. Ratio answers carry `accept` alternates (2:3, 2 to 3, 2/3).

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "A shelter has $4$ cats and $6$ dogs. Write the ratio of cats **to** dogs in simplest form.",
        promptVn: "Một trại có $4$ con mèo và $6$ con chó. Viết tỉ số mèo **với** chó ở dạng đơn giản nhất.",
        solution: [
          "Cats come first in the question, so the ratio is $4:6$.",
          "Both numbers divide by $2$: $4 \\div 2 = 2$ and $6 \\div 2 = 3$.",
          "Simplest form: $2:3$.",
        ],
        solutionVn: [
          "Mèo đứng trước trong câu hỏi, nên tỉ số là $4:6$.",
          "Cả hai số chia hết cho $2$: $4 \\div 2 = 2$ và $6 \\div 2 = 3$.",
          "Dạng đơn giản nhất: $2:3$.",
        ],
        answer: "$2:3$", answerVn: "$2:3$",
        accept: ["2:3", "2 : 3", "2 to 3", "2/3"],
      },
      {
        id: "f2",
        prompt: "Simplify the ratio $10:15$.",
        promptVn: "Rút gọn tỉ số $10:15$.",
        solution: [
          "Find the biggest number that divides both $10$ and $15$: it is $5$.",
          "$10 \\div 5 = 2$ and $15 \\div 5 = 3$, so $10:15 = 2:3$.",
        ],
        solutionVn: [
          "Tìm số lớn nhất chia hết cả $10$ và $15$: đó là $5$.",
          "$10 \\div 5 = 2$ và $15 \\div 5 = 3$, nên $10:15 = 2:3$.",
        ],
        answer: "$2:3$", answerVn: "$2:3$",
        accept: ["2:3", "2 : 3", "2 to 3", "2/3"],
      },
      {
        id: "f3",
        prompt: "Find the missing number: $2:5 = \\,?:20$.",
        promptVn: "Tìm số còn thiếu: $2:5 = \\,?:20$.",
        solution: [
          "Ask what $5$ was multiplied by to get $20$: $5 \\times 4 = 20$.",
          "Do the same to the other number: $2 \\times 4 = 8$.",
          "So $2:5 = 8:20$. The missing number is $8$.",
        ],
        solutionVn: [
          "Hỏi $5$ được nhân với bao nhiêu để ra $20$: $5 \\times 4 = 20$.",
          "Làm y vậy với số kia: $2 \\times 4 = 8$.",
          "Vậy $2:5 = 8:20$. Số còn thiếu là $8$.",
        ],
        answer: "$8$", answerVn: "$8$",
      },
      {
        id: "f4",
        prompt: "A car travels $120$ miles in $3$ hours. What is its speed in miles **per hour**?",
        promptVn: "Một chiếc xe đi $120$ dặm trong $3$ giờ. Tốc độ của nó là bao nhiêu dặm **mỗi giờ**?",
        solution: [
          "'Per hour' means for ONE hour, so divide the miles by the hours.",
          "$120 \\div 3 = 40$ miles per hour.",
        ],
        solutionVn: [
          "'Mỗi giờ' nghĩa là cho MỘT giờ, nên chia số dặm cho số giờ.",
          "$120 \\div 3 = 40$ dặm mỗi giờ.",
        ],
        answer: "$40$", answerVn: "$40$",
        accept: ["40", "40 mph", "40 miles per hour"],
      },
      {
        id: "f5",
        prompt: "Five pens cost $\\$10$. What is the cost of **one** pen, in dollars?",
        promptVn: "Năm cây bút giá $\\$10$. Giá **một** cây bút là bao nhiêu đô la?",
        solution: [
          "The unit rate is the price for one: divide the total price by the number of pens.",
          "$10 \\div 5 = 2$, so one pen costs $\\$2$.",
        ],
        solutionVn: [
          "Đơn giá là giá cho một cái: chia tổng giá cho số cây bút.",
          "$10 \\div 5 = 2$, nên một cây bút giá $\\$2$.",
        ],
        answer: "$2$", answerVn: "$2$",
        accept: ["2", "$2", "2 dollars"],
      },
      {
        id: "f6",
        prompt: "Solve the proportion $\\dfrac{3}{4} = \\dfrac{x}{12}$.",
        promptVn: "Giải tỉ lệ thức $\\dfrac{3}{4} = \\dfrac{x}{12}$.",
        solution: [
          "Cross-multiply: $3 \\times 12 = 4 \\times x$.",
          "$36 = 4x$.",
          "Divide both sides by $4$: $x = 9$.",
        ],
        solutionVn: [
          "Nhân chéo: $3 \\times 12 = 4 \\times x$.",
          "$36 = 4x$.",
          "Chia cả hai vế cho $4$: $x = 9$.",
        ],
        answer: "$x = 9$", answerVn: "$x = 9$",
        accept: ["9"],
      },
      {
        id: "f7",
        prompt: "Convert $3$ hours to **minutes**.",
        promptVn: "Đổi $3$ giờ sang **phút**.",
        solution: [
          "The fact: $1$ hour $= 60$ minutes.",
          "Hours to minutes gives a bigger number, so multiply: $3 \\times 60 = 180$ minutes.",
        ],
        solutionVn: [
          "Sự thật: $1$ giờ $= 60$ phút.",
          "Giờ sang phút cho số lớn hơn, nên nhân: $3 \\times 60 = 180$ phút.",
        ],
        answer: "$180$", answerVn: "$180$",
        accept: ["180", "180 minutes", "180 min"],
      },
      {
        id: "f8",
        prompt: "Write the ratio $3$ out of $10$ as a **percent**.",
        promptVn: "Viết tỉ số $3$ trên $10$ dưới dạng **phần trăm**.",
        solution: [
          "Percent means out of $100$. Make the bottom $100$: $10 \\times 10 = 100$.",
          "Do the same to the top: $3 \\times 10 = 30$.",
          "$\\dfrac{3}{10} = \\dfrac{30}{100} = 30\\%$.",
        ],
        solutionVn: [
          "Phần trăm nghĩa là trên $100$. Đưa mẫu về $100$: $10 \\times 10 = 100$.",
          "Làm y vậy với tử: $3 \\times 10 = 30$.",
          "$\\dfrac{3}{10} = \\dfrac{30}{100} = 30\\%$.",
        ],
        answer: "$30\\%$", answerVn: "$30\\%$",
        accept: ["30", "30%"],
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "$3$ movie tickets cost $\\$12$. At this rate, how much do $7$ tickets cost, in dollars?",
        promptVn: "$3$ vé xem phim giá $\\$12$. Với mức này, $7$ vé giá bao nhiêu đô la?",
        solution: [
          "Find the unit rate first: $12 \\div 3 = 4$, so one ticket is $\\$4$.",
          "Then $7$ tickets cost $7 \\times 4 = 28$.",
          "Check with a proportion: $\\dfrac{3}{12} = \\dfrac{7}{x}$, cross-multiply $3x = 84$, $x = 28$. ✓",
        ],
        solutionVn: [
          "Tìm đơn giá trước: $12 \\div 3 = 4$, nên một vé là $\\$4$.",
          "Vậy $7$ vé giá $7 \\times 4 = 28$.",
          "Kiểm tra bằng tỉ lệ thức: $\\dfrac{3}{12} = \\dfrac{7}{x}$, nhân chéo $3x = 84$, $x = 28$. ✓",
        ],
        answer: "$28$", answerVn: "$28$",
        accept: ["28", "$28", "28 dollars"],
      },
      {
        id: "p2",
        prompt: "A recipe uses $2$ cups of flour to make $12$ cookies. How many cups are needed for $36$ cookies?",
        promptVn: "Một công thức dùng $2$ cốc bột để làm $12$ cái bánh quy. Cần bao nhiêu cốc cho $36$ cái?",
        solution: [
          "Same kind on top: $\\dfrac{\\text{cups}}{\\text{cookies}}$ on both sides. $\\dfrac{2}{12} = \\dfrac{x}{36}$.",
          "Cross-multiply: $2 \\times 36 = 12x$, so $72 = 12x$.",
          "$x = 72 \\div 12 = 6$ cups.",
        ],
        solutionVn: [
          "Cùng loại ở tử: $\\dfrac{\\text{cốc}}{\\text{bánh}}$ ở cả hai vế. $\\dfrac{2}{12} = \\dfrac{x}{36}$.",
          "Nhân chéo: $2 \\times 36 = 12x$, nên $72 = 12x$.",
          "$x = 72 \\div 12 = 6$ cốc.",
        ],
        answer: "$6$", answerVn: "$6$",
        accept: ["6", "6 cups"],
      },
      {
        id: "p3",
        prompt: "On a map, $1$ inch represents $25$ miles. Two towns are $4$ inches apart on the map. How many miles apart are they?",
        promptVn: "Trên bản đồ, $1$ inch ứng với $25$ dặm. Hai thị trấn cách nhau $4$ inch trên bản đồ. Chúng cách nhau bao nhiêu dặm?",
        solution: [
          "The scale is a unit rate: $25$ miles per inch.",
          "$4$ inches is $4 \\times 25 = 100$ miles.",
        ],
        solutionVn: [
          "Tỉ lệ bản đồ là một đơn giá: $25$ dặm mỗi inch.",
          "$4$ inch là $4 \\times 25 = 100$ dặm.",
        ],
        answer: "$100$", answerVn: "$100$",
        accept: ["100", "100 miles"],
      },
      {
        id: "p4",
        prompt: "Water is sold as $6$ bottles for $\\$9$ or $10$ bottles for $\\$12$. Which pack is the better buy? Answer with the **number of bottles** in that pack.",
        promptVn: "Nước được bán $6$ chai giá $\\$9$ hoặc $10$ chai giá $\\$12$. Gói nào hời hơn? Trả lời bằng **số chai** trong gói đó.",
        solution: [
          "Compare the unit price, the cost of ONE bottle.",
          "$6$-pack: $9 \\div 6 = 1.50$ per bottle.",
          "$10$-pack: $12 \\div 10 = 1.20$ per bottle.",
          "$\\$1.20$ is less, so the $10$-pack is the better buy.",
        ],
        solutionVn: [
          "So sánh đơn giá, giá của MỘT chai.",
          "Gói $6$ chai: $9 \\div 6 = 1{,}50$ mỗi chai.",
          "Gói $10$ chai: $12 \\div 10 = 1{,}20$ mỗi chai.",
          "$\\$1{,}20$ nhỏ hơn, nên gói $10$ chai hời hơn.",
        ],
        answer: "$10$", answerVn: "$10$",
        accept: ["10", "10 bottles", "10-pack"],
      },
      {
        id: "p5",
        prompt: "A photo is $4$ inches wide and $6$ inches tall. It is enlarged so the width becomes $10$ inches. How tall is the enlarged photo?",
        promptVn: "Một bức ảnh rộng $4$ inch và cao $6$ inch. Nó được phóng to sao cho chiều rộng thành $10$ inch. Ảnh phóng to cao bao nhiêu?",
        solution: [
          "An enlargement keeps the same ratio of width to height: $\\dfrac{4}{6} = \\dfrac{10}{x}$.",
          "Cross-multiply: $4x = 60$.",
          "$x = 60 \\div 4 = 15$ inches.",
        ],
        solutionVn: [
          "Phóng to giữ nguyên tỉ số rộng với cao: $\\dfrac{4}{6} = \\dfrac{10}{x}$.",
          "Nhân chéo: $4x = 60$.",
          "$x = 60 \\div 4 = 15$ inch.",
        ],
        answer: "$15$", answerVn: "$15$",
        accept: ["15", "15 inches", "15 in"],
      },
      {
        id: "p6",
        prompt: "Convert $2.5$ hours to **minutes**.",
        promptVn: "Đổi $2{,}5$ giờ sang **phút**.",
        solution: [
          "$1$ hour $= 60$ minutes, so $\\dfrac{60}{1} = \\dfrac{x}{2.5}$.",
          "$x = 60 \\times 2.5 = 150$ minutes.",
        ],
        solutionVn: [
          "$1$ giờ $= 60$ phút, nên $\\dfrac{60}{1} = \\dfrac{x}{2{,}5}$.",
          "$x = 60 \\times 2{,}5 = 150$ phút.",
        ],
        answer: "$150$", answerVn: "$150$",
        accept: ["150", "150 minutes", "150 min"],
      },
      {
        id: "p7",
        prompt: "Convert $250$ centimetres to **metres**. ($100$ cm $= 1$ m)",
        promptVn: "Đổi $250$ xentimét sang **mét**. ($100$ cm $= 1$ m)",
        solution: [
          "$\\dfrac{100 \\text{ cm}}{1 \\text{ m}} = \\dfrac{250}{x}$.",
          "Cross-multiply: $100x = 250$, so $x = 2.5$ m.",
          "Sanity check: cm to m should give a smaller number. ✓",
        ],
        solutionVn: [
          "$\\dfrac{100 \\text{ cm}}{1 \\text{ m}} = \\dfrac{250}{x}$.",
          "Nhân chéo: $100x = 250$, nên $x = 2{,}5$ m.",
          "Kiểm tra hợp lý: cm sang m phải cho số nhỏ hơn. ✓",
        ],
        answer: "$2.5$", answerVn: "$2{,}5$",
        accept: ["2.5", "2,5", "2.5 m", "5/2"],
      },
      {
        id: "p8",
        prompt: "In a class of $20$ students, $8$ are girls. Write the ratio of girls **to boys** in simplest form.",
        promptVn: "Trong một lớp $20$ học sinh, có $8$ nữ. Viết tỉ số nữ **với nam** ở dạng đơn giản nhất.",
        solution: [
          "First find the boys: $20 - 8 = 12$.",
          "Girls to boys is $8:12$.",
          "Divide both by $4$: $2:3$.",
        ],
        solutionVn: [
          "Trước tiên tìm số nam: $20 - 8 = 12$.",
          "Nữ với nam là $8:12$.",
          "Chia cả hai cho $4$: $2:3$.",
        ],
        answer: "$2:3$", answerVn: "$2:3$",
        accept: ["2:3", "2 : 3", "2 to 3", "2/3"],
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "A car uses $6$ gallons of gas to travel $180$ miles. At this rate, how many gallons does it need for $300$ miles?",
        promptVn: "Một chiếc xe dùng $6$ gallon xăng để đi $180$ dặm. Với mức này, nó cần bao nhiêu gallon cho $300$ dặm?",
        solution: [
          "Unit rate: $180 \\div 6 = 30$ miles per gallon.",
          "$300$ miles needs $300 \\div 30 = 10$ gallons.",
          "Check: $\\dfrac{6}{180} = \\dfrac{x}{300}$, so $180x = 1800$ and $x = 10$. ✓",
        ],
        solutionVn: [
          "Đơn giá: $180 \\div 6 = 30$ dặm mỗi gallon.",
          "$300$ dặm cần $300 \\div 30 = 10$ gallon.",
          "Kiểm tra: $\\dfrac{6}{180} = \\dfrac{x}{300}$, nên $180x = 1800$ và $x = 10$. ✓",
        ],
        answer: "$10$", answerVn: "$10$",
        accept: ["10", "10 gallons"],
      },
      {
        id: "c2",
        prompt: "A drawing of a garden uses the scale $1$ cm $= 50$ cm. A path is $8$ cm long on the drawing. How long is the real path, in **metres**?",
        promptVn: "Bản vẽ một khu vườn dùng tỉ lệ $1$ cm $= 50$ cm. Một lối đi dài $8$ cm trên bản vẽ. Lối đi thật dài bao nhiêu **mét**?",
        solution: [
          "Scale up: $8 \\times 50 = 400$ cm in real life.",
          "Now convert: $100$ cm $= 1$ m, so $400 \\div 100 = 4$ m.",
        ],
        solutionVn: [
          "Phóng to: $8 \\times 50 = 400$ cm ngoài đời.",
          "Rồi đổi đơn vị: $100$ cm $= 1$ m, nên $400 \\div 100 = 4$ m.",
        ],
        answer: "$4$", answerVn: "$4$",
        accept: ["4", "4 m", "4 metres", "4 meters"],
      },
      {
        id: "c3",
        prompt: "A worker earns $\\$90$ for $6$ hours. At the same rate, how many hours must she work to earn $\\$210$?",
        promptVn: "Một công nhân kiếm $\\$90$ cho $6$ giờ. Với cùng mức đó, cô ấy phải làm bao nhiêu giờ để kiếm $\\$210$?",
        solution: [
          "Unit rate: $90 \\div 6 = 15$ dollars per hour.",
          "Hours needed: $210 \\div 15 = 14$ hours.",
        ],
        solutionVn: [
          "Đơn giá: $90 \\div 6 = 15$ đô la mỗi giờ.",
          "Số giờ cần: $210 \\div 15 = 14$ giờ.",
        ],
        answer: "$14$", answerVn: "$14$",
        accept: ["14", "14 hours", "14 h"],
      },
      {
        id: "c4",
        prompt: "A door is $5$ feet $6$ inches tall. How tall is it in **inches**? ($12$ inches $= 1$ foot)",
        promptVn: "Một cánh cửa cao $5$ foot $6$ inch. Nó cao bao nhiêu **inch**? ($12$ inch $= 1$ foot)",
        solution: [
          "Convert the feet: $5 \\times 12 = 60$ inches.",
          "Add the extra inches: $60 + 6 = 66$ inches.",
        ],
        solutionVn: [
          "Đổi phần foot: $5 \\times 12 = 60$ inch.",
          "Cộng phần inch còn lại: $60 + 6 = 66$ inch.",
        ],
        answer: "$66$", answerVn: "$66$",
        accept: ["66", "66 inches", "66 in"],
      },
      {
        id: "c5",
        prompt: "A jar holds red and blue marbles in the ratio $3:5$. There are $40$ marbles in total. How many are **red**?",
        promptVn: "Một lọ đựng bi đỏ và bi xanh theo tỉ số $3:5$. Tổng cộng có $40$ viên. Có bao nhiêu viên **đỏ**?",
        solution: [
          "The ratio has $3 + 5 = 8$ parts in total.",
          "Each part is $40 \\div 8 = 5$ marbles.",
          "Red is $3$ parts: $3 \\times 5 = 15$ marbles.",
        ],
        solutionVn: [
          "Tỉ số có $3 + 5 = 8$ phần tổng cộng.",
          "Mỗi phần là $40 \\div 8 = 5$ viên.",
          "Đỏ là $3$ phần: $3 \\times 5 = 15$ viên.",
        ],
        answer: "$15$", answerVn: "$15$",
        accept: ["15", "15 marbles"],
      },
      {
        id: "c6",
        prompt: "In a survey, $12$ out of $40$ people chose tea. What **percent** chose tea?",
        promptVn: "Trong một khảo sát, $12$ trên $40$ người chọn trà. Bao nhiêu **phần trăm** chọn trà?",
        solution: [
          "'Out of' means the ratio is $\\dfrac{12}{40}$.",
          "Make it out of $100$: $\\dfrac{12}{40} = \\dfrac{x}{100}$, so $40x = 1200$ and $x = 30$.",
          "So $30\\%$ chose tea. (Check: $12 \\div 40 = 0.3 = 30\\%$.)",
        ],
        solutionVn: [
          "'Trên' nghĩa là tỉ số là $\\dfrac{12}{40}$.",
          "Đưa về trên $100$: $\\dfrac{12}{40} = \\dfrac{x}{100}$, nên $40x = 1200$ và $x = 30$.",
          "Vậy $30\\%$ chọn trà. (Kiểm tra: $12 \\div 40 = 0{,}3 = 30\\%$.)",
        ],
        answer: "$30\\%$", answerVn: "$30\\%$",
        accept: ["30", "30%"],
      },
    ],
  },
];
