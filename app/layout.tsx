import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { AiChatWidget } from '@/components/ai-chat-widget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://delfttours.com'), // Replace with actual domain
  title: {
    default: 'Delft Tours - Unforgettable Travel Experiences',
    template: '%s | Delft Tours',
  },
  description: 'Discover the world with Delft Tours. Expert guides, customizable itineraries, and handpicked destinations for your perfect holiday in Sri Lanka and beyond.',
  keywords: ['travel', 'tours', 'sri lanka', 'holiday', 'vacation', 'delft tours', 'custom itinerary', 'travel agency'],
  authors: [{ name: 'Delft Tours' }],
  creator: 'Delft Tours',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://delfttours.com',
    title: 'Delft Tours - Unforgettable Travel Experiences',
    description: 'Discover the world with Delft Tours. Expert guides, customizable itineraries, and handpicked destinations.',
    siteName: 'Delft Tours',
    images: [
      {
        url: '/delgyortoginallogo.png', // Using the logo as default OG image for now
        width: 1200,
        height: 630,
        alt: 'Delft Tours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delft Tours - Unforgettable Travel Experiences',
    description: 'Discover the world with Delft Tours. Expert guides, customizable itineraries, and handpicked destinations.',
    images: ['/delgyortoginallogo.png'],
  },
  icons: {
    icon: '/delftfavicon.png',
    apple: '/delftfavicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Delft Tours',
              image: 'https://delfttours.com/delgyortoginallogo.png',
              '@id': 'https://delfttours.com',
              url: 'https://delfttours.com',
              telephone: '+94770000000', // Update with actual phone
              address: {
                '@type': 'PostalAddress',
                streetAddress: '87 Dutugemunu St',
                addressLocality: 'Dehiwala-Mount Lavinia',
                addressCountry: 'LK',
              },
              priceRange: '$$',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  opens: '00:00',
                  closes: '23:59',
                },
              ],
            }),
          }}
        />
        <Providers>
          {children}
          <AiChatWidget />
        </Providers>
      </body>
    </html>
  );
}
