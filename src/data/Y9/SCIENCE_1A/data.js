// src/data/Y9/SCIENCE_1A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const SCIENCE_1A_DATA = {
  meta: {
    id: "SCIENCE_1A",
    title: "Electrical Circuits",
    desc: "Understanding current, voltage, resistance, and the universal symbols used to design series and parallel circuits.",
    track: "Y9",
    icon: "Zap"
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
    { word: "Current", vn: "Dòng điện", def: "The rate at which electrons flow around a closed circuit, measured in Amperes (A).", vnDef: "Tốc độ mà các electron chạy quanh một mạch khép kín, được đo bằng Ampe (A).", sent: "The current is exactly the same everywhere in a series circuit.", vnSent: "Dòng điện hoàn toàn giống nhau ở mọi nơi trong một mạch nối tiếp.", dictSent: "Current is the rate of flow of electrons around a circuit.", isReal: true },
    { word: "Voltage", vn: "Điện áp", def: "The electrical push or energy provided by the battery, measured in Volts (V).", vnDef: "Lực đẩy điện hoặc năng lượng do pin cung cấp, được đo bằng Vôn (V).", sent: "A 12V battery provides the voltage needed to push electrons through the wires.", vnSent: "Một bộ pin 12V cung cấp điện áp cần thiết để đẩy các electron qua dây dẫn.", dictSent: "Voltage is shared between components in a series loop.", isReal: true },
    { word: "Resistance", vn: "Điện trở", def: "A measure of how much a component opposes the flow of current, measured in Ohms (Ω).", vnDef: "Thước đo mức độ một linh kiện cản trở dòng điện, được đo bằng Ohm (Ω).", sent: "Adding a variable resistor allows you to change the total resistance in the circuit.", vnSent: "Việc thêm một biến trở cho phép bạn thay đổi tổng điện trở trong mạch.", dictSent: "Resistance is measured in Ohms and reduces the flow of current.", isReal: true },
    { word: "Ammeter", vn: "Ampe kế", def: "A device used to measure current, which must always be connected in series.", vnDef: "Một thiết bị dùng để đo dòng điện, luôn phải được mắc nối tiếp.", sent: "We placed the ammeter directly in the main loop to measure the current.", vnSent: "Chúng tôi đặt ampe kế trực tiếp vào vòng lặp chính để đo dòng điện.", dictSent: "An ammeter must always be connected in series.", isReal: true },
    { word: "Voltmeter", vn: "Vôn kế", def: "A device used to measure voltage, which must always be connected in parallel.", vnDef: "Một thiết bị dùng để đo điện áp, luôn phải được mắc song song.", sent: "To find the potential difference, Mia connected the voltmeter across the lamp.", vnSent: "Để tìm hiệu điện thế, Mia đã mắc vôn kế ngang qua bóng đèn.", dictSent: "A voltmeter is used to measure voltage in parallel.", isReal: true },
    { word: "Series Circuit", vn: "Mạch nối tiếp", def: "A circuit with only one path for the current to flow through all components.", vnDef: "Một mạch điện chỉ có một đường đi cho dòng điện chạy qua tất cả các linh kiện.", sent: "In a series circuit, if one bulb blows out, all the other bulbs will turn off.", vnSent: "Trong một mạch nối tiếp, nếu một bóng đèn bị cháy, tất cả các bóng đèn khác sẽ tắt.", dictSent: "In a series circuit, the current is the same everywhere.", isReal: true },
    { word: "Parallel Circuit", vn: "Mạch song song", def: "A circuit that branches into multiple paths for the current to flow.", vnDef: "Một mạch điện rẽ thành nhiều nhánh cho dòng điện chạy qua.", sent: "Houses are wired in a parallel circuit so you can turn off one room without turning off the whole house.", vnSent: "Các ngôi nhà được đi dây theo mạch song song để bạn có thể tắt điện một phòng mà không làm tắt điện toàn bộ ngôi nhà.", dictSent: "In a parallel circuit, the voltage is the same across each branch.", isReal: true },
    { word: "Component", vn: "Linh kiện", def: "Any individual working part in a circuit, such as a lamp, switch, or bell.", vnDef: "Bất kỳ bộ phận hoạt động độc lập nào trong mạch, chẳng hạn như bóng đèn, công tắc hoặc chuông.", sent: "You must draw the correct symbol for each electrical component.", vnSent: "Bạn phải vẽ đúng ký hiệu cho từng linh kiện điện.", dictSent: "If one bulb breaks in a parallel circuit, the others stay on.", isReal: true },
    { word: "Cell", vn: "Pin", def: "A single source of electrical energy. Multiple connected cells make a battery.", vnDef: "Một nguồn năng lượng điện đơn lẻ. Nhiều pin kết nối với nhau tạo thành một bộ pin.", sent: "The symbol for a single cell is one long line and one short line.", vnSent: "Ký hiệu của một viên pin đơn là một vạch dài và một vạch ngắn.", dictSent: "A variable resistor can be adjusted to act as a dimmer switch.", isReal: true },
    { word: "Ohms Law", vn: "Định luật Ohm", def: "The mathematical rule stating that Voltage equals Current multiplied by Resistance (V = I × R).", vnDef: "Quy tắc toán học phát biểu rằng Điện áp bằng Dòng điện nhân với Điện trở (V = I × R).", sent: "By using Ohm's Law, we can calculate the missing voltage if we know the current and resistance.", vnSent: "Bằng cách sử dụng Định luật Ohm, chúng ta có thể tính toán điện áp còn thiếu nếu biết dòng điện và điện trở.", dictSent: "Ohm's law states that voltage equals current multiplied by resistance.", isReal: true }
  ],
  fakeWords: [
    { word: "Currencity", imitating: "Current", isReal: false },
    { word: "Voltatron", imitating: "Voltage", isReal: false },
    { word: "Resiston", imitating: "Resistance", isReal: false },
    { word: "Ammetron", imitating: "Ammeter", isReal: false },
    { word: "Voltimeter", imitating: "Voltmeter", isReal: false },
    { word: "Serial Circuit", imitating: "Series Circuit", isReal: false },
    { word: "Parallax Circuit", imitating: "Parallel Circuit", isReal: false },
    { word: "Componator", imitating: "Component", isReal: false },
    { word: "Cellule", imitating: "Cell", isReal: false },
    { word: "Ohmson's Law", imitating: "Ohm's Law", isReal: false }
  ],
  dictation: [
    { sent: "An ammeter must always be connected in series.", vnSent: "Ampe kế luôn phải được mắc nối tiếp." },
    { sent: "A voltmeter is used to measure voltage in parallel.", vnSent: "Vôn kế được sử dụng để đo điện áp mắc song song." },
    { sent: "Current is the rate of flow of electrons around a circuit.", vnSent: "Dòng điện là tốc độ dòng chảy của các electron quanh một mạch." },
    { sent: "In a series circuit, the current is the same everywhere.", vnSent: "Trong một mạch nối tiếp, dòng điện giống nhau ở mọi nơi." },
    { sent: "Voltage is shared between components in a series loop.", vnSent: "Điện áp được chia sẻ giữa các linh kiện trong một vòng lặp nối tiếp." },
    { sent: "In a parallel circuit, the voltage is the same across each branch.", vnSent: "Trong một mạch song song, điện áp giống nhau trên mỗi nhánh." },
    { sent: "If one bulb breaks in a parallel circuit, the others stay on.", vnSent: "Nếu một bóng đèn bị hỏng trong mạch song song, các bóng khác vẫn sáng." },
    { sent: "Resistance is measured in Ohms and reduces the flow of current.", vnSent: "Điện trở được đo bằng Ohm và làm giảm dòng điện." },
    { sent: "A variable resistor can be adjusted to act as a dimmer switch.", vnSent: "Một biến trở có thể được điều chỉnh để hoạt động như một công tắc điều chỉnh độ sáng." },
    { sent: "Ohm's law states that voltage equals current multiplied by resistance.", vnSent: "Định luật Ohm phát biểu rằng điện áp bằng dòng điện nhân với điện trở." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Drawing the Flow",
      text: "When scientists design electrical systems, they do not draw realistic pictures of batteries and wires. Instead, they use universal {component} symbols. For example, a single {cell} is drawn as a long and short line, while a battery is multiple cells joined together. These symbols allow us to build a {series circuit}, where electrons follow one single loop, carrying the electrical push, or {voltage}, to a lamp or a bell.",
      vnTitle: "Vẽ sơ đồ Dòng chảy",
      vnText: "Khi các nhà khoa học thiết kế hệ thống điện, họ không vẽ hình ảnh thực tế của pin và dây điện. Thay vào đó, họ sử dụng các ký hiệu {component} phổ quát. Ví dụ, một {cell} đơn lẻ được vẽ bằng một vạch dài và một vạch ngắn, trong khi bộ pin là nhiều viên pin ghép lại với nhau. Các ký hiệu này cho phép chúng ta xây dựng một {series circuit}, nơi các electron đi theo một vòng lặp duy nhất, mang theo lực đẩy điện, hay {voltage}, đến một bóng đèn hoặc một cái chuông."
    },
    {
      id: "passage_2",
      title: "Measuring the Invisible",
      text: "Because we cannot see electricity, we must use meters to measure it. To measure the {current}—how fast the electrons are flowing—we use an {ammeter}. This device must be placed directly into the main loop so the electrons flow right through it. However, a {voltmeter} works differently. To measure the electrical push across a lamp, the voltmeter must be connected in a {parallel circuit} loop, branching over the component like a bridge.",
      vnTitle: "Đo lường những thứ vô hình",
      vnText: "Vì chúng ta không thể nhìn thấy điện, chúng ta phải sử dụng máy đo để đo nó. Để đo {current}—tốc độ các electron đang chảy—chúng ta sử dụng một {ammeter}. Thiết bị này phải được đặt trực tiếp vào vòng lặp chính để các electron chảy thẳng qua nó. Tuy nhiên, một {voltmeter} hoạt động khác. Để đo lực đẩy điện ngang qua một bóng đèn, vôn kế phải được mắc trong một vòng lặp {parallel circuit}, bắc cầu qua linh kiện như một cây cầu."
    },
    {
      id: "passage_3",
      title: "The Mathematical Rules",
      text: "Electrical circuits follow strict rules. If you add more lamps to a series circuit, the voltage is shared, causing all the lamps to grow dim. But in a parallel circuit, the voltage remains at maximum across every branch, while the current splits! If you want to change these values, you can add a {resistance} block. By using {Ohm's Law} (V = I × R), an engineer can calculate exactly how much resistance is needed to control the power safely.",
      vnTitle: "Các Quy tắc Toán học",
      vnText: "Mạch điện tuân theo những quy tắc nghiêm ngặt. Nếu bạn thêm nhiều đèn vào mạch nối tiếp, điện áp sẽ được chia sẻ, khiến tất cả các đèn trở nên mờ đi. Nhưng trong mạch song song, điện áp duy trì ở mức tối đa trên mọi nhánh, trong khi dòng điện bị chia nhỏ! Nếu muốn thay đổi các giá trị này, bạn có thể thêm một khối {resistance}. Bằng cách sử dụng {Ohm's Law} (V = I × R), một kỹ sư có thể tính toán chính xác cần bao nhiêu điện trở để kiểm soát công suất một cách an toàn."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Electrical Circuits",
    vnTitle: "Bài 1A: Mạch điện",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. Current and Voltage",
        vnHeading: "1. Dòng điện và Điện áp",
        text: "**Current** is the flow of electrons, measured in Amps (A). **Voltage** is the electrical push from the power source, measured in Volts (V).",
        vnText: "**Dòng điện** là dòng chảy của các electron, đo bằng Ampe (A). **Điện áp** là lực đẩy điện từ nguồn điện, đo bằng Vôn (V)."
      },
      {
        heading: "2. Circuit Symbols and Meters",
        vnHeading: "2. Ký hiệu mạch và Máy đo",
        text: "We use universal symbols to draw circuits. An **Ammeter** measures current and must be placed in series. A **Voltmeter** measures voltage and must be placed in parallel.",
        vnText: "Chúng ta sử dụng các ký hiệu phổ quát để vẽ mạch điện. Một **Ampe kế** đo dòng điện và phải được đặt nối tiếp. Một **Vôn kế** đo điện áp và phải được đặt song song."
      },
      {
        heading: "3. Series vs. Parallel",
        vnHeading: "3. Nối tiếp và Song song",
        text: "In a **Series Circuit**, current is the same everywhere, but voltage is shared. In a **Parallel Circuit**, voltage is the same across branches, but the current splits. **Resistance** (measured in Ohms) opposes this flow.",
        vnText: "Trong một **Mạch Nối tiếp**, dòng điện giống nhau ở mọi nơi, nhưng điện áp được chia sẻ. Trong một **Mạch Song song**, điện áp giống nhau trên các nhánh, nhưng dòng điện bị chia nhỏ. **Điện trở** (đo bằng Ohm) cản trở dòng chảy này."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Mia wants to measure the current flowing through a circuit and the voltage across a specific lamp. Explain exactly how she should connect the ammeter and the voltmeter.",
      requiredWords: [["ammeter", "series"], ["voltmeter", "parallel", "across"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating the ammeter goes in series.",
        "1 mark for stating the voltmeter goes in parallel (or across the lamp)."
      ],
      modelAnswer: "Mia must connect the ammeter in series within the main loop to measure current, and she must connect the voltmeter in parallel across the lamp to measure voltage."
    },
    {
      id: "q2",
      question: "Explain what will happen to the remaining lamps if one bulb breaks in a Series Circuit compared to a Parallel Circuit.",
      requiredWords: [["series", "off", "stop", "broken"], ["parallel", "on", "work", "shine"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating all lamps turn off in a series circuit.",
        "1 mark for stating the other lamps stay on in a parallel circuit."
      ],
      modelAnswer: "In a series circuit, if one bulb breaks, the circuit is broken and all other lamps turn off. In a parallel circuit, the other branches still have a complete loop to the battery, so the remaining lamps stay on."
    },
    {
      id: "q3",
      question: "Using Ohm's Law (V = I × R), calculate the Voltage of a circuit if the Current is 3 Amps and the Resistance is 4 Ohms.",
      requiredWords: [["12", "twelve"], ["Volts", "V", "voltage"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for calculating the correct number (12).",
        "1 mark for providing the correct unit (Volts or V)."
      ],
      modelAnswer: "Because V = I × R, we multiply 3 Amps by 4 Ohms to get a Voltage of 12 Volts (12V)."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 100 50 L 300 50 L 300 200 L 100 200 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        
        <rect x="170" y="40" width="60" height="20" fill="white"/>
        <line x1="180" y1="35" x2="180" y2="65" stroke="#1e293b" stroke-width="2"/>
        <line x1="190" y1="45" x2="190" y2="55" stroke="#1e293b" stroke-width="4"/>
        <line x1="200" y1="50" x2="210" y2="50" stroke="#1e293b" stroke-width="2" stroke-dasharray="2"/>
        <line x1="220" y1="35" x2="220" y2="65" stroke="#1e293b" stroke-width="2"/>
        <line x1="230" y1="45" x2="230" y2="55" stroke="#1e293b" stroke-width="4"/>

        <rect x="90" y="115" width="20" height="20" fill="white"/>
        <circle cx="100" cy="125" r="14" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 90 115 L 110 135 M 110 115 L 90 135" stroke="#1e293b" stroke-width="2"/>

        <rect x="170" y="190" width="60" height="20" fill="white"/>
        <rect x="175" y="190" width="50" height="20" fill="white" stroke="#1e293b" stroke-width="2"/>
        <line x1="165" y1="225" x2="230" y2="175" stroke="#1e293b" stroke-width="2"/>
        <polygon points="230,175 222,175 228,182" fill="#1e293b"/>
        
        <text x="200" y="240" font-family="sans-serif" font-weight="900" font-size="20" fill="#f43f5e" text-anchor="middle">X</text>
      </svg>`,
      promptText: "Identify the component marked 'X' in the diagram and explain its primary function in this electrical circuit.",
      requiredWords: [["variable", "resistor"], ["change", "adjust", "control", "alter"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for correctly identifying component X as a variable resistor.",
        "1 mark for explaining that it is used to adjust or control the resistance (or current) in the circuit."
      ],
      modelAnswer: "Component X is a variable resistor. Its function is to allow the user to change the amount of resistance in the circuit, which in turn controls the flow of current."
    },
    {
      id: "d2",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <path d="M 80 180 L 80 80 L 320 80 L 320 180 L 80 180 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        
        <rect x="180" y="70" width="40" height="20" fill="white"/>
        <line x1="190" y1="65" x2="190" y2="95" stroke="#1e293b" stroke-width="2"/>
        <line x1="210" y1="55" x2="210" y2="105" stroke="#1e293b" stroke-width="4"/>
        
        <rect x="180" y="170" width="40" height="20" fill="white"/>
        <circle cx="200" cy="180" r="14" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 190 170 L 210 190 M 210 170 L 190 190" stroke="#1e293b" stroke-width="2"/>

        <path d="M 160 180 L 160 220 L 240 220 L 240 180" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <rect x="185" y="210" width="30" height="20" fill="white"/>
        <circle cx="200" cy="220" r="14" fill="white" stroke="#3b82f6" stroke-width="3"/>
        <text x="200" y="225" font-family="sans-serif" font-weight="900" font-size="14" fill="#3b82f6" text-anchor="middle">V</text>
      </svg>`,
      promptText: "Examine the circuit diagram. Explain why the voltmeter (V) is placed in this specific branching position relative to the lamp.",
      requiredWords: [["parallel", "across"], ["voltage", "potential difference"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying that the voltmeter is connected in parallel (or across the component).",
        "1 mark for stating that this is necessary to measure the voltage (potential difference) across that specific component."
      ],
      modelAnswer: "The voltmeter is placed in a parallel loop across the lamp because a voltmeter must always be connected in parallel to measure the voltage (potential difference) dropping across a specific component."
    },
    {
      id: "d3",
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md">
        <line x1="250" y1="10" x2="250" y2="240" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4"/>
        
        <text x="125" y="30" font-family="sans-serif" font-weight="900" font-size="16" fill="#f43f5e" text-anchor="middle">Circuit A</text>
        <path d="M 50 60 L 200 60 L 200 200 L 50 200 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        <rect x="110" y="50" width="30" height="20" fill="white"/>
        <line x1="120" y1="45" x2="120" y2="75" stroke="#1e293b" stroke-width="2"/>
        <line x1="130" y1="55" x2="130" y2="65" stroke="#1e293b" stroke-width="4"/>
        <rect x="40" y="120" width="20" height="20" fill="white"/>
        <circle cx="50" cy="130" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 43 123 L 57 137 M 57 123 L 43 137" stroke="#1e293b" stroke-width="2"/>
        <rect x="115" y="190" width="20" height="20" fill="white"/>
        <circle cx="125" cy="200" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 118 193 L 132 207 M 132 193 L 118 207" stroke="#1e293b" stroke-width="2"/>

        <text x="375" y="30" font-family="sans-serif" font-weight="900" font-size="16" fill="#3b82f6" text-anchor="middle">Circuit B</text>
        <path d="M 300 60 L 450 60 L 450 200 L 300 200 Z" fill="none" stroke="#1e293b" stroke-width="2"/>
        <line x1="300" y1="130" x2="450" y2="130" stroke="#1e293b" stroke-width="2"/>
        <rect x="360" y="50" width="30" height="20" fill="white"/>
        <line x1="370" y1="45" x2="370" y2="75" stroke="#1e293b" stroke-width="2"/>
        <line x1="380" y1="55" x2="380" y2="65" stroke="#1e293b" stroke-width="4"/>
        <rect x="365" y="120" width="20" height="20" fill="white"/>
        <circle cx="375" cy="130" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 368 123 L 382 137 M 382 123 L 368 137" stroke="#1e293b" stroke-width="2"/>
        <rect x="365" y="190" width="20" height="20" fill="white"/>
        <circle cx="375" cy="200" r="10" fill="white" stroke="#1e293b" stroke-width="2"/>
        <path d="M 368 193 L 382 207 M 382 193 L 368 207" stroke="#1e293b" stroke-width="2"/>
      </svg>`,
      promptText: "Assume an identical battery is used in both diagrams. Compare how the current behaves in Circuit A (Series) versus Circuit B (Parallel).",
      requiredWords: [["same", "one path", "constant"], ["split", "splits", "branches", "divide"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that the current in Circuit A stays exactly the same everywhere because there is only one path.",
        "1 mark for explaining that the current in Circuit B splits down the different branches."
      ],
      modelAnswer: "In Circuit A (a series circuit), the current is the exact same everywhere because there is only one loop. In Circuit B (a parallel circuit), the current splits up when it reaches the different branches."
    }
  ],
  essay: {
    task: "Compare and contrast Series and Parallel circuits. In your explanation, you must describe how Current (A) and Voltage (V) behave in each type of circuit, and provide one real-world example of where a parallel circuit is used.",
    guidelines: [
      "Define the physical layout of both circuits.",
      "Explain the rules for sharing or splitting current and voltage.",
      "Provide a logical real-world application."
    ],
    requiredWords: [
      ["series", "one", "single"], 
      ["parallel", "branches", "multiple"], 
      ["current", "voltage", "same", "shared", "split"], 
      ["example", "house", "lights"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for explaining that Series has one path (current is same, voltage is shared).",
      "1 mark for explaining that Parallel has multiple branches (voltage is same, current splits).",
      "1 mark for a valid real-world example (e.g., house wiring)."
    ],
    modelAnswer: "A series circuit has only one path; therefore, the current is exactly the same everywhere, but the voltage is shared among the components. A parallel circuit has multiple branches; here, the voltage is the same across every branch, but the current splits down the different paths. A real-world example of a parallel circuit is the lighting in a house, which ensures that if a lightbulb breaks in the kitchen, the living room lights will stay on."
  },
  assessment,
  notes,
  workbook,
  games
};