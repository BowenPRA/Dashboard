// src/data/Y7_MATH/U02_6/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 the sign read aloud, 2 a word-problem word, 3 integer and many
// answers, 4 a number line described in words, 5 the smallest integer, 6 the
// largest integer below zero, 7 a half below zero, 8 two inequalities at once.
// Every distractor is a diagnosis: read the sign backwards, read right to
// left, dropped the minus sign, counted the open circle's own number, went the
// wrong way on the number line, gave a number that is not an integer, or gave
// one that works but is not the first. No item copies a deck check, a workbook
// question or a Show It item.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_say',
      type: 'mcq',
      title: '1. Which sentence reads $$h < 70$$ correctly?',
      options: [
        { val: 'A', text: 'A. "h is greater than 70"' },
        { val: 'B', text: 'B. "70 is less than h"' },
        { val: 'C', text: 'C. "h is less than 70"' },
        { val: 'D', text: 'D. "h is less 70"' },
      ],
      correct: 'C',
      expEn: 'Read from left to right: h, then "is less than", then 70. A reads the sign backwards. B reads from right to left, which says the opposite: that 70 is the smaller one. D leaves out "than" — the phrase is always "is less than".',
      expVn: 'Đọc từ trái sang phải: h, rồi "is less than" (nhỏ hơn), rồi 70. A là đọc ngược dấu. B là đọc từ phải sang trái, mang nghĩa ngược lại: rằng 70 mới là số nhỏ hơn. D thiếu từ "than" — cụm từ luôn là "is less than".',
      expFr: 'Lis de gauche à droite : h, puis « is less than » (est plus petit que), puis 70. A lit le signe à l’envers. B lit de droite à gauche, ce qui dit le contraire : que 70 est le plus petit. D oublie « than » — l’expression est toujours « is less than ».',
    },
    {
      id: 'a2_words',
      type: 'mcq',
      title: '2. A sign says: "Cheaper tickets for people under 21." Which inequality shows the ages $$a$$ that get a cheaper ticket?',
      options: [
        { val: 'A', text: 'A. $$a < 21$$' },
        { val: 'B', text: 'B. $$a > 21$$' },
        { val: 'C', text: 'C. $$21 < a$$' },
        { val: 'D', text: 'D. $$a < 20$$' },
      ],
      correct: 'A',
      expEn: '"Under" means less than, so the ages are less than 21: $$a < 21$$. B reads "under" as greater than. C puts the number first but keeps the same sign, so it says 21 is less than the age — the same mistake as B. D uses 20, the largest whole age that works, instead of the number in the sentence: it leaves out somebody who is 20.',
      expVn: '"Under" (dưới) nghĩa là nhỏ hơn, nên số tuổi nhỏ hơn 21: $$a < 21$$. B hiểu "under" thành lớn hơn. C đưa con số lên trước nhưng giữ nguyên dấu, nên nó nói 21 nhỏ hơn số tuổi — cùng một lỗi với B. D dùng 20, số tuổi nguyên lớn nhất thỏa mãn, thay vì con số trong câu: như thế là bỏ sót người 20 tuổi.',
      expFr: '« Under » (en dessous de) veut dire plus petit que, donc les âges sont plus petits que 21 : $$a < 21$$. B lit « under » comme plus grand que. C met le nombre en premier mais garde le même signe, donc il dit que 21 est plus petit que l’âge — la même erreur que B. D utilise 20, le plus grand âge entier qui marche, au lieu du nombre de la phrase : il oublie quelqu’un qui a 20 ans.',
    },
    {
      id: 'a3_integer',
      type: 'mcq',
      title: '3. $$c$$ is an integer and $$c > 28$$. Which of these could $$c$$ be?',
      options: [
        { val: 'A', text: 'A. $$28$$' },
        { val: 'B', text: 'B. $$28.5$$' },
        { val: 'C', text: 'C. $$27$$' },
        { val: 'D', text: 'D. $$41$$' },
      ],
      correct: 'D',
      expEn: '$$41$$ is an integer and it is greater than 28. An inequality has many answers, and 41 is one of them. A is the open circle’s own number: 28 is not greater than 28. B is greater than 28, but it is not an integer. C is an integer, but it is less than 28.',
      expVn: '$$41$$ là số nguyên và lớn hơn 28. Một bất đẳng thức có nhiều đáp án, và 41 là một trong số đó. A là chính con số ở vòng tròn rỗng: 28 không lớn hơn 28. B lớn hơn 28, nhưng không phải số nguyên. C là số nguyên, nhưng nhỏ hơn 28.',
      expFr: '$$41$$ est un entier et il est plus grand que 28. Une inégalité a plusieurs réponses, et 41 en fait partie. A est le nombre du cercle vide lui-même : 28 n’est pas plus grand que 28. B est plus grand que 28, mais ce n’est pas un entier. C est un entier, mais il est plus petit que 28.',
    },
    {
      id: 'a4_line',
      type: 'mcq',
      title: '4. A number line has an open circle above $$-17$$ and an arrow from the circle pointing to the right. Which inequality does it show?',
      options: [
        { val: 'A', text: 'A. $$x < -17$$' },
        { val: 'B', text: 'B. $$x > -17$$' },
        { val: 'C', text: 'C. $$x > -16$$' },
        { val: 'D', text: 'D. $$x > 17$$' },
      ],
      correct: 'B',
      expEn: 'The number under the open circle is the number in the inequality, and an arrow to the right points at the greater numbers: $$x > -17$$. A has the arrow going left. C uses the first integer that works instead of the circle’s number. D has lost the minus sign.',
      expVn: 'Con số nằm dưới vòng tròn rỗng là con số trong bất đẳng thức, và mũi tên sang phải chỉ về phía các số lớn hơn: $$x > -17$$. A là mũi tên đi sang trái. C dùng số nguyên đầu tiên thỏa mãn thay vì con số ở vòng tròn. D bỏ mất dấu trừ.',
      expFr: 'Le nombre sous le cercle vide est le nombre de l’inégalité, et une flèche vers la droite pointe vers les nombres plus grands : $$x > -17$$. A a la flèche vers la gauche. C utilise le premier entier qui marche au lieu du nombre du cercle. D a perdu le signe moins.',
    },
    {
      id: 'a5_smallest',
      type: 'mcq',
      title: '5. $$p > 59$$. What is the smallest integer $$p$$ could be?',
      options: [
        { val: 'A', text: 'A. $$60$$' },
        { val: 'B', text: 'B. $$59$$' },
        { val: 'C', text: 'C. $$58$$' },
        { val: 'D', text: 'D. $$59.5$$' },
      ],
      correct: 'A',
      expEn: 'The first integer after 59 is $$60$$. B is the open circle’s own number: 59 is not greater than 59. C is on the wrong side — it is less than 59. D is greater than 59, but it is not an integer.',
      expVn: 'Số nguyên đầu tiên sau 59 là $$60$$. B là chính con số ở vòng tròn rỗng: 59 không lớn hơn 59. C nằm sai phía — nó nhỏ hơn 59. D lớn hơn 59, nhưng không phải số nguyên.',
      expFr: 'Le premier entier après 59 est $$60$$. B est le nombre du cercle vide lui-même : 59 n’est pas plus grand que 59. C est du mauvais côté — il est plus petit que 59. D est plus grand que 59, mais ce n’est pas un entier.',
    },
    {
      id: 'a6_largest',
      type: 'mcq',
      title: '6. $$t < -30$$. What is the largest integer $$t$$ could be?',
      options: [
        { val: 'A', text: 'A. $$-29$$' },
        { val: 'B', text: 'B. $$-30$$' },
        { val: 'C', text: 'C. $$-31$$' },
        { val: 'D', text: 'D. $$-40$$' },
      ],
      correct: 'C',
      expEn: 'Less than means further left on the number line, even below zero, and the first integer to the left of −30 is $$-31$$. A went right: −29 is greater than −30. B is the open circle’s own number. D does work, but it is not the largest: −31 is greater than −40.',
      expVn: 'Nhỏ hơn nghĩa là nằm xa hơn về bên trái trên trục số, kể cả khi dưới 0, và số nguyên đầu tiên bên trái −30 là $$-31$$. A là đi sang phải: −29 lớn hơn −30. B là chính con số ở vòng tròn rỗng. D có thỏa mãn, nhưng không phải lớn nhất: −31 lớn hơn −40.',
      expFr: 'Plus petit que veut dire plus à gauche sur la droite graduée, même sous zéro, et le premier entier à gauche de −30 est $$-31$$. A est allé à droite : −29 est plus grand que −30. B est le nombre du cercle vide lui-même. D marche, mais ce n’est pas le plus grand : −31 est plus grand que −40.',
    },
    {
      id: 'a7_half',
      type: 'mcq',
      title: '7. $$n > -6.5$$. What is the smallest integer $$n$$ could be?',
      options: [
        { val: 'A', text: 'A. $$-7$$' },
        { val: 'B', text: 'B. $$-6$$' },
        { val: 'C', text: 'C. $$-6.5$$' },
        { val: 'D', text: 'D. $$-5$$' },
      ],
      correct: 'B',
      expEn: '−6.5 is halfway between −7 and −6. Greater than means right, and the first integer to the right of −6.5 is $$-6$$. A went left: −7 is less than −6.5. C is the open circle, and it is not an integer. D works, but −6 is smaller.',
      expVn: '−6.5 nằm chính giữa −7 và −6. Lớn hơn nghĩa là bên phải, và số nguyên đầu tiên bên phải −6.5 là $$-6$$. A là đi sang trái: −7 nhỏ hơn −6.5. C là vòng tròn rỗng, và không phải số nguyên. D có thỏa mãn, nhưng −6 nhỏ hơn.',
      expFr: '−6.5 est au milieu entre −7 et −6. Plus grand que veut dire à droite, et le premier entier à droite de −6.5 est $$-6$$. A est allé à gauche : −7 est plus petit que −6.5. C est le cercle vide, et ce n’est pas un entier. D marche, mais −6 est plus petit.',
    },
    {
      id: 'a8_between',
      type: 'mcq',
      title: '8. A basket holds more than $$46$$ eggs. It holds fewer than $$50$$ eggs. Which list shows every number of eggs it could hold?',
      options: [
        { val: 'A', text: 'A. $$46$$, $$47$$, $$48$$, $$49$$' },
        { val: 'B', text: 'B. $$47$$, $$48$$, $$49$$, $$50$$' },
        { val: 'C', text: 'C. $$45$$, $$44$$, $$43$$' },
        { val: 'D', text: 'D. $$47$$, $$48$$, $$49$$' },
      ],
      correct: 'D',
      expEn: 'The two inequalities are $$e > 46$$ and $$e < 50$$, and the integers that fit both are 47, 48 and 49. A counts 46, which is not more than 46. B counts 50, which is not fewer than 50. C went the wrong way: those are fewer than 46.',
      expVn: 'Hai bất đẳng thức là $$e > 46$$ và $$e < 50$$, và các số nguyên thỏa mãn cả hai là 47, 48 và 49. A tính cả 46, mà 46 không nhiều hơn 46. B tính cả 50, mà 50 không ít hơn 50. C là đi sai hướng: những số đó ít hơn 46.',
      expFr: 'Les deux inégalités sont $$e > 46$$ et $$e < 50$$, et les entiers qui conviennent aux deux sont 47, 48 et 49. A compte 46, qui n’est pas plus grand que 46. B compte 50, qui n’est pas plus petit que 50. C est parti du mauvais côté : ceux-là sont plus petits que 46.',
    },
  ],
};
