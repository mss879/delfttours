import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  {
    href: 'https://www.facebook.com/profile.php?id=61583635253275',
    src: 'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/678e1a2dccc83e5e6cc448d3_Facebook-3.svg',
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/delfttours/',
    src: 'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/678e1a2c7337910afa2f08a1_instagram-2%201.svg',
    label: 'Instagram',
  },
  {
    href: 'https://www.youtube.com/@DelftToursTravels',
    src: 'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/678e1a2c24b89f998de40e98_Youtube.svg',
    label: 'YouTube',
  },
  {
    href: 'https://www.tiktok.com/@delft_tours',
    label: 'TikTok',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className="h-6 w-6 fill-white">
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
      </svg>
    ),
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
  { href: '/admin/login', label: 'Admin' },
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
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b3e63] transition-transform duration-200 hover:-translate-y-1 hover:brightness-105"
                  >
                    {/* @ts-ignore */}
                    {social.icon ? (
                      social.icon
                    ) : (
                      <Image
                        src={social.src!}
                        alt={social.label}
                        width={40}
                        height={40}
                        className="h-6 w-6"
                        unoptimized
                      />
                    )}
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
              <a href="tel:+94112852455" className="block text-base font-semibold text-white">
                +94 11 285 2455
              </a>
              <a href="mailto:support@delfttours.com" className="block text-base font-semibold text-white">
                support@delfttours.com
              </a>
              <p className="leading-relaxed">
                No 29/5 Jayasinghe Road, Kirullapone, Colombo 06, Sri Lanka
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
              <span className="inline-block align-middle relative h-10 w-32 ml-0 mr-2">
                <Image src="/arc logo.png" alt="ARC AI" fill className="object-contain" />
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


        </div>
      </section>
    </footer>
  );
}
