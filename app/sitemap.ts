import { MetadataRoute } from "next";
import { tourDetails } from "./tours/tour-data";
import { articleData } from "./articles/article-data";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic pages (Tour Packages)
    const tourPages = tourDetails.map((tour) => ({
        url: `${baseUrl}/tours/${tour.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Dynamic pages (Articles)
    const articlePages = articleData.map((article) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...tourPages, ...articlePages];
}
