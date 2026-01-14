import Image from 'next/image';
import Link from 'next/link';

const bulletPoints = [
  'Adventure awaits around every corner',
  'Roam free, wander often',
  'Create memories that last a lifetime',
];

const stats = [
  {
    value: '1000+',
    lines: ['Happy', 'Customer'],
    icon: 'https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a6938d8b59f2c7283b36_026-schedule.svg',
    alt: 'Calendar icon',
  },
  {
    value: '300+',
    lines: ['Destinations', 'Collaboration'],
    icon: 'https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a69363b6e3f97282d820_011-dish.svg',
    alt: 'Dish icon',
  },
  {
    value: '30+',
    lines: ['Years', 'Experience'],
    icon: 'https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a6938689b891a24f5e53_018-beach.svg',
    alt: 'Beach icon',
  },
];

export default function AboutSection() {
  return (
    <section className="relative w-full bg-white py-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-4 lg:grid lg:grid-cols-[minmax(0,0.95fr)_1fr] lg:items-center lg:px-6 xl:px-0">
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[48px] bg-slate-200">
            <Image
              src="https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b5df3d62a7ecf802613450_Rectangle%206158.avif"
              alt="Travelers enjoying a seaside view"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>

          <div className="absolute -top-16 right-6 hidden h-[160px] w-[160px] sm:block">
            <div className="relative h-full w-full animate-[spin_18s_linear_infinite]">
              <Image
                src="https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a8c77bb06b7704a261b3_Group%201000008415.avif"
                alt="Contact us circle"
                fill
                className="object-contain"
                sizes="160px"
                priority
              />
            </div>
          </div>

          <div className="absolute -bottom-24 left-1/2 hidden h-[240px] w-[240px] -translate-x-1/2 sm:block" aria-hidden="true">
            <div className="h-full w-full rounded-[44px] border border-white/60" />
          </div>

          <div className="absolute -bottom-16 left-1/2 h-[220px] w-[220px] -translate-x-1/2 sm:-bottom-12 sm:left-auto sm:right-4 sm:translate-x-0">
            <div className="relative h-full w-full rounded-[40px] border-[12px] border-white bg-white shadow-[0_40px_110px_rgba(15,23,42,0.15)]">
              <Image
                src="https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b5df3ca7f59044d15d7590_Rectangle%206159.avif"
                alt="Long-tail boat in tropical waters"
                fill
                className="rounded-[28px] object-cover"
                sizes="220px"
              />
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-6">

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">About Us</span>
          <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            Your Gateway To Amazing Experiences
          </h2>
          <p className="max-w-xl text-base text-slate-600 sm:text-lg">
            We have been operating for over a decade, providing top-notch services to our clients and building a strong track record.
          </p>

          <ul className="mt-2 flex flex-col gap-4">
            {bulletPoints.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base font-semibold text-slate-800">
                <Image
                  src="https://cdn.prod.website-files.com/66b5d6635ee4014275999ec3/66b9a405410e4b22f9acd0b3_%EF%81%BC.png"
                  alt="Checkmark"
                  width={24}
                  height={24}
                  className="mt-1 h-5 w-5 flex-shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="flex items-start gap-4">
                <Image
                  src={stat.icon}
                  alt={stat.alt}
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
                <div>
                  <div className="text-3xl font-semibold text-slate-900">{stat.value}</div>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/tour"
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-green-500 px-8 py-3 text-base font-semibold text-white shadow-[0_20px_50px_rgba(23,157,170,0.35)] transition hover:bg-green-600"
          >
            <span>Find Tours</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
