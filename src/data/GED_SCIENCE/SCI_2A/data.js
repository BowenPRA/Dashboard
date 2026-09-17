// src/data/GED_SCIENCE/SCI_2A/data.js
// SCI_2A — Matter, Atoms & Chemical Reactions. Physical Science is 40% of the
// Science test, and it is tested the same way as everything else: read a
// passage, a table or a chart and reason from it. So every task here hands the
// student a source — a heating curve, a particle picture, a pH scale, a rate
// experiment — and asks what it shows. Maths stays at one step (count atoms,
// read a value off a table).
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_SCI_2A_DATA = {
  meta: {
    id: "SCI_2A",
    title: "Matter, Atoms & Chemical Reactions",
    desc: "The particle picture of solids, liquids and gases; atoms, elements, compounds and mixtures; physical vs chemical change; conservation of mass; what speeds a reaction up; and acids, bases and the pH scale — all read from charts and tables.",
    track: "GED_SCIENCE",
    icon: "Atom",
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
    { word: "Matter", vn: "Vật chất", def: "Anything that takes up space and has mass — every solid, liquid and gas.", vnDef: "Bất cứ thứ gì chiếm chỗ trong không gian và có khối lượng — mọi chất rắn, lỏng và khí.", sent: "Air is matter, even though you cannot see it.", vnSent: "Không khí là vật chất, dù bạn không nhìn thấy nó.", isReal: true },
    { word: "Particle", vn: "Hạt", def: "One of the tiny pieces that all matter is made of.", vnDef: "Một trong những mảnh cực nhỏ tạo nên mọi vật chất.", sent: "In a gas, each particle moves fast and far from the others.", vnSent: "Trong chất khí, mỗi hạt chuyển động nhanh và cách xa các hạt khác.", isReal: true },
    { word: "Atom", vn: "Nguyên tử", def: "The smallest piece of an element that is still that element.", vnDef: "Phần nhỏ nhất của một nguyên tố mà vẫn còn là nguyên tố đó.", sent: "A water molecule is made of three atoms.", vnSent: "Một phân tử nước được tạo thành từ ba nguyên tử.", isReal: true },
    { word: "Element", vn: "Nguyên tố", def: "A substance made of only one kind of atom; it cannot be broken into anything simpler.", vnDef: "Một chất chỉ gồm một loại nguyên tử; không thể tách thành thứ gì đơn giản hơn.", sent: "Oxygen and iron are elements.", vnSent: "Oxy và sắt là các nguyên tố.", isReal: true },
    { word: "Compound", vn: "Hợp chất", def: "A substance made of two or more elements joined together in a fixed way.", vnDef: "Một chất được tạo thành từ hai hay nhiều nguyên tố liên kết với nhau theo cách cố định.", sent: "Water is a compound of hydrogen and oxygen.", vnSent: "Nước là hợp chất của hydro và oxy.", isReal: true },
    { word: "Mixture", vn: "Hỗn hợp", def: "Two or more substances together that are not joined and can be separated again.", vnDef: "Hai hay nhiều chất ở cùng nhau nhưng không liên kết và có thể tách ra lại.", sent: "Salt water is a mixture, because you can boil the water away and get the salt back.", vnSent: "Nước muối là hỗn hợp, vì bạn có thể đun cạn nước và lấy lại muối.", isReal: true },
    { word: "Reaction", vn: "Phản ứng", def: "A change in which atoms rearrange to make new substances.", vnDef: "Một biến đổi trong đó các nguyên tử sắp xếp lại để tạo ra chất mới.", sent: "Rusting is a slow reaction between iron and oxygen.", vnSent: "Gỉ sét là một phản ứng chậm giữa sắt và oxy.", isReal: true },
    { word: "Conservation", vn: "Bảo toàn", def: "Staying the same in total — in a reaction, the total mass before equals the total mass after.", vnDef: "Tổng số không đổi — trong phản ứng, tổng khối lượng trước bằng tổng khối lượng sau.", sent: "Conservation of mass means no atoms are created or destroyed.", vnSent: "Bảo toàn khối lượng nghĩa là không có nguyên tử nào được tạo ra hay mất đi.", isReal: true },
    { word: "Solution", vn: "Dung dịch", def: "A mixture made when one substance dissolves evenly in another, usually in water.", vnDef: "Hỗn hợp tạo ra khi một chất tan đều vào chất khác, thường là nước.", sent: "Stir sugar into tea and you get a solution.", vnSent: "Khuấy đường vào trà, bạn được một dung dịch.", isReal: true },
    { word: "Acid", vn: "Axit", def: "A substance with a pH below 7; it tastes sour and can react with metals.", vnDef: "Chất có pH dưới 7; có vị chua và có thể phản ứng với kim loại.", sent: "Vinegar is a weak acid with a pH of about 3.", vnSent: "Giấm là một axit yếu có pH khoảng 3.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "Solid, Liquid, Gas",
      vnTitle: "Rắn, Lỏng, Khí",
      meta: "The particle picture",
      text: [
        "Everything around you is {matter}: the chair, the water in a glass, the air in the room. All matter is made of tiny particles that are always moving.",
        "In a solid, the particles are packed in a fixed pattern. They vibrate, but they cannot move past each other, so a solid keeps its shape. In a liquid, the particles are still close, but each {particle} can slide past its neighbours. That is why a liquid takes the shape of its container. In a gas, the particles are far apart and move fast in every direction, so a gas spreads out to fill any space.",
        "Heating gives the particles more energy. When ice reaches 0 °C it melts into water; when water reaches 100 °C it boils into steam. While a substance is melting or boiling, its temperature stays the same — the energy is being used to break the particles apart, not to make them hotter. Cooling does the reverse: steam condenses to water, and water freezes to ice.",
      ].join(" "),
      vnText: [
        "Mọi thứ quanh bạn đều là vật chất: cái ghế, nước trong cốc, không khí trong phòng. Mọi vật chất đều được tạo thành từ những hạt cực nhỏ luôn chuyển động.",
        "Trong chất rắn, các hạt xếp chặt theo một trật tự cố định. Chúng rung nhưng không thể vượt qua nhau, nên chất rắn giữ nguyên hình dạng. Trong chất lỏng, các hạt vẫn ở gần nhau, nhưng mỗi hạt có thể trượt qua hạt bên cạnh. Vì thế chất lỏng có hình dạng của vật chứa. Trong chất khí, các hạt cách xa nhau và chuyển động nhanh theo mọi hướng, nên chất khí lan ra chiếm đầy mọi không gian.",
        "Đun nóng làm các hạt có thêm năng lượng. Khi nước đá đạt 0 °C, nó tan thành nước; khi nước đạt 100 °C, nó sôi thành hơi. Trong lúc một chất đang tan chảy hoặc đang sôi, nhiệt độ của nó giữ nguyên — năng lượng được dùng để tách các hạt ra, chứ không làm chúng nóng hơn. Làm lạnh thì ngược lại: hơi nước ngưng tụ thành nước, và nước đông thành đá.",
      ].join(" "),
      glossary: {
        "vibrate": { vn: "Rung", def: "To shake back and forth quickly in one place." },
        "condenses": { vn: "Ngưng tụ", def: "Changes from a gas back into a liquid." },
      },
    },
    {
      id: "passage_2",
      title: "Atoms, Elements, Compounds and Mixtures",
      vnTitle: "Nguyên tử, Nguyên tố, Hợp chất và Hỗn hợp",
      meta: "What things are made of",
      text: [
        "All matter is built from atoms. An {atom} is the smallest piece of a substance that still acts like that substance. There are about 100 different kinds of atom, and each kind is called an {element}. Gold, oxygen, carbon and iron are all elements. An element cannot be broken down into anything simpler.",
        "When atoms of different elements join together in a fixed pattern, they make a {compound}. Water is a compound: every water molecule has two hydrogen atoms joined to one oxygen atom, written H₂O. A compound behaves very differently from the elements in it — hydrogen and oxygen are both gases that burn, but water puts fires out.",
        "A {mixture} is different again. In a mixture the substances are together but not joined, so they keep their own properties and can be separated. Salt water is a mixture: boil off the water and the salt is left behind. Air is a mixture of gases, and a salad is a mixture of vegetables.",
      ].join(" "),
      vnText: [
        "Mọi vật chất đều được xây từ nguyên tử. Nguyên tử là phần nhỏ nhất của một chất mà vẫn hoạt động như chất đó. Có khoảng 100 loại nguyên tử khác nhau, và mỗi loại được gọi là một nguyên tố. Vàng, oxy, carbon và sắt đều là nguyên tố. Một nguyên tố không thể bị phân tách thành thứ gì đơn giản hơn.",
        "Khi nguyên tử của các nguyên tố khác nhau liên kết với nhau theo một trật tự cố định, chúng tạo thành hợp chất. Nước là một hợp chất: mỗi phân tử nước có hai nguyên tử hydro liên kết với một nguyên tử oxy, viết là H₂O. Hợp chất có tính chất rất khác các nguyên tố tạo nên nó — hydro và oxy đều là khí dễ cháy, nhưng nước lại dập tắt lửa.",
        "Hỗn hợp lại khác nữa. Trong hỗn hợp, các chất ở cùng nhau nhưng không liên kết, nên chúng giữ tính chất riêng và có thể tách ra. Nước muối là hỗn hợp: đun cạn nước thì muối còn lại. Không khí là hỗn hợp của các chất khí, và món salad là hỗn hợp của các loại rau.",
      ].join(" "),
      glossary: {
        "molecule": { vn: "Phân tử", def: "A group of atoms joined together." },
        "properties": { vn: "Tính chất", def: "The features of a substance, such as colour, hardness or boiling point." },
      },
    },
    {
      id: "passage_3",
      title: "A Reaction in a Closed Jar",
      vnTitle: "Phản ứng trong Lọ Kín",
      meta: "An experiment description",
      text: [
        "A student wants to test whether a chemical {reaction} changes the total mass. She puts a small cup of vinegar, which is a weak {acid}, inside a jar. Next to the cup she places a spoon of baking soda. She screws the lid on tightly and weighs the whole jar: 250 grams.",
        "Then she tips the jar so the baking soda falls into the vinegar. The mixture fizzes and bubbles of carbon dioxide gas form. New substances have been made, so this is a chemical change, not a physical one. When the fizzing stops, she weighs the jar again. It still reads 250 grams.",
        "This is the law of {conservation} of mass: in a chemical reaction, atoms are rearranged but none are created or destroyed, so the mass stays the same. The student then loosens the lid. The gas escapes, and now the jar weighs 249 grams. The mass did not disappear — it left the jar as gas. A fair test of conservation must keep the container closed.",
      ].join(" "),
      vnText: [
        "Một học sinh muốn kiểm tra xem phản ứng hóa học có làm thay đổi tổng khối lượng không. Cô đặt một cốc nhỏ giấm — một axit yếu — vào trong lọ. Cạnh cốc, cô đặt một thìa baking soda. Cô vặn chặt nắp và cân cả lọ: 250 gam.",
        "Sau đó cô nghiêng lọ để baking soda rơi vào giấm. Hỗn hợp sủi bọt và các bọt khí carbon dioxide hình thành. Chất mới đã được tạo ra, nên đây là biến đổi hóa học, không phải vật lý. Khi hết sủi bọt, cô cân lọ lần nữa. Cân vẫn chỉ 250 gam.",
        "Đây là định luật bảo toàn khối lượng: trong phản ứng hóa học, các nguyên tử được sắp xếp lại nhưng không có nguyên tử nào được tạo ra hay mất đi, nên khối lượng giữ nguyên. Sau đó học sinh nới lỏng nắp. Khí thoát ra, và bây giờ lọ nặng 249 gam. Khối lượng không biến mất — nó rời khỏi lọ dưới dạng khí. Một thí nghiệm công bằng về bảo toàn phải giữ vật chứa đóng kín.",
      ].join(" "),
      glossary: {
        "fizzes": { vn: "Sủi bọt", def: "Makes many small bubbles of gas." },
        "rearranged": { vn: "Sắp xếp lại", def: "Put together in a new order." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "Use the particle picture to explain why a solid keeps its shape but a gas spreads out to fill its container.",
      suggestedWords: [["particles"], ["vibrate", "fixed"], ["far apart", "move freely"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that in a solid the particles are held in a fixed pattern and only vibrate, so they cannot move past each other.",
        "States that in a gas the particles are far apart and move fast in all directions, so they spread out.",
      ],
      modelAnswer: "In a solid the particles are packed in a fixed pattern. They vibrate in place but cannot move past each other, so the solid keeps its shape. In a gas the particles are far apart and move quickly in every direction, so they spread out until they fill the whole container.",
      vnTranslation: "Dùng mô hình hạt để giải thích vì sao chất rắn giữ nguyên hình dạng còn chất khí lan ra chiếm đầy vật chứa.",
    },
    {
      id: "qa2",
      question: "Water (H₂O) is a compound and salt water is a mixture. Explain the difference.",
      suggestedWords: [["atoms"], ["joined", "bonded"], ["separated"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that in a compound the atoms of different elements are joined together in a fixed pattern (e.g. 2 H to 1 O) and cannot be separated by simple methods.",
        "States that in a mixture the substances are not joined, keep their own properties, and can be separated (e.g. boiling off the water leaves the salt).",
      ],
      modelAnswer: "Water is a compound because its atoms are joined: every molecule has two hydrogen atoms bonded to one oxygen atom, and you cannot pull them apart by simple means. Salt water is a mixture because the salt and the water are together but not joined. Each keeps its own properties, and you can separate them by boiling the water away.",
      vnTranslation: "Nước (H₂O) là hợp chất còn nước muối là hỗn hợp. Hãy giải thích sự khác biệt.",
    },
    {
      id: "qa3",
      question: "A student burns a piece of paper and says it is a chemical change. Give two signs that support this, and explain why melting ice is NOT a chemical change.",
      suggestedWords: [["new substance"], ["ash", "smoke", "light"], ["state", "same substance"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Gives one sign of a chemical change seen when paper burns (e.g. light or heat given out, a new substance such as ash or smoke forms, the change cannot be undone).",
        "Gives a second, different sign of a chemical change.",
        "Explains that melting ice is a physical change because it is still water — only the state changed, no new substance formed, and it can be reversed by freezing.",
      ],
      modelAnswer: "Burning paper gives out heat and light, and it makes new substances — ash and smoke — that you cannot turn back into paper. Those are signs of a chemical change. Melting ice is different: the ice becomes liquid water, but it is still the same substance. Only the state changed, nothing new was made, and you can freeze it back, so it is a physical change.",
      vnTranslation: "Một học sinh đốt một tờ giấy và nói đó là biến đổi hóa học. Nêu hai dấu hiệu ủng hộ điều này, và giải thích vì sao nước đá tan KHÔNG phải biến đổi hóa học.",
    },
    {
      id: "qa4",
      question: "Baking soda and vinegar react inside a sealed jar. The jar weighs the same before and after. Explain why, and say what would happen to the reading if the lid were opened.",
      suggestedWords: [["atoms", "rearranged"], ["gas", "escape"], ["closed", "sealed"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Explains that mass is conserved because the atoms are only rearranged in a reaction — none are created or destroyed — so the total mass stays the same in a closed container.",
        "States that opening the lid lets the carbon dioxide gas escape, so the reading would go down (the mass leaves as gas, it is not destroyed).",
      ],
      modelAnswer: "The mass stays the same because a chemical reaction only rearranges the atoms; no atoms are made or destroyed. In a sealed jar every atom is still inside, so the total mass is the same. If the lid were opened, the carbon dioxide gas would escape and the reading would drop, because that gas has left the jar — not because mass was destroyed.",
      vnTranslation: "Baking soda và giấm phản ứng trong một lọ kín. Lọ nặng như nhau trước và sau phản ứng. Giải thích vì sao, và cho biết số cân sẽ thay đổi thế nào nếu mở nắp.",
    },
    {
      id: "qa5",
      question: "A student wants to find out whether smaller pieces of marble react faster with acid. Describe a fair test: what she should change, what she should measure, and two things she must keep the same.",
      suggestedWords: [["independent variable", "change"], ["dependent variable", "measure"], ["control", "keep the same"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Says she should change only the size of the marble pieces (e.g. one large chip vs the same mass crushed into powder).",
        "Says she should measure the time for the reaction to finish (or the amount of gas made in a set time).",
        "Names two things to keep the same, e.g. the mass of marble, the volume and strength of the acid, and the temperature.",
      ],
      modelAnswer: "She should change only the size of the marble: one test with a single large chip and one with the same mass crushed into small pieces. She should measure how long the fizzing takes to stop, or how much gas is made in one minute. To keep the test fair she must use the same mass of marble, the same volume and strength of acid, and the same temperature each time.",
      vnTranslation: "Một học sinh muốn tìm hiểu xem đá vôi nghiền nhỏ có phản ứng với axit nhanh hơn không. Mô tả một thí nghiệm công bằng: cô nên thay đổi gì, đo gì, và hai điều phải giữ nguyên.",
    },
  ],

  // Source Analysis: four authored sources — a heating curve, a particle
  // picture, the pH scale, and a rate-experiment data table. 3 MCQ : 1 written.
  diagrams: [
    {
      id: "diag_1_heating_curve",
      type: "mcq",
      inlineSvg: DIAGRAMS.HEATING_CURVE,
      imageAlt: "A heating curve for water: temperature rises from -20 °C, stays flat at 0 °C while melting, rises again, stays flat at 100 °C while boiling, then rises as gas.",
      promptText: "This graph shows the temperature of a block of ice as it is heated steadily. The line is FLAT twice. What is happening to the water during the flat part at 100 °C?",
      options: [
        { val: "A", text: "The heater has been switched off.", textVn: "Máy sưởi đã bị tắt." },
        { val: "B", text: "The water is boiling — the energy is turning liquid into gas, not raising the temperature.", textVn: "Nước đang sôi — năng lượng dùng để biến chất lỏng thành khí, không làm tăng nhiệt độ." },
        { val: "C", text: "The ice is melting into liquid water.", textVn: "Nước đá đang tan thành nước lỏng." },
        { val: "D", text: "The water is cooling down.", textVn: "Nước đang nguội đi." },
      ],
      correct: "B",
      marks: 1,
      expEn: "Read the axis: the flat part sits at 100 °C, the boiling point of water. Heat is still going in (the heater is on the whole time), but it is used to pull the particles apart into gas, so the temperature does not rise until all the liquid has boiled. Melting is the lower flat part at 0 °C.",
      expVn: "Đọc trục: phần phẳng nằm ở 100 °C, điểm sôi của nước. Nhiệt vẫn được cấp vào (máy sưởi bật suốt), nhưng nó được dùng để tách các hạt ra thành khí, nên nhiệt độ không tăng cho đến khi toàn bộ chất lỏng đã sôi hết. Tan chảy là phần phẳng thấp hơn ở 0 °C.",
    },
    {
      id: "diag_2_particles",
      type: "mcq",
      inlineSvg: DIAGRAMS.PARTICLES,
      imageAlt: "Three boxes of particles: solid (neat rows, touching), liquid (touching but jumbled), gas (five particles far apart with motion lines).",
      promptText: "The three boxes show the particles in a solid, a liquid and a gas. Which box shows a substance that can flow AND keeps roughly the same volume, and why?",
      options: [
        { val: "A", text: "Solid — its particles are in neat rows.", textVn: "Rắn — các hạt xếp thành hàng ngay ngắn." },
        { val: "B", text: "Gas — its particles are far apart.", textVn: "Khí — các hạt cách xa nhau." },
        { val: "C", text: "Liquid — its particles are still close together but can slide past each other.", textVn: "Lỏng — các hạt vẫn gần nhau nhưng có thể trượt qua nhau." },
        { val: "D", text: "None of them — only gases can flow.", textVn: "Không có hộp nào — chỉ chất khí mới chảy được." },
      ],
      correct: "C",
      marks: 1,
      expEn: "A liquid flows because its particles can slide past one another, but they are still touching, so the volume stays almost the same. A solid cannot flow (fixed particles). A gas flows but spreads out to fill any space, so its volume changes.",
      expVn: "Chất lỏng chảy được vì các hạt có thể trượt qua nhau, nhưng chúng vẫn chạm nhau nên thể tích gần như không đổi. Chất rắn không chảy được (hạt cố định). Chất khí chảy được nhưng lan ra chiếm đầy mọi không gian, nên thể tích thay đổi.",
    },
    {
      id: "diag_3_ph_scale",
      type: "mcq",
      inlineSvg: DIAGRAMS.PH_SCALE,
      imageAlt: "A pH scale from 0 to 14 with examples: lemon juice pH 2, vinegar pH 3, pure water pH 7, baking soda pH 9, soap pH 10, bleach pH 13.",
      promptText: "Use the pH scale. A wasp sting is a base (around pH 11). Which household substance from the chart would be the best choice to put on it to reduce the sting?",
      options: [
        { val: "A", text: "Soap (pH 10), because it is also a base.", textVn: "Xà phòng (pH 10), vì nó cũng là bazơ." },
        { val: "B", text: "Pure water (pH 7), because it is the strongest acid.", textVn: "Nước tinh khiết (pH 7), vì nó là axit mạnh nhất." },
        { val: "C", text: "Bleach (pH 13), because it is further up the scale.", textVn: "Thuốc tẩy (pH 13), vì nó nằm cao hơn trên thang." },
        { val: "D", text: "Vinegar (pH 3), because an acid cancels out a base.", textVn: "Giấm (pH 3), vì axit trung hòa bazơ." },
      ],
      correct: "D",
      marks: 1,
      expEn: "An acid and a base cancel each other out (neutralise). The sting is a base, so you want something below 7 on the scale — vinegar at pH 3 is a mild acid. Soap and bleach are bases and would not help; water is neutral (pH 7), not an acid.",
      expVn: "Axit và bazơ trung hòa lẫn nhau. Vết đốt là bazơ, nên bạn cần thứ gì đó dưới 7 trên thang — giấm pH 3 là axit nhẹ. Xà phòng và thuốc tẩy là bazơ nên không giúp gì; nước là trung tính (pH 7), không phải axit.",
    },
    {
      id: "diag_4_rate_table",
      inlineSvg: DIAGRAMS.RATE_TABLE,
      imageAlt: "A data table: at 20 °C the reaction took 80 s, at 30 °C 40 s, at 40 °C 20 s, at 50 °C 10 s. Kept the same: one chip of the same size and 50 mL of the same acid.",
      promptText: "The table shows how long a marble chip took to finish reacting in acid at four temperatures. Describe the pattern in the data, explain what it shows about temperature and reaction rate, and say why this counts as a fair test.",
      suggestedWords: [["pattern", "trend"], ["rate", "faster"], ["independent variable", "control"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Describes the pattern with the data: as temperature rises the time falls — each 10 °C rise roughly halves the time (80 → 40 → 20 → 10 s).",
        "Concludes that a higher temperature makes the reaction faster (a shorter time means a higher rate).",
        "Explains it is a fair test because only the temperature was changed while the chip size and the amount and type of acid were kept the same.",
      ],
      modelAnswer: "As the temperature goes up, the time to finish goes down: 80 seconds at 20 °C, 40 at 30 °C, 20 at 40 °C and 10 at 50 °C. Every 10 °C rise cuts the time in half. A shorter time means a faster reaction, so the data shows that heating the acid speeds up the reaction. It is a fair test because the student changed only the temperature and kept the chip size and the volume and type of acid the same, so temperature must be the cause.",
      vnTranslation: "Bảng cho thấy một viên đá vôi mất bao lâu để phản ứng hết trong axit ở bốn nhiệt độ. Mô tả quy luật trong dữ liệu, giải thích nó cho thấy gì về nhiệt độ và tốc độ phản ứng, và nói vì sao đây là một thí nghiệm công bằng.",
    },
  ],

  assessment,
  notes,
};
