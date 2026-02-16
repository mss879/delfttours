'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqCategories = [
  {
    title: "General Information",
    items: [
      {
        question: 'Where is Delft Tours located?',
        answer: 'Delft Tours is located in Sri Lanka, at No 29/5 Jayasinghe Road, Kirullapone, Colombo 06.',
      },
      {
        question: 'What are the countries to which I can Fly with Delft Tours?',
        answer: 'We offer trips across multiple destinations including Sri Lanka, Maldives, Vietnam, Indonesia, Dubai, Cambodia, Singapore, and Malaysia.',
      },
      {
        question: 'Where can I read previous reviews & customer success stories?',
        answer: 'You can read reviews and success stories on our "Success Stories" page or check our reviews on independent travel forums and social media platforms.',
      },
    ]
  },
  {
    title: "Booking & Payments",
    items: [
      {
        question: 'How do I book a tour with Delft Tours?',
        answer: 'You can request a quote through our website, call us directly, or send an email. Our team will contact you to confirm dates, itinerary, and payment details.',
      },
      {
        question: 'When will the reservation be confirmed?',
        answer: 'Your reservation will be confirmed once the initial deposit is made. You will receive a booking confirmation email with all the details.',
      },
      {
        question: 'Can I read the terms and conditions before making a reservation?',
        answer: 'Yes, our terms and conditions are available on our website. We encourage you to read them carefully before confirming your booking.',
      },
      {
        question: 'How will I receive confirmation of my booking?',
        answer: 'Confirmation will be sent to your registered email address along with the official invoice and itinerary details.',
      },
    ]
  },
  {
    title: "Travel & Logistics",
    items: [
      {
        question: 'Do I need travel insurance?',
        answer: 'Yes, we highly recommend obtaining comprehensive travel insurance that covers trip cancellations, medical emergencies, and lost luggage for your peace of mind.',
      },
      {
        question: 'What type of clothes should I pack?',
        answer: 'This depends on your destination and the time of year. For tropical destinations like Sri Lanka and Maldives, light cotton clothing is recommended.',
      },
      {
        question: 'Should I pay for taking photographs of people or places?',
        answer: 'In some cultural sites or when interacting with locals, a small tip or permission may be required. Your guide will advise you on the specific etiquette.',
      },
    ]
  },
  {
    title: "Support & Services",
    items: [
      {
        question: 'What services can I book with Delft Tours?',
        answer: 'We offer a wide range of services including tailor-made tours, group packages, hotel bookings, transport arrangements, and specialized getaway holidays.',
      },
      {
        question: 'Can I make a complaint if something goes wrong?',
        answer: 'Absolutely. We take customer satisfaction seriously. If you encounter any issues, please contact our support team immediately.',
      },
      {
        question: 'How can I contact Delft Tours if I have questions?',
        answer: 'You can contact us 24/7 via phone at +94 11 285 2455 or email us at support@delfttours.com.',
      },
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-[#0b3e63] py-24 text-center overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="relative z-10 mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl tracking-tight">
                How can we help?
              </h1>
              <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Find answers to common questions about planning your dream vacation with Delft Tours.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for answers..."
                  className="h-14 pl-12 rounded-full border-0 bg-white/90 backdrop-blur-sm shadow-xl text-lg placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-300 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mx-auto max-w-5xl px-4 py-20">
          <div className="space-y-12">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                    {category.title}
                  </h2>
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${catIndex}-${index}`}
                          className="border-b border-slate-100 last:border-none px-6"
                        >
                          <AccordionTrigger className="py-6 text-left text-base font-semibold text-slate-800 hover:text-[#0b3e63] hover:no-underline lg:text-lg transition-colors">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-6 text-base text-slate-600 leading-relaxed max-w-3xl">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No results found for "{searchQuery}".</p>
                <Button
                  variant="link"
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-[#0b3e63]"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-6 text-[#0b3e63]">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Still have questions?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our friendly team is here to help you with any inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact-us">
                <Button className="h-12 px-8 rounded-full bg-[#0b3e63] hover:bg-[#082f4b] text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  Contact Support
                </Button>
              </Link>
              <div className="flex items-center gap-6 px-6 py-3 bg-slate-50 rounded-full border border-slate-100">
                <a href="tel:+94112852455" className="flex items-center gap-2 text-slate-600 hover:text-[#0b3e63] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+94 11 285 2455</span>
                </a>
                <div className="w-px h-4 bg-slate-300"></div>
                <a href="mailto:support@delfttours.com" className="flex items-center gap-2 text-slate-600 hover:text-[#0b3e63] transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
