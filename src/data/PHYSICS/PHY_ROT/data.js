// src/data/PHYSICS/PHY_ROT/data.js
// Acellus Physics — Rotation & Angular Momentum.
//
// Built from the student's own Acellus screenshots (physics.docx, 2026-10-01):
// the rotation module's items on rotational kinematics, rotational and linear
// motion, torque, equilibrium and moment of inertia. The module's last three
// lessons — rotational dynamics, rotational kinetic energy and angular
// momentum — she has not reached yet, so their items are written in the
// Acellus style. She still loses most of her marks to the algebra, and
// rotation adds a third way to lose them: a turn is not a radian.
//
// So the unit is shaped around ONE idea and the moves the answer box hides:
//
//   NOTES      rotation is the linear motion she already knows with the
//              letters swapped — x → θ, v → ω, a → α, m → I, F → τ, p → L —
//              so every rotation formula is one she has met before. Turns
//              become radians (× 2π), the edge links to the centre (× r),
//              balancing is clockwise = anticlockwise about a pivot chosen to
//              make the unknown you don't want vanish, and angular momentum
//              is the momentum unit's ONE equation again.
//   REARRANGE  Isolate It: the same moves, with "× 2 undoes ÷ 2", turns in
//              revolutions stopped at the Units stage, and the merry-go-round
//              set up and factored exactly like a stick-together collision.
//   WORKBOOK   her items as typed calculations, each with the five-line method
//              revealed behind the button.
//
// Shape copied from PHY_MOM; docs/acellus-physics-course.md is the guide.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { rearrange } from './rearrange.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

// VALID TASK IDS: WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION,
// SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES, BALANCE, INTERVAL, REARRANGE

export const PHYSICS_PHY_ROT_DATA = {
  meta: {
    id: 'PHY_ROT',
    title: 'Acellus: Rotation & Angular Momentum',
    desc: 'Spinning, turning and balancing — rotational kinematics, torque, equilibrium, moment of inertia and angular momentum, all as the motion you already know with the letters swapped.',
    track: 'PHYSICS',
    icon: 'RotateCcw',
    themeColor: 'bg-teal-500 border-teal-700',
  },

  phases: [
    {
      id: 'concept',
      title: 'Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 15 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Drill',
      threshold: 15,
      tasks: [
        { id: 'REARRANGE', dbKey: 'p32', maxXP: 35 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
      ],
    },
    {
      id: 'mastery',
      title: 'Prove',
      threshold: 50,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
      ],
    },
    {
      // Reward only, worth 0 XP, and gated on the quiz having been SAT rather
      // than passed — see resolveUnitTasks. The games live in the standalone
      // Arcade track; declaring it here tells the arcade which map and tier
      // this unit plays on.
      id: 'arcade',
      title: 'Arcade',
      threshold: 80,
      requires: 'ASSESSMENT',
      tasks: [
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  realWords: [
    { word: 'Radian', vn: 'Radian', def: 'The unit physics uses for angles. One full turn is 2π radians, about 6.28.', vnDef: 'Đơn vị vật lý dùng cho góc. Một vòng đầy đủ là 2π radian, khoảng 6.28.', sent: 'Two full revolutions is four pi radians.', vnSent: 'Hai vòng quay đầy đủ là bốn pi radian.', isReal: true },
    { word: 'Angular velocity', vn: 'Vận tốc góc', def: 'How fast something turns, as an angle per second, in rad/s. Written ω (omega).', vnDef: 'Vật quay nhanh đến mức nào, tính bằng góc trên giây, đơn vị rad/s. Viết là ω (omega).', sent: 'The wheel has an angular velocity of four point five radians per second.', vnSent: 'Bánh xe có vận tốc góc bốn phẩy năm radian trên giây.', isReal: true },
    { word: 'Angular acceleration', vn: 'Gia tốc góc', def: 'How fast the angular velocity changes, in rad/s². Written α (alpha).', vnDef: 'Vận tốc góc thay đổi nhanh đến mức nào, đơn vị rad/s². Viết là α (alpha).', sent: 'The ride slows down, so its angular acceleration is negative.', vnSent: 'Trò chơi chậm dần, nên gia tốc góc của nó là số âm.', isReal: true },
    { word: 'Counterclockwise', vn: 'Ngược chiều kim đồng hồ', def: 'Turning the opposite way to a clock\'s hands. Acellus counts it as positive.', vnDef: 'Quay theo chiều ngược với kim đồng hồ. Acellus tính chiều này là dương.', sent: 'Counterclockwise is plus and clockwise is minus.', vnSent: 'Ngược chiều kim đồng hồ là cộng và cùng chiều kim đồng hồ là trừ.', isReal: true },
    { word: 'Torque', vn: 'Mômen lực', def: 'The turning effect of a force: the force times its distance from the pivot, in N·m.', vnDef: 'Tác dụng làm quay của một lực: lực nhân với khoảng cách tới điểm tựa, đơn vị N·m.', sent: 'Pushing far from the hinge gives a bigger torque.', vnSent: 'Đẩy ở xa bản lề tạo ra mômen lực lớn hơn.', isReal: true },
    { word: 'Pivot', vn: 'Điểm tựa', def: 'The point something turns about, such as a hinge or the middle of a see-saw. Also called the fulcrum or the axis.', vnDef: 'Điểm mà vật quay quanh nó, như bản lề hay chính giữa cái bập bênh. Còn gọi là điểm tựa hay trục quay.', sent: 'Put the pivot at the support you are not asked about.', vnSent: 'Đặt điểm tựa ở giá đỡ mà đề không hỏi tới.', isReal: true },
    { word: 'Equilibrium', vn: 'Cân bằng', def: 'Balanced: the clockwise torques equal the anticlockwise torques, and the forces up equal the forces down.', vnDef: 'Cân bằng: các mômen lực theo chiều kim đồng hồ bằng các mômen lực ngược chiều, và lực hướng lên bằng lực hướng xuống.', sent: 'The see-saw is in equilibrium, so it does not tip.', vnSent: 'Cái bập bênh ở trạng thái cân bằng, nên nó không bị nghiêng.', isReal: true },
    { word: 'Moment of inertia', vn: 'Mômen quán tính', def: 'How hard something is to start or stop spinning. It depends on the mass AND how far it is from the axis. Written I, in kg·m².', vnDef: 'Mức độ khó làm một vật bắt đầu quay hoặc dừng quay. Nó phụ thuộc vào khối lượng VÀ khoảng cách tới trục. Viết là I, đơn vị kg·m².', sent: 'Moving the mass further out makes the moment of inertia much bigger.', vnSent: 'Đưa khối lượng ra xa hơn làm mômen quán tính lớn hơn nhiều.', isReal: true },
    { word: 'Angular momentum', vn: 'Mômen động lượng', def: 'Moment of inertia times angular velocity, L = Iω. It stays the same when nothing outside twists the object.', vnDef: 'Mômen quán tính nhân vận tốc góc, L = Iω. Nó giữ nguyên khi không có gì bên ngoài làm vật xoắn.', sent: 'The skater spins faster because her angular momentum is conserved.', vnSent: 'Vận động viên trượt băng quay nhanh hơn vì mômen động lượng của cô được bảo toàn.', isReal: true },
    { word: 'Revolution', vn: 'Vòng quay', def: 'One full turn. Change revolutions to radians by multiplying by 2π.', vnDef: 'Một vòng đầy đủ. Đổi số vòng sang radian bằng cách nhân với 2π.', sent: 'After five revolutions the ride was turning more slowly.', vnSent: 'Sau năm vòng quay, trò chơi quay chậm hơn.', isReal: true },
  ],

  // Spelled out rather than shorthand on purpose: generate_all_audio.py locates
  // `realWords` by looking for the next `name:` property after it, and a
  // shorthand property has no colon — with `notes,` here the unit silently
  // generates no vocabulary audio at all.
  notes: notes,
  workbook: workbook,
  rearrange: rearrange,
  assessment: assessment,
  games: games,
};
