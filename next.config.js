const nextConfig = {
  swcMinify: true,
  optimizeFonts: true,
  poweredByHeader: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
