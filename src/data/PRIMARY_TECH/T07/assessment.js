// src/data/PRIMARY_TECH/T07/assessment.js
// T7 Inside a Browser — the Quiz (ASSESSMENT, 20 XP). Eight questions, ten
// minutes.
//
// The Quiz asks WHEN and WHY; Find It, Label It and Try It already tested WHERE
// and HOW. Bilingual convention follows Y7_MATH: the question and options are
// plain English (Assessment.jsx renders only the explanation bilingually) and
// the teaching is carried in `expVn`. No question repeats a deck check.
//
// Distractors are nameable mistakes: treating the search box as an address
// bar, thinking a one-letter typo "breaks" a website, thinking a bookmark is a
// copy, believing a download lives inside the browser or the website, reading
// /kids as something other than a page. The right letters run
// B D C A C A B D — two of each.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_typo',
      type: 'mcq',
      title: '1. You type www.citylibary.org and press Enter. The browser says it cannot find the site. What should you do?',
      options: [
        { val: 'A', text: 'A. Restart the computer' },
        { val: 'B', text: 'B. Look at the address bar and fix the spelling' },
        { val: 'C', text: 'C. Type the address into the page’s search box instead' },
        { val: 'D', text: 'D. Wait until tomorrow — the website must be closed' },
      ],
      correct: 'B',
      expEn: 'Addresses are exact. www.citylibary.org is missing an r, so it is a different address, and nobody owns that one. Read what you typed in the address bar, fix the one letter and press Enter again. The page’s search box would not help: it only searches its own website.',
      expVn: 'Địa chỉ web phải chính xác tuyệt đối. www.citylibary.org thiếu một chữ r, nên nó là một địa chỉ khác, và chẳng ai sở hữu địa chỉ đó. Hãy đọc lại những gì em đã gõ trong thanh địa chỉ, sửa chữ cái sai rồi bấm Enter lần nữa. Ô tìm kiếm của trang không giúp được gì: nó chỉ tìm trong website của chính nó.',
    },
    {
      id: 'a2_search_box_reach',
      type: 'mcq',
      title: '2. You type the word "volcano" into the search box on a school website. What will it look through?',
      options: [
        { val: 'A', text: 'A. Every website in the world' },
        { val: 'B', text: 'B. The files saved on your computer' },
        { val: 'C', text: 'C. Your bookmarks' },
        { val: 'D', text: 'D. Only that school website' },
      ],
      correct: 'D',
      expEn: 'That box belongs to the website, not to the browser, so its reach stops at the edge of that site. This is why the same word can find nothing here and plenty somewhere else.',
      expVn: 'Ô đó thuộc về website, không thuộc về trình duyệt, nên phạm vi của nó dừng lại ở ranh giới của trang đó. Vì thế cùng một từ có thể không tìm thấy gì ở đây nhưng lại có rất nhiều ở nơi khác.',
    },
    {
      id: 'a3_is_address',
      type: 'mcq',
      title: '3. Which of these is an address, not words to search for?',
      options: [
        { val: 'A', text: 'A. city library opening times' },
        { val: 'B', text: 'B. kids maths games' },
        { val: 'C', text: 'C. www.weathernow.org' },
        { val: 'D', text: 'D. weather now today' },
      ],
      correct: 'C',
      expEn: 'An address has no spaces, and it has dots and an ending like .org. The other three have spaces between the words: they are words to look for, not a place to go.',
      expVn: 'Địa chỉ không có dấu cách, và có dấu chấm cùng phần đuôi như .org. Ba cái còn lại có dấu cách giữa các từ: đó là các từ để tìm, không phải một nơi để đến.',
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
      title: '5. Yesterday you downloaded summer-reading.pdf from the City Library website. Where is the first place to look for it today?',
      options: [
        { val: 'A', text: 'A. The City Library website’s search box' },
        { val: 'B', text: 'B. The Recycle Bin' },
        { val: 'C', text: 'C. The Downloads folder on your computer' },
        { val: 'D', text: 'D. Your bookmarks' },
      ],
      correct: 'C',
      expEn: 'A downloaded file is a real file on your computer, and unless you chose somewhere else, the browser put it in Downloads. Your copy is not on the website (A), you did not delete it (B), and a bookmark is a way back to a page, not a file (D).',
      expVn: 'Tệp đã tải về là một tệp thật trên máy của em, và nếu em không chọn nơi khác thì trình duyệt đã cất nó vào Downloads. Bản của em không nằm trên website (A), em cũng không xoá nó (B), còn dấu trang là đường quay lại một trang, không phải một tệp (D).',
    },
    {
      id: 'a6_forward',
      type: 'mcq',
      title: '6. You are on the Kids’ Books page. You press Back and land on the City Library home page. How do you get to Kids’ Books again with one click?',
      options: [
        { val: 'A', text: 'A. Press Forward' },
        { val: 'B', text: 'B. Press Back again' },
        { val: 'C', text: 'C. Press Reload' },
        { val: 'D', text: 'D. Close the tab' },
      ],
      correct: 'A',
      expEn: 'Forward undoes a Back: it walks one step the other way along the pages you visited. Back again would take you further away, and Reload only fetches the home page you are already on.',
      expVn: 'Đi tới hoàn tác một lần Quay lại: nó đi một bước theo chiều ngược lại dọc các trang em đã xem. Bấm Quay lại lần nữa sẽ đưa em đi xa hơn, còn Tải lại chỉ lấy lại trang chủ em đang xem.',
    },
    {
      id: 'a7_bookmark_tab',
      type: 'mcq',
      title: '7. You use the Kids Maths website every week. Why is a bookmark better than leaving its tab open?',
      options: [
        { val: 'A', text: 'A. A bookmark makes the website load faster' },
        { val: 'B', text: 'B. A bookmark stays until you remove it; an open tab is gone as soon as somebody closes the browser' },
        { val: 'C', text: 'C. A bookmark saves a copy of the website on your computer' },
        { val: 'D', text: 'D. An open tab stops working after one hour' },
      ],
      correct: 'B',
      expEn: 'A bookmark is kept by the browser, so it is still there tomorrow and next month. A tab only lasts while the browser is open. A bookmark is a way back, not a copy (C), and it does not change how fast the page loads (A).',
      expVn: 'Dấu trang được trình duyệt lưu giữ, nên ngày mai hay tháng sau nó vẫn còn. Một thẻ chỉ tồn tại khi trình duyệt còn mở. Dấu trang là đường quay lại, không phải bản sao (C), và nó không làm trang tải nhanh hơn (A).',
    },
    {
      id: 'a8_address_page',
      type: 'mcq',
      title: '8. Look at this address: www.citylibrary.org/kids. What does /kids tell you?',
      options: [
        { val: 'A', text: 'A. The website’s name' },
        { val: 'B', text: 'B. The ending of the address, like .org' },
        { val: 'C', text: 'C. The password for the website' },
        { val: 'D', text: 'D. Which page of the City Library website you are on' },
      ],
      correct: 'D',
      expEn: 'After the ending (.org) comes a / and then one page on that website — here the Kids’ Books page. The website’s name is citylibrary (A), the ending is .org (B), and a password never goes in an address (C).',
      expVn: 'Sau phần đuôi (.org) là dấu / rồi đến một trang trên website đó — ở đây là trang Kids’ Books (sách thiếu nhi). Tên website là citylibrary (A), phần đuôi là .org (B), và mật khẩu không bao giờ nằm trong địa chỉ (C).',
    },
  ],
};
