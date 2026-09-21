// src/data/PRIMARY_TECH/T01/workbook.js
// T1 Starting and Stopping — Practice (WORKBOOK, 15 XP). Twelve questions across
// the three tiers and five answer widgets — multiple choice, drag into targets
// (matching and sorting), dropdown-in-sentence, typed words in the blanks, and
// ordering — plus one question read off a picture (WB_TASKBAR). No two
// consecutive questions share a type:
//
//   Focus      mcq · dnd · inline · fill_blank
//   Practice   dnd · mcq · fill_blank · mcq (picture)
//   Challenge  inline · mcq · order · dnd
//
// Nothing here repeats a deck activity: the deck orders the start-up and the
// stopping steps, so the one ordering question here is the NEW sequence — how
// to get back to work after a freeze. Typed boxes only ever take WORDS (with
// `accept`s for honest variants); the typed box marks by algebraic
// equivalence, and interface words are what this unit's typing is for.
//
// Every question has a stepped solution, because the value we add over a
// worksheet is the METHOD (docs/workbook-tasks.md §1). Schema is in that doc.
import { DIAGRAMS } from './diagrams.js';

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
          'The other three answers all treat the computer as broken. The commonest reason a computer will not start is that it has no electricity.',
          'Check the cheapest thing first: is it plugged in, and is the wall switch on?',
        ],
        solutionVn: [
          'Máy tính cần vài giây để khởi động, và màn hình đen suốt khoảng thời gian đó. Mười giây là chưa lâu.',
          'Ba đáp án còn lại đều coi như máy đã hỏng. Lý do phổ biến nhất khiến máy không khởi động là máy không có điện.',
          'Hãy kiểm tra thứ dễ nhất trước: máy đã cắm điện chưa, và công tắc trên tường đã bật chưa?',
        ],
        answer: 'Wait a little longer, and check the plug and the wall switch.',
        answerVn: 'Chờ thêm một chút, và kiểm tra phích cắm cùng công tắc điện.',
      },
      {
        id: 'f4',
        type: 'dnd',
        prompt: 'Every window has three buttons in its top-right corner. Drag each button onto the job it does.',
        promptVn: 'Mọi cửa sổ đều có ba nút ở góc trên bên phải. Kéo mỗi nút vào đúng việc nó làm.',
        bank: [
          { val: 'close', text: 'The cross (X)', textVn: 'Dấu nhân (X)' },
          { val: 'min', text: 'The line (–)', textVn: 'Dấu gạch (–)' },
          { val: 'max', text: 'The square (□)', textVn: 'Ô vuông (□)' },
        ],
        targets: [
          { id: 'hide', title: 'Hides the window on the taskbar — it stays open', titleVn: 'Giấu cửa sổ xuống thanh tác vụ — nó vẫn mở' },
          { id: 'fill', title: 'Makes the window fill the screen', titleVn: 'Cho cửa sổ chiếm đầy màn hình' },
          { id: 'end', title: 'Ends the window — save first', titleVn: 'Kết thúc cửa sổ — hãy lưu trước' },
        ],
        correctSets: { hide: ['min'], fill: ['max'], end: ['close'] },
        solution: [
          'The line (–) is **minimise**: the window drops down to the taskbar and waits there, still open.',
          'The square (□) is **maximise**: the window grows to fill the whole screen. Press it again to make it smaller.',
          'The cross (X) is **close**: it ends the window. It is the only one of the three that ends anything, so save first.',
        ],
        solutionVn: [
          'Dấu gạch (–) là **thu nhỏ**: cửa sổ tụt xuống thanh tác vụ và chờ ở đó, vẫn đang mở.',
          'Ô vuông (□) là **phóng to**: cửa sổ to ra chiếm cả màn hình. Bấm lại để thu nó nhỏ lại.',
          'Dấu nhân (X) là **đóng**: nó kết thúc cửa sổ. Đó là nút duy nhất trong ba nút kết thúc thứ gì đó, nên hãy lưu trước.',
        ],
        answer: 'Line (–): hides it · Square (□): fills the screen · Cross (X): ends it',
        answerVn: 'Dấu gạch (–): giấu đi · Ô vuông (□): chiếm đầy màn hình · Dấu nhân (X): kết thúc',
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
      {
        id: 'f5',
        type: 'fill_blank',
        prompt: 'Type the missing English words.',
        promptVn: 'Gõ các từ tiếng Anh còn thiếu.',
        textParts: ['To tell the computer who you are, you ', ' with your name and your secret ', '.'],
        textPartsVn: ['Để cho máy tính biết em là ai, em ', ' (đăng nhập) bằng tên và ', ' (mật khẩu) bí mật của em.'],
        blanks: {
          1: { correct: 'log in', width: 8, accept: ['sign in'] },
          2: { correct: 'password', width: 9, accept: [] },
        },
        solution: [
          'Telling the computer who you are is called **logging in**: you **log in**.',
          'The secret word that proves the account is yours is your **password**.',
          'The whole sentence: to tell the computer who you are, you **log in** with your name and your secret **password**.',
        ],
        solutionVn: [
          'Cho máy tính biết em là ai gọi là **đăng nhập**: em **log in**.',
          'Từ bí mật chứng minh tài khoản là của em là **mật khẩu** — **password**.',
          'Cả câu: để cho máy tính biết em là ai, em **log in** bằng tên và **password** bí mật của em.',
        ],
        answer: 'log in; password',
        answerVn: 'log in; password',
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
          'That is why only one of the four is safe without saving — and why the habit is to save anyway, every time.',
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
          'The two answers that share your password or your account are wrong for the same reason: her work would end up filed under your name, and yours would be open to her.',
        ],
        solutionVn: [
          'Đăng xuất đóng tài khoản của em và đưa máy quay lại màn hình đăng nhập, sẵn sàng cho người khác.',
          'Tắt máy cũng được, nhưng nó bắt chị ấy chờ cả máy khởi động lại một cách không cần thiết.',
          'Hai đáp án chia sẻ mật khẩu hoặc tài khoản đều sai vì cùng một lý do: bài của chị ấy sẽ bị lưu dưới tên em, còn bài của em thì chị ấy xem được hết.',
        ],
        answer: 'Log out.',
        answerVn: 'Đăng xuất.',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: 'Every class is an English class. Type the missing English words.',
        promptVn: 'Mỗi buổi học đều là một buổi học tiếng Anh. Gõ các từ tiếng Anh còn thiếu.',
        textParts: ['The re- in restart means ', ': restart = start again. After you shut down, the computer is all the way ', '.'],
        textPartsVn: ['Re- trong restart nghĩa là ', ' (lại): restart = khởi động lại. Sau khi em shut down, máy tính ', ' (tắt) hẳn.'],
        blanks: {
          1: { correct: 'again', width: 7, accept: [] },
          2: { correct: 'off', width: 5, accept: ['switched off', 'turned off'] },
        },
        solution: [
          '**Re-** at the start of a word means **again**: restart, reload, rewrite, replay.',
          'So a computer that **restarts** turns off and then starts **again** by itself — it ends up on.',
          'A computer that **shuts down** stops completely and stays **off**. That is the difference between the two.',
        ],
        solutionVn: [
          '**Re-** ở đầu một từ nghĩa là **lại** (again): restart, reload, rewrite, replay.',
          'Vì vậy máy **restart** thì tắt rồi tự khởi động **lại** — cuối cùng máy vẫn bật.',
          'Máy **shut down** thì dừng hoàn toàn và **tắt** hẳn (off). Đó là điểm khác nhau giữa hai cách.',
        ],
        answer: 'again; off',
        answerVn: 'again; off',
      },
      {
        id: 'p5',
        type: 'mcq',
        prompt: 'Ha Vi’s story window has vanished from the screen. Look at her taskbar. What happened, and what should she do?',
        promptVn: 'Cửa sổ truyện của Hà Vi biến mất khỏi màn hình. Hãy nhìn thanh tác vụ của bạn ấy. Chuyện gì đã xảy ra, và bạn ấy nên làm gì?',
        inlineSvg: DIAGRAMS.WB_TASKBAR,
        options: [
          { val: 'a', text: 'It was closed — open Notes and write it again.', textVn: 'Nó đã bị đóng — mở Notes và viết lại.' },
          { val: 'b', text: 'It was deleted — look in the Recycle Bin.', textVn: 'Nó đã bị xoá — tìm trong Thùng rác.' },
          { val: 'c', text: 'The computer is frozen — hold the power button.', textVn: 'Máy bị treo — giữ nút nguồn.' },
          { val: 'd', text: 'It was minimised — click its button on the taskbar.', textVn: 'Nó đã bị thu nhỏ — bấm vào nút của nó trên thanh tác vụ.' },
        ],
        correct: 'd',
        solution: [
          'Read the taskbar: there is a button called **story**, with a blue line under it. A button on the taskbar means that window is still **open**.',
          'An open window that is not on the screen has been **minimised** — hidden on the taskbar, not closed.',
          'One click on the **story** button brings it straight back. Closing it (A) or holding the power button (C) would put the unsaved story at risk for nothing.',
        ],
        solutionVn: [
          'Đọc thanh tác vụ: có một nút tên **story**, có vạch xanh bên dưới. Có nút trên thanh tác vụ nghĩa là cửa sổ đó vẫn **đang mở**.',
          'Một cửa sổ đang mở mà không có trên màn hình là đã bị **thu nhỏ** — giấu xuống thanh tác vụ, chứ không bị đóng.',
          'Bấm một cái vào nút **story** là nó quay lại ngay. Đóng nó (A) hay giữ nút nguồn (C) chỉ làm truyện chưa lưu gặp nguy một cách vô ích.',
        ],
        answer: 'It was minimised — click its button on the taskbar.',
        answerVn: 'Nó đã bị thu nhỏ — bấm vào nút của nó trên thanh tác vụ.',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c3',
        type: 'inline',
        prompt: 'Ha Vi chooses Shut down, but her story is not saved. The computer stops and asks: “story has not been saved. Shut down anyway?” Choose the right words.',
        promptVn: 'Hà Vi chọn Tắt máy, nhưng truyện của bạn ấy chưa được lưu. Máy dừng lại và hỏi: “story chưa được lưu. Vẫn tắt máy?” Chọn đúng từ.',
        textParts: ['She should press ', ', then ', ' her story, and then choose Shut down again.'],
        textPartsVn: ['Bạn ấy nên bấm ', ', rồi ', ' truyện, và sau đó chọn Tắt máy lại.'],
        blanks: {
          1: {
            options: [
              { val: 'anyway', text: 'Shut down anyway', textVn: 'Vẫn tắt máy' },
              { val: 'cancel', text: 'Cancel', textVn: 'Hủy (Cancel)' },
            ],
            correct: 'cancel',
          },
          2: {
            options: [
              { val: 'close', text: 'close', textVn: 'đóng' },
              { val: 'save', text: 'save', textVn: 'lưu' },
              { val: 'minimise', text: 'minimise', textVn: 'thu nhỏ' },
            ],
            correct: 'save',
          },
        },
        solution: [
          'The box is the computer’s safety net: it noticed work that would be lost, and it stopped to ask.',
          '**Shut down anyway** would throw the story away. **Cancel** stops the shut-down and takes her back to her work.',
          'Then she **saves** — closing without saving would lose it too, and minimising only hides it. Now Shut down will go through without asking.',
        ],
        solutionVn: [
          'Hộp thoại đó là tấm lưới an toàn của máy: nó thấy có bài sắp bị mất, và nó dừng lại để hỏi.',
          '**Vẫn tắt máy** sẽ vứt bỏ truyện. **Hủy** dừng việc tắt máy và đưa bạn ấy trở lại bài làm.',
          'Rồi bạn ấy **lưu** — đóng mà không lưu cũng sẽ mất bài, còn thu nhỏ thì chỉ giấu nó đi. Giờ Tắt máy sẽ chạy mà không hỏi nữa.',
        ],
        answer: 'Cancel; save',
        answerVn: 'Hủy; lưu',
      },
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
          'Nothing answers at all, so the computer is **frozen** — and this is the one situation holding the power button is for.',
          'D would be right on any working computer, but a frozen computer cannot open its menu, so there is no menu to click.',
          'Pulling the plug does the same damage as holding the button, and on a laptop it does not even switch it off. Use the button.',
        ],
        solutionVn: [
          'Không gì phản hồi cả, nên máy đang **bị treo** — và đây chính là tình huống mà việc giữ nút nguồn sinh ra để dùng.',
          'Đáp án D sẽ đúng trên một máy đang hoạt động — nhưng máy bị treo thì không mở được trình đơn, nên chẳng có trình đơn nào để bấm.',
          'Rút điện gây hại y như giữ nút nguồn, và trên máy tính xách tay thì thậm chí còn không tắt được máy. Hãy dùng nút nguồn.',
        ],
        answer: 'Hold the power button down until it switches off, then start it again.',
        answerVn: 'Giữ nút nguồn cho đến khi máy tắt, rồi bật lại.',
      },
      {
        id: 'c4',
        type: 'order',
        prompt: 'The computer froze and you have decided to hold the power button. Put the five steps of getting back to work in order.',
        promptVn: 'Máy bị treo và em đã quyết định giữ nút nguồn. Xếp năm bước để quay lại làm việc theo đúng thứ tự.',
        bank: [
          { val: 'login', text: 'Log in with your password', textVn: 'Đăng nhập bằng mật khẩu' },
          { val: 'hold', text: 'Hold the power button until the lights go out', textVn: 'Giữ nút nguồn cho đến khi đèn tắt' },
          { val: 'open', text: 'Open your work again', textVn: 'Mở lại bài làm' },
          { val: 'press', text: 'Press the power button once', textVn: 'Bấm nút nguồn một lần' },
          { val: 'wait', text: 'Let go, and wait a few seconds', textVn: 'Thả tay ra, và chờ vài giây' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['hold', 'wait', 'press', 'login', 'open'] },
        solution: [
          '**Hold** the button until the lights go out — about five to ten seconds. That is the forced stop.',
          'Let go and **wait** a few seconds, so it is properly off before you start it again.',
          'Then it is a normal start: **press once**, **log in**, and **open** your work. Anything you had not saved before it froze is gone — which is why you save often.',
        ],
        solutionVn: [
          '**Giữ** nút cho đến khi đèn tắt — khoảng năm đến mười giây. Đó là lần tắt ép buộc.',
          'Thả tay ra và **chờ** vài giây, để máy tắt hẳn rồi mới bật lại.',
          'Sau đó là khởi động bình thường: **bấm một lần**, **đăng nhập**, và **mở** bài làm. Phần nào chưa lưu trước khi máy treo thì đã mất — vì vậy hãy lưu thường xuyên.',
        ],
        answer: 'Hold until the lights go out, wait, press once, log in, open your work.',
        answerVn: 'Giữ đến khi đèn tắt, chờ, bấm một lần, đăng nhập, mở bài làm.',
      },
      {
        id: 'c5',
        type: 'dnd',
        prompt: 'Is the computer still ON, or is it OFF? Sort the seven.',
        promptVn: 'Máy tính vẫn đang BẬT, hay đã TẮT? Hãy phân loại bảy trường hợp.',
        bank: [
          { val: 'asleep', text: 'It is asleep', textVn: 'Nó đang ngủ' },
          { val: 'locked', text: 'It is showing the login screen', textVn: 'Nó đang hiện màn hình đăng nhập' },
          { val: 'loggedout', text: 'Someone has just logged out', textVn: 'Ai đó vừa đăng xuất' },
          { val: 'frozen', text: 'It is frozen', textVn: 'Nó đang bị treo' },
          { val: 'restarted', text: 'It has just restarted', textVn: 'Nó vừa khởi động lại' },
          { val: 'shutdown', text: 'It has been shut down', textVn: 'Nó đã được tắt máy' },
          { val: 'held', text: 'Someone held the power button until the lights went out', textVn: 'Ai đó đã giữ nút nguồn cho đến khi đèn tắt' },
        ],
        targets: [
          { id: 'on', title: 'Still on', titleVn: 'Vẫn đang bật' },
          { id: 'off', title: 'Off', titleVn: 'Đã tắt' },
        ],
        correctSets: { on: ['asleep', 'locked', 'loggedout', 'frozen', 'restarted'], off: ['shutdown', 'held'] },
        solution: [
          'Asleep, locked, logged out, frozen and just restarted all look quiet — but the computer is **on** in every one. Its lights are on.',
          'Log out and Restart both end at the **login screen**, still switched on, ready for someone to log in.',
          'Only two leave it **off**: Shut down (the proper way) and holding the power button (the emergency way).',
        ],
        solutionVn: [
          'Đang ngủ, đang khóa, vừa đăng xuất, bị treo và vừa khởi động lại đều trông yên ắng — nhưng máy đều đang **bật**. Đèn vẫn sáng.',
          'Đăng xuất và Khởi động lại đều kết thúc ở **màn hình đăng nhập**, máy vẫn bật, chờ người đăng nhập.',
          'Chỉ có hai cách để máy **tắt**: Tắt máy (cách đúng) và giữ nút nguồn (cách khẩn cấp).',
        ],
        answer: 'On: asleep, login screen, logged out, frozen, restarted · Off: shut down, power button held',
        answerVn: 'Bật: đang ngủ, màn hình đăng nhập, đã đăng xuất, bị treo, vừa khởi động lại · Tắt: đã tắt máy, đã giữ nút nguồn',
      },
    ],
  },
];
