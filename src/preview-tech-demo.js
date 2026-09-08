// src/preview-tech-demo.js
//
// A sample PRIMARY_TECH unit for the dev harness (preview-tech.html), and
// nothing else. It lives at src/ rather than src/data/PRIMARY_TECH/ on purpose:
// src/data/index.js discovers units by glob, so a sample parked there would show
// up on a student's Home page. Only index.html is a production build input, so
// this file ships nowhere.
//
// It exists because POINT_IT is built before the first real unit is authored
// (docs/primary-tech/BUILD-PLAN.md steps 1 and 2), and a task screen with no
// data cannot be checked. The harness prefers a real unit the moment one lands
// in src/data/PRIMARY_TECH/ and falls back to this.
//
// The picture is a GENERIC browser, not a copy of Chrome — authored per
// docs/svg-diagrams.md and docs/digital-skills-course.md §5.2. Invented pixels,
// real names: address bar, tab, bookmark, reload.

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const CARD = '#f8fafc';
const BLUE = '#3b82f6';

const BROWSER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="492" rx="14" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>

  <!-- tab strip -->
  <rect x="20" y="12" width="210" height="40" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="125" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Class Notes</text>
  <rect x="238" y="12" width="190" height="40" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <text x="333" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">School Library</text>
  <rect x="440" y="18" width="28" height="28" rx="6" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <text x="454" y="39" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text>

  <!-- toolbar -->
  <rect x="20" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <text x="38" y="89" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">&#8592;</text>
  <rect x="64" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <text x="82" y="89" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">&#8594;</text>
  <rect x="108" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <text x="126" y="89" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">&#8635;</text>
  <rect x="156" y="64" width="560" height="36" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="176" y="88" font-family="monospace" font-size="16" fill="${INK}">www.schoolsite.org/library</text>
  <rect x="724" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <text x="742" y="89" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">&#9734;</text>

  <!-- the page itself -->
  <rect x="20" y="112" width="760" height="372" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  <text x="400" y="172" font-family="sans-serif" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">School Library</text>
  <rect x="250" y="210" width="300" height="48" rx="10" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text x="272" y="241" font-family="sans-serif" font-size="16" fill="${MUTED}">Search this site</text>
  <text x="400" y="313" font-family="sans-serif" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle" text-decoration="underline">Year 6 reading list</text>
  <rect x="310" y="350" width="180" height="48" rx="10" fill="${BLUE}"/>
  <text x="400" y="381" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Download PDF</text>
</svg>`;

/** One POINT_IT item: the browser window, and five things to find on it. */
export const BROWSER_ANATOMY = {
  id: 'browser-anatomy',
  title: 'A browser window',
  titleVn: 'Một cửa sổ trình duyệt',
  svg: BROWSER_SVG,
  viewBox: '0 0 800 500',
  regions: [
    {
      id: 'addr', rect: [156, 64, 560, 36],
      label: 'address bar', labelVn: 'thanh địa chỉ',
      misfire: 'That is the address bar. It is part of the browser, at the very top, and it shows where you are.',
      misfireVn: 'Đó là thanh địa chỉ. Nó thuộc về trình duyệt, nằm trên cùng, và cho biết em đang ở trang nào.',
    },
    {
      id: 'search', rect: [250, 210, 300, 48],
      label: 'search box on the page', labelVn: 'ô tìm kiếm trên trang',
      // The whole reason this task exists (docs/digital-skills-course.md §4.2).
      misfire: 'That is the search box inside the page — it only searches this one website. The address bar is the long box at the very top.',
      misfireVn: 'Đó là ô tìm kiếm bên trong trang — nó chỉ tìm trong website này thôi. Thanh địa chỉ là ô dài trên cùng.',
    },
    { id: 'back', rect: [20, 64, 36, 36], label: 'back button', labelVn: 'nút quay lại' },
    {
      id: 'forward', rect: [64, 64, 36, 36],
      label: 'forward button', labelVn: 'nút đi tới',
      misfire: 'That arrow goes forward again. Back points the other way — to the left.',
      misfireVn: 'Mũi tên đó đi tới. Nút quay lại chỉ hướng ngược lại — sang bên trái.',
    },
    { id: 'reload', rect: [108, 64, 36, 36], label: 'reload button', labelVn: 'nút tải lại' },
    { id: 'bookmark', rect: [724, 64, 36, 36], label: 'bookmark star', labelVn: 'ngôi sao đánh dấu trang' },
    {
      id: 'newtab', rect: [440, 18, 28, 28],
      label: 'new tab button', labelVn: 'nút mở thẻ mới',
    },
    {
      id: 'tab2', rect: [238, 12, 190, 40],
      label: 'a tab that is already open', labelVn: 'một thẻ đang mở sẵn',
      misfire: 'That is a tab that is already open. The new tab button is the small + just after the last tab.',
      misfireVn: 'Đó là một thẻ đã mở sẵn. Nút mở thẻ mới là dấu + nhỏ ngay sau thẻ cuối cùng.',
    },
    { id: 'link', rect: [295, 292, 210, 30], label: 'a link', labelVn: 'một liên kết' },
    { id: 'download', rect: [310, 350, 180, 48], label: 'download button', labelVn: 'nút tải xuống' },
  ],
  prompts: [
    { ask: 'Click the address bar.', askVn: 'Bấm vào thanh địa chỉ.', target: 'addr' },
    { ask: 'Click the search box on the page.', askVn: 'Bấm vào ô tìm kiếm trên trang.', target: 'search' },
    { ask: 'Click the button that takes you back to the page you were on before.', askVn: 'Bấm vào nút đưa em quay lại trang vừa xem.', target: 'back' },
    { ask: 'Click the button that opens a new tab.', askVn: 'Bấm vào nút mở một thẻ mới.', target: 'newtab' },
    { ask: 'Click the star that saves this page as a bookmark.', askVn: 'Bấm vào ngôi sao lưu trang này làm dấu trang.', target: 'bookmark' },
  ],
};

/**
 * A stand-in unit in the shape the registry expects. Only POINT_IT is declared,
 * because it is the only task on this track with content so far — a phase that
 * listed NOTES and WORD_REC would render two "no content" tiles and tell the
 * harness nothing.
 */
export const DEMO_UNIT = {
  meta: {
    id: 'T00_DEMO',
    title: 'Harness sample',
    desc: 'A browser window to point at — dev only, not a shipped unit',
    track: 'PRIMARY_TECH',
  },
  phases: [
    { id: 'practice', threshold: 0, tasks: [{ id: 'POINT_IT', maxXP: 15 }] },
  ],
  pointIt: [BROWSER_ANATOMY],
};
