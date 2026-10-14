/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Perfect for static export or local high-performance rendering without external CDN hurdles
  },
};

export default nextConfig;
