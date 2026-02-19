'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Menu, X, ChevronDown, Globe } from 'lucide-react';
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currency, setCurrency, currencyInfo } = useCurrency();
  const currentFlag = currencyOptions.find(c => c.code === currency)?.flagCode || 'us';

  const navLinks = useMemo(
    () => [
      { href: '/tours', label: 'Holidays & Tours' },
      { href: '/success-stories', label: 'Success Stories' },
      { href: '/about-us', label: 'About Us' },
      { href: '/faq', label: 'FAQ' },
    ],
    []
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-[60] font-sans">
      <div className="border-b border-white/20 bg-white/70 backdrop-blur-md shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <nav
          className="relative mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center gap-4 lg:gap-6">
            <a href="/" className="flex items-center">
              <Image
                src="/delgyortoginallogo.png"
                alt="Delft Tours Logo"
                width={200}
                height={74}
                className="h-[74px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </a>
          </div>

          <div className="hidden items-center justify-center lg:flex lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-full px-4 py-2 text-base font-medium text-slate-600 transition-all duration-200 hover:bg-slate-900/5 hover:text-slate-900"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact-us"
              className="rounded-full px-4 py-2 text-base font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-900/5 hover:text-slate-900"
            >
              Contact Us
            </a>
          </div>

          <div className="hidden items-center gap-4 lg:flex lg:justify-end">
            <QuoteDialog>
              <div className="cursor-pointer bg-[#FFC947] text-[#0b3e63] px-6 py-2.5 rounded-full font-bold hover:bg-[#ffbf29] transition-all transform hover:scale-105 shadow-md btn-pulse">
                Get a Quote
              </div>
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
                      className="h-4 w-6 object-cover rounded-sm"
                    />
                  </span>
                  <span>{currencyInfo.symbol} {currency}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
              <div className="cursor-pointer bg-[#FFC947] text-[#0b3e63] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-md btn-pulse transition-all hover:bg-[#ffbf29] hover:scale-105">
                Get a Quote
              </div>
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
          <div className="mx-3 mt-2 rounded-2xl bg-[#0b3e63] p-6 shadow-2xl shadow-black/30">
            {/* Nav Links */}
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between px-2 py-3.5 text-[15px] font-semibold text-white/90 transition-colors duration-200 hover:text-[#FFC947]"
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-white/30" />
                  </a>
                  {index < navLinks.length - 1 && (
                    <div className="h-px bg-white/10" />
                  )}
                </div>
              ))}
              <div className="h-px bg-white/10" />
              <a
                href="/contact-us"
                onClick={closeMenu}
                className="flex items-center justify-between px-2 py-3.5 text-[15px] font-semibold text-white/90 transition-colors duration-200 hover:text-[#FFC947]"
              >
                Contact Us
                <ChevronDown className="h-4 w-4 -rotate-90 text-white/30" />
              </a>
            </div>

            {/* CTA Button */}
            <div className="mt-5">
              <QuoteDialog>
                <button className="w-full rounded-xl bg-[#FFC947] text-[#0b3e63] px-5 py-3.5 text-base font-bold shadow-lg shadow-[#FFC947]/20 btn-pulse active:scale-[0.97] transition-all duration-200 hover:bg-[#ffbf29]">
                  Get a Quote
                </button>
              </QuoteDialog>
            </div>

            {/* Contact Info */}
            <div className="mt-5 flex items-center justify-center gap-4 border-t border-white/10 pt-4">
              <a href="mailto:info@delfttours.com" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
                <Mail className="h-3.5 w-3.5" />
                <span>info@delfttours.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
