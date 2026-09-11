// src/data/PHYSICS/PHY_CIRC/notes.js
// Acellus Physics: Circular Motion & Gravity — the lesson deck.
//
// WHO IT IS FOR. A student who is drowning in formulae: too many to write
// down, no idea which one a question wants, and every rearrangement a fresh
// guess. So the deck is built on three rules.
//   · There are exactly EIGHT things to write down, and every one is in an
//     orange "Write This Down" panel. Nothing else in the deck is copy-down.
//     Slide 22 is the whole formula page in one place, so she can check her
//     notebook against it.
//   · The METHOD is taught once (slide 7) and then used, unchanged, on every
//     worked example: list the pieces, write the formula, rearrange for the
//     unknown, put the numbers in SI, substitute, answer with a unit.
//   · Rearranging is taught as UNDOING (slides 8–10): look at what is being
//     done to the target and do the opposite to both sides. Every worked
//     example shows the moves, not just the result.
//
// THE SPINE:
//   1–3    a hook (which way are you pushed in a turning car?), then the two
//          arrows every question is about: v along the edge, F to the centre.
//   4–5    THE formula, its symbols and units, and the idea that centripetal
//          force is a job done by a real force (rope, friction, gravity).
//   6      units — the formula only speaks SI. A sort activity: convert or not.
//   7      the method, worked on the first Acellus item.
//   8–10   rearranging: undo what is done to the target; the moves on
//          F = mv²/r for v; the decision table, drilled with an order activity.
//   11–13  vertical circles: top vs bottom, the minimum speed (m cancels),
//          the bucket with tension at the top — three Acellus items.
//   14–16  gravity: g = GM/r², why r is squared, the asteroid's mass.
//   17–19  orbits: v = √(GM/r), the Enterprise, the km/s trap.
//   20–21  the period, and the hours trap.
//   22–24  the formula page, the four mistakes, the recap.
//
// House notes:
//  · BILINGUAL. PHYSICS declares `bilingual: true`; every learner-facing string
//    carries a `vn*` twin and the validator enforces it.
//  · `$$…$$` only in `content`, callout bodies and `reveal.answer`. Inline
//    `$…$` everywhere else (steps, notes, statement text, checks).
//  · Layout `title` and hero `objective` are plain text.
//  · `check` / `activity` is always the LAST key on its slide (narration stops
//    there). Activity strings use `name`/`explain`, never `text`.
//  · The worked examples ARE the student's Acellus items. Numbers agree with
//    the Isolate It task, which derives them (g = 9.8, G = 6.67 × 10⁻¹¹).
import { DIAGRAMS } from './diagrams.js';

const INDIGO = '#4f46e5';
const BLUE = '#3b82f6';
const RED = '#ef4444';
const GREEN = '#10b981';
const AMBER = '#d97706';
const PURPLE = '#a855f7';

export const notes = [
  {
    layout: 'hero',
    color: '#4338ca',
    icon: 'Orbit',
    brand: 'Acellus Physics',
    brandVn: 'Acellus Vật lý',
    eyebrow: 'Circular motion, centripetal force and gravity',
    eyebrowVn: 'Chuyển động tròn, lực hướng tâm và trọng lực',
    title: 'Circular Motion & Gravity',
    titleVn: 'Chuyển Động Tròn & Trọng Lực',
    objective: 'I can pick the right formula, rearrange it for the unknown before any number goes in, put every number into SI units, and finish with an answer that has a unit.',
    objectiveVn: 'Em có thể chọn đúng công thức, biến đổi nó để tìm ẩn số trước khi thay số, đưa mọi số về đơn vị SI, và kết thúc bằng một đáp án có đơn vị.',
    warmUp: 'Swing an imaginary ball on a string above your head. Which way does the string pull the ball: toward your hand, or away from it? Write one sentence.',
    warmUpVn: 'Hãy tưởng tượng quay một quả bóng buộc dây trên đầu. Sợi dây kéo quả bóng về phía nào: về tay em, hay ra xa tay em? Viết một câu.',
  },

  {
    layout: 'statement',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Before any formula',
    eyebrowVn: 'Trước khi có công thức nào',
    title: 'Which Way Are You Pushed?',
    titleVn: 'Em Bị Đẩy Về Phía Nào?',
    label: 'Think first',
    labelVn: 'Suy nghĩ trước',
    labelIcon: 'Lightbulb',
    text: 'A car turns sharply to the LEFT. You feel yourself pressed against the door. Which way is the door pushing you?',
    textVn: 'Một chiếc xe rẽ gấp sang TRÁI. Em thấy mình bị ép vào cửa xe. Cửa xe đang đẩy em về phía nào?',
    sub: 'Do not answer with a formula. Answer with a direction.',
    subVn: 'Đừng trả lời bằng công thức. Hãy trả lời bằng một hướng.',
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      prompt: 'Toward the outside of the turn, or toward the centre?',
      promptVn: 'Về phía ngoài khúc cua, hay về phía tâm?',
      answer: 'Toward the **centre** of the turn. Your body wants to keep going in a straight line, so it ends up against the door — and the door has to push you **inward**, toward the centre of the circle, to make you turn with the car. Nothing pushes you outward. That feeling of being flung out is just your body trying to go straight.',
      answerVn: 'Về phía **tâm** của khúc cua. Cơ thể em muốn tiếp tục đi thẳng, nên nó ép vào cửa — và cửa phải đẩy em **vào trong**, về phía tâm đường tròn, để em rẽ cùng xe. Không có gì đẩy em ra ngoài cả. Cảm giác bị văng ra chỉ là cơ thể em đang cố đi thẳng.',
    },
  },

  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Orbit',
    ratio: 46,
    eyebrow: 'The two arrows every question is about',
    eyebrowVn: 'Hai mũi tên mà mọi câu hỏi đều xoay quanh',
    title: 'Along the Edge, and To the Centre',
    titleVn: 'Dọc Theo Rìa, và Về Phía Tâm',
    inlineSvg: DIAGRAMS.CIRCLE_ANATOMY,
    content: 'Anything moving in a circle has a **velocity** along the edge of the circle, and a **force** pulling it toward the centre. Take the force away and the object flies off in a straight line.\n\nThat centre-pulling force has a name.',
    contentVn: 'Bất cứ vật nào chuyển động tròn đều có **vận tốc** dọc theo rìa đường tròn, và một **lực** kéo nó về phía tâm. Bỏ lực đó đi thì vật bay thẳng ra ngoài.\n\nLực kéo về tâm đó có một cái tên.',
    notes: [
      {
        tone: 'write',
        text: '**Centripetal force** means "centre-seeking" force. It always points to the **centre** of the circle. The velocity always points along the **edge**.',
        textVn: '**Lực hướng tâm** nghĩa là lực "tìm về tâm". Nó luôn hướng về **tâm** đường tròn. Vận tốc luôn hướng dọc theo **rìa**.',
      },
    ],
    check: {
      id: 'chk_direction',
      q: 'A ball on a string is swung in a horizontal circle. Which way does the string pull the ball?',
      qVn: 'Một quả bóng buộc dây được quay theo đường tròn nằm ngang. Sợi dây kéo quả bóng về phía nào?',
      options: [
        { val: 'A', text: 'Toward the centre, along the string', textVn: 'Về phía tâm, dọc theo sợi dây' },
        { val: 'B', text: 'Outward, away from the centre', textVn: 'Ra ngoài, xa tâm' },
        { val: 'C', text: 'Forward, the way the ball is moving', textVn: 'Về phía trước, theo hướng bóng đang bay' },
        { val: 'D', text: 'Nowhere — the string is slack', textVn: 'Không hướng nào — dây bị chùng' },
      ],
      correct: 'A',
      expEn: 'The string can only pull along its own length, and it runs from the ball to your hand at the centre. That pull IS the centripetal force. Option C is the velocity, not the force — the ball moves along the edge while the force points to the centre.',
      expVn: 'Sợi dây chỉ có thể kéo dọc theo chính nó, và nó nối từ quả bóng tới tay em ở tâm. Lực kéo đó CHÍNH LÀ lực hướng tâm. Phương án C là vận tốc, không phải lực — quả bóng chuyển động dọc rìa trong khi lực hướng về tâm.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Star',
    eyebrow: 'The one formula this whole module runs on',
    eyebrowVn: 'Công thức duy nhất mà cả bài này xoay quanh',
    title: 'Centripetal Force',
    titleVn: 'Lực Hướng Tâm',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$F = \\dfrac{m v^2}{r}$',
    textVn: '$F = \\dfrac{m v^2}{r}$',
    sub: 'The force needed to keep a mass m moving at speed v around a circle of radius r.',
    subVn: 'Lực cần thiết để giữ khối lượng m chuyển động với tốc độ v trên đường tròn bán kính r.',
    notes: [
      {
        tone: 'write',
        text: '$F$ = centripetal force, in **newtons (N)**\n$m$ = mass, in **kilograms (kg)**\n$v$ = speed, in **metres per second (m/s)**\n$r$ = radius of the circle, in **metres (m)**',
        textVn: '$F$ = lực hướng tâm, đơn vị **niutơn (N)**\n$m$ = khối lượng, đơn vị **kilôgam (kg)**\n$v$ = tốc độ, đơn vị **mét trên giây (m/s)**\n$r$ = bán kính đường tròn, đơn vị **mét (m)**',
      },
      {
        tone: 'info',
        text: 'The $v$ is **squared**. That little 2 is where most marks are lost — double the speed and the force needed goes up **four** times.',
        textVn: '$v$ được **bình phương**. Số 2 nhỏ đó là chỗ mất điểm nhiều nhất — tốc độ gấp đôi thì lực cần thiết tăng **bốn** lần.',
      },
    ],
    check: {
      id: 'chk_v_squared',
      q: 'A car goes round the same bend at twice the speed. How much centripetal force does it need now?',
      qVn: 'Một chiếc xe qua cùng một khúc cua với tốc độ gấp đôi. Bây giờ nó cần lực hướng tâm bao nhiêu?',
      options: [
        { val: 'A', text: 'The same', textVn: 'Như cũ' },
        { val: 'B', text: 'Twice as much', textVn: 'Gấp đôi' },
        { val: 'C', text: 'Four times as much', textVn: 'Gấp bốn' },
        { val: 'D', text: 'Half as much', textVn: 'Một nửa' },
      ],
      correct: 'C',
      expEn: 'The formula has $v^2$, not $v$. Doubling $v$ makes $v^2$ four times bigger, so $F$ is four times bigger. Option B is what you get if you forget the square — and it is the most common wrong answer in the whole module.',
      expVn: 'Công thức có $v^2$, không phải $v$. Gấp đôi $v$ làm $v^2$ lớn gấp bốn, nên $F$ lớn gấp bốn. Phương án B là kết quả khi quên bình phương — và đó là câu trả lời sai phổ biến nhất của cả bài.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Cable',
    ratio: 44,
    eyebrow: 'Centripetal force is a job, not a new force',
    eyebrowVn: 'Lực hướng tâm là một nhiệm vụ, không phải lực mới',
    title: 'Which Force Does the Job?',
    titleVn: 'Lực Nào Làm Nhiệm Vụ Đó?',
    inlineSvg: DIAGRAMS.FORCE_PROVIDERS,
    content: 'There is no separate "centripetal force" acting on a ball. Some **real** force — the rope, friction, gravity — happens to point at the centre, and it is doing the centre-pulling job.\n\nSo the first question in every problem is: **which real force points to the centre?** That force equals $\\dfrac{m v^2}{r}$.',
    contentVn: 'Không có một "lực hướng tâm" riêng tác dụng lên quả bóng. Một lực **thật** nào đó — sợi dây, ma sát, trọng lực — tình cờ hướng về tâm, và nó đang làm nhiệm vụ kéo về tâm.\n\nVậy câu hỏi đầu tiên trong mọi bài là: **lực thật nào hướng về tâm?** Lực đó bằng $\\dfrac{m v^2}{r}$.',
    notes: [
      {
        tone: 'write',
        text: '**Rope:** tension $T = \\dfrac{m v^2}{r}$.  **Flat bend:** friction $= \\dfrac{m v^2}{r}$.  **Orbit:** gravity $= \\dfrac{m v^2}{r}$.',
        textVn: '**Dây:** lực căng $T = \\dfrac{m v^2}{r}$.  **Khúc cua phẳng:** ma sát $= \\dfrac{m v^2}{r}$.  **Quỹ đạo:** trọng lực $= \\dfrac{m v^2}{r}$.',
      },
    ],
    check: {
      id: 'chk_provider',
      q: '"A rope breaks when the tension reaches 938 N." In that question, which number is the centripetal force?',
      qVn: '"Một sợi dây đứt khi lực căng đạt 938 N." Trong câu hỏi đó, con số nào là lực hướng tâm?',
      options: [
        { val: 'A', text: 'There is no centripetal force given', textVn: 'Không có lực hướng tâm nào được cho' },
        { val: 'B', text: '938 N — the tension is the force pulling to the centre', textVn: '938 N — lực căng chính là lực kéo về tâm' },
        { val: 'C', text: '9.8 N — gravity', textVn: '9.8 N — trọng lực' },
        { val: 'D', text: 'The mass of the ball', textVn: 'Khối lượng quả bóng' },
      ],
      correct: 'B',
      expEn: 'The rope is the only thing pulling the ball toward the centre, so the tension IS the centripetal force: $F = 938$ N. Questions almost never say "the centripetal force is…" — they name the real force and leave you to recognise its job.',
      expVn: 'Sợi dây là thứ duy nhất kéo quả bóng về tâm, nên lực căng CHÍNH LÀ lực hướng tâm: $F = 938$ N. Đề bài hầu như không bao giờ nói "lực hướng tâm là…" — họ gọi tên lực thật và để em tự nhận ra nhiệm vụ của nó.',
    },
  },

  {
    layout: 'stack',
    accent: AMBER,
    icon: 'Ruler',
    columns: 2,
    eyebrow: 'Every class is an English class — and a units class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh — và tiết đơn vị',
    title: 'The Formula Only Speaks SI',
    titleVn: 'Công Thức Chỉ Hiểu Đơn Vị SI',
    content: 'A formula is a machine that only accepts one kind of number. Put in kilometres or hours and it gives you a confident, wrong answer. The Acellus hint "pay attention to your units!" means exactly this.',
    contentVn: 'Công thức là một cỗ máy chỉ nhận một loại số. Đưa vào kilômét hay giờ thì nó trả lại một đáp án sai một cách tự tin. Gợi ý của Acellus "chú ý đơn vị!" nghĩa chính xác là vậy.',
    notes: [
      {
        tone: 'write',
        text: '**SI units:** metres (m), kilograms (kg), seconds (s), newtons (N), m/s, m/s².\nEvery number goes into a formula in these — and the answer comes out in these.',
        textVn: '**Đơn vị SI:** mét (m), kilôgam (kg), giây (s), niutơn (N), m/s, m/s².\nMọi số đưa vào công thức phải ở các đơn vị này — và đáp án cũng ra ở các đơn vị này.',
      },
      {
        tone: 'write',
        text: '**Convert BEFORE you substitute:**\nkm → m: × 1000\nkm/s → m/s: × 1000\nhours → s: × 3600\nminutes → s: × 60',
        textVn: '**Đổi đơn vị TRƯỚC KHI thay số:**\nkm → m: × 1000\nkm/s → m/s: × 1000\ngiờ → s: × 3600\nphút → s: × 60',
      },
      {
        tone: 'homework',
        text: 'If the answer box says **km** or **hours**, convert back AFTER you have the SI answer: m → km ÷ 1000, s → hours ÷ 3600.',
        textVn: 'Nếu ô đáp án ghi **km** hoặc **hours** (giờ), hãy đổi lại SAU KHI có đáp án SI: m → km ÷ 1000, s → giờ ÷ 3600.',
      },
      {
        tone: 'plant',
        text: 'A number like $3.59 \\times 10^6$ m is already in metres. Big is not the same as wrong — only the **unit** decides.',
        textVn: 'Một số như $3.59 \\times 10^6$ m đã ở đơn vị mét. Lớn không có nghĩa là sai — chỉ **đơn vị** mới quyết định.',
      },
    ],
    activity: {
      type: 'sort',
      id: 'act_units_sort',
      prompt: 'Sort each number: can it go straight into a formula, or must it be converted first?',
      promptVn: 'Phân loại từng số: có thể đưa thẳng vào công thức, hay phải đổi đơn vị trước?',
      explain: 'Only the unit matters. 6.78 km/s and 6.54 × 10⁵ km look "physics-ish" but are not SI; 2.34 × 10²⁹ kg looks enormous but is already in kilograms.',
      explainVn: 'Chỉ đơn vị mới quan trọng. 6.78 km/s và 6.54 × 10⁵ km trông "rất vật lý" nhưng không phải SI; 2.34 × 10²⁹ kg trông khổng lồ nhưng đã ở kilôgam.',
      bins: [
        { id: 'si', name: 'Use it as it is', nameVn: 'Dùng nguyên như vậy' },
        { id: 'conv', name: 'Convert first', nameVn: 'Đổi đơn vị trước' },
      ],
      cards: [
        { id: 'k1', name: '6.78 km/s', nameVn: '6.78 km/s', bin: 'conv' },
        { id: 'k2', name: '938 N', nameVn: '938 N', bin: 'si' },
        { id: 'k3', name: '22.7 m', nameVn: '22.7 m', bin: 'si' },
        { id: 'k4', name: '19.2 hours', nameVn: '19.2 giờ', bin: 'conv' },
        { id: 'k5', name: '2.34 × 10²⁹ kg', nameVn: '2.34 × 10²⁹ kg', bin: 'si' },
        { id: 'k6', name: '6.54 × 10⁵ km', nameVn: '6.54 × 10⁵ km', bin: 'conv' },
        { id: 'k7', name: '0.0338 m/s²', nameVn: '0.0338 m/s²', bin: 'si' },
      ],
    },
  },

  {
    layout: 'steps',
    accent: INDIGO,
    icon: 'ListChecks',
    eyebrow: 'From your Acellus screen · the method, used on every question from now on',
    eyebrowVn: 'Từ màn hình Acellus của em · phương pháp dùng cho mọi câu từ giờ trở đi',
    title: 'The Method: Five Lines, Every Time',
    titleVn: 'Phương Pháp: Năm Dòng, Mọi Lần',
    content: '**A rope breaks when the tension reaches 938 N. What is the largest mass it can swing at 6.77 m/s in a circle of radius 1.45 m?**\n\nDo not touch the calculator until line 4. The order is the whole skill.',
    contentVn: '**Một sợi dây đứt khi lực căng đạt 938 N. Khối lượng lớn nhất mà dây có thể quay với tốc độ 6.77 m/s trên đường tròn bán kính 1.45 m là bao nhiêu?**\n\nĐừng chạm vào máy tính cho tới dòng 4. Thứ tự chính là toàn bộ kỹ năng.',
    steps: [
      {
        text: '**List the pieces, with units.** $F = 938$ N (the tension does the centre-pulling job), $v = 6.77$ m/s, $r = 1.45$ m, $m = ?$ kg. All SI — nothing to convert.',
        textVn: '**Liệt kê các đại lượng, kèm đơn vị.** $F = 938$ N (lực căng làm nhiệm vụ kéo về tâm), $v = 6.77$ m/s, $r = 1.45$ m, $m = ?$ kg. Tất cả là SI — không cần đổi.',
      },
      {
        text: '**Write the formula** that links them: $F = \\dfrac{m v^2}{r}$.',
        textVn: '**Viết công thức** liên hệ chúng: $F = \\dfrac{m v^2}{r}$.',
      },
      {
        text: '**Rearrange for the unknown — with letters, before any numbers.** Multiply both sides by $r$, divide both sides by $v^2$: $m = \\dfrac{F r}{v^2}$.',
        textVn: '**Biến đổi để tìm ẩn — bằng chữ, trước khi có số.** Nhân cả hai vế với $r$, chia cả hai vế cho $v^2$: $m = \\dfrac{F r}{v^2}$.',
      },
      {
        text: '**Substitute:** $m = \\dfrac{938 \\times 1.45}{6.77^2}$.',
        textVn: '**Thay số:** $m = \\dfrac{938 \\times 1.45}{6.77^2}$.',
      },
      {
        text: '**Calculate, and answer with a unit:** $m = 29.7$ kg. Three significant figures, because the question gave three.',
        textVn: '**Tính, và trả lời kèm đơn vị:** $m = 29.7$ kg. Ba chữ số có nghĩa, vì đề bài cho ba chữ số.',
      },
    ],
    check: {
      id: 'chk_method_order',
      q: 'Which of these must happen BEFORE any number is substituted?',
      qVn: 'Điều nào sau đây phải xảy ra TRƯỚC KHI thay bất kỳ con số nào?',
      options: [
        { val: 'A', text: 'Round the answer to three significant figures', textVn: 'Làm tròn đáp án tới ba chữ số có nghĩa' },
        { val: 'B', text: 'Rearrange the formula so the unknown is alone', textVn: 'Biến đổi công thức để ẩn số đứng một mình' },
        { val: 'C', text: 'Press the square root key', textVn: 'Bấm phím căn bậc hai' },
        { val: 'D', text: 'Convert the answer into km', textVn: 'Đổi đáp án sang km' },
      ],
      correct: 'B',
      expEn: 'Rearranging with letters is line 3; numbers only arrive in line 4. Students who substitute first end up trying to solve $938 = \\dfrac{m \\times 45.8}{1.45}$ by guesswork — the algebra is far easier while the letters are still letters.',
      expVn: 'Biến đổi bằng chữ là dòng 3; số chỉ xuất hiện ở dòng 4. Học sinh thay số trước sẽ phải mò mẫm giải $938 = \\dfrac{m \\times 45.8}{1.45}$ — phép đại số dễ hơn nhiều khi các chữ vẫn còn là chữ.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Scale',
    ratio: 55,
    eyebrow: 'Rearranging is not a trick. It is undoing.',
    eyebrowVn: 'Biến đổi công thức không phải mẹo. Đó là việc hoàn tác.',
    title: 'Undo Whatever Is Done to the Target',
    titleVn: 'Hoàn Tác Những Gì Đang Tác Động Lên Ẩn Số',
    content: 'A formula is an equation, and an equation is a balance: **whatever you do to one side, do to the other** and it stays true.\n\nTo get a letter on its own, look at what is being **done** to it and do the **opposite** to both sides. In $F = \\dfrac{m v^2}{r}$ the $m$ is being **multiplied by** $v^2$ and **divided by** $r$.',
    contentVn: 'Công thức là một phương trình, và phương trình là một cái cân: **làm gì với vế này thì làm y hệt với vế kia** và nó vẫn đúng.\n\nĐể một chữ đứng một mình, hãy nhìn xem điều gì đang **tác động** lên nó và làm điều **ngược lại** với cả hai vế. Trong $F = \\dfrac{m v^2}{r}$, $m$ đang bị **nhân với** $v^2$ và **chia cho** $r$.',
    notes: [
      {
        tone: 'write',
        text: '**Undo pairs:** × undoes ÷, and ÷ undoes ×.  $\\sqrt{\\;}$ undoes $(\\;)^2$, and $(\\;)^2$ undoes $\\sqrt{\\;}$.  − undoes +, and + undoes −.\nWhatever you do, do it to **both sides**.',
        textVn: '**Các cặp hoàn tác:** × hoàn tác ÷, và ÷ hoàn tác ×.  $\\sqrt{\\;}$ hoàn tác $(\\;)^2$, và $(\\;)^2$ hoàn tác $\\sqrt{\\;}$.  − hoàn tác +, và + hoàn tác −.\nLàm gì thì làm với **cả hai vế**.',
      },
    ],
    check: {
      id: 'chk_what_is_done',
      q: 'In $g = \\dfrac{G M}{r^2}$, what is being done to $M$?',
      qVn: 'Trong $g = \\dfrac{G M}{r^2}$, điều gì đang tác động lên $M$?',
      options: [
        { val: 'A', text: 'It is multiplied by $G$ and divided by $r^2$', textVn: 'Nó bị nhân với $G$ và chia cho $r^2$' },
        { val: 'B', text: 'It is added to $G$', textVn: 'Nó bị cộng với $G$' },
        { val: 'C', text: 'It is squared', textVn: 'Nó bị bình phương' },
        { val: 'D', text: 'It is divided by $G$', textVn: 'Nó bị chia cho $G$' },
      ],
      correct: 'A',
      expEn: '$G M$ means $G$ times $M$, and the whole thing sits over $r^2$. So to free $M$ you undo both: multiply both sides by $r^2$ and divide both sides by $G$. Option C is a trap — it is $r$ that is squared, not $M$.',
      expVn: '$G M$ nghĩa là $G$ nhân $M$, và cả cụm nằm trên $r^2$. Vậy để giải phóng $M$ em hoàn tác cả hai: nhân cả hai vế với $r^2$ và chia cả hai vế cho $G$. Phương án C là bẫy — $r$ mới bị bình phương, không phải $M$.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Variable',
    eyebrow: 'Worked, move by move',
    eyebrowVn: 'Làm mẫu, từng bước một',
    title: 'Make v the Subject of F = mv²/r',
    titleVn: 'Đưa v Về Một Vế Trong F = mv²/r',
    content: 'Three moves. Read what is being done to $v$: it is **squared**, then **multiplied by** $m$, then **divided by** $r$. Undo them from the outside in, and save the square root for last.\n\n$$F = \\dfrac{m v^2}{r}$$',
    contentVn: 'Ba bước. Đọc xem điều gì đang tác động lên $v$: nó bị **bình phương**, rồi **nhân với** $m$, rồi **chia cho** $r$. Hoàn tác từ ngoài vào trong, và để căn bậc hai lại cuối cùng.\n\n$$F = \\dfrac{m v^2}{r}$$',
    steps: [
      {
        text: '$r$ is dividing, so **multiply both sides by $r$**: $F r = m v^2$. The fraction is gone.',
        textVn: '$r$ đang chia, nên **nhân cả hai vế với $r$**: $F r = m v^2$. Phân số biến mất.',
      },
      {
        text: '$m$ is multiplying, so **divide both sides by $m$**: $\\dfrac{F r}{m} = v^2$.',
        textVn: '$m$ đang nhân, nên **chia cả hai vế cho $m$**: $\\dfrac{F r}{m} = v^2$.',
      },
      {
        text: '$v$ is squared, so **take the square root of both sides**: $v = \\sqrt{\\dfrac{F r}{m}}$. The root goes over the WHOLE of the other side.',
        textVn: '$v$ bị bình phương, nên **lấy căn bậc hai cả hai vế**: $v = \\sqrt{\\dfrac{F r}{m}}$. Dấu căn phủ lên TOÀN BỘ vế kia.',
      },
      {
        text: 'Now, and only now, the numbers. For the roller coaster car ($F = 2350$ N, $m = 65.0$ kg, $r = 28.0$ m): $v = \\sqrt{\\dfrac{2350 \\times 28.0}{65.0}} = 31.8$ m/s.',
        textVn: 'Bây giờ, và chỉ bây giờ, mới đến các con số. Với toa tàu lượn ($F = 2350$ N, $m = 65.0$ kg, $r = 28.0$ m): $v = \\sqrt{\\dfrac{2350 \\times 28.0}{65.0}} = 31.8$ m/s.',
      },
    ],
    reveal: {
      label: 'Why is the root last?',
      labelVn: 'Vì sao căn để cuối?',
      prompt: 'Could you take the square root first, on $F = \\dfrac{m v^2}{r}$?',
      promptVn: 'Có thể lấy căn bậc hai trước, ngay trên $F = \\dfrac{m v^2}{r}$ không?',
      answer: 'You could, but you would get $\\sqrt{F} = v\\sqrt{\\dfrac{m}{r}}$ — roots everywhere and nothing simpler. Get $v^2$ **completely alone** first, then root once. One root at the end is always tidier than roots on every term.',
      answerVn: 'Có thể, nhưng em sẽ được $\\sqrt{F} = v\\sqrt{\\dfrac{m}{r}}$ — căn ở khắp nơi và chẳng đơn giản hơn chút nào. Hãy để $v^2$ **hoàn toàn một mình** trước, rồi lấy căn một lần. Một dấu căn ở cuối luôn gọn hơn căn trên từng số hạng.',
    },
    check: {
      id: 'chk_last_move',
      q: 'You have reached $v^2 = g r$. What is the final move to get $v$?',
      qVn: 'Em đã đến $v^2 = g r$. Bước cuối cùng để có $v$ là gì?',
      options: [
        { val: 'A', text: 'Divide both sides by 2', textVn: 'Chia cả hai vế cho 2' },
        { val: 'B', text: 'Take the square root of both sides: $v = \\sqrt{g r}$', textVn: 'Lấy căn bậc hai cả hai vế: $v = \\sqrt{g r}$' },
        { val: 'C', text: 'Square both sides', textVn: 'Bình phương cả hai vế' },
        { val: 'D', text: 'Divide both sides by $v$', textVn: 'Chia cả hai vế cho $v$' },
      ],
      correct: 'B',
      expEn: 'The square is undone by the square root, and it must cover all of $g r$: $v = \\sqrt{g r}$. Option A is the classic mistake — the little 2 is a power, not a multiplication, so dividing by 2 does nothing useful.',
      expVn: 'Bình phương được hoàn tác bằng căn bậc hai, và dấu căn phải phủ hết $g r$: $v = \\sqrt{g r}$. Phương án A là lỗi kinh điển — số 2 nhỏ là lũy thừa, không phải phép nhân, nên chia cho 2 chẳng giúp gì.',
    },
  },

  {
    layout: 'stack',
    accent: INDIGO,
    icon: 'Split',
    columns: 2,
    eyebrow: 'How to know which move',
    eyebrowVn: 'Làm sao biết chọn bước nào',
    title: 'Look at What Is Touching the Target',
    titleVn: 'Nhìn Vào Thứ Đang Bám Vào Ẩn Số',
    content: 'Five situations, five moves. Read the formula, find the target, and ask: **what is right next to it?**',
    contentVn: 'Năm tình huống, năm bước. Đọc công thức, tìm ẩn số, và hỏi: **thứ gì đang ở ngay cạnh nó?**',
    notes: [
      { tone: 'write', text: 'Target is **multiplied by** something → **divide** both sides by it.', textVn: 'Ẩn số đang **nhân với** thứ gì đó → **chia** cả hai vế cho nó.' },
      { tone: 'write', text: 'Target is **divided by** something (it is underneath) → **multiply** both sides by it.', textVn: 'Ẩn số đang **chia cho** thứ gì đó (nó nằm dưới) → **nhân** cả hai vế với nó.' },
      { tone: 'write', text: 'Target is **underneath** the fraction bar itself → multiply both sides by the target to bring it up, then carry on.', textVn: 'Ẩn số nằm **dưới** gạch phân số → nhân cả hai vế với ẩn số để đưa nó lên, rồi làm tiếp.' },
      { tone: 'write', text: 'Target is **squared** → get $\\text{target}^2$ alone, then **square root** both sides — last.', textVn: 'Ẩn số bị **bình phương** → để $\\text{ẩn}^2$ một mình, rồi **lấy căn** cả hai vế — ở bước cuối.' },
      { tone: 'write', text: 'Target is **under a root** → **square** both sides first, then it is an ordinary rearrangement.', textVn: 'Ẩn số nằm **dưới dấu căn** → **bình phương** cả hai vế trước, rồi biến đổi như bình thường.' },
      { tone: 'homework', text: 'Something is **added** to the target\'s term → **subtract** it from both sides before you multiply or divide anything.', textVn: 'Có thứ gì đó **cộng** vào số hạng chứa ẩn → **trừ** nó ở cả hai vế trước khi nhân hay chia bất cứ gì.' },
    ],
    activity: {
      type: 'order',
      id: 'act_moves_order',
      prompt: 'Put the moves in order to make r the subject of g = GM/r².',
      promptVn: 'Sắp xếp các bước theo thứ tự để đưa r về một vế trong g = GM/r².',
      explain: 'r² is underneath, so it comes up first: g r² = GM. Then g is multiplying r², so divide it away: r² = GM/g. The root is always last: r = √(GM/g).',
      explainVn: 'r² nằm dưới, nên đưa nó lên trước: g r² = GM. Rồi g đang nhân với r², nên chia nó đi: r² = GM/g. Căn luôn ở cuối: r = √(GM/g).',
      steps: [
        { id: 's1', name: 'Multiply both sides by r²', nameVn: 'Nhân cả hai vế với r²' },
        { id: 's2', name: 'Divide both sides by g', nameVn: 'Chia cả hai vế cho g' },
        { id: 's3', name: 'Take the square root of both sides', nameVn: 'Lấy căn bậc hai cả hai vế' },
      ],
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ArrowUpDown',
    ratio: 44,
    eyebrow: 'When the circle stands up',
    eyebrowVn: 'Khi đường tròn dựng đứng',
    title: 'Vertical Circles: Top and Bottom',
    titleVn: 'Đường Tròn Thẳng Đứng: Đỉnh và Đáy',
    inlineSvg: DIAGRAMS.VERTICAL_CIRCLE,
    content: 'Swing a bucket in a vertical circle and gravity joins in. The rule does not change — **the forces pointing to the centre add up to** $\\dfrac{m v^2}{r}$ — but which forces point to the centre depends on where the bucket is.\n\n**At the top** the centre is below the bucket, so the rope AND the weight both point at it. **At the bottom** the centre is above, so the rope points at it and the weight points away.',
    contentVn: 'Quay xô theo đường tròn thẳng đứng thì trọng lực cũng tham gia. Quy tắc không đổi — **các lực hướng về tâm cộng lại bằng** $\\dfrac{m v^2}{r}$ — nhưng lực nào hướng về tâm thì phụ thuộc vào vị trí của xô.\n\n**Ở đỉnh** tâm nằm dưới xô, nên dây VÀ trọng lực đều hướng về tâm. **Ở đáy** tâm nằm trên, nên dây hướng về tâm còn trọng lực hướng ra xa.',
    notes: [
      {
        tone: 'write',
        text: '**Top of the circle:** $T + m g = \\dfrac{m v^2}{r}$\n**Bottom of the circle:** $T - m g = \\dfrac{m v^2}{r}$\n($T$ can also be the normal force $N$ from a track or a seat.)',
        textVn: '**Đỉnh đường tròn:** $T + m g = \\dfrac{m v^2}{r}$\n**Đáy đường tròn:** $T - m g = \\dfrac{m v^2}{r}$\n($T$ cũng có thể là phản lực $N$ từ đường ray hoặc ghế ngồi.)',
      },
    ],
    check: {
      id: 'chk_bottom',
      q: 'At the BOTTOM of the swing, which is bigger — the tension or the weight?',
      qVn: 'Ở ĐÁY của vòng quay, cái nào lớn hơn — lực căng hay trọng lực?',
      options: [
        { val: 'A', text: 'The weight', textVn: 'Trọng lực' },
        { val: 'B', text: 'They are equal', textVn: 'Bằng nhau' },
        { val: 'C', text: 'The tension', textVn: 'Lực căng' },
        { val: 'D', text: 'It depends on the radius only', textVn: 'Chỉ phụ thuộc vào bán kính' },
      ],
      correct: 'C',
      expEn: 'At the bottom, $T - m g = \\dfrac{m v^2}{r}$, and the right-hand side is positive. So $T$ must be bigger than $m g$: the rope has to hold the weight up AND supply the centre-pull on top of that. This is why ropes snap at the bottom of a swing, never at the top.',
      expVn: 'Ở đáy, $T - m g = \\dfrac{m v^2}{r}$, và vế phải là số dương. Nên $T$ phải lớn hơn $m g$: sợi dây phải giữ trọng lượng VÀ còn cung cấp thêm lực kéo về tâm. Đó là lý do dây đứt ở đáy vòng quay, không bao giờ ở đỉnh.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Gauge',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Slowest Speed Over the Top',
    titleVn: 'Tốc Độ Chậm Nhất Khi Qua Đỉnh',
    inlineSvg: DIAGRAMS.MIN_SPEED,
    content: '**A rollercoaster loop has a radius of 22.7 m. What is the minimum speed the coaster must have at the top of the loop to not fall off the track?**\n\n"Minimum speed" is code for: the track is pushing with **nothing**. $N = 0$.',
    contentVn: '**Vòng lượn của tàu lượn có bán kính 22.7 m. Tốc độ nhỏ nhất mà tàu phải có ở đỉnh vòng lượn để không rơi khỏi đường ray là bao nhiêu?**\n\n"Tốc độ nhỏ nhất" là mật mã cho: đường ray đang đẩy với lực **bằng không**. $N = 0$.',
    steps: [
      {
        text: 'At the top: $N + m g = \\dfrac{m v^2}{r}$. Put $N = 0$: $m g = \\dfrac{m v^2}{r}$. Gravity alone is doing the whole job.',
        textVn: 'Ở đỉnh: $N + m g = \\dfrac{m v^2}{r}$. Đặt $N = 0$: $m g = \\dfrac{m v^2}{r}$. Chỉ trọng lực làm toàn bộ nhiệm vụ.',
      },
      {
        text: 'Divide both sides by $m$ — and $m$ **cancels**: $g = \\dfrac{v^2}{r}$. That is why the question never told you the mass.',
        textVn: 'Chia cả hai vế cho $m$ — và $m$ **triệt tiêu**: $g = \\dfrac{v^2}{r}$. Đó là lý do đề bài không hề cho khối lượng.',
      },
      {
        text: 'Multiply both sides by $r$, then square root: $v^2 = g r$, so $v = \\sqrt{g r}$.',
        textVn: 'Nhân cả hai vế với $r$, rồi lấy căn: $v^2 = g r$, nên $v = \\sqrt{g r}$.',
      },
      {
        text: 'Numbers last: $v = \\sqrt{9.8 \\times 22.7} = 14.9$ m/s.',
        textVn: 'Số vào cuối cùng: $v = \\sqrt{9.8 \\times 22.7} = 14.9$ m/s.',
      },
    ],
    check: {
      id: 'chk_bucket_min',
      q: 'A 5.44 kg bucket of water is swung in a full circle of radius 0.461 m, just fast enough that the water does not fall out at the top ($N = 0$). Speed at the top?',
      qVn: 'Một xô nước 5.44 kg được quay trọn một vòng bán kính 0.461 m, vừa đủ nhanh để nước không rơi ra ở đỉnh ($N = 0$). Tốc độ ở đỉnh là bao nhiêu?',
      options: [
        { val: 'A', text: '$4.52$ m/s', textVn: '$4.52$ m/s' },
        { val: 'B', text: '$24.6$ m/s', textVn: '$24.6$ m/s' },
        { val: 'C', text: '$2.13$ m/s', textVn: '$2.13$ m/s' },
        { val: 'D', text: '$0.461$ m/s', textVn: '$0.461$ m/s' },
      ],
      correct: 'C',
      expEn: 'Same formula, mass irrelevant: $v = \\sqrt{g r} = \\sqrt{9.8 \\times 0.461} = 2.13$ m/s. Option A forgot the square root ($9.8 \\times 0.461 = 4.52$). Option B multiplied the mass in — but $m$ cancelled before any number arrived.',
      expVn: 'Cùng công thức, khối lượng không liên quan: $v = \\sqrt{g r} = \\sqrt{9.8 \\times 0.461} = 2.13$ m/s. Phương án A quên lấy căn ($9.8 \\times 0.461 = 4.52$). Phương án B nhân khối lượng vào — nhưng $m$ đã triệt tiêu trước khi có số nào.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Cable',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'A Bucket With Tension at the Top',
    titleVn: 'Xô Nước Với Lực Căng Ở Đỉnh',
    content: '**A 2.25 kg bucket of water attached to a 0.809 m rope is swung in a circle. At the top, the tension in the rope is 15.5 N. What is the speed of the bucket at that point?**\n\nThis time the rope is pulling too, so it is the full top-of-circle formula.',
    contentVn: '**Một xô nước 2.25 kg buộc vào sợi dây dài 0.809 m được quay theo đường tròn. Ở đỉnh, lực căng dây là 15.5 N. Tốc độ của xô tại điểm đó là bao nhiêu?**\n\nLần này dây cũng đang kéo, nên dùng đầy đủ công thức ở đỉnh đường tròn.',
    steps: [
      {
        text: 'Pieces: $T = 15.5$ N, $m = 2.25$ kg, $r = 0.809$ m, $g = 9.8$ m/s², $v = ?$. Formula: $T + m g = \\dfrac{m v^2}{r}$.',
        textVn: 'Các đại lượng: $T = 15.5$ N, $m = 2.25$ kg, $r = 0.809$ m, $g = 9.8$ m/s², $v = ?$. Công thức: $T + m g = \\dfrac{m v^2}{r}$.',
      },
      {
        text: 'The left side is a **sum**. Keep it together in a bracket: multiply both sides by $r$ → $(T + m g)\\, r = m v^2$.',
        textVn: 'Vế trái là một **tổng**. Giữ nó chung trong ngoặc: nhân cả hai vế với $r$ → $(T + m g)\\, r = m v^2$.',
      },
      {
        text: 'Divide both sides by $m$, then root: $v = \\sqrt{\\dfrac{(T + m g)\\, r}{m}}$.',
        textVn: 'Chia cả hai vế cho $m$, rồi lấy căn: $v = \\sqrt{\\dfrac{(T + m g)\\, r}{m}}$.',
      },
      {
        text: 'Substitute — work out the bracket first: $T + m g = 15.5 + 2.25 \\times 9.8 = 37.55$. Then $v = \\sqrt{\\dfrac{37.55 \\times 0.809}{2.25}} = 3.67$ m/s.',
        textVn: 'Thay số — tính ngoặc trước: $T + m g = 15.5 + 2.25 \\times 9.8 = 37.55$. Rồi $v = \\sqrt{\\dfrac{37.55 \\times 0.809}{2.25}} = 3.67$ m/s.',
      },
    ],
    check: {
      id: 'chk_top_sign',
      q: 'A student writes $T - m g = \\dfrac{m v^2}{r}$ for the TOP of the circle. What goes wrong?',
      qVn: 'Một học sinh viết $T - m g = \\dfrac{m v^2}{r}$ cho ĐỈNH đường tròn. Sai ở đâu?',
      options: [
        { val: 'A', text: 'Nothing — the sign does not matter', textVn: 'Không sai — dấu không quan trọng' },
        { val: 'B', text: 'At the top the weight helps pull to the centre, so it should be added, not subtracted', textVn: 'Ở đỉnh trọng lực giúp kéo về tâm, nên phải cộng chứ không trừ' },
        { val: 'C', text: 'The $r$ should be on top', textVn: '$r$ phải nằm trên' },
        { val: 'D', text: 'The $v$ should not be squared', textVn: '$v$ không nên bị bình phương' },
      ],
      correct: 'B',
      expEn: 'At the top the centre is BELOW the bucket, and weight points down — toward the centre — so it adds to the tension. Subtracting it gives a smaller force and a speed that is too low. The minus sign belongs to the bottom of the circle, where weight points away from the centre.',
      expVn: 'Ở đỉnh, tâm nằm DƯỚI xô, và trọng lực hướng xuống — về phía tâm — nên nó cộng vào lực căng. Trừ đi sẽ cho lực nhỏ hơn và tốc độ quá thấp. Dấu trừ thuộc về đáy đường tròn, nơi trọng lực hướng ra xa tâm.',
    },
  },

  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Earth',
    eyebrow: 'The second formula — and the only new letter',
    eyebrowVn: 'Công thức thứ hai — và chữ cái mới duy nhất',
    title: 'Gravitational Field Strength',
    titleVn: 'Cường Độ Trường Hấp Dẫn',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$g = \\dfrac{G M}{r^2}$',
    textVn: '$g = \\dfrac{G M}{r^2}$',
    sub: 'The gravity, in m/s², at a distance r from the centre of a body of mass M.',
    subVn: 'Gia tốc trọng trường, đơn vị m/s², ở khoảng cách r tính từ tâm của một vật có khối lượng M.',
    notes: [
      {
        tone: 'write',
        text: '$g$ = gravitational field strength, **m/s²** (9.8 on Earth\'s surface — but NOT everywhere)\n$G$ = the gravitational constant, $6.67 \\times 10^{-11}$ **N m²/kg²** — always this number, always given to you\n$M$ = mass of the planet or star, **kg**\n$r$ = distance from the **centre** of $M$, **m**',
        textVn: '$g$ = cường độ trường hấp dẫn, **m/s²** (9.8 trên bề mặt Trái Đất — nhưng KHÔNG phải ở mọi nơi)\n$G$ = hằng số hấp dẫn, $6.67 \\times 10^{-11}$ **N m²/kg²** — luôn là số này, luôn được cho sẵn\n$M$ = khối lượng hành tinh hoặc ngôi sao, **kg**\n$r$ = khoảng cách từ **tâm** của $M$, **m**',
      },
      {
        tone: 'homework',
        text: 'Big $G$ and little $g$ are different things. $G$ is a constant of the universe. $g$ changes with where you are.',
        textVn: '$G$ lớn và $g$ nhỏ là hai thứ khác nhau. $G$ là hằng số của vũ trụ. $g$ thay đổi theo vị trí của em.',
      },
    ],
    check: {
      id: 'chk_r_centre',
      q: 'A satellite is 300 km above the surface of a planet of radius 6,400 km. What is $r$ in the gravity formula?',
      qVn: 'Một vệ tinh cách bề mặt một hành tinh bán kính 6,400 km một khoảng 300 km. $r$ trong công thức trọng lực là bao nhiêu?',
      options: [
        { val: 'A', text: '300 km', textVn: '300 km' },
        { val: 'B', text: '6,400 km', textVn: '6,400 km' },
        { val: 'C', text: '6,700 km', textVn: '6,700 km' },
        { val: 'D', text: '6,100 km', textVn: '6,100 km' },
      ],
      correct: 'C',
      expEn: '$r$ is always measured from the CENTRE of the planet, so it is the planet\'s radius plus the height: $6400 + 300 = 6700$ km — and then into metres before it goes anywhere near the formula. Option A is the most common slip in orbit questions.',
      expVn: '$r$ luôn được đo từ TÂM hành tinh, nên nó bằng bán kính hành tinh cộng độ cao: $6400 + 300 = 6700$ km — rồi đổi sang mét trước khi đưa vào công thức. Phương án A là lỗi phổ biến nhất trong các bài về quỹ đạo.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Superscript',
    ratio: 46,
    eyebrow: 'Why the r is squared',
    eyebrowVn: 'Vì sao r bị bình phương',
    title: 'Twice as Far, a Quarter of the Pull',
    titleVn: 'Xa Gấp Đôi, Lực Còn Một Phần Tư',
    inlineSvg: DIAGRAMS.G_FIELD,
    content: 'Gravity spreads out in every direction, so it thins out with the **square** of the distance. Double $r$ and $r^2$ is four times bigger, so $g$ is four times smaller.\n\nThis is the same little 2 as in $v^2$, and it costs marks the same way: **do not forget to square $r$ when you substitute.**',
    contentVn: 'Trọng lực lan ra mọi hướng, nên nó loãng đi theo **bình phương** khoảng cách. Gấp đôi $r$ thì $r^2$ lớn gấp bốn, nên $g$ nhỏ đi bốn lần.\n\nĐây cũng chính là số 2 nhỏ như trong $v^2$, và nó làm mất điểm theo cùng một cách: **đừng quên bình phương $r$ khi thay số.**',
    notes: [
      {
        tone: 'plant',
        text: 'Sense-check: an answer where $g$ got **bigger** as $r$ got bigger is wrong before you check any arithmetic.',
        textVn: 'Kiểm tra hợp lý: một đáp án mà $g$ **tăng** khi $r$ tăng thì đã sai trước cả khi em kiểm tra phép tính.',
      },
    ],
    check: {
      id: 'chk_inverse_square',
      q: 'You move THREE times further from the centre of a planet. Gravity there is…',
      qVn: 'Em di chuyển ra xa tâm hành tinh gấp BA lần. Trọng lực ở đó…',
      options: [
        { val: 'A', text: 'a third as strong', textVn: 'còn một phần ba' },
        { val: 'B', text: 'a ninth as strong', textVn: 'còn một phần chín' },
        { val: 'C', text: 'three times as strong', textVn: 'mạnh gấp ba' },
        { val: 'D', text: 'the same', textVn: 'như cũ' },
      ],
      correct: 'B',
      expEn: '$r$ becomes $3r$, so $r^2$ becomes $9r^2$, and $g$ is divided by 9. Option A is what you get if you read $r^2$ as $r$ — the little 2 again.',
      expVn: '$r$ thành $3r$, nên $r^2$ thành $9r^2$, và $g$ bị chia cho 9. Phương án A là kết quả khi đọc $r^2$ thành $r$ — lại là số 2 nhỏ.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Weight',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Mass of an Asteroid',
    titleVn: 'Khối Lượng Của Tiểu Hành Tinh',
    content: '**An asteroid has a radius of 111,000 m and a surface gravity of 0.0338 m/s². What is the mass of the asteroid?**\n\nThe target is $M$. Look at what is done to it: multiplied by $G$, divided by $r^2$.',
    contentVn: '**Một tiểu hành tinh có bán kính 111,000 m và gia tốc trọng trường bề mặt 0.0338 m/s². Khối lượng của tiểu hành tinh là bao nhiêu?**\n\nẨn số là $M$. Xem điều gì tác động lên nó: nhân với $G$, chia cho $r^2$.',
    steps: [
      {
        text: 'Pieces: $r = 111{,}000$ m (already metres), $g = 0.0338$ m/s², $G = 6.67 \\times 10^{-11}$, $M = ?$ kg. Formula: $g = \\dfrac{G M}{r^2}$.',
        textVn: 'Các đại lượng: $r = 111{,}000$ m (đã là mét), $g = 0.0338$ m/s², $G = 6.67 \\times 10^{-11}$, $M = ?$ kg. Công thức: $g = \\dfrac{G M}{r^2}$.',
      },
      {
        text: '$r^2$ is dividing → multiply both sides by $r^2$: $g r^2 = G M$.',
        textVn: '$r^2$ đang chia → nhân cả hai vế với $r^2$: $g r^2 = G M$.',
      },
      {
        text: '$G$ is multiplying → divide both sides by $G$: $M = \\dfrac{g r^2}{G}$.',
        textVn: '$G$ đang nhân → chia cả hai vế cho $G$: $M = \\dfrac{g r^2}{G}$.',
      },
      {
        text: 'Substitute: $M = \\dfrac{0.0338 \\times 111000^2}{6.67 \\times 10^{-11}} = 6.24 \\times 10^{18}$ kg. On a calculator, type the constant with the **EE** or **×10ˣ** key, never as "× 10 ^ −11" with extra brackets missing.',
        textVn: 'Thay số: $M = \\dfrac{0.0338 \\times 111000^2}{6.67 \\times 10^{-11}} = 6.24 \\times 10^{18}$ kg. Trên máy tính, nhập hằng số bằng phím **EE** hoặc **×10ˣ**, đừng gõ "× 10 ^ −11" mà thiếu ngoặc.',
      },
    ],
    check: {
      id: 'chk_sci_notation',
      q: 'The answer box shows [ ? ] × 10^[ ? ] kg. For $6.24 \\times 10^{18}$, what goes in the two boxes?',
      qVn: 'Ô đáp án hiện [ ? ] × 10^[ ? ] kg. Với $6.24 \\times 10^{18}$, điền gì vào hai ô?',
      options: [
        { val: 'A', text: '6.24 and 18', textVn: '6.24 và 18' },
        { val: 'B', text: '624 and 16', textVn: '624 và 16' },
        { val: 'C', text: '62.4 and 17', textVn: '62.4 và 17' },
        { val: 'D', text: '6.24 and 19', textVn: '6.24 và 19' },
      ],
      correct: 'A',
      expEn: 'In scientific notation the first number is between 1 and 10, so it is $6.24$, and the power is $18$. Options B and C are the same value written badly — Acellus marks them wrong. Option D is ten times too big.',
      expVn: 'Trong ký hiệu khoa học, số đầu tiên nằm giữa 1 và 10, nên là $6.24$, và số mũ là $18$. Phương án B và C cùng giá trị nhưng viết sai — Acellus chấm sai. Phương án D lớn gấp mười lần.',
    },
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Rocket',
    ratio: 46,
    eyebrow: 'The two formulas meet',
    eyebrowVn: 'Hai công thức gặp nhau',
    title: 'Orbits: Gravity Is the Centripetal Force',
    titleVn: 'Quỹ Đạo: Trọng Lực Là Lực Hướng Tâm',
    inlineSvg: DIAGRAMS.ORBIT,
    content: 'A satellite is falling toward the planet the whole time — it just moves sideways fast enough to keep missing. So gravity is the force doing the centre-pulling job:\n\n$$\\frac{G M m}{r^2} = \\frac{m v^2}{r}$$\n\nDivide both sides by $m$ (it cancels — the satellite\'s mass never matters) and multiply by $r$: $v^2 = \\dfrac{G M}{r}$.',
    contentVn: 'Vệ tinh đang rơi về phía hành tinh suốt thời gian — nó chỉ chuyển động ngang đủ nhanh để liên tục trượt qua. Vậy trọng lực là lực làm nhiệm vụ kéo về tâm:\n\n$$\\frac{G M m}{r^2} = \\frac{m v^2}{r}$$\n\nChia cả hai vế cho $m$ (nó triệt tiêu — khối lượng vệ tinh không bao giờ quan trọng) và nhân với $r$: $v^2 = \\dfrac{G M}{r}$.',
    notes: [
      {
        tone: 'write',
        text: '**Orbital speed:** $v = \\sqrt{\\dfrac{G M}{r}}$\nIf you are given $g$ at that radius instead of $M$: $v = \\sqrt{g r}$ (because $g = \\dfrac{G M}{r^2}$).',
        textVn: '**Tốc độ quỹ đạo:** $v = \\sqrt{\\dfrac{G M}{r}}$\nNếu đề cho $g$ tại bán kính đó thay vì $M$: $v = \\sqrt{g r}$ (vì $g = \\dfrac{G M}{r^2}$).',
      },
    ],
    check: {
      id: 'chk_mars_satellite',
      q: 'A satellite orbits Mars $3.59 \\times 10^6$ m from its centre. The gravitational acceleration at that radius is $3.71$ m/s². Its speed?',
      qVn: 'Một vệ tinh quay quanh Sao Hỏa cách tâm $3.59 \\times 10^6$ m. Gia tốc trọng trường tại bán kính đó là $3.71$ m/s². Tốc độ của nó?',
      options: [
        { val: 'A', text: '$1.33 \\times 10^7$ m/s', textVn: '$1.33 \\times 10^7$ m/s' },
        { val: 'B', text: '$3650$ m/s', textVn: '$3650$ m/s' },
        { val: 'C', text: '$1910$ m/s', textVn: '$1910$ m/s' },
        { val: 'D', text: '$5930$ m/s', textVn: '$5930$ m/s' },
      ],
      correct: 'B',
      expEn: 'You are given $g$, not $M$, so use $v = \\sqrt{g r} = \\sqrt{3.71 \\times 3.59 \\times 10^6} = 3650$ m/s. Option A is $g r$ without the square root. Option D used 9.8 — but Mars has its own $g$, and the question gave it to you.',
      expVn: 'Đề cho $g$, không cho $M$, nên dùng $v = \\sqrt{g r} = \\sqrt{3.71 \\times 3.59 \\times 10^6} = 3650$ m/s. Phương án A là $g r$ chưa lấy căn. Phương án D dùng 9.8 — nhưng Sao Hỏa có $g$ riêng, và đề đã cho.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Rocket',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Mass of a Mysterious Planet',
    titleVn: 'Khối Lượng Của Hành Tinh Bí Ẩn',
    content: '**The Enterprise goes into orbit around a mysterious planet. The ship moves at 4,220 m/s in a circle of radius 4.91 × 10⁷ m. What is the mass of the planet?**\n\nThe target $M$ is under a square root. Rule: **square first**.',
    contentVn: '**Tàu Enterprise đi vào quỹ đạo quanh một hành tinh bí ẩn. Tàu chuyển động với tốc độ 4,220 m/s trên đường tròn bán kính 4.91 × 10⁷ m. Khối lượng của hành tinh là bao nhiêu?**\n\nẨn số $M$ nằm dưới căn bậc hai. Quy tắc: **bình phương trước**.',
    steps: [
      {
        text: 'Pieces: $v = 4220$ m/s, $r = 4.91 \\times 10^7$ m, $G = 6.67 \\times 10^{-11}$, $M = ?$. Formula: $v = \\sqrt{\\dfrac{G M}{r}}$.',
        textVn: 'Các đại lượng: $v = 4220$ m/s, $r = 4.91 \\times 10^7$ m, $G = 6.67 \\times 10^{-11}$, $M = ?$. Công thức: $v = \\sqrt{\\dfrac{G M}{r}}$.',
      },
      {
        text: 'Square both sides — the root disappears: $v^2 = \\dfrac{G M}{r}$.',
        textVn: 'Bình phương cả hai vế — dấu căn biến mất: $v^2 = \\dfrac{G M}{r}$.',
      },
      {
        text: '$r$ is dividing → multiply by $r$: $v^2 r = G M$. $G$ is multiplying → divide by $G$: $M = \\dfrac{v^2 r}{G}$.',
        textVn: '$r$ đang chia → nhân với $r$: $v^2 r = G M$. $G$ đang nhân → chia cho $G$: $M = \\dfrac{v^2 r}{G}$.',
      },
      {
        text: 'Substitute: $M = \\dfrac{4220^2 \\times 4.91 \\times 10^7}{6.67 \\times 10^{-11}} = 1.31 \\times 10^{25}$ kg. Square the 4220 — the little 2 is still there after rearranging.',
        textVn: 'Thay số: $M = \\dfrac{4220^2 \\times 4.91 \\times 10^7}{6.67 \\times 10^{-11}} = 1.31 \\times 10^{25}$ kg. Bình phương 4220 — số 2 nhỏ vẫn còn đó sau khi biến đổi.',
      },
    ],
    check: {
      id: 'chk_square_first',
      q: 'What is the FIRST move when the target is inside a square root, as in $v = \\sqrt{\\dfrac{G M}{r}}$?',
      qVn: 'Bước ĐẦU TIÊN khi ẩn số nằm trong căn bậc hai, như $v = \\sqrt{\\dfrac{G M}{r}}$, là gì?',
      options: [
        { val: 'A', text: 'Divide both sides by $G$', textVn: 'Chia cả hai vế cho $G$' },
        { val: 'B', text: 'Square both sides', textVn: 'Bình phương cả hai vế' },
        { val: 'C', text: 'Take the square root of both sides', textVn: 'Lấy căn bậc hai cả hai vế' },
        { val: 'D', text: 'Substitute the numbers', textVn: 'Thay số' },
      ],
      correct: 'B',
      expEn: 'Squaring undoes the root and leaves $v^2 = \\dfrac{G M}{r}$, an ordinary rearrangement. Dividing by $G$ while the root is still there (option A) gives $\\dfrac{v}{G} = \\sqrt{\\dfrac{M}{G r}}$ — legal, but a mess.',
      expVn: 'Bình phương hoàn tác dấu căn và để lại $v^2 = \\dfrac{G M}{r}$, một phép biến đổi bình thường. Chia cho $G$ khi dấu căn còn đó (phương án A) cho $\\dfrac{v}{G} = \\sqrt{\\dfrac{M}{G r}}$ — hợp lệ, nhưng rối tung.',
    },
  },

  {
    layout: 'steps',
    accent: AMBER,
    icon: 'AlertTriangle',
    eyebrow: 'From your Acellus screen · "Hint: pay attention to your units!"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Gợi ý: chú ý đơn vị!"',
    title: 'The km/s Trap',
    titleVn: 'Cái Bẫy km/s',
    content: '**A "super Earth" exoplanet orbits a far-away star of mass 2.34 × 10²⁹ kg. The velocity of the orbit is 6.78 km/s. What is the radius of the orbit, in km?**\n\nTwo conversions: one on the way in, one on the way out.',
    contentVn: '**Một ngoại hành tinh "siêu Trái Đất" quay quanh một ngôi sao xa có khối lượng 2.34 × 10²⁹ kg. Vận tốc quỹ đạo là 6.78 km/s. Bán kính quỹ đạo là bao nhiêu km?**\n\nHai lần đổi đơn vị: một ở đầu vào, một ở đầu ra.',
    steps: [
      {
        text: 'Pieces — and convert: $v = 6.78$ km/s $= 6780$ m/s. $M = 2.34 \\times 10^{29}$ kg is already SI. $r = ?$',
        textVn: 'Các đại lượng — và đổi đơn vị: $v = 6.78$ km/s $= 6780$ m/s. $M = 2.34 \\times 10^{29}$ kg đã là SI. $r = ?$',
      },
      {
        text: 'Formula $v = \\sqrt{\\dfrac{G M}{r}}$. Square: $v^2 = \\dfrac{G M}{r}$. Multiply by $r$: $v^2 r = G M$. Divide by $v^2$: $r = \\dfrac{G M}{v^2}$.',
        textVn: 'Công thức $v = \\sqrt{\\dfrac{G M}{r}}$. Bình phương: $v^2 = \\dfrac{G M}{r}$. Nhân với $r$: $v^2 r = G M$. Chia cho $v^2$: $r = \\dfrac{G M}{v^2}$.',
      },
      {
        text: 'Substitute in SI: $r = \\dfrac{6.67 \\times 10^{-11} \\times 2.34 \\times 10^{29}}{6780^2} = 3.40 \\times 10^{11}$ m.',
        textVn: 'Thay số theo SI: $r = \\dfrac{6.67 \\times 10^{-11} \\times 2.34 \\times 10^{29}}{6780^2} = 3.40 \\times 10^{11}$ m.',
      },
      {
        text: 'The box wants km: $3.40 \\times 10^{11}$ m $\\div 1000 = 3.40 \\times 10^{8}$ km.',
        textVn: 'Ô đáp án muốn km: $3.40 \\times 10^{11}$ m $\\div 1000 = 3.40 \\times 10^{8}$ km.',
      },
    ],
    reveal: {
      label: 'What if you forget to convert 6.78?',
      labelVn: 'Nếu quên đổi 6.78 thì sao?',
      prompt: 'Put 6.78 straight into $r = \\dfrac{G M}{v^2}$. How wrong is the answer?',
      promptVn: 'Đưa thẳng 6.78 vào $r = \\dfrac{G M}{v^2}$. Đáp án sai bao nhiêu?',
      answer: 'You get $3.40 \\times 10^{17}$ m — a **million** times too big, because $v$ was 1000 times too small and it is squared. The digits 3.40 look right, which is exactly what makes the mistake so easy to miss. Check the power, not just the digits.',
      answerVn: 'Em được $3.40 \\times 10^{17}$ m — lớn gấp **một triệu** lần, vì $v$ nhỏ đi 1000 lần và nó bị bình phương. Các chữ số 3.40 trông đúng, và đó chính là điều khiến lỗi này dễ bị bỏ qua. Hãy kiểm tra số mũ, không chỉ các chữ số.',
    },
    check: {
      id: 'chk_kms',
      q: 'Convert 6.78 km/s into m/s.',
      qVn: 'Đổi 6.78 km/s sang m/s.',
      options: [
        { val: 'A', text: '0.00678 m/s', textVn: '0.00678 m/s' },
        { val: 'B', text: '67.8 m/s', textVn: '67.8 m/s' },
        { val: 'C', text: '6780 m/s', textVn: '6780 m/s' },
        { val: 'D', text: '6.78 m/s', textVn: '6.78 m/s' },
      ],
      correct: 'C',
      expEn: 'One kilometre is 1000 metres, so 6.78 km every second is 6780 m every second. Kilo always means a thousand; the seconds are unchanged.',
      expVn: 'Một kilômét là 1000 mét, nên 6.78 km mỗi giây là 6780 m mỗi giây. Kilo luôn nghĩa là một nghìn; giây thì không đổi.',
    },
  },

  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Timer',
    ratio: 46,
    eyebrow: 'The last formula',
    eyebrowVn: 'Công thức cuối cùng',
    title: 'The Period: Time for One Lap',
    titleVn: 'Chu Kỳ: Thời Gian Cho Một Vòng',
    inlineSvg: DIAGRAMS.PERIOD,
    content: 'One lap is one circumference, $2\\pi r$. Time is distance divided by speed. That is the whole idea:\n\n$$T = \\frac{2 \\pi r}{v}$$\n\nFor an orbit, put $v = \\sqrt{\\dfrac{G M}{r}}$ into it and tidy up, and you get the version Acellus uses.',
    contentVn: 'Một vòng là một chu vi, $2\\pi r$. Thời gian bằng quãng đường chia cho tốc độ. Toàn bộ ý tưởng chỉ có vậy:\n\n$$T = \\frac{2 \\pi r}{v}$$\n\nVới quỹ đạo, thay $v = \\sqrt{\\dfrac{G M}{r}}$ vào rồi rút gọn, em được phiên bản mà Acellus dùng.',
    notes: [
      {
        tone: 'write',
        text: '**Period of any circle:** $T = \\dfrac{2 \\pi r}{v}$, in **seconds**.\n**Period of an orbit:** $T = 2\\pi\\sqrt{\\dfrac{r^3}{G M}}$ — the $r$ is **cubed**.',
        textVn: '**Chu kỳ của mọi chuyển động tròn:** $T = \\dfrac{2 \\pi r}{v}$, đơn vị **giây**.\n**Chu kỳ của quỹ đạo:** $T = 2\\pi\\sqrt{\\dfrac{r^3}{G M}}$ — $r$ bị **lập phương**.',
      },
      {
        tone: 'info',
        text: 'The formula gives seconds. If the box says **hours**, divide by 3600 at the very end.',
        textVn: 'Công thức cho ra giây. Nếu ô đáp án ghi **hours** (giờ), chia cho 3600 ở bước cuối cùng.',
      },
    ],
    check: {
      id: 'chk_period_units',
      q: 'A satellite goes round once every 90 minutes. What is $T$ in the units the formula uses?',
      qVn: 'Một vệ tinh đi hết một vòng mỗi 90 phút. $T$ theo đơn vị công thức dùng là bao nhiêu?',
      options: [
        { val: 'A', text: '90', textVn: '90' },
        { val: 'B', text: '1.5', textVn: '1.5' },
        { val: 'C', text: '5400', textVn: '5400' },
        { val: 'D', text: '540', textVn: '540' },
      ],
      correct: 'C',
      expEn: 'The formula uses seconds: $90 \\times 60 = 5400$ s. Option B is hours and option A is minutes — both true, neither usable in $T = 2\\pi\\sqrt{r^3 / G M}$.',
      expVn: 'Công thức dùng giây: $90 \\times 60 = 5400$ s. Phương án B là giờ và phương án A là phút — cả hai đều đúng, nhưng không dùng được trong $T = 2\\pi\\sqrt{r^3 / G M}$.',
    },
  },

  {
    layout: 'steps',
    accent: AMBER,
    icon: 'Timer',
    eyebrow: 'From your Acellus screen · "Hint: pay attention to your units!"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Gợi ý: chú ý đơn vị!"',
    title: 'A Period in Hours',
    titleVn: 'Chu Kỳ Tính Bằng Giờ',
    content: '**A "super Earth" exoplanet orbits a far-away star of mass 3.45 × 10²⁸ kg. The radius of the orbit is 6.54 × 10⁵ km. What is the period of the orbit, in hours?**\n\nNo rearranging at all this time — $T$ is already the subject. The whole question is units.',
    contentVn: '**Một ngoại hành tinh "siêu Trái Đất" quay quanh một ngôi sao xa có khối lượng 3.45 × 10²⁸ kg. Bán kính quỹ đạo là 6.54 × 10⁵ km. Chu kỳ quỹ đạo là bao nhiêu giờ?**\n\nLần này không cần biến đổi gì — $T$ đã là chủ thể. Cả câu hỏi chỉ xoay quanh đơn vị.',
    steps: [
      {
        text: 'Convert on the way in: $r = 6.54 \\times 10^5$ km $= 6.54 \\times 10^8$ m. (Multiplying by 1000 adds 3 to the power.)',
        textVn: 'Đổi đơn vị ở đầu vào: $r = 6.54 \\times 10^5$ km $= 6.54 \\times 10^8$ m. (Nhân với 1000 thì cộng 3 vào số mũ.)',
      },
      {
        text: 'Formula: $T = 2\\pi\\sqrt{\\dfrac{r^3}{G M}}$. Substitute: $T = 2\\pi\\sqrt{\\dfrac{(6.54 \\times 10^8)^3}{6.67 \\times 10^{-11} \\times 3.45 \\times 10^{28}}}$.',
        textVn: 'Công thức: $T = 2\\pi\\sqrt{\\dfrac{r^3}{G M}}$. Thay số: $T = 2\\pi\\sqrt{\\dfrac{(6.54 \\times 10^8)^3}{6.67 \\times 10^{-11} \\times 3.45 \\times 10^{28}}}$.',
      },
      {
        text: 'Work inside the root first, then root, then $\\times 2\\pi$: $T = 69{,}300$ s.',
        textVn: 'Tính bên trong dấu căn trước, rồi lấy căn, rồi $\\times 2\\pi$: $T = 69{,}300$ s.',
      },
      {
        text: 'Convert on the way out: $69{,}300 \\div 3600 = 19.2$ hours.',
        textVn: 'Đổi đơn vị ở đầu ra: $69{,}300 \\div 3600 = 19.2$ giờ.',
      },
    ],
    check: {
      id: 'chk_hours',
      q: 'A period comes out of the formula as 69,300 s. What goes in a box labelled "hours"?',
      qVn: 'Chu kỳ tính từ công thức là 69,300 s. Điền gì vào ô ghi "hours" (giờ)?',
      options: [
        { val: 'A', text: '69,300', textVn: '69,300' },
        { val: 'B', text: '1155', textVn: '1155' },
        { val: 'C', text: '19.2', textVn: '19.2' },
        { val: 'D', text: '0.80', textVn: '0.80' },
      ],
      correct: 'C',
      expEn: 'An hour is 3600 s, so $69300 \\div 3600 = 19.2$ hours. Option B divided by 60 — that is minutes. Option D divided by 86,400 — that is days.',
      expVn: 'Một giờ là 3600 s, nên $69300 \\div 3600 = 19.2$ giờ. Phương án B chia cho 60 — đó là phút. Phương án D chia cho 86,400 — đó là ngày.',
    },
  },

  {
    layout: 'stack',
    accent: RED,
    icon: 'PenLine',
    columns: 2,
    eyebrow: 'Your formula page — check your notebook against this',
    eyebrowVn: 'Trang công thức của em — đối chiếu vở với trang này',
    title: 'The Whole Module on One Page',
    titleVn: 'Cả Bài Trên Một Trang',
    content: 'Eight lines. Not more. Beside each one, write **when** it is the right one — that is the part the formula sheet never tells you.',
    contentVn: 'Tám dòng. Không hơn. Bên cạnh mỗi dòng, ghi **khi nào** dùng nó — đó là phần mà bảng công thức không bao giờ nói cho em.',
    notes: [
      { tone: 'write', text: '**1.** $F = \\dfrac{m v^2}{r}$ — any circle. $F$ is whichever real force points to the centre.', textVn: '**1.** $F = \\dfrac{m v^2}{r}$ — mọi đường tròn. $F$ là lực thật nào hướng về tâm.' },
      { tone: 'write', text: '**2.** Top of a vertical circle: $T + m g = \\dfrac{m v^2}{r}$', textVn: '**2.** Đỉnh đường tròn thẳng đứng: $T + m g = \\dfrac{m v^2}{r}$' },
      { tone: 'write', text: '**3.** Bottom of a vertical circle: $T - m g = \\dfrac{m v^2}{r}$', textVn: '**3.** Đáy đường tròn thẳng đứng: $T - m g = \\dfrac{m v^2}{r}$' },
      { tone: 'write', text: '**4.** Slowest speed over the top ($N = 0$): $v = \\sqrt{g r}$', textVn: '**4.** Tốc độ chậm nhất qua đỉnh ($N = 0$): $v = \\sqrt{g r}$' },
      { tone: 'write', text: '**5.** Gravity at distance $r$ from the centre: $g = \\dfrac{G M}{r^2}$', textVn: '**5.** Trọng lực ở khoảng cách $r$ từ tâm: $g = \\dfrac{G M}{r^2}$' },
      { tone: 'write', text: '**6.** Orbital speed: $v = \\sqrt{\\dfrac{G M}{r}}$ — or $v = \\sqrt{g r}$ if $g$ at that radius is given', textVn: '**6.** Tốc độ quỹ đạo: $v = \\sqrt{\\dfrac{G M}{r}}$ — hoặc $v = \\sqrt{g r}$ nếu đề cho $g$ tại bán kính đó' },
      { tone: 'write', text: '**7.** Period of any circle: $T = \\dfrac{2 \\pi r}{v}$', textVn: '**7.** Chu kỳ của mọi chuyển động tròn: $T = \\dfrac{2 \\pi r}{v}$' },
      { tone: 'write', text: '**8.** Period of an orbit: $T = 2\\pi\\sqrt{\\dfrac{r^3}{G M}}$', textVn: '**8.** Chu kỳ của quỹ đạo: $T = 2\\pi\\sqrt{\\dfrac{r^3}{G M}}$' },
      { tone: 'info', text: '**Constants:** $g = 9.8$ m/s² (Earth\'s surface only) · $G = 6.67 \\times 10^{-11}$ N m²/kg² (everywhere, always)', textVn: '**Hằng số:** $g = 9.8$ m/s² (chỉ trên bề mặt Trái Đất) · $G = 6.67 \\times 10^{-11}$ N m²/kg² (mọi nơi, mọi lúc)' },
      { tone: 'info', text: '**Units in:** m, kg, s, N, m/s. **Convert:** km ×1000 → m · km/s ×1000 → m/s · hours ×3600 → s', textVn: '**Đơn vị đưa vào:** m, kg, s, N, m/s. **Đổi:** km ×1000 → m · km/s ×1000 → m/s · giờ ×3600 → s' },
    ],
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The four marks this module gives away',
    eyebrowVn: 'Bốn lỗi mất điểm của bài này',
    title: 'Watch Out',
    titleVn: 'Cẩn Thận',
    content: 'Before you type an answer into the green box, check all four.',
    contentVn: 'Trước khi gõ đáp án vào ô xanh, hãy kiểm tra đủ bốn điều.',
    notes: [
      { tone: 'homework', text: '**1. Units.** A km, a km/s or an hour went into the formula unconverted — or the box wanted km and you gave metres.', textVn: '**1. Đơn vị.** Một km, một km/s hay một giờ đã vào công thức mà chưa đổi — hoặc ô muốn km mà em đưa mét.' },
      { tone: 'homework', text: '**2. The little 2.** You forgot to square $v$ or $r$ when substituting, or forgot the square root at the end.', textVn: '**2. Số 2 nhỏ.** Em quên bình phương $v$ hay $r$ khi thay số, hoặc quên lấy căn ở cuối.' },
      { tone: 'homework', text: '**3. Numbers too early.** You substituted before rearranging and then could not undo the arithmetic. Letters first, always.', textVn: '**3. Thay số quá sớm.** Em thay số trước khi biến đổi rồi không gỡ được phép tính. Luôn luôn chữ trước.' },
      { tone: 'homework', text: '**4. The wrong $r$.** Height above the ground is not $r$; $r$ is from the centre. And $6.24 \\times 10^{18}$ is typed as 6.24 and 18, not 624 and 16.', textVn: '**4. Sai $r$.** Độ cao so với mặt đất không phải $r$; $r$ đo từ tâm. Và $6.24 \\times 10^{18}$ gõ là 6.24 và 18, không phải 624 và 16.' },
    ],
  },

  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'ListChecks',
    columns: 2,
    eyebrow: 'You can now',
    eyebrowVn: 'Bây giờ em có thể',
    title: 'Recap',
    titleVn: 'Tổng Kết',
    content: 'Your notebook should have **8 formulas**, the **undo pairs**, and the **units table**. Check.',
    contentVn: 'Vở của em cần có **8 công thức**, **các cặp hoàn tác**, và **bảng đơn vị**. Kiểm tra lại.',
    items: [
      { text: 'Say which real force is doing the centripetal job in a question', textVn: 'Nói được lực thật nào đang làm nhiệm vụ hướng tâm trong một câu hỏi' },
      { text: 'Read what is being done to the target and undo it, both sides, one move at a time', textVn: 'Đọc điều gì đang tác động lên ẩn số và hoàn tác nó, cả hai vế, từng bước một' },
      { text: 'Square first when the target is under a root; root last when it is squared', textVn: 'Bình phương trước khi ẩn nằm dưới căn; lấy căn cuối cùng khi ẩn bị bình phương' },
      { text: 'Add the weight at the top of a vertical circle and subtract it at the bottom', textVn: 'Cộng trọng lực ở đỉnh đường tròn thẳng đứng và trừ nó ở đáy' },
      { text: 'Use N = 0 for "minimum speed", and let the mass cancel', textVn: 'Dùng N = 0 cho "tốc độ nhỏ nhất", và để khối lượng triệt tiêu' },
      { text: 'Measure r from the centre, and square it in the gravity formula', textVn: 'Đo r từ tâm, và bình phương nó trong công thức trọng lực' },
      { text: 'Convert km, km/s and hours into SI before substituting, and back afterwards if asked', textVn: 'Đổi km, km/s và giờ sang SI trước khi thay số, và đổi lại sau đó nếu đề yêu cầu' },
      { text: 'Type a 10ⁿ answer as its first number and its power', textVn: 'Gõ một đáp án dạng 10ⁿ bằng số đầu và số mũ của nó' },
    ],
  },
];
