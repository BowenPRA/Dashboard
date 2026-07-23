// src/data/GED_ENG/ENG_2A/assessment.js
export const assessment = {
  timeLimit: 1800,
  passages: [],
  questions: [
    {
      id: "q1_inline_pausing",
      type: "inline",
      title: "1. Complete the guidance on pausing while delivering a speech.",
      options: [],
      textParts: [
        "When you reach a comma, take a ",
        " pause. When you want the audience to notice a key word, pause ",
        " you say it."
      ],
      blanks: {
        "1": {
          correct: "short",
          options: [
            { val: "short", text: "short" },
            { val: "long", text: "long" },
            { val: "silent", text: "silent" }
          ]
        },
        "2": {
          correct: "before",
          options: [
            { val: "after", text: "after" },
            { val: "before", text: "before" },
            { val: "while", text: "while" }
          ]
        }
      },
      expEn: "A comma gets a short pause and a period gets a full breath. Pausing just before an important word makes the audience lean in and listen for it.",
      expVn: "Dấu phẩy cần một khoảng ngừng ngắn và dấu chấm cần một hơi thở đầy. Ngừng ngay trước một từ quan trọng khiến khán giả chú ý và lắng nghe từ đó."
    },
    {
      id: "q2_mcq_pause_after",
      type: "mcq",
      title: "2. Why is it effective to pause for a few seconds immediately AFTER making a very important point?",
      options: [
        { val: "A", text: "A. It gives the audience time to think about what you just said" },
        { val: "B", text: "B. It shows the audience that you have forgotten your next line" },
        { val: "C", text: "C. It makes the speech finish more quickly" },
        { val: "D", text: "D. It proves that you memorised the whole speech" }
      ],
      correct: "A",
      expEn: "Silence after a key point gives your idea room to land. The audience needs a moment to absorb it before you move on.",
      expVn: "Sự im lặng sau một luận điểm quan trọng cho ý tưởng của bạn không gian để thấm. Khán giả cần một chút thời gian để tiếp thu trước khi bạn chuyển sang phần tiếp theo."
    },
    {
      id: "q3_dnd_techniques",
      type: "dnd",
      title: "3. Drag each delivery technique to the problem it solves.",
      options: [],
      bank: [
        { id: "b1", val: "chunking", text: "Chunking and phrasing" },
        { id: "b2", val: "varying pitch", text: "Varying your pitch" },
        { id: "b3", val: "planted feet", text: "Planting your feet" },
        { id: "b4", val: "reading faster", text: "Reading faster" },
        { id: "b5", val: "looking down", text: "Looking at your notes" }
      ],
      targets: [
        { id: "robot", title: "Sounding like a robot" },
        { id: "rushing", title: "Rushing through sentences" },
        { id: "swaying", title: "Shifting weight nervously" }
      ],
      correctSets: {
        "robot": ["varying pitch"],
        "rushing": ["chunking"],
        "swaying": ["planted feet"]
      },
      expEn: "A flat, unchanging pitch is what makes a voice sound robotic. Chunking breaks long sentences into meaningful groups so you stop rushing. Planted feet stop the nervous swaying that distracts an audience.",
      expVn: "Giọng đều đều, không thay đổi cao độ là điều khiến giọng nói nghe như robot. Chia nhóm từ giúp tách câu dài thành các cụm có nghĩa để bạn không nói vội. Đứng vững hai chân giúp ngăn việc lắc lư lo lắng làm khán giả mất tập trung."
    },
    {
      id: "q4_inline_chunking",
      type: "inline",
      title: "4. Complete the explanation of chunking and phrasing.",
      options: [],
      textParts: [
        "Chunking means grouping words that belong ",
        " so the sentence carries meaning. A speaker who ignores chunking often sounds ",
        " and is hard to follow."
      ],
      blanks: {
        "1": {
          correct: "together",
          options: [
            { val: "together", text: "together" },
            { val: "alphabetically", text: "alphabetically" },
            { val: "loudly", text: "loudly" }
          ]
        },
        "2": {
          correct: "rushed",
          options: [
            { val: "calm", text: "calm" },
            { val: "rushed", text: "rushed" },
            { val: "confident", text: "confident" }
          ]
        }
      },
      expEn: "Chunking groups words into natural units of meaning. Without it, a speaker runs words together and the audience cannot tell where one idea ends and the next begins.",
      expVn: "Chia nhóm từ gom các từ thành những đơn vị nghĩa tự nhiên. Không có nó, người nói sẽ nói liền các từ và khán giả không thể biết một ý kết thúc ở đâu và ý tiếp theo bắt đầu ở đâu."
    },
    {
      id: "q5_mcq_zpattern",
      type: "mcq",
      title: "5. What is the main purpose of using the 'Z-Pattern' while speaking?",
      options: [
        { val: "A", text: "A. To move your eye contact across the whole audience, not just one spot" },
        { val: "B", text: "B. To arrange your notes in the shape of the letter Z" },
        { val: "C", text: "C. To walk from one side of the stage to the other" },
        { val: "D", text: "D. To signal to the audience that the speech is ending" }
      ],
      correct: "A",
      expEn: "The Z-Pattern is an eye-contact route: top-left, top-right, bottom-left, bottom-right. Following it makes every section of the room feel included instead of ignored.",
      expVn: "Z-Pattern là một lộ trình giao tiếp bằng mắt: trên-trái, trên-phải, dưới-trái, dưới-phải. Đi theo nó khiến mọi khu vực trong phòng đều cảm thấy được chú ý thay vì bị bỏ qua."
    },
    {
      id: "q6_inline_vocab",
      type: "inline",
      title: "6. Complete the sentence using the correct unit vocabulary.",
      options: [],
      textParts: [
        "Bao faced a serious ",
        " when he failed Language Arts, but his ",
        " meant he kept studying until he passed."
      ],
      blanks: {
        "1": {
          correct: "challenge",
          options: [
            { val: "achievement", text: "achievement" },
            { val: "challenge", text: "challenge" },
            { val: "purpose", text: "purpose" }
          ]
        },
        "2": {
          correct: "perseverance",
          options: [
            { val: "perseverance", text: "perseverance" },
            { val: "motivation", text: "motivation" },
            { val: "frustration", text: "frustration" }
          ]
        }
      },
      expEn: "A challenge is the difficult thing you face. Perseverance is continuing to try even when it stays difficult.",
      expVn: "Thử thách là điều khó khăn bạn phải đối mặt. Sự kiên trì là tiếp tục cố gắng ngay cả khi mọi việc vẫn còn khó khăn."
    },
    {
      id: "q7_mcq_evidence",
      type: "mcq",
      title: "7. Bao tells the audience that he personally failed Language Arts. How does this function in his speech?",
      options: [
        { val: "A", text: "A. It is evidence that supports his claim that failure is part of success" },
        { val: "B", text: "B. It is an apology for giving a weak speech" },
        { val: "C", text: "C. It is a joke used to make the audience laugh" },
        { val: "D", text: "D. It is a fact with no connection to his main point" }
      ],
      correct: "A",
      expEn: "A claim is what you want the audience to believe; evidence is what makes it believable. Bao's own failure is personal evidence backing his claim that failure is part of success.",
      expVn: "Luận điểm là điều bạn muốn khán giả tin; bằng chứng là điều làm cho nó đáng tin. Thất bại của chính Bao là bằng chứng cá nhân củng cố luận điểm rằng thất bại là một phần của thành công."
    },
    {
      id: "q8_mcq_pacing",
      type: "mcq",
      title: "8. A speaker wants the audience to feel calm and reflective while describing the ocean. What should they do with their pacing?",
      options: [
        { val: "A", text: "A. Slow the pace down and use longer pauses" },
        { val: "B", text: "B. Speak as fast as possible to build excitement" },
        { val: "C", text: "C. Keep the pace exactly the same throughout" },
        { val: "D", text: "D. Raise the volume on every single word" }
      ],
      correct: "A",
      expEn: "Pacing carries emotion. Slowing down with longer pauses creates calm, while a quicker pace builds energy and urgency. Matching pace to mood is the skill.",
      expVn: "Nhịp độ truyền tải cảm xúc. Nói chậm lại với những khoảng ngừng dài hơn tạo cảm giác bình tĩnh, trong khi nhịp độ nhanh hơn tạo năng lượng và sự khẩn trương. Kỹ năng nằm ở việc điều chỉnh nhịp độ theo tâm trạng."
    },
    {
      id: "q9_inline_ruleofthree",
      type: "inline",
      title: "9. Complete the description of two persuasive delivery techniques.",
      options: [],
      textParts: [
        "The Rule of ",
        " groups ideas into memorable sets. Contrastive stress means saying one word more ",
        " than the words around it so the difference stands out."
      ],
      blanks: {
        "1": {
          correct: "Three",
          options: [
            { val: "Two", text: "Two" },
            { val: "Three", text: "Three" },
            { val: "Five", text: "Five" }
          ]
        },
        "2": {
          correct: "strongly",
          options: [
            { val: "quietly", text: "quietly" },
            { val: "strongly", text: "strongly" },
            { val: "quickly", text: "quickly" }
          ]
        }
      },
      expEn: "Sets of three are easy to remember, which is why speakers use them so often. Contrastive stress puts extra force on one word so the audience hears the contrast being drawn.",
      expVn: "Các bộ ba dễ ghi nhớ, đó là lý do người nói sử dụng chúng thường xuyên. Nhấn mạnh tương phản đặt thêm lực vào một từ để khán giả nghe được sự tương phản đang được nêu ra."
    },
    {
      id: "q10_mcq_posture",
      type: "mcq",
      title: "10. Why should a speaker keep their feet planted about shoulder-width apart?",
      options: [
        { val: "A", text: "A. It gives a stable base for steady breathing and stops distracting swaying" },
        { val: "B", text: "B. It makes the speaker appear taller than the audience" },
        { val: "C", text: "C. It is required before the audience is allowed to ask questions" },
        { val: "D", text: "D. It allows the speaker to read notes without looking up" }
      ],
      correct: "A",
      expEn: "A stable stance supports the breath you need to project your voice, and it removes the nervous rocking that pulls an audience's attention away from your words.",
      expVn: "Tư thế đứng vững hỗ trợ hơi thở cần thiết để phát âm rõ ràng, và loại bỏ việc lắc lư lo lắng khiến khán giả mất tập trung khỏi lời nói của bạn."
    }
  ]
};
