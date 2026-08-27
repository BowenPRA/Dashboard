// src/data/Y7_MATH/U01_4/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Maths lives
// ONLY inside $$…$$ here. 1–2 key words in context (factor, common factor), 3–5
// the core skill (an HCF, one with the "never none" distractor, one simplifying
// a fraction), 6 a word problem. Distractors are diagnoses; no item copies a
// check or workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_factor',
      type: 'mcq',
      title: '1. Which of these is a factor of 20?',
      options: [
        { val: 'A', text: 'A. $$40$$' },
        { val: 'B', text: 'B. $$5$$' },
        { val: 'C', text: 'C. $$60$$' },
        { val: 'D', text: 'D. $$3$$' },
      ],
      correct: 'B',
      expEn: '$$5$$ divides into 20 exactly ($$20 ÷ 5 = 4$$), so it is a factor. $$40$$ and $$60$$ are **multiples** of 20; $$3$$ does not divide 20 exactly.',
      expVn: '$$5$$ chia hết 20 ($$20 ÷ 5 = 4$$), nên là ước số. $$40$$ và $$60$$ là **bội số** của 20; $$3$$ không chia hết 20.',
    },
    {
      id: 'a2_common',
      type: 'mcq',
      title: '2. A common factor of 8 and 12 is a number that:',
      options: [
        { val: 'A', text: 'A. divides into both 8 and 12' },
        { val: 'B', text: 'B. is a multiple of both 8 and 12' },
        { val: 'C', text: 'C. is bigger than both 8 and 12' },
        { val: 'D', text: 'D. equals 8 × 12' },
      ],
      correct: 'A',
      expEn: 'A factor divides **in**, so a common factor divides into **both** numbers. A multiple is what you land on (bigger), and $$8 × 12$$ is the sort of thing an LCM uses, not an HCF.',
      expVn: 'Ước số **chia vào**, nên ước số chung chia hết **cả hai** số. Bội số là số em đáp xuống (lớn hơn), và $$8 × 12$$ là kiểu của BCNN, không phải ƯCLN.',
    },
    {
      id: 'a3_hcf',
      type: 'mcq',
      title: '3. What is the highest common factor of 12 and 18?',
      options: [
        { val: 'A', text: 'A. $$36$$' },
        { val: 'B', text: 'B. $$2$$' },
        { val: 'C', text: 'C. $$6$$' },
        { val: 'D', text: 'D. $$1$$' },
      ],
      correct: 'C',
      expEn: 'The common factors of 12 and 18 are 1, 2, 3 and 6; the highest is 6. Answering 36 uses a multiple; 2 is a common factor but not the highest.',
      expVn: 'Ước số chung của 12 và 18 là 1, 2, 3 và 6; lớn nhất là 6. Trả lời 36 là dùng bội số; 2 là ước số chung nhưng không phải lớn nhất.',
    },
    {
      id: 'a4_never_none',
      type: 'mcq',
      title: '4. What is the HCF of 9 and 10?',
      options: [
        { val: 'A', text: 'A. none — they share no factors' },
        { val: 'B', text: 'B. $$1$$' },
        { val: 'C', text: 'C. $$90$$' },
        { val: 'D', text: 'D. $$19$$' },
      ],
      correct: 'B',
      expEn: '1 is a factor of every number, so the HCF of 9 and 10 is **1**, never “none”. Answering 90 multiplies them (that is the LCM); 19 adds them.',
      expVn: '1 là ước số của mọi số, nên ƯCLN của 9 và 10 là **1**, không bao giờ “không có”. Trả lời 90 là nhân (đó là BCNN); 19 là cộng.',
    },
    {
      id: 'a5_simplify',
      type: 'mcq',
      title: '5. Using the highest common factor, write $$\\tfrac{24}{36}$$ in its simplest form.',
      options: [
        { val: 'A', text: 'A. $$\\tfrac{12}{18}$$' },
        { val: 'B', text: 'B. $$\\tfrac{6}{9}$$' },
        { val: 'C', text: 'C. $$\\tfrac{1}{2}$$' },
        { val: 'D', text: 'D. $$\\tfrac{2}{3}$$' },
      ],
      correct: 'D',
      expEn: 'The HCF of 24 and 36 is 12. Divide top and bottom by 12: $$\\tfrac{24}{36} = \\tfrac{2}{3}$$. Dividing by only 2 gives $$\\tfrac{12}{18}$$, which is not yet simplest.',
      expVn: 'ƯCLN của 24 và 36 là 12. Chia cả tử và mẫu cho 12: $$\\tfrac{24}{36} = \\tfrac{2}{3}$$. Chỉ chia cho 2 thì được $$\\tfrac{12}{18}$$, chưa tối giản.',
    },
    {
      id: 'a6_word',
      type: 'mcq',
      title: '6. Mr Bowen cuts a 30 cm rope and a 42 cm rope into equal pieces, as long as possible, with none left over. How long is each piece?',
      options: [
        { val: 'A', text: 'A. $$6$$ cm' },
        { val: 'B', text: 'B. $$12$$ cm' },
        { val: 'C', text: 'C. $$72$$ cm' },
        { val: 'D', text: 'D. $$2$$ cm' },
      ],
      correct: 'A',
      expEn: '“As long as possible, none left over” means the HCF of 30 and 42, which is 6 cm. $$72$$ adds the two lengths; $$2$$ is a common factor but not the highest.',
      expVn: '“Dài nhất có thể, không thừa” nghĩa là ƯCLN của 30 và 42, bằng 6 cm. $$72$$ là cộng hai độ dài; $$2$$ là ước số chung nhưng không phải lớn nhất.',
    },
  ],
};
