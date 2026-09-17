// src/data/GED_HISTORY/HIST_3A/assessment.js
// Timed mixed check for Economics. One short GED-style passage (a supply
// shock) and one data table described in text (unemployment rates), with the
// rest testing cause and effect. Key: A2 B2 C2 D2 across the 8 MCQs.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [
    {
      id: "p_gas",
      title: "Gasoline Prices After the Storm",
      text: "In September, a hurricane hit the Gulf Coast and forced three large oil refineries to shut down for two weeks. Refineries turn crude oil into gasoline. Within days, the price of gasoline across the region rose from $3.20 to $4.10 a gallon, even though drivers were buying about the same amount as before. Some stations ran out of fuel completely. By late October, all three refineries were running again, and the price slowly fell back toward $3.30.",
      vnText: "Vào tháng Chín, một cơn bão đổ bộ vào Bờ Vịnh và buộc ba nhà máy lọc dầu lớn phải đóng cửa trong hai tuần. Nhà máy lọc dầu biến dầu thô thành xăng. Trong vài ngày, giá xăng khắp vùng tăng từ 3,20 lên 4,10 đô la một gallon, dù người lái xe vẫn mua khoảng cùng lượng như trước. Một số trạm xăng hết sạch nhiên liệu. Đến cuối tháng Mười, cả ba nhà máy hoạt động trở lại, và giá từ từ giảm về khoảng 3,30 đô la.",
    },
    {
      id: "p_jobs",
      title: "Unemployment Rate, Country X",
      text: "The table below shows the unemployment rate — the share of workers who wanted a job but could not find one — in Country X over four years.\n\nYear 2020: 8.1%\nYear 2021: 5.4%\nYear 2022: 3.6%\nYear 2023: 3.7%",
      vnText: "Bảng dưới đây cho thấy tỷ lệ thất nghiệp — phần người lao động muốn có việc nhưng không tìm được — ở Quốc gia X trong bốn năm.\n\nNăm 2020: 8,1%\nNăm 2021: 5,4%\nNăm 2022: 3,6%\nNăm 2023: 3,7%",
    },
  ],
  questions: [
    {
      id: "q1_mcq_opportunity_cost",
      type: "mcq",
      title: "1. Hoa has $50. She can buy a textbook or a pair of running shoes. She buys the textbook. What is her opportunity cost?",
      options: [
        { val: "A", text: "A. The $50 she spent" },
        { val: "B", text: "B. The textbook" },
        { val: "C", text: "C. The running shoes she did not buy" },
        { val: "D", text: "D. Nothing, because she got what she wanted" },
      ],
      correct: "C",
      expEn: "Opportunity cost is the next-best thing given up, not the money and not the item chosen. Hoa gave up the running shoes, so they are her opportunity cost.",
      expVn: "Chi phí cơ hội là điều tốt nhất tiếp theo bị từ bỏ, không phải số tiền hay món đồ đã chọn. Hoa từ bỏ đôi giày chạy, nên đó là chi phí cơ hội của cô.",
    },
    {
      id: "q2_mcq_supply_shock",
      type: "mcq",
      passageId: "p_gas",
      title: "2. According to the passage, why did the price of gasoline rise in September?",
      options: [
        { val: "A", text: "A. Drivers suddenly wanted much more gasoline." },
        { val: "B", text: "B. The supply of gasoline fell while demand stayed about the same." },
        { val: "C", text: "C. The government added a new tax on fuel." },
        { val: "D", text: "D. Crude oil became cheaper." },
      ],
      correct: "B",
      expEn: "The refineries that make gasoline shut down, so less gasoline was available — supply fell. The passage says drivers bought about the same amount, so demand did not change. Less supply with the same demand pushes the price up.",
      expVn: "Các nhà máy lọc dầu sản xuất xăng đóng cửa, nên ít xăng hơn — cung giảm. Đoạn văn nói người lái xe mua khoảng cùng lượng, nên cầu không đổi. Cung giảm với cầu không đổi đẩy giá lên.",
    },
    {
      id: "q3_mcq_price_falls",
      type: "mcq",
      passageId: "p_gas",
      title: "3. Based on the passage, what caused the price to fall again in October?",
      options: [
        { val: "A", text: "A. Drivers stopped buying gasoline." },
        { val: "B", text: "B. The stations that ran out of fuel closed for good." },
        { val: "C", text: "C. The hurricane season ended." },
        { val: "D", text: "D. The refineries reopened, so the supply of gasoline recovered." },
      ],
      correct: "D",
      expEn: "The passage links the price drop to the refineries running again. More gasoline reaching the market means more supply, and with the same demand the price falls back toward its old level.",
      expVn: "Đoạn văn liên hệ việc giá giảm với các nhà máy lọc dầu hoạt động trở lại. Nhiều xăng hơn đến thị trường nghĩa là cung tăng, và với cầu không đổi thì giá giảm về mức cũ.",
    },
    {
      id: "q4_inline_price_moves",
      type: "inline",
      title: "4. Complete the sentences about prices.",
      options: [],
      textParts: [
        "When many buyers want a product but sellers have very little of it, the price goes ",
        ". When one company is the only seller of a product, that company is a ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "up",
          options: [
            { val: "up", text: "up" },
            { val: "down", text: "down" },
          ],
        },
        "2": {
          correct: "monopoly",
          options: [
            { val: "monopoly", text: "monopoly" },
            { val: "competitor", text: "competitor" },
            { val: "budget", text: "budget" },
          ],
        },
      },
      expEn: "High demand plus low supply means a shortage, so the price rises. A market with only one seller is a monopoly, and it can charge more because buyers have no other choice.",
      expVn: "Cầu cao cộng cung thấp nghĩa là thiếu hụt, nên giá tăng. Thị trường chỉ có một người bán là độc quyền, và nó có thể tính giá cao hơn vì người mua không có lựa chọn khác.",
    },
    {
      id: "q5_mcq_unemployment_table",
      type: "mcq",
      passageId: "p_jobs",
      title: "5. Based on the table, in which year was it hardest for workers in Country X to find a job?",
      options: [
        { val: "A", text: "A. 2020" },
        { val: "B", text: "B. 2021" },
        { val: "C", text: "C. 2022" },
        { val: "D", text: "D. 2023" },
      ],
      correct: "A",
      expEn: "The unemployment rate is the share of workers who cannot find a job. The highest rate, 8.1%, is in 2020, so that was the hardest year. The rate then fell each year until a tiny rise in 2023.",
      expVn: "Tỷ lệ thất nghiệp là phần người lao động không tìm được việc. Tỷ lệ cao nhất, 8,1%, là năm 2020, nên đó là năm khó khăn nhất. Sau đó tỷ lệ giảm mỗi năm cho đến khi tăng nhẹ vào 2023.",
    },
    {
      id: "q6_mcq_inflation",
      type: "mcq",
      title: "6. Five years ago, $100 filled a family's grocery cart. Today the same cart costs $125. What does this show?",
      options: [
        { val: "A", text: "A. Inflation has lowered the purchasing power of money." },
        { val: "B", text: "B. The family is buying more food than before." },
        { val: "C", text: "C. The supply of food has increased." },
        { val: "D", text: "D. The bank is paying more interest." },
      ],
      correct: "A",
      expEn: "The same goods now cost more, so each dollar buys less. That is inflation lowering purchasing power. The cart is the same, so the family is not buying more; more supply would push prices down, not up.",
      expVn: "Cùng lượng hàng giờ đắt hơn, nên mỗi đô la mua được ít hơn. Đó là lạm phát làm giảm sức mua. Giỏ hàng như cũ, nên gia đình không mua nhiều hơn; cung tăng sẽ kéo giá xuống, không phải lên.",
    },
    {
      id: "q7_mcq_interest",
      type: "mcq",
      title: "7. A bank pays savers 2% a year and charges borrowers 7% a year on loans. Why does the bank charge borrowers more than it pays savers?",
      options: [
        { val: "A", text: "A. Because borrowers have more money than savers" },
        { val: "B", text: "B. Because the government sets both rates at random" },
        { val: "C", text: "C. Because savers do not want to be paid" },
        { val: "D", text: "D. Because the difference is the bank's profit, and lending carries a risk" },
      ],
      correct: "D",
      expEn: "The bank earns its profit from the gap between the interest it charges borrowers and the interest it pays savers. Lending also carries the risk that a borrower does not pay back, so the bank charges more to cover that risk.",
      expVn: "Ngân hàng kiếm lợi nhuận từ khoảng cách giữa lãi thu của người vay và lãi trả cho người gửi. Cho vay còn có rủi ro người vay không trả, nên ngân hàng thu lãi cao hơn để bù rủi ro đó.",
    },
    {
      id: "q8_mcq_public_goods",
      type: "mcq",
      title: "8. Which of these is a PUBLIC GOOD — something paid for by taxes and shared by everyone?",
      options: [
        { val: "A", text: "A. A family's new car" },
        { val: "B", text: "B. The street lights in a city" },
        { val: "C", text: "C. A ticket to a concert" },
        { val: "D", text: "D. A shop's supply of shoes" },
      ],
      correct: "B",
      expEn: "Street lights are provided by the government, paid for by taxes, and used by everyone who walks or drives at night — no one can be charged per use. A car, a ticket and shoes are private goods bought by one person.",
      expVn: "Đèn đường do chính phủ cung cấp, trả bằng thuế, và mọi người đi bộ hay lái xe ban đêm đều dùng — không thể tính tiền theo lượt. Xe hơi, vé và giày là hàng hóa tư nhân do một người mua.",
    },
    {
      id: "q9_inline_gdp_specialise",
      type: "inline",
      title: "9. Complete the sentences about measuring an economy.",
      options: [],
      textParts: [
        "GDP measures the total value of goods and services a country ",
        " in one year. When each worker focuses on the one job he or she does best, this is called ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "produces",
          options: [
            { val: "produces", text: "produces" },
            { val: "imports", text: "imports" },
            { val: "saves", text: "saves" },
          ],
        },
        "2": {
          correct: "specialisation",
          options: [
            { val: "specialisation", text: "specialisation" },
            { val: "inflation", text: "inflation" },
            { val: "scarcity", text: "scarcity" },
          ],
        },
      },
      expEn: "GDP counts what a country produces, not what it imports or saves. Specialisation is workers, companies or countries each doing what they do best, which raises productivity and makes trade worthwhile.",
      expVn: "GDP đếm những gì một quốc gia sản xuất, không phải nhập khẩu hay tiết kiệm. Chuyên môn hóa là người lao động, công ty hoặc quốc gia mỗi bên làm điều mình giỏi nhất, giúp tăng năng suất và khiến thương mại có lợi.",
    },
    {
      id: "q10_mcq_tariff_effect",
      type: "mcq",
      title: "10. A country puts a high tariff on imported rice. Which is the most likely result?",
      options: [
        { val: "A", text: "A. Imported rice becomes cheaper for shoppers." },
        { val: "B", text: "B. The country stops growing its own rice." },
        { val: "C", text: "C. Imported rice costs more, so more shoppers buy local rice." },
        { val: "D", text: "D. The price of all food falls." },
      ],
      correct: "C",
      expEn: "A tariff is a tax on imports, so imported rice costs more in the shops. Local rice now looks cheaper by comparison, so shoppers switch to it — the benefit to local farmers, at the cost of higher prices for buyers.",
      expVn: "Thuế nhập khẩu là thuế đánh vào hàng nhập, nên gạo nhập đắt hơn ở cửa hàng. Gạo trong nước giờ trông rẻ hơn khi so sánh, nên người mua chuyển sang gạo nội — lợi ích cho nông dân trong nước, đổi lại giá cao hơn cho người mua.",
    },
  ],
};
