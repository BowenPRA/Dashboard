// src/data/ESL/CAMP_1A/data.js

import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const CAMP_1A_DATA = {
  meta: {
    id: "CAMP_1A",
    title: "Camp 1A — Thinking Like a Scientist",
    desc: "Teach foundational scientific inquiry alongside critical ESL cause and effect sentence patterns.",
    track: "ESL",
    icon: "Search"
  },
  phases: [
    {
      id: "concept",
      title: "Phase 0: Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 15 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 15 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 20,
      tasks: [
        { id: "SPELLING", dbKey: "p2", maxXP: 15 },
        { id: "DICTATION", dbKey: "p3", maxXP: 15 },
        { id: "READ_COMP", dbKey: "p4", maxXP: 15 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 55,
      tasks: [
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
        { id: "GAMES", dbKey: "p12", maxXP: 5 }
      ]
    }
  ],
  realWords: [
    {
      word: "Hypothesis",
      vn: "Giả thuyết",
      def: "An educated guess or prediction that can be tested through an experiment.",
      vnDef: "Một dự đoán có cơ sở có thể được kiểm chứng thông qua một thí nghiệm.",
      sent: "Before starting the test, the scientist wrote down her hypothesis.",
      vnSent: "Trước khi bắt đầu bài kiểm tra, nhà khoa học đã viết xuống giả thuyết của mình.",
      dictSent: "A good hypothesis uses the if and then structure.",
      isReal: true
    },
    {
      word: "Variable",
      vn: "Biến số",
      def: "Anything that can change or be changed during an experiment.",
      vnDef: "Bất cứ thứ gì có thể thay đổi hoặc bị thay đổi trong quá trình thí nghiệm.",
      sent: "Sunlight was the main variable we changed to see how the plants grew.",
      vnSent: "Ánh sáng mặt trời là biến số chính mà chúng tôi đã thay đổi để xem cây phát triển như thế nào.",
      dictSent: "A scientist changes only one variable at a time.",
      isReal: true
    },
    {
      word: "Method",
      vn: "Phương pháp",
      def: "A carefully planned way of doing something, like a step-by-step process.",
      vnDef: "Một cách làm việc được lên kế hoạch cẩn thận, giống như một quy trình từng bước.",
      sent: "The scientific method helps us find the real truth.",
      vnSent: "Phương pháp khoa học giúp chúng ta tìm ra sự thật thực sự.",
      dictSent: "We followed the method step by step to finish the project.",
      isReal: true
    },
    {
      word: "Condition",
      vn: "Điều kiện",
      def: "The state of something, or the situation needed for something to happen.",
      vnDef: "Trạng thái của một thứ gì đó, hoặc tình huống cần thiết để điều gì đó xảy ra.",
      sent: "A plant needs the right condition to grow, like plenty of water.",
      vnSent: "Cây cần điều kiện thích hợp để phát triển, chẳng hạn như nhiều nước.",
      dictSent: "The condition of the soil was too dry for the flowers.",
      isReal: true
    },
    {
      word: "Observe",
      vn: "Quan sát",
      def: "To watch carefully in order to learn something.",
      vnDef: "Xem xét cẩn thận để học hỏi điều gì đó.",
      sent: "We must observe the insect closely to see what it eats.",
      vnSent: "Chúng ta phải quan sát loài côn trùng thật kỹ để xem nó ăn gì.",
      dictSent: "Scientists observe the world and take careful notes.",
      isReal: true
    },
    {
      word: "Conclusion",
      vn: "Kết luận",
      def: "The final decision or answer reached after thinking about the facts and results.",
      vnDef: "Quyết định hoặc câu trả lời cuối cùng đạt được sau khi suy nghĩ về các sự kiện và kết quả.",
      sent: "After looking at the data, our conclusion was that sugar makes the water boil slower.",
      vnSent: "Sau khi xem xét dữ liệu, kết luận của chúng tôi là đường làm cho nước sôi chậm hơn.",
      dictSent: "Your conclusion must be supported by real facts.",
      isReal: true
    },
    {
      word: "Experiment",
      vn: "Thí nghiệm",
      def: "A scientific test done to find out how something reacts or to prove a hypothesis.",
      vnDef: "Một bài kiểm tra khoa học được thực hiện để tìm hiểu cách phản ứng của một thứ hoặc để chứng minh một giả thuyết.",
      sent: "We did an experiment mixing baking soda and vinegar.",
      vnSent: "Chúng tôi đã làm một thí nghiệm trộn baking soda và giấm.",
      dictSent: "The experiment showed us exactly how the reaction works.",
      isReal: true
    },
    {
      word: "Predict",
      vn: "Dự đoán",
      def: "To say what will happen in the future before it occurs.",
      vnDef: "Nói ra điều gì sẽ xảy ra trong tương lai trước khi nó xảy ra.",
      sent: "Can you predict what will happen if we add heat?",
      vnSent: "Bạn có thể dự đoán điều gì sẽ xảy ra nếu chúng ta thêm nhiệt không?",
      dictSent: "We use a hypothesis to predict the final outcome.",
      isReal: true
    },
    {
      word: "Data",
      vn: "Dữ liệu",
      def: "Facts, numbers, and information collected for study.",
      vnDef: "Các sự kiện, con số và thông tin được thu thập để nghiên cứu.",
      sent: "The computer holds all the data from the math test.",
      vnSent: "Máy tính lưu trữ tất cả dữ liệu từ bài kiểm tra toán.",
      dictSent: "Please record the data in your notebook clearly.",
      isReal: true
    },
    {
      word: "Result",
      vn: "Kết quả",
      def: "Something that happens because of something else; the outcome.",
      vnDef: "Một điều gì đó xảy ra vì một điều gì đó khác; kết quả cuối cùng.",
      sent: "If you mix blue and yellow, the result is green.",
      vnSent: "Nếu bạn trộn màu xanh lam và màu vàng, kết quả là màu xanh lá cây.",
      dictSent: "The result of the test proved that our guess was right.",
      isReal: true
    }
  ],
  fakeWords: [
    { word: "Hypothesizement", imitating: "Hypothesis", isReal: false },
    { word: "Variableness", imitating: "Variable", isReal: false },
    { word: "Methoding", imitating: "Method", isReal: false },
    { word: "Conditionary", imitating: "Condition", isReal: false },
    { word: "Observate", imitating: "Observe", isReal: false },
    { word: "Conclusionize", imitating: "Conclusion", isReal: false },
    { word: "Experimate", imitating: "Experiment", isReal: false },
    { word: "Predictate", imitating: "Predict", isReal: false },
    { word: "Datation", imitating: "Data", isReal: false },
    { word: "Resultance", imitating: "Result", isReal: false }
  ],
  dictation: [
    { sent: "A good hypothesis uses the if and then structure.", vnSent: "Một giả thuyết tốt sử dụng cấu trúc nếu và thì." },
    { sent: "A scientist changes only one variable at a time.", vnSent: "Một nhà khoa học chỉ thay đổi một biến số tại một thời điểm." },
    { sent: "We followed the method step by step to finish the project.", vnSent: "Chúng tôi đã làm theo phương pháp từng bước để hoàn thành dự án." },
    { sent: "The condition of the soil was too dry for the flowers.", vnSent: "Điều kiện của đất quá khô cho những bông hoa." },
    { sent: "Scientists observe the world and take careful notes.", vnSent: "Các nhà khoa học quan sát thế giới và ghi chép cẩn thận." },
    { sent: "Your conclusion must be supported by real facts.", vnSent: "Kết luận của bạn phải được hỗ trợ bởi các sự kiện thực tế." },
    { sent: "The experiment showed us exactly how the reaction works.", vnSent: "Thí nghiệm đã cho chúng tôi thấy chính xác cách phản ứng hoạt động." },
    { sent: "We use a hypothesis to predict the final outcome.", vnSent: "Chúng tôi sử dụng một giả thuyết để dự đoán kết quả cuối cùng." },
    { sent: "Please record the data in your notebook clearly.", vnSent: "Vui lòng ghi lại dữ liệu vào vở của bạn một cách rõ ràng." },
    { sent: "The result of the test proved that our guess was right.", vnSent: "Kết quả của bài kiểm tra đã chứng minh rằng dự đoán của chúng tôi là đúng." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Sleepy Teacher",
      text: "Every morning, Mr. Bowen follows a very strict routine. However, sometimes he forgets to bring his coffee to school. This creates a specific {condition} that affects his whole day. His students quickly learned to {predict} what would happen when he arrived empty-handed. They formed a {hypothesis}: If Mr. Bowen does not have coffee, then he will fall asleep at his desk.",
      vnTitle: "Thầy giáo Buồn ngủ",
      vnText: "Mỗi buổi sáng, thầy Bowen làm theo một thói quen rất nghiêm ngặt. Tuy nhiên, đôi khi thầy ấy quên mang cà phê đến trường. Điều này tạo ra một điều kiện cụ thể ảnh hưởng đến cả ngày của thầy. Các học sinh của thầy nhanh chóng học được cách dự đoán điều gì sẽ xảy ra khi thầy đến tay không. Họ hình thành một giả thuyết: Nếu thầy Bowen không có cà phê, thì thầy sẽ ngủ gật tại bàn làm việc."
    },
    {
      id: "passage_2",
      title: "The Scientific Method in Action",
      text: "When scientists want to learn something new, they follow a step-by-step {method}. First, they ask a question. Next, they make a guess about the answer. Then, they design an {experiment} to test their idea. During the test, they carefully {observe} what happens and record the {data}. Finally, they look at all their notes to reach a final {conclusion}.",
      vnTitle: "Phương pháp Khoa học trong Thực tế",
      vnText: "Khi các nhà khoa học muốn tìm hiểu một điều gì đó mới, họ làm theo một phương pháp từng bước. Đầu tiên, họ đặt một câu hỏi. Tiếp theo, họ đưa ra một dự đoán về câu trả lời. Sau đó, họ thiết kế một thí nghiệm để kiểm tra ý tưởng của mình. Trong quá trình kiểm tra, họ cẩn thận quan sát những gì xảy ra và ghi lại dữ liệu. Cuối cùng, họ xem xét tất cả các ghi chú của mình để đi đến kết luận cuối cùng."
    },
    {
      id: "passage_3",
      title: "The Plant Experiment",
      text: "Mia wanted to know if plants really needed sunlight. She decided to change one {variable} in her garden. She put one plant in the bright sun and one plant in a dark closet. She wrote her idea down: If a plant is hidden in the dark, then it will not grow. After a week, she looked at the {result}. The plant in the dark was dying. Her idea was correct!",
      vnTitle: "Thí nghiệm về Thực vật",
      vnText: "Mia muốn biết liệu thực vật có thực sự cần ánh sáng mặt trời hay không. Cô quyết định thay đổi một biến số trong khu vườn của mình. Cô đặt một cái cây dưới ánh nắng chói chang và một cái cây trong tủ tối. Cô viết ý tưởng của mình xuống: Nếu một cái cây bị giấu trong bóng tối, thì nó sẽ không phát triển. Sau một tuần, cô nhìn vào kết quả. Cây trong bóng tối đang chết dần. Ý tưởng của cô ấy đã đúng!"
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Thinking Like a Scientist",
    vnTitle: "Bài 1A: Suy nghĩ như một nhà Khoa học",
    instructions: "Read the summary of the scientific method. Write down the highlighted vocabulary words and the If-Then formula.",
    vnInstructions: "Đọc tóm tắt về phương pháp khoa học. Chép lại các từ vựng được in đậm và công thức Nếu-Thì.",
    sections: [
      {
        heading: "1. Cause and Effect",
        vnHeading: "1. Nguyên nhân và Kết quả",
        text: "In science, we use conditional statements to show cause and effect. The formula is: **IF + [condition], THEN + [result]**. For example, if you drop a glass, then it will break.",
        vnText: "Trong khoa học, chúng ta sử dụng câu điều kiện để thể hiện nguyên nhân và kết quả. Công thức là: **NẾU + [điều kiện], THÌ + [kết quả]**. Ví dụ, nếu bạn làm rơi một cái ly, thì nó sẽ vỡ."
      },
      {
        heading: "2. The Scientific Method",
        vnHeading: "2. Phương pháp Khoa học",
        text: "A **method** is a step-by-step process. Scientists ask questions, make a **hypothesis**, and run an **experiment**. They **observe** the world carefully and record **data**.",
        vnText: "Một **phương pháp** là một quy trình từng bước. Các nhà khoa học đặt câu hỏi, đưa ra một **giả thuyết**, và tiến hành một **thí nghiệm**. Họ **quan sát** thế giới cẩn thận và ghi lại **dữ liệu**."
      },
      {
        heading: "3. Writing a Hypothesis",
        vnHeading: "3. Viết một Giả thuyết",
        text: "A **hypothesis** is an educated guess. It uses the If-Then structure. You state the **variable** you are changing with IF, and the **result** you predict with THEN.",
        vnText: "Một **giả thuyết** là một dự đoán có cơ sở. Nó sử dụng cấu trúc Nếu-Thì. Bạn nêu **biến số** bạn đang thay đổi bằng từ NẾU, và **kết quả** bạn dự đoán bằng từ THÌ."
      }
    ]
  },
  shortQA: [],
  diagrams: [],
  essay: null,
  assessment,
  notes,
  workbook: null,
  games
};