// src/data/PRIMARY_TECH/T01/notes.js
// T1 Starting and Stopping — the lesson deck (NOTES, 10 XP).
//
// Built on the flexible `layout` system (docs/lesson-standard.md; the reference
// deck is GED_ENG/ENG_1A). Ten slides, three embedded checks — the NOTES score
// is the fraction of those the student gets right, so reaching the last slide
// pays nothing on its own.
//
// NEVER put a `check` on a `showcase` slide here. The check block takes its
// height out of the picture: measured, a showcase with a caption draws its SVG
// at 0.75 scale and the same slide with a check drops to 0.40, where 16px
// interface labels render at about 6px. On a deck whose pictures exist to be
// READ that is fatal, so the two labelled-interface slides carry no check and
// the questions they used to hold sit on their own slides after them.
//
// Two things about this deck are specific to the Technology track:
//
//   · It closes on an UNASSESSED "On your own computer" card
//     (docs/digital-skills-course.md §5.4). The lesson is a rehearsal; the
//     transfer to a real machine is the point, and naming it is what makes it
//     happen.
//   · Every interface word is taught ON the thing it names (§5.3), which is why
//     the desktop tour is a labelled picture rather than a glossary.
//
// Slide audio is DERIVED from position (slideAudioUrl), so inserting a slide
// shifts the narration of every slide after it — re-run `npm run sync-audio`.
import { DIAGRAMS } from './diagrams.js';

export const notes = [
  {
    layout: 'hero',
    color: '#0ea5e9',
    icon: 'Home',
    brand: 'Technology',
    brandVn: 'Công nghệ',
    eyebrow: 'Unit T1',
    eyebrowVn: 'Bài T1',
    title: 'Starting and Stopping',
    titleVn: 'Bật máy và Tắt máy',
    objective: 'Turn a computer on, log in, find your way around the screen, and stop it properly — without ever pulling the plug.',
    objectiveVn: 'Bật máy tính, đăng nhập, tìm đường quanh màn hình, và tắt máy đúng cách — mà không bao giờ phải rút điện.',
    card: {
      icon: 'Pencil',
      badge: 'Before you start',
      badgeVn: 'Trước khi bắt đầu',
      text: 'Think about the computer or tablet at your house. **Who turns it off at night** — and how do they do it?',
      textVn: 'Hãy nghĩ về máy tính hoặc máy tính bảng ở nhà em. **Ai tắt nó vào buổi tối** — và họ tắt bằng cách nào?',
    },
  },
  {
    layout: 'steps',
    icon: 'Zap',
    accent: '#0ea5e9',
    title: 'Turning it on',
    titleVn: 'Bật máy',
    content: 'Every computer wakes up the same four ways, on every machine you will ever meet.',
    contentVn: 'Mọi máy tính đều khởi động theo bốn bước giống nhau, trên bất kỳ máy nào em từng gặp.',
    steps: [
      {
        text: 'Press the **power button once**. One press is enough — pressing it again can turn it back off.',
        textVn: 'Bấm **nút nguồn một lần**. Một lần là đủ — bấm thêm có thể làm máy tắt lại.',
      },
      {
        text: 'Wait. The screen stays black for a moment while the computer wakes up. **That is normal.**',
        textVn: 'Chờ một chút. Màn hình đen trong giây lát trong lúc máy khởi động. **Đó là bình thường.**',
      },
      {
        text: 'The **login screen** appears, with your name on it.',
        textVn: '**Màn hình đăng nhập** hiện ra, có tên của em trên đó.',
      },
      {
        text: 'Type your **password** and press **Enter**.',
        textVn: 'Nhập **mật khẩu** của em rồi bấm **Enter**.',
      },
    ],
    reveal: {
      label: 'Nothing happened at all. Now what?',
      labelVn: 'Không có gì xảy ra cả. Giờ làm sao?',
      prompt: 'You pressed the button and the screen stayed black. No lights, no sound.',
      promptVn: 'Em đã bấm nút mà màn hình vẫn đen. Không đèn, không tiếng.',
      answer: 'Check the **plug** and the **wall switch** first. A computer with no electricity looks exactly like a broken one — and it is the cheapest thing to fix.',
      answerVn: 'Hãy kiểm tra **phích cắm** và **công tắc điện** trước. Một chiếc máy không có điện trông y hệt một chiếc máy hỏng — và đó lại là thứ dễ sửa nhất.',
    },
  },
  {
    layout: 'split',
    icon: 'ShieldCheck',
    accent: '#f59e0b',
    ratio: 50,
    title: 'Your password is yours',
    titleVn: 'Mật khẩu là của riêng em',
    content: 'Logging in is how the computer knows **which work is yours**. Your files, your desktop, your saved games — all of it hangs off your name and your password.',
    contentVn: 'Đăng nhập là cách máy tính biết **bài nào là của em**. Tệp của em, màn hình nền của em, những trò em đã lưu — tất cả đều gắn với tên và mật khẩu của em.',
    inlineSvg: DIAGRAMS.LOGIN_STICKY,
    notes: [
      {
        tone: 'write',
        text: '**Log in:** to tell the computer who you are, using your name and your password.',
        textVn: '**Đăng nhập:** cho máy tính biết em là ai, bằng tên và mật khẩu của em.',
      },
      {
        tone: 'homework',
        text: 'A password written on a note stuck to the screen is **not a password any more**. Anyone who walks past can be you.',
        textVn: 'Một mật khẩu ghi trên tờ giấy dán vào màn hình thì **không còn là mật khẩu nữa**. Bất kỳ ai đi ngang qua đều có thể giả làm em.',
      },
    ],
    check: {
      id: 'chk_password',
      q: 'Your friend asks for your password so they can borrow the computer for five minutes. What should you do?',
      qVn: 'Bạn của em xin mật khẩu để mượn máy tính năm phút. Em nên làm gì?',
      options: [
        { val: 'A', text: 'Tell them the password — it is only five minutes.', textVn: 'Nói mật khẩu cho bạn — chỉ có năm phút thôi mà.' },
        { val: 'B', text: 'Log out, and let them log in with their own account.', textVn: 'Đăng xuất, và để bạn đăng nhập bằng tài khoản riêng.' },
        { val: 'C', text: 'Write it down for them so they do not forget it.', textVn: 'Viết mật khẩu ra cho bạn để bạn khỏi quên.' },
      ],
      correct: 'B',
      expEn: 'Every person gets their own account for exactly this reason. Logging out takes two seconds and gives your friend their own desktop — and anything they do stays on their name, not yours.',
      expVn: 'Mỗi người có tài khoản riêng chính là vì lý do này. Đăng xuất chỉ mất hai giây và cho bạn em màn hình nền của chính bạn ấy — và mọi việc bạn ấy làm sẽ mang tên bạn ấy, không phải tên em.',
    },
  },
  {
    layout: 'showcase',
    icon: 'ScanEye',
    accent: '#0ea5e9',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Look around the desktop',
    titleVn: 'Nhìn quanh màn hình nền',
    inlineSvg: DIAGRAMS.DESKTOP_ANATOMY,
    caption: 'The **desktop** is the whole background. The bar along the bottom is the **taskbar**. The little pictures are **icons**. The box your work sits in is a **window**.',
    captionVn: '**Màn hình nền** là toàn bộ phần nền. Thanh chạy dọc phía dưới là **thanh tác vụ**. Những hình nhỏ là **biểu tượng**. Cái khung chứa bài làm là **cửa sổ**.',
  },
  {
    // The check that used to sit on the slide above now has its own slide. A
    // `check` on a `showcase` takes its height out of the picture — measured at
    // 0.40 scale against 0.75 without one — and at 0.40 the labels on a drawn
    // interface are too small to read, which defeats a slide whose whole job is
    // reading them. Split rather than compress (docs/lesson-standard.md §1.4).
    layout: 'statement',
    icon: 'Grid3x3',
    accent: '#0ea5e9',
    label: 'Window buttons',
    labelVn: 'Các nút trên cửa sổ',
    title: 'Three buttons in the corner',
    titleVn: 'Ba nút ở góc cửa sổ',
    text: 'Every window has the same three buttons at its top right, always in the same order: **hide it**, **make it fill the screen**, **close it**.',
    textVn: 'Mọi cửa sổ đều có ba nút giống nhau ở góc trên bên phải, luôn theo cùng thứ tự: **giấu đi**, **cho chiếm đầy màn hình**, **đóng lại**.',
    sub: 'Only the last one ends anything. The first two just change how much of the screen the window is using.',
    subVn: 'Chỉ nút cuối cùng mới kết thúc thứ gì đó. Hai nút đầu chỉ thay đổi cửa sổ chiếm bao nhiêu phần màn hình.',
    notes: [
      {
        tone: 'write',
        text: '**Minimise (–)** hides the window on the taskbar. It is still open.',
        textVn: '**Thu nhỏ (–)** giấu cửa sổ xuống thanh tác vụ. Nó vẫn đang mở.',
      },
      {
        tone: 'write',
        text: '**Close (X)** ends the window. Save first.',
        textVn: '**Đóng (X)** kết thúc cửa sổ. Hãy lưu trước.',
      },
    ],
    check: {
      id: 'chk_close_vs_min',
      q: 'You press the button with the line on it (–) at the top of a window. What happens to your work?',
      qVn: 'Em bấm nút có dấu gạch ngang (–) ở đầu cửa sổ. Bài làm của em sẽ ra sao?',
      options: [
        { val: 'A', text: 'It closes and is gone.', textVn: 'Nó đóng lại và biến mất.' },
        { val: 'B', text: 'It is still open — the window just hides on the taskbar.', textVn: 'Nó vẫn đang mở — cửa sổ chỉ ẩn xuống thanh tác vụ.' },
        { val: 'C', text: 'It gets bigger and fills the screen.', textVn: 'Nó to ra và chiếm đầy màn hình.' },
      ],
      correct: 'B',
      expEn: 'That is minimise. The window slides down to the taskbar and waits — click it there and it comes straight back. The X on the end is the one that closes.',
      expVn: 'Đó là thu nhỏ. Cửa sổ trượt xuống thanh tác vụ và chờ ở đó — bấm vào nó là cửa sổ quay lại ngay. Dấu X ở cuối mới là nút đóng.',
    },
  },
  {
    layout: 'showcase',
    icon: 'ListChecks',
    accent: '#a855f7',
    title: 'Four ways to stop',
    titleVn: 'Bốn cách dừng máy',
    inlineSvg: DIAGRAMS.STOP_LADDER,
    caption: 'They are not four names for the same thing. Left to right, each one goes **further** than the one before it.',
    captionVn: 'Đây không phải bốn tên gọi của cùng một việc. Từ trái sang phải, mỗi cách đi **xa hơn** cách trước.',
  },
  {
    layout: 'callout',
    icon: 'AlertTriangle',
    accent: '#ef4444',
    eyebrow: 'The one rule',
    eyebrowVn: 'Quy tắc quan trọng nhất',
    title: 'Do not hold the power button',
    titleVn: 'Đừng giữ nút nguồn',
    content: 'Holding the power button down does not "turn the computer off". It **cuts the power**, in the middle of whatever the computer was doing — like pulling a book away while someone is still writing in it.',
    contentVn: 'Giữ nút nguồn không phải là "tắt máy". Nó **cắt điện**, ngay giữa lúc máy đang làm dở việc gì đó — giống như giật quyển vở khỏi tay người đang viết.',
    notes: [
      {
        tone: 'write',
        text: 'Hold the power button **only** when the computer has frozen completely and nothing at all answers.',
        textVn: 'Chỉ giữ nút nguồn **khi** máy đã treo hoàn toàn và không còn gì phản hồi.',
      },
      {
        tone: 'info',
        text: 'A short **press** is fine — on most machines it just means "go to sleep".',
        textVn: 'Bấm **nhẹ** một cái thì không sao — trên phần lớn máy, nó chỉ có nghĩa là "hãy ngủ đi".',
      },
    ],
  },
  {
    layout: 'steps',
    icon: 'CheckCircle2',
    accent: '#10b981',
    title: 'Stopping properly',
    titleVn: 'Dừng máy đúng cách',
    content: 'Five steps, in this order, every time. The order is what protects your work.',
    contentVn: 'Năm bước, theo đúng thứ tự này, mọi lần. Chính thứ tự mới là thứ bảo vệ bài làm của em.',
    steps: [
      { text: '**Save** your work first. Nothing below this step will save it for you.', textVn: '**Lưu** bài làm trước. Không bước nào phía dưới lưu hộ em cả.' },
      { text: '**Close** the windows you have open.', textVn: '**Đóng** các cửa sổ đang mở.' },
      { text: 'Open the **menu** at the end of the taskbar.', textVn: 'Mở **trình đơn** ở đầu thanh tác vụ.' },
      { text: 'Choose **Shut down**.', textVn: 'Chọn **Tắt máy**.' },
      { text: '**Wait** until the screen is black and the lights are off. Then you can leave.', textVn: '**Chờ** đến khi màn hình đen và đèn đã tắt. Lúc đó em mới rời đi.' },
    ],
    reveal: {
      label: 'Why wait for the lights?',
      labelVn: 'Sao phải chờ đèn tắt?',
      prompt: 'The screen went black straight away. Can you close the lid and go?',
      promptVn: 'Màn hình đã đen ngay lập tức. Em có thể gập máy lại và đi luôn không?',
      answer: 'Not yet. The screen goes dark **before** the computer has finished tidying up and putting your files away. The lights going out is the real signal.',
      answerVn: 'Chưa được. Màn hình tối **trước khi** máy tính làm xong việc dọn dẹp và cất tệp của em đi. Đèn tắt mới là tín hiệu thật.',
    },
    check: {
      id: 'chk_sleep_vs_shutdown',
      q: 'You are going to eat dinner and come back in twenty minutes. Which one is best?',
      qVn: 'Em sắp đi ăn tối và sẽ quay lại sau hai mươi phút. Cách nào là tốt nhất?',
      options: [
        { val: 'A', text: 'Sleep — it wakes up instantly with everything still open.', textVn: 'Ngủ — máy thức dậy ngay lập tức với mọi thứ vẫn đang mở.' },
        { val: 'B', text: 'Shut down — it is always safest to go all the way off.', textVn: 'Tắt máy — tắt hẳn bao giờ cũng an toàn nhất.' },
        { val: 'C', text: 'Restart — it clears the computer out for you.', textVn: 'Khởi động lại — nó dọn dẹp máy giúp em.' },
      ],
      correct: 'A',
      expEn: 'Sleep is built for exactly this: a short break. Shutting down would work, but you would close everything and wait for it all to start again. Save your work first either way.',
      expVn: 'Chế độ Ngủ sinh ra đúng cho tình huống này: một quãng nghỉ ngắn. Tắt máy cũng được, nhưng em sẽ phải đóng hết và chờ mọi thứ khởi động lại. Dù chọn cách nào, hãy lưu bài trước.',
    },
  },
  {
    layout: 'stack',
    icon: 'Target',
    accent: '#0ea5e9',
    columns: 1,
    title: 'Check your notebook',
    titleVn: 'Kiểm tra vở của em',
    content: 'Your notebook should now have **five words** written down and **one list of five steps**. Check.',
    contentVn: 'Vở của em bây giờ phải có **năm từ** đã chép và **một danh sách năm bước**. Hãy kiểm tra.',
    notes: [
      {
        tone: 'write',
        text: 'The words: **desktop · taskbar · icon · window · log in**.',
        textVn: 'Các từ: **màn hình nền · thanh tác vụ · biểu tượng · cửa sổ · đăng nhập**.',
      },
      {
        tone: 'write',
        text: 'The four ways to stop: **Sleep · Log out · Restart · Shut down** — and what makes each one different.',
        textVn: 'Bốn cách dừng máy: **Ngủ · Đăng xuất · Khởi động lại · Tắt máy** — và điều làm mỗi cách khác nhau.',
      },
      {
        tone: 'info',
        text: 'Can you say what the minimise button does **without** looking back?',
        textVn: 'Em có nói được nút thu nhỏ làm gì **mà không cần** nhìn lại không?',
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
    content: 'Everything above was a rehearsal. Go and do it on a real machine — that is the part that actually teaches you.',
    contentVn: 'Tất cả những gì ở trên chỉ là tập dượt. Hãy đi làm thật trên một chiếc máy thật — đó mới là phần thực sự dạy em.',
    notes: [
      {
        tone: 'task',
        text: 'Turn a computer or tablet on, and **log in yourself** — do not let anyone type it for you.',
        textVn: 'Bật một máy tính hoặc máy tính bảng, và **tự đăng nhập** — đừng để ai gõ hộ em.',
      },
      {
        tone: 'task',
        text: 'Find the **clock** on it. Then find the **taskbar**, and count how many things are open.',
        textVn: 'Tìm **đồng hồ** trên máy đó. Rồi tìm **thanh tác vụ**, và đếm xem có bao nhiêu thứ đang mở.',
      },
      {
        tone: 'task',
        text: 'Shut it down properly and **wait for the lights to go out** before you walk away.',
        textVn: 'Tắt máy đúng cách và **chờ đèn tắt hẳn** rồi mới rời đi.',
      },
    ],
  },
];
