'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
    "Packing your bags...",
    "Checking travel documents...",
    "Fueling the adventure...",
    "Waking up the guides...",
    "Ready for Sri Lanka!",
];

const imagesToPreload = [
    '/hero1.jpeg',
    '/hero2.jpeg',
    '/hero3.jpeg',
    '/hero4.jpeg',
    '/hero5.jpeg',
];

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    // Preload images
    useEffect(() => {
        imagesToPreload.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    }, []);

    // Handle loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Keep preloader for 1.5 seconds for a snappier feel

        return () => clearTimeout(timer);
    }, []);

    // Typing animation logic
    useEffect(() => {
        if (!isLoading) return;

        let typingTimeout: NodeJS.Timeout;
        const currentPhrase = phrases[currentPhraseIndex];

        if (isTyping) {
            if (typedText.length < currentPhrase.length) {
                typingTimeout = setTimeout(() => {
                    setTypedText(currentPhrase.slice(0, typedText.length + 1));
                }, 50); // Typing speed
            } else {
                // Finished typing current phrase
                typingTimeout = setTimeout(() => {
                    setIsTyping(false);
                }, 600); // Wait before clearing
            }
        } else {
            if (typedText.length > 0) {
                typingTimeout = setTimeout(() => {
                    setTypedText(typedText.slice(0, -1));
                }, 30); // Deleting speed
            } else {
                // Finished deleting
                setIsTyping(true);
                setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
            }
        }

        return () => clearTimeout(typingTimeout);
    }, [typedText, isTyping, currentPhraseIndex, isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[100px]" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-100/50 blur-[100px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center px-4">
                        {/* Logo or Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
                            className="mb-8 relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24"
                        >
                            {/* Pure CSS pulsing indicator instead of image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full opacity-30 animate-ping" />
                            <div className="relative w-12 h-12 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-full shadow-lg" />
                        </motion.div>

                        {/* Typing Text */}
                        <div className="h-8 mb-2">
                            <motion.p
                                className="text-xl sm:text-2xl font-semibold text-slate-800 text-center"
                            >
                                {typedText}
                                <span className="animate-pulse text-blue-500">|</span>
                            </motion.p>
                        </div>

                        {/* Progress/Loading Bar */}
                        <motion.div
                            className="mt-8 h-1 w-48 sm:w-64 bg-slate-100 rounded-full overflow-hidden"
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3.2, ease: "easeInOut" }}
                            />
                        </motion.div>

                        <p className="mt-4 text-sm text-slate-400 font-medium tracking-wide">
                            DELFT TOURS
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
