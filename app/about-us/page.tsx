'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Heart, ShieldCheck, Globe, Clock, Star, Award } from 'lucide-react';
import Link from 'next/link';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function AboutUsPage() {
    return (
        <div className="font-sans text-slate-900">
            <Header />
            {/* Hero Section */}
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
                            Your gateway to authentic, luxurious, and unforgettable Sri Lankan experiences. We don't just plan tours; we craft memories.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Introduction / Our Story */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src="/package_images/SL-6D5N-STD-01.jpg" // Moved from Hero (Sigiriya)
                                    alt="Sri Lankan Culture"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 hidden aspect-square w-64 overflow-hidden rounded-full border-8 border-white shadow-xl lg:block">
                                <img
                                    src="/package_images/SL-5D4N-WLD-03.jpg" // Wildlife/Elephant
                                    alt="Happy Travelers"
                                    className="h-full w-full object-cover"
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
                                    Delft Tours was born from a simple yet profound love for Sri Lanka—the pearl of the Indian Ocean. We started as a small team of local enthusiasts who wanted to show the world the true essence of our island home, beyond the guidebooks and tourist traps.
                                </p>
                                <p>
                                    Today, we are a premier travel agency dedicated to curating bespoke journeys that blend luxury, adventure, and authenticity. From the misty tea plantations of Nuwara Eliya to the pristine beaches of Mirissa, we know every hidden gem and secret spot.
                                </p>
                                <p>
                                    Our mission is to provide you with more than just a holiday. We want you to feel the warmth of our hospitality, taste the richness of our spices, and witness the grandeur of our heritage.
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

            {/* Why Choose Us - Values */}
            <section className="bg-slate-50 py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="mb-4 font-headings text-3xl font-bold text-slate-900 md:text-5xl">
                            Why Choose Delft Tours?
                        </h2>
                        <p className="text-lg text-slate-600">
                            We go the extra mile to ensure your journey is seamless, safe, and spectacular. Here is what sets us apart.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                    <value.icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900">{value.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="container relative mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Happy Travelers", value: "5000+" },
                            { label: "Tours Completed", value: "1200+" },
                            { label: "Destinations", value: "50+" },
                            { label: "Design Awards", value: "15" }
                        ].map((stat, i) => (
                            <div key={i} className="p-4">
                                <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.value}</div>
                                <div className="text-slate-300 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative overflow-hidden rounded-[3rem] bg-[#0b3e63] px-6 py-16 text-center shadow-2xl md:px-12 md:py-24">
                        {/* Background decorative styling */}
                        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl"></div>

                        <div className="relative z-10 mx-auto max-w-4xl">
                            <h2 className="mb-6 font-headings text-3xl font-bold text-white md:text-5xl leading-tight">
                                Ready to Experience the Magic of Sri Lanka?
                            </h2>
                            <p className="mb-10 text-xl text-indigo-100">
                                Let us plan your perfect getaway. Whether it's a romantic honeymoon, a family adventure, or a cultural immersion, we have the perfect itinerary for you.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/tours"
                                    className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-indigo-600 shadow-lg transition-transform hover:scale-105 active:scale-95"
                                >
                                    Explore Our Tours
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/30 bg-transparent px-8 text-lg font-bold text-white transition-colors hover:bg-white/10"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

const values = [
    {
        title: 'Authentic Experiences',
        description: 'We take you off the beaten path to discover the real Sri Lanka, connecting you with local communities and hidden treasures.',
        icon: MapPin,
    },
    {
        title: 'Tailor-Made Itineraries',
        description: 'Every traveler is unique. We customize every aspect of your trip to match your preferences, pace, and interests.',
        icon: Star,
    },
    {
        title: '24/7 Local Support',
        description: 'Our dedicated team is available around the clock to ensure your journey is smooth, safe, and worry-free.',
        icon: ShieldCheck,
    },
    {
        title: 'Sustainability First',
        description: 'We are committed to eco-friendly practices and supporting local economies to preserve our beautiful island.',
        icon: Heart,
    },
];
