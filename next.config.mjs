/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Re-enable static export for main site
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assetwise.co.th',
      }
    ]
  },
  trailingSlash: true,
  basePath: '/bigmaxdeals',
  assetPrefix: '/bigmaxdeals/',
};

export default nextConfig;