// src/data/GED_MATH/MATH_1C/assessment.js
// The unit's timed check. Bilingual explanation on every item — the review deck
// reads them, so a wrong answer has to teach something on its own.

import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [],
  questions: [
    {
      id: "q1_inline_bar_divides",
      type: "inline",
      title: "1. Complete the rule about fraction bars.",
      options: [],
      textParts: [
        "A fraction bar divides the ",
        " numerator. To remove the fractions from an equation, multiply ",
        " by the lowest common denominator."
      ],
      blanks: {
        "1": {
          correct: "whole",
          options: [
            { val: "whole", text: "whole" },
            { val: "first term of the", text: "first term of the" },
            { val: "last term of the", text: "last term of the" }
          ]
        },
        "2": {
          correct: "both sides",
          options: [
            { val: "both sides", text: "both sides" },
            { val: "the left side", text: "the left side" },
            { val: "the fractions only", text: "the fractions only" }
          ]
        }
      },
      expEn: "The bar sits underneath everything on top, so it divides the whole numerator. Multiplying only one side would break the balance, so the LCD must be applied to both sides.",
      expVn: "Gạch phân số nằm dưới toàn bộ phần trên, nên nó chia cả tử số. Nhân chỉ một vế sẽ phá vỡ sự cân bằng, nên LCD phải được áp dụng cho cả hai vế."
    },
    {
      id: "q2_mcq_lcd_4_6",
      type: "mcq",
      title: "2. What is the lowest common denominator of 4 and 6?",
      options: [
        { val: "A", text: "A. 10" },
        { val: "B", text: "B. 12" },
        { val: "C", text: "C. 24" },
        { val: "D", text: "D. 6" }
      ],
      correct: "B",
      expEn: "Count in fours: 4, 8, 12. Count in sixes: 6, 12. The first shared number is 12. 24 is a common denominator too, but not the lowest, and 6 is not divisible by 4.",
      expVn: "Đếm theo bốn: 4, 8, 12. Đếm theo sáu: 6, 12. Số chung đầu tiên là 12. Số 24 cũng là mẫu số chung nhưng không phải nhỏ nhất, và 6 không chia hết cho 4."
    },
    {
      id: "q3_mcq_multiply_every_term",
      type: "mcq",
      title: "3. Multiply both sides of  x/3 + 2 = 7  by 3. What do you get?",
      options: [
        { val: "A", text: "A. x + 2 = 21" },
        { val: "B", text: "B. x + 6 = 7" },
        { val: "C", text: "C. x + 6 = 21" },
        { val: "D", text: "D. x + 2 = 7" }
      ],
      correct: "C",
      expEn: "Every term is multiplied by 3, not just the fraction: x/3 becomes x, 2 becomes 6, and 7 becomes 21. Leaving the 2 or the 7 untouched is the most common error on this topic.",
      expVn: "Mọi số hạng đều được nhân cho 3, không chỉ riêng phân số: x/3 thành x, 2 thành 6, và 7 thành 21. Bỏ quên số 2 hoặc số 7 là lỗi phổ biến nhất ở chủ đề này."
    },
    {
      id: "q4_dnd_match_lcd",
      type: "dnd",
      title: "4. Drag each pair of denominators to the number you would multiply by.",
      options: [],
      bank: [
        { id: "b1", val: "2 and 3", text: "2 and 3" },
        { id: "b2", val: "4 and 8", text: "4 and 8" },
        { id: "b3", val: "3 and 5", text: "3 and 5" },
        { id: "b4", val: "2 and 7", text: "2 and 7" }
      ],
      targets: [
        { id: "t6", title: "6" },
        { id: "t8", title: "8" },
        { id: "t15", title: "15" }
      ],
      correctSets: {
        "t6": ["2 and 3"],
        "t8": ["4 and 8"],
        "t15": ["3 and 5"]
      },
      expEn: "2 and 3 first meet at 6. Because 4 divides into 8, the larger number 8 is already the LCD. 3 and 5 share no smaller multiple than 15. The pair 2 and 7 needs 14, which is not offered.",
      expVn: "2 và 3 gặp nhau lần đầu ở 6. Vì 4 chia hết vào 8, số lớn hơn là 8 đã chính là LCD. 3 và 5 không có bội chung nào nhỏ hơn 15. Cặp 2 và 7 cần số 14, không có trong các ô."
    },
    {
      id: "q5_mcq_solve_single_fraction",
      type: "mcq",
      title: "5. Solve for x:  (x + 4)/3 = 5",
      options: [
        { val: "A", text: "A. x = 1" },
        { val: "B", text: "B. x = 19" },
        { val: "C", text: "C. x = 11" },
        { val: "D", text: "D. x = 15" }
      ],
      correct: "C",
      expEn: "Multiply both sides by 3 to get x + 4 = 15, then subtract 4 to get x = 11. Check: (11 + 4)/3 = 15/3 = 5.",
      expVn: "Nhân cả hai vế cho 3 được x + 4 = 15, rồi trừ 4 được x = 11. Kiểm tra: (11 + 4)/3 = 15/3 = 5."
    },
    {
      id: "q6_inline_four_steps",
      type: "inline",
      title: "6. Complete the routine for solving an equation with fractions.",
      options: [],
      textParts: [
        "First ",
        " the fractions by multiplying by the LCD. Then ",
        " the brackets, collect the x terms, and divide."
      ],
      blanks: {
        "1": {
          correct: "clear",
          options: [
            { val: "clear", text: "clear" },
            { val: "add", text: "add" },
            { val: "ignore", text: "ignore" }
          ]
        },
        "2": {
          correct: "expand",
          options: [
            { val: "expand", text: "expand" },
            { val: "delete", text: "delete" },
            { val: "square", text: "square" }
          ]
        }
      },
      expEn: "Clear, expand, collect, divide — in that order. Clearing first means every later step is done on whole numbers, which is where the errors stop happening.",
      expVn: "Khử, khai triển, gom, chia — theo đúng thứ tự đó. Khử trước nghĩa là mọi bước sau đều làm trên số nguyên, đó là lúc các lỗi ngừng xảy ra."
    },
    {
      id: "q7_mcq_keep_bracket",
      type: "mcq",
      title: "7. Multiplying (x - 2)/2 by 4 gives 2(x - 2). What is that when expanded?",
      options: [
        { val: "A", text: "A. 2x - 4" },
        { val: "B", text: "B. 2x - 2" },
        { val: "C", text: "C. x - 4" },
        { val: "D", text: "D. 2x + 4" }
      ],
      correct: "A",
      expEn: "The 2 multiplies both terms inside the bracket: 2 × x = 2x and 2 × (-2) = -4. Answer B is what you get by forgetting the second term, which is the mistake the bracket exists to prevent.",
      expVn: "Số 2 nhân với cả hai số hạng trong ngoặc: 2 × x = 2x và 2 × (-2) = -4. Đáp án B là kết quả khi quên số hạng thứ hai, đúng lỗi mà dấu ngoặc sinh ra để ngăn chặn."
    },
    {
      id: "q8_mcq_solve_both_fractions",
      type: "mcq",
      title: "8. Solve for x:  (x - 3)/2 = (2x + 1)/3",
      options: [
        { val: "A", text: "A. x = 11" },
        { val: "B", text: "B. x = -7" },
        { val: "C", text: "C. x = 7" },
        { val: "D", text: "D. x = -11" }
      ],
      correct: "D",
      expEn: "Multiply both sides by 6: 3(x - 3) = 2(2x + 1). Expand to 3x - 9 = 4x + 2. Subtract 3x for -9 = x + 2, then subtract 2 for x = -11. Check: -14/2 = -7 and -21/3 = -7.",
      expVn: "Nhân cả hai vế cho 6: 3(x - 3) = 2(2x + 1). Khai triển thành 3x - 9 = 4x + 2. Trừ 3x được -9 = x + 2, rồi trừ 2 được x = -11. Kiểm tra: -14/2 = -7 và -21/3 = -7."
    },
    {
      id: "q9_mcq_spot_the_error",
      type: "mcq",
      title: "9. Look at Linh's working. Which line is the first one that is wrong?",
      inlineSvg: DIAGRAMS.DIAGRAM_SPOT_THE_ERROR,
      options: [
        { val: "A", text: "A. Line 1" },
        { val: "B", text: "B. Line 2" },
        { val: "C", text: "C. Line 3" },
        { val: "D", text: "D. No line is wrong" }
      ],
      correct: "B",
      expEn: "Multiplying both sides of (x + 6)/4 = (x - 2)/2 by 4 gives x + 6 = 2(x - 2), which expands to 2x - 4. Line 2 says 2x - 2, so the -2 inside the bracket was never multiplied. The correct answer is x = 10, not x = 8.",
      expVn: "Nhân cả hai vế của (x + 6)/4 = (x - 2)/2 cho 4 được x + 6 = 2(x - 2), khai triển thành 2x - 4. Dòng 2 viết 2x - 2, tức là số -2 trong ngoặc chưa được nhân. Đáp án đúng là x = 10, không phải x = 8."
    },
    {
      id: "q10_mcq_one_divides_other",
      type: "mcq",
      title: "10. Solve for x:  (3x - 1)/4 = (x + 5)/2",
      options: [
        { val: "A", text: "A. x = 11" },
        { val: "B", text: "B. x = 3" },
        { val: "C", text: "C. x = 21" },
        { val: "D", text: "D. x = -11" }
      ],
      correct: "A",
      expEn: "Because 2 divides into 4, the LCD is 4. Multiplying gives 3x - 1 = 2(x + 5), which expands to 3x - 1 = 2x + 10. Subtract 2x and add 1 for x = 11. Check: 32/4 = 8 and 16/2 = 8.",
      expVn: "Vì 2 chia hết vào 4, LCD là 4. Nhân vào được 3x - 1 = 2(x + 5), khai triển thành 3x - 1 = 2x + 10. Trừ 2x và cộng 1 được x = 11. Kiểm tra: 32/4 = 8 và 16/2 = 8."
    },
    {
      id: "q11_mcq_check_answer",
      type: "mcq",
      title: "11. To check a solution, what should you substitute it into?",
      options: [
        { val: "A", text: "A. The line after clearing the fractions" },
        { val: "B", text: "B. The last line of your working" },
        { val: "C", text: "C. Any line you like" },
        { val: "D", text: "D. The original equation, fractions and all" }
      ],
      correct: "D",
      expEn: "Only the original equation can catch a mistake made in the very first step. If you check against a line you wrote yourself, an error copied into that line is invisible to the check.",
      expVn: "Chỉ phương trình ban đầu mới phát hiện được lỗi mắc ngay ở bước đầu tiên. Nếu bạn kiểm tra bằng một dòng do chính mình viết, lỗi đã lọt vào dòng đó sẽ không bị phát hiện."
    },
    {
      id: "q12_mcq_word_problem",
      type: "mcq",
      title: "12. A bill of $x is split between 3 friends. The next night the bill is $20 more and is split between 5 friends, and each person pays the same as before. What was the first bill?",
      inlineSvg: DIAGRAMS.DIAGRAM_SPLIT_THE_BILL,
      options: [
        { val: "A", text: "A. $50" },
        { val: "B", text: "B. $30" },
        { val: "C", text: "C. $10" },
        { val: "D", text: "D. $60" }
      ],
      correct: "B",
      expEn: "Each person pays x/3 on the first night and (x + 20)/5 on the second, and those are equal. Multiplying both sides by 15 gives 5x = 3(x + 20), so 5x = 3x + 60 and x = 30. Each person paid $10 on both nights.",
      expVn: "Mỗi người trả x/3 vào tối đầu và (x + 20)/5 vào tối sau, và hai số đó bằng nhau. Nhân cả hai vế cho 15 được 5x = 3(x + 20), nên 5x = 3x + 60 và x = 30. Mỗi người trả 10 đô la trong cả hai tối."
    }
  ]
};
