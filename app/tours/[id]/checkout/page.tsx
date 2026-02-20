import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { tourDetails } from '../../tour-data';
import TourCheckoutForm from '@/components/TourCheckoutForm';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
    return tourDetails.map((tour) => ({
        id: tour.id,
    }));
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const tour = tourDetails.find((t) => t.id === params.id);

    if (!tour) {
        notFound();
    }

    // Helper to safely split title
    const titleMatch = tour.title.match(/^(.*?)\s*\((.*?)\)$/);
    const mainTitle = titleMatch ? titleMatch[1] : tour.title;
    const subTitle = titleMatch ? `(${titleMatch[2]})` : '';

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <main className="py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href={`/tours/${tour.id}`}
                            className="inline-flex items-center text-sm text-slate-500 hover:text-[#0b3e63] transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tour Details
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0b3e63]">Secure Checkout</h1>
                        <p className="text-slate-600 mt-2">Complete your booking for your dream holiday.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Checkout Form */}
                        <div className="lg:col-span-2">
                            <TourCheckoutForm
                                tourId={tour.id}
                                tourTitle={tour.title}
                                tourPrice={tour.startingPrice}
                            />
                        </div>

                        {/* Right Column: Tour Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={tour.images && tour.images.length > 0 ? tour.images[0] : '/assets/external/placeholder-tour.png'}
                                        alt={tour.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-xs font-medium bg-green-500 inline-block px-2 py-1 rounded mb-1">
                                            {tour.days.length} Days / {tour.days.length - 1} Nights
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-bold text-lg text-[#0b3e63] mb-2">{mainTitle}</h3>
                                    <p className="text-sm text-slate-500 mb-4">{subTitle}</p>

                                    <div className="space-y-3 pt-4 border-t border-slate-100">
                                        <div className="flex items-start">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                            <span className="text-sm text-slate-600">Private dedicated vehicle & English speaking driver-guide</span>
                                        </div>
                                        <div className="flex items-start">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                            <span className="text-sm text-slate-600">Accommodation with breakfast & dinner</span>
                                        </div>
                                        <div className="flex items-start">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                            <span className="text-sm text-slate-600">All government taxes & service charges</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-end">
                                        <div className="text-sm text-slate-500">Starting price from</div>
                                        <div className="text-2xl font-bold text-[#0b3e63]">{tour.startingPrice}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                                <p className="flex items-center font-semibold mb-1">
                                    Need help?
                                </p>
                                <p>
                                    Call us 24/7 at <span className="font-bold">+94 77 123 4567</span> or email <span className="font-bold">booking@delfttours.com</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
