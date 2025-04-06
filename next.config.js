/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.siasat.com'
      },
      {
        protocol: 'https',
        hostname: 'media1.thehungryjpeg.com'
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com'
      },
      {
        protocol: 'https',
        hostname: 'files.oaiusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com'
      },
    ],
  },
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

