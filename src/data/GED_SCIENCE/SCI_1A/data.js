// src/data/GED_SCIENCE/SCI_1A/data.js
// SCI_1A — Cells & the Human Body. Life Science is 40% of the GED Science test
// (GED-SPRINT.md §6). Content: cell theory and cell parts, cells → tissues →
// organs → systems, the main body systems and how two cooperate, homeostasis
// as a feedback loop, food labels and calories, pathogens / vaccines /
// antibiotics. Every task still asks the student to READ something — a
// passage, a table or a graph — and reason from it, because that is the test.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_SCI_1A_DATA = {
  meta: {
    id: "SCI_1A",
    title: "Cells & the Human Body",
    desc: "What a cell is and what its parts do, how cells build the body's systems, how the body keeps itself steady, and what a food label and a germ have to do with staying healthy.",
    track: "GED_SCIENCE",
    icon: "Dna",
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
    { word: "Cell", vn: "Tế bào", def: "The smallest living unit. Every living thing is made of one or more cells.", vnDef: "Đơn vị sống nhỏ nhất. Mọi sinh vật đều được tạo thành từ một hoặc nhiều tế bào.", sent: "Your body is made of trillions of cells.", vnSent: "Cơ thể bạn được tạo thành từ hàng nghìn tỷ tế bào.", isReal: true },
    { word: "Nucleus", vn: "Nhân tế bào", def: "The control centre of a cell. It holds the DNA.", vnDef: "Trung tâm điều khiển của tế bào. Nó chứa DNA.", sent: "The nucleus tells the cell what to do.", vnSent: "Nhân tế bào chỉ đạo tế bào phải làm gì.", isReal: true },
    { word: "Tissue", vn: "Mô", def: "A group of similar cells that do the same job together.", vnDef: "Một nhóm các tế bào giống nhau cùng làm một công việc.", sent: "Muscle tissue is made of cells that can pull.", vnSent: "Mô cơ được tạo thành từ các tế bào có thể co lại.", isReal: true },
    { word: "Organ", vn: "Cơ quan", def: "A body part made of several tissues that does one main job, such as the heart or the lungs.", vnDef: "Một bộ phận cơ thể gồm nhiều mô, làm một công việc chính, như tim hoặc phổi.", sent: "The heart is an organ that pumps blood.", vnSent: "Tim là cơ quan bơm máu.", isReal: true },
    { word: "Homeostasis", vn: "Cân bằng nội môi", def: "The way the body keeps its inside conditions steady, such as temperature and blood sugar.", vnDef: "Cách cơ thể giữ các điều kiện bên trong ổn định, như nhiệt độ và đường huyết.", sent: "Sweating on a hot day is homeostasis at work.", vnSent: "Đổ mồ hôi vào ngày nóng là cân bằng nội môi đang hoạt động.", isReal: true },
    { word: "Nutrient", vn: "Chất dinh dưỡng", def: "A substance in food that the body needs to live and grow, such as protein or vitamins.", vnDef: "Một chất trong thức ăn mà cơ thể cần để sống và lớn lên, như protein hoặc vitamin.", sent: "Vegetables are full of nutrients.", vnSent: "Rau củ chứa đầy chất dinh dưỡng.", isReal: true },
    { word: "Calorie", vn: "Calo", def: "A unit that measures how much energy a food gives the body.", vnDef: "Đơn vị đo lượng năng lượng một loại thức ăn cung cấp cho cơ thể.", sent: "This candy bar has 250 calories.", vnSent: "Thanh kẹo này có 250 calo.", isReal: true },
    { word: "Pathogen", vn: "Mầm bệnh", def: "A tiny living thing that causes disease, such as a bacterium or a virus.", vnDef: "Một sinh vật rất nhỏ gây bệnh, như vi khuẩn hoặc virus.", sent: "Washing your hands removes pathogens.", vnSent: "Rửa tay loại bỏ mầm bệnh.", isReal: true },
    { word: "Vaccine", vn: "Vắc-xin", def: "A medicine that trains the body to fight a disease before you catch it.", vnDef: "Một loại thuốc huấn luyện cơ thể chống lại bệnh trước khi bạn mắc bệnh.", sent: "The flu vaccine is given every year.", vnSent: "Vắc-xin cúm được tiêm mỗi năm.", isReal: true },
    { word: "Antibiotic", vn: "Kháng sinh", def: "A medicine that kills bacteria. It does not work on viruses.", vnDef: "Một loại thuốc tiêu diệt vi khuẩn. Nó không có tác dụng với virus.", sent: "The doctor gave her an antibiotic for the ear infection.", vnSent: "Bác sĩ cho cô ấy thuốc kháng sinh để trị nhiễm trùng tai.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "From Cells to Systems",
      vnTitle: "Từ Tế bào đến Hệ cơ quan",
      meta: "How the body is built",
      text: [
        "Every living thing is made of cells. This idea is called cell theory. It says three things: all living things are made of cells, the {cell} is the smallest unit of life, and new cells come only from other cells.",
        "Inside a cell, each part has a job. The {nucleus} is the control centre and holds the DNA. The cell membrane is the thin skin that controls what goes in and out. The cytoplasm is the jelly that fills the cell. Mitochondria release energy from food. Plant cells also have a stiff cell wall and green chloroplasts, which make food from sunlight. Animal cells have neither.",
        "Cells build the body in levels. A group of similar cells working together is a {tissue}, such as muscle tissue. Several tissues joined together make an {organ}, such as the heart. Organs that work together make a system, such as the circulatory system. So the order is: cell, tissue, organ, system.",
      ].join(" "),
      vnText: [
        "Mọi sinh vật đều được tạo thành từ tế bào. Ý tưởng này gọi là học thuyết tế bào. Nó nói ba điều: mọi sinh vật đều được tạo thành từ tế bào, tế bào là đơn vị nhỏ nhất của sự sống, và tế bào mới chỉ sinh ra từ tế bào khác.",
        "Bên trong tế bào, mỗi phần có một công việc. Nhân là trung tâm điều khiển và chứa DNA. Màng tế bào là lớp da mỏng kiểm soát những gì đi vào và đi ra. Tế bào chất là chất keo lấp đầy tế bào. Ty thể giải phóng năng lượng từ thức ăn. Tế bào thực vật còn có thành tế bào cứng và lục lạp màu xanh, tạo ra thức ăn từ ánh sáng mặt trời. Tế bào động vật không có cả hai thứ đó.",
        "Tế bào xây dựng cơ thể theo từng cấp. Một nhóm tế bào giống nhau cùng làm việc là một mô, như mô cơ. Nhiều mô ghép lại tạo thành một cơ quan, như tim. Các cơ quan cùng hoạt động tạo thành một hệ cơ quan, như hệ tuần hoàn. Vậy thứ tự là: tế bào, mô, cơ quan, hệ cơ quan.",
      ].join(" "),
      glossary: {
        "cell theory": { vn: "Học thuyết tế bào", def: "The three rules: all living things are made of cells, the cell is the smallest unit of life, new cells come from cells." },
        "chloroplasts": { vn: "Lục lạp", def: "The green parts of a plant cell that make food from sunlight." },
      },
    },
    {
      id: "passage_2",
      title: "Systems That Work Together",
      vnTitle: "Các Hệ cơ quan Cùng hoạt động",
      meta: "Lungs, blood, and staying steady",
      text: [
        "The body has many systems, and no system works alone. The respiratory system brings air into the lungs. The circulatory system — the heart, the blood and the blood vessels — carries that oxygen to every cell. In the lungs, oxygen moves from the air into the blood, and carbon dioxide moves from the blood into the air to be breathed out. The heart then pumps the oxygen-rich blood to the body. Each {organ} depends on the others.",
        "The body also keeps its inside conditions steady. This is called {homeostasis}. It works like a feedback loop: a change is detected, the body responds, and the response pushes the condition back to normal. When you get too hot, you sweat, and the sweat cools your skin. When you get too cold, you shiver, and the shaking muscles make heat.",
        "Blood sugar works the same way. After a meal, sugar from the food enters the blood, so blood sugar rises. The body releases a chemical called insulin, which moves the sugar into cells. Within about two hours, blood sugar falls back to its normal level. The body cannot skip this step: every {cell} needs a steady supply of sugar for energy.",
      ].join(" "),
      vnText: [
        "Cơ thể có nhiều hệ cơ quan, và không hệ nào hoạt động một mình. Hệ hô hấp đưa không khí vào phổi. Hệ tuần hoàn — tim, máu và các mạch máu — mang oxy đó đến mọi tế bào. Trong phổi, oxy đi từ không khí vào máu, và carbon dioxide đi từ máu ra không khí để được thở ra. Sau đó tim bơm máu giàu oxy đi khắp cơ thể. Mỗi cơ quan phụ thuộc vào các cơ quan khác.",
        "Cơ thể cũng giữ các điều kiện bên trong ổn định. Điều này gọi là cân bằng nội môi. Nó hoạt động như một vòng phản hồi: một thay đổi được phát hiện, cơ thể phản ứng, và phản ứng đẩy điều kiện trở lại bình thường. Khi bạn quá nóng, bạn đổ mồ hôi, và mồ hôi làm mát da. Khi bạn quá lạnh, bạn run, và các cơ rung lên tạo ra nhiệt.",
        "Đường huyết cũng hoạt động theo cách đó. Sau bữa ăn, đường từ thức ăn đi vào máu, nên đường huyết tăng. Cơ thể tiết ra một chất gọi là insulin, chất này chuyển đường vào các tế bào. Trong khoảng hai giờ, đường huyết giảm trở lại mức bình thường. Cơ thể không thể bỏ qua bước này: mọi tế bào đều cần nguồn cung cấp đường ổn định để có năng lượng.",
      ].join(" "),
      glossary: {
        "feedback loop": { vn: "Vòng phản hồi", def: "Detect a change, respond, and the response brings the condition back to normal." },
        "insulin": { vn: "Insulin", def: "A chemical the body releases to move sugar from the blood into cells." },
      },
    },
    {
      id: "passage_3",
      title: "Food, Germs and Medicine",
      vnTitle: "Thức ăn, Vi trùng và Thuốc",
      meta: "Reading a label, fighting disease",
      text: [
        "A food label tells you what is in one serving. The most important number is the {calorie} count: it measures how much energy the food gives you. If you take in more calories than your body uses, the extra is stored as fat and you gain weight. If you take in fewer, you lose weight. The label also lists each {nutrient} — fat, sugar, protein, fibre, vitamins — so you can compare two foods. A balanced diet has plenty of vegetables, fruit, whole grains and protein, and not too much sugar or fat.",
        "Disease can come from a {pathogen} — a tiny living thing such as a bacterium or a virus that gets into the body. The immune system fights back with white blood cells. A {vaccine} helps by showing the immune system a safe piece of the pathogen, so the body learns to fight it before the real infection arrives.",
        "Medicine must match the cause. An {antibiotic} kills bacteria, so it cures a bacterial infection such as strep throat. But a cold and the flu are caused by viruses, and antibiotics do nothing to a virus. Taking antibiotics when they are not needed can even help bacteria become resistant, so the medicine stops working when you really need it.",
      ].join(" "),
      vnText: [
        "Nhãn thực phẩm cho bạn biết một khẩu phần có gì. Con số quan trọng nhất là lượng calo: nó đo lượng năng lượng thức ăn cung cấp cho bạn. Nếu bạn nạp nhiều calo hơn cơ thể sử dụng, phần dư được tích trữ thành mỡ và bạn tăng cân. Nếu nạp ít hơn, bạn giảm cân. Nhãn cũng liệt kê từng chất dinh dưỡng — chất béo, đường, protein, chất xơ, vitamin — để bạn so sánh hai loại thức ăn. Một chế độ ăn cân bằng có nhiều rau, trái cây, ngũ cốc nguyên hạt và protein, và không quá nhiều đường hay chất béo.",
        "Bệnh có thể đến từ mầm bệnh — một sinh vật rất nhỏ như vi khuẩn hoặc virus xâm nhập vào cơ thể. Hệ miễn dịch chống trả bằng các tế bào bạch cầu. Vắc-xin giúp bằng cách cho hệ miễn dịch thấy một mảnh an toàn của mầm bệnh, để cơ thể học cách chống lại nó trước khi nhiễm trùng thật sự đến.",
        "Thuốc phải phù hợp với nguyên nhân. Kháng sinh tiêu diệt vi khuẩn, nên nó chữa nhiễm khuẩn như viêm họng do liên cầu. Nhưng cảm lạnh và cúm do virus gây ra, và kháng sinh không làm gì được virus. Dùng kháng sinh khi không cần thiết thậm chí có thể giúp vi khuẩn trở nên kháng thuốc, khiến thuốc không còn tác dụng khi bạn thực sự cần.",
      ].join(" "),
      glossary: {
        "immune system": { vn: "Hệ miễn dịch", def: "The body's defence: white blood cells that find and destroy pathogens." },
        "resistant": { vn: "Kháng thuốc", def: "When bacteria change so a medicine no longer kills them." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "Plant cells have chloroplasts but animal cells do not. Explain why, using what chloroplasts do.",
      suggestedWords: [["sunlight", "light"], ["make", "produce"], ["eat"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that chloroplasts make food (sugar) from sunlight / do photosynthesis.",
        "States that animals get food by eating, so their cells do not need chloroplasts.",
      ],
      modelAnswer: "Chloroplasts are the green parts that make the plant's food from sunlight. A plant cannot eat, so it needs them. An animal gets its food by eating, so its cells do not need chloroplasts.",
      vnTranslation: "Tế bào thực vật có lục lạp nhưng tế bào động vật thì không. Hãy giải thích vì sao, dựa vào chức năng của lục lạp.",
    },
    {
      id: "qa2",
      question: "Put these in order from smallest to largest and give one example of each: organ, cell, system, tissue.",
      suggestedWords: [["muscle"], ["heart"], ["circulatory", "digestive"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Gives the correct order: cell, tissue, organ, system.",
        "Gives a correct example of a tissue (e.g. muscle tissue) and of an organ (e.g. heart, lungs, stomach).",
        "Gives a correct example of a system (e.g. circulatory, digestive, nervous).",
      ],
      modelAnswer: "The order is cell, then tissue, then organ, then system. A muscle cell is a cell; muscle tissue is a tissue; the heart is an organ made of tissues; and the heart, blood and vessels together are the circulatory system.",
      vnTranslation: "Sắp xếp các từ sau từ nhỏ nhất đến lớn nhất và cho một ví dụ cho mỗi loại: cơ quan, tế bào, hệ cơ quan, mô.",
    },
    {
      id: "qa3",
      question: "Explain how the lungs and the blood work together to get oxygen to the body's cells.",
      suggestedWords: [["oxygen"], ["carbon dioxide"], ["pump", "heart"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that in the lungs, oxygen from the air moves into the blood.",
        "States that the heart pumps the oxygen-rich blood to the body's cells.",
        "States that the blood carries carbon dioxide back to the lungs to be breathed out.",
      ],
      modelAnswer: "When you breathe in, oxygen passes from the air in the lungs into the blood. The heart then pumps this oxygen-rich blood around the body to every cell. The blood picks up the waste carbon dioxide from the cells and carries it back to the lungs, where it is breathed out.",
      vnTranslation: "Giải thích cách phổi và máu cùng hoạt động để đưa oxy đến các tế bào của cơ thể.",
    },
    {
      id: "qa4",
      question: "You go for a run on a hot day and your body temperature starts to rise. Describe what your body does, and explain why this is an example of homeostasis.",
      suggestedWords: [["sweat"], ["cool", "skin"], ["steady", "normal"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the body sweats (and/or blood vessels in the skin widen).",
        "Explains that the sweat evaporating cools the skin, so body temperature falls.",
        "Explains that homeostasis means keeping an inside condition steady — the response pushes the temperature back to normal.",
      ],
      modelAnswer: "When my temperature rises, my body starts to sweat and more blood flows to my skin. As the sweat dries, it takes heat away and cools me down. This is homeostasis because the body detects a change, responds, and brings its temperature back to the normal level.",
      vnTranslation: "Bạn chạy bộ vào ngày nóng và nhiệt độ cơ thể bắt đầu tăng. Mô tả cơ thể bạn làm gì, và giải thích vì sao đây là ví dụ về cân bằng nội môi.",
    },
    {
      id: "qa5",
      question: "A man with a bad cold asks the doctor for antibiotics. The doctor says no. Explain why the doctor is right.",
      suggestedWords: [["virus"], ["bacteria"], ["resistant"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that a cold is caused by a virus, and antibiotics only kill bacteria, so they would not work.",
        "Gives a reason not to take them anyway (e.g. bacteria can become resistant, or side effects with no benefit).",
      ],
      modelAnswer: "A cold is caused by a virus, and antibiotics only kill bacteria, so the medicine would not help him at all. Taking antibiotics when they are not needed can also make bacteria resistant, so the medicine may not work later when he really needs it.",
      vnTranslation: "Một người đàn ông bị cảm nặng xin bác sĩ kháng sinh. Bác sĩ từ chối. Giải thích vì sao bác sĩ đúng.",
    },
  ],

  // Source Analysis: four authored SVGs — we own every number, so the answer
  // key is exact. 3 MCQ : 1 written.
  diagrams: [
    {
      id: "diag_1_cells",
      type: "mcq",
      inlineSvg: DIAGRAMS.CELLS,
      imageAlt: "A plant cell and an animal cell side by side. Both have a nucleus, mitochondria, a membrane and cytoplasm. Only the plant cell has a thick cell wall and green chloroplasts. A legend names each part by colour.",
      promptText: "Compare the two cells. Which TWO parts are in the plant cell but NOT in the animal cell?",
      options: [
        { val: "A", text: "Nucleus and mitochondria.", textVn: "Nhân và ty thể." },
        { val: "B", text: "Cell wall and chloroplasts.", textVn: "Thành tế bào và lục lạp." },
        { val: "C", text: "Membrane and cytoplasm.", textVn: "Màng và tế bào chất." },
        { val: "D", text: "Nucleus and cell wall.", textVn: "Nhân và thành tế bào." },
      ],
      correct: "B",
      marks: 1,
      expEn: "Look at what is drawn in each cell. Both have a purple nucleus, orange mitochondria, a membrane and cytoplasm. Only the plant cell has the thick green cell wall around the outside and the green chloroplasts inside.",
      expVn: "Hãy nhìn những gì được vẽ trong mỗi tế bào. Cả hai đều có nhân màu tím, ty thể màu cam, màng và tế bào chất. Chỉ tế bào thực vật có thành tế bào xanh dày bao ngoài và các lục lạp xanh bên trong.",
    },
    {
      id: "diag_2_heart_lungs",
      type: "mcq",
      inlineSvg: DIAGRAMS.HEART_LUNGS,
      imageAlt: "A flow diagram: heart in the middle, lungs above, body cells below. Blue arrows carry oxygen-poor blood from the body to the heart and from the heart to the lungs. Red arrows carry oxygen-rich blood from the lungs to the heart and from the heart to the body.",
      promptText: "Follow the arrows. Blood has just picked up oxygen in the lungs. Where does it go NEXT, and what colour is that arrow?",
      options: [
        { val: "A", text: "Straight to the body cells — blue arrow.", textVn: "Thẳng đến các tế bào cơ thể — mũi tên xanh." },
        { val: "B", text: "Back out into the air — blue arrow.", textVn: "Ra ngoài không khí — mũi tên xanh." },
        { val: "C", text: "Back to the heart — red arrow.", textVn: "Trở về tim — mũi tên đỏ." },
        { val: "D", text: "Straight to the body cells — red arrow.", textVn: "Thẳng đến các tế bào cơ thể — mũi tên đỏ." },
      ],
      correct: "C",
      marks: 1,
      expEn: "The red arrow leaving the lungs points down to the heart, not to the body. Oxygen-rich blood must return to the heart first so the heart can pump it out to the body. Blue arrows carry oxygen-poor blood, so A and B are wrong.",
      expVn: "Mũi tên đỏ rời phổi chỉ xuống tim, không phải đến cơ thể. Máu giàu oxy phải quay về tim trước để tim bơm nó đi khắp cơ thể. Mũi tên xanh chở máu nghèo oxy, nên A và B sai.",
    },
    {
      id: "diag_3_food_label",
      type: "mcq",
      inlineSvg: DIAGRAMS.FOOD_LABEL,
      imageAlt: "A table comparing one serving of Snack A (candy bar, 50 g) and Snack B (plain yogurt cup, 170 g): calories 250 vs 150; total fat 12 g vs 3 g; sugar 27 g vs 12 g; protein 3 g vs 12 g; calcium 2% vs 30% of the daily amount.",
      promptText: "Read the table. A doctor tells a patient to eat less sugar and more protein. Which statement is supported by the numbers?",
      options: [
        { val: "A", text: "Snack B has 15 g less sugar and 9 g more protein, so it fits the doctor's advice.", textVn: "Snack B có ít hơn 15 g đường và nhiều hơn 9 g protein, nên hợp lời khuyên của bác sĩ." },
        { val: "B", text: "Snack A has more protein, so it is the better choice.", textVn: "Snack A có nhiều protein hơn, nên là lựa chọn tốt hơn." },
        { val: "C", text: "Both snacks have the same amount of sugar.", textVn: "Cả hai món có lượng đường như nhau." },
        { val: "D", text: "Snack B has more calories because the serving is bigger.", textVn: "Snack B có nhiều calo hơn vì khẩu phần lớn hơn." },
      ],
      correct: "A",
      marks: 1,
      expEn: "Read across each row. Sugar: 27 g − 12 g = 15 g less in Snack B. Protein: 12 g − 3 g = 9 g more in Snack B. Snack B's serving is bigger (170 g) but it still has fewer calories (150 vs 250), so D is wrong.",
      expVn: "Đọc ngang từng hàng. Đường: 27 g − 12 g = Snack B ít hơn 15 g. Protein: 12 g − 3 g = Snack B nhiều hơn 9 g. Khẩu phần của Snack B lớn hơn (170 g) nhưng vẫn ít calo hơn (150 so với 250), nên D sai.",
    },
    {
      id: "diag_4_blood_sugar",
      inlineSvg: DIAGRAMS.BLOOD_SUGAR,
      imageAlt: "A line graph of blood sugar in mg/dL for 3 hours after a meal. It starts at 90, rises to 130 at half an hour, peaks at 140 at 1 hour, then falls to 120 at 1.5 hours, 100 at 2 hours and 90 at 3 hours.",
      promptText: "This graph shows a healthy person's blood sugar after a meal. Describe the TREND in the graph with numbers, then explain what the body did to bring the line back down and why this is an example of homeostasis.",
      suggestedWords: [["rises", "increases"], ["falls", "drops"], ["insulin"], ["steady", "normal"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Describes the rise: blood sugar goes up from 90 to a peak of about 140 mg/dL at around 1 hour after eating.",
        "Describes the fall: it then drops back to the starting level (about 90 mg/dL) by 3 hours.",
        "Explains that the body released insulin to move sugar out of the blood into cells, and that returning to the normal level is homeostasis (keeping an inside condition steady).",
      ],
      modelAnswer: "After the meal, blood sugar rises from 90 mg/dL to a peak of 140 mg/dL at one hour. It then falls steadily and is back at 90 mg/dL by three hours. The body brought it down by releasing insulin, which moves sugar from the blood into the cells. This is homeostasis because the body detected the change and responded to bring blood sugar back to its normal, steady level.",
      vnTranslation: "Biểu đồ này cho thấy đường huyết của một người khỏe mạnh sau bữa ăn. Mô tả XU HƯỚNG của biểu đồ bằng các con số, rồi giải thích cơ thể đã làm gì để đưa đường trở xuống và vì sao đây là ví dụ về cân bằng nội môi.",
    },
  ],

  assessment,
  notes,
};
