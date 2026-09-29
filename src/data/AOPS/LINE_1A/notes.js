// src/data/AOPS/LINE_1A/notes.js
// LINE_1A — Points, Distance & Midpoints. The first of three units on straight
// lines, built from the book's chapter on graphing lines: its first section
// (the number line and the Cartesian plane) and the midpoint and "part of the
// way along" problems from its third.
//
// THE DECK NEVER STATES A RULE THE STUDENT HAS NOT WATCHED WORK. Distance
// arrives as a walk across and up that closes into a right triangle; only then
// is Pythagoras named, and only after two worked triangles is it written as
// "the distance formula" — with the book's own advice that nobody needs to
// memorise it. The midpoint is the number-line average done twice; the one-
// third point is the midpoint's idea with a different fraction.
//
// The spine:
//   1-3    the number line: distance is subtraction, halfway is the average,
//          |x| is a distance
//   4-7    the plane: axes, origin, quadrants, (x, y) with across first; plot
//   8-14   distance: the corner, the triangle, Pythagoras, the formula, a
//          worked example, an exact answer that is a square root, and why
//          the order you subtract in does not matter
//   15-21  midpoint as an average, working backwards from a midpoint, and the
//          point one third of the way along
//   22-23  checklist, close
//
// House notes:
//  - `$…$` is inline KaTeX; layout `title` and hero `objective` are plain text.
//  - An `activity` is the LAST key on its slide (the narration generator cuts
//    the slide there), and never shares a slide with a `check`.
//  - Eight checks and five activities carry the NOTES score.
import { DIAGRAMS } from './diagrams.js';

const PINK = '#be185d';
const AMBER = '#d97706';
const GREEN = '#10b981';
const BLUE = '#3b82f6';
const PURPLE = '#7c3aed';
const CYAN = '#0891b2';

export const notes = [
  {
    layout: 'hero',
    color: '#a21caf',
    icon: 'Crosshair',
    brand: 'Problem Solving',
    brandVn: 'Giải Toán',
    eyebrow: 'Lines · 1 of 3',
    eyebrowVn: 'Đường thẳng · bài 1 trên 3',
    title: 'Points, Distance and Midpoints',
    titleVn: 'Điểm, Khoảng Cách và Trung Điểm',
    objective: 'I can plot any point, find the distance between two points with a right triangle, and find the point halfway along a segment — or a third of the way along.',
    objectiveVn: 'Em có thể biểu diễn bất kỳ điểm nào, tìm khoảng cách giữa hai điểm bằng một tam giác vuông, và tìm điểm nằm chính giữa một đoạn thẳng — hoặc nằm ở một phần ba đoạn đó.',
    card: {
      icon: 'Pencil',
      badge: 'Warm-Up · Do this now in your book',
      badgeVn: 'Khởi động · Làm ngay vào vở',
      text: 'On a number line: how far apart are $-3$ and $9$? And which number is **exactly halfway** between them?',
      textVn: 'Trên trục số: $-3$ và $9$ cách nhau bao xa? Và số nào nằm **chính giữa** hai số đó?',
    },
  },

  {
    layout: 'split',
    accent: PINK,
    icon: 'Ruler',
    ratio: 44,
    eyebrow: 'Check your warm-up',
    eyebrowVn: 'Kiểm tra phần khởi động',
    title: 'Apart and Halfway',
    titleVn: 'Khoảng Cách và Điểm Chính Giữa',
    inlineSvg: DIAGRAMS.NUMBER_LINES,
    content: 'To get from $-3$ to $9$ you take $12$ steps right, and subtraction counts them for you: $9 - (-3) = 12$.\n\nHalfway is $6$ steps from each end, so it is $-3 + 6 = 3$. Notice that $3$ is also the **average**: $(-3 + 9) \\div 2 = 3$.',
    contentVn: 'Để đi từ $-3$ tới $9$ em bước $12$ bước sang phải, và phép trừ đếm giúp em: $9 - (-3) = 12$.\n\nĐiểm chính giữa cách mỗi đầu $6$ bước, nên nó là $-3 + 6 = 3$. Để ý rằng $3$ cũng là **trung bình cộng**: $(-3 + 9) \\div 2 = 3$.',
    notes: [
      {
        tone: 'write',
        text: '**Distance** on a number line: the bigger number minus the smaller.\n**Halfway** between two numbers: their average.',
        textVn: '**Khoảng cách** trên trục số: số lớn trừ số bé.\n**Điểm chính giữa** hai số: trung bình cộng của chúng.',
      },
    ],
    check: {
      id: 'chk_nl_gap',
      q: 'How far apart are $-7$ and $2$ on the number line?',
      qVn: 'Trên trục số, $-7$ và $2$ cách nhau bao xa?',
      options: [
        { val: 'A', text: '$5$', textVn: '$5$' },
        { val: 'B', text: '$9$', textVn: '$9$' },
        { val: 'C', text: '$-9$', textVn: '$-9$' },
      ],
      correct: 'B',
      expEn: 'Bigger minus smaller: $2 - (-7) = 2 + 7 = 9$. Option A forgot that subtracting a negative adds. A distance is never negative, so C cannot be right.',
      expVn: 'Số lớn trừ số bé: $2 - (-7) = 2 + 7 = 9$. Đáp án A quên rằng trừ một số âm là cộng. Khoảng cách không bao giờ âm, nên C không thể đúng.',
    },
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Ruler',
    side: 'left',
    ratio: 52,
    eyebrow: 'A distance with its own symbol',
    eyebrowVn: 'Một khoảng cách có ký hiệu riêng',
    title: 'Absolute Value',
    titleVn: 'Giá Trị Tuyệt Đối',
    content: 'The distance from a number to $0$ is its **absolute value**, written between two bars: $|-5| = 5$ and $|5| = 5$.\n\nBoth are $5$ because $-5$ and $5$ sit the same distance from $0$ — one on each side. The minus sign only says **which direction**.',
    contentVn: 'Khoảng cách từ một số tới $0$ là **giá trị tuyệt đối** của nó, viết giữa hai vạch: $|-5| = 5$ và $|5| = 5$.\n\nCả hai đều bằng $5$ vì $-5$ và $5$ cách $0$ như nhau — mỗi số một bên. Dấu trừ chỉ cho biết **hướng nào**.',
    notes: [
      {
        tone: 'write',
        text: '$|x|$ is the distance from $x$ to $0$.\n$|a - b|$ is the distance between $a$ and $b$ — whichever is bigger.',
        textVn: '$|x|$ là khoảng cách từ $x$ tới $0$.\n$|a - b|$ là khoảng cách giữa $a$ và $b$ — dù số nào lớn hơn.',
      },
    ],
    check: {
      id: 'chk_abs',
      q: 'What is $|-4 - 3|$?',
      qVn: '$|-4 - 3|$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$7$', textVn: '$7$' },
        { val: 'B', text: '$-7$', textVn: '$-7$' },
        { val: 'C', text: '$1$', textVn: '$1$' },
      ],
      correct: 'A',
      expEn: 'Inside the bars first: $-4 - 3 = -7$. Then the distance from $-7$ to $0$ is $7$. It is also the distance between $-4$ and $3$ on the number line. An absolute value is never negative, so B is out.',
      expVn: 'Tính trong dấu giá trị tuyệt đối trước: $-4 - 3 = -7$. Khoảng cách từ $-7$ tới $0$ là $7$. Đó cũng là khoảng cách giữa $-4$ và $3$ trên trục số. Giá trị tuyệt đối không bao giờ âm, nên loại B.',
    },
  },

  {
    layout: 'split',
    accent: CYAN,
    icon: 'Grid3x3',
    ratio: 42,
    eyebrow: 'A second number line, standing up',
    eyebrowVn: 'Thêm một trục số thứ hai, dựng đứng',
    title: 'The Coordinate Plane',
    titleVn: 'Mặt Phẳng Tọa Độ',
    inlineSvg: DIAGRAMS.PLANE,
    drawThis: true,
    content: 'Put an upright number line through $0$ on the flat one and you get the **coordinate plane**. The flat line is the **$x$-axis**, the upright one is the **$y$-axis**, and they cross at the **origin**, $(0, 0)$.\n\nEvery point gets **two** numbers, an **ordered pair** $(x, y)$: how far across from the origin, then how far up. $(3, 2)$ is $3$ right and $2$ up; $(-5, -3)$ is $5$ left and $3$ down.',
    contentVn: 'Đặt một trục số dựng đứng đi qua số $0$ của trục nằm ngang, em được **mặt phẳng tọa độ**. Trục nằm ngang là **trục $x$**, trục dựng đứng là **trục $y$**, và chúng cắt nhau tại **gốc tọa độ** $(0, 0)$.\n\nMỗi điểm có **hai** số, một **cặp số có thứ tự** $(x, y)$: đi ngang bao xa từ gốc, rồi đi lên bao xa. $(3, 2)$ là sang phải $3$ và lên $2$; $(-5, -3)$ là sang trái $5$ và xuống $3$.',
    notes: [
      {
        tone: 'info',
        text: 'The axes cut the plane into four **quadrants**, numbered I, II, III, IV anticlockwise from the top right.',
        textVn: 'Hai trục chia mặt phẳng thành bốn **góc phần tư**, đánh số I, II, III, IV ngược chiều kim đồng hồ bắt đầu từ góc trên bên phải.',
      },
    ],
  },

  {
    layout: 'split',
    accent: CYAN,
    icon: 'MapPin',
    ratio: 46,
    eyebrow: 'Start at the origin every time',
    eyebrowVn: 'Lần nào cũng bắt đầu từ gốc tọa độ',
    title: 'Plot Three Points',
    titleVn: 'Biểu Diễn Ba Điểm',
    content: 'For each point: the **first** number moves you across (right if positive, left if negative), the **second** moves you up or down.\n\nA $0$ means **no move** in that direction — so $(0, -5)$ never leaves the $y$-axis.',
    contentVn: 'Với mỗi điểm: số **thứ nhất** đưa em đi ngang (sang phải nếu dương, sang trái nếu âm), số **thứ hai** đưa em lên hoặc xuống.\n\nSố $0$ nghĩa là **không di chuyển** theo hướng đó — nên $(0, -5)$ không bao giờ rời trục $y$.',
    activity: {
      type: 'line',
      id: 'act_plot_three',
      prompt: 'Plot all three points on the grid.',
      promptVn: 'Biểu diễn cả ba điểm trên lưới.',
      explain: '$(4, 3)$ is 4 right and 3 up. $(-3, 7)$ is 3 left and 7 up. $(0, -5)$ has no move across at all, so it sits on the $y$-axis, 5 below the origin.',
      explainVn: '$(4, 3)$ là sang phải 4 và lên 3. $(-3, 7)$ là sang trái 3 và lên 7. $(0, -5)$ không đi ngang chút nào, nên nó nằm trên trục $y$, thấp hơn gốc tọa độ 5 đơn vị.',
      grid: { xMin: -6, xMax: 6, yMin: -6, yMax: 8 },
      points: { A: [4, 3], B: [-3, 7], C: [0, -5] },
      step: { kind: 'plot', points: ['A', 'B', 'C'] },
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ArrowLeftRight',
    ratio: 44,
    eyebrow: 'The word "ordered" is doing work',
    eyebrowVn: 'Chữ "có thứ tự" rất quan trọng',
    title: 'Across Comes First',
    titleVn: 'Đi Ngang Trước',
    inlineSvg: DIAGRAMS.XY_ORDER,
    content: '$(3, 2)$ and $(2, 3)$ use the same two numbers and are **different points**. The order is the whole message.\n\nWe call $x$ the **$x$-coordinate** and $y$ the **$y$-coordinate**. A point whose coordinates are both whole numbers is a **lattice point** — it sits exactly where two grid lines cross.',
    contentVn: '$(3, 2)$ và $(2, 3)$ dùng cùng hai số nhưng là **hai điểm khác nhau**. Thứ tự chính là toàn bộ thông điệp.\n\nTa gọi $x$ là **hoành độ** (tọa độ $x$) và $y$ là **tung độ** (tọa độ $y$). Một điểm có cả hai tọa độ là số nguyên được gọi là **điểm nguyên** — nó nằm đúng chỗ hai đường lưới cắt nhau.',
    check: {
      id: 'chk_order',
      q: 'Which point is **2 left** and **5 up** from the origin?',
      qVn: 'Điểm nào nằm **sang trái 2** và **lên trên 5** so với gốc tọa độ?',
      options: [
        { val: 'A', text: '$(5, -2)$', textVn: '$(5, -2)$' },
        { val: 'B', text: '$(2, -5)$', textVn: '$(2, -5)$' },
        { val: 'C', text: '$(-2, 5)$', textVn: '$(-2, 5)$' },
      ],
      correct: 'C',
      expEn: 'Across first: 2 left is $x = -2$. Then up 5 is $y = 5$. So $(-2, 5)$. Option A writes the numbers in the wrong order; option B puts the minus sign on the wrong number.',
      expVn: 'Đi ngang trước: sang trái 2 là $x = -2$. Rồi lên 5 là $y = 5$. Vậy là $(-2, 5)$. Đáp án A viết sai thứ tự; đáp án B đặt dấu trừ vào nhầm số.',
    },
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Crosshair',
    side: 'left',
    ratio: 54,
    eyebrow: 'Two special lines of points',
    eyebrowVn: 'Hai đường điểm đặc biệt',
    title: 'Points on the Axes',
    titleVn: 'Điểm Nằm Trên Các Trục',
    content: 'A point on the **$x$-axis** is neither above nor below the origin, so its $y$-coordinate is $0$: like $(4, 0)$ or $(-6, 0)$.\n\nA point on the **$y$-axis** is neither left nor right of the origin, so its $x$-coordinate is $0$: like $(0, -3)$.',
    contentVn: 'Một điểm trên **trục $x$** không ở trên cũng không ở dưới gốc tọa độ, nên tung độ của nó bằng $0$: như $(4, 0)$ hay $(-6, 0)$.\n\nMột điểm trên **trục $y$** không ở bên trái cũng không ở bên phải gốc tọa độ, nên hoành độ của nó bằng $0$: như $(0, -3)$.',
    notes: [
      {
        tone: 'write',
        text: 'On the $x$-axis: $y = 0$. On the $y$-axis: $x = 0$.',
        textVn: 'Trên trục $x$: $y = 0$. Trên trục $y$: $x = 0$.',
      },
    ],
    check: {
      id: 'chk_on_axis',
      q: 'Which point lies on the **$y$-axis**?',
      qVn: 'Điểm nào nằm trên **trục $y$**?',
      options: [
        { val: 'A', text: '$(-6, 0)$', textVn: '$(-6, 0)$' },
        { val: 'B', text: '$(0, -6)$', textVn: '$(0, -6)$' },
        { val: 'C', text: '$(6, 6)$', textVn: '$(6, 6)$' },
      ],
      correct: 'B',
      expEn: 'On the $y$-axis you never move across, so $x = 0$: that is $(0, -6)$, six below the origin. $(-6, 0)$ has $y = 0$, so it is on the $x$-axis instead.',
      expVn: 'Trên trục $y$ em không đi ngang chút nào, nên $x = 0$: đó là $(0, -6)$, thấp hơn gốc 6 đơn vị. $(-6, 0)$ có $y = 0$, nên nó nằm trên trục $x$.',
    },
  },

  {
    layout: 'statement',
    accent: GREEN,
    icon: 'HelpCircle',
    eyebrow: 'Think about it before you look',
    eyebrowVn: 'Suy nghĩ trước khi xem',
    title: 'How Far, Straight There?',
    titleVn: 'Bao Xa, Nếu Đi Thẳng?',
    label: 'Your turn',
    labelVn: 'Đến lượt em',
    labelIcon: 'HelpCircle',
    text: 'From $A(-3, -5)$ to $B(5, 1)$',
    textVn: 'Từ $A(-3, -5)$ tới $B(5, 1)$',
    sub: 'Not across, not up — **straight there**. Start with the easy path: walk across from $A$, then up to $B$. Where do you turn the corner?',
    subVn: 'Không phải đi ngang, cũng không phải đi lên — mà **đi thẳng tới**. Bắt đầu bằng con đường dễ: đi ngang từ $A$, rồi đi lên tới $B$. Em rẽ ở góc nào?',
    activity: {
      type: 'line',
      id: 'act_corner',
      prompt: 'Walk across from A, then up to B. Click the corner where you turn.',
      promptVn: 'Đi ngang từ A, rồi đi lên tới B. Bấm vào góc nơi em rẽ.',
      explain: 'The corner is level with $A$ and straight below $B$, so it takes $B$\'s $x$ and $A$\'s $y$: $C(5, -5)$. The two walks and the straight line make a **right triangle**.',
      explainVn: 'Góc rẽ ngang hàng với $A$ và thẳng bên dưới $B$, nên nó lấy $x$ của $B$ và $y$ của $A$: $C(5, -5)$. Hai đoạn đường đi và đường thẳng tạo thành một **tam giác vuông**.',
      grid: { xMin: -5, xMax: 7, yMin: -7, yMax: 3 },
      points: { A: [-3, -5], B: [5, 1] },
      show: ['A', 'B'],
      step: { kind: 'corner', from: 'A', to: 'B', name: 'C' },
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'TriangleRight',
    ratio: 44,
    eyebrow: 'Two easy lengths, one hard one',
    eyebrowVn: 'Hai cạnh dễ, một cạnh khó',
    title: 'The Hidden Right Triangle',
    titleVn: 'Tam Giác Vuông Ẩn',
    inlineSvg: DIAGRAMS.DIST_TRIANGLE,
    drawThis: true,
    content: 'The walk across is $5 - (-3) = 8$. The walk up is $1 - (-5) = 6$. Those are the two short sides of a right triangle, and $AB$ — the distance we want — is its **longest side**.\n\nSo all we need is the rule that links the three sides of a right triangle.',
    contentVn: 'Đoạn đi ngang dài $5 - (-3) = 8$. Đoạn đi lên dài $1 - (-5) = 6$. Đó là hai cạnh ngắn của một tam giác vuông, còn $AB$ — khoảng cách ta cần tìm — là **cạnh dài nhất** của nó.\n\nVậy ta chỉ cần quy tắc liên hệ ba cạnh của một tam giác vuông.',
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'TriangleRight',
    side: 'left',
    ratio: 50,
    eyebrow: 'The rule you already know',
    eyebrowVn: 'Quy tắc em đã biết',
    title: 'The Pythagorean Theorem',
    titleVn: 'Định Lý Pythagore',
    inlineSvg: DIAGRAMS.PYTHAGORAS,
    content: 'In a right triangle, the square of the longest side equals the sum of the squares of the other two: $a^2 + b^2 = c^2$.\n\nFor our triangle: $AB^2 = 8^2 + 6^2 = 64 + 36 = 100$, and a distance is positive, so $AB = \\sqrt{100} = 10$.',
    contentVn: 'Trong một tam giác vuông, bình phương cạnh dài nhất bằng tổng bình phương hai cạnh còn lại: $a^2 + b^2 = c^2$.\n\nVới tam giác của ta: $AB^2 = 8^2 + 6^2 = 64 + 36 = 100$, và khoảng cách luôn dương, nên $AB = \\sqrt{100} = 10$.',
    check: {
      id: 'chk_pyth',
      q: 'A right triangle has short sides $5$ and $12$. How long is the longest side?',
      qVn: 'Một tam giác vuông có hai cạnh ngắn là $5$ và $12$. Cạnh dài nhất dài bao nhiêu?',
      options: [
        { val: 'A', text: '$17$', textVn: '$17$' },
        { val: 'B', text: '$13$', textVn: '$13$' },
        { val: 'C', text: '$\\sqrt{17}$', textVn: '$\\sqrt{17}$' },
      ],
      correct: 'B',
      expEn: '$c^2 = 5^2 + 12^2 = 25 + 144 = 169$, so $c = 13$. Option A just added the sides — but the sides are not added, their **squares** are. Option C added them and then took a root.',
      expVn: '$c^2 = 5^2 + 12^2 = 25 + 144 = 169$, nên $c = 13$. Đáp án A chỉ cộng hai cạnh — nhưng không cộng các cạnh, mà cộng **bình phương** của chúng. Đáp án C cộng rồi mới lấy căn.',
    },
  },

  {
    layout: 'callout',
    accent: CYAN,
    icon: 'Lightbulb',
    eyebrow: 'The same triangle, for any two points',
    eyebrowVn: 'Cùng tam giác đó, cho hai điểm bất kỳ',
    title: 'The Distance Formula',
    titleVn: 'Công Thức Khoảng Cách',
    content: 'For $(x_1, y_1)$ and $(x_2, y_2)$, the walk across is $x_2 - x_1$ and the walk up is $y_2 - y_1$, so\n\n$$\\text{distance} = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n\nYou do not need to memorise this. It **is** the Pythagorean Theorem: across squared, plus up squared, then the square root.',
    contentVn: 'Với $(x_1, y_1)$ và $(x_2, y_2)$, đoạn đi ngang là $x_2 - x_1$ và đoạn đi lên là $y_2 - y_1$, nên\n\n$$\\text{khoảng cách} = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n\nEm không cần học thuộc công thức này. Nó **chính là** định lý Pythagore: bình phương đoạn ngang, cộng bình phương đoạn dọc, rồi lấy căn bậc hai.',
  },

  {
    layout: 'steps',
    accent: CYAN,
    icon: 'Pencil',
    eyebrow: 'Do it in your book, one line at a time',
    eyebrowVn: 'Làm vào vở, từng dòng một',
    title: 'Worked Example',
    titleVn: 'Ví Dụ Mẫu',
    content: '> Find the distance between $(-5, -2)$ and $(7, 3)$.',
    contentVn: '> Tìm khoảng cách giữa $(-5, -2)$ và $(7, 3)$.',
    steps: [
      { text: '**Across:** $7 - (-5) = 12$.', textVn: '**Ngang:** $7 - (-5) = 12$.' },
      { text: '**Up:** $3 - (-2) = 5$.', textVn: '**Dọc:** $3 - (-2) = 5$.' },
      { text: '**Square and add:** $12^2 + 5^2 = 144 + 25 = 169$.', textVn: '**Bình phương rồi cộng:** $12^2 + 5^2 = 144 + 25 = 169$.' },
      { text: '**Square root:** $\\sqrt{169} = 13$. The distance is $13$.', textVn: '**Lấy căn:** $\\sqrt{169} = 13$. Khoảng cách là $13$.' },
    ],
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'SquareRadical',
    ratio: 46,
    eyebrow: 'Most distances are not whole numbers',
    eyebrowVn: 'Phần lớn khoảng cách không phải số nguyên',
    title: 'Keep It Exact',
    titleVn: 'Giữ Kết Quả Chính Xác',
    inlineSvg: DIAGRAMS.DIST_ROOT,
    content: 'From $A(1, 1)$ to $B(4, 3)$: across $3$, up $2$, so $AB^2 = 9 + 4 = 13$.\n\n$13$ is not a perfect square, so leave the answer as $\\sqrt{13}$. That is the **exact** distance. $3.61$ is only close to it.',
    contentVn: 'Từ $A(1, 1)$ tới $B(4, 3)$: ngang $3$, dọc $2$, nên $AB^2 = 9 + 4 = 13$.\n\n$13$ không phải số chính phương, nên để đáp án là $\\sqrt{13}$. Đó là khoảng cách **chính xác**. $3.61$ chỉ gần đúng mà thôi.',
    check: {
      id: 'chk_root',
      q: 'What is the exact distance from $(0, 0)$ to $(1, 1)$?',
      qVn: 'Khoảng cách chính xác từ $(0, 0)$ tới $(1, 1)$ là bao nhiêu?',
      options: [
        { val: 'A', text: '$2$', textVn: '$2$' },
        { val: 'B', text: '$1$', textVn: '$1$' },
        { val: 'C', text: '$\\sqrt{2}$', textVn: '$\\sqrt{2}$' },
      ],
      correct: 'C',
      expEn: 'Across $1$, up $1$: the distance squared is $1^2 + 1^2 = 2$, so the distance is $\\sqrt{2}$ — about $1.41$. It is more than $1$ (the slanted side is the longest) and less than $2$ (going straight is shorter than going round the corner).',
      expVn: 'Ngang $1$, dọc $1$: bình phương khoảng cách là $1^2 + 1^2 = 2$, nên khoảng cách là $\\sqrt{2}$ — khoảng $1.41$. Nó lớn hơn $1$ (cạnh xiên là cạnh dài nhất) và nhỏ hơn $2$ (đi thẳng thì ngắn hơn đi vòng qua góc).',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Repeat',
    side: 'left',
    ratio: 56,
    eyebrow: 'What if B is to the LEFT of A?',
    eyebrowVn: 'Nếu B nằm BÊN TRÁI A thì sao?',
    title: 'The Order Does Not Matter',
    titleVn: 'Thứ Tự Không Quan Trọng',
    content: 'Subtract the other way round and the difference just changes sign: $2 - 7 = -5$ but $7 - 2 = 5$.\n\nSquaring removes the sign — $(-5)^2 = 25 = 5^2$ — so the distance formula gives the same answer whichever point you call the first. A negative "across" just means the walk goes left.',
    contentVn: 'Trừ theo chiều ngược lại thì hiệu chỉ đổi dấu: $2 - 7 = -5$ nhưng $7 - 2 = 5$.\n\nBình phương xóa mất dấu — $(-5)^2 = 25 = 5^2$ — nên công thức khoảng cách cho cùng một đáp án dù em gọi điểm nào là điểm thứ nhất. Một đoạn "ngang" âm chỉ có nghĩa là đi sang trái.',
    check: {
      id: 'chk_square_sign',
      q: 'Which is equal to $(2 - 7)^2$?',
      qVn: 'Biểu thức nào bằng $(2 - 7)^2$?',
      options: [
        { val: 'A', text: '$-25$', textVn: '$-25$' },
        { val: 'B', text: '$(7 - 2)^2$', textVn: '$(7 - 2)^2$' },
        { val: 'C', text: '$10$', textVn: '$10$' },
      ],
      correct: 'B',
      expEn: '$(2 - 7)^2 = (-5)^2 = 25$ and $(7 - 2)^2 = 5^2 = 25$ — the same. A square is never negative, so A is out; C doubled instead of squaring.',
      expVn: '$(2 - 7)^2 = (-5)^2 = 25$ và $(7 - 2)^2 = 5^2 = 25$ — bằng nhau. Bình phương không bao giờ âm, nên loại A; C là nhân đôi chứ không phải bình phương.',
    },
  },

  {
    layout: 'statement',
    accent: AMBER,
    icon: 'HelpCircle',
    eyebrow: 'Guess before you calculate',
    eyebrowVn: 'Đoán trước khi tính',
    title: 'Where Is Halfway?',
    titleVn: 'Điểm Chính Giữa Ở Đâu?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'HelpCircle',
    text: '$P(2, 4)$ and $Q(-7, -2)$',
    textVn: '$P(2, 4)$ và $Q(-7, -2)$',
    sub: 'On a number line, halfway was the **average**. Halfway along a segment has to be halfway **across** and halfway **up**. What does that suggest?',
    subVn: 'Trên trục số, điểm chính giữa là **trung bình cộng**. Điểm chính giữa một đoạn thẳng phải nằm giữa theo **chiều ngang** và giữa theo **chiều dọc**. Điều đó gợi ý gì?',
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Target',
    ratio: 44,
    eyebrow: 'Average the x values, average the y values',
    eyebrowVn: 'Trung bình các giá trị x, trung bình các giá trị y',
    title: 'The Midpoint',
    titleVn: 'Trung Điểm',
    inlineSvg: DIAGRAMS.MIDPOINT,
    drawThis: true,
    content: 'The **midpoint** $M$ of $PQ$ is the same distance from $P$ as from $Q$. Its $x$ is the average of the two $x$ values, its $y$ the average of the two $y$ values:\n\n$M = \\left(\\dfrac{2 + (-7)}{2},\\ \\dfrac{4 + (-2)}{2}\\right) = \\left(-\\dfrac{5}{2},\\ 1\\right)$',
    contentVn: '**Trung điểm** $M$ của $PQ$ cách $P$ và $Q$ một khoảng bằng nhau. Hoành độ của nó là trung bình hai hoành độ, tung độ là trung bình hai tung độ:\n\n$M = \\left(\\dfrac{2 + (-7)}{2},\\ \\dfrac{4 + (-2)}{2}\\right) = \\left(-\\dfrac{5}{2},\\ 1\\right)$',
    notes: [
      {
        tone: 'write',
        text: 'The midpoint of $(x_1, y_1)$ and $(x_2, y_2)$ is $\\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$.',
        textVn: 'Trung điểm của $(x_1, y_1)$ và $(x_2, y_2)$ là $\\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$.',
      },
    ],
    check: {
      id: 'chk_midpoint',
      q: 'What is the midpoint of $(1, 8)$ and $(5, 2)$?',
      qVn: 'Trung điểm của $(1, 8)$ và $(5, 2)$ là gì?',
      options: [
        { val: 'A', text: '$(3, 5)$', textVn: '$(3, 5)$' },
        { val: 'B', text: '$(2, 3)$', textVn: '$(2, 3)$' },
        { val: 'C', text: '$(6, 10)$', textVn: '$(6, 10)$' },
      ],
      correct: 'A',
      expEn: 'Average each coordinate: $\\dfrac{1 + 5}{2} = 3$ and $\\dfrac{8 + 2}{2} = 5$. Option C added but forgot to halve; option B halved the **differences** instead of averaging.',
      expVn: 'Lấy trung bình từng tọa độ: $\\dfrac{1 + 5}{2} = 3$ và $\\dfrac{8 + 2}{2} = 5$. Đáp án C cộng nhưng quên chia đôi; đáp án B chia đôi **hiệu** thay vì lấy trung bình.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'MapPin',
    side: 'left',
    ratio: 52,
    eyebrow: 'Your turn, on the grid',
    eyebrowVn: 'Đến lượt em, trên lưới',
    title: 'Find the Midpoint',
    titleVn: 'Tìm Trung Điểm',
    content: 'Work out the averages first — in your head or in your book — and **then** click. Clicking is how you check the arithmetic, not how you do it.',
    contentVn: 'Tính các giá trị trung bình trước — nhẩm hoặc viết ra vở — **rồi mới** bấm. Bấm là để kiểm tra phép tính, không phải để thay cho phép tính.',
    activity: {
      type: 'line',
      id: 'act_midpoint',
      prompt: 'Click the midpoint M of PQ.',
      promptVn: 'Bấm vào trung điểm M của PQ.',
      explain: '$\\dfrac{-4 + 6}{2} = 1$ and $\\dfrac{5 + (-1)}{2} = 2$, so $M = (1, 2)$. Count along the segment: $M$ is 5 across and 3 down from $P$, and 5 across and 3 down again to $Q$.',
      explainVn: '$\\dfrac{-4 + 6}{2} = 1$ và $\\dfrac{5 + (-1)}{2} = 2$, nên $M = (1, 2)$. Đếm dọc theo đoạn thẳng: $M$ cách $P$ 5 đơn vị ngang và 3 đơn vị xuống, rồi lại 5 ngang và 3 xuống nữa là tới $Q$.',
      grid: { xMin: -6, xMax: 8, yMin: -3, yMax: 7 },
      points: { P: [-4, 5], Q: [6, -1] },
      show: ['P', 'Q'],
      step: { kind: 'midpoint', of: ['P', 'Q'], name: 'M' },
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Repeat',
    ratio: 44,
    eyebrow: 'Working backwards',
    eyebrowVn: 'Làm ngược lại',
    title: 'Given the Midpoint, Find the End',
    titleVn: 'Biết Trung Điểm, Tìm Đầu Mút',
    inlineSvg: DIAGRAMS.EXTEND,
    content: 'If $Q$ is the midpoint of $PT$, then the step from $P$ to $Q$ is exactly half the journey. Take the **same step again** from $Q$ and you land on $T$.\n\nHere the step from $P(4, -3)$ to $Q(1, 1)$ is $3$ left and $4$ up, so $T = (1 - 3,\\ 1 + 4) = (-2, 5)$.',
    contentVn: 'Nếu $Q$ là trung điểm của $PT$, thì bước đi từ $P$ tới $Q$ đúng bằng nửa quãng đường. Đi **thêm đúng bước đó** từ $Q$ là em tới $T$.\n\nỞ đây bước từ $P(4, -3)$ tới $Q(1, 1)$ là sang trái $3$ và lên $4$, nên $T = (1 - 3,\\ 1 + 4) = (-2, 5)$.',
    activity: {
      type: 'line',
      id: 'act_extend',
      prompt: 'M is the midpoint of PT. Click T.',
      promptVn: 'M là trung điểm của PT. Bấm vào T.',
      explain: 'From $P(3, -2)$ to $M(1, 1)$ is $2$ left and $3$ up. The same step again from $M$ gives $T = (-1, 4)$. Check: the average of $3$ and $-1$ is $1$, and of $-2$ and $4$ is $1$.',
      explainVn: 'Từ $P(3, -2)$ tới $M(1, 1)$ là sang trái $2$ và lên $3$. Đi thêm đúng bước đó từ $M$ được $T = (-1, 4)$. Kiểm tra: trung bình của $3$ và $-1$ là $1$, của $-2$ và $4$ là $1$.',
      grid: { xMin: -4, xMax: 6, yMin: -4, yMax: 6 },
      points: { P: [3, -2], M: [1, 1] },
      show: ['P', 'M'],
      step: { kind: 'extend', from: 'P', through: 'M', name: 'T' },
    },
  },

  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Not halfway this time',
    eyebrowVn: 'Lần này không phải chính giữa',
    title: 'One Part to Two',
    titleVn: 'Một Phần So Với Hai Phần',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'HelpCircle',
    text: '$T$ is on $PQ$ with $PT : TQ = 1 : 2$',
    textVn: '$T$ nằm trên $PQ$ với $PT : TQ = 1 : 2$',
    sub: 'Cut $PQ$ into pieces so that $PT$ is one piece and $TQ$ is two. How many pieces is that altogether, and **what fraction of the way** from $P$ is $T$?',
    subVn: 'Cắt $PQ$ thành các phần sao cho $PT$ là một phần và $TQ$ là hai phần. Tổng cộng có bao nhiêu phần, và $T$ nằm ở **phân số nào của quãng đường** tính từ $P$?',
    check: {
      id: 'chk_fraction_way',
      q: 'If $PT : TQ = 3 : 1$, what fraction of the way from $P$ to $Q$ is $T$?',
      qVn: 'Nếu $PT : TQ = 3 : 1$, thì $T$ nằm ở phân số nào của quãng đường từ $P$ tới $Q$?',
      options: [
        { val: 'A', text: '$\\dfrac{1}{3}$', textVn: '$\\dfrac{1}{3}$' },
        { val: 'B', text: '$\\dfrac{3}{4}$', textVn: '$\\dfrac{3}{4}$' },
        { val: 'C', text: '$\\dfrac{3}{1}$', textVn: '$\\dfrac{3}{1}$' },
      ],
      correct: 'B',
      expEn: 'There are $3 + 1 = 4$ equal pieces, and $PT$ is $3$ of them, so $T$ is $\\dfrac{3}{4}$ of the way along. Option A reads the ratio as a fraction, but the ratio compares the two PIECES, not a piece with the whole.',
      expVn: 'Có $3 + 1 = 4$ phần bằng nhau, và $PT$ chiếm $3$ phần, nên $T$ nằm ở $\\dfrac{3}{4}$ quãng đường. Đáp án A đọc tỉ số thành phân số, nhưng tỉ số so sánh hai PHẦN với nhau, không phải một phần với cả đoạn.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Split',
    ratio: 44,
    eyebrow: 'The midpoint idea, with a different fraction',
    eyebrowVn: 'Ý tưởng trung điểm, với một phân số khác',
    title: 'A Third of the Way Along',
    titleVn: 'Một Phần Ba Quãng Đường',
    inlineSvg: DIAGRAMS.SECTION,
    drawThis: true,
    content: 'From $P(2, 4)$ to $Q(-7, -2)$ the change is $-9$ across and $-6$ up. $PT : TQ = 1 : 2$ makes $3$ equal pieces, and $T$ is after the first:\n\n$T = \\left(2 + \\tfrac{1}{3}(-9),\\ 4 + \\tfrac{1}{3}(-6)\\right) = (-1, 2)$.\n\nCheck with distances: $PT = \\sqrt{13}$ and $TQ = 2\\sqrt{13}$ — one to two.',
    contentVn: 'Từ $P(2, 4)$ tới $Q(-7, -2)$ độ thay đổi là $-9$ theo chiều ngang và $-6$ theo chiều dọc. $PT : TQ = 1 : 2$ tạo ra $3$ phần bằng nhau, và $T$ nằm sau phần thứ nhất:\n\n$T = \\left(2 + \\tfrac{1}{3}(-9),\\ 4 + \\tfrac{1}{3}(-6)\\right) = (-1, 2)$.\n\nKiểm tra bằng khoảng cách: $PT = \\sqrt{13}$ và $TQ = 2\\sqrt{13}$ — một so với hai.',
    notes: [
      {
        tone: 'write',
        text: 'To go a fraction $f$ of the way from $P$ to $Q$: start at $P$ and add $f$ of the change in $x$ and $f$ of the change in $y$.',
        textVn: 'Để đi một phân số $f$ của quãng đường từ $P$ tới $Q$: bắt đầu tại $P$ rồi cộng thêm $f$ lần độ thay đổi của $x$ và $f$ lần độ thay đổi của $y$.',
      },
    ],
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MapPin',
    side: 'left',
    ratio: 52,
    eyebrow: 'Read the ratio carefully',
    eyebrowVn: 'Đọc kỹ tỉ số',
    title: 'Four Times as Far',
    titleVn: 'Xa Gấp Bốn Lần',
    content: '$T$ is on $AB$, and its distance to $B$ is **4 times** its distance to $A$. So $AT : TB = 1 : 4$ — five equal pieces, and $T$ is **one fifth** of the way from $A$.\n\nWork out the change from $A$ to $B$ first, take a fifth of it, then click.',
    contentVn: '$T$ nằm trên $AB$, và khoảng cách từ $T$ tới $B$ **gấp 4 lần** khoảng cách từ $T$ tới $A$. Vậy $AT : TB = 1 : 4$ — năm phần bằng nhau, và $T$ nằm ở **một phần năm** quãng đường tính từ $A$.\n\nTính độ thay đổi từ $A$ tới $B$ trước, lấy một phần năm của nó, rồi mới bấm.',
    activity: {
      type: 'line',
      id: 'act_divide',
      prompt: 'TB is 4 times AT. Click T.',
      promptVn: 'TB gấp 4 lần AT. Bấm vào T.',
      explain: 'From $A(-4, -3)$ to $B(6, 2)$ the change is $10$ across and $5$ up. One fifth of that is $2$ across and $1$ up, so $T = (-2, -2)$. Then $TB$ is $8$ across and $4$ up — four times as far.',
      explainVn: 'Từ $A(-4, -3)$ tới $B(6, 2)$ độ thay đổi là $10$ ngang và $5$ lên. Một phần năm của nó là $2$ ngang và $1$ lên, nên $T = (-2, -2)$. Khi đó $TB$ là $8$ ngang và $4$ lên — xa gấp bốn lần.',
      grid: { xMin: -6, xMax: 8, yMin: -5, yMax: 4 },
      points: { A: [-4, -3], B: [6, 2] },
      show: ['A', 'B'],
      step: { kind: 'divide', from: 'A', to: 'B', ratio: [1, 4], name: 'T' },
    },
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
    content: '> Your book should now have **4 written rules** and **3 triangles** drawn on grids. Check.',
    contentVn: '> Vở của em bây giờ phải có **4 quy tắc đã chép** và **3 tam giác** vẽ trên lưới. Kiểm tra lại.',
    items: [
      { text: 'Find the distance and the halfway point of two numbers.', textVn: 'Tìm khoảng cách và điểm chính giữa của hai số.' },
      { text: 'Plot $(x, y)$ — **across first**, then up or down.', textVn: 'Biểu diễn $(x, y)$ — **đi ngang trước**, rồi lên hoặc xuống.' },
      { text: 'Draw the right triangle between two points.', textVn: 'Vẽ tam giác vuông giữa hai điểm.' },
      { text: 'Use Pythagoras to get an **exact** distance.', textVn: 'Dùng định lý Pythagore để có khoảng cách **chính xác**.' },
      { text: 'Find a midpoint by averaging — or an end from a midpoint.', textVn: 'Tìm trung điểm bằng cách lấy trung bình — hoặc tìm đầu mút khi biết trung điểm.' },
      { text: 'Find the point a fraction of the way along a segment.', textVn: 'Tìm điểm nằm ở một phân số nào đó của đoạn thẳng.' },
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
    subtitle: 'Every answer here came from walking across and walking up. Next unit, those two walks get divided: up over across is the number that says how STEEP a line is — and it turns an equation into a picture.',
    subtitleVn: 'Mọi đáp án ở đây đều đến từ việc đi ngang và đi lên. Bài sau, hai đoạn đường đó được đem chia cho nhau: dọc chia ngang là con số cho biết đường thẳng DỐC tới mức nào — và nó biến một phương trình thành một hình vẽ.',
  },
];
