// src/data/PHYSICS/PHY_MOM/notes.js
// Acellus Physics: Momentum & Collisions — the lesson deck.
//
// WHO IT IS FOR. The same student as PHY_CIRC, one module on, and still
// losing most of her marks to the algebra rather than the physics. Momentum
// adds two new ways to lose them: a velocity's SIGN is its direction, and
// the collision formulas look like four different equations to memorise.
// So the deck is built on four rules.
//   · There is ONE collision equation. Slide 13 writes it down; slides
//     15–24 DERIVE every special case from it — at rest, stuck together,
//     recoil — by putting the story into it. The inelastic equation is
//     never handed over; she watches $v_{1f} = v_{2f} = v_f$ go in and the
//     $v_f$ get factored out. The Isolate It task makes her do the same.
//   · Signs are taught as direction (slide 5) and drilled on every worked
//     example: a negative number always goes in brackets, and minus a minus
//     is a plus (slide 9, a predict activity before any explanation).
//   · FACTORING is the one new algebra move (slide 19) — and slide 21 is the
//     item where it is not needed, because the unknown is a mass in one term.
//   · The five-line method from PHY_CIRC (slide 4, before any other worked
//     example), with signs added to line 1. EVERY worked example after it
//     uses the same five labels — Pieces · Formula · Rearrange · Substitute ·
//     Answer — even when a line is "nothing to do". The worked examples ARE
//     her Acellus items.
//
// THE SPINE:
//   1–2    hook: a baseball and a walking dog are about equally hard to stop.
//   3–6    p = mv; the method (the dog); direction is a sign; total momentum.
//   7–11   impulse: J = FΔt; derived from F = ma; minus a minus (predict);
//          the bat; the basketball's contact time.
//   12–14  conservation: shared not lost; THE equation; blocks A and B.
//   15     one equation, three stories — sort the phrases.
//   16–17  story 1, at rest: the term vanishes; car 1 and car 2 (+ the truck).
//   18–22  story 2, stick together: derive, FACTOR, the meteors, the sticky
//          ball (a mass needs no factoring), Anna and Paul.
//   23–24  story 3, recoil: derived (the minus sign appears by itself); the rifle.
//   25–27  the formula page, the four mistakes, the recap.
//
// Every formula-page line is on an orange "Write this down" card somewhere in
// the deck (steps slides render no `notes`, so derivations that end in a
// copy-down line are stack/split slides). No steps slide carries a diagram AND
// a check: at 1280×720 the check's side column squeezes the working into a
// strip beside an unreadable picture — so the bat keeps its diagram and loses
// its check, and the meteor and rifle diagrams sit on the two derivation
// slides (18, 23), which carry no check for the same reason. A split slide
// that keeps a check (5, 12) stays at ratio 40 so its picture gets the room.
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
//  · Never refer to a slide by number in learner text — say its title.
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
    eyebrow: 'Momentum · impulse · collisions · recoil',
    eyebrowVn: 'Động lượng · xung lượng · va chạm · giật lùi',
    title: 'Momentum & Collisions',
    titleVn: 'Động Lượng & Va Chạm',
    objective: 'I can find momentum and impulse, use + and − to show direction, and solve any collision with ONE equation — rearranged before the numbers go in.',
    objectiveVn: 'Em có thể tính động lượng và xung lượng, dùng + và − để chỉ hướng, và giải mọi bài va chạm bằng MỘT phương trình — biến đổi xong rồi mới thay số.',
    warmUp: 'A shopping trolley and a truck both roll toward you at walking speed. Which one would you rather stop with your hands? Why? Write one sentence.',
    warmUpVn: 'Một chiếc xe đẩy siêu thị và một chiếc xe tải cùng lăn về phía em với tốc độ đi bộ. Em muốn dùng tay chặn cái nào hơn? Vì sao? Viết một câu.',
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
      answer: 'Almost a **tie**. Baseball: $0.145 \\times 42.0 = 6.09$. Dog: $12.0 \\times 0.500 = 6.00$. How hard a moving thing is to stop depends on its mass AND its speed **together**. Mass × velocity has a name: **momentum**.',
      answerVn: 'Gần như **bằng nhau**. Bóng chày: $0.145 \\times 42.0 = 6.09$. Con chó: $12.0 \\times 0.500 = 6.00$. Một vật đang chuyển động khó dừng đến mức nào phụ thuộc vào khối lượng VÀ tốc độ của nó **cùng lúc**. Khối lượng × vận tốc có một cái tên: **động lượng**.',
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
    sub: 'Momentum = mass × velocity. The more momentum something has, the harder it is to stop.',
    subVn: 'Động lượng = khối lượng × vận tốc. Vật có động lượng càng lớn thì càng khó dừng.',
    notes: [
      {
        tone: 'write',
        text: '$p$ = momentum, in **kg·m/s**\n$m$ = mass, in **kilograms (kg)**\n$v$ = velocity, in **m/s** — with a **sign** for its direction',
        textVn: '$p$ = động lượng, đơn vị **kg·m/s**\n$m$ = khối lượng, đơn vị **kilôgam (kg)**\n$v$ = vận tốc, đơn vị **m/s** — kèm **dấu** cho hướng của nó',
      },
      {
        tone: 'info',
        text: 'The unit is the two units multiplied: kg × m/s = **kg·m/s**. The letter for momentum is $p$, not $m$ — because $m$ already means mass.',
        textVn: 'Đơn vị là hai đơn vị nhân với nhau: kg × m/s = **kg·m/s**. Chữ cái của động lượng là $p$, không phải $m$ — vì $m$ đã có nghĩa là khối lượng.',
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
      expEn: '$p = m v = 1200 \\times 15.0 = 18{,}000$ kg·m/s. A divided the mass by the speed. B added them. D divided the speed by the mass. Momentum is always a MULTIPLICATION.',
      expVn: '$p = m v = 1200 \\times 15.0 = 18{,}000$ kg·m/s. A chia khối lượng cho tốc độ. B cộng chúng. D chia tốc độ cho khối lượng. Động lượng luôn là một phép NHÂN.',
    },
  },

  {
    layout: 'steps',
    accent: INDIGO,
    icon: 'ListChecks',
    dense: true,
    eyebrow: 'From your Acellus screen · use these five lines on every question',
    eyebrowVn: 'Từ màn hình Acellus của em · dùng năm dòng này cho mọi câu hỏi',
    title: 'The Method: Five Lines',
    titleVn: 'Phương Pháp: Năm Dòng',
    content: '**A baseball has a mass of 0.145 kg. A pitcher\'s fastball travels at 42.0 m/s. Suppose a dog has a mass of 12.0 kg. What speed must the dog be walking in order to have the same momentum as the fastball?**\n\nThe same five lines as the last module. Use them on EVERY question in this lesson.',
    contentVn: '**Một quả bóng chày có khối lượng 0.145 kg. Cú ném nhanh bay với tốc độ 42.0 m/s. Giả sử một con chó có khối lượng 12.0 kg. Con chó phải đi với tốc độ bao nhiêu để có cùng động lượng với quả bóng?**\n\nVẫn năm dòng như bài trước. Dùng chúng cho MỌI câu hỏi trong bài này.',
    steps: [
      {
        text: '**Pieces.** List every number with its unit. Ball: $m_1 = 0.145$ kg, $v_1 = 42.0$ m/s. Dog: $m_2 = 12.0$ kg, $v_2 = ?$',
        textVn: '**Các đại lượng.** Liệt kê mọi con số kèm đơn vị. Bóng: $m_1 = 0.145$ kg, $v_1 = 42.0$ m/s. Chó: $m_2 = 12.0$ kg, $v_2 = ?$',
      },
      {
        text: '**Formula.** "The same momentum" means $p_1 = p_2$, so $m_1 v_1 = m_2 v_2$.',
        textVn: '**Công thức.** "Cùng động lượng" nghĩa là $p_1 = p_2$, nên $m_1 v_1 = m_2 v_2$.',
      },
      {
        text: '**Rearrange — letters only.** $v_2$ is multiplied by $m_2$, so divide both sides by $m_2$: $v_2 = \\dfrac{m_1 v_1}{m_2}$',
        textVn: '**Biến đổi — chỉ dùng chữ.** $v_2$ đang nhân với $m_2$, nên chia cả hai vế cho $m_2$: $v_2 = \\dfrac{m_1 v_1}{m_2}$',
      },
      {
        text: '**Substitute.** $v_2 = \\dfrac{0.145 \\times 42.0}{12.0}$',
        textVn: '**Thay số.** $v_2 = \\dfrac{0.145 \\times 42.0}{12.0}$',
      },
      {
        text: '**Answer, with a unit.** $v_2 = 0.508$ m/s — a slow walk. The dog is about 83 times heavier than the ball, so it can move about 83 times more slowly.',
        textVn: '**Đáp án, kèm đơn vị.** $v_2 = 0.508$ m/s — một bước đi chậm. Con chó nặng hơn quả bóng khoảng 83 lần, nên nó chỉ cần đi chậm hơn khoảng 83 lần.',
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
      expEn: 'In $m_1 v_1 = m_2 v_2$, the target $m_2$ is multiplied by $v_2$. So divide both sides by $v_2$: $m_2 = \\dfrac{m_1 v_1}{v_2} = \\dfrac{0.635 \\times 31.5}{4.10} = 4.88$ kg. B is upside down. C multiplies instead of dividing. D subtracts — but nothing was added.',
      expVn: 'Trong $m_1 v_1 = m_2 v_2$, ẩn $m_2$ đang nhân với $v_2$. Nên chia cả hai vế cho $v_2$: $m_2 = \\dfrac{m_1 v_1}{v_2} = \\dfrac{0.635 \\times 31.5}{4.10} = 4.88$ kg. B bị lộn ngược. C nhân thay vì chia. D trừ — nhưng có gì được cộng đâu.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'ArrowLeftRight',
    ratio: 40,
    eyebrow: 'The part Acellus always checks',
    eyebrowVn: 'Phần mà Acellus luôn kiểm tra',
    title: 'Direction Is a Sign',
    titleVn: 'Hướng Là Một Dấu',
    inlineSvg: DIAGRAMS.SIGN_LINE,
    content: 'On a straight line, a thing can move only two ways: this way or that way. Physics shows the direction with a **sign**.\n\nThe question tells you which way is **+** (for example, "right is +, left is −"). Anything moving the other way gets a **minus** sign.\n\nThe minus does NOT mean "less". It means "the other way".',
    contentVn: 'Trên một đường thẳng, vật chỉ có thể đi theo hai hướng: chiều này hoặc chiều kia. Vật lý thể hiện hướng bằng một **dấu**.\n\nĐề bài cho biết hướng nào là **+** (ví dụ: "phải là +, trái là −"). Vật nào đi theo hướng kia thì mang dấu **trừ**.\n\nDấu trừ KHÔNG có nghĩa là "ít hơn". Nó có nghĩa là "hướng ngược lại".',
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
      expEn: '$p = m v = 2.27 \\times (-9.80) = -22.2$ kg·m/s. The size comes from the multiplication. The minus comes from "left". A lost the direction. C divided $9.80 \\div 2.27$. D added the two numbers.',
      expVn: '$p = m v = 2.27 \\times (-9.80) = -22.2$ kg·m/s. Độ lớn đến từ phép nhân. Dấu trừ đến từ "trái". A làm mất hướng. C chia $9.80 \\div 2.27$. D cộng hai số lại.',
    },
  },

  {
    layout: 'steps',
    accent: AMBER,
    icon: 'Sigma',
    dense: true,
    eyebrow: 'From your Acellus screen · signs in action',
    eyebrowVn: 'Từ màn hình Acellus của em · dùng dấu trong bài',
    title: 'The Total Momentum of Two Balls',
    titleVn: 'Tổng Động Lượng Của Hai Quả Bóng',
    content: '**A 0.907 kg ball moving at 23.4 m/s to the right strikes a 2.27 kg ball moving 9.80 m/s to the left. What is the total momentum of the two balls?**\n\nTo find a total, add the two momenta — signs included.',
    contentVn: '**Một quả bóng 0.907 kg chuyển động với tốc độ 23.4 m/s sang phải va vào một quả bóng 2.27 kg đang chuyển động 9.80 m/s sang trái. Tổng động lượng của hai quả bóng là bao nhiêu?**\n\nĐể tìm tổng, cộng hai động lượng lại — kèm cả dấu.',
    steps: [
      {
        text: '**Pieces, with signs.** Ball 1: $m_1 = 0.907$ kg, $v_1 = +23.4$ m/s (right). Ball 2: $m_2 = 2.27$ kg, $v_2 = -9.80$ m/s (left).',
        textVn: '**Các đại lượng, kèm dấu.** Bóng 1: $m_1 = 0.907$ kg, $v_1 = +23.4$ m/s (phải). Bóng 2: $m_2 = 2.27$ kg, $v_2 = -9.80$ m/s (trái).',
      },
      {
        text: '**Formula.** Total momentum = the two momenta added: $p = m_1 v_1 + m_2 v_2$',
        textVn: '**Công thức.** Tổng động lượng = hai động lượng cộng lại: $p = m_1 v_1 + m_2 v_2$',
      },
      {
        text: '**Rearrange.** Nothing to do — $p$ is already alone on one side.',
        textVn: '**Biến đổi.** Không cần làm gì — $p$ đã đứng một mình ở một vế.',
      },
      {
        text: '**Substitute — a negative number goes in brackets.** $p = 0.907 \\times 23.4 + 2.27 \\times (-9.80)$',
        textVn: '**Thay số — số âm đặt trong ngoặc.** $p = 0.907 \\times 23.4 + 2.27 \\times (-9.80)$',
      },
      {
        text: '**Answer.** $p = 21.22 + (-22.25) = -1.02$ kg·m/s. Negative: ball 2 carries a little more momentum, so the total points LEFT.',
        textVn: '**Đáp án.** $p = 21.22 + (-22.25) = -1.02$ kg·m/s. Âm: bóng 2 mang động lượng lớn hơn một chút, nên tổng hướng sang TRÁI.',
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
      expEn: '$0.907 \\times 23.4 + 2.27 \\times 9.80 = 21.2 + 22.2 = 43.5$. That treats both balls as moving right, so the two momenta add up instead of almost cancelling. The ball moving left must go in as $-9.80$.',
      expVn: '$0.907 \\times 23.4 + 2.27 \\times 9.80 = 21.2 + 22.2 = 43.5$. Như vậy là coi cả hai quả bóng đều đi sang phải, nên hai động lượng cộng dồn thay vì gần như triệt tiêu nhau. Quả bóng đi sang trái phải được thay bằng $-9.80$.',
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
    sub: 'A force F pushing for a time Δt gives an impulse J. Push harder, or push for longer, and the impulse is bigger.',
    subVn: 'Một lực F đẩy trong thời gian Δt tạo ra một xung lượng J. Đẩy mạnh hơn, hoặc đẩy lâu hơn, thì xung lượng lớn hơn.',
    notes: [
      {
        tone: 'write',
        text: '$J$ = impulse, in **N·s** (the same as kg·m/s)\n$F$ = average force, in **newtons (N)**\n$\\Delta t$ = contact time — how long the force acts, in **seconds (s)**',
        textVn: '$J$ = xung lượng, đơn vị **N·s** (giống kg·m/s)\n$F$ = lực trung bình, đơn vị **niutơn (N)**\n$\\Delta t$ = thời gian tiếp xúc — lực tác dụng trong bao lâu, đơn vị **giây (s)**',
      },
      {
        tone: 'info',
        text: '$\\Delta$ (delta) means **"change in"**. $\\Delta t$ is a length of time: how long the push lasts. For a bat hitting a ball, it is about 0.0880 s.',
        textVn: '$\\Delta$ (delta) nghĩa là **"độ thay đổi của"**. $\\Delta t$ là một khoảng thời gian: cú đẩy kéo dài bao lâu. Khi cây gậy đánh quả bóng, nó khoảng 0.0880 s.',
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
      expEn: 'Multiply force by time. A: $400 \\times 0.10 = 40$ N·s. B: $100 \\times 0.50 = 50$ N·s. C: $20 \\times 1.5 = 30$ N·s. The biggest force (A) is not the biggest impulse — the time counts just as much.',
      expVn: 'Nhân lực với thời gian. A: $400 \\times 0.10 = 40$ N·s. B: $100 \\times 0.50 = 50$ N·s. C: $20 \\times 1.5 = 30$ N·s. Lực lớn nhất (A) không tạo ra xung lượng lớn nhất — thời gian cũng quan trọng không kém.',
    },
  },

  {
    layout: 'stack',
    accent: GREEN,
    icon: 'Variable',
    columns: 1,
    eyebrow: 'Derived, not memorised',
    eyebrowVn: 'Suy ra, không học thuộc',
    title: 'Impulse = Change in Momentum',
    titleVn: 'Xung Lượng = Độ Thay Đổi Động Lượng',
    content: 'Start from Newton\'s second law, $F = m a$. Acceleration is the change in velocity divided by the time — final minus initial:\n$$a = \\dfrac{v_f - v_i}{\\Delta t}$$\nPut that in place of $a$:\n$$F = \\dfrac{m (v_f - v_i)}{\\Delta t}$$\n$\\Delta t$ is dividing, so multiply both sides by $\\Delta t$:\n$$F \\Delta t = m (v_f - v_i)$$\nThe left side is the **impulse**. The right side is $m v_f - m v_i$: the momentum after minus the momentum before — the **change in momentum**.',
    contentVn: 'Bắt đầu từ định luật II Newton, $F = m a$. Gia tốc là độ thay đổi vận tốc chia cho thời gian — cuối trừ đầu:\n$$a = \\dfrac{v_f - v_i}{\\Delta t}$$\nThay nó vào chỗ $a$:\n$$F = \\dfrac{m (v_f - v_i)}{\\Delta t}$$\n$\\Delta t$ đang chia, nên nhân cả hai vế với $\\Delta t$:\n$$F \\Delta t = m (v_f - v_i)$$\nVế trái là **xung lượng**. Vế phải là $m v_f - m v_i$: động lượng sau trừ động lượng trước — **độ thay đổi động lượng**.',
    notes: [
      {
        tone: 'write',
        text: '**Impulse = change in momentum:** $F \\Delta t = m (v_f - v_i)$\n$\\Delta v = v_f - v_i$ — always **final minus initial**.',
        textVn: '**Xung lượng = độ thay đổi động lượng:** $F \\Delta t = m (v_f - v_i)$\n$\\Delta v = v_f - v_i$ — luôn là **cuối trừ đầu**.',
      },
      {
        tone: 'plant',
        text: 'Use this line when ONE object is pushed for a short time and its velocity changes — a bat hitting a ball, a ball bouncing off the floor.',
        textVn: 'Dùng dòng này khi MỘT vật bị đẩy trong thời gian ngắn và vận tốc của nó thay đổi — cây gậy đánh quả bóng, quả bóng nảy lên khỏi sàn.',
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
      expEn: '$F$ is multiplied by $\\Delta t$, so divide both sides by $\\Delta t$. The bracket $(v_f - v_i)$ moves as one piece — never split it. A multiplies instead of dividing. B is upside down. D subtracts something that was multiplying.',
      expVn: '$F$ đang nhân với $\\Delta t$, nên chia cả hai vế cho $\\Delta t$. Ngoặc $(v_f - v_i)$ đi cùng nhau như một khối — đừng bao giờ tách nó. A nhân thay vì chia. B bị lộn ngược. D trừ đi một thứ đang nhân.',
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
      explain: '$\\Delta v = 37.0 - (-41.0)$. Taking away a negative is the same as ADDING: $37.0 + 41.0 = 78.0$ m/s. Picture a number line: the velocity goes from $-41$, across zero, up to $+37$ — a jump of 78, not 4. The answer $-4.0$ comes from losing the minus sign of $v_i$. It is the most common mistake in this lesson. Always put a negative number in brackets — on paper AND in the calculator.',
      explainVn: '$\\Delta v = 37.0 - (-41.0)$. Trừ đi một số âm cũng giống như CỘNG: $37.0 + 41.0 = 78.0$ m/s. Hãy hình dung trục số: vận tốc đi từ $-41$, qua số 0, lên tới $+37$ — một bước nhảy 78, không phải 4. Đáp án $-4.0$ là do làm mất dấu trừ của $v_i$. Đó là lỗi phổ biến nhất của bài này. Luôn đặt số âm trong ngoặc — trên giấy VÀ trên máy tính.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Zap',
    dense: true,
    eyebrow: 'From your Acellus screen · "Remember to indicate the direction (+ or −)"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Nhớ ghi hướng (+ hoặc −)"',
    title: 'The Force of a Bat',
    titleVn: 'Lực Của Cây Gậy',
    inlineSvg: DIAGRAMS.IMPULSE_BAT,
    content: '**A bat hits a 0.150 kg baseball for 0.0880 s. The ball\'s velocity changes from −41.0 m/s to +37.0 m/s. How much force was applied to the ball?**',
    contentVn: '**Một cây gậy đánh vào quả bóng chày 0.150 kg trong 0.0880 s. Vận tốc của quả bóng thay đổi từ −41.0 m/s thành +37.0 m/s. Lực tác dụng lên quả bóng là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces, with signs.** $m = 0.150$ kg, $\\Delta t = 0.0880$ s, $v_i = -41.0$ m/s, $v_f = +37.0$ m/s, $F = ?$',
        textVn: '**Các đại lượng, kèm dấu.** $m = 0.150$ kg, $\\Delta t = 0.0880$ s, $v_i = -41.0$ m/s, $v_f = +37.0$ m/s, $F = ?$',
      },
      {
        text: '**Formula.** $F \\Delta t = m (v_f - v_i)$',
        textVn: '**Công thức.** $F \\Delta t = m (v_f - v_i)$',
      },
      {
        text: '**Rearrange.** $F$ is multiplied by $\\Delta t$, so divide both sides by $\\Delta t$: $F = \\dfrac{m (v_f - v_i)}{\\Delta t}$',
        textVn: '**Biến đổi.** $F$ đang nhân với $\\Delta t$, nên chia cả hai vế cho $\\Delta t$: $F = \\dfrac{m (v_f - v_i)}{\\Delta t}$',
      },
      {
        text: '**Substitute — negative in brackets.** $F = \\dfrac{0.150 \\times (37.0 - (-41.0))}{0.0880} = \\dfrac{0.150 \\times 78.0}{0.0880}$',
        textVn: '**Thay số — số âm trong ngoặc.** $F = \\dfrac{0.150 \\times (37.0 - (-41.0))}{0.0880} = \\dfrac{0.150 \\times 78.0}{0.0880}$',
      },
      {
        text: '**Answer, with a unit and a sign.** $F = +133$ N. Positive: the bat pushes the ball to the RIGHT, the way it flies off.',
        textVn: '**Đáp án, kèm đơn vị và dấu.** $F = +133$ N. Dương: cây gậy đẩy quả bóng sang PHẢI, theo hướng nó bay đi.',
      },
    ],
    reveal: {
      label: 'What if you lose the minus sign?',
      labelVn: 'Nếu làm mất dấu trừ thì sao?',
      prompt: 'Use 41.0 instead of −41.0 for $v_i$. What force comes out?',
      promptVn: 'Dùng 41.0 thay cho −41.0 cho $v_i$. Lực tính ra bằng bao nhiêu?',
      answer: '$37.0 - 41.0 = -4.0$, so $F = \\dfrac{0.150 \\times (-4.0)}{0.0880} = -6.82$ N. That is about **20 times too small**, and it points the **wrong way**. One lost minus sign gives two mistakes.',
      answerVn: '$37.0 - 41.0 = -4.0$, nên $F = \\dfrac{0.150 \\times (-4.0)}{0.0880} = -6.82$ N. Như vậy nhỏ hơn khoảng **20 lần**, và hướng **ngược lại**. Mất một dấu trừ, sai hai thứ cùng lúc.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Timer',
    dense: true,
    eyebrow: 'From your Acellus screen · same formula, new unknown',
    eyebrowVn: 'Từ màn hình Acellus của em · cùng công thức, ẩn số mới',
    title: 'How Long Was the Ball on the Floor?',
    titleVn: 'Quả Bóng Chạm Sàn Trong Bao Lâu?',
    content: '**When a 0.622 kg basketball hits the floor, its velocity changes from −4.23 m/s to +3.85 m/s. If the average force was 72.9 N, how much time was it in contact with the floor?**\n\nThe same formula as the bat. This time the unknown is $\\Delta t$.',
    contentVn: '**Khi một quả bóng rổ 0.622 kg chạm sàn, vận tốc của nó thay đổi từ −4.23 m/s thành +3.85 m/s. Nếu lực trung bình là 72.9 N, quả bóng tiếp xúc với sàn trong bao lâu?**\n\nCùng công thức với bài cây gậy. Lần này ẩn số là $\\Delta t$.',
    steps: [
      {
        text: '**Pieces, with signs.** $m = 0.622$ kg, $v_i = -4.23$ m/s, $v_f = +3.85$ m/s, $F = 72.9$ N, $\\Delta t = ?$',
        textVn: '**Các đại lượng, kèm dấu.** $m = 0.622$ kg, $v_i = -4.23$ m/s, $v_f = +3.85$ m/s, $F = 72.9$ N, $\\Delta t = ?$',
      },
      {
        text: '**Formula.** $F \\Delta t = m (v_f - v_i)$',
        textVn: '**Công thức.** $F \\Delta t = m (v_f - v_i)$',
      },
      {
        text: '**Rearrange.** $\\Delta t$ is multiplied by $F$, so divide both sides by $F$: $\\Delta t = \\dfrac{m (v_f - v_i)}{F}$',
        textVn: '**Biến đổi.** $\\Delta t$ đang nhân với $F$, nên chia cả hai vế cho $F$: $\\Delta t = \\dfrac{m (v_f - v_i)}{F}$',
      },
      {
        text: '**Substitute — negative in brackets.** $\\Delta t = \\dfrac{0.622 \\times (3.85 - (-4.23))}{72.9} = \\dfrac{0.622 \\times 8.08}{72.9}$',
        textVn: '**Thay số — số âm trong ngoặc.** $\\Delta t = \\dfrac{0.622 \\times (3.85 - (-4.23))}{72.9} = \\dfrac{0.622 \\times 8.08}{72.9}$',
      },
      {
        text: '**Answer.** $\\Delta t = 0.0689$ s — about seven hundredths of a second. A bounce is quick.',
        textVn: '**Đáp án.** $\\Delta t = 0.0689$ s — khoảng bảy phần trăm giây. Một cú nảy rất nhanh.',
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
      expEn: '$F = \\dfrac{m (v_f - v_i)}{\\Delta t} = \\dfrac{0.622 \\times 8.08}{0.0266} = 189$ N. A is the impulse $m \\Delta v$ — it forgot to divide by $\\Delta t$. B lost the minus sign of $v_i$. C multiplied by $\\Delta t$ instead of dividing.',
      expVn: '$F = \\dfrac{m (v_f - v_i)}{\\Delta t} = \\dfrac{0.622 \\times 8.08}{0.0266} = 189$ N. A là xung lượng $m \\Delta v$ — quên chia cho $\\Delta t$. B làm mất dấu trừ của $v_i$. C nhân với $\\Delta t$ thay vì chia.',
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
    content: 'When two carts crash, cart 1 pushes cart 2, and cart 2 pushes cart 1 back. The two pushes are **equal and opposite** (Newton\'s third law), and they last the **same time**.\n\nSo the momentum cart 2 gains is exactly the momentum cart 1 loses. The **total** stays the same.',
    contentVn: 'Khi hai xe va chạm, xe 1 đẩy xe 2, và xe 2 đẩy ngược lại xe 1. Hai lực đẩy **bằng nhau và ngược chiều** (định luật III Newton), và kéo dài **cùng một khoảng thời gian**.\n\nNên động lượng xe 2 nhận thêm đúng bằng động lượng xe 1 mất đi. **Tổng** vẫn giữ nguyên.',
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
      expEn: 'The total after equals the total before: $15.0 + (-35.0) = -20.0$ kg·m/s. You do not need the masses — you already have the momenta. A ignored B\'s minus sign. Momentum is never "used up" (C). It only passes from one object to the other.',
      expVn: 'Tổng sau bằng tổng trước: $15.0 + (-35.0) = -20.0$ kg·m/s. Không cần khối lượng — em đã có sẵn động lượng. A bỏ qua dấu trừ của B. Động lượng không bao giờ bị "tiêu hao" (C). Nó chỉ được chuyển từ vật này sang vật kia.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Star',
    eyebrow: 'The one collision equation — every other one comes from it',
    eyebrowVn: 'Phương trình va chạm duy nhất — mọi phương trình khác đều từ nó mà ra',
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
        text: 'Subscript **1** or **2** = which object.\nSubscript **i** = initial, BEFORE the collision. Subscript **f** = final, AFTER.\nSo $m_1 v_{1i}$ is object 1\'s momentum before, and $m_2 v_{2f}$ is object 2\'s momentum after.',
        textVn: 'Chỉ số **1** hoặc **2** = vật nào.\nChỉ số **i** = ban đầu, TRƯỚC va chạm. Chỉ số **f** = cuối, SAU va chạm.\nVậy $m_1 v_{1i}$ là động lượng của vật 1 lúc trước, và $m_2 v_{2f}$ là động lượng của vật 2 lúc sau.',
      },
      {
        tone: 'plant',
        text: 'This is the ONLY collision equation you need to remember. Everything after this slide is this equation with the story put in.',
        textVn: 'Đây là phương trình va chạm DUY NHẤT em cần nhớ. Mọi thứ sau trang này chỉ là phương trình này với đề bài được đưa vào.',
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
      expEn: 'It is car **1**, and "afterwards" means AFTER the collision — final, $f$. So it is $v_{1f}$. A is car 1 BEFORE. B is car 2 after. Reading the subscripts right is half of every collision question.',
      expVn: 'Đó là xe **1**, và "sau đó" nghĩa là SAU va chạm — cuối, $f$. Vậy đó là $v_{1f}$. A là xe 1 TRƯỚC va chạm. B là xe 2 sau va chạm. Đọc đúng chỉ số là một nửa của mọi câu hỏi va chạm.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Boxes',
    dense: true,
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Block A and Block B',
    titleVn: 'Khối A và Khối B',
    content: '**Before colliding, the momentum of Block A is +15.0 kg·m/s, and Block B is −35.0 kg·m/s. After, Block A has a momentum −12.0 kg·m/s. What is the momentum of Block B after the collision?**\n\nThe question gives momenta, not masses. So write the equation with one $p$ for each $m v$.',
    contentVn: '**Trước va chạm, động lượng của khối A là +15.0 kg·m/s, và của khối B là −35.0 kg·m/s. Sau đó, khối A có động lượng −12.0 kg·m/s. Động lượng của khối B sau va chạm là bao nhiêu?**\n\nĐề bài cho động lượng, không cho khối lượng. Nên viết phương trình với một chữ $p$ thay cho mỗi $m v$.',
    steps: [
      {
        text: '**Pieces, with signs.** $p_{1i} = +15.0$, $p_{2i} = -35.0$, $p_{1f} = -12.0$ (all in kg·m/s), $p_{2f} = ?$',
        textVn: '**Các đại lượng, kèm dấu.** $p_{1i} = +15.0$, $p_{2i} = -35.0$, $p_{1f} = -12.0$ (đều là kg·m/s), $p_{2f} = ?$',
      },
      {
        text: '**Formula.** $p_{1i} + p_{2i} = p_{1f} + p_{2f}$',
        textVn: '**Công thức.** $p_{1i} + p_{2i} = p_{1f} + p_{2f}$',
      },
      {
        text: '**Rearrange.** $p_{1f}$ is ADDED to the target, so subtract it from both sides: $p_{2f} = p_{1i} + p_{2i} - p_{1f}$',
        textVn: '**Biến đổi.** $p_{1f}$ đang được CỘNG vào ẩn số, nên trừ nó ở cả hai vế: $p_{2f} = p_{1i} + p_{2i} - p_{1f}$',
      },
      {
        text: '**Substitute — every negative in brackets.** $p_{2f} = 15.0 + (-35.0) - (-12.0) = 15.0 - 35.0 + 12.0$',
        textVn: '**Thay số — mọi số âm trong ngoặc.** $p_{2f} = 15.0 + (-35.0) - (-12.0) = 15.0 - 35.0 + 12.0$',
      },
      {
        text: '**Answer.** $p_{2f} = -8.00$ kg·m/s. Check it: before, $15.0 - 35.0 = -20.0$. After, $-12.0 + (-8.00) = -20.0$. Same total.',
        textVn: '**Đáp án.** $p_{2f} = -8.00$ kg·m/s. Kiểm tra: trước, $15.0 - 35.0 = -20.0$. Sau, $-12.0 + (-8.00) = -20.0$. Cùng tổng.',
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
      expEn: 'The formula says $- p_{1f}$, and $p_{1f} = -12.0$. So it is $-(-12.0) = +12.0$. Writing the bracket, $-(-12.0)$, stops the second minus from disappearing. The $-35.0$ is right: Block B really was moving the negative way.',
      expVn: 'Công thức ghi $- p_{1f}$, và $p_{1f} = -12.0$. Nên đó là $-(-12.0) = +12.0$. Viết ngoặc, $-(-12.0)$, giúp dấu trừ thứ hai không bị mất. $-35.0$ là đúng: khối B thật sự đang đi theo hướng âm.',
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
    caption: 'Acellus has three kinds of question — collisions, inelastic collisions and recoil — but they all use ONE equation. Three phrases change it: **"at rest"** → that velocity is 0, so its term vanishes · **"stick together"** → both objects share one final velocity $v_f$ · **"recoil"** (everything starts at rest) → the whole left side is 0.',
    captionVn: 'Acellus có ba loại câu hỏi — va chạm, va chạm mềm và giật lùi — nhưng tất cả đều dùng MỘT phương trình. Ba cụm từ làm nó thay đổi: **"đứng yên"** → vận tốc đó bằng 0, nên số hạng của nó biến mất · **"dính vào nhau"** → hai vật có chung một vận tốc sau $v_f$ · **"giật lùi"** (mọi thứ bắt đầu đứng yên) → cả vế trái bằng 0.',
    activity: {
      type: 'sort',
      id: 'act_story_sort',
      prompt: 'Sort each line from an Acellus question: which story is it?',
      promptVn: 'Phân loại từng câu trong đề Acellus: đó là câu chuyện nào?',
      explain: '"At rest", "stationary" and "sitting" make ONE velocity 0 before the crash. "Stick together", "leaps into the hands of" and "move off together" give the two objects one final velocity. A rifle firing, or skaters pushing off from standing still: EVERYTHING starts at rest — that is recoil.',
      explainVn: '"Đứng yên", "không chuyển động" và "đang đậu" làm MỘT vận tốc bằng 0 trước va chạm. "Dính vào nhau", "nhảy vào vòng tay" và "cùng chuyển động" cho hai vật một vận tốc sau chung. Súng bắn, hay hai người trượt băng đẩy nhau ra từ tư thế đứng yên: MỌI THỨ bắt đầu đứng yên — đó là giật lùi.',
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
    content: 'Start from the one equation:\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$\n"Car 2 is at rest" means $v_{2i} = 0$. So $m_2 v_{2i} = m_2 \\times 0 = 0$. Car 2 brings **no momentum** into the crash, and its term vanishes:\n$$m_1 v_{1i} + \\cancel{m_2 v_{2i}} = m_1 v_{1f} + m_2 v_{2f}$$',
    contentVn: 'Bắt đầu từ phương trình duy nhất:\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$\n"Xe 2 đứng yên" nghĩa là $v_{2i} = 0$. Nên $m_2 v_{2i} = m_2 \\times 0 = 0$. Xe 2 **không mang động lượng nào** vào vụ va chạm, và số hạng của nó biến mất:\n$$m_1 v_{1i} + \\cancel{m_2 v_{2i}} = m_1 v_{1f} + m_2 v_{2f}$$',
    notes: [
      {
        tone: 'write',
        text: '**One starts at rest** ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$',
        textVn: '**Một vật đứng yên** ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$',
      },
      {
        tone: 'info',
        text: 'Only the VELOCITY is 0. Car 2 still has its mass (208 kg), and it is still on the "after" side — it moves once it is hit.',
        textVn: 'Chỉ VẬN TỐC bằng 0. Xe 2 vẫn có khối lượng của nó (208 kg), và nó vẫn còn ở vế "sau" — nó chuyển động khi bị đâm.',
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
      expEn: 'The truck is object 2, and "sitting at rest" describes it BEFORE the crash: $v_{2i} = 0$, so $m_2 v_{2i}$ vanishes. A would mean the truck is still not moving AFTER it is hit — but a truck that gets hit moves off.',
      expVn: 'Xe tải là vật 2, và "đang đứng yên" mô tả nó TRƯỚC va chạm: $v_{2i} = 0$, nên $m_2 v_{2i}$ biến mất. A nghĩa là xe tải vẫn đứng yên SAU khi bị đâm — nhưng xe tải bị đâm thì sẽ chạy đi.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'MoveHorizontal',
    dense: true,
    eyebrow: 'From your Acellus screen · "Remember to indicate east (+) or west (−)"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Nhớ ghi đông (+) hay tây (−)"',
    title: 'Car 1 Hits Car 2',
    titleVn: 'Xe 1 Đâm Vào Xe 2',
    content: '**Car 1 (331 kg) is moving east at 3.87 m/s. Car 2 (208 kg) is at rest. Car 1 collides with car 2. Afterwards, car 1 moves east at 0.888 m/s. What is the final velocity of car 2?**',
    contentVn: '**Xe 1 (331 kg) đang chạy về hướng đông với tốc độ 3.87 m/s. Xe 2 (208 kg) đang đứng yên. Xe 1 va chạm với xe 2. Sau đó, xe 1 chạy về hướng đông với tốc độ 0.888 m/s. Vận tốc sau va chạm của xe 2 là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces, with signs.** $m_1 = 331$ kg, $v_{1i} = +3.87$ m/s, $m_2 = 208$ kg, $v_{2i} = 0$ (at rest), $v_{1f} = +0.888$ m/s, $v_{2f} = ?$',
        textVn: '**Các đại lượng, kèm dấu.** $m_1 = 331$ kg, $v_{1i} = +3.87$ m/s, $m_2 = 208$ kg, $v_{2i} = 0$ (đứng yên), $v_{1f} = +0.888$ m/s, $v_{2f} = ?$',
      },
      {
        text: '**Formula, with the story put in.** Car 2 is at rest, so its term vanishes: $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$',
        textVn: '**Công thức, đã đưa đề bài vào.** Xe 2 đứng yên, nên số hạng của nó biến mất: $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$',
      },
      {
        text: '**Rearrange.** $m_1 v_{1f}$ is ADDED to the target\'s term, so subtract it: $m_1 v_{1i} - m_1 v_{1f} = m_2 v_{2f}$. Then $m_2$ multiplies the target, so divide by $m_2$: $v_{2f} = \\dfrac{m_1 v_{1i} - m_1 v_{1f}}{m_2}$',
        textVn: '**Biến đổi.** $m_1 v_{1f}$ đang được CỘNG vào số hạng chứa ẩn, nên trừ nó đi: $m_1 v_{1i} - m_1 v_{1f} = m_2 v_{2f}$. Rồi $m_2$ đang nhân với ẩn, nên chia cho $m_2$: $v_{2f} = \\dfrac{m_1 v_{1i} - m_1 v_{1f}}{m_2}$',
      },
      {
        text: '**Substitute.** $v_{2f} = \\dfrac{331 \\times 3.87 - 331 \\times 0.888}{208}$',
        textVn: '**Thay số.** $v_{2f} = \\dfrac{331 \\times 3.87 - 331 \\times 0.888}{208}$',
      },
      {
        text: '**Answer.** $v_{2f} = +4.75$ m/s. Positive: car 2 moves EAST, the way it was pushed.',
        textVn: '**Đáp án.** $v_{2f} = +4.75$ m/s. Dương: xe 2 chạy về hướng ĐÔNG, theo hướng nó bị đẩy.',
      },
    ],
    reveal: {
      label: 'When the answer comes out negative',
      labelVn: 'Khi đáp án ra số âm',
      prompt: 'A car (1250 kg) at 7.39 m/s hits a truck (5380 kg) sitting at rest. Afterwards the truck moves forward at 2.30 m/s. The same method gives the car\'s final velocity as $-2.51$ m/s. What happened?',
      promptVn: 'Một xe con (1250 kg) chạy 7.39 m/s đâm vào một xe tải (5380 kg) đang đứng yên. Sau đó xe tải chạy về phía trước với tốc độ 2.30 m/s. Cùng phương pháp đó cho vận tốc sau của xe con là $-2.51$ m/s. Chuyện gì đã xảy ra?',
      answer: '$v_{1f} = \\dfrac{m_1 v_{1i} - m_2 v_{2f}}{m_1} = \\dfrac{1250 \\times 7.39 - 5380 \\times 2.30}{1250} = -2.51$ m/s. The minus sign is not a mistake — it is the physics. The truck is over four times heavier than the car, so the car **bounced backwards** at 2.51 m/s. Type the minus sign: $+2.51$ would mean the car kept going forward.',
      answerVn: '$v_{1f} = \\dfrac{m_1 v_{1i} - m_2 v_{2f}}{m_1} = \\dfrac{1250 \\times 7.39 - 5380 \\times 2.30}{1250} = -2.51$ m/s. Dấu trừ không phải lỗi — đó là vật lý. Xe tải nặng hơn xe con hơn bốn lần, nên xe con **bật ngược lại** với tốc độ 2.51 m/s. Hãy gõ dấu trừ: $+2.51$ nghĩa là xe con vẫn tiếp tục chạy về phía trước.',
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
      expEn: 'Something is ADDED to the target\'s term, so take it away first. Then $m_2 v_{2f}$ is alone, ready to be divided by $m_2$. Dividing by $m_2$ first (A) is allowed, but it leaves a messy $\\dfrac{m_1 v_{1f}}{m_2}$ term behind. $m_1$ (C) is not even touching $v_{2f}$. Numbers (D) go in last.',
      expVn: 'Có thứ đang được CỘNG vào số hạng chứa ẩn, nên bỏ nó đi trước. Khi đó $m_2 v_{2f}$ đứng một mình, sẵn sàng để chia cho $m_2$. Chia cho $m_2$ trước (A) vẫn được, nhưng để lại số hạng $\\dfrac{m_1 v_{1f}}{m_2}$ rất rối. $m_1$ (C) thậm chí không dính gì tới $v_{2f}$. Số (D) luôn thay vào sau cùng.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'GitMerge',
    ratio: 55,
    eyebrow: 'Story 2 · the inelastic collision, derived',
    eyebrowVn: 'Câu chuyện 2 · va chạm mềm, được suy ra',
    title: 'They Stick Together',
    titleVn: 'Chúng Dính Vào Nhau',
    inlineSvg: DIAGRAMS.STICK_TOGETHER,
    content: 'When two objects **stick together**, they move off as one lump. So after the crash they have the **same** velocity. Call it $v_f$: $v_{1f} = v_{2f} = v_f$.\n\nPut $v_f$ into the one equation for both:\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$$\nNow $v_f$ is in **both** terms on the right. Take it out as a common factor (the next slide shows how):\n$$m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$$',
    contentVn: 'Khi hai vật **dính vào nhau**, chúng chuyển động như một khối. Nên sau va chạm chúng có **cùng** vận tốc. Gọi nó là $v_f$: $v_{1f} = v_{2f} = v_f$.\n\nThay $v_f$ vào phương trình duy nhất cho cả hai:\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$$\nGiờ $v_f$ nằm trong **cả hai** số hạng ở vế phải. Đặt nó ra làm nhân tử chung (trang sau chỉ cách làm):\n$$m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$$',
    notes: [
      {
        tone: 'write',
        text: '**Stick together** (perfectly inelastic, $v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$',
        textVn: '**Dính vào nhau** (va chạm mềm, $v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$',
      },
      {
        tone: 'info',
        text: 'Read the right side as a sentence: the total mass $(m_1 + m_2)$, moving at one velocity $v_f$. Stuck together, the two objects really ARE one object.',
        textVn: 'Đọc vế phải như một câu: tổng khối lượng $(m_1 + m_2)$, chuyển động với một vận tốc $v_f$. Khi dính vào nhau, hai vật thực sự LÀ một vật.',
      },
    ],
  },

  {
    layout: 'stack',
    accent: GREEN,
    icon: 'Brackets',
    columns: 2,
    eyebrow: 'The one new algebra move in this lesson',
    eyebrowVn: 'Phép biến đổi đại số mới duy nhất của bài này',
    title: 'Factoring: Take the Common Letter Out',
    titleVn: 'Đặt Nhân Tử Chung: Đưa Chữ Chung Ra Ngoài',
    content: 'Factoring is **expanding backwards**. Expand $(m_1 + m_2)\\,v_f$ and you get $m_1 v_f + m_2 v_f$. The two are always equal, so you can swap one for the other.\n\nWhy do it? In $m_1 v_f + m_2 v_f$ the unknown $v_f$ appears **twice**, and no single move can free it. After factoring, it appears **once**, multiplied by a bracket — and multiplying is undone by dividing.',
    contentVn: 'Đặt nhân tử chung là **nhân phá ngoặc theo chiều ngược lại**. Nhân phá $(m_1 + m_2)\\,v_f$ thì được $m_1 v_f + m_2 v_f$. Hai biểu thức luôn bằng nhau, nên em có thể đổi cái này thành cái kia.\n\nĐể làm gì? Trong $m_1 v_f + m_2 v_f$, ẩn $v_f$ xuất hiện **hai lần**, và không một bước nào giải phóng được nó. Sau khi đặt nhân tử chung, nó chỉ xuất hiện **một lần**, nhân với một ngoặc — và phép nhân được hoàn tác bằng phép chia.',
    notes: [
      {
        tone: 'write',
        text: '**Factor:** $m_1 v_f + m_2 v_f = (m_1 + m_2)\\,v_f$ — check it by expanding the bracket.',
        textVn: '**Đặt nhân tử chung:** $m_1 v_f + m_2 v_f = (m_1 + m_2)\\,v_f$ — kiểm tra bằng cách nhân phá ngoặc.',
      },
      {
        tone: 'write',
        text: 'Then divide both sides by the **WHOLE** bracket: $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$',
        textVn: 'Rồi chia cả hai vế cho **CẢ** ngoặc: $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$',
      },
      {
        tone: 'homework',
        text: 'Dividing by $m_1$ alone does NOT work: $m_1$ is in only one of the two terms. What you divide by must multiply EVERYTHING on that side.',
        textVn: 'Chỉ chia cho $m_1$ là KHÔNG được: $m_1$ chỉ nằm trong một trong hai số hạng. Thứ em chia phải nhân với TẤT CẢ ở vế đó.',
      },
      {
        tone: 'plant',
        text: 'Factor only when the **unknown** is in both terms. If the unknown is a mass, it is in one term only — no factoring needed. (The sticky ball, coming up, is one of these.)',
        textVn: 'Chỉ đặt nhân tử chung khi **ẩn số** nằm trong cả hai số hạng. Nếu ẩn là một khối lượng, nó chỉ nằm trong một số hạng — không cần đặt nhân tử chung. (Bài quả bóng dính, sắp tới, là một bài như vậy.)',
      },
    ],
    activity: {
      type: 'order',
      id: 'act_stick_order',
      prompt: 'Two objects stick together. Put the moves in order to find $v_f$, starting from the one equation.',
      promptVn: 'Hai vật dính vào nhau. Sắp xếp các bước theo thứ tự để tìm $v_f$, bắt đầu từ phương trình duy nhất.',
      explain: 'First put the story in: both final velocities become $v_f$. Then factor, so $v_f$ appears once. Then divide by the WHOLE bracket. The numbers go in last — letters first, always.',
      explainVn: 'Đầu tiên đưa đề bài vào: cả hai vận tốc sau thành $v_f$. Rồi đặt nhân tử chung, để $v_f$ chỉ xuất hiện một lần. Rồi chia cho CẢ ngoặc. Các con số thay vào sau cùng — luôn luôn chữ trước.',
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
    dense: true,
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Two Meteors Stick Together',
    titleVn: 'Hai Thiên Thạch Dính Vào Nhau',
    content: '**An incoming meteor with mass 65.4 kg and velocity +12.46 km/s overtakes another meteor with mass 32.1 kg and velocity +8.56 km/s. The two meteors stick together. What is their velocity?**\n\nThe speeds are in km/s. Change them to m/s first (× 1000).',
    contentVn: '**Một thiên thạch khối lượng 65.4 kg với vận tốc +12.46 km/s đuổi kịp một thiên thạch khác khối lượng 32.1 kg với vận tốc +8.56 km/s. Hai thiên thạch dính vào nhau. Vận tốc của chúng là bao nhiêu?**\n\nTốc độ đang tính bằng km/s. Đổi sang m/s trước (× 1000).',
    steps: [
      {
        text: '**Pieces, in m/s.** $m_1 = 65.4$ kg, $v_{1i} = 12.46$ km/s $= 12{,}460$ m/s, $m_2 = 32.1$ kg, $v_{2i} = 8.56$ km/s $= 8560$ m/s, $v_f = ?$',
        textVn: '**Các đại lượng, đổi sang m/s.** $m_1 = 65.4$ kg, $v_{1i} = 12.46$ km/s $= 12{,}460$ m/s, $m_2 = 32.1$ kg, $v_{2i} = 8.56$ km/s $= 8560$ m/s, $v_f = ?$',
      },
      {
        text: '**Formula, with the story put in.** They stick together: $m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$',
        textVn: '**Công thức, đã đưa đề bài vào.** Chúng dính vào nhau: $m_1 v_{1i} + m_2 v_{2i} = m_1 v_f + m_2 v_f$',
      },
      {
        text: '**Rearrange.** Factor: $(m_1 + m_2)\\,v_f$. Then divide by the whole bracket: $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$',
        textVn: '**Biến đổi.** Đặt nhân tử chung: $(m_1 + m_2)\\,v_f$. Rồi chia cho cả ngoặc: $v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}$',
      },
      {
        text: '**Substitute.** $v_f = \\dfrac{65.4 \\times 12460 + 32.1 \\times 8560}{65.4 + 32.1} = \\dfrac{1{,}089{,}660}{97.5}$',
        textVn: '**Thay số.** $v_f = \\dfrac{65.4 \\times 12460 + 32.1 \\times 8560}{65.4 + 32.1} = \\dfrac{1{,}089{,}660}{97.5}$',
      },
      {
        text: '**Answer.** $v_f = 11{,}200$ m/s $= 11.2$ km/s (÷ 1000 to go back to km/s). Sense check: it is between the two starting speeds, and closer to the heavier meteor\'s.',
        textVn: '**Đáp án.** $v_f = 11{,}200$ m/s $= 11.2$ km/s (÷ 1000 để đổi lại km/s). Kiểm tra: nó nằm giữa hai tốc độ ban đầu, và gần tốc độ của thiên thạch nặng hơn.',
      },
    ],
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
      expEn: '$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} = \\dfrac{3.0 \\times 4.0 + 1.0 \\times 0}{3.0 + 1.0} = \\dfrac{12}{4.0} = 3.0$ m/s. C forgot to divide by the bracket. B took the average of the two velocities. A says nothing slowed down — but now 4.0 kg is carrying the momentum that 3.0 kg had.',
      expVn: '$v_f = \\dfrac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} = \\dfrac{3.0 \\times 4.0 + 1.0 \\times 0}{3.0 + 1.0} = \\dfrac{12}{4.0} = 3.0$ m/s. C quên chia cho ngoặc. B lấy trung bình của hai vận tốc. A nghĩa là không có gì chậm lại — nhưng giờ 4.0 kg phải mang lượng động lượng mà trước đó 3.0 kg mang.',
    },
  },

  {
    layout: 'steps',
    accent: AMBER,
    icon: 'AlertTriangle',
    dense: true,
    eyebrow: 'From your Acellus screen · when factoring is not needed',
    eyebrowVn: 'Từ màn hình Acellus của em · khi nào không cần đặt nhân tử chung',
    title: 'The Mass of the Sticky Ball',
    titleVn: 'Khối Lượng Của Quả Bóng Dính',
    content: '**A 0.982 kg bouncy ball moving +0.246 m/s makes a head-on inelastic collision with a stationary sticky ball. After, they move +0.151 m/s. What is the mass of the sticky ball?**\n\nTwo clues this time: "stationary" (it starts at rest) and "they move" (one final velocity). And the unknown is a **mass**.',
    contentVn: '**Một quả bóng nảy 0.982 kg chuyển động +0.246 m/s va chạm mềm trực diện với một quả bóng dính đang đứng yên. Sau đó, chúng chuyển động +0.151 m/s. Khối lượng của quả bóng dính là bao nhiêu?**\n\nLần này có hai manh mối: "đứng yên" (nó bắt đầu đứng yên) và "chúng chuyển động" (một vận tốc sau chung). Và ẩn số là một **khối lượng**.',
    steps: [
      {
        text: '**Pieces.** $m_1 = 0.982$ kg, $v_{1i} = +0.246$ m/s, $v_{2i} = 0$ (stationary), $v_f = +0.151$ m/s, $m_2 = ?$',
        textVn: '**Các đại lượng.** $m_1 = 0.982$ kg, $v_{1i} = +0.246$ m/s, $v_{2i} = 0$ (đứng yên), $v_f = +0.151$ m/s, $m_2 = ?$',
      },
      {
        text: '**Formula, with BOTH clues put in.** $v_{2i} = 0$ removes a term, and $v_{1f} = v_{2f} = v_f$: $m_1 v_{1i} = m_1 v_f + m_2 v_f$',
        textVn: '**Công thức, đã đưa CẢ HAI manh mối vào.** $v_{2i} = 0$ làm mất một số hạng, và $v_{1f} = v_{2f} = v_f$: $m_1 v_{1i} = m_1 v_f + m_2 v_f$',
      },
      {
        text: '**Rearrange — no factoring needed.** The unknown $m_2$ is in only ONE term. Subtract $m_1 v_f$: $m_1 v_{1i} - m_1 v_f = m_2 v_f$. Divide by $v_f$: $m_2 = \\dfrac{m_1 v_{1i} - m_1 v_f}{v_f}$',
        textVn: '**Biến đổi — không cần đặt nhân tử chung.** Ẩn $m_2$ chỉ nằm trong MỘT số hạng. Trừ $m_1 v_f$: $m_1 v_{1i} - m_1 v_f = m_2 v_f$. Chia cho $v_f$: $m_2 = \\dfrac{m_1 v_{1i} - m_1 v_f}{v_f}$',
      },
      {
        text: '**Substitute.** $m_2 = \\dfrac{0.982 \\times 0.246 - 0.982 \\times 0.151}{0.151}$',
        textVn: '**Thay số.** $m_2 = \\dfrac{0.982 \\times 0.246 - 0.982 \\times 0.151}{0.151}$',
      },
      {
        text: '**Answer.** $m_2 = 0.618$ kg.',
        textVn: '**Đáp án.** $m_2 = 0.618$ kg.',
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
      expEn: 'Factor to bring the unknown together into ONE place. In the sticky-ball question $v_f$ is in two terms, but it is not the unknown — so factoring it (A and B) only hides $m_2$ inside a bracket and adds a move. Factoring never changes the equation (D): expanding gives back exactly what you had.',
      expVn: 'Đặt nhân tử chung để gom ẩn số về MỘT chỗ. Trong bài quả bóng dính, $v_f$ nằm trong hai số hạng, nhưng nó không phải ẩn số — nên đặt nhân tử chung (A và B) chỉ giấu $m_2$ vào trong ngoặc và thêm một bước. Đặt nhân tử chung không bao giờ làm thay đổi phương trình (D): nhân phá ngoặc sẽ trả lại đúng như cũ.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Users',
    dense: true,
    eyebrow: 'From your Acellus screen · "Remember: right is +, left is −"',
    eyebrowVn: 'Từ màn hình Acellus của em · "Nhớ: phải là +, trái là −"',
    title: 'Anna Leaps Into Paul\'s Hands',
    titleVn: 'Anna Nhảy Vào Vòng Tay Paul',
    content: '**A 52.3 kg ice skater, Anna, is skating −12.0 m/s and leaps into the hands of a 102 kg skater, Paul. Afterward, they move at −2.33 m/s. What was Paul\'s velocity before the collision?**\n\nThis time the unknown is BEFORE the collision, on the left side. It is in one term only, so no factoring.',
    contentVn: '**Một vận động viên trượt băng 52.3 kg, Anna, đang trượt với vận tốc −12.0 m/s và nhảy vào vòng tay của Paul, nặng 102 kg. Sau đó, họ chuyển động với vận tốc −2.33 m/s. Vận tốc của Paul trước va chạm là bao nhiêu?**\n\nLần này ẩn số nằm TRƯỚC va chạm, ở vế trái. Nó chỉ nằm trong một số hạng, nên không cần đặt nhân tử chung.',
    steps: [
      {
        text: '**Pieces, with signs.** Anna: $m_1 = 52.3$ kg, $v_{1i} = -12.0$ m/s. Paul: $m_2 = 102$ kg, $v_{2i} = ?$ Together after: $v_f = -2.33$ m/s.',
        textVn: '**Các đại lượng, kèm dấu.** Anna: $m_1 = 52.3$ kg, $v_{1i} = -12.0$ m/s. Paul: $m_2 = 102$ kg, $v_{2i} = ?$ Cùng nhau sau va chạm: $v_f = -2.33$ m/s.',
      },
      {
        text: '**Formula, with the story put in.** She lands in his hands, so they stick together: $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$',
        textVn: '**Công thức, đã đưa đề bài vào.** Anna nhảy vào tay Paul, nên họ dính vào nhau: $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$',
      },
      {
        text: '**Rearrange.** Subtract $m_1 v_{1i}$: $m_2 v_{2i} = (m_1 + m_2)\\,v_f - m_1 v_{1i}$. Divide by $m_2$: $v_{2i} = \\dfrac{(m_1 + m_2)\\,v_f - m_1 v_{1i}}{m_2}$',
        textVn: '**Biến đổi.** Trừ $m_1 v_{1i}$: $m_2 v_{2i} = (m_1 + m_2)\\,v_f - m_1 v_{1i}$. Chia cho $m_2$: $v_{2i} = \\dfrac{(m_1 + m_2)\\,v_f - m_1 v_{1i}}{m_2}$',
      },
      {
        text: '**Substitute — negatives in brackets.** $v_{2i} = \\dfrac{154.3 \\times (-2.33) - 52.3 \\times (-12.0)}{102} = \\dfrac{-359.5 + 627.6}{102}$',
        textVn: '**Thay số — số âm trong ngoặc.** $v_{2i} = \\dfrac{154.3 \\times (-2.33) - 52.3 \\times (-12.0)}{102} = \\dfrac{-359.5 + 627.6}{102}$',
      },
      {
        text: '**Answer.** $v_{2i} = +2.63$ m/s. Positive: Paul was skating RIGHT, toward Anna. Anna brought more momentum, so together they end up moving left.',
        textVn: '**Đáp án.** $v_{2i} = +2.63$ m/s. Dương: Paul đang trượt sang PHẢI, về phía Anna. Anna mang nhiều động lượng hơn, nên cuối cùng cả hai đi sang trái.',
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
      expEn: 'The same moves as Anna and Paul, with the snowball as object 1: $v_{1i} = \\dfrac{(m_1 + m_2)\\,v_f - m_2 v_{2i}}{m_1} = \\dfrac{3.089 \\times (-1.92) - 2.89 \\times (-0.523)}{0.199} = -22.2$ m/s — west, as the question said. B lost the direction. C used $+0.523$ for the box, which was also going west. D left out the box\'s momentum.',
      expVn: 'Cùng các bước như bài Anna và Paul, với quả cầu tuyết là vật 1: $v_{1i} = \\dfrac{(m_1 + m_2)\\,v_f - m_2 v_{2i}}{m_1} = \\dfrac{3.089 \\times (-1.92) - 2.89 \\times (-0.523)}{0.199} = -22.2$ m/s — hướng tây, đúng như đề bài nói. B làm mất hướng. C dùng $+0.523$ cho cái hộp, dù nó cũng đang đi về hướng tây. D bỏ quên động lượng của cái hộp.',
    },
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'Crosshair',
    ratio: 55,
    eyebrow: 'Story 3 · recoil, derived — the minus sign appears by itself',
    eyebrowVn: 'Câu chuyện 3 · giật lùi, được suy ra — dấu trừ tự xuất hiện',
    title: 'Recoil: Everything Starts at Rest',
    titleVn: 'Giật Lùi: Mọi Thứ Bắt Đầu Đứng Yên',
    inlineSvg: DIAGRAMS.RECOIL,
    content: 'A rifle fires a bullet. Before it fires, **nothing is moving**: $v_{1i} = v_{2i} = 0$. Both terms on the left vanish, so the whole left side is 0:\n$$0 = m_1 v_{1f} + m_2 v_{2f}$$\nSubtract $m_1 v_{1f}$ from both sides:\n$$-m_1 v_{1f} = m_2 v_{2f}$$\nA minus sign has appeared **on its own**. The two momenta are the same size but **opposite**: the bullet goes forward, and the rifle kicks back.',
    contentVn: 'Một khẩu súng trường bắn một viên đạn. Trước khi bắn, **không có gì chuyển động**: $v_{1i} = v_{2i} = 0$. Cả hai số hạng ở vế trái biến mất, nên cả vế trái bằng 0:\n$$0 = m_1 v_{1f} + m_2 v_{2f}$$\nTrừ $m_1 v_{1f}$ ở cả hai vế:\n$$-m_1 v_{1f} = m_2 v_{2f}$$\nMột dấu trừ đã **tự xuất hiện**. Hai động lượng có cùng độ lớn nhưng **ngược chiều**: viên đạn bay về phía trước, còn khẩu súng giật lùi.',
    notes: [
      {
        tone: 'write',
        text: '**Recoil** (everything at rest before, $v_{1i} = v_{2i} = 0$): $0 = m_1 v_{1f} + m_2 v_{2f}$',
        textVn: '**Giật lùi** (mọi thứ đứng yên lúc đầu, $v_{1i} = v_{2i} = 0$): $0 = m_1 v_{1f} + m_2 v_{2f}$',
      },
    ],
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Target',
    dense: true,
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Rifle Kicks Back',
    titleVn: 'Khẩu Súng Giật Lùi',
    content: '**A 4.50 kg rifle fires a 0.0100 kg bullet at +385 m/s. What is the recoil velocity of the rifle?**\n\nBullet = object 1, rifle = object 2.',
    contentVn: '**Một khẩu súng trường 4.50 kg bắn một viên đạn 0.0100 kg với vận tốc +385 m/s. Vận tốc giật lùi của khẩu súng là bao nhiêu?**\n\nViên đạn = vật 1, khẩu súng = vật 2.',
    steps: [
      {
        text: '**Pieces, with signs.** Bullet: $m_1 = 0.0100$ kg, $v_{1f} = +385$ m/s. Rifle: $m_2 = 4.50$ kg, $v_{2f} = ?$ Both at rest before the shot.',
        textVn: '**Các đại lượng, kèm dấu.** Viên đạn: $m_1 = 0.0100$ kg, $v_{1f} = +385$ m/s. Khẩu súng: $m_2 = 4.50$ kg, $v_{2f} = ?$ Cả hai đứng yên trước khi bắn.',
      },
      {
        text: '**Formula, with the story put in.** Recoil: $0 = m_1 v_{1f} + m_2 v_{2f}$',
        textVn: '**Công thức, đã đưa đề bài vào.** Giật lùi: $0 = m_1 v_{1f} + m_2 v_{2f}$',
      },
      {
        text: '**Rearrange.** Subtract $m_1 v_{1f}$: $-m_1 v_{1f} = m_2 v_{2f}$. Divide by $m_2$: $v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2}$',
        textVn: '**Biến đổi.** Trừ $m_1 v_{1f}$: $-m_1 v_{1f} = m_2 v_{2f}$. Chia cho $m_2$: $v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2}$',
      },
      {
        text: '**Substitute.** $v_{2f} = -\\dfrac{0.0100 \\times 385}{4.50}$',
        textVn: '**Thay số.** $v_{2f} = -\\dfrac{0.0100 \\times 385}{4.50}$',
      },
      {
        text: '**Answer.** $v_{2f} = -0.856$ m/s. Negative: the rifle kicks BACK. It is 450 times heavier than the bullet, so it moves 450 times more slowly.',
        textVn: '**Đáp án.** $v_{2f} = -0.856$ m/s. Âm: khẩu súng giật NGƯỢC lại. Nó nặng gấp 450 lần viên đạn, nên nó chuyển động chậm hơn 450 lần.',
      },
    ],
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
      expEn: 'The 45.0 kg skater is object 1: $v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2} = -\\dfrac{45.0 \\times 2.40}{60.0} = -1.80$ m/s. The heavier skater goes the other way, more slowly. A lost the minus sign — from rest, the two cannot go the same way. B has the masses the wrong way up. D: the TOTAL is zero, but $+108$ and $-108$ add up to zero with both skaters moving.',
      expVn: 'Người 45.0 kg là vật 1: $v_{2f} = -\\dfrac{m_1 v_{1f}}{m_2} = -\\dfrac{45.0 \\times 2.40}{60.0} = -1.80$ m/s. Người nặng hơn đi theo hướng ngược lại, chậm hơn. A mất dấu trừ — từ trạng thái đứng yên, hai người không thể đi cùng một hướng. B đặt khối lượng lộn ngược. D: TỔNG bằng không, nhưng $+108$ và $-108$ cộng lại bằng không trong khi cả hai đều chuyển động.',
    },
  },

  {
    layout: 'stack',
    accent: RED,
    icon: 'PenLine',
    columns: 2,
    eyebrow: 'Your formula page — check your notebook against this',
    eyebrowVn: 'Trang công thức của em — đối chiếu vở với trang này',
    title: 'The Whole Lesson on One Page',
    titleVn: 'Cả Bài Trên Một Trang',
    content: 'Eight lines. Only line 5 is a collision equation to remember — lines 6, 7 and 8 are line 5 with a story put in. Next to each line, write **when** to use it.',
    contentVn: 'Tám dòng. Chỉ dòng 5 là phương trình va chạm cần nhớ — dòng 6, 7 và 8 là dòng 5 với đề bài được đưa vào. Bên cạnh mỗi dòng, ghi **khi nào** dùng nó.',
    notes: [
      { tone: 'write', text: '**1.** $p = m v$ — the momentum of ONE object.', textVn: '**1.** $p = m v$ — động lượng của MỘT vật.' },
      { tone: 'write', text: '**2.** Signs: right / east = $+$, left / west = $-$. A velocity is a number WITH its sign.', textVn: '**2.** Dấu: phải / đông = $+$, trái / tây = $-$. Vận tốc là con số KÈM dấu.' },
      { tone: 'write', text: '**3.** $J = F \\Delta t$ — a force acting for a time.', textVn: '**3.** $J = F \\Delta t$ — một lực tác dụng trong một khoảng thời gian.' },
      { tone: 'write', text: '**4.** $F \\Delta t = m (v_f - v_i)$ — a push changes ONE object\'s velocity (a bat, a bounce). $\\Delta v$ is final MINUS initial.', textVn: '**4.** $F \\Delta t = m (v_f - v_i)$ — một cú đẩy làm thay đổi vận tốc của MỘT vật (cây gậy, cú nảy). $\\Delta v$ là cuối TRỪ đầu.' },
      { tone: 'write', text: '**5.** $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$ — EVERY collision.', textVn: '**5.** $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$ — MỌI va chạm.' },
      { tone: 'write', text: '**6.** "At rest" ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$', textVn: '**6.** "Đứng yên" ($v_{2i} = 0$): $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$' },
      { tone: 'write', text: '**7.** "Stick together" ($v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$', textVn: '**7.** "Dính vào nhau" ($v_{1f} = v_{2f} = v_f$): $m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)\\,v_f$' },
      { tone: 'write', text: '**8.** "Recoil" — everything at rest before: $0 = m_1 v_{1f} + m_2 v_{2f}$', textVn: '**8.** "Giật lùi" — mọi thứ đứng yên lúc đầu: $0 = m_1 v_{1f} + m_2 v_{2f}$' },
      { tone: 'info', text: '**Units:** $p$ in kg·m/s · $J$ in N·s (the same thing) · $F$ in N · $\\Delta t$ in s · km/s × 1000 → m/s', textVn: '**Đơn vị:** $p$ tính bằng kg·m/s · $J$ bằng N·s (cùng một thứ) · $F$ bằng N · $\\Delta t$ bằng s · km/s × 1000 → m/s' },
      { tone: 'info', text: '**Algebra:** a negative number goes in brackets · minus a minus is a plus · factor only when the UNKNOWN is in two terms, then divide by the WHOLE bracket', textVn: '**Đại số:** số âm đặt trong ngoặc · trừ một số âm là cộng · chỉ đặt nhân tử chung khi ẨN SỐ nằm trong hai số hạng, rồi chia cho CẢ ngoặc' },
    ],
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The four mistakes that lose marks in this lesson',
    eyebrowVn: 'Bốn lỗi làm mất điểm trong bài này',
    title: 'Watch Out',
    titleVn: 'Cẩn Thận',
    content: 'Before you type an answer into the green box, check all four.',
    contentVn: 'Trước khi gõ đáp án vào ô xanh, hãy kiểm tra đủ bốn điều.',
    notes: [
      { tone: 'homework', text: '**1. A lost sign.** Something moving left or west went in as positive — or the answer\'s minus sign was left out of the box. "Remember to indicate the direction" means: type the minus.', textVn: '**1. Mất dấu.** Một vật đi sang trái hay sang tây lại được thay bằng số dương — hoặc dấu trừ của đáp án bị bỏ khỏi ô. "Nhớ ghi hướng" nghĩa là: gõ dấu trừ.' },
      { tone: 'homework', text: '**2. Minus a minus.** $37.0 - (-41.0)$ is $78.0$, not $-4.0$. Write the brackets, and type them into the calculator too.', textVn: '**2. Trừ một số âm.** $37.0 - (-41.0)$ là $78.0$, không phải $-4.0$. Viết ngoặc, và gõ cả ngoặc vào máy tính.' },
      { tone: 'homework', text: '**3. The wrong divide.** In the stick-together equation, divide by the WHOLE bracket $(m_1 + m_2)$ — never by $m_1$ alone. And factor only when the unknown is in both terms.', textVn: '**3. Chia sai.** Trong phương trình dính vào nhau, chia cho CẢ ngoặc $(m_1 + m_2)$ — không bao giờ chỉ chia cho $m_1$. Và chỉ đặt nhân tử chung khi ẩn số nằm trong cả hai số hạng.' },
      { tone: 'homework', text: '**4. Before and after mixed up.** "At rest" describes BEFORE the crash ($v_{2i} = 0$), not after. Before you write a subscript, ask: which object (1 or 2)? Which time (i or f)?', textVn: '**4. Nhầm trước và sau.** "Đứng yên" mô tả TRƯỚC va chạm ($v_{2i} = 0$), không phải sau. Trước khi viết chỉ số, hãy hỏi: vật nào (1 hay 2)? Thời điểm nào (i hay f)?' },
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
      { text: 'Turn "stick together" into one $v_f$, factor it out, and divide by $(m_1 + m_2)$', textVn: 'Biến "dính vào nhau" thành một $v_f$, đặt nhân tử chung, rồi chia cho $(m_1 + m_2)$' },
      { text: 'Find an unknown mass by subtracting then dividing — no factoring needed', textVn: 'Tìm một khối lượng chưa biết bằng cách trừ rồi chia — không cần đặt nhân tử chung' },
      { text: 'Explain the minus sign in a recoil: the two objects move in opposite directions', textVn: 'Giải thích dấu trừ trong giật lùi: hai vật chuyển động ngược chiều nhau' },
    ],
  },
];
