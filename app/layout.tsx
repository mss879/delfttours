import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { AiChatWidget } from '@/components/ai-chat-widget';
import { MeetingWidget } from '@/components/MeetingWidget';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://delfttours.com'),
  title: {
    default: 'Delft Tours - Unforgettable Sri Lankan Travel Experiences',
    template: '%s | Delft Tours',
  },
  description: 'Discover the wonder of Sri Lanka with Delft Tours. We offer expert-guided, customizable tour packages, luxury travel experiences, and unforgettable holidays in Sri Lanka.',
  keywords: ['Sri Lanka tours', 'travel agency Sri Lanka', 'custom tours', 'luxury travel', 'holiday packages', 'Delft Tours', 'vacation in Sri Lanka', 'tour operators'],
  authors: [{ name: 'Delft Tours', url: 'https://delfttours.com' }],
  creator: 'Delft Tours',
  publisher: 'Delft Tours',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Delft Tours - Unforgettable Sri Lankan Travel Experiences',
    description: 'Explore Sri Lanka with our expert-curated tour packages. From beaches to hill country, wildlife to culture, we create your perfect holiday.',
    url: 'https://delfttours.com',
    siteName: 'Delft Tours',
    images: [
      {
        url: '/hero1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Delft Tours - Experience Sri Lanka',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delft Tours - Your Gateway to Sri Lanka',
    description: 'Experience the best of Sri Lanka with Delft Tours. Tailor-made holidays and expert guides.',
    images: ['/hero1.jpeg'],
    creator: '@delfttours', // Assuming handle, can be updated
  },
  icons: {
    icon: '/delftfavicon.png',
    shortcut: '/delftfavicon.png',
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
  verification: {
    google: 'verification_code_here', // Placeholder for actual verification code
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
          <MeetingWidget />
          <AiChatWidget />
        </Providers>
      </body>
    </html>
  );
}
