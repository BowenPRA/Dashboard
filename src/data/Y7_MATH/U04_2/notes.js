// src/data/Y7_MATH/U04_2/notes.js
// 4.2 Adding and Subtracting Decimals — a self-study reduction of the 4.2 part
// of the classroom deck (C:\Users\bowen\lessons, content/y7-math/U04_1_4,
// which taught 4.1–4.4 in one period): slides 6–9 (the vote on 1 − 0.72, the
// LineUp widget, the rule, mental and written method), 18b (12 − 4.5), 19 (the
// English that picks the operation), 20 problem 1 (change from 10 dollars) and
// 21 (Mr Bowen vs Usain Bolt). The rest is built from the book's 4.2: whole
// numbers minus decimals, checking by adding, the exam's "use a mental /
// written method", and "change" and "how much more".
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false), as the classroom deck is.
//
// 16 layout slides, 14 scored items: 5 checks and 9 activities across six
// activity types (predict · deccol · estimate · order · sort). No two
// activities in a row are the same type.
//
// SPINE:
//   1      hero
//   2–4    the vote on 1 − 0.72 (predict); the LineUp widget settles it; the
//          rule, on squared paper (check)
//   5–8    your turn (deccol 20 − 8.35); estimate first (estimate); a whole
//          number has a point (order); check by adding (sort)
//   9      Mr Bowen's homework, 12 − 4.5 = 8.5 (check)
//   10–12  in your head or on paper (predict 8.4 − 2.9); take 3, give 0.1 back
//          (order); what the exam asks (check)
//   13–15  which operation? (sort); change (check); how much faster than
//          Usain Bolt (deccol 16.04 − 9.58)
//   16     the checklist, with the classroom's exit question as the last check
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; never a `$` in
//    prose — money is "dollars".
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · A decimal point is a dot in both languages.
//  · No whiteboards, pairs, hand votes, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { LineUp } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U04_2/${f}`);

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
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 4 · 4.2',
    eyebrowFr: 'Unité 4 · 4.2',
    title: 'Adding and Subtracting Decimals',
    titleFr: 'Additionner et soustraire des décimaux',
    objective: 'Add and subtract decimals in columns: line up the points, fill the gaps with zeros, work from the right with each carry and exchange, and bring the point straight down; check a subtraction by adding; use a mental method when a number is nearly whole; and read "change" and "how much more" as a subtraction.',
    objectiveFr: 'Additionner et soustraire des décimaux en colonnes : aligner les points, compléter les vides avec des zéros, calculer à partir de la droite avec chaque retenue et chaque échange, et descendre le point tout droit ; vérifier une soustraction par une addition ; utiliser le calcul mental quand un nombre est presque entier ; et lire « change » et « how much more » comme une soustraction.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **predict**, **line up**, **estimate**, **order** and **sort** your way through it. **14 things are scored** — the first is on the next slide.',
      textFr: 'Tu vas **prédire**, **aligner**, **estimer**, **ranger** et **trier** tout au long de la leçon. **14 éléments sont notés** — le premier est sur la diapo suivante.',
    },
  },

  // 2 ─ The vote: 1 − 0.72 (PREDICT) ────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Which Is Right?',
    titleFr: 'Laquelle est juste ?',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Work out $1 − 0.72$',
    textFr: 'Calcule $1 − 0.72$',
    sub: 'Two students get two different answers: **0.28** and **0.38**.',
    subFr: 'Deux élèves trouvent deux réponses différentes : **0.28** et **0.38**.',
    activity: {
      id: 'act_vote',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'right', name: '$0.28$', nameFr: '$0.28$' },
        { val: 'forgot', name: '$0.38$', nameFr: '$0.38$' },
      ],
      correct: 'right',
      explain: '$0.28$. Check by adding: $0.28 + 0.72 = 1$, back where you started. $0.38 + 0.72 = 1.1$, which is too much. The next slide shows where the $0.38$ goes wrong.',
      explainFr: '$0.28$. Vérifie en additionnant : $0.28 + 0.72 = 1$, on revient au départ. $0.38 + 0.72 = 1.1$, c’est trop. La diapo suivante montre où $0.38$ se trompe.',
    },
  },

  // 3 ─ The LineUp widget settles it ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Move',
    eyebrow: 'Say each step before you press',
    eyebrowFr: 'Dis chaque étape avant d’appuyer',
    title: 'Line Up the Points',
    titleFr: 'Aligne les points',
    widget: LineUp,
    caption: '**0.28** is right. **0.38** forgets that the tenths gave 1 away: 10 tenths become **9**.',
    captionFr: '**0.28** est juste. **0.38** oublie que les dixièmes ont donné 1 : 10 dixièmes deviennent **9**.',
  },

  // 4 ─ The rule (CHECK 1) ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Columns3',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Adding and Subtracting',
    titleFr: 'Additionner et soustraire',
    ratio: 45,
    inlineSvg: DIAGRAMS.COLUMN_RULE,
    content: 'Set it out like whole numbers — but line up the **points**, not the ends.',
    contentFr: 'Pose-le comme pour les entiers — mais aligne les **points**, pas les fins.',
    notes: [
      {
        tone: 'write',
        text: 'Line up the decimal points. Fill the gaps with zeros.\nWork from the right, like whole numbers. The point goes **straight down**.',
        textFr: 'Aligne les points décimaux. Complète les vides avec des zéros.\nCalcule à partir de la droite, comme pour les entiers. Le point descend **tout droit**.',
      },
    ],
    check: {
      id: 'chk_fill',
      q: 'Before you work out $12.4 − 5.67$, how do you write $12.4$?',
      qFr: 'Avant de calculer $12.4 − 5.67$, comment écris-tu $12.4$ ?',
      options: [
        { val: 'A', text: '$12.04$', textFr: '$12.04$' },
        { val: 'B', text: '$12.40$', textFr: '$12.40$' },
        { val: 'C', text: '$124.0$', textFr: '$124.0$' },
        { val: 'D', text: '$1.240$', textFr: '$1.240$' },
      ],
      correct: 'B',
      expEn: '$12.4 = 12.40$: the zero goes in the empty **hundredths** place, at the end, so both numbers have two decimal places. $12.04$ puts the zero between the point and the 4, which pushes the 4 into the hundredths — a smaller number. $124.0$ and $1.240$ move the point.',
      expFr: '$12.4 = 12.40$ : le zéro va dans la place vide des **centièmes**, à la fin, pour que les deux nombres aient deux décimales. $12.04$ met le zéro entre le point et le 4, ce qui pousse le 4 dans les centièmes — un nombre plus petit. $124.0$ et $1.240$ déplacent le point.',
    },
  },

  // 5 ─ Your turn (DECCOL 20 − 8.35) ────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Line Them Up',
    titleFr: 'Aligne-les',
    content: 'Work these out in columns.\n\n**a** $7.56 + 2.8$\n**b** $12.4 − 5.67$\n**c** $20 − 8.35$\n**d** $0.9 + 0.38 + 4$\n\nDo **c** below. Work out the other three, then check them.',
    contentFr: 'Calcule-les en colonnes.\n\n**a** $7.56 + 2.8$\n**b** $12.4 − 5.67$\n**c** $20 − 8.35$\n**d** $0.9 + 0.38 + 4$\n\nFais **c** ci-dessous. Calcule les trois autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and d',
      labelFr: 'Vérifie a, b et d',
      answer: '**a** $10.36$ — write $2.8$ as $2.80$\n**b** $6.73$ — write $12.4$ as $12.40$\n**d** $5.28$ — write $0.9$ as $0.90$ and $4$ as $4.00$',
      answerFr: '**a** $10.36$ — écris $2.8$ comme $2.80$\n**b** $6.73$ — écris $12.4$ comme $12.40$\n**d** $5.28$ — écris $0.9$ comme $0.90$ et $4$ comme $4.00$',
    },
    activity: {
      id: 'act_col_twenty',
      type: 'deccol',
      a: '20',
      op: '−',
      b: '8.35',
      prompt: '**c** Work out $20 − 8.35$ in columns.',
      promptFr: '**c** Calcule $20 − 8.35$ en colonnes.',
      explain: '$20 = 20.00$. The hundredths need a ten, but the tenths and the ones are 0, so the exchange starts in the tens: the tens give 1, the ones and the tenths each get 10 and pass 1 on, keeping 9, and the hundredths get 10. Check: $11.65 + 8.35 = 20$.',
      explainFr: '$20 = 20.00$. Les centièmes ont besoin d’une dizaine, mais les dixièmes et les unités valent 0, donc l’échange commence dans les dizaines : les dizaines donnent 1, les unités et les dixièmes reçoivent 10 et en passent 1, en gardant 9, et les centièmes reçoivent 10. Vérifie : $11.65 + 8.35 = 20$.',
    },
  },

  // 6 ─ Estimate first (ESTIMATE) ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Is the point in the right place?',
    eyebrowFr: 'Le point est-il au bon endroit ?',
    title: 'Estimate First',
    titleFr: 'Estime d’abord',
    content: 'Round each number to a whole number and work that out in your head. If your answer is nowhere near the estimate, the point has moved.',
    contentFr: 'Arrondis chaque nombre à l’unité et calcule de tête. Si ta réponse est très loin de l’estimation, le point a bougé.',
    notes: [
      {
        tone: 'write',
        text: '**Estimate:** a rough answer from rounded numbers.\n$9.6 + 3.75$ is about $10 + 4 = 14$.',
        textFr: '**Estimer (estimate) :** trouver une réponse approchée avec des nombres arrondis.\n$9.6 + 3.75$, c’est environ $10 + 4 = 14$.',
      },
    ],
    activity: {
      id: 'act_estimate',
      type: 'estimate',
      prompt: 'About how much is $19.85 + 7.3$? Drag to your estimate.',
      promptFr: 'Combien fait environ $19.85 + 7.3$ ? Fais glisser jusqu’à ton estimation.',
      min: 0,
      max: 100,
      step: 1,
      answer: 27,
      tolerance: 0.15,
      explain: '$19.85$ is about $20$ and $7.3$ is about $7$, so the answer is about $27$. The exact answer is $19.85 + 7.30 = 27.15$ — close to $27$. An answer like $2.715$ or $271.5$ has the right digits but is nowhere near $27$: the point is in the wrong place.',
      explainFr: '$19.85$, c’est environ $20$ et $7.3$, environ $7$, donc la réponse est environ $27$. La réponse exacte est $19.85 + 7.30 = 27.15$ — proche de $27$. Une réponse comme $2.715$ ou $271.5$ a les bons chiffres mais est très loin de $27$ : le point est mal placé.',
    },
  },

  // 7 ─ A whole number has a point (ORDER) ──────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Hash',
    eyebrow: 'Whole numbers and decimals',
    eyebrowFr: 'Entiers et décimaux',
    title: 'A Whole Number Has a Point',
    titleFr: 'Un entier a un point',
    ratio: 45,
    inlineSvg: DIAGRAMS.WHOLE_POINT,
    content: 'You cannot see it, but it is there, at the end. Write it in, then fill the gaps with zeros.',
    contentFr: 'On ne le voit pas, mais il est là, à la fin. Écris-le, puis complète les vides avec des zéros.',
    notes: [
      {
        tone: 'write',
        text: 'A whole number has a point at its end.\n$15 = 15.0 = 15.00$',
        textFr: 'Un nombre entier a un point à la fin.\n$15 = 15.0 = 15.00$',
      },
    ],
    activity: {
      id: 'act_whole_steps',
      type: 'order',
      prompt: 'Put the steps of $9 − 4.27$ in order.',
      promptFr: 'Range les étapes de $9 − 4.27$ dans l’ordre.',
      steps: [
        { id: 'line', name: 'Write $4.27$ under $9$, with its point under the point at the end of $9$.', nameFr: 'Écris $4.27$ sous $9$, son point sous le point à la fin de $9$.' },
        { id: 'zeros', name: 'Fill the gaps: $9$ becomes $9.00$.', nameFr: 'Complète les vides : $9$ devient $9.00$.' },
        { id: 'start', name: 'Start on the right: $0 − 7$ cannot be done.', nameFr: 'Commence à droite : $0 − 7$, c’est impossible.' },
        { id: 'swap', name: 'Exchange: the 9 ones become 8, the tenths get 10 and keep 9, the hundredths get 10.', nameFr: 'Échange : les 9 unités deviennent 8, les dixièmes reçoivent 10 et gardent 9, les centièmes reçoivent 10.' },
        { id: 'work', name: 'Work the columns: $10 − 7$, then $9 − 2$, then $8 − 4$, with the point straight down.', nameFr: 'Calcule les colonnes : $10 − 7$, puis $9 − 2$, puis $8 − 4$, avec le point tout droit.' },
      ],
      explain: 'Line up, fill the gaps, then work from the right. The exchange comes before the first subtraction, because $0 − 7$ cannot be done. $9 − 4.27 = 4.73$. Check: $4.73 + 4.27 = 9.00$.',
      explainFr: 'Aligne, complète les vides, puis calcule à partir de la droite. L’échange vient avant la première soustraction, car $0 − 7$, c’est impossible. $9 − 4.27 = 4.73$. Vérifie : $4.73 + 4.27 = 9.00$.',
    },
  },

  // 8 ─ Check by adding (SORT) ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Undo it',
    eyebrowFr: 'Défais-le',
    title: 'Check by Adding',
    titleFr: 'Vérifie en additionnant',
    ratio: 45,
    inlineSvg: DIAGRAMS.CHECK_ADD,
    content: 'Adding undoes subtracting. Add your answer to the number you took away: you must get back to where you started.',
    contentFr: 'L’addition défait la soustraction. Ajoute ta réponse au nombre que tu as enlevé : tu dois retrouver le nombre de départ.',
    notes: [
      {
        tone: 'write',
        text: '**Check a subtraction by adding:**\nthe answer + the number taken away = the number you started with.',
        textFr: '**Vérifie une soustraction par une addition :**\nla réponse + le nombre enlevé = le nombre de départ.',
      },
    ],
    activity: {
      id: 'act_check_add',
      type: 'sort',
      prompt: 'Check each answer by adding. Is it right or wrong?',
      promptFr: 'Vérifie chaque réponse en additionnant. Est-elle juste ou fausse ?',
      bins: [
        { id: 'right', name: '**Right** — adding gets back to the start', nameFr: '**Juste** — l’addition redonne le départ' },
        { id: 'wrong', name: '**Wrong** — adding does not', nameFr: '**Fausse** — l’addition ne le redonne pas' },
      ],
      cards: [
        { id: 'k1', name: '$6 − 2.58 = 3.42$', nameFr: '$6 − 2.58 = 3.42$', bin: 'right' },
        { id: 'k2', name: '$3 − 0.45 = 2.65$', nameFr: '$3 − 0.45 = 2.65$', bin: 'wrong' },
        { id: 'k3', name: '$9.1 − 4.65 = 4.45$', nameFr: '$9.1 − 4.65 = 4.45$', bin: 'right' },
        { id: 'k4', name: '$4 − 1.35 = 2.75$', nameFr: '$4 − 1.35 = 2.75$', bin: 'wrong' },
        { id: 'k5', name: '$7.2 − 3.56 = 3.64$', nameFr: '$7.2 − 3.56 = 3.64$', bin: 'right' },
        { id: 'k6', name: '$8 − 2.64 = 5.46$', nameFr: '$8 − 2.64 = 5.46$', bin: 'wrong' },
      ],
      explain: '$3.42 + 2.58 = 6$, $4.45 + 4.65 = 9.1$ and $3.64 + 3.56 = 7.2$ come back exactly. $2.65 + 0.45 = 3.1$, $2.75 + 1.35 = 4.1$ and $5.46 + 2.64 = 8.1$ are each $0.1$ too big: every one forgot that the tenths gave 1 away. The right answers are $2.55$, $2.65$ and $5.36$.',
      explainFr: '$3.42 + 2.58 = 6$, $4.45 + 4.65 = 9.1$ et $3.64 + 3.56 = 7.2$ redonnent exactement le départ. $2.65 + 0.45 = 3.1$, $2.75 + 1.35 = 4.1$ et $5.46 + 2.64 = 8.1$ font chacun $0.1$ de trop : chacun a oublié que les dixièmes avaient donné 1. Les bonnes réponses sont $2.55$, $2.65$ et $5.36$.',
    },
  },

  // 9 ─ Mr Bowen's homework: 12 − 4.5 = 8.5 (CHECK 2) ───────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistake',
    eyebrowFr: 'Trouve l’erreur',
    title: 'Mr Bowen’s Homework',
    titleFr: 'Les devoirs de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.HOMEWORK,
    content: 'Mr Bowen gave himself **1 out of 1**.\n\nLook at what he did in each column.',
    contentFr: 'M. Bowen s’est mis **1 sur 1**.\n\nRegarde ce qu’il a fait dans chaque colonne.',
    check: {
      id: 'chk_homework',
      q: 'What is $12 − 4.5$ really?',
      qFr: 'Combien fait vraiment $12 − 4.5$ ?',
      options: [
        { val: 'A', text: '$8.5$', textFr: '$8.5$' },
        { val: 'B', text: '$8.0$', textFr: '$8.0$' },
        { val: 'C', text: '$7.5$', textFr: '$7.5$' },
        { val: 'D', text: '$16.5$', textFr: '$16.5$' },
      ],
      correct: 'C',
      expEn: 'Write $12$ as $12.0$. In the tenths, $0 − 5$ cannot be done, so exchange: the ones give 1 and the tenths get 10. $10 − 5 = 5$. Then the ones have $1$, and $1 − 4$ needs an exchange from the tens: $11 − 4 = 7$. So $12 − 4.5 = 7.5$. Mr Bowen did $5 − 0$ — upside down — and never exchanged, so his $8.5$ is 1 too big. $8.0$ drops the $.5$, and $16.5$ adds.',
      expFr: 'Écris $12$ comme $12.0$. Dans les dixièmes, $0 − 5$, c’est impossible, donc échange : les unités donnent 1 et les dixièmes reçoivent 10. $10 − 5 = 5$. Ensuite les unités ont $1$, et $1 − 4$ demande un échange avec les dizaines : $11 − 4 = 7$. Donc $12 − 4.5 = 7.5$. M. Bowen a fait $5 − 0$ — à l’envers — et n’a jamais échangé, donc son $8.5$ a 1 de trop. $8.0$ oublie le $.5$, et $16.5$ additionne.',
    },
  },

  // 10 ─ Mental method, written method (PREDICT 8.4 − 2.9) ──────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Lightbulb',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'In Your Head or on Paper',
    titleFr: 'De tête ou sur papier',
    content: 'When a number is nearly whole, use the whole number.\n\n$6.9 + 4.6$: $6.9$ is nearly $7$. $7 + 4.6 = 11.6$. That added $0.1$ too much, so take it off: $11.5$.',
    contentFr: 'Quand un nombre est presque entier, utilise le nombre entier.\n\n$6.9 + 4.6$ : $6.9$, c’est presque $7$. $7 + 4.6 = 11.6$. On a ajouté $0.1$ de trop, donc enlève-le : $11.5$.',
    notes: [
      {
        tone: 'write',
        text: '**Mental method:** you work it out in your head.\n**Written method:** you write it in columns.',
        textFr: '**Calcul mental (mental method) :** tu calcules dans ta tête.\n**Méthode écrite (written method) :** tu poses le calcul en colonnes.',
      },
    ],
    activity: {
      id: 'act_mental',
      type: 'predict',
      prompt: 'Use a mental method: $8.4 − 2.9$',
      promptFr: 'Utilise le calcul mental : $8.4 − 2.9$',
      options: [
        { val: 'took', name: '$5.4$', nameFr: '$5.4$' },
        { val: 'again', name: '$5.3$', nameFr: '$5.3$' },
        { val: 'right', name: '$5.5$', nameFr: '$5.5$' },
        { val: 'whole', name: '$6.5$', nameFr: '$6.5$' },
      ],
      correct: 'right',
      explain: '$2.9$ is nearly $3$. $8.4 − 3 = 5.4$ — but that took away $0.1$ too much, so give it **back**: $5.5$. $5.4$ forgets to give it back, and $5.3$ takes it away again. $6.5$ works the tenths upside down: $9 − 4$.',
      explainFr: '$2.9$, c’est presque $3$. $8.4 − 3 = 5.4$ — mais on a enlevé $0.1$ de trop, donc rends-le : $5.5$. $5.4$ oublie de le rendre, et $5.3$ l’enlève encore. $6.5$ calcule les dixièmes à l’envers : $9 − 4$.',
    },
  },

  // 11 ─ Take 3, give 0.1 back (ORDER 7.2 − 3.8) ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Too much? Give it back',
    eyebrowFr: 'Trop ? Rends-le',
    title: 'Take 3, Give 0.1 Back',
    titleFr: 'Enlève 3, rends 0.1',
    ratio: 45,
    inlineSvg: DIAGRAMS.NEAR_WHOLE,
    content: 'Taking away $3$ takes away $0.1$ more than $2.9$. So the $0.1$ goes **back**.',
    contentFr: 'Enlever $3$, c’est enlever $0.1$ de plus que $2.9$. Donc on **rend** les $0.1$.',
    activity: {
      id: 'act_give_back',
      type: 'order',
      prompt: 'Put the steps of $7.2 − 3.8$, done in your head, in order.',
      promptFr: 'Range dans l’ordre les étapes de $7.2 − 3.8$, calculé de tête.',
      steps: [
        { id: 'near', name: '$3.8$ is nearly $4$.', nameFr: '$3.8$, c’est presque $4$.' },
        { id: 'take', name: 'Take away $4$: $7.2 − 4 = 3.2$.', nameFr: 'Enlève $4$ : $7.2 − 4 = 3.2$.' },
        { id: 'much', name: 'That took away $0.2$ too much.', nameFr: 'On a enlevé $0.2$ de trop.' },
        { id: 'back', name: 'Give it back: $3.2 + 0.2 = 3.4$.', nameFr: 'Rends-le : $3.2 + 0.2 = 3.4$.' },
      ],
      explain: 'Use the whole number, then put it right. $3.8$ is $0.2$ less than $4$, so taking $4$ takes $0.2$ too much — give it back: $7.2 − 3.8 = 3.4$. Check: $3.4 + 3.8 = 7.2$.',
      explainFr: 'Utilise le nombre entier, puis corrige. $3.8$, c’est $0.2$ de moins que $4$, donc enlever $4$ enlève $0.2$ de trop — rends-le : $7.2 − 3.8 = 3.4$. Vérifie : $3.4 + 3.8 = 7.2$.',
    },
  },

  // 12 ─ What the exam asks for (CHECK 3) ───────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Exam words',
    eyebrowFr: 'Mots d’examen',
    title: 'Read the Instruction',
    titleFr: 'Lis la consigne',
    content: 'An exam question often tells you which method to use. Do what it says, even when you could do it the other way.',
    contentFr: 'Une question d’examen dit souvent quelle méthode utiliser. Fais ce qu’elle dit, même si tu pourrais faire autrement.',
    notes: [
      {
        tone: 'write',
        text: '"**Use a mental method**": work it out in your head.\n"**Use a written method**": set it out in columns, with the points lined up.',
        textFr: '« **Use a mental method** » : calcule dans ta tête.\n« **Use a written method** » : pose le calcul en colonnes, avec les points alignés.',
      },
    ],
    check: {
      id: 'chk_written',
      q: 'A question says: "Use a written method to work out $35.6 − 8.27$." What must your working show?',
      qFr: 'Une question dit : « Use a written method to work out $35.6 − 8.27$. » Que doit montrer ton calcul ?',
      options: [
        { val: 'A', text: 'The two numbers in columns, with the points lined up and the gap filled with a zero', textFr: 'Les deux nombres en colonnes, avec les points alignés et le vide complété par un zéro' },
        { val: 'B', text: 'Only the answer', textFr: 'Seulement la réponse' },
        { val: 'C', text: 'An estimate: $36 − 8 = 28$', textFr: 'Une estimation : $36 − 8 = 28$' },
        { val: 'D', text: 'The answer written in words', textFr: 'La réponse écrite en lettres' },
      ],
      correct: 'A',
      expEn: 'A **written method** means the column method on paper: $35.60$ above $8.27$, points in one column, then the columns from the right. An answer on its own (B) is a mental method. An estimate (C) is a good check, but it is not the working. Words (D) are not a method.',
      expFr: 'Une **méthode écrite (written method)**, c’est le calcul posé en colonnes : $35.60$ au-dessus de $8.27$, les points dans une même colonne, puis les colonnes à partir de la droite. Une réponse seule (B), c’est du calcul mental. Une estimation (C) est une bonne vérification, mais ce n’est pas le calcul. Des mots (D) ne sont pas une méthode.',
    },
  },

  // 13 ─ English check: which operation? (SORT) ─────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Which Operation?',
    titleFr: 'Quelle opération ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.WORDS_ADDSUB,
    content: 'The numbers do not tell you. The **words** do.',
    contentFr: 'Les nombres ne te le disent pas. Les **mots**, si.',
    notes: [
      {
        tone: 'write',
        text: '**Change:** the money you get back when you pay too much.\n**How much more / less:** the difference between two amounts. Both are subtractions.',
        textFr: '**Change :** la monnaie qu’on te rend quand tu paies trop.\n**How much more / less :** la différence entre deux quantités. Ce sont deux soustractions.',
      },
    ],
    activity: {
      id: 'act_which_op',
      type: 'sort',
      prompt: 'Add or subtract? Sort the questions.',
      promptFr: 'Additionner ou soustraire ? Trie les questions.',
      bins: [
        { id: 'add', name: '**Add**', nameFr: '**Additionner**' },
        { id: 'sub', name: '**Subtract**', nameFr: '**Soustraire**' },
      ],
      cards: [
        { id: 'w1', name: 'Two bags are 2.4 kg and 1.85 kg. What is their mass **altogether**?', nameFr: 'Deux sacs pèsent 2.4 kg et 1.85 kg. Quelle est leur masse **en tout** (altogether) ?', bin: 'add' },
        { id: 'w2', name: 'A drink costs 1.45 dollars. You pay with 5 dollars. How much **change** do you get?', nameFr: 'Une boisson coûte 1.45 dollar. Tu paies avec 5 dollars. Combien de **monnaie** (change) reçois-tu ?', bin: 'sub' },
        { id: 'w3', name: 'A plant is 0.75 m tall. It grows 0.3 m. How tall is it **now**?', nameFr: 'Une plante mesure 0.75 m. Elle grandit de 0.3 m. Quelle est sa taille **maintenant** (now) ?', bin: 'add' },
        { id: 'w4', name: 'Lan runs 100 m in 15.2 s and Huy in 14.85 s. How much **faster** is Huy?', nameFr: 'Lan court le 100 m en 15.2 s et Huy en 14.85 s. De combien Huy est-il **plus rapide** (faster) ?', bin: 'sub' },
        { id: 'w5', name: 'A book is 6.5 dollars and a pen is 1.25 dollars. What is the **total** cost?', nameFr: 'Un livre coûte 6.5 dollars et un stylo 1.25 dollar. Quel est le prix **total** ?', bin: 'add' },
        { id: 'w6', name: 'A jug holds 2 litres. Minh drinks 0.35 litres. How much is **left**?', nameFr: 'Une carafe contient 2 litres. Minh boit 0.35 litre. Combien en **reste**-t-il (left) ?', bin: 'sub' },
      ],
      explain: '**Altogether**, **total** and "it grows" put amounts together: add. **Change**, how much **faster** and how much is **left** ask for a difference: subtract. Faster means a smaller time, so take the smaller time from the bigger one.',
      explainFr: '**Altogether**, **total** et « elle grandit » mettent des quantités ensemble : on additionne. **Change**, combien **plus rapide** (faster) et combien il en **reste** (left) demandent une différence : on soustrait. Plus rapide veut dire un temps plus petit, donc on enlève le petit temps du grand.',
    },
  },

  // 14 ─ Change (CHECK 4) ───────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Coins',
    eyebrow: 'Read it, then work',
    eyebrowFr: 'Lis, puis calcule',
    title: 'Change',
    titleFr: 'La monnaie',
    content: 'Mr Bowen buys a coffee for 2.75 dollars and a sandwich for 4.6 dollars. He pays with a 10-dollar note.\n\nMoney has two decimal places: 4.6 dollars is 4.60 dollars.',
    contentFr: 'M. Bowen achète un café à 2.75 dollars et un sandwich à 4.6 dollars. Il paie avec un billet de 10 dollars.\n\nL’argent a deux décimales : 4.6 dollars, c’est 4.60 dollars.',
    check: {
      id: 'chk_change',
      q: 'How much **change** does Mr Bowen get?',
      qFr: 'Combien de **monnaie** (change) M. Bowen reçoit-il ?',
      options: [
        { val: 'A', text: '7.35 dollars', textFr: '7.35 dollars' },
        { val: 'B', text: '3.65 dollars', textFr: '3.65 dollars' },
        { val: 'C', text: '3.75 dollars', textFr: '3.75 dollars' },
        { val: 'D', text: '2.65 dollars', textFr: '2.65 dollars' },
      ],
      correct: 'D',
      expEn: 'Two steps. First the cost: $2.75 + 4.60 = 7.35$. Then the change: $10.00 − 7.35 = 2.65$ dollars. Check: $2.65 + 7.35 = 10$. $7.35$ stops after the first step. $3.65$ forgets that the ones gave 1 away, and $3.75$ forgets that the ones and the tenths did.',
      expFr: 'Deux étapes. D’abord le prix : $2.75 + 4.60 = 7.35$. Puis la monnaie : $10.00 − 7.35 = 2.65$ dollars. Vérifie : $2.65 + 7.35 = 10$. $7.35$ s’arrête après la première étape. $3.65$ oublie que les unités ont donné 1, et $3.75$ oublie que les unités et les dixièmes l’ont fait.',
    },
  },

  // 15 ─ How much faster? Mr Bowen vs Usain Bolt (DECCOL 16.04 − 9.58) ──────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Timer',
    eyebrow: 'Times, in seconds',
    eyebrowFr: 'Temps, en secondes',
    title: 'Mr Bowen vs Usain Bolt',
    titleFr: 'M. Bowen contre Usain Bolt',
    ratio: 45,
    image: img('bolt.jpg'),
    content: 'Usain Bolt runs 100 m in 9.58 s. Mr Bowen runs it in 16.04 s.\n\nHow much **faster** is Usain Bolt? Faster is the **smaller** time, so take it from the bigger one.',
    contentFr: 'Usain Bolt court le 100 m en 9.58 s. M. Bowen le court en 16.04 s.\n\nDe combien Usain Bolt est-il **plus rapide** (faster) ? Plus rapide, c’est le temps le **plus petit**, donc enlève-le du plus grand.',
    reveal: {
      prompt: 'Mr Bowen trains, and takes exactly that much time off his run. What is his time now?',
      promptFr: 'M. Bowen s’entraîne, et gagne exactement ce temps-là sur sa course. Quel est son temps maintenant ?',
      label: 'Check this one',
      labelFr: 'Vérifie celle-ci',
      answer: '$16.04 − 6.46 = 9.58$ s — the same as Usain Bolt. It is a draw.\n\nUsain Bolt retired in 2017.',
      answerFr: '$16.04 − 6.46 = 9.58$ s — le même temps qu’Usain Bolt. Égalité.\n\nUsain Bolt a pris sa retraite en 2017.',
    },
    activity: {
      id: 'act_col_bolt',
      type: 'deccol',
      a: '16.04',
      op: '−',
      b: '9.58',
      prompt: 'Work out $16.04 − 9.58$ in columns.',
      promptFr: 'Calcule $16.04 − 9.58$ en colonnes.',
      explain: 'The points are already in one column and both numbers have two decimal places, so there are no gaps. $4 − 8$: the tenths are 0, so the ones give 1 — the tenths get 10 and keep 9, and the hundredths get 10: $14 − 8 = 6$. Then $9 − 5 = 4$, and the ones exchange with the tens: $15 − 9 = 6$. Usain Bolt is $6.46$ s faster.',
      explainFr: 'Les points sont déjà dans une même colonne et les deux nombres ont deux décimales, donc il n’y a pas de vide. $4 − 8$ : les dixièmes valent 0, donc les unités donnent 1 — les dixièmes reçoivent 10 et gardent 9, et les centièmes reçoivent 10 : $14 − 8 = 6$. Puis $9 − 5 = 4$, et les unités échangent avec les dizaines : $15 − 9 = 6$. Usain Bolt est plus rapide de $6.46$ s.',
    },
  },

  // 16 ─ Checklist + the exit question (CHECK 5) ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    eyebrowFr: 'Avant de commencer les exercices',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu le faire ?',
    content: '> Say each one out loud. If one feels shaky, go back to its slide before the practice.',
    contentFr: '> Dis chacune à voix haute. Si l’une te paraît fragile, retourne à sa diapo avant les exercices.',
    items: [
      { text: 'Line up the **points**, not the ends.', textFr: 'Aligner les **points**, pas les fins.' },
      { text: 'Fill the gaps with **zeros**. A whole number has a point at its end.', textFr: 'Compléter les vides avec des **zéros**. Un entier a un point à la fin.' },
      { text: 'Work from the right, and **exchange** when the top digit is too small.', textFr: 'Calculer à partir de la droite, et **échanger** quand le chiffre du haut est trop petit.' },
      { text: 'Check a subtraction by **adding**.', textFr: 'Vérifier une soustraction par une **addition**.' },
      { text: 'Use a **mental method**: take 3, give 0.1 back.', textFr: 'Utiliser le **calcul mental** : enlever 3, rendre 0.1.' },
      { text: 'Read **change** and **how much more** as a subtraction.', textFr: 'Lire **change** et **how much more** comme une soustraction.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: work out $5 − 1.36$.',
      qFr: 'Question de sortie : calcule $5 − 1.36$.',
      options: [
        { val: 'A', text: '$4.36$', textFr: '$4.36$' },
        { val: 'B', text: '$3.64$', textFr: '$3.64$' },
        { val: 'C', text: '$3.74$', textFr: '$3.74$' },
        { val: 'D', text: '$4.64$', textFr: '$4.64$' },
      ],
      correct: 'B',
      expEn: '$5 = 5.00$. The hundredths need a ten: the ones give 1, the tenths get 10 and keep 9, the hundredths get 10. $10 − 6 = 4$, $9 − 3 = 6$, $4 − 1 = 3$: **3.64**. Check: $3.64 + 1.36 = 5$. $3.74$ forgets that the tenths gave 1 away, $4.64$ forgets that the ones did, and $4.36$ works every column upside down.',
      expFr: '$5 = 5.00$. Les centièmes ont besoin d’une dizaine : les unités donnent 1, les dixièmes reçoivent 10 et gardent 9, les centièmes reçoivent 10. $10 − 6 = 4$, $9 − 3 = 6$, $4 − 1 = 3$ : **3.64**. Vérifie : $3.64 + 1.36 = 5$. $3.74$ oublie que les dixièmes ont donné 1, $4.64$ oublie que les unités l’ont fait, et $4.36$ calcule chaque colonne à l’envers.',
    },
  },
];
