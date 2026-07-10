// src/data/GED_MATH/MATH_1A/assessment.js

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [], 
  questions: [
    {
      id: "q1_mcq_vocab",
      type: "mcq",
      title: "1. Look at the algebraic expression: 7y + 2. Which part of this expression is the coefficient?",
      options: [
        { val: "A", text: "A. 7" },
        { val: "B", text: "B. y" },
        { val: "C", text: "C. 2" },
        { val: "D", text: "D. +" }
      ],
      correct: "A",
      expEn: "The coefficient is the number attached directly to the variable. Here, the number 7 is attached to the variable y.",
      expVn: "Hệ số là con số gắn trực tiếp với biến số. Ở đây, số 7 được gắn với biến số y."
    },
    {
      id: "q2_inline_translation",
      type: "inline",
      title: "2. Translate the English sentence into a math expression: \"4 less than three times a number.\"",
      options: [],
      textParts: [
        "The correct mathematical expression is ",
        " ",
        " ",
        "."
      ],
      blanks: {
        "1": {
          correct: "3x",
          options: [
            { val: "3x", text: "3x" },
            { val: "x", text: "x" },
            { val: "4x", text: "4x" }
          ]
        },
        "2": {
          correct: "-",
          options: [
            { val: "+", text: "+" },
            { val: "-", text: "-" }
          ]
        },
        "3": {
          correct: "4",
          options: [
            { val: "3", text: "3" },
            { val: "4", text: "4" }
          ]
        }
      },
      expEn: "The phrase 'three times a number' translates to 3x. The phrase '4 less than' means you must subtract 4 at the very end. So, the expression is 3x - 4.",
      expVn: "Cụm từ 'ba lần một số' dịch thành 3x. Cụm từ 'ít hơn 4' có nghĩa là bạn phải trừ 4 ở phần cuối cùng. Vì vậy, biểu thức là 3x - 4."
    },
    {
      id: "q3_mcq_evaluate",
      type: "mcq",
      title: "3. Evaluate the expression 5x - 2 when x = 3.",
      options: [
        { val: "A", text: "A. 6" },
        { val: "B", text: "B. 13" },
        { val: "C", text: "C. 15" },
        { val: "D", text: "D. 1" }
      ],
      correct: "B",
      expEn: "Substitute 3 in place of x. First, multiply 5 times 3 to get 15. Then, subtract 2. The final answer is 13.",
      expVn: "Thay thế 3 vào vị trí của x. Đầu tiên, nhân 5 với 3 để được 15. Sau đó, trừ đi 2. Câu trả lời cuối cùng là 13."
    },
    {
      id: "q4_dnd_combine_terms",
      type: "dnd",
      title: "4. Simplify this long expression by combining the like terms: 4x + 5 + 2x - 1. Drag the correct simplified terms into the boxes.",
      options: [],
      bank: [
        { id: "b1", val: "2x", text: "2x" },
        { id: "b2", val: "6x", text: "6x" },
        { id: "b3", val: "8x", text: "8x" },
        { id: "b4", val: "+ 6", text: "+ 6" },
        { id: "b5", val: "+ 4", text: "+ 4" },
        { id: "b6", val: "- 4", text: "- 4" }
      ],
      targets: [
        { id: "final_expr", title: "Simplified Expression" }
      ],
      correctSets: {
        "final_expr": ["6x", "+ 4"]
      },
      expEn: "First, combine the variables: 4x + 2x = 6x. Next, combine the constant numbers: 5 - 1 = +4. The simplified expression is 6x + 4.",
      expVn: "Đầu tiên, kết hợp các biến số: 4x + 2x = 6x. Tiếp theo, kết hợp các hằng số: 5 - 1 = +4. Biểu thức rút gọn là 6x + 4."
    },
    {
      id: "q5_inline_distributive",
      type: "inline",
      title: "5. Use the Distributive Property to expand the expression: 3(2x + 5).",
      options: [],
      textParts: [
        "To remove the parentheses, you must multiply the outside 3 by the inside 2x to get ",
        ". Then, you must multiply the outside 3 by the inside 5 to get ",
        ". The final expanded expression is 6x + 15."
      ],
      blanks: {
        "1": {
          correct: "6x",
          options: [
            { val: "5x", text: "5x" },
            { val: "6x", text: "6x" },
            { val: "2x", text: "2x" }
          ]
        },
        "2": {
          correct: "15",
          options: [
            { val: "8", text: "8" },
            { val: "15", text: "15" },
            { val: "5", text: "5" }
          ]
        }
      },
      expEn: "The Distributive Property means multiplying the outside number by everything inside. 3 times 2x is 6x. 3 times 5 is 15.",
      expVn: "Tính chất Phân phối có nghĩa là nhân số bên ngoài với mọi thứ bên trong. 3 nhân 2x là 6x. 3 nhân 5 là 15."
    },
    {
      id: "q6_mcq_one_step_add",
      type: "mcq",
      title: "6. Solve the one-step equation for x: x - 8 = 12.",
      options: [
        { val: "A", text: "A. x = 4" },
        { val: "B", text: "B. x = 20" },
        { val: "C", text: "C. x = 96" },
        { val: "D", text: "D. x = 1.5" }
      ],
      correct: "B",
      expEn: "To isolate x, you must use inverse operations. The opposite of subtracting 8 is adding 8. Add 8 to both sides: 12 + 8 = 20.",
      expVn: "Để cô lập x, bạn phải sử dụng phép toán nghịch đảo. Ngược lại của phép trừ 8 là phép cộng 8. Cộng 8 vào cả hai vế: 12 + 8 = 20."
    },
    {
      id: "q7_inline_one_step_mult",
      type: "inline",
      title: "7. Complete the sentences to correctly solve this equation: 4y = 28.",
      options: [],
      textParts: [
        "The number 4 and the variable y are currently attached by ",
        ". To isolate the y, I must ",
        " both sides by 4. The final answer is y = ",
        "."
      ],
      blanks: {
        "1": {
          correct: "multiplication",
          options: [
            { val: "addition", text: "addition" },
            { val: "multiplication", text: "multiplication" }
          ]
        },
        "2": {
          correct: "divide",
          options: [
            { val: "multiply", text: "multiply" },
            { val: "divide", text: "divide" }
          ]
        },
        "3": {
          correct: "7",
          options: [
            { val: "24", text: "24" },
            { val: "7", text: "7" },
            { val: "112", text: "112" }
          ]
        }
      },
      expEn: "A coefficient next to a letter means multiplication. The inverse operation is division. 28 divided by 4 equals 7.",
      expVn: "Một hệ số nằm cạnh một chữ cái có nghĩa là phép nhân. Phép toán nghịch đảo là phép chia. 28 chia cho 4 bằng 7."
    },
    {
      id: "q8_mcq_two_step",
      type: "mcq",
      title: "8. Solve the two-step equation: 3x + 5 = 26.",
      options: [
        { val: "A", text: "A. x = 7" },
        { val: "B", text: "B. x = 10" },
        { val: "C", text: "C. x = 18" },
        { val: "D", text: "D. x = 21" }
      ],
      correct: "A",
      expEn: "Step 1: Subtract 5 from both sides to get 3x = 21. Step 2: Divide both sides by 3 to get x = 7.",
      expVn: "Bước 1: Trừ 5 ở cả hai vế để có 3x = 21. Bước 2: Chia cả hai vế cho 3 để có x = 7."
    },
    {
      id: "q9_order_two_step_logic",
      type: "order",
      title: "9. Drag the steps into the correct order to solve this two-step equation: 2x - 4 = 10.",
      options: [],
      bank: [
        { id: "s1", val: "step1", text: "Add 4 to both sides." },
        { id: "s2", val: "step2", text: "The equation becomes 2x = 14." },
        { id: "s3", val: "step3", text: "Divide both sides by 2." },
        { id: "s4", val: "step4", text: "The final answer is x = 7." }
      ],
      targets: [
        { id: "solution_steps", title: "Correct Order of Steps" }
      ],
      correctSets: {
        "solution_steps": ["step1", "step2", "step3", "step4"]
      },
      expEn: "Always undo addition or subtraction first (Add 4). This leaves you with 2x = 14. Finally, undo the multiplication by dividing by 2 to find x = 7.",
      expVn: "Luôn hoàn tác phép cộng hoặc phép trừ trước (Cộng 4). Điều này giúp bạn có 2x = 14. Cuối cùng, hoàn tác phép nhân bằng cách chia cho 2 để tìm x = 7."
    },
    {
      id: "q10_inline_word_problem",
      type: "inline",
      title: "10. Read the word problem and build the equation: \"Maria bought 2 books for x dollars each. She also bought a pen for $3. Her total was $15.\"",
      options: [],
      textParts: [
        "The correct equation is ",
        "x + ",
        " = 15. To solve for x, you first subtract 3 from 15 to get ",
        ". Then you divide by 2 to find that each book costs $",
        "."
      ],
      blanks: {
        "1": {
          correct: "2",
          options: [
            { val: "2", text: "2" },
            { val: "3", text: "3" }
          ]
        },
        "2": {
          correct: "3",
          options: [
            { val: "2", text: "2" },
            { val: "3", text: "3" }
          ]
        },
        "3": {
          correct: "12",
          options: [
            { val: "12", text: "12" },
            { val: "18", text: "18" }
          ]
        },
        "4": {
          correct: "6",
          options: [
            { val: "6", text: "6" },
            { val: "9", text: "9" }
          ]
        }
      },
      expEn: "Two books cost 2x. Add the $3 pen to get the equation 2x + 3 = 15. Subtract 3 to get 12, then divide by 2. Each book costs $6.",
      expVn: "Hai cuốn sách có giá 2x. Cộng thêm chiếc bút 3 đô la ta có phương trình 2x + 3 = 15. Trừ đi 3 để được 12, sau đó chia cho 2. Mỗi cuốn sách có giá 6 đô la."
    }
  ]
};