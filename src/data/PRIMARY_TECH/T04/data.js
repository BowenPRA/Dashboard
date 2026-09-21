// src/data/PRIMARY_TECH/T04/data.js
// T4 Saving Your Work — the first unit built on the simulator, rebuilt to the
// Year 7 standard (docs/primary-tech/UPGRADE-PLAN.md §2, §5 and the §6 T4 brief).
//
// "Save a piece of work, name it so you will know it next month, and know where
// it went" is a job, not a fact, and there is no honest way to assess it with a
// multiple-choice question. Try It carries the doing (six jobs on the `files`
// skin); the deck SHOWS the same machine in two demos; the Quiz, the written
// answers and the source pictures ask the when and why the doing cannot.
//
// GATE STRUCTURE — §2 of the upgrade plan:
//
//   Gate 0 · Learn   0   NOTES 20 · WORD_REC 15                                  = 35
//   Gate 1 · Do      25  SIM 25 · LABEL_IT 15 · POINT_IT 10 · WORKBOOK 15
//                        · TYPE_GYM 10                                          = 75
//   Gate 2 · Prove   80  SHORT_ANSWERS 10 · DIAGRAMS 10 · ASSESSMENT 20 · GAMES 0 = 40
//
// Gate 1 sits at 25 of the 35 before it (71%); Gate 2 at 80 of 110 (73%).
// 150 XP available, capped at 100. Both gates inside the 80% rule the
// validator enforces — re-derive whenever a task's XP changes.
//
// Module properties are written in full (`notes: notes,`): a shorthand right
// after realWords makes the audio generator skip the word audio.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { pointIt } from './pointIt.js';
import { sim } from './sim.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const T04_DATA = {
  meta: {
    id: 'T04',
    title: 'Saving Your Work',
    desc: 'Save a piece of work, give it a name you will still understand next month, and know exactly which folder it went into — plus Save As for a second version, and how to get a file back when it is deleted or lost.',
    track: 'PRIMARY_TECH',
    icon: 'Boxes',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 15 },
      ],
    },
    {
      // 25 of the 35 XP before it (71%).
      id: 'practice',
      title: 'Gate 1: Do',
      threshold: 25,
      tasks: [
        { id: 'SIM', dbKey: 'p25', maxXP: 25 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 15 },
        { id: 'POINT_IT', dbKey: 'p24', maxXP: 10 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
        { id: 'TYPE_GYM', dbKey: 'p26', maxXP: 10 },
      ],
    },
    {
      // 80 of the 110 XP before it (73%).
      id: 'mastery',
      title: 'Gate 2: Prove',
      threshold: 80,
      tasks: [
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 10 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 10 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // The interface words. On this track they are not decoration around the
  // subject — the interface is in English, and knowing what the button is
  // called IS the skill (docs/digital-skills-course.md §5.3).
  realWords: [
    {
      word: 'Save', isReal: true, vn: 'Lưu',
      def: 'To write your work onto the computer so it is still there after you close it.',
      vnDef: 'Ghi bài làm của em vào máy tính để nó vẫn còn đó sau khi em đóng lại.',
      sent: 'Save your work before you close the window.',
      vnSent: 'Hãy lưu bài trước khi em đóng cửa sổ.',
    },
    {
      word: 'Save As', isReal: true, vn: 'Lưu thành bản mới',
      def: 'To save the same work as a NEW file, with a different name or in a different folder. You end up with two.',
      vnDef: 'Lưu cùng một bài thành một tệp MỚI, với tên khác hoặc trong thư mục khác. Kết quả là em có hai tệp.',
      sent: 'Use Save As to keep your first draft.',
      vnSent: 'Hãy dùng Save As để giữ lại bản nháp đầu tiên.',
    },
    {
      word: 'File', isReal: true, vn: 'Tệp',
      def: 'One saved thing on a computer: a document, a picture, a song. It has a name and it lives in a folder.',
      vnDef: 'Một thứ đã lưu trên máy tính: một tài liệu, một tấm ảnh, một bài hát. Nó có tên và nằm trong một thư mục.',
      sent: 'Open the file you saved yesterday.',
      vnSent: 'Hãy mở tệp em đã lưu hôm qua.',
    },
    {
      word: 'File name', isReal: true, vn: 'Tên tệp',
      def: 'What a file is called. You choose it, and you are choosing it for yourself in the future.',
      vnDef: 'Tên gọi của một tệp. Em tự chọn, và em đang chọn cho chính em trong tương lai.',
      sent: 'Give it a file name you will remember.',
      vnSent: 'Hãy đặt cho nó một tên tệp mà em sẽ nhớ.',
    },
    {
      word: 'Folder', isReal: true, vn: 'Thư mục',
      def: 'A box on the computer that holds files, so they are not all in one pile.',
      vnDef: 'Một cái hộp trên máy tính chứa các tệp, để chúng không nằm lẫn lộn thành một đống.',
      sent: 'Put it in the Documents folder.',
      vnSent: 'Hãy để nó vào thư mục Documents.',
    },
    {
      word: 'Documents', isReal: true, vn: 'Thư mục Documents',
      def: 'The folder for work you made yourself. School work belongs here.',
      vnDef: 'Thư mục dành cho những gì chính em tạo ra. Bài vở ở trường thuộc về đây.',
      sent: 'My report is in Documents.',
      vnSent: 'Bài báo cáo của em nằm trong Documents.',
    },
    {
      word: 'Downloads', isReal: true, vn: 'Thư mục Downloads',
      def: 'The folder where the browser puts things you fetch from the internet. Move anything you want to keep somewhere else.',
      vnDef: 'Thư mục nơi trình duyệt đặt những thứ em tải từ internet về. Thứ gì muốn giữ thì hãy chuyển sang chỗ khác.',
      sent: 'The worksheet I downloaded is in Downloads.',
      vnSent: 'Phiếu bài tập em tải về đang nằm trong Downloads.',
    },
    {
      word: 'Desktop', isReal: true, vn: 'Màn hình nền',
      def: 'The screen you see after logging in. It is also a folder, so things left there pile up in view.',
      vnDef: 'Màn hình em thấy sau khi đăng nhập. Nó cũng là một thư mục, nên thứ để đó sẽ chất đống ngay trước mắt.',
      sent: 'Do not leave everything on the desktop.',
      vnSent: 'Đừng để mọi thứ trên màn hình nền.',
    },
    {
      word: 'Rename', isReal: true, vn: 'Đổi tên',
      def: 'To change what a file is called, without changing what is inside it.',
      vnDef: 'Thay đổi tên gọi của một tệp, mà không thay đổi nội dung bên trong.',
      sent: 'Rename it to something you understand.',
      vnSent: 'Hãy đổi tên nó thành thứ gì đó em hiểu được.',
    },
    {
      word: 'Delete', isReal: true, vn: 'Xoá',
      def: 'To move a file to the Recycle Bin. It is not destroyed, and you can put it back.',
      vnDef: 'Chuyển một tệp vào Recycle Bin. Nó không bị huỷ, và em có thể lấy lại.',
      sent: 'Delete the ones you do not need.',
      vnSent: 'Hãy xoá những tệp em không cần.',
    },
    {
      word: 'Recycle Bin', isReal: true, vn: 'Thùng rác',
      def: 'The folder deleted files go to. Nothing there is really gone until the bin is emptied.',
      vnDef: 'Thư mục chứa các tệp đã xoá. Không gì trong đó thật sự mất cho đến khi thùng rác được dọn sạch.',
      sent: 'I found my homework in the Recycle Bin.',
      vnSent: 'Em đã tìm thấy bài tập của mình trong Recycle Bin.',
    },
    {
      word: 'Search box', isReal: true, vn: 'Ô tìm kiếm',
      def: 'The box in the file manager where you type part of a file\'s name to find it.',
      vnDef: 'Ô trong trình quản lý tệp, nơi em gõ một phần tên của tệp để tìm nó.',
      sent: 'Type volcano in the search box to find your report.',
      vnSent: 'Hãy gõ volcano vào ô tìm kiếm để tìm bài báo cáo của em.',
    },
  ],

  // Three written answers, one mark per scheme line (docs/question-quality.md).
  // Suggested words are domain vocabulary a strong answer USES; none of them is
  // a mark-scheme answer (the spoiler test, §3).
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between Save and Save As. Say how many files you end up with in each case, and give one reason you would choose Save As.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa Save và Save As. Nói rõ em có bao nhiêu tệp trong mỗi trường hợp, và nêu một lý do em sẽ chọn Save As.',
      suggestedWords: [['file'], ['draft', 'version'], ['folder']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: Save writes over the same file, so you still have one file.',
        '1 mark: Save As makes a new file, so you end up with two.',
        '1 mark: gives a sensible reason to use Save As — to keep the old draft, to make a copy somewhere else, or to give it a different name.',
      ],
      modelAnswer: 'Save puts the changes back into the file you already have, so afterwards there is still only one file and the old version is gone. Save As makes a brand new file with the name and folder you choose, so you end up with two: the one you started with and the new one. I would use Save As when I want to keep my first draft and work on a copy, so that if the new version goes wrong I still have the old one.',
    },
    {
      id: 'sq2',
      question: 'A friend says "I saved my work but now I cannot find it anywhere". Explain what has most likely happened, and describe what they should do.',
      vnTranslation: 'Một người bạn nói "mình đã lưu bài rồi mà giờ không tìm thấy đâu cả". Hãy giải thích điều gì nhiều khả năng đã xảy ra, và mô tả bạn ấy nên làm gì.',
      suggestedWords: [['file name'], ['folder'], ['Save As box', 'dialog']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the file is almost certainly still on the computer (saving rarely fails).',
        '1 mark: they did not read the two questions in the box, so it has a name they did not choose or is in a folder they did not choose.',
        '1 mark: describes a way to find it — search for part of its name, or look in the folder the computer would have used (such as Downloads or the Desktop).',
      ],
      modelAnswer: 'The work is almost certainly still there. When the box appeared it asked what the file should be called and which folder to put it in, and they clicked past both, so the computer answered for them — it probably has a name like Untitled or Document1 and it is in whichever folder the program chose, such as Downloads. They should type part of the name into the file manager\'s search box, or open Downloads and the Desktop and look for something saved today. Next time, reading those two questions takes two seconds and saves all of this.',
    },
    {
      id: 'sq3',
      question: 'Your friend deletes his science project by mistake and says it is gone forever. Explain why he is probably wrong, how he can get it back, and the one situation in which it really would be gone.',
      vnTranslation: 'Bạn của em lỡ tay xoá dự án khoa học và nói rằng nó đã mất vĩnh viễn. Hãy giải thích vì sao bạn ấy nhiều khả năng đã nhầm, bạn ấy có thể lấy lại nó bằng cách nào, và trường hợp duy nhất mà nó thật sự bị mất.',
      suggestedWords: [['file'], ['folder'], ['menu', 'right-click']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: deleting moves the file to the Recycle Bin — it is still on the computer, not destroyed.',
        '1 mark: describes getting it back: open the Recycle Bin, find the file, and put it back (restore it), so it returns to the folder it came from.',
        '1 mark: it would really be gone only if the Recycle Bin had been emptied.',
      ],
      modelAnswer: 'He is probably wrong, because deleting a file does not destroy it. It only moves the file to the Recycle Bin, where it stays exactly as it was. To get it back he should open the Recycle Bin, find his science project, open its menu with the ⋮ button or a right-click, and choose Put it back. It will go back to the folder it came from. The only time it would really be gone is if someone had emptied the Recycle Bin, because emptying the bin cannot be undone.',
    },
  ],

  // Source analysis (DIAGRAMS): three pictures to READ — two MCQ, one written.
  // The grader cannot see a picture, so the written item's imageAlt, mark
  // scheme and model answer describe it in full (docs/svg-diagrams.md §7).
  diagrams: [
    {
      id: 'diag_1_desktop_mess',
      type: 'mcq',
      inlineSvg: DIAGRAMS.SA_DESKTOP_MESS,
      imageAlt: 'A computer desktop covered in eighteen icons: Untitled1.docx to Untitled5.docx, Document1.docx to Document3.docx, asdf.docx, final.docx, final (2).docx, final FINAL.docx, doc.docx, stuff.docx, IMG_0412.jpg, IMG_0413.jpg, and two folders called New folder and New folder (2). A taskbar runs along the bottom with the time 14:05.',
      promptText: 'Linh says: "I saved my science report on this desktop last week, but I cannot find it." Look at the desktop. What is the real problem?',
      options: [
        { val: 'A', text: 'The computer is full, so the report was never saved.' },
        { val: 'B', text: 'None of the names says what is inside, so the report could be any of these files.' },
        { val: 'C', text: 'The report must have been deleted, because no icon says "science".' },
        { val: 'D', text: 'There are too many icons, so the computer has hidden some of them.' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'The report is almost certainly there — it is just called something like Untitled3 or Document2, because Linh clicked past the name question every time. No name says "science", but that does not mean it was deleted (C); it means every file has to be opened to find it. Nothing here says the computer is full (A) or hiding icons (D).',
      expVn: 'Bài báo cáo gần như chắc chắn vẫn ở đó — chỉ là nó mang tên kiểu Untitled3 hay Document2, vì lần nào Linh cũng bấm bỏ qua câu hỏi về tên. Không có tên nào ghi "science", nhưng điều đó không có nghĩa là nó đã bị xoá (C); nó có nghĩa là phải mở từng tệp một mới tìm ra. Không có dấu hiệu nào cho thấy máy tính bị đầy (A) hay đang giấu biểu tượng (D).',
    },
    {
      id: 'diag_2_downloads_today',
      type: 'mcq',
      inlineSvg: DIAGRAMS.SA_DOWNLOADS,
      imageAlt: 'A Downloads folder sorted by name, with a Date column. class-photo.jpg, 3 Sep 2026; maths-sheet (1).pdf, 21 Sep 2026 at 08:14; maths-sheet.pdf, 7 Sep 2026; reading-list.pdf, 14 Aug 2026; summer-reading.pdf, 2 Jul 2026. The clock on the taskbar says 08:20, Mon 21 Sep 2026.',
      promptText: 'This morning you downloaded your maths worksheet. Look at the Downloads folder and the clock. Which file did you download today?',
      options: [
        { val: 'A', text: 'maths-sheet.pdf — it has exactly the right name.' },
        { val: 'B', text: 'class-photo.jpg — it is at the top, and new downloads go to the top.' },
        { val: 'C', text: 'maths-sheet (1).pdf — its date is today.' },
        { val: 'D', text: 'You cannot tell which one is newer from this window.' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'Read the Date column against the clock: today is Monday 21 September, and only maths-sheet (1).pdf arrived today, at 08:14. The same worksheet was also downloaded on 7 September, so the computer added "(1)" to keep both — maths-sheet.pdf (A) is the OLD one. The list is sorted by name, not by date (B), and the dates are right there (D).',
      expVn: 'Hãy đọc cột Date (ngày) và so với đồng hồ: hôm nay là thứ Hai, 21 tháng 9, và chỉ có maths-sheet (1).pdf đến hôm nay, lúc 08:14. Phiếu bài tập này cũng đã được tải về ngày 7 tháng 9, nên máy tính thêm "(1)" để giữ cả hai — maths-sheet.pdf (A) là tệp CŨ. Danh sách được sắp theo tên, không theo ngày (B), và ngày tháng hiện ngay đó (D).',
    },
    {
      id: 'diag_3_good_names',
      inlineSvg: DIAGRAMS.SA_DOCUMENTS,
      imageAlt: 'A Documents folder listing eight files in alphabetical order: asdf.docx, doc.docx, final FINAL.docx, maths homework week 3.docx, rainforest poster.png, science test notes.docx, Untitled3.docx and volcano report.docx.',
      promptText: 'This is Minh\'s Documents folder. Choose TWO file names he will still understand next month, and ONE he will not. Explain what makes a file name good.',
      suggestedWords: [['file name'], ['because'], ['search', 'find']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: names TWO good file names from the folder — any two of maths homework week 3, rainforest poster, science test notes, volcano report.',
        '1 mark: names ONE poor file name from the folder — any of asdf, doc, final FINAL, Untitled3.',
        '1 mark: explains that a good name says what the file is (what is inside), so you can find it without opening it, and that the poor one does not.',
      ],
      modelAnswer: 'Next month Minh will still understand "science test notes" and "maths homework week 3", because each one says what the work is, and the second even says which week it was for. He will not understand "Untitled3", because that is the name the computer gave the file when he did not type one, and it tells him nothing about what is inside. A good file name says what the file actually is, in words you would think of when you are looking for it, so you can find it without opening every file.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the deck's two labelled interface pictures,
  // labels stripped at runtime. The words ON the screen stay (class="keep"), so
  // the Save As box is labelled by what each part DOES. Each bank carries a
  // distractor that is absent from the picture. Pin coordinates are the leader
  // lines in diagrams.js (`node scripts/svg-coords.mjs PRIMARY_TECH/T04 LB_SAVE_AS`).
  labelIt: [
    {
      id: 'save-as',
      title: 'Label the Save As box: what does each part do?',
      titleVn: 'Gắn nhãn hộp thoại Save As: mỗi phần làm gì?',
      inlineSvg: DIAGRAMS.LB_SAVE_AS,
      viewBox: '0 0 940 460',
      pins: [
        { id: 'p1', x: 722, y: 163, to: [678, 163], answer: 'name' },
        { id: 'p2', x: 218, y: 254, to: [262, 254], answer: 'folder' },
        { id: 'p3', x: 722, y: 361, to: [678, 361], answer: 'save' },
        { id: 'p4', x: 218, y: 361, to: [458, 361], answer: 'cancel' },
      ],
      bank: [
        { val: 'name', text: 'Where the name goes', textVn: 'Chỗ gõ tên tệp' },
        { val: 'folder', text: 'Where it will be kept', textVn: 'Nơi tệp sẽ được cất' },
        { val: 'save', text: 'Saves the file', textVn: 'Lưu tệp lại' },
        { val: 'cancel', text: 'Closes without saving', textVn: 'Đóng lại, không lưu' },
        { val: 'delete', text: 'Deletes the file', textVn: 'Xoá tệp' },
      ],
    },
    {
      id: 'file-manager',
      title: 'Label the file manager',
      titleVn: 'Gắn nhãn trình quản lý tệp',
      inlineSvg: DIAGRAMS.LB_FILE_MANAGER,
      viewBox: '0 0 940 480',
      pins: [
        { id: 'p1', x: 218, y: 152, to: [262, 152], answer: 'folders' },
        { id: 'p2', x: 218, y: 236, to: [260, 236], answer: 'bin' },
        { id: 'p3', x: 722, y: 104, to: [692, 104], answer: 'search' },
        { id: 'p4', x: 722, y: 153, to: [684, 153], answer: 'menu' },
        { id: 'p5', x: 722, y: 340, to: [604, 292], answer: 'files' },
      ],
      bank: [
        { val: 'folders', text: 'Folder list', textVn: 'Danh sách thư mục' },
        { val: 'files', text: 'File list', textVn: 'Danh sách tệp' },
        { val: 'search', text: 'Search box', textVn: 'Ô tìm kiếm' },
        { val: 'bin', text: 'Recycle Bin', textVn: 'Thùng rác' },
        { val: 'menu', text: 'A file\'s ⋮ menu', textVn: 'Nút ⋮ của một tệp' },
        { val: 'address', text: 'Address bar', textVn: 'Thanh địa chỉ' },
      ],
    },
  ],

  // Typing Gym (UPGRADE-PLAN §3.2): lines drawn fresh every session from these
  // pools and the home row. Plain ASCII only.
  typeGym: {
    title: 'Typing Gym',
    titleVn: 'Phòng tập gõ phím',
    modes: ['home', 'words', 'names'],
    rounds: 6,
    words: ['save', 'file', 'folder', 'rename', 'delete', 'search', 'documents', 'downloads', 'desktop', 'recycle bin'],
    names: [
      'volcano report',
      'maths homework week 3',
      'science test notes',
      'rainforest poster',
      'class trip plan',
      'my first story',
      'holiday photos 2026',
      'reading list',
    ],
    target: { wpm: 8, accuracy: 0.9 },
  },

  notes: notes,
  workbook: workbook,
  pointIt: pointIt,
  sim: sim,
  assessment: assessment,
  games: games,
};
