// src/data/PRIMARY_TECH/T07/data.js
// T7 Inside a Browser — the second unit of the Technology track
// (docs/digital-skills-course.md §6, docs/primary-tech/BUILD-PLAN.md step 2).
//
// Chosen alongside T1 because both survive without the simulator: the job at the
// centre of this unit is largely *identify and order*, so POINT_IT and WORKBOOK
// carry the doing between them.
//
// GATE STRUCTURE — the same re-derived shape as T01, and re-checked rather than
// copied from the course doc's table (which prices the phases around SIM and
// TYPE_GYM, neither of which exists yet):
//
//   Gate 0 · Learn   0   NOTES 10 · WORD_REC 10                         = 20
//   Gate 1 · Do      15  POINT_IT 25 · WORKBOOK 15                      = 40
//   Gate 2 · Prove   45  DIAGRAMS 20 · SHORT_ANSWERS 15 · ASSESSMENT 20 = 55
//
// Totals 115, capped at 100 by unitXPOf. Gate 1 sits at 15 of the 20 before it
// (75%); Gate 2 at 45 of 60 (75%). Both inside the 80% rule the validator
// enforces — re-derive whenever a task's XP changes.
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

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 10 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Do',
      threshold: 15,
      tasks: [
        { id: 'POINT_IT', dbKey: 'p24', maxXP: 25 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
      ],
    },
    {
      id: 'mastery',
      title: 'Gate 2: Prove',
      threshold: 45,
      tasks: [
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 20 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 15 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

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
      sent: 'The picture is in the Downloads folder.',
      vnSent: 'Tấm ảnh nằm trong thư mục Tải xuống.',
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

  // Short Answers: two questions, one mark per scheme line
  // (docs/question-quality.md). No suggested words — on this unit the vocabulary
  // is what the mark scheme awards, so chips would be spoilers (§3).
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between the address bar and a search box on a page. Say where each one is, and what each one is used for.',
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
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the file is saved on your own computer (it is not lost, and it is not inside the browser).',
        '1 mark: it is in a folder, normally the one called Downloads.',
        '1 mark: names a way to find it — open the Downloads folder, or use "Show in folder" on the browser’s download bar before closing it.',
      ],
      modelAnswer: 'Downloading makes a copy of the file on my own computer, so closing the browser does not lose it. It is saved in a folder, and unless I chose somewhere else it will be the folder called Downloads. To find it I can open the Downloads folder and look for the file name, or, if the browser is still open, click "Show in folder" on the bar at the bottom, which opens the exact folder the file went into.',
    },
  ],

  // Source Analysis: reading a browser and a folder. Two MCQ and one written.
  diagrams: [
    {
      id: 'diag_1_two_boxes',
      type: 'mcq',
      inlineSvg: DIAGRAMS.BROWSER_ANATOMY,
      imageAlt: 'A browser window. Two tabs sit along the top, then a toolbar with back, forward and reload arrows, a long address bar reading www.schoolsite.org/library, and a bookmark star. Below, the page shows a heading "School Library", a search box labelled "Search this site", an underlined link and a blue Download PDF button.',
      promptText: 'This browser has TWO boxes you could type into. If you typed www.bbc.co.uk into the one that is inside the page, what would happen?',
      options: [
        { val: 'A', text: 'The browser would go to the BBC website.' },
        { val: 'B', text: 'The school website would look through its own pages for those words, and probably find nothing.' },
        { val: 'C', text: 'Nothing at all would happen.' },
        { val: 'D', text: 'The BBC website would open in a new tab.' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'The box inside the page belongs to the school website, so it can only search the school website. It does not know what an address is — it just takes your letters as words to look for. Nothing breaks, which is exactly why this mistake goes uncorrected for years.',
      expVn: 'Ô nằm bên trong trang thuộc về website của trường, nên nó chỉ tìm được trong website của trường. Nó không biết địa chỉ là gì — nó chỉ coi các chữ em gõ là những từ cần tìm. Không có gì hỏng cả, và chính vì thế lỗi này bao năm không ai sửa.',
    },
    {
      id: 'diag_2_downloads_folder',
      type: 'mcq',
      inlineSvg: DIAGRAMS.DOWNLOADS_FOLDER,
      imageAlt: 'A file manager window titled Downloads. A sidebar lists Desktop, Documents, Downloads (highlighted) and Pictures. The file list shows reading-list.pdf from today at 14:06, class-photo.jpg from yesterday, and homework.docx from three days ago. A line at the bottom reads 3 items.',
      promptText: 'You downloaded reading-list.pdf a few minutes ago. Looking at this folder, what does it tell you about downloaded files?',
      options: [
        { val: 'A', text: 'They are only kept for one day and then deleted.' },
        { val: 'B', text: 'They can only be opened while the browser is open.' },
        { val: 'C', text: 'They are ordinary files that stay on the computer, with a name and a date, alongside older downloads.' },
        { val: 'D', text: 'They are stored inside the website you took them from.' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The folder is the proof: a file from three days ago is still sitting there. A download is not a temporary thing kept by the browser — it is a normal file in a normal folder, which is why the date column is useful for finding the one you want.',
      expVn: 'Chính thư mục này là bằng chứng: một tệp từ ba ngày trước vẫn còn nằm đó. Tệp tải về không phải thứ tạm thời do trình duyệt giữ — nó là một tệp bình thường trong một thư mục bình thường, và vì thế cột ngày rất hữu ích để tìm đúng tệp em cần.',
    },
    {
      id: 'diag_3_after_download',
      inlineSvg: DIAGRAMS.AFTER_DOWNLOAD,
      imageAlt: 'A browser window one second after a download. The page says "Your file has finished downloading." A bar along the bottom of the window shows a chip reading reading-list.pdf, a button reading "Show in folder", and a button reading "All downloads".',
      promptText: 'A student has just downloaded a file and says "I do not know where it went". Using this picture, explain what the browser is already telling them, and say which button they should press and why.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: identifies the bar along the bottom as the browser telling them about the download / names the file reading-list.pdf.',
        '1 mark: says they should press "Show in folder".',
        '1 mark: explains that this opens the folder the file was actually saved into, which answers "where did it go".',
      ],
      modelAnswer: 'The browser has already answered the question on the bar along the bottom of the window: it shows the file it has just saved, reading-list.pdf. The student should press "Show in folder", because that opens the actual folder the file was put into and shows the file sitting in it, which is exactly what "where did it go" is asking. Pressing "All downloads" would give a list of everything ever downloaded instead, and clicking the file name would just open the file without ever saying where it lives.',
    },
  ],

  notes: notes,
  workbook: workbook,
  pointIt: pointIt,
  assessment: assessment,
  games: games,
};
