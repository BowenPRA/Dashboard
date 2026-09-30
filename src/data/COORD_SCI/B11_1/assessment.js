// src/data/COORD_SCI/B11_1/assessment.js
// The Quiz for B11.01–B11.02, reproduction in plants: 10 MCQ, one sitting,
// 12 minutes. Shares Gate 2 with the arcade at 70 XP. English-only.
//
// No item repeats a notes check, a workbook question or a homework question.
// Every distractor is the answer reached by one nameable mistake (pollination
// for fertilisation, anther for stigma, haploid for diploid, the wind flower's
// features for the insect flower's), and the correct letter is spread across
// A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_asexual',
      type: 'mcq',
      title: '1. A strawberry plant sends out a runner, which roots and grows into a new plant. Which statement about the new plant is correct?',
      options: [
        { val: 'A', text: 'A. It was made by the fusion of two gametes' },
        { val: 'B', text: 'B. It is genetically identical to the parent plant' },
        { val: 'C', text: 'C. It has half as many chromosomes as the parent plant' },
        { val: 'D', text: 'D. It is genetically different from the parent plant' },
      ],
      correct: 'B',
      expEn: 'A runner is asexual reproduction: one parent, no gametes, no fertilisation. The new plant is a clone — genetically identical to its parent, with the same number of chromosomes.',
    },
    {
      id: 'a2_fertilisation',
      type: 'mcq',
      title: '2. What is fertilisation?',
      options: [
        { val: 'A', text: 'A. The transfer of pollen from an anther to a stigma' },
        { val: 'B', text: 'B. The growth of a seed into a new plant' },
        { val: 'C', text: 'C. The division of a body cell into two identical cells' },
        { val: 'D', text: 'D. The fusion of the nuclei of two gametes' },
      ],
      correct: 'D',
      expEn: 'Fertilisation is the fusion of the nuclei of two gametes, forming a zygote. Option A is pollination, option B is germination, and option C is how cells are copied in growth and in asexual reproduction.',
    },
    {
      id: 'a3_haploid',
      type: 'mcq',
      title: '3. Which of these has a haploid nucleus?',
      options: [
        { val: 'A', text: 'A. The nucleus in a pollen grain' },
        { val: 'B', text: 'B. A zygote' },
        { val: 'C', text: 'C. A cell in a petal' },
        { val: 'D', text: 'D. A cell in a root' },
      ],
      correct: 'A',
      expEn: 'Haploid means one set of chromosomes, and only gametes are haploid. A pollen nucleus is a male gamete. A zygote and every ordinary body cell (petal, root) are diploid.',
    },
    {
      id: 'a4_petals',
      type: 'mcq',
      title: '4. What is the function of the petals of an insect-pollinated flower?',
      options: [
        { val: 'A', text: 'A. To protect the flower while it is a bud' },
        { val: 'B', text: 'B. To make pollen grains' },
        { val: 'C', text: 'C. To attract insects to the flower' },
        { val: 'D', text: 'D. To catch pollen grains' },
      ],
      correct: 'C',
      expEn: 'Petals are large and brightly coloured to attract insects. Protecting the bud is the job of the sepals, making pollen is the anther, and catching pollen is the stigma.',
    },
    {
      id: 'a5_stamen',
      type: 'mcq',
      title: '5. Which two parts make up a stamen?',
      options: [
        { val: 'A', text: 'A. The stigma and the style' },
        { val: 'B', text: 'B. The ovary and the ovule' },
        { val: 'C', text: 'C. The sepal and the petal' },
        { val: 'D', text: 'D. The anther and the filament' },
      ],
      correct: 'D',
      expEn: 'A stamen, the male part, is an anther held up on a filament. The stigma, style and ovary together make a carpel, the female part.',
    },
    {
      id: 'a6_pollination',
      type: 'mcq',
      title: '6. A pollen grain is carried by the wind from one grass flower and lands on the stigma of another. What has happened?',
      options: [
        { val: 'A', text: 'A. Pollination' },
        { val: 'B', text: 'B. Fertilisation' },
        { val: 'C', text: 'C. Germination' },
        { val: 'D', text: 'D. Asexual reproduction' },
      ],
      correct: 'A',
      expEn: 'Pollination is the transfer of pollen from an anther to a stigma — and that is all that has happened so far. Fertilisation needs the pollen tube to grow and the nuclei to fuse.',
    },
    {
      id: 'a7_wind',
      type: 'mcq',
      title: '7. Which feature would you expect to find in a wind-pollinated flower?',
      options: [
        { val: 'A', text: 'A. Nectaries at the base of the petals' },
        { val: 'B', text: 'B. A strong scent' },
        { val: 'C', text: 'C. Large, feathery stigmas' },
        { val: 'D', text: 'D. Sticky, spiky pollen' },
      ],
      correct: 'C',
      expEn: 'Feathery stigmas give a large surface area to catch pollen from the air. Nectar, scent and sticky pollen are all features of insect-pollinated flowers.',
    },
    {
      id: 'a8_tube',
      type: 'mcq',
      title: '8. After a pollen grain lands on a stigma, how does the male nucleus reach the ovule?',
      options: [
        { val: 'A', text: 'A. It is carried there by an insect' },
        { val: 'B', text: 'B. It travels down a pollen tube that grows through the style' },
        { val: 'C', text: 'C. It is blown down the style by the wind' },
        { val: 'D', text: 'D. It swims down the style using a tail' },
      ],
      correct: 'B',
      expEn: 'The pollen grain grows a pollen tube down through the style into the ovary, and the male nucleus travels down the tube to the ovule. Insects and wind only carry pollen as far as the stigma.',
    },
    {
      id: 'a9_seed',
      type: 'mcq',
      title: '9. What does an ovule become after fertilisation?',
      options: [
        { val: 'A', text: 'A. A fruit' },
        { val: 'B', text: 'B. A pollen grain' },
        { val: 'C', text: 'C. A flower' },
        { val: 'D', text: 'D. A seed' },
      ],
      correct: 'D',
      expEn: 'A fertilised ovule develops into a seed. It is the OVARY, around the ovules, that becomes the fruit.',
    },
    {
      id: 'a10_germination',
      type: 'mcq',
      title: '10. Damp seeds are sealed in a flask with a chemical that absorbs all the oxygen. The flask is kept at 20 °C. What happens?',
      options: [
        { val: 'A', text: 'A. The seeds germinate, because they have water and warmth' },
        { val: 'B', text: 'B. The seeds germinate more quickly than usual' },
        { val: 'C', text: 'C. The seeds do not germinate, because they cannot respire without oxygen' },
        { val: 'D', text: 'D. The seeds do not germinate, because they have no light' },
      ],
      correct: 'C',
      expEn: 'Germination needs water, oxygen AND a suitable temperature. With no oxygen the seeds cannot respire to release the energy they need to grow. Light is not needed for germination.',
    },
  ],
};
