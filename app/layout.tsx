import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ClientWrapper from "@/components/ClientWrapper" // ✅ thêm dòng này

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ThinkShift Vietnam - Định vị lại năng lực trong thời đại AI",
  // Khai báo file manifest để Next.js biết đường dẫn chính xác
  manifest: '/favicon/site.webmanifest',
    icons: {
    // Dành cho tab trình duyệt, bookmarks (ưu tiên file .png chất lượng cao hơn)
    icon: '/favicon/favicon-32x32.png', 

    // Một số trình duyệt cũ hơn vẫn dùng 'shortcut icon'
    shortcut: '/favicon/favicon.ico', 
    
    // Dành cho khi ghim ra màn hình chính của các thiết bị Apple
    apple: '/favicon/apple-touch-icon.png',
  },
  description:
    "Nền tảng nghiên cứu và phát triển sự nghiệp, giúp người trẻ Việt Nam khám phá giá trị không thể thay thế trong thời đại AI.",
  generator: "qQuach Thanh Long ",
  applicationName: "ThinkShift Vietnam",
  keywords: [
    "ThinkShift",
    "ThinkShift Vietnam",
    "AI",
    "Trí tuệ nhân tạo",
    "Nghiên cứu",
    "Phát triển sự nghiệp",
    "Giá trị con người",
    "Giá trị không thể thay thế",
    "Công nghệ",
    "Công nghệ AI",
    "Tương lai",    
    "Tương lai công việc",
    "Tương lai nghề nghiệp",
    "Tương lai AI",
    "Tương lai trí tuệ nhân tạo",
    "Tương lai con người",
    "Tương lai Việt Nam",
    "Tương lai thế giới",
    "Tương lai công nghệ",
    "Tương lai sự nghiệp",
    "Tương lai giáo dục",
    "Tương lai học tập",
    "Tương lai kỹ năng",
    "Tương lai đổi mới",
    "Tương lai đổi mới sáng tạo",
    "Tương lai phát triển",
    "Tương lai phát triển bền vững",
    "Tương lai kinh tế",
    "Tương lai xã hội",
    "Tương lai văn hóa",
    "Tương lai giáo dục Việt Nam",
    "Tương lai công nghệ Việt Nam",
    "Tương lai AI Việt Nam",
    "Tương lai trí tuệ nhân tạo Việt Nam",
    "Tương lai con người Việt Nam",
    "Tương lai thế giới Việt Nam",
    "Tương lai công nghệ Việt Nam",     
  ],
  authors: [
    {
      name: "Quach Thanh Long",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter?.className || ""}>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ClientWrapper /> {/* ✅ render FloatingAI đúng cách */}
        </ThemeProvider>
      </body>
    </html>
  )
}
