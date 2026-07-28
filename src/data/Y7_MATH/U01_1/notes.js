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
    warmUp: "Work out $7 + 3$ and $7 - 3$.  Then write the **inverse** (opposite) of $-4$.",
    warmUpVn: "Tính $7 + 3$ và $7 - 3$.  Sau đó viết **số đối** của $-4$.",
    color: "bg-[#8b5cf6]",
    borderColor: "border-[#7c3aed]",
  },
  {
    type: "concept",
    title: "The Number Line",
    titleVn: "Trục số",
    icon: "BookOpen",
    color: "bg-[#1cb0f6]",
    content:
      "An **integer** is a whole number — it can be positive, negative, or zero. There are no fractions or decimals.\n\n" +
      "We picture integers on a **number line**, and every step has a direction:\n\n" +
      "> Move **right** → the number gets **larger**.\n" +
      "> Move **left** → the number gets **smaller**.",
    contentVn:
      "**Số nguyên** là số nguyên vẹn — có thể dương, âm hoặc bằng không. Không có phân số hay số thập phân.\n\n" +
      "Ta hình dung số nguyên trên **trục số**, và mỗi bước đều có hướng:\n\n" +
      "> Đi sang **phải** → số **lớn hơn**.\n" +
      "> Đi sang **trái** → số **nhỏ hơn**.",
    exampleLabel: "Key Idea",
    exampleLabelVn: "Ý chính",
    example: "Numbers to the left are always smaller: $-5$ is less than $-2$, even though $5 > 2$.",
    exampleVn: "Số ở bên trái luôn nhỏ hơn: $-5$ nhỏ hơn $-2$, dù $5 > 2$.",
    inlineSvg: DIAGRAMS.NOTES_NUMBER_LINE,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Where We Meet Negatives",
    titleVn: "Gặp số âm ở đâu",
    icon: "HelpCircle",
    color: "bg-[#1cb0f6]",
    content:
      "Negative numbers are not just for maths class — they describe the real world whenever we go *below* a starting point.\n\n" +
      "> Temperatures below $0°$, money **owed** (debt), floors **below** ground, and heights **below** sea level are all negative.",
    contentVn:
      "Số âm không chỉ dành cho lớp toán — chúng mô tả thế giới thực mỗi khi ta đi *xuống dưới* một điểm bắt đầu.\n\n" +
      "> Nhiệt độ dưới $0°$, số tiền **nợ**, các tầng **dưới** mặt đất, và độ cao **dưới** mực nước biển đều là số âm.",
    exampleLabel: "Real World",
    exampleLabelVn: "Thực tế",
    example: "A cold morning at $-6°C$ that warms up by $9°$ reaches $3°C$ — we count *up* the thermometer.",
    exampleVn: "Buổi sáng lạnh $-6°C$ ấm lên $9°$ sẽ đạt $3°C$ — ta đếm *lên* trên nhiệt kế.",
    inlineSvg: DIAGRAMS.NOTES_THERMOMETER,
  },
  {
    type: "concept",
    title: "Adding Integers",
    titleVn: "Cộng số nguyên",
    icon: "Target",
    color: "bg-[#ff9600]",
    content:
      "To **add**, start at the first number and travel along the line:\n\n" +
      "> Adding a **positive** → move **right**.\n" +
      "> Adding a **negative** → move **left**.",
    contentVn:
      "Để **cộng**, bắt đầu ở số thứ nhất rồi di chuyển trên trục số:\n\n" +
      "> Cộng một số **dương** → đi sang **phải**.\n" +
      "> Cộng một số **âm** → đi sang **trái**.",
    exampleLabel: "Analogy",
    exampleLabelVn: "So sánh",
    example:
      "Think of steps: $+$ is a step **forward**, $-$ is a step **back**.\n\n" +
      "$-3 + -4 = -7$ (four steps back). $8 + -12 = -4$ (twelve steps back, past zero).",
    exampleVn:
      "Hãy nghĩ về các bước chân: $+$ là bước **tới**, $-$ là bước **lùi**.\n\n" +
      "$-3 + -4 = -7$ (lùi bốn bước). $8 + -12 = -4$ (lùi mười hai bước, qua số 0).",
    inlineSvg: DIAGRAMS.NOTES_ADD_NEG,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Explore: Number Line Jumper",
    titleVn: "Khám phá: Bước nhảy trên trục số",
    icon: "Target",
    color: "bg-[#ff9600]",
    content:
      "Use the tool to test what you just learned. Set a **start**, choose **+** or **−**, and pick a number (it can be negative too).\n\n" +
      "> **Predict first, then check.** Before you release the slider, say the answer out loud.",
    contentVn:
      "Dùng công cụ để kiểm tra điều em vừa học. Chọn **điểm bắt đầu**, chọn **+** hoặc **−**, rồi chọn một số (có thể là số âm).\n\n" +
      "> **Dự đoán trước, rồi kiểm tra.** Trước khi thả thanh trượt, hãy nói to đáp án.",
    exampleLabel: "Interactive Tool",
    exampleLabelVn: "Công cụ tương tác",
    example: "Watch the arrow: green means you moved right (bigger), red means you moved left (smaller).",
    exampleVn: "Quan sát mũi tên: xanh lá là đi sang phải (lớn hơn), đỏ là đi sang trái (nhỏ hơn).",
    widget: NumberLineWidget,
  },
  {
    type: "concept",
    title: "Zero Pairs",
    titleVn: "Cặp số 0",
    icon: "Scale",
    color: "bg-[#ff9600]",
    content:
      "Here is *why* the number line works. A $+1$ and a $-1$ together make **zero** — a **zero pair**.\n\n" +
      "> To add integers, match up zero pairs and cancel them. Whatever chips are **left over** is your answer.",
    contentVn:
      "Đây là *lý do* trục số hoạt động. Một $+1$ và một $-1$ cùng nhau tạo thành **số 0** — một **cặp số 0**.\n\n" +
      "> Để cộng số nguyên, ghép các cặp số 0 và loại bỏ chúng. Những ô **còn lại** chính là đáp án.",
    exampleLabel: "Model",
    exampleLabelVn: "Mô hình",
    example: "For $6 + -5$: five zero pairs cancel, leaving a single $+1$. Try the scenarios in the tool.",
    exampleVn: "Với $6 + -5$: năm cặp số 0 triệt tiêu, chỉ còn lại một $+1$. Hãy thử các tình huống trong công cụ.",
    widget: ZeroPairsWidget,
  },
  {
    type: "concept",
    title: "Subtracting a Positive",
    titleVn: "Trừ một số dương",
    icon: "Scale",
    color: "bg-[#ff4b4b]",
    content:
      "Subtracting a **positive** integer takes you the same way as before — **left**, to a smaller number.\n\n" +
      "> Subtracting a **positive** → move **left**.",
    contentVn:
      "Trừ một số nguyên **dương** đưa em đi cùng hướng như trước — sang **trái**, đến số nhỏ hơn.\n\n" +
      "> Trừ một số **dương** → đi sang **trái**.",
    exampleLabel: "Worked Example",
    exampleLabelVn: "Ví dụ mẫu",
    example: "$-6 - 3 = -9$: start at $-6$ and step $3$ further left. Also $4 - 6 = -2$.",
    exampleVn: "$-6 - 3 = -9$: bắt đầu ở $-6$ và đi thêm $3$ bước sang trái. Cũng vậy $4 - 6 = -2$.",
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
      "This is the big idea of the lesson. Subtracting a negative **reverses** direction and sends you **right**:\n\n" +
      "> **Subtracting a negative is the same as adding.**\n" +
      "> $a - -b = a + b$ — replace every $- -$ with a single $+$.",
    contentVn:
      "Đây là ý chính của bài học. Trừ một số âm sẽ **đảo ngược** hướng và đưa em sang **phải**:\n\n" +
      "> **Trừ một số âm giống như cộng.**\n" +
      "> $a - -b = a + b$ — thay mỗi $- -$ bằng một dấu $+$.",
    exampleLabel: "The Big Idea",
    exampleLabelVn: "Ý chính",
    example:
      "$2 - -5 = 2 + 5 = 7$.\n\n" +
      "$-6 - -9 = -6 + 9 = 3$: add the inverse, move right.",
    exampleVn:
      "$2 - -5 = 2 + 5 = 7$.\n\n" +
      "$-6 - -9 = -6 + 9 = 3$: cộng số đối, đi sang phải.",
    inlineSvg: DIAGRAMS.NOTES_SUB_NEG,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Talk About It",
    titleVn: "Cùng thảo luận",
    icon: "MessageSquare",
    color: "bg-[#ce82ff]",
    content:
      "Discuss with a partner, then share with the class:\n\n" +
      "> Why does **taking away** a negative make a number *bigger*?",
    contentVn:
      "Thảo luận với bạn, rồi chia sẻ với cả lớp:\n\n" +
      "> Tại sao **bỏ đi** một số âm lại làm cho số *lớn hơn*?",
    exampleLabel: "A Hint",
    exampleLabelVn: "Gợi ý",
    example: "If a friend cancels a $\\$5$ debt you owe, you are $\\$5$ richer — removing a negative left you better off.",
    exampleVn: "Nếu một người bạn xóa khoản nợ $\\$5$ của em, em giàu hơn $\\$5$ — bỏ đi một số âm khiến em khá hơn.",
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
      "> Chỉ có $- -$ (trừ một số âm) mới đổi thành $+$. Một dấu $+ -$ vẫn nghĩa là **đi sang trái**.",
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
    subtitle: "You can now add and subtract integers — including subtracting a negative by adding the inverse.",
    subtitleVn: "Bây giờ em có thể cộng và trừ số nguyên — kể cả trừ số âm bằng cách cộng số đối.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]",
  },
];
