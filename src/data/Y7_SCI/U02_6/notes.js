// src/data/Y7_SCI/U02_6/notes.js
// 2.6 Compounds and Formulae — the self-study deck, reduced from the classroom
// lesson y7-science/U02_6 (Learner's Book pp. 57–63) to the density of the
// Extended/Additional Maths decks: the student DOES something every slide or
// two. 26 layout slides, 18 scored items — 9 activities (sort ×2, predict ×2,
// order, particles ×2, formula ×2) and 9 checks.
//
// SPINE (the classroom's, kept):
//   1–4    hero; symbols starter (sort); two dangerous elements, would you eat
//          them bonded? (predict); you already eat it — salt
//   5–8    key words: compound, bonding (the model kit), sodium chloride (the
//          Phú Yên salt field), totally new properties (+ book Qs 1–2)
//   9–14   naming: spot the change, the -ide rule (order), book Qs 3–6, the -ate
//          rule (sort), Name the Compound widget, Ha Long Bay (book Qs 7–9)
//   15–19  particles: mono and di, is O₂ a compound? (predict), four particles,
//          element or compound boxes (particles), the four for real
//   20–23  formulae: formula, Read the Formula widget, write the formula of a
//          drawn particle (formula), book Qs 10–11 (particles find)
//   24–26  book Qs 12–13 and 14–17 (checks, the rest in reveals); the checklist
//          with the exit question (formula count, CaCO₃)
//
// Every classroom-only move is gone: the partner symbol test is the sort on
// slide 2; the two hand votes are predicts; the Element or Compound? room game
// is the two `particles` activities; the Draw This of four particles, the
// homework (paper models) and the "Lesson Complete" exit hero are cut. Chemical
// names stay in English in the Vietnamese text, as in the classroom deck, with
// the Vietnamese name in brackets where it helps. Formulae in slide text use
// Unicode subscripts (CO₂); activity `formula`/`boxes` fields are ASCII (CO2).
// The key-word panels keep the classroom's write-note style but carry a
// "Remember this" badge instead of the tone's default "Write This Down" /
// "Chép vào vở": a student alone with a tablet is not told to copy into a
// notebook. A slide's `check:` or `activity:` block is always its LAST key,
// and no slide carries both.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as PHOTOS } from './diagramsB.js';
import { NameCompound, FormulaReader } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_6/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 2 · 2.6',
    eyebrowVn: 'Chương 2 · 2.6',
    title: 'Compounds & Formulae',
    titleVn: 'Hợp chất & Công thức hóa học',
    objective: 'Explain the difference between an element and a compound, name compounds with -ide and -ate and the prefixes mono and di, and read a formula to say which elements and how many atoms.',
    objectiveVn: 'Giải thích sự khác nhau giữa nguyên tố và hợp chất, gọi tên hợp chất với đuôi -ide, -ate và tiền tố mono, di, và đọc công thức hóa học để biết có những nguyên tố nào và bao nhiêu nguyên tử.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **sort**, **predict**, **count** and **name** your way through it. **18 things are scored** — the first one is on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán**, **đếm** và **gọi tên** trong suốt bài học. **18 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: SORT — the symbols from 2.5 ───────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Warm up · symbols from 2.5',
    eyebrowVn: 'Khởi động · kí hiệu từ bài 2.5',
    title: 'Six Symbols You Will Need Today',
    titleVn: 'Sáu kí hiệu em cần hôm nay',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: 'Every element has a **symbol**: one capital letter, or a capital and a small letter.',
    textVn: 'Mỗi nguyên tố có một **kí hiệu**: một chữ in hoa, hoặc một chữ in hoa và một chữ thường.',
    sub: 'Put each element under its symbol. Watch out for **C** and **Ca**.',
    subVn: 'Đặt mỗi nguyên tố vào đúng kí hiệu của nó. Cẩn thận với **C** và **Ca**.',
    activity: {
      id: 'act_symbols', type: 'sort',
      prompt: 'Match each element to its symbol.',
      promptVn: 'Ghép mỗi nguyên tố với kí hiệu của nó.',
      bins: [
        { id: 'Na', name: 'Na', nameVn: 'Na' },
        { id: 'Cl', name: 'Cl', nameVn: 'Cl' },
        { id: 'C', name: 'C', nameVn: 'C' },
        { id: 'Ca', name: 'Ca', nameVn: 'Ca' },
        { id: 'O', name: 'O', nameVn: 'O' },
        { id: 'H', name: 'H', nameVn: 'H' },
      ],
      cards: [
        { id: 'sodium', name: 'sodium', nameVn: 'sodium (natri)', bin: 'Na' },
        { id: 'chlorine', name: 'chlorine', nameVn: 'chlorine (clo)', bin: 'Cl' },
        { id: 'carbon', name: 'carbon', nameVn: 'carbon (cacbon)', bin: 'C' },
        { id: 'calcium', name: 'calcium', nameVn: 'calcium (canxi)', bin: 'Ca' },
        { id: 'oxygen', name: 'oxygen', nameVn: 'oxygen (oxi)', bin: 'O' },
        { id: 'hydrogen', name: 'hydrogen', nameVn: 'hydrogen (hiđro)', bin: 'H' },
      ],
      explain: '**Na** is sodium — from its Latin name, natrium. **C** is carbon and **Ca** is calcium: one small letter makes a different element. You will read all six in today’s formulae.',
      explainVn: '**Na** là sodium (natri) — từ tên Latin natrium. **C** là carbon (cacbon) còn **Ca** là calcium (canxi): chỉ một chữ thường đã là một nguyên tố khác. Hôm nay em sẽ đọc cả sáu kí hiệu này trong các công thức.',
    },
  },

  // 3 ─ Two dangerous elements + PREDICT: would you eat them bonded? ───────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Two elements · decide before you go on',
    eyebrowVn: 'Hai nguyên tố · quyết định trước khi đi tiếp',
    title: 'Two Dangerous Elements',
    titleVn: 'Hai nguyên tố nguy hiểm',
    inlineSvg: PHOTOS.TWO_DANGERS,
    caption: 'Sodium bursts into flame in water. Chlorine is a poisonous gas. Now bond them together.',
    captionVn: 'Sodium (natri) bốc cháy trong nước. Chlorine (clo) là một chất khí độc. Bây giờ hãy cho chúng liên kết với nhau.',
    activity: {
      id: 'act_eat_it', type: 'predict',
      prompt: 'Sodium and chlorine, bonded together. Would you eat it?',
      promptVn: 'Sodium và chlorine, liên kết với nhau. Em có dám ăn không?',
      options: [
        { val: 'burn', name: 'No — it would burst into flame', nameVn: 'Không — nó sẽ bốc cháy' },
        { val: 'poison', name: 'No — it would poison me', nameVn: 'Không — nó sẽ làm em ngộ độc' },
        { val: 'yes', name: 'Yes — it is safe to eat', nameVn: 'Có — nó ăn được' },
      ],
      explain: '**Yes!** Bonded together, sodium and chlorine make **sodium chloride** — table salt. The next slide shows it.',
      explainVn: '**Có!** Khi liên kết với nhau, sodium và chlorine tạo thành **sodium chloride** — muối ăn. Slide sau sẽ cho em thấy.',
    },
  },

  // 4 ─ The answer: you already eat it ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'The answer · Learner’s Book, page 58',
    eyebrowVn: 'Đáp án · Sách học sinh, trang 58',
    title: 'You Already Eat It',
    titleVn: 'Em đã ăn nó rồi',
    inlineSvg: PHOTOS.SALT_MADE,
    caption: '**Yes!** Sodium chloride is **salt**. You probably ate some today.',
    captionVn: '**Có!** Sodium chloride là **muối ăn**. Có lẽ hôm nay em đã ăn rồi.',
  },

  // 5 ─ Compound + CHECK ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Compound',
    titleVn: 'Hợp chất',
    ratio: 42,
    inlineSvg: DIAGRAMS.ELEMENT_COMPOUND,
    content:
      'Remember: an **element** has only one kind of atom. Gold is only gold atoms.\n\n' +
      'Salt has **two** kinds of atom — sodium and chlorine — joined together. That makes it a **compound**.',
    contentVn:
      'Nhớ lại: một **nguyên tố** chỉ có một loại nguyên tử. Vàng chỉ gồm các nguyên tử vàng.\n\n' +
      'Muối ăn có **hai** loại nguyên tử — sodium và chlorine — gắn với nhau. Vì thế nó là một **hợp chất**.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: '**Compound:** a substance made of different kinds of atom bonded together.',
        textVn: '**Hợp chất (compound):** một chất gồm các loại nguyên tử khác nhau liên kết với nhau.',
      },
    ],
    check: {
      id: 'chk_compound',
      q: 'Which of these is a compound?',
      qVn: 'Chất nào dưới đây là hợp chất?',
      options: [
        { val: 'A', text: 'Gold — only gold atoms', textVn: 'Vàng — chỉ có nguyên tử vàng' },
        { val: 'B', text: 'Oxygen gas — only oxygen atoms', textVn: 'Khí oxi — chỉ có nguyên tử oxi' },
        { val: 'C', text: 'Water — hydrogen and oxygen atoms bonded together', textVn: 'Nước — nguyên tử hiđro và oxi liên kết với nhau' },
        { val: 'D', text: 'Sodium metal — only sodium atoms', textVn: 'Kim loại natri — chỉ có nguyên tử natri' },
      ],
      correct: 'C',
      expEn: '**Water** has two different kinds of atom, hydrogen and oxygen, bonded together — a compound. Gold, oxygen gas and sodium each have only **one** kind of atom, so they are elements.',
      expVn: '**Nước** có hai loại nguyên tử khác nhau, hiđro và oxi, liên kết với nhau — một hợp chất. Vàng, khí oxi và natri mỗi chất chỉ có **một** loại nguyên tử, nên chúng là nguyên tố.',
    },
  },

  // 6 ─ Bonding ─────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Atom',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Bonding',
    titleVn: 'Liên kết',
    ratio: 42,
    inlineSvg: PHOTOS.BONDING_REAL,
    content:
      'A model kit shows atoms as coloured balls.\n\n' +
      'At the top, the balls are **loose**. At the bottom, sticks join them: the atoms are **bonded**, and they stay together as one particle.',
    contentVn:
      'Bộ mô hình biểu diễn nguyên tử bằng các quả bóng màu.\n\n' +
      'Ở trên, các quả bóng **rời nhau**. Ở dưới, các que nối chúng lại: các nguyên tử đã **liên kết**, và chúng ở cùng nhau thành một hạt.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: '**Bonding:** atoms joining tightly together.',
        textVn: '**Liên kết (bonding):** các nguyên tử gắn chặt với nhau.',
      },
    ],
  },

  // 7 ─ Sodium chloride, from a Vietnamese salt field + CHECK ───────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Sodium Chloride',
    titleVn: 'Natri clorua',
    ratio: 45,
    image: img('saltfield.jpg'),
    content:
      'Phú Yên, Vietnam: salt from the sea.\n\n' +
      'The sea water dries in the sun and leaves white crystals behind. Every crystal is sodium chloride.',
    contentVn:
      'Phú Yên, Việt Nam: muối từ biển.\n\n' +
      'Nước biển khô dưới nắng và để lại những tinh thể màu trắng. Mỗi tinh thể đều là sodium chloride.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: '**Sodium chloride:** the compound of sodium and chlorine. Its everyday name is **salt**.',
        textVn: '**Natri clorua (sodium chloride):** hợp chất của natri và clo. Tên thường gọi là **muối ăn**.',
      },
    ],
    check: {
      id: 'chk_nacl',
      q: 'What is sodium chloride made of?',
      qVn: 'Sodium chloride được tạo nên từ gì?',
      options: [
        { val: 'A', text: 'Sodium atoms only', textVn: 'Chỉ có nguyên tử natri' },
        { val: 'B', text: 'Sodium atoms and chlorine atoms, bonded together', textVn: 'Nguyên tử natri và nguyên tử clo, liên kết với nhau' },
        { val: 'C', text: 'Chlorine atoms only', textVn: 'Chỉ có nguyên tử clo' },
        { val: 'D', text: 'Sodium, chlorine and oxygen atoms', textVn: 'Nguyên tử natri, clo và oxi' },
      ],
      correct: 'B',
      expEn: 'The name has two parts: **sodium** and **chlor**ide, from chlorine. Two kinds of atom, bonded — a compound. One kind only (A or C) would be an element, and nothing in the name says oxygen (D).',
      expVn: 'Tên có hai phần: **sodium** và **chlor**ide, từ chlorine. Hai loại nguyên tử, liên kết với nhau — một hợp chất. Chỉ một loại (A hoặc C) sẽ là nguyên tố, và không có phần nào trong tên nói đến oxi (D).',
    },
  },

  // 8 ─ Totally new properties (book Questions 1–2) + CHECK ────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Compare · Learner’s Book Questions 1–2',
    eyebrowVn: 'So sánh · Sách học sinh câu 1–2',
    title: 'Totally New Properties',
    titleVn: 'Tính chất hoàn toàn mới',
    ratio: 45,
    inlineSvg: DIAGRAMS.NEW_PROPERTIES,
    content:
      'Sodium is a shiny metal. Chlorine is a yellow-green gas. Neither is safe to eat.\n\n' +
      '**Questions 1–2:** give two ways sodium chloride is different from **sodium**, and two ways it is different from **chlorine**. Say them out loud, then press Check.',
    contentVn:
      'Sodium là một kim loại sáng bóng. Chlorine là một chất khí màu vàng lục. Cả hai đều không ăn được.\n\n' +
      '**Câu 1–2:** nêu hai điểm sodium chloride khác với **sodium**, và hai điểm nó khác với **chlorine**. Nói to câu trả lời, rồi bấm Kiểm tra.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: 'A compound has **new properties**. It is not like the elements it is made from.',
        textVn: 'Hợp chất có **tính chất mới**. Nó không giống các nguyên tố tạo nên nó.',
      },
    ],
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**1.** Sodium: shiny metal, bursts into flame in water, not safe to eat. Salt: white crystals, dissolves in water, safe to eat.\n**2.** Chlorine: yellow-green gas, poisonous. Salt: white solid, safe to eat.',
      answerVn: '**1.** Natri: kim loại sáng bóng, bốc cháy trong nước, không ăn được. Muối: tinh thể trắng, tan trong nước, ăn được.\n**2.** Clo: khí màu vàng lục, độc. Muối: chất rắn màu trắng, ăn được.',
    },
    check: {
      id: 'chk_properties',
      q: 'Salt is sodium and chlorine bonded together. Which sentence is true?',
      qVn: 'Muối ăn là sodium và chlorine liên kết với nhau. Câu nào đúng?',
      options: [
        { val: 'A', text: 'Salt has new properties: white crystals that are safe to eat', textVn: 'Muối có tính chất mới: tinh thể trắng và ăn được' },
        { val: 'B', text: 'Salt is a shiny metal, like sodium', textVn: 'Muối là một kim loại sáng bóng, giống natri' },
        { val: 'C', text: 'Salt is poisonous, like chlorine', textVn: 'Muối độc, giống clo' },
        { val: 'D', text: 'Salt keeps a little of both: a shiny, poisonous solid', textVn: 'Muối giữ một chút của cả hai: một chất rắn sáng bóng và độc' },
      ],
      correct: 'A',
      expEn: 'A compound has **new properties** — nothing like the elements it is made from. B, C and D all think salt keeps the properties of sodium or chlorine. It does not: you sprinkle it on your food.',
      expVn: 'Hợp chất có **tính chất mới** — hoàn toàn không giống các nguyên tố tạo nên nó. B, C và D đều cho rằng muối giữ tính chất của natri hoặc clo. Không phải vậy: em rắc muối lên thức ăn mà.',
    },
  },

  // 9 ─ Spot the change + CHECK ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    title: 'Spot the Change',
    titleVn: 'Tìm chỗ thay đổi',
    text: 'sodium + chlorine → sodium chloride',
    textVn: 'sodium + chlorine → sodium chloride',
    sub: 'The two elements became one name. One word changed on the way. Which part?',
    subVn: 'Hai nguyên tố trở thành một cái tên. Trên đường đi, một từ đã thay đổi. Phần nào?',
    check: {
      id: 'chk_spot_change',
      q: 'sodium + chlorine → sodium chloride. What changed?',
      qVn: 'sodium + chlorine → sodium chloride. Cái gì đã thay đổi?',
      options: [
        { val: 'A', text: 'sodium became “sodide”', textVn: 'sodium thành “sodide”' },
        { val: 'B', text: 'chlorine became chloride: its ending changed to -ide', textVn: 'chlorine thành chloride: đuôi của nó đổi thành -ide' },
        { val: 'C', text: 'Both words changed their endings', textVn: 'Cả hai từ đều đổi đuôi' },
        { val: 'D', text: 'The two words swapped places', textVn: 'Hai từ đổi chỗ cho nhau' },
      ],
      correct: 'B',
      expEn: 'chlor**ine** became chlor**ide**. The metal, **sodium**, keeps its name and stays first (so not A, C or D). That is the naming rule on the next slide.',
      expVn: 'chlor**ine** thành chlor**ide**. Kim loại **sodium** giữ nguyên tên và vẫn đứng trước (nên không phải A, C hay D). Đó là quy tắc gọi tên ở slide sau.',
    },
  },

  // 10 ─ The -ide rule + ORDER ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Learner’s Book, page 59',
    eyebrowVn: 'Sách học sinh, trang 59',
    title: 'Naming Compounds',
    titleVn: 'Gọi tên hợp chất',
    ratio: 42,
    inlineSvg: DIAGRAMS.NAME_RULE,
    content:
      'The name tells you the elements.\n\n' +
      'The **metal** keeps its name and comes first. The **non-metal** changes its ending to **-ide**: oxygen → oxide, sulfur → sulfide, chlorine → chloride.',
    contentVn:
      'Tên cho em biết các nguyên tố.\n\n' +
      '**Kim loại** giữ nguyên tên và đứng trước. **Phi kim** đổi đuôi thành **-ide**: oxygen → oxide, sulfur → sulfide, chlorine → chloride.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: '**Naming a compound:** the metal comes first. The non-metal ends in **-ide**.',
        textVn: '**Gọi tên hợp chất:** kim loại đứng trước. Phi kim có đuôi **-ide**.',
      },
    ],
    activity: {
      id: 'act_name_steps', type: 'order',
      prompt: 'A compound is made of sulfur and potassium. Put the naming steps in order.',
      promptVn: 'Một hợp chất gồm sulfur và potassium. Sắp xếp các bước gọi tên theo đúng thứ tự.',
      steps: [
        { id: 'metal', name: 'Write the metal first: potassium', nameVn: 'Viết kim loại trước: potassium' },
        { id: 'nonmetal', name: 'Then the non-metal: sulfur', nameVn: 'Rồi đến phi kim: sulfur' },
        { id: 'ending', name: 'Change its ending to -ide: sulfur → sulfide', nameVn: 'Đổi đuôi của nó thành -ide: sulfur → sulfide' },
        { id: 'name', name: 'Read the whole name: potassium sulfide', nameVn: 'Đọc cả tên: potassium sulfide' },
      ],
      explain: 'Metal first, then the non-metal with an **-ide** ending: **potassium sulfide**. The question said sulfur first — the rule, not the question, decides the order.',
      explainVn: 'Kim loại trước, rồi phi kim với đuôi **-ide**: **potassium sulfide** (kali sunfua). Câu hỏi nói sulfur trước — nhưng quy tắc, chứ không phải câu hỏi, quyết định thứ tự.',
    },
  },

  // 11 ─ Book questions 3–6 + CHECK (Q6) ───────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 59',
    eyebrowVn: 'Sách học sinh, trang 59',
    title: 'Questions 3–6',
    titleVn: 'Câu hỏi 3–6',
    content:
      '> Which **two** elements are combined in… **3.** sodium chloride? **4.** hydrogen sulfide? **5.** magnesium oxide?\n\n' +
      'Say your answers out loud, then press Check. **Question 6** is scored below.',
    contentVn:
      '> Hai nguyên tố nào kết hợp trong… **3.** sodium chloride? **4.** hydrogen sulfide? **5.** magnesium oxide?\n\n' +
      'Nói to câu trả lời, rồi bấm Kiểm tra. **Câu 6** được tính điểm ở dưới.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**3.** sodium and chlorine · **4.** hydrogen and sulfur · **5.** magnesium and oxygen',
      answerVn: '**3.** sodium và chlorine · **4.** hydrogen và sulfur · **5.** magnesium và oxygen',
    },
    check: {
      id: 'chk_q6',
      q: 'Question 6: a compound of calcium and sulfur was named “sulfur calcium”. What is the correct name?',
      qVn: 'Câu 6: một hợp chất của calcium và sulfur bị gọi là “sulfur calcium”. Tên đúng là gì?',
      options: [
        { val: 'A', text: 'sulfur calcide', textVn: 'sulfur calcide' },
        { val: 'B', text: 'calcium sulfur', textVn: 'calcium sulfur' },
        { val: 'C', text: 'calcium sulfate', textVn: 'calcium sulfate' },
        { val: 'D', text: 'calcium sulfide', textVn: 'calcium sulfide' },
      ],
      correct: 'D',
      expEn: 'The metal comes first — **calcium** — and the non-metal ends in -ide — **sulfide**. A changes the metal’s ending; B forgets the -ide; C is **-ate**, which would mean oxygen is in it too.',
      expVn: 'Kim loại đứng trước — **calcium** — và phi kim có đuôi -ide — **sulfide**. A đổi đuôi của kim loại; B quên đuôi -ide; C là **-ate**, nghĩa là trong đó có cả oxi.',
    },
  },

  // 12 ─ The -ate rule + SORT (-ide or -ate) ────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Learner’s Book, page 59',
    eyebrowVn: 'Sách học sinh, trang 59',
    title: 'Names Ending in -ate',
    titleVn: 'Tên có đuôi -ate',
    ratio: 42,
    image: img('coppersulfate.jpg'),
    content:
      'Copper sulfate: copper, sulfur **and oxygen**.\n\n' +
      'Three elements — but the name only shows two. The **-ate** ending tells you oxygen is there too.',
    contentVn:
      'Copper sulfate (đồng sunfat): đồng, lưu huỳnh **và oxi**.\n\n' +
      'Ba nguyên tố — nhưng tên chỉ cho thấy hai. Đuôi **-ate** cho em biết trong đó còn có oxi.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: 'Two elements **plus oxygen**: the name often ends in **-ate**.\ncalcium + carbon + oxygen → calcium carbonate',
        textVn: 'Hai nguyên tố **cộng với oxi**: tên thường có đuôi **-ate**.\ncalcium + carbon + oxygen → calcium carbonate',
      },
    ],
    activity: {
      id: 'act_ide_ate', type: 'sort',
      prompt: 'Sort the names: two elements (-ide), or two elements plus oxygen (-ate)?',
      promptVn: 'Sắp xếp các tên: hai nguyên tố (-ide), hay hai nguyên tố cộng với oxi (-ate)?',
      bins: [
        { id: 'ide', name: '-ide · two elements', nameVn: '-ide · hai nguyên tố' },
        { id: 'ate', name: '-ate · two elements + oxygen', nameVn: '-ate · hai nguyên tố + oxi' },
      ],
      cards: [
        { id: 'nacl', name: 'sodium chloride', nameVn: 'sodium chloride', bin: 'ide' },
        { id: 'mgo', name: 'magnesium oxide', nameVn: 'magnesium oxide', bin: 'ide' },
        { id: 'h2s', name: 'hydrogen sulfide', nameVn: 'hydrogen sulfide', bin: 'ide' },
        { id: 'cao', name: 'calcium oxide', nameVn: 'calcium oxide', bin: 'ide' },
        { id: 'cuso4', name: 'copper sulfate', nameVn: 'copper sulfate', bin: 'ate' },
        { id: 'caco3', name: 'calcium carbonate', nameVn: 'calcium carbonate', bin: 'ate' },
        { id: 'kno3', name: 'potassium nitrate', nameVn: 'potassium nitrate', bin: 'ate' },
        { id: 'li2so4', name: 'lithium sulfate', nameVn: 'lithium sulfate', bin: 'ate' },
      ],
      explain: 'Read the **ending**. -ide: just the two elements (hydrogen **sulfide** is hydrogen and sulfur). -ate: the two elements **and oxygen** (copper **sulfate** is copper, sulfur and oxygen). Sulfide and sulfate look alike — the ending decides whether oxygen is there.',
      explainVn: 'Đọc **đuôi** của tên. -ide: chỉ có hai nguyên tố (hydrogen **sulfide** là hiđro và lưu huỳnh). -ate: hai nguyên tố **và oxi** (copper **sulfate** là đồng, lưu huỳnh và oxi). Sulfide và sulfate chỉ khác nhau ở đuôi — và đuôi -ate có nghĩa là có oxi.',
    },
  },

  // 13 ─ Name the Compound (widget) ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Say the name out loud, then press Show',
    eyebrowVn: 'Nói to tên hợp chất, rồi bấm Hiện tên',
    title: 'Name the Compound',
    titleVn: 'Gọi tên hợp chất',
    widget: NameCompound,
    caption: 'Yellow boxes are metals. Blue boxes are non-metals. Nine cards — try all of them.',
    captionVn: 'Ô vàng là kim loại. Ô xanh là phi kim. Chín thẻ — hãy thử hết.',
  },

  // 14 ─ Ha Long Bay: book questions 7–9 + CHECK (Q7) ──────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 60',
    eyebrowVn: 'Sách học sinh, trang 60',
    title: 'Questions 7–9',
    titleVn: 'Câu hỏi 7–9',
    ratio: 50,
    image: img('halong.jpg'),
    content:
      'Ha Long Bay’s rocks are **calcium carbonate**: calcium, carbon — and the -ate adds **oxygen**.\n\n' +
      '> Which **three** elements are combined in… **8.** magnesium carbonate? **9.** lithium sulfate?\n\n' +
      'Say them out loud, then press Check. **Question 7** is scored below.',
    contentVn:
      'Đá ở vịnh Hạ Long là **calcium carbonate** (canxi cacbonat): canxi, cacbon — và đuôi -ate thêm **oxi**.\n\n' +
      '> Ba nguyên tố nào kết hợp trong… **8.** magnesium carbonate? **9.** lithium sulfate?\n\n' +
      'Nói to câu trả lời, rồi bấm Kiểm tra. **Câu 7** được tính điểm ở dưới.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**8.** magnesium, carbon and oxygen · **9.** lithium, sulfur and oxygen',
      answerVn: '**8.** magnesium, carbon và oxygen · **9.** lithium, sulfur và oxygen',
    },
    check: {
      id: 'chk_q7',
      q: 'Question 7: which three elements are combined in calcium nitrate?',
      qVn: 'Câu 7: ba nguyên tố nào kết hợp trong calcium nitrate?',
      options: [
        { val: 'A', text: 'calcium, nitrogen and oxygen', textVn: 'calcium, nitrogen và oxygen' },
        { val: 'B', text: 'calcium and nitrogen only', textVn: 'chỉ calcium và nitrogen' },
        { val: 'C', text: 'carbon, nitrogen and oxygen', textVn: 'carbon, nitrogen và oxygen' },
        { val: 'D', text: 'calcium, sodium and oxygen', textVn: 'calcium, sodium và oxygen' },
      ],
      correct: 'A',
      expEn: '**Calcium**, **nitr**ogen, and the **-ate** adds **oxygen**. B forgets what -ate means; C mixes up calcium with carbon; nitrate comes from nitrogen, not sodium (D).',
      expVn: '**Calcium**, **nitr**ogen, và đuôi **-ate** thêm **oxygen**. B quên ý nghĩa của -ate; C nhầm calcium với carbon; nitrate đến từ nitrogen, không phải sodium (D).',
    },
  },

  // 15 ─ Mono and di ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    title: 'Mono and Di',
    titleVn: 'Mono và Di',
    ratio: 42,
    inlineSvg: DIAGRAMS.PREFIXES,
    content:
      'Count the oxygen atoms.\n\n' +
      'Carbon and oxygen make **two** compounds. The name has to tell them apart, so it counts the oxygen atoms: **mon**oxide has one, **di**oxide has two.',
    contentVn:
      'Đếm số nguyên tử oxi.\n\n' +
      'Cacbon và oxi tạo nên **hai** hợp chất. Tên phải phân biệt được chúng, nên nó đếm số nguyên tử oxi: **mon**oxide có một, **di**oxide có hai.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: '**mono** = one, **di** = two\ncarbon monoxide = CO, carbon dioxide = CO₂',
        textVn: '**mono** = một, **di** = hai\ncarbon monoxide = CO, carbon dioxide = CO₂',
      },
    ],
  },

  // 16 ─ PREDICT: is oxygen a compound? ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    title: 'Is Oxygen a Compound?',
    titleVn: 'Oxi có phải hợp chất?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Oxygen, **O₂**, has **two atoms** in every particle.',
    textVn: 'Oxi, **O₂**, có **hai nguyên tử** trong mỗi hạt.',
    sub: 'Look back at the word compound. Element or compound? The next slide shows the answer.',
    subVn: 'Nhớ lại từ hợp chất. Nguyên tố hay hợp chất? Slide sau có đáp án.',
    activity: {
      id: 'act_o2', type: 'predict',
      prompt: 'O₂ has two atoms. Is it an element or a compound?',
      promptVn: 'O₂ có hai nguyên tử. Nó là nguyên tố hay hợp chất?',
      options: [
        { val: 'element', name: 'An element', nameVn: 'Một nguyên tố' },
        { val: 'compound', name: 'A compound', nameVn: 'Một hợp chất' },
      ],
      correct: 'element',
      explain: '**An element.** Both atoms are oxygen: one kind of atom. Two atoms does not make a compound — two **kinds** of atom does.',
      explainVn: '**Một nguyên tố.** Cả hai nguyên tử đều là oxi: một loại nguyên tử. Hai nguyên tử không làm nên hợp chất — hai **loại** nguyên tử mới làm nên hợp chất.',
    },
  },

  // 17 ─ Four particles (the answer) ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Atom',
    eyebrow: 'The answer · Learner’s Book, page 60',
    eyebrowVn: 'Đáp án · Sách học sinh, trang 60',
    title: 'Four Particles',
    titleVn: 'Bốn loại hạt',
    inlineSvg: DIAGRAMS.PARTICLES,
    caption: '**O₂ is an element**: both atoms are oxygen. CO₂, H₂O and CH₄ are compounds: two kinds of atom, bonded.',
    captionVn: '**O₂ là nguyên tố**: cả hai nguyên tử đều là oxi. CO₂, H₂O và CH₄ là hợp chất: hai loại nguyên tử, liên kết với nhau.',
  },

  // 18 ─ Element or compound? PARTICLES (kind) ──────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Count the kinds, not the atoms',
    eyebrowVn: 'Đếm số loại, không đếm số nguyên tử',
    title: 'Element or Compound?',
    titleVn: 'Nguyên tố hay hợp chất?',
    label: 'Decide',
    labelVn: 'Quyết định',
    labelIcon: 'MousePointerClick',
    text: 'Two atoms is not the test. **Two kinds of atom** is.',
    textVn: 'Hai nguyên tử không phải là phép thử. **Hai loại nguyên tử** mới là phép thử.',
    sub: 'Each colour is one kind of atom. One colour in a particle: element. Two colours bonded: compound.',
    subVn: 'Mỗi màu là một loại nguyên tử. Một màu trong một hạt: nguyên tố. Hai màu liên kết với nhau: hợp chất.',
    activity: {
      id: 'act_boxes_kind', type: 'particles', ask: 'kind',
      prompt: 'Is each box an element or a compound?',
      promptVn: 'Mỗi hộp là nguyên tố hay hợp chất?',
      boxes: [
        ['N2', 'N2', 'N2', 'N2', 'N2'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O'],
        ['Cl2', 'Cl2', 'Cl2', 'Cl2'],
        ['CH4', 'CH4', 'CH4', 'CH4'],
      ],
      choices: ['element', 'compound'],
      explain: 'Nitrogen (N₂) and chlorine (Cl₂): two atoms, but both the **same** kind — elements. Water (H₂O) and methane (CH₄): **two kinds** of atom bonded — compounds.',
      explainVn: 'Nitơ (N₂) và clo (Cl₂): hai nguyên tử, nhưng **cùng** một loại — nguyên tố. Nước (H₂O) và metan (CH₄): **hai loại** nguyên tử liên kết — hợp chất.',
    },
  },

  // 19 ─ The particles, for real ────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The same four, for real',
    eyebrowVn: 'Vẫn bốn chất đó, ngoài đời thật',
    title: 'The Particles, for Real',
    titleVn: 'Các hạt ngoài đời thật',
    inlineSvg: PHOTOS.PARTICLES_REAL,
    caption: 'Dry ice is frozen carbon dioxide. Cooking gas is mostly methane. Each photo holds billions of the particles you just sorted.',
    captionVn: 'Đá khô là cacbon đioxit đông lạnh. Khí gas nấu ăn chủ yếu là metan. Mỗi bức ảnh chứa hàng tỉ hạt như những hạt em vừa phân loại.',
  },

  // 20 ─ Formula + CHECK ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Key word · Learner’s Book, page 61',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 61',
    title: 'Formula',
    titleVn: 'Công thức hóa học',
    ratio: 42,
    inlineSvg: DIAGRAMS.FORMULA_READ,
    content:
      'A formula is a short way to write a particle.\n\n' +
      'Salt has a formula too: **NaCl** — one sodium atom for each chlorine atom. The plural of formula is **formulae**.',
    contentVn:
      'Công thức hóa học là cách viết ngắn gọn một hạt.\n\n' +
      'Muối ăn cũng có công thức: **NaCl** — một nguyên tử natri cho mỗi nguyên tử clo. Số nhiều của formula là **formulae**.',
    notes: [
      {
        tone: 'write',
        badge: 'Remember this',
        badgeVn: 'Ghi nhớ',
        icon: 'Lightbulb',
        text: '**Formula:** the symbols of the elements in a compound.\nThe small number tells you how many atoms. No number means one.',
        textVn: '**Công thức (formula):** kí hiệu của các nguyên tố trong hợp chất.\nSố nhỏ cho biết có bao nhiêu nguyên tử. Không có số nghĩa là một.',
      },
    ],
    check: {
      id: 'chk_small_two',
      q: 'Water is H₂O. What does the small 2 tell you?',
      qVn: 'Nước là H₂O. Số 2 nhỏ cho em biết điều gì?',
      options: [
        { val: 'A', text: 'There are two water particles', textVn: 'Có hai hạt nước' },
        { val: 'B', text: 'There are two oxygen atoms', textVn: 'Có hai nguyên tử oxi' },
        { val: 'C', text: 'There are two hydrogen atoms', textVn: 'Có hai nguyên tử hiđro' },
        { val: 'D', text: 'The oxygen atom is twice as big', textVn: 'Nguyên tử oxi to gấp đôi' },
      ],
      correct: 'C',
      expEn: 'The small number counts the symbol **before** it: H₂ means **two hydrogen atoms**. O has no number, so there is one oxygen atom (not B). It counts atoms in one particle, not particles (A), and says nothing about size (D).',
      expVn: 'Số nhỏ đếm kí hiệu đứng **trước** nó: H₂ nghĩa là **hai nguyên tử hiđro**. O không có số, nên có một nguyên tử oxi (không phải B). Nó đếm số nguyên tử trong một hạt, không đếm số hạt (A), và không nói gì về kích thước (D).',
    },
  },

  // 21 ─ Read the Formula (widget) ──────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Count before you press',
    eyebrowVn: 'Đếm trước khi bấm',
    title: 'Read the Formula',
    titleVn: 'Đọc công thức',
    widget: FormulaReader,
    caption: 'Say what the next symbol means before each press. Careful: **C** is carbon. **Ca** is calcium.',
    captionVn: 'Nói ý nghĩa của kí hiệu tiếp theo trước mỗi lần bấm. Cẩn thận: **C** là cacbon. **Ca** là canxi.',
  },

  // 22 ─ Write the formula of a drawn particle: FORMULA (write) ─────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'PenLine',
    eyebrow: 'Now the other way round',
    eyebrowVn: 'Bây giờ làm ngược lại',
    title: 'Write the Formula',
    titleVn: 'Viết công thức',
    label: 'Write it',
    labelVn: 'Viết',
    labelIcon: 'PenLine',
    text: 'Count each colour. Write the **symbol**, then the **small number** after it.',
    textVn: 'Đếm từng màu. Viết **kí hiệu**, rồi viết **số nhỏ** sau nó.',
    sub: 'One atom needs no number. Capital letter first, small letter second.',
    subVn: 'Một nguyên tử thì không cần số. Chữ in hoa trước, chữ thường sau.',
    activity: {
      id: 'act_write_h2s', type: 'formula', ask: 'write',
      formula: 'H2S',
      prompt: 'Write the formula of this particle. Use the colour key.',
      promptVn: 'Viết công thức của hạt này. Dùng bảng chú thích màu.',
      explain: 'Two hydrogen atoms and one sulfur atom: **H₂S**, hydrogen sulfide — the compound from Question 4. The 2 goes after the H it counts; the S needs no number.',
      explainVn: 'Hai nguyên tử hiđro và một nguyên tử lưu huỳnh: **H₂S**, hydrogen sulfide — hợp chất trong Câu 4. Số 2 đứng sau chữ H mà nó đếm; chữ S không cần số.',
    },
  },

  // 23 ─ Book questions 10–11: PARTICLES (find) ─────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 62',
    eyebrowVn: 'Sách học sinh, trang 62',
    title: 'Questions 10–11',
    titleVn: 'Câu hỏi 10–11',
    content:
      '> **10.** Element or compound? Explain. K · O₂ · NaCl · Al · Ca · CaCl₂ · H₂\n' +
      '> **11.** SO₂ is sulfur dioxide. **a** How many elements? **b** How many oxygen atoms for each sulfur atom?\n\n' +
      'Four of Question 10 are drawn below and scored. Answer the rest out loud, then press Check.',
    contentVn:
      '> **10.** Nguyên tố hay hợp chất? Giải thích. K · O₂ · NaCl · Al · Ca · CaCl₂ · H₂\n' +
      '> **11.** SO₂ là sulfur dioxide. **a** Có bao nhiêu nguyên tố? **b** Mỗi nguyên tử lưu huỳnh có mấy nguyên tử oxi?\n\n' +
      'Bốn chất của Câu 10 được vẽ ở dưới và tính điểm. Trả lời phần còn lại thành tiếng, rồi bấm Kiểm tra.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**10.** Elements (one kind of atom): K, O₂, Al, Ca, H₂. Compounds (two kinds of atom bonded): NaCl, CaCl₂.\n**11.** **a** 2 — sulfur and oxygen. **b** 2 — di means two.',
      answerVn: '**10.** Nguyên tố (một loại nguyên tử): K, O₂, Al, Ca, H₂. Hợp chất (hai loại nguyên tử liên kết): NaCl, CaCl₂.\n**11.** **a** 2 — lưu huỳnh và oxi. **b** 2 — di nghĩa là hai.',
    },
    activity: {
      id: 'act_boxes_find', type: 'particles', ask: 'find', find: 'compound',
      prompt: 'Tap every box that is a compound.',
      promptVn: 'Chạm vào mọi hộp là hợp chất.',
      boxes: [
        ['O2', 'O2', 'O2', 'O2'],
        ['NaCl', 'NaCl', 'NaCl', 'NaCl', 'NaCl'],
        ['Mg', 'Mg', 'Mg', 'Mg', 'Mg', 'Mg'],
        ['CaCl2', 'CaCl2', 'CaCl2', 'CaCl2'],
      ],
      explain: '**NaCl** and **CaCl₂** each have two kinds of atom bonded — compounds. O₂ is two oxygen atoms and magnesium is single magnesium atoms (like K, Al and Ca): one kind of atom, so elements.',
      explainVn: '**NaCl** và **CaCl₂** mỗi chất có hai loại nguyên tử liên kết — hợp chất. O₂ là hai nguyên tử oxi, còn magie là các nguyên tử magie riêng lẻ (giống K, Al và Ca): một loại nguyên tử, nên là nguyên tố.',
    },
  },

  // 24 ─ Book questions 12–13 + CHECK (Q13) ────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 62',
    eyebrowVn: 'Sách học sinh, trang 62',
    title: 'Questions 12–13',
    titleVn: 'Câu hỏi 12–13',
    content:
      '> **12.** Water is H₂O. **a** Which two elements? **b** What does the formula tell you about the numbers of atoms?\n\n' +
      'Say your answer out loud, then press Check. **Question 13** is scored below.',
    contentVn:
      '> **12.** Nước là H₂O. **a** Hai nguyên tố nào? **b** Công thức cho biết gì về số nguyên tử?\n\n' +
      'Nói to câu trả lời, rồi bấm Kiểm tra. **Câu 13** được tính điểm ở dưới.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**12.** **a** hydrogen and oxygen · **b** two hydrogen atoms are bonded with one oxygen atom.',
      answerVn: '**12.** **a** hiđro và oxi · **b** hai nguyên tử hiđro liên kết với một nguyên tử oxi.',
    },
    check: {
      id: 'chk_q13',
      q: 'Question 13: CO is carbon monoxide. Why is it not just called “carbon oxide”?',
      qVn: 'Câu 13: CO là carbon monoxide. Vì sao không gọi đơn giản là “carbon oxide”?',
      options: [
        { val: 'A', text: '“Mono” means it is an element', textVn: '“Mono” nghĩa là nó là một nguyên tố' },
        { val: 'B', text: '“Mono” means the particle is very small', textVn: '“Mono” nghĩa là hạt rất nhỏ' },
        { val: 'C', text: '“Mono” means there are two oxygen atoms', textVn: '“Mono” nghĩa là có hai nguyên tử oxi' },
        { val: 'D', text: '“Mono” means one oxygen atom — it tells CO apart from carbon dioxide, CO₂', textVn: '“Mono” nghĩa là một nguyên tử oxi — nó phân biệt CO với carbon dioxide, CO₂' },
      ],
      correct: 'D',
      expEn: '**Mono = one**: each carbon atom is bonded to one oxygen atom. “Carbon oxide” could mean CO or CO₂, so the prefix tells them apart. Two oxygen atoms is **di** (C); CO has two kinds of atom, so it is a compound, not an element (A).',
      expVn: '**Mono = một**: mỗi nguyên tử cacbon liên kết với một nguyên tử oxi. “Carbon oxide” có thể là CO hoặc CO₂, nên tiền tố giúp phân biệt. Hai nguyên tử oxi là **di** (C); CO có hai loại nguyên tử, nên là hợp chất, không phải nguyên tố (A).',
    },
  },

  // 25 ─ Book questions 14–17 + CHECK (Q17) ────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 62',
    eyebrowVn: 'Sách học sinh, trang 62',
    title: 'Questions 14–17',
    titleVn: 'Câu hỏi 14–17',
    content:
      '> **14.** Name **a** MgO **b** NaCl **c** CaCl₂\n' +
      '> **15.** NaOH and KOH are **hydroxides**. Which two elements are in all hydroxides?\n' +
      '> **16.** Name LiOH.\n\n' +
      'Say your answers out loud, then press Check. **Question 17** is scored below. (Hydroxide is a name to learn — it does not follow the -ate rule.)',
    contentVn:
      '> **14.** Gọi tên **a** MgO **b** NaCl **c** CaCl₂\n' +
      '> **15.** NaOH và KOH là **hydroxide**. Hai nguyên tố nào có trong mọi hydroxide?\n' +
      '> **16.** LiOH tên là gì?\n\n' +
      'Nói to câu trả lời, rồi bấm Kiểm tra. **Câu 17** được tính điểm ở dưới. (Hydroxide là một tên cần học thuộc — nó không theo quy tắc -ate.)',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**14.** **a** magnesium oxide · **b** sodium chloride · **c** calcium chloride\n**15.** oxygen and hydrogen (the OH) · **16.** lithium hydroxide',
      answerVn: '**14.** **a** magnesium oxide · **b** sodium chloride · **c** calcium chloride\n**15.** oxi và hiđro (phần OH) · **16.** lithium hydroxide',
    },
    check: {
      id: 'chk_q17',
      q: 'Question 17: how many elements are in LiOH?',
      qVn: 'Câu 17: LiOH có bao nhiêu nguyên tố?',
      options: [
        { val: 'A', text: '2', textVn: '2' },
        { val: 'B', text: '3', textVn: '3' },
        { val: 'C', text: '4', textVn: '4' },
        { val: 'D', text: '1', textVn: '1' },
      ],
      correct: 'B',
      expEn: 'Count the **capital letters**: **Li** (lithium), **O** (oxygen), **H** (hydrogen) — 3 elements. The small i belongs to Li, so it is not a fourth (C). “Hydroxide” is one word but two elements (not A).',
      expVn: 'Đếm các **chữ in hoa**: **Li** (liti), **O** (oxi), **H** (hiđro) — 3 nguyên tố. Chữ i thường thuộc về Li, nên không phải nguyên tố thứ tư (C). “Hydroxide” là một từ nhưng gồm hai nguyên tố (không phải A).',
    },
  },

  // 26 ─ Checklist + the exit question: FORMULA (count) ────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content:
      'Next: the key words, then **Particle Lab** — count, write, build and name particles that are new every time.\n\n' +
      'Last one, the exit question: **CaCO₃**. Which elements? How many atoms?',
    contentVn:
      'Tiếp theo: các từ khóa, rồi **Phòng thí nghiệm hạt** — đếm, viết, dựng và gọi tên những hạt mới mỗi lần.\n\n' +
      'Câu cuối, câu hỏi ra về: **CaCO₃**. Những nguyên tố nào? Bao nhiêu nguyên tử?',
    items: [
      { text: 'Explain the difference between an **element** and a **compound**.', textVn: 'Giải thích sự khác nhau giữa **nguyên tố** và **hợp chất**.' },
      { text: 'Say why a compound has **new properties** (salt is not sodium or chlorine).', textVn: 'Nói được vì sao hợp chất có **tính chất mới** (muối không giống natri hay clo).' },
      { text: '**Name** compounds: -ide and -ate.', textVn: '**Gọi tên** hợp chất: -ide và -ate.' },
      { text: 'Say what **mono** and **di** mean.', textVn: 'Nói được **mono** và **di** nghĩa là gì.' },
      { text: 'Tell an element from a compound in a **particle diagram**.', textVn: 'Phân biệt nguyên tố với hợp chất trong **sơ đồ hạt**.' },
      { text: 'Read a **formula**: which elements, how many atoms.', textVn: 'Đọc **công thức**: nguyên tố nào, bao nhiêu nguyên tử.' },
    ],
    activity: {
      id: 'act_count_caco3', type: 'formula', ask: 'count',
      formula: 'CaCO3',
      prompt: 'Exit question: read CaCO₃. How many elements, how many atoms of each, and how many atoms in total?',
      promptVn: 'Câu hỏi ra về: đọc CaCO₃. Có bao nhiêu nguyên tố, mỗi nguyên tố bao nhiêu nguyên tử, và tổng cộng bao nhiêu nguyên tử?',
      explain: '**Ca** is calcium (1), **C** is carbon (1), **O₃** is three oxygen atoms: 3 elements, 1 + 1 + 3 = **5 atoms**. Ca and C are different elements — the small a matters. This is calcium carbonate, Ha Long Bay’s rock.',
      explainVn: '**Ca** là canxi (1), **C** là cacbon (1), **O₃** là ba nguyên tử oxi: 3 nguyên tố, 1 + 1 + 3 = **5 nguyên tử**. Ca và C là hai nguyên tố khác nhau — chữ a thường rất quan trọng. Đây là calcium carbonate, loại đá ở vịnh Hạ Long.',
    },
  },
];
