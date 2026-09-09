// src/data/PRIMARY_TECH/T04/notes.js
// T4 Saving Your Work — the lesson deck (NOTES, 10 XP). Nine slides, three checks.
//
// Slide 4 is the payoff of the whole simulator build: it embeds the SAME engine
// and the SAME window the Try It task uses, in demo mode, driving itself through
// the save while the deck explains it (docs/digital-skills-course.md §5.1). The
// student watches exactly the machine they are about to be handed. SHOW and DO
// are one component.
//
// Reminders that cost a slide its point if forgotten, both measured:
//   · never put a `check` on a `showcase` — it shrinks the picture past readable;
//   · `CompareLayout` silently drops `inlineSvg`.
// See docs/lesson-renderer-gap.md §0.
import { DIAGRAMS } from './diagrams.js';

export const notes = [
  {
    layout: 'hero',
    color: '#0ea5e9',
    icon: 'Boxes',
    brand: 'Technology',
    brandVn: 'Công nghệ',
    eyebrow: 'Unit T4',
    eyebrowVn: 'Bài T4',
    title: 'Saving Your Work',
    titleVn: 'Lưu Bài Của Em',
    objective: 'Save a piece of work, give it a name you will still understand next week, and know exactly where it went.',
    objectiveVn: 'Lưu một bài làm, đặt cho nó cái tên mà tuần sau em vẫn hiểu, và biết chính xác nó đã đi đâu.',
    card: {
      icon: 'Pencil',
      badge: 'Before you start',
      badgeVn: 'Trước khi bắt đầu',
      text: 'Think of something you made on a computer before. **Could you find it again right now?**',
      textVn: 'Hãy nghĩ về một thứ em từng làm trên máy tính. **Ngay bây giờ em có tìm lại được nó không?**',
    },
  },
  {
    layout: 'statement',
    icon: 'AlertTriangle',
    accent: '#ef4444',
    label: 'The whole problem',
    labelVn: 'Toàn bộ vấn đề',
    title: 'Saving asks two questions',
    titleVn: 'Việc lưu bài hỏi em hai câu',
    text: 'Every time you save something for the first time, the computer asks: **what is it called**, and **where should it go**.',
    textVn: 'Mỗi lần em lưu một thứ lần đầu tiên, máy tính đều hỏi: **nó tên gì**, và **nó nên nằm ở đâu**.',
    sub: 'Most people click past both questions without reading them. That is the entire reason nobody can find their work.',
    subVn: 'Phần lớn mọi người bấm bỏ qua cả hai câu hỏi mà không đọc. Đó chính là lý do không ai tìm lại được bài của mình.',
    notes: [
      {
        tone: 'write',
        text: 'A file has a **name** and a **place**. If you do not choose them, the computer chooses badly for you.',
        textVn: 'Một tệp có **tên** và có **chỗ**. Nếu em không chọn, máy tính sẽ chọn thay em một cách tệ hại.',
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
      ],
      correct: 'A',
      expEn: 'The work is safe — it just has a name like Untitled1 and it is wherever the computer felt like putting it. That is why "I saved it but I cannot find it" is so common: it was saved, somewhere.',
      expVn: 'Bài vẫn an toàn — chỉ là nó mang cái tên kiểu Untitled1 và nằm ở chỗ máy tính tuỳ ý đặt. Vì vậy câu "em có lưu mà không tìm thấy" rất phổ biến: nó đã được lưu, ở đâu đó.',
    },
  },
  {
    layout: 'showcase',
    icon: 'ScanEye',
    accent: '#0ea5e9',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'The Save As box',
    titleVn: 'Hộp thoại Save As',
    inlineSvg: DIAGRAMS.SAVE_AS_DIALOG,
    caption: 'The **file name** box is the first question. The row of folders is the second — **Documents** for your work, **Downloads** for things off the internet. Then **Save**.',
    captionVn: 'Ô **file name** là câu hỏi thứ nhất. Hàng thư mục là câu hỏi thứ hai — **Documents** cho bài vở của em, **Downloads** cho những thứ tải từ internet. Rồi bấm **Save**.',
  },
  {
    // The simulator, in demo mode. Same engine, same window, same actions as the
    // Try It task — this slide is the reason the engine was worth building.
    layout: 'split',
    icon: 'Eye',
    accent: '#0284c7',
    ratio: 62,
    title: 'Watch it happen',
    titleVn: 'Xem nó diễn ra',
    content: 'Here is the whole job, done once, slowly. **Save** opens the box because this document has never been saved. A **name** is typed. A **folder** is chosen. Then Save.',
    contentVn: 'Đây là toàn bộ công việc, làm một lần, thật chậm. **Save** mở hộp thoại vì tài liệu này chưa từng được lưu. Một **cái tên** được gõ vào. Một **thư mục** được chọn. Rồi bấm Save.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'files',
        initial: { cwd: 'Documents', editor: { name: 'Untitled', ext: 'docx' }, files: [] },
        script: [
          { type: 'save', say: 'Save — and because it has never been saved, the box opens.', sayVn: 'Bấm Save — và vì chưa từng lưu, hộp thoại mở ra.' },
          { type: 'dialogName', name: 'volcano report', say: 'Type a name you will know next week.', sayVn: 'Gõ cái tên mà tuần sau em vẫn nhận ra.' },
          { type: 'dialogFolder', folder: 'Documents', say: 'Choose Documents — that is where school work lives.', sayVn: 'Chọn Documents — nơi để bài vở.' },
          { type: 'dialogConfirm', say: 'Saved. Look at the top: it now says where it went.', sayVn: 'Đã lưu. Hãy nhìn lên trên: nó cho biết tệp đã đi đâu.' },
        ],
      },
    },
    notes: [
      {
        tone: 'plant',
        text: 'The strip at the top always tells you whether the document is saved, and **where**.',
        textVn: 'Dải phía trên luôn cho em biết tài liệu đã lưu chưa, và **lưu ở đâu**.',
      },
    ],
  },
  {
    layout: 'showcase',
    icon: 'ArrowLeftRight',
    accent: '#16a34a',
    title: 'Save, or Save As?',
    titleVn: 'Save, hay Save As?',
    inlineSvg: DIAGRAMS.SAVE_VS_SAVE_AS,
    caption: 'They are not the same button with two names. **Save** keeps one file. **Save As** makes another one.',
    captionVn: 'Đây không phải một nút với hai tên gọi. **Save** giữ một tệp. **Save As** tạo thêm một tệp nữa.',
  },
  {
    layout: 'stack',
    icon: 'ListChecks',
    accent: '#0ea5e9',
    columns: 1,
    title: 'Naming it so you will know it',
    titleVn: 'Đặt tên để sau này còn nhận ra',
    content: 'A good file name answers **what is this** in a few words. You are writing it for **yourself next week**, not for right now.',
    contentVn: 'Một tên tệp tốt trả lời **đây là cái gì** chỉ trong vài từ. Em đang viết nó cho **chính em của tuần sau**, không phải cho lúc này.',
    notes: [
      {
        tone: 'write',
        text: 'Good: **volcano report**, **maths homework week 3**, **holiday photos 2026**.',
        textVn: 'Tốt: **volcano report**, **maths homework week 3**, **holiday photos 2026**.',
      },
      {
        tone: 'homework',
        text: 'Bad: **Untitled1**, **doc**, **asdf**, **new new final REAL final**.',
        textVn: 'Tệ: **Untitled1**, **doc**, **asdf**, **new new final REAL final**.',
      },
    ],
    check: {
      id: 'chk_naming',
      q: 'Which of these file names will be most useful to you in a month?',
      qVn: 'Tên tệp nào sau đây sẽ hữu ích nhất cho em sau một tháng?',
      options: [
        { val: 'A', text: 'Document2', textVn: 'Document2' },
        { val: 'B', text: 'science volcano report', textVn: 'science volcano report' },
        { val: 'C', text: 'final', textVn: 'final' },
      ],
      correct: 'B',
      expEn: 'It says what the thing actually is, so you can find it without opening it. "final" sounds decided today and means nothing in a month — especially once there are three of them.',
      expVn: 'Nó nói rõ đó thật sự là cái gì, nên em tìm được mà không cần mở ra. "final" nghe có vẻ dứt khoát hôm nay nhưng một tháng sau chẳng có nghĩa gì — nhất là khi em có tới ba tệp như vậy.',
    },
  },
  {
    layout: 'steps',
    icon: 'Boxes',
    accent: '#a855f7',
    title: 'Where things live',
    titleVn: 'Mọi thứ nằm ở đâu',
    content: 'Your computer already has folders with jobs. Using the right one is most of being organised.',
    contentVn: 'Máy tính của em đã có sẵn các thư mục với nhiệm vụ riêng. Dùng đúng thư mục đã là phần lớn của sự ngăn nắp.',
    steps: [
      { text: '**Documents** — work you made yourself. This is where school work goes.', textVn: '**Documents** — những gì chính em tạo ra. Bài vở ở đây.' },
      { text: '**Downloads** — things the browser fetched from the internet. It fills up with junk.', textVn: '**Downloads** — những thứ trình duyệt tải từ internet về. Nó luôn đầy đồ linh tinh.' },
      { text: '**Desktop** — the screen itself. Handy for today, a mess by next month.', textVn: '**Desktop** — chính màn hình nền. Tiện cho hôm nay, bừa bộn vào tháng sau.' },
      { text: '**Recycle Bin** — things you deleted. They are still there, and you can put them back.', textVn: '**Recycle Bin** — những thứ em đã xoá. Chúng vẫn còn đó, và em lấy lại được.' },
    ],
    check: {
      id: 'chk_bin',
      q: 'You delete a file by mistake. What has actually happened to it?',
      qVn: 'Em lỡ tay xoá một tệp. Thật ra điều gì đã xảy ra với nó?',
      options: [
        { val: 'A', text: 'It is gone forever.', textVn: 'Nó mất vĩnh viễn.' },
        { val: 'B', text: 'It moved to the Recycle Bin, and you can put it back.', textVn: 'Nó chuyển vào Recycle Bin, và em lấy lại được.' },
        { val: 'C', text: 'It was emailed to your teacher.', textVn: 'Nó được gửi email cho cô giáo.' },
      ],
      correct: 'B',
      expEn: 'Deleting is a move, not a destruction — the file goes to the bin and sits there. Knowing that is worth more than being careful, because you will delete something by mistake eventually.',
      expVn: 'Xoá là một hành động di chuyển, không phải huỷ diệt — tệp vào thùng rác và nằm đó. Biết điều này còn quý hơn cả sự cẩn thận, vì sớm muộn gì em cũng sẽ lỡ tay xoá thứ gì đó.',
    },
  },
  {
    layout: 'stack',
    icon: 'Target',
    accent: '#0ea5e9',
    columns: 1,
    title: 'Check your notebook',
    titleVn: 'Kiểm tra vở của em',
    content: 'Your notebook should now have **two definitions** and **one list of four folders**. Check.',
    contentVn: 'Vở của em bây giờ phải có **hai định nghĩa** và **một danh sách bốn thư mục**. Hãy kiểm tra.',
    notes: [
      {
        tone: 'write',
        text: 'The two: **Save** keeps one file · **Save As** makes another one.',
        textVn: 'Hai điều: **Save** giữ một tệp · **Save As** tạo thêm một tệp.',
      },
      {
        tone: 'info',
        text: 'Can you say what **Documents** is for, and what **Downloads** is for, without looking back?',
        textVn: 'Em có nói được **Documents** dùng để làm gì, và **Downloads** dùng để làm gì, mà không cần nhìn lại không?',
      },
    ],
  },
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
        text: 'Write one sentence in any program and **save it into Documents** with a name you chose.',
        textVn: 'Viết một câu bất kỳ trong chương trình nào đó và **lưu vào Documents** với cái tên do em chọn.',
      },
      {
        tone: 'task',
        text: 'Close it completely. Now **find it again** — without using the program you wrote it in.',
        textVn: 'Đóng hẳn nó lại. Bây giờ **tìm lại nó** — mà không dùng chương trình em đã viết.',
      },
      {
        tone: 'task',
        text: 'Open the **Downloads** folder and count how many things are in there that you do not need.',
        textVn: 'Mở thư mục **Downloads** và đếm xem có bao nhiêu thứ trong đó em không cần đến.',
      },
    ],
  },
];
