import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Shared shell for the site's legal / policy pages (Privacy, Terms,
// Cancellation). Keeps the three pages visually identical and on-brand so each
// page file only has to supply its own body copy.
export default function LegalLayout({
  title,
  eyebrow = "Legal",
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 font-sans">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5 bg-brand-900">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-green-600/15 blur-[100px]" />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20">
            <div className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
              <span className="block h-0.5 w-8 rounded-full bg-gold" />
              {eyebrow}
              <span className="block h-0.5 w-8 rounded-full bg-gold" />
            </div>
            <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                {intro}
              </p>
            )}
            <p className="mt-6 text-xs uppercase tracking-wide text-white/40">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
          <article
            className="prose prose-slate max-w-none
              prose-headings:font-semibold prose-headings:text-brand-700
              prose-h2:mb-3 prose-h2:mt-10 prose-h2:text-2xl
              prose-h3:mb-2 prose-h3:mt-8 prose-h3:text-lg
              prose-p:leading-relaxed prose-p:text-slate-600
              prose-li:text-slate-600 prose-li:marker:text-brand-400
              prose-strong:text-slate-900
              prose-a:font-semibold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:text-brand-700"
          >
            {children}
          </article>

          {/* Contact prompt */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">
              Questions about this policy?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              If anything here is unclear, our Colombo team is happy to help
              before you book.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="mailto:support@delfttours.com"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                <Mail className="h-4 w-4" />
                support@delfttours.com
              </a>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
