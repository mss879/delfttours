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
    title: 'Discover the ancient wonders of Sigiriya',
    description: 'Climb the legendary Lion Rock fortress and explore centuries of Sri Lankan heritage.',
    image: '/hero5.jpeg',
  },
  {
    title: 'Experience the sacred beauty of Kandy',
    description: 'Visit the Temple of the Tooth and stroll along the serene Kandy Lake at dusk.',
    image: '/hero4.jpeg',
  },
  {
    title: 'Wander through the misty hills of Nuwara Eliya',
    description: 'Immerse yourself in lush tea plantations and breathtaking highland scenery.',
    image: '/hero2.jpeg',
  },
  {
    title: 'Unwind on the golden shores of the south coast',
    description: 'Relax on pristine beaches and watch spectacular sunsets over the Indian Ocean.',
    image: '/hero1.jpeg',
  },
  {
    title: 'Explore the wild heart of Yala National Park',
    description: 'Encounter leopards, elephants, and exotic wildlife on an unforgettable safari adventure.',
    image: '/hero3.jpeg',
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
        aria-label="Featured Sri Lankan destinations"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[520px] w-full sm:h-[600px]">
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ease-out ${index === current ? 'z-20 opacity-100' : 'pointer-events-none opacity-0'
                }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
            >
              <Image
                src={slide.image}
                alt={`Hero background featuring ${slide.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                quality={60}
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
              className={`h-2 w-2 rounded-full border border-white/50 transition-all duration-300 ease-out ${index === current ? 'scale-110 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.35)]' : 'bg-white/30 hover:bg-white/60'
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
        <div className="relative z-30 w-full max-w-[1080px] rounded-[28px] md:rounded-[48px] bg-white px-4 py-6 md:px-8 md:py-10 shadow-[0_30px_120px_rgba(15,23,42,0.12)]">
          <div className="flex flex-row gap-4 md:gap-24 items-center justify-center">
            {/* Review 1 */}
            <div className="flex flex-col items-center gap-1.5 md:gap-3">
              <Image
                src="/assets/external/review-logo-1.svg"
                alt="Logo"
                width={75}
                height={32}
                className="h-5 md:h-8 w-auto object-contain"
              />
              <div className="flex gap-0.5 md:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-5 md:h-5 fill-[#FFC947] text-[#FFC947]" />
                ))}
              </div>
              <p className="text-[10px] md:text-sm font-medium text-slate-900">
                <span className="font-bold">4.5/5</span> <span className="text-slate-500">Rating</span>
              </p>
            </div>

            <div className="block w-px h-12 md:h-16 bg-slate-200" />

            {/* Review 2 */}
            <div className="flex flex-col items-center gap-1.5 md:gap-3">
              <Image
                src="/assets/external/review-logo-2.svg"
                alt="Logo"
                width={75}
                height={32}
                className="h-5 md:h-8 w-auto object-contain"
              />
              <div className="flex gap-0.5 md:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-5 md:h-5 fill-[#FFC947] text-[#FFC947]" />
                ))}
              </div>
              <p className="text-[10px] md:text-sm font-medium text-slate-900">
                <span className="font-bold">4.5/5</span> <span className="text-slate-500">Rating</span>
              </p>
            </div>

            <div className="block w-px h-12 md:h-16 bg-slate-200" />

            {/* Review 3 */}
            <div className="flex flex-col items-center gap-1.5 md:gap-3">
              <Image
                src="/assets/external/review-logo-3.svg"
                alt="Logo"
                width={128}
                height={32}
                className="h-5 md:h-8 w-auto object-contain"
              />
              <div className="flex gap-0.5 md:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-5 md:h-5 fill-[#FFC947] text-[#FFC947]" />
                ))}
              </div>
              <p className="text-[10px] md:text-sm font-medium text-slate-900">
                <span className="font-bold">4.5/5</span> <span className="text-slate-500">Rating</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
