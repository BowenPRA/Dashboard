// src/data/PHYSICS/PHY_CIRC/data.js
// Acellus Physics — Circular Motion & Gravity.
//
// Built from the student's own Acellus screenshots: ten items on centripetal
// force, vertical circles, surface gravity, orbital speed and orbital period.
// She was not short of formulae — she had too many, no idea which one a
// question wanted, and every rearrangement was a fresh guess. So the unit is
// shaped around the three moves the answer box hides:
//
//   REARRANGE   Isolate It: make the unknown the subject one both-sides move
//               at a time, with the reason for each move written beside it;
//               then put every number into SI; then substitute. The deck's
//               method, made into a task.
//   WORKBOOK    the same ten items as typed calculations, each with the
//               five-line method revealed behind the button.
//
// NOTES carries the whole formula page — eight lines, every one in an orange
// Write This Down panel — and seventeen checks plus two activities, so the
// teaching load is spread and the XP is earned.
//
// THIS IS THE EXEMPLAR for later Acellus Physics modules: copy its shape.
// docs/acellus-physics-course.md is the guide.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { rearrange } from './rearrange.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

// VALID TASK IDS: WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION,
// SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES, BALANCE, INTERVAL, REARRANGE

export const PHYSICS_PHY_CIRC_DATA = {
  meta: {
    id: 'PHY_CIRC',
    title: 'Acellus: Circular Motion & Gravity',
    desc: 'Centripetal force, vertical circles, gravity and orbits — and the method behind every one: rearrange for the unknown, put the numbers into SI, then substitute.',
    track: 'PHYSICS',
    icon: 'Orbit',
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
    { word: 'Centripetal', vn: 'Hướng tâm', def: 'Pointing toward the centre of a circle; the force that keeps something moving in a circle.', vnDef: 'Hướng về tâm đường tròn; lực giữ cho một vật chuyển động tròn.', sent: 'The centripetal force on the ball is the tension in the string.', vnSent: 'Lực hướng tâm tác dụng lên quả bóng chính là lực căng của sợi dây.', isReal: true },
    { word: 'Tangent', vn: 'Tiếp tuyến', def: 'The direction along the edge of a circle at one point; the way the object would fly off.', vnDef: 'Hướng dọc theo rìa đường tròn tại một điểm; hướng mà vật sẽ bay ra.', sent: 'The velocity always points along the tangent, never toward the centre.', vnSent: 'Vận tốc luôn hướng theo tiếp tuyến, không bao giờ hướng về tâm.', isReal: true },
    { word: 'Radius', vn: 'Bán kính', def: 'The distance from the centre of a circle to its edge.', vnDef: 'Khoảng cách từ tâm đường tròn tới rìa của nó.', sent: 'In the gravity formula the radius is measured from the centre of the planet.', vnSent: 'Trong công thức trọng lực, bán kính được đo từ tâm hành tinh.', isReal: true },
    { word: 'Tension', vn: 'Lực căng', def: 'The pulling force in a stretched rope or string.', vnDef: 'Lực kéo trong một sợi dây bị căng.', sent: 'The rope breaks when the tension reaches nine hundred newtons.', vnSent: 'Sợi dây đứt khi lực căng đạt chín trăm niutơn.', isReal: true },
    { word: 'Normal force', vn: 'Phản lực', def: 'The push from a surface on whatever is touching it, at right angles to the surface.', vnDef: 'Lực đẩy của một bề mặt lên vật đang chạm vào nó, vuông góc với bề mặt.', sent: 'At the minimum speed the normal force from the track is zero.', vnSent: 'Ở tốc độ nhỏ nhất, phản lực từ đường ray bằng không.', isReal: true },
    { word: 'Orbit', vn: 'Quỹ đạo', def: 'The curved path of a satellite or planet around a larger body, held by gravity.', vnDef: 'Đường cong của một vệ tinh hoặc hành tinh quanh một vật lớn hơn, được giữ bởi trọng lực.', sent: 'A satellite in orbit is falling toward the planet the whole time.', vnSent: 'Một vệ tinh trên quỹ đạo đang rơi về phía hành tinh suốt thời gian.', isReal: true },
    { word: 'Period', vn: 'Chu kỳ', def: 'The time taken to go round once.', vnDef: 'Thời gian để đi hết một vòng.', sent: 'The period of the orbit came out as nineteen hours.', vnSent: 'Chu kỳ của quỹ đạo tính ra là mười chín giờ.', isReal: true },
    { word: 'Field strength', vn: 'Cường độ trường', def: 'How strong gravity is at a place, measured as the acceleration it causes, in metres per second squared.', vnDef: 'Độ mạnh của trọng lực tại một nơi, đo bằng gia tốc mà nó gây ra, đơn vị mét trên giây bình phương.', sent: 'The field strength on the asteroid is only a tiny fraction of Earth\'s.', vnSent: 'Cường độ trường trên tiểu hành tinh chỉ bằng một phần rất nhỏ so với Trái Đất.', isReal: true },
    { word: 'Subject', vn: 'Chủ thể', def: 'The letter that stands alone on one side of a formula.', vnDef: 'Chữ cái đứng một mình ở một vế của công thức.', sent: 'Make v the subject before you put any numbers in.', vnSent: 'Hãy đưa v thành chủ thể trước khi thay bất kỳ con số nào vào.', isReal: true },
    { word: 'Substitute', vn: 'Thay số', def: 'To replace the letters in a formula with their numbers.', vnDef: 'Thay các chữ cái trong công thức bằng giá trị số của chúng.', sent: 'Only substitute once every number is in SI units.', vnSent: 'Chỉ thay số khi mọi con số đã ở đơn vị SI.', isReal: true },
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
