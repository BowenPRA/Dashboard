// src/data/Y9/Math_1A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const MATH_1A_DATA = {
  meta: {
    id: "MATH_1A",
    title: "Correlation & Scatter Graphs",
    desc: "Introduction to bivariate data, scatter graphs, and identifying correlation trends in scientific data.",
    track: "Y9",
    icon: "ScatterChart"
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
    { word: "Correlation", vn: "Sự tương quan", def: "A connection or relationship between two things.", vnDef: "Sự kết nối hoặc mối quan hệ giữa hai sự vật.", sent: "There is a strong correlation between heavy rain and flooding.", vnSent: "Có một sự tương quan mạnh mẽ giữa mưa lớn và ngập lụt.", dictSent: "Correlation does not always mean that one thing causes another.", isReal: true },
    { word: "Variable", vn: "Biến số", def: "Something that can change or be measured, like temperature or height.", vnDef: "Một thứ gì đó có thể thay đổi hoặc được đo lường, như nhiệt độ hoặc chiều cao.", sent: "In this experiment, the amount of sunlight is the independent variable.", vnSent: "Trong thí nghiệm này, lượng ánh sáng mặt trời là biến độc lập.", dictSent: "A scatter graph shows the relationship between two variables.", isReal: true },
    { word: "Scatter Graph", vn: "Biểu đồ phân tán", def: "A graph that uses dots to show the relationship between two variables.", vnDef: "Một biểu đồ sử dụng các dấu chấm để thể hiện mối quan hệ giữa hai biến số.", sent: "We plotted the data on a scatter graph to look for a pattern.", vnSent: "Chúng tôi đã vẽ dữ liệu trên một biểu đồ phân tán để tìm kiếm một quy luật.", dictSent: "A scatter graph shows the relationship between two variables.", isReal: true },
    { word: "Axis", vn: "Trục", def: "The horizontal (X) and vertical (Y) lines used to measure data on a graph.", vnDef: "Các đường ngang (X) và dọc (Y) được sử dụng để đo lường dữ liệu trên một biểu đồ.", sent: "Make sure you label the x-axis and the y-axis clearly.", vnSent: "Hãy chắc chắn rằng bạn dán nhãn trục x và trục y rõ ràng.", dictSent: "We use the x-axis and y-axis to graph our data.", isReal: true },
    { word: "Coordinate", vn: "Tọa độ", def: "A pair of numbers that shows exactly where a point belongs on a grid.", vnDef: "Một cặp số cho thấy chính xác vị trí của một điểm trên lưới.", sent: "Plot the coordinate (4, 5) on your graph paper.", vnSent: "Hãy vẽ tọa độ (4, 5) trên giấy vẽ đồ thị của bạn.", dictSent: "An outlier is a point that does not fit the pattern.", isReal: true },
    { word: "Positive Correlation", vn: "Tương quan dương", def: "A relationship where both variables increase together.", vnDef: "Một mối quan hệ trong đó cả hai biến số cùng tăng.", sent: "There is a positive correlation between studying and high test scores.", vnSent: "Có một sự tương quan dương giữa việc học hành và điểm thi cao.", dictSent: "Positive correlation means both variables increase at the same time.", isReal: true },
    { word: "Negative Correlation", vn: "Tương quan âm", def: "A relationship where one variable increases while the other decreases.", vnDef: "Một mối quan hệ trong đó một biến số tăng trong khi biến số kia giảm.", sent: "The graph showed a negative correlation between temperature and coat sales.", vnSent: "Biểu đồ cho thấy sự tương quan âm giữa nhiệt độ và doanh số bán áo khoác.", dictSent: "Negative correlation occurs when one variable decreases as the other increases.", isReal: true },
    { word: "Strong Correlation", vn: "Tương quan mạnh", def: "When the data points on a graph are packed closely together in a clear line.", vnDef: "Khi các điểm dữ liệu trên biểu đồ được xếp chặt chẽ với nhau thành một đường rõ ràng.", sent: "The dots form a straight line, indicating a very strong correlation.", vnSent: "Các dấu chấm tạo thành một đường thẳng, cho thấy một sự tương quan rất mạnh.", dictSent: "If the points are closely packed, the correlation is very strong.", isReal: true },
    { word: "Weak Correlation", vn: "Tương quan yếu", def: "When the data points follow a general direction but are spread far apart.", vnDef: "Khi các điểm dữ liệu đi theo một hướng chung nhưng nằm cách xa nhau.", sent: "Because the dots are scattered widely, it is only a weak correlation.", vnSent: "Bởi vì các dấu chấm bị phân tán rộng, nó chỉ là một sự tương quan yếu.", dictSent: "A weak correlation has data points that are widely spread out.", isReal: true },
    { word: "Trend", vn: "Xu hướng", def: "The general direction in which the data points are moving.", vnDef: "Hướng đi chung mà các điểm dữ liệu đang di chuyển.", sent: "By looking at the trend on the graph, we can predict future results.", vnSent: "Bằng cách nhìn vào xu hướng trên biểu đồ, chúng ta có thể dự đoán kết quả trong tương lai.", dictSent: "Scientists look for trends in the data to make accurate predictions.", isReal: true }
  ],
  fakeWords: [
    { word: "Correlance", imitating: "Correlation", isReal: false },
    { word: "Variate", imitating: "Variable", isReal: false },
    { word: "Scatterment", imitating: "Scatter Graph", isReal: false },
    { word: "Axises", imitating: "Axis", isReal: false },
    { word: "Coordinance", imitating: "Coordinate", isReal: false },
    { word: "Positivity", imitating: "Positive Correlation", isReal: false },
    { word: "Negativity", imitating: "Negative Correlation", isReal: false },
    { word: "Strongness", imitating: "Strong Correlation", isReal: false },
    { word: "Weakity", imitating: "Weak Correlation", isReal: false },
    { word: "Trendency", imitating: "Trend", isReal: false }
  ],
  dictation: [
    { sent: "A scatter graph shows the relationship between two variables.", vnSent: "Biểu đồ phân tán cho thấy mối quan hệ giữa hai biến số." },
    { sent: "We use the x-axis and y-axis to graph our data.", vnSent: "Chúng tôi sử dụng trục x và trục y để vẽ biểu đồ dữ liệu của mình." },
    { sent: "Positive correlation means both variables increase at the same time.", vnSent: "Tương quan dương có nghĩa là cả hai biến số cùng tăng." },
    { sent: "Negative correlation occurs when one variable decreases as the other increases.", vnSent: "Tương quan âm xảy ra khi một biến số giảm trong khi biến số kia tăng." },
    { sent: "If the points are closely packed, the correlation is very strong.", vnSent: "Nếu các điểm được xếp chặt chẽ, sự tương quan là rất mạnh." },
    { sent: "A weak correlation has data points that are widely spread out.", vnSent: "Một sự tương quan yếu có các điểm dữ liệu nằm cách xa nhau." },
    { sent: "Zero correlation means there is no pattern on the graph.", vnSent: "Không có sự tương quan có nghĩa là không có quy luật nào trên biểu đồ." },
    { sent: "Scientists look for trends in the data to make accurate predictions.", vnSent: "Các nhà khoa học tìm kiếm các xu hướng trong dữ liệu để đưa ra các dự đoán chính xác." },
    { sent: "An outlier is a point that does not fit the pattern.", vnSent: "Một giá trị ngoại lai là một điểm không phù hợp với quy luật." },
    { sent: "Correlation does not always mean that one thing causes another.", vnSent: "Sự tương quan không phải lúc nào cũng có nghĩa là một điều gây ra điều kia." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Taller, The Faster?",
      text: "In science and mathematics, we often want to know if two things are connected. These things are called variables. For example, is there a {correlation} between a student's height and how fast they can run? To find out, a scientist would measure the height of fifty students and then time how fast they can sprint. By looking at these two {variables} together, we can discover if being taller actually makes you a faster runner.",
      vnTitle: "Càng cao thì càng nhanh?",
      vnText: "Trong khoa học và toán học, chúng ta thường muốn biết liệu hai sự vật có liên quan với nhau hay không. Những thứ này được gọi là biến số. Ví dụ, có sự tương quan nào giữa chiều cao của một học sinh và tốc độ họ có thể chạy không? Để tìm hiểu, một nhà khoa học sẽ đo chiều cao của năm mươi học sinh và sau đó bấm giờ xem họ có thể chạy nước rút nhanh như thế nào. Bằng cách xem xét hai biến số này cùng nhau, chúng ta có thể khám phá ra liệu việc cao hơn có thực sự khiến bạn trở thành một người chạy nhanh hơn hay không."
    },
    {
      id: "passage_2",
      title: "Plotting the Dots",
      text: "Once we have collected our data, reading a list of numbers can be very confusing. This is why mathematicians use a {scatter} graph. By drawing an X-axis and a Y-axis, we create a mathematical grid. Every student becomes a single {coordinate} on this grid. When we plot all fifty dots, a visual {trend} appears, making it incredibly easy for our brains to see the relationship.",
      vnTitle: "Vẽ các dấu chấm",
      vnText: "Sau khi chúng ta đã thu thập dữ liệu của mình, việc đọc một danh sách các con số có thể rất khó hiểu. Đây là lý do tại sao các nhà toán học sử dụng biểu đồ phân tán. Bằng cách vẽ một trục X và một trục Y, chúng ta tạo ra một lưới toán học. Mỗi học sinh trở thành một tọa độ duy nhất trên lưới này. Khi chúng ta vẽ tất cả năm mươi dấu chấm, một xu hướng hình ảnh xuất hiện, khiến bộ não của chúng ta vô cùng dễ dàng nhìn thấy mối quan hệ."
    },
    {
      id: "passage_3",
      title: "The Trap of Coincidence",
      text: "It is easy to spot a {positive} correlation on a graph, but we must be careful. Just because two things grow at the same time does not mean one causes the other. For instance, in the summer, ice cream sales go up. At the same time, the number of sunburns goes up. This is a {strong} correlation. However, eating ice cream does not cause sunburns! Both variables are simply caused by the hot weather.",
      vnTitle: "Cạm bẫy của Sự trùng hợp",
      vnText: "Thật dễ dàng để phát hiện ra một sự tương quan dương trên biểu đồ, nhưng chúng ta phải cẩn thận. Chỉ vì hai thứ cùng phát triển không có nghĩa là cái này gây ra cái kia. Ví dụ, vào mùa hè, doanh số bán kem tăng lên. Đồng thời, số lượng người bị cháy nắng cũng tăng lên. Đây là một sự tương quan mạnh mẽ. Tuy nhiên, ăn kem không gây ra cháy nắng! Cả hai biến số đơn giản chỉ là do thời tiết nắng nóng gây ra."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Correlation & Scatter Graphs",
    vnTitle: "Bài 1A: Tương quan & Biểu đồ phân tán",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. The Coordinate Grid",
        vnHeading: "1. Lưới Tọa độ",
        text: "We use a **Scatter Graph** to plot data points. The horizontal line is the X-**Axis** and the vertical line is the Y-**Axis**. Each point is a single **Coordinate** that represents two **Variables**.",
        vnText: "Chúng ta sử dụng Biểu đồ phân tán (**Scatter Graph**) để vẽ các điểm dữ liệu. Đường ngang là Trục (**Axis**) X và đường dọc là Trục (**Axis**) Y. Mỗi điểm là một Tọa độ (**Coordinate**) duy nhất đại diện cho hai Biến số (**Variables**)."
      },
      {
        heading: "2. Types of Correlation",
        vnHeading: "2. Các loại Tương quan",
        text: "When comparing data, a **Positive Correlation** means both variables go up together. A **Negative Correlation** means one goes up while the other goes down.",
        vnText: "Khi so sánh dữ liệu, Tương quan dương (**Positive Correlation**) có nghĩa là cả hai biến số cùng tăng. Tương quan âm (**Negative Correlation**) có nghĩa là một biến số tăng trong khi biến số kia giảm."
      },
      {
        heading: "3. Identifying Trends",
        vnHeading: "3. Xác định Xu hướng",
        text: "If the dots are packed tightly together, the **Correlation** is **Strong**. If the dots are spread far apart, it is **Weak**. Following this **Trend** helps scientists make accurate predictions.",
        vnText: "Nếu các dấu chấm được xếp chặt chẽ với nhau, Sự tương quan (**Correlation**) là Mạnh (**Strong**). Nếu các dấu chấm nằm cách xa nhau, nó là Yếu (**Weak**). Theo dõi Xu hướng (**Trend**) này giúp các nhà khoa học đưa ra những dự đoán chính xác."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Describe the visual difference between a positive correlation and a negative correlation on a scatter graph.",
      requiredWords: [["upward", "up", "increase", "increases"], ["downward", "down", "decrease", "decreases"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a positive correlation slopes upward (from left to right) or that both variables increase together.",
        "1 mark for stating that a negative correlation slopes downward (from left to right) or that one variable decreases as the other increases."
      ],
      modelAnswer: "A positive correlation visually slopes upward from left to right, while a negative correlation visually slopes downward."
    },
    {
      id: "q2",
      question: "Look at a scatter graph. How can you tell if the correlation between two variables is strong or weak?",
      requiredWords: [["close", "closely", "packed", "tight"], ["spread", "scattered", "far", "apart"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that strong correlation means the data points are packed closely together.",
        "1 mark for stating that weak correlation means the data points are spread further apart."
      ],
      modelAnswer: "A strong correlation has data points that are packed closely together. A weak correlation has data points that are spread far apart."
    },
    {
      id: "q3",
      question: "Why do mathematicians plot bivariate data (two variables) on a coordinate grid instead of just reading a table of numbers?",
      requiredWords: [["visual", "see", "easier", "picture"], ["trend", "pattern", "relationship", "trends"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying that graphing makes the data visual or easier to see.",
        "1 mark for explaining that it allows us to quickly identify trends, patterns, or relationships between the two variables."
      ],
      modelAnswer: "Graphing makes the data highly visual, allowing mathematicians to quickly identify trends or patterns that are hidden in a table of numbers."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 20 L 50 200 L 350 200" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="200" y="235" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Outside Temperature (°C)</text>
        <text x="20" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle" transform="rotate(-90 20 110)">Soup Sales ($)</text>
        <circle cx="80" cy="50" r="6" fill="#0ea5e9"/>
        <circle cx="95" cy="40" r="6" fill="#0ea5e9"/>
        <circle cx="110" cy="65" r="6" fill="#0ea5e9"/>
        <circle cx="130" cy="80" r="6" fill="#0ea5e9"/>
        <circle cx="150" cy="70" r="6" fill="#0ea5e9"/>
        <circle cx="160" cy="95" r="6" fill="#0ea5e9"/>
        <circle cx="180" cy="110" r="6" fill="#0ea5e9"/>
        <circle cx="190" cy="125" r="6" fill="#0ea5e9"/>
        <circle cx="210" cy="100" r="6" fill="#0ea5e9"/>
        <circle cx="230" cy="140" r="6" fill="#0ea5e9"/>
        <circle cx="250" cy="130" r="6" fill="#0ea5e9"/>
        <circle cx="270" cy="165" r="6" fill="#0ea5e9"/>
        <circle cx="290" cy="155" r="6" fill="#0ea5e9"/>
        <circle cx="310" cy="180" r="6" fill="#0ea5e9"/>
        <circle cx="320" cy="170" r="6" fill="#0ea5e9"/>
        <path d="M 70 35 L 330 185" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="6, 6" stroke-linecap="round"/>
      </svg>`,
      promptText: "Analyze the provided scatter graph. Describe the direction and strength of the correlation shown between the two variables.",
      requiredWords: [["negative", "downward"], ["strong", "tight", "close"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for correctly identifying the direction as a negative correlation.",
        "1 mark for correctly identifying the strength as a strong correlation."
      ],
      modelAnswer: "The scatter graph shows a strong negative correlation between the outside temperature and soup sales."
    },
    {
      id: "d2",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 20 L 50 200 L 350 200" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="200" y="235" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Hours of Sleep</text>
        <text x="20" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle" transform="rotate(-90 20 110)">Test Score (%)</text>
        <circle cx="90" cy="170" r="6" fill="#fb923c"/>
        <circle cx="110" cy="120" r="6" fill="#fb923c"/>
        <circle cx="130" cy="190" r="6" fill="#fb923c"/>
        <circle cx="140" cy="100" r="6" fill="#fb923c"/>
        <circle cx="160" cy="150" r="6" fill="#fb923c"/>
        <circle cx="180" cy="80" r="6" fill="#fb923c"/>
        <circle cx="210" cy="160" r="6" fill="#fb923c"/>
        <circle cx="230" cy="60" r="6" fill="#fb923c"/>
        <circle cx="250" cy="110" r="6" fill="#fb923c"/>
        <circle cx="270" cy="180" r="6" fill="#fb923c"/>
        <circle cx="290" cy="70" r="6" fill="#fb923c"/>
        <circle cx="310" cy="130" r="6" fill="#fb923c"/>
        <circle cx="330" cy="50" r="6" fill="#fb923c"/>
      </svg>`,
      promptText: "Examine the second scatter graph. Describe the direction and strength of the correlation shown, and explain how you know the strength.",
      requiredWords: [["positive", "upward"], ["weak", "spread", "scattered", "apart"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for correctly identifying it as a weak positive correlation.",
        "1 mark for explaining that it is weak because the data points are spread far apart."
      ],
      modelAnswer: "This graph shows a weak positive correlation. We know it is weak because the data points are spread widely apart rather than forming a tight line."
    }
  ],
  essay: {
    task: "Explain how to determine the strength and direction of a correlation on a scatter graph, and provide one real-world example of a positive correlation.",
    guidelines: [
      "Define what makes a correlation positive or negative.",
      "Explain the difference between a strong and weak correlation visually.",
      "Provide a logical real-world example."
    ],
    requiredWords: [
      ["direction", "positive", "negative"], 
      ["strength", "strong", "weak", "spread", "tight"],
      ["example", "instance"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for explaining direction (positive goes up, negative goes down).",
      "1 mark for explaining strength (strong is closely packed, weak is spread apart).",
      "1 mark for providing a valid real-world example of a positive correlation."
    ],
    modelAnswer: "To determine direction, look at the slope; a positive correlation slopes upward, while a negative correlation slopes downward. Strength is determined by how closely packed the dots are; tightly packed dots mean a strong correlation, while widely spread dots mean a weak correlation. A real-world example of a positive correlation is the relationship between the amount of time spent studying and the score received on a math test."
  },
  assessment,
  notes,
  workbook,
  games
};