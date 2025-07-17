// components/floating-ai.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Message,
  createMessage,
  getGreetingResponse,
  isGreeting,
} from "@/components/data/mockMessages";
import { getAIResponse } from "@/lib/ai-response-logic";

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    createMessage(
      "Xin chào 👋! Tôi là ThinkShift AI – trợ lý hướng nghiệp thông minh của ThinkShift Vietnam. Tôi có thể giúp bạn:\n\n🎯 Tư vấn định hướng nghề nghiệp\n📚 Gợi ý lộ trình học tập\n💡 Giải đáp thắc mắc về kỹ năng\n🤝 Kết nối với mentor phù hợp\n\nBạn cần hỗ trợ gì hôm nay?",
      false,
    ),
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userMsg = createMessage(input, true);
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = isGreeting(input)
        ? getGreetingResponse()
        : getAIResponse(input);

      const botMsg = createMessage(response, false);
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  return (
    <>
      {/* Floating button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 p-4 rounded-full bg-gradient-to-tr from-navy to-blue-accent text-white shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-fade-in cursor-pointer group"
      >
        <Bot
          size={28}
          className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
        />
      </button>

      {/* Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-4 w-[90vw] sm:w-[400px] max-h-[80vh] flex flex-col shadow-2xl border rounded-2xl bg-background z-50"
          >
            <div className="bg-gradient-to-r from-navy to-blue-accent text-white px-4 py-3 rounded-t-2xl text-sm font-medium flex items-center gap-2">
              <Bot size={18} /> ThinkShift AI – Trợ lý hướng nghiệp ✨
            </div>

            <ScrollArea className="h-[400px] p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      msg.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-line shadow-sm ${
                        msg.isUser
                          ? "bg-blue-accent text-white rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none border border-border"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </ScrollArea>

            <div className="p-3 border-t flex gap-2 items-center">
              <Input
                placeholder="Ví dụ: Tôi nên học gì để trở thành developer?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <Button size="icon" onClick={handleSubmit}>
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
