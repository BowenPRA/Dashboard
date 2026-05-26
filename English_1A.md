This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/tasks/Notes, src/tasks/Assessment.jsx, src/tasks/Dictation.jsx, src/data/GED/ENG_1A/**, src/hooks/useStudentProgress.js
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/data/GED/ENG_1A/assessment.js
src/data/GED/ENG_1A/data.js
src/data/GED/ENG_1A/games.js
src/data/GED/ENG_1A/notes.js
src/data/GED/ENG_1A/workbook.js
src/hooks/useStudentProgress.js
src/tasks/Assessment.jsx
src/tasks/Dictation.jsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/data/GED/ENG_1A/assessment.js">
// src/data/GED/ENG_1A/assessment.js
export const assessment = {
  timeLimit: 2700, 
  passages: [
    {
      id: "p1_gardens",
      title: "The Case for Community Gardens",
      meta: "Editorial: City Planning Board Review",
      text: [
        "A community garden is a shared space where people come together to grow food and plants. This is an indisputable fact. Currently, the Riverton City Council is debating whether to turn the empty lot on 4th Street into a community garden or a commercial shopping mall. While some argue that commercial development brings immediate tax revenue, building a shopping mall on our last remaining green space is incredibly shortsighted.",
        "The primary purpose of our town should be to foster a healthy, connected community, not just generate cold, hard cash. Numerous academic studies have shown that access to green spaces significantly reduces neighborhood stress levels and lowers local crime rates. Therefore, the claim that we must build a mall to improve our town's quality of life is completely false. We need the garden to ensure a better future for our children."
      ],
      glossary: {
        "fact": { "def": "A statement that can be proven true or false.", "vn": "Sự thật", "vnDef": "Một tuyên bố có thể được chứng minh là đúng hay sai." },
        "purpose": { "def": "The reason an author writes or an action is done.", "vn": "Mục đích", "vnDef": "Lý do tác giả viết hoặc một hành động được thực hiện." },
        "claim": { "def": "The main argument a writer is trying to defend.", "vn": "Luận điểm", "vnDef": "Lập luận chính mà người viết đang cố gắng bảo vệ." }
      }
    },
    {
      id: "p_hist_1898",
      title: "Historical Opinion: The Eight-Hour Workday",
      meta: "Adapted from an 1898 address by labor leader Unionist Thomas O'Donnell",
      text: [
        "For decades, the American industrial worker has been treated as little more than an extension of the iron machinery he operates. We hear from the captains of industry that to shorten the workday from twelve hours to eight would invite economic ruin, decrease national productivity, and encourage idleness among the working classes. I stand before you today to argue that this claim is not only false, but it also ignores the fundamental laws of human nature and economic progress.",
        "First, let us examine the argument of productivity. A exhausted man is not an efficient man. When a laborer is forced to toil for twelve hours in a dark, poorly ventilated factory, his physical strength wanes long before his shift concludes. The work performed in the final four hours of a twelve-hour day is marked by fatigue, leading to frequent errors, ruined materials, and tragic, preventable workplace accidents. By limiting the workday to eight hours, we restore the worker’s vitality. A rested worker is alert, precise, and highly motivated. Historical evidence from factories that have voluntarily adopted the eight-hour standard reveals that total daily output does not decrease; rather, it often increases due to the heightened efficiency and focus of the workforce.",
        "Second, we must consider the moral and social dimensions of this issue. Opponents of our movement argue that additional leisure hours will lead workers to vice and degradation. What a cynical view of the American citizen! When a man is worked to the point of utter exhaustion, he has no time or energy remaining to cultivate his mind, care for his children, or participate in the civic life of his community. He is reduced to a state of mere survival. Give the worker eight hours for work, eight hours for rest, and eight hours for what he wills. With those eight hours of personal time, the worker will seek education, enjoy his family, and become a more informed, responsible participant in our democracy.",
        "The wealth of our nation should not be measured solely by the bank accounts of our monopolists, but by the health, intelligence, and dignity of our producing classes. The eight-hour day is not a plea for charity; it is a demand for justice and a necessary step toward a stronger, more prosperous republic."
      ]
    },
    {
      id: "p_handwriting",
      title: "The Decline of Handwriting",
      meta: "Contemporary Opinion Piece",
      text: [
        "In an era dominated by touchscreens and voice-to-text technology, the traditional art of handwriting is quietly facing extinction. Across the nation, school districts are dropping cursive from their mandatory curricula, and keyboard proficiency has taken center stage. While efficiency advocates celebrate this shift as a victory for modernization, we are sacrificing a profound cognitive tool in our rush to embrace the digital future.",
        "The primary argument for abandoning handwriting is speed. Proponents of digital-first education argue that typing allows students to capture information much faster than writing by hand ever could. This is undoubtedly true, but it confuses transcription with comprehension. When students type lecture notes on a laptop, they tend to record the speaker's words verbatim without processing their meaning. The laptop becomes a recording device, bypassing the brain.",
        "In contrast, writing by hand is a slower, more deliberate process. Because we cannot write as fast as someone speaks, our brains are forced to summarize, synthesize, and prioritize information in real-time. We must actively decide what is important enough to commit to paper. Neurological studies have consistently shown that the physical act of forming letters activates unique neural pathways linked to memory retention and critical thinking. Students who take notes by hand demonstrate a significantly deeper conceptual understanding of the material than those who type.",
        "Furthermore, handwriting is a deeply personal expression of identity. A typed font is uniform, sterile, and anonymous; it carries no trace of the writer’s physical presence or emotional state. A handwritten letter, however, possesses a unique signature style, capturing a moment in time and a physical connection between sender and receiver.",
        "By relegating handwriting to a relic of history, we are not just changing our medium of communication—we are weakening our cognitive capacities and sanitizing our personal interactions. Efficiency should not be the sole metric of educational progress. We must ensure that our classrooms continue to make space for the pen, even in a world ruled by the keyboard."
      ]
    },
    {
      id: "p_videogames",
      title: "The Educational Value of Video Games",
      meta: "Contemporary Opinion Article",
      text: [
        "For decades, the public narrative surrounding video games has been overwhelmingly negative. Critics routinely accuse them of encouraging violence, promoting social isolation, and rotting the brains of youth. However, this reactionary stance ignores a growing body of scientific research and educational theory. Far from being a mindless distraction, video games are actually one of the most powerful and effective tools we have for developing complex, 21st-century cognitive skills.",
        "To understand why video games are beneficial, one must compare them to more passive forms of media, such as television or film. When a child watches a movie, they are a consumer of a pre-determined story. They sit back, observe, and accept the narrative. When a child plays a video game, however, they are an active agent. The game does not progress unless the player makes decisions, solves puzzles, and reacts to changing circumstances.",
        "Most modern video games are, at their core, complex exercises in systemic problem-solving. In strategy and role-playing games, players must manage scarce resources, anticipate long-term consequences of their choices, and adapt to unpredictable environments. When a player fails to complete a level, they do not simply quit; they analyze what went wrong, formulate a new hypothesis, and try again. This iterative cycle of trial, failure, and adaptation is the exact foundation of the scientific method.",
        "Additionally, the rise of multiplayer online games has transformed gaming into a highly collaborative, social activity. To succeed in cooperative games, players must communicate effectively, delegate tasks based on individual strengths, and negotiate conflicts under pressure. These are the precise 'soft skills' that modern employers desperately seek in the workplace.",
        "While moderation is certainly necessary—as it is with any activity—the outright demonization of video games is outdated and counterproductive. Instead of treating gaming as an enemy of education, parents and educators should learn to leverage its interactive power to prepare youth for a highly complex, digital world."
      ]
    },
    {
      id: "p_fiction_marcus",
      title: "Starting Over",
      meta: "Literary Narrative (Fiction)",
      text: [
        "The fluorescent lights of the community college hallway hummed with a low, persistent buzz that matched the anxious vibration in Marcus’s chest. At thirty-five, he felt like a giant occupying a world built for people ten years younger. He adjusted the strap of his backpack, which felt ridiculously heavy, stuffed with a pristine college algebra textbook and a brand-new spiral notebook.",
        "Twelve years ago, Marcus had walked away from a half-finished degree to support his family, taking a job at the local packaging plant. For a decade, the rhythm of the assembly line had been his life—predictable, physical, and secure. But when the plant automated its main line last winter, Marcus found himself staring at a severance package and an uncertain future. He had made a choice: it was time to finish what he started and pivot to computer science.",
        "Now, standing outside Room 204 for his first programming lab, doubt crept in like a cold draft. Through the door's glass pane, he saw clusters of students laughing, their fingers flying across smartphone screens with effortless ease. They looked like natives of this digital landscape; Marcus felt like an explorer who had lost his map.",
        "\"First day jitters?\"",
        "Marcus turned to see an older woman with a kind face and a silver streak in her dark hair. She was carrying a worn laptop bag.",
        "\"Is it that obvious?\" Marcus managed a weak smile.",
        "\"I’ve taught this class for fifteen years, Marcus—it's Marcus, right?\" she asked, glancing at her roster. He nodded. \"The career changers always stand outside the door the longest. I'm Professor Vance.\"",
        "\"I just feel like I'm starting a mile behind everyone else in there,\" Marcus admitted, gesturing toward the younger students. \"They grew up with these machines.\"",
        "Professor Vance smiled, her eyes crinkling. \"They grew up using them, yes. But that doesn't mean they know how they work. Coding isn't about how fast you can type or how many apps you use. It’s about logic, patience, and solving puzzles. If you can survive a decade of troubleshooting mechanical errors on a factory floor, you have exactly the kind of grit this class requires. Don't underestimate the value of your mileage.\"",
        "She gave him a reassuring pat on the shoulder and opened the door. Marcus took a deep breath, letting her words sink in. He looked down at his calloused hands—hands that knew how to fix things, hands that knew how to work hard. He walked into the classroom and took a seat right in the front row."
      ]
    }
  ],
  questions: [
    {
      id: "q1_gardens_mcq",
      passageId: "p1_gardens",
      type: "mcq",
      title: "1. What is the author's primary purpose in writing this editorial?",
      options: [
        { val: "A", text: "A. To inform residents about how to grow their own food." },
        { val: "B", text: "B. To persuade the City Council to choose the community garden over the shopping mall." },
        { val: "C", text: "C. To entertain readers with a story about an empty lot." },
        { val: "D", text: "D. To explain the financial benefits of commercial development." }
      ],
      correct: "B",
      expEn: "The author uses persuasive language ('incredibly shortsighted', 'completely false') to convince the reader and the council that building a garden is better than building a mall.",
      expVn: "Tác giả sử dụng ngôn ngữ mang tính thuyết phục ('tầm nhìn vô cùng hạn hẹp', 'hoàn toàn sai lầm') để thuyết phục người đọc và hội đồng rằng việc xây dựng một khu vườn tốt hơn so với xây dựng một trung tâm mua sắm."
    },
    {
      id: "q2_gardens_dnd",
      passageId: "p1_gardens",
      type: "dnd",
      title: "2. Drag and drop the statements from the text into the correct categories (Fact vs. Opinion).",
      options: [],
      bank: [
        { val: "A", text: "A community garden is a shared space to grow food." },
        { val: "B", text: "Building a shopping mall is incredibly shortsighted." },
        { val: "C", text: "The primary purpose of our town should be to foster a connected community." },
        { val: "D", text: "Studies show green spaces reduce stress and crime rates." }
      ],
      targets: [
        { id: "facts", title: "Objective Facts (Can be proven)" },
        { id: "opinions", title: "Personal Opinions (Beliefs or judgments)" }
      ],
      correctSets: {
        "facts": ["A", "D"],
        "opinions": ["B", "C"]
      },
      expEn: "Options A and D are facts because they can be objectively proven via definitions and studies. Options B and C are opinions because they rely on the author's personal values and judgments.",
      expVn: "Lựa chọn A và D là sự thật vì chúng có thể được chứng minh khách quan thông qua các định nghĩa và nghiên cứu. Lựa chọn B và C là ý kiến cá nhân vì chúng dựa trên những giá trị và phán xét cá nhân của tác giả."
    },
    {
      id: "q3_gardens_inline",
      passageId: "p1_gardens",
      type: "inline",
      title: "3. Grammar & Logic: Select the correct rhetorical terms to complete the analysis of the text.",
      options: [],
      textParts: [
        "In the editorial, the author's main ",
        " is that the town must build a community garden instead of a mall. To back up this argument, the author provides clear ",
        " by referencing academic studies about stress and crime rates. Finally, the author's overall ",
        " is highly critical of the commercial development plan, describing it as 'shortsighted'."
      ],
      blanks: {
        "1": {
          correct: "claim",
          options: [
            { val: "claim", text: "claim" },
            { val: "fact", text: "fact" },
            { val: "transition", text: "transition" }
          ]
        },
        "2": {
          correct: "evidence",
          options: [
            { val: "tone", text: "tone" },
            { val: "opinion", text: "opinion" },
            { val: "evidence", text: "evidence" }
          ]
        },
        "3": {
          correct: "tone",
          options: [
            { val: "purpose", text: "purpose" },
            { val: "tone", text: "tone" },
            { val: "analyze", text: "analyze" }
          ]
        }
      },
      expEn: "The 'claim' is the main argument. The academic studies serve as the 'evidence' to prove that claim. The critical emotional attitude of the writer represents the 'tone'.",
      expVn: "'Claim' (luận điểm) là lập luận chính. Các nghiên cứu học thuật đóng vai trò là 'evidence' (bằng chứng) để chứng minh luận điểm đó. Thái độ cảm xúc chỉ trích của người viết thể hiện 'tone' (giọng điệu)."
    },
    {
      id: "q_hist_1",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "4. Which of the following best states the main argument of the passage?",
      options: [
        { val: "A", text: "A. Factory owners should provide safer working conditions and higher wages." },
        { val: "B", text: "B. Reducing the workday to eight hours benefits both economic productivity and societal well-being." },
        { val: "C", text: "C. The American government must intervene to break up monopolies in the manufacturing sector." },
        { val: "D", text: "D. Workers who labor for twelve hours are more prone to moral vice than those who work eight hours." }
      ],
      correct: "B",
      expEn: "The author argues that reducing the workday to eight hours will increase factory productivity (by reducing fatigue and errors) and improve societal well-being (by allowing workers time to rest, learn, and engage in democracy).",
      expVn: "Tác giả lập luận rằng việc giảm ngày làm việc xuống còn tám giờ sẽ làm tăng năng suất nhà máy (bằng cách giảm mệt mỏi và sai sót) và cải thiện phúc lợi xã hội (bằng cách cho phép công nhân có thời gian nghỉ ngơi, học tập và tham gia vào nền dân chủ)."
    },
    {
      id: "q_hist_2",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "5. How does the author counter the claim that shorter workdays lead to economic ruin?",
      options: [
        { val: "A", text: "A. By arguing that factory owners can afford to lose money." },
        { val: "B", text: "B. By pointing out that a rested worker is more productive and makes fewer costly mistakes." },
        { val: "C", text: "C. By suggesting that the government subsidize factories that adopt the eight-hour day." },
        { val: "D", text: "D. By demonstrating that consumers are willing to pay higher prices for goods." }
      ],
      correct: "B",
      expEn: "In the second paragraph, the author argues that exhausted workers make mistakes and ruin materials, and that a rested worker is more alert and efficient, keeping total daily output high.",
      expVn: "Trong đoạn thứ hai, tác giả lập luận rằng những công nhân kiệt sức thường mắc sai lầm, và một công nhân được nghỉ ngơi sẽ tỉnh táo và hiệu quả hơn, giúp giữ sản lượng tổng thể hàng ngày ở mức cao."
    },
    {
      id: "q_hist_3",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "6. As used in the third paragraph, what does the word \"cultivate\" most nearly mean?",
      options: [
        { val: "A", text: "A. To harvest or farm" },
        { val: "B", text: "B. To restrict or limit" },
        { val: "C", text: "C. To develop or improve" },
        { val: "D", text: "D. To ignore or neglect" }
      ],
      correct: "C",
      expEn: "In this context, to 'cultivate his mind' means to develop or improve his intellect through education and thought.",
      expVn: "Trong ngữ cảnh này, 'cultivate his mind' (trau dồi trí tuệ) có nghĩa là phát triển hoặc cải thiện trí tuệ thông qua giáo dục và suy nghĩ."
    },
    {
      id: "q_hw_1",
      passageId: "p_handwriting",
      type: "mcq",
      title: "7. What is the author’s primary purpose in writing this piece?",
      options: [
        { val: "A", text: "A. To persuade school districts to completely ban laptops and tablets in classrooms." },
        { val: "B", text: "B. To argue that handwriting offers cognitive and personal benefits that typing cannot replicate." },
        { val: "C", text: "C. To explain the scientific process of how the brain stores memories during typing." },
        { val: "D", text: "D. To demonstrate that typing speeds are vastly superior to handwriting speeds." }
      ],
      correct: "B",
      expEn: "The author is advocating for the preservation of handwriting, arguing that it has cognitive benefits (like better memory retention) and personal values that typing lacks.",
      expVn: "Tác giả đang ủng hộ việc duy trì chữ viết tay, lập luận rằng nó mang lại những lợi ích nhận thức (như ghi nhớ tốt hơn) và những giá trị cá nhân mà việc đánh máy không có."
    },
    {
      id: "q_hw_2",
      passageId: "p_handwriting",
      type: "mcq",
      title: "8. Which piece of evidence does the author use to support the claim that handwriting improves memory retention?",
      options: [
        { val: "A", text: "A. Surveys showing that teachers prefer graded handwritten essays over printed ones." },
        { val: "B", text: "B. Brain scans showing that forming letters activates neural pathways linked to critical thinking." },
        { val: "C", text: "C. Statistics comparing the graduation rates of schools with and without cursive programs." },
        { val: "D", text: "D. Anecdotes from historical figures who wrote their famous works by hand." }
      ],
      correct: "B",
      expEn: "The author cites 'neurological studies' showing that physical writing activates unique neural pathways linked to critical thinking and memory.",
      expVn: "Tác giả trích dẫn 'các nghiên cứu thần kinh học' cho thấy việc viết tay kích hoạt các đường dẫn thần kinh đặc biệt liên quan đến tư duy phản biện và trí nhớ."
    },
    {
      id: "q_hw_3",
      passageId: "p_handwriting",
      type: "mcq",
      title: "9. Why does the author mention that typed fonts are \"uniform, sterile, and anonymous\"?",
      options: [
        { val: "A", text: "A. To emphasize that typing is more professional than writing by hand." },
        { val: "B", text: "B. To criticize technology companies for not designing more creative fonts." },
        { val: "C", text: "C. To highlight the loss of individuality and personal connection associated with digital communication." },
        { val: "D", text: "D. To suggest that typing makes it easier to write plagiarized material undetected." }
      ],
      correct: "C",
      expEn: "The author uses these terms to contrast the cold, emotionless nature of typed text with the unique, expressive, and human nature of handwriting.",
      expVn: "Tác giả sử dụng các thuật ngữ này để đối chiếu bản chất vô cảm, lạnh lẽo của văn bản đánh máy với bản chất độc đáo, biểu cảm và đậm chất con người của chữ viết tay."
    },
    {
      id: "q_vg_1",
      passageId: "p_videogames",
      type: "mcq",
      title: "10. How does the author structure the argument in the second paragraph?",
      options: [
        { val: "A", text: "A. By presenting a chronological history of media consumption from television to video games." },
        { val: "B", text: "B. By comparing and contrasting the passive nature of watching television with the active nature of playing video games." },
        { val: "C", text: "C. By listing the negative physical side effects of excessive screen time." },
        { val: "D", text: "D. By citing expert testimony from pediatricians regarding media habits." }
      ],
      correct: "B",
      expEn: "The author compares and contrasts television (where the viewer sits back and passively consumes a story) with video games (where the player must be an active agent who makes decisions to progress).",
      expVn: "Tác giả so sánh và đối chiếu truyền hình (nơi người xem thụ động tiếp nhận câu chuyện) với trò chơi điện tử (nơi người chơi phải là một tác nhân chủ động đưa ra quyết định)."
    },
    {
      id: "q_vg_2",
      passageId: "p_videogames",
      type: "mcq",
      title: "11. According to the author, how does playing video games mimic the scientific method?",
      options: [
        { val: "A", text: "A. It requires players to memorize vast amounts of scientific data." },
        { val: "B", text: "B. It encourages players to work in isolated laboratory environments." },
        { val: "C", text: "C. It involves a cycle of testing a strategy, failing, analyzing the result, and trying a new approach." },
        { val: "D", text: "D. It forces players to write down their hypotheses before starting a new level." }
      ],
      correct: "C",
      expEn: "The third paragraph describes the gaming cycle of trying a strategy, failing, analyzing the failure, and trying again as the core foundation of the scientific method.",
      expVn: "Đoạn thứ ba mô tả chu kỳ chơi game: thử nghiệm chiến lược, thất bại, phân tích thất bại, và thử lại. Đây chính là nền tảng cốt lõi của phương pháp khoa học."
    },
    {
      id: "q_vg_3",
      passageId: "p_videogames",
      type: "mcq",
      title: "12. Which of the following assumptions does the author make about the reader?",
      options: [
        { val: "A", text: "A. The reader already believes that video games are highly educational." },
        { val: "B", text: "B. The reader is familiar with the negative stereotypes associated with video games." },
        { val: "C", text: "C. The reader prefers television over video games for entertainment." },
        { val: "D", text: "D. The reader is an employer looking to hire skilled tech workers." }
      ],
      correct: "B",
      expEn: "The author begins by stating, 'For decades, the public narrative surrounding video games has been overwhelmingly negative,' which assumes the reader is already familiar with these common stereotypes.",
      expVn: "Tác giả bắt đầu bằng cách khẳng định định kiến tiêu cực của công chúng về trò chơi điện tử đã tồn tại nhiều thập kỷ, điều này ngầm định rằng người đọc đã quen thuộc với những khuôn mẫu này."
    },
    {
      id: "q_fict_1",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "13. What is the primary conflict Marcus experiences in the story?",
      options: [
        { val: "A", text: "A. He is struggling to pass a difficult college algebra exam." },
        { val: "B", text: "B. He feels out of place and insecure about returning to school as an older student." },
        { val: "C", text: "C. He cannot afford the tuition fees for his computer science program." },
        { val: "D", text: "D. He is angry at his former employer for automating his job at the factory." }
      ],
      correct: "B",
      expEn: "Marcus's main conflict is internal; he feels self-conscious, insecure, and doubtful about his ability to succeed in college alongside younger, tech-savvy students.",
      expVn: "Xung đột chính của Marcus là xung đột nội tâm; anh ấy cảm thấy tự ti, không an tâm và nghi ngờ về khả năng thành công của mình khi học cùng những sinh viên trẻ tuổi rành công nghệ."
    },
    {
      id: "q_fict_2",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "14. What does Professor Vance mean when she tells Marcus, \"Don't underestimate the value of your mileage\"?",
      options: [
        { val: "A", text: "A. He should keep track of how many miles he drives to commute to campus." },
        { val: "B", text: "B. His age and past work experience are assets that have prepared him for college." },
        { val: "C", text: "C. Younger students are physically faster at typing than he is." },
        { val: "D", text: "D. He will need to work twice as hard to catch up to his classmates." }
      ],
      correct: "B",
      expEn: "'Mileage' is a metaphor for life experience. Professor Vance is telling him that his years of working and solving real-world problems have given him valuable grit and logic.",
      expVn: "'Mileage' (số dặm/đường dài) là một ẩn dụ cho kinh nghiệm sống. Giáo sư Vance đang nói với anh ấy rằng những năm tháng làm việc và giải quyết các vấn đề thực tế đã mang lại cho anh ấy sự bền bỉ và tư duy logic quý giá."
    },
    {
      id: "q_fict_3",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "15. How does the setting of the hallway reflect Marcus’s internal state?",
      options: [
        { val: "A", text: "A. The bright, cheerful hallway makes him feel optimistic about his future." },
        { val: "B", text: "B. The empty, quiet hallway emphasizes his feelings of complete loneliness." },
        { val: "C", text: "C. The low, humming fluorescent lights mirror the nervous tension he feels inside." },
        { val: "D", text: "D. The chaotic, crowded hallway makes him feel angry and overwhelmed." }
      ],
      correct: "C",
      expEn: "The author explicitly states that the 'low, persistent buzz' of the lights 'matched the anxious vibration in Marcus's chest.'",
      expVn: "Tác giả tuyên bố rõ ràng rằng 'tiếng vo ve trầm, dai dẳng' của ánh đèn 'phù hợp với sự rung động lo âu trong ngực Marcus.'"
    }
  ]
};
</file>

<file path="src/data/GED/ENG_1A/data.js">
// src/data/GED/ENG_1A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const ENGLISH_1A_DATA = {
  meta: {
    id: "ENG_1A",
    title: "English for the GED: Foundations of Reading & Argument",
    desc: "An introduction to reading comprehension, identifying author's purpose, recognizing tone, and understanding basic claims and evidence.",
    track: "GED",
    icon: "GraduationCap"
  },
  phases: {
    phase1: {
      unlocked: true,
      tasks: ["WORD_REC", "SPELLING", "READ_COMP", "DICTATION"]
    },
    phase2: {
      unlocked: false,
      tasks: ["VOCAB_WRITING", "SHORT_ANSWERS", "DIAGRAMS"]
    },
    phase3: {
      unlocked: false,
      tasks: ["ASSESSMENT", "ESSAY"]
    }
  },
  realWords: [
    {
      word: "Theme",
      vn: "Chủ đề",
      def: "The main subject, topic, or underlying message in a piece of writing.",
      vnDef: "Chủ đề chính, đề tài hoặc thông điệp ẩn chứa trong một bài viết.",
      sent: "The central theme of the story is the importance of family and loyalty.", 
      vnSent: "Chủ đề trung tâm của câu chuyện là tầm quan trọng của gia đình và lòng trung thành.",
      dictSent: "Understanding the theme helps you grasp the author's overall message.",
      isReal: true
    },
    {
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason an author writes a text, such as to inform, persuade, or entertain.",
      vnDef: "Lý do tác giả viết một văn bản, chẳng hạn như để thông tin, thuyết phục hoặc giải trí.",
      sent: "The writer's primary purpose is to persuade the reader to protect the environment.",
      vnSent: "Mục đích chính của người viết là thuyết phục người đọc bảo vệ môi trường.",
      dictSent: "Always ask yourself what the author's main purpose is before answering the questions.",
      isReal: true
    },
    {
      word: "Tone",
      vn: "Giọng điệu",
      def: "The author's attitude or feeling toward the subject they are writing about.",
      vnDef: "Thái độ hoặc cảm xúc của tác giả đối với chủ đề họ đang viết.",
      sent: "The serious tone of the article matched the tragedy of the breaking news.",
      vnSent: "Giọng điệu nghiêm túc của bài báo phù hợp với thảm kịch của tin tức nóng hổi.",
      dictSent: "You can often guess the tone by looking at the descriptive adjectives used.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "Facts, statistics, or examples that support an author's claim or argument.",
      vnDef: "Sự thật, số liệu thống kê hoặc ví dụ hỗ trợ cho tuyên bố hoặc lập luận của tác giả.",
      sent: "The lawyer presented strong evidence to prove his client was innocent.",
      vnSent: "Luật sư đã đưa ra bằng chứng mạnh mẽ để chứng minh thân chủ của mình vô tội.",
      dictSent: "Good writers always back up their claims with solid and reliable evidence.",
      isReal: true
    },
    {
      word: "Fact",
      vn: "Sự thật (Dữ kiện)",
      def: "A statement that can be proven true or false with objective information.",
      vnDef: "Một tuyên bố có thể được chứng minh là đúng hoặc sai bằng thông tin khách quan.",
      sent: "It is a scientific fact that water boils at one hundred degrees Celsius.",
      vnSent: "Đó là một sự thật khoa học rằng nước sôi ở một trăm độ C.",
      dictSent: "A strong argument relies on fact rather than raw emotion or personal bias.",
      isReal: true
    },
    {
      word: "Opinion",
      vn: "Ý kiến cá nhân",
      def: "A personal belief or judgment that cannot be objectively proven true or false.",
      vnDef: "Một niềm tin hoặc đánh giá cá nhân không thể được chứng minh một cách khách quan là đúng hay sai.",
      sent: "Saying that pizza is the best food in the world is just an opinion.",
      vnSent: "Nói rằng pizza là món ăn ngon nhất trên thế giới chỉ là một ý kiến cá nhân.",
      dictSent: "Be careful not to confuse a writer's opinion with actual historical facts.",
      isReal: true
    },
    {
      word: "Transition",
      vn: "Sự chuyển tiếp",
      def: "Words or phrases that connect ideas and help a text flow smoothly from one thought to the next.",
      vnDef: "Các từ hoặc cụm từ kết nối các ý tưởng và giúp văn bản trôi chảy từ suy nghĩ này sang suy nghĩ khác.",
      sent: "Words like 'however' and 'therefore' act as a transition between paragraphs.",
      vnSent: "Các từ như 'tuy nhiên' và 'do đó' đóng vai trò như sự chuyển tiếp giữa các đoạn văn.",
      dictSent: "A good transition makes it much easier for the reader to follow your logic.",
      isReal: true
    },
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The main argument or point that a writer is trying to make and defend.",
      vnDef: "Lập luận hoặc điểm chính mà người viết đang cố gắng đưa ra và bảo vệ.",
      sent: "The author's main claim is that daily exercise improves long-term mental health.",
      vnSent: "Luận điểm chính của tác giả là tập thể dục hàng ngày cải thiện sức khỏe tinh thần lâu dài.",
      dictSent: "Every persuasive essay must have a clear and strong claim at the beginning.",
      isReal: true
    },
    {
      word: "Analyze",
      vn: "Phân tích",
      def: "To examine something carefully in order to understand its different parts and meaning.",
      vnDef: "Kiểm tra điều gì đó cẩn thận để hiểu các phần khác nhau và ý nghĩa của nó.",
      sent: "Students must analyze the poem to find its hidden message about nature.",
      vnSent: "Học sinh phải phân tích bài thơ để tìm ra thông điệp ẩn giấu của nó về thiên nhiên.",
      dictSent: "You will need to analyze the data carefully before making a final decision.",
      isReal: true
    },
    {
      word: "Conclude",
      vn: "Kết luận",
      def: "To bring to an end or to reach a logical decision based on the information provided.",
      vnDef: "Kết thúc hoặc đạt được một quyết định logic dựa trên thông tin được cung cấp.",
      sent: "After reading the report, we can conclude that the new project was a success.",
      vnSent: "Sau khi đọc báo cáo, chúng ta có thể kết luận rằng dự án mới đã thành công.",
      dictSent: "Your final paragraph should effectively conclude your entire argument for the reader.",
      isReal: true
    }
  ],
  dictation: [
    { sent: "Understanding the theme helps you grasp the author's overall message.", vnSent: "Hiểu được chủ đề giúp bạn nắm bắt được thông điệp tổng thể của tác giả." },
    { sent: "Always ask yourself what the author's main purpose is before answering the questions.", vnSent: "Luôn tự hỏi mục đích chính của tác giả là gì trước khi trả lời các câu hỏi." },
    { sent: "You can often guess the tone by looking at the descriptive adjectives used.", vnSent: "Bạn thường có thể đoán được giọng điệu bằng cách nhìn vào các tính từ miêu tả được sử dụng." },
    { sent: "Good writers always back up their claims with solid and reliable evidence.", vnSent: "Những người viết tốt luôn củng cố luận điểm của họ bằng bằng chứng vững chắc và đáng tin cậy." },
    { sent: "A strong argument relies on fact rather than raw emotion or personal bias.", vnSent: "Một lập luận mạnh mẽ dựa trên sự thật hơn là cảm xúc nhất thời hoặc thành kiến cá nhân." },
    { sent: "Be careful not to confuse a writer's opinion with actual historical facts.", vnSent: "Hãy cẩn thận đừng nhầm lẫn ý kiến của người viết với sự thật lịch sử thực tế." },
    { sent: "A good transition makes it much easier for the reader to follow your logic.", vnSent: "Một sự chuyển tiếp tốt làm cho người đọc dễ dàng theo dõi logic của bạn hơn nhiều." },
    { sent: "Every persuasive essay must have a clear and strong claim at the beginning.", vnSent: "Mỗi bài luận thuyết phục phải có một luận điểm rõ ràng và mạnh mẽ ngay từ đầu." },
    { sent: "You will need to analyze the data carefully before making a final decision.", vnSent: "Bạn sẽ cần phân tích dữ liệu cẩn thận trước khi đưa ra quyết định cuối cùng." },
    { sent: "Your final paragraph should effectively conclude your entire argument for the reader.", vnSent: "Đoạn văn cuối cùng của bạn nên kết luận một cách hiệu quả toàn bộ lập luận của bạn cho người đọc." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Understanding the Author's Intent",
      text: "Every text is written with a specific {purpose}. Sometimes an author wants to teach you a {fact} about history, while other times they want to convince you to agree with their {opinion}. Figuring out the 'why' behind the writing is the very first step to good reading comprehension and analysis.",
      vnText: "Mỗi văn bản được viết với một mục đích cụ thể. Đôi khi tác giả muốn dạy cho bạn một sự thật về lịch sử, trong khi những lúc khác họ muốn thuyết phục bạn đồng ý với ý kiến của họ. Tìm ra lý do 'tại sao' đằng sau bài viết là bước đầu tiên để đọc hiểu và phân tích tốt."
    },
    {
      id: "passage_2",
      title: "Listening to the Writer's Voice",
      text: "You can tell a lot about a text by paying attention to the {tone}. If the author uses angry or urgent words, they are likely upset about the {theme} they are discussing. Paying attention to these emotional clues helps you {analyze} the true meaning behind the words on the page.",
      vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến giọng điệu. Nếu tác giả sử dụng những từ ngữ tức giận hoặc khẩn cấp, có thể họ đang bực tức về chủ đề mà họ đang thảo luận. Chú ý đến những manh mối cảm xúc này giúp bạn phân tích ý nghĩa thực sự đằng sau những từ ngữ trên trang giấy."
    },
    {
      id: "passage_3",
      title: "Building a Solid Argument",
      text: "To make a strong {claim}, a writer cannot simply state what they believe. They must provide solid {evidence} to back it up. Furthermore, using a smooth {transition} between sentences ensures that the reader does not get confused as the argument builds toward the end.",
      vnText: "Để đưa ra một luận điểm mạnh mẽ, người viết không thể chỉ đơn giản nêu ra những gì họ tin tưởng. Họ phải cung cấp bằng chứng vững chắc để chứng minh. Hơn nữa, việc sử dụng sự chuyển tiếp mượt mà giữa các câu đảm bảo rằng người đọc không bị nhầm lẫn khi lập luận được xây dựng về cuối."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Foundations of Reading & Argument",
    vnTitle: "Bài 1A: Cơ sở của việc Đọc hiểu & Lập luận",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. The Author's Intent",
        vnHeading: "1. Ý định của Tác giả",
        text: "Every text is written with a specific **Purpose**. Sometimes an author wants to teach you a **Fact**, while other times they want to share their **Opinion**.",
        vnText: "Mỗi văn bản được viết với một **Mục đích** cụ thể. Đôi khi tác giả muốn dạy cho bạn một **Sự thật**, trong khi những lúc khác họ muốn chia sẻ **Ý kiến** của họ."
      },
      {
        heading: "2. Voice and Message",
        vnHeading: "2. Giọng điệu và Thông điệp",
        text: "You can tell a lot about a text by paying attention to the **Tone**. Paying attention to these emotional clues helps you **Analyze** the true meaning and **Theme** behind the words.",
        vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến **Giọng điệu**. Chú ý đến những manh mối cảm xúc này giúp bạn **Phân tích** ý nghĩa thực sự và **Chủ đề** đằng sau những từ ngữ."
      },
      {
        heading: "3. Building an Argument",
        vnHeading: "3. Xây dựng một Lập luận",
        text: "To make a strong **Claim**, a writer must provide solid **Evidence**. Using a smooth **Transition** between sentences ensures the reader can follow along until you **Conclude** the argument.",
        vnText: "Để đưa ra một **Luận điểm** mạnh mẽ, người viết phải cung cấp **Bằng chứng** vững chắc. Sử dụng **Sự chuyển tiếp** mượt mà giữa các câu đảm bảo người đọc có thể theo dõi cho đến khi bạn **Kết luận** lập luận."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Why is it helpful for a reader to identify the author's purpose before reading a long passage?",
      requiredWords: [["understand", "understanding"], ["expect", "expectations"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it helps the reader know what to expect from the text.",
        "1 mark for explaining that it makes it easier to understand the main message."
      ],
      modelAnswer: "Identifying the author's purpose is helpful because it tells the reader what to expect, making it much easier to understand the main message of the text."
    },
    {
      id: "q2",
      question: "What is the primary difference between a fact and an opinion in an informational text?",
      requiredWords: [["prove", "proven", "proof"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a fact can be proven with objective evidence.",
        "1 mark for stating that an opinion is a personal belief that cannot be proven."
      ],
      modelAnswer: "The primary difference is that a fact can be objectively proven with evidence, whereas an opinion is a personal belief that cannot be proven."
    },
    {
      id: "q3",
      question: "Why must a writer include evidence when making a strong claim?",
      requiredWords: [["support", "prove", "back"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that evidence is needed to prove the claim is true.",
        "1 mark for noting that without evidence, the claim is just an unsupported opinion."
      ],
      modelAnswer: "A writer must include evidence to prove that their claim is true; otherwise, their argument is simply an unsupported opinion."
    }
  ],
  diagrams: [
    {
      id: "d1",
      imageUrl: "/images/GED/reading_map1.png",
      promptText: "Look at the basic paragraph structure chart. In which section does the author usually introduce their main claim?",
      requiredWords: [["beginning", "start", "first"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the beginning or introduction.",
        "1 mark for explaining that this sets up the argument for the rest of the paragraph."
      ],
      modelAnswer: "The author usually introduces their main claim at the very beginning of the paragraph to clearly set up the argument."
    },
    {
      id: "d2",
      imageUrl: "/images/GED/fact_opinion1.png",
      promptText: "Review the graphic sorting statements. What is the key feature that separates the statements in the 'Fact' column from the 'Opinion' column?",
      requiredWords: [["proof", "proven", "prove"], ["objective", "evidence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that facts can be proven with objective evidence.",
        "1 mark for noting that opinions cannot be proven."
      ],
      modelAnswer: "The key feature is that facts can be proven true or false with objective evidence, whereas opinions are personal beliefs that cannot be proven."
    }
  ],
  essay: {
    task: "Explain why it is important for a reader to be able to distinguish between an author's objective facts and personal opinions when reading the news.",
    guidelines: [
      "Define what makes a statement a fact.",
      "Define what makes a statement an opinion.",
      "Explain the danger of confusing the two when reading news."
    ],
    requiredWords: [
      ["Fact", "facts"], 
      ["Opinion", "opinions", "beliefs"],
      ["Evidence", "prove", "proof"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately defining a fact (can be proven).",
      "1 mark for accurately defining an opinion (personal belief).",
      "1 mark for explaining that confusing them can lead to misinformation or biased thinking."
    ],
    modelAnswer: "It is important to distinguish between the two because a fact can be proven with objective evidence, while an opinion is just a personal belief. When reading the news, if a reader cannot tell the difference, they might mistake a writer's biased opinion for the absolute truth, leading to misinformation and a lack of critical thinking."
  },
  assessment,
  notes,
  workbook,
  games
};
</file>

<file path="src/data/GED/ENG_1A/games.js">
// src/data/GED/ENG_1A/games.js
import { WAVE_PRESETS } from '../../../components/towerdefense/wavePresets';

export const games = {
  gameConfig: {
    themeId: 'RANDOM', // Option 5: Triggers the randomized map selector
    layout: {
      rows: 10,
      cols: 15,
      path: [
        [2, 0], [2, 3], [7, 3], [7, 7], [2, 7], [2, 11], [7, 11], [7, 14]
      ]
    },
    allowedTowers: ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN', 'NITRO'],
    waves: WAVE_PRESETS.SET_1,
    generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR
  }
};
</file>

<file path="src/data/GED/ENG_1A/notes.js">
// src/data/GED/ENG_1A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Understanding Reading & Arguments",
    titleVn: "Hiểu về Đọc hiểu & Lập luận",
    subtitle: "Objective: Identify the author's purpose, distinguish facts from opinions, and analyze claims and evidence.",
    subtitleVn: "Mục tiêu: Nhận diện mục đích của tác giả, phân biệt sự thật với ý kiến, và phân tích luận điểm và bằng chứng.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Author's Purpose",
    titleVn: "Mục đích của Tác giả",
    icon: "Target",
    color: "bg-[#ff9600]",
    content: "Every text is written with a specific **Purpose** in mind. Before you can analyze a text, you must figure out why the author wrote it in the first place.\n\n> The three most common purposes are **PIE**:\n> **P**ersuade: To convince you to agree.\n> **I**nform: To teach you objective facts.\n> **E**ntertain: To amuse or tell a story.",
    contentVn: "Mỗi văn bản đều được viết với một **Mục đích** cụ thể. Trước khi có thể phân tích văn bản, bạn phải hiểu tại sao tác giả lại viết nó.\n\n> Ba mục đích phổ biến nhất là:\n> **Thuyết phục:** Để thuyết phục bạn đồng ý.\n> **Thông tin:** Để dạy bạn những sự thật khách quan.\n> **Giải trí:** Để làm bạn vui hoặc kể một câu chuyện.",
    example: "A newspaper editorial arguing that the city needs more parks is written to Persuade.",
    exampleVn: "Một bài xã luận trên báo lập luận rằng thành phố cần nhiều công viên hơn được viết để Thuyết phục.",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_1.mp3"
  },
  {
    type: "concept",
    title: "Fact vs. Opinion",
    titleVn: "Sự thật vs. Ý kiến",
    icon: "Scale",
    color: "bg-[#58cc02]",
    content: "When reading informational texts or the news, it is critical to separate what is actually true from what the author simply believes.\n\n> A **Fact** is a statement that can be objectively proven true or false using evidence, science, or historical records.\n> An **Opinion** is a personal belief, judgment, or feeling that cannot be universally proven.",
    contentVn: "Khi đọc các văn bản thông tin hoặc tin tức, điều rất quan trọng là phải phân biệt điều gì thực sự đúng với điều mà tác giả chỉ đơn giản tin là đúng.\n\n> **Sự thật** là một tuyên bố có thể được chứng minh khách quan là đúng hoặc sai bằng bằng chứng, khoa học hoặc hồ sơ lịch sử.\n> **Ý kiến** là niềm tin cá nhân, đánh giá hoặc cảm giác không thể được chứng minh một cách phổ quát.",
    example: "Fact: The human body is composed of about 60% water.\nOpinion: Swimming is the best way to exercise.",
    exampleVn: "Sự thật: Cơ thể con người bao gồm khoảng 60% là nước.\nÝ kiến: Bơi lội là cách tốt nhất để tập thể dục.",
    image: "/images/GED/fact_opinion1.svg",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_2.mp3"
  },
  {
    type: "concept",
    title: "Claims & Evidence",
    titleVn: "Luận điểm & Bằng chứng",
    icon: "ShieldCheck",
    color: "bg-[#ff4b4b]",
    content: "When an author wants to persuade you, they will build an argument. An argument is not a fight; it is a logical structure.\n\n> **The Claim:** The main argument or point the author is trying to defend.\n> **The Evidence:** The statistics, expert quotes, or historical facts used to prove the claim is valid.",
    contentVn: "Khi một tác giả muốn thuyết phục bạn, họ sẽ xây dựng một lập luận. Lập luận không phải là một cuộc cãi vã; nó là một cấu trúc logic.\n\n> **Luận điểm:** Lập luận chính hoặc điểm mà tác giả đang cố gắng bảo vệ.\n> **Bằng chứng:** Các số liệu thống kê, trích dẫn chuyên gia, hoặc sự thật lịch sử được sử dụng để chứng minh luận điểm là hợp lý.",
    example: "Claim: Daily reading improves vocabulary.\nEvidence: A university study showed that students who read for 20 minutes a day learned 1,800,000 new words a year.",
    exampleVn: "Luận điểm: Đọc sách hàng ngày cải thiện vốn từ vựng.\nBằng chứng: Một nghiên cứu đại học cho thấy những sinh viên đọc 20 phút mỗi ngày học được 1.800.000 từ mới một năm.",
    image: "/images/GED/reading_map1.svg",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_3.mp3"
  },
  {
    type: "concept",
    title: "Author's Tone",
    titleVn: "Giọng điệu của Tác giả",
    icon: "MessageSquare",
    color: "bg-[#ce82ff]",
    content: "Because you cannot hear the author's voice when reading, you have to look for emotional clues in the text.\n\n> The **Tone** is the author's underlying attitude or feeling toward the subject they are writing about.\n\nYou can often determine the tone by examining the descriptive adjectives and verbs the author chooses to use.",
    contentVn: "Vì bạn không thể nghe được giọng của tác giả khi đọc, bạn phải tìm kiếm các manh mối cảm xúc trong văn bản.\n\n> **Giọng điệu** là thái độ hoặc cảm xúc cơ bản của tác giả đối với chủ đề mà họ đang viết.\n\nBạn thường có thể xác định giọng điệu bằng cách xem xét các tính từ và động từ miêu tả mà tác giả chọn sử dụng.",
    example: "Using words like 'devastating', 'tragic', and 'heartbreaking' creates a serious, sorrowful tone.\nUsing words like 'ridiculous', 'absurd', and 'nonsense' creates a sarcastic or critical tone.",
    exampleVn: "Sử dụng các từ như 'tàn phá', 'bi thảm' và 'đau lòng' tạo ra một giọng điệu nghiêm túc, buồn bã.\nSử dụng các từ như 'lố bịch', 'vô lý' và 'vô nghĩa' tạo ra một giọng điệu mỉa mai hoặc chỉ trích.",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_4.mp3"
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You now understand purpose, claims, and evidence.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn đã hiểu mục đích, luận điểm và bằng chứng.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
</file>

<file path="src/data/GED/ENG_1A/workbook.js">
// src/data/GED/ENG_1A/workbook.js
export const workbook = null;
</file>

<file path="src/hooks/useStudentProgress.js">
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Ensure this matches how you initialize Supabase in your project!
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Notice we added 'track' as a parameter here, defaulting to Y9
export function useStudentProgress(navigate, track = 'Y9') {
  const [user, setUser] = useState(null);
  const [allProgress, setAllProgress] = useState({
    Y8: {},
    Y9: {},
    ESL: {},
    GED: {}
  });
  const [isLoadingDB, setIsLoadingDB] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }
      
      setUser(session.user);

      const { data } = await supabase
        .from('students')
        .select('progress')
        .eq('id', session.user.id)
        .single();

      if (data && data.progress) {
        let dbProgress = data.progress;
        const validTracks = ['Y8', 'Y9', 'ESL', 'GED'];

        // AUTO-MIGRATION: If keys are old unit IDs like "U1", move everything to Y9
        const isOldFormat = Object.keys(dbProgress).some(key => !validTracks.includes(key));
        if (isOldFormat) {
          dbProgress = {
            Y8: {},
            Y9: dbProgress,
            ESL: {},
            GED: {}
          };
          // Silently fix the database in the background so it doesn't happen again
          await supabase.from('students').update({ progress: dbProgress }).eq('id', session.user.id);
        } else {
          // Ensure the base structure exists even if a track is empty
          validTracks.forEach(t => {
            if (!dbProgress[t]) dbProgress[t] = {};
          });
        }

        setAllProgress(dbProgress);
      }
      
      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  const saveScore = async (unitId, section, score, answers = null) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    // Get the existing score (defaults to 0 if they have never played this section)
    const existingScore = newProgress[track][unitId][section]?.current || 0;

    newProgress[track][unitId] = {
      ...newProgress[track][unitId],
      [section]: {
        // ⚠️ FIX: Math.max ensures we only ever keep the highest XP score
        current: Math.max(existingScore, score),
        // We still update the answers if they provide new ones so they can see their latest work
        answers: answers || newProgress[track][unitId][section]?.answers || null
      }
    };

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const addStrike = async (unitId, newStrikes) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    newProgress[track][unitId].strikes = newStrikes;

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { 
    user, 
    allProgress, // <-- THE FIX: Exposing allProgress so the Dashboard can actually read it
    unitScores: allProgress[track] || {}, 
    isLoadingDB, 
    saveScore, 
    addStrike, 
    handleLogout 
  };
}
</file>

<file path="src/tasks/Assessment.jsx">
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, GripVertical, CornerDownRight, Clock, AlertTriangle, Construction, FileQuestion, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Assessment({ unit, onComplete, onQuit }) {
  const assessmentData = unit?.assessment;
  
  if (!assessmentData || !assessmentData.questions || !Array.isArray(assessmentData.questions) || assessmentData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Construction className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Assessment Unavailable</h2>
        <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 mb-10 text-lg font-bold text-slate-500">
          No assessment data is currently configured for this unit.
        </div>
        <button onClick={onQuit} className="px-10 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl uppercase tracking-widest border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const questions = assessmentData.questions;
  const passages = assessmentData.passages || [];
  const totalQuestions = questions.length;

  // Lifecycle States: 'testing' -> 'intermission' -> 'reviewing'
  const [testPhase, setTestPhase] = useState('testing'); 
  const [answers, setAnswers] = useState({}); // Stores user answers mapped by qIndex
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(assessmentData.timeLimit || 2700); 
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Active UI States
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const currentQuestion = questions[currentQIndex] || null;
  const currentPassage = currentQuestion ? passages.find(p => p.id === currentQuestion.passageId) : null;

  const isDND = currentQuestion?.type === 'dnd' || currentQuestion?.type === 'order';
  const isInline = currentQuestion?.type === 'inline' || currentQuestion?.type === 'scrollBox';
  const isMCQ = !isDND && !isInline;

  const currentAns = answers[currentQIndex] || {};

  // --- Core Timer Logic ---
  useEffect(() => {
    if (testPhase !== 'testing') return;
    if (timeLeft <= 0 && !isTimeUp) {
      setIsTimeUp(true);
      finishTest();
      return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, testPhase, isTimeUp]);

  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => { 
    setActiveGlossaryTerm(null); 
  }, [currentQIndex, testPhase]);

  // --- Testing Interaction Handlers ---
  const updateAnswer = (payload) => {
    setAnswers(prev => {
      const currentAnsObj = prev[currentQIndex] || {};
      return { ...prev, [currentQIndex]: { ...currentAnsObj, ...payload } };
    });
  };

  const handleSelectOption = (val) => {
    if (testPhase !== 'testing') return;
    updateAnswer({ selectedOption: val });
  };

  const handleDragStart = (e, itemVal) => {
    if (testPhase !== 'testing') return;
    setDraggedItem(itemVal);
    e.dataTransfer.setData('text/plain', itemVal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent bubbling up which can cause layout shifts
    if (testPhase !== 'testing' || !draggedItem) return;
    
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    
    // Remove the item if it already exists in another slot
    for (const key in newDrops) { 
      if (newDrops[key] === draggedItem) delete newDrops[key]; 
    }
    
    newDrops[slotId] = draggedItem;
    updateAnswer({ droppedItems: newDrops });
    setDraggedItem(null);
  };

  const removeDroppedItem = (slotId) => {
    if (testPhase !== 'testing') return;
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    delete newDrops[slotId];
    updateAnswer({ droppedItems: newDrops });
  };

  const handleInlineChange = (blankIndex, val) => {
    if (testPhase !== 'testing') return;
    const currentInline = currentAns.inlineAnswers || {};
    updateAnswer({ inlineAnswers: { ...currentInline, [blankIndex]: val } });
  };

  // --- Submittable Gate Check ---
  let isCurrentAnswered = false;
  if (currentQuestion) {
    if (isMCQ) isCurrentAnswered = !!currentAns.selectedOption;
    if (isInline) isCurrentAnswered = Object.keys(currentAns.inlineAnswers || {}).length === Object.keys(currentQuestion.blanks || {}).length;
    if (isDND) {
      let totalSlots = 0;
      (currentQuestion.targets || []).forEach(t => totalSlots += (currentQuestion.correctSets?.[t.id]?.length || 1));
      isCurrentAnswered = Object.keys(currentAns.droppedItems || {}).length === totalSlots;
    }
  }

  // --- Smart Fraction-Based Normalized Grading ---
  const checkQuestionCorrect = (qIndex) => {
    const q = questions[qIndex];
    const ans = answers[qIndex] || {};
    
    if (q.type === 'mcq') return ans.selectedOption === q.correct;
    
    if (q.type === 'inline' || q.type === 'scrollBox') {
      const userInline = ans.inlineAnswers || {};
      const blanks = q.blanks || {};
      for (const blankId of Object.keys(blanks)) {
        if (userInline[blankId] !== blanks[blankId].correct) return false;
      }
      return true;
    }
    
    if (q.type === 'dnd' || q.type === 'order') {
      const dropped = ans.droppedItems || {};
      let allCorrect = true;
      for (const target of (q.targets || [])) {
        const expectedArr = q.correctSets?.[target.id] || [];
        const userDropped = [];
        for (let i = 0; i < expectedArr.length; i++) {
          const d = dropped[`${target.id}_${i}`];
          if (d) userDropped.push(d);
        }
        if (q.type === 'order') {
          if (JSON.stringify(userDropped) !== JSON.stringify(expectedArr)) allCorrect = false;
        } else {
          if (userDropped.length !== expectedArr.length) allCorrect = false;
          for (const val of expectedArr) {
            if (!userDropped.includes(val)) allCorrect = false;
          }
        }
      }
      return allCorrect;
    }
    return false;
  };

  const finishTest = () => {
    let totalPossible = 0;
    let totalEarned = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const q = questions[i];
      const ans = answers[i] || {};

      if (q.type === 'mcq') {
        totalPossible += 1;
        if (ans.selectedOption === q.correct) totalEarned += 1;
      } else if (q.type === 'inline' || q.type === 'scrollBox') {
        const blanks = q.blanks || {};
        const userInline = ans.inlineAnswers || {};
        for (const blankId of Object.keys(blanks)) {
          totalPossible += 1;
          if (userInline[blankId] === blanks[blankId].correct) totalEarned += 1;
        }
      } else if (q.type === 'dnd' || q.type === 'order') {
        const dropped = ans.droppedItems || {};
        for (const target of (q.targets || [])) {
          const expectedArr = q.correctSets?.[target.id] || [];
          totalPossible += expectedArr.length;

          if (q.type === 'order') {
            for (let s = 0; s < expectedArr.length; s++) {
              if (dropped[`${target.id}_${s}`] === expectedArr[s]) totalEarned += 1;
            }
          } else {
            const userDropped = [];
            for (let s = 0; s < expectedArr.length; s++) {
              const d = dropped[`${target.id}_${s}`];
              if (d) userDropped.push(d);
            }
            const unmatchedExpected = [...expectedArr];
            for (const item of userDropped) {
               const idx = unmatchedExpected.indexOf(item);
               if (idx !== -1) {
                 totalEarned += 1;
                 unmatchedExpected.splice(idx, 1);
               }
            }
          }
        }
      }
    }

    const calculatedScore = totalPossible === 0 ? 0 : Math.ceil((totalEarned / totalPossible) * 10);
    setFinalScore(calculatedScore);
    setTestPhase('intermission');
  };

  const handleNextTest = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else finishTest();
  };

  const handlePrevTest = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  const handleNextReview = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else {
      if (typeof onComplete === 'function') onComplete(finalScore);
    }
  };

  const handlePrevReview = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  // --- Rendering Helpers ---
  const renderPassageWithGlossary = (text) => {
    if (!text || typeof text !== 'string') return null;
    const parts = text.split(/\{([^}]+)\}/g);
    return parts.map((part, i) => {
      if (i % 2 !== 0) {
        const cleanWord = part.toLowerCase();
        const termData = currentPassage?.glossary?.[cleanWord];
        if (!termData) return <span key={i} className="font-bold text-slate-800">{part}</span>;
        return (
          <button 
            key={i} 
            onClick={() => { setActiveGlossaryTerm({ word: part, ...termData }); }}
            className="text-emerald-600 font-bold border-b-2 border-dashed border-emerald-600 hover:bg-emerald-50 transition-colors mx-0.5 rounded px-1"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // --- Intermission View ---
  if (testPhase === 'intermission') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 opacity-40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200 opacity-40 blur-[120px] pointer-events-none" />
        
        <TopBar onQuit={onQuit} current={totalQuestions} total={totalQuestions} modeTitle="Assessment Module" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 animate-in zoom-in-95 duration-500">
          <div className="bg-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-200 text-center max-w-2xl w-full">
             <div className="w-32 h-32 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
               <CheckCircle2 className="w-16 h-16" strokeWidth={3} />
             </div>
             <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4">Assessment Complete</h1>
             <p className="text-2xl font-bold text-slate-500 mb-8">Let's see how you did.</p>
             
             <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl py-8 mb-10 shadow-sm">
                <span className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Normalized XP</span>
                <div className="text-6xl font-black text-emerald-500">
                  {finalScore} <span className="text-4xl text-slate-300">/ 10</span>
                </div>
             </div>

             <button 
                onClick={() => { setCurrentQIndex(0); setTestPhase('reviewing'); }}
                className="w-full py-5 rounded-2xl font-black text-white text-xl uppercase tracking-widest transition-all bg-[#1CB0F6] border-b-[6px] border-[#1899D6] hover:bg-[#1899D6] active:border-b-0 active:translate-y-[6px] shadow-lg flex items-center justify-center"
             >
                Review Answers <ArrowRight className="w-6 h-6 ml-3" strokeWidth={3} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Engine View (Testing & Reviewing) ---
  const isCurrentlyCorrect = testPhase === 'reviewing' ? checkQuestionCorrect(currentQIndex) : null;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans relative">
      
      {/* 1. Header (Shared TopBar) */}
      <TopBar 
        onQuit={onQuit} 
        current={currentQIndex + 1} 
        total={totalQuestions} 
        modeTitle={testPhase === 'testing' ? "Assessment Module" : "Assessment Review"} 
      />

      {isTimeUp && testPhase === 'testing' && (
        <div className="bg-red-600 text-white p-3 text-center font-bold text-lg uppercase tracking-widest flex justify-center items-center shadow-md z-30 animate-in slide-in-from-top-2">
          <AlertTriangle className="mr-2" /> Time is up! Submitting answers...
        </div>
      )}

      {/* 2. Content Body (Split Pane) */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
        
        {/* Left Pane: Reading Passage Bank */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 bg-white z-10 pb-32">
          {currentPassage ? (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-6 leading-tight">{currentPassage.title}</h2>
              <div className="mb-6">
                {currentPassage.meta && (
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-3">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{currentPassage.meta}</h3>
                  </div>
                )}
                <div className="space-y-4 text-slate-700 text-lg leading-relaxed font-medium">
                  {(currentPassage.text || []).map((p, i) => (
                    <p key={i}>{renderPassageWithGlossary(p)}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-slate-400 animate-in fade-in">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <FileQuestion className="w-12 h-12 text-slate-300" />
              </div>
              <p className="font-bold text-lg">No passage required</p>
            </div>
          )}
        </div>

        {/* Right Pane: Question Engine */}
        <div className="w-full md:w-1/2 bg-slate-50/50 flex flex-col relative overflow-hidden pb-40">
          
          {/* Floating Timer in Test Phase */}
          {testPhase === 'testing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-30 flex items-center font-black text-lg px-4 py-2 rounded-xl bg-white border-2 border-slate-200 shadow-sm text-slate-700">
               <Clock className="w-5 h-5 mr-2" />
               {formatTime(timeLeft)}
            </div>
          )}

          <div className="p-6 md:p-8 overflow-y-auto h-full relative animate-in fade-in slide-in-from-right-4 duration-300 pt-16 md:pt-8">
            <h3 className="text-xl font-black text-slate-800 leading-snug tracking-tight mb-8 pr-20">{currentQuestion.title}</h3>
            
            {/* 1. MCQ Layout */}
            {isMCQ && (
              <div className="space-y-3">
                {(currentQuestion.options || []).map((opt) => {
                  const isSelected = currentAns.selectedOption === opt.val;
                  const isCorrectAnswer = opt.val === currentQuestion.correct;
                  let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 shadow-sm hover:shadow-md";
                  
                  if (testPhase === 'reviewing') {
                    if (isCorrectAnswer) btnStyle = "bg-[#D7FFD7] border-[#58A700] text-[#3E7500] shadow-sm";
                    else if (isSelected && !isCorrectAnswer) btnStyle = "bg-[#FFE5E5] border-[#EA4335] text-[#A32D23] shadow-sm";
                    else btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  } else if (isSelected) {
                    btnStyle = "bg-emerald-50 border-emerald-500 border-b-4 text-emerald-800 translate-y-[-2px] shadow-md";
                  }

                  return (
                    <button 
                      key={opt.val}
                      onClick={() => handleSelectOption(opt.val)}
                      disabled={testPhase !== 'testing'}
                      className={`w-full text-left p-4 rounded-2xl border-2 font-medium text-lg transition-all ${btnStyle}`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. DND Layout */}
            {isDND && (
              <div className="space-y-8">
                <div className="sticky top-0 z-30 pt-1 pb-4 bg-slate-50/90 backdrop-blur-md shadow-[0_15px_15px_-15px_rgba(0,0,0,0.1)] -mt-2">
                  <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-5 shadow-sm">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Options Bank</h4>
                    <div className="flex flex-wrap gap-3">
                      {(currentQuestion.bank || []).map((opt) => {
                        const isUsed = Object.values(currentAns.droppedItems || {}).includes(opt.val);
                        if (isUsed) return null;
                        return (
                          <div
                            key={opt.val}
                            draggable={testPhase === 'testing'}
                            onDragStart={(e) => handleDragStart(e, opt.val)}
                            className={`flex items-center px-4 py-3 bg-white border-2 border-slate-200 rounded-xl font-medium text-slate-700 shadow-sm transition-all ${testPhase === 'testing' ? 'cursor-grab active:cursor-grabbing hover:border-emerald-400 hover:shadow-md' : 'opacity-50'}`}
                          >
                            <GripVertical className="w-5 h-5 mr-2 text-slate-400" />
                            {opt.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Targets</h4>
                  <div className={`grid gap-4 ${(currentQuestion.targets || []).length > 1 && currentQuestion.type !== 'order' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                    {(currentQuestion.targets || []).map((target) => {
                      const requiredCount = currentQuestion.correctSets?.[target.id]?.length || 1;
                      return (
                        <div key={target.id} className="flex flex-col bg-slate-100 p-4 rounded-3xl border-2 border-slate-200 shadow-sm">
                          <div className="font-bold text-slate-800 mb-3 text-[15px] leading-tight text-center border-b-2 border-slate-200 pb-3">{target.title}</div>
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: requiredCount }).map((_, slotIndex) => {
                              const slotId = `${target.id}_${slotIndex}`;
                              const droppedVal = (currentAns.droppedItems || {})[slotId];
                              const droppedObj = (currentQuestion.bank || []).find(b => b.val === droppedVal);
                              let slotStyle = "bg-white border-dashed border-slate-300 text-slate-400";
                              
                              if (testPhase === 'reviewing') {
                                const expectedArr = currentQuestion.correctSets?.[target.id] || [];
                                let isCorrectInSlot = currentQuestion.type === 'order' ? expectedArr[slotIndex] === droppedVal : expectedArr.includes(droppedVal);
                                if (!droppedVal) slotStyle = "bg-[#FFE5E5] border-[#EA4335] border-solid text-[#A32D23] shadow-sm";
                                else if (isCorrectInSlot) slotStyle = "bg-[#D7FFD7] border-[#58A700] border-solid text-[#3E7500] shadow-sm";
                                else slotStyle = "bg-[#FFE5E5] border-[#EA4335] border-solid text-[#A32D23] shadow-sm";
                              } else if (droppedObj) {
                                slotStyle = "bg-emerald-50 border-emerald-400 border-solid text-emerald-800 shadow-sm";
                              }

                              return (
                                <div 
                                  key={slotId}
                                  onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                                  onDrop={(e) => handleDrop(e, slotId)}
                                  onClick={() => droppedObj && removeDroppedItem(slotId)}
                                  className={`min-h-[70px] flex items-center p-3 rounded-2xl border-2 transition-all ${slotStyle} ${testPhase === 'testing' && droppedObj ? 'cursor-pointer hover:bg-rose-50 hover:border-rose-300' : ''}`}
                                >
                                  {!droppedObj ? (
                                    <div className="flex items-center justify-center w-full">
                                      <CornerDownRight className="w-5 h-5 mr-2 opacity-50" />
                                      <span className="font-medium text-sm">{testPhase === 'reviewing' ? 'Left Blank' : 'Drop Item Here'}</span>
                                    </div>
                                  ) : (
                                    <div className="font-bold flex items-center justify-between w-full text-[15px]">
                                      <span>{droppedObj.text}</span>
                                      {testPhase === 'testing' && <XCircle className="w-5 h-5 text-slate-400 hover:text-rose-500 ml-2 flex-shrink-0 transition-colors" />}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Inline Layout */}
            {isInline && (
              <div className="text-lg leading-loose text-slate-700 bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
                {(currentQuestion.textParts || []).map((part, i) => {
                  const blankIndex = i + 1;
                  const blankData = currentQuestion.blanks?.[blankIndex];
                  const selectedVal = (currentAns.inlineAnswers || {})[blankIndex];
                  
                  let selectStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 hover:bg-emerald-100 hover:shadow-md';
                  let showCorrection = false;

                  if (testPhase === 'reviewing') {
                    const isCorrect = selectedVal === blankData?.correct;
                    if (isCorrect) selectStyle = 'bg-[#D7FFD7] border-[#58A700] text-[#3E7500]';
                    else {
                      selectStyle = 'bg-[#FFE5E5] border-[#EA4335] text-[#A32D23]';
                      showCorrection = true;
                    }
                  }

                  return (
                    <React.Fragment key={i}>
                      {part}
                      {blankData && (
                        <span className="inline-flex items-center">
                          <select
                            value={selectedVal || ""}
                            onChange={(e) => handleInlineChange(blankIndex, e.target.value)}
                            disabled={testPhase !== 'testing'}
                            className={`mx-2 p-2 border-b-4 border-2 rounded-xl font-bold cursor-pointer transition-all outline-none appearance-none pr-8 bg-no-repeat shadow-sm ${selectStyle}`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23059669'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
                          >
                            <option value="" disabled>{testPhase === 'reviewing' ? 'Blank' : 'Select Option...'}</option>
                            {(blankData.options || []).map(opt => <option key={opt.val} value={opt.val}>{opt.text}</option>)}
                          </select>
                          {showCorrection && (
                            <span className="text-[#3E7500] bg-[#D7FFD7] border border-[#58A700] px-2 py-1 rounded-lg ml-1 text-sm font-bold shadow-sm">
                              {blankData.options.find(o => o.val === blankData.correct)?.text}
                            </span>
                          )}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Control Navigators */}
      {testPhase === 'testing' && (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-2">
            <button 
              onClick={handlePrevTest} 
              disabled={currentQIndex === 0}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-500 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-30"
            >
              Previous
            </button>
            <button 
              onClick={handleNextTest}
              disabled={!isCurrentAnswered}
              className="px-10 py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md bg-[#1CB0F6] border-[#1899D6] hover:bg-[#159bd9] disabled:opacity-50 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500"
            >
              {currentQIndex === totalQuestions - 1 ? 'Submit Test' : 'Next Question'}
            </button>
          </div>
        </div>
      )}

      {testPhase === 'reviewing' && (
        <Feedback 
          isCorrect={isCurrentlyCorrect}
          expEn={currentQuestion.expEn}
          expVn={currentQuestion.expVn}
          onPrev={handlePrevReview}
          onNext={handleNextReview}
          isFirst={currentQIndex === 0}
          isLast={currentQIndex === totalQuestions - 1}
        />
      )}

    </div>
  );
}
</file>

<file path="src/tasks/Dictation.jsx">
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { playChime } from '../utils/sound';

const calculateSimilarity = (str1, str2) => {
  const clean = (s) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ").trim();
  const a = clean(str1);
  const b = clean(str2);
  if (a.length === 0) return 0;
  if (a === b) return 1;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  const distance = matrix[b.length][a.length];
  return Math.max(0, 1 - distance / Math.max(a.length, b.length));
};

const checkFormatting = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return { hasCapital: false, hasPunctuation: false };
  const firstChar = trimmed.charAt(0);
  const hasCapital = /^[A-Z]/.test(firstChar); 
  const hasPunctuation = trimmed.endsWith('.');
  return { hasCapital, hasPunctuation };
};

export default function Dictation({ pool, track, savedData = {}, onComplete }) {
  const realWords = useMemo(() => (pool || []).filter(w => w.isReal !== false), [pool]);
  const [wordIndex, setWordIndex] = useState(0);
  
  const [localAnswers, setLocalAnswers] = useState(savedData);
  const initialSaved = savedData[0];
  
  const [gameState, setGameState] = useState(initialSaved?.status === 'perfect' ? 'SAVED_PERFECT' : 'Q'); 
  const [userInput, setUserInput] = useState(initialSaved?.status === 'perfect' ? initialSaved.text : '');
  const [score, setScore] = useState(initialSaved?.status === 'perfect' ? 1 : 0);
  const [userAnswer, setUserAnswer] = useState(initialSaved?.status === 'perfect' ? { isPass: true, percentage: 100, formattingPenalty: false, hasCapital: true, hasPunctuation: true } : null);
  
  const audioState = useRef(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const btnCooldown = useRef(false);
  
  // FIX: Added a cooldown state to prevent the "Enter" key from instantly skipping the feedback panel
  const [canAdvance, setCanAdvance] = useState(false);

  const currentWordObj = realWords[wordIndex];

  const calculateXP = (currentScore) => {
    if (!realWords || realWords.length === 0) return 0;
    return Math.floor((currentScore / realWords.length) * 10);
  };

  const playAudioSequence = useCallback((isManual = false) => {
    if (!currentWordObj) return;

    if (isManual) {
      if (btnCooldown.current) return;
      btnCooldown.current = true;
      setIsBtnDisabled(true);
      setTimeout(() => {
        btnCooldown.current = false;
        setIsBtnDisabled(false);
      }, 500); 
    }

    if (audioState.current) {
      audioState.current.isCancelled = true;
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
        audioState.current.currentAudio.currentTime = 0;
      }
    }

    const state = { isCancelled: false, currentAudio: null };
    audioState.current = state;
    const basePath = import.meta.env.BASE_URL || '/';

    const aDict = new Audio(`${basePath}audio/${track}/dictation_${currentWordObj.word.toLowerCase()}.mp3`);
    // FIX: Removed the 0.85x slowdown to make the audio sound natural

    const playAudioObj = (audioObj) => new Promise((resolve) => {
      state.currentAudio = audioObj;
      audioObj.onended = resolve;
      audioObj.onerror = resolve; 
      audioObj.play().catch(() => resolve());
    });

    const runSequence = async () => {
      if (state.isCancelled) return;
      await playAudioObj(aDict);
    };

    runSequence();
  }, [currentWordObj, track]); 

  useEffect(() => {
    if (gameState === 'Q') {
      const timer = setTimeout(() => playAudioSequence(false), 400);
      return () => clearTimeout(timer);
    }
  }, [gameState, playAudioSequence]);

  useEffect(() => {
    if (wordIndex === 0) return; 

    const saved = localAnswers[wordIndex];
    if (saved && saved.status === 'perfect') {
      setUserInput(saved.text);
      setUserAnswer({ isPass: true, percentage: 100, formattingPenalty: false, hasCapital: true, hasPunctuation: true });
      setGameState('SAVED_PERFECT');
      setScore(s => s + 1);
    } else {
      setUserInput('');
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  // FIX: Cooldown manager for the global Enter key to ensure feedback panels are seen
  useEffect(() => {
    if (gameState === 'SAVED_PERFECT') {
       setCanAdvance(true); // Instant skip allowed for previously perfected sentences
    } else if (gameState !== 'Q') {
      setCanAdvance(false);
      const timer = setTimeout(() => setCanAdvance(true), 600); // 600ms reading window
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (gameState !== 'Q' || !userInput.trim()) return;

    const sim = calculateSimilarity(userInput, currentWordObj.dictSent);
    let percentage = Math.round(sim * 20) * 5; 

    const { hasCapital, hasPunctuation } = checkFormatting(userInput);
    let formattingPenalty = false;

    if (!hasCapital || !hasPunctuation) {
      percentage = Math.max(0, percentage - 5);
      formattingPenalty = true;
    }

    const isPass = percentage >= 85;
    
    if (isPass) {
      setScore(s => s + 1);
      // Only First-Attempt 100% scores get saved permanently
      if (percentage === 100 && !formattingPenalty) {
        setLocalAnswers(prev => ({ ...prev, [wordIndex]: { text: userInput.trim(), status: 'perfect' } }));
      }
    }
    playChime(isPass ? 'correct' : 'incorrect');

    setUserAnswer({ isPass, percentage, formattingPenalty, hasCapital, hasPunctuation });
    setGameState(isPass ? 'A_PASS' : 'A_FAIL');
  };

  const handleNext = (overrideScore) => {
    if (audioState.current) {
      audioState.current.isCancelled = true;
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
      }
    }
    
    const finalScore = overrideScore !== undefined ? overrideScore : score;

    if (wordIndex < realWords.length - 1) {
      setWordIndex(w => w + 1);
    } else {
      onComplete(calculateXP(finalScore), localAnswers);
    }
  };

  const checkRetry = () => {
    if (gameState !== 'A_FAIL') return false;
    const { hasCapital, hasPunctuation } = checkFormatting(userInput);
    const sim = calculateSimilarity(userInput, currentWordObj?.dictSent || "");
    let percentage = Math.round(sim * 20) * 5;
    if (!hasCapital || !hasPunctuation) percentage = Math.max(0, percentage - 5);
    return percentage >= 85 && hasCapital && hasPunctuation;
  };

  const isRetryCorrect = checkRetry();
  const isPassState = gameState === 'A_PASS' || gameState === 'SAVED_PERFECT';

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Global continue listener (only works if canAdvance cooldown has passed)
      if (e.key === 'Enter' && !e.shiftKey && canAdvance) {
        if (isPassState || (gameState === 'A_FAIL' && isRetryCorrect)) {
          e.preventDefault();
          document.getElementById('continue-btn')?.click(); 
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPassState, gameState, isRetryCorrect, canAdvance]);

  if (!currentWordObj) return null;

  return (
    <div className={`min-h-screen flex flex-col font-sans pb-56 lg:pb-40 transition-colors duration-500
      ${isPassState ? 'bg-[#F0FDE6]' : gameState === 'A_FAIL' ? 'bg-[#FFF0F0]' : 'bg-slate-50'}`}>
      
      <TopBar current={wordIndex} total={realWords.length} onQuit={() => onComplete(calculateXP(score), localAnswers)} modeTitle="Dictation" />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-4xl mx-auto mt-2 sm:mt-6">
        
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm sm:text-base mb-4 text-center">
          {gameState === 'Q' ? 'Type the sentence you hear' : gameState === 'SAVED_PERFECT' ? 'Perfect Score Saved!' : isPassState ? 'Excellent Listening!' : 'Review & Correct'}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col mb-8">
          <div className="relative">
            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isPassState}
              autoFocus
              
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              
              /* FIX: Blocks newlines entirely and routes the Enter key straight to Submit */
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  if (gameState === 'Q' && userInput.trim().length > 0) {
                    handleSubmit(e);
                  }
                }
              }}

              placeholder={gameState === 'SAVED_PERFECT' ? '' : "Type what you hear..."}
              
              /* Renders the green-tinted box if the answer was perfected on a previous attempt */
              className={`w-full h-32 sm:h-40 p-5 text-xl sm:text-2xl font-medium text-slate-800 bg-white border-2 rounded-3xl focus:outline-none resize-none transition-all shadow-sm
                ${isPassState ? 'border-[#58A700] text-[#3E7500] disabled:bg-[#F0FDE6]' 
                : gameState === 'A_FAIL' ? (isRetryCorrect ? 'border-[#58A700] focus:border-[#58A700] bg-[#F0FDE6]' : 'border-[#EA2B2B] focus:border-[#EA2B2B] bg-[#FFF0F0]') 
                : 'border-slate-200 focus:border-[#1CB0F6]'}`}
            />
          </div>

          {gameState === 'Q' && (
            <div className="flex justify-center mt-6">
              <button 
                type="submit"
                disabled={!userInput.trim()}
                className="w-full sm:w-auto min-w-[250px] px-8 py-4 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 transition-all shadow-sm"
              >
                Check Answer
              </button>
            </div>
          )}
        </form>

        <div className="text-center">
          <button 
            disabled={isBtnDisabled}
            onClick={() => playAudioSequence(true)}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] flex items-center justify-center shadow-xl transition-all active:scale-95 mx-auto disabled:opacity-80
              ${isPassState ? 'bg-[#58A700] shadow-[#58A700]/30' : gameState === 'A_FAIL' ? 'bg-[#EA2B2B] shadow-[#EA2B2B]/30' : 'bg-[#1CB0F6] hover:bg-[#1899D6] shadow-[#1CB0F6]/30'}`}
          >
            <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </button>
          <p className="mt-3 font-bold text-slate-400 uppercase tracking-widest text-xs">Replay Audio</p>
        </div>

      </div>

      {gameState !== 'Q' && (
        <div className={`fixed bottom-0 left-0 w-full border-t-[6px] p-4 md:p-6 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50
          ${isPassState ? 'bg-[#D7FFB8] border-[#58A700]' : 'bg-[#FFDFE0] border-[#EA2B2B]'}`}>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">

            <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start flex-shrink-0">
              <div className={`flex items-center ${isPassState ? 'text-[#58A700]' : 'text-[#EA2B2B]'} mb-0`}>
                {isPassState ? <CheckCircle2 className="w-10 h-10 mr-2 bg-white rounded-full" /> : <XCircle className="w-10 h-10 mr-2 bg-white rounded-full" />}
                <span className="text-2xl font-black tracking-wide">{gameState === 'SAVED_PERFECT' ? 'Saved!' : isPassState ? 'Great!' : 'Review'}</span>
              </div>
            </div>

            <div className="flex-1 w-full bg-white/50 p-4 rounded-xl border border-white/60 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6">
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest ${isPassState ? 'text-[#468500]' : 'text-[#C9362A]'}`}>
                    Target Sentence
                  </span>
                  <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest bg-white/50 px-2.5 py-0.5 rounded-md ${isPassState ? 'text-[#468500]' : 'text-[#C9362A]'}`}>
                    Accuracy: {userAnswer?.percentage}%
                  </span>
                </div>
                <p className="font-bold text-base sm:text-lg text-slate-800 leading-tight">
                  {currentWordObj.dictSent}
                </p>

                {gameState === 'A_FAIL' && (
                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    {userAnswer?.formattingPenalty && (
                      <span className="bg-[#EA2B2B] text-white px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold flex items-center shadow-sm">
                        <AlertCircle className="w-3 h-3 mr-1" /> Missing Capital/Period (-5%)
                      </span>
                    )}
                    <span className="text-[#C9362A] font-bold text-[11px] sm:text-xs bg-[#FFCCCC]/50 px-2 py-1 rounded-md border border-[#EA2B2B]/20">
                      {(!userAnswer?.hasCapital || !userAnswer?.hasPunctuation) ? "Fix formatting to continue!" : "Retype exactly to continue."}
                    </span>
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px bg-black/10"></div>

              <div className="flex-1 border-t md:border-t-0 border-black/5 pt-3 md:pt-0">
                <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1.5 ${isPassState ? 'text-[#468500]' : 'text-[#C9362A]'}`}>
                  Vietnamese Translation
                </span>
                <p className="font-medium text-sm sm:text-base text-slate-700 italic leading-tight">
                  "{currentWordObj.dictVn}"
                </p>
              </div>

            </div>

            <button
              id="continue-btn"
              disabled={gameState === 'A_FAIL' && !isRetryCorrect}
              onClick={() => {
                if (gameState === 'A_FAIL') {
                  const newScore = score + 1;
                  setScore(newScore);
                  // FIX: We do NOT save it to LocalAnswers here because retries shouldn't be permanent perfects!
                  handleNext(newScore);
                } else {
                  handleNext();
                }
              }}
              className={`w-full lg:w-auto px-10 py-5 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all flex-shrink-0 border-b-[5px] active:border-b-0 active:translate-y-[5px] mt-2 lg:mt-0 
                ${(gameState === 'A_FAIL' && !isRetryCorrect) ? 'bg-slate-300 border-slate-400 cursor-not-allowed opacity-50 text-slate-500' : 'bg-[#58A700] hover:bg-[#468500] border-[#468500]'}`}
            >
              {(gameState === 'A_FAIL' && !isRetryCorrect) ? 'Fix It First' : 'Continue'}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
</file>

</files>
