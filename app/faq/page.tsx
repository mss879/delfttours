'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Where is Delft Tours located?',
    answer: 'Delft Tours is located in Sri Lanka, at No 29/5 Jayasinghe Road, Kirullapone, Colombo 06.',
  },
  {
    question: 'What are the countries to which I can Fly with Delft Tours?',
    answer: 'We offer trips across multiple destinations including Sri Lanka, Maldives, Vietnam, Indonesia, Dubai, Cambodia, Singapore, and Malaysia. Share your preferred country or travel style and we will guide you to the best options.',
  },
  {
    question: 'How do I book a tour with Delft Tours?',
    answer: 'You can request a quote through our website, call us directly, or send an email. Our team will contact you to confirm dates, itinerary, and payment details.',
  },
  {
    question: 'What are the general timings look like, when I book with Delft Tours?',
    answer: 'Timings depend on your itinerary. Once you share your dates and preferences, we will confirm a detailed schedule tailored to your needs.',
  },
  {
    question: 'When will the reservation be confirmed?',
    answer: 'Your reservation will be confirmed once the initial deposit is made. You will receive a booking confirmation email with all the details.',
  },
  {
    question: 'How can I contact Delft Tours, If I have questions?',
    answer: 'You can contact us 24/7 via phone at +94 11 285 2455 or email us at support@delfttours.com. We are here to assist you at any time.',
  },
  {
    question: 'What services can I book with Delft Tours?',
    answer: 'We offer a wide range of services including tailor-made tours, group packages, hotel bookings, transport arrangements, and specialized getaway holidays.',
  },
  {
    question: 'Do I need travel insurance?',
    answer: 'Yes, we highly recommend obtaining comprehensive travel insurance that covers trip cancellations, medical emergencies, and lost luggage for your peace of mind.',
  },
  {
    question: 'What type of clothes should I pack?',
    answer: 'This depends on your destination and the time of year. For tropical destinations like Sri Lanka and Maldives, light cotton clothing is recommended. We will provide a packing list with your itinerary.',
  },
  {
    question: 'Should I pay for taking photographs of people or places?',
    answer: 'In some cultural sites or when efficient with locals, a small tip or permission may be required. Your guide will advise you on the specific etiquette for each location.',
  },
  {
    question: 'Where can I read previous reviews & customer success stories?',
    answer: 'You can read reviews and success stories on our "Success Stories" page or check our reviews on independent travel forums and social media platforms.',
  },
  {
    question: 'Can I make a complaint to Delft Tours if something goes wrong?',
    answer: 'Absolutely. We take customer satisfaction seriously. If you encounter any issues, please contact our support team immediately, and we will do our best to resolve it.',
  },
  {
    question: 'How will I receive confirmation of my booking?',
    answer: 'Confirmation will be sent to your registered email address along with the official invoice and itinerary details.',
  },
  {
    question: 'Can I read the terms and conditions before making a reservation?',
    answer: 'Yes, our terms and conditions are available on our website. We encourage you to read them carefully before confirming your booking.',
  },
  {
    question: 'What are the different product options I have?',
    answer: 'We offer Tailor Made Tours for personalized experiences, Fixed Departures or Group Tours for social travel, and Getaway Holidays for quick, relaxing breaks.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#0b3e63] py-20 text-center">
          <div className="relative z-10 mx-auto max-w-4xl px-4">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Frequently Asked Questions</h1>
            <p className="text-lg text-slate-200">
              Find answers to common questions about planning, booking, and experiencing your dream vacation with Delft Tours.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index + 1}`}
                  className="rounded-2xl border border-slate-200 px-6 data-[state=open]:bg-slate-50"
                >
                  <AccordionTrigger className="py-6 text-left text-base font-semibold text-slate-900 hover:no-underline lg:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
