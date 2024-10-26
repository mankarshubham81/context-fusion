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

  // Enables production source maps for debugging
  productionBrowserSourceMaps: true,

  // Removes experimental taint feature if unused
  // Uncomment if you need this feature
  // experimental: {
  //   taint: true,
  // },

  // Set fetch logging configuration to reduce unnecessary logs
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  webpack: (config, { dev, isServer }) => {
    // Source map optimization for production builds
    if (!dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

export default nextConfig;
