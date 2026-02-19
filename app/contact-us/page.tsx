import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Us | Delft Tours',
  description: 'Get in touch with our team to plan your next adventure in Sri Lanka and beyond.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-slate-900 py-24 text-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/90 to-slate-900/60" />
            <video
              src="/contact-hero.mp4"
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Contact Us</h1>
            <p className="text-lg text-slate-200">
              We&apos;d love to hear from you. Reach out to us for any inquiries or to plan your next adventure.
            </p>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
