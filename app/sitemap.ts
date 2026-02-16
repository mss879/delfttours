import { MetadataRoute } from 'next';
import { tourDetails as tours } from './tours/tour-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://delfttours.com'; // Replace with actual domain

    const tourRoutes = tours.map((tour) => ({
        url: `${baseUrl}/tours/${tour.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const routes = [
        '',
        '/tours',
        '/about-us',
        '/contact-us',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1.0,
    }));

    return [...routes, ...tourRoutes];
}
