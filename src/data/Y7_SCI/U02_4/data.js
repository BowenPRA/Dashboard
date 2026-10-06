// src/data/Y7_SCI/U02_4/data.js
// 2.4 The Water Cycle — Year 7 Science self-study unit, reduced from the
// classroom lesson y7-science/U02_4 to docs/y7-science/unit2-close-engines.md
// §1 and §3: an interactive deck (17 scored items, four of them the new `cycle`
// activity), the book's key words, a mixed-type Workbook, Water Journey (name,
// tap and order the arrows of the cycle, what the water does, everyday
// sentences), Label It on three of the deck's diagrams, cloze reading and four
// reasoning questions. 145 XP available, capped at 100.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U02_4_DATA = {
  meta: {
    id: 'U02_4',
    title: 'The Water Cycle',
    desc: 'The same water, round and round for four billion years: up as an invisible gas, into clouds of tiny drops, down as rain, snow or hail — and where it lands. Eight key words, and the particles behind each one.',
    track: 'Y7_SCI',
    icon: 'Droplets',
    classroom: [
      { course: 'y7-science', slug: 'U02_4', title: 'Science 2.4 · The Water Cycle' },
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
      // 25 of the 35 XP before it (71%).
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'WATER_JOURNEY', dbKey: 'p74', maxXP: 20 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 15 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 15 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // Quiz and arcade share one gate at 80 of the 125 XP before it (64%).
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Water Journey (unit2-close-engines.md §3): rounds cycle arrow → tap →
  // journey → state → everyday, drawn fresh from a seed on the engine's own
  // diagram (utils/waterCycle.js). Journeys are marked by walking the graph.
  waterJourney: {
    title: 'Water Journey', titleVn: 'Hành trình của nước',
    modes: ['arrow', 'tap', 'journey', 'state', 'everyday'],
    rounds: 10,
  },

  // The book's eight key words (p. 46), definitions from the deck's Key word
  // cards, plus evaporation and condensation, which every stage leans on (the
  // classroom left them out of the copy-down because 2.2 already had them).
  realWords: [
    {
      word: 'Water cycle', vn: 'Vòng tuần hoàn của nước',
      def: 'Water moving round and round between the land, the sea and the sky.',
      vnDef: 'Nước di chuyển vòng quanh giữa đất, biển và bầu trời.',
      sent: 'The water cycle has used the same water for four billion years.',
      vnSent: 'Vòng tuần hoàn của nước đã dùng cùng một lượng nước suốt bốn tỉ năm.',
      isReal: true,
    },
    {
      word: 'Atmosphere', vn: 'Khí quyển',
      def: 'The air around the Earth.',
      vnDef: 'Lớp không khí bao quanh Trái Đất.',
      sent: 'Water vapour from the sea rises into the atmosphere.',
      vnSent: 'Hơi nước từ biển bay lên khí quyển.',
      isReal: true,
    },
    {
      word: 'Water vapour', vn: 'Hơi nước',
      def: 'Water as a gas. You cannot see it.',
      vnDef: 'Nước ở thể khí. Em không nhìn thấy nó.',
      sent: 'There is water vapour all around you, but you cannot see it.',
      vnSent: 'Có hơi nước ở khắp quanh em, nhưng em không nhìn thấy nó.',
      isReal: true,
    },
    {
      word: 'Evaporation', vn: 'Sự bay hơi',
      def: 'A liquid changing slowly into a gas, from its surface. In the water cycle, the Sun evaporates water from the sea.',
      vnDef: 'Chất lỏng chuyển dần thành khí, từ bề mặt của nó. Trong vòng tuần hoàn của nước, Mặt Trời làm nước biển bay hơi.',
      sent: 'Evaporation from the sea puts most of the water vapour into the air.',
      vnSent: 'Sự bay hơi từ biển đưa phần lớn hơi nước vào không khí.',
      isReal: true,
    },
    {
      word: 'Transpiration', vn: 'Sự thoát hơi nước',
      def: 'Water leaving a plant through its leaves.',
      vnDef: 'Nước đi ra khỏi cây qua lá.',
      sent: 'A rice field loses water by transpiration through its rice plants.',
      vnSent: 'Ruộng lúa mất nước do sự thoát hơi nước qua cây lúa.',
      isReal: true,
    },
    {
      word: 'Condensation', vn: 'Sự ngưng tụ',
      def: 'A gas changing back into a liquid as it cools. Clouds form by condensation.',
      vnDef: 'Chất khí chuyển trở lại thành chất lỏng khi lạnh đi. Mây hình thành do sự ngưng tụ.',
      sent: 'The drops on a cold glass of iced coffee come from condensation.',
      vnSent: 'Những giọt nước trên ly cà phê đá lạnh là do sự ngưng tụ.',
      isReal: true,
    },
    {
      word: 'Precipitation', vn: 'Giáng thủy',
      def: 'Water falling from clouds — rain, snow, hail or sleet.',
      vnDef: 'Nước rơi từ đám mây — mưa, tuyết, mưa đá hoặc mưa tuyết.',
      sent: 'Snow is precipitation, even though it is solid.',
      vnSent: 'Tuyết là giáng thủy, dù nó là chất rắn.',
      isReal: true,
    },
    {
      word: 'Open water', vn: 'Mặt nước hở',
      def: 'Big water you can see — rivers, large lakes and the oceans.',
      vnDef: 'Vùng nước lớn nhìn thấy được — sông, hồ lớn và đại dương.',
      sent: 'Rain that falls into open water can evaporate again.',
      vnSent: 'Mưa rơi xuống mặt nước hở có thể bay hơi trở lại.',
      isReal: true,
    },
    {
      word: 'Surface run-off', vn: 'Dòng chảy bề mặt',
      def: 'Water flowing across the ground into rivers. It carries the soil away.',
      vnDef: 'Nước chảy trên mặt đất vào sông. Nó cuốn đất đi.',
      sent: 'Terraces slow the surface run-off on a steep hill.',
      vnSent: 'Ruộng bậc thang làm chậm dòng chảy bề mặt trên đồi dốc.',
      isReal: true,
    },
    {
      word: 'Groundwater', vn: 'Nước ngầm',
      def: 'Water that soaks into the soil and rocks. We pump it back up to drink.',
      vnDef: 'Nước thấm vào đất và đá. Ta bơm nó lên để uống.',
      sent: 'The village well brings groundwater up from deep in the rocks.',
      vnSent: 'Giếng làng đưa nước ngầm lên từ sâu trong lòng đá.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Up Into the Air',
      text: 'The Sun heats the sea, and the water particles move faster. Some break free from the surface as a gas, and this is called {evaporation}. The gas is {water vapour}, and you cannot see it. Plants put water into the air too: water leaves through their leaves as vapour, and this is called {transpiration}. All this vapour rises into the atmosphere, the air around the Earth. High up, the air is cold, so the vapour cools and turns back into tiny drops. Millions of drops make a cloud.',
      vnTitle: 'Đi lên không khí',
      vnText: 'Mặt Trời làm nóng biển, và các hạt nước chuyển động nhanh hơn. Một số thoát ra khỏi bề mặt thành khí, và quá trình này gọi là {evaporation}. Chất khí đó là {water vapour}, và em không nhìn thấy nó. Cây cối cũng đưa nước vào không khí: nước đi ra qua lá ở dạng hơi, và quá trình này gọi là {transpiration}. Tất cả hơi nước này bay lên khí quyển, lớp không khí bao quanh Trái Đất. Trên cao không khí lạnh, nên hơi nước lạnh đi và trở lại thành những giọt nhỏ. Hàng triệu giọt nhỏ tạo thành một đám mây.',
    },
    {
      id: 'passage_2',
      title: 'Rain, Snow and Hail',
      text: 'When water vapour cools high in the sky, its particles slow down and pull together into tiny drops. This is {condensation}, and the drops make a cloud. The drops bump into each other and join up. When they are too heavy for the air to hold, they fall as {precipitation}: rain, snow, hail or sleet. Snow and hail froze inside the cloud before they fell. Some rain falls straight into the sea, a lake or a river. This is {open water}, and from there the water can evaporate again.',
      vnTitle: 'Mưa, tuyết và mưa đá',
      vnText: 'Khi hơi nước lạnh đi trên cao, các hạt của nó chậm lại và hút nhau thành những giọt nhỏ. Đây là {condensation}, và các giọt tạo thành một đám mây. Các giọt va vào nhau và nhập lại. Khi chúng quá nặng, không khí không giữ nổi, chúng rơi xuống thành {precipitation}: mưa, tuyết, mưa đá hoặc mưa tuyết. Tuyết và mưa đá đã đông đặc trong mây trước khi rơi. Một phần mưa rơi thẳng xuống biển, hồ hoặc sông. Đó là {open water}, và từ đó nước có thể bay hơi trở lại.',
    },
    {
      id: 'passage_3',
      title: 'Where the Rain Goes',
      text: 'Rain that lands on soil does one of two things. Some of it flows across the ground into streams and rivers. This {surface run-off} can carry the soil away, so farmers on steep hills build terraces to hold the water back. The rest soaks down into the soil and rocks and becomes {groundwater}. It can stay there for years before it reaches a river or the sea, or a well brings it back up. No new water is ever made: the same water goes round and round in the {water cycle}.',
      vnTitle: 'Mưa đi đâu',
      vnText: 'Mưa rơi xuống đất sẽ đi theo một trong hai đường. Một phần chảy trên mặt đất vào suối và sông. {surface run-off} này có thể cuốn đất đi, nên nông dân trên những ngọn đồi dốc làm ruộng bậc thang để giữ nước lại. Phần còn lại thấm xuống đất và đá và trở thành {groundwater}. Nó có thể nằm ở đó nhiều năm trước khi đến sông hoặc biển, hoặc được giếng đưa lên lại. Không bao giờ có nước mới được tạo ra: cùng một lượng nước đi vòng quanh mãi trong {water cycle}.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Describe how rain forms. Start with water in the sea.',
      vnTranslation: 'Mô tả mưa hình thành như thế nào. Bắt đầu từ nước trong biển.',
      suggestedWords: [['evaporates', 'water vapour', 'rises'], ['cools', 'condenses', 'cloud'], ['join', 'too heavy', 'precipitation']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the way up: the Sun heats the sea and the water evaporates, becoming water vapour (a gas) that rises into the air.',
        '1 mark for the way down: the vapour cools and condenses into tiny drops that make a cloud; the drops join up until they are too heavy for the air to hold, and fall as rain (precipitation).',
      ],
      modelAnswer: 'The Sun heats the sea, and some of the water evaporates. It becomes water vapour, a gas, and rises into the air. High up the air is cold, so the vapour cools and condenses into tiny drops of liquid water, which make a cloud. The drops bump into each other and join up. When they are too heavy for the air to hold, they fall as rain. This is precipitation.',
    },
    {
      id: 'sq2',
      question: 'Wet clothes on a washing line dry faster on a sunny day than on a cloudy day. Use particles to explain why.',
      vnTranslation: 'Quần áo ướt trên dây phơi khô nhanh hơn vào ngày nắng so với ngày nhiều mây. Dùng kiến thức về hạt để giải thích vì sao.',
      suggestedWords: [['evaporation', 'escape', 'gas'], ['heat energy', 'transferred', 'particles'], ['move faster', 'more particles']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the clothes dry by evaporation: water particles escape from the cloth into the air as a gas (water vapour).',
        '1 mark for explaining the Sun: on a sunny day more heat energy is transferred to the water particles, so they move faster and more of them have enough energy to break free each second — evaporation is faster.',
      ],
      modelAnswer: 'The clothes dry by evaporation: water particles break free from the cloth and escape into the air as water vapour, a gas. On a sunny day the Sun transfers more heat energy to the water particles. They move faster, so more of them have enough energy to break away from the other particles and escape. That makes evaporation faster, so the clothes dry sooner.',
    },
    {
      id: 'sq3',
      question: 'Your friend points at the white cloud a little way above a boiling kettle and says: "Look, I can see the water vapour!" Explain why your friend is wrong, and say what they can see.',
      vnTranslation: 'Bạn của em chỉ vào làn khói trắng cách vòi ấm nước đang sôi một khoảng nhỏ và nói: "Nhìn kìa, mình thấy hơi nước!" Hãy giải thích vì sao bạn ấy sai, và nói bạn ấy đang nhìn thấy gì.',
      suggestedWords: [['water vapour', 'gas', 'invisible'], ['gap', 'spout'], ['cools', 'condenses', 'tiny drops', 'liquid']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying water vapour is a gas and is invisible — it is in the clear gap just above the spout, where you can see nothing.',
        '1 mark for saying the white cloud is tiny drops of liquid water: the vapour cooled in the air and condensed.',
      ],
      modelAnswer: 'Water vapour is a gas, and you cannot see it. It is in the clear gap just above the spout, where there seems to be nothing. A little higher, the vapour meets the cooler air, cools and condenses into tiny drops of liquid water. The white cloud your friend can see is those drops, not the vapour.',
    },
    {
      id: 'sq4',
      question: 'A rice field loses water into the air in two different ways. Name the two processes and explain the difference between them.',
      vnTranslation: 'Ruộng lúa mất nước vào không khí theo hai cách khác nhau. Hãy gọi tên hai quá trình và giải thích sự khác nhau giữa chúng.',
      suggestedWords: [['evaporation', 'surface', 'water'], ['transpiration', 'leaves', 'plants'], ['liquid', 'gas']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for evaporation: water leaves from the surface of the water (or the wet soil) as water vapour.',
        '1 mark for transpiration: water leaves through the leaves of the rice plants as water vapour. (Both turn liquid water into a gas; the difference is where it leaves from.)',
      ],
      modelAnswer: 'The two processes are evaporation and transpiration. In evaporation, water leaves from the surface of the water in the field and goes into the air as water vapour. In transpiration, the rice plants take water in through their roots and it leaves through their leaves as water vapour. Both change liquid water into a gas; the difference is that transpiration goes through the plants.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the deck's own diagrams, labels stripped
  // at runtime. Each pin is a blank box on the classroom label's leader line:
  // (x, y) is where the line meets the box, `to` is the part it names.
  // Coordinates from `node scripts/svg-coords.mjs Y7_SCI/U02_4 <KEY>`. Every
  // distractor is absent from the drawing: nothing boils or melts or freezes
  // in it, and there is no smoke and no ice.
  labelIt: [
    {
      id: 'water_cycle',
      title: 'Label the water cycle', titleVn: 'Gắn nhãn vòng tuần hoàn của nước',
      inlineSvg: DIAGRAMS.WATER_CYCLE, viewBox: '0 0 1160 520', slotW: 220,
      pins: [
        { id: 'p1', x: 250, y: 96, to: [288, 152], side: 'left', answer: 'precipitation' },
        { id: 'p2', x: 820, y: 64, to: [884, 88], side: 'above', answer: 'condensation' },
        { id: 'p3', x: 935, y: 271, to: [968, 240], side: 'right', answer: 'evaporation' },
        { id: 'p4', x: 660, y: 171, to: [706, 232], side: 'left', answer: 'transpiration' },
        { id: 'p5', x: 410, y: 351, to: [494, 266], side: 'left', answer: 'runoff' },
        { id: 'p6', x: 570, y: 466, to: [556, 449], side: 'below', answer: 'groundwater' },
      ],
      bank: [
        { val: 'precipitation', text: 'Precipitation', textVn: 'Giáng thủy' },
        { val: 'condensation', text: 'Condensation', textVn: 'Sự ngưng tụ' },
        { val: 'evaporation', text: 'Evaporation', textVn: 'Sự bay hơi' },
        { val: 'transpiration', text: 'Transpiration', textVn: 'Sự thoát hơi nước' },
        { val: 'runoff', text: 'Surface run-off', textVn: 'Dòng chảy bề mặt' },
        { val: 'groundwater', text: 'Groundwater', textVn: 'Nước ngầm' },
        { val: 'boiling', text: 'Boiling', textVn: 'Sự sôi' },
        { val: 'melting', text: 'Melting', textVn: 'Sự nóng chảy' },
      ],
    },
    {
      id: 'vapour_gap',
      title: 'Label the kettle: what can you see?', titleVn: 'Gắn nhãn ấm nước: em nhìn thấy gì?',
      inlineSvg: DIAGRAMS.VAPOUR_GAP, viewBox: '0 0 1160 470', slotW: 300,
      // The dashed gap at the spout is where the gas is; the white cloud above
      // it is what you see.
      pins: [
        { id: 'p1', x: 270, y: 172, to: [476, 204], side: 'above', answer: 'vapour' },
        { id: 'p2', x: 830, y: 165, to: [808, 182], side: 'above', answer: 'drops' },
      ],
      bank: [
        { val: 'vapour', text: 'Water vapour — a gas', textVn: 'Hơi nước — chất khí' },
        { val: 'drops', text: 'Tiny drops of liquid water', textVn: 'Những giọt nước lỏng rất nhỏ' },
        { val: 'smoke', text: 'Smoke', textVn: 'Khói' },
        { val: 'ice', text: 'Ice crystals', textVn: 'Tinh thể băng' },
      ],
    },
    {
      id: 'ations',
      title: 'Name each picture: the -ation words', titleVn: 'Gọi tên từng hình: các từ -ation',
      inlineSvg: DIAGRAMS.ATIONS, viewBox: '0 0 1120 470', slotW: 220,
      // A box where each naming word was printed; the pictogram below it — the
      // sea, the leaves, the cloud of drops, the rain — says which it is.
      pins: [
        { id: 'p1', x: 148, y: 182, answer: 'evaporation' },
        { id: 'p2', x: 424, y: 182, answer: 'transpiration' },
        { id: 'p3', x: 700, y: 182, answer: 'condensation' },
        { id: 'p4', x: 976, y: 182, answer: 'precipitation' },
      ],
      bank: [
        { val: 'evaporation', text: 'Evaporation', textVn: 'Sự bay hơi' },
        { val: 'transpiration', text: 'Transpiration', textVn: 'Sự thoát hơi nước' },
        { val: 'condensation', text: 'Condensation', textVn: 'Sự ngưng tụ' },
        { val: 'precipitation', text: 'Precipitation', textVn: 'Giáng thủy' },
        { val: 'boiling', text: 'Boiling', textVn: 'Sự sôi' },
        { val: 'freezing', text: 'Freezing', textVn: 'Sự đông đặc' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
