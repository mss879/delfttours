import { getTestimonials } from "@/app/actions/testimonials";
import TestimonialsClient from "@/components/admin/TestimonialsClient";

export const metadata = {
  title: 'Manage Testimonials | Delft Admin',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Testimonials</h1>
        <p className="text-slate-500 mt-1">Review, add, and publish customer success stories.</p>
      </div>

      <TestimonialsClient initialTestimonials={testimonials || []} />
    </div>
  );
}
