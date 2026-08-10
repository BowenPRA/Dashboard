// src/data/AOPS/PROP_1A/notes.js
// PROP_1A — Direct Proportion. Flexible layouts (docs/math-lessons.md): hero
// opener, the everyday word before the symbol, the rule as a statement, the
// table that shows growth, the graph that shows the origin, negative k, powers
// of x, inverse proportion, then two applied problems — the lawn and the river —
// each broken into steps, then a checklist recap and a hero closer.
//
// House notes:
//  - Money is written as "dollars", never with a dollar sign: a bare $ starts a
//    KaTeX span and swallows the rest of the line.
//  - Layout `title` and hero `objective` are plain text (not parsed), so no
//    markdown or math goes in them.
//  - Icon names must exist in the layouts' ICONS map (primitives.jsx).
import { DIAGRAMS } from './diagrams.js';

export const notes = [
  {
    layout: "hero",
    color: "#a21caf",
    icon: "Scale",
    brand: "Problem Solving",
    brandVn: "Giải Toán",
    eyebrow: "Proportion",
    eyebrowVn: "Tỉ lệ",
    title: "Direct Proportion",
    titleVn: "Tỉ lệ thuận",
    objective: "I can tell when two quantities are in proportion, find the constant k, and use y = kx to answer a question.",
    objectiveVn: "Em có thể nhận ra khi nào hai đại lượng tỉ lệ thuận, tìm hằng số k, và dùng y = kx để trả lời một câu hỏi.",
    card: {
      icon: "Pencil",
      badge: "Warm-Up · Do this now in your book",
      badgeVn: "Khởi động · Làm ngay vào vở",
      text: "Three notebooks cost **12 dollars**. Write down what **one** notebook costs. Then what do **seven** cost?",
      textVn: "Ba quyển vở giá **12 đô la**. Viết ra giá của **một** quyển vở. Rồi **bảy** quyển giá bao nhiêu?",
    },
  },

  {
    layout: "compare",
    icon: "MessageSquare",
    accent: "#0087a8",
    title: "What Does Proportion Mean?",
    titleVn: "Tỉ Lệ Nghĩa Là Gì?",
    columns: [
      {
        heading: "In everyday English",
        headingVn: "Trong tiếng Anh hằng ngày",
        accent: "#0087a8",
        icon: "Quote",
        content: "You already use this word. It describes **the size of one thing compared with another**.\n\nA tiny head on a huge body looks **out of proportion**. A recipe for four people, cooked for eight, keeps the same proportions — you just double everything.",
        contentVn: "Em đã dùng từ này rồi. Nó mô tả **kích thước của vật này so với vật kia**.\n\nMột cái đầu bé xíu trên một thân hình khổng lồ trông **mất cân đối**. Một công thức nấu cho bốn người, nấu cho tám người, vẫn giữ nguyên tỉ lệ — em chỉ cần nhân đôi mọi thứ.",
        notes: [
          { tone: "info", text: "\"In proportion\" means the two sizes **match** each other.", textVn: "\"Đúng tỉ lệ\" nghĩa là hai kích thước **tương xứng** với nhau." },
        ],
      },
      {
        heading: "In mathematics",
        headingVn: "Trong toán học",
        accent: "#5c2483",
        icon: "Calculator",
        content: "Two quantities are **in direct proportion** when one is always the same number of times the other.\n\nDouble one and the other doubles. Halve one and the other halves.",
        contentVn: "Hai đại lượng **tỉ lệ thuận** với nhau khi đại lượng này luôn gấp đại lượng kia cùng một số lần.\n\nGấp đôi cái này thì cái kia cũng gấp đôi. Giảm một nửa cái này thì cái kia cũng giảm một nửa.",
        notes: [
          { tone: "plant", text: "That fixed number has a name: the **constant of proportionality**, written $k$.", textVn: "Con số cố định đó có tên gọi: **hằng số tỉ lệ**, viết là $k$." },
        ],
      },
    ],
  },

  {
    layout: "statement",
    accent: "#c8102e",
    icon: "Equal",
    eyebrow: "The rule",
    eyebrowVn: "Quy tắc",
    title: "The Rule for Direct Proportion",
    titleVn: "Quy Tắc của Tỉ Lệ Thuận",
    label: "Write this down",
    labelVn: "Chép vào vở",
    labelIcon: "Pencil",
    text: "$y = kx$",
    textVn: "$y = kx$",
    sub: "which is the same as $k = \\dfrac{y}{x}$",
    subVn: "cũng chính là $k = \\dfrac{y}{x}$",
    notes: [
      {
        tone: "write",
        text: "**$y$ is directly proportional to $x$** means $\\dfrac{y}{x}$ is **always the same number**, whichever pair you pick.",
        textVn: "**$y$ tỉ lệ thuận với $x$** nghĩa là $\\dfrac{y}{x}$ **luôn bằng cùng một số**, dù em chọn cặp giá trị nào.",
      },
      {
        tone: "homework",
        text: "$k$ is $y$ divided by $x$ — the **output over the input**. Write $\\dfrac{x}{y}$ by mistake and the rule flips upside down: every answer comes out as the reciprocal of the right one.",
        textVn: "$k$ là $y$ chia $x$ — **kết quả trên đầu vào**. Nếu viết nhầm thành $\\dfrac{x}{y}$ thì quy tắc bị lộn ngược: mọi đáp án sẽ ra nghịch đảo của đáp án đúng.",
      },
    ],
    reveal: {
      label: "Try it: three notebooks cost 12 dollars. What is k?",
      labelVn: "Thử xem: ba quyển vở giá 12 đô la. $k$ bằng bao nhiêu?",
      answer: "$k = \\dfrac{y}{x} = \\dfrac{12}{3} = 4$, so one notebook costs **4 dollars** and the rule is $y = 4x$.\n\nSeven notebooks: $y = 4 \\times 7 = 28$ dollars.\n> Find $k$ first, then use $y = kx$ to answer anything the question asks.",
      answerVn: "$k = \\dfrac{y}{x} = \\dfrac{12}{3} = 4$, nên một quyển vở giá **4 đô la** và quy tắc là $y = 4x$.\n\nBảy quyển vở: $y = 4 \\times 7 = 28$ đô la.\n> Tìm $k$ trước, rồi dùng $y = kx$ để trả lời bất cứ câu hỏi nào.",
    },
    check: {
      id: "chk_find_k",
      q: "$y$ is directly proportional to $x$, and $y = 20$ when $x = 4$. What is $k$?",
      qVn: "$y$ tỉ lệ thuận với $x$, và $y = 20$ khi $x = 4$. $k$ bằng bao nhiêu?",
      options: [
        { val: "A", text: "$k = 5$", textVn: "$k = 5$" },
        { val: "B", text: "$k = 80$", textVn: "$k = 80$" },
        { val: "C", text: "$k = \\dfrac{1}{5}$", textVn: "$k = \\dfrac{1}{5}$" },
      ],
      correct: "A",
      expEn: "$k = \\dfrac{y}{x} = \\dfrac{20}{4} = 5$. Check it against the rule: $y = 5x$ gives $5 \\times 4 = 20$. Option C is what you get if you divide the wrong way round.",
      expVn: "$k = \\dfrac{y}{x} = \\dfrac{20}{4} = 5$. Kiểm tra lại bằng quy tắc: $y = 5x$ cho $5 \\times 4 = 20$. Đáp án C là kết quả khi em chia ngược.",
    },
  },

  {
    layout: "split",
    icon: "ArrowRight",
    accent: "#4a8b23",
    title: "They Grow Together",
    titleVn: "Chúng Cùng Tăng",
    inlineSvg: DIAGRAMS.PROPORTION_TABLE,
    drawThis: true,
    ratio: 45,
    content: "Petrol costs 3 dollars a litre, so $y = 3x$.\n\nRead down the table. Every time the litres **double**, the cost **doubles** too. Multiply $x$ by any number at all and $y$ is multiplied by that same number.\n\n> Direct proportion: multiply one quantity, and the other is multiplied by the same amount.",
    contentVn: "Xăng giá 3 đô la một lít, nên $y = 3x$.\n\nĐọc từ trên xuống trong bảng. Mỗi lần số lít **gấp đôi** thì giá tiền cũng **gấp đôi**. Nhân $x$ với bất kỳ số nào thì $y$ cũng được nhân với đúng số đó.\n\n> Tỉ lệ thuận: nhân một đại lượng lên bao nhiêu lần thì đại lượng kia cũng được nhân lên bấy nhiêu lần.",
    notes: [
      {
        tone: "theory",
        text: "This is why you can sometimes skip $k$ completely. If the litres go $\\times 5$, the cost goes $\\times 5$ — no need to work out the price per litre first.",
        textVn: "Đây là lý do đôi khi em có thể bỏ qua $k$ hoàn toàn. Nếu số lít $\\times 5$ thì giá tiền cũng $\\times 5$ — không cần tính giá một lít trước.",
      },
    ],
  },

  {
    layout: "showcase",
    icon: "Target",
    accent: "#1a5fa8",
    title: "A Line Through the Origin",
    titleVn: "Đường Thẳng Qua Gốc Tọa Độ",
    inlineSvg: DIAGRAMS.GRAPH_ORIGIN,
    caption: "Both are straight lines. Only $y = x$ passes through $(0,0)$, so only $y = x$ is a proportion.",
    captionVn: "Cả hai đều là đường thẳng. Chỉ có $y = x$ đi qua $(0,0)$, nên chỉ $y = x$ là tỉ lệ thuận.",
    check: {
      id: "chk_origin",
      q: "A graph is a straight line that crosses the $y$-axis at $3$. Is $y$ directly proportional to $x$?",
      qVn: "Một đồ thị là đường thẳng cắt trục $y$ tại $3$. $y$ có tỉ lệ thuận với $x$ không?",
      options: [
        { val: "A", text: "No — a proportion must pass through $(0,0)$", textVn: "Không — tỉ lệ thuận phải đi qua $(0,0)$" },
        { val: "B", text: "Yes — every straight line is a proportion", textVn: "Có — mọi đường thẳng đều là tỉ lệ thuận" },
        { val: "C", text: "Yes, but only if $k$ is positive", textVn: "Có, nhưng chỉ khi $k$ dương" },
      ],
      correct: "A",
      expEn: "Direct proportion means $y = kx$. Put $x = 0$ into that and you always get $y = 0$, so the line has to go through the origin. A line sitting at $3$ when $x = 0$ fails that test.",
      expVn: "Tỉ lệ thuận nghĩa là $y = kx$. Thay $x = 0$ vào thì luôn được $y = 0$, nên đường thẳng bắt buộc phải đi qua gốc tọa độ. Đường thẳng ở vị trí $3$ khi $x = 0$ không đạt điều kiện đó.",
    },
  },

  {
    layout: "compare",
    icon: "Scale",
    accent: "#c25e12",
    title: "When k Is Negative",
    titleVn: "Khi k Là Số Âm",
    columns: [
      {
        heading: "Positive k — up together",
        headingVn: "k dương — cùng đi lên",
        accent: "#4a8b23",
        icon: "ArrowRight",
        inlineSvg: DIAGRAMS.GRAPH_POSITIVE_K,
        content: "$y = 2x$. As $x$ grows, $y$ grows. The line climbs.",
        contentVn: "$y = 2x$. Khi $x$ tăng thì $y$ tăng. Đường thẳng đi lên.",
        caption: "More hours worked, more pay.",
        captionVn: "Làm càng nhiều giờ, lương càng cao.",
      },
      {
        heading: "Negative k — one up, one down",
        headingVn: "k âm — một lên, một xuống",
        accent: "#c8102e",
        icon: "Repeat",
        inlineSvg: DIAGRAMS.GRAPH_NEGATIVE_K,
        content: "$y = -2x$. As $x$ grows, $y$ **falls**. The line drops.",
        contentVn: "$y = -2x$. Khi $x$ tăng thì $y$ **giảm**. Đường thẳng đi xuống.",
        notes: [
          {
            tone: "plant",
            text: "People often call this **negatively proportional**. It is still direct proportion — $k$ is simply a negative number, and $\\dfrac{y}{x} = -2$ every time.",
            textVn: "Người ta thường gọi đây là **tỉ lệ âm**. Nó vẫn là tỉ lệ thuận — chỉ là $k$ mang dấu âm, và $\\dfrac{y}{x} = -2$ trong mọi trường hợp.",
          },
        ],
      },
    ],
  },

  {
    layout: "steps",
    icon: "Layers",
    accent: "#5c2483",
    title: "Proportional to the Square",
    titleVn: "Tỉ Lệ với Bình Phương",
    inlineSvg: DIAGRAMS.SQUARE_TABLE,
    content: "Proportion does not have to be to $x$ itself. It can be to **any** power of $x$.\n\nIf $y$ is directly proportional to $x^2$, the rule becomes $y = kx^2$, and the constant is $k = \\dfrac{y}{x^2}$.",
    contentVn: "Tỉ lệ không nhất thiết phải với chính $x$. Nó có thể với **bất kỳ** lũy thừa nào của $x$.\n\nNếu $y$ tỉ lệ thuận với $x^2$ thì quy tắc trở thành $y = kx^2$, và hằng số là $k = \\dfrac{y}{x^2}$.",
    steps: [
      { text: "Write the rule with the square already in it: $y = kx^2$.", textVn: "Viết quy tắc với bình phương sẵn trong đó: $y = kx^2$." },
      { text: "Put in the pair of values you were given, and solve for $k$.", textVn: "Thay cặp giá trị đã cho vào, rồi giải để tìm $k$." },
      { text: "Rewrite the rule with your $k$, then answer the question that was asked.", textVn: "Viết lại quy tắc với $k$ vừa tìm được, rồi trả lời câu hỏi được đặt ra." },
    ],
    reveal: {
      label: "Your turn: y = 18 when x = 3. Find y when x = 5.",
      labelVn: "Đến lượt em: $y = 18$ khi $x = 3$. Tìm $y$ khi $x = 5$.",
      answer: "$k = \\dfrac{y}{x^2} = \\dfrac{18}{9} = 2$, so the rule is $y = 2x^2$.\n\nThen $y = 2 \\times 5^2 = 2 \\times 25 = \\mathbf{50}$.\n> Double $x$ and $y$ becomes **four** times bigger, because $2^2 = 4$.",
      answerVn: "$k = \\dfrac{y}{x^2} = \\dfrac{18}{9} = 2$, nên quy tắc là $y = 2x^2$.\n\nSau đó $y = 2 \\times 5^2 = 2 \\times 25 = \\mathbf{50}$.\n> Gấp đôi $x$ thì $y$ tăng **bốn** lần, vì $2^2 = 4$.",
    },
    check: {
      id: "chk_square",
      q: "$y$ is proportional to $x^2$. If $x$ is **tripled**, what happens to $y$?",
      qVn: "$y$ tỉ lệ với $x^2$. Nếu $x$ được **nhân ba** thì $y$ thay đổi thế nào?",
      options: [
        { val: "A", text: "$y$ is multiplied by $9$", textVn: "$y$ được nhân với $9$" },
        { val: "B", text: "$y$ is multiplied by $3$", textVn: "$y$ được nhân với $3$" },
        { val: "C", text: "$y$ is multiplied by $6$", textVn: "$y$ được nhân với $6$" },
      ],
      correct: "A",
      expEn: "Replace $x$ with $3x$ in $y = kx^2$: you get $k(3x)^2 = k \\times 9x^2 = 9kx^2$. The factor gets squared as well, so $y$ becomes $9$ times bigger.",
      expVn: "Thay $x$ bằng $3x$ trong $y = kx^2$: ta được $k(3x)^2 = k \\times 9x^2 = 9kx^2$. Hệ số cũng bị bình phương, nên $y$ tăng $9$ lần.",
    },
  },

  {
    layout: "compare",
    icon: "Scale",
    accent: "#0087a8",
    title: "Direct or Inverse?",
    titleVn: "Tỉ Lệ Thuận hay Tỉ Lệ Nghịch?",
    columns: [
      {
        heading: "Direct — a constant quotient",
        headingVn: "Tỉ lệ thuận — thương không đổi",
        accent: "#4a8b23",
        icon: "ArrowRight",
        content: "$$\\dfrac{y}{x} = k \\quad\\text{so}\\quad y = kx$$\n\nOne goes up, the other goes up.",
        contentVn: "$$\\dfrac{y}{x} = k \\quad\\text{nên}\\quad y = kx$$\n\nCái này tăng thì cái kia cũng tăng.",
        notes: [
          { tone: "info", text: "**Divide** to test it. Same answer every time? Direct.", textVn: "**Chia** để kiểm tra. Lúc nào cũng ra cùng một kết quả? Tỉ lệ thuận." },
        ],
      },
      {
        heading: "Inverse — a constant product",
        headingVn: "Tỉ lệ nghịch — tích không đổi",
        accent: "#c8102e",
        icon: "Repeat",
        content: "$$xy = k \\quad\\text{so}\\quad y = \\dfrac{k}{x}$$\n\nOne goes up, the other goes **down** — and the graph is a curve, not a line.",
        contentVn: "$$xy = k \\quad\\text{nên}\\quad y = \\dfrac{k}{x}$$\n\nCái này tăng thì cái kia **giảm** — và đồ thị là đường cong, không phải đường thẳng.",
        notes: [
          { tone: "info", text: "**Multiply** to test it. Same answer every time? Inverse.", textVn: "**Nhân** để kiểm tra. Lúc nào cũng ra cùng một kết quả? Tỉ lệ nghịch." },
        ],
      },
    ],
    check: {
      id: "chk_inverse",
      q: "$p$ and $q$ are inversely proportional, and $p = 7$ when $q = 24$. Find $p$ when $q = 12$.",
      qVn: "$p$ và $q$ tỉ lệ nghịch, và $p = 7$ khi $q = 24$. Tìm $p$ khi $q = 12$.",
      options: [
        { val: "A", text: "$p = 14$", textVn: "$p = 14$" },
        { val: "B", text: "$p = 3.5$", textVn: "$p = 3{,}5$" },
        { val: "C", text: "$p = 168$", textVn: "$p = 168$" },
      ],
      correct: "A",
      expEn: "Inverse means the **product** stays the same: $pq = 7 \\times 24 = 168$. When $q = 12$ we need $12p = 168$, so $p = 14$. Halving $q$ doubled $p$ — that is inverse proportion working.",
      expVn: "Tỉ lệ nghịch nghĩa là **tích** không đổi: $pq = 7 \\times 24 = 168$. Khi $q = 12$ ta cần $12p = 168$, nên $p = 14$. Giảm $q$ một nửa thì $p$ gấp đôi — đúng là tỉ lệ nghịch.",
    },
  },

  {
    layout: "steps",
    icon: "Users",
    accent: "#c25e12",
    title: "The Lawn-Mowing Problem",
    titleVn: "Bài Toán Cắt Cỏ",
    inlineSvg: DIAGRAMS.INVERSE_TABLE,
    content: "**It takes 4 people 6 hours to mow a lawn. How long would 8 people take?**\n\nMore people means less time, so this is **inverse** proportion. The thing that never changes is the **total amount of work** — the lawn is the same lawn.",
    contentVn: "**4 người cắt cỏ một bãi cỏ mất 6 giờ. Vậy 8 người sẽ mất bao lâu?**\n\nCàng nhiều người thì càng ít thời gian, nên đây là **tỉ lệ nghịch**. Thứ không bao giờ thay đổi là **tổng khối lượng công việc** — bãi cỏ vẫn là bãi cỏ đó.",
    steps: [
      { text: "Find the constant by **multiplying**: $4 \\times 6 = 24$ person-hours of work.", textVn: "Tìm hằng số bằng cách **nhân**: $4 \\times 6 = 24$ giờ-người công việc." },
      { text: "That $24$ never changes, however many people turn up.", textVn: "Con số $24$ đó không bao giờ đổi, dù có bao nhiêu người đến làm." },
      { text: "Divide by the new number of people: $24 \\div 8 = 3$ hours.", textVn: "Chia cho số người mới: $24 \\div 8 = 3$ giờ." },
      { text: "**Sense-check:** twice as many people, half the time. $3$ is half of $6$ ✓", textVn: "**Kiểm tra hợp lý:** gấp đôi số người thì mất một nửa thời gian. $3$ là một nửa của $6$ ✓" },
    ],
    reveal: {
      label: "Why isn't the answer 12 hours?",
      labelVn: "Tại sao đáp án không phải là 12 giờ?",
      answer: "Because doubling the people **halves** the time — it does not double it. In inverse proportion, multiplying one quantity by a number means **dividing** the other by that same number.\n> Work problems: people $\\times$ hours stays constant.",
      answerVn: "Vì gấp đôi số người thì thời gian **giảm một nửa** — chứ không phải gấp đôi. Trong tỉ lệ nghịch, nhân một đại lượng với một số nghĩa là **chia** đại lượng kia cho đúng số đó.\n> Bài toán công việc: số người $\\times$ số giờ luôn không đổi.",
    },
    check: {
      id: "chk_work",
      q: "Twelve people clear a field in 18 hours. How long would nine people take, working at the same rate?",
      qVn: "Mười hai người dọn sạch một cánh đồng trong 18 giờ. Chín người sẽ mất bao lâu, nếu làm cùng tốc độ?",
      options: [
        { val: "A", text: "$24$ hours", textVn: "$24$ giờ" },
        { val: "B", text: "$13.5$ hours", textVn: "$13{,}5$ giờ" },
        { val: "C", text: "$18$ hours", textVn: "$18$ giờ" },
      ],
      correct: "A",
      expEn: "Multiply to find the constant: $12 \\times 18 = 216$ person-hours. Then divide by the new crew: $216 \\div 9 = 24$ hours. Fewer people must take longer, and $24 > 18$ ✓",
      expVn: "Nhân để tìm hằng số: $12 \\times 18 = 216$ giờ-người. Rồi chia cho số người mới: $216 \\div 9 = 24$ giờ. Ít người hơn thì phải lâu hơn, và $24 > 18$ ✓",
    },
  },

  {
    layout: "callout",
    icon: "AlertTriangle",
    accent: "#c8102e",
    eyebrow: "Watch out",
    eyebrowVn: "Cẩn thận",
    title: "Growing Together Is Not Enough",
    titleVn: "Cùng Tăng Là Chưa Đủ",
    content: "A taxi charges **3 dollars just to get in**, then **2 dollars for every kilometre**.\n\nThe further you travel, the more you pay — but this is **not** a proportion. Travel $0$ km and you still owe 3 dollars, so the graph misses the origin.\n\nThe test is never \"do they both grow?\" The test is: **is $\\dfrac{y}{x}$ always the same number?**",
    contentVn: "Một chiếc taxi tính **3 đô la chỉ để lên xe**, rồi **2 đô la cho mỗi ki-lô-mét**.\n\nĐi càng xa thì trả càng nhiều — nhưng đây **không** phải tỉ lệ thuận. Đi $0$ km em vẫn phải trả 3 đô la, nên đồ thị không đi qua gốc tọa độ.\n\nCách kiểm tra không bao giờ là \"cả hai có cùng tăng không?\" Cách kiểm tra là: **$\\dfrac{y}{x}$ có luôn bằng cùng một số không?**",
    notes: [
      {
        tone: "task",
        text: "Check it yourself: $1$ km costs 5 dollars, and $\\dfrac{5}{1} = 5$. But $2$ km costs 7 dollars, and $\\dfrac{7}{2} = 3.5$. Not the same — so not a proportion.",
        textVn: "Tự kiểm tra: $1$ km giá 5 đô la, và $\\dfrac{5}{1} = 5$. Nhưng $2$ km giá 7 đô la, và $\\dfrac{7}{2} = 3{,}5$. Không bằng nhau — nên không phải tỉ lệ thuận.",
      },
    ],
  },

  {
    layout: "steps",
    icon: "Droplet",
    accent: "#1a5fa8",
    title: "The River Problem: The Speeds",
    titleVn: "Bài Toán Dòng Sông: Vận Tốc",
    inlineSvg: DIAGRAMS.RIVER_SPEEDS,
    content: "**Mai swims at 3 km/h in still water. The river flows at 1 km/h. She sets off from her house at noon, swims downstream, then turns around and swims back. She must be home by 6 p.m. When should she turn around?**\n\nStart with the fact that changes everything: **the water is moving too.**",
    contentVn: "**Mai bơi 3 km/h trong nước lặng. Dòng sông chảy 1 km/h. Em ấy xuất phát từ nhà lúc 12 giờ trưa, bơi xuôi dòng, rồi quay lại bơi về. Em ấy phải về nhà trước 6 giờ chiều. Vậy khi nào em ấy nên quay lại?**\n\nBắt đầu từ điều làm thay đổi tất cả: **nước cũng đang chuyển động.**",
    steps: [
      { text: "**Going with the stream**, the river pushes her along, so the speeds **add**: $3 + 1 = 4$ km/h.", textVn: "**Bơi xuôi dòng**, dòng sông đẩy em ấy đi, nên các vận tốc **cộng lại**: $3 + 1 = 4$ km/h." },
      { text: "**Going against the stream**, the river holds her back, so the speeds **subtract**: $3 - 1 = 2$ km/h.", textVn: "**Bơi ngược dòng**, dòng sông cản em ấy lại, nên các vận tốc **trừ đi**: $3 - 1 = 2$ km/h." },
      { text: "She travels **twice as fast** going out as coming back, so the journey home will take much longer than the journey out.", textVn: "Em ấy bơi đi **nhanh gấp đôi** lúc bơi về, nên chặng về sẽ lâu hơn chặng đi rất nhiều." },
    ],
    reveal: {
      label: "Why can't we just use 3 km/h both ways?",
      labelVn: "Tại sao không dùng luôn 3 km/h cho cả hai chiều?",
      answer: "Because she is not swimming through still water — she is swimming through **moving** water. Her speed past the riverbank is her own speed **plus or minus** the current.\n> With the stream: **add**. Against the stream: **subtract**.",
      answerVn: "Vì em ấy không bơi trong nước lặng — em ấy bơi trong nước **đang chảy**. Vận tốc so với bờ sông bằng vận tốc của chính em ấy **cộng hoặc trừ** vận tốc dòng nước.\n> Xuôi dòng: **cộng**. Ngược dòng: **trừ**.",
    },
    check: {
      id: "chk_stream_speed",
      q: "A boat rows at $7$ km/h in still water, on a river flowing at $2$ km/h. How fast does it travel **upstream**?",
      qVn: "Một chiếc thuyền chèo 7 km/h trong nước lặng, trên dòng sông chảy 2 km/h. Thuyền đi **ngược dòng** với vận tốc bao nhiêu?",
      options: [
        { val: "A", text: "$5$ km/h", textVn: "$5$ km/h" },
        { val: "B", text: "$9$ km/h", textVn: "$9$ km/h" },
        { val: "C", text: "$3.5$ km/h", textVn: "$3{,}5$ km/h" },
      ],
      correct: "A",
      expEn: "Upstream means against the current, so subtract: $7 - 2 = 5$ km/h. Option B is the **downstream** speed, $7 + 2 = 9$ km/h.",
      expVn: "Ngược dòng nghĩa là đi ngược dòng chảy, nên lấy hiệu: $7 - 2 = 5$ km/h. Đáp án B là vận tốc **xuôi dòng**, $7 + 2 = 9$ km/h.",
    },
  },

  {
    layout: "steps",
    icon: "Target",
    accent: "#c8102e",
    title: "The River Problem: The Answer",
    titleVn: "Bài Toán Dòng Sông: Lời Giải",
    inlineSvg: DIAGRAMS.RIVER_TIMELINE,
    content: "Two unknowns need two facts. Mai gives us exactly two: she is out for **six hours**, and she swims the **same distance** each way.",
    contentVn: "Hai ẩn số cần hai dữ kiện. Bài toán cho ta đúng hai: Mai đi trong **sáu giờ**, và em ấy bơi **cùng một quãng đường** cho mỗi chiều.",
    steps: [
      { text: "**Name the unknowns.** Let $d$ be the hours swimming down, and $u$ the hours swimming back.", textVn: "**Đặt tên cho ẩn.** Gọi $d$ là số giờ bơi xuôi, và $u$ là số giờ bơi ngược về." },
      { text: "**Use the time fact.** Noon to 6 p.m. is six hours, so $d + u = 6$.", textVn: "**Dùng dữ kiện thời gian.** Từ 12 giờ trưa đến 6 giờ chiều là sáu giờ, nên $d + u = 6$." },
      { text: "**Use the distance fact.** Distance $=$ speed $\\times$ time, and the two distances are equal: $4d = 2u$.", textVn: "**Dùng dữ kiện quãng đường.** Quãng đường $=$ vận tốc $\\times$ thời gian, và hai quãng đường bằng nhau: $4d = 2u$." },
      { text: "**Substitute.** The first equation gives $u = 6 - d$, so $4d = 2(6 - d)$.", textVn: "**Thế vào.** Phương trình đầu cho $u = 6 - d$, nên $4d = 2(6 - d)$." },
      { text: "**Solve.** $4d = 12 - 2d$, so $6d = 12$ and $d = 2$.", textVn: "**Giải.** $4d = 12 - 2d$, nên $6d = 12$ và $d = 2$." },
      { text: "**Answer the question that was asked.** She swims downstream for $2$ hours, so she turns around at **2 p.m.**", textVn: "**Trả lời đúng câu hỏi được hỏi.** Em ấy bơi xuôi dòng $2$ giờ, nên quay lại lúc **2 giờ chiều**." },
    ],
    reveal: {
      label: "Check the answer",
      labelVn: "Kiểm tra đáp án",
      answer: "Downstream: $4 \\times 2 = 8$ km.\n\nBack: $u = 6 - 2 = 4$ hours at $2$ km/h $= 8$ km.\n\nSame distance both ways ✓ and $2 + 4 = 6$ hours ✓\n> The question asked for a **time of day**, not for $d$. Always finish by answering what was actually asked.",
      answerVn: "Xuôi dòng: $4 \\times 2 = 8$ km.\n\nVề: $u = 6 - 2 = 4$ giờ với $2$ km/h $= 8$ km.\n\nQuãng đường hai chiều bằng nhau ✓ và $2 + 4 = 6$ giờ ✓\n> Câu hỏi hỏi **mấy giờ**, không hỏi $d$. Luôn kết thúc bằng cách trả lời đúng điều được hỏi.",
    },
  },

  {
    layout: "stack",
    icon: "CheckCircle2",
    accent: "#a21caf",
    variant: "checklist",
    columns: 2,
    title: "Quick Reference",
    titleVn: "Tra Cứu Nhanh",
    content: "The eight lines worth having in your notebook before the practice.",
    contentVn: "Tám dòng đáng chép vào vở trước khi làm bài luyện tập.",
    items: [
      { text: "**Direct:** $y = kx$, and $k = \\dfrac{y}{x}$ is always the same.", textVn: "**Tỉ lệ thuận:** $y = kx$, và $k = \\dfrac{y}{x}$ luôn không đổi." },
      { text: "**Inverse:** $xy = k$ — the **product** is always the same.", textVn: "**Tỉ lệ nghịch:** $xy = k$ — **tích** luôn không đổi." },
      { text: "Direct proportion draws a straight line through $(0,0)$.", textVn: "Tỉ lệ thuận vẽ ra đường thẳng đi qua $(0,0)$." },
      { text: "Negative $k$: still a proportion, but the line goes **down**.", textVn: "$k$ âm: vẫn là tỉ lệ thuận, nhưng đường thẳng đi **xuống**." },
      { text: "Square: $y = kx^2$. Triple $x$ and $y$ is $\\times 9$.", textVn: "Bình phương: $y = kx^2$. Nhân ba $x$ thì $y$ $\\times 9$." },
      { text: "Rates: distance $=$ speed $\\times$ time.", textVn: "Tốc độ: quãng đường $=$ vận tốc $\\times$ thời gian." },
      { text: "With the stream **add**, against the stream **subtract**.", textVn: "Xuôi dòng thì **cộng**, ngược dòng thì **trừ**." },
      { text: "Work: people $\\times$ hours stays constant.", textVn: "Công việc: số người $\\times$ số giờ luôn không đổi." },
    ],
  },

  {
    layout: "hero",
    color: "#4a8b23",
    icon: "CheckCircle2",
    title: "Lesson Complete!",
    titleVn: "Hoàn Thành Bài Học!",
    subtitle: "You can find **k**, tell **direct** from **inverse**, and break a river problem into steps.",
    subtitleVn: "Em có thể tìm **k**, phân biệt **tỉ lệ thuận** với **tỉ lệ nghịch**, và chia bài toán dòng sông thành các bước.",
    card: {
      icon: "HelpCircle",
      badge: "Exit question",
      badgeVn: "Câu hỏi kết thúc",
      text: "It takes **6 machines 4 hours** to fill an order. Is that direct or inverse proportion — and how long would **8 machines** take?",
      textVn: "**6 cái máy mất 4 giờ** để hoàn thành một đơn hàng. Đó là tỉ lệ thuận hay tỉ lệ nghịch — và **8 cái máy** sẽ mất bao lâu?",
    },
    reveal: {
      label: "Check your answer",
      labelVn: "Kiểm tra đáp án của em",
      answer: "**Inverse** — more machines, less time. The constant is $6 \\times 4 = 24$ machine-hours, so $24 \\div 8 = \\mathbf{3}$ hours.",
      answerVn: "**Tỉ lệ nghịch** — càng nhiều máy thì càng ít thời gian. Hằng số là $6 \\times 4 = 24$ giờ-máy, nên $24 \\div 8 = \\mathbf{3}$ giờ.",
    },
  },
];
