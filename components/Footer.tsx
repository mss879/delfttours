import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  {
    href: 'https://www.facebook.com',
    src: 'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/678e1a2dccc83e5e6cc448d3_Facebook-3.svg',
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com',
    src: 'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/678e1a2c7337910afa2f08a1_instagram-2%201.svg',
    label: 'Instagram',
  },
  {
    href: 'https://www.youtube.com',
    src: 'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/678e1a2c24b89f998de40e98_Youtube.svg',
    label: 'YouTube',
  },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-one', label: 'About us' },
  { href: '/tour-one', label: 'All tours' },
  { href: '/blog-two', label: 'Tour blogs' },
  { href: '/destination-two', label: 'Our destination' },
  { href: '/contact-three', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

const locations = [
  { href: 'https://exploreza.webflow.io/countries/usa', label: 'USA' },
  { href: 'https://exploreza.webflow.io/countries/france', label: 'France' },
  { href: 'https://exploreza.webflow.io/countries/switzerland', label: 'Switzerland' },
  { href: 'https://exploreza.webflow.io/countries/new-zealand', label: 'New Zealand' },
  { href: 'https://exploreza.webflow.io/countries/australia', label: 'Australia' },
  { href: 'https://exploreza.webflow.io/countries/venezuela', label: 'Venezuela' },
  { href: 'https://exploreza.webflow.io/countries/colombia', label: 'Colombia' },
  { href: 'https://exploreza.webflow.io/countries/cameroon', label: 'Cameroon' },
  { href: 'https://exploreza.webflow.io/countries/argentina', label: 'Argentina' },
  { href: 'https://exploreza.webflow.io/countries/brazil', label: 'Brazil' },
  { href: 'https://exploreza.webflow.io/countries/egypt', label: 'Egypt' },
  { href: 'https://exploreza.webflow.io/countries/south-africa', label: 'South Africa' },
  { href: 'https://exploreza.webflow.io/countries/sri-lanka', label: 'Sri Lanka' },
  { href: 'https://exploreza.webflow.io/countries/thailand', label: 'Thailand' },
  { href: 'https://exploreza.webflow.io/countries/united-arab-emirates', label: 'UAE' },
  { href: 'https://exploreza.webflow.io/countries/bhutan', label: 'Bhutan' },
  { href: 'https://exploreza.webflow.io/countries/india', label: 'India', last: true },
];

function LinkTag({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:border-white/30 hover:text-white"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-black text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-lg space-y-6">
              <h2 className="text-3xl font-semibold">
                Follow the latest travel destination updates from Delft Tours
              </h2>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff623b] transition-transform duration-200 hover:-translate-y-1 hover:brightness-105"
                  >
                    <Image
                      src={social.src}
                      alt={social.label}
                      width={40}
                      height={40}
                      className="h-6 w-6"
                      unoptimized
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:w-[360px]">
              <span className="text-lg font-semibold">Quick links</span>
              <div className="flex flex-wrap gap-3">
                {quickLinks.map((link) => (
                  <LinkTag key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            </div>

            <div className="space-y-3 text-sm text-white/80 lg:max-w-xs">
              <a href="tel:8881234567" className="block text-base font-semibold text-white">
                (888) 123 4567
              </a>
              <a href="mailto:contact@exemple.com" className="block text-base font-semibold text-white">
                contact@exemple.com
              </a>
              <p className="leading-relaxed">
                410 Sandtown, California 94001, United State of America
              </p>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <span className="relative text-center text-[clamp(3.5rem,9vw,7.5rem)] font-black uppercase tracking-[0.25em] text-white/90 whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-b from-white via-white/70 to-white/10 bg-clip-text text-transparent">
                Delft Tours
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/35 to-black" aria-hidden />
            </span>
          </div>
        </div>
      </section>

  <section className="border-t border-white/10 bg-black/95">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm text-white/70">
              Designed by{' '}
              <span className="text-white">
                ARC AI
              </span>{' '}
              powered by{' '}
              <Link
                href="https://nextjs.org"
                className="text-white transition-colors duration-200 hover:text-[#ff623b]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </Link>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Link
                href="/information/license"
                className="transition-colors duration-200 hover:text-white"
              >
                License
              </Link>
              <span className="h-4 w-px bg-white/20" aria-hidden />
              <Link
                href="https://exploreza.webflow.io/404"
                className="transition-colors duration-200 hover:text-white"
              >
                404
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/50">
            {locations.map((location) => (
              <Link
                key={location.label}
                href={location.href}
                className={`border-b border-transparent pb-1 transition-colors duration-200 hover:border-white/30 hover:text-white ${location.last ? 'border-none pb-0' : ''}`.trim()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {location.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}
