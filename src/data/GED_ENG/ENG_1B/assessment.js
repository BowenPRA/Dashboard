// src/data/GED/ENG_1B/assessment.js
export const assessment = {
  timeLimit: 3000, // 50 minutes
  passages: [
    {
      id: "p1_anthony",
      title: "On Women's Right to Vote",
      meta: "Historical Speech: Susan B. Anthony, 1873",
      text: [
        "Friends and fellow citizens: I stand before you tonight under indictment for the alleged crime of having voted at the last presidential election, without having a lawful right to vote. It shall be my work this evening to prove to you that in thus voting, I not only committed no crime, but, instead, simply exercised my citizen's rights, guaranteed to me and all United States citizens by the National Constitution, beyond the power of any state to deny.",
        "The preamble of the Federal Constitution says: 'We, the people of the United States, in order to form a more perfect union, establish justice, insure domestic tranquility, provide for the common defense, promote the general welfare, and secure the blessings of liberty to ourselves and our posterity, do ordain and establish this Constitution for the United States of America.'",
        "It was we, the people; not we, the white male citizens; nor yet we, the male citizens; but we, the whole people, who formed the Union. And we formed it, not to give the blessings of liberty, but to secure them; not to the half of ourselves and the half of our posterity, but to the whole people—women as well as men. And it is a downright mockery to talk to women of their enjoyment of the blessings of liberty while they are denied the use of the only means of securing them provided by this democratic-republican government—the ballot."
      ],
      glossary: {
        "indictment": { "def": "A formal charge or accusation of a serious crime.", "vn": "Sự buộc tội", "vnDef": "Một lời buộc tội hoặc cáo buộc chính thức về một tội ác nghiêm trọng." },
        "posterity": { "def": "All future generations of people.", "vn": "Hậu thế", "vnDef": "Tất cả các thế hệ tương lai của con người." },
        "mockery": { "def": "Teasing and contemptuous language or behavior directed at a particular person or thing.", "vn": "Sự nhạo báng", "vnDef": "Ngôn ngữ hoặc hành vi trêu chọc và khinh miệt nhắm vào một người hoặc vật cụ thể." }
      }
    },
    {
      id: "p2_carnegie",
      title: "The Gospel of Wealth",
      meta: "Historical Essay: Andrew Carnegie, 1889",
      text: [
        "The problem of our age is the proper administration of wealth, so that the ties of brotherhood may still bind together the rich and poor in harmonious relationship. The conditions of human life have not only been changed, but revolutionized, within the past few hundred years. In former days there was little difference between the dwelling, dress, food, and environment of the chief and those of his retainers.",
        "The contrast between the palace of the millionaire and the cottage of the laborer with us today measures the change which has come with civilization. This change, however, is not to be deplored, but welcomed as highly beneficial. It is well, nay, essential for the progress of the race, that the houses of some should be homes for all that is highest and best in literature and the arts, and for all the refinements of civilization, rather than that none should be so. Much better this great irregularity than universal squalor.",
        "We accept and welcome, therefore, as conditions to which we must accommodate ourselves, great inequality of environment, the concentration of business, industrial and commercial, in the hands of a few, and the law of competition between these, as being not only beneficial, but essential for the future progress of the race."
      ],
      glossary: {
        "retainers": { "def": "Servants or followers of a noble or wealthy person.", "vn": "Người hầu", "vnDef": "Người hầu hoặc người đi theo một người quý tộc hoặc giàu có." },
        "deplored": { "def": "Feel or express strong disapproval of something.", "vn": "Thương tâm / Phản đối", "vnDef": "Cảm thấy hoặc bày tỏ sự phản đối mạnh mẽ về một điều gì đó." },
        "squalor": { "def": "The state of being extremely dirty and unpleasant, especially as a result of poverty.", "vn": "Sự bẩn thỉu / Nghèo khổ", "vnDef": "Tình trạng vô cùng bẩn thỉu và khó chịu, đặc biệt là do nghèo đói." }
      }
    },
    {
      id: "p3_carson",
      title: "Silent Spring",
      meta: "Informational Science Commentary: Rachel Carson, 1962",
      text: [
        "There was once a town in the heart of America where all life seemed to live in harmony with its surroundings. The town lay in the midst of a checkerboard of prosperous farms, with fields of grain and hillsides of orchards, where, in spring, white clouds of bloom drifted above the green fields. In autumn, oak and maple and birch set up a blaze of color that flamed and flickered across a backdrop of pines. Then foxes barked in the hills and deer silently crossed the fields, half hidden in the mists of the fall mornings.",
        "Then a strange blight crept over the area and everything began to change. Some evil spell had settled on the community: mysterious maladies swept the flocks of chickens; the cattle and sheep sickened and died. Everywhere was a shadow of death. The farmers spoke of much illness among their families. In the town the doctors had become more and more puzzled by new kinds of sickness appearing among their patients.",
        "No witchcraft, no enemy action had silenced the rebirth of new life in this stricken world. The people had done it themselves. This town does not actually exist, but it might easily have a thousand counterparts in America or elsewhere in the world. I know of no community that has experienced all the misfortunes I describe. Yet every one of these disasters has actually happened somewhere, and many real communities have already suffered a substantial number of them."
      ],
      glossary: {
        "blight": { "def": "A plant disease, typically one caused by fungi such as mildews, rusts, and smuts; a thing that spoils or damages something.", "vn": "Tai họa / Bệnh thối rữa", "vnDef": "Một căn bệnh ở thực vật, hoặc một thứ làm hỏng hoặc tàn phá điều gì đó." },
        "maladies": { "def": "Diseases or ailments.", "vn": "Căn bệnh", "vnDef": "Bệnh tật hoặc ốm đau." },
        "counterparts": { "def": "A person or thing holding a position or performing a function that corresponds to that of another person or thing in another place.", "vn": "Bản sao / Đối tác", "vnDef": "Một người hoặc vật giữ một vị trí hoặc thực hiện một chức năng tương ứng với một người hoặc vật khác ở một nơi khác." }
      }
    }
  ],
  questions: [
    // PASSAGE 1: ANTHONY
    {
      id: "q1_anthony_mcq",
      passageId: "p1_anthony",
      type: "mcq",
      title: "1. What is the primary function of the dependent clauses in Anthony's opening sentence?",
      options: [
        { val: "A", text: "A. To distract the audience from the fact that she committed a crime." },
        { val: "B", text: "B. To explicitly outline the legal context and specific nature of her indictment." },
        { val: "C", text: "C. To apologize to the audience for voting illegally in the presidential election." },
        { val: "D", text: "D. To juxtapose her actions with the actions of white male citizens." }
      ],
      correct: "B",
      expEn: "Anthony uses subordination ('under indictment for the alleged crime...') to establish the precise legal context of her situation before transitioning to her main independent claim.",
      expVn: "Anthony sử dụng cấu trúc phụ thuộc ('dưới sự buộc tội vì tội danh bị cáo buộc...') để thiết lập bối cảnh pháp lý chính xác cho tình huống của cô ấy trước khi chuyển sang luận điểm độc lập chính."
    },
    {
      id: "q2_anthony_inline",
      passageId: "p1_anthony",
      type: "inline",
      title: "2. Syntax & Clauses: Fix the structural error in the sentence below by selecting the correct transition.",
      options: [],
      textParts: [
        "Susan B. Anthony argued passionately for her constitutional rights",
        " many lawmakers completely dismissed her claims because of her gender."
      ],
      blanks: {
        "1": {
          correct: "semi_however",
          options: [
            { val: "comma_however", text: ", however," },
            { val: "semi_however", text: "; however," },
            { val: "although", text: "although" }
          ]
        }
      },
      expEn: "This sentence contains two independent clauses. Using a comma before 'however' creates a comma splice run-on. You must use a semicolon to join two independent clauses with a conjunctive adverb.",
      expVn: "Câu này chứa hai mệnh đề độc lập. Sử dụng dấu phẩy trước 'however' tạo ra lỗi sai cú pháp (comma splice). Bạn phải sử dụng dấu chấm phẩy để nối hai mệnh đề độc lập bằng một phó từ liên kết."
    },
    {
      id: "q3_anthony_mcq",
      passageId: "p1_anthony",
      type: "mcq",
      title: "3. What logical inference can be made about Anthony's view of the Constitution based on the final paragraph?",
      options: [
        { val: "A", text: "A. She believes it needs to be completely rewritten by women." },
        { val: "B", text: "B. She believes it already grants women the right to vote; the government is simply violating it." },
        { val: "C", text: "C. She believes it is a flawed document because it only mentions white males." },
        { val: "D", text: "D. She believes it applies only to the people who originally signed it." }
      ],
      correct: "B",
      expEn: "Anthony states, 'It was we, the people... who formed the Union.' Her argument is not that the Constitution needs changing, but that women are already 'the people' and are therefore already guaranteed the ballot.",
      expVn: "Anthony nói, 'Đó là chúng ta, những người dân... đã thành lập nên Liên bang.' Lập luận của bà không phải là Hiến pháp cần thay đổi, mà là phụ nữ vốn đã là 'người dân' và do đó đã được đảm bảo quyền bầu cử."
    },

    // PASSAGE 2: CARNEGIE
    {
      id: "q4_carnegie_mcq",
      passageId: "p2_carnegie",
      type: "mcq",
      title: "4. How does Carnegie use juxtaposition in the second paragraph?",
      options: [
        { val: "A", text: "A. By comparing the 'palace of the millionaire' to the 'cottage of the laborer' to highlight economic changes." },
        { val: "B", text: "B. By placing literature and the arts side-by-side with modern science." },
        { val: "C", text: "C. By showing the similarities between a Native American chief and a modern factory worker." },
        { val: "D", text: "D. By contrasting the law of competition with the concept of brotherhood." }
      ],
      correct: "A",
      expEn: "Carnegie juxtaposes the immense wealth of the millionaire's palace with the modest cottage of the laborer to visually emphasize the massive economic shift caused by civilization.",
      expVn: "Carnegie đặt cạnh nhau sự giàu có khổng lồ của cung điện triệu phú với ngôi nhà tranh khiêm tốn của người lao động để nhấn mạnh bằng hình ảnh sự thay đổi kinh tế to lớn do nền văn minh mang lại."
    },
    {
      id: "q5_carnegie_inline",
      passageId: "p2_carnegie",
      type: "inline",
      title: "5. Subordination Strategy: Select the correct subordinating conjunction to establish a logical concession.",
      options: [],
      textParts: [
        "",
        " the industrial revolution vastly increased the availability of cheap goods, it simultaneously widened the socio-economic gap between factory owners and laborers."
      ],
      blanks: {
        "1": {
          correct: "while",
          options: [
            { val: "furthermore", text: "Furthermore," },
            { val: "because", text: "Because" },
            { val: "while", text: "While" }
          ]
        }
      },
      expEn: "'While' establishes a concession and creates a complex sentence where the first clause (the benefit of cheap goods) is subordinated to the main idea (the widening wealth gap).",
      expVn: "'While' (Mặc dù/Trong khi) thiết lập một sự nhượng bộ và tạo ra một câu phức, trong đó mệnh đề đầu tiên (lợi ích của hàng hóa rẻ) phụ thuộc vào ý chính (khoảng cách giàu nghèo ngày càng gia tăng)."
    },
    {
      id: "q6_carnegie_dnd",
      passageId: "p2_carnegie",
      type: "dnd",
      title: "6. Drag and drop to map Carnegie's rhetorical structure in the final paragraph.",
      options: [],
      bank: [
        { val: "A", text: "Inequality is highly beneficial and essential for progress." },
        { val: "B", text: "There is a great inequality of environment today." },
        { val: "C", text: "The law of competition controls business." }
      ],
      targets: [
        { id: "concession", title: "Concession (Acknowledging the Reality)" },
        { id: "primary", title: "Primary Claim (The Author's Defense)" }
      ],
      correctSets: {
        "concession": ["B", "C"],
        "primary": ["A"]
      },
      expEn: "Carnegie concedes the reality that massive inequality and harsh business competition exist (B & C). However, his primary claim—his ultimate defense—is that these conditions are actually beneficial for human progress (A).",
      expVn: "Carnegie thừa nhận thực tế rằng sự bất bình đẳng lớn và cạnh tranh kinh doanh khốc liệt đang tồn tại (B & C). Tuy nhiên, luận điểm chính của ông—lời biện hộ cuối cùng—là những điều kiện này thực sự có lợi cho sự tiến bộ của con người (A)."
    },

    // PASSAGE 3: CARSON
    {
      id: "q7_carson_mcq",
      passageId: "p3_carson",
      type: "mcq",
      title: "7. How does the tone shift between the first and second paragraphs?",
      options: [
        { val: "A", text: "A. From objective to highly subjective and emotional." },
        { val: "B", text: "B. From peaceful and pastoral to ominous and tragic." },
        { val: "C", text: "C. From scientific and data-driven to fictional and imaginative." },
        { val: "D", text: "D. From angry and demanding to passive and accepting." }
      ],
      correct: "B",
      expEn: "The first paragraph describes a beautiful, harmonious natural world ('white clouds of bloom'). The second paragraph abruptly shifts to a dark, ominous tone ('strange blight', 'shadow of death').",
      expVn: "Đoạn đầu tiên mô tả một thế giới tự nhiên tươi đẹp, hài hòa ('những đám mây hoa trắng'). Đoạn thứ hai đột ngột chuyển sang một giọng điệu đen tối, đáng ngại ('tai họa kỳ lạ', 'bóng đen của cái chết')."
    },
    {
      id: "q8_carson_inline",
      passageId: "p3_carson",
      type: "inline",
      title: "8. Eliminating Ambiguity: Fix the dangling modifier to make the syntax logically sound.",
      options: [],
      textParts: [
        "While examining environmental degradation caused by chemical pesticides, ",
        "."
      ],
      blanks: {
        "1": {
          correct: "carson_wrote",
          options: [
            { val: "book_written", text: "the book Silent Spring was written by Rachel Carson" },
            { val: "carson_wrote", text: "Rachel Carson wrote Silent Spring" },
            { val: "warning_issued", text: "a warning was issued to the general public" }
          ]
        }
      },
      expEn: "A dependent clause starting with 'While examining...' must be immediately followed by the person who is doing the examining. Rachel Carson is the one examining, so she must be the subject of the independent clause.",
      expVn: "Một mệnh đề phụ thuộc bắt đầu bằng 'Trong khi kiểm tra...' phải được theo sau ngay lập tức bởi người đang thực hiện việc kiểm tra. Rachel Carson là người kiểm tra, vì vậy cô ấy phải là chủ ngữ của mệnh đề độc lập."
    },
    {
      id: "q9_carson_mcq",
      passageId: "p3_carson",
      type: "mcq",
      title: "9. In the final paragraph, Carson admits that 'This town does not actually exist.' Why is this synthesis of real events an effective rhetorical strategy?",
      options: [
        { val: "A", text: "A. It proves that pesticides only affect imaginary places, reducing panic." },
        { val: "B", text: "B. It prevents specific towns from suing her for defamation." },
        { val: "C", text: "C. It allows her to compile various real-world consequences into one powerful, universal narrative." },
        { val: "D", text: "D. It demonstrates that her entire argument is fictional and meant to entertain." }
      ],
      correct: "C",
      expEn: "Carson synthesizes multiple real-world disasters into a single narrative to show the cumulative, universal threat of pesticides, making the danger feel immediate to every reader.",
      expVn: "Carson tổng hợp nhiều thảm họa trong thế giới thực thành một câu chuyện duy nhất để cho thấy mối đe dọa chung, tích lũy của thuốc trừ sâu, khiến sự nguy hiểm trở nên cấp bách đối với mọi độc giả."
    },
    
    // MIXED REVIEW / SYNTAX REINFORCEMENT
    {
      id: "q10_mixed_mcq",
      passageId: "p3_carson", // Tied loosely to passage 3's context but testing general 1B concept
      type: "mcq",
      title: "10. Read the following sentence: 'The birds, which once sang in the morning, were suddenly silent.' What role does the clause 'which once sang in the morning' play?",
      options: [
        { val: "A", text: "A. It is an independent clause containing the main idea." },
        { val: "B", text: "B. It is a dependent clause serving as a transition." },
        { val: "C", text: "C. It is a dependent clause that modifies the subject 'birds'." },
        { val: "D", text: "D. It is a run-on sentence that creates ambiguity." }
      ],
      correct: "C",
      expEn: "The clause 'which once sang in the morning' cannot stand alone as a sentence. It is a dependent relative clause that gives the reader more descriptive information about the noun 'birds'.",
      expVn: "Mệnh đề 'which once sang in the morning' không thể đứng riêng lẻ như một câu. Nó là một mệnh đề quan hệ phụ thuộc cung cấp cho người đọc thêm thông tin mô tả về danh từ 'birds' (những con chim)."
    }
  ]
};