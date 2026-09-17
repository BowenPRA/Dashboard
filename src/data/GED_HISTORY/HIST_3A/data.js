// src/data/GED_HISTORY/HIST_3A/data.js
// HIST_3A — Economics: Markets, Money & Choices. Economics is about 15% of the
// Social Studies test, and almost every item is "read a graph or table, then
// reason about cause and effect". Scarcity and opportunity cost, supply and
// demand, competition vs monopoly, money and banks, inflation, taxes and public
// goods, GDP and unemployment, specialisation and trade. Source Analysis runs
// on authored SVG (diagrams.js) so every number is ours.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_HIST_3A_DATA = {
  meta: {
    id: "HIST_3A",
    title: "Economics: Markets, Money & Choices",
    desc: "Why prices rise and fall, what a bank does with your money, and what a tax pays for — read a supply-and-demand graph, a price chart and a budget the way the test asks.",
    track: "GED_HISTORY",
    icon: "Coins",
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
    { word: "Scarcity", vn: "Sự khan hiếm", def: "Not having enough of something for everyone who wants it. People have unlimited wants but limited money, time and resources.", vnDef: "Không có đủ một thứ gì đó cho tất cả những ai muốn nó. Con người có mong muốn vô hạn nhưng tiền bạc, thời gian và tài nguyên thì có hạn.", sent: "Because of scarcity, a family cannot buy everything it wants.", vnSent: "Vì sự khan hiếm, một gia đình không thể mua mọi thứ mình muốn.", isReal: true },
    { word: "Opportunity cost", vn: "Chi phí cơ hội", def: "The next-best thing you give up when you make a choice.", vnDef: "Điều tốt nhất tiếp theo mà bạn từ bỏ khi đưa ra một lựa chọn.", sent: "If you spend the evening at work, the opportunity cost is the time with your family.", vnSent: "Nếu bạn dành buổi tối để đi làm, chi phí cơ hội là thời gian bên gia đình.", isReal: true },
    { word: "Supply", vn: "Cung", def: "The amount of a product that sellers are willing to sell at each price.", vnDef: "Lượng sản phẩm mà người bán sẵn sàng bán ở mỗi mức giá.", sent: "When the price of coffee rises, farmers increase the supply.", vnSent: "Khi giá cà phê tăng, nông dân tăng lượng cung.", isReal: true },
    { word: "Demand", vn: "Cầu", def: "The amount of a product that buyers are willing to buy at each price.", vnDef: "Lượng sản phẩm mà người mua sẵn sàng mua ở mỗi mức giá.", sent: "In a heat wave, the demand for fans goes up.", vnSent: "Trong đợt nắng nóng, cầu về quạt tăng lên.", isReal: true },
    { word: "Equilibrium", vn: "Điểm cân bằng", def: "The price where the amount buyers want equals the amount sellers offer, so nothing is left over and nothing is short.", vnDef: "Mức giá mà lượng người mua muốn bằng lượng người bán đưa ra, nên không thừa cũng không thiếu.", sent: "At equilibrium, every T-shirt made finds a buyer.", vnSent: "Tại điểm cân bằng, mọi chiếc áo thun làm ra đều có người mua.", isReal: true },
    { word: "Monopoly", vn: "Độc quyền", def: "A market with only one seller, so buyers have no other choice.", vnDef: "Một thị trường chỉ có một người bán, nên người mua không có lựa chọn nào khác.", sent: "The only water company in town is a monopoly.", vnSent: "Công ty nước duy nhất trong thị trấn là một công ty độc quyền.", isReal: true },
    { word: "Interest", vn: "Tiền lãi", def: "The extra money paid for using someone else's money — a bank pays it to savers and charges it to borrowers.", vnDef: "Khoản tiền thêm phải trả khi dùng tiền của người khác — ngân hàng trả lãi cho người gửi và thu lãi từ người vay.", sent: "She paid $50 in interest on the loan.", vnSent: "Cô ấy trả 50 đô la tiền lãi cho khoản vay.", isReal: true },
    { word: "Inflation", vn: "Lạm phát", def: "A general rise in prices over time, so each dollar buys less than before.", vnDef: "Sự tăng giá chung theo thời gian, khiến mỗi đô la mua được ít hơn trước.", sent: "With 5% inflation, a $100 bag of groceries costs $105 next year.", vnSent: "Với lạm phát 5%, túi hàng tạp hóa 100 đô la sẽ có giá 105 đô la vào năm sau.", isReal: true },
    { word: "Budget", vn: "Ngân sách", def: "A plan for how money coming in will be spent and saved.", vnDef: "Kế hoạch cho việc tiền thu vào sẽ được chi tiêu và tiết kiệm như thế nào.", sent: "Their budget puts $300 a month into savings.", vnSent: "Ngân sách của họ dành 300 đô la mỗi tháng để tiết kiệm.", isReal: true },
    { word: "Tariff", vn: "Thuế nhập khẩu", def: "A tax that a government puts on goods coming in from another country.", vnDef: "Loại thuế mà chính phủ đánh vào hàng hóa nhập từ nước khác.", sent: "A tariff on imported steel makes foreign steel more expensive.", vnSent: "Thuế nhập khẩu đánh vào thép nhập khẩu khiến thép nước ngoài đắt hơn.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "Scarcity and Choice",
      vnTitle: "Khan hiếm và Lựa chọn",
      meta: "Why every choice has a cost",
      text: [
        "Economics starts with one simple problem: people want more than they can have. Money, time, land and workers are all limited. This problem is called {scarcity}, and it is why everyone — a family, a business, a government — must make choices.",
        "Every choice has a cost, even when no money changes hands. When you choose one thing, you give up the next-best thing you could have chosen. That lost choice is the {opportunity} cost. If a student spends Saturday working for $80, the opportunity cost is the day of rest or study she gave up. If a city spends its money on a new road, the opportunity cost might be the park it did not build.",
        "A family manages scarcity with a {budget}: a plan that lists the money coming in and decides how much goes to rent, food, transport and savings. On the test, you may be given a budget table and asked what a family must give up to save more. The answer is always an opportunity cost.",
      ].join(" "),
      vnText: [
        "Kinh tế học bắt đầu từ một vấn đề đơn giản: con người muốn nhiều hơn những gì họ có thể có. Tiền bạc, thời gian, đất đai và nhân công đều có hạn. Vấn đề này gọi là sự khan hiếm, và đó là lý do mọi người — một gia đình, một doanh nghiệp, một chính phủ — đều phải lựa chọn.",
        "Mọi lựa chọn đều có chi phí, ngay cả khi không có tiền trao tay. Khi bạn chọn một thứ, bạn từ bỏ điều tốt nhất tiếp theo mà bạn có thể chọn. Lựa chọn bị mất đó là chi phí cơ hội. Nếu một sinh viên dành ngày thứ Bảy đi làm kiếm 80 đô la, chi phí cơ hội là ngày nghỉ ngơi hoặc học tập mà cô ấy đã từ bỏ. Nếu một thành phố dùng tiền xây con đường mới, chi phí cơ hội có thể là công viên mà nó đã không xây.",
        "Một gia đình quản lý sự khan hiếm bằng ngân sách: một kế hoạch liệt kê tiền thu vào và quyết định bao nhiêu dành cho tiền thuê nhà, thức ăn, đi lại và tiết kiệm. Trong bài thi, bạn có thể được cho một bảng ngân sách và hỏi gia đình phải từ bỏ gì để tiết kiệm nhiều hơn. Câu trả lời luôn là một chi phí cơ hội.",
      ].join(" "),
      glossary: {
        "scarcity": { vn: "Sự khan hiếm", def: "Not having enough of something for everyone who wants it." },
        "opportunity cost": { vn: "Chi phí cơ hội", def: "The next-best thing you give up when you make a choice." },
        "budget": { vn: "Ngân sách", def: "A plan for how money coming in will be spent and saved." },
      },
    },
    {
      id: "passage_2",
      title: "Supply, Demand and Price",
      vnTitle: "Cung, Cầu và Giá cả",
      meta: "How a market finds a price",
      text: [
        "In a market, nobody sets the price alone. Sellers decide how much they are willing to sell at each price — this is {supply}. When the price is high, sellers offer more, because they can make more profit. Buyers decide how much they are willing to buy at each price — this is {demand}. When the price is high, buyers want less.",
        "Put the two together and the price settles where they meet. At that point, called {equilibrium}, the amount buyers want is exactly the amount sellers offer. If the price is set too high, sellers have goods left over — a surplus — and they cut the price. If the price is too low, goods run out — a shortage — and the price rises.",
        "Prices also move when supply or demand shifts. A drought that ruins the coffee crop cuts supply, so coffee prices rise. A new fashion for a toy raises demand, so its price rises. Competition between many sellers keeps prices low, because each seller must attract buyers. But when one company is the only seller — a {monopoly} — it can charge more, because buyers have nowhere else to go.",
      ].join(" "),
      vnText: [
        "Trong một thị trường, không ai tự mình đặt giá. Người bán quyết định họ sẵn sàng bán bao nhiêu ở mỗi mức giá — đây là cung. Khi giá cao, người bán đưa ra nhiều hơn, vì họ có thể kiếm nhiều lợi nhuận hơn. Người mua quyết định họ sẵn sàng mua bao nhiêu ở mỗi mức giá — đây là cầu. Khi giá cao, người mua muốn ít hơn.",
        "Ghép hai điều này lại và giá sẽ dừng ở nơi chúng gặp nhau. Tại điểm đó, gọi là điểm cân bằng, lượng người mua muốn đúng bằng lượng người bán đưa ra. Nếu giá đặt quá cao, người bán còn hàng thừa — dư cung — và họ hạ giá. Nếu giá quá thấp, hàng hết sạch — thiếu hụt — và giá tăng lên.",
        "Giá cũng thay đổi khi cung hoặc cầu dịch chuyển. Một đợt hạn hán làm hỏng vụ cà phê sẽ cắt giảm cung, nên giá cà phê tăng. Một món đồ chơi mới thành mốt làm tăng cầu, nên giá của nó tăng. Sự cạnh tranh giữa nhiều người bán giữ giá thấp, vì mỗi người bán phải thu hút người mua. Nhưng khi một công ty là người bán duy nhất — độc quyền — nó có thể tính giá cao hơn, vì người mua không có nơi nào khác để đến.",
      ].join(" "),
      glossary: {
        "surplus": { vn: "Dư cung", def: "Goods left over because the price is too high." },
        "shortage": { vn: "Thiếu hụt", def: "Goods run out because the price is too low." },
        "monopoly": { vn: "Độc quyền", def: "A market with only one seller." },
      },
    },
    {
      id: "passage_3",
      title: "Money, Banks and Prices",
      vnTitle: "Tiền, Ngân hàng và Giá cả",
      meta: "Saving, borrowing and inflation",
      text: [
        "A bank is a business that works with money. When you save money in a bank, the bank pays you a small amount of extra money called {interest}. The bank then lends your money to other people — to buy a house, a car or start a business — and charges them interest that is higher than what it pays you. The difference is the bank's profit. Borrowing always costs more than the amount you borrow, because the lender takes a risk and waits for the money to come back.",
        "Over time, most prices slowly rise. This general rise in prices is called {inflation}. Inflation lowers the purchasing power of money: the same $20 buys fewer groceries this year than it did five years ago. A worker whose pay does not rise as fast as prices becomes poorer, even though the number on the paycheck stays the same.",
        "Governments also shape prices. Taxes on income and sales pay for public goods that everyone shares — roads, police, schools and clean water. A {tariff} is a special tax on goods from other countries. It makes imported goods cost more, which protects local producers but raises prices for shoppers. To judge a country's economy, people watch two numbers: GDP, the total value of everything the country produces in a year, and the unemployment rate, the share of workers who want a job but cannot find one.",
      ].join(" "),
      vnText: [
        "Ngân hàng là một doanh nghiệp làm việc với tiền. Khi bạn gửi tiết kiệm ở ngân hàng, ngân hàng trả cho bạn một khoản tiền thêm nhỏ gọi là tiền lãi. Sau đó ngân hàng cho người khác vay tiền của bạn — để mua nhà, mua xe hoặc mở doanh nghiệp — và thu của họ tiền lãi cao hơn mức trả cho bạn. Phần chênh lệch là lợi nhuận của ngân hàng. Vay tiền luôn tốn nhiều hơn số tiền bạn vay, vì người cho vay chịu rủi ro và phải chờ tiền quay về.",
        "Theo thời gian, hầu hết giá cả tăng dần. Sự tăng giá chung này gọi là lạm phát. Lạm phát làm giảm sức mua của tiền: cùng 20 đô la năm nay mua được ít hàng tạp hóa hơn so với năm năm trước. Một người lao động có lương không tăng nhanh bằng giá cả sẽ nghèo đi, dù con số trên phiếu lương vẫn như cũ.",
        "Chính phủ cũng ảnh hưởng đến giá cả. Thuế thu nhập và thuế bán hàng chi trả cho hàng hóa công cộng mà mọi người cùng dùng — đường sá, cảnh sát, trường học và nước sạch. Thuế nhập khẩu là loại thuế đặc biệt đánh vào hàng từ nước khác. Nó làm hàng nhập khẩu đắt hơn, bảo vệ nhà sản xuất trong nước nhưng làm tăng giá cho người mua sắm. Để đánh giá nền kinh tế của một quốc gia, người ta theo dõi hai con số: GDP, tổng giá trị mọi thứ quốc gia đó sản xuất trong một năm, và tỷ lệ thất nghiệp, phần người lao động muốn có việc nhưng không tìm được.",
      ].join(" "),
      glossary: {
        "interest": { vn: "Tiền lãi", def: "Extra money paid for using someone else's money." },
        "purchasing power": { vn: "Sức mua", def: "How much a sum of money can actually buy." },
        "public goods": { vn: "Hàng hóa công cộng", def: "Things paid for by taxes that everyone shares, like roads." },
        "GDP": { vn: "Tổng sản phẩm quốc nội", def: "The total value of everything a country produces in a year." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "What is opportunity cost? Give one example from everyday life.",
      suggestedWords: [["choice", "choose"], ["give up", "next-best"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that opportunity cost is the next-best thing you give up when you make a choice.",
        "Gives a sensible everyday example of a choice and what was given up.",
      ],
      modelAnswer: "Opportunity cost is the next-best thing you give up when you make a choice. For example, if I spend $30 on a concert ticket, the opportunity cost is the dinner out I could have bought with the same money.",
      vnTranslation: "Chi phí cơ hội là gì? Cho một ví dụ trong đời sống hằng ngày.",
    },
    {
      id: "qa2",
      question: "A frost destroys half of the orange crop in Florida. Explain what happens to the supply of oranges and to their price, and why.",
      suggestedWords: [["supply"], ["shortage", "less", "fewer"], ["buyers", "sellers"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the supply of oranges falls (fewer oranges are available to sell).",
        "States that the price of oranges rises.",
        "Explains the link: with fewer oranges but the same buyers, buyers compete for what is left, so sellers can charge more.",
      ],
      modelAnswer: "The frost cuts the supply of oranges, because there are far fewer oranges for sellers to offer. Buyers still want about the same amount, so there is a shortage. Buyers compete for the oranges that are left, and sellers can charge more, so the price of oranges rises.",
      vnTranslation: "Một đợt sương giá phá hủy một nửa vụ cam ở Florida. Giải thích điều gì xảy ra với cung cam và giá cam, và vì sao.",
    },
    {
      id: "qa3",
      question: "Why does borrowing $1,000 from a bank cost more than $1,000 to pay back?",
      suggestedWords: [["lender", "bank"], ["risk", "wait"], ["profit"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that the borrower pays interest on top of the amount borrowed.",
        "Gives a reason the bank charges interest: it takes a risk / waits for its money / needs a profit to pay its savers.",
      ],
      modelAnswer: "When you borrow $1,000, you must pay back the $1,000 plus interest. The bank charges interest because it takes a risk that you might not pay, it has to wait months or years to get its money back, and it needs a profit so it can pay interest to the people who saved that money.",
      vnTranslation: "Vì sao vay 1.000 đô la từ ngân hàng lại tốn nhiều hơn 1.000 đô la để trả lại?",
    },
    {
      id: "qa4",
      question: "What is inflation, and how does it affect a worker whose pay stays the same for five years?",
      suggestedWords: [["prices", "rise"], ["purchasing power", "buy"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Defines inflation as a general rise in prices over time.",
        "Explains that the worker's purchasing power falls: the same pay buys less, so the worker is effectively poorer.",
      ],
      modelAnswer: "Inflation is a general rise in prices over time. If a worker's pay stays the same for five years while prices rise, the same paycheck buys less food, fuel and rent than before. His purchasing power falls, so he is poorer even though the number on his paycheck has not changed.",
      vnTranslation: "Lạm phát là gì, và nó ảnh hưởng thế nào đến một người lao động có lương giữ nguyên trong năm năm?",
    },
    {
      id: "qa5",
      question: "Why are prices usually higher in a monopoly than in a market with many sellers?",
      suggestedWords: [["competition", "compete"], ["choice", "customers"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Explains that with many sellers, each must keep prices low to attract buyers (competition).",
        "Explains that a monopoly is the only seller, so buyers have no other choice and it can charge more.",
      ],
      modelAnswer: "In a market with many sellers, each seller must keep prices low, because a buyer who thinks the price is too high can simply go to another seller. A monopoly is the only seller, so buyers have no other choice. Because customers cannot go anywhere else, the monopoly can charge a higher price.",
      vnTranslation: "Vì sao giá cả trong thị trường độc quyền thường cao hơn so với thị trường có nhiều người bán?",
    },
  ],

  // Source Analysis on authored SVG sources — a supply & demand graph, a price
  // chart and a budget table. 2 MCQ : 1 written. The grader is blind, so the
  // written mark scheme describes the table in words.
  diagrams: [
    {
      id: "diag_1_supply_demand",
      type: "mcq",
      inlineSvg: DIAGRAMS.SUPPLY_DEMAND,
      imageAlt: "A supply and demand graph for T-shirts. Price on the side axis from $2 to $10, quantity on the bottom from 10 to 50. The lines cross at $6 and 30 shirts. A dashed line at $8 shows sellers offering 40 while buyers want only 20.",
      promptText: "This graph shows the market for T-shirts. The red line is demand (what buyers want at each price) and the blue line is supply (what sellers offer at each price). Look at the dashed line at $8. What will most likely happen if the price is set at $8?",
      options: [
        { val: "A", text: "There is a shortage, so the price will rise above $8.", textVn: "Có thiếu hụt, nên giá sẽ tăng lên trên 8 đô la." },
        { val: "B", text: "Buyers and sellers agree, so the price stays at $8.", textVn: "Người mua và người bán đồng ý, nên giá giữ ở 8 đô la." },
        { val: "C", text: "There is a surplus of 20 shirts, so the price will fall toward $6.", textVn: "Có dư 20 chiếc áo, nên giá sẽ giảm về 6 đô la." },
        { val: "D", text: "Sellers will make more shirts, so the price will rise to $10.", textVn: "Người bán sẽ làm thêm áo, nên giá sẽ tăng lên 10 đô la." },
      ],
      correct: "C",
      marks: 1,
      expEn: "At $8, read across: supply is 40 shirts but demand is only 20. Sellers have 20 shirts left over — a surplus. To sell them, sellers cut the price, and it falls toward the equilibrium at $6, where the two lines cross.",
      expVn: "Ở mức 8 đô la, đọc ngang: cung là 40 áo nhưng cầu chỉ 20. Người bán còn dư 20 áo — dư cung. Để bán hết, người bán hạ giá, và giá giảm về điểm cân bằng 6 đô la, nơi hai đường cắt nhau.",
    },
    {
      id: "diag_2_price_bars",
      type: "mcq",
      inlineSvg: DIAGRAMS.PRICE_BARS,
      imageAlt: "A bar chart of the average price of a gallon of milk: $3.00 in 2019, $3.20 in 2020, $3.50 in 2021, $4.00 in 2022 and $4.10 in 2023.",
      promptText: "This bar chart shows the average price of a gallon of milk from 2019 to 2023. Which statement is supported by the chart?",
      options: [
        { val: "A", text: "The price fell between 2022 and 2023.", textVn: "Giá giảm trong khoảng 2022 đến 2023." },
        { val: "B", text: "The biggest one-year rise was between 2021 and 2022.", textVn: "Mức tăng lớn nhất trong một năm là từ 2021 đến 2022." },
        { val: "C", text: "The price stayed the same from 2019 to 2021.", textVn: "Giá giữ nguyên từ 2019 đến 2021." },
        { val: "D", text: "Milk cost more in 2019 than in 2023.", textVn: "Sữa năm 2019 đắt hơn năm 2023." },
      ],
      correct: "B",
      marks: 1,
      expEn: "Compare each pair of bars. 2019→2020 rose $0.20, 2020→2021 rose $0.30, 2021→2022 rose $0.50, and 2022→2023 rose only $0.10. The biggest jump is 2021 to 2022. The price never fell, so A and D are wrong; it rose every year, so C is wrong.",
      expVn: "So sánh từng cặp cột. 2019→2020 tăng 0,20 đô la, 2020→2021 tăng 0,30, 2021→2022 tăng 0,50, còn 2022→2023 chỉ tăng 0,10. Bước nhảy lớn nhất là 2021 đến 2022. Giá chưa bao giờ giảm nên A và D sai; giá tăng mỗi năm nên C sai.",
    },
    {
      id: "diag_3_budget_table",
      inlineSvg: DIAGRAMS.BUDGET_TABLE,
      imageAlt: "A monthly budget table for the Tran family: income $3,000; rent $1,200; food $600; transport $300; phone and internet $100; eating out and fun $250; clothes and other $250; savings $300. Spending of $2,700 plus savings of $300 equals the income.",
      promptText: "This table shows the Tran family's monthly budget. Their income is $3,000, they spend $2,700 and they save $300. The family wants to save $500 a month instead of $300. Which two items in the table could they cut to find the extra $200, why is rent the hardest item to cut, and what is the opportunity cost of saving more?",
      suggestedWords: [["budget", "income"], ["fixed", "contract", "needed"], ["give up", "opportunity cost"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Names two items from the table that could be reduced to find the extra $200 (e.g. eating out and fun, clothes and other, food or transport) — not rent or income.",
        "Explains that rent is hard to cut because it is a fixed, necessary cost (a home is needed and the amount is set by a lease/landlord).",
        "States the opportunity cost of saving more: the family gives up the things that money bought, such as meals out, entertainment or new clothes.",
      ],
      modelAnswer: "To save an extra $200, the family could cut 'eating out and fun' ($250) and 'clothes and other' ($250), for example spending $150 on each instead of $250. Rent is the hardest item to cut because the family needs a home and the amount is fixed by their lease, so they cannot just decide to pay less this month. The opportunity cost of saving $500 is the meals out, entertainment and new clothes the family gives up in order to put that money away.",
      vnTranslation: "Bảng này cho thấy ngân sách hằng tháng của gia đình Trần. Thu nhập là 3.000 đô la, chi tiêu 2.700 và tiết kiệm 300. Gia đình muốn tiết kiệm 500 đô la mỗi tháng thay vì 300. Họ có thể cắt hai khoản nào trong bảng để có thêm 200 đô la, vì sao tiền thuê nhà là khoản khó cắt nhất, và chi phí cơ hội của việc tiết kiệm nhiều hơn là gì?",
    },
  ],

  assessment,
  notes,
};
