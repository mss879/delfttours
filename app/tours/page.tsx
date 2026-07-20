import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TourListing from '@/components/tours/TourListing';
import { getPublishedPackages } from '@/app/actions/packages';

// Rebuild hourly; admin package edits also revalidate /tours on write.
export const revalidate = 3600;

export default async function ToursPage() {
  const tours = await getPublishedPackages();
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100/60 selection:bg-brand-100 selection:text-brand-900">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-12 lg:px-8">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Sri Lanka <span className="text-black">Tours &amp; Experiences</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Explore the island with our premium, curated travel experiences — crafted by our local specialists.
          </p>
        </div>

        <TourListing tours={tours} />

      </main>

      <Footer />
    </div>
  );
}

