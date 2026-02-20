import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import MemoriesSection from '@/components/MemoriesSection';
import HowItWorks from '@/components/HowItWorks';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import TopDestinations from '@/components/TopDestinations';
import BlogSection from '@/components/BlogSection';
import ReelsSection from '@/components/ReelsSection';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Delft Tours - Unforgettable Sri Lankan Travel Experiences",
  description: "Discover the wonder of Sri Lanka with Delft Tours. We offer expert-guided, customizable tour packages, luxury travel experiences, and unforgettable holidays in Sri Lanka.",
  keywords: ["Sri Lanka tours", "travel agency Sri Lanka", "custom tours", "luxury travel", "holiday packages", "Delft Tours", "vacation in Sri Lanka"],
  alternates: {
    canonical: "https://delfttours.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen glass-gradient">
      <Header />
      <Preloader />
      <main>
        <HeroSection />
        <WhyChooseSection />
        <AboutSection />
        <GallerySection />
        <HowItWorks />
        <TopDestinations />
        <BlogSection />
        <ReelsSection />
      </main>
      <Footer />
    </div>
  );
}
