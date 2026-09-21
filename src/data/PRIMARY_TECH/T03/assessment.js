// src/data/PRIMARY_TECH/T03/assessment.js
// T3 Typing Properly — the Quiz (ASSESSMENT, 20 XP). Eight questions, ten
// minutes: 1 what touch typing is, 2–3 the home row and its fingers, 4 where
// the screen goes, 5 which Shift, 6 why a finger comes home, 7 the Vietnamese
// keyboard, 8 what to practise.
//
// The Quiz asks WHAT, WHEN and WHY; the Typing Gym has already tested HOW.
// No item copies a deck check: the deck asks how to find the home row by
// touch, which finger presses Enter, and what to do about 72% right — so the
// quiz asks which fingers rest on the bumps, where the right ring finger
// rests, and what to do about 95% right but slow.
//
// Bilingual convention for this track's quizzes follows Y7_MATH: the question
// and its options are English (Assessment.jsx renders only the explanation
// bilingually), so the English is kept deliberately short and plain, and the
// Vietnamese carries the teaching in `expVn`.
//
// Every distractor is a nameable mistake — the touch screen for touch typing,
// the same-side Shift, Caps Lock for one capital, looking at the hands — and
// the right letter is spread two apiece across A–D.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_touch_typing',
      type: 'mcq',
      title: '1. What is touch typing?',
      options: [
        { val: 'A', text: 'A. Typing on a touch screen' },
        { val: 'B', text: 'B. Typing with all ten fingers, without looking at the keys' },
        { val: 'C', text: 'C. Typing with one finger, very carefully' },
        { val: 'D', text: 'D. Typing only the letters on the home row' },
      ],
      correct: 'B',
      expEn: 'Touch typing means your fingers find the keys by touch — each finger has its own keys — so your eyes can stay on the screen. It has nothing to do with touch screens, and it uses every row, not just the home row.',
      expVn: 'Gõ mười ngón (touch typing) nghĩa là các ngón tay tìm phím bằng cảm giác — mỗi ngón có những phím riêng — nên mắt em có thể nhìn màn hình. Nó không liên quan đến màn hình cảm ứng, và dùng mọi hàng phím chứ không chỉ hàng phím cơ sở.',
    },
    {
      id: 'a2_bump_fingers',
      type: 'mcq',
      title: '2. F and J have small bumps. Which fingers rest on them?',
      options: [
        { val: 'A', text: 'A. The two index fingers' },
        { val: 'B', text: 'B. The two thumbs' },
        { val: 'C', text: 'C. The two little fingers' },
        { val: 'D', text: 'D. The two middle fingers' },
      ],
      correct: 'A',
      expEn: 'Your index fingers — the ones next to your thumbs — rest on F and J. They find the bumps by feel, and the other fingers fall into place beside them. The thumbs rest on the space bar, and the little fingers rest on A and ;.',
      expVn: 'Hai ngón trỏ — hai ngón nằm cạnh ngón cái — đặt trên F và J. Chúng tìm gờ nổi bằng cảm giác, rồi các ngón khác tự vào chỗ bên cạnh. Ngón cái đặt trên phím cách, còn ngón út đặt trên A và ;.',
    },
    {
      id: 'a3_right_ring',
      type: 'mcq',
      title: '3. Which key does your right ring finger rest on?',
      options: [
        { val: 'A', text: 'A. K' },
        { val: 'B', text: 'B. O' },
        { val: 'C', text: 'C. L' },
        { val: 'D', text: 'D. ;' },
      ],
      correct: 'C',
      expEn: 'The right hand rests on J K L ;: index finger on J, middle on K, ring on L, and little finger on ;. O is above L — a reach up for the ring finger, not where it rests.',
      expVn: 'Tay phải đặt trên J K L ;: ngón trỏ trên J, ngón giữa trên K, ngón áp út trên L, và ngón út trên ;. O nằm phía trên L — là một lần với lên của ngón áp út, không phải chỗ nó nghỉ.',
    },
    {
      id: 'a4_screen',
      type: 'mcq',
      title: '4. Where should the top of the screen be when you type?',
      options: [
        { val: 'A', text: 'A. Flat on the desk, so you look down at it' },
        { val: 'B', text: 'B. As close to your face as it will go' },
        { val: 'C', text: 'C. Off to one side, so it is out of the way' },
        { val: 'D', text: 'D. At about eye level, about an arm’s length away' },
      ],
      correct: 'D',
      expEn: 'With the top of the screen at eye level and about an arm’s length away, your head stays up and your neck stays straight. A low screen bends your neck, a close one pulls you forward, and one off to the side twists you.',
      expVn: 'Khi mép trên màn hình ngang tầm mắt và cách khoảng một sải tay, đầu em ngẩng lên và cổ giữ thẳng. Màn hình thấp làm cổ phải cúi, màn hình quá gần kéo người em chúi về phía trước, còn màn hình lệch sang một bên làm em phải vặn người.',
    },
    {
      id: 'a5_capital_q',
      type: 'mcq',
      title: '5. You want a capital Q. Which key do you hold down?',
      options: [
        { val: 'A', text: 'A. The left Shift' },
        { val: 'B', text: 'B. The right Shift' },
        { val: 'C', text: 'C. Caps Lock' },
        { val: 'D', text: 'D. Either Shift — it makes no difference' },
      ],
      correct: 'B',
      expEn: 'Q is pressed by your left little finger, so that finger cannot hold the left Shift at the same time. The OTHER hand does it: your right little finger holds the right Shift. Caps Lock would turn every letter after it into a capital too.',
      expVn: 'Q do ngón út tay trái bấm, nên ngón đó không thể cùng lúc giữ Shift bên trái. Tay KIA làm việc này: ngón út tay phải giữ Shift bên phải. Caps Lock sẽ làm mọi chữ sau đó cũng thành chữ in hoa.',
    },
    {
      id: 'a6_come_home',
      type: 'mcq',
      title: '6. After a finger reaches up to a key, why does it come straight back to the home row?',
      options: [
        { val: 'A', text: 'A. The keys only work when you start from the home row' },
        { val: 'B', text: 'B. To give the finger a rest' },
        { val: 'C', text: 'C. So the hand does not drift and start pressing the wrong keys' },
        { val: 'D', text: 'D. To make the typing quieter' },
      ],
      correct: 'C',
      expEn: 'The home row is the place every reach is measured from. A finger that wanders off pulls the hand with it, and soon every finger is one key out and every letter comes out wrong. Coming straight back keeps every key the same short move away.',
      expVn: 'Hàng phím cơ sở là điểm xuất phát của mọi lần với. Một ngón tay đi lạc sẽ kéo cả bàn tay theo, và chẳng mấy chốc ngón nào cũng lệch một phím, chữ nào cũng sai. Trở về ngay giúp phím nào cũng chỉ cách một bước ngắn như nhau.',
    },
    {
      id: 'a7_vietnamese_keyboard',
      type: 'mcq',
      title: '7. Your English words keep coming out with letters like â and đ. What should you do?',
      options: [
        { val: 'A', text: 'A. Type more slowly' },
        { val: 'B', text: 'B. Press Caps Lock' },
        { val: 'C', text: 'C. Restart the computer' },
        { val: 'D', text: 'D. Switch the keyboard’s language to EN' },
      ],
      correct: 'D',
      expEn: 'Letters like â and đ mean Vietnamese typing (Telex or VNI) is still on: it turns aa into â and dd into đ. Switch the keyboard to EN — with the language button by the clock — and English comes out as you type it. Typing slowly will not change what it does.',
      expVn: 'Những chữ như â và đ nghĩa là bộ gõ tiếng Việt (Telex hoặc VNI) vẫn đang bật: nó biến aa thành â và dd thành đ. Hãy chuyển bàn phím sang EN — bằng nút ngôn ngữ cạnh đồng hồ — thì tiếng Anh sẽ hiện ra đúng như em gõ. Gõ chậm lại cũng không thay đổi được điều đó.',
    },
    {
      id: 'a8_practise',
      type: 'mcq',
      title: '8. Your Typing Gym result is 95% right, but only 5 words a minute. What will help most?',
      options: [
        { val: 'A', text: 'A. Keep practising a little every day — the speed will come' },
        { val: 'B', text: 'B. Look at your hands, to find the keys faster' },
        { val: 'C', text: 'C. Type as fast as you can and ignore the mistakes' },
        { val: 'D', text: 'D. Use only your two index fingers' },
      ],
      correct: 'A',
      expEn: 'You have the hard part — nearly every key is right. Speed comes from your fingers repeating the right moves, so a little practice every day is what makes you faster. Looking down, rushing, or using two fingers would all bring the mistakes back.',
      expVn: 'Em đã làm được phần khó nhất — gần như phím nào cũng đúng. Tốc độ đến từ việc các ngón tay lặp lại những động tác đúng, nên mỗi ngày luyện tập một chút chính là cách để em nhanh hơn. Nhìn xuống, gõ vội, hay chỉ dùng hai ngón đều sẽ làm lỗi quay trở lại.',
    },
  ],
};
