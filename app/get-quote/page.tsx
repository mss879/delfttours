

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';

export default function GetQuotePage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />
            <main className="py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-[#0b3e63] mb-4">Plan Your Dream Trip</h1>
                        <p className="text-lg text-slate-600">
                            Tell us about your perfect holiday, and we will craft a custom itinerary just for you.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
                        <QuoteForm />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
