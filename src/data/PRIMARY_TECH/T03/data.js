// src/data/PRIMARY_TECH/T03/data.js
// T3 Typing Properly — the third unit of the Technology track
// (docs/digital-skills-course.md §6: "home row, both hands, don't look down"),
// built to the Year 7 standard from the start (docs/primary-tech/UPGRADE-PLAN.md
// §8.1 and §8.4). It sits after T2, which taught what Enter, Backspace, Shift
// and Caps Lock DO; this unit teaches HOW to type: posture, switching the
// keyboard to English, the home row and its bumps, every finger's own keys,
// reaching and coming home, the other hand's Shift for capitals, punctuation,
// and accuracy before speed.
//
// There is no Try It: the course map gives T3 none. The Typing Gym IS the
// doing, so it carries 30 XP (UPGRADE-PLAN §8.1), and runs every mode the
// engine has that fits a first typing unit — the home row, reaches up and down,
// capitals with the other hand's Shift, the unit's words and its sentences.
//
// GATE STRUCTURE (UPGRADE-PLAN §8.1):
//
//   Gate 0 · Learn   0   NOTES 20 · WORD_REC 15                               = 35
//   Gate 1 · Do      25  TYPE_GYM 30 · LABEL_IT 15 · POINT_IT 10 · WORKBOOK 15 = 70
//   Gate 2 · Prove   80  SHORT_ANSWERS 10 · DIAGRAMS 10 · ASSESSMENT 20 · GAMES 0 = 40
//
// 145 XP, capped at 100 by unitXPOf. Gate 1 is 25 of 35 (71%), Gate 2 is 80 of
// 105 (76%) — both inside the 80% rule the validator enforces. Re-derive them
// if any XP changes.
//
// This track IS bilingual (see trackRegistry): every learner-facing field needs
// its `vn*` twin and the validator enforces it. The Quiz and the Source
// Analysis render only their explanations bilingually, so those questions are
// written in deliberately plain English with the teaching carried in `expVn`.
//
// Module properties are written in full (`notes: notes,`) — a shorthand right
// after realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { pointIt } from './pointIt.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const T03_DATA = {
  meta: {
    id: 'T03',
    title: 'Typing Properly',
    desc: 'Type with all ten fingers and your eyes on the screen: sit well, switch the keyboard to English, rest on the home row, reach and come home, use the other hand’s Shift for capitals — and get it right before you get fast.',
    track: 'PRIMARY_TECH',
    icon: 'Grid3x3',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 15 },
      ],
    },
    {
      // 25 of the 35 XP before it (71%).
      id: 'practice',
      title: 'Gate 1: Do',
      threshold: 25,
      tasks: [
        { id: 'TYPE_GYM', dbKey: 'p26', maxXP: 30 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 15 },
        { id: 'POINT_IT', dbKey: 'p24', maxXP: 10 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
      ],
    },
    {
      // 80 of the 105 XP before it (76%).
      id: 'mastery',
      title: 'Gate 2: Prove',
      threshold: 80,
      tasks: [
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 10 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 10 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // The words of typing, in the order the deck meets them. The keyboard is in
  // English, and knowing what a key is called IS the skill (course doc §5.3).
  realWords: [
    {
      word: 'Touch typing', isReal: true, vn: 'Gõ mười ngón',
      def: 'Typing with all ten fingers, each one on its own keys, without looking at the keyboard.',
      vnDef: 'Gõ phím bằng cả mười ngón tay, mỗi ngón phụ trách những phím riêng, mà không nhìn xuống bàn phím.',
      sent: 'Touch typing is much faster than hunting for every key.',
      vnSent: 'Gõ mười ngón nhanh hơn nhiều so với đi tìm từng phím.',
    },
    {
      word: 'Posture', isReal: true, vn: 'Tư thế ngồi',
      def: 'The way you hold your body. Good posture for typing: back straight, feet flat, screen at eye level.',
      vnDef: 'Cách em giữ cơ thể. Tư thế tốt khi gõ phím: lưng thẳng, bàn chân đặt phẳng, màn hình ngang tầm mắt.',
      sent: 'Check your posture before you start typing.',
      vnSent: 'Hãy kiểm tra tư thế ngồi trước khi bắt đầu gõ.',
    },
    {
      word: 'Home row', isReal: true, vn: 'Hàng phím cơ sở',
      def: 'The middle row of letter keys, where your fingers rest: A S D F for the left hand and J K L ; for the right.',
      vnDef: 'Hàng phím chữ ở giữa, nơi các ngón tay nghỉ: A S D F cho tay trái và J K L ; cho tay phải.',
      sent: 'Put your fingers back on the home row.',
      vnSent: 'Hãy đặt các ngón tay trở lại hàng phím cơ sở.',
    },
    {
      word: 'Index finger', isReal: true, vn: 'Ngón trỏ',
      def: 'The finger next to your thumb. Your index fingers rest on F and J, the two keys with bumps.',
      vnDef: 'Ngón tay nằm cạnh ngón cái. Hai ngón trỏ của em đặt trên F và J, hai phím có gờ nổi.',
      sent: 'Feel for the bumps with your index fingers.',
      vnSent: 'Hãy dùng ngón trỏ sờ tìm các gờ nổi.',
    },
    {
      word: 'Space bar', isReal: true, vn: 'Phím cách',
      def: 'The long key at the bottom of the keyboard. You tap it with a thumb to put a space between words.',
      vnDef: 'Phím dài ở dưới cùng bàn phím. Em chạm vào nó bằng ngón cái để tạo khoảng cách giữa các từ.',
      sent: 'Tap the space bar with your thumb after each word.',
      vnSent: 'Chạm phím cách bằng ngón cái sau mỗi từ.',
    },
    {
      word: 'Shift', isReal: true, vn: 'Phím Shift',
      def: 'The key you hold down to type a capital letter or the top mark on a key. There is one on each side of the keyboard.',
      vnDef: 'Phím em giữ để gõ chữ in hoa hoặc ký hiệu ở phía trên của một phím. Mỗi bên bàn phím có một phím Shift.',
      sent: 'Hold the left Shift to type a capital J.',
      vnSent: 'Giữ phím Shift bên trái để gõ chữ J in hoa.',
    },
    {
      word: 'Capital letter', isReal: true, vn: 'Chữ in hoa',
      def: 'A big letter, like A, B or C. Names and the start of every sentence need one.',
      vnDef: 'Chữ cái lớn, như A, B hay C. Tên riêng và chữ đầu mỗi câu đều cần chữ in hoa.',
      sent: 'Start every sentence with a capital letter.',
      vnSent: 'Hãy bắt đầu mỗi câu bằng một chữ in hoa.',
    },
    {
      word: 'Caps Lock', isReal: true, vn: 'Phím Caps Lock',
      def: 'The key that makes every letter a capital until you press it again. For one capital, use Shift instead.',
      vnDef: 'Phím làm cho mọi chữ đều in hoa cho đến khi em bấm lại nó. Muốn một chữ in hoa thì dùng Shift.',
      sent: 'Caps Lock is on, so everything is in capitals.',
      vnSent: 'Phím Caps Lock đang bật, nên mọi chữ đều in hoa.',
    },
    {
      word: 'Full stop', isReal: true, vn: 'Dấu chấm',
      def: 'The dot at the end of a sentence. After it, type one space and then a capital letter.',
      vnDef: 'Dấu chấm ở cuối câu. Sau nó, em gõ một dấu cách rồi đến một chữ in hoa.',
      sent: 'Your right ring finger types the full stop.',
      vnSent: 'Ngón áp út tay phải của em gõ dấu chấm.',
    },
    {
      word: 'Question mark', isReal: true, vn: 'Dấu chấm hỏi',
      def: 'The mark at the end of a question. It is the top mark on the / key, so you hold Shift to type it.',
      vnDef: 'Dấu ở cuối câu hỏi. Nó là ký hiệu phía trên của phím /, nên em phải giữ Shift để gõ.',
      sent: 'Every question ends with a question mark.',
      vnSent: 'Mỗi câu hỏi đều kết thúc bằng dấu chấm hỏi.',
    },
    {
      word: 'Accuracy', isReal: true, vn: 'Độ chính xác',
      def: 'How many of the keys you pressed were right. 90% accuracy means 9 keys right in every 10.',
      vnDef: 'Số phím em bấm đúng là bao nhiêu. Độ chính xác 90% nghĩa là cứ 10 phím thì đúng 9.',
      sent: 'Get your accuracy up first, then your speed.',
      vnSent: 'Hãy nâng độ chính xác lên trước, rồi mới đến tốc độ.',
    },
    {
      word: 'Cursor', isReal: true, vn: 'Con trỏ',
      def: 'The flashing line on the screen that shows where the next letter you type will appear.',
      vnDef: 'Vạch nhấp nháy trên màn hình cho biết chữ tiếp theo em gõ sẽ hiện ở đâu.',
      sent: 'Backspace rubs out the letter just before the cursor.',
      vnSent: 'Phím Backspace xoá chữ ngay trước con trỏ.',
    },
  ],

  // Short Answers: three questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), short and concrete for a nine-year-old.
  // Suggested words are vocabulary a strong answer uses, never the fact a mark
  // line awards — "bumps", "opposite" and "mistakes cost time" are left out.
  shortQA: [
    {
      id: 'sq1',
      question: 'What is the home row, and how do you find it without looking at the keyboard?',
      vnTranslation: 'Hàng phím cơ sở là gì, và làm sao em tìm được nó mà không cần nhìn bàn phím?',
      suggestedWords: [['index finger', 'index fingers'], ['rest', 'resting'], ['left hand', 'right hand']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the home row is the middle row of letter keys, where the fingers rest between keys (A S D F for the left hand, J K L ; for the right).',
        '1 mark: the F and J keys have small bumps (raised lines) on them.',
        '1 mark: you feel for the bumps with your index fingers and let the other fingers rest on the keys beside them — so you never need to look down.',
      ],
      modelAnswer: 'The home row is the middle row of letter keys. It is where your fingers rest between keys: A, S, D and F for your left hand, and J, K, L and ; for your right hand. You can find it without looking because the F and J keys have small bumps on them. You feel for the bumps with your two index fingers, and then your other fingers rest on the keys next to them, so your eyes can stay on the screen.',
    },
    {
      id: 'sq2',
      question: 'Explain why it is better to type accurately first, and to try to type fast later.',
      vnTranslation: 'Hãy giải thích vì sao nên gõ chính xác trước, rồi sau đó mới cố gõ nhanh.',
      suggestedWords: [['Backspace'], ['practice', 'practise'], ['fingers']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: every mistake has to be noticed, rubbed out (for example with Backspace) and typed again, which takes extra time.',
        '1 mark: so typing fast with many mistakes can end up slower — or leave the work full of errors — compared with typing a little slower and getting the keys right.',
        '1 mark: speed comes by itself with practice once the fingers have learned the right keys (practising mistakes teaches the fingers the wrong moves).',
      ],
      modelAnswer: 'Every mistake costs time: you have to notice it, rub it out with Backspace and type it again. So someone who types very fast but gets lots of keys wrong can finish later than someone who types a bit slower and gets them right, and their work is full of errors. If you get the keys right first, your fingers learn the right moves, and the speed comes by itself as you practise. If you rush, your fingers practise the wrong moves instead.',
    },
    {
      id: 'sq3',
      question: 'You want to type a capital letter. Explain how you use Shift to do it, and why touch typists use the Shift key on the other side from the letter.',
      vnTranslation: 'Em muốn gõ một chữ in hoa. Hãy giải thích cách em dùng phím Shift để làm việc đó, và vì sao người gõ mười ngón dùng phím Shift ở phía bên kia so với chữ cái.',
      suggestedWords: [['little finger'], ['left hand', 'right hand'], ['home row']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: hold Shift down, press the letter, then let go (Shift makes that one letter a capital).',
        '1 mark: use the Shift on the opposite side from the letter, held by the little finger of the other hand (for example the right Shift for T, the left Shift for J).',
        '1 mark: because the hand that types the letter must stay free and on the home row — one hand cannot comfortably hold Shift and press its own letter at the same time.',
      ],
      modelAnswer: 'To type a capital, you hold Shift down, press the letter, and then let go. Touch typists use the Shift on the other side from the letter, held down by the little finger of the other hand. For a capital T, which is a left-hand key, the right little finger holds the right Shift. For a capital J, the left little finger holds the left Shift. This is because the hand that types the letter needs to stay free and on the home row. One hand cannot hold Shift and press its own letter without twisting and losing its place.',
    },
  ],

  // Source Analysis: reading a picture and judging it. Two MCQ and one written
  // (UPGRADE-PLAN §8.4). The deck sorts posture habits as words, so the first
  // source asks the student to READ a body; the deck scores one Typing Gym
  // result, so the second compares two typists.
  diagrams: [
    {
      id: 'diag_1_sitting_badly',
      type: 'mcq',
      inlineSvg: DIAGRAMS.POSTURE_BAD,
      imageAlt: 'Side view of a boy called Nam typing at a desk. He sits on the front edge of his chair, far from the backrest, with his back bent forward in a curve. His head is pushed forward and bent down over the keyboard, so he is looking at his hands instead of the screen. His wrists rest on the edge of the desk, bent upwards, and his feet hang in the air without reaching the floor.',
      promptText: 'Nam has typed like this for an hour, and now his back and neck hurt. What should he fix first?',
      options: [
        { val: 'A', text: 'Type faster, so that he finishes sooner.' },
        { val: 'B', text: 'Turn the brightness of the screen up.' },
        { val: 'C', text: 'Sit back in the chair with his back straight and his head up, eyes on the screen.' },
        { val: 'D', text: 'Nothing — pain after typing is normal.' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'His back and neck hurt because he is bent over: perched on the front of the chair, his back curves, and his head hangs down over the keys. Sitting back with a straight back, head up and eyes on the screen, fixes both. His feet and wrists need fixing too — a box under his feet, wrists floating above the keys — but they are not what hurts his back and neck. Pain is never "normal": it is a sign to change how you sit.',
      expVn: 'Lưng và cổ bạn ấy đau vì bạn ấy đang cúi gập người: ngồi ở mép ghế, lưng cong xuống, còn đầu thì cúi gằm xuống bàn phím. Ngồi lùi vào ghế với lưng thẳng, ngẩng đầu và mắt nhìn màn hình, sẽ sửa được cả hai. Bàn chân và cổ tay của bạn ấy cũng cần sửa — kê một cái hộp dưới chân, cổ tay nâng nhẹ trên bàn phím — nhưng đó không phải lý do lưng và cổ bị đau. Đau không bao giờ là "bình thường": đó là dấu hiệu cần thay đổi cách ngồi.',
    },
    {
      id: 'diag_2_two_typists',
      type: 'mcq',
      inlineSvg: DIAGRAMS.TYPISTS,
      imageAlt: 'Two Typing Gym result cards side by side. Typist A: speed 30 words a minute, 60% right; underneath, what A typed: "Teh cta sat no hte mat, adn teh dgo" with many letters marked wrong. Typist B: speed 15 words a minute, 95% right; underneath, what B typed: "The cat sat on the mat, and" with every letter right.',
      promptText: 'Two students copied the same sentence for one minute. Which is the better result?',
      options: [
        { val: 'A', text: 'Typist A — twice as fast, and speed is what counts.' },
        { val: 'B', text: 'Typist B — almost every key is right, so there is almost nothing to fix, and the speed will come with practice.' },
        { val: 'C', text: 'They are equally good: A is faster and B is more accurate, so it evens out.' },
        { val: 'D', text: 'Typist A — the computer will fix the mistakes later.' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'Typist A got 4 keys in every 10 wrong. Every one of those has to be found, rubbed out and typed again, which takes longer than typing it right the first time — and the computer cannot find every mistake for you. The Typing Gym scores accuracy first: Typist A would score about 5 out of 10, and Typist B 10 out of 10. Accuracy first; the speed comes with practice.',
      expVn: 'Người gõ A cứ 10 phím thì sai 4. Mỗi lỗi đều phải được tìm ra, xoá đi và gõ lại, nên mất nhiều thời gian hơn là gõ đúng ngay từ đầu — và máy tính không thể tìm hộ em mọi lỗi. Phòng tập gõ phím chấm độ chính xác trước: người gõ A sẽ được khoảng 5 trên 10 điểm, còn người gõ B được 10 trên 10. Gõ đúng trước; tốc độ sẽ đến khi em luyện tập.',
    },
    {
      id: 'diag_3_hunt_and_peck',
      inlineSvg: DIAGRAMS.HUNT_PECK,
      imageAlt: 'A boy called Minh sits at a computer with his head bent down, staring at the keyboard. He presses keys with one pointing finger; his other hand is in his lap. On the screen above him, which he is not looking at, he has typed: "Teh cat sat on teh mta."',
      promptText: 'Minh types like this. Explain how the bumps on F and J could help him, and why looking down at the keys makes his typing slow.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the bumps on F and J let him find the home row by touch — his index fingers feel for them — so he does not need to look at the keyboard.',
        '1 mark: looking down, his eyes have to go down to find each key and back up to find his place on the screen — two searches for every letter, which takes time.',
        '1 mark: while he looks down he cannot see the screen, so he does not notice his mistakes as he makes them (like "Teh" and "mta" in the picture), and they have to be found and fixed later.',
      ],
      modelAnswer: 'The bumps on F and J would let Minh find the home row just by feeling for them with his index fingers. Then his other fingers can rest on the keys next to them, and he never needs to look down to know where his hands are. Looking down makes him slow because for every letter his eyes go down to hunt for the key and then back up to find his place on the screen, which is two searches for every letter. Also, while he is looking at the keys he cannot see the screen, so he has not noticed his mistakes, like "Teh" instead of "The", and he will have to go back and fix them.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's keyboard and hands, labels and
  // leader lines stripped at runtime; what is printed on the keys (class="keep")
  // stays. (x, y) is where the leader meets the box and `to` is the part —
  // coordinates from KEYCAPS in diagrams.js, or `node scripts/svg-coords.mjs
  // PRIMARY_TECH/T03 LB_KEYBOARD`. Every bank carries one distractor that is
  // ABSENT from the picture: a scroll wheel is on a mouse, and there is no key
  // for the palm (palms float — that is the point).
  labelIt: [
    {
      id: 'keyboard',
      title: 'Label the keyboard', titleVn: 'Gắn nhãn bàn phím',
      inlineSvg: DIAGRAMS.LB_KEYBOARD, viewBox: '-300 -84 1500 494',
      // The big keys show their symbols only (←, →|, ⇪, ⇧, ↵), so this is
      // about where each key is and what it looks like, not word-matching.
      pins: [
        { id: 'p1', x: -24, y: 111, to: [38, 111], answer: 'tab' },
        { id: 'p2', x: -24, y: 167, to: [38, 167], answer: 'caps' },
        { id: 'p3', x: -24, y: 223, to: [38, 223], answer: 'shift' },
        { id: 'p4', x: 405, y: -26, to: [405, 152], answer: 'home' },
        { id: 'p5', x: 924, y: 55, to: [856, 55], answer: 'backspace' },
        { id: 'p6', x: 924, y: 167, to: [856, 167], answer: 'enter' },
        { id: 'p7', x: 447, y: 344, to: [447, 292], answer: 'space' },
      ],
      bank: [
        { val: 'home', text: 'Home row', textVn: 'Hàng phím cơ sở' },
        { val: 'space', text: 'Space bar', textVn: 'Phím cách' },
        { val: 'shift', text: 'Shift', textVn: 'Phím Shift' },
        { val: 'enter', text: 'Enter', textVn: 'Phím Enter' },
        { val: 'backspace', text: 'Backspace', textVn: 'Phím Backspace' },
        { val: 'caps', text: 'Caps Lock', textVn: 'Phím Caps Lock' },
        { val: 'tab', text: 'Tab', textVn: 'Phím Tab' },
        { val: 'wheel', text: 'Scroll wheel', textVn: 'Con lăn chuột' },
      ],
    },
    {
      id: 'hands',
      title: 'Label the fingers', titleVn: 'Gắn nhãn các ngón tay',
      inlineSvg: DIAGRAMS.LB_HANDS, viewBox: '-300 -110 1500 690',
      // The thumbs' box has two leader lines, one to each thumb.
      pins: [
        { id: 'p1', x: -24, y: 262, to: [166, 262], answer: 'lLittle' },
        { id: 'p2', x: 230, y: -30, to: [321, 204], side: 'above', answer: 'lIndex' },
        { id: 'p3', x: 580, y: -30, to: [489, 204], side: 'above', answer: 'rIndex' },
        { id: 'p4', x: 924, y: 262, to: [644, 262], answer: 'rLittle' },
        { id: 'p5', x: 405, y: 478, to: [[374, 286], [436, 286]], side: 'below', answer: 'thumbs' },
      ],
      bank: [
        { val: 'lLittle', text: 'Left little finger', textVn: 'Ngón út tay trái' },
        { val: 'lIndex', text: 'Left index finger', textVn: 'Ngón trỏ tay trái' },
        { val: 'rIndex', text: 'Right index finger', textVn: 'Ngón trỏ tay phải' },
        { val: 'rLittle', text: 'Right little finger', textVn: 'Ngón út tay phải' },
        { val: 'thumbs', text: 'Thumbs', textVn: 'Hai ngón cái' },
        { val: 'palm', text: 'Palm key', textVn: 'Phím lòng bàn tay' },
      ],
    },
  ],

  // Typing Gym (UPGRADE-PLAN §3.2, §8.2) — the doing, at 30 XP. Every line is
  // drawn fresh from a seed, so a second go is practice, not memory. Ten rounds
  // cycle the six modes: the home row, reaches up to the top row and down to
  // the bottom row, capitals with the OTHER hand's Shift (all four generated by
  // the engine), then this unit's own words and sentences — plain ASCII only,
  // each sentence a capital and a full stop (one a question mark).
  typeGym: {
    title: 'Typing Gym',
    titleVn: 'Phòng tập gõ phím',
    modes: ['home', 'top', 'bottom', 'shift', 'words', 'sentences'],
    rounds: 10,
    words: ['home row', 'keys', 'finger', 'thumb', 'shift', 'space bar', 'enter', 'screen', 'capital', 'comma', 'full stop', 'typing'],
    sentences: [
      'Sit up straight.',
      'Feet flat on the floor.',
      'Find the bumps on F and J.',
      'Rest your fingers on the home row.',
      'Reach up, then come home.',
      'Eyes on the screen.',
      'Is your keyboard on EN?',
      'Get it right, then get fast.',
    ],
    target: { wpm: 8, accuracy: 0.9 },
  },

  notes: notes,
  workbook: workbook,
  pointIt: pointIt,
  assessment: assessment,
  games: games,
};
