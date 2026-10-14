// src/data/Y7_MATH/U02_6/notes.js
// 2.6 Inequalities — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons, content/y7-math/U02_6, 28 slides), rebuilt to the
// algebra-engines density (docs/y7-math/algebra-engines.md §4). 26 layout
// slides, 20 scored items: 8 checks and 12 activities across five activity
// types (order · sort · predict · ineq · hotspot). No two slides in a row go
// unscored, and no two activities in a row are the same type.
//
// THREE THINGS SHAPE THIS DECK (all three from the classroom deck, kept).
//
// 1. THE STUDENT KNOWS THE SIGNS ALREADY. Vietnamese primary school teaches <
//    and > in Grade 1. What is new is the ENGLISH: "is less than" and "is
//    greater than", read left to right, and the other words a word problem
//    uses instead (fewer, below, under, more, above, over). Slides 3–4 and 8–9
//    are all English; slide 4 sorts six sentences into the two signs.
//
// 2. AN INEQUALITY HAS MANY ANSWERS. After a week of equations with one
//    answer, "I have more than 3 cats" has four, five, six … — and "integer"
//    (Unit 1's word) is what stops the answer being 3.5 cats. Slides 5–7.
//
// 3. TWO MISTAKES COST THE MARKS: counting the circle's own number (x > 3, so
//    the smallest integer is 3) and going the wrong way with negatives
//    (t < −2, so −1, 0, 1, …). Each classroom hand-vote is now a `predict`
//    (slides 12 and 16) with no answer on its slide. The first is settled by
//    the open circle (13); the second by "less than means left" (17) and a
//    real thermometer (18).
//
// SPINE:
//   1–2    hero; six numbers, smallest first (order)
//   3–4    is less than / is greater than; the other words (sort)
//   5–7    Mr Bowen's cats (predict); inequality; integer (check)
//   8–9    write it (check); say it (check)
//   10–11  the open circle and the arrow; read the line (ineq read)
//   12–15  3 or 4? (predict); the circle's number is out (hotspot); the
//          stepper; draw the line (ineq draw)
//   16–18  −1, 0, 1 or −3, −4, −5? (predict); less than means left (check);
//          the thermometer (check)
//   19–21  could it be? (sort); the stepper with negatives; smallest or
//          largest (ineq integer)
//   22     Mr Bowen's homework (sort)
//   23–25  the class (ineq list); the cats, again (check); Mr Bowen's number
//          (check)
//   26     the checklist, with the exit question as the last check
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · THE NARRATION READS THE SIGNS. generate_all_audio.py turns "$x > 3$" into
//    "x is greater than 3" and a lone "$<$" into "less than". So:
//      – a sign is never written bare or bold in a narrated field (a bare "<"
//        is read as nothing sensible, and a bare ">" is deleted);
//      – a negative number straight after a sign is written with a keyboard
//        minus inside the maths ("$t < -2$"): the generator does not read a
//        sign that is followed by "−";
//      – an inequality the student has to SAY (slides 3 and 9) sits in
//        `example`, which is not narrated — the audio would say it for them.
//  · In plain text a negative number has a real minus sign, −.
//  · A decimal point is a dot in both languages.
//  · Every inequality is strict, so every circle is open.
//  · No whiteboards, pairs, hand votes, paper, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { ShowOne, ShowTwo } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U02_6/${f}`);

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
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 2 · 2.6',
    eyebrowVn: 'Chương 2 · 2.6',
    eyebrowFr: 'Unité 2 · 2.6',
    title: 'Inequalities',
    titleVn: 'Bất đẳng thức',
    titleFr: 'Inégalités',
    objective: 'Say "is less than" and "is greater than" in English, reading left to right, and know the other words a word problem uses for them; say what an inequality and an integer are; show an inequality on a number line with an open circle and an arrow, and read one back; and find the smallest or largest integer that works, even below zero.',
    objectiveVn: 'Nói được "is less than" và "is greater than" bằng tiếng Anh, đọc từ trái sang phải, và biết những từ khác mà bài toán có lời văn dùng thay cho chúng; nói được bất đẳng thức và số nguyên là gì; biểu diễn một bất đẳng thức trên trục số bằng vòng tròn rỗng và mũi tên, và đọc được bất đẳng thức từ trục số; tìm số nguyên nhỏ nhất hoặc lớn nhất thỏa mãn, kể cả khi dưới 0.',
    objectiveFr: 'Dire « is less than » et « is greater than » en anglais, en lisant de gauche à droite, et connaître les autres mots qu’un problème utilise à leur place ; dire ce que sont une inégalité et un nombre entier ; représenter une inégalité sur une droite graduée avec un cercle vide et une flèche, et la relire ; trouver le plus petit ou le plus grand entier qui convient, même sous zéro.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'You will **order**, **sort**, **predict**, **tap** and **draw** your way through it. **20 things are scored** — the first is the six numbers on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **phân loại**, **dự đoán**, **chạm** và **vẽ** trong suốt bài học. **20 mục được tính điểm** — mục đầu tiên là sáu con số ở slide sau.',
      textFr: 'Tu vas **ranger**, **trier**, **prédire**, **toucher** et **dessiner** tout au long de la leçon. **20 éléments sont notés** — le premier, ce sont les six nombres de la diapo suivante.',
    },
  },

  // 2 ─ Starter: the classroom's three pairs, as six numbers (ORDER) ─────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'ArrowUpDown',
    eyebrow: 'Starter',
    eyebrowVn: 'Khởi động',
    eyebrowFr: 'Pour commencer',
    title: 'Smallest First',
    titleVn: 'Số nhỏ nhất trước',
    titleFr: 'Le plus petit d’abord',
    label: 'Warm up',
    labelVn: 'Khởi động',
    labelFr: 'Échauffement',
    labelIcon: 'Sparkles',
    text: 'Six numbers: $7$, $4$, $-3$, $2$, $-8$, $-5$.',
    textVn: 'Sáu con số: $7$, $4$, $-3$, $2$, $-8$, $-5$.',
    textFr: 'Six nombres : $7$, $4$, $-3$, $2$, $-8$, $-5$.',
    sub: 'You know the signs $<$ and $>$ already. Start with the numbers.',
    subVn: 'Em đã biết dấu $<$ và $>$ rồi. Hãy bắt đầu với các con số.',
    subFr: 'Tu connais déjà les signes $<$ et $>$. Commence par les nombres.',
    activity: {
      id: 'act_order',
      type: 'order',
      prompt: 'Put the six numbers in order: the **smallest** first.',
      promptVn: 'Sắp xếp sáu con số theo thứ tự: số **nhỏ nhất** trước.',
      promptFr: 'Range les six nombres dans l’ordre : le **plus petit** d’abord.',
      steps: [
        { id: 'm8', name: '$-8$', nameVn: '$-8$', nameFr: '$-8$' },
        { id: 'm5', name: '$-5$', nameVn: '$-5$', nameFr: '$-5$' },
        { id: 'm3', name: '$-3$', nameVn: '$-3$', nameFr: '$-3$' },
        { id: 'p2', name: '$2$', nameVn: '$2$', nameFr: '$2$' },
        { id: 'p4', name: '$4$', nameVn: '$4$', nameFr: '$4$' },
        { id: 'p7', name: '$7$', nameVn: '$7$', nameFr: '$7$' },
      ],
      explain: 'On a number line the smallest number is the one furthest **left**: $-8$, then $-5$, then $-3$. A bigger digit after the minus sign makes a **smaller** number — $-8$ is colder than $-5$. So $-8 < -5$, $-3 < 2$ and $7 > 4$.',
      explainVn: 'Trên trục số, số nhỏ nhất là số nằm xa nhất về bên **trái**: $-8$, rồi $-5$, rồi $-3$. Chữ số sau dấu trừ càng lớn thì số càng **nhỏ** — $-8$ lạnh hơn $-5$. Vậy $-8 < -5$, $-3 < 2$ và $7 > 4$.',
      explainFr: 'Sur une droite graduée, le plus petit nombre est celui qui est le plus à **gauche** : $-8$, puis $-5$, puis $-3$. Un chiffre plus grand après le signe moins donne un nombre plus **petit** — $-8$ est plus froid que $-5$. Donc $-8 < -5$, $-3 < 2$ et $7 > 4$.',
    },
  },

  // ── THE ENGLISH ───────────────────────────────────────────────────────────
  // 3 ─ The book's Remember box, and the starter read aloud ──────────────────
  // The three to say sit in `example` (not narrated): read from a narrated
  // field, the audio would say each one before the student does.
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Remember',
    eyebrowVn: 'Ghi nhớ',
    eyebrowFr: 'À retenir',
    title: 'Less Than, Greater Than',
    titleVn: 'Nhỏ hơn, lớn hơn',
    titleFr: 'Plus petit, plus grand',
    ratio: 50,
    inlineSvg: DIAGRAMS.SYMBOLS,
    content: 'The signs are not new. The **English** is. Read from **left to right**.',
    contentVn: 'Hai dấu này không mới. Cái mới là **tiếng Anh**. Đọc từ **trái sang phải**.',
    contentFr: 'Les signes ne sont pas nouveaux. C’est l’**anglais** qui est nouveau. Lis de **gauche à droite**.',
    notes: [
      {
        tone: 'write',
        text: '$<$ means **is less than**.\n$>$ means **is greater than**.',
        textVn: '$<$ nghĩa là **nhỏ hơn** (is less than).\n$>$ nghĩa là **lớn hơn** (is greater than).',
        textFr: '$<$ veut dire **est plus petit que** (is less than).\n$>$ veut dire **est plus grand que** (is greater than).',
      },
    ],
    exampleLabel: 'Say these out loud',
    exampleLabelVn: 'Hãy đọc to',
    exampleLabelFr: 'Dis-les à voix haute',
    example: '$7 > 4$: "7 **is greater than** 4"\n\n$-3 < 2$: "−3 **is less than** 2"\n\n$-8 < -5$: "−8 **is less than** −5"',
    exampleVn: '$7 > 4$: "7 **is greater than** 4"\n\n$-3 < 2$: "−3 **is less than** 2"\n\n$-8 < -5$: "−8 **is less than** −5"',
    exampleFr: '$7 > 4$: "7 **is greater than** 4"\n\n$-3 < 2$: "−3 **is less than** 2"\n\n$-8 < -5$: "−8 **is less than** −5"',
  },

  // 4 ─ English check: the other words (SORT) ───────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Other Words, Same Sign',
    titleVn: 'Từ khác, cùng dấu',
    titleFr: 'Autres mots, même signe',
    inlineSvg: DIAGRAMS.WORDS,
    caption: 'Word problems use all of these. The words change. The two signs do not.',
    captionVn: 'Bài toán có lời văn dùng tất cả các từ này. Từ thì thay đổi, còn hai dấu thì không. (fewer than = ít hơn, below / under = dưới, more than = nhiều hơn, above / over = trên)',
    captionFr: 'Les problèmes utilisent tous ces mots. Les mots changent. Les deux signes, non. (fewer than = moins de, below / under = en dessous de, more than = plus de, above / over = au-dessus de)',
    activity: {
      id: 'act_words',
      type: 'sort',
      prompt: 'Six sentences from word problems. Which sign does each one need?',
      promptVn: 'Sáu câu trong các bài toán có lời văn. Mỗi câu cần dấu nào?',
      promptFr: 'Six phrases tirées de problèmes. De quel signe chacune a-t-elle besoin ?',
      bins: [
        { id: 'lt', name: '**Less than**  $<$', nameVn: '**Nhỏ hơn**  $<$', nameFr: '**Plus petit que**  $<$' },
        { id: 'gt', name: '**Greater than**  $>$', nameVn: '**Lớn hơn**  $>$', nameFr: '**Plus grand que**  $>$' },
      ],
      cards: [
        { id: 'w1', name: '"It is **below** 10 °C today."', nameVn: '"It is **below** 10 °C today."', nameFr: '"It is **below** 10 °C today."', bin: 'lt' },
        { id: 'w2', name: '"The bag holds **more than** 5 kg."', nameVn: '"The bag holds **more than** 5 kg."', nameFr: '"The bag holds **more than** 5 kg."', bin: 'gt' },
        { id: 'w3', name: '"You must be **under** 16 to play."', nameVn: '"You must be **under** 16 to play."', nameFr: '"You must be **under** 16 to play."', bin: 'lt' },
        { id: 'w4', name: '"There were **over** 200 people."', nameVn: '"There were **over** 200 people."', nameFr: '"There were **over** 200 people."', bin: 'gt' },
        { id: 'w5', name: '"There are **fewer than** 12 eggs."', nameVn: '"There are **fewer than** 12 eggs."', nameFr: '"There are **fewer than** 12 eggs."', bin: 'lt' },
        { id: 'w6', name: '"The plane flies **above** 9000 m."', nameVn: '"The plane flies **above** 9000 m."', nameFr: '"The plane flies **above** 9000 m."', bin: 'gt' },
      ],
      explain: '**Fewer than**, **below** and **under** all mean less than: $<$. **More than**, **above** and **over** all mean greater than: $>$. "Under 16" is an age less than 16. "Over 200 people" is a number of people greater than 200.',
      explainVn: '**Fewer than** (ít hơn), **below** và **under** (dưới) đều nghĩa là nhỏ hơn: $<$. **More than** (nhiều hơn), **above** và **over** (trên) đều nghĩa là lớn hơn: $>$. "Under 16" là số tuổi nhỏ hơn 16. "Over 200 people" là số người lớn hơn 200.',
      explainFr: '**Fewer than** (moins de), **below** et **under** (en dessous de) veulent tous dire plus petit que : $<$. **More than** (plus de), **above** et **over** (au-dessus de) veulent tous dire plus grand que : $>$. « Under 16 », c’est un âge plus petit que 16. « Over 200 people », c’est un nombre de personnes plus grand que 200.',
    },
  },

  // ── MANY ANSWERS ──────────────────────────────────────────────────────────
  // 5 ─ Mr Bowen's cats (PREDICT) ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say a number',
    eyebrowVn: 'Nói một con số',
    eyebrowFr: 'Dis un nombre',
    title: 'Mr Bowen’s Cats',
    titleVn: 'Những con mèo của thầy Bowen',
    titleFr: 'Les chats de M. Bowen',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: '"I have **more than 3** cats."',
    textVn: '"Thầy có **nhiều hơn 3** con mèo." (more than 3 cats)',
    textFr: '« J’ai **plus de 3** chats. » (more than 3 cats)',
    sub: 'How many cats could Mr Bowen have? Is there only one answer?',
    subVn: 'Thầy Bowen có thể có bao nhiêu con mèo? Chỉ có một đáp án thôi sao?',
    subFr: 'Combien de chats M. Bowen peut-il avoir ? Y a-t-il une seule réponse ?',
    activity: {
      id: 'act_cats',
      type: 'predict',
      prompt: 'How many cats could Mr Bowen have?',
      promptVn: 'Thầy Bowen có thể có bao nhiêu con mèo?',
      promptFr: 'Combien de chats M. Bowen peut-il avoir ?',
      options: [
        { val: 'three', name: 'Exactly 3', nameVn: 'Đúng 3 con', nameFr: 'Exactement 3' },
        { val: 'four', name: 'Exactly 4 — one answer, like an equation', nameVn: 'Đúng 4 con — một đáp án, giống phương trình', nameFr: 'Exactement 4 — une seule réponse, comme une équation' },
        { val: 'from3', name: '3, 4, 5, 6, … — many answers', nameVn: '3, 4, 5, 6, … — nhiều đáp án', nameFr: '3, 4, 5, 6, … — plusieurs réponses' },
        { val: 'from4', name: '4, 5, 6, 7, … — many answers', nameVn: '4, 5, 6, 7, … — nhiều đáp án', nameFr: '4, 5, 6, 7, … — plusieurs réponses' },
      ],
      correct: 'from4',
      explain: '**4, 5, 6, 7 and so on.** Every one of them is more than 3, so there is not just one answer. 3 itself is out: 3 is not **more than** 3. A statement like this has a name — it is on the next slide.',
      explainVn: '**4, 5, 6, 7, và cứ thế.** Số nào trong đó cũng nhiều hơn 3, nên không phải chỉ có một đáp án. Riêng số 3 thì không được: 3 không **nhiều hơn** 3. Một mệnh đề như thế này có tên riêng — ở slide sau.',
      explainFr: '**4, 5, 6, 7 et ainsi de suite.** Chacun de ces nombres est plus grand que 3, donc il n’y a pas qu’une seule réponse. 3 lui-même ne marche pas : 3 n’est pas **plus grand que** 3. Une phrase comme celle-ci a un nom — il est sur la diapo suivante.',
    },
  },

  // 6 ─ Key word: inequality ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Inequality',
    titleVn: 'Bất đẳng thức',
    titleFr: 'Inégalité',
    ratio: 40,
    inlineSvg: DIAGRAMS.EQ_VS_INEQ,
    content: 'More than 3 cats: $c > 3$\n\nAn equation pins its letter to one number. This does not.',
    contentVn: 'Nhiều hơn 3 con mèo: $c > 3$\n\nPhương trình buộc chữ cái vào đúng một số. Còn cái này thì không.',
    contentFr: 'Plus de 3 chats : $c > 3$\n\nUne équation fixe sa lettre à un seul nombre. Celle-ci, non.',
    notes: [
      {
        tone: 'write',
        text: '**Inequality:** uses $<$ or $>$ to compare.\nIt can have **many** answers.\n$c > 3$: $c$ could be 4, 5, 6, …',
        textVn: '**Bất đẳng thức (inequality):** dùng $<$ hoặc $>$ để so sánh.\nNó có thể có **nhiều** đáp án.\n$c > 3$: $c$ có thể là 4, 5, 6, …',
        textFr: '**Inégalité (inequality) :** utilise $<$ ou $>$ pour comparer.\nElle peut avoir **plusieurs** réponses.\n$c > 3$ : $c$ peut valoir 4, 5, 6, …',
      },
    ],
  },

  // 7 ─ Key word: integer, Unit 1's word (CHECK 1) ──────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word · from Unit 1',
    eyebrowVn: 'Từ khóa · từ Chương 1',
    eyebrowFr: 'Mot clé · de l’unité 1',
    title: 'Integer',
    titleVn: 'Số nguyên',
    titleFr: 'Nombre entier',
    ratio: 40,
    inlineSvg: DIAGRAMS.INTEGERS,
    content: 'Can Mr Bowen have **3.5** cats?\n\nNo. Cats are counted in whole numbers.',
    contentVn: 'Thầy Bowen có thể có **3.5** con mèo không?\n\nKhông. Mèo thì đếm bằng số nguyên.',
    contentFr: 'M. Bowen peut-il avoir **3.5** chats ?\n\nNon. Les chats se comptent en nombres entiers.',
    notes: [
      {
        tone: 'write',
        text: '**Integer:** a whole number. It can be negative, zero or positive.\n−4, 0 and 7 are integers. 2.5 is not.',
        textVn: '**Số nguyên (integer):** số không có phần thập phân. Nó có thể âm, bằng 0 hoặc dương.\n−4, 0 và 7 là số nguyên. 2.5 thì không.',
        textFr: '**Nombre entier (integer) :** un nombre sans partie décimale. Il peut être négatif, nul ou positif.\n−4, 0 et 7 sont des entiers. 2.5 n’en est pas un.',
      },
    ],
    check: {
      id: 'chk_integer',
      q: '$c > 3$, and $c$ is an **integer**. Which of these could $c$ be?',
      qVn: '$c > 3$, và $c$ là một **số nguyên**. $c$ có thể là số nào sau đây?',
      qFr: '$c > 3$, et $c$ est un **nombre entier**. Lequel de ces nombres $c$ peut-il être ?',
      options: [
        { val: 'A', text: '$3$', textVn: '$3$', textFr: '$3$' },
        { val: 'B', text: '$3.5$', textVn: '$3.5$', textFr: '$3.5$' },
        { val: 'C', text: '$2$', textVn: '$2$', textFr: '$2$' },
        { val: 'D', text: '$12$', textVn: '$12$', textFr: '$12$' },
      ],
      correct: 'D',
      expEn: '$12$ is an integer, and $12$ is greater than $3$. $3$ is not greater than $3$ — it is equal to it. $3.5$ is greater than $3$, but it is not an integer. $2$ is an integer, but it is less than $3$: that reads the sign backwards.',
      expVn: '$12$ là số nguyên, và $12$ lớn hơn $3$. $3$ không lớn hơn $3$ — nó bằng $3$. $3.5$ lớn hơn $3$, nhưng không phải số nguyên. $2$ là số nguyên, nhưng nhỏ hơn $3$: đó là đọc ngược dấu.',
      expFr: '$12$ est un nombre entier, et $12$ est plus grand que $3$. $3$ n’est pas plus grand que $3$ — il lui est égal. $3.5$ est plus grand que $3$, mais ce n’est pas un nombre entier. $2$ est un nombre entier, mais il est plus petit que $3$ : c’est lire le signe à l’envers.',
    },
  },

  // 8 ─ Sentence to symbol (CHECK 2) ────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Write It',
    titleVn: 'Viết ra',
    titleFr: 'Écris-la',
    content: 'Write each sentence as an inequality.\n\n**a** $y$ is less than 10\n**b** $m$ is greater than −4\n**c** $t$ is below 0\n\nChoose **b** below. Work out the other two, then check them.',
    contentVn: 'Viết mỗi câu thành một bất đẳng thức.\n\n**a** $y$ is less than 10\n**b** $m$ is greater than −4\n**c** $t$ is below 0\n\nChọn câu **b** ở bên dưới. Làm hai câu còn lại, rồi kiểm tra.',
    contentFr: 'Écris chaque phrase sous forme d’inégalité.\n\n**a** $y$ is less than 10\n**b** $m$ is greater than −4\n**c** $t$ is below 0\n\nChoisis **b** ci-dessous. Trouve les deux autres, puis vérifie-les.',
    reveal: {
      label: 'Check a and c',
      labelVn: 'Kiểm tra a và c',
      labelFr: 'Vérifie a et c',
      answer: '**a** $y < 10$\n**c** $t < 0$ — **below** means less than',
      answerVn: '**a** $y < 10$\n**c** $t < 0$ — **below** (dưới) nghĩa là nhỏ hơn',
      answerFr: '**a** $y < 10$\n**c** $t < 0$ — **en dessous de** (below) veut dire plus petit que',
    },
    check: {
      id: 'chk_write',
      q: '**b** Which inequality says "$m$ is greater than −4"?',
      qVn: '**b** Bất đẳng thức nào ghi đúng câu "$m$ is greater than −4"?',
      qFr: '**b** Quelle inégalité dit « $m$ is greater than −4 » ?',
      options: [
        { val: 'A', text: '$m > -4$', textVn: '$m > -4$', textFr: '$m > -4$' },
        { val: 'B', text: '$m < -4$', textVn: '$m < -4$', textFr: '$m < -4$' },
        { val: 'C', text: '$-4 > m$', textVn: '$-4 > m$', textFr: '$-4 > m$' },
        { val: 'D', text: '$m > 4$', textVn: '$m > 4$', textFr: '$m > 4$' },
      ],
      correct: 'A',
      expEn: 'Write it in the order you read it: $m$, then the sign for "is greater than", then $-4$. That is $m > -4$. $m < -4$ reads the sign backwards. $-4 > m$ puts the number first but keeps the same sign, so it says "−4 is greater than $m$" — the opposite. $m > 4$ has lost the minus sign.',
      expVn: 'Viết theo đúng thứ tự em đọc: $m$, rồi dấu của "is greater than", rồi $-4$. Đó là $m > -4$. $m < -4$ là đọc ngược dấu. $-4 > m$ đưa con số lên trước nhưng giữ nguyên dấu, nên nó nói "−4 lớn hơn $m$" — nghĩa ngược lại. $m > 4$ là bỏ mất dấu trừ.',
      expFr: 'Écris-la dans l’ordre où tu la lis : $m$, puis le signe de « is greater than », puis $-4$. Cela donne $m > -4$. $m < -4$ lit le signe à l’envers. $-4 > m$ met le nombre en premier mais garde le même signe, donc il dit « −4 est plus grand que $m$ » — le contraire. $m > 4$ a perdu le signe moins.',
    },
  },

  // 9 ─ Symbol to sentence, out loud (CHECK 3) ──────────────────────────────
  // The three inequalities are in `example`, which the narration skips: read
  // from `content`, the audio would say "k is less than −1" — the check's answer.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'MessageSquare',
    eyebrow: 'Out loud',
    eyebrowVn: 'Nói to',
    eyebrowFr: 'À voix haute',
    title: 'Say It',
    titleVn: 'Nói ra',
    titleFr: 'Dis-le',
    ratio: 50,
    content: 'Say each one in English, **out loud**. Read from left to right, and say every word.\n\nChoose **b** below. Say **a** and **c**, then check them.',
    contentVn: 'Nói từng câu bằng tiếng Anh, **thật to**. Đọc từ trái sang phải, và nói đủ từng từ.\n\nChọn câu **b** ở bên dưới. Nói câu **a** và **c**, rồi kiểm tra.',
    contentFr: 'Dis chacune en anglais, **à voix haute**. Lis de gauche à droite, et dis chaque mot.\n\nChoisis **b** ci-dessous. Dis **a** et **c**, puis vérifie-les.',
    reveal: {
      label: 'Check a and c',
      labelVn: 'Kiểm tra a và c',
      labelFr: 'Vérifie a et c',
      answer: '**a** "n **is greater than** 7"\n**c** "w **is greater than** −10"',
      answerVn: '**a** "n **is greater than** 7" (n lớn hơn 7)\n**c** "w **is greater than** −10" (w lớn hơn −10)',
      answerFr: '**a** « n **is greater than** 7 » (n est plus grand que 7)\n**c** « w **is greater than** −10 » (w est plus grand que −10)',
    },
    exampleLabel: 'Say these',
    exampleLabelVn: 'Hãy nói',
    exampleLabelFr: 'Dis-les',
    example: '**a** $n > 7$\n\n**b** $k < -1$\n\n**c** $w > -10$',
    exampleVn: '**a** $n > 7$\n\n**b** $k < -1$\n\n**c** $w > -10$',
    exampleFr: '**a** $n > 7$\n\n**b** $k < -1$\n\n**c** $w > -10$',
    check: {
      id: 'chk_say',
      q: '**b** How do you say $k < -1$ in English?',
      qVn: '**b** Nói $k < -1$ bằng tiếng Anh như thế nào?',
      qFr: '**b** Comment dis-tu $k < -1$ en anglais ?',
      options: [
        { val: 'A', text: '"k is greater than −1"', textVn: '"k is greater than −1"', textFr: '"k is greater than −1"' },
        { val: 'B', text: '"k is less than −1"', textVn: '"k is less than −1"', textFr: '"k is less than −1"' },
        { val: 'C', text: '"−1 is less than k"', textVn: '"−1 is less than k"', textFr: '"−1 is less than k"' },
        { val: 'D', text: '"k is less −1"', textVn: '"k is less −1"', textFr: '"k is less −1"' },
      ],
      correct: 'B',
      expEn: 'Read left to right: $k$, then **is less than**, then −1. "k is greater than −1" reads the sign backwards. "−1 is less than k" reads from right to left, and that says something different. "k is less −1" leaves out **than**: the phrase is always **is less than**.',
      expVn: 'Đọc từ trái sang phải: $k$, rồi **is less than**, rồi −1. "k is greater than −1" là đọc ngược dấu. "−1 is less than k" là đọc từ phải sang trái, và câu đó mang nghĩa khác. "k is less −1" thiếu từ **than**: cụm từ luôn là **is less than** (nhỏ hơn).',
      expFr: 'Lis de gauche à droite : $k$, puis **is less than**, puis −1. « k is greater than −1 » lit le signe à l’envers. « −1 is less than k » se lit de droite à gauche, et cela dit autre chose. « k is less −1 » oublie **than** : l’expression est toujours **is less than** (est plus petit que).',
    },
  },

  // ── ON A NUMBER LINE ──────────────────────────────────────────────────────
  // 10 ─ The book's tip: the open circle, then the arrow ────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The book’s tip',
    eyebrowVn: 'Mẹo trong sách',
    eyebrowFr: 'L’astuce du livre',
    title: 'On a Number Line',
    titleVn: 'Trên trục số',
    titleFr: 'Sur une droite graduée',
    ratio: 40,
    inlineSvg: DIAGRAMS.NUMBER_LINE,
    content: 'Draw the **circle** first. Then the **arrow**.\n\nThe circle sits on the number in the inequality.',
    contentVn: 'Vẽ **vòng tròn** trước. Rồi đến **mũi tên**.\n\nVòng tròn nằm ngay trên con số trong bất đẳng thức.',
    contentFr: 'Dessine d’abord le **cercle**. Puis la **flèche**.\n\nLe cercle se place sur le nombre de l’inégalité.',
    notes: [
      {
        tone: 'write',
        text: 'An **open circle** means the number is **not** included.\nThe **arrow** shows all the numbers that work.',
        textVn: '**Vòng tròn rỗng** (open circle) nghĩa là số đó **không** được tính.\n**Mũi tên** (arrow) chỉ tất cả các số thỏa mãn.',
        textFr: 'Un **cercle vide** (open circle) veut dire que le nombre n’est **pas** inclus.\nLa **flèche** (arrow) montre tous les nombres qui marchent.',
      },
    ],
  },

  // 11 ─ Practice: read the lines (INEQ read) ───────────────────────────────
  // The classroom's fourth line, x < −1, is the activity; READ_LINES keeps the
  // other three for the reveal.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Read the Line',
    titleVn: 'Đọc trục số',
    titleFr: 'Lis la droite',
    ratio: 40,
    inlineSvg: DIAGRAMS.READ_LINES,
    content: 'Each line shows an inequality. Write it, using the letter **x**.\n\nDo line **d** below. Work out **a**, **b** and **c**, then check them.',
    contentVn: 'Mỗi trục số biểu diễn một bất đẳng thức. Hãy viết nó ra, dùng chữ **x**.\n\nLàm trục số **d** ở bên dưới. Làm **a**, **b** và **c**, rồi kiểm tra.',
    contentFr: 'Chaque droite montre une inégalité. Écris-la avec la lettre **x**.\n\nFais la droite **d** ci-dessous. Trouve **a**, **b** et **c**, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and c',
      labelVn: 'Kiểm tra a, b và c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $x > 1$\n**b** $x < 4$\n**c** $x > -3$',
      answerVn: '**a** $x > 1$\n**b** $x < 4$\n**c** $x > -3$',
      answerFr: '**a** $x > 1$\n**b** $x < 4$\n**c** $x > -3$',
    },
    activity: {
      id: 'act_read',
      type: 'ineq',
      ask: 'read',
      ineq: 'x < −1',
      prompt: '**d** Which inequality does this line show?',
      promptVn: '**d** Trục số này biểu diễn bất đẳng thức nào?',
      promptFr: '**d** Quelle inégalité cette droite montre-t-elle ?',
      explain: 'The open circle is on −1, and the arrow points **left**, at the smaller numbers: $x < -1$. The number in the inequality is the one under the circle — not −2, the first integer the arrow reaches.',
      explainVn: 'Vòng tròn rỗng nằm ở −1, và mũi tên chỉ sang **trái**, về phía các số nhỏ hơn: $x < -1$. Con số trong bất đẳng thức là số nằm dưới vòng tròn — không phải −2, số nguyên đầu tiên mà mũi tên đi tới.',
      explainFr: 'Le cercle vide est sur −1, et la flèche pointe vers la **gauche**, vers les nombres plus petits : $x < -1$. Le nombre de l’inégalité est celui qui est sous le cercle — pas −2, le premier entier que la flèche atteint.',
    },
  },

  // ── MISTAKE 1: THE CIRCLE'S OWN NUMBER ────────────────────────────────────
  // 12 ─ The vote: 3 or 4? (PREDICT) ────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Which Is Right?',
    titleVn: 'Đáp án nào đúng?',
    titleFr: 'Laquelle est juste ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: '$x > 3$. What is the **smallest integer** $x$ could be?',
    textVn: '$x > 3$. **Số nguyên nhỏ nhất** mà $x$ có thể là số nào?',
    textFr: '$x > 3$. Quel est le **plus petit entier** possible pour $x$ ?',
    sub: 'One student says 3. Another says 4. The next slide settles it.',
    subVn: 'Một bạn nói 3. Một bạn khác nói 4. Slide sau sẽ cho em biết.',
    subFr: 'Un élève dit 3. Un autre dit 4. La diapo suivante tranche.',
    activity: {
      id: 'act_vote_circle',
      type: 'predict',
      prompt: 'Who is right?',
      promptVn: 'Bạn nào đúng?',
      promptFr: 'Qui a raison ?',
      options: [
        { val: 'three', name: '$3$', nameVn: '$3$', nameFr: '$3$' },
        { val: 'four', name: '$4$', nameVn: '$4$', nameFr: '$4$' },
      ],
      correct: 'four',
      explain: '**4.** $x$ must be greater than 3, and 3 is not greater than 3 — it is equal to it. So 3 is out, and the first integer after it is 4. The next slide shows this on a number line.',
      explainVn: '**4.** $x$ phải lớn hơn 3, mà 3 không lớn hơn 3 — nó bằng 3. Vậy 3 bị loại, và số nguyên đầu tiên sau nó là 4. Slide sau biểu diễn điều này trên trục số.',
      explainFr: '**4.** $x$ doit être plus grand que 3, et 3 n’est pas plus grand que 3 — il lui est égal. Donc 3 est exclu, et le premier entier après lui est 4. La diapo suivante le montre sur une droite graduée.',
    },
  },

  // 13 ─ The open circle settles it (HOTSPOT) ───────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Not included',
    eyebrowVn: 'Không được tính',
    eyebrowFr: 'Pas inclus',
    title: 'Is 3 Greater Than 3?',
    titleVn: '3 có lớn hơn 3 không?',
    titleFr: '3 est-il plus grand que 3 ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.SMALLEST,
    content: '**4 is right.** 3 is the open circle, and the open circle is not included.',
    contentVn: '**4 mới đúng.** 3 là vòng tròn rỗng, mà vòng tròn rỗng thì không được tính.',
    contentFr: '**4 est juste.** 3 est le cercle vide, et le cercle vide n’est pas inclus.',
    notes: [
      {
        tone: 'write',
        text: '$x > 3$: 3 does **not** work.\nThe **smallest integer** $x$ could be is 4.',
        textVn: '$x > 3$: 3 **không** thỏa mãn.\n**Số nguyên nhỏ nhất** mà $x$ có thể là: 4.',
        textFr: '$x > 3$ : 3 ne marche **pas**.\nLe **plus petit entier** possible pour $x$ est 4.',
      },
    ],
    activity: {
      id: 'act_tap_smallest',
      type: 'hotspot',
      prompt: 'This line shows $m > 9$. Tap the **smallest integer** $m$ could be.',
      promptVn: 'Trục số này biểu diễn $m > 9$. Hãy chạm vào **số nguyên nhỏ nhất** mà $m$ có thể là.',
      promptFr: 'Cette droite montre $m > 9$. Touche le **plus petit entier** possible pour $m$.',
      svg: DIAGRAMS.HOT_LINE,
      viewBox: '0 0 840 250',
      targets: [
        { id: 't6', x: 90, y: 170, r: 54, name: '6', nameVn: '6', nameFr: '6' },
        { id: 't7', x: 200, y: 170, r: 54, name: '7', nameVn: '7', nameFr: '7' },
        { id: 't8', x: 310, y: 170, r: 54, name: '8', nameVn: '8', nameFr: '8' },
        { id: 't9', x: 420, y: 170, r: 54, name: '9, the open circle', nameVn: '9, vòng tròn rỗng', nameFr: '9, le cercle vide' },
        { id: 't10', x: 530, y: 170, r: 54, name: '10', nameVn: '10', nameFr: '10' },
        { id: 't11', x: 640, y: 170, r: 54, name: '11', nameVn: '11', nameFr: '11' },
        { id: 't12', x: 750, y: 170, r: 54, name: '12', nameVn: '12', nameFr: '12' },
      ],
      correct: 't10',
      explain: '**10.** The open circle is on 9, so 9 is not included: 9 is not greater than 9. The first integer the arrow reaches is 10. 11 and 12 work too, but they are not the smallest.',
      explainVn: '**10.** Vòng tròn rỗng nằm ở 9, nên không tính 9: 9 không lớn hơn 9. Số nguyên đầu tiên mà mũi tên đi tới là 10. 11 và 12 cũng thỏa mãn, nhưng không phải nhỏ nhất.',
      explainFr: '**10.** Le cercle vide est sur 9, donc 9 n’est pas inclus : 9 n’est pas plus grand que 9. Le premier entier que la flèche atteint est 10. 11 et 12 marchent aussi, mais ce ne sont pas les plus petits.',
    },
  },

  // 14 ─ The number line, one part per press ────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each step before you press',
    eyebrowVn: 'Nói từng bước trước khi bấm',
    eyebrowFr: 'Dis chaque étape avant d’appuyer',
    title: 'Show It',
    titleVn: 'Biểu diễn nó',
    titleFr: 'Montre-la',
    widget: ShowOne,
    caption: 'Four inequalities. Before each press, say what comes next: the **circle**, the **arrow**, then the **integers**.',
    captionVn: 'Bốn bất đẳng thức. Trước mỗi lần bấm, hãy nói điều sẽ đến tiếp theo: **vòng tròn**, **mũi tên**, rồi **các số nguyên**.',
    captionFr: 'Quatre inégalités. Avant chaque clic, dis ce qui vient ensuite : le **cercle**, la **flèche**, puis les **entiers**.',
  },

  // 15 ─ Practice: draw the lines (INEQ draw) ───────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Draw the Line',
    titleVn: 'Vẽ trục số',
    titleFr: 'Dessine la droite',
    content: 'Show each one on a number line: the open circle first, then the arrow.\n\n**a** $x > 6$\n**b** $x < 2$\n**c** $y > 0$\n\nDraw **a** below. Picture the other two, then check them.',
    contentVn: 'Biểu diễn mỗi bất đẳng thức trên trục số: vòng tròn rỗng trước, rồi đến mũi tên.\n\n**a** $x > 6$\n**b** $x < 2$\n**c** $y > 0$\n\nVẽ câu **a** ở bên dưới. Hình dung hai câu còn lại, rồi kiểm tra.',
    contentFr: 'Représente chacune sur une droite graduée : d’abord le cercle vide, puis la flèche.\n\n**a** $x > 6$\n**b** $x < 2$\n**c** $y > 0$\n\nDessine **a** ci-dessous. Imagine les deux autres, puis vérifie-les.',
    reveal: {
      label: 'Check b and c',
      labelVn: 'Kiểm tra b và c',
      labelFr: 'Vérifie b et c',
      answer: '**b** open circle on 2, arrow to the left\n**c** open circle on 0, arrow to the right',
      answerVn: '**b** vòng tròn rỗng ở 2, mũi tên sang trái\n**c** vòng tròn rỗng ở 0, mũi tên sang phải',
      answerFr: '**b** cercle vide en 2, flèche vers la gauche\n**c** cercle vide en 0, flèche vers la droite',
    },
    activity: {
      id: 'act_draw',
      type: 'ineq',
      ask: 'draw',
      ineq: 'x > 6',
      prompt: '**a** Show $x > 6$ on the line.',
      promptVn: '**a** Biểu diễn $x > 6$ trên trục số.',
      promptFr: '**a** Représente $x > 6$ sur la droite.',
      explain: 'The circle goes on the number in the inequality, 6 — not on 7, the first integer that works. Greater than means further **right**, so the arrow points right.',
      explainVn: 'Vòng tròn đặt vào con số trong bất đẳng thức, là 6 — không phải 7, số nguyên đầu tiên thỏa mãn. Lớn hơn nghĩa là nằm xa hơn về bên **phải**, nên mũi tên chỉ sang phải.',
      explainFr: 'Le cercle se place sur le nombre de l’inégalité, 6 — pas sur 7, le premier entier qui marche. Plus grand que veut dire plus à **droite**, donc la flèche pointe vers la droite.',
    },
  },

  // ── MISTAKE 2: THE WRONG WAY WITH NEGATIVES ───────────────────────────────
  // 16 ─ The vote: which way is less? (PREDICT) ─────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Two Students Disagree',
    titleVn: 'Hai bạn không đồng ý',
    titleFr: 'Deux élèves en désaccord',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: '$t < -2$. Which integers could $t$ be?',
    textVn: '$t < -2$. $t$ có thể là những số nguyên nào?',
    textFr: '$t < -2$. Quels entiers sont possibles pour $t$ ?',
    sub: 'One student says −1, 0, 1, … Another says −3, −4, −5, …',
    subVn: 'Một bạn nói −1, 0, 1, … Một bạn khác nói −3, −4, −5, …',
    subFr: 'Un élève dit −1, 0, 1, … Un autre dit −3, −4, −5, …',
    activity: {
      id: 'act_vote_left',
      type: 'predict',
      prompt: 'Who is right?',
      promptVn: 'Bạn nào đúng?',
      promptFr: 'Qui a raison ?',
      options: [
        { val: 'up', name: '−1, 0, 1, …', nameVn: '−1, 0, 1, …', nameFr: '−1, 0, 1, …' },
        { val: 'down', name: '−3, −4, −5, …', nameVn: '−3, −4, −5, …', nameFr: '−3, −4, −5, …' },
      ],
      correct: 'down',
      explain: '**−3, −4, −5, …** Less than means further **left** on the number line, even below zero. −1 is to the right of −2, so −1 is greater than −2. The student who said −1, 0, 1 was thinking "1 is less than 2" and forgot the minus signs. The next two slides show why.',
      explainVn: '**−3, −4, −5, …** Nhỏ hơn nghĩa là nằm xa hơn về bên **trái** trên trục số, kể cả khi dưới 0. −1 nằm bên phải −2, nên −1 lớn hơn −2. Bạn nói −1, 0, 1 đã nghĩ "1 nhỏ hơn 2" mà quên mất dấu trừ. Hai slide sau cho thấy vì sao.',
      explainFr: '**−3, −4, −5, …** Plus petit que veut dire plus à **gauche** sur la droite graduée, même sous zéro. −1 est à droite de −2, donc −1 est plus grand que −2. L’élève qui a dit −1, 0, 1 pensait « 1 est plus petit que 2 » et a oublié les signes moins. Les deux diapos suivantes montrent pourquoi.',
    },
  },

  // 17 ─ Less than means left (CHECK 4) ─────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'ArrowLeftRight',
    eyebrow: 'Watch the negatives',
    eyebrowVn: 'Cẩn thận với số âm',
    eyebrowFr: 'Attention aux négatifs',
    title: 'Less Than Means Left',
    titleVn: 'Nhỏ hơn nghĩa là bên trái',
    titleFr: 'Plus petit veut dire à gauche',
    ratio: 40,
    inlineSvg: DIAGRAMS.LEFT_RIGHT,
    content: '**−3, −4, −5, … is right.** −1 is to the right of −2, so −1 is **greater** than −2.',
    contentVn: '**−3, −4, −5, … mới đúng.** −1 nằm bên phải −2, nên −1 **lớn hơn** −2.',
    contentFr: '**−3, −4, −5, … est juste.** −1 est à droite de −2, donc −1 est **plus grand** que −2.',
    notes: [
      {
        tone: 'write',
        text: '**Less than:** further **left** on the number line.\n**Greater than:** further **right**.\n$-5 < -2$',
        textVn: '**Nhỏ hơn (less than):** nằm xa hơn về bên **trái** trên trục số.\n**Lớn hơn (greater than):** nằm xa hơn về bên **phải**.\n$-5 < -2$',
        textFr: '**Plus petit que (less than) :** plus à **gauche** sur la droite graduée.\n**Plus grand que (greater than) :** plus à **droite**.\n$-5 < -2$',
      },
    ],
    check: {
      id: 'chk_left',
      q: '$n < -6$. Which list shows integers $n$ could be?',
      qVn: '$n < -6$. Dãy nào gồm các số nguyên mà $n$ có thể là?',
      qFr: '$n < -6$. Quelle liste montre des entiers possibles pour $n$ ?',
      options: [
        { val: 'A', text: '−5, −4, −3', textVn: '−5, −4, −3', textFr: '−5, −4, −3' },
        { val: 'B', text: '−6, −7, −8', textVn: '−6, −7, −8', textFr: '−6, −7, −8' },
        { val: 'C', text: '−7, −8, −9', textVn: '−7, −8, −9', textFr: '−7, −8, −9' },
        { val: 'D', text: '5, 4, 3', textVn: '5, 4, 3', textFr: '5, 4, 3' },
      ],
      correct: 'C',
      expEn: 'Less than −6 means to the **left** of −6: −7, −8, −9 and so on. −5, −4, −3 are to the right of −6, so they are greater — that list went the wrong way. −6, −7, −8 starts with the circle’s own number, and −6 is not less than −6. 5, 4, 3 has lost the minus signs.',
      expVn: 'Nhỏ hơn −6 nghĩa là nằm bên **trái** −6: −7, −8, −9, và cứ thế. −5, −4, −3 nằm bên phải −6, nên chúng lớn hơn — dãy đó đi sai hướng. −6, −7, −8 bắt đầu bằng chính con số ở vòng tròn rỗng, mà −6 không nhỏ hơn −6. 5, 4, 3 là bỏ mất dấu trừ.',
      expFr: 'Plus petit que −6 veut dire à **gauche** de −6 : −7, −8, −9 et ainsi de suite. −5, −4, −3 sont à droite de −6, donc ils sont plus grands — cette liste est partie du mauvais côté. −6, −7, −8 commence par le nombre du cercle lui-même, et −6 n’est pas plus petit que −6. 5, 4, 3 a perdu les signes moins.',
    },
  },

  // 18 ─ The real thing: a thermometer (CHECK 5) ────────────────────────────
  // The classroom laid the photo on its side inside an SVG; here it is the
  // slide's image, upright, and the text does the turning.
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Unit 1 · colder is less',
    eyebrowVn: 'Chương 1 · lạnh hơn là nhỏ hơn',
    eyebrowFr: 'Unité 1 · plus froid, c’est plus petit',
    title: 'A Thermometer Is a Number Line',
    titleVn: 'Nhiệt kế là một trục số',
    titleFr: 'Un thermomètre est une droite graduée',
    ratio: 60,
    image: img('thermometer.jpg'),
    content: 'A thermometer is a number line standing on its end. **Lower** is **colder**, and colder is **less**.\n\nTurn it on its side, and down becomes **left**.\n\nThis old thermometer prints no minus signs: the 10 under the 0 is −10 °C.',
    contentVn: 'Nhiệt kế là một trục số dựng đứng. Càng **thấp** thì càng **lạnh**, mà lạnh hơn là **nhỏ hơn**.\n\nĐặt nó nằm ngang, thì phía dưới thành bên **trái**.\n\nChiếc nhiệt kế cũ này không in dấu trừ: số 10 nằm dưới số 0 là −10 °C. (colder = lạnh hơn)',
    contentFr: 'Un thermomètre est une droite graduée debout. Plus **bas**, c’est plus **froid**, et plus froid, c’est plus **petit**.\n\nCouche-le sur le côté : le bas devient la **gauche**.\n\nCe vieux thermomètre n’affiche pas de signes moins : le 10 sous le 0, c’est −10 °C. (colder = plus froid)',
    check: {
      id: 'chk_thermometer',
      q: '−9 °C is colder than −4 °C. Which inequality says so?',
      qVn: '−9 °C lạnh hơn −4 °C. Bất đẳng thức nào nói đúng điều đó?',
      qFr: '−9 °C est plus froid que −4 °C. Quelle inégalité le dit ?',
      options: [
        { val: 'A', text: '$-9 > -4$', textVn: '$-9 > -4$', textFr: '$-9 > -4$' },
        { val: 'B', text: '$-9 < -4$', textVn: '$-9 < -4$', textFr: '$-9 < -4$' },
        { val: 'C', text: '$9 < 4$', textVn: '$9 < 4$', textFr: '$9 < 4$' },
        { val: 'D', text: '$-4 < -9$', textVn: '$-4 < -9$', textFr: '$-4 < -9$' },
      ],
      correct: 'B',
      expEn: 'Colder is lower on the thermometer, and lower is less: $-9 < -4$. $-9 > -4$ looks at the 9 and the 4 and ignores the minus signs. $9 < 4$ has dropped the minus signs, and it is not even true. $-4 < -9$ says −4 is the colder one, but −4 °C is the warmer one.',
      expVn: 'Lạnh hơn thì nằm thấp hơn trên nhiệt kế, mà thấp hơn là nhỏ hơn: $-9 < -4$. $-9 > -4$ là chỉ nhìn số 9 và số 4 mà bỏ qua dấu trừ. $9 < 4$ là bỏ mất dấu trừ, và nó còn không đúng. $-4 < -9$ nói rằng −4 lạnh hơn, nhưng −4 °C mới là nhiệt độ ấm hơn.',
      expFr: 'Plus froid, c’est plus bas sur le thermomètre, et plus bas, c’est plus petit : $-9 < -4$. $-9 > -4$ regarde le 9 et le 4 et oublie les signes moins. $9 < 4$ a perdu les signes moins, et ce n’est même pas vrai. $-4 < -9$ dit que −4 est le plus froid, mais −4 °C est le plus chaud.',
    },
  },

  // 19 ─ The room game, Could It Be?, as a sort (SORT) ──────────────────────
  // Moved after the negatives (the classroom played it before them), so its
  // cards can carry both mistakes without spoiling the vote on slide 16.
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'HelpCircle',
    eyebrow: 'An inequality and a number',
    eyebrowVn: 'Một bất đẳng thức và một con số',
    eyebrowFr: 'Une inégalité et un nombre',
    title: 'Could It Be?',
    titleVn: 'Có thể không?',
    titleFr: 'Est-ce possible ?',
    content: '**Could** the letter be that number?\n\nWatch for two things: the circle’s own number, and which way is less below zero.',
    contentVn: 'Chữ cái **có thể** bằng số đó không?\n\nChú ý hai điều: chính con số ở vòng tròn rỗng, và phía nào là nhỏ hơn khi dưới 0.',
    contentFr: 'La lettre **peut-elle** être ce nombre ?\n\nFais attention à deux choses : le nombre du cercle lui-même, et le côté du plus petit sous zéro.',
    activity: {
      id: 'act_could',
      type: 'sort',
      prompt: 'Sort the six cards.',
      promptVn: 'Phân loại sáu thẻ.',
      promptFr: 'Trie les six cartes.',
      bins: [
        { id: 'yes', name: '**Could be**', nameVn: '**Có thể**', nameFr: '**Possible**' },
        { id: 'no', name: '**Could not be**', nameVn: '**Không thể**', nameFr: '**Impossible**' },
      ],
      cards: [
        { id: 'c1', name: '$x > 4$: could $x$ be $4$?', nameVn: '$x > 4$: $x$ có thể là $4$ không?', nameFr: '$x > 4$ : $x$ peut-il valoir $4$ ?', bin: 'no' },
        { id: 'c2', name: '$x < 10$: could $x$ be $9$?', nameVn: '$x < 10$: $x$ có thể là $9$ không?', nameFr: '$x < 10$ : $x$ peut-il valoir $9$ ?', bin: 'yes' },
        { id: 'c3', name: '$y > -2$: could $y$ be $-3$?', nameVn: '$y > -2$: $y$ có thể là $-3$ không?', nameFr: '$y > -2$ : $y$ peut-il valoir $-3$ ?', bin: 'no' },
        { id: 'c4', name: '$t < -5$: could $t$ be $-6$?', nameVn: '$t < -5$: $t$ có thể là $-6$ không?', nameFr: '$t < -5$ : $t$ peut-il valoir $-6$ ?', bin: 'yes' },
        { id: 'c5', name: '$m < 0$: could $m$ be $0$?', nameVn: '$m < 0$: $m$ có thể là $0$ không?', nameFr: '$m < 0$ : $m$ peut-il valoir $0$ ?', bin: 'no' },
        { id: 'c6', name: '$k < 1$: could $k$ be $-100$?', nameVn: '$k < 1$: $k$ có thể là $-100$ không?', nameFr: '$k < 1$ : $k$ peut-il valoir $-100$ ?', bin: 'yes' },
      ],
      explain: '**Could not:** 4 is not greater than 4, and 0 is not less than 0 — the circle’s own number never works. −3 is to the left of −2, so it is less, not greater. **Could:** 9 is less than 10; −6 is to the left of −5; and −100 is a long way to the left of 1.',
      explainVn: '**Không thể:** 4 không lớn hơn 4, và 0 không nhỏ hơn 0 — chính con số ở vòng tròn rỗng thì không bao giờ thỏa mãn. −3 nằm bên trái −2, nên nó nhỏ hơn chứ không lớn hơn. **Có thể:** 9 nhỏ hơn 10; −6 nằm bên trái −5; và −100 nằm rất xa về bên trái của 1.',
      explainFr: '**Impossible :** 4 n’est pas plus grand que 4, et 0 n’est pas plus petit que 0 — le nombre du cercle lui-même ne marche jamais. −3 est à gauche de −2, donc il est plus petit, pas plus grand. **Possible :** 9 est plus petit que 10 ; −6 est à gauche de −5 ; et −100 est très loin à gauche de 1.',
    },
  },

  // 20 ─ The number line again, with negatives and one decimal ──────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Say each step before you press',
    eyebrowVn: 'Nói từng bước trước khi bấm',
    eyebrowFr: 'Dis chaque étape avant d’appuyer',
    title: 'Show It With Negatives',
    titleVn: 'Biểu diễn với số âm',
    titleFr: 'Montre-la avec des négatifs',
    widget: ShowTwo,
    caption: 'Less than: **left**. Greater than: **right**. Even below zero. In the last one, the circle sits between two numbers.',
    captionVn: 'Nhỏ hơn: bên **trái**. Lớn hơn: bên **phải**. Kể cả khi dưới 0. Ở câu cuối, vòng tròn nằm giữa hai số.',
    captionFr: 'Plus petit que : **gauche**. Plus grand que : **droite**. Même sous zéro. Dans la dernière, le cercle se place entre deux nombres.',
  },

  // 21 ─ Practice: smallest or largest (INEQ integer) ───────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Smallest or Largest?',
    titleVn: 'Nhỏ nhất hay lớn nhất?',
    titleFr: 'Le plus petit ou le plus grand ?',
    content: 'For **greater than**, find the **smallest** integer. For **less than**, find the **largest**.\n\n**a** $p > 6$\n**b** $q < -7$\n**c** $r > -1$\n**d** $s < 0$\n**e** $w > 4.5$\n\nDo **b** below. Work out the other four, then check them.',
    contentVn: 'Với **lớn hơn** ($>$), tìm số nguyên **nhỏ nhất**. Với **nhỏ hơn** ($<$), tìm số nguyên **lớn nhất**.\n\n**a** $p > 6$\n**b** $q < -7$\n**c** $r > -1$\n**d** $s < 0$\n**e** $w > 4.5$\n\nLàm câu **b** ở bên dưới. Làm bốn câu còn lại, rồi kiểm tra.',
    contentFr: 'Pour **plus grand que**, trouve le **plus petit** entier. Pour **plus petit que**, trouve le **plus grand**.\n\n**a** $p > 6$\n**b** $q < -7$\n**c** $r > -1$\n**d** $s < 0$\n**e** $w > 4.5$\n\nFais **b** ci-dessous. Trouve les quatre autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, c, d and e',
      labelVn: 'Kiểm tra a, c, d và e',
      labelFr: 'Vérifie a, c, d et e',
      answer: '**a** 7\n**c** 0\n**d** −1\n**e** 5 — the circle sits between 4 and 5',
      answerVn: '**a** 7\n**c** 0\n**d** −1\n**e** 5 — vòng tròn nằm giữa 4 và 5',
      answerFr: '**a** 7\n**c** 0\n**d** −1\n**e** 5 — le cercle se place entre 4 et 5',
    },
    activity: {
      id: 'act_integer',
      type: 'ineq',
      ask: 'integer',
      ineq: 'q < −7',
      prompt: '**b** $q < -7$. Type the largest integer $q$ could be.',
      promptVn: '**b** $q < -7$. Nhập số nguyên lớn nhất mà $q$ có thể là.',
      promptFr: '**b** $q < -7$. Tape le plus grand entier possible pour $q$.',
      explain: 'Less than −7 means to the **left** of −7, and the first integer on that side is −8. −7 is the open circle: −7 is not less than −7. −6 is on the wrong side — it is greater than −7.',
      explainVn: 'Nhỏ hơn −7 nghĩa là nằm bên **trái** −7, và số nguyên đầu tiên ở phía đó là −8. −7 là vòng tròn rỗng: −7 không nhỏ hơn −7. −6 nằm sai phía — nó lớn hơn −7.',
      explainFr: 'Plus petit que −7 veut dire à **gauche** de −7, et le premier entier de ce côté est −8. −7 est le cercle vide : −7 n’est pas plus petit que −7. −6 est du mauvais côté — il est plus grand que −7.',
    },
  },

  // ── FIND THE MISTAKE ──────────────────────────────────────────────────────
  // 22 ─ Mr Bowen's homework (SORT) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowVn: 'Tìm lỗi sai',
    eyebrowFr: 'Trouve les erreurs',
    title: 'Mr Bowen’s Homework',
    titleVn: 'Bài tập về nhà của thầy Bowen',
    titleFr: 'Les devoirs de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.MISTAKES,
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nEvery line is wrong.',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nDòng nào cũng sai.',
    contentFr: 'M. Bowen s’est donné **4 sur 4**.\n\nToutes les lignes sont fausses.',
    activity: {
      id: 'act_homework',
      type: 'sort',
      prompt: 'What went wrong in each line?',
      promptVn: 'Mỗi dòng đã sai ở đâu?',
      promptFr: 'Qu’est-ce qui ne va pas dans chaque ligne ?',
      bins: [
        { id: 'circle', name: 'Counted the open circle’s own number', nameVn: 'Tính cả con số ở vòng tròn rỗng', nameFr: 'A compté le nombre du cercle vide lui-même' },
        { id: 'right', name: 'Went right, but less than means left', nameVn: 'Đi sang phải, nhưng nhỏ hơn là bên trái', nameFr: 'Est allé à droite, mais plus petit que veut dire à gauche' },
        { id: 'sign', name: 'Wrote the sign backwards', nameVn: 'Viết ngược dấu', nameFr: 'A écrit le signe à l’envers' },
        { id: 'left', name: 'Went left, but greater than means right', nameVn: 'Đi sang trái, nhưng lớn hơn là bên phải', nameFr: 'Est allé à gauche, mais plus grand que veut dire à droite' },
      ],
      cards: [
        { id: 'h1', name: '**a** $x > 7$. Smallest integer: 7', nameVn: '**a** $x > 7$. Số nguyên nhỏ nhất: 7', nameFr: '**a** $x > 7$. Plus petit entier : 7', bin: 'circle' },
        { id: 'h2', name: '**b** $y < -3$. $y$ could be −2, −1, 0', nameVn: '**b** $y < -3$. $y$ có thể là −2, −1, 0', nameFr: '**b** $y < -3$. $y$ peut valoir −2, −1, 0', bin: 'right' },
        { id: 'h3', name: '**c** $k$ is less than 9: $k > 9$', nameVn: '**c** $k$ is less than 9: $k > 9$', nameFr: '**c** $k$ is less than 9: $k > 9$', bin: 'sign' },
        { id: 'h4', name: '**d** $m > -6$. Smallest integer: −7', nameVn: '**d** $m > -6$. Số nguyên nhỏ nhất: −7', nameFr: '**d** $m > -6$. Plus petit entier : −7', bin: 'left' },
      ],
      explain: '**a** 7 is not greater than 7: the smallest integer is 8. **b** Less than −3 is to the left: −4, −5, −6, … **c** "Is less than" is $<$, so $k < 9$. **d** −7 is to the left of −6, so it is less. The smallest integer greater than −6 is −5.',
      explainVn: '**a** 7 không lớn hơn 7: số nguyên nhỏ nhất là 8. **b** Nhỏ hơn −3 là ở bên trái: −4, −5, −6, … **c** "Is less than" là $<$, nên $k < 9$. **d** −7 nằm bên trái −6, nên nó nhỏ hơn. Số nguyên nhỏ nhất lớn hơn −6 là −5.',
      explainFr: '**a** 7 n’est pas plus grand que 7 : le plus petit entier est 8. **b** Plus petit que −3, c’est à gauche : −4, −5, −6, … **c** « Is less than », c’est $<$, donc $k < 9$. **d** −7 est à gauche de −6, donc il est plus petit. Le plus petit entier plus grand que −6 est −5.',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 23 ─ A sensible one (INEQ list) ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Two inequalities',
    eyebrowVn: 'Hai bất đẳng thức',
    eyebrowFr: 'Deux inégalités',
    title: 'Mr Bowen’s Class',
    titleVn: 'Lớp học của thầy Bowen',
    titleFr: 'La classe de M. Bowen',
    content: 'Mr Bowen’s class has **more than 20** students.\n\nIt has **fewer than 24** students.\n\nAs inequalities: $s > 20$ and $s < 24$.',
    contentVn: 'Lớp của thầy Bowen có **nhiều hơn 20** học sinh (more than 20).\n\nLớp có **ít hơn 24** học sinh (fewer than 24).\n\nViết thành bất đẳng thức: $s > 20$ và $s < 24$.',
    contentFr: 'La classe de M. Bowen a **plus de 20** élèves (more than 20).\n\nElle a **moins de 24** élèves (fewer than 24).\n\nEn inégalités : $s > 20$ et $s < 24$.',
    activity: {
      id: 'act_class',
      type: 'ineq',
      ask: 'list',
      ineqs: ['s > 20', 's < 24'],
      prompt: 'How many students could there be? Tap every integer that fits **both** inequalities.',
      promptVn: 'Lớp có thể có bao nhiêu học sinh? Chạm vào mọi số nguyên thỏa mãn **cả hai** bất đẳng thức.',
      promptFr: 'Combien d’élèves peut-il y avoir ? Touche chaque entier qui convient aux **deux** inégalités.',
      explain: '21, 22 or 23 students. 20 is not more than 20, and 24 is not fewer than 24: both circles are open. A number of students is an integer, so nothing else fits.',
      explainVn: '21, 22 hoặc 23 học sinh. 20 không nhiều hơn 20, và 24 không ít hơn 24: cả hai vòng tròn đều rỗng. Số học sinh là một số nguyên, nên không còn số nào khác thỏa mãn.',
      explainFr: '21, 22 ou 23 élèves. 20 n’est pas plus grand que 20, et 24 n’est pas plus petit que 24 : les deux cercles sont vides. Un nombre d’élèves est un entier, donc rien d’autre ne convient.',
    },
  },

  // 24 ─ A silly one (CHECK 6) ──────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Two inequalities first',
    eyebrowVn: 'Hai bất đẳng thức trước đã',
    eyebrowFr: 'D’abord deux inégalités',
    title: 'Mr Bowen’s Cats, Again',
    titleVn: 'Lại là những con mèo của thầy Bowen',
    titleFr: 'Encore les chats de M. Bowen',
    content: 'Mr Bowen has **fewer than 1** cat.\n\nHe has **more than −1** cats.\n\nTurn each sentence into an inequality for $c$, then decide.',
    contentVn: 'Thầy Bowen có **ít hơn 1** con mèo (fewer than 1).\n\nThầy có **nhiều hơn −1** con mèo (more than −1).\n\nĐổi mỗi câu thành một bất đẳng thức của $c$, rồi quyết định.',
    contentFr: 'M. Bowen a **moins de 1** chat (fewer than 1).\n\nIl a **plus de −1** chat (more than −1).\n\nTransforme chaque phrase en inégalité pour $c$, puis décide.',
    check: {
      id: 'chk_cats_again',
      q: 'How many cats does Mr Bowen have?',
      qVn: 'Thầy Bowen có bao nhiêu con mèo?',
      qFr: 'Combien de chats M. Bowen a-t-il ?',
      options: [
        { val: 'A', text: '$0$', textVn: '$0$', textFr: '$0$' },
        { val: 'B', text: '$1$', textVn: '$1$', textFr: '$1$' },
        { val: 'C', text: '$-1$', textVn: '$-1$', textFr: '$-1$' },
        { val: 'D', text: '$0.5$', textVn: '$0.5$', textFr: '$0.5$' },
      ],
      correct: 'A',
      expEn: '$c < 1$ and $c > -1$. The only integer between them is **0**: Mr Bowen has no cats. $1$ is not fewer than 1, and $-1$ is not more than −1 — both are open circles. $0.5$ fits both inequalities, but it is not an integer, and nobody has half a cat.',
      expVn: '$c < 1$ và $c > -1$. Số nguyên duy nhất nằm giữa chúng là **0**: thầy Bowen không có con mèo nào. $1$ không ít hơn 1, và $-1$ không nhiều hơn −1 — cả hai đều là vòng tròn rỗng. $0.5$ thỏa mãn cả hai bất đẳng thức, nhưng nó không phải số nguyên, và không ai có nửa con mèo cả.',
      expFr: '$c < 1$ et $c > -1$. Le seul entier entre les deux est **0** : M. Bowen n’a pas de chat. $1$ n’est pas plus petit que 1, et $-1$ n’est pas plus grand que −1 — ce sont deux cercles vides. $0.5$ convient aux deux inégalités, mais ce n’est pas un entier, et personne n’a un demi-chat.',
    },
  },

  // 25 ─ A sillier one (CHECK 7) ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Two inequalities first',
    eyebrowVn: 'Hai bất đẳng thức trước đã',
    eyebrowFr: 'D’abord deux inégalités',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    titleFr: 'Le nombre de M. Bowen',
    content: 'Mr Bowen thinks of an **integer**.\n\nIt is greater than 7. It is less than 8.',
    contentVn: 'Thầy Bowen nghĩ ra một **số nguyên**.\n\nNó lớn hơn 7. Nó nhỏ hơn 8.',
    contentFr: 'M. Bowen pense à un **nombre entier**.\n\nIl est plus grand que 7. Il est plus petit que 8.',
    check: {
      id: 'chk_number',
      q: 'What is Mr Bowen’s number?',
      qVn: 'Số của thầy Bowen là số nào?',
      qFr: 'Quel est le nombre de M. Bowen ?',
      options: [
        { val: 'A', text: '$7$', textVn: '$7$', textFr: '$7$' },
        { val: 'B', text: '$8$', textVn: '$8$', textFr: '$8$' },
        { val: 'C', text: '$7.5$', textVn: '$7.5$', textFr: '$7.5$' },
        { val: 'D', text: 'There is no such integer', textVn: 'Không có số nguyên nào như vậy', textFr: 'Un tel entier n’existe pas' },
      ],
      correct: 'D',
      expEn: '$n > 7$ and $n < 8$. No integer is greater than 7 and less than 8. $7$ and $8$ are the open circles, so neither is included. $7.5$ fits both inequalities, but it is not an integer. Mr Bowen should think again.',
      expVn: '$n > 7$ và $n < 8$. Không có số nguyên nào lớn hơn 7 và nhỏ hơn 8. $7$ và $8$ là hai vòng tròn rỗng, nên cả hai đều không được tính. $7.5$ thỏa mãn cả hai bất đẳng thức, nhưng nó không phải số nguyên. Thầy Bowen nên nghĩ lại.',
      expFr: '$n > 7$ et $n < 8$. Aucun entier n’est plus grand que 7 et plus petit que 8. $7$ et $8$ sont les cercles vides, donc aucun des deux n’est inclus. $7.5$ convient aux deux inégalités, mais ce n’est pas un entier. M. Bowen doit réfléchir à nouveau.',
    },
  },

  // 26 ─ Checklist + the exit question (CHECK 8) ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    eyebrowVn: 'Trước khi làm các nhiệm vụ',
    eyebrowFr: 'Avant de commencer les exercices',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu le faire ?',
    content: '> Say each one out loud. If one feels shaky, go back to its slide before the practice.',
    contentVn: '> Nói to từng điều. Nếu điều nào chưa chắc, hãy quay lại slide đó trước khi luyện tập.',
    contentFr: '> Dis chacune à voix haute. Si l’une te paraît fragile, retourne à sa diapo avant les exercices.',
    items: [
      { text: 'Read $<$ and $>$ out loud in English.', textVn: 'Đọc to $<$ và $>$ bằng tiếng Anh.', textFr: 'Lire $<$ et $>$ à voix haute en anglais.' },
      { text: 'Say what an **inequality** and an **integer** are.', textVn: 'Nói được **bất đẳng thức** và **số nguyên** là gì.', textFr: 'Dire ce qu’est une **inégalité** et un **nombre entier**.' },
      { text: 'Show an inequality on a number line.', textVn: 'Biểu diễn bất đẳng thức trên trục số.', textFr: 'Représenter une inégalité sur une droite graduée.' },
      { text: 'Write the inequality a number line shows.', textVn: 'Viết bất đẳng thức mà trục số biểu diễn.', textFr: 'Écrire l’inégalité que montre une droite graduée.' },
      { text: 'Find the **smallest** or **largest** integer.', textVn: 'Tìm số nguyên **nhỏ nhất** hoặc **lớn nhất**.', textFr: 'Trouver le **plus petit** ou le **plus grand** entier.' },
      { text: 'Remember: **less than** means **left**.', textVn: 'Nhớ: **nhỏ hơn** nghĩa là **bên trái**.', textFr: 'Retiens : **plus petit** veut dire **à gauche**.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: "$y$ is less than −4". Which line has the inequality **and** the largest integer $y$ could be?',
      qVn: 'Câu hỏi cuối bài: "$y$ is less than −4". Dòng nào có đúng bất đẳng thức **và** số nguyên lớn nhất mà $y$ có thể là?',
      qFr: 'Question de sortie : « $y$ is less than −4 ». Quelle ligne donne l’inégalité **et** le plus grand entier possible pour $y$ ?',
      options: [
        { val: 'A', text: '$y < -4$, and the largest integer is $-4$', textVn: '$y < -4$, và số nguyên lớn nhất là $-4$', textFr: '$y < -4$, et le plus grand entier est $-4$' },
        { val: 'B', text: '$y < -4$, and the largest integer is $-3$', textVn: '$y < -4$, và số nguyên lớn nhất là $-3$', textFr: '$y < -4$, et le plus grand entier est $-3$' },
        { val: 'C', text: '$y < -4$, and the largest integer is $-5$', textVn: '$y < -4$, và số nguyên lớn nhất là $-5$', textFr: '$y < -4$, et le plus grand entier est $-5$' },
        { val: 'D', text: '$y > -4$, and the largest integer is $-5$', textVn: '$y > -4$, và số nguyên lớn nhất là $-5$', textFr: '$y > -4$, et le plus grand entier est $-5$' },
      ],
      correct: 'C',
      expEn: '"Is less than" is $<$, so $y < -4$. Less than means left, and the first integer to the left of −4 is **−5**. −4 is the open circle: −4 is not less than −4. −3 is to the right of −4, so it is greater. $y > -4$ reads the sign backwards.',
      expVn: '"Is less than" là $<$, nên $y < -4$. Nhỏ hơn nghĩa là bên trái, và số nguyên đầu tiên bên trái −4 là **−5**. −4 là vòng tròn rỗng: −4 không nhỏ hơn −4. −3 nằm bên phải −4, nên nó lớn hơn. $y > -4$ là đọc ngược dấu.',
      expFr: '« Is less than », c’est $<$, donc $y < -4$. Plus petit que veut dire à gauche, et le premier entier à gauche de −4 est **−5**. −4 est le cercle vide : −4 n’est pas plus petit que −4. −3 est à droite de −4, donc il est plus grand. $y > -4$ lit le signe à l’envers.',
    },
  },
];
