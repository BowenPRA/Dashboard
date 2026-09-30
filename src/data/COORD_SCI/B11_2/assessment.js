// src/data/COORD_SCI/B11_2/assessment.js
// The Quiz for B11.03–B11.04, reproduction in humans and HIV: 10 MCQ, one
// sitting, 12 minutes. Shares Gate 2 with the arcade at 70 XP. English-only.
//
// No item repeats a notes check, a workbook question or a homework question.
// Every distractor is the answer reached by one nameable mistake (urethra for
// sperm duct, oviduct for uterus, ovulation for menstruation, antibiotics for
// antiretrovirals), and the correct letter is spread across A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_scrotum',
      type: 'mcq',
      title: '1. What is the function of the scrotum?',
      options: [
        { val: 'A', text: 'A. It makes the fluid that sperm swim in' },
        { val: 'B', text: 'B. It holds the testes outside the body' },
        { val: 'C', text: 'C. It carries sperm to the urethra' },
        { val: 'D', text: 'D. It makes sperm' },
      ],
      correct: 'B',
      expEn: 'The scrotum is the sac that holds the testes outside the body. The fluid is made by the prostate gland, the sperm ducts carry the sperm, and the testes make them.',
    },
    {
      id: 'a2_urethra',
      type: 'mcq',
      title: '2. In a man, which tube carries both urine and semen out of the body?',
      options: [
        { val: 'A', text: 'A. The sperm duct' },
        { val: 'B', text: 'B. The ureter' },
        { val: 'C', text: 'C. The oviduct' },
        { val: 'D', text: 'D. The urethra' },
      ],
      correct: 'D',
      expEn: 'The urethra runs from the bladder through the penis, and the sperm ducts join it, so it carries urine and semen (at different times). A ureter joins a kidney to the bladder; an oviduct is part of the female system.',
    },
    {
      id: 'a3_oviduct',
      type: 'mcq',
      title: '3. What is the function of an oviduct?',
      options: [
        { val: 'A', text: 'A. It carries the egg from the ovary towards the uterus' },
        { val: 'B', text: 'B. It makes eggs' },
        { val: 'C', text: 'C. It is where the embryo implants' },
        { val: 'D', text: 'D. It secretes oestrogen' },
      ],
      correct: 'A',
      expEn: 'The oviduct carries the egg from the ovary to the uterus, and it is where fertilisation takes place. Eggs and oestrogen both come from the ovary; implantation is in the uterus lining.',
    },
    {
      id: 'a4_acrosome',
      type: 'mcq',
      title: '4. What does the acrosome of a sperm cell contain?',
      options: [
        { val: 'A', text: 'A. Mitochondria' },
        { val: 'B', text: 'B. Chromosomes' },
        { val: 'C', text: 'C. Enzymes' },
        { val: 'D', text: 'D. An energy store' },
      ],
      correct: 'C',
      expEn: 'The acrosome is a small bag of enzymes at the front of the head. They digest a path through the jelly coat of the egg. The mitochondria are in the middle piece and the chromosomes are in the nucleus.',
    },
    {
      id: 'a5_compare',
      type: 'mcq',
      title: '5. Which statement correctly compares a human egg cell with a human sperm cell?',
      options: [
        { val: 'A', text: 'A. The egg is smaller and is made in larger numbers' },
        { val: 'B', text: 'B. The egg is larger and can swim' },
        { val: 'C', text: 'C. The egg is smaller and cannot move by itself' },
        { val: 'D', text: 'D. The egg is larger and is made in much smaller numbers' },
      ],
      correct: 'D',
      expEn: 'An egg is far larger than a sperm (it carries an energy store), only about one is released each month, and it cannot move by itself. Sperm are tiny, made in millions, and swim.',
    },
    {
      id: 'a6_zygote',
      type: 'mcq',
      title: '6. A human zygote is formed at fertilisation. Which row describes its nucleus?',
      options: [
        { val: 'A', text: 'A. Haploid, with 23 chromosomes' },
        { val: 'B', text: 'B. Diploid, with 46 chromosomes' },
        { val: 'C', text: 'C. Haploid, with 46 chromosomes' },
        { val: 'D', text: 'D. Diploid, with 23 chromosomes' },
      ],
      correct: 'B',
      expEn: 'Each gamete is haploid, with 23 chromosomes. When the two nuclei fuse, the zygote has 23 + 23 = 46 chromosomes in pairs, so it is diploid.',
    },
    {
      id: 'a7_embryo',
      type: 'mcq',
      title: '7. After fertilisation, the zygote divides many times. What is the ball of cells it forms called, and where does it implant?',
      options: [
        { val: 'A', text: 'A. An embryo, in the lining of the uterus' },
        { val: 'B', text: 'B. An embryo, in an oviduct' },
        { val: 'C', text: 'C. A follicle, in the lining of the uterus' },
        { val: 'D', text: 'D. A follicle, in an ovary' },
      ],
      correct: 'A',
      expEn: 'The ball of cells is an embryo, and it implants in the lining of the uterus. A follicle is the structure in an ovary in which an egg develops — before fertilisation, not after.',
    },
    {
      id: 'a8_menstruation',
      type: 'mcq',
      title: '8. What happens during menstruation?',
      options: [
        { val: 'A', text: 'A. An egg is released from an ovary' },
        { val: 'B', text: 'B. The lining of the uterus becomes thicker' },
        { val: 'C', text: 'C. The lining of the uterus breaks down and is lost through the vagina' },
        { val: 'D', text: 'D. An embryo sinks into the lining of the uterus' },
      ],
      correct: 'C',
      expEn: 'Menstruation is the breakdown and loss of the uterus lining, in about the first five days of the cycle. The release of an egg is ovulation, and an embryo sinking into the lining is implantation.',
    },
    {
      id: 'a9_transmission',
      type: 'mcq',
      title: '9. Which of these is a way in which HIV can be transmitted?',
      options: [
        { val: 'A', text: 'A. Sharing a towel' },
        { val: 'B', text: 'B. Sharing a meal' },
        { val: 'C', text: 'C. Breathing the same air' },
        { val: 'D', text: 'D. Sharing a needle' },
      ],
      correct: 'D',
      expEn: 'HIV is passed on in body fluids such as blood. A shared needle carries a little infected blood straight into the next person. The virus is not spread on towels, in food or through the air.',
    },
    {
      id: 'a10_control',
      type: 'mcq',
      title: '10. A pregnant woman with HIV is given antiretroviral drugs. Why?',
      options: [
        { val: 'A', text: 'A. They kill all the bacteria in her blood' },
        { val: 'B', text: 'B. They stop the virus multiplying, so it is much less likely to be passed to her baby' },
        { val: 'C', text: 'C. They cure the infection completely' },
        { val: 'D', text: 'D. They make her produce more eggs' },
      ],
      correct: 'B',
      expEn: 'Antiretroviral drugs stop HIV multiplying, which keeps the mother healthy and greatly reduces the chance of the virus passing to the baby. They do not cure the infection, and HIV is a virus, not a bacterium.',
    },
  ],
};
