// components/data/mockMessages.ts

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const GREETING_KEYWORDS = [
  "hi", "hello", "xin chào", "chào", "yo", "hallo", "hey"
];

export const GREETING_RESPONSES = [
  "Chào bạn 👋! Tôi là ThinkBot – trợ lý ảo biết tuốt nhưng không biết buồn. Bạn cần tôi hỗ trợ gì hôm nay?",
  "Hey hey 🤖! ThinkShift sẵn sàng đồng hành cùng bạn khai phá năng lực thời đại số!",
  "Xin chào! Tôi không phát bằng cấp, nhưng có thể giúp bạn định nghĩa lại năng lực 💡.",
  "Rất vui được gặp bạn 👨‍🏫! Hỏi gì cũng đừng ngại, tôi không có cảm xúc nhưng có rất nhiều kiến thức!",
  "Hiện tại tôi chưa biết nấu ăn 🍜, nhưng tư vấn định hướng nghề nghiệp thì vô đối!"
];
// components/data/mockMessages.ts (Phần mở rộng)

// --- DỮ LIỆU VỀ MỤC ĐÍCH & SỨ MỆNH ---
export const MISSION_KEYWORDS = [
  "thinkshift là gì", "mục đích", "sứ mệnh", "dự án này về cái gì", "làm gì", "about"
];

export const MISSION_RESPONSES = [
  "ThinkShift Vietnam là một dự án giúp bạn chuyển hóa từ tư duy đến hành động, kết nối kiến thức học đường với năng lực thực chiến. 🎯",
  "Chúng tôi là cầu nối giữa tấm bằng đại học và yêu cầu của nhà tuyển dụng. ThinkShift giúp bạn khám phá và rèn luyện năng lực cốt lõi để tự tin bước vào thị trường lao động. 🚀",
  "Nói đơn giản, ThinkShift là nơi tư duy gặp gỡ hành động. Chúng tôi tập trung vào việc giải quyết nghịch lý 'học một đằng, làm một nẻo' mà nhiều sinh viên đang gặp phải."
];

// --- DỮ LIỆU VỀ VẤN ĐỀ CỐT LÕI ---
export const PROBLEM_KEYWORDS = [
  "vấn đề", "nghịch lý", "giải quyết gì", "tại sao có dự án", "lỗi hệ thống"
];

export const PROBLEM_RESPONSES = [
  "ThinkShift ra đời để giải quyết một nghịch lý: Sinh viên có bằng giỏi nhưng vẫn hoang mang, còn nhà tuyển dụng thì mệt mỏi vì không tìm được người có 'năng lực thực chiến'. Chúng tôi gọi đó là một 'lỗi hệ thống'. 🧐",
  "Vấn đề chúng tôi muốn giải quyết là sự thiếu kết nối giữa kiến thức trong nhà trường và kỹ năng thực tế mà công việc yêu cầu. ThinkShift muốn lấp đầy khoảng trống đó. 🌉"
];

// --- DỮ LIỆU VỀ ĐỘI NGŨ SÁNG LẬP ---
export const FOUNDER_KEYWORDS = [
  "ai sáng lập", "founder", "đội ngũ", "người đứng đầu", "thành long", 
];

export const FOUNDER_RESPONSES = [
  "ThinkShift được đồng sáng lập bởi Quách Thành Long. Long đều có chung trăn trở về 'lỗi hệ thống' trong giáo dục và tuyển dụng hiện nay. 👨‍💻👨‍🔬",
  "Người đứng sau ThinkShift là Quách Thành Long, một kiến trúc sư hệ thống- một nhà phân tích kinh doanh. Sự kết hợp giữa Công nghệ và Kinh doanh chính là điểm đặc biệt của ThinkShift! ✨"
];

// --- DỮ LIỆU VỀ GIÁ TRỊ CỐT LÕI ---
export const CORE_VALUES_KEYWORDS = [
  "giá trị cốt lõi", "hệ giá trị", "nguyên tắc", "niềm tin", "tư duy > công cụ", "dữ liệu > giả định", "hành động > lý thuyết"
];

export const CORE_VALUES_RESPONSES = [
  "ThinkShift có 3 giá trị cốt lõi: \n1. **Tư duy > Công cụ** (Tư duy mới là bất biến) \n2. **Dữ liệu > Giả định** (Nói chuyện bằng số liệu) \n3. **Hành động > Lý thuyết** (Học đi đôi với hành). 🧠📊🏃",
  "Chúng tôi tin rằng công nghệ chỉ là công cụ, còn tư duy phản biện và sáng tạo mới là tài sản quý giá nhất. Đó là lý do giá trị cốt lõi của ThinkShift là 'Tư duy > Công cụ'. 🤔"
];

// --- DỮ LIỆU VỀ KÊU GỌI HÀNH ĐỘNG (THAM GIA, HỢP TÁC) ---
export const CTA_KEYWORDS = [
  "tham gia", "đóng góp", "hợp tác", "liên hệ", "đánh giá", "làm sao để"
];

export const CTA_RESPONSES = [
  "Tuyệt vời! Chúng tôi rất cần sự chung tay của cộng đồng. Bạn có thể bắt đầu bằng cách tham gia bài đánh giá năng lực của chúng tôi hoặc liên hệ trực tiếp nếu có ý tưởng hợp tác. 💪",
  "Bạn muốn tham gia? Hiện tại, cách tốt nhất để đóng góp là hoàn thành bài đánh giá của ThinkShift. Mỗi câu trả lời của bạn là một viên gạch xây dựng nên dự án này! 🧱",
  "Để hợp tác, bạn có thể nhấn vào nút 'Liên hệ Hợp tác' trên trang chủ hoặc gửi email trực tiếp cho chúng tôi. ThinkShift luôn chào đón những ý tưởng mới! 💌"
];

// --- CÂU TRẢ LỜI DỰ PHÒNG (KHI BOT KHÔNG HIỂU) ---
export const FALLBACK_RESPONSES = [
  "Hmm, câu này hơi khó với tôi lúc này. Bạn có thể hỏi về mục đích của ThinkShift, đội ngũ sáng lập, hoặc các giá trị cốt lõi của dự án không? 🤔",
  "Tôi vẫn đang trong quá trình học hỏi từ 'sếp' Long. Bạn có thể thử một câu hỏi khác được không? Ví dụ: 'ThinkShift giải quyết vấn đề gì?'",
  "Đây là một câu hỏi thú vị! Tôi sẽ ghi nhận lại để nâng cấp sau. Hiện tại, bạn có thể hỏi tôi về sứ mệnh của dự án nhé. 🤖",
  "Tôi chưa được lập trình để trả lời câu hỏi này. Nhưng tôi biết chắc rằng ThinkShift tập trung vào việc rèn luyện tư duy và năng lực thực chiến. Bạn có muốn tìm hiểu thêm về chủ đề này không?"
];

// --- CÂU CẢM ƠN ---
export const THANKS_KEYWORDS = ["cảm ơn", "thank you", "thanks", "tuyệt vời"];
export const THANKS_RESPONSES = [
  "Rất vui vì đã giúp được bạn! 😉",
  "Không có gì! ThinkShift luôn sẵn sàng đồng hành cùng bạn.",
  "Nếu có bất cứ câu hỏi nào khác, đừng ngần ngại hỏi nhé! 🤖"
];

let greetingCounter = 0;

export function getGreetingResponse(): string {
  const response = GREETING_RESPONSES[greetingCounter % GREETING_RESPONSES.length];
  greetingCounter++;
  return response;
}

export function isGreeting(message: string): boolean {
  const normalized = message.trim().toLowerCase();
  return GREETING_KEYWORDS.some(keyword => normalized.includes(keyword));
}

export function createMessage(content: string, isUser: boolean): Message {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    content,
    isUser,
    timestamp: new Date(),
  };
}
