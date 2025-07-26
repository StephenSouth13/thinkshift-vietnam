"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Facebook, ArrowUp } from "lucide-react"

// Mảng chứa thông tin mạng xã hội để dễ quản lý
const socialLinks = [
  { name: "GitHub", href: "https://github.com/StephenSouth13", icon: Github }, 
  { name: "LinkedIn", href: "https://www.linkedin.com/in/quach-long-338018274/", icon: Linkedin },
  { name: "Facebook", href: "https://www.facebook.com/long.quach.273823", icon: Facebook },
]

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  // Hàm xử lý việc hiển thị nút "Back to Top"
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Hàm xử lý việc cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <>
      <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400">
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            {/* Cột 1: Thương hiệu và Mạng xã hội */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link href="/" className="inline-block mb-4">
                <h3 className="text-2xl font-bold text-white">
                  Think<span className="text-cyan-400">Shift</span>
                </h3>
              </Link>
              <p className="text-neutral-400 mb-6 max-w-xs">
                Nơi tư duy gặp gỡ hành động. Khám phá tiềm năng và định hình tương lai sự nghiệp của bạn.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Cột 2 & 3: Các liên kết */}
            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Khám phá</h4>
                <nav className="flex flex-col space-y-3">
                  <Link href="/about" className="hover:text-cyan-400 transition-colors duration-300">Giới thiệu</Link>
                  <Link href="/blog" className="hover:text-cyan-400 transition-colors duration-300">Blog</Link>
                  <Link href="/assessment" className="hover:text-cyan-400 transition-colors duration-300">Bài đánh giá</Link>
                </nav>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Hỗ trợ</h4>
                <nav className="flex flex-col space-y-3">
                  <Link href="/contact" className="hover:text-cyan-400 transition-colors duration-300">Liên hệ</Link>
                  <Link href="/faq" className="hover:text-cyan-400 transition-colors duration-300">Câu hỏi thường gặp</Link>
                </nav>
              </div>
              {/* Bạn có thể thêm cột thứ 3 ở đây nếu cần */}
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 mt-8 text-center text-sm">
            <p>
              © {new Date().getFullYear()} ThinkShift Vietnam.
              <span className="mx-1">|</span>
              Phát triển bởi{" "}
              <a
                href="https://www.facebook.com/long.quach.273823"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-300 hover:text-cyan-400 transition-colors duration-300 underline underline-offset-2"
              >
                Quách Thành Long
              </a>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Nút Back to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-cyan-400 text-neutral-900 p-3 rounded-full shadow-lg hover:bg-cyan-300 hover:scale-110 transition-all duration-300 z-50"
            aria-label="Về đầu trang"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}