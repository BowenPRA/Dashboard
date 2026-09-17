// src/data/GED_HISTORY/HIST_4A/data.js
// HIST_4A — Geography & People. Geography is about 15% of the Social Studies
// test: read a map (title, legend, scale, compass, latitude/longitude; political
// vs physical vs thematic), the four US regions and their big physical
// features, population density and where people live, migration (push/pull,
// immigration waves, the Great Migration), resources and human impact, and
// climate zones. Source Analysis runs on authored SVG (diagrams.js).
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_HIST_4A_DATA = {
  meta: {
    id: "HIST_4A",
    title: "Geography & People",
    desc: "Read a map with its legend and scale, know the four US regions and their rivers and mountains, and explain where people live, why they move, and how they change the land.",
    track: "GED_HISTORY",
    icon: "Globe",
  },

  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 },
      ],
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 20 },
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
      ],
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
      ],
    },
  ],

  realWords: [
    { word: "Region", vn: "Vùng", def: "A large area that shares something in common, such as climate, landscape or culture.", vnDef: "Một khu vực rộng lớn có điểm chung, như khí hậu, địa hình hoặc văn hóa.", sent: "The Midwest is a region known for its flat farmland.", vnSent: "Trung Tây là một vùng nổi tiếng với đất nông nghiệp bằng phẳng.", isReal: true },
    { word: "Legend", vn: "Chú giải", def: "The box on a map that explains what each color, symbol or line means. Also called the key.", vnDef: "Ô trên bản đồ giải thích ý nghĩa của từng màu, ký hiệu hoặc đường. Còn gọi là bảng ký hiệu.", sent: "The legend shows that a black dot means a city.", vnSent: "Chú giải cho thấy chấm đen nghĩa là một thành phố.", isReal: true },
    { word: "Scale", vn: "Tỉ lệ", def: "The line or ratio on a map that tells you how a distance on the map matches a real distance.", vnDef: "Đường hoặc tỷ số trên bản đồ cho biết khoảng cách trên bản đồ tương ứng với khoảng cách thực như thế nào.", sent: "On this scale, one inch equals 50 miles.", vnSent: "Theo tỉ lệ này, một inch bằng 50 dặm.", isReal: true },
    { word: "Latitude", vn: "Vĩ độ", def: "Lines that run east to west and measure how far north or south of the equator a place is.", vnDef: "Các đường chạy theo hướng đông–tây, đo khoảng cách của một nơi về phía bắc hoặc nam của xích đạo.", sent: "Places near the equator have a low latitude and a hot climate.", vnSent: "Những nơi gần xích đạo có vĩ độ thấp và khí hậu nóng.", isReal: true },
    { word: "Migration", vn: "Di cư", def: "The movement of people from one place to go and live in another.", vnDef: "Sự di chuyển của con người từ một nơi để đến sống ở nơi khác.", sent: "The Great Migration moved millions of people from the South to northern cities.", vnSent: "Cuộc Đại Di cư đã đưa hàng triệu người từ miền Nam lên các thành phố miền Bắc.", isReal: true },
    { word: "Push factor", vn: "Yếu tố đẩy", def: "A problem at home that makes people want to leave, such as war, drought or no jobs.", vnDef: "Một vấn đề ở quê nhà khiến người ta muốn rời đi, như chiến tranh, hạn hán hoặc không có việc làm.", sent: "Hunger was the push factor that drove Irish families to leave in the 1840s.", vnSent: "Nạn đói là yếu tố đẩy khiến các gia đình Ireland rời đi vào thập niên 1840.", isReal: true },
    { word: "Pull factor", vn: "Yếu tố kéo", def: "Something good about a new place that attracts people, such as jobs, safety or family.", vnDef: "Điều tốt đẹp ở nơi mới thu hút người ta đến, như việc làm, sự an toàn hoặc gia đình.", sent: "Factory jobs were a strong pull factor for workers moving to Detroit.", vnSent: "Việc làm trong nhà máy là yếu tố kéo mạnh mẽ đối với công nhân chuyển đến Detroit.", isReal: true },
    { word: "Density", vn: "Mật độ", def: "How many people live in each square mile or kilometer of an area.", vnDef: "Có bao nhiêu người sống trên mỗi dặm vuông hoặc kilômét vuông của một khu vực.", sent: "A city has a much higher population density than a farm region.", vnSent: "Một thành phố có mật độ dân số cao hơn nhiều so với vùng nông thôn.", isReal: true },
    { word: "Resource", vn: "Tài nguyên", def: "Something from nature that people use, such as water, oil, forests or good soil.", vnDef: "Thứ từ thiên nhiên mà con người sử dụng, như nước, dầu, rừng hoặc đất tốt.", sent: "Oil is the most valuable resource in Texas.", vnSent: "Dầu mỏ là tài nguyên giá trị nhất ở Texas.", isReal: true },
    { word: "Urban", vn: "Đô thị", def: "Belonging to a city or town, with many people and buildings close together. The opposite is rural.", vnDef: "Thuộc về thành phố hoặc thị trấn, với nhiều người và nhà cửa sát nhau. Trái nghĩa là nông thôn.", sent: "More than 80% of Americans live in urban areas.", vnSent: "Hơn 80% người Mỹ sống ở khu vực đô thị.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "Reading a Map",
      vnTitle: "Đọc Bản đồ",
      meta: "Title, legend, scale, compass and grid",
      text: [
        "Every map on the test can be read the same way. Start with the title: it tells you what the map is about and often the year. Then find the {legend}, also called the key. It is the small box that explains what each color, symbol and line means. A blue line might be a river; a star might be a capital city. Never guess what a color means — read the legend.",
        "Next, look for the {scale}. It tells you how a distance on the map matches a real distance, for example \"one inch equals 100 miles\". With the scale you can measure how far apart two cities really are. A compass rose shows direction: north is usually at the top of the map.",
        "Many maps also have a grid of lines. Lines of {latitude} run east to west and measure how far north or south of the equator a place is. Lines of longitude run north to south and measure how far east or west it is. Together they give any place an address, like 40°N, 74°W for New York City.",
        "Finally, ask what kind of map it is. A political map shows borders, countries, states and cities. A physical map shows land and water: mountains, rivers, deserts and lakes. A thematic map shows one topic, such as rainfall, population or election results, usually with shades of color explained in the legend.",
      ].join(" "),
      vnText: [
        "Mọi bản đồ trong bài thi đều có thể đọc theo cùng một cách. Bắt đầu với tiêu đề: nó cho biết bản đồ nói về điều gì và thường có cả năm. Sau đó tìm chú giải, còn gọi là bảng ký hiệu. Đó là ô nhỏ giải thích ý nghĩa của từng màu, ký hiệu và đường. Một đường xanh có thể là con sông; một ngôi sao có thể là thủ đô. Đừng bao giờ đoán ý nghĩa của màu — hãy đọc chú giải.",
        "Tiếp theo, tìm tỉ lệ. Nó cho biết khoảng cách trên bản đồ tương ứng với khoảng cách thực như thế nào, ví dụ \"một inch bằng 100 dặm\". Với tỉ lệ, bạn có thể đo hai thành phố thực sự cách nhau bao xa. Hoa gió chỉ hướng: bắc thường ở phía trên bản đồ.",
        "Nhiều bản đồ còn có lưới các đường kẻ. Các đường vĩ độ chạy theo hướng đông–tây và đo một nơi cách xích đạo bao xa về phía bắc hoặc nam. Các đường kinh độ chạy theo hướng bắc–nam và đo nơi đó cách bao xa về phía đông hoặc tây. Cùng nhau, chúng cho mọi nơi một địa chỉ, như 40°B, 74°T cho thành phố New York.",
        "Cuối cùng, hãy hỏi đó là loại bản đồ gì. Bản đồ chính trị cho thấy biên giới, quốc gia, tiểu bang và thành phố. Bản đồ tự nhiên cho thấy đất và nước: núi, sông, sa mạc và hồ. Bản đồ chuyên đề cho thấy một chủ đề, như lượng mưa, dân số hoặc kết quả bầu cử, thường bằng các sắc độ màu được giải thích trong chú giải.",
      ].join(" "),
      glossary: {
        "legend": { vn: "Chú giải", def: "The box that explains what each color and symbol means." },
        "scale": { vn: "Tỉ lệ", def: "How a distance on the map matches a real distance." },
        "compass rose": { vn: "Hoa gió", def: "The symbol on a map that shows north, south, east and west." },
        "thematic map": { vn: "Bản đồ chuyên đề", def: "A map that shows one topic, such as rainfall or population." },
      },
    },
    {
      id: "passage_2",
      title: "Where People Live, and Why",
      vnTitle: "Người ta Sống ở đâu, và Vì sao",
      meta: "Regions, density and the growth of cities",
      text: [
        "The United States is usually divided into four large areas, and each {region} has its own landscape. The Northeast is small, old and crowded, with the Appalachian Mountains and big port cities like New York and Boston. The Midwest is flat farmland around the Great Lakes and the upper Mississippi River — the country's breadbasket. The South is warm, stretching from the Atlantic coast to Texas along the Gulf of Mexico. The West is huge and dry, with the Rocky Mountains, deserts and the long Pacific coast.",
        "People are not spread evenly across this land. Population {density} — the number of people per square mile — is highest in the Northeast and lowest in the West, where mountains and deserts make farming and building hard. People settle where life is easier: flat land, good soil, mild weather and, above all, water.",
        "That is why so many great cities grew beside water. Rivers, lakes and the coast gave early settlers drinking water, fish and rich farmland, and they were the highways of the past: a boat could carry goods far more cheaply than a wagon. New Orleans sits at the mouth of the Mississippi, Chicago on Lake Michigan, and New York on one of the world's best natural harbors. Today more than 80% of Americans live in {urban} areas, and the largest cities are still the old ports and river towns.",
      ].join(" "),
      vnText: [
        "Nước Mỹ thường được chia thành bốn khu vực lớn, và mỗi vùng có địa hình riêng. Đông Bắc nhỏ, lâu đời và đông đúc, với dãy núi Appalachian và các thành phố cảng lớn như New York và Boston. Trung Tây là đất nông nghiệp bằng phẳng quanh Ngũ Đại Hồ và thượng nguồn sông Mississippi — vựa lúa mì của đất nước. Miền Nam ấm áp, trải dài từ bờ Đại Tây Dương đến Texas dọc theo Vịnh Mexico. Miền Tây rộng lớn và khô, với dãy núi Rocky, sa mạc và bờ biển Thái Bình Dương dài.",
        "Con người không phân bố đều trên vùng đất này. Mật độ dân số — số người trên mỗi dặm vuông — cao nhất ở Đông Bắc và thấp nhất ở miền Tây, nơi núi và sa mạc khiến việc canh tác và xây dựng khó khăn. Người ta định cư ở nơi cuộc sống dễ dàng hơn: đất bằng phẳng, đất tốt, thời tiết ôn hòa và, trên hết, có nước.",
        "Đó là lý do nhiều thành phố lớn mọc lên bên nguồn nước. Sông, hồ và bờ biển cho những người định cư đầu tiên nước uống, cá và đất nông nghiệp màu mỡ, và chúng là đường cao tốc của quá khứ: một chiếc thuyền chở hàng rẻ hơn nhiều so với xe ngựa. New Orleans nằm ở cửa sông Mississippi, Chicago bên hồ Michigan, và New York bên một trong những cảng tự nhiên tốt nhất thế giới. Ngày nay hơn 80% người Mỹ sống ở khu vực đô thị, và các thành phố lớn nhất vẫn là những cảng và thị trấn ven sông xưa.",
      ].join(" "),
      glossary: {
        "breadbasket": { vn: "Vựa lúa", def: "A region that grows a large share of a country's grain." },
        "density": { vn: "Mật độ", def: "The number of people per square mile." },
        "harbor": { vn: "Cảng / vũng tàu", def: "A sheltered place on the coast where ships can dock safely." },
      },
    },
    {
      id: "passage_3",
      title: "Why People Move",
      vnTitle: "Vì sao Con người Di chuyển",
      meta: "Push and pull, immigration and the Great Migration",
      text: [
        "Throughout history, people have moved in search of a better life. This movement is called {migration}. Geographers explain it with two kinds of reasons. The {push} factors are problems at home that drive people out: hunger, war, floods, unfair laws or no work. The {pull} factors are the good things that draw people to a new place: jobs, safety, cheap land, good schools or family who are already there. Most people move because of both at once.",
        "The United States was built by waves of immigration. In the 1840s, a terrible potato famine pushed more than a million Irish to American cities. Between 1880 and 1920, millions more arrived from Italy, Poland, Russia and other parts of Europe, pulled by factory jobs, and most entered through New York. Since 1965, the largest groups have come from Latin America and Asia, including Vietnam.",
        "Migration also happens inside a country. From about 1916 to 1970, in what is called the Great Migration, some six million African Americans left the rural South. Low pay, unfair laws and violence pushed them out; factory jobs in Chicago, Detroit, New York and Los Angeles pulled them in. Cities grew fast, and human activity changed the land around them: forests were cut for farms and houses, rivers were dammed for water and power, and farmland became suburbs. Every place people settle, they use resources — and leave a mark.",
      ].join(" "),
      vnText: [
        "Trong suốt lịch sử, con người đã di chuyển để tìm cuộc sống tốt hơn. Sự di chuyển này gọi là di cư. Các nhà địa lý giải thích nó bằng hai loại lý do. Yếu tố đẩy là những vấn đề ở quê nhà đẩy người ta ra đi: đói kém, chiến tranh, lũ lụt, luật lệ bất công hoặc không có việc làm. Yếu tố kéo là những điều tốt đẹp lôi cuốn người ta đến nơi mới: việc làm, sự an toàn, đất rẻ, trường học tốt hoặc gia đình đã ở đó. Hầu hết mọi người di chuyển vì cả hai cùng lúc.",
        "Nước Mỹ được xây dựng bởi các làn sóng nhập cư. Vào thập niên 1840, nạn đói khoai tây khủng khiếp đã đẩy hơn một triệu người Ireland đến các thành phố Mỹ. Từ 1880 đến 1920, hàng triệu người nữa đến từ Ý, Ba Lan, Nga và các vùng khác của châu Âu, bị thu hút bởi việc làm trong nhà máy, và hầu hết vào qua New York. Từ năm 1965, các nhóm lớn nhất đến từ Mỹ Latinh và châu Á, trong đó có Việt Nam.",
        "Di cư cũng diễn ra bên trong một quốc gia. Từ khoảng 1916 đến 1970, trong cái gọi là cuộc Đại Di cư, khoảng sáu triệu người Mỹ gốc Phi đã rời miền Nam nông thôn. Lương thấp, luật lệ bất công và bạo lực đẩy họ đi; việc làm trong nhà máy ở Chicago, Detroit, New York và Los Angeles kéo họ đến. Các thành phố lớn nhanh, và hoạt động của con người làm thay đổi đất đai xung quanh: rừng bị chặt để làm nông trại và nhà ở, sông bị đắp đập lấy nước và điện, và đất nông nghiệp trở thành ngoại ô. Ở bất cứ nơi nào con người định cư, họ dùng tài nguyên — và để lại dấu vết.",
      ].join(" "),
      glossary: {
        "famine": { vn: "Nạn đói", def: "A time when there is not enough food and many people go hungry." },
        "immigration": { vn: "Nhập cư", def: "Coming into a new country to live there." },
        "Great Migration": { vn: "Cuộc Đại Di cư", def: "The movement of about six million African Americans out of the rural South, 1916–1970." },
        "suburbs": { vn: "Ngoại ô", def: "Housing areas on the edge of a city." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "Name three parts of a map that help you read it, and say what each one tells you.",
      suggestedWords: [["title"], ["symbol", "color"], ["distance", "direction"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Names the legend/key and states it explains what the colors and symbols mean.",
        "Names the scale and states it shows how map distance matches real distance.",
        "Names a third part (title, compass rose, or latitude/longitude grid) and states what it tells you.",
      ],
      modelAnswer: "The legend, or key, explains what each color and symbol on the map means, such as a star for a capital. The scale shows how a distance on the map matches a real distance, so you can measure how far apart two places are. The compass rose shows direction — which way is north, south, east and west.",
      vnTranslation: "Nêu ba phần của bản đồ giúp bạn đọc nó, và cho biết mỗi phần nói lên điều gì.",
    },
    {
      id: "qa2",
      question: "What is the difference between a political map and a physical map? Give one example of something you would find on each.",
      suggestedWords: [["borders", "cities"], ["mountains", "rivers", "landscape"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that a political map shows human divisions — borders, countries, states, cities — with a correct example.",
        "States that a physical map shows natural features — mountains, rivers, lakes, deserts — with a correct example.",
      ],
      modelAnswer: "A political map shows things people have made, such as the borders of countries and states and the location of cities; for example, it would show the border between Texas and Mexico. A physical map shows natural features of the land and water, such as mountains, rivers and lakes; for example, it would show the Rocky Mountains and the Mississippi River.",
      vnTranslation: "Bản đồ chính trị và bản đồ tự nhiên khác nhau thế nào? Cho một ví dụ về thứ bạn sẽ thấy trên mỗi loại.",
    },
    {
      id: "qa3",
      question: "Explain the difference between a push factor and a pull factor in migration. Give one example of each.",
      suggestedWords: [["leave", "home"], ["attract", "new place"], ["jobs", "war", "famine"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that a push factor is a problem at home that makes people leave.",
        "States that a pull factor is something good about a new place that attracts people.",
        "Gives one correct example of each (e.g. famine/war/no jobs vs jobs/safety/family).",
      ],
      modelAnswer: "A push factor is a problem in a person's home place that makes them want to leave, such as a famine, a war or no jobs. A pull factor is something good about a new place that attracts people to it, such as factory jobs, safety or family who already live there. For example, the potato famine pushed Irish families out of Ireland, and jobs in American cities pulled them in.",
      vnTranslation: "Giải thích sự khác nhau giữa yếu tố đẩy và yếu tố kéo trong di cư. Cho một ví dụ về mỗi loại.",
    },
    {
      id: "qa4",
      question: "Why did so many large American cities grow next to a river, a lake or the ocean? Give two reasons.",
      suggestedWords: [["drinking", "farmland", "fish"], ["boats", "trade", "transport"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Gives a reason linked to living: water for drinking, fishing, or rich farmland beside the water.",
        "Gives a reason linked to transport and trade: boats carried goods and people cheaply, so ports and river towns became trade centers.",
      ],
      modelAnswer: "Cities grew beside water for two main reasons. First, water was needed for daily life: people had water to drink, fish to eat and rich soil for farming along the banks. Second, water was the cheapest way to move goods before roads and railroads, so towns on a river, lake or harbor became busy trading centers, like New Orleans on the Mississippi or New York on its harbor.",
      vnTranslation: "Vì sao nhiều thành phố lớn của Mỹ mọc lên cạnh sông, hồ hoặc biển? Nêu hai lý do.",
    },
    {
      id: "qa5",
      question: "Describe one way that people change the natural environment when a city grows, and one problem this can cause.",
      suggestedWords: [["forest", "river", "farmland"], ["flood", "pollution", "habitat"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Describes one human change to the environment (e.g. cutting forests, damming rivers, paving farmland, pumping groundwater).",
        "Names a sensible problem caused by that change (e.g. flooding, loss of animal habitat, water shortage, pollution).",
      ],
      modelAnswer: "When a city grows, people often cut down forests to build houses and roads. This is called deforestation. One problem it causes is that animals lose their habitat, and without trees to hold the soil, heavy rain can wash the soil away and cause flooding in the city below.",
      vnTranslation: "Mô tả một cách con người làm thay đổi môi trường tự nhiên khi một thành phố phát triển, và một vấn đề mà điều này có thể gây ra.",
    },
  ],

  // Source Analysis on authored SVG sources — a thematic map with a legend, a
  // region table, and a push/pull diagram. 2 MCQ : 1 written. The grader is
  // blind, so the written mark scheme describes the diagram in words.
  diagrams: [
    {
      id: "diag_1_density_map",
      type: "mcq",
      inlineSvg: DIAGRAMS.DENSITY_MAP,
      imageAlt: "A thematic map of the four US regions shaded by people per square mile. The legend shows four shades: under 50, 50 to 99, 100 to 199, and 200 or more. The Northeast is the darkest, the South is medium, the Midwest is light, and the West is the lightest.",
      promptText: "This thematic map shades each US region by population density — people per square mile. Use the legend. Which region has FEWER THAN 50 people per square mile?",
      options: [
        { val: "A", text: "Northeast", textVn: "Đông Bắc" },
        { val: "B", text: "South", textVn: "Miền Nam" },
        { val: "C", text: "Midwest", textVn: "Trung Tây" },
        { val: "D", text: "West", textVn: "Miền Tây" },
      ],
      correct: "D",
      marks: 1,
      expEn: "Match each region's shade to the legend. The West is the palest shade, which the legend labels 'Under 50'. The Northeast is the darkest ('200 or more'), the South is '100 to 199' and the Midwest is '50 to 99'. The legend, not the size of the block, tells you the density.",
      expVn: "Đối chiếu sắc độ của mỗi vùng với chú giải. Miền Tây có màu nhạt nhất, chú giải ghi 'Dưới 50'. Đông Bắc đậm nhất ('200 trở lên'), miền Nam là '100 đến 199' và Trung Tây là '50 đến 99'. Chú giải, chứ không phải kích thước khối, cho biết mật độ.",
    },
    {
      id: "diag_2_region_table",
      type: "mcq",
      inlineSvg: DIAGRAMS.REGION_TABLE,
      imageAlt: "A table comparing four US regions. Northeast: 58 million people, 162 thousand square miles, 355 people per square mile. Midwest: 69 million, 751 thousand square miles, 92 per square mile. South: 126 million, 868 thousand square miles, 145 per square mile. West: 79 million, 1,751 thousand square miles, 45 per square mile.",
      promptText: "This table compares the four US regions by population, land area and people per square mile. Which statement is supported by the table?",
      options: [
        { val: "A", text: "The South has the most people, but the Northeast is the most crowded.", textVn: "Miền Nam có nhiều người nhất, nhưng Đông Bắc là nơi đông đúc nhất." },
        { val: "B", text: "The West has the most people because it has the most land.", textVn: "Miền Tây có nhiều người nhất vì có nhiều đất nhất." },
        { val: "C", text: "The Midwest has fewer people than the Northeast.", textVn: "Trung Tây có ít người hơn Đông Bắc." },
        { val: "D", text: "The Northeast has the largest land area.", textVn: "Đông Bắc có diện tích đất lớn nhất." },
      ],
      correct: "A",
      marks: 1,
      expEn: "Read the columns separately. Population: the South is highest at 126 million. People per square mile: the Northeast is highest at 355, so it is the most crowded. The West has the most land but only 79 million people (B is wrong); the Midwest's 69 million is more than the Northeast's 58 (C is wrong); the Northeast has the smallest area (D is wrong).",
      expVn: "Đọc từng cột riêng. Dân số: miền Nam cao nhất với 126 triệu. Người trên dặm vuông: Đông Bắc cao nhất với 355, nên là nơi đông đúc nhất. Miền Tây có nhiều đất nhất nhưng chỉ 79 triệu người (B sai); 69 triệu của Trung Tây nhiều hơn 58 của Đông Bắc (C sai); Đông Bắc có diện tích nhỏ nhất (D sai).",
    },
    {
      id: "diag_3_push_pull",
      inlineSvg: DIAGRAMS.PUSH_PULL,
      imageAlt: "A diagram with two boxes joined by an arrow labelled MOVE. The left box, HOME, lists push factors: no jobs or low pay, war or danger, drought or flood, unfair laws, no land to farm. The right box, NEW PLACE, lists pull factors: jobs and higher pay, safety and freedom, family already there, good schools, cheap land.",
      promptText: "This diagram shows push and pull factors of migration. A farmer leaves his village after two years of drought and moves to a city where his cousin has found him a job in a factory. Using the diagram, name the PUSH factor and the PULL factor in his story, and explain how the two kinds of factor are different.",
      suggestedWords: [["home", "village"], ["new place", "city"], ["leave", "attract"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies the push factor: the drought (a problem at home that makes him leave).",
        "Identifies the pull factor: the factory job and/or the cousin already in the city (something good that attracts him).",
        "Explains the difference: push factors are problems in the old place that drive people out; pull factors are attractions of the new place that draw people in.",
      ],
      modelAnswer: "The push factor is the drought. Two years without rain means the farmer cannot grow enough to live on, so the problem at home pushes him to leave. The pull factor is the factory job, together with his cousin who is already there and can help him settle. The difference is that push factors are problems in the old place that force people out, while pull factors are good things about the new place that attract people in. Most migrants, like this farmer, have both.",
      vnTranslation: "Sơ đồ này cho thấy các yếu tố đẩy và kéo của di cư. Một nông dân rời làng sau hai năm hạn hán và chuyển đến thành phố nơi người anh họ đã tìm cho anh một việc trong nhà máy. Dựa vào sơ đồ, hãy gọi tên yếu tố ĐẨY và yếu tố KÉO trong câu chuyện của anh ấy, và giải thích hai loại yếu tố khác nhau thế nào.",
    },
  ],

  assessment,
  notes,
};
