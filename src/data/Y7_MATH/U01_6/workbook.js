// src/data/Y7_MATH/U01_6/workbook.js
// Reveal-solution practice for 1.6 Square Roots and Cube Roots.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. The last Challenge questions
// include the two problems demoted from the classroom deck (One Number Two
// Names, The Bathroom Wall). See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', prompt: 'Work out $6^2$ (six squared).', promptVn: 'Tính $6^2$ (sáu bình phương).',
        solution: ['Squaring means multiply the number by itself.', '$6 × 6 = 36$.'],
        solutionVn: ['Bình phương nghĩa là nhân số đó với chính nó.', '$6 × 6 = 36$.'],
        answer: '$36$', answerVn: '$36$',
      },
      {
        id: 'f2', prompt: 'Work out $\\sqrt{81}$.', promptVn: 'Tính $\\sqrt{81}$.',
        solution: ['Ask which number times itself is 81.', '$9 × 9 = 81$, so $\\sqrt{81} = 9$.'],
        solutionVn: ['Hỏi số nào nhân với chính nó bằng 81.', '$9 × 9 = 81$, nên $\\sqrt{81} = 9$.'],
        answer: '$9$', answerVn: '$9$',
      },
      {
        id: 'f3', prompt: 'Work out $2^3$ (two cubed).', promptVn: 'Tính $2^3$ (hai lập phương).',
        solution: ['Cubing means multiply the number by itself twice.', '$2 × 2 × 2 = 8$.'],
        solutionVn: ['Lập phương nghĩa là nhân số đó với chính nó hai lần.', '$2 × 2 × 2 = 8$.'],
        answer: '$8$', answerVn: '$8$',
      },
      {
        id: 'f4', prompt: 'Work out $\\sqrt[3]{27}$ (the cube root of 27).', promptVn: 'Tính $\\sqrt[3]{27}$ (căn bậc ba của 27).',
        solution: ['Ask which number times itself twice is 27.', '$3 × 3 × 3 = 27$, so $\\sqrt[3]{27} = 3$.'],
        solutionVn: ['Hỏi số nào nhân với chính nó hai lần bằng 27.', '$3 × 3 × 3 = 27$, nên $\\sqrt[3]{27} = 3$.'],
        answer: '$3$', answerVn: '$3$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', prompt: 'Work out $\\sqrt{169}$.', promptVn: 'Tính $\\sqrt{169}$.',
        solution: ['169 is on the list of squares: $13 × 13 = 169$.', 'So $\\sqrt{169} = 13$.'],
        solutionVn: ['169 có trong bảng bình phương: $13 × 13 = 169$.', 'Vậy $\\sqrt{169} = 13$.'],
        answer: '$13$', answerVn: '$13$',
      },
      {
        id: 'p2', prompt: 'Work out $4^3$ (four cubed).', promptVn: 'Tính $4^3$ (bốn lập phương).',
        solution: ['$4 × 4 = 16$, then $16 × 4 = 64$.', 'So $4^3 = 64$.'],
        solutionVn: ['$4 × 4 = 16$, rồi $16 × 4 = 64$.', 'Vậy $4^3 = 64$.'],
        answer: '$64$', answerVn: '$64$',
      },
      {
        id: 'p3', prompt: 'Between which two whole numbers does $\\sqrt{50}$ lie?', promptVn: '$\\sqrt{50}$ nằm giữa hai số nguyên nào?',
        solution: ['50 is between the squares $49 = 7^2$ and $64 = 8^2$.', 'So $\\sqrt{50}$ is between 7 and 8.'],
        solutionVn: ['50 nằm giữa hai số chính phương $49 = 7^2$ và $64 = 8^2$.', 'Vậy $\\sqrt{50}$ nằm giữa 7 và 8.'],
        answer: '7 and 8', answerVn: '7 and 8',
      },
      {
        id: 'p4', prompt: 'Work out $\\sqrt{121} + \\sqrt[3]{8}$.', promptVn: 'Tính $\\sqrt{121} + \\sqrt[3]{8}$.',
        solution: ['Roots first: $\\sqrt{121} = 11$ and $\\sqrt[3]{8} = 2$.', 'Then add: $11 + 2 = 13$.'],
        solutionVn: ['Tính căn trước: $\\sqrt{121} = 11$ và $\\sqrt[3]{8} = 2$.', 'Rồi cộng: $11 + 2 = 13$.'],
        answer: '$13$', answerVn: '$13$',
      },
      {
        id: 'p5', prompt: 'The square root of a number is 9. What is the number?', promptVn: 'Căn bậc hai của một số bằng 9. Số đó là bao nhiêu?',
        solution: ['If the square root is 9, the number is $9$ squared.', '$9 × 9 = 81$.'],
        solutionVn: ['Nếu căn bậc hai là 9, thì số đó là $9$ bình phương.', '$9 × 9 = 81$.'],
        answer: '$81$', answerVn: '$81$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1', prompt: '64 is on the list of squares **and** the list of cubes. Work out both $\\sqrt{64}$ and $\\sqrt[3]{64}$.', promptVn: '64 có trong bảng bình phương **và** bảng lập phương. Tính cả $\\sqrt{64}$ và $\\sqrt[3]{64}$.',
        solution: ['$8 × 8 = 64$, so $\\sqrt{64} = 8$.', '$4 × 4 × 4 = 64$, so $\\sqrt[3]{64} = 4$.'],
        solutionVn: ['$8 × 8 = 64$, nên $\\sqrt{64} = 8$.', '$4 × 4 × 4 = 64$, nên $\\sqrt[3]{64} = 4$.'],
        answer: '8 and 4', answerVn: '8 and 4',
      },
      {
        id: 'c2', prompt: 'Mr Bowen tiles a wall with **576 square tiles** in a perfect square. How many tiles run along the bottom?', promptVn: 'Thầy Bowen lát một bức tường bằng **576 viên gạch vuông** thành một hình vuông hoàn hảo. Cạnh dưới có bao nhiêu viên gạch?',
        solution: ['576 is past the list, so trap it: $20 × 20 = 400$ and $25 × 25 = 625$, so the side is between 20 and 25.', 'Try 24: $24 × 24 = 576$. So there are **24** tiles along the bottom.'],
        solutionVn: ['576 nằm ngoài bảng, nên hãy kẹp lại: $20 × 20 = 400$ và $25 × 25 = 625$, nên cạnh nằm giữa 20 và 25.', 'Thử 24: $24 × 24 = 576$. Vậy cạnh dưới có **24** viên gạch.'],
        answer: '$24$', answerVn: '$24$',
      },
      {
        id: 'c3', prompt: '$\\sqrt{45}$ lies between 6 and 7. Is it closer to **6** or to **7**? Explain.', promptVn: '$\\sqrt{45}$ nằm giữa 6 và 7. Nó gần **6** hay gần **7** hơn? Giải thích.',
        solution: ['Compare 45 with the two squares: $36 = 6^2$ and $49 = 7^2$.', '45 is much closer to 49 than to 36, so $\\sqrt{45}$ is closer to **7**.'],
        solutionVn: ['So sánh 45 với hai số chính phương: $36 = 6^2$ và $49 = 7^2$.', '45 gần 49 hơn nhiều so với 36, nên $\\sqrt{45}$ gần **7** hơn.'],
        answer: '7', answerVn: '7',
      },
    ],
  },
];
