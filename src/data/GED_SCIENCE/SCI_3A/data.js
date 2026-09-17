// src/data/GED_SCIENCE/SCI_3A/data.js
// SCI_3A — Earth & Space Science. Earth and Space is about a fifth of the
// Science test and nearly every item hands the student a diagram or a graph,
// so every concept here rides on an authored SVG (diagrams.js). Content is
// re-levelled from Y9/SCIENCE_2A (tectonics) for an adult ESL reader, then
// widened to weather, climate, the water cycle, the solar system and seasons.
import { DIAGRAMS } from './diagrams.js';
import { notes } from './notes.js';
import { assessment } from './assessment.js';

export const GED_SCI_3A_DATA = {
  meta: {
    id: "SCI_3A",
    title: "Earth & Space Science",
    desc: "What is inside the Earth and why its plates move, weather versus climate, the water cycle, the solar system, and why the tilt — not the distance — gives us seasons.",
    track: "GED_SCIENCE",
    icon: "Globe",
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
    { word: "Crust", vn: "Lớp vỏ", def: "The thin, solid outer layer of the Earth, where we live.", vnDef: "Lớp ngoài cùng mỏng và rắn của Trái Đất, nơi chúng ta sinh sống.", sent: "The crust under the ocean is thinner than the crust under the land.", vnSent: "Lớp vỏ dưới đại dương mỏng hơn lớp vỏ dưới lục địa.", isReal: true },
    { word: "Mantle", vn: "Lớp phủ", def: "The very thick layer of hot rock under the crust; it flows very slowly.", vnDef: "Lớp đá nóng rất dày nằm dưới lớp vỏ; nó chảy rất chậm.", sent: "Heat from the core makes the rock in the mantle move slowly.", vnSent: "Nhiệt từ lõi làm đá trong lớp phủ chuyển động chậm.", isReal: true },
    { word: "Core", vn: "Lõi", def: "The very hot centre of the Earth, made mostly of iron.", vnDef: "Trung tâm rất nóng của Trái Đất, chủ yếu là sắt.", sent: "The outer core is liquid, but the inner core is solid.", vnSent: "Lõi ngoài ở thể lỏng, nhưng lõi trong ở thể rắn.", isReal: true },
    { word: "Plate", vn: "Mảng kiến tạo", def: "One of the large pieces of the Earth's crust that moves very slowly.", vnDef: "Một trong những mảnh lớn của lớp vỏ Trái Đất, chuyển động rất chậm.", sent: "The plates move only a few centimetres each year.", vnSent: "Các mảng chỉ dịch chuyển vài centimet mỗi năm.", isReal: true },
    { word: "Boundary", vn: "Ranh giới", def: "The line where two plates meet.", vnDef: "Đường nơi hai mảng gặp nhau.", sent: "Most earthquakes happen at a plate boundary.", vnSent: "Hầu hết động đất xảy ra tại ranh giới mảng.", isReal: true },
    { word: "Erosion", vn: "Xói mòn", def: "The carrying away of broken rock and soil by water, wind or ice.", vnDef: "Sự cuốn trôi đá vụn và đất do nước, gió hoặc băng.", sent: "Heavy rain caused erosion on the hillside.", vnSent: "Mưa lớn gây xói mòn trên sườn đồi.", isReal: true },
    { word: "Climate", vn: "Khí hậu", def: "The usual weather of a place, averaged over many years.", vnDef: "Thời tiết thường thấy của một nơi, tính trung bình qua nhiều năm.", sent: "Vietnam has a hot, wet climate.", vnSent: "Việt Nam có khí hậu nóng và ẩm ướt.", isReal: true },
    { word: "Evaporation", vn: "Sự bay hơi", def: "When liquid water turns into water vapour (a gas) and rises into the air.", vnDef: "Khi nước lỏng biến thành hơi nước (thể khí) và bay lên không khí.", sent: "The sun's heat causes evaporation from the sea.", vnSent: "Sức nóng của mặt trời gây ra sự bay hơi từ biển.", isReal: true },
    { word: "Orbit", vn: "Quỹ đạo", def: "The path an object follows around a star or a planet.", vnDef: "Đường đi của một vật thể quanh một ngôi sao hoặc hành tinh.", sent: "Earth takes one year to complete its orbit around the Sun.", vnSent: "Trái Đất mất một năm để đi hết quỹ đạo quanh Mặt Trời.", isReal: true },
    { word: "Axis", vn: "Trục", def: "The imaginary line through the middle of the Earth that it spins around.", vnDef: "Đường tưởng tượng xuyên qua tâm Trái Đất mà nó tự quay quanh.", sent: "Earth's axis is tilted, and that tilt gives us the seasons.", vnSent: "Trục Trái Đất nghiêng, và độ nghiêng đó tạo ra các mùa.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "Inside the Earth and the Moving Plates",
      vnTitle: "Bên trong Trái Đất và các Mảng chuyển động",
      meta: "Earth's structure",
      text: [
        "The Earth has four layers. We live on the crust, a thin layer of solid rock. Under the crust is the {mantle}, a very thick layer of hot rock that flows slowly, like thick honey. At the centre is the {core}: the outer core is liquid metal, and the inner core is solid metal. It gets hotter the deeper you go.",
        "The crust is not one piece. It is broken into large {plates} that float on the slowly moving mantle. Heat from the core makes the mantle rock rise, cool and sink in a circle. This slow movement carries the plates a few centimetres each year — about as fast as your fingernails grow.",
        "Scientists know the plates move because the coastlines of Africa and South America fit together like puzzle pieces, and the same fossils are found on both sides of the ocean. Where two plates meet is called a {boundary}. Most earthquakes and volcanoes happen there.",
      ].join(" "),
      vnText: [
        "Trái Đất có bốn lớp. Chúng ta sống trên lớp vỏ, một lớp đá rắn mỏng. Dưới lớp vỏ là lớp phủ, một lớp đá nóng rất dày, chảy chậm như mật ong đặc. Ở trung tâm là lõi: lõi ngoài là kim loại lỏng, còn lõi trong là kim loại rắn. Càng xuống sâu, nhiệt độ càng cao.",
        "Lớp vỏ không phải là một khối liền. Nó bị vỡ thành các mảng lớn trôi trên lớp phủ đang chuyển động chậm. Nhiệt từ lõi làm đá trong lớp phủ dâng lên, nguội đi rồi chìm xuống theo một vòng tròn. Chuyển động chậm này mang các mảng đi vài centimet mỗi năm — nhanh khoảng bằng tốc độ móng tay bạn mọc.",
        "Các nhà khoa học biết các mảng chuyển động vì đường bờ biển của châu Phi và Nam Mỹ khớp với nhau như các mảnh ghép, và những hóa thạch giống nhau được tìm thấy ở cả hai bên đại dương. Nơi hai mảng gặp nhau gọi là ranh giới. Hầu hết động đất và núi lửa xảy ra ở đó.",
      ].join(" "),
      glossary: {
        "mantle": { vn: "Lớp phủ", def: "The thick layer of hot, slow-flowing rock under the crust." },
        "core": { vn: "Lõi", def: "The very hot centre of the Earth, mostly iron." },
        "plates": { vn: "Các mảng kiến tạo", def: "The large pieces of crust that move slowly." },
        "boundary": { vn: "Ranh giới", def: "The line where two plates meet." },
      },
    },
    {
      id: "passage_2",
      title: "Weather, Climate and the Water Cycle",
      vnTitle: "Thời tiết, Khí hậu và Vòng tuần hoàn Nước",
      meta: "Weather and climate",
      text: [
        "Weather is what the air is doing right now: the temperature, the wind, the clouds and the rain. The sun drives all weather. It heats the ground and the sea unevenly, so warm air rises and cooler air moves in to take its place. That moving air is wind. Where a mass of warm air meets a mass of cold air, we call the line between them a front, and fronts often bring rain or storms.",
        "{Climate} is different. It is the average weather of a place over many years. One cold day does not change the climate; a change in the average over thirty years does.",
        "Rain is part of the water cycle. Heat from the sun causes {evaporation}: liquid water from the sea turns into water vapour and rises. High up, the vapour cools and condenses into tiny drops that form clouds. When the drops grow heavy, they fall as precipitation — rain or snow. Water then runs off the land back to rivers and the sea. This runoff carries soil and small rocks with it, which is one cause of {erosion}.",
      ].join(" "),
      vnText: [
        "Thời tiết là những gì đang diễn ra trong không khí ngay lúc này: nhiệt độ, gió, mây và mưa. Mặt trời điều khiển mọi hiện tượng thời tiết. Nó làm nóng mặt đất và mặt biển không đều, nên không khí ấm bốc lên và không khí mát hơn tràn vào thế chỗ. Luồng không khí chuyển động đó chính là gió. Nơi một khối không khí ấm gặp một khối không khí lạnh, ta gọi đường ranh giữa chúng là front, và front thường mang theo mưa hoặc bão.",
        "Khí hậu thì khác. Đó là thời tiết trung bình của một nơi qua nhiều năm. Một ngày lạnh không làm thay đổi khí hậu; một sự thay đổi của mức trung bình qua ba mươi năm thì có.",
        "Mưa là một phần của vòng tuần hoàn nước. Sức nóng của mặt trời gây ra sự bay hơi: nước lỏng từ biển biến thành hơi nước và bay lên. Trên cao, hơi nước nguội đi và ngưng tụ thành những giọt li ti tạo thành mây. Khi các giọt lớn dần và nặng, chúng rơi xuống thành giáng thủy — mưa hoặc tuyết. Sau đó nước chảy tràn trên mặt đất trở về sông và biển. Dòng chảy tràn này cuốn theo đất và đá nhỏ, và đó là một nguyên nhân gây xói mòn.",
      ].join(" "),
      glossary: {
        "climate": { vn: "Khí hậu", def: "The average weather of a place over many years." },
        "evaporation": { vn: "Sự bay hơi", def: "Liquid water turning into water vapour and rising." },
        "erosion": { vn: "Xói mòn", def: "Broken rock and soil being carried away by water, wind or ice." },
      },
    },
    {
      id: "passage_3",
      title: "Earth in Space",
      vnTitle: "Trái Đất trong Không gian",
      meta: "The solar system and the seasons",
      text: [
        "The Sun is a star — a huge ball of hot gas that gives off light and heat. Eight planets travel around it, held by its gravity. In order from the Sun they are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Earth is the third planet. It is the only one known to have life, because it is the right distance from the Sun for liquid water to exist, and it has an atmosphere that protects us.",
        "Each planet follows a path called an {orbit}. Earth takes one year to travel once around the Sun. At the same time, Earth spins around an imaginary line through its centre called its {axis}. One full spin takes 24 hours and gives us day and night.",
        "Earth's axis is tilted. For half the year the northern half of Earth leans toward the Sun, gets more direct sunlight and longer days, and has summer. Six months later it leans away and has winter. The seasons are caused by this tilt, not by Earth being closer to or farther from the Sun.",
      ].join(" "),
      vnText: [
        "Mặt Trời là một ngôi sao — một quả cầu khí nóng khổng lồ tỏa ra ánh sáng và nhiệt. Tám hành tinh chuyển động quanh nó, được giữ lại bởi lực hấp dẫn của nó. Theo thứ tự từ Mặt Trời ra, đó là Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa, Sao Mộc, Sao Thổ, Sao Thiên Vương và Sao Hải Vương. Trái Đất là hành tinh thứ ba. Đó là hành tinh duy nhất được biết là có sự sống, vì nó ở khoảng cách vừa đủ so với Mặt Trời để nước lỏng tồn tại, và có bầu khí quyển bảo vệ chúng ta.",
        "Mỗi hành tinh đi theo một đường gọi là quỹ đạo. Trái Đất mất một năm để đi hết một vòng quanh Mặt Trời. Đồng thời, Trái Đất tự quay quanh một đường tưởng tượng xuyên qua tâm của nó gọi là trục. Một vòng quay trọn vẹn mất 24 giờ và tạo ra ngày và đêm.",
        "Trục Trái Đất nghiêng. Trong nửa năm, nửa phía bắc của Trái Đất nghiêng về phía Mặt Trời, nhận ánh sáng trực tiếp hơn và ngày dài hơn, nên có mùa hè. Sáu tháng sau, nó nghiêng ra xa và có mùa đông. Các mùa là do độ nghiêng này, không phải do Trái Đất ở gần hay xa Mặt Trời hơn.",
      ].join(" "),
      glossary: {
        "orbit": { vn: "Quỹ đạo", def: "The path a planet follows around the Sun." },
        "axis": { vn: "Trục", def: "The imaginary line through Earth's centre that it spins around." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "The plates are made of solid rock. Explain why they still move.",
      suggestedWords: [["mantle"], ["convection", "current"], ["slowly", "few centimetres"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that heat from the core makes the rock in the mantle rise, cool and sink (flow slowly / convection).",
        "States that the plates sit on the mantle and are carried along by this slow movement.",
      ],
      modelAnswer: "The plates sit on top of the mantle. Heat from the core makes the hot rock in the mantle rise, cool and sink in a slow circle. The plates float on this moving rock, so they are carried along with it, a few centimetres every year.",
      vnTranslation: "Các mảng được tạo bởi đá rắn. Hãy giải thích vì sao chúng vẫn chuyển động.",
    },
    {
      id: "qa2",
      question: "Two plates push into each other. Name this type of boundary and give two things it can create.",
      suggestedWords: [["collide", "push together"], ["crust"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Names it a convergent boundary.",
        "Gives one feature it creates: mountains, volcanoes or earthquakes.",
        "Gives a second, different feature from that list.",
      ],
      modelAnswer: "When two plates push into each other it is a convergent boundary. The crust is squeezed and pushed up, so it can create mountains. It also causes earthquakes, and where one plate is pushed down and melts, volcanoes can form.",
      vnTranslation: "Hai mảng đẩy vào nhau. Hãy gọi tên loại ranh giới này và nêu hai thứ nó có thể tạo ra.",
    },
    {
      id: "qa3",
      question: "A friend says, \"It is summer when Earth is closer to the Sun.\" Explain why this is wrong, and what really causes the seasons.",
      suggestedWords: [["axis"], ["direct sunlight", "longer days"], ["northern half", "hemisphere"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the seasons are caused by the tilt of Earth's axis, not by distance from the Sun.",
        "Explains that the half of Earth tilted toward the Sun gets more direct sunlight and longer days, so it has summer.",
        "Explains that the half tilted away gets less direct sunlight (shorter days), so it has winter — or notes that the distance to the Sun hardly changes.",
      ],
      modelAnswer: "The friend is wrong because Earth's distance from the Sun hardly changes during the year. The seasons come from the tilt of Earth's axis. When the northern half leans toward the Sun, it gets more direct sunlight and longer days, so it is summer there. Six months later it leans away, gets weaker sunlight and shorter days, and it is winter.",
      vnTranslation: "Một người bạn nói: \"Mùa hè là khi Trái Đất ở gần Mặt Trời hơn.\" Hãy giải thích vì sao điều này sai, và điều gì thực sự tạo ra các mùa.",
    },
    {
      id: "qa4",
      question: "Describe the water cycle. Explain what happens at each of its three main stages: evaporation, condensation and precipitation.",
      suggestedWords: [["water vapour", "gas"], ["clouds"], ["sun", "heat"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Evaporation: heat from the sun turns liquid water into water vapour, which rises.",
        "Condensation: high up, the vapour cools and turns back into tiny drops of liquid water, forming clouds.",
        "Precipitation: the drops grow heavy and fall as rain or snow (and water returns to rivers and the sea).",
      ],
      modelAnswer: "First, heat from the sun causes evaporation: liquid water from the sea and lakes turns into water vapour and rises into the air. Second, high in the sky the vapour cools and condenses into tiny drops of water, which form clouds. Third, when the drops become heavy they fall as precipitation, which is rain or snow. The water then runs back to rivers and the sea, and the cycle starts again.",
      vnTranslation: "Hãy mô tả vòng tuần hoàn nước. Giải thích điều gì xảy ra ở mỗi giai đoạn trong ba giai đoạn chính: bay hơi, ngưng tụ và giáng thủy.",
    },
    {
      id: "qa5",
      question: "Explain how burning fossil fuels such as coal and petrol can make the Earth warmer.",
      suggestedWords: [["atmosphere"], ["greenhouse gas"], ["release", "give off"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that burning fossil fuels releases carbon dioxide into the atmosphere.",
        "Explains that carbon dioxide traps heat from the sun (the greenhouse effect), so more of it means the Earth warms.",
      ],
      modelAnswer: "When coal, petrol or gas is burned, it releases carbon dioxide into the atmosphere. Carbon dioxide is a greenhouse gas: it lets sunlight in but traps some of the heat that would otherwise escape back into space. The more carbon dioxide there is in the air, the more heat is trapped, so the Earth's average temperature rises.",
      vnTranslation: "Hãy giải thích vì sao việc đốt nhiên liệu hóa thạch như than và xăng có thể làm Trái Đất nóng lên.",
    },
  ],

  // Source Analysis: four authored SVGs (layers, boundaries, water cycle, a
  // temperature graph with numbers we own). 3 MCQ : 1 written.
  diagrams: [
    {
      id: "diag_1_earth_layers",
      type: "mcq",
      inlineSvg: DIAGRAMS.EARTH_LAYERS,
      imageAlt: "A cutaway of the Earth showing four layers from the outside in: a thin crust, a thick mantle, a liquid outer core and a solid inner core.",
      promptText: "This diagram shows a slice through the Earth. Which statement is SUPPORTED by the diagram?",
      options: [
        { val: "A", text: "The crust is the thinnest of the four layers.", textVn: "Lớp vỏ là lớp mỏng nhất trong bốn lớp." },
        { val: "B", text: "The inner core is the largest layer.", textVn: "Lõi trong là lớp lớn nhất." },
        { val: "C", text: "The mantle is the outside layer that we live on.", textVn: "Lớp phủ là lớp ngoài cùng mà chúng ta sống trên đó." },
        { val: "D", text: "The outer core is made of solid rock.", textVn: "Lõi ngoài được tạo bởi đá rắn." },
      ],
      correct: "A",
      marks: 1,
      expEn: "Read the labels from the outside in. The crust is drawn as a very thin band and labelled 'thin, solid rock — we live here'. The mantle is the thickest layer, the inner core is the smallest, and the outer core is labelled liquid iron.",
      expVn: "Hãy đọc nhãn từ ngoài vào trong. Lớp vỏ được vẽ như một dải rất mỏng và ghi 'đá rắn, mỏng — chúng ta sống ở đây'. Lớp phủ là lớp dày nhất, lõi trong là lớp nhỏ nhất, còn lõi ngoài được ghi là sắt lỏng.",
    },
    {
      id: "diag_2_plate_boundaries",
      type: "mcq",
      inlineSvg: DIAGRAMS.PLATE_BOUNDARIES,
      imageAlt: "Three panels: divergent (plates pull apart, magma rises, makes a mid-ocean ridge and new crust), convergent (plates push together, makes mountains, volcanoes and earthquakes), transform (plates slide past, makes earthquakes, no new crust).",
      promptText: "In the middle of the Atlantic Ocean, the sea floor is slowly spreading apart along a long underwater ridge, and new rock forms in the gap. Which type of boundary is this, and why?",
      options: [
        { val: "A", text: "Transform — the plates are sliding past each other.", textVn: "Chuyển dạng — các mảng trượt qua nhau." },
        { val: "B", text: "Convergent — the plates are pushing together to make mountains.", textVn: "Hội tụ — các mảng đẩy vào nhau tạo thành núi." },
        { val: "C", text: "Divergent — the plates are pulling apart, so magma rises and makes new crust.", textVn: "Phân kỳ — các mảng tách xa nhau, nên magma dâng lên và tạo lớp vỏ mới." },
        { val: "D", text: "None of them — the sea floor cannot move.", textVn: "Không loại nào — đáy biển không thể chuyển động." },
      ],
      correct: "C",
      marks: 1,
      expEn: "Match the clues to the panels. 'Spreading apart' and 'new rock forms' are exactly what the divergent panel shows: arrows pointing away from each other, magma rising into the gap, and the labels 'mid-ocean ridge' and 'new crust'.",
      expVn: "Hãy khớp các manh mối với từng ô. 'Tách xa nhau' và 'đá mới hình thành' chính là những gì ô phân kỳ cho thấy: các mũi tên hướng ra xa nhau, magma dâng lên vào khe hở, và nhãn 'sống núi giữa đại dương' cùng 'lớp vỏ mới'.",
    },
    {
      id: "diag_3_water_cycle",
      type: "mcq",
      inlineSvg: DIAGRAMS.WATER_CYCLE,
      imageAlt: "The water cycle: the sun heats the sea (1 evaporation, vapour rises), the vapour cools into a cloud (2 condensation), rain falls on the land (3 precipitation), and water runs back to the sea (4 runoff).",
      promptText: "Look at stage 2 in the diagram. What is happening to the water at this stage?",
      options: [
        { val: "A", text: "Liquid water is being heated and turning into a gas.", textVn: "Nước lỏng đang được làm nóng và biến thành khí." },
        { val: "B", text: "Water vapour is cooling and turning into tiny liquid drops that form a cloud.", textVn: "Hơi nước đang nguội đi và biến thành những giọt lỏng li ti tạo thành mây." },
        { val: "C", text: "Rain is falling onto the land.", textVn: "Mưa đang rơi xuống mặt đất." },
        { val: "D", text: "Water is flowing downhill back to the sea.", textVn: "Nước đang chảy xuống dốc trở về biển." },
      ],
      correct: "B",
      marks: 1,
      expEn: "Stage 2 is labelled 'Condensation — vapour cools into drops' and sits at the cloud. Heating water into a gas is stage 1 (evaporation), rain is stage 3 (precipitation), and flowing back to the sea is stage 4 (runoff).",
      expVn: "Giai đoạn 2 được ghi 'Ngưng tụ — hơi nước nguội thành giọt' và nằm ở đám mây. Làm nóng nước thành khí là giai đoạn 1 (bay hơi), mưa là giai đoạn 3 (giáng thủy), và chảy về biển là giai đoạn 4 (chảy tràn).",
    },
    {
      id: "diag_4_global_temp",
      inlineSvg: DIAGRAMS.GLOBAL_TEMP,
      imageAlt: "A line graph of global average temperature change since 1900, in degrees Celsius above the 1900 average: 0.0 in 1900 and 1920, 0.2 in 1940 and 1960, 0.4 in 1980, 0.7 in 2000 and 1.1 in 2020.",
      promptText: "This graph shows how much warmer the Earth's average temperature was in each year, compared with 1900. Describe the overall TREND, use two numbers from the graph to support it, and explain what scientists say is causing the change.",
      suggestedWords: [["trend", "overall"], ["degrees", "°C"], ["greenhouse", "carbon dioxide"], ["fossil fuels"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Reads the trend: the temperature has risen over the whole period, and the rise is faster after about 1980.",
        "Supports it with two correct values from the graph, e.g. 0.0 °C in 1900 and 1.1 °C in 2020 (or 0.4 °C in 1980 to 1.1 °C in 2020, a rise of 0.7 °C in 40 years).",
        "Explains the cause: burning fossil fuels adds carbon dioxide (a greenhouse gas) to the atmosphere, which traps heat.",
      ],
      modelAnswer: "The overall trend is upward: the Earth has become warmer since 1900, and the line climbs faster after about 1980. In 1900 the value was 0.0 °C, and by 2020 it was 1.1 °C above the 1900 average. Between 1980 and 2020 alone it rose from 0.4 °C to 1.1 °C, a rise of 0.7 °C in forty years. Scientists explain this by the greenhouse effect: burning fossil fuels such as coal and petrol releases carbon dioxide, which traps heat in the atmosphere, so the Earth's average temperature rises.",
      vnTranslation: "Biểu đồ này cho thấy nhiệt độ trung bình của Trái Đất mỗi năm ấm hơn bao nhiêu so với năm 1900. Hãy mô tả XU HƯỚNG chung, dùng hai con số trên biểu đồ để chứng minh, và giải thích các nhà khoa học nói điều gì gây ra sự thay đổi này.",
    },
  ],

  assessment,
  notes,
};
