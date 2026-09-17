// src/data/GED_HISTORY/HIST_4A/assessment.js
// Timed mixed check for Geography & People. One short GED-style passage (the
// Great Migration) with a city-population table described in text, plus map
// skills, regions, density and climate. Key: A2 B2 C2 D2 across the 8 MCQs.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [
    {
      id: "p_migration",
      title: "The Great Migration",
      text: "Between about 1916 and 1970, some six million African Americans left the rural South for cities in the North, Midwest and West. In the South, most worked as farm laborers for very low pay, laws kept them from voting or using the same schools and shops as white citizens, and violence against Black families was common. At the same time, factories in the North needed workers, especially after 1914, when World War I cut off the flow of immigrants from Europe. Northern wages were often two or three times higher than in the South. Letters home and Black newspapers spread the word, and whole families followed.\n\nCity population (rounded):\nChicago — 1900: 1.7 million; 1930: 3.4 million\nDetroit — 1900: 0.3 million; 1930: 1.6 million\nNew York — 1900: 3.4 million; 1930: 6.9 million",
      vnText: "Từ khoảng 1916 đến 1970, khoảng sáu triệu người Mỹ gốc Phi rời miền Nam nông thôn đến các thành phố ở miền Bắc, Trung Tây và miền Tây. Ở miền Nam, hầu hết làm lao động nông trại với lương rất thấp, luật pháp ngăn họ bỏ phiếu hoặc dùng cùng trường học và cửa hàng với công dân da trắng, và bạo lực nhằm vào các gia đình da đen rất phổ biến. Cùng lúc đó, các nhà máy ở miền Bắc cần công nhân, nhất là sau năm 1914, khi Thế chiến thứ nhất cắt đứt dòng người nhập cư từ châu Âu. Lương ở miền Bắc thường cao gấp hai đến ba lần miền Nam. Thư gửi về nhà và báo chí của người da đen lan truyền tin tức, và cả gia đình nối gót nhau.\n\nDân số thành phố (làm tròn):\nChicago — 1900: 1,7 triệu; 1930: 3,4 triệu\nDetroit — 1900: 0,3 triệu; 1930: 1,6 triệu\nNew York — 1900: 3,4 triệu; 1930: 6,9 triệu",
    },
  ],
  questions: [
    {
      id: "q1_mcq_legend",
      type: "mcq",
      title: "1. A map uses a small black triangle to mark some places. To find out what the triangle means, you should look at the —",
      options: [
        { val: "A", text: "A. scale" },
        { val: "B", text: "B. legend (key)" },
        { val: "C", text: "C. compass rose" },
        { val: "D", text: "D. lines of longitude" },
      ],
      correct: "B",
      expEn: "The legend, or key, explains every symbol and color on the map. The scale measures distance, the compass rose shows direction, and longitude lines measure position east or west.",
      expVn: "Chú giải giải thích mọi ký hiệu và màu trên bản đồ. Tỉ lệ đo khoảng cách, hoa gió chỉ hướng, và các đường kinh độ đo vị trí đông hoặc tây.",
    },
    {
      id: "q2_mcq_scale",
      type: "mcq",
      title: "2. A map's scale says \"1 inch = 50 miles\". Two towns are 3 inches apart on the map. How far apart are they in real life?",
      options: [
        { val: "A", text: "A. 3 miles" },
        { val: "B", text: "B. 50 miles" },
        { val: "C", text: "C. 150 miles" },
        { val: "D", text: "D. 500 miles" },
      ],
      correct: "C",
      expEn: "The scale turns map distance into real distance. Each inch is 50 miles, so 3 inches is 3 × 50 = 150 miles.",
      expVn: "Tỉ lệ đổi khoảng cách bản đồ thành khoảng cách thực. Mỗi inch là 50 dặm, nên 3 inch là 3 × 50 = 150 dặm.",
    },
    {
      id: "q3_inline_lat_political",
      type: "inline",
      title: "3. Complete the sentences about maps.",
      options: [],
      textParts: [
        "Lines that run east to west and measure how far a place is north or south of the equator are lines of ",
        ". A map that shows state borders and capital cities is a ",
        " map.",
      ],
      blanks: {
        "1": {
          correct: "latitude",
          options: [
            { val: "latitude", text: "latitude" },
            { val: "longitude", text: "longitude" },
          ],
        },
        "2": {
          correct: "political",
          options: [
            { val: "political", text: "political" },
            { val: "physical", text: "physical" },
            { val: "climate", text: "climate" },
          ],
        },
      },
      expEn: "Latitude lines lie flat, east to west, and count degrees north or south of the equator; longitude lines run pole to pole. Borders and capitals are made by people, so a map of them is a political map.",
      expVn: "Các đường vĩ độ nằm ngang, đông–tây, và đếm độ về bắc hoặc nam của xích đạo; các đường kinh độ chạy từ cực này đến cực kia. Biên giới và thủ đô do con người tạo ra, nên bản đồ về chúng là bản đồ chính trị.",
    },
    {
      id: "q4_mcq_push_factor",
      type: "mcq",
      passageId: "p_migration",
      title: "4. According to the passage, which of these was a PUSH factor in the Great Migration?",
      options: [
        { val: "A", text: "A. Violence and unfair laws in the South" },
        { val: "B", text: "B. Higher wages in northern factories" },
        { val: "C", text: "C. Letters from family already in the North" },
        { val: "D", text: "D. Jobs left open when European immigration stopped" },
      ],
      correct: "A",
      expEn: "A push factor is a problem at home that drives people out. Violence and laws that blocked voting and schooling were problems in the South. Higher wages, open factory jobs and letters from family were all attractions of the North — pull factors.",
      expVn: "Yếu tố đẩy là vấn đề ở quê nhà đẩy người ta đi. Bạo lực và luật ngăn bỏ phiếu, đi học là vấn đề ở miền Nam. Lương cao hơn, việc làm nhà máy còn trống và thư từ gia đình đều là sức hút của miền Bắc — yếu tố kéo.",
    },
    {
      id: "q5_mcq_city_table",
      type: "mcq",
      passageId: "p_migration",
      title: "5. Which conclusion is BEST supported by the city population table in the passage?",
      options: [
        { val: "A", text: "A. New York lost people between 1900 and 1930." },
        { val: "B", text: "B. Chicago was larger than New York in 1930." },
        { val: "C", text: "C. All three cities grew by exactly the same amount." },
        { val: "D", text: "D. Detroit grew the fastest in proportion to its size, becoming more than five times bigger." },
      ],
      correct: "D",
      expEn: "Compare each city's 1930 figure with its 1900 figure. Chicago and New York roughly doubled. Detroit went from 0.3 million to 1.6 million — more than five times its size — so it grew fastest in proportion. New York gained people (A is wrong) and stayed the largest (B is wrong).",
      expVn: "So sánh số liệu 1930 với 1900 của mỗi thành phố. Chicago và New York tăng khoảng gấp đôi. Detroit từ 0,3 triệu lên 1,6 triệu — hơn năm lần — nên tăng nhanh nhất theo tỷ lệ. New York tăng dân (A sai) và vẫn lớn nhất (B sai).",
    },
    {
      id: "q6_mcq_rockies",
      type: "mcq",
      title: "6. The Rocky Mountains, the Pacific coast and most of the country's deserts are found in which region of the United States?",
      options: [
        { val: "A", text: "A. Northeast" },
        { val: "B", text: "B. Midwest" },
        { val: "C", text: "C. South" },
        { val: "D", text: "D. West" },
      ],
      correct: "D",
      expEn: "The West is the largest and driest region, stretching from the Rocky Mountains to the Pacific Ocean and including the deserts of Arizona and Nevada. The Appalachians are in the East; the Great Lakes are in the Midwest.",
      expVn: "Miền Tây là vùng lớn nhất và khô nhất, trải từ dãy Rocky đến Thái Bình Dương và gồm các sa mạc ở Arizona và Nevada. Dãy Appalachian ở miền Đông; Ngũ Đại Hồ ở Trung Tây.",
    },
    {
      id: "q7_mcq_river_city",
      type: "mcq",
      title: "7. New Orleans grew into a major city at the mouth of the Mississippi River in the 1800s. What is the BEST explanation for why it grew there?",
      options: [
        { val: "A", text: "A. The land there is high and dry, so it never floods." },
        { val: "B", text: "B. Goods from the whole Mississippi valley could be shipped through it by boat." },
        { val: "C", text: "C. It is the coldest place in the South." },
        { val: "D", text: "D. It is far from any other water." },
      ],
      correct: "B",
      expEn: "Before railroads, rivers were the cheapest highways. Farm goods from the entire Mississippi valley floated downstream to New Orleans, where ocean ships could load them — so the city became a huge trading port. It is actually low and flood-prone, so A is wrong.",
      expVn: "Trước đường sắt, sông là đường cao tốc rẻ nhất. Nông sản từ cả thung lũng Mississippi xuôi dòng đến New Orleans, nơi tàu biển bốc hàng — nên thành phố thành cảng thương mại lớn. Thực ra nơi đó thấp và dễ ngập, nên A sai.",
    },
    {
      id: "q8_mcq_density",
      type: "mcq",
      title: "8. Which place has the HIGHEST population density?",
      options: [
        { val: "A", text: "A. 2,000 people living on 10 square miles" },
        { val: "B", text: "B. 10,000 people living on 100 square miles" },
        { val: "C", text: "C. 900 people living on 1 square mile" },
        { val: "D", text: "D. 3,000 people living on 6 square miles" },
      ],
      correct: "C",
      expEn: "Density is people divided by area. A: 2,000 ÷ 10 = 200 per square mile. B: 10,000 ÷ 100 = 100. C: 900 ÷ 1 = 900. D: 3,000 ÷ 6 = 500. The most crowded is C, even though it has the fewest people.",
      expVn: "Mật độ là số người chia cho diện tích. A: 2.000 ÷ 10 = 200 người/dặm vuông. B: 10.000 ÷ 100 = 100. C: 900 ÷ 1 = 900. D: 3.000 ÷ 6 = 500. Đông đúc nhất là C, dù có ít người nhất.",
    },
    {
      id: "q9_inline_environment",
      type: "inline",
      title: "9. Complete the sentences about people and the land.",
      options: [],
      textParts: [
        "Cutting down forests to make room for farms and houses is called ",
        ". The growth of cities, as farmland turns into streets and suburbs, is called ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "deforestation",
          options: [
            { val: "deforestation", text: "deforestation" },
            { val: "irrigation", text: "irrigation" },
            { val: "migration", text: "migration" },
          ],
        },
        "2": {
          correct: "urbanisation",
          options: [
            { val: "urbanisation", text: "urbanisation" },
            { val: "immigration", text: "immigration" },
            { val: "latitude", text: "latitude" },
          ],
        },
      },
      expEn: "Deforestation is clearing forests; irrigation is bringing water to dry farmland. Urbanisation is the growth of cities. Migration and immigration are about people moving, not land changing.",
      expVn: "Phá rừng là chặt rừng; tưới tiêu là đưa nước đến đất khô. Đô thị hóa là sự phát triển của thành phố. Di cư và nhập cư nói về người di chuyển, không phải đất thay đổi.",
    },
    {
      id: "q10_mcq_climate",
      type: "mcq",
      title: "10. Two cities are at sea level. City X is at 5° latitude, near the equator. City Y is at 65° latitude, far to the north. Which statement is most likely true?",
      options: [
        { val: "A", text: "A. City X is hot all year; City Y has long, cold winters." },
        { val: "B", text: "B. City Y is hotter because it is farther from the equator." },
        { val: "C", text: "C. Both cities have exactly the same climate." },
        { val: "D", text: "D. City X has snow most of the year." },
      ],
      correct: "A",
      expEn: "Climate depends mostly on latitude. Near the equator (low latitude) the sun is strong all year, giving a tropical climate. Far north (high latitude) the sun is weak for months, giving long, cold winters.",
      expVn: "Khí hậu phụ thuộc chủ yếu vào vĩ độ. Gần xích đạo (vĩ độ thấp) mặt trời mạnh quanh năm, cho khí hậu nhiệt đới. Xa về phía bắc (vĩ độ cao) mặt trời yếu nhiều tháng, cho mùa đông dài và lạnh.",
    },
  ],
};
