const nextTranslate = require('next-translate');
const nextPkg = require('next/package.json');

/**=== process */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
console.log('[server next version]', nextPkg.version);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  /**
   * 可将 /next/static 配置到 cdn
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
   */
  // assetPrefix: 'https://cdn.sonicsvpn.com',
  env: {},

  webpack(config) {
    // 增加 svg 加载
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        // port: '',
        pathname: '/**',
      },
    ],
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

const withLess = require('next-with-less');

module.exports = nextTranslate(withBundleAnalyzer(withLess(config)));
