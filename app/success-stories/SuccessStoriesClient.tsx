'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function SuccessStoriesClient({ testimonials }: { testimonials: any[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring' as const, 
        stiffness: 40,
        damping: 15
      } 
    },
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] pb-24">
      {/* Premium Dark Hero Section */}
      <section className="relative pt-40 pb-32 px-4 bg-[#0b2a3e] overflow-hidden">
        {/* Abstract Background patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          >
            <Star className="w-4 h-4 fill-current" /> Validated Traveler Reviews
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1] tracking-tight"
          >
            Journeys That Leave <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white italic">A Lasting Impression</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Don't just take our word for it. Read the unedited, genuine experiences of 
            travelers who chose Delft Tours to explore the pearl of the Indian Ocean.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-20">
        {testimonials && testimonials.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((t: any) => (
              <motion.div 
                key={t.id}
                variants={itemVariants}
                className="h-full flex flex-col bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100/60 relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
              >
                {/* Decorative Quote mark */}
                <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100/80 rotate-180 transition-all duration-500 group-hover:scale-110 group-hover:text-cyan-50" />
                
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex gap-1.5 text-[#FFC947] mb-6">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current drop-shadow-sm" />
                    ))}
                  </div>

                  <p className="text-slate-700 md:text-lg leading-relaxed font-serif mb-8 whitespace-pre-wrap relative z-10 flex-1">
                    "{t.content}"
                  </p>

                  <div className="border-t border-slate-100 pt-6 flex items-center justify-between mt-auto">
                    <div>
                      <h4 className="font-bold text-slate-900 tracking-tight">{t.author_name}</h4>
                      {t.author_location && (
                        <p className="text-sm text-slate-500 mt-1 font-medium">{t.author_location}</p>
                      )}
                    </div>
                    {t.tour_type && (
                      <div className="inline-flex items-center px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-xs font-semibold text-slate-600 transition-colors group-hover:bg-[#0b2a3e] group-hover:text-white group-hover:border-[#0b2a3e]">
                        {t.tour_type}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 text-center max-w-2xl mx-auto"
          >
            <Quote className="w-16 h-16 text-slate-100 mx-auto mb-6" />
            <h3 className="text-3xl font-serif text-slate-900 mb-4">Our reviews are arriving soon.</h3>
            <p className="text-slate-500 text-lg">Check back shortly to hear from our latest travelers!</p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
