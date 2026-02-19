import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found | Delft Tours',
    description: 'The page you are looking for could not be found. Return to Delft Tours to explore Sri Lanka.',
};

export default function NotFound() {
    return (
        <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f0f4f8] via-white to-[#f0f4f8] px-4 text-center">
            {/* Decorative background elements */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#0b3e63]/5 blur-[120px]" />
                <div className="absolute right-[20%] top-[20%] h-[200px] w-[200px] rounded-full bg-[#FFC947]/10 blur-[80px]" />
                <div className="absolute left-[15%] bottom-[25%] h-[250px] w-[250px] rounded-full bg-[#0b3e63]/5 blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-lg space-y-6">
                {/* 404 Number */}
                <h1 className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tight">
                    <span className="bg-gradient-to-br from-[#0b3e63] via-[#0b3e63]/80 to-[#FFC947] bg-clip-text text-transparent">
                        404
                    </span>
                </h1>

                {/* Message */}
                <div className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Page Not Found
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                        Looks like this page took a detour! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-[#0b3e63] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#0b3e63]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#0b3e63]/30"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Back to Home
                    </Link>
                    <Link
                        href="/tours"
                        className="inline-flex items-center gap-2 rounded-full bg-[#FFC947] px-8 py-3.5 text-base font-bold text-[#0b3e63] shadow-md btn-pulse transition-all duration-300 hover:scale-105 hover:bg-[#ffbf29]"
                    >
                        Explore Tours
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Decorative compass icon */}
            <div className="absolute bottom-8 opacity-[0.04]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 md:h-56 md:w-56 text-[#0b3e63]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
                </svg>
            </div>
        </main>
    );
}
