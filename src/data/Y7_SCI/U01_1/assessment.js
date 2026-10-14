// src/data/Y7_SCI/U01_1/assessment.js
// Six questions, one sitting, eight minutes. 1–2 the key words (cell,
// organelle), 3–4 the four standard parts, 5 the plant-only extras, 6 the
// microscope. Distractors are diagnoses; no item copies a check or a
// reading passage.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_cell',
      type: 'mcq',
      title: '1. What is a cell?',
      options: [
        { val: 'A', text: 'A. The smallest basic unit of all living organisms' },
        { val: 'B', text: 'B. A small room where scientists work' },
        { val: 'C', text: 'C. The green part of a leaf' },
        { val: 'D', text: 'D. A type of microscope' },
      ],
      correct: 'A',
      expEn: 'A cell is the smallest basic unit of **all living organisms**. The word came from the Latin for a small room, but that is where the name came from, not what a cell is.',
      expVn: 'Tế bào là đơn vị cơ bản nhỏ nhất của **mọi sinh vật sống**. Từ này bắt nguồn từ tiếng Latin nghĩa là căn phòng nhỏ, nhưng đó là nguồn gốc cái tên, không phải định nghĩa.',
      expFr: 'Une cellule est la plus petite unité de base de **tous les êtres vivants**. Le mot vient du latin pour « petite pièce », mais c’est l’origine du nom, pas ce qu’est une cellule.',
    },
    {
      id: 'a2_organelle',
      type: 'mcq',
      title: '2. Which sentence best describes an organelle?',
      options: [
        { val: 'A', text: 'A. A living thing made of many cells' },
        { val: 'B', text: 'B. A tiny structure inside a cell that does one specific job' },
        { val: 'C', text: 'C. The jelly that fills a cell' },
        { val: 'D', text: 'D. A lens inside a microscope' },
      ],
      correct: 'B',
      expEn: 'An organelle is a tiny structure **inside** a cell with one specific, important job — the nucleus, the mitochondria and so on. The jelly is the cytoplasm; a living thing made of many cells is an organism.',
      expVn: 'Bào quan là một cấu trúc nhỏ **bên trong** tế bào với một nhiệm vụ cụ thể, quan trọng — nhân, ti thể, v.v. Chất thạch là tế bào chất; sinh vật gồm nhiều tế bào là một cơ thể.',
      expFr: 'Un organite est une minuscule structure **à l’intérieur** d’une cellule, avec un rôle précis et important — le noyau, les mitochondries, etc. La gelée, c’est le cytoplasme ; un être vivant fait de nombreuses cellules est un organisme.',
    },
    {
      id: 'a3_nucleus',
      type: 'mcq',
      title: '3. Which part of the cell is the control centre?',
      options: [
        { val: 'A', text: 'A. The cytoplasm' },
        { val: 'B', text: 'B. The cell membrane' },
        { val: 'C', text: 'C. The mitochondria' },
        { val: 'D', text: 'D. The nucleus' },
      ],
      correct: 'D',
      expEn: 'The **nucleus** manages everything the cell does. The cytoplasm is where reactions happen, the membrane controls what goes in and out, and the mitochondria release energy from food.',
      expVn: '**Nhân** quản lý mọi hoạt động của tế bào. Tế bào chất là nơi diễn ra phản ứng, màng kiểm soát những gì ra vào, còn ti thể giải phóng năng lượng từ thức ăn.',
      expFr: 'Le **noyau** dirige tout ce que fait la cellule. Le cytoplasme est là où se font les réactions, la membrane contrôle ce qui entre et sort, et les mitochondries libèrent l’énergie de la nourriture.',
    },
    {
      id: 'a4_mitochondria',
      type: 'mcq',
      title: '4. What happens in the mitochondria?',
      options: [
        { val: 'A', text: 'A. Energy is released from food' },
        { val: 'B', text: 'B. Food is made using sunlight' },
        { val: 'C', text: 'C. The cell is held in shape' },
        { val: 'D', text: 'D. Water is stored' },
      ],
      correct: 'A',
      expEn: 'Mitochondria are where **energy is released from food**. Making food with sunlight happens in the chloroplasts; the cell wall holds a plant cell in shape; the vacuole stores sap.',
      expVn: 'Ti thể là nơi **năng lượng được giải phóng từ thức ăn**. Tạo thức ăn bằng ánh sáng diễn ra ở lục lạp; thành tế bào giữ hình dạng; không bào chứa dịch.',
      expFr: 'Les mitochondries sont l’endroit où **l’énergie est libérée à partir de la nourriture**. Fabriquer de la nourriture avec la lumière du soleil se fait dans les chloroplastes ; la paroi cellulaire garde la forme d’une cellule végétale ; la vacuole stocke le suc cellulaire.',
    },
    {
      id: 'a5_plant_only',
      type: 'mcq',
      title: '5. Which list contains ONLY parts that a plant cell has and an animal cell does not?',
      options: [
        { val: 'A', text: 'A. Nucleus, cytoplasm, cell membrane' },
        { val: 'B', text: 'B. Cell wall, chloroplasts, sap vacuole' },
        { val: 'C', text: 'C. Cell wall, nucleus, mitochondria' },
        { val: 'D', text: 'D. Chloroplasts, cell membrane, cytoplasm' },
      ],
      correct: 'B',
      expEn: 'The plant-only extras are the **cell wall, the chloroplasts and the sap vacuole**. Every other list mixes in parts that both kinds of cell share (nucleus, membrane, cytoplasm, mitochondria).',
      expVn: 'Những phần chỉ có ở thực vật là **thành tế bào, lục lạp và không bào**. Các danh sách khác đều lẫn những bộ phận mà cả hai loại tế bào đều có (nhân, màng, tế bào chất, ti thể).',
      expFr: 'Les extras propres aux plantes sont **la paroi cellulaire, les chloroplastes et la vacuole**. Toutes les autres listes mélangent des parties que les deux types de cellules partagent (noyau, membrane, cytoplasme, mitochondries).',
    },
    {
      id: 'a6_microscope',
      type: 'mcq',
      title: '6. How does a light microscope make a specimen look bigger?',
      options: [
        { val: 'A', text: 'A. It fires electrons at the specimen' },
        { val: 'B', text: 'B. It makes the specimen grow' },
        { val: 'C', text: 'C. It shines light through it and bends the light with lenses' },
        { val: 'D', text: 'D. It takes a photograph and prints it larger' },
      ],
      correct: 'C',
      expEn: 'Light shines up through the specimen and the curved glass **lenses bend the light**, so the image reaching your eye is magnified. Firing electrons is what an electron microscope does.',
      expVn: 'Ánh sáng chiếu xuyên qua mẫu vật và các **thấu kính thuỷ tinh cong bẻ ánh sáng**, nên hình ảnh đến mắt em được phóng đại. Bắn electron là cách kính hiển vi điện tử hoạt động.',
      expFr: 'La lumière traverse l’échantillon de bas en haut et les **lentilles** en verre courbé **dévient la lumière**, donc l’image qui arrive à ton œil est agrandie. Envoyer des électrons, c’est ce que fait un microscope électronique.',
    },
  ],
};
