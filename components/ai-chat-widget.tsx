"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export function AiChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! 👋 How can I help you plan your perfect trip to Sri Lanka today?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;

        // Add user message via optimistic update
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: trimmedInput,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            // Prepare API payload (excluding the specific welcome ID if it causes issues, but role assistant is fine)
            const apiMessages = [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content,
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }

            // Add assistant message
            setMessages((prev) => [...prev, {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: data.content,
            }]);

        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, {
                id: `error-${Date.now()}`,
                role: "assistant",
                content: "I apologize, but I'm having trouble connecting right now. Please try again later or contact us directly at support@delfttours.com.",
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to render text with links
    const TypingIndicator = () => (
        <div className="flex gap-1 px-2 py-1">
            {[0, 1, 2].map((dot) => (
                <motion.div
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-gray-400"
                    initial={{ opacity: 0.4, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: dot * 0.2,
                    }}
                />
            ))}
        </div>
    );

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans"
                >
                    {/* Chat Window */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2 }}
                                className="flex h-[450px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[360px]"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between bg-[#0b3e63] px-4 py-3 text-white">
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white overflow-hidden border border-gray-200">
                                            <Image
                                                src="/delgyortoginallogo.png"
                                                alt="Delft Tours"
                                                fill
                                                className="object-contain p-1"
                                            />
                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">Delft Tours Support</h3>
                                            <p className="text-xs text-blue-100">Usually replies instantly</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                                    <div className="flex flex-col gap-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={cn(
                                                    "flex w-max max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 text-sm shadow-sm",
                                                    msg.role === "assistant"
                                                        ? "self-start rounded-tl-none bg-white text-gray-800"
                                                        : "self-end rounded-tr-none bg-[#0b3e63] text-white"
                                                )}
                                            >
                                                <div className="leading-relaxed text-sm">
                                                    <ReactMarkdown
                                                        components={{
                                                            a: ({ node, ...props }) => (
                                                                <a
                                                                    {...props}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-400 underline hover:text-blue-300"
                                                                />
                                                            ),
                                                            p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                                                            ul: ({ node, ...props }) => (
                                                                <ul {...props} className="ml-4 list-disc space-y-1" />
                                                            ),
                                                            ol: ({ node, ...props }) => (
                                                                <ol {...props} className="ml-4 list-decimal space-y-1" />
                                                            ),
                                                            li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                                                            strong: ({ node, ...props }) => (
                                                                <span {...props} className="font-bold text-current" />
                                                            ),
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex w-max items-center gap-2 rounded-2xl rounded-tl-none bg-white px-4 py-3 text-sm text-gray-500 shadow-sm">
                                                <TypingIndicator />
                                                <span className="text-xs">Typing...</span>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>

                                {/* Input Area */}
                                <form onSubmit={handleSubmit} className="border-t bg-white p-3">
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Ask about tours, bookings..."
                                            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-4 pr-12 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#0b3e63] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0b3e63]"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!inputValue.trim() || isLoading}
                                            className="absolute right-2 rounded-full bg-[#0b3e63] p-2 text-white transition-colors hover:bg-[#093554] disabled:cursor-not-allowed disabled:bg-gray-300"
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="mt-2 text-center text-[10px] text-gray-400">
                                        Powered by ARC AI
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 3D Tech Toggle Button */}
                    <div className="relative group flex items-center justify-center">
                        {/* Pulsing ring animation */}
                        {!isOpen && (
                            <span className="absolute inset-0 -z-10 h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75 duration-1000"></span>
                        )}

                        {/* Glow effect */}
                        <div className="absolute inset-0 -z-10 h-full w-full rounded-2xl bg-cyan-500/30 blur-xl transition-all group-hover:bg-cyan-400/50"></div>

                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95, translateY: 2 }}
                            className="relative flex h-14 w-14 items-center justify-center rounded-2xl 
                            bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-md
                            border border-white/20
                            text-white transition-all 
                            shadow-[0_4px_0_#0c4a6e,0_0_20px_rgba(6,182,212,0.5)] 
                            hover:shadow-[0_6px_0_#0c4a6e,0_0_25px_rgba(6,182,212,0.6)] 
                            active:shadow-[0_0_10px_rgba(6,182,212,0.4)] active:translate-y-[4px]"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6 drop-shadow-md" />
                            ) : (
                                <MessageCircle className="h-6 w-6 drop-shadow-md" />
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
