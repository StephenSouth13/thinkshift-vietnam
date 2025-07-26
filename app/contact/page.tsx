"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-bold tracking-tighter text-4xl md:text-5xl mb-6">Về Chúng Tôi & Liên Hệ</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gặp gỡ đội ngũ sáng lập và kết nối với chúng tôi để cùng xây dựng tương lai nghề nghiệp.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-semibold tracking-tight text-3xl mb-8">Đội ngũ Sáng lập</h2>

            <div className="space-y-8">
              {/* Founder 1 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src="/long.png"
                        alt="Quách Thành Long"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">Quách Thành Long</h3>
                      <p className="text-primary font-medium mb-3">Co-Founder & Lead Developer</p>
                      <p className="text-muted-foreground mb-4">
                        Với hơn 2 năm kinh nghiệm trong phát triển phần mềm và quản lý sản phẩm, Long mang đến góc nhìn
                        thực tế về thị trường công nghệ Việt Nam. Anh đã từng làm việc tại các startup và tập đoàn lớn,
                        hiểu rõ khoảng cách giữa đào tạo và thực tế công việc.
                      </p>
                      <div className="flex space-x-3">
                        <Button size="sm" variant="outline">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button size="sm" variant="outline">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Founder 2 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src="/Thuan.png"
                        alt="Trịnh Nam Thuận"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">Trịnh Nam Thuận</h3>
                      <p className="text-primary font-medium mb-3">Co-Founder & Business Strategy</p>
                      <p className="text-muted-foreground mb-4">
                        Thuận có background mạnh về kinh doanh và phát triển sản phẩm. Với kinh nghiệm tư vấn cho nhiều
                        doanh nghiệp về chuyển đổi số, anh hiểu rõ nhu cầu thực tế của thị trường lao động và xu hướng
                        phát triển của các ngành nghề trong tương lai.
                      </p>
                      <div className="flex space-x-3">
                        <Button size="sm" variant="outline">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mission Statement */}
            <Card className="mt-8 bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3">Sự kết hợp độc đáo</h4>
                <p className="text-muted-foreground">
                  Sự kết hợp giữa chuyên môn kỹ thuật sâu và hiểu biết về kinh doanh thực tế giúp ThinkShift Vietnam
                  mang đến những giải pháp vừa khoa học vừa ứng dụng cao, phù hợp với bối cảnh thị trường lao động Việt
                  Nam.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Liên hệ với chúng tôi</CardTitle>
                <p className="text-muted-foreground">
                  Có câu hỏi, góp ý hoặc muốn hợp tác? Chúng tôi rất mong được nghe từ bạn!
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        Họ
                      </label>
                      <Input id="firstName" placeholder="Nhập họ của bạn" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Tên
                      </label>
                      <Input id="lastName" placeholder="Nhập tên của bạn" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Tiêu đề
                    </label>
                    <Input id="subject" placeholder="Chủ đề bạn muốn thảo luận" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Nội dung
                    </label>
                    <Textarea id="message" placeholder="Chia sẻ chi tiết về câu hỏi hoặc góp ý của bạn..." rows={6} />
                  </div>

                  <Button className="w-full" size="lg">
                    Gửi đi
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4">Thông tin liên hệ</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>stephensouth1307@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span>0979 137 018</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>Hồ Chí Minh, Việt Nam</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
