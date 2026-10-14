// src/data/Y7_MATH/U01_2/notes.js
// 1.2 Multiplying & Dividing Integers — a self-study reduction of the classroom
// deck (C:\Users\bowen\lessons). 14 layout slides, 5 embedded checks.
//
// What changed from the classroom version (see docs/y7-math/ADAPTATION-PLAN.md §8):
//  · the terse slides gained a written teacher-voice sentence so the audio
//    narration has something to read — a solo student has no one talking over
//    the slide;
//  · four "on your whiteboard, before anyone says the answer" moments became
//    `check` questions (the pattern's next line, the four sign rules, product
//    vs sum, which number gets divided, brackets first);
//  · the team game and homework slides are cut; two word problems moved to the
//    workbook. The `check:` block is always the LAST key on a slide, because the
//    audio generator narrates everything before it and stops there.
import { DIAGRAMS } from './diagrams.js';
import { TranslateWidget } from './widgets.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero + starter: quietly reload last lesson's rule ───────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Equal',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 1 · 1.2',
    eyebrowVn: 'Chương 1 · 1.2',
    eyebrowFr: 'Unité 1 · 1.2',
    title: 'Multiplying & Dividing Integers',
    titleVn: 'Nhân và Chia Số nguyên',
    titleFr: 'Multiplier et diviser des nombres entiers',
    objective: 'Multiply and divide positive and negative integers, and know exactly when “two negatives make a positive” is true.',
    objectiveVn: 'Nhân và chia số nguyên dương và âm, và biết chính xác khi nào “hai số âm thành số dương” là đúng.',
    objectiveFr: 'Multiplie et divise des entiers positifs et négatifs, et sache exactement quand « deux négatifs donnent un positif » est vrai.',
  },

  // 2 ─ What multiplying by a negative means (repeated adding) ──────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    title: 'What Multiplying by a Negative Means',
    titleVn: 'Nhân với số âm nghĩa là gì',
    titleFr: 'Ce que veut dire multiplier par un négatif',
    ratio: 45,
    inlineSvg: DIAGRAMS.REPEATED_JUMPS,
    content:
      'Multiplying is just **repeated adding**. So $3 × -4$ means **negative four, three times over** — three jumps of four to the left along the number line.\n\n' +
      'Whenever you multiply a positive by a negative, you are adding a negative again and again, so the answer is always negative.',
    contentVn:
      'Nhân chính là **cộng lặp lại**. Vậy $3 × -4$ nghĩa là **âm bốn, lặp lại ba lần** — ba bước nhảy bốn đơn vị sang trái trên trục số.\n\n' +
      'Mỗi khi em nhân một số dương với một số âm, em đang cộng một số âm nhiều lần, nên đáp án luôn là số âm.',
    contentFr: 'Multiplier, c’est juste **additionner plusieurs fois**. Donc $3 × -4$ veut dire **moins quatre, trois fois de suite** — trois sauts de quatre vers la gauche sur la droite graduée.\n\nChaque fois que tu multiplies un positif par un négatif, tu ajoutes un négatif encore et encore, donc la réponse est toujours négative.',
    notes: [
      { tone: 'write', text: 'A **positive × a negative** is **negative**.', textVn: 'Một số **dương × một số âm** thì **âm**.', textFr: 'Un **positif × un négatif** donne un **négatif**.' },
    ],
    exampleLabel: 'Examples',
    exampleLabelVn: 'Ví dụ',
    exampleLabelFr: 'Exemples',
    example: '**1)** $5 × -2 = -10$\n\n**2)** $-6 × 3 = -18$',
    exampleVn: '**1)** $5 × -2 = -10$\n\n**2)** $-6 × 3 = -18$',
    exampleFr: '**1)** $5 × -2 = -10$\n\n**2)** $-6 × 3 = -18$',
  },

  // 3 ─ The hook (ask before you tell): keep the pattern going ──────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'Two minutes, pen and paper',
    eyebrowVn: 'Hai phút, giấy và bút',
    eyebrowFr: 'Deux minutes, papier et crayon',
    title: 'Keep the Pattern Going',
    titleVn: 'Hãy tiếp tục quy luật',
    titleFr: 'Continue la suite',
    inlineSvg: DIAGRAMS.PATTERN_LADDER,
    caption: 'You cannot do something **negative one times**, so we cannot draw this one. Look at what the answers are doing instead, and write down the **last two rows** before you go on.',
    captionVn: 'Em không thể làm một việc **âm một lần**, nên không thể vẽ trường hợp này. Hãy nhìn quy luật của các đáp án, và viết ra **hai dòng cuối** trước khi tiếp tục.',
    captionFr: 'On ne peut pas faire quelque chose **moins une fois**, donc on ne peut pas dessiner celui-ci. Regarde plutôt ce que font les réponses, et écris les **deux dernières lignes** avant de continuer.',
  },

  // 4 ─ Negative × negative, derived from the pattern (+ CHECK 1) ───────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ShieldCheck',
    eyebrow: 'The big rule of the lesson',
    eyebrowVn: 'Quy tắc lớn của bài học',
    eyebrowFr: 'La grande règle du cours',
    title: 'Negative Times Negative',
    titleVn: 'Âm nhân âm',
    titleFr: 'Négatif fois négatif',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.PATTERN_LADDER_SOLVED,
    content:
      'Every step down the ladder adds 4 to the answer. For the pattern to keep working, $-1 × -4$ has to be **positive 4**. Nothing else fits.\n\n' +
      'So the pattern proves it: a **negative times a negative is positive**. It is not a trick to memorise — it is the only way the numbers stay consistent.',
    contentVn:
      'Mỗi bước đi xuống trong bảng đều cộng thêm 4 vào đáp án. Để quy luật tiếp tục đúng, $-1 × -4$ bắt buộc phải là **dương 4**. Không còn khả năng nào khác.\n\n' +
      'Vậy quy luật đã chứng minh: một **số âm nhân một số âm thì dương**. Đây không phải mẹo để học thuộc — đó là cách duy nhất để các con số nhất quán.',
    contentFr: 'À chaque marche que l’on descend sur l’échelle, la réponse augmente de 4. Pour que la suite continue de marcher, $-1 × -4$ doit être **plus 4**. Rien d’autre ne convient.\n\nLa suite le prouve donc : un **négatif fois un négatif donne un positif**. Ce n’est pas une astuce à apprendre par cœur — c’est la seule façon pour que les nombres restent cohérents.',
    notes: [
      { tone: 'write', text: 'A **negative × a negative** is **positive**.', textVn: 'Một số **âm × một số âm** thì **dương**.', textFr: 'Un **négatif × un négatif** donne un **positif**.' },
    ],
    check: {
      id: 'c1',
      q: 'Keep the ladder going one more line. What is $-3 × -4$?',
      qVn: 'Tiếp tục bảng thêm một dòng nữa. $-3 × -4$ bằng bao nhiêu?',
      qFr: 'Continue l’échelle d’une ligne de plus. Combien fait $-3 × -4$ ?',
      options: [
        { val: 'A', text: '$12$', textVn: '$12$', textFr: '$12$' },
        { val: 'B', text: '$-12$', textVn: '$-12$', textFr: '$-12$' },
        { val: 'C', text: '$-7$', textVn: '$-7$', textFr: '$-7$' },
      ],
      correct: 'A',
      expEn: 'Two negatives multiplied give a positive, so $-3 × -4 = 12$. Answering $-12$ keeps the sign negative, which is exactly the mistake the pattern breaks.',
      expVn: 'Hai số âm nhân nhau cho kết quả dương, nên $-3 × -4 = 12$. Trả lời $-12$ là giữ dấu âm — đúng cái sai mà quy luật đã bác bỏ.',
      expFr: 'Deux négatifs multipliés donnent un positif, donc $-3 × -4 = 12$. Répondre $-12$, c’est garder le signe négatif — exactement l’erreur que la suite démonte.',
    },
  },

  // 5 ─ All four rules at once; division shares them (+ CHECK 2) ────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    title: 'All Four Rules at Once',
    titleVn: 'Cả bốn quy tắc cùng lúc',
    titleFr: 'Les quatre règles à la fois',
    ratio: 45,
    inlineSvg: DIAGRAMS.SIGN_GRID,
    drawThis: true,
    content:
      'Dividing **undoes** multiplying, so it obeys the **same rules**. Copy this table — it is the whole lesson in nine boxes.\n\n' +
      '**Same signs give a positive. Different signs give a negative.** That one sentence works for both $×$ and $÷$.',
    contentVn:
      'Phép chia **làm ngược lại** phép nhân, nên nó theo **đúng các quy tắc đó**. Hãy chép bảng này — cả bài học nằm trong chín ô.\n\n' +
      '**Hai dấu giống nhau cho số dương. Hai dấu khác nhau cho số âm.** Câu đó dùng được cho cả $×$ và $÷$.',
    contentFr: 'Diviser **défait** la multiplication, donc la division suit **les mêmes règles**. Recopie ce tableau — c’est toute la leçon en neuf cases.\n\n**Signes identiques : positif. Signes différents : négatif.** Cette seule phrase marche pour $×$ et pour $÷$.',
    notes: [
      {
        tone: 'write',
        text: '**Same signs → positive.**\n**Different signs → negative.**\nThe same four rules work for **×** and **÷**.',
        textVn: '**Hai dấu giống nhau → dương.**\n**Hai dấu khác nhau → âm.**\nBốn quy tắc này dùng cho cả **×** và **÷**.',
        textFr: '**Signes identiques → positif.**\n**Signes différents → négatif.**\nLes quatre mêmes règles marchent pour **×** et **÷**.',
      },
    ],
    exampleLabel: 'Examples',
    exampleLabelVn: 'Ví dụ',
    exampleLabelFr: 'Exemples',
    example: '$-6 × -7 = 42$   ·   $-6 × 7 = -42$\n\n$-42 ÷ -7 = 6$   ·   $-42 ÷ 7 = -6$',
    exampleVn: '$-6 × -7 = 42$   ·   $-6 × 7 = -42$\n\n$-42 ÷ -7 = 6$   ·   $-42 ÷ 7 = -6$',
    exampleFr: '$-6 × -7 = 42$   ·   $-6 × 7 = -42$\n\n$-42 ÷ -7 = 6$   ·   $-42 ÷ 7 = -6$',
    check: {
      id: 'c2',
      q: 'Using the same rules for division: what is $-40 ÷ -8$?',
      qVn: 'Dùng cùng các quy tắc cho phép chia: $-40 ÷ -8$ bằng bao nhiêu?',
      qFr: 'Avec les mêmes règles pour la division : combien fait $-40 ÷ -8$ ?',
      options: [
        { val: 'A', text: '$32$', textVn: '$32$', textFr: '$32$' },
        { val: 'B', text: '$-5$', textVn: '$-5$', textFr: '$-5$' },
        { val: 'C', text: '$5$', textVn: '$5$', textFr: '$5$' },
      ],
      correct: 'C',
      expEn: 'Both numbers are negative — same signs — so the answer is positive: $-40 ÷ -8 = 5$. Choosing $-5$ forgets that division follows the very same sign rules as multiplication.',
      expVn: 'Cả hai số đều âm — cùng dấu — nên đáp án là dương: $-40 ÷ -8 = 5$. Chọn $-5$ là quên rằng phép chia theo đúng các quy tắc dấu như phép nhân.',
      expFr: 'Les deux nombres sont négatifs — signes identiques — donc la réponse est positive : $-40 ÷ -8 = 5$. Choisir $-5$, c’est oublier que la division suit exactement les mêmes règles de signes que la multiplication.',
    },
  },

  // 6 ─ English class: is that sentence always true? ────────────────────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'MessageSquare',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'Is That Sentence Always True?',
    titleVn: 'Câu đó có luôn đúng không?',
    titleFr: 'Cette phrase est-elle toujours vraie ?',
    text: '“Two negatives make a positive.”',
    textVn: '“Two negatives make a positive.”',
    textFr: '« Two negatives make a positive. »',
    sub: 'Test it on $-3 × -4$, then test it on $-3 + -4$. Does it survive both?',
    subVn: 'Hãy thử với $-3 × -4$, rồi thử với $-3 + -4$. Nó có đúng cả hai lần không?',
    subFr: 'Teste-la sur $-3 × -4$, puis sur $-3 + -4$. Résiste-t-elle aux deux ?',
    check: {
      id: 'c6',
      q: '“Two negatives make a positive.” On which calculation is this sentence **false**?',
      qVn: '“Two negatives make a positive.” Câu này **sai** với phép tính nào?',
      qFr: '« Two negatives make a positive » (deux négatifs donnent un positif). Pour quel calcul cette phrase est-elle **fausse** ?',
      options: [
        { val: 'A', text: '$-3 × -4$', textVn: '$-3 × -4$', textFr: '$-3 × -4$' },
        { val: 'B', text: '$-3 + -4$', textVn: '$-3 + -4$', textFr: '$-3 + -4$' },
        { val: 'C', text: '$-12 ÷ -4$', textVn: '$-12 ÷ -4$', textFr: '$-12 ÷ -4$' },
      ],
      correct: 'B',
      expEn: 'The rule is for **× and ÷** only: $-3 × -4 = 12$ and $-12 ÷ -4 = 3$ are both positive. But $-3 + -4 = -7$ — adding a negative still sends you left, so the sentence is false for **+**.',
      expVn: 'Quy tắc chỉ đúng cho **× và ÷**: $-3 × -4 = 12$ và $-12 ÷ -4 = 3$ đều dương. Nhưng $-3 + -4 = -7$ — cộng số âm vẫn đưa sang trái, nên câu đó sai với phép **+**.',
      expFr: 'La règle ne vaut que pour **× et ÷** : $-3 × -4 = 12$ et $-12 ÷ -4 = 3$ sont tous les deux positifs. Mais $-3 + -4 = -7$ — ajouter un négatif t’envoie toujours à gauche, donc la phrase est fausse pour **+**.',
    },
  },

  // 7 ─ Key word: Product (+ CHECK 3) ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Product',
    titleVn: 'Product — Tích',
    titleFr: 'Product — Produit',
    content:
      'The book uses one new word in this section, and it is a word you already own in English — which is exactly what makes it easy to misread.\n\n' +
      'When a question says **“find the product”**, it is telling you to **multiply**. It never means adding, and in a shop a “product” is a thing you buy — a completely different job for the same word.',
    contentVn:
      'Sách dùng một từ mới trong phần này, và đó là từ em đã biết trong tiếng Anh — chính điều đó khiến nó dễ bị hiểu nhầm.\n\n' +
      'Khi câu hỏi nói **“find the product”**, nó bảo em **nhân**. Nó không bao giờ có nghĩa là cộng, và trong cửa hàng “product” là món hàng em mua — cùng một từ nhưng nhiệm vụ hoàn toàn khác.',
    contentFr: 'Le livre utilise un seul mot nouveau dans cette partie, et c’est un mot que tu connais déjà en anglais — c’est justement pour ça qu’on le lit facilement de travers.\n\nQuand une question dit **« find the product »**, elle te demande de **multiplier**. Ça ne veut jamais dire additionner — et dans un magasin, un « product » est un objet qu’on achète : un tout autre rôle pour le même mot.',
    notes: [
      {
        tone: 'write',
        text: '**Product:** the answer when you **multiply** two numbers. The product of 2 and -9 is -18.',
        textVn: '**Tích (product):** kết quả khi em **nhân** hai số. Tích của 2 và -9 là -18.',
        textFr: '**Produit (product) :** le résultat quand tu **multiplies** deux nombres. Le produit de 2 et -9 est -18.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Find the **product** of $-6$ and $4$.',
      qVn: 'Tìm **tích (product)** của $-6$ và $4$.',
      qFr: 'Trouve le **produit (product)** de $-6$ et $4$.',
      options: [
        { val: 'A', text: '$-2$', textVn: '$-2$', textFr: '$-2$' },
        { val: 'B', text: '$-24$', textVn: '$-24$', textFr: '$-24$' },
        { val: 'C', text: '$24$', textVn: '$24$', textFr: '$24$' },
      ],
      correct: 'B',
      expEn: '“Product” means multiply: $-6 × 4 = -24$ (different signs → negative). The answer $-2$ comes from adding, $-6 + 4$ — reading “product” as “sum”.',
      expVn: '“Product” nghĩa là nhân: $-6 × 4 = -24$ (khác dấu → âm). Đáp án $-2$ là do cộng, $-6 + 4$ — hiểu nhầm “product” thành “tổng”.',
      expFr: '« Product » veut dire multiplier : $-6 × 4 = -24$ (signes différents → négatif). La réponse $-2$ vient d’une addition, $-6 + 4$ — c’est lire « product » comme « sum » (somme).',
    },
  },

  // 8 ─ English class: which number gets cut up? (+ CHECK 4) ────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Scissors',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'Which Number Gets Cut Up?',
    titleVn: 'Số nào bị chia nhỏ?',
    titleFr: 'Quel nombre est découpé ?',
    text: 'Divide $-20$ by $4$.',
    textVn: 'Divide $-20$ by $4$.',
    textFr: 'Divide $-20$ by $4$.',
    sub: 'The number being **shared out** is written first here, but the English can hide it. Read carefully before you write the calculation.',
    subVn: 'Số bị **chia ra** được viết trước ở đây, nhưng tiếng Anh có thể giấu nó đi. Hãy đọc kỹ trước khi viết phép tính.',
    subFr: 'Le nombre qu’on **partage** est écrit en premier ici, mais l’anglais peut le cacher. Lis attentivement avant d’écrire le calcul.',
    check: {
      id: 'c4',
      q: 'In “divide $-20$ by $4$”, which number is being shared out (divided)?',
      qVn: 'Trong “divide $-20$ by $4$”, số nào đang bị chia ra?',
      qFr: 'Dans « divide $-20$ by $4$ », quel nombre est partagé (divisé) ?',
      options: [
        { val: 'A', text: '$-20$', textVn: '$-20$', textFr: '$-20$' },
        { val: 'B', text: '$4$', textVn: '$4$', textFr: '$4$' },
        { val: 'C', text: '$-5$', textVn: '$-5$', textFr: '$-5$' },
      ],
      correct: 'A',
      expEn: 'The $-20$ is shared out, so the calculation is $-20 ÷ 4$. The $4$ is how many parts; $-5$ is the answer, not the number being divided.',
      expVn: 'Số $-20$ bị chia ra, nên phép tính là $-20 ÷ 4$. Số $4$ là số phần; $-5$ là đáp án, không phải số bị chia.',
      expFr: 'C’est $-20$ qu’on partage, donc le calcul est $-20 ÷ 4$. Le $4$ est le nombre de parts ; $-5$ est la réponse, pas le nombre qu’on divise.',
    },
  },

  // 9 ─ Say it, then write it (TranslateWidget) ─────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Say It, Then Write It',
    titleVn: 'Đọc câu, rồi viết phép tính',
    titleFr: 'Dis-le, puis écris-le',
    ratio: 45,
    content:
      'The arithmetic is the easy part. The **English** is where the marks go — so we practise the translation, with this week’s words.\n\n' +
      'For every sentence: find the **signal words**, write the **calculation**, and only then the answer. Work through the tool at your own pace.',
    contentVn:
      'Phần tính toán là phần dễ. **Tiếng Anh** mới là chỗ mất điểm — nên ta luyện cách chuyển đổi, với các từ của tuần này.\n\n' +
      'Với mỗi câu: tìm **từ khoá**, viết **phép tính**, rồi mới đến đáp án. Hãy làm từng bước với công cụ theo nhịp của em.',
    contentFr: 'Le calcul, c’est la partie facile. C’est l’**anglais** qui fait perdre des points — alors on s’entraîne à traduire, avec les mots de la semaine.\n\nPour chaque phrase : trouve les **mots-signaux**, écris le **calcul**, et seulement ensuite la réponse. Avance dans l’outil à ton rythme.',
    widget: TranslateWidget,
  },

  // 10 ─ Order of operations: brackets first (+ CHECK 5) ────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Layers',
    title: 'Brackets First',
    titleVn: 'Làm trong ngoặc trước',
    titleFr: 'Les parenthèses d’abord',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.BRACKETS_FIRST,
    content:
      'When a calculation has brackets, work out **what is inside them** before you multiply or divide anything.\n\n' +
      'Watch the trap: inside the bracket here is an **addition**, so the shiny new “two negatives make a positive” rule does **not** apply. $-3 + -2 = -5$, not $5$.',
    contentVn:
      'Khi phép tính có dấu ngoặc, hãy tính **phần bên trong ngoặc** trước khi nhân hay chia bất cứ thứ gì.\n\n' +
      'Coi chừng cái bẫy: bên trong ngoặc ở đây là một phép **cộng**, nên quy tắc mới “hai số âm thành số dương” **không** áp dụng. $-3 + -2 = -5$, không phải $5$.',
    contentFr: 'Quand un calcul a des parenthèses, calcule **ce qu’il y a dedans** avant de multiplier ou de diviser quoi que ce soit.\n\nAttention au piège : dans la parenthèse ici, il y a une **addition**, donc la toute nouvelle règle « deux négatifs donnent un positif » ne s’applique **pas**. $-3 + -2 = -5$, et pas $5$.',
    notes: [
      {
        tone: 'write',
        text: '**Do the brackets first.** Work out what is inside, then multiply or divide.',
        textVn: '**Làm trong ngoặc trước.** Tính phần bên trong, rồi mới nhân hoặc chia.',
        textFr: '**Les parenthèses d’abord.** Calcule l’intérieur, puis multiplie ou divise.',
      },
      {
        tone: 'info',
        badge: 'Careful',
        badgeVn: 'Cẩn thận',
        badgeFr: 'Attention',
        icon: 'AlertTriangle',
        text: 'Inside that bracket is an **addition**, so $-3 + -2 = -5$. The new rule does not live in there.',
        textVn: 'Bên trong ngoặc là một phép **cộng**, nên $-3 + -2 = -5$. Quy tắc mới không áp dụng ở đó.',
        textFr: 'Dans cette parenthèse, il y a une **addition**, donc $-3 + -2 = -5$. La nouvelle règle n’a rien à faire là.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Work out $20 ÷ (-3 + -2)$.',
      qVn: 'Tính $20 ÷ (-3 + -2)$.',
      qFr: 'Calcule $20 ÷ (-3 + -2)$.',
      options: [
        { val: 'A', text: '$4$', textVn: '$4$', textFr: '$4$' },
        { val: 'B', text: '$-10$', textVn: '$-10$', textFr: '$-10$' },
        { val: 'C', text: '$-4$', textVn: '$-4$', textFr: '$-4$' },
      ],
      correct: 'C',
      expEn: 'Do the bracket first: it is an addition, so $-3 + -2 = -5$. Then $20 ÷ -5 = -4$. Getting $4$ means you wrongly made the bracket $+5$ — the trap the slide warns about.',
      expVn: 'Làm trong ngoặc trước: đó là phép cộng, nên $-3 + -2 = -5$. Rồi $20 ÷ -5 = -4$. Ra $4$ nghĩa là em đã sai khi cho ngoặc bằng $+5$ — đúng cái bẫy slide đã cảnh báo.',
      expFr: 'Fais d’abord la parenthèse : c’est une addition, donc $-3 + -2 = -5$. Ensuite $20 ÷ -5 = -4$. Trouver $4$ veut dire que tu as transformé la parenthèse en $+5$ par erreur — le piège dont la diapo te prévient.',
    },
  },

  // 11 ─ Application 1: the empty account ───────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    eyebrowFr: 'Problème 1',
    title: 'The Empty Account',
    titleVn: 'Tài khoản rỗng',
    titleFr: 'Le compte vide',
    ratio: 55,
    image: 'images/Y7_MATH/U01_2/coins.jpg',
    content:
      'Mr Bowen’s bank charges him **7 dollars every day** that his account is empty.\n\n' +
      'His account has been empty for **5 days**. What has that done to his balance?',
    contentVn:
      'Ngân hàng thu của thầy Bowen **7 đô mỗi ngày** mà tài khoản của thầy trống rỗng.\n\n' +
      'Tài khoản của thầy đã trống **5 ngày**. Điều đó ảnh hưởng thế nào đến số dư của thầy?',
    contentFr: 'La banque de M. Bowen lui fait payer **7 dollars chaque jour** où son compte est vide.\n\nSon compte est vide depuis **5 jours**. Qu’est-ce que cela a fait à son solde ?',
    check: {
      id: 'c7',
      q: 'Charged $7 a day for 5 days — what has happened to Mr Bowen’s balance?',
      qVn: 'Bị thu 7 đô mỗi ngày trong 5 ngày — số dư của thầy Bowen thay đổi thế nào?',
      qFr: '$7 prélevés chaque jour pendant 5 jours — qu’est-il arrivé au solde de M. Bowen ?',
      options: [
        { val: 'A', text: 'Down $35$ ($-35$)', textVn: 'Giảm $35$ ($-35$)', textFr: 'Baisse de $35$ ($-35$)' },
        { val: 'B', text: 'Up $35$ ($+35$)', textVn: 'Tăng $35$ ($+35$)', textFr: 'Hausse de $35$ ($+35$)' },
        { val: 'C', text: 'Down $12$ ($-12$)', textVn: 'Giảm $12$ ($-12$)', textFr: 'Baisse de $12$ ($-12$)' },
      ],
      correct: 'A',
      expEn: 'A charge is a negative: five lots of $-7$ is $5 × -7 = -35$, so the balance falls by 35. $+35$ drops the sign; $-12$ adds $5 + 7$ instead of multiplying.',
      expVn: 'Bị thu tiền là số âm: năm lần $-7$ là $5 × -7 = -35$, nên số dư giảm 35. $+35$ là bỏ dấu; $-12$ là cộng $5 + 7$ thay vì nhân.',
      expFr: 'Un prélèvement est un négatif : cinq fois $-7$, c’est $5 × -7 = -35$, donc le solde baisse de 35. $+35$ oublie le signe ; $-12$ additionne $5 + 7$ au lieu de multiplier.',
    },
  },

  // 12 ─ Application 2: the durian run (the deadpan closer problem) ──────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    eyebrowFr: 'Problème 2',
    title: 'The Durian Run',
    titleVn: 'Chuyến đi mua sầu riêng',
    titleFr: 'La course au durian',
    ratio: 55,
    side: 'left',
    image: 'images/Y7_MATH/U01_2/durian.jpg',
    content:
      'Mr Bowen decides to buy durian for the class. Each durian costs **90 000 dong**. There are **24 students**, and every student wants **3 durians**. He rides **14 km** to the market and spends **45 minutes** choosing.\n\n' +
      'Then he remembers that durian is **not allowed on the school bus**, so he buys **0 durians**. How much does Mr Bowen spend on durian?',
    contentVn:
      'Thầy Bowen quyết định mua sầu riêng cho cả lớp. Mỗi quả giá **90 000 đồng**. Lớp có **24 học sinh**, và mỗi bạn muốn **3 quả**. Thầy chạy xe **14 km** đến chợ và mất **45 phút** để chọn.\n\n' +
      'Rồi thầy nhớ ra rằng sầu riêng **không được mang lên xe buýt của trường**, nên thầy mua **0 quả**. Thầy Bowen đã tiêu bao nhiêu tiền cho sầu riêng?',
    contentFr: 'M. Bowen décide d’acheter du durian pour la classe. Chaque durian coûte **90 000 dong**. Il y a **24 élèves**, et chaque élève veut **3 durians**. Il fait **14 km** à moto jusqu’au marché et passe **45 minutes** à choisir.\n\nPuis il se souvient que le durian est **interdit dans le bus scolaire**, alors il achète **0 durian**. Combien M. Bowen dépense-t-il en durian ?',
    check: {
      id: 'c8',
      q: 'He buys **0 durians**. How much does Mr Bowen spend on durian?',
      qVn: 'Thầy mua **0 quả sầu riêng**. Thầy Bowen tiêu bao nhiêu tiền cho sầu riêng?',
      qFr: 'Il achète **0 durian**. Combien M. Bowen dépense-t-il en durian ?',
      options: [
        { val: 'A', text: '$6\\,480\\,000$ dong', textVn: '$6\\,480\\,000$ đồng', textFr: '$6\\,480\\,000$ dong' },
        { val: 'B', text: '$0$ dong', textVn: '$0$ đồng', textFr: '$0$ dong' },
        { val: 'C', text: '$90\\,000$ dong', textVn: '$90\\,000$ đồng', textFr: '$90\\,000$ dong' },
      ],
      correct: 'B',
      expEn: 'He buys 0 durians, and **anything times 0 is 0** — so the price, the class size and the distance are all noise. The big number $6\\,480\\,000$ is the trap for anyone who multiplied before reading to the end.',
      expVn: 'Thầy mua 0 quả, mà **bất cứ số nào nhân với 0 đều bằng 0** — nên giá, sĩ số và quãng đường đều là nhiễu. Số lớn $6\\,480\\,000$ là bẫy cho ai nhân trước khi đọc hết.',
      expFr: 'Il achète 0 durian, et **tout nombre fois 0 donne 0** — donc le prix, le nombre d’élèves et la distance ne servent à rien. Le grand nombre $6\\,480\\,000$ est le piège pour ceux qui ont multiplié avant de lire jusqu’au bout.',
    },
  },

  // 13 ─ Countable recap ────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Recap',
    eyebrowVn: 'Ôn lại',
    eyebrowFr: 'Récap',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    titleFr: 'Sais-tu faire les six ?',
    content: 'You’ve now got the **sign table** and **the key rules**. Tick each one you can do.',
    contentVn: 'Em đã có **bảng dấu** và **các quy tắc chính**. Hãy tự đánh dấu từng điều em làm được.',
    contentFr: 'Tu as maintenant le **tableau des signes** et **les règles clés**. Coche chaque point que tu sais faire.',
    items: [
      { text: 'Say what a **product** is.', textVn: 'Nói được **tích (product)** là gì.', textFr: 'Dire ce qu’est un **produit (product)**.' },
      { text: 'Explain why a **positive × a negative** is negative.', textVn: 'Giải thích vì sao **dương × âm** là số âm.', textFr: 'Expliquer pourquoi un **positif × un négatif** est négatif.' },
      { text: 'Explain why a **negative × a negative** is positive.', textVn: 'Giải thích vì sao **âm × âm** là số dương.', textFr: 'Expliquer pourquoi un **négatif × un négatif** est positif.' },
      { text: 'Use the **same four rules** for dividing.', textVn: 'Dùng **đúng bốn quy tắc đó** cho phép chia.', textFr: 'Utiliser les **quatre mêmes règles** pour diviser.' },
      { text: 'Say why “two negatives make a positive” is **not** true for adding.', textVn: 'Nói được vì sao “two negatives make a positive” **không** đúng với phép cộng.', textFr: 'Dire pourquoi « two negatives make a positive » n’est **pas** vrai pour l’addition.' },
      { text: 'Do the **brackets first**, then multiply or divide.', textVn: 'Làm **trong ngoặc trước**, rồi mới nhân hoặc chia.', textFr: 'Faire les **parenthèses d’abord**, puis multiplier ou diviser.' },
    ],
  },

  // 14 ─ Closer + exit question ─────────────────────────────────────────────
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
    subtitle: 'You can multiply and divide any two integers, and you know when “two negatives make a positive” is a lie. Exit question: what is $-6 × -5$, and which rule gives you the sign?',
    subtitleVn: 'Em đã có thể nhân và chia hai số nguyên bất kỳ, và biết khi nào câu “two negatives make a positive” là sai. Câu hỏi ra về: $-6 × -5$ bằng bao nhiêu, và quy tắc nào cho em biết dấu?',
    subtitleFr: 'Tu sais multiplier et diviser deux entiers quelconques, et tu sais quand « deux négatifs donnent un positif » est un mensonge. Question de sortie : combien fait $-6 × -5$, et quelle règle te donne le signe ?',
  },
];
