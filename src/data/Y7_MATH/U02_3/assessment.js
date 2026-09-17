// src/data/Y7_MATH/U02_3/assessment.js
// Eight questions, one sitting, ten minutes (algebra-engines.md §1). Maths lives
// ONLY inside $$…$$ here. 1–2 the key words in context (like terms, term);
// 3–7 the core skill, each built on one slip the deck names — the invisible 1,
// the lost sign, collecting unlike terms, x² against x, and ab = ba with
// numbers; 8 a perimeter word problem. Distractors are diagnoses; no item
// copies a check, an activity, a workbook question or a Collect It item.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_like_terms',
      type: 'mcq',
      title: '1. Which of these is a pair of like terms?',
      options: [
        { val: 'A', text: 'A. $$6r$$ and $$6s$$' },
        { val: 'B', text: 'B. $$2t^2$$ and $$2t$$' },
        { val: 'C', text: 'C. $$8v$$ and $$v$$' },
        { val: 'D', text: 'D. $$5$$ and $$5u$$' },
      ],
      correct: 'C',
      expEn: 'Like terms have the same letters: $$8v$$ and $$v$$ (which is $$1v$$). A has the same number but different letters; B is $$t^2$$ against $$t$$, two different kinds; D is a number against a $$u$$ term.',
      expVn: 'Hạng tử đồng dạng có cùng chữ cái: $$8v$$ và $$v$$ (tức là $$1v$$). A có cùng con số nhưng khác chữ cái; B là $$t^2$$ với $$t$$, hai loại khác nhau; D là một số với một hạng tử $$u$$.',
    },
    {
      id: 'a2_terms',
      type: 'mcq',
      title: '2. How many terms are in $$3h + 8 - 2g - h + 1$$?',
      options: [
        { val: 'A', text: 'A. $$3$$' },
        { val: 'B', text: 'B. $$5$$' },
        { val: 'C', text: 'C. $$4$$' },
        { val: 'D', text: 'D. $$2$$' },
      ],
      correct: 'B',
      expEn: 'The + and − signs separate five terms: $$3h$$, $$8$$, $$-2g$$, $$-h$$ and $$1$$. A counts the kinds ($$h$$, $$g$$ and numbers), not the terms; C misses a number on its own; D counts only the letters.',
      expVn: 'Các dấu + và − ngăn cách năm hạng tử: $$3h$$, $$8$$, $$-2g$$, $$-h$$ và $$1$$. A đếm số loại ($$h$$, $$g$$ và các số), không phải số hạng tử; C bỏ sót một số đứng riêng; D chỉ đếm các chữ cái.',
    },
    {
      id: 'a3_invisible_one',
      type: 'mcq',
      title: '3. Simplify $$9z - z$$.',
      options: [
        { val: 'A', text: 'A. $$9$$' },
        { val: 'B', text: 'B. $$8$$' },
        { val: 'C', text: 'C. $$8z$$' },
        { val: 'D', text: 'D. $$9z$$' },
      ],
      correct: 'C',
      expEn: 'A lone $$z$$ is $$1z$$, so $$9z - 1z = 8z$$. A cancels the letters; B loses the letter, which never disappears; D treats the lone $$z$$ as nothing.',
      expVn: 'Chữ $$z$$ đứng riêng là $$1z$$, nên $$9z - 1z = 8z$$. A triệt tiêu các chữ cái; B làm mất chữ cái, trong khi chữ cái không bao giờ biến mất; D coi chữ $$z$$ đứng riêng như không có gì.',
    },
    {
      id: 'a4_lost_sign',
      type: 'mcq',
      title: '4. Simplify $$6a + 2b - 4a + 5b$$.',
      options: [
        { val: 'A', text: 'A. $$10a + 7b$$' },
        { val: 'B', text: 'B. $$2a + 7b$$' },
        { val: 'C', text: 'C. $$9ab$$' },
        { val: 'D', text: 'D. $$2a - 7b$$' },
      ],
      correct: 'B',
      expEn: 'The minus belongs to $$4a$$: $$6a - 4a = 2a$$, and $$2b + 5b = 7b$$. A left the minus sign behind; C joins unlike terms; D moved the minus sign onto the $$b$$ terms.',
      expVn: 'Dấu trừ thuộc về $$4a$$: $$6a - 4a = 2a$$, và $$2b + 5b = 7b$$. A bỏ quên dấu trừ; C gộp các hạng tử không đồng dạng; D chuyển dấu trừ sang các hạng tử $$b$$.',
    },
    {
      id: 'a5_unlike',
      type: 'mcq',
      title: '5. Simplify $$4k + 7$$.',
      options: [
        { val: 'A', text: 'A. $$11k$$' },
        { val: 'B', text: 'B. $$11$$' },
        { val: 'C', text: 'C. $$28k$$' },
        { val: 'D', text: 'D. It cannot be simplified: $$4k + 7$$' },
      ],
      correct: 'D',
      expEn: '$$4k$$ is a $$k$$ term and $$7$$ is a number: no like terms, so $$4k + 7$$ is already in simplest form. A and B collect unlike terms; C multiplies them.',
      expVn: '$$4k$$ là hạng tử $$k$$ còn $$7$$ là một số: không có hạng tử đồng dạng, nên $$4k + 7$$ đã ở dạng gọn nhất. A và B gộp các hạng tử không đồng dạng; C nhân chúng với nhau.',
    },
    {
      id: 'a6_squared',
      type: 'mcq',
      title: '6. Simplify $$5x^2 + 3x + x^2$$.',
      options: [
        { val: 'A', text: 'A. $$6x^2 + 3x$$' },
        { val: 'B', text: 'B. $$9x^2$$' },
        { val: 'C', text: 'C. $$5x^2 + 4x$$' },
        { val: 'D', text: 'D. $$6x^4 + 3x$$' },
      ],
      correct: 'A',
      expEn: '$$x^2$$ and $$x$$ are different kinds. The $$x^2$$ terms make $$5x^2 + 1x^2 = 6x^2$$, and $$3x$$ stays. B collects $$x$$ with $$x^2$$; C reads $$x^2$$ as an $$x$$ term; D adds the powers, but collecting never changes the letters.',
      expVn: '$$x^2$$ và $$x$$ là hai loại khác nhau. Các hạng tử $$x^2$$ được $$5x^2 + 1x^2 = 6x^2$$, còn $$3x$$ giữ nguyên. B gộp $$x$$ với $$x^2$$; C đọc $$x^2$$ thành hạng tử $$x$$; D cộng các số mũ, nhưng gộp hạng tử không bao giờ làm đổi chữ cái.',
    },
    {
      id: 'a7_ab_ba',
      type: 'mcq',
      title: '7. Simplify $$7mn + 2 - 3nm + 6$$.',
      options: [
        { val: 'A', text: 'A. $$4mn + 8$$' },
        { val: 'B', text: 'B. $$10mn + 8$$' },
        { val: 'C', text: 'C. $$12mn$$' },
        { val: 'D', text: 'D. $$7mn - 3nm + 8$$' },
      ],
      correct: 'A',
      expEn: '$$mn$$ and $$nm$$ are like terms, because $$m \\times n = n \\times m$$: $$7mn - 3mn = 4mn$$, and $$2 + 6 = 8$$. B left the minus sign behind; C adds the numbers to the $$mn$$ terms; D does not see that $$nm$$ is $$mn$$.',
      expVn: '$$mn$$ và $$nm$$ là hạng tử đồng dạng, vì $$m \\times n = n \\times m$$: $$7mn - 3mn = 4mn$$, và $$2 + 6 = 8$$. B bỏ quên dấu trừ; C cộng các số vào hạng tử $$mn$$; D không nhận ra $$nm$$ chính là $$mn$$.',
    },
    {
      id: 'a8_perimeter',
      type: 'mcq',
      title: '8. Mr Bowen’s vegetable garden is a rectangle $$3y + 2$$ metres long and $$y$$ metres wide. What is its perimeter?',
      options: [
        { val: 'A', text: 'A. $$4y + 2$$ metres' },
        { val: 'B', text: 'B. $$12y$$ metres' },
        { val: 'C', text: 'C. $$6y + 4$$ metres' },
        { val: 'D', text: 'D. $$8y + 4$$ metres' },
      ],
      correct: 'D',
      expEn: 'Add all four sides: $$3y + 2 + y + 3y + 2 + y = 8y + 4$$ metres. A only goes half way round; B adds the numbers to the $$y$$ terms; C forgets that each lone $$y$$ is $$1y$$.',
      expVn: 'Cộng cả bốn cạnh: $$3y + 2 + y + 3y + 2 + y = 8y + 4$$ mét. A mới đi nửa vòng; B cộng các số vào hạng tử $$y$$; C quên rằng mỗi chữ $$y$$ đứng riêng là $$1y$$.',
    },
  ],
};
