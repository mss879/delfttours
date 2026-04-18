import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sri Lanka Tour Gallery | Delft Tours',
  description: 'Explore our stunning collection of Sri Lankan tour memories, breathtaking destinations, and beautiful landscapes. Discover exactly what awaits you on a Delft Tour.',
  alternates: {
    canonical: 'https://delfttours.com/gallery',
  },
  openGraph: {
    title: 'Sri Lanka Tour Gallery | Delft Tours',
    description: 'Explore our stunning collection of Sri Lankan tour memories, breathtaking destinations, and beautiful landscapes.',
    url: 'https://delfttours.com/gallery',
    type: 'website',
  },
};

export default function GalleryPage() {
  // Read images directly from the server on request or build
  const galleryDir = path.join(process.cwd(), 'public/gallery');
  let images: string[] = [];
  
  try {
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      // Filter for webp files
      images = files
        .filter(file => /\.webp$/i.test(file))
        .map(file => `/gallery/${file}`);
    }
  } catch (error) {
    console.error('Failed to read gallery directory:', error);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white font-sans">
        {/* Sleek Modern Hero Section */}
        <section className="bg-white py-24 md:py-32 border-b border-slate-100">
          <div className="mx-auto flex max-w-[900px] flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-6 text-4xl font-light tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Tour <span className="font-semibold text-slate-900">Gallery</span>
            </h1>
            <p className="mx-auto text-lg text-slate-500 md:text-xl font-light leading-relaxed">
              A minimalist, visual journey through the wonders of Sri Lanka. 
              Explore the untouched beauty and breathtaking landscapes waiting for you.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <div className="flex h-[40vh] items-center justify-center">
              <p className="text-xl text-slate-500">No images found in the gallery.</p>
            </div>
          )}
        </section>

        {/* Minimalist Booking CTA Section */}
        <section className="bg-slate-50 py-24 px-4 border-t border-slate-100">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Inspired by these views?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-500 font-light">
              Let our experts craft a personalized itinerary that brings these pictures to life. Start your unforgettable Sri Lankan adventure today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-700 font-medium">
              <a href="mailto:info@delfttours.com" className="flex items-center gap-2 hover:text-[#0b3e63] transition-colors">
                <Mail className="h-5 w-5" /> info@delfttours.com
              </a>
              <a href="tel:+94112852455" className="flex items-center gap-2 hover:text-[#0b3e63] transition-colors">
                <Phone className="h-5 w-5" /> +94 11 285 2455
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
