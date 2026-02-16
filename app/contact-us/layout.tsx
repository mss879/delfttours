import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | Delft Tours",
    description: "Get in touch with Delft Tours. We are here to answer your questions and help you plan your perfect Sri Lankan holiday.",
    keywords: ["contact Delft Tours", "travel inquiries", "book Sri Lanka tour", "customer support"],
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
