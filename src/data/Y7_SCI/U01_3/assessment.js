// src/data/Y7_SCI/U01_3/assessment.js
// Six questions, one sitting, eight minutes. 1 the key idea, 2–4 the three
// animal cells, 5 the root hair cell, 6 the sentence frame applied to a cell
// the deck never named. Distractors are diagnoses.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_specialised',
      type: 'mcq',
      title: '1. What does it mean to say a cell is specialised?',
      options: [
        { val: 'A', text: 'A. It is bigger than other cells' },
        { val: 'B', text: 'B. Its structure is built to do one particular job really well' },
        { val: 'C', text: 'C. It can do every job in the body' },
        { val: 'D', text: 'D. It has more organelles than other cells' },
      ],
      correct: 'B',
      expEn: 'A specialised cell is like a specialist doctor: built for **one** job, brilliant at it, and no use for the others. Size and organelle count are not the point — the shape fitting the job is.',
      expVn: 'Tế bào chuyên hoá giống bác sĩ chuyên khoa: được tạo ra cho **một** nhiệm vụ, xuất sắc ở đó, và vô dụng với những việc khác. Kích thước hay số bào quan không phải điểm chính — hình dạng phù hợp nhiệm vụ mới là.',
    },
    {
      id: 'a2_red_blood',
      type: 'mcq',
      title: '2. Which feature helps a red blood cell carry oxygen?',
      options: [
        { val: 'A', text: 'A. A very long axon' },
        { val: 'B', text: 'B. Moving cilia along its top' },
        { val: 'C', text: 'C. Cytoplasm full of haemoglobin' },
        { val: 'D', text: 'D. A large sap vacuole' },
      ],
      correct: 'C',
      expEn: '**Haemoglobin** is the red pigment that actually holds the oxygen. The axon belongs to a neurone, cilia to a ciliated cell, and a sap vacuole to a plant cell.',
      expVn: '**Haemoglobin** là sắc tố đỏ thực sự giữ lấy oxy. Sợi trục thuộc tế bào thần kinh, lông rung thuộc tế bào có lông rung, còn không bào thuộc tế bào thực vật.',
    },
    {
      id: 'a3_neurone',
      type: 'mcq',
      title: '3. Why does a neurone have a very long axon?',
      options: [
        { val: 'A', text: 'A. So electrical signals can travel a long way, fast' },
        { val: 'B', text: 'B. So it can absorb more water' },
        { val: 'C', text: 'C. So it can hold more haemoglobin' },
        { val: 'D', text: 'D. So it can sweep mucus along' },
      ],
      correct: 'A',
      expEn: 'A neurone carries **electrical signals**; the long axon means one cell can carry a signal from your back to your toe, quickly. B is the root hair cell, C the red blood cell, D the ciliated cell.',
      expVn: 'Tế bào thần kinh truyền **tín hiệu điện**; sợi trục dài nghĩa là một tế bào có thể truyền tín hiệu từ lưng xuống ngón chân, nhanh chóng. B là tế bào lông hút, C là hồng cầu, D là tế bào có lông rung.',
    },
    {
      id: 'a4_ciliated',
      type: 'mcq',
      title: '4. Where in the body are ciliated cells found, and what do they do?',
      options: [
        { val: 'A', text: 'A. In the blood — they carry oxygen' },
        { val: 'B', text: 'B. In the roots — they absorb water' },
        { val: 'C', text: 'C. Lining the airways — they sweep mucus and dust away from the lungs' },
        { val: 'D', text: 'D. In the leaves — they make food' },
      ],
      correct: 'C',
      expEn: 'Ciliated cells **line the tubes from your mouth to your lungs**. Their moving cilia sweep the sticky mucus, with the dust and germs trapped in it, up towards your mouth.',
      expVn: 'Tế bào có lông rung **lót các ống từ miệng xuống phổi**. Lông rung chuyển động của chúng quét chất nhầy dính, cùng bụi và vi khuẩn mắc trong đó, lên phía miệng.',
    },
    {
      id: 'a5_root_hair',
      type: 'mcq',
      title: '5. A root hair cell has a long, thin hair. How does this help it?',
      options: [
        { val: 'A', text: 'A. It catches more sunlight' },
        { val: 'B', text: 'B. It holds the plant up' },
        { val: 'C', text: 'C. It carries signals to the leaves' },
        { val: 'D', text: 'D. It gives a big surface for absorbing water from the soil' },
      ],
      correct: 'D',
      expEn: 'The long, thin hair pushes out between the soil grains and gives a **big surface** for water to be absorbed through. Roots are in the dark, so catching sunlight is not its job.',
      expVn: 'Lông dài và mảnh đẩy ra giữa các hạt đất và tạo **bề mặt lớn** để hấp thụ nước. Rễ nằm trong bóng tối, nên bắt ánh sáng không phải nhiệm vụ của nó.',
    },
    {
      id: 'a6_frame',
      type: 'mcq',
      title: '6. A sperm cell has a long tail for swimming. Which sentence uses the frame correctly?',
      options: [
        { val: 'A', text: 'A. A sperm cell is adapted to swim because it has a long tail.' },
        { val: 'B', text: 'B. A sperm cell has a long tail because it is adapted.' },
        { val: 'C', text: 'C. A sperm cell is adapted to carry oxygen because it has a long tail.' },
        { val: 'D', text: 'D. A long tail is adapted to a sperm cell because it swims.' },
      ],
      correct: 'A',
      expEn: 'The frame is **[cell] is adapted to [job] because it has [feature]**: a sperm cell is adapted to swim because it has a long tail. C gives the wrong job; B and D put the parts in the wrong order.',
      expVn: 'Mẫu câu là **[tế bào] is adapted to [nhiệm vụ] because it has [đặc điểm]**: tế bào tinh trùng thích nghi để bơi vì nó có đuôi dài. C sai nhiệm vụ; B và D đặt các phần sai thứ tự.',
    },
  ],
};
