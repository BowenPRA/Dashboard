// src/data/Y7_MATH/U01_1/notes.js
import { DIAGRAMS } from './diagrams.js';

export const notes = [
  {
    type: "intro",
    unit: "Unit 1 · 1.1",
    title: "Adding & Subtracting Integers",
    titleVn: "Cộng và Trừ Số nguyên",
    objective: "I can add and subtract positive and negative integers using a number line.",
    objectiveVn: "Em có thể cộng và trừ số nguyên dương và âm bằng cách dùng trục số.",
    color: "bg-[#8b5cf6]",
    borderColor: "border-[#7c3aed]",
  },
  {
    type: "warmup",
    title: "Do Now",
    titleVn: "Khởi động",
    color: "bg-[#ff9600]",
    content:
      "Copy these into your notebook and answer them:\n\n" +
      "> 1.  Work out $7 + 3$ and $7 - 3$.\n" +
      "> 2.  What is the **inverse** (opposite) of $5$?  Of $-2$?\n" +
      "> 3.  On a number line, which way do you move to make a number **smaller**?",
    contentVn:
      "Chép vào vở và trả lời:\n\n" +
      "> 1.  Tính $7 + 3$ và $7 - 3$.\n" +
      "> 2.  **Số đối** của $5$ là gì?  Của $-2$?\n" +
      "> 3.  Trên trục số, ta di chuyển về phía nào để một số trở nên **nhỏ hơn**?",
  },
  {
    type: "concept",
    title: "The Number Line",
    titleVn: "Trục số",
    icon: "BookOpen",
    color: "bg-[#1cb0f6]",
    content:
      "An **integer** is a whole number — it can be positive, negative, or zero.\n\n" +
      "We use a **number line** to picture them. Every step matters:\n\n" +
      "> Move **right** → the number gets **larger**.\n" +
      "> Move **left** → the number gets **smaller**.",
    contentVn:
      "**Số nguyên** là số nguyên vẹn — có thể dương, âm hoặc bằng không.\n\n" +
      "Ta dùng **trục số** để hình dung chúng. Mỗi bước đều quan trọng:\n\n" +
      "> Đi sang **phải** → số **lớn hơn**.\n" +
      "> Đi sang **trái** → số **nhỏ hơn**.",
    example: "Numbers to the left are always smaller: $-5$ is less than $-2$.",
    exampleVn: "Số ở bên trái luôn nhỏ hơn: $-5$ nhỏ hơn $-2$.",
    inlineSvg: DIAGRAMS.NOTES_NUMBER_LINE,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Adding Integers",
    titleVn: "Cộng số nguyên",
    icon: "Target",
    color: "bg-[#ff9600]",
    content:
      "To **add**, start at the first number and move along the line:\n\n" +
      "> Adding a **positive** → move **right**.\n" +
      "> Adding a **negative** → move **left**.",
    contentVn:
      "Để **cộng**, bắt đầu ở số thứ nhất rồi di chuyển trên trục số:\n\n" +
      "> Cộng một số **dương** → đi sang **phải**.\n" +
      "> Cộng một số **âm** → đi sang **trái**.",
    example:
      "$-3 + -4 = -7$: start at $-3$, move $4$ left.\n\n" +
      "$8 + -12 = -4$: start at $8$, move $12$ left, past zero.",
    exampleVn:
      "$-3 + -4 = -7$: bắt đầu ở $-3$, đi $4$ bước sang trái.\n\n" +
      "$8 + -12 = -4$: bắt đầu ở $8$, đi $12$ bước sang trái, qua số 0.",
    inlineSvg: DIAGRAMS.NOTES_ADD_NEG,
    drawThis: true,
  },
  {
    type: "concept",
    title: "Subtracting a Positive",
    titleVn: "Trừ một số dương",
    icon: "Scale",
    color: "bg-[#ff4b4b]",
    content:
      "Subtracting a **positive** integer is the same as before — you move **left**.\n\n" +
      "> Subtracting a **positive** → move **left** (the number gets smaller).",
    contentVn:
      "Trừ một số nguyên **dương** cũng giống như trước — em di chuyển sang **trái**.\n\n" +
      "> Trừ một số **dương** → đi sang **trái** (số trở nên nhỏ hơn).",
    example: "$4 - 6 = -2$ and $-6 - 3 = -9$: in both, move left.",
    exampleVn: "$4 - 6 = -2$ và $-6 - 3 = -9$: cả hai đều đi sang trái.",
  },
  {
    type: "concept",
    title: "Subtracting a Negative",
    titleVn: "Trừ một số âm",
    icon: "ShieldCheck",
    color: "bg-[#14b8a6]",
    content:
      "This is the big idea of the lesson. Subtracting a negative **reverses** direction:\n\n" +
      "> **Subtracting a negative is the same as adding.**\n" +
      "> $a - -b = a + b$ — replace $- -$ with $+$.",
    contentVn:
      "Đây là ý chính của bài học. Trừ một số âm sẽ **đảo ngược** hướng:\n\n" +
      "> **Trừ một số âm giống như cộng.**\n" +
      "> $a - -b = a + b$ — thay $- -$ bằng $+$.",
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
      "Discuss with a partner:\n\n" +
      "> Why does **subtracting a negative** make a number *bigger*?\n\n" +
      "Think about temperature: if it is $-6°$ and we *take away* a drop of $-9°$, are we warmer or colder?",
    contentVn:
      "Thảo luận với bạn:\n\n" +
      "> Tại sao **trừ một số âm** lại làm cho số *lớn hơn*?\n\n" +
      "Hãy nghĩ về nhiệt độ: nếu đang là $-6°$ và ta *bỏ đi* mức giảm $-9°$, ta ấm hơn hay lạnh hơn?",
  },
  {
    type: "concept",
    title: "Your Turn",
    titleVn: "Đến lượt em",
    icon: "Users",
    color: "bg-[#58cc02]",
    content:
      "On your whiteboard, work these out. Then check with your partner:\n\n" +
      "> **a)** $20 + -5$\n" +
      "> **b)** $-10 - -15$\n" +
      "> **c)** $-2 + -13$\n\n" +
      "One rule to remember: turn every $- -$ into a $+$ before you start.",
    contentVn:
      "Trên bảng con, hãy tính các phép sau. Sau đó kiểm tra với bạn:\n\n" +
      "> **a)** $20 + -5$\n" +
      "> **b)** $-10 - -15$\n" +
      "> **c)** $-2 + -13$\n\n" +
      "Một quy tắc cần nhớ: đổi mọi dấu $- -$ thành $+$ trước khi làm.",
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
