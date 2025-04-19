import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bjub4zyrcu2xpqza.public.blob.vercel-storage.com',
        port: '',
        search: '',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.graphql': {
          loaders: ['graphql-tag/loader'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
