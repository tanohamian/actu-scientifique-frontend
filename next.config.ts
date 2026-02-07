import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    proxyClientMaxBodySize: '100mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.actuscientifique.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'global.unitednations.entermediadb.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tse2.mm.bing.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tse1.mm.bing.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.cameroon-tribune.cm',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.bing.com',
        pathname: '/**',
      }
    ],
  },

  turbopack :{

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