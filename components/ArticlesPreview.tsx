import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { getPublishedArticles } from "@/app/actions/articles";
import ArticleCard from "@/components/ArticleCard";

/**
 * Homepage preview of the three most recent published articles.
 *
 * Server component: the data is public and needs no interactivity, so this stays
 * out of the client bundle. Renders nothing at all when there are no published
 * articles — an empty "Travel Guides" band on the homepage would look broken,
 * unlike /articles which has a real empty state.
 */
export default async function ArticlesPreview() {
  const articles = await getPublishedArticles(3);

  if (articles.length === 0) return null;

  return (
    <section className="relative w-full bg-white py-20 lg:py-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Travel Guides
            </span>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              Plan your trip with our latest guides
            </h2>
            <p className="max-w-2xl text-lg text-slate-600">
              Expert insights, hidden gems and practical advice for travelling
              across Sri Lanka — written by the team on the ground.
            </p>
          </div>

          <Link
            href="/articles"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-6 py-2.5 text-sm font-medium text-slate-700 backdrop-blur-md transition-all hover:border-slate-300 hover:bg-white hover:shadow-md active:scale-95 sm:inline-flex"
          >
            View all articles
            <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              eager
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-6 py-2.5 text-sm font-medium text-slate-700 backdrop-blur-md transition-all hover:border-slate-300 hover:bg-white hover:shadow-md active:scale-95"
          >
            View all articles
            <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
