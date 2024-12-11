import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /sequelize\/lib\/dialects\/abstract\/connection-manager\.js$/,
      parser: { requireEnsure: false },
    });
    config.ignoreWarnings = [
      {
        message: /the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};

export default nextConfig;
