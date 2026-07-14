import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

// Deliberately scoped to questions about the packages on THIS page — booking,
// payments, insurance, packing, contact and the rest live on /faq and are not
// repeated here. If a question isn't about choosing a tour, it belongs on /faq.
const tourFaqs: { id: string; question: string; answer: string }[] = [
  {
    id: 't1',
    question: 'How long are your Sri Lanka tours?',
    answer:
      'Our packages range from 3 to 15 days. Shorter tours suit transit stays and add-ons, while longer itineraries cover the Cultural Triangle, hill country, wildlife parks and the southern coast at a more relaxed pace.',
  },
  {
    id: 't2',
    question: 'Can I customise one of these itineraries?',
    answer:
      'Yes. Every itinerary here is a starting point rather than a fixed departure — we adjust the route, pace, hotels and activities around your dates and interests. Request a quote and our team will tailor it with you.',
  },
  {
    id: 't3',
    question: 'Are these private tours or group tours?',
    answer:
      'All of our tours are private and escorted. You travel with your own driver-guide and private vehicle, so you are never grouped with other travellers and can adjust the day as you go.',
  },
  {
    id: 't4',
    question: "What's included in the price?",
    answer:
      'Each tour lists its own inclusions on its detail page. Typically that covers your private driver-guide, private vehicle, accommodation with the stated meal plan, airport pick-up and drop-off, and a dedicated tour consultant. Prices shown are a starting point and vary with your dates, hotel tier and group size.',
  },
];

export default function TourFaqSection() {
  return (
    <section className="mt-24">
      <div className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8 lg:p-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Questions about <span className="font-normal text-slate-500">our tours</span>
          </h2>
          <p className="text-base leading-relaxed text-slate-600">
            A few things worth knowing while you compare packages. For booking, payments,
            insurance and travel advice, head to our full FAQ.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-8 w-full">
          {tourFaqs.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-slate-100 py-2 last:border-0"
            >
              <AccordionTrigger className="py-4 text-left hover:text-brand-600 hover:no-underline">
                <span className="text-base font-semibold text-slate-900">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-base leading-relaxed text-slate-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Looking for something else? Our FAQ covers booking, payments, insurance and more.
          </p>
          <Button
            asChild
            className="h-12 shrink-0 rounded-full bg-slate-900 px-8 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg"
          >
            <Link href="/faq">
              Visit our FAQ page <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
