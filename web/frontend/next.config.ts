import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@phonestore/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
