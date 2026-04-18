import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleData } from "../article-data";
import { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articleData.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | Delft Tours Sri Lanka`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
    alternates: {
      canonical: `https://delfttours.com/articles/${article.slug}`,
    },
  };
}

export function generateStaticParams() {
  return articleData.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: Props) {
  const article = articleData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Generate JSON-LD Schema for rich snippet optimization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: [`https://delfttours.com${article.image}`],
    datePublished: article.date,
    dateModified: article.date,
    author: [{
      "@type": "Organization",
      "name": article.author,
      "url": "https://delfttours.com"
    }],
    publisher: {
      "@type": "Organization",
      "name": "Delft Tours Sri Lanka",
      "logo": {
        "@type": "ImageObject",
        "url": "https://delfttours.com/delftfavicon.png"
      }
    },
    description: article.excerpt
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-4 py-16 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Link 
            href="/articles" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors w-fit text-sm font-medium uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Articles
          </Link>
          <div className="flex items-center gap-4 text-white/80 mb-4 text-sm font-medium uppercase tracking-wide">
            <span>{article.date}</span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            <span>{article.author}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white max-w-4xl leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* We use global styling trick for the deeply nested HTML content generated from the data file */}
        <div 
          className="
            w-full
            [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:font-serif [&_h2]:text-[#0b3e63] [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-bold [&_h2]:leading-snug
            [&_h3]:text-2xl [&_h3]:font-serif [&_h3]:text-[#0b3e63]/90 [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-semibold
            [&_p]:text-[1.125rem] [&_p]:text-gray-700 [&_p]:leading-[1.8] [&_p]:mb-8
            [&_a]:text-[#0b3e63] [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-[#ffbf29] [&_a]:transition-colors
            [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul]:space-y-4
            [&_li]:relative [&_li]:pl-6 [&_li]:text-[1.125rem] [&_li]:text-gray-700 [&_li]:leading-relaxed
            [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-3 [&_li::before]:w-2 [&_li::before]:h-2 [&_li::before]:bg-[#FFC947] [&_li::before]:rounded-full
            [&_strong]:font-bold [&_strong]:text-gray-900
            [&_hr]:my-16 [&_hr]:border-gray-200 [&_hr]:border-t-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#FFC947] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:text-xl [&_blockquote]:my-8 [&_blockquote]:bg-gray-50 [&_blockquote]:py-4 [&_blockquote]:rounded-r-lg
          "
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        {/* Call to Action Footer */}
        <div className="mt-16 p-8 bg-neutral-50 rounded-2xl border border-neutral-100 text-center">
          <h3 className="text-2xl font-serif text-gray-900 mb-4">Ready to start your Sri Lankan journey?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Let our experts craft the perfect itinerary tailored exclusively for you.
          </p>
          <Link 
            href="/tours" 
            className="inline-block bg-primary text-white font-semibold tracking-wide uppercase px-8 py-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          >
            Explore Our Tours
          </Link>
        </div>
      </article>

      </main>
      <Footer />
    </>
  );
}
