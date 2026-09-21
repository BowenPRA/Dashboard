// src/data/Y7_MATH/U02_3/notes.js
// 2.3 Collecting Like Terms — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons, content/y7-math/U02_3). 27 layout slides, 20 scored
// items: 10 checks and 10 activities (predict · terms · algebra · sort ·
// estimate). The first interactive Year 7 algebra deck, written to the density
// of the Extended/Additional Maths decks (docs/y7-math/algebra-engines.md §4):
// no three slides in a row unscored, no two activities of one type in a row.
//
// THE SPINE, kept from the classroom:
//   1–5    hero; the starter (3a + 4a and 7a); the bag said in English first;
//          apples with apples; the Science 2.5 atoms sorted by kind
//   6–10   key words: term, like / collect / simplify, like terms, the Halong
//          Bay fruit stall (collect and simplify); Find, Move, Collect widget
//   11–16  the invisible 1 (8 or 7s?), only like terms, tick or cross, tricky
//          like terms, Like or Not?
//   17–19  the sign that travels (4x + 6y or 10x + 6y?), the widget, keep the sign
//   20–22  bricks: a letter is a length; how long is each row; pyramids
//   23–26  Mr Bowen's homework, the perimeter, the animals, the keys
//   27     the checklist, with the exit question as the last check
//
// What the room did that a student alone cannot: both hand votes are `predict`
// activities on the vote slide; Tick or Cross and Keep the Sign type ONE answer
// (`algebra`) with the rest in a reveal; the Like or Not? card game is a `sort`
// of pairs; Mr Bowen's homework (now six lines, two of them right) is sorted
// into right and wrong. Cut: the date, the starter check slide (folded into the
// starter), the pens word problem, the homework slide and the Lesson Complete
// exit hero.
//
// House notes:
//  · `check` or `activity` is always the LAST key on its slide; never both.
//  · `$…$` inline maths in checks, notes and activity strings.
//  · Activity strings use name/explain, so the narration does not read them.
//  · Every number in a check or activity is original: the workbook exercise is
//    the homework and is not worked here.
import { DIAGRAMS } from './diagrams.js';
import { CollectAdd, CollectSigns, Pyramid } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U02_3/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 2 · 2.3',
    eyebrowVn: 'Chương 2 · 2.3',
    title: 'Collecting Like Terms',
    titleVn: 'Thu gọn các hạng tử đồng dạng',
    objective: 'Say what a term and like terms are, simplify an expression by collecting like terms, and keep every sign with its term.',
    objectiveVn: 'Nói được hạng tử và hạng tử đồng dạng là gì, rút gọn biểu thức bằng cách thu gọn các hạng tử đồng dạng, và giữ mỗi dấu đi cùng hạng tử của nó.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'Nobody says "3 apples and 2 bananas make 5 apple-bananas". Algebra does not either. You will **sort**, **type** and **predict** your way through **20 scored steps** — the first one is on the next slide.',
      textVn: 'Không ai nói "3 quả táo và 2 quả chuối là 5 quả táo-chuối". Đại số cũng vậy. Em sẽ **sắp xếp**, **gõ đáp án** và **dự đoán** qua **20 bước được tính điểm** — bước đầu tiên ở slide tiếp theo.',
    },
  },

  // 2 ─ Starter: same answer? (predict) ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter — decide before you go on',
    eyebrowVn: 'Khởi động — quyết định trước khi đi tiếp',
    title: 'Same Answer?',
    titleVn: 'Cùng đáp án?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'When $a = 5$, work out $3a + 4a$. Then work out $7a$.',
    textVn: 'Khi $a = 5$, hãy tính $3a + 4a$. Rồi tính $7a$.',
    sub: 'Put the × back first: $3a$ means $3 × a$.',
    subVn: 'Viết lại dấu × trước: $3a$ nghĩa là $3 × a$.',
    activity: {
      id: 'act_starter',
      type: 'predict',
      prompt: 'When $a = 5$, what are $3a + 4a$ and $7a$?',
      promptVn: 'Khi $a = 5$, $3a + 4a$ và $7a$ bằng bao nhiêu?',
      options: [
        { val: 'digits', name: '$80$ and $75$', nameVn: '$80$ và $75$' },
        { val: 'same', name: '$35$ and $35$', nameVn: '$35$ và $35$' },
        { val: 'added', name: '$12$ and $35$', nameVn: '$12$ và $35$' },
      ],
      correct: 'same',
      explain: 'Both are $35$: $15 + 20 = 35$ and $7 × 5 = 35$. Try $a = 10$: $30 + 40 = 70$ and $7 × 10 = 70$. Always the same — this lesson shows why. $80$ and $75$ push the digits together ($35 + 45$); $12$ adds $3 + 4 + 5$.',
      explainVn: 'Cả hai đều bằng $35$: $15 + 20 = 35$ và $7 × 5 = 35$. Thử $a = 10$: $30 + 40 = 70$ và $7 × 10 = 70$. Luôn bằng nhau — bài này cho em biết vì sao. $80$ và $75$ là ghép các chữ số lại ($35 + 45$); $12$ là cộng $3 + 4 + 5$.',
    },
  },

  // 3 ─ What is in the bag? (check 1) ───────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it in English first',
    eyebrowVn: 'Nói bằng tiếng Anh trước',
    title: 'What Is in the Bag?',
    titleVn: 'Trong túi có gì?',
    text: 'Mr Bowen buys **3 apples** and **2 bananas**. Then he buys **4 apples** and **1 banana**.',
    textVn: 'Thầy Bowen mua **3 quả táo** và **2 quả chuối**. Sau đó thầy mua **4 quả táo** và **1 quả chuối**.',
    sub: 'Say what is in his bag out loud, in a full English sentence. Then choose.',
    subVn: 'Nói to trong túi của thầy có gì, thành một câu tiếng Anh đầy đủ. Rồi chọn đáp án.',
    check: {
      id: 'c1',
      q: 'What is in Mr Bowen’s bag?',
      qVn: 'Trong túi của thầy Bowen có gì?',
      options: [
        { val: 'A', text: '10 apple-bananas', textVn: '10 quả táo-chuối' },
        { val: 'B', text: '7 apples and 2 bananas', textVn: '7 quả táo và 2 quả chuối' },
        { val: 'C', text: '7 apples and 3 bananas', textVn: '7 quả táo và 3 quả chuối' },
      ],
      correct: 'C',
      expEn: 'Apples are counted with apples and bananas with bananas: $3 + 4 = 7$ apples and $2 + 1 = 3$ bananas. "10 apple-bananas" adds two different kinds, which nobody says. "2 bananas" forgot the last banana — one banana still counts.',
      expVn: 'Táo đếm với táo, chuối đếm với chuối: $3 + 4 = 7$ quả táo và $2 + 1 = 3$ quả chuối. "10 quả táo-chuối" là cộng hai loại khác nhau, không ai nói vậy. "2 quả chuối" là quên quả chuối cuối cùng — một quả chuối vẫn được tính.',
    },
  },

  // 4 ─ Apples with apples ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'English does this already',
    eyebrowVn: 'Tiếng Anh vốn đã làm vậy',
    title: 'Apples With Apples',
    titleVn: 'Táo đi với táo',
    inlineSvg: DIAGRAMS.FRUIT_BAG,
    caption: 'Nobody says "10 apple-bananas". Algebra does not either.',
    captionVn: 'Không ai nói "10 quả táo-chuối". Đại số cũng vậy. (a: số táo, b: số chuối)',
  },

  // 5 ─ The Science 2.5 bridge ──────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Science 2.5 did this with atoms',
    eyebrowVn: 'Khoa học 2.5 đã làm vậy với nguyên tử',
    title: 'Sorted by Kind',
    titleVn: 'Xếp theo từng loại',
    inlineSvg: DIAGRAMS.ATOMS_SORT,
    caption: 'Carbon and oxygen are different elements. Count each kind on its own.',
    captionVn: 'Cacbon và oxi là hai nguyên tố khác nhau. Đếm riêng từng loại. (carbon = cacbon, oxygen = oxi, hydrogen = hiđro)',
  },

  // 6 ─ Key word: term (check 2) ────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Term',
    titleVn: 'Hạng tử',
    ratio: 40,
    inlineSvg: DIAGRAMS.TERMS,
    content: 'An expression is made of **terms**.',
    contentVn: 'Một biểu thức được tạo nên từ các **hạng tử (terms)**.',
    notes: [
      {
        tone: 'write',
        text: '**Term:** one part of an expression.\nThe + and − signs separate the terms.',
        textVn: '**Hạng tử (term):** một phần của biểu thức.\nCác dấu + và − ngăn cách các hạng tử.',
      },
    ],
    check: {
      id: 'c2',
      q: 'How many terms are in $7m − 4 + 2n + m$?',
      qVn: 'Biểu thức $7m − 4 + 2n + m$ có bao nhiêu hạng tử?',
      options: [
        { val: 'A', text: '$3$', textVn: '$3$' },
        { val: 'B', text: '$4$', textVn: '$4$' },
        { val: 'C', text: '$2$', textVn: '$2$' },
      ],
      correct: 'B',
      expEn: 'The + and − signs cut it into four terms: $7m$, $−4$, $2n$ and $m$. $3$ forgets that a number on its own is a term too; $2$ counts the letters $m$ and $n$, not the terms.',
      expVn: 'Các dấu + và − cắt nó thành bốn hạng tử: $7m$, $−4$, $2n$ và $m$. $3$ là quên rằng một số đứng riêng cũng là một hạng tử; $2$ là đếm các chữ cái $m$ và $n$, không phải đếm hạng tử.',
    },
  },

  // 7 ─ Words with two meanings (check 3) ───────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    title: 'Words With Two Meanings',
    titleVn: 'Từ có hai nghĩa',
    inlineSvg: DIAGRAMS.WORDS,
    caption: 'In maths, **like** means **the same kind**.',
    captionVn: 'Trong toán, **like** nghĩa là **cùng loại**, không phải "thích". **collect** = gộp lại, **simplify** = rút gọn.',
    check: {
      id: 'c3',
      q: 'In maths, what are **like terms**?',
      qVn: 'Trong toán, **like terms** là gì?',
      options: [
        { val: 'A', text: 'Terms that you like', textVn: 'Các hạng tử mà em thích' },
        { val: 'B', text: 'Terms of the same kind: the same letters', textVn: 'Các hạng tử cùng loại: cùng chữ cái' },
        { val: 'C', text: 'Terms with the same number in front', textVn: 'Các hạng tử có cùng con số đứng trước' },
      ],
      correct: 'B',
      expEn: '**Like** here means **the same kind**, not "thích". $2a$ and $5a$ are like terms because both are $a$ terms. The number in front does not have to match: $3y$ and $3$ share a number but are different kinds.',
      expVn: '**Like** ở đây nghĩa là **cùng loại**, không phải "thích". $2a$ và $5a$ là hạng tử đồng dạng vì cả hai đều là hạng tử $a$. Con số đứng trước không cần giống nhau: $3y$ và $3$ có cùng con số nhưng khác loại.',
    },
  },

  // 8 ─ Key word: like terms (check 4) ──────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Like Terms',
    titleVn: 'Hạng tử đồng dạng',
    ratio: 40,
    inlineSvg: DIAGRAMS.LIKE_UNLIKE,
    content: 'Look at the **letter**, not the number.',
    contentVn: 'Nhìn vào **chữ cái**, không nhìn con số.',
    notes: [
      {
        tone: 'write',
        text: '**Like terms:** terms that contain the same letter.\n$2a$ and $3a$ are like terms. $2a$ and $3b$ are not.',
        textVn: '**Hạng tử đồng dạng (like terms):** các hạng tử có cùng chữ cái.\n$2a$ và $3a$ là hạng tử đồng dạng. $2a$ và $3b$ thì không.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Which pair are **like terms**?',
      qVn: 'Cặp nào là **hạng tử đồng dạng**?',
      options: [
        { val: 'A', text: '$3p$ and $p$', textVn: '$3p$ và $p$' },
        { val: 'B', text: '$5m$ and $5n$', textVn: '$5m$ và $5n$' },
        { val: 'C', text: '$4y$ and $4$', textVn: '$4y$ và $4$' },
      ],
      correct: 'A',
      expEn: '$3p$ and $p$ both have the letter $p$ — a lone $p$ is $1p$. $5m$ and $5n$ share a number, but the letters are different. $4$ has no letter at all, so it is not a $y$ term.',
      expVn: '$3p$ và $p$ đều có chữ cái $p$ — một chữ $p$ đứng riêng là $1p$. $5m$ và $5n$ có cùng con số, nhưng chữ cái khác nhau. $4$ không có chữ cái nào, nên nó không phải hạng tử $y$.',
    },
  },

  // 9 ─ Collect and simplify: the fruit stall (terms) ───────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    title: 'Collect and Simplify',
    titleVn: 'Gộp và rút gọn',
    ratio: 45,
    image: img('stall.jpg'),
    content: 'Halong Bay: every basket holds **one kind** of fruit.',
    contentVn: 'Vịnh Hạ Long: mỗi rổ chỉ đựng **một loại** trái cây.',
    notes: [
      {
        tone: 'write',
        text: '**Simplify:** write an expression in a shorter way.\n**Collecting like terms:** adding like terms together to simplify.\n$a + a = 2a$ and $2b + 3b = 5b$',
        textVn: '**Rút gọn (simplify):** viết biểu thức ngắn gọn hơn.\n**Thu gọn hạng tử đồng dạng (collecting like terms):** cộng các hạng tử đồng dạng lại để rút gọn.\n$a + a = 2a$ và $2b + 3b = 5b$',
      },
    ],
    activity: {
      id: 'act_terms_stall',
      type: 'terms',
      expr: '4m + 3n + 2m + 5n',
      prompt: 'Like the fruit stall: put each term in its basket, one basket for each kind.',
      promptVn: 'Giống như sạp trái cây: đặt mỗi hạng tử vào rổ của nó, mỗi loại một rổ.',
      explain: 'The $m$ basket holds $4m$ and $2m$, which make $6m$. The $n$ basket holds $3n$ and $5n$, which make $8n$. So $4m + 3n + 2m + 5n = 6m + 8n$.',
      explainVn: 'Rổ $m$ chứa $4m$ và $2m$, cộng lại được $6m$. Rổ $n$ chứa $3n$ và $5n$, cộng lại được $8n$. Vậy $4m + 3n + 2m + 5n = 6m + 8n$.',
    },
  },

  // 10 ─ Find, Move, Collect (widget) ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each step before you press',
    eyebrowVn: 'Nói từng bước trước khi bấm',
    title: 'Find, Move, Collect',
    titleVn: 'Tìm, chuyển, gộp',
    widget: CollectAdd,
    caption: 'Before each press, say out loud what happens next: **find**, **move** or **collect**.',
    captionVn: 'Trước mỗi lần bấm, hãy nói to điều sẽ xảy ra: **tìm**, **chuyển** hay **gộp**.',
  },

  // 11 ─ The invisible 1: 8 or 7s? (predict) ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    title: 'Which Is Right?',
    titleVn: 'Đáp án nào đúng?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Simplify $8s − s$',
    textVn: 'Rút gọn $8s − s$',
    sub: 'One student says **8**. Another says **7s**.',
    subVn: 'Một bạn nói **8**. Một bạn khác nói **7s**.',
    activity: {
      id: 'act_predict_one',
      type: 'predict',
      prompt: 'Which is right?',
      promptVn: 'Đáp án nào đúng?',
      options: [
        { val: 'eight', name: '$8$ — the two letters cancel', nameVn: '$8$ — hai chữ cái triệt tiêu nhau' },
        { val: 'sevens', name: '$7s$ — one $s$ is taken away', nameVn: '$7s$ — bớt đi một $s$' },
        { val: 'seven', name: '$7$ — eight take away one', nameVn: '$7$ — tám bớt một' },
      ],
      correct: 'sevens',
      explain: '$s$ means $1s$. Eight strawberries take away one strawberry is **seven strawberries**: $8s − s = 7s$. The letter never disappears, so $8$ and $7$ are both wrong.',
      explainVn: '$s$ nghĩa là $1s$. Tám quả dâu bớt đi một quả dâu là **bảy quả dâu**: $8s − s = 7s$. Chữ cái không bao giờ biến mất, nên $8$ và $7$ đều sai.',
    },
  },

  // 12 ─ x means 1x (check 5) ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The invisible 1',
    eyebrowVn: 'Số 1 vô hình',
    title: 'x Means 1x',
    titleVn: 'x nghĩa là 1x',
    ratio: 40,
    inlineSvg: DIAGRAMS.ONE_X,
    content: '**$7s$ is right.** The letter never disappears.',
    contentVn: '**$7s$ mới đúng.** Chữ cái không bao giờ biến mất.',
    notes: [
      {
        tone: 'write',
        text: '$x$ means $1x$.\n$4x + x = 5x$ and $8s − s = 7s$',
        textVn: '$x$ nghĩa là $1x$.\n$4x + x = 5x$ và $8s − s = 7s$',
      },
    ],
    check: {
      id: 'c5',
      q: 'Simplify $6k + k$.',
      qVn: 'Rút gọn $6k + k$.',
      options: [
        { val: 'A', text: '$6k$', textVn: '$6k$' },
        { val: 'B', text: '$7$', textVn: '$7$' },
        { val: 'C', text: '$6k^2$', textVn: '$6k^2$' },
        { val: 'D', text: '$7k$', textVn: '$7k$' },
      ],
      correct: 'D',
      expEn: '$k$ means $1k$, so $6k + 1k = 7k$. $6k$ treats the lone $k$ as nothing; $7$ loses the letter; $6k^2$ multiplies instead of adding.',
      expVn: '$k$ nghĩa là $1k$, nên $6k + 1k = 7k$. $6k$ là coi chữ $k$ đứng riêng như không có gì; $7$ là làm mất chữ cái; $6k^2$ là nhân thay vì cộng.',
    },
  },

  // 13 ─ Only like terms ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    title: 'Only Like Terms',
    titleVn: 'Chỉ gộp hạng tử đồng dạng',
    ratio: 40,
    inlineSvg: DIAGRAMS.CANT_COLLECT,
    content: 'Can you add 5 cm and 3 kg? No — and you cannot add $3a$ and $2b$ either.',
    contentVn: 'Em có cộng được 5 cm với 3 kg không? Không — và em cũng không cộng được $3a$ với $2b$.',
    notes: [
      {
        tone: 'write',
        text: 'You can only collect **like terms**.\n$3a + 2b$ cannot be simplified.',
        textVn: 'Em chỉ có thể gộp các **hạng tử đồng dạng**.\n$3a + 2b$ không thể rút gọn.',
      },
    ],
  },

  // 14 ─ Tick or cross? (algebra) ───────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Can it be simplified?',
    eyebrowVn: 'Có rút gọn được không?',
    title: 'Tick or Cross?',
    titleVn: 'Đánh dấu ✓ hay ✗?',
    ratio: 50,
    content:
      'Decide for each one: ✓ and simplify it, or ✗ and leave it alone.\n\n' +
      '**a** $4k + k$\n' +
      '**b** $3k + 3$\n' +
      '**c** $7w − 2v$\n' +
      '**d** $9d − d$',
    contentVn:
      'Quyết định cho từng câu: ✓ rồi rút gọn, hoặc ✗ và để nguyên.\n\n' +
      '**a** $4k + k$\n' +
      '**b** $3k + 3$\n' +
      '**c** $7w − 2v$\n' +
      '**d** $9d − d$',
    reveal: {
      label: 'Check a to d',
      labelVn: 'Kiểm tra câu a đến d',
      answer: '**a** ✓ $5k$  **b** ✗  **c** ✗  **d** ✓ $8d$\n\n**b** has a $k$ term and a number; **c** has two different letters.',
      answerVn: '**a** ✓ $5k$  **b** ✗  **c** ✗  **d** ✓ $8d$\n\n**b** có một hạng tử $k$ và một số; **c** có hai chữ cái khác nhau.',
    },
    activity: {
      id: 'act_simp_tick',
      type: 'algebra',
      mode: 'simplify',
      expr: '2m + 5m + 1',
      prompt: '**e** Type the simplest form of $2m + 5m + 1$.',
      promptVn: '**e** Gõ dạng gọn nhất của $2m + 5m + 1$.',
      explain: '$2m$ and $5m$ are like terms: $7m$. The $1$ is a number, not an $m$ term, so it stays: $7m + 1$. Writing $8m$ adds a number to the $m$ terms.',
      explainVn: '$2m$ và $5m$ là hạng tử đồng dạng: $7m$. Số $1$ là một số, không phải hạng tử $m$, nên giữ nguyên: $7m + 1$. Viết $8m$ là cộng một số vào các hạng tử $m$.',
    },
  },

  // 15 ─ Tricky like terms (check 6) ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ScanEye',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    title: 'Tricky Like Terms',
    titleVn: 'Hạng tử đồng dạng dễ nhầm',
    ratio: 40,
    inlineSvg: DIAGRAMS.TRICKY,
    notes: [
      {
        tone: 'write',
        text: '**Numbers** are like terms: $7 + 2 = 9$.\n$ab$ and $ba$ are like terms, because $a × b = b × a$.\n$x$ and $x^2$ are **not** like terms.',
        textVn: '**Các số** là hạng tử đồng dạng: $7 + 2 = 9$.\n$ab$ và $ba$ là hạng tử đồng dạng, vì $a × b = b × a$.\n$x$ và $x^2$ **không** đồng dạng.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Which pair are **not** like terms?',
      qVn: 'Cặp nào **không** phải hạng tử đồng dạng?',
      options: [
        { val: 'A', text: '$4n$ and $4n^2$', textVn: '$4n$ và $4n^2$' },
        { val: 'B', text: '$3xy$ and $5yx$', textVn: '$3xy$ và $5yx$' },
        { val: 'C', text: '$9$ and $−2$', textVn: '$9$ và $−2$' },
        { val: 'D', text: '$h^2$ and $6h^2$', textVn: '$h^2$ và $6h^2$' },
      ],
      correct: 'A',
      expEn: '$n^2$ means $n × n$, a different kind from $n$, even with the same $4$ in front. $xy$ and $yx$ are alike because $x × y = y × x$; $9$ and $−2$ are both numbers; $h^2$ and $6h^2$ are both $h^2$ terms.',
      expVn: '$n^2$ nghĩa là $n × n$, khác loại với $n$, dù có cùng số $4$ đứng trước. $xy$ và $yx$ đồng dạng vì $x × y = y × x$; $9$ và $−2$ đều là số; $h^2$ và $6h^2$ đều là hạng tử $h^2$.',
    },
  },

  // 16 ─ Like or not? (sort) ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'Eight pairs of terms',
    eyebrowVn: 'Tám cặp hạng tử',
    title: 'Like or Not?',
    titleVn: 'Đồng dạng hay không?',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: 'Read the **letters**. Ignore the number in front.',
    textVn: 'Đọc **chữ cái**. Bỏ qua con số đứng trước.',
    sub: 'Remember: $ab$ is $ba$, and a lone letter is $1$ of it.',
    subVn: 'Nhớ rằng: $ab$ là $ba$, và một chữ cái đứng riêng là $1$ lần chữ đó.',
    activity: {
      id: 'act_sort_like',
      type: 'sort',
      prompt: 'Are these like terms? Sort each pair.',
      promptVn: 'Đây có phải hạng tử đồng dạng không? Sắp xếp từng cặp.',
      bins: [
        { id: 'like', name: 'Like terms', nameVn: 'Đồng dạng' },
        { id: 'not', name: 'Not like terms', nameVn: 'Không đồng dạng' },
      ],
      cards: [
        { id: 'p1', name: '$x$ and $7x$', nameVn: '$x$ và $7x$', bin: 'like' },
        { id: 'p2', name: '$3y$ and $3$', nameVn: '$3y$ và $3$', bin: 'not' },
        { id: 'p3', name: '$2rd$ and $3dr$', nameVn: '$2rd$ và $3dr$', bin: 'like' },
        { id: 'p4', name: '$6p$ and $6pq$', nameVn: '$6p$ và $6pq$', bin: 'not' },
        { id: 'p5', name: '$20$ and $−6$', nameVn: '$20$ và $−6$', bin: 'like' },
        { id: 'p6', name: '$m^2$ and $4m$', nameVn: '$m^2$ và $4m$', bin: 'not' },
        { id: 'p7', name: '$5c$ and $−2c$', nameVn: '$5c$ và $−2c$', bin: 'like' },
        { id: 'p8', name: '$10w$ and $10v$', nameVn: '$10w$ và $10v$', bin: 'not' },
      ],
      explain: 'Like: $x$ is $1x$; $rd = dr$; $20$ and $−6$ are both numbers; and a minus sign does not change the kind, so $5c$ and $−2c$ are both $c$ terms. Not like: $3$ has no letter, $pq$ is not $p$, $m^2$ is not $m$, and $w$ is not $v$.',
      explainVn: 'Đồng dạng: $x$ là $1x$; $rd = dr$; $20$ và $−6$ đều là số; và dấu trừ không làm đổi loại, nên $5c$ và $−2c$ đều là hạng tử $c$. Không đồng dạng: $3$ không có chữ cái, $pq$ khác $p$, $m^2$ khác $m$, và $w$ khác $v$.',
    },
  },

  // 17 ─ The sign travels: 4x + 6y or 10x + 6y? (predict) ────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    title: 'Two Answers Disagree',
    titleVn: 'Hai đáp án khác nhau',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Simplify $7x + 5y − 3x + y$',
    textVn: 'Rút gọn $7x + 5y − 3x + y$',
    sub: 'One student says $4x + 6y$. Another says $10x + 6y$.',
    subVn: 'Một bạn nói $4x + 6y$. Một bạn khác nói $10x + 6y$.',
    activity: {
      id: 'act_predict_sign',
      type: 'predict',
      prompt: 'Which is right?',
      promptVn: 'Đáp án nào đúng?',
      options: [
        { val: 'four', name: '$4x + 6y$', nameVn: '$4x + 6y$' },
        { val: 'ten', name: '$10x + 6y$', nameVn: '$10x + 6y$' },
        { val: 'five', name: '$4x + 5y$', nameVn: '$4x + 5y$' },
      ],
      correct: 'four',
      explain: 'The minus belongs to $3x$: $7x − 3x = 4x$, and $5y + y = 6y$. $10x$ left the minus sign behind; $5y$ forgot that $y$ is $1y$. The next slide shows the sign travelling.',
      explainVn: 'Dấu trừ thuộc về $3x$: $7x − 3x = 4x$, và $5y + y = 6y$. $10x$ là bỏ quên dấu trừ; $5y$ là quên rằng $y$ là $1y$. Slide tiếp theo cho thấy dấu đi theo hạng tử.',
    },
  },

  // 18 ─ The sign moves too (widget) ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Move',
    eyebrow: 'Watch the minus sign',
    eyebrowVn: 'Theo dõi dấu trừ',
    title: 'The Sign Moves Too',
    titleVn: 'Dấu cũng di chuyển',
    widget: CollectSigns,
    caption: '**$4x + 6y$** is right. Press **Next step** and watch where the **−** goes.',
    captionVn: '**$4x + 6y$** mới đúng. Bấm **Bước tiếp** và xem dấu **−** đi đâu.',
  },

  // 19 ─ Keep the sign (algebra) ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    title: 'Keep the Sign',
    titleVn: 'Giữ nguyên dấu',
    notes: [
      {
        tone: 'write',
        text: 'The sign **in front** of a term belongs to it. Move them together.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
        textVn: 'Dấu **đứng trước** hạng tử thuộc về hạng tử đó. Di chuyển cùng nhau.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
      },
    ],
    reveal: {
      prompt: 'Work this one out in your head first: $6p + 2q − 4p + 3q$.',
      promptVn: 'Tính nhẩm câu này trước: $6p + 2q − 4p + 3q$.',
      label: 'Check it',
      labelVn: 'Kiểm tra',
      answer: '$6p − 4p + 2q + 3q = 2p + 5q$',
      answerVn: '$6p − 4p + 2q + 3q = 2p + 5q$',
    },
    activity: {
      id: 'act_simp_sign',
      type: 'algebra',
      mode: 'simplify',
      expr: '9 + 5t − 4 − 2t',
      prompt: 'Type the simplest form of $9 + 5t − 4 − 2t$.',
      promptVn: 'Gõ dạng gọn nhất của $9 + 5t − 4 − 2t$.',
      explain: 'Move each term with its sign: $5t − 2t + 9 − 4$. The $t$ terms make $3t$ and the numbers make $5$, so the answer is $3t + 5$. $7t$ or $13$ would mean a minus sign was left behind.',
      explainVn: 'Di chuyển mỗi hạng tử cùng dấu của nó: $5t − 2t + 9 − 4$. Các hạng tử $t$ cộng lại được $3t$ và các số được $5$, nên đáp án là $3t + 5$. Ra $7t$ hoặc $13$ nghĩa là đã bỏ quên một dấu trừ.',
    },
  },

  // 20 ─ A letter is a number (estimate) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Real bricks',
    eyebrowVn: 'Gạch thật',
    title: 'A Letter Is a Number',
    titleVn: 'Chữ cái là một con số',
    inlineSvg: DIAGRAMS.BRICKS_REAL,
    caption: 'Here **x** is not a brick. It is the **length** of one brick — a number.',
    captionVn: 'Ở đây **x** không phải viên gạch. Nó là **chiều dài** của một viên gạch — một con số. (length = chiều dài)',
    activity: {
      id: 'act_estimate_bricks',
      type: 'estimate',
      prompt: 'One brick is $x = 22$ cm long. About how long is the row of five bricks, $5x$?',
      promptVn: 'Một viên gạch dài $x = 22$ cm. Hàng năm viên gạch, $5x$, dài khoảng bao nhiêu?',
      min: 0,
      max: 300,
      step: 5,
      unit: 'cm',
      answer: 110,
      tolerance: 0.1,
      explain: '$5x$ means $5 × x = 5 × 22 = 110$ cm, just over a metre. The letter stood for a number all along — that is why $5x$ is a length you can work out.',
      explainVn: '$5x$ nghĩa là $5 × x = 5 × 22 = 110$ cm, hơn một mét một chút. Chữ cái luôn đại diện cho một con số — vì vậy $5x$ là một chiều dài em tính được.',
    },
  },

  // 21 ─ How long is each row? (check 7) ────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    title: 'How Long Is Each Row?',
    titleVn: 'Mỗi hàng dài bao nhiêu?',
    ratio: 40,
    inlineSvg: DIAGRAMS.BRICK_ROWS,
    content: 'Work out the length of rows **a** and **b** in **simplest form**. Row **c** is the question.',
    contentVn: 'Tính chiều dài của hàng **a** và **b** ở **dạng gọn nhất**. Hàng **c** là câu hỏi.',
    reveal: {
      label: 'Check rows a and b',
      labelVn: 'Kiểm tra hàng a và b',
      answer: '**a** $x + x + y = 2x + y$\n\n**b** $y + x + y = x + 2y$',
      answerVn: '**a** $x + x + y = 2x + y$\n\n**b** $y + x + y = x + 2y$',
    },
    check: {
      id: 'c7',
      q: 'How long is row **c** ($x$, $y$, $x$, $y$, $x$)?',
      qVn: 'Hàng **c** ($x$, $y$, $x$, $y$, $x$) dài bao nhiêu?',
      options: [
        { val: 'A', text: '$5xy$ cm', textVn: '$5xy$ cm' },
        { val: 'B', text: '$3x + 2y$ cm', textVn: '$3x + 2y$ cm' },
        { val: 'C', text: '$x^3y^2$ cm', textVn: '$x^3y^2$ cm' },
        { val: 'D', text: '$3x + y$ cm', textVn: '$3x + y$ cm' },
      ],
      correct: 'B',
      expEn: 'Three $x$ bricks make $3x$ and two $y$ bricks make $2y$: $3x + 2y$ cm. $5xy$ joins two different kinds; $x^3y^2$ multiplies instead of adding; $3x + y$ missed a $y$ brick.',
      expVn: 'Ba viên gạch $x$ được $3x$ và hai viên gạch $y$ được $2y$: $3x + 2y$ cm. $5xy$ là gộp hai loại khác nhau; $x^3y^2$ là nhân thay vì cộng; $3x + y$ là bỏ sót một viên gạch $y$.',
    },
  },

  // 22 ─ Algebra pyramids (widget) ──────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Triangle',
    eyebrow: 'Say the block before you press',
    eyebrowVn: 'Nói kết quả trước khi bấm',
    title: 'Algebra Pyramids',
    titleVn: 'Kim tự tháp đại số',
    widget: Pyramid,
    caption: 'Each block is the **two blocks under it**, added. Working down, **subtract**.',
    captionVn: 'Mỗi ô bằng **hai ô bên dưới** cộng lại. Khi đi xuống, hãy **trừ**.',
  },

  // 23 ─ Mr Bowen's homework (sort) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowVn: 'Tìm lỗi sai',
    title: 'Mr Bowen’s Homework',
    titleVn: 'Bài tập về nhà của thầy Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.MISTAKES,
    content: 'Mr Bowen gave himself **6 out of 6**.\n\nHe was too generous.',
    contentVn: 'Thầy Bowen tự chấm **6 trên 6**.\n\nThầy đã chấm quá rộng tay.',
    activity: {
      id: 'act_sort_homework',
      type: 'sort',
      prompt: 'Sort each of Mr Bowen’s answers: right or wrong?',
      promptVn: 'Sắp xếp từng đáp án của thầy Bowen: đúng hay sai?',
      bins: [
        { id: 'right', name: 'Right', nameVn: 'Đúng' },
        { id: 'wrong', name: 'Wrong', nameVn: 'Sai' },
      ],
      cards: [
        { id: 'ha', name: '**a** $3x + 5 = 8x$', nameVn: '**a** $3x + 5 = 8x$', bin: 'wrong' },
        { id: 'hb', name: '**b** $6y − y = 6$', nameVn: '**b** $6y − y = 6$', bin: 'wrong' },
        { id: 'hc', name: '**c** $5k + k = 6k$', nameVn: '**c** $5k + k = 6k$', bin: 'right' },
        { id: 'hd', name: '**d** $4p + 2q + p = 6pq$', nameVn: '**d** $4p + 2q + p = 6pq$', bin: 'wrong' },
        { id: 'he', name: '**e** $9 + 2w − 4 = 2w + 5$', nameVn: '**e** $9 + 2w − 4 = 2w + 5$', bin: 'right' },
        { id: 'hf', name: '**f** $2ab + 3ba$: no like terms', nameVn: '**f** $2ab + 3ba$: không có hạng tử đồng dạng', bin: 'wrong' },
      ],
      explain: '**a** cannot be simplified: $3x$ and $5$ are different kinds. **b** is $5y$, because $y$ means $1y$. **d** is $5p + 2q$. **f** is $5ab$, because $ab$ and $ba$ are like terms. Only **c** and **e** are right: Mr Bowen scores 2 out of 6.',
      explainVn: '**a** không rút gọn được: $3x$ và $5$ khác loại. **b** là $5y$, vì $y$ nghĩa là $1y$. **d** là $5p + 2q$. **f** là $5ab$, vì $ab$ và $ba$ là hạng tử đồng dạng. Chỉ **c** và **e** đúng: thầy Bowen được 2 trên 6.',
    },
  },

  // 24 ─ The perimeter (algebra) ────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write it, then simplify',
    eyebrowVn: 'Viết ra, rồi rút gọn',
    title: 'The Perimeter',
    titleVn: 'Chu vi',
    ratio: 50,
    inlineSvg: DIAGRAMS.RECTANGLE,
    content: 'The **perimeter** is the distance all the way round.\n\nAdd all **four** sides, then collect like terms.',
    contentVn: '**Chu vi (perimeter)** là quãng đường đi hết một vòng quanh hình.\n\nCộng cả **bốn** cạnh, rồi gộp các hạng tử đồng dạng.',
    activity: {
      id: 'act_simp_perimeter',
      type: 'algebra',
      mode: 'simplify',
      expr: '2x + 1 + x + 2x + 1 + x',
      prompt: 'Going round the rectangle gives $2x + 1 + x + 2x + 1 + x$. Type the perimeter in simplest form.',
      promptVn: 'Đi một vòng quanh hình chữ nhật được $2x + 1 + x + 2x + 1 + x$. Gõ chu vi ở dạng gọn nhất.',
      explain: 'The $x$ terms are $2x + x + 2x + x = 6x$ and the numbers are $1 + 1 = 2$, so the perimeter is $6x + 2$ cm. $3x + 1$ only goes half way round, and $8x$ adds the numbers to the $x$ terms.',
      explainVn: 'Các hạng tử $x$ là $2x + x + 2x + x = 6x$ và các số là $1 + 1 = 2$, nên chu vi là $6x + 2$ cm. $3x + 1$ mới đi được nửa vòng, còn $8x$ là cộng các số vào hạng tử $x$.',
    },
  },

  // 25 ─ Mr Bowen's animals (check 8) ───────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    title: 'Mr Bowen’s Animals',
    titleVn: 'Những con vật của thầy Bowen',
    content:
      'Mr Bowen has $4c$ cats. He buys $3c$ more cats and $2d$ dogs.\n\n' +
      'Then $5c$ cats leave. One goldfish, called x, arrives.',
    contentVn:
      'Thầy Bowen có $4c$ con mèo. Thầy mua thêm $3c$ con mèo và $2d$ con chó.\n\n' +
      'Sau đó $5c$ con mèo bỏ đi. Một con cá vàng tên là x đến.',
    check: {
      id: 'c8',
      q: 'How many animals does Mr Bowen have now?',
      qVn: 'Bây giờ thầy Bowen có bao nhiêu con vật?',
      options: [
        { val: 'A', text: '$2c + 2d + x$', textVn: '$2c + 2d + x$' },
        { val: 'B', text: '$12c + 2d + 1$', textVn: '$12c + 2d + 1$' },
        { val: 'C', text: '$2c + 2d + 1$', textVn: '$2c + 2d + 1$' },
        { val: 'D', text: '$5cd + 1$', textVn: '$5cd + 1$' },
      ],
      correct: 'C',
      expEn: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$. The goldfish is **1** animal — its name is not a number, so $+ x$ is wrong. $12c$ left the minus sign behind ($4 + 3 + 5$), and $5cd$ joins cats and dogs.',
      expVn: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$. Con cá vàng là **1** con vật — tên của nó không phải là một con số, nên $+ x$ là sai. $12c$ là bỏ quên dấu trừ ($4 + 3 + 5$), còn $5cd$ là gộp mèo với chó.',
    },
  },

  // 26 ─ Mr Bowen's keys (check 9) ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    title: 'Mr Bowen’s Keys',
    titleVn: 'Chùm chìa khóa của thầy Bowen',
    content:
      'Mr Bowen walks $3k$ km to school, then $3k$ km home.\n\n' +
      'He cannot find his keys. He walks to school and home again.\n\n' +
      'The keys were in his pocket.',
    contentVn:
      'Thầy Bowen đi bộ $3k$ km đến trường, rồi $3k$ km về nhà.\n\n' +
      'Thầy không tìm thấy chìa khóa. Thầy lại đi bộ đến trường rồi về nhà.\n\n' +
      'Chìa khóa ở trong túi áo của thầy.',
    check: {
      id: 'c9',
      q: 'How far did Mr Bowen walk?',
      qVn: 'Thầy Bowen đã đi bộ bao xa?',
      options: [
        { val: 'A', text: '$12k$ km', textVn: '$12k$ km' },
        { val: 'B', text: '$6k$ km', textVn: '$6k$ km' },
        { val: 'C', text: '$12$ km', textVn: '$12$ km' },
        { val: 'D', text: '$81k^4$ km', textVn: '$81k^4$ km' },
      ],
      correct: 'A',
      expEn: 'Four walks of $3k$ km: $3k + 3k + 3k + 3k = 12k$ km. $6k$ counts only the first trip there and back; $12$ loses the letter; $81k^4$ multiplies instead of adding. The keys walked $12k$ km too.',
      expVn: 'Bốn lần đi bộ, mỗi lần $3k$ km: $3k + 3k + 3k + 3k = 12k$ km. $6k$ chỉ tính lượt đi và về đầu tiên; $12$ là làm mất chữ cái; $81k^4$ là nhân thay vì cộng. Chùm chìa khóa cũng đã đi $12k$ km.',
    },
  },

  // 27 ─ Checklist + the exit question (check 10) ───────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    eyebrowVn: 'Trước khi làm các nhiệm vụ',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: '> Every orange **Write** panel belongs in your notebook. There are 7.',
    contentVn: '> Mỗi khung **Ghi chép** màu cam đều cần chép vào vở. Có 7 khung.',
    items: [
      { text: 'Say what a **term** and **like terms** are.', textVn: 'Nói được **hạng tử** và **hạng tử đồng dạng** là gì.' },
      { text: '**Simplify** by collecting like terms.', textVn: '**Rút gọn** bằng cách gộp hạng tử đồng dạng.' },
      { text: 'Remember that $x$ means $1x$.', textVn: 'Nhớ rằng $x$ nghĩa là $1x$.' },
      { text: 'Know that $3a + 2b$ cannot be simplified.', textVn: 'Biết rằng $3a + 2b$ không thể rút gọn.' },
      { text: 'Spot tricky like terms: $ab$ and $ba$, but not $x$ and $x^2$.', textVn: 'Nhận ra hạng tử đồng dạng dễ nhầm: $ab$ và $ba$, nhưng không phải $x$ và $x^2$.' },
      { text: 'Move each **sign** with its term.', textVn: 'Di chuyển **dấu** cùng với hạng tử của nó.' },
    ],
    check: {
      id: 'c10',
      q: 'Last one: simplify $5m + 2n − m + 4n$.',
      qVn: 'Câu cuối: rút gọn $5m + 2n − m + 4n$.',
      options: [
        { val: 'A', text: '$6m + 6n$', textVn: '$6m + 6n$' },
        { val: 'B', text: '$5m + 6n$', textVn: '$5m + 6n$' },
        { val: 'C', text: '$10mn$', textVn: '$10mn$' },
        { val: 'D', text: '$4m + 6n$', textVn: '$4m + 6n$' },
      ],
      correct: 'D',
      expEn: 'Move the minus with $m$: $5m − m = 4m$, and $2n + 4n = 6n$, so $4m + 6n$. $6m$ left the minus sign behind; $5m$ ignored the lone $m$, which is $1m$; $10mn$ joins two different kinds.',
      expVn: 'Di chuyển dấu trừ cùng $m$: $5m − m = 4m$, và $2n + 4n = 6n$, nên được $4m + 6n$. $6m$ là bỏ quên dấu trừ; $5m$ là bỏ qua chữ $m$ đứng riêng, vốn là $1m$; $10mn$ là gộp hai loại khác nhau.',
    },
  },
];
