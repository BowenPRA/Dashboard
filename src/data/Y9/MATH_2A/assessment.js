// src/data/Y9/MATH_2A/assessment.js
export const assessment = {
  timeLimit: 1800,
  passages: [],
  questions: [
    {
      id: "q1_inline_anatomy",
      type: "inline",
      title: "1. Complete the fundamental definitions describing the parts of a 3D solid.",
      options: [],
      textParts: [
        "A flat surface on a 3D solid is called a ",
        ". The line where two of these meet is an edge, and the corner point where three or more edges meet is called a ",
        "."
      ],
      blanks: {
        "1": {
          correct: "face",
          options: [
            { val: "net", text: "net" },
            { val: "face", text: "face" },
            { val: "vertex", text: "vertex" }
          ]
        },
        "2": {
          correct: "vertex",
          options: [
            { val: "vertex", text: "vertex" },
            { val: "edge", text: "edge" },
            { val: "face", text: "face" }
          ]
        }
      },
      expEn: "A face is a flat surface. An edge is the line where two faces meet. A vertex is the corner point where edges meet.",
      expVn: "Mặt là một bề mặt phẳng. Cạnh là đường giao nhau của hai mặt. Đỉnh là điểm góc nơi các cạnh gặp nhau."
    },
    {
      id: "q2_mcq_prism",
      type: "mcq",
      title: "2. A prism has the same cross-section along its whole length. Which solid below is a prism?",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" class="w-full h-full drop-shadow-md">
        <text x="70" y="24" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">A</text>
        <path d="M 30 60 L 90 60 L 115 40 L 55 40 Z" fill="#dbeafe" stroke="#3b82f6" stroke-width="3"/>
        <path d="M 30 60 L 30 150 L 90 150 L 90 60 Z" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
        <path d="M 90 60 L 115 40 L 115 130 L 90 150 Z" fill="#bfdbfe" stroke="#3b82f6" stroke-width="3"/>

        <text x="215" y="24" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">B</text>
        <path d="M 175 150 L 255 150 L 215 45 Z" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
        <path d="M 175 150 Q 215 168 255 150" fill="none" stroke="#ef4444" stroke-width="3"/>

        <text x="345" y="24" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">C</text>
        <ellipse cx="345" cy="100" rx="42" ry="42" fill="#f0fdf4" stroke="#10b981" stroke-width="3"/>
      </svg>`,
      options: [
        { val: "A", text: "A. The cuboid" },
        { val: "B", text: "B. The cone" },
        { val: "C", text: "C. The sphere" },
        { val: "D", text: "D. None of them" }
      ],
      correct: "A",
      expEn: "A cuboid is a prism: slice it anywhere along its length and the cross-section is always the same rectangle. A cone narrows to a point and a sphere curves, so neither has a constant cross-section.",
      expVn: "Hình hộp chữ nhật là một lăng trụ: cắt ở bất kỳ đâu dọc theo chiều dài, mặt cắt ngang luôn là cùng một hình chữ nhật. Hình nón thu nhỏ về một điểm và hình cầu thì cong, nên cả hai đều không có mặt cắt ngang không đổi."
    },
    {
      id: "q3_dnd_parts",
      type: "dnd",
      title: "3. Drag each count into the correct box for a cuboid.",
      options: [],
      bank: [
        { id: "b1", val: "6", text: "6" },
        { id: "b2", val: "12", text: "12" },
        { id: "b3", val: "8", text: "8" },
        { id: "b4", val: "4", text: "4" },
        { id: "b5", val: "2", text: "2" }
      ],
      targets: [
        { id: "faces", title: "Number of Faces" },
        { id: "edges", title: "Number of Edges" },
        { id: "vertices", title: "Number of Vertices" }
      ],
      correctSets: {
        "faces": ["6"],
        "edges": ["12"],
        "vertices": ["8"]
      },
      expEn: "A cuboid has 6 faces (top, bottom and four sides), 12 edges and 8 vertices.",
      expVn: "Hình hộp chữ nhật có 6 mặt (trên, dưới và bốn mặt bên), 12 cạnh và 8 đỉnh."
    },
    {
      id: "q4_inline_volume_rule",
      type: "inline",
      title: "4. Complete the rule used to find the volume of any prism.",
      options: [],
      textParts: [
        "To find the volume of a prism, calculate the area of its ",
        " and then multiply by the ",
        " of the prism."
      ],
      blanks: {
        "1": {
          correct: "cross-section",
          options: [
            { val: "cross-section", text: "cross-section" },
            { val: "net", text: "net" },
            { val: "largest face", text: "largest face" }
          ]
        },
        "2": {
          correct: "length",
          options: [
            { val: "width", text: "width" },
            { val: "length", text: "length" },
            { val: "perimeter", text: "perimeter" }
          ]
        }
      },
      expEn: "Volume of a prism = area of cross-section x length. The cross-section is the shape that stays the same all the way through the solid.",
      expVn: "Thể tích của lăng trụ = diện tích mặt cắt ngang x chiều dài. Mặt cắt ngang là hình dạng không thay đổi trên suốt chiều dài của khối."
    },
    {
      id: "q5_mcq_volume_cuboid",
      type: "mcq",
      title: "5. Calculate the volume of the cuboid shown below.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" class="w-full h-full drop-shadow-md">
        <path d="M 90 70 L 250 70 L 300 35 L 140 35 Z" fill="#dbeafe" stroke="#3b82f6" stroke-width="3"/>
        <path d="M 90 70 L 90 165 L 250 165 L 250 70 Z" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
        <path d="M 250 70 L 300 35 L 300 130 L 250 165 Z" fill="#bfdbfe" stroke="#3b82f6" stroke-width="3"/>
        <text x="170" y="190" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">5 cm</text>
        <text x="70" y="122" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">3 cm</text>
        <text x="292" y="72" font-family="sans-serif" font-weight="bold" font-size="15" fill="#1e293b" text-anchor="middle">4 cm</text>
      </svg>`,
      options: [
        { val: "A", text: "A. 12 cm³" },
        { val: "B", text: "B. 47 cm³" },
        { val: "C", text: "C. 60 cm³" },
        { val: "D", text: "D. 94 cm³" }
      ],
      correct: "C",
      expEn: "Volume = length x width x height = 5 x 3 x 4 = 60 cm³. Remember that volume is measured in cubic units.",
      expVn: "Thể tích = dài x rộng x cao = 5 x 3 x 4 = 60 cm³. Hãy nhớ rằng thể tích được đo bằng đơn vị khối."
    },
    {
      id: "q6_mcq_surface_area",
      type: "mcq",
      title: "6. Using the same 5 cm x 3 cm x 4 cm cuboid, calculate its total surface area.",
      options: [
        { val: "A", text: "A. 47 cm²" },
        { val: "B", text: "B. 60 cm²" },
        { val: "C", text: "C. 94 cm²" },
        { val: "D", text: "D. 120 cm²" }
      ],
      correct: "C",
      expEn: "Add the area of one of each pair of faces: (5x3) + (5x4) + (3x4) = 15 + 20 + 12 = 47. Every face has a matching opposite face, so double it: 47 x 2 = 94 cm².",
      expVn: "Cộng diện tích của mỗi cặp mặt: (5x3) + (5x4) + (3x4) = 15 + 20 + 12 = 47. Mỗi mặt đều có một mặt đối diện tương ứng, nên nhân đôi: 47 x 2 = 94 cm²."
    },
    {
      id: "q7_inline_net",
      type: "inline",
      title: "7. Complete the statement about nets.",
      options: [],
      textParts: [
        "A ",
        " is a 2D drawing that can be folded up to build a 3D solid. It is useful because adding up the area of every part gives you the total ",
        " of that solid."
      ],
      blanks: {
        "1": {
          correct: "net",
          options: [
            { val: "net", text: "net" },
            { val: "prism", text: "prism" },
            { val: "cross-section", text: "cross-section" }
          ]
        },
        "2": {
          correct: "surface area",
          options: [
            { val: "volume", text: "volume" },
            { val: "surface area", text: "surface area" },
            { val: "perimeter", text: "perimeter" }
          ]
        }
      },
      expEn: "A net is the solid opened out flat. Because a net shows every face, adding all the face areas together gives the total surface area.",
      expVn: "Hình khai triển là khối được mở phẳng ra. Vì hình khai triển cho thấy mọi mặt, nên cộng tất cả diện tích các mặt lại sẽ được tổng diện tích bề mặt."
    },
    {
      id: "q8_mcq_painted_cube",
      type: "mcq",
      title: "8. A 3 cm x 3 cm x 3 cm cube is painted on all outside faces, then cut into 27 unit cubes. How many small cubes have exactly 2 painted faces?",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" class="w-full h-full drop-shadow-md">
        <path d="M 120 60 L 240 60 L 285 30 L 165 30 Z" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
        <path d="M 120 60 L 120 165 L 240 165 L 240 60 Z" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
        <path d="M 240 60 L 285 30 L 285 135 L 240 165 Z" fill="#fcd34d" stroke="#d97706" stroke-width="3"/>
        <line x1="160" y1="60" x2="160" y2="165" stroke="#d97706" stroke-width="2"/>
        <line x1="200" y1="60" x2="200" y2="165" stroke="#d97706" stroke-width="2"/>
        <line x1="120" y1="95" x2="240" y2="95" stroke="#d97706" stroke-width="2"/>
        <line x1="120" y1="130" x2="240" y2="130" stroke="#d97706" stroke-width="2"/>
        <text x="200" y="192" font-family="sans-serif" font-weight="bold" font-size="14" fill="#78350f" text-anchor="middle">painted on every outside face</text>
      </svg>`,
      options: [
        { val: "A", text: "A. 6" },
        { val: "B", text: "B. 8" },
        { val: "C", text: "C. 12" },
        { val: "D", text: "D. 27" }
      ],
      correct: "C",
      expEn: "Cubes with exactly 2 painted faces sit in the middle of an edge, away from the corners. A cube has 12 edges and each one holds a single middle cube, so the answer is 12. (The 8 corner cubes have 3 painted faces.)",
      expVn: "Các khối lập phương có đúng 2 mặt được sơn nằm ở giữa một cạnh, cách xa các góc. Một hình lập phương có 12 cạnh và mỗi cạnh chứa một khối ở giữa, vì vậy đáp án là 12. (8 khối ở góc có 3 mặt được sơn.)"
    }
  ]
};
