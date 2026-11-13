// src/data/ACELLUS/ALG_QUAD/notes.js
// Acellus: Solving Quadratics — the lesson deck.
//
// THE SPINE, and why it is in this order:
//   1–4    what "solve" means for a quadratic: up to two answers, and the four
//          names Acellus uses for them (zeros, roots, solutions, x-intercepts)
//          are one idea — where the graph meets y = 0. The ParabolaLab slide
//          lets them watch two zeros become one become none.
//   5–6    standard form and a, b, c; the zero product property — the reason
//          factoring solves anything at all.
//   7–10   factoring x² + bx + c: the area picture first (why multiply-to and
//          add-to), then the method with the live pair table, the sign rules,
//          and a whole solve from equation to answers.
//   11–13  common factor first, the ac method for a ≠ 1, the three special
//          patterns (difference of squares, perfect square, c = 0).
//   14–18  when it will not factor: the quadratic formula, worked twice (a
//          whole-number answer and a √ answer, simplified), then the
//          discriminant as "how many solutions" before you even start.
//   19–21  which method when, the mistakes that cost marks, the recap.
//
// House notes (as ALG_INEQ):
//  · BILINGUAL: every learner-facing string carries its `Vn` twin.
//  · `$$…$$` only in content, callout bodies and reveal.answer; `$…$` elsewhere.
//  · Layout `title` and hero `objective` are plain text.
//  · `check` is always the LAST key on its slide (the narrator stops there).
//  · The three tasks after this deck do the same steps with the student's own
//    hands: Factor It (slides 8–13), Formula (15–18), Quad Solver (all of it).
import { DIAGRAMS } from './diagrams.js';

const PURPLE = '#7c3aed';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const AMBER = '#d97706';
const RED = '#ef4444';
const PINK = '#db2777';

export const notes = [
  {
    layout: 'hero',
    color: '#6d28d9',
    icon: 'Variable',
    brand: 'Acellus Algebra I',
    brandVn: 'Acellus Đại số I',
    eyebrow: 'Factoring, the zero product property and the quadratic formula',
    eyebrowVn: 'Phân tích nhân tử, tính chất tích bằng 0 và công thức nghiệm',
    title: 'Solving Quadratics',
    titleVn: 'Giải Phương Trình Bậc Hai',
    objective: 'I can find the zeros of a quadratic by factoring it, and by using the quadratic formula when it will not factor, and I can explain every step.',
    objectiveVn: 'Em có thể tìm nghiệm của phương trình bậc hai bằng cách phân tích nhân tử, và bằng công thức nghiệm khi không phân tích được, và em giải thích được từng bước.',
    warmUp: 'Find two numbers that multiply to $12$ and add to $7$. Then find two that multiply to $12$ and add to $-8$.',
    warmUpVn: 'Tìm hai số có tích bằng $12$ và tổng bằng $7$. Rồi tìm hai số có tích bằng $12$ và tổng bằng $-8$.',
  },

  {
    layout: 'statement',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Before any method',
    eyebrowVn: 'Trước khi học phương pháp',
    title: 'How Many Answers?',
    titleVn: 'Có Bao Nhiêu Đáp Án?',
    label: 'Think first',
    labelVn: 'Suy nghĩ trước',
    labelIcon: 'Lightbulb',
    text: '$2x - 6 = 0$ has one answer. Which numbers make $x^2 - 9 = 0$ true?',
    textVn: '$2x - 6 = 0$ có một đáp án. Những số nào làm cho $x^2 - 9 = 0$ đúng?',
    sub: 'Try a few numbers in your head before you look.',
    subVn: 'Hãy thử vài số trong đầu trước khi xem đáp án.',
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      prompt: 'Is $3$ the only one?',
      promptVn: '$3$ có phải là số duy nhất không?',
      answer: 'No — $3^2 = 9$, but so is $(-3)^2 = 9$. A quadratic (an equation with an $x^2$) can have **two** answers. That is why every method in this lesson ends with "$x = \\dots$ **or** $x = \\dots$".',
      answerVn: 'Không — $3^2 = 9$, nhưng $(-3)^2 = 9$ cũng vậy. Phương trình bậc hai (có $x^2$) có thể có **hai** đáp án. Vì vậy mọi phương pháp trong bài này đều kết thúc bằng "$x = \\dots$ **hoặc** $x = \\dots$".',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Crosshair',
    ratio: 52,
    eyebrow: 'Four words, one idea',
    eyebrowVn: 'Bốn từ, một ý',
    title: 'Zeros, Roots, Solutions, x-Intercepts',
    titleVn: 'Nghiệm, Không Điểm, Giao Điểm Với Trục x',
    inlineSvg: DIAGRAMS.ZEROS_GRAPH,
    content: 'Acellus asks for the **zeros**, the **roots**, the **solutions** or the **x-intercepts**. They are all the same numbers.\n\nThey are the values of $x$ that make $y = 0$ — the places where the parabola crosses the $x$-axis.',
    contentVn: 'Acellus có thể hỏi **zeros**, **roots**, **solutions** hoặc **x-intercepts**. Tất cả đều là cùng những con số.\n\nĐó là các giá trị của $x$ làm cho $y = 0$ — những chỗ parabol cắt trục $x$.',
    notes: [
      {
        tone: 'write',
        text: 'To find the zeros of $y = x^2 - 2x - 3$, solve $x^2 - 2x - 3 = 0$. **Set it equal to 0 first.**',
        textVn: 'Để tìm nghiệm của $y = x^2 - 2x - 3$, giải $x^2 - 2x - 3 = 0$. **Cho biểu thức bằng 0 trước.**',
      },
    ],
    check: {
      id: 'chk_names',
      q: 'The graph of a quadratic crosses the $x$-axis at $(-4, 0)$ and $(1, 0)$. What are its roots?',
      qVn: 'Đồ thị một hàm bậc hai cắt trục $x$ tại $(-4, 0)$ và $(1, 0)$. Các nghiệm (roots) của nó là gì?',
      options: [
        { val: 'A', text: '$x = -4$ and $x = 1$', textVn: '$x = -4$ và $x = 1$' },
        { val: 'B', text: '$x = 4$ and $x = -1$', textVn: '$x = 4$ và $x = -1$' },
        { val: 'C', text: '$x = 0$', textVn: '$x = 0$' },
        { val: 'D', text: 'You cannot tell without the equation', textVn: 'Không thể biết nếu không có phương trình' },
      ],
      correct: 'A',
      expEn: 'Roots and $x$-intercepts are the same thing: read the $x$-coordinates straight off the points, signs and all. B flips the signs — that is a factoring habit, not a graph-reading one. The graph IS the answer, so D is wrong.',
      expVn: 'Nghiệm và giao điểm với trục $x$ là một: đọc thẳng hoành độ của các điểm, giữ nguyên dấu. B đổi dấu — đó là thói quen khi phân tích, không phải khi đọc đồ thị. Đồ thị chính là đáp án, nên D sai.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Activity',
    ratio: 55,
    eyebrow: 'Move it and watch',
    eyebrowVn: 'Kéo và quan sát',
    title: 'Two, One or None',
    titleVn: 'Hai, Một Hoặc Không',
    widget: { type: 'ParabolaLab', params: { show: 'k', zeros: true, kStart: -4 } },
    content: 'Drag the slider to move the parabola up and down. Count the zeros.\n\nLow down it crosses the $x$-axis **twice**. At one exact height it just **touches** — one zero. Any higher and it **never reaches** the axis: no real solutions.',
    contentVn: 'Kéo thanh trượt để di chuyển parabol lên xuống. Đếm số nghiệm.\n\nKhi ở thấp nó cắt trục $x$ **hai lần**. Ở đúng một độ cao nó chỉ **chạm** — một nghiệm. Cao hơn nữa thì nó **không bao giờ chạm** trục: vô nghiệm thực.',
    notes: [
      {
        tone: 'info',
        text: 'So "no real solutions" is a real answer. Later the **discriminant** will tell you which case you are in before you start.',
        textVn: 'Vậy "vô nghiệm thực" cũng là một đáp án thật sự. Lát nữa **biệt thức** sẽ cho em biết trường hợp nào trước khi bắt đầu giải.',
      },
    ],
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Equal',
    ratio: 50,
    eyebrow: 'Always the first line',
    eyebrowVn: 'Luôn là dòng đầu tiên',
    title: 'Standard Form and a, b, c',
    titleVn: 'Dạng Chuẩn và a, b, c',
    content: 'Every method starts from **standard form**:\n\n$$ax^2 + bx + c = 0$$\n\n$a$ is the number with $x^2$, $b$ the number with $x$, and $c$ the number on its own. **The sign in front belongs to the number.**\n\nIf terms are on both sides, move them all to the left first — a term that crosses the $=$ sign changes its sign.',
    contentVn: 'Mọi phương pháp đều bắt đầu từ **dạng chuẩn**:\n\n$$ax^2 + bx + c = 0$$\n\n$a$ là số đi với $x^2$, $b$ là số đi với $x$, và $c$ là số đứng riêng. **Dấu đứng trước thuộc về số đó.**\n\nNếu có hạng tử ở cả hai vế, hãy chuyển hết sang trái trước — hạng tử qua dấu $=$ thì đổi dấu.',
    notes: [
      {
        tone: 'write',
        text: '$x^2 = 5x - 6$ becomes $x^2 - 5x + 6 = 0$, so $a = 1$, $b = -5$, $c = 6$.',
        textVn: '$x^2 = 5x - 6$ trở thành $x^2 - 5x + 6 = 0$, nên $a = 1$, $b = -5$, $c = 6$.',
      },
      {
        tone: 'info',
        text: 'No $x$ term means $b = 0$. Just $x^2$ means $a = 1$; $-x$ means $b = -1$.',
        textVn: 'Không có hạng tử $x$ nghĩa là $b = 0$. Chỉ $x^2$ nghĩa là $a = 1$; $-x$ nghĩa là $b = -1$.',
      },
    ],
    check: {
      id: 'chk_abc',
      q: 'Write $3x^2 - x = 5$ in standard form. What is $c$?',
      qVn: 'Viết $3x^2 - x = 5$ về dạng chuẩn. $c$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$5$', textVn: '$5$' },
        { val: 'B', text: '$-1$', textVn: '$-1$' },
        { val: 'C', text: '$-5$', textVn: '$-5$' },
        { val: 'D', text: '$0$', textVn: '$0$' },
      ],
      correct: 'C',
      expEn: 'Move the $5$ to the left: $3x^2 - x - 5 = 0$, so $c = -5$. A forgets that crossing the $=$ sign changes the sign. B is $b$, the number with $x$.',
      expVn: 'Chuyển $5$ sang trái: $3x^2 - x - 5 = 0$, nên $c = -5$. A quên rằng qua dấu $=$ thì đổi dấu. B là $b$, số đi với $x$.',
    },
  },

  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Why factoring solves it',
    eyebrowVn: 'Vì sao phân tích lại giải được',
    title: 'The Zero Product Property',
    titleVn: 'Tính Chất Tích Bằng 0',
    content: 'If two numbers multiply to $0$, **at least one of them is $0$**. There is no other way to get $0$ from a multiplication.\n\n$$(x - 4)(x + 2) = 0$$\n\nSo either $x - 4 = 0$, which gives $x = 4$, or $x + 2 = 0$, which gives $x = -2$.',
    contentVn: 'Nếu hai số nhân với nhau bằng $0$, thì **ít nhất một số bằng $0$**. Không có cách nào khác để phép nhân ra $0$.\n\n$$(x - 4)(x + 2) = 0$$\n\nVậy hoặc $x - 4 = 0$, cho $x = 4$, hoặc $x + 2 = 0$, cho $x = -2$.',
    notes: [
      {
        tone: 'homework',
        text: 'It only works with **$0$** on the other side. $(x - 4)(x + 2) = 5$ tells you nothing about each bracket — move the $5$ over and multiply out first.',
        textVn: 'Chỉ áp dụng khi vế kia là **$0$**. $(x - 4)(x + 2) = 5$ không cho biết gì về từng ngoặc — hãy chuyển $5$ sang rồi nhân ra trước.',
      },
    ],
    check: {
      id: 'chk_zpp',
      q: 'What are the solutions of $(x + 5)(x - 3) = 0$?',
      qVn: 'Nghiệm của $(x + 5)(x - 3) = 0$ là gì?',
      options: [
        { val: 'A', text: '$x = 5$ or $x = -3$', textVn: '$x = 5$ hoặc $x = -3$' },
        { val: 'B', text: '$x = -5$ or $x = 3$', textVn: '$x = -5$ hoặc $x = 3$' },
        { val: 'C', text: '$x = -15$', textVn: '$x = -15$' },
        { val: 'D', text: '$x = 2$', textVn: '$x = 2$' },
      ],
      correct: 'B',
      expEn: 'Set each bracket to $0$: $x + 5 = 0$ gives $x = -5$, and $x - 3 = 0$ gives $x = 3$. The answer has the OPPOSITE sign to the number in the bracket — A copies the signs straight out, the most common slip in this unit.',
      expVn: 'Cho từng ngoặc bằng $0$: $x + 5 = 0$ cho $x = -5$, và $x - 3 = 0$ cho $x = 3$. Nghiệm có dấu NGƯỢC với số trong ngoặc — A chép nguyên dấu, lỗi phổ biến nhất của bài này.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Grid3x3',
    ratio: 52,
    eyebrow: 'Factoring is multiplying backwards',
    eyebrowVn: 'Phân tích là nhân ngược lại',
    title: 'Why Multiply to c and Add to b',
    titleVn: 'Vì Sao Tích Bằng c và Tổng Bằng b',
    inlineSvg: DIAGRAMS.AREA_FACTOR,
    content: 'Multiply $(x + 2)(x + 3)$ out and you get four pieces: $x^2$, $3x$, $2x$ and $6$.\n\nThe two $x$ pieces **add** to make the middle term, $5x$. The two numbers **multiply** to make the last term, $6$.\n\nSo to factor $x^2 + 5x + 6$, you hunt for two numbers that multiply to $6$ and add to $5$.',
    contentVn: 'Nhân $(x + 2)(x + 3)$ ra sẽ được bốn phần: $x^2$, $3x$, $2x$ và $6$.\n\nHai phần chứa $x$ **cộng** lại thành hạng tử giữa, $5x$. Hai số **nhân** lại thành hạng tử cuối, $6$.\n\nVì vậy để phân tích $x^2 + 5x + 6$, em tìm hai số có tích bằng $6$ và tổng bằng $5$.',
    notes: [
      {
        tone: 'info',
        text: 'You can always check a factorisation by multiplying it back out.',
        textVn: 'Em luôn có thể kiểm tra kết quả phân tích bằng cách nhân ngược lại.',
      },
    ],
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Search',
    eyebrow: 'Worked example · a = 1',
    eyebrowVn: 'Ví dụ mẫu · a = 1',
    title: 'Factoring x² + 7x + 12',
    titleVn: 'Phân Tích x² + 7x + 12',
    content: 'Tap the pairs on the right to see what each one adds to.',
    contentVn: 'Chạm vào các cặp bên phải để xem tổng của mỗi cặp.',
    widget: { type: 'FactorPairs', params: { P: 12, S: 7 } },
    steps: [
      { text: '**Read b and c.** $b = 7$, $c = 12$. You need two numbers that multiply to $12$ and add to $7$.', textVn: '**Đọc b và c.** $b = 7$, $c = 12$. Cần hai số có tích bằng $12$ và tổng bằng $7$.' },
      { text: '**List the factor pairs of 12** and add each one: $1 + 12 = 13$, $2 + 6 = 8$, $3 + 4 = 7$.', textVn: '**Liệt kê các cặp thừa số của 12** và cộng từng cặp: $1 + 12 = 13$, $2 + 6 = 8$, $3 + 4 = 7$.' },
      { text: '**Write the brackets.** $3$ and $4$ work, so $x^2 + 7x + 12 = (x + 3)(x + 4)$.', textVn: '**Viết hai ngoặc.** $3$ và $4$ thỏa mãn, nên $x^2 + 7x + 12 = (x + 3)(x + 4)$.' },
      { text: '**Check.** $(x + 3)(x + 4) = x^2 + 4x + 3x + 12 = x^2 + 7x + 12$.', textVn: '**Kiểm tra.** $(x + 3)(x + 4) = x^2 + 4x + 3x + 12 = x^2 + 7x + 12$.' },
    ],
    check: {
      id: 'chk_pair',
      q: 'Factor $x^2 + 9x + 20$.',
      qVn: 'Phân tích $x^2 + 9x + 20$.',
      options: [
        { val: 'A', text: '$(x + 2)(x + 10)$', textVn: '$(x + 2)(x + 10)$' },
        { val: 'B', text: '$(x + 4)(x + 5)$', textVn: '$(x + 4)(x + 5)$' },
        { val: 'C', text: '$(x + 9)(x + 20)$', textVn: '$(x + 9)(x + 20)$' },
        { val: 'D', text: '$(x + 3)(x + 6)$', textVn: '$(x + 3)(x + 6)$' },
      ],
      correct: 'B',
      expEn: '$4 \\times 5 = 20$ and $4 + 5 = 9$. A multiplies to $20$ but adds to $12$. C just copies $b$ and $c$ into the brackets. D adds to $9$ but multiplies to $18$ — both conditions must hold.',
      expVn: '$4 \\times 5 = 20$ và $4 + 5 = 9$. A có tích $20$ nhưng tổng $12$. C chỉ chép $b$ và $c$ vào ngoặc. D có tổng $9$ nhưng tích $18$ — phải thỏa cả hai điều kiện.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Scale',
    ratio: 50,
    eyebrow: 'Negative numbers',
    eyebrowVn: 'Số âm',
    title: 'The Signs Tell You Where to Look',
    titleVn: 'Dấu Cho Em Biết Tìm Ở Đâu',
    widget: { type: 'FactorPairs', params: { P: -15, S: -2 } },
    content: '**c positive** → the two numbers have the **same sign**, and it is the sign of $b$.\n\n$x^2 - 8x + 15 = (x - 3)(x - 5)$\n\n**c negative** → the two numbers have **opposite signs**, and the bigger one takes the sign of $b$.\n\n$x^2 - 2x - 15 = (x - 5)(x + 3)$',
    contentVn: '**c dương** → hai số **cùng dấu**, và đó là dấu của $b$.\n\n$x^2 - 8x + 15 = (x - 3)(x - 5)$\n\n**c âm** → hai số **trái dấu**, và số lớn hơn mang dấu của $b$.\n\n$x^2 - 2x - 15 = (x - 5)(x + 3)$',
    notes: [
      {
        tone: 'write',
        text: 'The table on the right is for $x^2 - 2x - 15$: multiply to $-15$, add to $-2$.',
        textVn: 'Bảng bên phải dành cho $x^2 - 2x - 15$: tích bằng $-15$, tổng bằng $-2$.',
      },
    ],
    check: {
      id: 'chk_signs',
      q: 'Factor $x^2 + 4x - 21$.',
      qVn: 'Phân tích $x^2 + 4x - 21$.',
      options: [
        { val: 'A', text: '$(x - 7)(x + 3)$', textVn: '$(x - 7)(x + 3)$' },
        { val: 'B', text: '$(x + 7)(x + 3)$', textVn: '$(x + 7)(x + 3)$' },
        { val: 'C', text: '$(x + 7)(x - 3)$', textVn: '$(x + 7)(x - 3)$' },
        { val: 'D', text: '$(x - 7)(x - 3)$', textVn: '$(x - 7)(x - 3)$' },
      ],
      correct: 'C',
      expEn: '$c = -21$ is negative, so the signs are opposite, and $b = +4$ is positive, so the bigger number is positive: $7 - 3 = 4$. A gives $-4x$ in the middle; B and D multiply to $+21$.',
      expVn: '$c = -21$ âm, nên hai số trái dấu, và $b = +4$ dương, nên số lớn hơn mang dấu dương: $7 - 3 = 4$. A cho hạng tử giữa là $-4x$; B và D có tích $+21$.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Route',
    eyebrow: 'Worked example · the whole solve',
    eyebrowVn: 'Ví dụ mẫu · giải trọn vẹn',
    title: 'Solve x² − x − 12 = 0',
    titleVn: 'Giải x² − x − 12 = 0',
    content: 'Factoring is only half the job. The question asks for $x$.',
    contentVn: 'Phân tích mới chỉ là một nửa. Đề bài hỏi $x$.',
    steps: [
      { text: '**Standard form?** Yes: $a = 1$, $b = -1$, $c = -12$.', textVn: '**Dạng chuẩn chưa?** Rồi: $a = 1$, $b = -1$, $c = -12$.' },
      { text: '**Multiply to $-12$, add to $-1$.** Opposite signs, bigger one negative: $-4$ and $3$.', textVn: '**Tích bằng $-12$, tổng bằng $-1$.** Trái dấu, số lớn hơn âm: $-4$ và $3$.' },
      { text: '**Factor.** $(x - 4)(x + 3) = 0$', textVn: '**Phân tích.** $(x - 4)(x + 3) = 0$' },
      { text: '**Zero product property.** $x - 4 = 0$ or $x + 3 = 0$, so $x = 4$ or $x = -3$.', textVn: '**Tính chất tích bằng 0.** $x - 4 = 0$ hoặc $x + 3 = 0$, nên $x = 4$ hoặc $x = -3$.' },
    ],
    reveal: {
      label: 'Check by substituting',
      labelVn: 'Kiểm tra bằng cách thế vào',
      prompt: 'Does $x = -3$ really work?',
      promptVn: '$x = -3$ có thật sự đúng không?',
      answer: '$(-3)^2 - (-3) - 12 = 9 + 3 - 12 = 0$. Yes. Substituting back is the fastest way to catch a sign slip before Acellus does.',
      answerVn: '$(-3)^2 - (-3) - 12 = 9 + 3 - 12 = 0$. Đúng. Thế ngược lại là cách nhanh nhất để bắt lỗi dấu trước khi Acellus bắt.',
    },
    check: {
      id: 'chk_solve',
      q: 'Solve $x^2 - 4x - 12 = 0$.',
      qVn: 'Giải $x^2 - 4x - 12 = 0$.',
      options: [
        { val: 'A', text: '$x = -6$ or $x = 2$', textVn: '$x = -6$ hoặc $x = 2$' },
        { val: 'B', text: '$x = 6$ or $x = -2$', textVn: '$x = 6$ hoặc $x = -2$' },
        { val: 'C', text: '$x = 4$ or $x = 3$', textVn: '$x = 4$ hoặc $x = 3$' },
        { val: 'D', text: '$x = -4$ or $x = -3$', textVn: '$x = -4$ hoặc $x = -3$' },
      ],
      correct: 'B',
      expEn: 'Multiply to $-12$, add to $-4$: $-6$ and $2$. So $(x - 6)(x + 2) = 0$, giving $x = 6$ or $x = -2$. A is the right pair with the signs copied out of the brackets instead of solved.',
      expVn: 'Tích bằng $-12$, tổng bằng $-4$: $-6$ và $2$. Vậy $(x - 6)(x + 2) = 0$, cho $x = 6$ hoặc $x = -2$. A là đúng cặp số nhưng chép nguyên dấu trong ngoặc thay vì giải.',
    },
  },

  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Divide',
    eyebrow: 'Always look first',
    eyebrowVn: 'Luôn nhìn trước',
    title: 'Take Out the Common Factor First',
    titleVn: 'Đặt Nhân Tử Chung Ra Trước',
    content: 'If every term divides by the same number, take it out before anything else. The numbers get smaller and the hunt gets easier.\n\n$$3x^2 + 15x + 18 = 3(x^2 + 5x + 6) = 3(x + 2)(x + 3)$$\n\nWhen it is an equation, the $3$ can never be $0$, so the solutions come from the brackets: $x = -2$ or $x = -3$.',
    contentVn: 'Nếu mọi hạng tử chia hết cho cùng một số, hãy đặt nó ra ngoài trước tiên. Các số nhỏ lại và việc tìm cặp số dễ hơn.\n\n$$3x^2 + 15x + 18 = 3(x^2 + 5x + 6) = 3(x + 2)(x + 3)$$\n\nKhi là phương trình, số $3$ không bao giờ bằng $0$, nên nghiệm đến từ các ngoặc: $x = -2$ hoặc $x = -3$.',
    notes: [
      {
        tone: 'info',
        text: 'If $a$ is negative, take out $-1$ too (or multiply the equation by $-1$). $-x^2 + 5x - 6 = 0$ becomes $x^2 - 5x + 6 = 0$.',
        textVn: 'Nếu $a$ âm, hãy đặt luôn $-1$ ra ngoài (hoặc nhân phương trình với $-1$). $-x^2 + 5x - 6 = 0$ thành $x^2 - 5x + 6 = 0$.',
      },
    ],
    check: {
      id: 'chk_gcf',
      q: 'What should you do FIRST to factor $2x^2 - 8x - 10$?',
      qVn: 'Việc ĐẦU TIÊN nên làm để phân tích $2x^2 - 8x - 10$ là gì?',
      options: [
        { val: 'A', text: 'Use the ac method with $a \\times c = -20$', textVn: 'Dùng phương pháp ac với $a \\times c = -20$' },
        { val: 'B', text: 'Take out $2$: $2(x^2 - 4x - 5)$', textVn: 'Đặt $2$ ra ngoài: $2(x^2 - 4x - 5)$' },
        { val: 'C', text: 'Take out $x$', textVn: 'Đặt $x$ ra ngoài' },
        { val: 'D', text: 'Use the quadratic formula', textVn: 'Dùng công thức nghiệm' },
      ],
      correct: 'B',
      expEn: 'Every term divides by $2$, and inside you get $x^2 - 4x - 5 = (x - 5)(x + 1)$ with $a = 1$ — much easier. A would work, but with bigger numbers. C is wrong: $-10$ has no $x$. D works on anything, but it is the long way round here.',
      expVn: 'Mọi hạng tử đều chia hết cho $2$, và bên trong còn $x^2 - 4x - 5 = (x - 5)(x + 1)$ với $a = 1$ — dễ hơn nhiều. A cũng được, nhưng với số lớn hơn. C sai: $-10$ không có $x$. D dùng được cho mọi bài, nhưng ở đây là đường vòng.',
    },
  },

  {
    layout: 'steps',
    accent: PINK,
    icon: 'Split',
    eyebrow: 'When a is not 1',
    eyebrowVn: 'Khi a khác 1',
    title: 'The ac Method: 2x² + 7x + 3',
    titleVn: 'Phương Pháp ac: 2x² + 7x + 3',
    widget: { type: 'FactorPairs', params: { P: 6, S: 7 } },
    content: 'Same hunt, but for $a \\times c$ — then two extra lines.',
    contentVn: 'Vẫn tìm cặp số, nhưng cho $a \\times c$ — rồi thêm hai dòng.',
    steps: [
      { text: '**Multiply a × c.** $2 \\times 3 = 6$. Find two numbers that multiply to $6$ and add to $b = 7$: $1$ and $6$.', textVn: '**Tính a × c.** $2 \\times 3 = 6$. Tìm hai số có tích bằng $6$ và tổng bằng $b = 7$: $1$ và $6$.' },
      { text: '**Split the middle term.** $2x^2 + x + 6x + 3$ — still the same expression, $x + 6x = 7x$.', textVn: '**Tách hạng tử giữa.** $2x^2 + x + 6x + 3$ — vẫn là biểu thức cũ, $x + 6x = 7x$.' },
      { text: '**Group and factor each pair.** $(2x^2 + x) + (6x + 3) = x(2x + 1) + 3(2x + 1)$. The brackets match — good sign.', textVn: '**Nhóm và phân tích từng cặp.** $(2x^2 + x) + (6x + 3) = x(2x + 1) + 3(2x + 1)$. Hai ngoặc giống nhau — dấu hiệu tốt.' },
      { text: '**Take out the matching bracket.** $(2x + 1)(x + 3)$. Solving: $2x + 1 = 0$ gives $x = -\\frac{1}{2}$; $x + 3 = 0$ gives $x = -3$.', textVn: '**Đặt ngoặc chung ra ngoài.** $(2x + 1)(x + 3)$. Giải: $2x + 1 = 0$ cho $x = -\\frac{1}{2}$; $x + 3 = 0$ cho $x = -3$.' },
    ],
    check: {
      id: 'chk_ac',
      q: 'To factor $3x^2 + 10x + 8$ by the ac method, which two numbers do you need?',
      qVn: 'Để phân tích $3x^2 + 10x + 8$ bằng phương pháp ac, em cần hai số nào?',
      options: [
        { val: 'A', text: '$2$ and $4$', textVn: '$2$ và $4$' },
        { val: 'B', text: '$4$ and $6$', textVn: '$4$ và $6$' },
        { val: 'C', text: '$3$ and $8$', textVn: '$3$ và $8$' },
        { val: 'D', text: '$2$ and $12$', textVn: '$2$ và $12$' },
      ],
      correct: 'B',
      expEn: '$a \\times c = 3 \\times 8 = 24$, and $4 \\times 6 = 24$ with $4 + 6 = 10$. A multiplies to $c = 8$ only — forgetting the $a$. D multiplies to $24$ but adds to $14$. Then: $3x^2 + 4x + 6x + 8 = x(3x + 4) + 2(3x + 4) = (3x + 4)(x + 2)$.',
      expVn: '$a \\times c = 3 \\times 8 = 24$, và $4 \\times 6 = 24$ với $4 + 6 = 10$. A chỉ có tích bằng $c = 8$ — quên mất $a$. D có tích $24$ nhưng tổng $14$. Tiếp theo: $3x^2 + 4x + 6x + 8 = x(3x + 4) + 2(3x + 4) = (3x + 4)(x + 2)$.',
    },
  },

  {
    layout: 'compare',
    icon: 'Layers',
    accent: AMBER,
    eyebrow: 'Spot these and save time',
    eyebrowVn: 'Nhận ra những dạng này để tiết kiệm thời gian',
    title: 'Three Special Patterns',
    titleVn: 'Ba Dạng Đặc Biệt',
    columns: [
      {
        heading: 'Difference of squares',
        headingVn: 'Hiệu hai bình phương',
        accent: BLUE,
        icon: 'Square',
        content: 'No middle term, two squares, a minus:\n\n$x^2 - 49 = (x + 7)(x - 7)$\n\n$x = 7$ or $x = -7$.',
        contentVn: 'Không có hạng tử giữa, hai bình phương, dấu trừ:\n\n$x^2 - 49 = (x + 7)(x - 7)$\n\n$x = 7$ hoặc $x = -7$.',
      },
      {
        heading: 'Perfect square',
        headingVn: 'Bình phương của tổng',
        accent: GREEN,
        icon: 'Box',
        content: 'Both numbers the same:\n\n$x^2 + 6x + 9 = (x + 3)^2$\n\nOnly **one** solution: $x = -3$.',
        contentVn: 'Hai số giống nhau:\n\n$x^2 + 6x + 9 = (x + 3)^2$\n\nChỉ có **một** nghiệm: $x = -3$.',
      },
      {
        heading: 'No number term',
        headingVn: 'Không có hạng tử tự do',
        accent: PURPLE,
        icon: 'Variable',
        content: '$c = 0$, so take out $x$:\n\n$x^2 - 5x = x(x - 5)$\n\n$x = 0$ or $x = 5$. **Never divide by x** — you lose $x = 0$.',
        contentVn: '$c = 0$, nên đặt $x$ ra ngoài:\n\n$x^2 - 5x = x(x - 5)$\n\n$x = 0$ hoặc $x = 5$. **Đừng bao giờ chia cho x** — em sẽ mất nghiệm $x = 0$.',
      },
    ],
    check: {
      id: 'chk_divide_x',
      q: 'A student solves $x^2 = 6x$ by dividing both sides by $x$ and gets $x = 6$. What is wrong?',
      qVn: 'Một học sinh giải $x^2 = 6x$ bằng cách chia hai vế cho $x$ và được $x = 6$. Sai ở đâu?',
      options: [
        { val: 'A', text: 'Nothing — $x = 6$ is the only answer', textVn: 'Không sai gì — $x = 6$ là nghiệm duy nhất' },
        { val: 'B', text: 'It should be $x = -6$', textVn: 'Phải là $x = -6$' },
        { val: 'C', text: 'They lost the solution $x = 0$', textVn: 'Học sinh làm mất nghiệm $x = 0$' },
        { val: 'D', text: 'There are no real solutions', textVn: 'Không có nghiệm thực' },
      ],
      correct: 'C',
      expEn: 'Dividing by $x$ secretly assumes $x \\neq 0$. Do it properly: $x^2 - 6x = 0$, $x(x - 6) = 0$, so $x = 0$ or $x = 6$. Check: $0^2 = 6 \\times 0$. Yes, $0$ works.',
      expVn: 'Chia cho $x$ là ngầm cho rằng $x \\neq 0$. Làm đúng: $x^2 - 6x = 0$, $x(x - 6) = 0$, nên $x = 0$ hoặc $x = 6$. Kiểm tra: $0^2 = 6 \\times 0$. Đúng, $0$ là nghiệm.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'HelpCircle',
    eyebrow: 'Not every quadratic plays nicely',
    eyebrowVn: 'Không phải phương trình nào cũng dễ',
    title: 'What If It Will Not Factor?',
    titleVn: 'Nếu Không Phân Tích Được Thì Sao?',
    label: 'Try it',
    labelVn: 'Thử xem',
    labelIcon: 'Lightbulb',
    text: 'Factor $x^2 + 4x - 3$. You need two numbers that multiply to $-3$ and add to $4$.',
    textVn: 'Phân tích $x^2 + 4x - 3$. Cần hai số có tích bằng $-3$ và tổng bằng $4$.',
    sub: 'The only pairs are $1, -3$ and $-1, 3$. What do they add to?',
    subVn: 'Chỉ có các cặp $1, -3$ và $-1, 3$. Tổng của chúng là bao nhiêu?',
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      prompt: 'Does any pair work?',
      promptVn: 'Có cặp nào thỏa không?',
      answer: 'No: $1 + (-3) = -2$ and $-1 + 3 = 2$. No whole numbers work, so it does not factor nicely. But the parabola still crosses the $x$-axis — its zeros are just not whole numbers. For these we need a method that **always** works: the quadratic formula.',
      answerVn: 'Không: $1 + (-3) = -2$ và $-1 + 3 = 2$. Không có số nguyên nào thỏa, nên không phân tích đẹp được. Nhưng parabol vẫn cắt trục $x$ — chỉ là nghiệm không phải số nguyên. Với những bài này ta cần một phương pháp **luôn luôn** dùng được: công thức nghiệm.',
    },
  },

  {
    layout: 'split',
    accent: PINK,
    icon: 'Sigma',
    ratio: 50,
    eyebrow: 'Works for every quadratic',
    eyebrowVn: 'Dùng được cho mọi phương trình bậc hai',
    title: 'The Quadratic Formula',
    titleVn: 'Công Thức Nghiệm',
    content: 'For $ax^2 + bx + c = 0$:\n\n$$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\nThe $\\pm$ means **do it twice**: once with $+$, once with $-$. That is where the two answers come from.\n\nThe part under the root, $b^2 - 4ac$, is called the **discriminant**.',
    contentVn: 'Với $ax^2 + bx + c = 0$:\n\n$$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\nDấu $\\pm$ nghĩa là **làm hai lần**: một lần với $+$, một lần với $-$. Hai nghiệm đến từ đó.\n\nPhần dưới dấu căn, $b^2 - 4ac$, gọi là **biệt thức**.',
    notes: [
      {
        tone: 'write',
        text: 'Say it while you write it: "negative b, plus or minus the square root of b squared minus four a c, all over two a."',
        textVn: 'Vừa viết vừa đọc: "trừ b, cộng trừ căn của b bình phương trừ bốn a c, tất cả chia cho hai a."',
      },
      {
        tone: 'homework',
        text: 'Substitute with brackets: $b = -7$ gives $-(-7) = 7$ and $(-7)^2 = 49$. Without brackets, calculators give $-49$.',
        textVn: 'Thế vào với dấu ngoặc: $b = -7$ cho $-(-7) = 7$ và $(-7)^2 = 49$. Không có ngoặc, máy tính sẽ ra $-49$.',
      },
    ],
    check: {
      id: 'chk_negb',
      q: 'In $x^2 - 6x + 2 = 0$, what is $-b$ at the start of the formula?',
      qVn: 'Trong $x^2 - 6x + 2 = 0$, $-b$ ở đầu công thức bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$-6$', textVn: '$-6$' },
        { val: 'B', text: '$6$', textVn: '$6$' },
        { val: 'C', text: '$-2$', textVn: '$-2$' },
        { val: 'D', text: '$-1$', textVn: '$-1$' },
      ],
      correct: 'B',
      expEn: '$b = -6$, and $-b$ means the opposite of $b$: $-(-6) = 6$. A writes $b$ itself. C uses $c$, and D uses $a$.',
      expVn: '$b = -6$, và $-b$ nghĩa là số đối của $b$: $-(-6) = 6$. A viết chính $b$. C dùng $c$, còn D dùng $a$.',
    },
  },

  {
    layout: 'steps',
    accent: PINK,
    icon: 'Calculator',
    eyebrow: 'Worked example · whole-number answers',
    eyebrowVn: 'Ví dụ mẫu · nghiệm là số đẹp',
    title: 'Formula: 2x² − 7x + 3 = 0',
    titleVn: 'Công Thức: 2x² − 7x + 3 = 0',
    content: 'Write every line. Most mistakes happen when three steps are squeezed into one.',
    contentVn: 'Viết đủ từng dòng. Hầu hết lỗi xảy ra khi dồn ba bước vào một.',
    steps: [
      { text: '**a, b, c.** $a = 2$, $b = -7$, $c = 3$.', textVn: '**a, b, c.** $a = 2$, $b = -7$, $c = 3$.' },
      { text: '**Discriminant.** $b^2 - 4ac = (-7)^2 - 4(2)(3) = 49 - 24 = 25$.', textVn: '**Biệt thức.** $b^2 - 4ac = (-7)^2 - 4(2)(3) = 49 - 24 = 25$.' },
      { text: '**Substitute.** $x = \\dfrac{7 \\pm \\sqrt{25}}{4} = \\dfrac{7 \\pm 5}{4}$', textVn: '**Thế vào.** $x = \\dfrac{7 \\pm \\sqrt{25}}{4} = \\dfrac{7 \\pm 5}{4}$' },
      { text: '**Split the ±.** $x = \\dfrac{12}{4} = 3$ or $x = \\dfrac{2}{4} = \\dfrac{1}{2}$.', textVn: '**Tách dấu ±.** $x = \\dfrac{12}{4} = 3$ hoặc $x = \\dfrac{2}{4} = \\dfrac{1}{2}$.' },
    ],
    check: {
      id: 'chk_disc',
      q: 'What is the discriminant of $x^2 + 3x - 4 = 0$?',
      qVn: 'Biệt thức của $x^2 + 3x - 4 = 0$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$-7$', textVn: '$-7$' },
        { val: 'B', text: '$25$', textVn: '$25$' },
        { val: 'C', text: '$13$', textVn: '$13$' },
        { val: 'D', text: '$-25$', textVn: '$-25$' },
      ],
      correct: 'B',
      expEn: '$3^2 - 4(1)(-4) = 9 + 16 = 25$. The $c$ is negative, so $-4ac$ becomes $+16$. A treats it as $-16$ ($9 - 16$). C forgets the $4$ ($9 + 4$). D gets the size right and the sign wrong.',
      expVn: '$3^2 - 4(1)(-4) = 9 + 16 = 25$. Vì $c$ âm nên $-4ac$ thành $+16$. A coi nó là $-16$ ($9 - 16$). C quên số $4$ ($9 + 4$). D đúng độ lớn nhưng sai dấu.',
    },
  },

  {
    layout: 'steps',
    accent: PINK,
    icon: 'SquareRadical',
    eyebrow: 'Worked example · a square-root answer',
    eyebrowVn: 'Ví dụ mẫu · nghiệm có căn',
    title: 'Formula: x² + 4x − 3 = 0',
    titleVn: 'Công Thức: x² + 4x − 3 = 0',
    content: 'The one that would not factor. The answers keep a $\\sqrt{}$ — simplify them fully.',
    contentVn: 'Bài không phân tích được. Nghiệm còn dấu $\\sqrt{}$ — hãy rút gọn hoàn toàn.',
    steps: [
      { text: '**a, b, c and the discriminant.** $a = 1$, $b = 4$, $c = -3$: $16 - 4(1)(-3) = 16 + 12 = 28$.', textVn: '**a, b, c và biệt thức.** $a = 1$, $b = 4$, $c = -3$: $16 - 4(1)(-3) = 16 + 12 = 28$.' },
      { text: '**Simplify the root.** $\\sqrt{28} = \\sqrt{4 \\cdot 7} = 2\\sqrt{7}$', textVn: '**Rút gọn căn.** $\\sqrt{28} = \\sqrt{4 \\cdot 7} = 2\\sqrt{7}$' },
      { text: '**Substitute.** $x = \\dfrac{-4 \\pm 2\\sqrt{7}}{2}$', textVn: '**Thế vào.** $x = \\dfrac{-4 \\pm 2\\sqrt{7}}{2}$' },
      { text: '**Divide EVERY term by 2.** $x = -2 \\pm \\sqrt{7}$, which is about $0.65$ or $-4.65$.', textVn: '**Chia MỌI hạng tử cho 2.** $x = -2 \\pm \\sqrt{7}$, khoảng $0.65$ hoặc $-4.65$.' },
    ],
    check: {
      id: 'chk_simplify',
      q: 'Simplify $x = \\dfrac{-6 \\pm 4\\sqrt{3}}{2}$.',
      qVn: 'Rút gọn $x = \\dfrac{-6 \\pm 4\\sqrt{3}}{2}$.',
      options: [
        { val: 'A', text: '$-3 \\pm 4\\sqrt{3}$', textVn: '$-3 \\pm 4\\sqrt{3}$' },
        { val: 'B', text: '$-3 \\pm 2\\sqrt{3}$', textVn: '$-3 \\pm 2\\sqrt{3}$' },
        { val: 'C', text: '$-6 \\pm 2\\sqrt{3}$', textVn: '$-6 \\pm 2\\sqrt{3}$' },
        { val: 'D', text: '$-3 \\pm \\sqrt{3}$', textVn: '$-3 \\pm \\sqrt{3}$' },
      ],
      correct: 'B',
      expEn: 'Both terms on top are divided by $2$: $-6 \\div 2 = -3$ and $4\\sqrt{3} \\div 2 = 2\\sqrt{3}$. A and C divide only one of them. D divides the $4$ by $4$.',
      expVn: 'Cả hai hạng tử ở tử đều chia cho $2$: $-6 \\div 2 = -3$ và $4\\sqrt{3} \\div 2 = 2\\sqrt{3}$. A và C chỉ chia một hạng tử. D chia $4$ cho $4$.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Zap',
    ratio: 50,
    eyebrow: 'Know the answer count before you start',
    eyebrowVn: 'Biết số nghiệm trước khi giải',
    title: 'The Discriminant',
    titleVn: 'Biệt Thức',
    inlineSvg: DIAGRAMS.DISC_THREE,
    content: 'Work out $b^2 - 4ac$ first. Its sign tells you what is coming:\n\n**Positive** → $\\pm$ gives two different answers: **two real solutions**.\n\n**Zero** → $\\pm\\sqrt{0}$ changes nothing: **one solution**.\n\n**Negative** → no real number has a negative square: **no real solutions**.',
    contentVn: 'Tính $b^2 - 4ac$ trước. Dấu của nó cho biết điều sẽ xảy ra:\n\n**Dương** → $\\pm$ cho hai đáp án khác nhau: **hai nghiệm thực**.\n\n**Bằng 0** → $\\pm\\sqrt{0}$ không thay đổi gì: **một nghiệm**.\n\n**Âm** → không số thực nào bình phương ra số âm: **vô nghiệm thực**.',
    notes: [
      {
        tone: 'info',
        text: 'Bonus: if the discriminant is a **perfect square** ($1, 4, 9, 16, 25, \\dots$), the quadratic factors.',
        textVn: 'Thêm: nếu biệt thức là **số chính phương** ($1, 4, 9, 16, 25, \\dots$), phương trình phân tích được.',
      },
    ],
    check: {
      id: 'chk_none',
      q: 'How many real solutions does $x^2 + 2x + 5 = 0$ have?',
      qVn: '$x^2 + 2x + 5 = 0$ có bao nhiêu nghiệm thực?',
      options: [
        { val: 'A', text: 'Two', textVn: 'Hai' },
        { val: 'B', text: 'One', textVn: 'Một' },
        { val: 'C', text: 'None', textVn: 'Không có' },
        { val: 'D', text: 'Infinitely many', textVn: 'Vô số' },
      ],
      correct: 'C',
      expEn: '$b^2 - 4ac = 4 - 20 = -16$, which is negative, so there are no real solutions — the parabola sits entirely above the $x$-axis. A quadratic never has infinitely many.',
      expVn: '$b^2 - 4ac = 4 - 20 = -16$, là số âm, nên vô nghiệm thực — parabol nằm hoàn toàn phía trên trục $x$. Phương trình bậc hai không bao giờ có vô số nghiệm.',
    },
  },

  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Route',
    eyebrow: 'Choosing a method',
    eyebrowVn: 'Chọn phương pháp',
    title: 'Which Way Is Fastest?',
    titleVn: 'Cách Nào Nhanh Nhất?',
    content: 'Get standard form, then ask in this order:',
    contentVn: 'Đưa về dạng chuẩn, rồi hỏi theo thứ tự này:',
    notes: [
      { tone: 'write', text: '**1. A common factor?** Take it out.', textVn: '**1. Có nhân tử chung không?** Đặt ra ngoài.' },
      { tone: 'write', text: '**2. No x term?** Get $x^2$ alone and square-root both sides — remember $\\pm$.', textVn: '**2. Không có hạng tử x?** Để $x^2$ đứng riêng rồi lấy căn hai vế — nhớ dấu $\\pm$.' },
      { tone: 'write', text: '**3. No number term?** Take out $x$.', textVn: '**3. Không có hạng tử tự do?** Đặt $x$ ra ngoài.' },
      { tone: 'write', text: '**4. Can you find the pair quickly?** Factor.', textVn: '**4. Tìm được cặp số nhanh không?** Phân tích.' },
      { tone: 'write', text: '**5. Otherwise** — or if the answers must be decimals — use the formula. It always works.', textVn: '**5. Nếu không** — hoặc khi đề yêu cầu số thập phân — dùng công thức. Nó luôn đúng.' },
    ],
    check: {
      id: 'chk_method',
      q: 'Which equation is quickest to solve WITHOUT the quadratic formula?',
      qVn: 'Phương trình nào giải nhanh nhất mà KHÔNG cần công thức nghiệm?',
      options: [
        { val: 'A', text: '$x^2 + 3x - 5 = 0$', textVn: '$x^2 + 3x - 5 = 0$' },
        { val: 'B', text: '$2x^2 + x - 7 = 0$', textVn: '$2x^2 + x - 7 = 0$' },
        { val: 'C', text: '$x^2 - 64 = 0$', textVn: '$x^2 - 64 = 0$' },
        { val: 'D', text: '$x^2 + x + 1 = 0$', textVn: '$x^2 + x + 1 = 0$' },
      ],
      correct: 'C',
      expEn: '$x^2 - 64 = (x + 8)(x - 8)$, so $x = \\pm 8$ in one line. A and B have discriminants $29$ and $57$ — not perfect squares, so they do not factor. D has discriminant $-3$: no real solutions.',
      expVn: '$x^2 - 64 = (x + 8)(x - 8)$, nên $x = \\pm 8$ chỉ trong một dòng. A và B có biệt thức $29$ và $57$ — không phải số chính phương, nên không phân tích được. D có biệt thức $-3$: vô nghiệm thực.',
    },
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The marks this unit gives away',
    eyebrowVn: 'Những lỗi mất điểm của bài này',
    title: 'Watch Out',
    titleVn: 'Cẩn Thận',
    content: 'Check these before you type an answer into Acellus.',
    contentVn: 'Kiểm tra những điều này trước khi gõ đáp án vào Acellus.',
    notes: [
      { tone: 'homework', text: '**1. Signs of the zeros.** $(x + 4)(x - 1) = 0$ gives $x = -4$ and $x = 1$ — opposite to the brackets.', textVn: '**1. Dấu của nghiệm.** $(x + 4)(x - 1) = 0$ cho $x = -4$ và $x = 1$ — ngược dấu với ngoặc.' },
      { tone: 'homework', text: '**2. Not equal to 0.** Move everything to one side before you factor or read $a$, $b$, $c$.', textVn: '**2. Chưa bằng 0.** Chuyển hết về một vế trước khi phân tích hay đọc $a$, $b$, $c$.' },
      { tone: 'homework', text: '**3. $(-b)^2$ and $-4ac$.** Square negatives in brackets; a negative $c$ makes $-4ac$ positive.', textVn: '**3. $(-b)^2$ và $-4ac$.** Bình phương số âm trong ngoặc; $c$ âm làm $-4ac$ thành dương.' },
      { tone: 'homework', text: '**4. Half-simplified.** Divide every term on top by the bottom, or none of them.', textVn: '**4. Rút gọn một nửa.** Chia mọi hạng tử ở tử cho mẫu, hoặc không chia hạng tử nào.' },
      { tone: 'homework', text: '**5. Dividing by x.** It throws away the solution $x = 0$.', textVn: '**5. Chia cho x.** Làm mất nghiệm $x = 0$.' },
    ],
  },

  {
    layout: 'stack',
    variant: 'checklist',
    accent: PURPLE,
    icon: 'ListChecks',
    columns: 2,
    eyebrow: 'You can now',
    eyebrowVn: 'Bây giờ em có thể',
    title: 'Recap',
    titleVn: 'Tổng Kết',
    items: [
      { text: 'Explain that zeros, roots, solutions and x-intercepts are the same numbers', textVn: 'Giải thích rằng zeros, roots, solutions và x-intercepts là cùng những con số' },
      { text: 'Write a quadratic in standard form and read a, b and c with their signs', textVn: 'Viết phương trình bậc hai về dạng chuẩn và đọc a, b, c cùng dấu của chúng' },
      { text: 'Factor x² + bx + c by finding two numbers that multiply to c and add to b', textVn: 'Phân tích x² + bx + c bằng cách tìm hai số có tích bằng c và tổng bằng b' },
      { text: 'Take out a common factor first, and use the ac method when a is not 1', textVn: 'Đặt nhân tử chung ra trước, và dùng phương pháp ac khi a khác 1' },
      { text: 'Use the zero product property to turn brackets into solutions', textVn: 'Dùng tính chất tích bằng 0 để biến các ngoặc thành nghiệm' },
      { text: 'Use the quadratic formula and simplify the answer fully', textVn: 'Dùng công thức nghiệm và rút gọn đáp án hoàn toàn' },
      { text: 'Use the discriminant to say how many real solutions there are', textVn: 'Dùng biệt thức để biết có bao nhiêu nghiệm thực' },
      { text: 'Check any quadratic with the Quad Solver, step by step', textVn: 'Kiểm tra bất kỳ phương trình bậc hai nào bằng Máy giải, từng bước một' },
    ],
  },
];
