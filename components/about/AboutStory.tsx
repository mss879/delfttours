"use client";

import Image from "next/image";

export default function AboutStory() {
    return (
        <section className="relative w-full bg-white pt-16 pb-[120px] lg:pt-20">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-4 lg:grid lg:grid-cols-[minmax(0,0.95fr)_1fr] lg:items-center lg:px-6 xl:px-0">
                {/* Image Section */}
                <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[600px]">
                    <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden rounded-[48px] bg-slate-200 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
                        <Image
                            src="/faq.webp"
                            alt="Sri Lankan Culture"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 600px"
                        />
                    </div>
                    {/* Floating overlapping element */}
                    <div className="absolute -bottom-16 left-1/2 h-[180px] w-[280px] sm:h-[200px] sm:w-[320px] -translate-x-1/2 sm:-bottom-12 sm:left-auto sm:-right-8 sm:translate-x-0 z-10">
                        <div className="relative h-full w-full rounded-[40px] border-[10px] border-white bg-white shadow-[0_30px_90px_rgba(15,23,42,0.15)] overflow-hidden">
                            <Image
                                src="/package_images/SL-5D4N-WLD-03.webp"
                                alt="Authentic Travel"
                                fill
                                className="rounded-[30px] object-cover"
                                sizes="(max-width: 640px) 280px, 320px"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative flex flex-col gap-6 lg:pl-8">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Rooted in Culture</span>
                    <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                        Driven by Passion
                    </h2>
                    <div className="space-y-4 text-base text-slate-600 sm:text-lg">
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

                    <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center gap-3 rounded-full bg-[#E8EEFF]/60 px-6 py-3">
                            <Image
                                src="https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a405410e4b22f9acd0b3_%EF%81%BC.png"
                                alt="Checkmark"
                                width={20}
                                height={20}
                                className="flex-shrink-0"
                            />
                            <span className="font-semibold text-slate-800">Certified Guides</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-full bg-[#F6EFFF]/60 px-6 py-3">
                            <Image
                                src="https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a405410e4b22f9acd0b3_%EF%81%BC.png"
                                alt="Checkmark"
                                width={20}
                                height={20}
                                className="flex-shrink-0"
                            />
                            <span className="font-semibold text-slate-800">Local Experts</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
