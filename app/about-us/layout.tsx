import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | Delft Tours",
    description: "Learn about Delft Tours, our mission, values, and the team dedicated to creating unforgettable Sri Lankan travel experiences.",
    keywords: ["about Delft Tours", "Sri Lanka travel experts", "best tour operator Sri Lanka", "our story"],
    alternates: {
        canonical: "https://delfttours.com/about-us",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
