// src/data/PRIMARY_TECH/T01/workbook.js
// T1 Starting and Stopping — "Extra" (WORKBOOK, 15 XP).
//
// Eight questions across the three tiers, and not one of them is a typed box:
// this is a nine-year-old whose English is the barrier, so the answer types are
// the ones docs/digital-skills-course.md §4.4 names for this track —
// `order` for a procedure, `dnd` for a sort, `mcq` and `inline` for a judgement.
// Written production happens in Short Answers, once, properly.
//
// Every question has a written solution, because the value we add over a
// worksheet is the METHOD (docs/workbook-tasks.md §1). Schema is in that doc.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'mcq',
        prompt: 'You press the power button and the screen stays black. You count to ten and it is still black. What is the best thing to do?',
        promptVn: 'Em bấm nút nguồn mà màn hình vẫn đen. Em đếm đến mười và nó vẫn đen. Điều tốt nhất nên làm là gì?',
        options: [
          { val: 'a', text: 'Press the power button again, several times, quickly.', textVn: 'Bấm nút nguồn lại, nhiều lần, thật nhanh.' },
          { val: 'b', text: 'Wait a little longer, and check the plug and the wall switch.', textVn: 'Chờ thêm một chút, và kiểm tra phích cắm cùng công tắc điện.' },
          { val: 'c', text: 'Hold the power button down until something happens.', textVn: 'Giữ nút nguồn cho đến khi có gì đó xảy ra.' },
          { val: 'd', text: 'Pull the plug out and put it back in again.', textVn: 'Rút phích cắm ra rồi cắm lại.' },
        ],
        correct: 'b',
        solution: [
          'A computer takes a few seconds to wake up, and the screen is black for all of them. Ten seconds is not long.',
          'The other three answers all assume the computer is broken. The commonest reason a computer will not start is that it has no electricity.',
          'Check the cheapest thing first: is it plugged in, and is the wall switch on?',
        ],
        solutionVn: [
          'Máy tính cần vài giây để khởi động, và màn hình đen suốt khoảng thời gian đó. Mười giây là chưa lâu.',
          'Ba đáp án còn lại đều cho rằng máy đã hỏng. Lý do phổ biến nhất khiến máy không khởi động là máy không có điện.',
          'Hãy kiểm tra thứ dễ nhất trước: máy đã cắm điện chưa, và công tắc trên tường đã bật chưa?',
        ],
        answer: 'Wait a little longer, and check the plug and the wall switch.',
        answerVn: 'Chờ thêm một chút, và kiểm tra phích cắm cùng công tắc điện.',
      },
      {
        id: 'f2',
        type: 'order',
        prompt: 'Put the four steps of starting a computer into the right order.',
        promptVn: 'Sắp xếp bốn bước bật máy tính theo đúng thứ tự.',
        bank: [
          { val: 'pw', text: 'Type your password', textVn: 'Nhập mật khẩu của em' },
          { val: 'press', text: 'Press the power button once', textVn: 'Bấm nút nguồn một lần' },
          { val: 'login', text: 'The login screen appears', textVn: 'Màn hình đăng nhập hiện ra' },
          { val: 'wait', text: 'Wait while the screen is black', textVn: 'Chờ trong lúc màn hình còn đen' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['press', 'wait', 'login', 'pw'] },
        solution: [
          'Nothing happens until you press the button, so that is always first.',
          'The waiting comes next, and it is the step people skip — they press the button again because they think nothing worked.',
          'Only once the computer has woken up does it show you the login screen, and only then can you type the password.',
        ],
        solutionVn: [
          'Không có gì xảy ra cho đến khi em bấm nút, nên đó luôn là bước đầu tiên.',
          'Tiếp theo là chờ, và đây là bước người ta hay bỏ qua — họ bấm nút lần nữa vì tưởng máy không chạy.',
          'Chỉ khi máy đã khởi động xong, nó mới hiện màn hình đăng nhập, và lúc đó em mới nhập được mật khẩu.',
        ],
        answer: 'Press the power button once, wait, the login screen appears, type your password.',
        answerVn: 'Bấm nút nguồn một lần, chờ, màn hình đăng nhập hiện ra, nhập mật khẩu.',
      },
      {
        id: 'f3',
        type: 'inline',
        prompt: 'Choose the right word for each part of the screen.',
        promptVn: 'Chọn đúng từ cho mỗi phần của màn hình.',
        textParts: ['The bar along the bottom of the screen is the ', ', and the small pictures you double-click are ', '.'],
        textPartsVn: ['Thanh chạy dọc phía dưới màn hình là ', ', còn những hình nhỏ em bấm đúp để mở là ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'tb', text: 'taskbar', textVn: 'thanh tác vụ' },
              { val: 'dt', text: 'desktop', textVn: 'màn hình nền' },
              { val: 'wd', text: 'window', textVn: 'cửa sổ' },
            ],
            correct: 'tb',
          },
          2: {
            options: [
              { val: 'ic', text: 'icons', textVn: 'biểu tượng' },
              { val: 'wd', text: 'windows', textVn: 'cửa sổ' },
              { val: 'bt', text: 'buttons', textVn: 'nút bấm' },
            ],
            correct: 'ic',
          },
        },
        solution: [
          'The taskbar is the strip along the bottom. It holds the menu button, the clock, and whatever is open.',
          'The desktop is the whole background behind everything, so it is not the bar.',
          'Icons are the little pictures. A window is the box that opens when you double-click one.',
        ],
        solutionVn: [
          'Thanh tác vụ là dải chạy dọc phía dưới. Nó chứa nút trình đơn, đồng hồ, và những gì đang mở.',
          'Màn hình nền là toàn bộ phần nền phía sau mọi thứ, nên nó không phải cái thanh đó.',
          'Biểu tượng là những hình nhỏ. Cửa sổ là cái khung mở ra khi em bấm đúp vào một biểu tượng.',
        ],
        answer: 'taskbar; icons',
        answerVn: 'thanh tác vụ; biểu tượng',
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
        prompt: 'You have a document open and you have NOT saved it. Sort the four choices by what happens to that open document.',
        promptVn: 'Em đang mở một tài liệu và CHƯA lưu. Hãy phân loại bốn lựa chọn theo điều xảy ra với tài liệu đang mở đó.',
        bank: [
          { val: 'sleep', text: 'Sleep', textVn: 'Ngủ' },
          { val: 'logout', text: 'Log out', textVn: 'Đăng xuất' },
          { val: 'restart', text: 'Restart', textVn: 'Khởi động lại' },
          { val: 'shutdown', text: 'Shut down', textVn: 'Tắt máy' },
        ],
        targets: [
          { id: 'open', title: 'Still open when you come back', titleVn: 'Vẫn đang mở khi em quay lại' },
          { id: 'closed', title: 'Closed — save it first!', titleVn: 'Đã đóng — phải lưu trước!' },
        ],
        correctSets: { open: ['sleep'], closed: ['logout', 'restart', 'shutdown'] },
        solution: [
          'Sleep is the only one that leaves everything exactly where it was. The computer rests, but nothing closes.',
          'The other three all end your session, so every open window is closed on the way.',
          'That is why only one of the four is safe to use without saving — and why the habit is to save anyway, every time.',
        ],
        solutionVn: [
          'Ngủ là cách duy nhất giữ mọi thứ y nguyên vị trí cũ. Máy nghỉ, nhưng không có gì đóng lại.',
          'Ba cách còn lại đều kết thúc phiên làm việc của em, nên mọi cửa sổ đang mở đều bị đóng.',
          'Vì vậy chỉ một trong bốn cách là an toàn khi chưa lưu — và vì vậy thói quen đúng là luôn lưu trước, mọi lần.',
        ],
        answer: 'Still open: Sleep. Closed: Log out, Restart, Shut down.',
        answerVn: 'Vẫn mở: Ngủ. Đã đóng: Đăng xuất, Khởi động lại, Tắt máy.',
      },
      {
        id: 'p2',
        type: 'mcq',
        prompt: 'Your sister wants to use the computer next, with her own account and her own files. What should you choose?',
        promptVn: 'Chị của em muốn dùng máy tiếp theo, bằng tài khoản và tệp riêng của chị ấy. Em nên chọn gì?',
        options: [
          { val: 'a', text: 'Shut down, so she can start it again herself.', textVn: 'Tắt máy, để chị ấy tự bật lại.' },
          { val: 'b', text: 'Log out.', textVn: 'Đăng xuất.' },
          { val: 'c', text: 'Sleep, and give her your password.', textVn: 'Cho máy ngủ, và đưa mật khẩu của em cho chị ấy.' },
          { val: 'd', text: 'Leave it as it is — she can just use your account.', textVn: 'Cứ để nguyên — chị ấy dùng tài khoản của em cũng được.' },
        ],
        correct: 'b',
        solution: [
          'Log out closes your account and takes the computer straight back to the login screen, ready for somebody else.',
          'Shutting down works too, but it makes her wait for the whole machine to start up again for no reason.',
          'The two answers that involve sharing your password or your account are wrong for the same reason: her work would end up filed under your name, and yours would be open to her.',
        ],
        solutionVn: [
          'Đăng xuất đóng tài khoản của em và đưa máy quay lại màn hình đăng nhập, sẵn sàng cho người khác.',
          'Tắt máy cũng được, nhưng nó bắt chị ấy chờ cả máy khởi động lại một cách không cần thiết.',
          'Hai đáp án liên quan đến chia sẻ mật khẩu hoặc tài khoản đều sai vì cùng một lý do: bài của chị ấy sẽ bị lưu dưới tên em, còn bài của em thì chị ấy xem được hết.',
        ],
        answer: 'Log out.',
        answerVn: 'Đăng xuất.',
      },
      {
        id: 'p3',
        type: 'inline',
        prompt: 'Choose the right button for each sentence.',
        promptVn: 'Chọn đúng nút cho mỗi câu.',
        textParts: ['To hide a window on the taskbar but keep working on it later, press ', '. To finish with it completely, press ', '.'],
        textPartsVn: ['Để giấu một cửa sổ xuống thanh tác vụ mà vẫn làm tiếp sau đó, hãy bấm ', '. Để dùng xong hẳn với nó, hãy bấm ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'min', text: 'minimise (–)', textVn: 'thu nhỏ (–)' },
              { val: 'close', text: 'close (X)', textVn: 'đóng (X)' },
            ],
            correct: 'min',
          },
          2: {
            options: [
              { val: 'min', text: 'minimise (–)', textVn: 'thu nhỏ (–)' },
              { val: 'close', text: 'close (X)', textVn: 'đóng (X)' },
            ],
            correct: 'close',
          },
        },
        solution: [
          'Minimise does not close anything. The window drops down to the taskbar and waits there — one click brings it back exactly as it was.',
          'Close ends the window. If you have not saved, most programs will ask you first, but not all of them will.',
          'They sit next to each other on purpose, and they are the two buttons people mix up most.',
        ],
        solutionVn: [
          'Thu nhỏ không đóng gì cả. Cửa sổ tụt xuống thanh tác vụ và chờ ở đó — một cú bấm là nó trở lại y như cũ.',
          'Đóng thì kết thúc cửa sổ. Nếu em chưa lưu, phần lớn chương trình sẽ hỏi trước, nhưng không phải chương trình nào cũng hỏi.',
          'Hai nút này nằm cạnh nhau là có chủ ý, và đây là hai nút người ta hay nhầm nhất.',
        ],
        answer: 'minimise (–); close (X)',
        answerVn: 'thu nhỏ (–); đóng (X)',
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
        prompt: 'The screen has not changed for three minutes. The mouse pointer will not move. Clicking does nothing and the keyboard does nothing. What should you do now?',
        promptVn: 'Màn hình không thay đổi gì suốt ba phút. Con trỏ chuột không di chuyển. Bấm chuột không có tác dụng và bàn phím cũng vậy. Bây giờ em nên làm gì?',
        options: [
          { val: 'a', text: 'Click faster, in lots of different places.', textVn: 'Bấm nhanh hơn, ở thật nhiều chỗ khác nhau.' },
          { val: 'b', text: 'Pull the plug out of the wall.', textVn: 'Rút phích cắm khỏi ổ điện.' },
          { val: 'c', text: 'Hold the power button down until the computer switches off, then start it again.', textVn: 'Giữ nút nguồn cho đến khi máy tắt, rồi bật lại.' },
          { val: 'd', text: 'Open the menu and choose Shut down.', textVn: 'Mở trình đơn và chọn Tắt máy.' },
        ],
        correct: 'c',
        solution: [
          'This is the one situation the power button hold is for. Everything gentler has already been tried and nothing answered.',
          'Answer D would be right on any working computer — but a frozen computer cannot open its menu, so there is no menu to click.',
          'Pulling the plug does the same damage as holding the button, and on a laptop it does not even switch it off. Use the button.',
        ],
        solutionVn: [
          'Đây chính là tình huống mà việc giữ nút nguồn sinh ra để dùng. Mọi cách nhẹ nhàng hơn đã thử rồi và không có gì phản hồi.',
          'Đáp án D sẽ đúng trên một máy đang hoạt động — nhưng máy bị treo thì không mở được trình đơn, nên chẳng có trình đơn nào để bấm.',
          'Rút điện gây hại y như giữ nút nguồn, và trên máy tính xách tay thì thậm chí còn không tắt được máy. Hãy dùng nút nguồn.',
        ],
        answer: 'Hold the power button down until it switches off, then start it again.',
        answerVn: 'Giữ nút nguồn cho đến khi máy tắt, rồi bật lại.',
      },
      {
        id: 'c2',
        type: 'order',
        prompt: 'Put the five steps of stopping a computer properly into the right order.',
        promptVn: 'Sắp xếp năm bước tắt máy đúng cách theo đúng thứ tự.',
        bank: [
          { val: 'menu', text: 'Open the menu on the taskbar', textVn: 'Mở trình đơn trên thanh tác vụ' },
          { val: 'save', text: 'Save your work', textVn: 'Lưu bài làm của em' },
          { val: 'lights', text: 'Wait until the lights go out', textVn: 'Chờ đến khi đèn tắt' },
          { val: 'close', text: 'Close your windows', textVn: 'Đóng các cửa sổ' },
          { val: 'choose', text: 'Choose Shut down', textVn: 'Chọn Tắt máy' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['save', 'close', 'menu', 'choose', 'lights'] },
        solution: [
          'Saving comes first, and it is the only step that protects your work. Nothing after it will save anything for you.',
          'Closing your windows next means the computer is not still asking you questions while it is trying to stop.',
          'Then the menu, then Shut down.',
          'Waiting for the lights is last and it is the step everybody skips. The screen goes dark before the computer has finished putting your files away — the lights going out is the real signal that it is done.',
        ],
        solutionVn: [
          'Lưu bài là bước đầu tiên, và đó là bước duy nhất bảo vệ bài làm của em. Không bước nào sau đó lưu hộ em cả.',
          'Đóng cửa sổ ở bước tiếp theo nghĩa là máy sẽ không còn hỏi em điều gì trong lúc nó đang cố dừng lại.',
          'Rồi mở trình đơn, rồi chọn Tắt máy.',
          'Chờ đèn tắt là bước cuối và ai cũng bỏ qua. Màn hình tối trước khi máy cất xong tệp của em — đèn tắt mới là tín hiệu thật rằng máy đã xong.',
        ],
        answer: 'Save, close your windows, open the menu, choose Shut down, wait for the lights.',
        answerVn: 'Lưu bài, đóng cửa sổ, mở trình đơn, chọn Tắt máy, chờ đèn tắt.',
      },
    ],
  },
];
