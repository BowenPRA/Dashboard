// src/data/Y7_MATH/U04_1/notes.js
// 4.1 Ordering decimals — the self-study deck. English and French only.
//
// The classroom taught 4.1–4.4 in ONE period (C:\Users\bowen\lessons,
// content/y7-math/U04_1_4), and 4.1 had five slides there: the starter, the
// 3.25-or-3.3 hand vote, "Say It in English", the COMPARE rule and the Berlin
// 2009 100 m final (and slide 18a, 4.09 < 4.1). They are all here, reduced
// (docs/classroom-dashboard-pairing.md §3): the starter is an `order` on
// slide 2, the vote a `predict`, 18a a `decorder` on the rule's slide, and the
// race a `decorder` with a "who came third?" stage. The rest of the deck is
// new, from the book's section 4.1: a zero at the end changes nothing, < and
// >, the whole-number part first, "starting with the largest", the words that
// set the direction (fastest, cheapest, heaviest), money, measures in two
// units, Mr Bowen's six comparisons and a missing digit.
//
// 17 layout slides, 16 scored items: 5 checks and 11 activities across five
// types (order · predict · decorder · sort). No two activities in a row are the
// same type; never more than one unscored slide in a row.
//
// SPINE:
//   1      hero
//   2–4    the starter (order); which is bigger? (predict); say it in English (check)
//   5–7    the rule (decorder 4.09 □ 4.1); a zero at the end (check); fill with
//          zeros (decorder: four numbers, smallest first)
//   8–10   < and > (sort six pairs); whole-number part first (check); largest
//          first (decorder: five numbers)
//   11–13  the words that set the direction (sort); the 100 m final (decorder:
//          fastest first, then third); money has 2 decimal places (check)
//   14–16  the same unit first (order four parcels); Mr Bowen's homework (sort
//          right / wrong); a missing digit (decorder)
//   17     the checklist, with the exit question as the last check
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · A decimal point is a dot in both languages — the French included.
//  · No whiteboards, hand votes, pairs, paper, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U04_1/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 4 · 4.1',
    eyebrowFr: 'Unité 4 · 4.1',
    title: 'Ordering Decimals',
    titleFr: 'Ranger des nombres décimaux',
    objective: 'Say a decimal the English way; compare two decimals — whole-number part first, then fill with zeros; use < and >; and put a list in order of size, from the smallest or from the largest, even when the question says "fastest" or "cheapest".',
    objectiveFr: 'Dire un nombre décimal à l’anglaise ; comparer deux décimaux — la partie entière d’abord, puis compléter avec des zéros ; utiliser < et > ; et ranger une liste dans l’ordre, du plus petit ou du plus grand, même quand la question dit « fastest » ou « cheapest ».',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **order**, **predict**, **sort** and **fill with zeros** as you go. **16 things are scored** — the first is on the next slide.',
      textFr: 'Tu vas **ranger**, **prédire**, **trier** et **compléter avec des zéros** tout au long de la leçon. **16 éléments sont notés** — le premier est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: the classroom's four numbers (ORDER) ──────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ArrowUpDown',
    eyebrow: 'Starter',
    eyebrowFr: 'Pour commencer',
    title: 'Four Numbers',
    titleFr: 'Quatre nombres',
    label: 'Starter',
    labelFr: 'Pour commencer',
    labelIcon: 'Pencil',
    text: 'Write in order of size, starting with the smallest: $3.3$, $3.25$, $3.05$, $3.252$',
    textFr: 'Range du plus petit au plus grand : $3.3$, $3.25$, $3.05$, $3.252$',
    sub: 'Have a go before you learn the rule. The next slides are about exactly this.',
    subFr: 'Essaie avant d’apprendre la règle. Les diapos suivantes parlent justement de ça.',
    activity: {
      id: 'act_starter',
      type: 'order',
      prompt: 'Put the four numbers in order of size: the **smallest** first.',
      promptFr: 'Range les quatre nombres dans l’ordre : le **plus petit** d’abord.',
      steps: [
        { id: 'n305', name: '$3.05$', nameFr: '$3.05$' },
        { id: 'n325', name: '$3.25$', nameFr: '$3.25$' },
        { id: 'n3252', name: '$3.252$', nameFr: '$3.252$' },
        { id: 'n33', name: '$3.3$', nameFr: '$3.3$' },
      ],
      explain: 'The order is $3.05$, $3.25$, $3.252$, $3.3$. If you put $3.3$ first, you are not alone: it looks smallest because it is the shortest. It is the **largest**. The next slides show why.',
      explainFr: 'L’ordre est $3.05$, $3.25$, $3.252$, $3.3$. Si tu as mis $3.3$ en premier, tu n’es pas le seul : il a l’air plus petit parce qu’il est le plus court. C’est le **plus grand**. Les diapos suivantes montrent pourquoi.',
    },
  },

  // 3 ─ The vote, as a prediction (PREDICT) ─────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Which Is Bigger?',
    titleFr: 'Lequel est le plus grand ?',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Which number is bigger: $3.25$ or $3.3$?',
    textFr: 'Quel nombre est le plus grand : $3.25$ ou $3.3$ ?',
    sub: 'The next slide settles it.',
    subFr: 'La diapo suivante tranche.',
    activity: {
      id: 'act_vote',
      type: 'predict',
      prompt: 'Which one is bigger?',
      promptFr: 'Lequel est le plus grand ?',
      options: [
        { val: 'long', name: '$3.25$ — it has more digits', nameFr: '$3.25$ — il a plus de chiffres' },
        { val: 'short', name: '$3.3$', nameFr: '$3.3$' },
        { val: 'same', name: 'They are equal', nameFr: 'Ils sont égaux' },
      ],
      correct: 'short',
      explain: '$3.3$. Both have 3 ones, so look at the tenths: $3.3$ has 3 tenths and $3.25$ has only 2. More digits does not mean bigger. The next slide shows how English says these numbers — and why $3.25$ sounds bigger.',
      explainFr: '$3.3$. Les deux ont 3 unités, donc regarde les dixièmes : $3.3$ a 3 dixièmes et $3.25$ n’en a que 2. Plus de chiffres ne veut pas dire plus grand. La diapo suivante montre comment l’anglais dit ces nombres — et pourquoi $3.25$ a l’air plus grand.',
    },
  },

  // 4 ─ English check: say it, write it (CHECK 1) ───────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Say It in English',
    titleFr: 'Dis-le en anglais',
    inlineSvg: DIAGRAMS.SAY_IT,
    caption: '**3.3 is bigger.** In English, say each digit after the point on its own: three point two five.',
    captionFr: '**3.3 est plus grand.** En français, on dit « trois virgule vingt-cinq » : c’est pour ça que 3.25 a l’air plus grand. En anglais, on lit chiffre par chiffre : three point two five.',
    check: {
      id: 'chk_say',
      q: 'How do you say $4.17$ in English?',
      qFr: 'Comment dit-on $4.17$ en anglais ?',
      options: [
        { val: 'A', text: 'four point seventeen', textFr: 'four point seventeen' },
        { val: 'B', text: 'four point one seven', textFr: 'four point one seven' },
        { val: 'C', text: 'four comma one seven', textFr: 'four comma one seven' },
        { val: 'D', text: 'forty-one point seven', textFr: 'forty-one point seven' },
      ],
      correct: 'B',
      expEn: 'Say each digit after the point on its own: four point **one seven**. "Point seventeen" reads the decimal part as a whole number — the habit that makes $4.17$ sound bigger than $4.2$. English says and writes a point, not a comma. "Forty-one point seven" is $41.7$, a different number.',
      expFr: 'Dis chaque chiffre après le point séparément : four point **one seven**. « Point seventeen » lit la partie décimale comme un nombre entier — l’habitude qui fait paraître $4.17$ plus grand que $4.2$. L’anglais dit et écrit un point, pas une virgule. « Forty-one point seven », c’est $41.7$, un autre nombre.',
    },
  },

  // 5 ─ The rule, and the classroom's 18a (DECORDER compare) ────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Compare Decimals',
    titleFr: 'Comparer des décimaux',
    ratio: 40,
    inlineSvg: DIAGRAMS.ORDER_COLS,
    content: '$3.3$ and $3.30$ are the same number. The zero only lines them up.',
    contentFr: '$3.3$ et $3.30$ sont le même nombre. Le zéro sert seulement à les aligner.',
    notes: [
      {
        tone: 'write',
        text: '**Compare:** find which number is bigger.\nFirst look at the **whole-number parts**. Then fill with zeros and compare the **decimal parts**, from the left.\n$3.30 > 3.25$',
        textFr: '**Comparer (compare) :** trouver le nombre le plus grand.\nRegarde d’abord la **partie entière**. Puis complète avec des zéros et compare la **partie décimale**, de gauche à droite.\n$3.30 > 3.25$',
      },
    ],
    activity: {
      id: 'act_bowen_compare',
      type: 'decorder',
      kind: 'compare',
      a: '4.09',
      b: '4.1',
      prompt: 'Mr Bowen wrote $4.09 > 4.1$. Fill with zeros, then choose the right sign.',
      promptFr: 'M. Bowen a écrit $4.09 > 4.1$. Complète avec des zéros, puis choisis le bon signe.',
      explain: 'Filled: $4.09$ and $4.10$. The whole-number parts are both 4, and 0 tenths is less than 1 tenth, so $4.09 < 4.1$. Mr Bowen read $.09$ as "nine" and $.1$ as "one".',
      explainFr: 'Complétés : $4.09$ et $4.10$. Les parties entières valent toutes les deux 4, et 0 dixième, c’est moins que 1 dixième, donc $4.09 < 4.1$. M. Bowen a lu $.09$ comme « neuf » et $.1$ comme « un ».',
    },
  },

  // 6 ─ A zero at the end changes nothing (CHECK 2) ─────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Same number, more zeros',
    eyebrowFr: 'Même nombre, plus de zéros',
    title: 'Fill with Zeros',
    titleFr: 'Compléter avec des zéros',
    content: 'A zero at the **end** of the decimal part changes nothing:\n\n$$6.5 = 6.50 = 6.500$$\n\nA zero straight **after the point** changes everything: $6.05$ is not $6.5$.',
    contentFr: 'Un zéro à la **fin** de la partie décimale ne change rien :\n\n$$6.5 = 6.50 = 6.500$$\n\nUn zéro juste **après le point** change tout : $6.05$ n’est pas $6.5$.',
    notes: [
      {
        tone: 'write',
        text: '**Fill with zeros:** write zeros at the end of the decimal part, so the numbers have the same number of decimal places.\nIt does not change the number.',
        textFr: '**Compléter avec des zéros (fill with zeros) :** écrire des zéros à la fin de la partie décimale, pour que les nombres aient le même nombre de décimales.\nCela ne change pas le nombre.',
      },
    ],
    check: {
      id: 'chk_zero',
      q: 'Which number is equal to $7.2$?',
      qFr: 'Quel nombre est égal à $7.2$ ?',
      options: [
        { val: 'A', text: '$7.02$', textFr: '$7.02$' },
        { val: 'B', text: '$7.22$', textFr: '$7.22$' },
        { val: 'C', text: '$7.20$', textFr: '$7.20$' },
        { val: 'D', text: '$0.72$', textFr: '$0.72$' },
      ],
      correct: 'C',
      expEn: '$7.20$ is $7.2$ with a zero at the end: 2 tenths and 0 hundredths. $7.02$ puts the zero straight after the point, so it has 0 tenths — much smaller. $7.22$ has 2 extra hundredths. $0.72$ has moved every digit one place right.',
      expFr: '$7.20$, c’est $7.2$ avec un zéro à la fin : 2 dixièmes et 0 centième. $7.02$ met le zéro juste après le point, donc il a 0 dixième — bien plus petit. $7.22$ a 2 centièmes de plus. $0.72$ a décalé chaque chiffre d’un rang vers la droite.',
    },
  },

  // 7 ─ The starter list, filled; then your own (DECORDER order) ────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Columns3',
    eyebrow: 'Line up the points',
    eyebrowFr: 'Aligne les points',
    title: 'Fill, Then Order',
    titleFr: 'Complète, puis range',
    ratio: 45,
    inlineSvg: DIAGRAMS.FILL_ZEROS,
    content: 'The starter list, lined up at the point and filled with zeros. Every number now has **3 decimal places**, so you can compare them digit by digit, from the left.',
    contentFr: 'La liste du début, alignée sur le point et complétée avec des zéros. Chaque nombre a maintenant **3 décimales** : tu peux les comparer chiffre par chiffre, de gauche à droite.',
    activity: {
      id: 'act_fill_order',
      type: 'decorder',
      kind: 'order',
      nums: ['0.6', '0.06', '0.66', '0.606'],
      dir: 'asc',
      prompt: 'Your turn. Fill with zeros, then put them in order of size, **smallest first**.',
      promptFr: 'À toi. Complète avec des zéros, puis range-les dans l’ordre, **du plus petit au plus grand**.',
      explain: 'Filled: $0.600$, $0.060$, $0.660$, $0.606$. Look at the tenths first: only $0.060$ has 0 tenths, so $0.06$ is the smallest. Then $0.600 < 0.606 < 0.660$. The order is $0.06$, $0.6$, $0.606$, $0.66$.',
      explainFr: 'Complétés : $0.600$, $0.060$, $0.660$, $0.606$. Regarde d’abord les dixièmes : seul $0.060$ a 0 dixième, donc $0.06$ est le plus petit. Puis $0.600 < 0.606 < 0.660$. L’ordre est $0.06$, $0.6$, $0.606$, $0.66$.',
    },
  },

  // 8 ─ The two signs (SORT) ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Less Than, Greater Than',
    titleFr: 'Inférieur à, supérieur à',
    ratio: 40,
    inlineSvg: DIAGRAMS.SIGNS,
    notes: [
      {
        tone: 'write',
        text: '**<** means **is less than**. **>** means **is greater than**.\nThe open side faces the bigger number.\n$5.1 > 5.09$ is read "5.1 is greater than 5.09".',
        textFr: '**<** veut dire **est inférieur à** (is less than). **>** veut dire **est supérieur à** (is greater than).\nLe côté ouvert est tourné vers le plus grand nombre.\n$5.1 > 5.09$ se lit « 5.1 is greater than 5.09 ».',
      },
    ],
    activity: {
      id: 'act_signs',
      type: 'sort',
      prompt: 'Which sign goes in each box? Sort the six pairs.',
      promptFr: 'Quel signe va dans chaque case ? Trie les six paires.',
      bins: [
        { id: 'lt', name: '**<** is less than', nameFr: '**<** est inférieur à' },
        { id: 'eq', name: '**=** is equal to', nameFr: '**=** est égal à' },
        { id: 'gt', name: '**>** is greater than', nameFr: '**>** est supérieur à' },
      ],
      cards: [
        { id: 's1', name: '$0.4 \\;\\square\\; 0.38$', nameFr: '$0.4 \\;\\square\\; 0.38$', bin: 'gt' },
        { id: 's2', name: '$2.07 \\;\\square\\; 2.7$', nameFr: '$2.07 \\;\\square\\; 2.7$', bin: 'lt' },
        { id: 's3', name: '$9.50 \\;\\square\\; 9.5$', nameFr: '$9.50 \\;\\square\\; 9.5$', bin: 'eq' },
        { id: 's4', name: '$15.1 \\;\\square\\; 9.99$', nameFr: '$15.1 \\;\\square\\; 9.99$', bin: 'gt' },
        { id: 's5', name: '$0.08 \\;\\square\\; 0.1$', nameFr: '$0.08 \\;\\square\\; 0.1$', bin: 'lt' },
        { id: 's6', name: '$3.3 \\;\\square\\; 3.300$', nameFr: '$3.3 \\;\\square\\; 3.300$', bin: 'eq' },
      ],
      explain: '$0.40 > 0.38$ and $2.07 < 2.70$ — fill with zeros. $9.50 = 9.5$ and $3.3 = 3.300$ — a zero at the end changes nothing. $15.1 > 9.99$ — the whole-number part decides. $0.08 < 0.10$ — longer is not bigger.',
      explainFr: '$0.40 > 0.38$ et $2.07 < 2.70$ — complète avec des zéros. $9.50 = 9.5$ et $3.3 = 3.300$ — un zéro à la fin ne change rien. $15.1 > 9.99$ — la partie entière décide. $0.08 < 0.10$ — plus long ne veut pas dire plus grand.',
    },
  },

  // 9 ─ The whole-number part decides first (CHECK 3) ───────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Hash',
    eyebrow: 'Look here first',
    eyebrowFr: 'Regarde ici d’abord',
    title: 'Whole-Number Part First',
    titleFr: 'La partie entière d’abord',
    ratio: 40,
    inlineSvg: DIAGRAMS.WHOLE_FIRST,
    content: '$9.875$ has more digits than $12.5$. It does not matter: the **whole-number part** decides first.',
    contentFr: '$9.875$ a plus de chiffres que $12.5$. Ça ne compte pas : la **partie entière** décide d’abord.',
    notes: [
      {
        tone: 'write',
        text: 'Compare the **whole-number parts** first.\nOnly when they are the same, fill with zeros and compare the **decimal parts**.',
        textFr: 'Compare d’abord les **parties entières**.\nSeulement si elles sont égales, complète avec des zéros et compare les **parties décimales**.',
      },
    ],
    check: {
      id: 'chk_whole',
      q: 'Which number is the **largest**?',
      qFr: 'Quel nombre est le **plus grand** ?',
      options: [
        { val: 'A', text: '$11.3$', textFr: '$11.3$' },
        { val: 'B', text: '$9.987$', textFr: '$9.987$' },
        { val: 'C', text: '$11.06$', textFr: '$11.06$' },
        { val: 'D', text: '$10.95$', textFr: '$10.95$' },
      ],
      correct: 'A',
      expEn: 'The whole-number parts are 11, 9, 11 and 10, so it is one of the two 11s. Fill with zeros: $11.30$ beats $11.06$, because 3 tenths beat 0 tenths. $9.987$ has the most digits, but 9 is the smallest whole-number part. $10.95$ has a big decimal part, but 10 is less than 11.',
      expFr: 'Les parties entières sont 11, 9, 11 et 10, donc c’est l’un des deux 11. Complète avec des zéros : $11.30$ l’emporte sur $11.06$, car 3 dixièmes l’emportent sur 0 dixième. $9.987$ a le plus de chiffres, mais 9 est la plus petite partie entière. $10.95$ a une grande partie décimale, mais 10 est plus petit que 11.',
    },
  },

  // 10 ─ Starting with the largest (DECORDER order, desc) ───────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'ArrowDownUp',
    eyebrow: 'Read the whole question',
    eyebrowFr: 'Lis toute la question',
    title: 'Largest First',
    titleFr: 'Le plus grand d’abord',
    content: 'The book asks for numbers **in order of size**. Read the end of the sentence before you start: **starting with the smallest**, or **starting with the largest**?',
    contentFr: 'Le livre demande les nombres **dans l’ordre de taille** (in order of size). Lis la fin de la phrase avant de commencer : **starting with the smallest** (le plus petit d’abord) ou **starting with the largest** (le plus grand d’abord) ?',
    notes: [
      {
        tone: 'write',
        text: '**In order of size:** from the smallest to the largest, or from the largest to the smallest.\nThe question tells you which one to **start with**.',
        textFr: '**Dans l’ordre de taille (in order of size) :** du plus petit au plus grand, ou du plus grand au plus petit.\nLa question te dit par lequel **commencer**.',
      },
    ],
    activity: {
      id: 'act_largest',
      type: 'decorder',
      kind: 'order',
      nums: ['5.4', '5.04', '5.44', '5.404', '5.044'],
      dir: 'desc',
      prompt: 'Fill with zeros, then put them in order of size, starting with the **largest**.',
      promptFr: 'Complète avec des zéros, puis range-les dans l’ordre, en commençant par le **plus grand**.',
      explain: 'Filled: $5.400$, $5.040$, $5.440$, $5.404$, $5.044$. Largest first: $5.44$, $5.404$, $5.4$, $5.044$, $5.04$. The two with 0 tenths come last.',
      explainFr: 'Complétés : $5.400$, $5.040$, $5.440$, $5.404$, $5.044$. Du plus grand au plus petit : $5.44$, $5.404$, $5.4$, $5.044$, $5.04$. Les deux qui ont 0 dixième viennent en dernier.',
    },
  },

  // 11 ─ English check: the words that set the direction (SORT) ─────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Fastest Means Smallest',
    titleFr: 'Le plus rapide, c’est le plus petit',
    content: 'Some questions do not say "smallest" or "largest". They say **fastest**, **cheapest** or **heaviest** — and you have to work out which end to start from.\n\nA **fast** runner has a **small** time.',
    contentFr: 'Certaines questions ne disent pas « smallest » ou « largest ». Elles disent **fastest** (le plus rapide), **cheapest** (le moins cher) ou **heaviest** (le plus lourd) — et c’est à toi de trouver par quel bout commencer.\n\nUn coureur **rapide** a un temps **petit**.',
    activity: {
      id: 'act_words',
      type: 'sort',
      prompt: 'Does the list start with the smallest number, or the largest? Sort the six questions.',
      promptFr: 'La liste commence-t-elle par le plus petit nombre, ou par le plus grand ? Trie les six consignes.',
      bins: [
        { id: 'small', name: 'Start with the **smallest** number', nameFr: 'Commencer par le **plus petit** nombre' },
        { id: 'large', name: 'Start with the **largest** number', nameFr: 'Commencer par le **plus grand** nombre' },
      ],
      cards: [
        { id: 'w1', name: '"Start with the **fastest** time."', nameFr: '"Start with the **fastest** time."', bin: 'small' },
        { id: 'w2', name: '"Start with the **heaviest** bag."', nameFr: '"Start with the **heaviest** bag."', bin: 'large' },
        { id: 'w3', name: '"Start with the **cheapest** price."', nameFr: '"Start with the **cheapest** price."', bin: 'small' },
        { id: 'w4', name: '"Start with the **slowest** time."', nameFr: '"Start with the **slowest** time."', bin: 'large' },
        { id: 'w5', name: '"Start with the **lightest** parcel."', nameFr: '"Start with the **lightest** parcel."', bin: 'small' },
        { id: 'w6', name: '"Start with the **longest** jump."', nameFr: '"Start with the **longest** jump."', bin: 'large' },
      ],
      explain: '**Fastest**, **cheapest** and **lightest** start with the smallest number: a fast runner has a small time. **Slowest**, **heaviest** and **longest** start with the largest.',
      explainFr: '**Fastest** (le plus rapide), **cheapest** (le moins cher) et **lightest** (le plus léger) commencent par le plus petit nombre : un coureur rapide a un petit temps. **Slowest** (le plus lent), **heaviest** (le plus lourd) et **longest** (le plus long) commencent par le plus grand.',
    },
  },

  // 12 ─ The real 100 m final, Berlin 2009 (DECORDER, fastest + third) ──────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Timer',
    eyebrow: 'Berlin, 2009',
    eyebrowFr: 'Berlin, 2009',
    title: 'The 100 m Final',
    titleFr: 'La finale du 100 m',
    ratio: 45,
    image: img('berlin.jpg'),
    content: 'The world-record race. Their times, in seconds:\n\n**Thompson** 9.93, **Powell** 9.84, **Gay** 9.71, **Bolt** 9.58, **Patton** 10.34',
    contentFr: 'La course du record du monde. Leurs temps, en secondes :\n\n**Thompson** 9.93, **Powell** 9.84, **Gay** 9.71, **Bolt** 9.58, **Patton** 10.34',
    activity: {
      id: 'act_berlin',
      type: 'decorder',
      kind: 'order',
      nums: ['9.93', '9.84', '9.71', '9.58', '10.34'],
      labels: ['Thompson', 'Powell', 'Gay', 'Bolt', 'Patton'],
      unit: 's',
      word: 'fastest',
      position: 3,
      prompt: 'Put the times in order, starting with the **fastest**. Then: who came **third**?',
      promptFr: 'Range les temps en commençant par le plus **rapide** (fastest). Puis : qui est **troisième** (third) ?',
      explain: '**Fastest** means the **smallest** time: $9.58$, $9.71$, $9.84$, $9.93$, $10.34$. Bolt won in $9.58$ s — still the world record. Third: **Powell**. $10.34$ has the biggest whole-number part, so Patton was the slowest.',
      explainFr: 'Le plus **rapide**, c’est le temps le plus **petit** : $9.58$, $9.71$, $9.84$, $9.93$, $10.34$. Bolt a gagné en $9.58$ s — c’est toujours le record du monde. Troisième : **Powell**. $10.34$ a la plus grande partie entière, donc Patton a été le plus lent.',
    },
  },

  // 13 ─ Money: always 2 decimal places (CHECK 4) ───────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Coins',
    eyebrow: 'Money',
    eyebrowFr: 'L’argent',
    title: 'Prices Fill the Zeros for You',
    titleFr: 'Les prix complètent les zéros pour toi',
    content: 'Prices are written with **2 decimal places**: 3 dollars and 50 cents is $3.50$, never $3.5$.\n\nSo a shop has already filled the zeros, and prices line up at the point.',
    contentFr: 'Les prix s’écrivent avec **2 décimales** : 3 dollars et 50 cents, c’est $3.50$, jamais $3.5$.\n\nLe magasin a donc déjà complété les zéros, et les prix sont alignés sur le point.',
    check: {
      id: 'chk_money',
      q: 'A shop writes every price with 2 decimal places. How does it write a price of $6.5$ dollars?',
      qFr: 'Un magasin écrit chaque prix avec 2 décimales. Comment écrit-il un prix de $6.5$ dollars ?',
      options: [
        { val: 'A', text: '$6.05$', textFr: '$6.05$' },
        { val: 'B', text: '$65.0$', textFr: '$65.0$' },
        { val: 'C', text: '$6.50$', textFr: '$6.50$' },
        { val: 'D', text: '$6.500$', textFr: '$6.500$' },
      ],
      correct: 'C',
      expEn: '$6.50$ is $6.5$ filled with one zero, so it has 2 decimal places: 6 dollars and 50 cents. $6.05$ is 6 dollars and 5 cents — the zero is in the wrong place. $65.0$ is sixty-five dollars. $6.500$ is the same amount, but with 3 decimal places.',
      expFr: '$6.50$, c’est $6.5$ complété avec un zéro, donc il a 2 décimales : 6 dollars et 50 cents. $6.05$, c’est 6 dollars et 5 cents — le zéro est au mauvais endroit. $65.0$, c’est soixante-cinq dollars. $6.500$, c’est le même montant, mais avec 3 décimales.',
    },
  },

  // ── CHALLENGE ─────────────────────────────────────────────────────────────
  // 14 ─ Measures in two units (ORDER) ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Weight',
    eyebrow: 'Measures',
    eyebrowFr: 'Mesures',
    title: 'Same Unit First',
    titleFr: 'D’abord la même unité',
    ratio: 40,
    inlineSvg: DIAGRAMS.SAME_UNIT,
    content: 'You cannot compare $1.8$ kg with $1795$ g by looking at the numbers. Change them into the **same unit** first: $1$ kg $= 1000$ g.',
    contentFr: 'Tu ne peux pas comparer $1.8$ kg et $1795$ g en regardant seulement les nombres. Convertis-les d’abord dans la **même unité** : $1$ kg $= 1000$ g.',
    activity: {
      id: 'act_units',
      type: 'order',
      prompt: 'Put the four parcels in order, starting with the **lightest**. Change them all into grams first.',
      promptFr: 'Range les quatre colis dans l’ordre, du plus **léger** au plus lourd. Convertis-les d’abord tous en grammes.',
      steps: [
        { id: 'g960', name: '$960$ g', nameFr: '$960$ g' },
        { id: 'kg105', name: '$1.05$ kg', nameFr: '$1.05$ kg' },
        { id: 'g1100', name: '$1100$ g', nameFr: '$1100$ g' },
        { id: 'kg15', name: '$1.5$ kg', nameFr: '$1.5$ kg' },
      ],
      explain: 'In grams: $1.05$ kg $= 1050$ g and $1.5$ kg $= 1500$ g. Lightest first: $960$ g, $1050$ g, $1100$ g, $1500$ g. $1100$ has the most digits and $1.5$ looks small — the unit matters.',
      explainFr: 'En grammes : $1.05$ kg $= 1050$ g et $1.5$ kg $= 1500$ g. Du plus léger au plus lourd : $960$ g, $1050$ g, $1100$ g, $1500$ g. $1100$ a le plus de chiffres et $1.5$ a l’air petit — l’unité compte.',
    },
  },

  // 15 ─ Find the mistakes (SORT right / wrong) ─────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowFr: 'Trouve les erreurs',
    title: 'Mr Bowen’s Homework',
    titleFr: 'Les devoirs de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.HOMEWORK,
    content: 'Mr Bowen gave himself **6 out of 6**.\n\nSome lines are right. Some are not.',
    contentFr: 'M. Bowen s’est donné **6 sur 6**.\n\nCertaines lignes sont justes. D’autres, non.',
    activity: {
      id: 'act_homework',
      type: 'sort',
      prompt: 'Is each line right or wrong?',
      promptFr: 'Chaque ligne est-elle juste ou fausse ?',
      bins: [
        { id: 'right', name: '**Right**', nameFr: '**Juste**' },
        { id: 'wrong', name: '**Wrong**', nameFr: '**Faux**' },
      ],
      cards: [
        { id: 'h1', name: '**a** $5.08 < 5.1$', nameFr: '**a** $5.08 < 5.1$', bin: 'right' },
        { id: 'h2', name: '**b** $0.45 > 0.5$', nameFr: '**b** $0.45 > 0.5$', bin: 'wrong' },
        { id: 'h3', name: '**c** $7.80 = 7.8$', nameFr: '**c** $7.80 = 7.8$', bin: 'right' },
        { id: 'h4', name: '**d** $10.2 < 9.75$', nameFr: '**d** $10.2 < 9.75$', bin: 'wrong' },
        { id: 'h5', name: '**e** $2.5 > 2.45$', nameFr: '**e** $2.5 > 2.45$', bin: 'right' },
        { id: 'h6', name: '**f** $0.06 > 0.1$', nameFr: '**f** $0.06 > 0.1$', bin: 'wrong' },
      ],
      explain: '**a** right: $5.08 < 5.10$. **b** wrong: $0.45 < 0.50$ — he read $.45$ as forty-five. **c** right: a zero at the end changes nothing. **d** wrong: 10 is more than 9, so $10.2 > 9.75$. **e** right: $2.50 > 2.45$. **f** wrong: $0.06 < 0.10$ — longer is not bigger.',
      explainFr: '**a** juste : $5.08 < 5.10$. **b** faux : $0.45 < 0.50$ — il a lu $.45$ comme quarante-cinq. **c** juste : un zéro à la fin ne change rien. **d** faux : 10 est plus grand que 9, donc $10.2 > 9.75$. **e** juste : $2.50 > 2.45$. **f** faux : $0.06 < 0.10$ — plus long ne veut pas dire plus grand.',
    },
  },

  // 16 ─ A missing digit (DECORDER digit) ───────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Challenge',
    eyebrowFr: 'Défi',
    title: 'A Missing Digit',
    titleFr: 'Un chiffre manquant',
    content: 'A digit is missing from a number. Which digits keep the sign true?\n\nTry each digit in the box. The whole-number part first, then the tenths, then the hundredths.',
    contentFr: 'Il manque un chiffre dans un nombre. Quels chiffres gardent le signe vrai ?\n\nEssaie chaque chiffre dans la case. La partie entière d’abord, puis les dixièmes, puis les centièmes.',
    activity: {
      id: 'act_digit',
      type: 'decorder',
      kind: 'digit',
      a: '8.□4',
      sign: '>',
      b: '8.61',
      prompt: 'Which digits can go in the box? Tap every one that works.',
      promptFr: 'Quels chiffres peuvent aller dans la case ? Touche tous ceux qui marchent.',
      explain: 'The whole-number parts match, so the tenths decide. With 6 the tenths are equal, and $8.64 > 8.61$ because 4 hundredths beat 1. With 5 or less, the number is smaller. So the digit is 6, 7, 8 or 9.',
      explainFr: 'Les parties entières sont égales, donc les dixièmes décident. Avec 6, les dixièmes sont égaux, et $8.64 > 8.61$ car 4 centièmes l’emportent sur 1. Avec 5 ou moins, le nombre est plus petit. Le chiffre est donc 6, 7, 8 ou 9.',
    },
  },

  // 17 ─ Checklist + the exit question (CHECK 5) ────────────────────────────
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
      { text: 'Say $3.25$ in English: three point two five.', textFr: 'Dire $3.25$ en anglais : three point two five.' },
      { text: 'Compare the **whole-number parts** first.', textFr: 'Comparer d’abord les **parties entières**.' },
      { text: '**Fill with zeros**, then compare from the left.', textFr: '**Compléter avec des zéros**, puis comparer de gauche à droite.' },
      { text: 'Read **<** as is less than and **>** as is greater than.', textFr: 'Lire **<** « est inférieur à » et **>** « est supérieur à ».' },
      { text: 'Start where the question says: smallest, largest — or **fastest**.', textFr: 'Commencer là où la question le dit : le plus petit, le plus grand — ou le plus **rapide**.' },
      { text: 'Change measures into the **same unit** first.', textFr: 'Convertir les mesures dans la **même unité** d’abord.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: which list is in order of size, starting with the **smallest**?',
      qFr: 'Question de sortie : quelle liste est rangée du **plus petit** au plus grand ?',
      options: [
        { val: 'A', text: '$0.9,\\; 0.85,\\; 0.805,\\; 0.8$', textFr: '$0.9,\\; 0.85,\\; 0.805,\\; 0.8$' },
        { val: 'B', text: '$0.8,\\; 0.805,\\; 0.85,\\; 0.9$', textFr: '$0.8,\\; 0.805,\\; 0.85,\\; 0.9$' },
        { val: 'C', text: '$0.805,\\; 0.8,\\; 0.85,\\; 0.9$', textFr: '$0.805,\\; 0.8,\\; 0.85,\\; 0.9$' },
        { val: 'D', text: '$0.8,\\; 0.85,\\; 0.805,\\; 0.9$', textFr: '$0.8,\\; 0.85,\\; 0.805,\\; 0.9$' },
      ],
      correct: 'B',
      expEn: 'Fill with zeros: $0.800$, $0.805$, $0.850$, $0.900$. Smallest first is B. A is the right order the wrong way round. C puts $0.805$ before $0.8$, but $0.805 > 0.800$. D puts $0.85$ before $0.805$, but $0.850 > 0.805$.',
      expFr: 'Complète avec des zéros : $0.800$, $0.805$, $0.850$, $0.900$. Du plus petit au plus grand, c’est B. A est le bon ordre à l’envers. C met $0.805$ avant $0.8$, mais $0.805 > 0.800$. D met $0.85$ avant $0.805$, mais $0.850 > 0.805$.',
    },
  },
];
