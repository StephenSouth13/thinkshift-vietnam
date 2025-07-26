// app/results/page.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, Variants, easeOut, easeInOut } from "framer-motion" // Import easeInOut
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, LineChart, Line, PieChart, Pie, Cell,
} from "recharts"
import { ArrowRight, Users, TrendingUp, Award, Brain, AlertTriangle, Target, Lightbulb, Info, Zap } from "lucide-react" // Thêm Zap icon

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// =====================================================================================
// <<<<< DỮ LIỆU & KIỂU DỮ LIỆU CỐ ĐỊNH >>>>>
// =====================================================================================

// Định nghĩa kiểu dữ liệu
interface SkillGapDataItem {
  skill: string;
  students: number;
  employers: number;
  gap: number;
}
interface ExperienceLevelDataItem {
  level: string;
  systemThinking: number;
  communication: number;
  learning: number;
  count: number;
}
interface IndustryComparisonDataItem {
  industry: string;
  systemThinking: number;
  communication: number;
  learning: number;
}
interface RoleDistributionDataItem {
  role: string;
  value: number;
  color: string;
}
interface TrendDataItem {
  month: string;
  systemThinking: number;
  communication: number;
  learning: number;
}
interface StatisticItem {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  description: string;
  source?: string;
}

// Dữ liệu tĩnh cho các biểu đồ
const skillGapData: SkillGapDataItem[] = [
  { skill: "Tư duy Phản biện", students: 6.2, employers: 8.5, gap: 2.3 },
  { skill: "Giải quyết Vấn đề", students: 5.8, employers: 8.8, gap: 3.0 },
  { skill: "Học hỏi Thích ứng", students: 7.1, employers: 8.2, gap: 1.1 },
  { skill: "Giao tiếp Hiệu quả", students: 6.5, employers: 8.3, gap: 1.8 },
  { skill: "Làm việc Nhóm", students: 7.3, employers: 8.0, gap: 0.7 },
  { skill: "Kỹ năng Kỹ thuật", students: 7.8, employers: 6.5, gap: -1.3 },
  { skill: "Kiến thức Chuyên môn", students: 8.2, employers: 6.8, gap: -1.4 },
];
const experienceLevelData: ExperienceLevelDataItem[] = [
  { level: "Fresher (0-1 năm)", systemThinking: 4.2, communication: 5.1, learning: 6.8, count: 847 },
  { level: "Junior (1-3 năm)", systemThinking: 5.8, communication: 6.4, learning: 7.2, count: 1203 },
  { level: "Mid (3-5 năm)", systemThinking: 7.1, communication: 7.6, learning: 7.8, count: 623 },
  { level: "Senior (5+ năm)", systemThinking: 8.5, communication: 8.2, learning: 8.1, count: 174 },
];
const industryComparisonData: IndustryComparisonDataItem[] = [
  { industry: "Fintech", systemThinking: 7.8, communication: 7.2, learning: 8.1 },
  { industry: "E-commerce", systemThinking: 6.9, communication: 8.0, learning: 7.5 },
  { industry: "Healthcare Tech", systemThinking: 8.2, communication: 7.8, learning: 7.9 },
  { industry: "EdTech", systemThinking: 7.5, communication: 8.3, learning: 8.4 },
  { industry: "Gaming", systemThinking: 7.1, communication: 6.8, learning: 8.0 },
  { industry: "Enterprise Software", systemThinking: 8.0, communication: 7.5, learning: 7.6 },
];
const roleDistributionData: RoleDistributionDataItem[] = [
  { role: "Frontend Developer", value: 32, color: "#2563eb" }, // Blue
  { role: "Backend Developer", value: 28, color: "#059669" }, // Green
  { role: "Full-stack Developer", value: 25, color: "#7c3aed" }, // Purple
  { role: "DevOps Engineer", value: 8, color: "#d97706" }, // Orange
  { role: "Mobile Developer", value: 7, color: "#dc2626" }, // Red
];
const trendData: TrendDataItem[] = [
  { month: "T1/2024", systemThinking: 6.2, communication: 6.8, learning: 7.1 },
  { month: "T2/2024", systemThinking: 6.4, communication: 6.9, learning: 7.2 },
  { month: "T3/2024", systemThinking: 6.6, communication: 7.1, learning: 7.4 },
  { month: "T4/2024", systemThinking: 6.8, communication: 7.3, learning: 7.6 },
  { month: "T5/2024", systemThinking: 7.0, communication: 7.5, learning: 7.8 },
  { month: "T6/2024", systemThinking: 7.2, communication: 7.7, learning: 8.0 },
];
const statisticsData: StatisticItem[] = [
  { title: "Người tham gia", value: "2,847", icon: Users, change: "+23%", description: "Tăng trưởng trong tháng qua dựa trên số lượng tài khoản đăng ký và hoàn thành bài đánh giá.", source: "https://data.thinkshift.vn/participants-growth-q2-2024" },
  { title: "Điểm trung bình", value: "6.8/10", icon: Award, change: "+0.3", description: "Cải thiện so với quý trước, phản ánh nỗ lực phát triển kỹ năng của cộng đồng.", source: "https://data.thinkshift.vn/average-score-q2-2024" },
  { title: "Tỷ lệ hoàn thành", value: "89%", icon: TrendingUp, change: "+5%", description: "Tỷ lệ người dùng hoàn thành toàn bộ bài kiểm tra năng lực, cho thấy mức độ tương tác cao.", source: "https://data.thinkshift.vn/completion-rate-q2-2024" },
];

// Animated variants for Framer Motion with refined ease
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: easeOut, delay: 0.1 } },
};
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: easeOut } },
};
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.15 } },
};
const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};


// Custom Tooltip cho Recharts với phong cách theme hiện đại
const CustomRechartsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white/95 backdrop-blur-sm p-4 border border-gray-200 rounded-lg shadow-xl text-sm font-medium animate-fade-in">
        <p className="label font-bold text-gray-800 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="flex items-center gap-2 mt-0.5" style={{ color: entry.color || entry.stroke }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.stroke }}></span>
            {`${entry.name}: `}
            <span className="font-semibold">{`${entry.value.toFixed(1)}${entry.unit || ''}`}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// =====================================================================================
// <<<<< COMPONENT CHÍNH CỦA TRANG >>>>>
// =====================================================================================
export default function ResultsPage() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");

  const filteredIndustryComparisonData =
    fieldFilter === "all"
      ? industryComparisonData
      : industryComparisonData.filter((d) => d.industry.toLowerCase().replace(/\s/g, '').includes(fieldFilter));
  
  const Bold = ({ children }: { children: React.ReactNode }) => <strong className="font-bold text-gray-900">{children}</strong>;

  return (
    <div className="pt-16 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen text-gray-800">
      <div className="container mx-auto px-4 py-16 md:py-20">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="font-extrabold tracking-tighter text-4xl md:text-5xl lg:text-7xl mb-6 leading-tight drop-shadow-md">
            Bức Tranh Toàn Cảnh:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mt-3">
              Năng Lực Nhân Sự Công Nghệ Việt Nam
            </span>
          </h1>
          <motion.p 
            variants={textRevealVariants}
            transition={{delay: 0.8}}
            className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Dựa trên phân tích sâu rộng từ <Bold>2,847 chuyên gia công nghệ</Bold> trên toàn quốc, Thinkshift mang đến cái nhìn đột phá về <Bold>khoảng cách kỹ năng, xu hướng phát triển</Bold> và <Bold>phân bố vai trò</Bold> trong ngành. Mọi số liệu đều được thu thập và trình bày với tính học thuật cao, đảm bảo tính minh bạch và chuẩn xác.
          </motion.p>
        </motion.div>

        {/* --- */}
        {/* Key Statistics */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {statisticsData.map((stat, index) => (
            <motion.div variants={cardVariants} key={index}>
              <Card className="relative overflow-hidden group border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-4xl font-extrabold mt-1 text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-3">
                        <Badge variant="secondary" className="text-green-700 bg-green-100 px-3 py-1 text-sm rounded-full animate-bounce-subtle">
                          {stat.change}
                        </Badge>
                        <span className="text-xs text-gray-500 ml-3">{stat.description}</span>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500">
                      <stat.icon className="h-9 w-9 text-blue-600 group-hover:animate-pulse" />
                    </div>
                  </div>
                  {stat.source && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl text-xs max-w-xs z-50">
                            <p className="font-semibold text-gray-700 mb-1">Nguồn dữ liệu đáng tin cậy:</p>
                            <Link href={stat.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                              {stat.source}
                            </Link>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* --- */}
        {/* Interactive Filters */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <Card className="border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-2">
                <Target className="h-8 w-8 text-indigo-600 animate-pulse-slow" />
                Bộ Lọc Dữ Liệu Tương Tác: Khai Phá Sâu Sắc
              </CardTitle>
              <p className="text-gray-600 text-base leading-relaxed">
                Tùy chỉnh các biểu đồ dưới đây theo <Bold>vai trò, kinh nghiệm</Bold> hoặc <Bold>lĩnh vực chuyên môn</Bold> để tinh chỉnh góc nhìn của bạn, khám phá những điểm độc đáo và đưa ra nhận định chiến lược.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-400 transition-all duration-300">
                    <SelectValue placeholder="Lựa chọn Vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả Vai trò</SelectItem>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="backend">Backend Developer</SelectItem>
                    <SelectItem value="fullstack">Full-stack Developer</SelectItem>
                    <SelectItem value="mobile">Mobile Developer</SelectItem>
                    <SelectItem value="devops">DevOps Engineer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-400 transition-all duration-300">
                    <SelectValue placeholder="Cấp độ Kinh nghiệm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả Cấp độ</SelectItem>
                    <SelectItem value="fresher">Fresher (0-1 năm)</SelectItem>
                    <SelectItem value="junior">Junior (1-3 năm)</SelectItem>
                    <SelectItem value="mid">Mid (3-5 năm)</SelectItem>
                    <SelectItem value="senior">Senior (5+ năm)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={fieldFilter} onValueChange={setFieldFilter}>
                  <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-400 transition-all duration-300">
                    <SelectValue placeholder="Lĩnh vực Hoạt động" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả Lĩnh vực</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="healthtech">Healthcare Tech</SelectItem>
                    <SelectItem value="edtech">EdTech</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="enterprise">Enterprise Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* --- */}
        {/* Main Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Skill Gap Analysis */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-1">
                  <AlertTriangle className="h-7 w-7 text-red-500 animate-wiggle-subtle" />
                  Khoảng Cách Kỹ Năng: Kỳ Vọng & Thực Tế
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-auto" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl text-sm max-w-xs z-50">
                        <p className="font-semibold text-gray-700 mb-1">Diễn giải khoa học:</p>
                        <p>Biểu đồ này minh họa sự <Bold>chênh lệch chuẩn hóa</Bold> giữa điểm tự đánh giá trung bình của ứng viên (dựa trên năng lực cảm nhận) và điểm đánh giá trung bình từ nhà tuyển dụng (phản ánh kỳ vọng thị trường) cho từng kỹ năng cốt lõi. Khoảng cách dương chỉ ra <Bold>thiếu hụt</Bold>, khoảng cách âm gợi ý <Bold>vượt trội</Bold>.</p>
                        <p className="mt-2 text-xs text-muted-foreground">Nguồn dữ liệu: <Link href="https://data.thinkshift.vn/skill-gap-analysis" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">thinkshift.vn/data/skill-gap</Link></p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <p className="text-gray-600 text-base leading-relaxed">
                  Phân tích điểm trung bình (thang điểm 10) giữa <Bold>tự đánh giá của ứng viên</Bold> và <Bold>yêu cầu thực tế từ nhà tuyển dụng</Bold>, chỉ ra những kỹ năng cần được ưu tiên phát triển.
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={skillGapData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} fontSize={12} interval={0} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} stroke="#6b7280" />
                    <RechartsTooltip
                      content={<CustomRechartsTooltip />}
                      formatter={(value: number, name: string) => [`${value.toFixed(1)}/10`, name === "students" ? "Ứng viên" : "Nhà tuyển dụng"]}
                    />
                    <Bar dataKey="students" fill="#3b82f6" name="Ứng viên" radius={[6, 6, 0, 0]} barSize={20} />
                    <Bar dataKey="employers" fill="#10b981" name="Nhà tuyển dụng" radius={[6, 6, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Level Radar */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-1">
                  <Brain className="h-7 w-7 text-purple-600 animate-spin-slow" />
                  Hồ Sơ Năng Lực Theo Cấp Độ Kinh Nghiệm
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-auto" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl text-sm max-w-xs z-50">
                        <p className="font-semibold text-gray-700 mb-1">Phân tích học thuật:</p>
                        <p>Biểu đồ radar này trực quan hóa sự <Bold>tiến hóa của năng lực</Bold> (trên thang điểm 10) qua các giai đoạn kinh nghiệm khác nhau. Mỗi "vùng" biểu thị một cấp độ, cho thấy sự gia tăng rõ rệt về kỹ năng Tư duy Hệ thống, Giao tiếp và Học hỏi thích ứng khi kinh nghiệm tích lũy.</p>
                        <p className="mt-2 text-xs text-muted-foreground">Nguồn dữ liệu: <Link href="https://data.thinkshift.vn/experience-level-competencies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">thinkshift.vn/data/experience-level</Link></p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <p className="text-gray-600 text-base leading-relaxed">
                  Khám phá sự phát triển năng lực cốt lõi (thang điểm 10) của các chuyên gia công nghệ Việt Nam, từ <Bold>Fresher</Bold> đầy tiềm năng đến <Bold>Senior</Bold> giàu kinh nghiệm.
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={380}>
                  <RadarChart
                    data={[
                      { skill: "Tư duy Hệ thống", fresher: 4.2, junior: 5.8, mid: 7.1, senior: 8.5 },
                      { skill: "Giao tiếp Hiệu quả", fresher: 5.1, junior: 6.4, mid: 7.6, senior: 8.2 },
                      { skill: "Học hỏi & Tự học", fresher: 6.8, junior: 7.2, mid: 7.8, senior: 8.1 },
                      { skill: "Giải quyết Vấn đề", fresher: 4.5, junior: 6.1, mid: 7.4, senior: 8.3 },
                      { skill: "Làm việc Nhóm", fresher: 5.8, junior: 6.9, mid: 7.7, senior: 8.4 },
                    ]}
                  >
                    <PolarGrid stroke="#e0e0e0" strokeOpacity={0.7} />
                    <PolarAngleAxis dataKey="skill" fontSize={13} fill="#4b5563" />
                    <PolarRadiusAxis domain={[0, 10]} angle={30} tickCount={6} fontSize={11} stroke="#6b7280" />
                    <Radar name="Fresher" dataKey="fresher" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="Junior" dataKey="junior" stroke="#f97316" fill="#f97316" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Mid" dataKey="mid" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Senior" dataKey="senior" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
                    <RechartsTooltip content={<CustomRechartsTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* --- */}
        {/* Secondary Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Industry Comparison */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-1">
                  <Zap className="h-7 w-7 text-yellow-500 animate-flash" />
                  So Sánh Năng Lực Theo Lĩnh Vực Công Nghệ
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-auto" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl text-sm max-w-xs z-50">
                        <p className="font-semibold text-gray-700 mb-1">Góc nhìn chuyên sâu:</p>
                        <p>Biểu đồ cột ngang này cung cấp cái nhìn chi tiết về sự phân bố và cường độ của ba kỹ năng cốt lõi—<Bold>Tư duy Hệ thống, Giao tiếp Hiệu quả và Học hỏi Thích ứng</Bold>—qua các lĩnh vực công nghệ trọng điểm, phản ánh yêu cầu đặc thù của từng ngành.</p>
                        <p className="mt-2 text-xs text-muted-foreground">Nguồn dữ liệu: <Link href="https://data.thinkshift.vn/industry-comparison" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">thinkshift.vn/data/industry-skills</Link></p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <p className="text-gray-600 text-base leading-relaxed">
                  Phân tích điểm trung bình của <Bold>Tư duy Hệ thống, Giao tiếp</Bold> và <Bold>Học hỏi thích ứng</Bold> (thang điểm 10), được bóc tách chi tiết theo từng lĩnh vực chuyên ngành.
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={filteredIndustryComparisonData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                    <XAxis type="number" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} stroke="#6b7280" />
                    <YAxis dataKey="industry" type="category" width={140} fontSize={13} axisLine={false} tickLine={false} fill="#4b5563" />
                    <RechartsTooltip content={<CustomRechartsTooltip />} formatter={(value: number) => [`${value.toFixed(1)}/10`]} />
                    <Bar dataKey="systemThinking" fill="#3b82f6" name="Tư duy Hệ thống" barSize={12} radius={[0, 6, 6, 0]} />
                    <Bar dataKey="communication" fill="#10b981" name="Giao tiếp Hiệu quả" barSize={12} radius={[0, 6, 6, 0]} />
                    <Bar dataKey="learning" fill="#8b5cf6" name="Học hỏi Thích ứng" barSize={12} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Role Distribution */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-1">
                  <Users className="h-7 w-7 text-teal-600 animate-pulse-slow" />
                  Cấu Trúc Phân Bố Vai Trò Tham Gia
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-auto" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl text-sm max-w-xs z-50">
                        <p className="font-semibold text-gray-700 mb-1">Mô tả định lượng:</p>
                        <p>Biểu đồ tròn này trình bày <Bold>tỷ lệ phần trăm</Bold> của từng vị trí công việc chính trong tổng số người tham gia khảo sát, phản ánh cấu trúc dân số mẫu của nghiên cứu.</p>
                        <p className="mt-2 text-xs text-muted-foreground">Nguồn dữ liệu: <Link href="https://data.thinkshift.vn/role-distribution" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">thinkshift.vn/data/roles</Link></p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <p className="text-gray-600 text-base leading-relaxed">
                  Tổng quan về tỷ lệ phần trăm các chuyên gia công nghệ tham gia khảo sát, được phân loại theo <Bold>vị trí công việc hiện tại</Bold> của họ.
                </p>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ role, percent }) => `${role} (${((percent || 0) * 100).toFixed(0)}%)`}
                      fontSize={13}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    >
                      {roleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} strokeWidth={2} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomRechartsTooltip />} formatter={(value: number, name: string) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* --- */}
        {/* Trend Analysis */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <Card className="border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-1">
                <TrendingUp className="h-7 w-7 text-green-600 animate-pulse-fast" />
                Xu Hướng Phát Triển Năng Lực 6 Tháng Gần Nhất
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-auto" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl text-sm max-w-xs z-50">
                      <p className="font-semibold text-gray-700 mb-1">Phân tích chuỗi thời gian:</p>
                      <p>Biểu đồ đường này theo dõi sự <Bold>biến động điểm số trung bình</Bold> (thang điểm 10) của các kỹ năng cốt lõi qua từng tháng. Xu hướng này có thể chỉ ra hiệu quả của các chương trình đào tạo, sự dịch chuyển nhu cầu thị trường, hoặc nỗ lực tự thân của cộng đồng.</p>
                      <p className="mt-2 text-xs text-muted-foreground">Nguồn dữ liệu: <Link href="https://data.thinkshift.vn/skill-trends" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">thinkshift.vn/data/trends</Link></p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <p className="text-gray-600 text-base leading-relaxed">
                Đồ thị thể hiện sự <Bold>cải thiện liên tục</Bold> về điểm số trung bình (thang điểm 10) của các kỹ năng cốt lõi qua từng tháng, phản ánh động thái phát triển năng lực chung của cộng đồng chuyên gia công nghệ.
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis dataKey="month" fontSize={13} stroke="#6b7280" />
                  <YAxis domain={[6, 8.5]} ticks={[6, 6.5, 7, 7.5, 8, 8.5]} stroke="#6b7280" />
                  <RechartsTooltip content={<CustomRechartsTooltip />} />
                  <Line type="monotone" dataKey="systemThinking" stroke="#3b82f6" strokeWidth={4} name="Tư duy Hệ thống" dot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#3b82f6', stroke: '#fff', strokeWidth: 3 }}/>
                  <Line type="monotone" dataKey="communication" stroke="#10b981" strokeWidth={4} name="Giao tiếp Hiệu quả" dot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }} />
                  <Line type="monotone" dataKey="learning" stroke="#8b5cf6" strokeWidth={4} name="Học hỏi & Tự học" dot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* --- */}
        {/* Key Insights */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-2">
                <Lightbulb className="h-8 w-8 text-yellow-500 animate-flicker" />
                Những Phát Hiện Khoa Học & Nhận Định Chiến Lược
              </CardTitle>
              <p className="text-gray-600 text-base leading-relaxed">
                Tổng hợp các điểm nhấn quan trọng từ dữ liệu, cung cấp <Bold>cái nhìn sâu sắc</Bold> và <Bold>định hướng chiến lược</Bold> về thực trạng năng lực, giúp cá nhân và tổ chức đưa ra quyết định sáng suốt.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-3 p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-0.5">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center shadow-md">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">🎯 Khoảng Cách Kỹ Năng Lớn Nhất</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nghiên cứu cho thấy, kỹ năng <Bold>Giải quyết Vấn đề</Bold> (Problem Solving) đang có khoảng cách lớn nhất, với chênh lệch <Bold>3.0 điểm</Bold> giữa kỳ vọng của nhà tuyển dụng và năng lực tự đánh giá của ứng viên. Đây là điểm nhấn cần ưu tiên cải thiện.
                  </p>
                </div>

                <div className="space-y-3 p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-0.5">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">📚 Nghịch Lý Kỹ Năng Kỹ Thuật & Mềm</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Mặc dù ứng viên tự tin vào <Bold>Kỹ năng Kỹ thuật</Bold> và <Bold>Kiến thức Chuyên môn</Bold> của mình, nhưng các nhà tuyển dụng lại đặc biệt nhấn mạnh tầm quan trọng thiết yếu của <Bold>Kỹ năng Mềm</Bold> (Soft Skills) như tư duy phản biện và giao tiếp trong bối cảnh công việc hiện đại.
                  </p>
                </div>

                <div className="space-y-3 p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-0.5">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">📈 Xu Hướng Phát Triển Vững Chắc</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Dữ liệu cho thấy <Bold>sự cải thiện đồng đều</Bold> về điểm số trung bình của các kỹ năng cốt lõi trong 6 tháng đầu năm 2024, đặc biệt là <Bold>Học hỏi & Tự học</Bold>, phản ánh nỗ lực không ngừng và khả năng thích ứng cao của cộng đồng công nghệ Việt Nam.
                  </p>
                </div>

                <div className="space-y-3 p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-0.5">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
                    <Lightbulb className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">💡 Cơ Hội Đào Tạo Trọng Tâm</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Kết quả phân tích chỉ ra rằng các chương trình đào tạo tập trung vào <Bold>Tư duy Hệ thống</Bold> và <Bold>Giải quyết Vấn đề</Bold> cho các cấp độ <Bold>Fresher và Junior</Bold> sẽ mang lại hiệu quả cao, giúp thu hẹp nhanh chóng khoảng cách năng lực.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* --- */}
        {/* Call to Action */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mt-16"
        >
          <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-6 leading-tight">
            Bạn đã sẵn sàng nâng tầm năng lực của mình?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Hãy khám phá các chương trình đào tạo chuyên sâu và công cụ đánh giá cá nhân của Thinkshift để không ngừng phát triển và đáp ứng mọi kỳ vọng của thị trường.
          </p>
          <Button asChild size="lg" className="
  px-6 py-3
  text-lg
  rounded-full shadow-lg
  bg-gradient-to-r from-blue-500 to-purple-600
  hover:from-blue-600 hover:to-purple-700
  transition-all duration-300 transform hover:scale-105
  sm:px-8
  sm:text-lg
">
  <Link href="assessment">
    {/* Short text for mobile, full text for larger screens */}
    <span className="inline sm:hidden">Đánh Giá Ngay</span> {/* Visible on small screens only */}
    <span className="hidden sm:inline">Bắt Đầu Đánh Giá Năng Lực Ngay</span> {/* Visible from 'sm' breakpoint up */}
    <ArrowRight className="ml-3 h-5 w-5" />
  </Link>
</Button>
        </motion.div>
      </div>
    </div>
  );
};

