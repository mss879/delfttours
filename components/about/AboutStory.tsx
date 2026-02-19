"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Award } from "lucide-react";
import Image from "next/image";

export default function AboutStory() {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative max-w-md mx-auto"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                            <Image
                                src="/package_images/SL-6D5N-STD-01.jpg"
                                alt="Sri Lankan Culture"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 hidden aspect-square w-64 overflow-hidden rounded-full border-8 border-white shadow-xl lg:block">
                            <Image
                                src="/package_images/SL-5D4N-WLD-03.jpg"
                                alt="Happy Travelers"
                                fill
                                className="object-cover"
                                sizes="256px"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="mb-6 font-headings text-3xl font-bold text-slate-900 md:text-5xl">
                            Rooted in Culture, <span className="text-indigo-600">Driven by Passion</span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600">
                            <p>
                                Delft Tours was born from a simple yet profound love for Sri
                                Lanka—the pearl of the Indian Ocean. We started as a small team
                                of local enthusiasts who wanted to show the world the true
                                essence of our island home, beyond the guidebooks and tourist
                                traps.
                            </p>
                            <p>
                                Today, we are a premier travel agency dedicated to curating
                                bespoke journeys that blend luxury, adventure, and authenticity.
                                From the misty tea plantations of Nuwara Eliya to the pristine
                                beaches of Mirissa, we know every hidden gem and secret spot.
                            </p>
                            <p>
                                Our mission is to provide you with more than just a holiday. We
                                want you to feel the warmth of our hospitality, taste the
                                richness of our spices, and witness the grandeur of our
                                heritage.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-700">
                                <Award className="h-5 w-5" />
                                <span className="font-semibold">Certified Guides</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-700">
                                <Globe className="h-5 w-5" />
                                <span className="font-semibold">Local Experts</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
