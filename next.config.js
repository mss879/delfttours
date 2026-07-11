/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // specific for static exports, disabling for server actions
  experimental: {
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Drop the "X-Powered-By: Next.js" header in production.
  poweredByHeader: false,
  // gzip/brotli responses (default true, set explicitly for clarity).
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for a year. Without this Next re-runs sharp on
    // cache misses, making the first load of each image slow.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      // Supabase Storage (admin-uploaded images: events, newsroom, testimonials)
      { protocol: 'https', hostname: 'vbipftcmiyizurnqhkzi.supabase.co' },
    ],
  },
};

module.exports = nextConfig;
