import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_intercept",
      type: "mcq",
      title: "1. Look at the linear equation: $$y = -3x + 4$$. What is the y-intercept of the line graphed by this equation?",
      options: [
        { val: "A", text: "A. -3" },
        { val: "B", text: "B. 3" },
        { val: "C", text: "C. 4" },
        { val: "D", text: "D. -4" }
      ],
      correct: "C",
      expEn: "In the slope-intercept form $$y = mx + b$$, the variable b represents the y-intercept. Here, b is positive 4.",
      expVn: "Trong dạng hệ số góc - tung độ gốc $$y = mx + b$$, biến b đại diện cho tung độ gốc. Ở đây, b là dương 4."
    },
    {
      id: "q2_inline_definitions",
      type: "inline",
      title: "2. Complete the sentences to define the parts of a linear equation.",
      options: [],
      textParts: [
        "In the equation $$y = mx + b$$, the letter m represents the ",
        ", which describes the steepness of the line. The letter b represents the ",
        ", which is the exact point where the line crosses the vertical axis."
      ],
      blanks: {
        "1": {
          correct: "slope",
          options: [
            { val: "slope", text: "slope" },
            { val: "variable", text: "variable" },
            { val: "constant", text: "constant" }
          ]
        },
        "2": {
          correct: "y-intercept",
          options: [
            { val: "x-intercept", text: "x-intercept" },
            { val: "y-intercept", text: "y-intercept" }
          ]
        }
      },
      expEn: "The slope (m) is the rate of change. The y-intercept (b) is the starting value on the y-axis.",
      expVn: "Hệ số góc (m) là tốc độ thay đổi. Tung độ gốc (b) là giá trị bắt đầu trên trục y."
    },
    {
      id: "q3_mcq_graph_analysis",
      type: "mcq",
      title: "3. Analyze the graph below. What is the equation of this line?",
      inlineSvg: DIAGRAMS.ASSESSMENT_GRAPH_LINE,
      options: [
        { val: "A", text: "A. y = x + 1" },
        { val: "B", text: "B. y = 2x + 1" },
        { val: "C", text: "C. y = 1/2x + 1" },
        { val: "D", text: "D. y = 2x - 1" }
      ],
      correct: "B",
      expEn: "The line crosses the y-axis at +1 (the y-intercept). It goes up 2 units for every 1 unit it moves to the right, meaning the slope is 2. Thus, $$y = 2x + 1$$.",
      expVn: "Đường thẳng cắt trục y tại +1 (tung độ gốc). Nó đi lên 2 đơn vị cho mỗi 1 đơn vị di chuyển sang phải, nghĩa là hệ số góc bằng 2. Do đó, $$y = 2x + 1$$."
    },
    {
      id: "q4_dnd_solve_equation",
      type: "dnd",
      title: "4. Drag the correct algebraic steps in order from top to bottom to solve the equation: $$2x + 5 = 15$$.",
      options: [],
      bank: [
        { id: "s1", val: "Subtract 5", text: "Subtract 5 from both sides" },
        { id: "s2", val: "Divide 2", text: "Divide both sides by 2" },
        { id: "s3", val: "Add 5", text: "Add 5 to both sides" },
        { id: "s4", val: "Multiply 2", text: "Multiply both sides by 2" }
      ],
      targets: [
        { id: "step1", title: "Step 1" },
        { id: "step2", title: "Step 2" }
      ],
      correctSets: {
        "step1": ["Subtract 5"],
        "step2": ["Divide 2"]
      },
      expEn: "First, isolate the variable term by subtracting 5 to get $$2x = 10$$. Then, isolate x by dividing by 2 to get $$x = 5$$.",
      expVn: "Đầu tiên, cô lập số hạng chứa biến bằng cách trừ đi 5 để được $$2x = 10$$. Sau đó, cô lập x bằng cách chia cho 2 để được $$x = 5$$."
    },
    {
      id: "q5_mcq_evaluate",
      type: "mcq",
      title: "5. Evaluate the expression $$3x^2 - 2y$$ when $$x = 2$$ and $$y = 5$$.",
      options: [
        { val: "A", text: "A. 2" },
        { val: "B", text: "B. 22" },
        { val: "C", text: "C. -4" },
        { val: "D", text: "D. 12" }
      ],
      correct: "A",
      expEn: "Substitute the values: $$3(2)^2 - 2(5)$$. According to order of operations (PEMDAS), calculate the exponent first ($$2^2 = 4$$). Then multiply: $$3(4) - 10$$. Finally subtract: $$12 - 10 = 2$$.",
      expVn: "Thay các giá trị vào: $$3(2)^2 - 2(5)$$. Theo thứ tự thực hiện phép tính (PEMDAS), tính lũy thừa trước ($$2^2 = 4$$). Sau đó nhân: $$3(4) - 10$$. Cuối cùng trừ: $$12 - 10 = 2$$."
    },
    {
      id: "q6_inline_word_problem",
      type: "inline",
      title: "6. A gym charges a $20 sign-up fee plus $15 per month. Complete the equation to model the total cost (C) for (m) months.",
      options: [],
      textParts: [
        "The total cost equation is: C = ",
        " m + ",
        "."
      ],
      blanks: {
        "1": {
          correct: "15",
          options: [
            { val: "15", text: "15" },
            { val: "20", text: "20" }
          ]
        },
        "2": {
          correct: "20",
          options: [
            { val: "15", text: "15" },
            { val: "20", text: "20" }
          ]
        }
      },
      expEn: "The monthly fee ($15) is the rate of change (slope) because it repeats. The sign-up fee ($20) is a one-time starting fee (y-intercept).",
      expVn: "Phí hàng tháng ($15) là tốc độ thay đổi (hệ số góc) vì nó lặp lại. Phí đăng ký ($20) là phí bắt đầu một lần (tung độ gốc)."
    },
    {
      id: "q7_dnd_match_slopes",
      type: "dnd",
      title: "7. Drag the slope values to match their corresponding equations.",
      options: [],
      bank: [
        { id: "m1", val: "3", text: "3" },
        { id: "m2", val: "-4", text: "-4" },
        { id: "m3", val: "0.5", text: "1/2" }
      ],
      targets: [
        { id: "eq1", title: "y = 3x - 2" },
        { id: "eq2", title: "y = -4x + 1" },
        { id: "eq3", title: "y = 1/2x" }
      ],
      correctSets: {
        "eq1": ["3"],
        "eq2": ["-4"],
        "eq3": ["0.5"]
      },
      expEn: "In the format $$y = mx + b$$, the slope is always the coefficient (number) attached to the x variable.",
      expVn: "Trong dạng $$y = mx + b$$, hệ số góc luôn là hệ số (con số) gắn với biến x."
    },
    {
      id: "q8_mcq_distributive",
      type: "mcq",
      title: "8. Which of the following expressions is equivalent to $$-3(2x - 4)$$?",
      options: [
        { val: "A", text: "A. -6x - 4" },
        { val: "B", text: "B. -6x - 12" },
        { val: "C", text: "C. -6x + 12" },
        { val: "D", text: "D. 6x + 12" }
      ],
      correct: "C",
      expEn: "Multiply the outside term by both inside terms: $$-3 \\times 2x = -6x$$ and $$-3 \\times -4 = +12$$. The correct expression is $$-6x + 12$$.",
      expVn: "Nhân số hạng bên ngoài với cả hai số hạng bên trong: $$-3 \\times 2x = -6x$$ và $$-3 \\times -4 = +12$$. Biểu thức đúng là $$-6x + 12$$."
    },
    {
      id: "q9_inline_solve",
      type: "inline",
      title: "9. Complete the steps to solve for y: $$y / 4 - 3 = 2$$.",
      options: [],
      textParts: [
        "First, add 3 to both sides to get $$y / 4 =$$ ",
        ". Next, multiply both sides by 4 to find that $$y =$$ ",
        "."
      ],
      blanks: {
        "1": {
          correct: "5",
          options: [
            { val: "1", text: "1" },
            { val: "5", text: "5" }
          ]
        },
        "2": {
          correct: "20",
          options: [
            { val: "20", text: "20" },
            { val: "8", text: "8" }
          ]
        }
      },
      expEn: "Use inverse operations: add 3 to get 5, then multiply by the denominator 4 to isolate y, resulting in 20.",
      expVn: "Sử dụng các phép toán ngược: cộng 3 để được 5, sau đó nhân với mẫu số 4 để cô lập y, kết quả là 20."
    },
    {
      id: "q10_mcq_intersection",
      type: "mcq",
      title: "10. If two linear equations are graphed on the same coordinate plane, what does the point where they cross (intersect) represent?",
      options: [
        { val: "A", text: "A. The y-intercept of both lines." },
        { val: "B", text: "B. The only solution that makes both equations true." },
        { val: "C", text: "C. The slope of the lines." },
        { val: "D", text: "D. The origin (0,0)." }
      ],
      correct: "B",
      expEn: "The point of intersection represents the exact (x,y) coordinate pair that acts as a solution for both equations simultaneously.",
      expVn: "Điểm giao cắt đại diện cho cặp tọa độ (x,y) chính xác đóng vai trò là nghiệm cho cả hai phương trình cùng một lúc."
    },
    {
      id: "q11_mcq_translate",
      type: "mcq",
      title: "11. An algebraic statement is shown: \"Four less than the product of three and a number x.\" Which expression is equivalent to this?",
      options: [
        { val: "A", text: "A. 4 - 3x" },
        { val: "B", text: "B. 3(x - 4)" },
        { val: "C", text: "C. 3x - 4" },
        { val: "D", text: "D. 4x - 3" }
      ],
      correct: "C",
      expEn: "The phrase 'product of three and a number x' translates to $$3x$$. The phrase 'four less than' means you subtract 4 at the end, making it $$3x - 4$$.",
      expVn: "Cụm từ 'tích của ba và một số x' được dịch thành $$3x$$. Cụm từ 'ít hơn bốn' có nghĩa là bạn trừ đi 4 ở cuối, tạo thành $$3x - 4$$."
    },
    {
      id: "q12_mcq_eval_context",
      type: "mcq",
      title: "12. The cost of renting a moving truck is given by the equation $$C = 2.5m + 45$$, where m is the number of miles driven. What is the total cost if you drive 60 miles?",
      options: [
        { val: "A", text: "A. $195" },
        { val: "B", text: "B. $150" },
        { val: "C", text: "C. $105" },
        { val: "D", text: "D. $250" }
      ],
      correct: "A",
      expEn: "Substitute 60 for m: $$2.5(60) + 45$$. First multiply to get 150. Then add 45. The total cost is $195.",
      expVn: "Thay thế 60 cho m: $$2.5(60) + 45$$. Đầu tiên nhân để được 150. Sau đó cộng thêm 45. Tổng chi phí là 195 đô la."
    },
    {
      id: "q13_mcq_perimeter",
      type: "mcq",
      title: "13. What is the simplified expression for the perimeter of the rectangle shown below?",
      inlineSvg: DIAGRAMS.ASSESSMENT_PERIMETER_ALG,
      options: [
        { val: "A", text: "A. 4x + 1" },
        { val: "B", text: "B. 8x + 2" },
        { val: "C", text: "C. 3x² - x - 2" },
        { val: "D", text: "D. 6x + 4" }
      ],
      correct: "B",
      expEn: "To find perimeter, add all four sides (or twice the length plus twice the width): $$2(3x + 2) + 2(x - 1)$$. Distribute to get $$6x + 4 + 2x - 2$$. Combine like terms to get $$8x + 2$$.",
      expVn: "Để tìm chu vi, hãy cộng cả bốn cạnh (hoặc hai lần chiều dài cộng hai lần chiều rộng): $$2(3x + 2) + 2(x - 1)$$. Phân phối để được $$6x + 4 + 2x - 2$$. Kết hợp các hạng tử đồng dạng để được $$8x + 2$$."
    },
    {
      id: "q14_mcq_area",
      type: "mcq",
      title: "14. A rectangular garden has the dimensions shown below. Which expression represents the total area?",
      inlineSvg: DIAGRAMS.ASSESSMENT_AREA_ALG,
      options: [
        { val: "A", text: "A. 10x + 4" },
        { val: "B", text: "B. 10x + 20" },
        { val: "C", text: "C. 2x + 9" },
        { val: "D", text: "D. 7x + 9" }
      ],
      correct: "B",
      expEn: "The area of a rectangle is length multiplied by width. You must multiply 5 by the entire expression $$(2x + 4)$$. Using the distributive property, $$5(2x) = 10x$$ and $$5(4) = 20$$, resulting in $$10x + 20$$.",
      expVn: "Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng. Bạn phải nhân 5 với toàn bộ biểu thức $$(2x + 4)$$. Sử dụng tính chất phân phối, $$5(2x) = 10x$$ và $$5(4) = 20$$, kết quả là $$10x + 20$$."
    },
    {
      id: "q15_mcq_word_eq",
      type: "mcq",
      title: "15. A plumber charges $15 per hour of work plus a flat travel bonus of $25. If the plumber's total pay for the day was $130, how many hours did they work?",
      options: [
        { val: "A", text: "A. 5" },
        { val: "B", text: "B. 8" },
        { val: "C", text: "C. 10" },
        { val: "D", text: "D. 7" }
      ],
      correct: "D",
      expEn: "Set up the equation: $$15h + 25 = 130$$. Subtract 25 from both sides to get $$15h = 105$$. Divide by 15 to find $$h = 7$$.",
      expVn: "Thiết lập phương trình: $$15h + 25 = 130$$. Trừ 25 cho cả hai vế để được $$15h = 105$$. Chia cho 15 để tìm ra $$h = 7$$."
    },
    {
      id: "q16_mcq_distributive_neg",
      type: "mcq",
      title: "16. Simplify the following expression by distributing and combining like terms: $$-2(3x - 4) + 5x$$",
      options: [
        { val: "A", text: "A. -x - 8" },
        { val: "B", text: "B. -x + 8" },
        { val: "C", text: "C. 11x - 8" },
        { val: "D", text: "D. -6x + 8" }
      ],
      correct: "B",
      expEn: "First, distribute the -2: $$-2(3x) = -6x$$ and $$-2(-4) = +8$$. Now the expression is $$-6x + 8 + 5x$$. Finally, combine the like terms (-6x and +5x) to get $$-x + 8$$.",
      expVn: "Đầu tiên, phân phối số -2: $$-2(3x) = -6x$$ và $$-2(-4) = +8$$. Bây giờ biểu thức là $$-6x + 8 + 5x$$. Cuối cùng, kết hợp các hạng tử đồng dạng (-6x và +5x) để được $$-x + 8$$."
    },
    {
      id: "q17_inline_anatomy",
      type: "inline",
      title: "17. Identify the mathematical parts of the expression: $$7y - 4$$",
      options: [],
      textParts: [
        "In this expression, the number 7 is the ",
        ", the letter y is the ",
        ", and the number -4 is the ",
        "."
      ],
      blanks: {
        "1": {
          correct: "coefficient",
          options: [
            { val: "coefficient", text: "coefficient" },
            { val: "variable", text: "variable" },
            { val: "constant", text: "constant" }
          ]
        },
        "2": {
          correct: "variable",
          options: [
            { val: "coefficient", text: "coefficient" },
            { val: "variable", text: "variable" },
            { val: "constant", text: "constant" }
          ]
        },
        "3": {
          correct: "constant",
          options: [
            { val: "coefficient", text: "coefficient" },
            { val: "variable", text: "variable" },
            { val: "constant", text: "constant" }
          ]
        }
      },
      expEn: "The coefficient is the number attached to a letter. The variable is the letter representing an unknown. The constant is the normal number standing alone.",
      expVn: "Hệ số là con số gắn với một chữ cái. Biến số là chữ cái đại diện cho một ẩn số. Hằng số là con số bình thường đứng một mình."
    },
    {
      id: "q18_dnd_phrases",
      type: "dnd",
      title: "18. Match the English phrases to their correct algebraic expressions.",
      options: [],
      bank: [
        { id: "e1", val: "2x+5", text: "2x + 5" },
        { id: "e2", val: "2x-5", text: "2x - 5" },
        { id: "e3", val: "5x", text: "5x" }
      ],
      targets: [
        { id: "p1", title: "Five less than twice a number" },
        { id: "p2", title: "Twice a number increased by five" },
        { id: "p3", title: "The product of five and a number" }
      ],
      correctSets: {
        "p1": ["2x-5"],
        "p2": ["2x+5"],
        "p3": ["5x"]
      },
      expEn: "Remember that 'less than' works backwards, so 'five less than' means you subtract 5 at the end. 'Increased by' means addition, and 'product' means multiplication.",
      expVn: "Hãy nhớ rằng 'ít hơn' (less than) hoạt động ngược lại, vì vậy 'ít hơn năm' có nghĩa là bạn trừ đi 5 ở cuối. 'Tăng thêm' (increased by) có nghĩa là phép cộng, và 'tích' (product) có nghĩa là phép nhân."
    },
    {
      id: "q19_mcq_fractional_eq",
      type: "mcq",
      title: "19. Solve for x: $$\\frac{x}{3} = 12$$",
      options: [
        { val: "A", text: "A. 4" },
        { val: "B", text: "B. 9" },
        { val: "C", text: "C. 36" },
        { val: "D", text: "D. 15" }
      ],
      correct: "C",
      expEn: "The variable x is being divided by 3. To isolate x, you must do the inverse operation and multiply both sides by 3. $$12 \\times 3 = 36$$.",
      expVn: "Biến x đang được chia cho 3. Để cô lập x, bạn phải thực hiện phép toán ngược lại và nhân cả hai vế với 3. $$12 \\times 3 = 36$$."
    },
    {
      id: "q20_mcq_combine_word",
      type: "mcq",
      title: "20. You buy x apples for $2 each and x bananas for $1 each. Which expression represents the total cost?",
      options: [
        { val: "A", text: "A. 2x + 1" },
        { val: "B", text: "B. 3x" },
        { val: "C", text: "C. 3x²" },
        { val: "D", text: "D. 2x²" }
      ],
      correct: "B",
      expEn: "The cost of the apples is $$2x$$ and the cost of bananas is $$1x$$. Since they share the same variable, you combine like terms: $$2x + 1x = 3x$$.",
      expVn: "Chi phí mua táo là $$2x$$ và chi phí mua chuối là $$1x$$. Vì chúng có chung một biến số, bạn kết hợp các hạng tử đồng dạng: $$2x + 1x = 3x$$."
    },
    {
      id: "q21_mcq_evaluate_neg",
      type: "mcq",
      title: "21. Evaluate the expression $$x^2 - 3x$$ when $$x = -4$$.",
      options: [
        { val: "A", text: "A. 4" },
        { val: "B", text: "B. 28" },
        { val: "C", text: "C. -4" },
        { val: "D", text: "D. -28" }
      ],
      correct: "B",
      expEn: "Substitute -4 in parentheses: $$(-4)^2 - 3(-4)$$. A negative times a negative is positive, so $$(-4)^2 = +16$$, and $$-3 \\times -4 = +12$$. Finally, add $$16 + 12 = 28$$.",
      expVn: "Thay thế -4 trong dấu ngoặc đơn: $$(-4)^2 - 3(-4)$$. Số âm nhân với số âm thành số dương, do đó $$(-4)^2 = +16$$, và $$-3 \\times -4 = +12$$. Cuối cùng, cộng $$16 + 12 = 28$$."
    },
    {
      id: "q22_mcq_solve_distributive",
      type: "mcq",
      title: "22. Solve the equation for x: $$3(x + 2) = 21$$",
      options: [
        { val: "A", text: "A. 5" },
        { val: "B", text: "B. 6" },
        { val: "C", text: "C. 7" },
        { val: "D", text: "D. 9" }
      ],
      correct: "A",
      expEn: "First distribute the 3 to get $$3x + 6 = 21$$. Next, subtract 6 from both sides to get $$3x = 15$$. Finally, divide by 3 to find $$x = 5$$.",
      expVn: "Đầu tiên phân phối số 3 để được $$3x + 6 = 21$$. Tiếp theo, trừ 6 cho cả hai vế để được $$3x = 15$$. Cuối cùng, chia cho 3 để tìm ra $$x = 5$$."
    },
    {
      id: "q23_dnd_table_to_eq",
      type: "dnd",
      title: "23. Drag the correct algebraic steps in order from top to bottom to solve the equation: $$5x - 10 = 20$$.",
      options: [],
      bank: [
        { id: "b1", val: "Add 10", text: "Add 10 to both sides" },
        { id: "b2", val: "Subtract 10", text: "Subtract 10 from both sides" },
        { id: "b3", val: "Divide 5", text: "Divide both sides by 5" },
        { id: "b4", val: "Multiply 5", text: "Multiply both sides by 5" }
      ],
      targets: [
        { id: "t1", title: "Step 1" },
        { id: "t2", title: "Step 2" }
      ],
      correctSets: {
        "t1": ["Add 10"],
        "t2": ["Divide 5"]
      },
      expEn: "Always undo addition/subtraction first: add 10 to both sides to get $$5x = 30$$. Then undo multiplication/division: divide by 5 to find $$x = 6$$.",
      expVn: "Luôn hoàn tác phép cộng/trừ trước: cộng 10 vào cả hai vế để được $$5x = 30$$. Sau đó hoàn tác phép nhân/chia: chia cho 5 để tìm ra $$x = 6$$."
    }
  ]
};