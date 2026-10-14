// src/data/Y7_SCI/U02_8/notes.js
// 2.8 Acids and Bases — the self-study deck, reduced from the classroom lesson
// content/y7-science/U02_8 to docs/y7-science/unit2-close-engines.md and
// particle-engines.md §4. 27 layout slides; 17 scored items — 7 checks and 10
// activities of five types (sort · predict · hotspot · ph ×4 · order).
//
// THE SPINE IS THE CLASSROOM'S. One question is asked on slide 3 and carried:
// two clear glasses — lemon juice and soapy water — and no tasting allowed.
// Acids, bases and the corrosive symbol come first, so the ban has teeth; the
// indicator then arrives as the answer (slides 9–12), and the student settles
// the two glasses with litmus themselves on slide 12. Then the pH scale, the
// vote that both ends burn, and neutralisation, done drop by drop.
//
// There are no Learner's Book pages for 2.8 (Unit 2 of the book ends at 2.7);
// the "book questions" are the deck's own Questions 1–6.
//
// WHAT THE ROOM DID, AND WHAT THE STUDENT DOES HERE
//  · The paper starter (three sour foods) → the `sort` on slide 2.
//  · "So what is left?" and "Mr Bowen ate too much" (ask-first slides) and the
//    hand vote (pH 1 or pH 13) → `predict` blocks, each answered on the next
//    slide. The ANS_A / ANS_B vote cards are dropped.
//  · The real litmus photos → a `hotspot` on the LITMUS_RULE drawing.
//  · The two glasses, closed with litmus → a `ph` litmus activity (slide 12).
//  · The PhDipper widget stays (slide 16); the student then places three of
//    its liquids on the scale (`ph` place, slide 17).
//  · The Draw This slides (the scale, the three beakers) stay as diagrams,
//    without the badge; the neutralising one becomes a `ph` drops activity.
//  · Questions 1–6 → Q5 and Q6 as checks where they belong (the scale, everyday
//    neutralising), Q1–4 in a reveal, and Q1 again as a `ph` colour activity
//    on a slide of its own.
//  · Acid Snap (a room game) → an `order` activity on its own cards.
//  · Homework (hunt your kitchen) → one optional line on the checklist. The
//    "Lesson Complete" exit hero → the checklist's final check (toothpaste).
//  · The seven write panels stay as Key word cards — badge renamed, so no card
//    tells a student alone with a tablet to copy anything.
//  · "Mr Bowen" stays: the self-study student has the same teacher, so the two
//    glasses and the noodles remain his story, told so it works without him.
//
// House notes: bilingual everywhere; a slide's `check:` or `activity:` is its
// LAST key and no slide carries both; activity items use name/explain, never
// text. A `ph` activity sits in the footer under its slide (Notes keeps it out
// of the side column), so it rides on a showcase, whose picture shrinks to make
// room; a statement's big text or a callout would have to scroll.
// Every photograph is openly licensed and credited in docs/y7-science/plans/U02_8.md.
import { DIAGRAMS } from './diagrams.js';
import { PhDipper } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_8/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const RED = '#c8102e';
const ACID = '#c0392b';
const ALKALI = '#2c6fbb';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textVn, textFr) => ({ tone: 'write', badge: 'Key word', badgeVn: 'Từ khóa', badgeFr: 'Mot clé', icon: 'BookOpen', text, textVn, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 2 · 2.8',
    eyebrowVn: 'Chương 2 · 2.8',
    eyebrowFr: 'Unité 2 · 2.8',
    title: 'Acids & Bases',
    titleVn: 'Axit & Bazơ',
    titleFr: 'Acides & bases',
    objective: 'Name acids and bases you meet every day; test a liquid with an indicator — litmus and universal indicator; read the pH scale and say whether a liquid is acid, neutral or alkali; explain what neutralisation does and where it is used.',
    objectiveVn: 'Kể tên các axit và bazơ em gặp hằng ngày; thử một chất lỏng bằng chất chỉ thị — giấy quỳ và chất chỉ thị vạn năng; đọc thang pH và nói một chất lỏng là axit, trung tính hay kiềm; giải thích sự trung hòa làm gì và được dùng ở đâu.',
    objectiveFr: 'Nommer des acides et des bases que tu rencontres chaque jour ; tester un liquide avec un indicateur — le tournesol et l’indicateur universel ; lire l’échelle de pH et dire si un liquide est acide, neutre ou alcalin ; expliquer ce que fait la neutralisation et où on l’utilise.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'You will **sort**, **predict**, **dip litmus paper**, put liquids on the **pH scale** and **neutralise** an acid drop by drop. **17 things are scored** — the first is on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán**, **nhúng giấy quỳ**, đặt các chất lỏng lên **thang pH** và **trung hòa** một axit từng giọt một. **17 mục được tính điểm** — mục đầu tiên ở slide sau.',
      textFr: 'Tu vas **trier**, **prédire**, **tremper du papier tournesol**, placer des liquides sur l’**échelle de pH** et **neutraliser** un acide goutte à goutte. **17 activités sont notées** — la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: SORT — sour or not? ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Droplet',
    eyebrow: 'Start here',
    eyebrowVn: 'Bắt đầu',
    eyebrowFr: 'Pour commencer',
    title: 'Sour or Not?',
    titleVn: 'Chua hay không?',
    titleFr: 'Aigre ou pas ?',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelFr: 'Trie',
    labelIcon: 'Sparkles',
    text: 'You know the taste of **sour** already: chanh, me, khế.',
    textVn: 'Em đã biết vị **chua** rồi: chanh, me, khế.',
    textFr: 'Tu connais déjà le goût **aigre** : chanh, me, khế.',
    sub: 'Eight foods. Which ones taste sour?',
    subVn: 'Tám món. Món nào có vị chua?',
    subFr: 'Huit aliments. Lesquels ont un goût aigre ?',
    activity: {
      id: 'act_sour',
      type: 'sort',
      prompt: 'Sort the eight: sour, or not sour?',
      promptVn: 'Sắp xếp tám món: chua, hay không chua?',
      promptFr: 'Trie les huit : aigre, ou pas aigre ?',
      bins: [
        { id: 'sour', name: 'Sour', nameVn: 'Chua', nameFr: 'Aigre' },
        { id: 'not', name: 'Not sour', nameVn: 'Không chua', nameFr: 'Pas aigre' },
      ],
      cards: [
        { id: 'lemon', name: 'lemon', nameVn: 'chanh', nameFr: 'citron', bin: 'sour' },
        { id: 'tamarind', name: 'tamarind', nameVn: 'me', nameFr: 'tamarin', bin: 'sour' },
        { id: 'starfruit', name: 'star fruit', nameVn: 'khế', nameFr: 'carambole', bin: 'sour' },
        { id: 'mango', name: 'green mango', nameVn: 'xoài xanh', nameFr: 'mangue verte', bin: 'sour' },
        { id: 'vinegar', name: 'vinegar', nameVn: 'giấm', nameFr: 'vinaigre', bin: 'sour' },
        { id: 'sugar', name: 'sugar', nameVn: 'đường', nameFr: 'sucre', bin: 'not' },
        { id: 'salt', name: 'salt', nameVn: 'muối', nameFr: 'sel', bin: 'not' },
        { id: 'water', name: 'plain water', nameVn: 'nước lọc', nameFr: 'eau plate', bin: 'not' },
      ],
      explain: '**Sour:** lemon, tamarind, star fruit, green mango and vinegar. Every one of them has an **acid** in it — that sour taste is the clue. Sugar is sweet, salt is salty, and plain water has no taste at all.',
      explainVn: '**Chua:** chanh, me, khế, xoài xanh và giấm. Mỗi thứ đều có **axit** trong đó — vị chua chính là dấu hiệu. Đường thì ngọt, muối thì mặn, còn nước lọc không có vị gì.',
      explainFr: '**Aigres :** le citron, le tamarin, la carambole, la mangue verte et le vinaigre. Chacun contient un **acide** — ce goût aigre, c’est l’indice. Le sucre est sucré, le sel est salé, et l’eau plate n’a aucun goût.',
    },
  },

  // 3 ─ The question the whole lesson answers ─────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think · keep this question',
    eyebrowVn: 'Suy nghĩ · giữ câu hỏi này',
    eyebrowFr: 'Réfléchis · garde cette question en tête',
    title: 'Two Clear Liquids',
    titleVn: 'Hai ly nước trong',
    titleFr: 'Deux liquides transparents',
    text: 'Mr Bowen pours two glasses. One is **lemon juice**. One is **soapy water**. Both are clear.',
    textVn: 'Thầy Bowen rót hai ly. Một ly là **nước chanh**. Một ly là **nước xà phòng**. Cả hai đều trong.',
    textFr: 'M. Bowen remplit deux verres. L’un contient du **jus de citron**. L’autre de l’**eau savonneuse**. Les deux sont transparents.',
    sub: 'They look **the same**. How can you tell them apart — with **no tasting**? The answer is coming.',
    subVn: 'Chúng trông **giống hệt nhau**. Làm sao phân biệt được — mà **không được nếm**? Câu trả lời sẽ đến sau.',
    subFr: 'Ils se ressemblent **exactement**. Comment les distinguer — **sans goûter** ? La réponse arrive.',
  },

  // 4 ─ Sour means acid ───────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplet',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Sour Means Acid',
    titleVn: 'Chua nghĩa là axit',
    titleFr: 'Aigre veut dire acide',
    ratio: 45,
    image: img('lemon.jpg'),
    content: 'You have eaten acid all your life. But **never taste anything in the lab**.',
    contentVn: 'Em đã ăn axit cả đời rồi. Nhưng **đừng bao giờ nếm thứ gì trong phòng thí nghiệm**.',
    contentFr: 'Tu manges de l’acide depuis toujours. Mais **ne goûte jamais rien au labo**.',
    notes: [
      keyWord(
        '**Acid:** a substance that tastes sour. A strong acid can burn your skin.',
        '**Axit (acid):** chất có vị chua. Axit mạnh có thể làm bỏng da.',
        '**Acide (acid) :** une substance au goût aigre. Un acide fort peut brûler la peau.',
      ),
    ],
  },

  // 5 ─ Six acids + CHECK ────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ACID,
    icon: 'Boxes',
    eyebrow: 'Six you already know',
    eyebrowVn: 'Sáu thứ em đã biết',
    eyebrowFr: 'Six que tu connais déjà',
    title: 'Acids Around You',
    titleVn: 'Axit quanh em',
    titleFr: 'Les acides autour de toi',
    inlineSvg: DIAGRAMS.ACIDS_ROUND,
    caption: 'Four of these you can taste. Two you must **never** taste.',
    captionVn: 'Bốn thứ em có thể nếm. Hai thứ em **không bao giờ** được nếm.',
    captionFr: 'Tu peux en goûter quatre. Deux, il ne faut **jamais** les goûter.',
    check: {
      id: 'chk_never_taste',
      q: 'All six are acids. Which TWO must you never taste?',
      qVn: 'Cả sáu đều là axit. HAI thứ nào em không bao giờ được nếm?',
      qFr: 'Les six sont des acides. Lesquels ne faut-il JAMAIS goûter ?',
      options: [
        { val: 'A', text: 'Lemons and vinegar', textVn: 'Chanh và giấm', textFr: 'Les citrons et le vinaigre' },
        { val: 'B', text: 'Tamarind and fizzy drinks', textVn: 'Me và nước có ga', textFr: 'Le tamarin et les boissons gazeuses' },
        { val: 'C', text: 'The acid inside your stomach and a car battery', textVn: 'Axit trong dạ dày và ắc quy ô tô', textFr: 'L’acide de ton estomac et une batterie de voiture' },
        { val: 'D', text: 'Vinegar and tamarind', textVn: 'Giấm và me', textFr: 'Le vinaigre et le tamarin' },
      ],
      correct: 'C',
      expEn: '**Stomach acid and car battery acid** are strong acids — they can burn. The other four are food: lemons, vinegar, fizzy drinks and tamarind are acids too, but weak enough to eat. A, B and D each name only foods.',
      expVn: '**Axit dạ dày và axit ắc quy** là axit mạnh — chúng có thể gây bỏng. Bốn thứ kia là đồ ăn: chanh, giấm, nước có ga và me cũng là axit, nhưng đủ yếu để ăn được. A, B và D chỉ gồm đồ ăn.',
      expFr: '**L’acide de l’estomac et l’acide de batterie de voiture** sont des acides forts — ils peuvent brûler. Les quatre autres sont des aliments : les citrons, le vinaigre, les boissons gazeuses et le tamarin sont aussi des acides, mais assez faibles pour être mangés. A, B et D ne nomment que des aliments.',
    },
  },

  // 6 ─ The opposite family + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplets',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'The Opposite Family',
    titleVn: 'Nhóm chất đối lập',
    titleFr: 'La famille opposée',
    ratio: 45,
    image: img('soap.jpg'),
    content: 'Rub soap between wet fingers. That **slippery** feeling is the clue.\n\nThe exam word is **alkali** — a base that has dissolved in water.',
    contentVn: 'Xoa xà phòng giữa hai ngón tay ướt. Cảm giác **trơn** đó là dấu hiệu.\n\nTừ dùng trong bài thi là **kiềm (alkali)** — một bazơ đã tan trong nước.',
    contentFr: 'Frotte du savon entre tes doigts mouillés. Ça **glisse** : c’est l’indice.\n\nLe mot de l’examen est **alcali (alkali)** — une base qui s’est dissoute dans l’eau.',
    notes: [
      keyWord(
        '**Base:** the chemical opposite of an acid.\n**Alkali:** a base that dissolves in water.',
        '**Bazơ (base):** chất đối lập hóa học của axit.\n**Kiềm (alkali):** bazơ tan được trong nước.',
        '**Base (base) :** le contraire chimique d’un acide.\n**Alcali (alkali) :** une base qui se dissout dans l’eau.',
      ),
    ],
    check: {
      id: 'chk_alkali',
      q: 'Soapy water is an alkali. What is an alkali?',
      qVn: 'Nước xà phòng là kiềm. Kiềm là gì?',
      qFr: 'L’eau savonneuse est un alcali. Qu’est-ce qu’un alcali ?',
      options: [
        { val: 'A', text: 'An acid that is not sour', textVn: 'Một axit không chua', textFr: 'Un acide qui n’est pas aigre' },
        { val: 'B', text: 'A base that dissolves in water', textVn: 'Một bazơ tan được trong nước', textFr: 'Une base qui se dissout dans l’eau' },
        { val: 'C', text: 'Any liquid that is clear', textVn: 'Bất kỳ chất lỏng nào trong suốt', textFr: 'N’importe quel liquide transparent' },
        { val: 'D', text: 'A base that never dissolves', textVn: 'Một bazơ không bao giờ tan', textFr: 'Une base qui ne se dissout jamais' },
      ],
      correct: 'B',
      expEn: 'An **alkali** is a base that dissolves in water. A base is the opposite of an acid, so it is not a kind of acid (A). Clear tells you nothing — lemon juice is clear too (C) — and an alkali is exactly the base that DOES dissolve (D).',
      expVn: '**Kiềm** là bazơ tan được trong nước. Bazơ là chất đối lập với axit, nên nó không phải một loại axit (A). Trong suốt không cho biết gì — nước chanh cũng trong (C) — và kiềm chính là bazơ CÓ tan (D).',
      expFr: 'Un **alcali** est une base qui se dissout dans l’eau. Une base est le contraire d’un acide, donc ce n’est pas une sorte d’acide (A). Transparent ne dit rien — le jus de citron aussi est transparent (C) — et un alcali, c’est justement la base qui SE dissout (D).',
    },
  },

  // 7 ─ Six bases ─────────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ALKALI,
    icon: 'Boxes',
    eyebrow: 'Six more you already know',
    eyebrowVn: 'Sáu thứ nữa em đã biết',
    eyebrowFr: 'Six autres que tu connais déjà',
    title: 'Bases Around You',
    titleVn: 'Bazơ quanh em',
    titleFr: 'Les bases autour de toi',
    inlineSvg: DIAGRAMS.BASES_ROUND,
    caption: 'You wash with them, brush with them — and one of them cleans an oven.',
    captionVn: 'Em dùng chúng để rửa, để đánh răng — và một thứ dùng để lau lò nướng.',
    captionFr: 'Tu te laves avec, tu te brosses les dents avec — et l’une d’elles nettoie un four.',
  },

  // 8 ─ The corrosive symbol + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Key word · lab safety',
    eyebrowVn: 'Từ khóa · an toàn phòng thí nghiệm',
    eyebrowFr: 'Mot clé · sécurité au labo',
    title: 'This Symbol Means Stop',
    titleVn: 'Kí hiệu này nghĩa là dừng lại',
    titleFr: 'Ce symbole veut dire stop',
    ratio: 50,
    image: img('corrosive.jpg'),
    content: 'You will see it on bottles in a school lab — and on oven cleaner at home. It is why tasting is banned.',
    contentVn: 'Em sẽ thấy nó trên các chai lọ trong phòng thí nghiệm ở trường — và trên chai nước tẩy lò ở nhà. Đó là lý do không được nếm.',
    contentFr: 'Tu le verras sur des flacons au labo de l’école — et sur le décape-four à la maison. C’est pour ça qu’il est interdit de goûter.',
    notes: [
      keyWord(
        '**Corrosive:** it attacks skin, eyes and clothes.\nWear eye protection. Never taste. Wash a spill off at once.',
        '**Ăn mòn (corrosive):** chất làm hỏng da, mắt và quần áo.\nĐeo kính bảo hộ. Không bao giờ nếm. Nếu bị đổ ra người, rửa ngay.',
        '**Corrosif (corrosive) :** il attaque la peau, les yeux et les vêtements.\nPorte des lunettes de protection. Ne goûte jamais. Si ça coule sur toi, rince tout de suite.',
      ),
    ],
    check: {
      id: 'chk_corrosive_spill',
      q: 'A drop from a bottle with this symbol lands on your hand. What do you do?',
      qVn: 'Một giọt từ chai có kí hiệu này rơi lên tay em. Em làm gì?',
      qFr: 'Une goutte d’un flacon avec ce symbole tombe sur ta main. Que fais-tu ?',
      options: [
        { val: 'A', text: 'Wipe it on your clothes', textVn: 'Lau nó vào quần áo', textFr: 'L’essuyer sur tes vêtements' },
        { val: 'B', text: 'Leave it to dry', textVn: 'Để nó tự khô', textFr: 'La laisser sécher' },
        { val: 'C', text: 'Taste a little to see if it is an acid', textVn: 'Nếm một chút xem có phải axit không', textFr: 'En goûter un peu pour voir si c’est un acide' },
        { val: 'D', text: 'Wash it off with water at once', textVn: 'Rửa sạch bằng nước ngay lập tức', textFr: 'La rincer à l’eau tout de suite' },
      ],
      correct: 'D',
      expEn: '**Wash it off at once.** A corrosive keeps attacking skin while it is on it. Wiping it on your clothes (A) spreads it — it attacks clothes too; leaving it (B) lets it burn; and you never taste anything in the lab (C).',
      expVn: '**Rửa sạch ngay.** Chất ăn mòn tiếp tục làm hỏng da khi còn dính trên da. Lau vào quần áo (A) làm nó lan ra — nó cũng làm hỏng quần áo; để yên (B) thì nó làm bỏng; và không bao giờ nếm thứ gì trong phòng thí nghiệm (C).',
      expFr: '**Rince-la tout de suite.** Un produit corrosif continue d’attaquer la peau tant qu’il reste dessus. L’essuyer sur tes vêtements (A) l’étale — il attaque aussi les vêtements ; la laisser (B) la laisse brûler ; et on ne goûte jamais rien au labo (C).',
    },
  },

  // 9 ─ PREDICT: so what is left? ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Back to the two glasses · predict first',
    eyebrowVn: 'Quay lại hai ly nước · dự đoán trước',
    eyebrowFr: 'Retour aux deux verres · prédis d’abord',
    title: 'So What Is Left?',
    titleVn: 'Vậy còn cách nào?',
    titleFr: 'Alors, que reste-t-il ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'You cannot see the difference. You must not taste it.',
    textVn: 'Em không nhìn ra khác biệt. Em cũng không được nếm.',
    textFr: 'Tu ne vois pas la différence. Tu ne dois pas goûter.',
    sub: 'What else could tell you which glass is which?',
    subVn: 'Còn thứ gì có thể cho em biết ly nào là ly nào?',
    subFr: 'Quoi d’autre pourrait te dire quel verre est lequel ?',
    activity: {
      id: 'act_predict_left',
      type: 'predict',
      prompt: 'Two clear liquids, no tasting. What could tell them apart?',
      promptVn: 'Hai chất lỏng trong suốt, không được nếm. Điều gì có thể phân biệt chúng?',
      promptFr: 'Deux liquides transparents, sans goûter. Qu’est-ce qui pourrait les distinguer ?',
      options: [
        { val: 'look', name: 'Look at them very closely', nameVn: 'Nhìn thật kỹ', nameFr: 'Les regarder de très près' },
        { val: 'touch', name: 'Dip a finger in each one', nameVn: 'Nhúng ngón tay vào từng ly', nameFr: 'Tremper un doigt dans chacun' },
        { val: 'colour', name: 'Add something that changes colour', nameVn: 'Thêm một chất biết đổi màu', nameFr: 'Ajouter quelque chose qui change de couleur' },
        { val: 'smell', name: 'Smell them', nameVn: 'Ngửi chúng', nameFr: 'Les sentir' },
      ],
      correct: 'colour',
      explain: '**Something that changes colour — an indicator.** Looking cannot tell two clear liquids apart, and touching or sniffing an unknown liquid in a lab is never safe: it could be corrosive. The next slide shows the indicator.',
      explainVn: '**Một chất biết đổi màu — chất chỉ thị.** Nhìn thì không phân biệt được hai chất lỏng trong suốt, còn chạm hay ngửi một chất lỏng lạ trong phòng thí nghiệm thì không bao giờ an toàn: nó có thể ăn mòn. Slide sau cho thấy chất chỉ thị.',
      explainFr: '**Quelque chose qui change de couleur — un indicateur.** Regarder ne permet pas de distinguer deux liquides transparents, et toucher ou sentir un liquide inconnu au labo n’est jamais sans danger : il pourrait être corrosif. La diapo suivante montre l’indicateur.',
    },
  },

  // 10 ─ The answer: an indicator ────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Key words · the answer to your prediction',
    eyebrowVn: 'Từ khóa · đáp án cho dự đoán của em',
    eyebrowFr: 'Mots clés · la réponse à ta prédiction',
    title: 'Use an Indicator',
    titleVn: 'Dùng chất chỉ thị',
    titleFr: 'Utilise un indicateur',
    ratio: 40,
    inlineSvg: DIAGRAMS.LITMUS_RULE,
    content: 'One dip, and the colour answers for you. Only the wet end changes.',
    contentVn: 'Một lần nhúng, và màu sắc trả lời thay em. Chỉ đầu bị ướt đổi màu.',
    contentFr: 'On trempe une fois, et la couleur répond pour toi. Seul le bout mouillé change.',
    notes: [
      keyWord(
        '**Indicator:** a substance that changes colour to show an acid or an alkali.\n**Litmus:** the simplest indicator. It comes as red paper and blue paper.',
        '**Chất chỉ thị (indicator):** chất đổi màu để cho biết đó là axit hay kiềm.\n**Quỳ (litmus):** chất chỉ thị đơn giản nhất. Có loại giấy đỏ và giấy xanh.',
        '**Indicateur (indicator) :** une substance qui change de couleur pour montrer un acide ou un alcali.\n**Tournesol (litmus) :** l’indicateur le plus simple. Il existe en papier rouge et en papier bleu.',
      ),
    ],
  },

  // 11 ─ Real litmus + HOTSPOT ────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The drawing, photographed',
    eyebrowVn: 'Hình vẽ, chụp ngoài đời thật',
    eyebrowFr: 'Le dessin, en photo',
    title: 'Real Litmus Paper',
    titleVn: 'Giấy quỳ thật',
    titleFr: 'Du vrai papier tournesol',
    columns: [
      {
        heading: 'Blue paper in an acid',
        headingVn: 'Giấy xanh trong axit',
        headingFr: 'Papier bleu dans un acide',
        accent: ACID,
        image: img('litmus-acid.jpg'),
        caption: 'The wet end went **red**. The dish held hydrochloric acid.',
        captionVn: 'Đầu ướt đã chuyển **đỏ**. Đĩa đựng axit clohiđric.',
        captionFr: 'Le bout mouillé est devenu **rouge**. La coupelle contenait de l’acide chlorhydrique.',
      },
      {
        heading: 'Red paper in an alkali',
        headingVn: 'Giấy đỏ trong kiềm',
        headingFr: 'Papier rouge dans un alcali',
        accent: ALKALI,
        image: img('litmus-base.jpg'),
        caption: 'The wet end went **blue**. The dish held sodium hydroxide, an alkali.',
        captionVn: 'Đầu ướt đã chuyển **xanh**. Đĩa đựng natri hiđroxit, một chất kiềm.',
        captionFr: 'Le bout mouillé est devenu **bleu**. La coupelle contenait de l’hydroxyde de sodium, un alcali.',
      },
    ],
    activity: {
      id: 'act_litmus_spot',
      type: 'hotspot',
      prompt: 'No words now. Tap the paper dipped in an ACID.',
      promptVn: 'Không còn chữ. Chạm vào tờ giấy đã nhúng vào AXIT.',
      promptFr: 'Plus de mots maintenant. Touche le papier trempé dans un ACIDE.',
      svg: DIAGRAMS.LITMUS_RULE,
      viewBox: '0 0 840 620',
      targets: [
        { id: 'blue_dry', x: 160, y: 172, r: 62, name: 'Blue litmus, not dipped yet', nameVn: 'Giấy quỳ xanh, chưa nhúng', nameFr: 'Tournesol bleu, pas encore trempé' },
        { id: 'blue_acid', x: 664, y: 172, r: 62, name: 'Blue litmus with a red wet end', nameVn: 'Giấy quỳ xanh có đầu ướt màu đỏ', nameFr: 'Tournesol bleu au bout mouillé rouge' },
        { id: 'red_dry', x: 160, y: 460, r: 62, name: 'Red litmus, not dipped yet', nameVn: 'Giấy quỳ đỏ, chưa nhúng', nameFr: 'Tournesol rouge, pas encore trempé' },
        { id: 'red_alkali', x: 664, y: 460, r: 62, name: 'Red litmus with a blue wet end', nameVn: 'Giấy quỳ đỏ có đầu ướt màu xanh', nameFr: 'Tournesol rouge au bout mouillé bleu' },
      ],
      correct: 'blue_acid',
      explain: 'The **blue paper with a red wet end**, top right: an acid turns blue litmus red. Bottom right is the alkali — red turned blue.',
      explainVn: '**Tờ giấy xanh có đầu ướt màu đỏ**, trên bên phải: axit làm quỳ xanh chuyển đỏ. Dưới bên phải là kiềm — quỳ đỏ chuyển xanh.',
      explainFr: 'Le **papier bleu au bout mouillé rouge**, en haut à droite : un acide fait devenir rouge le tournesol bleu. En bas à droite, c’est l’alcali — le rouge est devenu bleu.',
    },
  },

  // 12 ─ The two glasses, settled: PH litmus ───────────────────────────────────
  // A showcase, not a statement: a `ph` activity sits in the footer, and a
  // photo shrinks to make room where a statement's big text would scroll.
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'TestTube',
    eyebrow: 'Back to the two glasses · you test them',
    eyebrowVn: 'Quay lại hai ly nước · em tự thử',
    eyebrowFr: 'Retour aux deux verres · à toi de tester',
    title: 'Dip, Don’t Taste',
    titleVn: 'Nhúng, đừng nếm',
    titleFr: 'Trempe, ne goûte pas',
    image: img('soap.jpg'),
    caption: 'Now you have **blue** and **red** litmus paper. One glass is lemon juice; the other is soapy water. Dip both papers into the **soapy water**.',
    captionVn: 'Bây giờ em có giấy quỳ **xanh** và giấy quỳ **đỏ**. Một ly là nước chanh; ly kia là nước xà phòng. Nhúng cả hai tờ giấy vào **nước xà phòng**.',
    captionFr: 'Maintenant, tu as du papier tournesol **bleu** et **rouge**. Un verre contient du jus de citron ; l’autre de l’eau savonneuse. Trempe les deux papiers dans l’**eau savonneuse**.',
    activity: {
      id: 'act_two_glasses',
      type: 'ph',
      ask: 'litmus',
      substance: 'soap',
      show: 'name',
      prompt: 'Soapy water: what does each litmus paper do?',
      promptVn: 'Nước xà phòng: mỗi loại giấy quỳ sẽ thế nào?',
      promptFr: 'L’eau savonneuse : que fait chaque papier tournesol ?',
      explain: 'Soapy water is an **alkali**, so **red litmus turns blue** and blue litmus stays blue. Lemon juice does the opposite: blue litmus turns red. Two dips tell the glasses apart — and nobody tastes anything.',
      explainVn: 'Nước xà phòng là **kiềm**, nên **giấy quỳ đỏ chuyển xanh**, còn giấy quỳ xanh vẫn xanh. Nước chanh thì ngược lại: giấy quỳ xanh chuyển đỏ. Hai lần nhúng là phân biệt được hai ly — mà không ai phải nếm.',
      explainFr: 'L’eau savonneuse est un **alcali**, donc **le tournesol rouge devient bleu** et le tournesol bleu reste bleu. Le jus de citron fait le contraire : le tournesol bleu devient rouge. Deux trempages suffisent pour distinguer les verres — et personne ne goûte rien.',
    },
  },

  // 13 ─ Red cabbage ──────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Leaf',
    eyebrow: 'An indicator from the kitchen',
    eyebrowVn: 'Một chất chỉ thị từ nhà bếp',
    eyebrowFr: 'Un indicateur de la cuisine',
    title: 'Red Cabbage Works Too',
    titleVn: 'Bắp cải tím cũng được',
    titleFr: 'Le chou rouge marche aussi',
    image: img('cabbage.jpg'),
    caption: 'Boil red cabbage and keep the purple water: it changes colour in acids and alkalis, just like litmus. (Ask an adult to help with the boiling.)',
    captionVn: 'Luộc bắp cải tím rồi giữ lại phần nước tím: nó đổi màu trong axit và kiềm, giống hệt giấy quỳ. (Nhờ người lớn giúp khi đun sôi.)',
    captionFr: 'Fais bouillir du chou rouge et garde l’eau violette : elle change de couleur dans les acides et les alcalis, comme le tournesol. (Demande à un adulte de t’aider pour l’ébullition.)',
  },

  // 14 ─ Litmus is not enough + CHECK ─────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Litmus Is Not Enough',
    titleVn: 'Giấy quỳ chưa đủ',
    titleFr: 'Le tournesol ne suffit pas',
    ratio: 60,
    image: img('phrange.jpg'),
    content: 'Litmus says **which family**. It never says **how strong**.',
    contentVn: 'Giấy quỳ chỉ cho biết **thuộc nhóm nào**. Nó không cho biết **mạnh đến đâu**.',
    contentFr: 'Le tournesol dit **quelle famille**. Il ne dit jamais **quelle force**.',
    notes: [
      keyWord(
        '**Universal indicator:** an indicator that gives many colours, not just two.\n**pH scale:** numbers from 1 to 14 that say how strong an acid or an alkali is.\n**Neutral:** not an acid and not a base. Its pH is exactly 7.',
        '**Chất chỉ thị vạn năng (universal indicator):** chất chỉ thị cho nhiều màu, không chỉ hai màu.\n**Thang pH (pH scale):** các số từ 1 đến 14 cho biết axit hay kiềm mạnh đến mức nào.\n**Trung tính (neutral):** không phải axit, cũng không phải bazơ. pH đúng bằng 7.',
        '**Indicateur universel (universal indicator) :** un indicateur qui donne beaucoup de couleurs, pas seulement deux.\n**Échelle de pH (pH scale) :** des nombres de 1 à 14 qui disent la force d’un acide ou d’un alcali.\n**Neutre (neutral) :** ni acide, ni base. Son pH vaut exactement 7.',
      ),
    ],
    check: {
      id: 'chk_universal',
      q: 'What can universal indicator tell you that litmus cannot?',
      qVn: 'Chất chỉ thị vạn năng cho em biết điều gì mà giấy quỳ không cho biết được?',
      qFr: 'Que peut te dire l’indicateur universel que le tournesol ne peut pas ?',
      options: [
        { val: 'A', text: 'How strong an acid or an alkali is', textVn: 'Axit hay kiềm mạnh đến mức nào', textFr: 'La force d’un acide ou d’un alcali' },
        { val: 'B', text: 'Whether the liquid is safe to drink', textVn: 'Chất lỏng có an toàn để uống không', textFr: 'Si le liquide se boit sans danger' },
        { val: 'C', text: 'The name of the liquid', textVn: 'Tên của chất lỏng', textFr: 'Le nom du liquide' },
        { val: 'D', text: 'How hot the liquid is', textVn: 'Chất lỏng nóng đến mức nào', textFr: 'La température du liquide' },
      ],
      correct: 'A',
      expEn: 'Universal indicator gives **many colours**, one for each number on the pH scale, so it shows **how strong**. Litmus has only two colours: acid or alkali. No indicator says a liquid is safe to drink (B), names it (C) or measures its temperature (D).',
      expVn: 'Chất chỉ thị vạn năng cho **nhiều màu**, mỗi màu ứng với một số trên thang pH, nên nó cho biết **mạnh đến mức nào**. Giấy quỳ chỉ có hai màu: axit hoặc kiềm. Không chất chỉ thị nào cho biết chất lỏng uống được (B), gọi tên nó (C) hay đo nhiệt độ của nó (D).',
      expFr: 'L’indicateur universel donne **beaucoup de couleurs**, une pour chaque nombre de l’échelle de pH, donc il montre **la force**. Le tournesol n’a que deux couleurs : acide ou alcali. Aucun indicateur ne dit qu’un liquide se boit sans danger (B), ne lui donne un nom (C) ou ne mesure sa température (D).',
    },
  },

  // 15 ─ The pH scale + CHECK (question 5) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Gauge',
    eyebrow: 'Fourteen numbers, three colours to remember',
    eyebrowVn: 'Mười bốn con số, ba màu cần nhớ',
    eyebrowFr: 'Quatorze nombres, trois couleurs à retenir',
    title: 'The pH Scale',
    titleVn: 'Thang pH',
    titleFr: 'L’échelle de pH',
    inlineSvg: DIAGRAMS.PH_SCALE,
    caption: 'Red is acid, green is neutral, blue and purple are alkali.',
    captionVn: 'Đỏ là axit, xanh lá là trung tính, xanh dương và tím là kiềm.',
    captionFr: 'Le rouge, c’est acide, le vert, c’est neutre, le bleu et le violet, c’est alcalin.',
    check: {
      id: 'chk_q5_litmus',
      q: 'Question 5: litmus cannot tell pH 8 from pH 13. Why not?',
      qVn: 'Câu 5: giấy quỳ không phân biệt được pH 8 với pH 13. Vì sao?',
      qFr: 'Question 5 : le tournesol ne distingue pas pH 8 de pH 13. Pourquoi ?',
      options: [
        { val: 'A', text: 'Both are acids, and litmus only shows alkalis', textVn: 'Cả hai là axit, mà giấy quỳ chỉ cho biết kiềm', textFr: 'Ce sont deux acides, et le tournesol ne montre que les alcalis' },
        { val: 'B', text: 'Both are alkalis: both turn red litmus blue, and litmus has only two colours', textVn: 'Cả hai là kiềm: cả hai làm quỳ đỏ chuyển xanh, mà giấy quỳ chỉ có hai màu', textFr: 'Ce sont deux alcalis : les deux font devenir bleu le tournesol rouge, et le tournesol n’a que deux couleurs' },
        { val: 'C', text: 'pH 13 is too strong for litmus to change', textVn: 'pH 13 quá mạnh nên giấy quỳ không đổi màu', textFr: 'pH 13 est trop fort pour faire changer le tournesol' },
        { val: 'D', text: 'Litmus only works at pH 7', textVn: 'Giấy quỳ chỉ dùng được ở pH 7', textFr: 'Le tournesol ne marche qu’à pH 7' },
      ],
      correct: 'B',
      expEn: 'pH 8 and pH 13 are both **above 7**, so both are alkalis, and both turn red litmus blue. With only two colours, litmus cannot say which is stronger. Universal indicator can: pH 8 is blue-green, pH 13 is purple. A has the family wrong, and C and D are not true — litmus changes at both.',
      expVn: 'pH 8 và pH 13 đều **lớn hơn 7**, nên cả hai là kiềm, và cả hai đều làm quỳ đỏ chuyển xanh. Chỉ có hai màu, giấy quỳ không thể cho biết chất nào mạnh hơn. Chất chỉ thị vạn năng thì được: pH 8 màu xanh ngọc, pH 13 màu tím. A sai nhóm, còn C và D không đúng — giấy quỳ đổi màu ở cả hai.',
      expFr: 'pH 8 et pH 13 sont tous les deux **au-dessus de 7**, donc ce sont deux alcalis, et les deux font devenir bleu le tournesol rouge. Avec seulement deux couleurs, le tournesol ne peut pas dire lequel est le plus fort. L’indicateur universel, si : pH 8 est bleu-vert, pH 13 est violet. A se trompe de famille, et C et D sont faux — le tournesol change pour les deux.',
    },
  },

  // 16 ─ The dipper ───────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Decide before you press',
    eyebrowVn: 'Quyết định trước khi bấm',
    eyebrowFr: 'Décide avant d’appuyer',
    title: 'Dip the Paper',
    titleVn: 'Nhúng giấy chỉ thị',
    titleFr: 'Trempe le papier',
    widget: PhDipper,
    caption: 'Eleven liquids. Say acid, neutral or alkali before you dip — then watch the black box walk across the scale.',
    captionVn: 'Mười một chất lỏng. Nói axit, trung tính hay kiềm trước khi nhúng — rồi nhìn ô viền đen chạy dọc thang pH.',
    captionFr: 'Onze liquides. Dis acide, neutre ou alcalin avant de tremper — puis regarde la case noire avancer sur l’échelle.',
  },

  // 17 ─ PH place: three of the eleven (a showcase, for the footer's room) ────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Remember the dipper',
    eyebrowVn: 'Nhớ lại phần nhúng giấy',
    eyebrowFr: 'Souviens-toi du trempage',
    title: 'Where Do They Go?',
    titleVn: 'Chúng nằm ở đâu?',
    titleFr: 'Où vont-ils ?',
    image: img('phrange.jpg'),
    caption: 'Three of the eleven again — this time without their numbers. Within one of the right number counts.',
    captionVn: 'Ba trong mười một chất đó — lần này không có số. Lệch một số so với đáp án vẫn được tính.',
    captionFr: 'Trois des onze, encore une fois — cette fois sans leur nombre. À un près du bon nombre, c’est juste.',
    activity: {
      id: 'act_place_three',
      type: 'ph',
      ask: 'place',
      substances: ['orange', 'sea', 'oven'],
      within: 1,
      prompt: 'Put orange juice, sea water and oven cleaner on the scale.',
      promptVn: 'Đặt nước cam, nước biển và nước tẩy lò lên thang pH.',
      promptFr: 'Place le jus d’orange, l’eau de mer et le décape-four sur l’échelle.',
      explain: '**Orange juice is pH 4**: an acid, below 7. **Sea water is pH 8**: just above 7, so slightly alkaline — the surprise of the eleven. **Oven cleaner is pH 13**: a strong alkali, near the end of the scale.',
      explainVn: '**Nước cam có pH 4**: axit, nhỏ hơn 7. **Nước biển có pH 8**: chỉ lớn hơn 7 một chút, nên hơi kiềm — điều bất ngờ trong mười một chất. **Nước tẩy lò có pH 13**: kiềm mạnh, gần cuối thang.',
      explainFr: '**Le jus d’orange est à pH 4** : un acide, en dessous de 7. **L’eau de mer est à pH 8** : juste au-dessus de 7, donc légèrement alcaline — la surprise des onze. **Le décape-four est à pH 13** : un alcali fort, près du bout de l’échelle.',
    },
  },

  // 18 ─ PREDICT: the vote — which one burns? ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    eyebrowFr: 'Prédis d’abord',
    title: 'Which One Burns Your Skin?',
    titleVn: 'Cái nào làm bỏng da em?',
    titleFr: 'Lequel brûle ta peau ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'One drop of **pH 1** and one drop of **pH 13** fall on your hand.',
    textVn: 'Một giọt **pH 1** và một giọt **pH 13** rơi lên tay em.',
    textFr: 'Une goutte de **pH 1** et une goutte de **pH 13** tombent sur ta main.',
    sub: 'Which one burns your skin?',
    subVn: 'Giọt nào làm bỏng da em?',
    subFr: 'Laquelle brûle ta peau ?',
    activity: {
      id: 'act_predict_burns',
      type: 'predict',
      prompt: 'pH 1 or pH 13: which one burns your skin?',
      promptVn: 'pH 1 hay pH 13: cái nào làm bỏng da em?',
      promptFr: 'pH 1 ou pH 13 : lequel brûle ta peau ?',
      options: [
        { val: 'acid', name: 'Only pH 1 — acids burn', nameVn: 'Chỉ pH 1 — axit mới gây bỏng', nameFr: 'Seulement pH 1 — les acides brûlent' },
        { val: 'alkali', name: 'Only pH 13', nameVn: 'Chỉ pH 13', nameFr: 'Seulement pH 13' },
        { val: 'both', name: 'Both of them', nameVn: 'Cả hai', nameFr: 'Les deux' },
        { val: 'neither', name: 'Neither — one drop is too small', nameVn: 'Không cái nào — một giọt quá nhỏ', nameFr: 'Aucun — une goutte, c’est trop peu' },
      ],
      correct: 'both',
      explain: '**Both.** pH 1 is a strong acid and pH 13 is a strong alkali — the two ends of the scale — and both are corrosive. Most people pick pH 1, because they were told acids burn. The next slide shows the alkali end.',
      explainVn: '**Cả hai.** pH 1 là axit mạnh và pH 13 là kiềm mạnh — hai đầu của thang — và cả hai đều ăn mòn. Đa số chọn pH 1, vì người ta hay nói axit gây bỏng. Slide sau cho thấy đầu kiềm.',
      explainFr: '**Les deux.** pH 1 est un acide fort et pH 13 un alcali fort — les deux bouts de l’échelle — et les deux sont corrosifs. La plupart des gens choisissent pH 1, parce qu’on leur a dit que les acides brûlent. La diapo suivante montre le bout alcalin.',
    },
  },

  // 19 ─ The answer: both ends ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'The answer to your prediction: both',
    eyebrowVn: 'Đáp án cho dự đoán của em: cả hai',
    eyebrowFr: 'La réponse à ta prédiction : les deux',
    title: 'A Strong Alkali Burns Too',
    titleVn: 'Kiềm mạnh cũng gây bỏng',
    titleFr: 'Un alcali fort brûle aussi',
    inlineSvg: DIAGRAMS.BOTH_ENDS,
    caption: 'Oven cleaner is pH 13. That is why its bottle says **do not touch**.',
    captionVn: 'Nước tẩy lò có pH 13. Vì vậy trên chai mới ghi **không được chạm vào**.',
    captionFr: 'Le décape-four a un pH de 13. C’est pour ça que son flacon dit **ne pas toucher**.',
  },

  // 20 ─ PREDICT: Mr Bowen ate too much ───────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think · predict first',
    eyebrowVn: 'Suy nghĩ · dự đoán trước',
    eyebrowFr: 'Réfléchis · prédis d’abord',
    title: 'Mr Bowen Ate Too Much',
    titleVn: 'Thầy Bowen ăn quá nhiều',
    titleFr: 'M. Bowen a trop mangé',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Two bowls of spicy noodles. Now his stomach has **too much acid**.',
    textVn: 'Hai tô mì cay. Giờ dạ dày thầy **thừa axit**.',
    textFr: 'Deux bols de nouilles épicées. Maintenant, son estomac a **trop d’acide**.',
    sub: 'It hurts. What should he swallow?',
    subVn: 'Đang đau. Thầy nên uống gì?',
    subFr: 'Ça fait mal. Que doit-il avaler ?',
    activity: {
      id: 'act_predict_stomach',
      type: 'predict',
      prompt: 'Too much stomach acid. What should he swallow?',
      promptVn: 'Dạ dày thừa axit. Thầy nên uống gì?',
      promptFr: 'Trop d’acide dans l’estomac. Que doit-il avaler ?',
      options: [
        { val: 'lemon', name: 'A glass of lemon juice', nameVn: 'Một ly nước chanh', nameFr: 'Un verre de jus de citron' },
        { val: 'tablet', name: 'An indigestion tablet', nameVn: 'Một viên thuốc đau dạ dày', nameFr: 'Un comprimé contre les brûlures d’estomac' },
        { val: 'cola', name: 'A cold cola', nameVn: 'Một lon cô-ca lạnh', nameFr: 'Un cola bien frais' },
      ],
      correct: 'tablet',
      explain: '**An indigestion tablet.** It is a **base** — the opposite family — so it cancels out some of the acid. Lemon juice and cola are acids: they would add more acid to the problem. The next slide gives this a name.',
      explainVn: '**Một viên thuốc đau dạ dày.** Nó là **bazơ** — nhóm chất đối lập — nên nó triệt tiêu bớt axit. Nước chanh và cô-ca là axit: chúng chỉ thêm axit vào. Slide sau cho việc này một cái tên.',
      explainFr: '**Un comprimé contre les brûlures d’estomac.** C’est une **base** — la famille opposée — donc il annule une partie de l’acide. Le jus de citron et le cola sont des acides : ils ajouteraient encore de l’acide au problème. La diapo suivante donne un nom à cela.',
    },
  },

  // 21 ─ Neutralisation ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'Key word · the answer to your prediction',
    eyebrowVn: 'Từ khóa · đáp án cho dự đoán của em',
    eyebrowFr: 'Mot clé · la réponse à ta prédiction',
    title: 'Cancel It Out',
    titleVn: 'Triệt tiêu lẫn nhau',
    titleFr: 'Ils s’annulent',
    ratio: 48,
    image: img('antacid.jpg'),
    content: 'The tablet is a **base**. It meets the acid, and the acid stops being an acid.',
    contentVn: 'Viên thuốc là một **bazơ**. Nó gặp axit, và axit không còn là axit nữa.',
    contentFr: 'Le comprimé est une **base**. Il rencontre l’acide, et l’acide n’est plus un acide.',
    notes: [
      keyWord(
        '**Neutralisation:** an acid and a base cancel each other out and make something neutral.',
        '**Sự trung hòa (neutralisation):** axit và bazơ triệt tiêu lẫn nhau, tạo ra chất trung tính.',
        '**Neutralisation (neutralisation) :** un acide et une base s’annulent et donnent quelque chose de neutre.',
      ),
    ],
  },

  // 22 ─ Acid + alkali: PH drops ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Beaker',
    eyebrow: 'Both move towards 7',
    eyebrowVn: 'Cả hai cùng tiến về 7',
    eyebrowFr: 'Les deux vont vers 7',
    title: 'Acid + Alkali',
    titleVn: 'Axit + Kiềm',
    titleFr: 'Acide + alcali',
    inlineSvg: DIAGRAMS.NEUTRALISE,
    caption: 'Neither side wins. They meet in the middle, at 7.',
    captionVn: 'Không bên nào thắng. Chúng gặp nhau ở giữa, tại 7.',
    captionFr: 'Aucun des deux ne gagne. Ils se retrouvent au milieu, à 7.',
    activity: {
      id: 'act_drops_neutral',
      type: 'ph',
      ask: 'drops',
      pH: 3,
      prompt: 'This beaker holds an acid with universal indicator. Add alkali a drop at a time — and stop when it is neutral.',
      promptVn: 'Cốc này đựng axit có chất chỉ thị vạn năng. Nhỏ kiềm từng giọt một — và dừng khi đã trung tính.',
      promptFr: 'Ce bécher contient un acide avec de l’indicateur universel. Ajoute de l’alcali goutte à goutte — et arrête-toi quand c’est neutre.',
      explain: 'It took **4 drops**: pH 3 → 4 → 5 → 6 → 7, from orange through yellow to **green**. Green is neutral, so you stop there. One drop more and the alkali wins: the colour goes blue-green, pH 8.',
      explainVn: 'Cần **4 giọt**: pH 3 → 4 → 5 → 6 → 7, từ cam qua vàng đến **xanh lá**. Xanh lá là trung tính, nên em dừng ở đó. Thêm một giọt nữa thì kiềm thắng: màu chuyển xanh ngọc, pH 8.',
      explainFr: 'Il a fallu **4 gouttes** : pH 3 → 4 → 5 → 6 → 7, de l’orange au jaune puis au **vert**. Le vert, c’est neutre, donc tu t’arrêtes là. Une goutte de plus et l’alcali gagne : la couleur devient bleu-vert, pH 8.',
    },
  },

  // 23 ─ Neutralising every day + CHECK (question 6) ──────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Home',
    eyebrow: 'You have used it already',
    eyebrowVn: 'Em đã dùng nó rồi',
    eyebrowFr: 'Tu l’as déjà utilisée',
    title: 'Neutralising Every Day',
    titleVn: 'Trung hòa mỗi ngày',
    titleFr: 'Neutraliser chaque jour',
    inlineSvg: DIAGRAMS.NEUTRAL_LIFE,
    caption: 'Each one adds the opposite family, on purpose. Farm lime is a white powder — not the fruit.',
    captionVn: 'Mỗi cách đều cố ý thêm nhóm chất đối lập. Vôi bón ruộng là bột trắng — không phải quả chanh.',
    captionFr: 'Chacun ajoute exprès la famille opposée. La chaux agricole est une poudre blanche — rien à voir avec le fruit (lime = citron vert).',
    check: {
      id: 'chk_q6_spill',
      q: 'Question 6: Mr Bowen spills acid on the bench. What should he put on it?',
      qVn: 'Câu 6: Thầy Bowen làm đổ axit ra bàn. Thầy nên đổ gì lên đó?',
      qFr: 'Question 6 : M. Bowen renverse de l’acide sur la paillasse. Que doit-il mettre dessus ?',
      options: [
        { val: 'A', text: 'A base, such as baking soda — it neutralises the acid', textVn: 'Một bazơ, như bột nở — nó trung hòa axit', textFr: 'Une base, comme le bicarbonate de soude — elle neutralise l’acide' },
        { val: 'B', text: 'More acid, to wash it away', textVn: 'Thêm axit, để rửa trôi nó', textFr: 'Encore de l’acide, pour le laver' },
        { val: 'C', text: 'Nothing — acid on a bench is safe', textVn: 'Không gì cả — axit trên bàn thì an toàn', textFr: 'Rien — de l’acide sur une paillasse ne craint rien' },
        { val: 'D', text: 'Lemon juice, because it is natural', textVn: 'Nước chanh, vì nó tự nhiên', textFr: 'Du jus de citron, parce que c’est naturel' },
      ],
      correct: 'A',
      expEn: '**A base.** It neutralises the acid, just as the tablet does in a stomach. More acid (B) makes the spill worse, and so does lemon juice (D) — it is an acid too, natural or not. A spilt acid can be corrosive, so leaving it (C) is never safe.',
      expVn: '**Một bazơ.** Nó trung hòa axit, giống viên thuốc trong dạ dày. Thêm axit (B) làm tệ hơn, nước chanh (D) cũng vậy — nó cũng là axit, dù tự nhiên. Axit bị đổ có thể ăn mòn, nên để yên (C) không bao giờ an toàn.',
      expFr: '**Une base.** Elle neutralise l’acide, comme le comprimé dans l’estomac. Plus d’acide (B) aggrave les choses, tout comme le jus de citron (D) — c’est aussi un acide, naturel ou pas. Un acide renversé peut être corrosif, donc le laisser (C) n’est jamais sans danger.',
    },
  },

  // 24 ─ Questions 1–4 (5 and 6 were scored on slides 15 and 23) ─────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Check yourself · answer in your head, then check',
    eyebrowVn: 'Tự kiểm tra · trả lời trong đầu, rồi kiểm tra',
    eyebrowFr: 'Teste-toi · réponds dans ta tête, puis vérifie',
    title: 'Questions 1–4',
    titleVn: 'Câu hỏi 1–4',
    titleFr: 'Questions 1–4',
    // One literal each, not '…' + '…': the narration reads only the first
    // literal of a concatenation, so questions 3 and 4 went unread.
    content: '> **1.** Vinegar has a pH of 3. Acid, neutral or alkali? **2.** Blue litmus turns red. What was it dipped in?\n> **3.** Which is the stronger acid: pH 2 or pH 5? **4.** Soap has a pH of 10. Name its family.',
    contentVn: '> **1.** Giấm có pH bằng 3. Axit, trung tính hay kiềm? **2.** Giấy quỳ xanh chuyển đỏ. Nó đã được nhúng vào gì?\n> **3.** Axit nào mạnh hơn: pH 2 hay pH 5? **4.** Xà phòng có pH bằng 10. Nó thuộc nhóm nào?',
    contentFr: '> **1.** Le vinaigre a un pH de 3. Acide, neutre ou alcalin ? **2.** Le tournesol bleu devient rouge. Dans quoi l’a-t-on trempé ?\n> **3.** Quel est l’acide le plus fort : pH 2 ou pH 5 ? **4.** Le savon a un pH de 10. Nomme sa famille.',
    reveal: {
      label: 'Check 1–4',
      labelVn: 'Kiểm tra 1–4',
      labelFr: 'Vérifier 1–4',
      answer: '**1.** An acid — 3 is below 7. **2.** An acid. **3.** pH 2: the smaller the number, the stronger the acid. **4.** An alkali — 10 is above 7.',
      answerVn: '**1.** Axit — 3 nhỏ hơn 7. **2.** Một axit. **3.** pH 2: số càng nhỏ, axit càng mạnh. **4.** Kiềm — 10 lớn hơn 7.',
      answerFr: '**1.** Un acide — 3 est en dessous de 7. **2.** Un acide. **3.** pH 2 : plus le nombre est petit, plus l’acide est fort. **4.** Un alcali — 10 est au-dessus de 7.',
    },
  },

  // 25 ─ Question 1 in colour: PH colour (a showcase, for the footer's room) ──
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'Question 1, in colour',
    eyebrowVn: 'Câu 1, bằng màu sắc',
    eyebrowFr: 'Question 1, en couleur',
    title: 'What Colour Is Vinegar?',
    titleVn: 'Giấm có màu gì?',
    titleFr: 'De quelle couleur est le vinaigre ?',
    inlineSvg: DIAGRAMS.ACIDS_ROUND,
    caption: 'Vinegar is one of the six acids. A few drops of universal indicator go into it.',
    captionVn: 'Giấm là một trong sáu axit. Nhỏ vài giọt chất chỉ thị vạn năng vào giấm.',
    captionFr: 'Le vinaigre est l’un des six acides. On y verse quelques gouttes d’indicateur universel.',
    activity: {
      id: 'act_vinegar_colour',
      type: 'ph',
      ask: 'colour',
      substance: 'vinegar',
      prompt: 'Question 1 in colour: which colour does universal indicator turn in vinegar?',
      promptVn: 'Câu 1 bằng màu sắc: chất chỉ thị vạn năng chuyển màu gì trong giấm?',
      promptFr: 'Question 1 en couleur : de quelle couleur devient l’indicateur universel dans le vinaigre ?',
      explain: 'Vinegar is pH 3, so universal indicator turns **orange**: an acid, below 7. Red and orange are acids, green is neutral, blue and purple are alkalis.',
      explainVn: 'Giấm có pH 3, nên chất chỉ thị vạn năng chuyển **cam**: axit, nhỏ hơn 7. Đỏ và cam là axit, xanh lá là trung tính, xanh dương và tím là kiềm.',
      explainFr: 'Le vinaigre est à pH 3, donc l’indicateur universel devient **orange** : un acide, en dessous de 7. Le rouge et l’orange sont des acides, le vert est neutre, le bleu et le violet sont des alcalis.',
    },
  },

  // 26 ─ Acid Snap, in order: ORDER ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'ListChecks',
    eyebrow: 'Acid Snap',
    eyebrowVn: 'Đoán nhanh axit',
    eyebrowFr: 'Acide express',
    title: 'Most Acidic First',
    titleVn: 'Axit nhất đứng trước',
    titleFr: 'Le plus acide d’abord',
    label: 'Order it',
    labelVn: 'Sắp thứ tự',
    labelFr: 'Range',
    labelIcon: 'Sparkles',
    text: 'Five liquids. No numbers.',
    textVn: 'Năm chất lỏng. Không có số.',
    textFr: 'Cinq liquides. Pas de nombres.',
    sub: 'Most acidic at the top.',
    subVn: 'Axit nhất ở trên cùng.',
    subFr: 'Le plus acide en haut.',
    activity: {
      id: 'act_snap_order',
      type: 'order',
      prompt: 'Most acidic first. Put the five in order.',
      promptVn: 'Axit nhất trước. Sắp xếp năm chất theo thứ tự.',
      promptFr: 'Le plus acide d’abord. Range les cinq dans l’ordre.',
      steps: [
        { id: 'battery', name: 'car battery acid', nameVn: 'axit ắc quy ô tô', nameFr: 'acide de batterie de voiture' },
        { id: 'tamarind', name: 'tamarind juice', nameVn: 'nước me', nameFr: 'jus de tamarin' },
        { id: 'tap', name: 'tap water', nameVn: 'nước máy', nameFr: 'eau du robinet' },
        { id: 'toothpaste', name: 'toothpaste', nameVn: 'kem đánh răng', nameFr: 'dentifrice' },
        { id: 'oven', name: 'oven cleaner', nameVn: 'nước tẩy lò', nameFr: 'décape-four' },
      ],
      explain: '**Car battery acid (pH 1) → tamarind (3) → tap water (7) → toothpaste (9) → oven cleaner (13).** The two you must never touch sit at the two ends. The food is a weak acid, tap water is neutral, and toothpaste is a weak base.',
      explainVn: '**Axit ắc quy (pH 1) → nước me (3) → nước máy (7) → kem đánh răng (9) → nước tẩy lò (13).** Hai thứ không bao giờ được chạm vào nằm ở hai đầu. Đồ ăn là axit yếu, nước máy trung tính, còn kem đánh răng là bazơ yếu.',
      explainFr: '**Acide de batterie de voiture (pH 1) → tamarin (3) → eau du robinet (7) → dentifrice (9) → décape-four (13).** Les deux qu’il ne faut jamais toucher sont aux deux bouts. L’aliment est un acide faible, l’eau du robinet est neutre, et le dentifrice est une base faible.',
    },
  },

  // 27 ─ Checklist + the exit question as a CHECK ──────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu le faire ?',
    content: 'Next: the Vocab, then **pH Lab** — new liquids every time. At home, if you like: which kitchen labels say acid, and which alkali?',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Phòng thí nghiệm pH** — mỗi lần là chất lỏng mới. Ở nhà, nếu thích: nhãn chai nào trong bếp là axit, chai nào là kiềm?',
    contentFr: 'Ensuite : le vocabulaire, puis le **Labo pH** — de nouveaux liquides à chaque fois. À la maison, si tu veux : quelles étiquettes de la cuisine disent acide, et lesquelles alcalin ?',
    items: [
      { text: 'Name three **acids** and three **bases**; say why you never taste in the lab.', textVn: 'Kể tên ba **axit** và ba **bazơ**; nói vì sao không nếm trong phòng thí nghiệm.', textFr: 'Nomme trois **acides** et trois **bases** ; dis pourquoi on ne goûte jamais au labo.' },
      { text: 'Use **litmus**: blue turns red in an acid, red turns blue in an alkali.', textVn: 'Dùng **giấy quỳ**: quỳ xanh chuyển đỏ trong axit, quỳ đỏ chuyển xanh trong kiềm.', textFr: 'Utilise le **tournesol** : le bleu devient rouge dans un acide, le rouge devient bleu dans un alcali.' },
      { text: 'Read the **pH scale**: below 7 acid, 7 neutral, above 7 alkali.', textVn: 'Đọc **thang pH**: nhỏ hơn 7 là axit, 7 trung tính, lớn hơn 7 là kiềm.', textFr: 'Lis l’**échelle de pH** : en dessous de 7 acide, 7 neutre, au-dessus de 7 alcalin.' },
      { text: 'Explain what **neutralisation** does, and give a place it is used.', textVn: 'Giải thích **sự trung hòa** làm gì, và nêu một nơi nó được dùng.', textFr: 'Explique ce que fait la **neutralisation**, et donne un endroit où on l’utilise.' },
    ],
    check: {
      id: 'chk_exit_toothpaste',
      q: 'Exit question: toothpaste is pH 9. Why do we brush AFTER eating?',
      qVn: 'Câu hỏi cuối bài: kem đánh răng có pH 9. Tại sao ta đánh răng SAU khi ăn?',
      qFr: 'Question de sortie : le dentifrice est à pH 9. Pourquoi se brosse-t-on les dents APRÈS avoir mangé ?',
      options: [
        { val: 'A', text: 'Toothpaste is an acid, and more acid cleans the teeth', textVn: 'Kem đánh răng là axit, và thêm axit làm sạch răng', textFr: 'Le dentifrice est un acide, et plus d’acide nettoie les dents' },
        { val: 'B', text: 'The acid from food is all gone after a meal', textVn: 'Axit từ thức ăn đã hết sau bữa ăn', textFr: 'L’acide de la nourriture est complètement parti après un repas' },
        { val: 'C', text: 'Food leaves acid on your teeth; toothpaste is a base, so brushing neutralises it', textVn: 'Thức ăn để lại axit trên răng; kem đánh răng là bazơ, nên đánh răng trung hòa axit đó', textFr: 'La nourriture laisse de l’acide sur les dents ; le dentifrice est une base, donc se brosser le neutralise' },
        { val: 'D', text: 'pH 9 is neutral, so it just washes the food away', textVn: 'pH 9 là trung tính, nên nó chỉ rửa trôi thức ăn', textFr: 'pH 9 est neutre, donc il ne fait que rincer la nourriture' },
      ],
      correct: 'C',
      expEn: 'Food leaves **acid** on your teeth. Toothpaste at pH 9 is above 7 — a **base** — so brushing **neutralises** that acid; before a meal there is no acid there yet. Toothpaste is not an acid (A) and not neutral (D), and the acid is not gone after a meal — it is just made (B).',
      expVn: 'Thức ăn để lại **axit** trên răng. Kem đánh răng có pH 9, lớn hơn 7 — là **bazơ** — nên đánh răng **trung hòa** axit đó; trước bữa ăn thì chưa có axit. Kem đánh răng không phải axit (A) và không trung tính (D), và axit không hết sau bữa ăn — nó vừa mới được tạo ra (B).',
      expFr: 'La nourriture laisse de l’**acide** sur tes dents. Le dentifrice à pH 9 est au-dessus de 7 — c’est une **base** — donc se brosser les dents **neutralise** cet acide ; avant un repas, il n’y a pas encore d’acide. Le dentifrice n’est pas un acide (A) ni neutre (D), et l’acide n’est pas parti après un repas — il vient d’être produit (B).',
    },
  },
];
