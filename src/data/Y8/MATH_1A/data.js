// src/data/Y8/Math_1A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const MATH_1A_DATA = {
  meta: {
    id: "MATH_1A",
    title: "Parallel Lines & Angles",
    desc: "Master the properties of angle pairs, transversals, and parallel lines in geometry.",
    track: "Y8",
    icon: "Hash"
  },
  phases: {
    phase1: {
      unlocked: true,
      tasks: ["WORD_REC", "SPELLING", "READ_COMP", "DICTATION"]
    },
    phase2: {
      unlocked: false,
      tasks: ["VOCAB_WRITING", "SHORT_ANSWERS", "DIAGRAMS"]
    },
    phase3: {
      unlocked: false,
      tasks: ["ASSESSMENT", "ESSAY"]
    }
  },
  realWords: [
    {
      word: "Acute Angle",
      vn: "Góc nhọn",
      def: "An angle that is greater than 0° but strictly less than 90°.",
      vnDef: "Góc lớn hơn 0° nhưng nhỏ hơn 90°.",
      sent: "An equilateral triangle is made up of three acute angles.",
      vnSent: "Một tam giác đều được tạo thành từ ba góc nhọn.",
      dictSent: "An acute angle is always smaller than a perfect right angle.",
      isReal: true
    },
    {
      word: "Obtuse Angle",
      vn: "Góc tù",
      def: "An angle that is greater than 90° but strictly less than 180°.",
      vnDef: "Góc lớn hơn 90° nhưng nhỏ hơn 180°.",
      sent: "The reclining chair leaned back to form a wide obtuse angle.",
      vnSent: "Chiếc ghế ngả dựa ra sau tạo thành một góc tù rộng.",
      dictSent: "An obtuse angle is wider than a right angle but smaller than a straight line.",
      isReal: true
    },
    {
      word: "Complementary",
      vn: "Phụ nhau",
      def: "Two angles whose sum is exactly 90 degrees.",
      vnDef: "Hai góc có tổng số đo chính xác bằng 90 độ.",
      sent: "Because the two angles form a right angle, they are complementary.",
      vnSent: "Vì hai góc tạo thành một góc vuông nên chúng là hai góc phụ nhau.",
      dictSent: "Complementary angles combine to form a perfect ninety degree corner.",
      isReal: true
    },
    {
      word: "Supplementary",
      vn: "Bù nhau",
      def: "Two angles whose sum is exactly 180 degrees.",
      vnDef: "Hai góc có tổng số đo chính xác bằng 180 độ.",
      sent: "The two adjacent angles on the straight line are supplementary.",
      vnSent: "Hai góc kề nhau trên đường thẳng là hai góc bù nhau.",
      dictSent: "Supplementary angles always add up to one hundred and eighty degrees.",
      isReal: true
    },
    {
      word: "Vertically Opposite",
      vn: "Đối đỉnh",
      def: "The angles directly across from each other when two intersecting lines form an X.",
      vnDef: "Các góc nằm đối diện trực tiếp với nhau khi hai đường thẳng cắt nhau tạo thành hình chữ X.",
      sent: "The scissors open to reveal vertically opposite angles that are perfectly equal.",
      vnSent: "Chiếc kéo mở ra để lộ các góc đối đỉnh hoàn toàn bằng nhau.",
      dictSent: "Vertically opposite angles sit across from each other and are always equal.",
      isReal: true
    },
    {
      word: "Parallel Lines",
      vn: "Đường thẳng song song",
      def: "Two lines on a plane that never meet and are always the same distance apart.",
      vnDef: "Hai đường thẳng trên một mặt phẳng không bao giờ gặp nhau và luôn cách nhau một khoảng bằng nhau.",
      sent: "The train tracks run continuously as parallel lines.",
      vnSent: "Các đường ray xe lửa chạy liên tục như những đường thẳng song song.",
      dictSent: "Parallel lines stay exactly the same distance apart and never intersect.",
      isReal: true
    },
    {
      word: "Transversal",
      vn: "Đường cát tuyến",
      def: "A line that passes through two or more other lines.",
      vnDef: "Một đường thẳng đi qua hai hoặc nhiều đường thẳng khác.",
      sent: "The transversal line cut through the parallel tracks, creating eight new angles.",
      vnSent: "Đường cát tuyến cắt ngang qua các đường ray song song, tạo ra tám góc mới.",
      dictSent: "A transversal is a single line that cuts across two parallel lines.",
      isReal: true
    },
    {
      word: "Alternate Angles",
      vn: "Góc so le trong",
      def: "A pair of angles on opposite sides of a transversal and between the parallel lines (Z-shape).",
      vnDef: "Một cặp góc ở hai phía đối diện của đường cát tuyến và nằm giữa các đường thẳng song song (hình chữ Z).",
      sent: "By finding the Z-shape, she proved the alternate angles were equal.",
      vnSent: "Bằng cách tìm ra hình chữ Z, cô ấy đã chứng minh các góc so le trong bằng nhau.",
      dictSent: "Alternate angles form a Z shape and are always equal to each other.",
      isReal: true
    },
    {
      word: "Corresponding Angles",
      vn: "Góc đồng vị",
      def: "A pair of angles occupying the exact same relative position at each intersection (F-shape).",
      vnDef: "Một cặp góc chiếm cùng một vị trí tương đối chính xác tại mỗi giao điểm (hình chữ F).",
      sent: "The architect used corresponding angles to ensure the two roof panels matched perfectly.",
      vnSent: "Kiến trúc sư đã sử dụng các góc đồng vị để đảm bảo hai tấm mái khớp nhau hoàn hảo.",
      dictSent: "Corresponding angles sit in the exact same position and form an F shape.",
      isReal: true
    },
    {
      word: "Co-interior Angles",
      vn: "Góc trong cùng phía",
      def: "A pair of angles on the same side of the transversal and between parallel lines (C-shape).",
      vnDef: "Một cặp góc ở cùng một phía của đường cát tuyến và nằm giữa các đường thẳng song song (hình chữ C).",
      sent: "Unlike other pairs, co-interior angles are not equal; they add up to 180 degrees.",
      vnSent: "Không giống như các cặp khác, các góc trong cùng phía không bằng nhau; tổng của chúng là 180 độ.",
      dictSent: "Co-interior angles sit on the same side and are always supplementary.",
      isReal: true
    }
  ],
  fakeWords: [
    { word: "Acutance", imitating: "Acute Angle", isReal: false },
    { word: "Obtusity", imitating: "Obtuse Angle", isReal: false },
    { word: "Complemention", imitating: "Complementary", isReal: false },
    { word: "Supplementity", imitating: "Supplementary", isReal: false },
    { word: "Verticality", imitating: "Vertically Opposite", isReal: false },
    { word: "Parallelism", imitating: "Parallel Lines", isReal: false },
    { word: "Transversity", imitating: "Transversal", isReal: false },
    { word: "Alternation", imitating: "Alternate Angles", isReal: false },
    { word: "Correspondance", imitating: "Corresponding Angles", isReal: false },
    { word: "Co-interity", imitating: "Co-interior Angles", isReal: false }
  ],
  dictation: [
    { sent: "An acute angle is always smaller than a perfect right angle.", vnSent: "Góc nhọn luôn nhỏ hơn một góc vuông hoàn hảo." },
    { sent: "An obtuse angle is wider than a right angle but smaller than a straight line.", vnSent: "Góc tù rộng hơn góc vuông nhưng nhỏ hơn một đường thẳng." },
    { sent: "Complementary angles combine to form a perfect ninety degree corner.", vnSent: "Các góc phụ nhau kết hợp lại tạo thành một góc chín mươi độ hoàn hảo." },
    { sent: "Supplementary angles always add up to one hundred and eighty degrees.", vnSent: "Các góc bù nhau luôn có tổng bằng một trăm tám mươi độ." },
    { sent: "Vertically opposite angles sit across from each other and are always equal.", vnSent: "Các góc đối đỉnh nằm đối diện nhau và luôn luôn bằng nhau." },
    { sent: "Parallel lines stay exactly the same distance apart and never intersect.", vnSent: "Các đường thẳng song song luôn giữ khoảng cách bằng nhau và không bao giờ cắt nhau." },
    { sent: "A transversal is a single line that cuts across two parallel lines.", vnSent: "Đường cát tuyến là một đường thẳng duy nhất cắt ngang qua hai đường thẳng song song." },
    { sent: "Alternate angles form a Z shape and are always equal to each other.", vnSent: "Các góc so le trong tạo thành hình chữ Z và luôn bằng nhau." },
    { sent: "Corresponding angles sit in the exact same position and form an F shape.", vnSent: "Các góc đồng vị nằm ở cùng một vị trí và tạo thành hình chữ F." },
    { sent: "Co-interior angles sit on the same side and are always supplementary.", vnSent: "Các góc trong cùng phía nằm ở cùng một phía và luôn bù nhau." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Architect's Blueprint",
      text: "When designing a house, an architect must ensure the walls are perfectly straight. They use {parallel lines} to make sure the ceiling and floor never intersect. If a roof needs a sharp point, they will draw an {acute angle}. If they want a wider, flatter roof, they will use an {obtuse angle}. Sometimes, a single wooden beam, acting as a {transversal}, cuts directly across the frame to add structural strength.",
      vnTitle: "Bản thiết kế của Kiến trúc sư",
      vnText: "Khi thiết kế một ngôi nhà, kiến trúc sư phải đảm bảo các bức tường hoàn toàn thẳng. Họ sử dụng các đường thẳng song song để chắc chắn rằng trần và sàn không bao giờ giao nhau. Nếu mái nhà cần một điểm nhọn, họ sẽ vẽ một góc nhọn. Nếu họ muốn một mái nhà phẳng và rộng hơn, họ sẽ sử dụng một góc tù. Đôi khi, một thanh xà ngang bằng gỗ, đóng vai trò như một đường cát tuyến, cắt ngang qua khung để tăng thêm độ cứng cáp cho cấu trúc."
    },
    {
      id: "passage_2",
      title: "The Bridge of Z and F",
      text: "When two straight beams cross, they create four distinct angles. The angles facing directly across from each other are {vertically opposite} and are always perfectly equal. When a single long beam crosses two parallel tracks, it creates hidden matching patterns. The {alternate angles} sit on opposite sides of the line, forming a Z-shape. The {corresponding angles} sit in the exact same position at each intersection, forming an F-shape.",
      vnTitle: "Cây cầu của chữ Z và F",
      vnText: "Khi hai thanh xà thẳng cắt nhau, chúng tạo ra bốn góc riêng biệt. Các góc nằm trực tiếp đối diện nhau là các góc đối đỉnh và luôn luôn bằng nhau hoàn hảo. Khi một thanh xà dài duy nhất cắt qua hai đường ray song song, nó tạo ra các mẫu hình trùng khớp ẩn giấu. Các góc so le trong nằm ở hai phía đối diện của đường thẳng, tạo thành hình chữ Z. Các góc đồng vị nằm ở cùng một vị trí chính xác tại mỗi giao điểm, tạo thành hình chữ F."
    },
    {
      id: "passage_3",
      title: "The Rules of the Grid",
      text: "In mathematics, angles often work together as a team to form reliable shapes. If two angles combine to make a perfect 90-degree corner, they are {complementary}. If they stretch out to form a flat 180-degree straight line, they are {supplementary}. When looking inside the parallel lines, the angles locked inside the C-shape are called {co-interior angles}. They do not match each other, but they are always supplementary.",
      vnTitle: "Các quy tắc của Lưới tọa độ",
      vnText: "Trong toán học, các góc thường hoạt động cùng nhau như một đội để tạo thành các hình dạng đáng tin cậy. Nếu hai góc kết hợp với nhau tạo thành một góc 90 độ hoàn hảo, chúng là hai góc phụ nhau. Nếu chúng trải dài để tạo thành một đường thẳng 180 độ, chúng là hai góc bù nhau. Khi nhìn vào bên trong các đường thẳng song song, các góc bị khóa bên trong hình chữ C được gọi là góc trong cùng phía. Chúng không bằng nhau, nhưng chúng luôn là hai góc bù nhau."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Angle Rules & Parallel Lines",
    vnTitle: "Bài 1A: Các quy tắc về Góc & Đường thẳng song song",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their geometric shapes.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với các hình dạng hình học của chúng.",
    sections: [
      {
        heading: "1. Basic Angle Pairs",
        vnHeading: "1. Các cặp góc cơ bản",
        text: "Two angles are **Complementary** if they sum to 90°. They are **Supplementary** if they sum to 180°. When two lines cross, they form an X-shape, creating **Vertically Opposite** angles which are always equal.",
        vnText: "Hai góc là góc **Phụ nhau** (Complementary) nếu tổng của chúng là 90°. Chúng là góc **Bù nhau** (Supplementary) nếu tổng của chúng là 180°. Khi hai đường thẳng cắt nhau, chúng tạo thành hình chữ X, tạo ra các góc **Đối đỉnh** (Vertically Opposite) luôn luôn bằng nhau."
      },
      {
        heading: "2. The Transversal",
        vnHeading: "2. Đường cát tuyến",
        text: "A **Transversal** is a line that cuts across two or more **Parallel Lines**. This intersection creates geometric patterns that allow us to easily calculate missing angles.",
        vnText: "Một **Đường cát tuyến** (Transversal) là một đường thẳng cắt ngang qua hai hoặc nhiều **Đường thẳng song song** (Parallel Lines). Sự giao cắt này tạo ra các mẫu hình học cho phép chúng ta dễ dàng tính toán các góc còn thiếu."
      },
      {
        heading: "3. Parallel Line Rules",
        vnHeading: "3. Các quy tắc về đường thẳng song song",
        text: "**Alternate Angles** form a Z-shape and are equal. **Corresponding Angles** form an F-shape and are also equal. **Co-interior Angles** form a C-shape and are supplementary (they add to 180°).",
        vnText: "Các **Góc so le trong** (Alternate Angles) tạo thành hình chữ Z và bằng nhau. Các **Góc đồng vị** (Corresponding Angles) tạo thành hình chữ F và cũng bằng nhau. Các **Góc trong cùng phía** (Co-interior Angles) tạo thành hình chữ C và là các góc bù nhau (tổng bằng 180°)."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Describe the numerical difference between complementary and supplementary angles.",
      requiredWords: [["90", "ninety"], ["180", "one hundred and eighty", "eighty"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that complementary angles add up to 90 degrees.",
        "1 mark for stating that supplementary angles add up to 180 degrees."
      ],
      modelAnswer: "Complementary angles add up to exactly 90 degrees, while supplementary angles add up to exactly 180 degrees."
    },
    {
      id: "q2",
      question: "How do you visually identify alternate angles on a set of parallel lines, and what is their mathematical relationship?",
      requiredWords: [["z", "z-shape", "z shape"], ["equal", "same"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying that they form a 'Z' shape.",
        "1 mark for stating that the alternate angles are always equal to each other."
      ],
      modelAnswer: "You can identify alternate angles by looking for a 'Z' shape along the transversal. These angles are mathematically equal to each other."
    },
    {
      id: "q3",
      question: "Explain the difference in the relationship between corresponding angles (F-shape) and co-interior angles (C-shape).",
      requiredWords: [["equal", "same"], ["supplementary", "180", "add"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that corresponding angles are equal.",
        "1 mark for stating that co-interior angles are not equal, but are supplementary (add up to 180)."
      ],
      modelAnswer: "Corresponding angles are exactly equal to each other. However, co-interior angles are not equal; they are supplementary and add up to 180 degrees."
    }
  ],
diagrams: [
    {
      id: "d1",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 80 L 350 80" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 50 170 L 350 170" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 130 20 L 270 230" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>
        <path d="M 290 80 L 170 80 L 230 170 L 110 170" fill="none" stroke="#a855f7" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="M 195 80 A 25 25 0 0 1 183.9 100.8" fill="none" stroke="#9333ea" stroke-width="5" stroke-linecap="round"/>
        <path d="M 205 170 A 25 25 0 0 1 216.1 149.2" fill="none" stroke="#9333ea" stroke-width="5" stroke-linecap="round"/>
      </svg>`,
      imageFile: "transversal_z_shape.png", 
      imagePrompt: "A clean, flat vector illustration of geometry. Two horizontal parallel lines (blue) are cut by a diagonal transversal line (orange). A thick purple line highlights the 'Z' shape formed by the inner segments. The top inner angle and bottom opposite inner angle are marked with matching purple arcs. Minimalist, pure white background, sans-serif font.",
      promptText: "Analyze the provided diagram. Identify the type of angle pair highlighted by the geometric shape, and state their mathematical relationship.",
      // Changed required words to prevent spoiling the exact term "alternate"
      requiredWords: [["z-shape", "z shape", "shape"], ["equal", "same"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for correctly identifying the highlighted angles as Alternate Angles.",
        "1 mark for stating that they are equal."
      ],
      modelAnswer: "The diagram highlights alternate angles forming a Z-shape. These angles are equal to each other."
    },
    {
      id: "d2",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 80 L 350 80" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 50 170 L 350 170" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 130 20 L 270 230" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>
        <path d="M 270 80 L 170 80 L 230 170 L 330 170" fill="none" stroke="#1d4ed8" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="M 195 80 A 25 25 0 0 1 183.9 100.8" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <path d="M 255 170 A 25 25 0 0 0 216.1 149.2" fill="none" stroke="#22c55e" stroke-width="5" stroke-linecap="round"/>
        <text x="240" y="130" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1e3a8a" text-anchor="middle">Adds to 180°</text>
      </svg>`,
      imageFile: "transversal_c_shape.png",
      imagePrompt: "A clean, flat vector illustration of geometry. Two horizontal parallel lines (blue) are cut by a diagonal transversal line (orange). A thick blue line highlights the 'C' shape formed by the inner segments on the left side of the transversal. The two inside angles are marked with different colored arcs. Text reads 'Adds to 180°'. Minimalist, pure white background.",
      promptText: "Examine the second diagram showing the C-shape. Name this angle pair and explain why they are fundamentally different from alternate and corresponding angles.",
      // Changed required words to prevent spoiling "co-interior"
      requiredWords: [["c-shape", "c shape", "shape"], ["supplementary", "180", "add"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for correctly identifying them as Co-interior angles.",
        "1 mark for explaining they are supplementary (add to 180°) instead of being equal."
      ],
      modelAnswer: "These are co-interior angles. They are different because, unlike alternate and corresponding angles which are equal, co-interior angles are supplementary and add up to 180 degrees."
    },
    {
      id: "d3",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 80 L 350 80" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 50 170 L 350 170" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M 130 20 L 270 230" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>
        
        <path d="M 145 80 A 25 25 0 0 1 156.1 59.2" fill="none" stroke="#1e3a8a" stroke-width="4" stroke-linecap="round"/>
        <text x="135" y="65" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1e3a8a">60°</text>
        
        <path d="M 195 80 A 25 25 0 0 1 183.9 100.8" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
        <text x="190" y="105" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444">x</text>
        
        <path d="M 255 170 A 25 25 0 0 1 243.9 190.8" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
        <text x="250" y="195" font-family="sans-serif" font-weight="bold" font-size="16" fill="#22c55e">y</text>
        
        <path d="M 205 170 A 25 25 0 0 0 216.1 190.8" fill="none" stroke="#a855f7" stroke-width="4" stroke-linecap="round"/>
        <text x="200" y="195" font-family="sans-serif" font-weight="bold" font-size="16" fill="#a855f7">z</text>
      </svg>`,
      imageFile: "transversal_four_angles.png",
      promptText: "In the diagram, one angle is given as 60°. Calculate the values of angles x, y, and z. State the geometric reason for each calculation based on the properties discussed in class.",
      requiredWords: [["60", "60°"], ["120", "120°"], ["vertically", "corresponding", "alternate", "co-interior", "opposite"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for calculating x = 60° and stating it is vertically opposite.",
        "1 mark for calculating y = 60° and stating it is corresponding to x (or alternate to 60°).",
        "1 mark for calculating z = 120° and stating it is co-interior to x (or angles on a straight line with y)."
      ],
      modelAnswer: "Angle x is 60° because it is vertically opposite to the given 60° angle. Angle y is also 60° because it is corresponding to angle x. Finally, angle z is 120° because it sits on a straight line with y, making them supplementary (180 - 60 = 120)."
    }
  ],
essay: {
    task: "When a transversal line cuts through two parallel lines, how many total angles are created at the intersections? Of those angles, what is the minimum number of angle measurements you need to be given to calculate the exact degrees of all the rest? Explain your reasoning.",
    guidelines: [
      "State the total number of angles formed by the intersection.",
      "State the minimum number of angles you need to know.",
      "Explain how rules like alternate, corresponding, and supplementary angles allow you to find the rest."
    ],
    requiredWords: [
      ["supplementary", "180"], 
      ["vertical", "opposite"],
      ["alternate", "corresponding"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for stating that 8 angles are created in total.",
      "1 mark for stating that you only need to be given 1 angle measurement.",
      "1 mark for explaining that you can use geometric rules (like alternate, corresponding, or supplementary) to deduce all other 7 angles from that single known angle."
    ],
    modelAnswer: "When a transversal cuts across two parallel lines, a total of 8 angles are created at the two intersections. You only need to be told the measurement of 1 angle to figure out all the rest. Because the lines are parallel, you can use the rules of vertically opposite, alternate, and corresponding angles to find all the equal angles. For the remaining angles, you can subtract the known angle from 180 degrees, since angles on a straight line are supplementary. Therefore, one angle gives you the key to all eight."
  },
  assessment,
  notes,
  workbook,
  games
};