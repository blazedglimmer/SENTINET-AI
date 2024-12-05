import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: config => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
    config.resolve.alias['@'] = __dirname;
    return config;
  },
};

export default nextConfig;
