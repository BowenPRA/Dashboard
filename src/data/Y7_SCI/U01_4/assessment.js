// src/data/Y7_SCI/U01_4/assessment.js
// Six questions, one sitting, eight minutes. 1–4 the four words, 5 the ladder
// in order, 6 the exit question (the jellyfish). Distractors are diagnoses.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_tissue',
      type: 'mcq',
      title: '1. Which of these is a tissue?',
      options: [
        { val: 'A', text: 'A. A single ciliated cell' },
        { val: 'B', text: 'B. The lining of the windpipe, made of millions of ciliated cells' },
        { val: 'C', text: 'C. A lung' },
        { val: 'D', text: 'D. A mosquito' },
      ],
      correct: 'B',
      expEn: 'A tissue is a group of **similar cells** working together on one job — the ciliated epithelium lining the windpipe. One cell is a cell, a lung is an organ, a mosquito is an organism.',
      expVn: 'Mô là một nhóm **tế bào giống nhau** cùng làm một nhiệm vụ — biểu mô có lông rung lót khí quản. Một tế bào là tế bào, phổi là cơ quan, con muỗi là sinh vật.',
    },
    {
      id: 'a2_organ',
      type: 'mcq',
      title: '2. What is an organ?',
      options: [
        { val: 'A', text: 'A. A group of similar cells' },
        { val: 'B', text: 'B. Any living thing' },
        { val: 'C', text: 'C. A structure made of several different tissues working together' },
        { val: 'D', text: 'D. A set of organs with the same function' },
      ],
      correct: 'C',
      expEn: 'An organ — the heart, a lung, a leaf — is built from **several different tissues**. A is a tissue, B an organism, D an organ system.',
      expVn: 'Cơ quan — tim, phổi, lá — được tạo nên từ **nhiều loại mô khác nhau**. A là mô, B là sinh vật, D là hệ cơ quan.',
    },
    {
      id: 'a3_organ_system',
      type: 'mcq',
      title: '3. The mouth, gullet, stomach and intestines all work together to break food down. Together they are an example of…',
      options: [
        { val: 'A', text: 'A. a tissue' },
        { val: 'B', text: 'B. an organ' },
        { val: 'C', text: 'C. an organism' },
        { val: 'D', text: 'D. an organ system' },
      ],
      correct: 'D',
      expEn: 'A set of organs sharing one function is an **organ system** — here, the digestive system. Each of those parts on its own is an organ.',
      expVn: 'Một nhóm cơ quan chung một chức năng là **hệ cơ quan** — ở đây là hệ tiêu hoá. Mỗi phần riêng lẻ là một cơ quan.',
    },
    {
      id: 'a4_organism',
      type: 'mcq',
      title: '4. Which of these is an organism?',
      options: [
        { val: 'A', text: 'A. A tree' },
        { val: 'B', text: 'B. A leaf' },
        { val: 'C', text: 'C. Onion epidermis' },
        { val: 'D', text: 'D. The breathing system' },
      ],
      correct: 'A',
      expEn: 'An organism is any **whole living thing** — a tree, a mosquito, you. A leaf is an organ, onion epidermis is a tissue, and the breathing system is an organ system.',
      expVn: 'Sinh vật là bất kỳ **cơ thể sống hoàn chỉnh** nào — một cái cây, một con muỗi, em. Lá là cơ quan, biểu bì hành là mô, và hệ hô hấp là hệ cơ quan.',
    },
    {
      id: 'a5_order',
      type: 'mcq',
      title: '5. Which list gives the five levels in the correct order, smallest first?',
      options: [
        { val: 'A', text: 'A. Cell → organ → tissue → organ system → organism' },
        { val: 'B', text: 'B. Cell → tissue → organ → organ system → organism' },
        { val: 'C', text: 'C. Tissue → cell → organ → organism → organ system' },
        { val: 'D', text: 'D. Organism → organ system → organ → tissue → cell' },
      ],
      correct: 'B',
      expEn: 'Each level is built out of the one before: **cell → tissue → organ → organ system → organism**. D is the right ladder upside down; A and C swap rungs.',
      expVn: 'Mỗi cấp độ được tạo nên từ cấp độ trước: **tế bào → mô → cơ quan → hệ cơ quan → sinh vật**. D là bậc thang đúng nhưng lộn ngược; A và C đảo các bậc.',
    },
    {
      id: 'a6_jellyfish',
      type: 'mcq',
      title: '6. A jellyfish has no heart, no lungs and no brain, but it is still an organism. Which level can a living thing manage without?',
      options: [
        { val: 'A', text: 'A. Cells' },
        { val: 'B', text: 'B. Tissues' },
        { val: 'C', text: 'C. Organs' },
        { val: 'D', text: 'D. None — every organism has all five levels' },
      ],
      correct: 'C',
      expEn: 'A jellyfish is made of cells arranged in tissues, but it has no true **organs** — no heart, lungs or brain — and so no organ systems either. Every organism has cells; a living thing can be an organism without organs.',
      expVn: 'Sứa được tạo nên từ các tế bào xếp thành mô, nhưng không có **cơ quan** thật sự — không tim, phổi hay não — nên cũng không có hệ cơ quan. Mọi sinh vật đều có tế bào; một cơ thể sống có thể là sinh vật mà không có cơ quan.',
    },
  ],
};
