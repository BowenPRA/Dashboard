// src/data/Y7_SCI/U02_6/workbook.js
// Practice for 2.6 Compounds and Formulae — eleven questions across six answer
// widgets: multiple choice, dropdown-in-sentence, drag-into-targets (sorting
// and matching), typed-in-the-blanks, drag-into-order and typed answers. No
// two consecutive questions share a type (ENGAGEMENT-PLAN §2.4). Formulae in
// the prompts use Unicode subscripts; no typed answer is a formula (the typed
// marker ignores capitals, and Co is not CO) — writing formulae is the
// Particle Lab's job, where capitals and the small number are marked.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which of these is an **element**?',
        promptVn: 'Chất nào dưới đây là một **nguyên tố**?',
        options: [
          { val: 'A', text: 'H₂O, water', textVn: 'H₂O, nước' },
          { val: 'B', text: 'CO₂, carbon dioxide', textVn: 'CO₂, cacbon đioxit' },
          { val: 'C', text: 'N₂, nitrogen', textVn: 'N₂, nitơ' },
          { val: 'D', text: 'NaCl, sodium chloride', textVn: 'NaCl, natri clorua' },
        ],
        correct: 'C',
        solution: ['N₂ has two atoms, but both are nitrogen: one kind of atom, so it is an element.', 'H₂O, CO₂ and NaCl each have two kinds of atom bonded together — compounds.'],
        solutionVn: ['N₂ có hai nguyên tử, nhưng cả hai đều là nitơ: một loại nguyên tử, nên nó là nguyên tố.', 'H₂O, CO₂ và NaCl mỗi chất có hai loại nguyên tử liên kết với nhau — hợp chất.'],
        answer: 'C', answerVn: 'C',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Complete the definition of a compound.',
        promptVn: 'Hoàn thành định nghĩa hợp chất.',
        textParts: ['A compound is made of ', ' of atom, ', '.'],
        textPartsVn: ['Hợp chất được tạo nên từ ', ' nguyên tử, ', '.'],
        blanks: {
          1: { options: [{ val: 'one', text: 'one kind', textVn: 'một loại' }, { val: 'different', text: 'different kinds', textVn: 'các loại khác nhau' }], correct: 'different' },
          2: { options: [{ val: 'bonded', text: 'bonded together', textVn: 'liên kết với nhau' }, { val: 'loose', text: 'not joined at all', textVn: 'hoàn toàn không gắn với nhau' }, { val: 'melted', text: 'melted together', textVn: 'nóng chảy vào nhau' }], correct: 'bonded' },
        },
        solution: ['A compound has **different kinds** of atom — salt has sodium and chlorine.', 'The atoms are **bonded** together: joined tightly. One kind of atom on its own is an element.'],
        solutionVn: ['Hợp chất có **các loại** nguyên tử **khác nhau** — muối ăn có natri và clo.', 'Các nguyên tử **liên kết** với nhau: gắn chặt với nhau. Chỉ một loại nguyên tử là nguyên tố.'],
        answer: 'different kinds; bonded together', answerVn: 'các loại khác nhau; liên kết với nhau',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Sort the formulae: element or compound?',
        promptVn: 'Sắp xếp các công thức: nguyên tố hay hợp chất?',
        bank: [
          { val: 'o2', text: 'O₂', textVn: 'O₂' },
          { val: 'h2o', text: 'H₂O', textVn: 'H₂O' },
          { val: 'he', text: 'He', textVn: 'He' },
          { val: 'nacl', text: 'NaCl', textVn: 'NaCl' },
          { val: 'n2', text: 'N₂', textVn: 'N₂' },
          { val: 'ch4', text: 'CH₄', textVn: 'CH₄' },
          { val: 'cu', text: 'Cu', textVn: 'Cu' },
          { val: 'co', text: 'CO', textVn: 'CO' },
        ],
        targets: [
          { id: 'element', title: 'Element — one kind of atom', titleVn: 'Nguyên tố — một loại nguyên tử' },
          { id: 'compound', title: 'Compound — different kinds bonded', titleVn: 'Hợp chất — nhiều loại liên kết' },
        ],
        correctSets: { element: ['o2', 'he', 'n2', 'cu'], compound: ['h2o', 'nacl', 'ch4', 'co'] },
        solution: ['Count the **capital letters** — each one starts a new element. O₂, He, N₂ and Cu have one element each; the small number or small letter does not add a new one.', 'H₂O, NaCl, CH₄ and CO each have two capitals: two kinds of atom, a compound. CO (capital O) is carbon and oxygen; Co would be cobalt.'],
        solutionVn: ['Đếm **chữ in hoa** — mỗi chữ in hoa bắt đầu một nguyên tố mới. O₂, He, N₂ và Cu mỗi chất có một nguyên tố; số nhỏ hay chữ thường không thêm nguyên tố mới.', 'H₂O, NaCl, CH₄ và CO mỗi chất có hai chữ in hoa: hai loại nguyên tử, là hợp chất. CO (chữ O hoa) là cacbon và oxi; Co sẽ là coban.'],
        answer: 'Elements: O₂, He, N₂, Cu · Compounds: H₂O, NaCl, CH₄, CO', answerVn: 'Nguyên tố: O₂, He, N₂, Cu · Hợp chất: H₂O, NaCl, CH₄, CO',
      },
      {
        id: 'f4', type: 'fill_blank',
        prompt: 'Mono and di: type the numbers.',
        promptVn: 'Mono và di: nhập các con số.',
        textParts: ['Carbon monoxide, CO, has ', ' oxygen atom. Carbon dioxide, CO₂, has ', ' oxygen atoms.'],
        textPartsVn: ['Carbon monoxide, CO, có ', ' nguyên tử oxi. Carbon dioxide, CO₂, có ', ' nguyên tử oxi.'],
        blanks: { 1: { correct: '1', accept: ['one'], width: 4 }, 2: { correct: '2', accept: ['two'], width: 4 } },
        solution: ['**Mono** means one: CO has one oxygen atom (no number after O).', '**Di** means two: CO₂ has two oxygen atoms (the small 2 after O).'],
        solutionVn: ['**Mono** nghĩa là một: CO có một nguyên tử oxi (không có số sau O).', '**Di** nghĩa là hai: CO₂ có hai nguyên tử oxi (số 2 nhỏ sau O).'],
        answer: '1 and 2', answerVn: '1 và 2',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', type: 'dnd',
        prompt: 'Match each compound to the elements in it. Drag the **elements** onto the **name**.',
        promptVn: 'Ghép mỗi hợp chất với các nguyên tố trong nó. Kéo **các nguyên tố** vào **tên**.',
        bank: [
          { val: 'mg_o', text: 'magnesium + oxygen', textVn: 'magnesium + oxygen' },
          { val: 'h_s', text: 'hydrogen + sulfur', textVn: 'hydrogen + sulfur' },
          { val: 'ca_cl', text: 'calcium + chlorine', textVn: 'calcium + chlorine' },
          { val: 'k_n_o', text: 'potassium + nitrogen + oxygen', textVn: 'potassium + nitrogen + oxygen' },
        ],
        targets: [
          { id: 'mgo', title: 'magnesium oxide', titleVn: 'magnesium oxide' },
          { id: 'h2s', title: 'hydrogen sulfide', titleVn: 'hydrogen sulfide' },
          { id: 'cacl2', title: 'calcium chloride', titleVn: 'calcium chloride' },
          { id: 'kno3', title: 'potassium nitrate', titleVn: 'potassium nitrate' },
        ],
        correctSets: { mgo: ['mg_o'], h2s: ['h_s'], cacl2: ['ca_cl'], kno3: ['k_n_o'] },
        solution: ['-ide names have two elements: oxide = oxygen, sulfide = sulfur, chloride = chlorine.', '-ate names add oxygen: potassium **nitr**ate is potassium, nitrogen and oxygen.'],
        solutionVn: ['Tên có đuôi -ide có hai nguyên tố: oxide = oxi, sulfide = lưu huỳnh, chloride = clo.', 'Tên có đuôi -ate thêm oxi: potassium **nitr**ate là kali, nitơ và oxi.'],
        answer: 'magnesium oxide–magnesium + oxygen, hydrogen sulfide–hydrogen + sulfur, calcium chloride–calcium + chlorine, potassium nitrate–potassium + nitrogen + oxygen',
        answerVn: 'magnesium oxide–magie + oxi, hydrogen sulfide–hiđro + lưu huỳnh, calcium chloride–canxi + clo, potassium nitrate–kali + nitơ + oxi',
      },
      {
        id: 'p2',
        prompt: 'Lithium and oxygen bond to make a compound. Type its name in English.',
        promptVn: 'Lithium và oxygen liên kết tạo thành một hợp chất. Nhập tên của nó bằng tiếng Anh.',
        solution: ['The metal comes first and keeps its name: **lithium**.', 'The non-metal ends in -ide: oxygen → **oxide**. The name is **lithium oxide**.'],
        solutionVn: ['Kim loại đứng trước và giữ nguyên tên: **lithium**.', 'Phi kim có đuôi -ide: oxygen → **oxide**. Tên là **lithium oxide** (liti oxit).'],
        answer: 'lithium oxide', answerVn: 'lithium oxide',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'What does the formula **CaCl₂** tell you about one particle?',
        promptVn: 'Công thức **CaCl₂** cho em biết gì về một hạt?',
        options: [
          { val: 'A', text: '1 calcium atom and 2 chlorine atoms', textVn: '1 nguyên tử canxi và 2 nguyên tử clo' },
          { val: 'B', text: '2 calcium atoms and 1 chlorine atom', textVn: '2 nguyên tử canxi và 1 nguyên tử clo' },
          { val: 'C', text: 'Carbon atoms and chlorine atoms', textVn: 'Nguyên tử cacbon và nguyên tử clo' },
          { val: 'D', text: '3 different elements', textVn: '3 nguyên tố khác nhau' },
        ],
        correct: 'A',
        solution: ['Ca is calcium (no number: one atom). Cl₂ is chlorine, and the small 2 after Cl means two chlorine atoms.', 'B puts the 2 on the wrong symbol — it counts the symbol BEFORE it. C reads Ca as carbon. Two capital letters means 2 elements, not 3 (D).'],
        solutionVn: ['Ca là canxi (không có số: một nguyên tử). Cl₂ là clo, và số 2 nhỏ sau Cl nghĩa là hai nguyên tử clo.', 'B đặt số 2 sai kí hiệu — số nhỏ đếm kí hiệu đứng TRƯỚC nó. C đọc Ca thành cacbon. Hai chữ in hoa là 2 nguyên tố, không phải 3 (D).'],
        answer: 'A', answerVn: 'A',
      },
      {
        id: 'p4', type: 'order',
        prompt: 'Put the particles in order, from the **fewest** atoms to the **most** atoms.',
        promptVn: 'Sắp xếp các hạt theo thứ tự, từ **ít** nguyên tử nhất đến **nhiều** nguyên tử nhất.',
        bank: [
          { val: 'o2', text: 'O₂', textVn: 'O₂' },
          { val: 'h2o', text: 'H₂O', textVn: 'H₂O' },
          { val: 'nh3', text: 'NH₃', textVn: 'NH₃' },
          { val: 'ch4', text: 'CH₄', textVn: 'CH₄' },
          { val: 'cuso4', text: 'CuSO₄', textVn: 'CuSO₄' },
        ],
        targets: [{ id: 'seq', title: 'Fewest atoms → most atoms', titleVn: 'Ít nguyên tử nhất → nhiều nguyên tử nhất' }],
        correctSets: { seq: ['o2', 'h2o', 'nh3', 'ch4', 'cuso4'] },
        solution: ['Add the numbers, counting 1 for a symbol with no number: O₂ = 2, H₂O = 2 + 1 = 3, NH₃ = 1 + 3 = 4.', 'CH₄ = 1 + 4 = 5, CuSO₄ = 1 + 1 + 4 = 6.'],
        solutionVn: ['Cộng các số, tính 1 cho kí hiệu không có số: O₂ = 2, H₂O = 2 + 1 = 3, NH₃ = 1 + 3 = 4.', 'CH₄ = 1 + 4 = 5, CuSO₄ = 1 + 1 + 4 = 6.'],
        answer: 'O₂ (2), H₂O (3), NH₃ (4), CH₄ (5), CuSO₄ (6)', answerVn: 'O₂ (2), H₂O (3), NH₃ (4), CH₄ (5), CuSO₄ (6)',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1',
        prompt: 'Glucose, the sugar plants make, is **C₆H₁₂O₆**. How many atoms are in one particle of glucose? Type the number.',
        promptVn: 'Glucose, loại đường cây tạo ra, là **C₆H₁₂O₆**. Một hạt glucose có bao nhiêu nguyên tử? Nhập con số.',
        solution: ['Read each symbol with the number after it: C₆ = 6 carbon, H₁₂ = 12 hydrogen, O₆ = 6 oxygen.', 'Add them: $6 + 12 + 6 = 24$ atoms, from 3 elements.'],
        solutionVn: ['Đọc mỗi kí hiệu với số đứng sau nó: C₆ = 6 cacbon, H₁₂ = 12 hiđro, O₆ = 6 oxi.', 'Cộng lại: $6 + 12 + 6 = 24$ nguyên tử, từ 3 nguyên tố.'],
        answer: '24', answerVn: '24',
      },
      {
        id: 'c2', type: 'inline',
        prompt: 'A student named the compound MgS “sulfur magnesium”. Fix it.',
        promptVn: 'Một học sinh gọi hợp chất MgS là “sulfur magnesium”. Hãy sửa lại.',
        textParts: ['The correct name is ', ', because the ', ' comes first.'],
        textPartsVn: ['Tên đúng là ', ', vì ', ' đứng trước.'],
        blanks: {
          1: { options: [{ val: 'sulfide', text: 'magnesium sulfide', textVn: 'magnesium sulfide' }, { val: 'sulfate', text: 'magnesium sulfate', textVn: 'magnesium sulfate' }, { val: 'swap', text: 'sulfide magnesium', textVn: 'sulfide magnesium' }], correct: 'sulfide' },
          2: { options: [{ val: 'metal', text: 'metal', textVn: 'kim loại' }, { val: 'nonmetal', text: 'non-metal', textVn: 'phi kim' }, { val: 'bigger', text: 'bigger atom', textVn: 'nguyên tử to hơn' }], correct: 'metal' },
        },
        solution: ['Mg is magnesium, a **metal**, so it comes first. S is sulfur, a non-metal, so it ends in -ide: **magnesium sulfide**.', 'Magnesium sulfate would need oxygen too (-ate) — MgS has no O in it.'],
        solutionVn: ['Mg là magie, một **kim loại**, nên đứng trước. S là lưu huỳnh, một phi kim, nên có đuôi -ide: **magnesium sulfide**.', 'Magnesium sulfate cần có cả oxi (-ate) — MgS không có O.'],
        answer: 'magnesium sulfide; metal', answerVn: 'magnesium sulfide; kim loại',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'High in the sky there is a gas called ozone, **O₃**. Is ozone an element or a compound?',
        promptVn: 'Trên cao trong bầu trời có một chất khí tên là ozone, **O₃**. Ozone là nguyên tố hay hợp chất?',
        options: [
          { val: 'A', text: 'A compound, because it has three atoms', textVn: 'Hợp chất, vì nó có ba nguyên tử' },
          { val: 'B', text: 'An element, because all three atoms are oxygen', textVn: 'Nguyên tố, vì cả ba nguyên tử đều là oxi' },
          { val: 'C', text: 'A compound, because its formula has a number', textVn: 'Hợp chất, vì công thức của nó có số' },
          { val: 'D', text: 'Neither, because it is a gas', textVn: 'Không phải cả hai, vì nó là chất khí' },
        ],
        correct: 'B',
        solution: ['O₃ has one capital letter: only oxygen atoms, one kind of atom. So ozone is an **element**, like O₂.', 'The number of atoms (A) and the small number (C) do not matter — only how many KINDS. Gases can be elements or compounds (D).'],
        solutionVn: ['O₃ chỉ có một chữ in hoa: chỉ có nguyên tử oxi, một loại nguyên tử. Vì vậy ozone là **nguyên tố**, giống O₂.', 'Số nguyên tử (A) và số nhỏ (C) không quan trọng — chỉ số LOẠI nguyên tử mới quan trọng. Chất khí có thể là nguyên tố hoặc hợp chất (D).'],
        answer: 'B', answerVn: 'B',
      },
    ],
  },
];
