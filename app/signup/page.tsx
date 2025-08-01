// app/signup/page.tsx

"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// --- CÁC THAY ĐỔI CHÍNH NẰM Ở ĐÂY ---

// Thay đổi 1: Cập nhật Zod schema cho form đăng ký
const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Họ và tên phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({
        message: "Email không hợp lệ.",
    }),
    password: z.string().min(6, {
        message: "Mật khẩu phải có ít nhất 6 ký tự.",
    }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    // Thay đổi 2: Thêm logic so sánh mật khẩu
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"], // Báo lỗi ở trường confirmPassword
});


// Định nghĩa các Icon và Animation (giống trang Login)
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.62-3.85 1.62-3.41 0-6.18-2.8-6.18-6.18s2.77-6.18 6.18-6.18c1.93 0 3.1.79 3.85 1.54l2.45-2.45C17.58 2.37 15.28 1 12.48 1 7.02 1 3 5.02 3 10.5s4.02 9.5 9.48 9.5c2.72 0 4.83-.91 6.38-2.43 1.62-1.57 2.13-3.72 2.13-5.74 0-.63-.05-1.22-.16-1.78l-8.18-.01z" fill="currentColor"/>
    </svg>
)
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
)
const Loader2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
)
const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const itemVariants: Variants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } }


export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log("Đang đăng ký tài khoản mới:", values)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Đăng ký thành công!")
    setIsLoading(false)
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Cột trái - giữ nguyên như trang Login */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          src="/login-bg.jpg"
          alt="Abstract background"
          fill={true}
          style={{objectFit: 'cover'}}
          className="z-0"
        />
        <div className="absolute inset-0 bg-zinc-900/60 z-10" />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              “Nền tảng này đã thay đổi hoàn toàn cách tôi tiếp cận và đánh giá năng lực tư duy. Một công cụ không thể thiếu cho sự phát triển cá nhân.”
            </p>
            <footer className="text-sm">Sofia Davis, Giám đốc Chiến lược</footer>
          </blockquote>
        </div>
      </div>

      {/* Cột phải - Form đăng ký */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-0">
        <motion.div
          className="mx-auto grid w-[380px] gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Thay đổi 3: Cập nhật tiêu đề */}
<motion.div variants={itemVariants} className="grid gap-3 text-center mt-6">
    <h1 className="text-3xl font-bold">Tạo tài khoản</h1>
    <p className="text-balance text-muted-foreground">
        Bắt đầu hành trình phát triển tư duy của bạn ngay hôm nay
    </p>
</motion.div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <Button variant="outline"><GithubIcon className="mr-2 h-4 w-4" /> GitHub</Button>
                  <Button variant="outline"><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Hoặc đăng ký bằng email</span></div>
                </motion.div>

                {/* --- Form Mới --- */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                    <motion.div variants={itemVariants}>
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ và Tên</FormLabel>
                            <FormControl><Input placeholder="Nguyễn Văn A" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input placeholder="name@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <FormField control={form.control} name="password" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Xác nhận mật khẩu</FormLabel>
                            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    {/* Thay đổi 4: Cập nhật nút Submit */}
                    <motion.div variants={itemVariants}>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Tạo tài khoản
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </CardContent>
            {/* Thay đổi 5: Cập nhật link footer */}
            <CardFooter className="flex justify-center text-sm">
                Đã có tài khoản?{" "}
                <Link href="/login" className="underline ml-1">
                    Đăng nhập
                </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}