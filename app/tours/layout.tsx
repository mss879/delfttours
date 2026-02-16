import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Tour Packages | Delft Tours",
    description: "Explore our wide range of Sri Lanka tour packages. From wildlife safaris to beach getaways, we have the perfect itinerary for you.",
    keywords: ["Sri Lanka tour packages", "custom tours", "adventure tours", "honeymoon packages", "family holidays"],
};

export default function ToursLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
