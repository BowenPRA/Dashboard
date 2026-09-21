// src/data/PRIMARY_TECH/T04/workbook.js
// T4 Saving Your Work — "Extra" (WORKBOOK, 15 XP). Twelve questions across
// Focus · Practice · Challenge; schema in docs/workbook-tasks.md §2.
//
// Answer types, in order — never the same one twice in a row:
//   f1 inline · f2 mcq · f3 fill_blank · f4 mcq (reads the Save As picture)
//   p1 order · p2 dnd · p3 inline · p4 dnd
//   c1 mcq · c3 fill_blank · c2 mcq · c4 order
//
// No typed maths box: a typed answer is marked by algebraic equivalence. The
// fill_blank answers are WORDS (marked as words, with `accept` for the fair
// alternatives), never symbols or single letters the parser could read as
// algebra.
import { DIAGRAMS } from './diagrams.js';

const FOLDER_OPTIONS = [
  { val: 'doc', text: 'Documents', textVn: 'Documents' },
  { val: 'dl', text: 'Downloads', textVn: 'Downloads' },
  { val: 'bin', text: 'Recycle Bin', textVn: 'Recycle Bin' },
];

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
          1: { options: FOLDER_OPTIONS, correct: 'doc' },
          2: { options: FOLDER_OPTIONS, correct: 'dl' },
        },
        solution: [
          'Documents is for work you made. Downloads is for things that came off the internet.',
          'The worksheet is not wrong to be in Downloads — that is where the browser puts it. It is just not where it should STAY.',
          'Moving it into Documents afterwards is what keeps Downloads usable.',
        ],
        solutionVn: [
          'Documents dành cho những gì em tự làm ra. Downloads dành cho những thứ tải từ internet về.',
          'Phiếu bài tập nằm trong Downloads không sai — đó là chỗ trình duyệt đặt nó. Chỉ là nó không nên Ở LẠI đó.',
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
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: 'Complete the sentence with one word in each box.',
        promptVn: 'Hoàn thành câu, mỗi ô điền một từ (bằng tiếng Anh).',
        textParts: ['The first time you save, the box asks two questions: what is the file\'s ', ', and which ', ' should it go in?'],
        textPartsVn: ['Lần đầu em lưu, hộp thoại hỏi hai câu: ', ' của tệp là gì, và nó nên nằm trong ', ' nào?'],
        blanks: {
          1: { correct: 'name', width: 8, accept: ['file name', 'filename', 'title'] },
          2: { correct: 'folder', width: 8, accept: ['place', 'location'] },
        },
        solution: [
          'Every file has two things: a **name** (what it is called) and a **folder** (where it lives).',
          'The Save As box asks for both: **File name** at the top, **Save it in** below it.',
          'So the answers are **name** and **folder**.',
        ],
        solutionVn: [
          'Tệp nào cũng có hai thứ: một **name** (tên — nó được gọi là gì) và một **folder** (thư mục — nó nằm ở đâu).',
          'Hộp thoại Save As hỏi cả hai: **File name** ở trên, **Save it in** ở dưới.',
          'Vậy đáp án là **name** và **folder**.',
        ],
        answer: 'name; folder',
        answerVn: 'name (tên); folder (thư mục)',
      },
      {
        id: 'f4',
        type: 'mcq',
        prompt: 'Look at this Save As box. You press **Save** right now, without changing anything. What happens?',
        promptVn: 'Hãy nhìn hộp thoại Save As này. Em bấm **Save** ngay bây giờ, không thay đổi gì cả. Điều gì xảy ra?',
        inlineSvg: DIAGRAMS.SAVE_AS_DIALOG,
        options: [
          { val: 'a', text: 'It is saved as "volcano report" in Documents.', textVn: 'Nó được lưu thành "volcano report" trong Documents.' },
          { val: 'b', text: 'Nothing is saved, because you did not type a name.', textVn: 'Không có gì được lưu, vì em chưa gõ tên.' },
          { val: 'c', text: 'It is saved as "Untitled" in Downloads.', textVn: 'Nó được lưu thành "Untitled" trong Downloads.' },
          { val: 'd', text: 'The computer asks you which folder you meant.', textVn: 'Máy tính hỏi em muốn chọn thư mục nào.' },
        ],
        correct: 'c',
        solution: [
          'Read the box, not your hopes. The File name box says **Untitled**.',
          'In the folder row, **Downloads** is the one lit up in blue — that is the folder chosen right now.',
          'Save uses exactly what the box shows, so the file becomes **Untitled** in **Downloads**. That is how work gets lost.',
        ],
        solutionVn: [
          'Hãy đọc hộp thoại, đừng đọc mong muốn của mình. Ô File name ghi **Untitled**.',
          'Trong hàng thư mục, **Downloads** là ô đang sáng màu xanh — đó là thư mục đang được chọn.',
          'Save dùng đúng những gì hộp thoại đang hiện, nên tệp sẽ thành **Untitled** trong **Downloads**. Bài bị thất lạc là như vậy đó.',
        ],
        answer: 'It is saved as "Untitled" in Downloads.',
        answerVn: 'Nó được lưu thành "Untitled" trong Downloads.',
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
        prompt: 'Your first draft is saved as "volcano report". Put the steps for keeping it AND making a new version into the right order.',
        promptVn: 'Bản nháp đầu tiên đã được lưu tên "volcano report". Hãy sắp xếp các bước để giữ nó VÀ tạo một phiên bản mới theo đúng thứ tự.',
        bank: [
          { val: 'change', text: 'Change the ending, then press Save', textVn: 'Sửa phần kết, rồi bấm Save' },
          { val: 'saveas', text: 'Press Save As', textVn: 'Bấm Save As' },
          { val: 'confirm', text: 'Press Save in the box', textVn: 'Bấm Save trong hộp thoại' },
          { val: 'name', text: 'Type a different name: volcano report 2', textVn: 'Gõ một tên khác: volcano report 2' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['saveas', 'name', 'confirm', 'change'] },
        solution: [
          'Save As comes first: it opens the box that makes a NEW file.',
          'Type a different name, then press Save in the box. Now there are two files, and the window is showing the new one.',
          'Only now change the ending and press Save — Save writes to the file that is open, which is volcano report 2. The first draft is never touched.',
        ],
        solutionVn: [
          'Save As đứng đầu: nó mở hộp thoại tạo ra một tệp MỚI.',
          'Gõ một tên khác, rồi bấm Save trong hộp thoại. Bây giờ có hai tệp, và cửa sổ đang hiện tệp mới.',
          'Đến lúc này mới sửa phần kết và bấm Save — Save ghi vào tệp đang mở, tức là volcano report 2. Bản nháp đầu tiên không bao giờ bị động đến.',
        ],
        answer: 'Save As → type volcano report 2 → Save in the box → change the ending and Save.',
        answerVn: 'Save As → gõ volcano report 2 → Save trong hộp thoại → sửa phần kết và Save.',
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
      {
        id: 'p3',
        type: 'inline',
        prompt: 'Complete the sentences about Save and Save As.',
        promptVn: 'Hoàn thành các câu về Save và Save As.',
        textParts: ['You have one saved story. After Save you have ', ' file. After Save As with a new name you have ', ' files, and the old one is ', '.'],
        textPartsVn: ['Em có một câu chuyện đã lưu. Sau khi Save em có ', ' tệp. Sau khi Save As với tên mới em có ', ' tệp, và tệp cũ thì ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'one', text: 'one', textVn: 'một' },
              { val: 'two', text: 'two', textVn: 'hai' },
              { val: 'none', text: 'no', textVn: 'không có' },
            ],
            correct: 'one',
          },
          2: {
            options: [
              { val: 'one', text: 'one', textVn: 'một' },
              { val: 'two', text: 'two', textVn: 'hai' },
              { val: 'three', text: 'three', textVn: 'ba' },
            ],
            correct: 'two',
          },
          3: {
            options: [
              { val: 'same', text: 'exactly as it was', textVn: 'vẫn y nguyên như cũ' },
              { val: 'deleted', text: 'in the Recycle Bin', textVn: 'nằm trong Recycle Bin' },
              { val: 'renamed', text: 'renamed', textVn: 'bị đổi tên' },
            ],
            correct: 'same',
          },
        },
        solution: [
          'Save writes over the file you already have, so you still have **one**.',
          'Save As makes a NEW file with the new name, so now there are **two**.',
          'Save As does not touch the old file at all: it stays **exactly as it was**. Nothing is deleted or renamed.',
        ],
        solutionVn: [
          'Save ghi đè lên tệp em đang có, nên em vẫn chỉ có **một** tệp.',
          'Save As tạo ra một tệp MỚI với tên mới, nên bây giờ có **hai** tệp.',
          'Save As hoàn toàn không động vào tệp cũ: nó vẫn **y nguyên như cũ**. Không có gì bị xoá hay bị đổi tên.',
        ],
        answer: 'one; two; exactly as it was',
        answerVn: 'một; hai; vẫn y nguyên như cũ',
      },
      {
        id: 'p4',
        type: 'dnd',
        prompt: 'Two ways to do everything. Drag each way into the job it does.',
        promptVn: 'Việc gì cũng có hai cách. Kéo mỗi cách vào đúng việc mà nó làm.',
        bank: [
          { val: 'btn', text: 'The Save button', textVn: 'Nút Save' },
          { val: 'ctrls', text: 'Ctrl+S (Cmd+S on a Mac)', textVn: 'Ctrl+S (Cmd+S trên máy Mac)' },
          { val: 'dots', text: 'The file\'s ⋮ button', textVn: 'Nút ⋮ của tệp' },
          { val: 'right', text: 'Right-click the file', textVn: 'Bấm chuột phải vào tệp' },
          { val: 'menudel', text: 'Delete in the file\'s menu', textVn: 'Delete trong trình đơn của tệp' },
          { val: 'drag', text: 'Drag the file onto the Recycle Bin', textVn: 'Kéo tệp thả vào Recycle Bin' },
        ],
        targets: [
          { id: 'save', title: 'Saves your work', titleVn: 'Lưu bài của em' },
          { id: 'menu', title: 'Opens a file\'s actions', titleVn: 'Mở các thao tác của một tệp' },
          { id: 'delete', title: 'Deletes a file', titleVn: 'Xoá một tệp' },
        ],
        correctSets: { save: ['btn', 'ctrls'], menu: ['dots', 'right'], delete: ['menudel', 'drag'] },
        solution: [
          '**Save**: the Save button, or Ctrl+S on the keyboard (Cmd+S on a Mac).',
          '**A file\'s actions** (Rename, Move to, Delete): its ⋮ button, or a right-click on the file — both open the same menu.',
          '**Delete**: Delete in that menu, or drag the file onto the Recycle Bin. Either way it goes to the bin, and can come back.',
        ],
        solutionVn: [
          '**Lưu**: nút Save, hoặc Ctrl+S trên bàn phím (Cmd+S trên máy Mac).',
          '**Các thao tác với tệp** (Rename, Move to, Delete): nút ⋮ của nó, hoặc bấm chuột phải vào tệp — cả hai mở cùng một trình đơn.',
          '**Xoá**: chọn Delete trong trình đơn đó, hoặc kéo tệp thả vào Recycle Bin. Cách nào thì tệp cũng vào thùng rác, và vẫn lấy lại được.',
        ],
        answer: 'Save: button, Ctrl+S. Actions: ⋮, right-click. Delete: menu Delete, drag to the bin.',
        answerVn: 'Lưu: nút Save, Ctrl+S. Thao tác: ⋮, chuột phải. Xoá: Delete trong trình đơn, kéo vào thùng rác.',
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
        id: 'c3',
        type: 'fill_blank',
        prompt: 'Lan saved "rainforest poster" somewhere, but she cannot remember which folder. Type ONE word she should put in the file manager\'s search box.',
        promptVn: 'Lan đã lưu "rainforest poster" ở đâu đó, nhưng bạn ấy không nhớ thư mục nào. Hãy gõ MỘT từ bạn ấy nên nhập vào ô tìm kiếm của trình quản lý tệp.',
        textParts: ['Search for: ', ''],
        textPartsVn: ['Tìm: ', ''],
        blanks: {
          1: { correct: 'rainforest', width: 12, accept: ['poster', 'rainforest poster'] },
        },
        solution: [
          'The search box matches **part of a file name**, in every folder it looks through.',
          'Lan is sure the name has **rainforest** in it (or **poster**) — either word will find it.',
          'She does not need the whole name, the folder, or the capital letters. "Where is my poster" would find nothing, because no file is called that.',
        ],
        solutionVn: [
          'Ô tìm kiếm so khớp với **một phần tên tệp**, trong mọi thư mục mà nó tìm qua.',
          'Lan chắc chắn tên tệp có chữ **rainforest** (hoặc **poster**) — từ nào cũng tìm ra.',
          'Bạn ấy không cần cả tên, không cần thư mục, cũng không cần viết hoa đúng. "Where is my poster" sẽ chẳng tìm ra gì, vì không có tệp nào tên như vậy.',
        ],
        answer: 'rainforest',
        answerVn: 'rainforest (hoặc poster)',
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
      {
        id: 'c4',
        type: 'order',
        prompt: 'You deleted "homework" by mistake. Put the steps for getting it back into the right order.',
        promptVn: 'Em lỡ tay xoá "homework". Hãy sắp xếp các bước lấy nó lại theo đúng thứ tự.',
        bank: [
          { val: 'menu', text: 'Tap its ⋮ button (or right-click it)', textVn: 'Chạm vào nút ⋮ của nó (hoặc bấm chuột phải)' },
          { val: 'open', text: 'Open the Recycle Bin', textVn: 'Mở Recycle Bin' },
          { val: 'check', text: 'Open Documents: homework is back', textVn: 'Mở Documents: homework đã trở lại' },
          { val: 'find', text: 'Find homework in the list', textVn: 'Tìm homework trong danh sách' },
          { val: 'back', text: 'Choose Put it back', textVn: 'Chọn Put it back' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['open', 'find', 'menu', 'back', 'check'] },
        solution: [
          'A deleted file has only MOVED — to the Recycle Bin. So open the bin first, and find the file there.',
          'Its ⋮ button (or a right-click) opens its menu. In the bin, the action is **Put it back**.',
          'Put it back returns the file to the folder it came from. Open Documents to see it home again.',
        ],
        solutionVn: [
          'Tệp đã xoá chỉ là đã CHUYỂN ĐI — vào Recycle Bin. Nên hãy mở thùng rác trước, và tìm tệp trong đó.',
          'Nút ⋮ của nó (hoặc bấm chuột phải) mở trình đơn. Trong thùng rác, thao tác là **Put it back**.',
          'Put it back đưa tệp về đúng thư mục ban đầu. Mở Documents để thấy nó đã về nhà.',
        ],
        answer: 'Open the Recycle Bin → find homework → ⋮ (or right-click) → Put it back → check Documents.',
        answerVn: 'Mở Recycle Bin → tìm homework → ⋮ (hoặc chuột phải) → Put it back → kiểm tra Documents.',
      },
    ],
  },
];
