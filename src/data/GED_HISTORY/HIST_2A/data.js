// src/data/GED_HISTORY/HIST_2A/data.js
// HIST_2A — Foundations of Government. Civics & Government is half the GED
// Social Studies test. HIST_1B tells the story of the founding; this unit
// drills the MACHINE: the principles behind the Constitution, who sits in each
// branch and for how long, concrete checks and balances, federalism, the bill
// pipeline and the amendment process — with the GED skills of reading a plain-
// English clause, a flow chart, and "which branch / which level is this?".
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_HIST_2A_DATA = {
  meta: {
    id: "HIST_2A",
    title: "Foundations of Government",
    desc: "The machine behind the Constitution: its three big principles, the three branches and who serves in them, checks and balances, federalism, how a bill becomes a law, and how the rules can be changed.",
    track: "GED_HISTORY",
    icon: "Landmark",
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
    { word: "Popular sovereignty", vn: "Chủ quyền nhân dân", def: "The idea that government power comes from the people, who give it through elections.", vnDef: "Ý tưởng rằng quyền lực của chính quyền đến từ nhân dân, được trao qua bầu cử.", sent: "The Constitution begins with \"We the People\" to show popular sovereignty.", vnSent: "Hiến pháp mở đầu bằng \"Chúng tôi, Nhân dân\" để thể hiện chủ quyền nhân dân.", isReal: true },
    { word: "Rule of law", vn: "Pháp quyền", def: "The principle that everyone, including leaders, must follow the law.", vnDef: "Nguyên tắc rằng mọi người, kể cả lãnh đạo, đều phải tuân theo luật pháp.", sent: "Under the rule of law, even the President can be taken to court.", vnSent: "Theo nguyên tắc pháp quyền, ngay cả Tổng thống cũng có thể bị đưa ra tòa.", isReal: true },
    { word: "Separation of powers", vn: "Phân chia quyền lực", def: "Dividing government into three branches so that no single group holds all the power.", vnDef: "Chia chính quyền thành ba nhánh để không một nhóm nào nắm toàn bộ quyền lực.", sent: "Because of the separation of powers, the people who make laws do not also judge them.", vnSent: "Nhờ sự phân chia quyền lực, những người làm luật không đồng thời xét xử luật.", isReal: true },
    { word: "Legislative", vn: "Lập pháp", def: "The branch that makes the laws — in the United States, Congress.", vnDef: "Nhánh làm ra luật — ở Hoa Kỳ là Quốc hội.", sent: "The legislative branch has two parts: the House and the Senate.", vnSent: "Nhánh lập pháp có hai phần: Hạ viện và Thượng viện.", isReal: true },
    { word: "Executive", vn: "Hành pháp", def: "The branch that carries out and enforces the laws — led by the President.", vnDef: "Nhánh thi hành và thực thi luật — do Tổng thống đứng đầu.", sent: "The executive branch includes the President and the government departments.", vnSent: "Nhánh hành pháp gồm Tổng thống và các bộ của chính phủ.", isReal: true },
    { word: "Judicial", vn: "Tư pháp", def: "The branch that interprets the laws and decides what they mean — the courts.", vnDef: "Nhánh giải thích luật và quyết định ý nghĩa của luật — các tòa án.", sent: "The judicial branch is led by the nine justices of the Supreme Court.", vnSent: "Nhánh tư pháp do chín thẩm phán của Tòa án Tối cao đứng đầu.", isReal: true },
    { word: "Veto", vn: "Phủ quyết", def: "The President's power to reject a bill that Congress has passed.", vnDef: "Quyền của Tổng thống bác bỏ một dự luật mà Quốc hội đã thông qua.", sent: "The President can veto a bill, but Congress may still pass it.", vnSent: "Tổng thống có thể phủ quyết một dự luật, nhưng Quốc hội vẫn có thể thông qua nó.", isReal: true },
    { word: "Override", vn: "Bác bỏ phủ quyết", def: "To cancel a veto by a two-thirds vote in both the House and the Senate.", vnDef: "Hủy bỏ một phủ quyết bằng hai phần ba số phiếu ở cả Hạ viện và Thượng viện.", sent: "Congress voted to override the veto, so the bill became law anyway.", vnSent: "Quốc hội đã bỏ phiếu bác bỏ phủ quyết, nên dự luật vẫn trở thành luật.", isReal: true },
    { word: "Impeach", vn: "Luận tội", def: "To formally charge a President or judge with serious wrongdoing; the Senate then holds a trial.", vnDef: "Chính thức buộc tội một Tổng thống hoặc thẩm phán về hành vi sai trái nghiêm trọng; sau đó Thượng viện xét xử.", sent: "The House can impeach a President, and the Senate can remove him from office.", vnSent: "Hạ viện có thể luận tội Tổng thống, và Thượng viện có thể phế truất ông.", isReal: true },
    { word: "Federalism", vn: "Chủ nghĩa liên bang", def: "Sharing power between the national (federal) government and the state governments.", vnDef: "Chia sẻ quyền lực giữa chính quyền quốc gia (liên bang) và chính quyền các tiểu bang.", sent: "Federalism means Washington prints the money while your state issues your driver's license.", vnSent: "Chủ nghĩa liên bang nghĩa là Washington in tiền còn tiểu bang của bạn cấp bằng lái xe.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "Three Ideas Behind the Constitution",
      vnTitle: "Ba Ý tưởng Đằng sau Hiến pháp",
      meta: "Principles of government",
      text: [
        "The first American government, under the Articles of Confederation, was too weak to work. Congress could not collect taxes, there was no President and no national court, and each state printed its own money. When angry farmers in Massachusetts took up arms in 1786, the government could not stop them. In 1787 leaders met in Philadelphia and wrote a new Constitution.",
        "The new plan rested on three ideas. First, popular {sovereignty}: power comes from the people. That is why the Constitution begins with the words \"We the People.\" Second, limited government: the Constitution lists what the government may do, and everything else is off limits. Third, the {rule} of law: everyone must obey the law, including the President and members of Congress.",
        "To protect these ideas, the writers built a {separation} of powers. They split the government into three branches, each with its own job, so that no one person or group could control everything. This design is the heart of the American system, and it is tested again and again on the exam.",
      ].join(" "),
      vnText: [
        "Chính quyền đầu tiên của Mỹ, theo Các Điều khoản Hợp bang, quá yếu để hoạt động. Quốc hội không thể thu thuế, không có Tổng thống và không có tòa án quốc gia, và mỗi tiểu bang tự in tiền riêng. Khi những nông dân giận dữ ở Massachusetts cầm vũ khí năm 1786, chính quyền không thể ngăn họ. Năm 1787, các nhà lãnh đạo họp ở Philadelphia và viết một bản Hiến pháp mới.",
        "Kế hoạch mới dựa trên ba ý tưởng. Thứ nhất, chủ quyền nhân dân: quyền lực đến từ nhân dân. Đó là lý do Hiến pháp mở đầu bằng \"Chúng tôi, Nhân dân.\" Thứ hai, chính quyền có giới hạn: Hiến pháp liệt kê những gì chính quyền được làm, mọi thứ khác đều không được phép. Thứ ba, pháp quyền: mọi người đều phải tuân theo luật, kể cả Tổng thống và các nghị sĩ.",
        "Để bảo vệ những ý tưởng này, các tác giả xây dựng sự phân chia quyền lực. Họ chia chính quyền thành ba nhánh, mỗi nhánh có việc riêng, để không một người hay nhóm nào kiểm soát được mọi thứ. Thiết kế này là trái tim của hệ thống Mỹ, và được hỏi đi hỏi lại trong kỳ thi.",
      ].join(" "),
      glossary: {
        "popular sovereignty": { vn: "Chủ quyền nhân dân", def: "Government power comes from the people." },
        "limited government": { vn: "Chính quyền có giới hạn", def: "The government may only do what the Constitution allows." },
      },
    },
    {
      id: "passage_2",
      title: "Three Branches, Three Jobs",
      vnTitle: "Ba Nhánh, Ba Việc",
      meta: "Who does what",
      text: [
        "The {legislative} branch is Congress, and its job is to make the laws. Congress has two houses. The House of Representatives has 435 members who serve two-year terms; bigger states get more seats. The Senate has 100 members, two from every state, who serve six-year terms.",
        "The {executive} branch carries out the laws. It is led by the President, who is elected for a four-year term and may serve at most two terms. The President commands the military, meets foreign leaders, and runs the government departments that collect taxes, guard the borders and deliver the mail.",
        "The {judicial} branch interprets the laws. At the top is the Supreme Court, with nine justices who serve for life. The President chooses them, but the Senate must confirm each one. The Court can strike down any law that goes against the Constitution — a power called judicial review. In return, the House can {impeach} a judge or a President who breaks the law, and the Senate holds the trial.",
      ].join(" "),
      vnText: [
        "Nhánh lập pháp là Quốc hội, có nhiệm vụ làm luật. Quốc hội có hai viện. Hạ viện có 435 thành viên với nhiệm kỳ hai năm; bang lớn hơn có nhiều ghế hơn. Thượng viện có 100 thành viên, mỗi bang hai người, với nhiệm kỳ sáu năm.",
        "Nhánh hành pháp thi hành luật. Nhánh này do Tổng thống đứng đầu, được bầu với nhiệm kỳ bốn năm và tối đa hai nhiệm kỳ. Tổng thống chỉ huy quân đội, gặp lãnh đạo nước ngoài, và điều hành các bộ thu thuế, canh giữ biên giới và chuyển thư.",
        "Nhánh tư pháp giải thích luật. Đứng đầu là Tòa án Tối cao với chín thẩm phán phục vụ trọn đời. Tổng thống chọn họ, nhưng Thượng viện phải phê chuẩn từng người. Tòa có thể bác bỏ bất kỳ đạo luật nào trái với Hiến pháp — quyền này gọi là xem xét tư pháp. Ngược lại, Hạ viện có thể luận tội một thẩm phán hoặc Tổng thống vi phạm luật, và Thượng viện tiến hành xét xử.",
      ].join(" "),
      glossary: {
        "confirm": { vn: "Phê chuẩn", def: "To officially approve a person for a job." },
        "judicial review": { vn: "Xem xét tư pháp", def: "The courts' power to cancel a law that breaks the Constitution." },
      },
    },
    {
      id: "passage_3",
      title: "Two Levels, and How the Rules Change",
      vnTitle: "Hai Cấp Chính quyền, và Cách Thay đổi Luật chơi",
      meta: "Federalism, bills and amendments",
      text: [
        "The United States has two levels of government, and sharing power between them is called {federalism}. Only the national government can print money, declare war or make treaties. Only the states run schools, issue driver's licenses and set marriage rules. Some powers are shared: both levels collect taxes, build roads and have courts.",
        "A new law starts as a bill. A member of Congress introduces it, a committee studies it, and then the House and the Senate must both pass it by a majority. The bill then goes to the President, who can sign it into law or {veto} it. A veto is not the end: if two-thirds of the House and two-thirds of the Senate vote for the bill again, they {override} the veto and it becomes law anyway.",
        "Changing the Constitution itself is much harder. An amendment must first be proposed by two-thirds of both houses of Congress, and then ratified by three-quarters of the states — 38 of the 50. Thousands of amendments have been suggested, but only 27 have ever passed.",
      ].join(" "),
      vnText: [
        "Hoa Kỳ có hai cấp chính quyền, và việc chia sẻ quyền lực giữa chúng gọi là chủ nghĩa liên bang. Chỉ chính quyền quốc gia mới được in tiền, tuyên chiến hay ký hiệp ước. Chỉ các tiểu bang mới điều hành trường học, cấp bằng lái xe và đặt ra quy định hôn nhân. Một số quyền được chia sẻ: cả hai cấp đều thu thuế, xây đường và có tòa án.",
        "Một đạo luật mới bắt đầu từ một dự luật. Một nghị sĩ đưa ra dự luật, một ủy ban nghiên cứu nó, rồi Hạ viện và Thượng viện đều phải thông qua với đa số phiếu. Dự luật sau đó đến tay Tổng thống, người có thể ký thành luật hoặc phủ quyết. Phủ quyết chưa phải là hết: nếu hai phần ba Hạ viện và hai phần ba Thượng viện bỏ phiếu lại cho dự luật, họ bác bỏ phủ quyết và nó vẫn trở thành luật.",
        "Thay đổi chính Hiến pháp thì khó hơn nhiều. Một tu chính án trước hết phải được hai phần ba của cả hai viện Quốc hội đề xuất, rồi được ba phần tư số tiểu bang phê chuẩn — 38 trên 50. Hàng nghìn tu chính án đã được đề nghị, nhưng chỉ 27 từng được thông qua.",
      ].join(" "),
      glossary: {
        "bill": { vn: "Dự luật", def: "A written idea for a new law, before it is passed." },
        "ratify": { vn: "Phê chuẩn", def: "To formally approve so that something becomes official." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "Why did the Articles of Confederation fail, and what did the leaders do about it in 1787?",
      suggestedWords: [["central government", "Congress"], ["Philadelphia", "Constitution"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the central government was too weak (gave almost all power to the states).",
        "Gives one concrete weakness: could not tax, no President, no national court, no army, or states printing their own money.",
        "States that leaders met in Philadelphia in 1787 and wrote a new Constitution.",
      ],
      modelAnswer: "The Articles of Confederation made the central government too weak. Congress could not collect taxes or raise an army, so it could not even pay its soldiers or stop a rebellion. In 1787 the leaders met in Philadelphia and, instead of repairing the Articles, wrote a new Constitution with a stronger national government.",
      vnTranslation: "Vì sao Các Điều khoản Hợp bang thất bại, và các nhà lãnh đạo đã làm gì vào năm 1787?",
    },
    {
      id: "qa2",
      question: "Name the three branches of the U.S. government and the main job of each one.",
      suggestedWords: [["Congress", "President", "Supreme Court"], ["branch", "branches"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Legislative branch (Congress) makes the laws.",
        "Executive branch (the President) carries out / enforces the laws.",
        "Judicial branch (the courts / Supreme Court) interprets the laws.",
      ],
      modelAnswer: "The legislative branch is Congress, and it makes the laws. The executive branch is led by the President, who carries out and enforces the laws. The judicial branch is the courts, led by the Supreme Court, which interprets the laws and decides what they mean.",
      vnTranslation: "Kể tên ba nhánh của chính quyền Hoa Kỳ và nhiệm vụ chính của mỗi nhánh.",
    },
    {
      id: "qa3",
      question: "Give one way the President can check Congress, and one way Congress can check the President. Explain why the Constitution includes checks like these.",
      suggestedWords: [["bill", "law"], ["two-thirds", "2/3"], ["power", "branch"]],
      scienceMaxMarks: 3,
      markScheme: [
        "President's check on Congress: the veto (rejecting a bill).",
        "Congress's check on the President: overriding a veto with 2/3 of both houses, impeachment, or the Senate confirming appointments.",
        "Purpose: to stop any one branch from becoming too powerful / to balance the branches.",
      ],
      modelAnswer: "The President can check Congress by vetoing a bill it has passed. Congress can check the President by overriding that veto with a two-thirds vote in both the House and the Senate, or by impeaching a President who breaks the law. The Constitution includes these checks so that no single branch can become too powerful.",
      vnTranslation: "Nêu một cách Tổng thống kiểm soát Quốc hội, và một cách Quốc hội kiểm soát Tổng thống. Giải thích vì sao Hiến pháp có những cơ chế kiểm soát như vậy.",
    },
    {
      id: "qa4",
      question: "What is federalism? Give one power that belongs only to the national government and one that belongs only to the states.",
      suggestedWords: [["national", "federal"], ["state", "states"], ["level", "levels"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Defines federalism as sharing / dividing power between the national government and the states.",
        "Gives a correct national-only power (e.g. print money, declare war, make treaties, run the post office).",
        "Gives a correct state-only power (e.g. driver's licenses, public schools, marriage rules, local police).",
      ],
      modelAnswer: "Federalism means that power is shared between the national government and the state governments. Only the national government can print money or declare war. Only the states can issue driver's licenses and run public schools. Some powers, like collecting taxes, belong to both.",
      vnTranslation: "Chủ nghĩa liên bang là gì? Nêu một quyền chỉ thuộc về chính quyền quốc gia và một quyền chỉ thuộc về các tiểu bang.",
    },
    {
      id: "qa5",
      question: "Describe the two steps needed to add an amendment to the Constitution. Why do you think the writers made it so hard?",
      suggestedWords: [["propose", "Congress"], ["states", "ratify"], ["change", "permanent"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Step 1: proposed by two-thirds of both houses of Congress (or a convention of the states).",
        "Step 2: ratified by three-quarters of the states (38 of 50).",
        "Gives a sensible reason: so the basic rules are not changed quickly or by a small group / only with very wide agreement.",
      ],
      modelAnswer: "First, an amendment must be proposed by a two-thirds vote in both the House and the Senate. Second, it must be ratified by three-quarters of the states, which is 38 of the 50. The writers made this hard on purpose, so that the basic rules of the country could only be changed when almost everyone agreed, not by one party or one angry moment.",
      vnTranslation: "Mô tả hai bước cần thiết để thêm một tu chính án vào Hiến pháp. Theo bạn, vì sao các tác giả làm cho việc này khó như vậy?",
    },
  ],

  // Source Analysis on authored SVG sources: a flow chart, a table, a diagram
  // — the three "read the figure" formats the test uses for civics. 3 MCQ : 1
  // written. The grader is blind, so the written mark scheme describes the
  // figure in words.
  diagrams: [
    {
      id: "diag_1_bill_to_law",
      type: "mcq",
      inlineSvg: DIAGRAMS.BILL_TO_LAW,
      imageAlt: "Flow chart: a bill is introduced, studied by a committee, passed by both the House and Senate, then goes to the President, who signs it into law or vetoes it; Congress can override a veto with two-thirds of each house.",
      promptText: "Read the flow chart. The President vetoes a bill that both houses of Congress passed. According to the chart, what can happen next?",
      options: [
        { val: "A", text: "The bill is dead and can never become law.", textVn: "Dự luật bị hủy và không bao giờ có thể thành luật." },
        { val: "B", text: "The Supreme Court decides whether it becomes law.", textVn: "Tòa án Tối cao quyết định nó có thành luật hay không." },
        { val: "C", text: "Congress can override the veto with a two-thirds vote in both houses, and it becomes law.", textVn: "Quốc hội có thể bác bỏ phủ quyết với hai phần ba số phiếu ở cả hai viện, và nó thành luật." },
        { val: "D", text: "The President must sign it if a majority of Congress asks again.", textVn: "Tổng thống phải ký nếu đa số Quốc hội yêu cầu lại." },
      ],
      correct: "C",
      marks: 1,
      expEn: "Follow the right-hand arrow from the veto box: 'Congress can OVERRIDE: 2/3 of House + 2/3 of Senate → LAW'. A veto is a check on Congress, and the override is Congress's check back. The courts are not part of the chart, and a simple majority is not enough.",
      expVn: "Đi theo mũi tên bên phải từ ô phủ quyết: 'Quốc hội có thể BÁC BỎ: 2/3 Hạ viện + 2/3 Thượng viện → LUẬT'. Phủ quyết là cách kiểm soát Quốc hội, còn bác bỏ phủ quyết là cách Quốc hội kiểm soát lại. Tòa án không có trong sơ đồ, và đa số thường là chưa đủ.",
    },
    {
      id: "diag_2_federalism_table",
      type: "mcq",
      inlineSvg: DIAGRAMS.FEDERALISM_TABLE,
      imageAlt: "A three-column table of powers: federal only (print money, declare war, make treaties, post office, immigration, army), shared (taxes, roads, courts, borrowing, laws), state only (driver's licenses, schools, marriage rules, local police, elections).",
      promptText: "Use the table. A 17-year-old wants to get a driver's license, and her father is paying his income tax. Which levels of government are involved?",
      options: [
        { val: "A", text: "Both are handled only by the federal government.", textVn: "Cả hai đều chỉ do chính quyền liên bang xử lý." },
        { val: "B", text: "The license is a state power; taxes are a shared power.", textVn: "Bằng lái là quyền của tiểu bang; thuế là quyền được chia sẻ." },
        { val: "C", text: "The license is a federal power; taxes are a state-only power.", textVn: "Bằng lái là quyền liên bang; thuế chỉ là quyền của tiểu bang." },
        { val: "D", text: "Both are shared powers.", textVn: "Cả hai đều là quyền được chia sẻ." },
      ],
      correct: "B",
      marks: 1,
      expEn: "Read each item against its column. 'Driver's licenses' sits under STATE only; 'Collect taxes' sits under SHARED — both the national government and the states tax you. That mix of exclusive and shared powers is federalism.",
      expVn: "Đối chiếu từng mục với cột của nó. 'Bằng lái xe' nằm ở cột CHỈ TIỂU BANG; 'Thu thuế' nằm ở cột CHIA SẺ — cả chính quyền quốc gia lẫn tiểu bang đều thu thuế của bạn. Sự kết hợp giữa quyền riêng và quyền chung đó chính là chủ nghĩa liên bang.",
    },
    {
      id: "diag_3_three_branches_table",
      type: "mcq",
      inlineSvg: DIAGRAMS.THREE_BRANCHES,
      imageAlt: "A table of the three branches: legislative (Congress, House 435 and Senate 100, makes laws, terms 2 and 6 years), executive (President, enforces laws, 4-year term, max two), judicial (Supreme Court, 9 justices, interprets laws, serve for life).",
      promptText: "According to the table, which statement is TRUE?",
      options: [
        { val: "A", text: "Senators serve longer terms than members of the House.", textVn: "Thượng nghị sĩ có nhiệm kỳ dài hơn thành viên Hạ viện." },
        { val: "B", text: "Supreme Court justices are elected every four years.", textVn: "Thẩm phán Tòa án Tối cao được bầu bốn năm một lần." },
        { val: "C", text: "The President can serve an unlimited number of terms.", textVn: "Tổng thống có thể phục vụ không giới hạn số nhiệm kỳ." },
        { val: "D", text: "The House of Representatives interprets the laws.", textVn: "Hạ viện giải thích luật." },
      ],
      correct: "A",
      marks: 1,
      expEn: "The TERM row shows Senate 6 years and House 2 years, so A is true. Justices serve for life and are never elected (B is wrong), the President is limited to two 4-year terms (C is wrong), and interpreting the laws is the judicial branch's job, not the House's (D is wrong).",
      expVn: "Hàng NHIỆM KỲ cho thấy Thượng viện 6 năm và Hạ viện 2 năm, nên A đúng. Thẩm phán phục vụ trọn đời và không bao giờ được bầu (B sai), Tổng thống bị giới hạn hai nhiệm kỳ 4 năm (C sai), và giải thích luật là việc của nhánh tư pháp, không phải Hạ viện (D sai).",
    },
    {
      id: "diag_4_checks_triangle",
      inlineSvg: DIAGRAMS.CHECKS_TRIANGLE,
      imageAlt: "A triangle of the three branches with arrows: Congress can override a veto and impeach the President; the President can veto bills; the Senate confirms judges and Congress can impeach them; the Court can strike down laws through judicial review; the President appoints judges; the Court can rule the President's actions illegal.",
      promptText: "Look at the diagram. Congress passes a law, and the Supreme Court later rules that the law goes against the Constitution. Using the diagram, name the power the Court used, explain which branch it is checking, and describe ONE way the other branches can check the Court in return.",
      suggestedWords: [["unconstitutional", "against the Constitution"], ["appoint", "confirm"], ["branch", "power"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Names the power: judicial review — the Court can strike down (cancel) a law that breaks the Constitution.",
        "Identifies that this is the judicial branch checking the legislative branch (Congress).",
        "Gives one check on the Court from the diagram: the President appoints judges, the Senate confirms them, or Congress can impeach judges.",
      ],
      modelAnswer: "The Court used judicial review, the green arrow in the diagram, which lets it strike down a law that goes against the Constitution. This is the judicial branch checking the legislative branch, because Congress made the law. The other branches check the Court in return: the President appoints the judges, the Senate must confirm them, and Congress can impeach a judge who breaks the law.",
      vnTranslation: "Nhìn vào sơ đồ. Quốc hội thông qua một đạo luật, và sau đó Tòa án Tối cao phán quyết rằng đạo luật đó trái với Hiến pháp. Dựa vào sơ đồ, hãy nêu tên quyền mà Tòa đã dùng, giải thích Tòa đang kiểm soát nhánh nào, và mô tả MỘT cách các nhánh khác có thể kiểm soát lại Tòa.",
    },
  ],

  assessment,
  notes,
};
