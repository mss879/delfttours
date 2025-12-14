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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
