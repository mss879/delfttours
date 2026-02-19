"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutStats() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 bg-[#0b3e63]">
                <div className="absolute inset-0 bg-[url('/package_images/SL-5D4N-WLD-03.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b3e63] via-transparent to-[#0b3e63]/80"></div>
            </div>

            <div className="container relative mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-5xl rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-2xl backdrop-blur-md"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {[
                            { label: "Happy Travelers", value: "5000+" },
                            { label: "Tours Completed", value: "1200+" },
                            { label: "Destinations", value: "50+" },
                        ].map((stat, i) => (
                            <div key={i} className="pt-8 md:pt-0 first:pt-0 px-4">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                                    {stat.value}
                                </div>
                                <div className="text-indigo-200 text-lg font-medium tracking-wide uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
