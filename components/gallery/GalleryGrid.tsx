'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ZoomIn } from 'lucide-react';

interface GalleryGridProps {
  images: string[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {visibleImages.map((src, idx) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (idx % 12) * 0.05 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-100 break-inside-avoid shadow-sm"
            onClick={() => setSelectedImage(src)}
          >
            {/* The Image */}
            <div className="relative w-full h-auto min-h-[150px]">
              <Image
                src={src}
                alt={`Delft Tours Gallery Image ${idx + 1}`}
                width={800}
                height={800}
                quality={75}
                priority={idx < 8}
                loading={idx < 8 ? "eager" : "lazy"}
                className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white scale-90 transition-transform duration-300 group-hover:scale-100">
                <ZoomIn className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button 
            type="button"
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="rounded-full bg-[#0b3e63] text-white px-8 py-3.5 font-semibold transition-all hover:bg-[#0a2e4a] hover:scale-105 shadow-md active:scale-95"
          >
            Load More Images
          </button>
        </div>
      )}

      {/* Lightbox Dialog using Radix UI */}
      <Dialog 
        open={!!selectedImage} 
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-[95vw] md:max-w-[85vw] lg:max-w-[1400px] h-[90vh] p-0 border-none bg-transparent shadow-none [&>button]:hidden">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full flex items-center justify-center"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 md:-right-12 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 backdrop-blur-md border border-white/20 transition-all"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </button>
                
                <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
                  <Image
                    src={selectedImage}
                    alt="Gallery Full Image"
                    fill
                    quality={90}
                    className="object-contain drop-shadow-2xl"
                    sizes="100vw"
                    priority
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
