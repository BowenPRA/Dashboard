// src/data/GED/ENG_2A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const ENGLISH_2A_DATA = {
  meta: {
    id: "ENG_2A",
    title: "GED English 2A: Speeches",
    desc: "Master the mechanics of public speaking and analyze claims, tone, and theme in real student graduation speeches.",
    track: "GED",
    icon: "Mic"
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
      word: "Perseverance",
      vn: "Sự kiên trì",
      def: "Continued effort to do or achieve something despite difficulties, failure, or opposition.",
      vnDef: "Nỗ lực liên tục để làm hoặc đạt được điều gì đó bất chấp khó khăn, thất bại hoặc sự phản đối.",
      sent: "It takes great perseverance to study for an exam after failing it the first time.", 
      vnSent: "Cần một sự kiên trì lớn lao để học thi sau khi đã trượt ở lần đầu tiên.",
      dictSent: "Perseverance means taking one more step when you feel like giving up.",
      isReal: true
    },
    {
      word: "Resilience",
      vn: "Tính kiên cường",
      def: "The capacity to recover quickly from difficulties; mental or emotional toughness.",
      vnDef: "Khả năng phục hồi nhanh chóng sau những khó khăn; sự cứng cỏi về tinh thần hoặc cảm xúc.",
      sent: "The student showed incredible resilience by returning to school after a family tragedy.",
      vnSent: "Học sinh đã thể hiện tính kiên cường đáng kinh ngạc khi trở lại trường học sau một bi kịch gia đình.",
      dictSent: "Resilience is the ability to bounce back from difficult challenges.",
      isReal: true
    },
    {
      word: "Motivation",
      vn: "Động lực",
      def: "The reason or reasons one has for acting or behaving in a particular way.",
      vnDef: "Lý do hoặc những lý do mà một người có để hành động hoặc cư xử theo một cách cụ thể.",
      sent: "Helping his family have a better life was his primary motivation to graduate.",
      vnSent: "Giúp gia đình có một cuộc sống tốt hơn là động lực chính để cậu ấy tốt nghiệp.",
      dictSent: "Without motivation, it is very difficult to achieve your long-term goals.",
      isReal: true
    },
    {
      word: "Equivalent",
      vn: "Tương đương",
      def: "Equal in value, amount, function, meaning, or status.",
      vnDef: "Bằng nhau về giá trị, số lượng, chức năng, ý nghĩa hoặc trạng thái.",
      sent: "A GED certificate is considered equivalent to a traditional high school diploma.",
      vnSent: "Chứng chỉ GED được coi là tương đương với bằng tốt nghiệp trung học phổ thông truyền thống.",
      dictSent: "The GED test is legally equivalent to a standard high school diploma.",
      isReal: true
    },
    {
      word: "Frustrated",
      vn: "Nản lòng (Bực bội)",
      def: "Feeling or expressing distress and annoyance, especially because of an inability to change or achieve something.",
      vnDef: "Cảm thấy hoặc thể hiện sự đau khổ và bực mình, đặc biệt là do không có khả năng thay đổi hoặc đạt được điều gì đó.",
      sent: "She grew frustrated when she failed the math test for the second time.",
      vnSent: "Cô ấy trở nên nản lòng khi trượt bài kiểm tra toán lần thứ hai.",
      dictSent: "It is normal to feel frustrated when you face unexpected setbacks.",
      isReal: true
    },
    {
      word: "Overcome",
      vn: "Vượt qua",
      def: "Succeed in dealing with a problem, difficulty, or obstacle.",
      vnDef: "Thành công trong việc giải quyết một vấn đề, khó khăn hoặc trở ngại.",
      sent: "With hard work and focus, he was able to overcome his fear of public speaking.",
      vnSent: "Với sự chăm chỉ và tập trung, anh ấy đã có thể vượt qua nỗi sợ nói trước đám đông.",
      dictSent: "You must find the courage to overcome your fear of failure.",
      isReal: true
    },
    {
      word: "Trapped",
      vn: "Mắc kẹt",
      def: "Prevented from escaping from a place, situation, or negative state of mind.",
      vnDef: "Bị ngăn cản trốn thoát khỏi một nơi chốn, tình huống, hoặc trạng thái tinh thần tiêu cực.",
      sent: "After his father passed away, he felt trapped in a deep and heavy sadness.",
      vnSent: "Sau khi cha qua đời, cậu ấy cảm thấy mắc kẹt trong một nỗi buồn sâu thẳm và nặng nề.",
      dictSent: "A new sense of purpose can stop your mind from feeling trapped.",
      isReal: true
    },
    {
      word: "Achievement",
      vn: "Thành tựu",
      def: "A thing done successfully, typically by effort, courage, or skill.",
      vnDef: "Một điều được thực hiện thành công, thường là nhờ nỗ lực, lòng can đảm hoặc kỹ năng.",
      sent: "Graduating at the top of the class is a massive academic achievement.",
      vnSent: "Tốt nghiệp thủ khoa là một thành tựu học tập to lớn.",
      dictSent: "Receiving your graduation certificate is a wonderful achievement.",
      isReal: true
    },
    {
      word: "Challenge",
      vn: "Thử thách",
      def: "A task or situation that tests someone's abilities and requires great physical or mental effort.",
      vnDef: "Một nhiệm vụ hoặc tình huống kiểm tra khả năng của một người và đòi hỏi nỗ lực lớn về thể chất hoặc tinh thần.",
      sent: "Learning to speak a new language fluently is an incredibly difficult challenge.",
      vnSent: "Học cách nói trôi chảy một ngôn ngữ mới là một thử thách vô cùng khó khăn.",
      dictSent: "Every new challenge you face will help shape your character.",
      isReal: true
    },
    {
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason for which something is done or created, or the reason a person feels they exist.",
      vnDef: "Lý do mà một việc được thực hiện hoặc tạo ra, hoặc lý do một người cảm thấy họ tồn tại.",
      sent: "Getting a job gave him a new sense of purpose and helped clear his mind.",
      vnSent: "Có được một công việc mang lại cho anh ấy một ý thức mới về mục đích và giúp giải tỏa tâm trí anh ấy.",
      dictSent: "A speaker uses hand gestures to emphasize their true purpose.",
      isReal: true
    }
  ],
  dictation: [
    { sent: "Perseverance means taking one more step when you feel like giving up.", vnSent: "Kiên trì có nghĩa là bước thêm một bước nữa khi bạn cảm thấy muốn bỏ cuộc." },
    { sent: "Resilience is the ability to bounce back from difficult challenges.", vnSent: "Kiên cường là khả năng phục hồi sau những thử thách khó khăn." },
    { sent: "Without motivation, it is very difficult to achieve your long-term goals.", vnSent: "Không có động lực, rất khó để đạt được các mục tiêu dài hạn của bạn." },
    { sent: "The GED test is legally equivalent to a standard high school diploma.", vnSent: "Bài kiểm tra GED tương đương về mặt pháp lý với bằng tốt nghiệp trung học phổ thông tiêu chuẩn." },
    { sent: "It is normal to feel frustrated when you face unexpected setbacks.", vnSent: "Cảm thấy nản lòng khi đối mặt với những thất bại bất ngờ là chuyện bình thường." },
    { sent: "You must find the courage to overcome your fear of failure.", vnSent: "Bạn phải tìm thấy lòng can đảm để vượt qua nỗi sợ thất bại của mình." },
    { sent: "A new sense of purpose can stop your mind from feeling trapped.", vnSent: "Một ý thức mới về mục đích có thể ngăn tâm trí bạn cảm thấy bị mắc kẹt." },
    { sent: "Receiving your graduation certificate is a wonderful achievement.", vnSent: "Nhận được bằng tốt nghiệp của bạn là một thành tựu tuyệt vời." },
    { sent: "Every new challenge you face will help shape your character.", vnSent: "Mỗi thử thách mới mà bạn đối mặt sẽ giúp định hình tính cách của bạn." },
    { sent: "A speaker uses hand gestures to emphasize their true purpose.", vnSent: "Người diễn thuyết sử dụng cử chỉ tay để nhấn mạnh mục đích thực sự của họ." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Art of Delivery",
      text: "Standing on a stage can be an intimidating {challenge} for anyone. However, understanding the mechanics of public speaking can help you {overcome} your nerves. A great speaker stands tall, breathes deeply from their belly, and uses purposeful hand gestures. By maintaining a slow pace and using silence effectively, a speaker can highlight their main {purpose} and connect with their audience.",
      vnTitle: "Nghệ thuật Trình bày",
      vnText: "Đứng trên sân khấu có thể là một {challenge} (thử thách) đáng sợ đối với bất kỳ ai. Tuy nhiên, hiểu được các kỹ thuật nói trước công chúng có thể giúp bạn {overcome} (vượt qua) sự lo lắng của mình. Một diễn giả giỏi đứng thẳng, hít thở sâu từ bụng và sử dụng các cử chỉ tay có chủ đích. Bằng cách duy trì nhịp độ chậm rãi và sử dụng sự im lặng một cách hiệu quả, người diễn thuyết có thể làm nổi bật {purpose} (mục đích) chính của họ và kết nối với khán giả."
    },
    {
      id: "passage_2",
      title: "Analyzing Bao's Journey",
      text: "When reading Bao's speech, we see a clear theme about the reality of success. He explains that getting a GED, which is {equivalent} to a high school diploma, is a massive {achievement}. But he does not hide his struggles. He admits to feeling {frustrated} when he failed Language Arts. By using his own failure as evidence, he makes a powerful claim: failure is not the opposite of success, but a necessary part of it.",
      vnTitle: "Phân tích Hành trình của Bảo",
      vnText: "Khi đọc bài diễn văn của Bảo, chúng ta thấy một chủ đề rõ ràng về thực tế của sự thành công. Cậu ấy giải thích rằng việc lấy được GED, chứng chỉ {equivalent} (tương đương) với bằng trung học phổ thông, là một {achievement} (thành tựu) to lớn. Nhưng cậu ấy không giấu giếm những khó khăn của mình. Cậu ấy thừa nhận đã cảm thấy {frustrated} (nản lòng) khi trượt môn Ngữ Văn Tiếng Anh. Bằng cách sử dụng chính thất bại của mình làm bằng chứng, cậu ấy đưa ra một lập luận mạnh mẽ: thất bại không phải là điều trái ngược với thành công, mà là một phần tất yếu của nó."
    },
    {
      id: "passage_3",
      title: "Khoi's Story of Strength",
      text: "Khoi's graduation speech is a moving testament to emotional {resilience}. After losing his father, he felt completely {trapped} in darkness and lost his {motivation} to continue school. However, by taking small, daily steps and finding work, he learned true {perseverance}. His speech shifts from a tone of grief to one of hope, proving that even in our darkest moments, we can find the strength to keep moving forward.",
      vnTitle: "Câu chuyện về Sức mạnh của Khôi",
      vnText: "Bài diễn văn tốt nghiệp của Khôi là một minh chứng cảm động cho {resilience} (tính kiên cường) về mặt cảm xúc. Sau khi mất cha, cậu ấy cảm thấy hoàn toàn {trapped} (mắc kẹt) trong bóng tối và đánh mất {motivation} (động lực) để tiếp tục đi học. Tuy nhiên, bằng cách thực hiện những bước đi nhỏ mỗi ngày và tìm kiếm công việc, cậu ấy đã học được {perseverance} (sự kiên trì) thực sự. Bài phát biểu của cậu ấy chuyển từ giọng điệu đau buồn sang hy vọng, chứng minh rằng ngay cả trong những khoảnh khắc đen tối nhất, chúng ta vẫn có thể tìm thấy sức mạnh để tiếp tục tiến lên."
    }
  ],
  notebookArticle: {
    title: "Unit 2A: Public Speaking & Speech Analysis",
    vnTitle: "Bài 2A: Nói trước Công chúng & Phân tích Diễn văn",
    instructions: "Read the following summary carefully. Write down the highlighted concepts in your notebook.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các khái niệm được in đậm vào vở bài tập của bạn.",
    sections: [
      {
        heading: "1. Mechanics of Delivery",
        vnHeading: "1. Kỹ năng Trình bày",
        text: "Great delivery requires strong **Posture**, deliberate **Pacing**, and purposeful **Hand Gestures**. Using a **Pause** before or after a key claim is one of the most effective ways to build suspense and emphasize your point.",
        vnText: "Việc trình bày xuất sắc đòi hỏi **Tư thế** vững vàng, **Nhịp độ** từ tốn, và **Cử chỉ Tay** có mục đích. Sử dụng một **Khoảng lặng** trước hoặc sau một luận điểm chính là một trong những cách hiệu quả nhất để tạo sự hồi hộp và nhấn mạnh ý của bạn."
      },
      {
        heading: "2. Claims and Evidence",
        vnHeading: "2. Luận điểm và Bằng chứng",
        text: "In a speech, an author's **Claim** is the main argument they want the audience to believe. Speakers often use highly personal stories or struggles as **Evidence** to prove their claims are realistic and true.",
        vnText: "Trong một bài diễn văn, **Luận điểm** của tác giả là lập luận chính mà họ muốn khán giả tin tưởng. Các diễn giả thường sử dụng những câu chuyện hoặc khó khăn mang tính cá nhân sâu sắc làm **Bằng chứng** để chứng minh luận điểm của họ là thực tế và đúng đắn."
      },
      {
        heading: "3. Analyzing Tone",
        vnHeading: "3. Phân tích Giọng điệu",
        text: "A speech does not have one single feeling. A speaker will often shift their **Tone**—for example, starting with a grieving or somber tone when discussing a tragedy, and shifting to a hopeful and inspiring tone in the conclusion.",
        vnText: "Một bài diễn văn không chỉ có một cảm xúc duy nhất. Một diễn giả thường sẽ thay đổi **Giọng điệu** của họ—ví dụ, bắt đầu bằng giọng điệu đau buồn hoặc ảm đạm khi thảo luận về một bi kịch, và chuyển sang giọng điệu hy vọng và đầy cảm hứng ở phần kết luận."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "In public speaking, why is it effective to pause for a few seconds immediately after making a very important point?",
      requiredWords: [["absorb", "think", "understand", "impact"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it gives the audience time to process the information.",
        "1 mark for explaining that it emphasizes the emotional impact of the claim."
      ],
      modelAnswer: "Pausing gives the audience time to fully absorb and think about what was just said, which emphasizes the emotional impact of the speaker's main claim."
    },
    {
      id: "q2",
      question: "How does Bao use his personal failure (failing Language Arts) as evidence in his speech?",
      requiredWords: [["claim", "point", "argue", "success"], ["part", "opposite"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for mentioning his main claim (failure is part of success, not the opposite).",
        "1 mark for explaining that sharing a personal story makes the claim more realistic and believable."
      ],
      modelAnswer: "Bao uses the story of his failure to support his main claim that failure is a normal part of success. Sharing this personal struggle makes his argument much more believable and relatable to the audience."
    },
    {
      id: "q3",
      question: "What is the 'Z-Pattern' in public speaking, and what is its main purpose?",
      requiredWords: [["eye", "eyes", "contact"], ["audience", "room", "listeners"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for defining it as a method of making eye contact across different parts of the room.",
        "1 mark for stating that its purpose is to keep the entire audience engaged and connected."
      ],
      modelAnswer: "The Z-Pattern is a technique where the speaker makes eye contact by scanning the back left, back right, and then the front of the room. Its purpose is to ensure the entire audience feels connected and engaged."
    }
  ],
  diagrams: [
    {
      id: "d1",
      imageUrl: "/images/GED/stance_diagram.png", // Assuming a generic path for the app to render
      promptText: "Look at the diagram showing correct posture and stance. Why is it important to keep your feet planted shoulder-width apart rather than shifting your weight back and forth?",
      requiredWords: [["nervous", "nervousness", "distracting", "confidence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that shifting weight makes the speaker look nervous.",
        "1 mark for explaining that a planted stance projects confidence and authority."
      ],
      modelAnswer: "Shifting your weight back and forth is distracting and makes you look incredibly nervous. Keeping your feet planted shoulder-width apart projects stability, authority, and confidence to the audience."
    },
    {
      id: "d2",
      imageUrl: "/images/GED/speech_structure.png",
      promptText: "Review the graphic showing the structure of an argument. According to the lesson, how does a speaker's 'Tone' influence how the audience receives the 'Evidence'?",
      requiredWords: [["emotion", "feelings", "attitude", "serious"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for defining tone as the speaker's emotional attitude.",
        "1 mark for explaining that a serious or appropriate tone makes the evidence feel more impactful and trustworthy."
      ],
      modelAnswer: "Tone is the emotional attitude behind the words. If a speaker uses a serious, authentic tone when presenting their evidence, the audience is much more likely to trust them and feel the impact of the argument."
    }
  ],
  essay: {
    task: "In his graduation speech, Khoi redefines the word 'perseverance'. Write a short essay explaining what his new definition is, and analyze how he uses the tragic evidence of his father's passing to support this new definition.",
    guidelines: [
      "State Khoi's definition of perseverance (taking one more step when you want to give up).",
      "Describe the specific evidence (the tragedy) he experienced.",
      "Analyze how surviving that tragedy proves his claim about perseverance."
    ],
    requiredWords: [
      ["perseverance", "keep going", "step"], 
      ["evidence", "tragedy", "father", "passed away"],
      ["claim", "prove", "support"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately stating Khoi's definition of perseverance.",
      "1 mark for identifying the death of his father as the primary evidence.",
      "1 mark for logically connecting the evidence to the claim (surviving immense grief proves that just taking 'one step' is a massive victory)."
    ],
    modelAnswer: "In his speech, Khoi makes the claim that perseverance does not mean being strong every day; rather, it simply means 'taking one more step when you feel like giving up.' To support this claim, he uses the tragic evidence of his father passing away. When facing such overwhelming grief, he lost his motivation and felt trapped. By using this extreme personal tragedy as evidence, Khoi successfully proves his point to the audience: when life is at its darkest, you do not need to be a superhero. Just deciding to take one small step forward is the ultimate form of perseverance."
  },
  assessment,
  notes,
  workbook,
  games
};