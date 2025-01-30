import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['upload.wikimedia.org', 'platform.polygon.com', 'i.etsystatic.com', 'forgedgaming.com', 'pbs.twimg.com'],
    
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
