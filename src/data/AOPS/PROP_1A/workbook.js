// src/data/AOPS/PROP_1A/workbook.js
// Reveal-solution practice for Direct Proportion — the whole Drill (40 XP).
// See docs/workbook-tasks.md. Focus builds the two rules, Practice applies them
// to the classic word problems, Challenge is the multi-step work (the river, the
// wind, the average-speed trap). Every answer is a number or a short value, never
// prose. Money is written as "dollars": a bare dollar sign opens a KaTeX span.

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "$y$ is directly proportional to $x$, and $y = 15$ when $x = 3$. Find the constant $k$.",
        promptVn: "$y$ tỉ lệ thuận với $x$, và $y = 15$ khi $x = 3$. Tìm hằng số $k$.",
        solution: [
          "For direct proportion, $k = \\dfrac{y}{x}$ — the output divided by the input.",
          "$k = \\dfrac{15}{3} = 5$.",
        ],
        solutionVn: [
          "Với tỉ lệ thuận, $k = \\dfrac{y}{x}$ — kết quả chia cho đầu vào.",
          "$k = \\dfrac{15}{3} = 5$.",
        ],
        answer: "$5$", answerVn: "$5$",
        accept: ["5", "k=5", "k = 5"],
      },
      {
        id: "f2",
        prompt: "Using the same rule ($k = 5$), find $y$ when $x = 7$.",
        promptVn: "Dùng cùng quy tắc đó ($k = 5$), tìm $y$ khi $x = 7$.",
        solution: [
          "The rule is $y = kx$, and here $k = 5$, so $y = 5x$.",
          "$y = 5 \\times 7 = 35$.",
        ],
        solutionVn: [
          "Quy tắc là $y = kx$, ở đây $k = 5$, nên $y = 5x$.",
          "$y = 5 \\times 7 = 35$.",
        ],
        answer: "$35$", answerVn: "$35$",
        accept: ["35"],
      },
      {
        id: "f3",
        prompt: "Five kilograms of rice cost **40 dollars**. What does **one** kilogram cost, in dollars?",
        promptVn: "Năm ki-lô-gam gạo giá **40 đô la**. **Một** ki-lô-gam giá bao nhiêu đô la?",
        solution: [
          "Cost and weight are in direct proportion, so find the constant: cost per kilogram.",
          "$k = \\dfrac{40}{5} = 8$, so one kilogram costs 8 dollars.",
        ],
        solutionVn: [
          "Giá tiền và khối lượng tỉ lệ thuận, nên hãy tìm hằng số: giá mỗi ki-lô-gam.",
          "$k = \\dfrac{40}{5} = 8$, nên một ki-lô-gam giá 8 đô la.",
        ],
        answer: "$8$", answerVn: "$8$",
        accept: ["8", "8 dollars"],
      },
      {
        id: "f4",
        prompt: "$y$ is directly proportional to $x$, and $y = 9$ when $x = 5$. Find $y$ when $x = 15$.",
        promptVn: "$y$ tỉ lệ thuận với $x$, và $y = 9$ khi $x = 5$. Tìm $y$ khi $x = 15$.",
        solution: [
          "Method 1 — find $k$: $k = \\dfrac{9}{5}$, so $y = \\dfrac{9}{5} \\times 15 = 27$.",
          "Method 2 — compare: $x$ went from $5$ to $15$, which is $\\times 3$. So $y$ is also $\\times 3$: $9 \\times 3 = 27$.",
        ],
        solutionVn: [
          "Cách 1 — tìm $k$: $k = \\dfrac{9}{5}$, nên $y = \\dfrac{9}{5} \\times 15 = 27$.",
          "Cách 2 — so sánh: $x$ đi từ $5$ lên $15$, tức là $\\times 3$. Vậy $y$ cũng $\\times 3$: $9 \\times 3 = 27$.",
        ],
        answer: "$27$", answerVn: "$27$",
        accept: ["27"],
      },
      {
        id: "f5",
        prompt: "$p$ and $q$ are **inversely** proportional, and $p = 6$ when $q = 4$. Find the constant.",
        promptVn: "$p$ và $q$ tỉ lệ **nghịch**, và $p = 6$ khi $q = 4$. Tìm hằng số.",
        solution: [
          "For inverse proportion the **product** is constant: $pq = k$.",
          "$k = 6 \\times 4 = 24$.",
        ],
        solutionVn: [
          "Với tỉ lệ nghịch thì **tích** không đổi: $pq = k$.",
          "$k = 6 \\times 4 = 24$.",
        ],
        answer: "$24$", answerVn: "$24$",
        accept: ["24", "k=24", "k = 24"],
      },
      {
        id: "f6",
        prompt: "Same pair as above ($pq = 24$). Find $p$ when $q = 8$.",
        promptVn: "Vẫn cặp đó ($pq = 24$). Tìm $p$ khi $q = 8$.",
        solution: [
          "The product must stay at $24$, so $8p = 24$.",
          "$p = \\dfrac{24}{8} = 3$. Note that $q$ doubled from $4$ to $8$, so $p$ halved from $6$ to $3$.",
        ],
        solutionVn: [
          "Tích phải giữ nguyên bằng $24$, nên $8p = 24$.",
          "$p = \\dfrac{24}{8} = 3$. Lưu ý $q$ tăng gấp đôi từ $4$ lên $8$, nên $p$ giảm một nửa từ $6$ xuống $3$.",
        ],
        answer: "$3$", answerVn: "$3$",
        accept: ["3"],
      },
    ],
  },

  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "Mary is **5 feet** tall and her shadow is **12 feet** long. The flagpole beside her casts a shadow **42 feet** long. How tall is the flagpole, in feet?",
        promptVn: "Mary cao **5 foot** và bóng của cô ấy dài **12 foot**. Cột cờ bên cạnh có bóng dài **42 foot**. Cột cờ cao bao nhiêu foot?",
        solution: [
          "At the same moment, height and shadow length are in direct proportion.",
          "From Mary: $k = \\dfrac{\\text{height}}{\\text{shadow}} = \\dfrac{5}{12}$.",
          "For the flagpole: $\\text{height} = \\dfrac{5}{12} \\times 42 = \\dfrac{210}{12} = 17.5$ feet.",
        ],
        solutionVn: [
          "Cùng một thời điểm, chiều cao và độ dài bóng tỉ lệ thuận với nhau.",
          "Từ Mary: $k = \\dfrac{\\text{chiều cao}}{\\text{bóng}} = \\dfrac{5}{12}$.",
          "Với cột cờ: $\\text{chiều cao} = \\dfrac{5}{12} \\times 42 = \\dfrac{210}{12} = 17{,}5$ foot.",
        ],
        answer: "$17.5$ feet", answerVn: "$17{,}5$ foot",
        accept: ["17.5", "17,5", "35/2"],
      },
      {
        id: "p2",
        prompt: "A medicine is given in proportion to body weight. A **140 pound** patient receives **70 ml**. How many millilitres should a **120 pound** patient receive?",
        promptVn: "Một loại thuốc được cho theo tỉ lệ với cân nặng. Bệnh nhân **140 pound** nhận **70 ml**. Bệnh nhân **120 pound** nên nhận bao nhiêu mi-li-lít?",
        solution: [
          "Dose and weight are directly proportional, so find the dose per pound.",
          "$k = \\dfrac{70}{140} = 0.5$ ml per pound.",
          "$0.5 \\times 120 = 60$ ml.",
        ],
        solutionVn: [
          "Liều lượng và cân nặng tỉ lệ thuận, nên hãy tìm liều cho mỗi pound.",
          "$k = \\dfrac{70}{140} = 0{,}5$ ml mỗi pound.",
          "$0{,}5 \\times 120 = 60$ ml.",
        ],
        answer: "$60$ ml", answerVn: "$60$ ml",
        accept: ["60", "60 ml"],
      },
      {
        id: "p3",
        prompt: "A recipe makes **30 cookies** using **2.5 cups** of flour. How many cups are needed for **180 cookies**?",
        promptVn: "Một công thức làm được **30 cái bánh quy** với **2,5 cốc** bột. Cần bao nhiêu cốc bột cho **180 cái bánh**?",
        solution: [
          "Cookies and flour are in direct proportion.",
          "Compare directly: $180 \\div 30 = 6$, so the recipe is multiplied by $6$.",
          "Flour needed: $2.5 \\times 6 = 15$ cups.",
        ],
        solutionVn: [
          "Số bánh và lượng bột tỉ lệ thuận với nhau.",
          "So sánh trực tiếp: $180 \\div 30 = 6$, nên công thức được nhân lên $6$ lần.",
          "Lượng bột cần: $2{,}5 \\times 6 = 15$ cốc.",
        ],
        answer: "$15$ cups", answerVn: "$15$ cốc",
        accept: ["15", "15 cups"],
      },
      {
        id: "p4",
        prompt: "$a$ is directly proportional to $b^2$, and $a = 8$ when $b = 2$. Find $a$ when $b = 5$.",
        promptVn: "$a$ tỉ lệ thuận với $b^2$, và $a = 8$ khi $b = 2$. Tìm $a$ khi $b = 5$.",
        solution: [
          "The rule carries the square: $a = kb^2$, so $k = \\dfrac{a}{b^2}$.",
          "$k = \\dfrac{8}{2^2} = \\dfrac{8}{4} = 2$, so $a = 2b^2$.",
          "$a = 2 \\times 5^2 = 2 \\times 25 = 50$.",
        ],
        solutionVn: [
          "Quy tắc mang theo bình phương: $a = kb^2$, nên $k = \\dfrac{a}{b^2}$.",
          "$k = \\dfrac{8}{2^2} = \\dfrac{8}{4} = 2$, nên $a = 2b^2$.",
          "$a = 2 \\times 5^2 = 2 \\times 25 = 50$.",
        ],
        answer: "$50$", answerVn: "$50$",
        accept: ["50"],
      },
      {
        id: "p5",
        prompt: "Five people can mow a lawn in **12 hours**. How many people are needed to mow it in just **3 hours**, if everyone works at the same rate?",
        promptVn: "Năm người cắt cỏ một bãi cỏ trong **12 giờ**. Cần bao nhiêu người để cắt xong chỉ trong **3 giờ**, nếu mọi người làm cùng tốc độ?",
        solution: [
          "People and time are **inversely** proportional — the work is what stays fixed.",
          "The constant is $5 \\times 12 = 60$ person-hours.",
          "For 3 hours: $\\text{people} = \\dfrac{60}{3} = 20$ people. (That is 15 **more** than the original five.)",
        ],
        solutionVn: [
          "Số người và thời gian tỉ lệ **nghịch** — khối lượng công việc mới là thứ cố định.",
          "Hằng số là $5 \\times 12 = 60$ giờ-người.",
          "Với 3 giờ: $\\text{số người} = \\dfrac{60}{3} = 20$ người. (Tức là **thêm** 15 người so với năm người ban đầu.)",
        ],
        answer: "$20$ people", answerVn: "$20$ người",
        accept: ["20", "20 people"],
      },
      {
        id: "p6",
        prompt: "On a map, **4 inches** represents **26 miles**. How many miles does **11 inches** represent?",
        promptVn: "Trên một bản đồ, **4 inch** biểu diễn **26 dặm**. Vậy **11 inch** biểu diễn bao nhiêu dặm?",
        solution: [
          "Map distance and real distance are in direct proportion.",
          "$k = \\dfrac{26}{4} = 6.5$ miles per inch.",
          "$6.5 \\times 11 = 71.5$ miles.",
        ],
        solutionVn: [
          "Khoảng cách trên bản đồ và khoảng cách thật tỉ lệ thuận.",
          "$k = \\dfrac{26}{4} = 6{,}5$ dặm mỗi inch.",
          "$6{,}5 \\times 11 = 71{,}5$ dặm.",
        ],
        answer: "$71.5$ miles", answerVn: "$71{,}5$ dặm",
        accept: ["71.5", "71,5", "143/2"],
      },
    ],
  },

  {
    tier: "Challenge",
    tierVn: "Thử thách",
    questions: [
      {
        id: "c1",
        prompt: "A kayak travels **9 km/h downstream** and **3 km/h upstream** on a river. It sets off downstream at 1 p.m. and must be back at the start by 5 p.m. **How many hours** should it travel downstream before turning around?",
        promptVn: "Một chiếc kayak đi **9 km/h xuôi dòng** và **3 km/h ngược dòng** trên một dòng sông. Nó xuất phát xuôi dòng lúc 1 giờ chiều và phải quay về điểm xuất phát trước 5 giờ chiều. Nó nên đi xuôi dòng **bao nhiêu giờ** trước khi quay lại?",
        solution: [
          "Let $d$ = hours downstream and $u$ = hours upstream. Two facts give two equations.",
          "**Time:** 1 p.m. to 5 p.m. is 4 hours, so $d + u = 4$.",
          "**Distance:** the same distance is covered each way, so $9d = 3u$.",
          "Substitute $u = 4 - d$: $9d = 3(4 - d) = 12 - 3d$, so $12d = 12$ and $d = 1$.",
          "It travels downstream for **1 hour**, turning around at 2 p.m. (Check: $9 \\times 1 = 9$ km out; $3$ hours back at $3$ km/h $= 9$ km ✓)",
        ],
        solutionVn: [
          "Gọi $d$ = số giờ xuôi dòng và $u$ = số giờ ngược dòng. Hai dữ kiện cho hai phương trình.",
          "**Thời gian:** từ 1 giờ chiều đến 5 giờ chiều là 4 giờ, nên $d + u = 4$.",
          "**Quãng đường:** hai chiều đi cùng một quãng đường, nên $9d = 3u$.",
          "Thế $u = 4 - d$: $9d = 3(4 - d) = 12 - 3d$, nên $12d = 12$ và $d = 1$.",
          "Nó đi xuôi dòng **1 giờ**, quay lại lúc 2 giờ chiều. (Kiểm tra: $9 \\times 1 = 9$ km đi; $3$ giờ về với $3$ km/h $= 9$ km ✓)",
        ],
        answer: "$1$ hour", answerVn: "$1$ giờ",
        accept: ["1", "1 hour", "one hour"],
      },
      {
        id: "c2",
        prompt: "A plane flies **2000 miles** between two cities. With the wind behind it the trip takes **5 hours**; flying back into the same wind it takes **8 hours**. What is the **speed of the wind**, in mph?",
        promptVn: "Một máy bay bay **2000 dặm** giữa hai thành phố. Khi có gió đẩy phía sau, chuyến bay mất **5 giờ**; bay ngược lại chính cơn gió đó thì mất **8 giờ**. **Vận tốc của gió** là bao nhiêu mph?",
        solution: [
          "This is the river problem with air instead of water. Speed $=$ distance $\\div$ time.",
          "With the wind: $\\dfrac{2000}{5} = 400$ mph. Against the wind: $\\dfrac{2000}{8} = 250$ mph.",
          "Let $p$ be the plane's own speed and $w$ the wind. Then $p + w = 400$ and $p - w = 250$.",
          "Subtracting: $2w = 150$, so $w = 75$ mph. (And the plane's own speed is $325$ mph.)",
        ],
        solutionVn: [
          "Đây chính là bài toán dòng sông, chỉ thay nước bằng không khí. Vận tốc $=$ quãng đường $\\div$ thời gian.",
          "Xuôi gió: $\\dfrac{2000}{5} = 400$ mph. Ngược gió: $\\dfrac{2000}{8} = 250$ mph.",
          "Gọi $p$ là vận tốc riêng của máy bay và $w$ là vận tốc gió. Khi đó $p + w = 400$ và $p - w = 250$.",
          "Trừ hai vế: $2w = 150$, nên $w = 75$ mph. (Và vận tốc riêng của máy bay là $325$ mph.)",
        ],
        answer: "$75$ mph", answerVn: "$75$ mph",
        accept: ["75", "75 mph"],
      },
      {
        id: "c3",
        prompt: "Jack drives to work at **30 mph** and straight back home at **45 mph**. What is his **average speed** for the whole round trip, in mph?",
        promptVn: "Jack lái xe đi làm với **30 mph** và lái thẳng về nhà với **45 mph**. **Vận tốc trung bình** cho cả chuyến đi và về là bao nhiêu mph?",
        solution: [
          "The tempting answer, $\\dfrac{30 + 45}{2} = 37.5$, is **wrong**. That would only be right if he spent equal *time* at each speed — but he covers equal *distance*.",
          "Let the distance each way be $x$ miles. Time out $= \\dfrac{x}{30}$, time back $= \\dfrac{x}{45}$.",
          "Total time $= \\dfrac{x}{30} + \\dfrac{x}{45} = \\dfrac{3x}{90} + \\dfrac{2x}{90} = \\dfrac{5x}{90}$.",
          "Average speed $= \\dfrac{\\text{total distance}}{\\text{total time}} = \\dfrac{2x}{5x/90} = \\dfrac{180x}{5x} = 36$ mph.",
          "It lands closer to the slower speed, because he spends more time going slowly.",
        ],
        solutionVn: [
          "Đáp án dễ bị mắc bẫy, $\\dfrac{30 + 45}{2} = 37{,}5$, là **sai**. Nó chỉ đúng nếu anh ấy đi cùng một *thời gian* ở mỗi vận tốc — nhưng anh ấy đi cùng một *quãng đường*.",
          "Gọi quãng đường mỗi chiều là $x$ dặm. Thời gian đi $= \\dfrac{x}{30}$, thời gian về $= \\dfrac{x}{45}$.",
          "Tổng thời gian $= \\dfrac{x}{30} + \\dfrac{x}{45} = \\dfrac{3x}{90} + \\dfrac{2x}{90} = \\dfrac{5x}{90}$.",
          "Vận tốc trung bình $= \\dfrac{\\text{tổng quãng đường}}{\\text{tổng thời gian}} = \\dfrac{2x}{5x/90} = \\dfrac{180x}{5x} = 36$ mph.",
          "Kết quả gần với vận tốc chậm hơn, vì anh ấy dành nhiều thời gian hơn cho chặng đi chậm.",
        ],
        answer: "$36$ mph", answerVn: "$36$ mph",
        accept: ["36", "36 mph"],
      },
      {
        id: "c4",
        prompt: "The gravitational force between two bodies is directly proportional to **each** mass, and inversely proportional to the **square** of the distance between them. If the distance is **tripled** and each mass is **doubled**, the force is multiplied by what fraction?",
        promptVn: "Lực hấp dẫn giữa hai vật tỉ lệ thuận với **từng** khối lượng, và tỉ lệ nghịch với **bình phương** khoảng cách giữa chúng. Nếu khoảng cách **nhân ba** và mỗi khối lượng **nhân đôi** thì lực được nhân với phân số nào?",
        solution: [
          "Write the relationship with one constant: $F = \\dfrac{k m_1 m_2}{r^2}$.",
          "Doubling **each** mass multiplies the top by $2 \\times 2 = 4$.",
          "Tripling the distance multiplies the bottom by $3^2 = 9$.",
          "So the force is multiplied by $\\dfrac{4}{9}$ — it gets weaker, because the distance effect wins.",
        ],
        solutionVn: [
          "Viết quan hệ đó với một hằng số: $F = \\dfrac{k m_1 m_2}{r^2}$.",
          "Nhân đôi **từng** khối lượng làm tử số nhân lên $2 \\times 2 = 4$.",
          "Nhân ba khoảng cách làm mẫu số nhân lên $3^2 = 9$.",
          "Vậy lực được nhân với $\\dfrac{4}{9}$ — lực yếu đi, vì ảnh hưởng của khoảng cách thắng thế.",
        ],
        answer: "$\\dfrac{4}{9}$", answerVn: "$\\dfrac{4}{9}$",
        accept: ["4/9", "0.444", "4 / 9"],
      },
    ],
  },
];
