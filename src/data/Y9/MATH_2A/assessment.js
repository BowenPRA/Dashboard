// src/data/Y9/Math_1A/assessment.js
export const assessment = {
  timeLimit: 1800, 
  passages: [], 
  questions: [
    {
      id: "q1_inline_def",
      type: "inline",
      title: "1. Complete the fundamental definitions regarding bivariate data and graphs.",
      options: [],
      textParts: [
        "A scatter graph plots two separate ",
        " to reveal if there is a mathematical relationship between them. If the data points form an upward trend, this is known as a ",
        " correlation."
      ],
      blanks: {
        "1": {
          correct: "variables",
          options: [
            { val: "outliers", text: "outliers" },
            { val: "variables", text: "variables" },
            { val: "trends", text: "trends" }
          ]
        },
        "2": {
          correct: "positive",
          options: [
            { val: "negative", text: "negative" },
            { val: "zero", text: "zero" },
            { val: "positive", text: "positive" }
          ]
        }
      },
      expEn: "Scatter graphs compare two variables. An upward trend, where both variables increase together, defines a positive correlation.",
      expVn: "Biểu đồ phân tán so sánh hai biến số. Xu hướng tăng lên, nơi cả hai biến số cùng tăng, xác định một tương quan dương."
    },
    {
      id: "q2_mcq_svg",
      type: "mcq",
      title: "2. Analyze the spatial distribution of the data points below. Select the most accurate classification.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 20 L 50 200 L 350 200" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="200" y="235" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Variable X</text>
        <text x="20" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle" transform="rotate(-90 20 110)">Variable Y</text>
        <circle cx="80" cy="60" r="5" fill="#f43f5e"/><circle cx="95" cy="45" r="5" fill="#f43f5e"/>
        <circle cx="120" cy="70" r="5" fill="#f43f5e"/><circle cx="130" cy="90" r="5" fill="#f43f5e"/>
        <circle cx="150" cy="85" r="5" fill="#f43f5e"/><circle cx="170" cy="110" r="5" fill="#f43f5e"/>
        <circle cx="190" cy="130" r="5" fill="#f43f5e"/><circle cx="210" cy="120" r="5" fill="#f43f5e"/>
        <circle cx="240" cy="150" r="5" fill="#f43f5e"/><circle cx="260" cy="140" r="5" fill="#f43f5e"/>
        <circle cx="280" cy="170" r="5" fill="#f43f5e"/><circle cx="310" cy="165" r="5" fill="#f43f5e"/>
        <circle cx="330" cy="185" r="5" fill="#f43f5e"/>
      </svg>`,
      options: [
        { val: "A", text: "A. Strong Positive Correlation" },
        { val: "B", text: "B. Weak Positive Correlation" },
        { val: "C", text: "C. Strong Negative Correlation" },
        { val: "D", text: "D. Weak Negative Correlation" }
      ],
      correct: "C",
      expEn: "The data points are packed very tightly together (strong) and slope downward from left to right (negative).",
      expVn: "Các điểm dữ liệu được chụm lại rất chặt chẽ (mạnh) và dốc xuống từ trái sang phải (âm)."
    },
    {
      id: "q3_dnd_coefficients",
      type: "dnd",
      title: "3. Drag and drop the mathematical correlation coefficient (r) to its correct textual description.",
      options: [],
      bank: [
        { id: "b1", val: "1.0", text: "r = 1.0" },
        { id: "b2", val: "-1.0", text: "r = -1.0" },
        { id: "b3", val: "0", text: "r = 0" },
        { id: "b4", val: "0.8", text: "r = 0.8" },
        { id: "b5", val: "-0.8", text: "r = -0.8" }
      ],
      targets: [
        { id: "perf_pos", title: "Perfect Positive" },
        { id: "perf_neg", title: "Perfect Negative" },
        { id: "no_corr", title: "No Correlation" }
      ],
      correctSets: {
        "perf_pos": ["1.0"],
        "perf_neg": ["-1.0"],
        "no_corr": ["0"]
      },
      expEn: "An 'r' value of 1.0 is a perfect positive line. An 'r' value of -1.0 is a perfect negative line. An 'r' value of 0 means there is absolutely no mathematical correlation.",
      expVn: "Giá trị 'r' bằng 1.0 là một đường dương hoàn hảo. Giá trị 'r' bằng -1.0 là một đường âm hoàn hảo. Giá trị 'r' bằng 0 có nghĩa là hoàn toàn không có tương quan toán học."
    },
    {
      id: "q4_inline_outlier",
      type: "inline",
      title: "4. Complete the statement regarding abnormal data points.",
      options: [],
      textParts: [
        "A data point that does not follow the general trend of the scatter graph is called an ",
        ". When drawing a Line of Best Fit, we should generally ",
        " this point so it does not skew our mathematical prediction."
      ],
      blanks: {
        "1": {
          correct: "outlier",
          options: [
            { val: "intercept", text: "intercept" },
            { val: "outlier", text: "outlier" },
            { val: "variable", text: "variable" }
          ]
        },
        "2": {
          correct: "ignore",
          options: [
            { val: "include", text: "include" },
            { val: "ignore", text: "ignore" }
          ]
        }
      },
      expEn: "Outliers are abnormal points that break the trend. They are usually ignored when drawing the line of best fit to keep predictions accurate.",
      expVn: "Giá trị ngoại lai là những điểm bất thường phá vỡ xu hướng. Chúng thường bị bỏ qua khi vẽ đường phù hợp nhất để giữ cho các dự đoán chính xác."
    },
    {
      id: "q5_mcq_interpolation",
      type: "mcq",
      title: "5. Using the Line of Best Fit provided, calculate the predicted Value Y when Value X is 30.",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 50 20 L 50 200 L 350 200" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>
        <text x="200" y="235" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Value X</text>
        <text x="20" y="110" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle" transform="rotate(-90 20 110)">Value Y</text>
        
        <text x="140" y="215" font-family="sans-serif" font-weight="bold" font-size="12" fill="#94a3b8" text-anchor="middle">30</text>
        <text x="35" y="115" font-family="sans-serif" font-weight="bold" font-size="12" fill="#94a3b8" text-anchor="end">40</text>
        
        <path d="M 50 190 L 320 40" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
        
        <path d="M 140 200 L 140 110" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="6,6"/>
        <path d="M 140 110 L 50 110" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="6,6"/>
        
        <circle cx="140" cy="110" r="5" fill="#ea580c"/>
      </svg>`,
      options: [
        { val: "A", text: "A. 30" },
        { val: "B", text: "B. 40" },
        { val: "C", text: "C. 50" },
        { val: "D", text: "D. 60" }
      ],
      correct: "B",
      expEn: "By tracing a line up from X=30 to the Line of Best Fit, and then tracing horizontally to the Y-axis, the predicted value is 40. This is interpolation.",
      expVn: "Bằng cách gióng một đường từ X=30 lên Đường Phù hợp nhất, và sau đó gióng ngang sang trục Y, giá trị dự đoán là 40. Đây là phép nội suy."
    },
    {
      id: "q6_dnd_scenarios",
      type: "dnd",
      title: "6. Classify the following real-world scenarios by dragging them into their expected correlation type.",
      options: [],
      bank: [
        { id: "s1", val: "pos", text: "Hours Studied vs. Test Score" },
        { id: "s2", val: "pos", text: "Temperature vs. Ice Cream Sales" },
        { id: "s3", val: "neg", text: "Age of Car vs. Value of Car" },
        { id: "s4", val: "neg", text: "Time Running vs. Energy Left" }
      ],
      targets: [
        { id: "pos_targ", title: "Expected Positive Correlation" },
        { id: "neg_targ", title: "Expected Negative Correlation" }
      ],
      correctSets: {
        "pos_targ": ["pos", "pos"],
        "neg_targ": ["neg", "neg"]
      },
      expEn: "Test scores and ice cream sales increase as study time and temperature increase (Positive). Car value and energy decrease as age and run time increase (Negative).",
      expVn: "Điểm kiểm tra và doanh số bán kem tăng khi thời gian học và nhiệt độ tăng (Dương). Giá trị ô tô và năng lượng giảm khi tuổi xe và thời gian chạy tăng (Âm)."
    },
    {
      id: "q7_mcq_causation",
      type: "mcq",
      title: "7. In a town, ice cream sales and sunburn cases have a strong positive correlation. Which of the following is the mathematically correct conclusion?",
      options: [
        { val: "A", text: "A. Eating ice cream causes humans to sunburn easily." },
        { val: "B", text: "B. Getting a sunburn makes humans crave ice cream." },
        { val: "C", text: "C. Both variables are increasing because of a third factor (hot weather)." },
        { val: "D", text: "D. The data is entirely fabricated because correlation always equals causation." }
      ],
      correct: "C",
      expEn: "A golden rule in statistics is that correlation does not equal causation. Both factors are rising together simply because it is summer (hot weather).",
      expVn: "Một quy tắc vàng trong thống kê là tương quan không có nghĩa là nhân quả. Cả hai yếu tố cùng tăng đơn giản vì đang là mùa hè (thời tiết nóng)."
    },
    {
      id: "q8_inline_best_fit",
      type: "inline",
      title: "8. Complete the final summary regarding correlation graph mechanics.",
      options: [],
      textParts: [
        "A proper line of best fit must be a perfectly ",
        " line that balances the data. Using it to predict a value inside your known data range is known as ",
        "."
      ],
      blanks: {
        "1": {
          correct: "straight",
          options: [
            { val: "curved", text: "curved" },
            { val: "straight", text: "straight" }
          ]
        },
        "2": {
          correct: "interpolation",
          options: [
            { val: "interpolation", text: "interpolation" },
            { val: "extrapolation", text: "extrapolation" }
          ]
        }
      },
      expEn: "Lines of best fit must be straight to map linear correlation. Predicting inside the known data range is interpolation, which is generally reliable.",
      expVn: "Các đường phù hợp nhất phải thẳng để lập bản đồ tương quan tuyến tính. Việc dự đoán bên trong phạm vi dữ liệu đã biết là phép nội suy, thường đáng tin cậy."
    }
  ]
};