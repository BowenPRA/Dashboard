// src/data/PRIMARY_TECH/T07/sim.js
// T7 Inside a Browser — "Try It" (SIM). Seven jobs on the `browser` skin, the
// small fake web of docs/primary-tech/UPGRADE-PLAN.md §3.1: www.schoolsite.org
// (with /library, /homework, /news), www.citylibrary.org (with /kids),
// www.weathernow.org and www.kidsmaths.org.
//
// `npm run validate` replays every `solution` and refuses a job that is
// unsolvable, already done, or has a step the engine ignores.
//
// EVERY GOAL IS A STATEMENT ABOUT THE BROWSER, never about a click, so every
// honest route passes: Back or typing the address, the + button or a link. And each
// goal is written so the wrong-but-plausible route FAILS, the way it fails in
// life:
//   · an address typed into the page's own search box never changes `url` —
//     it makes a "No results" page on the school site;
//   · a second page typed over the first leaves only one of them in `urls`;
//   · Back once, when the page is two back, leaves you on the wrong `url`;
//   · going Back to "fix" a broken page leaves the page (`url` changes);
//   · starring the page you are on, not the one you were sent to, bookmarks
//     the wrong address;
//   · All downloads is a list, not the folder: `shownInFolder` stays false;
//   · words for THIS site typed into the address bar go to the whole web
//     (`searches`), not to the school's own box (`siteSearches`).
//
// Each text field is typed in ONE action (UPGRADE-PLAN §3.1, "Typing is one
// move"): `{ type: 'typeAddress', text: 'www.citylibrary.org' }` then `go`.
// Hint regions are the skin's: address, back, forward, reload, star, newtab,
// tab:<i>, siteSearch, link:<to>, download:<file>, showInFolder, bookmarks, page.

export const sim = [
  {
    // The trap is on screen: the school's home page has its own search box,
    // and "Search" is right there. Typed into it, the address finds nothing
    // and `url` stays on the school site.
    id: 'go-to-the-address',
    skin: 'browser',
    brief: 'Your teacher wrote this on the board: www.citylibrary.org. Go to that website.',
    briefVn: 'Cô giáo viết lên bảng: www.citylibrary.org. Hãy vào trang web đó.',
    initial: { tabs: ['www.schoolsite.org'] },
    goal: [
      { path: 'url', equals: 'www.citylibrary.org' },
    ],
    solution: [
      { type: 'typeAddress', text: 'www.citylibrary.org' },
      { type: 'go' },
    ],
    parMoves: 2,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'address', say: 'An address goes in the address bar at the very top — not in the school page’s own search box.', sayVn: 'Địa chỉ phải gõ vào thanh địa chỉ ở trên cùng — không phải ô tìm kiếm riêng của trang trường.' },
      { after: 6, region: 'address', say: 'Click the address bar, type www.citylibrary.org, then press Enter.', sayVn: 'Bấm vào thanh địa chỉ, gõ www.citylibrary.org, rồi bấm Enter.' },
    ],
  },
  {
    // Typing the library over the homework reaches the library and loses the
    // homework: `urls` then holds only one of the two.
    id: 'keep-this-page-open-another',
    skin: 'browser',
    brief: 'You are reading your homework. Keep it open, and open www.citylibrary.org in a second tab.',
    briefVn: 'Em đang đọc bài tập về nhà. Hãy giữ nó mở, và mở www.citylibrary.org ở một thẻ thứ hai.',
    initial: { tabs: ['www.schoolsite.org/homework'] },
    goal: [
      { path: 'urls', contains: 'www.schoolsite.org/homework' },
      { path: 'urls', contains: 'www.citylibrary.org' },
    ],
    solution: [
      { type: 'newTab' },
      { type: 'typeAddress', text: 'www.citylibrary.org' },
      { type: 'go' },
    ],
    parMoves: 3,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'newtab', say: 'Keep the homework safe: open a new tab with the + first.', sayVn: 'Giữ bài tập an toàn: hãy mở một thẻ mới bằng dấu + trước.' },
      { after: 6, region: 'address', say: 'In the new tab, type the library’s address into the address bar and press Enter.', sayVn: 'Trong thẻ mới, gõ địa chỉ của thư viện vào thanh địa chỉ rồi bấm Enter.' },
    ],
  },
  {
    // The page they want is TWO back. One Back is not enough, and typing the
    // words "school library" sends them to the search engine, not the page.
    id: 'back-to-where-you-were',
    skin: 'browser',
    brief: 'You started on the School Library page, then went to the City Library, then to its Kids’ Books page. Go back to the School Library page.',
    briefVn: 'Em bắt đầu ở trang School Library, rồi sang City Library, rồi tới trang Kids’ Books của nó. Hãy quay lại trang School Library.',
    initial: {
      tabs: [{ history: ['www.schoolsite.org/library', 'www.citylibrary.org', 'www.citylibrary.org/kids'] }],
    },
    goal: [
      { path: 'url', equals: 'www.schoolsite.org/library' },
    ],
    solution: [
      { type: 'back' },
      { type: 'back' },
    ],
    parMoves: 2,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'back', say: 'The Back arrow walks back one page each time you press it. Press it as many times as you need.', sayVn: 'Mũi tên Quay lại lùi một trang mỗi lần em bấm. Bấm bao nhiêu lần tùy em cần.' },
    ],
  },
  {
    // Reload fixes it in place. Back "fixes" it by leaving: `url` changes, and
    // the job asked to stay on the page.
    id: 'fix-the-half-loaded-page',
    skin: 'browser',
    brief: 'The Weather Now page only half loaded — the picture is missing. Fix it, and stay on this page.',
    briefVn: 'Trang Weather Now mới tải được một nửa — tấm hình bị thiếu. Hãy sửa nó, và ở lại trang này.',
    initial: {
      tabs: [{ history: ['www.schoolsite.org', 'www.weathernow.org'] }],
      broken: true,
    },
    goal: [
      { path: 'broken', equals: false },
      { path: 'url', equals: 'www.weathernow.org' },
    ],
    solution: [
      { type: 'reload' },
    ],
    parMoves: 1,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'reload', say: 'Reload (the round arrow, or F5) fetches the same page again.', sayVn: 'Tải lại (mũi tên vòng tròn, hoặc F5) lấy lại chính trang đó.' },
    ],
  },
  {
    // The star bookmarks the page you are ON. Starring the school page before
    // going anywhere bookmarks the wrong address.
    id: 'bookmark-it',
    skin: 'browser',
    brief: 'You play the games on www.kidsmaths.org every week. Go there, and bookmark it so you never have to type the address again.',
    briefVn: 'Tuần nào em cũng chơi trò chơi trên www.kidsmaths.org. Hãy vào đó, và đánh dấu trang để không bao giờ phải gõ lại địa chỉ.',
    initial: { tabs: ['www.schoolsite.org'] },
    goal: [
      { path: 'bookmarks', contains: 'www.kidsmaths.org' },
    ],
    solution: [
      { type: 'typeAddress', text: 'www.kidsmaths.org' },
      { type: 'go' },
      { type: 'bookmark' },
    ],
    parMoves: 3,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'address', say: 'First go to www.kidsmaths.org: type it into the address bar and press Enter.', sayVn: 'Trước hết hãy vào www.kidsmaths.org: gõ nó vào thanh địa chỉ rồi bấm Enter.' },
      { after: 5, region: 'star', say: 'On the Kids Maths page, click the star.', sayVn: 'Khi đang ở trang Kids Maths, hãy bấm vào ngôi sao.' },
    ],
  },
  {
    // Two clauses: the file has to be downloaded AND shown in its folder. All
    // downloads is the browser's list, not the folder, so it does not count.
    id: 'download-and-find-it',
    skin: 'browser',
    brief: 'The reading list is on the School Library page. Download it — then open the folder it went into, so you know where it is.',
    briefVn: 'Danh sách sách đọc nằm ở trang School Library. Hãy tải nó về — rồi mở thư mục mà nó đã vào, để em biết nó ở đâu.',
    initial: { tabs: ['www.schoolsite.org'] },
    goal: [
      { path: 'downloads', contains: 'reading-list.pdf' },
      { path: 'shownInFolder', equals: true },
    ],
    solution: [
      { type: 'clickLink', to: 'www.schoolsite.org/library' },
      { type: 'download', file: 'reading-list.pdf' },
      { type: 'showInFolder' },
    ],
    parMoves: 3,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'link:www.schoolsite.org/library', say: 'The reading list is on the Library page. Click the Library link.', sayVn: 'Danh sách sách đọc ở trang Library. Hãy bấm liên kết Library.' },
      { after: 5, region: 'showInFolder', say: 'Read the bar at the bottom: Show in folder opens the folder the file went into.', sayVn: 'Hãy đọc thanh ở phía dưới: Show in folder mở thư mục mà tệp đã vào.' },
    ],
  },
  {
    // The one job where the page's OWN box is the right tool: words, about this
    // website. Typed into the address bar instead, "maths" goes to the whole
    // web (`searches`) and `siteSearches` stays empty.
    id: 'search-the-school-website',
    skin: 'browser',
    brief: 'Your maths homework sheet is somewhere on the school website, but not on this page. Use this website’s own search box to look for "maths", find the sheet, and download it.',
    briefVn: 'Phiếu bài tập toán của em nằm đâu đó trên website của trường, nhưng không ở trang này. Hãy dùng ô tìm kiếm riêng của website này để tìm "maths", tìm ra phiếu bài tập, và tải nó về.',
    initial: { tabs: ['www.schoolsite.org/library'] },
    goal: [
      { path: 'siteSearches', someMatches: '[Mm]ath|[Hh]omework|[Ss]heet' },
      { path: 'downloads', contains: 'maths-sheet.pdf' },
    ],
    solution: [
      { type: 'typeSiteSearch', text: 'maths' },
      { type: 'siteSearch' },
      { type: 'clickLink', to: 'www.schoolsite.org/homework' },
      { type: 'download', file: 'maths-sheet.pdf' },
    ],
    parMoves: 4,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'siteSearch', say: 'This time the words go in the page’s own search box: it looks through the school website.', sayVn: 'Lần này các từ phải gõ vào ô tìm kiếm riêng của trang: nó tìm trong website của trường.' },
      { after: 6, region: 'page', say: 'Click the result that goes to the Homework page, then download the sheet there.', sayVn: 'Bấm vào kết quả dẫn tới trang Homework, rồi tải phiếu bài tập ở đó.' },
    ],
  },
];
