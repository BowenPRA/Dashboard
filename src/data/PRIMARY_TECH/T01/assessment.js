// src/data/PRIMARY_TECH/T01/assessment.js
// T1 Starting and Stopping — the Quiz (ASSESSMENT, 20 XP). Six questions, eight
// minutes. Short, because this is a nine-year-old and the unit is 45 minutes.
//
// The Quiz asks WHEN and WHY, because Find It has already tested WHERE
// (docs/digital-skills-course.md §5.1). Nothing here repeats a notes check or a
// workbook question.
//
// Bilingual convention for this track's quizzes follows Y7_MATH: the question
// and its options are English (Assessment.jsx renders only the explanation
// bilingually), so the English is kept deliberately short and plain, and the
// Vietnamese carries the teaching in `expVn`.
//
// Every distractor is a nameable mistake — confusing "off" with "locked",
// reading minimise as close, treating the power button hold as a normal way to
// stop — and the correct letter is spread across A/B/C/D so the key cannot be
// guessed.
export const assessment = {
  timeLimit: 480, // 8 minutes
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
      id: 'a2_which_stops',
      type: 'mcq',
      title: '2. Which choice turns the computer all the way off?',
      options: [
        { val: 'A', text: 'A. Sleep' },
        { val: 'B', text: 'B. Log out' },
        { val: 'C', text: 'C. Restart' },
        { val: 'D', text: 'D. Shut down' },
      ],
      correct: 'D',
      expEn: 'Sleep rests the machine, Log out ends your session but leaves it running, and Restart turns it off and straight back on. Only Shut down leaves it off.',
      expVn: 'Ngủ chỉ cho máy nghỉ, Đăng xuất kết thúc phiên của em nhưng máy vẫn chạy, còn Khởi động lại thì tắt rồi bật lên ngay. Chỉ có Tắt máy là để máy tắt hẳn.',
    },
    {
      id: 'a3_minimise',
      type: 'mcq',
      title: '3. You press the minimise button (–) on a window. What has happened to your work?',
      options: [
        { val: 'A', text: 'A. It has been deleted' },
        { val: 'B', text: 'B. It has been saved' },
        { val: 'C', text: 'C. It is still open — the window is waiting on the taskbar' },
        { val: 'D', text: 'D. It has been closed' },
      ],
      correct: 'C',
      expEn: 'Minimise only hides. Click the window on the taskbar and it comes back exactly as it was. Note that it does not save either — minimising and saving are different jobs.',
      expVn: 'Thu nhỏ chỉ giấu cửa sổ đi. Bấm vào cửa sổ đó trên thanh tác vụ là nó trở lại y như cũ. Lưu ý nó cũng không lưu bài — thu nhỏ và lưu là hai việc khác nhau.',
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
      expEn: 'Holding the button cuts the power in the middle of whatever the computer was doing, so it can lose work. That is a fair price when nothing else responds, and a bad one when the machine is merely slow.',
      expVn: 'Giữ nút nguồn sẽ cắt điện ngay giữa lúc máy đang làm dở việc gì đó, nên có thể mất bài. Cái giá đó chấp nhận được khi không còn cách nào khác, nhưng không đáng khi máy chỉ đang chạy chậm.',
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
      id: 'a6_black_screen',
      type: 'mcq',
      title: '6. A screen is black. A fan is humming inside the case and a small light is on. Is the computer off?',
      options: [
        { val: 'A', text: 'A. Yes — a black screen always means it is off' },
        { val: 'B', text: 'B. Yes, because you cannot see anything on it' },
        { val: 'C', text: 'C. No — the fan and the light mean it is still on' },
        { val: 'D', text: 'D. You cannot tell without pressing a key' },
      ],
      correct: 'C',
      expEn: 'A dark screen is not the same thing as a machine that is off. If a fan is running and a light is on, the computer is awake or asleep — and your unsaved work is still in there. Look for the lights, not the screen.',
      expVn: 'Màn hình tối không có nghĩa là máy đã tắt. Nếu quạt còn chạy và đèn còn sáng thì máy vẫn đang bật hoặc đang ngủ — và bài chưa lưu của em vẫn còn trong đó. Hãy nhìn đèn, đừng nhìn màn hình.',
    },
  ],
};
