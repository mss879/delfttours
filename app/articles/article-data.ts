import { articleFirstTimers } from './data/first-timers';
import { articleWildlife } from './data/wildlife';
import { articleHoneymoon } from './data/honeymoon';
import { articleCulture } from './data/culture';
import { articleBeach } from './data/beach';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content: string;
  date: string;
  author: string;
}

export const articleData: Article[] = [
  {
    id: "art-01",
    slug: "top-10-places-to-visit-sri-lanka-first-timers",
    title: "Top 10 Best Places to Visit in Sri Lanka for First-Timers",
    excerpt: "Planning your first trip to Sri Lanka? Discover the absolute best destinations to balance culture, wildlife, and breathtaking beaches on your maiden voyage.",
    image: "/hero2.webp",
    content: articleFirstTimers,
    date: "2024-05-12",
    author: "Delft Tours Editorial"
  },
  {
    id: "art-02",
    slug: "best-places-visit-sri-lanka-wildlife-nature",
    title: "Best Places to Visit in Sri Lanka for Wildlife Photographers & Nature Lovers",
    excerpt: "From the leopard-dense jungles of Yala to the elephant gatherings of Minneriya, explore Sri Lanka's ultimate wildlife and nature destinations.",
    image: "/hero4.webp",
    content: articleWildlife,
    date: "2024-05-15",
    author: "Delft Tours Editorial"
  },
  {
    id: "art-03",
    slug: "most-romantic-places-sri-lanka-honeymoon",
    title: "10 Most Romantic Places to Visit in Sri Lanka for Your Honeymoon",
    excerpt: "Looking for the perfect romantic getaway? These stunning Sri Lankan destinations offer unmatched luxury, privacy, and breathtaking views for honeymooners.",
    image: "/hero1.webp",
    content: articleHoneymoon,
    date: "2024-05-18",
    author: "Delft Tours Editorial"
  },
  {
    id: "art-04",
    slug: "historical-cultural-places-sri-lanka-triangle",
    title: "10 Best Historical and Cultural Places to Visit in Sri Lanka's Cultural Triangle",
    excerpt: "Step back in time. Discover ancient kingdoms, ruined palaces, and sacred temples that define Sri Lanka's rich and complex history.",
    image: "/sigiriya.webp",
    content: articleCulture,
    date: "2024-05-20",
    author: "Delft Tours Editorial"
  },
  {
    id: "art-05",
    slug: "best-places-beach-hopping-sri-lanka",
    title: "The Ultimate Guide to Best Places in Sri Lanka for Beach Hopping",
    excerpt: "From hidden surfing coves in Hiriketiya to the sweeping golden sands of Bentota, here is your definitive guide to Sri Lanka's best beaches.",
    image: "/hero5.webp",
    content: articleBeach,
    date: "2024-05-22",
    author: "Delft Tours Editorial"
  }
];
