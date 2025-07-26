"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Github, ArrowRight, Users, BrainCog, DatabaseZap, Blocks, SearchX, BrainCircuit } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  } as const

  return (
    <motion.h1
      className={`font-bold tracking-tighter text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="mr-3 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function AboutPage() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <div className="bg-neutral-950 text-neutral-50 antialiased">
      {/* Section 1: Hero */}
      <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src="/about/image.png" alt="ThinkShift background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <AnimatedText text="Chúng tôi không bắt đầu từ một kế hoạch." />
          <AnimatedText text="Chúng tôi bắt đầu từ một nghịch lý." className="text-cyan-400" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-neutral-300 max-w-3xl mx-auto"
          >
            <span className="italic text-white">ThinkShift</span> là nơi khởi nguồn của chuyển hoá tư duy thành hành động. Không bắt đầu từ công cụ – mà từ cách ta <span className="underline underline-offset-4 decoration-cyan-400">nhìn nhận thế giới</span>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-light">Khám phá câu chuyện</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }}
                className="w-1 h-2 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Vấn đề xã hội */}
      <section className="py-24 sm:py-32 px-4 bg-neutral-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="font-bold text-3xl md:text-5xl mb-4 leading-tight">
                Hành trình bắt đầu từ một <span className="text-cyan-400">nghịch lý</span>
              </h2>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                ThinkShift Vietnam sinh ra từ nỗi trăn trở về khoảng cách giữa giáo dục và thực tiễn.
              </p>
            </div>

            <div className="bg-neutral-950/50 border border-neutral-800 p-8 md:p-12 rounded-2xl shadow-lg">
              <p className="text-xl leading-relaxed text-neutral-300 mb-8 text-center">
                Những sinh viên ngành công nghệ thông tin mới ra trường với bằng cấp ưu tú nhưng mơ hồ về năng lực lõi. Những nhà tuyển dụng mệt mỏi vì không tìm được ứng viên có khả năng "giải quyết vấn đề thực".
              </p>
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700/80 flex items-start gap-4 hover:border-cyan-400/50 hover:bg-neutral-800">
                  <div className="w-12 h-12 bg-red-900/50 text-red-400 rounded-full flex items-center justify-center">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-neutral-100">Sinh viên hoang mang</h4>
                    <p className="text-neutral-400">
                      Cầm bằng giỏi nhưng không biết mình thực sự giỏi gì.
                    </p>
                  </div>
                </div>
                <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700/80 flex items-start gap-4 hover:border-orange-400/50 hover:bg-neutral-800">
                  <div className="w-12 h-12 bg-orange-900/50 text-orange-400 rounded-full flex items-center justify-center">
                    <SearchX className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-neutral-100">Nhà tuyển dụng thất vọng</h4>
                    <p className="text-neutral-400">
                      Không thể tìm ra người có tư duy thực chiến, dù CV rất đẹp.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xl text-center text-neutral-300 mt-8">
                Vấn đề không nằm ở cá nhân. Nó nằm ở một <span className="text-cyan-400 font-semibold">lỗi hệ thống</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Người sáng lập */}
      <section className="py-24 sm:py-32 px-4 bg-neutral-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bold text-3xl md:text-5xl mb-4">
              Người đứng sau <span className="text-cyan-400">ThinkShift</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto">
              Một người. Một tầm nhìn. Và một lời hứa với thế hệ kế tiếp.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl"
          >
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-neutral-700">
                  <img src="/long.png" alt="Quách Thành Long" className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-2xl text-neutral-100">Quách Thành Long</h3>
                  <Badge variant="secondary" className="my-2 bg-cyan-900/50 text-cyan-300 border-none">
                    Founder | System Architect & Research Lead
                  </Badge>
                  <p className="text-neutral-400 leading-relaxed">
                    Kiến trúc sư hệ thống & tư duy, người kiến tạo ThinkShift như một nền tảng học tập, khảo sát và chuyển hoá năng lực thế hệ trẻ trong thời đại AI.
                  </p>
                  <div className="flex space-x-3 mt-4 justify-center sm:justify-start">
                <Link href="https://www.linkedin.com/in/quach-long-338018274/" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-neutral-700 bg-neutral-800 hover:bg-neutral-700">
                      <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                      </Button>
                    </Link>


                    <Link href="https://github.com/StephenSouth13" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="border-neutral-700 bg-neutral-800 hover:bg-neutral-700">
                        <Github className="h-4 w-4 mr-2" /> GitHub
                      </Button>
                    </Link> 
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        </div>
      </section>


     {/* Section 4: Phương pháp luận & Giải pháp Cốt lõi */}
<section className="py-24 sm:py-32 px-4 bg-neutral-900">
  <div className="container mx-auto max-w-4xl">
    
    {/* Phần giới thiệu phương pháp luận, tăng tính thuyết phục */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="font-bold tracking-tight text-3xl md:text-5xl mb-4">
        La Bàn Cho Tương Lai: <br /> Mô hình <span className="text-cyan-400">Năng lực 3 Chân Kiềng</span>
      </h2>
      <p className="text-lg text-neutral-400">
        Chúng tôi không đưa ra ý kiến chủ quan. Giải pháp của chúng tôi được đúc kết từ nghiên cứu và phân tích dữ liệu đa chiều.
      </p>
    </motion.div>

    {/* Phần trình bày "3 Chân Kiềng" - trực quan và mạnh mẽ */}
    <div className="space-y-16">
      {[
        {
          icon: BrainCog,
          title: "Tư duy Hệ thống & Sản phẩm",
          content: "Năng lực 'nhìn thấy cả khu rừng thay vì một cái cây'. Biến một 'thợ code' thành 'kiến trúc sư giải pháp' bằng cách kết nối yêu cầu kỹ thuật với mục tiêu kinh doanh và giá trị người dùng.",
          color: "text-cyan-400",
          bg: "bg-cyan-900/50",
        },
        {
          icon: Users,
          title: "Giao tiếp & Dịch chuyển Ngữ cảnh",
          content: "Kỹ năng 'dịch thuật' giữa các thế giới. Trở thành cầu nối không thể thiếu khi có thể giải thích vấn đề kỹ thuật cho CEO và truyền đạt tầm nhìn business cho team dev.",
          color: "text-green-400",
          bg: "bg-green-900/50",
        },
        {
          icon: Blocks,
          title: "Siêu năng lực Tự học (Meta-Learning)",
          content: "Khả năng học một kỹ năng mới còn quan trọng hơn chính kỹ năng đó. Xây dựng một hệ thống cá nhân để chọn đúng thứ cần học, học nhanh và áp dụng được ngay.",
          color: "text-purple-400",
          bg: "bg-purple-900/50",
        },
      ].map((pillar, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 ${pillar.bg}`}>
            <pillar.icon className={`h-12 w-12 ${pillar.color}`} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-3xl mb-3 text-neutral-100">{pillar.title}</h3>
            <p className="text-lg text-neutral-400 leading-relaxed">{pillar.content}</p>
          </div>
        </motion.div>
      ))}
    </div>
    
  </div>
</section>

      {/* Section 5: The Invitation - CTA nổi bật với hiệu ứng Glassmorphism */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,255,255,0.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,255,255,0.1),rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="p-8 sm:p-12 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                    <Users className="h-8 w-8 text-neutral-900" />
                  </div>
                </div>

                <h2 className="font-bold text-3xl md:text-4xl mb-4 text-white">
                  Đây là một cuộc đối thoại.
                </h2>
                <h2 className="font-bold text-3xl md:text-4xl mb-6 text-cyan-400">
                  Và chúng tôi cần bạn.
                </h2>

                <p className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Dự án này sẽ chỉ thực sự có giá trị khi có sự chung tay của cộng đồng. Hãy tham gia bài đánh giá để
                  đóng góp câu chuyện của bạn, hoặc liên hệ nếu bạn có ý tưởng hợp tác.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="text-base font-semibold px-8 py-6 bg-cyan-400 text-neutral-900 hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105">
                    <Link href="/assessment">
                      Tham gia Đánh giá
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-base font-semibold px-8 py-6 bg-transparent border-neutral-600 text-neutral-200 hover:bg-neutral-800 hover:text-white transition-all duration-300">
                    <Link href="/contact">Liên hệ Hợp tác</Link>
                  </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="font-bold text-lg text-white">
                    Think<span className="text-cyan-400">Shift</span> Vietnam
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">Nơi Tư Duy Gặp Gỡ Hành Động</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}