'use client';

import { motion } from 'framer-motion';

const topImages = [
  'https://framerusercontent.com/images/MCPK7p5lTLN6GtYpPFkZlnYj0.png',
  'https://framerusercontent.com/images/irxbxcWqTT1XF46oYdrlKLmKfOE.png',
  'https://framerusercontent.com/images/0cyrgdyFgH4HXcbQey3Id3OdM.png',
  'https://framerusercontent.com/images/qzaQswFpybM7ehhvBpCnIyQR1D0.png',
  'https://framerusercontent.com/images/0YhgQURqbt0V1jk5DnLxnr8lQGM.png',
  'https://framerusercontent.com/images/NIOzuaQtTENMPhLTK3Aq3wMU3q0.png',
];

const bottomImages = [
  'https://framerusercontent.com/images/aXMmKMkmbaftgXqgLW6l6Ne4Yw.jpg',
  'https://framerusercontent.com/images/dW9aMqWFmgP5lFVORYj19sfPXlc.jpg',
  'https://framerusercontent.com/images/I8tMu3NoQxnNKS3uTWK08UyrtU.jpg',
  'https://framerusercontent.com/images/LLXplKFJHbnVubPwKelRdMqHmkI.jpg',
  'https://framerusercontent.com/images/bWR2wFJxD0uj0cXXJhXUQOFMJU.jpg',
  'https://framerusercontent.com/images/VyUdS5a2DU5hdC28yUIwCzIq43E.jpg',
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
