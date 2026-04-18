import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Get a Quote | Delft Tours",
    description: "Request a personalized quote for your dream Sri Lankan holiday. Our experts will craft a custom itinerary just for you.",
    keywords: ["get a travel quote", "custom tour quote", "Sri Lanka trip planner", "vacation cost"],
    alternates: {
        canonical: "https://delfttours.com/get-quote",
    },
};

export default function GetQuoteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
