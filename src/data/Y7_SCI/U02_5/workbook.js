// src/data/Y7_SCI/U02_5/workbook.js
// Practice for 2.5 Atoms, Elements and the Periodic Table — eleven questions
// across six answer widgets: multiple choice, drag-into-targets (sorting and
// matching), dropdown-in-sentence, typed-in-the-blanks, drag-into-one-target
// (ordering) and a single typed number. No two consecutive questions share a
// type (ENGAGEMENT-PLAN §2.4).
//
// Typed boxes here only ever take NUMBERS: the workbook marks typed answers by
// algebraic equivalence, which would read a symbol like "Na" as N × a. Typing
// symbols, with the capital-letter rule marked properly, is Element Hunt's job
// (utils/elements.js diagnoseSymbol). Book questions 1–8 are in the deck; these
// are new.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'What is an **element**?',
        promptVn: '**Nguyên tố** là gì?',
        options: [
          { val: 'A', text: 'A tiny piece of matter that cannot be divided', textVn: 'Một mẩu vật chất rất nhỏ không thể chia nhỏ' },
          { val: 'B', text: 'A substance made of only one kind of atom', textVn: 'Một chất chỉ được tạo nên từ một loại nguyên tử' },
          { val: 'C', text: 'A row in the Periodic Table', textVn: 'Một hàng trong Bảng tuần hoàn' },
        ],
        correct: 'B',
        solution: ['An element is a substance made of only one kind of atom — gold, silver, carbon.', 'A is an **atom**, the tiny piece itself; C is a **period**.'],
        solutionVn: ['Nguyên tố là một chất chỉ được tạo nên từ một loại nguyên tử — vàng, bạc, cacbon.', 'A là **nguyên tử**, chính mẩu nhỏ đó; C là **chu kì**.'],
        answer: 'B', answerVn: 'B',
      },
      {
        id: 'f2', type: 'dnd',
        prompt: 'Sort the elements: metal or non-metal?',
        promptVn: 'Sắp xếp các nguyên tố: kim loại hay phi kim?',
        bank: [
          { val: 'na', text: 'Sodium', textVn: 'Natri (sodium)' },
          { val: 'o', text: 'Oxygen', textVn: 'Oxi (oxygen)' },
          { val: 'mg', text: 'Magnesium', textVn: 'Magie (magnesium)' },
          { val: 'ne', text: 'Neon', textVn: 'Neon' },
          { val: 'ca', text: 'Calcium', textVn: 'Canxi (calcium)' },
          { val: 's', text: 'Sulfur', textVn: 'Lưu huỳnh (sulfur)' },
          { val: 'al', text: 'Aluminium', textVn: 'Nhôm (aluminium)' },
          { val: 'cl', text: 'Chlorine', textVn: 'Clo (chlorine)' },
        ],
        targets: [
          { id: 'metal', title: 'Metal', titleVn: 'Kim loại' },
          { id: 'non', title: 'Non-metal', titleVn: 'Phi kim' },
        ],
        correctSets: { metal: ['na', 'mg', 'ca', 'al'], non: ['o', 'ne', 's', 'cl'] },
        solution: ['Sodium, magnesium, calcium and aluminium sit on the **left** of their rows: the yellow metals.', 'Oxygen, neon, sulfur and chlorine sit on the **right**: the blue non-metals.'],
        solutionVn: ['Natri, magie, canxi và nhôm nằm ở bên **trái** hàng của chúng: các kim loại màu vàng.', 'Oxi, neon, lưu huỳnh và clo nằm ở bên **phải**: các phi kim màu xanh.'],
        answer: 'Metal: sodium, magnesium, calcium, aluminium · Non-metal: oxygen, neon, sulfur, chlorine', answerVn: 'Kim loại: natri, magie, canxi, nhôm · Phi kim: oxi, neon, lưu huỳnh, clo',
      },
      {
        id: 'f3', type: 'inline',
        prompt: 'Complete the sentence about the Periodic Table.',
        promptVn: 'Hoàn thành câu về Bảng tuần hoàn.',
        textParts: ['In the Periodic Table, a period is a ', ' and a group is a ', '.'],
        textPartsVn: ['Trong Bảng tuần hoàn, một chu kì (period) là một ', ' và một nhóm (group) là một ', '.'],
        blanks: {
          1: { options: [{ val: 'row', text: 'row', textVn: 'hàng' }, { val: 'column', text: 'column', textVn: 'cột' }, { val: 'lesson', text: 'lesson', textVn: 'tiết học' }], correct: 'row' },
          2: { options: [{ val: 'row', text: 'row', textVn: 'hàng' }, { val: 'column', text: 'column', textVn: 'cột' }, { val: 'people', text: 'set of people', textVn: 'nhóm người' }], correct: 'column' },
        },
        solution: ['A **period** goes across: it is a row.', 'A **group** goes down: it is a column. "A lesson" and "people together" are the everyday meanings.'],
        solutionVn: ['Một **chu kì** đi ngang: nó là một hàng.', 'Một **nhóm** đi xuống: nó là một cột. "Một tiết học" và "một nhóm người" là nghĩa đời thường.'],
        answer: 'row; column', answerVn: 'hàng; cột',
      },
      {
        id: 'f4', type: 'fill_blank',
        prompt: 'Complete the numbers.',
        promptVn: 'Hoàn thành các con số.',
        textParts: ['There are ', ' kinds of atom in nature, so there are 94 natural elements. With the 24 made by scientists, the Periodic Table has ', ' elements.'],
        textPartsVn: ['Có ', ' loại nguyên tử trong tự nhiên, nên có 94 nguyên tố tự nhiên. Cộng thêm 24 nguyên tố do các nhà khoa học tạo ra, Bảng tuần hoàn có ', ' nguyên tố.'],
        blanks: { 1: { correct: '94', width: 4 }, 2: { correct: '118', width: 4 } },
        solution: ['One kind of atom is one element, so 94 kinds of atom make 94 natural elements.', '94 + 24 = **118** elements in the whole table.'],
        solutionVn: ['Một loại nguyên tử là một nguyên tố, nên 94 loại nguyên tử tạo thành 94 nguyên tố tự nhiên.', '94 + 24 = **118** nguyên tố trong cả bảng.'],
        answer: '94 and 118', answerVn: '94 và 118',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', type: 'order',
        prompt: 'Put these elements in order of the mass of their atoms, **lightest first**.',
        promptVn: 'Sắp xếp các nguyên tố theo khối lượng nguyên tử, **nhẹ nhất trước**.',
        bank: [
          { val: 'h', text: 'Hydrogen (H)', textVn: 'Hiđro (H)' },
          { val: 'c', text: 'Carbon (C)', textVn: 'Cacbon (C)' },
          { val: 'na', text: 'Sodium (Na)', textVn: 'Natri (Na)' },
          { val: 'cl', text: 'Chlorine (Cl)', textVn: 'Clo (Cl)' },
          { val: 'ca', text: 'Calcium (Ca)', textVn: 'Canxi (Ca)' },
        ],
        targets: [{ id: 'seq', title: 'Lightest → heaviest', titleVn: 'Nhẹ nhất → nặng nhất' }],
        correctSets: { seq: ['h', 'c', 'na', 'cl', 'ca'] },
        solution: ['Read the table like a page of English: left to right, then the next row. The atoms get heavier as you go.', 'Hydrogen is first (period 1), carbon in period 2, sodium then chlorine across period 3, and calcium is last.'],
        solutionVn: ['Đọc bảng như đọc một trang tiếng Anh: từ trái sang phải, rồi xuống hàng tiếp. Nguyên tử nặng dần.', 'Hiđro đứng đầu (chu kì 1), cacbon ở chu kì 2, natri rồi clo trong chu kì 3, và canxi đứng cuối.'],
        answer: 'hydrogen, carbon, sodium, chlorine, calcium', answerVn: 'hiđro, cacbon, natri, clo, canxi',
      },
      {
        id: 'p2', type: 'dnd',
        prompt: 'Sort the elements by how their atoms join together.',
        promptVn: 'Sắp xếp các nguyên tố theo cách các nguyên tử của chúng liên kết.',
        bank: [
          { val: 'ne', text: 'Neon', textVn: 'Neon' },
          { val: 'au', text: 'Gold', textVn: 'Vàng (gold)' },
          { val: 'o', text: 'Oxygen', textVn: 'Oxi (oxygen)' },
          { val: 'ag', text: 'Silver', textVn: 'Bạc (silver)' },
          { val: 's', text: 'Sulfur', textVn: 'Lưu huỳnh (sulfur)' },
          { val: 'he', text: 'Helium', textVn: 'Heli (helium)' },
        ],
        targets: [
          { id: 'alone', title: 'Atoms alone', titleVn: 'Nguyên tử đứng riêng' },
          { id: 'packed', title: 'Atoms packed closely', titleVn: 'Nguyên tử xếp sát nhau' },
          { id: 'particles', title: 'Small particles of joined atoms', titleVn: 'Hạt nhỏ gồm các nguyên tử liên kết' },
        ],
        correctSets: { alone: ['ne', 'he'], packed: ['au', 'ag'], particles: ['o', 's'] },
        solution: ['Neon and helium, in group 8 with argon, are atoms that move around alone.', 'Gold and silver, like most elements, are atoms packed closely. Oxygen (2 atoms) and sulfur (8 atoms in a ring) are small particles.'],
        solutionVn: ['Neon và heli, cùng nhóm 8 với agon, là các nguyên tử chuyển động riêng lẻ.', 'Vàng và bạc, như hầu hết các nguyên tố, là nguyên tử xếp sát nhau. Oxi (2 nguyên tử) và lưu huỳnh (8 nguyên tử thành vòng) là các hạt nhỏ.'],
        answer: 'Alone: neon, helium · Packed: gold, silver · Particles: oxygen, sulfur', answerVn: 'Riêng lẻ: neon, heli · Xếp sát: vàng, bạc · Hạt nhỏ: oxi, lưu huỳnh',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'Which two elements are in the **same period** as magnesium?',
        promptVn: 'Hai nguyên tố nào cùng **chu kì** với magnesium (magie)?',
        options: [
          { val: 'A', text: 'Beryllium and calcium', textVn: 'Beri (beryllium) và canxi (calcium)' },
          { val: 'B', text: 'Hydrogen and helium', textVn: 'Hiđro (hydrogen) và heli (helium)' },
          { val: 'C', text: 'Sodium and argon', textVn: 'Natri (sodium) và agon (argon)' },
          { val: 'D', text: 'Lithium and potassium', textVn: 'Liti (lithium) và kali (potassium)' },
        ],
        correct: 'C',
        solution: ['Magnesium is in period 3, the third row: sodium, magnesium, aluminium, silicon, phosphorus, sulfur, chlorine, argon.', 'A is magnesium’s **group** (the column); B is period 1; D is group 1.'],
        solutionVn: ['Magie ở chu kì 3, hàng thứ ba: natri, magie, nhôm, silic, photpho, lưu huỳnh, clo, agon.', 'A là **nhóm** của magie (cột); B là chu kì 1; D là nhóm 1.'],
        answer: 'C', answerVn: 'C',
      },
      {
        id: 'p4', type: 'dnd',
        prompt: 'Match each symbol to its element. Drag the **symbol** onto its **name**.',
        promptVn: 'Ghép mỗi kí hiệu với nguyên tố của nó. Kéo **kí hiệu** vào **tên**.',
        bank: [
          { val: 'K', text: 'K', textVn: 'K' },
          { val: 'Na', text: 'Na', textVn: 'Na' },
          { val: 'N', text: 'N', textVn: 'N' },
          { val: 'Ne', text: 'Ne', textVn: 'Ne' },
          { val: 'Cl', text: 'Cl', textVn: 'Cl' },
        ],
        targets: [
          { id: 'potassium', title: 'Potassium', titleVn: 'Kali (potassium)' },
          { id: 'sodium', title: 'Sodium', titleVn: 'Natri (sodium)' },
          { id: 'nitrogen', title: 'Nitrogen', titleVn: 'Nitơ (nitrogen)' },
          { id: 'neon', title: 'Neon', titleVn: 'Neon' },
          { id: 'chlorine', title: 'Chlorine', titleVn: 'Clo (chlorine)' },
        ],
        correctSets: { potassium: ['K'], sodium: ['Na'], nitrogen: ['N'], neon: ['Ne'], chlorine: ['Cl'] },
        solution: ['Nitrogen is **N** (the first letter); neon is **Ne** and chlorine is **Cl** (first letter + another).', 'Potassium is **K** (kalium) and sodium is **Na** (natrium): both from Latin names.'],
        solutionVn: ['Nitơ là **N** (chữ cái đầu); neon là **Ne** và clo là **Cl** (chữ cái đầu + một chữ khác).', 'Kali là **K** (kalium) và natri là **Na** (natrium): cả hai đến từ tên La-tinh.'],
        answer: 'potassium–K, sodium–Na, nitrogen–N, neon–Ne, chlorine–Cl', answerVn: 'kali–K, natri–Na, nitơ–N, neon–Ne, clo–Cl',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1',
        prompt: 'A gold cube is **10 mm** wide. You cut it in half **3 times**. How wide is it now, in mm? Type the number.',
        promptVn: 'Một khối vàng rộng **10 mm**. Em cắt đôi nó **3 lần**. Bây giờ nó rộng bao nhiêu mm? Nhập con số.',
        solution: ['Each cut halves the width: 10 mm → 5 mm → 2.5 mm → 1.25 mm.', 'That is 10 ÷ 8 = **1.25 mm** — about a grain of sand.'],
        solutionVn: ['Mỗi lần cắt làm chiều rộng giảm một nửa: 10 mm → 5 mm → 2.5 mm → 1.25 mm.', 'Tức là 10 ÷ 8 = **1.25 mm** — cỡ một hạt cát.'],
        answer: '1.25', answerVn: '1.25',
      },
      {
        id: 'c2', type: 'inline',
        prompt: 'Complete the sentences about graphite and diamond.',
        promptVn: 'Hoàn thành các câu về than chì và kim cương.',
        textParts: ['Graphite and diamond are both made of only ', ' atoms, so both are the same ', '. They look different because the atoms are ', '.'],
        textPartsVn: ['Than chì và kim cương đều chỉ gồm nguyên tử ', ', nên cả hai là cùng một ', '. Chúng trông khác nhau vì các nguyên tử ', '.'],
        blanks: {
          1: { options: [{ val: 'carbon', text: 'carbon', textVn: 'cacbon' }, { val: 'gold', text: 'gold', textVn: 'vàng' }, { val: 'mixed', text: 'mixed', textVn: 'trộn lẫn' }], correct: 'carbon' },
          2: { options: [{ val: 'element', text: 'element', textVn: 'nguyên tố' }, { val: 'metal', text: 'metal', textVn: 'kim loại' }, { val: 'group', text: 'group', textVn: 'nhóm' }], correct: 'element' },
          3: { options: [{ val: 'joined', text: 'joined in different ways', textVn: 'liên kết theo những cách khác nhau' }, { val: 'kinds', text: 'different kinds', textVn: 'thuộc các loại khác nhau' }, { val: 'cut', text: 'cut in half', textVn: 'bị cắt đôi' }], correct: 'joined' },
        },
        solution: ['Both are only carbon atoms, so both are the element carbon.', 'The same atoms joined in different ways give a soft black solid and the hardest natural substance. Carbon is a non-metal, so "metal" is wrong.'],
        solutionVn: ['Cả hai chỉ gồm nguyên tử cacbon, nên cả hai là nguyên tố cacbon.', 'Cùng một loại nguyên tử liên kết theo những cách khác nhau tạo ra một chất rắn đen, mềm và chất tự nhiên cứng nhất. Cacbon là phi kim, nên "kim loại" là sai.'],
        answer: 'carbon; element; joined in different ways', answerVn: 'cacbon; nguyên tố; liên kết theo những cách khác nhau',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'A student writes the symbol for chlorine as **CL**. What is wrong?',
        promptVn: 'Một học sinh viết kí hiệu của chlorine (clo) là **CL**. Sai ở đâu?',
        options: [
          { val: 'A', text: 'Nothing — capital letters do not matter', textVn: 'Không sai gì — chữ hoa không quan trọng' },
          { val: 'B', text: 'It should be C, the first letter only', textVn: 'Phải là C, chỉ chữ cái đầu' },
          { val: 'C', text: 'It should come from a Latin name', textVn: 'Nó phải đến từ một tên La-tinh' },
          { val: 'D', text: 'The second letter must be small: Cl. Two capitals would mean two symbols', textVn: 'Chữ cái thứ hai phải viết thường: Cl. Hai chữ hoa nghĩa là hai kí hiệu' },
        ],
        correct: 'D',
        solution: ['Every symbol has **one** capital, then a small letter: **Cl**. Two capitals would be read as two symbols (as CO is carbon and oxygen).', 'Capitals matter (A); C alone is carbon (B); chlorine’s symbol comes from its English name (C).'],
        solutionVn: ['Mỗi kí hiệu chỉ có **một** chữ hoa, rồi một chữ thường: **Cl**. Hai chữ hoa sẽ được đọc là hai kí hiệu (như CO là cacbon và oxi).', 'Chữ hoa rất quan trọng (A); chỉ C là cacbon (B); kí hiệu của clo đến từ tên tiếng Anh (C).'],
        answer: 'D', answerVn: 'D',
      },
    ],
  },
];
