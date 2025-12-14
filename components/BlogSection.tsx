'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    title: 'Guide to Simplifying Your Life',
    date: 'May 29, 2017',
    description: 'Declutter your mind and space with the art of minimalism. Learn practical tips to....',
    image: 'https://framerusercontent.com/images/3xwf8Uqb8EOOuidvp7kgrjWAZhA.png',
    href: '/blog/guide-to-simplifying-your-life'
  },
  {
    title: '5 Tips to Scale Your Startup',
    date: 'May 29, 2017',
    description: 'Take your business to the next level with these proven strategies. From market analysis....',
    image: 'https://framerusercontent.com/images/xtL0nwkFA2yz71TyrcOXWkRZvY.png',
    href: '/blog/5-tips-to-scale-your-startup'
  },
  {
    title: 'A Simple Guide to Budget Travel',
    date: 'February 11, 2024',
    description: 'Transform your travel experience with our budget-friendly tips. From savvy planning...',
    image: 'https://framerusercontent.com/images/HRUoamzhBoHWHyycMIFRK1zua5o.png',
    href: '/blog/a-simple-guide-to-budget-travel'
  },
  {
    title: 'Exploring Iceland’s Wonders',
    date: 'February 11, 2024',
    description: 'Take your business to the next level with these proven strategies. From market analysis...',
    image: 'https://framerusercontent.com/images/WXovSlPuC0eAhvI8zT86miMTmI.png',
    href: '/blog/exploring-iceland-s-wonders'
  }
];

export default function BlogSection() {
  return (
    <section className="pt-40 pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Explore Our Blog & Articles</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay inspired with travel tips, destination guides, and adventure stories. Our blog is packed with insights to help you plan your next unforgettable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogs.map((blog, index) => (
            <Link key={index} href={blog.href} className="group block h-full">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden h-full transition-all duration-300 hover:shadow-lg flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden p-2">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="p-6 pt-2 flex flex-col flex-grow">
                  <p className="text-sm text-slate-500 mb-2">{blog.date}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border-[1.5px] border-blue-600 text-slate-900 font-semibold hover:bg-blue-50 transition-colors"
          >
            Browse More Blogs
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
               <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
