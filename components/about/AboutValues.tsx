import React from "react";
import { MapPin, Users, Heart, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

const values = [
    {
        title: "Authentic Experiences",
        description:
            "We take you off the beaten path to discover the real Sri Lanka, connecting you with local communities and hidden treasures.",
        icon: MapPin,
    },
    {
        title: "Tailor-Made Itineraries",
        description:
            "Every traveler is unique. We customize every aspect of your trip to match your preferences, pace, and interests.",
        icon: Star,
    },
    {
        title: "24/7 Local Support",
        description:
            "Our dedicated team is available around the clock to ensure your journey is smooth, safe, and worry-free.",
        icon: ShieldCheck,
    },
    {
        title: "Sustainability First",
        description:
            "We are committed to eco-friendly practices and supporting local economies to preserve our beautiful island.",
        icon: Heart,
    },
];

export default function AboutValues() {
    return (
        <section className="bg-white text-slate-900 relative z-30 py-20 md:py-32">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
                {/* Left Interactive Side */}
                <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-24 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-20 border-r border-slate-100 bg-white">
                    <div className="flex flex-col gap-12 max-w-xl">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                                Why Choose Delft Tours?
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We go the extra mile to ensure your journey is seamless, safe,
                                and spectacular. Here is what sets us apart.
                            </p>
                        </div>

                        <div className="w-64 h-64 md:w-80 md:h-80 mt-8 mx-auto lg:mx-0 relative rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/faq.jpeg"
                                alt="Why Choose Us"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Content Side */}
                <div className="w-full lg:w-1/2 bg-white">
                    <div className="flex flex-col">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group border-b border-slate-100 p-6 md:p-8 lg:p-10 hover:bg-slate-50 transition-colors duration-300 min-h-[180px] flex flex-col justify-center gap-5 cursor-default"
                            >
                                <div className="flex justify-between items-start w-full">
                                    <div className="w-12 h-12 md:w-16 md:h-16 inline-flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <value.icon className="h-6 w-6 md:h-8 md:w-8" />
                                    </div>
                                    <span className="text-slate-200 text-2xl font-bold group-hover:text-indigo-100 transition-colors">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-500 text-base leading-relaxed max-w-lg">
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
