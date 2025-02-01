import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
