// src/data/PRIMARY_TECH/T07/notes.js
// T7 Inside a Browser — the lesson deck (NOTES), rebuilt to the Year 7 standard
// (docs/primary-tech/UPGRADE-PLAN.md §4 and the T7 brief in §6). 26 layout
// slides; 16 scored items — 6 checks and 10 activities (hotspot · predict ·
// sort · order) — so the student does something every slide or two. Three
// slides embed the Try It browser in demo mode (Show), on the same engine and
// the same fake web the Try It jobs use (Do).
//
// SPINE:
//   1–2    hero; hotspot — which icon on the taskbar opens websites?
//   3–6    which one is the browser? (gallery); the parts, labelled (LB_BROWSER);
//          hotspot — the address bar; hotspot — the button that opens a new tab
//   7–9    address bar or search box? (compare + check); the two boxes side by
//          side; predict — what the school's own box does with an address
//   10–13  going to a website you were given (steps + the typo reveal);
//          DEMO — type it, Enter, then a link; reading an address (LB_ADDRESS)
//          + check — which address is the school's; sort — address or words?
//   14–17  hotspot — the link on a page; tabs (split + check); DEMO — a second
//          tab; order — the five steps of opening one
//   18–20  back, forward, reload (steps) + predict — Back twice, Forward once;
//          sort — which button fixes it; bookmark (statement + check)
//   21–24  downloading (showcase); hotspot — the button that shows where it
//          went; DEMO — download, Show in folder; is it gone? (DOWNLOADS_FOLDER
//          + check)
//   25–26  the checklist with the exit check; the unassessed "On your own
//          computer" card, which stays last (docs/digital-skills-course.md §5.4)
//
// House notes:
//  · Every slide's `check:` or `activity:` is its LAST key; no slide has both.
//    The right check letters are spread B · D · A · C · D · B.
//  · Activity strings are name/explain, never text/content (the narration
//    generator reads text/content aloud and stops at `check:`/`activity:`).
//  · Hotspots strip printed <text> from their picture, so every word that is
//    part of the SCREEN is class="keep" in diagrams.js and every question asks
//    by FUNCTION ("the box that shows where you are"), never by the word on it.
//    Every plausible control is a named decoy, so a wrong tap says what it hit.
//    A long target (the address bar, a line of link text) is several circles
//    with the same id — `along()` below — so it answers anywhere along its
//    length; the first circle is the one the reveal rings, so it goes mid-target.
//  · The AppSim demo scripts use the `browser` skin's actions
//    (UPGRADE-PLAN §3.1). An address in a script is a constant, not a quoted
//    literal: the narrator reads any quoted `text:` before a check, and the
//    typeAddress action's field is called `text`.
//  · Two renderer traps (docs/lesson-renderer-gap.md §0): `compare` drops
//    `inlineSvg`, so ADDRESS_VS_SEARCH has its own showcase; and a check on a
//    `showcase` shrinks its picture, so every picture that carries a check is
//    on a `split`, and the showcases carry none.
//  · Slide audio is derived from position: this deck grew from 12 slides to
//    26, so delete public/audio/PRIMARY_TECH/T07/ and re-run sync-audio.
import { DIAGRAMS } from './diagrams.js';

const SKY = '#0ea5e9';
const SKY_D = '#0284c7';
const PURPLE = '#a855f7';
const GREEN = '#10b981';
const AMBER = '#f59e0b';
const BLUE = '#3b82f6';

// The fake web (UPGRADE-PLAN §3.1), for the demo scripts.
const SCHOOL = 'www.schoolsite.org';
const LIBRARY = 'www.schoolsite.org/library';
const HOMEWORK = 'www.schoolsite.org/homework';
const CITY = 'www.citylibrary.org';
const CITY_KIDS = 'www.citylibrary.org/kids';
const READING_LIST = 'reading-list.pdf';

/** Same-id hotspot circles along a bar or a line of words, so a long target answers anywhere on it. */
const along = (id, xs, y, r, name, nameVn) => xs.map((x) => ({ id, x, y, r, name, nameVn }));

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: SKY,
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
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **tap**, **sort**, **predict** and **put steps in order** — and watch a real-looking browser do each job first. **16 things are scored**. The first one is on the next slide.',
      textVn: 'Em sẽ **chạm**, **phân loại**, **dự đoán** và **sắp xếp các bước** — và được xem một trình duyệt giống thật làm từng việc trước. **16 mục được tính điểm**. Mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: HOTSPOT — which icon opens websites? ──────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'MousePointerClick',
    eyebrow: 'Start with what you know',
    eyebrowVn: 'Bắt đầu từ điều em đã biết',
    title: 'Which One Opens Websites?',
    titleVn: 'Cái nào mở được trang web?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Each picture on the **taskbar** opens a **program**.',
    textVn: 'Mỗi hình trên **thanh tác vụ** mở một **chương trình**.',
    sub: 'Only one of them is for visiting **websites**. Which one?',
    subVn: 'Chỉ một trong số đó dùng để vào **các trang web**. Là cái nào?',
    activity: {
      id: 'act_taskbar',
      type: 'hotspot',
      prompt: 'Tap the program you would open to visit a website.',
      promptVn: 'Chạm vào chương trình em sẽ mở để vào một trang web.',
      svg: DIAGRAMS.TASKBAR,
      viewBox: '0 0 800 240',
      targets: [
        { id: 'browser', x: 526, y: 190, r: 34, name: 'the globe: the browser', nameVn: 'quả địa cầu: trình duyệt' },
        { id: 'files', x: 298, y: 190, r: 34, name: 'the folder: Files, for the folders on this computer', nameVn: 'thư mục: Files, để xem các thư mục trên máy này' },
        { id: 'notes', x: 374, y: 190, r: 34, name: 'the page: Notes, for writing', nameVn: 'tờ giấy: Notes, để viết' },
        { id: 'paint', x: 450, y: 190, r: 34, name: 'the palette: Paint, for drawing', nameVn: 'bảng màu: Paint, để vẽ' },
        { id: 'calc', x: 602, y: 190, r: 34, name: 'the Calculator, for sums', nameVn: 'máy tính bỏ túi (Calculator), để làm tính' },
        { id: 'search', x: 172, y: 190, r: 42, name: 'the taskbar’s search box: it finds programs and files on this computer', nameVn: 'ô tìm kiếm trên thanh tác vụ: nó tìm chương trình và tệp trên máy này' },
        { id: 'menu', x: 50, y: 190, r: 34, name: 'the menu button: a list of programs, not a program', nameVn: 'nút menu: một danh sách chương trình, không phải một chương trình' },
        { id: 'clock', x: 740, y: 190, r: 36, name: 'the clock', nameVn: 'đồng hồ' },
        { id: 'desktop', x: 400, y: 80, r: 70, name: 'the empty desktop: nothing opens from here', nameVn: 'màn hình nền trống: không có gì mở ra từ đây' },
      ],
      correct: 'browser',
      explain: 'The **globe** opens this computer’s **browser**: the program that shows you websites. The folder is **Files**, the page is **Notes**, the palette is **Paint** and the last one is the **Calculator**. The browser on your own computer may look different — the next slide shows the three you will meet most.',
      explainVn: '**Quả địa cầu** mở **trình duyệt** của máy này: chương trình cho em xem các trang web. Thư mục là **Files**, tờ giấy là **Notes**, bảng màu là **Paint** và cái cuối cùng là **Calculator** (máy tính bỏ túi). Trình duyệt trên máy của em có thể trông khác — slide sau cho em xem ba loại em sẽ gặp nhiều nhất.',
    },
  },

  // 3 ─ Which one is the browser? (gallery) ─────────────────────────────────
  {
    // Before you can look at a browser you have to find one, and the icon is how
    // a nine-year-old finds it. Three names, because the answer genuinely
    // depends on the machine in front of them — and a way out if none of the
    // three is on screen.
    layout: 'gallery',
    icon: 'Globe',
    accent: SKY,
    columns: 3,
    tone: 'plant',
    copyLabel: 'Look for one of these',
    copyLabelVn: 'Hãy tìm một trong những cái này',
    title: 'Which one is the browser?',
    titleVn: 'Cái nào là trình duyệt?',
    content: 'A browser is a **program**, so it has an **icon** you click — and different computers come with different ones. All three of these do the same job.\n\n**Not sure which you have?** Type **browser** into the **search box on the taskbar**. The computer will show you the one it has.',
    contentVn: 'Trình duyệt là một **chương trình**, nên nó có một **biểu tượng** để em bấm vào — và mỗi máy tính lại có sẵn loại khác nhau. Cả ba cái này đều làm cùng một việc.\n\n**Không chắc máy mình có cái nào?** Hãy gõ **browser** vào **ô tìm kiếm trên thanh tác vụ**. Máy tính sẽ chỉ ra trình duyệt mà nó có.',
    items: [
      {
        inlineSvg: DIAGRAMS.CHROME_ICON,
        term: 'Google Chrome',
        tag: 'Most common',
        tagVn: 'Phổ biến nhất',
        text: 'The one you will meet most often. It runs on **almost any** computer, phone or tablet.',
        textVn: 'Loại em sẽ gặp nhiều nhất. Nó chạy trên **hầu hết** máy tính, điện thoại hay máy tính bảng.',
      },
      {
        inlineSvg: DIAGRAMS.EDGE_ICON,
        term: 'Microsoft Edge',
        tag: 'Windows',
        tagVn: 'Windows',
        text: 'Already there on a **Windows** computer, so it is often the one at school.',
        textVn: 'Có sẵn trên máy tính **Windows**, nên thường là loại có ở trường.',
      },
      {
        inlineSvg: DIAGRAMS.SAFARI_ICON,
        term: 'Safari',
        tag: 'Apple',
        tagVn: 'Apple',
        text: 'Already there on an **Apple** computer, iPad or iPhone.',
        textVn: 'Có sẵn trên máy tính **Apple**, iPad hoặc iPhone.',
      },
    ],
  },

  // 4 ─ The parts of a browser, labelled ────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'ScanEye',
    accent: SKY,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'The parts of a browser',
    titleVn: 'Các phần của một trình duyệt',
    inlineSvg: DIAGRAMS.LB_BROWSER,
    caption: 'Along the top: the **tabs**, and the **+** for a new one. Under them: **Back**, **Reload**, the **address bar** and the **bookmark star**. Everything below is the **web page** — and the page belongs to somebody else.',
    captionVn: 'Dọc phía trên: các **thẻ**, và dấu **+** để mở thẻ mới. Bên dưới: nút **Quay lại**, nút **Tải lại**, **thanh địa chỉ** và **ngôi sao đánh dấu trang**. Mọi thứ bên dưới là **trang web** — và trang đó thuộc về người khác.',
  },

  // 5 ─ HOTSPOT — the address bar ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: BLUE,
    icon: 'Compass',
    eyebrow: 'Find it',
    eyebrowVn: 'Tìm nó',
    title: 'Where Are You?',
    titleVn: 'Em đang ở đâu?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'The **address bar** shows **where you are**.',
    textVn: '**Thanh địa chỉ** cho biết **em đang ở đâu**.',
    sub: 'It belongs to the **browser**, not the page, and sits above **every** website. Tap it — the box that could take you anywhere.',
    subVn: 'Nó thuộc về **trình duyệt**, không thuộc về trang web, và nằm phía trên **mọi** trang. Chạm vào nó — cái ô có thể đưa em tới bất kỳ đâu.',
    activity: {
      id: 'act_address_bar',
      type: 'hotspot',
      prompt: 'Tap the box that shows where you are on the web.',
      promptVn: 'Chạm vào ô cho biết em đang ở đâu trên mạng.',
      svg: DIAGRAMS.BROWSER_ANATOMY,
      viewBox: '0 0 800 500',
      targets: [
        { id: 'back', x: 38, y: 82, r: 20, name: 'Back: it goes to the page before', nameVn: 'Quay lại: nó về trang trước đó' },
        { id: 'forward', x: 82, y: 82, r: 20, name: 'Forward: it undoes a Back', nameVn: 'Đi tới: nó hoàn tác một lần Quay lại' },
        { id: 'reload', x: 126, y: 82, r: 20, name: 'Reload: it fetches this page again', nameVn: 'Tải lại: nó lấy lại trang này' },
        { id: 'star', x: 742, y: 82, r: 20, name: 'the bookmark star: it saves a way back to this page', nameVn: 'ngôi sao đánh dấu: nó lưu đường quay lại trang này' },
        { id: 'newtab', x: 462, y: 32, r: 18, name: 'the +: it opens a new tab', nameVn: 'dấu +: nó mở một thẻ mới' },
        ...along('tabx', [204, 420], 32, 11, 'the X on a tab: it closes that page', 'dấu X trên một thẻ: nó đóng trang đó'),
        ...along('window', [700, 730, 762], 32, 13, 'the window’s own buttons: they hide, grow or close the whole browser', 'các nút của cửa sổ: chúng ẩn, phóng to hoặc đóng cả trình duyệt'),
        ...along('tab', [60, 120, 170, 270, 333, 390], 32, 19, 'a tab: it shows the page’s name, not where it is', 'một thẻ: nó hiện tên trang, không phải trang ở đâu'),
        ...along('addr', [288, 192, 240, 336, 384, 432, 480, 528, 576, 624, 672], 82, 36, 'the address bar', 'thanh địa chỉ'),
        ...along('search', [280, 330, 380, 430, 480, 526], 219, 25, 'the search box on the page: it belongs to this website and only searches it', 'ô tìm kiếm trên trang: nó thuộc về website này và chỉ tìm trong đó'),
        ...along('heading', [310, 370, 430, 490], 155, 22, 'the page’s heading: it names the page, but you cannot type in it', 'tiêu đề của trang: nó ghi tên trang, nhưng em không gõ vào được'),
        ...along('link', [320, 370, 420, 475], 287, 18, 'a link on the page', 'một liên kết trên trang'),
        ...along('download', [335, 385, 435, 470], 354, 26, 'the page’s Download button', 'nút Tải xuống của trang'),
      ],
      correct: 'addr',
      explain: 'The **address bar** is the long box at the top. It says **www.schoolsite.org/library**, the page you are on, and you can type a different address into it. The **search box** in the middle belongs to the school website and only searches that site; a tab only shows the page’s **name**.',
      explainVn: '**Thanh địa chỉ** là ô dài ở trên cùng. Nó ghi **www.schoolsite.org/library**, trang em đang xem, và em có thể gõ một địa chỉ khác vào đó. **Ô tìm kiếm** ở giữa thuộc về website của trường và chỉ tìm trong trang đó; còn một thẻ chỉ hiện **tên** của trang.',
    },
  },

  // 6 ─ HOTSPOT — the button that opens a new tab ───────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'Find it',
    eyebrowVn: 'Tìm nó',
    title: 'One More Page',
    titleVn: 'Thêm một trang nữa',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'One **tab** for each page you have open.',
    textVn: 'Mỗi **thẻ** là một trang em đang mở.',
    sub: 'Three pages are open here. Tap the button that opens a **new, empty tab** — without closing anything.',
    subVn: 'Ở đây đang mở ba trang. Chạm vào nút mở một **thẻ mới, trống** — mà không đóng thứ gì cả.',
    activity: {
      id: 'act_new_tab',
      type: 'hotspot',
      prompt: 'Tap the button that opens a new, empty tab.',
      promptVn: 'Chạm vào nút mở một thẻ mới, trống.',
      svg: DIAGRAMS.TAB_STRIP,
      viewBox: '0 0 720 200',
      targets: [
        { id: 'tabx', x: 366, y: 46, r: 14, name: 'the X on this tab: it closes just this one page', nameVn: 'dấu X trên thẻ này: nó chỉ đóng riêng trang này' },
        { id: 'tabx', x: 170, y: 46, r: 12, name: 'the X on a tab: it closes that page', nameVn: 'dấu X trên một thẻ: nó đóng trang đó' },
        { id: 'tabx', x: 544, y: 46, r: 12, name: 'the X on a tab: it closes that page', nameVn: 'dấu X trên một thẻ: nó đóng trang đó' },
        { id: 'winclose', x: 700, y: 46, r: 14, name: 'the X in the corner: it closes the WHOLE browser, every tab', nameVn: 'dấu X ở góc: nó đóng CẢ trình duyệt, mọi thẻ' },
        { id: 'winmin', x: 638, y: 46, r: 14, name: 'Minimise: it hides the whole window', nameVn: 'Thu nhỏ: nó ẩn cả cửa sổ' },
        { id: 'winmax', x: 668, y: 46, r: 14, name: 'Maximise: it makes the window fill the screen', nameVn: 'Phóng to: nó làm cửa sổ đầy màn hình' },
        { id: 'plus', x: 586, y: 46, r: 22, name: 'the +', nameVn: 'dấu +' },
        { id: 'tab', x: 100, y: 46, r: 40, name: 'a tab that is already open: tapping it swaps to that page', nameVn: 'một thẻ đang mở sẵn: chạm vào là chuyển sang trang đó' },
        { id: 'tab', x: 285, y: 46, r: 40, name: 'the tab you are looking at now', nameVn: 'thẻ em đang xem' },
        { id: 'tab', x: 470, y: 46, r: 40, name: 'a tab that is already open: tapping it swaps to that page', nameVn: 'một thẻ đang mở sẵn: chạm vào là chuyển sang trang đó' },
        { id: 'address', x: 395, y: 102, r: 40, name: 'the address bar: typing here changes THIS tab, it does not open a new one', nameVn: 'thanh địa chỉ: gõ ở đây sẽ đổi trang của CHÍNH thẻ này, không mở thẻ mới' },
      ],
      correct: 'plus',
      explain: 'The **+** at the end of the tabs opens a new tab (so does **Ctrl+T**). Careful with the Xs: the **X on a tab** closes just that page, and the **X in the corner** closes the whole browser, every tab at once.',
      explainVn: 'Dấu **+** ở cuối hàng thẻ mở một thẻ mới (phím **Ctrl+T** cũng vậy). Cẩn thận với các dấu X: **X trên một thẻ** chỉ đóng trang đó, còn **X ở góc** đóng cả trình duyệt, mọi thẻ cùng lúc.',
    },
  },

  // 7 ─ Address bar or search box? + CHECK ──────────────────────────────────
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
        content: 'At the **top of the browser**, above every page. Type an **address** and it takes you **there**. (Type words instead, and it asks a **search engine** to look across the whole web.)',
        contentVn: 'Ở **trên cùng của trình duyệt**, phía trên mọi trang. Gõ một **địa chỉ** và nó đưa em **tới đó**. (Nếu gõ các từ, nó sẽ nhờ một **công cụ tìm kiếm** tìm khắp mạng.)',
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
        content: 'Drawn **inside the page**, by the people who made that website. Type **words** and it looks only through **that one website**.',
        contentVn: 'Nằm **bên trong trang**, do người làm website đó tạo ra. Gõ **các từ** và nó chỉ tìm trong **riêng website đó**.',
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
    // `columns`). ADDRESS_VS_SEARCH gets its own showcase immediately after.
    check: {
      id: 'chk_addr_vs_search',
      q: 'Your teacher writes **www.citylibrary.org** on the board. Where do you type it?',
      qVn: 'Cô giáo viết **www.citylibrary.org** lên bảng. Em gõ nó vào đâu?',
      options: [
        { val: 'A', text: 'In the search box on whichever page is open.', textVn: 'Vào ô tìm kiếm trên trang nào đang mở.' },
        { val: 'B', text: 'In the address bar, at the top of the browser.', textVn: 'Vào thanh địa chỉ, ở trên cùng trình duyệt.' },
        { val: 'C', text: 'Either one — they both do the same job.', textVn: 'Cái nào cũng được — cả hai làm cùng một việc.' },
        { val: 'D', text: 'In the search box on the taskbar.', textVn: 'Vào ô tìm kiếm trên thanh tác vụ.' },
      ],
      correct: 'B',
      expEn: 'It is an **address**, so it goes in the **address bar** and takes you straight there. A search box on a page only looks through that one website (A), so the two boxes do different jobs (C). The taskbar’s search box (D) looks for programs and files on your own computer, not for websites.',
      expVn: 'Đó là một **địa chỉ**, nên nó vào **thanh địa chỉ** và đưa em thẳng tới đó. Ô tìm kiếm trên một trang chỉ tìm trong riêng website ấy (A), nên hai ô làm hai việc khác nhau (C). Ô tìm kiếm trên thanh tác vụ (D) tìm chương trình và tệp trên chính máy của em, không tìm trang web.',
    },
  },

  // 8 ─ The two boxes, side by side ─────────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'ArrowLeftRight',
    accent: BLUE,
    title: 'The two boxes, side by side',
    titleVn: 'Hai cái ô, đặt cạnh nhau',
    inlineSvg: DIAGRAMS.ADDRESS_VS_SEARCH,
    caption: 'They are drawn the same shape on purpose. What tells them apart is **where they live** and **how far they reach** — not what they look like.',
    captionVn: 'Chúng được vẽ cùng một hình dạng là có chủ ý. Thứ phân biệt chúng là **chúng nằm ở đâu** và **vươn xa tới đâu** — không phải hình dáng.',
  },

  // 9 ─ PREDICT — the wrong box ─────────────────────────────────────────────
  {
    layout: 'split',
    icon: 'HelpCircle',
    accent: PURPLE,
    ratio: 55,
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'The Wrong Box',
    titleVn: 'Nhầm ô',
    inlineSvg: DIAGRAMS.SITE_SEARCH_MISTAKE,
    content: 'Ha Vi is on the school website. She wants the **City Library** website, so she types its **address** into the **school’s own search box** and presses **Search**.',
    contentVn: 'Hà Vi đang ở website của trường. Bạn ấy muốn vào website **Thư viện Thành phố**, nên gõ **địa chỉ** của nó vào **ô tìm kiếm riêng của trường** rồi bấm **Search**.',
    activity: {
      id: 'act_wrong_box',
      type: 'predict',
      prompt: 'What happens when Ha Vi presses Search?',
      promptVn: 'Điều gì xảy ra khi Hà Vi bấm Search?',
      options: [
        { val: 'opens', name: 'The City Library website opens.', nameVn: 'Website Thư viện Thành phố mở ra.' },
        { val: 'newtab', name: 'The City Library opens in a new tab.', nameVn: 'Thư viện Thành phố mở ra trong một thẻ mới.' },
        { val: 'nothing', name: 'The school website searches its own pages, and finds nothing.', nameVn: 'Website của trường tìm trong các trang của chính nó, và không thấy gì.' },
        { val: 'crash', name: 'The browser breaks and closes.', nameVn: 'Trình duyệt bị hỏng và đóng lại.' },
      ],
      correct: 'nothing',
      explain: 'The box belongs to the **school** website, so it can only look through the **school’s** pages. It does not know what an address is: it looks for the words **www.citylibrary.org** and finds **No results**. Nothing breaks, which is why this mistake can go on for years. The address belongs in the **address bar**.',
      explainVn: 'Ô đó thuộc về website của **trường**, nên nó chỉ tìm được trong các trang **của trường**. Nó không biết địa chỉ là gì: nó tìm các chữ **www.citylibrary.org** và báo **No results** (không có kết quả). Không có gì hỏng cả, vì thế lỗi này có thể kéo dài nhiều năm. Địa chỉ phải gõ vào **thanh địa chỉ**.',
    },
  },

  // 10 ─ Going to a website you were given (steps + the typo reveal) ───────
  {
    layout: 'steps',
    icon: 'ArrowRight',
    accent: SKY,
    title: 'Going to a website you were given',
    titleVn: 'Vào một trang web em được cho',
    inlineSvg: DIAGRAMS.ADDRESS_SELECTED,
    content: 'Four steps, and the first one is the one people skip.',
    contentVn: 'Bốn bước, và bước đầu tiên là bước người ta hay bỏ qua.',
    steps: [
      { text: 'Click **once** in the address bar. The old address turns **blue**: it is **selected**.', textVn: 'Bấm **một lần** vào thanh địa chỉ. Địa chỉ cũ chuyển sang **màu xanh**: nó đang **được chọn**.' },
      { text: 'Type the new address. It **replaces** the blue one, so there is nothing to delete.', textVn: 'Gõ địa chỉ mới. Nó **thay thế** phần màu xanh, nên không cần xoá gì cả.' },
      { text: 'Check what you typed, letter by letter. **One wrong letter is a different address.**', textVn: 'Kiểm tra từng chữ cái em đã gõ. **Sai một chữ cái là một địa chỉ khác.**' },
      { text: 'Press **Enter**.', textVn: 'Bấm **Enter**.' },
    ],
    reveal: {
      label: 'What if one letter is wrong?',
      labelVn: 'Nếu sai một chữ cái thì sao?',
      prompt: 'You meant to type www.schoolsite.org, but you typed www.schoolsight.org.',
      promptVn: 'Em định gõ www.schoolsite.org, nhưng lại gõ www.schoolsight.org.',
      answer: 'Either the browser says it **cannot find** the site, or — worse — you land on a **completely different** website. Addresses are **exact**: the browser does not guess what you meant, and some people buy the misspelled addresses of popular websites on purpose.',
      answerVn: 'Hoặc trình duyệt báo **không tìm thấy** trang, hoặc — tệ hơn — em đến một website **hoàn toàn khác**. Địa chỉ web là **chính xác tuyệt đối**: trình duyệt không đoán ý em, và có người cố tình mua những địa chỉ viết sai của các trang nổi tiếng.',
    },
  },

  // 11 ─ DEMO — type it, Enter, then a link ─────────────────────────────────
  {
    // The Try It browser in demo mode: same engine, same fake web, same window
    // the student is about to be handed (docs/digital-skills-course.md §5.1).
    layout: 'split',
    icon: 'Eye',
    accent: SKY_D,
    ratio: 62,
    eyebrow: 'Watch it happen',
    eyebrowVn: 'Xem nó diễn ra',
    title: 'Watch: Going to an Address',
    titleVn: 'Xem: Vào một địa chỉ',
    content: 'The school website is open. Watch the **address bar**: click, type **www.citylibrary.org**, press **Enter**, and the City Library opens. Then a **link** takes it one page further, and the address bar changes again.',
    contentVn: 'Website của trường đang mở. Hãy nhìn **thanh địa chỉ**: bấm, gõ **www.citylibrary.org**, bấm **Enter**, và Thư viện Thành phố mở ra. Rồi một **liên kết** đưa nó sang trang tiếp theo, và thanh địa chỉ lại thay đổi.',
    notes: [
      {
        tone: 'plant',
        text: 'The address bar always shows **where you are**. When you are not sure where a link took you, read it.',
        textVn: 'Thanh địa chỉ luôn cho biết **em đang ở đâu**. Khi không chắc một liên kết đưa em đi đâu, hãy đọc nó.',
      },
    ],
    widget: {
      type: 'AppSim',
      params: {
        skin: 'browser',
        initial: { tabs: [SCHOOL] },
        script: [
          { type: 'typeAddress', text: CITY, say: 'Click once in the address bar and type the new address. It replaces the old one.', sayVn: 'Bấm một lần vào thanh địa chỉ và gõ địa chỉ mới. Nó thay thế địa chỉ cũ.' },
          { type: 'go', say: 'Enter. The City Library opens, and the address bar now shows where you are.', sayVn: 'Bấm Enter. Thư viện Thành phố mở ra, và thanh địa chỉ giờ cho biết em đang ở đâu.' },
          { type: 'clickLink', to: CITY_KIDS, say: 'Click the Kids’ Books link, and the address changes again.', sayVn: 'Bấm liên kết Kids’ Books, và địa chỉ lại thay đổi.' },
        ],
      },
    },
  },

  // 12 ─ Reading an address (LB_ADDRESS) + CHECK ───────────────────────────
  {
    layout: 'split',
    icon: 'Languages',
    accent: SKY,
    ratio: 50,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Reading an Address',
    titleVn: 'Đọc một địa chỉ',
    inlineSvg: DIAGRAMS.LB_ADDRESS,
    content: 'A web address has **parts**, like the address on a letter.\n\n**www.** is the start. **schoolsite** is the website’s **name**. **.org** is the **ending** — many websites in Vietnam end in **.vn**. After a **/** comes one **page** on that website.\n\nChange **one** part and it is a different address.',
    contentVn: 'Một địa chỉ web có nhiều **phần**, giống địa chỉ trên một lá thư.\n\n**www.** là phần mở đầu. **schoolsite** là **tên** của website. **.org** là **phần đuôi** — nhiều website ở Việt Nam có đuôi **.vn**. Sau dấu **/** là một **trang** trên website đó.\n\nĐổi **một** phần thôi là đã thành một địa chỉ khác.',
    notes: [
      {
        tone: 'write',
        text: '**Web address:** the exact name of a place on the web, like www.schoolsite.org.',
        textVn: '**Địa chỉ web:** tên chính xác của một nơi trên mạng, ví dụ www.schoolsite.org.',
      },
    ],
    check: {
      id: 'chk_real_address',
      q: 'Your teacher gives you **www.schoolsite.org**. Which one will take you to the school website?',
      qVn: 'Cô giáo cho em địa chỉ **www.schoolsite.org**. Địa chỉ nào sẽ đưa em tới website của trường?',
      options: [
        { val: 'A', text: 'www.school-site.org', textVn: 'www.school-site.org' },
        { val: 'B', text: 'www.schoolsite.com', textVn: 'www.schoolsite.com' },
        { val: 'C', text: 'www.schoolsight.org', textVn: 'www.schoolsight.org' },
        { val: 'D', text: 'www.schoolsite.org', textVn: 'www.schoolsite.org' },
      ],
      correct: 'D',
      expEn: 'Only **D** matches letter for letter. **A** adds a hyphen, **B** has a different **ending** (.com, not .org), and **C** sounds the same but is spelled differently. Each of those is a different address: a different website, or none at all.',
      expVn: 'Chỉ **D** khớp từng chữ cái. **A** thêm dấu gạch ngang, **B** có **phần đuôi** khác (.com, không phải .org), còn **C** đọc giống nhưng viết khác. Mỗi cái đó là một địa chỉ khác: một website khác, hoặc chẳng có trang nào cả.',
    },
  },

  // 13 ─ SORT — address, or words? ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: AMBER,
    icon: 'Columns3',
    eyebrow: 'Sort it',
    eyebrowVn: 'Phân loại',
    title: 'Address, or Words?',
    titleVn: 'Địa chỉ, hay các từ?',
    label: 'Sort',
    labelVn: 'Phân loại',
    labelIcon: 'Columns3',
    text: 'An **address** is somewhere to **go**.',
    textVn: 'Một **địa chỉ** là nơi để **đến**.',
    sub: 'No spaces; dots and an ending: **www.kidsmaths.org**. **Words** are something to **find**, like **times tables games** — spaces, and no ending.',
    subVn: 'Không có dấu cách; có dấu chấm và phần đuôi: **www.kidsmaths.org**. **Các từ** là thứ để **tìm**, như **times tables games** — có dấu cách, không có phần đuôi.',
    activity: {
      id: 'act_addr_or_words',
      type: 'sort',
      prompt: 'Sort each one: is it an address, or words to search for?',
      promptVn: 'Phân loại từng cái: đó là một địa chỉ, hay các từ để tìm kiếm?',
      bins: [
        { id: 'address', name: 'An address: a place to go', nameVn: 'Một địa chỉ: nơi để đến' },
        { id: 'words', name: 'Words: something to find', nameVn: 'Các từ: thứ để tìm' },
      ],
      cards: [
        { id: 'weather', name: 'www.weathernow.org', nameVn: 'www.weathernow.org', bin: 'address' },
        { id: 'sheet', name: 'maths homework sheet', nameVn: 'maths homework sheet (phiếu bài tập toán)', bin: 'words' },
        { id: 'kids', name: 'www.citylibrary.org/kids', nameVn: 'www.citylibrary.org/kids', bin: 'address' },
        { id: 'schoolsite', name: 'school site', nameVn: 'school site (trang web trường)', bin: 'words' },
        { id: 'nowww', name: 'kidsmaths.org', nameVn: 'kidsmaths.org', bin: 'address' },
        { id: 'times', name: 'City Library opening times', nameVn: 'City Library opening times (giờ mở cửa thư viện)', bin: 'words' },
      ],
      explain: 'Addresses have **no spaces**, and a **dot** before an ending like **.org**. **kidsmaths.org** is still an address without the www. — the browser adds it. **school site** has a space, so it is words, even though it sounds like an address. An address goes in the **address bar**; words about **this** website go in its own **search box**.',
      explainVn: 'Địa chỉ **không có dấu cách**, và có **dấu chấm** trước phần đuôi như **.org**. **kidsmaths.org** vẫn là địa chỉ dù thiếu www. — trình duyệt tự thêm vào. **school site** có dấu cách, nên đó là các từ, dù nghe giống một địa chỉ. Địa chỉ thì gõ vào **thanh địa chỉ**; các từ về **chính** website này thì gõ vào **ô tìm kiếm** riêng của nó.',
    },
  },

  // 14 ─ HOTSPOT — the link on a page ───────────────────────────────────────
  {
    layout: 'statement',
    accent: BLUE,
    icon: 'Route',
    eyebrow: 'Find it',
    eyebrowVn: 'Tìm nó',
    title: 'Links',
    titleVn: 'Liên kết',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'A **link** takes you to **another page**.',
    textVn: '**Liên kết** đưa em sang **một trang khác**.',
    sub: 'Links are usually **blue** and **underlined**, and the pointer turns into a **hand** over one. This page has **one** link. Tap it.',
    subVn: 'Liên kết thường có **màu xanh** và **gạch chân**, và con trỏ biến thành **bàn tay** khi đặt lên nó. Trang này có **một** liên kết. Hãy chạm vào nó.',
    activity: {
      id: 'act_link',
      type: 'hotspot',
      prompt: 'Tap the link: the words that would take you to another page.',
      promptVn: 'Chạm vào liên kết: phần chữ sẽ đưa em sang một trang khác.',
      svg: DIAGRAMS.PAGE_WITH_LINK,
      viewBox: '0 0 800 440',
      targets: [
        ...along('link', [376, 336, 406, 430], 342, 20, 'the link', 'liên kết'),
        { id: 'bold', x: 365, y: 207, r: 22, name: 'bold words: thick, but not a link', nameVn: 'chữ đậm: nét dày, nhưng không phải liên kết' },
        ...along('plain', [370, 450, 520], 312, 14, 'plain words: black, and not underlined', 'chữ thường: màu đen, không gạch chân'),
        ...along('plain', [380, 470], 245, 18, 'plain words: black, and not underlined', 'chữ thường: màu đen, không gạch chân'),
        ...along('plain', [380, 480], 273, 18, 'plain words: black, and not underlined', 'chữ thường: màu đen, không gạch chân'),
        { id: 'heading', x: 400, y: 152, r: 40, name: 'the page’s heading: a title, not a link', nameVn: 'tiêu đề của trang: một cái tên, không phải liên kết' },
        { id: 'picture', x: 170, y: 275, r: 80, name: 'a picture: this one does not go anywhere', nameVn: 'một tấm hình: tấm này không dẫn đi đâu cả' },
        { id: 'address', x: 436, y: 82, r: 40, name: 'the address bar: it shows where you ARE', nameVn: 'thanh địa chỉ: nó cho biết em ĐANG ở đâu' },
      ],
      correct: 'link',
      explain: '**Library page**, blue and underlined, is the link: it goes to **www.schoolsite.org/library**. The heading is big but it is only a title, bold words are only bold, and this picture does not go anywhere. After you click a link, the **address bar** changes: read it to see where you went.',
      explainVn: '**Library page**, màu xanh và có gạch chân, chính là liên kết: nó dẫn tới **www.schoolsite.org/library**. Tiêu đề thì to nhưng chỉ là tên trang, chữ đậm chỉ là chữ đậm, và tấm hình này không dẫn đi đâu cả. Sau khi em bấm một liên kết, **thanh địa chỉ** thay đổi: hãy đọc nó để biết em đã đi đâu.',
    },
  },

  // 15 ─ Tabs (split) + CHECK ───────────────────────────────────────────────
  {
    layout: 'split',
    icon: 'Layers',
    accent: PURPLE,
    ratio: 50,
    title: 'Tabs: two pages at once',
    titleVn: 'Thẻ: hai trang cùng lúc',
    inlineSvg: DIAGRAMS.TAB_STRIP,
    content: 'A **tab** is one page inside your browser window. The **+** at the end of the row opens another one (or press **Ctrl+T**), so you can keep this page AND look at something else.',
    contentVn: 'Một **thẻ** là một trang bên trong cửa sổ trình duyệt. Dấu **+** ở cuối hàng mở thêm một thẻ nữa (hoặc bấm **Ctrl+T**), để em vừa giữ trang này vừa xem thứ khác.',
    notes: [
      {
        tone: 'write',
        text: '**Tab:** one page in the row along the top. Click a tab to swap to it; click its **X** (or press **Ctrl+W**) to close just that page.',
        textVn: '**Thẻ:** một trang trong hàng chạy dọc phía trên. Bấm vào thẻ để chuyển sang; bấm **X** trên thẻ (hoặc bấm **Ctrl+W**) để chỉ đóng riêng trang đó.',
      },
      {
        tone: 'info',
        text: 'Closing the **last** tab closes the **whole browser**. The X in the far corner closes every tab at once.',
        textVn: 'Đóng thẻ **cuối cùng** sẽ đóng **cả trình duyệt**. Dấu X ở góc xa nhất đóng mọi thẻ cùng lúc.',
      },
    ],
    check: {
      id: 'chk_tabs',
      q: 'You are reading a page and want to look something else up without losing it. What is the best thing to do?',
      qVn: 'Em đang đọc một trang và muốn tra cứu thứ khác mà không mất trang này. Cách tốt nhất là gì?',
      options: [
        { val: 'A', text: 'Open a new tab, and leave this page in its own tab.', textVn: 'Mở một thẻ mới, và để trang này ở thẻ riêng của nó.' },
        { val: 'B', text: 'Type the new address over the top of this one.', textVn: 'Gõ đè địa chỉ mới lên địa chỉ hiện tại.' },
        { val: 'C', text: 'Close the browser and start it again.', textVn: 'Đóng trình duyệt rồi mở lại.' },
        { val: 'D', text: 'Bookmark this page, then type the new address over it.', textVn: 'Đánh dấu trang này, rồi gõ đè địa chỉ mới lên.' },
      ],
      correct: 'A',
      expEn: 'That is exactly what tabs are for. Typing over the address (B) takes this same tab somewhere else — Back would bring the page back, but not your place on it. Closing the browser (C) loses the page altogether. A bookmark (D) is for coming back **tomorrow**, not for two minutes from now.',
      expVn: 'Đó chính là công dụng của thẻ. Gõ đè lên địa chỉ (B) đưa chính thẻ này đi nơi khác — nút Quay lại sẽ mang trang về, nhưng không giữ chỗ em đang đọc. Đóng trình duyệt (C) làm mất hẳn trang. Dấu trang (D) là để quay lại vào **ngày mai**, không phải sau hai phút.',
    },
  },

  // 16 ─ DEMO — a second tab ────────────────────────────────────────────────
  {
    layout: 'split',
    icon: 'Eye',
    accent: SKY_D,
    ratio: 62,
    eyebrow: 'Watch it happen',
    eyebrowVn: 'Xem nó diễn ra',
    title: 'Watch: A Second Tab',
    titleVn: 'Xem: Thẻ thứ hai',
    content: 'Your **homework** page is open. Watch: the **+** opens a new, empty tab, the library goes into **that** tab, and the homework waits in its own tab, exactly where you left it.',
    contentVn: 'Trang **bài tập về nhà** đang mở. Hãy xem: dấu **+** mở một thẻ mới, trống, thư viện được mở trong **thẻ đó**, còn bài tập vẫn chờ ở thẻ riêng của nó, đúng chỗ em để lại.',
    notes: [
      {
        tone: 'plant',
        text: 'Keys: **Ctrl+T** opens a new tab and **Ctrl+W** closes the one you are on. On an Apple computer, use **Cmd** instead of Ctrl.',
        textVn: 'Phím tắt: **Ctrl+T** mở thẻ mới và **Ctrl+W** đóng thẻ đang xem. Trên máy Apple, dùng **Cmd** thay cho Ctrl.',
      },
    ],
    widget: {
      type: 'AppSim',
      params: {
        skin: 'browser',
        initial: { tabs: [HOMEWORK] },
        script: [
          { type: 'newTab', say: 'The + opens a new, empty tab. The homework stays in the first one.', sayVn: 'Dấu + mở một thẻ mới, trống. Bài tập vẫn nằm ở thẻ đầu tiên.' },
          { type: 'typeAddress', text: CITY, say: 'In the new tab, type the address.', sayVn: 'Trong thẻ mới, gõ địa chỉ.' },
          { type: 'go', say: 'Enter: the library opens in the second tab.', sayVn: 'Bấm Enter: thư viện mở ra ở thẻ thứ hai.' },
          { type: 'switchTab', index: 0, say: 'Click the first tab: the homework is still there, exactly as you left it.', sayVn: 'Bấm vào thẻ đầu tiên: bài tập vẫn còn đó, y như lúc em để lại.' },
          { type: 'closeTab', index: 1, say: 'The X on the library tab closes just that page.', sayVn: 'Dấu X trên thẻ thư viện chỉ đóng riêng trang đó.' },
        ],
      },
    },
  },

  // 17 ─ ORDER — the five steps of a second tab ─────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ArrowDownUp',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'In the Right Order',
    titleVn: 'Theo đúng thứ tự',
    label: 'Put in order',
    labelVn: 'Sắp xếp',
    labelIcon: 'ArrowDownUp',
    text: 'Keep your homework, **and** open the library.',
    textVn: 'Giữ bài tập về nhà, **và** mở thêm thư viện.',
    sub: 'You are reading your **homework** and need the City Library website as well. Put the five steps in order.',
    subVn: 'Em đang đọc **bài tập về nhà** và cần thêm website Thư viện Thành phố. Sắp xếp năm bước theo đúng thứ tự.',
    activity: {
      id: 'act_tab_steps',
      type: 'order',
      prompt: 'Put the steps in order, first to last.',
      promptVn: 'Sắp xếp các bước, từ đầu đến cuối.',
      steps: [
        { id: 'plus', name: 'Click the + at the end of the tabs', nameVn: 'Bấm dấu + ở cuối hàng thẻ' },
        { id: 'type', name: 'Type www.citylibrary.org in the new tab’s address bar', nameVn: 'Gõ www.citylibrary.org vào thanh địa chỉ của thẻ mới' },
        { id: 'check', name: 'Check the spelling', nameVn: 'Kiểm tra chính tả' },
        { id: 'enter', name: 'Press Enter', nameVn: 'Bấm Enter' },
        { id: 'back', name: 'Click the first tab to go back to your homework', nameVn: 'Bấm vào thẻ đầu tiên để quay lại bài tập' },
      ],
      explain: 'The **+** comes first: type before it and you replace your homework page. Check the spelling **before** Enter, not after. And your homework was never closed: its tab is waiting for you.',
      explainVn: 'Dấu **+** phải làm đầu tiên: gõ trước khi bấm nó là em thay mất trang bài tập. Kiểm tra chính tả **trước** khi bấm Enter, không phải sau. Và bài tập chưa bao giờ bị đóng: thẻ của nó vẫn đang chờ em.',
    },
  },

  // 18 ─ Back, forward, reload (steps) + PREDICT ────────────────────────────
  {
    layout: 'steps',
    icon: 'Repeat',
    accent: GREEN,
    title: 'Back, forward, reload',
    titleVn: 'Quay lại, đi tới, tải lại',
    content: 'Three arrows at the top left, and each one does something different. Nothing here can break anything.',
    contentVn: 'Ba mũi tên ở góc trên bên trái, và mỗi cái làm một việc khác nhau. Không cái nào ở đây làm hỏng được gì.',
    steps: [
      { text: '**Back** (◀, or **Alt+←**) returns you to the page you were on before. Press it as many times as you like.', textVn: '**Quay lại** (◀, hoặc **Alt+←**) đưa em về trang em vừa xem trước đó. Bấm bao nhiêu lần cũng được.' },
      { text: '**Forward** (▶, or **Alt+→**) only works after you have gone back. It returns you to where you were.', textVn: '**Đi tới** (▶, hoặc **Alt+→**) chỉ dùng được sau khi em đã quay lại. Nó đưa em trở về chỗ cũ.' },
      { text: '**Reload** (↻, or **F5**) fetches the same page again — for when it looks broken or half-loaded.', textVn: '**Tải lại** (↻, hoặc **F5**) lấy lại chính trang đó — dùng khi trang trông bị lỗi hoặc mới hiện một nửa.' },
      { text: 'Lost? **Back is almost always the answer.** You can nearly always undo where you have gone.', textVn: 'Bị lạc? **Quay lại gần như luôn là câu trả lời.** Em hầu như luôn có thể hoàn tác nơi mình vừa đến.' },
    ],
    activity: {
      id: 'act_back_forward',
      type: 'predict',
      prompt: 'You visited Riverside School, then School Library, then City Library. Now you press Back twice, then Forward once. Where are you?',
      promptVn: 'Em đã vào Riverside School, rồi School Library, rồi City Library. Bây giờ em bấm Quay lại hai lần, rồi Đi tới một lần. Em đang ở đâu?',
      options: [
        { val: 'school', name: 'Riverside School, the first page', nameVn: 'Riverside School, trang đầu tiên' },
        { val: 'lib', name: 'School Library, the second page', nameVn: 'School Library, trang thứ hai' },
        { val: 'city', name: 'City Library, the third page', nameVn: 'City Library, trang thứ ba' },
        { val: 'new', name: 'A new, empty tab', nameVn: 'Một thẻ mới, trống' },
      ],
      correct: 'lib',
      explain: 'Back twice walks you from City Library to School Library, then on to **Riverside School**. Forward once walks one step the other way, to **School Library**. Back and Forward walk along the trail of pages you visited, like steps along a path.',
      explainVn: 'Quay lại hai lần đưa em từ City Library về School Library, rồi về tiếp **Riverside School**. Đi tới một lần đưa em bước một bước theo chiều ngược lại, tới **School Library**. Quay lại và Đi tới đi dọc theo dấu vết các trang em đã xem, như những bước chân trên một con đường.',
    },
  },

  // 19 ─ SORT — which button fixes it? ──────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Columns3',
    eyebrow: 'Sort it',
    eyebrowVn: 'Phân loại',
    title: 'Which Button?',
    titleVn: 'Nút nào?',
    label: 'Sort',
    labelVn: 'Phân loại',
    labelIcon: 'Columns3',
    text: 'Back, Forward and Reload each fix a **different** problem.',
    textVn: 'Quay lại, Đi tới và Tải lại mỗi nút sửa một vấn đề **khác nhau**.',
    sub: 'Sort each problem to the button that fixes it.',
    subVn: 'Xếp mỗi vấn đề vào đúng nút sửa được nó.',
    activity: {
      id: 'act_which_button',
      type: 'sort',
      prompt: 'Which button fixes each problem?',
      promptVn: 'Nút nào sửa được từng vấn đề?',
      bins: [
        { id: 'back', name: 'Back ◀', nameVn: 'Quay lại ◀' },
        { id: 'fwd', name: 'Forward ▶', nameVn: 'Đi tới ▶' },
        { id: 'reload', name: 'Reload ↻', nameVn: 'Tải lại ↻' },
      ],
      cards: [
        { id: 'wronglink', name: 'Clicked a link by mistake', nameVn: 'Lỡ bấm nhầm liên kết', bin: 'back' },
        { id: 'nopicture', name: 'A picture did not appear', nameVn: 'Một tấm hình không hiện ra', bin: 'reload' },
        { id: 'toofar', name: 'Pressed Back once too often', nameVn: 'Bấm Quay lại thừa một lần', bin: 'fwd' },
        { id: 'halfway', name: 'The page stopped halfway', nameVn: 'Trang dừng tải giữa chừng', bin: 'reload' },
        { id: 'before', name: 'Want the page from a minute ago', nameVn: 'Muốn về trang vừa xem lúc nãy', bin: 'back' },
        { id: 'return', name: 'Went back, now want to return', nameVn: 'Đã quay lại, giờ muốn trở về', bin: 'fwd' },
      ],
      explain: '**Back** undoes where you went: a wrong link, the page before. **Forward** undoes a Back. **Reload** fetches the same page again when part of it is missing. None of them can break anything, so when you are not sure, try one.',
      explainVn: '**Quay lại** hoàn tác nơi em vừa đến: một liên kết nhầm, trang trước đó. **Đi tới** hoàn tác một lần Quay lại. **Tải lại** lấy lại chính trang đó khi một phần của nó bị thiếu. Không nút nào làm hỏng được gì, nên khi không chắc, cứ thử một nút.',
    },
  },

  // 20 ─ Bookmark (statement) + CHECK ───────────────────────────────────────
  {
    layout: 'statement',
    icon: 'Star',
    accent: AMBER,
    label: 'Bookmark',
    labelVn: 'Dấu trang',
    labelIcon: 'Star',
    title: 'Save the page, not the picture of it',
    titleVn: 'Lưu trang web, không phải ảnh chụp nó',
    text: 'The **star** saves a way back.',
    textVn: '**Ngôi sao** lưu lại đường quay về.',
    sub: 'Click it (or press **Ctrl+D**) and the page goes on a list, so you can come back tomorrow without the address. A bookmark is a **way back**, not a copy.',
    subVn: 'Bấm vào nó (hoặc bấm **Ctrl+D**) là trang được đưa vào danh sách, để mai em quay lại mà không cần nhớ địa chỉ. Dấu trang là **đường quay lại**, không phải bản sao.',
    notes: [
      {
        tone: 'write',
        text: '**Bookmark:** a saved link to a page, kept in the browser so you can find the page again.',
        textVn: '**Dấu trang:** một liên kết đã lưu tới một trang, được trình duyệt giữ lại để em tìm lại trang đó.',
      },
    ],
    check: {
      id: 'chk_bookmark',
      q: 'You bookmark the City Library page today. Next month the library changes its opening times. You click your bookmark. What do you see?',
      qVn: 'Hôm nay em đánh dấu trang Thư viện Thành phố. Tháng sau thư viện đổi giờ mở cửa. Em bấm vào dấu trang. Em thấy gì?',
      options: [
        { val: 'A', text: 'The old times: a bookmark keeps a copy of the page.', textVn: 'Giờ cũ: dấu trang giữ một bản sao của trang.' },
        { val: 'B', text: 'Nothing: bookmarks only last for one day.', textVn: 'Không có gì: dấu trang chỉ tồn tại một ngày.' },
        { val: 'C', text: 'The page as it is now, with the new times.', textVn: 'Trang như hiện tại, với giờ mở cửa mới.' },
        { val: 'D', text: 'A picture of the page from the day you saved it.', textVn: 'Một tấm ảnh chụp trang từ ngày em lưu nó.' },
      ],
      correct: 'C',
      expEn: 'A bookmark is a **way back**, not a copy: click it and the browser fetches the page again, so you see the **new** times. A and D describe a copy or a picture, which a bookmark never is, and a bookmark stays until **you** remove it (B).',
      expVn: 'Dấu trang là **đường quay lại**, không phải bản sao: bấm vào là trình duyệt lấy lại trang đó, nên em thấy giờ **mới**. A và D mô tả một bản sao hay một tấm ảnh, thứ mà dấu trang không bao giờ là, và dấu trang còn đó cho đến khi **chính em** xoá nó (B).',
    },
  },

  // 21 ─ Downloading (showcase) ──────────────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'Boxes',
    accent: BLUE,
    title: 'You downloaded a file. Where did it go?',
    titleVn: 'Em đã tải một tệp về. Nó đi đâu rồi?',
    inlineSvg: DIAGRAMS.AFTER_DOWNLOAD,
    caption: '**Download** copies a file from the website onto your computer. The bar along the bottom is the browser **telling you where it went**: **Show in folder** opens the place it was saved — usually a folder called **Downloads**.',
    captionVn: '**Tải xuống** sao chép một tệp từ website về máy của em. Thanh chạy dọc phía dưới chính là lúc trình duyệt **nói cho em biết tệp đi đâu**: **Show in folder** (Hiện trong thư mục) mở đúng nơi tệp được lưu — thường là một thư mục tên **Downloads** (Tải xuống).',
  },

  // 22 ─ HOTSPOT — the button that shows where it went ──────────────────────
  {
    layout: 'statement',
    accent: BLUE,
    icon: 'Target',
    eyebrow: 'Find it',
    eyebrowVn: 'Tìm nó',
    title: 'Read the Bar',
    titleVn: 'Đọc thanh tải xuống',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'The bar at the bottom **tells you**.',
    textVn: 'Thanh phía dưới **cho em biết**.',
    sub: 'You clicked **Download PDF**; the bar says what happened to the file. Tap the button that opens the **folder** it was saved in.',
    subVn: 'Em đã bấm **Download PDF**; thanh này cho biết chuyện gì đã xảy ra với tệp. Chạm vào nút mở **thư mục** nơi tệp được lưu.',
    activity: {
      id: 'act_show_folder',
      type: 'hotspot',
      prompt: 'Tap the button that shows you where the file went.',
      promptVn: 'Chạm vào nút cho em thấy tệp đã đi đâu.',
      svg: DIAGRAMS.AFTER_DOWNLOAD,
      viewBox: '0 0 800 540',
      targets: [
        ...along('show', [475, 405, 440, 510, 545], 488, 26, 'Show in folder', 'Show in folder (Hiện trong thư mục)'),
        ...along('file', [80, 150, 220, 290], 488, 30, 'the file itself: tapping it OPENS the file, but does not show where it is', 'chính tệp đó: chạm vào là MỞ tệp, nhưng không cho thấy nó nằm ở đâu'),
        ...along('all', [620, 675, 730], 488, 28, 'All downloads: a list of everything you have ever downloaded', 'All downloads: danh sách mọi thứ em từng tải về'),
        { id: 'button', x: 400, y: 354, r: 40, name: 'the page’s Download button: it would download the file again', nameVn: 'nút Tải xuống của trang: nó sẽ tải tệp thêm lần nữa' },
        { id: 'page', x: 400, y: 245, r: 70, name: 'the page you downloaded from: the file is not in there', nameVn: 'trang em đã tải tệp từ đó: tệp không nằm trong đó' },
        { id: 'address', x: 436, y: 82, r: 40, name: 'the address bar: it shows the website, not your file', nameVn: 'thanh địa chỉ: nó cho biết website, không phải tệp của em' },
      ],
      correct: 'show',
      explain: '**Show in folder** opens the folder the file went into — usually **Downloads** — with the file picked out. Tapping the file’s **name** opens the file itself; **All downloads** is a list of everything you have ever downloaded (**Ctrl+J** opens it too).',
      explainVn: '**Show in folder** mở thư mục mà tệp đã được lưu vào — thường là **Downloads** — và chọn sẵn tệp đó. Chạm vào **tên** tệp sẽ mở chính tệp; **All downloads** là danh sách mọi thứ em từng tải về (phím **Ctrl+J** cũng mở được nó).',
    },
  },

  // 23 ─ DEMO — download, then Show in folder ───────────────────────────────
  {
    layout: 'split',
    icon: 'Eye',
    accent: SKY_D,
    ratio: 62,
    eyebrow: 'Watch it happen',
    eyebrowVn: 'Xem nó diễn ra',
    title: 'Watch: Download It, Then Find It',
    titleVn: 'Xem: Tải về, rồi tìm nó',
    content: 'The whole job, once: a **link** to the School Library page, the **Download** button, the **bar** at the bottom — and **Show in folder**, which opens **Downloads** with the file inside.',
    contentVn: 'Toàn bộ công việc, một lần: một **liên kết** tới trang School Library, nút **Tải xuống**, **thanh** ở phía dưới — và **Show in folder**, mở thư mục **Downloads** có tệp bên trong.',
    notes: [
      {
        tone: 'plant',
        text: 'The file is now on **this computer**. It stays in **Downloads** after the browser is closed.',
        textVn: 'Tệp giờ đã nằm trên **máy này**. Nó vẫn ở trong **Downloads** sau khi trình duyệt đóng lại.',
      },
    ],
    widget: {
      type: 'AppSim',
      params: {
        skin: 'browser',
        initial: { tabs: [SCHOOL] },
        script: [
          { type: 'clickLink', to: LIBRARY, say: 'The Library link opens the School Library page.', sayVn: 'Liên kết Library mở trang School Library.' },
          { type: 'download', file: READING_LIST, say: 'Download: the file is copied onto this computer, and a bar appears at the bottom.', sayVn: 'Tải xuống: tệp được sao chép về máy này, và một thanh hiện ra ở phía dưới.' },
          { type: 'showInFolder', say: 'Show in folder: the Downloads folder opens, with reading-list.pdf inside.', sayVn: 'Show in folder: thư mục Downloads mở ra, có reading-list.pdf bên trong.' },
        ],
      },
    },
  },

  // 24 ─ Is it gone? (DOWNLOADS_FOLDER) + CHECK ─────────────────────────────
  {
    layout: 'split',
    icon: 'Boxes',
    accent: BLUE,
    ratio: 50,
    title: 'Close the Browser. Is It Gone?',
    titleVn: 'Đóng trình duyệt. Tệp có mất không?',
    inlineSvg: DIAGRAMS.DOWNLOADS_FOLDER,
    content: 'This is the **Downloads** folder. The reading list you just downloaded is there — and so are files from **yesterday** and **three days ago**, long after the browser that fetched them was closed.',
    contentVn: 'Đây là thư mục **Downloads**. Danh sách sách đọc em vừa tải về nằm ở đó — cùng với các tệp từ **hôm qua** và **ba ngày trước**, dù trình duyệt đã tải chúng về đóng lại từ lâu.',
    notes: [
      {
        tone: 'write',
        text: '**Downloads folder:** where the browser puts the files you download, unless you choose somewhere else.',
        textVn: '**Thư mục Downloads (Tải xuống):** nơi trình duyệt cất các tệp em tải về, trừ khi em chọn nơi khác.',
      },
    ],
    check: {
      id: 'chk_downloads',
      q: 'You download a file and close the browser without looking at the bar. Is the file gone?',
      qVn: 'Em tải một tệp rồi đóng trình duyệt mà không nhìn thanh tải xuống. Tệp có mất không?',
      options: [
        { val: 'A', text: 'Yes: the file was inside the browser, so it closed with it.', textVn: 'Có: tệp nằm trong trình duyệt, nên đóng trình duyệt là mất.' },
        { val: 'B', text: 'Only if you downloaded it twice.', textVn: 'Chỉ mất nếu em tải nó hai lần.' },
        { val: 'C', text: 'Yes, unless you bookmarked the page first.', textVn: 'Có, trừ khi em đã đánh dấu trang đó trước.' },
        { val: 'D', text: 'No: it is saved in the Downloads folder, like any other file.', textVn: 'Không: nó đã được lưu trong thư mục Downloads, giống mọi tệp khác.' },
      ],
      correct: 'D',
      expEn: 'Downloading makes a real file on your computer. It is not stored inside the browser (A), and a bookmark has nothing to do with it (C): the file sits in a folder, with a name and a date, and you can open it without the browser at all.',
      expVn: 'Tải xuống tạo ra một tệp thật trên máy của em. Nó không được cất bên trong trình duyệt (A), và dấu trang chẳng liên quan gì (C): tệp nằm trong một thư mục, có tên và có ngày, và em mở được nó mà không cần trình duyệt.',
    },
  },

  // 25 ─ Checklist + CHECK (the exit question) ─────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: SKY,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: 'Next: the **Vocab**, then **Try It** — seven jobs on a browser that works like a real one.\n\nLast question: the whole lesson in one job.',
    contentVn: 'Tiếp theo: **Từ vựng**, rồi **Làm thử** — bảy việc trên một trình duyệt hoạt động như thật.\n\nCâu hỏi cuối: cả bài học trong một việc.',
    items: [
      { text: 'Tell the **address bar** from a page’s **search box**, and type an address you were given into the right one.', textVn: 'Phân biệt **thanh địa chỉ** với **ô tìm kiếm** của một trang, và gõ địa chỉ em được cho vào đúng chỗ.' },
      { text: 'Follow a **link**, and open a page in a **second tab** without losing the first.', textVn: 'Bấm theo một **liên kết**, và mở một trang ở **thẻ thứ hai** mà không mất trang đầu.' },
      { text: 'Use **Back**, **Forward** and **Reload**, and **bookmark** a page.', textVn: 'Dùng **Quay lại**, **Đi tới** và **Tải lại**, và **đánh dấu** một trang.' },
      { text: 'Download a file, then find it with **Show in folder**.', textVn: 'Tải một tệp về, rồi tìm nó bằng **Show in folder**.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Your teacher says: “Keep the homework page open, go to **www.citylibrary.org/kids**, and download the summer reading list.” What do you do **first**?',
      qVn: 'Cô giáo nói: “Giữ trang bài tập mở, vào **www.citylibrary.org/kids**, và tải danh sách sách đọc mùa hè về.” Việc **đầu tiên** em làm là gì?',
      options: [
        { val: 'A', text: 'Type www.citylibrary.org/kids into the homework page’s search box.', textVn: 'Gõ www.citylibrary.org/kids vào ô tìm kiếm của trang bài tập.' },
        { val: 'B', text: 'Click the + to open a new tab.', textVn: 'Bấm dấu + để mở một thẻ mới.' },
        { val: 'C', text: 'Type www.citylibrary.org/kids over the homework page’s address.', textVn: 'Gõ đè www.citylibrary.org/kids lên địa chỉ của trang bài tập.' },
        { val: 'D', text: 'Click Show in folder.', textVn: 'Bấm Show in folder.' },
      ],
      correct: 'B',
      expEn: 'A **new tab** first, so the homework page stays open in its own tab. Then the address goes into the new tab’s **address bar**, not into a page’s search box (A), and you never type over the homework (C). **Show in folder** comes last, after the download (D).',
      expVn: 'Mở **thẻ mới** trước, để trang bài tập vẫn mở ở thẻ riêng của nó. Sau đó địa chỉ được gõ vào **thanh địa chỉ** của thẻ mới, không phải ô tìm kiếm của một trang (A), và em không bao giờ gõ đè lên trang bài tập (C). **Show in folder** là bước cuối, sau khi tải xong (D).',
    },
  },

  // 26 ─ On your own computer (unassessed, always last) ─────────────────────
  {
    layout: 'stack',
    columns: 2,
    icon: 'Sparkles',
    accent: GREEN,
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
        text: 'Open a **second tab** (the + or **Ctrl+T**), swap between the two, then close only the second one.',
        textVn: 'Mở **thẻ thứ hai** (dấu + hoặc **Ctrl+T**), chuyển qua lại giữa hai thẻ, rồi chỉ đóng riêng thẻ thứ hai.',
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
