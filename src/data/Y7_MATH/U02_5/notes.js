// src/data/Y7_MATH/U02_5/notes.js
// 2.5 Constructing and Solving Equations — a self-study reduction of the
// classroom deck (C:\Users\bowen\lessons, content/y7-math/U02_5), rebuilt to the
// algebra-engines density (docs/y7-math/algebra-engines.md §4). 26 layout
// slides, 20 scored items: 10 checks and 10 activities across five activity
// types (algebra · sort · predict · flow · order). No three slides in a row go
// unscored, and no two activities in a row are the same type.
//
// THREE THINGS SHAPE THIS DECK (from the classroom deck, kept).
//
// 1. THE STUDENT HAS ALREADY SOLVED EQUATIONS. The starter is a missing-number
//    box, and in Girl Math the box was called n. Slide 2 gives the box a letter
//    and has the student type the number.
//
// 2. THE ENGLISH IS THE BARRIER. "Reverse" (go backwards) and "inverse" (the
//    opposite operation) look almost the same; "I think of a number" means
//    choose a secret one, not "think about". Slide 4 sorts sentences into the
//    three. Socks and shoes (slides 15–16) carry the order: last on, first off.
//
// 3. TWO MISTAKES COST THE MARKS: doing the operation you see instead of its
//    inverse (x − 4 = 6, so x = 2) and undoing the steps in the wrong order
//    (2a + 4 = 18, halve first, so a = 5). Each classroom hand vote is now a
//    `predict` (slides 5 and 17), settled on the next slide — the first by
//    CHECKING, the second by the stepper.
//
// SPINE:
//   1–2    hero; the box has a name (algebra: x + 7 = 15)
//   3–4    key word equation (check); reverse / inverse / think of (sort)
//   5–8    which is right? (predict); check your answer (check); inverse
//          operation (check); the book's flow chart (check)
//   9–12   Undo It stepper; solve then check (flow); either way round
//          (check); Check It! (sort)
//   13–14  Mr Bowen's number; write it, then solve it (algebra)
//   15–20  getting dressed (order); last on, first off; the second vote
//          (predict); Two Steps stepper; undo the last step first (check);
//          two-step equations (flow)
//   21–25  Mr Bowen's homework (sort); angles (check); notebooks (check);
//          his age of 4; the plant that was −4 cm (check)
//   26     the checklist, with the exit question as the last check
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them.
//  · No whiteboards, pairs, hand votes, paper, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { ReverseOne, ReverseTwo } from './widgets.jsx';

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
    eyebrow: 'Unit 2 · 2.5',
    eyebrowVn: 'Chương 2 · 2.5',
    eyebrowFr: 'Unité 2 · 2.5',
    title: 'Constructing and Solving Equations',
    titleVn: 'Lập và giải phương trình',
    titleFr: 'Écrire et résoudre des équations',
    objective: 'Say what an equation is and what solve means; check an answer by putting it back in; undo each step with its inverse operation, the last step first; and turn "I think of a number…" into an equation and solve it.',
    objectiveVn: 'Nói được phương trình là gì và giải nghĩa là gì; thử lại đáp án bằng cách thay nó vào lại; làm ngược từng bước bằng phép toán ngược, bước cuối trước tiên; và biến "I think of a number…" thành phương trình rồi giải nó.',
    objectiveFr: 'Dire ce qu’est une équation et ce que veut dire résoudre ; vérifier une réponse en la remplaçant dans l’équation ; annuler chaque étape avec son opération inverse, la dernière étape d’abord ; et transformer « Je pense à un nombre… » en équation, puis la résoudre.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'You will **type**, **sort**, **predict** and **reverse** your way through it. **20 things are scored** — the first is a missing-number box on the next slide.',
      textVn: 'Em sẽ **nhập**, **phân loại**, **dự đoán** và **đi ngược** trong suốt bài học. **20 mục được tính điểm** — mục đầu tiên là một ô số còn thiếu ở slide sau.',
      textFr: 'Tu vas la traverser en **tapant**, en **triant**, en **prédisant** et en **inversant**. **20 points sont notés** — le premier est une case de nombre manquant sur la diapositive suivante.',
    },
  },

  // 2 ─ Starter: the box has a name (ALGEBRA) ───────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter',
    eyebrowVn: 'Khởi động',
    eyebrowFr: 'Pour commencer',
    title: 'The Box Has a Name',
    titleVn: 'Ô trống có tên',
    titleFr: 'La case a un nom',
    label: 'Type it',
    labelVn: 'Nhập đáp án',
    labelFr: 'Tape-le',
    labelIcon: 'PenLine',
    text: '**□ + 7 = 15** → **x + 7 = 15**',
    textVn: '**□ + 7 = 15** → **x + 7 = 15**',
    textFr: '**□ + 7 = 15** → **x + 7 = 15**',
    sub: 'In Girl Math, the box was called **n**. A letter is just a box with a name.',
    subVn: 'Trong Girl Math, ô trống tên là **n**. Một chữ cái chỉ là một ô trống có tên.',
    subFr: 'Dans Girl Math, la case s’appelait **n**. Une lettre, c’est juste une case qui a un nom.',
    reveal: {
      prompt: 'Two more boxes: **□ × 4 = 28** and **20 − □ = 11**.',
      promptVn: 'Thêm hai ô nữa: **□ × 4 = 28** và **20 − □ = 11**.',
      promptFr: 'Deux autres cases : **□ × 4 = 28** et **20 − □ = 11**.',
      label: 'Check these two',
      labelVn: 'Kiểm tra hai ô này',
      labelFr: 'Vérifie ces deux-là',
      answer: '**7** and **9**. Every one of these is an **equation**, and you have just **solved** it.',
      answerVn: '**7** và **9**. Mỗi câu này là một **phương trình**, và em vừa **giải** nó.',
      answerFr: '**7** et **9**. Chacune de ces phrases est une **équation**, et tu viens de la **résoudre**.',
    },
    activity: {
      id: 'act_box',
      type: 'algebra',
      mode: 'solve',
      eq: 'x + 7 = 15',
      prompt: 'Solve $x + 7 = 15$. What number is $x$?',
      promptVn: 'Giải $x + 7 = 15$. $x$ là số nào?',
      promptFr: 'Résous $x + 7 = 15$. Quel nombre est $x$ ?',
      explain: '$8 + 7 = 15$, so $x = 8$. A letter in an equation stands for one number you have not found yet.',
      explainVn: '$8 + 7 = 15$, nên $x = 8$. Chữ cái trong phương trình đại diện cho một số mà em chưa tìm ra.',
      explainFr: '$8 + 7 = 15$, donc $x = 8$. Dans une équation, une lettre représente un nombre que tu n’as pas encore trouvé.',
    },
  },

  // 3 ─ Key words: equation, solve (CHECK 1) ────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Equation',
    titleVn: 'Phương trình',
    titleFr: 'Équation',
    ratio: 45,
    inlineSvg: DIAGRAMS.KINDS,
    content: 'You know two of these already. An **expression** has no = sign. A **formula** is a rule for any value.\n\nAn **equation** hides **one** number.',
    contentVn: 'Em đã biết hai loại rồi. **Biểu thức** không có dấu =. **Công thức** là quy tắc đúng với mọi giá trị.\n\n**Phương trình** giấu **một** con số.',
    contentFr: 'Tu en connais déjà deux. Une **expression** n’a pas de signe =. Une **formule** est une règle valable pour n’importe quelle valeur.\n\nUne **équation** cache **un** nombre.',
    notes: [
      {
        tone: 'write',
        text: '**Equation:** has an = sign and an **unknown** number.\n**Solve:** find the value of the unknown.\n$x + 7 = 15$, so $x = 8$',
        textVn: '**Phương trình (equation):** có dấu = và một số **chưa biết** (unknown).\n**Giải (solve):** tìm giá trị của số chưa biết.\n$x + 7 = 15$, nên $x = 8$',
        textFr: '**Équation (equation) :** a un signe = et un nombre **inconnu** (unknown).\n**Résoudre (solve) :** trouver la valeur de l’inconnue.\n$x + 7 = 15$, donc $x = 8$',
      },
    ],
    check: {
      id: 'chk_equation',
      q: 'Which of these is an **equation** with one unknown?',
      qVn: 'Cái nào sau đây là một **phương trình** có một số chưa biết?',
      qFr: 'Laquelle est une **équation** avec une inconnue ?',
      options: [
        { val: 'A', text: '$4n − 1$', textVn: '$4n − 1$', textFr: '$4n − 1$' },
        { val: 'B', text: '$y + 9 = 16$', textVn: '$y + 9 = 16$', textFr: '$y + 9 = 16$' },
        { val: 'C', text: '$A = lw$', textVn: '$A = lw$', textFr: '$A = lw$' },
        { val: 'D', text: '$12 − 5 = 7$', textVn: '$12 − 5 = 7$', textFr: '$12 − 5 = 7$' },
      ],
      correct: 'B',
      expEn: '$y + 9 = 16$ has an = sign and one unknown number, $y$ (it is 7). $4n − 1$ has no = sign, so it is an expression. $A = lw$ is a formula: a rule for any length and width. $12 − 5 = 7$ has nothing unknown.',
      expVn: '$y + 9 = 16$ có dấu = và một số chưa biết là $y$ (bằng 7). $4n − 1$ không có dấu =, nên là biểu thức. $A = lw$ là công thức: một quy tắc cho mọi chiều dài và chiều rộng. $12 − 5 = 7$ không có gì chưa biết.',
      expFr: '$y + 9 = 16$ a un signe = et un nombre inconnu, $y$ (c’est 7). $4n − 1$ n’a pas de signe =, donc c’est une expression. $A = lw$ est une formule : une règle pour n’importe quelle longueur et largeur. $12 − 5 = 7$ n’a rien d’inconnu.',
    },
  },

  // 4 ─ English check: reverse / inverse / think of (SORT) ──────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Three Words to Watch',
    titleVn: 'Ba từ cần chú ý',
    titleFr: 'Trois mots à surveiller',
    inlineSvg: DIAGRAMS.WORDS,
    caption: '**Reverse** and **inverse** look the same. They are not.',
    captionVn: '**Reverse** = đi ngược lại. **Inverse** = phép ngược. **think of a number** = nghĩ ra một số và giữ bí mật.',
    captionFr: '**Reverse** et **inverse** se ressemblent. Ce n’est pas la même chose.',
    activity: {
      id: 'act_words',
      type: 'sort',
      prompt: 'Which word does each sentence need? Sort them.',
      promptVn: 'Mỗi câu cần từ nào? Hãy phân loại.',
      promptFr: 'De quel mot chaque phrase a-t-elle besoin ? Trie-les.',
      bins: [
        { id: 'reverse', name: '**reverse** — go backwards', nameVn: '**reverse** — đi ngược lại', nameFr: '**reverse** — aller à l’envers' },
        { id: 'inverse', name: '**inverse** — the opposite operation', nameVn: '**inverse** — phép toán ngược', nameFr: '**inverse** — l’opération contraire' },
        { id: 'think', name: '**think of** — choose a secret number', nameVn: '**think of** — chọn một số bí mật', nameFr: '**think of** — choisir un nombre secret' },
      ],
      cards: [
        { id: 'w1', name: 'The car goes backwards out of the gate.', nameVn: 'Chiếc xe lùi ra khỏi cổng.', nameFr: 'La voiture sort du portail en marche arrière.', bin: 'reverse' },
        { id: 'w2', name: 'Go along the flow chart from right to left.', nameVn: 'Đi theo sơ đồ từ phải sang trái.', nameFr: 'Parcours l’organigramme de droite à gauche.', bin: 'reverse' },
        { id: 'w3', name: '$− 5$ undoes $+ 5$.', nameVn: '$− 5$ làm ngược $+ 5$.', nameFr: '$− 5$ annule $+ 5$.', bin: 'inverse' },
        { id: 'w4', name: '$÷ 3$ undoes $× 3$.', nameVn: '$÷ 3$ làm ngược $× 3$.', nameFr: '$÷ 3$ annule $× 3$.', bin: 'inverse' },
        { id: 'w5', name: 'Choose a number and do not tell anyone.', nameVn: 'Chọn một số và không nói cho ai biết.', nameFr: 'Choisis un nombre et ne le dis à personne.', bin: 'think' },
        { id: 'w6', name: 'Call the secret number $n$.', nameVn: 'Gọi số bí mật đó là $n$.', nameFr: 'Appelle le nombre secret $n$.', bin: 'think' },
      ],
      explain: '**Reverse** is about direction: backwards, right to left. **Inverse** is about the operation: the one that undoes it. **I think of a number** means choose one and keep it secret — not "think about".',
      explainVn: '**Reverse** nói về hướng: đi lùi, từ phải sang trái. **Inverse** nói về phép toán: phép làm ngược lại nó. **I think of a number** nghĩa là chọn một số và giữ bí mật — không phải "nghĩ về".',
      explainFr: '**Reverse** parle de direction : à l’envers, de droite à gauche. **Inverse** parle de l’opération : celle qui l’annule. **I think of a number** veut dire en choisir un et le garder secret — pas « réfléchir à ».',
    },
  },

  // 5 ─ The first vote: x − 4 = 6 (PREDICT) ─────────────────────────────────
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
    text: 'Solve $x − 4 = 6$',
    textVn: 'Giải $x − 4 = 6$',
    textFr: 'Résous $x − 4 = 6$',
    sub: 'One student says **x = 2**. Another says **x = 10**. Only one can be right.',
    subVn: 'Một bạn nói **x = 2**. Một bạn khác nói **x = 10**. Chỉ một bạn đúng.',
    subFr: 'Un élève dit **x = 2**. Un autre dit **x = 10**. Un seul peut avoir raison.',
    activity: {
      id: 'act_vote_x',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptVn: 'Đáp án nào đúng?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'two', name: '$x = 2$', nameVn: '$x = 2$', nameFr: '$x = 2$' },
        { val: 'ten', name: '$x = 10$', nameVn: '$x = 10$', nameFr: '$x = 10$' },
        { val: 'both', name: 'Both — it depends how you work it out', nameVn: 'Cả hai — tùy cách em tính', nameFr: 'Les deux — ça dépend de la façon de calculer' },
      ],
      correct: 'ten',
      explain: '$x = 10$. Do not guess — put each answer back in: $10 − 4 = 6$, but $2 − 4 = −2$. An equation has one answer, and the next slide shows how to prove it.',
      explainVn: '$x = 10$. Đừng đoán — thay từng đáp án vào lại: $10 − 4 = 6$, nhưng $2 − 4 = −2$. Phương trình chỉ có một đáp án, và slide sau cho em thấy cách chứng minh.',
      explainFr: '$x = 10$. Ne devine pas — remplace avec chaque réponse : $10 − 4 = 6$, mais $2 − 4 = −2$. Une équation a une seule réponse, et la diapositive suivante montre comment le prouver.',
    },
  },

  // 6 ─ Check your answer (CHECK 2) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'CheckCircle2',
    eyebrow: 'Do not guess',
    eyebrowVn: 'Đừng đoán',
    eyebrowFr: 'Ne devine pas',
    title: 'Check Your Answer',
    titleVn: 'Thử lại đáp án',
    titleFr: 'Vérifie ta réponse',
    ratio: 45,
    inlineSvg: DIAGRAMS.CHECK,
    content: '**x = 10 is right.** $x = 2$ comes from doing the subtraction you can see.\n\nYou met substitution in 2.2. It settles every argument.',
    contentVn: '**x = 10 mới đúng.** $x = 2$ là do làm luôn phép trừ mà em nhìn thấy.\n\nEm đã học thay số ở bài 2.2. Nó giải quyết mọi tranh cãi.',
    contentFr: '**x = 10 est juste.** $x = 2$ vient de la soustraction que tu vois.\n\nTu as vu le remplacement en 2.2. Il règle toutes les disputes.',
    notes: [
      {
        tone: 'write',
        text: '**Check:** substitute your answer back into the equation.\n$10 − 4 = 6$ ✓',
        textVn: '**Thử lại (check):** thay đáp án của em vào lại phương trình.\n$10 − 4 = 6$ ✓',
        textFr: '**Vérifier (check) :** remplace ta réponse dans l’équation.\n$10 − 4 = 6$ ✓',
      },
    ],
    check: {
      id: 'chk_substitute',
      q: 'Which answer to $x − 8 = 5$ passes the check?',
      qVn: 'Đáp án nào của $x − 8 = 5$ thử lại thấy đúng?',
      qFr: 'Quelle réponse à $x − 8 = 5$ passe la vérification ?',
      options: [
        { val: 'A', text: '$x = −3$', textVn: '$x = −3$', textFr: '$x = −3$' },
        { val: 'B', text: '$x = 3$', textVn: '$x = 3$', textFr: '$x = 3$' },
        { val: 'C', text: '$x = 13$', textVn: '$x = 13$', textFr: '$x = 13$' },
      ],
      correct: 'C',
      expEn: 'Put each one back in: $13 − 8 = 5$ ✓. But $−3 − 8 = −11$ and $3 − 8 = −5$. $−3$ did the $− 8$ instead of undoing it; $3$ took 5 from 8, the wrong way round.',
      expVn: 'Thay từng đáp án vào lại: $13 − 8 = 5$ ✓. Nhưng $−3 − 8 = −11$ và $3 − 8 = −5$. $−3$ là làm luôn phép $− 8$ thay vì làm ngược nó; $3$ là lấy 8 trừ 5, ngược chiều.',
      expFr: 'Remplace avec chacune : $13 − 8 = 5$ ✓. Mais $−3 − 8 = −11$ et $3 − 8 = −5$. $−3$ a fait le $− 8$ au lieu de l’annuler ; $3$ a enlevé 5 de 8, dans le mauvais sens.',
    },
  },

  // 7 ─ Inverse operation (CHECK 3) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    side: 'left',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Inverse Operation',
    titleVn: 'Phép toán ngược',
    titleFr: 'Opération inverse',
    ratio: 45,
    inlineSvg: DIAGRAMS.INVERSES,
    content: 'Do it, then undo it, and you are back where you started.\n\nIn Unit 1 "the inverse of 5" was $−5$. Here the word names an **operation**.',
    contentVn: 'Làm một phép, rồi làm ngược lại, và em trở về chỗ ban đầu.\n\nỞ Chương 1, "số đối của 5" là $−5$. Ở đây từ này chỉ một **phép toán**.',
    contentFr: 'Fais-le, puis annule-le, et tu reviens au point de départ.\n\nDans l’unité 1, « the inverse of 5 » était $−5$ (l’opposé). Ici, le mot désigne une **opération**.',
    notes: [
      {
        tone: 'write',
        text: '**Inverse operation:** the operation that undoes another.\n+ and − are inverses. × and ÷ are inverses.',
        textVn: '**Phép toán ngược (inverse operation):** phép toán xóa bỏ tác dụng của một phép toán khác.\n+ và − là hai phép ngược nhau. × và ÷ là hai phép ngược nhau.',
        textFr: '**Opération inverse (inverse operation) :** l’opération qui annule une autre.\n+ et − sont inverses. × et ÷ sont inverses.',
      },
    ],
    check: {
      id: 'chk_inverse',
      q: 'In $\\frac{x}{4} = 3$, what is done to $x$, and what undoes it?',
      qVn: 'Trong $\\frac{x}{4} = 3$, phép toán nào được làm với $x$, và phép nào làm ngược nó?',
      qFr: 'Dans $\\frac{x}{4} = 3$, qu’est-ce qu’on fait à $x$, et qu’est-ce qui l’annule ?',
      options: [
        { val: 'A', text: '$÷ 4$, undone by $× 4$', textVn: '$÷ 4$, làm ngược bằng $× 4$', textFr: '$÷ 4$, annulé par $× 4$' },
        { val: 'B', text: '$÷ 4$, undone by $− 4$', textVn: '$÷ 4$, làm ngược bằng $− 4$', textFr: '$÷ 4$, annulé par $− 4$' },
        { val: 'C', text: '$× 4$, undone by $÷ 4$', textVn: '$× 4$, làm ngược bằng $÷ 4$', textFr: '$× 4$, annulé par $÷ 4$' },
        { val: 'D', text: '$− 4$, undone by $+ 4$', textVn: '$− 4$, làm ngược bằng $+ 4$', textFr: '$− 4$, annulé par $+ 4$' },
      ],
      correct: 'A',
      expEn: 'The fraction line means divide: $x ÷ 4$. The inverse of ÷ is ×, so $× 4$ undoes it and $x = 12$. B pairs ÷ with −, which are not inverses. C and D misread the fraction line.',
      expVn: 'Vạch phân số nghĩa là chia: $x ÷ 4$. Phép ngược của ÷ là ×, nên $× 4$ làm ngược nó và $x = 12$. B ghép ÷ với −, hai phép này không ngược nhau. C và D đọc sai vạch phân số.',
      expFr: 'La barre de fraction veut dire diviser : $x ÷ 4$. L’inverse de ÷ est ×, donc $× 4$ l’annule et $x = 12$. B associe ÷ avec −, qui ne sont pas inverses. C et D lisent mal la barre de fraction.',
    },
  },

  // 8 ─ The book's flow chart (CHECK 4) ─────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'RotateCcw',
    eyebrow: 'The book’s method',
    eyebrowVn: 'Phương pháp trong sách',
    eyebrowFr: 'La méthode du livre',
    title: 'Reverse the Flow Chart',
    titleVn: 'Đi ngược sơ đồ',
    titleFr: 'L’organigramme à l’envers',
    ratio: 45,
    inlineSvg: DIAGRAMS.FLOW,
    content: '**Forward:** what happens to $x$.\n\n**Backwards:** start at the answer and undo it, one box at a time.',
    contentVn: '**Đi xuôi:** điều gì xảy ra với $x$.\n\n**Đi ngược:** bắt đầu từ kết quả và làm ngược lại, từng ô một.',
    contentFr: '**À l’endroit :** ce qui arrive à $x$.\n\n**À l’envers :** pars de la réponse et annule, une case à la fois.',
    notes: [
      {
        tone: 'write',
        text: 'To **solve**, reverse the flow chart.\nUse the **inverse** of each operation.\n$x + 5 = 12$, so $x = 12 − 5 = 7$',
        textVn: 'Để **giải**, đi ngược sơ đồ (flow chart).\nDùng phép **ngược** của mỗi phép toán.\n$x + 5 = 12$, nên $x = 12 − 5 = 7$',
        textFr: 'Pour **résoudre**, parcours l’organigramme (flow chart) à l’envers.\nUtilise l’**inverse** de chaque opération.\n$x + 5 = 12$, donc $x = 12 − 5 = 7$',
      },
    ],
    check: {
      id: 'chk_reverse_box',
      q: 'For $x − 6 = 10$, the forward box is $− 6$. What goes in the reverse box?',
      qVn: 'Với $x − 6 = 10$, ô đi xuôi là $− 6$. Ô đi ngược ghi gì?',
      qFr: 'Pour $x − 6 = 10$, la case à l’endroit est $− 6$. Que va-t-il dans la case à l’envers ?',
      options: [
        { val: 'A', text: '$− 6$', textVn: '$− 6$', textFr: '$− 6$' },
        { val: 'B', text: '$÷ 6$', textVn: '$÷ 6$', textFr: '$÷ 6$' },
        { val: 'C', text: '$× 6$', textVn: '$× 6$', textFr: '$× 6$' },
        { val: 'D', text: '$+ 6$', textVn: '$+ 6$', textFr: '$+ 6$' },
      ],
      correct: 'D',
      expEn: 'The reverse box holds the inverse, $+ 6$: $x = 10 + 6 = 16$. Copying $− 6$ does the operation again and gives 4, but $4 − 6$ is not 10. × and ÷ undo each other, not a −.',
      expVn: 'Ô đi ngược ghi phép ngược, $+ 6$: $x = 10 + 6 = 16$. Chép lại $− 6$ là làm lại chính phép đó và ra 4, nhưng $4 − 6$ không bằng 10. × và ÷ làm ngược nhau, không làm ngược phép −.',
      expFr: 'La case à l’envers contient l’inverse, $+ 6$ : $x = 10 + 6 = 16$. Recopier $− 6$ refait l’opération et donne 4, mais $4 − 6$ ne fait pas 10. × et ÷ s’annulent l’un l’autre, pas un −.',
    },
  },

  // 9 ─ The stepper: one step ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each box before you press',
    eyebrowVn: 'Nói từng ô trước khi bấm',
    eyebrowFr: 'Dis chaque case avant d’appuyer',
    title: 'Undo It',
    titleVn: 'Làm ngược lại',
    titleFr: 'Annule-le',
    widget: ReverseOne,
    caption: 'Say what goes in each box **before** you press **Next box**. The last press checks the answer.',
    captionVn: 'Nói điều gì sẽ vào mỗi ô **trước khi** bấm **Ô tiếp**. Lần bấm cuối cùng sẽ thử lại đáp án.',
    captionFr: 'Dis ce qui va dans chaque case **avant** d’appuyer sur **Suivant**. Le dernier appui vérifie la réponse.',
  },

  // 10 ─ Solve, then check (FLOW) ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Solve, Then Check',
    titleVn: 'Giải, rồi thử lại',
    titleFr: 'Résous, puis vérifie',
    content:
      '**a** $x + 8 = 20$\n' +
      '**b** $x − 7 = 9$\n' +
      '**c** $6 + x = 14$\n' +
      '**d** $6x = 42$\n' +
      '**e** $x − 15 = 20$\n\n' +
      'Reverse the flow chart for **d** below. Solve the other four, then check them.',
    contentVn:
      '**a** $x + 8 = 20$\n' +
      '**b** $x − 7 = 9$\n' +
      '**c** $6 + x = 14$\n' +
      '**d** $6x = 42$\n' +
      '**e** $x − 15 = 20$\n\n' +
      'Đi ngược sơ đồ của câu **d** ở bên dưới. Giải bốn câu còn lại, rồi kiểm tra.',
    contentFr: '**a** $x + 8 = 20$\n**b** $x − 7 = 9$\n**c** $6 + x = 14$\n**d** $6x = 42$\n**e** $x − 15 = 20$\n\nParcours l’organigramme de **d** à l’envers ci-dessous. Résous les quatre autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b, c and e',
      labelVn: 'Kiểm tra a, b, c và e',
      labelFr: 'Vérifie a, b, c et e',
      answer: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$ ($6 + x$ is the same as $x + 6$), **e** $x = 35$',
      answerVn: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$ ($6 + x$ cũng giống $x + 6$), **e** $x = 35$',
      answerFr: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$ ($6 + x$, c’est pareil que $x + 6$), **e** $x = 35$',
    },
    activity: {
      id: 'act_flow_6x',
      type: 'flow',
      eq: '6x = 42',
      prompt: 'Reverse the flow chart for **d** $6x = 42$.',
      promptVn: 'Đi ngược sơ đồ của câu **d** $6x = 42$.',
      promptFr: 'Parcours à l’envers l’organigramme de **d** $6x = 42$.',
      explain: '$6x$ means $x × 6$. The inverse of $× 6$ is $÷ 6$: $42 ÷ 6 = 7$. Check: $6 × 7 = 42$ ✓.',
      explainVn: '$6x$ nghĩa là $x × 6$. Phép ngược của $× 6$ là $÷ 6$: $42 ÷ 6 = 7$. Thử lại: $6 × 7 = 42$ ✓.',
      explainFr: '$6x$ veut dire $x × 6$. L’inverse de $× 6$ est $÷ 6$ : $42 ÷ 6 = 7$. Vérifie : $6 × 7 = 42$ ✓.',
    },
  },

  // 11 ─ Either way round (CHECK 5) ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    eyebrowFr: 'Regarde bien',
    title: 'Either Way Round',
    titleVn: 'Viết chiều nào cũng được',
    titleFr: 'Dans les deux sens',
    content: 'The unknown can sit on the **right** of the = sign. Nothing changes: an = sign reads both ways.',
    contentVn: 'Số chưa biết có thể nằm ở **bên phải** dấu =. Không có gì thay đổi: dấu = đọc chiều nào cũng được.',
    contentFr: 'L’inconnue peut être à **droite** du signe =. Rien ne change : un signe = se lit dans les deux sens.',
    notes: [
      {
        tone: 'write',
        text: '$14 = x + 3$ means the same as $x + 3 = 14$.',
        textVn: '$14 = x + 3$ có nghĩa giống như $x + 3 = 14$.',
        textFr: '$14 = x + 3$ veut dire la même chose que $x + 3 = 14$.',
      },
    ],
    reveal: {
      prompt: 'Two more: **b** $35 = 5x$, **c** $9 = x − 4$.',
      promptVn: 'Thêm hai câu: **b** $35 = 5x$, **c** $9 = x − 4$.',
      promptFr: 'Encore deux : **b** $35 = 5x$, **c** $9 = x − 4$.',
      label: 'Check b and c',
      labelVn: 'Kiểm tra b và c',
      labelFr: 'Vérifie b et c',
      answer: '**b** $35 ÷ 5 = 7$, so $x = 7$. **c** $9 + 4 = 13$, so $x = 13$.',
      answerVn: '**b** $35 ÷ 5 = 7$, nên $x = 7$. **c** $9 + 4 = 13$, nên $x = 13$.',
      answerFr: '**b** $35 ÷ 5 = 7$, donc $x = 7$. **c** $9 + 4 = 13$, donc $x = 13$.',
    },
    check: {
      id: 'chk_either_way',
      q: '**a** Solve $20 = x + 6$.',
      qVn: '**a** Giải $20 = x + 6$.',
      qFr: '**a** Résous $20 = x + 6$.',
      options: [
        { val: 'A', text: '$x = 26$', textVn: '$x = 26$', textFr: '$x = 26$' },
        { val: 'B', text: '$x = 14$', textVn: '$x = 14$', textFr: '$x = 14$' },
        { val: 'C', text: '$x = −14$', textVn: '$x = −14$', textFr: '$x = −14$' },
      ],
      correct: 'B',
      expEn: 'Read it as $x + 6 = 20$. Undo $+ 6$ with $− 6$: $20 − 6 = 14$. Check: $14 + 6 = 20$ ✓. 26 added the 6 instead of undoing it; $−14$ worked out $6 − 20$, the wrong way round.',
      expVn: 'Đọc thành $x + 6 = 20$. Làm ngược $+ 6$ bằng $− 6$: $20 − 6 = 14$. Thử lại: $14 + 6 = 20$ ✓. 26 là cộng thêm 6 thay vì làm ngược; $−14$ là tính $6 − 20$, ngược chiều.',
      expFr: 'Lis-la comme $x + 6 = 20$. Annule $+ 6$ avec $− 6$ : $20 − 6 = 14$. Vérifie : $14 + 6 = 20$ ✓. 26 a ajouté le 6 au lieu de l’annuler ; $−14$ a calculé $6 − 20$, dans le mauvais sens.',
    },
  },

  // 12 ─ Check It! (SORT) ───────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'CheckCircle2',
    eyebrow: 'Put each answer back in',
    eyebrowVn: 'Thay từng đáp án vào lại',
    eyebrowFr: 'Remplace avec chaque réponse',
    title: 'Check It!',
    titleVn: 'Thử lại nào!',
    titleFr: 'Vérifie !',
    label: 'Sort it',
    labelVn: 'Phân loại',
    labelFr: 'Trie',
    labelIcon: 'Sparkles',
    text: 'Each equation is solved already. **Is the answer right?**',
    textVn: 'Mỗi phương trình đã được giải sẵn. **Đáp án có đúng không?**',
    textFr: 'Chaque équation est déjà résolue. **La réponse est-elle juste ?**',
    sub: 'Do not solve them. Put the answer back in and see if the equation is true.',
    subVn: 'Đừng giải lại. Thay đáp án vào và xem phương trình có đúng không.',
    subFr: 'Ne les résous pas. Remplace avec la réponse et regarde si l’équation est vraie.',
    activity: {
      id: 'act_check_it',
      type: 'sort',
      prompt: 'Sort each solved equation.',
      promptVn: 'Phân loại từng phương trình đã giải.',
      promptFr: 'Trie chaque équation résolue.',
      bins: [
        { id: 'ok', name: 'Right — it checks', nameVn: 'Đúng — thử lại thấy đúng', nameFr: 'Juste — la vérification marche' },
        { id: 'bad', name: 'Wrong — the check fails', nameVn: 'Sai — thử lại thấy sai', nameFr: 'Faux — la vérification rate' },
      ],
      cards: [
        { id: 'k1', name: '$x − 3 = 8$, so $x = 5$', nameVn: '$x − 3 = 8$, nên $x = 5$', nameFr: '$x − 3 = 8$, donc $x = 5$', bin: 'bad' },
        { id: 'k2', name: '$4x = 28$, so $x = 7$', nameVn: '$4x = 28$, nên $x = 7$', nameFr: '$4x = 28$, donc $x = 7$', bin: 'ok' },
        { id: 'k3', name: '$x + 12 = 20$, so $x = 32$', nameVn: '$x + 12 = 20$, nên $x = 32$', nameFr: '$x + 12 = 20$, donc $x = 32$', bin: 'bad' },
        { id: 'k4', name: '$15 = x + 6$, so $x = 9$', nameVn: '$15 = x + 6$, nên $x = 9$', nameFr: '$15 = x + 6$, donc $x = 9$', bin: 'ok' },
        { id: 'k5', name: '$x − 10 = 5$, so $x = −5$', nameVn: '$x − 10 = 5$, nên $x = −5$', nameFr: '$x − 10 = 5$, donc $x = −5$', bin: 'bad' },
        { id: 'k6', name: '$30 = 5x$, so $x = 6$', nameVn: '$30 = 5x$, nên $x = 6$', nameFr: '$30 = 5x$, donc $x = 6$', bin: 'ok' },
        { id: 'k7', name: '$x + 8 = 8$, so $x = 0$', nameVn: '$x + 8 = 8$, nên $x = 0$', nameFr: '$x + 8 = 8$, donc $x = 0$', bin: 'ok' },
        { id: 'k8', name: '$7x = 7$, so $x = 0$', nameVn: '$7x = 7$, nên $x = 0$', nameFr: '$7x = 7$, donc $x = 0$', bin: 'bad' },
      ],
      explain: 'The wrong four fail their checks: $5 − 3 = 2$, $32 + 12 = 44$, $−5 − 10 = −15$ and $7 × 0 = 0$. They should be 11, 8, 15 and 1. $x = 0$ is a good answer to $x + 8 = 8$: $0 + 8 = 8$.',
      explainVn: 'Bốn câu sai không qua được phép thử: $5 − 3 = 2$, $32 + 12 = 44$, $−5 − 10 = −15$ và $7 × 0 = 0$. Đáp án đúng là 11, 8, 15 và 1. $x = 0$ là đáp án đúng của $x + 8 = 8$: $0 + 8 = 8$.',
      explainFr: 'Les quatre fausses ratent leur vérification : $5 − 3 = 2$, $32 + 12 = 44$, $−5 − 10 = −15$ et $7 × 0 = 0$. Elles devraient donner 11, 8, 15 et 1. $x = 0$ est une bonne réponse à $x + 8 = 8$ : $0 + 8 = 8$.',
    },
  },

  // 13 ─ Mr Bowen's number: sentence to equation ────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it as an equation',
    eyebrowVn: 'Nói thành phương trình',
    eyebrowFr: 'Dis-le avec une équation',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    titleFr: 'Le nombre de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.SENTENCE,
    content: '"I think of a number and subtract 5. My answer is 21." What number did Mr Bowen **first think of**?\n\nTurn each phrase into maths. Then solve it: **26**.',
    contentVn: '"Thầy nghĩ ra một số rồi trừ đi 5. Kết quả là 21." Lúc đầu thầy Bowen **đã nghĩ ra** số nào?\n\nBiến từng cụm từ thành toán. Rồi giải: **26**.',
    contentFr: '« Je pense à un nombre et je soustrais 5. Ma réponse est 21. » À quel nombre M. Bowen a-t-il **pensé au départ** ?\n\nTransforme chaque morceau de phrase en maths. Puis résous : **26**.',
    notes: [
      {
        tone: 'write',
        text: '**I think of a number:** call it $n$.\n$n − 5 = 21$, so $n = 21 + 5 = 26$',
        textVn: '**I think of a number** (nghĩ ra một số): gọi số đó là $n$.\n$n − 5 = 21$, nên $n = 21 + 5 = 26$',
        textFr: '**I think of a number** (je pense à un nombre) : appelle-le $n$.\n$n − 5 = 21$, donc $n = 21 + 5 = 26$',
      },
    ],
  },

  // 14 ─ Write it, then solve it (ALGEBRA) ──────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Write It, Then Solve It',
    titleVn: 'Viết ra, rồi giải',
    titleFr: 'Écris-la, puis résous-la',
    content:
      'I think of a number and…\n\n' +
      '**a** add 13. The answer is 30.\n' +
      '**b** subtract 8. The answer is 15.\n' +
      '**c** multiply it by 6. The answer is 54.\n' +
      '**d** divide it by 4. The answer is 5.\n\n' +
      'Equation first, then the number. Type **d** below.',
    contentVn:
      'Thầy nghĩ ra một số rồi…\n\n' +
      '**a** cộng 13. Kết quả là 30.\n' +
      '**b** trừ đi 8. Kết quả là 15.\n' +
      '**c** nhân nó với 6. Kết quả là 54.\n' +
      '**d** chia nó cho 4. Kết quả là 5.\n\n' +
      'Viết phương trình trước, rồi tìm số. Nhập câu **d** ở bên dưới.',
    contentFr: 'Je pense à un nombre et…\n\n**a** j’ajoute 13. La réponse est 30.\n**b** je soustrais 8. La réponse est 15.\n**c** je le multiplie par 6. La réponse est 54.\n**d** je le divise par 4. La réponse est 5.\n\nL’équation d’abord, puis le nombre. Tape **d** ci-dessous.',
    reveal: {
      label: 'Check a, b and c',
      labelVn: 'Kiểm tra a, b và c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$',
      answerVn: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$',
      answerFr: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$',
    },
    activity: {
      id: 'act_think_d',
      type: 'algebra',
      mode: 'solve',
      eq: 'n/4 = 5',
      prompt: '**d** I think of a number and divide it by 4. The answer is 5. What is the number?',
      promptVn: '**d** Thầy nghĩ ra một số rồi chia nó cho 4. Kết quả là 5. Số đó là bao nhiêu?',
      promptFr: '**d** Je pense à un nombre et je le divise par 4. La réponse est 5. Quel est le nombre ?',
      explain: 'The equation is $\\frac{n}{4} = 5$. Undo $÷ 4$ with $× 4$: $n = 20$. Check: $20 ÷ 4 = 5$ ✓.',
      explainVn: 'Phương trình là $\\frac{n}{4} = 5$. Làm ngược $÷ 4$ bằng $× 4$: $n = 20$. Thử lại: $20 ÷ 4 = 5$ ✓.',
      explainFr: 'L’équation est $\\frac{n}{4} = 5$. Annule $÷ 4$ avec $× 4$ : $n = 20$. Vérifie : $20 ÷ 4 = 5$ ✓.',
    },
  },

  // 15 ─ Getting dressed (ORDER) ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it in English',
    eyebrowVn: 'Nói bằng tiếng Anh',
    eyebrowFr: 'Dis-le en anglais',
    title: 'Getting Dressed',
    titleVn: 'Mặc đồ',
    titleFr: 'S’habiller',
    label: 'Order it',
    labelVn: 'Sắp xếp',
    labelFr: 'Ordonne',
    labelIcon: 'Sparkles',
    text: 'Mr Bowen puts on his **socks**. Then he puts on his **shoes**.',
    textVn: 'Thầy Bowen mang **tất**. Rồi thầy mang **giày**.',
    textFr: 'M. Bowen met ses **chaussettes**. Puis il met ses **chaussures**.',
    sub: 'How does he take them off? Say it in a sentence, out loud.',
    subVn: 'Thầy cởi chúng ra thế nào? Hãy nói thành một câu (bằng tiếng Anh), thật to.',
    subFr: 'Comment les enlève-t-il ? Dis-le en une phrase (en anglais), à voix haute.',
    activity: {
      id: 'act_socks',
      type: 'order',
      prompt: 'Put Mr Bowen’s day in order: morning first, evening last.',
      promptVn: 'Sắp xếp một ngày của thầy Bowen: buổi sáng trước, buổi tối sau cùng.',
      promptFr: 'Remets la journée de M. Bowen dans l’ordre : le matin d’abord, le soir en dernier.',
      steps: [
        { id: 'socks_on', name: 'He puts on his socks.', nameVn: 'Thầy mang tất vào.', nameFr: 'Il met ses chaussettes.' },
        { id: 'shoes_on', name: 'He puts on his shoes.', nameVn: 'Thầy mang giày vào.', nameFr: 'Il met ses chaussures.' },
        { id: 'shoes_off', name: 'He takes off his shoes.', nameVn: 'Thầy cởi giày ra.', nameFr: 'Il enlève ses chaussures.' },
        { id: 'socks_off', name: 'He takes off his socks.', nameVn: 'Thầy cởi tất ra.', nameFr: 'Il enlève ses chaussettes.' },
      ],
      explain: '**Last on, first off.** The shoes went on last, so they come off first. Undoing always runs in the reverse order — and so does solving a two-step equation.',
      explainVn: '**Mang sau, cởi trước.** Giày được mang sau cùng, nên cởi ra trước tiên. Làm ngược lại luôn theo thứ tự ngược — giải phương trình hai bước cũng vậy.',
      explainFr: '**Dernier mis, premier enlevé.** Les chaussures ont été mises en dernier, donc elles s’enlèvent en premier. Annuler se fait toujours dans l’ordre inverse — et résoudre une équation à deux étapes aussi.',
    },
  },

  // 16 ─ Last on, first off ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'Undo in reverse order',
    eyebrowVn: 'Làm ngược theo thứ tự ngược',
    eyebrowFr: 'Annule dans l’ordre inverse',
    title: 'Last On, First Off',
    titleVn: 'Mang sau, cởi trước',
    titleFr: 'Dernier mis, premier enlevé',
    inlineSvg: DIAGRAMS.SOCKS_REAL,
    caption: 'An equation with two steps works the same way.',
    captionVn: 'Phương trình có hai bước cũng như vậy. (put on = mang vào, take off = cởi ra)',
    captionFr: 'Une équation à deux étapes marche pareil. (put on = mettre, take off = enlever)',
  },

  // 17 ─ The second vote: 2a + 4 = 18 (PREDICT) ─────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Two Students Disagree',
    titleVn: 'Hai bạn không đồng ý',
    titleFr: 'Deux élèves ne sont pas d’accord',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Solve $2a + 4 = 18$',
    textVn: 'Giải $2a + 4 = 18$',
    textFr: 'Résous $2a + 4 = 18$',
    sub: 'One student says **a = 5**. Another says **a = 7**.',
    subVn: 'Một bạn nói **a = 5**. Một bạn khác nói **a = 7**.',
    subFr: 'Un élève dit **a = 5**. Un autre dit **a = 7**.',
    activity: {
      id: 'act_vote_a',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptVn: 'Đáp án nào đúng?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'five', name: '$a = 5$ — halve 18 first, then take away 4', nameVn: '$a = 5$ — chia đôi 18 trước, rồi trừ 4', nameFr: '$a = 5$ — diviser 18 par deux d’abord, puis enlever 4' },
        { val: 'seven', name: '$a = 7$ — take away 4 first, then halve', nameVn: '$a = 7$ — trừ 4 trước, rồi chia đôi', nameFr: '$a = 7$ — enlever 4 d’abord, puis diviser par deux' },
      ],
      correct: 'seven',
      explain: '$a = 7$. Check: $2 × 7 + 4 = 18$ ✓. Halving first gives $a = 5$, and $2 × 5 + 4 = 14$, not 18. The next slide shows why the $+ 4$ comes off first.',
      explainVn: '$a = 7$. Thử lại: $2 × 7 + 4 = 18$ ✓. Chia đôi trước thì ra $a = 5$, mà $2 × 5 + 4 = 14$, không phải 18. Slide sau cho thấy vì sao phải bỏ $+ 4$ trước.',
      explainFr: '$a = 7$. Vérifie : $2 × 7 + 4 = 18$ ✓. Diviser par deux d’abord donne $a = 5$, et $2 × 5 + 4 = 14$, pas 18. La diapositive suivante montre pourquoi le $+ 4$ s’enlève en premier.',
    },
  },

  // 18 ─ The stepper: two steps ─────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Say each box before you press',
    eyebrowVn: 'Nói từng ô trước khi bấm',
    eyebrowFr: 'Dis chaque case avant d’appuyer',
    title: 'Two Steps',
    titleVn: 'Hai bước',
    titleFr: 'Deux étapes',
    widget: ReverseTwo,
    caption: '**a = 7** is right. The **+ 4** happened last, so undo it first.',
    captionVn: '**a = 7** mới đúng. Phép **+ 4** làm sau cùng, nên làm ngược nó trước.',
    captionFr: '**a = 7** est juste. Le **+ 4** vient en dernier, donc annule-le d’abord.',
  },

  // 19 ─ Undo the last step first (CHECK 6) ─────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    side: 'left',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Undo the Last Step First',
    titleVn: 'Làm ngược bước cuối trước',
    titleFr: 'Annule la dernière étape d’abord',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_STEP,
    content: 'Socks and shoes again. **× 2** went on first. **+ 4** went on last, so it comes off first.',
    contentVn: 'Lại là tất và giày. **× 2** làm trước. **+ 4** làm sau cùng, nên bỏ nó ra trước.',
    contentFr: 'Encore les chaussettes et les chaussures. Le **× 2** a été mis en premier. Le **+ 4** a été mis en dernier, donc il s’enlève en premier.',
    notes: [
      {
        tone: 'write',
        text: 'Two steps: undo the **last** step **first**.\n$2a + 4 = 18$\n$18 − 4 = 14$, then $14 ÷ 2 = 7$',
        textVn: 'Hai bước: làm ngược bước **cuối** **trước tiên**.\n$2a + 4 = 18$\n$18 − 4 = 14$, rồi $14 ÷ 2 = 7$',
        textFr: 'Deux étapes : annule la **dernière** étape **en premier**.\n$2a + 4 = 18$\n$18 − 4 = 14$, puis $14 ÷ 2 = 7$',
      },
    ],
    check: {
      id: 'chk_first_step',
      q: 'To solve $3m − 4 = 17$, what do you do **first**?',
      qVn: 'Để giải $3m − 4 = 17$, em làm gì **trước tiên**?',
      qFr: 'Pour résoudre $3m − 4 = 17$, que fais-tu **en premier** ?',
      options: [
        { val: 'A', text: '$÷ 3$', textVn: '$÷ 3$', textFr: '$÷ 3$' },
        { val: 'B', text: '$− 4$', textVn: '$− 4$', textFr: '$− 4$' },
        { val: 'C', text: '$+ 4$', textVn: '$+ 4$', textFr: '$+ 4$' },
        { val: 'D', text: '$× 3$', textVn: '$× 3$', textFr: '$× 3$' },
      ],
      correct: 'C',
      expEn: 'The $− 4$ happened last, so undo it first with $+ 4$: $17 + 4 = 21$, then $21 ÷ 3 = 7$. $÷ 3$ first undoes the steps in the wrong order. $− 4$ does the operation again instead of undoing it. $× 3$ does not undo anything here.',
      expVn: 'Phép $− 4$ làm sau cùng, nên làm ngược nó trước bằng $+ 4$: $17 + 4 = 21$, rồi $21 ÷ 3 = 7$. $÷ 3$ trước là làm ngược sai thứ tự. $− 4$ là làm lại chính phép đó thay vì làm ngược. $× 3$ không làm ngược phép nào ở đây.',
      expFr: 'Le $− 4$ est arrivé en dernier, donc annule-le d’abord avec $+ 4$ : $17 + 4 = 21$, puis $21 ÷ 3 = 7$. $÷ 3$ d’abord annule les étapes dans le mauvais ordre. $− 4$ refait l’opération au lieu de l’annuler. $× 3$ n’annule rien ici.',
    },
  },

  // 20 ─ Two-step equations (FLOW) ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Two-Step Equations',
    titleVn: 'Phương trình hai bước',
    titleFr: 'Équations à deux étapes',
    content:
      '**a** $3a + 5 = 26$\n' +
      '**b** $4b − 3 = 29$\n' +
      '**c** $30 = 6c + 12$\n' +
      '**d** $20 = 5d − 10$\n\n' +
      'Reverse the flow chart for **b** below. Undo the last step first.',
    contentVn:
      '**a** $3a + 5 = 26$\n' +
      '**b** $4b − 3 = 29$\n' +
      '**c** $30 = 6c + 12$\n' +
      '**d** $20 = 5d − 10$\n\n' +
      'Đi ngược sơ đồ của câu **b** ở bên dưới. Làm ngược bước cuối trước.',
    contentFr: '**a** $3a + 5 = 26$\n**b** $4b − 3 = 29$\n**c** $30 = 6c + 12$\n**d** $20 = 5d − 10$\n\nParcours l’organigramme de **b** à l’envers ci-dessous. Annule la dernière étape d’abord.',
    reveal: {
      label: 'Check a, c and d',
      labelVn: 'Kiểm tra a, c và d',
      labelFr: 'Vérifie a, c et d',
      answer: '**a** $26 − 5 = 21$, $21 ÷ 3 = 7$\n**c** $30 − 12 = 18$, $18 ÷ 6 = 3$\n**d** $20 + 10 = 30$, $30 ÷ 5 = 6$',
      answerVn: '**a** $26 − 5 = 21$, $21 ÷ 3 = 7$\n**c** $30 − 12 = 18$, $18 ÷ 6 = 3$\n**d** $20 + 10 = 30$, $30 ÷ 5 = 6$',
      answerFr: '**a** $26 − 5 = 21$, $21 ÷ 3 = 7$\n**c** $30 − 12 = 18$, $18 ÷ 6 = 3$\n**d** $20 + 10 = 30$, $30 ÷ 5 = 6$',
    },
    activity: {
      id: 'act_flow_4b',
      type: 'flow',
      eq: '4b − 3 = 29',
      prompt: 'Reverse the flow chart for **b** $4b − 3 = 29$.',
      promptVn: 'Đi ngược sơ đồ của câu **b** $4b − 3 = 29$.',
      promptFr: 'Parcours à l’envers l’organigramme de **b** $4b − 3 = 29$.',
      explain: 'Forward: $× 4$, then $− 3$. Backwards, last step first: $29 + 3 = 32$, then $32 ÷ 4 = 8$. Check: $4 × 8 − 3 = 29$ ✓.',
      explainVn: 'Đi xuôi: $× 4$, rồi $− 3$. Đi ngược, bước cuối trước: $29 + 3 = 32$, rồi $32 ÷ 4 = 8$. Thử lại: $4 × 8 − 3 = 29$ ✓.',
      explainFr: 'À l’endroit : $× 4$, puis $− 3$. À l’envers, la dernière étape d’abord : $29 + 3 = 32$, puis $32 ÷ 4 = 8$. Vérifie : $4 × 8 − 3 = 29$ ✓.',
    },
  },

  // 21 ─ Mr Bowen's homework (SORT) ─────────────────────────────────────────
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
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nPut each answer back in. **Every one fails the check.**',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nThay từng đáp án vào lại. **Câu nào thử lại cũng sai.**',
    contentFr: 'M. Bowen s’est donné **4 sur 4**.\n\nRemplace avec chaque réponse. **Aucune ne passe la vérification.**',
    activity: {
      id: 'act_homework',
      type: 'sort',
      prompt: 'What went wrong in each line?',
      promptVn: 'Mỗi dòng đã sai ở đâu?',
      promptFr: 'Qu’est-ce qui ne va pas à chaque ligne ?',
      bins: [
        { id: 'did', name: 'Did the operation, not its inverse', nameVn: 'Làm luôn phép toán, không làm phép ngược', nameFr: 'A fait l’opération, pas son inverse' },
        { id: 'kind', name: 'Used the wrong kind of inverse', nameVn: 'Dùng sai loại phép ngược', nameFr: 'A utilisé la mauvaise sorte d’inverse' },
        { id: 'order', name: 'Undid the steps in the wrong order', nameVn: 'Làm ngược các bước sai thứ tự', nameFr: 'A annulé les étapes dans le mauvais ordre' },
      ],
      cards: [
        { id: 'h1', name: '**a** $x + 6 = 14$, so $x = 20$', nameVn: '**a** $x + 6 = 14$, nên $x = 20$', nameFr: '**a** $x + 6 = 14$, donc $x = 20$', bin: 'did' },
        { id: 'h2', name: '**b** $5x = 45$, so $x = 40$', nameVn: '**b** $5x = 45$, nên $x = 40$', nameFr: '**b** $5x = 45$, donc $x = 40$', bin: 'kind' },
        { id: 'h3', name: '**c** $18 = x − 7$, so $x = 11$', nameVn: '**c** $18 = x − 7$, nên $x = 11$', nameFr: '**c** $18 = x − 7$, donc $x = 11$', bin: 'did' },
        { id: 'h4', name: '**d** $2x + 6 = 20$, so $x = 4$', nameVn: '**d** $2x + 6 = 20$, nên $x = 4$', nameFr: '**d** $2x + 6 = 20$, donc $x = 4$', bin: 'order' },
      ],
      explain: '**a** He added 6: $x = 8$. **b** $× 5$ is undone by $÷ 5$, not $− 5$: $x = 9$. **c** He subtracted 7: $x = 25$. **d** He halved first; take away 6 first: $x = 7$.',
      explainVn: '**a** Thầy đã cộng 6: $x = 8$. **b** $× 5$ phải làm ngược bằng $÷ 5$, không phải $− 5$: $x = 9$. **c** Thầy đã trừ 7: $x = 25$. **d** Thầy chia đôi trước; phải trừ 6 trước: $x = 7$.',
      explainFr: '**a** Il a ajouté 6 : $x = 8$. **b** $× 5$ s’annule avec $÷ 5$, pas $− 5$ : $x = 9$. **c** Il a soustrait 7 : $x = 25$. **d** Il a divisé par deux d’abord ; il faut enlever 6 d’abord : $x = 7$.',
    },
  },

  // 22 ─ Angles (CHECK 7) ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Triangle',
    side: 'left',
    eyebrow: 'Challenge · uses 2.3',
    eyebrowVn: 'Thử thách · dùng bài 2.3',
    eyebrowFr: 'Défi · utilise 2.3',
    title: 'Angles',
    titleVn: 'Góc',
    titleFr: 'Angles',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANGLES,
    content: 'The two angles make a **right angle**.\n\n**a** Write an equation. **b** Solve it. **c** How big is each angle?',
    contentVn: 'Hai góc tạo thành một **góc vuông**.\n\n**a** Viết một phương trình. **b** Giải nó. **c** Mỗi góc bằng bao nhiêu độ?',
    contentFr: 'Les deux angles forment un **angle droit**.\n\n**a** Écris une équation. **b** Résous-la. **c** Quelle est la mesure de chaque angle ?',
    check: {
      id: 'chk_angles',
      q: 'How big is the $5x$ angle?',
      qVn: 'Góc $5x$ bằng bao nhiêu độ?',
      qFr: 'Quelle est la mesure de l’angle $5x$ ?',
      options: [
        { val: 'A', text: '$10°$', textVn: '$10°$', textFr: '$10°$' },
        { val: 'B', text: '$45°$', textVn: '$45°$', textFr: '$45°$' },
        { val: 'C', text: '$40°$', textVn: '$40°$', textFr: '$40°$' },
        { val: 'D', text: '$50°$', textVn: '$50°$', textFr: '$50°$' },
      ],
      correct: 'D',
      expEn: '$4x + 5x = 90$, so $9x = 90$ and $x = 10$. The $5x$ angle is $5 × 10 = 50°$, and $4x = 40°$: $40 + 50 = 90$ ✓. 10 is $x$, not an angle. 45 halves the right angle, but the angles are not equal. 40 is the $4x$ angle.',
      expVn: '$4x + 5x = 90$, nên $9x = 90$ và $x = 10$. Góc $5x$ bằng $5 × 10 = 50°$, và $4x = 40°$: $40 + 50 = 90$ ✓. 10 là $x$, không phải góc. 45 là chia đôi góc vuông, nhưng hai góc không bằng nhau. 40 là góc $4x$.',
      expFr: '$4x + 5x = 90$, donc $9x = 90$ et $x = 10$. L’angle $5x$ mesure $5 × 10 = 50°$, et $4x = 40°$ : $40 + 50 = 90$ ✓. 10, c’est $x$, pas un angle. 45 partage l’angle droit en deux, mais les angles ne sont pas égaux. 40, c’est l’angle $4x$.',
    },
  },

  // 23 ─ Mr Bowen's notebooks (CHECK 8) ─────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    eyebrowFr: 'Écris une équation, puis résous-la',
    title: 'Mr Bowen’s Notebooks',
    titleVn: 'Những cuốn vở của thầy Bowen',
    titleFr: 'Les cahiers de M. Bowen',
    content:
      'Mr Bowen buys 4 notebooks and one pen. The pen costs 7 thousand dong.\n\n' +
      'He pays 43 thousand dong. How much is one notebook?',
    contentVn:
      'Thầy Bowen mua 4 cuốn vở và một cây bút. Cây bút giá 7 nghìn đồng.\n\n' +
      'Thầy trả 43 nghìn đồng. Một cuốn vở giá bao nhiêu?',
    contentFr: 'M. Bowen achète 4 cahiers et un stylo. Le stylo coûte 7 mille dongs.\n\nIl paie 43 mille dongs. Combien coûte un cahier ?',
    check: {
      id: 'chk_notebooks',
      q: 'Let $n$ be the cost of one notebook, in thousand dong. Which equation fits?',
      qVn: 'Gọi $n$ là giá một cuốn vở, tính bằng nghìn đồng. Phương trình nào phù hợp?',
      qFr: 'Soit $n$ le prix d’un cahier, en milliers de dongs. Quelle équation convient ?',
      options: [
        { val: 'A', text: '$4n + 7 = 43$', textVn: '$4n + 7 = 43$', textFr: '$4n + 7 = 43$' },
        { val: 'B', text: '$4(n + 7) = 43$', textVn: '$4(n + 7) = 43$', textFr: '$4(n + 7) = 43$' },
        { val: 'C', text: '$4n − 7 = 43$', textVn: '$4n − 7 = 43$', textFr: '$4n − 7 = 43$' },
        { val: 'D', text: '$4n = 43$', textVn: '$4n = 43$', textFr: '$4n = 43$' },
      ],
      correct: 'A',
      expEn: 'Four notebooks cost $4n$, and the pen adds 7: $4n + 7 = 43$. So $4n = 36$ and $n = 9$: **9 thousand dong**. B adds the 7 before multiplying — a pen with every notebook. C writes the inverse. D leaves the pen out.',
      expVn: 'Bốn cuốn vở giá $4n$, cộng thêm cây bút 7: $4n + 7 = 43$. Vậy $4n = 36$ và $n = 9$: **9 nghìn đồng**. B cộng 7 trước khi nhân — như mỗi cuốn vở kèm một cây bút. C viết phép ngược. D bỏ quên cây bút.',
      expFr: 'Quatre cahiers coûtent $4n$, et le stylo ajoute 7 : $4n + 7 = 43$. Donc $4n = 36$ et $n = 9$ : **9 mille dongs**. B ajoute le 7 avant de multiplier — un stylo avec chaque cahier. C écrit l’inverse. D oublie le stylo.',
    },
  },

  // 24 ─ Mr Bowen's age ─────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    eyebrowFr: 'Écris une équation, puis résous-la',
    title: 'Mr Bowen’s Age',
    titleVn: 'Tuổi của thầy Bowen',
    titleFr: 'L’âge de M. Bowen',
    content:
      'Mr Bowen thinks of his age.\n\n' +
      'He doubles it, then subtracts 7. The answer is 1.\n\n' +
      'How old is Mr Bowen?',
    contentVn:
      'Thầy Bowen nghĩ đến tuổi của mình.\n\n' +
      'Thầy gấp đôi nó, rồi trừ đi 7. Kết quả là 1.\n\n' +
      'Thầy Bowen bao nhiêu tuổi?',
    contentFr: 'M. Bowen pense à son âge.\n\nIl le double, puis soustrait 7. La réponse est 1.\n\nQuel âge a M. Bowen ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$2a − 7 = 1$\n\n$2a = 8$, so $a = 4$. Mr Bowen is **4 years old**.',
      answerVn: '$2a − 7 = 1$\n\n$2a = 8$, nên $a = 4$. Thầy Bowen **4 tuổi**.',
      answerFr: '$2a − 7 = 1$\n\n$2a = 8$, donc $a = 4$. M. Bowen a **4 ans**.',
    },
  },

  // 25 ─ Mr Bowen's plant (CHECK 9) ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Sprout',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    eyebrowFr: 'Écris une équation, puis résous-la',
    title: 'Mr Bowen’s Plant',
    titleVn: 'Cái cây của thầy Bowen',
    titleFr: 'La plante de M. Bowen',
    content:
      'Mr Bowen buys a plant. It grows 5 cm every week.\n\n' +
      'After 6 weeks, it is 26 cm tall.',
    contentVn:
      'Thầy Bowen mua một cái cây. Mỗi tuần nó cao thêm 5 cm.\n\n' +
      'Sau 6 tuần, nó cao 26 cm.',
    contentFr: 'M. Bowen achète une plante. Elle grandit de 5 cm par semaine.\n\nAprès 6 semaines, elle mesure 26 cm.',
    check: {
      id: 'chk_plant',
      q: 'How tall was the plant when Mr Bowen bought it?',
      qVn: 'Lúc thầy Bowen mua, cái cây cao bao nhiêu?',
      qFr: 'Combien mesurait la plante quand M. Bowen l’a achetée ?',
      options: [
        { val: 'A', text: '$56$ cm', textVn: '$56$ cm', textFr: '$56$ cm' },
        { val: 'B', text: '$−4$ cm', textVn: '$−4$ cm', textFr: '$−4$ cm' },
        { val: 'C', text: '$4$ cm', textVn: '$4$ cm', textFr: '$4$ cm' },
        { val: 'D', text: '$21$ cm', textVn: '$21$ cm', textFr: '$21$ cm' },
      ],
      correct: 'B',
      expEn: 'Six weeks of 5 cm is 30 cm: $h + 30 = 26$, so $h = 26 − 30 = −4$. The plant was **−4 cm** tall. 56 added the 30 instead of undoing it. 4 worked out $30 − 26$, the wrong way round. 21 counted only one week.',
      expVn: 'Sáu tuần, mỗi tuần 5 cm là 30 cm: $h + 30 = 26$, nên $h = 26 − 30 = −4$. Cái cây cao **−4 cm**. 56 là cộng thêm 30 thay vì làm ngược. 4 là tính $30 − 26$, ngược chiều. 21 là chỉ tính một tuần.',
      expFr: 'Six semaines de 5 cm, ça fait 30 cm : $h + 30 = 26$, donc $h = 26 − 30 = −4$. La plante mesurait **−4 cm**. 56 a ajouté le 30 au lieu de l’annuler. 4 a calculé $30 − 26$, dans le mauvais sens. 21 n’a compté qu’une semaine.',
    },
  },

  // 26 ─ Checklist + the exit question (CHECK 10) ───────────────────────────
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
    content: '> Say each one out loud. If one feels shaky, go back to its slide before the practice.',
    contentVn: '> Nói to từng điều. Nếu điều nào chưa chắc, hãy quay lại slide đó trước khi luyện tập.',
    contentFr: '> Dis chacune à voix haute. Si l’une te semble fragile, retourne à sa diapositive avant l’entraînement.',
    items: [
      { text: 'Say what an **equation** is and what **solve** means.', textVn: 'Nói được **phương trình** là gì và **giải** nghĩa là gì.', textFr: 'Dire ce qu’est une **équation** et ce que veut dire **résoudre**.' },
      { text: '**Check** an answer by putting it back in.', textVn: '**Thử lại** đáp án bằng cách thay nó vào lại.', textFr: '**Vérifier** une réponse en la remplaçant dans l’équation.' },
      { text: 'Undo a step with its **inverse operation**.', textVn: 'Làm ngược một bước bằng **phép toán ngược**.', textFr: 'Annuler une étape avec son **opération inverse**.' },
      { text: '**Reverse** a flow chart to solve.', textVn: '**Đi ngược** sơ đồ để giải.', textFr: 'Parcourir un organigramme **à l’envers** pour résoudre.' },
      { text: 'Turn "I think of a number" into an equation.', textVn: 'Biến "I think of a number" thành phương trình.', textFr: 'Transformer « I think of a number » en équation.' },
      { text: 'Undo the **last** step **first**.', textVn: 'Làm ngược bước **cuối** **trước tiên**.', textFr: 'Annuler la **dernière** étape **en premier**.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: solve $6x − 4 = 32$.',
      qVn: 'Câu hỏi cuối bài: giải $6x − 4 = 32$.',
      qFr: 'Question de sortie : résous $6x − 4 = 32$.',
      options: [
        { val: 'A', text: '$x = 36$', textVn: '$x = 36$', textFr: '$x = 36$' },
        { val: 'B', text: '$x = 168$', textVn: '$x = 168$', textFr: '$x = 168$' },
        { val: 'C', text: '$x = 6$', textVn: '$x = 6$', textFr: '$x = 6$' },
        { val: 'D', text: '$x = \\frac{14}{3}$', textVn: '$x = \\frac{14}{3}$', textFr: '$x = \\frac{14}{3}$' },
      ],
      correct: 'C',
      expEn: 'Undo the last step first: $32 + 4 = 36$, then $36 ÷ 6 = 6$. Check: $6 × 6 − 4 = 32$ ✓. 36 stopped before undoing the $× 6$. 168 did the operations instead of undoing them ($28 × 6$). $\\frac{14}{3}$ took the 4 away again ($28 ÷ 6$).',
      expVn: 'Làm ngược bước cuối trước: $32 + 4 = 36$, rồi $36 ÷ 6 = 6$. Thử lại: $6 × 6 − 4 = 32$ ✓. 36 là dừng lại trước khi làm ngược $× 6$. 168 là làm các phép toán thay vì làm ngược ($28 × 6$). $\\frac{14}{3}$ là lại trừ 4 lần nữa ($28 ÷ 6$).',
      expFr: 'Annule d’abord la dernière étape : $32 + 4 = 36$, puis $36 ÷ 6 = 6$. Vérifie : $6 × 6 − 4 = 32$ ✓. 36 s’est arrêté avant d’annuler le $× 6$. 168 a fait les opérations au lieu de les annuler ($28 × 6$). $\\frac{14}{3}$ a encore enlevé le 4 ($28 ÷ 6$).',
    },
  },
];
