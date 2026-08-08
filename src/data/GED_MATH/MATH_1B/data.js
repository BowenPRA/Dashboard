// src/data/GED_MATH/MATH_1B/data.js
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { balance } from './balance.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

// VALID TASK IDS: WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION,
// SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES

export const GED_MATH_1B_DATA = {
  meta: {
    id: "MATH_1B",
    title: "Linear Equations & Inequalities",
    desc: "Solve multi-step equations, work with inequality symbols, and show solution sets on a number line.",
    track: "GED_MATH",
    icon: "Calculator",
    themeColor: "bg-blue-500 border-blue-700"
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
    { word: "Inequality", vn: "Bất đẳng thức", def: "A math statement showing that two sides are not equal, using signs like < or >.", vnDef: "Một mệnh đề toán học cho thấy hai vế không bằng nhau, sử dụng các dấu như < hoặc >.", sent: "The inequality x > 5 means x can be any number larger than five.", vnSent: "Bất đẳng thức x > 5 có nghĩa là x có thể là bất kỳ số nào lớn hơn năm.", isReal: true },
    { word: "Solution", vn: "Nghiệm", def: "Any value of the variable that makes the statement true.", vnDef: "Bất kỳ giá trị nào của biến số làm cho mệnh đề trở thành đúng.", sent: "We found that x = 4 is the solution to the equation.", vnSent: "Chúng tôi tìm ra rằng x = 4 là nghiệm của phương trình.", isReal: true },
    { word: "Inverse", vn: "Phép tính ngược", def: "The opposite operation, used to undo something in an equation.", vnDef: "Phép toán ngược lại, được dùng để khử một phép tính trong phương trình.", sent: "Subtraction is the inverse of addition, so we subtract to undo it.", vnSent: "Phép trừ là phép tính ngược của phép cộng, nên chúng ta trừ để khử nó.", isReal: true },
    { word: "Balance", vn: "Cân bằng", def: "Keeping both sides of an equation equal by doing the same thing to each side.", vnDef: "Giữ cho hai vế của phương trình bằng nhau bằng cách làm điều tương tự với mỗi vế.", sent: "To keep the balance, whatever you do to one side you must do to the other.", vnSent: "Để giữ cân bằng, bạn làm gì với một vế thì phải làm điều đó với vế kia.", isReal: true },
    { word: "Number Line", vn: "Trục số", def: "A straight line used to show numbers in order and to picture a solution set.", vnDef: "Một đường thẳng dùng để biểu diễn các số theo thứ tự và hình dung tập nghiệm.", sent: "Draw the solution on a number line so you can see every possible answer.", vnSent: "Hãy vẽ nghiệm trên trục số để bạn có thể thấy mọi đáp án có thể có.", isReal: true },
    { word: "Boundary", vn: "Điểm biên", def: "The number at the edge of a solution set, marked by an open or closed circle.", vnDef: "Con số ở rìa của tập nghiệm, được đánh dấu bằng vòng tròn rỗng hoặc đặc.", sent: "The boundary is 2, but an open circle shows that 2 itself is not included.", vnSent: "Điểm biên là 2, nhưng vòng tròn rỗng cho thấy chính số 2 không được bao gồm.", isReal: true },
    { word: "Reverse", vn: "Đảo chiều", def: "To flip the direction of an inequality sign.", vnDef: "Đổi ngược hướng của dấu bất đẳng thức.", sent: "You must reverse the sign when you divide both sides by a negative number.", vnSent: "Bạn phải đảo chiều dấu khi chia cả hai vế cho một số âm.", isReal: true },
    { word: "Compound", vn: "Kép", def: "Describing an inequality that puts a value between two limits at once.", vnDef: "Mô tả một bất đẳng thức đặt một giá trị nằm giữa hai giới hạn cùng một lúc.", sent: "The compound inequality 2 < x < 6 traps x between two and six.", vnSent: "Bất đẳng thức kép 2 < x < 6 giữ x nằm giữa hai và sáu.", isReal: true },
    { word: "Constraint", vn: "Ràng buộc", def: "A real-world limit, such as a budget or a maximum weight.", vnDef: "Một giới hạn trong thực tế, chẳng hạn như ngân sách hoặc trọng lượng tối đa.", sent: "Her budget of fifty dollars is the constraint on how much she can buy.", vnSent: "Ngân sách năm mươi đô la của cô ấy là ràng buộc về số lượng cô ấy có thể mua.", isReal: true },
    { word: "Verify", vn: "Kiểm chứng", def: "To check an answer by substituting it back into the original problem.", vnDef: "Kiểm tra một đáp án bằng cách thay nó trở lại vào bài toán ban đầu.", sent: "Always verify your answer by putting it back into the equation.", vnSent: "Luôn kiểm chứng đáp án của bạn bằng cách thay nó trở lại vào phương trình.", isReal: true }
  ],

  passages: [
    {
      id: "passage_1",
      title: "Keeping the Scale Balanced",
      vnTitle: "Giữ Cho Cân Thăng Bằng",
      meta: "Core Concept",
      text: [
        "The easiest way to picture an equation is as an old-fashioned weighing scale. The equal sign is the middle post, and both pans must hold the same weight. If you remove three kilograms from the left pan and nothing from the right, the scale tips over and the {balance} is destroyed.",
        "This is the single most important rule in algebra. Whatever you do to one side of an equation, you must do to the other. When we want to remove a number, we use the {inverse} operation: addition undoes subtraction, and division undoes multiplication.",
        "Consider 2x + 3 = 11. First subtract 3 from both sides to get 2x = 8. Then divide both sides by 2, leaving x = 4. To be certain, {verify} the answer by putting 4 back in: 2(4) + 3 really does equal 11, so the {solution} is correct."
      ].join(" "),
      vnText: [
        "Cách dễ nhất để hình dung một phương trình là xem nó như một chiếc cân thăng bằng kiểu cũ. Dấu bằng là trụ giữa, và cả hai đĩa cân phải chứa cùng một trọng lượng. Nếu bạn lấy đi ba ki-lô-gam từ đĩa bên trái và không lấy gì từ đĩa bên phải, chiếc cân sẽ nghiêng và sự cân bằng bị phá vỡ.",
        "Đây là quy tắc quan trọng nhất trong đại số. Bạn làm gì với một vế của phương trình thì phải làm điều đó với vế kia. Khi muốn khử một số, chúng ta dùng phép tính ngược: phép cộng khử phép trừ, và phép chia khử phép nhân.",
        "Hãy xét 2x + 3 = 11. Đầu tiên trừ 3 ở cả hai vế để được 2x = 8. Sau đó chia cả hai vế cho 2, còn lại x = 4. Để chắc chắn, hãy kiểm chứng đáp án bằng cách thay 4 trở lại: 2(4) + 3 quả thật bằng 11, vậy nghiệm là đúng."
      ].join(" "),
      glossary: {
        "balance": { vn: "Cân bằng", def: "Keeping both sides of an equation equal." },
        "inverse": { vn: "Phép tính ngược", def: "The opposite operation, used to undo something." },
        "verify": { vn: "Kiểm chứng", def: "To check an answer by substituting it back." },
        "solution": { vn: "Nghiệm", def: "A value that makes the statement true." }
      }
    },
    {
      id: "passage_2",
      title: "When One Answer Is Not Enough",
      vnTitle: "Khi Một Đáp Án Là Chưa Đủ",
      meta: "Inequalities",
      text: [
        "An equation usually has exactly one answer. An {inequality} is different: it can have thousands of answers at once. The statement x > 5 is true for 6, for 5.1, and for 900. Because we cannot list them all, we draw them on a {number line} instead.",
        "The number at the edge of the shaded region is called the {boundary}. How we draw it matters a great deal. An open circle means the boundary number is not a solution, which is what we use for < and >. A filled circle means it is included, which is what we use for the 'at most' and 'at least' signs.",
        "One rule surprises almost every student. If you multiply or divide both sides by a negative number, you must {reverse} the direction of the sign. Solving −2x < 8 gives x > −4, not x < −4. Test it with −3 and you will see that the flipped sign is the one that tells the truth."
      ].join(" "),
      vnText: [
        "Một phương trình thường có đúng một đáp án. Bất đẳng thức thì khác: nó có thể có hàng nghìn đáp án cùng một lúc. Mệnh đề x > 5 đúng với 6, với 5,1, và với 900. Vì chúng ta không thể liệt kê hết, thay vào đó chúng ta vẽ chúng trên trục số.",
        "Con số ở rìa của vùng được tô đậm được gọi là điểm biên. Cách chúng ta vẽ nó rất quan trọng. Vòng tròn rỗng có nghĩa là số ở biên không phải là nghiệm, đó là cách dùng cho dấu < và >. Vòng tròn đặc có nghĩa là nó được bao gồm, đó là cách dùng cho các dấu 'nhiều nhất' và 'ít nhất'.",
        "Một quy tắc khiến hầu hết học sinh ngạc nhiên. Nếu bạn nhân hoặc chia cả hai vế cho một số âm, bạn phải đảo chiều hướng của dấu. Giải −2x < 8 cho ra x > −4, chứ không phải x < −4. Hãy thử với −3 và bạn sẽ thấy dấu đã đảo chiều mới là dấu nói đúng sự thật."
      ].join(" "),
      glossary: {
        "inequality": { vn: "Bất đẳng thức", def: "A statement that two sides are not equal." },
        "number line": { vn: "Trục số", def: "A line used to picture a solution set." },
        "boundary": { vn: "Điểm biên", def: "The number at the edge of a solution set." },
        "reverse": { vn: "Đảo chiều", def: "To flip the direction of an inequality sign." }
      }
    },
    {
      id: "passage_3",
      title: "Inequalities on the Job",
      vnTitle: "Bất Đẳng Thức Trong Công Việc",
      meta: "Real-World Application",
      text: [
        "On the GED exam, inequalities rarely appear as bare symbols. They arrive hidden inside sentences about money, weight and time. Learning to hear the signal words is half the work. 'At most', 'no more than' and 'maximum' all mean the same thing, and all translate to the sign ≤.",
        "Imagine a delivery van that can legally carry no more than 900 kilograms. The van itself already carries 150 kilograms of equipment, and each box weighs 25 kilograms. That legal limit is a {constraint}, and it becomes the inequality 150 + 25b ≤ 900.",
        "Solving gives b ≤ 30, so thirty boxes is the limit. Notice the last step that exams love to test: you cannot load half a box, so a fractional answer must be rounded down to a whole number. A {compound} statement such as 2 ≤ t ≤ 8 works the same way, describing a temperature that must stay inside a safe range."
      ].join(" "),
      vnText: [
        "Trong kỳ thi GED, bất đẳng thức hiếm khi xuất hiện dưới dạng ký hiệu trần trụi. Chúng ẩn mình trong những câu văn về tiền bạc, trọng lượng và thời gian. Học cách nghe ra các từ khóa tín hiệu đã là một nửa công việc. 'Nhiều nhất', 'không quá' và 'tối đa' đều có cùng ý nghĩa, và đều được dịch thành dấu ≤.",
        "Hãy tưởng tượng một chiếc xe tải giao hàng chỉ được phép chở không quá 900 ki-lô-gam. Bản thân chiếc xe đã chở 150 ki-lô-gam thiết bị, và mỗi thùng hàng nặng 25 ki-lô-gam. Giới hạn pháp lý đó là một ràng buộc, và nó trở thành bất đẳng thức 150 + 25b ≤ 900.",
        "Giải ra được b ≤ 30, vậy ba mươi thùng là giới hạn. Hãy chú ý bước cuối cùng mà các kỳ thi rất thích kiểm tra: bạn không thể chất nửa thùng hàng, nên đáp án là phân số phải được làm tròn xuống thành số nguyên. Một mệnh đề kép như 2 ≤ t ≤ 8 cũng hoạt động tương tự, mô tả một nhiệt độ phải nằm trong khoảng an toàn."
      ].join(" "),
      glossary: {
        "constraint": { vn: "Ràng buộc", def: "A real-world limit such as a budget or maximum weight." },
        "compound": { vn: "Kép", def: "An inequality placing a value between two limits." }
      }
    }
  ],

  shortQA: [


    {
      id: "qa3",
      question: "Solve 4x + 5 = 29 and describe each step you took.",
      suggestedWords: [["subtract", "minus", "take away"], ["divide"], ["6"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Subtracts 5 from both sides to get 4x = 24.",
        "Divides both sides by 4.",
        "States the final answer x = 6."
      ],
      modelAnswer: "First subtract 5 from both sides, which gives 4x = 24. Then divide both sides by 4. The final answer is x = 6.",
      vnTranslation: "Giải 4x + 5 = 29 và mô tả từng bước bạn đã thực hiện."
    },
    {
      id: "qa4",
      question: "Explain the difference between an open circle and a closed circle on a number line.",
      suggestedWords: [["open", "empty", "hollow"], ["closed", "filled", "solid"], ["included", "include", "part of"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that an open (empty) circle means the boundary number is not included.",
        "States that a closed (filled) circle means the boundary number is included."
      ],
      modelAnswer: "An open circle means the boundary number is not part of the solution, which we use for < and >. A closed circle means the boundary number is included, which we use for ≤ and ≥.",
      vnTranslation: "Giải thích sự khác biệt giữa vòng tròn rỗng và vòng tròn đặc trên trục số."
    },
    {
      id: "qa5",
      question: "When solving an inequality, which operation forces you to reverse the direction of the sign, and which common operation does NOT reverse it?",
      suggestedWords: [["negative"], ["multiply", "divide"], ["reverse", "flip", "switch"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that the sign flips when multiplying or dividing both sides by a negative number.",
        "Notes that adding or subtracting a negative does not flip the sign."
      ],
      modelAnswer: "You reverse the sign whenever you multiply or divide both sides by a negative number. Adding or subtracting a negative number does not flip the sign.",
      vnTranslation: "Khi giải bất đẳng thức, phép toán nào buộc bạn phải đảo chiều dấu bất đẳng thức, và phép toán phổ biến nào KHÔNG làm đảo chiều dấu?"
    },
    {
      id: "qa6",
      question: "Solve the inequality -3x < 12 and explain what happens to the sign.",
      suggestedWords: [["divide"], ["negative"], ["x > -4", "x>-4", "greater than -4"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Divides both sides by -3.",
        "Reverses the inequality sign because the divisor is negative.",
        "States the correct solution x > -4."
      ],
      modelAnswer: "Divide both sides by -3. Because -3 is negative, the sign reverses from < to >. The solution is x > -4.",
      vnTranslation: "Giải bất đẳng thức -3x < 12 và giải thích điều gì xảy ra với dấu."
    },

    {
      id: "qa8",
      question: "Mai has $60. A bus pass costs $15 and each lunch costs $6. Write an inequality for the number of lunches (L) she can buy, then solve it.",
      suggestedWords: [["15"], ["6"], ["60"], ["7"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Writes the inequality 15 + 6L ≤ 60.",
        "Solves correctly to reach L ≤ 7.5.",
        "Rounds down to a whole number, concluding she can buy at most 7 lunches."
      ],
      modelAnswer: "The inequality is 15 + 6L ≤ 60. Subtracting 15 from both sides gives 6L ≤ 45, and dividing by 6 gives L ≤ 7.5. Because she cannot buy part of a lunch, she can buy at most 7 lunches.",
      vnTranslation: "Mai có 60 đô la. Một vé xe buýt giá 15 đô la và mỗi bữa trưa giá 6 đô la. Hãy viết một bất đẳng thức cho số bữa trưa (L) cô ấy có thể mua, sau đó giải nó."
    },

    {
      id: "qa10",
      question: "Why is it useful to verify your solution by substituting it back into the original equation?",
      suggestedWords: [["substitute", "put back", "plug in"], ["check", "verify", "correct"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Explains that substituting the answer back tests whether both sides come out equal.",
        "Notes that this catches arithmetic mistakes made during the solving steps."
      ],
      modelAnswer: "Substituting your answer back into the original equation shows whether both sides really are equal. If they match, the answer is correct; if they do not, you know a mistake was made in one of the steps and can find it.",
      vnTranslation: "Tại sao việc kiểm chứng nghiệm bằng cách thay nó trở lại vào phương trình ban đầu lại hữu ích?"
    }
  ],

  diagrams: [
    {
      id: "diag_1_number_line",
      promptText: "Look at the number line shown. Write the inequality it represents and explain how the circle tells you which sign to use.",
      inlineSvg: DIAGRAMS.DIAGRAM_NUMBER_LINE_SOLUTION,
      suggestedWords: [["open", "empty", "hollow"], ["boundary", "-2"], ["greater than", ">"]],
      modelAnswer: "The shading starts at -2 and continues to the right, so the solution is every number greater than -2. The circle at -2 is open, which means -2 itself is not included, so the correct inequality is x > -2 rather than x ≥ -2.",
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies the boundary number as -2.",
        "States that the open circle means -2 is not included.",
        "Writes the correct inequality x > -2."
      ]
    },
    {
      id: "diag_2_compound_range",
      promptText: "Describe the range of values shaded on this number line. Write it as a compound inequality and explain both circles.",
      inlineSvg: DIAGRAMS.DIAGRAM_COMPOUND_RANGE,
      suggestedWords: [["compound", "between"], ["closed", "filled", "included"], ["open", "not included"]],
      modelAnswer: "The shading runs from 1 to 4. The circle at 1 is filled, so 1 is included, and the circle at 4 is open, so 4 is not. Written as a compound inequality this is 1 ≤ x < 4.",
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies the two boundary numbers as 1 and 4.",
        "Explains that the filled circle includes 1 while the open circle excludes 4.",
        "Writes the correct compound inequality 1 ≤ x < 4."
      ]
    },
    {
      id: "diag_3_budget",
      promptText: "Read the budget situation in the diagram. Write an inequality for the number of lunches Mai can buy, solve it, and state your final answer as a whole number.",
      inlineSvg: DIAGRAMS.DIAGRAM_WORD_PROBLEM_BUDGET,
      suggestedWords: [["inequality", "≤", "<="], ["constraint", "60", "budget"], ["7"]],
      modelAnswer: "Her spending must stay within $60, so the inequality is 15 + 6L ≤ 60. Subtracting 15 gives 6L ≤ 45, and dividing by 6 gives L ≤ 7.5. Since she cannot buy part of a lunch, the answer must be rounded down: Mai can buy at most 7 lunches.",
      scienceMaxMarks: 3,
      markScheme: [
        "Writes a correct inequality such as 15 + 6L ≤ 60.",
        "Solves it correctly to L ≤ 7.5.",
        "Rounds down and states the final answer of 7 lunches."
      ]
    },

  ],

  assessment,
  games,
  notes,
  workbook,
  balance
};
