import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const WhyChooseSection = dynamic(() => import('@/components/WhyChooseSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const GallerySection = dynamic(() => import('@/components/GallerySection'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const TopDestinations = dynamic(() => import('@/components/TopDestinations'));
const BlogSection = dynamic(() => import('@/components/BlogSection'));
const ReelsSection = dynamic(() => import('@/components/ReelsSection'));
const Footer = dynamic(() => import('@/components/Footer'));
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
