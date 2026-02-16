import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Delft Tours",
    description: "Find answers to common questions about booking, payments, travel logistics, and services with Delft Tours.",
    keywords: ["Delft Tours FAQ", "Sri Lanka travel questions", "booking help", "travel support"],
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
