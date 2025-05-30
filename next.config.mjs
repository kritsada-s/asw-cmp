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
    basePath: '/campus-is-calling',
    assetPrefix: '/campus-is-calling/',
  };
  
  export default nextConfig;