// src/data/COORD_SCI/B10_1/assessment.js
// The Quiz for B10 Coordination and response: 10 MCQ, one sitting, 12 minutes.
// Shares Gate 2 with the arcade at 70 XP. English-only.
//
// No item repeats a notes check, a workbook question or a homework question.
// Every distractor is the answer reached by one nameable mistake (swapping
// gland and target organ, insulin and glucagon, dilation and constriction,
// sensory and motor), and the correct letter is spread across A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_arc',
      type: 'mcq',
      title: '1. A bright light is shone into an eye and the pupil gets smaller. This is a reflex. Which list gives the pathway in the correct order?',
      options: [
        { val: 'A', text: 'A. receptor → motor neurone → relay neurone → sensory neurone → effector' },
        { val: 'B', text: 'B. effector → sensory neurone → relay neurone → motor neurone → receptor' },
        { val: 'C', text: 'C. receptor → sensory neurone → relay neurone → motor neurone → effector' },
        { val: 'D', text: 'D. receptor → relay neurone → sensory neurone → motor neurone → effector' },
      ],
      correct: 'C',
      expEn: 'Every reflex arc runs receptor → sensory → relay → motor → effector, whatever the stimulus. Option A swaps the sensory and motor neurones; option B runs the whole arc backwards.',
    },
    {
      id: 'a2_sensory',
      type: 'mcq',
      title: '2. A neurone carries impulses from a temperature receptor in the skin to the spinal cord. What type of neurone is it?',
      options: [
        { val: 'A', text: 'A. A sensory neurone' },
        { val: 'B', text: 'B. A motor neurone' },
        { val: 'C', text: 'C. A relay neurone' },
        { val: 'D', text: 'D. An effector' },
      ],
      correct: 'A',
      expEn: 'From a receptor TO the central nervous system is the job of a sensory neurone. A motor neurone goes the other way, from the CNS to an effector.',
    },
    {
      id: 'a3_pns',
      type: 'mcq',
      title: '3. What is the peripheral nervous system made of?',
      options: [
        { val: 'A', text: 'A. The brain only' },
        { val: 'B', text: 'B. The brain and the spinal cord' },
        { val: 'C', text: 'C. The nerves outside the brain and the spinal cord' },
        { val: 'D', text: 'D. The spinal cord and the nerves in the legs' },
      ],
      correct: 'C',
      expEn: 'The brain and spinal cord are the CENTRAL nervous system. Everything outside them — the nerves running to the rest of the body — is the peripheral nervous system.',
    },
    {
      id: 'a4_hormone',
      type: 'mcq',
      title: '4. Which statement about hormones is correct?',
      options: [
        { val: 'A', text: 'A. They are electrical impulses carried along neurones' },
        { val: 'B', text: 'B. They are chemicals made by glands and carried in the blood' },
        { val: 'C', text: 'C. They are made by muscles and act on glands' },
        { val: 'D', text: 'D. They act faster than nerve impulses' },
      ],
      correct: 'B',
      expEn: 'A hormone is a chemical substance, produced by a gland and carried by the blood, which alters the activity of its target organs. It is slower than a nerve impulse, not faster.',
    },
    {
      id: 'a5_adrenal',
      type: 'mcq',
      title: '5. Which row matches a gland to the hormone it secretes?',
      options: [
        { val: 'A', text: 'A. pancreas — adrenaline' },
        { val: 'B', text: 'B. testis — oestrogen' },
        { val: 'C', text: 'C. ovary — insulin' },
        { val: 'D', text: 'D. adrenal gland — adrenaline' },
      ],
      correct: 'D',
      expEn: 'The adrenal glands make adrenaline. The pancreas makes insulin and glucagon, the testes make testosterone, and the ovaries make oestrogen.',
    },
    {
      id: 'a6_pupil',
      type: 'mcq',
      title: '6. Adrenaline is secreted in a "fight or flight" situation. What happens to the pupils and to the breathing rate?',
      options: [
        { val: 'A', text: 'A. The pupils get wider and the breathing rate increases' },
        { val: 'B', text: 'B. The pupils get wider and the breathing rate decreases' },
        { val: 'C', text: 'C. The pupils get narrower and the breathing rate increases' },
        { val: 'D', text: 'D. The pupils get narrower and the breathing rate decreases' },
      ],
      correct: 'A',
      expEn: 'Adrenaline increases pupil diameter (more light enters the eye) and increases the breathing rate (more oxygen enters the blood). It also increases the heart rate.',
    },
    {
      id: 'a7_homeo',
      type: 'mcq',
      title: '7. What is homeostasis?',
      options: [
        { val: 'A', text: 'A. The release of energy from glucose in cells' },
        { val: 'B', text: 'B. The maintenance of a constant internal environment' },
        { val: 'C', text: 'C. The removal of waste products from the body' },
        { val: 'D', text: 'D. A fast, automatic response to a stimulus' },
      ],
      correct: 'B',
      expEn: 'Homeostasis is the maintenance of a constant internal environment. Option A is respiration, option C is excretion, and option D describes a reflex action.',
    },
    {
      id: 'a8_glucagon',
      type: 'mcq',
      title: '8. The blood glucose concentration of a person falls below its set point. What happens next?',
      options: [
        { val: 'A', text: 'A. Insulin is secreted and the liver stores glucose as glycogen' },
        { val: 'B', text: 'B. Insulin is secreted and the liver breaks down glycogen' },
        { val: 'C', text: 'C. Glucagon is secreted and the liver stores glucose as glycogen' },
        { val: 'D', text: 'D. Glucagon is secreted and the liver breaks down glycogen to glucose' },
      ],
      correct: 'D',
      expEn: 'Too low, so the concentration must be raised. The pancreas secretes glucagon, which makes the liver break its glycogen store down to glucose. Option A is what happens when the glucose is too HIGH.',
    },
    {
      id: 'a9_cold',
      type: 'mcq',
      title: '9. Which pair of responses helps to keep the body warm when its temperature falls below normal?',
      options: [
        { val: 'A', text: 'A. Vasodilation and sweating' },
        { val: 'B', text: 'B. Vasodilation and shivering' },
        { val: 'C', text: 'C. Vasoconstriction and shivering' },
        { val: 'D', text: 'D. Vasoconstriction and sweating' },
      ],
      correct: 'C',
      expEn: 'Vasoconstriction narrows the arterioles so less blood flows near the skin surface and less heat is lost; shivering releases heat from the muscles. Vasodilation and sweating are the responses to being too hot.',
    },
    {
      id: 'a10_feedback',
      type: 'mcq',
      title: '10. The control of body temperature is an example of negative feedback. What does that mean?',
      options: [
        { val: 'A', text: 'A. A change away from the set point causes a response that reverses the change' },
        { val: 'B', text: 'B. A change away from the set point causes a response that makes the change bigger' },
        { val: 'C', text: 'C. The body temperature is always falling' },
        { val: 'D', text: 'D. The brain is not involved in the response' },
      ],
      correct: 'A',
      expEn: 'In negative feedback the response is the opposite of the change, so the value returns to its set point: too hot leads to cooling, too cold leads to warming. The brain (the hypothalamus) is very much involved.',
    },
  ],
};
