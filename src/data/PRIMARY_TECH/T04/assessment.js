// src/data/PRIMARY_TECH/T04/assessment.js
// T4 Saving Your Work — the Quiz (ASSESSMENT, 20 XP). Six questions, eight
// minutes.
//
// The Quiz asks WHEN and WHY; Try It already tested whether they can do it, and
// Find It tested where the controls are. Bilingual convention follows Y7_MATH:
// plain English question and options, teaching carried in `expVn`.
//
// Distractors are nameable mistakes: thinking Save and Save As are two names for
// one button, thinking Downloads is a fine home for your own work, thinking a
// deleted file is gone, thinking a file with no name can exist. Correct letters
// are spread across A/B/C/D.
export const assessment = {
  timeLimit: 480, // 8 minutes
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
      id: 'a2_save_vs_saveas',
      type: 'mcq',
      title: '2. You have a saved file open. You press Save As and give it a new name. How many files do you have now?',
      options: [
        { val: 'A', text: 'A. Two — the old one and the new one' },
        { val: 'B', text: 'B. One — it was renamed' },
        { val: 'C', text: 'C. One — the old one was replaced' },
        { val: 'D', text: 'D. None until you close the document' },
      ],
      correct: 'A',
      expEn: 'Save As makes a copy under the new name and leaves the original alone. That is the difference from Save, which writes over what you already had — and it is why Save As is how you keep a draft.',
      expVn: 'Save As tạo một bản sao với tên mới và giữ nguyên bản gốc. Đó là điểm khác với Save, vốn ghi đè lên cái em đang có — và vì thế Save As là cách để giữ lại bản nháp.',
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
      expEn: 'Nothing is wrong with the folder — the problem is that the browser keeps adding to it. Your one important file ends up in a pile of installers and pictures you looked at once.',
      expVn: 'Thư mục đó không có gì sai — vấn đề là trình duyệt cứ liên tục thêm đồ vào. Một tệp quan trọng của em sẽ lọt thỏm giữa đống phần mềm cài đặt và ảnh em chỉ xem một lần.',
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
      id: 'a6_where_did_it_go',
      type: 'mcq',
      title: '6. You saved something but cannot find it. What is the most likely explanation?',
      options: [
        { val: 'A', text: 'A. It is somewhere on the computer, under a name or in a folder you did not choose' },
        { val: 'B', text: 'B. The computer deleted it to save space' },
        { val: 'C', text: 'C. It was never saved' },
        { val: 'D', text: 'D. It went to the Recycle Bin by itself' },
      ],
      correct: 'A',
      expEn: 'Saving almost never fails. What goes missing is the answer to "where" — which is why the two questions in the box are worth two seconds, and why the search box exists for the times they were not.',
      expVn: 'Việc lưu hầu như không bao giờ thất bại. Thứ bị mất là câu trả lời cho "ở đâu" — vì vậy hai câu hỏi trong hộp thoại đáng bỏ ra hai giây, và vì vậy mới có ô tìm kiếm cho những lần em bỏ qua chúng.',
    },
  ],
};
