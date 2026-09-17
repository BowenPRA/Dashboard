// src/data/GED_HISTORY/HIST_2B/data.js
// HIST_2B — Rights, Citizenship & Elections. The second half of the civics
// block: the Bill of Rights in plain English, the amendments that widened the
// vote, four landmark cases in one line each, how elections and the Electoral
// College work, and what a citizen owes back. GED skills: match a scenario to
// its amendment, read an election-results table, tell a right from a duty.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { DIAGRAMS } from './diagrams.js';

export const GED_HIST_2B_DATA = {
  meta: {
    id: "HIST_2B",
    title: "Rights, Citizenship & Elections",
    desc: "The Bill of Rights in plain English, the amendments that widened the vote, four landmark court cases, how the Electoral College really works, and what a citizen owes in return.",
    track: "GED_HISTORY",
    icon: "Vote",
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
    { word: "Due process", vn: "Thủ tục pháp lý công bằng", def: "The rule that the government must follow fair legal steps before taking away a person's life, freedom or property.", vnDef: "Quy tắc rằng chính quyền phải tuân theo các bước pháp lý công bằng trước khi tước đi mạng sống, tự do hay tài sản của một người.", sent: "Due process means you get a fair hearing before you can be sent to prison.", vnSent: "Thủ tục pháp lý công bằng nghĩa là bạn được xét xử công bằng trước khi có thể bị đưa vào tù.", isReal: true },
    { word: "Equal protection", vn: "Bảo vệ bình đẳng", def: "The rule in the 14th Amendment that the law must treat all people the same.", vnDef: "Quy tắc trong Tu chính án 14 rằng luật pháp phải đối xử với mọi người như nhau.", sent: "The Court used equal protection to end separate schools for Black and white children.", vnSent: "Tòa đã dùng nguyên tắc bảo vệ bình đẳng để chấm dứt trường học tách biệt cho trẻ em da đen và da trắng.", isReal: true },
    { word: "Suffrage", vn: "Quyền bầu cử", def: "The right to vote.", vnDef: "Quyền đi bầu.", sent: "Women won suffrage in 1920 with the 19th Amendment.", vnSent: "Phụ nữ giành được quyền bầu cử năm 1920 với Tu chính án 19.", isReal: true },
    { word: "Naturalization", vn: "Nhập tịch", def: "The legal process by which an immigrant becomes a citizen.", vnDef: "Quy trình pháp lý để một người nhập cư trở thành công dân.", sent: "After five years with a green card, she applied for naturalization.", vnSent: "Sau năm năm có thẻ xanh, cô ấy nộp đơn xin nhập tịch.", isReal: true },
    { word: "Electorate", vn: "Cử tri", def: "All the people who are allowed to vote in an election.", vnDef: "Tất cả những người được phép bỏ phiếu trong một cuộc bầu cử.", sent: "The 26th Amendment added millions of 18-year-olds to the electorate.", vnSent: "Tu chính án 26 đã thêm hàng triệu người 18 tuổi vào khối cử tri.", isReal: true },
    { word: "Majority", vn: "Đa số", def: "More than half of the votes or people.", vnDef: "Hơn một nửa số phiếu hoặc số người.", sent: "A candidate needs a majority of electors — 270 of 538 — to become President.", vnSent: "Một ứng viên cần đa số đại cử tri — 270 trên 538 — để trở thành Tổng thống.", isReal: true },
    { word: "Primary", vn: "Bầu cử sơ bộ", def: "An early election in which each party's voters choose its candidate for the main election.", vnDef: "Cuộc bầu cử sớm trong đó cử tri của mỗi đảng chọn ứng viên của đảng cho cuộc bầu cử chính.", sent: "She won the primary in March and the general election in November.", vnSent: "Cô ấy thắng bầu cử sơ bộ vào tháng Ba và thắng tổng tuyển cử vào tháng Mười một.", isReal: true },
    { word: "Jury", vn: "Bồi thẩm đoàn", def: "A group of ordinary citizens who listen to a trial and decide whether the person is guilty.", vnDef: "Một nhóm công dân bình thường lắng nghe phiên tòa và quyết định người đó có tội hay không.", sent: "Every citizen may be called to serve on a jury.", vnSent: "Mọi công dân đều có thể được gọi tham gia bồi thẩm đoàn.", isReal: true },
    { word: "Petition", vn: "Kiến nghị", def: "A formal written request to the government, often signed by many people.", vnDef: "Một yêu cầu chính thức bằng văn bản gửi tới chính quyền, thường có nhiều người ký.", sent: "Neighbors signed a petition asking the city to fix the park.", vnSent: "Hàng xóm ký một bản kiến nghị yêu cầu thành phố sửa công viên.", isReal: true },
    { word: "Warrant", vn: "Lệnh khám xét", def: "A paper signed by a judge that allows the police to search a place or arrest a person.", vnDef: "Giấy do thẩm phán ký cho phép cảnh sát khám xét một nơi hoặc bắt giữ một người.", sent: "The police cannot search your home without a warrant.", vnSent: "Cảnh sát không thể khám nhà bạn nếu không có lệnh khám xét.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "The Bill of Rights in Plain English",
      vnTitle: "Đạo luật Nhân quyền bằng Ngôn ngữ Đơn giản",
      meta: "Amendments 1–10, added in 1791",
      text: [
        "Many states agreed to the Constitution only if a list of personal rights was added. That list, the first ten amendments, is the Bill of Rights. The First Amendment protects five freedoms: religion, speech, the press, peaceful assembly, and the right to {petition} the government with complaints. The Second Amendment protects the right to keep and bear arms.",
        "Several amendments protect people accused of a crime. Under the Fourth Amendment, the police may not search your home or belongings without a {warrant} signed by a judge. The Fifth Amendment says you cannot be forced to be a witness against yourself, and that the government cannot take your life, liberty or property without due process of law.",
        "The Sixth Amendment promises a speedy and public trial by a {jury}, and the right to a lawyer. The Eighth Amendment bans cruel and unusual punishments and unfairly high bail. Together, these rules mean the government must treat even a suspected criminal fairly.",
      ].join(" "),
      vnText: [
        "Nhiều tiểu bang chỉ đồng ý với Hiến pháp nếu một danh sách các quyền cá nhân được thêm vào. Danh sách đó, mười tu chính án đầu tiên, là Đạo luật Nhân quyền. Tu chính án thứ nhất bảo vệ năm quyền tự do: tôn giáo, ngôn luận, báo chí, hội họp ôn hòa, và quyền kiến nghị chính quyền về những điều bất bình. Tu chính án thứ hai bảo vệ quyền giữ và mang vũ khí.",
        "Một số tu chính án bảo vệ những người bị buộc tội. Theo Tu chính án thứ tư, cảnh sát không được khám nhà hay đồ đạc của bạn nếu không có lệnh khám xét do thẩm phán ký. Tu chính án thứ năm nói bạn không thể bị ép làm chứng chống lại chính mình, và chính quyền không thể tước mạng sống, tự do hay tài sản của bạn mà không theo thủ tục pháp lý công bằng.",
        "Tu chính án thứ sáu hứa một phiên tòa nhanh chóng, công khai với bồi thẩm đoàn, và quyền có luật sư. Tu chính án thứ tám cấm các hình phạt tàn ác và bất thường cùng tiền bảo lãnh cao bất hợp lý. Gộp lại, những quy tắc này nghĩa là chính quyền phải đối xử công bằng ngay cả với một nghi phạm.",
      ].join(" "),
      glossary: {
        "bear arms": { vn: "Mang vũ khí", def: "To own and carry weapons." },
        "bail": { vn: "Tiền bảo lãnh", def: "Money paid so an accused person can stay out of jail until the trial." },
      },
    },
    {
      id: "passage_2",
      title: "Widening the Vote",
      vnTitle: "Mở rộng Quyền Bầu cử",
      meta: "Later amendments and landmark cases",
      text: [
        "In 1789 only white men who owned property could vote in most states. Over two centuries, amendments widened democracy. After the Civil War, the 13th Amendment ended slavery, the 14th made everyone born in the United States a citizen and promised {equal} protection of the laws, and the 15th said the vote could not be denied because of race.",
        "The fight for women's {suffrage} took decades and ended with the 19th Amendment in 1920. The 24th Amendment (1964) banned the poll tax, a fee that had kept poor and Black citizens from voting. The 26th Amendment (1971) lowered the voting age to 18, because young men were being sent to war before they could vote.",
        "The Supreme Court shaped these rights too. Marbury v. Madison (1803) gave the Court the power to strike down laws. Plessy v. Ferguson (1896) allowed \"separate but equal\" segregation. Brown v. Board of Education (1954) reversed that and ended segregation in public schools. Miranda v. Arizona (1966) ruled that police must tell suspects their rights before questioning them.",
      ].join(" "),
      vnText: [
        "Năm 1789, ở hầu hết các bang chỉ đàn ông da trắng có tài sản mới được bỏ phiếu. Qua hai thế kỷ, các tu chính án đã mở rộng nền dân chủ. Sau Nội chiến, Tu chính án 13 chấm dứt chế độ nô lệ, Tu chính án 14 khiến mọi người sinh ra ở Hoa Kỳ đều là công dân và hứa bảo vệ bình đẳng trước pháp luật, và Tu chính án 15 nói quyền bầu cử không thể bị từ chối vì chủng tộc.",
        "Cuộc đấu tranh cho quyền bầu cử của phụ nữ kéo dài hàng thập kỷ và kết thúc với Tu chính án 19 năm 1920. Tu chính án 24 (1964) cấm thuế bầu cử, một khoản phí từng ngăn công dân nghèo và da đen đi bầu. Tu chính án 26 (1971) hạ tuổi bầu cử xuống 18, vì thanh niên bị đưa ra chiến trường trước khi được bỏ phiếu.",
        "Tòa án Tối cao cũng định hình các quyền này. Marbury kiện Madison (1803) trao cho Tòa quyền bác bỏ luật. Plessy kiện Ferguson (1896) cho phép phân biệt \"tách biệt nhưng bình đẳng\". Brown kiện Hội đồng Giáo dục (1954) đảo ngược điều đó và chấm dứt phân biệt chủng tộc trong trường công. Miranda kiện Arizona (1966) phán quyết cảnh sát phải cho nghi phạm biết quyền của họ trước khi thẩm vấn.",
      ].join(" "),
      glossary: {
        "poll tax": { vn: "Thuế bầu cử", def: "A fee a person had to pay before voting." },
        "segregation": { vn: "Phân biệt chủng tộc", def: "Keeping people of different races apart by law." },
      },
    },
    {
      id: "passage_3",
      title: "Elections and the Citizen",
      vnTitle: "Bầu cử và Người Công dân",
      meta: "How the vote works, and what you owe back",
      text: [
        "A presidential election has two rounds. In the spring, each party holds a {primary} in every state so its voters can choose the party's candidate. In November, the general election decides the winner — but not directly. Each state has a number of electors equal to its senators plus its House members, 538 in total. In almost every state, the candidate who wins the state wins all of its electors. A {majority} of electors, 270, makes you President.",
        "Because of this system, a candidate can win the most votes across the whole country and still lose. Winning California by five million votes earns the same 54 electors as winning it by five hundred. This happened in 2000 and in 2016. Members of the House are elected for two years and senators for six, so a third of the Senate faces the {electorate} every two years.",
        "Rights come with responsibilities. Citizens must obey the law, pay taxes, and serve on a jury when called; they should also vote and stay informed. An immigrant can become a citizen through {naturalization}: hold a green card for five years, be at least 18, pass an English and civics test, and take an oath of loyalty. Citizens and non-citizens alike can take part by signing petitions, joining interest groups, and reading a free press.",
      ].join(" "),
      vnText: [
        "Một cuộc bầu cử tổng thống có hai vòng. Vào mùa xuân, mỗi đảng tổ chức bầu cử sơ bộ ở từng bang để cử tri của đảng chọn ứng viên. Vào tháng Mười một, tổng tuyển cử quyết định người thắng — nhưng không trực tiếp. Mỗi bang có số đại cử tri bằng số thượng nghị sĩ cộng số hạ nghị sĩ của bang, tổng cộng 538. Ở gần như mọi bang, ứng viên thắng bang đó nhận toàn bộ đại cử tri của bang. Đa số đại cử tri, 270, đưa bạn lên làm Tổng thống.",
        "Vì hệ thống này, một ứng viên có thể nhận nhiều phiếu nhất trên cả nước mà vẫn thua. Thắng California hơn năm triệu phiếu cũng chỉ được 54 đại cử tri như thắng hơn năm trăm phiếu. Điều này đã xảy ra năm 2000 và 2016. Hạ nghị sĩ được bầu với nhiệm kỳ hai năm và thượng nghị sĩ sáu năm, nên một phần ba Thượng viện phải đối mặt với cử tri mỗi hai năm.",
        "Quyền đi kèm trách nhiệm. Công dân phải tuân thủ luật pháp, đóng thuế, và tham gia bồi thẩm đoàn khi được gọi; họ cũng nên đi bầu và cập nhật thông tin. Một người nhập cư có thể trở thành công dân qua nhập tịch: giữ thẻ xanh năm năm, ít nhất 18 tuổi, đậu bài kiểm tra tiếng Anh và công dân, và tuyên thệ trung thành. Cả công dân lẫn người chưa phải công dân đều có thể tham gia bằng cách ký kiến nghị, gia nhập các nhóm lợi ích, và đọc báo chí tự do.",
      ].join(" "),
      glossary: {
        "elector": { vn: "Đại cử tri", def: "A person chosen by a state to cast its official votes for President." },
        "interest group": { vn: "Nhóm lợi ích", def: "An organization that tries to influence laws on one issue." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "The First Amendment protects five freedoms. Name at least three of them, and give one real-life example of a person using one of those freedoms.",
      suggestedWords: [["First Amendment", "freedom"], ["government", "protect"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Names at least two of: religion, speech, press, assembly, petition.",
        "Names a third freedom from the list.",
        "Gives a correct example of one freedom in use (e.g. a newspaper criticizing the President; a peaceful protest march; signing a petition).",
      ],
      modelAnswer: "The First Amendment protects freedom of religion, freedom of speech, freedom of the press, the right to assemble peacefully, and the right to petition the government. For example, a newspaper that prints a story criticizing the President is using freedom of the press, and the government cannot shut it down for that.",
      vnTranslation: "Tu chính án thứ nhất bảo vệ năm quyền tự do. Hãy nêu ít nhất ba quyền, và cho một ví dụ thực tế về một người đang sử dụng một trong những quyền đó.",
    },
    {
      id: "qa2",
      question: "Police officers want to search a person's apartment for stolen goods. What does the Fourth Amendment require them to have, and why is this rule important for ordinary people?",
      suggestedWords: [["judge", "evidence"], ["privacy", "home"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that the police need a warrant signed by a judge (based on good reason / evidence) before searching.",
        "Explains why it matters: it protects privacy / stops the government from searching anyone at any time without a reason.",
      ],
      modelAnswer: "The Fourth Amendment requires the police to get a warrant, signed by a judge, that is based on real evidence and names the place to be searched. This rule matters because it protects people's privacy and stops the government from entering anyone's home whenever it likes; a judge must first agree there is a good reason.",
      vnTranslation: "Cảnh sát muốn khám căn hộ của một người để tìm đồ ăn trộm. Tu chính án thứ tư yêu cầu họ phải có gì, và vì sao quy tắc này quan trọng với người dân bình thường?",
    },
    {
      id: "qa3",
      question: "Explain the difference between a right and a responsibility of a citizen. Give one example of each.",
      suggestedWords: [["citizen", "government"], ["protect", "must"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Explains that a right is a freedom or protection the citizen has (that the government cannot take away).",
        "Explains that a responsibility is a duty the citizen must do / owes to the community.",
        "Gives one correct example of each (e.g. right: free speech, a fair trial, voting; responsibility: paying taxes, jury duty, obeying the law).",
      ],
      modelAnswer: "A right is a freedom or protection that belongs to a citizen and that the government cannot take away, such as freedom of speech or the right to a fair trial. A responsibility is a duty a citizen must carry out for the community, such as paying taxes or serving on a jury when called. Rights protect you; responsibilities are what you owe back.",
      vnTranslation: "Giải thích sự khác nhau giữa một quyền và một trách nhiệm của công dân. Cho một ví dụ cho mỗi loại.",
    },
    {
      id: "qa4",
      question: "Explain how a candidate can win the most votes from the people across the whole country but still lose the presidential election.",
      suggestedWords: [["electors", "Electoral College"], ["state", "states"], ["270"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the President is chosen by electors / the Electoral College, not directly by the national popular vote.",
        "Explains that each state gives its electors to whoever wins that state (winner takes all), so extra votes in a state a candidate already won add nothing.",
        "States that the winner needs a majority of electors (270 of 538) — so winning the right states matters more than the total number of votes.",
      ],
      modelAnswer: "The President is not chosen by the total national vote but by the Electoral College. Each state has a set number of electors, and in almost every state the candidate who wins that state takes all of its electors. A candidate can win a few big states by millions of extra votes and gain nothing more, while the other candidate wins more states by small margins. Whoever reaches 270 of the 538 electors becomes President, even with fewer votes overall.",
      vnTranslation: "Giải thích làm thế nào một ứng viên có thể nhận nhiều phiếu nhất từ người dân trên cả nước nhưng vẫn thua cuộc bầu cử tổng thống.",
    },
    {
      id: "qa5",
      question: "Choose two of these amendments — the 15th, 19th, 24th or 26th — and explain how each one widened democracy in the United States.",
      suggestedWords: [["vote", "voting"], ["amendment", "citizens"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Correctly describes the first chosen amendment (15th: vote cannot be denied by race; 19th: women may vote; 24th: no poll tax; 26th: voting age 18).",
        "Correctly describes the second chosen amendment.",
        "Explains the shared effect: each one added a new group of people to the electorate / gave more people a voice in government.",
      ],
      modelAnswer: "The 19th Amendment, in 1920, gave women the right to vote, which roughly doubled the number of possible voters. The 26th Amendment, in 1971, lowered the voting age from 21 to 18, so young adults who could be sent to war could also vote. Each amendment added a large new group to the electorate, so the government now had to answer to more of the people it governed.",
      vnTranslation: "Chọn hai trong các tu chính án — 15, 19, 24 hoặc 26 — và giải thích mỗi tu chính án đã mở rộng nền dân chủ ở Hoa Kỳ như thế nào.",
    },
  ],

  // Source Analysis on authored SVG sources: a results table, a data table, a
  // scenario card and a bar chart — 3 MCQ : 1 written. The grader is blind, so
  // the written mark scheme describes the chart in words.
  diagrams: [
    {
      id: "diag_1_election_table",
      type: "mcq",
      inlineSvg: DIAGRAMS.ELECTION_TABLE,
      imageAlt: "A results table: Rivera 65,800,000 popular votes (48.2%) and 306 electoral votes; Chen 68,100,000 popular votes (49.9%) and 232 electoral votes; 538 electors in total, 270 needed to win.",
      promptText: "Read the election-results table. Who becomes President, and why?",
      options: [
        { val: "A", text: "Chen — she won more votes from the people.", textVn: "Chen — bà ấy nhận nhiều phiếu của người dân hơn." },
        { val: "B", text: "Rivera — he won a majority of electors (306 of 538).", textVn: "Rivera — ông ấy giành đa số đại cử tri (306 trên 538)." },
        { val: "C", text: "Nobody — neither candidate reached 50% of the popular vote.", textVn: "Không ai — không ứng viên nào đạt 50% phiếu phổ thông." },
        { val: "D", text: "The House of Representatives must choose.", textVn: "Hạ viện phải chọn." },
      ],
      correct: "B",
      marks: 1,
      expEn: "The last row of the table is the rule: 270 electoral votes wins. Rivera has 306, well past 270, so he is President even though Chen won 2.3 million more popular votes. The House only chooses if no one reaches 270.",
      expVn: "Hàng cuối của bảng là quy tắc: 270 phiếu đại cử tri là thắng. Rivera có 306, vượt xa 270, nên ông là Tổng thống dù Chen hơn 2,3 triệu phiếu phổ thông. Hạ viện chỉ chọn khi không ai đạt 270.",
    },
    {
      id: "diag_2_amendments_table",
      type: "mcq",
      inlineSvg: DIAGRAMS.AMENDMENTS_TABLE,
      imageAlt: "A table of amendments: 13th 1865 ended slavery; 14th 1868 citizenship by birth and equal protection; 15th 1870 vote cannot be denied because of race; 19th 1920 women vote; 24th 1964 bans the poll tax; 26th 1971 voting age 18.",
      promptText: "Use the table. In 1962 a state charged citizens a $2 fee before they could vote for President. Which amendment made this illegal, and when?",
      options: [
        { val: "A", text: "The 15th Amendment, in 1870", textVn: "Tu chính án 15, năm 1870" },
        { val: "B", text: "The 19th Amendment, in 1920", textVn: "Tu chính án 19, năm 1920" },
        { val: "C", text: "The 26th Amendment, in 1971", textVn: "Tu chính án 26, năm 1971" },
        { val: "D", text: "The 24th Amendment, in 1964", textVn: "Tu chính án 24, năm 1964" },
      ],
      correct: "D",
      marks: 1,
      expEn: "A fee to vote is a poll tax. Scan the 'What it did' column for 'poll tax': that is the 24th Amendment, 1964 — two years after the scenario, which is why the fee was still legal in 1962. The 15th is about race, the 19th about women, the 26th about age.",
      expVn: "Phí để đi bầu là thuế bầu cử. Quét cột 'Nội dung' tìm 'thuế bầu cử': đó là Tu chính án 24, năm 1964 — hai năm sau tình huống, nên năm 1962 khoản phí vẫn hợp pháp. Tu chính án 15 nói về chủng tộc, 19 về phụ nữ, 26 về tuổi.",
    },
    {
      id: "diag_3_fourth_amendment",
      type: "mcq",
      inlineSvg: DIAGRAMS.FOURTH_AMENDMENT_CARD,
      imageAlt: "A card with the Fourth Amendment in plain English (no unreasonable searches; police need a warrant signed by a judge naming the place and things) and a scenario: officers with no warrant push into Dana's home, search it and take her laptop; a judge later throws out the evidence.",
      promptText: "Read the amendment and the scenario. Why did the judge throw out the evidence the officers found?",
      options: [
        { val: "A", text: "The search was unreasonable because the officers had no warrant signed by a judge.", textVn: "Cuộc khám xét là bất hợp lý vì các sĩ quan không có lệnh khám xét do thẩm phán ký." },
        { val: "B", text: "Dana did not have a lawyer with her.", textVn: "Dana không có luật sư bên cạnh." },
        { val: "C", text: "The police are never allowed to take a laptop.", textVn: "Cảnh sát không bao giờ được phép lấy máy tính xách tay." },
        { val: "D", text: "The officers did not read Dana her rights.", textVn: "Các sĩ quan không đọc quyền của Dana." },
      ],
      correct: "A",
      marks: 1,
      expEn: "Match the scenario to the text: 'The police need a warrant — signed by a judge'. They had none and Dana said no, so the search was unreasonable and the evidence cannot be used. A lawyer (6th) and being read your rights (Miranda) are different protections; police may seize a laptop if a warrant names it.",
      expVn: "Đối chiếu tình huống với văn bản: 'Cảnh sát cần lệnh khám xét — do thẩm phán ký'. Họ không có và Dana đã từ chối, nên cuộc khám xét là bất hợp lý và bằng chứng không thể dùng. Luật sư (TCA 6) và được đọc quyền (Miranda) là những bảo vệ khác; cảnh sát có thể thu máy tính nếu lệnh khám xét nêu tên nó.",
    },
    {
      id: "diag_4_turnout_chart",
      inlineSvg: DIAGRAMS.TURNOUT_CHART,
      imageAlt: "A bar chart of voter turnout by age group: 18–29 at 51%, 30–44 at 63%, 45–64 at 70%, 65 and over at 76%. Turnout rises steadily with age.",
      promptText: "The bar chart shows the share of eligible citizens in each age group who voted. Describe the pattern you see, using numbers from the chart. Then explain ONE reason the pattern might matter for the country, and suggest ONE way to raise turnout in the lowest group.",
      suggestedWords: [["turnout", "eligible"], ["age group", "older", "younger"], ["policy", "represent"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Describes the trend with numbers: turnout rises with age, from about 51% for 18–29 to about 76% for 65 and over (a gap of roughly 25 points).",
        "Gives a sensible reason it matters: politicians pay more attention to groups that vote, so young people's needs may be ignored / laws may favor older voters.",
        "Suggests one reasonable way to raise young turnout (e.g. voter registration in schools, voting online or by mail, a voting holiday, civics education, reminders).",
      ],
      modelAnswer: "The chart shows that turnout rises with every age group: only 51% of citizens aged 18–29 voted, compared with 63% of those aged 30–44, 70% of those aged 45–64, and 76% of people 65 and over. That is a gap of about 25 points between the youngest and oldest voters. This matters because politicians pay most attention to the people who actually vote, so laws may favor older citizens and ignore issues young people care about. One way to raise young turnout would be to register students to vote at school and allow voting by mail, so that voting is easier for people who move often.",
      vnTranslation: "Biểu đồ cột cho thấy tỷ lệ công dân đủ điều kiện ở mỗi nhóm tuổi đã đi bầu. Mô tả mô hình bạn thấy, dùng các con số từ biểu đồ. Sau đó giải thích MỘT lý do vì sao mô hình này có thể quan trọng với đất nước, và đề xuất MỘT cách để tăng tỷ lệ đi bầu ở nhóm thấp nhất.",
    },
  ],

  assessment,
  notes,
};
