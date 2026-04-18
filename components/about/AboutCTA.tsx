"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutCTA() {
    return (
        <section className="w-full py-[120px] px-4 sm:px-6 content-center mx-auto max-w-[1440px]">
            <div className="relative w-full rounded-[48px] bg-[#001D22] overflow-hidden px-6 py-16 md:px-16 md:py-24 text-center">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 opacity-10 w-[30rem] h-[30rem] pointer-events-none">
                    <Image src="/assets/external/feature-icon-1.svg" alt="" fill className="object-cover invert" />
                </div>
                
                <div className="relative z-10 mx-auto max-w-3xl space-y-8 flex flex-col items-center">
                    <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                        Ready to Experience the Magic of Sri Lanka?
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                        Let us plan your perfect getaway. Whether it is a romantic honeymoon, a family adventure, or a cultural immersion, we have the perfect itinerary for you.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 w-full">
                        <Link
                            href="/tours"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-[0_20px_50px_rgba(23,157,170,0.35)] transition hover:bg-green-700"
                        >
                            <span>Explore Our Tours</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                            </svg>
                        </Link>
                        <Link
                            href="/contact-us"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-colors shrink-0 font-semibold"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
