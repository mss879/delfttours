'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Mail, Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import QuoteDialog from './QuoteDialog';
import { useCurrency } from './CurrencyProvider';
import { CURRENCIES, CurrencyCode } from '@/lib/currency';

const currencyOptions: { code: CurrencyCode; flagCode: string }[] = [
  { code: 'USD', flagCode: 'us' },
  { code: 'LKR', flagCode: 'lk' },
  { code: 'EUR', flagCode: 'eu' },
  { code: 'GBP', flagCode: 'gb' },
  { code: 'AUD', flagCode: 'au' },
  { code: 'INR', flagCode: 'in' },
  { code: 'SGD', flagCode: 'sg' },
  { code: 'AED', flagCode: 'ae' },
  { code: 'BDT', flagCode: 'bd' },
];

type NavItem = {
  label: string;
  href?: string;
  children?: { href: string; label: string }[];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { currency, setCurrency, currencyInfo } = useCurrency();
  const currentFlag = currencyOptions.find(c => c.code === currency)?.flagCode || 'us';

  // Ordered by impact: product first, brand story next, then social proof /
  // inspiration / content / support. Contact Us is rendered separately, always last.
  const navItems = useMemo<NavItem[]>(
    () => [
      { href: '/tours', label: 'Holidays & Tours' },
      { href: '/about-us', label: 'About Us' },
      { href: '/b2b-partnerships', label: 'B2B Partnerships' },
      { href: '/success-stories', label: 'Testimonials' },
      { href: '/gallery', label: 'Gallery' },
      {
        label: 'Resources',
        children: [
          { href: '/articles', label: 'Articles' },
          { href: '/events', label: 'Events' },
          { href: '/newsroom', label: 'Newsroom' },
          { href: '/faq', label: 'FAQ' },
        ],
      },
    ],
    []
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-[60] font-sans">
      <div className="border-b border-slate-200/60 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <nav
          // The nav row is whitespace-nowrap, so its min-content width can't shrink —
          // any horizontal deficit is absorbed by the `auto` logo column instead.
          // With 8 items + Contact Us the row needs ~861px, which at 1280 starved the
          // logo to 46px. Gap/padding are therefore stepped up by breakpoint rather
          // than fixed, and only relax to the roomy values at 2xl where there's slack.
          className="relative mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-2 lg:px-4 xl:gap-3 xl:px-6 2xl:gap-6 2xl:px-8"
          aria-label="Primary Desktop Navigation"
        >
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/delgyortoginallogo.webp"
                alt="Delft Tours Logo"
                width={200}
                height={74}
                quality={60}
                className="h-[74px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </Link>
          </div>

          <div className="hidden items-center justify-center lg:flex lg:gap-0 2xl:gap-1">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="outline-none">
                    <span className="flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-900/5 hover:text-slate-900 xl:px-3 cursor-pointer">
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </span>
                  </DropdownMenuTrigger>
                  {/* font-sans is re-applied here on purpose: the menu portals to
                      <body>, so it escapes the <header>'s font-sans and would
                      otherwise inherit Inter from the body and mismatch the nav. */}
                  <DropdownMenuContent align="start" className="w-48 p-1.5 font-sans">
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.href}
                        asChild
                        // Matches the nav link treatment above, so the menu reads as
                        // part of the navbar rather than a stock shadcn popover.
                        className="cursor-pointer rounded-lg px-2.5 py-2 text-[15px] font-medium text-slate-600 transition-all duration-200 focus:bg-slate-900/5 focus:text-slate-900"
                      >
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  className="whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-900/5 hover:text-slate-900 xl:px-3"
                  href={item.href!}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact-us"
              className="whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-900/5 hover:text-slate-900 xl:px-3"
            >
              Contact Us
            </Link>
          </div>

          <div className="hidden items-center gap-4 lg:flex lg:justify-end">
            <QuoteDialog>
              <button type="button" className="cursor-pointer bg-gold text-brand-600 px-6 py-2.5 rounded-full font-bold hover:bg-gold-600 transition-all transform hover:scale-105 shadow-md btn-pulse">
                Get a Quote
              </button>
            </QuoteDialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-2 rounded-full border border-slate-200/60 px-3 py-1 text-sm text-slate-500 transition-colors duration-200 hover:border-slate-400 hover:text-slate-700 cursor-pointer">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <Image
                      src={`/assets/flags/flag-${currentFlag}.png`}
                      alt={currency}
                      width={24}
                      height={16}
                      loading="eager"
                      className="h-4 w-6 object-cover rounded-sm"
                    />
                  </span>
                  <span>{currencyInfo.symbol} {currency}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </div>
              </DropdownMenuTrigger>
              {/* font-sans for the same reason as the Resources menu above. */}
              <DropdownMenuContent align="end" className="w-56 font-sans">
                {currencyOptions.map((c) => {
                  const info = CURRENCIES[c.code];
                  return (
                    <DropdownMenuItem
                      key={c.code}
                      onClick={() => setCurrency(c.code)}
                      className={`flex items-center justify-between cursor-pointer ${currency === c.code ? 'bg-slate-100' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={`/assets/flags/flag-${c.flagCode}.png`}
                          alt={c.code}
                          width={20}
                          height={14}
                          className="h-3.5 w-5 object-cover rounded-sm shadow-sm"
                        />
                        <span className="font-medium">{info.symbol} {c.code}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{info.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <QuoteDialog>
              <button type="button" className="cursor-pointer bg-gold text-brand-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-md btn-pulse transition-all hover:bg-gold-600 hover:scale-105">
                Get a Quote
              </button>
            </QuoteDialog>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors duration-200 hover:border-slate-400"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="primary-mobile-menu"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <div
          id="primary-mobile-menu"
          className={`lg:hidden absolute left-0 right-0 top-full z-50 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        >
          <div className="mx-3 mt-2 rounded-2xl bg-brand-600 p-6 shadow-2xl shadow-black/30">
            {/* Nav Links */}
            <div className="flex flex-col">
              {navItems.map((item) => (
                <div key={item.href || item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setResourcesOpen((v) => !v)}
                        aria-expanded={resourcesOpen}
                        className="flex w-full items-center justify-between px-2 py-3.5 text-[15px] font-semibold text-white/90 transition-colors duration-200 hover:text-gold"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 text-white/40 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {resourcesOpen && (
                        <div className="mb-1 ml-3 flex flex-col border-l border-white/10 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeMenu}
                              className="px-2 py-2.5 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-gold"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-2 py-3.5 text-[15px] font-semibold text-white/90 transition-colors duration-200 hover:text-gold"
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 -rotate-90 text-white/30" />
                    </Link>
                  )}
                  <div className="h-px bg-white/10" />
                </div>
              ))}
              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="flex items-center justify-between px-2 py-3.5 text-[15px] font-semibold text-white/90 transition-colors duration-200 hover:text-gold"
              >
                Contact Us
                <ChevronDown className="h-4 w-4 -rotate-90 text-white/30" />
              </Link>
            </div>

            {/* CTA Button */}
            <div className="mt-5">
              <QuoteDialog>
                <button className="w-full rounded-xl bg-gold text-brand-600 px-5 py-3.5 text-base font-bold shadow-lg shadow-gold/20 btn-pulse active:scale-[0.97] transition-all duration-200 hover:bg-gold-600">
                  Get a Quote
                </button>
              </QuoteDialog>
            </div>

            {/* Contact Info */}
            <div className="mt-5 flex items-center justify-center gap-4 border-t border-white/10 pt-4">
              <a href="mailto:support@delfttours.com" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
                <Mail className="h-3.5 w-3.5" />
                <span>support@delfttours.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
