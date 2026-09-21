// src/data/PRIMARY_TECH/T03/workbook.js
// T3 Typing Properly — Practice (WORKBOOK, 15 XP). Twelve questions across the
// three tiers and five answer widgets — multiple choice, drag into targets
// (matching and sorting), dropdown-in-sentence, typed words in the blanks, and
// ordering — plus one question read off a picture (WB_RING). No two
// consecutive questions share a type:
//
//   Focus      mcq · dnd · fill_blank · inline
//   Practice   order · mcq (picture) · dnd · fill_blank
//   Challenge  inline · mcq · dnd · fill_blank
//
// Nothing here repeats a deck activity: the deck orders the moves for R, so
// the one ordering question here is a capital A (the other hand's Shift); the
// deck works out 45 of 50, so the accuracy sum here is 20 of 25 — which falls
// short of the goal. Typed boxes take WORDS or whole numbers only (the typed
// box marks by equivalence), with `accept`s for honest variants.
//
// Every question has a stepped solution, because the value we add over a
// worksheet is the METHOD (docs/workbook-tasks.md §1). Schema is in that doc.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'mcq',
        prompt: 'Where do the four fingers of your LEFT hand rest?',
        promptVn: 'Bốn ngón tay của bàn tay TRÁI đặt ở đâu?',
        options: [
          { val: 'a', text: 'On Q W E R', textVn: 'Trên Q W E R' },
          { val: 'b', text: 'On A S D F', textVn: 'Trên A S D F' },
          { val: 'c', text: 'On Z X C V', textVn: 'Trên Z X C V' },
          { val: 'd', text: 'On J K L ;', textVn: 'Trên J K L ;' },
        ],
        correct: 'b',
        solution: [
          'Your fingers rest on the **home row** — the middle row of letter keys.',
          'The left hand takes the left half of it: little finger on **A**, then **S**, **D**, and the index finger on **F**, the key with the bump.',
          'Q W E R is the row above (a reach up), Z X C V is the row below (a reach down), and J K L ; is where the RIGHT hand rests.',
        ],
        solutionVn: [
          'Các ngón tay em đặt trên **hàng phím cơ sở** — hàng phím chữ ở giữa.',
          'Tay trái nhận nửa bên trái: ngón út trên **A**, rồi **S**, **D**, và ngón trỏ trên **F**, phím có gờ nổi.',
          'Q W E R là hàng trên (với lên), Z X C V là hàng dưới (với xuống), còn J K L ; là chỗ của tay PHẢI.',
        ],
        answer: 'On A S D F',
        answerVn: 'Trên A S D F',
      },
      {
        id: 'f2',
        type: 'dnd',
        prompt: 'Drag each finger of your LEFT hand onto its home key.',
        promptVn: 'Kéo mỗi ngón tay của bàn tay TRÁI vào đúng phím cơ sở của nó.',
        bank: [
          { val: 'index', text: 'Index finger', textVn: 'Ngón trỏ' },
          { val: 'little', text: 'Little finger', textVn: 'Ngón út' },
          { val: 'middle', text: 'Middle finger', textVn: 'Ngón giữa' },
          { val: 'ring', text: 'Ring finger', textVn: 'Ngón áp út' },
        ],
        targets: [
          { id: 'a', title: 'A', titleVn: 'A' },
          { id: 's', title: 'S', titleVn: 'S' },
          { id: 'd', title: 'D', titleVn: 'D' },
          { id: 'f', title: 'F', titleVn: 'F' },
        ],
        correctSets: { a: ['little'], s: ['ring'], d: ['middle'], f: ['index'] },
        solution: [
          'Start from the bump: your **index finger** — the one next to your thumb — rests on **F**.',
          'The other fingers sit in order beside it, going left: **middle** on **D**, **ring** on **S**.',
          'The **little finger** is on the outside, on **A**.',
        ],
        solutionVn: [
          'Bắt đầu từ gờ nổi: **ngón trỏ** — ngón nằm cạnh ngón cái — đặt trên **F**.',
          'Các ngón khác xếp theo thứ tự bên cạnh, sang trái: ngón **giữa** trên **D**, ngón **áp út** trên **S**.',
          '**Ngón út** ở ngoài cùng, trên **A**.',
        ],
        answer: 'A: little · S: ring · D: middle · F: index',
        answerVn: 'A: ngón út · S: ngón áp út · D: ngón giữa · F: ngón trỏ',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: 'Type the missing English words.',
        promptVn: 'Gõ các từ tiếng Anh còn thiếu.',
        textParts: ['Typing with all ten fingers, without looking at the keys, is called ', ' typing. The middle row of letters, where your fingers rest, is the ', ' row.'],
        textPartsVn: ['Gõ bằng cả mười ngón tay, không nhìn xuống bàn phím, gọi là ', ' typing (gõ mười ngón). Hàng chữ ở giữa, nơi các ngón tay em đặt lên, là ', ' row (hàng phím cơ sở).'],
        blanks: {
          1: { correct: 'touch', width: 7, accept: [] },
          2: { correct: 'home', width: 6, accept: [] },
        },
        solution: [
          'Typing by feel, with each finger on its own keys, is **touch typing**: your fingers know the keys by touch, so your eyes can stay on the screen.',
          'The row your fingers come back to after every reach is the **home row** — like coming home.',
          'The whole sentence: typing with all ten fingers is called **touch** typing, and the middle row is the **home** row.',
        ],
        solutionVn: [
          'Gõ bằng cảm giác, mỗi ngón một nhóm phím riêng, gọi là **touch typing**: các ngón tay biết phím bằng cảm giác (touch), nên mắt có thể nhìn màn hình.',
          'Hàng phím mà các ngón tay trở về sau mỗi lần với là **home row** — giống như trở về nhà (home).',
          'Cả câu: gõ bằng cả mười ngón gọi là **touch** typing, còn hàng ở giữa là **home** row.',
        ],
        answer: 'touch; home',
        answerVn: 'touch; home',
      },
      {
        id: 'f4',
        type: 'inline',
        prompt: 'Choose the right words.',
        promptVn: 'Chọn đúng từ.',
        textParts: ['Your ', ' rest on the space bar, and the keys F and J have little ', ' so you can find them without looking.'],
        textPartsVn: ['Hai ', ' của em đặt trên phím cách, còn phím F và J có những ', ' nhỏ để em tìm được chúng mà không cần nhìn.'],
        blanks: {
          1: {
            options: [
              { val: 'thumbs', text: 'thumbs', textVn: 'ngón cái' },
              { val: 'index', text: 'index fingers', textVn: 'ngón trỏ' },
              { val: 'little', text: 'little fingers', textVn: 'ngón út' },
            ],
            correct: 'thumbs',
          },
          2: {
            options: [
              { val: 'lights', text: 'lights', textVn: 'đèn' },
              { val: 'bumps', text: 'bumps', textVn: 'gờ nổi' },
              { val: 'letters', text: 'letters', textVn: 'chữ cái' },
            ],
            correct: 'bumps',
          },
        },
        solution: [
          'The space bar is under your hands, where the **thumbs** already are — so a thumb taps it and no finger leaves the home row.',
          'The index fingers rest on F and J, and the little fingers look after the edges; neither of them is on the space bar.',
          'F and J carry small raised **bumps**, so your index fingers can find them by touch.',
        ],
        solutionVn: [
          'Phím cách nằm ngay dưới hai bàn tay, nơi **ngón cái** đã đặt sẵn — nên ngón cái chạm nó và không ngón nào phải rời hàng phím cơ sở.',
          'Ngón trỏ đặt trên F và J, còn ngón út lo các phím ở mép; không ngón nào trong đó đặt trên phím cách.',
          'F và J có những **gờ nổi** nhỏ, để hai ngón trỏ tìm được chúng bằng cảm giác.',
        ],
        answer: 'thumbs; bumps',
        answerVn: 'ngón cái; gờ nổi',
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
        prompt: 'You want a capital A. A is a left-hand key. Put the steps in order.',
        promptVn: 'Em muốn gõ chữ A in hoa. A là phím của tay trái. Hãy xếp các bước theo đúng thứ tự.',
        bank: [
          { val: 'release', text: 'Let go of Shift', textVn: 'Thả phím Shift ra' },
          { val: 'home', text: 'Fingers on the home row', textVn: 'Các ngón tay đặt trên hàng phím cơ sở' },
          { val: 'back', text: 'Your right little finger goes back to ;', textVn: 'Ngón út tay phải trở về phím ;' },
          { val: 'hold', text: 'Your right little finger holds down the right Shift', textVn: 'Ngón út tay phải giữ phím Shift bên phải' },
          { val: 'press', text: 'Your left little finger presses A', textVn: 'Ngón út tay trái bấm phím A' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['home', 'hold', 'press', 'release', 'back'] },
        solution: [
          'Start where every key starts: **fingers on the home row**.',
          'A belongs to the LEFT hand, so the **other** hand holds Shift: your **right little finger** reaches down to the right Shift and **holds** it.',
          'Your **left little finger** presses **A** — it is already resting on it.',
          '**Let go of Shift** as soon as the capital is typed, and bring the right little finger **back to ;**.',
        ],
        solutionVn: [
          'Bắt đầu như với mọi phím: **các ngón tay trên hàng phím cơ sở**.',
          'A thuộc tay TRÁI, nên **tay kia** giữ Shift: **ngón út tay phải** với xuống phím Shift bên phải và **giữ** nó.',
          '**Ngón út tay trái** bấm **A** — nó vốn đang đặt sẵn trên đó.',
          '**Thả Shift ra** ngay khi đã gõ xong chữ in hoa, rồi đưa ngón út tay phải **trở về phím ;**.',
        ],
        answer: 'Home row, hold the right Shift, press A, let go of Shift, right little finger back to ;.',
        answerVn: 'Hàng phím cơ sở, giữ Shift phải, bấm A, thả Shift, ngón út tay phải về phím ;.',
      },
      {
        id: 'p2',
        type: 'mcq',
        prompt: 'Which finger should press the key with the orange ring around it?',
        promptVn: 'Ngón tay nào nên bấm phím có vòng màu cam bao quanh?',
        inlineSvg: DIAGRAMS.WB_RING,
        options: [
          { val: 'a', text: 'Your left index finger', textVn: 'Ngón trỏ tay trái' },
          { val: 'b', text: 'Your left middle finger', textVn: 'Ngón giữa tay trái' },
          { val: 'c', text: 'Your left ring finger', textVn: 'Ngón áp út tay trái' },
          { val: 'd', text: 'Your right index finger', textVn: 'Ngón trỏ tay phải' },
        ],
        correct: 'b',
        solution: [
          'The ringed key is **C**, in the bottom row.',
          'Go straight up from C to the home row: the key above it is **D**, and D is the home key of your **left middle finger**.',
          'So C is a reach **down** for the left middle finger — the same finger does E above D and C below it.',
        ],
        solutionVn: [
          'Phím có vòng cam là **C**, ở hàng dưới.',
          'Đi thẳng lên từ C tới hàng phím cơ sở: phím phía trên nó là **D**, và D là phím cơ sở của **ngón giữa tay trái**.',
          'Vậy C là một lần với **xuống** của ngón giữa tay trái — cùng một ngón đó gõ E ở trên D và C ở dưới D.',
        ],
        answer: 'Your left middle finger',
        answerVn: 'Ngón giữa tay trái',
      },
      {
        id: 'p3',
        type: 'dnd',
        prompt: 'Which hand presses each key? Sort the eight.',
        promptVn: 'Tay nào bấm mỗi phím? Hãy phân loại tám phím.',
        bank: [
          { val: 't', text: 'T', textVn: 'T' },
          { val: 'y', text: 'Y', textVn: 'Y' },
          { val: 'g', text: 'G', textVn: 'G' },
          { val: 'h', text: 'H', textVn: 'H' },
          { val: 'b', text: 'B', textVn: 'B' },
          { val: 'n', text: 'N', textVn: 'N' },
          { val: 'q', text: 'Q', textVn: 'Q' },
          { val: 'p', text: 'P', textVn: 'P' },
        ],
        targets: [
          { id: 'left', title: 'Left hand', titleVn: 'Tay trái' },
          { id: 'right', title: 'Right hand', titleVn: 'Tay phải' },
        ],
        correctSets: { left: ['t', 'g', 'b', 'q'], right: ['y', 'h', 'n', 'p'] },
        solution: [
          'Q and P are easy: they are at the two ends of the top row, so Q is the **left** little finger’s and P is the **right** little finger’s.',
          'The middle is where it gets tricky. The two index fingers each look after **two columns**: the left one has R F V and **T G B**, the right one has **Y H N** and U J M.',
          'So the line between the hands runs between **T and Y**, **G and H**, and **B and N**.',
        ],
        solutionVn: [
          'Q và P thì dễ: chúng nằm ở hai đầu hàng trên, nên Q là của ngón út tay **trái**, P là của ngón út tay **phải**.',
          'Phần giữa mới khó. Mỗi ngón trỏ phụ trách **hai cột**: ngón trỏ trái có R F V và **T G B**, ngón trỏ phải có **Y H N** và U J M.',
          'Vì vậy ranh giới giữa hai tay chạy giữa **T và Y**, **G và H**, và **B và N**.',
        ],
        answer: 'Left hand: T, G, B, Q · Right hand: Y, H, N, P',
        answerVn: 'Tay trái: T, G, B, Q · Tay phải: Y, H, N, P',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: 'Every class is an English class. Type the missing English words.',
        promptVn: 'Mỗi buổi học đều là một buổi học tiếng Anh. Gõ các từ tiếng Anh còn thiếu.',
        textParts: ['After a full stop, type one ', ', then begin the next sentence with a ', ' letter.'],
        textPartsVn: ['Sau dấu chấm, gõ một ', ' (dấu cách), rồi bắt đầu câu tiếp theo bằng một chữ ', ' (in hoa).'],
        blanks: {
          1: { correct: 'space', width: 7, accept: [] },
          2: { correct: 'capital', width: 8, accept: [] },
        },
        solution: [
          'A **full stop** ends a sentence.',
          'Then one tap of the space bar with a thumb: one **space**.',
          'A new sentence starts with a **capital** letter — so the other hand’s little finger holds Shift for the first letter.',
        ],
        solutionVn: [
          '**Dấu chấm** kết thúc một câu.',
          'Sau đó dùng ngón cái chạm phím cách một lần: một dấu cách (**space**).',
          'Câu mới bắt đầu bằng một chữ in hoa (**capital** letter) — nên ngón út của tay kia giữ Shift cho chữ đầu tiên.',
        ],
        answer: 'space; capital',
        answerVn: 'space; capital',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        type: 'inline',
        prompt: 'You are typing the names "Tom and Lan". Choose the right Shift for each capital.',
        promptVn: 'Em đang gõ hai cái tên "Tom and Lan". Chọn đúng phím Shift cho mỗi chữ in hoa.',
        textParts: ['For the capital T, hold the ', '. For the capital L, hold the ', '.'],
        textPartsVn: ['Với chữ T in hoa, giữ ', '. Với chữ L in hoa, giữ ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'left', text: 'left Shift', textVn: 'phím Shift bên trái' },
              { val: 'right', text: 'right Shift', textVn: 'phím Shift bên phải' },
              { val: 'caps', text: 'Caps Lock', textVn: 'phím Caps Lock' },
            ],
            correct: 'right',
          },
          2: {
            options: [
              { val: 'left', text: 'left Shift', textVn: 'phím Shift bên trái' },
              { val: 'right', text: 'right Shift', textVn: 'phím Shift bên phải' },
              { val: 'caps', text: 'Caps Lock', textVn: 'phím Caps Lock' },
            ],
            correct: 'left',
          },
        },
        solution: [
          'First decide which hand types the letter. **T** is in the left index finger’s columns, so it is a **left-hand** key.',
          'The other hand holds Shift, so T takes the **right Shift**.',
          '**L** is the home key of your right ring finger — a **right-hand** key — so it takes the **left Shift**. Caps Lock would make every letter a capital, not just one.',
        ],
        solutionVn: [
          'Trước hết xác định tay nào gõ chữ đó. **T** nằm trong các cột của ngón trỏ tay trái, nên nó là phím của **tay trái**.',
          'Tay kia giữ Shift, nên chữ T dùng **Shift bên phải**.',
          '**L** là phím cơ sở của ngón áp út tay phải — một phím của **tay phải** — nên nó dùng **Shift bên trái**. Caps Lock sẽ làm mọi chữ in hoa, không chỉ một chữ.',
        ],
        answer: 'T: the right Shift · L: the left Shift',
        answerVn: 'T: Shift bên phải · L: Shift bên trái',
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: 'Vietnamese typing (Telex) has been left on. You type four English words. Which one comes out CHANGED?',
        promptVn: 'Bộ gõ tiếng Việt (Telex) vẫn đang bật. Em gõ bốn từ tiếng Anh. Từ nào sẽ bị THAY ĐỔI?',
        options: [
          { val: 'a', text: 'cat', textVn: 'cat' },
          { val: 'b', text: 'sun', textVn: 'sun' },
          { val: 'c', text: 'see', textVn: 'see' },
          { val: 'd', text: 'dog', textVn: 'dog' },
        ],
        correct: 'c',
        solution: [
          'Telex turns some pairs of letters into Vietnamese letters: **aa** becomes **â**, **ee** becomes **ê**, **oo** becomes **ô**, and **dd** becomes **đ**.',
          'Look for a double letter: cat, sun and dog have none, so they come out as typed.',
          '**see** has **ee**, so it comes out as **sê**. The fix is not to type differently — it is to switch the keyboard to **EN** first.',
        ],
        solutionVn: [
          'Telex biến một số cặp chữ thành chữ tiếng Việt: **aa** thành **â**, **ee** thành **ê**, **oo** thành **ô**, và **dd** thành **đ**.',
          'Hãy tìm chữ cái lặp đôi: cat, sun và dog không có, nên hiện ra đúng như gõ.',
          '**see** có **ee**, nên hiện ra thành **sê**. Cách sửa không phải là gõ khác đi — mà là chuyển bàn phím sang **EN** trước.',
        ],
        answer: 'see (it comes out as sê)',
        answerVn: 'see (hiện ra thành sê)',
      },
      {
        id: 'c3',
        type: 'dnd',
        prompt: 'Something is going wrong. Drag the fix onto each problem.',
        promptVn: 'Có điều gì đó không ổn. Hãy kéo cách sửa vào đúng từng vấn đề.',
        bank: [
          { val: 'slow', text: 'Slow down and aim for fewer wrong keys', textVn: 'Chậm lại và cố gõ sai ít phím hơn' },
          { val: 'bumps', text: 'Feel for the bumps on F and J', textVn: 'Sờ tìm gờ nổi trên F và J' },
          { val: 'sit', text: 'Sit back, back straight, screen at eye level', textVn: 'Ngồi sâu vào ghế, lưng thẳng, màn hình ngang tầm mắt' },
          { val: 'en', text: 'Switch the keyboard to EN', textVn: 'Chuyển bàn phím sang EN' },
        ],
        targets: [
          { id: 'oneout', title: 'Every letter comes out one key wrong', titleVn: 'Chữ nào cũng bị lệch một phím' },
          { id: 'telex', title: 'English words come out with â and đ in them', titleVn: 'Từ tiếng Anh hiện ra có chữ â và đ' },
          { id: 'ache', title: 'Your back and neck ache after typing', titleVn: 'Lưng và cổ em bị mỏi sau khi gõ' },
          { id: 'wrong', title: 'Fast — but only 60% right', titleVn: 'Nhanh — nhưng chỉ đúng 60%' },
        ],
        correctSets: { oneout: ['bumps'], telex: ['en'], ache: ['sit'], wrong: ['slow'] },
        solution: [
          '**One key wrong every time** means your hand is one key out: feel for the **bumps** on F and J to put it back.',
          '**â and đ** in English words mean Vietnamese typing is on: switch to **EN**.',
          'An **aching back and neck** come from bending: sit back, back straight, screen at eye level. And **fast but 60% right** means slow down — accuracy first.',
        ],
        solutionVn: [
          '**Lần nào cũng lệch một phím** nghĩa là tay em đang lệch một phím: sờ tìm **gờ nổi** trên F và J để đặt lại.',
          '**â và đ** trong từ tiếng Anh nghĩa là bộ gõ tiếng Việt đang bật: chuyển sang **EN**.',
          '**Lưng và cổ mỏi** là do cúi gập người: ngồi sâu vào ghế, lưng thẳng, màn hình ngang tầm mắt. Còn **nhanh nhưng chỉ đúng 60%** thì phải chậm lại — chính xác trước.',
        ],
        answer: 'One key out: the bumps · â and đ: EN · Aching: sit properly · 60% right: slow down',
        answerVn: 'Lệch một phím: gờ nổi · â và đ: EN · Mỏi: ngồi đúng · Đúng 60%: chậm lại',
      },
      {
        id: 'c4',
        type: 'fill_blank',
        prompt: 'Work it out, then type the two numbers.',
        promptVn: 'Hãy tính, rồi gõ hai con số.',
        textParts: ['You press 25 keys and 5 are wrong, so ', ' keys are right. Out of every 100 keys, that is ', ' right.'],
        textPartsVn: ['Em bấm 25 phím và 5 phím sai, vậy có ', ' phím đúng. Tính trên mỗi 100 phím, thì có ', ' phím đúng.'],
        blanks: {
          1: { correct: '20', width: 4, accept: [] },
          2: { correct: '80', width: 4, accept: [] },
        },
        solution: [
          'Right keys = keys pressed − wrong keys: 25 − 5 = **20**.',
          '25 keys fit into 100 four times, so multiply both by 4: 20 right out of 25 is **80** right out of 100.',
          'That is **80%** — below the Typing Gym’s goal of 90%. Time to slow down a little.',
        ],
        solutionVn: [
          'Số phím đúng = số phím đã bấm − số phím sai: 25 − 5 = **20**.',
          '100 gấp 25 bốn lần, nên nhân cả hai số với 4: 20 phím đúng trên 25 là **80** phím đúng trên 100.',
          'Tức là **80%** — thấp hơn mục tiêu 90% của Phòng tập gõ phím. Đã đến lúc chậm lại một chút.',
        ],
        answer: '20; 80',
        answerVn: '20; 80',
      },
    ],
  },
];
