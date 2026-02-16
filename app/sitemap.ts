import { MetadataRoute } from "next";
import { tourDetails } from "./tours/tour-data";

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
        changeFrequency: "weekly" as const, // Tours might update price/details
        priority: 0.9, // High priority for product pages
    }));

    return [...staticPages, ...tourPages];
}
