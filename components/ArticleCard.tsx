import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  author: string;
  published_date: string | null;
}

// Fallback for admin-created rows that have no image yet.
export const ARTICLE_FALLBACK_IMAGE = "/hero2.webp";

// Fixed timezone (Sri Lanka) so the rendered string is deterministic and does
// not shift with the server's locale/TZ. Mirrors components/newsroom/NewsroomListing.tsx.
export function formatArticleDate(value: string | null): string {
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

export default function ArticleCard({
  article,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  eager = false,
  titleAs: Title = "h3",
}: {
  article: Article;
  sizes?: string;
  /** Homepage opts out of lazy loading; the articles index keeps the default. */
  eager?: boolean;
  /** h2 under a page <h1>; h3 when nested under a section <h2> (homepage). */
  titleAs?: "h2" | "h3";
}) {
  // Real bullet separator. Filtering first keeps a stray leading bullet off
  // rows that have no publish date.
  const meta = [formatArticleDate(article.published_date), article.author]
    .filter(Boolean)
    .join(" • ");

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={article.image_url || ARTICLE_FALLBACK_IMAGE}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes={sizes}
          {...(eager ? { loading: "eager" as const } : {})}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-grow flex-col p-8">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-600/80">
          {meta}
        </div>
        <Title className="mb-4 line-clamp-2 font-serif text-2xl text-gray-900 transition-colors group-hover:text-brand-600">
          {article.title}
        </Title>
        <p className="mb-6 line-clamp-3 flex-grow leading-relaxed text-gray-600">
          {article.excerpt}
        </p>
        <div className="flex items-center font-medium text-brand-600 transition-transform duration-300 group-hover:translate-x-2">
          Read Article <MoveRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
