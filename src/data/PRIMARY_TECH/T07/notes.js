// src/data/PRIMARY_TECH/T07/notes.js
// T7 Inside a Browser — the lesson deck (NOTES, 10 XP).
//
// Eleven slides, three embedded checks (docs/lesson-standard.md). The unit has one
// job at its centre, Applied-Digital-Skills style: go to a website you were
// given, open a second tab, go back, bookmark it, download a file and find it
// after. Every slide is a step of that job rather than a tour of features.
//
// The address bar versus the search box gets its own slide and its own check.
// It is the single most common thing an eight-to-eleven-year-old gets wrong
// about a browser, and it is wrong in a way that hides itself: typing an address
// into a search box usually still gets you there, so nobody corrects it.
//
// Two renderer facts shape the slide order here, both found by measuring:
//
//   · A `check` on a `showcase` takes its height out of the picture — 0.75 scale
//     without one, 0.40 with — and at 0.40 a drawn interface's labels are too
//     small to read. So neither labelled-interface slide carries a check; the
//     questions sit on the slides after them.
//   · `CompareLayout` never renders `inlineSvg`. A diagram set on a compare
//     slide is dropped silently, so ADDRESS_VS_SEARCH has its own showcase.
//
// Closes on the unassessed "On your own computer" card
// (docs/digital-skills-course.md §5.4). Slide audio is derived from position —
// inserting a slide shifts every slide after it, so re-run `npm run sync-audio`.
import { DIAGRAMS } from './diagrams.js';

export const notes = [
  {
    layout: 'hero',
    color: '#0ea5e9',
    icon: 'Globe',
    brand: 'Technology',
    brandVn: 'Công nghệ',
    eyebrow: 'Unit T7',
    eyebrowVn: 'Bài T7',
    title: 'Inside a Browser',
    titleVn: 'Bên trong Trình duyệt',
    objective: 'Go to a website you were given, open a second tab, go back, bookmark the page, download a file — and know where that file went.',
    objectiveVn: 'Vào một trang web em được cho, mở thẻ thứ hai, quay lại, đánh dấu trang, tải một tệp về — và biết tệp đó đi đâu.',
    card: {
      icon: 'Pencil',
      badge: 'Before you start',
      badgeVn: 'Trước khi bắt đầu',
      text: 'Someone gives you a website on a piece of paper: **www.schoolsite.org**. Where exactly do you type it?',
      textVn: 'Ai đó đưa em một địa chỉ web trên tờ giấy: **www.schoolsite.org**. Em gõ nó vào đúng chỗ nào?',
    },
  },
  {
    layout: 'showcase',
    icon: 'ScanEye',
    accent: '#0ea5e9',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'The parts of a browser',
    titleVn: 'Các phần của một trình duyệt',
    inlineSvg: DIAGRAMS.BROWSER_ANATOMY,
    caption: 'The window that shows you websites is a **browser**. Along the top: the **tabs**, then the **address bar**, then the **bookmark star**. Everything below that is the **page** — and the page belongs to somebody else.',
    captionVn: 'Cửa sổ hiển thị các trang web gọi là **trình duyệt**. Dọc phía trên: các **thẻ**, rồi **thanh địa chỉ**, rồi **ngôi sao đánh dấu trang**. Mọi thứ bên dưới là **trang web** — và trang đó thuộc về người khác.',
  },
  {
    layout: 'compare',
    icon: 'ArrowLeftRight',
    title: 'Address bar or search box?',
    titleVn: 'Thanh địa chỉ hay ô tìm kiếm?',
    columns: [
      {
        heading: 'Address bar',
        headingVn: 'Thanh địa chỉ',
        accent: '#1d4ed8',
        icon: 'Compass',
        content: 'At the **top of the browser**, above every page. You type an **address** into it.',
        contentVn: 'Ở **trên cùng của trình duyệt**, phía trên mọi trang. Em gõ một **địa chỉ** vào đó.',
        notes: [
          {
            tone: 'write',
            text: '**Address bar:** the box at the top of the browser. It shows where you are, and takes you to any website.',
            textVn: '**Thanh địa chỉ:** ô ở trên cùng trình duyệt. Nó cho biết em đang ở đâu, và đưa em tới bất kỳ trang web nào.',
          },
        ],
      },
      {
        heading: 'Search box',
        headingVn: 'Ô tìm kiếm',
        accent: '#b45309',
        icon: 'HelpCircle',
        content: 'Drawn **inside the page**. You type **words** into it, and it only looks through **that one website**.',
        contentVn: 'Nằm **bên trong trang**. Em gõ **các từ** vào đó, và nó chỉ tìm trong **riêng website đó**.',
        notes: [
          {
            tone: 'write',
            text: '**Search box:** a box that belongs to one website and searches only that website.',
            textVn: '**Ô tìm kiếm:** một ô thuộc về một website và chỉ tìm trong website đó.',
          },
        ],
      },
    ],
    // No `inlineSvg` here: CompareLayout does not render one (it maps only over
    // `columns`), so a diagram set on a compare slide is silently dropped — the
    // reference deck GED_ENG/ENG_1A has the same dead field. ADDRESS_VS_SEARCH
    // gets its own showcase slide immediately after this one instead.
    check: {
      id: 'chk_addr_vs_search',
      q: 'Your teacher writes www.schoolsite.org on the board. Where do you type it?',
      qVn: 'Cô giáo viết www.schoolsite.org lên bảng. Em gõ nó vào đâu?',
      options: [
        { val: 'A', text: 'In the address bar, at the top of the browser.', textVn: 'Vào thanh địa chỉ, ở trên cùng trình duyệt.' },
        { val: 'B', text: 'In the search box on whichever page is open.', textVn: 'Vào ô tìm kiếm trên trang nào đang mở.' },
        { val: 'C', text: 'Either one — they both do the same job.', textVn: 'Cái nào cũng được — cả hai làm cùng một việc.' },
      ],
      correct: 'A',
      expEn: 'You have been given an address, so it goes in the address bar and takes you straight there. A search box on a page only looks through that one website — type an address into it and you are asking the wrong place a question it cannot answer.',
      expVn: 'Em được cho một địa chỉ, nên nó phải vào thanh địa chỉ và sẽ đưa em thẳng tới đó. Ô tìm kiếm trên một trang chỉ tìm trong riêng website ấy — gõ địa chỉ vào đó là em đang hỏi nhầm chỗ một câu mà nó không trả lời được.',
    },
  },
  {
    layout: 'showcase',
    icon: 'ArrowLeftRight',
    accent: '#3b82f6',
    title: 'The two boxes, side by side',
    titleVn: 'Hai cái ô, đặt cạnh nhau',
    inlineSvg: DIAGRAMS.ADDRESS_VS_SEARCH,
    caption: 'They are drawn the same shape on purpose. What tells them apart is **where they live** and **how far they reach** — not what they look like.',
    captionVn: 'Chúng được vẽ cùng một hình dạng là có chủ ý. Thứ phân biệt chúng là **chúng nằm ở đâu** và **vươn xa tới đâu** — không phải hình dáng.',
  },
  {
    layout: 'steps',
    icon: 'ArrowRight',
    accent: '#0ea5e9',
    title: 'Going to a website you were given',
    titleVn: 'Vào một trang web em được cho',
    content: 'Four steps, and the first one is the one people skip.',
    contentVn: 'Bốn bước, và bước đầu tiên là bước người ta hay bỏ qua.',
    steps: [
      { text: 'Click **once** in the address bar. The old address goes blue — that means it is selected.', textVn: 'Bấm **một lần** vào thanh địa chỉ. Địa chỉ cũ chuyển sang màu xanh — nghĩa là nó đang được chọn.' },
      { text: 'Type the new address. It **replaces** the blue one; you do not need to delete anything.', textVn: 'Gõ địa chỉ mới. Nó **thay thế** phần màu xanh; em không cần xoá gì cả.' },
      { text: 'Check what you typed. **One wrong letter goes to a different website**, and sometimes to a nasty one.', textVn: 'Kiểm tra lại những gì em đã gõ. **Sai một chữ cái là sang một website khác**, đôi khi là một trang xấu.' },
      { text: 'Press **Enter**.', textVn: 'Bấm **Enter**.' },
    ],
    reveal: {
      label: 'Why check the spelling so carefully?',
      labelVn: 'Sao phải kiểm tra chính tả kỹ thế?',
      prompt: 'You meant to type www.schoolsite.org but you typed www.schoolsight.org.',
      promptVn: 'Em định gõ www.schoolsite.org nhưng lại gõ www.schoolsight.org.',
      answer: 'You will arrive somewhere completely different. Addresses are **exact** — the browser does not guess what you meant, and people buy the misspelled versions of popular addresses on purpose.',
      answerVn: 'Em sẽ đến một nơi hoàn toàn khác. Địa chỉ web là **chính xác tuyệt đối** — trình duyệt không đoán ý em, và có người cố tình mua những địa chỉ viết sai của các trang nổi tiếng.',
    },
  },
  {
    layout: 'split',
    icon: 'Layers',
    accent: '#a855f7',
    ratio: 55,
    title: 'Tabs: two pages at once',
    titleVn: 'Thẻ: hai trang cùng lúc',
    content: 'A **tab** is one page inside your browser window. The **+** at the end of the row opens another one, so you can keep this page AND look at something else.',
    contentVn: 'Một **thẻ** là một trang bên trong cửa sổ trình duyệt. Dấu **+** ở cuối hàng mở thêm một thẻ nữa, để em vừa giữ trang này vừa xem thứ khác.',
    notes: [
      {
        tone: 'write',
        text: '**Tab:** one page in the row along the top. Click a tab to swap to it; click its **X** to close just that page.',
        textVn: '**Thẻ:** một trang trong hàng chạy dọc phía trên. Bấm vào thẻ để chuyển sang; bấm **X** trên thẻ để chỉ đóng riêng trang đó.',
      },
      {
        tone: 'homework',
        text: 'Closing the last tab closes the **whole browser**. Closing a tab is not the same as closing the window.',
        textVn: 'Đóng thẻ cuối cùng sẽ đóng **cả trình duyệt**. Đóng một thẻ không giống đóng cả cửa sổ.',
      },
    ],
    check: {
      id: 'chk_tabs',
      q: 'You are reading a page and want to look something up without losing it. What is the best thing to do?',
      qVn: 'Em đang đọc một trang và muốn tra cứu thứ khác mà không mất trang này. Cách tốt nhất là gì?',
      options: [
        { val: 'A', text: 'Type the new address over the top of this one.', textVn: 'Gõ đè địa chỉ mới lên địa chỉ hiện tại.' },
        { val: 'B', text: 'Open a new tab, and leave this page in its own tab.', textVn: 'Mở một thẻ mới, và để trang này ở thẻ riêng của nó.' },
        { val: 'C', text: 'Close the browser and start it again.', textVn: 'Đóng trình duyệt rồi mở lại.' },
      ],
      correct: 'B',
      expEn: 'That is exactly what tabs are for. Typing over the address would take this same tab somewhere else — you would get your page back with the Back button, but you would have lost your place on it.',
      expVn: 'Đó chính là công dụng của thẻ. Gõ đè lên địa chỉ sẽ đưa chính thẻ này đi nơi khác — em có thể lấy lại trang bằng nút Quay lại, nhưng sẽ mất chỗ đang đọc dở.',
    },
  },
  {
    layout: 'steps',
    icon: 'Repeat',
    accent: '#10b981',
    title: 'Back, forward, reload',
    titleVn: 'Quay lại, đi tới, tải lại',
    content: 'Three arrows at the top left, and each one does something different. Nothing here can break anything.',
    contentVn: 'Ba mũi tên ở góc trên bên trái, và mỗi cái làm một việc khác nhau. Không cái nào ở đây làm hỏng được gì.',
    steps: [
      { text: '**Back** (◀) returns you to the page you were on before. Press it as many times as you like.', textVn: '**Quay lại** (◀) đưa em về trang em vừa xem trước đó. Bấm bao nhiêu lần cũng được.' },
      { text: '**Forward** (▶) only works after you have gone back. It returns you to where you were.', textVn: '**Đi tới** (▶) chỉ dùng được sau khi em đã quay lại. Nó đưa em trở về chỗ cũ.' },
      { text: '**Reload** (↻) fetches the same page again — for when it looks broken or half-loaded.', textVn: '**Tải lại** (↻) lấy lại chính trang đó — dùng khi trang trông bị lỗi hoặc mới hiện một nửa.' },
      { text: 'Lost? **Back is almost always the answer.** You can nearly always undo where you have gone.', textVn: 'Bị lạc? **Quay lại gần như luôn là câu trả lời.** Em hầu như luôn có thể hoàn tác nơi mình vừa đến.' },
    ],
  },
  {
    layout: 'statement',
    icon: 'Target',
    accent: '#f59e0b',
    label: 'Bookmark',
    labelVn: 'Dấu trang',
    title: 'Save the page, not the picture of it',
    titleVn: 'Lưu trang web, không phải ảnh chụp nó',
    text: 'Clicking the **star** saves this page in a list, so you can come back to it tomorrow without remembering the address.',
    textVn: 'Bấm vào **ngôi sao** sẽ lưu trang này vào một danh sách, để mai em quay lại mà không cần nhớ địa chỉ.',
    sub: 'A bookmark is a **way back**, not a copy. If the website changes, your bookmark shows the new version — and if the site disappears, so does the bookmark.',
    subVn: 'Dấu trang là **đường quay lại**, không phải bản sao. Nếu website thay đổi, dấu trang sẽ hiện bản mới — và nếu trang biến mất thì dấu trang cũng vô dụng.',
    notes: [
      {
        tone: 'write',
        text: '**Bookmark:** a saved link to a page, kept in the browser so you can find the page again.',
        textVn: '**Dấu trang:** một liên kết đã lưu tới một trang, được trình duyệt giữ lại để em tìm lại trang đó.',
      },
    ],
  },
  {
    layout: 'showcase',
    icon: 'Boxes',
    accent: '#3b82f6',
    title: 'You downloaded a file. Where did it go?',
    titleVn: 'Em đã tải một tệp về. Nó đi đâu rồi?',
    inlineSvg: DIAGRAMS.AFTER_DOWNLOAD,
    caption: 'The bar along the bottom is the browser **telling you the answer**. **Show in folder** opens the place the file was saved — usually a folder called **Downloads**.',
    captionVn: 'Thanh chạy dọc phía dưới chính là lúc trình duyệt **nói cho em biết đáp án**. **Hiện trong thư mục** mở đúng nơi tệp được lưu — thường là một thư mục tên **Downloads** (Tải xuống).',
  },
  {
    layout: 'stack',
    icon: 'ListChecks',
    accent: '#0ea5e9',
    columns: 1,
    title: 'Check your notebook',
    titleVn: 'Kiểm tra vở của em',
    content: 'Your notebook should now have **four definitions** and **one rule you can say out loud**. Check.',
    contentVn: 'Vở của em bây giờ phải có **bốn định nghĩa** và **một quy tắc em nói được thành tiếng**. Hãy kiểm tra.',
    notes: [
      {
        tone: 'write',
        text: 'The definitions: **address bar · search box · tab · bookmark**.',
        textVn: 'Các định nghĩa: **thanh địa chỉ · ô tìm kiếm · thẻ · dấu trang**.',
      },
      {
        tone: 'write',
        text: 'The rule: an **address** goes in the **address bar**; **words** go in a **search box**.',
        textVn: 'Quy tắc: **địa chỉ** thì gõ vào **thanh địa chỉ**; **các từ** thì gõ vào **ô tìm kiếm**.',
      },
      {
        tone: 'info',
        text: 'Can you say where a downloaded file goes, **without** looking back?',
        textVn: 'Em có nói được một tệp đã tải về đi đâu, **mà không cần** nhìn lại không?',
      },
    ],
    // This check belongs to the download slide before it, and sits here because
    // a check on that `showcase` would shrink its picture past readable — see
    // the note at the top of this file.
    check: {
      id: 'chk_downloads',
      q: 'You download a file and close the browser without looking at the bar. Is the file gone?',
      qVn: 'Em tải một tệp rồi đóng trình duyệt mà không nhìn thanh đó. Tệp có mất không?',
      options: [
        { val: 'A', text: 'Yes — the file was inside the browser, so it closed with it.', textVn: 'Có — tệp nằm trong trình duyệt, nên đóng trình duyệt là mất.' },
        { val: 'B', text: 'No — it is saved in the Downloads folder, like any other file.', textVn: 'Không — nó đã được lưu trong thư mục Downloads, giống mọi tệp khác.' },
        { val: 'C', text: 'Only if you downloaded it twice.', textVn: 'Chỉ mất nếu em tải nó hai lần.' },
      ],
      correct: 'B',
      expEn: 'Downloading makes a real file on your computer. It is not stored inside the browser — it is sitting in a folder, with a name and a date, and you can open it without the browser at all.',
      expVn: 'Tải xuống tạo ra một tệp thật trên máy của em. Nó không được cất bên trong trình duyệt — nó nằm trong một thư mục, có tên và có ngày, và em mở được nó mà không cần trình duyệt.',
    },
  },
  {
    layout: 'callout',
    icon: 'Sparkles',
    accent: '#10b981',
    eyebrow: 'On your own computer',
    eyebrowVn: 'Trên máy tính của em',
    title: 'Do this for real, today',
    titleVn: 'Hãy làm thật, ngay hôm nay',
    content: 'A browser you have only read about is a browser you cannot use. Go and do the whole job once, on a real machine.',
    contentVn: 'Một trình duyệt mà em chỉ đọc về thôi thì em vẫn chưa dùng được. Hãy đi làm trọn vẹn công việc đó một lần, trên một chiếc máy thật.',
    notes: [
      {
        tone: 'task',
        text: 'Type an address you have been given into the **address bar**, and get there in one go.',
        textVn: 'Gõ một địa chỉ em được cho vào **thanh địa chỉ**, và đến nơi ngay lần đầu.',
      },
      {
        tone: 'task',
        text: 'Open a **second tab**, swap between the two, then close only the second one.',
        textVn: 'Mở **thẻ thứ hai**, chuyển qua lại giữa hai thẻ, rồi chỉ đóng riêng thẻ thứ hai.',
      },
      {
        tone: 'task',
        text: '**Bookmark** one page. Close the browser, open it again, and find that page from your bookmarks.',
        textVn: '**Đánh dấu** một trang. Đóng trình duyệt, mở lại, và tìm trang đó từ danh sách dấu trang.',
      },
      {
        tone: 'task',
        text: 'Download one file, then **find it in the Downloads folder** without using the browser.',
        textVn: 'Tải một tệp về, rồi **tìm nó trong thư mục Downloads** mà không dùng trình duyệt.',
      },
    ],
  },
];
