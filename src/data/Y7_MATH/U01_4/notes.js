// src/data/Y7_MATH/U01_4/notes.js
// 1.4 Highest Common Factors — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons). 15 layout slides, 5 embedded checks.
//
// Reduced from 20 classroom slides: the homework slide and one word problem (the
// fruit baskets) are cut/demoted, the discussion beats become solo. Kept and
// protected: the FACTOR-vs-MULTIPLE compare, and the two-slide "Numbers Next
// Door → All Three Are 1" investigation (the class makes a conjecture, then
// meets the word). The `check:` block is always the LAST key on a slide.
import { DIAGRAMS } from './diagrams.js';
import { HcfFinderWidget } from './widgets.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Boxes',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 1 · 1.4',
    eyebrowVn: 'Chương 1 · 1.4',
    title: 'Highest Common Factors',
    titleVn: 'Ước số chung lớn nhất',
    card: {
      icon: 'Pencil',
      badge: 'Starter · Do this first',
      badgeVn: 'Khởi động · Làm trước',
      text: 'Find **every pair** of whole numbers that multiplies to **12**, then every pair for **18**. Keep both lists — you will need them. Then press Next.',
      textVn: 'Tìm **mọi cặp** số nguyên nhân với nhau bằng **12**, rồi mọi cặp cho **18**. Giữ lại cả hai danh sách — em sẽ cần đến. Rồi bấm Tiếp.',
    },
  },

  // 2 ─ The packing hook ────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Two minutes, pen and paper',
    eyebrowVn: 'Hai phút, giấy và bút',
    title: 'How Many Packs Can He Make?',
    titleVn: 'Thầy có thể chia được bao nhiêu gói?',
    text: 'Mr Bowen has **24 pencils** and **40 stickers**.',
    textVn: 'Thầy Bowen có **24 cây bút chì** và **40 cái sticker**.',
    sub: 'He makes **identical packs** — every pack the same, and **nothing left over**. What is the **greatest number of packs** he can make? Write your best guess before you go on.',
    subVn: 'Thầy chia thành các **gói giống hệt nhau** — mỗi gói y như nhau, và **không thừa thứ gì**. **Số gói nhiều nhất** thầy có thể chia là bao nhiêu? Viết dự đoán trước khi tiếp tục.',
  },

  // 3 ─ Key word: Factor ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    title: 'Factor',
    titleVn: 'Factor — Ước số',
    ratio: 45,
    inlineSvg: DIAGRAMS.FACTOR_PAIRS_12,
    content:
      'A **factor** of 12 is a number that divides into 12 **exactly**, with nothing left over. You just found them in the starter by hunting for pairs.\n\n' +
      '**1 and the number itself are always factors.** And 5 is not a factor of 12: $12 ÷ 5 = 2$ remainder 2 — something is left over.',
    contentVn:
      'Một **ước số** của 12 là số chia hết cho 12 một cách **chính xác**, không dư gì. Em vừa tìm ra chúng trong bài khởi động.\n\n' +
      '**1 và chính số đó luôn là ước số.** Còn 5 không phải ước số của 12: $12 ÷ 5 = 2$ dư 2 — vẫn còn thừa.',
    notes: [
      {
        tone: 'write',
        text: '**Factor:** a number that divides into another number exactly, with nothing left over. The factors of 12 are 1, 2, 3, 4, 6 and 12.',
        textVn: '**Ước số (factor):** số chia hết một số khác, không để lại số dư. Các ước số của 12 là 1, 2, 3, 4, 6 và 12.',
      },
    ],
  },

  // 4 ─ Factor or Multiple? (compare, protected) + CHECK 1 ──────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'MessageSquare',
    eyebrow: 'The most confused pair of words',
    eyebrowVn: 'Cặp từ dễ nhầm nhất',
    title: 'Factor or Multiple?',
    titleVn: 'Ước số hay bội số?',
    columns: [
      {
        heading: 'FACTOR — it divides IN',
        headingVn: 'ƯỚC SỐ — nó chia VÀO',
        accent: TEAL,
        icon: 'Target',
        inlineSvg: DIAGRAMS.DIVIDES_IN,
        content: 'A factor **goes into** the number. Factors are **smaller** than the number, or equal. The list **stops**.',
        contentVn: 'Ước số **chia vào** số đó. Ước số **nhỏ hơn** số đó, hoặc bằng. Danh sách **có điểm dừng**.',
        notes: [
          { tone: 'write', text: '**Factors of 12:** 1, 2, 3, 4, 6, 12 — they divide in.', textVn: '**Ước số của 12:** 1, 2, 3, 4, 6, 12 — chúng chia vào 12.' },
        ],
      },
      {
        heading: 'MULTIPLE — you land ON it',
        headingVn: 'BỘI SỐ — em đáp XUỐNG nó',
        accent: PURPLE,
        icon: 'Repeat',
        inlineSvg: DIAGRAMS.LANDS_ON,
        content: 'A multiple is what you **get to** when you count up in that number. Multiples are **bigger**, or equal. The list **never stops**.',
        contentVn: 'Bội số là số em **đi tới** khi đếm lên theo số đó. Bội số **lớn hơn**, hoặc bằng. Danh sách **không bao giờ dừng**.',
        notes: [
          { tone: 'write', text: '**Multiples of 12:** 12, 24, 36, 48, … — you land on them.', textVn: '**Bội số của 12:** 12, 24, 36, 48, … — em đáp xuống chúng.' },
        ],
      },
    ],
    check: {
      id: 'c1',
      q: 'Which of these is a **factor** of 12?',
      qVn: 'Số nào dưới đây là **ước số** của 12?',
      options: [
        { val: 'A', text: '$24$', textVn: '$24$' },
        { val: 'B', text: '$3$', textVn: '$3$' },
        { val: 'C', text: '$36$', textVn: '$36$' },
      ],
      correct: 'B',
      expEn: '$3$ divides into 12 exactly ($12 ÷ 3 = 4$), so it is a factor. $24$ and $36$ are **multiples** of 12 — numbers you land on by counting up — not factors.',
      expVn: '$3$ chia hết 12 ($12 ÷ 3 = 4$), nên nó là ước số. $24$ và $36$ là **bội số** của 12 — những số em đáp xuống khi đếm lên — không phải ước số.',
    },
  },

  // 5 ─ Common & highest common factor + CHECK 2 ────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Target',
    side: 'left',
    eyebrow: 'The big words of the lesson',
    eyebrowVn: 'Những từ quan trọng nhất của bài',
    title: 'Common & Highest Common Factor',
    titleVn: 'Ước số chung & ƯCLN',
    ratio: 45,
    inlineSvg: DIAGRAMS.HCF_LISTS,
    content:
      'Remember: in maths **common** means **shared**. Write the factors of each number, then find the ones in **both** lists — those are the **common factors**. For 12 and 18 they are 1, 2, 3 and 6.\n\n' +
      '**Highest** just means **biggest**. The **highest common factor (HCF)** is the biggest of them. This is the same idea as **ƯCLN** — today we learn the English words.',
    contentVn:
      'Nhớ nhé: trong toán, **common** nghĩa là **chung**. Viết ước số của mỗi số, rồi tìm những số có trong **cả hai** danh sách — đó là **ước số chung**. Với 12 và 18 chúng là 1, 2, 3 và 6.\n\n' +
      '**Highest** chỉ có nghĩa là **lớn nhất**. **Ước số chung lớn nhất (ƯCLN)** là số lớn nhất trong đó. Đây chính là **ƯCLN** — hôm nay ta học các từ tiếng Anh.',
    notes: [
      {
        tone: 'write',
        text: '**Common factor:** a factor of **both** numbers (in both lists).\n**Highest common factor (HCF):** the biggest common factor. The HCF of 12 and 18 is 6.',
        textVn: '**Ước số chung:** ước của **cả hai** số (có trong cả hai danh sách).\n**Ước số chung lớn nhất (ƯCLN):** ước số chung lớn nhất. ƯCLN của 12 và 18 là 6.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which number is a **common factor** of 12 and 18?',
      qVn: 'Số nào là **ước số chung** của 12 và 18?',
      options: [
        { val: 'A', text: '$6$', textVn: '$6$' },
        { val: 'B', text: '$9$', textVn: '$9$' },
        { val: 'C', text: '$4$', textVn: '$4$' },
      ],
      correct: 'A',
      expEn: '$6$ divides into **both** 12 and 18, so it is a common factor (in fact the highest). $9$ divides only 18; $4$ divides only 12 — neither is in both lists.',
      expVn: '$6$ chia hết **cả** 12 và 18, nên là ước số chung (thực ra là lớn nhất). $9$ chỉ chia 18; $4$ chỉ chia 12 — không số nào có trong cả hai danh sách.',
    },
  },

  // 6 ─ English: why "highest" this time? + CHECK 3 ─────────────────────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'MessageSquare',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: 'Why “Highest” This Time?',
    titleVn: 'Vì sao lần này lại là “lớn nhất”?',
    text: 'Last unit, the **lowest**. This unit, the **highest**.',
    textVn: 'Bài trước là **nhỏ nhất**. Bài này là **lớn nhất**.',
    sub: 'Why does the book swap ends?',
    subVn: 'Vì sao sách lại đổi đầu như vậy?',
    reveal: {
      label: 'Show me',
      labelVn: 'Cho em xem',
      answer:
        'Because one list **stops** and the other **never does**.\n\n' +
        'Multiples go on for ever, so there is **no highest** one — we ask for the lowest. Factors stop, so there **is** a highest one to ask for.',
      answerVn:
        'Vì một danh sách **có điểm dừng**, còn danh sách kia **thì không**.\n\n' +
        'Bội số kéo dài mãi, nên **không có số lớn nhất** — ta hỏi số nhỏ nhất. Ước số dừng lại, nên **có** số lớn nhất để hỏi.',
    },
    check: {
      id: 'c3',
      q: 'Why do we ask for the **lowest** common multiple but the **highest** common factor?',
      qVn: 'Vì sao ta hỏi bội số chung **nhỏ nhất** nhưng ước số chung **lớn nhất**?',
      options: [
        { val: 'A', text: 'Multiples never stop (no highest), but factors stop (there is a highest).', textVn: 'Bội số không bao giờ dừng (không có số lớn nhất), còn ước số thì dừng (có số lớn nhất).' },
        { val: 'B', text: 'Because factors are always bigger than multiples.', textVn: 'Vì ước số luôn lớn hơn bội số.' },
        { val: 'C', text: 'It is just a rule you have to memorise.', textVn: 'Đó chỉ là quy tắc phải học thuộc.' },
      ],
      correct: 'A',
      expEn: 'Multiples of a number go on for ever, so there is no highest — we ask for the lowest. Factors stop at the number itself, so there is a highest to ask for.',
      expVn: 'Bội số của một số kéo dài mãi, nên không có số lớn nhất — ta hỏi số nhỏ nhất. Ước số dừng lại ở chính số đó, nên có số lớn nhất để hỏi.',
    },
  },

  // 7 ─ Mr Bowen's method (+ resolves the packing hook) ─────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Copy the method',
    eyebrowVn: 'Chép lại cách làm',
    title: 'Mr Bowen’s Method',
    titleVn: 'Cách làm của thầy Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.METHOD_24_80,
    drawThis: true,
    content:
      'To find the HCF of 24 and 80, Mr Bowen lists the factors of each, then rings the **biggest** number in both. The HCF of 24 and 80 is 8.\n\n' +
      'The **same method** answers the pencils and stickers: the HCF of 24 and 40 is also **8**, so 8 identical packs — each with $24 ÷ 8 = 3$ pencils and $40 ÷ 8 = 5$ stickers. How close was your guess?',
    contentVn:
      'Để tìm ƯCLN của 24 và 80, thầy Bowen liệt kê ước số của mỗi số, rồi khoanh **số lớn nhất** có trong cả hai. ƯCLN của 24 và 80 là 8.\n\n' +
      '**Cùng cách làm** đó trả lời bài bút chì và sticker: ƯCLN của 24 và 40 cũng là **8**, nên 8 gói giống hệt nhau — mỗi gói có $24 ÷ 8 = 3$ bút chì và $40 ÷ 8 = 5$ sticker. Dự đoán của em gần đến đâu?',
    notes: [
      {
        tone: 'write',
        text:
          '**To find the HCF of two numbers:**\n' +
          '**1.** List the factors of each number.\n' +
          '**2.** Find the numbers in both lists.\n' +
          '**3.** The HCF is the highest of them.',
        textVn:
          '**Để tìm ƯCLN của hai số:**\n' +
          '**1.** Liệt kê ước số của mỗi số.\n' +
          '**2.** Tìm những số có trong cả hai danh sách.\n' +
          '**3.** ƯCLN là số lớn nhất trong đó.',
      },
    ],
  },

  // 8 ─ Find the HCF (HcfFinderWidget) ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Find the HCF',
    titleVn: 'Tìm ƯCLN',
    ratio: 45,
    content:
      'Run the method on more pairs. For each one, **work out the HCF yourself before you reveal it** — list the factors if you need to.\n\n' +
      'Watch the surprises: 8 and 9, and 6 and 18, do not behave the way you might expect.',
    contentVn:
      'Áp dụng cách làm cho nhiều cặp số hơn. Với mỗi cặp, **tự tìm ƯCLN trước khi hiện đáp án** — cứ liệt kê ước số nếu cần.\n\n' +
      'Hãy để ý các bất ngờ: 8 và 9, rồi 6 và 18, không như em có thể đoán.',
    widget: HcfFinderWidget,
  },

  // 9 ─ Watch out: the HCF is never "none" + CHECK 4 ────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ShieldCheck',
    eyebrow: 'Watch out',
    eyebrowVn: 'Cẩn thận',
    title: 'The HCF Is Never “None”',
    titleVn: 'ƯCLN không bao giờ là “không có”',
    ratio: 55,
    content:
      'Two surprises. The HCF of 8 and 9 is **1**, **not** “none” — only 1 is in both lists. The HCF of 6 and 18 is **6**, **not** 1 — because 6 divides into 18.\n\n' +
      '**1 is a factor of every number**, so two numbers always share at least one common factor.',
    contentVn:
      'Hai bất ngờ. ƯCLN của 8 và 9 là **1**, **không phải** “không có” — chỉ có 1 nằm ở cả hai danh sách. ƯCLN của 6 và 18 là **6**, **không phải** 1 — vì 6 chia hết 18.\n\n' +
      '**1 là ước số của mọi số**, nên hai số luôn có ít nhất một ước số chung.',
    notes: [
      {
        tone: 'write',
        text: '**Careful:** 1 is a factor of every number, so two numbers **always** have a common factor. And if one number divides into the other, the HCF is the **smaller** number.',
        textVn: '**Cẩn thận:** 1 là ước số của mọi số, nên hai số **luôn** có ước số chung. Và nếu một số chia hết số kia, ƯCLN chính là **số nhỏ hơn**.',
      },
    ],
    check: {
      id: 'c4',
      q: 'What is the highest common factor of 8 and 9?',
      qVn: 'Ước số chung lớn nhất của 8 và 9 là bao nhiêu?',
      options: [
        { val: 'A', text: 'None — they share no factors', textVn: 'Không có — chúng không có ước số chung' },
        { val: 'B', text: '$72$', textVn: '$72$' },
        { val: 'C', text: '$1$', textVn: '$1$' },
      ],
      correct: 'C',
      expEn: '1 is a factor of every number, so the HCF of 8 and 9 is **1**, never “none”. Answering 72 multiplies them ($8 × 9$), which is the LCM, not the HCF.',
      expVn: '1 là ước số của mọi số, nên ƯCLN của 8 và 9 là **1**, không bao giờ “không có”. Trả lời 72 là nhân ($8 × 9$), đó là BCNN, không phải ƯCLN.',
    },
  },

  // 10 ─ Application 1: the two ribbons + CHECK 5 ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    title: 'The Two Ribbons',
    titleVn: 'Hai dải ruy băng',
    ratio: 50,
    inlineSvg: DIAGRAMS.RIBBONS_36_48,
    content:
      'Mr Bowen has two ribbons: one **36 cm** long, the other **48 cm**. He cuts both into equal pieces, **as long as possible**, with **nothing left over**.\n\n' +
      'How long is each piece?',
    contentVn:
      'Thầy Bowen có hai dải ruy băng: một dải dài **36 cm**, dải kia **48 cm**. Thầy cắt cả hai thành các đoạn bằng nhau, **dài nhất có thể**, và **không thừa mẩu nào**.\n\n' +
      'Mỗi đoạn dài bao nhiêu?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: 'The HCF of 36 and 48 is $12$, so every piece is **12 cm** — the longest length that fits both, with $36 ÷ 12 = 3$ pieces and $48 ÷ 12 = 4$ pieces.',
      answerVn: 'ƯCLN của 36 và 48 là $12$, nên mỗi đoạn dài **12 cm** — độ dài lớn nhất chia hết cả hai, cho $36 ÷ 12 = 3$ đoạn và $48 ÷ 12 = 4$ đoạn.',
    },
    check: {
      id: 'c5',
      q: 'Two ribbons, 36 cm and 48 cm, are cut into equal pieces **as long as possible**, none left over. How long is each piece?',
      qVn: 'Hai dải 36 cm và 48 cm được cắt thành các đoạn bằng nhau **dài nhất có thể**, không thừa. Mỗi đoạn dài bao nhiêu?',
      options: [
        { val: 'A', text: '$4$ cm', textVn: '$4$ cm' },
        { val: 'B', text: '$12$ cm', textVn: '$12$ cm' },
        { val: 'C', text: '$84$ cm', textVn: '$84$ cm' },
      ],
      correct: 'B',
      expEn: '“Equal pieces, as long as possible” means the **highest common factor** of 36 and 48, which is 12 cm. $4$ is a common factor but not the highest; $84$ adds the two lengths.',
      expVn: '“Đoạn bằng nhau, dài nhất có thể” nghĩa là **ước số chung lớn nhất** của 36 và 48, bằng 12 cm. $4$ là ước số chung nhưng không phải lớn nhất; $84$ là cộng hai độ dài.',
    },
  },

  // 11 ─ Investigate: numbers next door (consecutive) [protected] ────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Investigate',
    eyebrowVn: 'Khám phá',
    title: 'Numbers Next Door',
    titleVn: 'Những số nhà kề nhau',
    ratio: 55,
    content:
      'Find the HCF of each of these pairs. Do all three before you go on.\n\n' +
      '> **A)** 9 and 10    **B)** 20 and 21    **C)** 32 and 33',
    contentVn:
      'Hãy tìm ƯCLN của từng cặp số sau. Làm cả ba trước khi tiếp tục.\n\n' +
      '> **A)** 9 và 10    **B)** 20 và 21    **C)** 32 và 33',
    notes: [
      {
        tone: 'write',
        text: '**Consecutive:** following one after the other when you count. 6 and 7 are consecutive; 6 and 8 are not.',
        textVn: '**Liên tiếp (consecutive):** đứng ngay sau nhau khi đếm. 6 và 7 là liên tiếp; 6 và 8 thì không.',
      },
    ],
  },

  // 12 ─ Investigate: all three are 1 (conjecture) [protected] ───────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sparkles',
    eyebrow: 'You have just done what mathematicians do',
    eyebrowVn: 'Em vừa làm đúng việc các nhà toán học làm',
    title: 'All Three Are 1',
    titleVn: 'Cả ba đều bằng 1',
    ratio: 55,
    content:
      'Every answer came out as **1**. Three cases is not a proof — but it is enough to make a **conjecture**.\n\n' +
      'Test it on 99 and 100. Does it still hold?',
    contentVn:
      'Mọi đáp án đều ra **1**. Ba trường hợp chưa phải là chứng minh — nhưng đủ để đưa ra một **phỏng đoán**.\n\n' +
      'Hãy thử với 99 và 100. Nó còn đúng không?',
    notes: [
      {
        tone: 'write',
        text: '**Conjecture:** what you think is true because of a pattern you have seen, before anyone has proved it.\n**Our conjecture:** the HCF of two consecutive numbers is always 1.',
        textVn: '**Phỏng đoán (conjecture):** điều em cho là đúng dựa trên một quy luật em thấy, trước khi có ai chứng minh.\n**Phỏng đoán của lớp ta:** ƯCLN của hai số liên tiếp luôn bằng 1.',
      },
    ],
  },

  // 13 ─ Application 2: the bookshelf (simplify a fraction) ──────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    title: 'Mr Bowen’s Bookshelf',
    titleVn: 'Giá sách của thầy Bowen',
    ratio: 55,
    side: 'left',
    image: 'images/Y7_MATH/U01_4/books.jpg',
    content:
      'There are **24 books** on the shelf, and **18** of them are maths books.\n\n' +
      'Write the fraction of the books that are maths books, **in its simplest form**.',
    contentVn:
      'Trên giá có **24 quyển sách**, trong đó **18** quyển là sách toán.\n\n' +
      'Hãy viết phân số chỉ phần sách toán, **ở dạng tối giản**.',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: 'The fraction is $\\frac{18}{24}$. The HCF of 18 and 24 is $6$, so divide top and bottom by 6: $\\frac{18}{24} = \\frac{3}{4}$. **Three quarters** of the shelf is maths. The HCF is the shortcut that simplifies in one step.',
      answerVn: 'Phân số là $\\frac{18}{24}$. ƯCLN của 18 và 24 là $6$, nên chia cả tử và mẫu cho 6: $\\frac{18}{24} = \\frac{3}{4}$. **Ba phần tư** giá sách là sách toán. ƯCLN là lối tắt giúp rút gọn chỉ trong một bước.',
    },
    check: {
      id: 'c6',
      q: '18 of the 24 books are maths books. What is $\\frac{18}{24}$ in its simplest form?',
      qVn: '18 trong 24 quyển là sách toán. $\\frac{18}{24}$ ở dạng tối giản là gì?',
      options: [
        { val: 'A', text: '$\\frac{9}{12}$', textVn: '$\\frac{9}{12}$' },
        { val: 'B', text: '$\\frac{3}{4}$', textVn: '$\\frac{3}{4}$' },
        { val: 'C', text: '$\\frac{6}{8}$', textVn: '$\\frac{6}{8}$' },
      ],
      correct: 'B',
      expEn: 'Simplest form means dividing by the **HCF**. The HCF of 18 and 24 is 6, so $\\frac{18}{24} = \\frac{3}{4}$. $\\frac{9}{12}$ (÷2) and $\\frac{6}{8}$ (÷3) are equal but not fully simplified — they still share a factor.',
      expVn: 'Dạng tối giản là chia cho **ƯCLN**. ƯCLN của 18 và 24 là 6, nên $\\frac{18}{24} = \\frac{3}{4}$. $\\frac{9}{12}$ (÷2) và $\\frac{6}{8}$ (÷3) bằng nó nhưng chưa tối giản — vẫn còn ước chung.',
    },
  },

  // 14 ─ Countable recap ────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    title: 'Can You Do All Five?',
    titleVn: 'Em làm được cả năm điều này chứ?',
    content: 'Your notebook should now have the **HCF method** and **the key words** (factor, common factor, HCF, consecutive, conjecture) written down. Check each one.',
    contentVn: 'Trong vở của em bây giờ phải có **cách tìm ƯCLN** và **các từ khoá** (ước số, ước số chung, ƯCLN, liên tiếp, phỏng đoán). Hãy kiểm tra từng điều.',
    items: [
      { text: 'Say what a **factor** is — and how it differs from a **multiple**.', textVn: 'Nói được **ước số** là gì — và khác **bội số** ra sao.' },
      { text: 'Find the **common factors** of two numbers.', textVn: 'Tìm được **ước số chung** của hai số.' },
      { text: 'Find the **highest common factor (HCF)**.', textVn: 'Tìm được **ước số chung lớn nhất (ƯCLN)**.' },
      { text: 'Explain why we want the **highest** factor but the **lowest** multiple.', textVn: 'Giải thích vì sao ta cần ước số **lớn nhất** nhưng bội số **nhỏ nhất**.' },
      { text: 'Use the HCF to **simplify a fraction**.', textVn: 'Dùng ƯCLN để **rút gọn một phân số**.' },
    ],
  },

  // 15 ─ Closer + exit question ─────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    subtitle: 'You can find the highest common factor of two numbers, and you know a factor divides in while a multiple is what you land on. Exit question: what is the **HCF of 7 and 14** — and why is it not 1?',
    subtitleVn: 'Em đã có thể tìm ước số chung lớn nhất của hai số, và biết ước số thì chia vào, còn bội số là số em đáp xuống. Câu hỏi ra về: **ƯCLN của 7 và 14** là bao nhiêu — và vì sao không phải 1?',
  },
];
