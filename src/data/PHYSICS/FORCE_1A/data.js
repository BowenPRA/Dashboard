// src/data/PHYSICS/FORCE_1A/data.js
// FORCE_1A — Adding Force Vectors. The first unit of the PHYSICS track, and the
// one everything mechanical afterwards leans on: until a student can turn "60 N
// at 30 degrees" into two numbers and back, resolving weight on a slope, adding
// tensions in a rope, or finding a net force are all out of reach.
//
// Shape: Learn = the deck + the words, Drill = the workbook, Prove = the
// Vectors task + the assessment. Source Analysis and Essay are deliberately
// left out — this unit is judged on whether the arithmetic comes out right, and
// an AI-graded paragraph about vectors would measure English instead.
//
// The Vectors task is the centre of the unit (30 XP, the largest single share),
// because it is the only place the student has to produce the components
// themselves with the picture answering back.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';
import { vectorAdd } from './vectorAdd.js';

export const FORCE_1A_DATA = {
  meta: {
    id: 'FORCE_1A',
    title: 'Adding Force Vectors',
    desc: 'Why two forces of 4 N and 3 N can add up to 5 N. Resolve each force into an x-part and a y-part, add the parts in columns, and rebuild the single resultant — using triangles and the tip-to-tail construction.',
    track: 'PHYSICS',
    icon: 'Magnet',
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
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 25 },
      ],
    },
    {
      id: 'mastery',
      title: 'Prove',
      threshold: 40,
      tasks: [
        { id: 'VECTOR_ADD', dbKey: 'p16', maxXP: 30 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
      ],
    },
  ],

  realWords: [
    { word: 'Vector', vn: 'Vectơ', def: 'A quantity that has a size and a direction, such as force.', vnDef: 'Đại lượng có độ lớn và hướng, chẳng hạn như lực.', sent: 'Force is a vector, so you must say which way it points.', vnSent: 'Lực là một vectơ, nên em phải nói nó chỉ về hướng nào.', isReal: true },
    { word: 'Scalar', vn: 'Đại lượng vô hướng', def: 'A quantity that has a size only, with no direction.', vnDef: 'Đại lượng chỉ có độ lớn, không có hướng.', sent: 'Mass is a scalar because eight kilograms points nowhere.', vnSent: 'Khối lượng là đại lượng vô hướng vì tám kilôgam không chỉ về đâu cả.', isReal: true },
    { word: 'Magnitude', vn: 'Độ lớn', def: 'The size of a vector, without its direction.', vnDef: 'Độ lớn của một vectơ, không kể hướng của nó.', sent: 'The magnitude of the resultant is seventy seven newtons.', vnSent: 'Độ lớn của lực tổng hợp là bảy mươi bảy niutơn.', isReal: true },
    { word: 'Resultant', vn: 'Lực tổng hợp', def: 'The single force that does the same job as all the forces together.', vnDef: 'Lực duy nhất làm được đúng việc mà tất cả các lực cùng làm.', sent: 'Two ropes pulling at an angle have a resultant between them.', vnSent: 'Hai sợi dây kéo xiên nhau có một lực tổng hợp nằm giữa chúng.', isReal: true },
    { word: 'Component', vn: 'Thành phần', def: 'The part of a force that acts along one axis.', vnDef: 'Phần của một lực tác dụng dọc theo một trục.', sent: 'The horizontal component of that pull is fifty two newtons.', vnSent: 'Thành phần nằm ngang của lực kéo đó là năm mươi hai niutơn.', isReal: true },
    { word: 'Resolve', vn: 'Phân tích lực', def: 'To split one force into its x-part and its y-part.', vnDef: 'Tách một lực thành phần x và phần y của nó.', sent: 'Resolve every force before you add anything.', vnSent: 'Hãy phân tích mọi lực trước khi cộng bất cứ thứ gì.', isReal: true },
    { word: 'Tip to tail', vn: 'Nối đuôi', def: 'A way of adding vectors by starting each arrow where the last one ended.', vnDef: 'Cách cộng vectơ bằng việc bắt đầu mỗi mũi tên ở nơi mũi tên trước kết thúc.', sent: 'Draw the two forces tip to tail and the resultant closes the triangle.', vnSent: 'Vẽ hai lực nối đuôi nhau và lực tổng hợp khép kín tam giác.', isReal: true },
    { word: 'Equilibrium', vn: 'Cân bằng', def: 'The state where all the forces cancel and the resultant is zero.', vnDef: 'Trạng thái mà mọi lực triệt tiêu nhau và lực tổng hợp bằng không.', sent: 'The box stays still because the forces are in equilibrium.', vnSent: 'Cái hộp đứng yên vì các lực đang ở trạng thái cân bằng.', isReal: true },
    { word: 'Newton', vn: 'Niutơn', def: 'The unit forces are measured in, written N.', vnDef: 'Đơn vị đo lực, viết tắt là N.', sent: 'A small apple weighs about one newton.', vnSent: 'Một quả táo nhỏ nặng khoảng một niutơn.', isReal: true },
    { word: 'Quadrant', vn: 'Góc phần tư', def: 'One of the four regions the two axes cut the plane into.', vnDef: 'Một trong bốn vùng mà hai trục chia mặt phẳng ra.', sent: 'Check the quadrant before you trust the angle on your calculator.', vnSent: 'Hãy kiểm tra góc phần tư trước khi tin vào góc trên máy tính.', isReal: true },
  ],

  // Spelled out rather than shorthand on purpose: generate_all_audio.py locates
  // `realWords` by looking for the next `name:` property after it, and a
  // shorthand property has no colon — with `workbook,` here the unit silently
  // generates no vocabulary audio at all.
  workbook: workbook,
  vectorAdd: vectorAdd,
  assessment: assessment,
  notes: notes,
};
