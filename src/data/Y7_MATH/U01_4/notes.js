// src/data/Y7_MATH/U01_4/notes.js
// 1.4 Highest Common Factors — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons). 15 layout slides, 5 embedded checks.
//
// Reduced from 20 classroom slides: the homework slide and one word problem (the
// fruit baskets) are cut/demoted, the discussion beats become solo. Kept and
// protected: the FACTOR-vs-MULTIPLE compare, and the two-slide "Numbers Next
// Door → All Three Are 1" investigation (the class makes a conjecture, then
// meets the word). The `check:` block is always the LAST key on a slide.
import { DIAGRAMS } from './diagrams.js';
import { HcfFinderWidget } from './widgets.jsx';

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
    eyebrow: 'Unit 1 · 1.4',
    eyebrowVn: 'Chương 1 · 1.4',
    eyebrowFr: 'Unité 1 · 1.4',
    title: 'Highest Common Factors',
    titleVn: 'Ước số chung lớn nhất',
    titleFr: 'Plus grand commun diviseur',
    objective: 'Find the highest common factor of two numbers, and use it to make equal groups and simplify fractions.',
    objectiveVn: 'Tìm ước số chung lớn nhất của hai số, và dùng nó để chia thành các nhóm bằng nhau và rút gọn phân số.',
    objectiveFr: 'Trouve le plus grand commun diviseur de deux nombres, et utilise-le pour faire des groupes égaux et simplifier des fractions.',
  },

  // 2 ─ The packing hook ────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Two minutes, pen and paper',
    eyebrowVn: 'Hai phút, giấy và bút',
    eyebrowFr: 'Deux minutes, papier et crayon',
    title: 'How Many Packs Can He Make?',
    titleVn: 'Thầy có thể chia được bao nhiêu gói?',
    titleFr: 'Combien de paquets peut-il faire ?',
    text: 'Mr Bowen has **24 pencils** and **40 stickers**.',
    textVn: 'Thầy Bowen có **24 cây bút chì** và **40 cái sticker**.',
    textFr: 'M. Bowen a **24 crayons** et **40 autocollants**.',
    sub: 'He makes **identical packs** — every pack the same, and **nothing left over**. What is the **greatest number of packs** he can make? Write your best guess before you go on.',
    subVn: 'Thầy chia thành các **gói giống hệt nhau** — mỗi gói y như nhau, và **không thừa thứ gì**. **Số gói nhiều nhất** thầy có thể chia là bao nhiêu? Viết dự đoán trước khi tiếp tục.',
    subFr: 'Il fait des **paquets identiques** — tous les paquets pareils, et **rien qui reste**. Quel est le **plus grand nombre de paquets** qu’il peut faire ? Écris ta meilleure idée avant de continuer.',
  },

  // 3 ─ Key word: Factor ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Factor',
    titleVn: 'Factor — Ước số',
    titleFr: 'Factor — Diviseur',
    ratio: 45,
    inlineSvg: DIAGRAMS.FACTOR_PAIRS_12,
    content:
      'A **factor** of 12 is a number that divides into 12 **exactly**, with nothing left over. You just found them in the starter by hunting for pairs.\n\n' +
      '**1 and the number itself are always factors.** And 5 is not a factor of 12: $12 ÷ 5 = 2$ remainder 2 — something is left over.',
    contentVn:
      'Một **ước số** của 12 là số chia hết cho 12 một cách **chính xác**, không dư gì. Em vừa tìm ra chúng trong bài khởi động.\n\n' +
      '**1 và chính số đó luôn là ước số.** Còn 5 không phải ước số của 12: $12 ÷ 5 = 2$ dư 2 — vẫn còn thừa.',
    contentFr: 'Un **diviseur** (factor) de 12 est un nombre qui divise 12 **exactement**, sans reste. Tu viens de les trouver dans l’activité de départ en cherchant des paires.\n\n**1 et le nombre lui-même sont toujours des diviseurs.** Et 5 n’est pas un diviseur de 12 : $12 ÷ 5 = 2$ reste 2 — il reste quelque chose.',
    notes: [
      {
        tone: 'write',
        text: '**Factor:** a number that divides into another number exactly, with nothing left over. The factors of 12 are 1, 2, 3, 4, 6 and 12.',
        textVn: '**Ước số (factor):** số chia hết một số khác, không để lại số dư. Các ước số của 12 là 1, 2, 3, 4, 6 và 12.',
        textFr: '**Diviseur (factor) :** un nombre qui divise un autre nombre exactement, sans reste. Les diviseurs de 12 sont 1, 2, 3, 4, 6 et 12.',
      },
    ],
  },

  // 4 ─ Factor or Multiple? (compare, protected) + CHECK 1 ──────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'MessageSquare',
    eyebrow: 'The most confused pair of words',
    eyebrowVn: 'Cặp từ dễ nhầm nhất',
    eyebrowFr: 'Les deux mots qu’on confond le plus',
    title: 'Factor or Multiple?',
    titleVn: 'Ước số hay bội số?',
    titleFr: 'Diviseur ou multiple ?',
    columns: [
      {
        heading: 'FACTOR — it divides IN',
        headingVn: 'ƯỚC SỐ — nó chia VÀO',
        headingFr: 'DIVISEUR — il entre DEDANS',
        accent: TEAL,
        icon: 'Target',
        inlineSvg: DIAGRAMS.DIVIDES_IN,
        content: 'A factor **goes into** the number. Factors are **smaller** than the number, or equal. The list **stops**.',
        contentVn: 'Ước số **chia vào** số đó. Ước số **nhỏ hơn** số đó, hoặc bằng. Danh sách **có điểm dừng**.',
        contentFr: 'Un diviseur **entre dans** le nombre. Les diviseurs sont **plus petits** que le nombre, ou égaux. La liste **s’arrête**.',
        notes: [
          { tone: 'write', text: '**Factors of 12:** 1, 2, 3, 4, 6, 12 — they divide in.', textVn: '**Ước số của 12:** 1, 2, 3, 4, 6, 12 — chúng chia vào 12.', textFr: '**Diviseurs de 12 :** 1, 2, 3, 4, 6, 12 — ils entrent dedans.' },
        ],
      },
      {
        heading: 'MULTIPLE — you land ON it',
        headingVn: 'BỘI SỐ — em đáp XUỐNG nó',
        headingFr: 'MULTIPLE — on tombe DESSUS',
        accent: PURPLE,
        icon: 'Repeat',
        inlineSvg: DIAGRAMS.LANDS_ON,
        content: 'A multiple is what you **get to** when you count up in that number. Multiples are **bigger**, or equal. The list **never stops**.',
        contentVn: 'Bội số là số em **đi tới** khi đếm lên theo số đó. Bội số **lớn hơn**, hoặc bằng. Danh sách **không bao giờ dừng**.',
        contentFr: 'Un multiple, c’est le nombre où tu **arrives** quand tu comptes de ce nombre en ce nombre. Les multiples sont **plus grands**, ou égaux. La liste **ne s’arrête jamais**.',
        notes: [
          { tone: 'write', text: '**Multiples of 12:** 12, 24, 36, 48, … — you land on them.', textVn: '**Bội số của 12:** 12, 24, 36, 48, … — em đáp xuống chúng.', textFr: '**Multiples de 12 :** 12, 24, 36, 48, … — on tombe dessus.' },
        ],
      },
    ],
    check: {
      id: 'c1',
      q: 'Which of these is a **factor** of 12?',
      qVn: 'Số nào dưới đây là **ước số** của 12?',
      qFr: 'Lequel de ces nombres est un **diviseur** de 12 ?',
      options: [
        { val: 'A', text: '$24$', textVn: '$24$', textFr: '$24$' },
        { val: 'B', text: '$3$', textVn: '$3$', textFr: '$3$' },
        { val: 'C', text: '$36$', textVn: '$36$', textFr: '$36$' },
      ],
      correct: 'B',
      expEn: '$3$ divides into 12 exactly ($12 ÷ 3 = 4$), so it is a factor. $24$ and $36$ are **multiples** of 12 — numbers you land on by counting up — not factors.',
      expVn: '$3$ chia hết 12 ($12 ÷ 3 = 4$), nên nó là ước số. $24$ và $36$ là **bội số** của 12 — những số em đáp xuống khi đếm lên — không phải ước số.',
      expFr: '$3$ divise 12 exactement ($12 ÷ 3 = 4$), donc c’est un diviseur. $24$ et $36$ sont des **multiples** de 12 — des nombres où l’on arrive en comptant — pas des diviseurs.',
    },
  },

  // 5 ─ Common & highest common factor + CHECK 2 ────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Target',
    side: 'left',
    eyebrow: 'The big words of the lesson',
    eyebrowVn: 'Những từ quan trọng nhất của bài',
    eyebrowFr: 'Les grands mots du cours',
    title: 'Common & Highest Common Factor',
    titleVn: 'Ước số chung & ƯCLN',
    titleFr: 'Diviseur commun et PGCD',
    ratio: 45,
    inlineSvg: DIAGRAMS.HCF_LISTS,
    content:
      'Remember: in maths **common** means **shared**. Write the factors of each number, then find the ones in **both** lists — those are the **common factors**. For 12 and 18 they are 1, 2, 3 and 6.\n\n' +
      '**Highest** just means **biggest**. The **highest common factor (HCF)** is the biggest of them. This is the same idea as **ƯCLN** — today we learn the English words.',
    contentVn:
      'Nhớ nhé: trong toán, **common** nghĩa là **chung**. Viết ước số của mỗi số, rồi tìm những số có trong **cả hai** danh sách — đó là **ước số chung**. Với 12 và 18 chúng là 1, 2, 3 và 6.\n\n' +
      '**Highest** chỉ có nghĩa là **lớn nhất**. **Ước số chung lớn nhất (ƯCLN)** là số lớn nhất trong đó. Đây chính là **ƯCLN** — hôm nay ta học các từ tiếng Anh.',
    contentFr: 'En maths, **common** veut dire **partagé**. Écris les diviseurs de chaque nombre et garde ceux des **deux** listes : ce sont les **diviseurs communs** (common factors). Pour 12 et 18 : 1, 2, 3 et 6.\n\n**Highest** veut dire **le plus grand**. Le plus grand d’entre eux est le **PGCD** (highest common factor, **HCF**). Aujourd’hui, on apprend les mots anglais.',
    notes: [
      {
        tone: 'write',
        text: '**Common factor:** a factor of **both** numbers (in both lists).\n**Highest common factor (HCF):** the biggest common factor. The HCF of 12 and 18 is 6.',
        textVn: '**Ước số chung:** ước của **cả hai** số (có trong cả hai danh sách).\n**Ước số chung lớn nhất (ƯCLN):** ước số chung lớn nhất. ƯCLN của 12 và 18 là 6.',
        textFr: '**Diviseur commun (common factor) :** un diviseur des **deux** nombres.\n**PGCD (HCF) :** le plus grand diviseur commun. Le PGCD de 12 et 18 est 6.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which number is a **common factor** of 12 and 18?',
      qVn: 'Số nào là **ước số chung** của 12 và 18?',
      qFr: 'Quel nombre est un **diviseur commun** de 12 et 18 ?',
      options: [
        { val: 'A', text: '$6$', textVn: '$6$', textFr: '$6$' },
        { val: 'B', text: '$9$', textVn: '$9$', textFr: '$9$' },
        { val: 'C', text: '$4$', textVn: '$4$', textFr: '$4$' },
      ],
      correct: 'A',
      expEn: '$6$ divides into **both** 12 and 18, so it is a common factor (in fact the highest). $9$ divides only 18; $4$ divides only 12 — neither is in both lists.',
      expVn: '$6$ chia hết **cả** 12 và 18, nên là ước số chung (thực ra là lớn nhất). $9$ chỉ chia 18; $4$ chỉ chia 12 — không số nào có trong cả hai danh sách.',
      expFr: '$6$ divise **à la fois** 12 et 18, donc c’est un diviseur commun (et même le plus grand). $9$ divise seulement 18 ; $4$ divise seulement 12 — aucun des deux n’est dans les deux listes.',
    },
  },

  // 6 ─ English: why "highest" this time? + CHECK 3 ─────────────────────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'MessageSquare',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'Why “Highest” This Time?',
    titleVn: 'Vì sao lần này lại là “lớn nhất”?',
    titleFr: 'Pourquoi « le plus grand » cette fois ?',
    text: 'Last unit, the **lowest**. This unit, the **highest**.',
    textVn: 'Bài trước là **nhỏ nhất**. Bài này là **lớn nhất**.',
    textFr: 'À l’unité précédente, le **plus petit**. Dans cette unité, le **plus grand**.',
    sub: 'Why does the book swap ends?',
    subVn: 'Vì sao sách lại đổi đầu như vậy?',
    subFr: 'Pourquoi le livre change-t-il de côté ?',
    check: {
      id: 'c3',
      q: 'Why do we ask for the **lowest** common multiple but the **highest** common factor?',
      qVn: 'Vì sao ta hỏi bội số chung **nhỏ nhất** nhưng ước số chung **lớn nhất**?',
      qFr: 'Pourquoi demande-t-on le **plus petit** commun multiple mais le **plus grand** commun diviseur ?',
      options: [
        { val: 'A', text: 'Multiples never stop (no highest), but factors stop (there is a highest).', textVn: 'Bội số không bao giờ dừng (không có số lớn nhất), còn ước số thì dừng (có số lớn nhất).', textFr: 'Les multiples ne s’arrêtent jamais (pas de plus grand), mais les diviseurs s’arrêtent (il y a un plus grand).' },
        { val: 'B', text: 'Because factors are always bigger than multiples.', textVn: 'Vì ước số luôn lớn hơn bội số.', textFr: 'Parce que les diviseurs sont toujours plus grands que les multiples.' },
        { val: 'C', text: 'It is just a rule you have to memorise.', textVn: 'Đó chỉ là quy tắc phải học thuộc.', textFr: 'C’est juste une règle à apprendre par cœur.' },
      ],
      correct: 'A',
      expEn: 'Multiples of a number go on for ever, so there is no highest — we ask for the lowest. Factors stop at the number itself, so there is a highest to ask for.',
      expVn: 'Bội số của một số kéo dài mãi, nên không có số lớn nhất — ta hỏi số nhỏ nhất. Ước số dừng lại ở chính số đó, nên có số lớn nhất để hỏi.',
      expFr: 'Les multiples d’un nombre continuent pour toujours, donc il n’y a pas de plus grand — on demande le plus petit. Les diviseurs s’arrêtent au nombre lui-même, donc il y a un plus grand à demander.',
    },
  },

  // 7 ─ Mr Bowen's method (+ resolves the packing hook) ─────────────────────
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
    inlineSvg: DIAGRAMS.METHOD_24_80,
    drawThis: true,
    content:
      'To find the HCF of 24 and 80, Mr Bowen lists the factors of each, then rings the **biggest** number in both. The HCF of 24 and 80 is 8.\n\n' +
      'The **same method** answers the pencils and stickers: the HCF of 24 and 40 is also **8**, so 8 identical packs — each with $24 ÷ 8 = 3$ pencils and $40 ÷ 8 = 5$ stickers. How close was your guess?',
    contentVn:
      'Để tìm ƯCLN của 24 và 80, thầy Bowen liệt kê ước số của mỗi số, rồi khoanh **số lớn nhất** có trong cả hai. ƯCLN của 24 và 80 là 8.\n\n' +
      '**Cùng cách làm** đó trả lời bài bút chì và sticker: ƯCLN của 24 và 40 cũng là **8**, nên 8 gói giống hệt nhau — mỗi gói có $24 ÷ 8 = 3$ bút chì và $40 ÷ 8 = 5$ sticker. Dự đoán của em gần đến đâu?',
    contentFr: 'Pour trouver le PGCD de 24 et 80, M. Bowen fait la liste des diviseurs de chacun, puis entoure le **plus grand** nombre qui est dans les deux. Le PGCD de 24 et 80 est 8.\n\nLa **même méthode** répond à la question des crayons et des autocollants : le PGCD de 24 et 40 est aussi **8**, donc 8 paquets identiques — chacun avec $24 ÷ 8 = 3$ crayons et $40 ÷ 8 = 5$ autocollants. Ton estimation était-elle proche ?',
    notes: [
      {
        tone: 'write',
        text:
          '**To find the HCF of two numbers:**\n' +
          '**1.** List the factors of each number.\n' +
          '**2.** Find the numbers in both lists.\n' +
          '**3.** The HCF is the highest of them.',
        textVn:
          '**Để tìm ƯCLN của hai số:**\n' +
          '**1.** Liệt kê ước số của mỗi số.\n' +
          '**2.** Tìm những số có trong cả hai danh sách.\n' +
          '**3.** ƯCLN là số lớn nhất trong đó.',
        textFr: '**Pour trouver le PGCD de deux nombres :**\n**1.** Fais la liste des diviseurs de chaque nombre.\n**2.** Trouve les nombres qui sont dans les deux listes.\n**3.** Le PGCD est le plus grand d’entre eux.',
      },
    ],
  },

  // 8 ─ Find the HCF (HcfFinderWidget) ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Find the HCF',
    titleVn: 'Tìm ƯCLN',
    titleFr: 'Trouve le PGCD',
    ratio: 45,
    content:
      'Run the method on more pairs. For each one, **work out the HCF yourself before you reveal it** — list the factors if you need to.\n\n' +
      'Watch the surprises: 8 and 9, and 6 and 18, do not behave the way you might expect.',
    contentVn:
      'Áp dụng cách làm cho nhiều cặp số hơn. Với mỗi cặp, **tự tìm ƯCLN trước khi hiện đáp án** — cứ liệt kê ước số nếu cần.\n\n' +
      'Hãy để ý các bất ngờ: 8 và 9, rồi 6 và 18, không như em có thể đoán.',
    contentFr: 'Applique la méthode à d’autres paires. Pour chacune, **trouve le PGCD toi-même avant de l’afficher** — fais la liste des diviseurs si tu en as besoin.\n\nAttention aux surprises : 8 et 9, et 6 et 18, ne se comportent pas comme tu pourrais le croire.',
    widget: HcfFinderWidget,
  },

  // 9 ─ Watch out: the HCF is never "none" + CHECK 4 ────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ShieldCheck',
    eyebrow: 'Watch out',
    eyebrowVn: 'Cẩn thận',
    eyebrowFr: 'Attention',
    title: 'The HCF Is Never “None”',
    titleVn: 'ƯCLN không bao giờ là “không có”',
    titleFr: 'Le PGCD n’est jamais « aucun »',
    ratio: 55,
    content:
      'Two surprises. The HCF of 8 and 9 is **1**, **not** “none” — only 1 is in both lists. The HCF of 6 and 18 is **6**, **not** 1 — because 6 divides into 18.\n\n' +
      '**1 is a factor of every number**, so two numbers always share at least one common factor.',
    contentVn:
      'Hai bất ngờ. ƯCLN của 8 và 9 là **1**, **không phải** “không có” — chỉ có 1 nằm ở cả hai danh sách. ƯCLN của 6 và 18 là **6**, **không phải** 1 — vì 6 chia hết 18.\n\n' +
      '**1 là ước số của mọi số**, nên hai số luôn có ít nhất một ước số chung.',
    contentFr: 'Deux surprises. Le PGCD de 8 et 9 est **1**, **pas** « aucun » — seul 1 est dans les deux listes. Le PGCD de 6 et 18 est **6**, **pas** 1 — parce que 6 divise 18.\n\n**1 est un diviseur de tous les nombres**, donc deux nombres ont toujours au moins un diviseur commun.',
    notes: [
      {
        tone: 'write',
        text: '**Careful:** 1 is a factor of every number, so two numbers **always** have a common factor. And if one number divides into the other, the HCF is the **smaller** number.',
        textVn: '**Cẩn thận:** 1 là ước số của mọi số, nên hai số **luôn** có ước số chung. Và nếu một số chia hết số kia, ƯCLN chính là **số nhỏ hơn**.',
        textFr: '**Attention :** 1 est un diviseur de tous les nombres, donc deux nombres ont **toujours** un diviseur commun. Et si un nombre divise l’autre, le PGCD est le **plus petit** des deux.',
      },
    ],
    check: {
      id: 'c4',
      q: 'What is the highest common factor of 8 and 9?',
      qVn: 'Ước số chung lớn nhất của 8 và 9 là bao nhiêu?',
      qFr: 'Quel est le plus grand commun diviseur de 8 et 9 ?',
      options: [
        { val: 'A', text: 'None — they share no factors', textVn: 'Không có — chúng không có ước số chung', textFr: 'Aucun — ils n’ont pas de diviseur commun' },
        { val: 'B', text: '$72$', textVn: '$72$', textFr: '$72$' },
        { val: 'C', text: '$1$', textVn: '$1$', textFr: '$1$' },
      ],
      correct: 'C',
      expEn: '1 is a factor of every number, so the HCF of 8 and 9 is **1**, never “none”. Answering 72 multiplies them ($8 × 9$), which is the LCM, not the HCF.',
      expVn: '1 là ước số của mọi số, nên ƯCLN của 8 và 9 là **1**, không bao giờ “không có”. Trả lời 72 là nhân ($8 × 9$), đó là BCNN, không phải ƯCLN.',
      expFr: '1 est un diviseur de tous les nombres, donc le PGCD de 8 et 9 est **1**, jamais « aucun ». Répondre 72, c’est les multiplier ($8 × 9$), ce qui donne le PPCM, pas le PGCD.',
    },
  },

  // 10 ─ Application 1: the two ribbons + CHECK 5 ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    eyebrowFr: 'Problème 1',
    title: 'The Two Ribbons',
    titleVn: 'Hai dải ruy băng',
    titleFr: 'Les deux rubans',
    ratio: 50,
    inlineSvg: DIAGRAMS.RIBBONS_36_48,
    content:
      'Mr Bowen has two ribbons: one **36 cm** long, the other **48 cm**. He cuts both into equal pieces, **as long as possible**, with **nothing left over**.\n\n' +
      'How long is each piece?',
    contentVn:
      'Thầy Bowen có hai dải ruy băng: một dải dài **36 cm**, dải kia **48 cm**. Thầy cắt cả hai thành các đoạn bằng nhau, **dài nhất có thể**, và **không thừa mẩu nào**.\n\n' +
      'Mỗi đoạn dài bao nhiêu?',
    contentFr: 'M. Bowen a deux rubans : l’un mesure **36 cm**, l’autre **48 cm**. Il coupe les deux en morceaux égaux, **les plus longs possible**, **sans qu’il reste rien**.\n\nQuelle est la longueur de chaque morceau ?',
    check: {
      id: 'c5',
      q: 'Two ribbons, 36 cm and 48 cm, are cut into equal pieces **as long as possible**, none left over. How long is each piece?',
      qVn: 'Hai dải 36 cm và 48 cm được cắt thành các đoạn bằng nhau **dài nhất có thể**, không thừa. Mỗi đoạn dài bao nhiêu?',
      qFr: 'Deux rubans, de 36 cm et de 48 cm, sont coupés en morceaux égaux **les plus longs possible**, sans reste. Quelle est la longueur de chaque morceau ?',
      options: [
        { val: 'A', text: '$4$ cm', textVn: '$4$ cm', textFr: '$4$ cm' },
        { val: 'B', text: '$12$ cm', textVn: '$12$ cm', textFr: '$12$ cm' },
        { val: 'C', text: '$84$ cm', textVn: '$84$ cm', textFr: '$84$ cm' },
      ],
      correct: 'B',
      expEn: '“Equal pieces, as long as possible” means the **highest common factor** of 36 and 48, which is 12 cm. $4$ is a common factor but not the highest; $84$ adds the two lengths.',
      expVn: '“Đoạn bằng nhau, dài nhất có thể” nghĩa là **ước số chung lớn nhất** của 36 và 48, bằng 12 cm. $4$ là ước số chung nhưng không phải lớn nhất; $84$ là cộng hai độ dài.',
      expFr: '« Des morceaux égaux, les plus longs possible », c’est le **plus grand commun diviseur** de 36 et 48, qui est 12 cm. $4$ est un diviseur commun, mais pas le plus grand ; $84$ additionne les deux longueurs.',
    },
  },

  // 11 ─ Investigate: numbers next door (consecutive) [protected] ────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Investigate',
    eyebrowVn: 'Khám phá',
    eyebrowFr: 'Enquête',
    title: 'Numbers Next Door',
    titleVn: 'Những số nhà kề nhau',
    titleFr: 'Des nombres voisins',
    ratio: 55,
    content:
      'Find the HCF of each of these pairs. Do all three before you go on.\n\n' +
      '> **A)** 9 and 10    **B)** 20 and 21    **C)** 32 and 33',
    contentVn:
      'Hãy tìm ƯCLN của từng cặp số sau. Làm cả ba trước khi tiếp tục.\n\n' +
      '> **A)** 9 và 10    **B)** 20 và 21    **C)** 32 và 33',
    contentFr: 'Trouve le PGCD de chacune de ces paires. Fais les trois avant de continuer.\n\n> **A)** 9 et 10    **B)** 20 et 21    **C)** 32 et 33',
    notes: [
      {
        tone: 'write',
        text: '**Consecutive:** following one after the other when you count. 6 and 7 are consecutive; 6 and 8 are not.',
        textVn: '**Liên tiếp (consecutive):** đứng ngay sau nhau khi đếm. 6 và 7 là liên tiếp; 6 và 8 thì không.',
        textFr: '**Consécutifs (consecutive) :** qui se suivent quand on compte. 6 et 7 sont consécutifs ; 6 et 8 ne le sont pas.',
      },
    ],
  },

  // 12 ─ Investigate: all three are 1 (conjecture) [protected] ───────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sparkles',
    eyebrow: 'You have just done what mathematicians do',
    eyebrowVn: 'Em vừa làm đúng việc các nhà toán học làm',
    eyebrowFr: 'Tu viens de faire comme les mathématiciens',
    title: 'All Three Are 1',
    titleVn: 'Cả ba đều bằng 1',
    titleFr: 'Les trois font 1',
    ratio: 55,
    content:
      'Every answer came out as **1**. Three cases is not a proof — but it is enough to make a **conjecture**.\n\n' +
      'Test it on 99 and 100. Does it still hold?',
    contentVn:
      'Mọi đáp án đều ra **1**. Ba trường hợp chưa phải là chứng minh — nhưng đủ để đưa ra một **phỏng đoán**.\n\n' +
      'Hãy thử với 99 và 100. Nó còn đúng không?',
    contentFr: 'Chaque réponse fait **1**. Trois cas ne sont pas une preuve — mais ça suffit pour faire une **conjecture**.\n\nTeste avec 99 et 100. Est-ce toujours vrai ?',
    notes: [
      {
        tone: 'write',
        text: '**Conjecture:** what you think is true because of a pattern you have seen, before anyone has proved it.\n**Our conjecture:** the HCF of two consecutive numbers is always 1.',
        textVn: '**Phỏng đoán (conjecture):** điều em cho là đúng dựa trên một quy luật em thấy, trước khi có ai chứng minh.\n**Phỏng đoán của lớp ta:** ƯCLN của hai số liên tiếp luôn bằng 1.',
        textFr: '**Conjecture :** ce que tu crois vrai à cause d’une régularité que tu as vue, avant que quelqu’un l’ait prouvé.\n**Notre conjecture :** le PGCD de deux nombres consécutifs est toujours 1.',
      },
    ],
  },

  // 13 ─ Application 2: the bookshelf (simplify a fraction) ──────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    eyebrowFr: 'Problème 2',
    title: 'Mr Bowen’s Bookshelf',
    titleVn: 'Giá sách của thầy Bowen',
    titleFr: 'L’étagère de M. Bowen',
    ratio: 55,
    side: 'left',
    image: 'images/Y7_MATH/U01_4/books.jpg',
    content:
      'There are **24 books** on the shelf, and **18** of them are maths books.\n\n' +
      'Write the fraction of the books that are maths books, **in its simplest form**.',
    contentVn:
      'Trên giá có **24 quyển sách**, trong đó **18** quyển là sách toán.\n\n' +
      'Hãy viết phân số chỉ phần sách toán, **ở dạng tối giản**.',
    contentFr: 'Il y a **24 livres** sur l’étagère, et **18** d’entre eux sont des livres de maths.\n\nÉcris la fraction des livres qui sont des livres de maths, **sous sa forme la plus simple**.',
    check: {
      id: 'c6',
      q: '18 of the 24 books are maths books. What is $\\frac{18}{24}$ in its simplest form?',
      qVn: '18 trong 24 quyển là sách toán. $\\frac{18}{24}$ ở dạng tối giản là gì?',
      qFr: '18 des 24 livres sont des livres de maths. Quelle est la forme la plus simple de $\\frac{18}{24}$ ?',
      options: [
        { val: 'A', text: '$\\frac{9}{12}$', textVn: '$\\frac{9}{12}$', textFr: '$\\frac{9}{12}$' },
        { val: 'B', text: '$\\frac{3}{4}$', textVn: '$\\frac{3}{4}$', textFr: '$\\frac{3}{4}$' },
        { val: 'C', text: '$\\frac{6}{8}$', textVn: '$\\frac{6}{8}$', textFr: '$\\frac{6}{8}$' },
      ],
      correct: 'B',
      expEn: 'Simplest form means dividing by the **HCF**. The HCF of 18 and 24 is 6, so $\\frac{18}{24} = \\frac{3}{4}$. $\\frac{9}{12}$ (÷2) and $\\frac{6}{8}$ (÷3) are equal but not fully simplified — they still share a factor.',
      expVn: 'Dạng tối giản là chia cho **ƯCLN**. ƯCLN của 18 và 24 là 6, nên $\\frac{18}{24} = \\frac{3}{4}$. $\\frac{9}{12}$ (÷2) và $\\frac{6}{8}$ (÷3) bằng nó nhưng chưa tối giản — vẫn còn ước chung.',
      expFr: 'La forme la plus simple, c’est diviser par le **PGCD**. Le PGCD de 18 et 24 est 6, donc $\\frac{18}{24} = \\frac{3}{4}$. $\\frac{9}{12}$ (÷2) et $\\frac{6}{8}$ (÷3) sont égales mais pas complètement simplifiées — elles ont encore un diviseur commun.',
    },
  },

  // 14 ─ Countable recap ────────────────────────────────────────────────────
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
    content: 'You’ve now met the **HCF method** and **the key words** (factor, common factor, HCF, consecutive, conjecture). Tick each one you can do.',
    contentVn: 'Em đã học **cách tìm ƯCLN** và **các từ khoá** (ước số, ước số chung, ƯCLN, liên tiếp, phỏng đoán). Hãy tự đánh dấu từng điều em làm được.',
    contentFr: 'Tu connais maintenant la **méthode du PGCD** et **les mots clés** (diviseur, diviseur commun, PGCD, consécutif, conjecture). Coche chaque point que tu sais faire.',
    items: [
      { text: 'Say what a **factor** is — and how it differs from a **multiple**.', textVn: 'Nói được **ước số** là gì — và khác **bội số** ra sao.', textFr: 'Dire ce qu’est un **diviseur (factor)** — et en quoi il diffère d’un **multiple**.' },
      { text: 'Find the **common factors** of two numbers.', textVn: 'Tìm được **ước số chung** của hai số.', textFr: 'Trouver les **diviseurs communs** de deux nombres.' },
      { text: 'Find the **highest common factor (HCF)**.', textVn: 'Tìm được **ước số chung lớn nhất (ƯCLN)**.', textFr: 'Trouver le **plus grand commun diviseur (PGCD)**.' },
      { text: 'Explain why we want the **highest** factor but the **lowest** multiple.', textVn: 'Giải thích vì sao ta cần ước số **lớn nhất** nhưng bội số **nhỏ nhất**.', textFr: 'Expliquer pourquoi on veut le **plus grand** diviseur mais le **plus petit** multiple.' },
      { text: 'Use the HCF to **simplify a fraction**.', textVn: 'Dùng ƯCLN để **rút gọn một phân số**.', textFr: 'Utiliser le PGCD pour **simplifier une fraction**.' },
    ],
  },

  // 15 ─ Closer + exit question ─────────────────────────────────────────────
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
    subtitle: 'You can find the highest common factor of two numbers, and you know a factor divides in while a multiple is what you land on. Exit question: what is the **HCF of 7 and 14** — and why is it not 1?',
    subtitleVn: 'Em đã có thể tìm ước số chung lớn nhất của hai số, và biết ước số thì chia vào, còn bội số là số em đáp xuống. Câu hỏi ra về: **ƯCLN của 7 và 14** là bao nhiêu — và vì sao không phải 1?',
    subtitleFr: 'Tu sais trouver le plus grand commun diviseur de deux nombres, et tu sais qu’un diviseur entre dans le nombre alors qu’un multiple est le nombre où l’on arrive. Question de sortie : quel est le **PGCD de 7 et 14** — et pourquoi ce n’est pas 1 ?',
  },
];
