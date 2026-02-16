"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const destinations = [
  {
    title: 'Sigiriya',
    href: '/tours?destination=Sigiriya',
    image: '/sigiriya.webp',
  },
  {
    title: 'Kandy',
    href: '/tours?destination=Kandy',
    image: '/kandy.jpg',
  },
  {
    title: 'Nuwara Eliya',
    href: '/tours?destination=Nuwara%20Eliya',
    image: '/nuwaraeliya.webp',
  },
  {
    title: 'Galle',
    href: '/tours?destination=Galle',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop',
  },
];

export default function TopDestinations() {
  const [activeId, setActiveId] = useState<number | null>(0);

  return (
    <section className="hidden md:block relative mx-auto mt-24 w-full max-w-[1440px] px-4">
      <div className="pointer-events-none absolute left-1/2 top-[50%] h-[620px] w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-[320px] bg-[radial-gradient(circle_at_center,#EEF3F8_0%,rgba(238,243,248,0.55)_35%,rgba(238,243,248,0.2)_60%,rgba(238,243,248,0)_100%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-center px-4 text-center sm:px-8">
        <h2 className="text-[36px] font-semibold tracking-tight text-slate-900 md:text-[46px]">
          Choose your top destinations
        </h2>
        <div className="relative mt-10 flex w-full justify-center">
          <div className="pointer-events-none absolute left-1/2 top-[58%] h-[200px] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[180px] bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.15)_0%,rgba(15,23,42,0.1)_40%,rgba(15,23,42,0)_75%)]" />
          <div className="flex w-full max-w-[1040px] h-[400px] gap-4 justify-center items-stretch">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.title}
                className={cn(
                  "relative overflow-hidden rounded-[22px] cursor-pointer",
                  "shadow-[0_32px_70px_-26px_rgba(15,23,42,0.48)]"
                )}
                initial={{ flex: 1 }}
                animate={{
                  flex: activeId === index ? 3 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onHoverStart={() => setActiveId(index)}
              >
                <Link href={destination.href} className="absolute inset-0 z-20" />
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 280px"
                  className="object-cover"
                  priority={destination.title === 'USA'}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_60%,rgba(0,0,0,0.48)_100%)] pointer-events-none" />
                
                <div className="absolute inset-x-0 bottom-8 flex justify-center px-2 pointer-events-none z-10">
                  <motion.span
                    className={cn(
                      "text-[20px] font-semibold text-white whitespace-nowrap",
                      destination.title === 'USA' ? 'uppercase tracking-[0.18em]' : '',
                      "md:[writing-mode:horizontal-tb] [writing-mode:vertical-rl] rotate-180 md:rotate-0"
                    )}
                    style={{ textShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                    animate={{
                        opacity: 1,
                        scale: activeId === index ? 1.1 : 1,
                    }}
                  >
                    {destination.title}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
