import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsroomListing from '@/components/newsroom/NewsroomListing';
import { getNews } from '@/app/actions/newsroom';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Newsroom | Delft Tours Sri Lanka',
  description:
    'The latest news, announcements, and press updates from Delft Tours — your trusted Sri Lanka travel partner.',
  alternates: {
    canonical: 'https://delfttours.com/newsroom',
  },
};

export default async function NewsroomPage() {
  const news = await getNews(true); // published only

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24">
        {/* Hero */}
        <section className="relative flex h-[50vh] min-h-[380px] w-full items-center justify-center border-b border-white/5 bg-gray-900">
          <Image src="/hero1.webp" alt="Delft Tours Newsroom" fill className="object-cover opacity-50" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          <div className="relative z-10 mx-auto mt-20 max-w-4xl px-4 text-center">
            <h1 className="mb-6 font-serif text-4xl text-white md:text-6xl">Newsroom</h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-gray-200 md:text-xl">
              News, announcements, and stories from behind the scenes at Delft Tours.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsroomListing news={news} />
        </section>
      </main>
      <Footer />
    </>
  );
}
