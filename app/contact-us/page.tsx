'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitInquiry } from '@/app/actions/submit-inquiry';

import emailjs from '@emailjs/browser';
import SuccessModal from '@/components/SuccessModal';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        'service_bh4m7kr',
        'template_6qzswnb',
        form,
        'ZvEmfrY7ik6bouEZH'
      );

      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

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
              We'd love to hear from you. Reach out to us for any inquiries or to plan your next adventure.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Get in touch</h2>
                <p className="mt-4 text-lg text-slate-600">
                  Whether you have a question about our tours, pricing, or anything else, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="flex items-start gap-4 border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#179daa] text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <p className="mt-1 text-slate-600">Mon-Fri from 8am to 5pm</p>
                    <a href="tel:+94112852455" className="mt-2 block font-medium text-[#179daa] hover:underline">
                      +94 11 285 2455
                    </a>
                  </div>
                </Card>

                <Card className="flex items-start gap-4 border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#179daa] text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="mt-1 text-slate-600">Our friendly team is here to help.</p>
                    <a href="mailto:support@delfttours.com" className="mt-2 block font-medium text-[#179daa] hover:underline">
                      support@delfttours.com
                    </a>
                  </div>
                </Card>

                <Card className="flex items-start gap-4 border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#179daa] text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Office</h3>
                    <p className="mt-1 text-slate-600">Come say hello at our office HQ.</p>
                    <p className="mt-2 font-medium text-slate-900">
                      No 29/5 Jayasinghe Road,<br />
                      Kirullapone, Colombo 06,<br />
                      Sri Lanka
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:p-12">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+94 77 123 4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your travel plans..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#179daa] text-lg font-semibold hover:bg-[#0f766e]"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
