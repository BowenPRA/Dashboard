// src/data/PRIMARY_TECH/T04/notes.js
// T4 Saving Your Work — the self-study deck (NOTES, 20 XP), rebuilt to
// docs/primary-tech/UPGRADE-PLAN.md §4 and the §6 T4 spine. 25 layout slides;
// 17 scored items — 7 checks and 10 activities (predict · hotspot · order ·
// sort) — so the student does something every slide or two.
//
// SPINE:
//   1–2    hero; predict — an hour of typing, a power cut, no Save: what is left?
//   3–4    the dot in the title (TITLE_BARS); hotspot — the window you would lose
//   5–10   saving asks two questions + check; the Save As box (LB_SAVE_AS, by
//          function); hotspot — where the name goes; hotspot — the folder for
//          your own work; AppSim demo — watch it happen; order — the four steps
//   11–13  predict — one file or two after Save As (asked BEFORE the showcase
//          tells, so the guess is a real one); Save or Save As (showcase);
//          keep your first draft (DRAFTS) + check
//   14–16  naming + check; sort — names you would find next month; where
//          things live (steps) + sort — six things into four folders
//   17     two ways to do everything (TWO_WAYS: Save / Ctrl+S, ⋮ / right-click)
//          + check
//   18–22  the file manager (LB_FILE_MANAGER); hotspot — where deleted files
//          wait; delete is a move + check; AppSim demo — get it back from the
//          bin; predict — what emptying the bin does
//   23     lost it? search for part of the name (SEARCH_RESULTS) + check
//   24–25  the checklist with the exit check; On your own computer (unassessed,
//          last — docs/digital-skills-course.md §5.4)
//
// House notes:
//  · Every slide's `check:` or `activity:` is its LAST key; no slide has both.
//  · Checks have four options, a nameable mistake in each wrong one; the right
//    letters over the deck are A A B B C C D.
//  · Activity strings use name/explain, never text/content (the narration
//    generator reads text/content aloud).
//  · Hotspots ask by FUNCTION ("where you type what it is called"), never by the
//    word printed on the control: the interface words stay on the picture
//    (class="keep") because they are what the student must learn to read.
//  · A picture that must be READ never shares a showcase with a check (it
//    shrinks to ~40%): the labelled showcases carry nothing, and the pictures
//    with checks sit on `split` slides (docs/lesson-renderer-gap.md §0).
//  · Both demos run the SAME engine and window as Try It (AppSim, skin
//    'files'), so the student watches exactly the machine they are handed next.
//  · No slide sends the student to paper; the tones are Remember / Watch out /
//    Note / Try this, never "Write this down".
//
// Slide audio is DERIVED from position (slideAudioUrl): the deck grew from 9 to
// 25 slides, so public/audio/PRIMARY_TECH/T04/ must be deleted and regenerated.
import { DIAGRAMS } from './diagrams.js';

const SKY = '#0ea5e9';
const PURPLE = '#8b5cf6';
const RED = '#ef4444';
const GREEN = '#16a34a';
const AMBER = '#f59e0b';

/**
 * A long, thin hotspot target (a text box, a row of a list) as a row of
 * touching circles that share ONE id. The hotspot engine hit-tests circles and
 * compares the id of the first circle a tap lands in, so a single circle on the
 * 428-wide File name box left most of the box answering "not on a part". The
 * reveal rings the first circle carrying the answer's id.
 */
const along = (target, xs) => xs.map((x) => ({ ...target, x }));

/** The four entries of the file manager's folder list span x 240–380. */
const FOLDER_ROW = [258, 294, 330, 366];

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: SKY,
    icon: 'Boxes',
    brand: 'Technology',
    brandVn: 'Công nghệ',
    eyebrow: 'Unit T4',
    eyebrowVn: 'Bài T4',
    title: 'Saving Your Work',
    titleVn: 'Lưu Bài Của Em',
    objective: 'Save a piece of work, give it a name you will still understand next month, know exactly which folder it went into — and get it back when it goes missing.',
    objectiveVn: 'Lưu một bài làm, đặt cho nó cái tên mà tháng sau em vẫn hiểu, biết chính xác nó nằm trong thư mục nào — và lấy lại được khi nó bị thất lạc.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **predict**, **tap**, **sort** and **put things in order**. **17 things are scored** — the first one is on the next slide.',
      textVn: 'Em sẽ **dự đoán**, **chạm**, **sắp xếp** và **xếp theo thứ tự**. **17 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: PREDICT — the power cut ───────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Zap',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'The power cut',
    titleVn: 'Mất điện',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'You have been typing a story for **a whole hour**. You never pressed **Save**.',
    textVn: 'Em đã gõ một câu chuyện suốt **cả một giờ**. Em chưa hề bấm **Save** (Lưu).',
    sub: 'Then the power goes off. When the computer starts again, what is left of your story?',
    subVn: 'Rồi mất điện. Khi máy tính khởi động lại, câu chuyện của em còn lại những gì?',
    activity: {
      id: 'act_power_cut',
      type: 'predict',
      prompt: 'The power goes off. You never pressed Save. What is left of the story?',
      promptVn: 'Mất điện. Em chưa hề bấm Save. Câu chuyện còn lại những gì?',
      options: [
        { val: 'all', name: 'All of it — the computer keeps everything you type', nameVn: 'Tất cả — máy tính giữ lại mọi thứ em gõ' },
        { val: 'half', name: 'About half — whatever it had time to keep', nameVn: 'Khoảng một nửa — phần nào máy kịp giữ' },
        { val: 'nothing', name: 'Nothing — the story only lived in the open window', nameVn: 'Không còn gì — câu chuyện chỉ nằm trong cửa sổ đang mở' },
        { val: 'desktop', name: 'All of it, as a file on the desktop', nameVn: 'Tất cả, thành một tệp trên màn hình nền' },
      ],
      correct: 'nothing',
      explain: '**Nothing.** Work you have not saved lives only in the open window. When the power goes, the window goes — and the story with it. **Saving** writes your work onto the computer as a **file**, and a file is still there when the power comes back. Some programs keep a rescue copy, but you cannot count on one.',
      explainVn: '**Không còn gì.** Bài chưa lưu chỉ nằm trong cửa sổ đang mở. Khi mất điện, cửa sổ mất — và câu chuyện cũng mất theo. **Lưu** (save) là ghi bài của em vào máy tính thành một **tệp**, và tệp vẫn còn đó khi có điện lại. Một số chương trình có giữ một bản cứu hộ, nhưng em không thể trông cậy vào nó.',
    },
  },

  // 3 ─ The dot in the title ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'CircleDot',
    eyebrow: 'Read the top of the window',
    eyebrowVn: 'Đọc phần trên cùng của cửa sổ',
    title: 'Saved, or not saved?',
    titleVn: 'Đã lưu, hay chưa lưu?',
    ratio: 55,
    inlineSvg: DIAGRAMS.TITLE_BARS,
    content: 'The strip at the top of the window always tells you. A **dot •** after the name means the work has changes that are **not saved yet**.\n\nPress **Save** and the dot goes away. Now the strip says the work is saved — and **where**.',
    contentVn: 'Dải ở trên cùng của cửa sổ luôn cho em biết. Một **dấu chấm •** sau tên nghĩa là bài có những thay đổi **chưa được lưu**.\n\nBấm **Save** thì dấu chấm biến mất. Lúc đó dải cho biết bài đã được lưu — và lưu **ở đâu**.',
    notes: [
      {
        tone: 'plant',
        text: 'A **dot •** after the name = **not saved yet**. That work would be lost if the power went off now.',
        textVn: 'Một **dấu chấm •** sau tên = **chưa được lưu**. Bài đó sẽ mất nếu bây giờ bị mất điện.',
      },
    ],
  },

  // 4 ─ HOTSPOT — which one would you lose? ────────────────────────────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'MousePointerClick',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Which one would you lose?',
    titleVn: 'Em sẽ mất bài nào?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Three pieces of work are open. The power is about to go off.',
    textVn: 'Ba bài làm đang mở. Sắp mất điện rồi.',
    sub: 'Read the top of each window. Tap the one whose work would be **lost**.',
    subVn: 'Đọc phần trên cùng của mỗi cửa sổ. Chạm vào cửa sổ có bài làm sẽ bị **mất**.',
    activity: {
      id: 'act_unsaved',
      type: 'hotspot',
      prompt: 'Tap the window whose work is not saved yet.',
      promptVn: 'Chạm vào cửa sổ có bài làm chưa được lưu.',
      svg: DIAGRAMS.THREE_WINDOWS,
      viewBox: '0 0 900 340',
      targets: [
        { id: 'maths', x: 155, y: 150, r: 130, name: 'maths homework — no dot after its name, so it is saved', nameVn: 'maths homework — không có dấu chấm sau tên, nên đã được lưu' },
        { id: 'poster', x: 450, y: 150, r: 130, name: 'poster — no dot after its name, so it is saved', nameVn: 'poster — không có dấu chấm sau tên, nên đã được lưu' },
        { id: 'story', x: 745, y: 150, r: 130, name: 'story — the red dot: not saved', nameVn: 'story — dấu chấm đỏ: chưa được lưu' },
      ],
      correct: 'story',
      explain: '**story.docx** has a red **dot** after its name, so it has changes that are **not saved**. It was saved once, but everything typed since then would be lost. The other two have no dot. One press of **Save** (or **Ctrl+S**) and the dot would go.',
      explainVn: '**story.docx** có một **dấu chấm** đỏ sau tên, nên nó có những thay đổi **chưa được lưu**. Nó đã từng được lưu, nhưng mọi thứ gõ thêm từ lúc đó sẽ bị mất. Hai cửa sổ kia không có dấu chấm. Chỉ cần bấm **Save** (hoặc **Ctrl+S**) một lần là dấu chấm biến mất.',
    },
  },

  // 5 ─ Saving asks two questions + CHECK ──────────────────────────────────
  {
    layout: 'statement',
    icon: 'AlertTriangle',
    accent: RED,
    label: 'The whole problem',
    labelVn: 'Toàn bộ vấn đề',
    title: 'Saving asks two questions',
    titleVn: 'Việc lưu bài hỏi em hai câu',
    text: 'Every time you save something for the first time, the computer asks: **what is it called**, and **where should it go**.',
    textVn: 'Mỗi lần em lưu một thứ lần đầu tiên, máy tính đều hỏi: **nó tên là gì**, và **nó nên nằm ở đâu**.',
    sub: 'Most people click past both questions without reading them. That is the reason so many people cannot find their work.',
    subVn: 'Phần lớn mọi người bấm bỏ qua cả hai câu hỏi mà không đọc. Đó là lý do rất nhiều người không tìm lại được bài của mình.',
    notes: [
      {
        tone: 'plant',
        text: 'A file has a **name** and a **place**. If you do not choose them, the computer chooses for you — and it chooses badly.',
        textVn: 'Một tệp có **tên** và có **chỗ**. Nếu em không chọn, máy tính sẽ chọn thay em — và chọn rất tệ.',
      },
    ],
    check: {
      id: 'chk_two_questions',
      q: 'You save a new document and click straight through the box without reading it. What is most likely?',
      qVn: 'Em lưu một tài liệu mới và bấm thẳng qua hộp thoại mà không đọc. Điều gì dễ xảy ra nhất?',
      options: [
        { val: 'A', text: 'It is saved, but with a name and in a place you did not choose.', textVn: 'Nó được lưu, nhưng với cái tên và ở chỗ mà em không chọn.' },
        { val: 'B', text: 'Nothing is saved at all.', textVn: 'Không có gì được lưu cả.' },
        { val: 'C', text: 'The computer will ask you again later.', textVn: 'Máy tính sẽ hỏi lại em sau.' },
        { val: 'D', text: 'It goes into Documents, with the name you were thinking of.', textVn: 'Nó vào Documents, với đúng cái tên em đang nghĩ trong đầu.' },
      ],
      correct: 'A',
      expEn: 'The work is safe — it just has a name like Untitled and sits wherever the computer felt like putting it. It was saved (not B), the box will not come back (not C), and the computer cannot read your mind (not D). That is why "I saved it but I cannot find it" is so common.',
      expVn: 'Bài vẫn an toàn — chỉ là nó mang cái tên kiểu Untitled và nằm ở chỗ máy tính tuỳ ý đặt. Nó đã được lưu (không phải B), hộp thoại sẽ không hiện lại (không phải C), và máy tính không đọc được suy nghĩ của em (không phải D). Vì vậy câu "em có lưu mà không tìm thấy" mới phổ biến đến thế.',
    },
  },

  // 6 ─ The Save As box (labelled by function) ─────────────────────────────
  {
    layout: 'showcase',
    icon: 'ScanEye',
    accent: SKY,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'The Save As box',
    titleVn: 'Hộp thoại Save As',
    inlineSvg: DIAGRAMS.LB_SAVE_AS,
    caption: '**File name** is question one: what is it called? **Save it in** is question two: which folder? Look — the computer has already guessed **Untitled** and **Downloads**. Change both, then press **Save**.',
    captionVn: '**File name** (tên tệp) là câu hỏi thứ nhất: nó tên là gì? **Save it in** (lưu vào) là câu hỏi thứ hai: thư mục nào? Nhìn kìa — máy tính đã tự đoán **Untitled** và **Downloads**. Hãy đổi cả hai, rồi bấm **Save**.',
  },

  // 7 ─ HOTSPOT — where the name goes ──────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'MousePointerClick',
    eyebrow: 'Question one',
    eyebrowVn: 'Câu hỏi thứ nhất',
    title: 'What is it called?',
    titleVn: 'Nó tên là gì?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'You are saving your volcano report for the first time.',
    textVn: 'Em đang lưu bài báo cáo về núi lửa lần đầu tiên.',
    sub: 'Tap the place where you type what the file will be **called**.',
    subVn: 'Chạm vào chỗ em gõ **tên** của tệp.',
    activity: {
      id: 'act_name_box',
      type: 'hotspot',
      prompt: 'Tap where you type what the file will be called.',
      promptVn: 'Chạm vào chỗ em gõ tên của tệp.',
      svg: DIAGRAMS.SAVE_AS_DIALOG,
      viewBox: '210 30 520 400',
      targets: [
        ...along({ id: 'name', y: 163, r: 44, name: 'the File name box', nameVn: 'ô File name (tên tệp)' }, [312, 400, 488, 576, 652]),
        { id: 'docs', x: 326, y: 254, r: 52, name: 'Documents — a folder: where it goes, not what it is called', nameVn: 'Documents — một thư mục: nơi cất tệp, không phải tên tệp' },
        { id: 'downloads', x: 478, y: 254, r: 52, name: 'Downloads — a folder, and the computer\'s guess', nameVn: 'Downloads — một thư mục, và là lựa chọn máy tự đoán' },
        { id: 'desktop', x: 622, y: 254, r: 50, name: 'Desktop — a folder, not the name', nameVn: 'Desktop — một thư mục, không phải tên tệp' },
        { id: 'cancel', x: 507, y: 361, r: 40, name: 'Cancel — closes the box without saving', nameVn: 'Cancel — đóng hộp thoại mà không lưu' },
        { id: 'save', x: 629, y: 361, r: 40, name: 'Save — saves it, with whatever name is in the box', nameVn: 'Save — lưu tệp, với bất kỳ tên nào đang có trong ô' },
      ],
      correct: 'name',
      explain: 'The **File name** box. Right now it says **Untitled** — the computer\'s guess, which tells you nothing next week. Click in it and type what the work **is**: **volcano report**. That answers question one.',
      explainVn: 'Ô **File name** (tên tệp). Lúc này nó ghi **Untitled** — cái tên máy tính tự đoán, tuần sau chẳng cho em biết gì cả. Bấm vào ô đó và gõ bài làm **là gì**: **volcano report**. Vậy là em đã trả lời câu hỏi thứ nhất.',
    },
  },

  // 8 ─ HOTSPOT — the folder for your own work ─────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Boxes',
    eyebrow: 'Question two',
    eyebrowVn: 'Câu hỏi thứ hai',
    title: 'Where should it go?',
    titleVn: 'Nó nên nằm ở đâu?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'The computer has picked **Downloads** for your volcano report.',
    textVn: 'Máy tính đã chọn **Downloads** cho bài báo cáo núi lửa của em.',
    sub: 'Tap the folder where **your own school work** belongs.',
    subVn: 'Chạm vào thư mục dành cho **bài vở của chính em**.',
    activity: {
      id: 'act_school_folder',
      type: 'hotspot',
      prompt: 'Tap the folder where your own school work belongs.',
      promptVn: 'Chạm vào thư mục dành cho bài vở của chính em.',
      svg: DIAGRAMS.SAVE_AS_DIALOG,
      viewBox: '210 30 520 400',
      targets: [
        { id: 'docs', x: 326, y: 254, r: 52, name: 'Documents', nameVn: 'Documents' },
        { id: 'downloads', x: 478, y: 254, r: 52, name: 'Downloads — for things the browser fetched from the internet', nameVn: 'Downloads — cho những thứ trình duyệt tải từ internet về' },
        { id: 'desktop', x: 622, y: 254, r: 50, name: 'Desktop — handy for today, a mess by next month', nameVn: 'Desktop — tiện cho hôm nay, bừa bộn vào tháng sau' },
        ...along({ id: 'name', y: 163, r: 44, name: 'the File name box — that is the name, not the place', nameVn: 'ô File name — đó là tên, không phải chỗ cất' }, [312, 400, 488, 576, 652]),
        { id: 'cancel', x: 507, y: 361, r: 40, name: 'Cancel — closes the box without saving', nameVn: 'Cancel — đóng hộp thoại mà không lưu' },
        { id: 'save', x: 629, y: 361, r: 40, name: 'Save — it would save into Downloads, the folder chosen now', nameVn: 'Save — nó sẽ lưu vào Downloads, thư mục đang được chọn' },
      ],
      correct: 'docs',
      explain: '**Documents** is the folder for work you made yourself. **Downloads** is where the browser drops things from the internet — your report would be lost in the pile. Tap **Documents** and it turns blue: that answers question two.',
      explainVn: '**Documents** là thư mục cho những gì chính em làm ra. **Downloads** là nơi trình duyệt thả những thứ tải từ internet về — bài báo cáo của em sẽ lọt thỏm trong đống đó. Chạm vào **Documents** và nó chuyển sang màu xanh: vậy là em đã trả lời câu hỏi thứ hai.',
    },
  },

  // 9 ─ AppSim demo — watch it happen ──────────────────────────────────────
  {
    // The simulator, in demo mode. Same engine, same window, same actions as the
    // Try It task — this slide is the reason the engine was worth building.
    layout: 'split',
    icon: 'Eye',
    accent: '#0284c7',
    ratio: 62,
    title: 'Watch it happen',
    titleVn: 'Xem nó diễn ra',
    content: 'Here is the whole job, done once, slowly. **Save** opens the box, because this document has never been saved. A **name** is typed. A **folder** is chosen. Then **Save** in the box.',
    contentVn: 'Đây là toàn bộ công việc, làm một lần, thật chậm. **Save** mở hộp thoại ra, vì tài liệu này chưa từng được lưu. Một **cái tên** được gõ vào. Một **thư mục** được chọn. Rồi bấm **Save** trong hộp thoại.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'files',
        initial: { cwd: 'Documents', editor: { name: 'Untitled', ext: 'docx' }, files: [] },
        script: [
          { type: 'save', say: 'Save — and because it has never been saved, the box opens.', sayVn: 'Bấm Save — và vì chưa từng lưu, hộp thoại mở ra.' },
          { type: 'dialogName', name: 'volcano report', say: 'Type a name you will know next week.', sayVn: 'Gõ cái tên mà tuần sau em vẫn nhận ra.' },
          { type: 'dialogFolder', folder: 'Documents', say: 'Choose Documents — that is where school work lives.', sayVn: 'Chọn Documents — nơi để bài vở.' },
          { type: 'dialogConfirm', say: 'Saved. Look at the top: no dot, and it says where it went.', sayVn: 'Đã lưu. Hãy nhìn lên trên: không còn dấu chấm, và nó cho biết tệp đã đi đâu.' },
        ],
      },
    },
    notes: [
      {
        tone: 'plant',
        text: 'The strip at the top always tells you whether the document is saved, and **where**.',
        textVn: 'Dải phía trên luôn cho em biết tài liệu đã lưu chưa, và lưu **ở đâu**.',
      },
    ],
  },

  // 10 ─ ORDER — four steps, every time ────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ListChecks',
    eyebrow: 'Put it in order',
    eyebrowVn: 'Sắp xếp theo thứ tự',
    title: 'Four steps, every time',
    titleVn: 'Bốn bước, lần nào cũng vậy',
    label: 'Order',
    labelVn: 'Sắp xếp',
    labelIcon: 'ArrowUpDown',
    text: 'You just watched a new piece of work being saved.',
    textVn: 'Em vừa xem một bài làm mới được lưu.',
    sub: 'Put the four steps in order, from first to last.',
    subVn: 'Hãy xếp bốn bước theo thứ tự, từ đầu đến cuối.',
    activity: {
      id: 'act_save_steps',
      type: 'order',
      prompt: 'Put the four steps of saving new work in order.',
      promptVn: 'Xếp bốn bước lưu một bài làm mới theo đúng thứ tự.',
      steps: [
        { id: 'save', name: 'Press Save (or Ctrl+S)', nameVn: 'Bấm Save (hoặc Ctrl+S)' },
        { id: 'answer', name: 'In the box: type a name, and choose Documents', nameVn: 'Trong hộp thoại: gõ tên, và chọn Documents' },
        { id: 'confirm', name: 'Press Save in the box', nameVn: 'Bấm Save trong hộp thoại' },
        { id: 'check', name: 'Check the top: no dot, and it says where', nameVn: 'Kiểm tra phía trên: không còn dấu chấm, và có ghi nơi lưu' },
      ],
      explain: '**Save** opens the box. The box asks its **two questions** — a name and a folder. **Save in the box** is what actually writes the file; until you press it, nothing is saved. Then one glance at the **top of the window** proves it worked.',
      explainVn: '**Save** mở hộp thoại ra. Hộp thoại hỏi **hai câu hỏi** — tên và thư mục. **Save trong hộp thoại** mới thật sự ghi tệp xuống; chưa bấm nó thì chưa có gì được lưu. Sau đó chỉ cần liếc **phía trên cửa sổ** là biết đã lưu thành công.',
    },
  },

  // 11 ─ PREDICT — one file or two? ────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Layers',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'One file or two?',
    titleVn: 'Một tệp hay hai tệp?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: '**volcano report** is saved in Documents. You open it and press **Save As**.',
    textVn: '**volcano report** đã được lưu trong Documents. Em mở nó ra và bấm **Save As**.',
    sub: 'You type a new name, **volcano report 2**, and press Save. How many volcano reports are in Documents now?',
    subVn: 'Em gõ một cái tên mới, **volcano report 2**, rồi bấm Save. Bây giờ trong Documents có bao nhiêu bài báo cáo núi lửa?',
    activity: {
      id: 'act_how_many',
      type: 'predict',
      prompt: 'After Save As with a new name, how many volcano reports are in Documents?',
      promptVn: 'Sau khi Save As với tên mới, trong Documents có bao nhiêu bài báo cáo núi lửa?',
      options: [
        { val: 'renamed', name: 'One — the file was renamed to volcano report 2', nameVn: 'Một — tệp đã được đổi tên thành volcano report 2' },
        { val: 'two', name: 'Two — the old one and the new one', nameVn: 'Hai — tệp cũ và tệp mới' },
        { val: 'replaced', name: 'One — the new one replaced the old one', nameVn: 'Một — tệp mới đã thay thế tệp cũ' },
        { val: 'none', name: 'None, until you close the document', nameVn: 'Không có tệp nào, cho đến khi em đóng tài liệu' },
      ],
      correct: 'two',
      explain: '**Two.** Save As makes a **new file** with the new name and leaves the old one exactly as it was. That is the whole difference from **Save**, which writes over the file you already have. The next slide shows it.',
      explainVn: '**Hai.** Save As tạo ra một **tệp mới** với tên mới và giữ nguyên tệp cũ. Đó chính là toàn bộ khác biệt so với **Save**, lệnh ghi đè lên tệp em đang có. Slide sau sẽ cho em thấy.',
    },
  },

  // 12 ─ Save or Save As (showcase) ────────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'ArrowLeftRight',
    accent: GREEN,
    title: 'Save, or Save As?',
    titleVn: 'Save, hay Save As?',
    inlineSvg: DIAGRAMS.SAVE_VS_SAVE_AS,
    caption: 'They are not one button with two names. **Save** keeps **one** file and writes over it. **Save As** makes **another** one, with a new name or in a new place.',
    captionVn: 'Đây không phải một nút với hai tên gọi. **Save** giữ **một** tệp và ghi đè lên nó. **Save As** tạo **thêm** một tệp nữa, với tên mới hoặc ở chỗ mới.',
  },

  // 13 ─ Keep your first draft + CHECK ─────────────────────────────────────
  {
    layout: 'split',
    icon: 'Layers',
    accent: GREEN,
    eyebrow: 'When Save As matters',
    eyebrowVn: 'Khi nào Save As quan trọng',
    title: 'Keep your first draft',
    titleVn: 'Giữ lại bản nháp đầu tiên',
    ratio: 55,
    inlineSvg: DIAGRAMS.DRAFTS,
    content: 'Your teacher liked your first draft. You want to try a new ending **without losing it**.\n\nSave As, with a **different name**, gives you two files. If the new ending goes wrong, the first draft is still there.',
    contentVn: 'Cô giáo thích bản nháp đầu tiên của em. Em muốn thử một phần kết mới **mà không làm mất nó**.\n\nSave As, với một **cái tên khác**, cho em hai tệp. Nếu phần kết mới không ổn, bản nháp đầu tiên vẫn còn đó.',
    check: {
      id: 'chk_first_draft',
      q: 'You want to keep your first draft AND write a new ending. What should you do?',
      qVn: 'Em muốn giữ bản nháp đầu tiên VÀ viết một phần kết mới. Em nên làm gì?',
      options: [
        { val: 'A', text: 'Change the ending, then press Save.', textVn: 'Sửa phần kết, rồi bấm Save.' },
        { val: 'B', text: 'Use Save As, and give the new version a different name.', textVn: 'Dùng Save As, và đặt cho phiên bản mới một cái tên khác.' },
        { val: 'C', text: 'Use Save As, but keep exactly the same name and folder.', textVn: 'Dùng Save As, nhưng giữ nguyên tên và thư mục cũ.' },
        { val: 'D', text: 'Rename the first draft to "final".', textVn: 'Đổi tên bản nháp đầu tiên thành "final".' },
      ],
      correct: 'B',
      expEn: 'Save As with a **new name** makes a second file and leaves the first alone. Save (A) writes over the draft. Save As with the **same** name in the same folder (C) replaces the draft — the computer asks, and one careless "Yes" loses it. Renaming (D) still leaves only one file.',
      expVn: 'Save As với **tên mới** tạo ra tệp thứ hai và để yên tệp đầu tiên. Save (A) ghi đè lên bản nháp. Save As với **cùng** tên trong cùng thư mục (C) sẽ thay thế bản nháp — máy tính có hỏi, và chỉ một lần bấm "Yes" vội vàng là mất. Đổi tên (D) thì vẫn chỉ có một tệp.',
    },
  },

  // 14 ─ Naming + CHECK ────────────────────────────────────────────────────
  {
    layout: 'stack',
    icon: 'PenLine',
    accent: SKY,
    columns: 1,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Naming it so you will know it',
    titleVn: 'Đặt tên để sau này còn nhận ra',
    content: 'A good file name answers **what is this?** in a few words. You are writing it for **yourself next month**, not for right now.',
    contentVn: 'Một tên tệp tốt trả lời câu hỏi **đây là cái gì?** chỉ bằng vài từ. Em đang viết nó cho **chính em của tháng sau**, không phải cho lúc này.',
    notes: [
      {
        tone: 'plant',
        text: 'Good: **volcano report**, **maths homework week 3**, **holiday photos 2026**. Each one says what is inside.',
        textVn: 'Tốt: **volcano report**, **maths homework week 3**, **holiday photos 2026**. Mỗi tên nói rõ bên trong có gì.',
      },
      {
        tone: 'homework',
        text: 'Bad: **Untitled1**, **doc**, **asdf**, **new new final REAL final**. They say nothing — or how you felt that day.',
        textVn: 'Tệ: **Untitled1**, **doc**, **asdf**, **new new final REAL final**. Chúng chẳng nói gì — hoặc chỉ nói cảm xúc của em hôm đó.',
      },
    ],
    check: {
      id: 'chk_naming',
      q: 'Which of these file names will be most useful to you in a month?',
      qVn: 'Tên tệp nào sau đây sẽ hữu ích nhất cho em sau một tháng?',
      options: [
        { val: 'A', text: 'Document2', textVn: 'Document2' },
        { val: 'B', text: 'final', textVn: 'final' },
        { val: 'C', text: 'my work', textVn: 'my work' },
        { val: 'D', text: 'science volcano report', textVn: 'science volcano report' },
      ],
      correct: 'D',
      expEn: '**science volcano report** says what the thing actually is, so you can find it without opening it. **Document2** is the computer\'s name. **final** sounds sure today and means nothing in a month — especially once there are three of them. **my work** is true of every file you own.',
      expVn: '**science volcano report** nói rõ đó thật sự là cái gì, nên em tìm được mà không cần mở ra. **Document2** là tên máy tính đặt. **final** nghe có vẻ chắc chắn hôm nay nhưng một tháng sau chẳng có nghĩa gì — nhất là khi em có tới ba tệp như vậy. **my work** thì tệp nào của em cũng đúng.',
    },
  },

  // 15 ─ SORT — would you find it next month? ──────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Boxes',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Would you find it next month?',
    titleVn: 'Tháng sau em có tìm ra không?',
    label: 'Sort',
    labelVn: 'Phân loại',
    labelIcon: 'Boxes',
    text: 'Six file names, saved today.',
    textVn: 'Sáu tên tệp, được lưu hôm nay.',
    sub: 'A month from now, which ones would you **find** — and which would you **not**?',
    subVn: 'Một tháng nữa, tệp nào em sẽ **tìm ra** — và tệp nào em sẽ **không** tìm ra?',
    activity: {
      id: 'act_names',
      type: 'sort',
      prompt: 'Sort the names: would you find the file next month?',
      promptVn: 'Phân loại các tên: tháng sau em có tìm ra tệp không?',
      bins: [
        { id: 'find', name: 'I would find it', nameVn: 'Em sẽ tìm ra' },
        { id: 'lost', name: 'I would not', nameVn: 'Em sẽ không tìm ra' },
      ],
      cards: [
        { id: 'science', name: 'science test notes', nameVn: 'science test notes', bin: 'find' },
        { id: 'trip', name: 'class trip plan', nameVn: 'class trip plan', bin: 'find' },
        { id: 'poster', name: 'rainforest poster', nameVn: 'rainforest poster', bin: 'find' },
        { id: 'doc2', name: 'Document2', nameVn: 'Document2', bin: 'lost' },
        { id: 'asdf', name: 'asdf', nameVn: 'asdf', bin: 'lost' },
        { id: 'mywork', name: 'my work', nameVn: 'my work', bin: 'lost' },
      ],
      explain: 'The three you would find each say **what the work is**, in words you would think of while looking for it. **Document2** is the computer\'s name, **asdf** is a keyboard slap, and **my work** sounds sensible but fits every file you will ever make.',
      explainVn: 'Ba tên em sẽ tìm ra đều nói rõ **bài đó là gì**, bằng những từ em sẽ nghĩ tới khi đi tìm. **Document2** là tên máy tính đặt, **asdf** là gõ bừa trên bàn phím, còn **my work** nghe có vẻ hợp lý nhưng tệp nào em làm ra cũng đúng như vậy.',
    },
  },

  // 16 ─ Where things live + SORT ──────────────────────────────────────────
  {
    layout: 'steps',
    icon: 'Boxes',
    accent: PURPLE,
    title: 'Where things live',
    titleVn: 'Mọi thứ nằm ở đâu',
    content: 'Your computer already has folders with jobs. Using the right one is most of being organised.',
    contentVn: 'Máy tính của em đã có sẵn các thư mục với nhiệm vụ riêng. Dùng đúng thư mục đã là phần lớn của sự ngăn nắp.',
    steps: [
      { text: '**Documents** — work you made yourself. This is where school work goes.', textVn: '**Documents** — những gì chính em tạo ra. Bài vở ở trường để ở đây.' },
      { text: '**Downloads** — things the browser fetched from the internet. It fills up fast.', textVn: '**Downloads** — những thứ trình duyệt tải từ internet về. Nó đầy lên rất nhanh.' },
      { text: '**Desktop** — the screen itself. Handy for today, a mess by next month.', textVn: '**Desktop** — chính màn hình nền. Tiện cho hôm nay, bừa bộn vào tháng sau.' },
      { text: '**Recycle Bin** — things you deleted. They are still there, and you can put them back.', textVn: '**Recycle Bin** — những thứ em đã xoá. Chúng vẫn còn đó, và em lấy lại được.' },
    ],
    activity: {
      id: 'act_where',
      type: 'sort',
      prompt: 'Which folder is each one in?',
      promptVn: 'Mỗi thứ đang nằm trong thư mục nào?',
      bins: [
        { id: 'documents', name: 'Documents', nameVn: 'Documents' },
        { id: 'downloads', name: 'Downloads', nameVn: 'Downloads' },
        { id: 'desktop', name: 'Desktop', nameVn: 'Desktop' },
        { id: 'bin', name: 'Recycle Bin', nameVn: 'Recycle Bin' },
      ],
      cards: [
        { id: 'story', name: 'A story you wrote and saved properly', nameVn: 'Một câu chuyện em viết và lưu đúng cách', bin: 'documents' },
        { id: 'project', name: 'Your science project, saved properly', nameVn: 'Dự án khoa học của em, được lưu đúng cách', bin: 'documents' },
        { id: 'sheet', name: 'A worksheet the browser just downloaded', nameVn: 'Một phiếu bài tập trình duyệt vừa tải về', bin: 'downloads' },
        { id: 'picture', name: 'A picture you just downloaded from a website', nameVn: 'Một tấm ảnh em vừa tải từ một trang web', bin: 'downloads' },
        { id: 'reminder', name: 'A reminder you left on the screen for today', nameVn: 'Một lời nhắc em để ngay trên màn hình cho hôm nay', bin: 'desktop' },
        { id: 'drawing', name: 'A drawing you deleted this morning', nameVn: 'Một bức vẽ em đã xoá sáng nay', bin: 'bin' },
      ],
      explain: 'Your own work, saved properly, is in **Documents**. Anything the browser fetched lands in **Downloads** — move what you want to keep. The **Desktop** is the screen itself, fine for today. And a deleted drawing waits in the **Recycle Bin**, where you can still get it back.',
      explainVn: 'Bài của chính em, được lưu đúng cách, nằm trong **Documents**. Mọi thứ trình duyệt tải về đều rơi vào **Downloads** — thứ gì muốn giữ thì hãy chuyển đi. **Desktop** là chính màn hình nền, dùng cho hôm nay thì được. Còn bức vẽ đã xoá đang nằm chờ trong **Recycle Bin**, nơi em vẫn lấy lại được.',
    },
  },

  // 17 ─ Two ways to do everything + CHECK ─────────────────────────────────
  {
    layout: 'split',
    icon: 'Hand',
    accent: PURPLE,
    eyebrow: 'Never stuck',
    eyebrowVn: 'Không bao giờ bí',
    title: 'Two ways to do everything',
    titleVn: 'Việc gì cũng có hai cách',
    ratio: 55,
    inlineSvg: DIAGRAMS.TWO_WAYS,
    content: '**Save**: the Save button, or **Ctrl+S** on the keyboard (**Cmd+S** on a Mac).\n\n**A file\'s actions** — Rename, Move to, Delete: tap its **⋮** button, or **right-click** the file.\n\nIf one way does not work on a computer, try the other.',
    contentVn: '**Lưu**: nút Save, hoặc **Ctrl+S** trên bàn phím (**Cmd+S** trên máy Mac).\n\n**Các thao tác với một tệp** — Rename (đổi tên), Move to (chuyển đến), Delete (xoá): chạm vào nút **⋮** của nó, hoặc **bấm chuột phải** vào tệp.\n\nNếu một cách không dùng được trên máy nào đó, hãy thử cách kia.',
    check: {
      id: 'chk_two_ways',
      q: 'You cannot find the ⋮ button on a file. What else opens the same list of actions?',
      qVn: 'Em không tìm thấy nút ⋮ trên một tệp. Cách nào khác mở ra cùng danh sách thao tác đó?',
      options: [
        { val: 'A', text: 'Double-clicking the file', textVn: 'Bấm đúp vào tệp' },
        { val: 'B', text: 'Pressing Ctrl+S', textVn: 'Bấm Ctrl+S' },
        { val: 'C', text: 'Right-clicking the file', textVn: 'Bấm chuột phải vào tệp' },
        { val: 'D', text: 'Dragging the file onto the Recycle Bin', textVn: 'Kéo tệp thả vào Recycle Bin' },
      ],
      correct: 'C',
      expEn: '**Right-click** opens the same menu as the ⋮ button. Double-clicking **opens** the file (A). Ctrl+S **saves** the document you are working on (B). Dragging onto the Recycle Bin **deletes** it (D) — useful, but not the menu.',
      expVn: '**Bấm chuột phải** mở ra cùng trình đơn với nút ⋮. Bấm đúp là **mở** tệp (A). Ctrl+S là **lưu** tài liệu em đang làm (B). Kéo vào Recycle Bin là **xoá** tệp (D) — có ích, nhưng không phải là trình đơn.',
    },
  },

  // 18 ─ The file manager (labelled) ───────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'LayoutGrid',
    accent: SKY,
    eyebrow: 'Where your files live',
    eyebrowVn: 'Nơi cất giữ các tệp của em',
    title: 'The file manager',
    titleVn: 'Trình quản lý tệp',
    inlineSvg: DIAGRAMS.LB_FILE_MANAGER,
    caption: 'The **folder list** is on the left — tap one to open it. The **file list** shows everything in that folder. The **search box** finds a file by its name. Every file has a **⋮** for its actions. Deleted files wait in the **Recycle Bin**.',
    captionVn: '**Danh sách thư mục** ở bên trái — chạm vào một thư mục để mở. **Danh sách tệp** cho thấy mọi thứ trong thư mục đó. **Ô tìm kiếm** tìm một tệp theo tên. Tệp nào cũng có nút **⋮** cho các thao tác. Tệp đã xoá nằm chờ trong **Recycle Bin** (thùng rác).',
  },

  // 19 ─ HOTSPOT — where deleted files wait ────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'MousePointerClick',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Where did it go?',
    titleVn: 'Nó đã đi đâu?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'You deleted a file a minute ago. Now you want it back.',
    textVn: 'Một phút trước em đã xoá một tệp. Bây giờ em muốn lấy nó lại.',
    sub: 'Tap the folder where deleted files **wait**.',
    subVn: 'Chạm vào thư mục nơi các tệp đã xoá **nằm chờ**.',
    activity: {
      id: 'act_bin_folder',
      type: 'hotspot',
      prompt: 'Tap the folder where deleted files wait.',
      promptVn: 'Chạm vào thư mục nơi các tệp đã xoá nằm chờ.',
      svg: DIAGRAMS.FILE_MANAGER,
      viewBox: '210 20 520 440',
      targets: [
        ...along({ id: 'bin', y: 236, r: 18, name: 'Recycle Bin', nameVn: 'Recycle Bin' }, FOLDER_ROW),
        ...along({ id: 'documents', y: 110, r: 18, name: 'Documents — your own work, the folder open now', nameVn: 'Documents — bài của chính em, thư mục đang mở' }, FOLDER_ROW),
        ...along({ id: 'downloads', y: 152, r: 18, name: 'Downloads — things from the internet', nameVn: 'Downloads — những thứ tải từ internet' }, FOLDER_ROW),
        ...along({ id: 'desktop', y: 194, r: 18, name: 'Desktop — the screen itself', nameVn: 'Desktop — chính màn hình nền' }, FOLDER_ROW),
        ...along({ id: 'search', y: 104, r: 14, name: 'the search box — it finds files, it does not hold them', nameVn: 'ô tìm kiếm — nó tìm tệp, không chứa tệp' }, [584, 612, 640, 668]),
        ...along({ id: 'list', y: 219, r: 85, name: 'the files in Documents — the deleted one is not here any more', nameVn: 'các tệp trong Documents — tệp đã xoá không còn ở đây nữa' }, [480, 616]),
      ],
      correct: 'bin',
      explain: 'The **Recycle Bin**, at the bottom of the folder list. Deleting a file **moves** it there — it is not destroyed. Open the bin, find the file, and **Put it back**: it goes home to the folder it came from.',
      explainVn: '**Recycle Bin**, ở cuối danh sách thư mục. Xoá một tệp là **chuyển** nó vào đó — nó không bị huỷ. Mở thùng rác, tìm tệp, và chọn **Put it back** (đặt lại chỗ cũ): nó sẽ về đúng thư mục ban đầu.',
    },
  },

  // 20 ─ Delete is a move + CHECK ──────────────────────────────────────────
  {
    layout: 'statement',
    icon: 'RotateCcw',
    accent: AMBER,
    label: 'Before you panic',
    labelVn: 'Trước khi hoảng hốt',
    title: 'Delete is a move',
    titleVn: 'Xoá là một lần di chuyển',
    text: 'You press **Delete** on the wrong file. It vanishes from the folder.',
    textVn: 'Em bấm **Delete** nhầm tệp. Nó biến mất khỏi thư mục.',
    sub: 'It is not gone. Knowing where it went is worth more than being careful — everybody deletes something by mistake one day.',
    subVn: 'Nó chưa mất đâu. Biết nó đã đi đâu còn quý hơn cả sự cẩn thận — ai rồi cũng có ngày lỡ tay xoá nhầm thứ gì đó.',
    check: {
      id: 'chk_bin',
      q: 'You delete a file by mistake. What has actually happened to it?',
      qVn: 'Em lỡ tay xoá một tệp. Thật ra điều gì đã xảy ra với nó?',
      options: [
        { val: 'A', text: 'It is gone forever.', textVn: 'Nó mất vĩnh viễn.' },
        { val: 'B', text: 'It moved to the Recycle Bin, and you can put it back.', textVn: 'Nó chuyển vào Recycle Bin, và em lấy lại được.' },
        { val: 'C', text: 'It is hidden in the same folder until you restart.', textVn: 'Nó bị ẩn trong cùng thư mục cho đến khi em khởi động lại máy.' },
        { val: 'D', text: 'It moved to Downloads.', textVn: 'Nó chuyển vào Downloads.' },
      ],
      correct: 'B',
      expEn: 'Deleting is a **move**, not a destruction: the file goes to the **Recycle Bin** and sits there, whole, until the bin is emptied. It is not gone (A), not hiding in its folder (C), and Downloads is only for things from the internet (D). The next slide gets one back.',
      expVn: 'Xoá là một lần **di chuyển**, không phải huỷ diệt: tệp vào **Recycle Bin** và nằm đó, còn nguyên vẹn, cho đến khi thùng rác được dọn sạch. Nó không mất (A), không trốn trong thư mục cũ (C), và Downloads chỉ dành cho những thứ tải từ internet (D). Slide sau sẽ lấy một tệp trở lại.',
    },
  },

  // 21 ─ AppSim demo — get it back from the bin ────────────────────────────
  {
    layout: 'split',
    icon: 'RotateCcw',
    accent: '#0284c7',
    ratio: 62,
    title: 'Get it back from the bin',
    titleVn: 'Lấy lại từ thùng rác',
    content: 'Watch a mistake being undone. The wrong file is **deleted**. It leaves Documents — and turns up in the **Recycle Bin**, exactly as it was. **Put it back** sends it home.',
    contentVn: 'Hãy xem một lỗi được sửa. Tệp bị **xoá** nhầm. Nó rời khỏi Documents — và xuất hiện trong **Recycle Bin**, y nguyên như cũ. **Put it back** đưa nó về chỗ cũ.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'files',
        initial: {
          cwd: 'Documents',
          files: [
            { name: 'homework.docx', in: 'Documents' },
            { name: 'old notes.docx', in: 'Documents' },
            { name: 'volcano report.docx', in: 'Documents' },
          ],
        },
        script: [
          { type: 'select', name: 'homework.docx', say: 'You meant to delete old notes — but you tap homework instead.', sayVn: 'Em định xoá old notes — nhưng lại chạm nhầm vào homework.' },
          { type: 'remove', name: 'homework.docx', say: 'Delete. Homework disappears from Documents.', sayVn: 'Delete. Homework biến mất khỏi Documents.' },
          { type: 'openFolder', folder: 'Recycle Bin', say: 'Deleting is only a move. Open the Recycle Bin.', sayVn: 'Xoá chỉ là di chuyển. Mở Recycle Bin ra.' },
          { type: 'select', name: 'homework.docx', say: 'There it is — nothing inside it has changed.', sayVn: 'Nó đây rồi — bên trong không có gì thay đổi.' },
          { type: 'restore', name: 'homework.docx', say: 'Put it back. It goes home to the folder it came from.', sayVn: 'Put it back. Nó trở về đúng thư mục ban đầu.' },
          { type: 'openFolder', folder: 'Documents', say: 'Back in Documents, exactly where it was.', sayVn: 'Đã về lại Documents, đúng chỗ cũ.' },
        ],
      },
    },
    notes: [
      {
        tone: 'plant',
        text: 'Deleted by mistake? **Recycle Bin** → the file\'s **⋮** (or right-click) → **Put it back**.',
        textVn: 'Lỡ xoá nhầm? **Recycle Bin** → nút **⋮** của tệp (hoặc bấm chuột phải) → **Put it back**.',
      },
    ],
  },

  // 22 ─ PREDICT — emptying the bin ────────────────────────────────────────
  {
    layout: 'statement',
    accent: AMBER,
    icon: 'AlertTriangle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Empty the bin?',
    titleVn: 'Dọn sạch thùng rác?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Your Recycle Bin is full of old files. It has a button: **Empty Recycle Bin**.',
    textVn: 'Recycle Bin của em đầy những tệp cũ. Nó có một nút: **Empty Recycle Bin** (dọn sạch thùng rác).',
    sub: 'What happens to the files in the bin when you press it?',
    subVn: 'Chuyện gì xảy ra với các tệp trong thùng rác khi em bấm nút đó?',
    activity: {
      id: 'act_empty_bin',
      type: 'predict',
      prompt: 'You press Empty Recycle Bin. What happens to the files in it?',
      promptVn: 'Em bấm Empty Recycle Bin. Các tệp trong đó sẽ ra sao?',
      options: [
        { val: 'back', name: 'They go back to the folders they came from', nameVn: 'Chúng trở về các thư mục ban đầu' },
        { val: 'gone', name: 'They are gone for good', nameVn: 'Chúng mất hẳn, không lấy lại được' },
        { val: 'downloads', name: 'They move to Downloads', nameVn: 'Chúng chuyển vào Downloads' },
        { val: 'restart', name: 'Nothing happens until you restart', nameVn: 'Không có gì xảy ra cho đến khi em khởi động lại máy' },
      ],
      correct: 'gone',
      explain: '**Gone for good.** Emptying the bin is the one delete you **cannot** undo — there is no bin for the bin. So before you empty it, look inside: is there anything you still want?',
      explainVn: '**Mất hẳn.** Dọn sạch thùng rác là lần xoá duy nhất em **không thể** hoàn tác — không có thùng rác nào cho thùng rác cả. Vì vậy trước khi dọn, hãy nhìn vào bên trong: có thứ gì em vẫn còn cần không?',
    },
  },

  // 23 ─ Lost it? Search + CHECK ───────────────────────────────────────────
  {
    layout: 'split',
    icon: 'ScanEye',
    accent: SKY,
    eyebrow: 'Lost it?',
    eyebrowVn: 'Làm thất lạc rồi à?',
    title: 'Search for part of the name',
    titleVn: 'Tìm bằng một phần của tên',
    ratio: 55,
    inlineSvg: DIAGRAMS.SEARCH_RESULTS,
    content: 'Saved it, but not sure where? Type **part of its name** in the file manager\'s **search box**. It looks through your folders and lists every file whose name has those letters — and says where each one is.\n\nYou do not need the whole name, or the capital letters.',
    contentVn: 'Đã lưu rồi, nhưng không chắc ở đâu? Gõ **một phần tên** của nó vào **ô tìm kiếm** của trình quản lý tệp. Nó sẽ tìm trong các thư mục của em và liệt kê mọi tệp có tên chứa những chữ đó — kèm theo nơi mỗi tệp đang nằm.\n\nEm không cần gõ cả tên, cũng không cần viết hoa đúng.',
    check: {
      id: 'chk_search',
      q: 'You saved a rainforest poster last week. You cannot remember its exact name or folder. What do you type in the search box?',
      qVn: 'Tuần trước em đã lưu một tấm áp phích về rừng mưa. Em không nhớ chính xác tên hay thư mục của nó. Em gõ gì vào ô tìm kiếm?',
      options: [
        { val: 'A', text: 'rainforest — a word you are sure is in the name', textVn: 'rainforest — một từ em chắc chắn có trong tên' },
        { val: 'B', text: 'where is my poster from last week', textVn: 'where is my poster from last week (tấm áp phích tuần trước của mình đâu)' },
        { val: 'C', text: 'Documents', textVn: 'Documents' },
        { val: 'D', text: 'Untitled', textVn: 'Untitled' },
      ],
      correct: 'A',
      expEn: 'Type **one word you are sure is in the name**. The search box matches file names, not questions (B). Documents (C) is a folder, and would find only files with "Documents" in their name. Untitled (D) finds every file the computer named — and if your poster is one of those, that is a lesson about naming.',
      expVn: 'Hãy gõ **một từ em chắc chắn có trong tên**. Ô tìm kiếm so khớp với tên tệp, không trả lời câu hỏi (B). Documents (C) là một thư mục, và chỉ tìm ra những tệp có chữ "Documents" trong tên. Untitled (D) sẽ tìm ra mọi tệp do máy tính đặt tên — và nếu áp phích của em nằm trong số đó, thì đó là một bài học về cách đặt tên.',
    },
  },

  // 24 ─ Checklist + CHECK (the exit question) ─────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: SKY,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can you do these?',
    titleVn: 'Em làm được chưa?',
    content: 'Next: the Vocab, then **Try It** — six real jobs on the same file manager you just watched.\n\nLast question: the whole habit, in one go.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Thử Làm** — sáu việc thật trên chính trình quản lý tệp em vừa xem.\n\nCâu hỏi cuối: toàn bộ thói quen, gói gọn một lần.',
    items: [
      { text: 'Spot work that is **not saved yet**: a **dot •** in the title.', textVn: 'Nhận ra bài **chưa được lưu**: một **dấu chấm •** trên thanh tiêu đề.' },
      { text: 'Save new work: **Save** (or **Ctrl+S**), a **name** you will know next month, **Documents**, Save.', textVn: 'Lưu bài mới: **Save** (hoặc **Ctrl+S**), một **cái tên** tháng sau em vẫn hiểu, **Documents**, Save.' },
      { text: 'Keep a first draft with **Save As** and a **new name**.', textVn: 'Giữ bản nháp đầu tiên bằng **Save As** và một **tên mới**.' },
      { text: 'Get a deleted file back from the **Recycle Bin**, and find a lost one with **search**.', textVn: 'Lấy lại tệp đã xoá từ **Recycle Bin**, và tìm tệp thất lạc bằng **ô tìm kiếm**.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'You have just finished a brand-new story. Which is the whole habit for saving it?',
      qVn: 'Em vừa viết xong một câu chuyện hoàn toàn mới. Đâu là toàn bộ thói quen để lưu nó?',
      options: [
        { val: 'A', text: 'Press Save and click straight through the box.', textVn: 'Bấm Save và bấm thẳng qua hộp thoại.' },
        { val: 'B', text: 'Save As into Downloads, with the name "final".', textVn: 'Save As vào Downloads, với tên "final".' },
        { val: 'C', text: 'Press Save (or Ctrl+S), type a name you will know next month, choose Documents, then Save — and check the top.', textVn: 'Bấm Save (hoặc Ctrl+S), gõ một cái tên tháng sau em vẫn hiểu, chọn Documents, rồi Save — và kiểm tra phía trên.' },
        { val: 'D', text: 'Leave the window open — the computer saves it by itself.', textVn: 'Cứ để cửa sổ mở — máy tính sẽ tự lưu.' },
      ],
      correct: 'C',
      expEn: 'All of **C**: open the box, answer **both** questions, save, and glance at the top to prove it. A saves it as Untitled somewhere you did not choose. B puts your own work in the internet\'s folder under a name that means nothing. D is the power cut from the start of this lesson.',
      expVn: 'Toàn bộ **C**: mở hộp thoại, trả lời **cả hai** câu hỏi, lưu, rồi liếc lên phía trên để chắc chắn. A sẽ lưu thành Untitled ở chỗ em không chọn. B đặt bài của chính em vào thư mục của internet với một cái tên chẳng có nghĩa gì. D chính là vụ mất điện ở đầu bài học này.',
    },
  },

  // 25 ─ On your own computer (unassessed, always last) ────────────────────
  {
    layout: 'callout',
    icon: 'Sparkles',
    accent: '#10b981',
    eyebrow: 'On your own computer',
    eyebrowVn: 'Trên máy tính của em',
    title: 'Do this for real, today',
    titleVn: 'Hãy làm thật, ngay hôm nay',
    content: 'The simulator is a rehearsal. Filing something real, on a real machine, is the part that sticks.',
    contentVn: 'Phần mô phỏng chỉ là tập dượt. Cất một thứ có thật, trên một chiếc máy thật, mới là phần đọng lại.',
    notes: [
      {
        tone: 'task',
        text: 'Write one sentence in any program. Press **Ctrl+S** (or **Cmd+S**) and **save it into Documents** with a name you chose.',
        textVn: 'Viết một câu bất kỳ trong một chương trình nào đó. Bấm **Ctrl+S** (hoặc **Cmd+S**) và **lưu vào Documents** với cái tên do em chọn.',
      },
      {
        tone: 'task',
        text: 'Close it completely. Now **find it again** with the file manager\'s **search box** — without opening the program you wrote it in.',
        textVn: 'Đóng hẳn nó lại. Bây giờ **tìm lại nó** bằng **ô tìm kiếm** của trình quản lý tệp — mà không mở chương trình em đã dùng để viết.',
      },
      {
        tone: 'task',
        text: 'Open the **Downloads** folder and count how many things are in there that you do not need.',
        textVn: 'Mở thư mục **Downloads** và đếm xem có bao nhiêu thứ trong đó em không cần đến.',
      },
    ],
  },
];
