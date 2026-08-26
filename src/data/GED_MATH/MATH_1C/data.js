// src/data/GED_MATH/MATH_1C/data.js
//
// The third algebra unit: what MATH_1B taught, now with denominators in the way.
//
// The XP is deliberately weighted toward BALANCE (25) rather than WORKBOOK, and
// the balance deck runs to twenty equations. Isolating a variable is a habit,
// and the only thing that builds it is doing it — the task scores the SHARE of
// equations solved without a hint, so a long deck costs nothing and buys reps.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { balance } from './balance.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

// VALID TASK IDS: WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION,
// SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES, BALANCE

export const GED_MATH_1C_DATA = {
  meta: {
    id: "MATH_1C",
    title: "Equations with Fractions",
    desc: "Clear the denominators, expand the brackets, and balance your way to the answer — including fractions on both sides.",
    track: "GED_MATH",
    icon: "Calculator",
    themeColor: "bg-violet-500 border-violet-700"
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
        { id: "BALANCE", dbKey: "p14", maxXP: 25 },
        { id: "WORKBOOK", dbKey: "p11", maxXP: 15 }
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
    },
    {
      id: "arcade",
      title: "Arcade",
      threshold: 80,
      tasks: [
        { id: "GAMES", dbKey: "p12", maxXP: 0 }
      ]
    }
  ],

  realWords: [
    { word: "Denominator", vn: "Mẫu số", def: "The number underneath a fraction bar, which tells you how many parts the whole is split into.", vnDef: "Số nằm dưới gạch phân số, cho biết tổng thể được chia thành bao nhiêu phần.", sent: "To remove the fraction, multiply both sides by the denominator.", vnSent: "Để khử phân số, hãy nhân cả hai vế cho mẫu số.", isReal: true },
    { word: "Numerator", vn: "Tử số", def: "The expression written above a fraction bar.", vnDef: "Biểu thức được viết phía trên gạch phân số.", sent: "The whole numerator is divided, not just its first term.", vnSent: "Cả tử số bị chia, không chỉ riêng số hạng đầu tiên của nó.", isReal: true },
    { word: "Common Denominator", vn: "Mẫu số chung", def: "A number that every denominator in the problem divides into exactly.", vnDef: "Một số mà mọi mẫu số trong bài toán đều chia hết.", sent: "The common denominator of 2 and 3 is 6, so multiply by 6.", vnSent: "Mẫu số chung của 2 và 3 là 6, nên hãy nhân cho 6.", isReal: true },
    { word: "Clear", vn: "Khử", def: "To remove the fractions from an equation by multiplying both sides.", vnDef: "Loại bỏ các phân số khỏi phương trình bằng cách nhân cả hai vế.", sent: "Always clear the fractions before you try to collect the x terms.", vnSent: "Hãy luôn khử phân số trước khi bạn gom các số hạng x.", isReal: true },
    { word: "Expand", vn: "Khai triển", def: "To multiply out a bracket so that nothing is left inside it.", vnDef: "Nhân bung dấu ngoặc để không còn gì bên trong nó.", sent: "Expand 3(x - 2) carefully to get 3x - 6.", vnSent: "Hãy khai triển 3(x - 2) cẩn thận để được 3x - 6.", isReal: true },
    { word: "Isolate", vn: "Cô lập", def: "To get the variable alone on one side of the equation.", vnDef: "Đưa biến số đứng một mình ở một vế của phương trình.", sent: "Divide by the coefficient in order to isolate x.", vnSent: "Chia cho hệ số để cô lập x.", isReal: true },
    { word: "Coefficient", vn: "Hệ số", def: "The number multiplying the variable.", vnDef: "Số nhân với biến số.", sent: "In 4x the coefficient is 4, so divide both sides by 4.", vnSent: "Trong 4x, hệ số là 4, nên hãy chia cả hai vế cho 4.", isReal: true },
    { word: "Term", vn: "Số hạng", def: "One piece of an expression, separated from the others by a plus or minus sign.", vnDef: "Một phần của biểu thức, được ngăn cách với các phần khác bởi dấu cộng hoặc trừ.", sent: "Multiplying a side means multiplying every term of it.", vnSent: "Nhân một vế nghĩa là nhân mọi số hạng của vế đó.", isReal: true },
    { word: "Substitute", vn: "Thay vào", def: "To put a value in place of the variable.", vnDef: "Đặt một giá trị vào chỗ của biến số.", sent: "Substitute your answer into the original equation to check it.", vnSent: "Hãy thay đáp án của bạn vào phương trình ban đầu để kiểm tra.", isReal: true },
    { word: "Equivalent", vn: "Tương đương", def: "Describing two equations that have exactly the same solution.", vnDef: "Mô tả hai phương trình có nghiệm hoàn toàn giống nhau.", sent: "Multiplying both sides by 6 gives an equivalent equation with no fractions.", vnSent: "Nhân cả hai vế cho 6 cho ra một phương trình tương đương không có phân số.", isReal: true }
  ],

  // Source Analysis. The grader never sees the picture, so every mark scheme
  // below states what is in it — see docs/svg-diagrams.md §7.
  diagrams: [
    {
      id: "diag_1_spot_the_error",
      promptText: "Linh's four lines of working are shown. She was solving (x + 6)/4 = (x - 2)/2 and multiplied both sides by 4. Say which line is wrong, explain the mistake, and give the correct answer.",
      inlineSvg: DIAGRAMS.DIAGRAM_SPOT_THE_ERROR,
      suggestedWords: [["line 2", "second line"], ["bracket", "expand", "both terms"], ["10", "x = 10"]],
      modelAnswer: "Line 2 is wrong. Multiplying (x - 2)/2 by 4 gives 2(x - 2), and expanding that bracket gives 2x - 4, but Linh wrote 2x - 2. She multiplied the x by 2 and forgot to multiply the -2 as well. The correct line 2 is x + 6 = 2x - 4. Subtracting x gives 6 = x - 4, so x = 10, not the 8 she found.",
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies line 2 (x + 6 = 2x - 2) as the first wrong line.",
        "Explains that 2(x - 2) expands to 2x - 4, so the -2 inside the bracket was not multiplied.",
        "Gives the correct solution x = 10."
      ]
    },
    {
      id: "diag_2_two_routes",
      promptText: "Two students solved x/2 + 3 = x/5 + 6. An multiplied by 10 first; Bao subtracted 3 first and then multiplied by 10. Both reached x = 10. Explain why both routes are correct, and say which you would use.",
      inlineSvg: DIAGRAMS.DIAGRAM_TWO_ROUTES,
      suggestedWords: [["both sides", "same to both"], ["balanced", "still true", "equivalent"], ["order", "either", "any"]],
      modelAnswer: "Both students are correct because both only ever did the same thing to both sides of the equation. An multiplied both sides by 10 straight away and got 5x + 30 = 2x + 60. Bao first subtracted 3 from both sides to get x/2 = x/5 + 3, then multiplied both sides by 10 to get 5x = 2x + 30. Every one of those moves keeps the two sides equal, so the equation still has the same solution, and both finish at x = 10. There is no single required order. I would clear the fractions first, like An, because after that every remaining step is done with whole numbers.",
      scienceMaxMarks: 3,
      markScheme: [
        "States that both are correct because each step was applied to both sides, keeping the equation balanced.",
        "Describes both routes: An multiplies by 10 first, Bao subtracts 3 first and multiplies by 10 afterwards.",
        "States a preference with a reason, such as clearing first because the later steps then use whole numbers."
      ]
    },
    {
      id: "diag_3_split_the_bill",
      promptText: "On Friday a bill of $x is shared by 3 friends. On Saturday the bill is $20 more and is shared by 5 friends, and each person pays the same as on Friday. Write the equation this describes, solve it, and say what each person paid.",
      inlineSvg: DIAGRAMS.DIAGRAM_SPLIT_THE_BILL,
      suggestedWords: [["x/3"], ["(x+20)/5", "x + 20"], ["30"], ["10"]],
      modelAnswer: "On Friday each of the 3 friends pays x/3. On Saturday the bill is x + 20 shared by 5 friends, so each pays (x + 20)/5. The two amounts are equal, which gives the equation x/3 = (x + 20)/5. The lowest common denominator of 3 and 5 is 15, so multiplying both sides by 15 gives 5x = 3(x + 20), which expands to 5x = 3x + 60. Subtracting 3x gives 2x = 60, so x = 30. Checking: 30/3 = 10 and 50/5 = 10, so each person paid $10 on both nights.",
      scienceMaxMarks: 3,
      markScheme: [
        "Writes the equation x/3 = (x + 20)/5 from the two situations shown.",
        "Clears the fractions correctly, reaching 5x = 3(x + 20) or 5x = 3x + 60.",
        "States that the Friday bill was $30 and that each person paid $10."
      ]
    }
  ],

  assessment,
  games,
  notes,
  workbook,
  balance
};
