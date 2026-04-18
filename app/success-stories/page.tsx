import { getTestimonials } from '@/app/actions/testimonials';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SuccessStoriesClient from './SuccessStoriesClient';

export const metadata: Metadata = {
  title: 'Success Stories | Delft Tours Sri Lanka',
  description: 'Read real stories and reviews from travelers who have experienced the magic of Sri Lanka with Delft Tours.',
  alternates: {
    canonical: 'https://delfttours.com/success-stories',
  },
};

export default async function SuccessStoriesPage() {
  const testimonials = await getTestimonials(true); // only published

  return (
    <>
      <Header />
      <SuccessStoriesClient testimonials={testimonials} />
      <Footer />
    </>
  );
}
