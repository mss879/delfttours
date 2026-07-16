import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import Providers from './providers';
import DeferredWidgets from '@/components/DeferredWidgets';
import Preloader from '@/components/Preloader';
import MetaPixel from '@/components/MetaPixel';

// Exposed as CSS variables so tailwind.config can map font-sans/font-serif onto
// them. Without that mapping `font-sans` resolves to Tailwind's stock system
// stack (which does NOT contain Inter) and silently overrides the body font —
// that is why the header and six pages used to render in system-ui.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

// The site marks ~26 headings `font-serif`, which previously fell back to
// whatever serif the OS shipped (Georgia on macOS, Times New Roman on Windows).
// Lora is the closest well-made match to that Georgia rendering.
const lora = Lora({ subsets: ['latin'], display: 'swap', variable: '--font-lora' });

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
  generator: 'ARC AI',
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
        url: '/hero1.webp',
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
    images: ['/hero1.webp'],
    creator: '@delfttours', // Assuming handle, can be updated
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
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
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in your env once you claim the site
  // in Google Search Console. Left undefined → Next omits the meta tag entirely
  // (better than shipping an invalid placeholder).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'facebook-domain-verification': 'wbpryu3cgj1vrw94r0oj1ntsrfm2xq',
    },
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className={inter.className}>
        <MetaPixel />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              '@id': 'https://delfttours.com/#organization',
              name: 'Delft Tours',
              legalName: 'Delft Tours & Travels (Pvt) Ltd',
              description:
                'Sri Lanka travel agency offering expert-guided, customizable tour packages and luxury holiday experiences.',
              url: 'https://delfttours.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://delfttours.com/delgyortoginallogo.webp',
                width: 200,
                height: 74,
              },
              image: 'https://delfttours.com/hero1.webp',
              telephone: '+94769220306',
              email: 'support@delfttours.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'No 29/5 Jayasinghe Road, Kirullapone',
                addressLocality: 'Colombo',
                addressRegion: 'Western Province',
                postalCode: '00600',
                addressCountry: 'LK',
              },
              areaServed: { '@type': 'Country', name: 'Sri Lanka' },
              sameAs: [
                'https://www.facebook.com/profile.php?id=61583635253275',
                'https://www.instagram.com/delfttours/',
                'https://www.youtube.com/@DelftToursTravels',
                'https://www.tiktok.com/@delft_tours',
              ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://delfttours.com/#website',
              name: 'Delft Tours',
              url: 'https://delfttours.com',
              publisher: { '@id': 'https://delfttours.com/#organization' },
              creator: {
                '@type': 'Organization',
                name: 'ARC AI',
                url: 'https://www.arcai.agency'
              }
            }),
          }}
        />
        <Providers>
          <Preloader />
          {children}
          <DeferredWidgets />
        </Providers>
      </body>
    </html>
  );
}
