"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PopupModal } from "react-calendly";

export function MeetingWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Wait for mount to access document
        setRootElement(document.getElementById("root") || document.body);
    }, []);

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

    if (!rootElement) return null;

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4 font-sans"
                    >
                        {/* 3D Tech Toggle Button */}
                        <div className="relative group flex items-center justify-center">
                            {/* Glow effect */}
                            <div className="absolute inset-0 -z-10 h-full w-full rounded-2xl bg-cyan-500/30 blur-xl transition-all group-hover:bg-cyan-400/50"></div>

                            <motion.button
                                onClick={() => setIsOpen(true)}
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
                                <Calendar className="h-6 w-6 drop-shadow-md" />
                            </motion.button>
                            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg 
                            bg-white/90 backdrop-blur-sm border border-white/20
                            px-3 py-1 text-sm font-medium text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Book a Meeting
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <PopupModal
                url="https://calendly.com/delfttours-support/30min"
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={rootElement}
            />
        </>
    );
}
