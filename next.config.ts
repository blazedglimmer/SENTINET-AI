import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: config => {
    config.resolve.alias['tailwindcss'] = require.resolve('tailwindcss');
    return config;
  },
};

export default nextConfig;
