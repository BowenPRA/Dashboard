// src/data/GED_SCIENCE/SCI_3A/assessment.js
// Timed mixed check for Earth & Space Science. Two items read the unit's own
// READ_COMP passages (Assessment.jsx resolves passageId against unit.passages
// first), two carry a short stimulus of their own in the stem, and the seasons
// item deliberately offers the "closer to the Sun" misconception. Balanced key.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [],
  questions: [
    {
      id: "q1_mcq_crust",
      type: "mcq",
      title: "1. Which layer of the Earth is the thin, solid layer that we live on?",
      options: [
        { val: "A", text: "A. The mantle" },
        { val: "B", text: "B. The crust" },
        { val: "C", text: "C. The outer core" },
        { val: "D", text: "D. The inner core" },
      ],
      correct: "B",
      expEn: "The crust is the thin outer layer of solid rock. Under it is the thick mantle, then the liquid outer core and the solid inner core at the centre.",
      expVn: "Lớp vỏ là lớp ngoài cùng mỏng bằng đá rắn. Dưới nó là lớp phủ dày, rồi lõi ngoài lỏng và lõi trong rắn ở trung tâm.",
    },
    {
      id: "q2_mcq_transform",
      type: "mcq",
      title: "2. Two plates slide past each other sideways. No crust is made or destroyed. What is MOST likely to happen at this boundary?",
      options: [
        { val: "A", text: "A. A new ocean forms between them" },
        { val: "B", text: "B. A tall mountain range is pushed up" },
        { val: "C", text: "C. New crust forms along a ridge" },
        { val: "D", text: "D. Earthquakes, as the plates stick and then jerk free" },
      ],
      correct: "D",
      expEn: "Plates sliding past each other is a transform boundary. The rough edges stick, pressure builds, and when they suddenly slip there is an earthquake. New crust comes from divergent boundaries; mountains come from convergent ones.",
      expVn: "Các mảng trượt qua nhau là ranh giới chuyển dạng. Các cạnh gồ ghề mắc vào nhau, áp lực tích tụ, và khi chúng đột ngột trượt thì có động đất. Lớp vỏ mới đến từ ranh giới phân kỳ; núi đến từ ranh giới hội tụ.",
    },
    {
      id: "q3_mcq_passage_evidence",
      passageId: "passage_1",
      type: "mcq",
      title: "3. Read the passage. According to the text, which piece of EVIDENCE shows that the continents were once joined?",
      options: [
        { val: "A", text: "A. The inner core is made of solid metal" },
        { val: "B", text: "B. It gets hotter the deeper you go" },
        { val: "C", text: "C. The same fossils are found on both sides of the ocean" },
        { val: "D", text: "D. Most volcanoes happen at plate boundaries" },
      ],
      correct: "C",
      expEn: "The passage gives two clues that the plates move: the coastlines of Africa and South America fit together, and the same fossils are found on both sides of the ocean. The other options are true facts from the passage but are not evidence of joined continents.",
      expVn: "Đoạn văn đưa ra hai manh mối cho thấy các mảng chuyển động: đường bờ biển châu Phi và Nam Mỹ khớp nhau, và cùng loại hóa thạch được tìm thấy ở hai bên đại dương. Các phương án khác là sự thật trong đoạn văn nhưng không phải bằng chứng cho việc các lục địa từng nối liền.",
    },
    {
      id: "q4_inline_sun_gravity",
      type: "inline",
      title: "4. Complete the sentences about the solar system.",
      options: [],
      textParts: [
        "The Sun is a ",
        ", a huge ball of hot gas. The planets stay in their orbits because of the Sun's ",
        ".",
      ],
      blanks: {
        "1": {
          correct: "star",
          options: [
            { val: "star", text: "star" },
            { val: "planet", text: "planet" },
            { val: "moon", text: "moon" },
          ],
        },
        "2": {
          correct: "gravity",
          options: [
            { val: "gravity", text: "gravity" },
            { val: "heat", text: "heat" },
            { val: "light", text: "light" },
          ],
        },
      },
      expEn: "The Sun is a star — it makes its own light and heat. Its gravity pulls on every planet and bends their paths into orbits; heat and light do not hold anything in place.",
      expVn: "Mặt Trời là một ngôi sao — nó tự tạo ra ánh sáng và nhiệt. Lực hấp dẫn của nó kéo mọi hành tinh và uốn đường đi của chúng thành quỹ đạo; nhiệt và ánh sáng không giữ được vật gì tại chỗ.",
    },
    {
      id: "q5_mcq_weathering_erosion",
      type: "mcq",
      title: "5. Water freezes in a crack in a rock, expands, and splits the rock into pieces. The pieces stay where they are. This is an example of —",
      options: [
        { val: "A", text: "A. weathering — the rock is broken up in place" },
        { val: "B", text: "B. erosion — the rock is carried away" },
        { val: "C", text: "C. deposition — the rock is dropped somewhere new" },
        { val: "D", text: "D. evaporation — the water turns into a gas" },
      ],
      correct: "A",
      expEn: "Weathering is the breaking of rock where it sits. Erosion only starts when water, wind or ice carries the pieces away, and deposition is when they are dropped somewhere else.",
      expVn: "Phong hóa là sự vỡ vụn của đá ngay tại chỗ. Xói mòn chỉ bắt đầu khi nước, gió hoặc băng cuốn các mảnh đi, và bồi tụ là khi chúng được lắng đọng ở nơi khác.",
    },
    {
      id: "q6_mcq_climate",
      type: "mcq",
      title: "6. Which statement is about CLIMATE, not weather?",
      options: [
        { val: "A", text: "A. It rained heavily in Hanoi last night." },
        { val: "B", text: "B. Hanoi usually has hot, wet summers and cool, dry winters." },
        { val: "C", text: "C. Tomorrow will be cloudy with a light wind." },
        { val: "D", text: "D. The temperature this afternoon reached 34 °C." },
      ],
      correct: "B",
      expEn: "Climate is the usual pattern of weather over many years — 'usually has hot, wet summers' describes a long-term average. The other three describe one night, one day or one afternoon, which is weather.",
      expVn: "Khí hậu là mô hình thời tiết thường thấy qua nhiều năm — 'thường có mùa hè nóng, ẩm' mô tả mức trung bình dài hạn. Ba câu còn lại mô tả một đêm, một ngày hoặc một buổi chiều, đó là thời tiết.",
    },
    {
      id: "q7_mcq_greenhouse_stimulus",
      type: "mcq",
      title: "7. Read the short report, then answer.\n\n\"Carbon dioxide in the air lets sunlight through but traps some of the heat that would otherwise escape into space. Since 1900, the amount of carbon dioxide in the air has risen by about 50%, mostly from burning coal, oil and gas. Over the same period, Earth's average temperature has risen by about 1.1 °C.\"\n\nWhich conclusion is BEST supported by the report?",
      options: [
        { val: "A", text: "A. Carbon dioxide cools the Earth by blocking sunlight." },
        { val: "B", text: "B. The Sun has become much hotter since 1900." },
        { val: "C", text: "C. Burning fuels has no connection to temperature." },
        { val: "D", text: "D. More carbon dioxide from burning fuels has trapped more heat, warming the Earth." },
      ],
      correct: "D",
      expEn: "Follow the chain in the report: carbon dioxide traps heat → burning fuels added more carbon dioxide → the temperature rose. Option D is the only conclusion that uses all three facts. The report says nothing about the Sun getting hotter, and carbon dioxide traps heat rather than blocking sunlight.",
      expVn: "Hãy theo chuỗi trong báo cáo: carbon dioxide giữ nhiệt → đốt nhiên liệu thêm carbon dioxide → nhiệt độ tăng. Phương án D là kết luận duy nhất dùng cả ba dữ kiện. Báo cáo không nói gì về việc Mặt Trời nóng hơn, và carbon dioxide giữ nhiệt chứ không chặn ánh sáng mặt trời.",
    },
    {
      id: "q8_mcq_seasons",
      type: "mcq",
      title: "8. In December, the northern half of the Earth has winter. What is the reason?",
      options: [
        { val: "A", text: "A. The northern half is tilted away from the Sun, so it gets weaker sunlight and shorter days." },
        { val: "B", text: "B. The Earth is farther from the Sun in December." },
        { val: "C", text: "C. The Sun gives off less heat in December." },
        { val: "D", text: "D. The Earth stops spinning in winter." },
      ],
      correct: "A",
      expEn: "Seasons come from the tilt of Earth's axis. In December the northern half leans away from the Sun, so sunlight hits it at a low angle and the days are short. Earth's distance from the Sun barely changes, the Sun's heat does not change with the month, and Earth never stops spinning.",
      expVn: "Các mùa đến từ độ nghiêng của trục Trái Đất. Vào tháng Mười Hai, nửa phía bắc nghiêng ra xa Mặt Trời, nên ánh sáng chiếu tới ở góc thấp và ngày ngắn. Khoảng cách Trái Đất–Mặt Trời hầu như không đổi, sức nóng của Mặt Trời không thay đổi theo tháng, và Trái Đất không bao giờ ngừng quay.",
    },
    {
      id: "q9_mcq_passage_water",
      passageId: "passage_2",
      type: "mcq",
      title: "9. Read the passage. Water vapour rises high into the sky, cools, and turns into tiny drops that form a cloud. Which stage of the water cycle is this?",
      options: [
        { val: "A", text: "A. Evaporation" },
        { val: "B", text: "B. Precipitation" },
        { val: "C", text: "C. Condensation" },
        { val: "D", text: "D. Runoff" },
      ],
      correct: "C",
      expEn: "The passage says the vapour 'cools and condenses into tiny drops that form clouds' — that is condensation. Evaporation is liquid turning into vapour, precipitation is the rain or snow falling, and runoff is water flowing back over the land.",
      expVn: "Đoạn văn nói hơi nước 'nguội đi và ngưng tụ thành những giọt li ti tạo thành mây' — đó là ngưng tụ. Bay hơi là nước lỏng thành hơi, giáng thủy là mưa hoặc tuyết rơi, và chảy tràn là nước chảy về trên mặt đất.",
    },
    {
      id: "q10_mcq_renewable",
      type: "mcq",
      title: "10. A town wants an energy source that will NOT run out. Which choice is a RENEWABLE resource?",
      options: [
        { val: "A", text: "A. Coal" },
        { val: "B", text: "B. Natural gas" },
        { val: "C", text: "C. Oil" },
        { val: "D", text: "D. Wind" },
      ],
      correct: "D",
      expEn: "Wind keeps blowing no matter how much energy we take from it, so it is renewable. Coal, oil and natural gas are fossil fuels: they took millions of years to form and cannot be replaced once burned.",
      expVn: "Gió vẫn tiếp tục thổi dù ta lấy bao nhiêu năng lượng từ nó, nên nó là tài nguyên tái tạo. Than, dầu và khí tự nhiên là nhiên liệu hóa thạch: chúng mất hàng triệu năm để hình thành và không thể thay thế sau khi đốt.",
    },
  ],
};
