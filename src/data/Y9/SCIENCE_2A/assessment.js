// assessment.js
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1800,
  passages: [],
  questions: [
    {
      id: "q1_mcq_earth_layers",
      type: "mcq",
      title: "1. Which layer of the Earth acts as the primary heat source driving the movement of the mantle?",
      options: [
        { val: "A", text: "A. The Crust" },
        { val: "B", text: "B. The Tectonic Plates" },
        { val: "C", text: "C. The Core" },
        { val: "D", text: "D. The Atmosphere" }
      ],
      correct: "C",
      expEn: "The Earth's core is the superheated center of the planet. It generates the extreme heat that warms the mantle above it.",
      expVn: "Lõi Trái đất là trung tâm siêu nóng của hành tinh. Nó tạo ra nhiệt lượng cực lớn làm ấm lớp phủ bên trên nó."
    },
    {
      id: "q2_inline_crust_mantle",
      type: "inline",
      title: "2. Complete the sentences describing the upper layers of the Earth.",
      options: [],
      textParts: [
        "Humans live on the Earth's ",
        ", which is a thin, hard, solid layer of rock. Just beneath this layer is the ",
        ", which is much thicker and made of incredibly hot, flowing rock."
      ],
      blanks: {
        "1": {
          correct: "crust",
          options: [
            { val: "core", text: "core" },
            { val: "crust", text: "crust" },
            { val: "atmosphere", text: "atmosphere" }
          ]
        },
        "2": {
          correct: "mantle",
          options: [
            { val: "mantle", text: "mantle" },
            { val: "magma", text: "magma" },
            { val: "ocean", text: "ocean" }
          ]
        }
      },
      expEn: "The crust is the solid, thin outer shell we live on. The mantle is the thick, hot layer of semi-solid rock just below it.",
      expVn: "Lớp vỏ là lớp vỏ ngoài mỏng, rắn chắc mà chúng ta sống trên đó. Lớp phủ là lớp đá bán rắn dày, nóng nằm ngay bên dưới."
    },
    {
      id: "q3_mcq_convection_diagram",
      type: "mcq",
      title: "3. Look at the convection model diagram below. What does the floating block marked 'A' represent in the real world?",
      inlineSvg: DIAGRAMS.ASSESSMENT_CONVECTION_MODEL,
      options: [
        { val: "A", text: "A. The Earth's Core" },
        { val: "B", text: "B. A Tectonic Plate (Crust)" },
        { val: "C", text: "C. Rising Magma" },
        { val: "D", text: "D. The Ocean" }
      ],
      correct: "B",
      expEn: "In this model, the solid blocks floating on the fluid represent the hard tectonic plates (crust) floating on top of the flowing mantle.",
      expVn: "Trong mô hình này, các khối rắn nổi trên chất lỏng đại diện cho các mảng kiến tạo cứng (lớp vỏ) nổi trên lớp phủ đang chảy."
    },
    {
      id: "q4_order_layers",
      type: "order",
      title: "4. Drag the layers of the Earth into their correct order, starting from the outside surface at the top, down to the deepest center at the bottom.",
      options: [],
      bank: [
        { id: "b1", val: "Crust", text: "Crust" },
        { id: "b2", val: "Mantle", text: "Mantle" },
        { id: "b3", val: "Outer Core", text: "Outer Core" },
        { id: "b4", val: "Inner Core", text: "Inner Core" }
      ],
      targets: [
        { id: "layers", title: "Earth Layers (Outside to Inside)" }
      ],
      correctSets: {
        "layers": ["Crust", "Mantle", "Outer Core", "Inner Core"]
      },
      expEn: "The crust is the outermost layer. Below it is the thick mantle, followed by the liquid outer core, and finally the solid inner core at the very center.",
      expVn: "Lớp vỏ là lớp ngoài cùng. Bên dưới nó là lớp phủ dày, tiếp theo là lõi ngoài lỏng, và cuối cùng là lõi trong rắn ở ngay trung tâm."
    },
    {
      id: "q5_inline_convection",
      type: "inline",
      title: "5. Complete the description of how a convection current works.",
      options: [],
      textParts: [
        "In the mantle, rock is heated by the core. This hot rock is lighter, so it ",
        " towards the crust. As it gets further away from the heat source, the rock begins to ",
        ", becoming heavier and sinking back down."
      ],
      blanks: {
        "1": {
          correct: "rises",
          options: [
            { val: "rises", text: "rises" },
            { val: "sinks", text: "sinks" }
          ]
        },
        "2": {
          correct: "cool down",
          options: [
            { val: "heat up", text: "heat up" },
            { val: "cool down", text: "cool down" },
            { val: "evaporate", text: "evaporate" }
          ]
        }
      },
      expEn: "Convection is a cycle. Heat causes material to rise. Away from the heat source, the material cools down, becomes denser, and sinks back down.",
      expVn: "Đối lưu là một chu trình. Nhiệt làm cho vật chất nổi lên. Xa nguồn nhiệt, vật chất nguội đi, đặc hơn và chìm xuống trở lại."
    },
    {
      id: "q6_mcq_boundary",
      type: "mcq",
      title: "6. Observe the diagram showing tectonic plates moving. What type of boundary is this?",
      inlineSvg: DIAGRAMS.ASSESSMENT_BOUNDARY_TYPE,
      options: [
        { val: "A", text: "A. Convergent Boundary" },
        { val: "B", text: "B. Divergent Boundary" },
        { val: "C", text: "C. Transform Boundary" },
        { val: "D", text: "D. Stationary Boundary" }
      ],
      correct: "B",
      expEn: "The arrows show the plates pulling away from each other. When plates divide or move apart, it is called a divergent boundary.",
      expVn: "Các mũi tên cho thấy các mảng đang kéo ra xa nhau. Khi các mảng phân chia hoặc di chuyển ra xa nhau, nó được gọi là ranh giới phân kỳ."
    },
    {
      id: "q7_inline_divergent",
      type: "inline",
      title: "7. Complete the statement regarding divergent boundaries.",
      options: [],
      textParts: [
        "When two plates pull apart at a divergent boundary, it creates a gap. Hot, melted rock called ",
        " rushes up from the mantle to fill the gap. When it hits the cold ocean water, it cools and hardens to create new ",
        "."
      ],
      blanks: {
        "1": {
          correct: "magma",
          options: [
            { val: "water", text: "water" },
            { val: "magma", text: "magma" },
            { val: "fossil", text: "fossil" }
          ]
        },
        "2": {
          correct: "crust",
          options: [
            { val: "core", text: "core" },
            { val: "crust", text: "crust" }
          ]
        }
      },
      expEn: "Magma is the liquid rock underground. When plates separate, magma rises, cools, and forms brand new solid crust.",
      expVn: "Magma là đá lỏng dưới lòng đất. Khi các mảng tách ra, magma dâng lên, nguội đi và tạo thành lớp vỏ rắn hoàn toàn mới."
    },
    {
      id: "q8_mcq_fossils",
      type: "mcq",
      title: "8. The diagram highlights matching fossil bands found in South America and Africa. What does this evidence prove?",
      inlineSvg: DIAGRAMS.ASSESSMENT_FOSSIL_EVIDENCE,
      options: [
        { val: "A", text: "A. Ancient animals were excellent long-distance swimmers." },
        { val: "B", text: "B. The Earth's core is cooling down." },
        { val: "C", text: "C. These continents were once connected as a single landmass." },
        { val: "D", text: "D. Africa and South America are currently moving closer together." }
      ],
      correct: "C",
      expEn: "Since these land animals could not swim across the Atlantic Ocean, finding identical fossils proves the continents were physically connected in the past.",
      expVn: "Vì những động vật trên cạn này không thể bơi qua Đại Tây Dương, việc tìm thấy các hóa thạch giống hệt nhau chứng tỏ các lục địa đã được kết nối vật lý trong quá khứ."
    },
    {
      id: "q9_dnd_drift_evidence",
      type: "dnd",
      title: "9. Categorize the scientific observations into whether they are evidence FOR Continental Drift, or NOT evidence.",
      options: [],
      bank: [
        { id: "e1", val: "Matching Coastlines", text: "Coastlines fit like a puzzle" },
        { id: "e2", val: "Fossils", text: "Matching fossils across oceans" },
        { id: "e3", val: "Weather", text: "It rains on both continents" },
        { id: "e4", val: "Trees", text: "Trees have green leaves" }
      ],
      targets: [
        { id: "evidence", title: "Evidence for Drift" },
        { id: "not_evidence", title: "Not Evidence" }
      ],
      correctSets: {
        "evidence": ["Matching Coastlines", "Fossils"],
        "not_evidence": ["Weather", "Trees"]
      },
      expEn: "The primary evidence for Continental Drift includes the 'jigsaw' fit of the continents, identical fossil records, and matching rock formations.",
      expVn: "Bằng chứng chính cho Sự trôi dạt lục địa bao gồm sự khớp nhau như 'mảnh ghép' của các lục địa, hồ sơ hóa thạch giống hệt nhau và các thành tạo đá khớp nhau."
    },
    {
      id: "q10_mcq_pangea",
      type: "mcq",
      title: "10. What name do scientists give to the massive ancient supercontinent that existed before the continents drifted apart?",
      options: [
        { val: "A", text: "A. Atlantis" },
        { val: "B", text: "B. Pangea" },
        { val: "C", text: "C. The Mantle" },
        { val: "D", text: "D. Tectonica" }
      ],
      correct: "B",
      expEn: "Pangea (meaning 'all lands' in Greek) is the name of the supercontinent that existed millions of years ago, containing all of Earth's landmass.",
      expVn: "Pangea (có nghĩa là 'tất cả các vùng đất' trong tiếng Hy Lạp) là tên của siêu lục địa tồn tại hàng triệu năm trước, chứa toàn bộ khối đất của Trái đất."
    }
  ]
};