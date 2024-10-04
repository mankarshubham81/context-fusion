/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
          },
          {
            protocol: 'https',
            hostname: 'randomuser.me',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
          }
        ],
      },

  experimental: {
    taint: true,
  },
      logging: {
        fetches: {
          fullUrl: false,
        },
      }
};

export default nextConfig;
