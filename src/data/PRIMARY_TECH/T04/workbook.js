// src/data/PRIMARY_TECH/T04/workbook.js
// T4 Saving Your Work — "Extra" (WORKBOOK, 10 XP). Smaller than T1's and T7's,
// because Try It carries the practice in this unit. Six questions, no typed
// boxes (docs/digital-skills-course.md §4.4); schema in docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'inline',
        prompt: 'Choose the right folder for each thing.',
        promptVn: 'Chọn đúng thư mục cho mỗi thứ.',
        textParts: ['A story you wrote yourself goes in ', '. A worksheet the teacher put on a website, which you fetched, lands in ', '.'],
        textPartsVn: ['Một câu chuyện do chính em viết thì để trong ', '. Một phiếu bài tập cô đăng trên website mà em tải về sẽ nằm trong ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'doc', text: 'Documents', textVn: 'Documents' },
              { val: 'dl', text: 'Downloads', textVn: 'Downloads' },
              { val: 'bin', text: 'Recycle Bin', textVn: 'Recycle Bin' },
            ],
            correct: 'doc',
          },
          2: {
            options: [
              { val: 'doc', text: 'Documents', textVn: 'Documents' },
              { val: 'dl', text: 'Downloads', textVn: 'Downloads' },
              { val: 'bin', text: 'Recycle Bin', textVn: 'Recycle Bin' },
            ],
            correct: 'dl',
          },
        },
        solution: [
          'Documents is for work you made. Downloads is for things that came off the internet.',
          'The second one is not wrong to be in Downloads — that is where the browser puts it. It is just not where it should STAY.',
          'Moving it into Documents afterwards is what keeps Downloads usable.',
        ],
        solutionVn: [
          'Documents dành cho những gì em tự làm ra. Downloads dành cho những thứ tải từ internet về.',
          'Thứ thứ hai nằm trong Downloads không sai — đó là chỗ trình duyệt đặt nó. Chỉ là nó không nên Ở LẠI đó.',
          'Chuyển nó vào Documents sau đó mới là điều giữ cho Downloads còn dùng được.',
        ],
        answer: 'Documents; Downloads',
        answerVn: 'Documents; Downloads',
      },
      {
        id: 'f2',
        type: 'mcq',
        prompt: 'You have never saved this document before, and you press Save. What happens?',
        promptVn: 'Em chưa từng lưu tài liệu này, và em bấm Save. Điều gì xảy ra?',
        options: [
          { val: 'a', text: 'It saves silently and you never find out where it went.', textVn: 'Nó lưu lặng lẽ và em không bao giờ biết nó đi đâu.' },
          { val: 'b', text: 'A box opens asking for a name and a folder.', textVn: 'Một hộp thoại mở ra hỏi tên và thư mục.' },
          { val: 'c', text: 'Nothing happens until you press Save As instead.', textVn: 'Không có gì xảy ra cho đến khi em bấm Save As thay thế.' },
          { val: 'd', text: 'It closes the document.', textVn: 'Nó đóng tài liệu lại.' },
        ],
        correct: 'b',
        solution: [
          'The computer cannot save a file without a name and a place, so the first Save has to ask.',
          'That box IS Save As — Save just opens it for you the first time.',
          'From then on, Save stops asking, because now it knows the answers.',
        ],
        solutionVn: [
          'Máy tính không thể lưu một tệp mà không có tên và chỗ, nên lần Save đầu tiên buộc phải hỏi.',
          'Hộp thoại đó CHÍNH LÀ Save As — Save chỉ mở nó ra giúp em trong lần đầu.',
          'Từ đó trở đi, Save không hỏi nữa, vì nó đã biết câu trả lời.',
        ],
        answer: 'A box opens asking for a name and a folder.',
        answerVn: 'Một hộp thoại mở ra hỏi tên và thư mục.',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        type: 'order',
        prompt: 'Put the four steps of saving a new piece of work into the right order.',
        promptVn: 'Sắp xếp bốn bước lưu một bài làm mới theo đúng thứ tự.',
        bank: [
          { val: 'folder', text: 'Choose the folder', textVn: 'Chọn thư mục' },
          { val: 'save', text: 'Press Save', textVn: 'Bấm Save' },
          { val: 'name', text: 'Type a name', textVn: 'Gõ một cái tên' },
          { val: 'confirm', text: 'Press the Save button in the box', textVn: 'Bấm nút Save trong hộp thoại' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['save', 'name', 'folder', 'confirm'] },
        solution: [
          'Pressing Save is what opens the box, so it comes first.',
          'Inside the box, the name and the folder are the two questions. Either order works in real life, but the name is what the box asks first.',
          'The Save button inside the box is what actually writes the file. Until you press it, nothing has been saved.',
        ],
        solutionVn: [
          'Bấm Save là thao tác mở hộp thoại ra, nên nó đứng đầu.',
          'Trong hộp thoại, tên và thư mục là hai câu hỏi. Ngoài đời thứ tự nào cũng được, nhưng hộp thoại hỏi tên trước.',
          'Nút Save bên trong hộp thoại mới là thứ thực sự ghi tệp xuống. Chưa bấm nó thì chưa có gì được lưu.',
        ],
        answer: 'Press Save, type a name, choose the folder, press Save in the box.',
        answerVn: 'Bấm Save, gõ tên, chọn thư mục, bấm Save trong hộp thoại.',
      },
      {
        id: 'p2',
        type: 'dnd',
        prompt: 'Sort these file names into ones you could find again next month, and ones you could not.',
        promptVn: 'Phân loại các tên tệp này thành loại tháng sau còn tìm lại được, và loại không.',
        bank: [
          { val: 'volcano', text: 'volcano report', textVn: 'volcano report' },
          { val: 'maths3', text: 'maths homework week 3', textVn: 'maths homework week 3' },
          { val: 'untitled', text: 'Untitled1', textVn: 'Untitled1' },
          { val: 'final', text: 'final final REAL', textVn: 'final final REAL' },
        ],
        targets: [
          { id: 'good', title: 'You would find it', titleVn: 'Em sẽ tìm ra' },
          { id: 'bad', title: 'You would not', titleVn: 'Em sẽ không tìm ra' },
        ],
        correctSets: { good: ['volcano', 'maths3'], bad: ['untitled', 'final'] },
        solution: [
          'A good name says WHAT the thing is, in words you would think of while looking for it.',
          '"Untitled1" is what the computer calls a file when you did not answer its question.',
          '"final final REAL" describes how you felt on the day, not what is inside. By next month there will be three of them and none will be final.',
        ],
        solutionVn: [
          'Một cái tên tốt nói rõ đó LÀ CÁI GÌ, bằng những từ em sẽ nghĩ tới khi đi tìm nó.',
          '"Untitled1" là cái tên máy tính tự đặt khi em không trả lời câu hỏi của nó.',
          '"final final REAL" mô tả cảm xúc của em hôm đó, không phải nội dung bên trong. Tháng sau em sẽ có ba tệp như vậy và chẳng cái nào là cuối cùng.',
        ],
        answer: 'Find it: volcano report, maths homework week 3. Not: Untitled1, final final REAL.',
        answerVn: 'Tìm ra: volcano report, maths homework week 3. Không: Untitled1, final final REAL.',
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
        prompt: 'You want to keep your first draft AND make a changed version. Which should you use?',
        promptVn: 'Em muốn giữ bản nháp đầu tiên VÀ tạo một bản đã sửa. Em nên dùng cách nào?',
        options: [
          { val: 'a', text: 'Save — it keeps both automatically.', textVn: 'Save — nó tự giữ cả hai.' },
          { val: 'b', text: 'Save As, with a different name.', textVn: 'Save As, với một cái tên khác.' },
          { val: 'c', text: 'Delete the first one, then Save.', textVn: 'Xoá bản đầu, rồi bấm Save.' },
          { val: 'd', text: 'It is not possible to have two versions.', textVn: 'Không thể có hai phiên bản được.' },
        ],
        correct: 'b',
        solution: [
          'Save writes over the file you already have. After it, the first draft is gone.',
          'Save As makes a SECOND file, so both exist — that is the only difference between the two, and it is the whole reason Save As exists.',
          'Give the new one a name that says which it is, or in a week you will not know which was which.',
        ],
        solutionVn: [
          'Save ghi đè lên tệp em đang có. Sau đó, bản nháp đầu tiên biến mất.',
          'Save As tạo ra một tệp THỨ HAI, nên cả hai đều tồn tại — đó là khác biệt duy nhất giữa hai lệnh, và là toàn bộ lý do Save As tồn tại.',
          'Hãy đặt cho bản mới cái tên nói rõ nó là bản nào, nếu không một tuần sau em sẽ không biết đâu là đâu.',
        ],
        answer: 'Save As, with a different name.',
        answerVn: 'Save As, với một cái tên khác.',
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: 'A friend says "I saved my work but it has disappeared". What has almost certainly happened?',
        promptVn: 'Một người bạn nói "mình đã lưu bài rồi mà nó biến mất". Gần như chắc chắn điều gì đã xảy ra?',
        options: [
          { val: 'a', text: 'The computer deleted it.', textVn: 'Máy tính đã xoá nó.' },
          { val: 'b', text: 'It was never really saved.', textVn: 'Nó chưa hề được lưu thật.' },
          { val: 'c', text: 'It is saved, but in a folder they did not choose and under a name they did not read.', textVn: 'Nó đã được lưu, nhưng trong thư mục họ không chọn và với cái tên họ không đọc.' },
          { val: 'd', text: 'Saving does not work on their computer.', textVn: 'Chức năng lưu không hoạt động trên máy của họ.' },
        ],
        correct: 'c',
        solution: [
          'Computers almost never lose a file that was saved. People lose the ANSWER to "where".',
          'The box asked two questions and got clicked through, so the file is sitting somewhere with a name like Document1.',
          'This is why the two questions are worth reading — and why the search box exists for the times you did not.',
        ],
        solutionVn: [
          'Máy tính hầu như không bao giờ làm mất một tệp đã được lưu. Người ta chỉ mất CÂU TRẢ LỜI cho câu hỏi "ở đâu".',
          'Hộp thoại đã hỏi hai câu và bị bấm bỏ qua, nên tệp đang nằm đâu đó với cái tên kiểu Document1.',
          'Vì vậy hai câu hỏi đó rất đáng đọc — và vì vậy mới có ô tìm kiếm cho những lần em đã không đọc.',
        ],
        answer: 'It is saved, but in a folder they did not choose and under a name they did not read.',
        answerVn: 'Nó đã được lưu, nhưng trong thư mục họ không chọn và với cái tên họ không đọc.',
      },
    ],
  },
];
