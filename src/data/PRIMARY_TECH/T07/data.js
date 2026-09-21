// src/data/PRIMARY_TECH/T07/data.js
// T7 Inside a Browser — the Technology track's browser unit, rebuilt to the
// Year 7 standard (docs/primary-tech/UPGRADE-PLAN.md). The job at its centre:
// go to a website you were GIVEN, open a second tab, go back, bookmark it,
// download a file and find it after (docs/digital-skills-course.md §6).
//
// What the student meets, in order: a 26-slide deck with 16 scored items and
// three Try It demos; the twelve interface words; Try It, seven jobs on the
// `browser` skin (sim.js); Label It on the browser and on the parts of an
// address; Find It; a mixed Practice set; the Typing Gym on the unit's words,
// addresses and sentences; three written answers, three source questions, and
// an eight-question quiz.
//
// GATE STRUCTURE — the final shape is §2 of UPGRADE-PLAN:
//
//   Gate 0 · Learn   0   NOTES 20 · WORD_REC 15                               = 35
//   Gate 1 · Do      25  SIM 25 · LABEL_IT 15 · POINT_IT 10 · WORKBOOK 15
//                        · TYPE_GYM 10                                        = 75
//   Gate 2 · Prove   80  SHORT_ANSWERS 10 · DIAGRAMS 10 · ASSESSMENT 20 · GAMES 0 = 40
//
// TEMP (integration): SIM and TYPE_GYM are not in this worktree's registry yet,
// so sim.js is written but not imported and both are left out of `phases`.
// Without their 35 XP, Gate 2 sits at 60 of the 75 before it (80%) instead of
// 80 of 110; the lead restores the §2 shape when the engines land.
//
// Module properties are written in full (`notes: notes,`): a shorthand right
// after realWords makes the audio generator skip the word audio.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { pointIt } from './pointIt.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const T07_DATA = {
  meta: {
    id: 'T07',
    title: 'Inside a Browser',
    desc: 'Go to a website you were given, tell the address bar from the search box, open a second tab, go back, bookmark a page, download a file — and know where that file went.',
    track: 'PRIMARY_TECH',
    icon: 'Globe',
  },

  // TEMP (integration): final shape is §2 of UPGRADE-PLAN — Gate 1 gains
  // SIM 25 (p25) and TYPE_GYM 10 (p26), and Gate 2's threshold goes back to 80.
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
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 15 },
        { id: 'POINT_IT', dbKey: 'p24', maxXP: 10 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
      ],
    },
    {
      // TEMP (integration): final shape is §2 of UPGRADE-PLAN — threshold 80 of
      // the 110 before it once SIM and TYPE_GYM are in Gate 1. Today: 60 of 75.
      id: 'mastery',
      title: 'Gate 2: Prove',
      threshold: 60,
      tasks: [
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 10 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 10 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // The Typing Gym (UPGRADE-PLAN §3.2): rounds cycle through the modes and every
  // line is drawn fresh from a seed. Plain ASCII only — letters, digits, space
  // and . , - / : ; ' ! ? — and every address is one the unit's fake web knows.
  typeGym: {
    title: 'Typing Gym',
    titleVn: 'Phòng tập gõ phím',
    modes: ['words', 'addresses', 'sentences'],
    rounds: 6,
    words: ['browser', 'address bar', 'website', 'tab', 'link', 'bookmark', 'download', 'reload', 'back', 'search box'],
    addresses: [
      'www.schoolsite.org',
      'www.schoolsite.org/library',
      'www.schoolsite.org/homework',
      'www.schoolsite.org/news',
      'www.citylibrary.org',
      'www.citylibrary.org/kids',
      'www.weathernow.org',
      'www.kidsmaths.org',
    ],
    sentences: [
      'Type the address into the address bar.',
      'Open a new tab for the library.',
      'Press reload if the page looks broken.',
      'Click the star to bookmark this page.',
      'Check the spelling before you press Enter.',
      'Show in folder tells you where it went.',
    ],
    target: { wpm: 10, accuracy: 0.9 },
  },

  realWords: [
    {
      word: 'Browser', isReal: true, vn: 'Trình duyệt',
      def: 'The program you use to look at websites. It is the window; the websites are what you put in it.',
      vnDef: 'Chương trình em dùng để xem các trang web. Nó là cái cửa sổ; các website là thứ em mở trong đó.',
      sent: 'Open the browser and go to the school website.',
      vnSent: 'Hãy mở trình duyệt và vào website của trường.',
    },
    {
      word: 'Address bar', isReal: true, vn: 'Thanh địa chỉ',
      def: 'The long box at the top of the browser. It shows which website you are on, and takes you to any other one.',
      vnDef: 'Ô dài ở trên cùng trình duyệt. Nó cho biết em đang ở website nào, và đưa em tới bất kỳ website nào khác.',
      sent: 'Type the address into the address bar and press Enter.',
      vnSent: 'Hãy gõ địa chỉ vào thanh địa chỉ rồi bấm Enter.',
    },
    {
      word: 'Web address', isReal: true, vn: 'Địa chỉ web',
      def: 'The exact name of a place on the web, like www.schoolsite.org. One wrong letter is a different place.',
      vnDef: 'Tên chính xác của một nơi trên mạng, ví dụ www.schoolsite.org. Sai một chữ cái là một nơi khác.',
      sent: 'Check every letter of the web address before you press Enter.',
      vnSent: 'Hãy kiểm tra từng chữ cái của địa chỉ web trước khi bấm Enter.',
    },
    {
      word: 'Search box', isReal: true, vn: 'Ô tìm kiếm',
      def: 'A box inside a web page that looks for words on that one website only.',
      vnDef: 'Một ô bên trong trang web, chỉ tìm các từ trong riêng website đó.',
      sent: 'Type the word into the search box on the library page.',
      vnSent: 'Hãy gõ từ đó vào ô tìm kiếm trên trang thư viện.',
    },
    {
      word: 'Website', isReal: true, vn: 'Trang web',
      def: 'A set of pages that belong together, kept on somebody else’s computer and reached by its address.',
      vnDef: 'Một tập hợp các trang thuộc về nhau, được lưu trên máy tính của người khác và truy cập bằng địa chỉ của nó.',
      sent: 'The library has its own website.',
      vnSent: 'Thư viện có website riêng.',
    },
    {
      word: 'Tab', isReal: true, vn: 'Thẻ',
      def: 'One page inside your browser window. You can have several open at once and swap between them.',
      vnDef: 'Một trang bên trong cửa sổ trình duyệt. Em có thể mở nhiều thẻ cùng lúc và chuyển qua lại giữa chúng.',
      sent: 'Open a new tab so you do not lose this page.',
      vnSent: 'Hãy mở một thẻ mới để em không mất trang này.',
    },
    {
      word: 'Link', isReal: true, vn: 'Liên kết',
      def: 'Words or a picture you click to go to another page. They are often underlined or a different colour.',
      vnDef: 'Chữ hoặc hình mà em bấm vào để sang một trang khác. Chúng thường được gạch chân hoặc có màu khác.',
      sent: 'Click the link to see the reading list.',
      vnSent: 'Hãy bấm vào liên kết để xem danh sách sách đọc.',
    },
    {
      word: 'Bookmark', isReal: true, vn: 'Dấu trang',
      def: 'A saved way back to a page, kept by the browser so you do not have to remember the address.',
      vnDef: 'Một đường quay lại đã lưu tới một trang, được trình duyệt giữ để em không phải nhớ địa chỉ.',
      sent: 'Bookmark this page so you can find it tomorrow.',
      vnSent: 'Hãy đánh dấu trang này để mai em tìm lại được.',
    },
    {
      word: 'Download', isReal: true, vn: 'Tải xuống',
      def: 'To copy a file from a website onto your own computer, so you keep it.',
      vnDef: 'Sao chép một tệp từ website về máy tính của em, để em giữ lại.',
      sent: 'Download the worksheet and open it later.',
      vnSent: 'Hãy tải phiếu bài tập xuống và mở sau.',
    },
    {
      word: 'Downloads folder', isReal: true, vn: 'Thư mục Tải xuống',
      def: 'The folder your computer puts downloaded files into, unless you choose somewhere else.',
      vnDef: 'Thư mục mà máy tính cất các tệp đã tải về, trừ khi em chọn nơi khác.',
      sent: 'The reading list is in the Downloads folder.',
      vnSent: 'Danh sách sách đọc nằm trong thư mục Tải xuống.',
    },
    {
      word: 'Reload', isReal: true, vn: 'Tải lại',
      def: 'To fetch the same page again. Useful when a page looks broken or only half appeared.',
      vnDef: 'Lấy lại chính trang đó một lần nữa. Hữu ích khi trang trông bị lỗi hoặc mới hiện một nửa.',
      sent: 'Reload the page and see if the picture appears.',
      vnSent: 'Hãy tải lại trang xem tấm ảnh có hiện ra không.',
    },
    {
      word: 'Back button', isReal: true, vn: 'Nút quay lại',
      def: 'The arrow that returns you to the page you were on before. It is how you undo where you have gone.',
      vnDef: 'Mũi tên đưa em về trang em vừa xem trước đó. Đó là cách em hoàn tác nơi mình vừa đến.',
      sent: 'Press the back button to return to the list.',
      vnSent: 'Hãy bấm nút quay lại để trở về danh sách.',
    },
  ],

  // Short Answers: three questions, one mark per scheme line
  // (docs/question-quality.md). Suggested words pass the spoiler test: pasted
  // into the box they earn nothing — the marks are for saying where each thing
  // is, what it does and why.
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between the address bar and a search box on a page. Say where each one is, and what each one is used for.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa thanh địa chỉ và ô tìm kiếm trên một trang. Nói rõ mỗi cái nằm ở đâu, và mỗi cái dùng để làm gì.',
      suggestedWords: [['address', 'web address'], ['website', 'site'], ['type', 'Enter']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the address bar is at the top of the browser and is there on every page / the search box is inside the page itself.',
        '1 mark: you type an address into the address bar and it takes you to any website.',
        '1 mark: a search box only looks through that one website (it cannot take you to a different one).',
      ],
      modelAnswer: 'The address bar is the long box right at the top of the browser, and it is there whatever page you are looking at. You type a website address into it, press Enter, and it takes you to that website. A search box is drawn inside the page itself, so it is part of that one website, and it disappears when you go somewhere else. You type words into it, and it only looks through that same website — it cannot take you to a different one.',
    },
    {
      id: 'sq2',
      question: 'You download a file from a website and then close the browser. Explain where the file is now, and how you would find it.',
      vnTranslation: 'Em tải một tệp từ một website về rồi đóng trình duyệt. Hãy giải thích bây giờ tệp đang ở đâu, và em sẽ tìm nó bằng cách nào.',
      suggestedWords: [['file', 'copy'], ['computer'], ['browser']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the file is saved on your own computer (it is not lost, and it is not inside the browser).',
        '1 mark: it is in a folder, normally the one called Downloads.',
        '1 mark: names a way to find it — open the Downloads folder, or use "Show in folder" on the browser’s download bar before closing it.',
      ],
      modelAnswer: 'Downloading makes a copy of the file on my own computer, so closing the browser does not lose it. It is saved in a folder, and unless I chose somewhere else it will be the folder called Downloads. To find it I can open the Downloads folder and look for the file name, or, if the browser is still open, click "Show in folder" on the bar at the bottom, which opens the exact folder the file went into.',
    },
    {
      id: 'sq3',
      question: 'Your friend is reading a web page. To look something up, she types a new address over it, and loses her place on the first page. Explain what she should have done instead, and why that would have kept the first page.',
      vnTranslation: 'Bạn của em đang đọc một trang web. Để tra cứu một thứ, bạn ấy gõ đè một địa chỉ mới lên, và mất chỗ đang đọc ở trang đầu. Hãy giải thích lẽ ra bạn ấy nên làm gì, và vì sao cách đó giữ được trang đầu.',
      suggestedWords: [['address bar'], ['page', 'website'], ['open', 'close']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark: she should have opened a new tab first (the + at the end of the tabs, or Ctrl+T) and typed the address into that new tab.',
        '1 mark: each tab is its own page, so the first page stays open in its own tab, where she left it, and she can click that tab to go back to it.',
      ],
      modelAnswer: 'She should have opened a new tab first, by clicking the + at the end of the row of tabs or pressing Ctrl+T, and typed the new address into the address bar of that new tab. Each tab is a separate page, so the page she was reading would have stayed open in its own tab, still at the line she was on. When she had finished, she could click the first tab to go straight back to it. Typing over the address changes the page in the same tab, which is why the first page was replaced.',
    },
  ],

  // Source Analysis: reading a browser, a download bar and a folder. Two MCQ
  // and one written. The grader cannot see the picture, so each imageAlt and
  // the written mark scheme describe it in full (docs/svg-diagrams.md §7).
  diagrams: [
    {
      id: 'diag_1_two_boxes',
      type: 'mcq',
      inlineSvg: DIAGRAMS.BROWSER_ANATOMY,
      imageAlt: 'A browser window. Two tabs sit along the top, Riverside School and School Library, with a + button after them and the window’s minimise, maximise and close buttons at the far right. Below them is a toolbar with back, forward and reload arrows, a long address bar reading www.schoolsite.org/library, and a bookmark star. The page shows a heading "School Library", a search box labelled "Search this site", an underlined link "Year 6 reading list" and a blue Download PDF button.',
      promptText: 'This browser has two boxes you could type into. A student types the words volcano facts into the long box at the very top, and presses Enter. What happens?',
      options: [
        { val: 'A', text: 'The browser goes to a website called volcano facts.' },
        { val: 'B', text: 'The school website looks through its own pages for volcano facts.' },
        { val: 'C', text: 'The browser sends the words to a search engine, which looks across the whole web.' },
        { val: 'D', text: 'Nothing at all: the box at the top only takes addresses.' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The box at the top is the address bar. Give it an address and it goes there; give it words — with a space and no ending like .org — and the browser hands them to a search engine, which looks across the whole web. It is the OTHER box, the one inside the page, that only searches the school website (B). There is no website called "volcano facts" to go to (A).',
      expVn: 'Ô trên cùng là thanh địa chỉ. Đưa cho nó một địa chỉ thì nó đi tới đó; đưa cho nó các từ — có dấu cách và không có phần đuôi như .org — thì trình duyệt chuyển chúng cho một công cụ tìm kiếm, tìm khắp mạng. Chính ô KIA, ô bên trong trang, mới chỉ tìm trong website của trường (B). Không có website nào tên "volcano facts" để đi tới cả (A).',
    },
    {
      id: 'diag_2_downloads_folder',
      type: 'mcq',
      inlineSvg: DIAGRAMS.DOWNLOADS_FOLDER,
      imageAlt: 'A file manager window titled Downloads. A sidebar lists Desktop, Documents, Downloads (highlighted) and Pictures. The file list has a Name column and a Date column: reading-list.pdf from today at 14:06, summer-reading.pdf from yesterday, and maths-sheet.pdf from three days ago. A line underneath reads 3 items.',
      promptText: 'You downloaded reading-list.pdf a few minutes ago. Looking at this folder, what does it tell you about downloaded files?',
      options: [
        { val: 'A', text: 'They are ordinary files that stay on the computer, with a name and a date, alongside older downloads.' },
        { val: 'B', text: 'They are only kept for one day and then deleted.' },
        { val: 'C', text: 'They can only be opened while the browser is open.' },
        { val: 'D', text: 'They are stored inside the website you took them from.' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'The folder is the proof: a file from three days ago is still sitting there. A download is not a temporary thing kept by the browser — it is a normal file in a normal folder, which is why the date column is useful for finding the one you want.',
      expVn: 'Chính thư mục này là bằng chứng: một tệp từ ba ngày trước vẫn còn nằm đó. Tệp tải về không phải thứ tạm thời do trình duyệt giữ — nó là một tệp bình thường trong một thư mục bình thường, và vì thế cột ngày rất hữu ích để tìm đúng tệp em cần.',
    },
    {
      id: 'diag_3_after_download',
      inlineSvg: DIAGRAMS.AFTER_DOWNLOAD,
      imageAlt: 'A browser window one second after a download. The School Library page is open, with its blue Download PDF button. A bar along the bottom of the window shows a chip reading reading-list.pdf with a green tick, a button reading "Show in folder", and a button reading "All downloads".',
      promptText: 'A student has just downloaded a file and says "I do not know where it went". Using this picture, explain what the browser is already telling them, and say which button they should press and why.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: identifies the bar along the bottom as the browser telling them about the download / names the file reading-list.pdf.',
        '1 mark: says they should press "Show in folder".',
        '1 mark: explains that this opens the folder the file was actually saved into, which answers "where did it go".',
      ],
      modelAnswer: 'The browser has already answered the question on the bar along the bottom of the window: it shows the file it has just saved, reading-list.pdf, with a tick to say it has finished. The student should press "Show in folder", because that opens the actual folder the file was put into and shows the file sitting in it, which is exactly what "where did it go" is asking. Pressing "All downloads" would give a list of everything ever downloaded instead, and clicking the file name would just open the file without ever saying where it lives.',
    },
  ],

  // Label It (Y7 ENGAGEMENT-PLAN §2.2): the unit's drawings with their printed
  // labels stripped. (x, y) is where the leader meets the box and `to` is the
  // part it names. The words on the screen (the address, the tab titles) are
  // class="keep" and stay. Each bank has one distractor that is a real
  // interface word ABSENT from the picture. Layout checked with the validator
  // and `node scripts/svg-coords.mjs PRIMARY_TECH/T07 <KEY>`.
  labelIt: [
    {
      id: 'browser',
      title: 'Label the browser', titleVn: 'Gắn nhãn trình duyệt',
      inlineSvg: DIAGRAMS.LB_BROWSER, viewBox: '0 0 1040 580', slotW: 216,
      pins: [
        { id: 'p1', x: 360, y: 100, side: 'above', to: [[317, 137], [493, 137]], answer: 'tabs' },
        { id: 'p2', x: 600, y: 100, side: 'above', to: [600, 137], answer: 'newtab' },
        { id: 'p3', x: 880, y: 100, side: 'above', to: [700, 186], answer: 'address' },
        { id: 'p4', x: 224, y: 192, side: 'left', to: [238, 202], answer: 'back' },
        { id: 'p5', x: 224, y: 262, side: 'left', to: [322, 204], answer: 'reload' },
        { id: 'p6', x: 816, y: 192, side: 'right', to: [796, 192], answer: 'star' },
        { id: 'p7', x: 816, y: 450, side: 'right', to: [770, 450], answer: 'page' },
      ],
      bank: [
        { val: 'tabs', text: 'Tabs', textVn: 'Các thẻ' },
        { val: 'newtab', text: 'New tab button', textVn: 'Nút mở thẻ mới' },
        { val: 'address', text: 'Address bar', textVn: 'Thanh địa chỉ' },
        { val: 'back', text: 'Back button', textVn: 'Nút quay lại' },
        { val: 'reload', text: 'Reload button', textVn: 'Nút tải lại' },
        { val: 'star', text: 'Bookmark star', textVn: 'Ngôi sao đánh dấu' },
        { val: 'page', text: 'The web page', textVn: 'Trang web' },
        { val: 'taskbar', text: 'Taskbar', textVn: 'Thanh tác vụ' },
      ],
    },
    {
      // The address itself stays (class="keep"), each part in its own colour
      // under its own bracket: name the four parts. "A password" is never part
      // of an address — typing one into the address bar is a real mistake.
      id: 'address',
      title: 'Label the parts of the address', titleVn: 'Gắn nhãn các phần của địa chỉ',
      inlineSvg: DIAGRAMS.LB_ADDRESS, viewBox: '0 0 1000 370', slotW: 230,
      pins: [
        { id: 'p1', x: 204, y: 118, side: 'above', to: [204, 140], answer: 'start' },
        { id: 'p2', x: 393, y: 282, side: 'below', to: [393, 260], answer: 'name' },
        { id: 'p3', x: 582, y: 118, side: 'above', to: [582, 140], answer: 'ending' },
        { id: 'p4', x: 744, y: 282, side: 'below', to: [744, 260], answer: 'page' },
      ],
      bank: [
        { val: 'start', text: 'The start', textVn: 'Phần mở đầu' },
        { val: 'name', text: 'The website’s name', textVn: 'Tên của website' },
        { val: 'ending', text: 'The ending', textVn: 'Phần đuôi' },
        { val: 'page', text: 'A page on the website', textVn: 'Một trang trên website' },
        { val: 'password', text: 'A password', textVn: 'Mật khẩu' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  pointIt: pointIt,
  assessment: assessment,
  games: games,
};
