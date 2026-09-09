// src/data/PRIMARY_TECH/T04/data.js
// T4 Saving Your Work — the first unit built on the simulator
// (docs/primary-tech/BUILD-PLAN.md step 4, on the engine from step 3).
//
// This is the unit the whole SIM build exists for: "save a piece of work, name
// it so you will know it next week, and know where it went" is a job, not a
// fact, and there is no honest way to assess it with a multiple-choice question.
// Try It carries the doing; the Quiz asks the when and why the doing cannot.
//
// GATE STRUCTURE — the course doc's §3 shape minus TYPE_GYM, which is not built
// yet, and re-derived rather than copied:
//
//   Gate 0 · Learn   0   NOTES 10 · WORD_REC 10                     = 20
//   Gate 1 · Do      15  SIM 30 · POINT_IT 15 · WORKBOOK 10         = 55
//   Gate 2 · Prove   55  SHORT_ANSWERS 15 · ASSESSMENT 20 · GAMES 0 = 35
//
// Totals 110, capped at 100 by unitXPOf. Gate 1 sits at 15 of the 20 before it
// (75%); Gate 2 at 55 of 75 (73%). Both inside the 80% rule the validator
// enforces — re-derive whenever a task's XP changes.
//
// Note the shift from T1 and T7: Find It drops to 15 and the workbook to 10,
// because the simulator now does the work those were standing in for. The point
// of pointing at the Save As dialog here is only to name its two questions
// before the simulator asks them for real.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { pointIt } from './pointIt.js';
import { sim } from './sim.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const T04_DATA = {
  meta: {
    id: 'T04',
    title: 'Saving Your Work',
    desc: 'Save a piece of work, give it a name you will still understand next week, and know exactly which folder it went into — plus how to get it back when it is deleted.',
    track: 'PRIMARY_TECH',
    icon: 'Boxes',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 10 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Do',
      threshold: 15,
      tasks: [
        { id: 'SIM', dbKey: 'p25', maxXP: 30 },
        { id: 'POINT_IT', dbKey: 'p24', maxXP: 15 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 10 },
      ],
    },
    {
      id: 'mastery',
      title: 'Gate 2: Prove',
      threshold: 55,
      tasks: [
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 15 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  realWords: [
    {
      word: 'Save', isReal: true, vn: 'Lưu',
      def: 'To write your work onto the computer so it is still there after you close it.',
      vnDef: 'Ghi bài làm của em vào máy tính để nó vẫn còn đó sau khi em đóng lại.',
      sent: 'Save your work before you close the window.',
      vnSent: 'Hãy lưu bài trước khi em đóng cửa sổ.',
    },
    {
      word: 'Save As', isReal: true, vn: 'Lưu thành bản mới',
      def: 'To save the same work as a NEW file, with a different name or in a different folder. You end up with two.',
      vnDef: 'Lưu cùng một bài thành một tệp MỚI, với tên khác hoặc trong thư mục khác. Kết quả là em có hai tệp.',
      sent: 'Use Save As to keep your first draft.',
      vnSent: 'Hãy dùng Save As để giữ lại bản nháp đầu tiên.',
    },
    {
      word: 'File', isReal: true, vn: 'Tệp',
      def: 'One saved thing on a computer: a document, a picture, a song. It has a name and it lives in a folder.',
      vnDef: 'Một thứ đã lưu trên máy tính: một tài liệu, một tấm ảnh, một bài hát. Nó có tên và nằm trong một thư mục.',
      sent: 'Open the file you saved yesterday.',
      vnSent: 'Hãy mở tệp em đã lưu hôm qua.',
    },
    {
      word: 'File name', isReal: true, vn: 'Tên tệp',
      def: 'What a file is called. You choose it, and you are choosing it for yourself in the future.',
      vnDef: 'Tên gọi của một tệp. Em tự chọn, và em đang chọn cho chính em trong tương lai.',
      sent: 'Give it a file name you will remember.',
      vnSent: 'Hãy đặt cho nó một tên tệp mà em sẽ nhớ.',
    },
    {
      word: 'Folder', isReal: true, vn: 'Thư mục',
      def: 'A box on the computer that holds files, so they are not all in one pile.',
      vnDef: 'Một cái hộp trên máy tính chứa các tệp, để chúng không nằm lẫn lộn thành một đống.',
      sent: 'Put it in the Documents folder.',
      vnSent: 'Hãy để nó vào thư mục Documents.',
    },
    {
      word: 'Documents', isReal: true, vn: 'Thư mục Documents',
      def: 'The folder for work you made yourself. School work belongs here.',
      vnDef: 'Thư mục dành cho những gì chính em tạo ra. Bài vở ở trường thuộc về đây.',
      sent: 'My report is in Documents.',
      vnSent: 'Bài báo cáo của em nằm trong Documents.',
    },
    {
      word: 'Desktop', isReal: true, vn: 'Màn hình nền',
      def: 'The screen you see after logging in. It is also a folder, so things left there pile up in view.',
      vnDef: 'Màn hình em thấy sau khi đăng nhập. Nó cũng là một thư mục, nên thứ để đó sẽ chất đống ngay trước mắt.',
      sent: 'Do not leave everything on the desktop.',
      vnSent: 'Đừng để mọi thứ trên màn hình nền.',
    },
    {
      word: 'Rename', isReal: true, vn: 'Đổi tên',
      def: 'To change what a file is called, without changing what is inside it.',
      vnDef: 'Thay đổi tên gọi của một tệp, mà không thay đổi nội dung bên trong.',
      sent: 'Rename it to something you understand.',
      vnSent: 'Hãy đổi tên nó thành thứ gì đó em hiểu được.',
    },
    {
      word: 'Delete', isReal: true, vn: 'Xoá',
      def: 'To move a file to the Recycle Bin. It is not destroyed, and you can put it back.',
      vnDef: 'Chuyển một tệp vào Recycle Bin. Nó không bị huỷ, và em có thể lấy lại.',
      sent: 'Delete the ones you do not need.',
      vnSent: 'Hãy xoá những tệp em không cần.',
    },
    {
      word: 'Recycle Bin', isReal: true, vn: 'Thùng rác',
      def: 'The folder deleted files go to. Nothing there is really gone until the bin is emptied.',
      vnDef: 'Thư mục chứa các tệp đã xoá. Không gì trong đó thật sự mất cho đến khi thùng rác được dọn sạch.',
      sent: 'I found my homework in the Recycle Bin.',
      vnSent: 'Em đã tìm thấy bài tập của mình trong Recycle Bin.',
    },
  ],

  // Two questions, one mark per scheme line (docs/question-quality.md). No
  // suggested words: the vocabulary IS what the scheme awards here, so chips
  // would be spoilers (§3).
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between Save and Save As. Say how many files you end up with in each case, and give one reason you would choose Save As.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: Save writes over the same file, so you still have one file.',
        '1 mark: Save As makes a new file, so you end up with two.',
        '1 mark: gives a sensible reason to use Save As — to keep the old draft, to make a copy somewhere else, or to give it a different name.',
      ],
      modelAnswer: 'Save puts the changes back into the file you already have, so afterwards there is still only one file and the old version is gone. Save As makes a brand new file with the name and folder you choose, so you end up with two: the one you started with and the new one. I would use Save As when I want to keep my first draft and work on a copy, so that if the new version goes wrong I still have the old one.',
    },
    {
      id: 'sq2',
      question: 'A friend says "I saved my work but now I cannot find it anywhere". Explain what has most likely happened, and describe what they should do.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the file is almost certainly still on the computer (saving rarely fails).',
        '1 mark: they did not read the two questions in the box, so it has a name they did not choose or is in a folder they did not choose.',
        '1 mark: describes a way to find it — search for it by name, or look in the folder the computer would have used.',
      ],
      modelAnswer: 'The work is almost certainly still there. When the box appeared it asked what the file should be called and which folder to put it in, and they clicked past both, so the computer answered for them — it probably has a name like Document1 and it is in whichever folder the program uses by default. They should use the search box and type part of the name, or open Documents and look for something saved today. Next time, reading those two questions takes two seconds and saves all of this.',
    },
  ],

  notes: notes,
  workbook: workbook,
  pointIt: pointIt,
  sim: sim,
  assessment: assessment,
  games: games,
};
