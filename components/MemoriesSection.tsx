import Link from 'next/link';

type PhotoItem = {
  src: string;
  alt: string;
  sizeClass: string;
  offsetClass: string;
};

const photoItems: PhotoItem[] = [
  {
    src: 'https://cdn.prod.website-files.com/66fda6a5f8ded1922d9ebc94/6700103e4d8f04342dfe608f_Tour%20Small%20-1.webp',
    alt: 'Temple view',
    sizeClass: 'h-[56px] w-[56px] sm:h-[64px] sm:w-[64px] md:h-[72px] md:w-[72px]',
    offsetClass: 'translate-y-4',
  },
  {
    src: 'https://cdn.prod.website-files.com/66fda6a5f8ded1922d9ebc94/670010572e46c9412d0667d6_Tour%20Small%20-4-1.webp',
    alt: 'Coastal sunrise',
    sizeClass: 'h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] md:h-[88px] md:w-[88px]',
    offsetClass: 'translate-y-1',
  },
  {
    src: 'https://cdn.prod.website-files.com/66fda6a5f8ded1922d9ebc94/6700105a4d7a33f1c7c1f40f_Tour%20Small%20-6-2.webp',
    alt: 'Mountain lookout',
    sizeClass: 'h-[72px] w-[72px] sm:h-[88px] sm:w-[88px] md:h-[104px] md:w-[104px]',
    offsetClass: '-translate-y-1',
  },
  {
    src: 'https://cdn.prod.website-files.com/66fda6a5f8ded1922d9ebc94/6703bbfe5710fa45f3fc659e_Team-1.webp',
    alt: 'Happy traveller',
    sizeClass: 'h-[80px] w-[80px] sm:h-[104px] sm:w-[104px] md:h-[128px] md:w-[128px]',
    offsetClass: '-translate-y-4',
  },
  {
    src: 'https://cdn.prod.website-files.com/66fda6a5f8ded1922d9ebc94/67001057afa7694e9d658ad0_Tour%20Small%20-4-2.webp',
    alt: 'Tropical waterfall',
    sizeClass: 'h-[72px] w-[72px] sm:h-[88px] sm:w-[88px] md:h-[104px] md:w-[104px]',
    offsetClass: '-translate-y-1',
  },
  {
    src: 'https://cdn.prod.website-files.com/66fda6a5f8ded1922d9ebc94/6700105a78ad1136a10ca584_Tour%20Small%20-6-1.webp',
    alt: 'Beach adventure',
    sizeClass: 'h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] md:h-[88px] md:w-[88px]',
    offsetClass: 'translate-y-1',
  },
  {
    src: 'https://cdn.prod.website-files.com/66fda6a5f8ded1922d9ebc94/670010405d69224f2bcef4d5_Tour%20Small%20-3.webp',
    alt: 'Tea plantation',
    sizeClass: 'h-[56px] w-[56px] sm:h-[64px] sm:w-[64px] md:h-[72px] md:w-[72px]',
    offsetClass: 'translate-y-3',
  },
];

export default function MemoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="relative overflow-hidden rounded-[38px] border border-[#E1E8DC]/50 bg-[#F7FBF6]/60 backdrop-blur-md px-6 py-14 sm:px-12 sm:py-18">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-contain bg-center bg-no-repeat opacity-20"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/40 to-white/70" aria-hidden="true" />
          </div>

          <div className="relative flex flex-col items-center gap-12">
            <div className="flex items-end justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {photoItems.map((photo, index) => (
                <span
                  key={`${photo.src}-${index}`}
                  className={`inline-flex items-center justify-center rounded-full border-[3px] border-dotted border-[#7DA469] bg-white p-[5px] shadow-[0_8px_25px_rgba(44,89,55,0.18)] ${photo.offsetClass}`}
                >
                  <span
                    role="img"
                    aria-label={photo.alt}
                    className={`block overflow-hidden rounded-full bg-cover bg-center ${photo.sizeClass}`}
                    style={{ backgroundImage: `url(${photo.src})` }}
                  />
                </span>
              ))}
            </div>

            <h2 className="max-w-[1024px] text-center font-serif text-[30px] italic leading-[1.35] text-[#1D4939] sm:text-[40px] lg:text-[52px]">
              <span className="bg-gradient-to-r from-[#E6533F] via-[#F09737] to-[#F3A939] bg-clip-text text-transparent">
                We Don’t Just Plan
              </span>{' '}
              Vacations, We Create Lifelong{' '}
              <span className="bg-gradient-to-r from-[#E6533F] via-[#F09737] to-[#F3A939] bg-clip-text text-transparent">
                Memories and Unforgettable
              </span>{' '}
              Adventures
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tours-2"
                prefetch={false}
                className="inline-flex items-center justify-center rounded-full bg-[#344F1E] px-10 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_15px_45px_rgba(52,79,30,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                Our Best Tours
              </Link>
              <Link
                href="/destination"
                prefetch={false}
                className="inline-flex items-center justify-center rounded-full border border-[#8FA97B] bg-[#E4EECF] px-10 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#2F4B2A] shadow-[0_12px_35px_rgba(143,169,123,0.3)] transition duration-300 hover:bg-[#8FA97B] hover:text-white"
              >
                View Destination
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
