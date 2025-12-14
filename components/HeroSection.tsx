'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

type Slide = {
  title: string;
  description: string;
  image: string;
};

const slideData: Slide[] = [
  {
    title: 'Explore stays in traditional destinations',
    description: 'Lorem ipsum dolor sit amet consectetur massa pulvinar.',
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Discover the wonders of the frozen frontier',
    description: 'Lorem ipsum dolor sit amet consectetur massa pulvinar.',
    image:
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function HeroSection() {
  const slides = slideData;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setReduceMotion(event.matches);
    };

    handleChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) {
      return;
    }

    const timeout = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timeout);
  }, [isPaused, reduceMotion, slides.length]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className="mx-auto mt-6 flex w-full max-w-[1440px] flex-col px-4">
      {/* Main Image Carousel */}
      <div
        className="relative z-10 overflow-hidden rounded-[36px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured destinations"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[520px] w-full sm:h-[600px]">
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ease-out ${
                index === current ? 'z-20 opacity-100' : 'pointer-events-none opacity-0'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
            >
              <Image
                src={slide.image}
                alt="Hero background"
                fill
                className="-z-10 object-cover"
                priority={index === 0}
              />
              <div className="-z-10 absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
              <div className="mx-auto max-w-3xl space-y-4 text-white">
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl sm:leading-snug md:text-5xl md:leading-[1.15]">
                  {slide.title}
                </h1>
                <p className="text-base text-white/80 sm:text-lg">
                  {slide.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={`h-2 w-2 rounded-full border border-white/50 transition-all duration-300 ease-out ${
                index === current ? 'scale-110 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.35)]' : 'bg-white/30 hover:bg-white/60'
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === current}
            />
          ))}
        </div>
      </div>

      {/* Floating Reviews Box (Replacing Logo Carousel) */}
      <div className="relative -mt-12 z-30 flex justify-center px-4">
        <div className="relative z-30 w-full max-w-[1080px] rounded-[48px] bg-white px-8 py-10 shadow-[0_30px_120px_rgba(15,23,42,0.12)]">
           <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center">
              {/* Review 1 */}
              <div className="flex flex-col items-center gap-3">
                <img 
                  src="https://framerusercontent.com/images/mTpOnAfGxjZE7Z7TD3u2q9l1nG0.svg?width=75&height=32" 
                  alt="Logo" 
                  className="h-8 w-auto object-contain" 
                />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFC947] text-[#FFC947]" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-900">
                  <span className="font-bold">4.5/5</span> <span className="text-slate-500">Rating</span>
                </p>
              </div>

              <div className="hidden md:block w-px h-16 bg-slate-200" />

              {/* Review 2 */}
              <div className="flex flex-col items-center gap-3">
                <img 
                  src="https://framerusercontent.com/images/HuoVn1mDCC4O7up0AjLEAe3EQ0o.svg?width=75&height=32" 
                  alt="Logo" 
                  className="h-8 w-auto object-contain" 
                />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFC947] text-[#FFC947]" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-900">
                  <span className="font-bold">4.5/5</span> <span className="text-slate-500">Rating</span>
                </p>
              </div>

              <div className="hidden md:block w-px h-16 bg-slate-200" />

              {/* Review 3 */}
              <div className="flex flex-col items-center gap-3">
                <img 
                  src="https://framerusercontent.com/images/irZerHv0KOVqAzYvSe5OSulXw.svg?width=128&height=32" 
                  alt="Logo" 
                  className="h-8 w-auto object-contain" 
                />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFC947] text-[#FFC947]" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-900">
                  <span className="font-bold">4.5/5</span> <span className="text-slate-500">Rating</span>
                </p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
