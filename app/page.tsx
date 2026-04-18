import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import HowItWorks from '@/components/HowItWorks';
import TopDestinations from '@/components/TopDestinations';
import BlogSection from '@/components/BlogSection';
import ReelsSection from '@/components/ReelsSection';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
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
