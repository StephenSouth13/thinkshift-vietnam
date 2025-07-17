"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // <--- LỖI 1: ĐÃ THÊM IMPORT
import {
  ArrowRight,
  BrainCog,
  Blocks,
  Users,
  GraduationCap,
  Briefcase,
  Bot,
} from "lucide-react";
import Link from "next/link";
import {
  motion,
  type Variants,
  useInView,
  useSpring,
  easeOut,
} from "framer-motion"; // <--- LỖI 4: ĐÃ THÊM 'easeOut' VÀO IMPORT
import { useEffect, useRef } from "react";

// --- COMPONENT MỚI: HIỆU ỨNG SỐ LIỆU CHẠY (ĐÃ SỬA LỖI) ---
const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    damping: 20,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, isInView, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        // --- LỖI 2: ĐÃ SỬA ---
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.round(latest),
        );
      }
    });
  }, [spring]);

  return <span ref={ref} />;
};

export default function HomePage() {
  const problemCards = [
    {
      title: "Lạm phát Bằng cấp",
      description:
        "Tấm bằng không còn là 'tấm vé vàng'. Giá trị thực sự nằm ở năng lực giải quyết vấn đề, không phải điểm số.",
      image: "/page/post1.png",
      icon: GraduationCap,
    },
    {
      title: "Kỹ năng 'Hết hạn' nhanh chóng",
      description:
        "Thế giới công nghệ thay đổi mỗi ngày. Những gì bạn học hôm nay có thể trở thành kiến thức nền vào ngày mai.",
      image: "/page/post2.png",
      icon: Briefcase,
    },
    {
      title: "Sự trỗi dậy của AI",
      description:
        "AI không thay thế người giỏi, nó thay thế những người làm việc như máy móc. Bạn cần trở thành người 'chỉ huy' AI, không phải 'cạnh tranh' với nó.",
      image: "/page/post3.png",
      icon: Bot,
    },
  ];

  const solutionPillars = [
    {
      icon: BrainCog,
      title: "Tư duy Hệ thống & Sản phẩm",
      description:
        "Nhìn xa hơn một dòng code, hiểu được tác động của công việc mình lên toàn bộ cỗ máy kinh doanh và trải nghiệm người dùng.",
    },
    {
      icon: Users,
      title: "Giao tiếp & Dịch chuyển Ngữ cảnh",
      description:
        "Năng lực 'dịch thuật' giữa các thế giới: từ Business sang Tech, từ Tech sang ngôn ngữ của người dùng cuối.",
    },
    {
      icon: Blocks,
      title: "Siêu năng lực Tự học (Meta-Learning)",
      description:
        "Biến việc học thành một hệ thống cá nhân có phương pháp, biết cách chọn đúng thứ cần học, học sâu và áp dụng được ngay.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }, // <--- LỖI 3,4,5...: ĐÃ SỬA "easeOut" -> easeOut
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-16 antialiased">
      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden bg-gradient-to-br from-navy/5 via-blue-accent/5 to-navy/10 dark:from-navy/20 dark:via-blue-accent/10 dark:to-navy/30">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-blue-accent/5 to-transparent"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-blue-accent/50 text-blue-accent bg-blue-accent/10 py-1 px-4"
            >
              Nền tảng Hướng nghiệp AI cho Việt Nam
            </Badge>
            <h1 className="font-extrabold tracking-tight text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Tư Duy Chuyển Dịch.
              <br />
              <span className="text-blue-accent">Năng Lực Bất Biến.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Khám phá ngành nghề phù hợp, phát triển kỹ năng và kết nối cộng
              đồng học tập với sức mạnh của AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="text-base sm:text-lg px-8 py-6 rounded-full bg-blue-accent hover:bg-blue-accent/90 text-white font-bold shadow-lg shadow-blue-accent/20 hover:shadow-xl hover:shadow-blue-accent/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link href="/assessment">
                  Bắt đầu Đánh giá AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base sm:text-lg px-8 py-6 rounded-full border-navy/20 text-navy hover:bg-navy/5 transition-all duration-300"
              >
                <Link href="/dashboard">Xem Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Hiệu ứng số liệu */}
      <section className="py-20 px-4 bg-gray-light dark:bg-navy/20">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={itemVariants} className="p-4">
              <h3 className="text-5xl md:text-6xl font-bold text-blue-accent mb-2">
                <AnimatedCounter value={72} />%
              </h3>
              <p className="text-muted-foreground">
                Doanh nghiệp IT cho biết sinh viên thiếu kỹ năng thực chiến.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                (Nguồn: Báo cáo TopDev)
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-4">
              <h3 className="text-5xl md:text-6xl font-bold text-blue-accent mb-2">
                <AnimatedCounter value={49} />%
              </h3>
              <p className="text-muted-foreground">
                Nhân sự lo lắng công việc sẽ bị AI thay thế trong 5 năm tới.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                (Nguồn: Báo cáo PwC)
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-4">
              <h3 className="text-5xl md:text-6xl font-bold text-blue-accent mb-2">
                <AnimatedCounter value={87} />%
              </h3>
              <p className="text-muted-foreground">
                Nhà lãnh đạo tin thành công phụ thuộc vào khả năng thích ứng của
                nhân viên.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                (Nguồn: Báo cáo Deloitte)
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-bold tracking-tight text-foreground text-3xl md:text-4xl mb-4">
              Thách thức của thế hệ trẻ Việt Nam
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Chúng ta đang ở giữa một "cơn bão hoàn hảo" – nơi 3 làn sóng va
              vào nhau.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {problemCards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-card border border-border text-foreground rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-accent/10 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="overflow-hidden">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-accent/10 text-blue-accent rounded-lg flex items-center justify-center mb-4">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{card.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-28 px-4 bg-gray-light dark:bg-navy/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-bold tracking-tight text-foreground text-3xl md:text-4xl mb-4">
              Giải pháp ThinkShift Vietnam
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hệ thống AI tiên tiến giúp bạn khám phá năng lực, phát triển kỹ
              năng và kết nối cộng đồng học tập.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {solutionPillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-card border border-border text-foreground rounded-2xl shadow-lg hover:border-blue-accent/50 transition-colors duration-300 group p-8 text-center">
                  <div className="w-20 h-20 bg-blue-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <pillar.icon className="h-10 w-10 text-blue-accent" />
                  </div>
                  <h3 className="font-semibold text-2xl mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-br from-navy/5 to-blue-accent/5 dark:from-navy/20 dark:to-blue-accent/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Đây là bức tranh chung.
            </h2>
            <h2 className="font-bold text-3xl md:text-4xl mb-6 text-blue-accent">
              Còn câu chuyện của riêng bạn thì sao?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Những con số này chỉ là khởi đầu. Để hiểu rõ vị trí của bản thân
              trong bức tranh lớn, hãy tham gia bài đánh giá năng lực cá nhân
              của ThinkShift Vietnam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto text-base font-semibold px-8 py-6 rounded-full bg-blue-accent hover:bg-blue-accent/90 text-white shadow-lg shadow-blue-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link
                  href="/assessment"
                  className="flex items-center justify-center"
                >
                  Bắt đầu Đánh giá AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto text-base font-semibold px-8 py-6 rounded-full border-navy/20 text-navy hover:bg-navy/5"
              >
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center"
                >
                  Xem Demo Dashboard
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
