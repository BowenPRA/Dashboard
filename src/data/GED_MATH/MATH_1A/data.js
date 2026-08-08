import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { balance } from './balance.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

// VALID TASK IDS FOR AI CONTEXT: 
// WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION, SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES

export const GED_MATH_1A_DATA = {
  meta: {
    id: "MATH_1A",
    title: "Algebraic Expressions & Equations",
    desc: "Master the language of algebra, translate real-world word problems, and solve basic equations.",
    track: "GED_MATH",
    icon: "Calculator",
    themeColor: "bg-emerald-500 border-emerald-700"
  },
  
  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 }
      ]
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      tasks: [
        { id: "WORKBOOK", dbKey: "p11", maxXP: 25 },
        { id: "BALANCE", dbKey: "p14", maxXP: 15 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 }
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

  passages: [
    {
      id: "passage_1",
      title: "Algebra at the Coffee Shop",
      vnTitle: "Đại số tại Quán Cà phê",
      meta: "Real-World Application",
      text: [
        "Many people use algebra every day without realizing it. Imagine you are working at a local coffee shop. A regular black coffee costs $3. If a customer comes in and orders a certain number of coffees for their office, you can use an {expression} to quickly calculate the total price.",
        "In math, we use a {variable}, like the letter 'c', to represent the unknown number of coffees. The math phrase becomes 3c. In this phrase, the number 3 is the {coefficient}.",
        "If a customer orders 4 coffees, you simply {substitute} the number 4 into the place of 'c'. Finally, you {evaluate} the cost: 3 times 4 equals $12."
      ].join(" "),
      vnText: [
        "Nhiều người sử dụng đại số mỗi ngày mà không nhận ra. Hãy tưởng tượng bạn đang làm việc tại một quán cà phê địa phương. Một ly cà phê đen bình thường có giá 3 đô la. Nếu một khách hàng bước vào và đặt một số lượng cà phê nhất định cho văn phòng của họ, bạn có thể sử dụng một biểu thức để nhanh chóng tính tổng giá.",
        "Trong toán học, chúng ta sử dụng một biến số, giống như chữ 'c', để đại diện cho số lượng cà phê chưa biết. Cụm từ toán học trở thành 3c. Trong cụm từ này, số 3 là hệ số.",
        "Nếu một khách hàng đặt 4 ly cà phê, bạn chỉ cần thay thế số 4 vào vị trí của 'c'. Cuối cùng, bạn tính giá trị chi phí: 3 nhân 4 bằng 12 đô la."
      ].join(" "),
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
      vnTitle: "Quy tắc Vàng của Sự Cân bằng",
      meta: "Understanding Equations",
      text: [
        "While an expression is just a phrase, an {equation} is a complete mathematical sentence. The most important part is the equal sign. Think of an equal sign like a perfectly balanced scale.",
        "Your main goal is to {isolate} the unknown variable so it sits all by itself on one side of the scale. To do this, you have to move numbers away from it using inverse (opposite) operations.",
        "However, you must follow the Golden Rule: Whatever you do to the left side, you must also do to the right side. If you add 5 pounds to the left, you must add 5 pounds to the right to keep the balance."
      ].join(" "),
      vnText: [
        "Trong khi biểu thức chỉ là một cụm từ, phương trình là một câu toán học hoàn chỉnh. Phần quan trọng nhất là dấu bằng. Hãy coi dấu bằng như một chiếc cân cân bằng hoàn hảo.",
        "Mục tiêu chính của bạn là cô lập biến số chưa biết để nó nằm một mình ở một bên của chiếc cân. Để làm điều này, bạn phải di chuyển các con số ra khỏi nó bằng cách sử dụng các phép toán nghịch đảo (ngược lại).",
        "Tuy nhiên, bạn phải tuân theo Quy tắc Vàng: Bất cứ điều gì bạn làm với vế trái, bạn cũng phải làm với vế phải. Nếu bạn thêm 5 pound vào bên trái, bạn phải thêm 5 pound vào bên phải để giữ thăng bằng."
      ].join(" "),
      glossary: {
        "equation": { vn: "Phương trình", def: "A math statement showing two equal sides." },
        "isolate": { vn: "Cô lập", def: "To get a variable completely by itself." }
      }
    },
    {
      id: "passage_3",
      title: "Organizing the Warehouse",
      vnTitle: "Sắp xếp Nhà kho",
      meta: "Simplifying Math",
      text: [
        "Imagine you manage a large fruit warehouse. You have boxes of apples and boxes of bananas. If someone asks for your inventory, you wouldn't say, 'I have 2 boxes of apples, 3 boxes of bananas, and 4 more boxes of apples.' That is too confusing.",
        "Instead, you would {combine} the apples together. You now have 6 boxes of apples and 3 boxes of bananas.",
        "In algebra, this is called combining like terms. You can only group a {term} with another term if they have the exact same variable. You can add 'x' with 'x', but you can never add 'x' with 'y'."
      ].join(" "),
      vnText: [
        "Hãy tưởng tượng bạn quản lý một kho trái cây lớn. Bạn có những hộp táo và những hộp chuối. Nếu ai đó hỏi về hàng tồn kho của bạn, bạn sẽ không nói, 'Tôi có 2 hộp táo, 3 hộp chuối và thêm 4 hộp táo nữa.' Điều đó quá khó hiểu.",
        "Thay vào đó, bạn sẽ kết hợp những quả táo lại với nhau. Bây giờ bạn có 6 hộp táo và 3 hộp chuối.",
        "Trong đại số, điều này được gọi là kết hợp các hạng tử đồng dạng. Bạn chỉ có thể nhóm một hạng tử với một hạng tử khác nếu chúng có chính xác cùng một biến số. Bạn có thể cộng 'x' với 'x', nhưng bạn không bao giờ có thể cộng 'x' với 'y'."
      ].join(" "),
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
      suggestedWords: [["expression"], ["equation"], ["equal sign", "equals sign", "equal"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that an expression has no equal sign (it is just a maths phrase).",
        "States that an equation has an equal sign."
      ],
      modelAnswer: "An expression is a math phrase with no equal sign, while an equation has an equal sign showing that two sides are balanced.",
      vnTranslation: "Sự khác biệt chính giữa biểu thức và phương trình là gì?"
    },


    {
      id: "qa4",
      question: "What makes two terms 'like terms', and why can you only combine like terms in an expression?",
      suggestedWords: [["like terms", "same variable"], ["different", "unlike", "cannot"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that like terms have the same variable.",
        "Explains that terms with different variables represent different quantities, so they cannot be added together."
      ],
      modelAnswer: "Like terms have exactly the same variable, so they count the same kind of thing. Terms with different variables represent entirely different things, like apples and bananas, so they cannot be added together.",
      vnTranslation: "Điều gì làm cho hai hạng tử trở thành 'hạng tử đồng dạng', và tại sao bạn chỉ có thể kết hợp các hạng tử đồng dạng trong một biểu thức?"
    },

    {
      id: "qa6",
      question: "A plumber charges a $50 flat service fee plus $25 per hour of work. If the total bill was $150, which equation can be used to find the number of hours (h) he worked?",
      suggestedWords: [["50"], ["25"], ["150"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Uses 50 as a constant flat fee that is added once.",
        "Uses 25h (the hourly rate multiplied by the number of hours).",
        "Sets the whole expression equal to the total of 150."
      ],
      modelAnswer: "The equation is 50 + 25h = 150. You start with the flat fee of $50, then add $25 multiplied by the number of hours (h), and set it equal to the total bill of $150.",
      vnTranslation: "Một thợ sửa ống nước tính phí dịch vụ cố định là 50 đô la cộng với 25 đô la cho mỗi giờ làm việc. Nếu tổng hóa đơn là 150 đô la, phương trình nào có thể được sử dụng để tìm số giờ (h) anh ta đã làm việc?"
    },
    {
      id: "qa7",
      question: "Evaluate the algebraic expression 4x² - 3y when x = 3 and y = 5.",
      suggestedWords: [["substitute", "replace", "plug in"], ["21"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Substitutes x = 3 and y = 5 into the expression correctly.",
        "Applies the exponent before multiplying, so 3² = 9 and 4 × 9 = 36.",
        "Reaches the correct final answer of 21."
      ],
      modelAnswer: "Substitute the values to get 4(3)² - 3(5). Calculate the exponent first: 3² = 9. Then multiply: 4 × 9 = 36 and 3 × 5 = 15. Finally subtract: 36 - 15 = 21.",
      vnTranslation: "Tính giá trị biểu thức đại số 4x² - 3y khi x = 3 và y = 5."
    },

    {
      id: "qa9",
      question: "Solve the equation for x: 3x - 12 = 24. What are the steps?",
      suggestedWords: [["inverse", "opposite", "both sides"], ["12"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Adds 12 to both sides to get 3x = 36.",
        "Divides both sides by 3 to undo the multiplication.",
        "States the final answer x = 12."
      ],
      modelAnswer: "First use the inverse of subtraction by adding 12 to both sides, which gives 3x = 36. Then use the inverse of multiplication by dividing both sides by 3. The final answer is x = 12.",
      vnTranslation: "Giải phương trình tìm x: 3x - 12 = 24. Các bước thực hiện là gì?"
    },
    {
      id: "qa10",
      question: "Simplify the expression by using the distributive property: -4(2x - 5).",
      suggestedWords: [["distribute", "distributive"], ["-8x + 20", "-8x+20"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Multiplies -4 by 2x to get -8x.",
        "Multiplies -4 by -5 and recognises that a negative times a negative gives positive 20.",
        "Writes the fully simplified expression -8x + 20."
      ],
      modelAnswer: "Multiply the outside term (-4) by each term inside the parentheses. -4 times 2x is -8x. -4 times -5 is +20, because a negative times a negative is a positive. The simplified expression is -8x + 20.",
      vnTranslation: "Rút gọn biểu thức bằng cách sử dụng tính chất phân phối: -4(2x - 5)."
    }
  ],
  
  diagrams: [
    {
      id: "diag_1_number_line",
      promptText: "Analyze the number line provided. Identify the coordinates of Point A and Point B, and calculate the exact distance between them. Explain your steps.",
      inlineSvg: DIAGRAMS.DIAGRAM_NUMBER_LINE,
      suggestedWords: [["distance", "khoảng cách"], ["absolute value", "giá trị tuyệt đối"], ["subtract", "trừ"], "five"],
      modelAnswer: "Point A is located at -2 and Point B is located at 3. To find the distance between them, we can subtract the coordinates and take the absolute value: |3 - (-2)| = |5| = 5. The distance is 5 units.",
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies Point A is at -2.",
        "Identifies Point B is at 3.",
        "Calculates the correct distance of 5 units."
      ]
    },
    {
      id: "diag_2_coordinate_plane",
      promptText: "Examine the coordinate plane. Identify the y-intercept of the graphed line and explain what the y-intercept represents in a coordinate system.",
      inlineSvg: DIAGRAMS.DIAGRAM_COORDINATE_PLANE,
      suggestedWords: [["y-intercept", "tung độ gốc"], ["axis", "trục"], "crosses", "zero"],
      modelAnswer: "The y-intercept is the point where the line crosses the vertical y-axis. Looking at the graph, the line crosses the y-axis at the point (0, 2), making the y-intercept 2.",
      scienceMaxMarks: 2,
      markScheme: [
        "States that the y-intercept is where the line crosses the y-axis.",
        "Correctly identifies the y-intercept value as 2 or the point as (0, 2)."
      ]
    },
    {
      id: "diag_3_inequality",
      promptText: "Analyze the inequality graphed on the number line. Determine the inequality expression it represents and explain the significance of the open circle and the direction of the arrow.",
      inlineSvg: DIAGRAMS.DIAGRAM_INEQUALITY,
      suggestedWords: [["inequality", "bất phương trình"], ["open circle", "vòng tròn mở"], "less than", "four"],
      modelAnswer: "The graph represents the inequality x < 4. The open circle at 4 indicates that the number 4 is not included in the solution. The shaded arrow points to the left, meaning all numbers less than 4 are solutions.",
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies the correct inequality as x < 4.",
        "Explains that the open circle means 4 is not included.",
        "Explains that the left-pointing arrow indicates values less than 4."
      ]
    },


  ],

  assessment,
  games,
  notes,
  workbook,
  balance
};