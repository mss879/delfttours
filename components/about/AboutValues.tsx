"use client";

import React from "react";
import Image from "next/image";

const values = [
    {
        icon: '/assets/external/feature-icon-1.svg',
        title: "Authentic Experiences",
        description: "We take you off the beaten path to discover the real Sri Lanka, connecting you with local communities.",
        bg: 'bg-[#E8EEFF]/60',
    },
    {
        icon: '/assets/external/feature-icon-2.svg',
        title: "Tailor-Made Itineraries",
        description: "Every traveler is unique. We customize every aspect of your trip to match your preferences and interests.",
        bg: 'bg-[#F6EFFF]/60',
    },
    {
        icon: '/assets/external/feature-icon-3.svg',
        title: "24/7 Local Support",
        description: "Our dedicated team is available around the clock to ensure your journey is smooth, safe, and worry-free.",
        bg: 'bg-[#FFEFEF]/60',
    },
    {
        icon: '/assets/external/feature-icon-4.svg',
        title: "Sustainability First",
        description: "We are committed to eco-friendly practices and supporting local economies to preserve our island.",
        bg: 'bg-[#FFF1D8]/60',
    },
];

export default function AboutValues() {
    return (
        <section className="mx-auto w-full max-w-[1440px] px-6 lg:px-20 py-[120px]">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
                {/* Left Side text */}
                <div className="w-full lg:w-1/3 space-y-6">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Core Values</span>
                    <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                        Why Choose<br/>Delft Tours?
                    </h2>
                    <p className="text-lg text-slate-600">
                        We go the extra mile to ensure your journey is seamless, safe, and spectacular. Here is what sets us apart.
                    </p>
                </div>

                {/* Right Side Grid */}
                <div className="w-full lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {values.map((value, index) => (
                            <div key={index} className="flex gap-6 items-start">
                                <div className={`w-16 h-16 rounded-2xl ${value.bg} flex items-center justify-center shrink-0`}>
                                    <Image src={value.icon} alt={value.title} width={32} height={32} className="w-8 h-8" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
