"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutHero() {
    return (
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-[#0b3e63]">
            <div className="absolute inset-0 bg-[#0b3e63]" />
            <div className="relative flex h-full items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-indigo-400"
                    >
                        Discover Our Story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 font-headings text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
                    >
                        We Are Delft Tours
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mx-auto max-w-2xl text-lg text-slate-200 md:text-xl"
                    >
                        Your gateway to authentic, luxurious, and unforgettable Sri Lankan
                        experiences. We don&apos;t just plan tours; we craft memories.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
