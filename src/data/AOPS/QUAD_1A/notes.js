// src/data/AOPS/QUAD_1A/notes.js
// QUAD_1A — Parabolas and the Vertex Form. Adapted for self-study from the
// classroom deck in the sibling `lessons` repo (content/freshman-math/U01_4).
//
// THE DECK NEVER STATES A RULE THE STUDENT HAS NOT ALREADY SEEN HAPPEN.
// Every transformation arrives the same way three times over: work it out from
// a table, look at what moved, and only then name the letter that did it. The
// sliders always come AFTER the paper — on a slider alone the curve is a video
// you watched, not a fact you own.
//
// The spine:
//   1-4    y = x² from a table of seven values; parabola, vertex, axis of symmetry
//   5-9    y = x² + k predicted before it is plotted, then the k and a sliders
//   10-13  y = x² + 2x: predict it, build it, find the bottom one BELOW the axis
//          and one to the left; decide to add 1 to lift it onto the axis
//   14-17  that makes x² + 2x + 1, which is (x + 1)² — so the vertex becomes
//          readable; plot from the vertex outwards; then (x − 2)² and the sign trap
//   18-22  the h slider, the full vertex form, and a recap
//
// Nobody is taught to complete the square here. They move a picture, and the
// algebra follows — which is what makes slide 14 land instead of being a rule.
//
// House notes:
//  - `$…$` is inline KaTeX and is used freely; there is no money in this unit,
//    so a bare dollar sign never appears.
//  - Layout `title` and hero `objective` are plain text (never parsed), so no
//    markdown or math goes in them.
//  - Icons must exist in the ICONS map in notes/layouts/primitives.jsx.
//  - Seven `check` questions carry the NOTES score, so the XP is earned rather
//    than paid for reaching the last slide.
import { DIAGRAMS } from './diagrams.js';

const PURPLE = '#7c3aed';
const AMBER = '#d97706';
const GREEN = '#10b981';
const RED = '#ef4444';
const BLUE = '#3b82f6';

export const notes = [
  {
    layout: 'hero',
    color: '#a21caf',
    icon: 'Calculator',
    brand: 'Problem Solving',
    brandVn: 'Giải Toán',
    eyebrow: 'Quadratics · 1 of 2',
    eyebrowVn: 'Hàm bậc hai · bài 1 trên 2',
    title: 'Parabolas and the Vertex Form',
    titleVn: 'Parabol và Dạng Đỉnh',
    objective: 'I can plot a parabola, name its vertex, and read the vertex straight off an equation written as y = a(x - h)^2 + k.',
    objectiveVn: 'Em có thể vẽ một parabol, gọi tên đỉnh của nó, và đọc ngay tọa độ đỉnh từ phương trình dạng y = a(x - h)^2 + k.',
    card: {
      icon: 'Pencil',
      badge: 'Warm-Up · Do this now in your book',
      badgeVn: 'Khởi động · Làm ngay vào vở',
      text: 'Work out $x^2$ for $x = -3, -2, -1, 0, 1, 2, 3$. **Seven answers.** Keep them — you will plot them in a moment.',
      textVn: 'Tính $x^2$ với $x = -3, -2, -1, 0, 1, 2, 3$. **Bảy đáp án.** Giữ lại — lát nữa em sẽ vẽ chúng.',
    },
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Boxes',
    ratio: 46,
    eyebrow: 'Check your seven answers',
    eyebrowVn: 'Kiểm tra bảy đáp án của em',
    title: 'The Table',
    titleVn: 'Bảng Giá Trị',
    inlineSvg: DIAGRAMS.X2_TABLE,
    content: 'Squaring a negative number gives a **positive** answer, because a negative times a negative is positive.\n\nSo the two ends of the table match: $(-3)^2$ and $3^2$ are both $9$.',
    contentVn: 'Bình phương một số âm cho kết quả **dương**, vì âm nhân âm bằng dương.\n\nVì vậy hai đầu của bảng giống nhau: $(-3)^2$ và $3^2$ đều bằng $9$.',
    notes: [
      {
        tone: 'task',
        badge: 'Now plot them',
        badgeVn: 'Bây giờ vẽ chúng',
        text: 'Seven points on your axes, then join them with a **smooth curve** — not straight lines.',
        textVn: 'Bảy điểm trên hệ trục của em, rồi nối chúng bằng một **đường cong trơn** — không phải các đoạn thẳng.',
      },
    ],
    check: {
      id: 'chk_neg_square',
      q: 'What is $(-5)^2$?',
      qVn: '$(-5)^2$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$-25$', textVn: '$-25$' },
        { val: 'B', text: '$25$', textVn: '$25$' },
        { val: 'C', text: '$-10$', textVn: '$-10$' },
      ],
      correct: 'B',
      expEn: 'Squaring means multiplying the number by itself: $(-5) \\times (-5) = 25$. Two negatives multiply to a positive. Option C multiplies by 2 instead of squaring.',
      expVn: 'Bình phương nghĩa là nhân số đó với chính nó: $(-5) \\times (-5) = 25$. Hai số âm nhân nhau ra số dương. Đáp án C là nhân 2 thay vì bình phương.',
    },
  },

  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Activity',
    eyebrow: 'Compare yours with this',
    eyebrowVn: 'So sánh bài của em với hình này',
    title: 'Seven Points, One Curve',
    titleVn: 'Bảy Điểm, Một Đường Cong',
    inlineSvg: DIAGRAMS.X2_POINTS,
    drawThis: true,
    caption: 'The left arm climbs because squaring a negative gives a positive. It is not a V and it is not a U — the bottom is smooth.',
    captionVn: 'Nhánh bên trái đi lên vì bình phương số âm cho số dương. Đây không phải chữ V và cũng không phải chữ U — phần đáy cong trơn.',
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'BookOpen',
    side: 'left',
    ratio: 46,
    eyebrow: 'Three words to own',
    eyebrowVn: 'Ba từ cần thuộc',
    title: 'Naming the Parts',
    titleVn: 'Gọi Tên Các Bộ Phận',
    inlineSvg: DIAGRAMS.X2_CURVE,
    content: 'Every curve in this unit is one of these. Only its **position** and its **width** will change.',
    contentVn: 'Mọi đường cong trong bài này đều là hình đó. Chỉ có **vị trí** và **độ rộng** của nó thay đổi.',
    notes: [
      {
        tone: 'write',
        text: '**Parabola:** the curve you get from squaring.\n**Vertex:** the turning point. **Axis of symmetry:** the mirror line through it.',
        textVn: '**Parabol:** đường cong nhận được từ phép bình phương.\n**Đỉnh:** điểm quay đầu. **Trục đối xứng:** đường thẳng làm gương đi qua đỉnh.',
      },
    ],
    check: {
      id: 'chk_vertex_name',
      q: 'Where is the **vertex** of $y = x^2$?',
      qVn: '**Đỉnh** của $y = x^2$ nằm ở đâu?',
      options: [
        { val: 'A', text: 'At $(0, 0)$', textVn: 'Tại $(0, 0)$' },
        { val: 'B', text: 'At the top of the left arm', textVn: 'Ở đầu nhánh bên trái' },
        { val: 'C', text: 'There are two, one on each arm', textVn: 'Có hai đỉnh, mỗi nhánh một cái' },
      ],
      correct: 'A',
      expEn: 'The vertex is the single turning point — the lowest place on this curve, at the origin $(0, 0)$. A parabola has exactly one vertex, and both arms rise away from it.',
      expVn: 'Đỉnh là điểm quay đầu duy nhất — chỗ thấp nhất của đường cong này, tại gốc tọa độ $(0, 0)$. Một parabol chỉ có đúng một đỉnh, và hai nhánh đều đi lên từ đó.',
    },
  },

  {
    layout: 'statement',
    accent: GREEN,
    icon: 'HelpCircle',
    eyebrow: 'Answer before you scroll on',
    eyebrowVn: 'Trả lời trước khi cuộn tiếp',
    title: 'Predict This One',
    titleVn: 'Dự Đoán Đồ Thị Này',
    label: 'Your turn',
    labelVn: 'Đến lượt em',
    labelIcon: 'HelpCircle',
    text: '$y = x^2 + 1$',
    textVn: '$y = x^2 + 1$',
    sub: 'Every $y$ you just worked out gets **one added to it**. So what happens to your curve?',
    subVn: 'Mỗi giá trị $y$ em vừa tính đều được **cộng thêm một**. Vậy đường cong sẽ ra sao?',
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'ArrowRight',
    ratio: 48,
    eyebrow: 'The whole curve, one step up',
    eyebrowVn: 'Cả đường cong, đi lên một bước',
    title: 'Adding 1',
    titleVn: 'Cộng Thêm 1',
    inlineSvg: DIAGRAMS.SHIFT_UP,
    content: 'Same shape. Same width. Every single point is **one higher** than before.\n\nThe vertex moved from $(0, 0)$ to $(0, 1)$.',
    contentVn: 'Cùng hình dạng. Cùng độ rộng. Mọi điểm đều **cao hơn một đơn vị** so với trước.\n\nĐỉnh dịch từ $(0, 0)$ lên $(0, 1)$.',
    notes: [
      {
        tone: 'write',
        text: '**$y = x^2 + k$** slides the parabola **up by $k$**. A negative $k$ slides it **down**.',
        textVn: '**$y = x^2 + k$** trượt parabol **lên $k$ đơn vị**. Nếu $k$ âm thì trượt **xuống**.',
      },
    ],
    check: {
      id: 'chk_k_down',
      q: 'Where is the vertex of $y = x^2 - 4$?',
      qVn: 'Đỉnh của $y = x^2 - 4$ nằm ở đâu?',
      options: [
        { val: 'A', text: '$(0, 4)$', textVn: '$(0, 4)$' },
        { val: 'B', text: '$(-4, 0)$', textVn: '$(-4, 0)$' },
        { val: 'C', text: '$(0, -4)$', textVn: '$(0, -4)$' },
      ],
      correct: 'C',
      expEn: 'Here $k = -4$, so every $y$ drops by 4 and the whole curve slides DOWN. The vertex goes from $(0, 0)$ to $(0, -4)$. Option B moves it sideways, which nothing in this equation does.',
      expVn: 'Ở đây $k = -4$, nên mọi $y$ giảm 4 và cả đường cong trượt XUỐNG. Đỉnh đi từ $(0, 0)$ tới $(0, -4)$. Đáp án B dịch sang ngang, điều mà phương trình này không hề làm.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Zap',
    ratio: 42,
    eyebrow: 'Drag it — watch the vertex, not the arms',
    eyebrowVn: 'Kéo thanh trượt — nhìn đỉnh, đừng nhìn hai nhánh',
    title: 'The k Slider',
    titleVn: 'Thanh Trượt k',
    widget: { type: 'ParabolaLab', params: { show: 'k' } },
    content: 'The grey dashed curve is $y = x^2$, staying exactly where it was.\n\nDrag $k$ and say the vertex out loud **before** you look at the label.',
    contentVn: 'Đường nét đứt màu xám là $y = x^2$, luôn đứng yên tại chỗ.\n\nKéo $k$ và nói to tọa độ đỉnh **trước khi** em nhìn vào nhãn.',
  },

  {
    layout: 'statement',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'A different kind of change',
    eyebrowVn: 'Một kiểu thay đổi khác',
    title: 'And If a Number Multiplies It?',
    titleVn: 'Còn Nếu Có Số Nhân Vào Thì Sao?',
    label: 'Guess first',
    labelVn: 'Đoán trước',
    labelIcon: 'HelpCircle',
    text: '$y = 3x^2$  and  $y = -x^2$',
    textVn: '$y = 3x^2$  và  $y = -x^2$',
    sub: 'One of these is **not the same shape** any more. One of them is not even the **same way up**. Which is which?',
    subVn: 'Một trong hai không còn **cùng hình dạng** nữa. Một cái thậm chí không còn **quay cùng chiều**. Cái nào là cái nào?',
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Zap',
    ratio: 42,
    eyebrow: 'Try three things in this order',
    eyebrowVn: 'Thử ba việc theo thứ tự này',
    title: 'The a Slider',
    titleVn: 'Thanh Trượt a',
    widget: { type: 'ParabolaLab', params: { show: 'a' } },
    content: 'Push $a$ **past 1**: the curve pinches in. Bring it **towards 0**: it flattens out.\n\nThen take it **below zero** and watch what happens to the whole picture.',
    contentVn: 'Đẩy $a$ **vượt quá 1**: đường cong khép lại. Kéo về **gần 0**: nó dẹt ra.\n\nRồi đưa xuống **dưới 0** và xem cả hình đổi thế nào.',
    notes: [
      {
        tone: 'write',
        text: 'In **$y = ax^2$**: a bigger $a$ makes it **narrower**, an $a$ between 0 and 1 makes it **wider**, and a **negative** $a$ turns it **upside down**.',
        textVn: 'Trong **$y = ax^2$**: $a$ lớn hơn thì đồ thị **hẹp hơn**, $a$ nằm giữa 0 và 1 thì **rộng hơn**, còn $a$ **âm** thì đồ thị **quay ngược xuống**.',
      },
    ],
    check: {
      id: 'chk_a_narrow',
      q: 'Which of these is the **narrowest**?',
      qVn: 'Đồ thị nào **hẹp nhất**?',
      options: [
        { val: 'A', text: '$y = 4x^2$', textVn: '$y = 4x^2$' },
        { val: 'B', text: '$y = x^2$', textVn: '$y = x^2$' },
        { val: 'C', text: '$y = 0.5x^2$', textVn: '$y = 0.5x^2$' },
      ],
      correct: 'A',
      expEn: 'Every $y$ is multiplied by $a$, so $a = 4$ lifts the arms four times as fast and the curve pinches in. $a = 0.5$ does the opposite and spreads it out. The sign is not involved here — all three open upwards.',
      expVn: 'Mọi $y$ đều được nhân với $a$, nên $a = 4$ kéo hai nhánh lên nhanh gấp bốn lần và đường cong khép lại. $a = 0.5$ làm ngược lại, khiến nó rộng ra. Dấu không liên quan ở đây — cả ba đều mở lên trên.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Lightbulb',
    eyebrow: 'Write your prediction down before you look',
    eyebrowVn: 'Viết dự đoán ra giấy trước khi xem',
    title: 'What Will This One Do?',
    titleVn: 'Đồ Thị Này Sẽ Ra Sao?',
    label: 'Commit to it',
    labelVn: 'Ghi lại dự đoán',
    labelIcon: 'Lightbulb',
    text: '$y = x^2 + 2x$',
    textVn: '$y = x^2 + 2x$',
    sub: 'This is the first one nobody guesses correctly. Put a **box around your answer** — you are going to mark it yourself in two screens.',
    subVn: 'Đây là câu đầu tiên mà hầu như không ai đoán đúng. Hãy **khoanh ô quanh câu trả lời** — hai màn hình nữa em sẽ tự chấm nó.',
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'Boxes',
    ratio: 46,
    eyebrow: 'Work each row separately, then add',
    eyebrowVn: 'Tính từng dòng riêng, rồi cộng lại',
    title: 'Build the Table',
    titleVn: 'Lập Bảng Giá Trị',
    inlineSvg: DIAGRAMS.TABLE_2X,
    content: 'Work out $x^2$ and $2x$ on separate lines, then add them.\n\nThe column at $x = -1$ is the one to look at twice: $1 + (-2) = -1$.',
    contentVn: 'Tính $x^2$ và $2x$ trên hai dòng riêng, rồi cộng lại.\n\nCột $x = -1$ đáng nhìn kỹ hai lần: $1 + (-2) = -1$.',
    notes: [
      {
        tone: 'info',
        text: 'One value came out **below the x-axis**. $y = x^2$ never did that once.',
        textVn: 'Có một giá trị nằm **dưới trục x**. $y = x^2$ chưa từng làm thế lần nào.',
      },
    ],
  },

  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Activity',
    eyebrow: 'Both curves on one grid',
    eyebrowVn: 'Hai đường cong trên cùng một lưới',
    title: 'It Moved Sideways',
    titleVn: 'Nó Đã Dịch Sang Ngang',
    inlineSvg: DIAGRAMS.TWO_CURVES,
    drawThis: true,
    caption: 'Exactly the same shape and exactly the same width — but the bottom is no longer at zero, and it is no longer on the y-axis.',
    captionVn: 'Vẫn đúng hình dạng đó và đúng độ rộng đó — nhưng đáy không còn ở 0 và cũng không còn nằm trên trục y.',
  },

  {
    layout: 'statement',
    accent: AMBER,
    icon: 'Target',
    eyebrow: 'Read it off the picture — no algebra yet',
    eyebrowVn: 'Đọc từ hình vẽ — chưa cần đại số',
    title: 'Lift It Onto the Axis',
    titleVn: 'Nâng Nó Lên Đúng Trục',
    label: 'Think',
    labelVn: 'Suy nghĩ',
    labelIcon: 'MessageSquare',
    text: 'The bottom of that curve sits **one below** the x-axis.',
    textVn: 'Đáy của đường cong đó nằm **thấp hơn trục x một đơn vị**.',
    sub: 'What could you add to $y = x^2 + 2x$ so that the bottom lands exactly **on** the axis?',
    subVn: 'Em có thể cộng thêm gì vào $y = x^2 + 2x$ để đáy nằm **đúng trên** trục x?',
    check: {
      id: 'chk_vertex_2x',
      q: 'First, where is the vertex of $y = x^2 + 2x$?',
      qVn: 'Trước hết, đỉnh của $y = x^2 + 2x$ nằm ở đâu?',
      options: [
        { val: 'A', text: '$(0, 0)$', textVn: '$(0, 0)$' },
        { val: 'B', text: '$(-1, -1)$', textVn: '$(-1, -1)$' },
        { val: 'C', text: '$(2, 0)$', textVn: '$(2, 0)$' },
      ],
      correct: 'B',
      expEn: 'Read it off the table: the smallest $y$ was $-1$, and it happened at $x = -1$. So the vertex is $(-1, -1)$ — one left and one down from where $y = x^2$ had its vertex.',
      expVn: 'Đọc từ bảng: giá trị $y$ nhỏ nhất là $-1$, xảy ra tại $x = -1$. Vậy đỉnh là $(-1, -1)$ — lệch sang trái một và xuống dưới một so với đỉnh của $y = x^2$.',
    },
  },

  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Target',
    eyebrow: 'One move, and it changes the equation',
    eyebrowVn: 'Một bước, và phương trình đổi theo',
    title: 'Add One',
    titleVn: 'Cộng Thêm Một',
    content: 'Every $y$ goes up by 1, so the vertex $(-1, -1)$ becomes $(-1, 0)$. The curve now **touches** the axis instead of crossing it.\n\nThe equation is now $y = x^2 + 2x + 1$.',
    contentVn: 'Mọi $y$ tăng thêm 1, nên đỉnh $(-1, -1)$ trở thành $(-1, 0)$. Bây giờ đường cong **chạm** trục x thay vì cắt qua.\n\nPhương trình bây giờ là $y = x^2 + 2x + 1$.',
  },

  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Repeat',
    eyebrow: 'Look hard at the one you just made',
    eyebrowVn: 'Nhìn kỹ biểu thức em vừa tạo ra',
    title: 'Have You Seen This Before?',
    titleVn: 'Em Đã Gặp Cái Này Chưa?',
    label: 'Recall',
    labelVn: 'Nhớ lại',
    labelIcon: 'Repeat',
    text: '$x^2 + 2x + 1$',
    textVn: '$x^2 + 2x + 1$',
    sub: 'You have expanded a bracket that gave you exactly this. **What was it?**',
    subVn: 'Em đã từng khai triển một biểu thức trong ngoặc và ra đúng cái này. **Đó là gì?**',
    reveal: {
      label: 'Show it',
      labelVn: 'Hiện đáp án',
      answer: '$(x + 1)^2$ — because $(x + 1)(x + 1) = x^2 + x + x + 1 = x^2 + 2x + 1$.\n\nThe same expression, written a second way. Neither is more correct; one of them is far more useful.',
      answerVn: '$(x + 1)^2$ — vì $(x + 1)(x + 1) = x^2 + x + x + 1 = x^2 + 2x + 1$.\n\nCùng một biểu thức, viết theo cách thứ hai. Không cách nào đúng hơn cách nào; nhưng một cách hữu ích hơn hẳn.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Equal',
    ratio: 55,
    eyebrow: 'Why the bracket is worth having',
    eyebrowVn: 'Vì sao nên viết dưới dạng bình phương',
    title: 'The Useful Form',
    titleVn: 'Dạng Hữu Ích',
    content: 'In $x^2 + 2x + 1$ you cannot see where the curve is.\n\nIn $(x + 1)^2$ you can — and here is the reason. **A square is never negative**, so the smallest $y$ can ever be is $0$, and that happens only when the bracket itself is zero.',
    contentVn: 'Nhìn $x^2 + 2x + 1$ thì không thấy đường cong nằm ở đâu.\n\nNhìn $(x + 1)^2$ thì thấy — và đây là lý do. **Bình phương không bao giờ âm**, nên $y$ nhỏ nhất chỉ có thể bằng $0$, và điều đó chỉ xảy ra khi biểu thức trong ngoặc bằng không.',
    notes: [
      {
        tone: 'write',
        text: 'The **vertex** of $y = (x + 1)^2$ is where the bracket equals zero: at $x = -1$.',
        textVn: '**Đỉnh** của $y = (x + 1)^2$ nằm ở chỗ biểu thức trong ngoặc bằng không: tại $x = -1$.',
      },
    ],
    check: {
      id: 'chk_bracket_zero',
      q: 'For $y = (x + 6)^2$, which $x$ makes the bracket zero?',
      qVn: 'Với $y = (x + 6)^2$, giá trị $x$ nào làm biểu thức trong ngoặc bằng không?',
      options: [
        { val: 'A', text: '$x = 6$', textVn: '$x = 6$' },
        { val: 'B', text: '$x = -6$', textVn: '$x = -6$' },
        { val: 'C', text: '$x = 0$', textVn: '$x = 0$' },
      ],
      correct: 'B',
      expEn: 'Solve $x + 6 = 0$, which gives $x = -6$. Put $-6$ back in and the bracket really is zero: $(-6 + 6)^2 = 0$. So the vertex sits at $(-6, 0)$.',
      expVn: 'Giải $x + 6 = 0$, được $x = -6$. Thay $-6$ vào thì biểu thức trong ngoặc đúng bằng không: $(-6 + 6)^2 = 0$. Vậy đỉnh nằm tại $(-6, 0)$.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Plot it the fast way, on your own axes',
    eyebrowVn: 'Vẽ nhanh trên hệ trục của em',
    title: 'Start at the Bottom',
    titleVn: 'Bắt Đầu Từ Đáy',
    content: '> The bracket is zero at $x = -1$. Start there and work outwards **both ways** — no table needed.',
    contentVn: '> Biểu thức trong ngoặc bằng không tại $x = -1$. Bắt đầu từ đó và đi ra **cả hai phía** — không cần lập bảng.',
    steps: [
      { text: '**Vertex first:** $(-1, 0)$. Mark it.', textVn: '**Đỉnh trước:** $(-1, 0)$. Đánh dấu điểm đó.' },
      { text: '**One step each way** — $x = -2$ and $x = 0$. Both give $1^2 = 1$.', textVn: '**Một bước mỗi bên** — $x = -2$ và $x = 0$. Cả hai cho $1^2 = 1$.' },
      { text: '**Two steps each way** — $x = -3$ and $x = 1$. Both give $2^2 = 4$.', textVn: '**Hai bước mỗi bên** — $x = -3$ và $x = 1$. Cả hai cho $2^2 = 4$.' },
    ],
  },

  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Activity',
    eyebrow: 'Five points and a smooth curve',
    eyebrowVn: 'Năm điểm và một đường cong trơn',
    title: 'y = (x + 1) squared',
    titleVn: 'y = (x + 1) bình phương',
    inlineSvg: DIAGRAMS.FROM_VERTEX,
    drawThis: true,
    caption: 'Symmetry does half the work: every point on the left has a twin on the right, the same distance from the vertex.',
    captionVn: 'Tính đối xứng làm giúp em một nửa công việc: mỗi điểm bên trái có một điểm sinh đôi bên phải, cách đỉnh cùng một khoảng.',
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    ratio: 46,
    eyebrow: 'The trap almost everybody falls into',
    eyebrowVn: 'Cái bẫy mà gần như ai cũng mắc',
    title: 'Minus Two Goes Right',
    titleVn: 'Trừ Hai Thì Dịch Sang Phải',
    inlineSvg: DIAGRAMS.X_MINUS_2,
    content: 'A **minus** in the bracket moves the curve to the **right**. It feels backwards, and it is not.\n\nAsk the only question that matters: **what $x$ makes the bracket zero?** For $(x - 2)^2$, that is $x = 2$.',
    contentVn: 'Dấu **trừ** trong ngoặc làm đường cong dịch sang **phải**. Nghe có vẻ ngược, nhưng không hề ngược.\n\nChỉ cần hỏi một câu duy nhất: **$x$ bằng bao nhiêu thì trong ngoặc bằng không?** Với $(x - 2)^2$ thì đó là $x = 2$.',
    notes: [
      {
        tone: 'homework',
        text: '**$y = (x - h)^2$** has its vertex at **$x = h$**. Never read the sign — **solve the bracket**.',
        textVn: '**$y = (x - h)^2$** có đỉnh tại **$x = h$**. Đừng đọc theo dấu — hãy **giải biểu thức trong ngoặc**.',
      },
    ],
    check: {
      id: 'chk_sign_trap',
      q: 'Where is the vertex of $y = (x - 5)^2$?',
      qVn: 'Đỉnh của $y = (x - 5)^2$ nằm ở đâu?',
      options: [
        { val: 'A', text: '$(-5, 0)$', textVn: '$(-5, 0)$' },
        { val: 'B', text: '$(5, 0)$', textVn: '$(5, 0)$' },
        { val: 'C', text: '$(0, 5)$', textVn: '$(0, 5)$' },
      ],
      correct: 'B',
      expEn: 'Solve $x - 5 = 0$ to get $x = 5$, so the vertex is $(5, 0)$ and the curve has moved five to the RIGHT. Option A is the sign trap: reading the minus as "left" instead of solving.',
      expVn: 'Giải $x - 5 = 0$ được $x = 5$, nên đỉnh là $(5, 0)$ và đường cong đã dịch năm đơn vị sang PHẢI. Đáp án A chính là cái bẫy dấu: đọc dấu trừ thành "sang trái" thay vì đi giải.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Zap',
    ratio: 42,
    eyebrow: 'Check the trap for yourself',
    eyebrowVn: 'Tự kiểm chứng cái bẫy đó',
    title: 'The h Slider',
    titleVn: 'Thanh Trượt h',
    widget: { type: 'ParabolaLab', params: { show: 'h' } },
    content: 'Set $h$ to a **positive** number and read the bracket: it says minus, and the curve goes **right**.\n\nSet $h$ **negative** and the bracket flips to plus, and the curve goes **left**.',
    contentVn: 'Đặt $h$ là số **dương** rồi đọc trong ngoặc: nó hiện dấu trừ, và đường cong đi sang **phải**.\n\nĐặt $h$ **âm** thì trong ngoặc đổi thành dấu cộng, và đường cong đi sang **trái**.',
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Target',
    side: 'left',
    ratio: 46,
    eyebrow: 'Three letters, three jobs',
    eyebrowVn: 'Ba chữ cái, ba nhiệm vụ',
    title: 'The Vertex Form',
    titleVn: 'Dạng Đỉnh',
    inlineSvg: DIAGRAMS.VERTEX_ANATOMY,
    drawThis: true,
    content: 'Put all three together and the equation stops hiding things. It **tells you where its own vertex is**.',
    contentVn: 'Ghép cả ba lại thì phương trình không giấu gì nữa. Nó **tự nói cho em biết đỉnh của nó ở đâu**.',
    notes: [
      {
        tone: 'write',
        badge: 'The whole unit in one line',
        badgeVn: 'Cả bài gói trong một dòng',
        text: '**Vertex form:** $y = a(x - h)^2 + k$, with its **vertex at $(h, k)$**.',
        textVn: '**Dạng đỉnh:** $y = a(x - h)^2 + k$, với **đỉnh tại $(h, k)$**.',
      },
    ],
    check: {
      id: 'chk_read_vertex',
      q: 'What is the vertex of $y = 2(x - 3)^2 + 5$?',
      qVn: 'Đỉnh của $y = 2(x - 3)^2 + 5$ là gì?',
      options: [
        { val: 'A', text: '$(3, 5)$', textVn: '$(3, 5)$' },
        { val: 'B', text: '$(-3, 5)$', textVn: '$(-3, 5)$' },
        { val: 'C', text: '$(2, 3)$', textVn: '$(2, 3)$' },
      ],
      correct: 'A',
      expEn: 'Compare it with $y = a(x - h)^2 + k$: here $h = 3$ and $k = 5$, so the vertex is $(3, 5)$. The $2$ is $a$ — it makes the curve narrower but never moves the vertex.',
      expVn: 'So với $y = a(x - h)^2 + k$: ở đây $h = 3$ và $k = 5$, nên đỉnh là $(3, 5)$. Số $2$ chính là $a$ — nó làm đường cong hẹp lại nhưng không bao giờ dịch chuyển đỉnh.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Zap',
    ratio: 42,
    eyebrow: 'All three at once',
    eyebrowVn: 'Cả ba cùng lúc',
    title: 'Build One Yourself',
    titleVn: 'Tự Dựng Một Đồ Thị',
    widget: { type: 'ParabolaLab', params: { show: 'ahk' } },
    content: 'Try to hit these, one at a time, **before** you drag anything:\n\nvertex $(3, -2)$ · then the same vertex **upside down** · then a **wide** one at $(-4, 1)$.',
    contentVn: 'Hãy thử đạt được từng cái sau đây, **trước khi** em kéo bất cứ thanh nào:\n\nđỉnh $(3, -2)$ · rồi cũng đỉnh đó nhưng **quay ngược xuống** · rồi một đồ thị **rộng** có đỉnh $(-4, 1)$.',
  },

  {
    layout: 'stack',
    variant: 'checklist',
    accent: GREEN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you move on',
    eyebrowVn: 'Trước khi sang phần tiếp theo',
    title: 'Can You Do All Six?',
    titleVn: 'Em Làm Được Cả Sáu Việc Chưa?',
    content: '> Your notebook should now have **5 written rules** and **4 plotted graphs**. Check.',
    contentVn: '> Vở của em bây giờ phải có **5 quy tắc đã chép** và **4 đồ thị đã vẽ**. Kiểm tra lại.',
    items: [
      { text: 'Plot $y = x^2$ from a table of seven values.', textVn: 'Vẽ $y = x^2$ từ bảng bảy giá trị.' },
      { text: 'Name the **vertex** and the **axis of symmetry**.', textVn: 'Gọi tên **đỉnh** và **trục đối xứng**.' },
      { text: 'Say what $k$ does, and what $a$ does.', textVn: 'Nói được $k$ làm gì và $a$ làm gì.' },
      { text: 'Plot from the **vertex outwards** using symmetry.', textVn: 'Vẽ **từ đỉnh ra hai bên** nhờ tính đối xứng.' },
      { text: 'Explain why $(x - 2)^2$ moves to the **right**.', textVn: 'Giải thích vì sao $(x - 2)^2$ dịch sang **phải**.' },
      { text: 'Read the vertex $(h, k)$ straight off the equation.', textVn: 'Đọc ngay đỉnh $(h, k)$ từ phương trình.' },
    ],
  },

  {
    layout: 'hero',
    color: '#0891b2',
    icon: 'CheckCircle2',
    brand: 'Problem Solving',
    brandVn: 'Giải Toán',
    title: 'Unit Complete',
    titleVn: 'Hoàn Thành Bài Học',
    subtitle: 'Every parabola here was y = x^2 wearing a disguise: a changed its width, h slid it sideways, k slid it up. Next question, and it is the whole of the next unit: WHERE does a parabola cross the x-axis, and how many times can it?',
    subtitleVn: 'Mọi parabol trong bài đều là y = x^2 cải trang: a đổi độ rộng, h trượt ngang, k trượt dọc. Câu hỏi tiếp theo, cũng là trọn bài sau: parabol cắt trục x Ở ĐÂU, và cắt được bao nhiêu lần?',
  },
];
