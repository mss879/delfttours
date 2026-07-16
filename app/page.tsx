import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import HowItWorks from '@/components/HowItWorks';
import TopDestinations from '@/components/TopDestinations';
import ArticlesPreview from '@/components/ArticlesPreview';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://delfttours.com",
  },
};

// ArticlesPreview reads Supabase. It uses the cookie-free client so this page
// stays statically rendered; revalidate keeps new articles appearing without a
// redeploy, and publishing an article revalidatePath('/')s this immediately.
export const revalidate = 3600;

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
        <ArticlesPreview />
      </main>
      <Footer />
    </div>
  );
}
