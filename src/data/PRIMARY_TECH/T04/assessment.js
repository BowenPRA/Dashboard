// src/data/PRIMARY_TECH/T04/assessment.js
// T4 Saving Your Work — the Quiz (ASSESSMENT, 20 XP). Eight questions, ten
// minutes.
//
// The Quiz asks WHEN and WHY; Try It already tested whether they can do it, and
// Find It tested where the controls are. Bilingual convention follows Y7_MATH:
// plain English question and options, teaching carried in `expVn`. No question
// repeats a deck check or prediction: where the deck asked "how many files after
// Save As", the quiz asks what Save did to the old ending; where the deck asked
// what to type in the search box, the quiz asks whether capitals matter.
//
// Distractors are nameable mistakes: thinking Save and Save As are two names for
// one button, thinking Downloads is a fine home for your own work, thinking a
// deleted file is gone, thinking a rename changes what is inside, thinking there
// is only one way to save. Correct letters: two each of A, B, C and D.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_two_questions',
      type: 'mcq',
      title: '1. The first time you save a new document, what does the computer need to know?',
      options: [
        { val: 'A', text: 'A. Only what it is called' },
        { val: 'B', text: 'B. What it is called, and which folder to put it in' },
        { val: 'C', text: 'C. Only which folder to put it in' },
        { val: 'D', text: 'D. Nothing — it decides both for you' },
      ],
      correct: 'B',
      expEn: 'A file cannot exist without a name and a place, so the box has to ask both. Answer D is what it FEELS like when you click through without reading: the computer picked, and it picked badly.',
      expVn: 'Một tệp không thể tồn tại nếu không có tên và chỗ, nên hộp thoại buộc phải hỏi cả hai. Đáp án D là cảm giác khi em bấm bỏ qua mà không đọc: máy tính đã chọn thay, và chọn rất tệ.',
    },
    {
      id: 'a2_save_writes_over',
      type: 'mcq',
      title: '2. Your story is saved. You open it, change the ending, and press Save. What happened to the old ending?',
      options: [
        { val: 'A', text: 'A. It is gone — Save wrote the new ending over the same file' },
        { val: 'B', text: 'B. It was kept in a second file called "story 2"' },
        { val: 'C', text: 'C. It went to the Recycle Bin' },
        { val: 'D', text: 'D. It is still in the file, hidden under the new ending' },
      ],
      correct: 'A',
      expEn: 'Save writes over the file you already have, so you still have one file — with the new ending. A second file (B) only appears with Save As. Nothing goes to the Recycle Bin (C) unless you delete it. If you wanted the old ending, Save As with a new name was the button to press BEFORE saving.',
      expVn: 'Save ghi đè lên tệp em đang có, nên em vẫn chỉ có một tệp — với phần kết mới. Một tệp thứ hai (B) chỉ xuất hiện khi dùng Save As. Không có gì vào Recycle Bin (C) trừ khi em xoá nó. Nếu em muốn giữ phần kết cũ, Save As với tên mới mới là nút cần bấm TRƯỚC khi lưu.',
    },
    {
      id: 'a3_downloads',
      type: 'mcq',
      title: '3. Why is Downloads a bad place to leave your own school work?',
      options: [
        { val: 'A', text: 'A. Files there are deleted every night' },
        { val: 'B', text: 'B. You cannot open files from that folder' },
        { val: 'C', text: 'C. It fills up with everything you fetch from the internet, so your work gets lost in it' },
        { val: 'D', text: 'D. Only the teacher can see inside it' },
      ],
      correct: 'C',
      expEn: 'Nothing is wrong with the folder — the problem is that the browser keeps adding to it. Your one important file ends up in a pile of worksheets and pictures you looked at once.',
      expVn: 'Thư mục đó không có gì sai — vấn đề là trình duyệt cứ liên tục thêm đồ vào. Một tệp quan trọng của em sẽ lọt thỏm giữa đống phiếu bài tập và ảnh em chỉ xem một lần.',
    },
    {
      id: 'a4_deleted',
      type: 'mcq',
      title: '4. You delete a file you needed. What should you do first?',
      options: [
        { val: 'A', text: 'A. Start the work again from the beginning' },
        { val: 'B', text: 'B. Restart the computer' },
        { val: 'C', text: 'C. Tell the teacher it is gone forever' },
        { val: 'D', text: 'D. Look in the Recycle Bin and put it back' },
      ],
      correct: 'D',
      expEn: 'Deleting moves a file to the bin; it does not destroy it. Knowing this is worth more than being careful, because everybody deletes something by mistake eventually.',
      expVn: 'Xoá là chuyển tệp vào thùng rác, không phải huỷ nó. Biết điều này còn quý hơn sự cẩn thận, vì sớm muộn ai cũng lỡ tay xoá thứ gì đó.',
    },
    {
      id: 'a5_naming',
      type: 'mcq',
      title: '5. Who is a file name really for?',
      options: [
        { val: 'A', text: 'A. The computer, so it can sort the files' },
        { val: 'B', text: 'B. You in the future, looking for it again' },
        { val: 'C', text: 'C. The teacher marking it' },
        { val: 'D', text: 'D. Nobody — names do not matter' },
      ],
      correct: 'B',
      expEn: 'The computer is perfectly happy with Untitled1. You are the one who has to find it in a month, which is why the test of a good name is whether it will still make sense to you then.',
      expVn: 'Máy tính hoàn toàn hài lòng với Untitled1. Chính em mới là người phải tìm lại nó sau một tháng, nên phép thử của một cái tên tốt là liệu lúc đó em còn hiểu nó không.',
    },
    {
      id: 'a6_ctrl_s',
      type: 'mcq',
      title: '6. Your mouse stops working halfway through a story. How can you still save it?',
      options: [
        { val: 'A', text: 'A. You cannot save without a mouse' },
        { val: 'B', text: 'B. Close the window — it saves as it closes' },
        { val: 'C', text: 'C. Press the power button' },
        { val: 'D', text: 'D. Press Ctrl+S (Cmd+S on a Mac)' },
      ],
      correct: 'D',
      expEn: 'Ctrl+S is Save on the keyboard, in almost every program — the second way to do the same job. Closing the window (B) asks whether to save at best and loses the work at worst, and the power button (C) is the power cut all over again.',
      expVn: 'Ctrl+S là lệnh Save trên bàn phím, dùng được trong hầu hết mọi chương trình — cách thứ hai để làm cùng một việc. Đóng cửa sổ (B) may lắm thì được hỏi có lưu không, tệ nhất thì mất bài, còn nút nguồn (C) thì lại là chuyện mất điện một lần nữa.',
    },
    {
      id: 'a7_rename',
      type: 'mcq',
      title: '7. You rename "Untitled1" to "volcano report". What happens to the writing inside it?',
      options: [
        { val: 'A', text: 'A. Nothing — only the name changes' },
        { val: 'B', text: 'B. It is deleted, because it is a new file now' },
        { val: 'C', text: 'C. A copy is made, so you now have two files' },
        { val: 'D', text: 'D. It moves to the Documents folder' },
      ],
      correct: 'A',
      expEn: 'Renaming changes what a file is CALLED, not what is in it or where it lives. There is still one file (not C), in the same folder (not D), with every word exactly as it was.',
      expVn: 'Đổi tên chỉ thay đổi tên GỌI của tệp, không thay đổi nội dung bên trong hay nơi nó nằm. Vẫn chỉ có một tệp (không phải C), trong cùng thư mục (không phải D), và mọi chữ vẫn y nguyên như cũ.',
    },
    {
      id: 'a8_search_capitals',
      type: 'mcq',
      title: '8. Hoa types "Volcano" in the search box. Her file is called "volcano report". What happens?',
      options: [
        { val: 'A', text: 'A. Nothing is found, because the capital V does not match' },
        { val: 'B', text: 'B. Nothing is found, because she did not type the whole name' },
        { val: 'C', text: 'C. The file is found — search matches part of a name, and capitals do not matter' },
        { val: 'D', text: 'D. The search renames her file to "Volcano"' },
      ],
      correct: 'C',
      expEn: 'The search box looks for those letters anywhere in a file\'s name, and it does not care about capital letters (not A). That is why you only need one word you are sure of, not the exact name (B). Searching only finds; it never changes a file (D).',
      expVn: 'Ô tìm kiếm tìm những chữ đó ở bất kỳ đâu trong tên tệp, và không phân biệt chữ hoa chữ thường (không phải A). Vì vậy em chỉ cần một từ em chắc chắn, không cần tên chính xác (B). Tìm kiếm chỉ để tìm; nó không bao giờ thay đổi tệp (D).',
    },
  ],
};
