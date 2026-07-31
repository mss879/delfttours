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
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className="h-5 w-5 fill-white">
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
      </svg>
    ),
  },
];

const exploreLinks = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Holidays & Tours' },
  { href: '/articles', label: 'Articles' },
  { href: '/events', label: 'Events' },
  { href: '/newsroom', label: 'Newsroom' },
  { href: '/gallery', label: 'Gallery' },
];

const companyLinks = [
  { href: '/about-us', label: 'About Us' },
  { href: '/b2b-partnerships', label: 'B2B Partnerships' },
  { href: '/success-stories', label: 'Testimonials' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact-us', label: 'Contact Us' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/cancellation-policy', label: 'Cancellation Policy' },
];

function LinkTag({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-block text-white/70 transition-all duration-300 hover:text-white hover:translate-x-1 hover:text-cyan-100 text-sm font-medium"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0a0f14] text-white relative overflow-hidden">
      <section className="border-b border-white/5 relative z-10">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand & Socials (4 columns width) */}
            <div className="lg:col-span-4 space-y-8 pr-0 lg:pr-8">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-serif tracking-widest font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  DELFT TOURS
                </span>
              </Link>
              <h3 className="text-xl font-medium text-white/90 leading-relaxed max-w-sm">
                Creating exceptional Sri Lanka journeys for travellers and trusted destination management solutions for travel professionals.
              </h3>
              <div className="space-y-3 pt-2">
                <p className="text-xs text-white/50 font-medium tracking-wide">
                  Company Reg. No. PV 00350473
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-900/40 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      aria-label={social.label}
                    >
                      {/* @ts-ignore */}
                      {social.icon ? (
                        social.icon
                      ) : (
                        <Image
                          src={social.src!}
                          alt={social.label}
                          width={20}
                          height={20}
                          loading="eager"
                          className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity"
                          unoptimized
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore Links (2 columns width) */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-6 tracking-wide">Explore</h4>
              <div className="space-y-4 flex flex-col items-start">
                {exploreLinks.map((link) => (
                  <LinkTag key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            </div>

            {/* Company Links (2 columns width) */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-6 tracking-wide">Company</h4>
              <div className="space-y-4 flex flex-col items-start">
                {companyLinks.map((link) => (
                  <LinkTag key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            </div>

            {/* Contact Info (4 columns width) */}
            <div className="lg:col-span-4 lg:pl-6">
              <h4 className="text-lg font-semibold mb-6 tracking-wide">Get in Touch</h4>
              <div className="space-y-6 text-sm text-white/80">
                <a href="tel:+94769220306" className="group flex items-start gap-4 transition-colors hover:text-white">
                  <div className="mt-1 text-cyan-400 bg-cyan-400/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <span className="block text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">+94 76 922 0306</span>
                    <span className="text-xs mt-0.5 block opacity-60">Mon-Fri 9am-6pm IST</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/94769220306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 transition-colors hover:text-white"
                >
                  <div className="mt-1 text-[#25D366] bg-[#25D366]/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.896C24 8.156 22.797 5.652 20.52 3.449"></path></svg>
                  </div>
                  <div>
                    <span className="block text-base font-semibold text-white group-hover:text-[#25D366] transition-colors">+94 76 922 0306</span>
                    <span className="text-xs mt-0.5 block opacity-60">Chat on WhatsApp</span>
                  </div>
                </a>

                <a href="mailto:support@delfttours.com" className="group flex items-start gap-4 transition-colors hover:text-white">
                  <div className="mt-1 text-cyan-400 bg-cyan-400/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </div>
                  <div>
                    <span className="block text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">support@delfttours.com</span>
                    <span className="text-xs mt-0.5 block opacity-60">Online support</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 pt-1">
                  <div className="mt-1 text-cyan-400 bg-cyan-400/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="leading-relaxed">
                    <p className="font-semibold text-white text-base">Delft Tours & Travels Pvt Ltd</p>
                    <p className="mt-1.5 opacity-80 leading-snug">
                      No 29/5 Jayasinghe Road, Kirullapone,<br/>
                      Colombo 06, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div className="mt-16 mb-4 flex justify-center opacity-60 select-none pointer-events-none">
            <span className="relative text-center text-[clamp(4rem,15vw,10rem)] font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5">
              DT&amp;T
            </span>
          </div>
        </div>
      </section>

      {/* Copyright & Utilities Bottom Bar */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          <div className="flex flex-col gap-5">
            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-white/50 order-2 md:order-1 text-center md:text-left">
                &copy; {new Date().getFullYear()} Delft Tours & Travels Pvt Ltd. All rights reserved.
              </div>

              <div className="order-1 md:order-2">
                <a
                  href="https://www.arcai.agency"
                  target="_blank"
                  rel="noopener"
                  title="ARC AI — AI Automation & Web Design Agency in Sri Lanka"
                  className="inline-flex items-center gap-2 text-xs text-white/40 transition-colors duration-300 hover:text-white"
                >
                  <span>AI &amp; Web Design Agency in Sri Lanka by</span>
                  <span className="inline-block relative h-10 w-28 translate-y-0.5 opacity-80 hover:opacity-100 transition-opacity">
                    <Image src="/arc-logo.webp" alt="ARC AI" fill sizes="112px" loading="eager" className="object-contain object-left" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
