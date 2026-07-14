'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'f1',
    question: 'Where is Delft Tours located?',
    answer: 'Delft Tours is a Sri Lanka–based inbound tour operator, headquartered at No 29/5 Jayasinghe Road, Kirullapone, Colombo 06.',
  },
  {
    id: 'f2',
    question: 'What destinations does Delft Tours cover?',
    answer: 'We specialise in inbound tours across Sri Lanka — from the Cultural Triangle and hill country to wildlife safaris and southern beaches. Every itinerary is designed and operated by our local team on the ground.',
  },
  {
    id: 'f3',
    question: 'How do I book a tour with Delft Tours?',
    answer: 'You can request a quote through our website, call us directly, or send us an email. Our team will then contact you to confirm your dates, itinerary, and payment details.',
  },
  {
    id: 'f4',
    question: 'How long do your Sri Lanka tours usually last?',
    answer: 'Our tours are fully customisable. Itineraries typically range from 5 days to 2 weeks, depending on your interests and how much of Sri Lanka you would like to explore. We work with you to plan the perfect timeline.',
  },
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const isFuzzyMatch = (text: string, query: string) => {
    // Normalize text and split into words
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const textWords = normalize(text).split(/\s+/).filter(w => w.length > 0);
    const queryWords = normalize(query).split(/\s+/).filter(w => w.length > 0);

    if (queryWords.length === 0) return true;

    // Check if ALL query words have at least one similar word in the text (AND logic)
    return queryWords.every(qWord => {
      // 1. Direct substring match (covers "loc" matching "location")
      if (text.toLowerCase().includes(qWord)) return true;

      // 2. Word-level fuzzy matching
      return textWords.some(tWord => {
        // Direct include (already covered above efficiently for whole text, but good for individual words too)
        if (tWord.includes(qWord)) return true;

        // Reverse include (if query word is longer than text word, but contains it - unlikely but possible)
        if (qWord.includes(tWord) && tWord.length >= 4) return true;

        // Common stem/prefix match (e.g. "location" -> "located")
        // Require at least 4 characters to avoid false positives with short words
        if (qWord.length >= 4 && tWord.length >= 4) {
          if (qWord.substring(0, 4) === tWord.substring(0, 4)) return true;
        }

        // Simple plural handling
        const qBase = qWord.endsWith('s') ? qWord.slice(0, -1) : qWord;
        const tBase = tWord.endsWith('s') ? tWord.slice(0, -1) : tWord;
        if (qBase === tBase && qBase.length > 2) return true;

        return false;
      });
    });
  };

  const filteredItems = faqData.filter(item => {
    const text = `${item.question} ${item.answer}`;
    return isFuzzyMatch(text, searchQuery);
  });

  return (
    <section className="mt-24">
      <div className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:p-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Frequently <span className="font-normal text-slate-500">Asked Questions</span>
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                Welcome to Delft Tours! We&apos;re excited to have you with us. For any questions you may have, please explore our FAQ page where you&apos;ll find helpful answers and information.
              </p>
            </div>

            <div className="space-y-3">
              <label htmlFor="faq-search" className="text-sm font-semibold text-slate-900">
                How Can We Help?
              </label>
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="faq-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask a question"
                  className="h-12 w-full rounded-full border-slate-200 bg-white pl-12 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:block shrink-0">
            <div className="relative h-48 w-48 rounded-3xl overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/faq.webp" // changed from /faq.jpeg to match file extension if needed, but existing code said /faq.jpeg so keeping it.
                alt="FAQ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 300px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8 lg:p-12">
        <Accordion type="single" collapsible className="w-full">
          {filteredItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-slate-100 last:border-0 py-2">
              <AccordionTrigger className="text-left py-4 hover:no-underline hover:text-brand-600">
                <span className="text-base font-semibold text-slate-900 transition-colors group-hover:text-brand-600">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-base leading-relaxed text-slate-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No results found for &quot;{searchQuery}&quot;
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center">
        <Button asChild className="h-12 rounded-full bg-slate-900 px-8 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg">
          <Link href="/faq">Show More</Link>
        </Button>
      </div>
    </section>
  );
}
