import React from "react";
import Image from "next/image";
import { getPublishedArticles } from "@/app/actions/articles";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles & Travel Guides | Delft Tours Sri Lanka",
  description: "Read our comprehensive travel guides, tips, and insights on the best places to visit in Sri Lanka. Plan your perfect tailored Sri Lanka tour with our expert advice.",
  alternates: {
    canonical: "https://delfttours.com/articles",
  },
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

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
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} titleAs="h2" />
            ))}
          </div>
        )}
      </section>
      </main>
      <Footer />
    </>
  );
}
