'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';

const reels = [
  {
    video: 'https://framerusercontent.com/assets/l43FyZ3qCpNnvEK8XWcf6v93k.mp4',
    poster: 'https://framerusercontent.com/images/dJTjmrJtws5c9SmqI6Y5fZ8FsM.png',
    location: 'Caribbean Paradise',
    title: 'Cruise Through Crystal-clear Waters and Hidden Coves'
  },
  {
    video: 'https://framerusercontent.com/assets/dbrXBXe4pO3kt63lhD42WQTBxjs.mp4',
    poster: 'https://framerusercontent.com/images/zpEgpWYJnw7sDSCdJtNqw8T60.png',
    location: 'Tropical Bliss in Bali',
    title: 'Vibrant Culture and Lush Landscapes'
  },
  {
    video: 'https://framerusercontent.com/assets/YcFZbOaZ4RjNam9Bd4KChzQT0.mp4',
    poster: 'https://framerusercontent.com/images/o8SlsZcs1I5ZaAYyOmMXq66E3o.png',
    location: 'Mystic Himalayas',
    title: 'Spiritual Journeys in the Nepal & Bhutan'
  },
  {
    video: 'https://framerusercontent.com/assets/Pgk0JwTRpm9waRscsPpOy6UQMIs.mp4',
    poster: 'https://framerusercontent.com/images/zPBZekYhLoLyPxuBt3F2NM7z9EI.png',
    location: 'Parisian Romance',
    title: 'The Ultimate Getaway in the City of Lights'
  },
  {
    video: 'https://framerusercontent.com/assets/Nm8qYRSzb3MYamc7cI7V905koc.mp4',
    poster: 'https://framerusercontent.com/images/e8uMxjWmXJVjKcmbrPdISV00U.png',
    location: 'Jewel of the Maldives',
    title: 'Exclusive Overwater Villas and Pristine Lagoons'
  },
  {
    video: 'https://framerusercontent.com/assets/O6x2xwf3LpEl6RsJKivXVwsrhM.mp4',
    poster: 'https://framerusercontent.com/images/HX82sWDaR9gExqzdlcKyDhJAPs.png',
    location: 'Alpine Haven',
    title: 'Scenic Swiss Mountain Adventures'
  },
  {
    video: 'https://framerusercontent.com/assets/RjLjpljzuXAO9JFgiAduNCGiLeg.mp4',
    poster: 'https://framerusercontent.com/images/ZQcROWyXQsr8VzX8SehmIVWxO8.png',
    location: 'Cox’s Bazar Bliss',
    title: 'Relax at the World’s Longest Unbroken Sandy Sea Beach'
  }
];

export default function ReelsSection() {
  const [itemsToShow, setItemsToShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(reels.length);
  const [isResetting, setIsResetting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const extendedReels = [...reels, ...reels, ...reels];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => setIsResetting(false), 50);
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isResetting) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isResetting]);

  const nextSlide = () => {
    if (!isResetting) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isResetting) setCurrentIndex((prev) => prev - 1);
  };

  const handleAnimationComplete = () => {
    if (currentIndex >= reels.length * 2) {
      setIsResetting(true);
      setCurrentIndex(currentIndex - reels.length);
    } else if (currentIndex < reels.length) {
      setIsResetting(true);
      setCurrentIndex(currentIndex + reels.length);
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Travel Stories You Can Feel</h2>
          <p className="text-lg text-slate-600">Inspiring destinations, unforgettable memories.</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
              transition={{ duration: isResetting ? 0 : 0.5, ease: "easeInOut" }}
              onAnimationComplete={handleAnimationComplete}
            >
              {extendedReels.map((reel, index) => (
                <div 
                  key={index} 
                  className="shrink-0 px-2"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="aspect-[3/4] relative rounded-2xl overflow-hidden group w-full">
                    <video
                      src={reel.video}
                      poster={reel.poster}
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-white" />
                        <span className="text-sm font-medium">{reel.location}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight">{reel.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-[#0b3e63] flex items-center justify-center hover:bg-[#082c46] transition-colors shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-[#0b3e63] flex items-center justify-center hover:bg-[#082c46] transition-colors shadow-lg"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
