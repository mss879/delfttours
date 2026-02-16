'use client';

import { motion } from 'framer-motion';

const topImages = [
  '/assets/external/gallery-top-1.png',
  '/assets/external/gallery-top-2.png',
  '/assets/external/gallery-top-3.png',
  '/assets/external/gallery-top-4.png',
  '/assets/external/gallery-top-5.png',
  '/assets/external/gallery-top-6.png',
];

const bottomImages = [
  '/assets/external/gallery-bottom-1.jpg',
  '/assets/external/gallery-bottom-2.jpg',
  '/assets/external/gallery-bottom-3.jpg',
  '/assets/external/gallery-bottom-4.jpg',
  '/assets/external/gallery-bottom-5.jpg',
  '/assets/external/gallery-bottom-6.jpg',
];

export default function GallerySection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Discover the Moments
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore our gallery for stunning travel photos and the best vibes from Delft Tours!
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Top Row - Moving Left */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 flex-nowrap"
            animate={{ x: '-50%' }}
            transition={{
              ease: 'linear',
              duration: 40,
              repeat: Infinity,
            }}
            style={{ width: 'fit-content' }}
          >
            {[...topImages, ...topImages].map((src, index) => (
              <div
                key={`top-${index}`}
                className="relative h-[200px] md:h-[300px] w-auto shrink-0 rounded-xl overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="h-full w-auto object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Moving Right */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 flex-nowrap"
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
                className="relative h-[200px] md:h-[300px] w-auto shrink-0 rounded-xl overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="h-full w-auto object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
