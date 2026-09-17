// src/data/Y7_SCI/U02_5/assessment.js
// Eight questions, one sitting, ten minutes. 1–2 atom and element, 3 how atoms
// join, 4–5 reading the table (group, metals), 6–7 symbols (capitals, Latin
// names), 8 mass order. Every distractor is a misconception a student really
// brings: element for atom, a compound for an element, period for group,
// metals on the right, two capitals, an English first letter for a Latin symbol,
// and "further down the same group is lighter". No item copies a deck check.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_atom',
      type: 'mcq',
      title: '1. Which sentence describes an atom?',
      options: [
        { val: 'A', text: 'A. A substance made of only one kind of atom' },
        { val: 'B', text: 'B. A tiny piece of matter — everything is made of atoms' },
        { val: 'C', text: 'C. Something that is found only in metals like gold' },
        { val: 'D', text: 'D. A very, very small tube made of carbon' },
      ],
      correct: 'B',
      expEn: 'An **atom** is a tiny piece of matter, and everything is made of atoms. A describes an **element**; D describes a **nanotube**; and atoms are in everything, not only metals (C).',
      expVn: '**Nguyên tử** là một mẩu vật chất rất nhỏ, và mọi thứ đều được tạo nên từ nguyên tử. A mô tả **nguyên tố**; D mô tả **ống nano**; và nguyên tử có trong mọi thứ, không chỉ kim loại (C).',
    },
    {
      id: 'a2_element',
      type: 'mcq',
      title: '2. Which of these is an element?',
      options: [
        { val: 'A', text: 'A. Silver — made of only silver atoms' },
        { val: 'B', text: 'B. Water — made of hydrogen atoms and oxygen atoms joined together' },
        { val: 'C', text: 'C. Air — a mix of different gases' },
        { val: 'D', text: 'D. A silver ring with gold in it' },
      ],
      correct: 'A',
      expEn: 'An element is made of **only one kind of atom**, so pure **silver** is an element. Water has two kinds of atom (B); air is several gases (C); a ring with silver and gold has two kinds of atom (D).',
      expVn: 'Nguyên tố chỉ gồm **một loại nguyên tử**, nên **bạc** nguyên chất là một nguyên tố. Nước có hai loại nguyên tử (B); không khí gồm nhiều chất khí (C); chiếc nhẫn có cả bạc và vàng có hai loại nguyên tử (D).',
    },
    {
      id: 'a3_alone',
      type: 'mcq',
      title: '3. In which element do the atoms move around alone, not joined to other atoms?',
      options: [
        { val: 'A', text: 'A. Gold' },
        { val: 'B', text: 'B. Oxygen' },
        { val: 'C', text: 'C. Sulfur' },
        { val: 'D', text: 'D. Neon' },
      ],
      correct: 'D',
      expEn: '**Neon** atoms move around **alone**. Gold atoms are packed closely (A); oxygen is particles of 2 joined atoms (B); sulfur is particles of 8 atoms in a ring (C).',
      expVn: 'Nguyên tử **neon** chuyển động **riêng lẻ**. Nguyên tử vàng xếp sát nhau (A); oxi là các hạt gồm 2 nguyên tử liên kết (B); lưu huỳnh là các hạt gồm 8 nguyên tử thành vòng (C).',
    },
    {
      id: 'a4_group',
      type: 'mcq',
      title: '4. Lithium, sodium and potassium are in the same column of the Periodic Table. What is a column called?',
      options: [
        { val: 'A', text: 'A. A period' },
        { val: 'B', text: 'B. A row' },
        { val: 'C', text: 'C. A group' },
        { val: 'D', text: 'D. A symbol' },
      ],
      correct: 'C',
      expEn: 'A column is a **group** — lithium, sodium and potassium are group 1. A **period** is a row (A and B are the same wrong idea); a symbol is the short way to write one element (D).',
      expVn: 'Một cột là một **nhóm** — liti, natri và kali thuộc nhóm 1. **Chu kì** là một hàng (A và B cùng một ý sai); kí hiệu là cách viết ngắn gọn một nguyên tố (D).',
    },
    {
      id: 'a5_metals',
      type: 'mcq',
      title: '5. Where are the metals in the first 20 elements of the Periodic Table?',
      options: [
        { val: 'A', text: 'A. On the right of each row' },
        { val: 'B', text: 'B. Only in the last group' },
        { val: 'C', text: 'C. On the left of each row' },
        { val: 'D', text: 'D. Only in the first period' },
      ],
      correct: 'C',
      expEn: 'The metals — lithium, beryllium, sodium, magnesium, aluminium, potassium, calcium — are on the **left**. The right side, including the last group, is non-metals (A, B); period 1 is hydrogen and helium, both non-metals (D).',
      expVn: 'Các kim loại — liti, beri, natri, magie, nhôm, kali, canxi — nằm ở bên **trái**. Bên phải, kể cả nhóm cuối, là phi kim (A, B); chu kì 1 là hiđro và heli, đều là phi kim (D).',
    },
    {
      id: 'a6_capitals',
      type: 'mcq',
      title: '6. Which is the correct way to write the symbol for magnesium?',
      options: [
        { val: 'A', text: 'A. Mg' },
        { val: 'B', text: 'B. MG' },
        { val: 'C', text: 'C. mg' },
        { val: 'D', text: 'D. mG' },
      ],
      correct: 'A',
      expEn: '**Mg**: the first letter is a capital and the second is small. MG would be read as two symbols (B); a symbol never starts with a small letter (C, D) — and mg is the unit milligram.',
      expVn: '**Mg**: chữ cái đầu viết hoa và chữ thứ hai viết thường. MG sẽ được đọc là hai kí hiệu (B); kí hiệu không bao giờ bắt đầu bằng chữ thường (C, D) — và mg là đơn vị miligam.',
    },
    {
      id: 'a7_latin',
      type: 'mcq',
      title: '7. Which element has a symbol that comes from its Latin name?',
      options: [
        { val: 'A', text: 'A. Carbon, C' },
        { val: 'B', text: 'B. Potassium, K' },
        { val: 'C', text: 'C. Chlorine, Cl' },
        { val: 'D', text: 'D. Helium, He' },
      ],
      correct: 'B',
      expEn: 'There is no K in "potassium": **K** comes from its Latin name, **kalium**. C is the first letter of carbon (A); Cl and He are the first letter plus another letter of chlorine and helium (C, D).',
      expVn: 'Trong "potassium" không có chữ K: **K** đến từ tên La-tinh **kalium**. C là chữ cái đầu của carbon (A); Cl và He là chữ cái đầu cộng một chữ khác của chlorine và helium (C, D).',
    },
    {
      id: 'a8_mass',
      type: 'mcq',
      title: '8. Oxygen is in period 2. Which of these elements has lighter atoms than oxygen?',
      options: [
        { val: 'A', text: 'A. Fluorine' },
        { val: 'B', text: 'B. Sulfur' },
        { val: 'C', text: 'C. Sodium' },
        { val: 'D', text: 'D. Nitrogen' },
      ],
      correct: 'D',
      expEn: 'Atoms get heavier in reading order, and **nitrogen** comes just before oxygen, so its atoms are lighter. Fluorine comes after oxygen in period 2 (A); sulfur and sodium are in period 3, later still (B, C).',
      expVn: 'Nguyên tử nặng dần theo thứ tự đọc, và **nitơ** đứng ngay trước oxi, nên nguyên tử của nó nhẹ hơn. Flo đứng sau oxi trong chu kì 2 (A); lưu huỳnh và natri ở chu kì 3, còn đứng sau nữa (B, C).',
    },
  ],
};
