import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutStats from '@/components/about/AboutStats';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata = {
    title: 'About Us | Delft Tours',
    description: 'Learn about Delft Tours, your premier travel partner in Sri Lanka. Discover our story, values, and commitment to authentic travel experiences.',
};

export default function AboutUsPage() {
    return (
        <div className="font-sans text-slate-900">
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



