"use client";

import Image from "next/image";

const statsData = [
  {
    value: '5000+',
    label: 'Happy Travelers',
    icon: 'https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a6938d8b59f2c7283b36_026-schedule.svg',
    alt: 'Calendar icon',
  },
  {
    value: '1200+',
    label: 'Tours Completed',
    icon: 'https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a69363b6e3f97282d820_011-dish.svg',
    alt: 'Destinations icon',
  },
  {
    value: '50+',
    label: 'Locations',
    icon: 'https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a6938689b891a24f5e53_018-beach.svg',
    alt: 'Beach icon',
  },
];

export default function AboutStats() {
    return (
        <section className="w-full bg-[#f8fcfb] py-[120px]">
            <div className="mx-auto w-full max-w-[1200px] px-6">
                <div className="flex flex-col items-center text-center gap-12">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                            The Impact in Numbers
                        </h2>
                        <p className="text-lg text-slate-600">
                            Quantifying the memories we have shaped across the pearl of the Indian Ocean. Every digit represents an unforgettable story.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 md:gap-32 w-full mt-4">
                        {statsData.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-4">
                            <Image
                                src={stat.icon}
                                alt={stat.alt}
                                width={64}
                                height={64}
                                className="h-16 w-16"
                            />
                            <div className="text-center mt-2">
                                <div className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-2">{stat.value}</div>
                                <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
