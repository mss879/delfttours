import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/app/actions/articles";
import { Metadata } from "next";
import { MoveRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles & Travel Guides | Delft Tours Sri Lanka",
  description: "Read our comprehensive travel guides, tips, and insights on the best places to visit in Sri Lanka. Plan your perfect tailored Sri Lanka tour with our expert advice.",
  alternates: {
    canonical: "https://delfttours.com/articles",
  },
};

interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  author: string;
  published_date: string | null;
}

// Fallback for admin-created rows that have no image yet.
const FALLBACK_IMAGE = "/hero2.webp";

// Fixed timezone (Sri Lanka) so the rendered string is deterministic and does
// not shift with the server's locale/TZ. Mirrors components/newsroom/NewsroomListing.tsx.
function formatDate(value: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Colombo",
  });
}

export default async function ArticlesPage() {
  const articles: ArticleRow[] = await getArticles(true); // published only

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center bg-gray-900 border-b border-white/5">
        <Image
          src="/hero5.webp"
          alt="Sri Lanka Travel Guides"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Sri Lanka Travel Guides
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Discover expert insights, hidden gems, and comprehensive guides to help you plan the ultimate journey across the pearl of the Indian Ocean.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        {articles.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-100 bg-white p-16 text-center shadow-sm">
            <BookOpen className="mx-auto mb-6 h-16 w-16 text-neutral-200" />
            <h2 className="mb-4 font-serif text-3xl text-gray-900">No guides just yet.</h2>
            <p className="text-lg text-gray-500">
              Our travel guides are being written. Check back soon for expert insights on Sri Lanka.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              // Real bullet separator. Filtering first keeps a stray leading
              // bullet off rows that have no publish date.
              const meta = [formatDate(article.published_date), article.author]
                .filter(Boolean)
                .join(" • ");

              return (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={article.image_url || FALLBACK_IMAGE}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-3">
                      {meta}
                    </div>
                    <h2 className="text-2xl font-serif text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Read Article <MoveRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      </main>
      <Footer />
    </>
  );
}
