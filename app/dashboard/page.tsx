"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Users,
  Award,
  Download,
  BarChart3,
  MapPin,
  Calendar,
  Star,
  ChevronRight,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock data for user dashboard
const userData = {
  name: "Nguyễn Văn An",
  email: "an.nguyen@email.com",
  assessmentScore: 85,
  completedAssessments: 3,
  skillLevel: "Trung cấp",
  targetCareer: "Full-stack Developer",
  learningProgress: 68,
  studyStreak: 14,
  badges: ["Tư duy logic", "Học tập tích cực", "Khám phá công nghệ"],
};

const careerRecommendations = [
  {
    title: "Full-stack Developer",
    match: 92,
    description:
      "Phù hợp với tư duy logic và khả năng giải quyết vấn đề của bạn",
    skills: ["React", "Node.js", "Database", "API Development"],
    averageSalary: "15-30 triệu VNĐ",
    jobOpportunities: "Cao",
    icon: "💻",
  },
  {
    title: "Data Analyst",
    match: 78,
    description:
      "Khả năng phân tích và tư duy hệ thống phù hợp với lĩnh vực này",
    skills: ["Python", "SQL", "Excel", "Data Visualization"],
    averageSalary: "12-25 triệu VNĐ",
    jobOpportunities: "Trung bình",
    icon: "📊",
  },
  {
    title: "Product Manager",
    match: 71,
    description: "Kỹ năng giao tiếp và tư duy sản phẩm phù hợp",
    skills: [
      "Product Strategy",
      "User Research",
      "Project Management",
      "Communication",
    ],
    averageSalary: "20-40 triệu VNĐ",
    jobOpportunities: "Cao",
    icon: "🎯",
  },
];

const skillGaps = [
  { skill: "React.js", currentLevel: 60, targetLevel: 85, priority: "Cao" },
  {
    skill: "Database Design",
    currentLevel: 40,
    targetLevel: 75,
    priority: "Cao",
  },
  {
    skill: "System Design",
    currentLevel: 30,
    targetLevel: 70,
    priority: "Trung bình",
  },
  { skill: "DevOps", currentLevel: 20, targetLevel: 60, priority: "Thấp" },
];

const learningRoadmap = [
  {
    phase: "Giai đoạn 1 (0-6 tháng)",
    title: "Nền tảng cơ bản",
    tasks: [
      "Hoàn thiện JavaScript ES6+",
      "Học React.js cơ bản đến nâng cao",
      "Làm quen với Git/GitHub",
      "Xây dựng 3-5 dự án nhỏ",
    ],
    status: "in-progress",
  },
  {
    phase: "Giai đoạn 2 (6-12 tháng)",
    title: "Backend & Database",
    tasks: [
      "Học Node.js và Express.js",
      "Thiết kế và quản lý Database",
      "REST API Development",
      "Xây dựng 2-3 dự án full-stack",
    ],
    status: "pending",
  },
  {
    phase: "Giai đoạn 3 (12-24 tháng)",
    title: "Chuyên sâu & Thực chiến",
    tasks: [
      "System Design principles",
      "Cloud platforms (AWS/GCP)",
      "DevOps cơ bản",
      "Tham gia dự án thực tế/internship",
    ],
    status: "pending",
  },
];

const recentActivities = [
  {
    action: "Hoàn thành đánh giá",
    detail: "Kỹ năng lập trình",
    time: "2 giờ trước",
    icon: Target,
  },
  {
    action: "Học bài mới",
    detail: "React Hooks Advanced",
    time: "5 giờ trước",
    icon: BookOpen,
  },
  {
    action: "Tham gia thảo luận",
    detail: "Community: Frontend Tips",
    time: "1 ngày trước",
    icon: Users,
  },
  {
    action: "Đạt thành tích",
    detail: "Hoàn thành 30 ngày liên tiếp",
    time: "2 ngày trước",
    icon: Award,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Chào mừng trở lại, {userData.name}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Tiếp tục hành trình phát triển sự nghiệp của bạn với AI
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-accent/10 to-blue-accent/5 border-blue-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Điểm đánh giá
                  </p>
                  <p className="text-3xl font-bold text-blue-accent">
                    {userData.assessmentScore}/100
                  </p>
                </div>
                <Brain className="h-8 w-8 text-blue-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-navy/10 to-navy/5 border-navy/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tiến độ học
                  </p>
                  <p className="text-3xl font-bold text-navy">
                    {userData.learningProgress}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-navy" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Chuỗi học
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {userData.studyStreak} ngày
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Badges
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {userData.badges.length}
                  </p>
                </div>
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="career" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="career">Nghề nghiệp</TabsTrigger>
            <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
            <TabsTrigger value="roadmap">Lộ trình</TabsTrigger>
            <TabsTrigger value="activity">Hoạt động</TabsTrigger>
          </TabsList>

          {/* Career Recommendations Tab */}
          <TabsContent value="career" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-accent" />
                    Nghề nghiệp phù hợp với bạn
                  </CardTitle>
                  <CardDescription>
                    Dựa trên kết quả đánh giá AI và phân tích năng lực của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {careerRecommendations.map((career, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{career.icon}</span>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">
                              {career.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {career.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={career.match >= 80 ? "default" : "secondary"}
                          className="text-lg px-3 py-1"
                        >
                          {career.match}% phù hợp
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Kỹ năng cần:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {career.skills.map((skill, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Mức lương:
                          </p>
                          <p className="text-sm font-semibold text-green-600">
                            {career.averageSalary}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Cơ hội việc làm:
                          </p>
                          <Badge
                            variant={
                              career.jobOpportunities === "Cao"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {career.jobOpportunities}
                          </Badge>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        Xem chi tiết và lộ trình học{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Skills Gap Tab */}
          <TabsContent value="skills" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-accent" />
                    Kỹ năng cần phát triển
                  </CardTitle>
                  <CardDescription>
                    Phân tích khoảng cách kỹ năng để đạt mục tiêu nghề nghiệp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillGaps.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-foreground">
                            {skill.skill}
                          </h4>
                          <Badge
                            variant={
                              skill.priority === "Cao"
                                ? "destructive"
                                : skill.priority === "Trung bình"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {skill.priority}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.currentLevel}% → {skill.targetLevel}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Progress value={skill.currentLevel} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Hiện tại: {skill.currentLevel}%</span>
                          <span>Mục tiêu: {skill.targetLevel}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Tài liệu học
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Tìm mentor
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Learning Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-accent" />
                    Lộ trình học tập cá nhân
                  </CardTitle>
                  <CardDescription>
                    Kế hoạch chi tiết để đạt mục tiêu {userData.targetCareer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {learningRoadmap.map((phase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`border rounded-lg p-6 ${
                        phase.status === "in-progress"
                          ? "border-blue-accent/50 bg-blue-accent/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {phase.title}
                          </h3>
                          <p className="text-muted-foreground">{phase.phase}</p>
                        </div>
                        <Badge
                          variant={
                            phase.status === "in-progress"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {phase.status === "in-progress"
                            ? "Đang học"
                            : "Sắp tới"}
                        </Badge>
                      </div>

                      <ul className="space-y-2">
                        {phase.tasks.map((task, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                phase.status === "in-progress"
                                  ? "bg-blue-accent"
                                  : "bg-muted-foreground"
                              }`}
                            />
                            {task}
                          </li>
                        ))}
                      </ul>

                      {phase.status === "in-progress" && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button size="sm" className="mr-2">
                            Tiếp tục học
                          </Button>
                          <Button size="sm" variant="outline">
                            Xem tiến độ
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-accent" />
                    Hoạt động gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-blue-accent/10">
                        <activity.icon className="h-4 w-4 text-blue-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.detail}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-accent" />
                    Badges đã đạt được
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {userData.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-accent/10 flex items-center justify-center">
                          <Award className="h-4 w-4 text-blue-accent" />
                        </div>
                        <span className="font-medium text-sm">{badge}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="flex-1" asChild>
            <Link href="/assessment">
              <Lightbulb className="mr-2 h-5 w-5" />
              Làm đánh giá mới
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            <Download className="mr-2 h-5 w-5" />
            Xuất báo cáo PDF
          </Button>
          <Button size="lg" variant="outline" className="flex-1" asChild>
            <Link href="/co-learning">
              <Users className="mr-2 h-5 w-5" />
              Tham gia Co-Learning
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
