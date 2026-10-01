// src/data/PHYSICS/PHY_ROT/notes.js
// Acellus Physics: Rotation & Angular Momentum — the lesson deck.
//
// WHO IT IS FOR. The same student as PHY_CIRC and PHY_MOM, one module on,
// still losing most of her marks to the algebra rather than the physics. This
// module looks like a wall of new Greek letters — θ, ω, α, τ, I, L — and a
// dozen new formulas. So the deck is built on four rules.
//   · NOTHING IS NEW. Rotation is moving-in-a-line with the letters swapped
//     (x → θ, v → ω, a → α, m → I, F → τ, p → L). The swap is the second idea
//     in the deck ("Same Motion, New Letters") and the second-last ("Every
//     Rotation Formula Is One You Already Know"), and each formula is
//     introduced as the twin of one she has met.
//   · CHOOSE BY THE MISSING LETTER. Four kinematics equations, each leaving
//     out one of ωᵢ, ω_f, α, t, θ — pick the one that leaves out the letter
//     the question never mentions. A sort activity drills it on her own items.
//   · UNITS FIRST. A turn is 2π rad, a diameter is twice the radius, a cm is
//     a hundredth of a metre, and the calculator must be in DEG for sin θ.
//     Each trap has a reveal on the item where it bites.
//   · BALANCE BY CHOOSING THE PIVOT. Put it on the support you are not asked
//     about and its torque is 0 — it vanishes, as "at rest" did in momentum.
//   · The five-line method from PHY_MOM, before any worked example, with the
//     SAME five labels on every worked example: Pieces · Formula · Rearrange ·
//     Substitute · Answer. The worked examples ARE her Acellus items
//     (physics.docx, 2026-10-01); the last three lessons of the module
//     (dynamics, rotational KE, angular momentum) she has not reached, so
//     their examples are written in the Acellus style and say so.
//
// THE SPINE:
//   1–4    hook (who goes further?); radians and CCW +; the swap.
//   5–10   kinematics: the four equations; choose by the missing letter
//          (sort); the method (the wheel); the barrel ×2; from rest.
//   11–14  centre → edge × r; the unit traps (sort); the bus; the lazy susan.
//   15–16  torque: τ = rF sin θ; the door (RAD-mode reveal).
//   17–23  equilibrium: balanced; the teeter-totter; choose the pivot (order);
//          the sawhorses; Ann and Bob; Alex and Ben; the drawbridge.
//   24–25  moment of inertia: mass AND where it is; the rod and weight.
//   26–31  τ = Iα; the disk; ½Iω²; arms in (predict); L = Iω conserved; the skater.
//   32–35  the swap complete; the formula page; the five mistakes; the recap.
//
// Every formula-page line is on an orange "Write this down" card somewhere in
// the deck. No steps slide carries a diagram AND a check (the door, the
// sawhorses and the drawbridge keep their diagrams and lose their checks); a
// split slide that keeps its check stays at ratio 40.
//
// House notes:
//  · BILINGUAL. PHYSICS declares `bilingual: true`; every learner-facing string
//    carries a `vn*` twin and the validator enforces it.
//  · `$$…$$` only in `content`, callout bodies and `reveal.answer`. Inline
//    `$…$` everywhere else (steps, notes, statement text, checks).
//  · Layout `title` and hero `objective` are plain text.
//  · `check` / `activity` is always the LAST key on its slide (narration stops
//    there). Activity strings use `name`/`explain`, never `text`.
//  · Numbers agree with the Isolate It task, which derives them (g = 9.8).
//  · Never refer to a slide by number in learner text — say its title.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0d9488';
const BLUE = '#3b82f6';
const PURPLE = '#a855f7';
const RED = '#ef4444';
const GREEN = '#10b981';
const AMBER = '#d97706';
const INDIGO = '#4f46e5';

export const notes = [
  {
    layout: 'hero',
    color: '#0f766e',
    icon: 'RotateCcw',
    brand: 'Acellus Physics',
    brandVn: 'Acellus Vật lý',
    eyebrow: 'Spinning · torque · balance · angular momentum',
    eyebrowVn: 'Chuyển động quay · mômen lực · cân bằng · mômen động lượng',
    title: 'Rotation & Angular Momentum',
    titleVn: 'Chuyển Động Quay & Mômen Động Lượng',
    objective: 'I can solve spinning, turning and balancing problems with formulas I already know — the same algebra with new letters — and I change every turn into radians first.',
    objectiveVn: 'Em có thể giải các bài về quay, xoay và cân bằng bằng những công thức em đã biết — cùng phép biến đổi, chỉ đổi chữ cái — và em đổi mọi số vòng sang radian trước tiên.',
    warmUp: 'Push a door open near the hinge, then near the handle. Which is easier? Why do you think that is? Write one sentence.',
    warmUpVn: 'Đẩy một cánh cửa ở gần bản lề, rồi ở gần tay nắm. Chỗ nào dễ hơn? Em nghĩ vì sao? Viết một câu.',
  },

  {
    layout: 'statement',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Before any formula',
    eyebrowVn: 'Trước khi có công thức nào',
    title: 'Who Goes Further?',
    titleVn: 'Ai Đi Xa Hơn?',
    label: 'Think first',
    labelVn: 'Suy nghĩ trước',
    labelIcon: 'Lightbulb',
    text: 'Two kids ride a merry-go-round. Mai sits near the centre. Linh sits at the edge. After one full turn, who has travelled further? Who has turned through a bigger angle?',
    textVn: 'Hai bạn nhỏ ngồi trên vòng quay ngựa gỗ. Mai ngồi gần tâm. Linh ngồi ở mép. Sau một vòng đầy đủ, ai đã đi được quãng đường xa hơn? Ai đã quay được một góc lớn hơn?',
    sub: 'Two questions, two different answers. Decide before you look.',
    subVn: 'Hai câu hỏi, hai đáp án khác nhau. Hãy quyết định trước khi xem.',
    reveal: {
      label: 'Show the answer',
      labelVn: 'Xem đáp án',
      prompt: 'Think about the size of each girl\'s circle, and about how many turns each one made.',
      promptVn: 'Nghĩ về độ lớn vòng tròn của mỗi bạn, và mỗi bạn đã quay bao nhiêu vòng.',
      answer: 'Linh, at the edge, travels much **further** — her circle is bigger. But they both turned through the **same angle**: one full turn. On a spinning thing, every point shares ONE angle and ONE turning speed. That is why rotation is measured with **angles**, not metres.',
      answerVn: 'Linh, ở mép, đi được quãng đường **xa hơn** nhiều — vòng tròn của bạn ấy lớn hơn. Nhưng cả hai đều quay được **cùng một góc**: một vòng đầy đủ. Trên một vật đang quay, mọi điểm có chung MỘT góc và MỘT tốc độ quay. Vì vậy chuyển động quay được đo bằng **góc**, không phải bằng mét.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'RotateCcw',
    ratio: 40,
    eyebrow: 'The unit for angles, and which way is +',
    eyebrowVn: 'Đơn vị của góc, và chiều nào là +',
    title: 'Turns, Radians and Signs',
    titleVn: 'Vòng, Radian và Dấu',
    inlineSvg: DIAGRAMS.RADIAN_TURN,
    content: 'Physics measures angles in **radians** (rad), not degrees. One full turn is $2\\pi$ radians — about 6.28.\n\nAcellus often gives turns as **revolutions** or **rotations**. Every rotation formula needs radians, so change turns into radians FIRST: multiply by $2\\pi$.\n\nA turn has a direction too. Acellus says: **"CCW is +, CW is −"**.',
    contentVn: 'Vật lý đo góc bằng **radian** (rad), không phải bằng độ. Một vòng đầy đủ là $2\\pi$ radian — khoảng 6.28.\n\nAcellus thường cho số vòng dưới dạng **revolutions** hoặc **rotations** (vòng quay). Mọi công thức quay đều cần radian, nên đổi số vòng sang radian TRƯỚC TIÊN: nhân với $2\\pi$.\n\nMột chuyển động quay cũng có chiều. Acellus ghi: **"CCW là +, CW là −"**.',
    notes: [
      {
        tone: 'write',
        text: '**1 turn = $2\\pi$ rad.** Revolutions or rotations × $2\\pi$ → radians.\n**Signs:** counterclockwise (CCW) = $+$ · clockwise (CW) = $-$',
        textVn: '**1 vòng = $2\\pi$ rad.** Số vòng × $2\\pi$ → radian.\n**Dấu:** ngược chiều kim đồng hồ (CCW) = $+$ · cùng chiều kim đồng hồ (CW) = $-$',
      },
    ],
    check: {
      id: 'chk_rot_to_rad',
      q: 'A merry-go-round makes 2.00 rotations. How many radians is that?',
      qVn: 'Một vòng quay ngựa gỗ quay được 2.00 vòng. Như vậy là bao nhiêu radian?',
      options: [
        { val: 'A', text: '$2.00$ rad', textVn: '$2.00$ rad' },
        { val: 'B', text: '$12.6$ rad', textVn: '$12.6$ rad' },
        { val: 'C', text: '$720$ rad', textVn: '$720$ rad' },
        { val: 'D', text: '$3.14$ rad', textVn: '$3.14$ rad' },
      ],
      correct: 'B',
      expEn: '$2.00 \\times 2\\pi = 4\\pi = 12.6$ rad. A forgot to convert — the most common lost mark in this lesson. C is $2 \\times 360$, the angle in DEGREES. D is $\\pi$: only half a turn.',
      expVn: '$2.00 \\times 2\\pi = 4\\pi = 12.6$ rad. A quên đổi đơn vị — lỗi mất điểm phổ biến nhất của bài này. C là $2 \\times 360$, góc tính bằng ĐỘ. D là $\\pi$: chỉ nửa vòng.',
    },
  },

  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    ratio: 40,
    eyebrow: 'The big idea of this lesson',
    eyebrowVn: 'Ý tưởng lớn của bài này',
    title: 'Same Motion, New Letters',
    titleVn: 'Cùng Chuyển Động, Chữ Cái Mới',
    inlineSvg: DIAGRAMS.SWAP_TABLE,
    content: 'You already know how things move in a line: distance $x$, velocity $v$, acceleration $a$.\n\nTurning works **exactly the same way**. Only the letters change: $x$ becomes the angle $\\theta$ (theta), $v$ becomes $\\omega$ (omega), and $a$ becomes $\\alpha$ (alpha).\n\nSo every spinning formula in this lesson is one you have already met — with Greek letters.',
    contentVn: 'Em đã biết vật chuyển động thẳng như thế nào: quãng đường $x$, vận tốc $v$, gia tốc $a$.\n\nChuyển động quay hoạt động **y hệt như vậy**. Chỉ có chữ cái thay đổi: $x$ thành góc $\\theta$ (theta), $v$ thành $\\omega$ (omega), và $a$ thành $\\alpha$ (alpha).\n\nVì vậy mọi công thức quay trong bài này đều là công thức em đã gặp — chỉ là dùng chữ Hy Lạp.',
    notes: [
      {
        tone: 'write',
        text: '$\\theta$ = angle turned, in **radians (rad)**\n$\\omega$ = angular velocity — how fast it turns, in **rad/s**\n$\\alpha$ = angular acceleration — how fast $\\omega$ changes, in **rad/s²**',
        textVn: '$\\theta$ = góc quay được, đơn vị **radian (rad)**\n$\\omega$ = vận tốc góc — quay nhanh đến mức nào, đơn vị **rad/s**\n$\\alpha$ = gia tốc góc — $\\omega$ thay đổi nhanh đến mức nào, đơn vị **rad/s²**',
      },
    ],
    check: {
      id: 'chk_which_omega',
      q: 'A fan speeds up from 2.0 rad/s to 8.0 rad/s in 3.0 s. Which letter is 8.0 rad/s?',
      qVn: 'Một cái quạt tăng tốc từ 2.0 rad/s lên 8.0 rad/s trong 3.0 s. Chữ nào bằng 8.0 rad/s?',
      options: [
        { val: 'A', text: '$\\omega_i$', textVn: '$\\omega_i$' },
        { val: 'B', text: '$\\alpha$', textVn: '$\\alpha$' },
        { val: 'C', text: '$\\omega_f$', textVn: '$\\omega_f$' },
        { val: 'D', text: '$\\theta$', textVn: '$\\theta$' },
      ],
      correct: 'C',
      expEn: '8.0 rad/s is a turning SPEED (its unit is rad/s), and it is the speed at the END — final, $f$. So it is $\\omega_f$. A is the speed at the start, 2.0 rad/s. B, $\\alpha$, has the unit rad/s². D, $\\theta$, is an angle in rad.',
      expVn: '8.0 rad/s là một TỐC ĐỘ quay (đơn vị rad/s), và đó là tốc độ lúc CUỐI — final, $f$. Vậy đó là $\\omega_f$. A là tốc độ lúc đầu, 2.0 rad/s. B, $\\alpha$, có đơn vị rad/s². D, $\\theta$, là một góc tính bằng rad.',
    },
  },

  {
    layout: 'stack',
    accent: RED,
    icon: 'Star',
    columns: 1,
    eyebrow: 'Write this down — the moving-in-a-line equations, swapped',
    eyebrowVn: 'Chép vào vở — các phương trình chuyển động thẳng, đã đổi chữ',
    title: 'The Four Spinning Equations',
    titleVn: 'Bốn Phương Trình Chuyển Động Quay',
    content: 'Here are the four equations for speeding up or slowing down in a line, each next to its turning twin. Same shape, new letters:\n$$\\begin{array}{rcl} v_f = v_i + a t & \\longrightarrow & \\omega_f = \\omega_i + \\alpha t \\\\[6pt] x = v_i t + \\tfrac{1}{2} a t^2 & \\longrightarrow & \\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2 \\\\[6pt] v_f^2 = v_i^2 + 2 a x & \\longrightarrow & \\omega_f^2 = \\omega_i^2 + 2 \\alpha \\theta \\\\[6pt] x = \\tfrac{1}{2}(v_i + v_f)\\,t & \\longrightarrow & \\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t \\end{array}$$',
    contentVn: 'Đây là bốn phương trình cho chuyển động thẳng nhanh dần hoặc chậm dần, mỗi phương trình đặt cạnh phương trình quay sinh đôi của nó. Cùng dạng, chữ cái mới:\n$$\\begin{array}{rcl} v_f = v_i + a t & \\longrightarrow & \\omega_f = \\omega_i + \\alpha t \\\\[6pt] x = v_i t + \\tfrac{1}{2} a t^2 & \\longrightarrow & \\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2 \\\\[6pt] v_f^2 = v_i^2 + 2 a x & \\longrightarrow & \\omega_f^2 = \\omega_i^2 + 2 \\alpha \\theta \\\\[6pt] x = \\tfrac{1}{2}(v_i + v_f)\\,t & \\longrightarrow & \\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t \\end{array}$$',
    notes: [
      {
        tone: 'write',
        text: '**The four spinning equations:**\n**1.** $\\omega_f = \\omega_i + \\alpha t$\n**2.** $\\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2$\n**3.** $\\omega_f^2 = \\omega_i^2 + 2 \\alpha \\theta$\n**4.** $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$',
        textVn: '**Bốn phương trình chuyển động quay:**\n**1.** $\\omega_f = \\omega_i + \\alpha t$\n**2.** $\\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2$\n**3.** $\\omega_f^2 = \\omega_i^2 + 2 \\alpha \\theta$\n**4.** $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$',
      },
      {
        tone: 'write',
        text: '$\\omega_i$ = angular velocity at the start, $\\omega_f$ = at the end (rad/s) · $\\alpha$ in rad/s² · $t$ in s · $\\theta$ in rad',
        textVn: '$\\omega_i$ = vận tốc góc lúc đầu, $\\omega_f$ = lúc cuối (rad/s) · $\\alpha$ đơn vị rad/s² · $t$ đơn vị s · $\\theta$ đơn vị rad',
      },
      {
        tone: 'info',
        text: 'Speeding up: $\\alpha$ has the SAME sign as $\\omega$. Slowing down: $\\alpha$ has the OPPOSITE sign. A CCW wheel that is slowing down has a negative $\\alpha$.',
        textVn: 'Nhanh dần: $\\alpha$ CÙNG dấu với $\\omega$. Chậm dần: $\\alpha$ NGƯỢC dấu. Một bánh xe quay CCW đang chậm dần có $\\alpha$ âm.',
      },
    ],
    check: {
      id: 'chk_twin',
      q: 'Which spinning equation is the twin of $v_f^2 = v_i^2 + 2 a x$?',
      qVn: 'Phương trình quay nào là phương trình sinh đôi của $v_f^2 = v_i^2 + 2 a x$?',
      options: [
        { val: 'A', text: '$\\omega_f = \\omega_i + \\alpha t$', textVn: '$\\omega_f = \\omega_i + \\alpha t$' },
        { val: 'B', text: '$\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$', textVn: '$\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$' },
        { val: 'C', text: '$\\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2$', textVn: '$\\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2$' },
        { val: 'D', text: '$\\omega_f^2 = \\omega_i^2 + 2 \\alpha \\theta$', textVn: '$\\omega_f^2 = \\omega_i^2 + 2 \\alpha \\theta$' },
      ],
      correct: 'D',
      expEn: 'Swap every letter: $v \\to \\omega$, $a \\to \\alpha$, $x \\to \\theta$. Then $v_f^2 = v_i^2 + 2ax$ becomes $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$. The other three are the twins of the other three line equations.',
      expVn: 'Đổi mọi chữ: $v \\to \\omega$, $a \\to \\alpha$, $x \\to \\theta$. Khi đó $v_f^2 = v_i^2 + 2ax$ thành $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$. Ba phương án kia là sinh đôi của ba phương trình chuyển động thẳng còn lại.',
    },
  },

  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Split',
    columns: 1,
    eyebrow: 'Which of the four? Look for the letter that is NOT there',
    eyebrowVn: 'Chọn phương trình nào? Tìm chữ KHÔNG có mặt',
    title: 'Choose by the Missing Letter',
    titleVn: 'Chọn Theo Chữ Bị Thiếu',
    content: 'Every spinning question uses FIVE letters: $\\omega_i$, $\\omega_f$, $\\alpha$, $t$ and $\\theta$. It gives you three of them and asks for a fourth. The fifth is not in the question at all.\n\nEach of the four equations leaves out ONE letter. So use the equation that leaves out the letter the question never mentions.',
    contentVn: 'Mọi câu hỏi về chuyển động quay dùng NĂM chữ: $\\omega_i$, $\\omega_f$, $\\alpha$, $t$ và $\\theta$. Đề cho em ba chữ và hỏi chữ thứ tư. Chữ thứ năm hoàn toàn không có trong đề.\n\nMỗi phương trình trong bốn phương trình thiếu MỘT chữ. Vậy hãy dùng phương trình thiếu đúng chữ mà đề không hề nhắc tới.',
    notes: [
      {
        tone: 'write',
        text: '**Choose by the missing letter:**\nNo $\\theta$ → **1.** $\\omega_f = \\omega_i + \\alpha t$\nNo $\\omega_f$ → **2.** $\\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2$\nNo $t$ → **3.** $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$\nNo $\\alpha$ → **4.** $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$',
        textVn: '**Chọn theo chữ bị thiếu:**\nKhông có $\\theta$ → **1.** $\\omega_f = \\omega_i + \\alpha t$\nKhông có $\\omega_f$ → **2.** $\\theta = \\omega_i t + \\tfrac{1}{2} \\alpha t^2$\nKhông có $t$ → **3.** $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$\nKhông có $\\alpha$ → **4.** $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$',
      },
      {
        tone: 'plant',
        text: '"From rest" or "stationary" means $\\omega_i = 0$. "Comes to a stop" means $\\omega_f = 0$. Those count as GIVEN — they are numbers too.',
        textVn: '"From rest" hay "stationary" (đứng yên lúc đầu) nghĩa là $\\omega_i = 0$. "Comes to a stop" (dừng lại) nghĩa là $\\omega_f = 0$. Những điều đó được tính là ĐÃ CHO — chúng cũng là số.',
      },
    ],
    activity: {
      type: 'sort',
      id: 'act_missing_letter',
      prompt: 'Which letter does each question NOT mention? Sort it to the equation that leaves that letter out.',
      promptVn: 'Mỗi câu hỏi KHÔNG nhắc tới chữ nào? Xếp nó vào phương trình thiếu đúng chữ đó.',
      explain: 'Read each question for the five letters. The wheel and the fan give a time and ask a speed: no angle, so equation 1. The merry-go-round and the disc start from rest and ask an angle or a time, never the speed at the end: equation 2. The 2.00-revolution barrel and the wheel slowing to a stop never mention a time: equation 3. The 5.00-revolution barrel never mentions α: equation 4.',
      explainVn: 'Đọc từng câu hỏi để tìm năm chữ. Bánh xe và cái quạt cho thời gian và hỏi tốc độ: không có góc, nên phương trình 1. Vòng quay ngựa gỗ và cái đĩa bắt đầu từ đứng yên và hỏi góc hoặc thời gian, không hỏi tốc độ lúc cuối: phương trình 2. Thùng quay 2.00 vòng và bánh xe chậm dần đến khi dừng không hề nhắc tới thời gian: phương trình 3. Thùng quay 5.00 vòng không nhắc tới α: phương trình 4.',
      bins: [
        { id: 'b1', name: 'No angle θ → equation 1', nameVn: 'Không có góc θ → phương trình 1' },
        { id: 'b2', name: 'No speed at the end → equation 2', nameVn: 'Không có tốc độ lúc cuối → phương trình 2' },
        { id: 'b3', name: 'No time t → equation 3', nameVn: 'Không có thời gian t → phương trình 3' },
        { id: 'b4', name: 'No α → equation 4', nameVn: 'Không có α → phương trình 4' },
      ],
      cards: [
        { id: 'k1', name: 'A wheel turns at 4.50 rad/s with α = −0.822 rad/s². What is ω after 12.0 s?', nameVn: 'Một bánh xe quay 4.50 rad/s với α = −0.822 rad/s². ω sau 12.0 s là bao nhiêu?', bin: 'b1' },
        { id: 'k2', name: 'A merry-go-round starts from rest with α = 0.135 rad/s². How long do 2.00 rotations take?', nameVn: 'Một vòng quay ngựa gỗ bắt đầu từ đứng yên với α = 0.135 rad/s². Quay 2.00 vòng mất bao lâu?', bin: 'b2' },
        { id: 'k3', name: 'A barrel ride slows from 2.30 rad/s to 1.11 rad/s in 2.00 revolutions. What is α?', nameVn: 'Một thùng quay chậm dần từ 2.30 rad/s xuống 1.11 rad/s trong 2.00 vòng. α bằng bao nhiêu?', bin: 'b3' },
        { id: 'k4', name: 'A barrel ride slows from 2.30 rad/s to 1.11 rad/s in 5.00 revolutions. How long did it take?', nameVn: 'Một thùng quay chậm dần từ 2.30 rad/s xuống 1.11 rad/s trong 5.00 vòng. Mất bao lâu?', bin: 'b4' },
        { id: 'k5', name: 'A fan starts from rest and reaches 12.0 rad/s in 4.00 s. What is α?', nameVn: 'Một cái quạt bắt đầu từ đứng yên và đạt 12.0 rad/s trong 4.00 s. α bằng bao nhiêu?', bin: 'b1' },
        { id: 'k6', name: 'A disc spins up from rest at 3.00 rad/s² for 5.00 s. What angle does it turn?', nameVn: 'Một cái đĩa quay nhanh dần từ đứng yên với 3.00 rad/s² trong 5.00 s. Nó quay được góc bao nhiêu?', bin: 'b2' },
        { id: 'k7', name: 'A wheel at 9.00 rad/s slows at −1.50 rad/s² until it stops. How many radians does it turn?', nameVn: 'Một bánh xe đang quay 9.00 rad/s chậm dần với −1.50 rad/s² đến khi dừng. Nó quay được bao nhiêu radian?', bin: 'b3' },
      ],
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
    content: '**A wheel turning 4.50 rad/s experiences an angular acceleration of −0.822 rad/s². What is its angular velocity after 12.0 s?** Remember: CCW is +, CW is −.\n\nThe same five lines as momentum. Use them on EVERY question in this lesson.',
    contentVn: '**Một bánh xe đang quay 4.50 rad/s chịu gia tốc góc −0.822 rad/s². Vận tốc góc của nó sau 12.0 s là bao nhiêu?** Nhớ: CCW là +, CW là −.\n\nVẫn năm dòng như bài động lượng. Dùng chúng cho MỌI câu hỏi trong bài này.',
    steps: [
      {
        text: '**Pieces, with signs.** $\\omega_i = +4.50$ rad/s, $\\alpha = -0.822$ rad/s², $t = 12.0$ s, $\\omega_f = ?$ The question never mentions an angle.',
        textVn: '**Các đại lượng, kèm dấu.** $\\omega_i = +4.50$ rad/s, $\\alpha = -0.822$ rad/s², $t = 12.0$ s, $\\omega_f = ?$ Đề không hề nhắc tới góc.',
      },
      {
        text: '**Formula.** No $\\theta$, so equation 1: $\\omega_f = \\omega_i + \\alpha t$',
        textVn: '**Công thức.** Không có $\\theta$, nên dùng phương trình 1: $\\omega_f = \\omega_i + \\alpha t$',
      },
      {
        text: '**Rearrange.** Nothing to do — $\\omega_f$ is already alone on one side.',
        textVn: '**Biến đổi.** Không cần làm gì — $\\omega_f$ đã đứng một mình ở một vế.',
      },
      {
        text: '**Substitute — a negative number goes in brackets.** $\\omega_f = 4.50 + (-0.822) \\times 12.0 = 4.50 - 9.864$',
        textVn: '**Thay số — số âm đặt trong ngoặc.** $\\omega_f = 4.50 + (-0.822) \\times 12.0 = 4.50 - 9.864$',
      },
      {
        text: '**Answer, with a unit and a sign.** $\\omega_f = -5.36$ rad/s. Negative: the wheel slowed to a stop, then spun up the OTHER way — clockwise.',
        textVn: '**Đáp án, kèm đơn vị và dấu.** $\\omega_f = -5.36$ rad/s. Âm: bánh xe chậm dần đến khi dừng, rồi quay nhanh dần theo chiều NGƯỢC LẠI — cùng chiều kim đồng hồ.',
      },
    ],
    check: {
      id: 'chk_wheel_3s',
      q: 'The same wheel. What is its angular velocity after only 3.00 s?',
      qVn: 'Vẫn bánh xe đó. Vận tốc góc của nó chỉ sau 3.00 s là bao nhiêu?',
      options: [
        { val: 'A', text: '$+2.03$ rad/s', textVn: '$+2.03$ rad/s' },
        { val: 'B', text: '$+6.97$ rad/s', textVn: '$+6.97$ rad/s' },
        { val: 'C', text: '$-2.47$ rad/s', textVn: '$-2.47$ rad/s' },
        { val: 'D', text: '$-2.03$ rad/s', textVn: '$-2.03$ rad/s' },
      ],
      correct: 'A',
      expEn: '$\\omega_f = 4.50 + (-0.822) \\times 3.00 = 4.50 - 2.466 = +2.03$ rad/s — still turning CCW, just more slowly. B added 2.466 instead of taking it away: the minus sign of $\\alpha$ was lost. C is only $\\alpha t$ — it forgot $\\omega_i$. D has the right size but the wrong direction: after 3.00 s the wheel has not stopped yet.',
      expVn: '$\\omega_f = 4.50 + (-0.822) \\times 3.00 = 4.50 - 2.466 = +2.03$ rad/s — vẫn quay CCW, chỉ chậm hơn. B cộng 2.466 thay vì trừ: dấu trừ của $\\alpha$ bị mất. C chỉ là $\\alpha t$ — quên $\\omega_i$. D đúng độ lớn nhưng sai chiều: sau 3.00 s bánh xe chưa dừng lại.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'RotateCcw',
    dense: true,
    eyebrow: 'From your Acellus screen · revolutions become radians first',
    eyebrowVn: 'Từ màn hình Acellus của em · số vòng phải đổi sang radian trước',
    title: 'The Barrel Ride Slows Down',
    titleVn: 'Thùng Quay Chậm Dần',
    content: '**A barrel ride at an amusement park is turning 2.30 rad/s when it starts to slow down. After making 2.00 revolutions, it is rotating at 1.11 rad/s. What was its angular acceleration?** Remember: CCW is +, CW is −.',
    contentVn: '**Một trò chơi thùng quay ở công viên đang quay với 2.30 rad/s thì bắt đầu chậm lại. Sau khi quay được 2.00 vòng, nó quay với 1.11 rad/s. Gia tốc góc của nó là bao nhiêu?** Nhớ: CCW là +, CW là −.',
    steps: [
      {
        text: '**Pieces, in radians.** $\\omega_i = 2.30$ rad/s, $\\omega_f = 1.11$ rad/s, $\\theta = 2.00 \\times 2\\pi = 12.57$ rad, $\\alpha = ?$ The question never mentions a time.',
        textVn: '**Các đại lượng, đổi sang radian.** $\\omega_i = 2.30$ rad/s, $\\omega_f = 1.11$ rad/s, $\\theta = 2.00 \\times 2\\pi = 12.57$ rad, $\\alpha = ?$ Đề không hề nhắc tới thời gian.',
      },
      {
        text: '**Formula.** No $t$, so equation 3: $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$',
        textVn: '**Công thức.** Không có $t$, nên dùng phương trình 3: $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$',
      },
      {
        text: '**Rearrange.** $\\omega_i^2$ is ADDED to the $\\alpha$ term, so subtract it: $\\omega_f^2 - \\omega_i^2 = 2\\alpha\\theta$. Then $2\\theta$ multiplies $\\alpha$, so divide by $2\\theta$: $\\alpha = \\dfrac{\\omega_f^2 - \\omega_i^2}{2\\theta}$',
        textVn: '**Biến đổi.** $\\omega_i^2$ đang được CỘNG vào số hạng chứa $\\alpha$, nên trừ nó đi: $\\omega_f^2 - \\omega_i^2 = 2\\alpha\\theta$. Rồi $2\\theta$ đang nhân với $\\alpha$, nên chia cho $2\\theta$: $\\alpha = \\dfrac{\\omega_f^2 - \\omega_i^2}{2\\theta}$',
      },
      {
        text: '**Substitute.** $\\alpha = \\dfrac{1.11^2 - 2.30^2}{2 \\times 12.57} = \\dfrac{1.2321 - 5.29}{25.13} = \\dfrac{-4.058}{25.13}$',
        textVn: '**Thay số.** $\\alpha = \\dfrac{1.11^2 - 2.30^2}{2 \\times 12.57} = \\dfrac{1.2321 - 5.29}{25.13} = \\dfrac{-4.058}{25.13}$',
      },
      {
        text: '**Answer, with a unit and a sign.** $\\alpha = -0.161$ rad/s². Negative: it is turning the + way and slowing down.',
        textVn: '**Đáp án, kèm đơn vị và dấu.** $\\alpha = -0.161$ rad/s². Âm: nó đang quay theo chiều + và chậm dần.',
      },
    ],
    reveal: {
      label: 'What if θ stays in revolutions?',
      labelVn: 'Nếu để θ ở đơn vị vòng thì sao?',
      prompt: 'Use θ = 2.00 instead of 12.57. What comes out?',
      promptVn: 'Dùng θ = 2.00 thay cho 12.57. Kết quả ra bao nhiêu?',
      answer: '$\\alpha = \\dfrac{-4.058}{2 \\times 2.00} = -1.01$ rad/s² — about **6 times too big**, because 1 revolution is 6.28 radians. Acellus marks it wrong. Change turns into radians before anything goes in.',
      answerVn: '$\\alpha = \\dfrac{-4.058}{2 \\times 2.00} = -1.01$ rad/s² — lớn hơn khoảng **6 lần**, vì 1 vòng là 6.28 radian. Acellus chấm sai. Hãy đổi số vòng sang radian trước khi thay bất cứ thứ gì vào.',
    },
    check: {
      id: 'chk_why_negative',
      q: 'How can you tell, before you calculate, that $\\alpha$ must be negative?',
      qVn: 'Làm sao biết, trước khi tính, rằng $\\alpha$ phải là số âm?',
      options: [
        { val: 'A', text: 'It turns clockwise', textVn: 'Nó quay cùng chiều kim đồng hồ' },
        { val: 'B', text: 'The revolutions were converted to radians', textVn: 'Số vòng đã được đổi sang radian' },
        { val: 'C', text: 'It goes from 2.30 to 1.11 rad/s: it is slowing down', textVn: 'Nó đi từ 2.30 xuống 1.11 rad/s: nó đang chậm dần' },
        { val: 'D', text: 'It cannot be negative', textVn: 'Nó không thể là số âm' },
      ],
      correct: 'C',
      expEn: 'Both speeds are positive, so it turns CCW the whole time (not A). It gets slower, so $\\alpha$ points against the turning: negative. Converting units (B) changes the size, never the sign. A slowing wheel always has $\\alpha$ with the opposite sign to $\\omega$ (not D).',
      expVn: 'Cả hai tốc độ đều dương, nên nó luôn quay CCW (không phải A). Nó chậm dần, nên $\\alpha$ ngược chiều quay: âm. Đổi đơn vị (B) làm thay đổi độ lớn, không bao giờ đổi dấu. Bánh xe chậm dần luôn có $\\alpha$ ngược dấu với $\\omega$ (không phải D).',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Timer',
    dense: true,
    eyebrow: 'From your Acellus screen · same ride, new question',
    eyebrowVn: 'Từ màn hình Acellus của em · cùng trò chơi, câu hỏi mới',
    title: 'How Long Did 5.00 Revolutions Take?',
    titleVn: 'Quay 5.00 Vòng Mất Bao Lâu?',
    content: '**A barrel ride at an amusement park is turning 2.30 rad/s when it starts to slow down. After making 5.00 revolutions, it is rotating at 1.11 rad/s. How much time did that take?**\n\nThis time there is no $\\alpha$ in the question. That points to equation 4.',
    contentVn: '**Một trò chơi thùng quay ở công viên đang quay với 2.30 rad/s thì bắt đầu chậm lại. Sau khi quay được 5.00 vòng, nó quay với 1.11 rad/s. Việc đó mất bao lâu?**\n\nLần này đề không có $\\alpha$. Điều đó chỉ tới phương trình 4.',
    steps: [
      {
        text: '**Pieces, in radians.** $\\omega_i = 2.30$ rad/s, $\\omega_f = 1.11$ rad/s, $\\theta = 5.00 \\times 2\\pi = 31.42$ rad, $t = ?$',
        textVn: '**Các đại lượng, đổi sang radian.** $\\omega_i = 2.30$ rad/s, $\\omega_f = 1.11$ rad/s, $\\theta = 5.00 \\times 2\\pi = 31.42$ rad, $t = ?$',
      },
      {
        text: '**Formula.** No $\\alpha$, so equation 4: $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$',
        textVn: '**Công thức.** Không có $\\alpha$, nên dùng phương trình 4: $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$',
      },
      {
        text: '**Rearrange.** The bracket multiplies $t$, so divide by the WHOLE bracket. The $\\tfrac{1}{2}$ means "÷ 2", and × 2 undoes it: $t = \\dfrac{2\\theta}{\\omega_i + \\omega_f}$',
        textVn: '**Biến đổi.** Cả ngoặc đang nhân với $t$, nên chia cho CẢ ngoặc. $\\tfrac{1}{2}$ nghĩa là "÷ 2", và × 2 sẽ khử nó: $t = \\dfrac{2\\theta}{\\omega_i + \\omega_f}$',
      },
      {
        text: '**Substitute.** $t = \\dfrac{2 \\times 31.42}{2.30 + 1.11} = \\dfrac{62.83}{3.41}$',
        textVn: '**Thay số.** $t = \\dfrac{2 \\times 31.42}{2.30 + 1.11} = \\dfrac{62.83}{3.41}$',
      },
      {
        text: '**Answer, with a unit.** $t = 18.4$ s.',
        textVn: '**Đáp án, kèm đơn vị.** $t = 18.4$ s.',
      },
    ],
    check: {
      id: 'chk_undo_half',
      q: 'In $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$, which move undoes the $\\tfrac{1}{2}$?',
      qVn: 'Trong $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$, bước nào khử được $\\tfrac{1}{2}$?',
      options: [
        { val: 'A', text: 'Divide both sides by 2', textVn: 'Chia cả hai vế cho 2' },
        { val: 'B', text: 'Multiply both sides by 2', textVn: 'Nhân cả hai vế với 2' },
        { val: 'C', text: 'Subtract $\\tfrac{1}{2}$ from both sides', textVn: 'Trừ $\\tfrac{1}{2}$ ở cả hai vế' },
        { val: 'D', text: 'Square both sides', textVn: 'Bình phương cả hai vế' },
      ],
      correct: 'B',
      expEn: 'Half of something is that thing ÷ 2, and × 2 undoes ÷ 2. A would make it a quarter. C: the $\\tfrac{1}{2}$ is multiplying, not added, so subtracting does nothing useful. D undoes a square root, not a half.',
      expVn: 'Một nửa của một thứ là thứ đó ÷ 2, và × 2 khử ÷ 2. A sẽ biến nó thành một phần tư. C: $\\tfrac{1}{2}$ đang nhân, không phải cộng, nên trừ đi chẳng giúp gì. D khử căn bậc hai, không khử một nửa.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'CircleSlash',
    dense: true,
    eyebrow: 'From your Acellus screen · "stationary" makes a term vanish',
    eyebrowVn: 'Từ màn hình Acellus của em · "đứng yên" làm một số hạng biến mất',
    title: 'From Rest: the Merry-Go-Round',
    titleVn: 'Từ Đứng Yên: Vòng Quay Ngựa Gỗ',
    content: '**A kid pushes a stationary merry-go-round, creating an acceleration of 0.135 rad/s². How much time does it take the merry-go-round to complete 2.00 rotations?** Remember: CCW is +, CW is −.\n\n"Stationary" means $\\omega_i = 0$. Just like "at rest" in momentum, a term vanishes.',
    contentVn: '**Một bạn nhỏ đẩy một vòng quay ngựa gỗ đang đứng yên, tạo ra gia tốc 0.135 rad/s². Vòng quay mất bao lâu để quay được 2.00 vòng?** Nhớ: CCW là +, CW là −.\n\n"Đứng yên" nghĩa là $\\omega_i = 0$. Giống "đứng yên" trong bài động lượng, một số hạng biến mất.',
    steps: [
      {
        text: '**Pieces, in radians.** $\\omega_i = 0$ (stationary), $\\alpha = 0.135$ rad/s², $\\theta = 2.00 \\times 2\\pi = 12.57$ rad, $t = ?$ The speed at the end is never mentioned.',
        textVn: '**Các đại lượng, đổi sang radian.** $\\omega_i = 0$ (đứng yên), $\\alpha = 0.135$ rad/s², $\\theta = 2.00 \\times 2\\pi = 12.57$ rad, $t = ?$ Đề không nhắc tới tốc độ lúc cuối.',
      },
      {
        text: '**Formula.** No $\\omega_f$, so equation 2: $\\theta = \\omega_i t + \\tfrac{1}{2}\\alpha t^2$. With $\\omega_i = 0$ the first term vanishes: $\\theta = \\tfrac{1}{2}\\alpha t^2$',
        textVn: '**Công thức.** Không có $\\omega_f$, nên dùng phương trình 2: $\\theta = \\omega_i t + \\tfrac{1}{2}\\alpha t^2$. Với $\\omega_i = 0$ số hạng đầu biến mất: $\\theta = \\tfrac{1}{2}\\alpha t^2$',
      },
      {
        text: '**Rearrange.** × 2: $2\\theta = \\alpha t^2$. ÷ $\\alpha$: $t^2 = \\dfrac{2\\theta}{\\alpha}$. $t$ is squared, so take the square root: $t = \\sqrt{\\dfrac{2\\theta}{\\alpha}}$',
        textVn: '**Biến đổi.** × 2: $2\\theta = \\alpha t^2$. ÷ $\\alpha$: $t^2 = \\dfrac{2\\theta}{\\alpha}$. $t$ đang bình phương, nên lấy căn bậc hai: $t = \\sqrt{\\dfrac{2\\theta}{\\alpha}}$',
      },
      {
        text: '**Substitute.** $t = \\sqrt{\\dfrac{2 \\times 12.57}{0.135}} = \\sqrt{186.2}$',
        textVn: '**Thay số.** $t = \\sqrt{\\dfrac{2 \\times 12.57}{0.135}} = \\sqrt{186.2}$',
      },
      {
        text: '**Answer, with a unit.** $t = 13.6$ s.',
        textVn: '**Đáp án, kèm đơn vị.** $t = 13.6$ s.',
      },
    ],
    reveal: {
      label: 'What if you forget the 2π?',
      labelVn: 'Nếu quên nhân 2π thì sao?',
      prompt: 'Use θ = 2.00 instead of 12.57. What time comes out?',
      promptVn: 'Dùng θ = 2.00 thay cho 12.57. Thời gian tính ra bằng bao nhiêu?',
      answer: '$t = \\sqrt{\\dfrac{2 \\times 2.00}{0.135}} = 5.44$ s — less than half the real time. Rotations always become radians first.',
      answerVn: '$t = \\sqrt{\\dfrac{2 \\times 2.00}{0.135}} = 5.44$ s — chưa bằng một nửa thời gian thật. Số vòng luôn phải đổi sang radian trước.',
    },
    check: {
      id: 'chk_forgot_root',
      q: 'A student writes $t = \\dfrac{2\\theta}{\\alpha} = 186$ s. What did they forget?',
      qVn: 'Một học sinh viết $t = \\dfrac{2\\theta}{\\alpha} = 186$ s. Bạn ấy đã quên gì?',
      options: [
        { val: 'A', text: 'To convert rotations to radians', textVn: 'Đổi số vòng sang radian' },
        { val: 'B', text: 'To divide by 2', textVn: 'Chia cho 2' },
        { val: 'C', text: 'Nothing — it is right', textVn: 'Không quên gì — đó là đáp án đúng' },
        { val: 'D', text: 'The square root', textVn: 'Lấy căn bậc hai' },
      ],
      correct: 'D',
      expEn: '$t$ is SQUARED in $\\tfrac{1}{2}\\alpha t^2$, so the last move is a square root: $\\sqrt{186.2} = 13.6$ s. 186 is $t^2$, not $t$. A: they did convert — 12.57 rad is in there. B: the $\\tfrac{1}{2}$ was undone by × 2, correctly.',
      expVn: '$t$ đang BÌNH PHƯƠNG trong $\\tfrac{1}{2}\\alpha t^2$, nên bước cuối là lấy căn bậc hai: $\\sqrt{186.2} = 13.6$ s. 186 là $t^2$, không phải $t$. A: bạn ấy đã đổi — 12.57 rad đã có trong đó. B: $\\tfrac{1}{2}$ đã được khử bằng × 2, đúng rồi.',
    },
  },

  {
    layout: 'split',
    accent: BLUE,
    icon: 'Circle',
    ratio: 40,
    eyebrow: 'Rotational and linear motion',
    eyebrowVn: 'Chuyển động quay và chuyển động thẳng',
    title: 'From the Centre to the Edge: × r',
    titleVn: 'Từ Tâm Ra Mép: × r',
    inlineSvg: DIAGRAMS.RADIUS_LINK,
    content: 'Every point on a wheel turns through the same angle $\\theta$. But a point on the edge also travels a real distance $s$ along the rim — and the bigger the wheel, the further it goes.\n\nTo get from the turning to the edge, **multiply by the radius $r$**. To go back from the edge to the turning, divide by $r$.',
    contentVn: 'Mọi điểm trên bánh xe đều quay cùng một góc $\\theta$. Nhưng một điểm ở mép còn đi được một quãng đường thật $s$ dọc theo vành — và bánh xe càng lớn, nó đi càng xa.\n\nĐể đi từ chuyển động quay ra mép, **nhân với bán kính $r$**. Để đi ngược từ mép về chuyển động quay, chia cho $r$.',
    notes: [
      {
        tone: 'write',
        text: '**Centre → edge:** $s = r\\theta$ · $v = r\\omega$ · $a = r\\alpha$\n$s$ = distance along the rim (m) · $v$ = speed of the edge (m/s) · $a$ = acceleration of the edge (m/s²) · $r$ = radius (m)',
        textVn: '**Tâm → mép:** $s = r\\theta$ · $v = r\\omega$ · $a = r\\alpha$\n$s$ = quãng đường dọc theo vành (m) · $v$ = tốc độ của mép (m/s) · $a$ = gia tốc của mép (m/s²) · $r$ = bán kính (m)',
      },
      {
        tone: 'info',
        text: '$\\theta$ must be in radians for these to work. A wheel that rolls without slipping: the speed of its edge IS the speed of the bus or bike.',
        textVn: '$\\theta$ phải tính bằng radian thì các công thức này mới đúng. Bánh xe lăn không trượt: tốc độ ở mép của nó CHÍNH LÀ tốc độ của xe buýt hay xe đạp.',
      },
    ],
    check: {
      id: 'chk_platter',
      q: 'A 15.7 cm diameter circular platter has an angular acceleration of 1.33 rad/s². What is the linear acceleration of a point on the rim?',
      qVn: 'Một cái đĩa tròn đường kính 15.7 cm có gia tốc góc 1.33 rad/s². Gia tốc dài của một điểm trên vành đĩa là bao nhiêu?',
      options: [
        { val: 'A', text: '$0.209$ m/s²', textVn: '$0.209$ m/s²' },
        { val: 'B', text: '$0.104$ m/s²', textVn: '$0.104$ m/s²' },
        { val: 'C', text: '$10.4$ m/s²', textVn: '$10.4$ m/s²' },
        { val: 'D', text: '$20.9$ m/s²', textVn: '$20.9$ m/s²' },
      ],
      correct: 'B',
      expEn: 'The radius is half the diameter: 7.85 cm $= 0.0785$ m. Then $a = r\\alpha = 0.0785 \\times 1.33 = 0.104$ m/s². A used the diameter. C kept the radius in cm. D did both.',
      expVn: 'Bán kính là một nửa đường kính: 7.85 cm $= 0.0785$ m. Khi đó $a = r\\alpha = 0.0785 \\times 1.33 = 0.104$ m/s². A dùng đường kính. C để bán kính ở đơn vị cm. D mắc cả hai lỗi.',
    },
  },

  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Ruler',
    eyebrow: 'Units — where the marks go in this lesson',
    eyebrowVn: 'Đơn vị — chỗ mất điểm của bài này',
    title: 'Three Unit Traps',
    titleVn: 'Ba Cái Bẫy Đơn Vị',
    content: 'Before a number goes into any rotation formula, check it.\n\n**Turns** (revolutions, rotations) → × $2\\pi$ → radians.\n**Centimetres** → ÷ 100 → metres.\n**A diameter** → ÷ 2 → the radius. Every formula uses the RADIUS.',
    contentVn: 'Trước khi thay một con số vào bất kỳ công thức quay nào, hãy kiểm tra nó.\n\n**Số vòng** (revolutions, rotations) → × $2\\pi$ → radian.\n**Xentimét** → ÷ 100 → mét.\n**Đường kính** → ÷ 2 → bán kính. Mọi công thức đều dùng BÁN KÍNH.',
    activity: {
      type: 'sort',
      id: 'act_unit_traps',
      prompt: 'What must you do to each number before it goes into a formula?',
      promptVn: 'Em phải làm gì với mỗi con số trước khi thay nó vào công thức?',
      explain: 'Turns are not radians: 5.00 revolutions is 31.4 rad. A radius in cm becomes metres. A DIAMETER is twice the radius, so halve it (and a diameter in cm needs both moves). Anything already in rad, rad/s, m or s goes in as it is.',
      explainVn: 'Số vòng không phải radian: 5.00 vòng là 31.4 rad. Bán kính tính bằng cm phải đổi sang mét. ĐƯỜNG KÍNH gấp đôi bán kính, nên chia đôi (và đường kính tính bằng cm cần cả hai bước). Những gì đã ở đơn vị rad, rad/s, m hay s thì thay vào nguyên như vậy.',
      bins: [
        { id: 'pi', name: 'Multiply by 2π', nameVn: 'Nhân với 2π' },
        { id: 'cm', name: 'Divide by 100', nameVn: 'Chia cho 100' },
        { id: 'half', name: 'Divide by 2', nameVn: 'Chia cho 2' },
        { id: 'ok', name: 'Use it as it is', nameVn: 'Dùng nguyên như vậy' },
      ],
      cards: [
        { id: 'u1', name: '5.00 revolutions', nameVn: '5.00 vòng (revolutions)', bin: 'pi' },
        { id: 'u2', name: '2.00 rotations', nameVn: '2.00 vòng (rotations)', bin: 'pi' },
        { id: 'u3', name: 'a radius of 18.0 cm', nameVn: 'bán kính 18.0 cm', bin: 'cm' },
        { id: 'u4', name: 'a wheel 1.06 m in diameter', nameVn: 'một bánh xe đường kính 1.06 m', bin: 'half' },
        { id: 'u5', name: '4.50 rad/s', nameVn: '4.50 rad/s', bin: 'ok' },
        { id: 'u6', name: 'a radius of 0.530 m', nameVn: 'bán kính 0.530 m', bin: 'ok' },
        { id: 'u7', name: 'a 0.900 m diameter disc', nameVn: 'một cái đĩa đường kính 0.900 m', bin: 'half' },
        { id: 'u8', name: '12.6 rad', nameVn: '12.6 rad', bin: 'ok' },
      ],
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Gauge',
    dense: true,
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Bus Wheels',
    titleVn: 'Bánh Xe Buýt',
    content: '**A bus slows down from 8.22 m/s to a stop in 13.3 s. Its wheels have a radius of 0.530 m. What is the initial angular speed of the wheels?**\n\nThe bus moves at the same speed as the edge of its wheels.',
    contentVn: '**Một xe buýt giảm tốc từ 8.22 m/s đến khi dừng hẳn trong 13.3 s. Bánh xe của nó có bán kính 0.530 m. Tốc độ góc ban đầu của bánh xe là bao nhiêu?**\n\nXe buýt chạy cùng tốc độ với mép bánh xe của nó.',
    steps: [
      {
        text: '**Pieces.** $v = 8.22$ m/s (the starting speed of the bus — and of the wheel\'s edge), $r = 0.530$ m, $\\omega = ?$ The 13.3 s is not needed yet.',
        textVn: '**Các đại lượng.** $v = 8.22$ m/s (tốc độ ban đầu của xe buýt — cũng là của mép bánh xe), $r = 0.530$ m, $\\omega = ?$ Chưa cần tới 13.3 s.',
      },
      {
        text: '**Formula.** Edge speed and turning speed: $v = r\\omega$',
        textVn: '**Công thức.** Tốc độ ở mép và tốc độ quay: $v = r\\omega$',
      },
      {
        text: '**Rearrange.** $r$ multiplies $\\omega$, so divide both sides by $r$: $\\omega = \\dfrac{v}{r}$',
        textVn: '**Biến đổi.** $r$ đang nhân với $\\omega$, nên chia cả hai vế cho $r$: $\\omega = \\dfrac{v}{r}$',
      },
      {
        text: '**Substitute.** $\\omega = \\dfrac{8.22}{0.530}$',
        textVn: '**Thay số.** $\\omega = \\dfrac{8.22}{0.530}$',
      },
      {
        text: '**Answer, with a unit.** $\\omega = 15.5$ rad/s.',
        textVn: '**Đáp án, kèm đơn vị.** $\\omega = 15.5$ rad/s.',
      },
    ],
    reveal: {
      label: 'Acellus asks next: the angular displacement',
      labelVn: 'Câu Acellus hỏi tiếp: độ dời góc',
      prompt: 'The same bus. What is the angular displacement of the wheels while it stops?',
      promptVn: 'Vẫn xe buýt đó. Độ dời góc của bánh xe trong lúc xe dừng lại là bao nhiêu?',
      answer: 'Use the answer you just found. The wheels go from $\\omega_i = 15.51$ rad/s to $\\omega_f = 0$ (a stop) in 13.3 s, and there is no $\\alpha$ — so equation 4: $$\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t = \\tfrac{1}{2}(15.51 + 0) \\times 13.3 = 103 \\text{ rad}$$ Keep 15.51 (not 15.5) until the very end.',
      answerVn: 'Dùng đáp án em vừa tìm được. Bánh xe đi từ $\\omega_i = 15.51$ rad/s về $\\omega_f = 0$ (dừng lại) trong 13.3 s, và không có $\\alpha$ — vậy dùng phương trình 4: $$\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t = \\tfrac{1}{2}(15.51 + 0) \\times 13.3 = 103 \\text{ rad}$$ Giữ 15.51 (không phải 15.5) cho đến bước cuối cùng.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Route',
    dense: true,
    eyebrow: 'From your Acellus screen · two formulas in a row',
    eyebrowVn: 'Từ màn hình Acellus của em · hai công thức nối tiếp',
    title: 'The Dust on the Lazy Susan',
    titleVn: 'Hạt Bụi Trên Mâm Xoay',
    content: '**A 30.5 cm diameter lazy susan has an angular acceleration of 2.09 rad/s². What is the distance traveled after 6.54 s, by a dust particle on the edge of the lazy susan?**\n\nIt starts from rest. Find the angle first, then go out to the edge with × r.',
    contentVn: '**Một cái mâm xoay đường kính 30.5 cm có gia tốc góc 2.09 rad/s². Quãng đường một hạt bụi ở mép mâm đi được sau 6.54 s là bao nhiêu?**\n\nNó bắt đầu từ đứng yên. Tìm góc trước, rồi ra mép bằng × r.',
    steps: [
      {
        text: '**Pieces, in SI.** Diameter 30.5 cm → radius $r = 15.25$ cm $= 0.1525$ m. $\\omega_i = 0$ (from rest), $\\alpha = 2.09$ rad/s², $t = 6.54$ s, $s = ?$',
        textVn: '**Các đại lượng, đổi sang SI.** Đường kính 30.5 cm → bán kính $r = 15.25$ cm $= 0.1525$ m. $\\omega_i = 0$ (từ đứng yên), $\\alpha = 2.09$ rad/s², $t = 6.54$ s, $s = ?$',
      },
      {
        text: '**Formula — two in a row.** No $\\omega_f$, so equation 2, and $\\omega_i = 0$ makes it $\\theta = \\tfrac{1}{2}\\alpha t^2$. Then out to the edge: $s = r\\theta$',
        textVn: '**Công thức — hai công thức nối tiếp.** Không có $\\omega_f$, nên dùng phương trình 2, và $\\omega_i = 0$ biến nó thành $\\theta = \\tfrac{1}{2}\\alpha t^2$. Rồi ra mép: $s = r\\theta$',
      },
      {
        text: '**Rearrange.** Nothing to do — $\\theta$ and $s$ are each already alone.',
        textVn: '**Biến đổi.** Không cần làm gì — $\\theta$ và $s$ đều đã đứng một mình.',
      },
      {
        text: '**Substitute.** $\\theta = \\tfrac{1}{2} \\times 2.09 \\times 6.54^2 = 44.70$ rad. Then $s = 0.1525 \\times 44.70$',
        textVn: '**Thay số.** $\\theta = \\tfrac{1}{2} \\times 2.09 \\times 6.54^2 = 44.70$ rad. Rồi $s = 0.1525 \\times 44.70$',
      },
      {
        text: '**Answer, with a unit.** $s = 6.82$ m. The dust goes round about 7 times.',
        textVn: '**Đáp án, kèm đơn vị.** $s = 6.82$ m. Hạt bụi quay được khoảng 7 vòng.',
      },
    ],
    reveal: {
      label: 'Two traps in one question',
      labelVn: 'Hai cái bẫy trong một câu hỏi',
      prompt: 'What do you get if you use the diameter, or leave the radius in cm?',
      promptVn: 'Em được gì nếu dùng đường kính, hoặc để bán kính ở đơn vị cm?',
      answer: 'Diameter, 0.305 m: $s = 0.305 \\times 44.70 = 13.6$ m — exactly **twice** too far. Radius in cm, 15.25: $s = 15.25 \\times 44.70 = 682$ — a speck of dust travelling the length of six football pitches. Halve the diameter, and change cm into m.',
      answerVn: 'Đường kính, 0.305 m: $s = 0.305 \\times 44.70 = 13.6$ m — xa gấp **đôi**. Bán kính tính bằng cm, 15.25: $s = 15.25 \\times 44.70 = 682$ — một hạt bụi đi dài bằng sáu sân bóng đá. Hãy chia đôi đường kính, và đổi cm sang m.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Star',
    eyebrow: 'The turning effect of a force',
    eyebrowVn: 'Tác dụng làm quay của một lực',
    title: 'Torque',
    titleVn: 'Mômen Lực',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$\\tau = r F \\sin\\theta$',
    textVn: '$\\tau = r F \\sin\\theta$',
    sub: 'Torque (τ, "tau") is how hard a force TURNS something. Push harder, push further from the pivot, or push more squarely across, and the torque is bigger.',
    subVn: 'Mômen lực (τ, "tau") là mức độ một lực làm vật QUAY. Đẩy mạnh hơn, đẩy xa điểm tựa hơn, hoặc đẩy vuông góc hơn, thì mômen lực lớn hơn.',
    notes: [
      {
        tone: 'write',
        text: '$\\tau$ = torque, in **N·m**\n$r$ = distance from the pivot (the hinge) to where the force pushes, in **m**\n$F$ = the force, in **N**\n$\\theta$ = the angle between the force and the door (or bar)',
        textVn: '$\\tau$ = mômen lực, đơn vị **N·m**\n$r$ = khoảng cách từ điểm tựa (bản lề) tới chỗ lực đẩy, đơn vị **m**\n$F$ = lực, đơn vị **N**\n$\\theta$ = góc giữa lực và cánh cửa (hoặc thanh)',
      },
      {
        tone: 'info',
        text: 'Push straight across the door ($\\theta = 90^\\circ$): $\\sin 90^\\circ = 1$, the biggest torque. Push along the door toward the hinge ($\\theta = 0^\\circ$): $\\sin 0^\\circ = 0$, no turning at all. Calculator in **DEG** mode.',
        textVn: 'Đẩy vuông góc với cánh cửa ($\\theta = 90^\\circ$): $\\sin 90^\\circ = 1$, mômen lực lớn nhất. Đẩy dọc theo cánh cửa về phía bản lề ($\\theta = 0^\\circ$): $\\sin 0^\\circ = 0$, hoàn toàn không quay. Máy tính để chế độ **DEG**.',
      },
    ],
    check: {
      id: 'chk_best_push',
      q: 'Each push is 20 N. Which one turns a door most easily?',
      qVn: 'Mỗi lực đẩy đều là 20 N. Lực nào làm cánh cửa quay dễ nhất?',
      options: [
        { val: 'A', text: 'Next to the hinge, straight across the door', textVn: 'Sát bản lề, vuông góc với cánh cửa' },
        { val: 'B', text: 'At the handle, straight across the door', textVn: 'Ở tay nắm, vuông góc với cánh cửa' },
        { val: 'C', text: 'At the handle, along the door toward the hinge', textVn: 'Ở tay nắm, dọc theo cánh cửa về phía bản lề' },
        { val: 'D', text: 'They all turn it the same', textVn: 'Tất cả đều làm cửa quay như nhau' },
      ],
      correct: 'B',
      expEn: 'Biggest $r$ (at the handle) AND biggest $\\sin\\theta$ (straight across, $\\sin 90^\\circ = 1$). A has a tiny $r$. C has $\\theta = 0^\\circ$, so $\\sin\\theta = 0$: it just squashes the door into its hinge. The same force can give very different torques (not D).',
      expVn: '$r$ lớn nhất (ở tay nắm) VÀ $\\sin\\theta$ lớn nhất (vuông góc, $\\sin 90^\\circ = 1$). A có $r$ rất nhỏ. C có $\\theta = 0^\\circ$, nên $\\sin\\theta = 0$: nó chỉ ép cánh cửa vào bản lề. Cùng một lực có thể tạo ra mômen lực rất khác nhau (không phải D).',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Hand',
    dense: true,
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'Pushing a Door at an Angle',
    titleVn: 'Đẩy Cửa Theo Một Góc',
    inlineSvg: DIAGRAMS.DOOR_TORQUE,
    content: '**A person pushes on a door with a force of 45.3 N at an angle of 58.2° to the plane of the door. The distance from the hinge to the point where the force is applied is 0.855 m. What is the torque applied to the door by this person?**',
    contentVn: '**Một người đẩy cánh cửa với lực 45.3 N theo góc 58.2° so với mặt phẳng cánh cửa. Khoảng cách từ bản lề tới điểm đặt lực là 0.855 m. Mômen lực người đó tác dụng lên cánh cửa là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces.** $r = 0.855$ m, $F = 45.3$ N, $\\theta = 58.2^\\circ$ (between the push and the door), $\\tau = ?$',
        textVn: '**Các đại lượng.** $r = 0.855$ m, $F = 45.3$ N, $\\theta = 58.2^\\circ$ (giữa lực đẩy và cánh cửa), $\\tau = ?$',
      },
      {
        text: '**Formula.** $\\tau = r F \\sin\\theta$',
        textVn: '**Công thức.** $\\tau = r F \\sin\\theta$',
      },
      {
        text: '**Rearrange.** Nothing to do — $\\tau$ is already alone.',
        textVn: '**Biến đổi.** Không cần làm gì — $\\tau$ đã đứng một mình.',
      },
      {
        text: '**Substitute — calculator in DEG.** $\\tau = 0.855 \\times 45.3 \\times \\sin 58.2^\\circ = 38.73 \\times 0.8499$',
        textVn: '**Thay số — máy tính ở chế độ DEG.** $\\tau = 0.855 \\times 45.3 \\times \\sin 58.2^\\circ = 38.73 \\times 0.8499$',
      },
      {
        text: '**Answer, with a unit.** $\\tau = 32.9$ N·m.',
        textVn: '**Đáp án, kèm đơn vị.** $\\tau = 32.9$ N·m.',
      },
    ],
    reveal: {
      label: 'Your calculator says 38.6?',
      labelVn: 'Máy tính của em ra 38.6?',
      prompt: 'You typed the same thing and got 38.6 N·m. What happened?',
      promptVn: 'Em gõ y như vậy mà ra 38.6 N·m. Chuyện gì đã xảy ra?',
      answer: 'Your calculator is in **RAD** mode, so it read 58.2 as radians: $\\sin(58.2 \\text{ rad}) = 0.997$. Switch to **DEG** whenever an angle is given in degrees. A quick test: $\\sin 30^\\circ$ must give 0.5.',
      answerVn: 'Máy tính của em đang ở chế độ **RAD**, nên nó hiểu 58.2 là radian: $\\sin(58.2 \\text{ rad}) = 0.997$. Hãy chuyển sang **DEG** mỗi khi góc cho bằng độ. Thử nhanh: $\\sin 30^\\circ$ phải ra 0.5.',
    },
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Scale',
    ratio: 40,
    eyebrow: 'Equilibrium — nothing turns',
    eyebrowVn: 'Cân bằng — không có gì quay',
    title: 'Balanced: Anticlockwise = Clockwise',
    titleVn: 'Cân Bằng: Ngược Chiều = Cùng Chiều Kim Đồng Hồ',
    inlineSvg: DIAGRAMS.SEESAW,
    content: 'A see-saw that does not tip is in **equilibrium**. Each weight tries to turn it: one side anticlockwise, the other clockwise.\n\nBalanced means the two turning effects are **equal**. On a level board each weight pushes straight down, at 90°, so $\\sin\\theta = 1$ and its torque is just weight × distance from the pivot.',
    contentVn: 'Một cái bập bênh không bị nghiêng là đang ở trạng thái **cân bằng**. Mỗi trọng lượng đều cố làm nó quay: một bên ngược chiều kim đồng hồ, bên kia cùng chiều kim đồng hồ.\n\nCân bằng nghĩa là hai tác dụng làm quay **bằng nhau**. Trên một tấm ván nằm ngang, mỗi trọng lượng đẩy thẳng xuống, vuông góc, nên $\\sin\\theta = 1$ và mômen lực của nó chỉ là trọng lượng × khoảng cách tới điểm tựa.',
    notes: [
      {
        tone: 'write',
        text: '**Balanced (equilibrium):** total anticlockwise torque = total clockwise torque\nTorque of a weight on a level board: $\\tau = m g \\times d$ ($d$ = distance from the pivot)\nAlso: total force up = total force down',
        textVn: '**Cân bằng:** tổng mômen lực ngược chiều kim đồng hồ = tổng mômen lực cùng chiều kim đồng hồ\nMômen lực của một trọng lượng trên tấm ván ngang: $\\tau = m g \\times d$ ($d$ = khoảng cách tới điểm tựa)\nĐồng thời: tổng lực hướng lên = tổng lực hướng xuống',
      },
    ],
    check: {
      id: 'chk_seesaw',
      q: 'A see-saw turns about its midpoint. A 22.4 kg kid sits on the left, 1.75 m from the axis. How far from the axis should a 39.8 kg kid sit on the right to balance it?',
      qVn: 'Một cái bập bênh quay quanh điểm giữa. Một bạn 22.4 kg ngồi bên trái, cách trục 1.75 m. Một bạn 39.8 kg phải ngồi bên phải cách trục bao xa để bập bênh cân bằng?',
      options: [
        { val: 'A', text: '$3.11$ m', textVn: '$3.11$ m' },
        { val: 'B', text: '$1.75$ m', textVn: '$1.75$ m' },
        { val: 'C', text: '$9.65$ m', textVn: '$9.65$ m' },
        { val: 'D', text: '$0.985$ m', textVn: '$0.985$ m' },
      ],
      correct: 'D',
      expEn: '$m_1 g d_1 = m_2 g d_2$, and $g$ cancels: $d_2 = \\dfrac{m_1 d_1}{m_2} = \\dfrac{22.4 \\times 1.75}{39.8} = 0.985$ m. The heavier kid sits CLOSER. A swapped the masses — that puts the heavy kid further out. B balances only equal masses. C multiplied by 9.8 on one side only.',
      expVn: '$m_1 g d_1 = m_2 g d_2$, và $g$ triệt tiêu: $d_2 = \\dfrac{m_1 d_1}{m_2} = \\dfrac{22.4 \\times 1.75}{39.8} = 0.985$ m. Bạn nặng hơn ngồi GẦN hơn. A đổi chỗ hai khối lượng — như vậy bạn nặng lại ngồi xa hơn. B chỉ cân bằng khi hai khối lượng bằng nhau. C nhân 9.8 chỉ ở một vế.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Users',
    dense: true,
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Teeter-Totter',
    titleVn: 'Cái Bập Bênh',
    content: '**Two people, a man weighing 72.9 kg and a woman weighing 101 kg, are sitting on a teeter-totter. The man sits 2.62 m from the fulcrum. What is the distance from the fulcrum to where the woman should sit to balance the teeter-totter in static equilibrium?**\n\nThe fulcrum is the pivot.',
    contentVn: '**Hai người, một người đàn ông nặng 72.9 kg và một người phụ nữ nặng 101 kg, ngồi trên một cái bập bênh. Người đàn ông ngồi cách điểm tựa 2.62 m. Người phụ nữ phải ngồi cách điểm tựa bao xa để bập bênh cân bằng?**\n\nĐiểm tựa (fulcrum) là trục quay.',
    steps: [
      {
        text: '**Pieces.** Man: $m_1 = 72.9$ kg, $d_1 = 2.62$ m. Woman: $m_2 = 101$ kg, $d_2 = ?$ And $g = 9.8$ m/s².',
        textVn: '**Các đại lượng.** Người đàn ông: $m_1 = 72.9$ kg, $d_1 = 2.62$ m. Người phụ nữ: $m_2 = 101$ kg, $d_2 = ?$ Và $g = 9.8$ m/s².',
      },
      {
        text: '**Formula.** Anticlockwise = clockwise: $m_1 g\\, d_1 = m_2 g\\, d_2$',
        textVn: '**Công thức.** Ngược chiều = cùng chiều kim đồng hồ: $m_1 g\\, d_1 = m_2 g\\, d_2$',
      },
      {
        text: '**Rearrange.** $m_2$ and $g$ multiply $d_2$, so divide both sides by $m_2$, then by $g$. The $g$ on the left cancels with the $g$ underneath: $d_2 = \\dfrac{m_1 d_1}{m_2}$',
        textVn: '**Biến đổi.** $m_2$ và $g$ đang nhân với $d_2$, nên chia cả hai vế cho $m_2$, rồi cho $g$. $g$ ở vế trái triệt tiêu với $g$ ở dưới: $d_2 = \\dfrac{m_1 d_1}{m_2}$',
      },
      {
        text: '**Substitute.** $d_2 = \\dfrac{72.9 \\times 2.62}{101}$',
        textVn: '**Thay số.** $d_2 = \\dfrac{72.9 \\times 2.62}{101}$',
      },
      {
        text: '**Answer, with a unit.** $d_2 = 1.89$ m. The heavier person sits closer in.',
        textVn: '**Đáp án, kèm đơn vị.** $d_2 = 1.89$ m. Người nặng hơn ngồi gần vào trong hơn.',
      },
    ],
    check: {
      id: 'chk_g_cancels',
      q: 'Why did $g$ disappear from the answer?',
      qVn: 'Vì sao $g$ biến mất khỏi đáp án?',
      options: [
        { val: 'A', text: 'It multiplies both sides, so dividing by $g$ cancels it', textVn: 'Nó nhân ở cả hai vế, nên chia cho $g$ thì nó triệt tiêu' },
        { val: 'B', text: '$g$ is zero on a teeter-totter', textVn: '$g$ bằng không trên bập bênh' },
        { val: 'C', text: 'It was forgotten — the answer is wrong', textVn: 'Nó bị quên — đáp án sai' },
        { val: 'D', text: 'It only cancels when the masses are equal', textVn: 'Nó chỉ triệt tiêu khi hai khối lượng bằng nhau' },
      ],
      correct: 'A',
      expEn: 'Both weights are $mg$, so $g$ is on both sides of $m_1 g\\, d_1 = m_2 g\\, d_2$. Dividing both sides by $g$ removes it from both — like the mass that cancelled in circular motion. Gravity is not zero (B), nothing was forgotten (C), and it cancels for ANY masses (D).',
      expVn: 'Cả hai trọng lượng đều là $mg$, nên $g$ có ở cả hai vế của $m_1 g\\, d_1 = m_2 g\\, d_2$. Chia cả hai vế cho $g$ thì nó mất ở cả hai — giống khối lượng bị triệt tiêu trong chuyển động tròn. Trọng lực không bằng không (B), không có gì bị quên (C), và nó triệt tiêu với MỌI khối lượng (D).',
    },
  },

  {
    layout: 'stack',
    accent: GREEN,
    icon: 'MapPin',
    columns: 2,
    eyebrow: 'The trick for boards, tables and poles',
    eyebrowVn: 'Mẹo cho tấm ván, cái bàn và cây sào',
    title: 'Two Supports: Choose Your Pivot',
    titleVn: 'Hai Giá Đỡ: Tự Chọn Điểm Tựa',
    content: 'A board on two supports has TWO unknown forces — and one equation cannot find two unknowns.\n\nThe trick: **you** choose where the pivot is. Put it at the support you are **NOT** asked about. That force is 0 m from the pivot, so its torque is $F \\times 0 = 0$. It vanishes — just as "at rest" made a term vanish in momentum.\n\nThen measure EVERY distance from that pivot.',
    contentVn: 'Một tấm ván trên hai giá đỡ có HAI lực chưa biết — và một phương trình không thể tìm được hai ẩn.\n\nMẹo: **em** được chọn điểm tựa ở đâu. Đặt nó ở giá đỡ mà đề **KHÔNG** hỏi. Lực đó cách điểm tựa 0 m, nên mômen lực của nó là $F \\times 0 = 0$. Nó biến mất — giống như "đứng yên" làm một số hạng biến mất trong bài động lượng.\n\nRồi đo MỌI khoảng cách từ điểm tựa đó.',
    notes: [
      {
        tone: 'write',
        text: '**Two supports:** put the pivot at the support you are NOT asked about — its torque is 0.\n**A uniform board\'s weight** $Mg$ acts at its **middle**, $L/2$ from either end.',
        textVn: '**Hai giá đỡ:** đặt điểm tựa ở giá đỡ mà đề KHÔNG hỏi — mômen lực của nó bằng 0.\n**Trọng lượng của tấm ván đồng chất** $Mg$ đặt ở **chính giữa**, cách mỗi đầu $L/2$.',
      },
      {
        tone: 'homework',
        text: 'A weight given in **newtons** (N) is already $mg$. Do NOT multiply it by 9.8 again. Only a mass in **kg** gets × 9.8.',
        textVn: 'Trọng lượng cho bằng **niutơn** (N) đã là $mg$ rồi. KHÔNG nhân với 9.8 thêm lần nữa. Chỉ khối lượng tính bằng **kg** mới nhân 9.8.',
      },
    ],
    activity: {
      type: 'order',
      id: 'act_pivot_order',
      prompt: 'A board rests on two supports. Put the moves in order to find the RIGHT support\'s force.',
      promptVn: 'Một tấm ván nằm trên hai giá đỡ. Sắp xếp các bước theo thứ tự để tìm lực của giá đỡ BÊN PHẢI.',
      explain: 'Picture first: every force, where it acts. Then the pivot goes on the LEFT support — the one not asked about — so its force drops out. Distances are measured from that pivot, with the board\'s weight at the middle. Balance the turning, then rearrange, and the numbers go in last.',
      explainVn: 'Hình vẽ trước: mọi lực, và chỗ nó tác dụng. Rồi đặt điểm tựa ở giá đỡ BÊN TRÁI — cái mà đề không hỏi — để lực của nó biến mất. Khoảng cách đo từ điểm tựa đó, với trọng lượng tấm ván ở chính giữa. Cân bằng tác dụng quay, rồi biến đổi, và thay số sau cùng.',
      steps: [
        { id: 's1', name: 'Draw the board and every force on it', nameVn: 'Vẽ tấm ván và mọi lực tác dụng lên nó' },
        { id: 's2', name: 'Put the pivot at the LEFT support', nameVn: 'Đặt điểm tựa ở giá đỡ BÊN TRÁI' },
        { id: 's3', name: 'Write each distance from the pivot — the board\'s weight at the middle', nameVn: 'Ghi từng khoảng cách tới điểm tựa — trọng lượng tấm ván ở chính giữa' },
        { id: 's4', name: 'Set the clockwise torques equal to the anticlockwise torques', nameVn: 'Cho tổng mômen cùng chiều kim đồng hồ bằng tổng mômen ngược chiều' },
        { id: 's5', name: 'Rearrange for the force, then substitute', nameVn: 'Biến đổi để tìm lực, rồi thay số' },
      ],
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Hammer',
    dense: true,
    eyebrow: 'From your Acellus screen',
    eyebrowVn: 'Từ màn hình Acellus của em',
    title: 'The Board on Two Sawhorses',
    titleVn: 'Tấm Ván Trên Hai Giá Đỡ',
    inlineSvg: DIAGRAMS.SAWHORSE,
    content: '**A 10.5 kg board 6.00 m long is supported by two sawhorses, one at each end. A 4.45 kg saw sits on the board 1.80 m from the left end. What is the upward force that the RIGHT sawhorse exerts on the board?**',
    contentVn: '**Một tấm ván 10.5 kg dài 6.00 m được đỡ bởi hai giá đỡ, mỗi giá ở một đầu. Một cái cưa 4.45 kg nằm trên tấm ván, cách đầu trái 1.80 m. Giá đỡ BÊN PHẢI tác dụng lên tấm ván một lực hướng lên bao nhiêu?**',
    steps: [
      {
        text: '**Pieces.** Board: $M = 10.5$ kg, $L = 6.00$ m. Saw: $m = 4.45$ kg, 1.80 m from the left. $F_R = ?$ Pivot at the LEFT sawhorse.',
        textVn: '**Các đại lượng.** Tấm ván: $M = 10.5$ kg, $L = 6.00$ m. Cái cưa: $m = 4.45$ kg, cách đầu trái 1.80 m. $F_R = ?$ Điểm tựa ở giá đỡ BÊN TRÁI.',
      },
      {
        text: '**Formula.** $F_R$ pushes up 6.00 m away and turns the board one way. The board\'s weight (3.00 m, the middle) and the saw (1.80 m) turn it the other way: $F_R \\times L = Mg \\times \\tfrac{L}{2} + mg \\times 1.80$',
        textVn: '**Công thức.** $F_R$ đẩy lên ở cách 6.00 m và làm ván quay một chiều. Trọng lượng tấm ván (3.00 m, chính giữa) và cái cưa (1.80 m) làm nó quay chiều kia: $F_R \\times L = Mg \\times \\tfrac{L}{2} + mg \\times 1.80$',
      },
      {
        text: '**Rearrange.** $L$ multiplies $F_R$, so divide the WHOLE other side by $L$: $F_R = \\dfrac{Mg \\times \\tfrac{L}{2} + mg \\times 1.80}{L}$',
        textVn: '**Biến đổi.** $L$ đang nhân với $F_R$, nên chia CẢ vế kia cho $L$: $F_R = \\dfrac{Mg \\times \\tfrac{L}{2} + mg \\times 1.80}{L}$',
      },
      {
        text: '**Substitute.** $F_R = \\dfrac{10.5 \\times 9.8 \\times 3.00 + 4.45 \\times 9.8 \\times 1.80}{6.00} = \\dfrac{308.7 + 78.50}{6.00}$',
        textVn: '**Thay số.** $F_R = \\dfrac{10.5 \\times 9.8 \\times 3.00 + 4.45 \\times 9.8 \\times 1.80}{6.00} = \\dfrac{308.7 + 78.50}{6.00}$',
      },
      {
        text: '**Answer, with a unit.** $F_R = 64.5$ N.',
        textVn: '**Đáp án, kèm đơn vị.** $F_R = 64.5$ N.',
      },
    ],
    reveal: {
      label: 'Check it with up = down',
      labelVn: 'Kiểm tra bằng lên = xuống',
      prompt: 'How much does the LEFT sawhorse hold? Does that make sense?',
      promptVn: 'Giá đỡ BÊN TRÁI đỡ bao nhiêu? Điều đó có hợp lý không?',
      answer: 'Total weight: $(10.5 + 4.45) \\times 9.8 = 146.5$ N. Up = down, so the left sawhorse holds $146.5 - 64.5 = 82.0$ N. More than the right one — and the saw IS nearer the left end. It makes sense.',
      answerVn: 'Tổng trọng lượng: $(10.5 + 4.45) \\times 9.8 = 146.5$ N. Lên = xuống, nên giá đỡ bên trái đỡ $146.5 - 64.5 = 82.0$ N. Nhiều hơn giá bên phải — và cái cưa ĐÚNG LÀ gần đầu trái hơn. Hợp lý.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Box',
    dense: true,
    eyebrow: 'From your Acellus screen · the same shape again',
    eyebrowVn: 'Từ màn hình Acellus của em · lại cùng dạng đó',
    title: 'Ann, Bob and the Box',
    titleVn: 'Ann, Bob và Cái Hộp',
    content: '**Ann and Bob are carrying an 18.5 kg table that is 2.25 m long. An 8.33 kg box sits on the table 0.750 m from Ann. How much lift force does Bob exert?**\n\nBob is the one asked about, so the pivot goes at Ann.',
    contentVn: '**Ann và Bob đang khiêng một cái bàn 18.5 kg dài 2.25 m. Một cái hộp 8.33 kg nằm trên bàn, cách Ann 0.750 m. Bob tác dụng một lực nâng bao nhiêu?**\n\nĐề hỏi về Bob, nên điểm tựa đặt ở Ann.',
    steps: [
      {
        text: '**Pieces.** Table: $M = 18.5$ kg, $L = 2.25$ m. Box: $m = 8.33$ kg, 0.750 m from Ann. $F_B = ?$ Pivot at Ann.',
        textVn: '**Các đại lượng.** Cái bàn: $M = 18.5$ kg, $L = 2.25$ m. Cái hộp: $m = 8.33$ kg, cách Ann 0.750 m. $F_B = ?$ Điểm tựa ở Ann.',
      },
      {
        text: '**Formula.** Bob lifts at the far end; the table (at its middle) and the box pull down: $F_B \\times L = Mg \\times \\tfrac{L}{2} + mg \\times 0.750$',
        textVn: '**Công thức.** Bob nâng ở đầu xa; cái bàn (ở chính giữa) và cái hộp kéo xuống: $F_B \\times L = Mg \\times \\tfrac{L}{2} + mg \\times 0.750$',
      },
      {
        text: '**Rearrange.** Divide the whole other side by $L$: $F_B = \\dfrac{Mg \\times \\tfrac{L}{2} + mg \\times 0.750}{L}$',
        textVn: '**Biến đổi.** Chia cả vế kia cho $L$: $F_B = \\dfrac{Mg \\times \\tfrac{L}{2} + mg \\times 0.750}{L}$',
      },
      {
        text: '**Substitute.** $F_B = \\dfrac{18.5 \\times 9.8 \\times 1.125 + 8.33 \\times 9.8 \\times 0.750}{2.25} = \\dfrac{203.96 + 61.23}{2.25}$',
        textVn: '**Thay số.** $F_B = \\dfrac{18.5 \\times 9.8 \\times 1.125 + 8.33 \\times 9.8 \\times 0.750}{2.25} = \\dfrac{203.96 + 61.23}{2.25}$',
      },
      {
        text: '**Answer, with a unit.** $F_B = 118$ N.',
        textVn: '**Đáp án, kèm đơn vị.** $F_B = 118$ N.',
      },
    ],
    check: {
      id: 'chk_vaulter',
      q: 'A vaulter holds a horizontal 3.00 kg pole, 4.50 m long. His back hand pushes down on one end. His front hand lifts straight up, 0.750 m from that end. How much force does his front hand exert?',
      qVn: 'Một vận động viên nhảy sào cầm ngang một cây sào 3.00 kg, dài 4.50 m. Tay sau ấn xuống ở một đầu. Tay trước nâng thẳng lên, cách đầu đó 0.750 m. Tay trước tác dụng một lực bao nhiêu?',
      options: [
        { val: 'A', text: '$9.00$ N', textVn: '$9.00$ N' },
        { val: 'B', text: '$88.2$ N', textVn: '$88.2$ N' },
        { val: 'C', text: '$176$ N', textVn: '$176$ N' },
        { val: 'D', text: '$29.4$ N', textVn: '$29.4$ N' },
      ],
      correct: 'B',
      expEn: 'Pivot at the back hand — the force not asked about. The pole\'s weight acts at its middle, 2.25 m from that end: $F \\times 0.750 = 3.00 \\times 9.8 \\times 2.25$, so $F = 88.2$ N. A forgot $g$. C put the weight at the far end (4.50 m), not the middle. D is just the weight, $mg$.',
      expVn: 'Điểm tựa ở tay sau — lực mà đề không hỏi. Trọng lượng cây sào đặt ở chính giữa, cách đầu đó 2.25 m: $F \\times 0.750 = 3.00 \\times 9.8 \\times 2.25$, nên $F = 88.2$ N. A quên $g$. C đặt trọng lượng ở đầu xa (4.50 m), không phải chính giữa. D chỉ là trọng lượng, $mg$.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Ruler',
    dense: true,
    eyebrow: 'From your Acellus screen · work out the distances first',
    eyebrowVn: 'Từ màn hình Acellus của em · tính khoảng cách trước',
    title: 'Alex and Ben Carry a Plank',
    titleVn: 'Alex và Ben Khiêng Tấm Ván',
    content: '**A wooden plank, weighing 608 N and measuring 6.05 m in length, is held by two workers, Alex and Ben. Alex supports the plank 1.54 m from one end, while Ben supports it 2.57 m from the other end. What is the force exerted by Ben?**\n\nNeither worker is at an end. So first find every position from ONE end.',
    contentVn: '**Một tấm ván gỗ nặng 608 N và dài 6.05 m được hai công nhân, Alex và Ben, giữ. Alex đỡ tấm ván cách một đầu 1.54 m, còn Ben đỡ nó cách đầu kia 2.57 m. Lực Ben tác dụng là bao nhiêu?**\n\nKhông ai đứng ở đầu ván. Nên trước tiên tìm mọi vị trí tính từ MỘT đầu.',
    steps: [
      {
        text: '**Pieces.** $W = 608$ N — already a weight, so NO × 9.8. From Alex\'s end: Alex at 1.54 m, the middle at $6.05 \\div 2 = 3.025$ m, Ben at $6.05 - 2.57 = 3.48$ m. $F_{Ben} = ?$',
        textVn: '**Các đại lượng.** $W = 608$ N — đã là trọng lượng, nên KHÔNG × 9.8. Tính từ đầu phía Alex: Alex ở 1.54 m, chính giữa ở $6.05 \\div 2 = 3.025$ m, Ben ở $6.05 - 2.57 = 3.48$ m. $F_{Ben} = ?$',
      },
      {
        text: '**Formula, pivot at Alex.** Distances from Alex: the weight $3.025 - 1.54 = 1.485$ m, Ben $3.48 - 1.54 = 1.94$ m. So $F_{Ben} \\times 1.94 = W \\times 1.485$',
        textVn: '**Công thức, điểm tựa ở Alex.** Khoảng cách tới Alex: trọng lượng $3.025 - 1.54 = 1.485$ m, Ben $3.48 - 1.54 = 1.94$ m. Nên $F_{Ben} \\times 1.94 = W \\times 1.485$',
      },
      {
        text: '**Rearrange.** 1.94 multiplies $F_{Ben}$, so divide both sides by 1.94: $F_{Ben} = \\dfrac{W \\times 1.485}{1.94}$',
        textVn: '**Biến đổi.** 1.94 đang nhân với $F_{Ben}$, nên chia cả hai vế cho 1.94: $F_{Ben} = \\dfrac{W \\times 1.485}{1.94}$',
      },
      {
        text: '**Substitute.** $F_{Ben} = \\dfrac{608 \\times 1.485}{1.94}$',
        textVn: '**Thay số.** $F_{Ben} = \\dfrac{608 \\times 1.485}{1.94}$',
      },
      {
        text: '**Answer, with a unit.** $F_{Ben} = 465$ N. (Up = down, so Alex holds $608 - 465 = 143$ N.)',
        textVn: '**Đáp án, kèm đơn vị.** $F_{Ben} = 465$ N. (Lên = xuống, nên Alex giữ $608 - 465 = 143$ N.)',
      },
    ],
    reveal: {
      label: 'Did you multiply 608 by 9.8?',
      labelVn: 'Em có nhân 608 với 9.8 không?',
      prompt: 'What happens if you treat 608 as a mass?',
      promptVn: 'Chuyện gì xảy ra nếu em coi 608 là khối lượng?',
      answer: 'You get 4560 N — ten times too big, and more than the whole plank weighs. "Weighing 608 N" is already the force of gravity, $mg$. Only a MASS in kg gets × 9.8.',
      answerVn: 'Em được 4560 N — lớn gấp mười lần, và còn nặng hơn cả tấm ván. "Nặng 608 N" đã là lực hấp dẫn, $mg$. Chỉ KHỐI LƯỢNG tính bằng kg mới nhân 9.8.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'Landmark',
    dense: true,
    eyebrow: 'From your Acellus screen · balance with an angle',
    eyebrowVn: 'Từ màn hình Acellus của em · cân bằng có góc',
    title: 'The Drawbridge',
    titleVn: 'Cây Cầu Nâng',
    inlineSvg: DIAGRAMS.DRAWBRIDGE,
    content: '**A 2,150 kg drawbridge, 8.74 m long, is held up by a chain attached to the end. The chain makes a 51.0° angle. What force does the chain exert?**\n\nPivot at the hinge: its force is the one you are not asked about.',
    contentVn: '**Một cây cầu nâng 2,150 kg, dài 8.74 m, được giữ bởi một sợi xích gắn ở đầu cầu. Sợi xích tạo góc 51.0°. Sợi xích tác dụng một lực bao nhiêu?**\n\nĐiểm tựa ở bản lề: lực của nó là lực mà đề không hỏi.',
    steps: [
      {
        text: '**Pieces.** $M = 2150$ kg, $L = 8.74$ m. The chain pulls at the end (distance $L$) at $\\theta = 51.0^\\circ$ to the bridge. $T = ?$',
        textVn: '**Các đại lượng.** $M = 2150$ kg, $L = 8.74$ m. Sợi xích kéo ở đầu cầu (khoảng cách $L$) theo góc $\\theta = 51.0^\\circ$ so với cây cầu. $T = ?$',
      },
      {
        text: '**Formula.** The chain\'s torque is $r F \\sin\\theta$. The weight acts at the middle, straight down: $T \\times L \\times \\sin 51.0^\\circ = Mg \\times \\tfrac{L}{2}$',
        textVn: '**Công thức.** Mômen lực của sợi xích là $r F \\sin\\theta$. Trọng lượng đặt ở chính giữa, hướng thẳng xuống: $T \\times L \\times \\sin 51.0^\\circ = Mg \\times \\tfrac{L}{2}$',
      },
      {
        text: '**Rearrange.** $L$ is on both sides, so it cancels. Then divide by $\\sin 51.0^\\circ$: $T = \\dfrac{Mg}{2 \\sin 51.0^\\circ}$',
        textVn: '**Biến đổi.** $L$ có ở cả hai vế, nên nó triệt tiêu. Rồi chia cho $\\sin 51.0^\\circ$: $T = \\dfrac{Mg}{2 \\sin 51.0^\\circ}$',
      },
      {
        text: '**Substitute — calculator in DEG.** $T = \\dfrac{2150 \\times 9.8}{2 \\times \\sin 51.0^\\circ} = \\dfrac{21{,}070}{1.554}$',
        textVn: '**Thay số — máy tính ở chế độ DEG.** $T = \\dfrac{2150 \\times 9.8}{2 \\times \\sin 51.0^\\circ} = \\dfrac{21{,}070}{1.554}$',
      },
      {
        text: '**Answer, with a unit.** $T = 13{,}600$ N $= 1.36 \\times 10^4$ N. The length, 8.74 m, was never needed.',
        textVn: '**Đáp án, kèm đơn vị.** $T = 13{,}600$ N $= 1.36 \\times 10^4$ N. Chiều dài 8.74 m hoàn toàn không cần dùng.',
      },
    ],
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Weight',
    ratio: 40,
    eyebrow: 'The turning twin of mass',
    eyebrowVn: 'Sinh đôi của khối lượng trong chuyển động quay',
    title: 'Moment of Inertia: How Hard to Spin?',
    titleVn: 'Mômen Quán Tính: Khó Quay Đến Mức Nào?',
    inlineSvg: DIAGRAMS.INERTIA_REACH,
    content: 'Mass tells you how hard something is to push. **Moment of inertia** $I$ tells you how hard it is to SPIN.\n\nIt depends on the mass AND on how far that mass is from the axis. The distance is **squared**, so mass far out counts much more than mass near the middle.',
    contentVn: 'Khối lượng cho biết một vật khó đẩy đến mức nào. **Mômen quán tính** $I$ cho biết nó khó QUAY đến mức nào.\n\nNó phụ thuộc vào khối lượng VÀ khoảng cách của khối lượng đó tới trục. Khoảng cách được **bình phương**, nên khối lượng ở xa có ảnh hưởng lớn hơn nhiều so với khối lượng ở gần tâm.',
    notes: [
      {
        tone: 'write',
        text: '**One small mass:** $I = m r^2$, in **kg·m²** ($r$ = distance from the axis)\n**Several pieces:** find $I$ for each, then **add** them\n**A rod about one end:** $I = \\tfrac{1}{3} M L^2$',
        textVn: '**Một khối lượng nhỏ:** $I = m r^2$, đơn vị **kg·m²** ($r$ = khoảng cách tới trục)\n**Nhiều phần:** tìm $I$ của từng phần, rồi **cộng** lại\n**Một thanh quay quanh một đầu:** $I = \\tfrac{1}{3} M L^2$',
      },
      {
        tone: 'info',
        text: 'Other shapes — Acellus gives these in the hint: solid disk $\\tfrac{1}{2}MR^2$ · hoop $MR^2$ · rod about its middle $\\tfrac{1}{12}ML^2$ · solid ball $\\tfrac{2}{5}MR^2$',
        textVn: 'Các hình khác — Acellus cho trong phần gợi ý: đĩa đặc $\\tfrac{1}{2}MR^2$ · vòng tròn $MR^2$ · thanh quay quanh điểm giữa $\\tfrac{1}{12}ML^2$ · quả cầu đặc $\\tfrac{2}{5}MR^2$',
      },
    ],
    check: {
      id: 'chk_inertia_double',
      q: 'A 2.00 kg ball on a light rod is moved from 0.500 m to 1.00 m from the axis. What happens to its moment of inertia?',
      qVn: 'Một quả cầu 2.00 kg trên một thanh nhẹ được dời từ 0.500 m ra 1.00 m tính từ trục. Mômen quán tính của nó thay đổi thế nào?',
      options: [
        { val: 'A', text: 'It doubles', textVn: 'Nó tăng gấp đôi' },
        { val: 'B', text: 'It stays the same — the mass did not change', textVn: 'Nó giữ nguyên — khối lượng không đổi' },
        { val: 'C', text: 'It becomes 4 times bigger', textVn: 'Nó lớn gấp 4 lần' },
        { val: 'D', text: 'It halves', textVn: 'Nó giảm một nửa' },
      ],
      correct: 'C',
      expEn: '$I = m r^2$: $2.00 \\times 0.500^2 = 0.500$ kg·m² becomes $2.00 \\times 1.00^2 = 2.00$ kg·m² — 4 times bigger, because $r$ is SQUARED. A forgot the square. B treats $I$ like mass, but where the mass sits matters. D has it backwards: further out is harder to spin.',
      expVn: '$I = m r^2$: $2.00 \\times 0.500^2 = 0.500$ kg·m² thành $2.00 \\times 1.00^2 = 2.00$ kg·m² — lớn gấp 4 lần, vì $r$ được BÌNH PHƯƠNG. A quên bình phương. B coi $I$ như khối lượng, nhưng vị trí của khối lượng rất quan trọng. D bị ngược: càng xa càng khó quay.',
    },
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Layers',
    dense: true,
    eyebrow: 'From your Acellus screen · "find each and add"',
    eyebrowVn: 'Từ màn hình Acellus của em · "tìm từng cái rồi cộng"',
    title: 'The Rod and the Weight',
    titleVn: 'Thanh và Quả Nặng',
    content: '**A 0.500 kg rod, 0.335 m long, can rotate about an axis at one end. It has a 0.350 kg weight attached to its other end. What is the total moment of inertia?** Hint: find the moment of inertia for each and add.',
    contentVn: '**Một thanh 0.500 kg, dài 0.335 m, có thể quay quanh trục ở một đầu. Ở đầu kia của nó gắn một quả nặng 0.350 kg. Tổng mômen quán tính là bao nhiêu?** Gợi ý: tìm mômen quán tính của từng cái rồi cộng lại.',
    steps: [
      {
        text: '**Pieces.** Rod: $M = 0.500$ kg, $L = 0.335$ m. Weight: $m = 0.350$ kg at the far end, so $r = 0.335$ m. $I = ?$',
        textVn: '**Các đại lượng.** Thanh: $M = 0.500$ kg, $L = 0.335$ m. Quả nặng: $m = 0.350$ kg ở đầu xa, nên $r = 0.335$ m. $I = ?$',
      },
      {
        text: '**Formula.** Add the two pieces: $I = I_{rod} + I_{weight} = \\tfrac{1}{3} M L^2 + m r^2$',
        textVn: '**Công thức.** Cộng hai phần: $I = I_{thanh} + I_{quả\\,nặng} = \\tfrac{1}{3} M L^2 + m r^2$',
      },
      {
        text: '**Rearrange.** Nothing to do — $I$ is already alone.',
        textVn: '**Biến đổi.** Không cần làm gì — $I$ đã đứng một mình.',
      },
      {
        text: '**Substitute.** $I = \\tfrac{1}{3} \\times 0.500 \\times 0.335^2 + 0.350 \\times 0.335^2 = 0.01870 + 0.03928$',
        textVn: '**Thay số.** $I = \\tfrac{1}{3} \\times 0.500 \\times 0.335^2 + 0.350 \\times 0.335^2 = 0.01870 + 0.03928$',
      },
      {
        text: '**Answer, with a unit.** $I = 0.0580$ kg·m². The small weight at the end counts for more than the whole rod.',
        textVn: '**Đáp án, kèm đơn vị.** $I = 0.0580$ kg·m². Quả nặng nhỏ ở đầu thanh đóng góp nhiều hơn cả cái thanh.',
      },
    ],
    check: {
      id: 'chk_rod_wrong',
      q: 'A student gets 0.0954 kg·m². What did they do?',
      qVn: 'Một học sinh ra 0.0954 kg·m². Bạn ấy đã làm gì?',
      options: [
        { val: 'A', text: 'Forgot to square 0.335', textVn: 'Quên bình phương 0.335' },
        { val: 'B', text: 'Used $\\tfrac{1}{3}$ for the weight as well', textVn: 'Dùng $\\tfrac{1}{3}$ cho cả quả nặng' },
        { val: 'C', text: 'Nothing — it is right', textVn: 'Không sai gì — đó là đáp án đúng' },
        { val: 'D', text: 'Treated the rod as if all its mass were at the end: $(0.500 + 0.350) \\times 0.335^2$', textVn: 'Coi như toàn bộ khối lượng của thanh nằm ở đầu: $(0.500 + 0.350) \\times 0.335^2$' },
      ],
      correct: 'D',
      expEn: '$(0.500 + 0.350) \\times 0.335^2 = 0.0954$. But a rod\'s mass is spread along it, mostly nearer the axis than the end, so it counts only $\\tfrac{1}{3}$ of $ML^2$. A gives 0.173. B gives 0.0318. The right answer is 0.0580.',
      expVn: '$(0.500 + 0.350) \\times 0.335^2 = 0.0954$. Nhưng khối lượng của thanh trải dọc theo nó, phần lớn gần trục hơn là ở đầu, nên nó chỉ tính $\\tfrac{1}{3}$ của $ML^2$. A ra 0.173. B ra 0.0318. Đáp án đúng là 0.0580.',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Star',
    eyebrow: 'Next Acellus lesson · Rotational Dynamics',
    eyebrowVn: 'Bài Acellus tiếp theo · Động lực học vật rắn quay',
    title: 'Newton\'s Second Law, Spinning',
    titleVn: 'Định Luật II Newton Cho Chuyển Động Quay',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$\\tau = I \\alpha$',
    textVn: '$\\tau = I \\alpha$',
    sub: '$F = ma$ swapped: the torque is the push, the moment of inertia is the mass, and $\\alpha$ is the acceleration.',
    subVn: '$F = ma$ đã đổi chữ: mômen lực là lực đẩy, mômen quán tính là khối lượng, và $\\alpha$ là gia tốc.',
    notes: [
      {
        tone: 'write',
        text: '$\\tau$ = torque, in **N·m** · $I$ = moment of inertia, in **kg·m²** · $\\alpha$ = angular acceleration, in **rad/s²**',
        textVn: '$\\tau$ = mômen lực, đơn vị **N·m** · $I$ = mômen quán tính, đơn vị **kg·m²** · $\\alpha$ = gia tốc góc, đơn vị **rad/s²**',
      },
    ],
    check: {
      id: 'chk_tau_ialpha',
      q: 'A torque of 12.0 N·m acts on a wheel with $I = 3.00$ kg·m². What is its angular acceleration?',
      qVn: 'Một mômen lực 12.0 N·m tác dụng lên một bánh xe có $I = 3.00$ kg·m². Gia tốc góc của nó là bao nhiêu?',
      options: [
        { val: 'A', text: '$36.0$ rad/s²', textVn: '$36.0$ rad/s²' },
        { val: 'B', text: '$0.250$ rad/s²', textVn: '$0.250$ rad/s²' },
        { val: 'C', text: '$4.00$ rad/s²', textVn: '$4.00$ rad/s²' },
        { val: 'D', text: '$15.0$ rad/s²', textVn: '$15.0$ rad/s²' },
      ],
      correct: 'C',
      expEn: '$I$ multiplies $\\alpha$, so divide by $I$: $\\alpha = \\dfrac{\\tau}{I} = \\dfrac{12.0}{3.00} = 4.00$ rad/s². A multiplied. B is upside down. D added.',
      expVn: '$I$ đang nhân với $\\alpha$, nên chia cho $I$: $\\alpha = \\dfrac{\\tau}{I} = \\dfrac{12.0}{3.00} = 4.00$ rad/s². A nhân. B bị lộn ngược. D cộng.',
    },
  },

  {
    layout: 'steps',
    accent: RED,
    icon: 'CircleDot',
    dense: true,
    eyebrow: 'Practice for your next Acellus lesson · Rotational Dynamics',
    eyebrowVn: 'Luyện trước cho bài Acellus tiếp theo · Động lực học vật rắn quay',
    title: 'A Torque Spins Up a Disk',
    titleVn: 'Một Mômen Lực Làm Đĩa Quay Nhanh Dần',
    content: '**A torque of 0.650 N·m acts on a 2.40 kg solid disk of radius 18.0 cm. The moment of inertia of a solid disk is I = ½MR². What is the disk\'s angular acceleration?**',
    contentVn: '**Một mômen lực 0.650 N·m tác dụng lên một đĩa đặc 2.40 kg bán kính 18.0 cm. Mômen quán tính của đĩa đặc là I = ½MR². Gia tốc góc của đĩa là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces, in SI.** $\\tau = 0.650$ N·m, $M = 2.40$ kg, $R = 18.0$ cm $= 0.180$ m, $\\alpha = ?$',
        textVn: '**Các đại lượng, đổi sang SI.** $\\tau = 0.650$ N·m, $M = 2.40$ kg, $R = 18.0$ cm $= 0.180$ m, $\\alpha = ?$',
      },
      {
        text: '**Formula.** $\\tau = I\\alpha$ with $I = \\tfrac{1}{2} M R^2$ put in: $\\tau = \\tfrac{1}{2} M R^2 \\alpha$',
        textVn: '**Công thức.** $\\tau = I\\alpha$ với $I = \\tfrac{1}{2} M R^2$ được thay vào: $\\tau = \\tfrac{1}{2} M R^2 \\alpha$',
      },
      {
        text: '**Rearrange.** ÷ $M$, ÷ $R^2$, then × 2 undoes the $\\tfrac{1}{2}$: $\\alpha = \\dfrac{2\\tau}{M R^2}$',
        textVn: '**Biến đổi.** ÷ $M$, ÷ $R^2$, rồi × 2 để khử $\\tfrac{1}{2}$: $\\alpha = \\dfrac{2\\tau}{M R^2}$',
      },
      {
        text: '**Substitute.** $\\alpha = \\dfrac{2 \\times 0.650}{2.40 \\times 0.180^2} = \\dfrac{1.30}{0.07776}$',
        textVn: '**Thay số.** $\\alpha = \\dfrac{2 \\times 0.650}{2.40 \\times 0.180^2} = \\dfrac{1.30}{0.07776}$',
      },
      {
        text: '**Answer, with a unit.** $\\alpha = 16.7$ rad/s².',
        textVn: '**Đáp án, kèm đơn vị.** $\\alpha = 16.7$ rad/s².',
      },
    ],
    check: {
      id: 'chk_disk_cm',
      q: 'A student leaves the radius as 18.0 (in cm). How far off is their answer?',
      qVn: 'Một học sinh để bán kính là 18.0 (đơn vị cm). Đáp án của bạn ấy lệch bao nhiêu?',
      options: [
        { val: 'A', text: 'About 100 times too small', textVn: 'Nhỏ hơn khoảng 100 lần' },
        { val: 'B', text: 'About 10,000 times too small', textVn: 'Nhỏ hơn khoảng 10,000 lần' },
        { val: 'C', text: 'Exactly right — units do not matter here', textVn: 'Đúng hoàn toàn — ở đây đơn vị không quan trọng' },
        { val: 'D', text: 'About 100 times too big', textVn: 'Lớn hơn khoảng 100 lần' },
      ],
      correct: 'B',
      expEn: '$R$ is SQUARED, so the cm mistake is squared too: $18.0^2 = 324$ instead of $0.180^2 = 0.0324$ — 10,000 times bigger on the bottom, so $\\alpha$ comes out 10,000 times too small (0.00167). A forgets that the square doubles the damage. Units always matter (not C).',
      expVn: '$R$ được BÌNH PHƯƠNG, nên lỗi cm cũng bị bình phương: $18.0^2 = 324$ thay vì $0.180^2 = 0.0324$ — mẫu số lớn gấp 10,000 lần, nên $\\alpha$ nhỏ hơn 10,000 lần (0.00167). A quên rằng bình phương làm lỗi lớn gấp bội. Đơn vị luôn quan trọng (không phải C).',
    },
  },

  {
    layout: 'statement',
    accent: RED,
    icon: 'Star',
    eyebrow: 'Next Acellus lesson · Rotational Kinetic Energy',
    eyebrowVn: 'Bài Acellus tiếp theo · Động năng quay',
    title: 'Rotational Kinetic Energy',
    titleVn: 'Động Năng Quay',
    label: 'Write this down',
    labelVn: 'Chép vào vở',
    labelIcon: 'Pencil',
    text: '$KE = \\tfrac{1}{2} I \\omega^2$',
    textVn: '$KE = \\tfrac{1}{2} I \\omega^2$',
    sub: 'A spinning thing stores energy. It is $\\tfrac{1}{2} m v^2$ with the letters swapped: $I$ for $m$, $\\omega$ for $v$.',
    subVn: 'Một vật đang quay tích trữ năng lượng. Đó là $\\tfrac{1}{2} m v^2$ đã đổi chữ: $I$ thay cho $m$, $\\omega$ thay cho $v$.',
    notes: [
      {
        tone: 'write',
        text: '$KE$ = rotational kinetic energy, in **joules (J)** · $I$ in kg·m² · $\\omega$ in rad/s',
        textVn: '$KE$ = động năng quay, đơn vị **jun (J)** · $I$ đơn vị kg·m² · $\\omega$ đơn vị rad/s',
      },
    ],
    check: {
      id: 'chk_rot_ke',
      q: 'The rod and weight ($I = 0.0580$ kg·m²) spin at 5.00 rad/s. How much rotational kinetic energy do they have?',
      qVn: 'Thanh và quả nặng ($I = 0.0580$ kg·m²) quay với 5.00 rad/s. Chúng có bao nhiêu động năng quay?',
      options: [
        { val: 'A', text: '$1.45$ J', textVn: '$1.45$ J' },
        { val: 'B', text: '$0.145$ J', textVn: '$0.145$ J' },
        { val: 'C', text: '$0.290$ J', textVn: '$0.290$ J' },
        { val: 'D', text: '$0.725$ J', textVn: '$0.725$ J' },
      ],
      correct: 'D',
      expEn: '$KE = \\tfrac{1}{2} \\times 0.0580 \\times 5.00^2 = \\tfrac{1}{2} \\times 0.0580 \\times 25.0 = 0.725$ J. A forgot the $\\tfrac{1}{2}$. B forgot to square $\\omega$. C forgot both.',
      expVn: '$KE = \\tfrac{1}{2} \\times 0.0580 \\times 5.00^2 = \\tfrac{1}{2} \\times 0.0580 \\times 25.0 = 0.725$ J. A quên $\\tfrac{1}{2}$. B quên bình phương $\\omega$. C quên cả hai.',
    },
  },

  {
    layout: 'callout',
    accent: AMBER,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you read on',
    eyebrowVn: 'Quyết định trước khi đọc tiếp',
    title: 'Arms In: Faster, Slower or the Same?',
    titleVn: 'Thu Tay Vào: Nhanh Hơn, Chậm Hơn Hay Như Cũ?',
    content: 'A skater spins slowly with her arms stretched out wide. Then she pulls her arms in tight to her body.\n\nNobody touches her, and the ice has almost no friction.',
    contentVn: 'Một vận động viên trượt băng xoay chậm với hai tay dang rộng. Rồi cô thu chặt hai tay sát vào người.\n\nKhông ai chạm vào cô, và mặt băng gần như không có ma sát.',
    activity: {
      id: 'act_predict_skater',
      type: 'predict',
      prompt: 'What happens to how fast she spins?',
      promptVn: 'Tốc độ xoay của cô thay đổi thế nào?',
      options: [
        { val: 'faster', name: 'She spins faster', nameVn: 'Cô xoay nhanh hơn' },
        { val: 'slower', name: 'She spins slower', nameVn: 'Cô xoay chậm hơn' },
        { val: 'same', name: 'No change', nameVn: 'Không thay đổi' },
        { val: 'stops', name: 'She stops', nameVn: 'Cô dừng lại' },
      ],
      correct: 'faster',
      explain: 'She spins FASTER — much faster. Pulling her arms in brings mass closer to the axis, so her moment of inertia $I$ gets smaller. Nobody twists her, so the amount of spin she has — her angular momentum, $I\\omega$ — cannot change. If $I$ goes down, $\\omega$ must go up. The next slide shows the equation.',
      explainVn: 'Cô xoay NHANH HƠN — nhanh hơn nhiều. Thu tay vào đưa khối lượng lại gần trục, nên mômen quán tính $I$ của cô nhỏ đi. Không ai làm cô xoắn, nên lượng quay cô có — mômen động lượng, $I\\omega$ — không thể thay đổi. Nếu $I$ giảm, $\\omega$ phải tăng. Trang sau cho thấy phương trình.',
    },
  },

  {
    layout: 'split',
    accent: TEAL,
    icon: 'Orbit',
    ratio: 55,
    eyebrow: 'Next Acellus lesson · Angular Momentum',
    eyebrowVn: 'Bài Acellus tiếp theo · Mômen động lượng',
    title: 'Angular Momentum Is Conserved',
    titleVn: 'Mômen Động Lượng Được Bảo Toàn',
    inlineSvg: DIAGRAMS.SKATER,
    content: 'Momentum $p = mv$ swaps to **angular momentum**:\n$$L = I\\omega$$\nAnd just like momentum, it is **conserved**: if nothing outside twists the object, $L$ stays the same. So\n$$I_i\\,\\omega_i = I_f\\,\\omega_f$$\nA smaller $I$ means a bigger $\\omega$. That is the skater.',
    contentVn: 'Động lượng $p = mv$ đổi chữ thành **mômen động lượng**:\n$$L = I\\omega$$\nVà giống như động lượng, nó được **bảo toàn**: nếu không có gì bên ngoài làm vật xoắn, $L$ giữ nguyên. Vậy\n$$I_i\\,\\omega_i = I_f\\,\\omega_f$$\n$I$ nhỏ hơn nghĩa là $\\omega$ lớn hơn. Đó chính là vận động viên trượt băng.',
    notes: [
      {
        tone: 'write',
        text: '**Angular momentum:** $L = I\\omega$, in **kg·m²/s**\n**Conserved** (nothing outside twists it): $I_i\\,\\omega_i = I_f\\,\\omega_f$',
        textVn: '**Mômen động lượng:** $L = I\\omega$, đơn vị **kg·m²/s**\n**Bảo toàn** (không có gì bên ngoài làm xoắn): $I_i\\,\\omega_i = I_f\\,\\omega_f$',
      },
      {
        tone: 'info',
        text: 'Two things that end up turning together — a kid jumping onto a merry-go-round — is the momentum unit\'s "stick together", with $I$ for $m$ and $\\omega$ for $v$.',
        textVn: 'Hai vật cuối cùng quay cùng nhau — một bạn nhỏ nhảy lên vòng quay ngựa gỗ — chính là "dính vào nhau" của bài động lượng, với $I$ thay cho $m$ và $\\omega$ thay cho $v$.',
      },
    ],
  },

  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Sparkles',
    dense: true,
    eyebrow: 'Practice for your next Acellus lesson · Angular Momentum',
    eyebrowVn: 'Luyện trước cho bài Acellus tiếp theo · Mômen động lượng',
    title: 'The Skater Pulls Her Arms In',
    titleVn: 'Vận Động Viên Thu Tay Vào',
    content: '**A figure skater spins at 2.10 rad/s with her arms out, and her moment of inertia is 4.80 kg·m². She pulls her arms in, and her moment of inertia drops to 1.60 kg·m². What is her new angular velocity?**',
    contentVn: '**Một vận động viên trượt băng nghệ thuật xoay với 2.10 rad/s khi dang tay, và mômen quán tính của cô là 4.80 kg·m². Cô thu tay vào, và mômen quán tính giảm còn 1.60 kg·m². Vận tốc góc mới của cô là bao nhiêu?**',
    steps: [
      {
        text: '**Pieces.** $I_i = 4.80$ kg·m², $\\omega_i = 2.10$ rad/s, $I_f = 1.60$ kg·m², $\\omega_f = ?$',
        textVn: '**Các đại lượng.** $I_i = 4.80$ kg·m², $\\omega_i = 2.10$ rad/s, $I_f = 1.60$ kg·m², $\\omega_f = ?$',
      },
      {
        text: '**Formula.** Nobody twists her, so $L$ is conserved: $I_i\\,\\omega_i = I_f\\,\\omega_f$',
        textVn: '**Công thức.** Không ai làm cô xoắn, nên $L$ được bảo toàn: $I_i\\,\\omega_i = I_f\\,\\omega_f$',
      },
      {
        text: '**Rearrange.** $I_f$ multiplies $\\omega_f$, so divide both sides by $I_f$: $\\omega_f = \\dfrac{I_i\\,\\omega_i}{I_f}$',
        textVn: '**Biến đổi.** $I_f$ đang nhân với $\\omega_f$, nên chia cả hai vế cho $I_f$: $\\omega_f = \\dfrac{I_i\\,\\omega_i}{I_f}$',
      },
      {
        text: '**Substitute.** $\\omega_f = \\dfrac{4.80 \\times 2.10}{1.60} = \\dfrac{10.08}{1.60}$',
        textVn: '**Thay số.** $\\omega_f = \\dfrac{4.80 \\times 2.10}{1.60} = \\dfrac{10.08}{1.60}$',
      },
      {
        text: '**Answer, with a unit.** $\\omega_f = 6.30$ rad/s — three times faster, because $I$ became three times smaller.',
        textVn: '**Đáp án, kèm đơn vị.** $\\omega_f = 6.30$ rad/s — nhanh gấp ba, vì $I$ nhỏ đi ba lần.',
      },
    ],
    check: {
      id: 'chk_merry_go_round',
      q: 'A merry-go-round ($I = 250$ kg·m²) spins at 1.20 rad/s. A 30.0 kg kid runs straight in from the side, jumps on at the edge, 1.50 m from the centre, and goes round with it. The kid adds $I = m r^2$. What is the new angular velocity?',
      qVn: 'Một vòng quay ngựa gỗ ($I = 250$ kg·m²) quay với 1.20 rad/s. Một bạn nhỏ 30.0 kg chạy thẳng từ bên ngoài vào, nhảy lên ở mép, cách tâm 1.50 m, và quay cùng nó. Bạn nhỏ thêm vào $I = m r^2$. Vận tốc góc mới là bao nhiêu?',
      options: [
        { val: 'A', text: '$1.20$ rad/s', textVn: '$1.20$ rad/s' },
        { val: 'B', text: '$0.945$ rad/s', textVn: '$0.945$ rad/s' },
        { val: 'C', text: '$1.02$ rad/s', textVn: '$1.02$ rad/s' },
        { val: 'D', text: '$1.52$ rad/s', textVn: '$1.52$ rad/s' },
      ],
      correct: 'B',
      expEn: 'A stick-together collision with $I$ for $m$: $I_1\\,\\omega_i = (I_1 + m r^2)\\,\\omega_f$. The kid adds $30.0 \\times 1.50^2 = 67.5$ kg·m², so $\\omega_f = \\dfrac{250 \\times 1.20}{250 + 67.5} = 0.945$ rad/s — slower, because $I$ grew. A ignores the kid. C forgot to square $r$. D has the fraction upside down.',
      expVn: 'Một va chạm dính vào nhau với $I$ thay cho $m$: $I_1\\,\\omega_i = (I_1 + m r^2)\\,\\omega_f$. Bạn nhỏ thêm vào $30.0 \\times 1.50^2 = 67.5$ kg·m², nên $\\omega_f = \\dfrac{250 \\times 1.20}{250 + 67.5} = 0.945$ rad/s — chậm hơn, vì $I$ tăng lên. A bỏ qua bạn nhỏ. C quên bình phương $r$. D đặt phân số lộn ngược.',
    },
  },

  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'GitCompare',
    eyebrow: 'The big idea, complete',
    eyebrowVn: 'Ý tưởng lớn, đầy đủ',
    title: 'Every Rotation Formula Is One You Already Know',
    titleVn: 'Mọi Công Thức Quay Đều Là Công Thức Em Đã Biết',
    inlineSvg: DIAGRAMS.SWAP_FULL,
    caption: 'Six letters swap — $x \\to \\theta$, $v \\to \\omega$, $a \\to \\alpha$, $m \\to I$, $F \\to \\tau$, $p \\to L$ — and the formulas come with them: $F = ma$ becomes $\\tau = I\\alpha$, $\\tfrac{1}{2}mv^2$ becomes $\\tfrac{1}{2}I\\omega^2$, and conserved momentum becomes conserved angular momentum. Only three things are truly new: × $2\\pi$ for turns, × $r$ to reach the edge, and torques that balance about a pivot.',
    captionVn: 'Sáu chữ được đổi — $x \\to \\theta$, $v \\to \\omega$, $a \\to \\alpha$, $m \\to I$, $F \\to \\tau$, $p \\to L$ — và các công thức đi theo: $F = ma$ thành $\\tau = I\\alpha$, $\\tfrac{1}{2}mv^2$ thành $\\tfrac{1}{2}I\\omega^2$, và động lượng bảo toàn thành mômen động lượng bảo toàn. Chỉ có ba điều thật sự mới: × $2\\pi$ cho số vòng, × $r$ để ra tới mép, và các mômen lực cân bằng quanh một điểm tựa.',
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
    content: 'Twelve lines — but lines 2–5, 10, 11 and 12 are formulas you already knew, with the letters swapped. Next to each line, write **when** to use it.',
    contentVn: 'Mười hai dòng — nhưng dòng 2–5, 10, 11 và 12 là công thức em đã biết, chỉ đổi chữ. Bên cạnh mỗi dòng, ghi **khi nào** dùng nó.',
    notes: [
      { tone: 'write', text: '**1.** 1 turn = $2\\pi$ rad · CCW $= +$, CW $= -$ — before ANY number goes in.', textVn: '**1.** 1 vòng = $2\\pi$ rad · CCW $= +$, CW $= -$ — trước khi thay BẤT KỲ số nào.' },
      { tone: 'write', text: '**2.** $\\omega_f = \\omega_i + \\alpha t$ — no angle in the question.', textVn: '**2.** $\\omega_f = \\omega_i + \\alpha t$ — đề không có góc.' },
      { tone: 'write', text: '**3.** $\\theta = \\omega_i t + \\tfrac{1}{2}\\alpha t^2$ — no speed at the end.', textVn: '**3.** $\\theta = \\omega_i t + \\tfrac{1}{2}\\alpha t^2$ — đề không có tốc độ lúc cuối.' },
      { tone: 'write', text: '**4.** $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$ — no time.', textVn: '**4.** $\\omega_f^2 = \\omega_i^2 + 2\\alpha\\theta$ — đề không có thời gian.' },
      { tone: 'write', text: '**5.** $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$ — no $\\alpha$.', textVn: '**5.** $\\theta = \\tfrac{1}{2}(\\omega_i + \\omega_f)\\,t$ — đề không có $\\alpha$.' },
      { tone: 'write', text: '**6.** $s = r\\theta$, $v = r\\omega$, $a = r\\alpha$ — from the turning out to the edge.', textVn: '**6.** $s = r\\theta$, $v = r\\omega$, $a = r\\alpha$ — từ chuyển động quay ra tới mép.' },
      { tone: 'write', text: '**7.** $\\tau = r F \\sin\\theta$ — a push at an angle (calculator in DEG).', textVn: '**7.** $\\tau = r F \\sin\\theta$ — lực đẩy theo một góc (máy tính ở DEG).' },
      { tone: 'write', text: '**8.** Balanced: anticlockwise torques = clockwise torques; up = down. Pivot at the support NOT asked about; a board\'s weight at its middle.', textVn: '**8.** Cân bằng: mômen ngược chiều = mômen cùng chiều kim đồng hồ; lên = xuống. Điểm tựa ở giá đỡ mà đề KHÔNG hỏi; trọng lượng tấm ván ở chính giữa.' },
      { tone: 'write', text: '**9.** $I = m r^2$ for a small mass; $\\tfrac{1}{3}ML^2$ for a rod about its end — add the pieces.', textVn: '**9.** $I = m r^2$ cho khối lượng nhỏ; $\\tfrac{1}{3}ML^2$ cho thanh quay quanh một đầu — cộng các phần lại.' },
      { tone: 'write', text: '**10.** $\\tau = I\\alpha$ — a torque spins something up.', textVn: '**10.** $\\tau = I\\alpha$ — một mômen lực làm vật quay nhanh dần.' },
      { tone: 'write', text: '**11.** $KE = \\tfrac{1}{2} I \\omega^2$ — the energy of spinning.', textVn: '**11.** $KE = \\tfrac{1}{2} I \\omega^2$ — năng lượng của chuyển động quay.' },
      { tone: 'write', text: '**12.** $L = I\\omega$, and $I_i\\,\\omega_i = I_f\\,\\omega_f$ when nothing twists it.', textVn: '**12.** $L = I\\omega$, và $I_i\\,\\omega_i = I_f\\,\\omega_f$ khi không có gì làm nó xoắn.' },
      { tone: 'info', text: '**Units:** $\\theta$ in rad · $\\omega$ in rad/s · $\\alpha$ in rad/s² · $\\tau$ in N·m · $I$ in kg·m² · $L$ in kg·m²/s · cm ÷ 100 → m · diameter ÷ 2 → radius', textVn: '**Đơn vị:** $\\theta$ bằng rad · $\\omega$ bằng rad/s · $\\alpha$ bằng rad/s² · $\\tau$ bằng N·m · $I$ bằng kg·m² · $L$ bằng kg·m²/s · cm ÷ 100 → m · đường kính ÷ 2 → bán kính' },
      { tone: 'info', text: '**Algebra:** a negative number goes in brackets · × 2 undoes a $\\tfrac{1}{2}$ · a squared unknown needs a square root last · a letter on both sides cancels', textVn: '**Đại số:** số âm đặt trong ngoặc · × 2 khử $\\tfrac{1}{2}$ · ẩn bị bình phương thì lấy căn sau cùng · một chữ ở cả hai vế thì triệt tiêu' },
    ],
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The five mistakes that lose marks in this lesson',
    eyebrowVn: 'Năm lỗi làm mất điểm trong bài này',
    title: 'Watch Out',
    titleVn: 'Cẩn Thận',
    content: 'Before you type an answer into the green box, check all five.',
    contentVn: 'Trước khi gõ đáp án vào ô xanh, hãy kiểm tra đủ năm điều.',
    notes: [
      { tone: 'homework', text: '**1. Turns left as turns.** Revolutions and rotations must be × $2\\pi$ before they go in. Forget, and the answer is about 6 times wrong.', textVn: '**1. Để nguyên số vòng.** Số vòng phải × $2\\pi$ trước khi thay vào. Quên là đáp án sai khoảng 6 lần.' },
      { tone: 'homework', text: '**2. Diameter or centimetres.** Every formula uses the RADIUS in METRES: halve a diameter, ÷ 100 for cm. If $r$ is squared, a cm mistake is 10,000 times wrong.', textVn: '**2. Đường kính hay xentimét.** Mọi công thức dùng BÁN KÍNH tính bằng MÉT: chia đôi đường kính, ÷ 100 với cm. Nếu $r$ bị bình phương, lỗi cm sai tới 10,000 lần.' },
      { tone: 'homework', text: '**3. Calculator in RAD.** For $\\sin 58.2^\\circ$ the calculator must be in DEG. Test: $\\sin 30^\\circ = 0.5$.', textVn: '**3. Máy tính ở RAD.** Với $\\sin 58.2^\\circ$ máy tính phải ở DEG. Thử: $\\sin 30^\\circ = 0.5$.' },
      { tone: 'homework', text: '**4. A lost sign.** Slowing down means $\\alpha$ has the opposite sign to $\\omega$. CW is negative. "Remember: CCW is +, CW is −" means: type the minus.', textVn: '**4. Mất dấu.** Chậm dần nghĩa là $\\alpha$ ngược dấu với $\\omega$. CW là âm. "Nhớ: CCW là +, CW là −" nghĩa là: gõ dấu trừ.' },
      { tone: 'homework', text: '**5. Balancing slips.** Pivot at the support NOT asked about. A board\'s weight acts at its MIDDLE. A weight already in newtons is NOT × 9.8.', textVn: '**5. Lỗi khi cân bằng.** Điểm tựa ở giá đỡ mà đề KHÔNG hỏi. Trọng lượng tấm ván đặt ở CHÍNH GIỮA. Trọng lượng đã tính bằng niutơn thì KHÔNG × 9.8.' },
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
    content: 'Your notebook should have **12 lines** — and most of them are formulas you already knew, with new letters. Check.',
    contentVn: 'Vở của em cần có **12 dòng** — và phần lớn là công thức em đã biết, chỉ đổi chữ. Kiểm tra lại.',
    items: [
      { text: 'Change revolutions and rotations into radians (× 2π), and give a turn its sign: CCW +, CW −', textVn: 'Đổi số vòng sang radian (× 2π), và cho chuyển động quay một dấu: CCW +, CW −' },
      { text: 'Choose the spinning equation by the letter the question never mentions', textVn: 'Chọn phương trình quay theo chữ mà đề không hề nhắc tới' },
      { text: 'Undo a ½ with × 2, and finish a squared unknown with a square root', textVn: 'Khử ½ bằng × 2, và kết thúc ẩn bị bình phương bằng căn bậc hai' },
      { text: 'Go from the centre to the edge with × r — using the radius, in metres', textVn: 'Đi từ tâm ra mép bằng × r — dùng bán kính, tính bằng mét' },
      { text: 'Find a torque with τ = rF sin θ, calculator in DEG', textVn: 'Tìm mômen lực bằng τ = rF sin θ, máy tính ở DEG' },
      { text: 'Balance a board by putting the pivot at the support you are not asked about', textVn: 'Cân bằng tấm ván bằng cách đặt điểm tựa ở giá đỡ mà đề không hỏi' },
      { text: 'Add up a moment of inertia piece by piece', textVn: 'Cộng mômen quán tính từng phần một' },
      { text: 'Use τ = Iα, ½Iω² and L = Iω as the swapped twins of F = ma, ½mv² and p = mv', textVn: 'Dùng τ = Iα, ½Iω² và L = Iω như những sinh đôi đã đổi chữ của F = ma, ½mv² và p = mv' },
    ],
  },
];
