// src/data/Y7_SCI/U02_2/workbook.js
// Practice for 2.2 Changes of State — eleven questions across six answer
// widgets: multiple choice, dropdown-in-sentence, drag-into-targets (sorting
// and matching), drag-into-one-target (ordering), typed-in-the-blanks and a
// single typed number. No two consecutive questions share a type
// (ENGAGEMENT-PLAN §2.4). The "Which Change of State?" paper exercise the
// classroom deck used moved here as p4's match and c2's sort.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Ice is heated until it is liquid water. Which word names this change?',
        promptVn: 'Đá được đun nóng cho đến khi thành nước lỏng. Từ nào gọi tên sự thay đổi này?',
        options: [
          { val: 'A', text: 'Melting', textVn: 'Nóng chảy (Melting)' },
          { val: 'B', text: 'Freezing', textVn: 'Đông đặc (Freezing)' },
          { val: 'C', text: 'Boiling', textVn: 'Sôi (Boiling)' },
        ],
        correct: 'A',
        solution: ['Solid to liquid, by heating, is melting.', 'Freezing is the reverse (liquid to solid); boiling is a much faster change, liquid to gas.'],
        solutionVn: ['Rắn sang lỏng, do đun nóng, là nóng chảy.', 'Đông đặc là chiều ngược lại (lỏng sang rắn); sôi là một sự thay đổi nhanh hơn nhiều, lỏng sang khí.'],
        answer: 'A', answerVn: 'A',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Complete the sentence about solid → liquid.',
        promptVn: 'Hoàn thành câu về rắn → lỏng.',
        textParts: ['The doing word for solid → liquid is ', ', and the naming word is ', '.'],
        textPartsVn: ['Động từ cho rắn → lỏng là ', ', và danh từ là ', '.'],
        blanks: {
          1: { options: [{ val: 'melt', text: 'melt', textVn: 'melt' }, { val: 'freeze', text: 'freeze', textVn: 'freeze' }, { val: 'boil', text: 'boil', textVn: 'boil' }], correct: 'melt' },
          2: { options: [{ val: 'melting', text: 'melting', textVn: 'melting' }, { val: 'freezing', text: 'freezing', textVn: 'freezing' }, { val: 'condensation', text: 'condensation', textVn: 'condensation' }], correct: 'melting' },
        },
        solution: ['You melt the ice — melt is the verb (doing word).', 'Melting is the noun (naming word): "melting is a change of state".'],
        solutionVn: ['Em "melt" viên đá — melt là động từ.', '"Melting" là danh từ: "melting is a change of state".'],
        answer: 'melt; melting', answerVn: 'melt; melting',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Sort the five changes: which need heating, and which need cooling?',
        promptVn: 'Sắp xếp năm sự chuyển thể: cái nào cần đun nóng, cái nào cần làm lạnh?',
        bank: [
          { val: 'melt', text: 'Melting', textVn: 'Nóng chảy' },
          { val: 'freeze', text: 'Freezing', textVn: 'Đông đặc' },
          { val: 'boil', text: 'Boiling', textVn: 'Sôi' },
          { val: 'evaporate', text: 'Evaporating', textVn: 'Bay hơi' },
          { val: 'condense', text: 'Condensing', textVn: 'Ngưng tụ' },
        ],
        targets: [
          { id: 'heat', title: 'Needs heating', titleVn: 'Cần đun nóng' },
          { id: 'cool', title: 'Needs cooling', titleVn: 'Cần làm lạnh' },
        ],
        correctSets: { heat: ['melt', 'boil', 'evaporate'], cool: ['freeze', 'condense'] },
        solution: ['Melting, boiling and evaporating all need heat going IN — they move solid → liquid → gas.', 'Freezing and condensing need heat coming OUT — they move the other way, gas → liquid → solid.'],
        solutionVn: ['Nóng chảy, sôi và bay hơi đều cần nhiệt đi VÀO — chúng chuyển rắn → lỏng → khí.', 'Đông đặc và ngưng tụ cần nhiệt đi RA — chúng chuyển theo chiều ngược lại, khí → lỏng → rắn.'],
        answer: 'Heating: melt, boil, evaporate · Cooling: freeze, condense', answerVn: 'Đun nóng: nóng chảy, sôi, bay hơi · Làm lạnh: đông đặc, ngưng tụ',
      },
      {
        id: 'f4', type: 'fill_blank',
        prompt: 'Complete the two fixed points on water’s temperature scale.',
        promptVn: 'Hoàn thành hai mốc cố định trên thang nhiệt độ của nước.',
        textParts: ['Ice melts at ', ' °C, and water boils at ', ' °C.'],
        textPartsVn: ['Nước đá nóng chảy ở ', ' °C, và nước sôi ở ', ' °C.'],
        blanks: { 1: { correct: '0', width: 4 }, 2: { correct: '100', width: 4 } },
        solution: ['0 °C is the melting point of ice (and the freezing point of water).', '100 °C is the boiling point of water.'],
        solutionVn: ['0 °C là nhiệt độ nóng chảy của nước đá (và cũng là nhiệt độ đông đặc của nước).', '100 °C là nhiệt độ sôi của nước.'],
        answer: '0 °C and 100 °C', answerVn: '0 °C và 100 °C',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', type: 'order',
        prompt: 'Put the method for heating water in the correct order.',
        promptVn: 'Sắp xếp cách tiến hành đun nước theo đúng thứ tự.',
        bank: [
          { val: 'measure', text: 'Measure 150 cm³ of water into the beaker', textVn: 'Đong 150 cm³ nước vào cốc' },
          { val: 'bulb', text: 'Put the thermometer bulb in the water, not touching the bottom', textVn: 'Đặt bầu nhiệt kế trong nước, không chạm đáy' },
          { val: 'zero', text: 'Read and record the temperature at 0 minutes', textVn: 'Đọc và ghi nhiệt độ ở phút 0' },
          { val: 'light', text: 'Light the Bunsen and read the temperature every minute', textVn: 'Châm đèn Bunsen và đọc nhiệt độ mỗi phút' },
          { val: 'boil', text: 'Keep going until the water is boiling hard', textVn: 'Tiếp tục cho đến khi nước sôi mạnh' },
        ],
        targets: [{ id: 'seq', title: 'The method, in order', titleVn: 'Cách tiến hành, theo thứ tự' }],
        correctSets: { seq: ['measure', 'bulb', 'zero', 'light', 'boil'] },
        solution: ['Set up first — measure the water and place the thermometer — then take the starting reading before any heat is added.', 'Only then light the Bunsen, reading every minute, until the water is boiling hard.'],
        solutionVn: ['Chuẩn bị trước — đong nước và đặt nhiệt kế — rồi đọc nhiệt độ ban đầu trước khi đun.', 'Chỉ sau đó mới châm đèn Bunsen, đọc mỗi phút, cho đến khi nước sôi mạnh.'],
        answer: 'measure, bulb, zero, light, boil', answerVn: 'đong nước, đặt nhiệt kế, đọc phút 0, châm đèn & đọc mỗi phút, đến khi sôi mạnh',
      },
      {
        id: 'p2', type: 'dnd',
        prompt: 'Match each change to its direction. Drag the **direction** onto its **change**.',
        promptVn: 'Ghép mỗi sự chuyển thể với chiều của nó. Kéo **chiều** vào **sự chuyển thể**.',
        bank: [
          { val: 'sl', text: 'Solid to liquid', textVn: 'Rắn sang lỏng' },
          { val: 'ls', text: 'Liquid to solid', textVn: 'Lỏng sang rắn' },
          { val: 'lg', text: 'Liquid to gas', textVn: 'Lỏng sang khí' },
          { val: 'gl', text: 'Gas to liquid', textVn: 'Khí sang lỏng' },
        ],
        targets: [
          { id: 'melt', title: 'Melting', titleVn: 'Nóng chảy' },
          { id: 'freeze', title: 'Freezing', titleVn: 'Đông đặc' },
          { id: 'boil', title: 'Boiling', titleVn: 'Sôi' },
          { id: 'condense', title: 'Condensing', titleVn: 'Ngưng tụ' },
        ],
        correctSets: { melt: ['sl'], freeze: ['ls'], boil: ['lg'], condense: ['gl'] },
        solution: ['Melting → solid to liquid. Freezing → liquid to solid (the reverse).', 'Boiling → liquid to gas. Condensing → gas to liquid (the reverse). Evaporating is also liquid to gas, just slow.'],
        solutionVn: ['Nóng chảy → rắn sang lỏng. Đông đặc → lỏng sang rắn (chiều ngược).', 'Sôi → lỏng sang khí. Ngưng tụ → khí sang lỏng (chiều ngược). Bay hơi cũng là lỏng sang khí, chỉ là chậm.'],
        answer: 'melt–solid to liquid, freeze–liquid to solid, boil–liquid to gas, condense–gas to liquid', answerVn: 'nóng chảy–rắn sang lỏng, đông đặc–lỏng sang rắn, sôi–lỏng sang khí, ngưng tụ–khí sang lỏng',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'A puddle dries up over a whole afternoon, with no bubbles. What is TRUE about this change?',
        promptVn: 'Một vũng nước khô dần suốt cả buổi chiều, không có bọt khí. Điều gì ĐÚNG về sự thay đổi này?',
        options: [
          { val: 'A', text: 'It only happens at 100 °C', textVn: 'Nó chỉ xảy ra ở 100 °C' },
          { val: 'B', text: 'It happens slowly, only from the surface, at any temperature', textVn: 'Nó xảy ra chậm, chỉ từ bề mặt, ở bất kỳ nhiệt độ nào' },
          { val: 'C', text: 'It happens all through the liquid at once', textVn: 'Nó xảy ra khắp trong lòng chất lỏng cùng lúc' },
        ],
        correct: 'B',
        solution: ['Slow, no bubbles, over hours — this is evaporation, which happens only at the liquid’s surface.', 'B is boiling’s description, and A is boiling’s temperature — evaporation needs neither.'],
        solutionVn: ['Chậm, không bọt, kéo dài hàng giờ — đây là bay hơi, chỉ xảy ra ở bề mặt chất lỏng.', 'B và A mô tả sự sôi — bay hơi không cần điều kiện đó.'],
        answer: 'B', answerVn: 'B',
      },
      {
        id: 'p4', type: 'dnd',
        prompt: 'Match each real-life situation to its change of state.',
        promptVn: 'Ghép mỗi tình huống đời thực với sự chuyển thể của nó.',
        bank: [
          { val: 's1', text: 'Drops of water appear on the outside of a cold bottle', textVn: 'Các giọt nước xuất hiện ở mặt ngoài một chai lạnh' },
          { val: 's2', text: 'A puddle turns to ice overnight', textVn: 'Một vũng nước đóng thành băng qua đêm' },
          { val: 's3', text: 'A chocolate bar goes soft and runny in your hand', textVn: 'Một thanh sô-cô-la mềm ra và chảy trong tay em' },
          { val: 's4', text: 'A wet swimsuit dries on hot pavement', textVn: 'Một bộ đồ bơi ướt khô trên nền đường nóng' },
        ],
        targets: [
          { id: 'condense', title: 'Condensing', titleVn: 'Ngưng tụ' },
          { id: 'freeze', title: 'Freezing', titleVn: 'Đông đặc' },
          { id: 'melt', title: 'Melting', titleVn: 'Nóng chảy' },
          { id: 'evaporate', title: 'Evaporating', titleVn: 'Bay hơi' },
        ],
        correctSets: { condense: ['s1'], freeze: ['s2'], melt: ['s3'], evaporate: ['s4'] },
        solution: ['Water vapour in the air cools on the cold bottle and condenses. The puddle loses heat overnight and freezes.', 'The chocolate gains heat from your hand and melts. The swimsuit’s water slowly evaporates in the heat.'],
        solutionVn: ['Hơi nước trong không khí gặp lạnh trên chai và ngưng tụ. Vũng nước mất nhiệt qua đêm và đông đặc.', 'Sô-cô-la nhận nhiệt từ tay em và nóng chảy. Nước trong đồ bơi từ từ bay hơi trong cái nóng.'],
        answer: 'bottle–condensing, puddle–freezing, chocolate–melting, swimsuit–evaporating', answerVn: 'chai–ngưng tụ, vũng nước–đông đặc, sô-cô-la–nóng chảy, đồ bơi–bay hơi',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1',
        prompt: 'Water starts at 22 °C and is heated at a steady 6 °C per minute. What is its temperature after 5 minutes? Type the number.',
        promptVn: 'Nước bắt đầu ở 22 °C và được đun đều ở tốc độ 6 °C mỗi phút. Nhiệt độ của nó sau 5 phút là bao nhiêu? Nhập con số.',
        solution: ['In 5 minutes the rise is $6 × 5 = 30$ °C.', 'Add that to the start: $22 + 30 = 52$ °C.'],
        solutionVn: ['Trong 5 phút, mức tăng là $6 × 5 = 30$ °C.', 'Cộng vào nhiệt độ ban đầu: $22 + 30 = 52$ °C.'],
        answer: '52', answerVn: '52',
      },
      {
        id: 'c2', type: 'inline',
        prompt: 'Complete the sentences about the heating curve.',
        promptVn: 'Hoàn thành các câu về đồ thị đun nước.',
        textParts: ['While the water boils, the temperature ', ' because the heat is being used to ', '.'],
        textPartsVn: ['Trong khi nước sôi, nhiệt độ ', ' vì nhiệt đang được dùng để ', '.'],
        blanks: {
          1: { options: [{ val: 'same', text: 'stays the same', textVn: 'giữ nguyên' }, { val: 'rise', text: 'keeps rising', textVn: 'tiếp tục tăng' }, { val: 'fall', text: 'falls', textVn: 'giảm' }], correct: 'same' },
          2: { options: [{ val: 'gas', text: 'turn the liquid into a gas', textVn: 'biến chất lỏng thành khí' }, { val: 'cool', text: 'cool the beaker down', textVn: 'làm nguội cốc' }, { val: 'melt', text: 'melt the glass', textVn: 'làm chảy thủy tinh' }], correct: 'gas' },
        },
        solution: ['At 100 °C the temperature stays the same for as long as the water is boiling.', 'The heat energy is used to change the liquid into steam, a gas, instead of raising the temperature further.'],
        solutionVn: ['Ở 100 °C, nhiệt độ giữ nguyên suốt thời gian nước sôi.', 'Năng lượng nhiệt được dùng để biến chất lỏng thành hơi, chất khí, thay vì làm tăng nhiệt độ thêm.'],
        answer: 'stays the same; turn the liquid into a gas', answerVn: 'giữ nguyên; biến chất lỏng thành khí',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'A pot of water is boiling hard on a hot stove for ten minutes. Why does the water not get hotter than 100 °C?',
        promptVn: 'Một nồi nước sôi mạnh trên bếp nóng suốt mười phút. Vì sao nước không nóng hơn 100 °C?',
        options: [
          { val: 'A', text: 'The stove cannot get any hotter than the water', textVn: 'Bếp không thể nóng hơn nước' },
          { val: 'B', text: 'All the extra heat is used to turn liquid water into steam, not to raise its temperature', textVn: 'Tất cả nhiệt thêm vào được dùng để biến nước lỏng thành hơi, không phải để tăng nhiệt độ' },
          { val: 'C', text: 'Water cannot absorb any more heat once it starts moving', textVn: 'Nước không thể hấp thụ thêm nhiệt khi đã bắt đầu chuyển động' },
        ],
        correct: 'B',
        solution: ['100 °C is water’s boiling point — once reached, every bit of extra heat goes into changing the state (liquid → gas), not into raising the temperature.', 'A and C are not true: the stove is far hotter than 100 °C, and water absorbs heat throughout — it just spends it on the change of state instead.'],
        solutionVn: ['100 °C là nhiệt độ sôi của nước — khi đã đạt tới, mọi nhiệt thêm vào đều dùng để đổi trạng thái (lỏng → khí), không dùng để tăng nhiệt độ.', 'A và C đều sai: bếp nóng hơn 100 °C rất nhiều, và nước vẫn hấp thụ nhiệt suốt — chỉ là nó dùng nhiệt đó để đổi trạng thái.'],
        answer: 'B', answerVn: 'B',
      },
    ],
  },
];
