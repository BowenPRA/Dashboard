// src/data/ACELLUS/ALG_INEQ/notes.js
// Acellus: Inequalities — the lesson deck.
//
// THE SPINE, and why it is in this order:
//   1–2    an inequality does not have AN answer, it has a whole stretch of the
//          number line. Slide 2 asks that before slide 3 tells it.
//   3–5    the picture (open circle vs closed) and the English (at most, no more
//          than, at least). Slide 5 is the language beat — for these students it
//          is the part of the question that actually stops them.
//   6      solving is the ordinary balance method, unchanged. Worked on the
//          exact item their Acellus screen showed them.
//   7–9    THE flip, why it happens, and variables on both sides.
//   10–11  interval notation: what each bracket means, then all three notations
//          for one set side by side.
//   12–14  compound inequalities — AND squeezes, OR spreads — and the same idea
//          written with ∩ and ∪.
//   15–16  absolute value: distance, so an equation has two answers, and an
//          inequality is either the inside (AND) or the outside (OR).
//   17–18  the four mistakes that cost the most marks, and the recap.
//
// House notes:
//  · BILINGUAL. ACELLUS declares `bilingual: true`, so every learner-facing
//    string carries its `vn*` twin and the validator enforces it.
//  · `$…$` is inline KaTeX and `$$…$$` is a display block, but `$$…$$` is legal
//    ONLY in fields rendered by renderContent — a slide's `content`, a callout
//    body, a `reveal.answer`. In steps[].text, note text, statement text/sub,
//    gallery item text and every check question it renders as a red error.
//  · Layout `title` and hero `objective` are plain text — never parsed — so no
//    markdown and no maths goes in them.
//  · `check` is always the LAST key on its slide: generate_all_audio.py narrates
//    everything before it and deliberately stops there, so a check question is
//    never read aloud before the student has answered it.
//  · Eleven `check` questions carry the NOTES score, so the XP is earned rather
//    than paid out for reaching the last slide.
//  · The worked examples are the actual items from the students' Acellus
//    screenshots. That is deliberate: this deck is not a parallel course, it is
//    the working behind the answer box they are staring at.
import { DIAGRAMS } from './diagrams.js';

const PURPLE = '#7c3aed';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const AMBER = '#d97706';
const RED = '#ef4444';

export const notes = [
  {
    layout: 'hero',
    color: '#6d28d9',
    icon: 'Variable',
    brand: 'Acellus Algebra I',
    brandVn: 'Acellus Đại số I',
    eyebrow: 'Inequalities, compound inequalities and interval notation',
    eyebrowVn: 'Bất phương trình, bất phương trình kép và ký hiệu khoảng',
    title: 'Inequalities and Intervals',
    titleVn: 'Bất Phương Trình và Khoảng',
    objective: 'I can solve an inequality one step at a time, know when the sign turns round, and write the answer as a picture, as an inequality and in interval notation.',
    objectiveVn: 'Em có thể giải bất phương trình từng bước một, biết khi nào dấu bị đảo chiều, và viết đáp án bằng hình vẽ, bằng bất phương trình và bằng ký hiệu khoảng.',
    warmUp: 'Write down three numbers that make $x + 2 > 7$ true. Then write down one that does not.',
    warmUpVn: 'Hãy viết ba số làm cho $x + 2 > 7$ đúng. Sau đó viết một số làm nó sai.',
  },

  {
    layout: 'statement',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Before we solve anything',
    eyebrowVn: 'Trước khi giải bất cứ điều gì',
    title: 'How Many Answers?',
    titleVn: 'Có Bao Nhiêu Đáp Án?',
    label: 'Think first',
    labelVn: 'Suy nghĩ trước',
    labelIcon: 'Lightbulb',
    text: '$x + 2 = 7$ has one answer. How many numbers make $x + 2 > 7$ true?',
    textVn: '$x + 2 = 7$ có một đáp án. Vậy có bao nhiêu số làm cho $x + 2 > 7$ đúng?',
    sub: 'Do not solve it yet. Just decide: one, a few, or too many to count?',
    subVn: 'Chưa cần giải. Chỉ cần quyết định: một, một vài, hay nhiều đến mức không đếm nổi?',
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      prompt: 'How many numbers work?',
      promptVn: 'Có bao nhiêu số thỏa mãn?',
      answer: 'Too many to count. $6$ works, and so does $5.1$, and $5.0001$, and $900$. That is why we never write a list — we draw the whole stretch of the number line instead.',
      answerVn: 'Nhiều đến mức không đếm nổi. $6$ thỏa mãn, $5.1$ cũng vậy, rồi $5.0001$, rồi $900$. Vì thế ta không bao giờ liệt kê — ta vẽ cả đoạn trên trục số.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Ruler',
    ratio: 50,
    eyebrow: 'What an answer looks like now',
    eyebrowVn: 'Đáp án bây giờ trông như thế nào',
    title: 'A Stretch, Not a Number',
    titleVn: 'Một Đoạn, Không Phải Một Số',
    inlineSvg: DIAGRAMS.NUM_LINE_ANATOMY,
    content: 'The answer to an inequality is a **solution set** — every number that makes the statement true.\n\nWe show it by shading that part of the number line and marking the **endpoint**: the number at the edge.',
    contentVn: 'Đáp án của một bất phương trình là **tập nghiệm** — tất cả các số làm cho mệnh đề đúng.\n\nTa biểu diễn nó bằng cách tô phần đó trên trục số và đánh dấu **điểm mút**: con số ở rìa.',
    notes: [
      {
        tone: 'write',
        text: 'The **endpoint** is where the answer starts. The **circle** says whether the endpoint itself is one of the answers.',
        textVn: '**Điểm mút** là nơi đáp án bắt đầu. **Vòng tròn** cho biết chính điểm mút đó có phải là một nghiệm hay không.',
      },
    ],
    check: {
      id: 'chk_set',
      q: 'Which of these is NOT a solution of $x > 3$?',
      qVn: 'Số nào sau đây KHÔNG phải là nghiệm của $x > 3$?',
      options: [
        { val: 'A', text: '$3.5$', textVn: '$3.5$' },
        { val: 'B', text: '$3$', textVn: '$3$' },
        { val: 'C', text: '$100$', textVn: '$100$' },
        { val: 'D', text: '$4$', textVn: '$4$' },
      ],
      correct: 'B',
      expEn: '$3$ is not greater than $3$ — it is equal to it. That is exactly what the open circle at $3$ is telling you: the endpoint is the edge of the answer, not part of it.',
      expVn: '$3$ không lớn hơn $3$ — nó bằng $3$. Đó chính là điều vòng tròn rỗng tại $3$ muốn nói: điểm mút là rìa của đáp án, không thuộc đáp án.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'CircleDot',
    ratio: 48,
    eyebrow: 'One decision the algebra does not make for you',
    eyebrowVn: 'Một quyết định mà phép toán không làm thay bạn',
    title: 'Open Circle or Filled Circle',
    titleVn: 'Vòng Tròn Rỗng Hay Vòng Tròn Đặc',
    inlineSvg: DIAGRAMS.OPEN_VS_CLOSED,
    content: 'Look at the sign and ask one question: **is the endpoint itself allowed?**\n\n$<$ and $>$ say no, so the circle stays **empty**.\n\n$\\leq$ and $\\geq$ say yes, so you **fill it in**.',
    contentVn: 'Nhìn vào dấu và tự hỏi một câu: **chính điểm mút có được phép hay không?**\n\n$<$ và $>$ nói không, nên vòng tròn để **rỗng**.\n\n$\\leq$ và $\\geq$ nói có, nên **tô đặc** nó.',
    notes: [
      {
        tone: 'info',
        text: 'The little line under the sign is the word **"or equal to"**. If the line is there, fill the circle in.',
        textVn: 'Gạch nhỏ dưới dấu chính là chữ **"hoặc bằng"**. Nếu có gạch đó, hãy tô đặc vòng tròn.',
      },
    ],
    check: {
      id: 'chk_circle',
      q: 'How is the endpoint drawn for $x \\leq -2$?',
      qVn: 'Điểm mút của $x \\leq -2$ được vẽ như thế nào?',
      options: [
        { val: 'A', text: 'An open circle at $-2$, shaded to the left', textVn: 'Vòng tròn rỗng tại $-2$, tô sang trái' },
        { val: 'B', text: 'A filled circle at $-2$, shaded to the left', textVn: 'Vòng tròn đặc tại $-2$, tô sang trái' },
        { val: 'C', text: 'A filled circle at $-2$, shaded to the right', textVn: 'Vòng tròn đặc tại $-2$, tô sang phải' },
        { val: 'D', text: 'An open circle at $2$, shaded to the left', textVn: 'Vòng tròn rỗng tại $2$, tô sang trái' },
      ],
      correct: 'B',
      expEn: 'The line under the $\\leq$ means $-2$ is allowed, so the circle is filled. "Less than" means smaller numbers, and smaller is to the LEFT on a number line.',
      expVn: 'Gạch dưới dấu $\\leq$ nghĩa là $-2$ được lấy, nên vòng tròn được tô đặc. "Nhỏ hơn" nghĩa là các số bé hơn, mà bé hơn thì nằm bên TRÁI trên trục số.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Languages',
    ratio: 46,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là một tiết tiếng Anh',
    title: 'The Words That Hide the Sign',
    titleVn: 'Những Chữ Che Giấu Dấu',
    inlineSvg: DIAGRAMS.WORDS_TO_SIGNS,
    content: 'Most of these questions are not hard maths. They are hard **English**.\n\n"You may spend **at most** $\\$50$" is $x \\leq 50$. "You must be **at least** 18" is $x \\geq 18$.\n\nThe trick: when the phrase starts with **at**, the number itself counts, so the circle is filled.',
    contentVn: 'Phần lớn các câu hỏi này không khó về toán. Chúng khó về **tiếng Anh**.\n\n"You may spend **at most** $\\$50$" là $x \\leq 50$. "You must be **at least** 18" là $x \\geq 18$.\n\nMẹo: khi cụm từ bắt đầu bằng **at**, chính con số đó cũng được tính, nên vòng tròn được tô đặc.',
    notes: [
      {
        tone: 'homework',
        text: '**"No more than"** means the same as "at most" — $\\leq$. It sounds like a "no", but it still includes the number.',
        textVn: '**"No more than"** cũng có nghĩa như "at most" — $\\leq$. Nghe như phủ định, nhưng vẫn bao gồm con số đó.',
      },
    ],
    check: {
      id: 'chk_words',
      q: 'A lift holds no more than 8 people. Which inequality is that?',
      qVn: 'Một thang máy chở không quá 8 người. Bất phương trình nào đúng?',
      options: [
        { val: 'A', text: '$p < 8$', textVn: '$p < 8$' },
        { val: 'B', text: '$p > 8$', textVn: '$p > 8$' },
        { val: 'C', text: '$p \\leq 8$', textVn: '$p \\leq 8$' },
        { val: 'D', text: '$p \\geq 8$', textVn: '$p \\geq 8$' },
      ],
      correct: 'C',
      expEn: '"No more than 8" allows 8 people — it forbids 9. So the sign includes equality: $p \\leq 8$. Choosing $p < 8$ would ban a lift-full of exactly eight, which is not what the sign on the wall says.',
      expVn: '"Không quá 8" cho phép 8 người — nó cấm 9. Vậy dấu phải bao gồm cả bằng: $p \\leq 8$. Chọn $p < 8$ sẽ cấm đúng tám người, mà biển báo không nói vậy.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Scale',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Solve It Exactly Like an Equation',
    titleVn: 'Giải Y Hệt Như Một Phương Trình',
    content: 'Solve $-6 < x - 11$.\n\nEvery move you already know still works. Whatever you do to one side, do to the other — and the statement stays true.',
    contentVn: 'Giải $-6 < x - 11$.\n\nMọi bước em đã biết vẫn dùng được. Làm gì với một vế thì làm với vế kia — và mệnh đề vẫn đúng.',
    steps: [
      {
        text: 'The $x$ is on the right. That is fine — do not turn the problem round yet.',
        textVn: '$x$ đang ở vế phải. Không sao — chưa cần đảo bài toán lại.',
      },
      {
        text: 'The $11$ is being subtracted, so add $11$ to BOTH sides: $-6 + 11 < x - 11 + 11$.',
        textVn: '$11$ đang bị trừ, nên cộng $11$ vào CẢ HAI vế: $-6 + 11 < x - 11 + 11$.',
      },
      {
        text: 'That leaves $5 < x$. Nothing was multiplied by a negative, so the sign has not moved.',
        textVn: 'Còn lại $5 < x$. Không nhân với số âm nào cả, nên dấu không thay đổi.',
      },
      {
        text: 'NOW read it the way the answer box wants it. $5 < x$ says "5 is less than x", which is the same as $x > 5$.',
        textVn: 'BÂY GIỜ hãy đọc theo cách ô đáp án yêu cầu. $5 < x$ nói "5 nhỏ hơn x", tức là $x > 5$.',
      },
    ],
    reveal: {
      label: 'Why did the sign look like it flipped?',
      labelVn: 'Vì sao trông như dấu bị đảo?',
      prompt: 'Going from $5 < x$ to $x > 5$ — is that the flip rule?',
      promptVn: 'Từ $5 < x$ sang $x > 5$ — đó có phải quy tắc đảo dấu không?',
      answer: 'No, and this is worth being clear about. Nothing was multiplied or divided by a negative. You swapped which side you read FIRST, and the little arrow has to keep pointing at the same, smaller quantity. $5 < x$ and $x > 5$ are the same sentence read from the two ends.',
      answerVn: 'Không, và điều này cần nói rõ. Không có phép nhân hay chia cho số âm nào. Em chỉ đổi vế đọc TRƯỚC, và mũi tên vẫn phải chỉ về phía đại lượng nhỏ hơn. $5 < x$ và $x > 5$ là cùng một câu, đọc từ hai đầu.',
    },
    check: {
      id: 'chk_read_back',
      q: 'You finish a problem and the line reads $-4 \\geq x$. What goes in an answer box that starts "$x$"?',
      qVn: 'Em giải xong và dòng cuối là $-4 \\geq x$. Ô đáp án bắt đầu bằng "$x$" thì điền gì?',
      options: [
        { val: 'A', text: '$x \\geq -4$', textVn: '$x \\geq -4$' },
        { val: 'B', text: '$x \\leq -4$', textVn: '$x \\leq -4$' },
        { val: 'C', text: '$x > -4$', textVn: '$x > -4$' },
        { val: 'D', text: '$x = -4$', textVn: '$x = -4$' },
      ],
      correct: 'B',
      expEn: '$-4 \\geq x$ says "$-4$ is greater than or equal to $x$", so $x$ is the smaller one: $x \\leq -4$. Keep the open end of the sign pointing at the same quantity it was pointing at before.',
      expVn: '$-4 \\geq x$ nói "$-4$ lớn hơn hoặc bằng $x$", nên $x$ là số nhỏ hơn: $x \\leq -4$. Hãy giữ miệng rộng của dấu luôn hướng về cùng một đại lượng như trước.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'FlipHorizontal2',
    eyebrow: 'The one rule that is new',
    eyebrowVn: 'Quy tắc duy nhất mới ở đây',
    title: 'Multiply or Divide by a Negative, Turn the Sign Round',
    titleVn: 'Nhân Hoặc Chia Cho Số Âm Thì Đảo Chiều Dấu',
    label: 'Learn this',
    labelVn: 'Học thuộc',
    labelIcon: 'Star',
    text: '$-2x > 6 \\;\\Longrightarrow\\; x < -3$',
    textVn: '$-2x > 6 \\;\\Longrightarrow\\; x < -3$',
    sub: 'Adding and subtracting never flip anything. Multiplying and dividing only flip when the number you use is negative.',
    subVn: 'Cộng và trừ không bao giờ đảo dấu. Nhân và chia chỉ đảo khi số em dùng là số âm.',
    notes: [
      {
        tone: 'homework',
        text: 'This is the single most common lost mark in the whole unit. Every time you divide, look at the sign of the number you are dividing by BEFORE you write the next line.',
        textVn: 'Đây là lỗi mất điểm phổ biến nhất của cả bài này. Mỗi lần chia, hãy nhìn dấu của số em đang chia TRƯỚC KHI viết dòng tiếp theo.',
      },
    ],
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'ArrowLeftRight',
    ratio: 48,
    eyebrow: 'Not a rule to memorise — a fact about the number line',
    eyebrowVn: 'Không phải quy tắc học vẹt — đó là sự thật trên trục số',
    title: 'Why It Turns Round',
    titleVn: 'Vì Sao Dấu Bị Đảo',
    inlineSvg: DIAGRAMS.FLIP_WHY,
    content: 'Start with something obviously true: $2 < 5$.\n\nNow multiply both sides by $-1$. The $2$ lands at $-2$ and the $5$ lands at $-5$ — and $-5$ is now on the LEFT.\n\nSo $-2 > -5$. The two numbers swapped places, so the sign had to swap too.',
    contentVn: 'Bắt đầu bằng điều hiển nhiên đúng: $2 < 5$.\n\nGiờ nhân cả hai vế với $-1$. Số $2$ nhảy tới $-2$ và số $5$ nhảy tới $-5$ — và $-5$ giờ nằm bên TRÁI.\n\nVậy $-2 > -5$. Hai số đã đổi chỗ, nên dấu cũng phải đổi.',
    notes: [
      {
        tone: 'theory',
        text: 'Test it whenever you are unsure. Pick any number in your answer and put it back into the original — if it does not work, you missed the flip.',
        textVn: 'Hãy thử lại mỗi khi không chắc. Chọn một số bất kỳ trong đáp án và thay vào đề gốc — nếu không thỏa mãn, em đã quên đảo dấu.',
      },
    ],
    check: {
      id: 'chk_flip',
      q: 'Solve $-3x \\geq 12$.',
      qVn: 'Giải $-3x \\geq 12$.',
      options: [
        { val: 'A', text: '$x \\geq 4$', textVn: '$x \\geq 4$' },
        { val: 'B', text: '$x \\leq -4$', textVn: '$x \\leq -4$' },
        { val: 'C', text: '$x \\geq -4$', textVn: '$x \\geq -4$' },
        { val: 'D', text: '$x \\leq 4$', textVn: '$x \\leq 4$' },
      ],
      correct: 'B',
      expEn: 'Divide both sides by $-3$. The answer is $-4$, and because $-3$ is negative the $\\geq$ becomes $\\leq$: $x \\leq -4$. Check with $x = -5$: $-3 \\times -5 = 15$, and $15 \\geq 12$. Option C keeps the sign and fails that test.',
      expVn: 'Chia cả hai vế cho $-3$. Kết quả là $-4$, và vì $-3$ là số âm nên $\\geq$ thành $\\leq$: $x \\leq -4$. Thử $x = -5$: $-3 \\times -5 = 15$, và $15 \\geq 12$. Phương án C giữ nguyên dấu nên sai.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'GitCompare',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'When x Is on Both Sides',
    titleVn: 'Khi x Ở Cả Hai Vế',
    content: 'Solve $5x \\leq -3x + 8$.\n\nCollect the $x$ terms on ONE side first. Choose the side that leaves you a positive coefficient, and you will never need the flip at all.',
    contentVn: 'Giải $5x \\leq -3x + 8$.\n\nHãy gom các số hạng $x$ về MỘT vế trước. Chọn vế nào để hệ số còn lại là số dương, thì em sẽ không phải đảo dấu.',
    steps: [
      {
        text: 'Add $3x$ to both sides — adding never flips anything: $5x + 3x \\leq -3x + 3x + 8$.',
        textVn: 'Cộng $3x$ vào cả hai vế — phép cộng không bao giờ đảo dấu: $5x + 3x \\leq -3x + 3x + 8$.',
      },
      {
        text: 'The right-hand $x$ terms cancel, leaving $8x \\leq 8$.',
        textVn: 'Các số hạng $x$ bên phải triệt tiêu, còn lại $8x \\leq 8$.',
      },
      {
        text: 'Divide both sides by $8$. Eight is POSITIVE, so the sign does not move: $x \\leq 1$.',
        textVn: 'Chia cả hai vế cho $8$. Tám là số DƯƠNG, nên dấu không đổi: $x \\leq 1$.',
      },
      {
        text: 'Check it: $x = 0$ gives $0 \\leq 8$, true. $x = 2$ gives $10 \\leq 2$, false. The boundary really is at $1$.',
        textVn: 'Kiểm tra: $x = 0$ cho $0 \\leq 8$, đúng. $x = 2$ cho $10 \\leq 2$, sai. Điểm biên đúng là $1$.',
      },
    ],
    check: {
      id: 'chk_both_sides',
      q: 'To solve $2x > 7x - 15$ without ever needing to flip the sign, what is the best first move?',
      qVn: 'Để giải $2x > 7x - 15$ mà không phải đảo dấu, bước đầu tiên tốt nhất là gì?',
      options: [
        { val: 'A', text: 'Subtract $7x$ from both sides', textVn: 'Trừ $7x$ ở cả hai vế' },
        { val: 'B', text: 'Subtract $2x$ from both sides', textVn: 'Trừ $2x$ ở cả hai vế' },
        { val: 'C', text: 'Divide both sides by $2$', textVn: 'Chia cả hai vế cho $2$' },
        { val: 'D', text: 'Add $15$ to both sides', textVn: 'Cộng $15$ vào cả hai vế' },
      ],
      correct: 'B',
      expEn: 'Taking $2x$ off both sides leaves $0 > 5x - 15$, and the $x$ term is POSITIVE, so the last division never flips anything. Option A leaves $-5x > -15$, which still gets the right answer but forces you through the flip.',
      expVn: 'Trừ $2x$ ở cả hai vế còn lại $0 > 5x - 15$, và số hạng $x$ là số DƯƠNG, nên phép chia cuối không đảo dấu. Phương án A cho $-5x > -15$, vẫn ra đúng nhưng bắt em phải đảo dấu.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Brackets',
    ratio: 48,
    eyebrow: 'The same answer, written for a maths class',
    eyebrowVn: 'Cùng một đáp án, viết theo kiểu lớp toán',
    title: 'Interval Notation',
    titleVn: 'Ký Hiệu Khoảng',
    inlineSvg: DIAGRAMS.INTERVAL_ANATOMY,
    content: 'An interval is written **smallest first, largest second**, and each end gets a bracket that matches its circle:\n\n**Round $($ $)$** = open circle, NOT included.\n\n**Square $[$ $]$** = filled circle, IS included.\n\nFor an end that never stops, write $\\infty$ — and $\\infty$ always takes a round bracket, because it is not a number you can ever reach.',
    contentVn: 'Một khoảng được viết **số nhỏ trước, số lớn sau**, và mỗi đầu có dấu ngoặc khớp với vòng tròn của nó:\n\n**Ngoặc tròn $($ $)$** = vòng tròn rỗng, KHÔNG lấy.\n\n**Ngoặc vuông $[$ $]$** = vòng tròn đặc, CÓ lấy.\n\nVới đầu không có giới hạn, viết $\\infty$ — và $\\infty$ luôn dùng ngoặc tròn, vì đó không phải con số em có thể chạm tới.',
    notes: [
      {
        tone: 'write',
        text: '$x > 3$ becomes $(3, \\infty)$. $x \\leq -2$ becomes $(-\\infty, -2]$. The $-\\infty$ end is written first because it is the smaller one.',
        textVn: '$x > 3$ thành $(3, \\infty)$. $x \\leq -2$ thành $(-\\infty, -2]$. Đầu $-\\infty$ viết trước vì nó nhỏ hơn.',
      },
    ],
    check: {
      id: 'chk_interval_basic',
      q: 'Write $-3 < x \\leq 0$ in interval notation.',
      qVn: 'Viết $-3 < x \\leq 0$ bằng ký hiệu khoảng.',
      options: [
        { val: 'A', text: '$[-3, 0)$', textVn: '$[-3, 0)$' },
        { val: 'B', text: '$(-3, 0]$', textVn: '$(-3, 0]$' },
        { val: 'C', text: '$(-3, 0)$', textVn: '$(-3, 0)$' },
        { val: 'D', text: '$[0, -3]$', textVn: '$[0, -3]$' },
      ],
      correct: 'B',
      expEn: '$-3$ has a strict $<$, so it is an open circle and a round bracket. $0$ has the line under the sign, so it is a filled circle and a square bracket: $(-3, 0]$. Option A has both brackets on the wrong ends.',
      expVn: '$-3$ đi với dấu $<$ nghiêm ngặt, nên là vòng tròn rỗng và ngoặc tròn. $0$ có gạch dưới dấu, nên là vòng tròn đặc và ngoặc vuông: $(-3, 0]$. Phương án A đặt hai ngoặc ngược đầu.',
    },
  },

  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'One set of numbers, three ways of saying it',
    eyebrowVn: 'Một tập số, ba cách nói',
    title: 'Say It, Draw It, Write It',
    titleVn: 'Nói, Vẽ, Viết',
    inlineSvg: DIAGRAMS.THREE_WAYS,
    caption: 'These are not three facts to learn. They are three notations for the SAME set of numbers, and a question can ask you for any one of them.',
    captionVn: 'Đây không phải ba điều phải học thuộc. Đó là ba cách viết cho CÙNG một tập số, và đề bài có thể hỏi bất kỳ cách nào.',
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Milestone',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Compound: Do It to All Three Parts',
    titleVn: 'Bất Phương Trình Kép: Làm Với Cả Ba Phần',
    content: 'Solve $-12 < 3x - 6 \\leq 21$.\n\nThis is two inequalities stacked into one line. The $x$ is trapped in the middle, and it stays there — whatever you do, do it to **all three parts**.',
    contentVn: 'Giải $-12 < 3x - 6 \\leq 21$.\n\nĐây là hai bất phương trình xếp chung một dòng. $x$ bị kẹp ở giữa, và nó ở nguyên đó — làm gì thì làm với **cả ba phần**.',
    steps: [
      {
        text: 'Add $6$ to all three parts: $-12 + 6 < 3x - 6 + 6 \\leq 21 + 6$.',
        textVn: 'Cộng $6$ vào cả ba phần: $-12 + 6 < 3x - 6 + 6 \\leq 21 + 6$.',
      },
      {
        text: 'That gives $-6 < 3x \\leq 27$.',
        textVn: 'Được $-6 < 3x \\leq 27$.',
      },
      {
        text: 'Divide all three parts by $3$. Three is positive, so neither sign moves: $-2 < x \\leq 9$.',
        textVn: 'Chia cả ba phần cho $3$. Ba là số dương, nên không dấu nào đổi: $-2 < x \\leq 9$.',
      },
      {
        text: 'In interval notation that is $(-2, 9]$ — round at $-2$, square at $9$, exactly matching the two signs.',
        textVn: 'Bằng ký hiệu khoảng là $(-2, 9]$ — ngoặc tròn ở $-2$, ngoặc vuông ở $9$, khớp đúng hai dấu.',
      },
    ],
    check: {
      id: 'chk_compound',
      q: 'Solving $-4 \\leq 2x < 10$, what do you get?',
      qVn: 'Giải $-4 \\leq 2x < 10$, em được gì?',
      options: [
        { val: 'A', text: '$-2 \\leq x < 5$', textVn: '$-2 \\leq x < 5$' },
        { val: 'B', text: '$-2 < x \\leq 5$', textVn: '$-2 < x \\leq 5$' },
        { val: 'C', text: '$-8 \\leq x < 20$', textVn: '$-8 \\leq x < 20$' },
        { val: 'D', text: '$-2 \\leq x < 10$', textVn: '$-2 \\leq x < 10$' },
      ],
      correct: 'A',
      expEn: 'Divide every part by $2$: $-4 \\div 2 = -2$ and $10 \\div 2 = 5$. Two is positive, so each sign keeps the shape it had — the $\\leq$ stays on the left and the $<$ stays on the right. Option C multiplied instead of dividing.',
      expVn: 'Chia mỗi phần cho $2$: $-4 \\div 2 = -2$ và $10 \\div 2 = 5$. Hai là số dương, nên mỗi dấu giữ nguyên — $\\leq$ vẫn bên trái, $<$ vẫn bên phải. Phương án C đã nhân thay vì chia.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Split',
    ratio: 48,
    eyebrow: 'Two shapes, and only two',
    eyebrowVn: 'Chỉ có hai hình dạng',
    title: 'AND Squeezes, OR Spreads',
    titleVn: 'AND Thì Kẹp Lại, OR Thì Tách Ra',
    inlineSvg: DIAGRAMS.COMPOUND_AND_OR,
    content: '**AND** means a number has to satisfy both parts, so only the overlap survives: **one** shaded piece in the middle.\n\n**OR** means either part is enough, so you keep both: **two** pieces running away from each other, joined with $\\cup$.\n\nCount the shaded pieces on the line and you know at once how many brackets your answer needs.',
    contentVn: '**AND** nghĩa là một số phải thỏa mãn cả hai phần, nên chỉ phần chung tồn tại: **một** đoạn được tô ở giữa.\n\n**OR** nghĩa là chỉ cần một phần đúng là đủ, nên giữ cả hai: **hai** đoạn chạy ra hai phía, nối bằng $\\cup$.\n\nĐếm số đoạn được tô trên trục số là biết ngay đáp án cần mấy cặp ngoặc.',
    notes: [
      {
        tone: 'info',
        text: 'A squeezed line like $-2 < x \\leq 9$ is always an AND. Written-out words "$x < -2$ **or** $x > 9$" are always two pieces.',
        textVn: 'Dòng bị kẹp như $-2 < x \\leq 9$ luôn là AND. Còn viết thành chữ "$x < -2$ **or** $x > 9$" thì luôn là hai đoạn.',
      },
    ],
    check: {
      id: 'chk_and_or',
      q: 'How many separate pieces does $x \\leq -1$ or $x > 4$ shade?',
      qVn: '$x \\leq -1$ hoặc $x > 4$ tô bao nhiêu đoạn riêng biệt?',
      options: [
        { val: 'A', text: 'One piece, between $-1$ and $4$', textVn: 'Một đoạn, giữa $-1$ và $4$' },
        { val: 'B', text: 'Two pieces, one at each end', textVn: 'Hai đoạn, mỗi đầu một đoạn' },
        { val: 'C', text: 'The whole line', textVn: 'Toàn bộ trục số' },
        { val: 'D', text: 'Nothing at all', textVn: 'Không có gì cả' },
      ],
      correct: 'B',
      expEn: 'It is an OR, so a number only has to pass one test. Everything from $-1$ leftwards works, and everything past $4$ works, but the numbers in between fail both — so the middle stays blank: $(-\\infty, -1] \\cup (4, \\infty)$.',
      expVn: 'Đây là OR, nên một số chỉ cần thỏa một điều kiện. Mọi số từ $-1$ trở về trái đều được, mọi số lớn hơn $4$ đều được, nhưng các số ở giữa trượt cả hai — nên khoảng giữa để trống: $(-\\infty, -1] \\cup (4, \\infty)$.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Boxes',
    ratio: 48,
    eyebrow: 'The same two words, written as symbols',
    eyebrowVn: 'Cũng hai từ đó, viết bằng ký hiệu',
    title: 'Intersection and Union',
    titleVn: 'Giao và Hợp',
    inlineSvg: DIAGRAMS.SETS_AND_OR,
    content: '$A \\cap B$ is the **intersection**: only what is in **both** lists. It is the AND.\n\n$A \\cup B$ is the **union**: everything in **either** list, each member written once. It is the OR.\n\nIf two sets share nothing at all, their intersection is the **empty set**, written $\\emptyset$.',
    contentVn: '$A \\cap B$ là **giao**: chỉ những gì có trong **cả hai** tập. Đó là AND.\n\n$A \\cup B$ là **hợp**: mọi phần tử có trong **một trong hai** tập, mỗi phần tử viết một lần. Đó là OR.\n\nNếu hai tập không có chung phần tử nào, giao của chúng là **tập rỗng**, viết là $\\emptyset$.',
    notes: [
      {
        tone: 'plant',
        text: 'The cup $\\cup$ opens upward and holds everything — **union**. The cap $\\cap$ is a lid and only keeps what is under both — **intersection**.',
        textVn: 'Dấu $\\cup$ giống cái cốc mở lên, chứa tất cả — **hợp**. Dấu $\\cap$ giống cái nắp, chỉ giữ phần nằm dưới cả hai — **giao**.',
      },
    ],
    check: {
      id: 'chk_sets',
      q: 'If $A = \\{2, 3, 4\\}$ and $B = \\{1, 5, 7\\}$, what is $A \\cap B$?',
      qVn: 'Nếu $A = \\{2, 3, 4\\}$ và $B = \\{1, 5, 7\\}$, thì $A \\cap B$ bằng gì?',
      options: [
        { val: 'A', text: '$\\emptyset$', textVn: '$\\emptyset$' },
        { val: 'B', text: '$\\{1, 2, 3, 4, 5, 7\\}$', textVn: '$\\{1, 2, 3, 4, 5, 7\\}$' },
        { val: 'C', text: '$\\{2, 3, 4\\}$', textVn: '$\\{2, 3, 4\\}$' },
        { val: 'D', text: '$\\{1, 5, 7\\}$', textVn: '$\\{1, 5, 7\\}$' },
      ],
      correct: 'A',
      expEn: 'The intersection asks which numbers appear in BOTH lists. Go through them: $2$ is not in $B$, $3$ is not in $B$, $4$ is not in $B$. Nothing is shared, so the answer is the empty set. Option B is the union $A \\cup B$, not the intersection.',
      expVn: 'Giao hỏi những số nào có mặt trong CẢ HAI tập. Xét từng số: $2$ không có trong $B$, $3$ không có trong $B$, $4$ không có trong $B$. Không có gì chung, nên đáp án là tập rỗng. Phương án B là hợp $A \\cup B$, không phải giao.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Ruler',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Absolute Value Means Distance',
    titleVn: 'Giá Trị Tuyệt Đối Là Khoảng Cách',
    inlineSvg: DIAGRAMS.ABS_DISTANCE,
    content: 'Solve $6|4x + 4| = 24$.\n\n$|A|$ is how far $A$ is from zero, and distance has no direction. That is why these have **two** answers: one going each way.',
    contentVn: 'Giải $6|4x + 4| = 24$.\n\n$|A|$ là khoảng cách từ $A$ tới 0, mà khoảng cách thì không có hướng. Vì vậy các bài này có **hai** đáp án: mỗi hướng một cái.',
    steps: [
      {
        text: 'Get the bars ALONE first. Divide both sides by $6$: $|4x + 4| = 4$.',
        textVn: 'Trước hết phải để dấu giá trị tuyệt đối ĐỨNG MỘT MÌNH. Chia cả hai vế cho $6$: $|4x + 4| = 4$.',
      },
      {
        text: 'Now split into two ordinary equations: $4x + 4 = 4$ or $4x + 4 = -4$.',
        textVn: 'Bây giờ tách thành hai phương trình thường: $4x + 4 = 4$ hoặc $4x + 4 = -4$.',
      },
      {
        text: 'First one: $4x = 0$, so $x = 0$.',
        textVn: 'Phương trình thứ nhất: $4x = 0$, nên $x = 0$.',
      },
      {
        text: 'Second one: $4x = -8$, so $x = -2$. The box asks for the smallest first, so type $-2$, then $0$.',
        textVn: 'Phương trình thứ hai: $4x = -8$, nên $x = -2$. Ô đáp án hỏi số nhỏ trước, nên gõ $-2$, rồi $0$.',
      },
    ],
    reveal: {
      label: 'What if you split it too early?',
      labelVn: 'Nếu tách quá sớm thì sao?',
      prompt: 'Suppose you had written $6(4x + 4) = 24$ or $6(4x + 4) = -24$ straight away. What goes wrong?',
      promptVn: 'Giả sử em viết ngay $6(4x + 4) = 24$ hoặc $6(4x + 4) = -24$. Sai ở đâu?',
      answer: 'Here it happens to survive, because $6$ is positive. But the habit is what fails you: with $-6|4x+4| = 24$, or with something added outside the bars like $2|x| + 3 = 11$, splitting first gives the wrong answers. **Isolate the bars, every single time.**',
      answerVn: 'Ở bài này thì may mà vẫn đúng, vì $6$ là số dương. Nhưng thói quen đó mới là cái hại: với $-6|4x+4| = 24$, hoặc khi có số cộng ngoài dấu như $2|x| + 3 = 11$, tách trước sẽ cho đáp án sai. **Luôn luôn tách riêng dấu giá trị tuyệt đối trước.**',
    },
    check: {
      id: 'chk_abs_eq',
      q: 'What is the FIRST move on $3|x - 1| = 15$?',
      qVn: 'Bước ĐẦU TIÊN với $3|x - 1| = 15$ là gì?',
      options: [
        { val: 'A', text: 'Split it into $3(x-1) = 15$ and $3(x-1) = -15$', textVn: 'Tách thành $3(x-1) = 15$ và $3(x-1) = -15$' },
        { val: 'B', text: 'Divide both sides by $3$ to get $|x - 1| = 5$', textVn: 'Chia cả hai vế cho $3$ để được $|x - 1| = 5$' },
        { val: 'C', text: 'Add $1$ to both sides', textVn: 'Cộng $1$ vào cả hai vế' },
        { val: 'D', text: 'Remove the bars and solve $x - 1 = 15$', textVn: 'Bỏ dấu và giải $x - 1 = 15$' },
      ],
      correct: 'B',
      expEn: 'Nothing may be attached to the bars when you split. Divide by the $3$ first, reach $|x - 1| = 5$, and only then write the two cases $x - 1 = 5$ and $x - 1 = -5$, giving $x = 6$ and $x = -4$. Option D throws away half the answers.',
      expVn: 'Khi tách thì không được còn gì bám vào dấu giá trị tuyệt đối. Chia cho $3$ trước, được $|x - 1| = 5$, rồi mới viết hai trường hợp $x - 1 = 5$ và $x - 1 = -5$, cho $x = 6$ và $x = -4$. Phương án D vứt mất một nửa đáp án.',
    },
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'Split',
    ratio: 48,
    eyebrow: 'The shape is decided before you do any algebra',
    eyebrowVn: 'Hình dạng được quyết định trước khi làm phép toán',
    title: 'Absolute Value Inequalities',
    titleVn: 'Bất Phương Trình Giá Trị Tuyệt Đối',
    inlineSvg: DIAGRAMS.ABS_LESS_GREATER,
    content: 'Look at the sign before anything else:\n\n**$|A| < k$** — close to zero. One piece in the middle: $-k < A < k$.\n\n**$|A| > k$** — far from zero. Two pieces: $A > k$ **or** $A < -k$.\n\nFor $|2x - 5| > 9$: $2x - 5 > 9$ gives $x > 7$, and $2x - 5 < -9$ gives $x < -2$. Answer: $x > 7$ or $x < -2$.',
    contentVn: 'Hãy nhìn dấu trước tiên:\n\n**$|A| < k$** — gần 0. Một đoạn ở giữa: $-k < A < k$.\n\n**$|A| > k$** — xa 0. Hai đoạn: $A > k$ **hoặc** $A < -k$.\n\nVới $|2x - 5| > 9$: $2x - 5 > 9$ cho $x > 7$, và $2x - 5 < -9$ cho $x < -2$. Đáp án: $x > 7$ hoặc $x < -2$.',
    notes: [
      {
        tone: 'write',
        text: 'Two words to remember it by: **great-OR** and **less-th-AND**. Greater than gives OR; less than gives AND.',
        textVn: 'Hai từ để nhớ: **great-OR** và **less-th-AND**. Lớn hơn thì ra OR; nhỏ hơn thì ra AND.',
      },
    ],
    check: {
      id: 'chk_abs_ineq',
      q: 'Which shape does $|x + 1| \\leq 6$ have?',
      qVn: '$|x + 1| \\leq 6$ có hình dạng nào?',
      options: [
        { val: 'A', text: 'Two pieces, joined with $\\cup$', textVn: 'Hai đoạn, nối bằng $\\cup$' },
        { val: 'B', text: 'One piece in the middle', textVn: 'Một đoạn ở giữa' },
        { val: 'C', text: 'The whole number line', textVn: 'Toàn bộ trục số' },
        { val: 'D', text: 'No solutions', textVn: 'Vô nghiệm' },
      ],
      correct: 'B',
      expEn: 'It is a "less than", so it asks which values sit CLOSE to zero — that is one unbroken piece. Solving $-6 \\leq x + 1 \\leq 6$ gives $-7 \\leq x \\leq 5$, or $[-7, 5]$.',
      expVn: 'Đây là "nhỏ hơn", nên nó hỏi những giá trị nằm GẦN 0 — đó là một đoạn liền. Giải $-6 \\leq x + 1 \\leq 6$ được $-7 \\leq x \\leq 5$, tức là $[-7, 5]$.',
    },
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The four marks this unit gives away',
    eyebrowVn: 'Bốn lỗi mất điểm của bài này',
    title: 'Watch Out',
    titleVn: 'Cẩn Thận',
    content: 'Before you type an answer into the green box, check all four of these.',
    contentVn: 'Trước khi gõ đáp án vào ô xanh, hãy kiểm tra đủ bốn điều sau.',
    notes: [
      {
        tone: 'homework',
        text: '**1. The flip.** You divided by a negative and left the sign alone.',
        textVn: '**1. Quên đảo dấu.** Em chia cho số âm mà vẫn giữ nguyên dấu.',
      },
      {
        tone: 'homework',
        text: '**2. The wrong circle.** $<$ is empty, $\\leq$ is filled — check the little line under the sign.',
        textVn: '**2. Sai vòng tròn.** $<$ thì rỗng, $\\leq$ thì đặc — hãy nhìn gạch nhỏ dưới dấu.',
      },
      {
        tone: 'homework',
        text: '**3. A square bracket on infinity.** $[3, \\infty]$ is always wrong. It is $[3, \\infty)$.',
        textVn: '**3. Ngoặc vuông với vô cực.** $[3, \\infty]$ luôn luôn sai. Phải là $[3, \\infty)$.',
      },
      {
        tone: 'homework',
        text: '**4. Splitting before isolating.** Get the absolute value bars alone first, then write the two cases.',
        textVn: '**4. Tách trước khi cô lập.** Phải để dấu giá trị tuyệt đối đứng riêng trước, rồi mới viết hai trường hợp.',
      },
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
      { text: 'Solve an inequality with the same moves as an equation', textVn: 'Giải bất phương trình bằng đúng các bước như phương trình' },
      { text: 'Turn the sign round when I multiply or divide by a negative', textVn: 'Đảo chiều dấu khi nhân hoặc chia cho số âm' },
      { text: 'Choose an open or a filled circle from the sign', textVn: 'Chọn vòng tròn rỗng hay đặc dựa vào dấu' },
      { text: 'Read at most, at least and no more than into the right sign', textVn: 'Đọc "at most", "at least", "no more than" ra đúng dấu' },
      { text: 'Write a solution set in interval notation, brackets and all', textVn: 'Viết tập nghiệm bằng ký hiệu khoảng, đúng từng dấu ngoặc' },
      { text: 'Tell an AND (one piece) from an OR (two pieces)', textVn: 'Phân biệt AND (một đoạn) với OR (hai đoạn)' },
      { text: 'Use the intersection and union symbols correctly', textVn: 'Dùng đúng ký hiệu giao và hợp' },
      { text: 'Isolate the bars, then split an absolute value into two cases', textVn: 'Cô lập dấu giá trị tuyệt đối, rồi tách thành hai trường hợp' },
    ],
  },
];
