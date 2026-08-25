// src/data/Y9/Math_2A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const MATH_2A_DATA = {
  meta: {
    id: "MATH_2A",
    title: "Solids, Volume & Surface Area",
    desc: "Master the properties of prisms, calculate volume/surface area, and analyze fractional segments of 3D shapes.",
    track: "Y9",
    icon: "Box"
  },
  phases: [
    {
      id: "concept",
      title: "Phase 0: Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 5 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 5 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 5,
      tasks: [
        { id: "SPELLING", dbKey: "p2", maxXP: 5 },
        { id: "DICTATION", dbKey: "p3", maxXP: 5 },
        { id: "READ_COMP", dbKey: "p4", maxXP: 5 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 15 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 25,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 15 },
        { id: "ESSAY", dbKey: "p8", maxXP: 15 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 },
        { id: "GAMES", dbKey: "p12", maxXP: 15 }
      ]
    }
  ],
  realWords: [
    {
      word: "Cross-section",
      vn: "Mặt cắt ngang",
      def: "The 2D shape revealed when a 3D solid is sliced straight through.",
      vnDef: "Hình dạng 2D lộ ra khi một hình khối 3D được cắt thẳng qua.",
      sent: "The cross-section of a cylinder is a perfect circle.",
      vnSent: "Mặt cắt ngang của một hình trụ là một hình tròn hoàn hảo.",
      dictSent: "A uniform cross-section stays exactly the same throughout the entire solid.",
      isReal: true
    },
    {
      word: "Solid",
      vn: "Hình khối",
      def: "A three-dimensional geometric figure that occupies physical space.",
      vnDef: "Một hình học không gian ba chiều chiếm không gian vật lý.",
      sent: "Unlike a flat square, a cube is a 3D solid.",
      vnSent: "Không giống như một hình vuông phẳng, hình lập phương là một hình khối 3D.",
      dictSent: "Every solid has height, width, and depth in physical space.",
      isReal: true
    },
    {
      word: "Surface Area",
      vn: "Diện tích bề mặt",
      def: "The total area of all the outer flat faces of a 3D object added together.",
      vnDef: "Tổng diện tích của tất cả các mặt phẳng bên ngoài của một vật thể 3D cộng lại với nhau.",
      sent: "You need to know the surface area to calculate how much paint is needed.",
      vnSent: "Bạn cần biết diện tích bề mặt để tính xem cần bao nhiêu sơn.",
      dictSent: "Total surface area is found by adding the area of every single face.",
      isReal: true
    },
    {
      word: "Volume",
      vn: "Thể tích",
      def: "The amount of three-dimensional space enclosed inside a solid.",
      vnDef: "Lượng không gian ba chiều được bao bọc bên trong một hình khối.",
      sent: "The volume of the pool tells us exactly how much water it can hold.",
      vnSent: "Thể tích của hồ bơi cho chúng ta biết chính xác nó có thể chứa bao nhiêu nước.",
      dictSent: "To find the volume of a prism, multiply the base area by its length.",
      isReal: true
    },
    {
      word: "Prism",
      vn: "Hình lăng trụ",
      def: "A solid object with two identical ends and flat rectangular sides.",
      vnDef: "Một vật thể rắn có hai đầu giống hệt nhau và các mặt bên hình chữ nhật phẳng.",
      sent: "A triangular prism looks just like a classic camping tent.",
      vnSent: "Một hình lăng trụ tam giác trông giống hệt như một chiếc lều cắm trại cổ điển.",
      dictSent: "A prism keeps the exact same cross-section from front to back.",
      isReal: true
    },
    {
      word: "Face",
      vn: "Mặt",
      def: "A single flat 2D surface on the outside of a solid shape.",
      vnDef: "Một bề mặt phẳng 2D duy nhất ở bên ngoài của một hình khối.",
      sent: "A standard rolling die has exactly six square faces.",
      vnSent: "Một con xúc xắc tiêu chuẩn có chính xác sáu mặt hình vuông.",
      dictSent: "You must measure every flat face to find the total surface area.",
      isReal: true
    },
    {
      word: "Edge",
      vn: "Cạnh",
      def: "The straight line segment where two faces of a solid meet.",
      vnDef: "Đoạn thẳng nơi hai mặt của một hình khối gặp nhau.",
      sent: "Run your finger along the sharp edge of the wooden box.",
      vnSent: "Hãy miết ngón tay của bạn dọc theo cạnh sắc của chiếc hộp gỗ.",
      dictSent: "An edge is formed whenever two flat faces intersect.",
      isReal: true
    },
    {
      word: "Vertex",
      vn: "Đỉnh",
      def: "The pointed corner where three or more edges of a solid meet.",
      vnDef: "Góc nhọn nơi ba hoặc nhiều cạnh của một hình khối gặp nhau.",
      sent: "The pyramid comes to a single sharp vertex at the very top.",
      vnSent: "Kim tự tháp tụ lại tại một đỉnh nhọn duy nhất ở trên cùng.",
      dictSent: "A vertex is the sharp corner point on a three dimensional solid.",
      isReal: true
    },
    {
      word: "Cuboid",
      vn: "Hình hộp chữ nhật",
      def: "A box-shaped 3D solid containing six rectangular faces.",
      vnDef: "Một hình khối 3D hình hộp chứa sáu mặt hình chữ nhật.",
      sent: "A cereal box is a perfect real-world example of a cuboid.",
      vnSent: "Một hộp ngũ cốc là một ví dụ thực tế hoàn hảo về hình hộp chữ nhật.",
      dictSent: "A cuboid is built entirely out of flat rectangular faces.",
      isReal: true
    },
    {
      word: "Net",
      vn: "Hình khai triển",
      def: "A flattened 2D pattern that can be folded to form a 3D solid.",
      vnDef: "Một mẫu 2D phẳng có thể được gấp lại để tạo thành một hình khối 3D.",
      sent: "By drawing a net, you can see all the hidden faces of the box at once.",
      vnSent: "Bằng cách vẽ hình khai triển, bạn có thể nhìn thấy tất cả các mặt bị ẩn của chiếc hộp cùng một lúc.",
      dictSent: "Unfolding a solid into a flat net prevents surface area mistakes.",
      isReal: true
    }
  ],
  fakeWords: [
    { word: "Cross-sectance", imitating: "Cross-section", isReal: false },
    { word: "Solidify", imitating: "Solid", isReal: false },
    { word: "Surfacial Area", imitating: "Surface Area", isReal: false },
    { word: "Volumetry", imitating: "Volume", isReal: false },
    { word: "Prismity", imitating: "Prism", isReal: false },
    { word: "Facetion", imitating: "Face", isReal: false },
    { word: "Edgement", imitating: "Edge", isReal: false },
    { word: "Vertexion", imitating: "Vertex", isReal: false },
    { word: "Cuboidity", imitating: "Cuboid", isReal: false },
    { word: "Netting", imitating: "Net", isReal: false }
  ],
  dictation: [
    { sent: "A uniform cross-section stays exactly the same throughout the entire solid.", vnSent: "Một mặt cắt ngang đồng nhất giữ nguyên hoàn toàn xuyên suốt toàn bộ hình khối." },
    { sent: "Every solid has height, width, and depth in physical space.", vnSent: "Mọi hình khối đều có chiều cao, chiều rộng và chiều sâu trong không gian vật lý." },
    { sent: "Total surface area is found by adding the area of every single face.", vnSent: "Tổng diện tích bề mặt được tìm thấy bằng cách cộng diện tích của từng mặt riêng lẻ." },
    { sent: "To find the volume of a prism, multiply the base area by its length.", vnSent: "Để tìm thể tích của hình lăng trụ, hãy nhân diện tích đáy với chiều dài của nó." },
    { sent: "A prism keeps the exact same cross-section from front to back.", vnSent: "Một hình lăng trụ giữ nguyên mặt cắt ngang giống hệt từ trước ra sau." },
    { sent: "You must measure every flat face to find the total surface area.", vnSent: "Bạn phải đo mọi mặt phẳng để tìm tổng diện tích bề mặt." },
    { sent: "An edge is formed whenever two flat faces intersect.", vnSent: "Một cạnh được hình thành bất cứ khi nào hai mặt phẳng giao nhau." },
    { sent: "A vertex is the sharp corner point on a three dimensional solid.", vnSent: "Một đỉnh là điểm góc nhọn trên một hình khối ba chiều." },
    { sent: "A cuboid is built entirely out of flat rectangular faces.", vnSent: "Một hình hộp chữ nhật được xây dựng hoàn toàn từ các mặt hình chữ nhật phẳng." },
    { sent: "Unfolding a solid into a flat net prevents surface area mistakes.", vnSent: "Việc mở một hình khối thành một hình khai triển phẳng giúp ngăn ngừa các sai sót về diện tích bề mặt." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Building the Box",
      text: "Every 3D {solid} is built from three basic geometric components. A flat exterior boundary is called a {face}. Where two of these flat surfaces meet and fold, they form a straight {edge}. Where three or more of these lines crash together at a point, they create a sharp {vertex}. A {cuboid} is a perfect example: it has six rectangular sides, twelve straight boundaries, and eight pointed corners.",
      vnTitle: "Xây dựng chiếc hộp",
      vnText: "Mọi hình khối 3D đều được xây dựng từ ba thành phần hình học cơ bản. Một ranh giới phẳng bên ngoài được gọi là một mặt. Nơi hai trong số những bề mặt phẳng này gặp nhau và tạo thành nếp gấp, chúng tạo thành một cạnh thẳng. Nơi ba hoặc nhiều đường này đâm vào nhau tại một điểm, chúng tạo ra một đỉnh nhọn. Hình hộp chữ nhật là một ví dụ hoàn hảo: nó có sáu cạnh hình chữ nhật, mười hai ranh giới thẳng và tám góc nhọn."
    },
    {
      id: "passage_2",
      title: "The Perfect Slice",
      text: "A {prism} is mathematically unique because its shape never changes from the front all the way to the back. If you cut one exactly in half, the newly exposed interior {cross-section} will match the original base perfectly. This absolute uniformity makes finding the {volume} incredibly simple. By calculating the 2D area of just one base and pulling it through the total length, you can find exactly how much space is inside.",
      vnTitle: "Lát cắt hoàn hảo",
      vnText: "Một hình lăng trụ là độc nhất về mặt toán học bởi vì hình dạng của nó không bao giờ thay đổi từ trước ra tận phía sau. Nếu bạn cắt nó ra làm hai nửa chính xác, mặt cắt ngang bên trong mới lộ ra sẽ khớp hoàn hảo với đáy ban đầu. Sự đồng nhất tuyệt đối này làm cho việc tìm thể tích trở nên vô cùng đơn giản. Bằng cách tính diện tích 2D của chỉ một đáy và kéo nó qua tổng chiều dài, bạn có thể tìm ra chính xác có bao nhiêu không gian bên trong."
    },
    {
      id: "passage_3",
      title: "Unfolding the Truth",
      text: "Calculating the total {surface area} of a complex solid can be risky. It is very easy to forget a hidden side facing the floor or the rear. To prevent these costly mistakes, mathematicians will mentally unfold the object and draw a flat {net}. This flattens the 3D shape into a 2D map, laying out every single boundary clearly so that nothing is missed during the final addition process.",
      vnTitle: "Mở ra Sự thật",
      vnText: "Việc tính toán tổng diện tích bề mặt của một hình khối phức tạp có thể gặp rủi ro. Rất dễ quên một mặt ẩn quay xuống sàn hoặc phía sau. Để ngăn chặn những sai lầm đắt giá này, các nhà toán học sẽ hình dung việc mở vật thể ra và vẽ một hình khai triển phẳng. Việc này san phẳng hình dạng 3D thành một bản đồ 2D, phơi bày rõ ràng từng ranh giới để không có gì bị bỏ sót trong quá trình cộng cuối cùng."
    }
  ],
  notebookArticle: {
    title: "Unit 2A: Solids, Volume & Surface Area",
    vnTitle: "Bài 2A: Hình khối, Thể tích & Diện tích bề mặt",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their geometric definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với các định nghĩa hình học của chúng.",
    sections: [
      {
        heading: "1. The Anatomy of a Solid",
        vnHeading: "1. Cấu tạo của một Hình khối",
        text: "A **Solid** is defined by its exterior boundaries. The flat 2D plates are called **Faces**. The straight creases where they connect are **Edges**, and the sharp corners are **Vertices**.",
        vnText: "**Hình khối** (Solid) được xác định bởi các ranh giới bên ngoài của nó. Các tấm phẳng 2D được gọi là **Các Mặt** (Faces). Các nếp gấp thẳng nơi chúng kết nối là **Các Cạnh** (Edges), và các góc nhọn là **Các Đỉnh** (Vertices)."
      },
      {
        heading: "2. The Properties of Prisms",
        vnHeading: "2. Tính chất của Hình lăng trụ",
        text: "A **Prism** has identical opposite ends, giving it a uniform **Cross-section** throughout. To find its **Volume**, simply multiply the 2D area of the base by the overall length.",
        vnText: "Một **Hình lăng trụ** (Prism) có các đầu đối diện giống hệt nhau, mang lại cho nó một **Mặt cắt ngang** (Cross-section) đồng nhất xuyên suốt. Để tìm **Thể tích** (Volume) của nó, chỉ cần nhân diện tích 2D của đáy với chiều dài tổng thể."
      },
      {
        heading: "3. Calculating Exterior Coverage",
        vnHeading: "3. Tính toán Độ bao phủ bên ngoài",
        text: "The **Surface Area** is the sum of every external boundary. Drawing a flattened **Net** helps map out all faces (especially in a **Cuboid**) so none are missed during calculation.",
        vnText: "**Diện tích bề mặt** (Surface Area) là tổng của mọi ranh giới bên ngoài. Vẽ một **Hình khai triển** (Net) phẳng giúp lập bản đồ tất cả các mặt (đặc biệt là trong một **Hình hộp chữ nhật** - Cuboid) để không mặt nào bị bỏ sót trong quá trình tính toán."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "If you already know the 2D area of a prism's cross-section, what is the exact mathematical step required to find its total 3D volume?",
      suggestedWords: [["multiply", "times"], ["length", "depth", "height"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating the mathematical operation is multiplication.",
        "1 mark for identifying that you must multiply the cross-section area by the length (or depth/height) of the prism."
      ],
      modelAnswer: "To find the volume, you simply multiply the given area of the cross-section by the total length of the prism."
    },
    {
      id: "q2",
      question: "When calculating the total surface area of a 3D solid, why do mathematicians highly recommend drawing an unfolded 2D net first?",
      suggestedWords: [["flat", "2d", "unfold", "see all"], ["hidden", "miss", "forget", "mistakes"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that a net unfolds the 3D shape into a flat 2D map.",
        "1 mark for stating that it prevents you from forgetting or missing hidden faces during the final addition calculation."
      ],
      modelAnswer: "Drawing a flat 2D net allows you to see every face laid out at once, ensuring you do not make the mistake of forgetting to calculate hidden or rear faces."
    },
    {
      id: "q3",
      question: "Imagine a cuboid has its square bases painted blue and its lateral sides painted white. Describe the step-by-step process to find the exact simplified fraction of the total surface area that is painted blue.",
      suggestedWords: [["total", "denominator", "all"], ["numerator", "target", "color", "blue"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating you must calculate the total surface area of all faces to serve as the bottom denominator.",
        "1 mark for calculating the area of only the blue faces to use as the top numerator."
      ],
      modelAnswer: "First, calculate the total surface area for all six sides to use as your denominator. Then, calculate the area of only the blue square bases to serve as your numerator. Place the blue area over the total area and simplify."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <defs>
          <marker id="d1-arr-out" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#3b82f6" /></marker>
        </defs>
        
        <path d="M 120 180 L 200 140" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
        <path d="M 200 140 L 280 140" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
        <path d="M 200 140 L 240 50" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
        
        <path d="M 280 140 L 240 50" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round" />
        
        <path d="M 200 180 L 280 140" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M 160 90 L 240 50" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round" />
        
        <path d="M 120 180 L 200 180 L 160 90 Z" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round" />
        
        <path d="M 160 140 L 100 80" fill="none" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#d1-arr-out)"/>
        <text x="95" y="75" font-family="sans-serif" font-weight="700" font-size="14" fill="#1d4ed8" text-anchor="end">Cross-section Area = 24 cm²</text>
        
        <path d="M 200 195 L 280 155" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 200 185 L 200 205" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 280 145 L 280 165" fill="none" stroke="#64748b" stroke-width="1.5" />
        <text x="245" y="195" font-family="sans-serif" font-weight="600" font-size="14" fill="#475569" text-anchor="start">Length = 10 cm</text>
      </svg>`,
      promptText: "Look at the triangular prism below. Given the area of the shaded front cross-section and the total length, calculate the exact volume of the prism.",
      suggestedWords: [["240", "240cm3", "240cm"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for indicating the multiplication of the base area (24) and the length (10).",
        "1 mark for calculating the correct final volume of 240 cm³."
      ],
      modelAnswer: "By multiplying the cross-section area (24 cm²) by the overall length (10 cm), the total volume is 240 cm³."
    },
    {
      id: "d2",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <defs>
          <marker id="d2-arr-out" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#475569" /></marker>
        </defs>

        <rect x="110" y="85" width="30" height="80" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
        <rect x="140" y="85" width="60" height="80" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
        <rect x="200" y="85" width="30" height="80" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
        <rect x="230" y="85" width="60" height="80" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
        <rect x="140" y="55" width="60" height="30" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
        <rect x="140" y="165" width="60" height="30" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>

        <path d="M 125 105 L 95 105" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#d2-arr-out)"/>
        <text x="90" y="110" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="end">2 cm</text>
        
        <path d="M 170 125 L 170 200" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#d2-arr-out)"/>
        <text x="170" y="215" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="middle">5 cm</text>
        
        <path d="M 170 70 L 120 30" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#d2-arr-out)"/>
        <text x="115" y="25" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="end">4 cm</text>
      </svg>`,
      promptText: "This diagram shows the unfolded 2D net of a cuboid. Using the labeled dimensions, calculate the total surface area of the 3D solid.",
      suggestedWords: [["76", "76cm2", "76cm"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for calculating the correct areas of the individual face pairs (Top/Bottom = 16, Left/Right = 20, Front/Back = 40).",
        "1 mark for summing them correctly to achieve the final surface area of 76 cm²."
      ],
      modelAnswer: "The total surface area is 76 cm². This is found by multiplying the pairs of faces: Front and Back (20+20), Left and Right (10+10), and Top and Bottom (8+8), then adding them all together."
    },
    {
      id: "d3",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <defs>
          <marker id="d3-arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#3b82f6" /></marker>
          <marker id="d3-arr-grey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#64748b" /></marker>
        </defs>

        <path d="M 140 170 L 220 130" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
        <path d="M 220 130 L 280 130" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
        <path d="M 220 130 L 220 70" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />

        <path d="M 280 130 L 280 70 L 220 70" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>

        <path d="M 140 110 L 200 110 L 280 70 L 220 70 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M 200 170 L 280 130 L 280 70 L 200 110 Z" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round" />
        
        <path d="M 140 170 L 200 170 L 200 110 L 140 110 Z" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round" />

        <text x="130" y="145" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="end">4 cm</text>
        <text x="170" y="190" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="middle">4 cm</text>

        <path d="M 200 185 L 280 145" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 200 175 L 200 195" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 280 135 L 280 155" fill="none" stroke="#64748b" stroke-width="1.5" />
        <text x="245" y="180" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="start">10 cm</text>

        <path d="M 170 140 L 100 80" fill="none" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#d3-arr-blue)"/>
        <text x="95" y="75" font-family="sans-serif" font-weight="700" font-size="13" fill="#2563eb" text-anchor="end">Square Bases (Blue)</text>

        <path d="M 240 100 L 320 60" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#d3-arr-grey)"/>
        <text x="325" y="55" font-family="sans-serif" font-weight="700" font-size="13" fill="#475569" text-anchor="start">Lateral Faces (White)</text>
      </svg>`,
      promptText: "This cuboid features two blue square bases and four white rectangular sides. Calculate the total surface area, then determine the exact simplified fraction of the shape that is painted blue.",
      suggestedWords: [["1/6", "one sixth"], ["192", "32"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for calculating the blue area (32 cm²) and the total surface area (192 cm²).",
        "1 mark for writing the initial fraction (32 / 192).",
        "1 mark for successfully simplifying the fraction down to 1/6."
      ],
      modelAnswer: "The two blue bases have a combined area of 32 cm². The total surface area of all six faces is 192 cm². By placing the target blue area over the total area, we get the fraction 32/192. Both numbers divide by 32, simplifying perfectly to 1/6."
    }
  ],
  essay: {
    task: "Write a detailed guide explaining how to calculate the fraction of a prism's surface area that belongs strictly to its bases. In your explanation, detail why drawing a 2D net first helps prevent common calculating mistakes.",
    guidelines: [
      "Explain how to evaluate total surface area",
      "Detail how to isolate target face categories",
      "Describe the value of utilizing a 2D flat net blueprint"
    ],
    suggestedWords: [
      ["total", "surface", "area"],
      ["fraction", "simplify", "numerator"],
      ["net", "unfold", "faces"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for outlining total surface area as the denominator",
      "1 mark for detailing face isolation for the numerator",
      "1 mark for demonstrating how nets reveal hidden or repetitive faces"
    ],
    modelAnswer: "To find the fraction of surface area belonging to specific faces, you must first calculate the area of all individual faces and sum them up to determine the total surface area, which serves as the denominator. Next, calculate the area of the target faces alone to serve as your numerator, then place it over the total and simplify the fraction. Utilizing an unfolded 2D net maps out every single boundary clearly, ensuring that hidden rear faces or identical opposite bases are never forgotten during calculation."
  },
  assessment,
  notes,
  workbook,
  games
};