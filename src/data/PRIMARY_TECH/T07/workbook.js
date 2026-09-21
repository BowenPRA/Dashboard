// src/data/PRIMARY_TECH/T07/workbook.js
// T7 Inside a Browser — Practice (WORKBOOK). Eleven questions across Focus,
// Practice and Challenge, in five answer widgets — dropdown-in-sentence
// (inline), put-in-order (order), multiple choice (mcq), typed-in-the-blanks
// (fill_blank) and drag-into-groups (dnd) — plus a picture question (f3). No
// two questions in a row share a type. Schema: docs/workbook-tasks.md §2.
//
// No typed box ever takes an ADDRESS: typed answers are marked by the algebra
// engine, which would read www.x.org as algebra. The two fill_blank questions
// take interface WORDS (marked as words, with `accept`) and one number.
// Choosing the right box for an address is what the deck, Try It and Label It
// are for.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'inline',
        prompt: 'Choose the right box for each job.',
        promptVn: 'Chọn đúng ô cho mỗi việc.',
        textParts: ['You are given the address www.citylibrary.org, so you type it into the ', '. You want to find the word "volcano" on the website you are already reading, so you type it into the ', '.'],
        textPartsVn: ['Em được cho địa chỉ www.citylibrary.org, nên em gõ nó vào ', '. Em muốn tìm từ "volcano" (núi lửa) trên chính website đang đọc, nên em gõ nó vào ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'addr', text: 'address bar', textVn: 'thanh địa chỉ' },
              { val: 'search', text: 'search box on the page', textVn: 'ô tìm kiếm trên trang' },
            ],
            correct: 'addr',
          },
          2: {
            options: [
              { val: 'addr', text: 'address bar', textVn: 'thanh địa chỉ' },
              { val: 'search', text: 'search box on the page', textVn: 'ô tìm kiếm trên trang' },
            ],
            correct: 'search',
          },
        },
        solution: [
          'An address is a place. It goes in the address bar, at the top of the browser, and it takes you straight there.',
          'A word is not a place. The search box on a page looks through that one website for it.',
          'The quick test: am I typing somewhere I want to GO, or a word I want to FIND on this site?',
        ],
        solutionVn: [
          'Địa chỉ là một nơi chốn. Nó vào thanh địa chỉ, ở trên cùng trình duyệt, và đưa em thẳng tới đó.',
          'Một từ thì không phải nơi chốn. Ô tìm kiếm trên trang sẽ tìm từ đó trong riêng website này.',
          'Cách kiểm tra nhanh: mình đang gõ một nơi muốn ĐẾN, hay một từ muốn TÌM trên trang này?',
        ],
        answer: 'address bar; search box on the page',
        answerVn: 'thanh địa chỉ; ô tìm kiếm trên trang',
      },
      {
        id: 'f2',
        type: 'order',
        prompt: 'Put the four steps of going to a website you have been given into the right order.',
        promptVn: 'Sắp xếp bốn bước vào một trang web em được cho theo đúng thứ tự.',
        bank: [
          { val: 'enter', text: 'Press Enter', textVn: 'Bấm Enter' },
          { val: 'click', text: 'Click once in the address bar', textVn: 'Bấm một lần vào thanh địa chỉ' },
          { val: 'check', text: 'Check the spelling of what you typed', textVn: 'Kiểm tra chính tả những gì em vừa gõ' },
          { val: 'type', text: 'Type the new address', textVn: 'Gõ địa chỉ mới' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['click', 'type', 'check', 'enter'] },
        solution: [
          'Clicking in the address bar first selects the old address, so the new one replaces it. Skip this and you end up typing into the middle of the old address.',
          'Then type.',
          'Checking comes BEFORE Enter, not after. Once you press Enter the browser has already gone.',
          'A single wrong letter is a different website, so this is the step worth the two seconds.',
        ],
        solutionVn: [
          'Bấm vào thanh địa chỉ trước là để chọn địa chỉ cũ, nhờ vậy địa chỉ mới sẽ thay thế nó. Bỏ bước này là em sẽ gõ chen vào giữa địa chỉ cũ.',
          'Rồi mới gõ.',
          'Kiểm tra là TRƯỚC khi bấm Enter, không phải sau. Bấm Enter rồi thì trình duyệt đã đi mất.',
          'Sai một chữ cái là sang một website khác, nên đây là bước đáng bỏ ra hai giây.',
        ],
        answer: 'Click in the address bar, type the address, check the spelling, press Enter.',
        answerVn: 'Bấm vào thanh địa chỉ, gõ địa chỉ, kiểm tra chính tả, bấm Enter.',
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: 'The Weather Now page looks like this: the picture is missing and most of the words never appeared. What should you try first?',
        promptVn: 'Trang Weather Now trông như thế này: tấm hình bị thiếu và phần lớn chữ chưa hiện ra. Em nên thử gì trước?',
        inlineSvg: DIAGRAMS.HALF_LOADED,
        options: [
          { val: 'a', text: 'Press the reload button.', textVn: 'Bấm nút tải lại.' },
          { val: 'b', text: 'Close the browser and restart the computer.', textVn: 'Đóng trình duyệt và khởi động lại máy tính.' },
          { val: 'c', text: 'Type the address again in a new tab.', textVn: 'Gõ lại địa chỉ trong một thẻ mới.' },
          { val: 'd', text: 'Press the back button.', textVn: 'Bấm nút quay lại.' },
        ],
        correct: 'a',
        solution: [
          'The page is half-loaded: the browser only got part of it. Reload (↻, or F5) asks for the same page again, and most half-loaded pages fix themselves the moment you do it.',
          'Answer C would also work, but it is more effort for the same result.',
          'Back would take you away from the page you actually want, and restarting the whole computer for one page is a very large hammer for a very small nail.',
        ],
        solutionVn: [
          'Trang mới tải được một nửa: trình duyệt chỉ nhận được một phần. Tải lại (↻, hoặc F5) yêu cầu lấy lại chính trang đó, và phần lớn trang hiện dở tự khỏi ngay khi em bấm.',
          'Đáp án C cũng được, nhưng tốn công hơn mà kết quả như nhau.',
          'Quay lại sẽ đưa em rời khỏi đúng trang em đang cần, còn khởi động lại cả máy chỉ vì một trang thì là dùng búa tạ để đóng đinh ghim.',
        ],
        answer: 'Press the reload button.',
        answerVn: 'Bấm nút tải lại.',
      },
      {
        id: 'f4',
        type: 'fill_blank',
        prompt: 'Type the missing interface word in each gap. Use the English word — it is the one printed on the screen.',
        promptVn: 'Gõ từ còn thiếu vào mỗi chỗ trống. Dùng từ tiếng Anh — đó là từ in trên màn hình.',
        textParts: ['One page inside your browser window is called a ', '. Clicking the star saves a ', ', so you can find the page again tomorrow.'],
        textPartsVn: ['Một trang bên trong cửa sổ trình duyệt được gọi là một ', ' (thẻ). Bấm vào ngôi sao sẽ lưu một ', ' (dấu trang), để mai em tìm lại được trang đó.'],
        blanks: {
          1: { correct: 'tab', width: 8, accept: ['a tab', 'tabs'] },
          2: { correct: 'bookmark', width: 9, accept: ['a bookmark', 'bookmarks'] },
        },
        solution: [
          'A **tab** is one page in the row along the top of the browser. The + opens another one.',
          'The star makes a **bookmark**: a saved way back to the page, kept by the browser.',
        ],
        solutionVn: [
          '**Tab** (thẻ) là một trang trong hàng chạy dọc phía trên trình duyệt. Dấu + mở thêm một thẻ.',
          'Ngôi sao tạo ra một **bookmark** (dấu trang): đường quay lại trang đó, được trình duyệt lưu giữ.',
        ],
        answer: 'tab; bookmark',
        answerVn: 'tab (thẻ); bookmark (dấu trang)',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        type: 'dnd',
        prompt: 'Sort each thing into the part of the browser it belongs to.',
        promptVn: 'Phân loại từng thứ vào phần của trình duyệt mà nó thuộc về.',
        bank: [
          { val: 'addr', text: 'Address bar', textVn: 'Thanh địa chỉ' },
          { val: 'tabs', text: 'The row of tabs', textVn: 'Hàng các thẻ' },
          { val: 'star', text: 'Bookmark star', textVn: 'Ngôi sao đánh dấu trang' },
          { val: 'search', text: 'Search box', textVn: 'Ô tìm kiếm' },
          { val: 'link', text: 'A link to click', textVn: 'Một liên kết để bấm' },
          { val: 'dlbtn', text: 'A Download button', textVn: 'Một nút Tải xuống' },
        ],
        targets: [
          { id: 'browser', title: 'Part of the browser (on every page)', titleVn: 'Thuộc về trình duyệt (có trên mọi trang)' },
          { id: 'page', title: 'Part of the page (this website only)', titleVn: 'Thuộc về trang web (chỉ riêng website này)' },
        ],
        correctSets: { browser: ['addr', 'tabs', 'star'], page: ['search', 'link', 'dlbtn'] },
        solution: [
          'The test is simple: would it still be there if you went to a completely different website?',
          'The address bar, the tabs and the star are always there, whatever page you are on. They belong to the browser and nobody else can change them.',
          'The search box, the links and the buttons are made by whoever made that website. They disappear the moment you go somewhere else — and they are written by a stranger, which is worth remembering.',
        ],
        solutionVn: [
          'Cách kiểm tra rất đơn giản: nếu em sang một website hoàn toàn khác, thứ đó có còn ở đó không?',
          'Thanh địa chỉ, hàng thẻ và ngôi sao thì luôn có mặt, dù em đang ở trang nào. Chúng thuộc về trình duyệt và không ai khác thay đổi được.',
          'Ô tìm kiếm, các liên kết và các nút là do người làm website đó tạo ra. Chúng biến mất ngay khi em đi nơi khác — và chúng do một người lạ viết, điều đó rất đáng nhớ.',
        ],
        answer: 'Browser: address bar, tabs, bookmark star. Page: search box, link, Download button.',
        answerVn: 'Trình duyệt: thanh địa chỉ, hàng thẻ, ngôi sao đánh dấu. Trang web: ô tìm kiếm, liên kết, nút Tải xuống.',
      },
      {
        id: 'p2',
        type: 'mcq',
        prompt: 'You download a picture, then close the browser without looking at the bar at the bottom. Where is the picture now?',
        promptVn: 'Em tải một tấm ảnh về, rồi đóng trình duyệt mà không nhìn thanh phía dưới. Bây giờ tấm ảnh ở đâu?',
        options: [
          { val: 'a', text: 'It was lost when the browser closed.', textVn: 'Nó đã mất khi trình duyệt đóng lại.' },
          { val: 'b', text: 'It is still on the website, but not on your computer.', textVn: 'Nó vẫn ở trên website, nhưng không có trên máy của em.' },
          { val: 'c', text: 'It is inside the bookmark you made.', textVn: 'Nó nằm trong dấu trang mà em đã tạo.' },
          { val: 'd', text: 'It is saved as a file, almost always in a folder called Downloads.', textVn: 'Nó đã được lưu thành một tệp, gần như luôn nằm trong thư mục tên Downloads.' },
        ],
        correct: 'd',
        solution: [
          'Downloading copies the file onto your computer. It is a real file with a real name, and it does not live inside the browser.',
          'That is why you can open it later without the browser being open at all.',
          'Answer B describes what happens when you only LOOK at a picture on a website. Downloading is the step that makes your own copy.',
        ],
        solutionVn: [
          'Tải xuống là sao chép tệp về máy của em. Đó là một tệp thật với một cái tên thật, và nó không nằm bên trong trình duyệt.',
          'Vì vậy em mở lại nó được sau này mà không cần trình duyệt đang mở.',
          'Đáp án B mô tả việc em chỉ XEM một tấm ảnh trên website. Tải xuống mới là bước tạo ra bản sao của riêng em.',
        ],
        answer: 'Saved as a file, almost always in a folder called Downloads.',
        answerVn: 'Được lưu thành một tệp, gần như luôn nằm trong thư mục tên Downloads.',
      },
      {
        id: 'p4',
        type: 'inline',
        prompt: 'Choose the button that fixes each problem.',
        promptVn: 'Chọn nút sửa được từng vấn đề.',
        textParts: ['The page stopped loading halfway, so press ', '. You clicked a link by mistake, so press ', '. You pressed Back one time too many, so press ', '.'],
        textPartsVn: ['Trang dừng tải giữa chừng, nên em bấm ', '. Em lỡ bấm nhầm một liên kết, nên em bấm ', '. Em bấm Quay lại thừa một lần, nên em bấm ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'back', text: 'Back', textVn: 'Quay lại' },
              { val: 'fwd', text: 'Forward', textVn: 'Đi tới' },
              { val: 'reload', text: 'Reload', textVn: 'Tải lại' },
            ],
            correct: 'reload',
          },
          2: {
            options: [
              { val: 'back', text: 'Back', textVn: 'Quay lại' },
              { val: 'fwd', text: 'Forward', textVn: 'Đi tới' },
              { val: 'reload', text: 'Reload', textVn: 'Tải lại' },
            ],
            correct: 'back',
          },
          3: {
            options: [
              { val: 'back', text: 'Back', textVn: 'Quay lại' },
              { val: 'fwd', text: 'Forward', textVn: 'Đi tới' },
              { val: 'reload', text: 'Reload', textVn: 'Tải lại' },
            ],
            correct: 'fwd',
          },
        },
        solution: [
          'Reload (↻, or F5) fetches the SAME page again: the fix for a page that only half arrived.',
          'Back (◀, or Alt+←) undoes where you went, so it takes you off the wrong page.',
          'Forward (▶, or Alt+→) undoes a Back. It only works after you have gone back.',
        ],
        solutionVn: [
          'Tải lại (↻, hoặc F5) lấy lại CHÍNH trang đó: cách sửa cho một trang mới hiện một nửa.',
          'Quay lại (◀, hoặc Alt+←) hoàn tác nơi em vừa đến, nên nó đưa em ra khỏi trang nhầm.',
          'Đi tới (▶, hoặc Alt+→) hoàn tác một lần Quay lại. Nó chỉ dùng được sau khi em đã quay lại.',
        ],
        answer: 'Reload; Back; Forward',
        answerVn: 'Tải lại; Quay lại; Đi tới',
      },
      {
        id: 'p5',
        type: 'order',
        prompt: 'Put the steps of downloading a file and finding it into the right order.',
        promptVn: 'Sắp xếp các bước tải một tệp về và tìm nó theo đúng thứ tự.',
        bank: [
          { val: 'show', text: 'Click Show in folder', textVn: 'Bấm Show in folder (Hiện trong thư mục)' },
          { val: 'page', text: 'Go to the page with the file on it', textVn: 'Vào trang có tệp đó' },
          { val: 'bar', text: 'Read the download bar at the bottom', textVn: 'Đọc thanh tải xuống ở phía dưới' },
          { val: 'click', text: 'Click the page’s Download button', textVn: 'Bấm nút Tải xuống của trang' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['page', 'click', 'bar', 'show'] },
        solution: [
          'You can only download from the page the file is on, so you go there first.',
          'The Download button copies the file onto your computer.',
          'The bar at the bottom appears as soon as it has finished: read it before you click anything else.',
          'Show in folder opens the folder the file went into, usually Downloads. Now you know where it is.',
        ],
        solutionVn: [
          'Em chỉ tải được tệp từ trang có chứa nó, nên em vào trang đó trước.',
          'Nút Tải xuống sao chép tệp về máy của em.',
          'Thanh ở phía dưới hiện ra ngay khi tải xong: hãy đọc nó trước khi bấm thứ gì khác.',
          'Show in folder mở thư mục mà tệp đã vào, thường là Downloads. Giờ em biết nó ở đâu rồi.',
        ],
        answer: 'Go to the page, click Download, read the download bar, click Show in folder.',
        answerVn: 'Vào trang, bấm Tải xuống, đọc thanh tải xuống, bấm Show in folder.',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        type: 'mcq',
        prompt: 'You have four tabs open. You click the small X on the third tab. What happens?',
        promptVn: 'Em đang mở bốn thẻ. Em bấm dấu X nhỏ trên thẻ thứ ba. Điều gì xảy ra?',
        options: [
          { val: 'a', text: 'The whole browser closes.', textVn: 'Cả trình duyệt đóng lại.' },
          { val: 'b', text: 'That one page closes and the other three stay open.', textVn: 'Riêng trang đó đóng lại và ba trang kia vẫn mở.' },
          { val: 'c', text: 'All four pages close but the browser stays open.', textVn: 'Cả bốn trang đóng lại nhưng trình duyệt vẫn mở.' },
          { val: 'd', text: 'The page is deleted from the internet.', textVn: 'Trang đó bị xoá khỏi internet.' },
        ],
        correct: 'b',
        solution: [
          'A tab is one page. Closing a tab closes that page and nothing else.',
          'Answer A is true in one special case only: closing the LAST tab, because a browser with no pages in it has nothing left to show. (The X in the far corner of the window closes everything too.)',
          'Answer D is worth thinking about for a second. Nothing you do in your browser changes the website itself — it is on somebody else’s computer, far away.',
        ],
        solutionVn: [
          'Một thẻ là một trang. Đóng một thẻ chỉ đóng trang đó, không đóng gì khác.',
          'Đáp án A chỉ đúng trong một trường hợp đặc biệt: đóng thẻ CUỐI CÙNG, vì một trình duyệt không còn trang nào thì chẳng còn gì để hiện. (Dấu X ở góc xa của cửa sổ cũng đóng tất cả.)',
          'Đáp án D đáng suy nghĩ một chút. Không việc gì em làm trong trình duyệt thay đổi được chính website đó — nó nằm trên máy tính của người khác, ở rất xa.',
        ],
        answer: 'That one page closes and the other three stay open.',
        answerVn: 'Riêng trang đó đóng lại và ba trang kia vẫn mở.',
      },
      {
        id: 'c2',
        type: 'dnd',
        prompt: 'You want to come back to a page tomorrow. Sort these into the ones that will work and the ones that will not.',
        promptVn: 'Em muốn ngày mai quay lại một trang. Hãy phân loại những cách sau thành cách dùng được và cách không dùng được.',
        bank: [
          { val: 'star', text: 'Click the bookmark star', textVn: 'Bấm vào ngôi sao đánh dấu trang' },
          { val: 'write', text: 'Write the address down on paper', textVn: 'Chép địa chỉ ra giấy' },
          { val: 'leave', text: 'Leave the tab open and never turn the computer off', textVn: 'Cứ để thẻ đó mở và không bao giờ tắt máy' },
          { val: 'back', text: 'Use the back button tomorrow', textVn: 'Ngày mai dùng nút quay lại' },
        ],
        targets: [
          { id: 'works', title: 'Will work tomorrow', titleVn: 'Ngày mai vẫn dùng được' },
          { id: 'wont', title: 'Will not work', titleVn: 'Không dùng được' },
        ],
        correctSets: { works: ['star', 'write'], wont: ['leave', 'back'] },
        solution: [
          'A bookmark is built for exactly this, and writing the address down works too — it is what people did before bookmarks existed.',
          'Leaving the tab open is not a plan. It only lasts until somebody closes the browser or shuts the computer down, and one of those always happens.',
          'The back button walks through the pages you visited in THIS session. Tomorrow that trail has gone, so there is nothing to walk back through.',
        ],
        solutionVn: [
          'Dấu trang sinh ra đúng để làm việc này, và chép địa chỉ ra giấy cũng được — đó là cách người ta làm trước khi có dấu trang.',
          'Để thẻ mở không phải là một kế hoạch. Nó chỉ kéo dài đến khi ai đó đóng trình duyệt hoặc tắt máy, mà một trong hai việc đó luôn xảy ra.',
          'Nút quay lại đi ngược qua các trang em đã xem trong LẦN dùng này. Ngày mai dấu vết đó không còn, nên chẳng có gì để đi ngược lại.',
        ],
        answer: 'Will work: the bookmark star, writing the address down. Will not: leaving the tab open, the back button.',
        answerVn: 'Dùng được: ngôi sao đánh dấu, chép địa chỉ ra giấy. Không dùng được: để thẻ mở, nút quay lại.',
      },
      {
        id: 'c3',
        type: 'fill_blank',
        prompt: 'Count the tabs. Type a number in the first gap and a word in the second.',
        promptVn: 'Đếm số thẻ. Gõ một con số vào chỗ trống thứ nhất và một từ vào chỗ trống thứ hai.',
        textParts: ['You have 3 tabs open. You click the + twice, then close one tab with its X. Now ', ' tabs are open. If you then close the tabs one by one, closing the last one also closes the whole ', '.'],
        textPartsVn: ['Em đang mở 3 thẻ. Em bấm dấu + hai lần, rồi đóng một thẻ bằng dấu X của nó. Bây giờ đang mở ', ' thẻ. Nếu sau đó em đóng từng thẻ một, thì đóng thẻ cuối cùng cũng sẽ đóng cả ', ' (gõ từ tiếng Anh).'],
        blanks: {
          1: { correct: '4', width: 4, accept: ['four'] },
          2: { correct: 'browser', width: 9, accept: ['the browser', 'browser window', 'window'] },
        },
        solution: [
          'Each click on the + adds one tab: 3 + 2 = 5.',
          'The X on a tab closes just that one page: 5 − 1 = **4** tabs.',
          'A browser with no pages left has nothing to show, so closing the LAST tab closes the whole **browser**.',
        ],
        solutionVn: [
          'Mỗi lần bấm dấu + thêm một thẻ: 3 + 2 = 5.',
          'Dấu X trên một thẻ chỉ đóng riêng trang đó: 5 − 1 = **4** thẻ.',
          'Trình duyệt không còn trang nào thì chẳng còn gì để hiện, nên đóng thẻ CUỐI CÙNG sẽ đóng cả **browser** (trình duyệt).',
        ],
        answer: '4; browser',
        answerVn: '4; browser (trình duyệt)',
      },
    ],
  },
];
