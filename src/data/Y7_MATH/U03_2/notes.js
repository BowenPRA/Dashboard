// src/data/Y7_MATH/U03_2/notes.js
// 3.2 Rounding — a self-study reduction of the second half of the classroom
// deck (C:\Users\bowen\lessons, content/y7-math/U03_1_2: slide 17, the
// place-value table, then slides 19–39), rebuilt to the algebra-engines density
// (docs/y7-math/algebra-engines.md §4). 25 layout slides, 20 scored items:
// 9 checks and 11 activities across five activity types (order · sort · round ·
// predict · busstop). No two slides in a row go unscored, and no two activities
// in a row are the same type.
//
// THREE THINGS SHAPE THIS DECK (the first two from the classroom deck, kept).
//
// 1. THE ENGLISH IS THE BARRIER, AND HERE IT IS THE INSTRUCTION WORDS. "Round
//    to", "correct to" and "to 2 decimal places" are one job; "as far as" is a
//    different one. Slide 4 sorts six exam sentences into the two jobs, and
//    slide 5 keeps the words to copy.
//
// 2. TWO MISTAKES COST THE MARKS: dropping the trailing zero (34.9892 to 1 d.p.
//    is 35.0, and 35 shows no decimal place) and stopping at the place you were
//    asked for instead of looking one past it (58 ÷ 7 to 3 d.p. is 8.286, not
//    8.285). Each classroom ask-slide is now a `predict` (slides 10 and 13),
//    settled on the slides after it.
//
// 3. THE DIVISION IS WRITTEN THE SHORT WAY — this run is NEW; the classroom deck
//    only compares 8.285 with 8.286 and never draws a division. Slides 14–18:
//    no stack of products and subtractions under the number; each remainder is
//    written small, up and to the left of the next digit, and read with it as
//    one number ("the remainder rides on the next digit"); when the digits run
//    out, a point and zeros are added after it and the carrying goes on. Slide
//    19 ties it to the classroom's rule: work to n + 1 places, then round once.
//
// SPINE:
//   1–2    hero; the place-value table from 3.1 (order)
//   3–5    round, on a scale (check); the instruction words (sort); the words
//          to copy, with "as far as" against "correct to" in a reveal
//   6–9    decimal places (check); degree of accuracy (check); the rule
//          (check); round to 1 d.p. (round 0.649)
//   10–12  try this one (predict); keep the zero (check); two places, then
//          three (round 1.99952 → 2.000)
//   13–20  two students disagree over 58 ÷ 7 (predict); long against short;
//          the remainder rides (check); add zeros after the point; until it
//          stops (busstop 7 ÷ 8); 58 ÷ 7 the short way; one place further
//          (order); divide, then round once (busstop 23 ÷ 9, 2 d.p.)
//   21–24  how exact? (round to the nearest 10); Mr Bowen's homework (sort);
//          a red blood cell (check); Mr Bowen's cat (check)
//   25     the checklist, with the exit question as the last check
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · A decimal point is a dot in both languages.
//  · No whiteboards, pairs, hand votes, paper, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U03_2/${f}`);

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
    eyebrow: 'Unit 3 · 3.2',
    eyebrowVn: 'Chương 3 · 3.2',
    eyebrowFr: 'Unité 3 · 3.2',
    title: 'Rounding',
    titleVn: 'Làm tròn',
    titleFr: 'Arrondis',
    objective: 'Count decimal places from the point; round using the next digit, and keep a zero at the end when the answer needs one; know that "correct to" means round; and divide the short way — carry each remainder, add zeros after the point, and work one place further before you round.',
    objectiveVn: 'Đếm chữ số thập phân từ dấu thập phân; làm tròn dựa vào chữ số ngay sau, và giữ số 0 ở cuối khi đáp án cần; biết "correct to" nghĩa là làm tròn; và chia theo cách viết ngắn — nhớ từng số dư sang chữ số tiếp theo, thêm số 0 sau dấu thập phân, và tính thêm một cột trước khi làm tròn.',
    objectiveFr: 'Compter les décimales à partir du point ; arrondir avec le chiffre suivant, et garder un zéro à la fin quand la réponse en a besoin ; savoir que « correct to » veut dire arrondir ; et diviser par la méthode courte — reporter chaque reste, ajouter des zéros après le point, et calculer un rang de plus avant d’arrondir.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'You will **order**, **sort**, **round**, **predict** and **divide** your way through it. **20 things are scored** — the first is the place-value table on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **phân loại**, **làm tròn**, **dự đoán** và **chia** trong suốt bài học. **20 mục được tính điểm** — mục đầu tiên là bảng giá trị theo vị trí ở slide sau.',
      textFr: 'Tu vas **ranger**, **trier**, **arrondir**, **prédire** et **diviser** tout au long de la leçon. **20 éléments sont notés** — le premier, c’est le tableau de valeur de position de la diapo suivante.',
    },
  },

  // 2 ─ Starter: the place-value table from 3.1 (ORDER) ─────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Columns3',
    eyebrow: 'From 3.1',
    eyebrowVn: 'Từ bài 3.1',
    eyebrowFr: 'Rappel de 3.1',
    title: 'Place Value',
    titleVn: 'Giá trị theo vị trí',
    titleFr: 'Valeur de position',
    inlineSvg: DIAGRAMS.PLACE_TABLE,
    caption: 'The table from 3.1. Rounding is choosing **where to stop** on the right.',
    captionVn: 'Bảng ở bài 3.1. Làm tròn là chọn **dừng ở đâu** về phía bên phải. (tenths = phần mười, hundredths = phần trăm, thousandths = phần nghìn)',
    captionFr: 'Le tableau de 3.1. Arrondir, c’est choisir **où s’arrêter** à droite. (tenths = dixièmes, hundredths = centièmes, thousandths = millièmes)',
    activity: {
      id: 'act_columns',
      type: 'order',
      prompt: 'Put the five columns in order: the **biggest** value first.',
      promptVn: 'Sắp xếp năm cột theo thứ tự: giá trị **lớn nhất** trước.',
      promptFr: 'Range les cinq colonnes dans l’ordre : la **plus grande** valeur d’abord.',
      steps: [
        { id: 'tens', name: 'tens', nameVn: 'tens — hàng chục', nameFr: 'tens — dizaines' },
        { id: 'ones', name: 'ones', nameVn: 'ones — hàng đơn vị', nameFr: 'ones — unités' },
        { id: 'tenths', name: 'tenths', nameVn: 'tenths — hàng phần mười', nameFr: 'tenths — dixièmes' },
        { id: 'hundredths', name: 'hundredths', nameVn: 'hundredths — hàng phần trăm', nameFr: 'hundredths — centièmes' },
        { id: 'thousandths', name: 'thousandths', nameVn: 'thousandths — hàng phần nghìn', nameFr: 'thousandths — millièmes' },
      ],
      explain: 'Each column is 10 times smaller than the one on its left. The ending **-ths** means a fraction: a **thousandth** is $0.001$, much smaller than a **tenth**, $0.1$.',
      explainVn: 'Mỗi cột nhỏ hơn cột bên trái nó 10 lần. Đuôi **-ths** chỉ một phần nhỏ: một **thousandth** (phần nghìn) là $0.001$, nhỏ hơn nhiều so với một **tenth** (phần mười), $0.1$.',
      explainFr: 'Chaque colonne est 10 fois plus petite que celle de sa gauche. La terminaison **-ths** indique une fraction : un **thousandth** (millième) vaut $0.001$, bien moins qu’un **tenth** (dixième), $0.1$.',
    },
  },

  // 3 ─ Key word: round, off a scale that is already rounding (CHECK 1) ──────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Round',
    titleVn: 'Làm tròn',
    titleFr: 'Arrondir',
    ratio: 45,
    image: img('scale.jpg'),
    content: 'This scale says **82 g**. It is not exactly 82 g.\n\nThe scale only counts in whole grams, so it shows the **nearest** one.',
    contentVn: 'Cân này ghi **82 g**. Thật ra không đúng chính xác 82 g.\n\nCân chỉ đếm theo gam nguyên, nên nó hiện số gam **gần nhất**.',
    contentFr: 'Cette balance affiche **82 g**. Ce n’est pas exactement 82 g.\n\nLa balance ne compte qu’en grammes entiers, donc elle affiche le gramme le **plus proche**.',
    notes: [
      {
        tone: 'write',
        text: '**Round:** write a number in a simpler form that is close to it.\nVietnamese says it the same way: its word for rounding means "make it round".',
        textVn: '**Làm tròn (round):** viết một số ở dạng đơn giản hơn nhưng gần bằng nó.\nTiếng Anh "round" cũng có nghĩa là "tròn", giống tiếng Việt.',
        textFr: '**Arrondir (round) :** écrire un nombre sous une forme plus simple, proche de lui.\nEn français aussi, arrondir veut dire « rendre rond ».',
      },
    ],
    check: {
      id: 'chk_scale',
      q: 'The medals could really be $82.3$ g. Which of these masses would the scale **also** show as 82 g?',
      qVn: 'Khối lượng thật của mấy chiếc huy chương có thể là $82.3$ g. Khối lượng nào sau đây **cũng** được cân hiện là 82 g?',
      qFr: 'Les médailles pourraient en réalité peser $82.3$ g. Laquelle de ces masses la balance afficherait-elle **aussi** comme 82 g ?',
      options: [
        { val: 'A', text: '$82.6$ g', textVn: '$82.6$ g', textFr: '$82.6$ g' },
        { val: 'B', text: '$81.8$ g', textVn: '$81.8$ g', textFr: '$81.8$ g' },
        { val: 'C', text: '$81.4$ g', textVn: '$81.4$ g', textFr: '$81.4$ g' },
        { val: 'D', text: '$8.2$ g', textVn: '$8.2$ g', textFr: '$8.2$ g' },
      ],
      correct: 'B',
      expEn: '$81.8$ is nearer to 82 than to 81, so the scale shows 82. $82.6$ starts with 82, but it is nearer to 83 — cutting off the $.6$ is chopping, not rounding. $81.4$ is nearer to 81. $8.2$ has the same digits in different columns: it is nowhere near 82.',
      expVn: '$81.8$ gần 82 hơn 81, nên cân hiện 82. $82.6$ bắt đầu bằng 82, nhưng nó gần 83 hơn — cắt bỏ $.6$ là cắt cụt, không phải làm tròn. $81.4$ gần 81 hơn. $8.2$ có cùng chữ số nhưng ở cột khác: nó không hề gần 82.',
      expFr: '$81.8$ est plus proche de 82 que de 81, donc la balance affiche 82. $82.6$ commence par 82, mais il est plus proche de 83 — couper le $.6$, c’est tronquer, pas arrondir. $81.4$ est plus proche de 81. $8.2$ a les mêmes chiffres dans d’autres colonnes : il est très loin de 82.',
    },
  },

  // 4 ─ English check: the instruction words (SORT) ─────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'What the Question Asks',
    titleVn: 'Câu hỏi yêu cầu gì',
    titleFr: 'Ce que demande la question',
    inlineSvg: DIAGRAMS.ROUND_WORDS,
    caption: 'Three of these are one job. One is not.',
    captionVn: 'Ba dòng đầu là cùng một việc. Dòng cuối thì không.',
    captionFr: 'Trois de ces lignes font le même travail. Une, non.',
    activity: {
      id: 'act_words',
      type: 'sort',
      prompt: 'Six exam questions. What does each one want? Sort them.',
      promptVn: 'Sáu câu hỏi trong đề thi. Mỗi câu muốn gì? Hãy phân loại.',
      promptFr: 'Six questions d’examen. Que demande chacune ? Trie-les.',
      bins: [
        { id: 'round', name: '**Round** the answer', nameVn: '**Làm tròn** đáp án', nameFr: '**Arrondir** la réponse' },
        { id: 'keep', name: '**Do not round** — write the digits you get', nameVn: '**Không làm tròn** — viết các chữ số em tính được', nameFr: '**Ne pas arrondir** — écrire les chiffres obtenus' },
      ],
      cards: [
        { id: 'w1', name: '"Round $6.284$ to 1 decimal place."', nameVn: '"Round $6.284$ to 1 decimal place."', nameFr: '"Round $6.284$ to 1 decimal place."', bin: 'round' },
        { id: 'w2', name: '"Work out $5 ÷ 3$ as far as 3 d.p."', nameVn: '"Work out $5 ÷ 3$ as far as 3 d.p."', nameFr: '"Work out $5 ÷ 3$ as far as 3 d.p."', bin: 'keep' },
        { id: 'w3', name: '"Write $0.0472$ correct to 2 d.p."', nameVn: '"Write $0.0472$ correct to 2 d.p."', nameFr: '"Write $0.0472$ correct to 2 d.p."', bin: 'round' },
        { id: 'w4', name: '"Give $19.637$ to 2 decimal places."', nameVn: '"Give $19.637$ to 2 decimal places."', nameFr: '"Give $19.637$ to 2 decimal places."', bin: 'round' },
        { id: 'w5', name: '"Divide $2$ by $7$ as far as 4 decimal places."', nameVn: '"Divide $2$ by $7$ as far as 4 decimal places."', nameFr: '"Divide $2$ by $7$ as far as 4 decimal places."', bin: 'keep' },
        { id: 'w6', name: '"Work out $41 ÷ 6$, correct to 1 d.p."', nameVn: '"Work out $41 ÷ 6$, correct to 1 d.p."', nameFr: '"Work out $41 ÷ 6$, correct to 1 d.p."', bin: 'round' },
      ],
      explain: '**Round to**, **correct to** and **to 2 decimal places** are one job: round. **As far as** is different: keep dividing until you reach that place, write the digits you have, and do not round.',
      explainVn: '**Round to**, **correct to** và **to 2 decimal places** là cùng một việc: làm tròn. **As far as** thì khác: cứ chia tiếp cho đến vị trí đó, viết các chữ số em có, và không làm tròn.',
      explainFr: '**Round to**, **correct to** et **to 2 decimal places**, c’est le même travail : arrondir. **As far as**, c’est différent : continue à diviser jusqu’à ce rang, écris les chiffres que tu as, et n’arrondis pas.',
    },
  },

  // 5 ─ The instruction words, to keep ──────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Exam words',
    eyebrowVn: 'Từ trong đề thi',
    eyebrowFr: 'Mots d’examen',
    title: 'Same Job, Different Words',
    titleVn: 'Cùng một việc, khác cách nói',
    titleFr: 'Même travail, mots différents',
    content: 'Read the instruction before you work anything out. These words tell you whether to round.',
    contentVn: 'Hãy đọc yêu cầu trước khi tính bất cứ điều gì. Những từ này cho em biết có làm tròn hay không.',
    contentFr: 'Lis la consigne avant de calculer quoi que ce soit. Ces mots te disent s’il faut arrondir.',
    notes: [
      {
        tone: 'write',
        text: '**round to** 2 d.p. and **correct to** 2 d.p. and **to 2 decimal places** all mean the same job.\n**as far as** 2 d.p. does not: it means keep going, do not round.',
        textVn: '**round to** 2 d.p., **correct to** 2 d.p. và **to 2 decimal places** đều là cùng một việc.\n**as far as** 2 d.p. thì khác: nghĩa là cứ tính tiếp, chưa làm tròn.',
        textFr: '**round to** 2 d.p., **correct to** 2 d.p. et **to 2 decimal places** veulent tous dire la même chose.\n**as far as** 2 d.p., non : ça veut dire continuer, sans arrondir.',
      },
    ],
    reveal: {
      prompt: '$5 ÷ 3 = 1.6666...$ Write it **as far as** 3 d.p., then **correct to** 3 d.p.',
      promptVn: '$5 ÷ 3 = 1.6666...$ Hãy viết nó **as far as** 3 d.p., rồi **correct to** 3 d.p.',
      promptFr: '$5 ÷ 3 = 1.6666...$ Écris-le **as far as** 3 d.p., puis **correct to** 3 d.p.',
      label: 'Check both',
      labelVn: 'Kiểm tra cả hai',
      labelFr: 'Vérifie les deux',
      answer: '**As far as** 3 d.p.: $1.666$ — the digits you have, not rounded.\n\n**Correct to** 3 d.p.: $1.667$ — the next digit is 6, so it rounds up.',
      answerVn: '**As far as** 3 d.p.: $1.666$ — các chữ số em có, không làm tròn.\n\n**Correct to** 3 d.p.: $1.667$ — chữ số ngay sau là 6, nên làm tròn lên.',
      answerFr: '**As far as** 3 d.p. : $1.666$ — les chiffres que tu as, sans arrondir.\n\n**Correct to** 3 d.p. : $1.667$ — le chiffre suivant est 6, donc on arrondit au-dessus.',
    },
  },

  // 6 ─ Counting decimal places (CHECK 2) ───────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Hash',
    eyebrow: 'Count carefully',
    eyebrowVn: 'Đếm cho kỹ',
    eyebrowFr: 'Compte bien',
    title: 'Decimal Places',
    titleVn: 'Chữ số thập phân',
    titleFr: 'Décimales',
    ratio: 40,
    inlineSvg: DIAGRAMS.DP_COUNT,
    content: 'Start counting at the point, not at the front.',
    contentVn: 'Bắt đầu đếm từ dấu thập phân, không phải từ đầu số.',
    contentFr: 'Commence à compter au point, pas au début.',
    notes: [
      {
        tone: 'write',
        text: '**Decimal places (d.p.):** the digits after the decimal point.\n$3.14159$ has 5 decimal places. $28.6$ has 1.',
        textVn: '**Chữ số thập phân (decimal places, d.p.):** các chữ số sau dấu thập phân.\n$3.14159$ có 5 chữ số thập phân. $28.6$ có 1.',
        textFr: '**Décimales (decimal places, d.p.) :** les chiffres après le point décimal.\n$3.14159$ a 5 décimales. $28.6$ en a 1.',
      },
    ],
    check: {
      id: 'chk_places',
      q: 'How many decimal places does $40.0725$ have?',
      qVn: '$40.0725$ có bao nhiêu chữ số thập phân?',
      qFr: 'Combien de décimales $40.0725$ a-t-il ?',
      options: [
        { val: 'A', text: '2', textVn: '2', textFr: '2' },
        { val: 'B', text: '3', textVn: '3', textFr: '3' },
        { val: 'C', text: '4', textVn: '4', textFr: '4' },
        { val: 'D', text: '6', textVn: '6', textFr: '6' },
      ],
      correct: 'C',
      expEn: 'Count every digit after the point: 0, 7, 2, 5 — that is **4**. A zero after the point is a digit too, so 3 misses one. 6 counts from the front of the number. 2 counts the digits in front of the point.',
      expVn: 'Đếm mọi chữ số sau dấu thập phân: 0, 7, 2, 5 — là **4**. Số 0 sau dấu thập phân cũng là một chữ số, nên 3 là đếm thiếu. 6 là đếm từ đầu số. 2 là đếm các chữ số đứng trước dấu thập phân.',
      expFr: 'Compte chaque chiffre après le point : 0, 7, 2, 5 — cela fait **4**. Un zéro après le point est aussi un chiffre, donc 3 en oublie un. 6 compte depuis le début du nombre. 2 compte les chiffres avant le point.',
    },
  },

  // 7 ─ Degree of accuracy, on a watch that has chosen one (CHECK 3) ─────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Timer',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Degree of Accuracy',
    titleVn: 'Độ chính xác',
    titleFr: 'Degré de précision',
    ratio: 45,
    image: img('stopwatch.jpg'),
    content: 'This watch stops at **2 decimal places**. The scale stopped at **1 gram**.',
    contentVn: 'Đồng hồ này dừng ở **2 chữ số thập phân**. Cái cân thì dừng ở **1 gam**.',
    contentFr: 'Ce chrono s’arrête à **2 décimales**. La balance s’arrêtait à **1 gramme**.',
    notes: [
      {
        tone: 'write',
        text: '**Degree of accuracy:** how exact the answer has to be.\nThe question always tells you. Do not choose your own.',
        textVn: '**Độ chính xác (degree of accuracy):** đáp án cần chính xác đến mức nào.\nĐề bài luôn nói rõ. Đừng tự chọn theo ý mình.',
        textFr: '**Degré de précision (degree of accuracy) :** à quel point la réponse doit être exacte.\nLa question te le dit toujours. Ne choisis pas toi-même.',
      },
    ],
    check: {
      id: 'chk_accuracy',
      q: 'Which of these asks for the **most exact** answer?',
      qVn: 'Yêu cầu nào sau đây đòi hỏi đáp án **chính xác nhất**?',
      qFr: 'Laquelle de ces consignes demande la réponse la **plus exacte** ?',
      options: [
        { val: 'A', text: 'to the nearest 10', textVn: 'to the nearest 10 (hàng chục gần nhất)', textFr: 'to the nearest 10 (à la dizaine près)' },
        { val: 'B', text: 'to the nearest whole number', textVn: 'to the nearest whole number (số nguyên gần nhất)', textFr: 'to the nearest whole number (à l’unité près)' },
        { val: 'C', text: 'correct to 1 d.p.', textVn: 'correct to 1 d.p. (1 chữ số thập phân)', textFr: 'correct to 1 d.p. (au dixième près)' },
        { val: 'D', text: 'correct to 3 d.p.', textVn: 'correct to 3 d.p. (3 chữ số thập phân)', textFr: 'correct to 3 d.p. (au millième près)' },
      ],
      correct: 'D',
      expEn: 'The smaller the step, the more exact the answer. **3 d.p.** counts in thousandths, the smallest step here. 1 d.p. counts in tenths, and a whole number counts in ones. The **nearest 10** has the biggest number in it, but it is the biggest step — so it is the least exact.',
      expVn: 'Bước càng nhỏ thì đáp án càng chính xác. **3 d.p.** đếm theo phần nghìn, bước nhỏ nhất ở đây. 1 d.p. đếm theo phần mười, còn số nguyên đếm theo đơn vị. **Nearest 10** có con số lớn nhất, nhưng lại là bước lớn nhất — nên kém chính xác nhất.',
      expFr: 'Plus le pas est petit, plus la réponse est exacte. **3 d.p.** compte en millièmes, le plus petit pas ici. 1 d.p. compte en dixièmes, et un nombre entier compte en unités. Le **nearest 10** (à la dizaine près) contient le plus grand nombre, mais c’est le plus grand pas — donc c’est le moins exact.',
    },
  },

  // 8 ─ The rule, on a number line so the 5 is honest (CHECK 4) ─────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'Which one is nearer?',
    eyebrowVn: 'Gần cái nào hơn?',
    eyebrowFr: 'Lequel est le plus proche ?',
    title: 'The Rule',
    titleVn: 'Quy tắc',
    titleFr: 'La règle',
    ratio: 40,
    inlineSvg: DIAGRAMS.ROUND_LINE,
    content: 'Rounding means picking the nearer one.',
    contentVn: 'Làm tròn là chọn số gần hơn.',
    contentFr: 'Arrondir, c’est choisir le plus proche.',
    notes: [
      {
        tone: 'write',
        text: 'Look at the **next digit** after the place you want.\n5 or more: round up. 4 or less: leave it.',
        textVn: 'Nhìn vào **chữ số ngay sau** vị trí em cần.\nTừ 5 trở lên: làm tròn lên. Từ 4 trở xuống: giữ nguyên.',
        textFr: 'Regarde le **chiffre suivant**, juste après le rang voulu.\n5 ou plus : arrondis au-dessus. 4 ou moins : ne change rien.',
      },
    ],
    check: {
      id: 'chk_rule',
      q: 'Round $3.85$ to 1 decimal place.',
      qVn: 'Làm tròn $3.85$ đến 1 chữ số thập phân.',
      qFr: 'Arrondis $3.85$ à 1 décimale.',
      options: [
        { val: 'A', text: '$3.9$', textVn: '$3.9$', textFr: '$3.9$' },
        { val: 'B', text: '$3.8$', textVn: '$3.8$', textFr: '$3.8$' },
        { val: 'C', text: '$4.0$', textVn: '$4.0$', textFr: '$4.0$' },
        { val: 'D', text: '$3.85$', textVn: '$3.85$', textFr: '$3.85$' },
      ],
      correct: 'A',
      expEn: 'The digit after the first decimal place is 5, and 5 or more rounds up: $3.8$ becomes $3.9$. $3.8$ is chopped — it ignores the 5. $4.0$ is rounded to the nearest whole number, not to 1 decimal place. $3.85$ has not been rounded at all.',
      expVn: 'Chữ số ngay sau chữ số thập phân thứ nhất là 5, mà từ 5 trở lên thì làm tròn lên: $3.8$ thành $3.9$. $3.8$ là cắt cụt — bỏ qua số 5. $4.0$ là làm tròn đến số nguyên gần nhất, không phải đến 1 chữ số thập phân. $3.85$ thì chưa làm tròn gì cả.',
      expFr: 'Le chiffre après la première décimale est 5, et 5 ou plus fait arrondir au-dessus : $3.8$ devient $3.9$. $3.8$ est tronqué — il oublie le 5. $4.0$ est arrondi à l’unité, pas à 1 décimale. $3.85$ n’a pas été arrondi du tout.',
    },
  },

  // 9 ─ Practice, 1 d.p. (ROUND) ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Round to 1 d.p.',
    titleVn: 'Làm tròn đến 1 chữ số thập phân',
    titleFr: 'Arrondis à 1 d.p.',
    content: 'Round each one to **1 decimal place**.\n\n**a** $6.31$\n**b** $2.78$\n**c** $14.85$\n**d** $0.649$\n\nDo **d** below. Work out the other three, then check them.',
    contentVn: 'Làm tròn mỗi số đến **1 chữ số thập phân**.\n\n**a** $6.31$\n**b** $2.78$\n**c** $14.85$\n**d** $0.649$\n\nLàm câu **d** ở bên dưới. Tính ba câu còn lại, rồi kiểm tra.',
    contentFr: 'Arrondis chacun à **1 décimale**.\n\n**a** $6.31$\n**b** $2.78$\n**c** $14.85$\n**d** $0.649$\n\nFais **d** ci-dessous. Trouve les trois autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and c',
      labelVn: 'Kiểm tra a, b và c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $6.3$ — the next digit is 1\n**b** $2.8$ — the next digit is 8\n**c** $14.9$ — the next digit is 5, so it goes up',
      answerVn: '**a** $6.3$ — chữ số ngay sau là 1\n**b** $2.8$ — chữ số ngay sau là 8\n**c** $14.9$ — chữ số ngay sau là 5, nên tăng lên',
      answerFr: '**a** $6.3$ — le chiffre suivant est 1\n**b** $2.8$ — le chiffre suivant est 8\n**c** $14.9$ — le chiffre suivant est 5, donc on monte',
    },
    activity: {
      id: 'act_round_1dp',
      type: 'round',
      n: '0.649',
      to: 1,
      prompt: '**d** Round $0.649$ to 1 decimal place.',
      promptVn: '**d** Làm tròn $0.649$ đến 1 chữ số thập phân.',
      promptFr: '**d** Arrondis $0.649$ à 1 décimale.',
      explain: 'The digit after the 6 is 4, and 4 or less leaves it: $0.6$. Look only at the **next** digit. The 9 further along does not get a vote — rounding to $0.65$ first and then to $0.7$ is rounding twice.',
      explainVn: 'Chữ số ngay sau số 6 là 4, mà từ 4 trở xuống thì giữ nguyên: $0.6$. Chỉ nhìn chữ số **ngay sau**. Số 9 ở phía sau nữa không được tính — làm tròn thành $0.65$ trước rồi thành $0.7$ là làm tròn hai lần.',
      explainFr: 'Le chiffre après le 6 est 4, et 4 ou moins ne change rien : $0.6$. Regarde seulement le chiffre **suivant**. Le 9 plus loin n’a pas son mot à dire — arrondir d’abord à $0.65$ puis à $0.7$, c’est arrondir deux fois.',
    },
  },

  // 10 ─ Ask before you tell: the trailing zero (PREDICT) ───────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Something is strange',
    eyebrowVn: 'Có gì đó lạ',
    eyebrowFr: 'Quelque chose cloche',
    title: 'Try This One',
    titleVn: 'Thử câu này',
    titleFr: 'Essaie celle-ci',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Round $34.9892$ to 1 decimal place.',
    textVn: 'Làm tròn $34.9892$ đến 1 chữ số thập phân.',
    textFr: 'Arrondis $34.9892$ à 1 décimale.',
    sub: 'Decide before you go on. The next slide settles it.',
    subVn: 'Quyết định trước khi đi tiếp. Slide sau sẽ cho em biết.',
    subFr: 'Décide avant de continuer. La diapo suivante tranche.',
    activity: {
      id: 'act_vote_zero',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptVn: 'Đáp án nào đúng?',
      promptFr: 'Quelle réponse est juste ?',
      options: [
        { val: 'chop', name: '$34.9$', nameVn: '$34.9$', nameFr: '$34.9$' },
        { val: 'ten', name: '$34.10$', nameVn: '$34.10$', nameFr: '$34.10$' },
        { val: 'whole', name: '$35$', nameVn: '$35$', nameFr: '$35$' },
        { val: 'zero', name: '$35.0$', nameVn: '$35.0$', nameFr: '$35.0$' },
      ],
      correct: 'zero',
      explain: '$35.0$. The next digit is 8, so the 9 tenths go up to 10 tenths — and 10 tenths is one whole, so 34 becomes 35. The $.0$ stays, because the question asked for 1 decimal place. The next slide shows why that zero matters.',
      explainVn: '$35.0$. Chữ số ngay sau là 8, nên 9 phần mười tăng lên thành 10 phần mười — mà 10 phần mười là một đơn vị, nên 34 thành 35. Phần $.0$ được giữ lại, vì đề bài yêu cầu 1 chữ số thập phân. Slide sau cho thấy vì sao số 0 đó quan trọng.',
      explainFr: '$35.0$. Le chiffre suivant est 8, donc les 9 dixièmes montent à 10 dixièmes — et 10 dixièmes font une unité, donc 34 devient 35. Le $.0$ reste, car la question demandait 1 décimale. La diapo suivante montre pourquoi ce zéro compte.',
    },
  },

  // 11 ─ Keep the zero (CHECK 5) ────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'This one costs marks',
    eyebrowVn: 'Lỗi này mất điểm',
    eyebrowFr: 'Celle-ci coûte des points',
    title: 'Keep the Zero',
    titleVn: 'Giữ lại số 0',
    titleFr: 'Garde le zéro',
    ratio: 40,
    inlineSvg: DIAGRAMS.KEEP_ZERO,
    content: '**35.0** is right. The zero is doing a job: it shows the answer is exact to **1 decimal place**.',
    contentVn: '**35.0** mới đúng. Số 0 đó có nhiệm vụ riêng: nó cho biết đáp án chính xác đến **1 chữ số thập phân**.',
    contentFr: '**35.0** est juste. Le zéro a un rôle : il montre que la réponse est exacte à **1 décimale**.',
    notes: [
      {
        tone: 'write',
        text: 'Never delete a zero at the end of a rounded answer.\n$34.9892$ to 1 d.p. is $35.0$, because $35$ shows no decimal place.',
        textVn: 'Không bao giờ bỏ số 0 ở cuối đáp án đã làm tròn.\n$34.9892$ đến 1 d.p. là $35.0$, vì $35$ không có chữ số thập phân nào.',
        textFr: 'Ne supprime jamais un zéro à la fin d’une réponse arrondie.\n$34.9892$ à 1 d.p. donne $35.0$, car $35$ ne montre aucune décimale.',
      },
    ],
    check: {
      id: 'chk_zero',
      q: 'Round $12.97$ to 1 decimal place.',
      qVn: 'Làm tròn $12.97$ đến 1 chữ số thập phân.',
      qFr: 'Arrondis $12.97$ à 1 décimale.',
      options: [
        { val: 'A', text: '$12.9$', textVn: '$12.9$', textFr: '$12.9$' },
        { val: 'B', text: '$13$', textVn: '$13$', textFr: '$13$' },
        { val: 'C', text: '$13.0$', textVn: '$13.0$', textFr: '$13.0$' },
        { val: 'D', text: '$12.10$', textVn: '$12.10$', textFr: '$12.10$' },
      ],
      correct: 'C',
      expEn: 'The next digit is 7, so the 9 tenths round up to 10 tenths. That carries into the ones: $12.9$ becomes $13.0$. $13$ has dropped the zero — it shows no decimal place. $12.9$ is chopped. $12.10$ writes the whole "10" in one column instead of carrying it.',
      expVn: 'Chữ số ngay sau là 7, nên 9 phần mười làm tròn lên thành 10 phần mười. Phải nhớ sang hàng đơn vị: $12.9$ thành $13.0$. $13$ là bỏ mất số 0 — nó không có chữ số thập phân nào. $12.9$ là cắt cụt. $12.10$ là viết cả "10" vào một cột thay vì nhớ sang.',
      expFr: 'Le chiffre suivant est 7, donc les 9 dixièmes s’arrondissent à 10 dixièmes. On fait une retenue sur les unités : $12.9$ devient $13.0$. $13$ a perdu le zéro — il ne montre aucune décimale. $12.9$ est tronqué. $12.10$ écrit tout le « 10 » dans une seule colonne au lieu de faire la retenue.',
    },
  },

  // 12 ─ Practice, 2 and 3 d.p. (ROUND, keep the zeros) ─────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Two Places, Then Three',
    titleVn: 'Hai chữ số, rồi ba',
    titleFr: 'Deux décimales, puis trois',
    content: 'Round **a** and **b** to 2 d.p. Round **c** and **d** to 3 d.p.\n\n**a** $5.372$\n**b** $0.0961$\n**c** $8.24618$\n**d** $1.99952$\n\nDo **d** below. Work out the other three, then check them.',
    contentVn: 'Làm tròn **a** và **b** đến 2 d.p. Làm tròn **c** và **d** đến 3 d.p.\n\n**a** $5.372$\n**b** $0.0961$\n**c** $8.24618$\n**d** $1.99952$\n\nLàm câu **d** ở bên dưới. Tính ba câu còn lại, rồi kiểm tra.',
    contentFr: 'Arrondis **a** et **b** à 2 d.p. Arrondis **c** et **d** à 3 d.p.\n\n**a** $5.372$\n**b** $0.0961$\n**c** $8.24618$\n**d** $1.99952$\n\nFais **d** ci-dessous. Trouve les trois autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and c',
      labelVn: 'Kiểm tra a, b và c',
      labelFr: 'Vérifie a, b et c',
      answer: '**a** $5.37$\n**b** $0.10$ — keep the zero\n**c** $8.246$',
      answerVn: '**a** $5.37$\n**b** $0.10$ — nhớ giữ số 0\n**c** $8.246$',
      answerFr: '**a** $5.37$\n**b** $0.10$ — garde le zéro\n**c** $8.246$',
    },
    activity: {
      id: 'act_round_3dp',
      type: 'round',
      n: '1.99952',
      to: 3,
      prompt: '**d** Round $1.99952$ to 3 decimal places.',
      promptVn: '**d** Làm tròn $1.99952$ đến 3 chữ số thập phân.',
      promptFr: '**d** Arrondis $1.99952$ à 3 décimales.',
      explain: 'The 4th decimal digit is 5, so the 3rd goes up: 9 becomes 10, which carries, and carries again — $1.999$ becomes $2.000$. All three zeros stay: they are the 3 decimal places.',
      explainVn: 'Chữ số thập phân thứ 4 là 5, nên chữ số thứ 3 tăng lên: 9 thành 10, phải nhớ sang, rồi lại nhớ sang tiếp — $1.999$ thành $2.000$. Cả ba số 0 đều được giữ lại: chúng chính là 3 chữ số thập phân.',
      explainFr: 'La 4e décimale est 5, donc la 3e monte : 9 devient 10, ce qui fait une retenue, puis une autre — $1.999$ devient $2.000$. Les trois zéros restent : ce sont les 3 décimales.',
    },
  },

  // ── STOPPING TOO EARLY ────────────────────────────────────────────────────
  // 13 ─ The vote: 58 ÷ 7 (PREDICT) ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Two Students Disagree',
    titleVn: 'Hai bạn không đồng ý',
    titleFr: 'Deux élèves en désaccord',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Work out $58 ÷ 7$, correct to 3 decimal places.',
    textVn: 'Tính $58 ÷ 7$, chính xác đến 3 chữ số thập phân.',
    textFr: 'Calcule $58 ÷ 7$, arrondi à 3 décimales.',
    sub: 'One student stops dividing at **8.285**. Another goes on to **8.2857**, then rounds.',
    subVn: 'Một bạn dừng chia ở **8.285**. Một bạn khác chia tiếp đến **8.2857**, rồi mới làm tròn.',
    subFr: 'Un élève arrête de diviser à **8.285**. Un autre continue jusqu’à **8.2857**, puis arrondit.',
    activity: {
      id: 'act_vote_divide',
      type: 'predict',
      prompt: 'Who has the right answer?',
      promptVn: 'Bạn nào có đáp án đúng?',
      promptFr: 'Qui a la bonne réponse ?',
      options: [
        { val: 'stop', name: '$8.285$ — stop at 3 places, because the question says 3', nameVn: '$8.285$ — dừng ở 3 chữ số, vì đề bài ghi 3', nameFr: '$8.285$ — s’arrêter à 3 rangs, car la question dit 3' },
        { val: 'further', name: '$8.286$ — go to 4 places, then round', nameVn: '$8.286$ — tính đến 4 chữ số, rồi làm tròn', nameFr: '$8.286$ — aller jusqu’à 4 rangs, puis arrondir' },
        { val: 'both', name: 'Both — they are the same to 3 d.p.', nameVn: 'Cả hai — đến 3 d.p. thì chúng như nhau', nameFr: 'Les deux — c’est pareil à 3 d.p.' },
      ],
      correct: 'further',
      explain: '$8.286$. "Correct to" means **round**, and you cannot round to 3 places until you have seen the 4th. It is 7, so the 5 goes up. $8.285$ is $58 ÷ 7$ **as far as** 3 d.p. — a different instruction. The next slides show how to divide that far.',
      explainVn: '$8.286$. "Correct to" nghĩa là **làm tròn**, và em không thể làm tròn đến 3 chữ số khi chưa thấy chữ số thứ 4. Nó là 7, nên số 5 tăng lên. $8.285$ là $58 ÷ 7$ **as far as** 3 d.p. — một yêu cầu khác. Các slide sau chỉ cho em cách chia đến đó.',
      explainFr: '$8.286$. « Correct to » veut dire **arrondir**, et tu ne peux pas arrondir à 3 rangs avant d’avoir vu le 4e. C’est 7, donc le 5 monte. $8.285$, c’est $58 ÷ 7$ **as far as** 3 d.p. — une autre consigne. Les diapos suivantes montrent comment diviser jusque-là.',
    },
  },

  // ── SHORT DIVISION, THE SHORT WAY (new — not in the classroom deck) ───────
  // 14 ─ Long against short ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Divide',
    eyebrow: 'A quicker way to write it',
    eyebrowVn: 'Một cách viết nhanh hơn',
    eyebrowFr: 'Une façon plus rapide de l’écrire',
    title: 'Short Division',
    titleVn: 'Phép chia ngắn',
    titleFr: 'Division courte',
    inlineSvg: DIAGRAMS.LONG_SHORT,
    caption: 'The same division, **852 ÷ 6**, written twice. The short way writes only the **remainders**.',
    captionVn: 'Cùng một phép chia, **852 ÷ 6**, viết theo hai cách. Cách ngắn chỉ viết các **số dư** (remainder).',
    captionFr: 'La même division, **852 ÷ 6**, écrite deux fois. La méthode courte n’écrit que les **restes** (remainder).',
  },

  // 15 ─ The carry, named (CHECK 6) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Divide',
    side: 'left',
    eyebrow: 'One digit at a time',
    eyebrowVn: 'Từng chữ số một',
    eyebrowFr: 'Un chiffre à la fois',
    title: 'The Remainder Rides',
    titleVn: 'Số dư được nhớ sang',
    titleFr: 'Le reste se reporte',
    ratio: 45,
    inlineSvg: DIAGRAMS.BUS_CARRY,
    content: '6 into 8 is **1**, remainder **2**. The 2 rides on the next digit: read **25**.\n\n6 into 25 is **4**, remainder **1**: read **12**. 6 into 12 is **2**.',
    contentVn: '8 chia 6 được **1**, dư **2**. Số 2 được nhớ sang chữ số tiếp theo: đọc là **25**.\n\n25 chia 6 được **4**, dư **1**: đọc là **12**. 12 chia 6 được **2**.',
    contentFr: '8 divisé par 6 donne **1**, reste **2**. Le 2 se reporte sur le chiffre suivant : lis **25**.\n\n25 divisé par 6 donne **4**, reste **1** : lis **12**. 12 divisé par 6 donne **2**.',
    notes: [
      {
        tone: 'write',
        text: '**Short division:** divide one digit at a time, from the left.\nWrite each **remainder** small, up and to the left of the next digit. Read the two as one number.',
        textVn: '**Phép chia ngắn (short division):** chia từng chữ số một, từ trái sang.\nViết mỗi **số dư** (remainder) thật nhỏ, ở phía trên bên trái của chữ số tiếp theo. Đọc hai số đó thành một số.',
        textFr: '**Division courte (short division) :** divise un chiffre à la fois, en partant de la gauche.\nÉcris chaque **reste** (remainder) en petit, en haut à gauche du chiffre suivant. Lis les deux comme un seul nombre.',
      },
    ],
    check: {
      id: 'chk_carry',
      q: 'In $744 ÷ 3$: 3 into 7 is 2, remainder 1. The 1 rides on the next digit. Which number do you divide next?',
      qVn: 'Trong $744 ÷ 3$: 7 chia 3 được 2, dư 1. Số 1 được nhớ sang chữ số tiếp theo. Em chia số nào tiếp theo?',
      qFr: 'Dans $744 ÷ 3$ : 7 divisé par 3 donne 2, reste 1. Le 1 se reporte sur le chiffre suivant. Quel nombre divises-tu ensuite ?',
      options: [
        { val: 'A', text: '$4$', textVn: '$4$', textFr: '$4$' },
        { val: 'B', text: '$5$', textVn: '$5$', textFr: '$5$' },
        { val: 'C', text: '$41$', textVn: '$41$', textFr: '$41$' },
        { val: 'D', text: '$14$', textVn: '$14$', textFr: '$14$' },
      ],
      correct: 'D',
      expEn: 'The carried 1 sits in front of the 4, and the two are read as one number: **14**. Then 3 into 14 is 4, remainder 2. $4$ forgets the remainder. $5$ adds the 1 to the 4, but the 1 is worth 10 here. $41$ reads them the wrong way round.',
      expVn: 'Số 1 được nhớ đứng trước số 4, và hai số được đọc thành một số: **14**. Rồi 14 chia 3 được 4, dư 2. $4$ là quên mất số dư. $5$ là cộng 1 với 4, nhưng số 1 ở đây có giá trị là 10. $41$ là đọc ngược thứ tự.',
      expFr: 'Le 1 reporté se place devant le 4, et les deux se lisent comme un seul nombre : **14**. Puis 14 divisé par 3 donne 4, reste 2. $4$ oublie le reste. $5$ ajoute le 1 au 4, mais ici le 1 vaut 10. $41$ les lit dans le mauvais ordre.',
    },
  },

  // 16 ─ The digits run out: a point, then zeros ────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Divide',
    eyebrow: 'When the digits run out',
    eyebrowVn: 'Khi hết chữ số',
    eyebrowFr: 'Quand il n’y a plus de chiffres',
    title: 'Add Zeros After the Point',
    titleVn: 'Thêm số 0 sau dấu thập phân',
    titleFr: 'Ajoute des zéros après le point',
    ratio: 45,
    inlineSvg: DIAGRAMS.BUS_ZEROS,
    content: '4 into 2 does not go, so read **27**: 4 into 27 is **6**, remainder **3** — and the digits have run out.\n\nWrite the **point**, add a **zero**, and the 3 rides on it: read **30**. Keep going until the remainder is 0.',
    contentVn: '2 không chia được cho 4, nên đọc là **27**: 27 chia 4 được **6**, dư **3** — và đã hết chữ số.\n\nViết **dấu thập phân**, thêm một **số 0**, và số 3 được nhớ sang nó: đọc là **30**. Cứ tiếp tục cho đến khi số dư bằng 0.',
    contentFr: '2 divisé par 4 ne va pas, alors lis **27** : 27 divisé par 4 donne **6**, reste **3** — et il n’y a plus de chiffres.\n\nÉcris le **point**, ajoute un **zéro**, et le 3 se reporte dessus : lis **30**. Continue jusqu’à ce que le reste soit 0.',
    notes: [
      {
        tone: 'write',
        text: 'No digits left, and the remainder is not 0? Write the point and **add a zero**.\nThe point in the answer goes straight above the point in the number.',
        textVn: 'Hết chữ số mà số dư chưa bằng 0? Viết dấu thập phân và **thêm một số 0**.\nDấu thập phân của đáp án nằm thẳng ngay trên dấu thập phân của số bị chia.',
        textFr: 'Plus de chiffres, et le reste n’est pas 0 ? Écris le point et **ajoute un zéro**.\nLe point de la réponse se place juste au-dessus du point du nombre.',
      },
    ],
  },

  // 17 ─ Practice: exact, with added zeros (BUSSTOP) ────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Until It Stops',
    titleVn: 'Chia đến khi hết dư',
    titleFr: 'Jusqu’à ce que ça s’arrête',
    content: 'Divide the short way. Add zeros after the point until the remainder is 0.\n\n**a** $9 ÷ 2$\n**b** $21 ÷ 4$\n**c** $7 ÷ 8$\n**d** $34 ÷ 5$\n\nDo **c** below. Work out the other three, then check them.',
    contentVn: 'Chia theo cách ngắn. Thêm số 0 sau dấu thập phân cho đến khi số dư bằng 0.\n\n**a** $9 ÷ 2$\n**b** $21 ÷ 4$\n**c** $7 ÷ 8$\n**d** $34 ÷ 5$\n\nLàm câu **c** ở bên dưới. Tính ba câu còn lại, rồi kiểm tra.',
    contentFr: 'Divise par la méthode courte. Ajoute des zéros après le point jusqu’à ce que le reste soit 0.\n\n**a** $9 ÷ 2$\n**b** $21 ÷ 4$\n**c** $7 ÷ 8$\n**d** $34 ÷ 5$\n\nFais **c** ci-dessous. Trouve les trois autres, puis vérifie-les.',
    reveal: {
      label: 'Check a, b and d',
      labelVn: 'Kiểm tra a, b và d',
      labelFr: 'Vérifie a, b et d',
      answer: '**a** $4.5$ — 2 into 9 is 4 remainder 1, then 10 is 5\n**b** $5.25$ — 4 into 21 is 5 remainder 1, then 10 is 2 remainder 2, then 20 is 5\n**d** $6.8$ — 5 into 34 is 6 remainder 4, then 40 is 8',
      answerVn: '**a** $4.5$ — 9 chia 2 được 4 dư 1, rồi 10 chia 2 được 5\n**b** $5.25$ — 21 chia 4 được 5 dư 1, rồi 10 chia 4 được 2 dư 2, rồi 20 chia 4 được 5\n**d** $6.8$ — 34 chia 5 được 6 dư 4, rồi 40 chia 5 được 8',
      answerFr: '**a** $4.5$ — 9 divisé par 2 donne 4 reste 1, puis 10 donne 5\n**b** $5.25$ — 21 divisé par 4 donne 5 reste 1, puis 10 donne 2 reste 2, puis 20 donne 5\n**d** $6.8$ — 34 divisé par 5 donne 6 reste 4, puis 40 donne 8',
    },
    activity: {
      id: 'act_bus_exact',
      type: 'busstop',
      dividend: '7',
      divisor: 8,
      prompt: '**c** Work out $7 ÷ 8$. Add zeros until the remainder is 0.',
      promptVn: '**c** Tính $7 ÷ 8$. Thêm số 0 cho đến khi số dư bằng 0.',
      promptFr: '**c** Calcule $7 ÷ 8$. Ajoute des zéros jusqu’à ce que le reste soit 0.',
      explain: '8 into 7 does not go, so write 0, then the point, and the 7 rides on the first zero: 70. 8 into 70 is 8, remainder 6. 8 into 60 is 7, remainder 4. 8 into 40 is 5, remainder 0. So $7 ÷ 8 = 0.875$.',
      explainVn: '7 không chia được cho 8, nên viết 0, rồi dấu thập phân, và số 7 được nhớ sang số 0 đầu tiên: 70. 70 chia 8 được 8, dư 6. 60 chia 8 được 7, dư 4. 40 chia 8 được 5, dư 0. Vậy $7 ÷ 8 = 0.875$.',
      explainFr: '7 divisé par 8 ne va pas, alors écris 0, puis le point, et le 7 se reporte sur le premier zéro : 70. 70 divisé par 8 donne 8, reste 6. 60 divisé par 8 donne 7, reste 4. 40 divisé par 8 donne 5, reste 0. Donc $7 ÷ 8 = 0.875$.',
    },
  },

  // 18 ─ The vote, settled: 58 ÷ 7 the short way ────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Divide',
    eyebrow: 'Back to the two students',
    eyebrowVn: 'Trở lại với hai bạn',
    eyebrowFr: 'Retour aux deux élèves',
    title: '58 ÷ 7, the Short Way',
    titleVn: '58 ÷ 7, viết theo cách ngắn',
    titleFr: '58 ÷ 7, par la méthode courte',
    inlineSvg: DIAGRAMS.BUS_STOP,
    caption: '**8.286** is right. This remainder never reaches 0, so you stop one place **past** the one you want.',
    captionVn: '**8.286** mới đúng. Số dư này không bao giờ bằng 0, nên em dừng ở một cột **sau** vị trí em cần.',
    captionFr: '**8.286** est juste. Ce reste n’arrive jamais à 0, donc tu t’arrêtes un rang **après** celui que tu veux.',
  },

  // 19 ─ The rule: one place further, then round once (ORDER) ───────────────
  // A showcase, not a split: DIVIDE_STEPS is a wide strip, and beside the
  // activity panel a split's media column shrinks it to nothing. The rule the
  // classroom had in a copy-down note is the caption here.
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'One Place Further',
    titleVn: 'Thêm một cột nữa',
    titleFr: 'Un rang de plus',
    inlineSvg: DIAGRAMS.DIVIDE_STEPS,
    caption: 'To round to **n** places, work the answer out to **n + 1** places first. Then round **once**, and only once.',
    captionVn: 'Muốn làm tròn đến **n** chữ số thập phân, hãy tính đến **n + 1** chữ số trước. Rồi làm tròn **một lần** duy nhất.',
    captionFr: 'Pour arrondir à **n** rangs, calcule d’abord la réponse jusqu’à **n + 1** rangs. Puis arrondis **une fois**, une seule.',
    activity: {
      id: 'act_steps',
      type: 'order',
      prompt: 'A division question says "correct to 2 d.p.". Put the five steps in order.',
      promptVn: 'Một bài chia ghi "correct to 2 d.p.". Hãy sắp xếp năm bước theo thứ tự.',
      promptFr: 'Une question de division dit « correct to 2 d.p. ». Range les cinq étapes dans l’ordre.',
      steps: [
        { id: 'read', name: 'Find the degree of accuracy in the question: 2 decimal places.', nameVn: 'Tìm độ chính xác trong đề bài: 2 chữ số thập phân.', nameFr: 'Trouve le degré de précision dans la question : 2 décimales.' },
        { id: 'divide', name: 'Divide the short way. When the digits run out, write the point and add zeros.', nameVn: 'Chia theo cách ngắn. Khi hết chữ số, viết dấu thập phân và thêm số 0.', nameFr: 'Divise par la méthode courte. Quand il n’y a plus de chiffres, écris le point et ajoute des zéros.' },
        { id: 'stop', name: 'Stop when the answer has 3 decimal places.', nameVn: 'Dừng lại khi đáp án có 3 chữ số thập phân.', nameFr: 'Arrête-toi quand la réponse a 3 décimales.' },
        { id: 'look', name: 'Look at the 3rd decimal place: 5 or more rounds up.', nameVn: 'Nhìn chữ số thập phân thứ 3: từ 5 trở lên thì làm tròn lên.', nameFr: 'Regarde la 3e décimale : 5 ou plus, on arrondit au-dessus.' },
        { id: 'write', name: 'Write the answer with exactly 2 decimal places.', nameVn: 'Viết đáp án với đúng 2 chữ số thập phân.', nameFr: 'Écris la réponse avec exactement 2 décimales.' },
      ],
      explain: 'One place further, then round once. For 2 d.p. you need 3 decimal places before you can decide — and the answer is written with exactly 2, even when the last one is a zero. Stopping at 2 places is **as far as** 2 d.p.: that is why it and **correct to** are different words.',
      explainVn: 'Tính thêm một cột, rồi làm tròn một lần. Với 2 d.p., em cần 3 chữ số thập phân rồi mới quyết định được — và đáp án được viết với đúng 2 chữ số, kể cả khi chữ số cuối là số 0. Dừng ở 2 chữ số là **as far as** 2 d.p.: đó là lý do nó và **correct to** là hai cách nói khác nhau.',
      explainFr: 'Un rang de plus, puis arrondir une fois. Pour 2 d.p., il te faut 3 décimales avant de pouvoir décider — et la réponse s’écrit avec exactement 2, même quand la dernière est un zéro. S’arrêter à 2 rangs, c’est **as far as** 2 d.p. : voilà pourquoi ce n’est pas la même chose que **correct to**.',
    },
  },

  // 20 ─ Practice: divide, then round once (BUSSTOP with dp) ────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    eyebrowFr: 'À toi',
    title: 'Divide, Then Round Once',
    titleVn: 'Chia, rồi làm tròn một lần',
    titleFr: 'Divise, puis arrondis une fois',
    content: 'Work out $23 ÷ 9$, correct to **2 decimal places**.\n\nDecide first: how many zeros will you add?',
    contentVn: 'Tính $23 ÷ 9$, chính xác đến **2 chữ số thập phân**.\n\nQuyết định trước: em sẽ thêm bao nhiêu số 0?',
    contentFr: 'Calcule $23 ÷ 9$, arrondi à **2 décimales**.\n\nDécide d’abord : combien de zéros vas-tu ajouter ?',
    reveal: {
      prompt: 'One more: $40 ÷ 7$, correct to 1 d.p.',
      promptVn: 'Thêm một câu: $40 ÷ 7$, chính xác đến 1 d.p.',
      promptFr: 'Encore une : $40 ÷ 7$, arrondi à 1 d.p.',
      label: 'Check this one',
      labelVn: 'Kiểm tra câu này',
      labelFr: 'Vérifie celle-ci',
      answer: '7 into 40 is 5 remainder 5. Then 50 is 7 remainder 1, and 10 is 1.\n\nThat is $5.71$ to 2 places, so $40 ÷ 7 = 5.7$ correct to 1 d.p.',
      answerVn: '40 chia 7 được 5 dư 5. Rồi 50 chia 7 được 7 dư 1, và 10 chia 7 được 1.\n\nĐến 2 chữ số là $5.71$, nên $40 ÷ 7 = 5.7$ chính xác đến 1 d.p.',
      answerFr: '40 divisé par 7 donne 5 reste 5. Puis 50 donne 7 reste 1, et 10 donne 1.\n\nCela fait $5.71$ à 2 rangs, donc $40 ÷ 7 = 5.7$ arrondi à 1 d.p.',
    },
    activity: {
      id: 'act_bus_round',
      type: 'busstop',
      dividend: '23',
      divisor: 9,
      dp: 2,
      prompt: 'Work out $23 ÷ 9$, correct to 2 decimal places.',
      promptVn: 'Tính $23 ÷ 9$, chính xác đến 2 chữ số thập phân.',
      promptFr: 'Calcule $23 ÷ 9$, arrondi à 2 décimales.',
      explain: '9 into 23 is 2, remainder 5. Then 9 into 50 is 5, remainder 5 — again and again: $2.555...$ Three zeros give three decimal places, and that is enough. The 3rd is 5, so round up: $2.56$.',
      explainVn: '23 chia 9 được 2, dư 5. Rồi 50 chia 9 được 5, dư 5 — cứ lặp lại mãi: $2.555...$ Ba số 0 cho ba chữ số thập phân, và thế là đủ. Chữ số thứ 3 là 5, nên làm tròn lên: $2.56$.',
      explainFr: '23 divisé par 9 donne 2, reste 5. Puis 50 divisé par 9 donne 5, reste 5 — encore et encore : $2.555...$ Trois zéros donnent trois décimales, et ça suffit. La 3e est 5, donc on arrondit au-dessus : $2.56$.',
    },
  },

  // 21 ─ One number, five degrees of accuracy (ROUND, nearest 10) ───────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Layers',
    eyebrow: 'Same number, five answers',
    eyebrowVn: 'Cùng một số, năm đáp án',
    eyebrowFr: 'Même nombre, cinq réponses',
    title: 'How Exact?',
    titleVn: 'Chính xác đến đâu?',
    titleFr: 'Précis à quel point ?',
    content: 'Write $283.4617529$ correct to:\n\n**a** the nearest 10\n**b** the nearest whole number\n**c** 1 d.p.\n**d** 2 d.p.\n**e** 3 d.p.\n\nDo **a** below. Work out the other four, then check them.',
    contentVn: 'Viết $283.4617529$ chính xác đến:\n\n**a** hàng chục gần nhất (the nearest 10)\n**b** số nguyên gần nhất (the nearest whole number)\n**c** 1 d.p.\n**d** 2 d.p.\n**e** 3 d.p.\n\nLàm câu **a** ở bên dưới. Tính bốn câu còn lại, rồi kiểm tra.',
    contentFr: 'Écris $283.4617529$ arrondi :\n\n**a** à la dizaine près (the nearest 10)\n**b** à l’unité près (the nearest whole number)\n**c** à 1 d.p.\n**d** à 2 d.p.\n**e** à 3 d.p.\n\nFais **a** ci-dessous. Trouve les quatre autres, puis vérifie-les.',
    reveal: {
      label: 'Check b, c, d and e',
      labelVn: 'Kiểm tra b, c, d và e',
      labelFr: 'Vérifie b, c, d et e',
      answer: '**b** $283$, **c** $283.5$, **d** $283.46$, **e** $283.462$',
      answerVn: '**b** $283$, **c** $283.5$, **d** $283.46$, **e** $283.462$',
      answerFr: '**b** $283$, **c** $283.5$, **d** $283.46$, **e** $283.462$',
    },
    activity: {
      id: 'act_round_ten',
      type: 'round',
      n: '283.4617529',
      to: -1,
      prompt: '**a** Write $283.4617529$ correct to the nearest 10.',
      promptVn: '**a** Viết $283.4617529$ chính xác đến hàng chục gần nhất.',
      promptFr: '**a** Écris $283.4617529$ à la dizaine près.',
      explain: 'The tens digit is 8 and the next digit is 3 — 4 or less, so the 8 stays: **280**. The ones column still needs a 0 to hold its place, and everything after it goes. The decimals never get a vote.',
      explainVn: 'Chữ số hàng chục là 8 và chữ số ngay sau là 3 — từ 4 trở xuống, nên số 8 giữ nguyên: **280**. Hàng đơn vị vẫn cần một số 0 để giữ chỗ, còn mọi thứ phía sau thì bỏ đi. Phần thập phân không được tính.',
      explainFr: 'Le chiffre des dizaines est 8 et le chiffre suivant est 3 — 4 ou moins, donc le 8 reste : **280**. La colonne des unités a quand même besoin d’un 0 pour tenir sa place, et tout ce qui suit disparaît. Les décimales n’ont pas leur mot à dire.',
    },
  },

  // 22 ─ Find the mistakes (SORT) ───────────────────────────────────────────
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
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nEvery line is wrong, and each one is a different mistake.',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nDòng nào cũng sai, và mỗi dòng là một lỗi khác nhau.',
    contentFr: 'M. Bowen s’est donné **4 sur 4**.\n\nToutes les lignes sont fausses, et chacune est une erreur différente.',
    activity: {
      id: 'act_homework',
      type: 'sort',
      prompt: 'What went wrong in each line?',
      promptVn: 'Mỗi dòng đã sai ở đâu?',
      promptFr: 'Qu’est-ce qui ne va pas dans chaque ligne ?',
      bins: [
        { id: 'carry', name: 'Wrote 10 in one column instead of carrying', nameVn: 'Viết 10 vào một cột thay vì nhớ sang', nameFr: 'A écrit 10 dans une colonne au lieu de faire la retenue' },
        { id: 'twice', name: 'Rounded twice', nameVn: 'Làm tròn hai lần', nameFr: 'A arrondi deux fois' },
        { id: 'zero', name: 'Dropped the zero at the end', nameVn: 'Bỏ mất số 0 ở cuối', nameFr: 'A supprimé le zéro à la fin' },
        { id: 'early', name: 'Stopped dividing too early', nameVn: 'Dừng chia quá sớm', nameFr: 'A arrêté de diviser trop tôt' },
      ],
      cards: [
        { id: 'h1', name: '**a** $9.96$ to 1 d.p. $= 9.10$', nameVn: '**a** $9.96$ đến 1 d.p. $= 9.10$', nameFr: '**a** $9.96$ à 1 d.p. $= 9.10$', bin: 'carry' },
        { id: 'h2', name: '**b** $2.7449$ to 2 d.p. $= 2.75$', nameVn: '**b** $2.7449$ đến 2 d.p. $= 2.75$', nameFr: '**b** $2.7449$ à 2 d.p. $= 2.75$', bin: 'twice' },
        { id: 'h3', name: '**c** $0.302$ to 2 d.p. $= 0.3$', nameVn: '**c** $0.302$ đến 2 d.p. $= 0.3$', nameFr: '**c** $0.302$ à 2 d.p. $= 0.3$', bin: 'zero' },
        { id: 'h4', name: '**d** $20 ÷ 7$ to 2 d.p. $= 2.85$', nameVn: '**d** $20 ÷ 7$ đến 2 d.p. $= 2.85$', nameFr: '**d** $20 ÷ 7$ à 2 d.p. $= 2.85$', bin: 'early' },
      ],
      explain: '**a** 9 tenths go up to 10 tenths, which carries: $10.0$. **b** Only the 3rd decimal decides, and it is 4: $2.74$ — he rounded to $2.745$ first, then again. **c** 2 d.p. needs two digits: $0.30$. **d** $20 ÷ 7 = 2.857...$, so the answer is $2.86$ — he never worked out the 3rd place.',
      explainVn: '**a** 9 phần mười tăng lên thành 10 phần mười, phải nhớ sang: $10.0$. **b** Chỉ chữ số thập phân thứ 3 quyết định, và nó là 4: $2.74$ — thầy làm tròn thành $2.745$ trước, rồi làm tròn tiếp. **c** 2 d.p. cần hai chữ số: $0.30$. **d** $20 ÷ 7 = 2.857...$, nên đáp án là $2.86$ — thầy chưa tính chữ số thứ 3.',
      explainFr: '**a** 9 dixièmes montent à 10 dixièmes, ce qui fait une retenue : $10.0$. **b** Seule la 3e décimale décide, et c’est 4 : $2.74$ — il a d’abord arrondi à $2.745$, puis encore. **c** 2 d.p. demande deux chiffres : $0.30$. **d** $20 ÷ 7 = 2.857...$, donc la réponse est $2.86$ — il n’a jamais calculé le 3e rang.',
    },
  },

  // ── WORD PROBLEMS (deadpan) ───────────────────────────────────────────────
  // 23 ─ A red blood cell (CHECK 7) ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Read it, then work',
    eyebrowVn: 'Đọc kỹ, rồi làm',
    eyebrowFr: 'Lis, puis calcule',
    title: 'A Red Blood Cell',
    titleVn: 'Một tế bào hồng cầu',
    titleFr: 'Un globule rouge',
    content: 'A red blood cell is $0.0065982$ mm long.\n\nWrite this correct to **5 decimal places**.',
    contentVn: 'Một tế bào hồng cầu dài $0.0065982$ mm.\n\nViết số này chính xác đến **5 chữ số thập phân**.',
    contentFr: 'Un globule rouge mesure $0.0065982$ mm de long.\n\nÉcris ce nombre arrondi à **5 décimales**.',
    check: {
      id: 'chk_cell',
      q: 'What is $0.0065982$ mm, correct to 5 decimal places?',
      qVn: '$0.0065982$ mm, chính xác đến 5 chữ số thập phân, là bao nhiêu?',
      qFr: 'Combien font $0.0065982$ mm, arrondis à 5 décimales ?',
      options: [
        { val: 'A', text: '$0.00659$ mm', textVn: '$0.00659$ mm', textFr: '$0.00659$ mm' },
        { val: 'B', text: '$0.00660$ mm', textVn: '$0.00660$ mm', textFr: '$0.00660$ mm' },
        { val: 'C', text: '$0.0066$ mm', textVn: '$0.0066$ mm', textFr: '$0.0066$ mm' },
        { val: 'D', text: '$0.0065$ mm', textVn: '$0.0065$ mm', textFr: '$0.0065$ mm' },
      ],
      correct: 'B',
      expEn: 'The 5th decimal digit is 9 and the next digit is 8, so it goes up: 9 becomes 10, which carries, and $0.00659$ becomes $0.00660$. Keep that last zero — it is the 5th decimal place. $0.00659$ is chopped. $0.0066$ has dropped the zero and shows only 4 places. $0.0065$ counts five digits from the front of the number, not five places after the point.',
      expVn: 'Chữ số thập phân thứ 5 là 9 và chữ số ngay sau là 8, nên nó tăng lên: 9 thành 10, phải nhớ sang, và $0.00659$ thành $0.00660$. Nhớ giữ số 0 cuối cùng — nó là chữ số thập phân thứ 5. $0.00659$ là cắt cụt. $0.0066$ là bỏ mất số 0 và chỉ còn 4 chữ số. $0.0065$ là đếm năm chữ số từ đầu số, không phải năm chữ số sau dấu thập phân.',
      expFr: 'La 5e décimale est 9 et le chiffre suivant est 8, donc elle monte : 9 devient 10, ce qui fait une retenue, et $0.00659$ devient $0.00660$. Garde ce dernier zéro — c’est la 5e décimale. $0.00659$ est tronqué. $0.0066$ a perdu le zéro et ne montre que 4 rangs. $0.0065$ compte cinq chiffres depuis le début du nombre, pas cinq rangs après le point.',
    },
  },

  // 24 ─ The cat and the fish: what rounding hides (CHECK 8) ────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Rounding',
    eyebrowVn: 'Làm tròn',
    eyebrowFr: 'Arrondis',
    title: 'Mr Bowen’s Cat',
    titleVn: 'Con mèo của thầy Bowen',
    titleFr: 'Le chat de M. Bowen',
    content: 'Mr Bowen weighs his cat. It is exactly $4.5$ kg.\n\nThe cat then eats $0.0283$ kg of fish.',
    contentVn: 'Thầy Bowen cân con mèo. Nó nặng đúng $4.5$ kg.\n\nSau đó con mèo ăn $0.0283$ kg cá.',
    contentFr: 'M. Bowen pèse son chat. Il fait exactement $4.5$ kg.\n\nPuis le chat mange $0.0283$ kg de poisson.',
    check: {
      id: 'chk_cat',
      q: 'What is the cat now, correct to 1 decimal place?',
      qVn: 'Bây giờ con mèo nặng bao nhiêu, chính xác đến 1 chữ số thập phân?',
      qFr: 'Combien pèse le chat maintenant, arrondi à 1 décimale ?',
      options: [
        { val: 'A', text: '$4.5$ kg', textVn: '$4.5$ kg', textFr: '$4.5$ kg' },
        { val: 'B', text: '$4.6$ kg', textVn: '$4.6$ kg', textFr: '$4.6$ kg' },
        { val: 'C', text: '$4.53$ kg', textVn: '$4.53$ kg', textFr: '$4.53$ kg' },
        { val: 'D', text: '$4.8$ kg', textVn: '$4.8$ kg', textFr: '$4.8$ kg' },
      ],
      correct: 'A',
      expEn: '$4.5 + 0.0283 = 4.5283$ kg. The digit after the 5 is 2, so it stays: **4.5 kg**. To 1 decimal place, the cat has not changed. The fish has. $4.6$ rounds up just because there are more digits. $4.53$ is 2 decimal places. $4.8$ puts the 283 in the wrong columns ($4.5 + 0.283$).',
      expVn: '$4.5 + 0.0283 = 4.5283$ kg. Chữ số ngay sau số 5 là 2, nên giữ nguyên: **4.5 kg**. Đến 1 chữ số thập phân, con mèo không đổi. Con cá thì có. $4.6$ là làm tròn lên chỉ vì còn chữ số phía sau. $4.53$ là 2 chữ số thập phân. $4.8$ là đặt 283 sai cột ($4.5 + 0.283$).',
      expFr: '$4.5 + 0.0283 = 4.5283$ kg. Le chiffre après le 5 est 2, donc il reste : **4.5 kg**. À 1 décimale près, le chat n’a pas changé. Le poisson, si. $4.6$ arrondit au-dessus juste parce qu’il y a plus de chiffres. $4.53$ a 2 décimales. $4.8$ met le 283 dans les mauvaises colonnes ($4.5 + 0.283$).',
    },
  },

  // 25 ─ Checklist + the exit question (CHECK 9) ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    eyebrowVn: 'Trước khi làm các nhiệm vụ',
    eyebrowFr: 'Avant de commencer les exercices',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu le faire ?',
    content: '> Say each one out loud. If one feels shaky, go back to its slide before the practice.',
    contentVn: '> Nói to từng điều. Nếu điều nào chưa chắc, hãy quay lại slide đó trước khi luyện tập.',
    contentFr: '> Dis chacune à voix haute. Si l’une te paraît fragile, retourne à sa diapo avant les exercices.',
    items: [
      { text: 'Count **decimal places** from the point.', textVn: 'Đếm **chữ số thập phân** từ dấu thập phân.', textFr: 'Compter les **décimales** à partir du point.' },
      { text: 'Round using the **next digit**.', textVn: 'Làm tròn dựa vào **chữ số ngay sau**.', textFr: 'Arrondir avec le **chiffre suivant**.' },
      { text: 'Keep the **zero** at the end of a rounded answer.', textVn: 'Giữ **số 0** ở cuối đáp án đã làm tròn.', textFr: 'Garder le **zéro** à la fin d’une réponse arrondie.' },
      { text: 'Know that **correct to** means round.', textVn: 'Biết **correct to** nghĩa là làm tròn.', textFr: 'Savoir que **correct to** veut dire arrondir.' },
      { text: 'Divide the **short way**, adding zeros after the point.', textVn: 'Chia theo **cách ngắn**, thêm số 0 sau dấu thập phân.', textFr: 'Diviser par la **méthode courte**, en ajoutant des zéros après le point.' },
      { text: 'Work **one place further**, then round once.', textVn: 'Tính **thêm một cột**, rồi làm tròn một lần.', textFr: 'Calculer **un rang de plus**, puis arrondir une fois.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: round $47.681$ to 1 decimal place.',
      qVn: 'Câu hỏi cuối bài: làm tròn $47.681$ đến 1 chữ số thập phân.',
      qFr: 'Question de sortie : arrondis $47.681$ à 1 décimale.',
      options: [
        { val: 'A', text: '$47.6$', textVn: '$47.6$', textFr: '$47.6$' },
        { val: 'B', text: '$48$', textVn: '$48$', textFr: '$48$' },
        { val: 'C', text: '$47.7$', textVn: '$47.7$', textFr: '$47.7$' },
        { val: 'D', text: '$47.68$', textVn: '$47.68$', textFr: '$47.68$' },
      ],
      correct: 'C',
      expEn: 'The digit after the 6 is 8, which is 5 or more, so the 6 goes up: **47.7**. $47.6$ is chopped — it ignores the 8. $48$ is rounded to the nearest whole number. $47.68$ is 2 decimal places.',
      expVn: 'Chữ số ngay sau số 6 là 8, từ 5 trở lên, nên số 6 tăng lên: **47.7**. $47.6$ là cắt cụt — bỏ qua số 8. $48$ là làm tròn đến số nguyên gần nhất. $47.68$ là 2 chữ số thập phân.',
      expFr: 'Le chiffre après le 6 est 8, c’est 5 ou plus, donc le 6 monte : **47.7**. $47.6$ est tronqué — il oublie le 8. $48$ est arrondi à l’unité. $47.68$ a 2 décimales.',
    },
  },
];
