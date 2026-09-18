// src/data/GED_ENG/ENG_11/essays.js
// The test-length Extended Response bank. Each prompt is built to the real
// stimulus rather than to the short practice pairs in ENG_1A–1C and ENG_10:
//
//   - two texts of four or five paragraphs, 550–650 words between them;
//   - each a different KIND of writing — op-ed, speech, news article, press
//     release, letter, government report — with a byline, because who is
//     speaking (an expert, an interested party, one resident) is evidence the
//     student is expected to weigh;
//   - both sides use SOME evidence and at least one fair point, so the essay
//     has to weigh quality rather than spot the side with numbers. The weaker
//     side leans on the reasoning moves the GED rewards naming — one story as
//     proof, a forecast stated as fact, "everyone agrees", an unnamed expert,
//     cause read into coincidence, a stake in the outcome;
//   - the better-supported side is not always the change, not always Source 1,
//     and the last prompt is deliberately close.
//
// The task wording follows the test's: analyze both positions, determine which
// is best supported, use relevant and specific evidence, up to 45 minutes.
// Places, people and organizations are invented.

// Frames for the moves these sources invite and the shared bank does not
// cover: judging a writer's credibility, naming a reasoning problem, and
// weighing two sets of numbers against each other. Appended to the bank in
// the essay's Frames pane (src/utils/essayFrames.js).
const TEST_LENGTH_FRAMES = [
  { stage: 'evaluate', text: 'The author of Source ___ is ___, so the evidence comes from someone who ___.', textVn: 'Tác giả Nguồn ___ là ___, nên bằng chứng đến từ một người ___.' },
  { stage: 'evaluate', text: 'Source ___ comes from ___, who would gain if ___, so its claims need stronger proof than it gives.', textVn: 'Nguồn ___ đến từ ___, những người sẽ có lợi nếu ___, nên các luận điểm của nó cần bằng chứng mạnh hơn mức nó đưa ra.' },
  { stage: 'evaluate', text: 'The writer uses one story about ___, but one example cannot show what happens to most people.', textVn: 'Người viết dùng một câu chuyện về ___, nhưng một ví dụ không thể cho thấy điều xảy ra với hầu hết mọi người.' },
  { stage: 'evaluate', text: 'Words such as "___" appeal to the reader\'s feelings, but they do not prove that ___.', textVn: 'Những từ như "___" đánh vào cảm xúc của người đọc, nhưng chúng không chứng minh rằng ___.' },
  { stage: 'evaluate', text: 'The writer assumes that ___ caused ___, but the two may only have happened at the same time.', textVn: 'Người viết cho rằng ___ đã gây ra ___, nhưng hai việc có thể chỉ xảy ra cùng lúc.' },
  { stage: 'evaluate', text: 'Both sources use numbers, but Source ___\'s are stronger because they were ___, while Source ___\'s were only ___.', textVn: 'Cả hai nguồn đều dùng con số, nhưng số liệu của Nguồn ___ mạnh hơn vì chúng được ___, trong khi số liệu của Nguồn ___ chỉ được ___.' },
  { stage: 'contrast', text: 'Although Source ___ has a stake in the result, its point about ___ is still fair, because ___.', textVn: 'Dù Nguồn ___ có quyền lợi trong kết quả, điểm của nó về ___ vẫn hợp lý, vì ___.' },
];

const TASK_TAIL =
  'In your response, analyze both positions presented in the two texts to determine which one is best supported. Use relevant and specific evidence from both texts to support your response. You should expect to spend up to 45 minutes planning, drafting, and editing your response.';

export const essays = [
  {
    id: "tl1",
    title: "Ending library fines",
    titleVn: "Bỏ tiền phạt thư viện",
    minutesAllowed: 45,
    sources: [
      {
        type: "Speech",
        title: "Fines Teach Responsibility",
        byline: "Excerpt from remarks by Harold Beck, a member of the Carver County Library Board, at the board's monthly public meeting",
        text: [
          "Thank you, Madam Chair. I have served on this board for eleven years, and I have never seen a proposal that worried me more than this one. The staff want to end overdue fines. I understand the kind intention behind it. But a library is a shared collection, and fines are how we keep it shared.",
          "Fines work because they give borrowers a reason to return books on time. Remove the fine, and you remove the reason. It does not take a study to see what will happen next: books will come back later and later, waiting lists will grow, and before long our shelves will be half empty. Last spring, one borrower kept twelve books for five months. The fine was the only thing that finally brought them back.",
          "There is also the question of money. Last year, overdue fines brought in $64,000. That money bought new children's books and helped pay for the summer reading program. If we end fines, I have not heard anyone explain where that money will come from. Are we going to cut the summer program, or raise taxes?",
          "And what about the borrowers who do the right thing? For years, most of our patrons have returned their books on time. Ending fines tells them that their honesty counted for nothing, and it rewards the people who kept books the longest.",
          "Finally, fines teach a lesson that goes beyond books. When I was a boy, I paid my library fines out of my paper-route money, and I learned that when you borrow something, you return it. Every parent I have spoken to agrees that children need to learn responsibility. What are we teaching them if we say that rules do not matter?",
          "Libraries have charged fines for more than a hundred years, and they have served this county well. I urge the board to vote no.",
        ].join("\n\n"),
      },
      {
        type: "News article",
        title: "Libraries That Dropped Fines Saw More Books Come Back",
        byline: "By Denise Park, staff reporter, the Carver County Courier",
        text: [
          "When the Linwood Public Library stopped charging overdue fines in January 2022, some staff members expected the shelves to empty. Eighteen months later, the library's own records show the opposite. The share of items returned on time stayed almost the same, moving from 93 percent to 94 percent. Meanwhile, more than 2,100 people whose cards had been blocked for unpaid fines came back to the library, many of them returning books they had kept for years.",
          "\"The fines were not bringing books back. They were keeping people away,\" said Linwood's director, Carla Nunes. Most of the blocked cards, she said, belonged to children and to families in the county's lowest-income neighborhoods.",
          "Linwood is not alone. A 2023 survey of 212 public libraries that ended fines, carried out by the library science department at Eastmont University, found that 78 percent saw no drop in on-time returns and 64 percent had more visitors in the first year. \"Most people return books because they want other people to be able to borrow them, not because of a 25-cent fine,\" said Professor Alan Whitfield, who led the survey.",
          "Not everyone is convinced. Carver County board member Harold Beck has warned that returns will slow down if fines end. Whitfield said the worry is common but has not shown up in the data: \"Libraries feared this for years. When they finally tried it, the shelves did not empty.\"",
          "Ending fines does not mean ending all rules. Linwood still blocks a card when an item is more than 45 days overdue, and it charges the full replacement cost for anything that never comes back.",
          "The money is a real question, Nunes admitted. Linwood's fines had brought in about $51,000 a year. But the library calculated that collecting them, including staff time at the desk and mailed notices, cost roughly $30,000. The rest of the gap was covered by a small cut to the magazine budget.",
        ].join("\n\n"),
      },
    ],
    task: `The speech and the news article present opposing views on whether the county library should stop charging overdue fines. ${TASK_TAIL}`,
    guidelines: [
      "Read both bylines first: who is each writer, and what kind of evidence would you expect from them?",
      "Sort the evidence: library records and a survey of many libraries, or one borrower and one childhood memory?",
      "Name the reasoning problems you find — a prediction stated as a certainty, \"every parent agrees\", \"we have always done it this way\".",
      "The $64,000 is a fair point. Concede it, then show whether the other text answers it.",
    ],
    suggestedWords: [
      ["records", "survey", "measured"],
      ["prediction", "anecdote", "tradition"],
      ["fines", "returns", "replacement"],
    ],
    frames: TEST_LENGTH_FRAMES,
  },
  {
    id: "tl2",
    title: "A tax on sugary drinks",
    titleVn: "Thuế đồ uống có đường",
    minutesAllowed: 45,
    sources: [
      {
        type: "Op-ed",
        title: "The Soda Tax Is Working",
        byline: "By Dr. Alicia Moreno, professor of public health at Westbrook University",
        text: [
          "Three years ago, the city of Harlow added a tax of 1.5 cents per ounce to sugary drinks such as soda, sweet tea and energy drinks. Critics said it would not change anyone's habits. The evidence now says they were wrong.",
          "My research team studied checkout data from 150 stores in and around Harlow, comparing sales before and after the tax. Purchases of taxed drinks inside the city fell by 33 percent. Some shoppers did cross the city line to buy soda in neighboring towns, and when we added those sales back in, the overall drop was still 25 percent. At the same time, sales of bottled water in Harlow rose by 8 percent.",
          "The tax has also raised about $11 million a year. The city council has used that money to open 600 free preschool places and to install water fountains in every public school, benefits that go mostly to lower-income families.",
          "Opponents say the tax is unfair to poorer families, who spend a larger share of their income on it. That concern deserves a real answer. In our data, lower-income households cut their purchases the most, by 38 percent, so they paid less in tax than critics expected. Our study was paid for by a grant from the state health department, not by either side of the debate.",
          "Sugary drinks are the largest single source of added sugar in the American diet, and drinking them heavily is linked to type 2 diabetes and tooth decay. If Harlow's drop in sales continues, I believe the tax will prevent thousands of cases of diabetes over the next twenty years.",
          "No single policy will solve a national health problem. But when a measure changes behavior this much and pays for preschool at the same time, other cities should pay attention.",
        ].join("\n\n"),
      },
      {
        type: "Press release",
        title: "Retailers Say Soda Tax Hurts Families and Local Stores",
        byline: "Issued by the Tri-County Beverage and Grocery Association, which represents 240 food stores and drink distributors",
        text: [
          "The Tri-County Beverage and Grocery Association today called on the Harlow City Council to repeal the city's tax on sweetened drinks, saying the tax has harmed working families and the small businesses that serve them.",
          "In a survey of association members, 7 out of 10 store owners inside the city said their drink sales had fallen since the tax began, and many said customers now do all of their grocery shopping in neighboring towns. \"People don't just drive across the line for soda. They buy their milk, bread and gas there too,\" said Ray Dunmore, who owns a corner store two blocks from the city line. \"My sales are down 20 percent.\"",
          "The city's own figures back this up. In the first year of the drink tax, the total sales tax collected by stores inside Harlow fell by 4 percent, while sales tax collected in the three neighboring towns rose by 6 percent.",
          "The tax also falls hardest on the people who can least afford it. A family earning $30,000 a year pays the same tax on a case of soda as a family earning $300,000, which means that poorer families pay a much larger share of their income.",
          "The association estimates that as many as 400 jobs could be at risk if the tax stays in place. \"Stores run on thin margins,\" said association president Linda Carver. \"This is how neighborhood businesses close.\"",
          "Finally, the tax treats adults like children. Families, not politicians, should decide what goes in their shopping carts. Everybody knows that the real cause of poor health is a lack of exercise, not a can of soda.",
        ].join("\n\n"),
      },
    ],
    task: `The op-ed and the press release present opposing views on whether cities should tax sugary drinks. ${TASK_TAIL}`,
    guidelines: [
      "Both texts use numbers. Ask where each number came from and how it was collected.",
      "Check each byline: does either writer gain or lose money depending on how the reader decides?",
      "Look for claims stated as facts with no support, and for forecasts dressed up as results — in BOTH texts.",
      "The point about poorer families is fair. Concede it, then weigh it against the rest of the evidence.",
    ],
    suggestedWords: [
      ["checkout data", "study", "measured"],
      ["stake", "survey", "estimate"],
      ["tax", "sales", "families"],
    ],
    frames: TEST_LENGTH_FRAMES,
  },
  {
    id: "tl3",
    title: "Social media under sixteen",
    titleVn: "Mạng xã hội dưới mười sáu tuổi",
    minutesAllowed: 45,
    sources: [
      {
        type: "Speech",
        title: "Our Children Cannot Wait",
        byline: "Excerpt from testimony by State Senator Janet Marsh to the Senate Committee on Families and Children",
        text: [
          "Members of the committee, I am here because of a fourteen-year-old girl named Emily. Emily's mother called my office last spring. Her daughter had stopped sleeping, stopped eating with the family, and stopped talking to her friends at school. She was spending seven hours a day on social media apps. Emily is doing better now, but her mother asked me a question I cannot forget: \"Why did no one protect her?\"",
          "Senate Bill 12 would answer that question. It would ban anyone under sixteen from opening a social media account in our state, and it would require companies to check the age of every user.",
          "The facts are clear. Since 2010, when smartphones became common, the rate of anxiety among American teenagers has risen by around 50 percent. The cause is obvious. These apps were designed by some of the smartest engineers in the world for one purpose: to keep young people scrolling for as long as possible.",
          "Experts agree that children's brains are not ready for this. Every parent I have talked to supports this bill, and last month a survey by the group Parents for Safe Screens found that 9 in 10 of its members want a ban. Other states are already acting, and ours should not be left behind. If we do nothing, we will lose a whole generation to their screens.",
          "Some will say that a ban is too hard to enforce. We do not let sixteen-year-olds buy alcohol or cigarettes, and nobody says those laws are too hard. It is time to treat these apps the same way. I ask you to pass Senate Bill 12.",
        ].join("\n\n"),
      },
      {
        type: "Op-ed",
        title: "A Ban Is the Wrong Tool",
        byline: "By Dr. Kevin Osei, researcher in adolescent development at Northfield University",
        text: [
          "No one who works with teenagers doubts that some of them are struggling. The question is whether banning social media for everyone under sixteen would help them. The best evidence we have says it would not help much, and it could create new problems.",
          "My research group followed 12,000 teenagers for three years, measuring how much time they spent on social media and how they felt. For most teens, the link between social media use and well-being was small. The exception was heavy use: teens who spent more than five hours a day on the apps were twice as likely to report symptoms of depression. That points to limits on heavy use and on certain features, not to a ban on every account. Our study has limits, too: it relied on teenagers' own reports of how they felt, and it shows which things went together, not what caused what.",
          "We also know what happens when a ban is tried. When the state of Dalton required age checks for social media in 2023, a survey by the state's own education department found that 6 in 10 teens were still using the apps a month later, most often through an older sibling's or a parent's account. That same year, a company that checked users' ages for the state was hacked, and scans of 80,000 driver's licenses were stolen.",
          "Policies aimed at the real risks would do more good: requiring apps to turn off endless scrolling and late-night notifications for young users, and teaching students how the apps are designed to hold their attention. When one school district in our state taught a six-week course on exactly that, students' own reports of their daily screen time fell by an average of 40 minutes.",
          "Parents are right to worry. But a law that most teenagers can get around, and that puts everyone's personal data at risk, is a promise that cannot be kept.",
        ].join("\n\n"),
      },
    ],
    task: `The speech and the op-ed present opposing views on whether the state should ban social media accounts for anyone under sixteen. ${TASK_TAIL}`,
    guidelines: [
      "A moving story is not the same as evidence. Decide what Emily's story can and cannot prove.",
      "\"Since 2010… the cause is obvious\": ask whether two things happening at the same time proves that one caused the other.",
      "Who are \"experts\" and \"every parent\"? Compare them with a named study of 12,000 teenagers.",
      "Source 2 agrees that heavy use is harmful. Use that — a good essay notices where the two sides agree.",
    ],
    suggestedWords: [
      ["study", "measured", "followed"],
      ["anecdote", "assumption", "correlation"],
      ["ban", "age checks", "heavy use"],
    ],
    frames: TEST_LENGTH_FRAMES,
  },
  {
    id: "tl4",
    title: "Public money for a stadium",
    titleVn: "Tiền công cho sân vận động",
    minutesAllowed: 45,
    sources: [
      {
        type: "Press release",
        title: "Riverfront Stadium Will Bring Jobs and Pride to Millbrook",
        byline: "Issued jointly by the Office of the Mayor of Millbrook and the Millbrook Mariners baseball club",
        text: [
          "Mayor Diane Hollis and the Millbrook Mariners today announced plans for a new $650 million stadium on the Millbrook riverfront, to be paid for with $400 million in city bonds and $250 million from the team's owners.",
          "An economic study prepared for the Mariners by Keystone Consulting predicts that the stadium will create 3,000 jobs and bring $400 million in new spending to the city over its first ten years. The study also predicts that restaurants and hotels near the riverfront will see their business grow by as much as 40 percent on game days.",
          "\"When the old stadium opened in 1972, it changed my family's life,\" said Tony Russo, whose restaurant has stood across the street from the stadium for fifty years. \"Game nights paid for my kids' college.\"",
          "The owners' $250 million share is the largest private investment in Millbrook's history. The plans also include a riverfront park, 300 new apartments and a public plaza that will host concerts and farmers markets all year, bringing visitors downtown on the 280 days a year when there is no game.",
          "The stadium is about more than money. A major-league team puts Millbrook on the map. Every great American city has a ballpark that its people are proud of, and Millbrook deserves nothing less.",
          "The Mariners' current lease ends in 2027, and other cities have made it clear that they would welcome the team. \"We want to stay in Millbrook,\" said team president Greg Albright, \"but we need a home that can compete.\" The City Council will vote on the plan next month.",
        ].join("\n\n"),
      },
      {
        type: "Op-ed",
        title: "Millbrook Should Not Pay for a Stadium",
        byline: "By Dr. Rebecca Tran, professor of economics at Lakeshore State University",
        text: [
          "Economists do not agree on much, but most of us agree on this: public money spent on sports stadiums rarely pays off for the cities that spend it.",
          "In 2022, a team of researchers reviewed 130 studies of stadiums built in the United States over the past thirty years. Most of those studies found no measurable increase in local jobs or income after a new stadium opened. The reason is simple. Families have only so much to spend on entertainment, and money spent at a ballgame is money not spent at a movie theater, a bowling alley or a restaurant across town. The spending moves; it does not grow.",
          "The jobs are also smaller than they sound. Most stadium jobs, such as selling tickets, parking cars and serving food, are part-time and last only for the eighty or so home games each season. Large job promises usually count temporary construction work as well.",
          "The Mariners' figures come from a study paid for by the team. It is hardly surprising that the team's study found the team's plan to be a good one. By contrast, the city of Fairhaven is still paying off the bonds for a stadium that was torn down in 2019, and those payments cost the city $9 million a year.",
          "Supporters also point to the apartments and plaza planned around the ballpark. Those could be good for the riverfront, but nothing in the plan requires them to be built, and the city could encourage the same development without paying for a stadium.",
          "I understand why people love their team, and a stadium can bring real civic pride. But $400 million could repair every bridge in Millbrook and still leave money for schools. The council should ask the owners to pay for their own stadium.",
        ].join("\n\n"),
      },
    ],
    task: `The press release and the op-ed present opposing views on whether the city of Millbrook should use public money to build a new stadium. ${TASK_TAIL}`,
    guidelines: [
      "Notice every word that marks a forecast — predicts, could, will — and ask what has actually been measured.",
      "Who paid for each study? Say how that affects how much you trust it.",
      "Name the appeals that are not evidence: one restaurant owner's memory, \"every great American city\", the warning that the team might leave.",
      "Check the stronger text too — find one claim in it that is not supported, and say so.",
    ],
    suggestedWords: [
      ["review", "studies", "measurable"],
      ["predicts", "paid for", "projection"],
      ["jobs", "spending", "bonds"],
    ],
    frames: TEST_LENGTH_FRAMES,
  },
  {
    id: "tl5",
    title: "Heading in youth soccer",
    titleVn: "Đánh đầu trong bóng đá thiếu nhi",
    minutesAllowed: 45,
    sources: [
      {
        type: "Op-ed",
        title: "Keep Young Players' Heads Out of the Game",
        byline: "By Dr. Samuel Reyes, sports medicine physician at Greenview Children's Hospital",
        text: [
          "Every fall, I treat young soccer players with headaches, dizziness and trouble concentrating. Many of them have never had a big collision on the field. What they have done, again and again, is head the ball.",
          "The evidence that repeated heading harms young players is growing. A 2021 study of 2,700 players aged 10 to 14 in our state's youth leagues found that players who headed the ball more than ten times per game were three times as likely to report headaches and dizziness as players who rarely headed it. Children's brains are still developing, and their neck muscles are not yet strong enough to steady the head when the ball hits.",
          "Banning heading works. In 2019, the Riverside Youth Soccer League banned heading for all players under 12. Over the next two seasons, the league's reported concussions fell by 31 percent compared with the two seasons before, even though the number of players grew.",
          "Some coaches say the real danger is collisions, not headers. They are partly right: collisions cause many of the worst injuries. But many of those collisions happen when two players jump for the same header, so a heading ban reduces them too.",
          "A ban does not change the game very much. At these ages, players head the ball only a few times in a match. Coaches can teach heading safely from age 12, starting with light foam balls, once the neck muscles are stronger.",
          "I love this sport, and I want children to play it for the rest of their lives. That is exactly why the Greenview Youth Soccer Association should stop heading for players under 12, starting this season.",
        ].join("\n\n"),
      },
      {
        type: "Letter to the editor",
        title: "Let Kids Play Real Soccer",
        byline: "From Frank Delgado, who has coached youth soccer in Greenview for 22 years",
        text: [
          "I have read Dr. Reyes's article, and I respect doctors. But I have coached more than 1,000 children in 22 years, and I have never seen a single child hurt by heading a soccer ball.",
          "When I was growing up, we headed the ball in every practice and every game, and my teammates and I turned out fine. Soccer has been played this way for more than a hundred years. The real danger is not the header; it is the collision when two players jump for the ball at once. Every coach I know says the same thing.",
          "Dr. Reyes's numbers show that some players get headaches. They do not show that heading causes them. Children who head the ball a lot may simply be the ones who play the most, and players who play more get hurt more. The Riverside league also hired more referees in the same year it banned heading, so who can say which change made the difference?",
          "There is also a practical problem. Players who never practice heading until age 12 will learn it late and learn it badly. A teenager who has never been taught to head the ball is more likely to get hurt when he finally tries it in a game.",
          "And where does it stop? First it is heading. Next it will be slide tackles, then goalkeepers diving, and soon our children will be playing a game that is not soccer at all. Kids will quit and sit at home in front of screens instead.",
          "Parents already have a choice. Any family that is worried about heading can keep their child out of the game. The association should let the rest of us play the real game.",
        ].join("\n\n"),
      },
    ],
    task: `The op-ed and the letter to the editor present opposing views on whether the Greenview Youth Soccer Association should ban heading the ball for players under 12. ${TASK_TAIL}`,
    guidelines: [
      "Compare the kinds of evidence: a study of 2,700 players and a league's injury records, or one coach's memory of his own team?",
      "Name the reasoning moves in the letter — \"where does it stop?\", \"every coach I know\", \"it has always been played this way\".",
      "The point about learning to head late is worth answering. Does the op-ed answer it?",
      "Be fair to the letter: a doctor who treats injured children sees the worst cases. Say whether that matters.",
    ],
    suggestedWords: [
      ["study", "records", "concussions"],
      ["experience", "slippery slope", "tradition"],
      ["heading", "players", "injury"],
    ],
    frames: TEST_LENGTH_FRAMES,
  },
  {
    id: "tl6",
    title: "Gas-powered leaf blowers",
    titleVn: "Máy thổi lá chạy xăng",
    minutesAllowed: 45,
    sources: [
      {
        type: "Government report",
        title: "Recommendation: Phase Out Gas-Powered Leaf Blowers",
        byline: "Summary of a staff report to the Oakdale City Council from the city's Office of Environmental Quality",
        text: [
          "Staff recommend that the City Council phase out gas-powered leaf blowers over two years, starting in January 2027.",
          "Noise. Last year the city received 1,140 noise complaints, and 41 percent of them were about leaf blowers, more than any other source, including traffic and construction. City staff measured 12 commercial gas blowers in use and recorded an average of 74 decibels at a distance of 50 feet. Electric models measured 63 decibels. Because of the way sound is measured, an 11-decibel drop means the electric machines sound roughly half as loud to people nearby.",
          "Air quality. The small engines in gas blowers burn fuel inefficiently. The state Air Resources Board estimates that running a commercial gas blower for one hour releases as much smog-forming pollution as driving a typical car about 1,100 miles. The workers who operate the machines breathe these fumes all day.",
          "Experience elsewhere. The city of Palmer phased out gas blowers in 2022. In the following year, Palmer's noise complaints about landscaping fell by 52 percent, and the city reported that most landscaping companies had switched equipment without raising prices. In a follow-up survey, 71 percent of Palmer residents said their neighborhoods were noticeably quieter.",
          "Other options. Staff considered limiting the hours when blowers may be used instead. Limits on hours would reduce early-morning and evening noise, but they would do nothing about air pollution, and they are hard to enforce: the city of Brandt answered 900 calls about blowers in one year and issued only 14 fines.",
          "Costs. Staff recognize that electric equipment costs more up front. The plan offers landscaping businesses a rebate of $200 for each gas blower they trade in, and the two-year phase-in allows companies to replace machines as the old ones wear out.",
        ].join("\n\n"),
      },
      {
        type: "Public statement",
        title: "Don't Put Oakdale's Landscapers Out of Business",
        byline: "Statement to the Oakdale City Council from the Oakdale Landscape Contractors Association, which represents 64 local landscaping companies",
        text: [
          "Our members keep Oakdale's parks, schools and yards clean. We support cleaner air and quieter streets. But this plan asks small businesses to pay for a problem the city has not measured fairly.",
          "A commercial electric blower costs about $800. It runs for roughly 45 minutes on one battery, so a worker who uses it all day needs six batteries at $350 each. That is about $2,900 per worker. In our survey of member companies, the average business would need to spend $11,000 to switch its equipment. The city's $200 rebate would cover less than one-tenth of that, and our customers already tell us that our prices are too high.",
          "The batteries also perform poorly in cold weather, which is exactly when our crews clear the most leaves. One of our members tested electric blowers last November and found that his crews needed almost twice as long to finish each job.",
          "The city's complaint numbers also need a closer look. The 1,140 complaints came from just 212 households, and one street alone filed 160 of them. A small number of very unhappy neighbors is not the same as a problem across the whole city.",
          "The Palmer example proves nothing about Oakdale. Palmer is a small town with a warm climate. Our members tell us that many Palmer companies quietly raised their prices or moved their business to nearby towns.",
          "Most of the workers on our crews are immigrants building a better life for their families, and this rule puts their jobs at risk. Instead of a ban, the council should limit the hours when blowers can be used. That would solve the noise problem without destroying anyone's livelihood.",
        ].join("\n\n"),
      },
    ],
    task: `The city report and the public statement present opposing views on whether Oakdale should phase out gas-powered leaf blowers. ${TASK_TAIL}`,
    guidelines: [
      "This one is close: both texts give real numbers. Either position can score a 2 — what counts is how well you weigh the evidence.",
      "Check the cost figures: do the association's numbers show that the $200 rebate is too small?",
      "Look for evidence that one side never answers — the air-quality finding, the cold-weather test, what happened in Palmer.",
      "Separate measured facts from reports of what \"our members tell us\".",
    ],
    suggestedWords: [
      ["measured", "decibels", "complaints"],
      ["survey", "estimate", "cost"],
      ["noise", "pollution", "rebate"],
    ],
    frames: TEST_LENGTH_FRAMES,
  },
];
