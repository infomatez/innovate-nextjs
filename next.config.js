/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      SITE_URL: 'https://blogerbase.com',
      BASE_URL: 'https://api.blogerbase.com',
      API_BASE_URL: 'https://api.bytebloggerbase.com/api',
      IMAGE_URl:'http://localhost:9000/'
    },
  images: {
    domains: ['file.rendit.io', 'images.theconversation.com', 'localhost','api.bytebloggerbase.com'],
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
