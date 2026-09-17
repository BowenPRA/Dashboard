// src/data/GED_SCIENCE/SCI_2B/data.js
// SCI_2B — Force, Motion & Energy. The physics half of Physical Science, kept
// to what the test actually asks: read a distance–time graph, a force diagram
// or an energy chart and reason from it. One-step maths only (speed =
// distance ÷ time). Newton's laws in plain language with an everyday example
// each; energy forms, conservation and transfer; heat transfer; waves; sound
// vs light.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_SCI_2B_DATA = {
  meta: {
    id: "SCI_2B",
    title: "Force, Motion & Energy",
    desc: "Speed, velocity and acceleration; reading a distance–time graph; Newton's three laws; balanced and unbalanced forces; forms of energy and how it is conserved and transferred; heat by conduction, convection and radiation; waves, sound and light.",
    track: "GED_SCIENCE",
    icon: "Zap",
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
    { word: "Force", vn: "Lực", def: "A push or a pull; measured in newtons (N).", vnDef: "Một lực đẩy hoặc lực kéo; đo bằng newton (N).", sent: "It takes a bigger force to move a full box than an empty one.", vnSent: "Cần một lực lớn hơn để đẩy một thùng đầy so với thùng rỗng.", isReal: true },
    { word: "Friction", vn: "Ma sát", def: "A force that works against motion when two surfaces rub together.", vnDef: "Lực cản lại chuyển động khi hai bề mặt cọ xát vào nhau.", sent: "Friction between the tyres and the road lets a car stop.", vnSent: "Ma sát giữa lốp xe và mặt đường giúp xe dừng lại.", isReal: true },
    { word: "Speed", vn: "Tốc độ", def: "How far something travels each unit of time: distance ÷ time.", vnDef: "Vật đi được bao xa trong mỗi đơn vị thời gian: quãng đường ÷ thời gian.", sent: "A speed of 60 km/h means 60 kilometres every hour.", vnSent: "Tốc độ 60 km/h nghĩa là 60 kilômét mỗi giờ.", isReal: true },
    { word: "Velocity", vn: "Vận tốc", def: "Speed in a stated direction.", vnDef: "Tốc độ theo một hướng xác định.", sent: "The train's velocity was 80 km/h north.", vnSent: "Vận tốc của đoàn tàu là 80 km/h về hướng bắc.", isReal: true },
    { word: "Acceleration", vn: "Gia tốc", def: "A change in velocity — speeding up, slowing down or changing direction.", vnDef: "Sự thay đổi vận tốc — tăng tốc, giảm tốc hoặc đổi hướng.", sent: "You feel acceleration when a bus pulls away from the stop.", vnSent: "Bạn cảm nhận gia tốc khi xe buýt rời bến.", isReal: true },
    { word: "Energy", vn: "Năng lượng", def: "The ability to do work or cause change; measured in joules (J).", vnDef: "Khả năng thực hiện công hoặc gây ra thay đổi; đo bằng jun (J).", sent: "Food gives your body the energy it needs to move.", vnSent: "Thức ăn cung cấp cho cơ thể năng lượng cần thiết để vận động.", isReal: true },
    { word: "Kinetic", vn: "Động (năng)", def: "Describes the energy of something that is moving.", vnDef: "Chỉ năng lượng của một vật đang chuyển động.", sent: "A rolling ball has kinetic energy; a ball sitting still has none.", vnSent: "Quả bóng đang lăn có động năng; quả bóng nằm yên thì không.", isReal: true },
    { word: "Transfer", vn: "Truyền (chuyển)", def: "The movement of energy from one place or form to another.", vnDef: "Sự chuyển năng lượng từ nơi này hoặc dạng này sang nơi khác hoặc dạng khác.", sent: "A hot spoon in cold water is a transfer of heat from the spoon to the water.", vnSent: "Một chiếc thìa nóng trong nước lạnh là sự truyền nhiệt từ thìa sang nước.", isReal: true },
    { word: "Wavelength", vn: "Bước sóng", def: "The distance from one crest of a wave to the next.", vnDef: "Khoảng cách từ một đỉnh sóng đến đỉnh kế tiếp.", sent: "Red light has a longer wavelength than blue light.", vnSent: "Ánh sáng đỏ có bước sóng dài hơn ánh sáng xanh lam.", isReal: true },
    { word: "Frequency", vn: "Tần số", def: "How many waves pass a point each second; measured in hertz (Hz).", vnDef: "Số sóng đi qua một điểm mỗi giây; đo bằng hertz (Hz).", sent: "A high-frequency sound has a high pitch.", vnSent: "Âm thanh tần số cao có độ cao (âm) lớn.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "How Fast?",
      vnTitle: "Nhanh Bao nhiêu?",
      meta: "Speed, velocity and acceleration",
      text: [
        "{Speed} tells you how far something travels in a certain time. The formula is simple: speed = distance ÷ time. A bus that goes 120 kilometres in 2 hours has a speed of 120 ÷ 2 = 60 kilometres per hour. Always write the unit — km/h, m/s — because a number on its own means nothing.",
        "{Velocity} is speed with a direction added. Two cars can both be doing 60 km/h, but if one is heading north and the other south, their velocities are different. On the test, if a question mentions a direction, it is talking about velocity.",
        "{Acceleration} is any change in velocity. A car speeding up from a red light is accelerating. So is a car braking, because its velocity is falling. So is a car going round a bend at a steady 60 km/h, because its direction is changing. Whenever velocity changes, an unbalanced force must be acting.",
      ].join(" "),
      vnText: [
        "Tốc độ cho biết một vật đi được bao xa trong một khoảng thời gian nhất định. Công thức rất đơn giản: tốc độ = quãng đường ÷ thời gian. Một xe buýt đi 120 kilômét trong 2 giờ có tốc độ 120 ÷ 2 = 60 kilômét mỗi giờ. Luôn ghi đơn vị — km/h, m/s — vì một con số đứng một mình chẳng có ý nghĩa gì.",
        "Vận tốc là tốc độ có thêm hướng. Hai chiếc xe có thể cùng chạy 60 km/h, nhưng nếu một xe đi về hướng bắc và xe kia về hướng nam, vận tốc của chúng khác nhau. Trong bài thi, nếu câu hỏi nhắc đến hướng, tức là đang nói về vận tốc.",
        "Gia tốc là bất kỳ sự thay đổi nào của vận tốc. Một chiếc xe tăng tốc từ đèn đỏ là đang có gia tốc. Xe đang phanh cũng vậy, vì vận tốc đang giảm. Xe vào cua với tốc độ đều 60 km/h cũng vậy, vì hướng đang thay đổi. Bất cứ khi nào vận tốc thay đổi, phải có một lực không cân bằng đang tác dụng.",
      ].join(" "),
      glossary: {
        "formula": { vn: "Công thức", def: "A rule written with symbols or words for working something out." },
        "unbalanced": { vn: "Không cân bằng", def: "Not equal on both sides, so there is a net force." },
      },
    },
    {
      id: "passage_2",
      title: "Pushes, Pulls and Newton's Laws",
      vnTitle: "Đẩy, Kéo và các Định luật Newton",
      meta: "Forces in everyday life",
      text: [
        "A {force} is a push or a pull, measured in newtons. Forces come in pairs of opposites all the time: gravity pulls a book down, and the table pushes it up by exactly the same amount. When the forces on an object are balanced, its motion does not change — a resting book stays at rest, and a car at a steady speed keeps that speed.",
        "Isaac Newton wrote three laws about this. The first: an object keeps doing what it is doing unless an unbalanced force acts on it. That is why you lurch forward when a bus brakes — your body keeps moving. The second: the bigger the force, the bigger the acceleration, and the heavier the object, the smaller the acceleration. Pushing a shopping trolley is easy when it is empty and hard when it is full. The third: every push has an equal push back. When you jump, you push the ground down and the ground pushes you up.",
        "{Friction} is the force that works against motion when surfaces rub. It is why a sliding box slows down and stops. Without friction, a car's wheels would spin and you could not walk.",
      ].join(" "),
      vnText: [
        "Lực là một cú đẩy hoặc kéo, đo bằng newton. Lực luôn xuất hiện theo cặp ngược chiều: trọng lực kéo cuốn sách xuống, và mặt bàn đẩy nó lên với đúng độ lớn như vậy. Khi các lực tác dụng lên một vật cân bằng, chuyển động của nó không thay đổi — cuốn sách nằm yên vẫn nằm yên, và xe chạy đều vẫn giữ tốc độ đó.",
        "Isaac Newton viết ba định luật về điều này. Định luật thứ nhất: một vật tiếp tục làm điều nó đang làm trừ khi có lực không cân bằng tác dụng. Đó là lý do bạn chúi về phía trước khi xe buýt phanh — cơ thể bạn vẫn tiếp tục chuyển động. Định luật thứ hai: lực càng lớn thì gia tốc càng lớn, và vật càng nặng thì gia tốc càng nhỏ. Đẩy xe đẩy hàng dễ khi trống và khó khi đầy. Định luật thứ ba: mọi lực đẩy đều có một lực đẩy ngược lại bằng nhau. Khi bạn nhảy, bạn đẩy mặt đất xuống và mặt đất đẩy bạn lên.",
        "Ma sát là lực cản lại chuyển động khi các bề mặt cọ xát. Nó là lý do một cái thùng trượt chậm dần rồi dừng lại. Không có ma sát, bánh xe ô tô sẽ quay trượt và bạn không thể đi bộ được.",
      ].join(" "),
      glossary: {
        "lurch": { vn: "Chúi, giật người", def: "To move suddenly and unsteadily." },
        "trolley": { vn: "Xe đẩy", def: "A cart on wheels for carrying shopping." },
      },
    },
    {
      id: "passage_3",
      title: "Where the Energy Goes",
      vnTitle: "Năng lượng Đi đâu",
      meta: "Conservation and transfer",
      text: [
        "{Energy} is the ability to make something happen. It comes in many forms: {kinetic} energy in anything moving, potential energy stored in a raised object or a stretched spring, thermal energy in anything warm, chemical energy in food and fuel, and electrical, light and sound energy.",
        "Energy is never made or destroyed — it only changes form. This is the law of conservation of energy. Drop a ball from a shelf: at the top it has potential energy and no kinetic energy. As it falls, the potential energy becomes kinetic energy, and just before it hits the floor almost all of it is kinetic. The total stays the same the whole way down.",
        "Every {transfer} wastes some energy as heat. An old light bulb takes in 100 joules of electrical energy but gives out only about 5 joules of light; the other 95 joules warm the room. The energy did not vanish — it just ended up in a form nobody wanted. Sound is a transfer too: a loudspeaker turns electrical energy into a wave in the air, and the higher its {frequency}, the higher the note you hear.",
      ].join(" "),
      vnText: [
        "Năng lượng là khả năng làm cho điều gì đó xảy ra. Nó có nhiều dạng: động năng trong mọi vật đang chuyển động, thế năng dự trữ trong vật được nâng cao hoặc lò xo bị kéo giãn, nhiệt năng trong mọi vật ấm, hóa năng trong thức ăn và nhiên liệu, và năng lượng điện, ánh sáng, âm thanh.",
        "Năng lượng không bao giờ được tạo ra hay bị hủy — nó chỉ đổi dạng. Đây là định luật bảo toàn năng lượng. Thả một quả bóng từ trên kệ: ở trên cao nó có thế năng và không có động năng. Khi rơi, thế năng chuyển thành động năng, và ngay trước khi chạm sàn gần như toàn bộ là động năng. Tổng năng lượng giữ nguyên suốt quãng rơi.",
        "Mỗi lần truyền năng lượng đều lãng phí một phần thành nhiệt. Một bóng đèn cũ nhận vào 100 jun năng lượng điện nhưng chỉ phát ra khoảng 5 jun ánh sáng; 95 jun còn lại làm ấm căn phòng. Năng lượng không biến mất — nó chỉ chuyển sang một dạng không ai muốn. Âm thanh cũng là một sự truyền: loa biến năng lượng điện thành sóng trong không khí, và tần số càng cao thì nốt bạn nghe càng cao.",
      ].join(" "),
      glossary: {
        "potential energy": { vn: "Thế năng", def: "Stored energy, ready to be used — e.g. in a raised object." },
        "joules": { vn: "Jun", def: "The unit of energy (J)." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "A cyclist rides 45 kilometres in 3 hours. Work out her average speed, showing the formula you used, and give the correct unit.",
      suggestedWords: [["formula", "distance", "time"], ["average"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Uses speed = distance ÷ time (45 ÷ 3) and gets 15.",
        "Gives the unit kilometres per hour (km/h).",
      ],
      modelAnswer: "Speed = distance ÷ time. 45 km ÷ 3 h = 15 km/h. Her average speed was 15 kilometres per hour.",
      vnTranslation: "Một người đi xe đạp đi 45 kilômét trong 3 giờ. Tính tốc độ trung bình của cô ấy, viết công thức đã dùng, và ghi đúng đơn vị.",
    },
    {
      id: "qa2",
      question: "On a distance–time graph, what does a flat (horizontal) section mean, and how can you tell which part of the graph shows the fastest movement?",
      suggestedWords: [["slope", "steep"], ["distance", "time"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that a flat section means the object is stopped (distance is not changing as time passes).",
        "States that the steepest section shows the fastest movement (the most distance covered in the least time).",
      ],
      modelAnswer: "A flat section means the object is not moving: time is passing but the distance stays the same. The fastest part is the steepest line, because the object covers the most distance in the shortest time there.",
      vnTranslation: "Trên đồ thị quãng đường–thời gian, đoạn phẳng (nằm ngang) nghĩa là gì, và làm sao biết phần nào của đồ thị cho thấy chuyển động nhanh nhất?",
    },
    {
      id: "qa3",
      question: "A box sits still on the floor. You push it with 30 N and friction pushes back with 10 N. Explain what happens to the box and why, using the idea of balanced and unbalanced forces.",
      suggestedWords: [["net force", "resultant"], ["accelerate"], ["newtons"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that the forces are unbalanced — there is a net (extra) force of 20 N in the direction of the push.",
        "States that an unbalanced force makes the box accelerate (start moving and speed up) in the direction of the push.",
      ],
      modelAnswer: "The two horizontal forces are not equal: 30 N forward against 10 N back leaves a net force of 20 N forward. Because the forces are unbalanced, the box accelerates — it starts to move and speeds up in the direction I am pushing. If friction were also 30 N, the forces would be balanced and the box would not move.",
      vnTranslation: "Một cái thùng nằm yên trên sàn. Bạn đẩy nó với lực 30 N và ma sát đẩy ngược lại 10 N. Giải thích điều gì xảy ra với cái thùng và vì sao, dùng ý tưởng lực cân bằng và không cân bằng.",
    },
    {
      id: "qa4",
      question: "State Newton's third law in your own words and give one everyday example of it.",
      suggestedWords: [["pair", "opposite"], ["push", "react"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that for every force (action) there is an equal force back in the opposite direction (reaction).",
        "Gives a correct everyday example, e.g. jumping: you push the ground down and the ground pushes you up; a rocket pushes gas down and the gas pushes the rocket up; a swimmer pushes water back and moves forward.",
      ],
      modelAnswer: "Newton's third law says that every push or pull has an equal push or pull back in the opposite direction. For example, when you jump, your feet push down on the ground and the ground pushes up on you with the same force — that upward push is what lifts you.",
      vnTranslation: "Phát biểu định luật thứ ba của Newton bằng lời của bạn và cho một ví dụ đời thường.",
    },
    {
      id: "qa5",
      question: "An old light bulb takes in 100 J of electrical energy every second and gives out 5 J of light. Explain where the other 95 J goes, and why this does NOT break the law of conservation of energy.",
      suggestedWords: [["thermal", "heat"], ["wasted"], ["total", "form"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the other 95 J is given out as heat (thermal energy) that warms the surroundings.",
        "States that the energy was not destroyed — it was transferred to a form that is not useful (wasted).",
        "Shows the total is unchanged: 5 J light + 95 J heat = 100 J in, so energy is conserved.",
      ],
      modelAnswer: "The other 95 J becomes heat. The bulb gets hot and warms the air around it. That energy is wasted because nobody wanted heat from a lamp, but it has not disappeared — it just changed form. Adding it up, 5 J of light plus 95 J of heat equals the 100 J that went in, so the total energy is the same and the law of conservation of energy still holds.",
      vnTranslation: "Một bóng đèn cũ nhận vào 100 J năng lượng điện mỗi giây và phát ra 5 J ánh sáng. Giải thích 95 J còn lại đi đâu, và vì sao điều này KHÔNG vi phạm định luật bảo toàn năng lượng.",
    },
  ],

  // Source Analysis: four authored sources — a distance–time graph, a force
  // diagram, an energy bar chart, and a labelled wave. 3 MCQ : 1 written.
  diagrams: [
    {
      id: "diag_1_dt_graph",
      type: "mcq",
      inlineSvg: DIAGRAMS.DT_GRAPH,
      imageAlt: "A distance–time graph in three parts: A rises gently from 0 to 250 m over minutes 0–2, B is flat from minutes 2–4, C rises steeply to 500 m between minutes 4 and 5.",
      promptText: "This graph shows a person's walk to a shop. Distance is on the side axis, time along the bottom. What is the person doing during part B, and which part shows them moving fastest?",
      options: [
        { val: "A", text: "B: walking slowly; fastest in part A.", textVn: "B: đi chậm; nhanh nhất ở phần A." },
        { val: "B", text: "B: stopped; fastest in part C, because it is the steepest line.", textVn: "B: đang dừng; nhanh nhất ở phần C, vì đường dốc nhất." },
        { val: "C", text: "B: walking backwards; fastest in part B.", textVn: "B: đi lùi; nhanh nhất ở phần B." },
        { val: "D", text: "B: running; fastest in part A because it is longest.", textVn: "B: đang chạy; nhanh nhất ở phần A vì nó dài nhất." },
      ],
      correct: "B",
      marks: 1,
      expEn: "In part B the distance stays at 250 m while two minutes pass — no distance covered means the person has stopped. Speed is the slope of the line: part C climbs 250 m in one minute, the steepest section, so it is the fastest. Part A covers the same 250 m in two minutes, so it is slower.",
      expVn: "Ở phần B, quãng đường giữ nguyên 250 m trong khi hai phút trôi qua — không đi thêm được gì nghĩa là người đó đã dừng. Tốc độ là độ dốc của đường: phần C tăng 250 m trong một phút, đoạn dốc nhất, nên nhanh nhất. Phần A đi cùng 250 m trong hai phút, nên chậm hơn.",
    },
    {
      id: "diag_2_forces",
      type: "mcq",
      inlineSvg: DIAGRAMS.FORCES,
      imageAlt: "A box on a floor with four arrows: push 30 N to the right, friction 10 N to the left, gravity 20 N down, floor pushes up 20 N.",
      promptText: "The diagram shows every force on a box. What is the overall (net) force on the box, and what will the box do?",
      options: [
        { val: "A", text: "0 N — the box stays still because every arrow has a partner.", textVn: "0 N — thùng đứng yên vì mỗi mũi tên đều có cặp." },
        { val: "B", text: "40 N to the right — add the push and the friction.", textVn: "40 N sang phải — cộng lực đẩy và ma sát." },
        { val: "C", text: "20 N to the right — the box accelerates to the right.", textVn: "20 N sang phải — thùng tăng tốc sang phải." },
        { val: "D", text: "20 N downward — gravity wins and the box sinks.", textVn: "20 N hướng xuống — trọng lực thắng và thùng lún xuống." },
      ],
      correct: "C",
      marks: 1,
      expEn: "Look at each direction separately. Up and down: 20 N up and 20 N down cancel, so the box does not move vertically. Left and right: 30 N push minus 10 N friction leaves 20 N to the right. That unbalanced force makes the box accelerate to the right.",
      expVn: "Xét từng hướng riêng. Lên và xuống: 20 N lên và 20 N xuống triệt tiêu nhau, nên thùng không chuyển động theo phương thẳng đứng. Trái và phải: 30 N đẩy trừ 10 N ma sát còn 20 N sang phải. Lực không cân bằng đó làm thùng tăng tốc sang phải.",
    },
    {
      id: "diag_3_energy_bars",
      inlineSvg: DIAGRAMS.ENERGY_BARS,
      imageAlt: "A bar chart of a falling ball's energy in joules. Top: 100 potential, 0 kinetic. Halfway down: 50 potential, 50 kinetic. Just before the floor: 0 potential, 100 kinetic.",
      promptText: "The bar chart shows the energy of a ball at three points as it falls from a shelf. Describe how the two kinds of energy change from top to bottom, and explain what the chart shows about the TOTAL energy.",
      suggestedWords: [["potential", "stored"], ["kinetic", "movement"], ["conserved", "total"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Describes the potential energy falling from 100 J to 50 J to 0 J as the ball drops.",
        "Describes the kinetic energy rising from 0 J to 50 J to 100 J at the same time.",
        "States that the total stays at 100 J at every point — potential energy is transferred to kinetic energy, and energy is conserved (not lost).",
      ],
      modelAnswer: "At the top the ball has 100 J of potential energy and no kinetic energy. Halfway down it has 50 J of each, and just before it hits the floor it has 0 J of potential and 100 J of kinetic energy. So the potential energy goes down while the kinetic energy goes up by the same amount. At every point the two bars add up to 100 J, which shows that the energy was transferred from one form to the other and none was lost — the total energy is conserved.",
      vnTranslation: "Biểu đồ cột cho thấy năng lượng của một quả bóng ở ba điểm khi nó rơi từ trên kệ. Mô tả hai loại năng lượng thay đổi thế nào từ trên xuống dưới, và giải thích biểu đồ cho thấy gì về TỔNG năng lượng.",
    },
    {
      id: "diag_4_wave",
      type: "mcq",
      inlineSvg: DIAGRAMS.WAVE,
      imageAlt: "A labelled wave: crest, trough, rest position; a red arrow from crest to crest marked wavelength; a green arrow from the rest position up to a crest marked amplitude.",
      promptText: "Two sound waves are made by the same speaker. Wave 2 has a bigger amplitude but the same wavelength as Wave 1. Using the diagram, what is different about the sound of Wave 2?",
      options: [
        { val: "A", text: "It is louder — amplitude is the height of the wave, which sets loudness.", textVn: "Nó to hơn — biên độ là độ cao của sóng, quyết định độ to." },
        { val: "B", text: "It has a higher pitch — a bigger amplitude means a higher frequency.", textVn: "Nó có độ cao lớn hơn — biên độ lớn hơn nghĩa là tần số cao hơn." },
        { val: "C", text: "It travels faster — taller waves move faster.", textVn: "Nó truyền nhanh hơn — sóng cao hơn thì đi nhanh hơn." },
        { val: "D", text: "Nothing — amplitude does not affect sound.", textVn: "Không gì cả — biên độ không ảnh hưởng đến âm thanh." },
      ],
      correct: "A",
      marks: 1,
      expEn: "The diagram labels amplitude as the height from the rest position to a crest. For sound, amplitude is loudness: a taller wave carries more energy and sounds louder. Pitch depends on frequency (and wavelength), which the question says is unchanged. Speed depends on the material the wave travels through, not its height.",
      expVn: "Sơ đồ ghi biên độ là chiều cao từ vị trí cân bằng lên đỉnh sóng. Với âm thanh, biên độ là độ to: sóng cao hơn mang nhiều năng lượng hơn và nghe to hơn. Độ cao của âm phụ thuộc tần số (và bước sóng), mà đề nói không đổi. Tốc độ phụ thuộc vào môi trường sóng truyền qua, không phụ thuộc chiều cao sóng.",
    },
  ],

  assessment,
  notes,
};
