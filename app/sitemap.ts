import { MetadataRoute } from "next";
import { getPublishedPackages } from "./actions/packages";
import { getArticles } from "./actions/articles";

// published_date is nullable and admin-supplied; never let a bad value
// produce an "Invalid Date" lastModified in the XML.
function safeDate(value: string | null | undefined): Date {
    if (!value) return new Date();
    const d = new Date(value);
    return isNaN(d.getTime()) ? new Date() : d;
}

// Articles come from the DB, so the sitemap must be built per-request rather than
// frozen at build time. That happens to be true already (getArticles reads cookies,
// which opts the route into dynamic rendering), but it's stated here so a refactor
// of getArticles can't silently turn this back into a prerendered, stale sitemap.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://delfttours.com";

    // Static pages
    const staticPages = [
        "",
        "/about-us",
        "/contact-us",
        "/faq",
        "/get-quote",
        "/tours",
        "/articles",
        "/gallery",
        "/success-stories",
        "/events",
        "/newsroom",
        "/b2b-partnerships",
        "/privacy-policy",
        "/terms-and-conditions",
        "/cancellation-policy",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        // Legal pages are low-churn and low-priority relative to marketing pages.
        priority: route === "" ? 1 : route.match(/privacy-policy|terms-and-conditions|cancellation-policy/) ? 0.3 : 0.8,
    }));

    // Dynamic pages (Tour Packages) — sourced from Supabase (published only).
    const tours = await getPublishedPackages();
    const tourPages = tours.map((tour) => ({
        url: `${baseUrl}/tours/${tour.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Dynamic pages (Articles) — sourced from Supabase so admin-published
    // articles reach the sitemap.
    const articles: { slug: string; published_date: string | null }[] = await getArticles(true);
    const articlePages = articles.map((article) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: safeDate(article.published_date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...tourPages, ...articlePages];
}
