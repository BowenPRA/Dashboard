// src/data/AMC8/PT_01/workbook.js
// The "Practice" (warm-up) task for PT_01, done BEFORE the timed practice test.
// It rehearses the IDEAS the test needs on fresh problems: twelve questions in
// three tiers, each with a full stepped solution shown after the answer.
//
// EVERY NUMBER AND EVERY CONTEXT IS FRESH. No problem of the practice test is
// reused, quoted or given away here — only the idea behind it is rehearsed.
//
// Problem → idea it rehearses
//   1 ones digit of a product and a subtraction   2 fractions to one decimal
//   3 area of a frame by subtraction              4 list every case, count distinct totals
//   5 ratio as parts: which total is possible     6 four quantities with known differences
//   7 missing coordinate from a triangle's area   8 sector of a ring as a fraction of a circle
//   9 least possible overlap of two groups       10 a ratio that changes after a transfer
//  11 squares crossed by a diagonal (a + b − gcd) 12 probability by counting the complement
//
// English only — AMC8 declares `bilingual: false`. No figures: every problem is
// complete in its words.
//
// MARKING NOTES.
//  · Most questions are five-option `mcq`, as in the contest. Every distractor
//    is the result of one nameable mistake; the last solution step names the
//    most tempting one.
//  · Questions 2, 6, 7 and 11 are typed (`text`). Each key is a plain number,
//    so mathEquivalence marks it by value; `accept` carries the versions with
//    a unit word.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'mcq',
        prompt: '**1** What is the ones digit of $13 \\times 27 \\times 46 - 99$?',
        options: [
          { val: 'a', text: '$3$' },
          { val: 'b', text: '$4$' },
          { val: 'c', text: '$5$' },
          { val: 'd', text: '$6$' },
          { val: 'e', text: '$7$' },
        ],
        correct: 'e',
        solution: [
          'Only the ones digits matter. The ones digits of the three factors are $3$, $7$ and $6$.',
          '$3 \\times 7 = 21$, so keep the ones digit $1$.',
          '$1 \\times 6 = 6$, so the product $13 \\times 27 \\times 46$ ends in $6$.',
          'Now subtract a number that ends in $9$. We cannot do $6 - 9$, so borrow a ten: $16 - 9 = 7$.',
          'The ones digit is $7$. (Check: $13 \\times 27 \\times 46 = 16146$ and $16146 - 99 = 16047$.)',
          'The trap is $3$: that comes from $9 - 6$, subtracting the wrong way round. When the top digit is smaller, borrow.',
        ],
        answer: '$7$',
      },
      {
        id: 'f2',
        type: 'text',
        prompt: '**2** Write $\\dfrac{21}{7} + \\dfrac{7}{20} + \\dfrac{3}{500}$ as a decimal.',
        answer: '3.356',
        solution: [
          'Change each fraction to a decimal, one at a time.',
          '$\\dfrac{21}{7} = 3$.',
          '$\\dfrac{7}{20} = \\dfrac{35}{100} = 0.35$. (Multiply top and bottom by $5$ to get hundredths.)',
          '$\\dfrac{3}{500} = \\dfrac{6}{1000} = 0.006$. (Multiply top and bottom by $2$ to get thousandths.)',
          'Add, keeping the place values in line: $3 + 0.35 + 0.006 = 3.356$.',
          'Be careful with the last fraction: $\\dfrac{6}{1000}$ is $0.006$, not $0.06$. Thousandths need three decimal places.',
        ],
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: '**3** A photo is a rectangle $12$ cm long and $9$ cm wide. It has a frame around it. The frame is $2$ cm wide on every side. What is the area of the frame only, in square centimetres?',
        options: [
          { val: 'a', text: '$84$' },
          { val: 'b', text: '$100$' },
          { val: 'c', text: '$108$' },
          { val: 'd', text: '$208$' },
          { val: 'e', text: '$316$' },
        ],
        correct: 'b',
        solution: [
          'Frame $=$ big rectangle $-$ photo. So find the big rectangle first.',
          'The frame adds $2$ cm on **both** sides. Length: $12 + 2 + 2 = 16$ cm. Width: $9 + 2 + 2 = 13$ cm.',
          'Area of the big rectangle: $16 \\times 13 = 208$ cm².',
          'Area of the photo: $12 \\times 9 = 108$ cm².',
          'Area of the frame: $208 - 108 = 100$ cm².',
          'The trap is $84$: that is perimeter $\\times$ width, $42 \\times 2$. It forgets the four $2 \\times 2$ corner squares, which add $16$.',
        ],
        answer: '$100$ cm²',
      },
      {
        id: 'f4',
        type: 'mcq',
        prompt: '**4** Five cards show the numbers $1$, $2$, $3$, $5$ and $6$. Minh picks two different cards and adds the two numbers. How many different totals are possible?',
        options: [
          { val: 'a', text: '$8$' },
          { val: 'b', text: '$9$' },
          { val: 'c', text: '$10$' },
          { val: 'd', text: '$20$' },
          { val: 'e', text: '$25$' },
        ],
        correct: 'a',
        solution: [
          'List every pair in order, so that no pair is missed. Start with the pairs that use $1$.',
          'With $1$: $1+2=3$, $1+3=4$, $1+5=6$, $1+6=7$.',
          'With $2$ (new pairs only): $2+3=5$, $2+5=7$, $2+6=8$.',
          'With $3$: $3+5=8$, $3+6=9$. With $5$: $5+6=11$.',
          'That is $10$ pairs, but $7$ appears twice and $8$ appears twice. The different totals are $3, 4, 5, 6, 7, 8, 9, 11$.',
          'There are $8$ different totals. The trap is $10$: that counts the pairs. The question asks for **different** totals, so each repeat is counted once.',
        ],
        answer: '$8$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p5',
        type: 'mcq',
        prompt: '**5** A box holds only black, white and yellow pencils. The number of yellow pencils is three times the number of black pencils. The number of white pencils is half the number of black pencils. Which of these could be the total number of pencils in the box?',
        options: [
          { val: 'a', text: '$40$' },
          { val: 'b', text: '$42$' },
          { val: 'c', text: '$44$' },
          { val: 'd', text: '$45$' },
          { val: 'e', text: '$50$' },
        ],
        correct: 'd',
        solution: [
          'Use parts. Give the **smallest** group $1$ part, so that there are no fractions. The smallest group is white.',
          'White is half of black, so black is $2$ parts.',
          'Yellow is three times black, so yellow is $3 \\times 2 = 6$ parts.',
          'Total: $1 + 2 + 6 = 9$ parts. Each part is a whole number of pencils, so the total is a multiple of $9$.',
          'Only $45$ is a multiple of $9$: $45 = 9 \\times 5$. (Then white $= 5$, black $= 10$, yellow $= 30$.)',
          'The trap is $42$: that is a multiple of $6$, from the parts $1 + 3 + 2$ with white as **twice** black. Read "half the number of" slowly.',
        ],
        answer: '$45$',
      },
      {
        id: 'p6',
        type: 'text',
        prompt: '**6** Four shelves hold $80$ books in total. The second shelf holds $3$ more books than the first. The third shelf holds $1$ more book than the second. The fourth shelf holds $5$ more books than the third. How many books are on the fourth shelf?',
        answer: '25',
        accept: ['25 books'],
        solution: [
          'Let the first shelf hold $x$ books. Write every shelf using $x$.',
          'Second: $x + 3$. Third: $x + 3 + 1 = x + 4$. Fourth: $x + 4 + 5 = x + 9$.',
          'Add the four shelves: $x + (x + 3) + (x + 4) + (x + 9) = 4x + 16$.',
          'The total is $80$, so $4x + 16 = 80$. Then $4x = 64$ and $x = 16$.',
          'The fourth shelf holds $x + 9 = 16 + 9 = 25$ books. (Check: $16 + 19 + 20 + 25 = 80$.)',
          'Two traps. Each difference is measured from the shelf **before**, so the fourth is $x + 9$, not $x + 5$. And $16$ is the first shelf, not the answer.',
        ],
      },
      {
        id: 'p7',
        type: 'text',
        prompt: '**7** Triangle $PQR$ has vertices $P(4, 1)$, $Q(4, 9)$ and $R(x, 5)$. The point $R$ is to the right of the line $PQ$. The area of the triangle is $20$ square units. What is the value of $x$?',
        answer: '9',
        accept: ['x = 9'],
        solution: [
          '$P$ and $Q$ have the same $x$-coordinate, $4$. So $PQ$ is a vertical line. Use it as the base.',
          'Length of the base: $9 - 1 = 8$.',
          'Area $= \\dfrac{1}{2} \\times \\text{base} \\times \\text{height}$, so $20 = \\dfrac{1}{2} \\times 8 \\times h = 4h$. The height is $h = 5$.',
          'The base is vertical, so the height is the **horizontal** distance from $R$ to the line $x = 4$.',
          '$R$ is to the right of the line, so $x = 4 + 5 = 9$.',
          'The trap is to answer $5$. That is the height, not the coordinate. The height is a distance; add it to $4$.',
        ],
      },
      {
        id: 'p8',
        type: 'mcq',
        prompt: '**8** Two circles have the same centre. The small circle has radius $2$ and the large circle has radius $4$. A sector of the large circle has a central angle of $90°$. The part of this sector that is outside the small circle is shaded. What fraction of the large circle is shaded?',
        options: [
          { val: 'a', text: '$\\dfrac{1}{16}$' },
          { val: 'b', text: '$\\dfrac{1}{8}$' },
          { val: 'c', text: '$\\dfrac{3}{16}$' },
          { val: 'd', text: '$\\dfrac{1}{4}$' },
          { val: 'e', text: '$\\dfrac{3}{4}$' },
        ],
        correct: 'c',
        solution: [
          'Area of the large circle: $\\pi \\times 4^2 = 16\\pi$. Area of the small circle: $\\pi \\times 2^2 = 4\\pi$.',
          'The ring between the two circles has area $16\\pi - 4\\pi = 12\\pi$.',
          'A $90°$ sector is $\\dfrac{90}{360} = \\dfrac{1}{4}$ of a full turn. So the shaded part is $\\dfrac{1}{4}$ of the ring.',
          'Shaded area: $\\dfrac{1}{4} \\times 12\\pi = 3\\pi$.',
          'Fraction of the large circle: $\\dfrac{3\\pi}{16\\pi} = \\dfrac{3}{16}$.',
          'The trap is $\\dfrac{1}{8}$: that uses the radii, $\\dfrac{4 - 2}{4} = \\dfrac{1}{2}$ of the sector. Area uses the radius **squared**, so the ring is $\\dfrac{3}{4}$ of the circle, not $\\dfrac{1}{2}$.',
        ],
        answer: '$\\dfrac{3}{16}$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c9',
        type: 'mcq',
        prompt: '**9** A class has $28$ students. Exactly $\\dfrac{3}{4}$ of the students play football and exactly $\\dfrac{4}{7}$ of the students play chess. What is the least possible number of students who play both?',
        options: [
          { val: 'a', text: '$0$' },
          { val: 'b', text: '$5$' },
          { val: 'c', text: '$9$' },
          { val: 'd', text: '$12$' },
          { val: 'e', text: '$16$' },
        ],
        correct: 'c',
        solution: [
          'Change the fractions to numbers of students. Football: $\\dfrac{3}{4} \\times 28 = 21$. Chess: $\\dfrac{4}{7} \\times 28 = 16$.',
          'Add the two groups: $21 + 16 = 37$. But the class has only $28$ students.',
          'The extra $37 - 28 = 9$ must be students who were counted twice. So at least $9$ students play both.',
          'Can it be exactly $9$? Yes: $12$ play football only, $9$ play both, $7$ play chess only, and $12 + 9 + 7 = 28$.',
          'The least possible number is $9$.',
          'The trap is $12$: that comes from $\\dfrac{3}{4} \\times \\dfrac{4}{7} \\times 28$. Multiplying the fractions gives one possible overlap, not the **least possible** one. ($16$ is the greatest possible.)',
        ],
        answer: '$9$',
      },
      {
        id: 'c10',
        type: 'mcq',
        prompt: '**10** Jar A and jar B hold marbles. The ratio of the number of marbles in jar A to the number in jar B is $5 : 3$. Then $12$ marbles are moved from jar A to jar B. Now the ratio is $7 : 9$. How many marbles are there in the two jars altogether?',
        options: [
          { val: 'a', text: '$16$' },
          { val: 'b', text: '$24$' },
          { val: 'c', text: '$36$' },
          { val: 'd', text: '$40$' },
          { val: 'e', text: '$64$' },
        ],
        correct: 'e',
        solution: [
          'Marbles only move between the jars, so the **total** does not change. Compare both ratios with the total.',
          'At the start, $5 + 3 = 8$ parts, so jar A holds $\\dfrac{5}{8}$ of the total.',
          'At the end, $7 + 9 = 16$ parts, so jar A holds $\\dfrac{7}{16}$ of the total.',
          'Use the same denominator: $\\dfrac{5}{8} = \\dfrac{10}{16}$. Jar A lost $\\dfrac{10}{16} - \\dfrac{7}{16} = \\dfrac{3}{16}$ of the total.',
          'That loss is $12$ marbles. So $\\dfrac{1}{16}$ of the total is $4$, and the total is $16 \\times 4 = 64$.',
          'Check: $40$ and $24$ become $28$ and $36$, and $28 : 36 = 7 : 9$. The trap is $16$: it says jar B went from $3$ parts to $9$ parts, so $6$ parts $= 12$. But a part of $5 : 3$ and a part of $7 : 9$ are not the same size.',
        ],
        answer: '$64$',
      },
      {
        id: 'c11',
        type: 'text',
        prompt: '**11** A floor is a rectangle made of square tiles. It is $18$ tiles long and $12$ tiles wide. A straight line is drawn from one corner of the floor to the opposite corner. How many tiles does the line pass through? (A tile counts only if the line goes through its inside. Touching a corner of a tile does not count.)',
        answer: '24',
        accept: ['24 tiles'],
        solution: [
          'Make the problem smaller. The greatest common factor of $18$ and $12$ is $6$, so the line is $6$ equal pieces. Each piece crosses a small $3$ by $2$ rectangle, corner to corner.',
          'In a $3$ by $2$ rectangle the line crosses $2$ inside vertical lines and $1$ inside horizontal line, and never at the same point.',
          'The line starts in one tile, and each crossing moves it into a new tile: $1 + 2 + 1 = 4$ tiles.',
          'There are $6$ pieces, so the line passes through $6 \\times 4 = 24$ tiles.',
          'The rule: for an $a$ by $b$ rectangle the number is $a + b - \\gcd(a, b)$. Here $18 + 12 - 6 = 24$.',
          'The trap is $30$, from $18 + 12$. The line goes exactly through a corner point $6$ times (counting the end), and each time it crosses two lines but enters only one new tile.',
        ],
      },
      {
        id: 'c12',
        type: 'mcq',
        prompt: '**12** Six lockers stand in a row, numbered $1$ to $6$. Three of the lockers are chosen at random and painted. What is the probability that at least two of the painted lockers are adjacent?',
        options: [
          { val: 'a', text: '$\\dfrac{1}{5}$' },
          { val: 'b', text: '$\\dfrac{1}{4}$' },
          { val: 'c', text: '$\\dfrac{3}{5}$' },
          { val: 'd', text: '$\\dfrac{4}{5}$' },
          { val: 'e', text: '$1$' },
        ],
        correct: 'd',
        solution: [
          'Count all the choices. Three lockers from six: $\\dfrac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1} = 20$ sets.',
          '"At least two adjacent" has many cases. The opposite, "**no** two adjacent", is easier. Count that instead.',
          'List the sets with no two adjacent, in order: $\\{1, 3, 5\\}$, $\\{1, 3, 6\\}$, $\\{1, 4, 6\\}$, $\\{2, 4, 6\\}$. There are $4$.',
          'So $20 - 4 = 16$ sets have at least two adjacent lockers.',
          'Probability: $\\dfrac{16}{20} = \\dfrac{4}{5}$.',
          'The trap is $\\dfrac{1}{5}$: that is the probability of the opposite event. After you count the complement, remember to subtract from $1$.',
        ],
        answer: '$\\dfrac{4}{5}$',
      },
    ],
  },
];
