"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import SuccessModal from "@/components/SuccessModal";

export default function ContactForm() {
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
        <>
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Details */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">
                                Get in touch
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Whether you have a question about our tours, pricing, or
                                anything else, our team is ready to answer all your questions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <Card className="flex items-start gap-4 border-slate-200 bg-slate-50 p-6 shadow-sm">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#179daa] text-white">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Phone</h3>
                                    <p className="mt-1 text-slate-600">
                                        Mon-Fri from 8am to 5pm
                                    </p>
                                    <a
                                        href="tel:+94112852455"
                                        className="mt-2 block font-medium text-[#179daa] hover:underline"
                                    >
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
                                    <p className="mt-1 text-slate-600">
                                        Our friendly team is here to help.
                                    </p>
                                    <a
                                        href="mailto:support@delfttours.com"
                                        className="mt-2 block font-medium text-[#179daa] hover:underline"
                                    >
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
                                    <p className="mt-1 text-slate-600">
                                        Come say hello at our office HQ.
                                    </p>
                                    <p className="mt-2 font-medium text-slate-900">
                                        No 29/5 Jayasinghe Road,
                                        <br />
                                        Kirullapone, Colombo 06,
                                        <br />
                                        Sri Lanka
                                    </p>
                                </div>
                            </Card>

                            <Card className="flex items-center gap-4 border-slate-200 bg-slate-50 p-6 shadow-sm">
                                <div className="flex w-full flex-col gap-4">
                                    <h3 className="font-semibold text-slate-900">Follow Us</h3>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://www.instagram.com/delfttours/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#179daa] hover:text-[#0f766e] transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <Instagram className="h-6 w-6" />
                                        </a>
                                        <a
                                            href="https://www.facebook.com/profile.php?id=61583635253275"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#179daa] hover:text-[#0f766e] transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <Facebook className="h-6 w-6" />
                                        </a>
                                        <a
                                            href="https://www.tiktok.com/@delft_tours"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#179daa] hover:text-[#0f766e] transition-colors"
                                            aria-label="TikTok"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 50 50"
                                                className="h-6 w-6 fill-current"
                                            >
                                                <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.youtube.com/@DelftToursTravels"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#179daa] hover:text-[#0f766e] transition-colors"
                                            aria-label="YouTube"
                                        >
                                            <Youtube className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:p-12">
                        <h2 className="mb-6 text-2xl font-bold text-slate-900">
                            Send us a message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+94 77 123 4567"
                                />
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
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
