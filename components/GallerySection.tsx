'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const topImages = [
  '/gallery/whatsapp-image-2026-03-31-at-2-29-12-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-2-29-12-pm.webp',
  '/gallery/whatsapp-image-2026-03-31-at-2-29-13-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-2-29-13-pm.webp',
  '/gallery/whatsapp-image-2026-03-31-at-2-29-14-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-2-29-14-pm-2.webp',
  '/gallery/whatsapp-image-2026-03-31-at-2-59-53-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-2-59-54-pm.webp',
];

const bottomImages = [
  '/gallery/whatsapp-image-2026-03-31-at-3-00-13-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-3-00-04-pm-2.webp',
  '/gallery/whatsapp-image-2026-03-31-at-3-00-06-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-3-00-16-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-3-00-17-pm-2.webp',
  '/gallery/whatsapp-image-2026-03-31-at-3-00-19-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-3-00-24-pm-1.webp',
  '/gallery/whatsapp-image-2026-03-31-at-3-00-47-pm.webp',
];

export default function GallerySection() {
  return (
    <section className="relative py-16 overflow-hidden bg-slate-50 font-sans border-t border-slate-100">
      {/* Abstract Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 h-[400px] w-[400px] rounded-full bg-[#0b3e63]/5 blur-[100px]" />
        <div className="absolute bottom-0 -right-1/4 h-[400px] w-[400px] rounded-full bg-[#FFC947]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 mb-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-light tracking-tight text-slate-900 md:text-4xl">
            Discover the <span className="font-semibold text-[#0b3e63]">Moments</span>
          </h2>
          <p className="mx-auto max-w-xl text-base font-light text-slate-500">
            A visual exploration of the incredible experiences waiting for you in Sri Lanka.
          </p>
        </div>
      </div>

      {/* Carousels Container */}
      <div className="relative z-10 flex flex-col gap-4 md:gap-5">
        <div className="absolute inset-y-0 left-0 z-20 w-[12%] bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 z-20 w-[12%] bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

        {/* Top Row - Moving Left */}
        <div className="flex overflow-hidden group">
          <motion.div
            className="flex gap-4 flex-nowrap pl-4"
            animate={{ x: '-50%' }}
            transition={{
              ease: 'linear',
              duration: 35,
              repeat: Infinity,
            }}
            style={{ width: 'fit-content' }}
          >
            {[...topImages, ...topImages].map((src, index) => (
              <div
                key={`top-${index}`}
                className="relative h-[160px] w-[240px] md:h-[180px] md:w-[280px] shrink-0 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 hover:scale-[1.03] border border-slate-200 bg-white"
              >
                <Image
                  src={src}
                  alt={`Delft Tours Gallery ${index + 1}`}
                  fill
                  quality={65}
                  className="object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                  sizes="(max-width: 768px) 240px, 280px"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Moving Right */}
        <div className="flex overflow-hidden group">
          <motion.div
            className="flex gap-4 flex-nowrap pr-4"
            initial={{ x: '-50%' }}
            animate={{ x: '0%' }}
            transition={{
              ease: 'linear',
              duration: 40,
              repeat: Infinity,
            }}
            style={{ width: 'fit-content' }}
          >
            {[...bottomImages, ...bottomImages].map((src, index) => (
              <div
                key={`bottom-${index}`}
                className="relative h-[160px] w-[240px] md:h-[180px] md:w-[280px] shrink-0 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 hover:scale-[1.03] border border-slate-200 bg-white"
              >
                <Image
                  src={src}
                  alt={`Delft Tours Gallery ${index + 1}`}
                  fill
                  quality={65}
                  className="object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                  sizes="(max-width: 768px) 240px, 280px"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mt-10 flex justify-center">
        <Link 
          href="/gallery"
          className="rounded-full border border-slate-200 bg-white/60 px-6 py-2.5 text-sm font-medium text-slate-700 backdrop-blur-md transition-all hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-105 active:scale-95"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  );
}
