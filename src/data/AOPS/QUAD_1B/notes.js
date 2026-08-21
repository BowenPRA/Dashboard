// src/data/AOPS/QUAD_1B/notes.js
// QUAD_1B — Zeros and the Factored Form. The second half of the quadratics
// pair: QUAD_1A found where a parabola SITS, this one finds where it CROSSES.
//
// The spine:
//   1-4    what a zero is (y = 0 there), and the zero product rule that finds it
//   5-8    the factored form y = a(x - p)(x - q), read off the brackets, then
//          used to plot a curve from its zeros inwards
//   9-12   how many zeros are possible — two, one, none — argued from where the
//          vertex sits, not asserted; the k slider makes the count change live
//   13-15  the bridge back to 1A: square-root both sides of vertex form to get
//          the zeros, and use the midpoint of the zeros to get the vertex
//
// Nothing here needs the quadratic formula, and it is deliberately never shown:
// every item in this unit is solvable by reading a bracket or by square-rooting,
// and a formula offered now would replace the thinking rather than extend it.
//
// House notes: `$…$` is inline KaTeX; layout `title` and hero `objective` are
// plain text and never parsed; icons must exist in the ICONS map in
// notes/layouts/primitives.jsx. Six `check` questions carry the NOTES score.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
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
    eyebrow: 'Quadratics · 2 of 2',
    eyebrowVn: 'Hàm bậc hai · bài 2 trên 2',
    title: 'Zeros and the Factored Form',
    titleVn: 'Nghiệm và Dạng Tích',
    objective: 'I can find where a parabola crosses the x-axis, say how many times it can, and read the crossings straight off a factored equation.',
    objectiveVn: 'Em có thể tìm nơi parabol cắt trục x, nói được nó cắt bao nhiêu lần, và đọc ngay các giao điểm từ phương trình dạng tích.',
    card: {
      icon: 'Pencil',
      badge: 'Warm-Up · Do this now in your book',
      badgeVn: 'Khởi động · Làm ngay vào vở',
      text: 'For $y = (x + 1)(x - 3)$, work out $y$ when $x = -1$, and again when $x = 3$.\n\n**Both answers are the same.** Why?',
      textVn: 'Với $y = (x + 1)(x - 3)$, tính $y$ khi $x = -1$, rồi tính lại khi $x = 3$.\n\n**Hai đáp án giống nhau.** Vì sao?',
    },
  },

  {
    layout: 'statement',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Answer before you scroll on',
    eyebrowVn: 'Trả lời trước khi cuộn tiếp',
    title: 'What Is Special About Those Two Points?',
    titleVn: 'Hai Điểm Đó Có Gì Đặc Biệt?',
    label: 'Think',
    labelVn: 'Suy nghĩ',
    labelIcon: 'MessageSquare',
    text: 'Both times, $y$ came out as $0$.',
    textVn: 'Cả hai lần, $y$ đều bằng $0$.',
    sub: 'On a graph, **where** are all the points whose $y$ is zero? Picture the line they sit on before you read the next screen.',
    subVn: 'Trên đồ thị, tất cả các điểm có $y$ bằng không **nằm ở đâu**? Hãy hình dung đường thẳng chứa chúng trước khi xem màn hình sau.',
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Target',
    ratio: 46,
    eyebrow: 'Three names, one idea',
    eyebrowVn: 'Ba tên gọi, một ý tưởng',
    title: 'What a Zero Is',
    titleVn: 'Nghiệm Là Gì',
    inlineSvg: DIAGRAMS.ZEROS_ON_GRAPH,
    drawThis: true,
    content: 'Every point on the x-axis has $y = 0$. So the places where a curve **meets** the axis are exactly the places where its $y$ is zero.\n\nFor this curve that happens at $x = -1$ and $x = 3$.',
    contentVn: 'Mọi điểm trên trục x đều có $y = 0$. Vậy những chỗ đường cong **gặp** trục x chính là những chỗ $y$ bằng không.\n\nVới đường cong này, điều đó xảy ra tại $x = -1$ và $x = 3$.',
    notes: [
      {
        tone: 'write',
        text: '**Zero:** a value of $x$ that makes $y = 0$.\nThe same thing is also called a **root** of the equation, or an **x-intercept** of the graph.',
        textVn: '**Nghiệm:** giá trị của $x$ làm cho $y = 0$.\nCùng một thứ đó còn được gọi là **nghiệm của phương trình**, hay **giao điểm với trục x** của đồ thị.',
      },
    ],
    check: {
      id: 'chk_zero_meaning',
      q: 'A parabola crosses the x-axis at $x = 4$. What is $y$ there?',
      qVn: 'Một parabol cắt trục x tại $x = 4$. Khi đó $y$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$y = 4$', textVn: '$y = 4$' },
        { val: 'B', text: '$y = 0$', textVn: '$y = 0$' },
        { val: 'C', text: 'It cannot be worked out', textVn: 'Không thể tính được' },
      ],
      correct: 'B',
      expEn: 'Every point ON the x-axis has $y = 0$ — that is what the axis is. So crossing it at $x = 4$ means the point is $(4, 0)$. The 4 is the input, not the output.',
      expVn: 'Mọi điểm NẰM TRÊN trục x đều có $y = 0$ — đó chính là định nghĩa của trục x. Nên cắt trục tại $x = 4$ nghĩa là điểm đó là $(4, 0)$. Số 4 là đầu vào, không phải đầu ra.',
    },
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Equal',
    side: 'left',
    ratio: 46,
    eyebrow: 'One fact about zero does all the work',
    eyebrowVn: 'Một sự thật về số không làm hết mọi việc',
    title: 'The Zero Product Rule',
    titleVn: 'Quy Tắc Tích Bằng Không',
    inlineSvg: DIAGRAMS.ZERO_PRODUCT,
    content: 'Two numbers multiply to $0$ only when **at least one of them is already $0$**. Nothing else works: $7 \\times 3$ is not zero, and neither is $0.001 \\times 0.001$.\n\nSo when a product of brackets equals zero, you can take the brackets **one at a time**.',
    contentVn: 'Hai số nhân nhau bằng $0$ chỉ khi **ít nhất một trong hai đã bằng $0$**. Không còn cách nào khác: $7 \\times 3$ không bằng không, và $0.001 \\times 0.001$ cũng vậy.\n\nVậy khi tích của các biểu thức trong ngoặc bằng không, em có thể xét **từng ngoặc một**.',
    notes: [
      {
        tone: 'write',
        text: 'If $A \\times B = 0$ then $A = 0$ **or** $B = 0$.',
        textVn: 'Nếu $A \\times B = 0$ thì $A = 0$ **hoặc** $B = 0$.',
      },
    ],
    check: {
      id: 'chk_zero_product',
      q: 'If $(x - 7)(x + 2) = 0$, what are the two possibilities for $x$?',
      qVn: 'Nếu $(x - 7)(x + 2) = 0$ thì $x$ có hai khả năng nào?',
      options: [
        { val: 'A', text: '$x = 7$ or $x = -2$', textVn: '$x = 7$ hoặc $x = -2$' },
        { val: 'B', text: '$x = -7$ or $x = 2$', textVn: '$x = -7$ hoặc $x = 2$' },
        { val: 'C', text: '$x = 7$ and $x = 2$ together', textVn: '$x = 7$ và $x = 2$ cùng lúc' },
      ],
      correct: 'A',
      expEn: 'Take each bracket in turn. $x - 7 = 0$ gives $x = 7$; $x + 2 = 0$ gives $x = -2$. Option B reads the signs off the page instead of solving. And the two answers are alternatives, not a pair — $x$ is one number at a time.',
      expVn: 'Xét từng ngoặc một. $x - 7 = 0$ cho $x = 7$; $x + 2 = 0$ cho $x = -2$. Đáp án B đọc dấu trên trang giấy thay vì đi giải. Và hai đáp án là hai lựa chọn thay thế nhau, không phải một cặp — mỗi lần $x$ chỉ là một số.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'BookOpen',
    ratio: 46,
    eyebrow: 'A second form that hands you its answer',
    eyebrowVn: 'Dạng thứ hai tự trao cho em đáp án',
    title: 'The Factored Form',
    titleVn: 'Dạng Tích',
    inlineSvg: DIAGRAMS.FACTORED_ANATOMY,
    drawThis: true,
    content: 'In QUAD_1A the **vertex form** told you where the curve sits. This form tells you where it **crosses**.\n\nSame curve, different question, different way of writing it.',
    contentVn: 'Ở bài QUAD_1A, **dạng đỉnh** cho em biết đường cong nằm ở đâu. Dạng này cho biết nó **cắt trục ở đâu**.\n\nCùng một đường cong, câu hỏi khác, cách viết khác.',
    notes: [
      {
        tone: 'write',
        badge: 'The whole unit in one line',
        badgeVn: 'Cả bài gói trong một dòng',
        text: '**Factored form:** $y = a(x - p)(x - q)$ has its **zeros at $x = p$ and $x = q$**.',
        textVn: '**Dạng tích:** $y = a(x - p)(x - q)$ có **nghiệm tại $x = p$ và $x = q$**.',
      },
    ],
    check: {
      id: 'chk_read_zeros',
      q: 'What are the zeros of $y = (x - 6)(x + 1)$?',
      qVn: 'Các nghiệm của $y = (x - 6)(x + 1)$ là gì?',
      options: [
        { val: 'A', text: '$-6$ and $1$', textVn: '$-6$ và $1$' },
        { val: 'B', text: '$6$ and $-1$', textVn: '$6$ và $-1$' },
        { val: 'C', text: '$6$ and $1$', textVn: '$6$ và $1$' },
      ],
      correct: 'B',
      expEn: 'Solve each bracket: $x - 6 = 0$ gives $6$, and $x + 1 = 0$ gives $-1$. It is the same sign trap as the vertex form — the number you can see is not the answer until you have solved for it.',
      expVn: 'Giải từng ngoặc: $x - 6 = 0$ cho $6$, và $x + 1 = 0$ cho $-1$. Vẫn là cái bẫy dấu như ở dạng đỉnh — con số em nhìn thấy chưa phải đáp án cho tới khi em giải ra.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Pencil',
    eyebrow: 'Sketch it in three moves, on your own axes',
    eyebrowVn: 'Vẽ phác trong ba bước, trên hệ trục của em',
    title: 'Plotting From the Zeros',
    titleVn: 'Vẽ Từ Các Nghiệm',
    content: '> Try it on $y = (x + 1)(x - 3)$ before you look at the next screen.',
    contentVn: '> Hãy thử với $y = (x + 1)(x - 3)$ trước khi xem màn hình sau.',
    steps: [
      { text: '**Mark the two zeros** on the x-axis: $-1$ and $3$.', textVn: '**Đánh dấu hai nghiệm** trên trục x: $-1$ và $3$.' },
      { text: '**Halfway between them** is the axis of symmetry: $x = 1$.', textVn: '**Điểm chính giữa hai nghiệm** là trục đối xứng: $x = 1$.' },
      { text: '**Substitute $x = 1$** to get the vertex: $y = 2 \\times (-2) = -4$.', textVn: '**Thế $x = 1$ vào** để tìm đỉnh: $y = 2 \\times (-2) = -4$.' },
    ],
  },

  {
    layout: 'showcase',
    accent: RED,
    icon: 'Activity',
    eyebrow: 'Three points are enough for a sketch',
    eyebrowVn: 'Ba điểm là đủ để phác đồ thị',
    title: 'The Zeros Find the Vertex',
    titleVn: 'Các Nghiệm Tìm Ra Đỉnh',
    inlineSvg: DIAGRAMS.MIDPOINT,
    drawThis: true,
    caption: 'The two zeros are the same distance from the axis of symmetry, so their midpoint IS the axis. One substitution then gives the vertex — no table of seven values needed.',
    captionVn: 'Hai nghiệm cách trục đối xứng cùng một khoảng, nên trung điểm của chúng CHÍNH LÀ trục đó. Một phép thế nữa là ra đỉnh — không cần bảng bảy giá trị.',
  },

  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Sketch the possibilities on scrap paper',
    eyebrowVn: 'Phác các khả năng ra giấy nháp',
    title: 'How Many Times Can It Cross?',
    titleVn: 'Nó Có Thể Cắt Bao Nhiêu Lần?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'HelpCircle',
    text: 'A parabola meets the x-axis how many times?',
    textVn: 'Một parabol gặp trục x bao nhiêu lần?',
    sub: 'Try to draw one that crosses **three** times. Then try one that crosses **none**. Only one of those two is possible.',
    subVn: 'Thử vẽ một parabol cắt trục x **ba** lần. Rồi thử vẽ một cái **không cắt lần nào**. Chỉ một trong hai điều đó là khả thi.',
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Layers',
    ratio: 42,
    eyebrow: 'Two, one, or none — and never three',
    eyebrowVn: 'Hai, một, hoặc không — và không bao giờ ba',
    title: 'The Three Cases',
    titleVn: 'Ba Trường Hợp',
    inlineSvg: DIAGRAMS.HOW_MANY,
    content: 'A parabola turns **once**. So it can come down through the axis and go back up through it — twice — or touch it and turn, or stay clear of it entirely.\n\nThere is no way to get a third crossing without turning a second time, and a parabola cannot.',
    contentVn: 'Parabol chỉ quay đầu **một lần**. Nên nó có thể đi xuống xuyên qua trục rồi đi lên xuyên qua trục — hai lần — hoặc chạm vào trục rồi quay lại, hoặc hoàn toàn không chạm.\n\nKhông có cách nào có lần cắt thứ ba mà không quay đầu lần thứ hai, và parabol thì không thể làm vậy.',
    notes: [
      {
        tone: 'write',
        text: 'A parabola has **two zeros** if its vertex is on the far side of the axis from its arms, **one** if the vertex sits on the axis, and **none** if the whole curve stays on one side.',
        textVn: 'Parabol có **hai nghiệm** nếu đỉnh nằm khác phía trục so với hai nhánh, **một** nếu đỉnh nằm ngay trên trục, và **không có** nếu cả đường cong nằm trọn về một phía.',
      },
    ],
    check: {
      id: 'chk_no_zeros',
      q: 'How many zeros does $y = (x - 2)^2 + 5$ have?',
      qVn: '$y = (x - 2)^2 + 5$ có bao nhiêu nghiệm?',
      options: [
        { val: 'A', text: 'Two', textVn: 'Hai' },
        { val: 'B', text: 'One', textVn: 'Một' },
        { val: 'C', text: 'None', textVn: 'Không có' },
      ],
      correct: 'C',
      expEn: 'The vertex is $(2, 5)$, above the axis, and the curve opens upwards — so every point on it has $y$ of at least 5 and it never reaches 0. You can also see it in the algebra: a square is never negative, so $(x-2)^2 + 5$ is never less than 5.',
      expVn: 'Đỉnh là $(2, 5)$, nằm trên trục x, và đường cong mở lên trên — nên mọi điểm trên nó đều có $y$ ít nhất bằng 5 và không bao giờ chạm 0. Cũng thấy được điều đó bằng đại số: bình phương không bao giờ âm, nên $(x-2)^2 + 5$ không bao giờ nhỏ hơn 5.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Zap',
    ratio: 42,
    eyebrow: 'Drag k down and count the crossings',
    eyebrowVn: 'Kéo k xuống và đếm số giao điểm',
    title: 'Watch the Count Change',
    titleVn: 'Xem Số Nghiệm Thay Đổi',
    widget: { type: 'ParabolaLab', params: { show: 'k', kStart: 2, zeros: true } },
    content: 'Start above the axis: **no zeros**. Bring $k$ down until the vertex just touches: **one**. Keep going: **two**.\n\nThe badge counts them for you — but say the number **before** you look at it.',
    contentVn: 'Bắt đầu ở phía trên trục: **không có nghiệm**. Hạ $k$ xuống tới khi đỉnh vừa chạm trục: **một**. Hạ tiếp: **hai**.\n\nÔ nhãn sẽ đếm giúp em — nhưng hãy nói số đó ra **trước khi** em nhìn vào nó.',
  },

  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Lightbulb',
    eyebrow: 'The touching case is worth a name',
    eyebrowVn: 'Trường hợp tiếp xúc đáng được gọi tên',
    title: 'When the Two Zeros Meet',
    titleVn: 'Khi Hai Nghiệm Gặp Nhau',
    content: 'As $k$ rises, the two crossings slide **towards each other** until they land on the same spot and vanish together.\n\nThat single touching point is where the two zeros became one: $y = (x - 3)^2$ has both of its zeros at $x = 3$.',
    contentVn: 'Khi $k$ tăng lên, hai giao điểm trượt **về phía nhau** cho tới khi trùng vào một chỗ rồi biến mất cùng lúc.\n\nĐiểm tiếp xúc duy nhất đó là nơi hai nghiệm đã nhập thành một: $y = (x - 3)^2$ có cả hai nghiệm tại $x = 3$.',
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    ratio: 46,
    eyebrow: 'Going back the other way',
    eyebrowVn: 'Đi ngược lại theo chiều kia',
    title: 'From Vertex Form to Zeros',
    titleVn: 'Từ Dạng Đỉnh Ra Nghiệm',
    inlineSvg: DIAGRAMS.PLUS_MINUS,
    content: 'You do not need factors. Set $y$ to zero, get the square on its own, and undo it.\n\nThe one thing to be careful about: **a square root has two answers**. Both $3$ and $-3$ square to $9$, so both roads have to be walked.',
    contentVn: 'Em không cần dạng tích. Cho $y$ bằng không, để bình phương đứng riêng một mình, rồi khử nó.\n\nĐiều duy nhất phải cẩn thận: **căn bậc hai có hai đáp án**. Cả $3$ và $-3$ đều bình phương ra $9$, nên phải đi cả hai đường.',
    notes: [
      {
        tone: 'homework',
        text: 'Lose the minus root and you lose **one of the two zeros** — and the one you keep will not be symmetrical about the vertex any more.',
        textVn: 'Bỏ quên nghiệm âm là mất **một trong hai nghiệm** — và nghiệm còn lại sẽ không còn đối xứng qua đỉnh nữa.',
      },
    ],
    check: {
      id: 'chk_square_root',
      q: 'Solve $(x - 1)^2 = 16$.',
      qVn: 'Giải $(x - 1)^2 = 16$.',
      options: [
        { val: 'A', text: '$x = 5$ only', textVn: 'Chỉ $x = 5$' },
        { val: 'B', text: '$x = 5$ or $x = -3$', textVn: '$x = 5$ hoặc $x = -3$' },
        { val: 'C', text: '$x = 17$ or $x = -15$', textVn: '$x = 17$ hoặc $x = -15$' },
      ],
      correct: 'B',
      expEn: '$x - 1 = 4$ or $x - 1 = -4$, because both $4$ and $-4$ square to 16. That gives $x = 5$ or $x = -3$. Option A is the answer with the minus root forgotten; option C adds 16 instead of square-rooting it.',
      expVn: '$x - 1 = 4$ hoặc $x - 1 = -4$, vì cả $4$ và $-4$ đều bình phương ra 16. Từ đó $x = 5$ hoặc $x = -3$. Đáp án A là kết quả khi quên nghiệm âm; đáp án C cộng 16 thay vì lấy căn.',
    },
  },

  {
    layout: 'compare',
    icon: 'Scale',
    accent: AMBER,
    title: 'Two Forms, Two Questions',
    titleVn: 'Hai Dạng, Hai Câu Hỏi',
    columns: [
      {
        heading: 'Vertex form',
        headingVn: 'Dạng đỉnh',
        accent: PURPLE,
        icon: 'Target',
        content: '$y = a(x - h)^2 + k$\n\nAnswers **where does it sit?** The vertex is $(h, k)$, and the smallest (or largest) value of $y$ is $k$.',
        contentVn: '$y = a(x - h)^2 + k$\n\nTrả lời câu **nó nằm ở đâu?** Đỉnh là $(h, k)$, và giá trị nhỏ nhất (hoặc lớn nhất) của $y$ là $k$.',
        notes: [
          { tone: 'info', text: 'Best when the question is about a **maximum or a minimum**.', textVn: 'Tốt nhất khi câu hỏi nói về **giá trị lớn nhất hoặc nhỏ nhất**.' },
        ],
      },
      {
        heading: 'Factored form',
        headingVn: 'Dạng tích',
        accent: GREEN,
        icon: 'Equal',
        content: '$y = a(x - p)(x - q)$\n\nAnswers **where does it cross?** The zeros are $p$ and $q$, and the axis of symmetry is halfway between them.',
        contentVn: '$y = a(x - p)(x - q)$\n\nTrả lời câu **nó cắt trục ở đâu?** Các nghiệm là $p$ và $q$, và trục đối xứng nằm chính giữa hai nghiệm.',
        notes: [
          { tone: 'plant', text: 'Best when the question is about **crossing, hitting the ground, or reaching zero**.', textVn: 'Tốt nhất khi câu hỏi nói về **cắt trục, chạm đất, hoặc bằng không**.' },
        ],
      },
    ],
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
    content: '> Your notebook should now have **5 written rules** and **2 sketched graphs**. Check.',
    contentVn: '> Vở của em bây giờ phải có **5 quy tắc đã chép** và **2 đồ thị đã phác**. Kiểm tra lại.',
    items: [
      { text: 'Say what a **zero** is without pointing at a picture.', textVn: 'Nói được **nghiệm** là gì mà không cần chỉ vào hình.' },
      { text: 'Use the **zero product rule** on a pair of brackets.', textVn: 'Dùng **quy tắc tích bằng không** với hai biểu thức trong ngoặc.' },
      { text: 'Read both zeros off $y = a(x - p)(x - q)$.', textVn: 'Đọc được cả hai nghiệm từ $y = a(x - p)(x - q)$.' },
      { text: 'Find the **vertex from the zeros** using the midpoint.', textVn: 'Tìm **đỉnh từ các nghiệm** bằng trung điểm.' },
      { text: 'Say when a parabola has **two, one or no** zeros.', textVn: 'Nói được khi nào parabol có **hai, một hoặc không** nghiệm.' },
      { text: 'Solve $(x - h)^2 = c$ **without losing the minus root**.', textVn: 'Giải $(x - h)^2 = c$ mà **không đánh mất nghiệm âm**.' },
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
    subtitle: 'A parabola crosses the x-axis twice, once, or never, and both forms of its equation answer a different question about it. Exit question: y = (x - 2)(x - 8) has zeros at 2 and 8. Without plotting anything, where is its vertex?',
    subtitleVn: 'Một parabol cắt trục x hai lần, một lần, hoặc không lần nào, và mỗi dạng phương trình trả lời một câu hỏi khác nhau về nó. Câu hỏi cuối: y = (x - 2)(x - 8) có nghiệm tại 2 và 8. Không vẽ gì cả, đỉnh của nó nằm ở đâu?',
  },
];
