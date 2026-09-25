// src/data/PHYSICS/PHY_MOM/data.js
// Acellus Physics — Momentum & Collisions.
//
// Built from the student's own Acellus screenshots: the Momentum module's
// items on momentum, impulse, conservation of momentum, collisions, inelastic
// collisions and recoil (elastic collisions and 2-D momentum come next, in
// their own unit). She is still losing most of her marks to the algebra, and
// momentum adds two new ways to lose them — a velocity's SIGN is its
// direction, and the collision formulas look like four equations to learn.
// So the unit is shaped around ONE equation and the moves the answer box hides:
//
//   NOTES      one collision equation (m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f) and
//              every special case DERIVED from it: at rest (a term
//              vanishes), stuck together (v_f factored out), recoil (the
//              left side is 0 and a minus sign appears by itself).
//   REARRANGE  Isolate It with a Set up stage: every collision item starts
//              from that one equation and she applies the story to it —
//              taps the velocity "at rest" makes 0, the two that "stick
//              together" makes one — before isolating the unknown, with
//              Factor as a move and answers that carry their sign.
//   WORKBOOK   the same items as typed calculations, each with the five-line
//              method revealed behind the button.
//
// Shape copied from PHY_CIRC, the exemplar; docs/acellus-physics-course.md
// is the guide.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { rearrange } from './rearrange.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

// VALID TASK IDS: WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION,
// SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES, BALANCE, INTERVAL, REARRANGE

export const PHYSICS_PHY_MOM_DATA = {
  meta: {
    id: 'PHY_MOM',
    title: 'Acellus: Momentum & Collisions',
    desc: 'Momentum, impulse, collisions, inelastic collisions and recoil — every collision from ONE equation, with the story put in and the unknown isolated before any number goes in.',
    track: 'PHYSICS',
    icon: 'Combine',
    themeColor: 'bg-indigo-500 border-indigo-700',
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
    { word: 'Momentum', vn: 'Động lượng', def: 'Mass times velocity; how hard a moving object is to stop.', vnDef: 'Khối lượng nhân vận tốc; mức độ khó dừng của một vật đang chuyển động.', sent: 'A slow truck can have more momentum than a fast baseball.', vnSent: 'Một chiếc xe tải chậm có thể có động lượng lớn hơn một quả bóng chày nhanh.', isReal: true },
    { word: 'Velocity', vn: 'Vận tốc', def: 'Speed in a stated direction; on a line, a number with a plus or minus sign.', vnDef: 'Tốc độ theo một hướng xác định; trên một đường thẳng, là một con số có dấu cộng hoặc trừ.', sent: 'The ball moving left has a velocity of minus nine point eight metres per second.', vnSent: 'Quả bóng đi sang trái có vận tốc âm chín phẩy tám mét trên giây.', isReal: true },
    { word: 'Impulse', vn: 'Xung lượng', def: 'A force multiplied by the time it acts for; it equals the change in momentum.', vnDef: 'Lực nhân với thời gian nó tác dụng; nó bằng độ thay đổi động lượng.', sent: 'The bat gives the ball a large impulse in less than a tenth of a second.', vnSent: 'Cây gậy truyền cho quả bóng một xung lượng lớn trong chưa đầy một phần mười giây.', isReal: true },
    { word: 'Collision', vn: 'Va chạm', def: 'An event where two objects hit each other and push on each other for a short time.', vnDef: 'Sự kiện hai vật đâm vào nhau và đẩy nhau trong một thời gian ngắn.', sent: 'In every collision, the total momentum before equals the total momentum after.', vnSent: 'Trong mọi va chạm, tổng động lượng trước bằng tổng động lượng sau.', isReal: true },
    { word: 'Conserved', vn: 'Được bảo toàn', def: 'Kept the same in total; not created or lost, only passed around.', vnDef: 'Giữ nguyên về tổng; không được tạo ra hay mất đi, chỉ được truyền qua lại.', sent: 'Momentum is conserved when the two carts crash.', vnSent: 'Động lượng được bảo toàn khi hai xe đẩy va vào nhau.', isReal: true },
    { word: 'Inelastic', vn: 'Va chạm mềm', def: 'Describing a collision in which the objects stick together and move off as one.', vnDef: 'Mô tả một va chạm trong đó các vật dính vào nhau và chuyển động như một.', sent: 'The two meteors had an inelastic collision and moved on together.', vnSent: 'Hai thiên thạch có một va chạm mềm và tiếp tục chuyển động cùng nhau.', isReal: true },
    { word: 'Recoil', vn: 'Giật lùi', def: 'The backward movement of an object when it pushes something else forward.', vnDef: 'Chuyển động lùi lại của một vật khi nó đẩy một vật khác về phía trước.', sent: 'The rifle recoils backwards when the bullet flies forwards.', vnSent: 'Khẩu súng giật lùi về phía sau khi viên đạn bay về phía trước.', isReal: true },
    { word: 'Initial', vn: 'Ban đầu', def: 'At the start; before the collision. Written with the letter i.', vnDef: 'Lúc bắt đầu; trước va chạm. Được viết bằng chữ i.', sent: 'The initial velocity of the truck was zero because it was at rest.', vnSent: 'Vận tốc ban đầu của xe tải bằng không vì nó đang đứng yên.', isReal: true },
    { word: 'Final', vn: 'Cuối', def: 'At the end; after the collision. Written with the letter f.', vnDef: 'Lúc kết thúc; sau va chạm. Được viết bằng chữ f.', sent: 'Their final velocity is the same because they stuck together.', vnSent: 'Vận tốc cuối của chúng giống nhau vì chúng đã dính vào nhau.', isReal: true },
    { word: 'Factor', vn: 'Đặt nhân tử chung', def: 'To take a letter shared by several terms outside a bracket.', vnDef: 'Đưa một chữ chung của nhiều số hạng ra ngoài một dấu ngoặc.', sent: 'Factor v f out of both terms, then divide by the bracket.', vnSent: 'Đặt v f làm nhân tử chung của cả hai số hạng, rồi chia cho ngoặc.', isReal: true },
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
