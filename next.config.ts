import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    proxyClientMaxBodySize : '100mb',
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'removeDimensions', active: true },
              ],
            },
            typescript: true,
            ext: 'tsx',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
