// src/data/Y8/SCIENCE_1A/assessment.js
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [], 
  questions: [
    {
      id: "q1_mcq_reflection",
      type: "mcq",
      title: "1. Look at the diagram below. A light ray strikes a mirror at an angle of 40 degrees to the normal line. According to the Law of Reflection, what will the angle of the reflected ray be?",
      inlineSvg: DIAGRAMS.ASSESSMENT_REFLECTION_40,
      options: [
        { val: "A", text: "A. 20 degrees" },
        { val: "B", text: "B. 40 degrees" },
        { val: "C", text: "C. 50 degrees" },
        { val: "D", text: "D. 80 degrees" }
      ],
      correct: "B",
      expEn: "The Law of Reflection states that the angle of incidence is always equal to the angle of reflection. If the incoming ray is 40 degrees, the reflected ray must also be exactly 40 degrees.",
      expVn: "Định luật Phản xạ phát biểu rằng góc tới luôn bằng góc phản xạ. Nếu tia tới là 40 độ, tia phản xạ cũng phải chính xác là 40 độ."
    },
    {
      id: "q2_inline_refraction",
      type: "inline",
      title: "2. Complete the sentences to describe the process of refraction.",
      options: [],
      textParts: [
        "Light travels incredibly fast through the air. However, when it enters a glass block, it is moving into a denser ",
        ". This sudden change causes the light to ",
        " and bend ",
        " the normal line."
      ],
      blanks: {
        "1": {
          correct: "medium",
          options: [
            { val: "spectrum", text: "spectrum" },
            { val: "medium", text: "medium" },
            { val: "filter", text: "filter" }
          ]
        },
        "2": {
          correct: "slow down",
          options: [
            { val: "speed up", text: "speed up" },
            { val: "slow down", text: "slow down" }
          ]
        },
        "3": {
          correct: "towards",
          options: [
            { val: "towards", text: "towards" },
            { val: "away from", text: "away from" }
          ]
        }
      },
      expEn: "A medium is any substance light travels through. Dense mediums like glass cause light to slow down, which makes the ray bend inwards towards the normal line.",
      expVn: "Môi trường là bất kỳ chất nào ánh sáng truyền qua. Các môi trường đặc như thủy tinh làm cho ánh sáng chậm lại, khiến tia sáng uốn cong hướng vào trong về phía đường pháp tuyến."
    },
    {
      id: "q3_mcq_density_inference",
      type: "mcq",
      title: "3. Analyze the diagram. A ray of light is travelling from Medium A into Medium B. Based on the way the light bends, what can you infer about the two mediums?",
      inlineSvg: DIAGRAMS.ASSESSMENT_DENSITY_INFERENCE,
      options: [
        { val: "A", text: "A. Medium B is denser than Medium A." },
        { val: "B", text: "B. Medium A is denser than Medium B." },
        { val: "C", text: "C. Both mediums have the exact same density." },
        { val: "D", text: "D. The light is slowing down in Medium B." }
      ],
      correct: "B",
      expEn: "The light ray is bending AWAY from the normal line. This only happens when light speeds up. Therefore, it must be moving from a denser medium (Medium A) into a less dense medium (Medium B).",
      expVn: "Tia sáng đang uốn cong RA XA đường pháp tuyến. Điều này chỉ xảy ra khi ánh sáng tăng tốc. Do đó, nó phải đang di chuyển từ một môi trường đặc hơn (Môi trường A) sang một môi trường ít đặc hơn (Môi trường B)."
    },
    {
      id: "q4_mcq_dispersion",
      type: "mcq",
      title: "4. A triangular glass prism can be used to reveal the hidden colours inside white light. What is the scientific name for this splitting process?",
      options: [
        { val: "A", text: "A. Reflection" },
        { val: "B", text: "B. Refraction" },
        { val: "C", text: "C. Dispersion" },
        { val: "D", text: "D. Addition" }
      ],
      correct: "C",
      expEn: "Dispersion is the specific process where white light is split into its continuous spectrum of colours because each colour slows down by a different amount inside the prism.",
      expVn: "Tán sắc là quá trình cụ thể trong đó ánh sáng trắng bị tách thành quang phổ màu liên tục vì mỗi màu chậm lại với một lượng khác nhau bên trong lăng kính."
    },
    {
      id: "q5_order_spectrum",
      type: "order",
      title: "5. Drag the colours of the visible spectrum into their correct order, starting from the colour that bends the LEAST at the top, to the colour that bends the MOST at the bottom.",
      options: [],
      bank: [
        { id: "c1", val: "Red", text: "Red" },
        { id: "c2", val: "Orange", text: "Orange" },
        { id: "c3", val: "Yellow", text: "Yellow" },
        { id: "c4", val: "Green", text: "Green" },
        { id: "c5", val: "Blue", text: "Blue" },
        { id: "c6", val: "Indigo", text: "Indigo" },
        { id: "c7", val: "Violet", text: "Violet" }
      ],
      targets: [
        { id: "spectrum", title: "Order of the Spectrum" }
      ],
      correctSets: {
        "spectrum": ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
      },
      expEn: "Red light slows down the least, so it stays at the top. Violet light slows down the most, pulling it to the bottom. The acronym to remember this is ROYGBIV.",
      expVn: "Ánh sáng đỏ chậm lại ít nhất, nên nó ở trên cùng. Ánh sáng tím chậm lại nhiều nhất, kéo nó xuống dưới cùng. Từ viết tắt để nhớ điều này là ROYGBIV."
    },
    {
      id: "q6_dnd_secondary_colours",
      type: "dnd",
      title: "6. Mixing coloured light creates bright new colours. Drag the Primary Colours into the targets to mathematically create the correct Secondary Colours.",
      options: [],
      bank: [
        { id: "r1", val: "Red", text: "Red" },
        { id: "r2", val: "Red", text: "Red" },
        { id: "g1", val: "Green", text: "Green" },
        { id: "g2", val: "Green", text: "Green" },
        { id: "b1", val: "Blue", text: "Blue" },
        { id: "b2", val: "Blue", text: "Blue" }
      ],
      targets: [
        { id: "yellow", title: "Make Yellow" },
        { id: "cyan", title: "Make Cyan" },
        { id: "magenta", title: "Make Magenta" }
      ],
      correctSets: {
        "yellow": ["Red", "Green"],
        "cyan": ["Green", "Blue"],
        "magenta": ["Red", "Blue"]
      },
      expEn: "Yellow is made from Red + Green. Cyan is made from Green + Blue. Magenta is made from Red + Blue. These combinations are the foundation of all digital screens.",
      expVn: "Màu Vàng được tạo ra từ Đỏ + Lục. Màu Xanh lơ (Cyan) được tạo ra từ Lục + Lam. Màu Đỏ thắm (Magenta) được tạo ra từ Đỏ + Lam. Những sự kết hợp này là nền tảng của tất cả các màn hình kỹ thuật số."
    },
    {
      id: "q7_inline_white_light",
      type: "inline",
      title: "7. Complete the statement regarding the primary colours of light.",
      options: [],
      textParts: [
        "If you shine all three primary colours of light (Red, Green, and Blue) at the exact same spot on a dark wall, the overlapping colours will mathematically combine to create pure ",
        " light."
      ],
      blanks: {
        "1": {
          correct: "White",
          options: [
            { val: "Black", text: "Black" },
            { val: "Brown", text: "Brown" },
            { val: "White", text: "White" }
          ]
        }
      },
      expEn: "Unlike paint which turns brown or black when mixed, adding all three primary colours of light together recreates pure white light.",
      expVn: "Không giống như sơn sẽ chuyển sang màu nâu hoặc đen khi trộn lẫn, việc cộng cả ba màu cơ bản của ánh sáng lại với nhau sẽ tái tạo lại ánh sáng trắng tinh khiết."
    },
    {
      id: "q8_inline_filters",
      type: "inline",
      title: "8. A scientist shines white light at a piece of coloured plastic. Complete the sentence to explain how it works.",
      options: [],
      textParts: [
        "A Colour Filter does not dye the light. Instead, a Blue filter will ",
        " the red and green light, and only allow the blue light to ",
        " to the other side."
      ],
      blanks: {
        "1": {
          correct: "absorb",
          options: [
            { val: "absorb", text: "absorb" },
            { val: "reflect", text: "reflect" }
          ]
        },
        "2": {
          correct: "pass through",
          options: [
            { val: "pass through", text: "pass through" },
            { val: "disperse", text: "disperse" }
          ]
        }
      },
      expEn: "Filters work by subtraction. They absorb the unwanted colours (turning that energy into heat) and only let their own colour pass through.",
      expVn: "Kính lọc hoạt động bằng phép trừ. Chúng hấp thụ những màu không mong muốn (biến năng lượng đó thành nhiệt) và chỉ cho phép màu của chính chúng đi qua."
    },
    {
      id: "q9_mcq_double_filter",
      type: "mcq",
      title: "9. Look at the experiment below. White light is shone through a Red Filter, and then immediately through a Green Filter. What will appear on the final screen?",
      inlineSvg: DIAGRAMS.FILTER_DOUBLE_EXPERIMENT,
      options: [
        { val: "A", text: "A. Red Light" },
        { val: "B", text: "B. Green Light" },
        { val: "C", text: "C. Yellow Light" },
        { val: "D", text: "D. No Light (Black)" }
      ],
      correct: "D",
      expEn: "The red filter lets only red light pass. When that pure red light hits the green filter, the green filter absorbs it completely. Since no light makes it through, the screen is dark (black).",
      expVn: "Kính lọc đỏ chỉ cho ánh sáng đỏ đi qua. Khi ánh sáng đỏ tinh khiết đó chạm vào kính lọc lục, kính lọc lục sẽ hấp thụ nó hoàn toàn. Vì không có ánh sáng nào lọt qua, màn hình sẽ tối (đen)."
    },
    {
      id: "q10_inline_summary",
      type: "inline",
      title: "10. Read the scenario and select the correct scientific terms to complete the summary.",
      options: [],
      textParts: [
        "A student points a laser beam at a flat mirror. The beam bounces off, demonstrating the law of ",
        ". The beam then travels through the air and enters a thick block of water. This new ",
        " causes the laser to slow down and bend. Finally, the laser hits a blue plastic sheet which acts as a ",
        ", absorbing the unwanted colours."
      ],
      blanks: {
        "1": {
          correct: "reflection",
          options: [
            { val: "reflection", text: "reflection" },
            { val: "dispersion", text: "dispersion" }
          ]
        },
        "2": {
          correct: "medium",
          options: [
            { val: "spectrum", text: "spectrum" },
            { val: "medium", text: "medium" }
          ]
        },
        "3": {
          correct: "filter",
          options: [
            { val: "prism", text: "prism" },
            { val: "filter", text: "filter" }
          ]
        }
      },
      expEn: "Bouncing off a mirror is reflection. Moving into water means entering a new medium (causing refraction). A coloured plastic sheet is a filter.",
      expVn: "Bật ra khỏi gương là sự phản xạ. Đi vào nước có nghĩa là đi vào một môi trường mới (gây ra sự khúc xạ). Một tấm nhựa màu là một kính lọc."
    }
  ]
};