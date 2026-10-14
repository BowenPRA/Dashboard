// src/data/Y7_MATH/U02_1/notes.js
// 2.1 Constructing Expressions — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons, content/y7-math/U02_1). 14 layout slides, 5 checks.
//
// The classroom deck is built on Science 2.1: the class had just met a number
// that is real and uncountable (the particles in a drop of water), and a letter
// arrives as the way to write about it. The self-study version keeps that door
// — the science images are what this class remembers — and keeps the wall on
// slide 4: c − 50 is a finished answer, and being allowed to stop there IS the
// lesson. Reduced from 23 classroom slides: the four ask-first question slides
// fold into the slides that answer them (a solo student cannot be asked to
// wait), the "which are expressions" reveal becomes check 2, and the four word
// problems (Marcus, algebra → English, the syringe, the ice cubes) move to the
// workbook. The `check:` block is always the LAST key.
import { DIAGRAMS } from './diagrams.js';

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
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 2 · 2.1',
    eyebrowVn: 'Chương 2 · 2.1',
    eyebrowFr: 'Unité 2 · 2.1',
    title: 'Constructing Expressions',
    titleVn: 'Xây dựng biểu thức',
    titleFr: 'Construire des expressions',
    objective: 'Choose a letter to represent a number you cannot count, and turn English sentences into algebra.',
    objectiveVn: 'Chọn một chữ cái để đại diện cho một số không đếm được, và chuyển câu tiếng Anh thành đại số.',
    objectiveFr: 'Choisis une lettre pour représenter un nombre que tu ne peux pas compter, et transforme des phrases en anglais en algèbre.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans ce cours',
      text: 'You will **guess**, **sort** and **choose** your way through it. Six things are scored — the question on the next slide is the first.',
      textVn: 'Em sẽ **đoán**, **sắp xếp** và **chọn** trong suốt bài học. Sáu mục được tính điểm — câu hỏi ở slide sau là mục đầu tiên.',
      textFr: 'Tu vas **deviner**, **trier** et **choisir** tout au long du cours. Six activités sont notées — la question de la diapo suivante est la première.',
    },
  },

  // 2 ─ The hook: a real number nobody can count — PREDICT ──────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplet',
    side: 'left',
    eyebrow: 'Science 2.1 — particle theory',
    eyebrowVn: 'Khoa học 2.1 — thuyết hạt',
    eyebrowFr: 'Sciences 2.1 — théorie particulaire',
    title: 'Count Them',
    titleVn: 'Hãy đếm chúng',
    titleFr: 'Compte-les',
    ratio: 50,
    inlineSvg: DIAGRAMS.PARTICLE_DROP,
    content:
      'In Science you learned that everything is made of **particles**. Here is one drop of water.\n\n' +
      'The particles are **really there**, and there is a **real number** of them. So: how many?',
    contentVn:
      'Trong giờ Khoa học em đã học rằng mọi vật đều được tạo nên từ các **hạt**. Đây là một giọt nước.\n\n' +
      'Các hạt **thật sự có ở đó**, và số lượng của chúng là một **con số có thật**. Vậy: bao nhiêu?',
    contentFr: 'En Sciences, tu as appris que tout est fait de **particules**. Voici une goutte d’eau.\n\nLes particules sont **vraiment là**, et il y en a un **vrai nombre**. Alors : combien ?',
    activity: {
      id: 'a1', type: 'predict',
      prompt: 'How many particles are in one drop of water?',
      promptVn: 'Có bao nhiêu hạt trong một giọt nước?',
      promptFr: 'Combien y a-t-il de particules dans une goutte d’eau ?',
      options: [
        { val: 'thousand', name: 'About a thousand', nameVn: 'Khoảng một nghìn', nameFr: 'Environ mille' },
        { val: 'million', name: 'About a million', nameVn: 'Khoảng một triệu', nameFr: 'Environ un million' },
        { val: 'huge', name: 'A number so big I cannot write it', nameVn: 'Một con số lớn đến mức em không viết được', nameFr: 'Un nombre si grand que je ne peux pas l’écrire' },
        { val: 'none', name: 'Nobody knows — there is no number', nameVn: 'Không ai biết — không có con số nào cả', nameFr: 'Personne ne sait — il n’y a pas de nombre' },
      ],
      correct: 'huge',
      explain: 'About **1 500 000 000 000 000 000 000** — a real number, far too big to count. That is not because you are bad at Science. **So how do we write about a number nobody can count?** The next slide gives it a letter.',
      explainVn: 'Khoảng **1 500 000 000 000 000 000 000** — một con số có thật, quá lớn để đếm. Đó không phải vì em học Khoa học kém. **Vậy làm sao để viết về một con số mà không ai đếm được?** Slide sau sẽ đặt cho nó một chữ cái.',
      explainFr: 'Environ **1 500 000 000 000 000 000 000** — un vrai nombre, bien trop grand pour être compté. Ce n’est pas parce que tu es mauvais en Sciences. **Alors comment écrire au sujet d’un nombre que personne ne peut compter ?** La diapo suivante lui donne une lettre.',
    },
  },

  // 3 ─ Give It a Letter (key word: represent) + CHECK 1 ────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    eyebrow: 'The way out',
    eyebrowVn: 'Lối ra',
    eyebrowFr: 'La solution',
    title: 'Give It a Letter',
    titleVn: 'Hãy đặt cho nó một chữ cái',
    titleFr: 'Donne-lui une lettre',
    label: 'Key idea',
    labelVn: 'Ý chính',
    labelFr: 'Idée clé',
    labelIcon: 'Sparkles',
    text: '**n**',
    textVn: '**n**',
    textFr: '**n**',
    sub: 'We cannot count them, so we let **n** be that number.',
    subVn: 'Ta không đếm được, nên cho **n** là con số đó.',
    subFr: 'On ne peut pas les compter, alors on dit que **n** est ce nombre.',
    notes: [
      {
        tone: 'write',
        text:
          '**Represent:** in algebra we choose a letter to **represent** a number we do not know.\n' +
          'n represents **the number of particles**, not a particle.',
        textVn:
          '**Represent (đại diện cho):** trong đại số, ta chọn một chữ cái để **đại diện cho** một số mà ta chưa biết.\n' +
          'n đại diện cho **số lượng hạt**, không phải một cái hạt.',
        textFr: '**Represent (représenter) :** en algèbre, on choisit une lettre pour **représenter** un nombre qu’on ne connaît pas.\nn représente **le nombre de particules**, pas une particule.',
      },
    ],
    check: {
      id: 'c1',
      q: 'In the drop of water, what does the letter **n** represent?',
      qVn: 'Trong giọt nước, chữ cái **n** đại diện cho cái gì?',
      qFr: 'Dans la goutte d’eau, que représente la lettre **n** ?',
      options: [
        { val: 'A', text: 'The number of particles', textVn: 'Số lượng hạt', textFr: 'Le nombre de particules' },
        { val: 'B', text: 'One particle', textVn: 'Một cái hạt', textFr: 'Une particule' },
        { val: 'C', text: 'The water', textVn: 'Nước', textFr: 'L’eau' },
      ],
      correct: 'A',
      expEn: 'A letter represents a **number**. n is how many particles there are — a number we cannot count, but a number all the same. It is not a particle and it is not the water.',
      expVn: 'Một chữ cái đại diện cho một **con số**. n là số lượng hạt — một con số ta không đếm được, nhưng vẫn là một con số. Nó không phải một cái hạt và cũng không phải nước.',
      expFr: 'Une lettre représente un **nombre**. n, c’est combien il y a de particules — un nombre qu’on ne peut pas compter, mais un nombre quand même. Ce n’est pas une particule, et ce n’est pas l’eau.',
    },
  },

  // 4 ─ THE WALL: the row that will not finish ──────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Coffee',
    eyebrow: 'Three cups, one rule',
    eyebrowVn: 'Ba cốc, một quy tắc',
    eyebrowFr: 'Trois tasses, une règle',
    title: 'The Row That Will Not Finish',
    titleVn: 'Dòng không thể tính xong',
    titleFr: 'La ligne qui ne finit pas',
    ratio: 50,
    inlineSvg: DIAGRAMS.COFFEE_WALL,
    content:
      'The first two rows finish neatly: **150** and **250**.\n\n' +
      'The last row will not. There is no number to write, because nobody has told us **c**.\n\n' +
      'So we stop, and we leave it as **c − 50**. That is not giving up — that is the answer.',
    contentVn:
      'Hai dòng đầu tính xong gọn gàng: **150** và **250**.\n\n' +
      'Dòng cuối thì không. Không có con số nào để viết, vì chưa ai cho ta biết **c**.\n\n' +
      'Vậy nên ta dừng lại và để nguyên **c − 50**. Đó không phải là bỏ cuộc — đó chính là đáp án.',
    contentFr: 'Les deux premières lignes se terminent bien : **150** et **250**.\n\nLa dernière, non. Il n’y a pas de nombre à écrire, car personne ne nous a donné **c**.\n\nAlors on s’arrête, et on laisse **c − 50**. Ce n’est pas abandonner — c’est la réponse.',
    notes: [
      {
        tone: 'plant',
        text: 'If a question gives you a letter and no number, your answer will **have a letter in it**. That is correct. Do not invent a number.',
        textVn: 'Nếu đề bài cho em một chữ cái mà không cho số, thì đáp án của em **sẽ có chữ cái trong đó**. Như vậy là đúng. Đừng tự bịa ra một con số.',
        textFr: 'Si une question te donne une lettre et pas de nombre, ta réponse **contiendra une lettre**. C’est juste. N’invente pas de nombre.',
      },
    ],
  },

  // 5 ─ Key word: Expression + CHECK 2 ──────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Expression',
    titleVn: 'Biểu thức',
    titleFr: 'Expression',
    label: 'Copy this',
    labelVn: 'Chép lại',
    labelFr: 'À recopier',
    labelIcon: 'Pencil',
    text: 'c − 50',
    textVn: 'c − 50',
    textFr: 'c − 50',
    sub: 'What you are left with has a name.',
    subVn: 'Thứ còn lại đó có một cái tên.',
    subFr: 'Ce qui reste a un nom.',
    notes: [
      {
        tone: 'write',
        text:
          '**Expression:** a statement that contains letters and sometimes numbers, but has **no = sign**.\n' +
          'For example $n + 7$, $4m$, $x + 2$, $c − 50$.',
        textVn:
          '**Biểu thức (expression):** một mệnh đề chứa chữ cái và đôi khi có cả số, nhưng **không có dấu =**.\n' +
          'Ví dụ $n + 7$, $4m$, $x + 2$, $c − 50$.',
        textFr: '**Expression :** une écriture qui contient des lettres et parfois des nombres, mais **pas de signe =**.\nPar exemple $n + 7$, $4m$, $x + 2$, $c − 50$.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which of these is an **expression**?',
      qVn: 'Cái nào sau đây là một **biểu thức**?',
      qFr: 'Laquelle de ces écritures est une **expression** ?',
      options: [
        { val: 'A', text: '$7 + 2 = 9$', textVn: '$7 + 2 = 9$', textFr: '$7 + 2 = 9$' },
        { val: 'B', text: '$y = 5x$', textVn: '$y = 5x$', textFr: '$y = 5x$' },
        { val: 'C', text: '$n − 3$', textVn: '$n − 3$', textFr: '$n − 3$' },
      ],
      correct: 'C',
      expEn: 'An expression has a letter and **no = sign**. $n − 3$ is one. $7 + 2 = 9$ and $y = 5x$ both have an = sign, so neither is an expression — and $7 + 2 = 9$ has no letter either.',
      expVn: 'Biểu thức có chữ cái và **không có dấu =**. $n − 3$ là một biểu thức. $7 + 2 = 9$ và $y = 5x$ đều có dấu =, nên cả hai đều không phải biểu thức — và $7 + 2 = 9$ còn không có chữ cái nào.',
      expFr: 'Une expression a une lettre et **pas de signe =**. $n − 3$ en est une. $7 + 2 = 9$ et $y = 5x$ ont toutes les deux un signe =, donc aucune n’est une expression — et $7 + 2 = 9$ n’a pas de lettre non plus.',
    },
  },

  // 6 ─ The short way of writing it (notation) + CHECK 3 ────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenTool',
    eyebrow: 'The book assumes this from page 21 onwards',
    eyebrowVn: 'Sách mặc định em biết điều này từ trang 21',
    eyebrowFr: 'Le livre le suppose dès la page 21',
    title: 'The Short Way of Writing It',
    titleVn: 'Cách viết ngắn gọn',
    titleFr: 'L’écriture courte',
    ratio: 50,
    inlineSvg: DIAGRAMS.NOTATION,
    content: 'Algebra drops the multiplication sign — and only the multiplication sign. The + and − stay.',
    contentVn: 'Đại số lược bỏ dấu nhân — và chỉ lược bỏ dấu nhân mà thôi. Dấu + và − vẫn giữ nguyên.',
    contentFr: 'L’algèbre enlève le signe de multiplication — et seulement le signe de multiplication. Le + et le − restent.',
    notes: [
      {
        tone: 'write',
        text:
          '$3s$ means $3 × s$ · $ab$ means $a × b$ · $\\frac{s}{2}$ means $s ÷ 2$\n' +
          'The number is written **in front** of the letter: $3s$, never $s3$.',
        textVn:
          '$3s$ nghĩa là $3 × s$ · $ab$ nghĩa là $a × b$ · $\\frac{s}{2}$ nghĩa là $s ÷ 2$\n' +
          'Số được viết **đứng trước** chữ cái: $3s$, không bao giờ viết $s3$.',
        textFr: '$3s$ veut dire $3 × s$ · $ab$ veut dire $a × b$ · $\\frac{s}{2}$ veut dire $s ÷ 2$\nLe nombre s’écrit **devant** la lettre : $3s$, jamais $s3$.',
      },
    ],
    reveal: {
      label: 'Try four, then check',
      labelVn: 'Thử bốn câu, rồi kiểm tra',
      labelFr: 'Essaie les quatre, puis vérifie',
      answer:
        'Write the short way: **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$\n\n' +
        '**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$',
      answerVn:
        'Viết theo cách ngắn: **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$\n\n' +
        '**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$',
      answerFr: 'Écris en version courte : **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$\n\n**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$',
    },
    check: {
      id: 'c3',
      q: 'Which is the short way of writing $5 × t$?',
      qVn: 'Cách viết ngắn gọn của $5 × t$ là gì?',
      qFr: 'Quelle est l’écriture courte de $5 × t$ ?',
      options: [
        { val: 'A', text: '$5t$', textVn: '$5t$', textFr: '$5t$' },
        { val: 'B', text: '$t5$', textVn: '$t5$', textFr: '$t5$' },
        { val: 'C', text: '$5 + t$', textVn: '$5 + t$', textFr: '$5 + t$' },
      ],
      correct: 'A',
      expEn: 'Drop the × and put the number **in front**: $5t$. $t5$ has the number in the wrong place, and $5 + t$ changes the operation — only the multiplication sign disappears, never a plus.',
      expVn: 'Bỏ dấu × và đặt số **đứng trước**: $5t$. $t5$ đặt số sai chỗ, còn $5 + t$ đổi cả phép tính — chỉ dấu nhân biến mất, dấu cộng thì không bao giờ.',
      expFr: 'Enlève le × et mets le nombre **devant** : $5t$. $t5$ a le nombre au mauvais endroit, et $5 + t$ change l’opération — seul le signe de multiplication disparaît, jamais un plus.',
    },
  },

  // 7 ─ The words do the choosing ───────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Languages',
    eyebrow: 'Four phrases, four operations',
    eyebrowVn: 'Bốn cụm từ, bốn phép tính',
    eyebrowFr: 'Quatre tournures, quatre opérations',
    title: 'The Words Do the Choosing',
    titleVn: 'Chính từ ngữ quyết định phép tính',
    titleFr: 'Les mots choisissent',
    ratio: 50,
    inlineSvg: DIAGRAMS.FOUR_PHRASES,
    content:
      'Mr Bowen dissolves **s grams** of salt. Lan dissolves **two grams more than Mr Bowen**. How much salt does Lan use?\n\n' +
      'The salt dissolves and disappears. It is still **s grams** — you just cannot see it. That is exactly what a letter does. Lan uses **s + 2**.',
    contentVn:
      'Thầy Bowen hoà tan **s gam** muối. Lan hoà tan **nhiều hơn thầy Bowen hai gam**. Lan dùng bao nhiêu muối?\n\n' +
      'Muối tan ra và biến mất. Nó vẫn là **s gam** — chỉ là em không nhìn thấy nữa. Chữ cái trong đại số cũng hoạt động đúng như vậy. Lan dùng **s + 2**.',
    contentFr: 'M. Bowen dissout **s grammes** de sel. Lan en dissout **deux grammes de plus que M. Bowen**. Combien Lan en utilise-t-elle ?\n\nLe sel disparaît, mais il y a toujours **s grammes** — tu ne le vois plus, c’est tout. C’est exactement ce que fait une lettre. Lan utilise **s + 2**.',
    notes: [
      {
        tone: 'write',
        text:
          '**more than** → add · **less than** / **fewer than** → subtract\n' +
          '**times as many / as much** → multiply · **half as much** → divide by 2',
        textVn:
          '**more than** (nhiều hơn) → cộng · **less than / fewer than** (ít hơn) → trừ\n' +
          '**times as many / as much** (gấp … lần) → nhân · **half as much** (bằng một nửa) → chia cho 2',
        textFr: '**more than** (plus que) → + · **less than** / **fewer than** (moins que) → −\n**times as many / as much** (… fois plus) → × · **half as much** (la moitié) → ÷ 2',
      },
    ],
    activity: {
      id: 'a2', type: 'sort',
      prompt: 'Sort the English phrases by the operation they tell you to do.',
      promptVn: 'Sắp xếp các cụm từ tiếng Anh theo phép tính mà chúng yêu cầu.',
      promptFr: 'Trie les tournures anglaises selon l’opération qu’elles te demandent de faire.',
      bins: [
        { id: 'add', name: 'Add (+)', nameVn: 'Cộng (+)', nameFr: 'Additionner (+)' },
        { id: 'sub', name: 'Subtract (−)', nameVn: 'Trừ (−)', nameFr: 'Soustraire (−)' },
        { id: 'mul', name: 'Multiply (×)', nameVn: 'Nhân (×)', nameFr: 'Multiplier (×)' },
        { id: 'div', name: 'Divide (÷)', nameVn: 'Chia (÷)', nameFr: 'Diviser (÷)' },
      ],
      cards: [
        { id: 'more', name: '3 more than', nameVn: '3 more than (nhiều hơn 3)', nameFr: '3 more than (3 de plus que)', bin: 'add' },
        { id: 'less', name: '5 less than', nameVn: '5 less than (ít hơn 5)', nameFr: '5 less than (5 de moins que)', bin: 'sub' },
        { id: 'fewer', name: '2 fewer than', nameVn: '2 fewer than (ít hơn 2)', nameFr: '2 fewer than (2 de moins que)', bin: 'sub' },
        { id: 'times', name: 'four times as many', nameVn: 'four times as many (gấp bốn lần)', nameFr: 'four times as many (quatre fois plus)', bin: 'mul' },
        { id: 'half', name: 'half as much', nameVn: 'half as much (bằng một nửa)', nameFr: 'half as much (la moitié)', bin: 'div' },
        { id: 'total', name: 'the total of', nameVn: 'the total of (tổng của)', nameFr: 'the total of (le total de)', bin: 'add' },
        { id: 'twice', name: 'twice as much', nameVn: 'twice as much (gấp đôi)', nameFr: 'twice as much (deux fois plus)', bin: 'mul' },
      ],
      explain: '**more than** and **the total of** add; **less than** and **fewer than** subtract; **times as many** and **twice** multiply; **half as much** divides by 2. The English chooses the operation — the numbers only come after.',
      explainVn: '**more than** và **the total of** là cộng; **less than** và **fewer than** là trừ; **times as many** và **twice** là nhân; **half as much** là chia cho 2. Tiếng Anh quyết định phép tính — con số chỉ đến sau.',
      explainFr: '**more than** et **the total of** additionnent ; **less than** et **fewer than** soustraient ; **times as many** et **twice** multiplient ; **half as much** divise par 2. C’est l’anglais qui choisit l’opération — les nombres viennent seulement après.',
    },
  },

  // 8 ─ Four beakers (practice, reveal) ─────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Beaker',
    side: 'left',
    eyebrow: 'Quick fire — write all four before you check',
    eyebrowVn: 'Nhanh — viết cả bốn rồi mới kiểm tra',
    eyebrowFr: 'Rapide — écris les quatre avant de vérifier',
    title: 'Four Beakers',
    titleVn: 'Bốn cái cốc',
    titleFr: 'Quatre béchers',
    ratio: 50,
    content:
      'The first beaker holds **w ml** of water. Write an expression for each of the others.\n\n' +
      '**a** The second holds 30 ml more than the first.\n' +
      '**b** The third holds five times as much as the first.\n' +
      '**c** The fourth holds 40 ml less than the first.\n' +
      '**d** The fifth holds half as much as the first.',
    contentVn:
      'Cốc thứ nhất chứa **w ml** nước. Hãy viết biểu thức cho từng cốc còn lại.\n\n' +
      '**a** Cốc thứ hai chứa nhiều hơn cốc thứ nhất 30 ml.\n' +
      '**b** Cốc thứ ba chứa gấp năm lần cốc thứ nhất.\n' +
      '**c** Cốc thứ tư chứa ít hơn cốc thứ nhất 40 ml.\n' +
      '**d** Cốc thứ năm chứa bằng một nửa cốc thứ nhất.',
    contentFr: 'Le premier bécher contient **w ml** d’eau. Écris une expression pour chacun des autres.\n\n**a** Le deuxième contient 30 ml de plus que le premier.\n**b** Le troisième contient cinq fois plus que le premier.\n**c** Le quatrième contient 40 ml de moins que le premier.\n**d** Le cinquième contient la moitié du premier.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$\n\nEvery answer starts from **w**, because every sentence did.',
      answerVn: '**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$\n\nMọi đáp án đều bắt đầu từ **w**, vì mọi câu hỏi đều bắt đầu từ đó.',
      answerFr: '**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$\n\nChaque réponse part de **w**, parce que chaque phrase partait de w.',
    },
  },

  // 9 ─ Total and difference ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Two words the exercise uses without explaining',
    eyebrowVn: 'Hai từ mà bài tập dùng nhưng không giải thích',
    eyebrowFr: 'Deux mots que l’exercice n’explique pas',
    title: 'Total and Difference',
    titleVn: 'Tổng và hiệu',
    titleFr: 'Total et différence',
    ratio: 50,
    inlineSvg: DIAGRAMS.TOTAL_DIFFERENCE,
    content: 'When a question gives you **two** letters, these are the two words it will use.',
    contentVn: 'Khi một câu hỏi cho em **hai** chữ cái, đây chính là hai từ nó sẽ dùng.',
    contentFr: 'Quand une question te donne **deux** lettres, ce sont ces deux mots qu’elle utilisera.',
    notes: [
      {
        tone: 'write',
        text: '**Total** → add them: $a + b$ · **Difference** → subtract them: $a − b$',
        textVn: '**Total (tổng)** → cộng lại: $a + b$ · **Difference (hiệu)** → trừ đi: $a − b$',
        textFr: '**Total** (le total) → additionne-les : $a + b$ · **Difference** (la différence) → soustrais-les : $a − b$',
      },
    ],
    reveal: {
      label: 'One more',
      labelVn: 'Thêm một câu',
      labelFr: 'Encore une',
      answer: 'Mr Bowen pours **three** large beakers and **five** small ones into a bowl. Write an expression for the total.\n\n$3a + 5b$. Two different sizes, so two different letters.',
      answerVn: 'Thầy Bowen đổ **ba** cốc lớn và **năm** cốc nhỏ vào một cái tô. Hãy viết biểu thức cho tổng lượng nước.\n\n$3a + 5b$. Hai cỡ cốc khác nhau nên phải dùng hai chữ cái khác nhau.',
      answerFr: 'M. Bowen verse **trois** grands béchers et **cinq** petits dans un bol. Écris une expression pour le total.\n\n$3a + 5b$. Deux tailles différentes, donc deux lettres différentes.',
    },
  },

  // 10 ─ The words come backwards + CHECK 4 ─────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    side: 'left',
    eyebrow: 'Test it with numbers first',
    eyebrowVn: 'Hãy thử bằng số trước',
    eyebrowFr: 'Teste d’abord avec des nombres',
    title: 'The Words Come Backwards',
    titleVn: 'Thứ tự từ ngữ bị đảo ngược',
    titleFr: 'Les mots sont à l’envers',
    ratio: 50,
    inlineSvg: DIAGRAMS.ORDER_FLIP,
    content:
      '**h less than t** — is that $h − t$, or $t − h$? They are not the same.\n\n' +
      'You already know that **5 less than 12** is 7. Nobody says it is −7. So you already know this rule. Putting letters in it changes nothing.',
    contentVn:
      '**h less than t** — là $h − t$, hay $t − h$? Hai cái đó không giống nhau.\n\n' +
      'Em vốn đã biết **5 less than 12** (12 bớt đi 5) bằng 7. Không ai nói là −7 cả. Vậy là em đã biết quy tắc này rồi. Thay số bằng chữ cái cũng không đổi gì.',
    contentFr: '**h less than t** — est-ce $h − t$, ou $t − h$ ? Ce n’est pas la même chose.\n\nTu sais déjà que **5 less than 12** (5 de moins que 12) fait 7. Personne ne dit −7. Donc tu connais déjà cette règle. Y mettre des lettres ne change rien.',
    notes: [
      {
        tone: 'write',
        text:
          '**Watch the order.** English often says the amount **first**, but we write the starting number **first**.\n' +
          '**h less than t** is $t − h$ · **k more than g** is $g + k$.',
        textVn:
          '**Chú ý thứ tự.** Tiếng Anh thường nói phần thêm/bớt **trước**, nhưng ta lại viết số ban đầu **trước**.\n' +
          '**h less than t** là $t − h$ · **k more than g** là $g + k$.',
        textFr: '**Attention à l’ordre.** L’anglais dit souvent la quantité **en premier**, mais on écrit le nombre de départ **en premier**.\n**h less than t** donne $t − h$ · **k more than g** donne $g + k$.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Write an expression for **9 less than m**.',
      qVn: 'Viết biểu thức cho **9 less than m** (m bớt đi 9).',
      qFr: 'Écris une expression pour **9 less than m** (9 de moins que m).',
      options: [
        { val: 'A', text: '$9 − m$', textVn: '$9 − m$', textFr: '$9 − m$' },
        { val: 'B', text: '$m − 9$', textVn: '$m − 9$', textFr: '$m − 9$' },
        { val: 'C', text: '$9m$', textVn: '$9m$', textFr: '$9m$' },
      ],
      correct: 'B',
      expEn: 'Start from m and take 9 away: $m − 9$. Test it with numbers — 9 less than 20 is 11, which is $20 − 9$, not $9 − 20$. $9m$ would mean 9 times m.',
      expVn: 'Bắt đầu từ m rồi bớt đi 9: $m − 9$. Thử bằng số — 9 less than 20 là 11, tức là $20 − 9$, không phải $9 − 20$. $9m$ nghĩa là 9 nhân m.',
      expFr: 'Pars de m et enlève 9 : $m − 9$. Teste avec des nombres — 9 de moins que 20, c’est 11, soit $20 − 9$, et pas $9 − 20$. $9m$ voudrait dire 9 fois m.',
    },
  },

  // 11 ─ Subtract 4, or subtract from 4? ────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'This one costs marks every year',
    eyebrowVn: 'Chỗ này năm nào cũng bị mất điểm',
    eyebrowFr: 'Celle-ci coûte des points chaque année',
    title: 'Subtract 4, or Subtract From 4?',
    titleVn: 'Trừ đi 4, hay lấy 4 trừ đi?',
    titleFr: 'Soustraire 4, ou soustraire de 4 ?',
    ratio: 50,
    inlineSvg: DIAGRAMS.SUBTRACT_VS_FROM,
    content:
      'Read these two out loud. **A:** Multiply x by 5 and **subtract 4**. **B:** Multiply x by 5 and **subtract from 4**.\n\n' +
      'Same numbers. Same letter. Opposite answers — **6** and **−6** when x is 2. One word did that.',
    contentVn:
      'Đọc to hai câu này. **A:** Multiply x by 5 and **subtract 4**. **B:** Multiply x by 5 and **subtract from 4**.\n\n' +
      'Cùng những con số. Cùng chữ cái. Đáp án ngược nhau — **6** và **−6** khi x bằng 2. Chỉ một từ đã làm nên điều đó.',
    contentFr: 'Lis ces deux phrases à voix haute. **A :** Multiply x by 5 and **subtract 4**. **B :** Multiply x by 5 and **subtract from 4**.\n\nMêmes nombres. Même lettre. Réponses opposées — **6** et **−6** quand x vaut 2. Un seul mot a fait ça.',
    notes: [
      {
        tone: 'write',
        text:
          '**subtract 4** → take 4 away from what you have: $5x − 4$\n' +
          '**subtract from 4** → start at 4 and take away what you have: $4 − 5x$',
        textVn:
          '**subtract 4** (trừ đi 4) → lấy cái em đang có trừ đi 4: $5x − 4$\n' +
          '**subtract from 4** (lấy 4 trừ đi) → bắt đầu từ 4 rồi trừ đi cái em đang có: $4 − 5x$',
        textFr: '**subtract 4** (soustraire 4) → enlève 4 à ce que tu as : $5x − 4$\n**subtract from 4** (soustraire de 4) → pars de 4 et enlève ce que tu as : $4 − 5x$',
      },
    ],
  },

  // 12 ─ The result (order of operations) + CHECK 5 ─────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Layers',
    side: 'left',
    eyebrow: 'Both traps in one question',
    eyebrowVn: 'Cả hai cái bẫy trong cùng một câu',
    eyebrowFr: 'Les deux pièges dans une question',
    title: 'The Result',
    titleVn: 'Kết quả',
    titleFr: 'Le résultat',
    ratio: 50,
    inlineSvg: DIAGRAMS.ORDER_OF_OPS,
    content:
      '*"Multiply n by 3, then subtract the result from 25."*\n\n' +
      'Build the multiplication first and give it a name: **3n is "the result"**. Then the sentence is easy: subtract that result **from 25**.',
    contentVn:
      '*"Nhân n với 3, rồi lấy 25 trừ đi kết quả."*\n\n' +
      'Hãy dựng phép nhân trước và đặt tên cho nó: **3n chính là "kết quả"**. Rồi câu văn trở nên dễ: lấy **25** trừ đi kết quả đó.',
    contentFr: '*« Multiplie n par 3, puis soustrais le résultat de 25. »*\n\nConstruis d’abord la multiplication et donne-lui un nom : **3n est « le résultat »** (the result). Ensuite, la phrase est facile : soustrais ce résultat **de 25**.',
    notes: [
      {
        tone: 'write',
        text:
          '**Order of operations:** do the **× and ÷ first**, then the + and −.\n' +
          'Multiply n by 3, then subtract the result from 25 → $25 − 3n$.',
        textVn:
          '**Thứ tự phép tính:** làm **nhân và chia trước**, rồi mới cộng và trừ.\n' +
          'Nhân n với 3, rồi lấy 25 trừ đi kết quả → $25 − 3n$.',
        textFr: '**Priorité des opérations :** fais **× et ÷ d’abord**, puis + et −.\nMultiplie n par 3, puis soustrais le résultat de 25 → $25 − 3n$.',
      },
    ],
    check: {
      id: 'c5',
      q: '*"Multiply y by 4, then subtract the result from 30."* Which expression is that?',
      qVn: '*"Nhân y với 4, rồi lấy 30 trừ đi kết quả."* Biểu thức nào đúng?',
      qFr: '*« Multiplie y par 4, puis soustrais le résultat de 30. »* Quelle expression est-ce ?',
      options: [
        { val: 'A', text: '$4y − 30$', textVn: '$4y − 30$', textFr: '$4y − 30$' },
        { val: 'B', text: '$30 − 4y$', textVn: '$30 − 4y$', textFr: '$30 − 4y$' },
        { val: 'C', text: '$26y$', textVn: '$26y$', textFr: '$26y$' },
      ],
      correct: 'B',
      expEn: 'The result is $4y$. "Subtract the result **from 30**" starts at 30: $30 − 4y$. $4y − 30$ is "subtract 30" (no "from"), and $26y$ subtracted before multiplying — the × must come first.',
      expVn: 'Kết quả là $4y$. "Lấy **30** trừ đi kết quả" bắt đầu từ 30: $30 − 4y$. $4y − 30$ là "trừ đi 30" (không có "from"), còn $26y$ là trừ trước khi nhân — phép × phải làm trước.',
      expFr: 'Le résultat est $4y$. « Soustrais le résultat **de 30** » part de 30 : $30 − 4y$. $4y − 30$, c’est « soustrais 30 » (sans « de »), et $26y$ a soustrait avant de multiplier — le × doit venir d’abord.',
    },
  },

  // 13 ─ Recap ──────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    titleFr: 'Sais-tu faire les six ?',
    content:
      '> Your notebook should now have **7 written panels**. Count them. If one is missing, go back and copy it before the practice.',
    contentVn:
      '> Trong vở của em bây giờ phải có **7 khung ghi chép**. Hãy đếm lại. Nếu thiếu khung nào, hãy quay lại chép trước khi luyện tập.',
    contentFr: '> Ton cahier devrait maintenant avoir **7 encadrés recopiés**. Compte-les. S’il en manque un, reviens en arrière et recopie-le avant l’entraînement.',
    items: [
      { text: 'Say what an **expression** is, and why it has **no = sign**.', textVn: 'Nói được **biểu thức** là gì, và vì sao nó **không có dấu =**.', textFr: 'Dire ce qu’est une **expression**, et pourquoi elle n’a **pas de signe =**.' },
      { text: 'Choose a letter to **represent** a number, and say what it represents.', textVn: 'Chọn được một chữ cái để **đại diện cho** một số, và nói rõ nó đại diện cho cái gì.', textFr: 'Choisir une lettre pour **représenter** un nombre, et dire ce qu’elle représente.' },
      { text: 'Leave $c − 50$ alone without thinking you got it wrong.', textVn: 'Để yên $c − 50$ mà không nghĩ là mình làm sai.', textFr: 'Laisser $c − 50$ tel quel, sans croire que tu t’es trompé.' },
      { text: 'Write $3 × s$ as $3s$ and $a × b$ as $ab$.', textVn: 'Viết $3 × s$ thành $3s$ và $a × b$ thành $ab$.', textFr: 'Écrire $3 × s$ comme $3s$ et $a × b$ comme $ab$.' },
      { text: 'Turn **more / less / times / half**, **total** and **difference** into operations.', textVn: 'Chuyển **more / less / times / half**, **total** và **difference** thành phép tính.', textFr: 'Transformer **more / less / times / half**, **total** et **difference** en opérations.' },
      { text: 'Write **h less than t** as $t − h$, and tell **subtract 4** from **subtract from 4**.', textVn: 'Viết **h less than t** thành $t − h$, và phân biệt **subtract 4** với **subtract from 4**.', textFr: 'Écrire **h less than t** comme $t − h$, et distinguer **subtract 4** de **subtract from 4**.' },
    ],
  },

  // 14 ─ Closer ─────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    titleFr: 'Leçon terminée !',
    subtitle: 'A letter is just a number you have not been told yet. Exit question: **a beaker holds $p$ ml. Mr Bowen pours out 60 ml. Write the expression.**',
    subtitleVn: 'Chữ cái chỉ là một con số chưa ai nói cho em biết. Câu hỏi ra về: **một cốc chứa $p$ ml. Thầy Bowen rót ra 60 ml. Hãy viết biểu thức.**',
    subtitleFr: 'Une lettre, c’est juste un nombre qu’on ne t’a pas encore donné. Question de sortie : **un bécher contient $p$ ml. M. Bowen en verse 60 ml. Écris l’expression.**',
    reveal: {
      label: 'Check the exit question',
      labelVn: 'Kiểm tra câu hỏi ra về',
      labelFr: 'Vérifie la question de sortie',
      answer: '$p − 60$. Start from what was there, take away what left. Now do the Vocab, then the Practice.',
      answerVn: '$p − 60$. Bắt đầu từ lượng ban đầu, bớt đi phần rót ra. Bây giờ làm phần Từ vựng, rồi Luyện tập.',
      answerFr: '$p − 60$. Pars de ce qu’il y avait, et enlève ce qui est parti. Maintenant, fais le Vocabulaire, puis l’Entraînement.',
    },
  },
];
