// src/data/Y9/Math_2A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Solids, Volume & Surface Area",
    titleVn: "Hình khối, Thể tích & Diện tích bề mặt",
    subtitle: "Objective: Master the properties of prisms, calculate volume and surface area, and analyze fractional parts of 3D solids.",
    subtitleVn: "Mục tiêu: Nắm vững các tính chất của hình lăng trụ, tính toán thể tích, diện tích bề mặt và phân tích các phần phân số của hình khối 3D.",
    color: "bg-[#8b5cf6]", 
    borderColor: "border-[#7c3aed]",
  },
  {
    type: "concept",
    title: "Anatomy of a Solid",
    titleVn: "Cấu tạo của một Hình khối",
    icon: "Target",
    color: "bg-[#1cb0f6]",
    content: "A 3D **Solid** is a geometric shape that occupies physical space. To describe solids accurately, we use three specific Cambridge terms:\n\n> **Face:** A flat 2D surface on the outside of a solid.\n> **Edge:** The straight line segment where two faces meet.\n> **Vertex:** The sharp corner point where three or more edges intersect (plural: vertices).",
    contentVn: "**Hình khối** 3D là một hình học chiếm không gian vật lý. Để mô tả hình khối chính xác, chúng chúng ta sử dụng ba thuật ngữ Cambridge cụ thể:\n\n> **Mặt (Face):** Một bề mặt phẳng 2D ở bên ngoài của hình khối.\n> **Cạnh (Edge):** Đoạn thẳng nơi hai mặt gặp nhau.\n> **Đỉnh (Vertex):** Điểm góc nhọn nơi ba cạnh trở lên giao nhau (số nhiều: vertices).",
    example: "A standard cube has 6 flat faces, 12 straight edges, and 8 sharp vertices.",
    exampleVn: "Một hình lập phương tiêu chuẩn có 6 mặt phẳng, 12 cạnh thẳng và 8 đỉnh nhọn.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <defs>
        <marker id="arrowFace" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#059669" /></marker>
        <marker id="arrowEdge" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#ea580c" /></marker>
        <marker id="arrowVertex" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#2563eb" /></marker>
      </defs>
      
      <path d="M 130 170 L 170 130" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <path d="M 170 130 L 250 130" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <path d="M 170 130 L 170 50" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      
      <path d="M 210 170 L 250 130 L 250 50 L 210 90 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M 130 90 L 210 90 L 250 50 L 170 50 Z" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 130 170 L 210 170 L 210 90 L 130 90 Z" fill="#d1fae5" stroke="#10b981" stroke-width="2" stroke-linejoin="round"/>
      
      <path d="M 210 170 L 250 130" fill="none" stroke="#f97316" stroke-width="3" stroke-linecap="round"/>
      
      <circle cx="130" cy="170" r="4.5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5"/>
      
      <path d="M 280 70 L 200 110" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrowFace)"/>
      <text x="290" y="75" font-family="sans-serif" font-weight="600" font-size="14" fill="#059669">Face</text>
      
      <path d="M 290 180 L 235 155" fill="none" stroke="#ea580c" stroke-width="1.5" marker-end="url(#arrowEdge)"/>
      <text x="300" y="185" font-family="sans-serif" font-weight="600" font-size="14" fill="#ea580c">Edge</text>
      
      <path d="M 60 210 L 120 175" fill="none" stroke="#2563eb" stroke-width="1.5" marker-end="url(#arrowVertex)"/>
      <text x="50" y="215" font-family="sans-serif" font-weight="600" font-size="14" fill="#2563eb" text-anchor="end">Vertex</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "What is a Prism?",
    titleVn: "Hình lăng trụ là gì?",
    icon: "BookOpen",
    color: "bg-[#f59e0b]",
    content: "A **Prism** is a special type of 3D solid that has two identical, parallel ends.\n\n> **The Bases:** The two identical faces at opposite ends of the prism. The shape of these bases gives the prism its name.\n> **The Lateral Faces:** The flat sides connecting the two bases. In a standard prism, these connecting faces are always rectangles.",
    contentVn: "**Hình lăng trụ** là một loại hình khối 3D đặc biệt có hai đầu giống hệt nhau và song song.\n\n> **Các Đáy (Bases):** Hai mặt giống hệt nhau ở hai đầu đối diện của hình lăng trụ. Hình dạng của các đáy này quyết định tên của hình lăng trụ.\n> **Các Mặt bên (Lateral Faces):** Các mặt phẳng kết nối hai đáy. Trong một hình lăng trụ tiêu chuẩn, các mặt kết nối này luôn là hình chữ nhật.",
    example: "Look at the triangular prism below. The two identical triangles are the 'Bases', even if the prism is lying flat on one of its rectangular 'Lateral Faces'.",
    exampleVn: "Hãy nhìn vào hình lăng trụ tam giác bên dưới. Hai hình tam giác giống hệt nhau là 'Các Đáy', ngay cả khi hình lăng trụ nằm phẳng trên một trong các 'Mặt bên' hình chữ nhật của nó.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <defs>
        <marker id="arrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#d97706" /></marker>
        <marker id="arrowSlate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#64748b" /></marker>
      </defs>
      
      <path d="M 120 160 L 200 110" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <path d="M 200 160 L 280 110" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      
      <path d="M 200 110 L 280 110 L 240 30 Z" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 160 80 L 240 30 L 280 110 L 200 160 Z" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 120 160 L 200 160 L 160 80 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>
      
      <path d="M 80 80 L 145 115" fill="none" stroke="#d97706" stroke-width="1.5" marker-end="url(#arrowAmber)"/>
      <text x="70" y="80" font-family="sans-serif" font-weight="600" font-size="14" fill="#d97706" text-anchor="end">Identical Base 1</text>
      
      <path d="M 330 60 L 255 75" fill="none" stroke="#d97706" stroke-width="1.5" marker-end="url(#arrowAmber)"/>
      <text x="340" y="60" font-family="sans-serif" font-weight="600" font-size="14" fill="#d97706">Identical Base 2</text>
      
      <path d="M 280 190 L 230 130" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrowSlate)"/>
      <text x="290" y="200" font-family="sans-serif" font-weight="600" font-size="14" fill="#64748b">Lateral Face</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Types of Prisms",
    titleVn: "Các loại Hình lăng trụ",
    icon: "Target",
    color: "bg-[#ec4899]",
    content: "Because the rectangular sides always look similar, we classify and name every prism strictly by the shape of its two bases.\n\n> **Rectangular Prism:** Bases are rectangles (often looks like a standard box).\n> **Triangular Prism:** Bases are triangles (looks like a tent).\n> **Hexagonal Prism:** Bases are 6-sided hexagons (looks like a honeycomb cell).",
    contentVn: "Vì các mặt bên hình chữ nhật luôn trông giống nhau, chúng ta phân loại và đặt tên cho mỗi hình lăng trụ hoàn toàn dựa trên hình dạng của hai đáy của nó.\n\n> **Hình lăng trụ chữ nhật:** Đáy là hình chữ nhật (thường trông giống như một cái hộp).\n> **Hình lăng trụ tam giác:** Đáy là hình tam giác (trông giống như một cái lều).\n> **Hình lăng trụ lục giác:** Đáy là hình lục giác 6 cạnh (trông giống như một ô tổ ong).",
    example: "Notice how the yellow 'Base' faces change shape, but the grey rectangular 'Lateral' faces are always present to connect them.",
    exampleVn: "Lưu ý cách các mặt 'Đáy' màu vàng thay đổi hình dạng, nhưng các mặt 'Bên' hình chữ nhật màu xám luôn hiện diện để kết nối chúng.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <g transform="translate(10, 40)">
        <path d="M 40 100 L 70 115 L 70 175 L 40 160 Z" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M 70 115 L 100 100 L 100 160 L 70 175 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M 40 100 L 70 85 L 100 100 L 70 115 Z" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round"/>
        <text x="70" y="195" font-family="sans-serif" font-weight="600" font-size="13" fill="#64748b" text-anchor="middle">Rectangular</text>
      </g>

      <g transform="translate(140, 40)">
        <path d="M 40 175 L 65 150 L 115 150" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 65 150 L 90 80" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
        <path d="M 90 175 L 65 105 L 90 80 L 115 150 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M 40 175 L 90 175 L 65 105 Z" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round"/>
        <text x="70" y="195" font-family="sans-serif" font-weight="600" font-size="13" fill="#64748b" text-anchor="middle">Triangular</text>
      </g>

      <g transform="translate(260, 40)">
        <path d="M 35 110 L 20 95 L 20 155 L 35 170 Z" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M 35 110 L 65 110 L 65 170 L 35 170 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M 65 110 L 80 95 L 80 155 L 65 170 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M 20 95 L 35 80 L 65 80 L 80 95 L 65 110 L 35 110 Z" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round"/>
        <text x="50" y="195" font-family="sans-serif" font-weight="600" font-size="13" fill="#64748b" text-anchor="middle">Hexagonal</text>
      </g>
    </svg>`,
  },
  {
    type: "concept",
    title: "Understanding Cross-Sections",
    titleVn: "Hiểu về Mặt cắt ngang",
    icon: "Target",
    color: "bg-[#10b981]",
    content: "Because the two bases are identical, a prism keeps the exact same shape all the way through its length. \n\n> This repeating internal shape is called the **Cross-section**.\n> Imagine a loaf of bread. If it is a perfect prism, every single slice you cut will yield the exact same shaped piece of bread.",
    contentVn: "Vì hai đáy giống hệt nhau, một hình lăng trụ giữ nguyên hình dạng chính xác xuyên suốt chiều dài của nó.\n\n> Hình dạng lặp lại bên trong này được gọi là **Mặt cắt ngang**.\n> Hãy tưởng tượng một ổ bánh mì. Nếu nó là một hình lăng trụ hoàn hảo, mỗi lát bạn cắt sẽ cho ra một miếng bánh mì có hình dạng giống hệt nhau.",
    example: "If you slice a triangular prism horizontally or vertically, the cross-section changes. But if you slice it parallel to the base, the cross-section is the exact same triangle.",
    exampleVn: "Nếu bạn cắt hình lăng trụ tam giác theo chiều ngang hoặc dọc, mặt cắt ngang sẽ thay đổi. Nhưng nếu bạn cắt song song với đáy, mặt cắt ngang là một hình tam giác giống hệt.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 200 120 L 300 120 L 250 30 Z" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="4,4"/>
      
      <path d="M 100 170 L 200 120" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 200 170 L 300 120" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 150 80 L 250 30" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
      
      <path d="M 100 170 L 200 170 L 150 80 Z" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 110 200 L 310 200 L 270 10 L 70 10 Z" fill="#10b981" opacity="0.1" stroke="#10b981" stroke-width="1"/>
      
      <path d="M 150 145 L 250 145 L 200 55 Z" fill="#d1fae5" stroke="#059669" stroke-width="2.5" stroke-linejoin="round"/>
      
      <text x="210" y="230" font-family="sans-serif" font-weight="600" font-size="14" fill="#047857" text-anchor="middle">Uniform Cross-section</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Calculating Volume",
    titleVn: "Tính toán Thể tích",
    icon: "Scale",
    color: "bg-[#3b82f6]",
    content: "Because a prism is perfectly uniform, calculating its **Volume** (the total amount of 3D space inside) relies on one simple mathematical formula.\n\n> Volume = Area of Cross-section × Length\n> Step 1: Calculate the 2D Area of the base face.\n> Step 2: Multiply that area by how far back the shape stretches.",
    contentVn: "Bởi vì hình lăng trụ hoàn toàn đồng nhất, việc tính toán **Thể tích** của nó (tổng lượng không gian 3D bên trong) dựa trên một công thức toán học đơn giản.\n\n> Thể tích = Diện tích mặt cắt ngang × Chiều dài\n> Bước 1: Tính Diện tích 2D của mặt đáy.\n> Bước 2: Nhân diện tích đó với khoảng cách mà hình khối kéo dài ra phía sau.",
    example: "If the front triangular face has an area of 15 cm², and the prism is 10 cm long, the Volume is 15 × 10 = 150 cm³.",
    exampleVn: "Nếu mặt tam giác phía trước có diện tích là 15 cm² và hình lăng trụ dài 10 cm, Thể tích là 15 × 10 = 150 cm³.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <defs>
        <marker id="dimArrowStart" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 10 1 L 2 5 L 10 9 Z" fill="#64748b" /></marker>
        <marker id="dimArrowEnd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#64748b" /></marker>
      </defs>
      
      <path d="M 200 120 L 300 120 L 250 30 Z" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 100 170 L 200 120" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 200 170 L 300 120" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 150 80 L 250 30" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
      
      <path d="M 100 170 L 200 170 L 150 80 Z" fill="#e0f2fe" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
      <text x="150" y="145" font-family="sans-serif" font-weight="700" font-size="16" fill="#1d4ed8" text-anchor="middle">15 cm²</text>
      
      <path d="M 190 200 L 290 150" fill="none" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArrowStart)" marker-end="url(#dimArrowEnd)"/>
      <text x="255" y="195" font-family="sans-serif" font-weight="600" font-size="14" fill="#475569" text-anchor="middle">Length = 10 cm</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "What is Surface Area?",
    titleVn: "Diện tích bề mặt là gì?",
    icon: "ShieldCheck",
    color: "bg-[#8b5cf6]",
    content: "The **Total Surface Area** is entirely different from Volume. Instead of calculating the space inside, we only care about the flat faces on the outside.\n\n> Imagine wrapping the entire solid perfectly in wrapping paper. How much paper do you need?\n> To find out, you calculate the 2D area of **every single face** on the outside, and add them all together.",
    contentVn: "**Tổng Diện tích bề mặt** hoàn toàn khác với Thể tích. Thay vì tính toán không gian bên trong, chúng ta chỉ quan tâm đến các mặt phẳng ở bên ngoài.\n\n> Hãy tưởng tượng bọc toàn bộ hình khối hoàn hảo bằng giấy gói. Bạn cần bao nhiêu giấy?\n> Để tìm ra, bạn tính diện tích 2D của **từng mặt riêng lẻ** ở bên ngoài, và cộng tất cả chúng lại với nhau.",
    example: "A triangular prism has 5 faces. You must calculate the area of the 2 triangles, and the area of the 3 rectangles, then find the total sum.",
    exampleVn: "Một hình lăng trụ tam giác có 5 mặt. Bạn phải tính diện tích của 2 hình tam giác, và diện tích của 3 hình chữ nhật, sau đó tìm tổng số.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <defs>
        <marker id="arrowPurple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 8 5 L 0 9 Z" fill="#7c3aed" /></marker>
      </defs>

      <path d="M 210 130 L 290 130 L 250 50 Z" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,4" stroke-linejoin="round"/>
      <path d="M 130 170 L 210 130" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <path d="M 130 170 L 210 170 L 290 130 Z" fill="#f5f3ff" stroke="#a78bfa" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 170 90 L 250 50 L 290 130 L 210 170 Z" fill="#ddd6fe" stroke="#8b5cf6" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 130 170 L 210 170 L 170 90 Z" fill="#c4b5fd" stroke="#7c3aed" stroke-width="2" stroke-linejoin="round"/>
      
      <path d="M 150 140 L 90 140" fill="none" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrowPurple)"/>
      <text x="80" y="145" font-family="sans-serif" font-weight="600" font-size="13" fill="#6d28d9" text-anchor="end">+ Front Triangle</text>
      
      <path d="M 250 110 L 310 90" fill="none" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrowPurple)"/>
      <text x="320" y="95" font-family="sans-serif" font-weight="600" font-size="13" fill="#6d28d9" text-anchor="start">+ Right Rectangle</text>
      
      <path d="M 150 110 L 100 60" fill="none" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrowPurple)"/>
      <text x="90" y="55" font-family="sans-serif" font-weight="600" font-size="13" fill="#6d28d9" text-anchor="end">+ Left Rectangle</text>

      <text x="210" y="225" font-family="sans-serif" font-weight="700" font-size="15" fill="#4c1d95" text-anchor="middle">Sum of all 5 faces = Surface Area</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Surface Area using Nets",
    titleVn: "Diện tích bề mặt sử dụng Hình khai triển",
    icon: "ShieldCheck",
    color: "bg-[#ec4899]",
    content: "Because 3D solids have hidden faces on the back and bottom, it is easy to make a mistake and forget to calculate one.\n\n> To prevent mistakes, we unfold the 3D solid into a flat 2D map called a **Net**.\n> By drawing the net, you can clearly see all 5 individual faces laid out flat.",
    contentVn: "Bởi vì hình khối 3D có các mặt bị ẩn ở phía sau và phía dưới, rất dễ mắc sai lầm và quên tính toán một mặt.\n\n> Để tránh sai sót, chúng ta mở hình khối 3D thành một bản đồ phẳng 2D được gọi là **Hình khai triển**.\n> Bằng cách vẽ hình khai triển, bạn có thể thấy rõ tất cả 5 mặt riêng lẻ trải phẳng.",
    example: "Look at the net below. The 3 rectangular sides are folded out horizontally, and the 2 triangular bases fold out to the top and bottom.",
    exampleVn: "Hãy nhìn vào hình khai triển bên dưới. 3 cạnh hình chữ nhật được gấp ra theo chiều ngang, và 2 đáy hình tam giác gấp ra trên và dưới.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="110" y="95" width="50" height="60" fill="#fdf2f8" stroke="#db2777" stroke-width="1.5" stroke-linejoin="round"/>
      <text x="135" y="129" font-family="sans-serif" font-weight="600" font-size="11" fill="#be185d" text-anchor="middle">Left</text>
      
      <rect x="160" y="95" width="80" height="60" fill="#fce7f3" stroke="#db2777" stroke-width="1.5" stroke-linejoin="round"/>
      <text x="200" y="129" font-family="sans-serif" font-weight="600" font-size="11" fill="#be185d" text-anchor="middle">Bottom</text>
      
      <rect x="240" y="95" width="50" height="60" fill="#fdf2f8" stroke="#db2777" stroke-width="1.5" stroke-linejoin="round"/>
      <text x="265" y="129" font-family="sans-serif" font-weight="600" font-size="11" fill="#be185d" text-anchor="middle">Right</text>
      
      <path d="M 160 95 L 240 95 L 200 35 Z" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5" stroke-linejoin="round"/>
      <text x="200" y="75" font-family="sans-serif" font-weight="600" font-size="11" fill="#3730a3" text-anchor="middle">Back</text>
      
      <path d="M 160 155 L 240 155 L 200 215 Z" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5" stroke-linejoin="round"/>
      <text x="200" y="185" font-family="sans-serif" font-weight="600" font-size="11" fill="#3730a3" text-anchor="middle">Front</text>
      
      <text x="330" y="115" font-family="sans-serif" font-weight="600" font-size="14" fill="#db2777" text-anchor="middle">3 Rectangles</text>
      <text x="330" y="145" font-family="sans-serif" font-weight="600" font-size="14" fill="#4f46e5" text-anchor="middle">2 Triangles</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Fraction of Surface Area",
    titleVn: "Phần Phân số của Diện tích bề mặt",
    icon: "MessageSquare",
    color: "bg-[#0ea5e9]",
    content: "Examiners will often ask you to calculate what **fraction** of the total surface area belongs to a specific category of faces (e.g., only the faces painted red).\n\n> 1. Calculate the Total Surface Area (this becomes your fraction's bottom denominator).\n> 2. Calculate the area of the specific target faces (this becomes your fraction's top numerator).\n> 3. Write it as a single fraction and simplify.",
    contentVn: "Các giám khảo thường sẽ yêu cầu bạn tính xem phần **phân số** nào của tổng diện tích bề mặt thuộc về một loại mặt cụ thể (ví dụ: chỉ các mặt được sơn màu đỏ).\n\n> 1. Tính Tổng Diện tích Bề mặt (đây trở thành mẫu số ở dưới của phân số).\n> 2. Tính diện tích của các mặt mục tiêu cụ thể (đây trở thành tử số ở trên của phân số).\n> 3. Viết nó thành một phân số duy nhất và rút gọn.",
    example: "In the next slide, we will look at a Cambridge exam-style question involving a square-based prism with painted faces.",
    exampleVn: "Trong slide tiếp theo, chúng ta sẽ xem xét một câu hỏi mang phong cách kỳ thi Cambridge liên quan đến một hình lăng trụ đáy vuông với các mặt được sơn.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="60" y="40" width="280" height="170" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
      
      <text x="200" y="90" font-family="sans-serif" font-weight="700" font-size="18" fill="#ef4444" text-anchor="middle">Area of Target Faces</text>
      <text x="200" y="110" font-family="sans-serif" font-weight="600" font-size="12" fill="#64748b" text-anchor="middle">(The Numerator)</text>
      
      <line x1="100" y1="125" x2="300" y2="125" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
      
      <text x="200" y="155" font-family="sans-serif" font-weight="700" font-size="18" fill="#0ea5e9" text-anchor="middle">Total Surface Area</text>
      <text x="200" y="175" font-family="sans-serif" font-weight="600" font-size="12" fill="#64748b" text-anchor="middle">(The Denominator)</text>
    </svg>`,
  },
  {
    type: "concept",
    title: "Exam Application: Painted Cuboid",
    titleVn: "Ứng dụng Bài thi: Hình hộp chữ nhật được sơn",
    icon: "Target",
    color: "bg-[#ef4444]",
    content: "The two square bases of this cuboid are painted **red**. The four rectangular lateral faces are painted **blue**. What fraction of the surface area is painted red?\n\n> **Step 1:** 2 Red Squares = 2 × (5 × 5) = 50 cm²\n> **Step 2:** 4 Blue Rectangles = 4 × (5 × 15) = 300 cm²\n> **Step 3:** Total Surface Area = 50 + 300 = 350 cm²",
    contentVn: "Hai đáy hình vuông của hình hộp chữ nhật này được sơn màu **đỏ**. Bốn mặt bên hình chữ nhật được sơn màu **xanh**. Phần phân số nào của diện tích bề mặt được sơn màu đỏ?\n\n> **Bước 1:** 2 Hình vuông Đỏ = 2 × (5 × 5) = 50 cm²\n> **Bước 2:** 4 Hình chữ nhật Xanh = 4 × (5 × 15) = 300 cm²\n> **Bước 3:** Tổng Diện tích bề mặt = 50 + 300 = 350 cm²",
    example: "Fraction = Red Area / Total Area = 50 / 350. \nBoth numbers divide evenly by 50, simplifying down to the final answer: 1 / 7.",
    exampleVn: "Phân số = Diện tích Đỏ / Tổng Diện tích = 50 / 350. \nCả hai số đều chia hết cho 50, rút gọn thành đáp án cuối cùng: 1 / 7.",
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <path d="M 70 150 L 190 90" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <path d="M 230 110 L 190 90" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <path d="M 190 90 L 190 50" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      
      <path d="M 110 130 L 70 110 L 190 50 L 230 70 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 110 170 L 230 110 L 230 70 L 110 130 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5" stroke-linejoin="round"/>
      
      <path d="M 110 170 L 70 150 L 70 110 L 110 130 Z" fill="#fecaca" stroke="#dc2626" stroke-width="2" stroke-linejoin="round"/>
      
      <text x="80" y="175" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="middle">5 cm</text>
      <text x="50" y="135" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="end">5 cm</text>
      <text x="180" y="155" font-family="sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="start">15 cm</text>
      
      <rect x="290" y="110" width="95" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="315" y="135" font-family="sans-serif" font-weight="700" font-size="16" fill="#ef4444" text-anchor="middle">50</text>
      <line x1="300" y1="145" x2="330" y2="145" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <text x="315" y="165" font-family="sans-serif" font-weight="700" font-size="16" fill="#0f172a" text-anchor="middle">350</text>
      
      <text x="345" y="150" font-family="sans-serif" font-weight="700" font-size="16" fill="#64748b" text-anchor="middle">=</text>
      
      <text x="365" y="135" font-family="sans-serif" font-weight="700" font-size="16" fill="#ef4444" text-anchor="middle">1</text>
      <line x1="355" y1="145" x2="375" y2="145" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <text x="365" y="165" font-family="sans-serif" font-weight="700" font-size="16" fill="#0f172a" text-anchor="middle">7</text>
    </svg>`,
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can now identify prisms, calculate volume, and analyze fractional surface areas.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn có thể nhận diện hình lăng trụ, tính toán thể tích và phân tích các diện tích bề mặt phân số.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]",
  }
];