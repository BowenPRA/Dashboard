// src/data/PRIMARY_TECH/T07/assessment.js
// T7 Inside a Browser — the Quiz (ASSESSMENT, 20 XP). Six questions, eight
// minutes.
//
// The Quiz asks WHEN and WHY; Find It already tested WHERE. Bilingual convention
// follows Y7_MATH: the question and options are plain English (Assessment.jsx
// renders only the explanation bilingually) and the teaching is carried in
// `expVn`.
//
// Distractors are nameable mistakes: treating the search box as an address bar,
// thinking a bookmark is a copy of the page, believing a download lives inside
// the browser, thinking closing a tab closes the browser. The correct letter is
// spread across A/B/C/D.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_where_to_type',
      type: 'mcq',
      title: '1. A friend gives you the address www.schoolsite.org. Where should you type it?',
      options: [
        { val: 'A', text: 'A. In the address bar at the top of the browser' },
        { val: 'B', text: 'B. In the search box on whatever page is open' },
        { val: 'C', text: 'C. In a new document' },
        { val: 'D', text: 'D. Anywhere — the browser works it out' },
      ],
      correct: 'A',
      expEn: 'An address names a place, so it goes in the box that takes you to places. A search box on a page only looks through that one website, and it cannot take you to a different one.',
      expVn: 'Địa chỉ gọi tên một nơi chốn, nên nó phải vào ô đưa em tới các nơi. Ô tìm kiếm trên một trang chỉ tìm trong riêng website đó, và không đưa em sang trang khác được.',
    },
    {
      id: 'a2_search_box_reach',
      type: 'mcq',
      title: '2. You type the word "volcano" into the search box on a school website. What will it look through?',
      options: [
        { val: 'A', text: 'A. Every website in the world' },
        { val: 'B', text: 'B. Only that school website' },
        { val: 'C', text: 'C. The files saved on your computer' },
        { val: 'D', text: 'D. Your bookmarks' },
      ],
      correct: 'B',
      expEn: 'That box belongs to the website, not to the browser, so its reach stops at the edge of that site. This is why the same word can find nothing here and plenty somewhere else.',
      expVn: 'Ô đó thuộc về website, không thuộc về trình duyệt, nên phạm vi của nó dừng lại ở ranh giới của trang đó. Vì thế cùng một từ có thể không tìm thấy gì ở đây nhưng lại có rất nhiều ở nơi khác.',
    },
    {
      id: 'a3_bookmark',
      type: 'mcq',
      title: '3. What does a bookmark actually save?',
      options: [
        { val: 'A', text: 'A. A copy of the page, so you can read it with no internet' },
        { val: 'B', text: 'B. A picture of what the page looked like today' },
        { val: 'C', text: 'C. A way back to the page, so you do not have to remember the address' },
        { val: 'D', text: 'D. The page, onto your computer as a file' },
      ],
      correct: 'C',
      expEn: 'A bookmark is a signpost, not a copy. Click it tomorrow and the browser goes and fetches the page again — so if the website has changed, you get the new version, and if the site has gone, so has your bookmark.',
      expVn: 'Dấu trang là một biển chỉ đường, không phải bản sao. Ngày mai em bấm vào nó thì trình duyệt sẽ đi lấy lại trang đó — nên nếu website đã đổi, em nhận bản mới, còn nếu trang đã biến mất thì dấu trang cũng vô dụng.',
    },
    {
      id: 'a4_close_tab',
      type: 'mcq',
      title: '4. You have three tabs open and you close the middle one. What happens?',
      options: [
        { val: 'A', text: 'A. That one page closes; the other two stay open' },
        { val: 'B', text: 'B. All three pages close' },
        { val: 'C', text: 'C. The whole browser closes' },
        { val: 'D', text: 'D. The website is deleted' },
      ],
      correct: 'A',
      expEn: 'One tab is one page, so closing it closes only that page. The browser closes with the LAST tab, because then it has nothing left to show — and nothing you do in a browser changes the website itself.',
      expVn: 'Một thẻ là một trang, nên đóng thẻ chỉ đóng trang đó. Trình duyệt chỉ đóng khi em đóng thẻ CUỐI CÙNG, vì lúc đó nó không còn gì để hiện — và không việc gì em làm trong trình duyệt thay đổi được chính website.',
    },
    {
      id: 'a5_download_location',
      type: 'mcq',
      title: '5. You download a file. Where can you find it afterwards?',
      options: [
        { val: 'A', text: 'A. Inside the browser — it disappears when the browser closes' },
        { val: 'B', text: 'B. Only on the website you took it from' },
        { val: 'C', text: 'C. Inside the bookmark you made' },
        { val: 'D', text: 'D. In a folder on your computer, usually called Downloads' },
      ],
      correct: 'D',
      expEn: 'Downloading makes a real file on your machine, with a name and a date. You can open it with the browser closed — and the browser tells you exactly where it put it, on the bar along the bottom, if you read it before clicking it away.',
      expVn: 'Tải xuống tạo ra một tệp thật trên máy của em, có tên và có ngày. Em mở được nó ngay cả khi trình duyệt đã đóng — và trình duyệt nói rõ nó cất tệp ở đâu, trên thanh chạy dọc phía dưới, nếu em chịu đọc trước khi bấm bỏ đi.',
    },
    {
      id: 'a6_lost',
      type: 'mcq',
      title: '6. You clicked a link and the new page is not what you wanted. What is the quickest way back?',
      options: [
        { val: 'A', text: 'A. Restart the computer' },
        { val: 'B', text: 'B. The back button' },
        { val: 'C', text: 'C. Close the browser and open it again' },
        { val: 'D', text: 'D. Type the whole address again from memory' },
      ],
      correct: 'B',
      expEn: 'Back walks you to the page you were on a moment ago, and you can press it as many times as you like. Almost nothing in a browser is one-way — knowing that is what stops a page you did not expect from being frightening.',
      expVn: 'Nút quay lại đưa em về trang em vừa xem lúc nãy, và em bấm bao nhiêu lần cũng được. Hầu như không có gì trong trình duyệt là một chiều — biết điều đó khiến một trang bất ngờ hiện ra không còn đáng sợ nữa.',
    },
  ],
};
