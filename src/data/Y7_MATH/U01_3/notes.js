// src/data/Y7_MATH/U01_3/notes.js
// 1.3 Lowest Common Multiples — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons). 13 layout slides, 5 embedded checks.
//
// Reduced from 18 classroom slides: the team/discussion beats become solo
// ("two minutes, pen and paper"), the Father-of-the-Bride YouTube clip is cut
// (kept the hot-dog problem), and two word problems (The Two Taps, The Two
// Alarms) drop into the workbook. The spine is ENGLISH: "common" means SHARED,
// not ordinary. The `check:` block is always the LAST key on a slide.
import { DIAGRAMS } from './diagrams.js';
import { LcmFinderWidget } from './widgets.jsx';

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
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 1 · 1.3',
    eyebrowVn: 'Chương 1 · 1.3',
    eyebrowFr: 'Unité 1 · 1.3',
    title: 'Lowest Common Multiples',
    titleVn: 'Bội số chung nhỏ nhất',
    titleFr: 'Plus petit commun multiple',
    objective: 'Find the lowest common multiple of two numbers, and use it to work out when repeating events line up again.',
    objectiveVn: 'Tìm bội số chung nhỏ nhất của hai số, và dùng nó để biết khi nào các sự việc lặp lại cùng xảy ra lần nữa.',
    objectiveFr: 'Trouve le plus petit commun multiple de deux nombres, et utilise-le pour savoir quand des événements qui se répètent coïncident de nouveau.',
  },

  // 2 ─ The hook: when do they meet again? ──────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Two minutes, pen and paper',
    eyebrowVn: 'Hai phút, giấy và bút',
    eyebrowFr: 'Deux minutes, papier et crayon',
    title: 'When Do They Meet Again?',
    titleVn: 'Khi nào chúng lại gặp nhau?',
    titleFr: 'Quand se retrouvent-ils ?',
    text: 'A red light flashes every 4 seconds. A blue light flashes every 6 seconds.',
    textVn: 'Một đèn đỏ nháy mỗi 4 giây. Một đèn xanh nháy mỗi 6 giây.',
    textFr: 'Un feu rouge clignote toutes les 4 secondes, un feu bleu toutes les 6 secondes.',
    sub: 'They have just flashed **at the same time**. After how many seconds will they **next** flash together? Write your best guess before you go on.',
    subVn: 'Chúng vừa nháy **cùng một lúc**. Sau bao nhiêu giây nữa chúng sẽ **lại** nháy cùng nhau? Hãy viết dự đoán trước khi tiếp tục.',
    subFr: 'Ils viennent de clignoter **en même temps**. Dans combien de secondes le feront-ils **à nouveau** ensemble ? Note ton estimation d’abord.',
  },

  // 3 ─ Key word: Multiple + CHECK 1 ────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Multiple',
    titleVn: 'Multiple — Bội số',
    titleFr: 'Multiple',
    ratio: 45,
    inlineSvg: DIAGRAMS.MULTIPLES_OF_4,
    content:
      'A **multiple** of 4 is what you get when you multiply 4 by 1, 2, 3, 4, … You just made two lists of multiples in the starter.\n\n' +
      '**Multiply** is the action you do; a **multiple** is the number you land on. Do not mix a multiple up with a **factor** (a number that divides in) — that is the next unit.',
    contentVn:
      'Một **bội số** của 4 là số em nhận được khi nhân 4 với 1, 2, 3, 4, … Em vừa lập hai danh sách bội số trong bài khởi động.\n\n' +
      '**Multiply (nhân)** là hành động em làm; một **multiple (bội số)** là số em nhận được. Đừng nhầm bội số với **factor (ước số)** — đó là bài học sau.',
    contentFr: 'Un **multiple** de 4, c’est ce que tu obtiens en multipliant 4 par 1, 2, 3, 4, … Tu viens de faire deux listes de multiples dans l’activité de départ.\n\n**Multiplier** est l’action que tu fais ; un **multiple** est le nombre où tu arrives. Ne confonds pas un multiple avec un **diviseur** (factor, un nombre qui divise) — c’est pour l’unité suivante.',
    notes: [
      {
        tone: 'write',
        text: '**Multiple:** the answer when you multiply a number by 1, 2, 3, 4, … The multiples of 4 are 4, 8, 12, 16, 20, …',
        textVn: '**Bội số (multiple):** kết quả khi em nhân một số với 1, 2, 3, 4, … Các bội số của 4 là 4, 8, 12, 16, 20, …',
        textFr: '**Multiple :** le résultat quand tu multiplies un nombre par 1, 2, 3, 4, … Les multiples de 4 sont 4, 8, 12, 16, 20, …',
      },
    ],
    check: {
      id: 'c1',
      q: 'Which of these is a **multiple** of 4?',
      qVn: 'Số nào dưới đây là **bội số** của 4?',
      qFr: 'Lequel de ces nombres est un **multiple** de 4 ?',
      options: [
        { val: 'A', text: '$20$', textVn: '$20$', textFr: '$20$' },
        { val: 'B', text: '$2$', textVn: '$2$', textFr: '$2$' },
        { val: 'C', text: '$14$', textVn: '$14$', textFr: '$14$' },
      ],
      correct: 'A',
      expEn: '$20 = 4 × 5$, so 20 is a multiple of 4. $2$ is a **factor** of 4 (it divides in), not a multiple — that is the mix-up to avoid. $14$ is not in the 4 times table.',
      expVn: '$20 = 4 × 5$, nên 20 là bội số của 4. $2$ là **ước số** của 4 (nó chia hết vào), không phải bội số — đó là chỗ dễ nhầm. $14$ không có trong bảng nhân 4.',
      expFr: '$20 = 4 × 5$, donc 20 est un multiple de 4. $2$ est un **diviseur** de 4 (il divise 4), pas un multiple — c’est la confusion à éviter. $14$ n’est pas dans la table de 4.',
    },
  },

  // 4 ─ English: what does "common" mean? + CHECK 2 ─────────────────────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'MessageSquare',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'What Does “Common” Mean?',
    titleVn: 'Từ “common” nghĩa là gì?',
    titleFr: 'Que veut dire « common » ?',
    text: '“a common bird … a common name”',
    textVn: '“a common bird … a common name”',
    textFr: '« a common bird … a common name »',
    sub: 'In everyday English, **common** means **ordinary** — something you see a lot. Does it mean the same thing in maths?',
    subVn: 'Trong tiếng Anh hằng ngày, **common** nghĩa là **bình thường** — thứ em thấy rất nhiều. Trong toán nó có nghĩa như vậy không?',
    subFr: 'En anglais courant, **common** veut dire **ordinaire** — quelque chose qu’on voit souvent. Est-ce que ça veut dire la même chose en maths ?',
    check: {
      id: 'c2',
      q: 'In maths, when a number is a **common** multiple of 4 and 6, that means it is:',
      qVn: 'Trong toán, khi một số là bội số **chung** của 4 và 6, điều đó nghĩa là nó:',
      qFr: 'En maths, quand un nombre est un multiple **commun** (common) de 4 et 6, cela veut dire que c’est :',
      options: [
        { val: 'A', text: 'an ordinary, everyday number', textVn: 'một số bình thường, hay gặp', textFr: 'un nombre ordinaire, de tous les jours' },
        { val: 'B', text: 'a multiple of **both** 4 and 6', textVn: 'là bội số của **cả** 4 và 6', textFr: 'un multiple **à la fois** de 4 et de 6' },
        { val: 'C', text: 'a number you see a lot', textVn: 'một số em thấy rất nhiều', textFr: 'un nombre qu’on voit souvent' },
      ],
      correct: 'B',
      expEn: 'In maths “common” means **shared** — a common multiple is in both lists at once. The everyday meaning “ordinary” is the trap this slide is built to break.',
      expVn: 'Trong toán “common” nghĩa là **chung** — bội số chung có trong cả hai danh sách. Nghĩa hằng ngày “bình thường” chính là cái bẫy slide này muốn phá.',
      expFr: 'En maths, « common » veut dire **partagé** — un multiple commun est dans les deux listes à la fois. Le sens courant « ordinaire » est justement le piège que cette diapo veut casser.',
    },
  },

  // 5 ─ Common & lowest common multiple + CHECK 3 ───────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Target',
    side: 'left',
    eyebrow: 'The big words of the lesson',
    eyebrowVn: 'Những từ quan trọng nhất của bài',
    eyebrowFr: 'Les grands mots du cours',
    title: 'Common & Lowest Common Multiple',
    titleVn: 'Bội số chung & BCNN',
    titleFr: 'Multiple commun et PPCM',
    ratio: 45,
    inlineSvg: DIAGRAMS.LCM_LISTS,
    content:
      'Write out the multiples of each number and look for the ones in **both** lists — those are the **common multiples**. For 4 and 6 they are 12, 24, 36, …\n\n' +
      '**Lowest** just means **smallest**. The **lowest common multiple (LCM)** is the smallest of them. This is the same idea as **BCNN** — today we learn the English words for it.',
    contentVn:
      'Viết ra bội số của mỗi số và tìm những số có trong **cả hai** danh sách — đó là **bội số chung**. Với 4 và 6 chúng là 12, 24, 36, …\n\n' +
      '**Lowest** chỉ có nghĩa là **nhỏ nhất**. **Bội số chung nhỏ nhất (BCNN)** là số nhỏ nhất trong đó. Đây chính là ý tưởng **BCNN** — hôm nay ta học các từ tiếng Anh cho nó.',
    contentFr: 'Écris les multiples de chaque nombre et garde ceux des **deux** listes : ce sont les **multiples communs** (common multiples). Pour 4 et 6 : 12, 24, 36, …\n\n**Lowest** veut dire **le plus petit**. Le plus petit d’entre eux est le **PPCM** (lowest common multiple, **LCM**). Aujourd’hui, on apprend les mots anglais.',
    notes: [
      {
        tone: 'write',
        text: '**Common multiple:** a multiple of **both** numbers (in both lists).\n**Lowest common multiple (LCM):** the smallest common multiple. The LCM of 4 and 6 is 12.',
        textVn: '**Bội số chung:** bội của **cả hai** số (có trong cả hai danh sách).\n**Bội số chung nhỏ nhất (BCNN):** bội số chung nhỏ nhất. BCNN của 4 và 6 là 12.',
        textFr: '**Multiple commun (common multiple) :** un multiple des **deux** nombres.\n**PPCM (LCM) :** le plus petit multiple commun. Le PPCM de 4 et 6 est 12.',
      },
    ],
    check: {
      id: 'c3',
      q: 'What is the **lowest common multiple** of 4 and 6?',
      qVn: '**Bội số chung nhỏ nhất** của 4 và 6 là bao nhiêu?',
      qFr: 'Quel est le **plus petit commun multiple** de 4 et 6 ?',
      options: [
        { val: 'A', text: '$24$', textVn: '$24$', textFr: '$24$' },
        { val: 'B', text: '$12$', textVn: '$12$', textFr: '$12$' },
        { val: 'C', text: '$2$', textVn: '$2$', textFr: '$2$' },
      ],
      correct: 'B',
      expEn: '12 and 24 are both common multiples of 4 and 6, but 12 is the **lowest**, so the LCM is 12. Answering 24 is $4 × 6$ — multiplying the two numbers, which usually overshoots.',
      expVn: '12 và 24 đều là bội số chung của 4 và 6, nhưng 12 là **nhỏ nhất**, nên BCNN là 12. Trả lời 24 là $4 × 6$ — nhân hai số, thường vượt quá.',
      expFr: '12 et 24 sont tous les deux des multiples communs de 4 et 6, mais 12 est le **plus petit**, donc le PPCM est 12. Répondre 24, c’est $4 × 6$ — multiplier les deux nombres, ce qui donne souvent trop.',
    },
  },

  // 6 ─ The hook paid off: they meet at 12 + CHECK 4 ────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Zap',
    eyebrow: 'Back to the two lights',
    eyebrowVn: 'Quay lại hai chiếc đèn',
    eyebrowFr: 'Retour aux deux lumières',
    title: 'That Is Why They Meet at 12',
    titleVn: 'Đó là lý do chúng gặp nhau ở giây 12',
    titleFr: 'Voilà pourquoi elles se retrouvent à 12',
    inlineSvg: DIAGRAMS.LIGHTS_ALIGN,
    caption: 'The red light (every 4 s) and the blue light (every 6 s) only line up where their counts match — at 12 and 24 seconds. The first time is **12 seconds**, the **LCM of 4 and 6**. How close was your guess?',
    captionVn: 'Đèn đỏ (mỗi 4 giây) và đèn xanh (mỗi 6 giây) chỉ trùng nhau ở nơi số đếm khớp — tại giây 12 và 24. Lần đầu là **12 giây**, chính là **BCNN của 4 và 6**. Dự đoán của em gần đến đâu?',
    captionFr: 'La lumière rouge (toutes les 4 s) et la lumière bleue (toutes les 6 s) ne coïncident que là où leurs comptes se rejoignent — à 12 et à 24 secondes. La première fois, c’est à **12 secondes**, le **PPCM de 4 et 6**. Ton estimation était-elle proche ?',
    check: {
      id: 'c4',
      q: 'In the first 30 seconds, at which times do **both** lights flash together?',
      qVn: 'Trong 30 giây đầu, vào những giây nào **cả hai** đèn cùng nháy?',
      qFr: 'Pendant les 30 premières secondes, à quels moments les **deux** lumières clignotent-elles ensemble ?',
      options: [
        { val: 'A', text: '10 and 20 seconds', textVn: '10 và 20 giây', textFr: '10 et 20 secondes' },
        { val: 'B', text: '4 and 6 seconds', textVn: '4 và 6 giây', textFr: '4 et 6 secondes' },
        { val: 'C', text: '12 and 24 seconds', textVn: '12 và 24 giây', textFr: '12 et 24 secondes' },
      ],
      correct: 'C',
      expEn: 'They meet at the **common multiples** of 4 and 6: 12 and 24. Answering 10 and 20 adds the two numbers ($4 + 6$); 4 and 6 are just when each flashes on its own.',
      expVn: 'Chúng gặp nhau tại các **bội số chung** của 4 và 6: 12 và 24. Trả lời 10 và 20 là cộng hai số ($4 + 6$); còn 4 và 6 chỉ là lúc mỗi đèn tự nháy.',
      expFr: 'Elles se retrouvent aux **multiples communs** de 4 et 6 : 12 et 24. Répondre 10 et 20, c’est additionner les deux nombres ($4 + 6$) ; 4 et 6, ce sont juste les moments où chacune clignote seule.',
    },
  },

  // 7 ─ Mr Bowen's method ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Copy the method',
    eyebrowVn: 'Chép lại cách làm',
    eyebrowFr: 'À recopier',
    title: 'Mr Bowen’s Method',
    titleVn: 'Cách làm của thầy Bowen',
    titleFr: 'La méthode de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.METHOD_69,
    drawThis: true,
    content: 'To find the LCM of 6 and 9, Mr Bowen lists the multiples of each, then rings the **first** number that is in both.',
    contentVn: 'Để tìm BCNN của 6 và 9, thầy Bowen liệt kê bội số của mỗi số, rồi khoanh **số đầu tiên** có trong cả hai.',
    contentFr: 'Pour trouver le PPCM de 6 et 9, M. Bowen fait la liste des multiples de chacun, puis entoure le **premier** nombre qui est dans les deux listes.',
    notes: [
      {
        tone: 'write',
        text:
          '**To find the LCM of two numbers:**\n' +
          '**1.** List the multiples of each number.\n' +
          '**2.** Find the numbers in both lists.\n' +
          '**3.** The LCM is the lowest of them.',
        textVn:
          '**Để tìm BCNN của hai số:**\n' +
          '**1.** Liệt kê bội số của mỗi số.\n' +
          '**2.** Tìm những số có trong cả hai danh sách.\n' +
          '**3.** BCNN là số nhỏ nhất trong đó.',
        textFr: '**Pour trouver le PPCM de deux nombres :**\n**1.** Fais la liste des multiples de chaque nombre.\n**2.** Trouve les nombres qui sont dans les deux listes.\n**3.** Le PPCM est le plus petit d’entre eux.',
      },
    ],
    exampleLabel: 'The answer',
    exampleLabelVn: 'Đáp án',
    exampleLabelFr: 'La réponse',
    example: 'The LCM of 6 and 9 is $18$.',
    exampleVn: 'BCNN của 6 và 9 là $18$.',
    exampleFr: 'Le PPCM de 6 et 9 est $18$.',
  },

  // 8 ─ Find the LCM (LcmFinderWidget) ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Find the LCM',
    titleVn: 'Tìm BCNN',
    titleFr: 'Trouve le PPCM',
    ratio: 45,
    content:
      'Run the method on more pairs. For each one, **work out the LCM yourself before you reveal it** — list the multiples if you need to.\n\n' +
      'Watch what happens with 4 and 8, and with 3 and 5: the LCM is not always found the same way.',
    contentVn:
      'Áp dụng cách làm cho nhiều cặp số hơn. Với mỗi cặp, **tự tìm BCNN trước khi hiện đáp án** — cứ liệt kê bội số nếu cần.\n\n' +
      'Hãy xem điều gì xảy ra với 4 và 8, và với 3 và 5: BCNN không phải lúc nào cũng tìm theo cùng một cách.',
    contentFr: 'Applique la méthode à d’autres paires. Pour chacune, **trouve le PPCM toi-même avant de l’afficher** — fais la liste des multiples si tu en as besoin.\n\nRegarde ce qui se passe avec 4 et 8, et avec 3 et 5 : on ne trouve pas toujours le PPCM de la même façon.',
    widget: LcmFinderWidget,
  },

  // 9 ─ Watch out: do not just multiply them ────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'AlertTriangle',
    eyebrow: 'Watch out',
    eyebrowVn: 'Cẩn thận',
    eyebrowFr: 'Attention',
    title: 'Do Not Just Multiply Them',
    titleVn: 'Đừng vội nhân hai số với nhau',
    titleFr: 'Ne les multiplie pas simplement',
    ratio: 55,
    content:
      'The LCM is usually **smaller** than the two numbers multiplied together. Multiplying is a lucky shortcut that only works when the numbers share no factor — it is **not** the rule.\n\n' +
      'The LCM of 4 and 8 is **8**, not 32, because 4 divides into 8. When in doubt, **list them**.',
    contentVn:
      'BCNN thường **nhỏ hơn** tích của hai số. Nhân chỉ là mẹo may mắn, chỉ đúng khi hai số không có thừa số chung — nó **không** phải quy tắc.\n\n' +
      'BCNN của 4 và 8 là **8**, không phải 32, vì 4 chia hết 8. Khi phân vân, hãy **liệt kê ra**.',
    contentFr: 'Le PPCM est en général **plus petit** que le produit des deux nombres. Multiplier est un raccourci chanceux qui ne marche que quand les nombres n’ont aucun diviseur commun — ce n’est **pas** la règle.\n\nLe PPCM de 4 et 8 est **8**, et pas 32, parce que 4 divise 8. Dans le doute, **fais les listes**.',
    notes: [
      {
        tone: 'write',
        text: '**Careful:** if one number divides into the other, the LCM is just the **bigger** number.',
        textVn: '**Cẩn thận:** nếu một số chia hết số kia, thì BCNN chính là **số lớn hơn**.',
        textFr: '**Attention :** si un nombre divise l’autre, le PPCM est simplement le **plus grand** des deux.',
      },
    ],
  },

  // 10 ─ Application 1: the two buses + CHECK 5 ──────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    eyebrowFr: 'Problème 1',
    title: 'The Two Buses',
    titleVn: 'Hai chuyến xe buýt',
    titleFr: 'Les deux bus',
    ratio: 55,
    image: 'images/Y7_MATH/U01_3/bus.jpg',
    content:
      'Two buses leave Mr Bowen’s stop at exactly **7:00**. Bus A leaves every **10 minutes**, Bus B every **15 minutes**.\n\n' +
      'At what time do they next leave **together**?',
    contentVn:
      'Hai chuyến xe buýt rời trạm của thầy Bowen đúng lúc **7:00**. Xe A chạy mỗi **10 phút**, xe B mỗi **15 phút**.\n\n' +
      'Lúc mấy giờ chúng lại cùng rời trạm **một lúc**?',
    contentFr: 'Deux bus partent de l’arrêt de M. Bowen à **7:00** pile. Le bus A part toutes les **10 minutes**, le bus B toutes les **15 minutes**.\n\nÀ quelle heure repartent-ils **ensemble** ?',
    check: {
      id: 'c5',
      q: 'Bus A leaves every 10 minutes and Bus B every 15 minutes. How many minutes until they next leave together?',
      qVn: 'Xe A chạy mỗi 10 phút, xe B mỗi 15 phút. Bao nhiêu phút nữa chúng lại cùng rời trạm?',
      qFr: 'Le bus A part toutes les 10 minutes et le bus B toutes les 15 minutes. Dans combien de minutes repartent-ils ensemble ?',
      options: [
        { val: 'A', text: '$30$', textVn: '$30$', textFr: '$30$' },
        { val: 'B', text: '$150$', textVn: '$150$', textFr: '$150$' },
        { val: 'C', text: '$25$', textVn: '$25$', textFr: '$25$' },
      ],
      correct: 'A',
      expEn: 'You need the LCM of 10 and 15, which is 30. Answering 150 multiplies them ($10 × 15$); 25 adds them. List the multiples: 10, 20, **30** … and 15, **30** …',
      expVn: 'Em cần BCNN của 10 và 15, bằng 30. Trả lời 150 là nhân ($10 × 15$); 25 là cộng. Hãy liệt kê: 10, 20, **30** … và 15, **30** …',
      expFr: 'Il te faut le PPCM de 10 et 15, qui est 30. Répondre 150, c’est les multiplier ($10 × 15$) ; 25, c’est les additionner. Fais les listes : 10, 20, **30** … et 15, **30** …',
    },
  },

  // 11 ─ Application 2: George's hot dog problem ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    eyebrowFr: 'Problème 2',
    title: 'George’s Hot Dog Problem',
    titleVn: 'Bài toán xúc xích của ông George',
    titleFr: 'Les hot-dogs de George',
    ratio: 55,
    side: 'left',
    image: 'images/Y7_MATH/U01_3/hotdog.jpg',
    content:
      'In an old film, George wants hot dogs and buns in **equal numbers, with none left over**. Hot dogs come in packs of **8**, buns in packs of **12**.\n\n' +
      'What is the **smallest** number of each he can buy — and how many packs is that?',
    contentVn:
      'Trong một bộ phim cũ, ông George muốn xúc xích và bánh mì **số lượng bằng nhau, không thừa cái nào**. Xúc xích bán gói **8 cái**, bánh mì gói **12 cái**.\n\n' +
      'Số **nhỏ nhất** mỗi loại ông có thể mua là bao nhiêu — và bằng mấy gói?',
    contentFr: 'Dans un vieux film, George veut des saucisses et des pains à hot-dog **en nombres égaux, sans qu’il en reste**. Les saucisses sont vendues par paquets de **8**, les pains par paquets de **12**.\n\nQuel est le **plus petit** nombre de chaque qu’il peut acheter — et combien de paquets cela fait-il ?',
    check: {
      id: 'c6',
      q: 'Hot dogs come in 8s, buns in 12s. What is the **smallest** number of each George can buy with none left over?',
      qVn: 'Xúc xích bán gói 8, bánh mì gói 12. Số **nhỏ nhất** mỗi loại George mua được mà không thừa là bao nhiêu?',
      qFr: 'Les saucisses sont vendues par 8, les pains par 12. Quel est le **plus petit** nombre de chaque que George peut acheter sans qu’il en reste ?',
      options: [
        { val: 'A', text: '$96$ of each', textVn: '$96$ cái mỗi loại', textFr: '$96$ de chaque' },
        { val: 'B', text: '$24$ of each', textVn: '$24$ cái mỗi loại', textFr: '$24$ de chaque' },
        { val: 'C', text: '$20$ of each', textVn: '$20$ cái mỗi loại', textFr: '$20$ de chaque' },
      ],
      correct: 'B',
      expEn: 'Equal numbers with none left over means a common multiple of 8 and 12, and the smallest is the LCM: $24$. $96 = 8 × 12$ works but is not the smallest; $20$ is a multiple of neither.',
      expVn: 'Số bằng nhau mà không thừa nghĩa là bội chung của 8 và 12, và nhỏ nhất là BCNN: $24$. $96 = 8 × 12$ cũng chia hết nhưng không nhỏ nhất; $20$ không phải bội của số nào.',
      expFr: 'Des nombres égaux sans reste, c’est un multiple commun de 8 et 12, et le plus petit est le PPCM : $24$. $96 = 8 × 12$ marche mais n’est pas le plus petit ; $20$ n’est un multiple ni de l’un ni de l’autre.',
    },
  },

  // 12 ─ Countable recap ────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Recap',
    eyebrowVn: 'Ôn lại',
    eyebrowFr: 'Récap',
    title: 'Can You Do All Five?',
    titleVn: 'Em làm được cả năm điều này chứ?',
    titleFr: 'Sais-tu faire les cinq ?',
    content: 'You’ve now met **3 definitions** (multiple, common multiple, lowest common multiple) and **the LCM method**. Tick each one you can do.',
    contentVn: 'Em đã học **3 định nghĩa** (bội số, bội số chung, bội số chung nhỏ nhất) và **cách tìm BCNN**. Hãy tự đánh dấu từng điều em làm được.',
    contentFr: 'Tu connais maintenant **3 définitions** (multiple, multiple commun, plus petit commun multiple) et **la méthode du PPCM**. Coche chaque point que tu sais faire.',
    items: [
      { text: 'Say what a **multiple** is.', textVn: 'Nói được **bội số (multiple)** là gì.', textFr: 'Dire ce qu’est un **multiple**.' },
      { text: 'Say what **common** means in maths — **shared**, not ordinary.', textVn: 'Nói được **common** trong toán nghĩa là **chung**, không phải bình thường.', textFr: 'Dire ce que **common** veut dire en maths — **partagé**, pas ordinaire.' },
      { text: 'Find the **common multiples** of two numbers.', textVn: 'Tìm được **bội số chung** của hai số.', textFr: 'Trouver les **multiples communs** de deux nombres.' },
      { text: 'Find the **lowest common multiple (LCM)**.', textVn: 'Tìm được **bội số chung nhỏ nhất (BCNN)**.', textFr: 'Trouver le **plus petit commun multiple (PPCM)**.' },
      { text: 'Know **not to just multiply** the two numbers together.', textVn: 'Biết **không vội nhân** hai số với nhau.', textFr: 'Savoir qu’il ne faut **pas juste multiplier** les deux nombres.' },
    ],
  },

  // 13 ─ Closer + exit question ─────────────────────────────────────────────
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
    subtitle: 'You can find the lowest common multiple of two numbers, and you know that “common” means shared. Exit question: what is the **LCM of 5 and 10** — and why is it not 50?',
    subtitleVn: 'Em đã có thể tìm bội số chung nhỏ nhất của hai số, và biết rằng “common” nghĩa là chung. Câu hỏi ra về: **BCNN của 5 và 10** là bao nhiêu — và vì sao không phải 50?',
    subtitleFr: 'Tu sais trouver le plus petit commun multiple de deux nombres, et tu sais que « common » veut dire partagé. Question de sortie : quel est le **PPCM de 5 et 10** — et pourquoi ce n’est pas 50 ?',
  },
];
