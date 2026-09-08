// src/data/PRIMARY_TECH/T07/pointIt.js
// T7 Inside a Browser — "Find It" (POINT_IT, 25 XP).
//
// Two pictures, eight prompts. Item shape is in src/tasks/PointIt.jsx; the mark
// comes from which region the click lands in, so there is no answer key here
// beyond each prompt's `target`.
//
// The address-bar-versus-search-box pair is the reason this task was built first
// (docs/digital-skills-course.md §4.2). Both regions carry a `misfire` that says
// what the box the student actually hit is FOR, because "that only searches this
// one website" is the entire fix and a red X is not.
import { DIAGRAMS } from './diagrams.js';

export const pointIt = [
  {
    id: 'browser-anatomy',
    title: 'A browser window',
    titleVn: 'Một cửa sổ trình duyệt',
    svg: DIAGRAMS.BROWSER_ANATOMY,
    viewBox: '0 0 800 500',
    regions: [
      {
        id: 'addr', rect: [156, 64, 560, 36],
        label: 'the address bar', labelVn: 'thanh địa chỉ',
        misfire: 'That is the address bar. It belongs to the browser, at the very top, and it says which website you are on.',
        misfireVn: 'Đó là thanh địa chỉ. Nó thuộc về trình duyệt, nằm trên cùng, và cho biết em đang ở trang web nào.',
      },
      {
        id: 'search', rect: [250, 210, 300, 48],
        label: 'the search box on the page', labelVn: 'ô tìm kiếm trên trang',
        misfire: 'That is the search box inside the page — it only looks through this one website. The address bar is the long box at the very top.',
        misfireVn: 'Đó là ô tìm kiếm bên trong trang — nó chỉ tìm trong website này thôi. Thanh địa chỉ là ô dài ở trên cùng.',
      },
      {
        id: 'back', rect: [20, 64, 36, 36],
        label: 'the back button', labelVn: 'nút quay lại',
      },
      {
        id: 'forward', rect: [64, 64, 36, 36],
        label: 'the forward button', labelVn: 'nút đi tới',
        misfire: 'That arrow goes forward again, to a page you have already left. Back points the other way — to the left.',
        misfireVn: 'Mũi tên đó đi tới, đến trang em vừa rời khỏi. Nút quay lại chỉ hướng ngược lại — sang bên trái.',
      },
      {
        id: 'reload', rect: [108, 64, 36, 36],
        label: 'the reload button', labelVn: 'nút tải lại',
        misfire: 'Reload fetches the same page again. It does not take you anywhere new.',
        misfireVn: 'Tải lại chỉ lấy lại chính trang đó. Nó không đưa em đến đâu mới cả.',
      },
      {
        id: 'bookmark', rect: [724, 64, 36, 36],
        label: 'the bookmark star', labelVn: 'ngôi sao đánh dấu trang',
      },
      {
        id: 'newtab', rect: [440, 18, 28, 28],
        label: 'the new tab button', labelVn: 'nút mở thẻ mới',
      },
      {
        id: 'tab2', rect: [238, 12, 190, 40],
        label: 'a tab that is already open', labelVn: 'một thẻ đang mở sẵn',
        misfire: 'That is a tab that is already open. The button that opens a NEW one is the small + just after the last tab.',
        misfireVn: 'Đó là một thẻ đã mở sẵn. Nút mở thẻ MỚI là dấu + nhỏ ngay sau thẻ cuối cùng.',
      },
      {
        id: 'link', rect: [295, 292, 210, 30],
        label: 'a link', labelVn: 'một liên kết',
      },
      {
        id: 'download', rect: [310, 350, 180, 48],
        label: 'the download button', labelVn: 'nút tải xuống',
      },
    ],
    prompts: [
      {
        ask: 'Click the address bar.',
        askVn: 'Bấm vào thanh địa chỉ.',
        target: 'addr',
      },
      {
        ask: 'Click the box that would only search inside this one website.',
        askVn: 'Bấm vào ô chỉ tìm kiếm bên trong riêng website này.',
        target: 'search',
      },
      {
        ask: 'Click the button that takes you back to the page you were on before.',
        askVn: 'Bấm vào nút đưa em quay lại trang vừa xem.',
        target: 'back',
      },
      {
        ask: 'Click the button that opens a new tab.',
        askVn: 'Bấm vào nút mở một thẻ mới.',
        target: 'newtab',
      },
      {
        ask: 'Click the star that saves this page so you can find it again tomorrow.',
        askVn: 'Bấm vào ngôi sao lưu trang này để mai em tìm lại được.',
        target: 'bookmark',
      },
    ],
  },
  {
    id: 'after-download',
    title: 'One second after you download a file',
    titleVn: 'Một giây sau khi em tải một tệp về',
    svg: DIAGRAMS.AFTER_DOWNLOAD,
    viewBox: '0 0 800 540',
    regions: [
      {
        id: 'download-bar', rect: [20, 452, 760, 72],
        label: 'the download bar', labelVn: 'thanh tải xuống',
        misfire: 'That is the download bar. The answer is one of the three things ON it — click the words.',
        misfireVn: 'Đó là thanh tải xuống. Đáp án là một trong ba thứ NẰM TRÊN nó — hãy bấm vào chữ.',
      },
      {
        id: 'file-chip', rect: [40, 466, 300, 44],
        label: 'the file that just downloaded', labelVn: 'tệp vừa tải xuống',
        misfire: 'That is the file itself. Clicking it opens the file — it does not show you where it was saved.',
        misfireVn: 'Đó là chính tệp đó. Bấm vào nó sẽ mở tệp — chứ không cho em thấy tệp được lưu ở đâu.',
      },
      {
        id: 'show-folder', rect: [380, 466, 190, 44],
        label: 'Show in folder', labelVn: 'Hiện trong thư mục',
        misfire: 'That one opens the folder the file was saved into. It answers "where did it go?", not "what else have I downloaded?".',
        misfireVn: 'Nút đó mở thư mục nơi tệp được lưu. Nó trả lời "tệp đi đâu rồi?", chứ không phải "mình đã tải gì khác?".',
      },
      {
        id: 'all-downloads', rect: [590, 466, 170, 44],
        label: 'All downloads', labelVn: 'Tất cả tệp đã tải',
        misfire: 'That shows the list of everything you have ever downloaded — a history, not this one file.',
        misfireVn: 'Nút đó hiện danh sách mọi thứ em từng tải về — một lịch sử, không phải riêng tệp này.',
      },
      {
        id: 'addr', rect: [156, 64, 560, 36],
        label: 'the address bar', labelVn: 'thanh địa chỉ',
      },
      {
        id: 'page', rect: [20, 112, 760, 330],
        label: 'the web page', labelVn: 'trang web',
        misfire: 'That is the page you downloaded FROM. The file is not in there — look at the bar along the bottom.',
        misfireVn: 'Đó là trang em đã tải tệp TỪ đó. Tệp không nằm trong đó — hãy nhìn thanh chạy dọc phía dưới.',
      },
    ],
    prompts: [
      {
        ask: 'Click the name of the file that has just downloaded.',
        askVn: 'Bấm vào tên tệp vừa tải xuống.',
        target: 'file-chip',
      },
      {
        ask: 'You want to see WHERE the file was saved. Click the button that opens that folder.',
        askVn: 'Em muốn xem tệp được lưu Ở ĐÂU. Bấm vào nút mở thư mục đó.',
        target: 'show-folder',
      },
      {
        ask: 'Click the button that lists every file you have downloaded, not just this one.',
        askVn: 'Bấm vào nút liệt kê mọi tệp em đã tải về, không chỉ riêng tệp này.',
        target: 'all-downloads',
      },
    ],
  },
];
