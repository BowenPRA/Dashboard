// src/data/Y7_MATH/U01_5/workbook.js
// Reveal-solution practice for 1.5 Tests for Divisibility.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. The Yes/No items are tap-to-
// answer multiple choice (clearer than typing "Yes"); the counts stay as typed
// boxes. The last Challenge questions include the two word problems demoted from
// the classroom deck (The Biscuit Tins, The School Hall) and the digit-shuffle
// investigation. See docs/workbook-tasks.md.

// Every divisibility check has the same two buttons; share one definition.
const YES_NO = [
  { val: 'yes', text: 'Yes', textVn: 'Có' },
  { val: 'no', text: 'No', textVn: 'Không' },
];

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Using a test (not a calculator): is **4728** divisible by **2**?', promptVn: 'Dùng dấu hiệu (không dùng máy tính): **4728** có chia hết cho **2** không?',
        solution: ['Look at the last digit only. It is **8**, which is even.', 'So 4728 is divisible by 2. Answer: **Yes**.'],
        solutionVn: ['Chỉ nhìn chữ số cuối. Đó là **8**, một số chẵn.', 'Vậy 4728 chia hết cho 2. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
      {
        id: 'f2', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Is **615** divisible by **5**?', promptVn: '**615** có chia hết cho **5** không?',
        solution: ['The last digit is **5**, and the test for 5 is a last digit of 0 or 5.', 'So 615 is divisible by 5. Answer: **Yes**.'],
        solutionVn: ['Chữ số cuối là **5**, và dấu hiệu cho 5 là chữ số cuối bằng 0 hoặc 5.', 'Vậy 615 chia hết cho 5. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
      {
        id: 'f3', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Is **4725** divisible by **3**?', promptVn: '**4725** có chia hết cho **3** không?',
        solution: ['Add the digits: $4 + 7 + 2 + 5 = 18$.', '18 is a multiple of 3, so 4725 is divisible by 3. Answer: **Yes**.'],
        solutionVn: ['Cộng các chữ số: $4 + 7 + 2 + 5 = 18$.', '18 là bội của 3, nên 4725 chia hết cho 3. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
      {
        id: 'f4', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Is **3960** divisible by **10**?', promptVn: '**3960** có chia hết cho **10** không?',
        solution: ['The test for 10 is a last digit of 0. The last digit is **0**.', 'So 3960 is divisible by 10. Answer: **Yes**.'],
        solutionVn: ['Dấu hiệu cho 10 là chữ số cuối bằng 0. Chữ số cuối là **0**.', 'Vậy 3960 chia hết cho 10. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Is **5304** divisible by **4**?', promptVn: '**5304** có chia hết cho **4** không?',
        solution: ['The test for 4 is the last **two** digits. They are **04**, and $4 ÷ 4 = 1$.', 'So 5304 is divisible by 4. Answer: **Yes**.'],
        solutionVn: ['Dấu hiệu cho 4 là **hai** chữ số cuối. Đó là **04**, và $4 ÷ 4 = 1$.', 'Vậy 5304 chia hết cho 4. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
      {
        id: 'p2', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Is **2916** divisible by **9**?', promptVn: '**2916** có chia hết cho **9** không?',
        solution: ['Add the digits: $2 + 9 + 1 + 6 = 18$.', '18 is a multiple of 9, so 2916 is divisible by 9. Answer: **Yes**.'],
        solutionVn: ['Cộng các chữ số: $2 + 9 + 1 + 6 = 18$.', '18 là bội của 9, nên 2916 chia hết cho 9. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
      {
        id: 'p3', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Is **84** divisible by **6**?', promptVn: '**84** có chia hết cho **6** không?',
        solution: ['Test 6 as two tests. 84 is even (passes 2), and $8 + 4 = 12$ is a multiple of 3 (passes 3).', 'It passes **both**, so 84 is divisible by 6. Answer: **Yes**.'],
        solutionVn: ['Kiểm tra 6 bằng hai dấu hiệu. 84 là số chẵn (thoả 2), và $8 + 4 = 12$ là bội của 3 (thoả 3).', 'Thoả **cả hai**, nên 84 chia hết cho 6. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
      {
        id: 'p4', type: 'mcq', options: YES_NO, correct: 'no',
        prompt: 'Is **92** divisible by **6**?', promptVn: '**92** có chia hết cho **6** không?',
        solution: ['92 is even (passes 2), but $9 + 2 = 11$ is **not** a multiple of 3 (fails 3).', 'It must pass both, so 92 is **not** divisible by 6. Answer: **No**.'],
        solutionVn: ['92 là số chẵn (thoả 2), nhưng $9 + 2 = 11$ **không** là bội của 3 (không thoả 3).', 'Phải thoả cả hai, nên 92 **không** chia hết cho 6. Đáp án: **Không (No)**.'],
        answer: 'No', answerVn: 'Không',
      },
      {
        id: 'p5', type: 'mcq', options: YES_NO, correct: 'yes',
        prompt: 'Use the test for 11: is **2915** divisible by **11**?', promptVn: 'Dùng dấu hiệu cho 11: **2915** có chia hết cho **11** không?',
        solution: ['Group alternate digits: $2 + 1 = 3$ and $9 + 5 = 14$. The difference is $14 - 3 = 11$.', '11 is a multiple of 11, so 2915 is divisible by 11. Answer: **Yes**.'],
        solutionVn: ['Nhóm các chữ số xen kẽ: $2 + 1 = 3$ và $9 + 5 = 14$. Hiệu là $14 - 3 = 11$.', '11 là bội của 11, nên 2915 chia hết cho 11. Đáp án: **Có (Yes)**.'],
        answer: 'Yes', answerVn: 'Có',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1', prompt: 'Mr Bowen bakes **5304 biscuits** and puts them into bags of **8**, with none left over. Using a test to check it works, how many **full bags** are there?', promptVn: 'Thầy Bowen nướng **5304 cái bánh quy** và cho vào các túi **8 cái**, không thừa cái nào. Sau khi dùng dấu hiệu kiểm tra, có bao nhiêu **túi đầy**?',
        solution: ['The test for 8 is the last **three** digits: **304**, and $304 ÷ 8 = 38$, so it divides exactly.', 'The number of bags is $5304 ÷ 8 = 663$.'],
        solutionVn: ['Dấu hiệu cho 8 là **ba** chữ số cuối: **304**, và $304 ÷ 8 = 38$, nên chia hết.', 'Số túi là $5304 ÷ 8 = 663$.'],
        answer: '$663$', answerVn: '$663$',
      },
      {
        id: 'c2', prompt: 'Mr Bowen puts **2916 chairs** into rows of **9**, with none left over. Check with a test, then say how many **rows** there are.', promptVn: 'Thầy Bowen xếp **2916 cái ghế** thành các hàng **9 cái**, không thừa ghế nào. Kiểm tra bằng dấu hiệu, rồi cho biết có bao nhiêu **hàng**.',
        solution: ['The digits add to $2 + 9 + 1 + 6 = 18$, a multiple of 9, so it divides exactly.', 'The number of rows is $2916 ÷ 9 = 324$.'],
        solutionVn: ['Tổng các chữ số là $2 + 9 + 1 + 6 = 18$, bội của 9, nên chia hết.', 'Số hàng là $2916 ÷ 9 = 324$.'],
        answer: '$324$', answerVn: '$324$',
      },
      {
        id: 'c3', type: 'mcq', options: YES_NO, correct: 'no',
        prompt: 'Using the digits **8, 3, 6, 1** each exactly once, can you build a four-digit number that is **not** divisible by 9?', promptVn: 'Dùng các chữ số **8, 3, 6, 1** mỗi số đúng một lần, em có thể tạo một số bốn chữ số **không** chia hết cho 9 không?',
        solution: ['Shuffling the digits never changes the digit sum, and $8 + 3 + 6 + 1 = 18$ every time.', '18 is a multiple of 9, so every arrangement divides by 9. Answer: **No**.'],
        solutionVn: ['Xáo trộn các chữ số không bao giờ làm đổi tổng, và $8 + 3 + 6 + 1 = 18$ mỗi lần.', '18 là bội của 9, nên mọi cách sắp xếp đều chia hết cho 9. Đáp án: **Không (No)**.'],
        answer: 'No', answerVn: 'Không',
      },
    ],
  },
];
