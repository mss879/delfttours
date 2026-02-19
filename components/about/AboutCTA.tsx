import React from "react";
import Link from "next/link";

export default function AboutCTA() {
    return (
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
                            Let us plan your perfect getaway. Whether it&apos;s a romantic
                            honeymoon, a family adventure, or a cultural immersion, we have
                            the perfect itinerary for you.
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
    );
}
