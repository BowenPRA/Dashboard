// src/data/Y7_MATH/U01_1/notes.js
import { DIAGRAMS } from './diagrams.js';
import {
  NumberLineWidget,
  TeamActivityWidget,
  TempDropProblemWidget,
  WarmerProblemWidget,
} from './widgets.jsx';

export const notes = [
  // 1 ─ Title + objective + warm-up (one slide, dark-mode safe) ────────────
  {
    type: "intro",
    unit: "Unit 1 · 1.1",
    title: "Adding & Subtracting Integers",
    titleVn: "Cộng và Trừ Số nguyên",
    objective: "I can add and subtract positive and negative integers by moving along a number line.",
    objectiveVn: "Em có thể cộng và trừ số nguyên dương và âm bằng cách di chuyển trên trục số.",
    warmUp: "Write down **at least 3 things** that can be described with negative numbers.",
    warmUpVn: "Viết ra **ít nhất 3 thứ** có thể được mô tả bằng số âm.",
    color: "bg-[#8b5cf6]",
    borderColor: "border-[#7c3aed]",
  },

  // 2 ─ Team activity: brainstorm negatives (timer + reveal) ────────────────
  {
    type: "concept",
    title: "Team Game: Name the Negatives",
    titleVn: "Trò chơi đội: Kể tên số âm",
    icon: "Users",
    color: "bg-[#58cc02]",
    content:
      "Play in **teams of two**, one whiteboard each.\n\n" +
      "> **1.** In **2 minutes**, list as many things as you can that use **negative numbers**.\n" +
      "> **2.** Take turns reading your list out loud.\n" +
      "> **3.** If another team has the **same** idea, **both cross it out**.\n" +
      "> **4.** The team with the most **unique** ideas wins! 🏆",
    contentVn:
      "Chơi theo **đội hai người**, mỗi người một bảng con.\n\n" +
      "> **1.** Trong **2 phút**, hãy liệt kê càng nhiều thứ dùng **số âm** càng tốt.\n" +
      "> **2.** Lần lượt đọc to danh sách của mình.\n" +
      "> **3.** Nếu đội khác có ý tưởng **giống nhau**, **cả hai cùng gạch bỏ**.\n" +
      "> **4.** Đội có nhiều ý tưởng **độc nhất** nhất sẽ thắng! 🏆",
    widget: TeamActivityWidget,
  },

  // 3 ─ The number line: integers, positive, negative, zero, whole numbers ──
  {
    type: "concept",
    title: "The Number Line",
    titleVn: "Trục số",
    icon: "BookOpen",
    color: "bg-[#1cb0f6]",
    content:
      "Every integer has a home on the number line. Copy these into your book:\n\n" +
      "> **Integer**: a whole number that is **positive, negative, or zero** — never a fraction.\n" +
      "> **Positive**: to the **right** of zero. **Negative**: to the **left** of zero.\n" +
      "> **Zero** is neither positive nor negative — it sits in the middle.\n" +
      "> Zero and the positives together are the **whole (natural) numbers**.",
    contentVn:
      "Mỗi số nguyên có một vị trí trên trục số. Hãy chép vào vở:\n\n" +
      "> **Số nguyên**: một số nguyên vẹn, có thể **dương, âm hoặc bằng không** — không bao giờ là phân số.\n" +
      "> **Số dương**: ở bên **phải** số không. **Số âm**: ở bên **trái** số không.\n" +
      "> **Số không** không âm cũng không dương — nó nằm ở giữa.\n" +
      "> Số không cùng với các số dương là các **số tự nhiên**.",
    exampleLabel: "Read it",
    exampleLabelVn: "Đọc thử",
    example: "$-3$ is 3 steps **left** of zero. $4$ is 4 steps **right** of zero. So $-3 < 4$.",
    exampleVn: "$-3$ ở **bên trái** số không 3 bước. $4$ ở **bên phải** số không 4 bước. Vậy $-3 < 4$.",
    inlineSvg: DIAGRAMS.NOTES_NUMBER_LINE_BIG,
    drawThis: true,
  },

  // 4 ─ Framing (discussion) + interactive jumper ──────────────────────────
  {
    type: "concept",
    title: "Left or Right?",
    titleVn: "Trái hay Phải?",
    icon: "MessageSquare",
    color: "bg-[#ff9600]",
    content:
      "Every add or subtract is just a **move** along the line. Before you calculate, always ask **one question**:\n\n" +
      "> **\"Should I move RIGHT or LEFT?\"**\n" +
      "> **Right** = bigger. **Left** = smaller.\n\n" +
      "Play with the tool. Can you find the rule for **+** and **−** yourself?",
    contentVn:
      "Mỗi phép cộng hay trừ chỉ là một **bước di chuyển** trên trục số. Trước khi tính, hãy luôn tự hỏi **một câu**:\n\n" +
      "> **\"Mình nên đi sang PHẢI hay TRÁI?\"**\n" +
      "> **Phải** = lớn hơn. **Trái** = nhỏ hơn.\n\n" +
      "Hãy thử công cụ. Em có tự tìm ra quy tắc cho **+** và **−** không?",
    widget: NumberLineWidget,
  },

  // 5 ─ Two signs together → combine into one ──────────────────────────────
  {
    type: "concept",
    title: "Two Signs Together",
    titleVn: "Hai dấu đứng cạnh nhau",
    icon: "Equal",
    color: "bg-[#8b5cf6]",
    content:
      "Sometimes two signs sit next to each other, like $5 - (-3)$. First, **combine them into one sign**:\n\n" +
      "> **Same** signs → **$+$** (move right).\n" +
      "> **Different** signs → **$-$** (move left).\n\n" +
      "Tidy the signs first, then just move along the line.",
    contentVn:
      "Đôi khi hai dấu đứng cạnh nhau, như $5 - (-3)$. Trước tiên, hãy **gộp chúng thành một dấu**:\n\n" +
      "> **Cùng** dấu → **$+$** (đi sang phải).\n" +
      "> **Khác** dấu → **$-$** (đi sang trái).\n\n" +
      "Dọn dấu trước, rồi chỉ việc di chuyển trên trục số.",
    exampleLabel: "Tidy first",
    exampleLabelVn: "Dọn dấu trước",
    example:
      "$5 - (-3) = 5 + 3$   (same signs → $+$)\n\n" +
      "$5 + (-3) = 5 - 3$   (different signs → $-$)",
    exampleVn:
      "$5 - (-3) = 5 + 3$   (cùng dấu → $+$)\n\n" +
      "$5 + (-3) = 5 - 3$   (khác dấu → $-$)",
    inlineSvg: DIAGRAMS.NOTES_TWO_SIGNS,
    drawThis: true,
  },

  // 6 ─ Adding integers ────────────────────────────────────────────────────
  {
    type: "concept",
    title: "Adding Integers",
    titleVn: "Cộng số nguyên",
    icon: "Target",
    color: "bg-[#ff9600]",
    content:
      "To **add**, start at the first number and move:\n\n" +
      "> Add a **positive** → move **right**.\n" +
      "> Add a **negative** → move **left**.",
    contentVn:
      "Để **cộng**, bắt đầu ở số thứ nhất và di chuyển:\n\n" +
      "> Cộng số **dương** → đi sang **phải**.\n" +
      "> Cộng số **âm** → đi sang **trái**.",
    exampleLabel: "Examples",
    exampleLabelVn: "Ví dụ",
    example:
      "**1)** $-3 + (-4) = -7$: start at $-3$, move $4$ **left**.\n\n" +
      "**2)** $-2 + 6 = 4$: start at $-2$, move $6$ **right**.",
    exampleVn:
      "**1)** $-3 + (-4) = -7$: bắt đầu ở $-3$, đi $4$ bước sang **trái**.\n\n" +
      "**2)** $-2 + 6 = 4$: bắt đầu ở $-2$, đi $6$ bước sang **phải**.",
    inlineSvg: DIAGRAMS.NOTES_ADD_NEG,
    drawThis: true,
  },

  // 7 ─ Subtracting a positive ─────────────────────────────────────────────
  {
    type: "concept",
    title: "Subtracting Integers",
    titleVn: "Trừ số nguyên",
    icon: "Scale",
    color: "bg-[#ff4b4b]",
    content:
      "Subtracting a **positive** is the opposite of adding one:\n\n" +
      "> Subtract a **positive** → move **left**, to a smaller number.\n\n" +
      "You can end up below zero — that is fine!",
    contentVn:
      "Trừ một số **dương** thì ngược lại với cộng:\n\n" +
      "> Trừ số **dương** → đi sang **trái**, đến số nhỏ hơn.\n\n" +
      "Em có thể xuống dưới số không — điều đó hoàn toàn ổn!",
    exampleLabel: "Examples",
    exampleLabelVn: "Ví dụ",
    example:
      "**1)** $-6 - 3 = -9$: start at $-6$, move $3$ **left**.\n\n" +
      "**2)** $2 - 5 = -3$: start at $2$, move $5$ **left**.",
    exampleVn:
      "**1)** $-6 - 3 = -9$: bắt đầu ở $-6$, đi $3$ bước sang **trái**.\n\n" +
      "**2)** $2 - 5 = -3$: bắt đầu ở $2$, đi $5$ bước sang **trái**.",
    inlineSvg: DIAGRAMS.NOTES_SUB_POS,
    drawThis: true,
  },

  // 8 ─ Subtracting a negative (the big rule) ──────────────────────────────
  {
    type: "concept",
    title: "Subtracting a Negative",
    titleVn: "Trừ một số âm",
    icon: "ShieldCheck",
    color: "bg-[#14b8a6]",
    content:
      "The big rule of the lesson! Different signs cancel, so subtracting a negative sends you **right**:\n\n" +
      "> **Minus a negative = plus.**\n" +
      "> $a - (-b) = a + b$.",
    contentVn:
      "Quy tắc lớn của bài học! Hai dấu khác nhau triệt tiêu, nên trừ một số âm sẽ đưa em sang **phải**:\n\n" +
      "> **Trừ số âm = cộng.**\n" +
      "> $a - (-b) = a + b$.",
    exampleLabel: "The Big Idea",
    exampleLabelVn: "Ý chính",
    example:
      "Think of debt: if the bank **removes** your $\\$5$ debt, you are $\\$5$ richer!\n\n" +
      "**1)** $2 - (-5) = 2 + 5 = 7$.\n\n" +
      "**2)** $-6 - (-9) = -6 + 9 = 3$.",
    exampleVn:
      "Hãy nghĩ về khoản nợ: nếu ngân hàng **xóa** khoản nợ $\\$5$ của em, em giàu hơn $\\$5$!\n\n" +
      "**1)** $2 - (-5) = 2 + 5 = 7$.\n\n" +
      "**2)** $-6 - (-9) = -6 + 9 = 3$.",
    inlineSvg: DIAGRAMS.NOTES_SUB_NEG,
    drawThis: true,
  },

  // 9 ─ Watch out: the minus sign does two jobs ────────────────────────────
  {
    type: "concept",
    title: "Watch Out!",
    titleVn: "Cẩn thận!",
    icon: "AlertTriangle",
    color: "bg-[#ff4b4b]",
    content:
      "The minus sign does **two jobs** — be sure which one you mean.\n\n" +
      "> In $8 + (-12)$, the $-$ is the **sign** of $12$ (a negative number).\n" +
      "> Only **$-(-)$** turns into $+$. A single **$+(-)$** still means **move left**.",
    contentVn:
      "Dấu trừ làm **hai việc** — hãy chắc chắn em muốn nói việc nào.\n\n" +
      "> Trong $8 + (-12)$, dấu $-$ là **dấu** của $12$ (một số âm).\n" +
      "> Chỉ có **$-(-)$** mới đổi thành $+$. Một dấu **$+(-)$** vẫn nghĩa là **đi sang trái**.",
    exampleLabel: "Common Mistake",
    exampleLabelVn: "Lỗi thường gặp",
    example: "$5 + (-3) = 2$ (move left), **NOT** $8$.\n\nDon't flip $+(-)$ into $+$.",
    exampleVn: "$5 + (-3) = 2$ (đi sang trái), **KHÔNG** phải $8$.\n\nĐừng đổi $+(-)$ thành $+$.",
  },

  // 10 ─ Word problem 1: temperature drop (reveal breakdown + line) ─────────
  {
    type: "concept",
    title: "Word Problem: Temperature",
    titleVn: "Bài toán đố: Nhiệt độ",
    icon: "Target",
    color: "bg-[#ff4b4b]",
    content:
      "Read carefully, then work it out on your whiteboard.\n\n" +
      "> At **noon** the temperature is **$4°C$**.\n" +
      "> By **midnight** it has **dropped $9$ degrees**.\n\n" +
      "What is the temperature at midnight?",
    contentVn:
      "Đọc kỹ, rồi tính trên bảng con của em.\n\n" +
      "> Vào **buổi trưa** nhiệt độ là **$4°C$**.\n" +
      "> Đến **nửa đêm** nhiệt độ đã **giảm $9$ độ**.\n\n" +
      "Nhiệt độ lúc nửa đêm là bao nhiêu?",
    widget: TempDropProblemWidget,
  },

  // 11 ─ Word problem 2: how much warmer (subtract a negative) ──────────────
  {
    type: "concept",
    title: "Word Problem: How Much Warmer?",
    titleVn: "Bài toán đố: Ấm hơn bao nhiêu?",
    icon: "MessageSquare",
    color: "bg-[#14b8a6]",
    content:
      "This one hides a **subtract-a-negative**. Spot it!\n\n" +
      "> The **freezer** is **$-15°C$**.\n" +
      "> The **room** is **$20°C$**.\n\n" +
      "How many degrees **warmer** is the room than the freezer?",
    contentVn:
      "Bài này ẩn một phép **trừ số âm**. Hãy tìm ra nó!\n\n" +
      "> **Tủ đông** là **$-15°C$**.\n" +
      "> **Căn phòng** là **$20°C$**.\n\n" +
      "Căn phòng **ấm hơn** tủ đông bao nhiêu độ?",
    widget: WarmerProblemWidget,
  },

  // 12 ─ Useful summation: all the rules in one place ──────────────────────
  {
    type: "concept",
    title: "Recap: The Rules",
    titleVn: "Tóm tắt: Các quy tắc",
    icon: "ShieldCheck",
    color: "bg-[#14b8a6]",
    content:
      "Keep this in your notebook — it is everything from today:\n\n" +
      "> **Ask first:** move **right** (bigger) or **left** (smaller)?\n" +
      "> Add **+** → right. Add **−** → left. Subtract **+** → left.\n" +
      "> **Same** signs → **+** (right). **Different** signs → **−** (left).\n" +
      "> **Minus a negative = plus**: $a - (-b) = a + b$.",
    contentVn:
      "Hãy giữ điều này trong vở — đây là tất cả những gì hôm nay:\n\n" +
      "> **Hỏi trước:** đi sang **phải** (lớn hơn) hay **trái** (nhỏ hơn)?\n" +
      "> Cộng **+** → phải. Cộng **−** → trái. Trừ **+** → trái.\n" +
      "> **Cùng** dấu → **+** (phải). **Khác** dấu → **−** (trái).\n" +
      "> **Trừ số âm = cộng**: $a - (-b) = a + b$.",
    exampleLabel: "Quick self-check",
    exampleLabelVn: "Tự kiểm tra nhanh",
    example:
      "Try on your whiteboard, then check with a partner:\n\n" +
      "**a)** $20 + (-5)$   **b)** $-10 - (-15)$   **c)** $-2 + (-13)$\n\n" +
      "Answers: **a)** $15$  **b)** $5$  **c)** $-15$",
    exampleVn:
      "Thử trên bảng con, rồi kiểm tra với bạn:\n\n" +
      "**a)** $20 + (-5)$   **b)** $-10 - (-15)$   **c)** $-2 + (-13)$\n\n" +
      "Đáp án: **a)** $15$  **b)** $5$  **c)** $-15$",
  },

  // 13 ─ Celebration + exit question ───────────────────────────────────────
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành bài học!",
    subtitle: "You can now add and subtract integers on a number line — even subtracting a negative. Exit question: what is $-4 - (-10)$?",
    subtitleVn: "Bây giờ em có thể cộng và trừ số nguyên trên trục số — kể cả trừ số âm. Câu hỏi ra về: $-4 - (-10)$ bằng bao nhiêu?",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]",
  },
];
