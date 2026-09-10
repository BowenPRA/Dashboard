// src/data/Y7_SCI/U02_1/data.js
// 2.1 Solids, Liquids and Gases — Year 7 Science self-study unit covering the
// two classroom lessons 2.1a (properties) and 2.1b (particle theory). Seven
// scored tasks: 130 XP available, capped at 100 (docs/y7-science-course.md §3).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as PARTICLES } from './diagramsB.js';

export const U02_1_DATA = {
  meta: {
    id: 'U02_1',
    title: 'Solids, Liquids and Gases',
    desc: 'The three states and their properties — sorted by what a substance does, not how it looks — and the particle theory that explains all of them.',
    track: 'Y7_SCI',
    icon: 'Boxes',
    classroom: [
      { course: 'y7-science', slug: 'U02_1a', title: 'Science 2.1a · Solids, Liquids and Gases' },
      { course: 'y7-science', slug: 'U02_1b', title: 'Science 2.1b · Particle Theory' },
    ],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 20 },
      ],
    },
    {
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 30,
      tasks: [
        { id: 'SPELLING', dbKey: 'p2', maxXP: 10 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 20 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 20 },
      ],
    },
    {
      // Quiz and arcade share one gate at 80 of the 110 XP before it (73%).
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
      word: 'Matter', vn: 'Vật chất',
      def: 'Everything you can see and feel. All matter is a solid, a liquid or a gas.',
      vnDef: 'Mọi thứ em có thể nhìn thấy và chạm vào. Mọi vật chất đều là chất rắn, chất lỏng hoặc chất khí.',
      sent: 'The rock, the sea and the air are all matter.',
      vnSent: 'Đá, biển và không khí đều là vật chất.',
      isReal: true,
    },
    {
      word: 'Property', vn: 'Tính chất',
      def: 'A way that a substance behaves — whether it can be poured, squashed, or keeps its shape.',
      vnDef: 'Cách một chất hành xử — rót được, nén được, hay giữ hình dạng.',
      sent: 'Being able to be poured is a property of liquids.',
      vnSent: 'Rót được là một tính chất của chất lỏng.',
      isReal: true,
    },
    {
      word: 'Volume', vn: 'Thể tích',
      def: 'The amount of space something takes up.',
      vnDef: 'Lượng không gian mà một vật chiếm.',
      sent: 'The water changed shape but its volume stayed at 50 cubic centimetres.',
      vnSent: 'Nước đổi hình dạng nhưng thể tích vẫn là 50 xen-ti-mét khối.',
      isReal: true,
    },
    {
      word: 'Compressed', vn: 'Bị nén',
      def: 'Squashed into a smaller space. Only a gas can be compressed.',
      vnDef: 'Bị ép vào một khoảng không gian nhỏ hơn. Chỉ chất khí mới có thể bị nén.',
      sent: 'The air in the syringe was compressed when the plunger was pushed.',
      vnSent: 'Không khí trong xi-lanh bị nén khi cần đẩy được đẩy vào.',
      isReal: true,
    },
    {
      word: 'Particle', vn: 'Hạt',
      def: 'A tiny piece of matter, far too small to see. All matter is made of particles.',
      vnDef: 'Một mảnh vật chất rất nhỏ, quá nhỏ để nhìn thấy. Mọi vật chất đều được tạo nên từ các hạt.',
      sent: 'The particles in a solid are packed tightly in a fixed pattern.',
      vnSent: 'Các hạt trong chất rắn được xếp sát nhau theo một khuôn mẫu cố định.',
      isReal: true,
    },
    {
      word: 'Vibrate', vn: 'Dao động',
      def: 'To make tiny movements on the spot without moving away. Particles in a solid vibrate.',
      vnDef: 'Chuyển động rất nhỏ tại chỗ mà không rời đi. Các hạt trong chất rắn dao động.',
      sent: 'The particles in a solid vibrate but stay in the same place.',
      vnSent: 'Các hạt trong chất rắn dao động nhưng vẫn ở nguyên vị trí.',
      isReal: true,
    },
    {
      word: 'Attractive force', vn: 'Lực hút',
      def: 'The pull between particles. Strong in a solid, weak in a liquid, almost none in a gas.',
      vnDef: 'Lực kéo giữa các hạt. Mạnh trong chất rắn, yếu trong chất lỏng, gần như không có trong chất khí.',
      sent: 'A liquid can flow because the attractive forces between its particles are weak.',
      vnSent: 'Chất lỏng chảy được vì lực hút giữa các hạt của nó yếu.',
      isReal: true,
    },
    {
      word: 'Vacuum', vn: 'Chân không',
      def: 'A space where there are no particles at all.',
      vnDef: 'Một khoảng không hoàn toàn không có hạt nào.',
      sent: 'There is no sound in space because space is a vacuum.',
      vnSent: 'Trong vũ trụ không có âm thanh vì vũ trụ là chân không.',
      isReal: true,
    },
    {
      word: 'Theory', vn: 'Học thuyết',
      def: 'A scientific idea that has been tested many times and is accepted by scientists. Not a guess.',
      vnDef: 'Một ý tưởng khoa học đã được kiểm chứng nhiều lần và được các nhà khoa học công nhận. Không phải là đoán.',
      sent: 'The particle theory explains why a gas can be compressed.',
      vnSent: 'Thuyết hạt giải thích vì sao chất khí có thể bị nén.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Three Ways to Behave',
      text: 'Everything you can see and feel is {matter}, and scientists sort all of it into three states: solid, liquid and gas. You cannot tell the state by looking. You have to test how the substance behaves — each way it behaves is a {property}. A solid keeps its own shape and its own {volume}, the amount of space it takes up. A liquid keeps its volume but takes the shape of its container, and it can be poured. A gas has no shape of its own, fills any closed container, and is the only state that can be {compressed} — squashed into a smaller space.',
      vnTitle: 'Ba cách hành xử',
      vnText: 'Mọi thứ em có thể nhìn thấy và chạm vào đều là {matter}, và các nhà khoa học chia tất cả thành ba trạng thái: rắn, lỏng và khí. Em không thể biết trạng thái chỉ bằng cách nhìn. Em phải kiểm tra cách chất đó hành xử — mỗi cách hành xử là một {property}. Chất rắn giữ hình dạng riêng và {volume} riêng, tức lượng không gian nó chiếm. Chất lỏng giữ thể tích nhưng mang hình dạng của vật chứa, và rót được. Chất khí không có hình dạng riêng, lấp đầy mọi vật chứa kín, và là trạng thái duy nhất có thể bị {compressed} — ép vào khoảng không gian nhỏ hơn.',
    },
    {
      id: 'passage_2',
      title: 'One Idea Explains Everything',
      text: 'All matter is made of tiny pieces far too small to see. Each piece is a {particle}. In a solid the particles are packed tightly in a fixed pattern and held together strongly, so they can only {vibrate} on the spot. In a liquid they still touch, but the pull between them — the {attractive force} — is weak, so they slide past one another and the liquid can flow. In a gas the particles do not touch at all: they are far apart, moving fast, and they spread out by themselves to fill any space. Take every particle out of a box and what is left is a {vacuum}: nothing at all.',
      vnTitle: 'Một ý tưởng giải thích tất cả',
      vnText: 'Mọi vật chất đều tạo nên từ những mảnh rất nhỏ, quá nhỏ để nhìn thấy. Mỗi mảnh là một {particle}. Trong chất rắn các hạt xếp sát nhau theo khuôn mẫu cố định và liên kết chặt, nên chúng chỉ có thể {vibrate} tại chỗ. Trong chất lỏng chúng vẫn chạm nhau, nhưng lực kéo giữa chúng — {attractive force} — yếu, nên chúng trượt qua nhau và chất lỏng chảy được. Trong chất khí các hạt không chạm nhau chút nào: chúng ở xa nhau, chuyển động nhanh, và tự lan ra để lấp đầy mọi không gian. Lấy hết các hạt ra khỏi một cái hộp thì thứ còn lại là {vacuum}: hoàn toàn không có gì.',
    },
    {
      id: 'passage_3',
      title: 'Only a Theory?',
      text: 'In everyday English, "it is only a theory" means "I am not sure". In science the word means almost the opposite. A suggested explanation that has not been tested yet is a hypothesis. A hypothesis that has been tested many times, and has passed every time, becomes a {theory} — the strongest kind of idea science has. The particle theory is one. It explains why sand pours even though it is a solid, why the air syringe moves and the water syringe does not, and even why you can squash a sponge: you are not compressing the solid, you are compressing the air trapped in its holes.',
      vnTitle: 'Chỉ là một học thuyết?',
      vnText: 'Trong tiếng Anh đời thường, "it is only a theory" nghĩa là "tôi không chắc". Trong khoa học từ này có nghĩa gần như ngược lại. Một cách giải thích được đề ra mà chưa kiểm chứng là giả thuyết. Một giả thuyết đã được kiểm chứng nhiều lần, và lần nào cũng đúng, trở thành {theory} — loại ý tưởng mạnh nhất mà khoa học có. Thuyết hạt là một ví dụ. Nó giải thích vì sao cát chảy dù là chất rắn, vì sao xi-lanh không khí di chuyển còn xi-lanh nước thì không, và cả vì sao em bóp được miếng bọt biển: em không nén chất rắn, em đang nén không khí mắc trong các lỗ của nó.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Sand can be poured, but it is a solid. Explain why.',
      vnTranslation: 'Cát có thể rót được, nhưng nó là chất rắn. Hãy giải thích vì sao.',
      suggestedWords: [['grain', 'grains', 'piece', 'pieces'], ['shape', 'compressed', 'squashed']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying each grain of sand keeps its own shape and cannot be compressed, so each grain is a solid.',
        '1 mark for saying what flows is millions of tiny solids rolling over each other, not a liquid.',
      ],
      modelAnswer: 'Each grain of sand keeps its own shape and cannot be squashed, so every grain is a solid. What pours is not a liquid — it is millions of tiny solid grains rolling over each other. Sugar, salt and rice do the same thing.',
    },
    {
      id: 'sq2',
      question: 'A syringe full of air can be pushed in, but a syringe full of water cannot. Use particle theory to explain why.',
      vnTranslation: 'Một xi-lanh đầy không khí có thể đẩy vào được, nhưng một xi-lanh đầy nước thì không. Hãy dùng thuyết hạt để giải thích vì sao.',
      suggestedWords: [['space', 'spaces', 'gaps', 'far apart'], ['touch', 'touching']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying gas particles are far apart with big spaces between them, so pushing moves them closer and the gas takes up less room (it is compressed).',
        '1 mark for saying the particles in water already touch, so there are no gaps to close and the plunger cannot move.',
      ],
      modelAnswer: 'The particles in a gas are far apart with big spaces between them. When you push the plunger, the particles move closer together and the gaps get smaller, so the air is compressed. The particles in water already touch each other, so there are no gaps to close, and the plunger will not move.',
    },
    {
      id: 'sq3',
      question: 'Describe how the particles are arranged in a solid and in a liquid, and use the difference to explain why a liquid can flow but a solid cannot.',
      vnTranslation: 'Mô tả cách các hạt được sắp xếp trong chất rắn và trong chất lỏng, và dùng sự khác nhau đó để giải thích vì sao chất lỏng chảy được còn chất rắn thì không.',
      suggestedWords: [['fixed pattern', 'held strongly', 'vibrate'], ['weak', 'slide', 'move past']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for describing a solid: particles tightly packed in a fixed pattern, held together strongly, only able to vibrate; and a liquid: particles still touching but held weakly, able to move past one another.',
        '1 mark for the explanation: matter can only flow if its particles can move past one another — they can in a liquid (weak attraction) but not in a solid (strong attraction holds each in place).',
      ],
      modelAnswer: 'In a solid the particles are packed tightly in a fixed pattern and held together strongly, so they can only vibrate on the spot. In a liquid the particles still touch, but they are held together weakly, so they can slide past one another. Matter can only flow if its particles can move past each other, so a liquid flows and a solid cannot.',
    },
    {
      id: 'sq4',
      question: 'A sponge is a solid, but you can squash it. Does this prove the particle theory is wrong? Explain.',
      vnTranslation: 'Miếng bọt biển là chất rắn, nhưng em có thể bóp nhỏ nó. Điều này có chứng minh thuyết hạt sai không? Hãy giải thích.',
      suggestedWords: [['holes', 'gaps', 'air'], ['compressing', 'squashing', 'gas']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying no — a sponge is a thin skeleton of solid with air in every hole.',
        '1 mark for saying you are compressing the air (a gas) in the holes, not the solid, so the theory still holds.',
      ],
      modelAnswer: 'No. A sponge is not solid all the way through — it is a thin skeleton of solid with air trapped in every hole. When you squeeze it, the solid part is not compressed at all; the air in the gaps is, exactly like the air in the syringe. So the particle theory survives — you were compressing a gas.',
    },
  ],

  diagrams: [
    {
      id: 'd1',
      inlineSvg: PARTICLES.THREE_ARRANGEMENTS,
      promptText: 'The diagram shows the particles in a solid, a liquid and a gas. Describe how the particles are arranged in each state.',
      suggestedWords: [['fixed pattern', 'tightly packed'], ['touch', 'slide', 'move past'], ['far apart', 'spread out']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the solid: particles tightly packed in a fixed pattern, held together strongly, vibrating on the spot.',
        '1 mark for the liquid: particles still touching but held weakly, able to move past one another, no pattern.',
        '1 mark for the gas: particles far apart, not touching, moving fast in every direction and spreading out to fill the space.',
      ],
      modelAnswer: 'In the solid the particles are packed tightly together in a fixed, regular pattern and held together strongly; they can only vibrate on the spot. In the liquid the particles still touch, but they are held together weakly, so they slide past one another and have no pattern. In the gas the particles do not touch: they are far apart, moving quickly in every direction, and they spread out to fill the whole container.',
    },
    {
      id: 'd2',
      inlineSvg: DIAGRAMS.SYRINGES,
      promptText: 'The diagram shows a syringe of water and a syringe of air, both pushed with the holes blocked. Say what happens to each plunger, and explain the difference using particles.',
      suggestedWords: [['air', 'moves', 'compressed'], ['water', 'does not move'], ['gaps', 'space', 'touching']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying the air plunger moves in (the air is compressed) and the water plunger does not move.',
        '1 mark for explaining that gas particles have large spaces between them, so they can be pushed closer together.',
        '1 mark for explaining that the water particles already touch, so there is no space to close up — a liquid cannot be compressed.',
      ],
      modelAnswer: 'The air plunger slides in because the air is compressed — squashed into a smaller space — and it springs back when you let go. The water plunger does not move at all. The difference is the particles: in a gas they are far apart with big gaps between them, so pushing moves them closer together. In water the particles already touch, so there are no gaps to close and the liquid cannot be compressed.',
    },
    {
      id: 'd3',
      inlineSvg: DIAGRAMS.STATES_TABLE,
      promptText: 'The table compares the three states of matter. Using the table, name one property that liquids share with gases, and one property that gases have which neither solids nor liquids have.',
      suggestedWords: [['poured', 'flow', 'shape of the container'], ['compressed', 'volume']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for a shared property: both liquids and gases can be poured / flow / take the shape of their container.',
        '1 mark for the gas-only property: only a gas can be compressed (or: only a gas changes its volume to fill the whole container).',
      ],
      modelAnswer: 'Liquids and gases share the property of being able to be poured — both flow and take the shape of their container. The property only a gas has is that it can be compressed: a gas can be squashed into a smaller space, and it changes its volume to fill the whole container, which neither a solid nor a liquid can do.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
