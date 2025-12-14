'use client';

import Link from 'next/link';

const features = [
  {
    icon: 'https://framerusercontent.com/images/yOKwFdFKY3vjnBjIFSHsbvJtGEw.svg',
    title: 'Expert Travel Guides',
    description: 'Hey, you’ve gotta check out these awesome tips and local hacks for a trip you won’t forget!',
    bg: 'bg-[#E8EEFF]',
  },
  {
    icon: 'https://framerusercontent.com/images/xDlIioBbdkjqzyh8Xb7gwdIkME.svg?width=44&height=45',
    title: 'Customizable Itineraries',
    description: 'Turn your trip into your own adventure – switch things up however you feel like!',
    bg: 'bg-[#F6EFFF]',
  },
  {
    icon: 'https://framerusercontent.com/images/i9CGUTJ7W9zjCZqQzogEhO50rC8.svg?width=44&height=45',
    title: 'Handpicked Destinations',
    description: 'Hey, you gotta see some of the wildest and most unique spots on the planet!',
    bg: 'bg-[#FFEFEF]',
  },
  {
    icon: 'https://framerusercontent.com/images/qaMqFMP6O0oJf1VF1GJxGHX0vi8.svg?width=44&height=45',
    title: '24/7 Customer Support',
    description: 'You can totally rely on our awesome team to help you out whenever you need!',
    bg: 'bg-[#FFF1D8]',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 lg:px-20 py-24">
      <div className="flex flex-col gap-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="max-w-xl space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Why Choose MonksTrip?</h2>
            <p className="text-lg text-slate-600">
              At MonksTrip, we’re proud to partner with some of the most innovative and trusted companies in the world.
            </p>
          </div>
          
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-[#001D22] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity shrink-0"
          >
            <span>Contact Us</span>
            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
               </svg>
            </div>
          </Link>
        </div>

        {/* Video Section */}
        <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden">
          <video 
            src="https://framerusercontent.com/assets/0OHtSMgrBACOp6V9EqV3e6KtlSQ.mp4" 
            className="w-full h-full object-cover"
            loop 
            muted 
            playsInline
            autoPlay
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center shrink-0`}>
                <img src={feature.icon} alt="" className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
