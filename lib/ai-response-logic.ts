// /lib/ai-response-logic.ts

// --- ĐỊNH NGHĨA CÁC Ý ĐỊNH NGƯỜI DÙNG (PHIÊN BẢN MỚI) ---
type Intent =
  | 'GREETING'
  | 'ABOUT_PROJECT_SUMMARY'     // Tóm tắt về dự án
  | 'ASK_MISSION'             // Hỏi về sứ mệnh & mô hình 3 chân kiềng
  | 'ASK_PILLAR_1'            // Hỏi sâu về Chân kiềng 1: Tư duy Hệ thống
  | 'ASK_PILLAR_2'            // Hỏi sâu về Chân kiềng 2: Giao tiếp
  | 'ASK_PILLAR_3'            // Hỏi sâu về Chân kiềng 3: Tự học
  | 'ASK_FEATURES'            // Hỏi về các tính năng (đánh giá, báo cáo...)
  | 'ASK_ROADMAP'             // Hỏi về lộ trình phát triển
  | 'ASK_TEAM'                // Hỏi về đội ngũ
  | 'ASK_TECH_STACK'          // Hỏi về công nghệ sử dụng
  | 'HOW_TO_JOIN'             // Hỏi cách tham gia, đóng góp
  | 'THANKS'
  | 'UNKNOWN';

// --- KHO NỘI DUNG PHẢN HỒI (ĐƯỢC NÂNG CẤP TOÀN DIỆN) ---
const responses: Record<Intent, string[]> = {
  GREETING: [
    "Xin chào! Tôi là ThinkBot. Sẵn sàng cùng bạn tái định nghĩa năng lực trong Kỷ nguyên Số chưa? 🚀",
    "Chào bạn! ThinkShift đây. Bạn muốn khám phá cách biến tư duy thành lợi thế cạnh tranh lớn nhất của mình chứ?",
    "Hello! Tôi là trợ lý AI từ ThinkShift. Hãy hỏi tôi bất cứ điều gì về Mô hình 3 Chân Kiềng hoặc các năng lực cốt lõi của tương lai nhé! 🧠",
  ],

  ABOUT_PROJECT_SUMMARY: [
    "ThinkShift Vietnam là một công trình nghiên cứu và phát triển sự nghiệp. Chúng tôi xây dựng một 'la bàn tư duy' để giải quyết nghịch lý giữa giáo dục và thị trường lao động thực chiến. 🎯",
    "Nói đơn giản, ThinkShift giúp bạn trả lời câu hỏi: 'Trong thời đại AI, năng lực nào mới thực sự là cốt lõi?'. Chúng tôi làm điều đó qua một hệ sinh thái sản phẩm công nghệ.",
  ],

  ASK_MISSION: [
    "Sứ mệnh của ThinkShift là giúp người trẻ xây dựng bộ kỹ năng không bao giờ lỗi thời, dựa trên Mô hình 3 Chân Kiềng: \n1. Tư duy Hệ thống & Sản phẩm 🏛️\n2. Giao tiếp & Dịch chuyển Ngữ cảnh 🌐\n3. Siêu năng lực Tự học & Thích ứng 🚀",
    "Chúng tôi tin rằng giá trị thật không nằm ở tấm bằng, mà ở cách tư duy. Vì vậy, ThinkShift tập trung vào việc rèn luyện 3 năng lực cốt lõi: Tư duy hệ thống, Giao tiếp chuyển đổi và Khả năng tự học.",
  ],

  ASK_PILLAR_1: [
    "🏛️ Tư duy Hệ thống & Sản phẩm là khả năng nhìn thấy 'cả khu rừng chứ không chỉ từng cái cây'. Nó giúp bạn hiểu công việc của mình đóng góp vào đâu trong một bức tranh lớn, từ đó đưa ra quyết định tốt hơn.",
  ],
  
  ASK_PILLAR_2: [
    "🌐 Giao tiếp & Dịch chuyển Ngữ cảnh là năng lực 'phiên dịch' giữa các thế giới khác nhau: giữa business, tech và người dùng. Đây là kỹ năng kết nối, tạo ra sự đồng thuận và thúc đẩy dự án tiến lên.",
  ],

  ASK_PILLAR_3: [
    "🚀 Siêu năng lực Tự học & Thích ứng là khả năng 'học cách học'. Trong một thế giới biến đổi liên tục, nó giúp bạn biến việc học thành một hệ thống cá nhân để không ngừng nâng cấp bản thân.",
  ],
  
  ASK_FEATURES: [
    "ThinkShift có một hệ sinh thái các tính năng độc đáo:\n- Bài đánh giá gamified 🎮: Trải nghiệm tương tác như một ngày làm việc thực tế.\n- Báo cáo năng lực cá nhân hoá 📊: Biểu đồ radar thể hiện điểm mạnh/yếu theo 3 chân kiềng.\n- Dashboard dữ liệu 📈: So sánh góc nhìn của bạn với cộng đồng.\n- Blog Tri thức ✍️: Các phân tích chuyên sâu và case study thực tế.",
  ],

  ASK_ROADMAP: [
    "Lộ trình của ThinkShift có 3 giai đoạn rõ ràng:\n- GĐ 1: Ra mắt nền tảng đánh giá và blog.\n- GĐ 2: Xây dựng cộng đồng và các sự kiện chia sẻ.\n- GĐ 3: Phát triển nền tảng kết nối Mentor-Mentee và các mini-courses chuyên sâu. 🗺️",
  ],

  ASK_TEAM: [
    "Dự án được đồng sáng lập bởi:\n- Quách Thành Long : Người kiến tạo nền tảng công nghệ, kết hợp tư duy Kỹ thuật và Kinh doanh.\n- Quách Thành Long (Data & Research Lead): Người chịu trách nhiệm về phân tích dữ liệu và thiết kế khảo sát.",
  ],

  ASK_TECH_STACK: [
    "Chúng tôi tự hào xây dựng ThinkShift trên một nền tảng công nghệ hiện đại:\n- Framework: Next.js 14\n- Backend/DB: Supabase\n- UI: Tailwind CSS & ShadCN UI\n- Animation: Framer Motion\nBạn có muốn biết thêm chi tiết nào không? 🤓",
  ],

  HOW_TO_JOIN: [
    "Tuyệt vời! Cách tốt nhất để tham gia hiện tại là trải nghiệm Bài đánh giá năng lực của chúng tôi. Mỗi đóng góp của bạn đều giúp ThinkShift hiểu rõ hơn về thế hệ trẻ Việt Nam. 💪",
    "Chúng tôi luôn chào đón những cộng sự chung tầm nhìn. Bạn có thể kết nối và trao đổi ý tưởng với đội ngũ qua email: `stephensouth1307@gmail.com` 📧.",
  ],

  THANKS: [
    "Rất vui được giúp bạn! Nếu có bất cứ câu hỏi nào về năng lực lõi, đừng ngần ngại hỏi nhé. 😊",
    "Không có chi! Nhiệm vụ của tôi là giúp bạn hiểu rõ hơn về la bàn tư duy của ThinkShift. 🚀",
  ],

  UNKNOWN: [
    "Câu hỏi này khá thú vị! Tôi sẽ ghi nhận lại để học hỏi thêm. Hiện tại, bạn có muốn tìm hiểu về Mô hình 3 Chân Kiềng hay các tính năng của ThinkShift không?",
    "Hmm, có vẻ như câu hỏi này ngoài phạm vi kiến thức hiện tại của tôi. Bạn có thể hỏi về lộ trình phát triển hoặc công nghệ mà dự án đang sử dụng không? 🤔",
  ],
};

// --- BỘ TỪ KHÓA ĐỂ PHÂN LOẠI Ý ĐỊNH (CẬP NHẬT) ---
const intentKeywords: Record<Intent, string[]> = {
  GREETING: ['chào', 'hello', 'hi', 'xin chào', 'yo'],
  ABOUT_PROJECT_SUMMARY: ['thinkshift', 'dự án', 'về cái gì', 'giới thiệu'],
  ASK_MISSION: ['sứ mệnh', 'mục tiêu', 'giải quyết', 'mô hình', '3 chân kiềng', 'ba chân kiềng'],
  ASK_PILLAR_1: ['tư duy hệ thống', 'tư duy sản phẩm', 'chân kiềng 1', 'cột 1'],
  ASK_PILLAR_2: ['giao tiếp', 'dịch chuyển ngữ cảnh', 'chân kiềng 2', 'cột 2'],
  ASK_PILLAR_3: ['tự học', 'thích ứng', 'siêu năng lực', 'chân kiềng 3', 'cột 3'],
  ASK_FEATURES: ['tính năng', 'có gì', 'đánh giá', 'báo cáo', 'dashboard', 'blog'],
  ASK_ROADMAP: ['lộ trình', 'kế hoạch', 'tương lai', 'roadmap'],
  ASK_TEAM: ['đội ngũ', 'ai làm', 'founder', 'sáng lập', 'thành long', 'nam thuận'],
  ASK_TECH_STACK: ['công nghệ', 'tech stack', 'ngôn ngữ', 'framework', 'nextjs', 'supabase'],
  HOW_TO_JOIN: ['tham gia', 'đóng góp', 'hợp tác', 'liên hệ', 'làm sao để'],
  THANKS: ['cảm ơn', 'thanks', 'thank you', 'tuyệt vời', 'hay quá'],
  UNKNOWN: [],
};

// --- GỢI Ý CÂU HỎI TIẾP THEO (CHIẾN LƯỢC HƠN) ---
const followUpSuggestions: Partial<Record<Intent, string[]>> = {
  GREETING: ["Bạn có thể hỏi: 'Sứ mệnh của ThinkShift là gì?'"],
  ABOUT_PROJECT_SUMMARY: ["Bạn có muốn tìm hiểu về 'Mô hình 3 Chân Kiềng' không?"],
  ASK_MISSION: ["Bạn muốn tìm hiểu sâu hơn về chân kiềng 'Tư duy Hệ thống' chứ?"],
  ASK_PILLAR_1: ["Bạn có muốn biết về tính năng 'Bài đánh giá gamified' không?"],
  ASK_FEATURES: ["Bạn có muốn biết 'Lộ trình phát triển' của dự án?"],
  ASK_ROADMAP: ["Bạn có muốn hỏi về 'cách tham gia' dự án không?"],
};

// --- HÀM LOGIC TRUNG TÂM (TỐI ƯU THỨ TỰ ƯU TIÊN) ---
function getIntent(message: string): Intent {
  const lowerMessage = message.toLowerCase();
  
  // Ưu tiên các intent cụ thể, chi tiết trước
  const intentPriority: Intent[] = [
    'ASK_PILLAR_1', 'ASK_PILLAR_2', 'ASK_PILLAR_3', 'ASK_MISSION',
    'ASK_TECH_STACK', 'ASK_FEATURES', 'ASK_ROADMAP', 'ASK_TEAM', 'HOW_TO_JOIN',
    'ABOUT_PROJECT_SUMMARY', 'GREETING', 'THANKS'
  ];

  for (const intent of intentPriority) {
    const keywords = intentKeywords[intent];
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return intent;
    }
  }

  return 'UNKNOWN';
}

// --- HÀM TRẢ VỀ PHẢN HỒI HOÀN CHỈNH ---
export function getAIResponse(userMessage: string): string {
  const intent = getIntent(userMessage);
  const possibleResponses = responses[intent];
  let reply = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

  // Gợi ý thêm nếu có
  const suggestions = followUpSuggestions[intent];
  if (suggestions && suggestions.length > 0) {
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    // Thêm một dòng mới để gợi ý trông rõ ràng hơn
    reply += `\n\n*👉 Thử hỏi tiếp: "${suggestion}"`;
  }

  return reply;
}