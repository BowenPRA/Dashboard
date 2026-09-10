// src/data/ACELLUS/ALG_INEQ/data.js
// Acellus Algebra I — Inequalities and Intervals.
//
// Built from the students' own Acellus screenshots: one-step and two-step
// inequalities, a variable on both sides, a three-part compound inequality,
// absolute value equations and inequalities, interval notation read off a
// number line, and the set question (A ∩ B) that sits alongside them.
//
// The shape of the unit is deliberate. Acellus gives them an answer box and a
// green tick; what it does not give them is the WORKING. So the two big tasks
// here are the two halves of that working:
//
//   BALANCE   solve it one legal move at a time, with the beam tilting the way
//             the inequality points — and turning over, in front of them, the
//             moment they divide by a negative.
//   INTERVAL  draw the answer on the line and then write it in brackets, which
//             is the conversion the Acellus items actually test.
//
// NOTES is kept deliberately light (18 slides, most of them a picture and four
// lines) and carries eleven check questions, so the teaching load sits in the
// two interactive tasks rather than in a wall of reading.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { balance } from './balance.js';
import { intervals } from './intervals.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

// VALID TASK IDS: WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION,
// SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES, BALANCE, INTERVAL

export const ACELLUS_ALG_INEQ_DATA = {
  meta: {
    id: "ALG_INEQ",
    title: "Acellus: Inequalities",
    desc: "Solve inequalities step by step, graph the solution set, and write it in interval notation — including compound and absolute value inequalities.",
    track: "ACELLUS",
    icon: "Variable",
    themeColor: "bg-purple-500 border-purple-700"
  },

  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 }
      ]
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      tasks: [
        { id: "BALANCE", dbKey: "p14", maxXP: 20 },
        { id: "INTERVAL", dbKey: "p27", maxXP: 25 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "WORKBOOK", dbKey: "p11", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 }
      ]
    },
    {
      // Reward only, worth 0 XP, and gated on the quiz having been SAT rather
      // than passed — see resolveUnitTasks. The games live in the standalone
      // Arcade track now, so this tile never renders in the unit; declaring it
      // is what tells the arcade which map and tier this unit plays on.
      id: "arcade",
      title: "Arcade",
      threshold: 80,
      requires: "ASSESSMENT",
      tasks: [
        { id: "GAMES", dbKey: "p12", maxXP: 0 }
      ]
    }
  ],

  realWords: [
    { word: "Inequality", vn: "Bất phương trình", def: "A statement that one side is bigger or smaller than the other, using a sign like < or >.", vnDef: "Một mệnh đề nói rằng vế này lớn hơn hoặc nhỏ hơn vế kia, dùng dấu như < hoặc >.", sent: "The inequality x > 3 is true for millions of different numbers.", vnSent: "Bất phương trình x > 3 đúng với hàng triệu số khác nhau.", isReal: true },
    { word: "Solution Set", vn: "Tập nghiệm", def: "Every number that makes the statement true, taken together.", vnDef: "Tất cả các số làm cho mệnh đề đúng, gộp lại thành một tập.", sent: "We shade the solution set on the number line instead of listing it.", vnSent: "Chúng ta tô tập nghiệm trên trục số thay vì liệt kê ra.", isReal: true },
    { word: "Endpoint", vn: "Điểm mút", def: "The number at the edge of a solution set, drawn with a circle.", vnDef: "Con số ở rìa của tập nghiệm, được vẽ bằng một vòng tròn.", sent: "The endpoint is 5, but the open circle shows 5 is not included.", vnSent: "Điểm mút là 5, nhưng vòng tròn rỗng cho thấy 5 không được lấy.", isReal: true },
    { word: "Interval", vn: "Khoảng", def: "A continuous stretch of the number line, written between two brackets.", vnDef: "Một đoạn liền trên trục số, được viết giữa hai dấu ngoặc.", sent: "The interval (-3, 0] starts just after -3 and ends at 0.", vnSent: "Khoảng (-3, 0] bắt đầu ngay sau -3 và kết thúc tại 0.", isReal: true },
    { word: "Infinity", vn: "Vô cực", def: "The idea of going on forever; it is not a number you can reach.", vnDef: "Ý niệm về việc kéo dài mãi mãi; nó không phải là số mà bạn có thể chạm tới.", sent: "Because infinity is never reached, it always takes a round bracket.", vnSent: "Vì không bao giờ chạm tới vô cực, nó luôn dùng dấu ngoặc tròn.", isReal: true },
    { word: "Compound", vn: "Kép", def: "Made of two inequalities joined by the word AND or the word OR.", vnDef: "Gồm hai bất phương trình nối với nhau bằng từ AND hoặc từ OR.", sent: "The compound inequality -2 < x < 9 traps x between two limits.", vnSent: "Bất phương trình kép -2 < x < 9 kẹp x giữa hai giới hạn.", isReal: true },
    { word: "Union", vn: "Hợp", def: "Everything in either set, written with the cup symbol.", vnDef: "Tất cả những gì thuộc một trong hai tập, viết bằng ký hiệu hình cái cốc.", sent: "An OR answer is a union of two separate intervals.", vnSent: "Một đáp án dạng OR là hợp của hai khoảng riêng biệt.", isReal: true },
    { word: "Intersection", vn: "Giao", def: "Only what appears in both sets at once.", vnDef: "Chỉ những gì xuất hiện đồng thời trong cả hai tập.", sent: "If the two sets share no members, the intersection is empty.", vnSent: "Nếu hai tập không có phần tử chung, giao của chúng là rỗng.", isReal: true },
    { word: "Absolute Value", vn: "Giá trị tuyệt đối", def: "How far a number is from zero, with the direction thrown away.", vnDef: "Khoảng cách từ một số tới 0, bỏ qua hướng.", sent: "Absolute value is a distance, so it is never negative.", vnSent: "Giá trị tuyệt đối là một khoảng cách, nên không bao giờ âm.", isReal: true },
    { word: "Reverse", vn: "Đảo chiều", def: "To turn an inequality sign the other way round.", vnDef: "Xoay dấu bất phương trình sang hướng ngược lại.", sent: "You must reverse the sign after dividing both sides by a negative.", vnSent: "Bạn phải đảo chiều dấu sau khi chia cả hai vế cho một số âm.", isReal: true }
  ],

  notes,
  workbook,
  balance,
  intervals,
  assessment,
  games
};
