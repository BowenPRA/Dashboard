// data.js
import { DIAGRAMS } from './diagrams.js';
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { games } from './games.js';

export const SCIENCE_2A_DATA = {
  meta: {
    id: "SCIENCE_2A",
    title: "Tectonics",
    desc: "Explore the internal structure of the Earth, convection currents, and the theory of continental drift.",
    track: "Y9",
    icon: "Globe"
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
    { word: "Crust", vn: "Lớp vỏ", def: "The thin, hard, solid outer layer of the Earth.", vnDef: "Lớp ngoài cùng mỏng, cứng, ở thể rắn của Trái đất.", sent: "The oceanic crust is much thinner than the continental crust.", vnSent: "Lớp vỏ đại dương mỏng hơn nhiều so với lớp vỏ lục địa.", dictSent: "The crust is the thin outer layer of the Earth.", isReal: true },
    { word: "Mantle", vn: "Lớp phủ", def: "The thick layer of hot, semi-solid rock beneath the Earth's crust.", vnDef: "Lớp đá dày, nóng, bán rắn bên dưới lớp vỏ Trái đất.", sent: "Extreme heat from the core causes the rock in the mantle to slowly move.", vnSent: "Nhiệt độ cực cao từ lõi khiến đá trong lớp phủ di chuyển từ từ.", dictSent: "The mantle is made of hot, flowing rock.", isReal: true },
    { word: "Core", vn: "Lõi", def: "The extremely hot center of the Earth, made mostly of iron and nickel.", vnDef: "Trung tâm cực kỳ nóng của Trái đất, được cấu tạo chủ yếu từ sắt và niken.", sent: "The Earth's core acts like a massive furnace, heating the rock above it.", vnSent: "Lõi Trái đất hoạt động như một lò nung khổng lồ, làm nóng lớp đá bên trên nó.", dictSent: "The core is the hot center of our planet.", isReal: true },
    { word: "Tectonic Plate", vn: "Mảng kiến tạo", def: "A massive, irregularly shaped slab of solid rock that makes up the Earth's surface.", vnDef: "Một phiến đá rắn khổng lồ, có hình dạng bất thường tạo nên bề mặt Trái đất.", sent: "Earthquakes occur when a tectonic plate grinds against another.", vnSent: "Động đất xảy ra khi một mảng kiến tạo cọ xát với một mảng khác.", dictSent: "A tectonic plate is a massive slab of solid rock.", isReal: true },
    { word: "Convection Current", vn: "Dòng đối lưu", def: "The circular movement of heat in the mantle, where hot rock rises and cooler rock sinks.", vnDef: "Sự chuyển động tròn của nhiệt trong lớp phủ, nơi đá nóng nổi lên và đá lạnh hơn chìm xuống.", sent: "A convection current in the mantle slowly drags the tectonic plates above it.", vnSent: "Một dòng đối lưu trong lớp phủ từ từ kéo các mảng kiến tạo bên trên nó.", dictSent: "A convection current moves hot rock in a circle.", isReal: true },
    { word: "Divergent Boundary", vn: "Ranh giới phân kỳ", def: "A boundary where two tectonic plates are moving away from each other.", vnDef: "Một ranh giới nơi hai mảng kiến tạo đang di chuyển ra xa nhau.", sent: "New ocean floor is constantly being created at a divergent boundary.", vnSent: "Đáy đại dương mới liên tục được tạo ra tại một ranh giới phân kỳ.", dictSent: "Plates pull apart at a divergent boundary.", isReal: true },
    { word: "Magma", vn: "Magma", def: "Molten rock located deep beneath the Earth's surface.", vnDef: "Đá nóng chảy nằm sâu dưới bề mặt Trái đất.", sent: "When magma reaches the surface during an eruption, it is called lava.", vnSent: "Khi magma chạm tới bề mặt trong một vụ phun trào, nó được gọi là dung nham.", dictSent: "Magma is hot, melted rock underground.", isReal: true },
    { word: "Continental Drift", vn: "Sự trôi dạt lục địa", def: "The scientific theory that the continents slowly move across the Earth's surface.", vnDef: "Lý thuyết khoa học cho rằng các lục địa từ từ di chuyển ngang qua bề mặt Trái đất.", sent: "Alfred Wegener proposed the idea of continental drift over a century ago.", vnSent: "Alfred Wegener đã đề xuất ý tưởng về sự trôi dạt lục địa cách đây hơn một thế kỷ.", dictSent: "Continental drift explains how landmasses move over time.", isReal: true },
    { word: "Fossil", vn: "Hóa thạch", def: "The preserved remains or traces of ancient plants and animals.", vnDef: "Phần còn lại hoặc dấu vết được bảo quản của thực vật và động vật cổ đại.", sent: "Discovering a tropical plant fossil in Antarctica proves the climate was once warmer.", vnSent: "Việc phát hiện ra một hóa thạch thực vật nhiệt đới ở Nam Cực chứng tỏ khí hậu từng ấm hơn.", dictSent: "A fossil is the preserved remains of an ancient creature.", isReal: true },
    { word: "Supercontinent", vn: "Siêu lục địa", def: "A massive landmass that contains all or most of the continental crust.", vnDef: "Một vùng đất khổng lồ chứa tất cả hoặc phần lớn lớp vỏ lục địa.", sent: "Pangea is the most famous supercontinent in Earth's geological history.", vnSent: "Pangea là siêu lục địa nổi tiếng nhất trong lịch sử địa chất của Trái đất.", dictSent: "A supercontinent combines all landmasses into one.", isReal: true }
  ],
  fakeWords: [
    { word: "Crustacean", imitating: "Crust", isReal: false },
    { word: "Mantelope", imitating: "Mantle", isReal: false },
    { word: "Corex", imitating: "Core", isReal: false },
    { word: "Tectonite", imitating: "Tectonic Plate", isReal: false },
    { word: "Convectio", imitating: "Convection Current", isReal: false },
    { word: "Divergence", imitating: "Divergent Boundary", isReal: false },
    { word: "Magmar", imitating: "Magma", isReal: false },
    { word: "Drifter", imitating: "Continental Drift", isReal: false },
    { word: "Fossilize", imitating: "Fossil", isReal: false },
    { word: "Pangean", imitating: "Supercontinent", isReal: false }
  ],
  dictation: [
    { sent: "The crust is the thin outer layer of the Earth.", vnSent: "Lớp vỏ là lớp ngoài cùng mỏng của Trái đất." },
    { sent: "The mantle is made of hot, flowing rock.", vnSent: "Lớp phủ được tạo thành từ đá nóng chảy." },
    { sent: "The core is the hot center of our planet.", vnSent: "Lõi là trung tâm nóng bức của hành tinh chúng ta." },
    { sent: "A tectonic plate is a massive slab of solid rock.", vnSent: "Một mảng kiến tạo là một phiến đá rắn khổng lồ." },
    { sent: "A convection current moves hot rock in a circle.", vnSent: "Dòng đối lưu di chuyển đá nóng theo một vòng tròn." },
    { sent: "Plates pull apart at a divergent boundary.", vnSent: "Các mảng tách rời nhau tại ranh giới phân kỳ." },
    { sent: "Magma is hot, melted rock underground.", vnSent: "Magma là đá nóng chảy, ở dưới lòng đất." },
    { sent: "Continental drift explains how landmasses move over time.", vnSent: "Sự trôi dạt lục địa giải thích cách các khối đất di chuyển theo thời gian." },
    { sent: "A fossil is the preserved remains of an ancient creature.", vnSent: "Hóa thạch là tàn tích được bảo tồn của một sinh vật cổ đại." },
    { sent: "A supercontinent combines all landmasses into one.", vnSent: "Một siêu lục địa kết hợp tất cả các khối đất thành một." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Layers of the Earth",
      text: "Our planet is far from a solid sphere of rock. Instead, it is divided into distinct layers. At the very center lies the {Core}, which generates an immense amount of heat. Above it sits the {Mantle}, a thick layer of semi-solid rock that behaves like thick, hot soup. Finally, floating on top is the {Crust}, the thin, cool, and hard outer shell where oceans and continents exist.",
      vnTitle: "Các Lớp của Trái Đất",
      vnText: "Hành tinh của chúng ta khác xa một quả cầu đá đặc. Thay vào đó, nó được chia thành các lớp riêng biệt. Ngay tại trung tâm là {Core}, nơi tạo ra một lượng nhiệt khổng lồ. Phía trên nó là {Mantle}, một lớp đá bán rắn dày đặc hoạt động như một món súp nóng và đặc. Cuối cùng, nổi trên cùng là {Crust}, lớp vỏ ngoài mỏng, mát và cứng nơi tồn tại các đại dương và lục địa."
    },
    {
      id: "passage_2",
      title: "The Engine Below",
      text: "The Earth's surface is constantly changing, driven by a powerful engine beneath our feet. Heat from the core causes hot rock in the mantle to rise, cool down, and sink again in a circular motion known as a {Convection Current}. This constant churning creates massive forces that drag on the {Tectonic Plate} layer above. When this movement pulls two plates apart, it creates a gap where underground {Magma} can erupt.",
      vnTitle: "Động Cơ Bên Dưới",
      vnText: "Bề mặt Trái đất liên tục thay đổi, được thúc đẩy bởi một động cơ mạnh mẽ dưới chân chúng ta. Nhiệt từ lõi khiến đá nóng trong lớp phủ nổi lên, nguội đi và chìm xuống một lần nữa trong một chuyển động tròn được gọi là {Convection Current}. Sự khuấy trộn liên tục này tạo ra những lực khổng lồ kéo theo lớp {Tectonic Plate} bên trên. Khi chuyển động này kéo hai mảng ra xa nhau, nó tạo ra một khoảng trống nơi {Magma} dưới lòng đất có thể phun trào."
    },
    {
      id: "passage_3",
      title: "A Shifting World",
      text: "Over two hundred million years ago, there were no separate continents like we see on maps today. Instead, all land was locked together in a single {Supercontinent}. Over time, the theory of {Continental Drift} explains how this giant landmass broke apart and slowly drifted to current positions. Scientists support this idea by matching the shapes of coastlines and discovering the exact same ancient {Fossil} remains on continents that are now oceans apart.",
      vnTitle: "Một Thế Giới Biến Đổi",
      vnText: "Hơn hai trăm triệu năm trước, không có các lục địa riêng biệt như chúng ta thấy trên bản đồ ngày nay. Thay vào đó, tất cả đất đai bị khóa chặt vào nhau trong một {Supercontinent} duy nhất. Theo thời gian, thuyết {Continental Drift} giải thích cách khối đất khổng lồ này vỡ ra và từ từ trôi dạt đến các vị trí hiện tại. Các nhà khoa học ủng hộ ý tưởng này bằng cách khớp hình dạng của các đường bờ biển và phát hiện ra cùng một tàn tích {Fossil} cổ đại chính xác trên các lục địa hiện đang bị đại dương chia cắt."
    }
  ],
  notebookArticle: {
    title: "Unit 2A: Tectonic Plates & Movement",
    vnTitle: "Bài 2A: Các mảng kiến tạo & Sự di chuyển",
    instructions: "Read the summary and copy the highlighted definitions into your science notebook.",
    vnInstructions: "Đọc bản tóm tắt và chép các định nghĩa được đánh dấu vào vở khoa học của bạn.",
    sections: [
      {
        heading: "1. Earth's Structure",
        vnHeading: "1. Cấu trúc Trái đất",
        text: "The Earth has three main layers. The **Crust** is the thin, solid outer layer. The **Mantle** is the thickest layer, made of hot, flowing rock. The **Core** is the superheated center of the planet.",
        vnText: "Trái đất có ba lớp chính. **Lớp vỏ** là lớp ngoài cùng mỏng và rắn chắc. **Lớp phủ** là lớp dày nhất, được tạo thành từ đá nóng chảy. **Lõi** là trung tâm siêu nóng của hành tinh."
      },
      {
        heading: "2. Mantle Convection",
        vnHeading: "2. Đối lưu lớp phủ",
        text: "A **Convection Current** occurs when hot mantle rock rises, cools, and sinks back down. This circular motion acts like a conveyor belt, dragging the solid **Tectonic Plates** that make up the crust.",
        vnText: "Một **Dòng đối lưu** xảy ra khi đá nóng ở lớp phủ nổi lên, nguội đi và chìm xuống trở lại. Chuyển động tròn này hoạt động như một băng chuyền, kéo các **Mảng kiến tạo** rắn tạo nên lớp vỏ."
      },
      {
        heading: "3. Drifting Continents",
        vnHeading: "3. Lục địa trôi dạt",
        text: "**Continental Drift** is the theory that continents move over time. A **Divergent Boundary** forms when plates pull apart, letting **Magma** rise to create new land. Matching coastlines and shared **Fossil** records prove all continents were once a single **Supercontinent**.",
        vnText: "**Sự trôi dạt lục địa** là lý thuyết cho rằng các lục địa di chuyển theo thời gian. Một **Ranh giới phân kỳ** hình thành khi các mảng kéo rời nhau, để **Magma** dâng lên tạo ra vùng đất mới. Các đường bờ biển khớp nhau và hồ sơ **Hóa thạch** chung chứng minh rằng tất cả các lục địa từng là một **Siêu lục địa** duy nhất."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Explain the process of a convection current in the Earth's mantle.",
      suggestedWords: [["heat", "hot", "core"], ["rise", "rises", "up", "ascends"], ["cool", "cools", "cold"], ["sink", "sinks", "down", "descends"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for stating that rock is heated by the core.",
        "1 mark for explaining that the hot rock rises.",
        "1 mark for explaining that it cools near the crust and sinks back down."
      ],
      modelAnswer: "Heat from the Earth's core warms the rock in the mantle. This hot rock rises towards the crust. As it gets further from the core, it cools down and sinks back down, creating a continuous cycle."
    },
    {
      id: "q2",
      question: "What geological event happens when two tectonic plates interact at a divergent boundary?",
      suggestedWords: [["pull apart", "away", "separate"], ["magma", "lava", "rock"], ["new crust", "new land", "ocean floor"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating the plates pull apart or move away from each other.",
        "1 mark for stating that magma rises to fill the gap, creating new crust."
      ],
      modelAnswer: "At a divergent boundary, two tectonic plates pull away from each other. This creates a gap where magma rises from the mantle, cools, and forms new crust."
    },
    {
      id: "q3",
      question: "How do matching fossils found in South America and Africa support the theory of Continental Drift?",
      suggestedWords: [["ocean", "sea", "swim", "water"], ["connected", "joined", "together", "supercontinent", "pangea"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that these animals/plants could not cross the modern oceans.",
        "1 mark for concluding that the continents must have been joined together in the past."
      ],
      modelAnswer: "Finding identical fossils on both continents supports the theory because the animals could not have swum across the massive ocean. This proves South America and Africa must have been connected as a single landmass in the past."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: DIAGRAMS.NOTES_MANTLE_CONVECTION,
      promptText: "Analyze the diagram showing convection currents. Explain how the heat from the core influences the movement of the tectonic plates floating on top.",
      suggestedWords: [["rises", "rise", "up"], ["drags", "pulls", "moves", "pushes"], ["plates", "crust"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for identifying that heat causes the mantle rock to rise.",
        "1 mark for identifying that the rock moves horizontally under the crust before sinking.",
        "1 mark for concluding that this horizontal flow drags the tectonic plates with it."
      ],
      modelAnswer: "The extreme heat causes the rock to rise. When it reaches the top, it flows horizontally beneath the solid crust. This flowing movement drags the tectonic plates along with it like a conveyor belt."
    },
    {
      id: "d2",
      inlineSvg: DIAGRAMS.NOTES_DIVERGENT_BOUNDARY,
      promptText: "The diagram shows a cross-section of a divergent boundary. Describe the role of magma in this specific boundary type.",
      suggestedWords: [["gap", "space", "apart", "away"], ["magma"], ["cools", "hardens", "solidifies", "new crust", "new rock"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that magma rises into the gap between pulling plates.",
        "1 mark for stating that it cools to form brand new rock or crust."
      ],
      modelAnswer: "As the tectonic plates pull apart, magma rises from the mantle to fill the gap. When the magma reaches the surface, it cools and hardens to create new solid crust."
    }
  ],
  essay: {
    task: "Write a short essay explaining the Theory of Continental Drift. In your answer, define what the theory is, name the ancient supercontinent, and provide two distinct pieces of evidence that scientists use to prove the theory.",
    guidelines: [
      "Define Continental Drift.",
      "Mention the supercontinent Pangea.",
      "Describe the 'Jigsaw' evidence.",
      "Describe the Fossil evidence."
    ],
    suggestedWords: [
      ["move", "drift", "apart"], 
      ["pangea", "supercontinent"], 
      ["jigsaw", "puzzle", "fit", "coastline", "shape"], 
      ["fossil", "fossils", "bones", "plants"]
    ],
    scienceMaxMarks: 4,
    markScheme: [
      "1 mark for defining Continental Drift as the movement of continents over time.",
      "1 mark for identifying that all land was once joined in a supercontinent (Pangea).",
      "1 mark for explaining that coastlines fit together like a jigsaw puzzle.",
      "1 mark for explaining that identical fossils are found on separate continents."
    ],
    modelAnswer: "The theory of Continental Drift states that the Earth's continents are not fixed, but slowly move across the surface over millions of years. Scientists believe that all land was originally joined together in one massive supercontinent called Pangea. There are two strong pieces of evidence to prove this. First is the jigsaw fit; the coastlines of continents like South America and Africa look like puzzle pieces that fit perfectly together. Second is fossil evidence. Scientists have found identical fossils of plants and animals on these separate continents, which proves they must have been connected in the past because those organisms could not have crossed massive oceans."
  },
  assessment,
  notes,
  games
};