/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
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
    basePath: '/superdeals',
    assetPrefix: '/superdeals/',
  };
  
  export default nextConfig;