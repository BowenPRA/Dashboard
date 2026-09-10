// src/data/Y7_SCI/U02_2/data.js
// 2.2 Changes of State — Year 7 Science self-study unit covering the two
// classroom lessons 2.2a (the five change words) and 2.2b (measuring, and
// heating water), with the classroom's particle model as a widget. Rebuilt to
// docs/y7-science/ENGAGEMENT-PLAN.md: a mixed-type Workbook, Label It on the
// cycle diagram and the apparatus, and the unit's own Lab Bench (this is the
// only unit with a measuring skill, so it carries all three generative
// modes). Nine scored tasks; 160 XP available, capped at 100 — over the
// usual 150 ceiling, which the plan accepts for the one unit that carries
// Lab Bench. SPELLING is dropped (ENGAGEMENT-PLAN §3).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as MEASURE } from './diagramsB.js';

export const U02_2_DATA = {
  meta: {
    id: 'U02_2',
    title: 'Changes of State',
    desc: 'Melting, freezing, evaporating, boiling and condensing — each as a journey from one state to another — then measuring, and the water that stops getting hotter.',
    track: 'Y7_SCI',
    icon: 'Thermometer',
    classroom: [
      { course: 'y7-science', slug: 'U02_2a', title: 'Science 2.2a · Changes of State' },
      { course: 'y7-science', slug: 'U02_2b', title: 'Science 2.2b · Measuring, and Heating Water' },
      { course: 'y7-science', slug: 'U02_model_states', title: 'Heating & Cooling · the particle model' },
    ],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 15 },
      ],
    },
    {
      // 25 of the 35 XP before it (71%). The practice phase is where the
      // variety lives: a mixed-type workbook, the labelling task, the Lab
      // Bench, the reading, the AI-marked questions and diagrams
      // (ENGAGEMENT-PLAN §3).
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 20 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 15 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 15 },
        { id: 'LAB_BENCH', dbKey: 'p29', maxXP: 15 },
      ],
    },
    {
      // Quiz and arcade share one gate at 80 of the 140 XP before it (57%).
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  labBench: { modes: ['cylinder', 'thermometer', 'curve'], rounds: 8, title: 'Lab Bench', titleVn: 'Bàn thí nghiệm' },

  realWords: [
    {
      word: 'Melt', vn: 'Nóng chảy',
      def: 'To change from a solid to a liquid by heating. Ice melts at 0 degrees C, its melting point.',
      vnDef: 'Chuyển từ rắn sang lỏng do đun nóng. Nước đá nóng chảy ở 0 độ C, nhiệt độ nóng chảy của nó.',
      sent: 'The ice cube melts into a puddle on the warm table.',
      vnSent: 'Viên đá nóng chảy thành một vũng nước trên bàn ấm.',
      isReal: true,
    },
    {
      word: 'Freeze', vn: 'Đông đặc',
      def: 'To change from a liquid to a solid by cooling. Freezing is the reverse of melting.',
      vnDef: 'Chuyển từ lỏng sang rắn do làm lạnh. Đông đặc là quá trình ngược của nóng chảy.',
      sent: 'Water freezes into ice in the freezer.',
      vnSent: 'Nước đông đặc thành đá trong ngăn đá.',
      isReal: true,
    },
    {
      word: 'Evaporate', vn: 'Bay hơi',
      def: 'To change from a liquid to a gas slowly, from the surface, at any temperature.',
      vnDef: 'Chuyển từ lỏng sang khí một cách chậm rãi, ở bề mặt, ở bất kỳ nhiệt độ nào.',
      sent: 'The puddle evaporates into invisible water vapour.',
      vnSent: 'Vũng nước bay hơi thành hơi nước vô hình.',
      isReal: true,
    },
    {
      word: 'Boil', vn: 'Sôi',
      def: 'To change from a liquid to a gas quickly, all through the liquid, at the boiling point. Water boils at 100 degrees C.',
      vnDef: 'Chuyển từ lỏng sang khí một cách nhanh chóng, khắp trong lòng chất lỏng, ở nhiệt độ sôi. Nước sôi ở 100 độ C.',
      sent: 'The water in the kettle boils and turns to steam.',
      vnSent: 'Nước trong ấm sôi và biến thành hơi.',
      isReal: true,
    },
    {
      word: 'Condense', vn: 'Ngưng tụ',
      def: 'To change from a gas back to a liquid by cooling. Water vapour condenses into drops on a cold surface.',
      vnDef: 'Chuyển từ khí trở lại thành lỏng do làm lạnh. Hơi nước ngưng tụ thành giọt trên bề mặt lạnh.',
      sent: 'Steam condenses on the cold bathroom mirror.',
      vnSent: 'Hơi nước ngưng tụ trên tấm gương phòng tắm lạnh.',
      isReal: true,
    },
    {
      word: 'Water vapour', vn: 'Hơi nước',
      def: 'Water in the form of an invisible gas.',
      vnDef: 'Nước ở dạng khí vô hình.',
      sent: 'You cannot see the water vapour in the air, but it is there.',
      vnSent: 'Em không nhìn thấy hơi nước trong không khí, nhưng nó có ở đó.',
      isReal: true,
    },
    {
      word: 'Meniscus', vn: 'Mặt khum',
      def: 'The curved surface of a liquid in a measuring cylinder. Read the bottom of it, at eye level.',
      vnDef: 'Mặt cong của chất lỏng trong ống đong. Đọc ở đáy của nó, ngang tầm mắt.',
      sent: 'Read the volume at the bottom of the meniscus.',
      vnSent: 'Đọc thể tích ở đáy mặt khum.',
      isReal: true,
    },
    {
      word: 'Thermometer', vn: 'Nhiệt kế',
      def: 'The tool used to measure temperature. The liquid inside expands and rises as it gets hotter.',
      vnDef: 'Dụng cụ để đo nhiệt độ. Chất lỏng bên trong giãn nở và dâng lên khi nóng hơn.',
      sent: 'Hold the thermometer so it does not touch the bottom of the beaker.',
      vnSent: 'Giữ nhiệt kế sao cho nó không chạm đáy cốc.',
      isReal: true,
    },
    {
      word: 'Axis', vn: 'Trục',
      def: 'A line on a graph. Time goes on the horizontal axis and temperature on the vertical axis. The plural is axes.',
      vnDef: 'Một đường trên đồ thị. Thời gian nằm trên trục ngang và nhiệt độ trên trục dọc. Số nhiều là axes.',
      sent: 'Label the horizontal axis with time in minutes.',
      vnSent: 'Ghi nhãn trục ngang bằng thời gian tính theo phút.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Where the Ice Went',
      text: 'Leave an ice cube on a warm table and it will {melt}: heating gives its particles more energy, and at 0 degrees C, the melting point, the solid becomes a liquid. Put that water in the freezer and it will {freeze} again — the reverse journey, with heat coming out instead of going in. Leave the puddle on the table instead and it slowly disappears. It has not gone anywhere strange: it has changed into {water vapour}, an invisible gas. That slow change from the surface of a liquid is called evaporation.',
      vnTitle: 'Viên đá đã đi đâu',
      vnText: 'Để một viên đá trên bàn ấm và nó sẽ {melt}: đun nóng cho các hạt của nó thêm năng lượng, và ở 0 độ C, nhiệt độ nóng chảy, chất rắn trở thành chất lỏng. Cho nước đó vào ngăn đá và nó sẽ {freeze} trở lại — hành trình ngược, với nhiệt đi ra thay vì đi vào. Thay vào đó, để vũng nước trên bàn thì nó từ từ biến mất. Nó không đi đâu lạ cả: nó đã chuyển thành {water vapour}, một chất khí vô hình. Sự thay đổi chậm từ bề mặt chất lỏng đó gọi là sự bay hơi.',
    },
    {
      id: 'passage_2',
      title: 'Two Words, One Journey',
      text: 'Evaporating and boiling are the same journey — liquid to gas — with different words. Water will {evaporate} at any temperature, slowly, and only from its surface. But heat it to 100 degrees C, its boiling point, and it will {boil}: bubbles of gas form all through the liquid and it changes rapidly to steam. Cool that steam on something cold, like a mirror or a bottle from the fridge, and it will {condense} back into tiny drops of liquid water. That is why a cold drink seems to sweat on a hot day.',
      vnTitle: 'Hai từ, một hành trình',
      vnText: 'Bay hơi và sôi là cùng một hành trình — lỏng sang khí — với hai từ khác nhau. Nước sẽ {evaporate} ở bất kỳ nhiệt độ nào, chậm rãi, và chỉ ở bề mặt. Nhưng đun nó đến 100 độ C, nhiệt độ sôi, và nó sẽ {boil}: các bọt khí hình thành khắp trong lòng chất lỏng và nó nhanh chóng chuyển thành hơi. Làm lạnh hơi đó trên vật lạnh, như tấm gương hay chai lấy từ tủ lạnh, và nó sẽ {condense} trở lại thành những giọt nước nhỏ. Đó là lý do một ly nước lạnh trông như đổ mồ hôi vào ngày nóng.',
    },
    {
      id: 'passage_3',
      title: 'Measuring Properly',
      text: 'Two students measure the same water and get different numbers because one of them read the scale from the wrong angle. The surface of a liquid in a measuring cylinder curves up at the edges; that curve is the {meniscus}, and you read the volume from the bottom of it with your eye level with the liquid. A {thermometer} works because the liquid inside expands as it gets hotter, so you read the top of the liquid, again at eye level. When you plot temperature against time, time goes along the horizontal {axis} and temperature goes up the vertical one — and the line climbs, then goes flat at 100 degrees C, because the heat is now turning water into steam instead of making it hotter.',
      vnTitle: 'Đo cho đúng',
      vnText: 'Hai học sinh đo cùng một lượng nước và ra hai con số khác nhau vì một bạn đọc thang đo sai góc nhìn. Mặt chất lỏng trong ống đong cong lên ở mép; đường cong đó là {meniscus}, và em đọc thể tích ở đáy của nó với mắt ngang tầm chất lỏng. {thermometer} hoạt động vì chất lỏng bên trong giãn nở khi nóng hơn, nên em đọc ở đỉnh cột chất lỏng, cũng ngang tầm mắt. Khi vẽ đồ thị nhiệt độ theo thời gian, thời gian nằm dọc theo {axis} ngang và nhiệt độ theo trục dọc — và đường đồ thị đi lên, rồi nằm ngang ở 100 độ C, vì lúc này nhiệt đang biến nước thành hơi thay vì làm nó nóng hơn.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between evaporating and boiling. Give one example of each from everyday life.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa bay hơi và sôi. Cho một ví dụ đời thường cho mỗi loại.',
      suggestedWords: [['slow', 'surface', 'any temperature'], ['fast', 'bubbles', 'boiling point', '100']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the difference: evaporation is slow, happens only at the surface and at any temperature; boiling is fast, happens all through the liquid, with bubbles, only at the boiling point (100 °C for water).',
        '1 mark for a correct example of each, e.g. a puddle drying / clothes drying on a line (evaporation) and a kettle or a pot on the stove (boiling).',
      ],
      modelAnswer: 'Both change a liquid into a gas. Evaporation is slow, happens only at the surface, and can happen at any temperature — a puddle drying in the sun, or wet clothes drying on a line. Boiling is fast, happens all through the liquid with bubbles everywhere, and only at the boiling point, 100 °C for water — a kettle or a pot on the stove.',
    },
    {
      id: 'sq2',
      question: 'Drops of water appear on the outside of a cold bottle taken from the fridge. Name the change of state and explain where the water came from.',
      vnTranslation: 'Các giọt nước xuất hiện ở mặt ngoài một chai lạnh lấy từ tủ lạnh. Hãy gọi tên sự chuyển thể và giải thích nước từ đâu đến.',
      suggestedWords: [['condensation', 'condenses'], ['water vapour', 'air'], ['cold', 'cools']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for naming condensation (gas to liquid).',
        '1 mark for explaining that invisible water vapour in the air touches the cold bottle, cools, and turns into liquid drops — the water came from the air, not through the bottle.',
      ],
      modelAnswer: 'This is condensation — a change from gas to liquid. The air contains invisible water vapour. When that vapour touches the cold surface of the bottle it cools down and condenses into tiny drops of liquid water. The water came from the air around the bottle, not from inside it.',
    },
    {
      id: 'sq3',
      question: 'Two students measure the same water in a measuring cylinder. One writes 50 cm³ and the other writes 47 cm³. Explain what one of them probably did wrong, and describe the correct way to read the cylinder.',
      vnTranslation: 'Hai học sinh đo cùng một lượng nước trong ống đong. Một bạn viết 50 cm³ và bạn kia viết 47 cm³. Hãy giải thích một trong hai bạn có thể đã làm sai điều gì, và mô tả cách đọc ống đong đúng.',
      suggestedWords: [['eye level', 'angle', 'above', 'below'], ['bottom', 'meniscus']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying one student read the scale from the wrong angle (looking from above or below instead of at eye level), which makes the reading too high or too low.',
        '1 mark for the correct method: read the bottom of the meniscus (the curved surface) with your eye level with it.',
      ],
      modelAnswer: 'One of them probably looked at the scale from above or below instead of at eye level, which makes the reading too high or too low. The correct way is to get your eye level with the liquid and read the volume from the bottom of the meniscus, the curved surface of the liquid.',
    },
    {
      id: 'sq4',
      question: 'When water is heated, its temperature rises and then stops at 100 °C even though the Bunsen burner is still on. Explain why the temperature stops rising.',
      vnTranslation: 'Khi nước được đun, nhiệt độ tăng rồi dừng lại ở 100 °C dù đèn Bunsen vẫn cháy. Hãy giải thích vì sao nhiệt độ ngừng tăng.',
      suggestedWords: [['boiling point', 'boils'], ['gas', 'steam', 'change of state']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying 100 °C is the boiling point of water, and while water boils its temperature stays the same.',
        '1 mark for explaining that the heat is being used to change the liquid into a gas (steam) instead of making the water hotter.',
      ],
      modelAnswer: '100 °C is the boiling point of water. When the water reaches it, it boils, and while it is boiling the temperature stays the same. The heat from the Bunsen is now being used to turn the liquid water into a gas, steam, instead of making the water any hotter — so the line on the graph goes flat.',
    },
  ],

  diagrams: [
    {
      id: 'd1',
      inlineSvg: DIAGRAMS.STATE_CYCLE,
      promptText: 'The diagram shows the three states and the changes between them. Name the change of state on each arrow, and say which changes need heating and which need cooling.',
      suggestedWords: [['melting', 'freezing'], ['boiling', 'evaporation'], ['condensation'], ['heating', 'cooling']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for melting (solid to liquid) and freezing (liquid to solid).',
        '1 mark for boiling or evaporation (liquid to gas) and condensation (gas to liquid).',
        '1 mark for saying melting, evaporating and boiling need heating, while freezing and condensing need cooling.',
      ],
      modelAnswer: 'Solid to liquid is melting; liquid to solid is freezing. Liquid to gas is boiling (fast) or evaporation (slow); gas to liquid is condensation. Melting, evaporating and boiling need heating — heat goes in. Freezing and condensing need cooling — heat comes out.',
    },
    {
      id: 'd2',
      inlineSvg: MEASURE.HEATING_CURVE,
      promptText: 'The graph shows the temperature of water while it was heated. Describe the shape of the line, and explain what is happening at the flat part.',
      suggestedWords: [['rises', 'goes up', 'higher'], ['flat', 'stays the same', '100'], ['boiling', 'gas', 'steam']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for describing that the temperature rises steadily at first (the longer it is heated, the higher the temperature).',
        '1 mark for saying the line goes flat at 100 °C, the boiling point, and the temperature stays the same from then on.',
        '1 mark for explaining that at the flat part the water is boiling and the heat is turning liquid into gas (steam) instead of raising the temperature.',
      ],
      modelAnswer: 'At first the line climbs steadily — the longer the water is heated, the higher its temperature becomes. Then, at 100 °C, the boiling point, the line goes flat and the temperature stays the same even though the heating continues. At the flat part the water is boiling: the heat is being used to change the liquid into steam, a gas, instead of making the water hotter.',
    },
    {
      id: 'd3',
      inlineSvg: MEASURE.MENISCUS,
      promptText: 'The diagram shows a measuring cylinder and the meniscus. Explain how to read the volume correctly, and what goes wrong if you look from above.',
      suggestedWords: [['bottom', 'meniscus'], ['eye level'], ['too high', 'wrong']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying you read from the bottom of the meniscus (the curved surface), with your eye level with it.',
        '1 mark for saying that looking from above makes you read the volume too high (and from below, too low).',
      ],
      modelAnswer: 'Get your eye level with the surface of the liquid and read the volume from the bottom of the meniscus, the curve where the liquid meets the glass. If you look down from above, the curve makes the reading look higher than it really is, so you write down a volume that is too high; from below you read too low.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's own diagrams, labels stripped
  // at runtime, a pin where each label's leader line ended (or, for a label
  // with no leader line, at the label's own text position). Coordinates from
  // `node scripts/svg-coords.mjs Y7_SCI/U02_2 <KEY>` (and `... <KEY>
  // diagramsB` for the MEASURE diagrams). Each bank carries a distractor.
  labelIt: [
    {
      id: 'cycle',
      title: 'Label the changes of state', titleVn: 'Gắn nhãn sự chuyển thể',
      inlineSvg: DIAGRAMS.STATE_CYCLE, viewBox: '0 0 900 470',
      pins: [
        { id: 'p1', x: 145, y: 212, answer: 'solid' },
        { id: 'p2', x: 450, y: 212, answer: 'liquid' },
        { id: 'p3', x: 755, y: 212, answer: 'gas' },
        { id: 'p4', x: 297, y: 166, answer: 'melt' },
        { id: 'p5', x: 297, y: 286, answer: 'freeze' },
        // "boiling" and "evaporating" share one arrow on the diagram, so one pin.
        { id: 'p6', x: 602, y: 166, answer: 'boil' },
        { id: 'p8', x: 602, y: 286, answer: 'condense' },
      ],
      bank: [
        { val: 'solid', text: 'Solid', textVn: 'Rắn' },
        { val: 'liquid', text: 'Liquid', textVn: 'Lỏng' },
        { val: 'gas', text: 'Gas', textVn: 'Khí' },
        { val: 'melt', text: 'Melting', textVn: 'Nóng chảy' },
        { val: 'freeze', text: 'Freezing', textVn: 'Đông đặc' },
        { val: 'boil', text: 'Boiling / evaporating', textVn: 'Sôi / bay hơi' },
        { val: 'condense', text: 'Condensing', textVn: 'Ngưng tụ' },
        { val: 'dissolve', text: 'Dissolving', textVn: 'Hòa tan' },
      ],
    },
    {
      id: 'apparatus',
      title: 'Label the heating apparatus', titleVn: 'Gắn nhãn bộ dụng cụ đun nóng',
      inlineSvg: MEASURE.APPARATUS, viewBox: '0 0 820 560',
      pins: [
        { id: 'p1', x: 610, y: 158, answer: 'thermometer' },
        { id: 'p2', x: 610, y: 354, answer: 'beaker' },
        { id: 'p3', x: 610, y: 400, answer: 'gauze' },
        { id: 'p4', x: 610, y: 472, answer: 'bunsen' },
        { id: 'p5', x: 250, y: 536, answer: 'mat' },
        { id: 'p6', x: 108, y: 150, answer: 'clamp' },
      ],
      bank: [
        { val: 'thermometer', text: 'Thermometer', textVn: 'Nhiệt kế' },
        { val: 'beaker', text: 'Beaker of water', textVn: 'Cốc nước' },
        { val: 'gauze', text: 'Gauze on a tripod', textVn: 'Lưới trên giá ba chân' },
        { val: 'bunsen', text: 'Bunsen burner', textVn: 'Đèn Bunsen' },
        { val: 'mat', text: 'Heat-proof mat', textVn: 'Tấm lót chịu nhiệt' },
        { val: 'clamp', text: 'Clamp stand', textVn: 'Giá kẹp' },
        { val: 'tongs', text: 'Tongs', textVn: 'Kẹp gắp' },
      ],
    },
    {
      id: 'meniscus',
      title: 'Label the measuring cylinder', titleVn: 'Gắn nhãn ống đong',
      inlineSvg: MEASURE.MENISCUS, viewBox: '0 0 760 430',
      pins: [
        { id: 'p1', x: 365, y: 134, answer: 'meniscus' },
        { id: 'p2', x: 240, y: 72, answer: 'scale' },
        { id: 'p3', x: 620, y: 290, answer: 'eye' },
      ],
      bank: [
        { val: 'meniscus', text: 'The meniscus (curved surface)', textVn: 'Mặt khum (mặt cong)' },
        { val: 'scale', text: 'The cm³ scale', textVn: 'Thang đo cm³' },
        { val: 'eye', text: 'Your eye, at eye level', textVn: 'Mắt em, ngang tầm mắt' },
        { val: 'bulb', text: 'The bulb of a thermometer', textVn: 'Bầu nhiệt kế' },
        { val: 'base', text: 'The base of the cylinder', textVn: 'Đáy ống đong' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
