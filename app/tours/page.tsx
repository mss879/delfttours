import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TourListing from '@/components/tours/TourListing';

export const metadata = {
  title: 'Tours & Destinations | Delft Tours',
  description: 'Explore our wide range of tailor-made tours in Sri Lanka. From cultural heritage to wildlife adventures, find your perfect holiday package.',
};

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-12 lg:px-8">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tours <span className="text-black">&amp; Destinations</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover the world with our premium, curated travel experiences.
          </p>
        </div>

        <TourListing />

      </main>

      <Footer />
    </div>
  );
}

