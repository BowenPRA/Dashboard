// src/data/GED_MATH/MATH_0E/assessment.js
// Timed check for Geometry & Measurement. Mostly MCQ (no English tax on maths),
// one dropdown item, bilingual explanations. NOTE: Assessment.jsx renders maths
// only inside $$...$$ (double dollar); a single $ is literal, so plain text with
// ×, π and ² is used for most working. π ≈ 3.14 throughout.

export const assessment = {
  timeLimit: 2700, // 45 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_perimeter",
      type: "mcq",
      title: "1. A rectangle is 12 cm long and 5 cm wide. What is its perimeter?",
      options: [
        { val: "A", text: "A. 17 cm" },
        { val: "B", text: "B. 60 cm" },
        { val: "C", text: "C. 34 cm" },
        { val: "D", text: "D. 24 cm" },
      ],
      correct: "C",
      expEn: "P = 2l + 2w = 2(12) + 2(5) = 24 + 10 = 34 cm. (60 is the area; 17 is only one length plus one width.)",
      expVn: "P = 2l + 2w = 2(12) + 2(5) = 24 + 10 = 34 cm. (60 là diện tích; 17 chỉ là một chiều dài cộng một chiều rộng.)",
    },
    {
      id: "q2_mcq_triangle_area",
      type: "mcq",
      title: "2. A triangle has a base of 8 in and a height of 5 in. What is its area?",
      options: [
        { val: "A", text: "A. 20 in²" },
        { val: "B", text: "B. 40 in²" },
        { val: "C", text: "C. 13 in²" },
        { val: "D", text: "D. 26 in²" },
      ],
      correct: "A",
      expEn: "A = ½ × b × h = ½ × 8 × 5 = 20 in². A triangle is half of a rectangle, so 40 (the rectangle) is double the answer.",
      expVn: "A = ½ × b × h = ½ × 8 × 5 = 20 in². Tam giác là một nửa hình chữ nhật, nên 40 (hình chữ nhật) gấp đôi đáp án.",
    },
    {
      id: "q3_mcq_circle_area",
      type: "mcq",
      title: "3. A circle has a radius of 3 m. What is its area? (Use π ≈ 3.14.)",
      options: [
        { val: "A", text: "A. 9.42 m²" },
        { val: "B", text: "B. 18.84 m²" },
        { val: "C", text: "C. 6 m²" },
        { val: "D", text: "D. 28.26 m²" },
      ],
      correct: "D",
      expEn: "A = π r² = 3.14 × 3 × 3 = 3.14 × 9 = 28.26 m². (9.42 is π × 3, and 18.84 is the circumference 2πr — both forgot to square the radius.)",
      expVn: "A = π r² = 3,14 × 3 × 3 = 3,14 × 9 = 28,26 m². (9,42 là π × 3, và 18,84 là chu vi 2πr — cả hai đều quên bình phương bán kính.)",
    },
    {
      id: "q4_mcq_box_volume",
      type: "mcq",
      title: "4. A box is 6 ft long, 3 ft wide and 2 ft tall. What is its volume?",
      options: [
        { val: "A", text: "A. 11 ft³" },
        { val: "B", text: "B. 36 ft³" },
        { val: "C", text: "C. 72 ft³" },
        { val: "D", text: "D. 18 ft³" },
      ],
      correct: "B",
      expEn: "V = l × w × h = 6 × 3 × 2 = 36 cubic feet. (11 adds the three sides; 72 is the surface area.)",
      expVn: "V = l × w × h = 6 × 3 × 2 = 36 feet khối. (11 là cộng ba cạnh; 72 là diện tích bề mặt.)",
    },
    {
      id: "q5_mcq_hypotenuse",
      type: "mcq",
      title: "5. A right triangle has legs of 5 cm and 12 cm. How long is the hypotenuse?",
      options: [
        { val: "A", text: "A. 17 cm" },
        { val: "B", text: "B. 169 cm" },
        { val: "C", text: "C. 13 cm" },
        { val: "D", text: "D. 7 cm" },
      ],
      correct: "C",
      expEn: "a² + b² = c²: 25 + 144 = 169, so c = √169 = 13 cm. (169 is c², not c — take the square root. 17 just adds the legs.)",
      expVn: "a² + b² = c²: 25 + 144 = 169, nên c = √169 = 13 cm. (169 là c², không phải c — phải lấy căn bậc hai. 17 chỉ là cộng hai cạnh.)",
    },
    {
      id: "q6_mcq_triangle_angles",
      type: "mcq",
      title: "6. A triangle has a 90° angle and a 35° angle. What is the third angle?",
      options: [
        { val: "A", text: "A. 55°" },
        { val: "B", text: "B. 145°" },
        { val: "C", text: "C. 65°" },
        { val: "D", text: "D. 125°" },
      ],
      correct: "A",
      expEn: "The angles in a triangle add to 180°: 180 − 90 − 35 = 55°. (145 forgot to subtract the right angle.)",
      expVn: "Các góc trong tam giác có tổng 180°: 180 − 90 − 35 = 55°. (145 là quên trừ góc vuông.)",
    },
    {
      id: "q7_mcq_parallel",
      type: "mcq",
      title: "7. Two parallel lines are cut by a transversal. One angle is 120°. What is the corresponding angle at the other line?",
      options: [
        { val: "A", text: "A. 60°" },
        { val: "B", text: "B. 90°" },
        { val: "C", text: "C. 240°" },
        { val: "D", text: "D. 120°" },
      ],
      correct: "D",
      expEn: "Corresponding angles (the same position at each crossing, an F-shape) are equal on parallel lines, so it is also 120°. 60° is the angle NEXT to it on the line.",
      expVn: "Góc đồng vị (cùng vị trí tại mỗi giao điểm, hình chữ F) bằng nhau trên các đường song song, nên cũng là 120°. 60° là góc KỀ nó trên đường thẳng.",
    },
    {
      id: "q8_mcq_cylinder",
      type: "mcq",
      title: "8. A can is a cylinder with a radius of 1 in and a height of 10 in. What is its volume? (Use π ≈ 3.14.)",
      options: [
        { val: "A", text: "A. 62.8 in³" },
        { val: "B", text: "B. 31.4 in³" },
        { val: "C", text: "C. 10 in³" },
        { val: "D", text: "D. 314 in³" },
      ],
      correct: "B",
      expEn: "V = π r² h = 3.14 × 1² × 10 = 3.14 × 1 × 10 = 31.4 in³. Squaring 1 gives 1, so the volume is just π × 10.",
      expVn: "V = π r² h = 3,14 × 1² × 10 = 3,14 × 1 × 10 = 31,4 in³. Bình phương của 1 là 1, nên thể tích chỉ là π × 10.",
    },
    {
      id: "q9_inline_room",
      type: "inline",
      title: "9. A room is 12 ft long and 10 ft wide. Complete the sentence.",
      options: [],
      textParts: [
        "The area of the room is ",
        " square feet, and the perimeter is ",
        " feet.",
      ],
      blanks: {
        "1": {
          correct: "120",
          options: [
            { val: "120", text: "120" },
            { val: "44", text: "44" },
            { val: "22", text: "22" },
          ],
        },
        "2": {
          correct: "44",
          options: [
            { val: "44", text: "44" },
            { val: "120", text: "120" },
            { val: "22", text: "22" },
          ],
        },
      },
      expEn: "Area = l × w = 12 × 10 = 120 ft². Perimeter = 2(12) + 2(10) = 24 + 20 = 44 ft. Area is inside (square feet); perimeter is around (feet).",
      expVn: "Diện tích = l × w = 12 × 10 = 120 ft². Chu vi = 2(12) + 2(10) = 24 + 20 = 44 ft. Diện tích là bên trong (feet vuông); chu vi là vòng quanh (feet).",
    },
    {
      id: "q10_mcq_units",
      type: "mcq",
      title: "10. A garden hose is 2 yards long. How many feet is that? (1 yard = 3 feet.)",
      options: [
        { val: "A", text: "A. 24 ft" },
        { val: "B", text: "B. 5 ft" },
        { val: "C", text: "C. 2 ft" },
        { val: "D", text: "D. 6 ft" },
      ],
      correct: "D",
      expEn: "Yards to feet is a bigger unit to a smaller one, so multiply: 2 × 3 = 6 feet. (24 would be inches: 6 × 12; 5 wrongly adds.)",
      expVn: "Yard sang feet là từ đơn vị lớn sang nhỏ, nên nhân: 2 × 3 = 6 feet. (24 là inch: 6 × 12; 5 là cộng sai.)",
    },
  ],
};
