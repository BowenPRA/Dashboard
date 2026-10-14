// src/data/Y7_SCI/U01_3/notes.js
// 1.3 Specialised Cells — rebuilt to the engagement plan
// (docs/y7-science/ENGAGEMENT-PLAN.md). 19 layout slides; 6 scored items —
// four interactive activities (sort · predict · hotspot · sort) and two
// checks, four distinct shapes in all.
//
// The classroom deck opened with "on paper, finish each sentence" and had the
// class copy two ruled tables into a notebook; this deck opens with a sort
// activity instead, and both tables now sit near the end as diagrams to look
// at — how a scientist would organise the same evidence — not homework to
// copy. The "why no nucleus" reveal-then-check becomes a `predict`; a new
// `hotspot` on the neurone's axon and a recap `sort` of all five cells add
// the variety the checks alone did not have. Every photograph is credited in
// docs/credits.md. The `check:` or `activity:` block is always the LAST key
// on its slide.
import { DIAGRAMS } from './diagrams.js';
import { SpecialisedCellWidget } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U01_3/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const CRIMSON = '#c2185b';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Dna',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 1 · 1.3',
    eyebrowVn: 'Chương 1 · 1.3',
    eyebrowFr: 'Unité 1 · 1.3',
    title: 'Specialised Cells: Built for the Job',
    titleVn: 'Tế bào chuyên hoá: Được tạo ra cho nhiệm vụ',
    titleFr: 'Les cellules spécialisées : faites pour leur travail',
    objective: 'Name three specialised animal cells and two specialised plant cells, and explain how the structure of each fits its function.',
    objectiveVn: 'Kể tên ba tế bào động vật chuyên hoá và hai tế bào thực vật chuyên hoá, và giải thích cấu trúc của mỗi loại phù hợp với chức năng ra sao.',
    objectiveFr: 'Nommer trois cellules animales spécialisées et deux cellules végétales spécialisées, et expliquer comment la structure de chacune convient à sa fonction.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'You will **sort**, **predict** and **tap** your way through it. Six things are scored — the sort on the next slide is the first.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán** và **chạm** trong suốt bài học. Sáu mục được tính điểm — mục sắp xếp ở slide sau là mục đầu tiên.',
      textFr: 'Tu vas **trier**, **prédire** et **toucher** tout au long de la leçon. Six activités sont notées — le tri de la diapo suivante est la première.',
    },
  },

  // 2 ─ Starter: SORT parts → jobs ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Before the new cells — the old parts',
    eyebrowVn: 'Trước các tế bào mới — các bộ phận cũ',
    eyebrowFr: 'Avant les nouvelles cellules — les parties déjà vues',
    title: 'Four Parts, Four Jobs',
    titleVn: 'Bốn bộ phận, bốn nhiệm vụ',
    titleFr: 'Quatre parties, quatre rôles',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelFr: 'Trier',
    labelIcon: 'Boxes',
    text: 'You already know these four parts. Do you remember what each one **does**?',
    textVn: 'Em đã biết bốn bộ phận này rồi. Em có nhớ mỗi bộ phận **làm gì** không?',
    textFr: 'Tu connais déjà ces quatre parties. Te souviens-tu de ce que **fait** chacune ?',
    sub: 'Sort each part into the job it does.',
    subVn: 'Sắp xếp mỗi bộ phận vào đúng nhiệm vụ của nó.',
    subFr: 'Range chaque partie avec le rôle qu’elle joue.',
    activity: {
      id: 'a1', type: 'sort',
      prompt: 'Sort each part into the job it does.',
      promptVn: 'Sắp xếp mỗi bộ phận vào đúng nhiệm vụ của nó.',
      promptFr: 'Range chaque partie avec le rôle qu’elle joue.',
      bins: [
        { id: 'controls', name: 'Controls what goes in and out', nameVn: 'Kiểm soát những gì ra vào', nameFr: 'Contrôle ce qui entre et sort' },
        { id: 'shape', name: 'Holds the cell in shape', nameVn: 'Giữ hình dạng cho tế bào', nameFr: 'Garde la forme de la cellule' },
        { id: 'boss', name: 'Runs the whole cell', nameVn: 'Điều khiển toàn bộ tế bào', nameFr: 'Dirige toute la cellule' },
        { id: 'food', name: 'Makes food using sunlight', nameVn: 'Tạo thức ăn nhờ ánh sáng mặt trời', nameFr: 'Fabrique de la nourriture grâce au soleil' },
      ],
      cards: [
        { id: 'membrane', name: 'Cell membrane', nameVn: 'Màng tế bào', nameFr: 'Membrane cellulaire', bin: 'controls' },
        { id: 'wall', name: 'Cell wall', nameVn: 'Thành tế bào', nameFr: 'Paroi cellulaire', bin: 'shape' },
        { id: 'nucleus', name: 'Nucleus', nameVn: 'Nhân', nameFr: 'Noyau', bin: 'boss' },
        { id: 'chloroplast', name: 'Chloroplasts', nameVn: 'Lục lạp', nameFr: 'Chloroplastes', bin: 'food' },
      ],
      explain: 'Four parts you already know, four jobs. Today you meet **five** cells built for much more specific jobs than these — carrying oxygen, sending signals, sweeping mucus, soaking up water, making food. Each one is the same idea, sharpened: structure fits function.',
      explainVn: 'Bốn bộ phận em đã biết, bốn nhiệm vụ. Hôm nay em sẽ gặp **năm** tế bào được tạo ra cho những nhiệm vụ cụ thể hơn nhiều — chở oxy, truyền tín hiệu, quét chất nhầy, hút nước, tạo thức ăn. Mỗi tế bào đều là cùng một ý tưởng, được mài sắc hơn: cấu trúc phù hợp với chức năng.',
      explainFr: 'Quatre parties que tu connais déjà, quatre rôles. Aujourd’hui, tu rencontres **cinq** cellules faites pour des travaux bien plus précis — transporter l’oxygène, envoyer des signaux, balayer le mucus, absorber l’eau, fabriquer de la nourriture. C’est la même idée, en plus précis : la structure sert la fonction.',
    },
  },

  // 3 ─ The hook: three shapes from one body ────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ',
    eyebrowFr: 'Regarde bien',
    title: 'Why Are These Not the Same?',
    titleVn: 'Vì sao chúng không giống nhau?',
    titleFr: 'Pourquoi ne sont-elles pas pareilles ?',
    inlineSvg: DIAGRAMS.THREE_SHAPES,
    caption: 'All three of these came out of **one body** — and every one of them was built from the **same set of instructions**. So why do they look nothing alike? Think about it, then read on.',
    captionVn: 'Cả ba đều lấy ra từ **một cơ thể** — và mỗi cái đều được tạo nên từ **cùng một bộ chỉ dẫn**. Vậy vì sao chúng trông chẳng giống nhau chút nào? Hãy nghĩ về điều đó, rồi đọc tiếp.',
    captionFr: 'Ces trois cellules viennent toutes **d’un seul corps** — et chacune a été fabriquée à partir des **mêmes instructions**. Alors pourquoi ne se ressemblent-elles pas du tout ? Réfléchis, puis lis la suite.',
  },

  // 4 ─ 200 kinds (key word: function) + CHECK 1 ────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    text: 'Your body builds about **200 different kinds** of cell.',
    textVn: 'Cơ thể em tạo ra khoảng **200 loại tế bào** khác nhau.',
    textFr: 'Ton corps fabrique environ **200 sortes** de cellules.',
    sub: 'Last lesson you learned you are about **100 trillion cells**. They are not 100 trillion copies of one thing — they come in about **200 kinds**, and each kind is a different shape, because each kind has a different **job**. Today you meet **five** of them.',
    subVn: 'Tiết trước em đã biết mình có khoảng **100 nghìn tỉ tế bào**. Đó không phải 100 nghìn tỉ bản sao của một thứ — chúng có khoảng **200 loại**, mỗi loại một hình dạng khác nhau, vì mỗi loại có một **nhiệm vụ** khác nhau. Hôm nay em sẽ gặp **năm** loại.',
    subFr: 'Au dernier cours : tu as environ **100 000 milliards de cellules**. Pas 100 000 milliards de copies d’une seule cellule — environ **200 sortes**, chacune de forme différente, car chacune a un **travail** différent. Aujourd’hui, tu en vois **cinq**.',
    notes: [
      {
        tone: 'write',
        text: '**Function:** the job a cell does, or the role it plays.',
        textVn: '**Chức năng (function):** nhiệm vụ mà tế bào làm, hay vai trò nó đảm nhận.',
        textFr: '**Fonction (function) :** le travail ou le rôle d’une cellule.',
      },
    ],
    check: {
      id: 'c1',
      q: 'In science, what does the **function** of a cell mean?',
      qVn: 'Trong khoa học, **chức năng (function)** của tế bào nghĩa là gì?',
      qFr: 'En sciences, que veut dire la **fonction** d’une cellule ?',
      options: [
        { val: 'A', text: 'Its size', textVn: 'Kích thước của nó', textFr: 'Sa taille' },
        { val: 'B', text: 'The job it does', textVn: 'Nhiệm vụ nó làm', textFr: 'Le travail qu’elle fait' },
        { val: 'C', text: 'The number of them in the body', textVn: 'Số lượng của nó trong cơ thể', textFr: 'Leur nombre dans le corps' },
      ],
      correct: 'B',
      expEn: 'Function means **the job** a cell does — carrying oxygen, sending signals, soaking up water. The shape follows from the job, which is the whole of this lesson.',
      expVn: 'Chức năng nghĩa là **nhiệm vụ** tế bào làm — chở oxy, truyền tín hiệu, hút nước. Hình dạng đi theo nhiệm vụ, và đó là toàn bộ bài học này.',
      expFr: 'La fonction, c’est **le travail** que fait une cellule — transporter l’oxygène, envoyer des signaux, absorber l’eau. La forme découle du travail : c’est toute cette leçon.',
    },
  },

  // 5 ─ Key word: specialised ───────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Specialised',
    titleVn: 'Specialised — Chuyên hoá',
    titleFr: 'Specialised — Spécialisée',
    content: 'Each of those 200 kinds is **specialised**. Its structure is built for its own job — so it does that one job extremely well, and it cannot do the others.',
    contentVn: 'Mỗi loại trong số 200 loại đó đều **chuyên hoá**. Cấu trúc của nó được tạo ra cho nhiệm vụ riêng — nên nó làm nhiệm vụ đó cực kỳ tốt, và không làm được những việc khác.',
    contentFr: 'Chacune de ces 200 sortes est **spécialisée**. Sa structure est faite pour son travail — alors elle fait ce travail très bien, et elle ne peut pas faire les autres.',
    notes: [
      {
        tone: 'write',
        text: '**Specialised / adapted:** the cell has a structure that helps it carry out its function really well.',
        textVn: '**Chuyên hoá / thích nghi (specialised / adapted):** tế bào có cấu trúc giúp nó thực hiện chức năng của mình thật tốt.',
        textFr: '**Spécialisée / adaptée (specialised / adapted) :** la cellule a une structure qui l’aide à très bien remplir sa fonction.',
      },
    ],
    reveal: {
      label: 'English class: what is a specialist?',
      labelVn: 'Tiếng Anh: "specialist" là gì?',
      labelFr: 'Anglais : qu’est-ce qu’un « specialist » ?',
      answer: 'A **specialist** is a person who does **one** job very well — an eye doctor, a heart doctor. You would not go to an eye doctor for a broken leg. A **specialised cell** is exactly that: brilliant at one job, and no use at all for the rest. Watch what the first one gives up to be good at its job.',
      answerVn: '**Specialist** (chuyên gia) là người làm **một** việc rất giỏi — bác sĩ mắt, bác sĩ tim. Em sẽ không đến bác sĩ mắt để chữa gãy chân. **Tế bào chuyên hoá** đúng là như vậy: xuất sắc ở một nhiệm vụ, và vô dụng với mọi việc khác. Hãy xem tế bào đầu tiên đã từ bỏ thứ gì để giỏi nhiệm vụ của nó.',
      answerFr: 'Un **specialist** (spécialiste) est une personne qui fait **un seul** travail très bien — un médecin des yeux, un médecin du cœur. Tu n’irais pas chez un médecin des yeux pour une jambe cassée. Une **cellule spécialisée**, c’est pareil : excellente pour un travail, inutile pour le reste. Regarde ce que la première abandonne pour bien faire son travail.',
    },
  },

  // 6 ─ Red blood cell + PREDICT ────────────────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Droplet',
    eyebrow: 'Animal cell 1',
    eyebrowVn: 'Tế bào động vật 1',
    eyebrowFr: 'Cellule animale 1',
    title: 'Red Blood Cell',
    titleVn: 'Tế bào hồng cầu',
    titleFr: 'Globule rouge',
    ratio: 48,
    inlineSvg: DIAGRAMS.RED_BLOOD_CELL,
    content:
      'Its **function** is to carry **oxygen** around your body.\n\n' +
      'Two things make it good at that. Its cytoplasm is full of a red **pigment** (a colour) called **haemoglobin**, and haemoglobin is what actually holds the oxygen. And it is **smaller than almost every other cell** in you, so it fits through the very narrowest blood vessels — the **capillaries**.',
    contentVn:
      '**Chức năng** của nó là vận chuyển **oxy** đi khắp cơ thể.\n\n' +
      'Hai điều giúp nó làm tốt việc đó. Tế bào chất của nó chứa đầy một **sắc tố** (màu) đỏ tên là **haemoglobin**, và chính haemoglobin giữ lấy oxy. Và nó **nhỏ hơn hầu hết mọi tế bào khác** trong cơ thể, nên đi lọt qua những mạch máu hẹp nhất — các **mao mạch (capillary)**.',
    contentFr: 'Sa **fonction** : transporter l’**oxygène** dans ton corps.\n\nDeux choses l’aident. Son cytoplasme est plein d’un **pigment** rouge (une couleur), l’**hémoglobine**, qui retient l’oxygène. Et il est **plus petit que presque toutes tes autres cellules**, donc il passe dans les vaisseaux les plus fins — les **capillaires**.',
    activity: {
      id: 'a2', type: 'predict',
      prompt: 'Almost every cell keeps its nucleus. Why does the red blood cell throw its own away?',
      promptVn: 'Gần như mọi tế bào đều giữ nhân. Vì sao tế bào hồng cầu lại vứt bỏ nhân của chính mình?',
      promptFr: 'Presque toutes les cellules gardent leur noyau. Pourquoi le globule rouge jette-t-il le sien ?',
      options: [
        { val: 'A', name: 'It was a mistake — the cell lost it', nameVn: 'Đó là một sai sót — tế bào đã mất nhân', nameFr: 'C’est une erreur — la cellule l’a perdu' },
        { val: 'B', name: 'It leaves more room inside for haemoglobin, so it carries more oxygen', nameVn: 'Để có thêm chỗ bên trong cho haemoglobin, nhờ đó chở được nhiều oxy hơn', nameFr: 'Il laisse plus de place pour l’hémoglobine, donc il transporte plus d’oxygène' },
        { val: 'C', name: 'Red blood cells do not live long enough to need one', nameVn: 'Tế bào hồng cầu không sống đủ lâu để cần đến nhân', nameFr: 'Les globules rouges ne vivent pas assez longtemps pour en avoir besoin' },
      ],
      correct: 'B',
      explain: 'It is a third **adaptation**: throwing away the nucleus leaves more room for haemoglobin, the red pigment that holds oxygen. Nothing about a specialised cell is an accident — it is built that way for its job.',
      explainVn: 'Đó là đặc điểm thích nghi thứ ba: bỏ nhân đi để có thêm chỗ cho haemoglobin, sắc tố đỏ giữ oxy. Không có gì ở một tế bào chuyên hoá là ngẫu nhiên — nó được tạo ra như vậy cho nhiệm vụ của mình.',
      explainFr: 'C’est une troisième **adaptation** : sans noyau, il y a plus de place pour l’hémoglobine, le pigment rouge qui retient l’oxygène. Rien n’est un hasard dans une cellule spécialisée — elle est faite ainsi pour son travail.',
    },
  },

  // 7 ─ Small enough to bend through ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: CRIMSON,
    icon: 'ScanEye',
    eyebrow: 'The real thing',
    eyebrowVn: 'Vật thật',
    eyebrowFr: 'Pour de vrai',
    title: 'Small Enough to Bend Through',
    titleVn: 'Đủ nhỏ để lách qua',
    titleFr: 'Assez petit pour se plier',
    image: img('capillary.jpg'),
    caption: 'One red blood cell, photographed inside a **capillary**. The vessel is so narrow that the cell has had to **bend in half** to get through it — and it can, because it is tiny, floppy, and has no nucleus in the way. That is structure fitting function, in one photograph.',
    captionVn: 'Một tế bào hồng cầu, chụp bên trong một **mao mạch**. Mạch hẹp đến mức tế bào phải **gập đôi lại** mới qua được — và nó làm được, vì nó nhỏ, mềm, và không có nhân cản đường. Đó chính là cấu trúc phù hợp với chức năng, gói trong một bức ảnh.',
    captionFr: 'Un globule rouge, photographié dans un **capillaire**. Le vaisseau est si étroit que la cellule a dû **se plier en deux** pour passer — et elle y arrive, car elle est minuscule, souple et sans noyau pour la gêner. La structure adaptée à la fonction, en une seule photo.',
  },

  // 8 ─ Neurone + HOTSPOT ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Zap',
    eyebrow: 'Animal cell 2',
    eyebrowVn: 'Tế bào động vật 2',
    eyebrowFr: 'Cellule animale 2',
    title: 'Neurone (Nerve Cell)',
    titleVn: 'Tế bào thần kinh (nơ-ron)',
    titleFr: 'Neurone (cellule nerveuse)',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.NEURONE,
    content:
      'Its **function** is to carry **electrical signals** around the body — from your brain to a muscle, to make it move.\n\n' +
      'The short **dendrites** collect signals from nearby cells; one very long strand then carries the signal onward. The longest neurone in you runs from the bottom of your back to your big toe — about **one metre**, all of it one cell.',
    contentVn:
      '**Chức năng** của nó là truyền **tín hiệu điện** đi khắp cơ thể — từ não đến một cơ, để làm cơ cử động.\n\n' +
      'Các **sợi nhánh (dendrite)** ngắn thu tín hiệu từ tế bào lân cận; rồi một sợi rất dài mang tín hiệu đi tiếp. Tế bào thần kinh dài nhất trong cơ thể em chạy từ cuối lưng xuống ngón chân cái — khoảng **một mét**, tất cả chỉ là một tế bào.',
    contentFr: 'Sa **fonction** : transporter des **signaux électriques** dans le corps — de ton cerveau jusqu’à un muscle, pour le faire bouger.\n\nLes courtes **dendrites** reçoivent les signaux des cellules voisines ; puis un très long prolongement transmet le signal plus loin. Ton plus long neurone va du bas de ton dos jusqu’à ton gros orteil — environ **un mètre**, et c’est une seule cellule.',
    activity: {
      id: 'a3', type: 'hotspot',
      prompt: 'Tap the **axon** — the long strand that carries the signal far and fast.',
      promptVn: 'Chạm vào **sợi trục (axon)** — sợi dài mang tín hiệu đi xa và nhanh.',
      promptFr: 'Touche l’**axone** — le long prolongement qui transmet le signal loin et vite.',
      svg: DIAGRAMS.NEURONE, viewBox: '0 0 760 320',
      targets: [
        { id: 'dendrites', x: 190, y: 90, r: 45, name: 'a dendrite', nameVn: 'một sợi nhánh', nameFr: 'une dendrite' },
        { id: 'nucleus', x: 242, y: 168, r: 24, name: 'the nucleus', nameVn: 'nhân', nameFr: 'le noyau' },
        { id: 'membrane', x: 290, y: 206, r: 18, name: 'the cell membrane', nameVn: 'màng tế bào', nameFr: 'la membrane cellulaire' },
        { id: 'axon', x: 470, y: 194, r: 70, name: 'the axon', nameVn: 'sợi trục', nameFr: 'l’axone' },
      ],
      correct: 'axon',
      explain: 'The **axon** is the very long thin strand reaching right across the cell — that length is why one neurone can send a signal all the way from your spine to your toe. The short branches near the cell body are **dendrites**: they collect signals, they do not send them far.',
      explainVn: '**Sợi trục** là sợi rất dài và mảnh chạy suốt qua tế bào — chiều dài đó là lý do một tế bào thần kinh có thể gửi tín hiệu từ cột sống đến tận ngón chân. Những nhánh ngắn gần thân tế bào là **sợi nhánh**: chúng thu tín hiệu, không gửi tín hiệu đi xa.',
      explainFr: 'L’**axone** est le très long prolongement fin qui traverse toute la cellule — c’est grâce à cette longueur qu’un seul neurone peut envoyer un signal de ta colonne vertébrale jusqu’à ton orteil. Les courtes branches près du corps cellulaire sont les **dendrites** : elles reçoivent les signaux, elles ne les envoient pas loin.',
    },
  },

  // 9 ─ Ciliated cell + CHECK 3 ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Move',
    eyebrow: 'Animal cell 3',
    eyebrowVn: 'Tế bào động vật 3',
    eyebrowFr: 'Cellule animale 3',
    title: 'Ciliated Cell',
    titleVn: 'Tế bào có lông rung',
    titleFr: 'Cellule ciliée',
    ratio: 48,
    inlineSvg: DIAGRAMS.CILIATED_CELL,
    content:
      'These cells line the tubes from your mouth down to your lungs, and along the top edge they have tiny moving hairs called **cilia**. Other cells there make sticky **mucus**, which traps dust and germs from the air — and the cilia sweep it up towards your mouth.',
    contentVn:
      'Những tế bào này lót các ống từ miệng xuống phổi, và ở mép trên chúng có những sợi lông nhỏ biết chuyển động gọi là **lông rung (cilia)**. Các tế bào khác ở đó tạo ra **chất nhầy (mucus)** dính, giữ lại bụi và vi khuẩn trong không khí — và lông rung quét nó lên phía miệng.',
    contentFr: 'Ces cellules tapissent les conduits qui vont de ta bouche à tes poumons, et sur leur bord supérieur elles ont de minuscules poils mobiles appelés **cils**. D’autres cellules à cet endroit fabriquent du **mucus** collant, qui piège la poussière et les microbes de l’air — et les cils le balaient vers ta bouche.',
    reveal: {
      label: 'So where does all that mucus go?',
      labelVn: 'Vậy tất cả chất nhầy đó đi đâu?',
      labelFr: 'Alors, où va tout ce mucus ?',
      answer: 'You **swallow** it. About **a litre of it, every day**. The cilia beat roughly **twelve times a second**, all day and all night, pushing the mucus and everything stuck in it up to the back of your mouth — and down it goes, without you ever noticing. That is what keeps the dust out of your lungs.',
      answerVn: 'Em **nuốt** nó xuống. Khoảng **một lít mỗi ngày**. Lông rung đập khoảng **mười hai lần một giây**, suốt ngày lẫn đêm, đẩy chất nhầy cùng mọi thứ dính trong đó lên cuối miệng — rồi trôi xuống, mà em chẳng hề hay biết. Chính điều đó giữ cho bụi không vào phổi.',
      answerFr: 'Tu l’**avales**. Environ **un litre, chaque jour**. Les cils battent à peu près **douze fois par seconde**, jour et nuit, et poussent le mucus et tout ce qui y est collé jusqu’au fond de ta bouche — puis il descend, sans que tu le remarques. C’est ce qui garde la poussière hors de tes poumons.',
    },
    check: {
      id: 'c3',
      q: 'What do the **cilia** on a ciliated cell do?',
      qVn: '**Lông rung** trên tế bào có lông rung làm gì?',
      qFr: 'Que font les **cils** d’une cellule ciliée ?',
      options: [
        { val: 'A', text: 'Sweep mucus, dust and germs away from the lungs', textVn: 'Quét chất nhầy, bụi và vi khuẩn ra xa khỏi phổi', textFr: 'Balaient le mucus, la poussière et les microbes loin des poumons' },
        { val: 'B', text: 'Carry oxygen around the body', textVn: 'Chở oxy đi khắp cơ thể', textFr: 'Transportent l’oxygène dans le corps' },
        { val: 'C', text: 'Absorb water from the soil', textVn: 'Hấp thụ nước từ đất', textFr: 'Absorbent l’eau du sol' },
      ],
      correct: 'A',
      expEn: 'The moving **cilia** sweep the sticky mucus — and the dust and germs trapped in it — up and away from the lungs. Carrying oxygen is the red blood cell; absorbing water is the root hair cell.',
      expVn: '**Lông rung** chuyển động quét chất nhầy dính — cùng bụi và vi khuẩn mắc trong đó — lên và ra xa khỏi phổi. Chở oxy là hồng cầu; hút nước là tế bào lông hút.',
      expFr: 'Les **cils** en mouvement balaient le mucus collant — avec la poussière et les microbes qu’il retient — vers le haut, loin des poumons. Transporter l’oxygène, c’est le globule rouge ; absorber l’eau, c’est la cellule de poil absorbant.',
    },
  },

  // 10 ─ Down a real microscope (animal) ────────────────────────────────────
  {
    layout: 'gallery',
    accent: CRIMSON,
    icon: 'Microscope',
    columns: 3,
    eyebrow: 'The same three, for real',
    eyebrowVn: 'Chính ba loại đó, ngoài đời thực',
    eyebrowFr: 'Les trois mêmes, pour de vrai',
    title: 'Down a Real Microscope',
    titleVn: 'Nhìn qua kính hiển vi thật',
    titleFr: 'Au vrai microscope',
    content: 'Every cell you have met is a real thing. Here they are down a microscope — match each photograph to the drawing you have just seen.',
    contentVn: 'Mỗi tế bào em vừa gặp đều là vật thật. Đây là chúng qua kính hiển vi — hãy ghép mỗi bức ảnh với hình vẽ em vừa xem.',
    contentFr: 'Chaque cellule que tu as rencontrée existe vraiment. Les voici au microscope — associe chaque photo au dessin que tu viens de voir.',
    items: [
      {
        image: img('blood.jpg'),
        term: 'Red blood cells', termVn: 'Tế bào hồng cầu', termFr: 'Globules rouges',
        text: 'Flat discs with a **pale dent** in the middle. The one small purple cell is a white blood cell.',
        textVn: 'Những đĩa dẹt có **vết lõm nhạt màu** ở giữa. Tế bào tím nhỏ là một bạch cầu.',
        textFr: 'Des disques plats avec un **creux pâle** au milieu. La petite cellule violette est un globule blanc.',
      },
      {
        image: img('neuron.jpg'),
        term: 'A neurone', termVn: 'Một tế bào thần kinh', termFr: 'Un neurone',
        text: 'The green cell, with its **long arms** reaching far across the picture.',
        textVn: 'Tế bào màu xanh lá, với những **nhánh dài** vươn ra khắp bức ảnh.',
        textFr: 'La cellule verte, avec ses **longs bras** qui traversent l’image.',
      },
      {
        image: img('trachea.jpg'),
        term: 'Ciliated cells', termVn: 'Tế bào có lông rung', termFr: 'Cellules ciliées',
        text: 'The lining of the windpipe. The **fuzzy dark edge** at the top is the cilia.',
        textVn: 'Lớp lót khí quản. **Mép sẫm lởm chởm** ở trên chính là lông rung.',
        textFr: 'L’intérieur de la trachée. Le **bord sombre et duveteux** en haut, ce sont les cils.',
      },
    ],
  },

  // 11 ─ Root hair cell ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Droplet',
    eyebrow: 'Plant cell 1',
    eyebrowVn: 'Tế bào thực vật 1',
    eyebrowFr: 'Cellule végétale 1',
    title: 'Root Hair Cell',
    titleVn: 'Tế bào lông hút',
    titleFr: 'Cellule de poil absorbant',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.ROOT_HAIR_CELL,
    content:
      'Root hair cells grow on the outside of a plant’s **roots**. Their **function** is to **absorb** — soak up — water from the soil.\n\n' +
      'Each one has a long, thin **extension** pushing out between the soil grains — a big surface for water to move in through. And underground, in the dark, chloroplasts would be no use at all — so a root hair cell builds none.',
    contentVn:
      'Tế bào lông hút mọc ở mặt ngoài **rễ** cây. **Chức năng** của chúng là **hấp thụ** — hút — nước từ đất.\n\n' +
      'Mỗi tế bào có một phần **kéo dài** dài và mảnh, đẩy ra giữa các hạt đất — một bề mặt lớn để nước đi vào. Và dưới lòng đất, trong bóng tối, lục lạp sẽ vô dụng — nên tế bào lông hút không tạo ra cái nào cả.',
    contentFr: 'Les cellules de poil absorbant poussent à l’extérieur des **racines** d’une plante. Leur **fonction** est d’**absorber** — faire entrer — l’eau du sol.\n\nChacune a un long **prolongement** fin qui se glisse entre les grains de terre — une grande surface par où l’eau peut entrer. Et sous terre, dans le noir, des chloroplastes ne serviraient à rien — alors une cellule de poil absorbant n’en fabrique aucun.',
    reveal: {
      label: 'Which parts does the water pass through?',
      labelVn: 'Nước đi qua những bộ phận nào?',
      labelFr: 'Par quelles parties l’eau passe-t-elle ?',
      answer: 'Going from the soil to the vacuole, the water passes through the **cell wall → cell membrane → cytoplasm → vacuole**, in that order.',
      answerVn: 'Đi từ đất vào không bào, nước đi qua **thành tế bào → màng tế bào → tế bào chất → không bào**, theo đúng thứ tự đó.',
      answerFr: 'Du sol jusqu’à la vacuole, l’eau traverse la **paroi cellulaire → la membrane cellulaire → le cytoplasme → la vacuole**, dans cet ordre.',
    },
  },

  // 12 ─ Palisade cell ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sun',
    eyebrow: 'Plant cell 2',
    eyebrowVn: 'Tế bào thực vật 2',
    eyebrowFr: 'Cellule végétale 2',
    title: 'Palisade Cell',
    titleVn: 'Tế bào mô giậu',
    titleFr: 'Cellule palissadique',
    ratio: 48,
    inlineSvg: DIAGRAMS.PALISADE_CELL,
    content:
      'Palisade cells are found in the **leaves**. Their **function** is to make food by **photosynthesis**.\n\n' +
      'They are packed with **chloroplasts**, which hold the green **chlorophyll** that absorbs energy from sunlight.',
    contentVn:
      'Tế bào mô giậu nằm trong **lá** cây. **Chức năng** của chúng là tạo thức ăn bằng **quang hợp**.\n\n' +
      'Chúng chứa đầy **lục lạp**, bên trong có **diệp lục** màu xanh hấp thụ năng lượng từ ánh sáng mặt trời.',
    contentFr: 'Les cellules palissadiques se trouvent dans les **feuilles**. Leur **fonction** est de fabriquer de la nourriture par **photosynthèse**.\n\nElles sont pleines de **chloroplastes**, qui contiennent la **chlorophylle** verte qui absorbe l’énergie de la lumière du soleil.',
    reveal: {
      label: 'Why tall — and why at the top of the leaf?',
      labelVn: 'Vì sao lại cao — và vì sao nằm ở mặt trên của lá?',
      labelFr: 'Pourquoi haute, et en haut de la feuille ?',
      answer: '**Tall** means one cell can stack more chloroplasts one above another, so it catches more light. At the **top** means the light reaches it **first**, before any other cell can shade it. The shape and the position were both chosen by the same job.',
      answerVn: '**Cao** nghĩa là một tế bào xếp được nhiều lục lạp chồng lên nhau, nên bắt được nhiều ánh sáng hơn. Ở **mặt trên** nghĩa là ánh sáng đến với nó **trước tiên**, trước khi có tế bào nào che mất. Cả hình dạng lẫn vị trí đều do cùng một nhiệm vụ quyết định.',
      answerFr: '**Haute** : la cellule empile plus de chloroplastes, donc capte plus de lumière. **En haut** : la lumière l’atteint **en premier**, avant qu’une autre cellule lui fasse de l’ombre. Forme et position viennent du même travail.',
    },
  },

  // 13 ─ Down a real microscope (plant) ─────────────────────────────────────
  {
    layout: 'gallery',
    accent: GREEN,
    tone: 'plant',
    columns: 2,
    eyebrow: 'The plant cells, for real',
    eyebrowVn: 'Tế bào thực vật, ngoài đời thực',
    eyebrowFr: 'Les cellules végétales, pour de vrai',
    title: 'Down a Real Microscope',
    titleVn: 'Nhìn qua kính hiển vi thật',
    titleFr: 'Au vrai microscope',
    content: 'And the two plant cells, as they really look. Match each one to the drawing you have just seen.',
    contentVn: 'Và hai tế bào thực vật, đúng như chúng trông thật. Hãy ghép mỗi cái với hình vẽ em vừa xem.',
    contentFr: 'Et les deux cellules végétales, telles qu’elles sont vraiment. Associe chacune au dessin que tu viens de voir.',
    icon: 'Microscope',
    items: [
      {
        image: img('roothair.jpg'),
        term: 'Root hairs', termVn: 'Lông hút', termFr: 'Poils absorbants',
        text: 'Cress seeds sprouting in soil. The **white fuzz** on each young root is thousands of root hairs.',
        textVn: 'Hạt cải xoong nảy mầm trong đất. **Lớp lông trắng** trên mỗi rễ non là hàng nghìn lông hút.',
        textFr: 'Des graines de cresson qui germent dans la terre. Le **duvet blanc** sur chaque jeune racine, ce sont des milliers de poils absorbants.',
      },
      {
        image: img('leaf.jpg'),
        term: 'Palisade cells', termVn: 'Tế bào mô giậu', termFr: 'Cellules palissadiques',
        text: 'A slice through a leaf. The **tall purple columns** just under the top are the palisade cells, full of chloroplasts.',
        textVn: 'Một lát cắt qua lá. Những **cột tím cao** ngay dưới mặt trên là tế bào mô giậu, chứa đầy lục lạp.',
        textFr: 'Une coupe de feuille. Les **hautes colonnes violettes** juste sous le dessus sont les cellules palissadiques, pleines de chloroplastes.',
      },
    ],
  },

  // 14 ─ Same plant, opposite shapes ────────────────────────────────────────
  {
    layout: 'compare',
    accent: GREEN,
    icon: 'Scale',
    eyebrow: 'One plant, two cells',
    eyebrowVn: 'Một cái cây, hai tế bào',
    eyebrowFr: 'Une plante, deux cellules',
    title: 'Same Plant. Opposite Shapes.',
    titleVn: 'Cùng một cây. Hình dạng trái ngược.',
    titleFr: 'Même plante. Formes opposées.',
    columns: [
      {
        heading: 'Down in the dark',
        headingVn: 'Dưới lòng đất tối',
        headingFr: 'En bas, dans le noir',
        accent: '#a3762f',
        icon: 'Droplet',
        inlineSvg: DIAGRAMS.SHAPE_ROOTHAIR,
        caption: 'Job: **soak up water**. So it grows **long and thin**, out between the grains of soil — and builds **no chloroplasts**, because there is no light to use.',
        captionVn: 'Nhiệm vụ: **hút nước**. Nên nó mọc **dài và mảnh**, len ra giữa các hạt đất — và **không tạo lục lạp**, vì ở đó không có ánh sáng để dùng.',
        captionFr: 'Travail : **absorber l’eau**. Alors elle pousse **longue et fine**, entre les grains de terre — et ne fabrique **pas de chloroplastes**, car il n’y a pas de lumière.',
      },
      {
        heading: 'Up in the light',
        headingVn: 'Trên cao trong ánh sáng',
        headingFr: 'En haut, dans la lumière',
        accent: GREEN,
        icon: 'Sun',
        inlineSvg: DIAGRAMS.SHAPE_PALISADE,
        caption: 'Job: **catch sunlight**. So it grows **tall and packed with chloroplasts**, standing at the very top of the leaf where the light arrives first.',
        captionVn: 'Nhiệm vụ: **bắt ánh sáng**. Nên nó mọc **cao và chứa đầy lục lạp**, đứng ngay mặt trên của lá nơi ánh sáng đến đầu tiên.',
        captionFr: 'Travail : **capter la lumière du soleil**. Alors elle pousse **haute et pleine de chloroplastes**, tout en haut de la feuille, là où la lumière arrive en premier.',
      },
    ],
  },

  // 15 ─ Recap: SORT all five cells → jobs ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Boxes',
    eyebrow: 'Five cells, five jobs',
    eyebrowVn: 'Năm tế bào, năm nhiệm vụ',
    eyebrowFr: 'Cinq cellules, cinq travaux',
    title: 'Match Every Cell to Its Job',
    titleVn: 'Ghép mỗi tế bào với nhiệm vụ của nó',
    titleFr: 'Associe chaque cellule à son travail',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelFr: 'Trier',
    labelIcon: 'Boxes',
    text: 'You have now met all **five** specialised cells.',
    textVn: 'Em đã gặp đủ **năm** tế bào chuyên hoá.',
    textFr: 'Tu as maintenant rencontré les **cinq** cellules spécialisées.',
    sub: 'Sort each one into the job it does.',
    subVn: 'Sắp xếp mỗi tế bào vào đúng nhiệm vụ của nó.',
    subFr: 'Range chacune avec le travail qu’elle fait.',
    activity: {
      id: 'a4', type: 'sort',
      prompt: 'Sort each specialised cell into the job it does.',
      promptVn: 'Sắp xếp mỗi tế bào chuyên hoá vào đúng nhiệm vụ của nó.',
      promptFr: 'Range chaque cellule spécialisée avec le travail qu’elle fait.',
      bins: [
        { id: 'oxygen', name: 'Carries oxygen', nameVn: 'Chở oxy', nameFr: 'Transporte l’oxygène' },
        { id: 'signals', name: 'Carries signals', nameVn: 'Truyền tín hiệu', nameFr: 'Transmet des signaux' },
        { id: 'mucus', name: 'Sweeps mucus', nameVn: 'Quét chất nhầy', nameFr: 'Balaie le mucus' },
        { id: 'water', name: 'Absorbs water', nameVn: 'Hấp thụ nước', nameFr: 'Absorbe l’eau' },
        { id: 'food', name: 'Makes food', nameVn: 'Tạo thức ăn', nameFr: 'Fabrique de la nourriture' },
      ],
      cards: [
        { id: 'rbc', name: 'Red blood cell', nameVn: 'Tế bào hồng cầu', nameFr: 'Globule rouge', bin: 'oxygen' },
        { id: 'neurone', name: 'Neurone', nameVn: 'Tế bào thần kinh', nameFr: 'Neurone', bin: 'signals' },
        { id: 'ciliated', name: 'Ciliated cell', nameVn: 'Tế bào có lông rung', nameFr: 'Cellule ciliée', bin: 'mucus' },
        { id: 'roothair', name: 'Root hair cell', nameVn: 'Tế bào lông hút', nameFr: 'Cellule de poil absorbant', bin: 'water' },
        { id: 'palisade', name: 'Palisade cell', nameVn: 'Tế bào mô giậu', nameFr: 'Cellule palissadique', bin: 'food' },
      ],
      explain: 'Oxygen → red blood cell (haemoglobin, no nucleus). Signals → neurone (a long axon). Mucus → ciliated cell (moving cilia). Water → root hair cell (a long thin hair). Food → palisade cell (packed with chloroplasts). Five jobs, five different shapes — structure fits function every time.',
      explainVn: 'Oxy → tế bào hồng cầu (haemoglobin, không nhân). Tín hiệu → tế bào thần kinh (sợi trục dài). Chất nhầy → tế bào có lông rung (lông rung chuyển động). Nước → tế bào lông hút (lông dài mảnh). Thức ăn → tế bào mô giậu (chứa đầy lục lạp). Năm nhiệm vụ, năm hình dạng khác nhau — cấu trúc luôn phù hợp với chức năng.',
      explainFr: 'Oxygène → globule rouge (hémoglobine, pas de noyau). Signaux → neurone (un long axone). Mucus → cellule ciliée (cils mobiles). Eau → cellule de poil absorbant (un long poil fin). Nourriture → cellule palissadique (pleine de chloroplastes). Cinq travaux, cinq formes différentes — la structure sert la fonction à chaque fois.',
    },
  },

  // 16 ─ How scientists record it (both tables, viewed not copied) ─────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'How scientists keep track',
    eyebrowVn: 'Cách các nhà khoa học ghi chép',
    eyebrowFr: 'Comment les scientifiques s’y retrouvent',
    title: 'How Scientists Record It',
    titleVn: 'Cách ghi lại thông tin',
    titleFr: 'Comment les scientifiques le notent',
    columns: [
      {
        heading: 'The three animal cells', headingVn: 'Ba tế bào động vật', headingFr: 'Les trois cellules animales',
        accent: CRIMSON,
        icon: 'Users',
        inlineSvg: DIAGRAMS.ANIMAL_TABLE,
        caption: 'Four columns: name, function, structure, how it helps. The red blood cell’s row is filled in — see how each column follows from the one before it.',
        captionVn: 'Bốn cột: tên, chức năng, cấu trúc, tác dụng. Dòng của tế bào hồng cầu đã được điền sẵn — hãy xem mỗi cột nối tiếp cột trước ra sao.',
        captionFr: 'Quatre colonnes : nom, fonction, structure, en quoi elle aide. La ligne du globule rouge est remplie — regarde comment chaque colonne découle de la précédente.',
      },
      {
        heading: 'The two plant cells', headingVn: 'Hai tế bào thực vật', headingFr: 'Les deux cellules végétales',
        accent: GREEN,
        icon: 'Leaf',
        inlineSvg: DIAGRAMS.PLANT_TABLE,
        caption: 'The same four columns again. Once you know a cell’s job, you can usually work out its structure before you are told it.',
        captionVn: 'Vẫn bốn cột đó. Khi đã biết nhiệm vụ của một tế bào, em thường có thể đoán ra cấu trúc của nó trước khi được cho biết.',
        captionFr: 'Les mêmes quatre colonnes. Quand tu connais le travail d’une cellule, tu peux souvent deviner sa structure avant qu’on te la dise.',
      },
    ],
  },

  // 17 ─ Structure fits function (the sentence frame) ──────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'Structure Fits Function',
    titleVn: 'Cấu trúc phù hợp với chức năng',
    titleFr: 'La structure sert la fonction',
    ratio: 45,
    content:
      'Every cell today told the **same kind of story**: it has a job, and a special feature that helps it do that job.\n\n' +
      'There is one English sentence that says it every time. Learn the frame and you can describe **any** specialised cell — including ones you have never met.',
    contentVn:
      'Mọi tế bào hôm nay đều kể **cùng một kiểu câu chuyện**: nó có một nhiệm vụ, và một đặc điểm đặc biệt giúp nó làm nhiệm vụ đó.\n\n' +
      'Có một câu tiếng Anh nói điều đó mỗi lần. Học mẫu câu này thì em mô tả được **bất kỳ** tế bào chuyên hoá nào — kể cả loại em chưa từng gặp.',
    contentFr: 'Chaque cellule du jour a raconté **la même histoire** : un travail, et une particularité qui l’aide à le faire.\n\nUne seule phrase anglaise le dit à chaque fois. Apprends ce modèle pour décrire **n’importe quelle** cellule spécialisée — même une que tu n’as jamais vue.',
    notes: [
      {
        tone: 'write',
        text:
          '**The sentence frame:**\n' +
          'A [cell] is **adapted to** [its job] **because it has** [its special feature].\n' +
          '“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
        textVn:
          '**Mẫu câu:**\n' +
          'A [cell] is **adapted to** [nhiệm vụ] **because it has** [đặc điểm đặc biệt].\n' +
          '“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
        textFr: '**Modèle de phrase :**\nA [cell] is **adapted to** [son travail] **because it has** [sa particularité].\n“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
      },
    ],
    reveal: {
      label: 'Your turn — think it through, then check',
      labelVn: 'Đến lượt em — suy nghĩ, rồi kiểm tra',
      labelFr: 'À toi — réfléchis, puis vérifie',
      prompt: '“A palisade cell is adapted to ______ because it has ______ .”',
      promptVn: '“A palisade cell is adapted to ______ because it has ______ .”',
      promptFr: '“A palisade cell is adapted to ______ because it has ______ .”',
      answer: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**.',
      answerVn: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**. (Tế bào mô giậu thích nghi để quang hợp vì nó có nhiều lục lạp gần mặt trên của lá.)',
      answerFr: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**.',
    },
  },

  // 18 ─ Say it before you see it (widget) ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Say It Before You See It',
    titleVn: 'Nói trước khi nhìn thấy',
    titleFr: 'Dis-le avant de le voir',
    ratio: 45,
    content: 'One cell at a time. For each photo, say its **job** and its **special feature** out loud **before** you reveal them — then check.',
    contentVn: 'Mỗi lần một tế bào. Với mỗi bức ảnh, hãy nói to **nhiệm vụ** và **đặc điểm đặc biệt** của nó **trước khi** hiện đáp án — rồi kiểm tra.',
    contentFr: 'Une cellule à la fois. Pour chaque photo, dis à voix haute son **travail** et sa **particularité** **avant** de les afficher — puis vérifie.',
    notes: [
      {
        tone: 'task',
        badge: 'Before you reveal',
        badgeVn: 'Trước khi hiện đáp án',
        badgeFr: 'Avant d’afficher',
        text: 'Think of the cell’s job **before** you press the button. Use the sentence frame if it helps.',
        textVn: 'Nghĩ ra nhiệm vụ của tế bào **trước khi** bấm nút. Dùng mẫu câu nếu cần.',
        textFr: 'Pense au travail de la cellule **avant** d’appuyer sur le bouton. Utilise le modèle de phrase si ça t’aide.',
      },
    ],
    widget: SpecialisedCellWidget,
  },

  // 19 ─ Recap ──────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    titleFr: 'Sais-tu faire les six ?',
    content:
      '> One to think about: the small purple **white blood cell** in the blood photograph chases germs and swallows them whole. Why would a **fixed** shape be no good for that job?',
    contentVn:
      '> Một điều để suy nghĩ: con **bạch cầu** nhỏ màu tím trong bức ảnh máu đuổi theo vi khuẩn và nuốt trọn chúng. Vì sao một hình dạng **cố định** lại không phù hợp với nhiệm vụ đó?',
    contentFr: '> Une question à méditer : le petit **globule blanc** violet sur la photo du sang poursuit les microbes et les avale tout entiers. Pourquoi une forme **fixe** ne conviendrait-elle pas à ce travail ?',
    items: [
      { text: 'Say what **function** and **specialised** mean.', textVn: 'Nói được **chức năng** và **chuyên hoá** nghĩa là gì.', textFr: 'Dire ce que veulent dire **fonction** et **spécialisée**.' },
      { text: 'Name the **three** specialised animal cells and each one’s job.', textVn: 'Kể **ba** tế bào động vật chuyên hoá và nhiệm vụ của từng cái.', textFr: 'Nommer les **trois** cellules animales spécialisées et le travail de chacune.' },
      { text: 'Name the **two** specialised plant cells and each one’s job.', textVn: 'Kể **hai** tế bào thực vật chuyên hoá và nhiệm vụ của từng cái.', textFr: 'Nommer les **deux** cellules végétales spécialisées et le travail de chacune.' },
      { text: 'Use the frame: **adapted to ___ because it has ___**.', textVn: 'Dùng mẫu câu: **adapted to ___ because it has ___**.', textFr: 'Utiliser le modèle : **adapted to ___ because it has ___**.' },
      { text: 'Explain why a root hair cell has **no chloroplasts**.', textVn: 'Giải thích vì sao tế bào lông hút **không có lục lạp**.', textFr: 'Expliquer pourquoi une cellule de poil absorbant n’a **pas de chloroplastes**.' },
      { text: 'Read a table that records a cell’s **name, function, structure and benefit**.', textVn: 'Đọc được một bảng ghi **tên, chức năng, cấu trúc và tác dụng** của tế bào.', textFr: 'Lire un tableau qui note le **nom, la fonction, la structure et l’avantage** d’une cellule.' },
    ],
  },
];
