import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutStats from '@/components/about/AboutStats';
import AboutCTA from '@/components/about/AboutCTA';



export default function AboutUsPage() {
    return (
        <div className="min-h-screen glass-gradient font-sans text-slate-900">
            <Header />
            <AboutHero />
            <AboutStory />
            <AboutValues />
            <AboutStats />
            <AboutCTA />
            <Footer />
        </div>
    );
}



