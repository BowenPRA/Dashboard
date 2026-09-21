// src/data/PRIMARY_TECH/T01/assessment.js
// T1 Starting and Stopping — the Quiz (ASSESSMENT, 20 XP). Eight questions, ten
// minutes: 1–2 logging in and the password, 3 the window buttons, 4 when to
// hold the power button, 5–6 which way to stop, 7 locked or off, 8 why you wait
// for the lights.
//
// The Quiz asks WHEN and WHY, because Find It and Label It have already tested
// WHERE (docs/digital-skills-course.md §5.1). No item copies a deck check: the
// deck asks what minimise does, which choice is all the way off and which
// computer is frozen, so the quiz asks about maximise, Log out and holding the
// button instead.
//
// Bilingual convention for this track's quizzes follows Y7_MATH: the question
// and its options are English (Assessment.jsx renders only the explanation
// bilingually), so the English is kept deliberately short and plain, and the
// Vietnamese carries the teaching in `expVn`.
//
// Every distractor is a nameable mistake — confusing "off" with "locked",
// reading one window button as another, treating the power button hold as a
// normal way to stop — and the right letter is spread two apiece across A–D.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_login',
      type: 'mcq',
      title: '1. What does it mean to log in?',
      options: [
        { val: 'A', text: 'A. To turn the computer on' },
        { val: 'B', text: 'B. To tell the computer who you are, with your name and your password' },
        { val: 'C', text: 'C. To open a window' },
        { val: 'D', text: 'D. To connect the computer to the internet' },
      ],
      correct: 'B',
      expEn: 'Logging in happens after the computer is already on. It is how the machine knows whose desktop and whose files to show you — which is why one computer can belong to several people.',
      expVn: 'Đăng nhập diễn ra sau khi máy đã bật. Đó là cách máy biết phải hiện màn hình nền và tệp của ai — vì vậy một chiếc máy có thể thuộc về nhiều người.',
    },
    {
      id: 'a_password',
      type: 'mcq',
      title: '2. Where is the safest place to keep your password?',
      options: [
        { val: 'A', text: 'A. On a note stuck to the screen' },
        { val: 'B', text: 'B. With your best friend, in case you forget it' },
        { val: 'C', text: 'C. On the front of your school book' },
        { val: 'D', text: 'D. Only in your head — you tell nobody' },
      ],
      correct: 'D',
      expEn: 'A password only works while nobody else knows it. A note on the screen or on a book can be read by anyone who walks past, and a friend who knows it can log in as you — even a good friend.',
      expVn: 'Mật khẩu chỉ có tác dụng khi không ai khác biết nó. Tờ giấy trên màn hình hay trên quyển vở thì ai đi ngang qua cũng đọc được, còn người bạn biết mật khẩu thì có thể đăng nhập với tư cách của em — dù đó là bạn tốt.',
    },
    {
      id: 'a_maximise',
      type: 'mcq',
      title: '3. Which window button makes a window fill the whole screen?',
      options: [
        { val: 'A', text: 'A. The line (–)' },
        { val: 'B', text: 'B. The cross (X)' },
        { val: 'C', text: 'C. The square (□)' },
        { val: 'D', text: 'D. The menu button on the taskbar' },
      ],
      correct: 'C',
      expEn: 'The square is maximise: it makes the window fill the screen, and pressing it again makes it smaller. The line (–) hides the window on the taskbar, the cross (X) closes it, and the menu button lists your programs.',
      expVn: 'Ô vuông là phóng to: nó cho cửa sổ chiếm đầy màn hình, và bấm lại thì cửa sổ nhỏ đi. Dấu gạch (–) giấu cửa sổ xuống thanh tác vụ, dấu nhân (X) đóng nó, còn nút trình đơn liệt kê các chương trình của em.',
    },
    {
      id: 'a4_hold_power',
      type: 'mcq',
      title: '4. When should you hold the power button down?',
      options: [
        { val: 'A', text: 'A. Only when the computer has frozen and nothing at all answers' },
        { val: 'B', text: 'B. Every time you finish using it — it is faster' },
        { val: 'C', text: 'C. Whenever a program is slow' },
        { val: 'D', text: 'D. Never, under any circumstances' },
      ],
      correct: 'A',
      expEn: 'Holding the button cuts the power in the middle of whatever the computer was doing, so it can lose work. That is a fair price when nothing else responds, and a bad one when the machine is merely slow. It is not "never", though: a frozen computer answers nothing else.',
      expVn: 'Giữ nút nguồn sẽ cắt điện ngay giữa lúc máy đang làm dở việc gì đó, nên có thể mất bài. Cái giá đó chấp nhận được khi không còn cách nào khác, nhưng không đáng khi máy chỉ đang chạy chậm. Nhưng cũng không phải là "không bao giờ": máy bị treo thì không phản hồi gì khác cả.',
    },
    {
      id: 'a5_twenty_minutes',
      type: 'mcq',
      title: '5. You are leaving your work open and coming back in twenty minutes. What is the best choice?',
      options: [
        { val: 'A', text: 'A. Shut down' },
        { val: 'B', text: 'B. Sleep' },
        { val: 'C', text: 'C. Hold the power button' },
        { val: 'D', text: 'D. Log out' },
      ],
      correct: 'B',
      expEn: 'Sleep is built for a short break: it wakes in a second with every window where you left it. The other three all close your work, so you would have to open everything again.',
      expVn: 'Chế độ Ngủ sinh ra cho quãng nghỉ ngắn: máy thức dậy trong một giây với mọi cửa sổ nguyên chỗ cũ. Ba cách còn lại đều đóng bài của em, nên em sẽ phải mở lại tất cả.',
    },
    {
      id: 'a_logout',
      type: 'mcq',
      title: '6. Which choice closes your work but leaves the computer on, ready for the next person to log in?',
      options: [
        { val: 'A', text: 'A. Sleep' },
        { val: 'B', text: 'B. Shut down' },
        { val: 'C', text: 'C. Minimise' },
        { val: 'D', text: 'D. Log out' },
      ],
      correct: 'D',
      expEn: 'Log out ends YOUR session and goes back to the login screen, with the computer still on. Sleep keeps your work open for you, Shut down turns the whole machine off, and minimise only hides one window.',
      expVn: 'Đăng xuất kết thúc phiên làm việc CỦA EM và quay về màn hình đăng nhập, máy vẫn bật. Ngủ giữ bài của em đang mở, Tắt máy tắt cả chiếc máy, còn thu nhỏ chỉ giấu một cửa sổ.',
    },
    {
      id: 'a6_black_screen',
      type: 'mcq',
      title: '7. A screen is black. A fan is humming inside the case and a small light is on. Is the computer off?',
      options: [
        { val: 'A', text: 'A. Yes — a black screen always means it is off' },
        { val: 'B', text: 'B. Yes, because you cannot see anything on it' },
        { val: 'C', text: 'C. No — the fan and the light mean it is still on' },
        { val: 'D', text: 'D. You cannot tell without pressing a key' },
      ],
      correct: 'C',
      expEn: 'A dark screen is not the same thing as a machine that is off. If a fan is running and a light is on, the computer is awake or asleep — and your unsaved work is still in there. Look at the lights, not the screen.',
      expVn: 'Màn hình tối không có nghĩa là máy đã tắt. Nếu quạt còn chạy và đèn còn sáng thì máy vẫn đang bật hoặc đang ngủ — và bài chưa lưu của em vẫn còn trong đó. Hãy nhìn đèn, đừng nhìn màn hình.',
    },
    {
      id: 'a_wait_lights',
      type: 'mcq',
      title: '8. You chose Shut down and the screen went black. Why should you wait for the lights to go out before you close the lid?',
      options: [
        { val: 'A', text: 'A. The screen goes dark before the computer has finished putting your files away' },
        { val: 'B', text: 'B. The lights have to cool down first' },
        { val: 'C', text: 'C. The computer needs to restart before it can stop' },
        { val: 'D', text: 'D. You do not need to wait — a black screen means it is finished' },
      ],
      correct: 'A',
      expEn: 'Shutting down is a job, and the computer is still tidying up after the screen goes dark. The lights going out is the real signal that it has finished. Close the lid too soon and you can interrupt it, like pulling the plug.',
      expVn: 'Tắt máy là cả một công việc, và máy vẫn đang dọn dẹp sau khi màn hình đã tối. Đèn tắt mới là tín hiệu thật rằng máy đã xong. Gập máy quá sớm có thể làm gián đoạn nó, giống như rút điện.',
    },
  ],
};
