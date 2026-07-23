// src/data/Y8/SCIENCE_1A/data.js
import { DIAGRAMS } from './diagrams.js';
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const SCIENCE_1A_DATA = {
  meta: {
    id: "SCIENCE_1A",
    title: "Light & Colour",
    desc: "Explore the laws of reflection, refraction, dispersion, and how coloured light behaves.",
    track: "Y8",
    icon: "Sun"
  },
  phases: [
    {
      id: "concept",
      title: "Phase 0: Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 5 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 5 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 5,
      tasks: [
        { id: "SPELLING", dbKey: "p2", maxXP: 5 },
        { id: "DICTATION", dbKey: "p3", maxXP: 5 },
        { id: "READ_COMP", dbKey: "p4", maxXP: 5 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 15 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 30,
      tasks: [
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 15 },
        { id: "ESSAY", dbKey: "p8", maxXP: 15 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 },
        { id: "GAMES", dbKey: "p12", maxXP: 15 }
      ]
    }
  ],
  realWords: [
    { word: "Reflection", vn: "Phản xạ", def: "The bouncing of light rays off a surface like a mirror.", vnDef: "Sự bật lại của các tia sáng khi chạm vào một bề mặt như gương.", sent: "The law of reflection states that the angle of incidence equals the angle of reflection.", vnSent: "Định luật phản xạ phát biểu rằng góc tới bằng góc phản xạ.", dictSent: "Reflection happens when light bounces off a smooth surface.", isReal: true },
    { word: "Medium", vn: "Môi trường", def: "A material or substance that light travels through, such as air, water, or glass.", vnDef: "Vật liệu hoặc chất mà ánh sáng truyền qua, chẳng hạn như không khí, nước hoặc thủy tinh.", sent: "Light slows down when it enters a denser medium like a block of solid glass.", vnSent: "Ánh sáng đi chậm lại khi đi vào một môi trường đặc hơn như một khối thủy tinh đặc.", dictSent: "A medium is any substance that light can travel through.", isReal: true },
    { word: "Refraction", vn: "Khúc xạ", def: "The bending of light as it changes speed when passing from one medium to another.", vnDef: "Sự bẻ cong của ánh sáng do thay đổi tốc độ khi truyền từ môi trường này sang môi trường khác.", sent: "Refraction causes a pencil sitting in a glass of water to look completely broken.", vnSent: "Khúc xạ khiến một chiếc bút chì cắm trong cốc nước trông như bị gãy hoàn toàn.", dictSent: "Refraction is the bending of light as it changes speed.", isReal: true },
    { word: "Dispersion", vn: "Tán sắc", def: "The splitting of white light into its continuous spectrum of colours.", vnDef: "Sự phân tách của ánh sáng trắng thành một dải quang phổ màu liên tục.", sent: "Dispersion of sunlight through a glass prism creates a beautiful rainbow effect.", vnSent: "Sự tán sắc của ánh sáng mặt trời qua lăng kính thủy tinh tạo ra hiệu ứng cầu vồng tuyệt đẹp.", dictSent: "Dispersion splits white light into a spectrum of colours.", isReal: true },
    { word: "Normal Line", vn: "Pháp tuyến", def: "An imaginary dashed line drawn exactly at 90 degrees to a reflecting surface.", vnDef: "Một đường đứt nét tưởng tượng được vẽ vuông góc chính xác 90 độ với bề mặt phản xạ.", sent: "In physics, we always measure the angle of a light ray starting from the normal line.", vnSent: "Trong vật lý, chúng ta luôn đo góc của tia sáng bắt đầu từ đường pháp tuyến.", dictSent: "The normal line is drawn at ninety degrees to the mirror.", isReal: true },
    { word: "Incident Ray", vn: "Tia tới", def: "The incoming ray of light that strikes a surface.", vnDef: "Tia sáng đi tới đập vào một bề mặt.", sent: "The incident ray travels towards the glass block before it hits the surface and bends.", vnSent: "Tia tới truyền về phía khối thủy tinh trước khi nó chạm vào bề mặt và bị bẻ cong.", dictSent: "The incident ray travels directly toward the surface.", isReal: true },
    { word: "Spectrum", vn: "Quang phổ", def: "The band of colours produced when light is separated, such as by a prism.", vnDef: "Dải màu được tạo ra khi ánh sáng bị tách ra, chẳng hạn như bởi lăng kính.", sent: "Red, green, and violet are all colours found naturally in the visible spectrum.", vnSent: "Đỏ, lục và tím đều là những màu được tìm thấy trong tự nhiên trong quang phổ nhìn thấy được.", dictSent: "A rainbow is a natural example of the visible light spectrum.", isReal: true },
    { word: "Prism", vn: "Lăng kính", def: "A transparent, triangular piece of glass used to disperse white light.", vnDef: "Một khối thủy tinh trong suốt, hình tam giác được sử dụng để tán sắc ánh sáng trắng.", sent: "When white light enters the prism, the dense glass splits it into seven distinct colours.", vnSent: "Khi ánh sáng trắng đi vào lăng kính, lớp thủy tinh đặc sẽ phân tách nó thành bảy màu riêng biệt.", dictSent: "A glass prism can bend and separate white light.", isReal: true },
    { word: "Primary Colours", vn: "Màu cơ bản", def: "The three colours of light (red, green, blue) that can be mixed to make white light.", vnDef: "Ba màu của ánh sáng (đỏ, lục, lam) có thể được pha trộn để tạo ra ánh sáng trắng.", sent: "By adding the three primary colours of light together, you get pure white.", vnSent: "Bằng cách cộng ba màu cơ bản của ánh sáng lại với nhau, bạn sẽ có màu trắng tinh khiết.", dictSent: "Red, green, and blue are the primary colours of light.", isReal: true },
    { word: "Secondary Colours", vn: "Màu thứ cấp", def: "Colours of light created by mixing two primary colours together (cyan, magenta, and yellow).", vnDef: "Các màu của ánh sáng được tạo ra bằng cách trộn hai màu cơ bản với nhau (xanh lơ, đỏ thắm và vàng).", sent: "Cyan is a secondary colour created by adding green and blue light together.", vnSent: "Xanh lơ là một màu thứ cấp được tạo ra bằng cách cộng ánh sáng lục và lam lại với nhau.", dictSent: "Adding two primary colours creates a secondary colour.", isReal: true },
    { word: "Filter", vn: "Kính lọc", def: "A transparent material that absorbs certain colours and lets others pass through.", vnDef: "Một vật liệu trong suốt hấp thụ một số màu nhất định và cho phép những màu khác đi qua.", sent: "A red filter will absorb green and blue light, but let red light pass safely through.", vnSent: "Kính lọc đỏ sẽ hấp thụ ánh sáng lục và lam, nhưng cho phép ánh sáng đỏ đi qua một cách an toàn.", dictSent: "A filter absorbs unwanted colours and passes its own colour.", isReal: true }
  ],
  fakeWords: [
    { word: "Reflectation", imitating: "Reflection", isReal: false },
    { word: "Mediumate", imitating: "Medium", isReal: false },
    { word: "Refractance", imitating: "Refraction", isReal: false },
    { word: "Dispersity", imitating: "Dispersion", isReal: false },
    { word: "Normalizer", imitating: "Normal Line", isReal: false },
    { word: "Incidentor", imitating: "Incident Ray", isReal: false },
    { word: "Spectron", imitating: "Spectrum", isReal: false },
    { word: "Prismate", imitating: "Prism", isReal: false },
    { word: "Primer Colours", imitating: "Primary Colours", isReal: false },
    { word: "Second Colours", imitating: "Secondary Colours", isReal: false },
    { word: "Filteration", imitating: "Filter", isReal: false }
  ],
  dictation: [
    { sent: "Reflection happens when light bounces off a smooth surface.", vnSent: "Phản xạ xảy ra khi ánh sáng bật ra khỏi một bề mặt nhẵn." },
    { sent: "A medium is any substance that light can travel through.", vnSent: "Môi trường là bất kỳ chất nào mà ánh sáng có thể truyền qua." },
    { sent: "Refraction is the bending of light as it changes speed.", vnSent: "Khúc xạ là sự bẻ cong của ánh sáng khi nó thay đổi tốc độ." },
    { sent: "Dispersion splits white light into a spectrum of colours.", vnSent: "Sự tán sắc chia ánh sáng trắng thành một quang phổ màu." },
    { sent: "The normal line is drawn at ninety degrees to the mirror.", vnSent: "Đường pháp tuyến được vẽ vuông góc chín mươi độ với gương." },
    { sent: "The incident ray travels directly toward the surface.", vnSent: "Tia tới truyền trực tiếp về phía bề mặt." },
    { sent: "A rainbow is a natural example of the visible light spectrum.", vnSent: "Cầu vồng là một ví dụ tự nhiên về quang phổ ánh sáng nhìn thấy được." },
    { sent: "A glass prism can bend and separate white light.", vnSent: "Một lăng kính thủy tinh có thể bẻ cong và phân tách ánh sáng trắng." },
    { sent: "Red, green, and blue are the primary colours of light.", vnSent: "Đỏ, lục và lam là những màu cơ bản của ánh sáng." },
    { sent: "Adding two primary colours creates a secondary colour.", vnSent: "Việc cộng hai màu cơ bản tạo ra một màu thứ cấp." },
    { sent: "A filter absorbs unwanted colours and passes its own colour.", vnSent: "Kính lọc hấp thụ những màu không mong muốn và cho phép màu của chính nó đi qua." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Law of the Mirror",
      text: "When an {incident ray} of light strikes a perfectly flat mirror, it bounces off in a very predictable way. To calculate this bounce, scientists draw a {normal line} exactly at 90 degrees to the surface. The law of {reflection} states that the angle at which the light hits the normal will always perfectly match the angle at which it leaves. This is why mirrors create such accurate images.",
      vnTitle: "Định luật của Gương",
      vnText: "Khi một {incident ray} của ánh sáng đập vào một chiếc gương phẳng hoàn hảo, nó bật lại theo một cách rất dễ đoán. Để tính toán độ bật này, các nhà khoa học vẽ một {normal line} vuông góc chính xác 90 độ với bề mặt. Định luật {reflection} phát biểu rằng góc mà ánh sáng đập vào pháp tuyến sẽ luôn khớp hoàn hảo với góc mà nó rời đi. Đây là lý do tại sao gương tạo ra những hình ảnh chính xác như vậy."
    },
    {
      id: "passage_2",
      title: "The Bending Illusion",
      text: "Have you ever noticed that your legs look shorter when you stand in a swimming pool? This optical illusion is caused by {refraction}. When light leaves the water and enters the air, it moves into a different {medium}. Because air is less dense than water, the light speeds up and bends away from the normal. This bending makes our eyes believe the object is in a different location than it actually is.",
      vnTitle: "Ảo giác Bẻ cong",
      vnText: "Bạn đã bao giờ nhận thấy chân mình trông ngắn hơn khi đứng trong hồ bơi chưa? Ảo giác quang học này được gây ra bởi {refraction}. Khi ánh sáng rời khỏi mặt nước và đi vào không khí, nó di chuyển vào một {medium} khác. Vì không khí ít đặc hơn nước, ánh sáng tăng tốc và uốn cong ra xa pháp tuyến. Sự bẻ cong này làm cho mắt chúng ta tin rằng vật thể đang ở một vị trí khác với thực tế."
    },
    {
      id: "passage_3",
      title: "Splitting the Rainbow",
      text: "White light is a trick played on our eyes. It is actually a mixture of many different colours. When white light passes through a {prism}, the glass slows each colour down by a slightly different amount. Red light slows down the least, so it bends the least. Violet light slows down the most. This causes the light to fan out into a beautiful {spectrum}, a process known to scientists as {dispersion}.",
      vnTitle: "Phân tách Cầu vồng",
      vnText: "Ánh sáng trắng là một trò đánh lừa đôi mắt của chúng ta. Nó thực chất là một hỗn hợp của nhiều màu sắc khác nhau. Khi ánh sáng trắng đi qua một {prism}, thủy tinh làm chậm mỗi màu lại với một mức độ hơi khác nhau. Ánh sáng đỏ chậm lại ít nhất, nên nó bẻ cong ít nhất. Ánh sáng tím chậm lại nhiều nhất. Điều này khiến ánh sáng xòe ra thành một {spectrum} tuyệt đẹp, một quá trình được các nhà khoa học gọi là {dispersion}."
    },
    {
      id: "passage_4",
      title: "Painting with Light",
      text: "When an artist paints, mixing all the colours together creates a dark, muddy brown. However, light behaves completely differently. In physics, the {Primary Colours} of light are red, green, and blue. If you shine all three of these lights together, they combine to create pure white light! By mixing just two primary colours, you can create bright {Secondary Colours}. For example, mixing red and green light creates yellow, while blue and red create magenta.",
      vnTitle: "Vẽ tranh bằng Ánh sáng",
      vnText: "Khi một họa sĩ vẽ tranh, việc trộn tất cả các màu lại với nhau sẽ tạo ra một màu nâu tối và đục. Tuy nhiên, ánh sáng hoạt động hoàn toàn khác. Trong vật lý, các {Primary Colours} của ánh sáng là đỏ, lục và lam. Nếu bạn chiếu cả ba ánh sáng này cùng nhau, chúng sẽ kết hợp để tạo ra ánh sáng trắng tinh khiết! Bằng cách trộn chỉ hai màu cơ bản, bạn có thể tạo ra các {Secondary Colours} rực rỡ. Ví dụ, trộn ánh sáng đỏ và lục tạo ra màu vàng, trong khi ánh sáng lam và đỏ tạo ra màu đỏ thắm."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Light & Colour Rules",
    vnTitle: "Bài 1A: Các Quy tắc về Ánh sáng & Màu sắc",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập của bạn.",
    sections: [
      {
        heading: "1. Reflection & Refraction",
        vnHeading: "1. Phản xạ & Khúc xạ",
        text: "**Reflection** happens when light bounces off a surface. The angle of the **Incident Ray** always equals the angle of reflection. **Refraction** happens when light changes speed because it enters a different **Medium** (like glass), causing the ray to bend.",
        vnText: "**Phản xạ** xảy ra khi ánh sáng bật ra khỏi một bề mặt. Góc của **Tia tới** luôn bằng góc phản xạ. **Khúc xạ** xảy ra khi ánh sáng thay đổi tốc độ vì nó đi vào một **Môi trường** khác (như thủy tinh), khiến tia sáng bị bẻ cong."
      },
      {
        heading: "2. Dispersion",
        vnHeading: "2. Tán sắc",
        text: "White light is a mix of colours. A **Prism** causes **Dispersion**, splitting white light into a continuous **Spectrum**. Red bends the least, while violet bends the most.",
        vnText: "Ánh sáng trắng là một hỗn hợp các màu. Một **Lăng kính** gây ra sự **Tán sắc**, phân tách ánh sáng trắng thành một **Quang phổ** liên tục. Màu đỏ bẻ cong ít nhất, trong khi màu tím bẻ cong nhiều nhất."
      },
      {
        heading: "3. Mixing & Filtering Colour",
        vnHeading: "3. Pha trộn & Lọc Màu",
        text: "The **Primary Colours** of light are Red, Green, and Blue. Mixing them creates **Secondary Colours** like Cyan, Magenta, and Yellow. A **Filter** only allows its own colour to pass through, absorbing all other colours.",
        vnText: "**Màu cơ bản** của ánh sáng là Đỏ, Lục và Lam. Trộn chúng tạo ra các **Màu thứ cấp** như Xanh lơ, Đỏ thắm và Vàng. Một **Kính lọc** chỉ cho phép màu của chính nó đi qua, hấp thụ tất cả các màu khác."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "According to the Law of Reflection, what is the relationship between the angle of incidence and the angle of reflection?",
      requiredWords: [["equal", "same"]],
      scienceMaxMarks: 1,
      markScheme: [
        "1 mark for stating that the angles are always equal to each other."
      ],
      modelAnswer: "The angle of incidence is exactly equal to the angle of reflection."
    },
    {
      id: "q2",
      question: "Explain what happens to the speed and direction of a light ray when it enters a glass block from the air.",
      requiredWords: [["slow", "slower", "slows down"], ["towards", "closer"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that the light slows down.",
        "1 mark for stating that it bends towards the normal line."
      ],
      modelAnswer: "When light enters the denser glass block, it slows down. This change in speed causes the light to bend towards the normal line."
    },
    {
      id: "q3",
      question: "When white light passes through a prism, why does violet light appear at the bottom of the spectrum while red light is at the top?",
      requiredWords: [["red", "least"], ["violet", "most"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that red light bends (or slows down) the least.",
        "1 mark for explaining that violet light bends (or slows down) the most."
      ],
      modelAnswer: "Violet light bends the most when it enters the prism, pushing it to the bottom. Red light bends the least, keeping it near the top."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: DIAGRAMS.DATA_REFLECTION_55,
      promptText: "Look at the diagram showing an incident ray hitting a mirror. Calculate the angle of the missing reflected ray and state the law that proves your answer.",
      requiredWords: [["equal", "same", "reflection"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for correctly stating the angle is 55 degrees.",
        "1 mark for referencing the Law of Reflection (angle of incidence equals angle of reflection)."
      ],
      modelAnswer: "The reflected ray will be exactly 55 degrees. This is because the Law of Reflection states that the angle of incidence is always equal to the angle of reflection."
    },
    {
      id: "d2",
      inlineSvg: DIAGRAMS.DATA_REFRACTION_GLASS_BLOCK,
      promptText: "The diagram shows refraction through a glass block. Compare what is happening to the light ray at point A (inside the glass) and point B (exiting the glass). Based on this bending, what can you infer about the glass block compared to the air?",
      requiredWords: [["towards", "closer"], ["away", "further"], ["medium"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for stating that at A, the light bends towards the normal.",
        "1 mark for stating that at B, the light bends away from the normal.",
        "1 mark for inferring that the glass block is a denser medium than the air (causing the light to change speed)."
      ],
      modelAnswer: "At point A, the light bends towards the normal line. At point B, it bends away from the normal. Because the light bends towards the normal when entering the block, we can infer that the glass is a denser medium than the air."
    },
    {
      id: "d3",
      inlineSvg: DIAGRAMS.FILTER_DOUBLE_EXPERIMENT,
      promptText: "Lily sets up an experiment shining white light through a red filter, and then a green filter. Predict what she will see on the screen. Explain your reasoning using the words 'absorb' and 'pass'.",
      requiredWords: [["black", "nothing", "no light", "dark"], ["absorb", "absorbs", "absorbed"], ["pass", "passes"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for predicting that the screen will be dark/black (no light).",
        "1 mark for explaining that the red filter lets only red light pass (absorbing the rest).",
        "1 mark for explaining that the green filter absorbs the red light, letting nothing pass."
      ],
      modelAnswer: "Lily will see no light (black) on the screen. The first filter lets only red light pass through and absorbs the rest. When that red light hits the green filter, the green filter absorbs it completely, leaving total darkness."
    }
  ],
  essay: {
    task: "Explain the process of Dispersion. In your answer, describe what happens when white light passes through a glass prism, explain why the colours separate, and list the colours of the visible spectrum in the correct order.",
    guidelines: [
      "Define what white light is made of.",
      "Explain the role of the prism in changing the speed of different colours.",
      "List the 7 colours of the spectrum in order from least bent to most bent."
    ],
    requiredWords: [
      ["prism"], 
      ["speed", "slow", "bend", "refract"], 
      ["spectrum", "dispersion"], 
      ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for explaining that a prism separates white light because different colours slow down/bend by different amounts.",
      "1 mark for using the correct scientific terms (dispersion and spectrum).",
      "1 mark for listing the colours in the correct order (ROYGBIV)."
    ],
    modelAnswer: "Dispersion is the process of splitting white light into its continuous spectrum. White light is actually a mixture of all visible colours. When it passes through a glass prism, the glass causes the light to slow down and bend (refract). However, each colour slows down by a slightly different amount. Red light slows down the least, so it bends the least, while violet slows down and bends the most. This causes the light to fan out into the visible spectrum in this exact order: Red, Orange, Yellow, Green, Blue, Indigo, and Violet."
  },
  assessment,
  notes,
  workbook,
  games
};