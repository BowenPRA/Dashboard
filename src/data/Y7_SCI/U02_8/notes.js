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
const keyWord = (text, textVn) => ({ tone: 'write', badge: 'Key word', badgeVn: 'Từ khóa', icon: 'BookOpen', text, textVn });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 2 · 2.8',
    eyebrowVn: 'Chương 2 · 2.8',
    title: 'Acids & Bases',
    titleVn: 'Axit & Bazơ',
    objective: 'Name acids and bases you meet every day; test a liquid with an indicator — litmus and universal indicator; read the pH scale and say whether a liquid is acid, neutral or alkali; explain what neutralisation does and where it is used.',
    objectiveVn: 'Kể tên các axit và bazơ em gặp hằng ngày; thử một chất lỏng bằng chất chỉ thị — giấy quỳ và chất chỉ thị vạn năng; đọc thang pH và nói một chất lỏng là axit, trung tính hay kiềm; giải thích sự trung hòa làm gì và được dùng ở đâu.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **sort**, **predict**, **dip litmus paper**, put liquids on the **pH scale** and **neutralise** an acid drop by drop. **17 things are scored** — the first is on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán**, **nhúng giấy quỳ**, đặt các chất lỏng lên **thang pH** và **trung hòa** một axit từng giọt một. **17 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: SORT — sour or not? ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Droplet',
    eyebrow: 'Start here',
    eyebrowVn: 'Bắt đầu',
    title: 'Sour or Not?',
    titleVn: 'Chua hay không?',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: 'You know the taste of **sour** already: chanh, me, khế.',
    textVn: 'Em đã biết vị **chua** rồi: chanh, me, khế.',
    sub: 'Eight foods. Which ones taste sour?',
    subVn: 'Tám món. Món nào có vị chua?',
    activity: {
      id: 'act_sour',
      type: 'sort',
      prompt: 'Sort the eight: sour, or not sour?',
      promptVn: 'Sắp xếp tám món: chua, hay không chua?',
      bins: [
        { id: 'sour', name: 'Sour', nameVn: 'Chua' },
        { id: 'not', name: 'Not sour', nameVn: 'Không chua' },
      ],
      cards: [
        { id: 'lemon', name: 'lemon', nameVn: 'chanh', bin: 'sour' },
        { id: 'tamarind', name: 'tamarind', nameVn: 'me', bin: 'sour' },
        { id: 'starfruit', name: 'star fruit', nameVn: 'khế', bin: 'sour' },
        { id: 'mango', name: 'green mango', nameVn: 'xoài xanh', bin: 'sour' },
        { id: 'vinegar', name: 'vinegar', nameVn: 'giấm', bin: 'sour' },
        { id: 'sugar', name: 'sugar', nameVn: 'đường', bin: 'not' },
        { id: 'salt', name: 'salt', nameVn: 'muối', bin: 'not' },
        { id: 'water', name: 'plain water', nameVn: 'nước lọc', bin: 'not' },
      ],
      explain: '**Sour:** lemon, tamarind, star fruit, green mango and vinegar. Every one of them has an **acid** in it — that sour taste is the clue. Sugar is sweet, salt is salty, and plain water has no taste at all.',
      explainVn: '**Chua:** chanh, me, khế, xoài xanh và giấm. Mỗi thứ đều có **axit** trong đó — vị chua chính là dấu hiệu. Đường thì ngọt, muối thì mặn, còn nước lọc không có vị gì.',
    },
  },

  // 3 ─ The question the whole lesson answers ─────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think · keep this question',
    eyebrowVn: 'Suy nghĩ · giữ câu hỏi này',
    title: 'Two Clear Liquids',
    titleVn: 'Hai ly nước trong',
    text: 'Mr Bowen pours two glasses. One is **lemon juice**. One is **soapy water**. Both are clear.',
    textVn: 'Thầy Bowen rót hai ly. Một ly là **nước chanh**. Một ly là **nước xà phòng**. Cả hai đều trong.',
    sub: 'They look **the same**. How can you tell them apart — with **no tasting**? The answer is coming.',
    subVn: 'Chúng trông **giống hệt nhau**. Làm sao phân biệt được — mà **không được nếm**? Câu trả lời sẽ đến sau.',
  },

  // 4 ─ Sour means acid ───────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplet',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Sour Means Acid',
    titleVn: 'Chua nghĩa là axit',
    ratio: 45,
    image: img('lemon.jpg'),
    content: 'You have eaten acid all your life. But **never taste anything in the lab**.',
    contentVn: 'Em đã ăn axit cả đời rồi. Nhưng **đừng bao giờ nếm thứ gì trong phòng thí nghiệm**.',
    notes: [
      keyWord(
        '**Acid:** a substance that tastes sour. A strong acid can burn your skin.',
        '**Axit (acid):** chất có vị chua. Axit mạnh có thể làm bỏng da.',
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
    title: 'Acids Around You',
    titleVn: 'Axit quanh em',
    inlineSvg: DIAGRAMS.ACIDS_ROUND,
    caption: 'Four of these you can taste. Two you must **never** taste.',
    captionVn: 'Bốn thứ em có thể nếm. Hai thứ em **không bao giờ** được nếm.',
    check: {
      id: 'chk_never_taste',
      q: 'All six are acids. Which TWO must you never taste?',
      qVn: 'Cả sáu đều là axit. HAI thứ nào em không bao giờ được nếm?',
      options: [
        { val: 'A', text: 'Lemons and vinegar', textVn: 'Chanh và giấm' },
        { val: 'B', text: 'Tamarind and fizzy drinks', textVn: 'Me và nước có ga' },
        { val: 'C', text: 'The acid inside your stomach and a car battery', textVn: 'Axit trong dạ dày và ắc quy ô tô' },
        { val: 'D', text: 'Vinegar and tamarind', textVn: 'Giấm và me' },
      ],
      correct: 'C',
      expEn: '**Stomach acid and car battery acid** are strong acids — they can burn. The other four are food: lemons, vinegar, fizzy drinks and tamarind are acids too, but weak enough to eat. A, B and D each name only foods.',
      expVn: '**Axit dạ dày và axit ắc quy** là axit mạnh — chúng có thể gây bỏng. Bốn thứ kia là đồ ăn: chanh, giấm, nước có ga và me cũng là axit, nhưng đủ yếu để ăn được. A, B và D chỉ gồm đồ ăn.',
    },
  },

  // 6 ─ The opposite family + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplets',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    title: 'The Opposite Family',
    titleVn: 'Nhóm chất đối lập',
    ratio: 45,
    image: img('soap.jpg'),
    content: 'Rub soap between wet fingers. That **slippery** feeling is the clue.\n\nThe exam word is **alkali** — a base that has dissolved in water.',
    contentVn: 'Xoa xà phòng giữa hai ngón tay ướt. Cảm giác **trơn** đó là dấu hiệu.\n\nTừ dùng trong bài thi là **kiềm (alkali)** — một bazơ đã tan trong nước.',
    notes: [
      keyWord(
        '**Base:** the chemical opposite of an acid.\n**Alkali:** a base that dissolves in water.',
        '**Bazơ (base):** chất đối lập hóa học của axit.\n**Kiềm (alkali):** bazơ tan được trong nước.',
      ),
    ],
    check: {
      id: 'chk_alkali',
      q: 'Soapy water is an alkali. What is an alkali?',
      qVn: 'Nước xà phòng là kiềm. Kiềm là gì?',
      options: [
        { val: 'A', text: 'An acid that is not sour', textVn: 'Một axit không chua' },
        { val: 'B', text: 'A base that dissolves in water', textVn: 'Một bazơ tan được trong nước' },
        { val: 'C', text: 'Any liquid that is clear', textVn: 'Bất kỳ chất lỏng nào trong suốt' },
        { val: 'D', text: 'A base that never dissolves', textVn: 'Một bazơ không bao giờ tan' },
      ],
      correct: 'B',
      expEn: 'An **alkali** is a base that dissolves in water. A base is the opposite of an acid, so it is not a kind of acid (A). Clear tells you nothing — lemon juice is clear too (C) — and an alkali is exactly the base that DOES dissolve (D).',
      expVn: '**Kiềm** là bazơ tan được trong nước. Bazơ là chất đối lập với axit, nên nó không phải một loại axit (A). Trong suốt không cho biết gì — nước chanh cũng trong (C) — và kiềm chính là bazơ CÓ tan (D).',
    },
  },

  // 7 ─ Six bases ─────────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ALKALI,
    icon: 'Boxes',
    eyebrow: 'Six more you already know',
    eyebrowVn: 'Sáu thứ nữa em đã biết',
    title: 'Bases Around You',
    titleVn: 'Bazơ quanh em',
    inlineSvg: DIAGRAMS.BASES_ROUND,
    caption: 'You wash with them, brush with them — and one of them cleans an oven.',
    captionVn: 'Em dùng chúng để rửa, để đánh răng — và một thứ dùng để lau lò nướng.',
  },

  // 8 ─ The corrosive symbol + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Key word · lab safety',
    eyebrowVn: 'Từ khóa · an toàn phòng thí nghiệm',
    title: 'This Symbol Means Stop',
    titleVn: 'Kí hiệu này nghĩa là dừng lại',
    ratio: 50,
    image: img('corrosive.jpg'),
    content: 'You will see it on bottles in a school lab — and on oven cleaner at home. It is why tasting is banned.',
    contentVn: 'Em sẽ thấy nó trên các chai lọ trong phòng thí nghiệm ở trường — và trên chai nước tẩy lò ở nhà. Đó là lý do không được nếm.',
    notes: [
      keyWord(
        '**Corrosive:** it attacks skin, eyes and clothes.\nWear eye protection. Never taste. Wash a spill off at once.',
        '**Ăn mòn (corrosive):** chất làm hỏng da, mắt và quần áo.\nĐeo kính bảo hộ. Không bao giờ nếm. Nếu bị đổ ra người, rửa ngay.',
      ),
    ],
    check: {
      id: 'chk_corrosive_spill',
      q: 'A drop from a bottle with this symbol lands on your hand. What do you do?',
      qVn: 'Một giọt từ chai có kí hiệu này rơi lên tay em. Em làm gì?',
      options: [
        { val: 'A', text: 'Wipe it on your clothes', textVn: 'Lau nó vào quần áo' },
        { val: 'B', text: 'Leave it to dry', textVn: 'Để nó tự khô' },
        { val: 'C', text: 'Taste a little to see if it is an acid', textVn: 'Nếm một chút xem có phải axit không' },
        { val: 'D', text: 'Wash it off with water at once', textVn: 'Rửa sạch bằng nước ngay lập tức' },
      ],
      correct: 'D',
      expEn: '**Wash it off at once.** A corrosive keeps attacking skin while it is on it. Wiping it on your clothes (A) spreads it — it attacks clothes too; leaving it (B) lets it burn; and you never taste anything in the lab (C).',
      expVn: '**Rửa sạch ngay.** Chất ăn mòn tiếp tục làm hỏng da khi còn dính trên da. Lau vào quần áo (A) làm nó lan ra — nó cũng làm hỏng quần áo; để yên (B) thì nó làm bỏng; và không bao giờ nếm thứ gì trong phòng thí nghiệm (C).',
    },
  },

  // 9 ─ PREDICT: so what is left? ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Back to the two glasses · predict first',
    eyebrowVn: 'Quay lại hai ly nước · dự đoán trước',
    title: 'So What Is Left?',
    titleVn: 'Vậy còn cách nào?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'You cannot see the difference. You must not taste it.',
    textVn: 'Em không nhìn ra khác biệt. Em cũng không được nếm.',
    sub: 'What else could tell you which glass is which?',
    subVn: 'Còn thứ gì có thể cho em biết ly nào là ly nào?',
    activity: {
      id: 'act_predict_left',
      type: 'predict',
      prompt: 'Two clear liquids, no tasting. What could tell them apart?',
      promptVn: 'Hai chất lỏng trong suốt, không được nếm. Điều gì có thể phân biệt chúng?',
      options: [
        { val: 'look', name: 'Look at them very closely', nameVn: 'Nhìn thật kỹ' },
        { val: 'touch', name: 'Dip a finger in each one', nameVn: 'Nhúng ngón tay vào từng ly' },
        { val: 'colour', name: 'Add something that changes colour', nameVn: 'Thêm một chất biết đổi màu' },
        { val: 'smell', name: 'Smell them', nameVn: 'Ngửi chúng' },
      ],
      correct: 'colour',
      explain: '**Something that changes colour — an indicator.** Looking cannot tell two clear liquids apart, and touching or sniffing an unknown liquid in a lab is never safe: it could be corrosive. The next slide shows the indicator.',
      explainVn: '**Một chất biết đổi màu — chất chỉ thị.** Nhìn thì không phân biệt được hai chất lỏng trong suốt, còn chạm hay ngửi một chất lỏng lạ trong phòng thí nghiệm thì không bao giờ an toàn: nó có thể ăn mòn. Slide sau cho thấy chất chỉ thị.',
    },
  },

  // 10 ─ The answer: an indicator ────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Key words · the answer to your prediction',
    eyebrowVn: 'Từ khóa · đáp án cho dự đoán của em',
    title: 'Use an Indicator',
    titleVn: 'Dùng chất chỉ thị',
    ratio: 40,
    inlineSvg: DIAGRAMS.LITMUS_RULE,
    content: 'One dip, and the colour answers for you. Only the wet end changes.',
    contentVn: 'Một lần nhúng, và màu sắc trả lời thay em. Chỉ đầu bị ướt đổi màu.',
    notes: [
      keyWord(
        '**Indicator:** a substance that changes colour to show an acid or an alkali.\n**Litmus:** the simplest indicator. It comes as red paper and blue paper.',
        '**Chất chỉ thị (indicator):** chất đổi màu để cho biết đó là axit hay kiềm.\n**Quỳ (litmus):** chất chỉ thị đơn giản nhất. Có loại giấy đỏ và giấy xanh.',
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
    title: 'Real Litmus Paper',
    titleVn: 'Giấy quỳ thật',
    columns: [
      {
        heading: 'Blue paper in an acid',
        headingVn: 'Giấy xanh trong axit',
        accent: ACID,
        image: img('litmus-acid.jpg'),
        caption: 'The wet end went **red**. The dish held hydrochloric acid.',
        captionVn: 'Đầu ướt đã chuyển **đỏ**. Đĩa đựng axit clohiđric.',
      },
      {
        heading: 'Red paper in an alkali',
        headingVn: 'Giấy đỏ trong kiềm',
        accent: ALKALI,
        image: img('litmus-base.jpg'),
        caption: 'The wet end went **blue**. The dish held sodium hydroxide, an alkali.',
        captionVn: 'Đầu ướt đã chuyển **xanh**. Đĩa đựng natri hiđroxit, một chất kiềm.',
      },
    ],
    activity: {
      id: 'act_litmus_spot',
      type: 'hotspot',
      prompt: 'No words now. Tap the paper dipped in an ACID.',
      promptVn: 'Không còn chữ. Chạm vào tờ giấy đã nhúng vào AXIT.',
      svg: DIAGRAMS.LITMUS_RULE,
      viewBox: '0 0 840 620',
      targets: [
        { id: 'blue_dry', x: 160, y: 172, r: 62, name: 'Blue litmus, not dipped yet', nameVn: 'Giấy quỳ xanh, chưa nhúng' },
        { id: 'blue_acid', x: 664, y: 172, r: 62, name: 'Blue litmus with a red wet end', nameVn: 'Giấy quỳ xanh có đầu ướt màu đỏ' },
        { id: 'red_dry', x: 160, y: 460, r: 62, name: 'Red litmus, not dipped yet', nameVn: 'Giấy quỳ đỏ, chưa nhúng' },
        { id: 'red_alkali', x: 664, y: 460, r: 62, name: 'Red litmus with a blue wet end', nameVn: 'Giấy quỳ đỏ có đầu ướt màu xanh' },
      ],
      correct: 'blue_acid',
      explain: 'The **blue paper with a red wet end**, top right: an acid turns blue litmus red. Bottom right is the alkali — red turned blue.',
      explainVn: '**Tờ giấy xanh có đầu ướt màu đỏ**, trên bên phải: axit làm quỳ xanh chuyển đỏ. Dưới bên phải là kiềm — quỳ đỏ chuyển xanh.',
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
    title: 'Dip, Don’t Taste',
    titleVn: 'Nhúng, đừng nếm',
    image: img('soap.jpg'),
    caption: 'Now you have **blue** and **red** litmus paper. One glass is lemon juice; the other is soapy water. Dip both papers into the **soapy water**.',
    captionVn: 'Bây giờ em có giấy quỳ **xanh** và giấy quỳ **đỏ**. Một ly là nước chanh; ly kia là nước xà phòng. Nhúng cả hai tờ giấy vào **nước xà phòng**.',
    activity: {
      id: 'act_two_glasses',
      type: 'ph',
      ask: 'litmus',
      substance: 'soap',
      show: 'name',
      prompt: 'Soapy water: what does each litmus paper do?',
      promptVn: 'Nước xà phòng: mỗi loại giấy quỳ sẽ thế nào?',
      explain: 'Soapy water is an **alkali**, so **red litmus turns blue** and blue litmus stays blue. Lemon juice does the opposite: blue litmus turns red. Two dips tell the glasses apart — and nobody tastes anything.',
      explainVn: 'Nước xà phòng là **kiềm**, nên **giấy quỳ đỏ chuyển xanh**, còn giấy quỳ xanh vẫn xanh. Nước chanh thì ngược lại: giấy quỳ xanh chuyển đỏ. Hai lần nhúng là phân biệt được hai ly — mà không ai phải nếm.',
    },
  },

  // 13 ─ Red cabbage ──────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Leaf',
    eyebrow: 'An indicator from the kitchen',
    eyebrowVn: 'Một chất chỉ thị từ nhà bếp',
    title: 'Red Cabbage Works Too',
    titleVn: 'Bắp cải tím cũng được',
    image: img('cabbage.jpg'),
    caption: 'Boil red cabbage and keep the purple water: it changes colour in acids and alkalis, just like litmus. (Ask an adult to help with the boiling.)',
    captionVn: 'Luộc bắp cải tím rồi giữ lại phần nước tím: nó đổi màu trong axit và kiềm, giống hệt giấy quỳ. (Nhờ người lớn giúp khi đun sôi.)',
  },

  // 14 ─ Litmus is not enough + CHECK ─────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    title: 'Litmus Is Not Enough',
    titleVn: 'Giấy quỳ chưa đủ',
    ratio: 60,
    image: img('phrange.jpg'),
    content: 'Litmus says **which family**. It never says **how strong**.',
    contentVn: 'Giấy quỳ chỉ cho biết **thuộc nhóm nào**. Nó không cho biết **mạnh đến đâu**.',
    notes: [
      keyWord(
        '**Universal indicator:** an indicator that gives many colours, not just two.\n**pH scale:** numbers from 1 to 14 that say how strong an acid or an alkali is.\n**Neutral:** not an acid and not a base. Its pH is exactly 7.',
        '**Chất chỉ thị vạn năng (universal indicator):** chất chỉ thị cho nhiều màu, không chỉ hai màu.\n**Thang pH (pH scale):** các số từ 1 đến 14 cho biết axit hay kiềm mạnh đến mức nào.\n**Trung tính (neutral):** không phải axit, cũng không phải bazơ. pH đúng bằng 7.',
      ),
    ],
    check: {
      id: 'chk_universal',
      q: 'What can universal indicator tell you that litmus cannot?',
      qVn: 'Chất chỉ thị vạn năng cho em biết điều gì mà giấy quỳ không cho biết được?',
      options: [
        { val: 'A', text: 'How strong an acid or an alkali is', textVn: 'Axit hay kiềm mạnh đến mức nào' },
        { val: 'B', text: 'Whether the liquid is safe to drink', textVn: 'Chất lỏng có an toàn để uống không' },
        { val: 'C', text: 'The name of the liquid', textVn: 'Tên của chất lỏng' },
        { val: 'D', text: 'How hot the liquid is', textVn: 'Chất lỏng nóng đến mức nào' },
      ],
      correct: 'A',
      expEn: 'Universal indicator gives **many colours**, one for each number on the pH scale, so it shows **how strong**. Litmus has only two colours: acid or alkali. No indicator says a liquid is safe to drink (B), names it (C) or measures its temperature (D).',
      expVn: 'Chất chỉ thị vạn năng cho **nhiều màu**, mỗi màu ứng với một số trên thang pH, nên nó cho biết **mạnh đến mức nào**. Giấy quỳ chỉ có hai màu: axit hoặc kiềm. Không chất chỉ thị nào cho biết chất lỏng uống được (B), gọi tên nó (C) hay đo nhiệt độ của nó (D).',
    },
  },

  // 15 ─ The pH scale + CHECK (question 5) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Gauge',
    eyebrow: 'Fourteen numbers, three colours to remember',
    eyebrowVn: 'Mười bốn con số, ba màu cần nhớ',
    title: 'The pH Scale',
    titleVn: 'Thang pH',
    inlineSvg: DIAGRAMS.PH_SCALE,
    caption: 'Red is acid, green is neutral, blue and purple are alkali.',
    captionVn: 'Đỏ là axit, xanh lá là trung tính, xanh dương và tím là kiềm.',
    check: {
      id: 'chk_q5_litmus',
      q: 'Question 5: litmus cannot tell pH 8 from pH 13. Why not?',
      qVn: 'Câu 5: giấy quỳ không phân biệt được pH 8 với pH 13. Vì sao?',
      options: [
        { val: 'A', text: 'Both are acids, and litmus only shows alkalis', textVn: 'Cả hai là axit, mà giấy quỳ chỉ cho biết kiềm' },
        { val: 'B', text: 'Both are alkalis: both turn red litmus blue, and litmus has only two colours', textVn: 'Cả hai là kiềm: cả hai làm quỳ đỏ chuyển xanh, mà giấy quỳ chỉ có hai màu' },
        { val: 'C', text: 'pH 13 is too strong for litmus to change', textVn: 'pH 13 quá mạnh nên giấy quỳ không đổi màu' },
        { val: 'D', text: 'Litmus only works at pH 7', textVn: 'Giấy quỳ chỉ dùng được ở pH 7' },
      ],
      correct: 'B',
      expEn: 'pH 8 and pH 13 are both **above 7**, so both are alkalis, and both turn red litmus blue. With only two colours, litmus cannot say which is stronger. Universal indicator can: pH 8 is blue-green, pH 13 is purple. A has the family wrong, and C and D are not true — litmus changes at both.',
      expVn: 'pH 8 và pH 13 đều **lớn hơn 7**, nên cả hai là kiềm, và cả hai đều làm quỳ đỏ chuyển xanh. Chỉ có hai màu, giấy quỳ không thể cho biết chất nào mạnh hơn. Chất chỉ thị vạn năng thì được: pH 8 màu xanh ngọc, pH 13 màu tím. A sai nhóm, còn C và D không đúng — giấy quỳ đổi màu ở cả hai.',
    },
  },

  // 16 ─ The dipper ───────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Decide before you press',
    eyebrowVn: 'Quyết định trước khi bấm',
    title: 'Dip the Paper',
    titleVn: 'Nhúng giấy chỉ thị',
    widget: PhDipper,
    caption: 'Eleven liquids. Say acid, neutral or alkali before you dip — then watch the black box walk across the scale.',
    captionVn: 'Mười một chất lỏng. Nói axit, trung tính hay kiềm trước khi nhúng — rồi nhìn ô viền đen chạy dọc thang pH.',
  },

  // 17 ─ PH place: three of the eleven (a showcase, for the footer's room) ────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Remember the dipper',
    eyebrowVn: 'Nhớ lại phần nhúng giấy',
    title: 'Where Do They Go?',
    titleVn: 'Chúng nằm ở đâu?',
    image: img('phrange.jpg'),
    caption: 'Three of the eleven again — this time without their numbers. Within one of the right number counts.',
    captionVn: 'Ba trong mười một chất đó — lần này không có số. Lệch một số so với đáp án vẫn được tính.',
    activity: {
      id: 'act_place_three',
      type: 'ph',
      ask: 'place',
      substances: ['orange', 'sea', 'oven'],
      within: 1,
      prompt: 'Put orange juice, sea water and oven cleaner on the scale.',
      promptVn: 'Đặt nước cam, nước biển và nước tẩy lò lên thang pH.',
      explain: '**Orange juice is pH 4**: an acid, below 7. **Sea water is pH 8**: just above 7, so slightly alkaline — the surprise of the eleven. **Oven cleaner is pH 13**: a strong alkali, near the end of the scale.',
      explainVn: '**Nước cam có pH 4**: axit, nhỏ hơn 7. **Nước biển có pH 8**: chỉ lớn hơn 7 một chút, nên hơi kiềm — điều bất ngờ trong mười một chất. **Nước tẩy lò có pH 13**: kiềm mạnh, gần cuối thang.',
    },
  },

  // 18 ─ PREDICT: the vote — which one burns? ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Which One Burns Your Skin?',
    titleVn: 'Cái nào làm bỏng da em?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'One drop of **pH 1** and one drop of **pH 13** fall on your hand.',
    textVn: 'Một giọt **pH 1** và một giọt **pH 13** rơi lên tay em.',
    sub: 'Which one burns your skin?',
    subVn: 'Giọt nào làm bỏng da em?',
    activity: {
      id: 'act_predict_burns',
      type: 'predict',
      prompt: 'pH 1 or pH 13: which one burns your skin?',
      promptVn: 'pH 1 hay pH 13: cái nào làm bỏng da em?',
      options: [
        { val: 'acid', name: 'Only pH 1 — acids burn', nameVn: 'Chỉ pH 1 — axit mới gây bỏng' },
        { val: 'alkali', name: 'Only pH 13', nameVn: 'Chỉ pH 13' },
        { val: 'both', name: 'Both of them', nameVn: 'Cả hai' },
        { val: 'neither', name: 'Neither — one drop is too small', nameVn: 'Không cái nào — một giọt quá nhỏ' },
      ],
      correct: 'both',
      explain: '**Both.** pH 1 is a strong acid and pH 13 is a strong alkali — the two ends of the scale — and both are corrosive. Most people pick pH 1, because they were told acids burn. The next slide shows the alkali end.',
      explainVn: '**Cả hai.** pH 1 là axit mạnh và pH 13 là kiềm mạnh — hai đầu của thang — và cả hai đều ăn mòn. Đa số chọn pH 1, vì người ta hay nói axit gây bỏng. Slide sau cho thấy đầu kiềm.',
    },
  },

  // 19 ─ The answer: both ends ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'The answer to your prediction: both',
    eyebrowVn: 'Đáp án cho dự đoán của em: cả hai',
    title: 'A Strong Alkali Burns Too',
    titleVn: 'Kiềm mạnh cũng gây bỏng',
    inlineSvg: DIAGRAMS.BOTH_ENDS,
    caption: 'Oven cleaner is pH 13. That is why its bottle says **do not touch**.',
    captionVn: 'Nước tẩy lò có pH 13. Vì vậy trên chai mới ghi **không được chạm vào**.',
  },

  // 20 ─ PREDICT: Mr Bowen ate too much ───────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think · predict first',
    eyebrowVn: 'Suy nghĩ · dự đoán trước',
    title: 'Mr Bowen Ate Too Much',
    titleVn: 'Thầy Bowen ăn quá nhiều',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Two bowls of spicy noodles. Now his stomach has **too much acid**.',
    textVn: 'Hai tô mì cay. Giờ dạ dày thầy **thừa axit**.',
    sub: 'It hurts. What should he swallow?',
    subVn: 'Đang đau. Thầy nên uống gì?',
    activity: {
      id: 'act_predict_stomach',
      type: 'predict',
      prompt: 'Too much stomach acid. What should he swallow?',
      promptVn: 'Dạ dày thừa axit. Thầy nên uống gì?',
      options: [
        { val: 'lemon', name: 'A glass of lemon juice', nameVn: 'Một ly nước chanh' },
        { val: 'tablet', name: 'An indigestion tablet', nameVn: 'Một viên thuốc đau dạ dày' },
        { val: 'cola', name: 'A cold cola', nameVn: 'Một lon cô-ca lạnh' },
      ],
      correct: 'tablet',
      explain: '**An indigestion tablet.** It is a **base** — the opposite family — so it cancels out some of the acid. Lemon juice and cola are acids: they would add more acid to the problem. The next slide gives this a name.',
      explainVn: '**Một viên thuốc đau dạ dày.** Nó là **bazơ** — nhóm chất đối lập — nên nó triệt tiêu bớt axit. Nước chanh và cô-ca là axit: chúng chỉ thêm axit vào. Slide sau cho việc này một cái tên.',
    },
  },

  // 21 ─ Neutralisation ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'Key word · the answer to your prediction',
    eyebrowVn: 'Từ khóa · đáp án cho dự đoán của em',
    title: 'Cancel It Out',
    titleVn: 'Triệt tiêu lẫn nhau',
    ratio: 48,
    image: img('antacid.jpg'),
    content: 'The tablet is a **base**. It meets the acid, and the acid stops being an acid.',
    contentVn: 'Viên thuốc là một **bazơ**. Nó gặp axit, và axit không còn là axit nữa.',
    notes: [
      keyWord(
        '**Neutralisation:** an acid and a base cancel each other out and make something neutral.',
        '**Sự trung hòa (neutralisation):** axit và bazơ triệt tiêu lẫn nhau, tạo ra chất trung tính.',
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
    title: 'Acid + Alkali',
    titleVn: 'Axit + Kiềm',
    inlineSvg: DIAGRAMS.NEUTRALISE,
    caption: 'Neither side wins. They meet in the middle, at 7.',
    captionVn: 'Không bên nào thắng. Chúng gặp nhau ở giữa, tại 7.',
    activity: {
      id: 'act_drops_neutral',
      type: 'ph',
      ask: 'drops',
      pH: 3,
      prompt: 'This beaker holds an acid with universal indicator. Add alkali a drop at a time — and stop when it is neutral.',
      promptVn: 'Cốc này đựng axit có chất chỉ thị vạn năng. Nhỏ kiềm từng giọt một — và dừng khi đã trung tính.',
      explain: 'It took **4 drops**: pH 3 → 4 → 5 → 6 → 7, from orange through yellow to **green**. Green is neutral, so you stop there. One drop more and the alkali wins: the colour goes blue-green, pH 8.',
      explainVn: 'Cần **4 giọt**: pH 3 → 4 → 5 → 6 → 7, từ cam qua vàng đến **xanh lá**. Xanh lá là trung tính, nên em dừng ở đó. Thêm một giọt nữa thì kiềm thắng: màu chuyển xanh ngọc, pH 8.',
    },
  },

  // 23 ─ Neutralising every day + CHECK (question 6) ──────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Home',
    eyebrow: 'You have used it already',
    eyebrowVn: 'Em đã dùng nó rồi',
    title: 'Neutralising Every Day',
    titleVn: 'Trung hòa mỗi ngày',
    inlineSvg: DIAGRAMS.NEUTRAL_LIFE,
    caption: 'Each one adds the opposite family, on purpose. Farm lime is a white powder — not the fruit.',
    captionVn: 'Mỗi cách đều cố ý thêm nhóm chất đối lập. Vôi bón ruộng là bột trắng — không phải quả chanh.',
    check: {
      id: 'chk_q6_spill',
      q: 'Question 6: Mr Bowen spills acid on the bench. What should he put on it?',
      qVn: 'Câu 6: Thầy Bowen làm đổ axit ra bàn. Thầy nên đổ gì lên đó?',
      options: [
        { val: 'A', text: 'A base, such as baking soda — it neutralises the acid', textVn: 'Một bazơ, như bột nở — nó trung hòa axit' },
        { val: 'B', text: 'More acid, to wash it away', textVn: 'Thêm axit, để rửa trôi nó' },
        { val: 'C', text: 'Nothing — acid on a bench is safe', textVn: 'Không gì cả — axit trên bàn thì an toàn' },
        { val: 'D', text: 'Lemon juice, because it is natural', textVn: 'Nước chanh, vì nó tự nhiên' },
      ],
      correct: 'A',
      expEn: '**A base.** It neutralises the acid, just as the tablet does in a stomach. More acid (B) makes the spill worse, and so does lemon juice (D) — it is an acid too, natural or not. A spilt acid can be corrosive, so leaving it (C) is never safe.',
      expVn: '**Một bazơ.** Nó trung hòa axit, giống viên thuốc trong dạ dày. Thêm axit (B) làm tệ hơn, nước chanh (D) cũng vậy — nó cũng là axit, dù tự nhiên. Axit bị đổ có thể ăn mòn, nên để yên (C) không bao giờ an toàn.',
    },
  },

  // 24 ─ Questions 1–4 (5 and 6 were scored on slides 15 and 23) ─────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Check yourself · answer in your head, then check',
    eyebrowVn: 'Tự kiểm tra · trả lời trong đầu, rồi kiểm tra',
    title: 'Questions 1–4',
    titleVn: 'Câu hỏi 1–4',
    // One literal each, not '…' + '…': the narration reads only the first
    // literal of a concatenation, so questions 3 and 4 went unread.
    content: '> **1.** Vinegar has a pH of 3. Acid, neutral or alkali? **2.** Blue litmus turns red. What was it dipped in?\n> **3.** Which is the stronger acid: pH 2 or pH 5? **4.** Soap has a pH of 10. Name its family.',
    contentVn: '> **1.** Giấm có pH bằng 3. Axit, trung tính hay kiềm? **2.** Giấy quỳ xanh chuyển đỏ. Nó đã được nhúng vào gì?\n> **3.** Axit nào mạnh hơn: pH 2 hay pH 5? **4.** Xà phòng có pH bằng 10. Nó thuộc nhóm nào?',
    reveal: {
      label: 'Check 1–4',
      labelVn: 'Kiểm tra 1–4',
      answer: '**1.** An acid — 3 is below 7. **2.** An acid. **3.** pH 2: the smaller the number, the stronger the acid. **4.** An alkali — 10 is above 7.',
      answerVn: '**1.** Axit — 3 nhỏ hơn 7. **2.** Một axit. **3.** pH 2: số càng nhỏ, axit càng mạnh. **4.** Kiềm — 10 lớn hơn 7.',
    },
  },

  // 25 ─ Question 1 in colour: PH colour (a showcase, for the footer's room) ──
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'Question 1, in colour',
    eyebrowVn: 'Câu 1, bằng màu sắc',
    title: 'What Colour Is Vinegar?',
    titleVn: 'Giấm có màu gì?',
    inlineSvg: DIAGRAMS.ACIDS_ROUND,
    caption: 'Vinegar is one of the six acids. A few drops of universal indicator go into it.',
    captionVn: 'Giấm là một trong sáu axit. Nhỏ vài giọt chất chỉ thị vạn năng vào giấm.',
    activity: {
      id: 'act_vinegar_colour',
      type: 'ph',
      ask: 'colour',
      substance: 'vinegar',
      prompt: 'Question 1 in colour: which colour does universal indicator turn in vinegar?',
      promptVn: 'Câu 1 bằng màu sắc: chất chỉ thị vạn năng chuyển màu gì trong giấm?',
      explain: 'Vinegar is pH 3, so universal indicator turns **orange**: an acid, below 7. Red and orange are acids, green is neutral, blue and purple are alkalis.',
      explainVn: 'Giấm có pH 3, nên chất chỉ thị vạn năng chuyển **cam**: axit, nhỏ hơn 7. Đỏ và cam là axit, xanh lá là trung tính, xanh dương và tím là kiềm.',
    },
  },

  // 26 ─ Acid Snap, in order: ORDER ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'ListChecks',
    eyebrow: 'Acid Snap',
    eyebrowVn: 'Đoán nhanh axit',
    title: 'Most Acidic First',
    titleVn: 'Axit nhất đứng trước',
    label: 'Order it',
    labelVn: 'Sắp thứ tự',
    labelIcon: 'Sparkles',
    text: 'Five liquids. No numbers.',
    textVn: 'Năm chất lỏng. Không có số.',
    sub: 'Most acidic at the top.',
    subVn: 'Axit nhất ở trên cùng.',
    activity: {
      id: 'act_snap_order',
      type: 'order',
      prompt: 'Most acidic first. Put the five in order.',
      promptVn: 'Axit nhất trước. Sắp xếp năm chất theo thứ tự.',
      steps: [
        { id: 'battery', name: 'car battery acid', nameVn: 'axit ắc quy ô tô' },
        { id: 'tamarind', name: 'tamarind juice', nameVn: 'nước me' },
        { id: 'tap', name: 'tap water', nameVn: 'nước máy' },
        { id: 'toothpaste', name: 'toothpaste', nameVn: 'kem đánh răng' },
        { id: 'oven', name: 'oven cleaner', nameVn: 'nước tẩy lò' },
      ],
      explain: '**Car battery acid (pH 1) → tamarind (3) → tap water (7) → toothpaste (9) → oven cleaner (13).** The two you must never touch sit at the two ends. The food is a weak acid, tap water is neutral, and toothpaste is a weak base.',
      explainVn: '**Axit ắc quy (pH 1) → nước me (3) → nước máy (7) → kem đánh răng (9) → nước tẩy lò (13).** Hai thứ không bao giờ được chạm vào nằm ở hai đầu. Đồ ăn là axit yếu, nước máy trung tính, còn kem đánh răng là bazơ yếu.',
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
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: 'Next: the Vocab, then **pH Lab** — new liquids every time. At home, if you like: which kitchen labels say acid, and which alkali?',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Phòng thí nghiệm pH** — mỗi lần là chất lỏng mới. Ở nhà, nếu thích: nhãn chai nào trong bếp là axit, chai nào là kiềm?',
    items: [
      { text: 'Name three **acids** and three **bases**; say why you never taste in the lab.', textVn: 'Kể tên ba **axit** và ba **bazơ**; nói vì sao không nếm trong phòng thí nghiệm.' },
      { text: 'Use **litmus**: blue turns red in an acid, red turns blue in an alkali.', textVn: 'Dùng **giấy quỳ**: quỳ xanh chuyển đỏ trong axit, quỳ đỏ chuyển xanh trong kiềm.' },
      { text: 'Read the **pH scale**: below 7 acid, 7 neutral, above 7 alkali.', textVn: 'Đọc **thang pH**: nhỏ hơn 7 là axit, 7 trung tính, lớn hơn 7 là kiềm.' },
      { text: 'Explain what **neutralisation** does, and give a place it is used.', textVn: 'Giải thích **sự trung hòa** làm gì, và nêu một nơi nó được dùng.' },
    ],
    check: {
      id: 'chk_exit_toothpaste',
      q: 'Exit question: toothpaste is pH 9. Why do we brush AFTER eating?',
      qVn: 'Câu hỏi cuối bài: kem đánh răng có pH 9. Tại sao ta đánh răng SAU khi ăn?',
      options: [
        { val: 'A', text: 'Toothpaste is an acid, and more acid cleans the teeth', textVn: 'Kem đánh răng là axit, và thêm axit làm sạch răng' },
        { val: 'B', text: 'The acid from food is all gone after a meal', textVn: 'Axit từ thức ăn đã hết sau bữa ăn' },
        { val: 'C', text: 'Food leaves acid on your teeth; toothpaste is a base, so brushing neutralises it', textVn: 'Thức ăn để lại axit trên răng; kem đánh răng là bazơ, nên đánh răng trung hòa axit đó' },
        { val: 'D', text: 'pH 9 is neutral, so it just washes the food away', textVn: 'pH 9 là trung tính, nên nó chỉ rửa trôi thức ăn' },
      ],
      correct: 'C',
      expEn: 'Food leaves **acid** on your teeth. Toothpaste at pH 9 is above 7 — a **base** — so brushing **neutralises** that acid; before a meal there is no acid there yet. Toothpaste is not an acid (A) and not neutral (D), and the acid is not gone after a meal — it is just made (B).',
      expVn: 'Thức ăn để lại **axit** trên răng. Kem đánh răng có pH 9, lớn hơn 7 — là **bazơ** — nên đánh răng **trung hòa** axit đó; trước bữa ăn thì chưa có axit. Kem đánh răng không phải axit (A) và không trung tính (D), và axit không hết sau bữa ăn — nó vừa mới được tạo ra (B).',
    },
  },
];
