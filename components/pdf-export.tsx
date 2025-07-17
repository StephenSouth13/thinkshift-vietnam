"use client";

import { useState } from "react";
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
import {
  Download,
  FileText,
  User,
  Calendar,
  Target,
  BarChart3,
  Award,
  TrendingUp,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

interface PDFExportProps {
  userProfile?: {
    name: string;
    email: string;
    assessmentDate: string;
    totalScore: number;
    level: string;
  };
  careerRecommendations?: Array<{
    title: string;
    matchPercentage: number;
    description: string;
    averageSalary: string;
    jobDemand: string;
    growth: string;
  }>;
  skillAnalysis?: {
    technical: Array<{ skill: string; score: number; benchmark: number }>;
    soft: Array<{ skill: string; score: number; benchmark: number }>;
  };
  learningPath?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export function PDFExport({
  userProfile = {
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    assessmentDate: "2024-01-15",
    totalScore: 85,
    level: "Xuất sắc",
  },
  careerRecommendations = [
    {
      title: "Full-stack Developer",
      matchPercentage: 92,
      description: "Phù hợp với khả năng lập trình và tư duy logic",
      averageSalary: "15-30 triệu VNĐ",
      jobDemand: "Rất cao",
      growth: "22%",
    },
    {
      title: "Data Scientist",
      matchPercentage: 78,
      description: "Khả năng phân tích dữ liệu tốt",
      averageSalary: "18-35 triệu VNĐ",
      jobDemand: "Cao",
      growth: "35%",
    },
  ],
  skillAnalysis = {
    technical: [
      { skill: "Programming Logic", score: 85, benchmark: 70 },
      { skill: "Problem Solving", score: 90, benchmark: 75 },
      { skill: "System Thinking", score: 75, benchmark: 65 },
    ],
    soft: [
      { skill: "Communication", score: 70, benchmark: 80 },
      { skill: "Teamwork", score: 65, benchmark: 75 },
      { skill: "Leadership", score: 55, benchmark: 60 },
    ],
  },
  learningPath = {
    immediate: [
      "Hoàn thiện JavaScript ES6+ và React.js",
      "Học Node.js và Express framework",
      "Thực hành với Git và GitHub",
    ],
    shortTerm: [
      "Học thiết kế database và SQL",
      "Tìm hiểu về RESTful API",
      "Tham gia các dự án mã nguồn mở",
    ],
    longTerm: [
      "Học System Design",
      "Tìm hiểu về Cloud Computing",
      "Phát triển kỹ năng leadership",
    ],
  },
}: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // Simulate PDF generation process
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Create PDF content using browser's print API
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(generatePDFHTML());
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFHTML = () => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Báo Cáo Tư Vấn Nghề Nghiệp - ${userProfile.name}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #fff;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #1B9CFC; padding-bottom: 20px; }
        .logo { color: #0A3D62; font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #1B9CFC; font-size: 18px; }
        .section { margin-bottom: 30px; page-break-inside: avoid; }
        .section-title { 
          background: linear-gradient(135deg, #0A3D62, #1B9CFC);
          color: white;
          padding: 15px;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .user-info { background: #F9F9F9; padding: 20px; border-left: 4px solid #1B9CFC; }
        .score-highlight { 
          text-align: center;
          background: linear-gradient(135deg, #1B9CFC, #0A3D62);
          color: white;
          padding: 30px;
          margin: 20px 0;
        }
        .score-number { font-size: 48px; font-weight: bold; }
        .career-item { 
          border: 1px solid #e0e0e0;
          margin-bottom: 15px;
          padding: 20px;
          background: #fafafa;
        }
        .career-title { color: #0A3D62; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .match-percent { 
          background: #1B9CFC;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          display: inline-block;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .skill-item { 
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .skill-bar { 
          background: #e0e0e0;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          width: 60%;
        }
        .skill-progress { 
          background: linear-gradient(90deg, #1B9CFC, #0A3D62);
          height: 100%;
          border-radius: 4px;
        }
        .learning-phase {
          background: white;
          border: 1px solid #e0e0e0;
          padding: 20px;
          margin-bottom: 15px;
        }
        .phase-title { color: #0A3D62; font-weight: bold; margin-bottom: 15px; }
        .task-list { list-style: none; }
        .task-list li { 
          padding: 5px 0;
          padding-left: 20px;
          position: relative;
        }
        .task-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #1B9CFC;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          color: #666;
        }
        @media print {
          body { print-color-adjust: exact; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="logo">ThinkShift Vietnam</div>
          <div class="subtitle">Báo Cáo Tư Vấn Nghề Nghiệp Cá Nhân</div>
          <div style="margin-top: 15px; color: #666;">
            Được tạo bởi AI • ${new Date().toLocaleDateString("vi-VN")}
          </div>
        </div>

        <!-- User Information -->
        <div class="section">
          <div class="section-title">📋 Thông Tin Cá Nhân</div>
          <div class="user-info">
            <p><strong>Họ tên:</strong> ${userProfile.name}</p>
            <p><strong>Email:</strong> ${userProfile.email}</p>
            <p><strong>Ngày đánh giá:</strong> ${new Date(userProfile.assessmentDate).toLocaleDateString("vi-VN")}</p>
            <p><strong>Mã báo cáo:</strong> TSV-${Date.now().toString().slice(-6)}</p>
          </div>
        </div>

        <!-- Overall Score -->
        <div class="section">
          <div class="section-title">🎯 Điểm Tổng Thể</div>
          <div class="score-highlight">
            <div class="score-number">${userProfile.totalScore}/100</div>
            <div style="font-size: 18px; margin-top: 10px;">Xếp loại: ${userProfile.level}</div>
            <p style="margin-top: 15px;">Dựa trên phân tích toàn diện các kỹ năng kỹ thuật, kỹ năng mềm và tính cách cá nhân</p>
          </div>
        </div>

        <!-- Career Recommendations -->
        <div class="section">
          <div class="section-title">💼 Nghề Nghiệp Phù Hợp</div>
          ${careerRecommendations
            .map(
              (career) => `
            <div class="career-item">
              <div class="career-title">${career.title}</div>
              <div class="match-percent">${career.matchPercentage}% phù hợp</div>
              <p style="margin-bottom: 15px;">${career.description}</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; font-size: 14px;">
                <div><strong>Mức lương:</strong><br>${career.averageSalary}</div>
                <div><strong>Nhu cầu tuyển dụng:</strong><br>${career.jobDemand}</div>
                <div><strong>Tăng trưởng:</strong><br>+${career.growth}</div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>

        <!-- Skills Analysis -->
        <div class="section">
          <div class="section-title">📊 Phân Tích Kỹ Năng</div>
          
          <h3 style="color: #0A3D62; margin-bottom: 15px;">Kỹ Năng Kỹ Thuật:</h3>
          ${skillAnalysis.technical
            .map(
              (skill) => `
            <div class="skill-item">
              <span style="width: 30%;">${skill.skill}</span>
              <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.score}%;"></div>
              </div>
              <span style="font-weight: bold; color: ${skill.score >= skill.benchmark ? "#4CAF50" : "#FF9800"};">
                ${skill.score}%
              </span>
            </div>
          `,
            )
            .join("")}

          <h3 style="color: #0A3D62; margin: 25px 0 15px 0;">Kỹ Năng Mềm:</h3>
          ${skillAnalysis.soft
            .map(
              (skill) => `
            <div class="skill-item">
              <span style="width: 30%;">${skill.skill}</span>
              <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.score}%;"></div>
              </div>
              <span style="font-weight: bold; color: ${skill.score >= skill.benchmark ? "#4CAF50" : "#FF9800"};">
                ${skill.score}%
              </span>
            </div>
          `,
            )
            .join("")}
        </div>

        <!-- Learning Path -->
        <div class="section">
          <div class="section-title">🛤️ Lộ Trình Học Tập Được Đề Xuất</div>
          
          <div class="learning-phase">
            <div class="phase-title">🚀 Ngay lập tức (0-3 tháng):</div>
            <ul class="task-list">
              ${learningPath.immediate.map((task) => `<li>${task}</li>`).join("")}
            </ul>
          </div>

          <div class="learning-phase">
            <div class="phase-title">📈 Ngắn hạn (3-12 tháng):</div>
            <ul class="task-list">
              ${learningPath.shortTerm.map((task) => `<li>${task}</li>`).join("")}
            </ul>
          </div>

          <div class="learning-phase">
            <div class="phase-title">🎯 Dài hạn (1-2 năm):</div>
            <ul class="task-list">
              ${learningPath.longTerm.map((task) => `<li>${task}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="section">
          <div class="section-title">💡 Khuyến Nghị Cá Nhân</div>
          <div style="background: #F0F8FF; padding: 20px; border-left: 4px solid #1B9CFC;">
            <h4 style="color: #0A3D62; margin-bottom: 15px;">Dựa trên kết quả phân tích, chúng tôi khuyên bạn:</h4>
            <ul style="margin-left: 20px; line-height: 1.8;">
              <li>Tập trung phát triển kỹ năng ${skillAnalysis.technical.find((s) => s.score < s.benchmark)?.skill || "communication"} để tăng khả năng cạnh tranh</li>
              <li>Xem xét học thêm về ${careerRecommendations[0].title} với ${careerRecommendations[0].matchPercentage}% độ phù hợp</li>
              <li>Tham gia các khóa học online hoặc bootcamp để n��ng cao kỹ năng thực hành</li>
              <li>Tìm kiếm mentor trong lĩnh vực ${careerRecommendations[0].title} để được hướng dẫn cụ thể</li>
              <li>Xây dựng portfolio và tham gia các dự án thực tế để tích lũy kinh nghiệm</li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p><strong>ThinkShift Vietnam</strong></p>
          <p>Nền tảng hướng nghiệp AI hàng đầu Việt Nam</p>
          <p style="margin-top: 10px; font-size: 12px;">
            📧 contact@thinkshift.vn | 🌐 www.thinkshift.vn<br>
            Báo cáo này được tạo tự động bởi AI và chỉ mang tính chất tham khảo
          </p>
        </div>
      </div>
    </body>
    </html>
    `;
  };

  return (
    <div className="space-y-6">
      {/* PDF Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-accent" />
            Báo Cáo Tư Vấn Nghề Nghiệp
          </CardTitle>
          <CardDescription>
            Tài liệu chi tiết về kết quả đánh giá và lộ trình phát triển cá nhân
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Người được đánh giá:</strong> {userProfile.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Ngày đánh giá:</strong>{" "}
                  {new Date(userProfile.assessmentDate).toLocaleDateString(
                    "vi-VN",
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Điểm tổng thể:</strong> {userProfile.totalScore}/100
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Nghề nghiệp phù hợp:</strong>{" "}
                  {careerRecommendations.length} gợi ý
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Kỹ năng được phân tích:</strong>{" "}
                  {skillAnalysis.technical.length + skillAnalysis.soft.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Lộ trình học tập:</strong> 3 giai đoạn
                </span>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <h4 className="font-semibold text-foreground mb-3">
              Nội dung báo cáo bao gồm:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Thông tin cá nhân và kết quả đánh giá
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Phân tích chi tiết kỹ năng kỹ thuật
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Đánh giá kỹ năng mềm và tính cách
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Nghề nghiệp phù hợp với mức độ phù hợp
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Lộ trình học tập 3 giai đoạn chi tiết
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Khuyến nghị và gợi ý cá nhân hóa
                </span>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex-1"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang tạo PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Tải xuống PDF
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <FileText className="mr-2 h-5 w-5" />
              Xem trước
            </Button>
          </div>

          {/* Note */}
          <div className="bg-blue-accent/10 border border-blue-accent/20 rounded-lg p-4">
            <p className="text-sm text-blue-accent font-medium mb-2">
              📋 Lưu ý quan trọng:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>
                • Báo cáo này được tạo tự động bởi AI dựa trên kết quả đánh giá
                của bạn
              </li>
              <li>
                • Nội dung chỉ mang tính chất tham khảo và gợi ý cho việc định
                hướng nghề nghiệp
              </li>
              <li>
                • Để có kết quả chính xác nhất, b���n nên kết hợp với tư vấn từ
                mentor chuyên ngành
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
