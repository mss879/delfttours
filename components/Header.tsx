'use client';

import { Mail, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const currencies = [
  { code: 'LKR', symbol: 'Rs', label: 'Sri Lankan Rupee' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);

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
      <div className="border-b border-[#082c46] bg-[#0b3e63] text-white">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-4 text-xs font-medium text-white sm:text-sm lg:px-8">
          <a
            className="flex items-center gap-2 transition-colors duration-200 hover:text-white/70"
            href="mailto:support@delfttours.com"
          >
            <Mail className="h-4 w-4" />
            <span>support@delfttours.com</span>
          </a>
          <a
            className="flex items-center gap-2 transition-colors duration-200 hover:text-white/70"
            href="tel:+61483909556"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">1800 930 516</span>
          </a>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <nav
          className="relative mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center gap-4 lg:gap-6">
            <a href="/" className="flex items-center">
              <img
                src="/delgyortoginallogo.png"
                alt="Delft Tours Logo"
                className="h-[74px] w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>

          <div className="hidden items-center justify-center lg:flex lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-900/5 hover:text-slate-900"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact-us"
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-900/5 hover:text-slate-900"
            >
              Contact Us
            </a>
          </div>

          <div className="hidden items-center gap-4 lg:flex lg:justify-end">
            <button className="rounded-full bg-[#0b3e63] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(11,62,99,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#0a3554]">
              Get a Quote
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-2 rounded-full border border-slate-200/60 px-3 py-1 text-sm text-slate-500 transition-colors duration-200 hover:border-slate-400 hover:text-slate-700 cursor-pointer">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                    {currency.symbol}
                  </div>
                  <span>{currency.code}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {currencies.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCurrency(c)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-medium">{c.code}</span>
                    <span className="text-slate-500 text-xs">{c.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button className="rounded-full bg-[#0b3e63] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-[rgba(11,62,99,0.25)] transition-transform duration-200 hover:scale-[1.03] hover:bg-[#0a3554]">
              Quote
            </button>
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
          className={`lg:hidden transition-[max-height] duration-300 ease-out ${isMenuOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mx-4 mb-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-900/5">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-2xl bg-slate-900/5 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-900/10"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="/contact-us"
                onClick={closeMenu}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:border-slate-400 hover:text-slate-900"
              >
                Contact Us
              </a>
              <button className="rounded-2xl bg-[#0b3e63] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(11,62,99,0.25)] transition-colors duration-200 hover:bg-[#0a3554]">
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
