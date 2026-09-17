// src/data/Y7_SCI/U02_7/notes.js
// 2.7 Compounds and Mixtures — the self-study deck, reduced from the classroom
// lesson content/y7-science/U02_7 to docs/y7-science/particle-engines.md §4.
// 24 layout slides; 18 scored items — 8 checks and 10 activities of five types
// (sort · predict · formula · particles · estimate).
//
// THE SPINE IS THE CLASSROOM'S. The same two elements, iron and sulfur, are
// first only STIRRED (a mixture: a magnet pulls the iron out) and then HEATED
// (a compound: the magnet does nothing). Each result is predicted before it is
// shown. Then the book's two everyday mixtures, air and water.
//
// WHAT THE ROOM DID, AND WHAT THE STUDENT DOES HERE
//  · The paper starter (element or compound, nine names) → the `sort` on
//    slide 2.
//  · The three hand votes (stirred · heated · tap water) → `predict` blocks,
//    each answered on the next slide.
//  · The Draw This of iron and sulfur, mixed then bonded → the diagram stays;
//    the student tests boxes of those particles with a magnet instead.
//  · "What is air? Tell your partner" → classify three boxes of gas.
//  · The room game Mixture or Compound? → `particles` activities: pure or a
//    mixture (slide 22) and find the compounds (slide 23), keeping the game's
//    pairs — salt and sea water, iron sulfide and iron with sulfur stirred.
//  · The book's question slides → a check each, the rest in the `reveal`.
//  · The homework (copy a bottle's label) and the "Lesson Complete" exit hero
//    are gone; the exit question (salt water) is the checklist's check.
//  · The ten "write" panels stay as Key word cards — badge renamed, so no card
//    tells a student alone with a tablet to copy anything.
//
// House notes: bilingual everywhere; a slide's `check:` or `activity:` is its
// LAST key and no slide carries both; formulae in slide text use Unicode
// subscripts, activity `formula`/`boxes` use plain ASCII. Every photograph is
// openly licensed and credited in docs/y7-science/plans/U02_7.md.
import { DIAGRAMS } from './diagrams.js';
import { IronSulfurClip } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_7/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const BLUE = '#1a5fa8';
const RED = '#c8102e';
const GREEN = '#4a8b23';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textVn) => ({ tone: 'write', badge: 'Key word', badgeVn: 'Từ khóa', icon: 'BookOpen', text, textVn });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 2 · 2.7',
    eyebrowVn: 'Chương 2 · 2.7',
    title: 'Compounds & Mixtures',
    titleVn: 'Hợp chất & Hỗn hợp',
    objective: 'Tell a compound from a mixture and explain the difference, using iron and sulfur stirred and then heated; give air, mineral water and tap water as examples of mixtures; say what pure means in science.',
    objectiveVn: 'Phân biệt hợp chất với hỗn hợp và giải thích sự khác nhau, qua sắt và lưu huỳnh được khuấy rồi được đun nóng; nêu không khí, nước khoáng và nước máy là ví dụ về hỗn hợp; nói được "tinh khiết" nghĩa là gì trong khoa học.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **sort**, **predict**, **write a formula** and **test boxes of particles** with a magnet. **18 things are scored** — the first is on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán**, **viết công thức** và **thử các hộp hạt** bằng nam châm. **18 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: SORT — element or compound? ─────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Last lesson: elements and compounds',
    eyebrowVn: 'Bài trước: nguyên tố và hợp chất',
    title: 'Element or Compound?',
    titleVn: 'Nguyên tố hay hợp chất?',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: 'An **element** has one kind of atom. A **compound** has two or more kinds, **bonded** together.',
    textVn: '**Nguyên tố** chỉ có một loại nguyên tử. **Hợp chất** có từ hai loại trở lên, **liên kết** với nhau.',
    sub: 'Nine names and formulae. Sort every one.',
    subVn: 'Chín tên gọi và công thức. Hãy sắp xếp tất cả.',
    activity: {
      id: 'act_el_comp',
      type: 'sort',
      prompt: 'Sort each substance: element or compound?',
      promptVn: 'Sắp xếp từng chất: nguyên tố hay hợp chất?',
      bins: [
        { id: 'element', name: 'Element', nameVn: 'Nguyên tố' },
        { id: 'compound', name: 'Compound', nameVn: 'Hợp chất' },
      ],
      cards: [
        { id: 'nitrogen', name: 'nitrogen', nameVn: 'nitơ (nitrogen)', bin: 'element' },
        { id: 'co2', name: 'carbon dioxide', nameVn: 'cacbon đioxit (carbon dioxide)', bin: 'compound' },
        { id: 'cacl2', name: 'calcium chloride', nameVn: 'canxi clorua (calcium chloride)', bin: 'compound' },
        { id: 'sodium', name: 'sodium', nameVn: 'natri (sodium)', bin: 'element' },
        { id: 'o2', name: 'O₂', nameVn: 'O₂', bin: 'element' },
        { id: 'cao', name: 'CaO', nameVn: 'CaO', bin: 'compound' },
        { id: 'ch4', name: 'CH₄', nameVn: 'CH₄', bin: 'compound' },
        { id: 'h2o', name: 'H₂O', nameVn: 'H₂O', bin: 'compound' },
        { id: 'k', name: 'K', nameVn: 'K', bin: 'element' },
      ],
      explain: '**Elements:** nitrogen, sodium, O₂ and K — one kind of atom each. **Compounds:** carbon dioxide, calcium chloride, CaO, CH₄ and H₂O — two or more kinds, bonded. The trap is **O₂**: two oxygen atoms are still only one kind of atom.',
      explainVn: '**Nguyên tố:** nitơ, natri, O₂ và K — mỗi chất chỉ một loại nguyên tử. **Hợp chất:** cacbon đioxit, canxi clorua, CaO, CH₄ và H₂O — hai loại trở lên, liên kết với nhau. Cái bẫy là **O₂**: hai nguyên tử oxi vẫn chỉ là một loại nguyên tử.',
    },
  },

  // 3 ─ Iron and sulfur + CHECK ─────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Learner’s Book, page 65 · two elements',
    eyebrowVn: 'Sách học sinh, trang 65 · hai nguyên tố',
    title: 'Iron and Sulfur',
    titleVn: 'Sắt và lưu huỳnh',
    columns: [
      {
        heading: 'Iron · magnetic',
        headingVn: 'Sắt · bị nam châm hút',
        accent: BLUE,
        icon: 'Magnet',
        image: img('filings.jpg'),
        caption: 'Iron **filings**: tiny pieces of iron. Grey, and a magnet pulls them.',
        captionVn: '**Mạt sắt** (iron filings): những mẩu sắt rất nhỏ. Màu xám, và nam châm hút được.',
      },
      {
        heading: 'Sulfur · not magnetic',
        headingVn: 'Lưu huỳnh · không bị nam châm hút',
        accent: ORANGE,
        icon: 'Flame',
        image: img('ijen.jpg'),
        caption: 'Yellow sulfur, dug out of a volcano in Indonesia. A magnet does nothing to it.',
        captionVn: 'Lưu huỳnh màu vàng, đào từ một ngọn núi lửa ở Indonesia. Nam châm không hút được nó.',
      },
    ],
    check: {
      id: 'chk_both_elements',
      q: 'Iron is magnetic and sulfur is not. Which of them is an element?',
      qVn: 'Sắt bị nam châm hút còn lưu huỳnh thì không. Chất nào là nguyên tố?',
      options: [
        { val: 'A', text: 'Only iron — elements are metals', textVn: 'Chỉ sắt — nguyên tố là kim loại' },
        { val: 'B', text: 'Only sulfur — it comes from a volcano', textVn: 'Chỉ lưu huỳnh — nó đến từ núi lửa' },
        { val: 'C', text: 'Neither — they are both mixtures', textVn: 'Không chất nào — cả hai đều là hỗn hợp' },
        { val: 'D', text: 'Both — each has only one kind of atom', textVn: 'Cả hai — mỗi chất chỉ có một loại nguyên tử' },
      ],
      correct: 'D',
      expEn: '**Both.** Iron is only iron atoms and sulfur is only sulfur atoms, so each is an element. A is wrong because non-metals such as sulfur and oxygen are elements too; where sulfur is found (B) says nothing about its atoms.',
      expVn: '**Cả hai.** Sắt chỉ gồm nguyên tử sắt và lưu huỳnh chỉ gồm nguyên tử lưu huỳnh, nên mỗi chất là một nguyên tố. A sai vì phi kim như lưu huỳnh và oxi cũng là nguyên tố; nơi tìm thấy lưu huỳnh (B) không cho biết gì về nguyên tử của nó.',
    },
  },

  // 4 ─ PREDICT: stirred ─────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Stir Them Together',
    titleVn: 'Khuấy chúng lại với nhau',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Iron filings and yellow sulfur powder are **stirred** together in a dish.',
    textVn: 'Mạt sắt và bột lưu huỳnh màu vàng được **khuấy** với nhau trong một cái đĩa.',
    sub: 'Then a magnet is held over the dish. Can it pull the iron out?',
    subVn: 'Sau đó người ta đưa nam châm lại gần đĩa. Nam châm có hút sắt ra được không?',
    activity: {
      id: 'act_predict_stirred',
      type: 'predict',
      prompt: 'Iron and sulfur, stirred. Can a magnet pull the iron out?',
      promptVn: 'Sắt và lưu huỳnh, khuấy đều. Nam châm có hút sắt ra được không?',
      options: [
        { val: 'yes', name: 'Yes — the iron is still iron', nameVn: 'Có — sắt vẫn là sắt' },
        { val: 'no', name: 'No — stirring has joined them together', nameVn: 'Không — khuấy đã nối chúng lại với nhau' },
      ],
      correct: 'yes',
      explain: '**Yes.** Stirring only puts the two elements side by side. Nothing is bonded, so the iron is still iron — and iron is magnetic. The next slide shows it.',
      explainVn: '**Có.** Khuấy chỉ đặt hai nguyên tố cạnh nhau. Không có gì liên kết, nên sắt vẫn là sắt — và sắt bị nam châm hút. Slide sau cho thấy điều đó.',
    },
  },

  // 5 ─ The answer: a mixture ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Magnet',
    eyebrow: 'Key words · the answer to your prediction',
    eyebrowVn: 'Từ khóa · đáp án cho dự đoán của em',
    title: 'A Mixture',
    titleVn: 'Một hỗn hợp',
    ratio: 45,
    image: img('magnet.jpg'),
    content:
      '**Yes!** The magnet pulls the iron filings out of the sulfur.\n\n' +
      'The iron is still iron. The sulfur is still sulfur. They are mixed, but **not bonded**.',
    contentVn:
      '**Có!** Nam châm hút mạt sắt ra khỏi lưu huỳnh.\n\n' +
      'Sắt vẫn là sắt. Lưu huỳnh vẫn là lưu huỳnh. Chúng trộn lẫn, nhưng **không liên kết**.',
    notes: [
      keyWord(
        '**Filings:** very small pieces of metal.',
        '**Mạt (filings):** những mẩu kim loại rất nhỏ.',
      ),
      keyWord(
        '**Mixture:** different substances mixed together, but **not bonded**.',
        '**Hỗn hợp (mixture):** các chất khác nhau trộn lẫn với nhau, nhưng **không liên kết**.',
      ),
    ],
  },

  // 6 ─ PREDICT: heated ──────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Flame',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Now Heat Them',
    titleVn: 'Bây giờ đun nóng',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Now the same mixture is **heated** until it glows, then left to cool.',
    textVn: 'Bây giờ chính hỗn hợp đó được **đun nóng** cho đến khi phát sáng, rồi để nguội.',
    sub: 'Can a magnet **still** pull the iron out?',
    subVn: 'Nam châm **vẫn** hút sắt ra được không?',
    activity: {
      id: 'act_predict_heated',
      type: 'predict',
      prompt: 'Iron and sulfur, heated. Can a magnet still pull the iron out?',
      promptVn: 'Sắt và lưu huỳnh, đun nóng. Nam châm vẫn hút sắt ra được không?',
      options: [
        { val: 'yes', name: 'Yes — the iron is still in there', nameVn: 'Có — sắt vẫn còn ở trong đó' },
        { val: 'no', name: 'No — something new has been made', nameVn: 'Không — một chất mới đã được tạo ra' },
      ],
      correct: 'no',
      explain: '**No.** The heat made every iron atom **bond** to a sulfur atom. They are one new substance now, and it is not magnetic. Watch it happen on the next slide.',
      explainVn: '**Không.** Nhiệt làm mỗi nguyên tử sắt **liên kết** với một nguyên tử lưu huỳnh. Bây giờ chúng là một chất mới, và chất đó không bị nam châm hút. Xem điều đó xảy ra ở slide sau.',
    },
  },

  // 7 ─ The video: iron and sulfur heated ────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Flame',
    eyebrow: 'Learner’s Book, page 66 · watch closely',
    eyebrowVn: 'Sách học sinh, trang 66 · xem kỹ nhé',
    title: 'Heating Iron and Sulfur',
    titleVn: 'Đun nóng sắt và lưu huỳnh',
    widget: IronSulfurClip,
    caption: 'The film starts just before the heating; no sound is needed. What colour is it **before**? What colour is it **after**?',
    captionVn: 'Đoạn phim bắt đầu ngay trước khi đun; không cần âm thanh. **Trước** khi đun nó màu gì? **Sau** khi đun nó màu gì?',
  },

  // 8 ─ The answer: iron sulfide + FORMULA ───────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'The answer to your prediction · a new substance',
    eyebrowVn: 'Đáp án cho dự đoán của em · một chất mới',
    title: 'Iron Sulfide',
    titleVn: 'Sắt sunfua',
    ratio: 45,
    image: img('ironsulfide.jpg'),
    content:
      '**No!** The magnet does nothing.\n\n' +
      'The glow was the iron and sulfur **bonding**. The yellow and grey powder is gone. What is left is a **dark grey solid**, the same all through.\n\n' +
      'It is a compound: **iron sulfide**. Its name tells you what is in it — iron, and sulf**ide** for sulfur.',
    contentVn:
      '**Không!** Nam châm không hút được.\n\n' +
      'Ánh sáng phát ra là lúc sắt và lưu huỳnh **liên kết** với nhau. Bột vàng và xám đã biến mất. Thứ còn lại là một **chất rắn màu xám đen**, giống nhau từ trong ra ngoài.\n\n' +
      'Đó là một hợp chất: **sắt sunfua (iron sulfide)**. Tên gọi cho em biết trong đó có gì — sắt, và sulf**ide** là lưu huỳnh.',
    activity: {
      id: 'act_formula_fes',
      type: 'formula',
      ask: 'write',
      formula: 'FeS',
      prompt: 'This is one particle of iron sulfide. Write its formula.',
      promptVn: 'Đây là một hạt sắt sunfua. Hãy viết công thức của nó.',
      explain: '**FeS**: one iron atom (Fe) bonded to one sulfur atom (S). When there is only one atom of an element, no small number is written.',
      explainVn: '**FeS**: một nguyên tử sắt (Fe) liên kết với một nguyên tử lưu huỳnh (S). Khi chỉ có một nguyên tử của một nguyên tố thì không viết số nhỏ.',
    },
  },

  // 9 ─ Mixed, then bonded + PARTICLES (magnet) ──────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Magnet',
    eyebrow: 'Learner’s Book, page 65 · the same two elements, twice',
    eyebrowVn: 'Sách học sinh, trang 65 · cùng hai nguyên tố, hai lần',
    title: 'Mixed, Then Bonded',
    titleVn: 'Trộn lẫn, rồi liên kết',
    ratio: 40,
    inlineSvg: DIAGRAMS.MIX_COMPOUND,
    content:
      '**Stirred:** the iron atoms and sulfur atoms sit side by side, not bonded. A **mixture**.\n\n' +
      '**Heated:** each iron atom bonds to a sulfur atom. A **compound**, iron sulfide.\n\n' +
      'A magnet pulls on **free** iron — iron that is not bonded to anything.',
    contentVn:
      '**Khuấy:** các nguyên tử sắt và lưu huỳnh nằm cạnh nhau, không liên kết. Một **hỗn hợp**.\n\n' +
      '**Đun nóng:** mỗi nguyên tử sắt liên kết với một nguyên tử lưu huỳnh. Một **hợp chất**, sắt sunfua.\n\n' +
      'Nam châm hút sắt **tự do** — sắt không liên kết với chất nào.',
    activity: {
      id: 'act_magnet_boxes',
      type: 'particles',
      ask: 'magnet',
      boxes: [
        ['Fe', 'S', 'Fe', 'S', 'Fe', 'S', 'Fe', 'S'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'FeS', 'FeS'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'Fe', 'Fe', 'Fe'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'S', 'S', 'S'],
      ],
      prompt: 'Would a magnet pull iron out of each box?',
      promptVn: 'Nam châm có hút được sắt ra khỏi từng hộp không?',
      explain: 'A magnet pulls only on **free iron atoms**. **Yes** for iron and sulfur stirred, and **yes** for iron sulfide with some iron left over — those spare iron atoms are not bonded. **No** for iron sulfide on its own, and **no** for iron sulfide with spare sulfur: every iron atom there is bonded.',
      explainVn: 'Nam châm chỉ hút **nguyên tử sắt tự do**. **Có** với sắt và lưu huỳnh được khuấy, và **có** với sắt sunfua còn dư sắt — những nguyên tử sắt dư đó không liên kết. **Không** với sắt sunfua riêng, và **không** với sắt sunfua còn dư lưu huỳnh: mọi nguyên tử sắt ở đó đều đã liên kết.',
    },
  },

  // 10 ─ Mixture vs compound + CHECK ─────────────────────────────────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'The difference',
    eyebrowVn: 'Sự khác nhau',
    title: 'Mixture vs Compound',
    titleVn: 'Hỗn hợp và hợp chất',
    columns: [
      {
        heading: 'Mixture',
        headingVn: 'Hỗn hợp',
        accent: BLUE,
        icon: 'Boxes',
        content: 'Iron and sulfur, **stirred**.',
        contentVn: 'Sắt và lưu huỳnh, **khuấy đều**.',
        notes: [
          {
            tone: 'write',
            badge: 'Mixture',
            badgeVn: 'Hỗn hợp',
            icon: 'BookOpen',
            text: '**Not bonded.**\nEach substance **keeps** its properties.\n**Easy** to separate.',
            textVn: '**Không liên kết.**\nMỗi chất **giữ nguyên** tính chất.\n**Dễ** tách ra.',
          },
        ],
      },
      {
        heading: 'Compound',
        headingVn: 'Hợp chất',
        accent: ORANGE,
        icon: 'Atom',
        content: 'Iron and sulfur, **heated**: iron sulfide.',
        contentVn: 'Sắt và lưu huỳnh, **đun nóng**: sắt sunfua.',
        notes: [
          {
            tone: 'write',
            badge: 'Compound',
            badgeVn: 'Hợp chất',
            icon: 'BookOpen',
            text: '**Bonded.**\nIt has **new** properties.\n**Hard** to separate.',
            textVn: '**Liên kết.**\nNó có tính chất **mới**.\n**Khó** tách ra.',
          },
        ],
      },
    ],
    check: {
      id: 'chk_mixture_props',
      q: 'Which sentence is true of a MIXTURE?',
      qVn: 'Câu nào đúng với một HỖN HỢP?',
      options: [
        { val: 'A', text: 'Each substance keeps its own properties, and it is easy to separate', textVn: 'Mỗi chất giữ nguyên tính chất của nó, và dễ tách ra' },
        { val: 'B', text: 'The substances in it are bonded together', textVn: 'Các chất trong đó liên kết với nhau' },
        { val: 'C', text: 'It has new properties that none of its substances had', textVn: 'Nó có tính chất mới mà không chất nào trong đó có' },
        { val: 'D', text: 'It is very hard to separate', textVn: 'Nó rất khó tách ra' },
      ],
      correct: 'A',
      expEn: 'In a mixture nothing is bonded, so the iron stays magnetic and a magnet separates it easily. B, C and D all describe a **compound**: bonded, with new properties, and hard to separate.',
      expVn: 'Trong hỗn hợp không có gì liên kết, nên sắt vẫn bị nam châm hút và nam châm tách nó ra dễ dàng. B, C và D đều mô tả **hợp chất**: có liên kết, có tính chất mới, và khó tách ra.',
    },
  },

  // 11 ─ Book questions 1–2 + CHECK ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 67 · Think like a scientist',
    eyebrowVn: 'Sách học sinh, trang 67 · Suy nghĩ như nhà khoa học',
    title: 'Questions 1–2',
    titleVn: 'Câu hỏi 1–2',
    content:
      '> **1.** Describe what it looks like: **a** the mixture of iron and sulfur **b** the iron sulfide\n' +
      '> **2.** Can a magnet remove the iron from iron sulfide? Explain.\n\n' +
      'Question 1b is scored. Answer 1a and 2 in your head, then check them.',
    contentVn:
      '> **1.** Mô tả vẻ ngoài của: **a** hỗn hợp sắt và lưu huỳnh **b** sắt sunfua\n' +
      '> **2.** Nam châm có tách được sắt ra khỏi sắt sunfua không? Giải thích.\n\n' +
      'Câu 1b được tính điểm. Trả lời câu 1a và 2 trong đầu, rồi kiểm tra.',
    reveal: {
      label: 'Check 1a and 2',
      labelVn: 'Kiểm tra 1a và 2',
      answer: '**1a** A yellow and grey powder. You can see bits of both.\n**2.** No. The iron is bonded to the sulfur. Iron sulfide is a compound, and it is not magnetic.',
      answerVn: '**1a** Bột màu vàng và xám. Nhìn thấy được cả hai chất.\n**2.** Không. Sắt đã liên kết với lưu huỳnh. Sắt sunfua là hợp chất và không bị nam châm hút.',
    },
    check: {
      id: 'chk_fes_looks',
      q: 'Question 1b: what does iron sulfide look like?',
      qVn: 'Câu 1b: sắt sunfua trông như thế nào?',
      options: [
        { val: 'A', text: 'A yellow and grey powder — you can see bits of both', textVn: 'Bột màu vàng và xám — nhìn thấy được cả hai' },
        { val: 'B', text: 'A dark grey or black solid, the same all through', textVn: 'Chất rắn màu xám đen, giống nhau từ trong ra ngoài' },
        { val: 'C', text: 'Shiny grey filings that jump to a magnet', textVn: 'Mạt màu xám bóng bị nam châm hút' },
        { val: 'D', text: 'A bright yellow powder', textVn: 'Bột màu vàng tươi' },
      ],
      correct: 'B',
      expEn: 'Iron sulfide is a **dark grey solid** with no yellow or grey bits: it is one new substance. A is the **mixture** before heating (question 1a); C is iron alone, and D is sulfur alone.',
      expVn: 'Sắt sunfua là **chất rắn màu xám đen** không còn mẩu vàng hay xám: nó là một chất mới duy nhất. A là **hỗn hợp** trước khi đun (câu 1a); C là sắt riêng, còn D là lưu huỳnh riêng.',
    },
  },

  // 12 ─ What is air? PARTICLES (kind) ───────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Wind',
    eyebrow: 'Think',
    eyebrowVn: 'Suy nghĩ',
    title: 'What Is Air?',
    titleVn: 'Không khí là gì?',
    label: 'Sort the boxes',
    labelVn: 'Phân loại các hộp',
    labelIcon: 'Sparkles',
    text: 'You breathe it all day. Is air an **element**, a **compound** or a **mixture**?',
    textVn: 'Em hít thở nó cả ngày. Không khí là **nguyên tố**, **hợp chất** hay **hỗn hợp**?',
    sub: 'Three boxes of gas, drawn particle by particle. One of them is a sample of air.',
    subVn: 'Ba hộp khí, vẽ từng hạt một. Một trong số đó là một mẫu không khí.',
    activity: {
      id: 'act_air_kind',
      type: 'particles',
      ask: 'kind',
      boxes: [
        ['N2', 'N2', 'N2', 'N2', 'N2', 'N2', 'N2'],
        ['N2', 'N2', 'N2', 'N2', 'N2', 'O2', 'O2', 'CO2', 'H2O'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O'],
      ],
      choices: ['element', 'compound', 'mixture'],
      prompt: 'Element, compound or mixture? Choose under every box.',
      promptVn: 'Nguyên tố, hợp chất hay hỗn hợp? Chọn dưới mỗi hộp.',
      explain: 'Nitrogen on its own is an **element** — one kind of atom. Water vapour on its own is a **compound** — hydrogen and oxygen, bonded. The box with nitrogen, oxygen, carbon dioxide and water is **air**: several substances, not bonded to each other — a **mixture**.',
      explainVn: 'Nitơ riêng là **nguyên tố** — một loại nguyên tử. Hơi nước riêng là **hợp chất** — hiđro và oxi, liên kết với nhau. Hộp có nitơ, oxi, cacbon đioxit và nước là **không khí**: nhiều chất, không liên kết với nhau — một **hỗn hợp**.',
    },
  },

  // 13 ─ Air is a mixture + book questions 1–3 + CHECK ───────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Wind',
    eyebrow: 'Learner’s Book, page 68',
    eyebrowVn: 'Sách học sinh, trang 68',
    title: 'Air Is a Mixture',
    titleVn: 'Không khí là hỗn hợp',
    ratio: 40,
    inlineSvg: DIAGRAMS.AIR,
    content:
      'Air is mostly **nitrogen** and **oxygen**, with a little **carbon dioxide** and **water**. The particles are mixed, not bonded to each other.\n\n' +
      'So air is a **mixture** — of elements **and** compounds.\n\n' +
      '> **1.** Which is the most common element in air?\n' +
      '> **3.** Which is the least common compound?',
    contentVn:
      'Không khí chủ yếu là **nitơ** và **oxi**, với một ít **cacbon đioxit** và **nước**. Các hạt trộn lẫn, không liên kết với nhau.\n\n' +
      'Vậy không khí là một **hỗn hợp** — gồm cả nguyên tố **và** hợp chất.\n\n' +
      '> **1.** Nguyên tố nào có nhiều nhất trong không khí?\n' +
      '> **3.** Hợp chất nào có ít nhất?',
    reveal: {
      label: 'Check 1 and 3',
      labelVn: 'Kiểm tra 1 và 3',
      answer: '**1.** nitrogen **3.** carbon dioxide',
      answerVn: '**1.** nitơ **3.** cacbon đioxit',
    },
    check: {
      id: 'chk_air_substances',
      q: 'Question 2: how many different substances can you see in the sample of air?',
      qVn: 'Câu 2: em thấy bao nhiêu chất khác nhau trong mẫu không khí?',
      options: [
        { val: 'A', text: '1 — it is all air', textVn: '1 — tất cả đều là không khí' },
        { val: 'B', text: '2 — nitrogen and oxygen', textVn: '2 — nitơ và oxi' },
        { val: 'C', text: '4 — nitrogen, oxygen, carbon dioxide and water', textVn: '4 — nitơ, oxi, cacbon đioxit và nước' },
        { val: 'D', text: '36 — one for every particle', textVn: '36 — mỗi hạt là một chất' },
      ],
      correct: 'C',
      expEn: 'There are **four kinds** of particle, so four substances. Air is not one substance (A); B forgets the carbon dioxide and water; and D counts particles, not kinds — 26 nitrogen particles are still one substance.',
      expVn: 'Có **bốn loại** hạt, nên có bốn chất. Không khí không phải một chất (A); B quên cacbon đioxit và nước; còn D đếm số hạt, không phải số loại — 26 hạt nitơ vẫn chỉ là một chất.',
    },
  },

  // 14 ─ ESTIMATE: how much is nitrogen? ─────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Guess first',
    eyebrowVn: 'Đoán trước',
    title: 'How Much Is Nitrogen?',
    titleVn: 'Nitơ chiếm bao nhiêu?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Sparkles',
    text: 'Every 100 litres of air hold some nitrogen, some oxygen and a little of everything else.',
    textVn: 'Mỗi 100 lít không khí chứa một phần nitơ, một phần oxi và một ít các khí khác.',
    sub: 'Out of 100, how much is **nitrogen**? Slide to your guess.',
    subVn: 'Trong 100 phần, **nitơ** chiếm bao nhiêu? Kéo thanh trượt đến dự đoán của em.',
    activity: {
      id: 'act_estimate_nitrogen',
      type: 'estimate',
      prompt: 'What percentage of air is nitrogen?',
      promptVn: 'Nitơ chiếm bao nhiêu phần trăm không khí?',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      answer: 78,
      tolerance: 0.1,
      explain: 'About **78%** — more than three-quarters of every breath. Oxygen, the gas your body needs, is only about **21%**, and everything else together is about **1%**.',
      explainVn: 'Khoảng **78%** — hơn ba phần tư mỗi hơi thở. Oxi, khí cơ thể em cần, chỉ khoảng **21%**, và tất cả các khí còn lại cộng lại khoảng **1%**.',
    },
  },

  // 15 ─ Composition ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Key word · Learner’s Book, page 67',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 67',
    title: 'Composition',
    titleVn: 'Thành phần',
    ratio: 40,
    inlineSvg: DIAGRAMS.AIR_PIE,
    content:
      'The pie chart shows the **composition** of air.\n\n' +
      'The water in air changes with the **weather**, so the composition of air can change. A mixture can. A compound cannot: iron sulfide is always one iron atom to one sulfur atom.',
    contentVn:
      'Biểu đồ tròn cho thấy **thành phần** của không khí.\n\n' +
      'Lượng hơi nước trong không khí thay đổi theo **thời tiết**, nên thành phần không khí có thể thay đổi. Hỗn hợp thì được. Hợp chất thì không: sắt sunfua luôn là một nguyên tử sắt với một nguyên tử lưu huỳnh.',
    notes: [
      keyWord(
        '**Composition:** what a mixture is made of, and how much of each.\nAir: 78% nitrogen, 21% oxygen, 1% other gases.',
        '**Thành phần (composition):** hỗn hợp gồm những chất gì, và mỗi chất bao nhiêu.\nKhông khí: 78% nitơ, 21% oxi, 1% các khí khác.',
      ),
    ],
  },

  // 16 ─ What changes the air ────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'CloudFog',
    eyebrow: 'Key word · Learner’s Book, page 67',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 67',
    title: 'The Air Changes',
    titleVn: 'Không khí thay đổi',
    columns: [
      {
        heading: 'From nature',
        headingVn: 'Từ tự nhiên',
        accent: GREEN,
        icon: 'Mountain',
        image: img('volcano.jpg'),
        notes: [
          keyWord(
            '**Natural emissions:** gases that nature gives out. Volcanoes, animals and plants give out carbon dioxide.',
            '**Khí thải tự nhiên (natural emissions):** các khí do tự nhiên thải ra. Núi lửa, động vật và thực vật thải ra cacbon đioxit.',
          ),
        ],
        caption: 'Volcano gas over the crater lake at Kawah Ijen, Indonesia.',
        captionVn: 'Khí núi lửa trên hồ miệng núi lửa Kawah Ijen, Indonesia.',
      },
      {
        heading: 'From people',
        headingVn: 'Từ con người',
        accent: RED,
        icon: 'Gauge',
        image: img('traffic.jpg'),
        content: 'Burning petrol gives out **carbon dioxide** too. Every motorbike adds a little to the air.',
        contentVn: 'Đốt xăng cũng thải ra **cacbon đioxit**. Mỗi chiếc xe máy thêm một ít vào không khí.',
        caption: 'Motorbikes in Hà Nội.',
        captionVn: 'Xe máy ở Hà Nội.',
      },
    ],
  },

  // 17 ─ Pure: the English check + CHECK ─────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    title: 'Pure',
    titleVn: 'Tinh khiết',
    text: 'On a water bottle, **pure** just means clean.',
    textVn: 'Trên chai nước, **pure** (tinh khiết) chỉ có nghĩa là sạch.',
    sub: 'In science, **pure** means something much stricter.',
    subVn: 'Trong khoa học, **pure** có nghĩa chặt chẽ hơn nhiều.',
    notes: [
      keyWord(
        '**Pure:** contains only **one** substance. Pure water is only water.',
        '**Tinh khiết (pure):** chỉ chứa **một** chất. Nước tinh khiết chỉ có nước.',
      ),
    ],
    check: {
      id: 'chk_pure_meaning',
      q: 'A bottle says PURE DRINKING WATER. What does pure mean in science?',
      qVn: 'Một chai ghi NƯỚC UỐNG TINH KHIẾT. Trong khoa học, tinh khiết nghĩa là gì?',
      options: [
        { val: 'A', text: 'Clean and safe to drink', textVn: 'Sạch và an toàn để uống' },
        { val: 'B', text: 'Only one substance is in it', textVn: 'Chỉ có một chất trong đó' },
        { val: 'C', text: 'It came from a mountain spring', textVn: 'Nó đến từ một con suối trên núi' },
        { val: 'D', text: 'It has healthy minerals in it', textVn: 'Nó có khoáng chất tốt cho sức khỏe' },
      ],
      correct: 'B',
      expEn: 'In science, **pure = one substance**. "Clean" (A) is the everyday meaning on the label — clean water can still have minerals dissolved in it. Where it came from (C) does not matter, and water with minerals in it (D) is a mixture, so it is **not** pure.',
      expVn: 'Trong khoa học, **tinh khiết = một chất**. "Sạch" (A) là nghĩa đời thường trên nhãn — nước sạch vẫn có thể có khoáng chất hòa tan. Nguồn gốc (C) không quan trọng, và nước có khoáng chất (D) là hỗn hợp, nên **không** tinh khiết.',
    },
  },

  // 18 ─ Mineral water + book question 4 + CHECK ─────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplets',
    eyebrow: 'Key word · Learner’s Book, page 68',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 68',
    title: 'Mineral Water',
    titleVn: 'Nước khoáng',
    ratio: 45,
    inlineSvg: DIAGRAMS.MINERAL_LABEL,
    content:
      'The label lists what is **dissolved** in the water, in milligrams per litre (mg/l). The bigger the number, the more there is.\n\n' +
      '> **4.** List the **three** most abundant minerals. (most abundant = the most)',
    contentVn:
      'Nhãn liệt kê những chất **hòa tan** trong nước, tính bằng miligam mỗi lít (mg/l). Số càng lớn thì chất đó càng nhiều.\n\n' +
      '> **4.** Kể tên **ba** khoáng chất có nhiều nhất. (most abundant = nhiều nhất)',
    notes: [
      keyWord(
        '**Mineral:** a natural substance from rocks. Mineral water is a mixture: water and minerals.',
        '**Khoáng chất (mineral):** một chất tự nhiên từ đất đá. Nước khoáng là hỗn hợp: nước và khoáng chất.',
      ),
    ],
    check: {
      id: 'chk_mineral_top3',
      q: 'Question 4: read the label. Which are the three most abundant minerals?',
      qVn: 'Câu 4: đọc nhãn. Ba khoáng chất nào có nhiều nhất?',
      options: [
        { val: 'A', text: 'calcium, magnesium, potassium', textVn: 'canxi, magie, kali (calcium, magnesium, potassium)' },
        { val: 'B', text: 'sulphate, nitrate, iron', textVn: 'sunfat, nitrat, sắt (sulphate, nitrate, iron)' },
        { val: 'C', text: 'nitrate, iron, aluminium', textVn: 'nitrat, sắt, nhôm (nitrate, iron, aluminium)' },
        { val: 'D', text: 'bicarbonate, calcium, chloride', textVn: 'bicacbonat, canxi, clorua (bicarbonate, calcium, chloride)' },
      ],
      correct: 'D',
      expEn: '**Bicarbonate (248), calcium (55) and chloride (37)** have the biggest numbers. A is just the first three lines of the label — the order on a label is not the order of amount. C has the smallest amounts, and B mixes small ones.',
      expVn: '**Bicacbonat (248), canxi (55) và clorua (37)** có số lớn nhất. A chỉ là ba dòng đầu của nhãn — thứ tự trên nhãn không phải thứ tự theo lượng. C có lượng nhỏ nhất, còn B là các chất có lượng nhỏ.',
    },
  },

  // 19 ─ PREDICT: is tap water pure? ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Droplets',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Is Tap Water Pure?',
    titleVn: 'Nước máy có tinh khiết không?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Water from the tap looks clear, with nothing in it.',
    textVn: 'Nước từ vòi trông trong suốt, không có gì trong đó.',
    sub: 'Is tap water **pure**, or a **mixture**?',
    subVn: 'Nước máy **tinh khiết**, hay là **hỗn hợp**?',
    activity: {
      id: 'act_predict_tap',
      type: 'predict',
      prompt: 'Tap water: pure, or a mixture?',
      promptVn: 'Nước máy: tinh khiết, hay hỗn hợp?',
      options: [
        { val: 'pure', name: 'Pure — it is only water', nameVn: 'Tinh khiết — nó chỉ có nước' },
        { val: 'mixture', name: 'A mixture — something else is in it', nameVn: 'Hỗn hợp — có chất khác trong đó' },
      ],
      correct: 'mixture',
      explain: '**A mixture.** On its way to the tap the water flowed through rocks, and minerals **dissolved** in it. You cannot see them — but boil the water away and they are left behind. The next two slides show how.',
      explainVn: '**Hỗn hợp.** Trên đường đến vòi, nước chảy qua đất đá, và khoáng chất **hòa tan** vào nó. Em không nhìn thấy chúng — nhưng đun cho nước bay hơi hết thì chúng còn lại. Hai slide sau cho thấy cách làm.',
    },
  },

  // 20 ─ Evaporating basin ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Beaker',
    eyebrow: 'Key word · how to find out',
    eyebrowVn: 'Từ khóa · cách tìm ra câu trả lời',
    title: 'Evaporating Basin',
    titleVn: 'Bát cô cạn',
    ratio: 45,
    image: img('basin.jpg'),
    content:
      'Pour tap water into an **evaporating basin** and heat it until all the water has evaporated.\n\n' +
      'If the water were pure, the basin would be **empty** at the end. Is anything **left**?',
    contentVn:
      'Rót nước máy vào **bát cô cạn** và đun cho đến khi nước bay hơi hết.\n\n' +
      'Nếu nước tinh khiết thì cuối cùng bát sẽ **trống không**. Có gì **còn lại** không?',
    notes: [
      keyWord(
        '**Evaporating basin:** a dish for heating a liquid until the water evaporates.',
        '**Bát cô cạn (evaporating basin):** cái bát dùng để đun chất lỏng cho đến khi nước bay hơi hết.',
      ),
      {
        tone: 'homework',
        badge: 'Safety',
        badgeVn: 'An toàn',
        icon: 'AlertTriangle',
        text: 'Hot liquid can **spit** out of the basin. In the lab, wear **safety glasses**.',
        textVn: 'Chất lỏng nóng có thể **bắn** ra khỏi bát. Trong phòng thí nghiệm, đeo **kính bảo hộ**.',
      },
    ],
  },

  // 21 ─ Something is left behind + CHECK ────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The answer to your prediction',
    eyebrowVn: 'Đáp án cho dự đoán của em',
    title: 'Something Is Left Behind',
    titleVn: 'Có thứ còn lại',
    ratio: 45,
    image: img('kettle.jpg'),
    content:
      '**A mixture!** When the water has gone, a **white solid** is left in the basin.\n\n' +
      'It was **dissolved** in the water. It came from the rocks.\n\n' +
      'The white crust inside an old kettle is the same thing: minerals left behind, boil after boil.',
    contentVn:
      '**Hỗn hợp!** Khi nước bay hơi hết, một **chất rắn màu trắng** còn lại trong bát.\n\n' +
      'Nó đã **hòa tan** trong nước. Nó đến từ đất đá.\n\n' +
      'Lớp cặn trắng bên trong một chiếc ấm đun nước cũ cũng chính là nó: khoáng chất còn lại, sau mỗi lần đun.',
    check: {
      id: 'chk_solid_left',
      q: 'Why does the white solid show that tap water is a mixture?',
      qVn: 'Vì sao chất rắn màu trắng cho thấy nước máy là hỗn hợp?',
      options: [
        { val: 'A', text: 'Pure water would leave nothing behind when it evaporated', textVn: 'Nước tinh khiết sẽ không để lại gì khi bay hơi' },
        { val: 'B', text: 'Pure water always leaves a white solid', textVn: 'Nước tinh khiết luôn để lại chất rắn màu trắng' },
        { val: 'C', text: 'The heat turned the water into a white solid', textVn: 'Nhiệt đã biến nước thành chất rắn màu trắng' },
        { val: 'D', text: 'The white solid is frozen water', textVn: 'Chất rắn màu trắng là nước đá' },
      ],
      correct: 'A',
      expEn: 'Pure water is **only water**, so when it evaporates nothing is left. Something was left, so something else was dissolved in it: a mixture. B is false; the water became a gas, not a solid (C); and nothing freezes in a hot basin (D).',
      expVn: 'Nước tinh khiết **chỉ có nước**, nên khi bay hơi thì không còn gì. Đã có thứ còn lại, nên có chất khác hòa tan trong đó: một hỗn hợp. B sai; nước đã thành khí, không thành rắn (C); và không có gì đông đặc trong bát nóng (D).',
    },
  },

  // 22 ─ Book questions 1–5 + PARTICLES (pure) ───────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 69 · Think like a scientist',
    eyebrowVn: 'Sách học sinh, trang 69 · Suy nghĩ như nhà khoa học',
    title: 'Is Water Really a Mixture?',
    titleVn: 'Nước có thật là hỗn hợp?',
    content:
      '> **1.** Use particles to explain why the water evaporated. **2.** What was left in the basin?\n' +
      '> **3.** Where did it come from? **4.** Was the water pure, or a mixture? Explain. **5.** Why wear safety glasses?\n\n' +
      'Answer them in your head, then check. Then test four boxes of particles.',
    contentVn:
      '> **1.** Dùng kiến thức về hạt để giải thích vì sao nước bay hơi. **2.** Cái gì còn lại trong bát?\n' +
      '> **3.** Nó đến từ đâu? **4.** Nước đó tinh khiết hay là hỗn hợp? Giải thích. **5.** Vì sao phải đeo kính bảo hộ?\n\n' +
      'Trả lời trong đầu, rồi kiểm tra. Sau đó thử bốn hộp hạt.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**1.** Heat gives the particles energy. They move fast enough to escape as a gas. **2.** a white solid (minerals) **3.** dissolved in the water, from rocks **4.** A mixture: something else was in it. **5.** Hot liquid can spit.',
      answerVn: '**1.** Nhiệt cho các hạt năng lượng. Chúng chuyển động đủ nhanh để thoát ra thành khí. **2.** chất rắn màu trắng (khoáng chất) **3.** hòa tan trong nước, từ đất đá **4.** Hỗn hợp: có chất khác trong đó. **5.** Chất lỏng nóng có thể bắn ra.',
    },
    activity: {
      id: 'act_pure_boxes',
      type: 'particles',
      ask: 'pure',
      boxes: [
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'CaCl2', 'MgCl2'],
        ['O2', 'O2', 'O2', 'O2', 'O2', 'O2'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'NaCl', 'NaCl'],
      ],
      prompt: 'Pure, or a mixture? Choose under every box.',
      promptVn: 'Tinh khiết, hay hỗn hợp? Chọn dưới mỗi hộp.',
      explain: '**Pure** means one substance. The box of water particles and the box of oxygen particles are both **pure** — an element can be pure too. Water with dissolved minerals (like tap water) and water with salt (like sea water) hold more than one substance: **mixtures**.',
      explainVn: '**Tinh khiết** nghĩa là một chất. Hộp hạt nước và hộp hạt oxi đều **tinh khiết** — nguyên tố cũng có thể tinh khiết. Nước có khoáng chất hòa tan (như nước máy) và nước có muối (như nước biển) chứa nhiều hơn một chất: **hỗn hợp**.',
    },
  },

  // 23 ─ Mixture or compound? PARTICLES (find) ───────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Mixture or compound?',
    eyebrowVn: 'Hỗn hợp hay hợp chất?',
    title: 'Find the Compounds',
    titleVn: 'Tìm các hợp chất',
    label: 'Find it',
    labelVn: 'Tìm',
    labelIcon: 'Sparkles',
    text: 'Salt. Sea water. Iron sulfide. Iron and sulfur, stirred.',
    textVn: 'Muối. Nước biển. Sắt sunfua. Sắt và lưu huỳnh, khuấy đều.',
    sub: 'Four boxes, one for each. A compound is **one** substance with **bonded** atoms.',
    subVn: 'Bốn hộp, mỗi hộp một chất. Hợp chất là **một** chất có các nguyên tử **liên kết**.',
    activity: {
      id: 'act_find_compounds',
      type: 'particles',
      ask: 'find',
      find: 'compound',
      boxes: [
        ['NaCl', 'NaCl', 'NaCl', 'NaCl', 'NaCl', 'NaCl'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'NaCl', 'NaCl'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'FeS', 'FeS'],
        ['Fe', 'S', 'Fe', 'S', 'Fe', 'S', 'Fe', 'S'],
      ],
      prompt: 'Tap every box that is a compound.',
      promptVn: 'Chạm vào mọi hộp là hợp chất.',
      explain: 'The compounds are **salt** (sodium chloride: every particle the same, sodium bonded to chlorine) and **iron sulfide** (iron bonded to sulfur). Sea water is salt **and** water, not bonded to each other, and iron with sulfur stirred is two elements side by side — both are **mixtures**.',
      explainVn: 'Các hợp chất là **muối** (natri clorua: mọi hạt giống nhau, natri liên kết với clo) và **sắt sunfua** (sắt liên kết với lưu huỳnh). Nước biển là muối **và** nước, không liên kết với nhau, còn sắt với lưu huỳnh khuấy đều là hai nguyên tố nằm cạnh nhau — cả hai đều là **hỗn hợp**.',
    },
  },

  // 24 ─ Checklist + the exit question as a CHECK ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: 'Next: the Vocab, then **Particle Lab** — new boxes of particles every time you play.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Phòng thí nghiệm hạt** — mỗi lần chơi là những hộp hạt mới.',
    items: [
      { text: 'Tell a **compound** from a **mixture**, from its particles.', textVn: 'Phân biệt **hợp chất** với **hỗn hợp** qua các hạt của nó.' },
      { text: 'Explain the **difference**: bonded or not, new properties or the same, hard or easy to separate.', textVn: 'Giải thích **sự khác nhau**: có liên kết hay không, tính chất mới hay giữ nguyên, khó hay dễ tách.' },
      { text: 'Give **examples** of mixtures: air, sea water, mineral water, tap water.', textVn: 'Nêu **ví dụ** về hỗn hợp: không khí, nước biển, nước khoáng, nước máy.' },
      { text: 'Say what **pure** means in science, and why tap water is not pure.', textVn: 'Nói được **tinh khiết** nghĩa là gì trong khoa học, và vì sao nước máy không tinh khiết.' },
      { text: 'Read the **composition** of air: 78% nitrogen, 21% oxygen, 1% other gases.', textVn: 'Đọc **thành phần** không khí: 78% nitơ, 21% oxi, 1% các khí khác.' },
    ],
    check: {
      id: 'chk_salt_water',
      q: 'Exit question: salt water. Mixture or compound?',
      qVn: 'Câu hỏi cuối bài: nước muối. Hỗn hợp hay hợp chất?',
      options: [
        { val: 'A', text: 'A compound — the salt and water are bonded', textVn: 'Hợp chất — muối và nước liên kết với nhau' },
        { val: 'B', text: 'An element — it is mostly water', textVn: 'Nguyên tố — nó chủ yếu là nước' },
        { val: 'C', text: 'A mixture — salt and water are not bonded, and boiling the water away gives the salt back', textVn: 'Hỗn hợp — muối và nước không liên kết, và đun cho nước bay hơi hết thì lấy lại được muối' },
        { val: 'D', text: 'A compound — it tastes different from pure water', textVn: 'Hợp chất — nó có vị khác nước tinh khiết' },
      ],
      correct: 'C',
      expEn: 'Salt water is a **mixture**: the salt is dissolved, not bonded, and evaporating the water leaves the salt behind — easy to separate. A and D mistake a mixture for a compound (a taste is not a bond), and water is itself a compound, never an element (B).',
      expVn: 'Nước muối là **hỗn hợp**: muối hòa tan, không liên kết, và làm bay hơi nước thì muối còn lại — dễ tách ra. A và D nhầm hỗn hợp với hợp chất (vị không phải liên kết), còn nước tự nó là hợp chất, không bao giờ là nguyên tố (B).',
    },
  },
];
