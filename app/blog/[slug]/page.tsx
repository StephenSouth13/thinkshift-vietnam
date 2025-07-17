// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Import kiểu 'Post' để sử dụng trong code
import { blogPosts, type Post } from "@/data/posts";

/**
 * Hàm tìm bài viết dựa trên slug.
 * Đây là một Server-side function.
 * @param slug - The slug of the post to find.
 * @returns The post object or undefined if not found.
 */
function getPostBySlug(slug: string): Post | undefined {
  return blogPosts.find((post: Post) => post.slug === slug);
}

/**
 * Đây là component trang chi tiết bài viết.
 * Nó là một Server Component, render ở phía server.
 */
export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  // Nếu không tìm thấy bài viết, gọi hàm notFound() của Next.js
  // để render trang 404 chuẩn.
  if (!post) {
    notFound();
  }

  // Lọc ra các bài viết khác, loại trừ bài hiện tại
  const otherPosts = blogPosts
    .filter((p: Post) => p.id !== post.id)
    .slice(0, 5); // Lấy 5 bài để không quá dài

  return (
    <div className="bg-background text-foreground min-h-screen antialiased">
      <div className="container mx-auto px-4 pt-24 pb-20 sm:pt-32">
        {/* Phần nội dung chính của bài viết */}
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-accent hover:text-blue-accent/80 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Trở về trang Blog</span>
          </Link>

          <div>
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-accent/10 text-blue-accent border-none w-fit"
            >
              {post.category}
            </Badge>
            <h1 className="font-bold tracking-tight text-3xl md:text-5xl mb-6 text-foreground leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-accent/10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <article
            className="prose prose-neutral prose-lg max-w-none dark:prose-invert
                               prose-p:text-muted-foreground 
                               prose-headings:text-foreground 
                               prose-strong:text-blue-accent
                               prose-a:text-blue-accent hover:prose-a:text-blue-accent/80
                               prose-ul:text-muted-foreground
                               prose-ol:text-muted-foreground
                               prose-li:marker:text-blue-accent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Phần các bài viết khác với thanh cuộn ngang */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Khám phá thêm các bài viết khác
          </h2>
          <div
            className="flex overflow-x-auto gap-8 pb-6 -mx-4 px-4
                                [&::-webkit-scrollbar]:h-2
                                [&::-webkit-scrollbar-thumb]:bg-muted-foreground
                                [&::-webkit-scrollbar-track]:bg-muted/50
                                [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {otherPosts.map((otherPost: Post) => (
              <div key={otherPost.id} className="flex-shrink-0 w-80">
                <Card className="h-full flex flex-col bg-card border border-border hover:border-blue-accent/50 transition-all duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <Link href={`/blog/${otherPost.slug}`} className="block">
                      <img
                        src={otherPost.image}
                        alt={otherPost.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <Badge
                      variant="secondary"
                      className="mb-2 bg-blue-accent/10 text-blue-accent border-none w-fit text-xs"
                    >
                      {otherPost.category}
                    </Badge>
                    <h3 className="font-semibold text-md mb-3 text-foreground flex-grow">
                      <Link
                        href={`/blog/${otherPost.slug}`}
                        className="hover:text-blue-accent transition-colors line-clamp-2"
                      >
                        {otherPost.title}
                      </Link>
                    </h3>
                    <div className="mt-auto pt-3 border-t border-border">
                      <Link
                        href={`/blog/${otherPost.slug}`}
                        className="text-sm text-blue-accent flex items-center gap-1 hover:underline"
                      >
                        Đọc ngay <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
