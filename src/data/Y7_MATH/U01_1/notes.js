// src/data/Y7_MATH/U01_1/notes.js
import { DIAGRAMS } from './diagrams.js';
import { NumberLineWidget, ZeroPairsWidget } from './widgets.jsx';

export const notes = [
  {
    type: "intro",
    unit: "Unit 1 · 1.1",
    title: "Adding & Subtracting Integers",
    titleVn: "Cộng và Trừ Số nguyên",
    objective: "I can add and subtract positive and negative integers using a number line.",
    objectiveVn: "Em có thể cộng và trừ số nguyên dương và âm bằng cách dùng trục số.",
    warmUp: "What things can be described with negative numbers?",
    warmUpVn: "Những thứ gì có thể được mô tả bằng số âm?",
    color: "bg-[#8b5cf6]",
    borderColor: "border-[#7c3aed]",
  },
  {
    type: "concept",
    title: "Real World Negatives",
    titleVn: "Số âm trong thực tế",
    icon: "HelpCircle",
    color: "bg-[#1cb0f6]",
    content:
      "Negative numbers are used to describe the real world whenever we go *below* a starting point. Here are some things that can be negative:\n\n" +
      "> **Temperature**: Days where the temperature is below $0°$ (freezing).\n" +
      "> **Bank Balances**: Money owed to a bank (debt or overdraft).\n" +
      "> **Elevation**: Submarines or divers exploring below sea level.\n" +
      "> **Buildings**: Basement levels below the ground floor.",
    contentVn:
      "Số âm được dùng để mô tả thế giới thực mỗi khi ta đi *xuống dưới* một điểm bắt đầu. Đây là một số thứ có thể là số âm:\n\n" +
      "> **Nhiệt độ**: Những ngày nhiệt độ dưới $0°$ (đóng băng).\n" +
      "> **Tài khoản ngân hàng**: Tiền nợ ngân hàng.\n" +
      "> **Độ cao**: Tàu ngầm hoặc thợ lặn khám phá dưới mực nước biển.\n" +
      "> **Tòa nhà**: Các tầng hầm dưới mặt đất.",
    exampleLabel: "Example",
    exampleLabelVn: "Ví dụ",
    example: "If a submarine dives $50$ meters below sea level, its position is $-50$ meters.",
    exampleVn: "Nếu tàu ngầm lặn sâu $50$ mét dưới mực nước biển, vị trí của nó là $-50$ mét.",
    inlineSvg: DIAGRAMS.NOTES_THERMOMETER,
  },
  {
    type: "concept",
    title: "Defining Our Terms",
    titleVn: "Định nghĩa các thuật ngữ",
    icon: "BookOpen",
    color: "bg-[#1cb0f6]",
    content:
      "Before we calculate, let's be clear about what we are working with:\n\n" +
      "> **Whole Numbers**: The counting numbers starting from zero ($0, 1, 2, 3...$). No fractions.\n" +
      "> **Integers**: All whole numbers, but they can be positive, negative, or zero.\n" +
      "> **Positive**: Numbers to the **right** of zero on the number line.\n" +
      "> **Negative**: Numbers to the **left** of zero on the number line.",
    contentVn:
      "Trước khi tính toán, hãy làm rõ các thuật ngữ ta đang sử dụng:\n\n" +
      "> **Số nguyên không âm**: Các số đếm bắt đầu từ không ($0, 1, 2, 3...$). Không có phân số.\n" +
      "> **Số nguyên (Integers)**: Tất cả các số nguyên không âm, nhưng chúng có thể là số dương, số âm hoặc số không.\n" +
      "> **Số dương**: Các số ở bên **phải** số không trên trục số.\n" +
      "> **Số âm**: Các số ở bên **trái** số không trên trục số.",
    exampleLabel: "The Number Line",
    exampleLabelVn: "Trục số",
    example: "Zero is neither positive nor negative. It sits right in the middle.",
    exampleVn: "Số không không phải là số dương cũng không phải số âm. Nó nằm ngay ở giữa.",
    inlineSvg: DIAGRAMS.NOTES_NUMBER_LINE,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Explore: Number Line Jumper",
    titleVn: "Khám phá: Bước nhảy trên trục số",
    icon: "Target",
    color: "bg-[#ff9600]",
    content:
      "Let's explore how moving on the number line changes a number.\n\n" +
      "> Use the tool to set a **start**, choose **+** or **−**, and pick a number.\n" +
      "> Can you figure out the rule for adding and subtracting?",
    contentVn:
      "Hãy khám phá xem việc di chuyển trên trục số làm thay đổi một số như thế nào.\n\n" +
      "> Dùng công cụ để thiết lập **điểm bắt đầu**, chọn **+** hoặc **−**, và chọn một số.\n" +
      "> Em có thể tìm ra quy tắc cộng và trừ không?",
    exampleLabel: "Interactive Tool",
    exampleLabelVn: "Công cụ tương tác",
    example: "Watch the arrow: moving right makes the number bigger. Moving left makes it smaller.",
    exampleVn: "Quan sát mũi tên: đi sang phải làm số lớn hơn. Đi sang trái làm số nhỏ hơn.",
    widget: NumberLineWidget,
  },
  {
    type: "concept",
    title: "Adding Integers",
    titleVn: "Cộng số nguyên",
    icon: "Target",
    color: "bg-[#ff9600]",
    content:
      "To **add**, start at the first number and move along the line:\n\n" +
      "> Adding a **positive** means move **right**.\n" +
      "> Adding a **negative** means move **left**.",
    contentVn:
      "Để **cộng**, bắt đầu ở số thứ nhất và di chuyển trên trục số:\n\n" +
      "> Cộng một số **dương** nghĩa là đi sang **phải**.\n" +
      "> Cộng một số **âm** nghĩa là đi sang **trái**.",
    exampleLabel: "Examples",
    exampleLabelVn: "Ví dụ",
    example:
      "**1)** $5 + -3 = 2$: Start at $5$, move $3$ steps left.\n\n" +
      "**2)** $-2 + 4 = 2$: Start at $-2$, move $4$ steps right.",
    exampleVn:
      "**1)** $5 + -3 = 2$: Bắt đầu ở $5$, đi $3$ bước sang trái.\n\n" +
      "**2)** $-2 + 4 = 2$: Bắt đầu ở $-2$, đi $4$ bước sang phải.",
    inlineSvg: DIAGRAMS.NOTES_ADD_NEG,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Subtracting Integers",
    titleVn: "Trừ số nguyên",
    icon: "Scale",
    color: "bg-[#ff4b4b]",
    content:
      "Subtracting a **positive** integer takes you the opposite way of adding one.\n\n" +
      "> Subtracting a **positive** means move **left**, to a smaller number.",
    contentVn:
      "Trừ một số nguyên **dương** sẽ đưa em đi theo hướng ngược lại với khi cộng.\n\n" +
      "> Trừ một số **dương** nghĩa là đi sang **trái**, đến số nhỏ hơn.",
    exampleLabel: "Examples",
    exampleLabelVn: "Ví dụ",
    example: 
      "**1)** $4 - 6 = -2$: Start at $4$, move $6$ steps left.\n\n" +
      "**2)** $-1 - 3 = -4$: Start at $-1$, move $3$ steps left.",
    exampleVn: 
      "**1)** $4 - 6 = -2$: Bắt đầu ở $4$, đi $6$ bước sang trái.\n\n" +
      "**2)** $-1 - 3 = -4$: Bắt đầu ở $-1$, đi $3$ bước sang trái.",
    inlineSvg: DIAGRAMS.NOTES_SUB_POS,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Subtracting a Negative",
    titleVn: "Trừ một số âm",
    icon: "ShieldCheck",
    color: "bg-[#14b8a6]",
    content:
      "This is the big rule of the lesson! Subtracting a negative **reverses** direction and sends you **right**:\n\n" +
      "> **Minus a negative is the same as a positive.**\n" +
      "> $a - -b = a + b$ — replace every $- -$ with a single $+$.",
    contentVn:
      "Đây là quy tắc lớn của bài học! Trừ một số âm sẽ **đảo ngược** hướng và đưa em sang **phải**:\n\n" +
      "> **Trừ đi số âm thì giống như cộng số dương.**\n" +
      "> $a - -b = a + b$ — thay mỗi $- -$ bằng một dấu $+$.",
    exampleLabel: "The Big Idea",
    exampleLabelVn: "Ý chính",
    example:
      "Think of debt: If a bank takes away your $\\$5$ debt, you are effectively $\\$5$ richer!\n\n" +
      "**1)** $5 - -2 = 5 + 2 = 7$.\n" +
      "**2)** $-6 - -9 = -6 + 9 = 3$.",
    exampleVn:
      "Hãy nghĩ về khoản nợ: Nếu ngân hàng xóa khoản nợ $\\$5$ của em, em thực sự giàu hơn $\\$5$!\n\n" +
      "**1)** $5 - -2 = 5 + 2 = 7$.\n" +
      "**2)** $-6 - -9 = -6 + 9 = 3$.",
    inlineSvg: DIAGRAMS.NOTES_SUB_NEG,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Zero Pairs",
    titleVn: "Cặp số 0",
    icon: "Scale",
    color: "bg-[#ff9600]",
    content:
      "Here is another way to think about it using counters. A $+1$ and a $-1$ together make **zero** — a **zero pair**.\n\n" +
      "> To add integers, match up zero pairs and cancel them. Whatever is **left over** is your answer.",
    contentVn:
      "Đây là một cách suy nghĩ khác bằng cách dùng các bộ đếm. Một $+1$ và một $-1$ kết hợp lại tạo thành **số không** — một **cặp số 0**.\n\n" +
      "> Để cộng số nguyên, ghép các cặp số 0 và loại bỏ chúng. Bất cứ thứ gì **còn lại** chính là đáp án của em.",
    exampleLabel: "Model",
    exampleLabelVn: "Mô hình",
    example: "For $6 + -5$: five zero pairs cancel, leaving a single $+1$. Try the scenarios in the tool.",
    exampleVn: "Với $6 + -5$: năm cặp số 0 triệt tiêu, chỉ còn lại một $+1$. Hãy thử các tình huống trong công cụ.",
    widget: ZeroPairsWidget,
  },
  {
    type: "concept",
    title: "Watch Out!",
    titleVn: "Cẩn thận!",
    icon: "AlertTriangle",
    color: "bg-[#ff4b4b]",
    content:
      "The minus sign does **two jobs** — be careful which one you mean.\n\n" +
      "> In $8 + -12$, the $-$ is the **sign** of $12$ (a negative number).\n" +
      "> Only $- -$ (subtract a negative) turns into $+$. A single $+ -$ still means **move left**.",
    contentVn:
      "Dấu trừ làm **hai việc** — hãy cẩn thận em muốn nói việc nào.\n\n" +
      "> Trong $8 + -12$, dấu $-$ là **dấu** của $12$ (một số âm).\n" +
      "> Chỉ có $- -$ (trừ một số âm) mới đổi thành $+$. Một dấu $+ -$ vẫn có nghĩa là **đi sang trái**.",
    exampleLabel: "Common Mistake",
    exampleLabelVn: "Lỗi thường gặp",
    example: "$5 + -3 = 2$ (move left), NOT $8$. Don't flip $+ -$ into $+$.",
    exampleVn: "$5 + -3 = 2$ (đi sang trái), KHÔNG phải $8$. Đừng đổi $+ -$ thành $+$.",
  },
  {
    type: "concept",
    title: "Your Turn",
    titleVn: "Đến lượt em",
    icon: "Users",
    color: "bg-[#58cc02]",
    content:
      "On your whiteboard, work these out. Then check with your partner:\n\n" +
      "> **a)** $20 + -5$    **b)** $-10 - -15$    **c)** $-2 + -13$\n\n" +
      "Rule to remember: turn every $- -$ into a $+$ before you start.",
    contentVn:
      "Trên bảng con, hãy tính các phép sau. Sau đó kiểm tra với bạn:\n\n" +
      "> **a)** $20 + -5$    **b)** $-10 - -15$    **c)** $-2 + -13$\n\n" +
      "Quy tắc cần nhớ: đổi mọi dấu $- -$ thành $+$ trước khi làm.",
    exampleLabel: "Answers",
    exampleLabelVn: "Đáp án",
    example: "a) $15$   b) $5$   c) $-15$",
    exampleVn: "a) $15$   b) $5$   c) $-15$",
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành bài học!",
    subtitle: "You can now add and subtract integers — including subtracting a negative by adding a positive.",
    subtitleVn: "Bây giờ em có thể cộng và trừ số nguyên — kể cả trừ số âm bằng cách cộng số dương.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]",
  },
];
