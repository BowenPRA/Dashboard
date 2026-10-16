// src/data/Y7_MATH/U04_5/notes.js
// 4.5 Making decimal calculations easier — a self-study reduction of the
// classroom deck (C:\Users\bowen\lessons, content/y7-math/U04_5, 20 slides, one
// period). English and French only (meta.vietnamese: false). 18 layout slides,
// 17 scored items: 5 checks and 12 activities of four types (sort · predict ·
// order · makeeasy). Only the hero is unscored, and no two activities in a row
// are the same type.
//
// ONE IDEA, FROM THE CLASSROOM: SAME ANSWER, LESS WORK. Every method swaps a
// hard calculation for an easy one — × 0.2 is ÷ 10 then × 2, × 0.5 is half of,
// × 0.25 is a quarter of, × 9 and × 11 come from × 10, 4.3 × 6 is 4 × 6 + 0.3 × 6.
// The `makeeasy` activity (slides 7, 12, 14, 18) is the unit's engine on a
// slide: choose the easy way from two or three, then fill each step's box.
//
// THE SURPRISE THAT MAKES IT STICK: × a decimal less than 1 makes a number
// SMALLER. Slide 4 is the classroom's vote, now a `predict`; slide 5 is the bar
// that settles it, with an `order` (60 × 2 down to 60 × 0.1) to feel it.
//
// THE ENGLISH: "equivalent", "of" meaning × (half of, a quarter of, a tenth
// of, "0.2 of" in a story), "each" with 9 of them, and "partition".
//
// SPINE:
//   1–3    hero; the starter (reveal + sort: tenths or hundredths?); the
//          equivalent fraction (check)
//   4–7    250 × 0.2: 50 or 500? (predict); the bar of ten tenths (order); the
//          rule (check); divide first (makeeasy 800 × 0.07)
//   8      half of, a quarter of, a tenth of (sort)
//   9–12   nine lots (predict); × 9 and × 11 (check); partitioning (check);
//          pick a quick way (makeeasy 12 × 0.9 — two right ways)
//   13–15  Mr Bowen's homework (sort by slip); word problems (makeeasy story:
//          9 notebooks at 2.15 dollars); Make It Easy, the classroom game (sort)
//   16–18  the pizza (predict); rocks and feathers (check); the checklist with
//          the exit question (makeeasy 120 × 0.25)
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer. Money is "dollars", never a sign.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · A decimal point is a dot in both languages.
//  · No whiteboards, pairs, hand votes, paper, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U04_5/${f}`);

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
    eyebrow: 'Unit 4 · 4.5',
    eyebrowFr: 'Unité 4 · 4.5',
    title: 'Making Calculations Easier',
    titleFr: 'Rendre les calculs plus faciles',
    subtitle: 'Same answer, less work.',
    subtitleFr: 'Même réponse, moins de travail.',
    objective: 'Write a decimal as an equivalent fraction; multiply by a decimal by dividing by 10 or 100 first, and know that multiplying by a decimal less than 1 makes a number smaller; use half of, a quarter of and a tenth of; work out × 9 and × 11 from × 10; and partition a decimal to multiply it in parts.',
    objectiveFr: 'Écrire un décimal en fraction équivalente ; multiplier par un décimal en divisant d’abord par 10 ou 100, et savoir que multiplier par un décimal plus petit que 1 rend un nombre plus petit ; utiliser la moitié de, le quart de et le dixième de ; calculer × 9 et × 11 à partir de × 10 ; et décomposer un décimal pour le multiplier en parties.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **sort**, **predict**, **order** and **make it easy** — choose the quick way, then do it. **17 things are scored** — the first is on the next slide.',
      textFr: 'Tu vas **trier**, **prédire**, **ranger** et **rendre facile** — choisir le moyen rapide, puis le faire. **17 éléments sont notés** — le premier est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: one old, one new (reveal + SORT) ───────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter',
    eyebrowFr: 'Pour commencer',
    title: 'One Old, One New',
    titleFr: 'Un ancien, un nouveau',
    text: 'Work out $1.4 × 3$ and $9.3 ÷ 3$.',
    textFr: 'Calcule $1.4 × 3$ et $9.3 ÷ 3$.',
    sub: 'Then the new part: which column is the last digit of each decimal in?',
    subFr: 'Puis la partie nouvelle : dans quelle colonne est le dernier chiffre de chaque décimal ?',
    reveal: {
      label: 'Check the old part',
      labelFr: 'Vérifie la partie ancienne',
      answer: '$1.4 × 3 = 4.2$ and $9.3 ÷ 3 = 3.1$',
      answerFr: '$1.4 × 3 = 4.2$ et $9.3 ÷ 3 = 3.1$',
    },
    activity: {
      id: 'act_columns',
      type: 'sort',
      prompt: 'Is the last digit in the **tenths** or the **hundredths** column? Sort the six decimals.',
      promptFr: 'Le dernier chiffre est-il dans la colonne des **dixièmes** (tenths) ou des **centièmes** (hundredths) ? Trie les six décimaux.',
      bins: [
        { id: 'tenths', name: '**Tenths** — a fraction over 10', nameFr: '**Dixièmes** (tenths) — une fraction sur 10' },
        { id: 'hundredths', name: '**Hundredths** — a fraction over 100', nameFr: '**Centièmes** (hundredths) — une fraction sur 100' },
      ],
      cards: [
        { id: 'c1', name: '$0.3$', nameFr: '$0.3$', bin: 'tenths' },
        { id: 'c2', name: '$0.07$', nameFr: '$0.07$', bin: 'hundredths' },
        { id: 'c3', name: '$0.9$', nameFr: '$0.9$', bin: 'tenths' },
        { id: 'c4', name: '$0.04$', nameFr: '$0.04$', bin: 'hundredths' },
        { id: 'c5', name: '$0.5$', nameFr: '$0.5$', bin: 'tenths' },
        { id: 'c6', name: '$0.25$', nameFr: '$0.25$', bin: 'hundredths' },
      ],
      explain: 'Say each one out loud: "three tenths", "seven hundredths". The words give the fraction: $0.3 = \\frac{3}{10}$ and $0.07 = \\frac{7}{100}$. $0.25$ ends in the hundredths column, so it is $\\frac{25}{100}$.',
      explainFr: 'Dis chacun à voix haute : « trois dixièmes », « sept centièmes ». Les mots donnent la fraction : $0.3 = \\frac{3}{10}$ et $0.07 = \\frac{7}{100}$. $0.25$ finit dans la colonne des centièmes, donc c’est $\\frac{25}{100}$.',
    },
  },

  // 3 ─ Key word: equivalent fraction (CHECK 1) ─────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Equivalent Fraction',
    titleFr: 'Fraction équivalente',
    ratio: 45,
    inlineSvg: DIAGRAMS.PV_FRACTIONS,
    content: '**Equivalent** means **equal in value**. The column of the last digit is the bottom number.',
    contentFr: '**Equivalent** veut dire **de même valeur**. La colonne du dernier chiffre donne le nombre du bas.',
    notes: [
      {
        tone: 'write',
        text: '**Equivalent fraction:** a fraction with the same value as the decimal.\n$0.3 = \\frac{3}{10}$ and $0.07 = \\frac{7}{100}$\nKeep two for today: $0.5 = \\frac{1}{2}$ and $0.25 = \\frac{1}{4}$.',
        textFr: '**Fraction équivalente (equivalent fraction) :** une fraction de même valeur que le décimal.\n$0.3 = \\frac{3}{10}$ et $0.07 = \\frac{7}{100}$\nGarde-en deux pour aujourd’hui : $0.5 = \\frac{1}{2}$ et $0.25 = \\frac{1}{4}$.',
      },
    ],
    check: {
      id: 'chk_fraction',
      q: 'Which fraction is equivalent to $0.09$?',
      qFr: 'Quelle fraction est équivalente à $0.09$ ?',
      options: [
        { val: 'A', text: '$\\dfrac{9}{10}$', textFr: '$\\dfrac{9}{10}$' },
        { val: 'B', text: '$\\dfrac{9}{100}$', textFr: '$\\dfrac{9}{100}$' },
        { val: 'C', text: '$\\dfrac{9}{1000}$', textFr: '$\\dfrac{9}{1000}$' },
        { val: 'D', text: '$\\dfrac{90}{100}$', textFr: '$\\dfrac{90}{100}$' },
      ],
      correct: 'B',
      expEn: 'The 9 is in the hundredths column — say it: "nine hundredths". So $0.09 = \\frac{9}{100}$. $\\frac{9}{10}$ is $0.9$: the zero in front of the 9 matters. $\\frac{9}{1000}$ is one column too far. $\\frac{90}{100}$ is $0.90$, the same as $0.9$.',
      expFr: 'Le 9 est dans la colonne des centièmes — dis-le : « neuf centièmes ». Donc $0.09 = \\frac{9}{100}$. $\\frac{9}{10}$, c’est $0.9$ : le zéro devant le 9 compte. $\\frac{9}{1000}$ va une colonne trop loin. $\\frac{90}{100}$, c’est $0.90$, comme $0.9$.',
    },
  },

  // ── MULTIPLYING BY A DECIMAL ──────────────────────────────────────────────
  // 4 ─ The classroom vote: 250 × 0.2 (PREDICT) ─────────────────────────────
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
    text: 'Work out $250 × 0.2$',
    textFr: 'Calcule $250 × 0.2$',
    sub: 'In class, the votes split between two answers. Decide before you go on: the next slide settles it.',
    subFr: 'En classe, les votes se sont partagés entre deux réponses. Décide avant de continuer : la diapo suivante tranche.',
    activity: {
      id: 'act_vote',
      type: 'predict',
      prompt: 'What is $250 × 0.2$?',
      promptFr: 'Combien font $250 × 0.2$ ?',
      options: [
        { val: 'big', name: '$500$ — multiplying makes it bigger', nameFr: '$500$ — multiplier rend plus grand' },
        { val: 'right', name: '$50$', nameFr: '$50$' },
        { val: 'half', name: '$125$ — $× 0.2$ is $÷ 2$', nameFr: '$125$ — $× 0.2$, c’est $÷ 2$' },
      ],
      correct: 'right',
      explain: '$50$. $0.2$ is two tenths, so $250 × 0.2$ is two tenths of 250 — less than 250. $500$ is $250 × 2$. $125$ is $250 × 0.5$, half of it. The next slide draws it.',
      explainFr: '$50$. $0.2$, c’est deux dixièmes, donc $250 × 0.2$, c’est deux dixièmes de 250 — moins que 250. $500$, c’est $250 × 2$. $125$, c’est $250 × 0.5$, la moitié. La diapo suivante le dessine.',
    },
  },

  // 5 ─ The bar settles it (ORDER) ──────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Two tenths',
    eyebrowFr: 'Deux dixièmes',
    title: 'Smaller, Not Bigger',
    titleFr: 'Plus petit, pas plus grand',
    inlineSvg: DIAGRAMS.BAR_TENTHS,
    caption: '**50** is right. Multiplying by a number less than 1 makes it **smaller**.',
    captionFr: '**50** est juste. Multiplier par un nombre plus petit que 1 rend **plus petit**.',
    activity: {
      id: 'act_sizes',
      type: 'order',
      prompt: 'Put the five answers in order of size: the **smallest** first. Do not work them out — think.',
      promptFr: 'Range les cinq réponses par taille : la **plus petite** d’abord. Ne les calcule pas — réfléchis.',
      steps: [
        { id: 'x01', name: '$60 × 0.1$', nameFr: '$60 × 0.1$' },
        { id: 'x025', name: '$60 × 0.25$', nameFr: '$60 × 0.25$' },
        { id: 'x05', name: '$60 × 0.5$', nameFr: '$60 × 0.5$' },
        { id: 'x1', name: '$60 × 1$', nameFr: '$60 × 1$' },
        { id: 'x2', name: '$60 × 2$', nameFr: '$60 × 2$' },
      ],
      explain: '$60 × 1$ is 60 itself. Every number less than 1 makes 60 smaller: a tenth of it is 6, a quarter is 15, half is 30. Only $× 2$ makes it bigger: 120.',
      explainFr: '$60 × 1$, c’est 60 lui-même. Tout nombre plus petit que 1 rend 60 plus petit : le dixième, c’est 6, le quart 15, la moitié 30. Seul $× 2$ le rend plus grand : 120.',
    },
  },

  // 6 ─ The rule (CHECK 2) ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Calculator',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Multiplying by a Decimal',
    titleFr: 'Multiplier par un décimal',
    ratio: 45,
    inlineSvg: DIAGRAMS.POINT2_RULE,
    content: '$0.2$ is the same as $\\frac{2}{10}$. So divide by 10 first, then multiply by 2.',
    contentFr: '$0.2$, c’est la même chose que $\\frac{2}{10}$. Donc divise d’abord par 10, puis multiplie par 2.',
    notes: [
      {
        tone: 'write',
        text: '$× 0.2$ means $÷ 10$, then $× 2$.\n$× 0.03$ means $÷ 100$, then $× 3$.\nMultiplying by a decimal less than 1 makes a number **smaller**.',
        textFr: '$× 0.2$ veut dire $÷ 10$, puis $× 2$.\n$× 0.03$ veut dire $÷ 100$, puis $× 3$.\nMultiplier par un décimal plus petit que 1 rend un nombre **plus petit**.',
      },
    ],
    check: {
      id: 'chk_rule',
      q: 'What is the easy way to work out $600 × 0.04$?',
      qFr: 'Quel est le moyen facile pour calculer $600 × 0.04$ ?',
      options: [
        { val: 'A', text: '$600 ÷ 4$', textFr: '$600 ÷ 4$' },
        { val: 'B', text: '$600 ÷ 10$, then $× 4$', textFr: '$600 ÷ 10$, puis $× 4$' },
        { val: 'C', text: '$600 ÷ 100$, then $× 4$', textFr: '$600 ÷ 100$, puis $× 4$' },
        { val: 'D', text: '$600 × 4$', textFr: '$600 × 4$' },
      ],
      correct: 'C',
      expEn: '$0.04$ is 4 **hundredths**, so divide by 100, then multiply by 4: $6 × 4 = 24$. B treats $0.04$ as tenths — that is $× 0.4$. A treats $× 0.04$ as $÷ 4$. D forgets the point and makes 600 bigger.',
      expFr: '$0.04$, c’est 4 **centièmes**, donc divise par 100, puis multiplie par 4 : $6 × 4 = 24$. B prend $0.04$ pour des dixièmes — ce serait $× 0.4$. A prend $× 0.04$ pour $÷ 4$. D oublie le point et rend 600 plus grand.',
    },
  },

  // 7 ─ Practice: divide first (MAKEEASY) ───────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Divide First, Then Multiply',
    titleFr: 'Divise d’abord, puis multiplie',
    content: 'No calculator.\n\n**a** $60 × 0.4$\n**b** $350 × 0.3$\n**c** $1500 × 0.02$\n**d** $800 × 0.07$\n\nDo **d** below. Work out the other three, then check them.',
    contentFr: 'Sans calculatrice.\n\n**a** $60 × 0.4$\n**b** $350 × 0.3$\n**c** $1500 × 0.02$\n**d** $800 × 0.07$\n\nFais **d** ci-dessous. Calcule les trois autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $6 × 4 = 24$\n**b** $35 × 3 = 105$\n**c** $15 × 2 = 30$',
      answerFr: '**a** $6 × 4 = 24$\n**b** $35 × 3 = 105$\n**c** $15 × 2 = 30$',
    },
    activity: {
      id: 'act_easy_hundredths',
      type: 'makeeasy',
      a: '800',
      b: '0.07',
      prompt: '**d** Work out $800 × 0.07$ the easy way.',
      promptFr: '**d** Calcule $800 × 0.07$ par le moyen facile.',
      explain: '$0.07$ is 7 hundredths, so divide by 100 first: $800 ÷ 100 = 8$. Then $8 × 7 = 56$. The answer is smaller than 800, as it must be.',
      explainFr: '$0.07$, c’est 7 centièmes, donc divise d’abord par 100 : $800 ÷ 100 = 8$. Puis $8 × 7 = 56$. La réponse est plus petite que 800, comme il se doit.',
    },
  },

  // 8 ─ English check: half of, a quarter of, a tenth of (SORT) ──────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Half, Quarter, Tenth',
    titleFr: 'Moitié, quart, dixième',
    ratio: 45,
    inlineSvg: DIAGRAMS.FRIENDLY,
    content: 'In English, **of** often means **×**.',
    contentFr: 'En anglais, **of** veut souvent dire **×**.',
    notes: [
      {
        tone: 'write',
        text: '$× 0.5$ = **half of** = $÷ 2$\n$× 0.25$ = **a quarter of** = $÷ 4$\n$× 0.1$ = **a tenth of** = $÷ 10$',
        textFr: '$× 0.5$ = **half of** (la moitié de) = $÷ 2$\n$× 0.25$ = **a quarter of** (le quart de) = $÷ 4$\n$× 0.1$ = **a tenth of** (le dixième de) = $÷ 10$',
      },
    ],
    activity: {
      id: 'act_friendly',
      type: 'sort',
      prompt: 'Each card is one of three easy divisions. Sort them.',
      promptFr: 'Chaque carte est une de ces trois divisions faciles. Trie-les.',
      bins: [
        { id: 'd2', name: '$÷ 2$', nameFr: '$÷ 2$' },
        { id: 'd4', name: '$÷ 4$', nameFr: '$÷ 4$' },
        { id: 'd10', name: '$÷ 10$', nameFr: '$÷ 10$' },
      ],
      cards: [
        { id: 'f1', name: '$× 0.25$', nameFr: '$× 0.25$', bin: 'd4' },
        { id: 'f2', name: '**half of**', nameFr: '**half of** (la moitié de)', bin: 'd2' },
        { id: 'f3', name: '$× 0.1$', nameFr: '$× 0.1$', bin: 'd10' },
        { id: 'f4', name: '**a quarter of**', nameFr: '**a quarter of** (le quart de)', bin: 'd4' },
        { id: 'f5', name: '$× 0.5$', nameFr: '$× 0.5$', bin: 'd2' },
        { id: 'f6', name: '**a tenth of**', nameFr: '**a tenth of** (le dixième de)', bin: 'd10' },
      ],
      explain: '$0.5 = \\frac{1}{2}$, so $× 0.5$ is half of: $÷ 2$. $0.25 = \\frac{1}{4}$, so $× 0.25$ is a quarter of: $÷ 4$ — not $÷ 25$. $0.1 = \\frac{1}{10}$, so $× 0.1$ is a tenth of: $÷ 10$.',
      explainFr: '$0.5 = \\frac{1}{2}$, donc $× 0.5$, c’est la moitié : $÷ 2$. $0.25 = \\frac{1}{4}$, donc $× 0.25$, c’est le quart : $÷ 4$ — pas $÷ 25$. $0.1 = \\frac{1}{10}$, donc $× 0.1$, c’est le dixième : $÷ 10$.',
    },
  },

  // ── × 9 AND × 11 ──────────────────────────────────────────────────────────
  // 9 ─ Ask before you tell: nine lots (PREDICT) ────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'In your head',
    eyebrowFr: 'De tête',
    title: 'Nine Lots',
    titleFr: 'Neuf fois',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Work out $3.8 × 9$ in your head.',
    textFr: 'Calcule $3.8 × 9$ de tête.',
    sub: 'No columns. There is a quick way — look for a number that is easy to multiply by.',
    subFr: 'Pas de colonnes. Il y a un moyen rapide — cherche un nombre facile à multiplier.',
    activity: {
      id: 'act_nine',
      type: 'predict',
      prompt: 'What is $3.8 × 9$?',
      promptFr: 'Combien font $3.8 × 9$ ?',
      options: [
        { val: 'eleven', name: '$41.8$', nameFr: '$41.8$' },
        { val: 'right', name: '$34.2$', nameFr: '$34.2$' },
        { val: 'one', name: '$37$', nameFr: '$37$' },
      ],
      correct: 'right',
      explain: '$34.2$. Ten lots of 3.8 is easy: 38. Nine lots is one lot fewer: $38 − 3.8 = 34.2$. $41.8$ adds a lot — that is $3.8 × 11$. $37$ takes away 1, not one lot of 3.8.',
      explainFr: '$34.2$. Dix fois 3.8, c’est facile : 38. Neuf fois, c’est une fois de moins : $38 − 3.8 = 34.2$. $41.8$ ajoute une fois — c’est $3.8 × 11$. $37$ enlève 1, pas une fois 3.8.',
    },
  },

  // 10 ─ The rule (CHECK 3) ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Times 9, Times 11',
    titleFr: 'Fois 9, fois 11',
    ratio: 45,
    inlineSvg: DIAGRAMS.TEN_LOTS,
    content: 'Ten lots is easy. Then take one lot away, or add one more.',
    contentFr: 'Dix fois, c’est facile. Puis enlève une fois le nombre, ou ajoute-le une fois de plus.',
    notes: [
      {
        tone: 'write',
        text: '$× 9$: do $× 10$, then take away one lot.\n$3.8 × 9 = 3.8 × (10 − 1) = 38 − 3.8 = 34.2$\n$× 11$: do $× 10$, then add one lot.',
        textFr: '$× 9$ : fais $× 10$, puis enlève une fois le nombre.\n$3.8 × 9 = 3.8 × (10 − 1) = 38 − 3.8 = 34.2$\n$× 11$ : fais $× 10$, puis ajoute une fois le nombre.',
      },
    ],
    check: {
      id: 'chk_eleven',
      q: 'Work out $2.6 × 11$.',
      qFr: 'Calcule $2.6 × 11$.',
      options: [
        { val: 'A', text: '$28.6$', textFr: '$28.6$' },
        { val: 'B', text: '$27$', textFr: '$27$' },
        { val: 'C', text: '$23.4$', textFr: '$23.4$' },
        { val: 'D', text: '$286$', textFr: '$286$' },
      ],
      correct: 'A',
      expEn: 'Ten lots: $2.6 × 10 = 26$. Eleven lots is one more: $26 + 2.6 = 28.6$. $27$ adds 1, not one lot. $23.4$ takes a lot away — that is $× 9$. $286$ writes the digits of 26 and 2.6 side by side.',
      expFr: 'Dix fois : $2.6 × 10 = 26$. Onze fois, c’est une fois de plus : $26 + 2.6 = 28.6$. $27$ ajoute 1, pas une fois le nombre. $23.4$ enlève une fois — c’est $× 9$. $286$ colle les chiffres de 26 et de 2.6.',
    },
  },

  // ── PARTITIONING ──────────────────────────────────────────────────────────
  // 11 ─ Key word: partitioning (CHECK 4) ───────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Partitioning',
    titleFr: 'Décomposer',
    ratio: 45,
    inlineSvg: DIAGRAMS.PARTITION,
    content: 'In everyday English, a **partition** is a thin wall that splits a room.',
    contentFr: 'En anglais de tous les jours, une **partition** est un mur fin qui sépare une pièce.',
    notes: [
      {
        tone: 'write',
        text: '**Partitioning:** splitting a number into parts that are easy to work with.\n$4.3 × 6 = 4 × 6 + 0.3 × 6 = 24 + 1.8 = 25.8$',
        textFr: '**Décomposer (partitioning) :** couper un nombre en parties faciles à calculer.\n$4.3 × 6 = 4 × 6 + 0.3 × 6 = 24 + 1.8 = 25.8$',
      },
    ],
    check: {
      id: 'chk_partition',
      q: 'Partition $5.4 × 3$. Which line is right?',
      qFr: 'Décompose $5.4 × 3$. Quelle ligne est juste ?',
      options: [
        { val: 'A', text: '$15 + 0.4 = 15.4$', textFr: '$15 + 0.4 = 15.4$' },
        { val: 'B', text: '$15 + 1.2 = 16.2$', textFr: '$15 + 1.2 = 16.2$' },
        { val: 'C', text: '$15 + 12 = 27$', textFr: '$15 + 12 = 27$' },
        { val: 'D', text: '$15 + 0.12 = 15.12$', textFr: '$15 + 0.12 = 15.12$' },
      ],
      correct: 'B',
      expEn: '$5.4 = 5 + 0.4$. Multiply **each** part by 3: $5 × 3 = 15$ and $0.4 × 3 = 1.2$. Then add: $16.2$. A forgot to multiply the 0.4. C dropped the point: $4 × 3$ instead of $0.4 × 3$. D wrote 12 tenths as 12 hundredths.',
      expFr: '$5.4 = 5 + 0.4$. Multiplie **chaque** partie par 3 : $5 × 3 = 15$ et $0.4 × 3 = 1.2$. Puis additionne : $16.2$. A a oublié de multiplier le 0.4. C a perdu le point : $4 × 3$ au lieu de $0.4 × 3$. D a écrit 12 dixièmes comme 12 centièmes.',
    },
  },

  // 12 ─ Practice: pick a quick way (MAKEEASY — two right ways) ──────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Pick a Quick Way',
    titleFr: 'Choisis un moyen rapide',
    content: 'Work these out in your head.\n\n**a** $6.2 × 9$\n**b** $1.7 × 11$\n**c** $5.3 × 4$\n**d** $12 × 0.9$\n\nDo **d** below — it has two quick ways. Work out the other three, then check them.',
    contentFr: 'Calcule de tête.\n\n**a** $6.2 × 9$\n**b** $1.7 × 11$\n**c** $5.3 × 4$\n**d** $12 × 0.9$\n\nFais **d** ci-dessous — il y a deux moyens rapides. Calcule les trois autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $62 − 6.2 = 55.8$\n**b** $17 + 1.7 = 18.7$\n**c** $20 + 1.2 = 21.2$',
      answerFr: '**a** $62 − 6.2 = 55.8$\n**b** $17 + 1.7 = 18.7$\n**c** $20 + 1.2 = 21.2$',
    },
    activity: {
      id: 'act_easy_point9',
      type: 'makeeasy',
      a: '12',
      b: '0.9',
      prompt: '**d** Work out $12 × 0.9$ the easy way.',
      promptFr: '**d** Calcule $12 × 0.9$ par le moyen facile.',
      explain: '$0.9$ is 9 tenths, so $12 ÷ 10 × 9$ works. Quicker still: $0.9$ is one tenth less than 1, so take a tenth of 12 away from 12: $12 − 1.2 = 10.8$. $12 × 9$ is not easier — it forgets the point.',
      explainFr: '$0.9$, c’est 9 dixièmes, donc $12 ÷ 10 × 9$ marche. Encore plus rapide : $0.9$, c’est 1 moins un dixième, donc enlève un dixième de 12 à 12 : $12 − 1.2 = 10.8$. $12 × 9$ n’est pas plus facile — il oublie le point.',
    },
  },

  // ── ALL TOGETHER ──────────────────────────────────────────────────────────
  // 13 ─ One mistake per method (SORT) ──────────────────────────────────────
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
    contentFr: 'M. Bowen s’est mis **4 sur 4**.\n\nToutes les lignes sont fausses, et chacune est une erreur différente.',
    activity: {
      id: 'act_homework',
      type: 'sort',
      prompt: 'What went wrong in each line?',
      promptFr: 'Qu’est-ce qui ne va pas dans chaque ligne ?',
      bins: [
        { id: 'ten', name: 'Forgot to divide by 10 first', nameFr: 'A oublié de diviser d’abord par 10' },
        { id: 'double', name: 'Doubled instead of halving', nameFr: 'A doublé au lieu de prendre la moitié' },
        { id: 'lot', name: 'Took away 3, not one lot', nameFr: 'A enlevé 3, pas une fois le nombre' },
        { id: 'point', name: 'The point in $0.2 × 6$ is wrong', nameFr: 'Le point dans $0.2 × 6$ est faux' },
      ],
      cards: [
        { id: 'h1', name: '**a** $80 × 0.3 = 240$', nameFr: '**a** $80 × 0.3 = 240$', bin: 'ten' },
        { id: 'h2', name: '**b** $46 × 0.5 = 92$', nameFr: '**b** $46 × 0.5 = 92$', bin: 'double' },
        { id: 'h3', name: '**c** $3.4 × 9 = 34 − 3 = 31$', nameFr: '**c** $3.4 × 9 = 34 − 3 = 31$', bin: 'lot' },
        { id: 'h4', name: '**d** $5.2 × 6 = 30 + 0.12 = 30.12$', nameFr: '**d** $5.2 × 6 = 30 + 0.12 = 30.12$', bin: 'point' },
      ],
      explain: '**a** $80 ÷ 10 × 3 = 24$. **b** $× 0.5$ is half of: $46 ÷ 2 = 23$. **c** Take away the whole lot: $34 − 3.4 = 30.6$. **d** $0.2 × 6$ is 12 tenths, $1.2$, so $30 + 1.2 = 31.2$.',
      explainFr: '**a** $80 ÷ 10 × 3 = 24$. **b** $× 0.5$, c’est la moitié : $46 ÷ 2 = 23$. **c** Enlève le nombre entier : $34 − 3.4 = 30.6$. **d** $0.2 × 6$, c’est 12 dixièmes, $1.2$, donc $30 + 1.2 = 31.2$.',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 14 ─ "0.2 of" is ×; "each" with 9 of them is × (reveal + MAKEEASY story) ─
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Read it, then work',
    eyebrowFr: 'Lis, puis calcule',
    title: 'Word Problems',
    titleFr: 'Problèmes',
    content: '**1.** A bag of rice holds 750 g. Mr Bowen uses **0.2 of** the bag. How many grams does he use?\n\nWork out **1**, then check it. Problem **2** is below.',
    contentFr: '**1.** Un sac de riz contient 750 g. M. Bowen utilise **0.2 du** sac. Combien de grammes utilise-t-il ?\n\nCalcule **1**, puis vérifie. Le problème **2** est en dessous.',
    reveal: {
      label: 'Check 1',
      labelFr: 'Vérifie 1',
      answer: '"0.2 of" means $× 0.2$: $750 ÷ 10 × 2 = 150$ g',
      answerFr: '« 0.2 of » veut dire $× 0.2$ : $750 ÷ 10 × 2 = 150$ g',
    },
    activity: {
      id: 'act_easy_story',
      type: 'makeeasy',
      a: '2.15',
      b: '9',
      cue: 'each',
      context: '**2.** Mr Bowen buys 9 notebooks. **Each** one costs 2.15 dollars. How much does he pay?',
      contextFr: '**2.** M. Bowen achète 9 cahiers. **Chacun** coûte 2.15 dollars. Combien paie-t-il ?',
      prompt: 'Choose the calculation, then the easy way, then work it out.',
      promptFr: 'Choisis le calcul, puis le moyen facile, puis calcule.',
      explain: '9 notebooks at 2.15 dollars **each** is 9 lots of 2.15: $2.15 × 9$. Ten lots is 21.50 dollars; one lot fewer is $21.5 − 2.15 = 19.35$ dollars.',
      explainFr: '9 cahiers à 2.15 dollars **chacun**, c’est 9 fois 2.15 : $2.15 × 9$. Dix fois, c’est 21.50 dollars ; une fois de moins, $21.5 − 2.15 = 19.35$ dollars.',
    },
  },

  // 15 ─ The classroom's Make It Easy game, as a match (SORT) ────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Zap',
    eyebrow: 'Quick-fire',
    eyebrowFr: 'Questions éclair',
    title: 'Make It Easy',
    titleFr: 'Rends-le facile',
    content: 'Every calculation here has an easy twin. Spot it before you calculate anything.\n\nThe **Quick Fire** task deals fresh ones every time.',
    contentFr: 'Chaque calcul ici a un jumeau facile. Repère-le avant de calculer quoi que ce soit.\n\nLa tâche **Questions éclair** en distribue de nouveaux à chaque fois.',
    activity: {
      id: 'act_match',
      type: 'sort',
      prompt: 'What is the easy way for each one?',
      promptFr: 'Quel est le moyen facile pour chacun ?',
      bins: [
        { id: 'half', name: '$÷ 2$', nameFr: '$÷ 2$' },
        { id: 'quarter', name: '$÷ 4$', nameFr: '$÷ 4$' },
        { id: 'first', name: '$÷ 10$ or $÷ 100$ first, then $×$', nameFr: '$÷ 10$ ou $÷ 100$ d’abord, puis $×$' },
        { id: 'ten', name: '$× 10$ first, then one lot less or more', nameFr: '$× 10$ d’abord, puis une fois de moins ou de plus' },
      ],
      cards: [
        { id: 'm1', name: '$86 × 0.5$', nameFr: '$86 × 0.5$', bin: 'half' },
        { id: 'm2', name: '$40 × 0.3$', nameFr: '$40 × 0.3$', bin: 'first' },
        { id: 'm3', name: '$2.7 × 11$', nameFr: '$2.7 × 11$', bin: 'ten' },
        { id: 'm4', name: '$36 × 0.25$', nameFr: '$36 × 0.25$', bin: 'quarter' },
        { id: 'm5', name: '$600 × 0.02$', nameFr: '$600 × 0.02$', bin: 'first' },
        { id: 'm6', name: '$6.4 × 0.5$', nameFr: '$6.4 × 0.5$', bin: 'half' },
        { id: 'm7', name: '$1.8 × 9$', nameFr: '$1.8 × 9$', bin: 'ten' },
        { id: 'm8', name: '$90 × 0.7$', nameFr: '$90 × 0.7$', bin: 'first' },
      ],
      explain: '$× 0.5$ is half of: $86 ÷ 2 = 43$. $× 0.25$ is a quarter of: $36 ÷ 4 = 9$. Tenths and hundredths divide first: $40 ÷ 10 × 3 = 12$, $600 ÷ 100 × 2 = 12$, $90 ÷ 10 × 7 = 63$. $× 9$ and $× 11$ start at $× 10$: $27 + 2.7 = 29.7$ and $18 − 1.8 = 16.2$.',
      explainFr: '$× 0.5$, c’est la moitié : $86 ÷ 2 = 43$. $× 0.25$, c’est le quart : $36 ÷ 4 = 9$. Les dixièmes et les centièmes divisent d’abord : $40 ÷ 10 × 3 = 12$, $600 ÷ 100 × 2 = 12$, $90 ÷ 10 × 7 = 63$. $× 9$ et $× 11$ partent de $× 10$ : $27 + 2.7 = 29.7$ et $18 − 1.8 = 16.2$.',
    },
  },

  // 16 ─ Mr Bowen's pizza (PREDICT) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Half of',
    eyebrowFr: 'La moitié de',
    title: 'Mr Bowen’s Pizza',
    titleFr: 'La pizza de M. Bowen',
    ratio: 50,
    image: img('pizza.jpg'),
    content: 'Mr Bowen eats **half of** a pizza.\n\nThen he eats half of what is left. Then half of what is left again.',
    contentFr: 'M. Bowen mange **la moitié** d’une pizza.\n\nPuis il mange la moitié de ce qui reste. Puis encore la moitié de ce qui reste.',
    activity: {
      id: 'act_pizza',
      type: 'predict',
      prompt: 'How much of the pizza has he eaten?',
      promptFr: 'Quelle part de la pizza a-t-il mangée ?',
      options: [
        { val: 'three', name: '$1.5$ — three halves', nameFr: '$1.5$ — trois moitiés' },
        { val: 'left', name: '$0.125$', nameFr: '$0.125$' },
        { val: 'eaten', name: '$0.875$', nameFr: '$0.875$' },
      ],
      correct: 'eaten',
      explain: 'Half is $0.5$. Half of what is left is a quarter, $0.25$. Half of what is left again is an eighth, $0.125$. $0.5 + 0.25 + 0.125 = 0.875$. He is saving the rest for later. The rest is $0.125$. Three halves would be more pizza than there is.',
      explainFr: 'La moitié, c’est $0.5$. La moitié de ce qui reste, c’est un quart, $0.25$. La moitié de ce qui reste encore, c’est un huitième, $0.125$. $0.5 + 0.25 + 0.125 = 0.875$. Il garde le reste pour plus tard. Le reste, c’est $0.125$. Trois moitiés, ce serait plus de pizza qu’il n’y en a.',
    },
  },

  // 17 ─ Mr Bowen's shopping (CHECK 5) ──────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Scale',
    eyebrow: 'A quarter of',
    eyebrowFr: 'Le quart de',
    title: 'Mr Bowen’s Shopping',
    titleFr: 'Les courses de M. Bowen',
    content: 'Mr Bowen buys 0.5 kg of rocks.\n\nHe also buys 2 bags of feathers. **Each** bag is 0.25 kg.',
    contentFr: 'M. Bowen achète 0.5 kg de cailloux.\n\nIl achète aussi 2 sacs de plumes. **Chaque** sac fait 0.25 kg.',
    check: {
      id: 'chk_rocks',
      q: 'Which is heavier, the rocks or the feathers?',
      qFr: 'Qu’est-ce qui est le plus lourd, les cailloux ou les plumes ?',
      options: [
        { val: 'A', text: 'The rocks', textFr: 'Les cailloux' },
        { val: 'B', text: 'The feathers', textFr: 'Les plumes' },
        { val: 'C', text: 'They weigh the same', textFr: 'Ils pèsent pareil' },
      ],
      correct: 'C',
      expEn: 'Two bags at 0.25 kg **each**: $2 × 0.25 = 0.5$ kg — the same as the rocks. A: rocks feel heavier, but 0.5 kg is 0.5 kg. B: two bags sounds like more, but each bag is only a quarter of a kilogram. Nobody knows why he bought them.',
      expFr: 'Deux sacs à 0.25 kg **chacun** : $2 × 0.25 = 0.5$ kg — comme les cailloux. A : les cailloux semblent plus lourds, mais 0.5 kg, c’est 0.5 kg. B : deux sacs, ça a l’air plus, mais chaque sac ne fait qu’un quart de kilogramme. Personne ne sait pourquoi il les a achetés.',
    },
  },

  // 18 ─ Checklist + the exit question (MAKEEASY) ───────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    eyebrowFr: 'Avant de commencer les exercices',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Say each one out loud. If one feels shaky, go back to its slide before the practice.',
    contentFr: '> Dis chacune à voix haute. Si l’une te paraît fragile, retourne à sa diapo avant les exercices.',
    items: [
      { text: 'Write a decimal as an **equivalent fraction**.', textFr: 'Écrire un décimal en **fraction équivalente**.' },
      { text: 'Know that $× 0.2$ means $÷ 10$, then $× 2$.', textFr: 'Savoir que $× 0.2$ veut dire $÷ 10$, puis $× 2$.' },
      { text: 'Know that $× 0.5$ makes a number **smaller**.', textFr: 'Savoir que $× 0.5$ rend un nombre **plus petit**.' },
      { text: 'Use **half of**, **a quarter of**, **a tenth of**.', textFr: 'Utiliser **half of**, **a quarter of**, **a tenth of**.' },
      { text: 'Do $× 9$ and $× 11$ from $× 10$.', textFr: 'Faire $× 9$ et $× 11$ à partir de $× 10$.' },
      { text: 'Use **partitioning**: $4.3 = 4 + 0.3$.', textFr: 'Utiliser la **décomposition** : $4.3 = 4 + 0.3$.' },
    ],
    activity: {
      id: 'act_exit',
      type: 'makeeasy',
      a: '120',
      b: '0.25',
      prompt: 'Exit question: work out $120 × 0.25$ the easy way. Then do $4.5 × 9$ in your head — the explanation has it.',
      promptFr: 'Question de sortie : calcule $120 × 0.25$ par le moyen facile. Puis fais $4.5 × 9$ de tête — l’explication le donne.',
      explain: '$0.25$ is a quarter, so $120 ÷ 4 = 30$. And $4.5 × 9$: ten lots is 45, one lot fewer is $45 − 4.5 = 40.5$.',
      explainFr: '$0.25$, c’est un quart, donc $120 ÷ 4 = 30$. Et $4.5 × 9$ : dix fois, c’est 45, une fois de moins, $45 − 4.5 = 40.5$.',
    },
  },
];
