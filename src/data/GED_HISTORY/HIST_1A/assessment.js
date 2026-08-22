
export const assessment = {
  timeLimit: 3600, // 60 minutes
  passages: [
    {
      id: "passage_1",
      title: "Primary Source: A Patriot's Letter (Adapted, 1773)",
      vnTitle: "Nguồn Sơ cấp: Bức thư của một Người Yêu nước (Phóng tác, 1773)",
      meta: "Historical Document",
      text: "We, the loyal subjects of Massachusetts, express our deep {grievance} regarding the recent taxes. The {tyranny} of forcing us to pay for a war while denying us representation in {parliament} is unjust. If you do not {repeal} these laws, we will {boycott} your goods and rely on our own {militia} for protection.",
      vnText: "Chúng tôi, những thần dân trung thành của Massachusetts, bày tỏ {grievance} sâu sắc của mình về các khoản thuế gần đây. Sự {tyranny} của việc ép buộc chúng tôi phải trả tiền cho một cuộc chiến trong khi từ chối cho chúng tôi quyền đại diện trong {parliament} là bất công. Nếu các người không {repeal} những đạo luật này, chúng tôi sẽ {boycott} hàng hóa của các người và dựa vào {militia} của chính chúng tôi để được bảo vệ.",
      glossary: {
        "grievance": {
          def: "A formal complaint over something believed to be wrong or unfair.",
          vnDef: "Một lời phàn nàn chính thức về một điều gì đó được cho là sai trái hoặc bất công."
        },
        "tyranny": {
          def: "Cruel, unreasonable, or arbitrary use of power.",
          vnDef: "Việc sử dụng quyền lực một cách tàn nhẫn, vô lý hoặc độc đoán."
        },
        "parliament": {
          def: "The legislative (law-making) body of Great Britain.",
          vnDef: "Cơ quan lập pháp (làm luật) của Vương quốc Anh."
        },
        "repeal": {
          def: "To officially cancel or revoke a law.",
          vnDef: "Chính thức hủy bỏ hoặc thu hồi một đạo luật."
        },
        "boycott": {
          def: "A refusal to buy or use goods as a form of protest.",
          vnDef: "Sự từ chối mua hoặc sử dụng hàng hóa như một hình thức phản đối."
        },
        "militia": {
          def: "A military force raised from the civil population.",
          vnDef: "Một lực lượng quân sự được tuyển mộ từ dân sự."
        }
      }
    }
  ],
  questions: [
    {
      id: "q1_dnd_timeline",
      type: "dnd",
      title: "1. Drag the historical events into chronological order from first (Step 1) to last (Step 4).",
      options: [],
      bank: [
        { id: "e1", val: "Tea", text: "Boston Tea Party" },
        { id: "e2", val: "War", text: "French and Indian War" },
        { id: "e3", val: "Massacre", text: "Boston Massacre" },
        { id: "e4", val: "Stamp", text: "Stamp Act Passed" }
      ],
      targets: [
        { id: "step1", title: "First Event (1754-1763)" },
        { id: "step2", title: "Second Event (1765)" },
        { id: "step3", title: "Third Event (1770)" },
        { id: "step4", title: "Fourth Event (1773)" }
      ],
      correctSets: {
        "step1": ["War"],
        "step2": ["Stamp"],
        "step3": ["Massacre"],
        "step4": ["Tea"]
      },
      expEn: "The timeline begins with the **French and Indian War** (1754-1763), which caused the debt. This led to the **Stamp Act** (1765). Tensions rose, leading to the **Boston Massacre** (1770) and finally the **Boston Tea Party** (1773).",
      expVn: "Dòng thời gian bắt đầu với **Chiến tranh Pháp và Người Da đỏ** (1754-1763), nguyên nhân gây ra khoản nợ. Điều này dẫn đến **Đạo luật Tem** (1765). Căng thẳng leo thang, dẫn đến **Thảm sát Boston** (1770) và cuối cùng là **Bữa tiệc Trà Boston** (1773)."
    },
    {
      id: "q2_mcq_regions",
      type: "mcq",
      title: "2. Which colonial region was known as the \"breadbasket\" because its moderate climate was ideal for growing wheat and grains?",
      options: [
        { val: "A", text: "A. The New England Colonies" },
        { val: "B", text: "B. The Middle Colonies" },
        { val: "C", text: "C. The Southern Colonies" },
        { val: "D", text: "D. The Western Colonies" }
      ],
      correct: "B",
      expEn: "The **Middle Colonies** had a moderate climate and fertile soil, making them perfect for growing large amounts of wheat and grains, earning them the nickname \"the breadbasket.\"",
      expVn: "**Các thuộc địa Trung bộ** có khí hậu ôn hòa và đất đai màu mỡ, khiến nơi đây trở nên hoàn hảo để trồng một lượng lớn lúa mì và ngũ cốc, mang lại cho họ biệt danh \"giỏ bánh mì.\""
    },
    {
      id: "q3_inline_mercantilism",
      type: "inline",
      title: "3. Complete the sentences to define the economic system of Mercantilism.",
      options: [],
      textParts: [
        "Under mercantilism, colonies were used to provide cheap ",
        " to Great Britain. In return, the colonists were forced to buy expensive ",
        " back from Britain."
      ],
      blanks: {
        "1": {
          correct: "raw materials",
          options: [
            { val: "manufactured goods", text: "manufactured goods" },
            { val: "raw materials", text: "raw materials" },
            { val: "currency", text: "currency" }
          ]
        },
        "2": {
          correct: "manufactured goods",
          options: [
            { val: "raw materials", text: "raw materials" },
            { val: "manufactured goods", text: "manufactured goods" },
            { val: "slaves", text: "slaves" }
          ]
        }
      },
      expEn: "Mercantilism exploited colonies by taking their **raw materials** (like timber and cotton) at low prices and selling **manufactured goods** (like clothing and tools) back to them at high prices.",
      expVn: "Chủ nghĩa trọng thương bóc lột các thuộc địa bằng cách lấy **nguyên liệu thô** (như gỗ và bông) của họ với giá rẻ và bán lại **hàng hóa sản xuất** (như quần áo và công cụ) cho họ với giá cao."
    },
    {
      id: "q4_mcq_passage_comprehension",
      passageId: "passage_1",
      type: "mcq",
      title: "4. Read the Primary Source passage. What is the author threatening to do if Parliament does NOT cancel the new taxes?",
      options: [
        { val: "A", text: "A. Pay the taxes willingly." },
        { val: "B", text: "B. Move back to Great Britain." },
        { val: "C", text: "C. Boycott British goods and use their militia." },
        { val: "D", text: "D. Elect their own representatives to Parliament." }
      ],
      correct: "C",
      expEn: "The author explicitly states: > \"If you do not repeal these laws, we will boycott your goods and rely on our own militia for protection.\"",
      expVn: "Tác giả tuyên bố rõ ràng: > \"Nếu các người không bãi bỏ những đạo luật này, chúng tôi sẽ tẩy chay hàng hóa của các người và dựa vào lực lượng dân quân của chính chúng tôi để được bảo vệ.\""
    },
    {
      id: "q5_mcq_salutary_neglect",
      type: "mcq",
      title: "5. What was the impact of \"Salutary Neglect\" on the 13 Colonies before the French and Indian War?",
      options: [
        { val: "A", text: "A. It caused the colonies to starve from lack of trade." },
        { val: "B", text: "B. It forced colonists to pay massive taxes to the King." },
        { val: "C", text: "C. It made the colonies completely dependent on French protection." },
        { val: "D", text: "D. It allowed the colonies to develop their own governments and get used to independence." }
      ],
      correct: "D",
      expEn: "During the period of **Salutary Neglect**, Britain largely left the colonies alone. This allowed the colonists to create their own local laws and get used to self-governance.",
      expVn: "Trong thời kỳ **Bỏ mặc Hữu ích**, Anh phần lớn để mặc các thuộc địa. Điều này cho phép những người dân thuộc địa tự tạo ra luật pháp địa phương và làm quen với việc tự quản."
    },
    {
      id: "q6_dnd_match_economies",
      type: "dnd",
      title: "6. Drag the economic characteristic to the colonial region it best describes.",
      options: [],
      bank: [
        { id: "b1", val: "Shipbuilding", text: "Shipbuilding & Fishing" },
        { id: "b2", val: "CashCrops", text: "Cash Crops & Slave Labor" },
        { id: "b3", val: "Wheat", text: "Wheat & Grains" }
      ],
      targets: [
        { id: "t_new_england", title: "New England Colonies" },
        { id: "t_middle", title: "Middle Colonies" },
        { id: "t_southern", title: "Southern Colonies" }
      ],
      correctSets: {
        "t_new_england": ["Shipbuilding"],
        "t_middle": ["Wheat"],
        "t_southern": ["CashCrops"]
      },
      expEn: "Geography dictated the economy: **New England's** rocky soil led to maritime industries. The **Middle colonies** grew grains. The **Southern colonies'** warm climate led to massive plantations requiring slave labor.",
      expVn: "Địa lý quyết định nền kinh tế: Đất đá của **New England** dẫn đến các ngành công nghiệp hàng hải. Các **thuộc địa Trung bộ** trồng ngũ cốc. Khí hậu ấm áp của các **thuộc địa Nam bộ** dẫn đến các đồn điền khổng lồ đòi hỏi lao động nô lệ."
    },
    {
      id: "q7_inline_patriot_loyalist",
      type: "inline",
      title: "7. Select the correct vocabulary term to complete the sentences regarding the divided colonists.",
      options: [],
      textParts: [
        "A ",
        " was a colonist who rejected British rule and wanted independence, while a ",
        " remained faithful to the British Crown."
      ],
      blanks: {
        "1": {
          correct: "Patriot",
          options: [
            { val: "Patriot", text: "Patriot" },
            { val: "Loyalist", text: "Loyalist" }
          ]
        },
        "2": {
          correct: "Loyalist",
          options: [
            { val: "Patriot", text: "Patriot" },
            { val: "Loyalist", text: "Loyalist" }
          ]
        }
      },
      expEn: "**Patriots** rebelled against the King, whereas **Loyalists** stayed loyal to Great Britain.",
      expVn: "**Người yêu nước (Patriot)** nổi loạn chống lại Nhà vua, trong khi **Người trung thành (Loyalist)** vẫn trung thành với Vương quốc Anh."
    },
    {
      id: "q8_mcq_war_debt",
      type: "mcq",
      title: "8. How did the French and Indian War directly lead to the American Revolution?",
      options: [
        { val: "A", text: "A. France took control of the 13 colonies." },
        { val: "B", text: "B. Britain gained a massive war debt and began taxing the colonies to pay for it." },
        { val: "C", text: "C. Native Americans forced the colonists to move back to Europe." },
        { val: "D", text: "D. The colonies declared war on France independently." }
      ],
      correct: "B",
      expEn: "The war was incredibly expensive. To pay off the massive **war debt**, Britain ended Salutary Neglect and started imposing taxes on the colonists, sparking rebellion.",
      expVn: "Cuộc chiến vô cùng tốn kém. Để trả khoản **nợ chiến tranh** khổng lồ, Anh đã chấm dứt Sự Bỏ mặc Hữu ích và bắt đầu áp đặt các khoản thuế đối với người dân thuộc địa, châm ngòi cho cuộc nổi loạn."
    },
    {
      id: "q9_inline_taxation",
      type: "inline",
      title: "9. Complete the famous rallying cry of the American colonists.",
      options: [],
      textParts: [
        "\"No taxation without ",
        "!\""
      ],
      blanks: {
        "1": {
          correct: "representation",
          options: [
            { val: "representation", text: "representation" },
            { val: "tyranny", text: "tyranny" },
            { val: "mercantilism", text: "mercantilism" }
          ]
        }
      },
      expEn: "The colonists believed it was unfair to be taxed by a Parliament where they had no elected representatives. Their slogan was **\"No taxation without representation!\"**",
      expVn: "Những người dân thuộc địa tin rằng thật bất công khi bị đánh thuế bởi một Nghị viện nơi họ không có đại diện được bầu. Khẩu hiệu của họ là **\"Không đóng thuế nếu không có đại diện!\"**"
    },
    {
      id: "q10_mcq_boycott",
      passageId: "passage_1",
      type: "mcq",
      title: "10. In the passage, the author mentions they will \"boycott\" British goods. What does this mean?",
      options: [
        { val: "A", text: "A. They will refuse to buy or use the goods as a form of protest." },
        { val: "B", text: "B. They will steal the goods from ships." },
        { val: "C", text: "C. They will buy twice as many goods." },
        { val: "D", text: "D. They will sell the goods to France." }
      ],
      correct: "A",
      expEn: "A **boycott** is an economic protest where people refuse to buy a specific product. Colonists boycotted British goods to hurt Britain's economy.",
      expVn: "**Tẩy chay** là một cuộc biểu tình kinh tế nơi mọi người từ chối mua một sản phẩm cụ thể. Những người dân thuộc địa đã tẩy chay hàng hóa của Anh để làm tổn hại nền kinh tế Anh."
    },
    {
      id: "q11_mcq_parliament",
      type: "mcq",
      title: "11. The American colonists were angered by taxes passed by Parliament. What is Parliament?",
      options: [
        { val: "A", text: "A. The King's personal court and advisors." },
        { val: "B", text: "B. The colonial government located in America." },
        { val: "C", text: "C. A military force sent to control the colonies." },
        { val: "D", text: "D. The legislative (law-making) body of Great Britain." }
      ],
      correct: "D",
      expEn: "**Parliament** is the legislative branch of the British government responsible for making laws and passing taxes.",
      expVn: "**Nghị viện** là cơ quan lập pháp của chính phủ Anh chịu trách nhiệm làm luật và thông qua các loại thuế."
    },
    {
      id: "q12_mcq_colony",
      type: "mcq",
      title: "12. In historical terms, what is the best definition of a 'colony'?",
      options: [
        { val: "A", text: "A. A territory settled and controlled by people from a distant land." },
        { val: "B", text: "B. An independent nation with its own king and military." },
        { val: "C", text: "C. A native tribe living freely in North America." },
        { val: "D", text: "D. A group of soldiers fighting against a government." }
      ],
      correct: "A",
      expEn: "A **colony** is a settlement established in a new territory by people who keep their ties to their home country, which controls them.",
      expVn: "**Thuộc địa** là một khu định cư được thành lập ở một vùng lãnh thổ mới bởi những người vẫn giữ mối quan hệ với quê hương của họ, nơi kiểm soát họ."
    },
    {
      id: "q13_inline_vocab_grievance",
      type: "inline",
      title: "13. Complete the sentence using the correct historical vocabulary.",
      options: [],
      textParts: [
        "When the colonists felt the British government was acting unfairly, they filed a formal ",
        " to express their anger. They accused the King of ",
        ", which is the cruel and unreasonable use of power."
      ],
      blanks: {
        "1": {
          correct: "grievance",
          options: [
            { val: "boycott", text: "boycott" },
            { val: "grievance", text: "grievance" }
          ]
        },
        "2": {
          correct: "tyranny",
          options: [
            { val: "tyranny", text: "tyranny" },
            { val: "mercantilism", text: "mercantilism" }
          ]
        }
      },
      expEn: "A **grievance** is a formal complaint about unfair treatment. **Tyranny** refers to an abusive and cruel use of government power.",
      expVn: "**Khiếu nại** là một lời phàn nàn chính thức về sự đối xử bất công. **Sự bạo ngược** ám chỉ việc sử dụng quyền lực chính phủ một cách lạm dụng và tàn nhẫn."
    },
    {
      id: "q14_mcq_repeal",
      type: "mcq",
      title: "14. The colonists protested the Stamp Act until the British government decided to 'repeal' it. What does it mean to repeal a law?",
      options: [
        { val: "A", text: "A. To enforce it using the military." },
        { val: "B", text: "B. To officially cancel or revoke it." },
        { val: "C", text: "C. To double the penalty for breaking it." },
        { val: "D", text: "D. To expand it to other colonies." }
      ],
      correct: "B",
      expEn: "To **repeal** means to officially take back or cancel a law. Britain repealed the Stamp Act because the colonial boycotts were hurting their economy.",
      expVn: "**Bãi bỏ** có nghĩa là chính thức thu hồi hoặc hủy bỏ một đạo luật. Anh đã bãi bỏ Đạo luật Tem vì các cuộc tẩy chay của thuộc địa đang làm tổn hại đến nền kinh tế của họ."
    },
    {
      id: "q15_dnd_vocab_people",
      type: "dnd",
      title: "15. Match the vocabulary words to their correct historical definitions.",
      options: [],
      bank: [
        { id: "v1", val: "Militia", text: "Militia" },
        { id: "v2", val: "Patriot", text: "Patriot" },
        { id: "v3", val: "Loyalist", text: "Loyalist" }
      ],
      targets: [
        { id: "t_patriot", title: "A colonist who wanted independence." },
        { id: "t_loyalist", title: "A colonist who supported the British King." },
        { id: "t_militia", title: "A military force made of ordinary citizens." }
      ],
      correctSets: {
        "t_patriot": ["Patriot"],
        "t_loyalist": ["Loyalist"],
        "t_militia": ["Militia"]
      },
      expEn: "**Patriots** rebelled, **Loyalists** stayed loyal to Britain, and **Militias** were civilian armies formed to protect local towns.",
      expVn: "**Người Yêu nước** nổi loạn, **Người Trung thành** vẫn trung thành với Anh, và **Dân quân** là quân đội dân sự được thành lập để bảo vệ các thị trấn địa phương."
    },
    {
      id: "q16_mcq_new_england",
      type: "mcq",
      title: "16. Why did the New England colonies rely heavily on shipbuilding and fishing instead of large-scale farming?",
      options: [
        { val: "A", text: "A. The King outlawed farming in New England." },
        { val: "B", text: "B. They wanted to trade exclusively with Native Americans." },
        { val: "C", text: "C. The climate was cold and the soil was extremely rocky." },
        { val: "D", text: "D. They did not have the tools required for agriculture." }
      ],
      correct: "C",
      expEn: "Because the **climate was cold and the soil was rocky**, large-scale farming was impossible. Instead, New England used its vast forests and ocean access to build ships and fish.",
      expVn: "Bởi vì **khí hậu lạnh và đất đai nhiều sỏi đá**, việc canh tác quy mô lớn là không thể. Thay vào đó, New England sử dụng những khu rừng rộng lớn và đường bờ biển để đóng tàu và đánh bắt cá."
    },
    {
      id: "q17_inline_economies",
      type: "inline",
      title: "17. Compare the economies of the Middle and Southern colonies.",
      options: [],
      textParts: [
        "The Middle colonies had a moderate climate and were heavily focused on growing ",
        ". The Southern colonies had a warm climate and relied on enslaved labor to grow ",
        "."
      ],
      blanks: {
        "1": {
          correct: "wheat and grains",
          options: [
            { val: "cash crops", text: "cash crops" },
            { val: "wheat and grains", text: "wheat and grains" }
          ]
        },
        "2": {
          correct: "cash crops",
          options: [
            { val: "cash crops", text: "cash crops" },
            { val: "wheat and grains", text: "wheat and grains" }
          ]
        }
      },
      expEn: "The Middle Colonies grew food staples like **wheat and grains**. The Southern Colonies focused on highly profitable **cash crops** like tobacco and indigo.",
      expVn: "Các thuộc địa Trung bộ trồng các loại thực phẩm thiết yếu như **lúa mì và ngũ cốc**. Các thuộc địa Nam bộ tập trung vào các loại **cây công nghiệp** mang lại lợi nhuận cao như thuốc lá và chàm."
    },
    {
      id: "q18_mcq_boston_massacre",
      type: "mcq",
      title: "18. What event in 1770 resulted in British soldiers firing into a crowd of protesting colonists, deeply escalating tensions?",
      options: [
        { val: "A", text: "A. The Boston Tea Party" },
        { val: "B", text: "B. The French and Indian War" },
        { val: "C", text: "C. The Stamp Act Rebellion" },
        { val: "D", text: "D. The Boston Massacre" }
      ],
      correct: "D",
      expEn: "The **Boston Massacre** occurred when an angry mob of colonists confronted British soldiers, leading the soldiers to fire into the crowd and kill five people.",
      expVn: "**Thảm sát Boston** xảy ra khi một đám đông người dân thuộc địa giận dữ đối đầu với binh lính Anh, dẫn đến việc binh lính nổ súng vào đám đông và giết chết năm người."
    },
    {
      id: "q19_mcq_boston_tea",
      type: "mcq",
      title: "19. How did colonists in Massachusetts protest the new Tea Act in 1773?",
      options: [
        { val: "A", text: "A. They wrote a polite letter of grievance to the King." },
        { val: "B", text: "B. They boycotted all British clothing." },
        { val: "C", text: "C. They dumped 342 chests of British tea into the harbor." },
        { val: "D", text: "D. They attacked the British Parliament building in London." }
      ],
      correct: "C",
      expEn: "During the **Boston Tea Party**, members of the Sons of Liberty disguised themselves and dumped the heavily taxed tea into the harbor to protest British trade laws.",
      expVn: "Trong **Bữa tiệc Trà Boston**, các thành viên của Hội Con trai Tự do đã cải trang và đổ lượng trà bị đánh thuế nặng xuống bến cảng để phản đối luật thương mại của Anh."
    },
    {
      id: "q20_dnd_cause_effect",
      type: "dnd",
      title: "20. Match the historical cause on the left to its direct effect on the right.",
      options: [],
      bank: [
        { id: "ce1", val: "Debt", text: "Huge War Debt" },
        { id: "ce2", val: "NoRep", text: "No Representation" },
        { id: "ce3", val: "TeaParty", text: "Boston Tea Party" }
      ],
      targets: [
        { id: "t_cause1", title: "Britain ends Salutary Neglect and passes taxes" },
        { id: "t_cause2", title: "Colonists claim the taxes are unfair \"tyranny\"" },
        { id: "t_cause3", title: "Britain passes harsh laws to punish Massachusetts" }
      ],
      correctSets: {
        "t_cause1": ["Debt"],
        "t_cause2": ["NoRep"],
        "t_cause3": ["TeaParty"]
      },
      expEn: "**War Debt** caused Britain to tax the colonies. Having **No Representation** caused colonists to view those taxes as tyranny. The **Boston Tea Party** caused Britain to aggressively punish the colonies.",
      expVn: "**Nợ Chiến tranh** khiến Anh phải đánh thuế các thuộc địa. Việc **Không có Đại diện** khiến người dân thuộc địa coi những khoản thuế đó là sự bạo ngược. **Bữa tiệc Trà Boston** khiến Anh trừng phạt các thuộc địa một cách hung hăng."
    }
  ]
};