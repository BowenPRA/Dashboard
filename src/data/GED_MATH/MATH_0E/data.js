// src/data/GED_MATH/MATH_0E/data.js
// MATH_0E — Geometry & Measurement. Re-levelled from the Y9 solids unit and the
// Y8 parallel-lines unit for an adult ESL learner: the test supplies the formula
// sheet, so the skill is reading a formula, substituting and calculating. Math
// shape without BALANCE (nothing to solve for x): the Drill is the WORKBOOK, and
// Source Analysis is authored SVG with exact numbers, all MCQ (no English tax).
import { DIAGRAMS } from './diagrams.js';
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { workbook } from './workbook.js';

export const MATH_0E_DATA = {
  meta: {
    id: "MATH_0E",
    title: "Geometry & Measurement",
    desc: "Perimeter, area, volume and surface area from the formula sheet; the Pythagorean theorem; angle rules for lines, triangles and parallel lines; and units.",
    track: "GED_MATH",
    icon: "Ruler",
  },

  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 },
      ],
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      // WORKBOOK is the whole drill (40 XP). BALANCE is skipped — this is a
      // measurement unit, not an equation unit.
      tasks: [
        { id: "WORKBOOK", dbKey: "p11", maxXP: 40 },
      ],
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
      ],
    },
  ],

  realWords: [
    { word: "Perimeter", vn: "Chu vi", def: "The distance all the way around the outside of a shape.", vnDef: "Độ dài đường bao quanh bên ngoài một hình.", sent: "A fence goes around the perimeter of the garden.", vnSent: "Hàng rào đi quanh chu vi của khu vườn.", isReal: true },
    { word: "Area", vn: "Diện tích", def: "The amount of flat space inside a shape, measured in square units.", vnDef: "Lượng không gian phẳng bên trong một hình, đo bằng đơn vị vuông.", sent: "The area of the floor is 40 square metres.", vnSent: "Diện tích sàn là 40 mét vuông.", isReal: true },
    { word: "Volume", vn: "Thể tích", def: "The amount of space inside a solid shape, measured in cubic units.", vnDef: "Lượng không gian bên trong một hình khối, đo bằng đơn vị khối.", sent: "The volume of the box is 60 cubic feet.", vnSent: "Thể tích của cái hộp là 60 feet khối.", isReal: true },
    { word: "Radius", vn: "Bán kính", def: "The distance from the centre of a circle to its edge.", vnDef: "Khoảng cách từ tâm hình tròn đến mép của nó.", sent: "Every circle formula uses the radius.", vnSent: "Mọi công thức hình tròn đều dùng bán kính.", isReal: true },
    { word: "Diameter", vn: "Đường kính", def: "The distance all the way across a circle through its centre — twice the radius.", vnDef: "Khoảng cách xuyên qua hình tròn đi qua tâm — gấp đôi bán kính.", sent: "If the diameter is 10, the radius is 5.", vnSent: "Nếu đường kính là 10, bán kính là 5.", isReal: true },
    { word: "Hypotenuse", vn: "Cạnh huyền", def: "The longest side of a right triangle, opposite the right angle.", vnDef: "Cạnh dài nhất của tam giác vuông, đối diện góc vuông.", sent: "The ladder is the hypotenuse of the triangle.", vnSent: "Cái thang là cạnh huyền của tam giác.", isReal: true },
    { word: "Parallel", vn: "Song song", def: "Lines that stay the same distance apart and never meet.", vnDef: "Các đường thẳng luôn cách nhau một khoảng bằng nhau và không bao giờ gặp nhau.", sent: "Railway tracks are parallel lines.", vnSent: "Đường ray xe lửa là các đường thẳng song song.", isReal: true },
    { word: "Transversal", vn: "Đường cắt (cát tuyến)", def: "A line that cuts across two or more other lines.", vnDef: "Một đường thẳng cắt ngang qua hai hay nhiều đường thẳng khác.", sent: "The transversal makes eight angles with the two parallel lines.", vnSent: "Đường cắt tạo ra tám góc với hai đường thẳng song song.", isReal: true },
    { word: "Vertical angles", vn: "Góc đối đỉnh", def: "The two angles opposite each other when two lines cross; they are always equal.", vnDef: "Hai góc đối diện nhau khi hai đường thẳng cắt nhau; chúng luôn bằng nhau.", sent: "Vertical angles are equal, so the other angle is also 35 degrees.", vnSent: "Góc đối đỉnh bằng nhau, nên góc kia cũng là 35 độ.", isReal: true },
    { word: "Substitute", vn: "Thay số", def: "To replace a letter in a formula with its number.", vnDef: "Thay một chữ cái trong công thức bằng số của nó.", sent: "Substitute 5 for r in the formula, then calculate.", vnSent: "Thay 5 vào r trong công thức, rồi tính.", isReal: true },
  ],

  // Source Analysis — authored SVG figures, all MCQ. Every length in the
  // picture is repeated in the prompt or explanation, so the key is exact.
  diagrams: [
    {
      id: "diag_1_composite_area",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_COMPOSITE,
      imageAlt: "An L-shaped garden. Outer sides: 10 m across the bottom and 8 m up the left. The top edge is 4 m, then the shape steps down 5 m, runs 6 m to the right, and drops 3 m to the bottom-right corner.",
      promptText: "The plan shows an L-shaped garden (all lengths in metres). What is the AREA of the garden?",
      options: [
        { val: "A", text: "80 m²", textVn: "80 m²" },
        { val: "B", text: "50 m²", textVn: "50 m²" },
        { val: "C", text: "36 m²", textVn: "36 m²" },
        { val: "D", text: "30 m²", textVn: "30 m²" },
      ],
      correct: "B",
      marks: 1,
      expEn: "Split along the dashed line: a bottom rectangle 10 × 3 = 30 and a left column 4 × 5 = 20. Add: 30 + 20 = 50 m². (80 is the full 10 × 8 rectangle with nothing cut out; 36 is the perimeter.)",
      expVn: "Chia theo đường nét đứt: hình chữ nhật dưới 10 × 3 = 30 và cột trái 4 × 5 = 20. Cộng: 30 + 20 = 50 m². (80 là cả hình chữ nhật 10 × 8 chưa cắt; 36 là chu vi.)",
    },
    {
      id: "diag_2_composite_perimeter",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_COMPOSITE,
      imageAlt: "An L-shaped garden. Outer sides: 10 m across the bottom and 8 m up the left. The top edge is 4 m, then the shape steps down 5 m, runs 6 m to the right, and drops 3 m to the bottom-right corner.",
      promptText: "Using the same plan, a fence will go all the way around the garden. How many metres of fence are needed (the PERIMETER)?",
      options: [
        { val: "A", text: "50 m", textVn: "50 m" },
        { val: "B", text: "18 m", textVn: "18 m" },
        { val: "C", text: "28 m", textVn: "28 m" },
        { val: "D", text: "36 m", textVn: "36 m" },
      ],
      correct: "D",
      marks: 1,
      expEn: "Walk around the outside and add every side: 4 + 5 + 6 + 3 + 10 + 8 = 36 m. (18 is only 10 + 8; 50 is the area.)",
      expVn: "Đi vòng quanh bên ngoài và cộng mọi cạnh: 4 + 5 + 6 + 3 + 10 + 8 = 36 m. (18 chỉ là 10 + 8; 50 là diện tích.)",
    },
    {
      id: "diag_3_cylinder_volume",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_CYLINDER,
      imageAlt: "A cylinder-shaped can with radius 3 cm and height 10 cm. The formula sheet line reads: volume of a cylinder = π r² h, π ≈ 3.14.",
      promptText: "The can has a radius of 3 cm and a height of 10 cm. Using V = π r² h with π ≈ 3.14, what is its VOLUME?",
      options: [
        { val: "A", text: "94.2 cm³", textVn: "94,2 cm³" },
        { val: "B", text: "188.4 cm³", textVn: "188,4 cm³" },
        { val: "C", text: "282.6 cm³", textVn: "282,6 cm³" },
        { val: "D", text: "31.4 cm³", textVn: "31,4 cm³" },
      ],
      correct: "C",
      marks: 1,
      expEn: "Square the radius first: 3² = 9. Then V = 3.14 × 9 × 10 = 282.6 cm³. (94.2 used r instead of r²; 188.4 is 2πrh, the side area, not the volume.)",
      expVn: "Bình phương bán kính trước: 3² = 9. Rồi V = 3,14 × 9 × 10 = 282,6 cm³. (94,2 dùng r thay vì r²; 188,4 là 2πrh, diện tích xung quanh, không phải thể tích.)",
    },
    {
      id: "diag_4_ladder",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_RIGHT_TRIANGLE,
      imageAlt: "A ladder leaning against a wall forms a right triangle: it reaches 9 ft up the wall, and its foot is 12 ft from the wall. The ladder length is marked with a question mark.",
      promptText: "The ladder reaches 9 ft up the wall, and its foot is 12 ft from the wall. How LONG is the ladder?",
      options: [
        { val: "A", text: "15 ft", textVn: "15 ft" },
        { val: "B", text: "21 ft", textVn: "21 ft" },
        { val: "C", text: "225 ft", textVn: "225 ft" },
        { val: "D", text: "3 ft", textVn: "3 ft" },
      ],
      correct: "A",
      marks: 1,
      expEn: "The ladder is the hypotenuse. a² + b² = c²: 9² + 12² = 81 + 144 = 225, so c = √225 = 15 ft. (225 is c² before the square root; 21 just adds 9 and 12.)",
      expVn: "Cái thang là cạnh huyền. a² + b² = c²: 9² + 12² = 81 + 144 = 225, nên c = √225 = 15 ft. (225 là c² trước khi lấy căn; 21 chỉ là cộng 9 và 12.)",
    },
    {
      id: "diag_5_parallel_x",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_PARALLEL,
      imageAlt: "Two parallel lines cut by a transversal. At the top crossing, the angle above line 1 and to the right of the transversal is 65°. At the bottom crossing, angle x is in the same position (above line 2, right of the transversal) and angle y is above line 2, left of the transversal.",
      promptText: "Line 1 and line 2 are parallel. The marked angle is 65°. Angle x sits in the SAME position at the lower crossing. What is x?",
      options: [
        { val: "A", text: "25°", textVn: "25°" },
        { val: "B", text: "115°", textVn: "115°" },
        { val: "C", text: "65°", textVn: "65°" },
        { val: "D", text: "90°", textVn: "90°" },
      ],
      correct: "C",
      marks: 1,
      expEn: "x and the 65° angle are corresponding angles — the same position at each crossing (an F-shape). On parallel lines corresponding angles are equal, so x = 65°.",
      expVn: "x và góc 65° là góc đồng vị — cùng vị trí tại mỗi giao điểm (hình chữ F). Trên các đường song song, góc đồng vị bằng nhau, nên x = 65°.",
    },
    {
      id: "diag_6_parallel_y",
      type: "mcq",
      inlineSvg: DIAGRAMS.SA_PARALLEL,
      imageAlt: "Two parallel lines cut by a transversal. At the top crossing, the angle above line 1 and to the right of the transversal is 65°. At the bottom crossing, angle x is in the same position (above line 2, right of the transversal) and angle y is above line 2, left of the transversal.",
      promptText: "In the same figure, angle y sits next to angle x on line 2. What is y?",
      options: [
        { val: "A", text: "65°", textVn: "65°" },
        { val: "B", text: "115°", textVn: "115°" },
        { val: "C", text: "180°", textVn: "180°" },
        { val: "D", text: "25°", textVn: "25°" },
      ],
      correct: "B",
      marks: 1,
      expEn: "x and y sit side by side on the straight line 2, so they add to 180°. x = 65°, so y = 180 − 65 = 115°. (Every angle in the figure is either 65° or 115°.)",
      expVn: "x và y nằm kề nhau trên đường thẳng 2, nên tổng là 180°. x = 65°, nên y = 180 − 65 = 115°. (Mọi góc trong hình đều là 65° hoặc 115°.)",
    },
  ],

  workbook,
  assessment,
  notes,
};
