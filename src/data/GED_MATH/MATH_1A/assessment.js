import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1800,
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
    }
  ]
};