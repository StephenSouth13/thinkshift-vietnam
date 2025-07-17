"use client";

import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Brain,
  Target,
  Users,
  BookOpen,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Assessment questions data
const assessmentSections = [
  {
    id: "personal",
    title: "Thông tin cá nhân",
    description: "Giúp chúng tôi hiểu về bạn",
    icon: Users,
    questions: [
      {
        id: "name",
        type: "text",
        question: "Họ và tên của bạn",
        required: true,
      },
      {
        id: "age",
        type: "select",
        question: "Độ tuổi của bạn",
        options: ["Dưới 18", "18-22", "23-27", "28-35", "Trên 35"],
        required: true,
      },
      {
        id: "education",
        type: "select",
        question: "Trình độ học vấn hiện tại",
        options: [
          "Học sinh THPT",
          "Sinh viên đại học",
          "Đã tốt nghiệp đại học",
          "Có bằng thạc sĩ",
          "Có bằng tiến sĩ",
        ],
        required: true,
      },
      {
        id: "experience",
        type: "select",
        question: "Kinh nghiệm làm việc",
        options: [
          "Không có kinh nghiệm",
          "Dưới 1 năm",
          "1-2 năm",
          "3-5 năm",
          "Trên 5 năm",
        ],
        required: true,
      },
    ],
  },
  {
    id: "interests",
    title: "Sở thích & Khả năng",
    description: "Khám phá điểm mạnh và sở thích của bạn",
    icon: Brain,
    questions: [
      {
        id: "working_style",
        type: "radio",
        question: "Bạn thích làm việc theo cách nào?",
        options: [
          "Làm việc độc lập, tự quyết định",
          "Làm việc nhóm, hợp tác chặt chẽ",
          "Kết hợp cả hai tùy tình huống",
          "Dẫn dắt và hướng dẫn người khác",
        ],
        required: true,
      },
      {
        id: "problem_solving",
        type: "radio",
        question: "Khi gặp vấn đề phức tạp, bạn thường:",
        options: [
          "Phân tích logic từng bước một",
          "Tìm kiếm ý kiến từ nhiều người",
          "Thử nghiệm nhiều giải pháp khác nhau",
          "Tìm hiểu các giải pháp đã có sẵn",
        ],
        required: true,
      },
      {
        id: "learning_preference",
        type: "radio",
        question: "Bạn học hiệu quả nhất khi:",
        options: [
          "Đọc tài liệu và tự nghiên cứu",
          "Xem video và tutorial",
          "Thực hành trực tiếp",
          "Thảo luận với người khác",
        ],
        required: true,
      },
      {
        id: "tech_interests",
        type: "checkbox",
        question: "Bạn quan tâm đến lĩnh vực nào? (chọn nhiều)",
        options: [
          "Lập trình web",
          "Phát triển ứng dụng mobile",
          "Trí tuệ nhân tạo/Machine Learning",
          "Phân tích dữ liệu",
          "Bảo mật thông tin",
          "Game development",
          "UI/UX Design",
          "DevOps/Cloud Computing",
        ],
        required: true,
      },
    ],
  },
  {
    id: "skills",
    title: "Kỹ năng hiện tại",
    description: "Đánh giá mức độ kỹ năng của bạn",
    icon: Target,
    questions: [
      {
        id: "programming_experience",
        type: "radio",
        question: "Kinh nghiệm lập trình của bạn:",
        options: [
          "Chưa từng lập trình",
          "Đã học cơ bản (HTML, CSS)",
          "Có kinh nghiệm với 1-2 ngôn ngữ",
          "Thành thạo nhiều ngôn ngữ lập trình",
          "Có kinh nghiệm dự án thực tế",
        ],
        required: true,
      },
      {
        id: "english_level",
        type: "radio",
        question: "Trình độ tiếng Anh của bạn:",
        options: [
          "Cơ bản (có thể đọc hiểu đơn giản)",
          "Trung bình (đọc tài liệu kỹ thuật được)",
          "Khá (có thể giao tiếp bằng tiếng Anh)",
          "Giỏi (thành thạo 4 kỹ năng)",
          "Xuất sắc (như người bản ngữ)",
        ],
        required: true,
      },
      {
        id: "soft_skills",
        type: "checkbox",
        question: "Bạn tự đánh giá mình có kỹ năng mềm nào? (chọn nhiều)",
        options: [
          "Giao tiếp hiệu quả",
          "Làm việc nhóm",
          "Lãnh đạo và quản lý",
          "Tư duy phản biện",
          "Giải quyết vấn đề",
          "Quản lý thời gian",
          "Học hỏi nhanh",
          "Thích ứng với thay đổi",
        ],
        required: true,
      },
    ],
  },
  {
    id: "goals",
    title: "Mục tiêu nghề nghiệp",
    description: "Định hướng tương lai của bạn",
    icon: BookOpen,
    questions: [
      {
        id: "career_timeline",
        type: "radio",
        question: "Bạn muốn có việc làm trong lĩnh vực IT sau:",
        options: [
          "Ngay lập tức",
          "Trong vòng 6 tháng",
          "Trong vòng 1 năm",
          "Trong vòng 2 năm",
          "Trên 2 năm",
        ],
        required: true,
      },
      {
        id: "learning_commitment",
        type: "radio",
        question: "Bạn có thể dành bao nhiều thời gian học mỗi ngày?",
        options: ["Dưới 1 giờ", "1-2 giờ", "3-4 giờ", "5-6 giờ", "Trên 6 giờ"],
        required: true,
      },
      {
        id: "preferred_work_env",
        type: "radio",
        question: "Môi trường làm việc lý tưởng của bạn:",
        options: [
          "Startup nhỏ, linh hoạt",
          "Công ty công nghệ lớn",
          "Doanh nghiệp truyền thống",
          "Làm việc tự do (Freelance)",
          "Khởi nghiệp riêng",
        ],
        required: true,
      },
      {
        id: "motivation",
        type: "textarea",
        question:
          "Điều gì thúc đẩy bạn muốn làm việc trong lĩnh vực công nghệ?",
        required: true,
        placeholder: "Chia sẻ động lực và mục tiêu của bạn...",
      },
    ],
  },
];

type Answer = {
  [key: string]: string | string[];
};

export default function AssessmentPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const router = useRouter();

  const totalQuestions = assessmentSections.reduce(
    (sum, section) => sum + section.questions.length,
    0,
  );
  const currentQuestionIndex =
    assessmentSections
      .slice(0, currentSection)
      .reduce((sum, section) => sum + section.questions.length, 0) +
    currentQuestion;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const currentSectionData = assessmentSections[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentSection, currentQuestion]);

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const nextQuestion = () => {
    // Record time spent on question (for analysis)
    const timeSpent = Date.now() - questionStartTime;

    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      completeAssessment();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(
        assessmentSections[currentSection - 1].questions.length - 1,
      );
    }
  };

  const completeAssessment = () => {
    const totalTime = Date.now() - startTime;
    // Here you would normally send data to backend for AI analysis
    console.log("Assessment completed:", {
      answers,
      totalTime,
      completedAt: new Date().toISOString(),
    });
    setIsCompleted(true);
  };

  const getCurrentAnswer = () => {
    return answers[currentQuestionData?.id || ""] || "";
  };

  const isCurrentQuestionAnswered = () => {
    const answer = getCurrentAnswer();
    if (currentQuestionData?.type === "checkbox") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer && answer.toString().trim() !== "";
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Đánh giá hoàn thành! 🎉
              </h1>
              <p className="text-lg text-muted-foreground">
                Cảm ơn bạn đã hoàn thành bài đánh giá. AI đang phân tích dữ liệu
                để tạo ra báo cáo cá nhân hóa cho bạn.
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-accent/10 to-blue-accent/5 border-blue-accent/20">
              <CardContent className="space-y-4 p-0">
                <div className="flex items-center justify-center gap-2 text-blue-accent">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold">
                    AI đang xử lý kết quả...
                  </span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Quá trình này có thể mất vài phút để phân tích toàn bộ câu trả
                  lời của bạn.
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/results">Xem kết quả ngay</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">Về Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-accent/10 rounded-lg flex items-center justify-center">
              <currentSectionData.icon className="h-6 w-6 text-blue-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentSectionData.title}
              </h1>
              <p className="text-muted-foreground">
                {currentSectionData.description}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Câu {currentQuestionIndex + 1} / {totalQuestions}
              </span>
              <span>{Math.round(progress)}% hoàn thành</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Section Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {assessmentSections.map((section, index) => (
              <div
                key={section.id}
                className={`flex items-center ${index < assessmentSections.length - 1 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    index < currentSection
                      ? "bg-blue-accent border-blue-accent text-white"
                      : index === currentSection
                        ? "border-blue-accent text-blue-accent"
                        : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {index < currentSection ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                {index < assessmentSections.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      index < currentSection
                        ? "bg-blue-accent"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuestionData?.question}
                  {currentQuestionData?.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </CardTitle>
                {currentQuestionData?.placeholder && (
                  <CardDescription>
                    {currentQuestionData.placeholder}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestionData?.type === "text" && (
                  <Input
                    placeholder="Nhập câu trả lời..."
                    value={getCurrentAnswer() as string}
                    onChange={(e) =>
                      handleAnswer(currentQuestionData.id, e.target.value)
                    }
                    className="text-lg"
                  />
                )}

                {currentQuestionData?.type === "textarea" && (
                  <Textarea
                    placeholder={
                      currentQuestionData.placeholder || "Nhập câu trả lời..."
                    }
                    value={getCurrentAnswer() as string}
                    onChange={(e) =>
                      handleAnswer(currentQuestionData.id, e.target.value)
                    }
                    className="min-h-[120px] text-base"
                  />
                )}

                {(currentQuestionData?.type === "radio" ||
                  currentQuestionData?.type === "select") && (
                  <RadioGroup
                    value={getCurrentAnswer() as string}
                    onValueChange={(value) =>
                      handleAnswer(currentQuestionData.id, value)
                    }
                  >
                    {currentQuestionData.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 text-base cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestionData?.type === "checkbox" && (
                  <div className="space-y-3">
                    {currentQuestionData.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={`checkbox-${index}`}
                          checked={
                            (getCurrentAnswer() as string[])?.includes(
                              option,
                            ) || false
                          }
                          onCheckedChange={(checked) => {
                            const currentAnswers =
                              (getCurrentAnswer() as string[]) || [];
                            if (checked) {
                              handleAnswer(currentQuestionData.id, [
                                ...currentAnswers,
                                option,
                              ]);
                            } else {
                              handleAnswer(
                                currentQuestionData.id,
                                currentAnswers.filter((a) => a !== option),
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`checkbox-${index}`}
                          className="flex-1 text-base cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentSection === 0 && currentQuestion === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Th��i gian ước tính:{" "}
              {Math.max(1, totalQuestions - currentQuestionIndex)} phút
            </span>
          </div>

          <Button
            onClick={nextQuestion}
            disabled={
              currentQuestionData?.required && !isCurrentQuestionAnswered()
            }
            className="min-w-[120px]"
          >
            {currentSection === assessmentSections.length - 1 &&
            currentQuestion === currentSectionData.questions.length - 1 ? (
              <>
                Hoàn thành
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Tiếp theo
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Help Text */}
        {currentQuestionData?.required && !isCurrentQuestionAnswered() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Vui lòng trả lời câu hỏi này để tiếp tục</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
