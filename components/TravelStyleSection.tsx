import Image from 'next/image';
import Link from 'next/link';

type Category = {
  title: string;
  href: string;
  image: string;
};

const leftColumn: Category[] = [
  {
    title: 'Hiking and trekking',
    href: 'https://exploreza.webflow.io/tour-category/hiking-and-trekking',
    image:
      'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/677fad08bb7b195cb56ea248_travel%20image%20four.webp',
  },
  {
    title: 'Adventure',
    href: 'https://exploreza.webflow.io/tour-category/adventure',
    image:
      'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/677fad088916aebe6bd9e978_travel%20image%20two.webp',
  },
  {
    title: 'Family trip',
    href: 'https://exploreza.webflow.io/tour-category/family-trip',
    image:
      'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/677fad076c5d679e3a805ccb_travel%20image%20one.webp',
  },
];

const centerCard: Category = {
  title: 'Camping',
  href: 'https://exploreza.webflow.io/tour-category/camping',
  image:
    'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/6729979de000ef9fec672920_Travel%20Category-2.webp',
};

const rightColumn: Category[] = [
  {
    title: 'Honeymoon trip',
    href: 'https://exploreza.webflow.io/tour-category/honeymoon-trip',
    image:
      'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/677fad08de2c8c93d7919e9a_travel%20image%20three.webp',
  },
  {
    title: 'River cruises',
    href: 'https://exploreza.webflow.io/tour-category/river-cruises',
    image:
      'https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/675fbaa67d8c306b6644023c_Destination%20Background.webp',
  },
];

const allCategories: Category[] = [
  leftColumn[0],
  centerCard,
  rightColumn[0],
  leftColumn[1],
  leftColumn[2],
  rightColumn[1],
];

function CategoryCard({ category, className }: { category: Category; className?: string }) {
  return (
    <Link
      href={category.href}
      aria-label={category.title}
      className={`group relative flex h-full overflow-hidden rounded-[28px] bg-slate-900/10 shadow-[0_18px_45px_rgba(7,14,30,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(7,14,30,0.28)] ${className ?? ''}`.trim()}
    >
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover"
        sizes="(max-width: 1023px) 50vw, 360px"
        priority={category.title === 'Hiking and trekking'}
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <span className="absolute bottom-6 left-6 text-lg font-semibold text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)]">
        {category.title}
      </span>
    </Link>
  );
}

export default function TravelStyleSection() {
  return (
    <section className="mx-auto mt-16 w-full max-w-[1440px] px-4">
      <div className="relative overflow-hidden rounded-[36px] bg-[#f9c7a6] px-5 py-12 shadow-[0_30px_120px_rgba(249,199,166,0.45)] sm:px-8 md:px-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-16 top-6 h-[220px] w-[220px] rounded-full border border-white/40" />
          <div className="absolute bottom-10 left-32 h-[140px] w-[140px] rounded-[45%] border border-white/30" />
          <div className="absolute right-12 top-10 h-[520px] w-[520px] -translate-x-4 rounded-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1230px] flex-col items-center text-center">
          <h2 className="text-[32px] font-semibold text-slate-900 sm:text-[36px]">Choose your travel style</h2>

          <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:hidden">
            {allCategories.map((category) => (
              <CategoryCard key={category.title} category={category} className="h-[240px]" />
            ))}
          </div>

          <div className="mt-12 hidden w-full gap-8 lg:grid lg:grid-cols-[406px_406px_406px] lg:justify-center">
            <div className="flex w-full flex-col gap-8">
              <CategoryCard category={leftColumn[0]} className="h-[300px]" />
              <div className="grid grid-cols-2 gap-8">
                <CategoryCard category={leftColumn[1]} className="h-[300px]" />
                <CategoryCard category={leftColumn[2]} className="h-[300px]" />
              </div>
            </div>

            <div className="flex w-full">
              <CategoryCard category={centerCard} className="h-[630px] w-full" />
            </div>

            <div className="flex w-full flex-col gap-8">
              <CategoryCard category={rightColumn[0]} className="h-[300px]" />
              <CategoryCard category={rightColumn[1]} className="h-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
