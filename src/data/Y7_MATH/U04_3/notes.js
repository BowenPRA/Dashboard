// src/data/Y7_MATH/U04_3/notes.js
// 4.3 Multiplying decimals — a self-study reduction of the multiplying part of
// the classroom deck (C:\Users\bowen\lessons, content/y7-math/U04_1_4: slides
// 10–13, 17, 18c and 21) and of the 2-digit work in the review deck
// (content/y7-math/U04_review: slides 3–5, money 9–10, word problems 14), built
// to the number-engines density (docs/y7-math/number-engines.md). 18 layout
// slides, 17 scored items: 5 checks and 12 activities across six activity types
// (predict · hotspot · pointback · sort · order, and the checks). Every slide
// after the hero is scored, and no two activities in a row are the same type.
//
// English and French only (meta.vietnamese: false): every string has an …Fr
// twin and no …Vn twin.
//
// THREE THINGS SHAPE THIS DECK (all from the classroom decks, kept).
//
// 1. "DECIMALS MAKE THINGS SMALLER" IS THE MYTH. The classroom vote on 0.3 × 4
//    (0.12 or 1.2) is the starter `predict`, settled on a ruler (a hotspot, then
//    the classroom's RIBBON picture). Mr Bowen's homework comes back to it with
//    0.6 × 3 = 0.18 (the classroom's slide 18c).
//
// 2. POINT OUT, POINT BACK — AND THE ESTIMATE IS THE CHECK. Take the point out,
//    multiply whole numbers, put the point back with as many decimal places as
//    the decimal had, and check against an estimate. For a 2-digit multiplier
//    (the review deck) and for "one fact, four answers" (slide 17) the estimate
//    is what places the point. The `pointback` activity is the tap stage of the
//    Point Out, Point Back task, on a slide.
//
// 3. ZEROS: AN EXACT 9.00 MAY BE 9 — unlike a ROUNDED answer (3.2's rule) or
//    money (the review deck's 2 decimal places). And a zero the answer needs in
//    front (0.03 × 3 = 0.09) must be written.
//
// SPINE:
//   1–4    hero; two pairs disagree on 0.3 × 4 (predict); on a ruler (hotspot);
//          bigger than 1 (RIBBON, check)
//   5–8    the rule (POINT_OUT, check); your turn (pointback 2.25 × 4); zeros that
//          can go (check); a zero holds the place (pointback 0.03 × 3)
//   9–12   where does the point go? 4.7 × 32 (predict); the estimate puts it back
//          (GRID_47_32, check); estimate, then multiply (sort by size); one fact,
//          four answers (pointback 143.1 ÷ 27)
//   13–17  Mr Bowen's homework (sort: four slips); money has two decimal places
//          (check); which operation? (sort); Mr Bowen vs Usain Bolt (pointback
//          17 × 0.38); Mr Bowen goes shopping (order)
//   18     the checklist, with the exit question as a pointback
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer. Never a bare dollar sign in
//    prose: money is "dollars".
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · A decimal point is a dot in both languages.
//  · No whiteboards, pairs, hand votes, paper, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U04_3/${f}`);

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
    eyebrow: 'Unit 4 · 4.3',
    eyebrowFr: 'Unité 4 · 4.3',
    title: 'Multiplying Decimals',
    titleFr: 'Multiplier des décimaux',
    objective: 'Multiply a decimal by a whole number: estimate first, take the point out and multiply, put the point back with the same number of decimal places, and check the answer against the estimate. Use one fact to find others, write money to 2 decimal places, and solve word problems that multiply.',
    objectiveFr: 'Multiplier un décimal par un nombre entier : estimer d’abord, enlever le point et multiplier, remettre le point avec le même nombre de décimales, et vérifier la réponse avec l’estimation. Utiliser un fait pour en trouver d’autres, écrire l’argent avec 2 décimales, et résoudre des problèmes où l’on multiplie.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **predict**, **tap**, **sort** and **order** your way through it. **17 things are scored** — the first is on the next slide.',
      textFr: 'Tu vas **prédire**, **toucher**, **trier** et **ranger** tout au long de la leçon. **17 éléments sont notés** — le premier est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: the classroom's vote on 0.3 × 4 (PREDICT) ──────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Two Pairs Disagree',
    titleFr: 'Deux binômes pas d’accord',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Work out $0.3 × 4$.',
    textFr: 'Calcule $0.3 × 4$.',
    sub: 'One pair says **0.12**, because "decimals make things smaller". The other pair says **1.2**.',
    subFr: 'Un binôme dit **0.12**, car « les décimaux rendent les choses plus petites ». L’autre binôme dit **1.2**.',
    activity: {
      id: 'act_vote',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'small', name: '$0.12$', nameFr: '$0.12$' },
        { val: 'right', name: '$1.2$', nameFr: '$1.2$' },
        { val: 'whole', name: '$12$', nameFr: '$12$' },
        { val: 'add', name: '$4.3$', nameFr: '$4.3$' },
      ],
      correct: 'right',
      explain: '$1.2$. $3 × 4 = 12$, and $0.3$ has 1 decimal place, so the answer has 1. Four lots of $0.3$ must be **more** than $0.3$ — so $0.12$ cannot be right. $12$ forgot the point, and $4.3$ added instead of multiplying. The next slide shows it on a ruler.',
      explainFr: '$1.2$. $3 × 4 = 12$, et $0.3$ a 1 décimale, donc la réponse en a 1. Quatre fois $0.3$, c’est forcément **plus** que $0.3$ — donc $0.12$ ne peut pas être juste. $12$ a oublié le point, et $4.3$ a additionné au lieu de multiplier. La diapo suivante le montre sur une règle.',
    },
  },

  // 3 ─ Four lots of 0.3 m, on a rule (HOTSPOT) ─────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Four lots of 0.3',
    eyebrowFr: 'Quatre fois 0.3',
    title: 'On a Ruler',
    titleFr: 'Sur une règle',
    content: 'Each ribbon is **0.3 m** long. Lay four of them end to end, starting at 0.',
    contentFr: 'Chaque ruban mesure **0.3 m**. Pose-en quatre bout à bout, en partant de 0.',
    activity: {
      id: 'act_ruler',
      type: 'hotspot',
      prompt: 'Tap the rule where the fourth ribbon ends.',
      promptFr: 'Touche la règle là où finit le quatrième ruban.',
      svg: DIAGRAMS.RULER,
      viewBox: '0 0 920 260',
      targets: [
        { id: 'small', x: 108, y: 173, r: 26, name: '0.12 m', nameFr: '0.12 m' },
        { id: 'seven', x: 340, y: 173, r: 26, name: '0.7 m', nameFr: '0.7 m' },
        { id: 'right', x: 540, y: 173, r: 26, name: '1.2 m', nameFr: '1.2 m' },
        { id: 'far', x: 700, y: 173, r: 26, name: '1.6 m', nameFr: '1.6 m' },
      ],
      correct: 'right',
      explain: 'Four ribbons of $0.3$ m reach $1.2$ m — past the 1 m mark. $0.12$ m would not even reach the end of the first ribbon.',
      explainFr: 'Quatre rubans de $0.3$ m arrivent à $1.2$ m — après la marque de 1 m. $0.12$ m n’atteindrait même pas le bout du premier ruban.',
    },
  },

  // 4 ─ Settled: bigger than 1 (RIBBON, CHECK 1) ────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Four lots of 0.3',
    eyebrowFr: 'Quatre fois 0.3',
    title: 'Bigger Than 1',
    titleFr: 'Plus grand que 1',
    inlineSvg: DIAGRAMS.RIBBON,
    caption: '**1.2** is right. Four pieces of 0.3 m go past 1 m. Multiplying by a whole number bigger than 1 makes a decimal **bigger**.',
    captionFr: '**1.2** est juste. Quatre morceaux de 0.3 m dépassent 1 m. Multiplier par un entier plus grand que 1 rend un décimal **plus grand**.',
    check: {
      id: 'chk_bigger',
      q: 'Without working it out: which answer to $0.4 × 7$ could be right?',
      qFr: 'Sans calculer : quelle réponse à $0.4 × 7$ peut être juste ?',
      options: [
        { val: 'A', text: '$0.28$', textFr: '$0.28$' },
        { val: 'B', text: '$2.8$', textFr: '$2.8$' },
        { val: 'C', text: '$28$', textFr: '$28$' },
        { val: 'D', text: '$0.028$', textFr: '$0.028$' },
      ],
      correct: 'B',
      expEn: '7 lots of $0.4$ is more than $0.4$, but less than 7 lots of 1, which is 7. Only $2.8$ is between $0.4$ and 7. $0.28$ and $0.028$ are smaller than $0.4$ — "decimals make it smaller" again. $28$ is more than 7.',
      expFr: '7 fois $0.4$, c’est plus que $0.4$, mais moins que 7 fois 1, qui fait 7. Seul $2.8$ est entre $0.4$ et 7. $0.28$ et $0.028$ sont plus petits que $0.4$ — encore « les décimaux rendent plus petit ». $28$ est plus grand que 7.',
    },
  },

  // 5 ─ The rule: point out, point back (POINT_OUT, CHECK 2) ────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Calculator',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Multiplying a Decimal',
    titleFr: 'Multiplier un décimal',
    ratio: 40,
    inlineSvg: DIAGRAMS.POINT_OUT,
    content: 'You already know $32 × 7$.',
    contentFr: 'Tu sais déjà calculer $32 × 7$.',
    notes: [
      {
        tone: 'write',
        text: 'Take the point out and multiply: $32 × 7 = 224$.\nPut it back, with the same number of decimal places: $3.2 × 7 = 22.4$\n**Estimate** to check: $3 × 7 = 21$',
        textFr: 'Enlève le point et multiplie : $32 × 7 = 224$.\nRemets-le, avec le même nombre de décimales : $3.2 × 7 = 22.4$\n**Estime (estimate)** pour vérifier : $3 × 7 = 21$',
      },
    ],
    check: {
      id: 'chk_fact',
      q: 'You know that $46 × 8 = 368$. What is $4.6 × 8$?',
      qFr: 'Tu sais que $46 × 8 = 368$. Combien fait $4.6 × 8$ ?',
      options: [
        { val: 'A', text: '$3.68$', textFr: '$3.68$' },
        { val: 'B', text: '$368$', textFr: '$368$' },
        { val: 'C', text: '$36.8$', textFr: '$36.8$' },
        { val: 'D', text: '$0.368$', textFr: '$0.368$' },
      ],
      correct: 'C',
      expEn: '$4.6$ has 1 decimal place, so the answer has 1: $36.8$. Check it: $5 × 8 = 40$, and $36.8$ is close. $3.68$ has 2 decimal places, $368$ never put the point back, and $0.368$ is smaller than $4.6$.',
      expFr: '$4.6$ a 1 décimale, donc la réponse en a 1 : $36.8$. Vérifie : $5 × 8 = 40$, et $36.8$ en est proche. $3.68$ a 2 décimales, $368$ n’a jamais remis le point, et $0.368$ est plus petit que $4.6$.',
    },
  },

  // 6 ─ Your turn: decimal × 1-digit (POINTBACK 2.25 × 4) ───────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Point Out, Point Back',
    titleFr: 'Point enlevé, point remis',
    content: 'Estimate first. Then work it out.\n\n**a** $0.8 × 6$\n**b** $3.4 × 3$\n**c** $7 × 0.09$\n**d** $2.25 × 4$\n\nDo **d** below. Work out the other three, then check them.',
    contentFr: 'Estime d’abord. Puis calcule.\n\n**a** $0.8 × 6$\n**b** $3.4 × 3$\n**c** $7 × 0.09$\n**d** $2.25 × 4$\n\nFais **d** ci-dessous. Calcule les trois autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $4.8$ — $8 × 6 = 48$, and 1 decimal place\n**b** $10.2$ — $34 × 3 = 102$, and 1 decimal place\n**c** $0.63$ — $7 × 9 = 63$, and 2 decimal places',
      answerFr: '**a** $4.8$ — $8 × 6 = 48$, et 1 décimale\n**b** $10.2$ — $34 × 3 = 102$, et 1 décimale\n**c** $0.63$ — $7 × 9 = 63$, et 2 décimales',
    },
    activity: {
      id: 'act_pb_225',
      type: 'pointback',
      a: '2.25',
      b: '4',
      prompt: '**d** The point is out of $2.25$. Where does it go back?',
      promptFr: '**d** Le point de $2.25$ est enlevé. Où revient-il ?',
      explain: '$2.25$ has 2 decimal places, so the answer has 2: $9.00$. Estimate: $2 × 4 = 8$ — close. And $9.00$ is exactly 9: the next slide says why you may write it that way.',
      explainFr: '$2.25$ a 2 décimales, donc la réponse en a 2 : $9.00$. Estimation : $2 × 4 = 8$ — c’est proche. Et $9.00$ vaut exactement 9 : la diapo suivante explique pourquoi tu peux l’écrire ainsi.',
    },
  },

  // 7 ─ Zeros that can go — and the ones that cannot (CHECK 3) ──────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Last unit said keep the zero',
    eyebrowFr: 'L’unité 3 disait : garde le zéro',
    title: 'Zeros That Can Go',
    titleFr: 'Les zéros qui peuvent partir',
    content: '$2.25 × 4 = 9.00$, and $9.00$ is exactly $9$.\n\nNothing was **rounded**, so the zeros at the end can go.',
    contentFr: '$2.25 × 4 = 9.00$, et $9.00$ vaut exactement $9$.\n\nRien n’a été **arrondi**, donc les zéros de la fin peuvent partir.',
    notes: [
      {
        tone: 'write',
        text: 'An **exact** answer may drop the zeros at its end: $9.00 = 9$.\nA **rounded** answer keeps them: $8.996$ to 2 d.p. is $9.00$.',
        textFr: 'Une réponse **exacte** peut perdre les zéros de la fin : $9.00 = 9$.\nUne réponse **arrondie** les garde : $8.996$ à 2 d.p. donne $9.00$.',
      },
    ],
    check: {
      id: 'chk_zeros',
      q: '$1.75 × 4 = 7.00$. Can you write the answer as $7$?',
      qFr: '$1.75 × 4 = 7.00$. Peux-tu écrire la réponse $7$ ?',
      options: [
        { val: 'A', text: 'Yes — nothing was rounded, so $7.00 = 7$.', textFr: 'Oui — rien n’a été arrondi, donc $7.00 = 7$.' },
        { val: 'B', text: 'No — always keep the zeros at the end.', textFr: 'Non — garde toujours les zéros de la fin.' },
        { val: 'C', text: 'No — the answer is $0.7$.', textFr: 'Non — la réponse est $0.7$.' },
      ],
      correct: 'A',
      expEn: '$175 × 4 = 700$, and 2 decimal places gives $7.00$, which is exactly 7. The zeros at the end only matter when an answer is **rounded** — then they show how exact it is — or when it is money. $0.7$ is 10 times too small: 4 lots of $1.75$ is about $2 × 4 = 8$.',
      expFr: '$175 × 4 = 700$, et 2 décimales donnent $7.00$, qui vaut exactement 7. Les zéros de la fin ne comptent que quand une réponse est **arrondie** — ils montrent alors sa précision — ou quand c’est de l’argent. $0.7$ est 10 fois trop petit : 4 fois $1.75$, c’est environ $2 × 4 = 8$.',
    },
  },

  // 8 ─ A zero holds the place (POINTBACK 0.03 × 3) ─────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Hash',
    eyebrow: 'When the digits run out',
    eyebrowFr: 'Quand il n’y a pas assez de chiffres',
    title: 'A Zero Holds the Place',
    titleFr: 'Un zéro garde la place',
    content: '$0.03 × 3$: take the point out, and $3 × 3 = 9$.\n\n$0.03$ has **2** decimal places — but $9$ is only **one** digit.',
    contentFr: '$0.03 × 3$ : enlève le point, et $3 × 3 = 9$.\n\n$0.03$ a **2** décimales — mais $9$ n’a qu’**un** chiffre.',
    notes: [
      {
        tone: 'write',
        text: 'Not enough digits for the decimal places? Write a **0** in front to hold each empty place.',
        textFr: 'Pas assez de chiffres pour les décimales ? Écris un **0** devant pour garder chaque place vide.',
      },
    ],
    activity: {
      id: 'act_pb_zero',
      type: 'pointback',
      a: '0.03',
      b: '3',
      prompt: 'Put the point back in $0.03 × 3$. Use a faded 0 if you need one.',
      promptFr: 'Remets le point dans $0.03 × 3$. Utilise un 0 pâle si tu en as besoin.',
      explain: '$0.03$ has 2 decimal places, and the answer needs 2: $0.09$. The 0 straight after the point holds the tenths place open. $0.9$ has only 1 decimal place — it is 10 times too big.',
      explainFr: '$0.03$ a 2 décimales, et la réponse en a besoin de 2 : $0.09$. Le 0 juste après le point garde la place des dixièmes. $0.9$ n’a qu’une décimale — c’est 10 fois trop grand.',
    },
  },

  // 9 ─ Bigger numbers: where does the point go? (PREDICT, U04_review 3) ────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'A bigger number',
    eyebrowFr: 'Un plus grand nombre',
    title: 'Where Does the Point Go?',
    titleFr: 'Où va le point ?',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Work out $4.7 × 32$.',
    textFr: 'Calcule $4.7 × 32$.',
    sub: 'With the point out, $47 × 32 = 1504$. Every answer below has those digits.',
    subFr: 'Sans le point, $47 × 32 = 1504$. Toutes les réponses ci-dessous ont ces chiffres.',
    activity: {
      id: 'act_vote_big',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'two', name: '$15.04$', nameFr: '$15.04$' },
        { val: 'right', name: '$150.4$', nameFr: '$150.4$' },
        { val: 'none', name: '$1504$', nameFr: '$1504$' },
        { val: 'three', name: '$1.504$', nameFr: '$1.504$' },
      ],
      correct: 'right',
      explain: '$150.4$. Estimate: $4.7$ is about 5 and $32$ is about 30, so the answer is about $5 × 30 = 150$. Only $150.4$ is close to 150. Counting agrees: $4.7$ has 1 decimal place, so the answer has 1.',
      explainFr: '$150.4$. Estimation : $4.7$, c’est environ 5, et $32$ environ 30, donc la réponse est environ $5 × 30 = 150$. Seul $150.4$ est proche de 150. Le comptage est d’accord : $4.7$ a 1 décimale, donc la réponse en a 1.',
    },
  },

  // 10 ─ The rule for a 2-digit number (GRID_47_32, CHECK 4) ────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Multiplying by a Bigger Number',
    titleFr: 'Multiplier par un plus grand nombre',
    ratio: 45,
    inlineSvg: DIAGRAMS.GRID_47_32,
    content: '**150.4** is right. The estimate tells you where the point goes.',
    contentFr: '**150.4** est juste. L’estimation te dit où va le point.',
    notes: [
      {
        tone: 'write',
        text: 'Take the point out and multiply: $47 × 32 = 1504$.\n**Estimate** to put it back: $4.7 × 32 ≈ 5 × 30 = 150$, so $150.4$.',
        textFr: 'Enlève le point et multiplie : $47 × 32 = 1504$.\n**Estime (estimate)** pour le remettre : $4.7 × 32 ≈ 5 × 30 = 150$, donc $150.4$.',
      },
    ],
    check: {
      id: 'chk_estimate',
      q: 'You know that $53 × 21 = 1113$. Estimate first. What is $5.3 × 21$?',
      qFr: 'Tu sais que $53 × 21 = 1113$. Estime d’abord. Combien fait $5.3 × 21$ ?',
      options: [
        { val: 'A', text: '$11.13$', textFr: '$11.13$' },
        { val: 'B', text: '$1.113$', textFr: '$1.113$' },
        { val: 'C', text: '$1113$', textFr: '$1113$' },
        { val: 'D', text: '$111.3$', textFr: '$111.3$' },
      ],
      correct: 'D',
      expEn: '$5.3 × 21$ is about $5 × 20 = 100$, and $111.3$ is close to 100. $11.13$ is 10 times too small, $1113$ is 10 times too big, and $1.113$ is smaller than $5.3$ itself.',
      expFr: '$5.3 × 21$, c’est environ $5 × 20 = 100$, et $111.3$ est proche de 100. $11.13$ est 10 fois trop petit, $1113$ est 10 fois trop grand, et $1.113$ est plus petit que $5.3$ lui-même.',
    },
  },

  // 11 ─ Estimate, then multiply: sort by size (SORT) ───────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Estimate, Then Multiply',
    titleFr: 'Estime, puis multiplie',
    content: 'Write an estimate first. Then work it out.\n\n**a** $2.8 × 13$\n**b** $6.1 × 22$\n**c** $0.56 × 24$\n**d** $4.15 × 12$\n\nStart with the sorting below — it is all estimating.',
    contentFr: 'Écris d’abord une estimation. Puis calcule.\n\n**a** $2.8 × 13$\n**b** $6.1 × 22$\n**c** $0.56 × 24$\n**d** $4.15 × 12$\n\nCommence par le tri ci-dessous — ce n’est que de l’estimation.',
    reveal: {
      label: 'Check a, b, c and d',
      labelFr: 'Vérifie a, b, c et d',
      answer: '**a** $36.4$ — about $3 × 10 = 30$\n**b** $134.2$ — about $6 × 20 = 120$\n**c** $13.44$ — about $0.6 × 20 = 12$\n**d** $49.8$ — about $4 × 10 = 40$',
      answerFr: '**a** $36.4$ — environ $3 × 10 = 30$\n**b** $134.2$ — environ $6 × 20 = 120$\n**c** $13.44$ — environ $0.6 × 20 = 12$\n**d** $49.8$ — environ $4 × 10 = 40$',
    },
    activity: {
      id: 'act_sizes',
      type: 'sort',
      prompt: 'Estimate each one. How big is the answer?',
      promptFr: 'Estime chaque calcul. Quelle est la taille de la réponse ?',
      bins: [
        { id: 'one', name: 'between **1** and **10**', nameFr: 'entre **1** et **10**' },
        { id: 'ten', name: 'between **10** and **100**', nameFr: 'entre **10** et **100**' },
        { id: 'hundred', name: 'between **100** and **1000**', nameFr: 'entre **100** et **1000**' },
      ],
      cards: [
        { id: 's1', name: '$0.38 × 7$', nameFr: '$0.38 × 7$', bin: 'one' },
        { id: 's2', name: '$2.8 × 13$', nameFr: '$2.8 × 13$', bin: 'ten' },
        { id: 's3', name: '$6.1 × 22$', nameFr: '$6.1 × 22$', bin: 'hundred' },
        { id: 's4', name: '$0.56 × 24$', nameFr: '$0.56 × 24$', bin: 'ten' },
        { id: 's5', name: '$9.6 × 48$', nameFr: '$9.6 × 48$', bin: 'hundred' },
        { id: 's6', name: '$0.27 × 13$', nameFr: '$0.27 × 13$', bin: 'one' },
      ],
      explain: 'Round, then multiply: $0.4 × 7 = 2.8$ and $0.3 × 10 = 3$ (1 to 10); $3 × 10 = 30$ and $0.6 × 20 = 12$ (10 to 100); $6 × 20 = 120$ and $10 × 50 = 500$ (100 to 1000). Knowing the size tells you where the point goes.',
      explainFr: 'Arrondis, puis multiplie : $0.4 × 7 = 2.8$ et $0.3 × 10 = 3$ (1 à 10) ; $3 × 10 = 30$ et $0.6 × 20 = 12$ (10 à 100) ; $6 × 20 = 120$ et $10 × 50 = 500$ (100 à 1000). Connaître la taille te dit où va le point.',
    },
  },

  // 12 ─ One fact, four answers (POINTBACK on a fact, U04_1_4 17) ───────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Where does the point go?',
    eyebrowFr: 'Où va le point ?',
    title: 'One Fact, Four Answers',
    titleFr: 'Un fait, quatre réponses',
    content: '**a** $5.3 × 27$ · **b** $0.53 × 27$\n**c** $143.1 ÷ 27$ · **d** $14.31 ÷ 53$\nDo **c** below. Work out the other three, then check them.',
    contentFr: '**a** $5.3 × 27$ · **b** $0.53 × 27$\n**c** $143.1 ÷ 27$ · **d** $14.31 ÷ 53$\nFais **c** ci-dessous. Trouve les trois autres, puis vérifie-les.',
    notes: [
      {
        tone: 'task',
        badge: 'Use this fact',
        badgeFr: 'Utilise ce fait',
        icon: 'Target',
        text: '$53 × 27 = 1431$. Estimate first. Then put the point in the right place.',
        textFr: '$53 × 27 = 1431$. Estime d’abord. Puis place le point au bon endroit.',
      },
    ],
    reveal: {
      label: 'Check a, b and d',
      labelFr: 'Vérifie a, b et d',
      answer: '**a** $143.1$, because $5 × 30 = 150$\n**b** $14.31$, because $0.5 × 30 = 15$\n**d** $0.27$, because $15 ÷ 50 = 0.3$',
      answerFr: '**a** $143.1$, car $5 × 30 = 150$\n**b** $14.31$, car $0.5 × 30 = 15$\n**d** $0.27$, car $15 ÷ 50 = 0.3$',
    },
    activity: {
      id: 'act_pb_fact',
      type: 'pointback',
      fact: '53 × 27 = 1431',
      q: '143.1 ÷ 27',
      prompt: '**c** Estimate, then put the point in $143.1 ÷ 27$.',
      promptFr: '**c** Estime, puis place le point dans $143.1 ÷ 27$.',
      explain: '$143.1 ÷ 27$ is about $150 ÷ 30 = 5$, so the answer is near 5: $5.3$. Counting decimal places does not work for a division — the estimate does.',
      explainFr: '$143.1 ÷ 27$, c’est environ $150 ÷ 30 = 5$, donc la réponse est proche de 5 : $5.3$. Compter les décimales ne marche pas pour une division — l’estimation, si.',
    },
  },

  // 13 ─ Mr Bowen's homework: four multiplying slips (SORT, U04_1_4 18c) ────
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
        { id: 'smaller', name: 'Thought decimals make it smaller', nameFr: 'A cru que les décimaux rendent plus petit' },
        { id: 'zero', name: 'Left out a 0 that holds a place', nameFr: 'A oublié un 0 qui garde une place' },
        { id: 'left', name: 'Counted the places from the left', nameFr: 'A compté les décimales depuis la gauche' },
        { id: 'out', name: 'Never put the point back', nameFr: 'N’a jamais remis le point' },
      ],
      cards: [
        { id: 'h1', name: '**a** $0.6 × 3 = 0.18$', nameFr: '**a** $0.6 × 3 = 0.18$', bin: 'smaller' },
        { id: 'h2', name: '**b** $0.04 × 2 = 0.8$', nameFr: '**b** $0.04 × 2 = 0.8$', bin: 'zero' },
        { id: 'h3', name: '**c** $3.5 × 12 = 4.20$', nameFr: '**c** $3.5 × 12 = 4.20$', bin: 'left' },
        { id: 'h4', name: '**d** $1.6 × 4 = 64$', nameFr: '**d** $1.6 × 4 = 64$', bin: 'out' },
      ],
      explain: '**a** Three lots of $0.6$ is more than $0.6$: $1.8$. **b** $4 × 2 = 8$ needs 2 decimal places: $0.08$. **c** $35 × 12 = 420$; count 1 place from the RIGHT: $42.0 = 42$. **d** $16 × 4 = 64$ — then put the point back: $6.4$.',
      explainFr: '**a** Trois fois $0.6$, c’est plus que $0.6$ : $1.8$. **b** $4 × 2 = 8$ a besoin de 2 décimales : $0.08$. **c** $35 × 12 = 420$ ; compte 1 rang depuis la DROITE : $42.0 = 42$. **d** $16 × 4 = 64$ — puis remets le point : $6.4$.',
    },
  },

  // 14 ─ Money has two decimal places (CHECK 5, U04_review 9–10) ────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Coins',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Money Has Two Decimal Places',
    titleFr: 'L’argent a deux décimales',
    content: 'Mr Bowen buys 8 pens at **0.65 dollars each**: $0.65 × 8 = 5.20$.\n\nNothing was rounded — but this is money, so the 0 stays.',
    contentFr: 'M. Bowen achète 8 stylos à **0.65 dollar chacun** : $0.65 × 8 = 5.20$.\n\nRien n’a été arrondi — mais c’est de l’argent, donc le 0 reste.',
    notes: [
      {
        tone: 'write',
        text: 'Money is written to **2 decimal places**: dollars and cents.\n5.2 dollars is written **5.20** dollars.',
        textFr: 'L’argent s’écrit avec **2 décimales** : les dollars et les cents.\n5.2 dollars s’écrit **5.20** dollars.',
      },
    ],
    check: {
      id: 'chk_money',
      q: 'A bus ticket costs 2.35 dollars. How much do 6 tickets cost?',
      qFr: 'Un ticket de bus coûte 2.35 dollars. Combien coûtent 6 tickets ?',
      options: [
        { val: 'A', text: '1.41 dollars', textFr: '1.41 dollar' },
        { val: 'B', text: '14.10 dollars', textFr: '14.10 dollars' },
        { val: 'C', text: '14.1 dollars', textFr: '14.1 dollars' },
        { val: 'D', text: '141.0 dollars', textFr: '141.0 dollars' },
      ],
      correct: 'B',
      expEn: '$235 × 6 = 1410$, and 2 decimal places gives $14.10$. It is money, so both decimal places stay: **14.10 dollars**. 14.1 dollars is the right amount, written the wrong way for money. 1.41 dollars is less than one ticket. 141.0 dollars is 10 times too much: 6 tickets at about 2 dollars is about 12 dollars.',
      expFr: '$235 × 6 = 1410$, et 2 décimales donnent $14.10$. C’est de l’argent, donc les deux décimales restent : **14.10 dollars**. 14.1 dollars, c’est le bon montant, mal écrit pour de l’argent. 1.41 dollar, c’est moins qu’un seul ticket. 141.0 dollars, c’est 10 fois trop : 6 tickets à environ 2 dollars, c’est environ 12 dollars.',
    },
  },

  // 15 ─ English check: the words choose the operation (SORT, U04_1_4 19) ───
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
        text: '**Each** and **lots of** mean multiply: 5 pens at 2 dollars **each** is $5 × 2$.',
        textFr: '**Each** (chacun) et **lots of** (fois) veulent dire multiplier : 5 stylos à 2 dollars **each** (chacun), c’est $5 × 2$.',
      },
    ],
    activity: {
      id: 'act_words',
      type: 'sort',
      prompt: 'Six word problems. Which operation does each one need?',
      promptFr: 'Six problèmes. De quelle opération chacun a-t-il besoin ?',
      bins: [
        { id: 'mul', name: '**×** multiply', nameFr: '**×** multiplier' },
        { id: 'div', name: '**÷** divide', nameFr: '**÷** diviser' },
        { id: 'addsub', name: '**+** or **−** add or subtract', nameFr: '**+** ou **−** additionner ou soustraire' },
      ],
      cards: [
        { id: 'w1', name: '5 notebooks at 1.45 dollars **each**', nameFr: '5 notebooks at 1.45 dollars **each** (5 cahiers à 1.45 dollar chacun)', bin: 'mul' },
        { id: 'w2', name: '**Share** 8.4 kg of rice **equally** between 4 bags', nameFr: '**Share** 8.4 kg of rice **equally** between 4 bags (partager en parts égales)', bin: 'div' },
        { id: 'w3', name: 'How much **change** from 20 dollars?', nameFr: 'How much **change** from 20 dollars? (la monnaie)', bin: 'addsub' },
        { id: 'w4', name: '7 **lots of** 0.35 litres', nameFr: '7 **lots of** 0.35 litres (7 fois 0.35 litre)', bin: 'mul' },
        { id: 'w5', name: 'How far is that **altogether**?', nameFr: 'How far is that **altogether**? (en tout)', bin: 'addsub' },
        { id: 'w6', name: 'The **total** mass of 12 bags of 2.5 kg', nameFr: 'The **total** mass of 12 bags of 2.5 kg (la masse totale de 12 sacs)', bin: 'mul' },
      ],
      explain: '**Each** and **lots of** multiply. **Share equally** divides. **Change** subtracts and **altogether** adds. Careful with the last one: the total of 12 bags of 2.5 kg is $12 × 2.5$ — adding the same number again and again is multiplying.',
      explainFr: '**Each** et **lots of** multiplient. **Share equally** divise. **Change** soustrait et **altogether** additionne. Attention à la dernière : le total de 12 sacs de 2.5 kg, c’est $12 × 2.5$ — additionner encore et encore le même nombre, c’est multiplier.',
    },
  },

  // 16 ─ Mr Bowen vs Usain Bolt (POINTBACK 17 × 0.38, U04_1_4 21) ────────────
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
    content: 'Usain Bolt runs 100 m in **9.58 s**. Mr Bowen runs it in **16.04 s**.\n\nMr Bowen trains. He gets **0.38 s** faster every year, for **17 years**.\n\nWho wins now?',
    contentFr: 'Usain Bolt court le 100 m en **9.58 s**. M. Bowen le court en **16.04 s**.\n\nM. Bowen s’entraîne. Il gagne **0.38 s** chaque année, pendant **17 ans**.\n\nQui gagne maintenant ?',
    activity: {
      id: 'act_pb_bolt',
      type: 'pointback',
      a: '17',
      b: '0.38',
      prompt: 'First, how much faster is he? Put the point back in $17 × 0.38$.',
      promptFr: 'D’abord, combien plus rapide est-il ? Remets le point dans $17 × 0.38$.',
      explain: '$17 × 38 = 646$, and $0.38$ has 2 decimal places: he is $6.46$ s faster. Then $16.04 − 6.46 = 9.58$ s — exactly Usain Bolt’s time. It is a draw. (Usain Bolt retired in 2017.)',
      explainFr: '$17 × 38 = 646$, et $0.38$ a 2 décimales : il est plus rapide de $6.46$ s. Puis $16.04 − 6.46 = 9.58$ s — exactement le temps d’Usain Bolt. Égalité. (Usain Bolt a pris sa retraite en 2017.)',
    },
  },

  // 17 ─ A word problem in steps (ORDER, U04_review 14) ─────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Read it, then work',
    eyebrowFr: 'Lis, puis calcule',
    title: 'Mr Bowen Goes Shopping',
    titleFr: 'M. Bowen fait les courses',
    content: 'Mr Bowen buys **8 pens** at **0.95 dollars each** and **4 notebooks** at **1.75 dollars each**. He pays with a **20-dollar note**.\n\nHow much **change** does he get?',
    contentFr: 'M. Bowen achète **8 stylos** à **0.95 dollar chacun** et **4 cahiers** à **1.75 dollar chacun**. Il paie avec un **billet de 20 dollars**.\n\nCombien de **monnaie** (change) reçoit-il ?',
    activity: {
      id: 'act_shop',
      type: 'order',
      prompt: 'Put the four steps in order.',
      promptFr: 'Range les quatre étapes dans l’ordre.',
      steps: [
        { id: 'read', name: 'Find the words: **each** means ×, **change** means −.', nameFr: 'Trouve les mots : **each** veut dire ×, **change** veut dire −.' },
        { id: 'times', name: 'Multiply: pens $0.95 × 8 = 7.60$, notebooks $1.75 × 4 = 7.00$.', nameFr: 'Multiplie : stylos $0.95 × 8 = 7.60$, cahiers $1.75 × 4 = 7.00$.' },
        { id: 'add', name: 'Add: $7.60 + 7.00 = 14.60$ dollars altogether.', nameFr: 'Additionne : $7.60 + 7.00 = 14.60$ dollars en tout.' },
        { id: 'take', name: 'Subtract: $20.00 − 14.60 = 5.40$ dollars change.', nameFr: 'Soustrais : $20.00 − 14.60 = 5.40$ dollars de monnaie.' },
      ],
      explain: 'Read first, then multiply, add and subtract. He gets **5.40 dollars** change — money, so 2 decimal places. Check: the shopping is about $1 × 8 + 2 × 4 = 16$ dollars, so the change is about 4 dollars.',
      explainFr: 'Lis d’abord, puis multiplie, additionne et soustrais. Il reçoit **5.40 dollars** de monnaie — de l’argent, donc 2 décimales. Vérifie : les courses font environ $1 × 8 + 2 × 4 = 16$ dollars, donc la monnaie est d’environ 4 dollars.',
    },
  },

  // 18 ─ Checklist + the exit question (POINTBACK 3.4 × 25) ─────────────────
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
      { text: '**Estimate** first: round each number, then multiply.', textFr: '**Estimer** d’abord : arrondir chaque nombre, puis multiplier.' },
      { text: 'Take the **point out** and multiply whole numbers.', textFr: '**Enlever le point** et multiplier des nombres entiers.' },
      { text: 'Put the **point back**: as many decimal places as the decimal had.', textFr: '**Remettre le point** : autant de décimales que le décimal.' },
      { text: 'Check the answer is **close to the estimate**.', textFr: 'Vérifier que la réponse est **proche de l’estimation**.' },
      { text: 'Drop the zeros of an **exact** answer — but **money** keeps 2 decimal places.', textFr: 'Enlever les zéros d’une réponse **exacte** — mais l’**argent** garde 2 décimales.' },
      { text: 'Turn **each** and **lots of** into ×.', textFr: 'Traduire **each** et **lots of** par ×.' },
    ],
    activity: {
      id: 'act_pb_exit',
      type: 'pointback',
      a: '3.4',
      b: '25',
      prompt: 'Exit question: put the point back in $3.4 × 25$.',
      promptFr: 'Question de sortie : remets le point dans $3.4 × 25$.',
      explain: '$34 × 25 = 850$, and $3.4$ has 1 decimal place: $85.0$, which is exactly $85$. Estimate: $3 × 30 = 90$ — close.',
      explainFr: '$34 × 25 = 850$, et $3.4$ a 1 décimale : $85.0$, qui vaut exactement $85$. Estimation : $3 × 30 = 90$ — c’est proche.',
    },
  },
];
