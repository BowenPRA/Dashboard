// src/data/Y7_SCI/U01_3/data.js
// 1.3 Specialised Cells — Year 7 Science self-study unit, rebuilt to the
// engagement plan (docs/y7-science/ENGAGEMENT-PLAN.md §3): a mixed-type
// Workbook and a Label It task replace Spelling, and the phases block now
// matches the exemplar (U01_1) exactly.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U01_3_DATA = {
  meta: {
    id: 'U01_3',
    title: 'Specialised Cells: Built for the Job',
    desc: 'Three animal cells and two plant cells, each shaped by its job — structure fits function, and the sentence that says so.',
    track: 'Y7_SCI',
    icon: 'Activity',
    classroom: [{ course: 'y7-science', slug: 'U01_3', title: 'Science 1.3 · Specialised Cells' }],
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
      // variety lives: a mixed-type workbook, the labelling task, the reading,
      // the AI-marked questions and diagrams (ENGAGEMENT-PLAN §3).
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 20 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 15 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 15 },
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

  realWords: [
    {
      word: 'Function', vn: 'Chức năng',
      def: 'The job a cell does, or the role it plays.',
      vnDef: 'Nhiệm vụ mà tế bào làm, hay vai trò nó đảm nhận.',
      sent: 'The function of a red blood cell is to carry oxygen.',
      vnSent: 'Chức năng của tế bào hồng cầu là vận chuyển oxy.',
      isReal: true,
    },
    {
      word: 'Specialised', vn: 'Chuyên hoá',
      def: 'Built for one particular job. A specialised cell has a structure that helps it carry out its function really well.',
      vnDef: 'Được tạo ra cho một nhiệm vụ cụ thể. Tế bào chuyên hoá có cấu trúc giúp nó thực hiện chức năng thật tốt.',
      sent: 'A neurone is a specialised cell that carries electrical signals.',
      vnSent: 'Tế bào thần kinh là một tế bào chuyên hoá truyền tín hiệu điện.',
      isReal: true,
    },
    {
      word: 'Adapted', vn: 'Thích nghi',
      def: 'Changed in shape or structure so that it can do its job better.',
      vnDef: 'Được thay đổi về hình dạng hoặc cấu trúc để làm nhiệm vụ tốt hơn.',
      sent: 'A root hair cell is adapted to absorb water because it has a long, thin hair.',
      vnSent: 'Tế bào lông hút thích nghi để hút nước vì nó có một lông dài và mảnh.',
      isReal: true,
    },
    {
      word: 'Haemoglobin', vn: 'Haemoglobin',
      def: 'The red pigment in a red blood cell that holds oxygen.',
      vnDef: 'Sắc tố đỏ trong tế bào hồng cầu giữ lấy oxy.',
      sent: 'A red blood cell has no nucleus, which leaves more room for haemoglobin.',
      vnSent: 'Tế bào hồng cầu không có nhân, nên có thêm chỗ cho haemoglobin.',
      isReal: true,
    },
    {
      word: 'Capillary', vn: 'Mao mạch',
      def: 'The narrowest kind of blood vessel. A red blood cell is small enough to fit through one.',
      vnDef: 'Loại mạch máu hẹp nhất. Tế bào hồng cầu đủ nhỏ để đi lọt qua.',
      sent: 'The red blood cell bent in half to get through the capillary.',
      vnSent: 'Tế bào hồng cầu gập đôi lại để đi qua mao mạch.',
      isReal: true,
    },
    {
      word: 'Axon', vn: 'Sợi trục',
      def: 'The very long strand of a neurone that carries electrical signals a long way.',
      vnDef: 'Sợi rất dài của tế bào thần kinh, truyền tín hiệu điện đi xa.',
      sent: 'The axon of one neurone can be a metre long.',
      vnSent: 'Sợi trục của một tế bào thần kinh có thể dài một mét.',
      isReal: true,
    },
    {
      word: 'Cilia', vn: 'Lông rung',
      def: 'Tiny moving hairs on a ciliated cell that sweep mucus, dust and germs away from the lungs.',
      vnDef: 'Những sợi lông nhỏ chuyển động trên tế bào có lông rung, quét chất nhầy, bụi và vi khuẩn ra xa khỏi phổi.',
      sent: 'The cilia beat about twelve times a second.',
      vnSent: 'Lông rung đập khoảng mười hai lần một giây.',
      isReal: true,
    },
    {
      word: 'Absorb', vn: 'Hấp thụ',
      def: 'To soak up. A root hair cell absorbs water from the soil.',
      vnDef: 'Hút vào. Tế bào lông hút hấp thụ nước từ đất.',
      sent: 'The long root hair gives a big surface to absorb water through.',
      vnSent: 'Lông hút dài tạo bề mặt lớn để hấp thụ nước.',
      isReal: true,
    },
    {
      word: 'Photosynthesis', vn: 'Quang hợp',
      def: 'The way a plant makes its own food using sunlight, inside its chloroplasts.',
      vnDef: 'Cách cây tự tạo thức ăn nhờ ánh sáng mặt trời, bên trong lục lạp.',
      sent: 'Palisade cells are packed with chloroplasts for photosynthesis.',
      vnSent: 'Tế bào mô giậu chứa đầy lục lạp để quang hợp.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Two Hundred Kinds of Cell',
      text: 'You are made of about 100 trillion cells, but they are not 100 trillion copies of one thing. Your body builds about 200 different kinds, and each kind has a different shape because it has a different job. The job a cell does is called its {function}. A cell built for one particular job is {specialised}: its structure helps it carry out its function really well, and it cannot do the others. Scientists say the cell is {adapted} to its job — like a specialist doctor, brilliant at one thing.',
      vnTitle: 'Hai trăm loại tế bào',
      vnText: 'Em được tạo nên từ khoảng 100 nghìn tỉ tế bào, nhưng chúng không phải 100 nghìn tỉ bản sao của một thứ. Cơ thể em tạo ra khoảng 200 loại khác nhau, và mỗi loại có hình dạng khác nhau vì có nhiệm vụ khác nhau. Nhiệm vụ mà tế bào làm được gọi là {function}. Một tế bào được tạo ra cho một nhiệm vụ cụ thể là {specialised}: cấu trúc của nó giúp nó thực hiện chức năng thật tốt, và nó không làm được những việc khác. Các nhà khoa học nói tế bào đó {adapted} với nhiệm vụ của nó — như một bác sĩ chuyên khoa, xuất sắc ở một việc.',
    },
    {
      id: 'passage_2',
      title: 'Three Animal Cells',
      text: 'A red blood cell carries oxygen. Its cytoplasm is full of a red pigment called {haemoglobin}, which holds the oxygen, and it has no nucleus, which leaves more room for that pigment. It is also small enough to squeeze through the narrowest blood vessel, a {capillary}. A neurone carries electrical signals: its very long {axon} lets a signal travel far and fast — one neurone can reach from your back to your big toe. A ciliated cell lines your airways; the tiny moving hairs along its top, the {cilia}, sweep mucus, dust and germs up and away from your lungs.',
      vnTitle: 'Ba tế bào động vật',
      vnText: 'Tế bào hồng cầu vận chuyển oxy. Tế bào chất của nó chứa đầy một sắc tố đỏ gọi là {haemoglobin}, giữ lấy oxy, và nó không có nhân, nên có thêm chỗ cho sắc tố đó. Nó cũng đủ nhỏ để lách qua mạch máu hẹp nhất, một {capillary}. Tế bào thần kinh truyền tín hiệu điện: {axon} rất dài của nó cho phép tín hiệu đi xa và nhanh — một tế bào thần kinh có thể kéo dài từ lưng xuống ngón chân cái. Tế bào có lông rung lót đường thở; những sợi lông nhỏ chuyển động ở mép trên, các {cilia}, quét chất nhầy, bụi và vi khuẩn lên và ra xa khỏi phổi.',
    },
    {
      id: 'passage_3',
      title: 'Two Plant Cells',
      text: 'Root hair cells grow on the outside of a plant’s roots. Their job is to {absorb} water from the soil, so each one has a long, thin hair pushing out between the soil grains — a big surface for water to move in through. They have no chloroplasts, because roots are underground in the dark. Palisade cells are found near the top of the leaf. Their job is to make food by {photosynthesis}, so they are tall and packed with chloroplasts, standing where the sunlight arrives first.',
      vnTitle: 'Hai tế bào thực vật',
      vnText: 'Tế bào lông hút mọc ở mặt ngoài rễ cây. Nhiệm vụ của chúng là {absorb} nước từ đất, nên mỗi tế bào có một lông dài và mảnh đẩy ra giữa các hạt đất — một bề mặt lớn để nước đi vào. Chúng không có lục lạp, vì rễ nằm dưới đất trong bóng tối. Tế bào mô giậu nằm gần mặt trên của lá. Nhiệm vụ của chúng là tạo thức ăn bằng {photosynthesis}, nên chúng cao và chứa đầy lục lạp, đứng ở nơi ánh sáng đến đầu tiên.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Use the sentence frame "A ___ is adapted to ___ because it has ___" to describe a red blood cell. Give two adaptations.',
      vnTranslation: 'Dùng mẫu câu "A ___ is adapted to ___ because it has ___" để mô tả tế bào hồng cầu. Nêu hai đặc điểm thích nghi.',
      suggestedWords: [['adapted'], ['oxygen'], ['haemoglobin', 'no nucleus', 'small']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the frame with the correct job: a red blood cell is adapted to carry oxygen.',
        '1 mark for two adaptations from: it is full of haemoglobin / it has no nucleus (more room for haemoglobin) / it is small enough to fit through a capillary.',
      ],
      modelAnswer: 'A red blood cell is adapted to carry oxygen because it has haemoglobin to hold the oxygen and no nucleus, which leaves more room for haemoglobin. It is also small enough to fit through a capillary.',
    },
    {
      id: 'sq2',
      question: 'Name two things that a red blood cell, a neurone and a ciliated cell all have in common, and explain how you can tell they are animal cells and not plant cells.',
      vnTranslation: 'Kể hai thứ mà tế bào hồng cầu, tế bào thần kinh và tế bào có lông rung đều có chung, và giải thích làm sao em biết chúng là tế bào động vật chứ không phải thực vật.',
      suggestedWords: [['cytoplasm', 'cell membrane', 'specialised'], ['no cell wall', 'no chloroplasts', 'no vacuole']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for two shared features: cytoplasm and a cell membrane (or: all three are specialised). Not "a nucleus" — the red blood cell has none.',
        '1 mark for saying they have no cell wall (and no chloroplasts or large vacuole), which are the plant-only parts.',
      ],
      modelAnswer: 'All three have cytoplasm and a cell membrane, and all three are specialised. (They do not all have a nucleus, because the red blood cell has none.) They must be animal cells because none of them has a cell wall, chloroplasts or a large sap vacuole — the parts only plant cells have.',
    },
    {
      id: 'sq3',
      question: 'Explain why a root hair cell has no chloroplasts, and describe the structure that helps it do its job.',
      vnTranslation: 'Hãy giải thích vì sao tế bào lông hút không có lục lạp, và mô tả cấu trúc giúp nó làm nhiệm vụ.',
      suggestedWords: [['underground', 'dark', 'no sunlight'], ['long', 'thin', 'surface']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying roots are underground in the dark, so there is no sunlight for chloroplasts to use.',
        '1 mark for describing the long, thin root hair, which gives a big surface for absorbing water.',
      ],
      modelAnswer: 'Roots are underground in the dark, so there is no sunlight — chloroplasts would be useless, and a cell only builds the parts its job needs. The root hair cell has a long, thin hair that pushes out between the soil grains, giving a big surface for water to be absorbed through.',
    },
    {
      id: 'sq4',
      question: 'A white blood cell chases germs and swallows them whole. Explain why a fixed shape would be no good for that job.',
      vnTranslation: 'Bạch cầu đuổi theo vi khuẩn và nuốt trọn chúng. Hãy giải thích vì sao một hình dạng cố định không phù hợp với nhiệm vụ đó.',
      suggestedWords: [['change shape', 'bend', 'squeeze', 'wrap'], ['no cell wall']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the cell must change shape to move after a germ and to wrap around (swallow) it.',
        '1 mark for linking this to having no cell wall (animal cells have no fixed shape), so the cell can stretch and squeeze.',
      ],
      modelAnswer: 'To chase a germ and swallow it whole, the white blood cell has to keep changing shape — stretching to move and wrapping itself around the germ. A fixed shape would make that impossible. It can do it because, like all animal cells, it has no cell wall and so no fixed shape.',
    },
  ],

  diagrams: [
    {
      id: 'd1',
      inlineSvg: DIAGRAMS.RED_BLOOD_CELL,
      promptText: 'The diagram shows a red blood cell. State its function, and explain how three features of its structure help it do that job.',
      suggestedWords: [['oxygen'], ['haemoglobin'], ['nucleus'], ['small', 'capillary']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the function: it carries oxygen around the body.',
        '1 mark for haemoglobin (the red pigment that holds oxygen) and for having no nucleus, which leaves more room for it.',
        '1 mark for being small (and flexible) enough to fit through the narrowest blood vessels, the capillaries.',
      ],
      modelAnswer: 'Its function is to carry oxygen around the body. Its cytoplasm is full of haemoglobin, the red pigment that holds the oxygen. It has no nucleus, which leaves more room for haemoglobin. And it is very small, so it can squeeze through the narrowest blood vessels, the capillaries.',
    },
    {
      id: 'd2',
      inlineSvg: DIAGRAMS.NEURONE,
      promptText: 'The diagram shows a neurone. Name the long part labelled in the diagram, state the cell’s function, and explain how its structure fits that function.',
      suggestedWords: [['axon'], ['electrical signals', 'signals', 'messages'], ['long', 'far', 'fast']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming the axon.',
        '1 mark for the function: carrying electrical signals (messages) around the body.',
        '1 mark for explaining that the very long axon lets a signal travel a long way, quickly.',
      ],
      modelAnswer: 'The long part is the axon. A neurone’s function is to carry electrical signals around the body, for example from the brain to a muscle. Its very long axon means one cell can carry a signal a long way — even a metre — and fast.',
    },
    {
      id: 'd3',
      inlineSvg: DIAGRAMS.SHAPE_PALISADE,
      promptText: 'The diagram shows a palisade cell in a leaf. Explain how being tall, being packed with chloroplasts, and sitting near the top of the leaf all help it do its job.',
      suggestedWords: [['photosynthesis', 'food'], ['chloroplasts'], ['sunlight', 'light']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the function: making food by photosynthesis using sunlight.',
        '1 mark for saying it is packed with chloroplasts (containing chlorophyll) to absorb as much light as possible, and being tall lets more chloroplasts stack up in one cell.',
        '1 mark for saying that near the top of the leaf the light reaches it first, before other cells can shade it.',
      ],
      modelAnswer: 'A palisade cell makes food by photosynthesis, which needs sunlight. It is packed with chloroplasts to absorb as much light as possible, and being tall means more chloroplasts can stack up inside one cell. Sitting near the top of the leaf means the light reaches it first, before any other cell can shade it.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's own diagrams, labels stripped
  // at runtime, a pin where each label's leader line ended. Coordinates from
  // `node scripts/svg-coords.mjs Y7_SCI/U01_3 <KEY>`. Each bank carries at
  // least one distractor.
  labelIt: [
    {
      id: 'rbc',
      title: 'Label the red blood cell', titleVn: 'Gắn nhãn tế bào hồng cầu',
      inlineSvg: DIAGRAMS.RED_BLOOD_CELL, viewBox: '0 0 700 320',
      pins: [
        { id: 'p1', x: 540, y: 74, answer: 'membrane' },
        { id: 'p2', x: 540, y: 160, answer: 'haemoglobin' },
        { id: 'p3', x: 540, y: 248, answer: 'no_nucleus' },
      ],
      bank: [
        { val: 'membrane', text: 'Cell membrane', textVn: 'Màng tế bào' },
        { val: 'haemoglobin', text: 'Cytoplasm full of haemoglobin', textVn: 'Tế bào chất chứa đầy haemoglobin' },
        { val: 'no_nucleus', text: 'No nucleus — more room inside', textVn: 'Không có nhân — nhiều chỗ hơn bên trong' },
        { val: 'nucleus', text: 'Nucleus', textVn: 'Nhân' },
      ],
    },
    {
      id: 'neurone',
      title: 'Label the neurone', titleVn: 'Gắn nhãn tế bào thần kinh',
      inlineSvg: DIAGRAMS.NEURONE, viewBox: '0 0 700 300',
      pins: [
        { id: 'p1', x: 150, y: 58, answer: 'dendrites' },
        { id: 'p2', x: 372, y: 92, answer: 'nucleus' },
        { id: 'p3', x: 300, y: 268, answer: 'membrane' },
        { id: 'p4', x: 470, y: 268, answer: 'axon' },
      ],
      bank: [
        { val: 'dendrites', text: 'Dendrites', textVn: 'Sợi nhánh' },
        { val: 'nucleus', text: 'Nucleus', textVn: 'Nhân' },
        { val: 'membrane', text: 'Cell membrane', textVn: 'Màng tế bào' },
        { val: 'axon', text: 'Axon', textVn: 'Sợi trục' },
        { val: 'cyto', text: 'Cytoplasm', textVn: 'Tế bào chất' },
      ],
    },
    {
      id: 'roothair',
      title: 'Label the root hair cell', titleVn: 'Gắn nhãn tế bào lông hút',
      inlineSvg: DIAGRAMS.ROOT_HAIR_CELL, viewBox: '0 0 660 300',
      pins: [
        { id: 'p1', x: 150, y: 266, answer: 'nucleus' },
        { id: 'p2', x: 58, y: 266, answer: 'membrane' },
        { id: 'p3', x: 58, y: 58, answer: 'wall' },
        { id: 'p4', x: 300, y: 52, answer: 'vacuole' },
        { id: 'p5', x: 550, y: 266, answer: 'root_hair' },
      ],
      bank: [
        { val: 'nucleus', text: 'Nucleus', textVn: 'Nhân' },
        { val: 'membrane', text: 'Cell membrane', textVn: 'Màng tế bào' },
        { val: 'wall', text: 'Cell wall', textVn: 'Thành tế bào' },
        { val: 'vacuole', text: 'Vacuole (cell sap)', textVn: 'Không bào (dịch tế bào)' },
        { val: 'root_hair', text: 'The long root hair', textVn: 'Lông hút dài' },
        { val: 'chloroplast', text: 'Chloroplast', textVn: 'Lục lạp' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
