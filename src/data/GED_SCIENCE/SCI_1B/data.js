// src/data/GED_SCIENCE/SCI_1B/data.js
// SCI_1B — Ecosystems, Energy Flow & Heredity. The second Life Science module
// (GED-SPRINT.md §6): producers / consumers / decomposers, food chains and
// webs, the 10% energy pyramid, the carbon and water cycles, populations and
// carrying capacity, DNA / genes / Punnett squares, natural selection and the
// evidence for evolution. Every task still asks the student to READ a web, a
// pyramid, a grid or a graph and reason from it, because that is the test.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_SCI_1B_DATA = {
  meta: {
    id: "SCI_1B",
    title: "Ecosystems, Energy Flow & Heredity",
    desc: "Who eats whom and where the energy goes, how populations rise and fall, how traits pass from parents to children, and how a species changes over time.",
    track: "GED_SCIENCE",
    icon: "Leaf",
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
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 20 },
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
      ],
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
      ],
    },
  ],

  realWords: [
    { word: "Producer", vn: "Sinh vật sản xuất", def: "A living thing that makes its own food from sunlight, such as a plant.", vnDef: "Sinh vật tự tạo thức ăn từ ánh sáng mặt trời, như cây xanh.", sent: "Grass is the producer at the bottom of the food chain.", vnSent: "Cỏ là sinh vật sản xuất ở đáy chuỗi thức ăn.", isReal: true },
    { word: "Consumer", vn: "Sinh vật tiêu thụ", def: "A living thing that gets energy by eating other living things.", vnDef: "Sinh vật lấy năng lượng bằng cách ăn các sinh vật khác.", sent: "A rabbit is a consumer because it eats grass.", vnSent: "Thỏ là sinh vật tiêu thụ vì nó ăn cỏ.", isReal: true },
    { word: "Decomposer", vn: "Sinh vật phân hủy", def: "A living thing, such as a fungus or bacteria, that breaks down dead material and returns nutrients to the soil.", vnDef: "Sinh vật như nấm hoặc vi khuẩn, phân hủy vật chất chết và trả chất dinh dưỡng về đất.", sent: "Without decomposers, dead leaves would pile up forever.", vnSent: "Không có sinh vật phân hủy, lá chết sẽ chất đống mãi mãi.", isReal: true },
    { word: "Ecosystem", vn: "Hệ sinh thái", def: "All the living things in one place, plus the non-living things they depend on, such as water and sunlight.", vnDef: "Tất cả sinh vật ở một nơi, cộng với những thứ không sống mà chúng phụ thuộc vào, như nước và ánh sáng.", sent: "A pond is a small ecosystem.", vnSent: "Một cái ao là một hệ sinh thái nhỏ.", isReal: true },
    { word: "Carrying capacity", vn: "Sức chứa", def: "The largest population an ecosystem can support over time.", vnDef: "Quần thể lớn nhất mà một hệ sinh thái có thể nuôi sống lâu dài.", sent: "The island reached its carrying capacity for deer, and the herd stopped growing.", vnSent: "Hòn đảo đạt sức chứa cho hươu, và đàn ngừng tăng.", isReal: true },
    { word: "Gene", vn: "Gen", def: "A section of DNA that carries the instructions for one trait, such as eye colour.", vnDef: "Một đoạn DNA mang hướng dẫn cho một đặc điểm, như màu mắt.", sent: "You get one copy of each gene from each parent.", vnSent: "Bạn nhận một bản sao của mỗi gen từ mỗi cha mẹ.", isReal: true },
    { word: "Dominant", vn: "Trội", def: "A version of a gene that shows its trait even when only one copy is present. Written with a capital letter.", vnDef: "Một phiên bản của gen thể hiện đặc điểm ngay cả khi chỉ có một bản sao. Viết bằng chữ in hoa.", sent: "Brown eyes are dominant over blue eyes.", vnSent: "Mắt nâu là trội so với mắt xanh.", isReal: true },
    { word: "Recessive", vn: "Lặn", def: "A version of a gene that only shows its trait when both copies are the same. Written with a small letter.", vnDef: "Một phiên bản của gen chỉ thể hiện đặc điểm khi cả hai bản sao giống nhau. Viết bằng chữ thường.", sent: "A child needs two copies of the recessive gene to have blue eyes.", vnSent: "Một đứa trẻ cần hai bản sao của gen lặn để có mắt xanh.", isReal: true },
    { word: "Adaptation", vn: "Sự thích nghi", def: "A trait that helps a living thing survive in its environment, such as thick fur in a cold place.", vnDef: "Một đặc điểm giúp sinh vật sống sót trong môi trường của nó, như bộ lông dày ở nơi lạnh.", sent: "A cactus's thick skin is an adaptation to the dry desert.", vnSent: "Lớp da dày của xương rồng là sự thích nghi với sa mạc khô.", isReal: true },
    { word: "Natural selection", vn: "Chọn lọc tự nhiên", def: "The process where living things with helpful traits survive and have more young, so the trait becomes common.", vnDef: "Quá trình trong đó sinh vật có đặc điểm có lợi sống sót và sinh nhiều con hơn, nên đặc điểm đó trở nên phổ biến.", sent: "Natural selection explains why dark moths became common in smoky cities.", vnSent: "Chọn lọc tự nhiên giải thích vì sao bướm đêm sẫm màu trở nên phổ biến ở các thành phố nhiều khói.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "Who Eats Whom",
      vnTitle: "Ai Ăn Ai",
      meta: "Energy in an ecosystem",
      text: [
        "An {ecosystem} is all the living things in one place — plants, animals, fungi, bacteria — together with the non-living things they need, such as sunlight, water and soil. Energy enters the ecosystem as sunlight. A {producer}, such as grass or a tree, uses that sunlight to make its own food.",
        "A {consumer} cannot make food. It gets energy by eating. A rabbit that eats grass is a consumer; a fox that eats the rabbit is also a consumer. When plants and animals die, a {decomposer} — fungi or bacteria — breaks the dead material down and returns the nutrients to the soil, where producers can use them again.",
        "A food chain shows one path of energy: grass → rabbit → fox. The arrow always points from the food to the eater, because that is the way the energy flows. A food web joins many chains, because most animals eat more than one thing. If one species disappears, every animal that ate it loses a food source, and the animals it ate may grow in number.",
      ].join(" "),
      vnText: [
        "Hệ sinh thái là tất cả sinh vật ở một nơi — cây, động vật, nấm, vi khuẩn — cùng với những thứ không sống mà chúng cần, như ánh sáng, nước và đất. Năng lượng đi vào hệ sinh thái dưới dạng ánh sáng mặt trời. Sinh vật sản xuất, như cỏ hoặc cây, dùng ánh sáng đó để tự tạo thức ăn.",
        "Sinh vật tiêu thụ không thể tạo thức ăn. Nó lấy năng lượng bằng cách ăn. Thỏ ăn cỏ là sinh vật tiêu thụ; cáo ăn thỏ cũng là sinh vật tiêu thụ. Khi cây và động vật chết, sinh vật phân hủy — nấm hoặc vi khuẩn — phân hủy vật chất chết và trả chất dinh dưỡng về đất, nơi sinh vật sản xuất có thể dùng lại.",
        "Chuỗi thức ăn cho thấy một đường đi của năng lượng: cỏ → thỏ → cáo. Mũi tên luôn chỉ từ thức ăn đến kẻ ăn, vì đó là hướng năng lượng chảy. Lưới thức ăn nối nhiều chuỗi lại, vì hầu hết động vật ăn nhiều hơn một thứ. Nếu một loài biến mất, mọi động vật từng ăn nó mất một nguồn thức ăn, và những sinh vật nó từng ăn có thể tăng số lượng.",
      ].join(" "),
      glossary: {
        "food web": { vn: "Lưới thức ăn", def: "Many food chains joined together, because most animals eat more than one thing." },
        "nutrients": { vn: "Chất dinh dưỡng", def: "Substances living things need to grow, returned to the soil by decomposers." },
      },
    },
    {
      id: "passage_2",
      title: "Energy, Cycles and Limits",
      vnTitle: "Năng lượng, Chu trình và Giới hạn",
      meta: "Why populations stop growing",
      text: [
        "Energy is lost at every step of a food chain. Only about 10% of the energy in the {producers} passes to the animals that eat them, and only about 10% of that passes to the next level. The rest is used for moving and staying warm, or leaves as heat and waste. This is why an energy pyramid is wide at the bottom and narrow at the top, and why there are far more plants than top {consumers}.",
        "Matter is different from energy: it goes around in cycles. In the water cycle, water evaporates from oceans and lakes, forms clouds, falls as rain, and flows back. In the carbon cycle, plants take carbon dioxide from the air to make food, animals eat the plants and breathe carbon dioxide back out, and decomposers and burning fuels release more.",
        "A population is all the members of one species in a place. It grows until something limits it — food, water, space, disease or predators. These are called limiting factors. The largest population the place can support is its {carrying capacity}. Predators and prey are linked: when rabbits become plentiful, foxes have more food and increase; the extra foxes then eat more rabbits, the rabbits fall, and soon the foxes fall too.",
      ].join(" "),
      vnText: [
        "Năng lượng bị mất ở mỗi bước của chuỗi thức ăn. Chỉ khoảng 10% năng lượng trong sinh vật sản xuất truyền sang động vật ăn chúng, và chỉ khoảng 10% của phần đó truyền lên cấp tiếp theo. Phần còn lại được dùng để di chuyển và giữ ấm, hoặc thoát ra dưới dạng nhiệt và chất thải. Đó là lý do tháp năng lượng rộng ở đáy và hẹp ở đỉnh, và vì sao có nhiều cây hơn hẳn so với sinh vật tiêu thụ bậc cao.",
        "Vật chất khác với năng lượng: nó đi vòng theo chu trình. Trong chu trình nước, nước bốc hơi từ đại dương và hồ, tạo thành mây, rơi xuống thành mưa, rồi chảy về. Trong chu trình carbon, cây lấy carbon dioxide từ không khí để tạo thức ăn, động vật ăn cây và thở carbon dioxide trở lại, còn sinh vật phân hủy và việc đốt nhiên liệu thải ra thêm.",
        "Quần thể là tất cả các thành viên của một loài ở một nơi. Nó tăng cho đến khi có thứ gì đó giới hạn — thức ăn, nước, không gian, bệnh tật hoặc kẻ săn mồi. Đây gọi là các yếu tố giới hạn. Quần thể lớn nhất mà nơi đó có thể nuôi sống là sức chứa của nó. Kẻ săn mồi và con mồi liên kết với nhau: khi thỏ trở nên nhiều, cáo có nhiều thức ăn hơn và tăng lên; số cáo tăng thêm sau đó ăn nhiều thỏ hơn, thỏ giảm, và chẳng bao lâu cáo cũng giảm.",
      ].join(" "),
      glossary: {
        "limiting factors": { vn: "Yếu tố giới hạn", def: "Anything that stops a population from growing: food, water, space, disease, predators." },
        "population": { vn: "Quần thể", def: "All the members of one species living in one place." },
      },
    },
    {
      id: "passage_3",
      title: "How Traits Are Passed On",
      vnTitle: "Đặc điểm được Truyền lại Như thế nào",
      meta: "Genes and natural selection",
      text: [
        "Inside almost every cell is DNA, a long molecule that carries instructions. DNA is packed into chromosomes, and a {gene} is one section of DNA that controls one trait, such as flower colour or fur colour. You get two copies of every gene: one from your mother and one from your father.",
        "The two copies can be different versions. A {dominant} version shows its trait even if only one copy is present, and it is written with a capital letter, such as A. A {recessive} version is written with a small letter, such as a, and only shows when both copies are recessive (aa). The letters are the genotype; the trait you can actually see is the phenotype. A Punnett square is a grid that shows every combination two parents can pass on.",
        "Over many generations, a species can change. Within any group there is variation — some individuals are a little faster, darker or bigger. When a trait helps an animal survive and have young, it is an {adaptation}, and it becomes more common because those animals pass it on. This is natural selection. In smoky English cities, dark peppered moths were hidden on soot-covered trees while light moths were eaten by birds, and within decades most moths were dark. Fossils, and the similar bones in a human arm, a bat wing and a whale flipper, are evidence that today's species changed from earlier ones.",
      ].join(" "),
      vnText: [
        "Bên trong hầu hết mọi tế bào là DNA, một phân tử dài mang các hướng dẫn. DNA được đóng gói thành nhiễm sắc thể, và gen là một đoạn DNA điều khiển một đặc điểm, như màu hoa hoặc màu lông. Bạn nhận hai bản sao của mỗi gen: một từ mẹ và một từ cha.",
        "Hai bản sao có thể là các phiên bản khác nhau. Phiên bản trội thể hiện đặc điểm ngay cả khi chỉ có một bản sao, và được viết bằng chữ in hoa, như A. Phiên bản lặn được viết bằng chữ thường, như a, và chỉ thể hiện khi cả hai bản sao đều lặn (aa). Các chữ cái là kiểu gen; đặc điểm bạn thực sự thấy là kiểu hình. Bảng Punnett là một lưới cho thấy mọi tổ hợp mà hai cha mẹ có thể truyền lại.",
        "Qua nhiều thế hệ, một loài có thể thay đổi. Trong bất kỳ nhóm nào đều có sự biến dị — một số cá thể nhanh hơn, sẫm màu hơn hoặc to hơn một chút. Khi một đặc điểm giúp động vật sống sót và sinh con, đó là sự thích nghi, và nó trở nên phổ biến hơn vì những con vật đó truyền nó lại. Đây là chọn lọc tự nhiên. Ở các thành phố nhiều khói ở Anh, bướm đêm sẫm màu được ẩn trên những thân cây phủ bồ hóng trong khi bướm sáng màu bị chim ăn, và trong vài thập kỷ hầu hết bướm đêm đều sẫm màu. Hóa thạch, và các xương tương tự trong cánh tay người, cánh dơi và vây cá voi, là bằng chứng rằng các loài ngày nay đã thay đổi từ những loài trước đó.",
      ].join(" "),
      glossary: {
        "genotype": { vn: "Kiểu gen", def: "The letters — the two gene copies an individual carries, e.g. Aa." },
        "phenotype": { vn: "Kiểu hình", def: "The trait you can see, e.g. purple flowers." },
        "variation": { vn: "Biến dị", def: "The small differences between individuals in a group." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "In a food chain written as grass → rabbit → fox, what do the arrows show? Explain what would be wrong with drawing the arrow from the fox to the rabbit.",
      suggestedWords: [["energy"], ["eaten", "eater"], ["direction"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that an arrow shows the direction energy flows — from the food (the thing eaten) to the eater.",
        "Explains that fox → rabbit would mean the rabbit eats the fox / gets energy from the fox, which is backwards.",
      ],
      modelAnswer: "The arrows show which way the energy moves: from the food to the animal that eats it. Grass → rabbit means the rabbit eats the grass and gets its energy. An arrow from the fox to the rabbit would say the rabbit eats the fox, which is backwards.",
      vnTranslation: "Trong chuỗi thức ăn cỏ → thỏ → cáo, các mũi tên cho thấy điều gì? Giải thích điều gì sai nếu vẽ mũi tên từ cáo đến thỏ.",
    },
    {
      id: "qa2",
      question: "A field's grass holds 5,000 units of energy. Grasshoppers eat the grass, and frogs eat the grasshoppers. About how much energy reaches the frogs? Show your working, and explain where the rest of the energy went.",
      suggestedWords: [["percent", "10%"], ["heat"], ["moving", "living"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that only about 10% passes to each next level.",
        "Calculates 5,000 → 500 (grasshoppers) → 50 units (frogs).",
        "Explains that the other 90% at each step is used by the animal for living (moving, keeping warm) or lost as heat and waste.",
      ],
      modelAnswer: "Only about 10% of the energy passes up each level. The grasshoppers get 10% of 5,000, which is 500 units, and the frogs get 10% of 500, which is 50 units. The other 90% at each step is used up by the animals for moving and staying warm, or is lost as heat and waste, so it never reaches the next level.",
      vnTranslation: "Cỏ trong một cánh đồng chứa 5.000 đơn vị năng lượng. Châu chấu ăn cỏ, và ếch ăn châu chấu. Khoảng bao nhiêu năng lượng đến được ếch? Trình bày cách tính, và giải thích phần năng lượng còn lại đi đâu.",
    },
    {
      id: "qa3",
      question: "A herd of deer on an island grows for several years and then stops growing. Explain what has happened using the idea of carrying capacity, and name two limiting factors that could be holding the herd at that size.",
      suggestedWords: [["support", "largest"], ["food", "water", "space"], ["predators", "disease"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States the herd has reached the island's carrying capacity — the largest population the island can support.",
        "Explains that a limiting factor now stops further growth (deaths balance births / not enough resources for more).",
        "Names two valid limiting factors (e.g. food, water, space, disease, predators).",
      ],
      modelAnswer: "The herd has reached the island's carrying capacity, which is the largest number of deer the island can support. When it reaches that size, a limiting factor such as food stops it growing: there is only enough grass for so many deer, so some starve or have fewer fawns and deaths balance births. Food and disease, or food and space, could be the limiting factors.",
      vnTranslation: "Một đàn hươu trên đảo tăng trong vài năm rồi ngừng tăng. Giải thích điều gì đã xảy ra bằng khái niệm sức chứa, và nêu hai yếu tố giới hạn có thể đang giữ đàn ở kích thước đó.",
    },
    {
      id: "qa4",
      question: "In pea plants, purple flowers (A) are dominant over white flowers (a). Two purple plants that are both Aa are crossed. What fraction of their offspring is expected to have white flowers, and how can two purple parents produce a white plant?",
      suggestedWords: [["Punnett"], ["one copy", "each parent"], ["genotype", "phenotype"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that 1 in 4 (25%, a 3 : 1 ratio) of the offspring are expected to be white.",
        "Explains that each parent passes on one copy, and each Aa parent can pass on the a.",
        "Explains that a plant is white only when it gets a from both parents (aa), because a is recessive and hidden in Aa.",
      ],
      modelAnswer: "About one in four of the offspring, or 25%, should have white flowers. Each parent gives one copy of the gene, and an Aa parent can give either A or a. If the plant gets a from both parents it is aa, and with no dominant A to hide it, the recessive white shows. The two parents look purple because their one A hides the a.",
      vnTranslation: "Ở cây đậu, hoa tím (A) trội so với hoa trắng (a). Hai cây hoa tím đều là Aa được lai với nhau. Bao nhiêu phần con cái dự kiến có hoa trắng, và làm sao hai cây tím có thể sinh ra cây trắng?",
    },
    {
      id: "qa5",
      question: "Before 1850, most peppered moths in England were light-coloured. After factories covered the trees with black soot, most moths were dark within a few decades. Explain this change using natural selection.",
      suggestedWords: [["variation", "some"], ["birds", "eaten"], ["survive", "pass on"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States there was variation — some moths were already dark.",
        "Explains that on soot-covered trees, dark moths were hidden while light moths were seen and eaten by birds.",
        "Explains that the surviving dark moths had more young and passed on the dark gene, so dark moths became the majority.",
      ],
      modelAnswer: "There was always some variation: a few moths were born dark. Once the trees turned black with soot, the light moths stood out and birds ate them, while the dark moths were hidden and survived. The dark survivors had more young and passed on the gene for dark colour, so each generation had more dark moths until they were the majority. That is natural selection.",
      vnTranslation: "Trước năm 1850, hầu hết bướm đêm ở Anh có màu sáng. Sau khi các nhà máy phủ bồ hóng đen lên cây, hầu hết bướm đêm trở nên sẫm màu trong vài thập kỷ. Giải thích sự thay đổi này bằng chọn lọc tự nhiên.",
    },
  ],

  // Source Analysis: four authored SVGs — we own every number, so the answer
  // key is exact. 3 MCQ : 1 written.
  diagrams: [
    {
      id: "diag_1_food_web",
      type: "mcq",
      inlineSvg: DIAGRAMS.FOOD_WEB,
      imageAlt: "A grassland food web. Arrows: grass to grasshopper, rabbit and mouse; grasshopper to frog; frog to snake; mouse to snake and fox; rabbit to fox; snake to hawk.",
      promptText: "Read the food web. A disease kills all the FROGS. Which animal loses one of its food sources?",
      options: [
        { val: "A", text: "The grasshopper.", textVn: "Châu chấu." },
        { val: "B", text: "The snake.", textVn: "Rắn." },
        { val: "C", text: "The fox.", textVn: "Cáo." },
        { val: "D", text: "The rabbit.", textVn: "Thỏ." },
      ],
      correct: "B",
      marks: 1,
      expEn: "Find the arrow that leaves the frog: it points to the snake, so the snake eats frogs. The snake also eats mice, so it loses one of its two food sources. The grasshopper is eaten by frogs, so it would likely increase, not lose food.",
      expVn: "Tìm mũi tên rời khỏi ếch: nó chỉ đến rắn, nên rắn ăn ếch. Rắn cũng ăn chuột, nên nó mất một trong hai nguồn thức ăn. Châu chấu bị ếch ăn, nên nó có thể tăng lên, chứ không mất thức ăn.",
    },
    {
      id: "diag_2_energy_pyramid",
      type: "mcq",
      inlineSvg: DIAGRAMS.ENERGY_PYRAMID,
      imageAlt: "An energy pyramid with four levels: grass (producers) 10,000 units at the bottom, grasshoppers 1,000 units, frogs 100 units, snakes 10 units at the top. A note says about 10% passes up each level and 90% is lost as heat and waste.",
      promptText: "Use the numbers on the pyramid. What percentage of the grasshoppers' energy reaches the frogs?",
      options: [
        { val: "A", text: "1%", textVn: "1%" },
        { val: "B", text: "90%", textVn: "90%" },
        { val: "C", text: "10%", textVn: "10%" },
        { val: "D", text: "50%", textVn: "50%" },
      ],
      correct: "C",
      marks: 1,
      expEn: "Grasshoppers hold 1,000 units and frogs hold 100 units. 100 ÷ 1,000 = 0.1 = 10%. The other 90% was used for living or lost as heat and waste. That same 10% rule links every level of the pyramid.",
      expVn: "Châu chấu giữ 1.000 đơn vị và ếch giữ 100 đơn vị. 100 ÷ 1.000 = 0,1 = 10%. 90% còn lại được dùng để sống hoặc mất dưới dạng nhiệt và chất thải. Quy tắc 10% đó liên kết mọi cấp của tháp.",
    },
    {
      id: "diag_3_punnett",
      type: "mcq",
      inlineSvg: DIAGRAMS.PUNNETT_AA_X_AA,
      imageAlt: "A filled-in Punnett square for Aa × aa. Across the top: A and a. Down the side: a and a. The four boxes read Aa, aa, Aa, aa. Key: A = brown fur (dominant), a = white fur (recessive); Aa boxes are shaded brown, aa boxes are white.",
      promptText: "In these rabbits, brown fur (A) is dominant over white fur (a). Read the completed Punnett square. What fraction of the offspring is expected to have WHITE fur?",
      options: [
        { val: "A", text: "0 — none can be white.", textVn: "0 — không con nào trắng." },
        { val: "B", text: "1 out of 4.", textVn: "1 trên 4." },
        { val: "C", text: "3 out of 4.", textVn: "3 trên 4." },
        { val: "D", text: "2 out of 4 (one half).", textVn: "2 trên 4 (một nửa)." },
      ],
      correct: "D",
      marks: 1,
      expEn: "White fur needs two small letters (aa). Count the boxes: Aa, aa, Aa, aa — two of the four are aa, so half the offspring are expected to be white. This cross is not the 3 : 1 from an Aa × Aa cross, which is why you must read the grid rather than remember a ratio.",
      expVn: "Lông trắng cần hai chữ thường (aa). Đếm các ô: Aa, aa, Aa, aa — hai trong bốn ô là aa, nên một nửa con cái dự kiến trắng. Phép lai này không phải tỉ lệ 3 : 1 của Aa × Aa, đó là lý do bạn phải đọc lưới thay vì nhớ một tỉ lệ.",
    },
    {
      id: "diag_4_predator_prey",
      inlineSvg: DIAGRAMS.PREDATOR_PREY,
      imageAlt: "A line graph over 12 years. The hare (prey) line rises to a peak of about 85 hundred in year 2, falls to about 25 in year 5, rises to a second peak of 85 in year 8 and falls again. The lynx (predator) line follows the same shape but peaks later — about 40 hundred in year 3 and again in year 9 — and never rises above 40.",
      promptText: "This graph shows hares (prey) and lynx (predators) living in the same forest. Describe the PATTERN you see between the two lines, including when each one peaks, and explain WHY the lynx line follows the hare line.",
      suggestedWords: [["peak", "highest"], ["after", "later", "follow"], ["food", "more to eat"], ["cycle", "repeat"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Describes that both populations rise and fall in a repeating cycle (hares peak around years 2 and 8; lynx peak around years 3 and 9).",
        "States that the lynx (predator) peak comes AFTER the hare (prey) peak, and the lynx numbers stay lower than the hares.",
        "Explains the cause: more hares means more food, so lynx increase; the extra lynx eat more hares, so hares fall; with less food, lynx then fall, and the cycle repeats.",
      ],
      modelAnswer: "Both lines rise and fall in a repeating cycle. The hares peak first, at about 85 hundred in year 2 and again in year 8, and the lynx peak about a year later, at about 40 hundred in years 3 and 9. The lynx line always stays below the hare line. The lynx follow the hares because hares are their food: when hares are plentiful the lynx have more to eat and their numbers grow; the larger number of lynx then eats more hares, so the hares fall; with less food the lynx fall too, and the hares recover, so the cycle starts again.",
      vnTranslation: "Biểu đồ này cho thấy thỏ rừng (con mồi) và linh miêu (kẻ săn mồi) sống trong cùng một khu rừng. Mô tả MÔ HÌNH bạn thấy giữa hai đường, bao gồm khi nào mỗi đường đạt đỉnh, và giải thích VÌ SAO đường linh miêu đi theo đường thỏ rừng.",
    },
  ],

  assessment,
  notes,
};
