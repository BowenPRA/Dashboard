// src/data/Y7_SCI/U01_2/assessment.js
// Six questions, one sitting, eight minutes. 1–2 the parts of an animal cell,
// 3 the plant-only extras, 4 the shape argument, 5 the stain, 6 the microscope
// method. Distractors are diagnoses; no item copies a check or a passage.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_parts',
      type: 'mcq',
      title: '1. Which list gives the four parts of an animal cell?',
      options: [
        { val: 'A', text: 'A. Cell membrane, cytoplasm, mitochondria, nucleus' },
        { val: 'B', text: 'B. Cell wall, cytoplasm, chloroplasts, nucleus' },
        { val: 'C', text: 'C. Cell membrane, cellulose, mitochondria, vacuole' },
        { val: 'D', text: 'D. Cell wall, cell membrane, nucleus, chlorophyll' },
      ],
      correct: 'A',
      expEn: 'An animal cell has a **cell membrane, cytoplasm, mitochondria and a nucleus**. The other lists smuggle in plant-only parts (cell wall, chloroplasts, vacuole) or substances (cellulose, chlorophyll).',
      expVn: 'Tế bào động vật có **màng tế bào, tế bào chất, ti thể và nhân**. Các danh sách khác lẫn vào những phần chỉ có ở thực vật (thành tế bào, lục lạp, không bào) hoặc các chất (xenlulozơ, diệp lục).',
    },
    {
      id: 'a2_mitochondria',
      type: 'mcq',
      title: '2. Where in a cell is energy released from food?',
      options: [
        { val: 'A', text: 'A. In the nucleus' },
        { val: 'B', text: 'B. In the cell membrane' },
        { val: 'C', text: 'C. In the mitochondria' },
        { val: 'D', text: 'D. In the vacuole' },
      ],
      correct: 'C',
      expEn: 'The **mitochondria** release energy from food. The nucleus controls the cell, the membrane controls what goes in and out, and the vacuole (plant-only) stores sap.',
      expVn: '**Ti thể** giải phóng năng lượng từ thức ăn. Nhân điều khiển tế bào, màng kiểm soát những gì ra vào, còn không bào (chỉ ở thực vật) chứa dịch.',
    },
    {
      id: 'a3_three_things',
      type: 'mcq',
      title: '3. To turn a model of a plant cell into a model of an animal cell, which three pieces must you take away?',
      options: [
        { val: 'A', text: 'A. Nucleus, cytoplasm, cell membrane' },
        { val: 'B', text: 'B. Cell wall, chloroplasts, sap vacuole' },
        { val: 'C', text: 'C. Mitochondria, nucleus, cell wall' },
        { val: 'D', text: 'D. Chloroplasts, mitochondria, cytoplasm' },
      ],
      correct: 'B',
      expEn: 'Remove the plant-only extras — the **cell wall, the chloroplasts and the sap vacuole** — and everything left is an animal cell. The other lists remove parts every cell needs.',
      expVn: 'Bỏ những phần chỉ có ở thực vật — **thành tế bào, lục lạp và không bào** — và những gì còn lại là một tế bào động vật. Các danh sách khác bỏ đi những phần mọi tế bào đều cần.',
    },
    {
      id: 'a4_shape',
      type: 'mcq',
      title: '4. Which sentence is correct?',
      options: [
        { val: 'A', text: 'A. Animal cells have a fixed shape because they have a nucleus.' },
        { val: 'B', text: 'B. Plant cells have no fixed shape because they have a cell wall.' },
        { val: 'C', text: 'C. Animal cells have no fixed shape because they have no cell wall.' },
        { val: 'D', text: 'D. Plant cells can change shape because plants move.' },
      ],
      correct: 'C',
      expEn: 'No **cell wall** means no stiff box, so an animal cell has **no fixed shape** — which suits an animal, because it moves. A plant cell has a wall and keeps its box shape; plants stand still.',
      expVn: 'Không có **thành tế bào** nghĩa là không có hộp cứng, nên tế bào động vật **không có hình dạng cố định** — phù hợp với động vật vì chúng di chuyển. Tế bào thực vật có thành và giữ hình hộp; cây đứng yên.',
    },
    {
      id: 'a5_stain',
      type: 'mcq',
      title: '5. Why is methylene blue added to cheek cells on a slide?',
      options: [
        { val: 'A', text: 'A. To magnify the cells' },
        { val: 'B', text: 'B. To stain the cells so their parts are easier to see' },
        { val: 'C', text: 'C. To stick the cover slip down' },
        { val: 'D', text: 'D. To keep the cells alive' },
      ],
      correct: 'B',
      expEn: 'Cheek cells are almost see-through. Methylene blue is a **stain** — a coloured dye that makes the parts easier to see (the nucleus goes dark blue). Magnifying is the microscope\'s job.',
      expVn: 'Tế bào má gần như trong suốt. Xanh methylen là **thuốc nhuộm** — phẩm màu làm các bộ phận dễ nhìn thấy hơn (nhân chuyển xanh đậm). Phóng đại là việc của kính hiển vi.',
    },
    {
      id: 'a6_microscope',
      type: 'mcq',
      title: '6. Which objective lens should be over the stage when you first look for the cells?',
      options: [
        { val: 'A', text: 'A. The largest one, to see the most detail' },
        { val: 'B', text: 'B. Any one — it makes no difference' },
        { val: 'C', text: 'C. The one closest to the slide' },
        { val: 'D', text: 'D. The smallest one, then move up to a larger one' },
      ],
      correct: 'D',
      expEn: 'Start with the **smallest objective lens**, find the cells, and only then turn to a larger lens for more magnification. Starting large makes the cells almost impossible to find — and easy to crush.',
      expVn: 'Bắt đầu với **vật kính nhỏ nhất**, tìm tế bào, rồi mới xoay sang vật kính lớn hơn để phóng đại nhiều hơn. Bắt đầu bằng vật kính lớn khiến tế bào gần như không thể tìm thấy — và dễ làm vỡ lam kính.',
    },
  ],
};
