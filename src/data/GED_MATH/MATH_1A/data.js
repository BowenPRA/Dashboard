// src/data/GED_MATH/MATH_1A/data.js

import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const ADD_MATH_1A_DATA = {
  meta: {
    id: "MATH_1A",
    title: "Algebraic Expressions & Equations",
    desc: "Master the language of algebra, translate real-world word problems, and solve basic equations.",
    track: "GED_MATH",
    icon: "Calculator",
    themeColor: "bg-emerald-500 border-emerald-700"
  },
  
  // --- CORRECTED XP PIPELINE ---
  phases: [
    {
      id: "concept",
      title: "Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 } 
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 5, // Unlocks after completing Notes
      tasks: [
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 40, // Unlocks after getting 10 (Notes) + 10 (Word Rec) + 20 (Short Answers)
      tasks: [
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 10 }, // Fixed to 10 to match Assessment.jsx scaling
        { id: "GAMES", dbKey: "p12", maxXP: 20 }
      ]
    }
  ],

  realWords: [
    { word: "Variable", vn: "Biến số", def: "A letter used to represent an unknown number.", vnDef: "Một chữ cái được sử dụng để đại diện cho một số chưa biết.", sent: "In the expression x + 5, the letter x is the variable.", vnSent: "Trong biểu thức x + 5, chữ cái x là biến số.", isReal: true },
    { word: "Coefficient", vn: "Hệ số", def: "A number multiplied by a variable.", vnDef: "Một số được nhân với một biến số.", sent: "The coefficient in the term 4y is 4.", vnSent: "Hệ số trong hạng tử 4y là 4.", isReal: true },
    { word: "Term", vn: "Hạng tử", def: "A single mathematical block separated by plus or minus signs.", vnDef: "Một khối toán học đơn lẻ được phân tách bằng dấu cộng hoặc trừ.", sent: "The expression 2x + 3 has two terms.", vnSent: "Biểu thức 2x + 3 có hai hạng tử.", isReal: true },
    { word: "Expression", vn: "Biểu thức", def: "A math phrase combining numbers and variables without an equal sign.", vnDef: "Một cụm từ toán học kết hợp các số và biến số không có dấu bằng.", sent: "We can simplify the expression to make it shorter.", vnSent: "Chúng ta có thể rút gọn biểu thức để làm cho nó ngắn hơn.", isReal: true },
    { word: "Equation", vn: "Phương trình", def: "A mathematical statement showing two sides are equal.", vnDef: "Một phát biểu toán học cho thấy hai vế bằng nhau.", sent: "To solve the equation, you must find the unknown variable.", vnSent: "Để giải phương trình, bạn phải tìm biến số chưa biết.", isReal: true },
    { word: "Substitute", vn: "Thay thế", def: "To replace a variable with a specific number.", vnDef: "Thay thế một biến số bằng một con số cụ thể.", sent: "Substitute the number 3 for x to solve the problem.", vnSent: "Thay thế số 3 cho x để giải bài toán.", isReal: true },
    { word: "Evaluate", vn: "Tính giá trị", def: "To calculate the final value.", vnDef: "Tính toán giá trị cuối cùng.", sent: "Evaluate the expression to figure out the total cost.", vnSent: "Tính giá trị biểu thức để tìm ra tổng chi phí.", isReal: true },
    { word: "Isolate", vn: "Cô lập / Tách riêng", def: "To get a variable by itself on one side of an equal sign.", vnDef: "Để một biến số đứng một mình ở một vế của dấu bằng.", sent: "You need to isolate the y to find the final answer.", vnSent: "Bạn cần cô lập y để tìm câu trả lời cuối cùng.", isReal: true },
    { word: "Distribute", vn: "Phân phối", def: "To multiply an outside term to everything inside parentheses.", vnDef: "Nhân một hạng tử bên ngoài với mọi thứ bên trong dấu ngoặc đơn.", sent: "Distribute the 2 across the numbers inside the parentheses.", vnSent: "Phân phối số 2 cho các số bên trong dấu ngoặc đơn.", isReal: true },
    { word: "Combine", vn: "Kết hợp", def: "To add or subtract terms that have the exact same variables.", vnDef: "Cộng hoặc trừ các hạng tử có chính xác các biến số giống nhau.", sent: "Combine the like terms to simplify the problem.", vnSent: "Kết hợp các hạng tử đồng dạng để rút gọn bài toán.", isReal: true }
  ],

  fakeWords: [
    { word: "Variabal", isReal: false },
    { word: "Coeficient", isReal: false },
    { word: "Equasion", isReal: false },
    { word: "Substitoot", isReal: false },
    { word: "Izolate", isReal: false },
    { word: "Distriboot", isReal: false },
    { word: "Expresion", isReal: false },
    { word: "Evalueight", isReal: false }
  ],

  passages: [
    {
      id: "passage_1",
      title: "Algebra at the Coffee Shop",
      meta: "Real-World Application",
      text: [
        "Many people use algebra every day without realizing it. Imagine you are working at a local coffee shop. A regular black coffee costs $3. If a customer comes in and orders a certain number of coffees for their office, you can use an {expression} to quickly calculate the total price.",
        "In math, we use a {variable}, like the letter 'c', to represent the unknown number of coffees. The math phrase becomes 3c. In this phrase, the number 3 is the {coefficient}.",
        "If a customer orders 4 coffees, you simply {substitute} the number 4 into the place of 'c'. Finally, you {evaluate} the cost: 3 times 4 equals $12."
      ],
      glossary: {
        "expression": { vn: "Biểu thức", def: "A math phrase combining numbers and variables." },
        "variable": { vn: "Biến số", def: "A letter representing an unknown amount." },
        "coefficient": { vn: "Hệ số", def: "The number multiplied by the variable." },
        "substitute": { vn: "Thay thế", def: "To replace a letter with a specific number." },
        "evaluate": { vn: "Tính giá trị", def: "To calculate the final numerical answer." }
      }
    },
    {
      id: "passage_2",
      title: "The Golden Rule of Balance",
      meta: "Understanding Equations",
      text: [
        "While an expression is just a phrase, an {equation} is a complete mathematical sentence. The most important part is the equal sign. Think of an equal sign like a perfectly balanced scale.",
        "Your main goal is to {isolate} the unknown variable so it sits all by itself on one side of the scale. To do this, you have to move numbers away from it using inverse (opposite) operations.",
        "However, you must follow the Golden Rule: Whatever you do to the left side, you must also do to the right side. If you add 5 pounds to the left, you must add 5 pounds to the right to keep the balance."
      ],
      glossary: {
        "equation": { vn: "Phương trình", def: "A math statement showing two equal sides." },
        "isolate": { vn: "Cô lập", def: "To get a variable completely by itself." }
      }
    },
    {
      id: "passage_3",
      title: "Organizing the Warehouse",
      meta: "Simplifying Math",
      text: [
        "Imagine you manage a large fruit warehouse. You have boxes of apples and boxes of bananas. If someone asks for your inventory, you wouldn't say, 'I have 2 boxes of apples, 3 boxes of bananas, and 4 more boxes of apples.' That is too confusing.",
        "Instead, you would {combine} the apples together. You now have 6 boxes of apples and 3 boxes of bananas.",
        "In algebra, this is called combining like terms. You can only group a {term} with another term if they have the exact same variable. You can add 'x' with 'x', but you can never add 'x' with 'y'."
      ],
      glossary: {
        "combine": { vn: "Kết hợp", def: "To add or subtract similar items together." },
        "term": { vn: "Hạng tử", def: "A single mathematical block (like 2x or 5y)." }
      }
    }
  ],

  shortQA: [
    {
      id: "qa1",
      question: "What is the primary difference between an expression and an equation?",
      sampleAnswer: "An expression is a math phrase with no equal sign, while an equation has an equal sign showing that two sides are balanced.",
      vnTranslation: "Sự khác biệt chính giữa biểu thức và phương trình là gì?"
    },
    {
      id: "qa2",
      question: "In the mathematical term '5y', what do we call the number 5, and what do we call the letter y?",
      sampleAnswer: "The number 5 is the coefficient, and the letter y is the variable.",
      vnTranslation: "Trong hạng tử toán học '5y', chúng ta gọi số 5 là gì, và gọi chữ y là gì?"
    },
    {
      id: "qa3",
      question: "If you are asked to 'isolate the variable' when solving an equation, what exactly are you trying to do?",
      sampleAnswer: "You are trying to use math operations to get the letter completely by itself on one side of the equal sign.",
      vnTranslation: "Nếu bạn được yêu cầu 'cô lập biến số' khi giải phương trình, chính xác thì bạn đang cố gắng làm gì?"
    },
    {
      id: "qa4",
      question: "Why is it important to only combine 'like terms' in an expression?",
      sampleAnswer: "Because terms with different variables represent entirely different things (like apples and bananas), so they cannot be added together.",
      vnTranslation: "Tại sao việc chỉ kết hợp 'các hạng tử đồng dạng' trong một biểu thức lại quan trọng?"
    },
    {
      id: "qa5",
      question: "What does it mean to 'substitute' a number in algebra?",
      sampleAnswer: "It means to take a specific number and plug it into the expression wherever the variable (letter) is.",
      vnTranslation: "Việc 'thay thế' một số trong đại số có nghĩa là gì?"
    }
  ],

  assessment,
  games,
  notes
};