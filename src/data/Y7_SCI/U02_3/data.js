// src/data/Y7_SCI/U02_3/data.js
// 2.3 Explaining Changes of State — Year 7 Science self-study unit, reduced from
// the classroom lesson y7-science/U02_3 to docs/y7-science/unit2-close-engines.md:
// an interactive deck (17 scored items), the key words, a mixed-type Workbook,
// Explain It (build · fix · name · picture — a fresh everyday scenario every
// round), Label It on three of the deck's diagrams, cloze reading and four
// reasoning questions. 145 XP available, capped at 100.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U02_3_DATA = {
  meta: {
    id: 'U02_3',
    title: 'Explaining Changes of State',
    desc: 'Why a steel bridge is longer in summer, why ice melts, why a puddle disappears and a mirror mists up — every change of state explained with particles, link by link.',
    track: 'Y7_SCI',
    icon: 'Lightbulb',
    classroom: [
      { course: 'y7-science', slug: 'U02_3', title: 'Science 2.3 · Explaining Changes of State' },
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
        { id: 'EXPLAIN_IT', dbKey: 'p73', maxXP: 20 },
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

  // Explain It (unit2-close-engines.md §2): ten rounds cycling build → fix →
  // name → picture, each with a fresh scenario drawn from utils/stateChain.js;
  // the six changes are dealt in shuffled sixes, so ten rounds meet all six.
  explainIt: {
    title: 'Explain It', titleVn: 'Giải thích bằng hạt',
    modes: ['build', 'fix', 'name', 'picture'],
    rounds: 10,
  },

  // The deck's Key word cards (the classroom's four: heat energy, transferred,
  // attractive force, expand), plus the four words the book's questions and the
  // chains lean on: vibrate, overcome, compress, flow.
  realWords: [
    {
      word: 'Attractive force', vn: 'Lực hút',
      def: 'The force that holds particles together.',
      vnDef: 'Lực giữ các hạt với nhau.',
      sent: 'The attractive forces hold the particles of ice in a fixed pattern.',
      vnSent: 'Lực hút giữ các hạt của đá theo một trật tự cố định.',
      isReal: true,
    },
    {
      word: 'Compress', vn: 'Nén',
      def: 'To squash something into a smaller space. A gas can be compressed; a solid or a liquid cannot.',
      vnDef: 'Ép một vật vào một chỗ nhỏ hơn. Chất khí nén được; chất rắn hay chất lỏng thì không.',
      sent: 'You can compress the air in a syringe, but not the water.',
      vnSent: 'Em có thể nén không khí trong ống tiêm, nhưng không nén được nước.',
      isReal: true,
    },
    {
      word: 'Expand', vn: 'Giãn nở',
      def: 'To get bigger. A solid expands when it is heated.',
      vnDef: 'To ra. Chất rắn giãn nở khi bị đun nóng.',
      sent: 'Steel rails expand on a hot day, so small gaps are left between them.',
      vnSent: 'Đường ray thép giãn nở vào ngày nóng, nên người ta để những khe hở nhỏ giữa chúng.',
      isReal: true,
    },
    {
      word: 'Flow', vn: 'Chảy',
      def: 'To move along and change shape, as a liquid or a gas does. A solid cannot flow.',
      vnDef: 'Di chuyển và thay đổi hình dạng, như chất lỏng hay chất khí. Chất rắn không chảy được.',
      sent: 'Liquids can flow because their particles slide past each other.',
      vnSent: 'Chất lỏng chảy được vì các hạt của nó trượt qua nhau.',
      isReal: true,
    },
    {
      word: 'Heat energy', vn: 'Nhiệt năng',
      def: 'The energy that makes particles move.',
      vnDef: 'Năng lượng làm các hạt chuyển động.',
      sent: 'Heat energy from the Sun is transferred to the metal roof.',
      vnSent: 'Nhiệt năng từ Mặt Trời được truyền đến mái tôn.',
      isReal: true,
    },
    {
      word: 'Overcome', vn: 'Vượt qua',
      def: 'To beat something that is holding you back. Particles with enough energy overcome the attractive forces.',
      vnDef: 'Thắng được thứ đang giữ mình lại. Các hạt có đủ năng lượng thì vượt qua được lực hút.',
      sent: 'At the boiling point, particles all through the water overcome the attractive forces.',
      vnSent: 'Ở nhiệt độ sôi, các hạt ở khắp trong nước vượt qua lực hút.',
      isReal: true,
    },
    {
      word: 'Transferred', vn: 'Được truyền',
      def: 'Moved from one place to another.',
      vnDef: 'Được di chuyển từ nơi này sang nơi khác.',
      sent: 'In the freezer, heat energy is transferred away from the water.',
      vnSent: 'Trong ngăn đá, nhiệt năng được truyền ra khỏi nước.',
      isReal: true,
    },
    {
      word: 'Vibrate', vn: 'Rung động',
      def: 'To move quickly backwards and forwards on the spot. The particles in a solid vibrate.',
      vnDef: 'Chuyển động nhanh qua lại tại chỗ. Các hạt trong chất rắn rung động.',
      sent: 'When a solid is heated, its particles vibrate more.',
      vnSent: 'Khi chất rắn bị đun nóng, các hạt của nó rung động nhiều hơn.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Room to Grow',
      text: 'On a hot afternoon, {heat energy} from the Sun is transferred to the steel of a bridge. The steel particles {vibrate} more and push a little further apart, so the steel takes up more space and the whole bridge begins to {expand}. The particles themselves do not get any bigger: only the gaps between them grow. Engineers leave small gaps in bridges and between railway rails, so the steel has room to grow on hot days and does not bend or crack.',
      vnTitle: 'Chỗ để giãn ra',
      vnText: 'Vào một buổi chiều nóng, {heat energy} từ Mặt Trời được truyền đến thép của một cây cầu. Các hạt thép {vibrate} nhiều hơn và đẩy nhau ra xa hơn một chút, nên thép chiếm nhiều chỗ hơn và cả cây cầu bắt đầu {expand}. Bản thân các hạt không to ra chút nào: chỉ khoảng cách giữa chúng tăng lên. Các kỹ sư để những khe hở nhỏ trên cầu và giữa các thanh ray, để thép có chỗ giãn ra vào những ngày nóng mà không bị cong hay nứt.',
    },
    {
      id: 'passage_2',
      title: 'From Ice to Steam',
      text: 'Leave a cube of ice in a warm room and heat energy is {transferred} to its particles. They vibrate more and more, until the {attractive force} between them can no longer hold them in a fixed pattern. They slide past each other, and the ice melts. Heat the water to 100 °C and its particles move faster and faster. At the boiling point, particles all through the water have enough energy to {overcome} the forces and escape as bubbles of gas. That gas is steam: the same water particles, now far apart.',
      vnTitle: 'Từ đá đến hơi nước',
      vnText: 'Để một viên đá trong phòng ấm thì nhiệt năng được {transferred} đến các hạt của nó. Chúng rung động ngày càng nhiều, cho đến khi {attractive force} giữa chúng không còn giữ được chúng theo trật tự cố định. Chúng trượt qua nhau, và đá nóng chảy. Đun nước đến 100 °C thì các hạt của nó chuyển động ngày càng nhanh. Ở nhiệt độ sôi, các hạt ở khắp trong nước có đủ năng lượng để {overcome} lực hút và thoát ra thành các bọt khí. Khí đó là hơi nước: vẫn những hạt nước đó, nay ở xa nhau.',
    },
    {
      id: 'passage_3',
      title: 'Squash It or Pour It?',
      text: 'Block the end of a syringe full of air and push the plunger. You can {compress} the air into a smaller space, because its particles are far apart with empty space between them. Try it with water and the plunger hardly moves: in a liquid the particles are already touching, so there is no space to squash them into, and a solid is the same. Liquids and gases can both {flow}, because their particles are not held in a fixed pattern. In a solid the particles can only {vibrate} on the spot.',
      vnTitle: 'Ép được hay rót được?',
      vnText: 'Bịt đầu một ống tiêm chứa đầy không khí rồi đẩy pít-tông. Em có thể {compress} không khí vào một chỗ nhỏ hơn, vì các hạt của nó ở xa nhau và giữa chúng có khoảng trống. Thử với nước thì pít-tông hầu như không di chuyển: trong chất lỏng các hạt đã chạm nhau, nên không có chỗ trống để ép chúng vào, và chất rắn cũng vậy. Chất lỏng và chất khí đều có thể {flow}, vì các hạt của chúng không bị giữ theo trật tự cố định. Trong chất rắn, các hạt chỉ có thể {vibrate} tại chỗ.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'A metal bridge is longer in summer than in winter. Use particle theory to explain why, and say why engineers leave small gaps in the bridge.',
      vnTranslation: 'Một cây cầu kim loại dài hơn vào mùa hè so với mùa đông. Dùng lý thuyết hạt để giải thích vì sao, và nói vì sao các kỹ sư để những khe hở nhỏ trên cầu.',
      suggestedWords: [['heat energy', 'transferred'], ['vibrate more', 'more space'], ['expands', 'gaps', 'room']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the particle explanation: in summer more heat energy is transferred to the metal, so its particles vibrate more and take up more space, and the metal expands (accept "move more"). An answer that says the particles get bigger, melt, or that new particles are made does not get this mark.',
        '1 mark for the gaps: they give the metal room to expand on hot days, so the bridge does not push, bend or crack.',
      ],
      modelAnswer: 'In summer more heat energy is transferred to the metal. Its particles vibrate more and take up more space, so the metal expands and the bridge gets longer. The particles do not get bigger; only the gaps between them grow. Engineers leave gaps so the metal has room to expand on hot days, so the bridge does not push against itself, bend or crack.',
    },
    {
      id: 'sq2',
      question: 'Use particle theory to explain why solids and liquids cannot be compressed, but gases can.',
      vnTranslation: 'Dùng lý thuyết hạt để giải thích vì sao chất rắn và chất lỏng không thể bị nén, nhưng chất khí thì có thể.',
      suggestedWords: [['touching', 'close together'], ['no space'], ['far apart', 'empty space']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark: in solids and liquids the particles are already touching (very close together), so there is no space to squash them into.',
        '1 mark: in a gas the particles are far apart with empty space between them, so they can be pushed closer together.',
      ],
      modelAnswer: 'In a solid and in a liquid the particles are already touching each other, so there is no empty space to squash them into, and they cannot be compressed. In a gas the particles are far apart with a lot of empty space between them, so pushing on a gas moves the particles closer together: a gas can be compressed.',
    },
    {
      id: 'sq3',
      question: 'Use particle theory to explain why liquids and gases can flow, but solids cannot.',
      vnTranslation: 'Dùng lý thuyết hạt để giải thích vì sao chất lỏng và chất khí có thể chảy, nhưng chất rắn thì không.',
      suggestedWords: [['fixed pattern', 'attractive forces'], ['vibrate on the spot'], ['slide past each other', 'move freely']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark: in a solid the attractive forces hold the particles in a fixed pattern; they can only vibrate on the spot, so a solid keeps its shape.',
        '1 mark: in a liquid the particles can slide past each other, and in a gas they move freely, so liquids and gases can flow (change shape).',
      ],
      modelAnswer: 'In a solid the attractive forces hold the particles in a fixed pattern. They can only vibrate on the spot, so the solid keeps its shape and cannot flow. In a liquid the particles are still touching, but they can slide past each other, and in a gas the particles are far apart and move freely in every direction. Because their particles are not held in place, liquids and gases can flow.',
    },
    {
      id: 'sq4',
      question: 'Drops of water form on the outside of a glass of cà phê sữa đá. Use particle theory to explain where the drops come from.',
      vnTranslation: 'Những giọt nước đọng bên ngoài một cốc cà phê sữa đá. Dùng lý thuyết hạt để giải thích những giọt nước đó đến từ đâu.',
      suggestedWords: [['water vapour', 'air'], ['heat energy', 'transferred away'], ['slow down', 'attractive forces', 'condense']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark: the drops come from water vapour in the air (not from inside the glass), which touches the cold glass.',
        '1 mark: heat energy is transferred away from the water vapour particles to the cold glass; they slow down and the attractive forces pull them together into a liquid — they condense.',
      ],
      modelAnswer: 'The drops come from the water vapour in the air, not from the coffee. When the water vapour touches the cold glass, heat energy is transferred away from its particles to the glass. The particles slow down, and the attractive forces pull them close together into drops of liquid water: the water vapour condenses on the glass.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the deck's own diagrams, labels stripped
  // at runtime. (x, y) is where a box meets its leader line and `to` is the part
  // it names; a pin with no `to` is a box centred on (x, y), where a caption sat.
  // Coordinates from `node scripts/svg-coords.mjs Y7_SCI/U02_3 <KEY>`. Every
  // distractor is a misconception the deck names, and absent from the drawing.
  labelIt: [
    {
      id: 'heating_melting',
      title: 'Label the solid as it is heated', titleVn: 'Gắn nhãn chất rắn khi bị đun nóng',
      inlineSvg: DIAGRAMS.HEATING_TO_MELTING, viewBox: '0 0 940 420', slotW: 236,
      // The three panel captions, and the two arrows between the panels.
      pins: [
        { id: 'p1', x: 150, y: 345, answer: 'solid' },
        { id: 'p2', x: 475, y: 345, answer: 'expanding' },
        { id: 'p3', x: 790, y: 345, answer: 'liquid' },
        { id: 'p4', x: 313, y: 62, to: [313, 185], side: 'above', answer: 'heat' },
        { id: 'p5', x: 633, y: 62, to: [633, 185], side: 'above', answer: 'forces' },
      ],
      bank: [
        { val: 'solid', text: 'Solid: vibrating on the spot', textVn: 'Rắn: rung động tại chỗ' },
        { val: 'expanding', text: 'Expanding: more space, same size', textVn: 'Giãn nở: nhiều chỗ hơn, cùng kích thước' },
        { val: 'liquid', text: 'Liquid: sliding past each other', textVn: 'Lỏng: trượt qua nhau' },
        { val: 'heat', text: 'Heat energy transferred', textVn: 'Nhiệt năng được truyền' },
        { val: 'forces', text: 'Forces can no longer hold them', textVn: 'Lực hút không còn giữ được' },
        { val: 'bigger', text: 'Particles getting bigger', textVn: 'Các hạt to ra' },
        { val: 'away', text: 'Heat energy taken away', textVn: 'Nhiệt năng bị lấy đi' },
      ],
    },
    {
      id: 'boiling',
      title: 'Label the boiling liquid', titleVn: 'Gắn nhãn chất lỏng đang sôi',
      inlineSvg: DIAGRAMS.BOILING, viewBox: '0 0 640 400', slotW: 120,
      // Boxes in the two side margins the port added.
      pins: [
        { id: 'p1', x: 515, y: 178, to: [492, 178], side: 'right', answer: 'surface' },
        { id: 'p2', x: 132, y: 120, to: [211, 136], side: 'left', answer: 'gas' },
        { id: 'p3', x: 132, y: 282, to: [154, 300], side: 'left', answer: 'liquid' },
      ],
      bank: [
        { val: 'surface', text: 'The surface', textVn: 'Bề mặt' },
        { val: 'gas', text: 'Escaping as a gas', textVn: 'Thoát ra dưới dạng khí' },
        { val: 'liquid', text: 'Liquid: moving faster', textVn: 'Lỏng: chuyển động nhanh dần' },
        { val: 'air', text: 'Bubbles of air', textVn: 'Bọt không khí' },
        { val: 'bigger', text: 'Particles getting bigger', textVn: 'Các hạt to ra' },
      ],
    },
    {
      id: 'condensing',
      title: 'Label the condensing gas', titleVn: 'Gắn nhãn chất khí đang ngưng tụ',
      inlineSvg: DIAGRAMS.CONDENSING, viewBox: '0 0 640 400', slotW: 120,
      pins: [
        { id: 'p1', x: 515, y: 120, to: [500, 120], side: 'right', answer: 'cold' },
        { id: 'p2', x: 132, y: 250, to: [161, 257], side: 'left', answer: 'fast' },
        { id: 'p3', x: 395, y: 306, to: [405, 295], side: 'below', answer: 'slow' },
      ],
      bank: [
        { val: 'cold', text: 'Cold surface', textVn: 'Bề mặt lạnh' },
        { val: 'fast', text: 'Gas: fast and far apart', textVn: 'Khí: nhanh, ở xa nhau' },
        { val: 'slow', text: 'Slowed down, pulled together', textVn: 'Chậm lại, bị kéo lại gần' },
        { val: 'smaller', text: 'Particles getting smaller', textVn: 'Các hạt nhỏ lại' },
        { val: 'cold_in', text: 'Cold energy going in', textVn: 'Năng lượng lạnh đi vào' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
