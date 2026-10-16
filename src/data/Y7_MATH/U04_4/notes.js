// src/data/Y7_MATH/U04_4/notes.js
// 4.4 Dividing decimals — a self-study reduction of two classroom decks
// (C:\Users\bowen\lessons, content/y7-math): the 4.4 run of U04_1_4 (slides
// 14–17, the homework's line d, slides 19, 20 and 22) and the dividing half of
// U04_review (÷ a 2-digit number, the answer that never ends, the conjecture
// and the mean). 18 layout slides, 16 scored items: 5 checks and 11 activities
// across five activity types (predict · estimate · busstop · sort · round). No
// two slides in a row go unscored, and no two activities in a row are the same
// type.
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false), like the classroom decks:
// every string has an …Fr twin and none has a …Vn one.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. ONE QUESTION HOLDS IT TOGETHER: WHERE DOES THE POINT GO? Straight up, and
//    a 0 goes in where a digit is too small to divide. The classroom vote
//    (8.24 ÷ 4: 2.06 or 2.6?) is now a `predict` on slide 2.
//
// 2. ONLY THE INVERSE SEPARATES THE TWO VOTES. Both estimate to about 2 (slide
//    3's `estimate` accepts either), so the estimate places the point but
//    cannot find the missing 0 — multiplying back can (slides 4 and 6). Every
//    explanation after that ends with its check.
//
// 3. THE ENGLISH IS THE BARRIER, AND HERE IT IS "SHARE EQUALLY". "Mr Bowen and
//    three friends" is FOUR people (slide 13); money has two decimal places
//    (slides 11–12); "conjecture" and "mean" are 4.4's Challenge words (16–17).
//
// SPINE:
//   1–4    hero; the vote (predict); estimate first (estimate); the point goes
//          straight up (BUS_STOP)
//   5–8    write the 0 (check); check with the inverse (check); your turn
//          (busstop 6.3 ÷ 4); one fact, four answers (sort)
//   9–12   write the table first (check); dividing by a bigger number (busstop
//          9.36 ÷ 12); ten dollars, three friends (predict); money has two
//          decimal places (round)
//   13–17  which operation? (check); Mr Bowen's rope (busstop 3.6 ÷ 4);
//          Mr Bowen's homework (sort); make a conjecture (predict); test it
//          with the mean (busstop 61.5 ÷ 5)
//   18     the checklist, with the exit question as the last check
//
// House notes:
//  · `$…$` inline maths everywhere in this deck; a decimal point is a dot in
//    both languages, and every `$…$` span is the same in the French.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · No whiteboards, pairs, hand votes, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';

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
    icon: 'Divide',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 4 · 4.4',
    eyebrowFr: 'Unité 4 · 4.4',
    title: 'Dividing Decimals',
    titleFr: 'Diviser des décimaux',
    objective: 'Divide a decimal by a whole number the short way — the point goes straight up, a 0 goes in where a digit is too small to divide, and zeros are added after the point until the remainder is 0; divide by a 2-digit number by writing its times table first; check every answer with the inverse calculation; and read "share equally" as divide.',
    objectiveFr: 'Diviser un décimal par un nombre entier avec la division courte — le point monte tout droit, on écrit un 0 quand un chiffre est trop petit pour être divisé, et on ajoute des zéros après le point jusqu’à ce que le reste soit 0 ; diviser par un nombre à 2 chiffres en écrivant d’abord sa table ; vérifier chaque réponse avec le calcul inverse ; et comprendre que « share equally » veut dire diviser.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **predict**, **estimate**, **divide**, **sort** and **round** your way through it. **16 things are scored** — the first is the vote on the next slide.',
      textFr: 'Tu vas **prédire**, **estimer**, **diviser**, **trier** et **arrondir** tout au long de la leçon. **16 éléments sont notés** — le premier, c’est le vote de la diapo suivante.',
    },
  },

  // 2 ─ Starter: the classroom vote, 8.24 ÷ 4 (PREDICT) ─────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Two Students Disagree',
    titleFr: 'Deux élèves en désaccord',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Work out $8.24 ÷ 4$.',
    textFr: 'Calcule $8.24 ÷ 4$.',
    sub: 'One student writes **2.06**. Another writes **2.6**.',
    subFr: 'Un élève écrit **2.06**. Un autre écrit **2.6**.',
    activity: {
      id: 'act_vote',
      type: 'predict',
      prompt: 'Who is right?',
      promptFr: 'Qui a raison ?',
      options: [
        { val: 'zero', name: '$2.06$ — there is a 0 after the point', nameFr: '$2.06$ — il y a un 0 après le point' },
        { val: 'nozero', name: '$2.6$ — 8 shared by 4 is 2, and 24 shared by 4 is 6', nameFr: '$2.6$ — 8 partagé par 4 donne 2, et 24 partagé par 4 donne 6' },
        { val: 'both', name: 'Both — they are both about 2', nameFr: 'Les deux — ils font tous les deux environ 2' },
      ],
      correct: 'zero',
      explain: '$2.06$. The 2 tenths are too small to share between 4, so the tenths place gets a **0** and the 2 is carried: 24 hundredths shared by 4 is 6 hundredths. $2.6$ skips the tenths. Both answers are about 2, so an estimate cannot tell them apart — the next slides show what can.',
      explainFr: '$2.06$. Les 2 dixièmes sont trop petits pour être partagés entre 4, donc la place des dixièmes reçoit un **0** et le 2 est reporté : 24 centièmes partagés par 4 donnent 6 centièmes. $2.6$ saute les dixièmes. Les deux réponses font environ 2, donc une estimation ne peut pas les départager — les diapos suivantes montrent ce qui le peut.',
    },
  },

  // 3 ─ Estimate first (ESTIMATE) — both votes pass it ───────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Estimate first',
    eyebrowFr: 'Estime d’abord',
    title: 'About How Big?',
    titleFr: 'Environ combien ?',
    content: 'Round $8.24$ to the nearest whole number. Then divide that by 4 in your head.\n\nThat is your **estimate**.',
    contentFr: 'Arrondis $8.24$ à l’unité près. Puis divise ce nombre par 4 de tête.\n\nC’est ton **estimation**.',
    notes: [
      {
        tone: 'write',
        text: '**Estimate:** round the numbers, then work it out in your head.\nIt tells you roughly how big the answer is, so you can check where the point goes.',
        textFr: '**Estimer (estimate) :** arrondir les nombres, puis calculer de tête.\nCela te dit à peu près combien vaut la réponse, pour vérifier où va le point.',
      },
    ],
    activity: {
      id: 'act_estimate',
      type: 'estimate',
      prompt: 'About how big is $8.24 ÷ 4$? Slide to your estimate, then lock it in.',
      promptFr: 'Combien vaut environ $8.24 ÷ 4$ ? Place le curseur sur ton estimation, puis valide.',
      min: 0,
      max: 10,
      step: 0.5,
      answer: 2,
      tolerance: 0.25,
      explain: '$8.24$ is about $8$, and $8 ÷ 4 = 2$. Both votes, $2.06$ and $2.6$, are about 2 — so the estimate cannot choose between them. It does tell you the answer is not $20.6$ or $0.206$: the point goes after the 2.',
      explainFr: '$8.24$ vaut environ $8$, et $8 ÷ 4 = 2$. Les deux votes, $2.06$ et $2.6$, font environ 2 — donc l’estimation ne peut pas choisir. Elle te dit quand même que la réponse n’est pas $20.6$ ni $0.206$ : le point va après le 2.',
    },
  },

  // 4 ─ The vote, settled: short division and the check ────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Divide',
    eyebrow: 'Short division settles it',
    eyebrowFr: 'La division courte tranche',
    title: 'The Point Goes Straight Up',
    titleFr: 'Le point monte tout droit',
    inlineSvg: DIAGRAMS.BUS_STOP,
    caption: '**2.06** is right. **2.6** forgot the 0 — and multiplying back shows it: $2.6 × 4$ is not $8.24$.',
    captionFr: '**2.06** est juste. **2.6** a oublié le 0 — et la multiplication le montre : $2.6 × 4$ ne donne pas $8.24$.',
  },

  // 5 ─ The placeholder 0 in the answer (CHECK 1) ───────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'AlertTriangle',
    eyebrow: 'This one costs marks',
    eyebrowFr: 'Celle-ci coûte des points',
    title: 'Write the 0',
    titleFr: 'Écris le 0',
    ratio: 45,
    inlineSvg: DIAGRAMS.ZERO_PLACE,
    content: 'In $8.24 ÷ 4$, 4 into 2 does not go. That place in the answer still needs a digit: **0**.',
    contentFr: 'Dans $8.24 ÷ 4$, 2 divisé par 4 ne va pas. Cette place dans la réponse a quand même besoin d’un chiffre : **0**.',
    notes: [
      {
        tone: 'write',
        text: '**Dividing a decimal:** use short division. The point goes **straight up**.\nIf a digit is too small to divide, write **0** in the answer and carry the digit.',
        textFr: '**Diviser un décimal :** pose une division courte. Le point monte **tout droit**.\nSi un chiffre est trop petit pour être divisé, écris **0** dans la réponse et reporte le chiffre.',
      },
    ],
    check: {
      id: 'chk_zero',
      q: 'Work out $15.21 ÷ 3$.',
      qFr: 'Calcule $15.21 ÷ 3$.',
      options: [
        { val: 'A', text: '$5.7$', textFr: '$5.7$' },
        { val: 'B', text: '$5.07$', textFr: '$5.07$' },
        { val: 'C', text: '$50.7$', textFr: '$50.7$' },
        { val: 'D', text: '$5.007$', textFr: '$5.007$' },
      ],
      correct: 'B',
      expEn: '3 into 15 is 5. 3 into 2 does not go, so write **0** and carry the 2: 21. 3 into 21 is 7. So $5.07$ — check: $5.07 × 3 = 15.21$. $5.7$ leaves out the 0, so the 7 lands in the tenths. $50.7$ has the point in the wrong place: it goes straight up. $5.007$ writes one 0 too many.',
      expFr: '15 divisé par 3 donne 5. 2 divisé par 3 ne va pas, alors écris **0** et reporte le 2 : 21. 21 divisé par 3 donne 7. Donc $5.07$ — vérifie : $5.07 × 3 = 15.21$. $5.7$ oublie le 0, donc le 7 tombe dans les dixièmes. $50.7$ a le point au mauvais endroit : il monte tout droit. $5.007$ écrit un 0 de trop.',
    },
  },

  // 6 ─ Key words: the inverse calculation (CHECK 2) ────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Check with the Inverse',
    titleFr: 'Vérifie avec l’inverse',
    ratio: 45,
    inlineSvg: DIAGRAMS.INVERSE,
    content: 'An estimate says "about 2". Only the inverse says **exactly**.',
    contentFr: 'Une estimation dit « environ 2 ». Seul le calcul inverse dit **exactement**.',
    notes: [
      {
        tone: 'write',
        text: '**Inverse calculation:** the opposite operation. It undoes the first one.\nTo check a division, multiply back: $2.06 × 4 = 8.24$',
        textFr: '**Calcul inverse (inverse calculation) :** l’opération contraire. Elle défait la première.\nPour vérifier une division, multiplie : $2.06 × 4 = 8.24$',
      },
    ],
    check: {
      id: 'chk_inverse',
      q: 'Lan works out $9.48 ÷ 4 = 2.37$. Which calculation checks her answer?',
      qFr: 'Lan calcule $9.48 ÷ 4 = 2.37$. Quel calcul vérifie sa réponse ?',
      options: [
        { val: 'A', text: '$9.48 × 4$', textFr: '$9.48 × 4$' },
        { val: 'B', text: '$2.37 ÷ 4$', textFr: '$2.37 ÷ 4$' },
        { val: 'C', text: '$2.37 × 4$', textFr: '$2.37 × 4$' },
        { val: 'D', text: '$9.48 − 2.37$', textFr: '$9.48 − 2.37$' },
      ],
      correct: 'C',
      expEn: 'Multiply the **answer** by the number you divided by: $2.37 × 4 = 9.48$ — back to the start, so Lan is right. $9.48 × 4$ multiplies the number she started with. $2.37 ÷ 4$ divides again, which only makes it smaller. Subtracting is not the inverse of dividing.',
      expFr: 'Multiplie la **réponse** par le nombre par lequel tu as divisé : $2.37 × 4 = 9.48$ — on retrouve le départ, donc Lan a raison. $9.48 × 4$ multiplie le nombre de départ. $2.37 ÷ 4$ divise encore, ce qui ne fait que rapetisser. Soustraire n’est pas l’inverse de diviser.',
    },
  },

  // 7 ─ Practice: the rule, with zeros added (BUSSTOP) ──────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Divide, Then Check',
    titleFr: 'Divise, puis vérifie',
    content: 'Divide the short way. Check each one with the inverse.\n\n**a** $9.36 ÷ 3$ · **b** $7.35 ÷ 5$ · **c** $0.84 ÷ 6$\n\n**d** $6.3 ÷ 4$ is below: write $6.3$ as $6.300$ and keep going.',
    contentFr: 'Divise par la division courte. Vérifie chacun avec le calcul inverse.\n\n**a** $9.36 ÷ 3$ · **b** $7.35 ÷ 5$ · **c** $0.84 ÷ 6$\n\n**d** $6.3 ÷ 4$ est ci-dessous : écris $6.3$ comme $6.300$ et continue.',
    reveal: {
      label: 'Check a, b and c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $3.12$ — check: $3.12 × 3 = 9.36$\n**b** $1.47$ — check: $1.47 × 5 = 7.35$\n**c** $0.14$ — 6 into 0 is 0, so write $0.$ first; then 6 into 8 is 1, remainder 2, and 6 into 24 is 4',
      answerFr: '**a** $3.12$ — vérifie : $3.12 × 3 = 9.36$\n**b** $1.47$ — vérifie : $1.47 × 5 = 7.35$\n**c** $0.14$ — 0 divisé par 6 donne 0, alors écris d’abord $0.$ ; puis 8 divisé par 6 donne 1, reste 2, et 24 divisé par 6 donne 4',
    },
    activity: {
      id: 'act_bus_zeros',
      type: 'busstop',
      dividend: '6.3',
      divisor: 4,
      prompt: '**d** Work out $6.3 ÷ 4$. Add zeros after the point until the remainder is 0.',
      promptFr: '**d** Calcule $6.3 ÷ 4$. Ajoute des zéros après le point jusqu’à ce que le reste soit 0.',
      explain: '4 into 6 is 1, remainder 2. The point goes straight up. 4 into 23 is 5, remainder 3. Add a zero: 4 into 30 is 7, remainder 2. Add a zero: 4 into 20 is 5, remainder 0. So $6.3 ÷ 4 = 1.575$ — and $1.575 × 4 = 6.3$.',
      explainFr: '6 divisé par 4 donne 1, reste 2. Le point monte tout droit. 23 divisé par 4 donne 5, reste 3. Ajoute un zéro : 30 divisé par 4 donne 7, reste 2. Ajoute un zéro : 20 divisé par 4 donne 5, reste 0. Donc $6.3 ÷ 4 = 1.575$ — et $1.575 × 4 = 6.3$.',
    },
  },

  // 8 ─ One fact, four answers: the point placed by estimating (SORT) ───────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Target',
    eyebrow: 'Where does the point go?',
    eyebrowFr: 'Où va le point ?',
    title: 'One Fact, Four Answers',
    titleFr: 'Un fait, quatre réponses',
    notes: [
      {
        tone: 'task',
        badge: 'Use this fact',
        badgeFr: 'Utilise ce fait',
        icon: 'Target',
        text: '$47 × 23 = 1081$\nThe digits come from the fact. **Estimate** to put the point in the right place.',
        textFr: '$47 × 23 = 1081$\nLes chiffres viennent du fait. **Estime** pour placer le point au bon endroit.',
      },
    ],
    activity: {
      id: 'act_one_fact',
      type: 'sort',
      prompt: 'Estimate each division, then sort it to its answer.',
      promptFr: 'Estime chaque division, puis range-la avec sa réponse.',
      bins: [
        { id: 'b47', name: '$4.7$', nameFr: '$4.7$' },
        { id: 'b047', name: '$0.47$', nameFr: '$0.47$' },
        { id: 'b23', name: '$2.3$', nameFr: '$2.3$' },
        { id: 'b023', name: '$0.23$', nameFr: '$0.23$' },
      ],
      cards: [
        { id: 'f1', name: '$108.1 ÷ 23$', nameFr: '$108.1 ÷ 23$', bin: 'b47' },
        { id: 'f2', name: '$10.81 ÷ 23$', nameFr: '$10.81 ÷ 23$', bin: 'b047' },
        { id: 'f3', name: '$108.1 ÷ 47$', nameFr: '$108.1 ÷ 47$', bin: 'b23' },
        { id: 'f4', name: '$10.81 ÷ 47$', nameFr: '$10.81 ÷ 47$', bin: 'b023' },
      ],
      explain: '$108.1 ÷ 23$ is about $100 ÷ 20 = 5$, so $4.7$. $10.81 ÷ 23$ is about $10 ÷ 20 = 0.5$, so $0.47$. $108.1 ÷ 47$ is about $100 ÷ 50 = 2$, so $2.3$. $10.81 ÷ 47$ is about $10 ÷ 50 = 0.2$, so $0.23$. Check one with the inverse: $2.3 × 47 = 108.1$.',
      explainFr: '$108.1 ÷ 23$ vaut environ $100 ÷ 20 = 5$, donc $4.7$. $10.81 ÷ 23$ vaut environ $10 ÷ 20 = 0.5$, donc $0.47$. $108.1 ÷ 47$ vaut environ $100 ÷ 50 = 2$, donc $2.3$. $10.81 ÷ 47$ vaut environ $10 ÷ 50 = 0.2$, donc $0.23$. Vérifie-en une avec le calcul inverse : $2.3 × 47 = 108.1$.',
    },
  },

  // ── DIVIDING BY A BIGGER NUMBER (from U04_review) ─────────────────────────
  // 9 ─ Write the times table first (CHECK 3) ───────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Divide',
    eyebrow: 'Nobody knows the 16 times table',
    eyebrowFr: 'Personne ne connaît la table de 16',
    title: 'Write the Table First',
    titleFr: 'Écris d’abord la table',
    inlineSvg: DIAGRAMS.TABLE_DIVIDE,
    caption: '$43.2 ÷ 16 = 2.7$. With the table written down, a hard division becomes reading a list.',
    captionFr: '$43.2 ÷ 16 = 2.7$. Avec la table écrite, une division difficile devient une liste à lire.',
    check: {
      id: 'chk_table',
      q: 'For $58.8 ÷ 14$ you write the 14 times table: 14, 28, 42, 56, 70 … 14 into 58 is 4, remainder 2. Which number do you divide by 14 next?',
      qFr: 'Pour $58.8 ÷ 14$, tu écris la table de 14 : 14, 28, 42, 56, 70 … 58 divisé par 14 donne 4, reste 2. Quel nombre divises-tu par 14 ensuite ?',
      options: [
        { val: 'A', text: '$28$', textFr: '$28$' },
        { val: 'B', text: '$2.8$', textFr: '$2.8$' },
        { val: 'C', text: '$82$', textFr: '$82$' },
        { val: 'D', text: '$2$', textFr: '$2$' },
      ],
      correct: 'A',
      expEn: 'The remainder 2 rides on the next digit, 8, and the two are read as one number: **28**. The table says $2 × 14 = 28$, so the next digit is 2 and $58.8 ÷ 14 = 4.2$. $2.8$ puts a point inside the carry — the point is already straight up in the answer. $82$ reads them the wrong way round. $2$ forgets the 8.',
      expFr: 'Le reste 2 se reporte sur le chiffre suivant, 8, et les deux se lisent comme un seul nombre : **28**. La table dit $2 × 14 = 28$, donc le chiffre suivant est 2 et $58.8 ÷ 14 = 4.2$. $2.8$ met un point dans la retenue — le point est déjà monté tout droit dans la réponse. $82$ les lit dans le mauvais ordre. $2$ oublie le 8.',
    },
  },

  // 10 ─ Practice: dividing by a 2-digit number (BUSSTOP) ───────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Dividing by a Bigger Number',
    titleFr: 'Diviser par un plus grand nombre',
    content: '**a** $89.6 ÷ 14$ · **b** $38.5 ÷ 11$ · **c** $70.2 ÷ 18$\n\n**d** $9.36 ÷ 12$ is below.',
    contentFr: '**a** $89.6 ÷ 14$ · **b** $38.5 ÷ 11$ · **c** $70.2 ÷ 18$\n\n**d** $9.36 ÷ 12$ est ci-dessous.',
    notes: [
      {
        tone: 'write',
        text: 'To divide by a 2-digit number, write its **times table** first.',
        textFr: 'Pour diviser par un nombre à 2 chiffres, écris d’abord sa **table**.',
      },
    ],
    reveal: {
      label: 'Check a, b and c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $6.4$ — 14 into 89 is 6, remainder 5; then 56 is $4 × 14$\n**b** $3.5$ — 11 into 38 is 3, remainder 5; then 55 is $5 × 11$\n**c** $3.9$ — 18 into 70 is 3, remainder 16; then 162 is $9 × 18$',
      answerFr: '**a** $6.4$ — 89 divisé par 14 donne 6, reste 5 ; puis 56, c’est $4 × 14$\n**b** $3.5$ — 38 divisé par 11 donne 3, reste 5 ; puis 55, c’est $5 × 11$\n**c** $3.9$ — 70 divisé par 18 donne 3, reste 16 ; puis 162, c’est $9 × 18$',
    },
    activity: {
      id: 'act_bus_twelve',
      type: 'busstop',
      dividend: '9.36',
      divisor: 12,
      prompt: '**d** Work out $9.36 ÷ 12$.',
      promptFr: '**d** Calcule $9.36 ÷ 12$.',
      explain: '12 into 9 does not go, so the answer starts $0.$ and the 9 is carried: 93. 12 into 93 is 7, remainder 9 ($7 × 12 = 84$). 12 into 96 is 8 ($8 × 12 = 96$). So $9.36 ÷ 12 = 0.78$. Check: $0.78 × 12 = 9.36$.',
      explainFr: '9 divisé par 12 ne va pas, donc la réponse commence par $0.$ et le 9 est reporté : 93. 93 divisé par 12 donne 7, reste 9 ($7 × 12 = 84$). 96 divisé par 12 donne 8 ($8 × 12 = 96$). Donc $9.36 ÷ 12 = 0.78$. Vérifie : $0.78 × 12 = 9.36$.',
    },
  },

  // ── WHEN IT NEVER ENDS (from U04_review) ──────────────────────────────────
  // 11 ─ Ask before you tell: ten dollars, three friends (PREDICT) ──────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Coins',
    eyebrow: 'Something is strange',
    eyebrowFr: 'Quelque chose cloche',
    title: 'Ten Dollars, Three Friends',
    titleFr: 'Dix dollars, trois amis',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: '3 friends share 10 dollars.',
    textFr: '3 amis partagent 10 dollars.',
    sub: 'Equally: $10 ÷ 3 = 3.333...$ and the 3s never stop.',
    subFr: 'En parts égales : $10 ÷ 3 = 3.333...$, sans fin.',
    activity: {
      id: 'act_money',
      type: 'predict',
      prompt: 'What does a shop write?',
      promptFr: 'Qu’écrit-on dans un magasin ?',
      options: [
        { val: 'one', name: '$3.3$ dollars', nameFr: '$3.3$ dollars' },
        { val: 'two', name: '$3.33$ dollars', nameFr: '$3.33$ dollars' },
        { val: 'up', name: '$3.34$ dollars', nameFr: '$3.34$ dollars' },
        { val: 'all', name: '$3.333...$ dollars', nameFr: '$3.333...$ dollars' },
      ],
      correct: 'two',
      explain: '$3.33$ dollars. Money is written to **2 decimal places** — dollars and cents. The 3rd digit is 3, so round down, and 1 cent is left over: $3 × 3.33 = 9.99$. $3.3$ is not how money is written. $3.34$ rounds the wrong way: three of them make $10.02$, more than there is. Nobody can pay $3.333...$ dollars.',
      explainFr: '$3.33$ dollars. L’argent s’écrit avec **2 décimales** — les dollars et les cents. La 3e décimale est 3, donc on arrondit au-dessous, et il reste 1 cent : $3 × 3.33 = 9.99$. $3.3$ n’est pas une façon d’écrire de l’argent. $3.34$ arrondit dans le mauvais sens : trois fois cela font $10.02$, plus qu’il n’y en a. Personne ne peut payer $3.333...$ dollars.',
    },
  },

  // 12 ─ The rule: money has two decimal places (ROUND) ─────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Coins',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Money Has Two Decimal Places',
    titleFr: 'L’argent a deux décimales',
    notes: [
      {
        tone: 'write',
        text: 'Money has **2 decimal places**. Round when it never ends; 4.5 dollars is **4.50** dollars.',
        textFr: 'L’argent a **2 décimales**. Arrondis quand ça ne finit pas ; 4.5 dollars s’écrit **4.50** dollars.',
      },
    ],
    reveal: {
      prompt: 'Write as money: **a** 7.5 dollars, **b** 7.256 dollars, **c** $9 ÷ 4$ dollars',
      promptFr: 'Écris comme de l’argent : **a** 7.5 dollars, **b** 7.256 dollars, **c** $9 ÷ 4$ dollars',
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 7.50 dollars\n**b** 7.26 dollars — the 3rd digit is 6, so round up\n**c** 2.25 dollars — it stops, so nothing is rounded',
      answerFr: '**a** 7.50 dollars\n**b** 7.26 dollars — la 3e décimale est 6, donc on arrondit au-dessus\n**c** 2.25 dollars — la division s’arrête, donc on n’arrondit rien',
    },
    activity: {
      id: 'act_round_money',
      type: 'round',
      n: '8.3333',
      to: 2,
      prompt: 'A 50-dollar prize is shared equally between 6 winners: $50 ÷ 6 = 8.3333...$ Round it to 2 decimal places.',
      promptFr: 'Un prix de 50 dollars est partagé en parts égales entre 6 gagnants : $50 ÷ 6 = 8.3333...$ Arrondis à 2 décimales.',
      explain: 'The 3rd decimal digit is 3, so round down: each winner gets **8.33** dollars. Six of them make $49.98$, so 2 cents are left over — never more than there was.',
      explainFr: 'La 3e décimale est 3, donc on arrondit au-dessous : chaque gagnant reçoit **8.33** dollars. Six fois cela font $49.98$, donc il reste 2 cents — jamais plus qu’il n’y en avait.',
    },
  },

  // ── THE WORDS CHOOSE THE OPERATION ────────────────────────────────────────
  // 13 ─ English check: share equally (CHECK 4) ─────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Which Operation?',
    titleFr: 'Quelle opération ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.WORDS_OPS,
    content: 'The numbers do not tell you. The **words** do.',
    contentFr: 'Les nombres ne te le disent pas. Les **mots**, si.',
    notes: [
      {
        tone: 'write',
        text: '**Share equally:** give everyone the same amount, so divide.\nCount everyone who shares — the person named **and** the friends.',
        textFr: '**Share equally (partager en parts égales) :** donner la même part à chacun, donc diviser.\nCompte tous ceux qui partagent — la personne nommée **et** ses amis.',
      },
    ],
    check: {
      id: 'chk_share',
      q: 'Mr Bowen and three friends share a 9.36-dollar pizza equally. Which calculation gives what each person pays?',
      qFr: 'M. Bowen et trois amis partagent une pizza à 9.36 dollars en parts égales. Quel calcul donne ce que paie chaque personne ?',
      options: [
        { val: 'A', text: '$9.36 ÷ 3$', textFr: '$9.36 ÷ 3$' },
        { val: 'B', text: '$9.36 × 4$', textFr: '$9.36 × 4$' },
        { val: 'C', text: '$9.36 ÷ 4$', textFr: '$9.36 ÷ 4$' },
        { val: 'D', text: '$9.36 − 3$', textFr: '$9.36 − 3$' },
      ],
      correct: 'C',
      expEn: 'Mr Bowen **and** three friends is 4 people, and "share equally" means divide: $9.36 ÷ 4 = 2.34$ dollars each. $9.36 ÷ 3$ forgets Mr Bowen. $9.36 × 4$ is the price of four pizzas. Subtracting does not share anything.',
      expFr: 'M. Bowen **et** trois amis, ça fait 4 personnes, et « share equally » veut dire diviser : $9.36 ÷ 4 = 2.34$ dollars chacun. $9.36 ÷ 3$ oublie M. Bowen. $9.36 × 4$ est le prix de quatre pizzas. Soustraire ne partage rien.',
    },
  },

  // 14 ─ Mr Bowen's rope: ÷, then the inverse with string (BUSSTOP) ─────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Scissors',
    eyebrow: 'Share equally',
    eyebrowFr: 'Parts égales',
    title: 'Mr Bowen’s Rope',
    titleFr: 'La corde de M. Bowen',
    content: 'Mr Bowen has a rope $3.6$ m long. He cuts it into 4 equal pieces.\n\nHow long is each piece?',
    contentFr: 'M. Bowen a une corde de $3.6$ m. Il la coupe en 4 morceaux égaux.\n\nQuelle est la longueur de chaque morceau ?',
    reveal: {
      prompt: 'Then he ties the 4 pieces back together. How long is the rope now?',
      promptFr: 'Puis il rattache les 4 morceaux ensemble. Quelle est la longueur de la corde maintenant ?',
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'Multiply back: one piece $× 4 = 3.6$ m. The inverse undoes the cut.\n\nA little less than $3.6$ m, in fact. Knots use rope.',
      answerFr: 'Multiplie : un morceau $× 4 = 3.6$ m. Le calcul inverse défait la coupe.\n\nUn peu moins de $3.6$ m, en fait. Les nœuds utilisent de la corde.',
    },
    activity: {
      id: 'act_bus_rope',
      type: 'busstop',
      dividend: '3.6',
      divisor: 4,
      prompt: 'Work out $3.6 ÷ 4$: the length of each piece, in metres.',
      promptFr: 'Calcule $3.6 ÷ 4$ : la longueur de chaque morceau, en mètres.',
      explain: '4 into 3 does not go, so write **0**, then the point, and carry the 3: 36. 4 into 36 is 9. Each piece is $0.9$ m. Check: $0.9 × 4 = 3.6$.',
      explainFr: '3 divisé par 4 ne va pas, alors écris **0**, puis le point, et reporte le 3 : 36. 36 divisé par 4 donne 9. Chaque morceau mesure $0.9$ m. Vérifie : $0.9 × 4 = 3.6$.',
    },
  },

  // 15 ─ Find the mistakes (SORT) ───────────────────────────────────────────
  // Line a is the classroom's (slide 18d); b, c and d are new, one slip each.
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowFr: 'Trouve les erreurs',
    title: 'Mr Bowen’s Homework',
    titleFr: 'Les devoirs de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.MISTAKES,
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nEvery line is wrong, and each one is a different mistake.',
    contentFr: 'M. Bowen s’est donné **4 sur 4**.\n\nToutes les lignes sont fausses, et chacune est une erreur différente.',
    activity: {
      id: 'act_homework',
      type: 'sort',
      prompt: 'What went wrong in each line?',
      promptFr: 'Qu’est-ce qui ne va pas dans chaque ligne ?',
      bins: [
        { id: 'zero', name: 'Forgot to write the 0', nameFr: 'A oublié d’écrire le 0' },
        { id: 'stop', name: 'Stopped too early', nameFr: 'S’est arrêté trop tôt' },
        { id: 'point', name: 'The point did not go straight up', nameFr: 'Le point n’est pas monté tout droit' },
        { id: 'people', name: 'Counted the people wrong', nameFr: 'A mal compté les personnes' },
      ],
      cards: [
        { id: 'h1', name: '**a** $9.18 ÷ 3 = 3.6$', nameFr: '**a** $9.18 ÷ 3 = 3.6$', bin: 'zero' },
        { id: 'h2', name: '**b** $5.3 ÷ 2 = 2.6$ r 1', nameFr: '**b** $5.3 ÷ 2 = 2.6$ r 1', bin: 'stop' },
        { id: 'h3', name: '**c** $0.75 ÷ 5 = 1.5$', nameFr: '**c** $0.75 ÷ 5 = 1.5$', bin: 'point' },
        { id: 'h4', name: '**d** Mr Bowen and 2 friends: $12.6 ÷ 2 = 6.3$ each', nameFr: '**d** M. Bowen et 2 amis : $12.6 ÷ 2 = 6.3$ chacun', bin: 'people' },
      ],
      explain: '**a** 3 into 1 does not go: write 0, so $3.06$. Check: $3.6 × 3 = 10.8$, not $9.18$. **b** A remainder is not the end — add a zero: 2 into 10 is 5, so $2.65$. **c** The point goes straight up: $0.15$. **d** That is 3 people: $12.6 ÷ 3 = 4.2$ dollars each.',
      explainFr: '**a** 1 divisé par 3 ne va pas : écris 0, donc $3.06$. Vérifie : $3.6 × 3 = 10.8$, pas $9.18$. **b** Un reste, ce n’est pas la fin — ajoute un zéro : 10 divisé par 2 donne 5, donc $2.65$. **c** Le point monte tout droit : $0.15$. **d** Ça fait 3 personnes : $12.6 ÷ 3 = 4.2$ dollars chacun.',
    },
  },

  // ── A CONJECTURE, TESTED WITH A MEAN (from U04_review; 4.4 Q14-style) ─────
  // 16 ─ Key word: conjecture (PREDICT, no wrong answer) ────────────────────
  // A conjecture is a guess, so every choice counts: the activity has no
  // `correct`. The next slide tests it.
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Lightbulb',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Make a Conjecture',
    titleFr: 'Fais une conjecture',
    ratio: 45,
    inlineSvg: DIAGRAMS.ROUTES,
    content: 'Do not calculate yet. Look at the times, and guess.',
    contentFr: 'Ne calcule pas encore. Regarde les temps, et devine.',
    notes: [
      {
        tone: 'write',
        text: '**Conjecture:** a guess that you can test.',
        textFr: '**Conjecture (conjecture) :** une supposition que l’on peut vérifier.',
      },
    ],
    activity: {
      id: 'act_conjecture',
      type: 'predict',
      prompt: 'Your conjecture: which route is quicker on average?',
      promptFr: 'Ta conjecture : quel trajet est le plus rapide en moyenne ?',
      options: [
        { val: 'A', name: 'Route A', nameFr: 'Le trajet A' },
        { val: 'B', name: 'Route B', nameFr: 'Le trajet B' },
        { val: 'same', name: 'They are the same', nameFr: 'C’est pareil' },
      ],
      explain: 'Whatever you chose, it is only a conjecture until you test it. Many people pick Route A, because Route B has the slowest day of all. But one slow day does not decide an average — the next slide works out the **mean** of each route.',
      explainFr: 'Quel que soit ton choix, ce n’est qu’une conjecture tant que tu ne l’as pas vérifiée. Beaucoup choisissent le trajet A, parce que le trajet B a le jour le plus lent. Mais un seul jour lent ne décide pas d’une moyenne — la diapo suivante calcule la **moyenne** de chaque trajet.',
    },
  },

  // 17 ─ Key word: the mean — test the conjecture (BUSSTOP) ─────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Calculator',
    eyebrow: 'Test it',
    eyebrowFr: 'Vérifie-la',
    title: 'The Mean',
    titleFr: 'La moyenne',
    content: 'Route A: $12.4 + 11.8 + 13.1 + 12.7 = 50.0$ minutes over 4 days, so its mean is $50.0 ÷ 4 = 12.5$ minutes.\n\nRoute B: $12.9 + 11.2 + 12.6 + 13.4 + 11.4 = 61.5$ minutes over **5** days.',
    contentFr: 'Trajet A : $12.4 + 11.8 + 13.1 + 12.7 = 50.0$ minutes en 4 jours, donc sa moyenne est $50.0 ÷ 4 = 12.5$ minutes.\n\nTrajet B : $12.9 + 11.2 + 12.6 + 13.4 + 11.4 = 61.5$ minutes en **5** jours.',
    notes: [
      {
        tone: 'write',
        text: '**Mean:** add up all the values, then divide by how many there are.',
        textFr: '**Moyenne (mean) :** additionne toutes les valeurs, puis divise par leur nombre.',
      },
    ],
    activity: {
      id: 'act_bus_mean',
      type: 'busstop',
      dividend: '61.5',
      divisor: 5,
      prompt: 'Work out the mean for Route B: $61.5 ÷ 5$.',
      promptFr: 'Calcule la moyenne du trajet B : $61.5 ÷ 5$.',
      explain: '5 into 6 is 1, remainder 1: 11. 5 into 11 is 2, remainder 1. The point goes straight up, and the 1 rides on the 5: 15. 5 into 15 is 3. The mean is $12.3$ minutes, less than Route A’s $12.5$ — so Route B is quicker on average, even with the slowest day of all.',
      explainFr: '6 divisé par 5 donne 1, reste 1 : 11. 11 divisé par 5 donne 2, reste 1. Le point monte tout droit, et le 1 se reporte sur le 5 : 15. 15 divisé par 5 donne 3. La moyenne est $12.3$ minutes, moins que les $12.5$ du trajet A — donc le trajet B est plus rapide en moyenne, même avec le jour le plus lent.',
    },
  },

  // 18 ─ Checklist + the exit question (CHECK 5) ────────────────────────────
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
    items: [
      { text: 'The point goes **straight up**.', textFr: 'Le point monte **tout droit**.' },
      { text: 'Too small to divide? **Write 0.**', textFr: 'Trop petit pour diviser ? **Écrire 0.**' },
      { text: '**Add zeros** until the remainder is 0.', textFr: '**Ajouter des zéros** jusqu’au reste 0.' },
      { text: '**Check** with the inverse: multiply back.', textFr: '**Vérifier** avec l’inverse : multiplier.' },
      { text: 'A 2-digit divisor? Write its **times table**.', textFr: 'Diviseur à 2 chiffres ? Écrire sa **table**.' },
      { text: '**Share equally** means divide.', textFr: '**Share equally** veut dire diviser.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: work out $6.24 ÷ 6$.',
      qFr: 'Question de sortie : calcule $6.24 ÷ 6$.',
      options: [
        { val: 'A', text: '$1.4$', textFr: '$1.4$' },
        { val: 'B', text: '$1.04$', textFr: '$1.04$' },
        { val: 'C', text: '$10.4$', textFr: '$10.4$' },
        { val: 'D', text: '$0.104$', textFr: '$0.104$' },
      ],
      correct: 'B',
      expEn: '6 into 6 is 1. 6 into 2 does not go, so write **0** and carry the 2: 24. 6 into 24 is 4. So $1.04$ — check: $1.04 × 6 = 6.24$. $1.4$ forgot the 0. $10.4$ and $0.104$ have the point in the wrong place: it goes straight up.',
      expFr: '6 divisé par 6 donne 1. 2 divisé par 6 ne va pas, alors écris **0** et reporte le 2 : 24. 24 divisé par 6 donne 4. Donc $1.04$ — vérifie : $1.04 × 6 = 6.24$. $1.4$ a oublié le 0. $10.4$ et $0.104$ ont le point au mauvais endroit : il monte tout droit.',
    },
  },
];
