"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function AboutHero() {
    return (
        <section className="mx-auto mt-6 md:mt-12 flex w-full max-w-[1440px] flex-col px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center justify-between pb-12 lg:pb-24">
                {/* Left Side Content */}
                <div className="lg:col-span-5 space-y-8 lg:pr-4 z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold uppercase tracking-[0.2em] text-green-600 flex items-center gap-3"
                    >
                        <span className="w-8 h-0.5 bg-green-600 block rounded-full"></span>
                        Our Story
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl font-extrabold leading-[1.15] text-slate-900 sm:text-5xl lg:text-5xl xl:text-6xl"
                    >
                        Journeys that <br className="hidden lg:block"/> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                            transform
                        </span> you.
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-600 leading-relaxed max-w-xl"
                    >
                        We do not just plan vacations. We immerse you in the authentic pulse of Sri Lanka, leading you through ancient paths, vibrant cultures, and untamed natural beauty. Let us show you our island home.
                    </motion.p>
                </div>
                
                {/* Right Side Image Gallery / Bento Layout */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="lg:col-span-7 relative h-[450px] sm:h-[550px] w-full rounded-[36px] sm:rounded-[48px] overflow-hidden shadow-[0_30px_120px_rgba(15,23,42,0.12)] group"
                >
                    <Image
                        src="/about-hero-image.png"
                        alt="Discover Sri Lanka misty tea plantations"
                        fill
                        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    
                    {/* Gradient Overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Badge overlay */}
                    <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-[24px] shadow-2xl flex items-center gap-5 transition-transform duration-500 hover:-translate-y-1 cursor-default">
                        <div className="w-14 h-14 rounded-[16px] bg-[#E8EEFF] flex items-center justify-center text-slate-900 border border-slate-100">
                            <span className="text-xl font-black">10+</span>
                        </div>
                        <div>
                            <div className="text-base font-bold text-slate-900">Years of</div>
                            <div className="text-sm font-medium text-slate-500">Local Expertise</div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Subtle separator below the hero area */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="w-full flex justify-center relative mt-[-2rem] z-10"
            >
                <div className="hidden lg:flex w-12 h-12 rounded-full bg-white border border-slate-200/60 items-center justify-center text-slate-400 shadow-sm -mt-6">
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
}
