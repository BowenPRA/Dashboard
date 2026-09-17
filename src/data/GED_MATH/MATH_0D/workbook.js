// src/data/GED_MATH/MATH_0D/workbook.js
// Reveal-solution practice for Data, Statistics & Probability (the whole Drill,
// 40 XP). See docs/workbook-tasks.md. Every answer is a number or a fraction —
// no prose. In KaTeX the percent sign must be escaped as \% (a bare % starts a
// comment and eats the rest of the line).

export const workbook = [
  {
    tier: "Focus",
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "Find the **mean** of $4, 8, 9, 3$.",
        promptVn: "Tìm **trung bình cộng** của $4, 8, 9, 3$.",
        solution: [
          "Add the values: $4 + 8 + 9 + 3 = 24$.",
          "Count the values: there are $4$.",
          "Divide: $24 \\div 4 = 6$.",
        ],
        solutionVn: [
          "Cộng các giá trị: $4 + 8 + 9 + 3 = 24$.",
          "Đếm các giá trị: có $4$ giá trị.",
          "Chia: $24 \\div 4 = 6$.",
        ],
        answer: "$6$", answerVn: "$6$",
      },
      {
        id: "f2",
        prompt: "Find the **median** of $5, 9, 2, 7, 4$.",
        promptVn: "Tìm **trung vị** của $5, 9, 2, 7, 4$.",
        solution: [
          "Put the values in order: $2, 4, 5, 7, 9$.",
          "The middle value (two on each side) is $5$.",
        ],
        solutionVn: [
          "Sắp xếp các giá trị: $2, 4, 5, 7, 9$.",
          "Giá trị ở giữa (mỗi bên hai số) là $5$.",
        ],
        answer: "$5$", answerVn: "$5$",
      },
      {
        id: "f3",
        prompt: "Find the **mode** of $3, 7, 7, 2, 9, 7$.",
        promptVn: "Tìm **mốt** của $3, 7, 7, 2, 9, 7$.",
        solution: [
          "The mode is the value that appears most often.",
          "$7$ appears three times; every other value appears once. The mode is $7$.",
        ],
        solutionVn: [
          "Mốt là giá trị xuất hiện nhiều nhất.",
          "$7$ xuất hiện ba lần; các giá trị khác chỉ xuất hiện một lần. Mốt là $7$.",
        ],
        answer: "$7$", answerVn: "$7$",
      },
      {
        id: "f4",
        prompt: "Find the **range** of $12, 5, 20, 8$.",
        promptVn: "Tìm **khoảng biến thiên** của $12, 5, 20, 8$.",
        solution: [
          "Range = largest value $-$ smallest value.",
          "Largest is $20$, smallest is $5$: $20 - 5 = 15$.",
        ],
        solutionVn: [
          "Khoảng biến thiên = giá trị lớn nhất $-$ giá trị nhỏ nhất.",
          "Lớn nhất là $20$, nhỏ nhất là $5$: $20 - 5 = 15$.",
        ],
        answer: "$15$", answerVn: "$15$",
      },
      {
        id: "f5",
        prompt: "A bag has $3$ red marbles and $7$ blue marbles. You take one without looking. What is the probability it is **red**? Give a fraction.",
        promptVn: "Một túi có $3$ viên bi đỏ và $7$ viên bi xanh. Bạn lấy một viên mà không nhìn. Xác suất viên bi **màu đỏ** là bao nhiêu? Trả lời bằng phân số.",
        solution: [
          "Probability $= \\dfrac{\\text{ways it can happen}}{\\text{all outcomes}}$.",
          "There are $3$ red marbles out of $3 + 7 = 10$ marbles in total.",
          "$P(\\text{red}) = \\dfrac{3}{10}$, which is $0.3$ or $30\\%$.",
        ],
        solutionVn: [
          "Xác suất $= \\dfrac{\\text{số cách xảy ra}}{\\text{tất cả kết quả}}$.",
          "Có $3$ viên đỏ trong tổng số $3 + 7 = 10$ viên.",
          "$P(\\text{đỏ}) = \\dfrac{3}{10}$, tức $0{,}3$ hay $30\\%$.",
        ],
        answer: "$\\dfrac{3}{10}$", answerVn: "$\\dfrac{3}{10}$",
        accept: ["3/10", "0.3", "0,3", "30%", "30"],
      },
      {
        id: "f6",
        prompt: "A circle graph shows that $40\\%$ of $200$ people chose pizza. How many people chose pizza?",
        promptVn: "Một biểu đồ tròn cho thấy $40\\%$ trong $200$ người chọn pizza. Bao nhiêu người chọn pizza?",
        solution: [
          "\"Percent of\" means multiply. Write $40\\%$ as a decimal: $0.4$.",
          "$0.4 \\times 200 = 80$ people.",
        ],
        solutionVn: [
          "\"Phần trăm của\" nghĩa là nhân. Viết $40\\%$ thành số thập phân: $0{,}4$.",
          "$0{,}4 \\times 200 = 80$ người.",
        ],
        answer: "$80$", answerVn: "$80$",
      },
      {
        id: "f7",
        prompt: "A bar graph shows customers each day: Monday $15$, Tuesday $25$, Wednesday $10$. How many **more** customers came on Tuesday than on Wednesday?",
        promptVn: "Một biểu đồ cột cho thấy số khách mỗi ngày: Thứ Hai $15$, Thứ Ba $25$, Thứ Tư $10$. Thứ Ba có **nhiều hơn** Thứ Tư bao nhiêu khách?",
        solution: [
          "\"How many more\" means subtract the smaller from the larger.",
          "Tuesday $-$ Wednesday $= 25 - 10 = 15$.",
        ],
        solutionVn: [
          "\"Nhiều hơn bao nhiêu\" nghĩa là lấy số lớn trừ số nhỏ.",
          "Thứ Ba $-$ Thứ Tư $= 25 - 10 = 15$.",
        ],
        answer: "$15$", answerVn: "$15$",
      },
      {
        id: "f8",
        prompt: "A spinner has $4$ equal parts numbered $1, 2, 3, 4$. What is the probability of **not** landing on $4$? Give a fraction.",
        promptVn: "Một vòng quay có $4$ phần bằng nhau đánh số $1, 2, 3, 4$. Xác suất **không** dừng ở số $4$ là bao nhiêu? Trả lời bằng phân số.",
        solution: [
          "$P(4) = \\dfrac{1}{4}$ — one part out of four.",
          "\"Not\" means subtract from $1$: $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.",
          "Check: three of the four parts are not a $4$.",
        ],
        solutionVn: [
          "$P(4) = \\dfrac{1}{4}$ — một phần trong bốn phần.",
          "\"Không\" nghĩa là lấy $1$ trừ đi: $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.",
          "Kiểm tra: ba trong bốn phần không phải số $4$.",
        ],
        answer: "$\\dfrac{3}{4}$", answerVn: "$\\dfrac{3}{4}$",
        accept: ["3/4", "0.75", "0,75", "75%", "75"],
      },
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [
      {
        id: "p1",
        prompt: "Find the **mean** of $12, 15, 18, 21, 24$.",
        promptVn: "Tìm **trung bình cộng** của $12, 15, 18, 21, 24$.",
        solution: [
          "Add: $12 + 15 + 18 + 21 + 24 = 90$.",
          "There are $5$ values: $90 \\div 5 = 18$.",
        ],
        solutionVn: [
          "Cộng: $12 + 15 + 18 + 21 + 24 = 90$.",
          "Có $5$ giá trị: $90 \\div 5 = 18$.",
        ],
        answer: "$18$", answerVn: "$18$",
      },
      {
        id: "p2",
        prompt: "Find the **median** of $10, 3, 8, 15, 6, 12$.",
        promptVn: "Tìm **trung vị** của $10, 3, 8, 15, 6, 12$.",
        solution: [
          "Order the values: $3, 6, 8, 10, 12, 15$.",
          "There are $6$ values (an even number), so there are two middle values: $8$ and $10$.",
          "The median is their mean: $(8 + 10) \\div 2 = 9$.",
        ],
        solutionVn: [
          "Sắp xếp các giá trị: $3, 6, 8, 10, 12, 15$.",
          "Có $6$ giá trị (số chẵn), nên có hai giá trị ở giữa: $8$ và $10$.",
          "Trung vị là trung bình của chúng: $(8 + 10) \\div 2 = 9$.",
        ],
        answer: "$9$", answerVn: "$9$",
      },
      {
        id: "p3",
        prompt: "Test scores: $70, 85, 85, 90, 100$. What is the **mean** score?",
        promptVn: "Điểm kiểm tra: $70, 85, 85, 90, 100$. Điểm **trung bình cộng** là bao nhiêu?",
        solution: [
          "Add: $70 + 85 + 85 + 90 + 100 = 430$.",
          "Divide by $5$: $430 \\div 5 = 86$.",
          "(The median and the mode are both $85$ — close to the mean, because there is no outlier.)",
        ],
        solutionVn: [
          "Cộng: $70 + 85 + 85 + 90 + 100 = 430$.",
          "Chia cho $5$: $430 \\div 5 = 86$.",
          "(Trung vị và mốt đều là $85$ — gần với trung bình, vì không có giá trị ngoại lai.)",
        ],
        answer: "$86$", answerVn: "$86$",
      },
      {
        id: "p4",
        prompt: "The weather report says there is a $1$ in $4$ chance of rain. Write this probability as a **percent**.",
        promptVn: "Dự báo thời tiết nói có $1$ trong $4$ khả năng mưa. Viết xác suất này dưới dạng **phần trăm**.",
        solution: [
          "$1$ in $4$ is the fraction $\\dfrac{1}{4}$.",
          "$1 \\div 4 = 0.25$, and $0.25 \\times 100 = 25\\%$.",
        ],
        solutionVn: [
          "$1$ trong $4$ là phân số $\\dfrac{1}{4}$.",
          "$1 \\div 4 = 0{,}25$, và $0{,}25 \\times 100 = 25\\%$.",
        ],
        answer: "$25\\%$", answerVn: "$25\\%$",
        accept: ["25", "25%", "0.25", "1/4"],
      },
      {
        id: "p5",
        prompt: "You flip two coins. What is the probability that **both** land on heads? Give a fraction.",
        promptVn: "Bạn tung hai đồng xu. Xác suất **cả hai** đều ngửa là bao nhiêu? Trả lời bằng phân số.",
        solution: [
          "Each coin is independent: $P(\\text{heads}) = \\dfrac{1}{2}$ for each one.",
          "\"Both\" means multiply: $\\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$.",
        ],
        solutionVn: [
          "Mỗi đồng xu là độc lập: $P(\\text{ngửa}) = \\dfrac{1}{2}$ cho mỗi đồng.",
          "\"Cả hai\" nghĩa là nhân: $\\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$.",
        ],
        answer: "$\\dfrac{1}{4}$", answerVn: "$\\dfrac{1}{4}$",
        accept: ["1/4", "0.25", "0,25", "25%", "25"],
      },
      {
        id: "p6",
        prompt: "A circle graph of a family budget shows Rent $30\\%$, Food $20\\%$ and \"Other\". What percent is **Other**?",
        promptVn: "Một biểu đồ tròn về ngân sách gia đình cho thấy Tiền nhà $30\\%$, Ăn uống $20\\%$ và \"Khác\". **Khác** chiếm bao nhiêu phần trăm?",
        solution: [
          "All the slices of a circle graph add up to $100\\%$.",
          "$100 - 30 - 20 = 50$, so Other is $50\\%$.",
        ],
        solutionVn: [
          "Tất cả các phần của biểu đồ tròn cộng lại bằng $100\\%$.",
          "$100 - 30 - 20 = 50$, nên Khác là $50\\%$.",
        ],
        answer: "$50\\%$", answerVn: "$50\\%$",
        accept: ["50", "50%"],
      },
      {
        id: "p7",
        prompt: "A line graph shows a shop's sales: $2020$: $40$ thousand, $2021$: $50$ thousand, $2022$: $65$ thousand. By how many thousand did sales **increase** from $2020$ to $2022$?",
        promptVn: "Một biểu đồ đường cho thấy doanh số của cửa hàng: $2020$: $40$ nghìn, $2021$: $50$ nghìn, $2022$: $65$ nghìn. Doanh số **tăng** bao nhiêu nghìn từ $2020$ đến $2022$?",
        solution: [
          "Read the two values you need: $2020$ is $40$ and $2022$ is $65$.",
          "Increase = later value $-$ earlier value $= 65 - 40 = 25$ thousand.",
        ],
        solutionVn: [
          "Đọc hai giá trị cần thiết: $2020$ là $40$ và $2022$ là $65$.",
          "Mức tăng = giá trị sau $-$ giá trị trước $= 65 - 40 = 25$ nghìn.",
        ],
        answer: "$25$", answerVn: "$25$",
      },
    ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [
      {
        id: "c1",
        prompt: "The mean of five numbers is $20$. Four of the numbers are $15, 18, 22$ and $25$. What is the **fifth** number?",
        promptVn: "Trung bình cộng của năm số là $20$. Bốn trong số đó là $15, 18, 22$ và $25$. Số **thứ năm** là bao nhiêu?",
        solution: [
          "If the mean of $5$ numbers is $20$, the total is $20 \\times 5 = 100$.",
          "The four known numbers add to $15 + 18 + 22 + 25 = 80$.",
          "The fifth number is $100 - 80 = 20$.",
        ],
        solutionVn: [
          "Nếu trung bình của $5$ số là $20$, tổng là $20 \\times 5 = 100$.",
          "Bốn số đã biết cộng lại: $15 + 18 + 22 + 25 = 80$.",
          "Số thứ năm là $100 - 80 = 20$.",
        ],
        answer: "$20$", answerVn: "$20$",
      },
      {
        id: "c2",
        prompt: "Five workers earn (in thousands): $30, 32, 35, 38, 200$. How much **bigger** is the mean than the median?",
        promptVn: "Năm người lao động có thu nhập (nghìn đô): $30, 32, 35, 38, 200$. Trung bình cộng **lớn hơn** trung vị bao nhiêu?",
        solution: [
          "Mean: $30 + 32 + 35 + 38 + 200 = 335$, and $335 \\div 5 = 67$.",
          "Median: the values are already in order; the middle one is $35$.",
          "Difference: $67 - 35 = 32$. The one outlier ($200$) pulls the mean far above a typical worker.",
        ],
        solutionVn: [
          "Trung bình: $30 + 32 + 35 + 38 + 200 = 335$, và $335 \\div 5 = 67$.",
          "Trung vị: các giá trị đã theo thứ tự; số ở giữa là $35$.",
          "Chênh lệch: $67 - 35 = 32$. Một giá trị ngoại lai ($200$) kéo trung bình lên cao hơn nhiều so với người lao động điển hình.",
        ],
        answer: "$32$", answerVn: "$32$",
      },
      {
        id: "c3",
        prompt: "You roll a normal die twice. What is the probability of getting a $6$ **both** times? Give a fraction.",
        promptVn: "Bạn gieo một con xúc xắc thường hai lần. Xác suất được số $6$ **cả hai** lần là bao nhiêu? Trả lời bằng phân số.",
        solution: [
          "One roll: $P(6) = \\dfrac{1}{6}$.",
          "The rolls are independent, so multiply: $\\dfrac{1}{6} \\times \\dfrac{1}{6} = \\dfrac{1}{36}$.",
        ],
        solutionVn: [
          "Một lần gieo: $P(6) = \\dfrac{1}{6}$.",
          "Các lần gieo độc lập, nên nhân: $\\dfrac{1}{6} \\times \\dfrac{1}{6} = \\dfrac{1}{36}$.",
        ],
        answer: "$\\dfrac{1}{36}$", answerVn: "$\\dfrac{1}{36}$",
        accept: ["1/36"],
      },
      {
        id: "c4",
        prompt: "A circle graph shows how $360$ students spend their free time. The \"Sport\" slice is $25\\%$. How many students chose Sport?",
        promptVn: "Một biểu đồ tròn cho thấy $360$ học sinh dùng thời gian rảnh thế nào. Phần \"Thể thao\" là $25\\%$. Bao nhiêu học sinh chọn Thể thao?",
        solution: [
          "$25\\%$ is one quarter.",
          "$360 \\div 4 = 90$ students. (Or $0.25 \\times 360 = 90$.)",
        ],
        solutionVn: [
          "$25\\%$ là một phần tư.",
          "$360 \\div 4 = 90$ học sinh. (Hoặc $0{,}25 \\times 360 = 90$.)",
        ],
        answer: "$90$", answerVn: "$90$",
      },
      {
        id: "c5",
        prompt: "Data: $2, 3, 4, 5, 86$. The mean is $20$ and the median is $4$. Which value better describes a **typical** number in this list? Type that value.",
        promptVn: "Dữ liệu: $2, 3, 4, 5, 86$. Trung bình là $20$ và trung vị là $4$. Giá trị nào mô tả tốt hơn một số **điển hình** trong danh sách này? Nhập giá trị đó.",
        solution: [
          "$86$ is an outlier — it is far away from the other four numbers.",
          "An outlier pulls the mean: $20$ is bigger than four of the five numbers, so it is not typical.",
          "The median, $4$, sits in the middle of the ordinary values. Use the median: $4$.",
        ],
        solutionVn: [
          "$86$ là giá trị ngoại lai — nó cách xa bốn số còn lại.",
          "Giá trị ngoại lai kéo trung bình: $20$ lớn hơn bốn trong năm số, nên không điển hình.",
          "Trung vị, $4$, nằm giữa các giá trị bình thường. Dùng trung vị: $4$.",
        ],
        answer: "$4$", answerVn: "$4$",
        accept: ["median", "the median", "4 (median)", "trung vị"],
      },
      {
        id: "c6",
        prompt: "The probability of rain tomorrow is $0.3$. What is the probability that it does **not** rain? Give a decimal.",
        promptVn: "Xác suất trời mưa ngày mai là $0{,}3$. Xác suất trời **không** mưa là bao nhiêu? Trả lời bằng số thập phân.",
        solution: [
          "Rain and no rain are the only two outcomes, so their probabilities add to $1$.",
          "$P(\\text{no rain}) = 1 - 0.3 = 0.7$ (that is $70\\%$).",
        ],
        solutionVn: [
          "Mưa và không mưa là hai kết quả duy nhất, nên xác suất của chúng cộng lại bằng $1$.",
          "$P(\\text{không mưa}) = 1 - 0{,}3 = 0{,}7$ (tức $70\\%$).",
        ],
        answer: "$0.7$", answerVn: "$0{,}7$",
        accept: ["0.7", "0,7", ".7", "70%", "7/10"],
      },
      {
        id: "c7",
        prompt: "A survey asked $50$ people their favorite drink: $20$ said tea, $15$ said coffee, and the rest said juice. What **percent** chose juice?",
        promptVn: "Một khảo sát hỏi $50$ người về đồ uống yêu thích: $20$ người nói trà, $15$ người nói cà phê, còn lại nói nước ép. Bao nhiêu **phần trăm** chọn nước ép?",
        solution: [
          "Juice $= 50 - 20 - 15 = 15$ people.",
          "Percent $= \\dfrac{15}{50} = \\dfrac{30}{100} = 30\\%$.",
        ],
        solutionVn: [
          "Nước ép $= 50 - 20 - 15 = 15$ người.",
          "Phần trăm $= \\dfrac{15}{50} = \\dfrac{30}{100} = 30\\%$.",
        ],
        answer: "$30\\%$", answerVn: "$30\\%$",
        accept: ["30", "30%"],
      },
    ],
  },
];
