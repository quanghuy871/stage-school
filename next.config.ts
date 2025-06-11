import { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  i18n: {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  async redirects() {
    return [
      {
        source: '/booking',
        destination: '/book-now',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;