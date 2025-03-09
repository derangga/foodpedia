/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-e574a04c58f3409cb2cc91bd38277137.r2.dev",
      },
    ],
  },
};

export default nextConfig;
