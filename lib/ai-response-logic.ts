// /lib/ai-response-logic.ts

// --- ĐỊNH NGHĨA CÁC Ý ĐỊNH NGƯỜI DÙNG (PHIÊN BẢN HƯỚNG NGHIỆP) ---
type Intent =
  | "GREETING"
  | "ABOUT_THINKSHIFT" // Về ThinkShift Vietnam
  | "CAREER_GUIDANCE" // Tư vấn nghề nghiệp
  | "SKILL_ASSESSMENT" // Đánh giá kỹ năng
  | "LEARNING_PATH" // Lộ trình học tập
  | "JOB_MARKET" // Thị trường việc làm
  | "TECH_SKILLS" // Kỹ năng công nghệ
  | "SOFT_SKILLS" // Kỹ năng mềm
  | "AI_IMPACT" // Tác động của AI
  | "MENTORING" // Tìm mentor
  | "PORTFOLIO" // Xây dựng portfolio
  | "INTERVIEW_PREP" // Chuẩn bị phỏng vấn
  | "SALARY_INFO" // Thông tin lương
  | "COMPANY_INFO" // Thông tin công ty
  | "STUDY_TIPS" // Mẹo học tập
  | "THANKS"
  | "UNKNOWN";

// --- KHO NỘI DUNG PHẢN HỒI ---
const responses: Record<Intent, string[]> = {
  GREETING: [
    "Xin chào! Tôi là ThinkShift AI - trợ lý hướng nghiệp của bạn. Tôi có thể giúp bạn định hướng nghề nghiệp, tư vấn kỹ năng và lập lộ trình học tập phù hợp. Bạn cần hỗ trợ gì hôm nay? 🚀",
    "Chào bạn! Tôi ở đây để hỗ trợ hành trình phát triển sự nghiệp của bạn. Từ việc chọn ngành nghề đến xây dựng kỹ năng, hãy để tôi đồng hành cùng bạn! 💼",
  ],

  ABOUT_THINKSHIFT: [
    "ThinkShift Vietnam là nền tảng hướng nghiệp & co-learning hàng đầu dành cho học sinh, sinh viên và lập trình viên tại Việt Nam. Chúng tôi sử dụng AI để:\n\n🎯 Phân tích năng lực và đề xuất ngành nghề phù hợp\n📚 Tạo lộ trình học tập cá nhân hóa\n🤝 Kết nối với mentor và cộng đồng học tập\n💡 Cung cấp insights về thị trường việc làm\n\nMục tiêu của chúng tôi là giúp bạn tìm thấy và phát triển sự nghiệp mơ ước!",
    "ThinkShift Vietnam được tạo ra để giải quyết khoảng cách giữa giáo dục và thị trường lao động. Chúng tôi cung cấp đánh giá AI, tư vấn nghề nghiệp, và môi trường học tập cộng đồng để giúp bạn thành công trong thời đại số.",
  ],

  CAREER_GUIDANCE: [
    "Để định hướng nghề nghiệp hiệu quả, tôi khuyên bạn:\n\n1. Làm bài đánh giá năng lực AI của chúng tôi\n2. Khám phá các ngành nghề trending\n3. Phân tích điểm mạnh và sở thích cá nhân\n4. Tìm hiểu mức lương và triển vọng phát triển\n5. Kết nối với mentor trong lĩnh vực quan tâm\n\nBạn đã có ngành nghề cụ thể muốn tìm hiểu chưa?",
    "Hướng nghiệp thành công cần kết hợp giữa đam mê, năng lực và cơ hội thị trường. Tôi có thể giúp bạn:\n- Đánh giá kỹ năng hiện tại\n- Khám phá các ngành nghề phù hợp\n- Lập kế hoạch phát triển dài hạn\n- Tìm mentor và cơ hội thực tập\n\nBạn muốn bắt đầu từ đâu?",
  ],

  SKILL_ASSESSMENT: [
    "Bài đánh giá kỹ năng AI của ThinkShift sẽ phân tích:\n\n🧠 Tư duy logic và giải quyết vấn đề\n💻 Kỹ năng kỹ thuật (nếu có)\n🗣️ Khả năng giao tiếp và làm việc nhóm\n📈 Tiềm năng học tập và thích ứng\n🎯 Sở thích và định hướng nghề nghiệp\n\nKết quả sẽ được so sánh với cơ sở dữ liệu ngành và đưa ra khuyến nghị cá nhân hóa. Bạn có muốn bắt đầu đánh giá không?",
    "Đánh giá kỹ năng là bước đầu quan trọng để hiểu bản thân và định hướng phát triển. ThinkShift sử dụng AI để phân tích đa chiều và đưa ra lộ trình học tập phù hợp nhất cho bạn.",
  ],

  LEARNING_PATH: [
    "Lộ trình học tập hiệu quả thường chia thành 3 giai đoạn:\n\n📚 **Giai đoạn 1 (0-6 tháng)**: Nền tảng cơ bản\n🔨 **Giai đoạn 2 (6-18 tháng)**: Kỹ năng chuyên sâu\n🚀 **Giai đoạn 3 (18+ tháng)**: Kinh nghiệm thực chiến\n\nMỗi giai đoạn sẽ có mục tiêu, tài liệu học tập và dự án thực hành cụ thể. Bạn muốn xem lộ trình cho ngành nào?",
    "Lộ trình học tập cá nhân hóa dựa trên:\n- Kỹ năng hiện tại của bạn\n- Mục tiêu nghề nghiệp\n- Thời gian có thể đầu tư\n- Phong cách học tập ưa thích\n\nChúng tôi sẽ gợi ý khóa học, dự án và mentor phù hợp cho từng giai đoạn.",
  ],

  JOB_MARKET: [
    "Thị trường việc làm IT Việt Nam đang rất sôi động:\n\n📈 **Nhu cầu cao**: Full-stack Developer, AI/ML Engineer, DevOps\n💰 **Mức lương hấp dẫn**: 15-40 triệu cho Mid-level\n🌍 **Xu hướng**: Remote work, outsourcing quốc tế\n🔥 **Kỹ năng hot**: React, Python, Cloud, AI\n\nBạn muốn tìm hiểu chi tiết về ngành nào?",
    "Dựa trên data từ các trang tuyển dụng lớn, tôi có thể cung cấp thông tin về:\n- Mức lương theo vị trí và kinh nghiệm\n- Kỹ năng được yêu cầu nhiều nhất\n- Các công ty đang tuyển\n- Xu hướng phát triển ngành\n\nBạn quan tâm đến thông tin nào?",
  ],

  TECH_SKILLS: [
    "Các kỹ năng công nghệ quan trọng hiện tại:\n\n🔥 **Frontend**: React, Vue.js, TypeScript\n⚙️ **Backend**: Node.js, Python, Go\n🗄️ **Database**: PostgreSQL, MongoDB\n☁️ **Cloud**: AWS, GCP, Docker\n🤖 **AI/ML**: Python, TensorFlow, PyTorch\n📱 **Mobile**: React Native, Flutter\n\nBạn muốn học kỹ năng nào trước?",
    "Để chọn kỹ năng công nghệ phù hợp:\n1. Xem xét mục tiêu nghề nghiệp\n2. Phân tích nhu cầu thị trường\n3. Đánh giá thời gian học tập\n4. Tìm mentor và cộng đồng hỗ trợ\n\nTôi có thể tư vấn lộ trình học cụ thể cho từng kỹ năng.",
  ],

  SOFT_SKILLS: [
    "Kỹ năng mềm quan trọng trong thời đại AI:\n\n🗣️ **Giao tiếp**: Trình bày ý tưởng rõ ràng\n🤝 **Làm việc nhóm**: Collaboration và leadership\n🧠 **Tư duy phản biện**: Phân tích và giải quyết vấn đề\n📚 **Học tập liên tục**: Adaptability và growth mindset\n🎯 **Quản lý dự án**: Planning và execution\n\nĐây là những kỹ năng AI khó thay thế. Bạn muốn phát triển kỹ năng nào?",
    "Soft skills ngày càng quan trọng vì:\n- AI có thể làm các task kỹ thuật\n- Con người cần tập trung vào sáng tạo và giao tiếp\n- Làm việc remote cần kỹ năng tự quản lý\n- Collaboration cross-functional team\n\nTôi có thể gợi ý cách phát triển từng kỹ năng cụ thể.",
  ],

  AI_IMPACT: [
    "AI đang thay đổi thị trường lao động:\n\n🚀 **Cơ hội mới**: AI Engineer, Prompt Engineer, AI Product Manager\n⚠️ **Nghề bị ảnh hưởng**: Data entry, basic coding, customer service\n🔄 **Nghề chuyển đổi**: Developer → AI-assisted Developer\n💡 **Kỹ năng cần thiết**: Tư duy sáng tạo, giải quyết vấn đề phức tạp\n\nKey: Học cách làm việc WITH AI, không against AI!",
    "Để thành công trong thời đại AI:\n- Tập trung vào kỹ năng AI khó thay thế\n- Học cách sử dụng AI tools hiệu quả\n- Phát triển tư duy sáng tạo và strategic thinking\n- Xây dựng network và personal brand\n\nBạn muốn biết AI ảnh hưởng như thế nào đến ngành cụ thể?",
  ],

  MENTORING: [
    "Mentor có thể giúp bạn:\n\n🎯 **Career guidance**: Định hướng nghề nghiệp\n📚 **Skill development**: Phát triển kỹ năng\n🔍 **Code review**: Feedback chất lượng cao\n🌐 **Network**: Kết nối cơ hội\n💼 **Interview prep**: Chuẩn bị phỏng vấn\n\nThinkShift có network mentor từ Google, Microsoft, Grab... Bạn cần mentor cho lĩnh vực nào?",
    "Cách tìm mentor hiệu quả:\n1. Xác định mục tiêu cụ thể\n2. Research background của mentor\n3. Chuẩn bị câu hỏi thoughtful\n4. Respect thời gian của mentor\n5. Follow up và show progress\n\nTôi có thể gợi ý mentor phù hợp với goals của bạn!",
  ],

  PORTFOLIO: [
    "Portfolio mạnh cần có:\n\n🎨 **Design**: Clean, professional, responsive\n💻 **Projects**: 3-5 dự án đa dạng\n📝 **Case study**: Process, challenges, solutions\n🔗 **Live demos**: Deploy và accessible\n📱 **Contact**: Easy to reach you\n\nMỗi project nên show different skills và có real impact. Bạn đang làm trong lĩnh vực gì?",
    "Tips xây dựng portfolio nổi bật:\n- Chọn projects align với target job\n- Document your thinking process\n- Include metrics và results\n- Get feedback từ professionals\n- Update thường xuyên\n\nTôi có thể review và suggest improvements cho portfolio của bạn!",
  ],

  INTERVIEW_PREP: [
    "Chuẩn bị phỏng vấn hiệu quả:\n\n📚 **Research**: Company, role, interviewer\n💼 **STAR method**: Situation, Task, Action, Result\n💻 **Technical prep**: Coding challenges, system design\n🗣️ **Behavioral**: Câu chuyện về experience\n❓ **Questions**: Chuẩn bị câu hỏi thông minh\n\nLoại phỏng vấn nào bạn cần prepare: technical hay behavioral?",
    "Common interview formats:\n- Phone/video screening\n- Technical coding test\n- System design (senior roles)\n- Behavioral interview\n- Final round với leadership\n\nMỗi round cần strategy khác nhau. Tôi có thể giúp bạn practice specific scenarios!",
  ],

  SALARY_INFO: [
    "Mức lương IT tại Việt Nam (2024):\n\n👨‍💻 **Junior (0-2 năm)**: 8-15 triệu\n🧑‍💻 **Middle (2-5 năm)**: 15-30 triệu\n👨‍💼 **Senior (5+ năm)**: 30-60 triệu\n🏢 **Lead/Manager**: 50-100 triệu\n\nLưu ý: Lương phụ thuộc vào skill, company size, location. Remote có thể x2-3 lần. Bạn muốn biết mức lương cho vị trí cụ thể?",
    "Factors ảnh hưởng lương:\n- Technical skills và experience\n- Company type (startup vs corporate)\n- Location (HCM > HN > other cities)\n- English proficiency\n- Negotiation skills\n\nTôi có thể tư vấn strategy để tăng lương hiệu quả!",
  ],

  COMPANY_INFO: [
    "Top tech companies tại VN:\n\n🌟 **Global**: Google, Microsoft, Amazon\n🦄 **Regional**: Grab, Shopee, Lazada\n🇻🇳 **Local**: VNG, FPT, Tiki, VinTech\n🏢 **Outsourcing**: TMA, Axon, KMS\n🚀 **Startups**: Tiki, Momo, VNPay\n\nMỗi loại có culture và career path khác nhau. Bạn prefer môi trường nào?",
    "Cách research company:\n- Glassdoor reviews\n- LinkedIn employee insights\n- Tech blogs và case studies\n- Salary ranges\n- Growth trajectory\n\nTôi có thể share insights về specific companies bạn quan tâm!",
  ],

  STUDY_TIPS: [
    "Study tips hiệu quả:\n\n⏰ **Pomodoro**: 25 phút focus + 5 phút break\n🎯 **Active learning**: Practice > reading\n👥 **Study groups**: Explain to others\n📱 **Spaced repetition**: Review theo chu kỳ\n🎮 **Gamification**: Set goals và rewards\n\nMost important: Consistency > intensity. Bạn đang học skill nào?",
    "Learning strategies:\n- Build projects while learning\n- Join communities (Discord, Reddit)\n- Follow industry experts\n- Attend meetups và conferences\n- Teach others what you learn\n\nActive engagement accelerates learning significantly!",
  ],

  THANKS: [
    "Rất vui được hỗ trợ bạn! Nếu có thêm câu hỏi về career, skills hay opportunities, đừng ngần ngại hỏi nhé. Chúc bạn thành công! 🚀",
    "Không có gì! Tôi luôn sẵn sàng đồng hành cùng hành trình phát triển sự nghiệp của bạn. Keep learning và growing! 💪",
  ],

  UNKNOWN: [
    "Câu hỏi thú vị! Tôi có thể không hiểu rõ ý bạn, nhưng tôi có thể giúp bạn:\n- Định hướng nghề nghiệp\n- Tư vấn kỹ năng\n- Lộ trình học tập\n- Thông tin thị trường việc làm\n- Kết nối mentor\n\nBạn muốn hỏi về chủ đề nào?",
    "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Có thể bạn hỏi lại theo cách khác? Hoặc tôi có thể hỗ trợ bạn các vấn đề về career development, skill building, hoặc job market insights! 🤔",
  ],
};

// --- BỘ TỪ KHÓA ĐỂ PHÂN LOẠI Ý ĐỊNH ---
const intentKeywords: Record<Intent, string[]> = {
  GREETING: ["chào", "hello", "hi", "xin chào", "yo", "hey"],
  ABOUT_THINKSHIFT: [
    "thinkshift",
    "dự án",
    "nền tảng",
    "về gì",
    "giới thiệu",
    "là gì",
  ],
  CAREER_GUIDANCE: [
    "nghề nghiệp",
    "hướng nghiệp",
    "career",
    "job",
    "định hướng",
    "chọn ngành",
  ],
  SKILL_ASSESSMENT: [
    "đánh giá",
    "assessment",
    "test",
    "quiz",
    "kiểm tra",
    "năng lực",
  ],
  LEARNING_PATH: ["lộ trình", "roadmap", "học", "học gì", "bắt đầu", "plan"],
  JOB_MARKET: [
    "thị trường",
    "tuyển dụng",
    "việc làm",
    "cơ hội",
    "nhu cầu",
    "trending",
  ],
  TECH_SKILLS: [
    "kỹ năng",
    "công nghệ",
    "lập trình",
    "coding",
    "programming",
    "tech",
  ],
  SOFT_SKILLS: [
    "soft skill",
    "kỹ năng mềm",
    "giao tiếp",
    "teamwork",
    "leadership",
  ],
  AI_IMPACT: [
    "ai",
    "artificial intelligence",
    "tác động",
    "thay thế",
    "automation",
  ],
  MENTORING: ["mentor", "hướng dẫn", "tư vấn", "coach", "guidance"],
  PORTFOLIO: ["portfolio", "dự án", "project", "showcase", "cv", "resume"],
  INTERVIEW_PREP: ["phỏng vấn", "interview", "chuẩn bị", "prep", "tips"],
  SALARY_INFO: ["lương", "salary", "thu nhập", "income", "tiền", "pay"],
  COMPANY_INFO: ["công ty", "company", "doanh nghiệp", "firm", "startup"],
  STUDY_TIPS: ["học tập", "study", "tips", "mẹo", "hiệu quả", "method"],
  THANKS: ["cảm ơn", "thanks", "thank you", "tuyệt vời", "hay"],
  UNKNOWN: [],
};

// --- GỢI Ý CÂU HỎI TIẾP THEO ---
const followUpSuggestions: Partial<Record<Intent, string[]>> = {
  GREETING: ["Bạn có thể hỏi: 'Tôi nên học gì để trở thành developer?'"],
  ABOUT_THINKSHIFT: ["Bạn muốn làm bài đánh giá kỹ năng không?"],
  CAREER_GUIDANCE: ["Bạn có muốn tìm hiểu về lộ trình học cụ thể?"],
  SKILL_ASSESSMENT: ["Bạn có muốn bắt đầu bài đánh giá ngay không?"],
  LEARNING_PATH: ["Bạn có muốn xem thông tin về mentor?"],
  JOB_MARKET: ["Bạn có muốn biết mức lương cho vị trí cụ thể?"],
  TECH_SKILLS: ["Bạn có muốn lộ trình học skill này không?"],
  MENTORING: ["Bạn có muốn tôi gợi ý mentor phù hợp?"],
};

// --- HÀM LOGIC TRUNG TÂM ---
function getIntent(message: string): Intent {
  const lowerMessage = message.toLowerCase();

  // Ưu tiên các intent cụ thể trước
  const intentPriority: Intent[] = [
    "SKILL_ASSESSMENT",
    "CAREER_GUIDANCE",
    "LEARNING_PATH",
    "MENTORING",
    "JOB_MARKET",
    "TECH_SKILLS",
    "SOFT_SKILLS",
    "AI_IMPACT",
    "PORTFOLIO",
    "INTERVIEW_PREP",
    "SALARY_INFO",
    "COMPANY_INFO",
    "STUDY_TIPS",
    "ABOUT_THINKSHIFT",
    "GREETING",
    "THANKS",
  ];

  for (const intent of intentPriority) {
    const keywords = intentKeywords[intent];
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return intent;
    }
  }

  return "UNKNOWN";
}

// --- HÀM TRẢ VỀ PHẢN HỒI HOÀN CHỈNH ---
export function getAIResponse(userMessage: string): string {
  const intent = getIntent(userMessage);
  const possibleResponses = responses[intent];
  let reply =
    possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

  // Gợi ý thêm nếu có
  const suggestions = followUpSuggestions[intent];
  if (suggestions && suggestions.length > 0) {
    const suggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];
    reply += `\n\n💡 *${suggestion}*`;
  }

  return reply;
}
