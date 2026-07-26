import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [],
  questions: [
    {
      id: "q1_inline_golden_rule",
      type: "inline",
      title: "1. Complete the rule that keeps an equation true.",
      options: [],
      textParts: [
        "An equation is like a balanced scale. Whatever you do to one side, you must do to the ",
        ". To remove a number we use the ",
        " operation."
      ],
      blanks: {
        "1": {
          correct: "other side",
          options: [
            { val: "other side", text: "other side" },
            { val: "same side", text: "same side" },
            { val: "answer", text: "answer" }
          ]
        },
        "2": {
          correct: "inverse",
          options: [
            { val: "inverse", text: "inverse" },
            { val: "identical", text: "identical" },
            { val: "negative", text: "negative" }
          ]
        }
      },
      expEn: "An equation states that both sides are equal. Changing only one side breaks that equality, so the same inverse (opposite) operation must be applied to both sides.",
      expVn: "Phương trình khẳng định hai vế bằng nhau. Chỉ thay đổi một vế sẽ phá vỡ sự bằng nhau đó, nên cùng một phép tính ngược phải được áp dụng cho cả hai vế."
    },
    {
      id: "q2_mcq_solve_two_step",
      type: "mcq",
      title: "2. Solve for x:  4x + 7 = 31",
      options: [
        { val: "A", text: "A. x = 4" },
        { val: "B", text: "B. x = 9.5" },
        { val: "C", text: "C. x = 6" },
        { val: "D", text: "D. x = 24" }
      ],
      correct: "C",
      expEn: "Subtract 7 from both sides to get 4x = 24, then divide both sides by 4 to get x = 6. Check: 4(6) + 7 = 31.",
      expVn: "Trừ 7 ở cả hai vế được 4x = 24, rồi chia cả hai vế cho 4 được x = 6. Kiểm tra: 4(6) + 7 = 31."
    },
    {
      id: "q3_mcq_variables_both_sides",
      type: "mcq",
      title: "3. Solve for x:  5x - 3 = 2x + 12",
      options: [
        { val: "A", text: "A. x = 3" },
        { val: "B", text: "B. x = 9" },
        { val: "C", text: "C. x = 15" },
        { val: "D", text: "D. x = 5" }
      ],
      correct: "D",
      expEn: "Subtract 2x from both sides to get 3x - 3 = 12. Add 3 to both sides for 3x = 15, then divide by 3 to get x = 5.",
      expVn: "Trừ 2x ở cả hai vế được 3x - 3 = 12. Cộng 3 vào cả hai vế được 3x = 15, rồi chia cho 3 được x = 5."
    },
    {
      id: "q4_dnd_signal_words",
      type: "dnd",
      title: "4. Drag each phrase to the inequality sign it describes.",
      options: [],
      bank: [
        { id: "b1", val: "at most", text: "at most" },
        { id: "b2", val: "at least", text: "at least" },
        { id: "b3", val: "more than", text: "more than" },
        { id: "b4", val: "fewer than", text: "fewer than" },
        { id: "b5", val: "exactly", text: "exactly" }
      ],
      targets: [
        { id: "le", title: "≤" },
        { id: "ge", title: "≥" },
        { id: "gt", title: ">" }
      ],
      correctSets: {
        "le": ["at most"],
        "ge": ["at least"],
        "gt": ["more than"]
      },
      expEn: "'At most' sets a maximum and includes it, so it is ≤. 'At least' sets a minimum and includes it, so it is ≥. 'More than' excludes the boundary value, so it is a strict >.",
      expVn: "'Nhiều nhất' đặt ra mức tối đa và bao gồm nó, nên là ≤. 'Ít nhất' đặt ra mức tối thiểu và bao gồm nó, nên là ≥. 'Nhiều hơn' loại trừ giá trị biên, nên là dấu > nghiêm ngặt."
    },
    {
      id: "q5_mcq_number_line_read",
      type: "mcq",
      title: "5. Which inequality is shown on the number line below?",
      inlineSvg: DIAGRAMS.ASSESSMENT_NUMBER_LINE_LE,
      options: [
        { val: "A", text: "A. x ≤ 3" },
        { val: "B", text: "B. x < 3" },
        { val: "C", text: "C. x > 3" },
        { val: "D", text: "D. x ≥ 3" }
      ],
      correct: "A",
      expEn: "The shading runs to the left of 3, so x is less than 3. The circle at 3 is filled in, which means 3 is included, giving x ≤ 3.",
      expVn: "Vùng tô đậm chạy về bên trái của 3, nên x nhỏ hơn 3. Vòng tròn tại 3 được tô đặc, nghĩa là 3 được bao gồm, cho ra x ≤ 3."
    },
    {
      id: "q6_inline_circles",
      type: "inline",
      title: "6. Complete the rule for drawing solution sets.",
      options: [],
      textParts: [
        "When the sign is > or <, draw an ",
        " circle because the boundary number is ",
        " part of the solution."
      ],
      blanks: {
        "1": {
          correct: "open",
          options: [
            { val: "open", text: "open" },
            { val: "closed", text: "closed" },
            { val: "square", text: "square" }
          ]
        },
        "2": {
          correct: "not",
          options: [
            { val: "not", text: "not" },
            { val: "always", text: "always" }
          ]
        }
      },
      expEn: "Strict signs (> and <) exclude the boundary, so the circle is left open. The ≤ and ≥ signs include it, so the circle is filled.",
      expVn: "Các dấu nghiêm ngặt (> và <) loại trừ điểm biên, nên vòng tròn để rỗng. Các dấu ≤ và ≥ bao gồm nó, nên vòng tròn được tô đặc."
    },
    {
      id: "q7_mcq_flip_rule",
      type: "mcq",
      title: "7. Solve the inequality:  -3x < 12",
      options: [
        { val: "A", text: "A. x < -4" },
        { val: "B", text: "B. x > -4" },
        { val: "C", text: "C. x < 4" },
        { val: "D", text: "D. x > 4" }
      ],
      correct: "B",
      expEn: "Divide both sides by -3. Because the divisor is negative, the sign reverses from < to >, giving x > -4. Check with -3: -3(-3) = 9, and 9 < 12 is true.",
      expVn: "Chia cả hai vế cho -3. Vì số chia là số âm, dấu đảo chiều từ < thành >, cho ra x > -4. Kiểm tra với -3: -3(-3) = 9, và 9 < 12 là đúng."
    },
    {
      id: "q8_mcq_no_flip",
      type: "mcq",
      title: "8. A student solved  x - 5 > 2  and flipped the sign to get x < 7. What mistake did they make?",
      options: [
        { val: "A", text: "A. The sign only flips when you multiply or divide by a negative, not when you add or subtract" },
        { val: "B", text: "B. They should have divided instead of added" },
        { val: "C", text: "C. No mistake — the answer x < 7 is correct" },
        { val: "D", text: "D. They should have flipped the sign twice" }
      ],
      correct: "A",
      expEn: "Adding 5 to both sides is not multiplication or division by a negative, so the sign stays as it is. The correct answer is x > 7.",
      expVn: "Cộng 5 vào cả hai vế không phải là nhân hay chia cho số âm, nên dấu giữ nguyên. Đáp án đúng là x > 7."
    },
    {
      id: "q9_mcq_compound",
      type: "mcq",
      title: "9. A fridge is safe between 2°C and 8°C inclusive. Which compound inequality describes the safe temperature t?",
      inlineSvg: DIAGRAMS.ASSESSMENT_TEMPERATURE_RANGE,
      options: [
        { val: "A", text: "A. 2 < t < 8" },
        { val: "B", text: "B. t ≤ 2 or t ≥ 8" },
        { val: "C", text: "C. 2 ≤ t ≤ 8" },
        { val: "D", text: "D. 2 ≥ t ≥ 8" }
      ],
      correct: "C",
      expEn: "'Inclusive' means both 2°C and 8°C are themselves safe, so both signs must include equality: 2 ≤ t ≤ 8.",
      expVn: "'Bao gồm' nghĩa là cả 2°C và 8°C đều an toàn, nên cả hai dấu phải bao gồm sự bằng nhau: 2 ≤ t ≤ 8."
    },
    {
      id: "q10_inline_word_problem",
      type: "inline",
      title: "10. A van can carry no more than 900 kg. It already holds 150 kg of equipment and each box weighs 25 kg. Complete the setup.",
      options: [],
      textParts: [
        "The inequality is 150 + 25b ",
        " 900. Solving gives b ≤ ",
        "."
      ],
      blanks: {
        "1": {
          correct: "≤",
          options: [
            { val: "≤", text: "≤" },
            { val: "<", text: "<" },
            { val: "≥", text: "≥" }
          ]
        },
        "2": {
          correct: "30",
          options: [
            { val: "30", text: "30" },
            { val: "36", text: "36" },
            { val: "42", text: "42" }
          ]
        }
      },
      expEn: "'No more than' means ≤. Subtracting 150 gives 25b ≤ 750, and dividing by 25 gives b ≤ 30.",
      expVn: "'Không quá' nghĩa là ≤. Trừ 150 được 25b ≤ 750, và chia cho 25 được b ≤ 30."
    },
    {
      id: "q11_mcq_rounding",
      type: "mcq",
      title: "11. Solving a budget problem gives L ≤ 7.5, where L is the number of lunches that can be bought. What is the answer?",
      options: [
        { val: "A", text: "A. 7.5 lunches" },
        { val: "B", text: "B. 8 lunches" },
        { val: "C", text: "C. 6 lunches" },
        { val: "D", text: "D. 7 lunches" }
      ],
      correct: "D",
      expEn: "You cannot buy part of a lunch, so the answer must be a whole number. Because the total must not exceed the budget, round DOWN to 7. Rounding up to 8 would break the constraint.",
      expVn: "Bạn không thể mua một phần bữa trưa, nên đáp án phải là số nguyên. Vì tổng không được vượt quá ngân sách, hãy làm tròn XUỐNG thành 7. Làm tròn lên thành 8 sẽ vi phạm ràng buộc."
    },
    {
      id: "q12_mcq_verify",
      type: "mcq",
      title: "12. A student solves 5x - 4 = 21 and gets x = 5. How can they prove the answer is correct?",
      inlineSvg: DIAGRAMS.DIAGRAM_CHECK_SOLUTION,
      options: [
        { val: "A", text: "A. Substitute 5 back into the original equation and check both sides are equal" },
        { val: "B", text: "B. Solve the equation a second time in the same way" },
        { val: "C", text: "C. Check the answer is a whole number" },
        { val: "D", text: "D. Draw the answer on a number line" }
      ],
      correct: "A",
      expEn: "Verifying means substituting the answer back into the ORIGINAL equation. 5(5) - 4 = 21 matches the right-hand side, which proves the solution. Re-solving the same way would just repeat any mistake.",
      expVn: "Kiểm chứng nghĩa là thay đáp án trở lại vào phương trình BAN ĐẦU. 5(5) - 4 = 21 khớp với vế phải, điều này chứng minh nghiệm đúng. Giải lại theo cùng cách chỉ lặp lại lỗi sai."
    }
  ]
};
