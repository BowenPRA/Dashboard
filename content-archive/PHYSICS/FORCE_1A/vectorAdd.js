// src/data/PHYSICS/FORCE_1A/vectorAdd.js
// The Vectors task for FORCE_1A. Item shape is documented in src/tasks/VectorAdd.jsx.
//
// NOTHING HERE IS AN ANSWER KEY. Each item declares only the two forces as the
// question gives them — a size and a direction — and the task derives the
// components, the sums, the resultant and the grid from those (src/utils/vectors.js).
// So an item cannot disagree with its own solution, and the validator only has
// to check that the question is answerable, not that the answers are right.
//
// The three items are a deliberate ladder, each adding exactly one difficulty:
//
//   v1  both forces on an axis      — every component is 0 or the whole force,
//                                     so the student can check the machinery by
//                                     eye before trusting it. Answer 15, not 21.
//   v2  a force past 90°            — first NEGATIVE component; the resultant
//                                     still sits in the easy first quadrant.
//   v3  both parts negative         — third quadrant, where tan⁻¹ gives 63° for
//                                     a force that actually points at 243°.
//
// Angles are anticlockwise from the +x axis throughout, matching the deck.

export const vectorAdd = [
  {
    id: 'v1',
    prompt: 'Two tugboats pull a barge. One pulls due east, the other due north. Find the single force that would do the same job.',
    promptVn: 'Hai tàu kéo kéo một chiếc sà lan. Một tàu kéo về hướng đông, tàu kia về hướng bắc. Hãy tìm lực duy nhất làm được đúng việc đó.',
    unitLabel: 'N',
    vectors: [
      { name: 'A', mag: 12, angle: 0, label: 'east tug', labelVn: 'tàu hướng đông' },
      { name: 'B', mag: 9, angle: 90, label: 'north tug', labelVn: 'tàu hướng bắc' },
    ],
  },
  {
    id: 'v2',
    prompt: 'Two ropes are tied to a crate. Rope A pulls at 30° above the ground; rope B pulls up and back over the crate at 110°.',
    promptVn: 'Hai sợi dây được buộc vào một thùng hàng. Dây A kéo nghiêng 30° so với mặt đất; dây B kéo lên và ngược ra sau thùng ở góc 110°.',
    unitLabel: 'N',
    vectors: [
      { name: 'A', mag: 60, angle: 30, label: 'rope A', labelVn: 'dây A' },
      { name: 'B', mag: 40, angle: 110, label: 'rope B', labelVn: 'dây B' },
    ],
  },
  {
    id: 'v3',
    prompt: 'A hockey puck is hit twice at once: a 25 N shove back and to the left, and an 18 N deflection down and to the right. Both parts of the resultant come out negative — watch the quadrant.',
    promptVn: 'Một quả bóng khúc côn cầu bị đánh hai cú cùng lúc: một cú đẩy 25 N ra sau và sang trái, và một cú chạm 18 N xuống dưới và sang phải. Cả hai phần của lực tổng hợp đều âm — hãy để ý góc phần tư.',
    unitLabel: 'N',
    vectors: [
      { name: 'A', mag: 25, angle: 200, label: 'the shove', labelVn: 'cú đẩy' },
      { name: 'B', mag: 18, angle: 315, label: 'the deflection', labelVn: 'cú chạm' },
    ],
  },
];
