// src/data/Y7_SCI/U02_6/assessment.js
// Eight questions, one sitting, ten minutes. 1–2 element or compound, 3 new
// properties, 4–5 naming (-ide, -ate), 6 mono, 7–8 reading and writing a
// formula. Every distractor is a misconception the unit names: O₂ is a
// compound because it has two atoms; CO is "carbon oxide"; the small number
// counts the next symbol; a compound keeps its elements' properties; Ca read
// as C. No item copies a deck check or a workbook question.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_o2',
      type: 'mcq',
      title: '1. Oxygen gas is O₂. Is it an element or a compound?',
      options: [
        { val: 'A', text: 'A. A compound, because each particle has two atoms' },
        { val: 'B', text: 'B. An element, because both atoms are oxygen' },
        { val: 'C', text: 'C. A compound, because it is a gas' },
        { val: 'D', text: 'D. An element, because it has a small number' },
      ],
      correct: 'B',
      expEn: 'Both atoms are **oxygen**: one kind of atom, so O₂ is an **element**. Two atoms do not make a compound — two **kinds** of atom do (A). Being a gas says nothing about it (C), and the small number only counts atoms (D).',
      expVn: 'Cả hai nguyên tử đều là **oxi**: một loại nguyên tử, nên O₂ là **nguyên tố**. Hai nguyên tử không làm nên hợp chất — hai **loại** nguyên tử mới làm nên hợp chất (A). Là chất khí không nói lên điều gì (C), và số nhỏ chỉ đếm số nguyên tử (D).',
    },
    {
      id: 'a2_compound',
      type: 'mcq',
      title: '2. Which of these is a compound?',
      options: [
        { val: 'A', text: 'A. Cl₂' },
        { val: 'B', text: 'B. Fe' },
        { val: 'C', text: 'C. N₂' },
        { val: 'D', text: 'D. MgO' },
      ],
      correct: 'D',
      expEn: '**MgO** has two capital letters — magnesium and oxygen, bonded: a compound (magnesium oxide). Cl₂ and N₂ have two atoms but only one kind each, and Fe is iron alone — all elements.',
      expVn: '**MgO** có hai chữ in hoa — magie và oxi, liên kết với nhau: một hợp chất (magnesium oxide). Cl₂ và N₂ có hai nguyên tử nhưng mỗi chất chỉ một loại, còn Fe chỉ là sắt — tất cả đều là nguyên tố.',
    },
    {
      id: 'a3_properties',
      type: 'mcq',
      title: '3. Sodium is a metal that bursts into flame in water. Chlorine is a poisonous gas. What is sodium chloride like?',
      options: [
        { val: 'A', text: 'A. A shiny metal, like sodium' },
        { val: 'B', text: 'B. Poisonous, like chlorine' },
        { val: 'C', text: 'C. White crystals that are safe to eat — new properties' },
        { val: 'D', text: 'D. A poisonous metal that keeps the properties of both' },
      ],
      correct: 'C',
      expEn: 'A compound has **new properties**, not like the elements it is made from: sodium chloride is table salt, white crystals you can eat. A, B and D all think a compound keeps its elements’ properties.',
      expVn: 'Hợp chất có **tính chất mới**, không giống các nguyên tố tạo nên nó: sodium chloride là muối ăn, tinh thể trắng em ăn được. A, B và D đều nghĩ hợp chất giữ tính chất của các nguyên tố.',
    },
    {
      id: 'a4_ide',
      type: 'mcq',
      title: '4. What is the name of the compound of potassium and chlorine?',
      options: [
        { val: 'A', text: 'A. potassium chloride' },
        { val: 'B', text: 'B. chlorine potassium' },
        { val: 'C', text: 'C. potassium chlorate' },
        { val: 'D', text: 'D. potassium chlorine' },
      ],
      correct: 'A',
      expEn: 'The metal first — **potassium** — and the non-metal ending in -ide — **chloride**. B has the order backwards, C’s -ate would mean oxygen is in it too, and D forgets to change the ending.',
      expVn: 'Kim loại trước — **potassium** — và phi kim với đuôi -ide — **chloride**. B đảo ngược thứ tự, đuôi -ate của C nghĩa là có cả oxi, còn D quên đổi đuôi.',
    },
    {
      id: 'a5_ate',
      type: 'mcq',
      title: '5. Which elements are in magnesium sulfate?',
      options: [
        { val: 'A', text: 'A. magnesium and sulfur' },
        { val: 'B', text: 'B. magnesium, sulfur and oxygen' },
        { val: 'C', text: 'C. manganese, sulfur and oxygen' },
        { val: 'D', text: 'D. magnesium and oxygen' },
      ],
      correct: 'B',
      expEn: '**-ate** means two elements **plus oxygen**: magnesium, sulfur and oxygen. A is magnesium sulfide (-ide); D is magnesium oxide; manganese (C) is a different element.',
      expVn: '**-ate** nghĩa là hai nguyên tố **cộng với oxi**: magie, lưu huỳnh và oxi. A là magnesium sulfide (-ide); D là magnesium oxide; mangan (C) là một nguyên tố khác.',
    },
    {
      id: 'a6_mono',
      type: 'mcq',
      title: '6. What is the name of CO?',
      options: [
        { val: 'A', text: 'A. carbon oxide' },
        { val: 'B', text: 'B. carbon dioxide' },
        { val: 'C', text: 'C. carbon monoxide' },
        { val: 'D', text: 'D. cobalt' },
      ],
      correct: 'C',
      expEn: 'CO has one carbon atom and **one** oxygen atom: **mono** = one, so carbon **monoxide**. “Carbon oxide” (A) cannot tell it from CO₂, which is carbon **di**oxide (B). Cobalt is Co, with a small o (D).',
      expVn: 'CO có một nguyên tử cacbon và **một** nguyên tử oxi: **mono** = một, nên là carbon **monoxide**. “Carbon oxide” (A) không phân biệt được với CO₂, là carbon **di**oxide (B). Coban là Co, với chữ o thường (D).',
    },
    {
      id: 'a7_count',
      type: 'mcq',
      title: '7. How many atoms are in one particle of CaCO₃?',
      options: [
        { val: 'A', text: 'A. 3' },
        { val: 'B', text: 'B. 4' },
        { val: 'C', text: 'C. 6' },
        { val: 'D', text: 'D. 5' },
      ],
      correct: 'D',
      expEn: 'Ca (1) + C (1) + O₃ (3) = **5 atoms**. 3 counts the elements, not the atoms (A); 4 treats O₃ as one oxygen atom plus one more (B); 6 counts the small a of Ca as an atom of its own (C) — Ca is ONE calcium atom.',
      expVn: 'Ca (1) + C (1) + O₃ (3) = **5 nguyên tử**. 3 là số nguyên tố, không phải số nguyên tử (A); 4 coi O₃ là một nguyên tử oxi cộng thêm một (B); 6 đếm chữ a thường của Ca như một nguyên tử riêng (C) — Ca là MỘT nguyên tử canxi.',
    },
    {
      id: 'a8_write',
      type: 'mcq',
      title: '8. A particle of ammonia has one nitrogen atom bonded to three hydrogen atoms. What is its formula?',
      options: [
        { val: 'A', text: 'A. NH₃' },
        { val: 'B', text: 'B. N₃H' },
        { val: 'C', text: 'C. NH' },
        { val: 'D', text: 'D. NH₄' },
      ],
      correct: 'A',
      expEn: 'One N needs no number; three hydrogen atoms are **H₃**, with the 3 **after** the H it counts: **NH₃**. B puts the 3 after the wrong symbol; C forgets the number; D counts the total atoms instead.',
      expVn: 'Một N không cần số; ba nguyên tử hiđro là **H₃**, với số 3 đứng **sau** chữ H mà nó đếm: **NH₃**. B đặt số 3 sau sai kí hiệu; C quên số; D đếm tổng số nguyên tử.',
    },
  ],
};
