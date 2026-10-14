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
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 2 · 2.3',
    eyebrowVn: 'Chương 2 · 2.3',
    eyebrowFr: 'Unité 2 · 2.3',
    title: 'Collecting Like Terms',
    titleVn: 'Thu gọn các hạng tử đồng dạng',
    titleFr: 'Réduire les termes semblables',
    objective: 'Say what a term and like terms are, simplify an expression by collecting like terms, and keep every sign with its term.',
    objectiveVn: 'Nói được hạng tử và hạng tử đồng dạng là gì, rút gọn biểu thức bằng cách thu gọn các hạng tử đồng dạng, và giữ mỗi dấu đi cùng hạng tử của nó.',
    objectiveFr: 'Dire ce que sont un terme et des termes semblables, simplifier une expression en réduisant les termes semblables, et garder chaque signe avec son terme.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'Nobody says "3 apples and 2 bananas make 5 apple-bananas". Algebra does not either. You will **sort**, **type** and **predict** your way through **20 scored steps** — the first one is on the next slide.',
      textVn: 'Không ai nói "3 quả táo và 2 quả chuối là 5 quả táo-chuối". Đại số cũng vậy. Em sẽ **sắp xếp**, **gõ đáp án** và **dự đoán** qua **20 bước được tính điểm** — bước đầu tiên ở slide tiếp theo.',
      textFr: 'Personne ne dit « 3 pommes et 2 bananes font 5 pommes-bananes ». L’algèbre non plus. Tu vas **trier**, **taper** et **prédire** à travers **20 étapes notées** — la première est sur la diapositive suivante.',
    },
  },

  // 2 ─ Starter: same answer? (predict) ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter — decide before you go on',
    eyebrowVn: 'Khởi động — quyết định trước khi đi tiếp',
    eyebrowFr: 'Pour commencer — décide avant de continuer',
    title: 'Same Answer?',
    titleVn: 'Cùng đáp án?',
    titleFr: 'Même réponse ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'When $a = 5$, work out $3a + 4a$. Then work out $7a$.',
    textVn: 'Khi $a = 5$, hãy tính $3a + 4a$. Rồi tính $7a$.',
    textFr: 'Quand $a = 5$, calcule $3a + 4a$. Puis calcule $7a$.',
    sub: 'Put the × back first: $3a$ means $3 × a$.',
    subVn: 'Viết lại dấu × trước: $3a$ nghĩa là $3 × a$.',
    subFr: 'Remets d’abord le × : $3a$ veut dire $3 × a$.',
    activity: {
      id: 'act_starter',
      type: 'predict',
      prompt: 'When $a = 5$, what are $3a + 4a$ and $7a$?',
      promptVn: 'Khi $a = 5$, $3a + 4a$ và $7a$ bằng bao nhiêu?',
      promptFr: 'Quand $a = 5$, que valent $3a + 4a$ et $7a$ ?',
      options: [
        { val: 'digits', name: '$80$ and $75$', nameVn: '$80$ và $75$', nameFr: '$80$ et $75$' },
        { val: 'same', name: '$35$ and $35$', nameVn: '$35$ và $35$', nameFr: '$35$ et $35$' },
        { val: 'added', name: '$12$ and $35$', nameVn: '$12$ và $35$', nameFr: '$12$ et $35$' },
      ],
      correct: 'same',
      explain: 'Both are $35$: $15 + 20 = 35$ and $7 × 5 = 35$. Try $a = 10$: $30 + 40 = 70$ and $7 × 10 = 70$. Always the same — this lesson shows why. $80$ and $75$ push the digits together ($35 + 45$); $12$ adds $3 + 4 + 5$.',
      explainVn: 'Cả hai đều bằng $35$: $15 + 20 = 35$ và $7 × 5 = 35$. Thử $a = 10$: $30 + 40 = 70$ và $7 × 10 = 70$. Luôn bằng nhau — bài này cho em biết vì sao. $80$ và $75$ là ghép các chữ số lại ($35 + 45$); $12$ là cộng $3 + 4 + 5$.',
      explainFr: 'Les deux valent $35$ : $15 + 20 = 35$ et $7 × 5 = 35$. Essaie $a = 10$ : $30 + 40 = 70$ et $7 × 10 = 70$. Toujours pareil — cette leçon montre pourquoi. $80$ et $75$ collent les chiffres ($35 + 45$) ; $12$ additionne $3 + 4 + 5$.',
    },
  },

  // 3 ─ What is in the bag? (check 1) ───────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it in English first',
    eyebrowVn: 'Nói bằng tiếng Anh trước',
    eyebrowFr: 'Dis-le d’abord en anglais',
    title: 'What Is in the Bag?',
    titleVn: 'Trong túi có gì?',
    titleFr: 'Qu’y a-t-il dans le sac ?',
    text: 'Mr Bowen buys **3 apples** and **2 bananas**. Then he buys **4 apples** and **1 banana**.',
    textVn: 'Thầy Bowen mua **3 quả táo** và **2 quả chuối**. Sau đó thầy mua **4 quả táo** và **1 quả chuối**.',
    textFr: 'M. Bowen achète **3 pommes** et **2 bananes**. Puis il achète **4 pommes** et **1 banane**.',
    sub: 'Say what is in his bag out loud, in a full English sentence. Then choose.',
    subVn: 'Nói to trong túi của thầy có gì, thành một câu tiếng Anh đầy đủ. Rồi chọn đáp án.',
    subFr: 'Dis à voix haute ce qu’il y a dans son sac, en une phrase complète en anglais. Puis choisis.',
    check: {
      id: 'c1',
      q: 'What is in Mr Bowen’s bag?',
      qVn: 'Trong túi của thầy Bowen có gì?',
      qFr: 'Qu’y a-t-il dans le sac de M. Bowen ?',
      options: [
        { val: 'A', text: '10 apple-bananas', textVn: '10 quả táo-chuối', textFr: '10 pommes-bananes' },
        { val: 'B', text: '7 apples and 2 bananas', textVn: '7 quả táo và 2 quả chuối', textFr: '7 pommes et 2 bananes' },
        { val: 'C', text: '7 apples and 3 bananas', textVn: '7 quả táo và 3 quả chuối', textFr: '7 pommes et 3 bananes' },
      ],
      correct: 'C',
      expEn: 'Apples are counted with apples and bananas with bananas: $3 + 4 = 7$ apples and $2 + 1 = 3$ bananas. "10 apple-bananas" adds two different kinds, which nobody says. "2 bananas" forgot the last banana — one banana still counts.',
      expVn: 'Táo đếm với táo, chuối đếm với chuối: $3 + 4 = 7$ quả táo và $2 + 1 = 3$ quả chuối. "10 quả táo-chuối" là cộng hai loại khác nhau, không ai nói vậy. "2 quả chuối" là quên quả chuối cuối cùng — một quả chuối vẫn được tính.',
      expFr: 'On compte les pommes avec les pommes et les bananes avec les bananes : $3 + 4 = 7$ pommes et $2 + 1 = 3$ bananes. « 10 pommes-bananes » additionne deux sortes différentes, et personne ne dit ça. « 2 bananes » oublie la dernière banane — une seule banane compte aussi.',
    },
  },

  // 4 ─ Apples with apples ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'English does this already',
    eyebrowVn: 'Tiếng Anh vốn đã làm vậy',
    eyebrowFr: 'L’anglais le fait déjà',
    title: 'Apples With Apples',
    titleVn: 'Táo đi với táo',
    titleFr: 'Les pommes avec les pommes',
    inlineSvg: DIAGRAMS.FRUIT_BAG,
    caption: 'Nobody says "10 apple-bananas". Algebra does not either.',
    captionVn: 'Không ai nói "10 quả táo-chuối". Đại số cũng vậy. (a: số táo, b: số chuối)',
    captionFr: 'Personne ne dit « 10 pommes-bananes ». L’algèbre non plus. (a : pommes, b : bananes)',
  },

  // 5 ─ The Science 2.5 bridge ──────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Science 2.5 did this with atoms',
    eyebrowVn: 'Khoa học 2.5 đã làm vậy với nguyên tử',
    eyebrowFr: 'Les sciences 2.5 l’ont fait avec les atomes',
    title: 'Sorted by Kind',
    titleVn: 'Xếp theo từng loại',
    titleFr: 'Triés par sorte',
    inlineSvg: DIAGRAMS.ATOMS_SORT,
    caption: 'Carbon and oxygen are different elements. Count each kind on its own.',
    captionVn: 'Cacbon và oxi là hai nguyên tố khác nhau. Đếm riêng từng loại. (carbon = cacbon, oxygen = oxi, hydrogen = hiđro)',
    captionFr: 'Le carbone et l’oxygène sont deux éléments différents. Compte chaque sorte à part.',
  },

  // 6 ─ Key word: term (check 2) ────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Term',
    titleVn: 'Hạng tử',
    titleFr: 'Terme',
    ratio: 40,
    inlineSvg: DIAGRAMS.TERMS,
    content: 'An expression is made of **terms**.',
    contentVn: 'Một biểu thức được tạo nên từ các **hạng tử (terms)**.',
    contentFr: 'Une expression est faite de **termes (terms)**.',
    notes: [
      {
        tone: 'write',
        text: '**Term:** one part of an expression.\nThe + and − signs separate the terms.',
        textVn: '**Hạng tử (term):** một phần của biểu thức.\nCác dấu + và − ngăn cách các hạng tử.',
        textFr: '**Terme (term) :** une partie d’une expression.\nLes signes + et − séparent les termes.',
      },
    ],
    check: {
      id: 'c2',
      q: 'How many terms are in $7m − 4 + 2n + m$?',
      qVn: 'Biểu thức $7m − 4 + 2n + m$ có bao nhiêu hạng tử?',
      qFr: 'Combien de termes y a-t-il dans $7m − 4 + 2n + m$ ?',
      options: [
        { val: 'A', text: '$3$', textVn: '$3$', textFr: '$3$' },
        { val: 'B', text: '$4$', textVn: '$4$', textFr: '$4$' },
        { val: 'C', text: '$2$', textVn: '$2$', textFr: '$2$' },
      ],
      correct: 'B',
      expEn: 'The + and − signs cut it into four terms: $7m$, $−4$, $2n$ and $m$. $3$ forgets that a number on its own is a term too; $2$ counts the letters $m$ and $n$, not the terms.',
      expVn: 'Các dấu + và − cắt nó thành bốn hạng tử: $7m$, $−4$, $2n$ và $m$. $3$ là quên rằng một số đứng riêng cũng là một hạng tử; $2$ là đếm các chữ cái $m$ và $n$, không phải đếm hạng tử.',
      expFr: 'Les signes + et − la coupent en quatre termes : $7m$, $−4$, $2n$ et $m$. $3$ oublie qu’un nombre seul est aussi un terme ; $2$ compte les lettres $m$ et $n$, pas les termes.',
    },
  },

  // 7 ─ Words with two meanings (check 3) ───────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Words With Two Meanings',
    titleVn: 'Từ có hai nghĩa',
    titleFr: 'Des mots à deux sens',
    inlineSvg: DIAGRAMS.WORDS,
    caption: 'In maths, **like** means **the same kind**.',
    captionVn: 'Trong toán, **like** nghĩa là **cùng loại**, không phải "thích". **collect** = gộp lại, **simplify** = rút gọn.',
    captionFr: 'En maths, **like** veut dire **de la même sorte**, pas « aimer ». **collect** = regrouper, **simplify** = simplifier.',
    check: {
      id: 'c3',
      q: 'In maths, what are **like terms**?',
      qVn: 'Trong toán, **like terms** là gì?',
      qFr: 'En maths, que veut dire **like terms** ?',
      options: [
        { val: 'A', text: 'Terms that you like', textVn: 'Các hạng tử mà em thích', textFr: 'Des termes que tu aimes' },
        { val: 'B', text: 'Terms of the same kind: the same letters', textVn: 'Các hạng tử cùng loại: cùng chữ cái', textFr: 'Des termes de la même sorte : les mêmes lettres' },
        { val: 'C', text: 'Terms with the same number in front', textVn: 'Các hạng tử có cùng con số đứng trước', textFr: 'Des termes avec le même nombre devant' },
      ],
      correct: 'B',
      expEn: '**Like** here means **the same kind**, not "thích". $2a$ and $5a$ are like terms because both are $a$ terms. The number in front does not have to match: $3y$ and $3$ share a number but are different kinds.',
      expVn: '**Like** ở đây nghĩa là **cùng loại**, không phải "thích". $2a$ và $5a$ là hạng tử đồng dạng vì cả hai đều là hạng tử $a$. Con số đứng trước không cần giống nhau: $3y$ và $3$ có cùng con số nhưng khác loại.',
      expFr: '**Like** veut dire ici **de la même sorte**, pas « aimer ». $2a$ et $5a$ sont des termes semblables, car ce sont deux termes en $a$. Le nombre devant n’a pas besoin d’être le même : $3y$ et $3$ ont le même nombre, mais ce sont deux sortes différentes.',
    },
  },

  // 8 ─ Key word: like terms (check 4) ──────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Like Terms',
    titleVn: 'Hạng tử đồng dạng',
    titleFr: 'Termes semblables',
    ratio: 40,
    inlineSvg: DIAGRAMS.LIKE_UNLIKE,
    content: 'Look at the **letter**, not the number.',
    contentVn: 'Nhìn vào **chữ cái**, không nhìn con số.',
    contentFr: 'Regarde la **lettre**, pas le nombre.',
    notes: [
      {
        tone: 'write',
        text: '**Like terms:** terms that contain the same letter.\n$2a$ and $3a$ are like terms. $2a$ and $3b$ are not.',
        textVn: '**Hạng tử đồng dạng (like terms):** các hạng tử có cùng chữ cái.\n$2a$ và $3a$ là hạng tử đồng dạng. $2a$ và $3b$ thì không.',
        textFr: '**Termes semblables (like terms) :** des termes qui ont la même lettre.\n$2a$ et $3a$ sont des termes semblables. $2a$ et $3b$, non.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Which pair are **like terms**?',
      qVn: 'Cặp nào là **hạng tử đồng dạng**?',
      qFr: 'Quelle paire est formée de **termes semblables** ?',
      options: [
        { val: 'A', text: '$3p$ and $p$', textVn: '$3p$ và $p$', textFr: '$3p$ et $p$' },
        { val: 'B', text: '$5m$ and $5n$', textVn: '$5m$ và $5n$', textFr: '$5m$ et $5n$' },
        { val: 'C', text: '$4y$ and $4$', textVn: '$4y$ và $4$', textFr: '$4y$ et $4$' },
      ],
      correct: 'A',
      expEn: '$3p$ and $p$ both have the letter $p$ — a lone $p$ is $1p$. $5m$ and $5n$ share a number, but the letters are different. $4$ has no letter at all, so it is not a $y$ term.',
      expVn: '$3p$ và $p$ đều có chữ cái $p$ — một chữ $p$ đứng riêng là $1p$. $5m$ và $5n$ có cùng con số, nhưng chữ cái khác nhau. $4$ không có chữ cái nào, nên nó không phải hạng tử $y$.',
      expFr: '$3p$ et $p$ ont tous les deux la lettre $p$ — un $p$ seul, c’est $1p$. $5m$ et $5n$ ont le même nombre, mais les lettres sont différentes. $4$ n’a pas de lettre du tout, donc ce n’est pas un terme en $y$.',
    },
  },

  // 9 ─ Collect and simplify: the fruit stall (terms) ───────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Collect and Simplify',
    titleVn: 'Gộp và rút gọn',
    titleFr: 'Réduire et simplifier',
    ratio: 45,
    image: img('stall.jpg'),
    content: 'Halong Bay: every basket holds **one kind** of fruit.',
    contentVn: 'Vịnh Hạ Long: mỗi rổ chỉ đựng **một loại** trái cây.',
    contentFr: 'Baie d’Halong : chaque panier contient **une seule sorte** de fruit.',
    notes: [
      {
        tone: 'write',
        text: '**Simplify:** write an expression in a shorter way.\n**Collecting like terms:** adding like terms together to simplify.\n$a + a = 2a$ and $2b + 3b = 5b$',
        textVn: '**Rút gọn (simplify):** viết biểu thức ngắn gọn hơn.\n**Thu gọn hạng tử đồng dạng (collecting like terms):** cộng các hạng tử đồng dạng lại để rút gọn.\n$a + a = 2a$ và $2b + 3b = 5b$',
        textFr: '**Simplifier (simplify) :** écrire une expression plus courte.\n**Réduire (collecting like terms) :** additionner les termes semblables pour simplifier.\n$a + a = 2a$ et $2b + 3b = 5b$',
      },
    ],
    activity: {
      id: 'act_terms_stall',
      type: 'terms',
      expr: '4m + 3n + 2m + 5n',
      prompt: 'Like the fruit stall: put each term in its basket, one basket for each kind.',
      promptVn: 'Giống như sạp trái cây: đặt mỗi hạng tử vào rổ của nó, mỗi loại một rổ.',
      promptFr: 'Comme au stand de fruits : mets chaque terme dans son panier, un panier par sorte.',
      explain: 'The $m$ basket holds $4m$ and $2m$, which make $6m$. The $n$ basket holds $3n$ and $5n$, which make $8n$. So $4m + 3n + 2m + 5n = 6m + 8n$.',
      explainVn: 'Rổ $m$ chứa $4m$ và $2m$, cộng lại được $6m$. Rổ $n$ chứa $3n$ và $5n$, cộng lại được $8n$. Vậy $4m + 3n + 2m + 5n = 6m + 8n$.',
      explainFr: 'Le panier $m$ contient $4m$ et $2m$, qui font $6m$. Le panier $n$ contient $3n$ et $5n$, qui font $8n$. Donc $4m + 3n + 2m + 5n = 6m + 8n$.',
    },
  },

  // 10 ─ Find, Move, Collect (widget) ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each step before you press',
    eyebrowVn: 'Nói từng bước trước khi bấm',
    eyebrowFr: 'Dis chaque étape avant d’appuyer',
    title: 'Find, Move, Collect',
    titleVn: 'Tìm, chuyển, gộp',
    titleFr: 'Trouve, bouge, réduis',
    widget: CollectAdd,
    caption: 'Before each press, say out loud what happens next: **find**, **move** or **collect**.',
    captionVn: 'Trước mỗi lần bấm, hãy nói to điều sẽ xảy ra: **tìm**, **chuyển** hay **gộp**.',
    captionFr: 'Avant chaque appui, dis à voix haute ce qui va se passer : **trouver**, **bouger** ou **réduire**.',
  },

  // 11 ─ The invisible 1: 8 or 7s? (predict) ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Which Is Right?',
    titleVn: 'Đáp án nào đúng?',
    titleFr: 'Laquelle est juste ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Simplify $8s − s$',
    textVn: 'Rút gọn $8s − s$',
    textFr: 'Simplifie $8s − s$',
    sub: 'One student says **8**. Another says **7s**.',
    subVn: 'Một bạn nói **8**. Một bạn khác nói **7s**.',
    subFr: 'Un élève dit **8**. Un autre dit **7s**.',
    activity: {
      id: 'act_predict_one',
      type: 'predict',
      prompt: 'Which is right?',
      promptVn: 'Đáp án nào đúng?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'eight', name: '$8$ — the two letters cancel', nameVn: '$8$ — hai chữ cái triệt tiêu nhau', nameFr: '$8$ — les deux lettres s’annulent' },
        { val: 'sevens', name: '$7s$ — one $s$ is taken away', nameVn: '$7s$ — bớt đi một $s$', nameFr: '$7s$ — on enlève un $s$' },
        { val: 'seven', name: '$7$ — eight take away one', nameVn: '$7$ — tám bớt một', nameFr: '$7$ — huit moins un' },
      ],
      correct: 'sevens',
      explain: '$s$ means $1s$. Eight strawberries take away one strawberry is **seven strawberries**: $8s − s = 7s$. The letter never disappears, so $8$ and $7$ are both wrong.',
      explainVn: '$s$ nghĩa là $1s$. Tám quả dâu bớt đi một quả dâu là **bảy quả dâu**: $8s − s = 7s$. Chữ cái không bao giờ biến mất, nên $8$ và $7$ đều sai.',
      explainFr: '$s$ veut dire $1s$. Huit fraises moins une fraise, ça fait **sept fraises** : $8s − s = 7s$. La lettre ne disparaît jamais, donc $8$ et $7$ sont faux tous les deux.',
    },
  },

  // 12 ─ x means 1x (check 5) ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The invisible 1',
    eyebrowVn: 'Số 1 vô hình',
    eyebrowFr: 'Le 1 invisible',
    title: 'x Means 1x',
    titleVn: 'x nghĩa là 1x',
    titleFr: 'x veut dire 1x',
    ratio: 40,
    inlineSvg: DIAGRAMS.ONE_X,
    content: '**$7s$ is right.** The letter never disappears.',
    contentVn: '**$7s$ mới đúng.** Chữ cái không bao giờ biến mất.',
    contentFr: '**$7s$ est juste.** La lettre ne disparaît jamais.',
    notes: [
      {
        tone: 'write',
        text: '$x$ means $1x$.\n$4x + x = 5x$ and $8s − s = 7s$',
        textVn: '$x$ nghĩa là $1x$.\n$4x + x = 5x$ và $8s − s = 7s$',
        textFr: '$x$ veut dire $1x$.\n$4x + x = 5x$ et $8s − s = 7s$',
      },
    ],
    check: {
      id: 'c5',
      q: 'Simplify $6k + k$.',
      qVn: 'Rút gọn $6k + k$.',
      qFr: 'Simplifie $6k + k$.',
      options: [
        { val: 'A', text: '$6k$', textVn: '$6k$', textFr: '$6k$' },
        { val: 'B', text: '$7$', textVn: '$7$', textFr: '$7$' },
        { val: 'C', text: '$6k^2$', textVn: '$6k^2$', textFr: '$6k^2$' },
        { val: 'D', text: '$7k$', textVn: '$7k$', textFr: '$7k$' },
      ],
      correct: 'D',
      expEn: '$k$ means $1k$, so $6k + 1k = 7k$. $6k$ treats the lone $k$ as nothing; $7$ loses the letter; $6k^2$ multiplies instead of adding.',
      expVn: '$k$ nghĩa là $1k$, nên $6k + 1k = 7k$. $6k$ là coi chữ $k$ đứng riêng như không có gì; $7$ là làm mất chữ cái; $6k^2$ là nhân thay vì cộng.',
      expFr: '$k$ veut dire $1k$, donc $6k + 1k = 7k$. $6k$ considère le $k$ seul comme rien ; $7$ perd la lettre ; $6k^2$ multiplie au lieu d’additionner.',
    },
  },

  // 13 ─ Only like terms ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Only Like Terms',
    titleVn: 'Chỉ gộp hạng tử đồng dạng',
    titleFr: 'Seulement les termes semblables',
    ratio: 40,
    inlineSvg: DIAGRAMS.CANT_COLLECT,
    content: 'Can you add 5 cm and 3 kg? No — and you cannot add $3a$ and $2b$ either.',
    contentVn: 'Em có cộng được 5 cm với 3 kg không? Không — và em cũng không cộng được $3a$ với $2b$.',
    contentFr: 'Peux-tu additionner 5 cm et 3 kg ? Non — et tu ne peux pas non plus additionner $3a$ et $2b$.',
    notes: [
      {
        tone: 'write',
        text: 'You can only collect **like terms**.\n$3a + 2b$ cannot be simplified.',
        textVn: 'Em chỉ có thể gộp các **hạng tử đồng dạng**.\n$3a + 2b$ không thể rút gọn.',
        textFr: 'Tu ne peux réduire que les **termes semblables**.\n$3a + 2b$ ne peut pas être simplifié.',
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
    eyebrowFr: 'Peut-on simplifier ?',
    title: 'Tick or Cross?',
    titleVn: 'Đánh dấu ✓ hay ✗?',
    titleFr: 'Coche ou croix ?',
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
    contentFr: 'Décide pour chacune : ✓ et simplifie-la, ou ✗ et laisse-la telle quelle.\n\n**a** $4k + k$\n**b** $3k + 3$\n**c** $7w − 2v$\n**d** $9d − d$',
    reveal: {
      label: 'Check a to d',
      labelVn: 'Kiểm tra câu a đến d',
      labelFr: 'Vérifie de a à d',
      answer: '**a** ✓ $5k$  **b** ✗  **c** ✗  **d** ✓ $8d$\n\n**b** has a $k$ term and a number; **c** has two different letters.',
      answerVn: '**a** ✓ $5k$  **b** ✗  **c** ✗  **d** ✓ $8d$\n\n**b** có một hạng tử $k$ và một số; **c** có hai chữ cái khác nhau.',
      answerFr: '**a** ✓ $5k$  **b** ✗  **c** ✗  **d** ✓ $8d$\n\n**b** a un terme en $k$ et un nombre ; **c** a deux lettres différentes.',
    },
    activity: {
      id: 'act_simp_tick',
      type: 'algebra',
      mode: 'simplify',
      expr: '2m + 5m + 1',
      prompt: '**e** Type the simplest form of $2m + 5m + 1$.',
      promptVn: '**e** Gõ dạng gọn nhất của $2m + 5m + 1$.',
      promptFr: '**e** Tape la forme réduite de $2m + 5m + 1$.',
      explain: '$2m$ and $5m$ are like terms: $7m$. The $1$ is a number, not an $m$ term, so it stays: $7m + 1$. Writing $8m$ adds a number to the $m$ terms.',
      explainVn: '$2m$ và $5m$ là hạng tử đồng dạng: $7m$. Số $1$ là một số, không phải hạng tử $m$, nên giữ nguyên: $7m + 1$. Viết $8m$ là cộng một số vào các hạng tử $m$.',
      explainFr: '$2m$ et $5m$ sont des termes semblables : $7m$. Le $1$ est un nombre, pas un terme en $m$, donc il reste : $7m + 1$. Écrire $8m$, c’est ajouter un nombre aux termes en $m$.',
    },
  },

  // 15 ─ Tricky like terms (check 6) ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ScanEye',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    eyebrowFr: 'Regarde bien',
    title: 'Tricky Like Terms',
    titleVn: 'Hạng tử đồng dạng dễ nhầm',
    titleFr: 'Termes semblables piégeux',
    ratio: 40,
    inlineSvg: DIAGRAMS.TRICKY,
    notes: [
      {
        tone: 'write',
        text: '**Numbers** are like terms: $7 + 2 = 9$.\n$ab$ and $ba$ are like terms, because $a × b = b × a$.\n$x$ and $x^2$ are **not** like terms.',
        textVn: '**Các số** là hạng tử đồng dạng: $7 + 2 = 9$.\n$ab$ và $ba$ là hạng tử đồng dạng, vì $a × b = b × a$.\n$x$ và $x^2$ **không** đồng dạng.',
        textFr: '**Les nombres** sont des termes semblables : $7 + 2 = 9$.\n$ab$ et $ba$ sont des termes semblables, car $a × b = b × a$.\n$x$ et $x^2$ ne sont **pas** semblables.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Which pair are **not** like terms?',
      qVn: 'Cặp nào **không** phải hạng tử đồng dạng?',
      qFr: 'Quelle paire n’est **pas** formée de termes semblables ?',
      options: [
        { val: 'A', text: '$4n$ and $4n^2$', textVn: '$4n$ và $4n^2$', textFr: '$4n$ et $4n^2$' },
        { val: 'B', text: '$3xy$ and $5yx$', textVn: '$3xy$ và $5yx$', textFr: '$3xy$ et $5yx$' },
        { val: 'C', text: '$9$ and $−2$', textVn: '$9$ và $−2$', textFr: '$9$ et $−2$' },
        { val: 'D', text: '$h^2$ and $6h^2$', textVn: '$h^2$ và $6h^2$', textFr: '$h^2$ et $6h^2$' },
      ],
      correct: 'A',
      expEn: '$n^2$ means $n × n$, a different kind from $n$, even with the same $4$ in front. $xy$ and $yx$ are alike because $x × y = y × x$; $9$ and $−2$ are both numbers; $h^2$ and $6h^2$ are both $h^2$ terms.',
      expVn: '$n^2$ nghĩa là $n × n$, khác loại với $n$, dù có cùng số $4$ đứng trước. $xy$ và $yx$ đồng dạng vì $x × y = y × x$; $9$ và $−2$ đều là số; $h^2$ và $6h^2$ đều là hạng tử $h^2$.',
      expFr: '$n^2$ veut dire $n × n$, une sorte différente de $n$, même avec le même $4$ devant. $xy$ et $yx$ sont semblables car $x × y = y × x$ ; $9$ et $−2$ sont tous les deux des nombres ; $h^2$ et $6h^2$ sont tous les deux des termes en $h^2$.',
    },
  },

  // 16 ─ Like or not? (sort) ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'Eight pairs of terms',
    eyebrowVn: 'Tám cặp hạng tử',
    eyebrowFr: 'Huit paires de termes',
    title: 'Like or Not?',
    titleVn: 'Đồng dạng hay không?',
    titleFr: 'Semblables ou non ?',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelFr: 'Trie',
    labelIcon: 'Sparkles',
    text: 'Read the **letters**. Ignore the number in front.',
    textVn: 'Đọc **chữ cái**. Bỏ qua con số đứng trước.',
    textFr: 'Lis les **lettres**. Ignore le nombre devant.',
    sub: 'Remember: $ab$ is $ba$, and a lone letter is $1$ of it.',
    subVn: 'Nhớ rằng: $ab$ là $ba$, và một chữ cái đứng riêng là $1$ lần chữ đó.',
    subFr: 'Rappel : $ab$, c’est $ba$, et une lettre seule en vaut $1$.',
    activity: {
      id: 'act_sort_like',
      type: 'sort',
      prompt: 'Are these like terms? Sort each pair.',
      promptVn: 'Đây có phải hạng tử đồng dạng không? Sắp xếp từng cặp.',
      promptFr: 'Ces termes sont-ils semblables ? Trie chaque paire.',
      bins: [
        { id: 'like', name: 'Like terms', nameVn: 'Đồng dạng', nameFr: 'Semblables' },
        { id: 'not', name: 'Not like terms', nameVn: 'Không đồng dạng', nameFr: 'Pas semblables' },
      ],
      cards: [
        { id: 'p1', name: '$x$ and $7x$', nameVn: '$x$ và $7x$', nameFr: '$x$ et $7x$', bin: 'like' },
        { id: 'p2', name: '$3y$ and $3$', nameVn: '$3y$ và $3$', nameFr: '$3y$ et $3$', bin: 'not' },
        { id: 'p3', name: '$2rd$ and $3dr$', nameVn: '$2rd$ và $3dr$', nameFr: '$2rd$ et $3dr$', bin: 'like' },
        { id: 'p4', name: '$6p$ and $6pq$', nameVn: '$6p$ và $6pq$', nameFr: '$6p$ et $6pq$', bin: 'not' },
        { id: 'p5', name: '$20$ and $−6$', nameVn: '$20$ và $−6$', nameFr: '$20$ et $−6$', bin: 'like' },
        { id: 'p6', name: '$m^2$ and $4m$', nameVn: '$m^2$ và $4m$', nameFr: '$m^2$ et $4m$', bin: 'not' },
        { id: 'p7', name: '$5c$ and $−2c$', nameVn: '$5c$ và $−2c$', nameFr: '$5c$ et $−2c$', bin: 'like' },
        { id: 'p8', name: '$10w$ and $10v$', nameVn: '$10w$ và $10v$', nameFr: '$10w$ et $10v$', bin: 'not' },
      ],
      explain: 'Like: $x$ is $1x$; $rd = dr$; $20$ and $−6$ are both numbers; and a minus sign does not change the kind, so $5c$ and $−2c$ are both $c$ terms. Not like: $3$ has no letter, $pq$ is not $p$, $m^2$ is not $m$, and $w$ is not $v$.',
      explainVn: 'Đồng dạng: $x$ là $1x$; $rd = dr$; $20$ và $−6$ đều là số; và dấu trừ không làm đổi loại, nên $5c$ và $−2c$ đều là hạng tử $c$. Không đồng dạng: $3$ không có chữ cái, $pq$ khác $p$, $m^2$ khác $m$, và $w$ khác $v$.',
      explainFr: 'Semblables : $x$ est $1x$ ; $rd = dr$ ; $20$ et $−6$ sont deux nombres ; et un signe moins ne change pas la sorte, donc $5c$ et $−2c$ sont deux termes en $c$. Pas semblables : $3$ n’a pas de lettre, $pq$ n’est pas $p$, $m^2$ n’est pas $m$, et $w$ n’est pas $v$.',
    },
  },

  // 17 ─ The sign travels: 4x + 6y or 10x + 6y? (predict) ────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Two Answers Disagree',
    titleVn: 'Hai đáp án khác nhau',
    titleFr: 'Deux réponses différentes',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Simplify $7x + 5y − 3x + y$',
    textVn: 'Rút gọn $7x + 5y − 3x + y$',
    textFr: 'Simplifie $7x + 5y − 3x + y$',
    sub: 'One student says $4x + 6y$. Another says $10x + 6y$.',
    subVn: 'Một bạn nói $4x + 6y$. Một bạn khác nói $10x + 6y$.',
    subFr: 'Un élève dit $4x + 6y$. Un autre dit $10x + 6y$.',
    activity: {
      id: 'act_predict_sign',
      type: 'predict',
      prompt: 'Which is right?',
      promptVn: 'Đáp án nào đúng?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'four', name: '$4x + 6y$', nameVn: '$4x + 6y$', nameFr: '$4x + 6y$' },
        { val: 'ten', name: '$10x + 6y$', nameVn: '$10x + 6y$', nameFr: '$10x + 6y$' },
        { val: 'five', name: '$4x + 5y$', nameVn: '$4x + 5y$', nameFr: '$4x + 5y$' },
      ],
      correct: 'four',
      explain: 'The minus belongs to $3x$: $7x − 3x = 4x$, and $5y + y = 6y$. $10x$ left the minus sign behind; $5y$ forgot that $y$ is $1y$. The next slide shows the sign travelling.',
      explainVn: 'Dấu trừ thuộc về $3x$: $7x − 3x = 4x$, và $5y + y = 6y$. $10x$ là bỏ quên dấu trừ; $5y$ là quên rằng $y$ là $1y$. Slide tiếp theo cho thấy dấu đi theo hạng tử.',
      explainFr: 'Le moins appartient à $3x$ : $7x − 3x = 4x$, et $5y + y = 6y$. $10x$ a oublié le signe moins ; $5y$ a oublié que $y$ est $1y$. La diapositive suivante montre le signe qui voyage.',
    },
  },

  // 18 ─ The sign moves too (widget) ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Move',
    eyebrow: 'Watch the minus sign',
    eyebrowVn: 'Theo dõi dấu trừ',
    eyebrowFr: 'Surveille le signe moins',
    title: 'The Sign Moves Too',
    titleVn: 'Dấu cũng di chuyển',
    titleFr: 'Le signe bouge aussi',
    widget: CollectSigns,
    caption: '**$4x + 6y$** is right. Press **Next step** and watch where the **−** goes.',
    captionVn: '**$4x + 6y$** mới đúng. Bấm **Bước tiếp** và xem dấu **−** đi đâu.',
    captionFr: '**$4x + 6y$** est juste. Appuie sur **Suivant** et regarde où va le **−**.',
  },

  // 19 ─ Keep the sign (algebra) ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Keep the Sign',
    titleVn: 'Giữ nguyên dấu',
    titleFr: 'Garde le signe',
    notes: [
      {
        tone: 'write',
        text: 'The sign **in front** of a term belongs to it. Move them together.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
        textVn: 'Dấu **đứng trước** hạng tử thuộc về hạng tử đó. Di chuyển cùng nhau.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
        textFr: 'Le signe **devant** un terme lui appartient. Déplace-les ensemble.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
      },
    ],
    reveal: {
      prompt: 'Work this one out in your head first: $6p + 2q − 4p + 3q$.',
      promptVn: 'Tính nhẩm câu này trước: $6p + 2q − 4p + 3q$.',
      promptFr: 'Calcule celle-ci d’abord dans ta tête : $6p + 2q − 4p + 3q$.',
      label: 'Check it',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer: '$6p − 4p + 2q + 3q = 2p + 5q$',
      answerVn: '$6p − 4p + 2q + 3q = 2p + 5q$',
      answerFr: '$6p − 4p + 2q + 3q = 2p + 5q$',
    },
    activity: {
      id: 'act_simp_sign',
      type: 'algebra',
      mode: 'simplify',
      expr: '9 + 5t − 4 − 2t',
      prompt: 'Type the simplest form of $9 + 5t − 4 − 2t$.',
      promptVn: 'Gõ dạng gọn nhất của $9 + 5t − 4 − 2t$.',
      promptFr: 'Tape la forme réduite de $9 + 5t − 4 − 2t$.',
      explain: 'Move each term with its sign: $5t − 2t + 9 − 4$. The $t$ terms make $3t$ and the numbers make $5$, so the answer is $3t + 5$. $7t$ or $13$ would mean a minus sign was left behind.',
      explainVn: 'Di chuyển mỗi hạng tử cùng dấu của nó: $5t − 2t + 9 − 4$. Các hạng tử $t$ cộng lại được $3t$ và các số được $5$, nên đáp án là $3t + 5$. Ra $7t$ hoặc $13$ nghĩa là đã bỏ quên một dấu trừ.',
      explainFr: 'Déplace chaque terme avec son signe : $5t − 2t + 9 − 4$. Les termes en $t$ font $3t$ et les nombres font $5$, donc la réponse est $3t + 5$. $7t$ ou $13$ voudrait dire qu’un signe moins a été oublié.',
    },
  },

  // 20 ─ A letter is a number (estimate) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Real bricks',
    eyebrowVn: 'Gạch thật',
    eyebrowFr: 'De vraies briques',
    title: 'A Letter Is a Number',
    titleVn: 'Chữ cái là một con số',
    titleFr: 'Une lettre est un nombre',
    inlineSvg: DIAGRAMS.BRICKS_REAL,
    caption: 'Here **x** is not a brick. It is the **length** of one brick — a number.',
    captionVn: 'Ở đây **x** không phải viên gạch. Nó là **chiều dài** của một viên gạch — một con số. (length = chiều dài)',
    captionFr: 'Ici, **x** n’est pas une brique. C’est la **longueur** d’une brique — un nombre. (length = longueur)',
    activity: {
      id: 'act_estimate_bricks',
      type: 'estimate',
      prompt: 'One brick is $x = 22$ cm long. About how long is the row of five bricks, $5x$?',
      promptVn: 'Một viên gạch dài $x = 22$ cm. Hàng năm viên gạch, $5x$, dài khoảng bao nhiêu?',
      promptFr: 'Une brique mesure $x = 22$ cm de long. Quelle est environ la longueur de la rangée de cinq briques, $5x$ ?',
      min: 0,
      max: 300,
      step: 5,
      unit: 'cm',
      answer: 110,
      tolerance: 0.1,
      explain: '$5x$ means $5 × x = 5 × 22 = 110$ cm, just over a metre. The letter stood for a number all along — that is why $5x$ is a length you can work out.',
      explainVn: '$5x$ nghĩa là $5 × x = 5 × 22 = 110$ cm, hơn một mét một chút. Chữ cái luôn đại diện cho một con số — vì vậy $5x$ là một chiều dài em tính được.',
      explainFr: '$5x$ veut dire $5 × x = 5 × 22 = 110$ cm, un peu plus d’un mètre. La lettre représentait un nombre depuis le début — c’est pour ça que $5x$ est une longueur que tu peux calculer.',
    },
  },

  // 21 ─ How long is each row? (check 7) ────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: 'How Long Is Each Row?',
    titleVn: 'Mỗi hàng dài bao nhiêu?',
    titleFr: 'Quelle longueur pour chaque rangée ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.BRICK_ROWS,
    content: 'Work out the length of rows **a** and **b** in **simplest form**. Row **c** is the question.',
    contentVn: 'Tính chiều dài của hàng **a** và **b** ở **dạng gọn nhất**. Hàng **c** là câu hỏi.',
    contentFr: 'Calcule la longueur des rangées **a** et **b** sous **forme réduite**. La rangée **c** est la question.',
    reveal: {
      label: 'Check rows a and b',
      labelVn: 'Kiểm tra hàng a và b',
      labelFr: 'Vérifie les rangées a et b',
      answer: '**a** $x + x + y = 2x + y$\n\n**b** $y + x + y = x + 2y$',
      answerVn: '**a** $x + x + y = 2x + y$\n\n**b** $y + x + y = x + 2y$',
      answerFr: '**a** $x + x + y = 2x + y$\n\n**b** $y + x + y = x + 2y$',
    },
    check: {
      id: 'c7',
      q: 'How long is row **c** ($x$, $y$, $x$, $y$, $x$)?',
      qVn: 'Hàng **c** ($x$, $y$, $x$, $y$, $x$) dài bao nhiêu?',
      qFr: 'Quelle est la longueur de la rangée **c** ($x$, $y$, $x$, $y$, $x$) ?',
      options: [
        { val: 'A', text: '$5xy$ cm', textVn: '$5xy$ cm', textFr: '$5xy$ cm' },
        { val: 'B', text: '$3x + 2y$ cm', textVn: '$3x + 2y$ cm', textFr: '$3x + 2y$ cm' },
        { val: 'C', text: '$x^3y^2$ cm', textVn: '$x^3y^2$ cm', textFr: '$x^3y^2$ cm' },
        { val: 'D', text: '$3x + y$ cm', textVn: '$3x + y$ cm', textFr: '$3x + y$ cm' },
      ],
      correct: 'B',
      expEn: 'Three $x$ bricks make $3x$ and two $y$ bricks make $2y$: $3x + 2y$ cm. $5xy$ joins two different kinds; $x^3y^2$ multiplies instead of adding; $3x + y$ missed a $y$ brick.',
      expVn: 'Ba viên gạch $x$ được $3x$ và hai viên gạch $y$ được $2y$: $3x + 2y$ cm. $5xy$ là gộp hai loại khác nhau; $x^3y^2$ là nhân thay vì cộng; $3x + y$ là bỏ sót một viên gạch $y$.',
      expFr: 'Trois briques $x$ font $3x$ et deux briques $y$ font $2y$ : $3x + 2y$ cm. $5xy$ réunit deux sortes différentes ; $x^3y^2$ multiplie au lieu d’additionner ; $3x + y$ a oublié une brique $y$.',
    },
  },

  // 22 ─ Algebra pyramids (widget) ──────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Triangle',
    eyebrow: 'Say the block before you press',
    eyebrowVn: 'Nói kết quả trước khi bấm',
    eyebrowFr: 'Dis la case avant d’appuyer',
    title: 'Algebra Pyramids',
    titleVn: 'Kim tự tháp đại số',
    titleFr: 'Pyramides algébriques',
    widget: Pyramid,
    caption: 'Each block is the **two blocks under it**, added. Working down, **subtract**.',
    captionVn: 'Mỗi ô bằng **hai ô bên dưới** cộng lại. Khi đi xuống, hãy **trừ**.',
    captionFr: 'Chaque case est la somme des **deux cases du dessous**. En descendant, **soustrais**.',
  },

  // 23 ─ Mr Bowen's homework (sort) ─────────────────────────────────────────
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
    content: 'Mr Bowen gave himself **6 out of 6**.\n\nHe was too generous.',
    contentVn: 'Thầy Bowen tự chấm **6 trên 6**.\n\nThầy đã chấm quá rộng tay.',
    contentFr: 'M. Bowen s’est donné **6 sur 6**.\n\nIl a été trop généreux.',
    activity: {
      id: 'act_sort_homework',
      type: 'sort',
      prompt: 'Sort each of Mr Bowen’s answers: right or wrong?',
      promptVn: 'Sắp xếp từng đáp án của thầy Bowen: đúng hay sai?',
      promptFr: 'Trie chaque réponse de M. Bowen : juste ou fausse ?',
      bins: [
        { id: 'right', name: 'Right', nameVn: 'Đúng', nameFr: 'Juste' },
        { id: 'wrong', name: 'Wrong', nameVn: 'Sai', nameFr: 'Faux' },
      ],
      cards: [
        { id: 'ha', name: '**a** $3x + 5 = 8x$', nameVn: '**a** $3x + 5 = 8x$', nameFr: '**a** $3x + 5 = 8x$', bin: 'wrong' },
        { id: 'hb', name: '**b** $6y − y = 6$', nameVn: '**b** $6y − y = 6$', nameFr: '**b** $6y − y = 6$', bin: 'wrong' },
        { id: 'hc', name: '**c** $5k + k = 6k$', nameVn: '**c** $5k + k = 6k$', nameFr: '**c** $5k + k = 6k$', bin: 'right' },
        { id: 'hd', name: '**d** $4p + 2q + p = 6pq$', nameVn: '**d** $4p + 2q + p = 6pq$', nameFr: '**d** $4p + 2q + p = 6pq$', bin: 'wrong' },
        { id: 'he', name: '**e** $9 + 2w − 4 = 2w + 5$', nameVn: '**e** $9 + 2w − 4 = 2w + 5$', nameFr: '**e** $9 + 2w − 4 = 2w + 5$', bin: 'right' },
        { id: 'hf', name: '**f** $2ab + 3ba$: no like terms', nameVn: '**f** $2ab + 3ba$: không có hạng tử đồng dạng', nameFr: '**f** $2ab + 3ba$ : pas de termes semblables', bin: 'wrong' },
      ],
      explain: '**a** cannot be simplified: $3x$ and $5$ are different kinds. **b** is $5y$, because $y$ means $1y$. **d** is $5p + 2q$. **f** is $5ab$, because $ab$ and $ba$ are like terms. Only **c** and **e** are right: Mr Bowen scores 2 out of 6.',
      explainVn: '**a** không rút gọn được: $3x$ và $5$ khác loại. **b** là $5y$, vì $y$ nghĩa là $1y$. **d** là $5p + 2q$. **f** là $5ab$, vì $ab$ và $ba$ là hạng tử đồng dạng. Chỉ **c** và **e** đúng: thầy Bowen được 2 trên 6.',
      explainFr: '**a** ne peut pas être simplifiée : $3x$ et $5$ sont de sortes différentes. **b** vaut $5y$, car $y$ veut dire $1y$. **d** vaut $5p + 2q$. **f** vaut $5ab$, car $ab$ et $ba$ sont des termes semblables. Seules **c** et **e** sont justes : M. Bowen a 2 sur 6.',
    },
  },

  // 24 ─ The perimeter (algebra) ────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write it, then simplify',
    eyebrowVn: 'Viết ra, rồi rút gọn',
    eyebrowFr: 'Écris-le, puis simplifie',
    title: 'The Perimeter',
    titleVn: 'Chu vi',
    titleFr: 'Le périmètre',
    ratio: 50,
    inlineSvg: DIAGRAMS.RECTANGLE,
    content: 'The **perimeter** is the distance all the way round.\n\nAdd all **four** sides, then collect like terms.',
    contentVn: '**Chu vi (perimeter)** là quãng đường đi hết một vòng quanh hình.\n\nCộng cả **bốn** cạnh, rồi gộp các hạng tử đồng dạng.',
    contentFr: 'Le **périmètre (perimeter)** est la distance tout autour.\n\nAdditionne les **quatre** côtés, puis réduis les termes semblables.',
    activity: {
      id: 'act_simp_perimeter',
      type: 'algebra',
      mode: 'simplify',
      expr: '2x + 1 + x + 2x + 1 + x',
      prompt: 'Going round the rectangle gives $2x + 1 + x + 2x + 1 + x$. Type the perimeter in simplest form.',
      promptVn: 'Đi một vòng quanh hình chữ nhật được $2x + 1 + x + 2x + 1 + x$. Gõ chu vi ở dạng gọn nhất.',
      promptFr: 'Faire le tour du rectangle donne $2x + 1 + x + 2x + 1 + x$. Tape le périmètre sous forme réduite.',
      explain: 'The $x$ terms are $2x + x + 2x + x = 6x$ and the numbers are $1 + 1 = 2$, so the perimeter is $6x + 2$ cm. $3x + 1$ only goes half way round, and $8x$ adds the numbers to the $x$ terms.',
      explainVn: 'Các hạng tử $x$ là $2x + x + 2x + x = 6x$ và các số là $1 + 1 = 2$, nên chu vi là $6x + 2$ cm. $3x + 1$ mới đi được nửa vòng, còn $8x$ là cộng các số vào hạng tử $x$.',
      explainFr: 'Les termes en $x$ sont $2x + x + 2x + x = 6x$ et les nombres sont $1 + 1 = 2$, donc le périmètre est $6x + 2$ cm. $3x + 1$ ne fait que la moitié du tour, et $8x$ ajoute les nombres aux termes en $x$.',
    },
  },

  // 25 ─ Mr Bowen's animals (check 8) ───────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: 'Mr Bowen’s Animals',
    titleVn: 'Những con vật của thầy Bowen',
    titleFr: 'Les animaux de M. Bowen',
    content:
      'Mr Bowen has $4c$ cats. He buys $3c$ more cats and $2d$ dogs.\n\n' +
      'Then $5c$ cats leave. One goldfish, called x, arrives.',
    contentVn:
      'Thầy Bowen có $4c$ con mèo. Thầy mua thêm $3c$ con mèo và $2d$ con chó.\n\n' +
      'Sau đó $5c$ con mèo bỏ đi. Một con cá vàng tên là x đến.',
    contentFr: 'M. Bowen a $4c$ chats. Il achète $3c$ chats de plus et $2d$ chiens.\n\nPuis $5c$ chats s’en vont. Un poisson rouge, appelé x, arrive.',
    check: {
      id: 'c8',
      q: 'How many animals does Mr Bowen have now?',
      qVn: 'Bây giờ thầy Bowen có bao nhiêu con vật?',
      qFr: 'Combien d’animaux M. Bowen a-t-il maintenant ?',
      options: [
        { val: 'A', text: '$2c + 2d + x$', textVn: '$2c + 2d + x$', textFr: '$2c + 2d + x$' },
        { val: 'B', text: '$12c + 2d + 1$', textVn: '$12c + 2d + 1$', textFr: '$12c + 2d + 1$' },
        { val: 'C', text: '$2c + 2d + 1$', textVn: '$2c + 2d + 1$', textFr: '$2c + 2d + 1$' },
        { val: 'D', text: '$5cd + 1$', textVn: '$5cd + 1$', textFr: '$5cd + 1$' },
      ],
      correct: 'C',
      expEn: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$. The goldfish is **1** animal — its name is not a number, so $+ x$ is wrong. $12c$ left the minus sign behind ($4 + 3 + 5$), and $5cd$ joins cats and dogs.',
      expVn: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$. Con cá vàng là **1** con vật — tên của nó không phải là một con số, nên $+ x$ là sai. $12c$ là bỏ quên dấu trừ ($4 + 3 + 5$), còn $5cd$ là gộp mèo với chó.',
      expFr: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$. Le poisson rouge est **1** animal — son nom n’est pas un nombre, donc $+ x$ est faux. $12c$ a oublié le signe moins ($4 + 3 + 5$), et $5cd$ mélange chats et chiens.',
    },
  },

  // 26 ─ Mr Bowen's keys (check 9) ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: 'Mr Bowen’s Keys',
    titleVn: 'Chùm chìa khóa của thầy Bowen',
    titleFr: 'Les clés de M. Bowen',
    content:
      'Mr Bowen walks $3k$ km to school, then $3k$ km home.\n\n' +
      'He cannot find his keys. He walks to school and home again.\n\n' +
      'The keys were in his pocket.',
    contentVn:
      'Thầy Bowen đi bộ $3k$ km đến trường, rồi $3k$ km về nhà.\n\n' +
      'Thầy không tìm thấy chìa khóa. Thầy lại đi bộ đến trường rồi về nhà.\n\n' +
      'Chìa khóa ở trong túi áo của thầy.',
    contentFr: 'M. Bowen marche $3k$ km jusqu’à l’école, puis $3k$ km pour rentrer.\n\nIl ne trouve pas ses clés. Il retourne à l’école, puis rentre encore.\n\nLes clés étaient dans sa poche.',
    check: {
      id: 'c9',
      q: 'How far did Mr Bowen walk?',
      qVn: 'Thầy Bowen đã đi bộ bao xa?',
      qFr: 'Quelle distance M. Bowen a-t-il parcourue ?',
      options: [
        { val: 'A', text: '$12k$ km', textVn: '$12k$ km', textFr: '$12k$ km' },
        { val: 'B', text: '$6k$ km', textVn: '$6k$ km', textFr: '$6k$ km' },
        { val: 'C', text: '$12$ km', textVn: '$12$ km', textFr: '$12$ km' },
        { val: 'D', text: '$81k^4$ km', textVn: '$81k^4$ km', textFr: '$81k^4$ km' },
      ],
      correct: 'A',
      expEn: 'Four walks of $3k$ km: $3k + 3k + 3k + 3k = 12k$ km. $6k$ counts only the first trip there and back; $12$ loses the letter; $81k^4$ multiplies instead of adding. The keys walked $12k$ km too.',
      expVn: 'Bốn lần đi bộ, mỗi lần $3k$ km: $3k + 3k + 3k + 3k = 12k$ km. $6k$ chỉ tính lượt đi và về đầu tiên; $12$ là làm mất chữ cái; $81k^4$ là nhân thay vì cộng. Chùm chìa khóa cũng đã đi $12k$ km.',
      expFr: 'Quatre trajets de $3k$ km : $3k + 3k + 3k + 3k = 12k$ km. $6k$ ne compte que le premier aller-retour ; $12$ perd la lettre ; $81k^4$ multiplie au lieu d’additionner. Les clés ont fait $12k$ km, elles aussi.',
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
    eyebrowFr: 'Avant de commencer les tâches',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu le faire ?',
    content: '> Every orange **Write** panel belongs in your notebook. There are 7.',
    contentVn: '> Mỗi khung **Ghi chép** màu cam đều cần chép vào vở. Có 7 khung.',
    contentFr: '> Chaque encadré orange **À recopier** va dans ton cahier. Il y en a 7.',
    items: [
      { text: 'Say what a **term** and **like terms** are.', textVn: 'Nói được **hạng tử** và **hạng tử đồng dạng** là gì.', textFr: 'Dire ce que sont un **terme** et des **termes semblables**.' },
      { text: '**Simplify** by collecting like terms.', textVn: '**Rút gọn** bằng cách gộp hạng tử đồng dạng.', textFr: '**Simplifier** en réduisant les termes semblables.' },
      { text: 'Remember that $x$ means $1x$.', textVn: 'Nhớ rằng $x$ nghĩa là $1x$.', textFr: 'Se souvenir que $x$ veut dire $1x$.' },
      { text: 'Know that $3a + 2b$ cannot be simplified.', textVn: 'Biết rằng $3a + 2b$ không thể rút gọn.', textFr: 'Savoir que $3a + 2b$ ne peut pas être simplifié.' },
      { text: 'Spot tricky like terms: $ab$ and $ba$, but not $x$ and $x^2$.', textVn: 'Nhận ra hạng tử đồng dạng dễ nhầm: $ab$ và $ba$, nhưng không phải $x$ và $x^2$.', textFr: 'Repérer les termes semblables piégeux : $ab$ et $ba$, mais pas $x$ et $x^2$.' },
      { text: 'Move each **sign** with its term.', textVn: 'Di chuyển **dấu** cùng với hạng tử của nó.', textFr: 'Déplacer chaque **signe** avec son terme.' },
    ],
    check: {
      id: 'c10',
      q: 'Last one: simplify $5m + 2n − m + 4n$.',
      qVn: 'Câu cuối: rút gọn $5m + 2n − m + 4n$.',
      qFr: 'Dernière : simplifie $5m + 2n − m + 4n$.',
      options: [
        { val: 'A', text: '$6m + 6n$', textVn: '$6m + 6n$', textFr: '$6m + 6n$' },
        { val: 'B', text: '$5m + 6n$', textVn: '$5m + 6n$', textFr: '$5m + 6n$' },
        { val: 'C', text: '$10mn$', textVn: '$10mn$', textFr: '$10mn$' },
        { val: 'D', text: '$4m + 6n$', textVn: '$4m + 6n$', textFr: '$4m + 6n$' },
      ],
      correct: 'D',
      expEn: 'Move the minus with $m$: $5m − m = 4m$, and $2n + 4n = 6n$, so $4m + 6n$. $6m$ left the minus sign behind; $5m$ ignored the lone $m$, which is $1m$; $10mn$ joins two different kinds.',
      expVn: 'Di chuyển dấu trừ cùng $m$: $5m − m = 4m$, và $2n + 4n = 6n$, nên được $4m + 6n$. $6m$ là bỏ quên dấu trừ; $5m$ là bỏ qua chữ $m$ đứng riêng, vốn là $1m$; $10mn$ là gộp hai loại khác nhau.',
      expFr: 'Déplace le moins avec $m$ : $5m − m = 4m$, et $2n + 4n = 6n$, donc $4m + 6n$. $6m$ a oublié le signe moins ; $5m$ a ignoré le $m$ seul, qui vaut $1m$ ; $10mn$ mélange deux sortes différentes.',
    },
  },
];
