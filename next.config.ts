import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/collections',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
