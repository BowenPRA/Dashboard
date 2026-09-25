// src/data/PHYSICS/PHY_MOM/notes.js
// Acellus Physics: Momentum & Collisions — the lesson deck.
//
// WHO IT IS FOR. The same student as PHY_CIRC, one module on, and still
// losing most of her marks to the algebra rather than the physics. Momentum
// adds two new ways to lose them: a velocity's SIGN is its direction, and
// the collision formulas look like four different equations to memorise.
// So the deck is built on four rules.
//   · There is ONE collision equation. Slide 13 writes it down; slides
//     15–23 DERIVE every special case from it — at rest, stuck together,
//     recoil — by putting the story into it. The inelastic equation is
//     never handed over; she watches $v_{1f} = v_{2f} = v_f$ go in and the
//     $v_f$ get factored out. The Isolate It task makes her do the same.
//   · Signs are taught as direction (slide 4) and drilled on every worked
//     example: a negative number always goes in brackets, and minus a minus
//     is a plus (slide 9, a predict activity before any explanation).
//   · FACTORING is the one new algebra move (slide 19) — and slide 21 is the
//     item where it is not needed, because the unknown is a mass in one term.
//   · The five-line method from PHY_CIRC, with "and signs" added to line 1,
//     on every worked example. The worked examples ARE her Acellus items.
//
// THE SPINE:
//   1–2    hook: a baseball and a walking dog are about equally hard to stop.
//   3–6    p = mv; direction is a sign; total momentum; the method (the dog).
//   7–11   impulse: J = FΔt; derived from F = ma; minus a minus (predict);
//          the bat; the basketball's contact time.
//   12–14  conservation: shared not lost; THE equation; blocks A and B.
//   15     one equation, three stories — sort the phrases.
//   16–17  story 1, at rest: the term vanishes; car 1 and car 2 (+ the truck).
//   18–22  story 2, stick together: derive, FACTOR, the meteors, the sticky
//          ball (a mass needs no factoring), Anna and Paul.
//   23     story 3, recoil: the minus sign appears by itself.
//   24–26  the formula page, the four mistakes, the recap.
//
// House notes:
//  · BILINGUAL. PHYSICS declares `bilingual: true`; every learner-facing string
//    carries a `vn*` twin and the validator enforces it.
//  · `$$…$$` only in `content`, callout bodies and `reveal.answer`. Inline
//    `$…$` everywhere else (steps, notes, statement text, checks).
//  · Layout `title` and hero `objective` are plain text.
//  · `check` / `activity` is always the LAST key on its slide (narration stops
//    there). Activity strings use `name`/`explain`, never `text`.
//  · Numbers agree with the Isolate It task, which derives them.
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
    icon: 'Zap',
    brand: 'Acellus Physics',
    brandVn: 'Acellus Vật lý',
    eyebrow: 'Momentum, impulse, collisions, inelastic collisions and recoil',
    eyebrowVn: 'Động lượng, xung lượng, va chạm, va chạm mềm và giật lùi',
    title: 'Momentum & Collisions',
    titleVn: 'Động Lượng & Va Chạm',
    objective: 'I can give momentum a sign for its direction, use impulse, and fit the ONE collision equation to any story — at rest, stuck together or recoil — then rearrange it before any number goes in.',
    objectiveVn: 'Em có thể ghi dấu cho động lượng theo hướng của nó, dùng xung lượng, và điều chỉnh MỘT phương trình va chạm cho mọi đề bài — đứng yên, dính vào nhau hay giật lùi — rồi biến đổi nó trước khi thay số.',
    warmUp: 'A shopping trolley and a truck both roll toward you at walking speed. Which would you rather stop with your hands, and why? Write one sentence.',
    warmUpVn: 'Một chiếc xe đẩy siêu thị và một chiếc xe tải cùng lăn về phía em với tốc độ đi bộ. Em muốn dùng tay chặn cái nào hơn, và vì sao? Viết một câu.',
  },

  {
    layout: 'statement',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Before any formula',
    eyebrowVn: 'Trước khi có công thức nào',
    title: 'Which Is Harder to Stop?',
    titleVn: 'Cái Nào Khó Dừng Hơn?',
    label: 'Think first',
    labelVn: 'Suy nghĩ trước',
    labelIcon: 'Lightbulb',
    text: 'A 0.145 kg baseball flies at 42.0 m/s. A 12.0 kg dog walks at 0.500 m/s. Which one is harder to stop?',
    textVn: 'Một quả bóng chày 0.145 kg bay với tốc độ 42.0 m/s. Một con chó 12.0 kg đi bộ với tốc độ 0.500 m/s. Cái nào khó dừng hơn?',
    sub: 'Light and fast, or heavy and slow? Decide before you look.',
    subVn: 'Nhẹ mà nhanh, hay nặng mà chậm? Hãy quyết định trước khi xem.',
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      prompt: 'Multiply each mass by its speed.',
      promptVn: 'Nhân khối lượng của mỗi vật với tốc độ của nó.',
      answer: 'Almost a **tie**. Baseball: $0.145 \\times 42.0 = 6.09$. Dog: $12.0 \\times 0.500 = 6.00$. What makes a moving thing hard to stop is its mass AND its speed **together** — a light, fast ball and a heavy, slow dog can carry the same amount. Mass times velocity has a name: **momentum**.',
      answerVn: 'Gần như **bằng nhau**. Bóng chày: $0.145 \\times 42.0 = 6.09$. Con chó: $12.0 \\times 0.500 = 6.00$. Điều làm một vật đang chuyển động khó dừng là khối lượng VÀ tốc độ của nó **cùng lúc** — một quả bóng nhẹ mà nhanh và một con chó nặng mà chậm có thể mang cùng một lượng. Khối lượng nhân vận tốc có một cái tên: **động lượng**.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Star',
    eyebrow: 'The first formula',
    eyebrowVn: 'Công thức đầu tiên',
    title: 'Momentum',
    titleVn: 'Động Lượng',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$p = m v$',
    textVn: '$p = m v$',
    sub: 'Momentum is mass times velocity. It is what makes a moving thing hard to stop.',
    subVn: 'Động lượng là khối lượng nhân vận tốc. Đó là thứ làm một vật đang chuyển động khó dừng lại.',
    notes: [
      {
        tone: 'write',
        text: '$p$ = momentum, in **kg·m/s**\n$m$ = mass, in **kilograms (kg)**\n$v$ = velocity, in **m/s** — with a **sign** for its direction',
        textVn: '$p$ = động lượng, đơn vị **kg·m/s**\n$m$ = khối lượng, đơn vị **kilôgam (kg)**\n$v$ = vận tốc, đơn vị **m/s** — kèm **dấu** cho hướng của nó',
      },
      {
        tone: 'info',
        text: 'The unit is just the two units multiplied: kg × m/s = **kg·m/s**. Acellus writes it kg · m/s. The letter is $p$, not $m$ — $m$ is already taken by mass.',
        textVn: 'Đơn vị chỉ là hai đơn vị nhân với nhau: kg × m/s = **kg·m/s**. Acellus viết là kg · m/s. Chữ cái là $p$, không phải $m$ — $m$ đã dùng cho khối lượng rồi.',
      },
    ],
    check: {
      id: 'chk_p_car',
      q: 'A 1200 kg car moves at 15.0 m/s. What is its momentum?',
      qVn: 'Một chiếc xe 1200 kg chuyển động với vận tốc 15.0 m/s. Động lượng của nó là bao nhiêu?',
      options: [
        { val: 'A', text: '$80$ kg·m/s', textVn: '$80$ kg·m/s' },
        { val: 'B', text: '$1215$ kg·m/s', textVn: '$1215$ kg·m/s' },
        { val: 'C', text: '$18{,}000$ kg·m/s', textVn: '$18{,}000$ kg·m/s' },
        { val: 'D', text: '$0.0125$ kg·m/s', textVn: '$0.0125$ kg·m/s' },
      ],
      correct: 'C',
      expEn: '$p = m v = 1200 \\times 15.0 = 18{,}000$ kg·m/s. Option A divided the mass by the speed, option B added them, and option D divided the speed by the mass. Momentum is always a MULTIPLICATION.',
      expVn: '$p = m v = 1200 \\times 15.0 = 18{,}000$ kg·m/s. Phương án A chia khối lượng cho tốc độ, phương án B cộng chúng, và phương án D chia tốc độ cho khối lượng. Động lượng luôn là một phép NHÂN.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'ArrowLeftRight',
    ratio: 40,
    eyebrow: 'The part the answer box always asks about',
    eyebrowVn: 'Phần mà ô đáp án luôn hỏi đến',
    title: 'Direction Is a Sign',
    titleVn: 'Hướng Là Một Dấu',
    inlineSvg: DIAGRAMS.SIGN_LINE,
    content: 'Momentum has a direction, and on a straight line there are only two: this way or that way. Physics writes the direction as a **sign**.\n\nOne direction is positive — the question usually tells you ("right is +, left is −") — and anything moving the other way gets a **minus** sign. The minus does not mean "less". It means "the other way".',
    contentVn: 'Động lượng có hướng, và trên một đường thẳng chỉ có hai hướng: chiều này hoặc chiều kia. Vật lý viết hướng bằng một **dấu**.\n\nMột hướng là dương — đề bài thường cho sẵn ("phải là +, trái là −") — và bất cứ thứ gì chuyển động theo hướng kia đều mang dấu **trừ**. Dấu trừ không có nghĩa là "ít hơn". Nó có nghĩa là "hướng ngược lại".',
    notes: [
      {
        tone: 'write',
        text: '**Signs:** right / east / forward = $+$ · left / west / backward = $-$\nA velocity is a number WITH its sign: 9.80 m/s to the left is $v = -9.80$ m/s.',
        textVn: '**Dấu:** phải / đông / tiến = $+$ · trái / tây / lùi = $-$\nVận tốc là một con số KÈM dấu của nó: 9.80 m/s sang trái là $v = -9.80$ m/s.',
      },
    ],
    check: {
      id: 'chk_sign_ball',
      q: 'A 2.27 kg ball moves 9.80 m/s to the LEFT. Right is +. What is its momentum?',
      qVn: 'Một quả bóng 2.27 kg chuyển động 9.80 m/s sang TRÁI. Phải là +. Động lượng của nó là bao nhiêu?',
      options: [
        { val: 'A', text: '$+22.2$ kg·m/s', textVn: '$+22.2$ kg·m/s' },
        { val: 'B', text: '$-22.2$ kg·m/s', textVn: '$-22.2$ kg·m/s' },
        { val: 'C', text: '$-4.32$ kg·m/s', textVn: '$-4.32$ kg·m/s' },
        { val: 'D', text: '$-12.1$ kg·m/s', textVn: '$-12.1$ kg·m/s' },
      ],
      correct: 'B',
      expEn: '$p = m v = 2.27 \\times (-9.80) = -22.2$ kg·m/s. The size comes from the multiplication; the minus comes from "left". Option A lost the direction. Option C divided $9.80 \\div 2.27$. Option D added the two numbers.',
      expVn: '$p = m v = 2.27 \\times (-9.80) = -22.2$ kg·m/s. Độ lớn đến từ phép nhân; dấu trừ đến từ "trái". Phương án A làm mất hướng. Phương án C chia $9.80 \\div 2.27$. Phương án D cộng hai số lại.',
    },
  },

  {
    layout: 'steps',
    accent: AMBER,
    icon: 'Sigma',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Total Momentum of Two Balls',
    titleVn: 'Tổng Động Lượng Của Hai Quả Bóng',
    content: '**A 0.907 kg ball moving at 23.4 m/s to the right strikes a 2.27 kg ball moving 9.80 m/s to the left. What is the total momentum of the two balls?**\n\nMomenta add — signs included. That is the whole question.',
    contentVn: '**Một quả bóng 0.907 kg chuyển động với tốc độ 23.4 m/s sang phải va vào một quả bóng 2.27 kg đang chuyển động 9.80 m/s sang trái. Tổng động lượng của hai quả bóng là bao nhiêu?**\n\nCác động lượng cộng lại — kèm cả dấu. Cả câu hỏi chỉ có vậy.',
    steps: [
      {
        text: '**Pieces, with units and signs.** $m_1 = 0.907$ kg, $v_1 = +23.4$ m/s (right). $m_2 = 2.27$ kg, $v_2 = -9.80$ m/s (left).',
        textVn: '**Các đại lượng, kèm đơn vị và dấu.** $m_1 = 0.907$ kg, $v_1 = +23.4$ m/s (phải). $m_2 = 2.27$ kg, $v_2 = -9.80$ m/s (trái).',
      },
      {
        text: '**Formula.** Total momentum is the two momenta added: $p = m_1 v_1 + m_2 v_2$. $p$ is already the subject.',
        textVn: '**Công thức.** Tổng động lượng là hai động lượng cộng lại: $p = m_1 v_1 + m_2 v_2$. $p$ đã là chủ thể.',
      },
      {
        text: '**Substitute — a negative number goes in brackets:** $p = 0.907 \\times 23.4 + 2.27 \\times (-9.80)$.',
        textVn: '**Thay số — số âm đặt trong ngoặc:** $p = 0.907 \\times 23.4 + 2.27 \\times (-9.80)$.',
      },
      {
        text: '**Calculate:** $p = 21.22 + (-22.25) = -1.02$ kg·m/s.',
        textVn: '**Tính:** $p = 21.22 + (-22.25) = -1.02$ kg·m/s.',
      },
      {
        text: '**Say what the sign means.** The total is small and **negative**: the heavier ball, going left, carries slightly more momentum, so the pair together points LEFT.',
        textVn: '**Nói dấu có nghĩa gì.** Tổng nhỏ và **âm**: quả bóng nặng hơn, đi sang trái, mang động lượng lớn hơn một chút, nên cả cặp hướng sang TRÁI.',
      },
    ],
    check: {
      id: 'chk_total_sign',
      q: 'A student answers $+43.5$ kg·m/s for this question. What did they do?',
      qVn: 'Một học sinh trả lời $+43.5$ kg·m/s cho câu này. Bạn ấy đã làm gì?',
      options: [
        { val: 'A', text: 'Forgot to multiply by the masses', textVn: 'Quên nhân với khối lượng' },
        { val: 'B', text: 'Used the wrong direction for the first ball', textVn: 'Dùng sai hướng cho quả bóng thứ nhất' },
        { val: 'C', text: 'Nothing — it is right', textVn: 'Không sai gì — đó là đáp án đúng' },
        { val: 'D', text: 'Used $+9.80$ for the ball moving left', textVn: 'Dùng $+9.80$ cho quả bóng đi sang trái' },
      ],
      correct: 'D',
      expEn: '$0.907 \\times 23.4 + 2.27 \\times 9.80 = 21.2 + 22.2 = 43.5$. That treats both balls as going right, so the two momenta add up instead of nearly cancelling. The ball moving left must go in as $-9.80$.',
      expVn: '$0.907 \\times 23.4 + 2.27 \\times 9.80 = 21.2 + 22.2 = 43.5$. Như vậy là coi cả hai quả bóng đều đi sang phải, nên hai động lượng cộng dồn thay vì gần như triệt tiêu. Quả bóng đi sang trái phải được thay bằng $-9.80$.',
    },
  },

  {
    layout: 'steps',
    accent: INDIGO,
    icon: 'ListChecks',
    eyebrow: 'From your Acellus screen · the method, used on every question from now on',
    eyebrowVn: 'Từ màn hình Acellus của em · phương pháp dùng cho mọi câu từ giờ trở đi',
    title: 'The Method: Five Lines, With Signs',
    titleVn: 'Phương Pháp: Năm Dòng, Kèm Dấu',
    content: '**A baseball has a mass of 0.145 kg. A pitcher\'s fastball travels at 42.0 m/s. Suppose a dog has a mass of 12.0 kg. What speed must the dog be walking in order to have the same momentum as the fastball?**\n\nThe same five lines as last module — with one addition to line 1.',
    contentVn: '**Một quả bóng chày có khối lượng 0.145 kg. Cú ném nhanh bay với tốc độ 42.0 m/s. Giả sử một con chó có khối lượng 12.0 kg. Con chó phải đi với tốc độ bao nhiêu để có cùng động lượng với quả bóng?**\n\nVẫn năm dòng như bài trước — thêm một điều ở dòng 1.',
    steps: [
      {
        text: '**List the pieces, with units AND signs.** Ball: $m_1 = 0.145$ kg, $v_1 = 42.0$ m/s. Dog: $m_2 = 12.0$ kg, $v_2 = ?$',
        textVn: '**Liệt kê các đại lượng, kèm đơn vị VÀ dấu.** Bóng: $m_1 = 0.145$ kg, $v_1 = 42.0$ m/s. Chó: $m_2 = 12.0$ kg, $v_2 = ?$',
      },
      {
        text: '**Write the formula.** "The same momentum" means $p_1 = p_2$: $m_1 v_1 = m_2 v_2$.',
        textVn: '**Viết công thức.** "Cùng động lượng" nghĩa là $p_1 = p_2$: $m_1 v_1 = m_2 v_2$.',
      },
      {
        text: '**Rearrange with letters.** $v_2$ is multiplied by $m_2$ → divide both sides by $m_2$: $v_2 = \\dfrac{m_1 v_1}{m_2}$.',
        textVn: '**Biến đổi bằng chữ.** $v_2$ đang nhân với $m_2$ → chia cả hai vế cho $m_2$: $v_2 = \\dfrac{m_1 v_1}{m_2}$.',
      },
      {
        text: '**Substitute:** $v_2 = \\dfrac{0.145 \\times 42.0}{12.0}$.',
        textVn: '**Thay số:** $v_2 = \\dfrac{0.145 \\times 42.0}{12.0}$.',
      },
      {
        text: '**Answer with a unit:** $v_2 = 0.508$ m/s. A slow walk — the dog is 83 times heavier, so it needs 83 times less speed.',
        textVn: '**Trả lời kèm đơn vị:** $v_2 = 0.508$ m/s. Một bước đi chậm — con chó nặng gấp 83 lần, nên nó cần tốc độ nhỏ hơn 83 lần.',
      },
    ],
    check: {
      id: 'chk_meteor_mass',
      q: 'A 0.635 kg basketball travels at 31.5 m/s. A meteor moves at 4.10 m/s with the same momentum. Which line 3 finds the meteor\'s MASS?',
      qVn: 'Một quả bóng rổ 0.635 kg bay với tốc độ 31.5 m/s. Một thiên thạch chuyển động 4.10 m/s với cùng động lượng. Dòng 3 nào tìm KHỐI LƯỢNG của thiên thạch?',
      options: [
        { val: 'A', text: '$m_2 = \\dfrac{m_1 v_1}{v_2}$', textVn: '$m_2 = \\dfrac{m_1 v_1}{v_2}$' },
        { val: 'B', text: '$m_2 = \\dfrac{v_2}{m_1 v_1}$', textVn: '$m_2 = \\dfrac{v_2}{m_1 v_1}$' },
        { val: 'C', text: '$m_2 = m_1 v_1 v_2$', textVn: '$m_2 = m_1 v_1 v_2$' },
        { val: 'D', text: '$m_2 = m_1 v_1 - v_2$', textVn: '$m_2 = m_1 v_1 - v_2$' },
      ],
      correct: 'A',
      expEn: 'In $m_1 v_1 = m_2 v_2$ the target $m_2$ is multiplied by $v_2$, so divide both sides by $v_2$: $m_2 = \\dfrac{m_1 v_1}{v_2} = \\dfrac{0.635 \\times 31.5}{4.10} = 4.88$ kg. Option B is upside down; C multiplied instead of dividing; D subtracted — but nothing was added.',
      expVn: 'Trong $m_1 v_1 = m_2 v_2$, ẩn $m_2$ đang nhân với $v_2$, nên chia cả hai vế cho $v_2$: $m_2 = \\dfrac{m_1 v_1}{v_2} = \\dfrac{0.635 \\times 31.5}{4.10} = 4.88$ kg. Phương án B bị lộn ngược; C nhân thay vì chia; D trừ — nhưng có gì được cộng đâu.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Hammer',
    eyebrow: 'A force, for a time',
    eyebrowVn: 'Một lực, trong một khoảng thời gian',
    title: 'Impulse',
    titleVn: 'Xung Lượng',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$J = F \\Delta t$',
    textVn: '$J = F \\Delta t$',
    sub: 'A force F pushing for a time Δt gives an impulse J. A bigger push, or a longer one, gives more.',
    subVn: 'Một lực F đẩy trong thời gian Δt tạo ra một xung lượng J. Đẩy mạnh hơn, hoặc lâu hơn, thì xung lượng lớn hơn.',
    notes: [
      {
        tone: 'write',
        text: '$J$ = impulse, in **N·s** (the same as kg·m/s)\n$F$ = average force, in **newtons (N)**\n$\\Delta t$ = contact time — how long the force acts, in **seconds (s)**',
        textVn: '$J$ = xung lượng, đơn vị **N·s** (giống kg·m/s)\n$F$ = lực trung bình, đơn vị **niutơn (N)**\n$\\Delta t$ = thời gian tiếp xúc — lực tác dụng trong bao lâu, đơn vị **giây (s)**',
      },
      {
        tone: 'info',
        text: '$\\Delta$ (delta) means **"change in"**. $\\Delta t$ is a length of time — the 0.0880 s the bat touches the ball — not a moment.',
        textVn: '$\\Delta$ (delta) nghĩa là **"độ thay đổi của"**. $\\Delta t$ là một khoảng thời gian — 0.0880 s cây gậy chạm vào bóng — không phải một thời điểm.',
      },
    ],
    check: {
      id: 'chk_impulse_compare',
      q: 'Which push gives the biggest impulse?',
      qVn: 'Cú đẩy nào tạo ra xung lượng lớn nhất?',
      options: [
        { val: 'A', text: '400 N for 0.10 s', textVn: '400 N trong 0.10 s' },
        { val: 'B', text: '100 N for 0.50 s', textVn: '100 N trong 0.50 s' },
        { val: 'C', text: '20 N for 1.5 s', textVn: '20 N trong 1.5 s' },
        { val: 'D', text: 'They are all the same', textVn: 'Tất cả bằng nhau' },
      ],
      correct: 'B',
      expEn: 'Multiply force by time: A gives $400 \\times 0.10 = 40$ N·s, B gives $100 \\times 0.50 = 50$ N·s, C gives $20 \\times 1.5 = 30$ N·s. The biggest force (A) is not the biggest impulse — time counts just as much.',
      expVn: 'Nhân lực với thời gian: A cho $400 \\times 0.10 = 40$ N·s, B cho $100 \\times 0.50 = 50$ N·s, C cho $20 \\times 1.5 = 30$ N·s. Lực lớn nhất (A) không phải xung lượng lớn nhất — thời gian quan trọng không kém.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Variable',
    eyebrow: 'Derived, not memorised',
    eyebrowVn: 'Suy ra, không học thuộc',
    title: 'Impulse Is the Change in Momentum',
    titleVn: 'Xung Lượng Là Độ Thay Đổi Động Lượng',
    content: 'You already know $F = m a$. Four moves turn it into the impulse equation — and every move is one you have used before.',
    contentVn: 'Em đã biết $F = m a$. Bốn bước biến nó thành phương trình xung lượng — và bước nào em cũng đã dùng rồi.',
    steps: [
      {
        text: '**Start** with Newton\'s second law: $F = m a$.',
        textVn: '**Bắt đầu** với định luật II Newton: $F = m a$.',
      },
      {
        text: 'Acceleration is the change in velocity per second: $a = \\dfrac{v_f - v_i}{\\Delta t}$ — final minus initial, over the time.',
        textVn: 'Gia tốc là độ thay đổi vận tốc mỗi giây: $a = \\dfrac{v_f - v_i}{\\Delta t}$ — cuối trừ đầu, chia cho thời gian.',
      },
      {
        text: '**Substitute** it for $a$: $F = \\dfrac{m (v_f - v_i)}{\\Delta t}$.',
        textVn: '**Thay** nó vào chỗ $a$: $F = \\dfrac{m (v_f - v_i)}{\\Delta t}$.',
      },
      {
        text: '$\\Delta t$ is dividing → **multiply both sides by $\\Delta t$**: $F \\Delta t = m (v_f - v_i)$.',
        textVn: '$\\Delta t$ đang chia → **nhân cả hai vế với $\\Delta t$**: $F \\Delta t = m (v_f - v_i)$.',
      },
      {
        text: '**Read it.** Left: $F \\Delta t$ is the impulse. Right: $m v_f - m v_i$ is the momentum after minus the momentum before. **Impulse = change in momentum.** This is the line to copy onto your formula page.',
        textVn: '**Đọc nó.** Vế trái: $F \\Delta t$ là xung lượng. Vế phải: $m v_f - m v_i$ là động lượng sau trừ động lượng trước. **Xung lượng = độ thay đổi động lượng.** Đây là dòng cần chép vào trang công thức.',
      },
    ],
    check: {
      id: 'chk_impulse_rearrange',
      q: 'Make $F$ the subject of $F \\Delta t = m (v_f - v_i)$.',
      qVn: 'Đưa $F$ về một vế trong $F \\Delta t = m (v_f - v_i)$.',
      options: [
        { val: 'A', text: '$F = m (v_f - v_i)\\,\\Delta t$', textVn: '$F = m (v_f - v_i)\\,\\Delta t$' },
        { val: 'B', text: '$F = \\dfrac{\\Delta t}{m (v_f - v_i)}$', textVn: '$F = \\dfrac{\\Delta t}{m (v_f - v_i)}$' },
        { val: 'C', text: '$F = \\dfrac{m (v_f - v_i)}{\\Delta t}$', textVn: '$F = \\dfrac{m (v_f - v_i)}{\\Delta t}$' },
        { val: 'D', text: '$F = m (v_f - v_i) - \\Delta t$', textVn: '$F = m (v_f - v_i) - \\Delta t$' },
      ],
      correct: 'C',
      expEn: '$F$ is multiplied by $\\Delta t$, so divide both sides by $\\Delta t$. The bracket $(v_f - v_i)$ travels as one piece — never split it. Option A multiplied instead of dividing; B is upside down; D subtracted a multiplier.',
      expVn: '$F$ đang nhân với $\\Delta t$, nên chia cả hai vế cho $\\Delta t$. Ngoặc $(v_f - v_i)$ đi cùng nhau như một khối — đừng bao giờ tách nó. Phương án A nhân thay vì chia; B bị lộn ngược; D trừ đi một thừa số.',
    },
  },

  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Minus',
    eyebrow: 'Decide before you read on',
    eyebrowVn: 'Quyết định trước khi đọc tiếp',
    title: 'The Ball Turns Round: What Is Δv?',
    titleVn: 'Quả Bóng Quay Đầu: Δv Bằng Bao Nhiêu?',
    content: 'A pitched ball arrives at the bat moving LEFT at 41.0 m/s. It leaves moving RIGHT at 37.0 m/s. Right is +, so\n\n$$v_i = -41.0 \\text{ m/s} \\qquad v_f = +37.0 \\text{ m/s}$$\n\nThe change is always **final minus initial**: $\\Delta v = v_f - v_i$.',
    contentVn: 'Một quả bóng ném tới cây gậy khi đang đi sang TRÁI với tốc độ 41.0 m/s. Nó bật ra sang PHẢI với tốc độ 37.0 m/s. Phải là +, nên\n\n$$v_i = -41.0 \\text{ m/s} \\qquad v_f = +37.0 \\text{ m/s}$$\n\nĐộ thay đổi luôn là **cuối trừ đầu**: $\\Delta v = v_f - v_i$.',
    activity: {
      id: 'act_predict_dv',
      type: 'predict',
      prompt: 'What is the change in velocity, $\\Delta v = v_f - v_i$?',
      promptVn: 'Độ thay đổi vận tốc $\\Delta v = v_f - v_i$ bằng bao nhiêu?',
      options: [
        { val: 'minus4', name: '$-4.0$ m/s', nameVn: '$-4.0$ m/s' },
        { val: 'plus4', name: '$+4.0$ m/s', nameVn: '$+4.0$ m/s' },
        { val: 'plus78', name: '$+78.0$ m/s', nameVn: '$+78.0$ m/s' },
        { val: 'minus78', name: '$-78.0$ m/s', nameVn: '$-78.0$ m/s' },
      ],
      correct: 'plus78',
      explain: '$\\Delta v = 37.0 - (-41.0)$. Subtracting a negative is ADDING: $37.0 + 41.0 = 78.0$ m/s. On a number line the ball\'s velocity goes from $-41$ all the way across zero to $+37$ — a change of 78, not 4. The answer $-4.0$ comes from dropping the minus sign of $v_i$: it is the most common mistake in this whole module. Put a negative number in brackets, on paper and on the calculator.',
      explainVn: '$\\Delta v = 37.0 - (-41.0)$. Trừ một số âm là CỘNG: $37.0 + 41.0 = 78.0$ m/s. Trên trục số, vận tốc của quả bóng đi từ $-41$ vượt qua số 0 tới $+37$ — thay đổi 78, không phải 4. Đáp án $-4.0$ là do bỏ mất dấu trừ của $v_i$: đó là lỗi phổ biến nhất của cả bài này. Hãy đặt số âm trong ngoặc, trên giấy và trên máy tính.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Zap',
    eyebrow: 'From your Acellus screen · "Remember to indicate the direction (+ or −)"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Nhớ ghi hướng (+ hoặc −)"',
    title: 'The Force of a Bat',
    titleVn: 'Lực Của Cây Gậy',
    inlineSvg: DIAGRAMS.IMPULSE_BAT,
    content: '**A bat hits a 0.150 kg baseball for 0.0880 s. The ball\'s velocity changes from −41.0 m/s to +37.0 m/s. How much force was applied to the ball?**',
    contentVn: '**Một cây gậy đánh vào quả bóng chày 0.150 kg trong 0.0880 s. Vận tốc của quả bóng thay đổi từ −41.0 m/s thành +37.0 m/s. Lực tác dụng lên quả bóng là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces:** $m = 0.150$ kg, $\\Delta t = 0.0880$ s, $v_i = -41.0$ m/s, $v_f = +37.0$ m/s, $F = ?$',
        textVn: '**Các đại lượng:** $m = 0.150$ kg, $\\Delta t = 0.0880$ s, $v_i = -41.0$ m/s, $v_f = +37.0$ m/s, $F = ?$',
      },
      {
        text: '**Formula:** $F \\Delta t = m (v_f - v_i)$. **Rearrange:** $\\Delta t$ is multiplying $F$ → divide both sides by $\\Delta t$: $F = \\dfrac{m (v_f - v_i)}{\\Delta t}$.',
        textVn: '**Công thức:** $F \\Delta t = m (v_f - v_i)$. **Biến đổi:** $\\Delta t$ đang nhân với $F$ → chia cả hai vế cho $\\Delta t$: $F = \\dfrac{m (v_f - v_i)}{\\Delta t}$.',
      },
      {
        text: '**Substitute, negative in brackets:** $F = \\dfrac{0.150 \\times (37.0 - (-41.0))}{0.0880} = \\dfrac{0.150 \\times 78.0}{0.0880}$.',
        textVn: '**Thay số, số âm trong ngoặc:** $F = \\dfrac{0.150 \\times (37.0 - (-41.0))}{0.0880} = \\dfrac{0.150 \\times 78.0}{0.0880}$.',
      },
      {
        text: '**Answer with a unit and a sign:** $F = +133$ N. Positive: the bat pushes the ball to the right, the way it leaves.',
        textVn: '**Trả lời kèm đơn vị và dấu:** $F = +133$ N. Dương: cây gậy đẩy quả bóng sang phải, theo hướng nó bay đi.',
      },
    ],
    reveal: {
      label: 'What if you drop the minus sign?',
      labelVn: 'Nếu bỏ mất dấu trừ thì sao?',
      prompt: 'Use 41.0 instead of −41.0 for $v_i$. What force comes out?',
      promptVn: 'Dùng 41.0 thay cho −41.0 cho $v_i$. Lực tính ra bằng bao nhiêu?',
      answer: '$37.0 - 41.0 = -4.0$, so $F = \\dfrac{0.150 \\times (-4.0)}{0.0880} = -6.82$ N — about **twenty times too small**, and pointing the **wrong way**. One lost minus sign, two wrong answers in one.',
      answerVn: '$37.0 - 41.0 = -4.0$, nên $F = \\dfrac{0.150 \\times (-4.0)}{0.0880} = -6.82$ N — nhỏ hơn khoảng **hai mươi lần**, và hướng **ngược lại**. Mất một dấu trừ, sai hai thứ cùng lúc.',
    },
    check: {
      id: 'chk_dv_basketball',
      q: 'A basketball\'s velocity changes from −4.23 m/s to +3.85 m/s when it bounces. What is $\\Delta v$?',
      qVn: 'Vận tốc của một quả bóng rổ thay đổi từ −4.23 m/s thành +3.85 m/s khi nảy lên. $\\Delta v$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$-0.38$ m/s', textVn: '$-0.38$ m/s' },
        { val: 'B', text: '$+8.08$ m/s', textVn: '$+8.08$ m/s' },
        { val: 'C', text: '$-8.08$ m/s', textVn: '$-8.08$ m/s' },
        { val: 'D', text: '$+0.38$ m/s', textVn: '$+0.38$ m/s' },
      ],
      correct: 'B',
      expEn: '$\\Delta v = v_f - v_i = 3.85 - (-4.23) = 3.85 + 4.23 = +8.08$ m/s. Options A and D dropped the minus sign of $v_i$; option C did initial minus final — the order is always final minus initial.',
      expVn: '$\\Delta v = v_f - v_i = 3.85 - (-4.23) = 3.85 + 4.23 = +8.08$ m/s. Phương án A và D bỏ mất dấu trừ của $v_i$; phương án C lấy đầu trừ cuối — thứ tự luôn là cuối trừ đầu.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Timer',
    eyebrow: 'From your Acellus screen · same formula, new target',
    eyebrowVn: 'Từ màn hình Acellus của em · cùng công thức, ẩn số mới',
    title: 'How Long Was the Ball on the Floor?',
    titleVn: 'Quả Bóng Chạm Sàn Trong Bao Lâu?',
    content: '**When a 0.622 kg basketball hits the floor, its velocity changes from −4.23 m/s to +3.85 m/s. If the average force was 72.9 N, how much time was it in contact with the floor?**\n\nThe target is $\\Delta t$ this time. Nothing else changes.',
    contentVn: '**Khi một quả bóng rổ 0.622 kg chạm sàn, vận tốc của nó thay đổi từ −4.23 m/s thành +3.85 m/s. Nếu lực trung bình là 72.9 N, quả bóng tiếp xúc với sàn trong bao lâu?**\n\nLần này ẩn số là $\\Delta t$. Ngoài ra không có gì thay đổi.',
    steps: [
      {
        text: '**Pieces:** $m = 0.622$ kg, $v_i = -4.23$ m/s, $v_f = +3.85$ m/s, $F = 72.9$ N, $\\Delta t = ?$',
        textVn: '**Các đại lượng:** $m = 0.622$ kg, $v_i = -4.23$ m/s, $v_f = +3.85$ m/s, $F = 72.9$ N, $\\Delta t = ?$',
      },
      {
        text: '**Formula:** $F \\Delta t = m (v_f - v_i)$. **Rearrange:** $F$ is multiplying $\\Delta t$ → divide both sides by $F$: $\\Delta t = \\dfrac{m (v_f - v_i)}{F}$.',
        textVn: '**Công thức:** $F \\Delta t = m (v_f - v_i)$. **Biến đổi:** $F$ đang nhân với $\\Delta t$ → chia cả hai vế cho $F$: $\\Delta t = \\dfrac{m (v_f - v_i)}{F}$.',
      },
      {
        text: '**Substitute:** $\\Delta t = \\dfrac{0.622 \\times (3.85 - (-4.23))}{72.9} = \\dfrac{0.622 \\times 8.08}{72.9}$.',
        textVn: '**Thay số:** $\\Delta t = \\dfrac{0.622 \\times (3.85 - (-4.23))}{72.9} = \\dfrac{0.622 \\times 8.08}{72.9}$.',
      },
      {
        text: '**Answer:** $\\Delta t = 0.0689$ s — about seven hundredths of a second. A bounce is quick.',
        textVn: '**Đáp án:** $\\Delta t = 0.0689$ s — khoảng bảy phần trăm giây. Một cú nảy rất nhanh.',
      },
    ],
    check: {
      id: 'chk_floor_force',
      q: 'Same basketball, but now it touches the floor for 0.0266 s. How much force did the floor exert on it?',
      qVn: 'Vẫn quả bóng rổ đó, nhưng giờ nó chạm sàn trong 0.0266 s. Sàn tác dụng lên nó một lực bao nhiêu?',
      options: [
        { val: 'A', text: '$5.03$ N', textVn: '$5.03$ N' },
        { val: 'B', text: '$-8.89$ N', textVn: '$-8.89$ N' },
        { val: 'C', text: '$0.134$ N', textVn: '$0.134$ N' },
        { val: 'D', text: '$189$ N', textVn: '$189$ N' },
      ],
      correct: 'D',
      expEn: '$F = \\dfrac{m (v_f - v_i)}{\\Delta t} = \\dfrac{0.622 \\times 8.08}{0.0266} = 189$ N. Option A is the impulse $m \\Delta v$ — the division by $\\Delta t$ was forgotten. B dropped the minus sign of $v_i$. C multiplied by $\\Delta t$ instead of dividing.',
      expVn: '$F = \\dfrac{m (v_f - v_i)}{\\Delta t} = \\dfrac{0.622 \\times 8.08}{0.0266} = 189$ N. Phương án A là xung lượng $m \\Delta v$ — quên chia cho $\\Delta t$. B bỏ mất dấu trừ của $v_i$. C nhân với $\\Delta t$ thay vì chia.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Scale',
    ratio: 40,
    eyebrow: 'Why the total never changes',
    eyebrowVn: 'Vì sao tổng không bao giờ thay đổi',
    title: 'In a Collision, Momentum Is Shared — Not Lost',
    titleVn: 'Trong Va Chạm, Động Lượng Được Chia Sẻ — Không Mất Đi',
    inlineSvg: DIAGRAMS.COLLISION_BEFORE_AFTER,
    content: 'During the crash, cart 1 pushes cart 2 and cart 2 pushes cart 1 back — **equal and opposite forces** (Newton\'s third law), for exactly the **same time**. So their impulses are equal and opposite too.\n\nWhatever momentum one cart gains, the other loses. The **total** does not change.',
    contentVn: 'Trong lúc va chạm, xe 1 đẩy xe 2 và xe 2 đẩy ngược lại xe 1 — **hai lực bằng nhau và ngược chiều** (định luật III Newton), trong **cùng một khoảng thời gian**. Nên xung lượng của chúng cũng bằng nhau và ngược chiều.\n\nXe này nhận thêm bao nhiêu động lượng thì xe kia mất đi bấy nhiêu. **Tổng** không thay đổi.',
    notes: [
      {
        tone: 'write',
        text: '**Conservation of momentum:** total momentum BEFORE = total momentum AFTER. True in every collision, as long as nothing outside is pushing.',
        textVn: '**Bảo toàn động lượng:** tổng động lượng TRƯỚC = tổng động lượng SAU. Đúng với mọi va chạm, miễn là không có gì bên ngoài đẩy vào.',
      },
    ],
    check: {
      id: 'chk_total_before',
      q: 'Before a collision, Block A has +15.0 kg·m/s and Block B has −35.0 kg·m/s. What is the total momentum AFTER the collision?',
      qVn: 'Trước va chạm, khối A có +15.0 kg·m/s và khối B có −35.0 kg·m/s. Tổng động lượng SAU va chạm là bao nhiêu?',
      options: [
        { val: 'A', text: '$+50.0$ kg·m/s', textVn: '$+50.0$ kg·m/s' },
        { val: 'B', text: '$-20.0$ kg·m/s', textVn: '$-20.0$ kg·m/s' },
        { val: 'C', text: '$0$ — it is used up in the crash', textVn: '$0$ — nó bị tiêu hao khi va chạm' },
        { val: 'D', text: 'Impossible to know without the masses', textVn: 'Không thể biết nếu không có khối lượng' },
      ],
      correct: 'B',
      expEn: 'The total after equals the total before: $15.0 + (-35.0) = -20.0$ kg·m/s. You do not need the masses — you already have the momenta. Option A ignored B\'s minus sign. Momentum is never "used up" (C): it is only passed from one object to the other.',
      expVn: 'Tổng sau bằng tổng trước: $15.0 + (-35.0) = -20.0$ kg·m/s. Không cần khối lượng — em đã có sẵn động lượng. Phương án A bỏ qua dấu trừ của B. Động lượng không bao giờ bị "tiêu hao" (C): nó chỉ được chuyển từ vật này sang vật kia.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Star',
    eyebrow: 'The one collision equation — every other one comes from this',
    eyebrowVn: 'Phương trình va chạm duy nhất — mọi phương trình khác đều từ đây',
    title: 'Conservation of Momentum',
    titleVn: 'Bảo Toàn Động Lượng',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$',
    textVn: '$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$',
    sub: 'Total momentum before the collision = total momentum after it.',
    subVn: 'Tổng động lượng trước va chạm = tổng động lượng sau va chạm.',
    notes: [
      {
        tone: 'write',
        text: 'Subscript **1** or **2** = which object.\nSubscript **i** = initial, BEFORE the collision. Subscript **f** = final, AFTER.\nSo $m_1 v_{1i}$ is the momentum of object 1 before, and $m_2 v_{2f}$ is the momentum of object 2 after.',
        textVn: 'Chỉ số **1** hoặc **2** = vật nào.\nChỉ số **i** = ban đầu, TRƯỚC va chạm. Chỉ số **f** = cuối, SAU va chạm.\nVậy $m_1 v_{1i}$ là động lượng của vật 1 trước, và $m_2 v_{2f}$ là động lượng của vật 2 sau.',
      },
      {
        tone: 'homework',
        text: 'This is the ONLY collision equation to remember. The rest of this lesson is this equation with the story put into it.',
        textVn: 'Đây là phương trình va chạm DUY NHẤT cần nhớ. Phần còn lại của bài chỉ là phương trình này với đề bài được đưa vào.',
      },
    ],
    check: {
      id: 'chk_which_letter',
      q: '"Car 1 collides with car 2. Afterwards, car 1 moves east at 0.888 m/s." Which letter is 0.888 m/s?',
      qVn: '"Xe 1 va chạm với xe 2. Sau đó, xe 1 chạy về hướng đông với tốc độ 0.888 m/s." Chữ nào bằng 0.888 m/s?',
      options: [
        { val: 'A', text: '$v_{1i}$', textVn: '$v_{1i}$' },
        { val: 'B', text: '$v_{2f}$', textVn: '$v_{2f}$' },
        { val: 'C', text: '$v_{1f}$', textVn: '$v_{1f}$' },
        { val: 'D', text: '$m_1$', textVn: '$m_1$' },
      ],
      correct: 'C',
      expEn: 'It is car **1**, and "afterwards" means AFTER the collision — final, $f$. So it is $v_{1f}$. Option A is car 1 before; option B is car 2 after. Reading the subscripts is half of every collision question.',
      expVn: 'Đó là xe **1**, và "sau đó" nghĩa là SAU va chạm — cuối, $f$. Vậy đó là $v_{1f}$. Phương án A là xe 1 trước; phương án B là xe 2 sau. Đọc đúng chỉ số là một nửa của mọi câu hỏi va chạm.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Boxes',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Block A and Block B',
    titleVn: 'Khối A và Khối B',
    content: '**Before colliding, the momentum of Block A is +15.0 kg·m/s, and Block B is −35.0 kg·m/s. After, Block A has a momentum −12.0 kg·m/s. What is the momentum of Block B after the collision?**\n\nThe momenta are given, so write the equation with $p$ for each $m v$.',
    contentVn: '**Trước va chạm, động lượng của khối A là +15.0 kg·m/s, và của khối B là −35.0 kg·m/s. Sau đó, khối A có động lượng −12.0 kg·m/s. Động lượng của khối B sau va chạm là bao nhiêu?**\n\nĐề cho sẵn động lượng, nên viết phương trình với $p$ thay cho mỗi $m v$.',
    steps: [
      {
        text: '**Pieces:** $p_{1i} = +15.0$, $p_{2i} = -35.0$, $p_{1f} = -12.0$ (all kg·m/s), $p_{2f} = ?$',
        textVn: '**Các đại lượng:** $p_{1i} = +15.0$, $p_{2i} = -35.0$, $p_{1f} = -12.0$ (đều là kg·m/s), $p_{2f} = ?$',
      },
      {
        text: '**Formula:** $p_{1i} + p_{2i} = p_{1f} + p_{2f}$.',
        textVn: '**Công thức:** $p_{1i} + p_{2i} = p_{1f} + p_{2f}$.',
      },
      {
        text: '**Rearrange:** $p_{1f}$ is ADDED to the target → subtract it from both sides: $p_{2f} = p_{1i} + p_{2i} - p_{1f}$.',
        textVn: '**Biến đổi:** $p_{1f}$ đang được CỘNG vào ẩn số → trừ nó ở cả hai vế: $p_{2f} = p_{1i} + p_{2i} - p_{1f}$.',
      },
      {
        text: '**Substitute, every negative in brackets:** $p_{2f} = 15.0 + (-35.0) - (-12.0) = 15.0 - 35.0 + 12.0$.',
        textVn: '**Thay số, mọi số âm trong ngoặc:** $p_{2f} = 15.0 + (-35.0) - (-12.0) = 15.0 - 35.0 + 12.0$.',
      },
      {
        text: '**Answer:** $p_{2f} = -8.00$ kg·m/s. Check: before, $15.0 - 35.0 = -20.0$; after, $-12.0 + (-8.00) = -20.0$. Same total.',
        textVn: '**Đáp án:** $p_{2f} = -8.00$ kg·m/s. Kiểm tra: trước, $15.0 - 35.0 = -20.0$; sau, $-12.0 + (-8.00) = -20.0$. Cùng tổng.',
      },
    ],
    check: {
      id: 'chk_minus_minus',
      q: 'A student writes $15.0 - 35.0 - 12.0 = -32.0$. Where is the mistake?',
      qVn: 'Một học sinh viết $15.0 - 35.0 - 12.0 = -32.0$. Lỗi ở đâu?',
      options: [
        { val: 'A', text: 'Subtracting $-12.0$ should ADD 12.0', textVn: 'Trừ $-12.0$ phải là CỘNG 12.0' },
        { val: 'B', text: '$-35.0$ should be $+35.0$', textVn: '$-35.0$ phải là $+35.0$' },
        { val: 'C', text: 'The 15.0 should be subtracted', textVn: 'Phải trừ 15.0' },
        { val: 'D', text: 'There is no mistake', textVn: 'Không có lỗi nào' },
      ],
      correct: 'A',
      expEn: 'The formula says $- p_{1f}$ and $p_{1f} = -12.0$, so it is $-(-12.0) = +12.0$. Writing the bracket, $-(-12.0)$, is what stops the second minus from vanishing. The $-35.0$ is right: Block B really was moving the negative way.',
      expVn: 'Công thức ghi $- p_{1f}$ và $p_{1f} = -12.0$, nên đó là $-(-12.0) = +12.0$. Viết ngoặc, $-(-12.0)$, là điều giữ cho dấu trừ thứ hai không biến mất. $-35.0$ là đúng: khối B thật sự đang đi theo hướng âm.',
    },
  },

  {
    layout: 'showcase',
    accent: INDIGO,
    icon: 'GitMerge',
    eyebrow: 'The big idea of this lesson',
    eyebrowVn: 'Ý tưởng lớn của bài này',
    title: 'One Equation, Three Stories',
    titleVn: 'Một Phương Trình, Ba Câu Chuyện',
    inlineSvg: DIAGRAMS.ONE_EQUATION,
    caption: 'Acellus calls them collisions, inelastic collisions and recoil, but it is ONE equation, and three phrases in the question change it: **"at rest"** → that velocity is 0 and its term vanishes · **"stick together"** → the two final velocities are one $v_f$ · **"recoil" from rest** → the whole left side is 0.',
    captionVn: 'Acellus gọi chúng là va chạm, va chạm mềm và giật lùi, nhưng đó là MỘT phương trình, và ba cụm từ trong đề bài thay đổi nó: **"đứng yên"** → vận tốc đó bằng 0 và số hạng của nó biến mất · **"dính vào nhau"** → hai vận tốc sau là một $v_f$ · **"giật lùi" từ trạng thái đứng yên** → cả vế trái bằng 0.',
    activity: {
      type: 'sort',
      id: 'act_story_sort',
      prompt: 'Sort each line from an Acellus question: which story is it?',
      promptVn: 'Phân loại từng câu trong đề Acellus: đó là câu chuyện nào?',
      explain: '"At rest", "stationary" and "sitting" zero ONE velocity before. "Stick together", "leaps into the hands of" and "move off together" make the two final velocities one. A rifle firing or skaters pushing off from standing start with EVERYTHING at rest — that is recoil.',
      explainVn: '"Đứng yên", "không chuyển động" và "đang đậu" làm MỘT vận tốc trước bằng 0. "Dính vào nhau", "nhảy vào vòng tay" và "cùng chuyển động" làm hai vận tốc sau thành một. Súng bắn hay hai người trượt băng đẩy nhau ra từ tư thế đứng yên thì MỌI THỨ bắt đầu đứng yên — đó là giật lùi.',
      bins: [
        { id: 'rest', name: 'One starts at rest', nameVn: 'Một vật đứng yên' },
        { id: 'stick', name: 'They stick together', nameVn: 'Chúng dính vào nhau' },
        { id: 'recoil', name: 'Recoil: all at rest', nameVn: 'Giật lùi: tất cả đứng yên' },
      ],
      cards: [
        { id: 'k1', name: 'Car 2 (208 kg) is at rest.', nameVn: 'Xe 2 (208 kg) đang đứng yên.', bin: 'rest' },
        { id: 'k2', name: 'The two meteors stick together.', nameVn: 'Hai thiên thạch dính vào nhau.', bin: 'stick' },
        { id: 'k3', name: 'A 4.50 kg rifle fires a bullet.', nameVn: 'Một khẩu súng 4.50 kg bắn một viên đạn.', bin: 'recoil' },
        { id: 'k4', name: 'A truck (5380 kg) is sitting at rest.', nameVn: 'Một xe tải (5380 kg) đang đậu yên.', bin: 'rest' },
        { id: 'k5', name: 'Anna leaps into the hands of Paul.', nameVn: 'Anna nhảy vào vòng tay của Paul.', bin: 'stick' },
        { id: 'k6', name: 'Two skaters standing still push off each other.', nameVn: 'Hai người trượt băng đang đứng yên đẩy nhau ra.', bin: 'recoil' },
        { id: 'k7', name: 'The snowball and the box move off together.', nameVn: 'Quả cầu tuyết và cái hộp cùng chuyển động.', bin: 'stick' },
      ],
    },
  },

  {
    layout: 'stack',
    accent: BLUE,
    icon: 'CircleSlash',
    columns: 1,
    eyebrow: 'Story 1 · derived in one move',
    eyebrowVn: 'Câu chuyện 1 · suy ra chỉ bằng một bước',
    title: 'One Object Starts at Rest',
    titleVn: 'Một Vật Ban Đầu Đứng Yên',
    content: 'Start from the one equation:\n\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$\n\n"Car 2 is at rest" means $v_{2i} = 0$. Then $m_2 v_{2i} = m_2 \\times 0 = 0$ — car 2 brings **no momentum** into the crash, so its term simply vanishes:\n\n$$m_1 v_{1i} + \\cancel{m_2 v_{2i}} = m_1 v_{1f} + m_2 v_{2f}$$',
    contentVn: 'Bắt đầu từ phương trình duy nhất:\n\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$\n\n"Xe 2 đứng yên" nghĩa là $v_{2i} = 0$. Khi đó $m_2 v_{2i} = m_2 \\times 0 = 0$ — xe 2 **không mang động lượng nào** vào vụ va chạm, nên số hạng của nó biến mất:\n\n$$m_1 v_{1i} + \\cancel{m_2 v_{2i}} = m_1 v_{1f} + m_2 v_{2f}$$',
    notes: [
      {
        tone: 'write',
        text: '**One starts at rest** ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$',
        textVn: '**Một vật đứng yên** ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$',
      },
      {
        tone: 'info',
        text: 'Only a VELOCITY can be 0 here. The mass $m_2$ does not disappear from the problem — car 2 still has 208 kg, and it is still in the "after" side.',
        textVn: 'Ở đây chỉ VẬN TỐC mới có thể bằng 0. Khối lượng $m_2$ không biến mất khỏi bài toán — xe 2 vẫn nặng 208 kg, và nó vẫn còn ở vế "sau".',
      },
    ],
    check: {
      id: 'chk_rest_term',
      q: 'A truck is sitting at rest when a car hits it. Which term of the one equation vanishes? (Car = 1, truck = 2.)',
      qVn: 'Một xe tải đang đứng yên thì bị một xe con đâm vào. Số hạng nào của phương trình biến mất? (Xe con = 1, xe tải = 2.)',
      options: [
        { val: 'A', text: '$m_2 v_{2f}$', textVn: '$m_2 v_{2f}$' },
        { val: 'B', text: '$m_1 v_{1i}$', textVn: '$m_1 v_{1i}$' },
        { val: 'C', text: '$m_1 v_{1f}$', textVn: '$m_1 v_{1f}$' },
        { val: 'D', text: '$m_2 v_{2i}$', textVn: '$m_2 v_{2i}$' },
      ],
      correct: 'D',
      expEn: 'The truck is object 2, and "sitting at rest" is BEFORE the crash: $v_{2i} = 0$, so $m_2 v_{2i}$ vanishes. Option A would say the truck is still stopped AFTER being hit — but the truck moves off at 2.30 m/s.',
      expVn: 'Xe tải là vật 2, và "đang đứng yên" là TRƯỚC va chạm: $v_{2i} = 0$, nên $m_2 v_{2i}$ biến mất. Phương án A nghĩa là xe tải vẫn đứng yên SAU khi bị đâm — nhưng xe tải chạy đi với tốc độ 2.30 m/s.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'MoveHorizontal',
    eyebrow: 'From your Acellus screen · "Remember to indicate east (+) or west (−)"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Nhớ ghi đông (+) hay tây (−)"',
    title: 'Car 1 Hits Car 2',
    titleVn: 'Xe 1 Đâm Vào Xe 2',
    content: '**Car 1 (331 kg) is moving east at 3.87 m/s. Car 2 (208 kg) is at rest. Car 1 collides with car 2. Afterwards, car 1 moves east at 0.888 m/s. What is the final velocity of car 2?**',
    contentVn: '**Xe 1 (331 kg) đang chạy về hướng đông với tốc độ 3.87 m/s. Xe 2 (208 kg) đang đứng yên. Xe 1 va chạm với xe 2. Sau đó, xe 1 chạy về hướng đông với tốc độ 0.888 m/s. Vận tốc sau va chạm của xe 2 là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces:** $m_1 = 331$ kg, $v_{1i} = +3.87$ m/s, $m_2 = 208$ kg, $v_{2i} = 0$ (at rest), $v_{1f} = +0.888$ m/s, $v_{2f} = ?$',
        textVn: '**Các đại lượng:** $m_1 = 331$ kg, $v_{1i} = +3.87$ m/s, $m_2 = 208$ kg, $v_{2i} = 0$ (đứng yên), $v_{1f} = +0.888$ m/s, $v_{2f} = ?$',
      },
      {
        text: '**Formula, set up for the story:** car 2 at rest, so $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$.',
        textVn: '**Công thức, thiết lập theo đề:** xe 2 đứng yên, nên $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$.',
      },
      {
        text: '**Rearrange:** $m_1 v_{1f}$ is ADDED to the target\'s term → subtract it from both sides: $m_1 v_{1i} - m_1 v_{1f} = m_2 v_{2f}$. Then $m_2$ is multiplying → divide by $m_2$: $v_{2f} = \\dfrac{m_1 v_{1i} - m_1 v_{1f}}{m_2}$.',
        textVn: '**Biến đổi:** $m_1 v_{1f}$ đang được CỘNG vào số hạng chứa ẩn → trừ nó ở cả hai vế: $m_1 v_{1i} - m_1 v_{1f} = m_2 v_{2f}$. Rồi $m_2$ đang nhân → chia cho $m_2$: $v_{2f} = \\dfrac{m_1 v_{1i} - m_1 v_{1f}}{m_2}$.',
      },
      {
        text: '**Substitute:** $v_{2f} = \\dfrac{331 \\times 3.87 - 331 \\times 0.888}{208}$.',
        textVn: '**Thay số:** $v_{2f} = \\dfrac{331 \\times 3.87 - 331 \\times 0.888}{208}$.',
      },
      {
        text: '**Answer:** $v_{2f} = +4.75$ m/s — positive, so car 2 moves EAST, the way it was pushed.',
        textVn: '**Đáp án:** $v_{2f} = +4.75$ m/s — dương, nên xe 2 chạy về hướng ĐÔNG, theo hướng nó bị đẩy.',
      },
    ],
    reveal: {
      label: 'A car that comes out negative',
      labelVn: 'Một chiếc xe có đáp án âm',
      prompt: 'A car (1250 kg) at 7.39 m/s hits a truck (5380 kg) sitting at rest. Afterwards the truck moves forward at 2.30 m/s. The same method gives the car\'s final velocity as $-2.51$ m/s. What happened?',
      promptVn: 'Một xe con (1250 kg) chạy 7.39 m/s đâm vào một xe tải (5380 kg) đang đứng yên. Sau đó xe tải chạy về phía trước với tốc độ 2.30 m/s. Cùng phương pháp đó cho vận tốc sau của xe con là $-2.51$ m/s. Chuyện gì đã xảy ra?',
      answer: '$v_{1f} = \\dfrac{m_1 v_{1i} - m_2 v_{2f}}{m_1} = \\dfrac{1250 \\times 7.39 - 5380 \\times 2.30}{1250} = -2.51$ m/s. The minus sign is not a mistake — it is the physics. The truck is over four times heavier, so the car **bounced backwards** at 2.51 m/s. Type the minus sign: $+2.51$ would say it kept going forward.',
      answerVn: '$v_{1f} = \\dfrac{m_1 v_{1i} - m_2 v_{2f}}{m_1} = \\dfrac{1250 \\times 7.39 - 5380 \\times 2.30}{1250} = -2.51$ m/s. Dấu trừ không phải lỗi — đó là vật lý. Xe tải nặng hơn bốn lần, nên xe con **bật ngược lại** với tốc độ 2.51 m/s. Hãy gõ dấu trừ: $+2.51$ nghĩa là nó vẫn tiếp tục chạy về phía trước.',
    },
    check: {
      id: 'chk_rearrange_car',
      q: 'In $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$, what is the FIRST move to get $v_{2f}$ alone?',
      qVn: 'Trong $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$, bước ĐẦU TIÊN để $v_{2f}$ đứng một mình là gì?',
      options: [
        { val: 'A', text: 'Divide both sides by $m_2$', textVn: 'Chia cả hai vế cho $m_2$' },
        { val: 'B', text: 'Subtract $m_1 v_{1f}$ from both sides', textVn: 'Trừ $m_1 v_{1f}$ ở cả hai vế' },
        { val: 'C', text: 'Divide both sides by $m_1$', textVn: 'Chia cả hai vế cho $m_1$' },
        { val: 'D', text: 'Substitute the numbers', textVn: 'Thay số' },
      ],
      correct: 'B',
      expEn: 'Something is ADDED to the target\'s term, so take it away first — only then is $m_2 v_{2f}$ alone and ready to be divided by $m_2$. Dividing by $m_2$ first (A) is legal but leaves a messy $\\dfrac{m_1 v_{1f}}{m_2}$ term behind. $m_1$ (C) is not even touching $v_{2f}$.',
      expVn: 'Có thứ đang được CỘNG vào số hạng chứa ẩn, nên bỏ nó đi trước — chỉ khi đó $m_2 v_{2f}$ mới đứng một mình và sẵn sàng để chia cho $m_2$. Chia cho $m_2$ trước (A) vẫn hợp lệ nhưng để lại số hạng $\\dfrac{m_1 v_{1f}}{m_2}$ rất rối. $m_1$ (C) thậm chí không dính gì tới $v_{2f}$.',
    },
  },

  {
    layout: 'stack',
    accent: GREEN,
    icon: 'GitMerge',
    columns: 1,
    eyebrow: 'Story 2 · the inelastic collision, derived',
    eyebrowVn: 'Câu chuyện 2 · va chạm mềm, được suy ra',
    title: 'They Stick Together',
    titleVn: 'Chúng Dính Vào Nhau',
    content: 'Start from the one equation again. If the two objects **stick together**, they leave as one lump — so after the collision they have the **same** velocity. Call it $v_f$:\n\n$$v_{1f} = v_{2f} = v_f$$\n\nPut that in:\n\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$$\n\nNow $v_f$ is in **both** terms on the right. Take it out as a common factor:\n\n$$m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$$',
    contentVn: 'Lại bắt đầu từ phương trình duy nhất. Nếu hai vật **dính vào nhau**, chúng rời đi như một khối — nên sau va chạm chúng có **cùng** vận tốc. Gọi nó là $v_f$:\n\n$$v_{1f} = v_{2f} = v_f$$\n\nThay vào:\n\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$$\n\nGiờ $v_f$ nằm trong **cả hai** số hạng ở vế phải. Đặt nó ra làm nhân tử chung:\n\n$$m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$$',
    notes: [
      {
        tone: 'write',
        text: '**Stick together** (perfectly inelastic, $v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$',
        textVn: '**Dính vào nhau** (va chạm mềm hoàn toàn, $v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$',
      },
      {
        tone: 'info',
        text: 'Read the right side as a sentence: the combined mass $(m_1 + m_2)$, moving at one velocity $v_f$. Stuck together, two objects really ARE one object.',
        textVn: 'Đọc vế phải như một câu: khối lượng gộp $(m_1 + m_2)$, chuyển động với một vận tốc $v_f$. Khi dính vào nhau, hai vật thực sự LÀ một vật.',
      },
    ],
    check: {
      id: 'chk_stick_meaning',
      q: 'Why does the stick-together equation have $(m_1 + m_2)$ in it?',
      qVn: 'Vì sao phương trình dính vào nhau có $(m_1 + m_2)$?',
      options: [
        { val: 'A', text: 'Because the masses change in the crash', textVn: 'Vì khối lượng thay đổi khi va chạm' },
        { val: 'B', text: 'Because stuck together they move as ONE object with the combined mass', textVn: 'Vì khi dính vào nhau chúng chuyển động như MỘT vật với khối lượng gộp' },
        { val: 'C', text: 'Because momentum is not conserved when things stick', textVn: 'Vì động lượng không được bảo toàn khi các vật dính nhau' },
        { val: 'D', text: 'It is a separate formula you have to memorise', textVn: 'Đó là một công thức riêng phải học thuộc' },
      ],
      correct: 'B',
      expEn: 'After sticking, both have the same $v_f$, so $m_1 v_f + m_2 v_f$ factors into $(m_1 + m_2)\\,v_f$: the combined mass times the one velocity. Nothing was memorised (D) — it came straight out of the one equation. Momentum IS still conserved (C); that is where the equation came from.',
      expVn: 'Sau khi dính, cả hai có cùng $v_f$, nên $m_1 v_f + m_2 v_f$ được đặt nhân tử chung thành $(m_1 + m_2)\\,v_f$: khối lượng gộp nhân với một vận tốc. Không cần học thuộc gì (D) — nó được suy ra thẳng từ phương trình duy nhất. Động lượng VẪN được bảo toàn (C); đó chính là nơi phương trình này xuất phát.',
    },
  },

  {
    layout: 'stack',
    accent: GREEN,
    icon: 'Brackets',
    columns: 2,
    eyebrow: 'The one new algebra move in this module',
    eyebrowVn: 'Phép biến đổi đại số mới duy nhất của bài này',
    title: 'Factoring: Take the Common Letter Out',
    titleVn: 'Đặt Nhân Tử Chung: Đưa Chữ Chung Ra Ngoài',
    content: 'Factoring is **expanding backwards**. Expand $(m_1 + m_2)\\,v_f$ and you get $m_1 v_f + m_2 v_f$ — so the two are always equal, and swapping one for the other changes nothing.\n\nWhy bother? In $m_1 v_f + m_2 v_f$ the target $v_f$ appears **twice**, and no single move frees it. Factored, it appears **once**, multiplied by a bracket — and a multiplier is undone by dividing.',
    contentVn: 'Đặt nhân tử chung là **nhân phá ngoặc theo chiều ngược lại**. Nhân phá $(m_1 + m_2)\\,v_f$ thì được $m_1 v_f + m_2 v_f$ — nên hai biểu thức luôn bằng nhau, và đổi cái này thành cái kia không thay đổi gì.\n\nĐể làm gì? Trong $m_1 v_f + m_2 v_f$, ẩn $v_f$ xuất hiện **hai lần**, và không một bước nào giải phóng được nó. Khi đặt nhân tử chung, nó chỉ xuất hiện **một lần**, nhân với một ngoặc — và phép nhân được hoàn tác bằng phép chia.',
    notes: [
      {
        tone: 'write',
        text: '**Factor:** $m_1 v_f + m_2 v_f = (m_1 + m_2)\\,v_f$ — check it by expanding the bracket.',
        textVn: '**Đặt nhân tử chung:** $m_1 v_f + m_2 v_f = (m_1 + m_2)\\,v_f$ — kiểm tra bằng cách nhân phá ngoặc.',
      },
      {
        tone: 'write',
        text: 'Then divide by the **WHOLE** bracket: $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$',
        textVn: 'Rồi chia cho **CẢ** ngoặc: $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$',
      },
      {
        tone: 'homework',
        text: 'Dividing by $m_1$ alone does NOT work: $m_1$ only touches one of the two terms. Whatever you divide by must multiply EVERYTHING on that side.',
        textVn: 'Chỉ chia cho $m_1$ là KHÔNG được: $m_1$ chỉ dính vào một trong hai số hạng. Thứ em chia phải nhân với TẤT CẢ ở vế đó.',
      },
      {
        tone: 'plant',
        text: 'Factor when the **unknown** is the letter in both terms. If the unknown is a mass, it sits in one term only, and there is nothing to factor for — slide 21.',
        textVn: 'Đặt nhân tử chung khi **ẩn số** là chữ nằm trong cả hai số hạng. Nếu ẩn là một khối lượng, nó chỉ nằm trong một số hạng, và không cần đặt nhân tử chung — trang 21.',
      },
    ],
    activity: {
      type: 'order',
      id: 'act_stick_order',
      prompt: 'Two objects stick together. Put the moves in order to find $v_f$, starting from the one equation.',
      promptVn: 'Hai vật dính vào nhau. Sắp xếp các bước theo thứ tự để tìm $v_f$, bắt đầu từ phương trình duy nhất.',
      explain: 'The story goes in first (both final velocities become $v_f$), then the factoring (so $v_f$ appears once), then the divide by the WHOLE bracket. The numbers come last, as always — letters first.',
      explainVn: 'Đề bài được đưa vào trước (cả hai vận tốc sau thành $v_f$), rồi đặt nhân tử chung (để $v_f$ chỉ xuất hiện một lần), rồi chia cho CẢ ngoặc. Các con số luôn đến cuối cùng — chữ trước.',
      steps: [
        { id: 's1', name: 'Replace $v_{1f}$ and $v_{2f}$ with one $v_f$', nameVn: 'Thay $v_{1f}$ và $v_{2f}$ bằng một $v_f$' },
        { id: 's2', name: 'Factor $v_f$ out of the right side', nameVn: 'Đặt $v_f$ làm nhân tử chung ở vế phải' },
        { id: 's3', name: 'Divide both sides by $(m_1 + m_2)$', nameVn: 'Chia cả hai vế cho $(m_1 + m_2)$' },
        { id: 's4', name: 'Substitute the numbers', nameVn: 'Thay số' },
      ],
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Rocket',
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Two Meteors Stick Together',
    titleVn: 'Hai Thiên Thạch Dính Vào Nhau',
    inlineSvg: DIAGRAMS.STICK_TOGETHER,
    content: '**An incoming meteor with mass 65.4 kg and velocity +12.46 km/s overtakes another meteor with mass 32.1 kg and velocity +8.56 km/s. The two meteors stick together. What is their velocity?**',
    contentVn: '**Một thiên thạch khối lượng 65.4 kg với vận tốc +12.46 km/s đuổi kịp một thiên thạch khác khối lượng 32.1 kg với vận tốc +8.56 km/s. Hai thiên thạch dính vào nhau. Vận tốc của chúng là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces, converted:** $m_1 = 65.4$ kg, $v_{1i} = 12.46$ km/s $= 12{,}460$ m/s, $m_2 = 32.1$ kg, $v_{2i} = 8.56$ km/s $= 8560$ m/s, $v_f = ?$',
        textVn: '**Các đại lượng, đã đổi đơn vị:** $m_1 = 65.4$ kg, $v_{1i} = 12.46$ km/s $= 12{,}460$ m/s, $m_2 = 32.1$ kg, $v_{2i} = 8.56$ km/s $= 8560$ m/s, $v_f = ?$',
      },
      {
        text: '**Formula, set up:** stick together → $m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$.',
        textVn: '**Công thức, đã thiết lập:** dính vào nhau → $m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$.',
      },
      {
        text: '**Rearrange:** factor → $(m_1 + m_2)\\,v_f$; divide by the whole bracket → $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$.',
        textVn: '**Biến đổi:** đặt nhân tử chung → $(m_1 + m_2)\\,v_f$; chia cho cả ngoặc → $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$.',
      },
      {
        text: '**Substitute:** $v_f = \\dfrac{65.4 \\times 12460 + 32.1 \\times 8560}{65.4 + 32.1} = \\dfrac{1{,}089{,}660}{97.5}$.',
        textVn: '**Thay số:** $v_f = \\dfrac{65.4 \\times 12460 + 32.1 \\times 8560}{65.4 + 32.1} = \\dfrac{1{,}089{,}660}{97.5}$.',
      },
      {
        text: '**Answer:** $v_f = 11{,}200$ m/s $= 11.2$ km/s. Between the two starting speeds, and nearer the heavier meteor\'s — a good sense check.',
        textVn: '**Đáp án:** $v_f = 11{,}200$ m/s $= 11.2$ km/s. Nằm giữa hai tốc độ ban đầu, và gần tốc độ của thiên thạch nặng hơn — một cách kiểm tra hợp lý.',
      },
    ],
    reveal: {
      label: 'Could you have stayed in km/s?',
      labelVn: 'Có thể giữ nguyên km/s không?',
      prompt: 'Put 12.46 and 8.56 straight in. What comes out?',
      promptVn: 'Đưa thẳng 12.46 và 8.56 vào. Kết quả là gì?',
      answer: '$11.2$ — in km/s, the right answer. It works HERE because every term has exactly one velocity in it, so km/s in gives km/s out. It breaks the moment a formula has $v^2$ in it, or a force in newtons. Converting is never wrong; skipping it sometimes is — so the Isolate It task always converts.',
      answerVn: '$11.2$ — theo km/s, đáp án đúng. Nó đúng Ở ĐÂY vì mỗi số hạng có đúng một vận tốc, nên km/s vào thì km/s ra. Nó sai ngay khi công thức có $v^2$, hoặc có lực tính bằng niutơn. Đổi đơn vị không bao giờ sai; bỏ qua thì có lúc sai — nên bài Cô Lập Biến luôn đổi đơn vị.',
    },
    check: {
      id: 'chk_stick_numbers',
      q: 'A 3.0 kg cart moving at +4.0 m/s hits a 1.0 kg cart at rest, and they stick together. What is $v_f$?',
      qVn: 'Một xe đẩy 3.0 kg chuyển động +4.0 m/s va vào một xe đẩy 1.0 kg đang đứng yên, và chúng dính vào nhau. $v_f$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$+4.0$ m/s', textVn: '$+4.0$ m/s' },
        { val: 'B', text: '$+2.0$ m/s', textVn: '$+2.0$ m/s' },
        { val: 'C', text: '$+12$ m/s', textVn: '$+12$ m/s' },
        { val: 'D', text: '$+3.0$ m/s', textVn: '$+3.0$ m/s' },
      ],
      correct: 'D',
      expEn: '$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} = \\dfrac{3.0 \\times 4.0 + 1.0 \\times 0}{3.0 + 1.0} = \\dfrac{12}{4.0} = 3.0$ m/s. Option C forgot to divide by the bracket; B averaged the two velocities; A says nothing slowed down — but now 4.0 kg is carrying the momentum that 3.0 kg had.',
      expVn: '$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} = \\dfrac{3.0 \\times 4.0 + 1.0 \\times 0}{3.0 + 1.0} = \\dfrac{12}{4.0} = 3.0$ m/s. Phương án C quên chia cho ngoặc; B lấy trung bình hai vận tốc; A nghĩa là không có gì chậm lại — nhưng giờ 4.0 kg phải mang lượng động lượng mà trước đó 3.0 kg mang.',
    },
  },

  {
    layout: 'steps',
    accent: AMBER,
    icon: 'AlertTriangle',
    eyebrow: 'From your Acellus screen · when factoring is not needed',
    eyebrowVn: 'Từ màn hình Acellus của em · khi nào không cần đặt nhân tử chung',
    title: 'The Mass of the Sticky Ball',
    titleVn: 'Khối Lượng Của Quả Bóng Dính',
    content: '**A 0.982 kg bouncy ball moving +0.246 m/s makes a head-on inelastic collision with a stationary sticky ball. After, they move +0.151 m/s. What is the mass of the sticky ball?**\n\nTwo phrases this time — "stationary" AND "they move" together — and the unknown is a **mass**.',
    contentVn: '**Một quả bóng nảy 0.982 kg chuyển động +0.246 m/s va chạm mềm trực diện với một quả bóng dính đang đứng yên. Sau đó, chúng chuyển động +0.151 m/s. Khối lượng của quả bóng dính là bao nhiêu?**\n\nLần này có hai cụm từ — "đứng yên" VÀ "chúng chuyển động" cùng nhau — và ẩn số là một **khối lượng**.',
    steps: [
      {
        text: '**Pieces:** $m_1 = 0.982$ kg, $v_{1i} = +0.246$ m/s, $v_{2i} = 0$, $v_f = +0.151$ m/s, $m_2 = ?$',
        textVn: '**Các đại lượng:** $m_1 = 0.982$ kg, $v_{1i} = +0.246$ m/s, $v_{2i} = 0$, $v_f = +0.151$ m/s, $m_2 = ?$',
      },
      {
        text: '**Set up both stories:** $v_{2i} = 0$ removes a term; $v_{1f} = v_{2f} = v_f$ gives $m_1 v_{1i} = m_1 v_f + m_2 v_f$.',
        textVn: '**Thiết lập cả hai câu chuyện:** $v_{2i} = 0$ làm mất một số hạng; $v_{1f} = v_{2f} = v_f$ cho $m_1 v_{1i} = m_1 v_f + m_2 v_f$.',
      },
      {
        text: '**No need to factor.** The target $m_2$ is in only ONE term, so the usual two moves free it. (Factoring still works — divide by $v_f$, then subtract $m_1$ — it is just a longer road.)',
        textVn: '**Không cần đặt nhân tử chung.** Ẩn $m_2$ chỉ nằm trong MỘT số hạng, nên hai bước quen thuộc là đủ. (Đặt nhân tử chung vẫn làm được — chia cho $v_f$, rồi trừ $m_1$ — chỉ là đường dài hơn.)',
      },
      {
        text: '**Rearrange:** subtract $m_1 v_f$ → $m_1 v_{1i} - m_1 v_f = m_2 v_f$; divide by $v_f$ → $m_2 = \\dfrac{m_1 v_{1i} - m_1 v_f}{v_f}$.',
        textVn: '**Biến đổi:** trừ $m_1 v_f$ → $m_1 v_{1i} - m_1 v_f = m_2 v_f$; chia cho $v_f$ → $m_2 = \\dfrac{m_1 v_{1i} - m_1 v_f}{v_f}$.',
      },
      {
        text: '**Substitute and answer:** $m_2 = \\dfrac{0.982 \\times 0.246 - 0.982 \\times 0.151}{0.151} = 0.618$ kg.',
        textVn: '**Thay số và trả lời:** $m_2 = \\dfrac{0.982 \\times 0.246 - 0.982 \\times 0.151}{0.151} = 0.618$ kg.',
      },
    ],
    check: {
      id: 'chk_when_factor',
      q: 'When should you factor in a collision equation?',
      qVn: 'Khi nào nên đặt nhân tử chung trong phương trình va chạm?',
      options: [
        { val: 'A', text: 'Always, straight after putting in the story', textVn: 'Luôn luôn, ngay sau khi đưa đề bài vào' },
        { val: 'B', text: 'Whenever you see $v_f$ twice', textVn: 'Mỗi khi thấy $v_f$ hai lần' },
        { val: 'C', text: 'When the UNKNOWN is in two terms on the same side', textVn: 'Khi ẨN SỐ nằm trong hai số hạng ở cùng một vế' },
        { val: 'D', text: 'Never — it changes the equation', textVn: 'Không bao giờ — nó làm thay đổi phương trình' },
      ],
      correct: 'C',
      expEn: 'Factor to bring the unknown together into ONE place. Here $v_f$ is in two terms but it is not the unknown, so factoring it (A and B) only tucks $m_2$ inside a bracket and adds a move. Factoring never changes the equation (D) — expanding gives back exactly what you had.',
      expVn: 'Đặt nhân tử chung để gom ẩn số về MỘT chỗ. Ở đây $v_f$ nằm trong hai số hạng nhưng nó không phải ẩn số, nên đặt nhân tử chung (A và B) chỉ nhét $m_2$ vào trong ngoặc và thêm một bước. Đặt nhân tử chung không bao giờ làm thay đổi phương trình (D) — nhân phá ngoặc sẽ trả lại đúng như cũ.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'From your Acellus screen · "Remember: right is +, left is −"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Nhớ: phải là +, trái là −"',
    title: 'Anna Leaps Into Paul\'s Hands',
    titleVn: 'Anna Nhảy Vào Vòng Tay Paul',
    content: '**A 52.3 kg ice skater, Anna, is skating −12.0 m/s and leaps into the hands of a 102 kg skater, Paul. Afterward, they move at −2.33 m/s. What was Paul\'s velocity before the collision?**\n\nThe unknown is BEFORE the collision this time, on the left side.',
    contentVn: '**Một vận động viên trượt băng 52.3 kg, Anna, đang trượt với vận tốc −12.0 m/s và nhảy vào vòng tay của Paul, nặng 102 kg. Sau đó, họ chuyển động với vận tốc −2.33 m/s. Vận tốc của Paul trước va chạm là bao nhiêu?**\n\nLần này ẩn số nằm TRƯỚC va chạm, ở vế trái.',
    steps: [
      {
        text: '**Pieces, with signs:** Anna $m_1 = 52.3$ kg, $v_{1i} = -12.0$ m/s. Paul $m_2 = 102$ kg, $v_{2i} = ?$. Together after: $v_f = -2.33$ m/s.',
        textVn: '**Các đại lượng, kèm dấu:** Anna $m_1 = 52.3$ kg, $v_{1i} = -12.0$ m/s. Paul $m_2 = 102$ kg, $v_{2i} = ?$. Cùng nhau sau va chạm: $v_f = -2.33$ m/s.',
      },
      {
        text: '**Formula, set up:** they hold on, so $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$.',
        textVn: '**Công thức, đã thiết lập:** họ giữ lấy nhau, nên $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$.',
      },
      {
        text: '**Rearrange:** subtract $m_1 v_{1i}$ → $m_2 v_{2i} = (m_1 + m_2)\\,v_f - m_1 v_{1i}$; divide by $m_2$ → $v_{2i} = \\dfrac{(m_1 + m_2)\\,v_f - m_1 v_{1i}}{m_2}$.',
        textVn: '**Biến đổi:** trừ $m_1 v_{1i}$ → $m_2 v_{2i} = (m_1 + m_2)\\,v_f - m_1 v_{1i}$; chia cho $m_2$ → $v_{2i} = \\dfrac{(m_1 + m_2)\\,v_f - m_1 v_{1i}}{m_2}$.',
      },
      {
        text: '**Substitute, negatives in brackets:** $v_{2i} = \\dfrac{154.3 \\times (-2.33) - 52.3 \\times (-12.0)}{102} = \\dfrac{-359.5 + 627.6}{102}$.',
        textVn: '**Thay số, số âm trong ngoặc:** $v_{2i} = \\dfrac{154.3 \\times (-2.33) - 52.3 \\times (-12.0)}{102} = \\dfrac{-359.5 + 627.6}{102}$.',
      },
      {
        text: '**Answer:** $v_{2i} = +2.63$ m/s. Positive: Paul was skating RIGHT, toward Anna. She was faster, so together they end up going left.',
        textVn: '**Đáp án:** $v_{2i} = +2.63$ m/s. Dương: Paul đang trượt sang PHẢI, về phía Anna. Anna nhanh hơn, nên cuối cùng cả hai đi sang trái.',
      },
    ],
    check: {
      id: 'chk_snowball',
      q: 'A 0.199 kg snowball moving west sticks to a 2.89 kg box moving 0.523 m/s west. Afterward, they move west at 1.92 m/s. East is +. What was the snowball\'s initial velocity?',
      qVn: 'Một quả cầu tuyết 0.199 kg bay về hướng tây dính vào một cái hộp 2.89 kg đang chuyển động 0.523 m/s về hướng tây. Sau đó, chúng chuyển động về hướng tây với tốc độ 1.92 m/s. Đông là +. Vận tốc ban đầu của quả cầu tuyết là bao nhiêu?',
      options: [
        { val: 'A', text: '$-22.2$ m/s', textVn: '$-22.2$ m/s' },
        { val: 'B', text: '$+22.2$ m/s', textVn: '$+22.2$ m/s' },
        { val: 'C', text: '$-37.4$ m/s', textVn: '$-37.4$ m/s' },
        { val: 'D', text: '$-29.8$ m/s', textVn: '$-29.8$ m/s' },
      ],
      correct: 'A',
      expEn: '$v_{1i} = \\dfrac{(m_1 + m_2)\\,v_f - m_2 v_{2i}}{m_1} = \\dfrac{3.089 \\times (-1.92) - 2.89 \\times (-0.523)}{0.199} = -22.2$ m/s — west, as the question said. B lost the direction. C used $+0.523$ for the box, which was also going west. D forgot the box\'s momentum altogether.',
      expVn: '$v_{1i} = \\dfrac{(m_1 + m_2)\\,v_f - m_2 v_{2i}}{m_1} = \\dfrac{3.089 \\times (-1.92) - 2.89 \\times (-0.523)}{0.199} = -22.2$ m/s — hướng tây, đúng như đề bài nói. B làm mất hướng. C dùng $+0.523$ cho cái hộp, dù nó cũng đang đi về hướng tây. D quên hẳn động lượng của cái hộp.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Crosshair',
    inlineSvg: DIAGRAMS.RECOIL,
    eyebrow: 'Story 3 · recoil, derived — and the minus sign that appears by itself',
    eyebrowVn: 'Câu chuyện 3 · giật lùi, được suy ra — và dấu trừ tự xuất hiện',
    title: 'Recoil: Everything Starts at Rest',
    titleVn: 'Giật Lùi: Mọi Thứ Bắt Đầu Đứng Yên',
    content: '**A 4.50 kg rifle fires a 0.0100 kg bullet at +385 m/s. What is the recoil velocity of the rifle?**\n\nBefore it fires, nothing is moving. Bullet = 1, rifle = 2.',
    contentVn: '**Một khẩu súng trường 4.50 kg bắn một viên đạn 0.0100 kg với vận tốc +385 m/s. Vận tốc giật lùi của khẩu súng là bao nhiêu?**\n\nTrước khi bắn, không có gì chuyển động. Viên đạn = 1, khẩu súng = 2.',
    steps: [
      {
        text: '**Set up:** both at rest, $v_{1i} = v_{2i} = 0$, so the WHOLE left side is 0: $0 = m_1 v_{1f} + m_2 v_{2f}$. Copy this line: it is the recoil equation.',
        textVn: '**Thiết lập:** cả hai đứng yên, $v_{1i} = v_{2i} = 0$, nên CẢ vế trái bằng 0: $0 = m_1 v_{1f} + m_2 v_{2f}$. Chép dòng này: đó là phương trình giật lùi.',
      },
      {
        text: '**Subtract $m_1 v_{1f}$ from both sides:** $-m_1 v_{1f} = m_2 v_{2f}$. A minus sign has appeared on its own — the two momenta must be **opposite**.',
        textVn: '**Trừ $m_1 v_{1f}$ ở cả hai vế:** $-m_1 v_{1f} = m_2 v_{2f}$. Một dấu trừ đã tự xuất hiện — hai động lượng phải **ngược chiều**.',
      },
      {
        text: '**Divide by $m_2$:** $v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2}$.',
        textVn: '**Chia cho $m_2$:** $v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2}$.',
      },
      {
        text: '**Substitute and answer:** $v_{2f} = -\\dfrac{0.0100 \\times 385}{4.50} = -0.856$ m/s. The rifle kicks BACK, slowly — it is 450 times heavier than the bullet.',
        textVn: '**Thay số và trả lời:** $v_{2f} = -\\dfrac{0.0100 \\times 385}{4.50} = -0.856$ m/s. Khẩu súng giật NGƯỢC lại, chậm — nó nặng gấp 450 lần viên đạn.',
      },
    ],
    reveal: {
      label: 'What if it was moving before it split?',
      labelVn: 'Nếu nó đang chuyển động trước khi tách ra thì sao?',
      prompt: 'A comet moving at 15.0 m/s breaks into two chunks. What does the one equation become?',
      promptVn: 'Một sao chổi đang chuyển động 15.0 m/s vỡ thành hai mảnh. Phương trình duy nhất trở thành gì?',
      answer: 'Before, the chunks are stuck together, so they share ONE starting velocity: $v_{1i} = v_{2i} = v_i$. Factor it out of the left side: $$(m_1 + m_2)\\,v_i = m_1 v_{1f} + m_2 v_{2f}$$ It is the stick-together equation **backwards** — stuck before instead of after. Same equation, same moves.',
      answerVn: 'Trước đó, các mảnh dính liền nhau, nên chúng có chung MỘT vận tốc ban đầu: $v_{1i} = v_{2i} = v_i$. Đặt nó ra làm nhân tử chung ở vế trái: $$(m_1 + m_2)\\,v_i = m_1 v_{1f} + m_2 v_{2f}$$ Đó là phương trình dính vào nhau **theo chiều ngược lại** — dính trước thay vì sau. Cùng phương trình, cùng các bước.',
    },
    check: {
      id: 'chk_skaters',
      q: 'A 60.0 kg skater and a 45.0 kg skater stand still, then push off each other. The 45.0 kg skater moves at +2.40 m/s. What is the 60.0 kg skater\'s velocity?',
      qVn: 'Một người trượt băng 60.0 kg và một người 45.0 kg đứng yên, rồi đẩy nhau ra. Người 45.0 kg chuyển động với vận tốc +2.40 m/s. Vận tốc của người 60.0 kg là bao nhiêu?',
      options: [
        { val: 'A', text: '$+1.80$ m/s', textVn: '$+1.80$ m/s' },
        { val: 'B', text: '$-3.20$ m/s', textVn: '$-3.20$ m/s' },
        { val: 'C', text: '$-1.80$ m/s', textVn: '$-1.80$ m/s' },
        { val: 'D', text: '$0$ — the total momentum is zero, so nobody moves', textVn: '$0$ — tổng động lượng bằng không, nên không ai chuyển động' },
      ],
      correct: 'C',
      expEn: '$v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2} = -\\dfrac{45.0 \\times 2.40}{60.0} = -1.80$ m/s: the heavier skater goes the other way, more slowly. A lost the minus sign — both skaters cannot go the same way from rest. B has the masses the wrong way up. D: the TOTAL is zero, but $+108$ and $-108$ add to zero with both skaters moving.',
      expVn: '$v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2} = -\\dfrac{45.0 \\times 2.40}{60.0} = -1.80$ m/s: người nặng hơn đi theo hướng ngược lại, chậm hơn. A mất dấu trừ — từ trạng thái đứng yên, hai người không thể đi cùng một hướng. B đặt khối lượng lộn ngược. D: TỔNG bằng không, nhưng $+108$ và $-108$ cộng lại bằng không trong khi cả hai đều chuyển động.',
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
    content: 'Eight lines, and only line 5 is a collision equation to remember — lines 6 to 8 are line 5 with a story put in. Beside each, write **when** it is the right one.',
    contentVn: 'Tám dòng, và chỉ dòng 5 là phương trình va chạm cần nhớ — dòng 6 đến 8 là dòng 5 với một câu chuyện được đưa vào. Bên cạnh mỗi dòng, ghi **khi nào** dùng nó.',
    notes: [
      { tone: 'write', text: '**1.** $p = m v$ — the momentum of one object.', textVn: '**1.** $p = m v$ — động lượng của một vật.' },
      { tone: 'write', text: '**2.** Signs: right / east = $+$, left / west = $-$. A velocity is a number WITH its sign.', textVn: '**2.** Dấu: phải / đông = $+$, trái / tây = $-$. Vận tốc là con số KÈM dấu.' },
      { tone: 'write', text: '**3.** $J = F \\Delta t$ — a force acting for a time.', textVn: '**3.** $J = F \\Delta t$ — một lực tác dụng trong một khoảng thời gian.' },
      { tone: 'write', text: '**4.** $F \\Delta t = m (v_f - v_i)$ — impulse = change in momentum. $\\Delta v$ is final MINUS initial.', textVn: '**4.** $F \\Delta t = m (v_f - v_i)$ — xung lượng = độ thay đổi động lượng. $\\Delta v$ là cuối TRỪ đầu.' },
      { tone: 'write', text: '**5.** $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$ — EVERY collision.', textVn: '**5.** $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$ — MỌI va chạm.' },
      { tone: 'write', text: '**6.** One at rest ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$', textVn: '**6.** Một vật đứng yên ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$' },
      { tone: 'write', text: '**7.** Stick together ($v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$', textVn: '**7.** Dính vào nhau ($v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$' },
      { tone: 'write', text: '**8.** Recoil, all at rest before: $0 = m_1 v_{1f} + m_2 v_{2f}$', textVn: '**8.** Giật lùi, tất cả đứng yên lúc đầu: $0 = m_1 v_{1f} + m_2 v_{2f}$' },
      { tone: 'info', text: '**Units:** $p$ in kg·m/s · $J$ in N·s (the same thing) · $F$ in N · $\\Delta t$ in s · km/s × 1000 → m/s', textVn: '**Đơn vị:** $p$ tính bằng kg·m/s · $J$ bằng N·s (cùng một thứ) · $F$ bằng N · $\\Delta t$ bằng s · km/s × 1000 → m/s' },
      { tone: 'info', text: '**Algebra:** a negative number goes in brackets · minus a minus is a plus · factor only when the UNKNOWN is in two terms, then divide by the WHOLE bracket', textVn: '**Đại số:** số âm đặt trong ngoặc · trừ một số âm là cộng · chỉ đặt nhân tử chung khi ẨN SỐ nằm trong hai số hạng, rồi chia cho CẢ ngoặc' },
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
      { tone: 'homework', text: '**1. A lost sign.** Anything moving left or west went in as positive — or the answer\'s minus sign was left off the box. "Remember to indicate the direction" means: type the minus.', textVn: '**1. Mất dấu.** Một vật đi sang trái hay sang tây lại được thay bằng số dương — hoặc dấu trừ của đáp án bị bỏ khỏi ô. "Nhớ ghi hướng" nghĩa là: gõ dấu trừ.' },
      { tone: 'homework', text: '**2. Minus a minus.** $37.0 - (-41.0)$ is $78.0$, not $-4.0$. Write the brackets, and type them into the calculator.', textVn: '**2. Trừ một số âm.** $37.0 - (-41.0)$ là $78.0$, không phải $-4.0$. Viết ngoặc, và gõ ngoặc vào máy tính.' },
      { tone: 'homework', text: '**3. The wrong divide.** In the stick-together equation, divide by the WHOLE bracket $(m_1 + m_2)$ — never by $m_1$ alone. Factor only when the unknown is the letter in both terms.', textVn: '**3. Chia sai.** Trong phương trình dính vào nhau, chia cho CẢ ngoặc $(m_1 + m_2)$ — không bao giờ chỉ chia cho $m_1$. Chỉ đặt nhân tử chung khi ẩn số là chữ nằm trong cả hai số hạng.' },
      { tone: 'homework', text: '**4. Before and after mixed up.** "At rest" is BEFORE ($v_{2i} = 0$), not after. Read which object and which time before you write a subscript.', textVn: '**4. Nhầm trước và sau.** "Đứng yên" là TRƯỚC va chạm ($v_{2i} = 0$), không phải sau. Đọc rõ vật nào và thời điểm nào trước khi viết chỉ số.' },
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
    content: 'Your notebook should have **8 lines** — but only **one** collision equation to remember. Check.',
    contentVn: 'Vở của em cần có **8 dòng** — nhưng chỉ có **một** phương trình va chạm cần nhớ. Kiểm tra lại.',
    items: [
      { text: 'Work out momentum as mass × velocity, with a sign for its direction', textVn: 'Tính động lượng bằng khối lượng × vận tốc, kèm dấu cho hướng của nó' },
      { text: 'Use impulse = change in momentum, with Δv as final minus initial', textVn: 'Dùng xung lượng = độ thay đổi động lượng, với Δv là cuối trừ đầu' },
      { text: 'Put every negative number in brackets, and turn minus a minus into a plus', textVn: 'Đặt mọi số âm trong ngoặc, và biến trừ một số âm thành cộng' },
      { text: 'Read which object (1 or 2) and which time (i or f) a number belongs to', textVn: 'Đọc được một con số thuộc vật nào (1 hay 2) và thời điểm nào (i hay f)' },
      { text: 'Cross out the term of anything at rest', textVn: 'Gạch bỏ số hạng của vật đang đứng yên' },
      { text: 'Turn "stick together" into one v_f, factor it out, and divide by (m₁ + m₂)', textVn: 'Biến "dính vào nhau" thành một v_f, đặt nhân tử chung, rồi chia cho (m₁ + m₂)' },
      { text: 'Isolate an unknown mass by subtracting then dividing — no factoring needed', textVn: 'Cô lập một khối lượng chưa biết bằng cách trừ rồi chia — không cần đặt nhân tử chung' },
      { text: 'Explain the minus sign in a recoil: the two move in opposite directions', textVn: 'Giải thích dấu trừ trong giật lùi: hai vật chuyển động ngược chiều nhau' },
    ],
  },
];
