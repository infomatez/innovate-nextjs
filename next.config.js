/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SITE_URL: 'https://blogerbase.com',
    BASE_URL: 'https://api.blogerbase.com',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.blogerbase.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.transparentpng.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'file.rendit.io',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
