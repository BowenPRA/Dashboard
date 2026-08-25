// src/data/PHYSICS/FORCE_1A/notes.js
// FORCE_1A — Adding Force Vectors. Built on the flexible layout system.
//
// The deck is arranged around one obstacle: a student who can add 4 and 3 will
// answer 7 for two forces at a right angle, and nothing that follows makes
// sense until that answer has been felt to be wrong. So the order is
//
//   see it (a force needs two numbers)
//   → break it (4 and 3 make 5, and here is the triangle that proves it)
//   → DO it (VectorLab: drag the forces yourself, watch R change)
//   → tip to tail, the picture method
//   → the right triangle inside one force, the component method
//   → add down the columns, rebuild, and the quadrant trap
//   → the two routes side by side, then the recipe
//
// Slide 4 is the pivot. Everything before it is the question; everything after
// it is the machinery, and the machinery only earns attention once the student
// has personally made 10 + 6 come out as 11.7.
import { DIAGRAMS } from './diagrams.js';

export const notes = [
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
    objective: 'Break each force into an x-part and a y-part, add the parts, and rebuild the single force that does the same job.',
    objectiveVn: 'Phân tích mỗi lực thành phần x và phần y, cộng các phần lại, rồi dựng lại một lực duy nhất làm được đúng việc đó.',
    card: {
      icon: 'HelpCircle',
      badge: 'Start with this question',
      badgeVn: 'Bắt đầu bằng câu hỏi này',
      text: 'Two people push a car. One pushes with **400 N**, the other with **300 N**. Do they push the car with **700 N**?',
      textVn: 'Hai người đẩy một chiếc xe. Một người đẩy **400 N**, người kia **300 N**. Vậy họ đẩy xe bằng **700 N** phải không?',
    },
  },

  {
    layout: 'split',
    icon: 'Compass',
    accent: '#3b82f6',
    ratio: 45,
    title: 'A Force Needs Two Numbers',
    titleVn: 'Một Lực Cần Hai Con Số',
    content:
      'Mass is **one** number: 8 kg is 8 kg. A force is not like that. Three forces can all be 50 N and still do completely different things, because they point in different directions.\n\n' +
      '> A **vector** is a quantity with a **size** and a **direction**. Force is a vector.\n' +
      "> We write one as **size at angle** — for example **50 N at 45°**.\n" +
      '> The angle always turns **anticlockwise from the +x axis** (the direction "east").',
    contentVn:
      'Khối lượng chỉ là **một** con số: 8 kg là 8 kg. Lực thì không như vậy. Ba lực có thể đều bằng 50 N mà vẫn gây ra những tác dụng hoàn toàn khác nhau, vì chúng chỉ về các hướng khác nhau.\n\n' +
      '> **Vectơ** là đại lượng có **độ lớn** và **hướng**. Lực là một vectơ.\n' +
      '> Ta viết nó là **độ lớn tại góc** — ví dụ **50 N tại 45°**.\n' +
      '> Góc luôn quay **ngược chiều kim đồng hồ từ trục +x** (hướng "đông").',
    inlineSvg: DIAGRAMS.NOTES_SIZE_AND_DIRECTION,
    drawThis: true,
    notes: [
      {
        tone: 'info',
        text: 'An arrow on paper carries both numbers at once: its **length** is the size, the way it **points** is the direction.',
        textVn: 'Mũi tên trên giấy mang cả hai con số cùng lúc: **độ dài** là độ lớn, **hướng chỉ** là hướng.',
      },
    ],
  },

  {
    layout: 'split',
    icon: 'AlertTriangle',
    accent: '#ef4444',
    side: 'left',
    ratio: 45,
    title: 'Why You Cannot Just Add Them',
    titleVn: 'Vì Sao Không Thể Cộng Thẳng',
    content:
      'Pull something east with **4 N** and north with **3 N** at the same time. The object does not move with 7 N of force. It moves with **5 N**, at an angle between the two pulls.\n\n' +
      '> Adding the sizes only works when the forces point **the same way**.\n' +
      '> Otherwise, the two arrows and the answer form a **triangle** — and triangles obey Pythagoras, not plain addition.\n\n' +
      'The single force that does the same job as all the others together is called the **resultant**, written **R**.',
    contentVn:
      'Kéo một vật sang đông với **4 N** và lên bắc với **3 N** cùng lúc. Vật không chuyển động với lực 7 N. Nó chuyển động với **5 N**, theo một hướng nằm giữa hai lực kéo.\n\n' +
      '> Cộng thẳng độ lớn chỉ đúng khi các lực chỉ **cùng một hướng**.\n' +
      '> Nếu không, hai mũi tên và đáp án tạo thành một **tam giác** — mà tam giác tuân theo Pytago, không phải phép cộng thường.\n\n' +
      'Lực duy nhất làm được đúng việc mà tất cả các lực kia cùng làm được gọi là **lực tổng hợp**, ký hiệu **R**.',
    inlineSvg: DIAGRAMS.NOTES_WHY_NOT_ADD,
    check: {
      id: 'chk_not_seven',
      q: 'A 6 N force points east and a 8 N force points north. Which is true about the resultant?',
      qVn: 'Một lực 6 N hướng đông và một lực 8 N hướng bắc. Điều nào đúng về lực tổng hợp?',
      options: [
        { val: 'A', text: 'It is 10 N, pointing north-east of the 6 N force.', textVn: 'Nó bằng 10 N, chỉ về phía đông bắc so với lực 6 N.' },
        { val: 'B', text: 'It is 14 N, because 6 + 8 = 14.', textVn: 'Nó bằng 14 N, vì 6 + 8 = 14.' },
        { val: 'C', text: 'It is 2 N, because 8 − 6 = 2.', textVn: 'Nó bằng 2 N, vì 8 − 6 = 2.' },
      ],
      correct: 'A',
      expEn: 'The two forces meet at a right angle, so they close a right triangle with the resultant as the hypotenuse: √(6² + 8²) = √100 = 10 N. 14 N would only be right if both forces pushed the same way, and 2 N only if they pushed against each other.',
      expVn: 'Hai lực gặp nhau ở góc vuông, nên chúng khép thành một tam giác vuông với lực tổng hợp là cạnh huyền: √(6² + 8²) = √100 = 10 N. 14 N chỉ đúng nếu cả hai lực cùng hướng, còn 2 N chỉ đúng nếu chúng ngược hướng nhau.',
    },
  },

  {
    layout: 'split',
    icon: 'Move3d',
    accent: '#6366f1',
    ratio: 40,
    title: 'Try It Yourself',
    titleVn: 'Tự Em Thử Đi',
    content:
      'Grab either **arrowhead** and drag it. The green arrow **R** is the answer, and it moves while you move.\n\n' +
      '> Press **Same way**. Now R really is 8 + 6 = 14 — the only time plain addition works.\n' +
      '> Press **Right angle**. R drops to **10**, not 14. Nothing was taken away; the forces simply stopped helping each other.\n' +
      '> Press **Against**. R falls to **2** — they are now fighting.\n\n' +
      'Everything else in this lesson is just a way of getting these numbers **without** the picture.',
    contentVn:
      'Hãy nắm lấy **đầu mũi tên** bất kỳ và kéo. Mũi tên xanh lá **R** là đáp án, và nó di chuyển ngay khi em kéo.\n\n' +
      '> Bấm **Cùng hướng**. Bây giờ R đúng là 8 + 6 = 14 — trường hợp duy nhất mà phép cộng thường đúng.\n' +
      '> Bấm **Vuông góc**. R tụt xuống còn **10**, không phải 14. Không có gì bị lấy đi cả; hai lực chỉ đơn giản là thôi hỗ trợ nhau.\n' +
      '> Bấm **Ngược hướng**. R còn **2** — bây giờ chúng đang chống lại nhau.\n\n' +
      'Mọi thứ còn lại trong bài này chỉ là cách tìm ra những con số đó mà **không cần** vẽ hình.',
    widget: { type: 'VectorLab', params: { a: { mag: 8, angle: 0 }, b: { mag: 6, angle: 90 }, show: 'chain', span: 16 } },
    check: {
      id: 'chk_biggest',
      q: 'Two forces have fixed sizes but you may turn them. When is the resultant the LARGEST it can be?',
      qVn: 'Hai lực có độ lớn cố định nhưng em được phép xoay chúng. Khi nào lực tổng hợp LỚN NHẤT?',
      options: [
        { val: 'A', text: 'When they point in the same direction.', textVn: 'Khi chúng cùng một hướng.' },
        { val: 'B', text: 'When they are at a right angle.', textVn: 'Khi chúng vuông góc với nhau.' },
        { val: 'C', text: 'When they point in opposite directions.', textVn: 'Khi chúng ngược hướng nhau.' },
      ],
      correct: 'A',
      expEn: 'Pointing the same way is the one case where every newton of one force adds to every newton of the other, giving the plain sum. Turn them apart and the resultant shrinks, all the way down to the difference when they are opposite.',
      expVn: 'Cùng hướng là trường hợp duy nhất mà mỗi newton của lực này cộng thêm vào mỗi newton của lực kia, cho ra tổng thường. Xoay chúng tách ra thì lực tổng hợp nhỏ dần, xuống tận hiệu số khi chúng ngược hướng.',
    },
  },

  {
    layout: 'steps',
    icon: 'GitMerge',
    accent: '#a855f7',
    title: 'Method 1: Tip to Tail',
    titleVn: 'Cách 1: Nối Đuôi',
    content: 'The drawing method. It is slow and only as accurate as your ruler — but it is the picture the whole subject is built on, so learn it first.',
    contentVn: 'Cách vẽ hình. Nó chậm và chỉ chính xác bằng cây thước của em — nhưng đây là hình ảnh mà cả môn học này dựa vào, nên hãy học nó trước.',
    steps: [
      { text: 'Draw force **A** to scale, starting anywhere.', textVn: 'Vẽ lực **A** đúng tỉ lệ, bắt đầu từ đâu cũng được.' },
      { text: "**Slide** force B — keeping its length and direction exactly — until its tail sits on A's tip.", textVn: 'Hãy **trượt** lực B — giữ nguyên độ dài và hướng — cho tới khi đuôi của nó nằm trên đầu mũi tên A.' },
      { text: 'Draw **R** from the tail of the first arrow to the tip of the last one.', textVn: 'Vẽ **R** từ đuôi mũi tên đầu tiên tới đầu mũi tên cuối cùng.' },
      { text: 'Measure R with a ruler for its size, and with a protractor for its angle.', textVn: 'Đo R bằng thước kẻ để có độ lớn, và bằng thước đo góc để có góc.' },
    ],
    inlineSvg: DIAGRAMS.NOTES_TIP_TO_TAIL,
    reveal: {
      label: 'Does the order matter?',
      labelVn: 'Thứ tự có quan trọng không?',
      prompt: 'Draw B first, then slide A onto B. Do you get a different R?',
      promptVn: 'Vẽ B trước, rồi trượt A lên B. Em có được R khác không?',
      answer: '**No — R is identical.** Both routes are two sides of the same parallelogram, and they finish at the same corner. This is why the parallelogram method and the tip-to-tail method are the same method drawn twice.',
      answerVn: '**Không — R giống hệt.** Hai đường đi đều là hai cạnh của cùng một hình bình hành, và chúng kết thúc ở cùng một đỉnh. Vì vậy cách hình bình hành và cách nối đuôi thực chất là một cách được vẽ hai lần.',
    },
  },

  {
    layout: 'split',
    icon: 'Triangle',
    accent: '#3b82f6',
    ratio: 45,
    title: 'The Triangle Inside One Force',
    titleVn: 'Tam Giác Ẩn Trong Một Lực',
    content:
      'A force at an angle is doing two jobs at once: some of it pulls **sideways**, some of it pulls **upwards**. Drop a line straight down from the arrowhead and a **right triangle** appears. The force is the hypotenuse.\n\n' +
      '> The flat leg is the **x-part**: $F_x = F\\cos\\theta$\n' +
      '> The upright leg is the **y-part**: $F_y = F\\sin\\theta$\n\n' +
      'Splitting a force into these two legs is called **resolving** it.',
    contentVn:
      'Một lực xiên đang làm hai việc cùng lúc: một phần kéo **sang ngang**, một phần kéo **lên trên**. Hãy hạ một đường thẳng đứng từ đầu mũi tên xuống và một **tam giác vuông** hiện ra. Lực chính là cạnh huyền.\n\n' +
      '> Cạnh nằm ngang là **phần x**: $F_x = F\\cos\\theta$\n' +
      '> Cạnh dựng đứng là **phần y**: $F_y = F\\sin\\theta$\n\n' +
      'Việc tách một lực thành hai cạnh đó gọi là **phân tích lực**.',
    inlineSvg: DIAGRAMS.NOTES_RIGHT_TRIANGLE,
    drawThis: true,
    exampleLabel: 'Worked example',
    exampleLabelVn: 'Ví dụ mẫu',
    example:
      'A rope pulls with **60 N at 30°**.\n\n' +
      '$F_x = 60\\cos 30° = 51.96$ N\n\n' +
      '$F_y = 60\\sin 30° = 30.00$ N\n\n' +
      'Check it: $51.96^2 + 30^2 = 3600 = 60^2$. ✓',
    exampleVn:
      'Một sợi dây kéo với **60 N tại 30°**.\n\n' +
      '$F_x = 60\\cos 30° = 51{,}96$ N\n\n' +
      '$F_y = 60\\sin 30° = 30{,}00$ N\n\n' +
      'Kiểm tra: $51{,}96^2 + 30^2 = 3600 = 60^2$. ✓',
    check: {
      id: 'chk_cos_or_sin',
      q: 'Which part of a force is F cos θ?',
      qVn: 'Phần nào của một lực là F cos θ?',
      options: [
        { val: 'A', text: 'The flat, sideways part — the x-part.', textVn: 'Phần nằm ngang, sang bên — phần x.' },
        { val: 'B', text: 'The upright part — the y-part.', textVn: 'Phần dựng đứng — phần y.' },
        { val: 'C', text: 'The whole force.', textVn: 'Cả lực.' },
      ],
      correct: 'A',
      expEn: 'θ sits at the origin, so the flat leg is the side NEXT TO the angle — adjacent — and cos = adjacent ÷ hypotenuse. The upright leg is opposite the angle, which is why it uses sin. Test it with θ = 0°: a force pointing straight along x has cos 0° = 1, so all of it is the x-part.',
      expVn: 'θ nằm ở gốc, nên cạnh nằm ngang là cạnh KỀ với góc, mà cos = kề ÷ huyền. Cạnh dựng đứng là cạnh đối diện góc, nên nó dùng sin. Hãy thử với θ = 0°: một lực chỉ đúng dọc trục x có cos 0° = 1, nên toàn bộ nó là phần x.',
    },
  },

  {
    layout: 'split',
    icon: 'Columns3',
    accent: '#f59e0b',
    side: 'left',
    ratio: 45,
    title: 'Method 2: Add Down the Columns',
    titleVn: 'Cách 2: Cộng Theo Cột',
    content:
      "Once every force is split into an x-part and a y-part, the hard problem is gone. All the x-parts point along the same line, so they add like ordinary numbers. So do all the y-parts.\n\n" +
      '> $R_x = A_x + B_x$ and $R_y = A_y + B_y$.\n' +
      '> **Watch the signs.** A force pointing left has a **negative** x-part; one pointing down has a **negative** y-part.\n' +
      '> Never mix a column: an x-part and a y-part are at right angles and can never be added together.',
    contentVn:
      'Khi mọi lực đã được tách thành phần x và phần y, bài toán khó biến mất. Tất cả các phần x nằm trên cùng một đường thẳng, nên chúng cộng như những con số bình thường. Các phần y cũng vậy.\n\n' +
      '> $R_x = A_x + B_x$ và $R_y = A_y + B_y$.\n' +
      '> **Để ý dấu.** Lực chỉ sang trái có phần x **âm**; lực chỉ xuống dưới có phần y **âm**.\n' +
      '> Đừng bao giờ trộn cột: phần x và phần y vuông góc nhau và không bao giờ cộng được với nhau.',
    inlineSvg: DIAGRAMS.NOTES_COLUMNS,
    drawThis: true,
    check: {
      id: 'chk_negative_x',
      q: 'A 40 N force acts at 110°. What is the sign of its x-part?',
      qVn: 'Một lực 40 N tác dụng tại góc 110°. Phần x của nó mang dấu gì?',
      options: [
        { val: 'A', text: 'Negative — 110° points up and to the LEFT.', textVn: 'Âm — 110° chỉ lên trên và sang TRÁI.' },
        { val: 'B', text: 'Positive — every force has a positive x-part.', textVn: 'Dương — mọi lực đều có phần x dương.' },
        { val: 'C', text: 'Zero — 110° is close enough to straight up.', textVn: 'Bằng không — 110° gần như thẳng đứng rồi.' },
      ],
      correct: 'A',
      expEn: '110° is past 90°, so the arrow has tipped over to the left-hand side. cos 110° = −0.342, giving Fx = −13.7 N. The y-part is still positive, because the force is still pointing upwards.',
      expVn: '110° đã vượt qua 90°, nên mũi tên nghiêng sang phía bên trái. cos 110° = −0,342, cho Fx = −13,7 N. Phần y vẫn dương, vì lực vẫn chỉ lên trên.',
    },
  },

  {
    layout: 'split',
    icon: 'Ruler',
    accent: '#10b981',
    ratio: 45,
    title: 'Rebuild the Resultant',
    titleVn: 'Dựng Lại Lực Tổng Hợp',
    content:
      'Rx and Ry are the two legs of one last right triangle, and R is its hypotenuse. So the final step is the first step run backwards.\n\n' +
      '> **Size:** $|R| = \\sqrt{R_x^{2} + R_y^{2}}$\n' +
      '> **Direction:** $\\theta = \\tan^{-1}\\!\\left(\\dfrac{R_y}{R_x}\\right)$\n\n' +
      'An answer is not finished until it has **both** numbers. "77.7 N" is only half a force.',
    contentVn:
      'Rx và Ry là hai cạnh góc vuông của một tam giác vuông cuối cùng, còn R là cạnh huyền. Vậy bước cuối chính là bước đầu tiên làm ngược lại.\n\n' +
      '> **Độ lớn:** $|R| = \\sqrt{R_x^{2} + R_y^{2}}$\n' +
      '> **Hướng:** $\\theta = \\tan^{-1}\\!\\left(\\dfrac{R_y}{R_x}\\right)$\n\n' +
      'Một đáp án chưa xong nếu chưa có **cả hai** con số. "77,7 N" mới chỉ là nửa cái lực.',
    inlineSvg: DIAGRAMS.NOTES_REBUILD,
    drawThis: true,
    exampleLabel: 'Worked example',
    exampleLabelVn: 'Ví dụ mẫu',
    example:
      '$R_x = 38.28$, $R_y = 67.59$\n\n' +
      '$|R| = \\sqrt{38.28^2 + 67.59^2} = 77.7$ N\n\n' +
      '$\\theta = \\tan^{-1}(67.59 \\div 38.28) = 60.5°$\n\n' +
      'Answer: **77.7 N at 60.5°**.',
    exampleVn:
      '$R_x = 38{,}28$, $R_y = 67{,}59$\n\n' +
      '$|R| = \\sqrt{38{,}28^2 + 67{,}59^2} = 77{,}7$ N\n\n' +
      '$\\theta = \\tan^{-1}(67{,}59 \\div 38{,}28) = 60{,}5°$\n\n' +
      'Đáp án: **77,7 N tại 60,5°**.',
  },

  {
    layout: 'split',
    icon: 'AlertTriangle',
    accent: '#c8102e',
    side: 'left',
    ratio: 45,
    title: 'The Trap: tan⁻¹ Lies Half the Time',
    titleVn: 'Cái Bẫy: tan⁻¹ Sai Một Nửa Số Lần',
    content:
      'Your calculator only ever answers between −90° and +90°. But Rx = −6, Ry = −4 and Rx = +6, Ry = +4 give the **same** division — so tan⁻¹ hands back the same angle for two forces pointing **opposite ways**.\n\n' +
      '> Always ask **which quadrant** the signs put you in, before you trust the number.\n' +
      '> Rx negative → the force points **left**, so add **180°** to what the calculator said.\n' +
      '> Rx positive but Ry negative → add **360°** to bring it into range.\n\n' +
      'A quick sketch of the two parts settles it in five seconds.',
    contentVn:
      'Máy tính chỉ trả lời trong khoảng từ −90° đến +90°. Nhưng Rx = −6, Ry = −4 và Rx = +6, Ry = +4 cho ra **cùng** một phép chia — nên tan⁻¹ trả về cùng một góc cho hai lực chỉ về **hai hướng ngược nhau**.\n\n' +
      '> Luôn tự hỏi dấu đặt em vào **góc phần tư nào**, trước khi tin con số đó.\n' +
      '> Rx âm → lực chỉ sang **trái**, nên cộng thêm **180°** vào kết quả máy tính.\n' +
      '> Rx dương nhưng Ry âm → cộng **360°** để đưa về đúng khoảng.\n\n' +
      'Vẽ nhanh hai phần đó là biết ngay trong năm giây.',
    inlineSvg: DIAGRAMS.NOTES_QUADRANT,
    check: {
      id: 'chk_quadrant',
      q: 'Rx = −9 N and Ry = +12 N. Your calculator gives tan⁻¹(12 ÷ −9) = −53.1°. What is the real direction?',
      qVn: 'Rx = −9 N và Ry = +12 N. Máy tính cho tan⁻¹(12 ÷ −9) = −53,1°. Hướng thật là bao nhiêu?',
      options: [
        { val: 'A', text: '126.9° — up and to the left.', textVn: '126,9° — lên trên và sang trái.' },
        { val: 'B', text: '−53.1° — the calculator is always right.', textVn: '−53,1° — máy tính luôn đúng.' },
        { val: 'C', text: '53.1° — just drop the minus sign.', textVn: '53,1° — chỉ cần bỏ dấu trừ.' },
      ],
      correct: 'A',
      expEn: 'Negative x with positive y puts the force up and to the LEFT, which must be between 90° and 180°. Add 180° to the calculator answer: −53.1 + 180 = 126.9°. Option B points down-right and option C up-right — both are the wrong side of the grid entirely.',
      expVn: 'x âm với y dương đặt lực lên trên và sang TRÁI, tức là phải nằm giữa 90° và 180°. Cộng 180° vào kết quả máy tính: −53,1 + 180 = 126,9°. Đáp án B chỉ xuống phải và đáp án C chỉ lên phải — cả hai đều nằm hẳn ở phía sai của lưới.',
    },
  },

  {
    layout: 'compare',
    icon: 'Scale',
    title: 'Two Routes, One Answer',
    titleVn: 'Hai Con Đường, Một Đáp Án',
    columns: [
      {
        heading: 'Tip to tail',
        headingVn: 'Nối đuôi',
        accent: '#a855f7',
        icon: 'PenTool',
        content: 'Draw it, then measure it. Fast to understand, and it shows you instantly whether an answer is roughly sensible.',
        contentVn: 'Vẽ ra rồi đo. Dễ hiểu nhanh, và cho em thấy ngay đáp án có hợp lý hay không.',
        notes: [{ tone: 'info', text: 'Best used to **check** an answer you got by numbers.', textVn: 'Dùng tốt nhất để **kiểm tra** đáp án em đã tính bằng số.' }],
      },
      {
        heading: 'Components',
        headingVn: 'Phân tích thành phần',
        accent: '#f59e0b',
        icon: 'Calculator',
        content: 'Resolve, add the columns, rebuild. Slower to learn, exact every time, and it copes with three or ten forces just as easily as two.',
        contentVn: 'Phân tích, cộng theo cột, dựng lại. Học lâu hơn, nhưng lúc nào cũng chính xác, và xử lý ba hay mười lực cũng dễ như hai lực.',
        notes: [{ tone: 'plant', text: 'This is the method to **use** in an exam.', textVn: 'Đây là cách nên **dùng** trong bài kiểm tra.' }],
      },
    ],
    check: {
      id: 'chk_three_forces',
      q: 'Three forces act on a box at three different angles. Which method handles it best?',
      qVn: 'Ba lực tác dụng lên một cái hộp ở ba góc khác nhau. Cách nào xử lý tốt nhất?',
      options: [
        { val: 'A', text: 'Components — add a third row to the table and carry on.', textVn: 'Phân tích thành phần — thêm một hàng nữa vào bảng rồi làm tiếp.' },
        { val: 'B', text: 'Neither — vector addition only works for two forces.', textVn: 'Không cách nào — cộng vectơ chỉ dùng được cho hai lực.' },
        { val: 'C', text: 'Add all three sizes together.', textVn: 'Cộng cả ba độ lớn lại với nhau.' },
      ],
      correct: 'A',
      expEn: 'The component table has no limit — every extra force is one more row, and the two column sums still give Rx and Ry. Tip to tail also works (keep sliding the next arrow onto the last tip) but the drawing error piles up with every arrow.',
      expVn: 'Bảng thành phần không có giới hạn — mỗi lực thêm vào chỉ là một hàng nữa, và hai tổng cột vẫn cho Rx và Ry. Cách nối đuôi cũng dùng được (cứ trượt mũi tên tiếp theo lên đầu mũi tên trước) nhưng sai số khi vẽ chồng chất theo từng mũi tên.',
    },
  },

  {
    layout: 'stack',
    icon: 'ListChecks',
    accent: '#6366f1',
    title: 'The Recipe',
    titleVn: 'Công Thức Làm Bài',
    variant: 'checklist',
    columns: 1,
    content: 'Run every vector-addition question through these five steps, in this order.',
    contentVn: 'Hãy đưa mọi câu hỏi cộng vectơ qua năm bước này, đúng thứ tự.',
    items: [
      { text: '**Sketch** the forces from one point, roughly to scale.', textVn: '**Vẽ phác** các lực từ một điểm, đúng tỉ lệ tương đối.' },
      { text: '**Resolve** each one: $F_x = F\\cos\\theta$, $F_y = F\\sin\\theta$. Keep the signs.', textVn: '**Phân tích** từng lực: $F_x = F\\cos\\theta$, $F_y = F\\sin\\theta$. Giữ đúng dấu.' },
      { text: '**Add** down each column to get $R_x$ and $R_y$.', textVn: '**Cộng** theo từng cột để có $R_x$ và $R_y$.' },
      { text: '**Rebuild**: $|R| = \\sqrt{R_x^{2} + R_y^{2}}$, then $\\theta = \\tan^{-1}(R_y / R_x)$.', textVn: '**Dựng lại**: $|R| = \\sqrt{R_x^{2} + R_y^{2}}$, rồi $\\theta = \\tan^{-1}(R_y / R_x)$.' },
      { text: '**Check the quadrant** against your sketch, and state both numbers.', textVn: '**Kiểm tra góc phần tư** so với hình vẽ, rồi nêu cả hai con số.' },
    ],
  },

  {
    layout: 'hero',
    color: '#10b981',
    icon: 'CheckCircle2',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn Thành Bài Học!',
    subtitle: 'You can **resolve** a force into parts, **add** the parts in columns, and **rebuild** the resultant — size and direction both.',
    subtitleVn: 'Em đã có thể **phân tích** một lực thành các phần, **cộng** các phần theo cột, và **dựng lại** lực tổng hợp — cả độ lớn lẫn hướng.',
    card: {
      icon: 'Pencil',
      badge: 'Before you go',
      badgeVn: 'Trước khi rời đi',
      text: 'Back to the opening question: the two people push with **400 N** and **300 N**, at a right angle. The car feels **500 N** — not 700 N.',
      textVn: 'Quay lại câu hỏi mở đầu: hai người đẩy với **400 N** và **300 N**, vuông góc nhau. Chiếc xe chịu **500 N** — không phải 700 N.',
    },
  },
];
