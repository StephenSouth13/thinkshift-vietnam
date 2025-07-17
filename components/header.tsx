"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const pathname = usePathname();

  useEffect(() => {
    const checkScroll = () => setIsScrolled(window.scrollY > 10);
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/assessment", label: "Đánh giá" },
    { href: "/blog", label: "Blog" },
    { href: "/co-learning", label: "Co-Learning" },
    { href: "/mentoring", label: "Mentoring" },
  ];

  const textColorClass = isScrolled ? "text-foreground" : "text-white";
  const textMutedColorClass = isScrolled
    ? "text-foreground/70"
    : "text-white/80";

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out group/header transition-colors",
        isScrolled
          ? "shadow-lg bg-white/80 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-black backdrop-blur-xl"
          : "bg-transparent",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/header:opacity-100"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 h-24 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-4 z-10 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-navy to-blue-accent rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">TS</span>
            </div>
          </motion.div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-xl leading-none">
              <span
                className={cn("transition-colors duration-300", textColorClass)}
              >
                ThinkShift
              </span>
            </span>
            <span className="text-sm text-blue-accent font-medium">
              Vietnam
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 z-10">
          <div
            className="relative flex items-center gap-2 text-sm font-medium"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 transition-colors duration-300 z-10",
                    isActive ? textColorClass : textMutedColorClass,
                    !isActive && hoveredItem === item.href
                      ? textColorClass
                      : "",
                  )}
                  onMouseEnter={() => setHoveredItem(item.href)}
                >
                  {item.label}
                  {(isActive || hoveredItem === item.href) && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-accent/10 dark:bg-blue-accent/20"
                      layoutId="hover-capsule"
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              asChild
              className={cn(
                !isScrolled &&
                  "bg-blue-accent/10 border-blue-accent/20 text-white hover:bg-blue-accent/20",
              )}
            >
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button size="sm" asChild className="group/cta">
              <Link href="/assessment">
                Bắt đầu Đánh giá
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2 z-10">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/10"
              >
                <Menu className="h-6 w-6 text-blue-accent" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background text-foreground border-l border-border px-6 pt-10"
            >
              <div className="flex flex-col gap-5 text-base font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md transition-colors duration-200",
                      pathname === item.href
                        ? "text-blue-accent font-semibold bg-blue-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/10",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-border flex flex-col gap-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Đăng nhập</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/assessment">
                    Bắt đầu Đánh giá
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-navy via-blue-accent to-navy",
            "transition-opacity duration-500",
            isScrolled ? "opacity-[.85] dark:opacity-90" : "opacity-0",
          )}
          aria-hidden="true"
        />
      </div>
    </motion.header>
  );
}
