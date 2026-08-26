// src/data/PHYSICS/FORCE_1A/notes.js
// FORCE_1A — Adding Force Vectors. Built on the flexible layout system, and
// rewritten against docs/lesson-standard.md for a solo Vietnamese ESL reader.
//
// The obstacle this deck is arranged around: a student who can add 4 and 3 will
// answer 7 for two forces at a right angle, and nothing that follows lands until
// that answer has been felt to be wrong. So the hook is a question with NO
// numbers on it (§1.2), the reveal comes next, and the student personally makes
// 8 + 6 come out as 14, then 10, then 2 in the widget before any machinery is
// introduced.
//
// What the rewrite changed, and why:
//   - ONE IDEA PER SLIDE (§1.4). The old deck put a definition, a notation rule
//     and an angle convention on a single slide. Splitting is free; a slide the
//     student skims is not. 12 slides became 21, and each one now says one thing.
//   - SHORT SENTENCES, PLAIN WORDS. No idiom ("lies half the time"), no
//     metaphor ("the machinery earns attention"), no clause stacking. The
//     physics is the hard part; the English must not be.
//   - COPY-DOWN IS ONLY COPY-DOWN (§1.3). `>` renders as the orange "write this
//     down" bumper, so it now carries definitions and formulas and nothing else.
//     The widget instructions moved to a task-toned note, which is exactly the
//     mistake §1.3 exists to prevent.
//   - AN ENGLISH SLIDE (§1.1), placed where the words actually bite: resolve,
//     component, resultant, and the sentence pattern "acts at 30°".
//   - WORKED EXAMPLES GET THEIR OWN SLIDES, as numbered steps, instead of being
//     squeezed into an example box beside dense prose.
//   - A COUNTABLE RECAP (§1.7) that names what the notebook should contain, and
//     two deadpan word problems before it (§2.6).
//
// Slide narration is derived from position (slideAudioUrl), so changing the
// number or order of slides means deleting public/audio/PHYSICS/FORCE_1A/slide_*
// and re-running `npm run sync-audio`. Otherwise every slide narrates the text
// of whichever slide used to sit at its index.
import { DIAGRAMS } from './diagrams.js';

export const notes = [
  // 1 ── Opener + the starter task they do while settling ──────────────────
  {
    layout: 'hero',
    color: '#6366f1',
    icon: 'Magnet',
    brand: 'Physics',
    brandVn: 'Vật lý',
    eyebrow: 'Unit 1A · Forces',
    eyebrowVn: 'Bài 1A · Lực',
    title: 'Adding Force Vectors',
    titleVn: 'Cộng Vectơ Lực',
    objective: 'By the end of this lesson you can take two forces and find the one force that does the same job.',
    objectiveVn: 'Học xong bài này, em có thể lấy hai lực và tìm ra một lực duy nhất làm được đúng việc đó.',
    card: {
      icon: 'Pencil',
      badge: 'Do this first, in your notebook',
      badgeVn: 'Làm ngay điều này vào vở',
      text: 'Draw an arrow **5 cm** long. Point it at the top-right corner of the page. Next to it, write **5 N**.',
      textVn: 'Vẽ một mũi tên dài **5 cm**. Cho nó chỉ về góc trên bên phải của trang giấy. Bên cạnh, viết **5 N**.',
    },
  },

  // 2 ── The hook. A question, on its own, with no numbers on it. ──────────
  {
    layout: 'statement',
    accent: '#f59e0b',
    icon: 'HelpCircle',
    eyebrow: 'Think first',
    eyebrowVn: 'Hãy nghĩ trước',
    title: 'Two Ropes, One Box',
    titleVn: 'Hai Sợi Dây, Một Cái Thùng',
    text: 'Two ropes pull the same box. Each rope pulls a different way. Is the total pull the two pulls added together?',
    textVn: 'Hai sợi dây cùng kéo một cái thùng. Mỗi dây kéo về một hướng khác nhau. Tổng lực kéo có bằng hai lực cộng lại không?',
    sub: 'Say **yes** or **no**. Then say why. Do not use a calculator.',
    subVn: 'Hãy trả lời **có** hoặc **không**. Rồi nói vì sao. Đừng dùng máy tính.',
  },

  // 3 ── The reveal. The gap between their guess and 5 N is the lesson. ────
  {
    layout: 'split',
    icon: 'AlertTriangle',
    accent: '#ef4444',
    side: 'left',
    ratio: 45,
    title: 'The Answer Is No',
    titleVn: 'Câu Trả Lời Là Không',
    content:
      'Rope A pulls with 4 N. Rope B pulls with 3 N. The two ropes make a right angle.\n\n' +
      'The box does not feel 7 N. It feels **5 N**.\n\n' +
      'You may only add the sizes when both forces point **the same way**. Any other time, the two arrows and the answer make a **triangle**.\n\n' +
      '> **Resultant:** the one force that does the same job as all the forces together. We write it **R**.',
    contentVn:
      'Dây A kéo 4 N. Dây B kéo 3 N. Hai dây tạo với nhau một góc vuông.\n\n' +
      'Cái thùng không chịu 7 N. Nó chịu **5 N**.\n\n' +
      'Em chỉ được cộng thẳng độ lớn khi hai lực chỉ **cùng một hướng**. Còn lại, hai mũi tên và đáp án tạo thành một **tam giác**.\n\n' +
      '> **Lực tổng hợp:** lực duy nhất làm được đúng việc mà tất cả các lực cùng làm. Ta ký hiệu là **R**.',
    inlineSvg: DIAGRAMS.NOTES_WHY_NOT_ADD,
    check: {
      id: 'chk_not_seven',
      q: 'A 6 N force points east. An 8 N force points north. How big is the resultant?',
      qVn: 'Một lực 6 N chỉ về hướng đông. Một lực 8 N chỉ về hướng bắc. Lực tổng hợp lớn bao nhiêu?',
      options: [
        { val: 'A', text: '10 N', textVn: '10 N' },
        { val: 'B', text: '14 N, because 6 + 8 = 14', textVn: '14 N, vì 6 + 8 = 14' },
        { val: 'C', text: '2 N, because 8 − 6 = 2', textVn: '2 N, vì 8 − 6 = 2' },
      ],
      correct: 'A',
      expEn: 'The two forces make a right angle. So they make a right triangle, and the resultant is the long side: √(6² + 8²) = √100 = 10 N. 14 N is only right if both forces point the same way. 2 N is only right if they point at each other.',
      expVn: 'Hai lực tạo thành góc vuông. Vậy chúng tạo thành tam giác vuông, và lực tổng hợp là cạnh dài: √(6² + 8²) = √100 = 10 N. 14 N chỉ đúng nếu hai lực cùng hướng. 2 N chỉ đúng nếu chúng chỉ vào nhau.',
    },
  },

  // 4 ── One idea: a force carries two numbers, not one. ───────────────────
  {
    layout: 'split',
    icon: 'Compass',
    accent: '#3b82f6',
    ratio: 45,
    title: 'A Force Has a Size and a Direction',
    titleVn: 'Lực Có Độ Lớn Và Hướng',
    content:
      'Look at the three arrows. All three forces are 50 N. But they do different jobs, because they point different ways.\n\n' +
      'Mass is not like this. 8 kg is 8 kg. It does not point anywhere.\n\n' +
      '> **Vector:** something with a **size** and a **direction**. Force is a vector.\n' +
      '> **Scalar:** something with a size only. Mass is a scalar.',
    contentVn:
      'Hãy nhìn ba mũi tên. Cả ba lực đều bằng 50 N. Nhưng chúng làm những việc khác nhau, vì chúng chỉ về các hướng khác nhau.\n\n' +
      'Khối lượng thì không như vậy. 8 kg là 8 kg. Nó không chỉ về đâu cả.\n\n' +
      '> **Vectơ:** thứ có **độ lớn** và **hướng**. Lực là một vectơ.\n' +
      '> **Đại lượng vô hướng:** thứ chỉ có độ lớn. Khối lượng là đại lượng vô hướng.',
    inlineSvg: DIAGRAMS.NOTES_SIZE_AND_DIRECTION,
    notes: [
      {
        tone: 'info',
        text: 'An arrow carries both numbers at once. Its **length** is the size. The way it **points** is the direction.',
        textVn: 'Một mũi tên mang cả hai con số cùng lúc. **Độ dài** là độ lớn. **Hướng chỉ** là hướng.',
      },
    ],
  },

  // 5 ── One idea: the angle convention. Everything later assumes it. ──────
  {
    layout: 'split',
    icon: 'Compass',
    accent: '#3b82f6',
    ratio: 45,
    title: 'How We Write a Force',
    titleVn: 'Cách Viết Một Lực',
    content:
      'We write the two numbers together, like this: **50 N at 45°**.\n\n' +
      'The angle needs a rule. Without one, nobody knows where the angle starts.\n\n' +
      '> Start at the **+x axis**. That is the direction "right".\n' +
      '> Turn **anticlockwise**.\n' +
      '> So 0° is right, 90° is up, 180° is left, 270° is down.',
    contentVn:
      'Ta viết hai con số cùng nhau, như thế này: **50 N tại 45°**.\n\n' +
      'Góc cần có một quy tắc. Nếu không, không ai biết góc bắt đầu từ đâu.\n\n' +
      '> Bắt đầu từ **trục +x**. Đó là hướng "sang phải".\n' +
      '> Quay **ngược chiều kim đồng hồ**.\n' +
      '> Vậy 0° là phải, 90° là lên, 180° là trái, 270° là xuống.',
    inlineSvg: DIAGRAMS.NOTES_ANGLE_RULE,
    drawThis: true,
    check: {
      id: 'chk_angle_rule',
      q: 'A force acts at 180°. Which way does it point?',
      qVn: 'Một lực tác dụng tại 180°. Nó chỉ về hướng nào?',
      options: [
        { val: 'A', text: 'Left', textVn: 'Sang trái' },
        { val: 'B', text: 'Up', textVn: 'Lên trên' },
        { val: 'C', text: 'Down', textVn: 'Xuống dưới' },
      ],
      correct: 'A',
      expEn: 'Start at the +x axis, which points right. Turn anticlockwise. After 90° you are pointing up. After another 90° — so 180° in total — you are pointing left. Up is 90° and down is 270°.',
      expVn: 'Bắt đầu từ trục +x, hướng sang phải. Quay ngược chiều kim đồng hồ. Sau 90° em chỉ lên trên. Sau thêm 90° nữa — tức là tổng 180° — em chỉ sang trái. Lên trên là 90° và xuống dưới là 270°.',
    },
  },

  // 6 ── Every class is an English class (§1.1). The words, before they bite.
  {
    layout: 'stack',
    icon: 'Languages',
    accent: '#5c2483',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi giờ học đều là giờ học tiếng Anh',
    title: 'Four Words You Will Meet Today',
    titleVn: 'Bốn Từ Em Sẽ Gặp Hôm Nay',
    columns: 2,
    content: 'Read each one out loud before you go on.',
    contentVn: 'Hãy đọc to từng từ trước khi học tiếp.',
    notes: [
      {
        tone: 'write',
        text: '**Magnitude** = the size of the force, with no direction. "A magnitude of 60 N."',
        textVn: '**Magnitude** (độ lớn) = độ lớn của lực, không kể hướng. "Độ lớn 60 N."',
      },
      {
        tone: 'write',
        text: '**Resultant** = the one force that replaces all the others. It is **not** the same word as "result".',
        textVn: '**Resultant** (lực tổng hợp) = lực duy nhất thay cho tất cả các lực kia. Nó **không** phải là từ "result" (kết quả).',
      },
      {
        tone: 'write',
        text: '**Component** = one part of a force. In this lesson we also call it the **x-part** or the **y-part**. Same thing.',
        textVn: '**Component** (thành phần) = một phần của lực. Trong bài này ta cũng gọi là **phần x** hoặc **phần y**. Cùng một nghĩa.',
      },
      {
        tone: 'write',
        text: '**Resolve** = to split one force into its x-part and its y-part. "Resolve the force."',
        textVn: '**Resolve** (phân tích) = tách một lực thành phần x và phần y. "Phân tích lực."',
      },
      {
        tone: 'theory',
        text: 'A question will say "a force **acts at** 30°". That just means the force **points** in that direction.',
        textVn: 'Đề bài sẽ viết "a force **acts at** 30°". Câu đó chỉ có nghĩa là lực **chỉ** về hướng đó.',
      },
      {
        tone: 'theory',
        text: 'Careful: the **x-axis** is the line on the grid. The **x-part** is a piece of a force. Different things.',
        textVn: 'Cẩn thận: **trục x** là đường kẻ trên lưới. **Phần x** là một phần của lực. Hai thứ khác nhau.',
      },
    ],
  },

  // 7 ── Ask before you tell, with their own hands on it. The pivot slide. ─
  {
    layout: 'split',
    icon: 'Move3d',
    accent: '#6366f1',
    ratio: 40,
    title: 'Try It Yourself',
    titleVn: 'Tự Em Thử Đi',
    content:
      'Drag the round point at the end of an arrow. The green arrow **R** is the answer. It moves when you move.\n\n' +
      'Now press the three buttons and watch R change.\n\n' +
      'Same way → R = 14.   Right angle → R = 10.   Against → R = 2.\n\n' +
      'Nothing was taken away. The forces only stopped helping each other.',
    contentVn:
      'Hãy kéo điểm tròn ở đầu mũi tên. Mũi tên xanh lá **R** là đáp án. Nó di chuyển khi em kéo.\n\n' +
      'Bây giờ bấm ba nút và xem R thay đổi.\n\n' +
      'Cùng hướng → R = 14.   Vuông góc → R = 10.   Ngược hướng → R = 2.\n\n' +
      'Không có gì bị lấy đi cả. Hai lực chỉ thôi hỗ trợ nhau mà thôi.',
    widget: { type: 'VectorLab', params: { a: { mag: 8, angle: 0 }, b: { mag: 6, angle: 90 }, show: 'chain', span: 16 } },
    notes: [
      {
        tone: 'task',
        badge: 'Try this',
        badgeVn: 'Thử làm',
        text: 'Press all three buttons. Then say **why** R gets smaller when the two arrows stop pointing the same way.',
        textVn: 'Bấm cả ba nút. Rồi nói **vì sao** R nhỏ đi khi hai mũi tên không còn cùng hướng.',
      },
    ],
    check: {
      id: 'chk_biggest',
      q: 'Two forces keep their sizes, but you may turn them. When is the resultant the biggest?',
      qVn: 'Hai lực giữ nguyên độ lớn, nhưng em được xoay chúng. Khi nào lực tổng hợp lớn nhất?',
      options: [
        { val: 'A', text: 'When they point the same way', textVn: 'Khi chúng cùng một hướng' },
        { val: 'B', text: 'When they make a right angle', textVn: 'Khi chúng tạo thành góc vuông' },
        { val: 'C', text: 'When they point at each other', textVn: 'Khi chúng chỉ vào nhau' },
      ],
      correct: 'A',
      expEn: 'When both forces point the same way, every newton of one force adds to every newton of the other. That is the only time you get the plain sum. Turn them apart and the resultant gets smaller and smaller, down to the difference when they point at each other.',
      expVn: 'Khi hai lực cùng hướng, mỗi newton của lực này cộng thêm vào mỗi newton của lực kia. Đó là lần duy nhất em được tổng thường. Xoay chúng tách ra thì lực tổng hợp nhỏ dần, cho tới bằng hiệu số khi chúng chỉ vào nhau.',
    },
  },

  // 8 ── Method 1, the picture method. Learn it first because you can see it.
  {
    layout: 'steps',
    icon: 'GitMerge',
    accent: '#a855f7',
    title: 'Way 1: Tip to Tail',
    titleVn: 'Cách 1: Nối Đuôi',
    content: 'This way you draw the answer. It is slow, and a ruler is never perfect. But you can see it, so learn it first.',
    contentVn: 'Cách này em vẽ ra đáp án. Nó chậm, và cây thước không bao giờ thật chính xác. Nhưng em nhìn thấy được, nên hãy học nó trước.',
    steps: [
      { text: 'Draw force **A** to scale. Start anywhere.', textVn: 'Vẽ lực **A** đúng tỉ lệ. Bắt đầu từ đâu cũng được.' },
      { text: 'Move force **B**. Keep its length and its direction. Put its tail on the tip of A.', textVn: 'Dời lực **B**. Giữ nguyên độ dài và hướng. Đặt đuôi của nó lên đầu mũi tên A.' },
      { text: 'Draw **R** from the tail of A to the tip of B.', textVn: 'Vẽ **R** từ đuôi của A tới đầu mũi tên của B.' },
      { text: 'Measure R. A ruler gives the size. A protractor gives the angle.', textVn: 'Đo R. Thước kẻ cho độ lớn. Thước đo góc cho góc.' },
    ],
    inlineSvg: DIAGRAMS.NOTES_TIP_TO_TAIL,
    reveal: {
      label: 'Does the order matter?',
      labelVn: 'Thứ tự có quan trọng không?',
      prompt: 'Draw B first. Then move A onto the tip of B. Do you get a different R?',
      promptVn: 'Vẽ B trước. Rồi dời A lên đầu mũi tên B. Em có được R khác không?',
      answer: '**No. R is exactly the same.** Both ways are two sides of the same parallelogram, and both finish at the same corner.',
      answerVn: '**Không. R giống hệt nhau.** Cả hai cách đều là hai cạnh của cùng một hình bình hành, và đều kết thúc ở cùng một đỉnh.',
    },
  },

  // 9 ── One idea: a slanted force is two forces in disguise. ──────────────
  {
    layout: 'split',
    icon: 'Triangle',
    accent: '#3b82f6',
    ratio: 45,
    title: 'One Force Is Really Two Parts',
    titleVn: 'Một Lực Thật Ra Là Hai Phần',
    content:
      'A force at an angle does two jobs at the same time. Part of it pulls sideways. Part of it pulls upwards.\n\n' +
      'Drop a line straight down from the tip of the arrow. A right triangle appears. The force is the long side.\n\n' +
      '> The flat side is the **x-part**: $F_x = F\\cos\\theta$\n' +
      '> The upright side is the **y-part**: $F_y = F\\sin\\theta$\n' +
      '> Splitting a force into these two parts is called **resolving** it.',
    contentVn:
      'Một lực xiên làm hai việc cùng một lúc. Một phần kéo sang ngang. Một phần kéo lên trên.\n\n' +
      'Hạ một đường thẳng đứng từ đầu mũi tên xuống. Một tam giác vuông hiện ra. Lực chính là cạnh dài.\n\n' +
      '> Cạnh nằm ngang là **phần x**: $F_x = F\\cos\\theta$\n' +
      '> Cạnh dựng đứng là **phần y**: $F_y = F\\sin\\theta$\n' +
      '> Tách một lực thành hai phần đó gọi là **phân tích** lực.',
    inlineSvg: DIAGRAMS.NOTES_RIGHT_TRIANGLE,
    drawThis: true,
    check: {
      id: 'chk_cos_or_sin',
      q: 'Which part of a force is F cos θ?',
      qVn: 'Phần nào của một lực là F cos θ?',
      options: [
        { val: 'A', text: 'The flat, sideways part — the x-part', textVn: 'Phần nằm ngang, sang bên — phần x' },
        { val: 'B', text: 'The upright part — the y-part', textVn: 'Phần dựng đứng — phần y' },
        { val: 'C', text: 'The whole force', textVn: 'Cả lực' },
      ],
      correct: 'A',
      expEn: 'The angle sits at the corner where the force starts. The flat side touches that angle, so it is the adjacent side, and cos = adjacent ÷ long side. Test it with 0°: a force pointing straight along x has cos 0° = 1, so all of it is the x-part.',
      expVn: 'Góc nằm ở đỉnh nơi lực bắt đầu. Cạnh nằm ngang chạm vào góc đó, nên nó là cạnh kề, mà cos = kề ÷ cạnh dài. Hãy thử với 0°: một lực chỉ đúng dọc trục x có cos 0° = 1, nên toàn bộ nó là phần x.',
    },
  },

  // 10 ── The worked example, on its own, as steps. ────────────────────────
  {
    layout: 'steps',
    icon: 'Calculator',
    accent: '#f59e0b',
    title: 'Worked Example: Resolve 60 N at 30°',
    titleVn: 'Ví Dụ Mẫu: Phân Tích 60 N Tại 30°',
    content: 'A rope pulls with 60 N. It acts at 30°. Find the two parts.',
    contentVn: 'Một sợi dây kéo với lực 60 N. Nó tác dụng tại 30°. Hãy tìm hai phần.',
    steps: [
      { text: 'Write both formulas first: $F_x = F\\cos\\theta$ and $F_y = F\\sin\\theta$.', textVn: 'Viết cả hai công thức trước: $F_x = F\\cos\\theta$ và $F_y = F\\sin\\theta$.' },
      { text: 'Put the numbers in: $F_x = 60\\cos 30°$ and $F_y = 60\\sin 30°$.', textVn: 'Thay số vào: $F_x = 60\\cos 30°$ và $F_y = 60\\sin 30°$.' },
      { text: 'The x-part: $F_x = 51.96$ N.', textVn: 'Phần x: $F_x = 51{,}96$ N.' },
      { text: 'The y-part: $F_y = 30.00$ N.', textVn: 'Phần y: $F_y = 30{,}00$ N.' },
      { text: 'Check with Pythagoras: $51.96^2 + 30^2 = 3600$, and $60^2 = 3600$. ✓', textVn: 'Kiểm tra bằng Pytago: $51{,}96^2 + 30^2 = 3600$, và $60^2 = 3600$. ✓' },
    ],
    reveal: {
      label: 'Your answer is wrong. What do you check first?',
      labelVn: 'Đáp án của em sai. Em kiểm tra gì trước tiên?',
      answer: '**The calculator mode.** Look for **DEG** on the screen. If it says RAD, every answer today will be wrong. This is the most common mistake in the whole topic.',
      answerVn: '**Chế độ máy tính.** Hãy tìm chữ **DEG** trên màn hình. Nếu nó ghi RAD thì mọi đáp án hôm nay đều sai. Đây là lỗi phổ biến nhất của cả chủ đề này.',
    },
  },

  // 11 ── One idea: where the minus signs come from. ───────────────────────
  {
    layout: 'split',
    icon: 'AlertTriangle',
    accent: '#c25e12',
    side: 'left',
    ratio: 45,
    title: 'When Is a Part Negative?',
    titleVn: 'Khi Nào Một Phần Mang Dấu Âm?',
    content:
      'A part is negative when it points the other way.\n\n' +
      'You do not have to work the signs out. Type the real angle into your calculator and it gives you the right sign every time.\n\n' +
      '> A force pointing **left** has a **negative x-part**.\n' +
      '> A force pointing **down** has a **negative y-part**.',
    contentVn:
      'Một phần mang dấu âm khi nó chỉ về hướng ngược lại.\n\n' +
      'Em không cần tự suy ra dấu. Hãy nhập đúng góc thật vào máy tính, nó sẽ cho dấu đúng mọi lúc.\n\n' +
      '> Lực chỉ sang **trái** có **phần x âm**.\n' +
      '> Lực chỉ **xuống dưới** có **phần y âm**.',
    inlineSvg: DIAGRAMS.NOTES_SIGNS,
    notes: [
      {
        tone: 'homework',
        text: 'Do not type the small angle you can see inside the triangle. Type the angle the question gave you.',
        textVn: 'Đừng nhập góc nhỏ mà em nhìn thấy trong tam giác. Hãy nhập đúng góc mà đề bài cho.',
      },
    ],
    check: {
      id: 'chk_negative_x',
      q: 'A 40 N force acts at 110°. Is its x-part positive or negative?',
      qVn: 'Một lực 40 N tác dụng tại 110°. Phần x của nó dương hay âm?',
      options: [
        { val: 'A', text: 'Negative — 110° points up and to the LEFT', textVn: 'Âm — 110° chỉ lên trên và sang TRÁI' },
        { val: 'B', text: 'Positive — an x-part is always positive', textVn: 'Dương — phần x luôn dương' },
        { val: 'C', text: 'Zero — 110° is nearly straight up', textVn: 'Bằng không — 110° gần như thẳng đứng' },
      ],
      correct: 'A',
      expEn: '110° is bigger than 90°, so the arrow has tipped over to the left side. cos 110° = −0.342, which gives Fx = −13.7 N. The y-part stays positive, because the force still points upwards.',
      expVn: '110° lớn hơn 90°, nên mũi tên đã nghiêng sang phía bên trái. cos 110° = −0,342, cho Fx = −13,7 N. Phần y vẫn dương, vì lực vẫn chỉ lên trên.',
    },
  },

  // 12 ── Method 2, the rule. The picture already contains the numbers. ────
  {
    layout: 'split',
    icon: 'Columns3',
    accent: '#f59e0b',
    ratio: 45,
    title: 'Way 2: Add the Columns',
    titleVn: 'Cách 2: Cộng Theo Cột',
    content:
      'Once every force is split into parts, the hard problem is gone.\n\n' +
      'All the x-parts lie along the same line, so they add like ordinary numbers. The y-parts do the same.\n\n' +
      '> $R_x = A_x + B_x$\n' +
      '> $R_y = A_y + B_y$\n' +
      '> Never add an x-part to a y-part. They meet at a right angle.',
    contentVn:
      'Khi mọi lực đã được tách thành các phần, bài toán khó biến mất.\n\n' +
      'Tất cả phần x nằm trên cùng một đường thẳng, nên chúng cộng như số bình thường. Phần y cũng vậy.\n\n' +
      '> $R_x = A_x + B_x$\n' +
      '> $R_y = A_y + B_y$\n' +
      '> Đừng bao giờ cộng phần x với phần y. Chúng vuông góc với nhau.',
    inlineSvg: DIAGRAMS.NOTES_COLUMNS,
  },

  // 13 ── The same numbers again, this time in words. Picture, then words. ─
  {
    layout: 'steps',
    icon: 'Calculator',
    accent: '#f59e0b',
    title: 'Worked Example: Fill the Table',
    titleVn: 'Ví Dụ Mẫu: Điền Vào Bảng',
    content: 'Force A is 60 N at 30°. Force B is 40 N at 110°. These are the numbers in the table.',
    contentVn: 'Lực A là 60 N tại 30°. Lực B là 40 N tại 110°. Đây chính là các số trong bảng.',
    steps: [
      { text: 'Resolve A: $A_x = 51.96$ and $A_y = 30.00$.', textVn: 'Phân tích A: $A_x = 51{,}96$ và $A_y = 30{,}00$.' },
      { text: 'Resolve B: $B_x = -13.68$ and $B_y = 37.59$. B leans left, so $B_x$ is negative.', textVn: 'Phân tích B: $B_x = -13{,}68$ và $B_y = 37{,}59$. B nghiêng sang trái, nên $B_x$ âm.' },
      { text: 'Add the x column: $51.96 + (-13.68) = 38.28$.', textVn: 'Cộng cột x: $51{,}96 + (-13{,}68) = 38{,}28$.' },
      { text: 'Add the y column: $30.00 + 37.59 = 67.59$.', textVn: 'Cộng cột y: $30{,}00 + 37{,}59 = 67{,}59$.' },
    ],
    reveal: {
      label: 'Are we finished?',
      labelVn: 'Đã xong chưa?',
      answer: '**Not yet.** $R_x$ and $R_y$ are two parts, and the question asked for one force. One more step turns them back into a size and a direction.',
      answerVn: '**Chưa xong.** $R_x$ và $R_y$ là hai phần, mà đề bài hỏi một lực. Còn một bước nữa để đổi chúng về độ lớn và hướng.',
    },
  },

  // 14 ── One idea: the last triangle, run backwards. ──────────────────────
  {
    layout: 'split',
    icon: 'Ruler',
    accent: '#10b981',
    ratio: 45,
    title: 'Turn the Parts Back Into One Force',
    titleVn: 'Đổi Các Phần Về Lại Một Lực',
    content:
      '$R_x$ and $R_y$ are the two short sides of one last right triangle. R is the long side.\n\n' +
      'So the last step is the first step, done backwards.\n\n' +
      '> **Size:** $|R| = \\sqrt{R_x^{2} + R_y^{2}}$\n' +
      '> **Direction:** $\\theta = \\tan^{-1}\\!\\left(\\dfrac{R_y}{R_x}\\right)$',
    contentVn:
      '$R_x$ và $R_y$ là hai cạnh ngắn của một tam giác vuông cuối cùng. R là cạnh dài.\n\n' +
      'Vậy bước cuối chính là bước đầu tiên, làm ngược lại.\n\n' +
      '> **Độ lớn:** $|R| = \\sqrt{R_x^{2} + R_y^{2}}$\n' +
      '> **Hướng:** $\\theta = \\tan^{-1}\\!\\left(\\dfrac{R_y}{R_x}\\right)$',
    inlineSvg: DIAGRAMS.NOTES_REBUILD,
    notes: [
      {
        tone: 'plant',
        text: 'An answer needs **both** numbers. "77.7 N" is only half an answer. Always write the angle too.',
        textVn: 'Một đáp án cần **cả hai** con số. "77,7 N" mới chỉ là nửa đáp án. Luôn viết cả góc nữa.',
      },
    ],
  },

  // 15 ── Finish the same example, and answer the obvious objection. ───────
  {
    layout: 'steps',
    icon: 'CheckCircle2',
    accent: '#10b981',
    title: 'Worked Example: Finish the Answer',
    titleVn: 'Ví Dụ Mẫu: Hoàn Thành Đáp Án',
    content: 'We had $R_x = 38.28$ and $R_y = 67.59$. Now turn them into one force.',
    contentVn: 'Ta đã có $R_x = 38{,}28$ và $R_y = 67{,}59$. Bây giờ đổi chúng thành một lực.',
    steps: [
      { text: 'Square both parts and add: $38.28^2 + 67.59^2 = 6033$.', textVn: 'Bình phương cả hai phần rồi cộng: $38{,}28^2 + 67{,}59^2 = 6033$.' },
      { text: 'Take the square root: $|R| = 77.7$ N.', textVn: 'Lấy căn bậc hai: $|R| = 77{,}7$ N.' },
      { text: 'Divide, then use tan⁻¹: $\\theta = \\tan^{-1}(67.59 \\div 38.28) = 60.5°$.', textVn: 'Chia, rồi dùng tan⁻¹: $\\theta = \\tan^{-1}(67{,}59 \\div 38{,}28) = 60{,}5°$.' },
      { text: 'Both parts are positive, so the force points up and right. The angle is fine as it is.', textVn: 'Cả hai phần đều dương, nên lực chỉ lên trên và sang phải. Góc này đúng như vậy.' },
      { text: 'Write both numbers: **77.7 N at 60.5°**.', textVn: 'Viết cả hai con số: **77,7 N tại 60,5°**.' },
    ],
    reveal: {
      label: 'Why is the answer not 100 N?',
      labelVn: 'Vì sao đáp án không phải 100 N?',
      answer: '60 + 40 = 100 would only be right if both ropes pulled the same way. They are 80° apart, so about a fifth of the pull is spent fighting itself.',
      answerVn: '60 + 40 = 100 chỉ đúng nếu cả hai dây cùng kéo một hướng. Chúng lệch nhau 80°, nên khoảng một phần năm lực kéo bị dùng để chống lại chính nó.',
    },
  },

  // 16 ── The one thing a calculator will not tell you. ────────────────────
  {
    layout: 'split',
    icon: 'AlertTriangle',
    accent: '#c8102e',
    side: 'left',
    ratio: 45,
    title: 'Always Check the Direction',
    titleVn: 'Luôn Kiểm Tra Lại Hướng',
    content:
      'Your calculator only ever answers between −90° and +90°.\n\n' +
      'But $R_x = -6, R_y = -4$ and $R_x = +6, R_y = +4$ give the same division. So tan⁻¹ returns the same angle for two forces pointing **opposite ways**.\n\n' +
      '> If $R_x$ is **negative**, add **180°** to the calculator answer.\n' +
      '> If $R_x$ is positive and $R_y$ is negative, add **360°**.',
    contentVn:
      'Máy tính chỉ trả lời trong khoảng từ −90° đến +90°.\n\n' +
      'Nhưng $R_x = -6, R_y = -4$ và $R_x = +6, R_y = +4$ cho cùng một phép chia. Nên tan⁻¹ trả về cùng một góc cho hai lực chỉ về **hai hướng ngược nhau**.\n\n' +
      '> Nếu $R_x$ **âm**, cộng thêm **180°** vào kết quả máy tính.\n' +
      '> Nếu $R_x$ dương và $R_y$ âm, cộng thêm **360°**.',
    inlineSvg: DIAGRAMS.NOTES_QUADRANT,
    notes: [
      {
        tone: 'task',
        badge: 'Do this every time',
        badgeVn: 'Lần nào cũng làm',
        text: 'Sketch $R_x$ and $R_y$ before you trust the angle. It takes five seconds and it catches this every time.',
        textVn: 'Hãy vẽ phác $R_x$ và $R_y$ trước khi tin vào góc. Chỉ mất năm giây và lần nào cũng bắt được lỗi này.',
      },
    ],
    check: {
      id: 'chk_quadrant',
      q: 'Rx = −9 N and Ry = +12 N. The calculator says −53.1°. What is the real direction?',
      qVn: 'Rx = −9 N và Ry = +12 N. Máy tính cho −53,1°. Hướng thật là bao nhiêu?',
      options: [
        { val: 'A', text: '126.9° — up and to the left', textVn: '126,9° — lên trên và sang trái' },
        { val: 'B', text: '−53.1° — the calculator is always right', textVn: '−53,1° — máy tính luôn đúng' },
        { val: 'C', text: '53.1° — just remove the minus sign', textVn: '53,1° — chỉ cần bỏ dấu trừ' },
      ],
      correct: 'A',
      expEn: 'A negative x-part with a positive y-part means the force points up and to the LEFT. That must be between 90° and 180°. Rx is negative, so add 180°: −53.1 + 180 = 126.9°. Answer B points down and right. Answer C points up and right. Both are on the wrong side of the grid.',
      expVn: 'Phần x âm với phần y dương nghĩa là lực chỉ lên trên và sang TRÁI. Góc đó phải nằm giữa 90° và 180°. Rx âm, nên cộng 180°: −53,1 + 180 = 126,9°. Đáp án B chỉ xuống và sang phải. Đáp án C chỉ lên và sang phải. Cả hai đều nằm sai phía của lưới.',
    },
  },

  // 17 ── The comparison the subject has (§2.5). ───────────────────────────
  {
    layout: 'compare',
    icon: 'Scale',
    title: 'Two Ways, One Answer',
    titleVn: 'Hai Cách, Một Đáp Án',
    columns: [
      {
        heading: 'Tip to tail',
        headingVn: 'Nối đuôi',
        accent: '#a855f7',
        icon: 'PenTool',
        content: 'Draw it, then measure it. Easy to understand. It shows you at once whether an answer makes sense.',
        contentVn: 'Vẽ ra rồi đo. Dễ hiểu. Nó cho em thấy ngay đáp án có hợp lý hay không.',
        notes: [{ tone: 'info', text: 'Use this to **check** an answer.', textVn: 'Dùng cách này để **kiểm tra** đáp án.' }],
      },
      {
        heading: 'Add the columns',
        headingVn: 'Cộng theo cột',
        accent: '#f59e0b',
        icon: 'Calculator',
        content: 'Resolve, add, rebuild. Harder to learn. Exact every time, and three forces are no harder than two.',
        contentVn: 'Phân tích, cộng, dựng lại. Học khó hơn. Lúc nào cũng chính xác, và ba lực cũng dễ như hai lực.',
        notes: [{ tone: 'plant', text: 'Use this to **get** the answer.', textVn: 'Dùng cách này để **tìm ra** đáp án.' }],
      },
    ],
    check: {
      id: 'chk_three_forces',
      q: 'Three forces pull a box, all at different angles. Which way handles it best?',
      qVn: 'Ba lực kéo một cái thùng, tất cả ở các góc khác nhau. Cách nào xử lý tốt nhất?',
      options: [
        { val: 'A', text: 'Add the columns — put a third row in the table', textVn: 'Cộng theo cột — thêm một hàng thứ ba vào bảng' },
        { val: 'B', text: 'Neither — this only works for two forces', textVn: 'Không cách nào — cách này chỉ dùng cho hai lực' },
        { val: 'C', text: 'Add the three sizes together', textVn: 'Cộng ba độ lớn lại với nhau' },
      ],
      correct: 'A',
      expEn: 'The table has no limit. Each extra force is one more row, and the two column totals are still Rx and Ry. Tip to tail also works — keep sliding the next arrow onto the last tip — but every arrow you draw adds a little more ruler error.',
      expVn: 'Bảng không có giới hạn. Mỗi lực thêm vào chỉ là một hàng nữa, và hai tổng cột vẫn là Rx và Ry. Cách nối đuôi cũng được — cứ trượt mũi tên tiếp theo lên đầu mũi tên trước — nhưng mỗi mũi tên vẽ thêm lại có thêm chút sai số thước.',
    },
  },

  // 18 ── Application 1 (§2.6). Mr Bowen, deadpan, answer behind a click. ──
  {
    layout: 'callout',
    icon: 'HelpCircle',
    accent: '#0087a8',
    eyebrow: 'Word problem 1',
    eyebrowVn: 'Bài toán có lời văn 1',
    title: 'The Motorbike',
    titleVn: 'Chiếc Xe Máy',
    content:
      'Mr Bowen pushes his motorbike east with a force of **120 N**. At the same time the wind pushes it north with a force of **50 N**.\n\n' +
      'Find the resultant force on the motorbike. Give the size and the direction.',
    contentVn:
      'Thầy Bowen đẩy chiếc xe máy của mình về hướng đông với lực **120 N**. Cùng lúc đó, gió thổi nó về hướng bắc với lực **50 N**.\n\n' +
      'Hãy tìm lực tổng hợp tác dụng lên xe máy. Cho biết độ lớn và hướng.',
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      answer:
        'East is 0° and north is 90°, so the parts are already done: $R_x = 120$ and $R_y = 50$.\n\n' +
        '$|R| = \\sqrt{120^2 + 50^2} = \\sqrt{16900} = 130$ N.\n\n' +
        '$\\theta = \\tan^{-1}(50 \\div 120) = 22.6°$.\n\n' +
        'Answer: **130 N at 22.6°**. Note that it is not 170 N.',
      answerVn:
        'Hướng đông là 0° và hướng bắc là 90°, nên các phần đã có sẵn: $R_x = 120$ và $R_y = 50$.\n\n' +
        '$|R| = \\sqrt{120^2 + 50^2} = \\sqrt{16900} = 130$ N.\n\n' +
        '$\\theta = \\tan^{-1}(50 \\div 120) = 22{,}6°$.\n\n' +
        'Đáp án: **130 N tại 22,6°**. Hãy để ý rằng nó không phải 170 N.',
    },
  },

  // 19 ── Application 2. Sillier, still completely deadpan. ────────────────
  {
    layout: 'callout',
    icon: 'HelpCircle',
    accent: '#0087a8',
    eyebrow: 'Word problem 2',
    eyebrowVn: 'Bài toán có lời văn 2',
    title: 'The Sock',
    titleVn: 'Chiếc Tất',
    content:
      'Mr Bowen pulls a sock with a force of **30 N at 20°**. His cat pulls the same sock with a force of **12 N at 200°**.\n\n' +
      'Find the resultant force on the sock.',
    contentVn:
      'Thầy Bowen kéo một chiếc tất với lực **30 N tại 20°**. Con mèo của thầy kéo chính chiếc tất đó với lực **12 N tại 200°**.\n\n' +
      'Hãy tìm lực tổng hợp tác dụng lên chiếc tất.',
    notes: [
      {
        tone: 'theory',
        text: 'Before you calculate: look at the two angles. 200° is exactly 180° more than 20°. What does that tell you?',
        textVn: 'Trước khi tính: hãy nhìn hai góc. 200° nhiều hơn 20° đúng 180°. Điều đó cho em biết gì?',
      },
    ],
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      answer:
        'The two forces are exactly opposite, so they lie on the same line and simply subtract: $30 - 12 = 18$ N, still at **20°**.\n\n' +
        'The table agrees. $R_x = 28.19 + (-11.28) = 16.91$ and $R_y = 10.26 + (-4.10) = 6.16$, which give $|R| = 18.0$ N at $20°$.\n\n' +
        'Answer: **18 N at 20°**. Mr Bowen wins, but only by 18 N.',
      answerVn:
        'Hai lực hoàn toàn ngược nhau, nên chúng nằm trên cùng một đường thẳng và chỉ việc trừ: $30 - 12 = 18$ N, vẫn tại **20°**.\n\n' +
        'Bảng cũng cho kết quả đó. $R_x = 28{,}19 + (-11{,}28) = 16{,}91$ và $R_y = 10{,}26 + (-4{,}10) = 6{,}16$, cho $|R| = 18{,}0$ N tại $20°$.\n\n' +
        'Đáp án: **18 N tại 20°**. Thầy Bowen thắng, nhưng chỉ hơn 18 N.',
    },
  },

  // 20 ── The countable recap (§1.7). ──────────────────────────────────────
  {
    layout: 'stack',
    icon: 'ListChecks',
    accent: '#6366f1',
    title: 'The Five Steps',
    titleVn: 'Năm Bước',
    variant: 'checklist',
    columns: 1,
    content: 'Put every vector question through these five steps, in this order. Your notebook should now have **4 definitions**, **3 pairs of formulas** and **2 drawings**. Check.',
    contentVn: 'Hãy đưa mọi câu hỏi về vectơ qua năm bước này, đúng thứ tự. Vở của em bây giờ phải có **4 định nghĩa**, **3 cặp công thức** và **2 hình vẽ**. Hãy kiểm tra lại.',
    items: [
      { text: '**Sketch** the forces from one point. Roughly to scale is enough.', textVn: '**Vẽ phác** các lực từ một điểm. Tương đối đúng tỉ lệ là đủ.' },
      { text: '**Resolve** each force: $F_x = F\\cos\\theta$, $F_y = F\\sin\\theta$.', textVn: '**Phân tích** từng lực: $F_x = F\\cos\\theta$, $F_y = F\\sin\\theta$.' },
      { text: '**Add** each column to get $R_x$ and $R_y$.', textVn: '**Cộng** từng cột để có $R_x$ và $R_y$.' },
      { text: '**Rebuild**: $|R| = \\sqrt{R_x^{2} + R_y^{2}}$, then $\\theta = \\tan^{-1}(R_y / R_x)$.', textVn: '**Dựng lại**: $|R| = \\sqrt{R_x^{2} + R_y^{2}}$, rồi $\\theta = \\tan^{-1}(R_y / R_x)$.' },
      { text: '**Check the direction** against your sketch. Then write both numbers.', textVn: '**Kiểm tra hướng** so với hình vẽ. Rồi viết cả hai con số.' },
    ],
  },

  // 21 ── Close, with the exit question. ───────────────────────────────────
  {
    layout: 'hero',
    color: '#10b981',
    icon: 'CheckCircle2',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn Thành Bài Học!',
    subtitle: 'You can **resolve** a force into two parts, **add** the parts in columns, and **rebuild** one resultant — size and direction.',
    subtitleVn: 'Em đã có thể **phân tích** một lực thành hai phần, **cộng** các phần theo cột, và **dựng lại** một lực tổng hợp — cả độ lớn lẫn hướng.',
    card: {
      icon: 'Pencil',
      badge: 'Exit question',
      badgeVn: 'Câu hỏi ra về',
      text: 'Two people push a car at a right angle. One pushes with **400 N**, the other with **300 N**. How hard is the car pushed?',
      textVn: 'Hai người đẩy một chiếc xe hơi theo hai hướng vuông góc. Một người đẩy **400 N**, người kia **300 N**. Chiếc xe bị đẩy mạnh bao nhiêu?',
    },
  },
];
